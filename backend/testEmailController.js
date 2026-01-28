const Registration = require("../models/Registration");
const {
  sendWelcomeEmailInternal,
  sendODLetterEmail,
} = require("./emailController");
const { generateODLetter } = require("../utils/generateODLetter");
const QRCode = require("qrcode");

/**
 * REGISTER USER (SERVERLESS SAFE)
 * Triggered by Google Form / Postman / Frontend
 */
const registerUser = async (req, res) => {
  const { name, email, eventId, eventName, eventDate } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required." });
  }

  try {
    /* ---------------- SAVE BASIC REGISTRATION ---------------- */
    const registration = new Registration({
      name,
      email,
      eventId,
      eventName: eventName || "MAGNUS 2026",
      eventDate: eventDate || "February 2nd, 2026",
      emailSent: false,
      odLetterSent: false,
    });

    const savedRegistration = await registration.save();

    /* ---------------- GENERATE QR DATA ---------------- */
    const qrPayload = {
      app: "MAGNUS 2026",
      action: "CHECK_IN",
      user: {
        id: savedRegistration._id.toString(),
        name: savedRegistration.name,
        email: savedRegistration.email,
      },
      timestamp: new Date().toISOString(),
    };

    const qrData = JSON.stringify(qrPayload);
    const qrCodeUrl = await QRCode.toDataURL(qrData);

    savedRegistration.qrData = qrData;
    savedRegistration.qrCodeUrl = qrCodeUrl;
    await savedRegistration.save();

    /* ---------------- GENERATE OD LETTER (BUFFER) ---------------- */
    let odPdfBuffer = null;

    try {
      odPdfBuffer = await generateODLetter({
        studentName: name,
        eventName: savedRegistration.eventName,
        eventDate: savedRegistration.eventDate,
      });
    } catch (err) {
      console.error("OD generation failed:", err.message);
      odPdfBuffer = null;
    }

    /* ---------------- SEND EMAIL ---------------- */
    try {
      if (odPdfBuffer) {
        await sendODLetterEmail(name, email, qrData, odPdfBuffer);
        savedRegistration.odLetterSent = true;
      } else {
        await sendWelcomeEmailInternal(name, email, qrData);
      }

      savedRegistration.emailSent = true;
      await savedRegistration.save();
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr.message);
    }

    /* ---------------- RESPONSE ---------------- */
    return res.status(201).json({
      message:
        "Registration successful. Please check your email for the OD letter and QR code.",
      registration: {
        id: savedRegistration._id,
        name: savedRegistration.name,
        email: savedRegistration.email,
        emailSent: savedRegistration.emailSent,
        odLetterSent: savedRegistration.odLetterSent,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

/**
 * BULK EMAIL (SERVERLESS SAFE – SMALL BATCH)
 * Recommended: run once or limit batch size
 */
const sendBulkEmails = async (req, res) => {
  try {
    const users = await Registration.find({ emailSent: false }).limit(10);

    let sent = 0;
    let failed = 0;

    for (const user of users) {
      try {
        if (user.qrData) {
          await sendWelcomeEmailInternal(user.name, user.email, user.qrData);
          user.emailSent = true;
          await user.save();
          sent++;
        }
      } catch (err) {
        console.error(`Failed for ${user.email}:`, err.message);
        failed++;
      }
    }

    return res.json({
      message: "Bulk email batch completed",
      processed: users.length,
      sent,
      failed,
    });
  } catch (error) {
    console.error("Bulk send error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  registerUser,
  sendBulkEmails,
};

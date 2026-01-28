const Registration = require('../models/Registration');
const { sendWelcomeEmailInternal, sendODLetterEmail } = require('./emailController');
const { generateODLetter } = require('../utils/generateODLetter');
const QRCode = require('qrcode');

/* ======================================================
   REGISTER USER (SERVERLESS SAFE)
====================================================== */
const registerUser = async (req, res) => {
  const { name, email, eventId, eventName, eventDate } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required.' });
  }

  try {
    // Create registration record
    const newRegistration = new Registration({
      name,
      email,
      eventId,
      eventName: eventName || 'MAGNUS 2026',
      eventDate: eventDate || 'February 2nd, 2026',
      qrData: 'temp'
    });

    const savedRegistration = await newRegistration.save();

    // Generate unique QR payload
    const qrPayload = {
      app: "MAGNUS 2026",
      action: "CHECK_IN",
      user: {
        id: savedRegistration._id.toString(),
        name: savedRegistration.name,
        email: savedRegistration.email
      },
      timestamp: new Date().toISOString()
    };

    const uniqueQrData = JSON.stringify(qrPayload);
    savedRegistration.qrData = uniqueQrData;

    // Generate OD Letter PDF as Buffer (no disk writes)
    let odPdfBuffer = null;

    try {
      odPdfBuffer = await generateODLetter({
        studentName: name,
        eventName: savedRegistration.eventName,
        eventDate: savedRegistration.eventDate
      });
      console.log('✅ OD Letter generated (buffer)');
    } catch (err) {
      console.error("❌ OD generation failed:", err.message);
    }

    await savedRegistration.save();

    // Send Email with attachments
    try {
      if (odPdfBuffer) {
        await sendODLetterEmail(
          name,
          email,
          uniqueQrData,
          odPdfBuffer
        );
        savedRegistration.emailSent = true;
        savedRegistration.odLetterSent = true;
        console.log('✅ OD Letter email sent');
      } else {
        await sendWelcomeEmailInternal(name, email, uniqueQrData);
        savedRegistration.emailSent = true;
        savedRegistration.odLetterSent = false;
        console.log('✅ Welcome email sent');
      }

      await savedRegistration.save();
    } catch (emailErr) {
      console.error("❌ Email sending failed:", emailErr.message);
      savedRegistration.emailSent = false;
      savedRegistration.odLetterSent = false;
      await savedRegistration.save();
    }

    res.status(201).json({
      message: 'Registration successful. Check your email for OD letter and QR code.',
      registration: {
        id: savedRegistration._id,
        name: savedRegistration.name,
        email: savedRegistration.email,
        emailSent: savedRegistration.emailSent,
        odLetterSent: savedRegistration.odLetterSent
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/* ======================================================
   BULK SEND EMAILS (SERVERLESS SAFE)
====================================================== */
const sendBulkEmails = async (req, res) => {
  try {
    // Find users who haven't received emails
    const pendingUsers = await Registration.find({ emailSent: { $ne: true } });

    if (pendingUsers.length === 0) {
      return res.json({
        message: 'No pending users found',
        sent: 0
      });
    }

    let sent = 0;
    let failed = 0;
    const BATCH_SIZE = 50; // Process max 50 at a time (stay under timeout limits)

    // Process in batches
    const usersToProcess = pendingUsers.slice(0, BATCH_SIZE);
    const totalPending = pendingUsers.length;

    for (const user of usersToProcess) {
      try {
        // Generate QR data if missing
        let qrData = user.qrData;

        if (!qrData) {
          const qrPayload = {
            app: "MAGNUS 2026",
            action: "CHECK_IN",
            user: {
              id: user._id.toString(),
              name: user.name,
              email: user.email
            },
            timestamp: new Date().toISOString()
          };
          qrData = JSON.stringify(qrPayload);
          user.qrData = qrData;
          await user.save();
        }

        // Generate OD Letter PDF as Buffer
        const odPdfBuffer = await generateODLetter({
          studentName: user.name,
          eventName: user.eventName,
          eventDate: user.eventDate
        });

        // Send email with PDF buffer
        await sendODLetterEmail(
          user.name,
          user.email,
          qrData,
          odPdfBuffer
        );

        user.emailSent = true;
        user.odLetterSent = true;
        await user.save();

        console.log(`✅ Email sent to ${user.email}`);
        sent++;

        // Rate limiting
        await new Promise(r => setTimeout(r, 1000));
      } catch (err) {
        console.error(`❌ Failed for ${user.email}:`, err.message);
        failed++;
      }
    }

    res.json({
      message: 'Bulk send completed (batch)',
      batchSize: BATCH_SIZE,
      sent,
      failed,
      processedThisBatch: sent + failed,
      totalPending: totalPending,
      remaining: totalPending - BATCH_SIZE,
      note: totalPending > BATCH_SIZE ? `Run endpoint again to send next batch` : 'All emails sent!'
    });
  } catch (error) {
    console.error('❌ Bulk send error:', error);
    res.status(500).json({ message: 'Bulk send failed', error: error.message });
  }
};

module.exports = { registerUser, sendBulkEmails };

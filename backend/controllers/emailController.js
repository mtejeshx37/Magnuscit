const nodemailer = require("nodemailer");
const QRCode = require("qrcode");

console.log("---------------------------------------------------");
console.log("EMAIL CONTROLLER LOADED (SERVERLESS & STABLE)");
console.log("---------------------------------------------------");

/* ======================================================
   SHARED SMTP TRANSPORTER
====================================================== */
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
  const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  if (!emailUser || !emailPass) {
    throw new Error("EMAIL_USER / EMAIL_PASS not set in environment");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

/* ======================================================
   CONTACT FORM EMAIL (ROUTE HANDLER)
   POST /api/email/send
====================================================== */
const sendEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: "magnus@citchennai.net",
      replyTo: email,
      subject: `NCAI 2026 Inquiry: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Contact email failed:", error.message);
    res.status(500).json({ message: "Failed to send email" });
  }
};

/* ======================================================
   INTERNAL: WELCOME EMAIL WITH QR (BUFFER)
====================================================== */
const sendWelcomeEmailInternal = async (name, email, qrData) => {
  const transporter = createTransporter();
  const qrBuffer = await QRCode.toBuffer(qrData);

  return transporter.sendMail({
    from: `"Magnus Event Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Event QR Code – MAGNUS 2026 🎟️",
    html: `
      <html>
        <body style="font-family:Segoe UI;background:#050505;color:#fff;padding:20px">
          <div style="max-width:600px;margin:auto;background:#1a1a1a;border-radius:12px;overflow:hidden">
            <div style="padding:25px;text-align:center;background:linear-gradient(135deg,#D500F9,#7000FF)">
              <h1>MAGNUS 2026</h1>
              <p>National Level Technical Symposium</p>
            </div>

            <div style="padding:30px">
              <p>Hello <strong>${name}</strong>,</p>
              <p>Please present the QR code below at the event entrance.</p>

              <div style="background:#fff;padding:20px;border-radius:12px;width:fit-content;margin:30px auto">
                <img src="cid:qr-code" width="220"/>
              </div>
            </div>

            <div style="text-align:center;padding:15px;background:#000;color:#666">
              © 2026 MAGNUS Symposium
            </div>
          </div>
        </body>
      </html>
    `,
    attachments: [
      {
        filename: "QR_Code.png",
        content: qrBuffer,
        contentType: "image/png",
        cid: "qr-code",
      },
    ],
  });
};

/* ======================================================
   INTERNAL: OD LETTER + QR EMAIL (BUFFER)
====================================================== */
const sendODLetterEmail = async (name, email, qrData, odPdfBuffer) => {
  const transporter = createTransporter();

  if (!odPdfBuffer) {
    throw new Error("OD PDF buffer missing");
  }

  const qrBuffer = await QRCode.toBuffer(qrData);

  return transporter.sendMail({
    from: `"Magnus Event Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "OD Letter & QR Code – MAGNUS 2026 🎓",
    html: `
      <html>
        <body style="font-family:Segoe UI;background:#050505;color:#fff;padding:20px">
          <div style="max-width:600px;margin:auto;background:#1a1a1a;border-radius:12px;overflow:hidden">
            <div style="padding:25px;text-align:center;background:linear-gradient(135deg,#D500F9,#7000FF)">
              <h1>MAGNUS 2026</h1>
              <p>National Level Technical Symposium</p>
            </div>

            <div style="padding:30px">
              <p>Hello <strong>${name}</strong>,</p>
              <p>Please find attached your:</p>
              <ul>
                <li>📄 OD Letter (PDF)</li>
                <li>🎟️ Event QR Code</li>
              </ul>

              <div style="background:#fff;padding:20px;border-radius:12px;width:fit-content;margin:30px auto">
                <img src="cid:qr-code" width="220"/>
              </div>

              <p><strong>Instructions:</strong></p>
              <ul>
                <li>Print and submit the OD letter</li>
                <li>Carry the QR code for check-in</li>
                <li>Event starts at 8:00 AM</li>
              </ul>
            </div>

            <div style="text-align:center;padding:15px;background:#000;color:#666">
              © 2026 MAGNUS Symposium<br/>
              Chennai Institute of Technology
            </div>
          </div>
        </body>
      </html>
    `,
    attachments: [
      {
        filename: "OD_Letter.pdf",
        content: odPdfBuffer,
        contentType: "application/pdf",
      },
      {
        filename: "QR_Code.png",
        content: qrBuffer,
        contentType: "image/png",
        cid: "qr-code",
      },
    ],
  });
};

/* ======================================================
   EXPRESS ROUTE HANDLER: SEND WELCOME EMAIL
   POST /api/email/send-welcome
====================================================== */
const sendWelcomeEmail = async (req, res) => {
  const { name, email, qrData } = req.body;

  if (!name || !email || !qrData) {
    return res.status(400).json({
      message: "Name, email, and qrData are required",
    });
  }

  try {
    await sendWelcomeEmailInternal(name, email, qrData);
    res.status(200).json({ message: "Welcome email sent successfully!" });
  } catch (error) {
    console.error("Welcome email failed:", error.message);
    res.status(500).json({ message: "Failed to send welcome email" });
  }
};

/* ======================================================
   EXPORTS
====================================================== */
module.exports = {
  sendEmail,                // Express route
  sendWelcomeEmail,         // Express route
  sendWelcomeEmailInternal, // Internal
  sendODLetterEmail,        // Internal (BUFFER)
};

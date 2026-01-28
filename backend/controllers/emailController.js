const nodemailer = require('nodemailer');
const QRCode = require('qrcode');

console.log("---------------------------------------------------");
console.log("LOADED UPDATED EMAIL CONTROLLER (SMTP SUPPORT ALLIED)");
console.log("---------------------------------------------------");

exports.sendEmail = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true,
            auth: {
                user: process.env.SMTP_USER || process.env.EMAIL_USER,
                pass: process.env.SMTP_PASS || process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender address (must be the authenticated user)
            to: 'magnus@citchennai.net', // Receiver address
            replyTo: email, // The user's email address
            subject: `NCAI 2026 inquiry: ${subject}`,
            text: `You have received a new message from ${name} (${email}):\n\n${message}`,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully!' });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

const sendWelcomeEmailInternal = async (name, email, qrData) => {
    console.log('Sending welcome email internally:', { name, email, qrDataLength: qrData ? qrData.length : 0 });

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.office365.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }
    });

    // Generate QR Code as Data URL
    const qrCodeDataUrl = await QRCode.toDataURL(qrData);

    const mailOptions = {
        from: `"Event Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Event QR Code 🎟️",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to MAGNUS 2026</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #050505; color: #ffffff;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #D500F9 0%, #7000FF 100%); padding: 30px 20px; text-align: center;">
                    <h1 style="margin: 0; font-family: 'Courier New', monospace; font-size: 28px; letter-spacing: 2px; color: #ffffff; text-transform: uppercase;">MAGNUS 2026</h1>
                    <p style="margin: 5px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">National Level Technical Symposium</p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">
                    <h2 style="color: #ffffff; margin-top: 0; font-size: 24px;">Registration Confirmed! 🚀</h2>
                    <p style="color: #cccccc; line-height: 1.6; font-size: 16px;">
                        Hello <strong>${name}</strong>,
                    </p>
                    <p style="color: #cccccc; line-height: 1.6; font-size: 16px;">
                        Thank you for registering for MAGNUS 2026. We are thrilled to have you join us for this exciting event.
                    </p>
                    
                    <!-- QR Code Container -->
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 12px; margin: 30px auto; width: fit-content; text-align: center;">
                        <img src="cid:unique-qr-code" alt="Your Entry QR Code" style="display: block; width: 220px; height: 220px;" />
                        <p style="color: #333333; margin: 10px 0 0; font-size: 12px; font-weight: bold;">ENTRY PASS</p>
                    </div>

                    <p style="color: #cccccc; line-height: 1.6; font-size: 16px; text-align: center;">
                        Please present this QR code at the registration desk for seamless entry.
                    </p>

                    <!-- Event Details Box -->
                    <div style="margin-top: 30px; padding: 20px; background-color: #252525; border-left: 4px solid #D500F9; border-radius: 4px;">
                        <h3 style="margin: 0 0 10px; color: #D500F9; font-size: 16px;">📢 Event Updates</h3>
                        <p style="margin: 0; color: #aaaaaa; font-size: 14px;">
                            Stay tuned to our official channels for the schedule and venue details.
                        </p>
                    </div>
                </div>

                <!-- Footer -->
                <div style="background-color: #000000; padding: 20px; text-align: center; border-top: 1px solid #333333;">
                    <p style="color: #666666; font-size: 12px; margin: 0;">
                        &copy; 2026 MAGNUS Symposium. All rights reserved.
                    </p>
                    <p style="color: #444444; font-size: 12px; margin: 5px 0 0;">
                        Chennai Institute of Technology
                    </p>
                </div>
            </div>
        </body>
        </html>
        `,
        attachments: [
            {
                filename: 'qr-code.png',
                content: qrCodeDataUrl.split("base64,")[1],
                encoding: 'base64',
                cid: 'unique-qr-code'
            }
        ]
    };

    return await transporter.sendMail(mailOptions);
};

exports.sendWelcomeEmail = async (req, res) => {
    const { name, email, qrData } = req.body;

    try {
        const info = await sendWelcomeEmailInternal(name, email, qrData);
        console.log('Welcome Email sent: ' + info.response);
        res.status(200).json({ message: 'Welcome email sent successfully!' });

    } catch (error) {
        console.error('Error sending welcome email:', error);
        res.status(500).json({ message: 'Failed to send welcome email', error: error.message });
    }
};

exports.sendWelcomeEmailInternal = sendWelcomeEmailInternal;

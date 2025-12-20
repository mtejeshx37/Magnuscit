const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or use 'host' and 'port' if not using gmail service directly but 'citchennai.net' might be a GSuite/Workspace account.
            // If it is regular gmail or workspace:
            host: 'smtp.gmail.com',
            port: 465, // or 587 with secure: false
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
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

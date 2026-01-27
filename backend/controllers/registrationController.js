const Registration = require('../models/Registration');
const { sendWelcomeEmailInternal } = require('./emailController');
const QRCode = require('qrcode');

// @desc    Register a new user
// @route   POST /api/registrations
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, eventId } = req.body;

    // Basic validation
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and Email are required.' });
    }

    try {
        // Check if user already registered for this event (optional logic)
        // const existingRegistration = await Registration.findOne({ email, eventId });
        // if (existingRegistration) {
        //     return res.status(400).json({ message: 'User already registered for this event.' });
        // }

        // Create initial QR data -> Can be unique ID or just email provided
        // For now, let's use a temporary placeholder or generate a new Object ID first

        const newRegistration = new Registration({
            name,
            email,
            eventId,
            qrData: 'temp-placeholder'
        });

        // Save to get the ID
        const savedRegistration = await newRegistration.save();

        // Update QR data to be the ID or a combination of ID and other data
        const uniqueQrData = savedRegistration._id.toString();
        savedRegistration.qrData = uniqueQrData;

        // Generate QR Code URL just in case we want to store it (optional)
        const qrCodeUrl = await QRCode.toDataURL(uniqueQrData);
        savedRegistration.qrCodeUrl = qrCodeUrl;

        await savedRegistration.save();

        // Send Welcome Email
        // We run this asynchronously. We can await it if we want to ensure email sent before response.
        // For better UX during registration, usually we await unless we have a job queue.
        try {
            await sendWelcomeEmailInternal(name, email, uniqueQrData);
            savedRegistration.emailSent = true;
            await savedRegistration.save();
        } catch (emailError) {
            console.error('Failed to send welcome email during registration:', emailError);
            // We still return success for registration, but maybe log this or return a warning?
            // For now, let's proceed as success but log error.
        }

        res.status(201).json({
            message: 'Registration successful. Please check your email for the QR code.',
            registration: {
                id: savedRegistration._id,
                name: savedRegistration.name,
                email: savedRegistration.email,
                qrData: savedRegistration.qrData,
                emailSent: savedRegistration.emailSent
            }
        });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Send bulk emails to users who haven't received them
// @route   POST /api/registrations/bulk-send
// @access  Public (should be protected)
const sendBulkEmails = async (req, res) => {
    try {
        // Find users where emailSent is false (or undefined)
        const users = await Registration.find({ emailSent: { $ne: true } });
        console.log(`Found ${users.length} users pending email.`);

        let sentCount = 0;
        let failedCount = 0;

        for (const user of users) {
            try {
                // Ensure we have QR data. If somehow missing, regenerate using ID
                const qrData = user.qrData || user._id.toString();

                await sendWelcomeEmailInternal(user.name, user.email, qrData);
                console.log(`Email sent to: ${user.email}`);

                user.emailSent = true;
                await user.save();
                sentCount++;

                // 1 second delay to prevent blocking
                await new Promise(resolve => setTimeout(resolve, 1000));

            } catch (err) {
                console.error(`Failed to send to ${user.email}:`, err.message);
                failedCount++;
            }
        }

        res.json({
            message: 'Bulk email process completed.',
            totalProcessed: users.length,
            successfullySent: sentCount,
            failed: failedCount
        });

    } catch (error) {
        console.error('Error in bulk send:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    registerUser,
    sendBulkEmails
};

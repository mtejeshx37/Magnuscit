const connectDB = require('../backend/utils/dbConnect');
const Registration = require('../backend/models/Registration');
const { sendODLetterEmail, sendWelcomeEmailInternal } = require('../backend/controllers/emailController');
const { generateODLetter } = require('../backend/utils/generateODLetter');

/**
 * Vercel Serverless Function
 * POST /api/registrations
 * 
 * Registers a user, generates OD letter, sends email
 * No Express - Pure serverless handler
 */
module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Method Not Allowed. Use POST.' 
    });
  }

  try {
    // Connect to MongoDB
    await connectDB();

    // Parse body
    const { name, email, eventId, eventName, eventDate } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Create registration record
    const newRegistration = new Registration({
      name,
      email,
      eventId,
      eventName: eventName || 'MAGNUS 2026',
      eventDate: eventDate || 'February 2nd, 2026',
      qrData: 'temp',
      emailSent: false,
      odLetterSent: false
    });

    const savedRegistration = await newRegistration.save();

    // Generate unique QR payload (JSON string)
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
      console.log('✅ OD Letter generated as buffer');
    } catch (pdfErr) {
      console.error('❌ OD Letter generation failed:', pdfErr.message);
    }

    // Send email with PDF + QR attachments
    try {
      if (odPdfBuffer) {
        await sendODLetterEmail(name, email, uniqueQrData, odPdfBuffer);
        savedRegistration.emailSent = true;
        savedRegistration.odLetterSent = true;
        console.log(`✅ OD Letter email sent to ${email}`);
      } else {
        await sendWelcomeEmailInternal(name, email, uniqueQrData);
        savedRegistration.emailSent = true;
        savedRegistration.odLetterSent = false;
        console.log(`✅ Welcome email sent to ${email}`);
      }
    } catch (emailErr) {
      console.error('❌ Email failed:', emailErr.message);
      savedRegistration.emailSent = false;
      savedRegistration.odLetterSent = false;
    }

    await savedRegistration.save();

    // Success response
    return res.status(201).json({
      success: true,
      message: 'Registration successful! Check your email for OD letter and QR code.',
      data: {
        id: savedRegistration._id,
        name: savedRegistration.name,
        email: savedRegistration.email,
        eventName: savedRegistration.eventName,
        eventDate: savedRegistration.eventDate,
        emailSent: savedRegistration.emailSent,
        odLetterSent: savedRegistration.odLetterSent,
        createdAt: savedRegistration.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Registration API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

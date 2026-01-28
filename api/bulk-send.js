const connectDB = require('../backend/utils/dbConnect');
const Registration = require('../backend/models/Registration');
const { sendODLetterEmail } = require('../backend/controllers/emailController');
const { generateODLetter } = require('../backend/utils/generateODLetter');

/**
 * Vercel Serverless Function
 * POST /api/bulk-send
 * 
 * Sends emails to all users where emailSent !== true
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

    // Find users who haven't received emails
    const pendingUsers = await Registration.find({ 
      emailSent: { $ne: true } 
    }).limit(50); // Limit to avoid timeout

    if (pendingUsers.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No pending users found',
        total: 0,
        sent: 0,
        failed: 0
      });
    }

    console.log(`📧 Processing ${pendingUsers.length} pending users...`);

    let sent = 0;
    let failed = 0;
    const results = [];

    // Process each user
    for (const user of pendingUsers) {
      try {
        // Generate OD Letter PDF as Buffer
        const odPdfBuffer = await generateODLetter({
          studentName: user.name,
          eventName: user.eventName || 'MAGNUS 2026',
          eventDate: user.eventDate || 'February 2nd, 2026'
        });

        // Send email with PDF buffer
        await sendODLetterEmail(
          user.name,
          user.email,
          user.qrData,
          odPdfBuffer
        );

        // Update user record
        user.emailSent = true;
        user.odLetterSent = true;
        await user.save();

        console.log(`✅ Email sent to ${user.email}`);
        sent++;

        results.push({
          email: user.email,
          status: 'sent'
        });

        // Rate limiting: 1 second between emails
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (emailErr) {
        console.error(`❌ Failed for ${user.email}:`, emailErr.message);
        failed++;

        results.push({
          email: user.email,
          status: 'failed',
          error: emailErr.message
        });
      }
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Bulk send completed',
      total: pendingUsers.length,
      sent,
      failed,
      results
    });

  } catch (error) {
    console.error('❌ Bulk send API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Bulk send failed',
      error: error.message
    });
  }
};

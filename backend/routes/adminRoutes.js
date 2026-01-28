const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const { sendODLetterEmail } = require('../controllers/emailController');
const { generateODLetter } = require('../utils/generateODLetter');

/**
 * POST /api/admin/bulk-test-send
 * Insert multiple dummy users and send OD letter emails to all of them
 */
router.post('/bulk-test-send', async (req, res) => {
  try {
    const dummyUsers = [
      {
        name: "Arjun Kumar",
        email: "akshayaas1811@gmail.com",
        eventId: "EVT01",
        eventName: "Hackathon",
        eventDate: "February 2nd, 2026",
        qrData: "DUMMY_QR_001",
        emailSent: false,
        odLetterSent: false
      },
      {
        name: "Priya Sharma",
        email: "joinjban@gmail.com",
        eventId: "EVT02",
        eventName: "Paper Presentation",
        eventDate: "February 2nd, 2026",
        qrData: "DUMMY_QR_002",
        emailSent: false,
        odLetterSent: false
      },
      {
        name: "Rahul Verma",
        email: "akshayaas.aiml2023@citchennai.net",
        eventId: "EVT03",
        eventName: "Project Expo",
        eventDate: "February 2nd, 2026",
        qrData: "DUMMY_QR_003",
        emailSent: false,
        odLetterSent: false
      }
    ];

    console.log('📝 Inserting dummy users...');
    // 1️⃣ Insert all at once
    const insertedUsers = await Registration.insertMany(dummyUsers);
    console.log(`✅ Inserted ${insertedUsers.length} users`);

    let sent = 0;
    let failed = 0;

    // 2️⃣ Generate OD letters and send emails
    for (const user of insertedUsers) {
      try {
        console.log(`📧 Processing: ${user.name} (${user.email})...`);

        // Generate OD Letter PDF
        const odLetterPath = await generateODLetter({
          studentName: user.name,
          eventName: user.eventName,
          eventDate: user.eventDate
        });

        user.odLetterPath = odLetterPath;
        await user.save();

        // Send OD Letter Email
        await sendODLetterEmail(
          user.name,
          user.email,
          user.qrData,
          odLetterPath
        );

        user.emailSent = true;
        user.odLetterSent = true;
        await user.save();

        console.log(`✅ Email sent to ${user.email}`);
        sent++;

        // Rate limiting: wait 1 second between emails
        await new Promise(r => setTimeout(r, 1000));
      } catch (emailErr) {
        console.error(`❌ Failed for ${user.name}:`, emailErr.message);
        failed++;
      }
    }

    res.json({
      message: "Bulk test completed",
      status: "success",
      usersInserted: insertedUsers.length,
      emailsSent: sent,
      emailsFailed: failed,
      users: insertedUsers.map(u => ({
        name: u.name,
        email: u.email,
        emailSent: u.emailSent
      }))
    });
  } catch (err) {
    console.error('❌ Bulk test error:', err.message);
    res.status(500).json({
      message: "Bulk test failed",
      error: err.message
    });
  }
});

module.exports = router;

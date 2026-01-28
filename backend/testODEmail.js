require('dotenv').config();
const path = require('path');
const { sendODLetterEmail } = require('./controllers/emailController');

(async () => {
  try {
    console.log('🔍 Testing OD Letter Email Sending...\n');

    // Find the most recent OD PDF
    const fs = require('fs');
    const odDir = path.join(__dirname, 'od_letters');
    const files = fs.readdirSync(odDir).sort().reverse();
    
    if (files.length === 0) {
      console.error('❌ No OD PDF files found');
      process.exit(1);
    }

    const latestPDF = path.join(odDir, files[0]);
    console.log(`📄 Using PDF: ${latestPDF}`);
    console.log(`✅ File exists: ${fs.existsSync(latestPDF)}\n`);

    const testData = {
      name: 'Aarav Sharma',
      email: 'akshayaas1811@gmail.com',
      qrData: JSON.stringify({
        app: 'MAGNUS 2026',
        action: 'CHECK_IN',
        user: {
          id: '6978ea32036c95bcaa9c39a1',
          name: 'Aarav Sharma',
          email: 'akshayaas1811@gmail.com'
        }
      })
    };

    console.log('Sending OD Letter email...\n');
    await sendODLetterEmail(testData.name, testData.email, testData.qrData, latestPDF);
    
    console.log('\n✅ SUCCESS: OD Letter email sent!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ FAILED: OD Letter email error');
    console.error(`Error: ${error.message}`);
    console.error('\nFull error:', error);
    process.exit(1);
  }
})();

const { generateODLetter } = require('./utils/generateODLetter');

(async () => {
  try {
    console.log('🔍 Testing pdfkit OD Letter generation...\n');

    const testData = {
      studentName: 'Aarav Sharma',
      eventName: 'MAGNUS 2026 - Technical Symposium',
      eventDate: 'February 2nd, 2026'
    };

    const pdfPath = await generateODLetter(testData);

    console.log('\n✅ SUCCESS: OD Letter generated!');
    console.log(`📄 File: ${pdfPath}`);
    console.log('\nThe PDF is ready to be attached to emails.');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ FAILED: OD Letter generation error');
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();

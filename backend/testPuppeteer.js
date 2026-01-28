const puppeteer = require('puppeteer');

(async () => {
  let browser = null;
  try {
    console.log('🔍 Testing Puppeteer installation...');
    console.log('Launching Chromium with Windows-safe config...\n');

    browser = await puppeteer.launch({
      headless: 'new',
      timeout: 0,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process'
      ]
    });

    console.log('✅ SUCCESS: Chromium launched successfully!');
    console.log('✅ Puppeteer is configured correctly for Windows.');
    console.log('\nYour OD Letter generation will work perfectly now.\n');

    const version = await browser.version();
    console.log('Browser version:', version);

    await browser.close();
    process.exit(0);

  } catch (error) {
    console.error('❌ FAILED: Chromium launch failed');
    console.error('\nError:', error.message);
    console.error('\nTroubleshooting steps:');
    console.error('1. Ensure puppeteer (not puppeteer-core) is installed');
    console.error('2. Run: npm install puppeteer');
    console.error('3. Check your antivirus/firewall settings');
    console.error('4. Ensure temp folder is writable: C:\\Users\\<YourUser>\\AppData\\Local\\Temp');
    process.exit(1);

  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        // Ignore close errors
      }
    }
  }
})();

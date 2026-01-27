const sharp = require('sharp');
const path = require('path');

async function generateIco() {
    await sharp(path.join(__dirname, 'public', 'favicon.png'))
        .resize(32, 32)
        .toFile(path.join(__dirname, 'public', 'favicon.ico'));
    console.log('Favicon.ico generated successfully at 32x32');
}

generateIco();

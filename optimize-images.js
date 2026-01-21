
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'src', 'assets');

if (!fs.existsSync(assetsDir)) {
    console.error(`Assets directory not found: ${assetsDir}`);
    process.exit(1);
}

async function convertInDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);

        // Handle subdirectories if needed, but for now just files or known gallery dir
        if (fs.statSync(filePath).isDirectory()) {
            // recursive if we wanted, but let's stick to flat + gallery for now if specific
            // actually let's make it recursive for robustness
            await convertInDir(filePath);
            continue;
        }

        const ext = path.extname(file).toLowerCase();
        const basename = path.basename(file, ext);

        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
            const targetPath = path.join(dir, `${basename}.webp`);

            try {
                // Skip if webp exists and is newer? No, just overwrite or skip if exists.
                // Converting every time is safer for "fix it" request.

                console.log(`Converting ${path.relative(assetsDir, filePath)} ...`);
                const image = sharp(filePath);
                const metadata = await image.metadata();

                if (metadata.width > 800) {
                    await image
                        .resize(800)
                        .webp({ quality: 60, effort: 6 })
                        .toFile(targetPath);
                } else {
                    await image
                        .webp({ quality: 60, effort: 6 })
                        .toFile(targetPath);
                }

                console.log(`✔ Created ${path.relative(assetsDir, targetPath)}`);
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
}

console.log("Starting optimization...");
convertInDir(assetsDir).then(() => {
    console.log('Image optimization complete.');
});

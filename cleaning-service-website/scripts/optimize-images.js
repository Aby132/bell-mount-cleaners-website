const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../src/images');
const OPTIMIZED_DIR = path.join(__dirname, '../src/images/optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(OPTIMIZED_DIR)) {
    fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

async function optimizeImage(file) {
    const inputPath = path.join(IMAGES_DIR, file);
    const outputPath = path.join(OPTIMIZED_DIR, file);
    const ext = path.extname(file).toLowerCase();

    try {
        // First, resize the image if it's too large
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        if (metadata.width > 1920) {
            await image
                .resize(1920, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .toFile(outputPath);
        } else {
            await image.toFile(outputPath);
        }

        // Then optimize based on file type
        if (ext === '.jpg' || ext === '.jpeg') {
            await imagemin([outputPath], {
                destination: OPTIMIZED_DIR,
                plugins: [
                    imageminMozjpeg({ quality: 80 })
                ]
            });
        } else if (ext === '.png') {
            await imagemin([outputPath], {
                destination: OPTIMIZED_DIR,
                plugins: [
                    imageminPngquant({ quality: [0.6, 0.8] })
                ]
            });
        }

        // Create WebP version
        const webpPath = outputPath.replace(ext, '.webp');
        await sharp(outputPath)
            .webp({ quality: 80 })
            .toFile(webpPath);

        console.log(`Optimized ${file}`);
    } catch (error) {
        console.error(`Error optimizing ${file}:`, error);
    }
}

async function optimizeAllImages() {
    const files = fs.readdirSync(IMAGES_DIR)
        .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    for (const file of files) {
        await optimizeImage(file);
    }

    console.log('Image optimization complete!');
}

optimizeAllImages(); 
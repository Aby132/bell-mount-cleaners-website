const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../src/images');
const outputDir = path.join(__dirname, '../src/images/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Function to optimize a single image
async function optimizeImage(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .resize(1200, 800, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({
                quality: 80,
                effort: 6
            })
            .toFile(outputPath);
        console.log(`Optimized: ${path.basename(inputPath)}`);
    } catch (error) {
        console.error(`Error optimizing ${inputPath}:`, error);
    }
}

// Process all images in the input directory
fs.readdir(inputDir, async (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png)$/i.test(file) && 
        !file.includes('optimized')
    );

    for (const file of imageFiles) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, path.basename(file, path.extname(file)) + '.webp');
        await optimizeImage(inputPath, outputPath);
    }
}); 
const sharp = require('sharp');
const imageToAscii = require('asciify-image');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const inputImagePath = 'public/images/walkend.jpg';
const outputImagePath = './outputImage.jpg';
const fixedAspectRatio = 2.0;

(async () => {
  // Increase the number of characters for higher resolution
  const characterWidth = Math.round(200 * fixedAspectRatio);
  const characterHeight = 400;

  // Resize input image while maintaining aspect ratio
  const resizedImage = await sharp(inputImagePath)
    .resize({ width: characterWidth, height: characterHeight, fit: 'contain' })
    .modulate({ brightness: 1.5, contrast: 1.8 })
    .toBuffer();

  // Convert the resized image to ASCII
  const asciiImage = await imageToAscii(resizedImage, {
    fit: 'box',
    width: characterWidth,
    height: characterHeight,
  });

  // Create a canvas and draw the ASCII image
  const lines = asciiImage.split('\n');
  const fontSize = 10;
  const canvasWidth = characterWidth * fontSize;
  const canvasHeight = characterHeight * fontSize;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  ctx.font = `${fontSize}px monospace`;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = '#FFFFFF';

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], 0, (i + 1) * fontSize);
  }

  // Export the ASCII image as a JPEG
  const out = await loadImage(canvas.toBuffer());
  const outCanvas = createCanvas(canvasWidth, canvasHeight);
  const outCtx = outCanvas.getContext('2d');
  outCtx.drawImage(out, 0, 0, canvasWidth, canvasHeight);
  const outputStream = fs.createWriteStream(outputImagePath);
  outCanvas.createJPEGStream().pipe(outputStream);
})();

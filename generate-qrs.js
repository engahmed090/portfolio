const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const links = [
  { name: 'portfolio', url: 'https://portfolio-mav5.vercel.app' },
  { name: 'metamaterial-ai', url: 'https://metamaterial-absorber-ai-platform.vercel.app' },
  { name: 'smart-anti-drone', url: 'https://sulaymaniyahintlairport-ahmed.lovable.app' },
  { name: 'nano-herbal-ai', url: 'https://herb-vet-pro.vercel.app' }
];

const outputDir = path.join(__dirname, 'cv-qrcodes');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateQRCodes() {
  console.log('Generating high-precision QR codes for CV print scaling...\n');

  for (const item of links) {
    const svgPath = path.join(outputDir, `${item.name}.svg`);
    const pngPath = path.join(outputDir, `${item.name}.png`);

    // SVG - Vector output for infinite scaling without quality loss
    await QRCode.toFile(svgPath, item.url, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 2
    });

    // PNG - High-resolution raster (width: 1200px)
    await QRCode.toFile(pngPath, item.url, {
      type: 'png',
      width: 1200,
      errorCorrectionLevel: 'H',
      margin: 2
    });

    console.log(`[SUCCESS] Generated ${item.name}.svg & ${item.name}.png`);
  }

  console.log('\nAll 8 QR code files generated successfully in cv-qrcodes folder!');
}

generateQRCodes().catch(err => {
  console.error('Error generating QR codes:', err);
  process.exit(1);
});

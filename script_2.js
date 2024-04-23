import sharp from 'sharp';

export const main = async () => {
  const imgPath = "./logo.png";
  const outputPath = "./output.png";

  await sharp(imgPath)
    .resize(100)
    .grayscale()
    .toFile(outputPath)

}
main();
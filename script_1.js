import fs from 'fs';
import { parse } from 'csv-parse/sync';

export const main = async () => {
  let japaneseSum = 0;
  const csvPath = "./seiseki.csv";
  const csvDate = fs.readFileSync(csvPath, 'utf8');
  console.log('csvそのまま' + csvDate);
  const scoreObjects = parse(csvDate, {
    columns: true,
    skip_empty_lines: true
  })
  for (let index = 0; index < scoreObjects.length; index++) {
    japaneseSum += parseInt(scoreObjects[index].国語, 10);
  }
  const japaneseAverage = japaneseSum / scoreObjects.length;
  const result = Math.trunc(japaneseAverage * 10) / 10;
  console.log(`国語の平均点: ${result}点`);
};

main();

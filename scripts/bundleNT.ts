
import fs from 'fs';
import path from 'path';

const books = [
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1Corinthians", "2Corinthians", "Galatians", "Ephesians",
    "Philippians", "Colossians", "1Thessalonians", "2Thessalonians", "1Timothy", "2Timothy", "Titus", "Philemon",
    "Hebrews", "James", "1Peter", "2Peter", "1John", "2John", "3John", "Jude", "Revelation"
];

function bundleNT() {
    const ntData: any = {};
    const jsonDir = path.join(process.cwd(), 'data', 'json');

    books.forEach(book => {
        const filePath = path.join(jsonDir, `${book}.json`);
        if (fs.existsSync(filePath)) {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            ntData[book] = content.chapters;
        }
    });

    const outputPath = path.join(process.cwd(), 'data', 'nt-data.ts');
    const content = `export const ntData: Record<string, Record<string, Record<string, string>>> = ${JSON.stringify(ntData, null, 2)};`;
    fs.writeFileSync(outputPath, content);
    console.log('Bundled New Testament data to data/nt-data.ts');
}

bundleNT();

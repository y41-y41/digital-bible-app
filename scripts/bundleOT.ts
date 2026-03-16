
import fs from 'fs';
import path from 'path';

const ot1 = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1Samuel", "2Samuel",
    "1Kings", "2Kings", "1Chronicles", "2Chronicles", "Ezra", "Nehemiah", "Esther", "Job"
];

const ot2 = [
    "Psalms", "Proverbs", "Ecclesiastes", "SongofSolomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
    "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
];

function bundleOT() {
    const jsonDir = path.join(process.cwd(), 'data', 'json');

    const data1: any = {};
    ot1.forEach(book => {
        const filePath = path.join(jsonDir, `${book}.json`);
        if (fs.existsSync(filePath)) {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            data1[book] = content.chapters;
        }
    });
    fs.writeFileSync(path.join(process.cwd(), 'data', 'ot1-data.ts'), `export const ot1Data: any = ${JSON.stringify(data1, null, 2)};`);

    const data2: any = {};
    ot2.forEach(book => {
        const filePath = path.join(jsonDir, `${book}.json`);
        if (fs.existsSync(filePath)) {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            data2[book] = content.chapters;
        }
    });
    fs.writeFileSync(path.join(process.cwd(), 'data', 'ot2-data.ts'), `export const ot2Data: any = ${JSON.stringify(data2, null, 2)};`);

    console.log('Bundled Old Testament data');
}

bundleOT();

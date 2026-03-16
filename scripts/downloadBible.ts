
import fs from 'fs';
import path from 'path';

async function download() {
    console.log('Starting Bible download...');
    try {
        // Using another reliable source
        const url = 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json';
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
        const data = await response.json();

        console.log('Bible data downloaded. Processing...');

        // thiagobodruk format:
        // [ { "abbrev": "gn", "chapters": [ ["verse1", "verse2"], ... ] }, ... ]
        
        data.forEach((book: any) => {
            const bookName = book.name;
            if (!bookName) return;
            
            const bibleBook: any = { chapters: {} };
            
            book.chapters.forEach((chapter: string[], cIdx: number) => {
                const chapNum = cIdx + 1;
                bibleBook.chapters[chapNum] = {};
                chapter.forEach((verseText: string, vIdx: number) => {
                    const verseNum = vIdx + 1;
                    bibleBook.chapters[chapNum][verseNum] = verseText;
                });
            });

            const sanitizedName = bookName.replace(/\s/g, '');
            const outputDir = path.join(process.cwd(), 'data', 'json');
            if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
            
            const filePath = path.join(outputDir, `${sanitizedName}.json`);
            fs.writeFileSync(filePath, JSON.stringify(bibleBook, null, 2));
            console.log(`Saved ${bookName} to ${filePath}`);
        });

        console.log('Bible download and processing complete!');
    } catch (error) {
        console.error('Error downloading Bible:', error);
    }
}

download();

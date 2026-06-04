const fs = require('fs');
const pdf = require('pdf-parse');

const args = process.argv.slice(2);
const pdfPath = args[0] || 'C:\\Users\\Torch\\Downloads\\كتاب الطالب لمادة الرياضيات الصف العاشر الفصل الثاني.pdf';
const searchWord = args[1];

let dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
    console.log("Total Pages:", data.numpages);
    
    // We can also search for a keyword or extract specific pages
    if (searchWord) {
        console.log(`Searching for "${searchWord}"...`);
        const pages = data.text.split(/\n\s*\n/); // basic approximation or page markers if any
        // Since pdf-parse returns all text in one big string, we can search it
        let index = 0;
        let matchCount = 0;
        while ((index = data.text.indexOf(searchWord, index)) !== -1) {
            console.log(`--- Match ${++matchCount} at index ${index} ---`);
            console.log(data.text.substring(Math.max(0, index - 300), Math.min(data.text.length, index + 300)));
            index += searchWord.length;
            if (matchCount >= 10) break;
        }
    } else {
        // Output first 2000 characters
        console.log("--- First 2000 chars of text ---");
        console.log(data.text.substring(0, 2000));
    }
}).catch(err => {
    console.error("Error parsing PDF:", err);
});

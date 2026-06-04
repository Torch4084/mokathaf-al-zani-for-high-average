const fs = require('fs');

const file = process.argv[2] || 'student_book_unit8.txt';
const query = process.argv[3] || 'الدرس';

if (!fs.existsSync(file)) {
    console.error(`File ${file} does not exist.`);
    process.exit(1);
}

const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

console.log(`Searching for "${query}" in ${file}...`);
let matchCount = 0;
let currentPage = '';

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('=== PAGE')) {
        currentPage = line;
    }
    if (line.includes(query)) {
        matchCount++;
        console.log(`[Line ${i + 1}] [${currentPage}] ${line.trim()}`);
        if (matchCount >= 50) {
            console.log("Too many matches, truncating...");
            break;
        }
    }
}
console.log(`Done. Found ${matchCount} matches.`);

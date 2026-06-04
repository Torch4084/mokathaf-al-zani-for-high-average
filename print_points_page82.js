const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'C:\\Users\\Torch\\Downloads\\كتاب الطالب لمادة الرياضيات الصف العاشر الفصل الثاني.pdf';
const targetPage = 82;

let dataBuffer = fs.readFileSync(pdfPath);

function render_page(pageData) {
    if (pageData.pageIndex + 1 !== targetPage) {
        return Promise.resolve('');
    }

    return pageData.getTextContent({ normalizeWhitespace: true, disableCombineTextItems: false })
    .then(function(textContent) {
        let items = textContent.items.map(item => {
            return {
                text: item.str.trim(),
                x: Math.round(item.transform[4]),
                y: Math.round(item.transform[5])
            };
        }).filter(item => {
            // Filter only letters A, B, C, D, E or digits or small expressions
            return /^[A-E]$/.test(item.text) || /^\d+$/.test(item.text) || item.text.includes(',');
        });
        console.log(JSON.stringify(items, null, 2));
        return '';
    });
}

pdf(dataBuffer, { pagerender: render_page }).catch(err => {
    console.error("Error:", err);
});

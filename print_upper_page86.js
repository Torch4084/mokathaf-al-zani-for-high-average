const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'C:\\Users\\Torch\\Downloads\\كتاب الطالب لمادة الرياضيات الصف العاشر الفصل الثاني.pdf';
const targetPage = 86;

let dataBuffer = fs.readFileSync(pdfPath);

function render_page(pageData) {
    if (pageData.pageIndex + 1 !== targetPage) {
        return Promise.resolve('');
    }

    return pageData.getTextContent({ normalizeWhitespace: true, disableCombineTextItems: false })
    .then(function(textContent) {
        let items = textContent.items.map(item => {
            return {
                text: item.str,
                x: Math.round(item.transform[4]),
                y: Math.round(item.transform[5])
            };
        }).filter(item => {
            return item.y >= 450 && item.y <= 800;
        });
        console.log(JSON.stringify(items, null, 2));
        return '';
    });
}

pdf(dataBuffer, { pagerender: render_page }).catch(err => {
    console.error("Error:", err);
});

const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'C:\\Users\\Torch\\Downloads\\كتاب الطالب لمادة الرياضيات الصف العاشر الفصل الثاني.pdf';
const startPage = 78;
const endPage = 106;

let dataBuffer = fs.readFileSync(pdfPath);
let pagesText = {};

function render_page(pageData) {
    let render_options = {
        normalizeWhitespace: true,
        disableCombineTextItems: false
    }

    return pageData.getTextContent(render_options)
    .then(function(textContent) {
        let lastY, text = '';
        for (let item of textContent.items) {
            if (lastY == item.transform[5] || !lastY){
                text += item.str + ' ';
            } else {
                text += '\n' + item.str + ' ';
            }
            lastY = item.transform[5];
        }
        pagesText[pageData.pageIndex + 1] = text;
        return text;
    });
}

pdf(dataBuffer, { pagerender: render_page }).then(function(data) {
    let output = '';
    for (let p = startPage; p <= endPage; p++) {
        if (pagesText[p]) {
            output += `\n\n=== PAGE ${p} ===\n` + pagesText[p];
        }
    }
    fs.writeFileSync('student_book_unit7.txt', output);
    console.log("Unit 7 text saved to student_book_unit7.txt");
}).catch(err => {
    console.error("Error:", err);
});

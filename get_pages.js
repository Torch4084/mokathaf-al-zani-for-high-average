const fs = require('fs');
const pdf = require('pdf-parse');

const args = process.argv.slice(2);
const pdfPath = args[0] || 'C:\\Users\\Torch\\Downloads\\كتاب الطالب لمادة الرياضيات الصف العاشر الفصل الثاني.pdf';
const startPage = parseInt(args[1] || '1');
const endPage = parseInt(args[2] || '10');

let dataBuffer = fs.readFileSync(pdfPath);

let pagesText = {};

function render_page(pageData) {
    // check second parameter for page number
    let render_options = {
        // disable default wealth of information
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

let options = {
    pagerender: render_page
};

pdf(dataBuffer, options).then(function(data) {
    console.log(`=== Extracted Pages ${startPage} to ${endPage} ===`);
    for (let p = startPage; p <= endPage; p++) {
        if (pagesText[p]) {
            console.log(`\n--- PAGE ${p} ---`);
            console.log(pagesText[p]);
        } else {
            console.log(`\n--- PAGE ${p} NOT FOUND ---`);
        }
    }
}).catch(err => {
    console.error("Error parsing PDF:", err);
});

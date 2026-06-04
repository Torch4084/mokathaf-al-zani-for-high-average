const fs = require('fs');
const pdf = require('pdf-parse');

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
        return text;
    });
}

async function extractPages(pdfPath, startPage, endPage, outputPath) {
    let dataBuffer = fs.readFileSync(pdfPath);
    let pagesText = {};
    
    await pdf(dataBuffer, {
        pagerender: function(pageData) {
            return render_page(pageData).then(text => {
                pagesText[pageData.pageIndex + 1] = text;
                return text;
            });
        }
    });

    let output = '';
    for (let p = startPage; p <= endPage; p++) {
        if (pagesText[p]) {
            output += `\n\n=== PAGE ${p} ===\n` + pagesText[p];
        }
    }
    fs.writeFileSync(outputPath, output);
    console.log(`Saved pages ${startPage}-${endPage} from ${pdfPath} to ${outputPath}`);
}

async function run() {
    try {
        await extractPages(
            'C:\\Users\\Torch\\Downloads\\كتاب الطالب لمادة الرياضيات الصف العاشر الفصل الثاني.pdf',
            107,
            150,
            'student_book_unit8.txt'
        );
        await extractPages(
            'C:\\Users\\Torch\\Downloads\\كتاب التمارين لمادة الرياضيات الصف العاشر الفصل الثاني.pdf',
            36,
            56,
            'workbook_unit8.txt'
        );
        console.log("Extraction complete!");
    } catch (err) {
        console.error("Error during extraction:", err);
    }
}

run();

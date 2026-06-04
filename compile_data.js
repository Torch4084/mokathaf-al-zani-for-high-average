const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Torch\\.gemini\\antigravity\\brain\\aa67f879-f92b-4e4f-a4be-d35aeac159c7';
const outputJS = path.join(__dirname, 'data.js');

const STRUCTURE = [
    {
        unitId: 'unit5',
        unitTitle: 'الوحدة الخامسة: الاقترانات (Functions)',
        items: [
            { id: 'unit5_l1', file: 'Unit5_Lesson1_Polynomial_Functions.md' },
            { id: 'unit5_l2', file: 'Unit5_Lesson2_Dividing_Polynomials.md' },
            { id: 'unit5_l3', file: 'Unit5_Lesson3_Composition_of_Functions.md' },
            { id: 'unit5_l4', file: 'Unit5_Lesson4_Inverse_Functions.md' },
            { id: 'unit5_l5', file: 'Unit5_Lesson5_Sequences.md' },
            { id: 'unit5_test', file: 'Unit5_End_of_Unit_Test.md' }
        ]
    },
    {
        unitId: 'unit6',
        unitTitle: 'الوحدة السادسة: المشتقات (Derivatives)',
        items: [
            { id: 'unit6_l1', file: 'Unit6_Lesson1_Estimating_Slope.md' },
            { id: 'unit6_l2', file: 'Unit6_Lesson2_Differentiation.md' },
            { id: 'unit6_l3', file: 'Unit6_Lesson3_Maxima_Minima.md' },
            { id: 'unit6_test', file: 'Unit6_End_of_Unit_Test.md' }
        ]
    },
    {
        unitId: 'unit7',
        unitTitle: 'الوحدة السابعة: المتجهات (Vectors)',
        items: [
            { id: 'unit7_l1', file: 'Unit7_Lesson1_Vectors_Coordinate_Plane.md' },
            { id: 'unit7_l2', file: 'Unit7_Lesson2_Vector_Operations.md' },
            { id: 'unit7_l3', file: 'Unit7_Lesson3_Dot_Product.md' },
            { id: 'unit7_test', file: 'Unit7_End_of_Unit_Test.md' }
        ]
    },
    {
        unitId: 'unit8',
        unitTitle: 'الوحدة الثامنة: الإحصاء والاحتمالات (Statistics & Probability)',
        items: [
            { id: 'unit8_l1', file: 'Unit8_Lesson1_Scatter_Plots.md' },
            { id: 'unit8_l2', file: 'Unit8_Lesson2_Cumulative_Frequency_Curve.md' },
            { id: 'unit8_l3', file: 'Unit8_Lesson3_Measures_of_Dispersion.md' },
            { id: 'unit8_l4', file: 'Unit8_Lesson4_Mutually_Exclusive_Events.md' },
            { id: 'unit8_l5', file: 'Unit8_Lesson5_Independent_Dependent_Events.md' },
            { id: 'unit8_test', file: 'Unit8_End_of_Unit_Test.md' }
        ]
    }
];

const lessonsData = {};

for (const unit of STRUCTURE) {
    lessonsData[unit.unitId] = {
        title: unit.unitTitle,
        lessons: []
    };

    for (const item of unit.items) {
        const filePath = path.join(brainDir, item.file);
        if (!fs.existsSync(filePath)) {
            console.error(`Warning: File not found: ${filePath}`);
            continue;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        
        // Extract title from the first line (# Title)
        const lines = content.split('\n');
        let title = '';
        if (lines[0] && lines[0].startsWith('# ')) {
            title = lines[0].substring(2).trim();
            // Remove the title line from content so it's not duplicated
            content = lines.slice(1).join('\n');
        } else {
            title = item.file.replace('.md', '').replace(/_/g, ' ');
        }

        lessonsData[unit.unitId].lessons.push({
            id: item.id,
            title: title,
            markdown: content
        });
    }
}

const jsContent = `// Automatically generated compiled math lessons data
const LESSONS_DATA = ${JSON.stringify(lessonsData, null, 2)};
`;

fs.writeFileSync(outputJS, jsContent);
console.log(`Successfully compiled data for all units and saved to ${outputJS}`);

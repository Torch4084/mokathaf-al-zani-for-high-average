// Helper to calculate mean, variance, and standard deviation for grouped frequency tables

function calculateGroupedStats(name, intervals, frequencies) {
    const n = intervals.length;
    let sumF = 0;
    let sumFX = 0;
    let sumFX2 = 0;

    console.log(`=== ${name} ===`);
    console.log("Interval\tMidpoint (x)\tFreq (f)\tfx\t\tfx^2");
    for (let i = 0; i < n; i++) {
        const [low, high] = intervals[i];
        const x = (low + high) / 2;
        const f = frequencies[i];
        const fx = f * x;
        const fx2 = f * x * x;
        sumF += f;
        sumFX += fx;
        sumFX2 += fx2;
        console.log(`[${low}, ${high})\t${x}\t\t${f}\t\t${fx}\t\t${fx2}`);
    }

    const mean = sumFX / sumF;
    const variance = (sumFX2 / sumF) - (mean * mean);
    const stdDev = Math.sqrt(variance);

    console.log("\nSummary:");
    console.log(`Total Frequency (sum F) = ${sumF}`);
    console.log(`sum FX = ${sumFX}`);
    console.log(`sum FX^2 = ${sumFX2}`);
    console.log(`Mean (mu) = ${mean.toFixed(4)}`);
    console.log(`Variance (sigma^2) = ${variance.toFixed(4)}`);
    console.log(`Std Dev (sigma) = ${stdDev.toFixed(4)}`);
    
    console.log("\nRow-by-Row Deviation Table:");
    console.log("x\tf\tx-mu\t\t(x-mu)^2\t\tf*(x-mu)^2");
    let sumFDeviation2 = 0;
    for (let i = 0; i < n; i++) {
        const [low, high] = intervals[i];
        const x = (low + high) / 2;
        const f = frequencies[i];
        const dev = x - mean;
        const dev2 = dev * dev;
        const fdev2 = f * dev2;
        sumFDeviation2 += fdev2;
        console.log(`${x}\t${f}\t${dev.toFixed(4)}\t\t${dev2.toFixed(4)}\t\t${fdev2.toFixed(4)}`);
    }
    console.log(`Sum of f*(x-mu)^2 = ${sumFDeviation2.toFixed(4)}`);
    console.log(`Variance (from deviations) = ${(sumFDeviation2 / sumF).toFixed(4)}`);
    console.log("--------------------------------------------------\n");
}

// 1. Typing Words (Student Book Page 129 Q1-2)
calculateGroupedStats(
    "Typing Words (Student Book Page 129 Q1-2)",
    [[26, 30], [31, 35], [36, 40], [41, 45], [46, 50]],
    [8, 12, 10, 7, 3]
);

// 2. Apartments Area (Student Book Page 129 Q3-4)
calculateGroupedStats(
    "Apartments Area (Student Book Page 129 Q3-4)",
    [[80, 100], [100, 120], [120, 140], [140, 160], [160, 180]],
    [2, 5, 7, 6, 3]
);

// 3. Basketball Team (Student Book Page 129 Q5-6)
// Eagles Team: [170, 178] (3), [179, 187] (3), [188, 196] (3), [197, 205] (2)
calculateGroupedStats(
    "Basketball Team: Eagles (النسور)",
    [[170, 178], [179, 187], [188, 196], [197, 205]],
    [3, 3, 3, 2]
);

// Black Lions Team: [170, 178] (2), [179, 187] (1), [188, 196] (4), [197, 205] (2)
calculateGroupedStats(
    "Basketball Team: Black Lions (الأسود)",
    [[170, 178], [179, 187], [188, 196], [197, 205]],
    [2, 1, 4, 2]
);

// 4. Sleeping Hours (Student Book Page 129 Q7-9)
// The midpoint values of histogram bars (x) and frequencies (f) are:
// Midpoints: 4.5 (2), 5.5 (14), 6.5 (90), 7.5 (64), 8.5 (22), 9.5 (4), 10.5 (2), 11.5 (2)
// Wait! Let's check:
// Midpoints in the text: 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5? Or are they:
// Let's write intervals corresponding to these midpoints with width 1:
// [4, 5) has midpoint 4.5.
// Let's calculate:
calculateGroupedStats(
    "Sleeping Hours (Student Book Page 129 Q7-9)",
    [[4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12]],
    [2, 14, 90, 64, 22, 4, 2, 2]
);

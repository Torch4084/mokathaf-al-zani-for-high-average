const fs = require('fs');

function linearRegression(X, Y) {
    const n = X.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (let i = 0; i < n; i++) {
        sumX += X[i];
        sumY += Y[i];
        sumXY += X[i] * Y[i];
        sumXX += X[i] * X[i];
    }
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return { slope, intercept };
}

// 1. Father vs Son heights (Student Book Page 113)
const father = [178, 186, 164, 152, 169, 174, 183, 147, 162, 153, 156, 180, 162, 166, 173, 181, 168, 158, 173, 175];
const son    = [168, 163, 152, 145, 151, 167, 167, 142, 155, 145, 152, 160, 150, 156, 164, 170, 154, 160, 167, 172];
const regFatherSon = linearRegression(father, son);
console.log("Father vs Son Height (x = Father, y = Son):");
console.log(`   Slope (m) = ${regFatherSon.slope.toFixed(4)}`);
console.log(`   Intercept (c) = ${regFatherSon.intercept.toFixed(4)}`);
console.log(`   Equation: y = ${regFatherSon.slope.toFixed(2)}x + ${regFatherSon.intercept.toFixed(2)}`);

// 2. Sport vs TV viewing hours (Student Book Page 113)
const sport = [12, 3, 5, 15, 11, 0, 9, 7, 6, 12, 12, 10, 7, 6, 7, 3, 1, 2, 0, 12];
const tv    = [18, 26, 24, 16, 19, 27, 12, 13, 17, 14, 22, 16, 18, 22, 12, 28, 18, 20, 25, 13];
const regSportTv = linearRegression(sport, tv);
console.log("\nSport vs TV (x = Sport hours, y = TV hours):");
console.log(`   Slope (m) = ${regSportTv.slope.toFixed(4)}`);
console.log(`   Intercept (c) = ${regSportTv.intercept.toFixed(4)}`);
console.log(`   Equation: y = ${regSportTv.slope.toFixed(2)}x + ${regSportTv.intercept.toFixed(2)}`);

// 3. Distance vs Speed (Student Book Page 112 Q7-10)
const dist = [10, 20, 30, 40, 50, 60, 70, 80];
const speed = [18, 16, 13, 10, 7, 5, 3, 0];
const regDistSpeed = linearRegression(dist, speed);
console.log("\nDistance vs Speed (x = Distance, y = Speed):");
console.log(`   Slope (m) = ${regDistSpeed.slope.toFixed(4)}`);
console.log(`   Intercept (c) = ${regDistSpeed.intercept.toFixed(4)}`);
console.log(`   Equation: y = ${regDistSpeed.slope.toFixed(2)}x + ${regDistSpeed.intercept.toFixed(2)}`);

// 4. Workbook Page 47 Forearm (f) vs Body height (h)
// x = forearm, y = body height
const forearm = [15, 16, 18, 20, 22, 24, 25, 27, 28, 30]; // approximated from graph ticks or similar
// Let's look at the graph in workbook page 47.
// The x axis is forearm length, values range from 15 to 30.
// The y axis is body height, values range from 100 to 180.
// Let's assume standard linear relationship: height = 6 * forearm + 10 or similar.
// If forearm is 27 cm, we want to estimate body height.
// Let's see if we can find if there are points or if it's a general relationship.
// If the equation is y = 6x + 10 (approximate).

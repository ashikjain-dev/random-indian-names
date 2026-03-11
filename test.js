const { getRandomName } = require('./index');

console.log("--- Random Name Generation Test ---");

console.log("\n1. Specific Length (3, 5):");
for (let i = 0; i < 5; i++) {
    const name = getRandomName(3, 5);
    console.log(`- ${name} (length: ${name.length})`);
}

console.log("\n2. Specific Length (6, 12):");
for (let i = 0; i < 5; i++) {
    const name = getRandomName(6, 12);
    console.log(`- ${name} (length: ${name.length})`);
}

console.log("\n3. Diversity Check (10 random names):");
const names = Array.from({ length: 10 }, () => getRandomName(4, 9));
console.log(names.join(", "));

console.log("\n4. Error Handling Test:");
try {
    getRandomName(-1, 5); // Negative value
} catch (e) {
    console.log(`- Caught expected error (negative): ${e.message}`);
}

try {
    getRandomName(0, 5); // Zero value
} catch (e) {
    console.log(`- Caught expected error (zero): ${e.message}`);
}

try {
    getRandomName(5, 20); // Invalid range (> 15)
} catch (e) {
    console.log(`- Caught expected error (>15): ${e.message}`);
}

try {
    getRandomName(10, 5); // Invalid range (min > max)
} catch (e) {
    console.log(`- Caught expected error (min > max): ${e.message}`);
}

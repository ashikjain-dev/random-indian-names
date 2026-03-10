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
    const names = getRandomName(5, 20); // Invalid range
    console.log(names)
} catch (e) {
    console.log(`- Caught expected error: ${e.message}`);
}

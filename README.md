# Random Indian Name Generator

A high-quality, lightweight Node.js module that uses a **Syllable Graph Engine** to generate authentic Indian names.

Instead of random letters, this module uses real cultural "roots" and "transitions" to ensure names are phonetically natural, unique, and accurate.

## Features
- **Generative Algorithm**: Infinite variety, no stale datasets.
- **Length Control**: Specify `min` and `max` character counts.
- **Lightweight**: Zero dependencies.

## Installation
```bash
npm install random-indian-names
```

## Usage

### Simple Name
Generate a random name with default length (3 to 10 characters).
```javascript
const { getRandomName } = require('random-indian-names');

// Generate a random name (3 to 10 characters default)
console.log(getRandomName()); // e.g., "Arjun"
```

### With Length Constraints
Get a name between 3 and 5 characters.
```javascript
console.log(getRandomName(3, 5)); // e.g., "Aditi"

// call with one parameter (min=5, max defaults to 10)
console.log(getRandomName(5)); // e.g., "Vihaan"
```

## API

### `getRandomName(min, max)`
- `min` (Number): Minimum character length (default: 3).
- `max` (Number): Maximum character length (default: 10).
- **Returns**: A capitalized string.

## License
MIT

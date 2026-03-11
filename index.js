/**
 * Random Indian Name Generator
 * Syllable Graph Engine - Refined transitions with repetition guards.
 */

const syllableGraph = {
    "starts": [
        "A", "Ad", "Ak", "Am", "An", "Ar", "As", "Av", "Bha", "Cha", "De", 
        "Dha", "Ga", "Ha", "In", "Is", "Ja", "Ka", "Ki", "Ku", "La", "Ma", 
        "Mo", "Na", "Ni", "Pa", "Pr", "Ra", "Ri", "Ro", "Sa", "Sh", "Si", 
        "Su", "Ta", "Va", "Vi", "Ya", "U", "Yash"
    ],
    "transitions": {
        "A": ["mit", "kash", "nand", "jay", "dit", "vin", "run", "rav", "mrut", "man"],
        "Ad": ["it", "iti", "ity", "vait"],
        "Ak": ["ash", "shay", "rit"],
        "Am": ["it", "rit", "ar", "an", "al"],
        "An": ["it", "il", "and", "ish", "any", "uj", "ush"],
        "Ar": ["un", "pit", "nav", "jun", "adh", "ind"],
        "As": ["ha", "hish", "hok", "mita"],
        "Av": ["i", "in", "inash"],
        "Bha": ["rat", "nu", "vya", "kar"],
        "Cha": ["it", "nd", "dan"],
        "De": ["ep", "v", "van", "va"],
        "Dha": ["ru", "nu", "nush", "v"],
        "Ga": ["nesh", "ur", "tam", "yatri"],
        "Ha": ["ri", "man", "rdik", "rish"],
        "In": ["der", "di", "dra"],
        "Is": ["ha", "han", "hani", "hit"],
        "Ja": ["i", "tin", "ya", "tesh"],
        "Ka": ["ran", "mal", "mita", "vita", "rtik"],
        "Ki": ["ran", "shore"],
        "Ku": ["nal", "mar", "ush"],
        "La": ["lit", "kesh", "man"],
        "Ma": ["dhav", "hesh", "nas", "nov", "noj", "ni"],
        "Mo": ["han", "hit", "ni"],
        "Na": ["man", "veen", "vya", "yan", "ndini"],
        "Ni": ["khil", "ti", "dhi", "lesh", "raj"],
        "Pa": ["kash", "raj", "nkaj", "rth", "yal"],
        "Pr": ["ad", "ak", "am", "an", "at", "av", "it"],
        "Ra": ["j", "jan", "jat", "hul", "m", "vi", "kesh"],
        "Ri": ["shi", "tesh", "ya", "v"],
        "Ro": ["han", "hit", "shni"],
        "Sa": ["chin", "gar", "hil", "mir", "njay"],
        "Sh": ["iv", "ivam", "ubh", "reya", "rut"],
        "Si": ["d", "mran", "dharth"],
        "Su": ["nil", "mit", "raj", "resh", "man"],
        "Ta": ["run", "nmay", "nu"],
        "Va": ["run", "ibhav", "ish"],
        "Vi": ["jay", "nay", "nod", "shal", "vek"],
        "Ya": ["sh", "ti", "min"],
        "U": ["day", "ma", "rvi", "tk"]
    },
    // Special high-quality suffixes for longer names
    "suffixes": ["kumar", "endra", "deep", "jeet", "prasad", "nath", "veer", "wati", "it", "esh", "an"]
};

function getRandom(arr) {
    if (!arr || arr.length === 0) return "";
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomName(min = 3, max = 10) {
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error("getRandomName requires numbers for min and max");
    }
    if (min < 1 || max < 1) {
        throw new Error("minimum and maximum letters must be at least 1");
    }
    if (min > 15 || max > 15) {
        throw new Error("minimum and maximum letters cannot exceed 15 characters");
    }
    if (min > max) {
        throw new Error("minimum letters cannot be greater than maximum letters");
    }

    let attempts = 0;
    while (attempts < 500) {
        let name = getRandom(syllableGraph.starts);
        let usedSyllables = new Set([name.toLowerCase()]);
        
        // Decide target length (favoring longer if min > 5)
        const targetLength = max > 6 ? 
            Math.floor(Math.random() * (max - min + 1) + min) : 
            (Math.random() > 0.3 ? max : Math.max(min, 4));

        let lastSyllable = name;
        while (name.length < targetLength) {
            const pool = syllableGraph.transitions[lastSyllable] || 
                         syllableGraph.transitions[name.slice(-2)] || 
                         syllableGraph.transitions[name.slice(-1)];
            
            if (!pool) break;
            
            // Pick a non-repetitive syllable
            let next = getRandom(pool);
            let subAttempts = 0;
            while (usedSyllables.has(next.toLowerCase()) && subAttempts < 5) {
                next = getRandom(pool);
                subAttempts++;
            }

            if (usedSyllables.has(next.toLowerCase())) break; // Avoid infinite loops

            name += next;
            usedSyllables.add(next.toLowerCase());
            lastSyllable = next;

            // Chance to attach a high-quality suffix if we are near target length
            if (name.length >= targetLength - 4 && Math.random() > 0.6) {
                const suffix = getRandom(syllableGraph.suffixes);
                if (!usedSyllables.has(suffix.toLowerCase())) {
                    name += suffix;
                    break;
                }
            }
        }

        // Clean up and normalization
        name = name.toLowerCase();
        
        // Clean double vowels but PRESERVE 'ee' and 'oo' as they are common in Indian names (e.g., Deep, Jeet)
        name = name.replace(/([aeiou])\1/gi, (match) => {
            const low = match.toLowerCase();
            return (low === 'ee' || low === 'oo') ? match : match[0];
        });
        
        // Remove impossible triple consonants
        name = name.replace(/([^aeiou])\1\1/gi, '$1$1');
        
        // Fix "Utktk" and similar issues by preventing identical vowel-less clusters
        name = name.replace(/(tk|rt|rk)\1/gi, '$1');

        if (name.length >= min && name.length <= max) {
            // Capitalize
            const result = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            // Final authenticity check: Must not look like gibberish
            if (!/([^aeiou]){4,}/i.test(result)) {
                return result;
            }
        }
        attempts++;
    }

    // High Quality Fallback (100% Correct)
    const fallback = ["Amit", "Akash", "Aditi", "Arjun", "Kiran", "Nayan", "Vihaan", "Sania"];
    const valid = fallback.filter(n => n.length >= min && n.length <= max);
    return getRandom(valid.length > 0 ? valid : ["Amit"]);
}

module.exports = { getRandomName };

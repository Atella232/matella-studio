const fs = require('fs');
const path = require('path');

const esPath = path.join(process.cwd(), 'src/i18n/locales/es.json');
const arPath = path.join(process.cwd(), 'src/i18n/locales/ar.json');

const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));

function findMissingKeys(source, target, currentPath = '') {
    const missing = [];
    for (const key in source) {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;
        if (!(key in target)) {
            missing.push(fullPath);
        } else if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
            missing.push(...findMissingKeys(source[key], target[key], fullPath));
        }
    }
    return missing;
}

const missingKeys = findMissingKeys(es, ar);
console.log(JSON.stringify(missingKeys, null, 2));

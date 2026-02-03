import fs from 'fs';
import path from 'path';

const esPath = path.join(process.cwd(), 'src/i18n/locales/es.json');
const missingKeys = JSON.parse(fs.readFileSync('missing_keys.json', 'utf8'));
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));

function getValue(obj, path) {
    return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
}

const result = {};
missingKeys.forEach(key => {
    result[key] = getValue(es, key);
});

fs.writeFileSync('values_to_translate.json', JSON.stringify(result, null, 2), 'utf8');
console.log(`Extracted ${missingKeys.length} values.`);

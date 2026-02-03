import fs from 'fs';
import path from 'path';

const arPath = path.join(process.cwd(), 'src/i18n/locales/ar.json');
const translationsPath = path.join(process.cwd(), 'arabic_translations.json');

const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

function setDeep(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
}

for (const key in translations) {
    setDeep(ar, key, translations[key]);
}

fs.writeFileSync(arPath, JSON.stringify(ar, null, 2), 'utf8');
console.log('Translations merged successfully.');

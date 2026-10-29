#!/usr/bin/env node
// Revisa un archivo con los textos de una publicación en los cuatro idiomas antes de dárselo al dueño.
//   node revisar-textos.mjs textos.md
// Formato: una sección por idioma, con el encabezado «## eu», «## es», «## en» y «## ar» (el resto, libre).
// Comprueba lo mecánico: que estén los cuatro idiomas, el enlace, la longitud, hashtags, la notación de cada
// idioma (%, decimales) y las cifras que parecen datos de alumnos o usuarios (no se inventan: hay que verificarlas).
// NO sustituye la lectura de una persona nativa en árabe e inglés.
import { readFileSync } from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('Uso: node revisar-textos.mjs textos.md')
  process.exit(1)
}
const text = readFileSync(file, 'utf8')
const sections = {}
for (const m of text.matchAll(/^##\s*(eu|es|en|ar)\b[^\n]*\n([\s\S]*?)(?=^##\s|\s*$(?![\s\S]))/gim)) sections[m[1].toLowerCase()] = m[2].trim()

const rules = {
  eu: [
    [/\d\s?%/, 'Euskera: el porcentaje va antes de la cifra (%35), no después'],
    [/\b\d+\.\d{1,2}\b(?!\.)/, 'Euskera: ¿decimal con punto? Va con coma (0,75); el punto es de los miles (1.230)'],
  ],
  es: [
    [/\d%/, 'Castellano: el porcentaje lleva espacio (35 %)'],
    [/\b\d+\.\d{1,2}\b(?!\.)/, 'Castellano: ¿decimal con punto? Va con coma (0,75)'],
  ],
  en: [
    [/\d\s%/, 'Inglés: el porcentaje va pegado (35%)'],
    [/\b\d+,\d{1,2}\b(?!,)/, 'Inglés: ¿decimal con coma? Va con punto (0.75); la coma es de los miles (1,230)'],
  ],
  ar: [
    [/\d\s%/, 'Árabe: el porcentaje va pegado (35%) y con cifras latinas'],
    [/\b\d+,\d{1,2}\b(?!,)/, 'Árabe: ¿decimal con coma? Va con punto (0.75)'],
    [/[٠-٩]/, 'Árabe: cifras latinas (0–9), no indoarábigas'],
  ],
}
const claim = /\b\d[\d.,]*\s*(ikasle|alumn|estudiante|students?|users?|usuari|طالب|طلاب)/i

let problems = 0
const say = (lang, msg) => { problems += 1; console.log(`[${lang}] ${msg}`) }
for (const lang of ['eu', 'es', 'en', 'ar']) {
  const t = sections[lang]
  if (!t) { say(lang, 'falta la sección (## ' + lang + ')'); continue }
  console.log(`[${lang}] ${t.length} caracteres · ${(t.match(/#[\p{L}\p{N}_]+/gu) || []).length} hashtags`)
  if (!/matella\.net/i.test(t)) say(lang, 'no menciona matella.net')
  if (lang === 'ar' && !/[؀-ۿ]/.test(t)) say(lang, 'no hay texto en árabe')
  if (lang !== 'ar' && /[؀-ۿ]/.test(t)) say(lang, 'lleva caracteres árabes')
  if (/\{,\}/.test(t)) say(lang, 'queda un «{,}» sin resolver')
  for (const [re, msg] of rules[lang]) if (re.test(t)) say(lang, msg)
  const c = t.match(claim)
  if (c) say(lang, `cifra de personas («${c[0]}»): ¿es un dato real y comprobado? No se inventan cifras ni testimonios`)
}
console.log(problems ? `\n${problems} cosas que mirar.` : '\nSin avisos mecánicos. Falta la lectura de una persona nativa en árabe e inglés.')
process.exit(problems ? 1 : 0)

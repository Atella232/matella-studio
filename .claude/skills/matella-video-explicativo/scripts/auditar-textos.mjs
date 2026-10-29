#!/usr/bin/env node
// Audita que cada texto del guion de una unidad (euskera) tenga traducción en texts.js (es, en, ar).
//   node auditar-textos.mjs <unidad>        p. ej. ekuazioak, aljebra, zatikiak
// Sin traducción, TR() deja el euskera en el vídeo SIN avisar: por eso se audita antes de renderizar.
// Carga el guion en un entorno aislado (vm) con comodines para lib.js: no abre navegador ni dibuja nada.
// Mira lo que pasa por TR(): gancho, título, pegatinas, subtítulo, capítulos, pies, resumen y quiz.
// No ve los textos que un draw() compone o dibuja él mismo (plantillas `${n} egun`, etiquetas de fichas):
// esos se comprueban mirando el vídeo (ver SKILL.md).
import vm from 'node:vm'
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const unit = process.argv[2]
if (!unit) {
  console.error('Uso: node auditar-textos.mjs <unidad>')
  process.exit(1)
}
function findV2() {
  for (let d = dirname(fileURLToPath(import.meta.url)); ; d = dirname(d)) {
    const v2 = join(d, 'promo', 'explicaciones', 'v2')
    if (existsSync(v2)) return v2
    if (dirname(d) === d) throw new Error('No encuentro promo/explicaciones/v2 (promo/ solo existe en el Mac del dueño, no está en git).')
  }
}
const dir = findV2()
if (!existsSync(join(dir, `${unit}.js`))) {
  console.error(`No existe ${join(dir, unit + '.js')}`)
  process.exit(1)
}

// comodín: cualquier cosa de lib.js que el guion toque al cargarse se puede llamar, indexar y recorrer
const stub = () => new Proxy(function () {}, {
  get: (t, k) => (k === Symbol.iterator ? function* () {} : k === Symbol.toPrimitive ? () => 0 : stub()),
  apply: () => stub(), construct: () => stub(), has: () => true
})
const real = { LESSONS: {}, console, Math, Map, Set, Object, Array, String, Number, JSON, Symbol, Date, RegExp, Error }
const ctx = new Proxy(real, { has: () => true, get: (t, k) => (k in t ? t[k] : k === Symbol.unscopables ? undefined : stub()), set: (t, k, v) => ((t[k] = v), true) })
vm.createContext(ctx)
vm.runInContext(readFileSync(join(dir, 'texts.js'), 'utf8'), ctx)
vm.runInContext(readFileSync(join(dir, `${unit}.js`), 'utf8'), ctx)
const stages = real.LESSONS[unit]
if (!stages) {
  console.error(`El guion no define LESSONS.${unit}`)
  process.exit(1)
}

const texts = (S) => {
  const out = []
  const add = (where, s) => typeof s === 'string' && s.trim() && out.push([where, s])
  ;(S.hook || []).forEach((s, i) => add(`hook[${i}]`, s))
  ;(S.title || []).forEach((s, i) => add(`title[${i}]`, s))
  ;(S.stickers || []).forEach((s, i) => add(`stickers[${i}]`, s))
  add('sub', S.sub)
  ;(S.acts || []).forEach((a, i) => {
    ;(Array.isArray(a.chapter) ? a.chapter.map((c) => c[1]) : [a.chapter]).forEach((c) => add(`acto ${i + 1} · capítulo`, c))
    ;(a.caps || []).forEach(([t, s]) => add(`acto ${i + 1} · pie ${t}s`, s))
  })
  ;(S.summary || []).forEach(([a, b], i) => { add(`resumen ${i + 1}a`, a); add(`resumen ${i + 1}b`, b) })
  if (S.quiz) {
    ;(S.quiz.q || []).forEach((s, i) => add(`quiz.q[${i}]`, s))
    ;(S.quiz.opts || []).forEach((s, i) => add(`quiz.opts[${i}]`, s))
    add('quiz.why', S.quiz.why)
  }
  return out
}
// Símbolos, letras sueltas y productos (a, 2ab, (a + b)²) y unidades (kg, cm, min…) se escriben igual en
// todos los idiomas: solo se exige traducción si hay alguna palabra de 3 letras o más
const UNITS = new Set(['kg', 'cm', 'km', 'mm', 'dm', 'hm', 'ml', 'cl', 'dl', 'hl', 'kl', 'dam', 'min', 'gr', 'dg', 'hg', 'dag', 'm'])
const needsText = (s) => (s.replace(/\{[a-z]\|([^}]*)\}/g, '$1').match(/\p{L}{3,}/gu) || []).some((w) => !UNITS.has(w.toLowerCase()))

let missing = 0
for (const [id, S] of Object.entries(stages)) {
  for (const lang of ['es', 'en', 'ar']) {
    const dict = real.DICT[lang] || {}
    const miss = texts(S).filter(([, s]) => needsText(s) && dict[s] === undefined)
    for (const [where, s] of miss) console.log(`[${unit}:${id}] falta en ${lang} · ${where}: ${s}`)
    missing += miss.length
  }
}
console.log(missing ? `\n${missing} textos sin traducción.` : `\nOK: todos los textos de ${unit} tienen traducción en es, en y ar.`)
process.exit(missing ? 1 : 0)

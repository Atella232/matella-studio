#!/usr/bin/env node
// Lista los errores típicos que YA conoce una unidad de Matella (código + explicación), sacados de su
// carrera (games/race.ts) y su detective (games/detective.ts). Son el vocabulario para clasificar.
//   node taxonomia-unidad.mjs <unidad>            p. ej. dbh2-ekuazioak-v2   (o solo «ekuazioak»: busca coincidencias)
//   node taxonomia-unidad.mjs --all               nº de códigos por unidad
// Lectura por regex sobre el código fuente: sirve para consultar, no para editar.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

function findPages() {
  for (let d = dirname(fileURLToPath(import.meta.url)); ; d = dirname(d)) {
    if (existsSync(join(d, 'src', 'pages'))) return join(d, 'src', 'pages')
    if (dirname(d) === d) throw new Error('No encuentro src/pages')
  }
}
const pages = findPages()
const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : '')
const STR = String.raw`'((?:[^'\\]|\\.)*)'`
const unq = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\')

function codesOf(src) {
  const out = new Map()
  // tipos unión: export type XError = | 'a' | 'b'
  for (const m of src.matchAll(/export type (\w*(?:Error|Mistake)\w*)\s*=([\s\S]*?)(?:\n\n|\nexport|\ninterface|\nconst)/g)) {
    for (const c of m[2].matchAll(/'([\w-]+)'/g)) if (!out.has(c[1])) out.set(c[1], { tipo: m[1], es: '', nombre: '' })
  }
  // tablas «…ErrorNames» (nombre corto) y «…ErrorTips» (explicación): 'codigo': say('eu', 'es', 'ar')
  for (const t of src.matchAll(/export const \w*Error(Names|Tips)\b[^=]*=\s*\{([\s\S]*?)\n\}/g)) {
    const campo = t[1] === 'Names' ? 'nombre' : 'es'
    for (const m of t[2].matchAll(new RegExp(String.raw`^\s+'?([\w-]+)'?:\s*say\(\s*${STR}\s*,\s*${STR}`, 'gm'))) {
      const cur = out.get(m[1]) || { tipo: '(solo explicación)', es: '', nombre: '' }
      cur[campo] = unq(m[3])
      out.set(m[1], cur)
    }
  }
  const spread = [...src.matchAll(/\.\.\.(\w*ErrorTips)\b/g)].map((m) => m[1])
  return { out, spread }
}

function unitTaxonomy(unit) {
  const result = []
  for (const file of ['race.ts', 'detective.ts']) {
    const src = read(join(pages, unit, 'games', file))
    if (!src) continue
    const { out, spread } = codesOf(src)
    result.push({ file, codes: out, spread })
  }
  return result
}

const arg = process.argv[2]
if (!arg) {
  console.error('Uso: node taxonomia-unidad.mjs <unidad> | --all')
  process.exit(1)
}
const units = readdirSync(pages).filter((u) => u.startsWith('dbh') && statSync(join(pages, u)).isDirectory())
if (arg === '--all') {
  for (const u of units) {
    const t = unitTaxonomy(u)
    const n = new Set(t.flatMap((x) => [...x.codes.keys()])).size
    console.log(`${u.padEnd(44)} ${String(n).padStart(3)} códigos${t.some((x) => x.spread.length) ? '  (+ hereda de otra unidad)' : ''}`)
  }
  process.exit(0)
}
const matches = units.includes(arg) ? [arg] : units.filter((u) => u.includes(arg))
if (!matches.length) {
  console.error(`Ninguna unidad coincide con «${arg}».`)
  process.exit(1)
}
if (matches.length > 1) {
  console.error('Varias unidades coinciden; elige una:\n  ' + matches.join('\n  '))
  process.exit(1)
}
const unit = matches[0]
console.log(`Unidad: ${unit}`)
for (const { file, codes, spread } of unitTaxonomy(unit)) {
  console.log(`\n${file} — ${codes.size} códigos${spread.length ? `  (además hereda: ${spread.join(', ')}; ver la unidad de origen)` : ''}`)
  for (const [code, info] of codes) console.log(`  ${code.padEnd(22)} ${info.nombre ? info.nombre + ' — ' : ''}${info.es.slice(0, 110)}`)
}

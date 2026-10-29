#!/usr/bin/env node
// Resume una clasificación de errores en un informe de clase (Markdown). Solo cuenta: no ve nombres.
//   node resumen-errores.mjs errores.csv [--titulo "Examen de ecuaciones"] > informe.md
// CSV (separador coma o punto y coma), una fila por alumno y ejercicio:
//   alumno_id,ejercicio,resultado,codigo_error,nota
//   A01,3,error,added-percents,sumó 20+10 en vez de encadenar
// resultado: ok | error | blanco | ilegible.  codigo_error: solo si resultado = error (código de la unidad,
// o uno nuevo que empiece por «nuevo:»). alumno_id debe ser un código (A01…), nunca un nombre.
import { readFileSync } from 'node:fs'

const [, , file, ...rest] = process.argv
if (!file) {
  console.error('Uso: node resumen-errores.mjs errores.csv [--titulo "…"]')
  process.exit(1)
}
const titulo = rest.includes('--titulo') ? rest[rest.indexOf('--titulo') + 1] : 'Diagnóstico de errores'
const text = readFileSync(file, 'utf8').replace(/^﻿/, '').trim().split(/\r?\n/)
const sep = text[0].includes(';') ? ';' : ','
const head = text[0].split(sep).map((h) => h.trim().toLowerCase())
const col = (n) => head.indexOf(n)
for (const n of ['alumno_id', 'ejercicio', 'resultado']) {
  if (col(n) < 0) {
    console.error(`Falta la columna «${n}».`)
    process.exit(1)
  }
}
const rows = text.slice(1).filter(Boolean).map((l) => l.split(sep).map((c) => c.trim()))
const get = (r, n) => (col(n) >= 0 ? r[col(n)] || '' : '')
// un nombre propio escrito donde va el código: aviso, por si se coló un dato personal
const suspicious = new Set(rows.map((r) => get(r, 'alumno_id')).filter((id) => !/^[A-Za-z]{0,3}\d{1,3}$/.test(id)))
const alumnos = new Set(rows.map((r) => get(r, 'alumno_id')))
const ejercicios = [...new Set(rows.map((r) => get(r, 'ejercicio')))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

const pct = (a, b) => (b ? `${Math.round((100 * a) / b)} %` : '–')
const lines = [`# ${titulo}`, '', `${alumnos.size} alumnos · ${rows.length} respuestas clasificadas.`]
if (alumnos.size < 8) lines.push('', '> Pocos alumnos: lee los porcentajes como indicios, no como conclusiones.')
if (suspicious.size) lines.push('', `> ⚠ Estos «alumno_id» no parecen códigos (¿nombres?): ${[...suspicious].join(', ')}. Sustitúyelos por A01, A02… antes de guardar o compartir esto.`)

lines.push('', '## Por ejercicio', '', '| Ejercicio | ok | error | blanco | ilegible | % acierto |', '|---|---|---|---|---|---|')
for (const e of ejercicios) {
  const r = rows.filter((x) => get(x, 'ejercicio') === e)
  const n = (k) => r.filter((x) => get(x, 'resultado').toLowerCase() === k).length
  const valid = r.length - n('ilegible')
  lines.push(`| ${e} | ${n('ok')} | ${n('error')} | ${n('blanco')} | ${n('ilegible')} | ${pct(n('ok'), valid)} |`)
}

const errors = rows.filter((x) => get(x, 'resultado').toLowerCase() === 'error')
const byCode = new Map()
for (const r of errors) {
  const c = get(r, 'codigo_error') || '(sin clasificar)'
  const e = byCode.get(c) || { n: 0, ex: new Set(), alumnos: new Set(), nota: '' }
  e.n += 1
  e.ex.add(get(r, 'ejercicio'))
  e.alumnos.add(get(r, 'alumno_id'))
  if (!e.nota && get(r, 'nota')) e.nota = get(r, 'nota')
  byCode.set(c, e)
}
lines.push('', '## Errores más frecuentes', '', '| Error | Veces | % de los errores | Alumnos | Ejercicios | Ejemplo |', '|---|---|---|---|---|---|')
for (const [c, e] of [...byCode].sort((a, b) => b[1].n - a[1].n)) {
  lines.push(`| ${c}${c.startsWith('nuevo:') ? ' (nuevo)' : ''} | ${e.n} | ${pct(e.n, errors.length)} | ${e.alumnos.size} | ${[...e.ex].join(', ')} | ${e.nota} |`)
}
const nuevos = [...byCode.keys()].filter((c) => c.startsWith('nuevo:'))
if (nuevos.length) lines.push('', `Errores nuevos (no están todavía en la web): ${nuevos.join(', ')}. Son candidatos a distractores y a líneas del detective.`)
const sinClasif = byCode.get('(sin clasificar)')
if (sinClasif) lines.push('', `⚠ ${sinClasif.n} errores sin código: clasifícalos antes de sacar conclusiones.`)
console.log(lines.join('\n'))

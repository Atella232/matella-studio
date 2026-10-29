#!/usr/bin/env node
// Inventario de juegos y herramientas de laboratorio de una unidad V2: cuáles son PROPIOS
// (pensados para el tema) y cuáles repetidos o prestados de otra unidad.
//   node inventario-unidad.mjs <carpeta-o-nombre-de-unidad> [--games 2] [--tools 2]
//   node inventario-unidad.mjs --all                 (tabla de todas las unidades)
// Sale con código 1 si la unidad no llega al mínimo (por defecto 2 juegos y 2 herramientas propios).
//
// Qué cuenta como propio (ver references/juegos-y-herramientas-propios.md):
//  · juego: cualquiera que no sea «race» ni «memory» (carrera y parejas con otras preguntas NO cuentan);
//    «detective» se marca como juego de patrón: cuenta solo si sus fallos son los errores típicos del tema;
//    un componente importado de la carpeta de OTRA unidad se cuenta como prestado.
//  · herramienta: id declarado en lab/labTools.ts cuyo componente vive en la propia carpeta de la unidad.
// Es una heurística sobre el código (regex): sirve para decidir, no sustituye a abrir la unidad.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, resolve, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
function findRepo() {
  for (let d = here; ; d = dirname(d)) {
    if (existsSync(join(d, 'src', 'pages'))) return d
    if (dirname(d) === d) throw new Error('No encuentro src/pages (¿estás dentro del repositorio?)')
  }
}
const repo = findRepo()
const pages = join(repo, 'src', 'pages')

const args = process.argv.slice(2)
const flag = (name, def) => {
  const i = args.indexOf(name)
  return i >= 0 ? Number(args[i + 1]) : def
}
const minGames = flag('--games', 2)
const minTools = flag('--tools', 2)
const all = args.includes('--all')
const target = args.find((a, i) => !a.startsWith('--') && !['--games', '--tools'].includes(args[i - 1]))

const GENERIC = new Set(['race', 'memory'])
const PATTERN = new Set(['detective'])
const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : '')

/** Identificadores importados desde la carpeta de otra unidad (../../dbhX-…/) */
function borrowed(source, unit) {
  const names = new Set()
  for (const m of source.matchAll(/import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+'\.\.\/\.\.\/(dbh[\w-]+)\//g)) {
    if (m[2] === unit) continue
    for (const n of m[1].split(',')) names.add(n.trim().split(/\s+as\s+/).pop())
  }
  for (const m of source.matchAll(/import\s+(\w+)\s+from\s+'\.\.\/\.\.\/(dbh[\w-]+)\//g)) if (m[2] !== unit) names.add(m[1])
  return names
}

function inventory(unit) {
  const dir = join(pages, unit)
  // el prototipo de Zatikiak guarda los ids de sus juegos en records.ts
  const info = read(join(dir, 'games', 'info.ts')) + read(join(dir, 'games', 'records.ts'))
  const gamesIdx = read(join(dir, 'games', 'index.tsx'))
  // Los ids salen de la unión de tipos (type XGameId = 'race' | 'memory'); si no hay, de las claves de components
  const unionIds = (src, suffix) => [...src.matchAll(new RegExp(`type\\s+\\w*${suffix}\\s*=\\s*([^\\n]+)`, 'g'))].flatMap((m) => [...m[1].matchAll(/'([\w-]+)'/g)].map((x) => x[1]))
  let ids = unionIds(info, 'GameId')
  if (!ids.length) ids = unionIds(gamesIdx, 'GameId')
  if (!ids.length) ids = [...(gamesIdx.match(/const components[^=]*=\s*\{([\s\S]*?)\}/)?.[1] || '').matchAll(/^\s*(\w+)\s*:/gm)].map((m) => m[1])
  const gameBorrow = borrowed(gamesIdx, unit)
  const games = [...new Set(ids)].map((id) => {
    if (GENERIC.has(id)) return { id, kind: 'genérico' }
    const line = gamesIdx.split('\n').find((l) => new RegExp(`\\b${id}\\s*:`).test(l)) || ''
    const prestado = [...gameBorrow].some((n) => line.includes(n))
    return { id, kind: prestado ? 'prestado' : PATTERN.has(id) ? 'patrón' : 'propio' }
  })

  const labTools = read(join(dir, 'lab', 'labTools.ts'))
  const labIdx = read(join(dir, 'lab', 'index.tsx'))
  let toolIds = unionIds(labTools, 'ToolId')
  if (!toolIds.length) toolIds = [...labTools.matchAll(/\bid:\s*'([\w-]+)',?\s*\n?\s*stage:/g)].map((m) => m[1])
  toolIds = [...new Set(toolIds)]
  const toolBorrow = borrowed(labIdx, unit)
  const tools = toolIds.map((id) => {
    const m = labIdx.match(new RegExp(`\\b${id}\\s*:\\s*(\\w+)`))
    const comp = m ? m[1] : ''
    return { id, kind: comp && toolBorrow.has(comp) ? 'prestado' : 'propio' }
  })
  return { unit, games, tools }
}

const count = (list, kind) => list.filter((x) => x.kind === kind).length
const ownGames = (inv) => count(inv.games, 'propio')
const ownTools = (inv) => count(inv.tools, 'propio')

if (all) {
  const units = readdirSync(pages).filter((u) => u.startsWith('dbh') && statSync(join(pages, u)).isDirectory())
  const rows = units.map(inventory)
  console.log('unidad'.padEnd(44), 'juegos propios', '| herramientas propias / total')
  for (const r of rows) console.log(r.unit.padEnd(44), String(ownGames(r)).padStart(8), '        |', `${ownTools(r)} / ${r.tools.length}`)
  const withGames = rows.filter((r) => r.games.length)
  console.log(`\n${withGames.filter((r) => ownGames(r) === 0).length} de ${withGames.length} unidades con juegos no tienen ninguno propio (solo carrera/parejas o prestados).`)
  process.exit(0)
}

if (!target) {
  console.error('Uso: node inventario-unidad.mjs <unidad> [--games N] [--tools N]   |   --all')
  process.exit(1)
}
const unit = existsSync(target) ? basename(resolve(target)) : target
if (!existsSync(join(pages, unit))) {
  console.error(`No existe src/pages/${unit}`)
  process.exit(1)
}
const inv = inventory(unit)
const show = (title, list) => {
  console.log(`\n${title}`)
  if (!list.length) console.log('  (ninguno)')
  for (const x of list) console.log(`  ${x.kind.padEnd(9)} ${x.id}`)
}
console.log(`Unidad: ${unit}`)
show('Juegos', inv.games)
show('Herramientas del laboratorio', inv.tools)
const gOk = ownGames(inv) >= minGames
const tOk = ownTools(inv) >= minTools
console.log(`\nMínimo: ${minGames} juegos propios (hay ${ownGames(inv)}) → ${gOk ? 'OK' : 'FALTAN'} · ${minTools} herramientas propias (hay ${ownTools(inv)}) → ${tOk ? 'OK' : 'FALTAN'}`)
if (inv.games.some((g) => g.kind === 'patrón')) console.log('Nota: «detective» es un juego de patrón; solo cuenta de verdad si sus fallos son los errores típicos de ESTA unidad.')
process.exit(gOk && tOk ? 0 : 1)

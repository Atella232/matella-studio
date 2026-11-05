// Hoja de revisión del euskera de una unidad V2: cada texto en euskera y castellano, lado a lado,
// con las fórmulas dibujadas (KaTeX desde un CDN). Se abre en el navegador y se manda al dueño.
//
//   node .claude/skills/matella-nueva-unidad/scripts/hoja-revision.mjs <carpeta> <salida.html> "<título>" [--herramientas a,b,c] [--juegos a,b,c]
//
// <carpeta> es la de src/pages (p. ej. batx1-zientziak-ekuazioak). --herramientas y --juegos limitan el
// laboratorio y los juegos a los propios (ids); sin ellos salen todos. Lee lessons.tsx como texto y
// importa los .ts de datos (lessonTexts, lessonChecks, lab/labTools, games/info, games/detective,
// games/race); lo que no se pueda importar se salta con un aviso. También recoge los textos escritos
// en las pantallas (.tsx) de lab/ y games/: say('eu', 'es', …) y { eu: '…', es: '…' }.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const args = process.argv.slice(2)
const option = (name) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1].split(',') : null }
const [folder, out, title] = args.filter((arg, index) => !arg.startsWith('--') && !args[index - 1]?.startsWith('--'))
if (!folder || !out) {
    console.error('Uso: hoja-revision.mjs <carpeta> <salida.html> "<título>" [--herramientas a,b] [--juegos a,b]')
    process.exit(1)
}
const ownTools = option('--herramientas')
const ownGames = option('--juegos')
const root = join(process.cwd(), 'src/pages', folder)

async function load(file) {
    const path = join(root, file)
    if (!existsSync(path)) return null
    try {
        return await import(path)
    } catch (error) {
        console.warn(`Aviso: no se puede importar ${file} (${error.message.split('\n')[0]}); se salta.`)
        return null
    }
}
const exportWhere = (module, test) => (module ? Object.entries(module).find(([name, value]) => test(name, value))?.[1] : undefined)
const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value)

const texts = exportWhere(await load('lessonTexts.ts'), (_, value) => isObject(value)) ?? {}
const checks = exportWhere(await load('lessonChecks.ts'), (_, value) => isObject(value)) ?? {}
const source = readFileSync(join(root, 'lessons.tsx'), 'utf8')
const q = "'((?:[^'\\\\]|\\\\.)*)'"
const field = (block, name) => { const m = block.match(new RegExp(`${name}: say\\(${q}, ${q}`)); return m ? { eu: m[1], es: m[2] } : null }
const esc = (text) => String(text).replace(/\\'/g, "'").replace(/\\\\/g, '\\').replace(/&/g, '&amp;').replace(/</g, '&lt;')
const row = (label, value) => (value ? `<tr><th>${label}</th><td>${esc(value.eu)}</td><td>${esc(value.es)}</td></tr>` : '')
const head = '<table><tr><th></th><th>Euskara</th><th>Castellano</th></tr>'

let html = `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Revisión · ${folder}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body,{delimiters:[{left:'$',right:'$',display:false}]})"></script>
<style>body{font-family:system-ui,sans-serif;margin:24px;background:#f6f1e7;color:#1d2733}h1{font-size:22px}h2{margin-top:32px;font-size:18px;border-bottom:2px solid #1d2733}table{border-collapse:collapse;width:100%;background:#fffcf6}th,td{border:1px solid #d8cfbf;padding:6px 8px;vertical-align:top;text-align:left;font-size:14px}th{width:120px;color:#58616e;font-weight:600}td{width:44%}</style>
<h1>Revisión del euskera · ${esc(title ?? folder)}</h1><p>Euskera a la izquierda, castellano a la derecha.</p>`

// The unit and its stages
const unitSource = existsSync(join(root, 'index.tsx')) ? readFileSync(join(root, 'index.tsx'), 'utf8') : ''
const pairs = (text, name) => [...text.matchAll(new RegExp(`${name}: \\{\\s*eu: ${q},\\s*es: ${q}`, 'g'))].map((m) => ({ eu: m[1], es: m[2] }))
html += `<h2>La unidad</h2>${head}`
for (const name of ['title', 'tagline', 'pathSubtitle']) for (const value of pairs(unitSource, name)) html += row(name, value)
for (const value of [...source.matchAll(new RegExp(`\\{ id: '[a-z-]+', tone: '[a-z]+', title: \\{ eu: ${q}, es: ${q}`, 'g'))].map((m) => ({ eu: m[1], es: m[2] }))) html += row('Etapa', value)
html += '</table>'

// The laboratory and the games
const labTools = exportWhere(await load('lab/labTools.ts'), (_, value) => Array.isArray(value) && value[0]?.observe) ?? []
const games = exportWhere(await load('games/info.ts'), (_, value) => Array.isArray(value) && value[0]?.levels) ?? []
const detective = await load('games/detective.ts')
const race = await load('games/race.ts')
html += `<h2>Laboratorio y juegos</h2>${head}`
for (const tool of labTools.filter((item) => !ownTools || ownTools.includes(item.id))) html += row('Herramienta', tool.title) + row('Qué observar', tool.observe)
for (const game of games.filter((item) => !ownGames || ownGames.includes(item.id))) {
    html += row('Juego', game.title) + row('Lema', game.tagline) + row('Habilidad', game.skills)
    for (const level of game.levels) html += row('Nivel', level.title) + row('Descripción', level.description)
}
for (const name of Object.values(exportWhere(detective, (key) => key.endsWith('DetectiveNames')) ?? {})) html += row('Error (detective)', name)
for (const tip of Object.values(exportWhere(detective, (key) => key.endsWith('DetectiveTips')) ?? {})) html += row('Pista (detective)', tip)
for (const tip of Object.values(exportWhere(race, (key) => key.endsWith('RaceErrorTips')) ?? {})) html += row('Pista (carrera)', tip)
// Texts written in the screens themselves
for (const dir of ['lab', 'games']) {
    if (!existsSync(join(root, dir))) continue
    for (const file of readdirSync(join(root, dir)).filter((name) => name.endsWith('.tsx'))) {
        const screen = readFileSync(join(root, dir, file), 'utf8')
        for (const m of screen.matchAll(/say\((['`])((?:(?!\1)[^\\]|\\.)*)\1, (['`])((?:(?!\3)[^\\]|\\.)*)\3/g)) html += row(`Pantalla (${file})`, { eu: m[2], es: m[4] })
        for (const m of screen.matchAll(/\{ eu: '((?:[^'\\]|\\.)*)', es: '((?:[^'\\]|\\.)*)'/g)) html += row(`Pantalla (${file})`, { eu: m[1], es: m[2] })
    }
}
html += '</table>'

// Every lesson
for (const [id, entry] of Object.entries(texts)) {
    const start = source.search(new RegExp(`id: '${id}',\\s*stage:`))
    const block = start < 0 ? '' : source.slice(start, source.indexOf('figure:', start))
    const steps = [...block.matchAll(new RegExp(`text: say\\(${q}, ${q}`, 'g'))].map((m) => ({ eu: m[1], es: m[2] }))
    const check = checks[id]
    html += `<h2>${esc(field(block, 'title')?.es ?? id)}</h2>${head}`
    html += row('Título', field(block, 'title')) + row('Objetivo', field(block, 'goal')) + row('Problema', field(block, 'problem'))
    steps.forEach((step, i) => { html += row(`Paso ${i + 1}`, step) })
    html += row('Idea clave', field(block, 'takeaway'))
    for (const d of entry.definitions ?? []) html += row('Definición', { eu: `${d.term.eu}: ${d.meaning.eu}`, es: `${d.term.es}: ${d.meaning.es}` })
    html += row('Explicación', entry.explanation) + row('Otro ejemplo', entry.examplePrompt) + row('Respuesta', entry.exampleAnswer)
    if (entry.why) html += row('¿Por qué?', entry.why.text)
    if (entry.vocabulary) html += row('Vocabulario', { eu: entry.vocabulary.map((w) => w.eu).join(' · '), es: entry.vocabulary.map((w) => w.es).join(' · ') })
    if (check) {
        html += row('Error típico', { eu: `${check.mistake.wrong.eu} → ${check.mistake.right.eu}`, es: `${check.mistake.wrong.es} → ${check.mistake.right.es}` })
        html += row('Compruébalo', { eu: `${check.check.prompt.eu} (${check.check.options.map((o) => o.eu).join(' / ')})`, es: `${check.check.prompt.es} (${check.check.options.map((o) => o.es).join(' / ')})` })
        html += row('Explicación', check.check.explanation)
    }
    html += '</table>'
}
writeFileSync(out, html)
console.log(`${Object.keys(texts).length} lecciones → ${out}`)

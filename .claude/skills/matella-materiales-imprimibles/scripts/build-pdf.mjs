#!/usr/bin/env node
// HTML de Matella → PDF A4 con Chrome sin cabeza.
//   node build-pdf.mjs <entrada.html> [salida.pdf]
// Hace cuatro cosas que a mano se olvidan:
//   1. sustituye <!-- matella:css --> por tokens.css de la marca + print.css + el CSS de KaTeX;
//   2. pre-renderiza las fórmulas: \( … \) en línea y \[ … \] en bloque (KaTeX del repositorio);
//   3. antepone <!doctype html> (modo estándar, como en el visor; sin él Chrome imprime distinto);
//   4. espera a que carguen las fuentes web antes de imprimir.
import { createRequire } from 'node:module'
import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'

const here = dirname(fileURLToPath(import.meta.url))
const skillDir = resolve(here, '..')
const brandCss = resolve(skillDir, '..', 'matella-marca', 'tokens.css')
const printCss = resolve(skillDir, 'assets', 'print.css')
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const [, , inArg, outArg] = process.argv
if (!inArg) {
  console.error('Uso: node build-pdf.mjs <entrada.html> [salida.pdf]')
  process.exit(1)
}
const inFile = resolve(inArg)
const outFile = resolve(outArg || inFile.replace(/\.html?$/i, '') + '.pdf')

// KaTeX: el del repositorio (sube carpetas hasta encontrar node_modules/katex)
function findKatex() {
  if (process.env.KATEX_DIR) return process.env.KATEX_DIR
  for (let d = skillDir; ; d = dirname(d)) {
    const c = join(d, 'node_modules', 'katex')
    if (existsSync(join(c, 'dist', 'katex.mjs'))) return c
    if (dirname(d) === d) throw new Error('No encuentro node_modules/katex (npm install en el repositorio, o KATEX_DIR).')
  }
}
const katexDir = findKatex()
const katex = createRequire(join(katexDir, 'package.json'))('./dist/katex.js')

// Los comentarios HTML se quitan antes (menos el marcador del CSS): pueden mencionar \( sin ser fórmulas
let html = readFileSync(inFile, 'utf8').replace(/<!--(?! matella:css)[\s\S]*?-->/g, '')

// 2. fórmulas. El bloque va primero para que \[ no se confunda con \(
const render = (tex, displayMode) =>
  `<span class="m-ltr">${katex.renderToString(tex.trim(), { displayMode, throwOnError: true, output: 'html' })}</span>`
html = html
  .replace(/\\\[([\s\S]+?)\\\]/g, (_, t) => render(t, true))
  .replace(/\\\(([\s\S]+?)\\\)/g, (_, t) => render(t, false))

// 1. CSS: las fuentes de KaTeX por ruta absoluta (el HTML temporal vive en otra carpeta)
const fontsUrl = pathToFileURL(join(katexDir, 'dist', 'fonts')).href
const katexCss = readFileSync(join(katexDir, 'dist', 'katex.min.css'), 'utf8').replaceAll('url(fonts/', `url(${fontsUrl}/`)
const css = [readFileSync(brandCss, 'utf8'), readFileSync(printCss, 'utf8'), katexCss].join('\n')
if (html.includes('<!-- matella:css -->')) html = html.replace('<!-- matella:css -->', `<style>${css}</style>`)
else html = html.replace('</head>', `<style>${css}</style></head>`)

// 3. modo estándar y UTF-8
if (!/^\s*<!doctype html>/i.test(html)) html = '<!doctype html>\n' + html
if (!/<meta[^>]+charset/i.test(html)) html = html.replace('<head>', '<head><meta charset="utf-8">')

// 4. Chrome. --virtual-time-budget da tiempo a Google Fonts; el HTML temporal evita tocar el original
const tmp = mkdtempSync(join(tmpdir(), 'matella-print-'))
const tmpHtml = join(tmp, 'doc.html')
writeFileSync(tmpHtml, html)
const r = spawnSync(CHROME, [
  '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
  '--virtual-time-budget=20000',
  `--user-data-dir=${join(tmp, 'profile')}`,
  `--print-to-pdf=${outFile}`,
  pathToFileURL(tmpHtml).href,
], { encoding: 'utf8' })
rmSync(tmp, { recursive: true, force: true })
if (!existsSync(outFile)) {
  console.error('Chrome no generó el PDF.\n' + (r.stderr || ''))
  process.exit(1)
}
const pages = (readFileSync(outFile, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length
console.log(`${outFile}\n${pages} páginas`)

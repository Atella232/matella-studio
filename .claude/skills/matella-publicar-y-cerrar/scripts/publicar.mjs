#!/usr/bin/env node
// Ayudas de publicación de Matella. No publica nada: mira el estado y comprueba la web en vivo.
//   node publicar.mjs estado                 estado de git antes de publicar (rama, cambios, adelanto sobre origin)
//   node publicar.mjs en-vivo [--dir dist] [--url https://matella.net/] [--espera 300]
//        espera a que la web en vivo sirva los mismos archivos index-*.js / index-*.css que `dist/` local
//        (GitHub Pages tarda en torno a un minuto desde el deploy). Sale con 1 si no llega a coincidir.
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'

const [, , cmd = 'estado', ...rest] = process.argv
const opt = (name, def) => {
  const i = rest.indexOf(name)
  return i >= 0 ? rest[i + 1] : def
}
const git = (...a) => execFileSync('git', a, { encoding: 'utf8' }).trim()

if (cmd === 'estado') {
  const branch = git('branch', '--show-current')
  console.log(`Rama: ${branch || '(sin rama: HEAD suelto)'}  ·  ${git('log', '--oneline', '-1')}`)
  try { git('fetch', '--quiet', 'origin') } catch { console.log('Aviso: no he podido hacer fetch de origin (¿sin red?); los números de abajo pueden estar desfasados.') }
  const [behind, ahead] = git('rev-list', '--left-right', '--count', 'origin/main...HEAD').split(/\s+/).map(Number)
  console.log(`Respecto a origin/main: ${ahead} commits por delante, ${behind} por detrás.`)
  const dirty = git('status', '--porcelain').split('\n').filter(Boolean)
  const tracked = dirty.filter((l) => !l.startsWith('??'))
  const untracked = dirty.filter((l) => l.startsWith('??'))
  console.log(`Cambios sin confirmar en archivos con seguimiento: ${tracked.length}${tracked.length ? '\n  ' + tracked.join('\n  ') : ''}`)
  console.log(`Archivos nuevos sin seguimiento: ${untracked.length}${untracked.length ? '\n  ' + untracked.join('\n  ') : ''}`)
  let main = false
  try { git('merge-base', '--is-ancestor', 'main', 'HEAD'); main = true } catch { /* no */ }
  console.log(main ? 'main es ancestro de esta rama: se puede fusionar con --ff-only.' : 'ATENCIÓN: main tiene commits que esta rama no tiene; hay que traerlos antes (la fusión no sería de avance rápido).')
  console.log('\nRecuerda: `npm run deploy` construye y publica LO QUE HAY EN LA CARPETA, no lo que hay en git.')
  if (tracked.length || untracked.some((l) => /src\//.test(l))) console.log('Hay trabajo sin confirmar que acabaría en la web: confirma (o aparta) ese trabajo, o publica desde un worktree limpio de main (ver SKILL.md).')
  process.exit(0)
}

if (cmd === 'en-vivo') {
  const dir = resolve(opt('--dir', 'dist'))
  const url = opt('--url', 'https://matella.net/')
  const wait = Number(opt('--espera', '300'))
  const indexFile = join(dir, 'index.html')
  if (!existsSync(indexFile)) {
    console.error(`No existe ${indexFile}: construye primero (npm run build).`)
    process.exit(1)
  }
  const bundles = (html) => [...html.matchAll(/assets\/(index-[\w-]+\.(?:js|css))/g)].map((m) => m[1]).sort().join(' ')
  const local = bundles(readFileSync(indexFile, 'utf8'))
  if (!local) {
    console.error('No encuentro archivos index-*.js en dist/index.html.')
    process.exit(1)
  }
  console.log(`Local (${dir}): ${local}`)
  const t0 = Date.now()
  for (;;) {
    let live = ''
    try { live = bundles(await (await fetch(url + '?t=' + Date.now(), { cache: 'no-store' })).text()) } catch (e) { live = `(error: ${e.message})` }
    if (live === local) {
      console.log(`En vivo coincide: ${live}  (${Math.round((Date.now() - t0) / 1000)} s)`)
      process.exit(0)
    }
    if ((Date.now() - t0) / 1000 > wait) {
      console.error(`Tras ${wait} s la web sirve otra cosa: ${live}`)
      process.exit(1)
    }
    console.log(`Aún sirve: ${live || '(nada)'} · reintento en 15 s`)
    await new Promise((r) => setTimeout(r, 15000))
  }
}

console.error('Uso: node publicar.mjs estado | en-vivo [--dir dist] [--url …] [--espera 300]')
process.exit(1)

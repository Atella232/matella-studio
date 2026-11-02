import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'

/* «Before you start, review…» links a lesson to a lesson of an earlier unit, by its address and with its title
   copied in four languages. The sources are read as text (the .tsx files hold drawings that node cannot import):
   the address must be a route of the router, the lesson must exist there and the copied title must still be its
   title. */

const root = new URL('../src/', import.meta.url)
const router = readFileSync(new URL('router/index.tsx', root), 'utf8')

/** Unit address under /matematika (dbh2/divisibilidad) → its folder in src/pages */
const folders = new Map<string, string>()
const pageFolders = new Map<string, string>()
for (const [, page, folder] of router.matchAll(/const (\w+) = lazy\(\(\) => import\('\.\.\/pages\/([^'/]+)'\)/g)) pageFolders.set(page, folder)
for (const [, address, page] of router.matchAll(/path: 'matematika\/([^']+)\/\*',\s*element: <(\w+)/g)) {
    const folder = pageFolders.get(page)
    if (folder) folders.set(address, folder)
}

function lessonsSource(folder: string): string {
    for (const file of ['lessons.ts', 'lessons.tsx']) {
        const url = new URL(`pages/${folder}/${file}`, root)
        if (existsSync(url)) return readFileSync(url, 'utf8')
    }
    return ''
}

const quoted = "'((?:[^'\\\\]|\\\\.)*)'"
const needPattern = new RegExp(`\\{ unit: '([^']+)', topic: '([^']+)', title: \\{ eu: ${quoted}, es: ${quoted}, en: ${quoted}, ar: ${quoted} \\} \\}`, 'g')

test('lessons: every «review first» link points to a lesson that exists, with its current title', () => {
    let links = 0
    for (const folder of readdirSync(new URL('pages/', root))) {
        const source = lessonsSource(folder)
        for (const [, address, topic, ...title] of source.matchAll(needPattern)) {
            links++
            const where = `${folder} → ${address}/${topic}`
            const target = folders.get(address)
            assert.ok(target, `${where}: no route for ${address}`)
            const targetSource = lessonsSource(target)
            // A lesson, not a stage with the same id: its next line is its stage
            const start = targetSource.search(new RegExp(`id: '${topic}',\\s*stage:`))
            assert.ok(start >= 0, `${where}: no lesson ${topic} in ${target}`)
            const head = targetSource.slice(start, targetSource.indexOf('goal:', start))
            for (const text of title) assert.ok(head.includes(`'${text}'`), `${where}: the title «${text}» is no longer the lesson's title`)
        }
    }
    assert.ok(links >= 48, `only ${links} links found: did the format of needs change?`)
})

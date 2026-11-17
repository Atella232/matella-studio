import { formulaFor } from '../src/utils/latexLanguage.ts'
import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import type { LocalizedText } from '../src/features/unit-v2/types.ts'
import { below } from '../src/pages/batx2-zientziak-banaketak/normal.ts'
import { criticalZ, inverseZ } from '../src/pages/batx2-gizarte-banaketak/critical.ts'
import { createCutoffRounds, CUTOFF_ROUNDS } from '../src/pages/batx2-gizarte-banaketak/games/cutoff.ts'
import { createDistributionsBatx2gDetectiveCases, DISTRIBUTIONS_BATX2G_DETECTIVE_CASES, distributionsBatx2gDetectiveLevels, distributionsBatx2gDetectiveNames, distributionsBatx2gDetectiveTips } from '../src/pages/batx2-gizarte-banaketak/games/detective.ts'
import { distributionsBatx2gGameModeForPath, distributionsBatx2gGameProgressIds, distributionsBatx2gGames, distributionsBatx2gGameSlugs } from '../src/pages/batx2-gizarte-banaketak/games/info.ts'
import { generateDistributionsBatx2gRaceQuestion } from '../src/pages/batx2-gizarte-banaketak/games/race.ts'
import { createStandoutRounds, STANDOUT_ROUNDS } from '../src/pages/batx2-gizarte-banaketak/games/standout.ts'
import { evaluate, near } from './latex-math.ts'

const languages = ['eu', 'es', 'en', 'ar'] as const
const render = (latex: string, language: (typeof languages)[number] = 'es') => katex.renderToString(formulaFor(language, latex), { throwOnError: true, strict: 'error' })

function checkTexts(texts: LocalizedText[]) {
    for (const text of texts) {
        for (const language of languages) {
            assert.ok(text[language].length > 0)
            for (const [, formula] of text[language].matchAll(/\$([^$]+)\$/g)) render(formula, language)
        }
        assert.ok(!text.ar.includes('{,}'), text.ar)
        const formulas = (value: string) => [...value.matchAll(/\$([^$]+)\$/g)].map((match) => match[1].replace(/\{,\}/g, '.')).sort()
        for (const language of ['eu', 'en', 'ar'] as const) assert.deepEqual(formulas(text[language]), formulas(text.es), `${language}: ${text[language]}`)
        assert.ok(!/\d[a-zñ]/.test(text.eu.replace(/\$[^$]+\$/g, '')), text.eu)
    }
}

const value = (latex: string) => evaluate(latex.replace(/\{,\}/g, '.'))!

test('banaketak batx2 g games: the hub, its levels and progress ids', () => {
    assert.deepEqual(distributionsBatx2gGames.map((game) => game.id), ['race', 'cutoff', 'standout', 'detective', 'area', 'hunt', 'memory'])
    assert.equal(new Set(distributionsBatx2gGameProgressIds).size, distributionsBatx2gGameProgressIds.length)
    for (const id of distributionsBatx2gGameProgressIds) assert.ok(id >= 151401 && id <= 151899, `${id}`)
    for (const game of distributionsBatx2gGames) {
        for (const level of game.levels) assert.ok(['discrete', 'binomial', 'normal', 'approximation'].includes(level.stage), `${game.id}: ${level.stage}`)
        checkTexts([game.title, game.tagline, game.skills, ...game.levels.flatMap((level) => [level.title, level.description])])
        assert.equal(distributionsBatx2gGameModeForPath(`/x/jokuak/${distributionsBatx2gGameSlugs[game.id]}`), game.id)
    }
    // The race: circuit i here is circuit i + 1 of 2.º Ciencias
    for (let circuit = 0; circuit < 4; circuit += 1) assert.equal(generateDistributionsBatx2gRaceQuestion(createRandom(circuit + 5), circuit, 1).circuit, circuit)
})

test('banaketak batx2 g games: the cut-off mark', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createCutoffRounds(createRandom(seed * 31 + level), level)
            assert.equal(rounds.length, CUTOFF_ROUNDS)
            for (const round of rounds) {
                assert.equal(round.options.filter((option) => option === round.answer).length, 1)
                assert.equal(new Set(round.options).size, 3)
                for (const option of round.options) render(option)
                checkTexts([round.prompt])
                if (round.side === 'centre') {
                    assert.equal(round.z, criticalZ(round.k))
                    // The interval holds k % of the bell, by the table
                    assert.ok(Math.abs(below(Math.floor(round.z * 100) / 100) - (10_000 - (10_000 - round.k * 100) / 2)) < 30)
                } else {
                    assert.equal(round.z, inverseZ(10_000 - round.k * 100))
                    const expected = round.side === 'top' ? round.mean + round.z * round.sd : round.mean - round.z * round.sd
                    assert.ok(near(value(round.answer), expected), `${round.answer} vs ${expected}`)
                }
            }
        }
    }
})

test('banaketak batx2 g games: who stands out most?', () => {
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 60; seed += 1) {
            const rounds = createStandoutRounds(createRandom(seed * 17 + level), level)
            assert.equal(rounds.length, STANDOUT_ROUNDS)
            for (const round of rounds) {
                for (const person of round.people) assert.ok(near((person.value - person.mean) / person.sd, person.z), `${person.name}`)
                const score = (z: number) => (round.unusual ? Math.abs(z) : z)
                const best = Math.max(...round.people.map((person) => score(person.z)))
                assert.equal(score(round.people[round.answer].z), best)
                assert.equal(round.people.filter((person) => score(person.z) === best).length, 1)
            }
        }
    }
})

test('banaketak batx2 g games: the detective has one wrong line, with a mistake of this unit', () => {
    assert.deepEqual(Object.keys(distributionsBatx2gDetectiveNames).sort(), distributionsBatx2gDetectiveLevels.flat().sort())
    checkTexts([...Object.values(distributionsBatx2gDetectiveNames), ...Object.values(distributionsBatx2gDetectiveTips)])
    for (let level = 0; level < 3; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cases = createDistributionsBatx2gDetectiveCases(createRandom(seed * 13 + level), level)
            assert.equal(cases.length, DISTRIBUTIONS_BATX2G_DETECTIVE_CASES)
            for (const item of cases) {
                assert.equal(item.lines.length, 3)
                assert.ok(!near(item.right, item.reached), `${item.error}`)
                checkTexts([item.problem, ...item.lines.map((entry) => entry.label)])
                for (const entry of item.lines) render(entry.latex)
                render(item.fix)
                const last = item.fix.replace(/\{,\}/g, '.').split(/=|\\to/).at(-1)!.replace(/^\\ /, '')
                const reached = evaluate(last.includes(';') ? last.split(';')[0].replace('(', '') : last)
                if (reached !== null && !last.includes(';')) assert.ok(Math.abs(reached - item.right) < 0.0006, `${item.error}: ${item.fix} vs ${item.right}`)
            }
        }
    }
})

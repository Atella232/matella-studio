import test from 'node:test'
import assert from 'node:assert/strict'
import katex from 'katex'
import { createRandom } from '../src/features/unit-v2/games/random.ts'
import { toNumber } from '../src/features/unit-v2/math/fraction.ts'
import { AREAS_VOLUMES_MEMORY_PAIRS, areasVolumesMemoryLevels, createAreasVolumesMemoryBoard } from '../src/pages/dbh4-aplikatuak-areak/games/boards.ts'
import { areasVolumesGameModeForPath, areasVolumesGameProgressIds, areasVolumesGames } from '../src/pages/dbh4-aplikatuak-areak/games/info.ts'
import { AREAS_VOLUMES_RACE_CIRCUITS, areasVolumesParTime, areasVolumesRaceErrorTips, checkAreasVolumesPitAnswer, generateAreasVolumesRaceQuestion } from '../src/pages/dbh4-aplikatuak-areak/games/race.ts'
import { areasVolumesLabChallengeIds } from '../src/pages/dbh4-aplikatuak-areak/lab/labTools.ts'

const mathIn = (text: string) => [...text.matchAll(/\$([^$]+)\$/g)].map((match) => match[1])
/** The numbers shown in a prompt, in order (decimal comma as {,}) */
const numbersIn = (text: string) => mathIn(text).map((formula) => Number(formula.replace('{,}', '.'))).filter((value) => !Number.isNaN(value))
const optionValue = (latex: string) => Number(latex.replace(/\\,/g, '').replace('{,}', '.'))
const close = (a: number, b: number) => Math.abs(a - b) < 1e-6

/** Plain arithmetic in LaTeX: fractions, products, powers and decimal commas */
function evaluate(latex: string): number {
    let js = latex.replace(/\\,/g, '').replace(/(\d)\{,\}(\d)/g, '$1.$2').replace(/\\cdot/g, '*').replace(/\s+/g, '')
    for (let pass = 0; pass < 3; pass += 1) js = js.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))').replace(/(\d+(?:\.\d+)?)\^\{(\d+)\}/g, '($1**$2)')
    assert.match(js, /^[\d+\-*/().]+$/, latex)
    return Function(`return ${js}`)() as number
}

test('areak 4. DBH ap games: levels, ids and routes', () => {
    assert.equal(areasVolumesGames.length, 2)
    assert.equal(areasVolumesGames[0].levels.length, AREAS_VOLUMES_RACE_CIRCUITS)
    assert.equal(areasVolumesGames[1].levels.length, areasVolumesMemoryLevels.length)
    assert.equal(new Set(areasVolumesGameProgressIds).size, areasVolumesGameProgressIds.length)
    assert.ok(!areasVolumesGameProgressIds.some((id) => areasVolumesLabChallengeIds.includes(id)))
    const stages = ['polygons', 'pythagoras', 'plane-areas', 'solid-areas', 'volumes']
    for (const game of areasVolumesGames) for (const level of game.levels) assert.ok(stages.includes(level.stage), `${game.id} ${level.stage}`)
    assert.equal(areasVolumesGameModeForPath('/matematika/dbh4-aplikatuak/areas-volumenes/juegos/carrera'), 'race')
    assert.equal(areasVolumesGameModeForPath('/matematika/dbh4-aplikatuak/areas-volumenes/jokuak/memoria'), 'memory')
})

test('areak 4. DBH ap race: valid options, tips, and every new question checked against its prompt', () => {
    const kinds = new Set<string>()
    for (let circuit = 0; circuit < AREAS_VOLUMES_RACE_CIRCUITS; circuit += 1) {
        assert.ok(areasVolumesParTime(circuit) > 60000)
        for (let seed = 1; seed <= 120; seed += 1) {
            const random = createRandom(seed * 31 + circuit)
            for (const tier of [0, 1, 2] as const) {
                const question = generateAreasVolumesRaceQuestion(random, circuit, tier)
                assert.equal(question.circuit, circuit)
                kinds.add(`${circuit}:${question.kind}`)
                assert.equal(question.options.length, 4, question.kind)
                assert.equal(new Set(question.options.map((option) => option.latex)).size, 4, question.kind)
                assert.equal(question.options.filter((option) => option.correct).length, 1)
                for (const option of question.options) {
                    katex.renderToString(option.latex, { throwOnError: true })
                    if (!option.correct) assert.ok(areasVolumesRaceErrorTips[option.error!], `${question.kind}: ${option.error}`)
                }
                for (const language of ['eu', 'es', 'ar'] as const) {
                    for (const text of [question.prompt[language], question.solution[language]]) for (const formula of mathIn(text)) katex.renderToString(formula, { throwOnError: true })
                    if (language === 'ar') assert.ok(!question.prompt.ar.includes('{,}') && !question.solution.ar.includes('{,}'), question.kind)
                }
                const right = question.options.find((option) => option.correct)!
                assert.ok(question.writable)
                assert.equal(checkAreasVolumesPitAnswer(question, right.latex.replace(/\\,/g, '').replace('{,}', ',')), 'correct', question.kind)
                if (question.kind.includes(':')) continue
                const value = toNumber(question.answer)
                assert.ok(close(optionValue(right.latex), value), question.kind)
                // The worked solution ends with the answer and its arithmetic is right
                const [solution] = mathIn(question.solution.es)
                const sides = solution.split('=')
                assert.ok(close(evaluate(sides[0]), value), `${question.kind}: ${solution}`)
                const shown = numbersIn(question.prompt.es)
                if (question.kind === 'circumference') {
                    const r = question.prompt.es.includes('diámetro') ? shown[0] / 2 : shown[0]
                    assert.ok(close(value, 2 * 3.14 * r), question.prompt.es)
                } else if (question.kind === 'arc') {
                    const r = question.prompt.es.includes('diámetro') ? shown[0] / 2 : shown[0]
                    const angle = Number(mathIn(question.prompt.es)[1].replace('^{\\circ}', ''))
                    assert.ok(close(value, (2 * 3.14 * r * angle) / 360), question.prompt.es)
                } else if (question.kind === 'triangle' || question.kind === 'rhombus') {
                    assert.ok(close(value, (shown[0] * shown[1]) / 2), question.prompt.es)
                } else if (question.kind === 'trapezoid') {
                    assert.ok(close(value, ((shown[0] + shown[1]) * shown[2]) / 2), question.prompt.es)
                } else if (question.kind === 'regular') {
                    const sides = question.prompt.es.includes('pentágono') ? 5 : question.prompt.es.includes('hexágono') ? 6 : 8
                    assert.ok(close(value, (sides * shown[0] * shown[1]) / 2), question.prompt.es)
                    // The apothem is the true one, rounded to tenths
                    assert.ok(Math.abs(shown[1] - shown[0] / (2 * Math.tan(Math.PI / sides))) <= 0.05 + 1e-9, question.prompt.es)
                } else if (question.kind === 'ice-cream') {
                    const [r, height] = shown
                    assert.ok(close(value, (3.14 * r * r * height) / 3 + (2 * 3.14 * r ** 3) / 3), question.prompt.es)
                } else if (question.kind === 'capsule') {
                    const [r, height] = shown
                    assert.ok(close(value, 3.14 * r * r * height + (4 * 3.14 * r ** 3) / 3), question.prompt.es)
                } else if (question.kind === 'tower') {
                    const [r, height, roof] = shown
                    assert.ok(close(value, 3.14 * r * r * height + (3.14 * r * r * roof) / 3), question.prompt.es)
                } else {
                    assert.fail(`unchecked kind ${question.kind}`)
                }
            }
        }
    }
    for (const kind of ['0:circumference', '0:arc', '2:triangle', '2:rhombus', '2:trapezoid', '2:regular', '4:ice-cream', '4:capsule', '4:tower']) assert.ok(kinds.has(kind), `never generated: ${kind}`)
    for (const circuit of [0, 1, 2, 3, 4]) assert.ok([...kinds].some((kind) => kind.startsWith(`${circuit}:`) && kind.includes(':', 2)), `circuit ${circuit} borrows nothing`)
})

test('areak 4. DBH ap race: the typical mistakes show up', () => {
    const errors = new Set<string>()
    for (let seed = 1; seed <= 200; seed += 1) {
        const random = createRandom(seed)
        for (let circuit = 0; circuit < AREAS_VOLUMES_RACE_CIRCUITS; circuit += 1) {
            for (const tier of [0, 1, 2] as const) for (const option of generateAreasVolumesRaceQuestion(random, circuit, tier).options) if (option.error) errors.add(option.error)
        }
    }
    for (const error of ['circle-area', 'arc-whole', 'area-no-half', 'trapezoid-one-base', 'missing-part', 'whole-sphere', 'cone-third']) assert.ok(errors.has(error), `never used: ${error}`)
})

test('areak 4. DBH ap memory: every card has exactly one partner and the pair is true', () => {
    for (let level = 0; level < areasVolumesMemoryLevels.length; level += 1) {
        for (let seed = 1; seed <= 40; seed += 1) {
            const cards = createAreasVolumesMemoryBoard(createRandom(seed * 7 + level), level)
            assert.equal(cards.length, AREAS_VOLUMES_MEMORY_PAIRS * 2)
            assert.equal(new Set(cards.map((card) => card.latex)).size, cards.length)
            for (const card of cards) katex.renderToString(card.latex, { throwOnError: true })
            if (areasVolumesMemoryLevels[level] !== 'areas') continue
            for (const card of cards.filter((item) => item.id.endsWith('-q'))) {
                const partner = cards.find((item) => item.setId === card.setId && item.id.endsWith('-a'))!
                assert.ok(close(evaluate(card.latex), optionValue(partner.latex)), card.latex)
            }
        }
    }
})

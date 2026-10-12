import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { generateSolidsRaceQuestion, solidsRaceErrorTips, written, type SolidsRaceError } from '../../dbh2-gorputzak-v2/games/race.ts'
import { areasVolumesRaceErrorTips, generateAreasVolumesRaceQuestion, type AreasVolumesRaceError } from '../../dbh4-aplikatuak-areak/games/race.ts'
import { readSimilarityAnswer } from '../../dbh4-aplikatuak-antzekotasuna/answers.ts'
import { generateSimilarityRaceQuestion, similarityRaceErrorTips, type SimilarityRaceError } from '../../dbh4-aplikatuak-antzekotasuna/games/race.ts'

/* ==========================================================================
   Azaleren, bolumenen eta antzekotasunaren lasterketa (4. DBH
   akademikoak): five circuits, one per stage. Each circuit mixes questions
   borrowed from the 4. DBH aplikatuak areas and similarity races and the
   2. DBH solids race (renumbered, their mistakes kept under a prefix so
   each keeps its own tip) with the academic ones: crowns, sectors and
   segments; total areas of pyramids and cones with the apothem or the
   generatrix found by Pythagoras, spherical zones and closed hemispheres;
   volumes from the generatrix or the apothem; the altitude and leg
   theorems; frustums, real areas and volumes from a scale, and the ratio
   from two volumes. π ≈ 3,14; every answer is an exact decimal with at
   most two decimals, so every question can be written at the pit stop.
   Every new question carries `meta`, the numbers of its prompt, so the
   test recomputes the answer.
   ========================================================================== */

export const AREAS_SIMILARITY_RACE_CIRCUITS = 5

type OwnError =
    | 'crown-radii'
    | 'missing-part'
    | 'arc-not-area'
    | 'whole-circle'
    | 'segment-sector'
    | 'triangle-no-half'
    | 'height-not-apothem'
    | 'height-not-generatrix'
    | 'whole-sphere'
    | 'zone-half'
    | 'cone-third'
    | 'area-not-volume'
    | 'no-root'
    | 'other-projection'
    | 'one-part'
    | 'r-not-squared'
    | 'r-not-cubed'
    | 'cube-root'
    | 'unit'
    | 'calculation'

export type AreasSimilarityRaceError = OwnError | `are:${AreasVolumesRaceError}` | `sol:${SolidsRaceError}` | `sim:${SimilarityRaceError}`

export type AreasSimilarityRaceQuestion = RaceQuestion<AreasSimilarityRaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`
/** Hundredths as an exact value */
const h = (hundredths: number) => fraction(hundredths, 100)
/** Written before the question is accepted: a value that is not whole hundredths is dropped by options() anyway */
const w = (hundredths: number) => (Number.isInteger(hundredths) ? written(h(hundredths)) ?? '?' : '?')
/** A number with at most two decimals in LaTeX: 6.4 → 6{,}4 */
const num = (value: number) => w(Math.round(value * 100))
const PI = ` (${math('\\pi\\approx 3{,}14')})`
const withPi = (text: LocalizedText) => say(text.eu + PI, text.es + PI, text.ar + PI)

interface Candidate {
    hundredths: number
    error: OwnError
}

/** The right option and three different positive mistakes, all written as exact decimals */
function options(random: Random, right: number, candidates: Candidate[]): RaceOption<AreasSimilarityRaceError>[] | null {
    if (!Number.isInteger(right)) return null
    const rightLatex = written(h(right))
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: OwnError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (candidate.hundredths <= 0 || !Number.isInteger(candidate.hundredths)) continue
        const latex = written(h(candidate.hundredths))
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

const near = (hundredths: number, step = 100): Candidate[] => [hundredths + step, hundredths - step, hundredths + 314, hundredths * 2].map((value) => ({ hundredths: value, error: 'calculation' as const }))

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<AreasSimilarityRaceError>[] | null, answer: number, solution: string, meta: Record<string, number>): AreasSimilarityRaceQuestion | null {
    if (!choices) return null
    return { circuit, kind, prompt, options: choices, answer: h(answer), answerForm: 'any', percentAnswer: false, writable: true, solution: same(math(solution)), meta }
}

type Prefix = 'are' | 'sol' | 'sim'

/** A question from another race, renumbered, with its mistakes under a prefix */
function borrowed<Error extends string>(source: RaceQuestion<Error>, circuit: number, prefix: Prefix): AreasSimilarityRaceQuestion {
    return {
        ...source,
        circuit,
        kind: `${prefix}:${source.kind}`,
        options: source.options.map((option) => ({ ...option, error: option.error === null ? null : (`${prefix}:${option.error}` as AreasSimilarityRaceError) })),
        meta: {}
    }
}

/** Right triangles with whole sides: two legs and the hypotenuse */
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [9, 12, 15], [12, 9, 15], [8, 15, 17], [15, 8, 17], [12, 16, 20], [16, 12, 20]]

/* ---------- Circuit 0: crowns, sectors and segments ---------- */

function crownQuestion(random: Random, tier: Tier): AreasSimilarityRaceQuestion | null {
    const R = randomInt(random, 3, tier === 0 ? 8 : 12)
    const r = randomInt(random, 1, R - 1)
    const answer = 314 * (R * R - r * r)
    return build(0, 'crown', withPi(say(
        `Kalkulatu ${math(String(R))} cm eta ${math(String(r))} cm-ko erradioko koroa zirkularraren azalera.`,
        `Calcula el área de la corona circular de radios ${math(String(R))} cm y ${math(String(r))} cm.`,
        `احسب مساحة الحلقة الدائرية التي نصفا قطريها ${math(String(R))} سم و${math(String(r))} سم.`
    )), options(random, answer, [
        { hundredths: 314 * (R - r) * (R - r), error: 'crown-radii' },
        { hundredths: 314 * R * R, error: 'missing-part' },
        { hundredths: 628 * (R - r), error: 'arc-not-area' },
        ...near(answer)
    ]), answer, `3{,}14\\cdot (${R}^{2}-${r}^{2})=${w(answer)}`, { R, r })
}

function sectorQuestion(random: Random, tier: Tier): AreasSimilarityRaceQuestion | null {
    const r = randomInt(random, 2, tier === 0 ? 10 : 12)
    const angle = pick(random, tier === 0 ? [90, 180, 45] : [30, 45, 60, 90, 120, 180, 270])
    if ((314 * r * r * angle) % 360 !== 0) return null
    const answer = (314 * r * r * angle) / 360
    return build(0, 'sector', withPi(say(
        `Kalkulatu sektore zirkular baten azalera: erradioa ${math(String(r))} cm da eta angelua ${math(`${angle}^{\\circ}`)}.`,
        `Calcula el área de un sector circular de ${math(String(r))} cm de radio y ${math(`${angle}^{\\circ}`)}.`,
        `احسب مساحة قطاع دائري نصف قطره ${math(String(r))} سم وزاويته ${math(`${angle}^{\\circ}`)}.`
    )), options(random, answer, [
        { hundredths: (628 * r * angle) / 360, error: 'arc-not-area' },
        { hundredths: 314 * r * r, error: 'whole-circle' },
        ...near(answer)
    ]), answer, `\\frac{3{,}14\\cdot ${r}^{2}\\cdot ${angle}}{360}=${w(answer)}`, { r, angle })
}

function segmentQuestion(random: Random, tier: Tier): AreasSimilarityRaceQuestion | null {
    // Even radii: the quarter circle 3,14 · r² / 4 is then a whole number of hundredths
    const r = 2 * randomInt(random, 1, tier === 0 ? 4 : 6)
    const quarter = (314 * r * r) / 4
    const triangle = (100 * r * r) / 2
    const answer = quarter - triangle
    return build(0, 'segment', withPi(say(
        `Kalkulatu segmentu zirkular baten azalera: zirkuluaren erradioa ${math(String(r))} cm da eta angelu zentrala ${math('90^{\\circ}')}.`,
        `Calcula el área del segmento circular de ${math('90^{\\circ}')} de un círculo de ${math(String(r))} cm de radio.`,
        `احسب مساحة القطعة الدائرية ذات الزاوية ${math('90^{\\circ}')} من قرص نصف قطره ${math(String(r))} سم.`
    )), options(random, answer, [
        { hundredths: quarter, error: 'segment-sector' },
        { hundredths: quarter - 2 * triangle, error: 'triangle-no-half' },
        { hundredths: triangle, error: 'calculation' },
        ...near(answer)
    ]), answer, `\\frac{3{,}14\\cdot ${r}^{2}}{4}-\\frac{${r}\\cdot ${r}}{2}=${w(answer)}`, { r })
}

/* ---------- Circuit 1: areas of pyramids, cones and spheres ---------- */

function pyramidAreaQuestion(random: Random, tier: Tier): AreasSimilarityRaceQuestion | null {
    const [half, height, apothem] = pick(random, tier === 0 ? TRIPLES.slice(0, 4) : TRIPLES)
    const side = 2 * half
    const lateral = 2 * side * apothem
    const answer = 100 * (lateral + side * side)
    return build(1, 'pyramid-area', say(
        `Piramide karratu baten oinarriaren aldea ${math(String(side))} cm da eta altuera ${math(String(height))} cm. Zein da azalera osoa?`,
        `Una pirámide cuadrangular tiene ${math(String(side))} cm de lado de la base y ${math(String(height))} cm de altura. ¿Cuál es su área total?`,
        `هرم رباعي ضلع قاعدته ${math(String(side))} سم وارتفاعه ${math(String(height))} سم. ما مساحته الكلية؟`
    ), options(random, answer, [
        { hundredths: 100 * (2 * side * height + side * side), error: 'height-not-apothem' },
        { hundredths: 100 * lateral, error: 'missing-part' },
        { hundredths: 100 * (4 * side * apothem + side * side), error: 'triangle-no-half' },
        ...near(answer)
    ]), answer, `\\sqrt{${height}^{2}+${half}^{2}}=${apothem}\\qquad \\frac{${4 * side}\\cdot ${apothem}}{2}+${side}^{2}=${w(answer)}`, { side, height })
}

function coneAreaQuestion(random: Random, tier: Tier): AreasSimilarityRaceQuestion | null {
    const [r, height, g] = pick(random, tier === 0 ? TRIPLES.slice(0, 4) : TRIPLES)
    const answer = 314 * r * (g + r)
    return build(1, 'cone-area', withPi(say(
        `Kono baten erradioa ${math(String(r))} cm da eta altuera ${math(String(height))} cm. Zein da azalera osoa?`,
        `Un cono tiene ${math(String(r))} cm de radio y ${math(String(height))} cm de altura. ¿Cuál es su área total?`,
        `مخروط نصف قطره ${math(String(r))} سم وارتفاعه ${math(String(height))} سم. ما مساحته الكلية؟`
    )), options(random, answer, [
        { hundredths: 314 * r * (height + r), error: 'height-not-generatrix' },
        { hundredths: 314 * r * g, error: 'missing-part' },
        ...near(answer)
    ]), answer, `g=\\sqrt{${height}^{2}+${r}^{2}}=${g}\\qquad 3{,}14\\cdot ${r}\\cdot ${g}+3{,}14\\cdot ${r}^{2}=${w(answer)}`, { r, height })
}

function sphereAreaQuestion(random: Random, tier: Tier): AreasSimilarityRaceQuestion | null {
    if (tier > 0 && random() < 0.5) {
        const R = randomInt(random, 2, 12)
        const thickness = randomInt(random, 1, Math.min(R, 6))
        const answer = 628 * R * thickness
        return build(1, 'zone', withPi(say(
            `${math(String(R))} cm-ko erradioko esfera bat ${math(String(thickness))} cm-ra dauden bi plano paralelok mozten dute. Zein da bien arteko zona esferikoaren azalera?`,
            `Una esfera de ${math(String(R))} cm de radio se corta con dos planos paralelos separados ${math(String(thickness))} cm. ¿Cuál es el área de la zona esférica entre ellos?`,
            `كرة نصف قطرها ${math(String(R))} سم يقطعها مستويان متوازيان المسافة بينهما ${math(String(thickness))} سم. ما مساحة المنطقة الكروية بينهما؟`
        )), options(random, answer, [
            { hundredths: 314 * R * thickness, error: 'zone-half' },
            { hundredths: 1256 * R * R, error: 'whole-sphere' },
            ...near(answer)
        ]), answer, `2\\cdot 3{,}14\\cdot ${R}\\cdot ${thickness}=${w(answer)}`, { R, thickness })
    }
    const r = randomInt(random, 1, tier === 0 ? 6 : 10)
    const answer = 3 * 314 * r * r
    return build(1, 'hemisphere', withPi(say(
        `Kalkulatu ${math(String(r))} cm-ko erradioko esfera-erdi itxi baten azalera osoa.`,
        `Calcula el área total de una semiesfera cerrada de ${math(String(r))} cm de radio.`,
        `احسب المساحة الكلية لنصف كرة مغلق نصف قطره ${math(String(r))} سم.`
    )), options(random, answer, [
        { hundredths: 2 * 314 * r * r, error: 'missing-part' },
        { hundredths: 4 * 314 * r * r, error: 'whole-sphere' },
        ...near(answer)
    ]), answer, `2\\cdot 3{,}14\\cdot ${r}^{2}+3{,}14\\cdot ${r}^{2}=${w(answer)}`, { r })
}

/* ---------- Circuit 2: volumes from the generatrix and the apothem ---------- */

function coneVolumeQuestion(random: Random, tier: Tier): AreasSimilarityRaceQuestion | null {
    const [r, height, g] = pick(random, tier === 0 ? TRIPLES.slice(0, 4) : TRIPLES)
    if ((r * r * height) % 3 !== 0) return null
    const answer = (314 * r * r * height) / 3
    return build(2, 'cone-volume', withPi(say(
        `Kono baten erradioa ${math(String(r))} cm da eta sortzailea ${math(String(g))} cm. Zein da bolumena?`,
        `Un cono tiene ${math(String(r))} cm de radio y ${math(String(g))} cm de generatriz. ¿Cuál es su volumen?`,
        `مخروط نصف قطره ${math(String(r))} سم وراسمه ${math(String(g))} سم. ما حجمه؟`
    )), options(random, answer, [
        { hundredths: (314 * r * r * g) / 3, error: 'height-not-generatrix' },
        { hundredths: 314 * r * r * height, error: 'cone-third' },
        ...near(answer)
    ]), answer, `h=\\sqrt{${g}^{2}-${r}^{2}}=${height}\\qquad \\frac{3{,}14\\cdot ${r}^{2}\\cdot ${height}}{3}=${w(answer)}`, { r, g })
}

function pyramidVolumeQuestion(random: Random, tier: Tier): AreasSimilarityRaceQuestion | null {
    const [half, height, apothem] = pick(random, tier === 0 ? TRIPLES.slice(0, 4) : TRIPLES)
    const side = 2 * half
    if ((side * side * height) % 3 !== 0) return null
    const answer = (100 * side * side * height) / 3
    return build(2, 'pyramid-volume', say(
        `Piramide karratu baten oinarriaren aldea ${math(String(side))} cm da eta apotema ${math(String(apothem))} cm. Zein da bolumena?`,
        `Una pirámide cuadrangular tiene ${math(String(side))} cm de lado de la base y ${math(String(apothem))} cm de apotema. ¿Cuál es su volumen?`,
        `هرم رباعي ضلع قاعدته ${math(String(side))} سم وعامده ${math(String(apothem))} سم. ما حجمه؟`
    ), options(random, answer, [
        { hundredths: (100 * side * side * apothem) / 3, error: 'height-not-apothem' },
        { hundredths: 100 * side * side * height, error: 'cone-third' },
        ...near(answer)
    ]), answer, `h=\\sqrt{${apothem}^{2}-${half}^{2}}=${height}\\qquad \\frac{${side}^{2}\\cdot ${height}}{3}=${w(answer)}`, { side, apothem })
}

function sphereVolumeQuestion(random: Random, tier: Tier): AreasSimilarityRaceQuestion | null {
    const r = 3 * randomInt(random, 1, tier === 0 ? 2 : 3)
    const answer = (4 * 314 * r * r * r) / 3
    return build(2, 'sphere-volume', withPi(say(
        `Kalkulatu ${math(String(r))} cm-ko erradioko esfera baten bolumena.`,
        `Calcula el volumen de una esfera de ${math(String(r))} cm de radio.`,
        `احسب حجم كرة نصف قطرها ${math(String(r))} سم.`
    )), options(random, answer, [
        { hundredths: 4 * 314 * r * r, error: 'area-not-volume' },
        { hundredths: 4 * 314 * r * r * r, error: 'cone-third' },
        { hundredths: answer / 2, error: 'calculation' },
        ...near(answer)
    ]), answer, `\\frac{4\\cdot 3{,}14\\cdot ${r}^{3}}{3}=${w(answer)}`, { r })
}

/* ---------- Circuit 3: the altitude and leg theorems ---------- */

/** Projections m < n whose product is a perfect square */
const ALTITUDE_PAIRS: Array<[number, number]> = []
for (let m = 1; m <= 25; m += 1) for (let n = m + 1; n <= 25; n += 1) if (Number.isInteger(Math.sqrt(m * n))) ALTITUDE_PAIRS.push([m, n])

function altitudeQuestion(random: Random): AreasSimilarityRaceQuestion | null {
    const [m, n] = pick(random, ALTITUDE_PAIRS)
    const height = Math.sqrt(m * n)
    const answer = 100 * height
    return build(3, 'altitude', say(
        `Triangelu angeluzuzen batean, katetoen proiekzioak hipotenusan ${math(String(m))} cm eta ${math(String(n))} cm dira. Zenbat neurtzen du hipotenusarekiko altuerak?`,
        `En un triángulo rectángulo, las proyecciones de los catetos sobre la hipotenusa miden ${math(String(m))} cm y ${math(String(n))} cm. ¿Cuánto mide la altura sobre la hipotenusa?`,
        `في مثلث قائم، مسقطا الضلعين القائمين على الوتر ${math(String(m))} سم و${math(String(n))} سم. كم طول الارتفاع على الوتر؟`
    ), options(random, answer, [
        { hundredths: 100 * m * n, error: 'no-root' },
        { hundredths: 50 * (m + n), error: 'calculation' },
        ...near(answer)
    ]), answer, `h=\\sqrt{${m}\\cdot ${n}}=${height}`, { m, n })
}

/** Hypotenuse, projection and leg: b² = a · n with whole legs */
const LEGS: Array<[number, number, number]> = []
for (const [b, c, a] of [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [12, 16, 20], [15, 20, 25], [8, 15, 17]] as const) {
    for (const leg of [b, c]) {
        const projection = (leg * leg) / a
        if (Number.isInteger(Math.round(projection * 100)) && Math.abs(projection * 100 - Math.round(projection * 100)) < 1e-9) LEGS.push([a, projection, leg])
    }
}

function legQuestion(random: Random): AreasSimilarityRaceQuestion | null {
    const [a, n, leg] = pick(random, LEGS)
    const other = a - n
    const answer = 100 * leg
    return build(3, 'leg', say(
        `Triangelu angeluzuzen baten hipotenusa ${math(String(a))} cm da, eta kateto baten proiekzioa ${math(num(n))} cm. Zenbat neurtzen du kateto horrek?`,
        `La hipotenusa de un triángulo rectángulo mide ${math(String(a))} cm y la proyección de un cateto, ${math(num(n))} cm. ¿Cuánto mide ese cateto?`,
        `وتر مثلث قائم ${math(String(a))} سم ومسقط أحد الضلعين القائمين ${math(num(n))} سم. كم طول هذا الضلع؟`
    ), options(random, answer, [
        { hundredths: Math.round(100 * Math.sqrt(a * other)) === 100 * Math.sqrt(a * other) ? 100 * Math.sqrt(a * other) : 0, error: 'other-projection' },
        { hundredths: Math.round(100 * a * n), error: 'no-root' },
        { hundredths: Math.round(100 * Math.sqrt(n * other)) === 100 * Math.sqrt(n * other) ? 100 * Math.sqrt(n * other) : 0, error: 'calculation' },
        ...near(answer)
    ]), answer, `\\sqrt{${a}\\cdot ${num(n)}}=${leg}`, { a, n })
}

function hypotenuseQuestion(random: Random): AreasSimilarityRaceQuestion | null {
    const [m, n] = pick(random, ALTITUDE_PAIRS.filter(([small, big]) => small + big <= 30))
    const height = Math.sqrt(m * n)
    const answer = 100 * (m + n)
    return build(3, 'hypotenuse', say(
        `Triangelu angeluzuzen batean, hipotenusarekiko altuera ${math(String(height))} cm da eta proiekzio bat ${math(String(m))} cm. Zenbat neurtzen du hipotenusak?`,
        `En un triángulo rectángulo, la altura sobre la hipotenusa mide ${math(String(height))} cm y una proyección, ${math(String(m))} cm. ¿Cuánto mide la hipotenusa?`,
        `في مثلث قائم، الارتفاع على الوتر ${math(String(height))} سم وأحد المسقطين ${math(String(m))} سم. كم طول الوتر؟`
    ), options(random, answer, [
        { hundredths: 100 * n, error: 'one-part' },
        { hundredths: 100 * (m + height), error: 'calculation' },
        { hundredths: 100 * height * height, error: 'calculation' },
        ...near(answer)
    ]), answer, `n=\\frac{${height}^{2}}{${m}}=${n}\\qquad ${m}+${n}=${m + n}`, { height, m })
}

/* ---------- Circuit 4: frustums, scales and ratios ---------- */

function frustumQuestion(random: Random, tier: Tier): AreasSimilarityRaceQuestion | null {
    const R = randomInt(random, 2, tier === 0 ? 6 : 9)
    const r = randomInt(random, 1, R - 1)
    const height = randomInt(random, 1, tier === 0 ? 6 : 9)
    const thirds = height * (R * R + R * r + r * r)
    if (thirds % 3 !== 0) return null
    const answer = (314 * thirds) / 3
    // The big cone alone, when the small cone has a whole height
    const apex = (r * height) / (R - r)
    const big = Number.isInteger(apex) ? (314 * R * R * (apex + height)) / 3 : 0
    return build(4, 'frustum', withPi(say(
        `Kono-enbor baten oinarrien erradioak ${math(String(R))} cm eta ${math(String(r))} cm dira, eta altuera ${math(String(height))} cm. Zein da bolumena?`,
        `Un tronco de cono tiene bases de ${math(String(R))} cm y ${math(String(r))} cm de radio y ${math(String(height))} cm de altura. ¿Cuál es su volumen?`,
        `جذع مخروط نصفا قطري قاعدتيه ${math(String(R))} سم و${math(String(r))} سم وارتفاعه ${math(String(height))} سم. ما حجمه؟`
    )), options(random, answer, [
        { hundredths: big, error: 'missing-part' },
        { hundredths: 314 * thirds, error: 'cone-third' },
        { hundredths: (314 * height * (R * R + r * r)) / 3, error: 'calculation' },
        ...near(answer)
    ]), answer, `\\frac{3{,}14\\cdot ${height}\\cdot (${R}^{2}+${R}\\cdot ${r}+${r}^{2})}{3}=${w(answer)}`, { R, r, height })
}

function scaleQuestion(random: Random, tier: Tier): AreasSimilarityRaceQuestion | null {
    if (tier === 0 || random() < 0.5) {
        const n = pick(random, [50, 100, 200, 500])
        const area = randomInt(random, 2, 40)
        const answer = (area * n * n) / 100
        return build(4, 'scale-area', say(
            `${math(`1\\mathbin{:}${n}`)} eskalako plano batean, gela batek ${math(String(area))} cm² hartzen ditu. Zenbat m² ditu gela errealak?`,
            `En un plano a escala ${math(`1\\mathbin{:}${n}`)}, una habitación ocupa ${math(String(area))} cm². ¿Cuántos m² tiene la habitación real?`,
            `في مخطط بمقياس ${math(`1\\mathbin{:}${n}`)} تشغل غرفة ${math(String(area))} سم². كم م² مساحة الغرفة الحقيقية؟`
        ), options(random, answer, [
            { hundredths: (area * n) / 100, error: 'r-not-squared' },
            { hundredths: area * n * n, error: 'unit' },
            ...near(answer)
        ]), answer, `\\frac{${area}\\cdot ${n}^{2}}{10\\,000}=${w(answer)}`, { n, area })
    }
    const n = pick(random, [10, 20, 50, 100])
    const volume = randomInt(random, 1, 50)
    const answer = (volume * n * n * n) / 10_000
    return build(4, 'scale-volume', say(
        `${math(`1\\mathbin{:}${n}`)} eskalako maketa batek ${math(String(volume))} cm³-ko bolumena du. Zenbat m³ ditu gorputz errealak?`,
        `Una maqueta a escala ${math(`1\\mathbin{:}${n}`)} tiene ${math(String(volume))} cm³ de volumen. ¿Cuántos m³ tiene el cuerpo real?`,
        `مجسّم بمقياس ${math(`1\\mathbin{:}${n}`)} حجمه ${math(String(volume))} سم³. كم م³ حجم الجسم الحقيقي؟`
    ), options(random, answer, [
        { hundredths: (volume * n * n) / 10_000, error: 'r-not-cubed' },
        { hundredths: (volume * n * n * n) / 100, error: 'unit' },
        ...near(answer, 1)
    ]), answer, `\\frac{${volume}\\cdot ${n}^{3}}{1\\,000\\,000}=${w(answer)}`, { n, volume })
}

function volumeRatioQuestion(random: Random, tier: Tier): AreasSimilarityRaceQuestion | null {
    const k = tier === 2 && random() < 0.4 ? 1.5 : randomInt(random, 2, 5)
    const small = k === 1.5 ? pick(random, [8, 16, 24]) : randomInt(random, 2, 12)
    const big = small * k ** 3
    const answer = Math.round(100 * k)
    const quotient = big / small
    return build(4, 'volume-ratio', say(
        `Bi gorputz antzekoren bolumenak ${math(String(small))} cm³ eta ${math(num(big))} cm³ dira. Zein da antzekotasun-arrazoia?`,
        `Dos cuerpos semejantes tienen ${math(String(small))} cm³ y ${math(num(big))} cm³ de volumen. ¿Cuál es la razón de semejanza?`,
        `جسمان متشابهان حجماهما ${math(String(small))} سم³ و${math(num(big))} سم³. ما نسبة التشابه؟`
    ), options(random, answer, [
        // Only exact mistakes: 27/8 = 3,375 cannot be written with two decimals
        { hundredths: 100 * quotient, error: 'cube-root' },
        { hundredths: 100 * Math.sqrt(quotient), error: 'cube-root' },
        { hundredths: (100 * quotient) / 3, error: 'cube-root' },
        ...near(answer, 50)
    ]), answer, `\\sqrt[3]{\\frac{${num(big)}}{${small}}}=${num(k)}`, { small, big })
}

/* ---------- Circuits ---------- */

type Generator = (random: Random, tier: Tier) => AreasSimilarityRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [(random, tier) => borrowed(generateAreasVolumesRaceQuestion(random, pick(random, [0, 2]), tier), 0, 'are'), crownQuestion, sectorQuestion, segmentQuestion],
    [(random, tier) => borrowed(generateSolidsRaceQuestion(random, 2, tier), 1, 'sol'), pyramidAreaQuestion, coneAreaQuestion, sphereAreaQuestion],
    [(random, tier) => borrowed(generateSolidsRaceQuestion(random, 4, tier), 2, 'sol'), (random, tier) => borrowed(generateAreasVolumesRaceQuestion(random, 4, tier), 2, 'are'), coneVolumeQuestion, pyramidVolumeQuestion, sphereVolumeQuestion],
    [(random, tier) => borrowed(generateSimilarityRaceQuestion(random, pick(random, [0, 1, 4]), tier), 3, 'sim'), altitudeQuestion, legQuestion, hypotenuseQuestion],
    [(random, tier) => borrowed(generateSimilarityRaceQuestion(random, pick(random, [2, 3]), tier), 4, 'sim'), frustumQuestion, scaleQuestion, volumeRatioQuestion]
]

export function generateAreasSimilarityRaceQuestion(random: Random, circuit: number, tier: Tier, requireWritable = false): AreasSimilarityRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next && (!requireWritable || next.writable)) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkAreasSimilarityPitAnswer(question: RaceQuestion<AreasSimilarityRaceError>, input: string): AnswerCheck {
    return checkAnswer(readSimilarityAnswer(input), question.answer as FractionValue, question.answerForm)
}

export function areasSimilarityParTime(circuit: number): number {
    return parTimeFor([12, 14, 14, 13, 14][circuit] ?? 13)
}

const prefixed = (prefix: Prefix, tips: Record<string, LocalizedText>) => Object.fromEntries(Object.entries(tips).map(([key, tip]) => [`${prefix}:${key}`, tip]))

export const areasSimilarityRaceErrorTips: Record<AreasSimilarityRaceError, LocalizedText> = {
    ...(prefixed('are', areasVolumesRaceErrorTips) as Record<`are:${AreasVolumesRaceError}`, LocalizedText>),
    ...(prefixed('sol', solidsRaceErrorTips) as Record<`sol:${SolidsRaceError}`, LocalizedText>),
    ...(prefixed('sim', similarityRaceErrorTips) as Record<`sim:${SimilarityRaceError}`, LocalizedText>),
    'crown-radii': say('Ez kendu erradioak karratura jaso aurretik: $\\pi(R^{2}-r^{2})$.', 'No restes los radios antes de elevarlos al cuadrado: $\\pi(R^{2}-r^{2})$.', 'لا تطرح نصفي القطرين قبل تربيعهما: $\\pi(R^{2}-r^{2})$.'),
    'missing-part': say('Zati bat falta da: batu edo kendu zati guztiak.', 'Falta una parte: suma o resta todas las partes.', 'ينقص جزء: اجمع أو اطرح كل الأجزاء.'),
    'arc-not-area': say('Hori arkuaren luzera da; azalerarako $\\pi r^{2}$.', 'Esa es la longitud del arco; para el área, $\\pi r^{2}$.', 'هذا طول القوس؛ وللمساحة $\\pi r^{2}$.'),
    'whole-circle': say('Hori zirkulu osoa da: hartu angelua zati 360.', 'Ese es el círculo entero: toma el ángulo entre 360.', 'هذا القرص كاملًا: خذ الزاوية على 360.'),
    'segment-sector': say('Hori sektorea da: kendu triangelua.', 'Ese es el sector: réstale el triángulo.', 'هذا القطاع: اطرح منه المثلث.'),
    'triangle-no-half': say('Triangeluaren azalera zati 2 da.', 'El área del triángulo se divide entre 2.', 'مساحة المثلث تُقسم على 2.'),
    'height-not-apothem': say('Altuera eta apotema ez dira gauza bera: Pitagorasekin pasatu batetik bestera.', 'La altura y la apotema no son lo mismo: pasa de una a otra con Pitágoras.', 'الارتفاع والعامد ليسا الشيء نفسه: انتقل من أحدهما إلى الآخر بفيثاغورس.'),
    'height-not-generatrix': say('Altuera eta sortzailea ez dira gauza bera: $g^{2}=h^{2}+r^{2}$.', 'La altura y la generatriz no son lo mismo: $g^{2}=h^{2}+r^{2}$.', 'الارتفاع والراسم ليسا الشيء نفسه: $g^{2}=h^{2}+r^{2}$.'),
    'whole-sphere': say('Begiratu esfera osoa edo erdia den: $4\\pi r^{2}$ esfera osoarena da.', 'Mira si es la esfera entera o media: $4\\pi r^{2}$ es la entera.', 'انظر هل هي كرة كاملة أم نصف: $4\\pi r^{2}$ للكاملة.'),
    'zone-half': say('Zona esferikoa $2\\pi r h$ da.', 'La zona esférica es $2\\pi r h$.', 'المنطقة الكروية $2\\pi r h$.'),
    'cone-third': say('Konoaren, piramidearen eta esferaren formuletan zati 3 dago.', 'En las fórmulas del cono, la pirámide y la esfera se divide entre 3.', 'في صيغ المخروط والهرم والكرة قسمة على 3.'),
    'area-not-volume': say('Hori esferaren azalera da; bolumena $\\frac{4}{3}\\pi r^{3}$.', 'Esa es el área de la esfera; el volumen es $\\frac{4}{3}\\pi r^{3}$.', 'هذه مساحة الكرة؛ والحجم $\\frac{4}{3}\\pi r^{3}$.'),
    'no-root': say('Hori karratua da: atera erro karratua.', 'Eso es el cuadrado: saca la raíz cuadrada.', 'هذا المربع: استخرج الجذر التربيعي.'),
    'other-projection': say('Kateto bakoitza bere proiekzioarekin doa, ez bestearekin.', 'Cada cateto va con su propia proyección, no con la otra.', 'كل ضلع قائم مع مسقطه هو لا مع الآخر.'),
    'one-part': say('Hori proiekzio bat da: hipotenusa bien batura da.', 'Eso es una proyección: la hipotenusa es la suma de las dos.', 'هذا مسقط واحد: الوتر مجموع المسقطين.'),
    'r-not-squared': say('Azalerak $n^{2}$ bider hazten dira, ez $n$ bider.', 'Las áreas crecen $n^{2}$ veces, no $n$ veces.', 'تكبر المساحات $n^{2}$ مرة لا $n$ مرة.'),
    'r-not-cubed': say('Bolumenak $n^{3}$ bider hazten dira.', 'Los volúmenes crecen $n^{3}$ veces.', 'تكبر الحجوم $n^{3}$ مرة.'),
    'cube-root': say('Bolumenen zatidura $k^{3}$ da: atera erro kubikoa.', 'El cociente de volúmenes es $k^{3}$: saca la raíz cúbica.', 'نسبة الحجوم $k^{3}$: استخرج الجذر التكعيبي.'),
    unit: say('Kontuz unitateekin: $1\\ \\text{m}^{2}=10\\,000\\ \\text{cm}^{2}$ eta $1\\ \\text{m}^{3}=1\\,000\\,000\\ \\text{cm}^{3}$.', 'Cuidado con las unidades: $1\\ \\text{m}^{2}=10\\,000\\ \\text{cm}^{2}$ y $1\\ \\text{m}^{3}=1\\,000\\,000\\ \\text{cm}^{3}$.', 'انتبه للوحدات: $1\\ \\text{m}^{2}=10\\,000\\ \\text{cm}^{2}$ و$1\\ \\text{m}^{3}=1\\,000\\,000\\ \\text{cm}^{3}$.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}

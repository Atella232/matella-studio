import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../dbh2-gorputzak-v2/games/race.ts'
import { readSimilarityAnswer } from '../answers.ts'

/* ==========================================================================
   Antzekotasunaren lasterketa (4. DBH aplikatuak): five circuits, one per
   stage — Thales (a missing segment, equal and proportional parts),
   similar figures (a missing side, the ratio, a homothety), ratios of
   perimeters, areas and volumes, scales (map to reality, reality to map,
   the scale itself) and heights (shadows, a mirror, a line of sight).
   Every answer is an exact decimal with at most two decimals, so every
   question can be written at the pit stop; wrong options are typical
   mistakes: the proportion turned round, r instead of r², the units
   forgotten, the height of the eyes not added back…
   ========================================================================== */

export const SIMILARITY_RACE_CIRCUITS = 5

export type SimilarityRaceError = 'cross-wrong' | 'whole-side' | 'ratio-inverse' | 'r-not-squared' | 'r-squared-volume' | 'unit' | 'eyes' | 'one-part' | 'calculation'

export type SimilarityRaceQuestion = RaceQuestion<SimilarityRaceError>

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`
/** A number in LaTeX with the comma ({,}) and thousands grouped */
const tex = (value: number) => written(fraction(Math.round(value * 1000), 1000)) ?? String(value)
/** Exact value of a ratio of whole numbers */
const ratio = (top: number, bottom: number) => fraction(top, bottom)
const toValue = (value: number) => fraction(Math.round(value * 1000), 1000)

interface Candidate {
    value: FractionValue
    error: SimilarityRaceError
}

/** The right option and three different positive mistakes, all exact with at most two decimals */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<SimilarityRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: SimilarityRaceError }> = []
    for (const candidate of candidates) {
        if (wrong.length === 3) break
        if (candidate.value.numerator <= 0) continue
        const latex = written(candidate.value)
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

const near = (value: FractionValue): Candidate[] => {
    const x = value.numerator / value.denominator
    return [x + 1, x - 1, x * 2, x + 0.5, x + 2].map((item) => ({ value: toValue(item), error: 'calculation' as const }))
}

function question(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<SimilarityRaceError>[], answer: FractionValue, solution: LocalizedText): SimilarityRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution }
}

/* ---------- Circuit 0: Thales ---------- */

function thalesQuestion(random: Random, tier: Tier): SimilarityRaceQuestion | null {
    const a = randomInt(random, 2, tier === 0 ? 6 : 10)
    const b = randomInt(random, 2, tier === 0 ? 9 : 15)
    const c = randomInt(random, 2, tier === 0 ? 9 : 15)
    if (a === b) return null
    const answer = ratio(b * c, a)
    const choices = options(random, answer, [{ value: ratio(a * c, b), error: 'cross-wrong' }, { value: ratio(a * b, c), error: 'cross-wrong' }, ...near(answer)])
    return choices && question(0, 'thales', say(
        `Paraleloek zuzen batean ${math(String(a))} eta ${math(String(b))} cm-ko zatiak mozten dituzte, eta bestean ${math(String(c))} cm eta x. Zenbat da x?`,
        `Unas paralelas cortan en una recta segmentos de ${math(String(a))} y ${math(String(b))} cm, y en otra de ${math(String(c))} cm y x. ¿Cuánto vale x?`,
        `تقطع متوازيات على مستقيم قطعتين ${math(String(a))} و${math(String(b))} سم، وعلى آخر ${math(String(c))} سم وx. كم x؟`
    ), choices, answer, same(math(`\\frac{${a}}{${c}}=\\frac{${b}}{x}\\to x=\\frac{${b}\\cdot ${c}}{${a}}=${written(answer)}`)))
}

function partsQuestion(random: Random, tier: Tier): SimilarityRaceQuestion | null {
    const weights = tier === 0 ? [1, 1, 1].slice(0, randomInt(random, 2, 3)).map(() => 1) : [randomInt(random, 1, 5), randomInt(random, 1, 5), randomInt(random, 1, 6)]
    const sum = weights.reduce((total, weight) => total + weight, 0)
    const length = sum * randomInt(random, 2, tier === 2 ? 9 : 6) / (tier === 2 ? 2 : 1)
    const largest = Math.max(...weights)
    const answer = toValue((length * largest) / sum)
    if (tier > 0 && new Set(weights).size === 1) return null
    const equal = tier === 0
    const choices = options(random, answer, [{ value: toValue(length / sum), error: 'one-part' }, { value: toValue(length / weights.length), error: 'one-part' }, { value: toValue(length * largest), error: 'calculation' }, ...near(answer)])
    const lengthTex = tex(length)
    if (equal) {
        return choices && question(0, 'equal-parts', say(
            `${math(lengthTex)} cm-ko zuzenki bat ${math(String(weights.length))} zati berdinetan banatzen da. Zenbat neurtzen du zati bakoitzak?`,
            `Un segmento de ${math(lengthTex)} cm se divide en ${math(String(weights.length))} partes iguales. ¿Cuánto mide cada parte?`,
            `تُقسم قطعة طولها ${math(lengthTex)} سم إلى ${math(String(weights.length))} أجزاء متساوية. كم طول كل جزء؟`
        ), choices, answer, same(math(`${lengthTex}\\mathbin{:}${weights.length}=${written(answer)}`)))
    }
    return choices && question(0, 'proportional-parts', say(
        `Banatu ${math(lengthTex)} cm ${math(weights.join(',\\ '))} zenbakien zati proportzionaletan. Zenbat neurtzen du zati handienak?`,
        `Divide ${math(lengthTex)} cm en partes proporcionales a ${math(weights.join(',\\ '))}. ¿Cuánto mide la parte mayor?`,
        `قسّم ${math(lengthTex)} سم إلى أجزاء متناسبة مع ${math(weights.join(',\\ '))}. كم أكبر جزء؟`
    ), choices, answer, same(math(`\\frac{${lengthTex}\\cdot ${largest}}{${sum}}=${written(answer)}`)))
}

/* ---------- Circuit 1: similar figures ---------- */

function sideQuestion(random: Random, tier: Tier): SimilarityRaceQuestion | null {
    const r = pick(random, tier === 0 ? [2, 3, 0.5] : [1.5, 2.5, 0.4, 1.2, 0.8, 3])
    const a = randomInt(random, 2, 12)
    const b = randomInt(random, 2, 12)
    if (a === b) return null
    const a2 = a * r
    const answer = toValue(b * r)
    const choices = options(random, answer, [{ value: toValue(b / r), error: 'ratio-inverse' }, { value: toValue(b + (a2 - a)), error: 'calculation' }, ...near(answer)])
    return choices && question(1, 'side', say(
        `Bi poligono antzekotan, ${math(String(a))} cm-ko aldeari ${math(tex(a2))} cm-koa dagokio. Zenbat neurtzen du ${math(String(b))} cm-ko aldearen homologoak?`,
        `En dos polígonos semejantes, al lado de ${math(String(a))} cm le corresponde uno de ${math(tex(a2))} cm. ¿Cuánto mide el homólogo del lado de ${math(String(b))} cm?`,
        `في مضلعين متشابهين يقابل الضلعَ ${math(String(a))} سم ضلعٌ ${math(tex(a2))} سم. كم يقابل الضلعَ ${math(String(b))} سم؟`
    ), choices, answer, same(math(`r=\\frac{${tex(a2)}}{${a}}=${tex(r)}\\to ${b}\\cdot ${tex(r)}=${written(answer)}`)))
}

function ratioQuestion(random: Random, tier: Tier): SimilarityRaceQuestion | null {
    const r = pick(random, tier === 0 ? [2, 3, 4] : [1.5, 2.5, 1.2, 0.4, 0.5, 0.75])
    const a = randomInt(random, 2, 12)
    const a2 = a * r
    const answer = toValue(r)
    const choices = options(random, answer, [{ value: toValue(1 / r), error: 'ratio-inverse' }, { value: toValue(a2 - a), error: 'calculation' }, { value: toValue(r * r), error: 'calculation' }, ...near(answer)])
    return choices && question(1, 'ratio', say(
        `Karratu baten aldea ${math(String(a))} cm da eta antzeko batena ${math(tex(a2))} cm. Zein da bigarrenaren eta lehenengoaren arteko arrazoia?`,
        `Un cuadrado tiene ${math(String(a))} cm de lado y otro ${math(tex(a2))} cm. ¿Cuál es la razón del segundo al primero?`,
        `مربع ضلعه ${math(String(a))} سم وآخر ${math(tex(a2))} سم. ما نسبة الثاني إلى الأول؟`
    ), choices, answer, same(math(`\\frac{${tex(a2)}}{${a}}=${written(answer)}`)))
}

function homothetyQuestion(random: Random, tier: Tier): SimilarityRaceQuestion | null {
    const r = pick(random, tier === 0 ? [2, 3] : [1.5, 2.5, 0.5, 4])
    const oa = randomInt(random, 2, 9) / (tier === 2 ? 2 : 1)
    const answer = toValue(oa * r)
    const choices = options(random, answer, [{ value: toValue(oa / r), error: 'ratio-inverse' }, { value: toValue(oa + r), error: 'calculation' }, ...near(answer)])
    return choices && question(1, 'homothety', say(
        `O zentroko eta ${math(tex(r))} arrazoiko homotezia batean, ${math(`OA=${tex(oa)}`)} cm. Zenbat da ${math("OA'")}?`,
        `En una homotecia de centro O y razón ${math(tex(r))}, ${math(`OA=${tex(oa)}`)} cm. ¿Cuánto mide ${math("OA'")}?`,
        `في تحاكٍ مركزه O ونسبته ${math(tex(r))}، ${math(`OA=${tex(oa)}`)} سم. كم ${math("OA'")}؟`
    ), choices, answer, same(math(`${tex(r)}\\cdot ${tex(oa)}=${written(answer)}`)))
}

/* ---------- Circuit 2: perimeters, areas and volumes ---------- */

type Measure = 'perimeter' | 'area' | 'volume'

function measureQuestion(random: Random, tier: Tier): SimilarityRaceQuestion | null {
    const measure = pick(random, (tier === 0 ? ['perimeter', 'area'] : ['perimeter', 'area', 'volume', 'volume']) as Measure[])
    const r = pick(random, tier === 0 ? [2, 3] : [2, 3, 1.5, 0.5, 4])
    const start = randomInt(random, 2, measure === 'volume' ? 12 : 30)
    const power = measure === 'perimeter' ? 1 : measure === 'area' ? 2 : 3
    const answer = toValue(start * r ** power)
    const choices = options(random, answer, [
        { value: toValue(start * r), error: 'r-not-squared' },
        { value: toValue(start * r * r), error: measure === 'volume' ? 'r-squared-volume' : 'calculation' },
        { value: toValue(start * r ** 3), error: 'calculation' },
        { value: toValue(start / r ** power), error: 'ratio-inverse' },
        ...near(answer)
    ])
    const unit = measure === 'perimeter' ? 'cm' : measure === 'area' ? 'cm²' : 'cm³'
    const names: Record<Measure, LocalizedText> = {
        perimeter: say('perimetroa', 'perímetro', 'المحيط'),
        area: say('azalera', 'área', 'المساحة'),
        volume: say('bolumena', 'volumen', 'الحجم')
    }
    return choices && question(2, measure, say(
        `Irudi baten ${names[measure].eu} ${math(String(start))} ${unit} da. Zein da ${math(tex(r))} arrazoiko irudi antzekoarena?`,
        `Una figura tiene ${math(String(start))} ${unit} de ${names[measure].es}. ¿Cuál es el de una semejante de razón ${math(tex(r))}?`,
        `${names[measure].ar} لشكل ${math(String(start))} ${unit}. ما ${names[measure].ar} لشكل مشابه نسبته ${math(tex(r))}؟`
    ), choices, answer, same(math(`${start}\\cdot ${tex(r)}${power === 1 ? '' : `^{${power}}`}=${written(answer)}`)))
}

function rootQuestion(random: Random): SimilarityRaceQuestion | null {
    const r = pick(random, [2, 3, 4, 5, 1.5, 2.5])
    const volume = random() < 0.4
    const factor = volume ? r ** 3 : r ** 2
    const answer = toValue(r)
    const choices = options(random, answer, [{ value: toValue(factor / 2), error: 'calculation' }, { value: toValue(volume ? Math.sqrt(factor) : factor / 3), error: volume ? 'r-squared-volume' : 'calculation' }, { value: toValue(factor), error: 'r-not-squared' }, ...near(answer)])
    if (volume && !Number.isInteger(Math.sqrt(factor) * 100)) return null
    return choices && question(2, volume ? 'volume-root' : 'area-root', say(
        `Bi irudi antzekoren ${volume ? 'bolumenen' : 'azaleren'} arrazoia ${math(tex(factor))} da. Zein da luzeren arrazoia?`,
        `La razón de ${volume ? 'los volúmenes' : 'las áreas'} de dos figuras semejantes es ${math(tex(factor))}. ¿Cuál es la razón de las longitudes?`,
        `نسبة ${volume ? 'حجمي' : 'مساحتي'} شكلين متشابهين ${math(tex(factor))}. ما نسبة الأطوال؟`
    ), choices, answer, same(math(`r^{${volume ? 3 : 2}}=${tex(factor)}\\to r=${written(answer)}`)))
}

/* ---------- Circuit 3: scales ---------- */

const SCALES = [10000, 20000, 25000, 50000, 100000, 200000, 250000, 500000]

function mapToRealQuestion(random: Random, tier: Tier): SimilarityRaceQuestion | null {
    const n = pick(random, tier === 0 ? [50000, 100000, 200000] : SCALES)
    const cm = randomInt(random, 1, 12) / (tier === 2 ? 2 : 1)
    const answer = toValue((cm * n) / 100000)
    const choices = options(random, answer, [{ value: toValue((cm * n) / 1000), error: 'unit' }, { value: toValue((cm * n) / 10000), error: 'unit' }, { value: toValue(n / cm / 100000), error: 'ratio-inverse' }, ...near(answer)])
    return choices && question(3, 'map-to-real', say(
        `${math(`1\\mathbin{:}${tex(n)}`)} eskalako mapa batean, bi puntu ${math(tex(cm))} cm-ra daude. Zenbat km daude benetan?`,
        `En un mapa a escala ${math(`1\\mathbin{:}${tex(n)}`)}, dos puntos están a ${math(tex(cm))} cm. ¿A cuántos km están en realidad?`,
        `في خريطة بمقياس ${math(`1\\mathbin{:}${tex(n)}`)} تبعد نقطتان ${math(tex(cm))} سم. كم كيلومترًا تبعدان في الواقع؟`
    ), choices, answer, same(math(`${tex(cm)}\\cdot ${tex(n)}=${tex(cm * n)}\\ \\text{cm}=${written(answer)}\\ \\text{km}`)))
}

function realToMapQuestion(random: Random, tier: Tier): SimilarityRaceQuestion | null {
    const n = pick(random, tier === 0 ? [50000, 100000, 200000] : SCALES)
    const km = randomInt(random, 1, 30)
    const answer = toValue((km * 100000) / n)
    const choices = options(random, answer, [{ value: toValue((km * 1000) / n), error: 'unit' }, { value: toValue((km * 10000) / n), error: 'unit' }, { value: toValue((km * n) / 100000), error: 'ratio-inverse' }, ...near(answer)])
    return choices && question(3, 'real-to-map', say(
        `Bi herri ${math(String(km))} km-ra daude. Zenbat cm-ra egongo dira ${math(`1\\mathbin{:}${tex(n)}`)} eskalako mapa batean?`,
        `Dos pueblos están a ${math(String(km))} km. ¿A cuántos cm estarán en un mapa a escala ${math(`1\\mathbin{:}${tex(n)}`)}?`,
        `تبعد قريتان ${math(String(km))} كم. كم سنتيمترًا تبعدان في خريطة بمقياس ${math(`1\\mathbin{:}${tex(n)}`)}؟`
    ), choices, answer, same(math(`${tex(km * 100000)}\\mathbin{:}${tex(n)}=${written(answer)}`)))
}

function findScaleQuestion(random: Random): SimilarityRaceQuestion | null {
    const n = pick(random, [20, 50, 100, 200, 500, 1000])
    const realCm = n * randomInt(random, 2, 20)
    const model = realCm / n
    const answer = fraction(n)
    const choices = options(random, answer, [{ value: toValue(n * 10), error: 'unit' }, { value: toValue(n / 10), error: 'unit' }, { value: toValue(realCm - model), error: 'calculation' }, ...near(answer)])
    return choices && question(3, 'find-scale', say(
        `${math(tex(realCm / 100))} m-ko objektu baten maketak ${math(tex(model))} cm neurtzen ditu. Zein da eskala ${math('1\\mathbin{:}n')}? Idatzi n.`,
        `La maqueta de un objeto de ${math(tex(realCm / 100))} m mide ${math(tex(model))} cm. ¿Cuál es la escala ${math('1\\mathbin{:}n')}? Escribe n.`,
        `مجسّم جسم طوله ${math(tex(realCm / 100))} م يبلغ ${math(tex(model))} سم. ما المقياس ${math('1\\mathbin{:}n')}؟ اكتب n.`
    ), choices, answer, same(math(`${tex(realCm)}\\mathbin{:}${tex(model)}=${tex(n)}`)))
}

/* ---------- Circuit 4: heights and distances ---------- */

function shadowQuestion(random: Random, tier: Tier): SimilarityRaceQuestion | null {
    const stick = pick(random, [1, 1.5, 2])
    const stickShadow = pick(random, tier === 0 ? [1, 2] : [0.5, 1, 1.5, 2, 2.5, 3])
    const treeShadow = randomInt(random, 2, 24)
    const answer = toValue((stick * treeShadow) / stickShadow)
    if (stick === stickShadow) return null
    const choices = options(random, answer, [{ value: toValue((stickShadow * treeShadow) / stick), error: 'cross-wrong' }, { value: toValue(treeShadow - stickShadow + stick), error: 'calculation' }, ...near(answer)])
    return choices && question(4, 'shadow', say(
        `${math(tex(stick))} m-ko makila batek ${math(tex(stickShadow))} m-ko itzala du, eta zuhaitz batek ${math(String(treeShadow))} m-koa. Zenbat neurtzen du zuhaitzak?`,
        `Un palo de ${math(tex(stick))} m da una sombra de ${math(tex(stickShadow))} m y un árbol, una de ${math(String(treeShadow))} m. ¿Cuánto mide el árbol?`,
        `عصا طولها ${math(tex(stick))} م ظلها ${math(tex(stickShadow))} م، وظل شجرة ${math(String(treeShadow))} م. كم طول الشجرة؟`
    ), choices, answer, same(math(`\\frac{${tex(stick)}\\cdot ${treeShadow}}{${tex(stickShadow)}}=${written(answer)}`)))
}

function mirrorQuestion(random: Random): SimilarityRaceQuestion | null {
    const eyes = pick(random, [1.5, 1.6, 1.8])
    const near_ = pick(random, [1, 2, 2.5, 3])
    const far = randomInt(random, 5, 30)
    const answer = toValue((eyes * far) / near_)
    const choices = options(random, answer, [{ value: toValue((near_ * far) / eyes), error: 'cross-wrong' }, { value: toValue((eyes * near_) / far), error: 'cross-wrong' }, ...near(answer)])
    return choices && question(4, 'mirror', say(
        `Begiak ${math(tex(eyes))} m-ra dituen pertsona bat ispilutik ${math(tex(near_))} m-ra dago, eta ispilua eraikinetik ${math(String(far))} m-ra. Zenbat neurtzen du eraikinak?`,
        `Una persona con los ojos a ${math(tex(eyes))} m está a ${math(tex(near_))} m de un espejo, y el espejo a ${math(String(far))} m del edificio. ¿Cuánto mide el edificio?`,
        `شخص عيناه على ${math(tex(eyes))} م وعلى بعد ${math(tex(near_))} م من مرآة، والمرآة على بعد ${math(String(far))} م من المبنى. كم ارتفاع المبنى؟`
    ), choices, answer, same(math(`\\frac{${tex(eyes)}\\cdot ${far}}{${tex(near_)}}=${written(answer)}`)))
}

function sightQuestion(random: Random): SimilarityRaceQuestion | null {
    const eyes = pick(random, [1.5, 1.6])
    const post = eyes + pick(random, [0.5, 1, 1.5])
    const toPost = pick(random, [1, 2, 3, 4])
    const toBuilding = toPost * randomInt(random, 3, 10)
    const rise = ((post - eyes) * toBuilding) / toPost
    const answer = toValue(rise + eyes)
    const choices = options(random, answer, [{ value: toValue(rise), error: 'eyes' }, { value: toValue((post * toBuilding) / toPost), error: 'eyes' }, ...near(answer)])
    return choices && question(4, 'sight', say(
        `Begiak ${math(tex(eyes))} m-ra dituen pertsona bat ${math(tex(post))} m-ko zutoin batetik ${math(String(toPost))} m-ra dago, eta zutoinaren punta eta ${math(String(toBuilding))} m-ra dagoen eraikinaren goialdea lerrokatuta ikusten ditu. Zenbat neurtzen du eraikinak?`,
        `Una persona con los ojos a ${math(tex(eyes))} m está a ${math(String(toPost))} m de un poste de ${math(tex(post))} m y ve alineados la punta del poste y lo alto de un edificio a ${math(String(toBuilding))} m. ¿Cuánto mide el edificio?`,
        `شخص عيناه على ${math(tex(eyes))} م على بعد ${math(String(toPost))} م من عمود ${math(tex(post))} م، يرى رأسه وأعلى مبنى على بعد ${math(String(toBuilding))} م على استقامة. كم ارتفاع المبنى؟`
    ), choices, answer, same(math(`\\frac{${tex(post - eyes)}\\cdot ${toBuilding}}{${toPost}}+${tex(eyes)}=${written(answer)}`)))
}

/* ---------- Circuits ---------- */

type Generator = (random: Random, tier: Tier) => SimilarityRaceQuestion | null

const circuitGenerators: Generator[][] = [
    [thalesQuestion, thalesQuestion, partsQuestion],
    [sideQuestion, ratioQuestion, homothetyQuestion],
    [measureQuestion, measureQuestion, rootQuestion],
    [mapToRealQuestion, realToMapQuestion, findScaleQuestion],
    [shadowQuestion, mirrorQuestion, sightQuestion]
]

export function generateSimilarityRaceQuestion(random: Random, circuit: number, tier: Tier): SimilarityRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkSimilarityPitAnswer(question: SimilarityRaceQuestion, input: string): AnswerCheck {
    return checkAnswer(readSimilarityAnswer(input), question.answer, question.answerForm)
}

export function similarityParTime(circuit: number): number {
    return parTimeFor([11, 11, 11, 13, 13][circuit] ?? 12)
}

export const similarityRaceErrorTips: Record<SimilarityRaceError, LocalizedText> = {
    'cross-wrong': say('Proportzioa alderantziz jarri duzu: parekatu zatiak ordena berean.', 'Has puesto la proporción al revés: empareja los segmentos en el mismo orden.', 'وضعت التناسب بالعكس: قابل القطع بالترتيب نفسه.'),
    'whole-side': say('Tales posizioan, erabili alde osoa, ez zati bat.', 'En posición de Tales, usa el lado entero, no un trozo.', 'في وضع طاليس استعمل الضلع كاملًا لا جزءًا منه.'),
    'ratio-inverse': say('Arrazoiaz zatitu duzu biderkatu beharrean (edo alderantziz).', 'Has dividido entre la razón en lugar de multiplicar (o al revés).', 'قسمت على النسبة بدل الضرب (أو العكس).'),
    'r-not-squared': say('Azaleretan r², bolumenetan r³; luzeretan bakarrik r.', 'En áreas r², en volúmenes r³; solo en longitudes r.', 'في المساحات r² وفي الحجوم r³؛ وفي الأطوال فقط r.'),
    'r-squared-volume': say('Bolumena r³ bider handitzen da, ez r² bider.', 'El volumen se multiplica por r³, no por r².', 'الحجم يُضرب في r³ لا في r².'),
    unit: say('Begiratu unitateak: 1 km = 100 000 cm eta 1 m = 100 cm.', 'Mira las unidades: 1 km = 100 000 cm y 1 m = 100 cm.', 'انتبه إلى الوحدات: 1 كم = 100 000 سم و1 م = 100 سم.'),
    eyes: say('Kendu begien altuera triangeluan, eta amaieran gehitu berriro.', 'Resta la altura de los ojos en el triángulo y súmala al final.', 'اطرح ارتفاع العينين في المثلث وأضفه في النهاية.'),
    'one-part': say('Hori zati bakarra da; zati handienak pisu handiena du.', 'Eso es una sola parte; la mayor lleva el peso mayor.', 'هذا جزء واحد؛ والأكبر يأخذ الوزن الأكبر.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.')
}

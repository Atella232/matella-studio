import type { LocalizedText } from '../content.ts'
import { checkAnswer, compare, divide, equals, fraction, gcd, multiply, add, subtract, toText, type FractionValue } from '../math/fraction.ts'
import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import {
    compareRelation,
    equivalenceResult,
    initialCompareState,
    initialEquivalenceState,
    initialNumberLineState,
    initialPartsState,
    initialProductState,
    initialProportionState,
    initialSumState,
    initialWallState,
    lcm,
    proportionResult,
    type CompareState,
    type CompareStrategy,
    type EquivalenceState,
    type NumberLineRange,
    type NumberLineState,
    type PartsShape,
    type PartsState,
    type ProductState,
    type ProportionState,
    type SumState,
    type WallState
} from './labTools.ts'

/* ==========================================================================
   Endless practice: every tool of the 2. DBH lab makes new challenges of
   the same kinds as its fixed ones. Fractions are written as formulas, so
   they read left to right in Arabic too, and Basque sentences never put a
   case ending right after a number.
   ========================================================================== */

/** a/b as a formula; the minus sign goes in front */
const tex = (value: FractionValue) => {
    const absolute = Math.abs(value.numerator)
    return `${value.numerator < 0 ? '-' : ''}${value.denominator === 1 ? absolute : `\\frac{${absolute}}{${value.denominator}}`}`
}
const f = (value: FractionValue) => `$${tex(value)}$`

/** A fraction a/b in lowest terms with b in [minD, maxD] and 0 < a < b */
function properFraction(random: Random, minD: number, maxD: number): FractionValue {
    for (;;) {
        const denominator = randomInt(random, minD, maxD)
        const numerator = randomInt(random, 1, denominator - 1)
        if (gcd(numerator, denominator) === 1) return { numerator, denominator }
    }
}

/** Two proper fractions with different denominators and, unless allowed, different values */
function fractionPair(random: Random, allowEqual = false): [FractionValue, FractionValue] {
    for (;;) {
        const first = properFraction(random, 2, 12)
        const second = properFraction(random, 2, 12)
        if (first.denominator !== second.denominator && (allowEqual || !equals(first, second))) return [first, second]
    }
}

/** A new challenge is never one the tool already solves when it opens */
function freshFrom<State>(start: State, maker: LabChallengeMaker<State>): LabChallengeMaker<State> {
    return (random) => {
        for (;;) {
            const challenge = maker(random)
            if (!challenge.isSolved(start)) return challenge
        }
    }
}

const sameTerms = (value: FractionValue, other: FractionValue) => value.numerator === other.numerator && value.denominator === other.denominator
const answered = (state: { answer: string }, expected: FractionValue) => checkAnswer(state.answer, expected) === 'correct'

/* ---------- Parts of a whole ---------- */

const shapeNames: Record<PartsShape, LocalizedText> = {
    bar: { eu: 'barra baten', es: 'una barra', ar: 'شريط' },
    circle: { eu: 'zirkulu baten', es: 'un círculo', ar: 'دائرة' },
    grid: { eu: 'laukizuzen baten', es: 'un rectángulo', ar: 'مستطيل' }
}

export const partsExtra: LabChallengeMaker<PartsState> = freshFrom(initialPartsState, (random) => {
    const improper = random() < 0.35
    const shape: PartsShape = improper ? 'bar' : pick(random, ['bar', 'circle', 'grid'] as const)
    const denominator = improper ? randomInt(random, 2, 6) : randomInt(random, 2, 12)
    const numerator = improper ? randomInt(random, denominator + 1, 3 * denominator - 1) : randomInt(random, 1, denominator - 1)
    const value = { numerator, denominator }
    const units = Math.ceil(numerator / denominator)
    const solution: PartsState = { shape, denominator, units, filled: Array.from({ length: numerator }, (_, index) => index) }
    const isSolved = (state: PartsState) => state.shape === shape && state.filled.length > 0 && equals(fraction(state.filled.length, state.denominator), value)
    if (improper) {
        return {
            prompt: { eu: `Irudikatu ${f(value)} barrekin. Zenbat unitate behar dituzu?`, es: `Representa ${f(value)} con barras. ¿Cuántas unidades necesitas?`, ar: `مثّل ${f(value)} بالأشرطة. كم وحدة تحتاج؟` },
            hint: { eu: `Unitate bakoitzak ${denominator} zati ditu: ${units} unitate behar dituzu.`, es: `Cada unidad tiene ${denominator} partes: necesitas ${units} unidades.`, ar: `كل وحدة فيها ${denominator} أجزاء: تحتاج إلى ${units} وحدات.` },
            isSolved,
            solution
        }
    }
    return {
        prompt: { eu: `Koloreztatu ${shapeNames[shape].eu} ${f(value)}.`, es: `Colorea ${f(value)} de ${shapeNames[shape].es}.`, ar: `لوّن ${f(value)} من ${shapeNames[shape].ar}.` },
        hint: { eu: `Zatitu ${denominator} zati berdinetan eta koloreztatu ${numerator}.`, es: `Divide en ${denominator} partes iguales y colorea ${numerator}.`, ar: `قسّم إلى ${denominator} أجزاء متساوية ولوّن ${numerator} منها.` },
        isSolved,
        solution
    }
})

/* ---------- Number line ---------- */

const lineValue = (state: NumberLineState) => fraction(state.numerator, state.denominator)

export const numberLineExtra: LabChallengeMaker<NumberLineState> = freshFrom(initialNumberLineState, (random) => {
    if (random() < 0.25) {
        // Between two fractions: always leave room for one with a denominator up to 12
        for (;;) {
            const [a, b] = fractionPair(random)
            const [low, high] = compare(a, b) < 0 ? [a, b] : [b, a]
            let inside: FractionValue | null = null
            for (let denominator = 2; denominator <= 12 && !inside; denominator += 1) {
                for (let numerator = 1; numerator < denominator && !inside; numerator += 1) {
                    const candidate = { numerator, denominator }
                    if (compare(candidate, low) > 0 && compare(candidate, high) < 0) inside = candidate
                }
            }
            if (!inside) continue
            return {
                prompt: { eu: `Kokatu ${f(low)} eta ${f(high)} artean dagoen zatiki bat.`, es: `Coloca una fracción que esté entre ${f(low)} y ${f(high)}.`, ar: `ضع كسرًا يقع بين ${f(low)} و${f(high)}.` },
                hint: { eu: 'Zati txikiagoak behar badituzu, probatu izendatzaile handiagoekin, hamabirenak adibidez.', es: 'Si no cabe ninguna, prueba saltos más pequeños, como doceavos.', ar: 'إذا لم يتّسع أي كسر فجرّب قفزات أصغر، مثل أجزاء من اثني عشر.' },
                isSolved: (state) => compare(lineValue(state), low) > 0 && compare(lineValue(state), high) < 0,
                solution: { range: '0-1', denominator: inside.denominator, numerator: inside.numerator }
            }
        }
    }
    const kind = pick(random, ['proper', 'proper', 'improper', 'negative'] as const)
    let value: FractionValue
    let range: NumberLineRange
    if (kind === 'proper') {
        value = properFraction(random, 2, 12)
        range = '0-1'
    } else if (kind === 'improper') {
        const base = properFraction(random, 2, 6)
        value = { numerator: base.numerator + base.denominator * randomInt(random, 1, 2), denominator: base.denominator }
        range = value.numerator > 2 * value.denominator ? '0-3' : '0-2'
    } else {
        const base = properFraction(random, 2, 8)
        value = { numerator: -(base.numerator + (random() < 0.4 ? base.denominator : 0)), denominator: base.denominator }
        range = '-2-2'
    }
    const steps = Math.abs(value.numerator)
    const where: LocalizedText = kind === 'negative'
        ? { eu: ', 0tik ezkerrera', es: ' hacia la izquierda del 0', ar: ' إلى يسار 0' }
        : { eu: '', es: '', ar: '' }
    return {
        prompt: { eu: `Kokatu ${f(value)} zuzenean.`, es: `Coloca ${f(value)} en la recta.`, ar: `ضع ${f(value)} على خط الأعداد.` },
        hint: {
            eu: `Aukeratu zenbakia sartzen den tarte bat. Zatitu unitate bakoitza ${value.denominator} jauzitan eta egin ${steps}${where.eu}.`,
            es: `Elige un tramo en el que quepa. Divide cada unidad en ${value.denominator} saltos y da ${steps}${where.es}.`,
            ar: `اختر مجالًا يتّسع له. قسّم كل وحدة إلى ${value.denominator} قفزات واقفز ${steps}${where.ar}.`
        },
        isSolved: (state) => equals(lineValue(state), value),
        solution: { range, denominator: value.denominator, numerator: value.numerator }
    }
})

/* ---------- Fraction wall ---------- */

export const wallExtra: LabChallengeMaker<WallState> = freshFrom(initialWallState, (random) => {
    if (random() < 0.5) {
        const value = properFraction(random, 2, 6)
        const factor = randomInt(random, 2, Math.floor(12 / value.denominator))
        return {
            prompt: { eu: `Hautatu ${f(value)} zatikiaren baliokide bat, beste izendatzaile batekin.`, es: `Selecciona una fracción equivalente a ${f(value)} con otro denominador.`, ar: `اختر كسرًا مكافئًا لـ ${f(value)} بمقام آخر.` },
            hint: { eu: 'Bilatu pieza bat lerro berean amaitzen den errenkadak.', es: 'Busca las filas donde una pieza termina justo en la misma línea.', ar: 'ابحث عن الصفوف التي تنتهي فيها قطعة عند الخط نفسه تمامًا.' },
            isSolved: (state) => state.mode === 'equivalent' && state.first !== null && state.first.denominator !== value.denominator && equals(state.first, value),
            solution: { mode: 'equivalent', first: { numerator: value.numerator * factor, denominator: value.denominator * factor }, second: null }
        }
    }
    const [a, b] = fractionPair(random)
    const larger = compare(a, b) > 0 ? a : b
    return {
        prompt: { eu: `Zein da handiagoa, ${f(a)} ala ${f(b)}? Hautatu handiena.`, es: `¿Qué es mayor, ${f(a)} o ${f(b)}? Selecciona la mayor.`, ar: `أيهما أكبر، ${f(a)} أم ${f(b)}؟ اختر الأكبر.` },
        hint: { eu: 'Hautatu bata eta gero bestea: urrunen iristen dena da handiena.', es: 'Selecciona primero una y después la otra: la que llegue más lejos es la mayor.', ar: 'اختر أحدهما ثم الآخر: الذي يصل أبعد هو الأكبر.' },
        isSolved: (state) => state.mode === 'equivalent' && state.first !== null && sameTerms(state.first, larger),
        solution: { mode: 'equivalent', first: larger, second: null }
    }
})

/* ---------- Equivalence ---------- */

export const equivalenceExtra: LabChallengeMaker<EquivalenceState> = freshFrom(initialEquivalenceState, (random) => {
    if (random() < 0.5) {
        const value = properFraction(random, 2, 12)
        const factor = randomInt(random, 2, 6)
        const target = { numerator: value.numerator * factor, denominator: value.denominator * factor }
        return {
            prompt: { eu: `Anplifikatu ${f(value)}, izendatzailea ${target.denominator} izan arte.`, es: `Amplifica ${f(value)} hasta que el denominador sea ${target.denominator}.`, ar: `وسّع ${f(value)} حتى يصبح المقام ${target.denominator}.` },
            hint: { eu: `$${target.denominator}\\div ${value.denominator}=${factor}$: biderkatu bi gaiak ${factor} zenbakiaz.`, es: `$${target.denominator}\\div ${value.denominator}=${factor}$: multiplica los dos términos por ${factor}.`, ar: `$${target.denominator}\\div ${value.denominator}=${factor}$: اضرب الحدّين في ${factor}.` },
            isSolved: (state) => sameTerms(equivalenceResult(state), target),
            solution: { numerator: value.numerator, denominator: value.denominator, mode: 'amplify', factor, divisor: null }
        }
    }
    // Denominators up to 6, so the amplified start still fits the tool (at most 12)
    const value = properFraction(random, 2, 6)
    const factor = randomInt(random, 2, Math.floor(12 / value.denominator))
    const start = { numerator: value.numerator * factor, denominator: value.denominator * factor }
    return {
        prompt: { eu: `Sinplifikatu ${f(start)}, zatiki laburtezina lortu arte.`, es: `Simplifica ${f(start)} hasta la fracción irreducible.`, ar: `بسّط ${f(start)} حتى تصل إلى أبسط صورة.` },
        hint: { eu: `Zatitu bi gaiak beren ZKHz, hau da, ${factor} zenbakiaz.`, es: `Divide los dos términos entre su m.c.d., que es ${factor}.`, ar: `اقسم الحدّين على قاسمهما المشترك الأكبر، وهو ${factor}.` },
        isSolved: (state) => state.mode === 'simplify' && sameTerms(state, start) && sameTerms(equivalenceResult(state), value),
        solution: { numerator: start.numerator, denominator: start.denominator, mode: 'simplify', factor: 2, divisor: factor }
    }
})

/* ---------- Compare ---------- */

const strategyNames: Record<CompareStrategy, LocalizedText> = {
    common: { eu: 'izendatzaile komuna', es: 'el denominador común', ar: 'المقام المشترك' },
    line: { eu: 'zenbaki-zuzena', es: 'la recta numérica', ar: 'خط الأعداد' },
    cross: { eu: 'biderketa gurutzatua', es: 'los productos cruzados', ar: 'الضرب التبادلي' }
}

export const compareExtra: LabChallengeMaker<CompareState> = freshFrom(initialCompareState, (random) => {
    const [a, pairSecond] = fractionPair(random)
    let b = pairSecond
    // Now and then two ways of writing the same value
    if (random() < 0.2) {
        const factor = randomInt(random, 2, Math.max(2, Math.floor(12 / a.denominator)))
        if (a.denominator * factor <= 12) b = { numerator: a.numerator * factor, denominator: a.denominator * factor }
    }
    const strategy: CompareStrategy | null = random() < 0.4 ? pick(random, ['common', 'line', 'cross'] as const) : null
    const relation = compareRelation({ first: a, second: b, strategy: 'common', guess: null })
    const common = lcm(a.denominator, b.denominator)
    const hint: LocalizedText = strategy === 'cross'
        ? { eu: `Kalkulatu $${a.numerator}\\cdot ${b.denominator}$ eta $${b.numerator}\\cdot ${a.denominator}$.`, es: `Calcula $${a.numerator}\\cdot ${b.denominator}$ y $${b.numerator}\\cdot ${a.denominator}$.`, ar: `احسب $${a.numerator}\\cdot ${b.denominator}$ و$${b.numerator}\\cdot ${a.denominator}$.` }
        : {
            eu: `Izendatzaile komunarekin: $${tex(a)}=\\frac{${a.numerator * (common / a.denominator)}}{${common}}$ eta $${tex(b)}=\\frac{${b.numerator * (common / b.denominator)}}{${common}}$.`,
            es: `Con denominador común: $${tex(a)}=\\frac{${a.numerator * (common / a.denominator)}}{${common}}$ y $${tex(b)}=\\frac{${b.numerator * (common / b.denominator)}}{${common}}$.`,
            ar: `بمقام مشترك: $${tex(a)}=\\frac{${a.numerator * (common / a.denominator)}}{${common}}$ و$${tex(b)}=\\frac{${b.numerator * (common / b.denominator)}}{${common}}$.`
        }
    return {
        prompt: strategy
            ? { eu: `Alderatu ${f(a)} eta ${f(b)}, ${strategyNames[strategy].eu} erabiliz, eta aukeratu zeinu zuzena.`, es: `Compara ${f(a)} y ${f(b)} usando ${strategyNames[strategy].es} y elige el signo correcto.`, ar: `قارن بين ${f(a)} و${f(b)} باستعمال ${strategyNames[strategy].ar} واختر الإشارة الصحيحة.` }
            : { eu: `Alderatu ${f(a)} eta ${f(b)} eta aukeratu zeinu zuzena.`, es: `Compara ${f(a)} y ${f(b)} y elige el signo correcto.`, ar: `قارن بين ${f(a)} و${f(b)} واختر الإشارة الصحيحة.` },
        hint,
        isSolved: (state) => {
            const ordered = sameTerms(state.first, a) && sameTerms(state.second, b)
            const swapped = sameTerms(state.first, b) && sameTerms(state.second, a)
            return (ordered || swapped) && state.guess === compareRelation(state) && (strategy === null || state.strategy === strategy)
        },
        solution: { first: a, second: b, strategy: strategy ?? 'common', guess: relation }
    }
})

/* ---------- Adding and subtracting ---------- */

export const sumExtra: LabChallengeMaker<SumState> = freshFrom(initialSumState, (random) => {
    const op = random() < 0.5 ? 'add' : 'subtract'
    let [first, second] = fractionPair(random)
    // Most differences are positive; some are negative on purpose
    if (op === 'subtract' && compare(first, second) < 0 && random() < 0.7) [first, second] = [second, first]
    const result = op === 'add' ? add(first, second) : subtract(first, second)
    const symbol = op === 'add' ? '+' : '-'
    const common = lcm(first.denominator, second.denominator)
    const expression = `$${tex(first)}${symbol}${tex(second)}$`
    return {
        prompt: { eu: `Kalkulatu ${expression} eta idatzi emaitza.`, es: `Calcula ${expression} y escribe el resultado.`, ar: `احسب ${expression} واكتب النتيجة.` },
        hint: {
            eu: `Izendatzaile komuna: ${common}. $${tex(first)}=\\frac{${first.numerator * (common / first.denominator)}}{${common}}$ eta $${tex(second)}=\\frac{${second.numerator * (common / second.denominator)}}{${common}}$.`,
            es: `Denominador común: ${common}. $${tex(first)}=\\frac{${first.numerator * (common / first.denominator)}}{${common}}$ y $${tex(second)}=\\frac{${second.numerator * (common / second.denominator)}}{${common}}$.`,
            ar: `المقام المشترك: ${common}. $${tex(first)}=\\frac{${first.numerator * (common / first.denominator)}}{${common}}$ و$${tex(second)}=\\frac{${second.numerator * (common / second.denominator)}}{${common}}$.`
        },
        isSolved: (state) => {
            const ordered = sameTerms(state.first, first) && sameTerms(state.second, second)
            const swapped = op === 'add' && sameTerms(state.first, second) && sameTerms(state.second, first)
            return state.op === op && (ordered || swapped) && answered(state, result)
        },
        solution: { ...initialSumState, first, second, op, answer: toText(result), checked: true }
    }
})

/* ---------- Multiplying and dividing ---------- */

export const productExtra: LabChallengeMaker<ProductState> = freshFrom(initialProductState, (random) => {
    const op = random() < 0.5 ? 'multiply' : 'divide'
    const [first, second] = fractionPair(random, true)
    const result = op === 'multiply' ? multiply(first, second) : divide(first, second)
    const expression = `$${tex(first)}${op === 'multiply' ? '\\cdot ' : '\\div '}${tex(second)}$`
    return {
        prompt: { eu: `Kalkulatu ${expression} eta idatzi emaitza.`, es: `Calcula ${expression} y escribe el resultado.`, ar: `احسب ${expression} واكتب النتيجة.` },
        hint: op === 'multiply'
            ? { eu: 'Biderkatu zenbakitzaileak elkarren artean eta izendatzaileak elkarren artean.', es: 'Multiplica los numeradores entre sí y los denominadores entre sí.', ar: 'اضرب البسطين معًا والمقامين معًا.' }
            : { eu: `Biderkatu lehena bigarrenaren alderantzizkoaz: ${f({ numerator: second.denominator, denominator: second.numerator })}.`, es: `Multiplica la primera por la inversa de la segunda: ${f({ numerator: second.denominator, denominator: second.numerator })}.`, ar: `اضرب الأول في مقلوب الثاني: ${f({ numerator: second.denominator, denominator: second.numerator })}.` },
        isSolved: (state) => {
            const ordered = sameTerms(state.first, first) && sameTerms(state.second, second)
            const swapped = op === 'multiply' && sameTerms(state.first, second) && sameTerms(state.second, first)
            return state.op === op && (ordered || swapped) && answered(state, result)
        },
        solution: { ...initialProductState, first, second, op, answer: toText(result), checked: true }
    }
})

/* ---------- Quantities and percentages ---------- */

const NICE_PERCENTS = [10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90]

export const proportionExtra: LabChallengeMaker<ProportionState> = freshFrom(initialProportionState, (random) => {
    const mode = pick(random, ['of', 'of', 'percent', 'forms'] as const)
    if (mode === 'forms') {
        const percent = pick(random, NICE_PERCENTS)
        const value = fraction(percent, 100)
        return {
            prompt: { eu: `Eraiki zehazki % ${percent} balio duen zatiki bat.`, es: `Construye una fracción que valga exactamente el ${percent} %.`, ar: `كوّن كسرًا يساوي ${percent}٪ تمامًا.` },
            hint: { eu: `100etik ${percent}: sinplifikatu $\\frac{${percent}}{100}$.`, es: `${percent} de cada 100: simplifica $\\frac{${percent}}{100}$.`, ar: `${percent} من كل 100: بسّط $\\frac{${percent}}{100}$.` },
            isSolved: (state) => state.mode === 'forms' && equals(state, value),
            solution: { ...initialProportionState, mode: 'forms', numerator: value.numerator, denominator: value.denominator }
        }
    }
    if (mode === 'percent') {
        for (;;) {
            const percent = randomInt(random, 1, 19) * 5
            // Quantities a learner can reach with the stepper in a few taps
            const quantity = randomInt(random, 1, 20) * 10
            if ((percent * quantity) % 100 !== 0) continue
            const result = fraction(percent * quantity, 100)
            return {
                prompt: { eu: `Kalkulatu ${quantity} kantitatearen % ${percent} eta idatzi emaitza.`, es: `Calcula el ${percent} % de ${quantity} y escribe el resultado.`, ar: `احسب ${percent}٪ من ${quantity} واكتب النتيجة.` },
                hint: { eu: `% ${percent} = $\\frac{${percent}}{100}$: kalkulatu $\\frac{${percent}\\cdot ${quantity}}{100}$.`, es: `El ${percent} % es $\\frac{${percent}}{100}$: calcula $\\frac{${percent}\\cdot ${quantity}}{100}$.`, ar: `${percent}٪ هي $\\frac{${percent}}{100}$: احسب $\\frac{${percent}\\cdot ${quantity}}{100}$.` },
                isSolved: (state) => state.mode === 'percent' && state.percent === percent && state.quantity === quantity && answered(state, result),
                solution: { ...initialProportionState, mode: 'percent', percent, quantity, answer: toText(result), checked: true }
            }
        }
    }
    const value = properFraction(random, 2, 12)
    // A quantity the fraction splits exactly, within the tool's range
    const step = lcm(value.denominator, 10)
    const quantity = step * randomInt(random, 1, Math.floor(240 / step))
    const result = proportionResult({ ...initialProportionState, mode: 'of', numerator: value.numerator, denominator: value.denominator, quantity })
    return {
        prompt: { eu: `Kalkulatu ${quantity} kantitatearen ${f(value)} eta idatzi emaitza.`, es: `Calcula ${f(value)} de ${quantity} y escribe el resultado.`, ar: `احسب ${f(value)} من ${quantity} واكتب النتيجة.` },
        hint: { eu: `$${quantity}\\div ${value.denominator}=${quantity / value.denominator}$; gero, $${quantity / value.denominator}\\cdot ${value.numerator}$.`, es: `$${quantity}\\div ${value.denominator}=${quantity / value.denominator}$; después, $${quantity / value.denominator}\\cdot ${value.numerator}$.`, ar: `$${quantity}\\div ${value.denominator}=${quantity / value.denominator}$؛ ثم $${quantity / value.denominator}\\cdot ${value.numerator}$.` },
        isSolved: (state) => state.mode === 'of' && equals(fraction(state.numerator, state.denominator), value) && state.quantity === quantity && answered(state, result),
        solution: { ...initialProportionState, mode: 'of', numerator: value.numerator, denominator: value.denominator, quantity, answer: toText(result), checked: true }
    }
})

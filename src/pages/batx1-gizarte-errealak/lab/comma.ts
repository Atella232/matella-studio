import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L3 · Koma bidaiaria (La coma viajera): an economic figure written as
   M · 10ⁿ in a form that is not the scientific one (453 · 10¹¹ euros of
   debt, 0,85 · 10¹² of GDP, 2 840 000 unemployed…). The learner changes
   the exponent and the decimal point travels to make up for it: the
   number never changes. Before moving it, they predict whether the
   exponent of the scientific form (1 ≤ M < 10) is lower, the same or
   higher than the current one; ▶ walks the point there one place at a
   time. Pure logic: a figure is its digits D and the power of D·10ᵉ.
   ========================================================================== */

export interface CommaFigure {
    /** The significant digits, without zeros at the ends */
    digits: string
    /** The figure is digits · 10^power */
    power: number
    /** The exponent it is first written with */
    start: number
    label: LocalizedText
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const COMMA_FIGURES: CommaFigure[] = [
    { digits: '453', power: 11, start: 11, label: say('Zorra (€)', 'Deuda (€)', 'الدين (€)', 'Debt (€)') },
    { digits: '85', power: 10, start: 12, label: say('BPG (€)', 'PIB (€)', 'الناتج المحلي (€)', 'GDP (€)') },
    { digits: '284', power: 4, start: 0, label: say('Langabeak', 'Parados', 'العاطلون', 'Unemployed') },
    { digits: '37', power: -4, start: 0, label: say('Mezu bat (€)', 'Un mensaje (€)', 'رسالة (€)', 'A message (€)') },
    { digits: '126', power: 4, start: 5, label: say('Botoak', 'Votos', 'الأصوات', 'Votes') }
]

/** How far the exponent can go from the scientific one */
export const COMMA_REACH = 6

export interface CommaState {
    figure: number
    exponent: number
    prediction: Prediction | null
}

export const initialCommaState: CommaState = { figure: 0, exponent: 11, prediction: null }

/** The exponent of the scientific form: one digit before the point */
export const scientificExponent = (figure: CommaFigure) => figure.power + figure.digits.length - 1

export const exponentLimits = (figure: CommaFigure) => {
    const scientific = scientificExponent(figure)
    return { min: scientific - COMMA_REACH, max: scientific + COMMA_REACH }
}

export function setComma(state: CommaState, patch: Partial<Omit<CommaState, 'prediction'>>): CommaState {
    const index = Math.min(COMMA_FIGURES.length - 1, Math.max(0, Math.round(patch.figure ?? state.figure)))
    const figure = COMMA_FIGURES[index]
    const changed = index !== state.figure
    const { min, max } = exponentLimits(figure)
    // A new figure starts with the exponent it is written with
    const exponent = changed && patch.exponent === undefined ? figure.start : Math.min(max, Math.max(min, Math.round(patch.exponent ?? state.exponent)))
    const same = !changed && exponent === state.exponent
    return { figure: index, exponent, prediction: same ? state.prediction : null }
}

/** Digits before the decimal point when the figure is written with this exponent (≤ 0: «0,00…»; > length: zeros at the end) */
export const pointPlace = (state: CommaState) => {
    const figure = COMMA_FIGURES[state.figure]
    return figure.power + figure.digits.length - state.exponent
}

/** The mantissa M of M · 10ⁿ, as text with the decimal comma: «453», «0,85», «2840000», «4,53» */
export function mantissaText(state: CommaState): string {
    const { digits } = COMMA_FIGURES[state.figure]
    const place = pointPlace(state)
    if (place <= 0) return `0,${'0'.repeat(-place)}${digits}`
    if (place >= digits.length) return digits + '0'.repeat(place - digits.length)
    return `${digits.slice(0, place)},${digits.slice(place)}`
}

/** The mantissa for LaTeX: the comma as {,} and the thousands grouped */
export function mantissaLatex(state: CommaState): string {
    const text = mantissaText(state)
    if (text.includes(',')) return text.replace(',', '{,}')
    return text.length >= 5 ? text.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : text
}

export const mantissaValue = (state: CommaState) => Number(mantissaText(state).replace(',', '.'))
export const isScientific = (state: CommaState) => state.exponent === scientificExponent(COMMA_FIGURES[state.figure])
/** Will the scientific exponent be lower (<), the same (=) or higher (>) than the current one? */
export const commaPrediction = (state: CommaState): Prediction => compareTo(scientificExponent(COMMA_FIGURES[state.figure]), state.exponent)

/** The forms a challenge can ask for: the scientific one, two digits before the point, or no point at all */
export type CommaGoal = 'scientific' | 'two' | 'whole'
export const goalExponent = (figure: CommaFigure, goal: CommaGoal) =>
    goal === 'scientific' ? scientificExponent(figure) : goal === 'two' ? scientificExponent(figure) - 1 : figure.power

export const commaChallenges: LabChallenge<CommaState>[] = [
    {
        id: 130301,
        prompt: say('Zorra: idatzi idazkera zientifikoan, mantisa 1 eta 10 artean.', 'Deuda: escríbela en notación científica, con la mantisa entre 1 y 10.', 'الدين: اكتبه بالترميز العلمي، والجزء العشري بين 1 و10.', 'Debt: write it in scientific notation, with the mantissa between 1 and 10.'),
        hint: say('Koma bi leku ezkerrera: berretzailea bi igotzen da.', 'La coma va dos lugares a la izquierda: el exponente sube dos.', 'تتحرك الفاصلة منزلتين إلى اليسار: يزيد الأس اثنين.', 'The point moves two places left: the exponent goes up by two.'),
        isSolved: (state) => state.figure === 0 && state.exponent === 13
    },
    {
        id: 130302,
        prompt: say('BPGa: idatzi idazkera zientifikoan.', 'PIB: escríbelo en notación científica.', 'الناتج المحلي: اكتبه بالترميز العلمي.', 'GDP: write it in scientific notation.'),
        hint: say('$0{,}85$ zenbakitik $8{,}5$ zenbakira, koma eskuinera: berretzailea jaisten da.', 'De $0{,}85$ a $8{,}5$ la coma va a la derecha: el exponente baja.', 'من $0{,}85$ إلى $8{,}5$ تتحرك الفاصلة إلى اليمين: ينقص الأس.', 'From $0{,}85$ to $8{,}5$ the point moves right: the exponent goes down.'),
        isSolved: (state) => state.figure === 1 && state.exponent === 11
    },
    {
        id: 130303,
        prompt: say('Mezu baten prezioa: idatzi idazkera zientifikoan.', 'Precio de un mensaje: escríbelo en notación científica.', 'سعر رسالة: اكتبه بالترميز العلمي.', 'Price of a message: write it in scientific notation.'),
        hint: same('$0{,}0037=3{,}7\\cdot 10^{-3}$'),
        isSolved: (state) => state.figure === 3 && state.exponent === -3
    },
    {
        id: 130304,
        prompt: say('Langabeak: idatzi $28{,}4\\cdot 10^{n}$ moduan.', 'Parados: escríbelo como $28{,}4\\cdot 10^{n}$.', 'العاطلون: اكتبه على الصورة $28{,}4\\cdot 10^{n}$.', 'Unemployed: write it as $28{,}4\\cdot 10^{n}$.'),
        hint: say('Bi zifra komaren aurretik: idazkera zientifikoarena baino berretzaile bat gutxiago.', 'Dos cifras antes de la coma: un exponente menos que en la notación científica.', 'رقمان قبل الفاصلة: أس أقل بواحد من أس الترميز العلمي.', 'Two digits before the point: one exponent less than in scientific notation.'),
        isSolved: (state) => state.figure === 2 && state.exponent === 5
    },
    {
        id: 130305,
        prompt: say('Botoak: idatzi komarik gabe, zenbaki oso bat bider 10 zenbakiaren berretura.', 'Votos: escríbelo sin coma, un entero por una potencia de 10.', 'الأصوات: اكتبه دون فاصلة، عددًا صحيحًا مضروبًا في قوة للعدد 10.', 'Votes: write it with no point, a whole number times a power of 10.'),
        hint: same('$12{,}6\\cdot 10^{5}=126\\cdot 10^{4}$'),
        isSolved: (state) => state.figure === 4 && state.exponent === 4
    }
]

function same(value: string): LocalizedText {
    return { eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') }
}

const goals: Record<CommaGoal, LocalizedText> = {
    scientific: say('idazkera zientifikoan', 'en notación científica', 'بالترميز العلمي', 'in scientific notation'),
    two: say('komaren aurretik bi zifrarekin', 'con dos cifras antes de la coma', 'برقمين قبل الفاصلة', 'with two digits before the point'),
    whole: say('komarik gabe', 'sin coma', 'دون فاصلة', 'with no point')
}

/** Endless practice: one of the figures in one of the three forms */
const commaMaker: LabChallengeMaker<CommaState> = (random) => {
    const figureIndex = randomInt(random, 0, COMMA_FIGURES.length - 1)
    const goal = (['scientific', 'two', 'whole'] as const)[randomInt(random, 0, 2)]
    const figure = COMMA_FIGURES[figureIndex]
    const exponent = goalExponent(figure, goal)
    const solution = setComma({ ...initialCommaState, figure: figureIndex, exponent: figure.start }, { exponent })
    const g = goals[goal]
    const target = `${mantissaLatex(solution)}\\cdot 10^{${exponent}}`
    return {
        prompt: say(`${figure.label.eu}: idatzi ${g.eu}.`, `${figure.label.es}: escríbelo ${g.es}.`, `${figure.label.ar}: اكتبه ${g.ar}.`, `${figure.label.en}: write it ${g.en}.`),
        hint: same(`$${target}$`),
        isSolved: (state) => state.figure === figureIndex && state.exponent === exponent,
        solution
    }
}

export const commaExtra = freshFrom(initialCommaState, commaMaker)

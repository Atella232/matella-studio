import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L2 · Atipikoa ala ez? (¿Atípico o no?): nineteen fixed times around 20 s
   and one datum the learner drags along the axis. Two rules mark the
   outliers: the band x̄ ± 3σ, worked out with the twenty data, and the
   fences of the box, Q₁ − 1,5·RIC and Q₃ + 1,5·RIC. The learner predicts
   whether the datum is an outlier before the band is shown, and ▶ drags
   the datum from 0 to 50 so the band can be seen widening as the datum
   runs away: a far datum makes σ grow and hides itself. Percentiles
   follow the rule of the lessons. Pure logic.
   ========================================================================== */

/** Nineteen times in pairs around 20: with the datum at 20, x̄ = 20 and σ² = 8 */
export const FIXED_TIMES = [14, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 21, 21, 22, 22, 23, 23, 24, 26]
export const DATUM_LIMITS = { min: 0, max: 50 } as const

export type OutlierRule = 'sigma' | 'box'

export interface OutlierState {
    datum: number
    rule: OutlierRule
    prediction: Prediction | null
}

export const initialOutlierState: OutlierState = { datum: 20, rule: 'sigma', prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setOutlier(state: OutlierState, patch: Partial<Omit<OutlierState, 'prediction'>>): OutlierState {
    const datum = clamp(patch.datum ?? state.datum, DATUM_LIMITS.min, DATUM_LIMITS.max)
    const rule = patch.rule ?? state.rule
    return { datum, rule, prediction: datum === state.datum && rule === state.rule ? state.prediction : null }
}

export const allData = (datum: number) => [...FIXED_TIMES, datum].sort((a, b) => a - b)
export const meanOf = (data: number[]) => data.reduce((sum, value) => sum + value, 0) / data.length
export const sigmaOf = (data: number[]) => {
    const mean = meanOf(data)
    return Math.sqrt(data.reduce((sum, value) => sum + value * value, 0) / data.length - mean * mean)
}

/** The lessons' rule: position N·k/100; not whole → the next datum; whole → the mean of that datum and the next */
export function percentileOf(sorted: number[], k: number): number {
    const position = (sorted.length * k) / 100
    return Number.isInteger(position) ? (sorted[position - 1] + sorted[position]) / 2 : sorted[Math.ceil(position) - 1]
}

/** The two limits of a rule with the datum where it is */
export function limitsOf(datum: number, rule: OutlierRule): [number, number] {
    const data = allData(datum)
    if (rule === 'sigma') {
        const mean = meanOf(data)
        const sigma = sigmaOf(data)
        return [mean - 3 * sigma, mean + 3 * sigma]
    }
    const q1 = percentileOf(data, 25)
    const q3 = percentileOf(data, 75)
    return [q1 - 1.5 * (q3 - q1), q3 + 1.5 * (q3 - q1)]
}

/** Outlier below (<), not an outlier (=) or outlier above (>) */
export function outlierKind(datum: number, rule: OutlierRule): Prediction {
    const [low, high] = limitsOf(datum, rule)
    return datum < low - 1e-9 ? '<' : datum > high + 1e-9 ? '>' : '='
}

export const outlierPrediction = (state: OutlierState) => outlierKind(state.datum, state.rule)

/* ---------- Challenges ---------- */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const outlierChallenges: LabChallenge<OutlierState>[] = [
    { id: 114201, prompt: say('Egin datua atipikoa izatea goitik, $\\bar{x}\\pm 3\\sigma$ arauarekin.', 'Haz que el dato sea atípico por arriba con la regla $\\bar{x}\\pm 3\\sigma$.', 'اجعل البيان شاذًّا من الأعلى بقاعدة $\\bar{x}\\pm 3\\sigma$.', 'Make the datum an outlier above with the $\\bar{x}\\pm 3\\sigma$ rule.'), hint: say('Eraman urrun; kontuz, $\\sigma$ ere hazten da eta banda zabaltzen da.', 'Llévalo lejos; ojo, $\\sigma$ también crece y la banda se ensancha.', 'أبعِده؛ وانتبه: $\\sigma$ يكبر أيضًا ويتّسع النطاق.', 'Take it far away; careful, $\\sigma$ grows too and the band widens.'), isSolved: (state) => outlierKind(state.datum, 'sigma') === '>' },
    { id: 114202, prompt: say('Jarri datua kutxaren arauarekin atipikoa izan dadin, baina ez $\\bar{x}\\pm 3\\sigma$ arauarekin.', 'Coloca el dato para que sea atípico con la regla de la caja, pero no con $\\bar{x}\\pm 3\\sigma$.', 'ضع البيان ليكون شاذًّا بقاعدة الصندوق لا بقاعدة $\\bar{x}\\pm 3\\sigma$.', 'Place the datum so that it is an outlier with the box rule, but not with $\\bar{x}\\pm 3\\sigma$.'), hint: say('Kutxaren mugak ia ez dira mugitzen; probatu 30 inguruan.', 'Los límites de la caja apenas se mueven; prueba hacia el 30.', 'حدّا الصندوق لا يكادان يتحركان؛ جرّب قرب 30.', 'The box limits hardly move; try around 30.'), isSolved: (state) => outlierKind(state.datum, 'box') !== '=' && outlierKind(state.datum, 'sigma') === '=' },
    { id: 114203, prompt: say('Egin datua atipikoa izatea behetik, bi arauekin.', 'Haz que el dato sea atípico por abajo con las dos reglas.', 'اجعل البيان شاذًّا من الأسفل بالقاعدتين.', 'Make the datum an outlier below with both rules.'), hint: say('Eraman 0 aldera, bi muga baino beherago.', 'Llévalo hacia el 0, por debajo de los dos límites.', 'حرّكه نحو 0 تحت الحدّين.', 'Take it towards 0, below both limits.'), isSolved: (state) => outlierKind(state.datum, 'sigma') === '<' && outlierKind(state.datum, 'box') === '<' }
]

/** The data that solve a test, scanning the whole axis */
const datumWhere = (test: (datum: number) => boolean) => Array.from({ length: DATUM_LIMITS.max - DATUM_LIMITS.min + 1 }, (_, index) => DATUM_LIMITS.min + index).filter(test)

/** Endless practice: the mean, σ or a limit of the band past a number, or the first datum that is an outlier */
const outlierMaker: LabChallengeMaker<OutlierState> = (random) => {
    for (;;) {
        const goal = pick(random, ['mean', 'sigma', 'upper', 'first-above', 'first-below'] as const)
        if (goal === 'mean') {
            // x̄ = (380 + d) / 20
            const mean = pick(random, [19, 19.5, 20.5, 21, 21.5])
            const datum = 20 * mean - 380
            const text = String(mean).replace('.', '{,}')
            return {
                prompt: say(`Egin 20 datuen batez bestekoa $${text}$ izatea.`, `Haz que la media de los 20 datos sea $${text}$.`, `اجعل متوسط البيانات العشرين $${text}$.`, `Make the mean of the 20 data $${text}$.`),
                hint: say(`Batura $20\\cdot ${text}$ izan behar da, eta beste 19 datuek 380 batzen dute.`, `La suma tiene que ser $20\\cdot ${text}$, y los otros 19 datos suman 380.`, `يجب أن يكون المجموع $20\\cdot ${text}$، ومجموع البيانات التسعة عشر الأخرى 380.`, `The sum must be $20\\cdot ${text}$, and the other 19 data add up to 380.`),
                isSolved: (state) => Math.abs(meanOf(allData(state.datum)) - mean) < 1e-9,
                solution: setOutlier(initialOutlierState, { datum })
            }
        }
        if (goal === 'sigma') {
            const bound = pick(random, [4, 5, 6])
            const options = datumWhere((datum) => sigmaOf(allData(datum)) > bound)
            if (!options.length) continue
            return {
                prompt: say(`Egin $\\sigma$ desbideratze tipikoa ${bound} baino handiagoa izatea.`, `Haz que la desviación típica $\\sigma$ pase de ${bound}.`, `اجعل الانحراف المعياري $\\sigma$ أكبر من ${bound}.`, `Make the standard deviation $\\sigma$ greater than ${bound}.`),
                hint: say('Datu bakar bat urrun eramatea aski da.', 'Basta con alejar un solo dato.', 'يكفي إبعاد بيان واحد.', 'Moving a single datum far away is enough.'),
                isSolved: (state) => sigmaOf(allData(state.datum)) > bound,
                solution: setOutlier(initialOutlierState, { datum: options[options.length - 1] })
            }
        }
        if (goal === 'upper') {
            const bound = pick(random, [32, 35, 38])
            const options = datumWhere((datum) => limitsOf(datum, 'sigma')[1] > bound)
            if (!options.length) continue
            return {
                prompt: say(`Egin $\\bar{x}+3\\sigma$ muga ${bound} baino handiagoa izatea.`, `Haz que el límite $\\bar{x}+3\\sigma$ pase de ${bound}.`, `اجعل الحد $\\bar{x}+3\\sigma$ أكبر من ${bound}.`, `Make the limit $\\bar{x}+3\\sigma$ greater than ${bound}.`),
                hint: say('Datu urrun batek $\\sigma$ handitzen du, eta banda zabaltzen da.', 'Un dato lejano agranda $\\sigma$ y la banda se ensancha.', 'البيان البعيد يكبّر $\\sigma$ فيتّسع النطاق.', 'A far datum makes $\\sigma$ bigger and the band widens.'),
                isSolved: (state) => limitsOf(state.datum, 'sigma')[1] > bound,
                solution: setOutlier(initialOutlierState, { datum: options[options.length - 1] })
            }
        }
        const above = goal === 'first-above'
        const rule = pick<OutlierRule>(random, ['sigma', 'box'])
        const options = datumWhere((datum) => outlierKind(datum, rule) === (above ? '>' : '<'))
        if (!options.length) continue
        const target = above ? options[0] : options[options.length - 1]
        const ruleName = rule === 'sigma' ? say('$\\bar{x}\\pm 3\\sigma$ arauarekin', 'con la regla $\\bar{x}\\pm 3\\sigma$', 'بقاعدة $\\bar{x}\\pm 3\\sigma$', 'with the $\\bar{x}\\pm 3\\sigma$ rule') : say('kutxaren arauarekin', 'con la regla de la caja', 'بقاعدة الصندوق', 'with the box rule')
        return {
            prompt: above
                ? say(`Aurkitu goitik atipikoa den datu oso txikiena, ${ruleName.eu}.`, `Halla el menor dato entero que es atípico por arriba ${ruleName.es}.`, `أوجد أصغر بيان صحيح شاذ من الأعلى ${ruleName.ar}.`, `Find the smallest whole datum that is an outlier above ${ruleName.en}.`)
                : say(`Aurkitu behetik atipikoa den datu oso handiena, ${ruleName.eu}.`, `Halla el mayor dato entero que es atípico por abajo ${ruleName.es}.`, `أوجد أكبر بيان صحيح شاذ من الأسفل ${ruleName.ar}.`, `Find the largest whole datum that is an outlier below ${ruleName.en}.`),
            hint: say('Mugitu datua banan-banan, eta begiratu noiz pasatzen den muga.', 'Mueve el dato de uno en uno y mira cuándo cruza el límite.', 'حرّك البيان واحدًا واحدًا وانظر متى يتجاوز الحد.', 'Move the datum one by one and watch when it crosses the limit.'),
            isSolved: (state) => state.datum === target && outlierKind(state.datum, rule) !== '=',
            solution: setOutlier(initialOutlierState, { datum: target, rule })
        }
    }
}

export const outlierExtra = freshFrom(initialOutlierState, outlierMaker)

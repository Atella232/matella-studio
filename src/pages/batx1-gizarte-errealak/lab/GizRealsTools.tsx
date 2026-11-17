import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor, groupDigits } from '../../../utils/numberFormat'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { INK, MUSTARD_TINT, MUTED, PAPER, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { COMMA_FIGURES, commaChallenges, commaExtra, commaPrediction, exponentLimits, initialCommaState, isScientific, mantissaLatex, mantissaText, scientificExponent, setComma, type CommaState } from './comma'
import { DIGITS_LIMITS, digitsChallenges, digitsExtra, digitsOf, digitsPrediction, fullLatex, initialDigitsState, logOf, setDigits, type DigitsState } from './digits'
import { absoluteErrors, initialWeightState, relativeErrors, setWeight, WEIGHT_PAIRS, WEIGHT_STEPS, weightChallenges, weightExtra, weightPrediction, type WeightState } from './weight'

/* ==========================================================================
   Zenbaki errealak · Batxilergoa 1 · Gizarte Zientziak — the three tools of
   this unit: the same error with a different weight (relative error of a
   big and a small quantity), how many digits (a logarithmic ruler) and the
   travelling decimal point (scientific notation). Each asks for a
   prediction before it shows the result; the point travels with ▶. Logic
   in weight.ts, digits.ts and comma.ts. Words in the drawings go through
   <Label>, so the Arabic reads right to left also in Safari.
   ========================================================================== */

/** A number as each language writes it: comma or point, and the thousands grouped */
function written(value: number, decimals: number, language: UnitLanguage): string {
    const fixed = value.toFixed(decimals)
    const [whole, part] = fixed.split('.')
    const grouped = groupDigits(whole, language)
    return part ? `${grouped}${language === 'ar' ? '.' : decimalSeparatorFor(language)}${part}` : grouped
}
/** The same number for LaTeX: thousands with \, and the comma as {,} (the point in Arabic) */
function tex(value: number, decimals: number, language: UnitLanguage): string {
    const [whole, part] = value.toFixed(decimals).split('.')
    const grouped = whole.replace('-', '').length >= 5 ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : whole
    return part ? `${grouped}${language === 'ar' ? '.' : '{,}'}${part}` : grouped
}
/** Decimals that show a percentage with two significant figures */
const percentDecimals = (value: number) => (value >= 10 ? 1 : value >= 1 ? 2 : 3)
/** Decimals of an error: none for whole amounts, two for cents */
const errorDecimals = (value: number) => (Number.isInteger(value) ? 0 : 2)
const arabicDecimal = (latex: string, language: UnitLanguage) => (language === 'ar' ? latex.replace(/\{,\}/g, '.') : latex)

/* ---------- L1. The same error, a different weight ---------- */

export function WeightTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<WeightState>(initialWeightState)
    const shown = state.prediction !== null
    const pair = WEIGHT_PAIRS[state.pair]
    const absolute = absoluteErrors(state)
    const relative = relativeErrors(state)
    const unitWord = (unit: 'euro' | 'people') => (unit === 'euro' ? ' €' : '')
    const controls = (
        <>
            <Segmented<string>
                label={l(say('Bikotea', 'Pareja', 'الزوج', 'Pair'))}
                value={String(state.pair)}
                options={WEIGHT_PAIRS.map((item, index) => ({ value: String(index), label: `${l(item.big.label)} · ${l(item.small.label)}` }))}
                onChange={(value) => setState((s) => setWeight(s, { pair: Number(value) }))}
            />
            <Stepper label={l(pair.big.label)} value={state.big} min={WEIGHT_STEPS.min} max={WEIGHT_STEPS.max} format={(steps) => `± ${written(steps * pair.big.step, 0, props.language)}${unitWord(pair.big.unit)}`} onChange={(big) => setState((s) => setWeight(s, { big }))} language={props.language} />
            <Stepper label={l(pair.small.label)} value={state.small} min={WEIGHT_STEPS.min} max={WEIGHT_STEPS.max} format={(steps) => `± ${written(Math.round(steps * pair.small.step * 100) / 100, errorDecimals(pair.small.step), props.language)}${unitWord(pair.small.unit)}`} onChange={(small) => setState((s) => setWeight(s, { small }))} language={props.language} />
        </>
    )
    const where = weightPrediction(state)
    const percentLatex = (value: number) => tex(value * 100, percentDecimals(value * 100), props.language)
    const line = (error: number, value: number, rel: number) => `E_r=\\frac{${tex(error, errorDecimals(error), props.language)}}{${tex(value, errorDecimals(value), props.language)}}\\approx ${percentLatex(rel)}\\,\\%`
    const note = where === '='
        ? say('Pisu bera: errore absolutuak oso desberdinak dira, baina erlatiboak berdinak.', 'Pesan lo mismo: los errores absolutos son muy distintos, pero los relativos son iguales.', 'لهما الوزن نفسه: الخطآن المطلقان مختلفان جدًا، لكن النسبيين متساويان.', 'They weigh the same: the absolute errors are very different, but the relative ones are equal.')
        : where === '>'
            ? say('Kantitate handiaren erroreak pisu gehiago du, bere balioaren zati handiagoa delako.', 'Pesa más el error de la cantidad grande: es una parte mayor de su valor.', 'خطأ الكمية الكبيرة أثقل: إنه جزء أكبر من قيمتها.', 'The error of the big quantity weighs more: it is a bigger part of its value.')
            : say('Kantitate txikiaren erroreak pisu gehiago du, nahiz eta zenbakiz askoz txikiagoa izan.', 'Pesa más el error de la cantidad pequeña, aunque como número sea mucho menor.', 'خطأ الكمية الصغيرة أثقل، مع أنه عدديًا أصغر بكثير.', 'The error of the small quantity weighs more, even though as a number it is much smaller.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ehunekoak ikusi aurretik: zein errorek du pisu gehiago bere balioarekiko?', 'Antes de ver los porcentajes: ¿qué error pesa más respecto a su valor?', 'قبل رؤية النسب: أيّ خطأ أثقل بالنسبة إلى قيمته؟', 'Before you see the percentages: which error weighs more compared with its value?')}
            labels={{ '<': say('Txikiarena', 'El de la pequeña', 'خطأ الصغيرة', 'The small one\'s'), '=': say('Berdin', 'Igual', 'متساويان', 'The same'), '>': say('Handiarena', 'El de la grande', 'خطأ الكبيرة', 'The big one\'s') }}
            actual={where}
            choice={state.prediction}
            tip={say('Errore erlatiboa errorea zati balioa da: $E_r=\\frac{E_a}{x}$.', 'El error relativo es el error dividido entre el valor: $E_r=\\frac{E_a}{x}$.', 'الخطأ النسبي هو الخطأ مقسومًا على القيمة: $E_r=\\frac{E_a}{x}$.', 'The relative error is the error divided by the value: $E_r=\\frac{E_a}{x}$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[line(absolute.big, pair.big.value, relative.big), line(absolute.small, pair.small.value, relative.small)]} note={l(note)} />
        </Predict>
    )
    // The bar of each quantity is its whole value; the red slice is its error, at the scale 1 % = 12 px
    const x0 = 24
    const scale = 1200
    const rows = [
        { y: 46, item: pair.big, error: absolute.big, rel: relative.big },
        { y: 124, item: pair.small, error: absolute.small, rel: relative.small }
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={weightChallenges} extraChallenges={weightExtra} state={state}>
            <Board height={200} label={l(say('Bi kantitate eta haien erroreak, balio osoaren zati gisa', 'Dos cantidades y sus errores, como parte del valor total', 'كميتان وخطآهما كجزء من القيمة الكاملة', 'Two quantities and their errors, as a part of the whole value'))}>
                {rows.map(({ y, item, error, rel }) => {
                    const slice = Math.min(312, rel * scale)
                    // The percentage goes right of the slice, or inside it at the end when the slice is long
                    const inside = slice > 240
                    return (
                        <g key={y}>
                            <Label x={x0} y={y - 10} textAnchor="start" fontSize={14} fontWeight={700} fill={INK}>{`${l(item.label)}: ${written(item.value, errorDecimals(item.value), props.language)}${unitWord(item.unit)}`}</Label>
                            <rect x={x0} y={y} width={312} height={22} rx={4} fill={STAGE_TINT} stroke={INK} strokeWidth={1.2} />
                            {shown
                                ? <rect x={x0} y={y} width={slice} height={22} rx={4} fill={SECOND_TINT} stroke={SECOND} strokeWidth={2} />
                                : <Hidden x={180} y={y + 19} size={20} />}
                            <text x={336} y={y + 42} textAnchor="end" fontSize={13} fill={MUTED} direction="ltr">{`± ${written(error, errorDecimals(error), props.language)}${unitWord(item.unit)}`}</text>
                            {shown && <text x={inside ? x0 + slice - 6 : x0 + slice + 6} y={y + 16} textAnchor={inside ? 'end' : 'start'} fontSize={14} fontWeight={700} fill={SECOND} direction="ltr">{`${written(rel * 100, percentDecimals(rel * 100), props.language)} %`}</text>}
                        </g>
                    )
                })}
                <Label x={180} y={194} textAnchor="middle" fontSize={12} fill={MUTED}>{l(say('Barra osoa: balioaren % 26; zati gorria: errorea', 'Barra entera: el 26 % del valor; trozo rojo: el error', 'الشريط كله: 26 % من القيمة، والجزء الأحمر: الخطأ', 'Whole bar: 26% of the value; red part: the error'))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. How many digits ---------- */

const SUPERSCRIPT: Record<string, string> = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }
const power = (exponent: number) => `10${String(exponent).split('').map((char) => SUPERSCRIPT[char]).join('')}`

export function DigitsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DigitsState>(initialDigitsState)
    const shown = state.prediction !== null
    const log = logOf(state)
    // The ruler shows four powers of 10 around N, so the steps stay wide on a phone
    const first = Math.min(DIGITS_LIMITS.exponent.max - 2, Math.max(DIGITS_LIMITS.exponent.min, state.exponent - 1))
    const X = (value: number) => 30 + (value - first) * 100
    const y = 96
    const mantissa = (tenths: number) => written(tenths / 10, tenths % 10 === 0 ? 0 : 1, props.language)
    const controls = (
        <>
            <Stepper label={l(say('Mantisa m', 'Mantisa m', 'الجزء العشري m', 'Mantissa m'))} value={state.tenths} min={DIGITS_LIMITS.tenths.min} max={DIGITS_LIMITS.tenths.max} format={mantissa} onChange={(tenths) => setState((s) => setDigits(s, { tenths }))} language={props.language} />
            <Stepper label={l(say('Berretzailea e', 'Exponente e', 'الأس e', 'Exponent e'))} value={state.exponent} min={DIGITS_LIMITS.exponent.min} max={DIGITS_LIMITS.exponent.max} format={(value) => (value < 0 ? `−${-value}` : String(value))} onChange={(exponent) => setState((s) => setDigits(s, { exponent }))} language={props.language} />
        </>
    )
    const full = arabicDecimal(fullLatex(state), props.language)
    const digits = digitsOf(state)
    const note = digits > 0
        ? say(`$N$ zenbakiak ${digits} zifra ditu zati osoan: logaritmoaren zati osoa ${state.exponent} da, zifrak ken bat.`, `$N$ tiene ${digits} cifras en su parte entera: la parte entera del logaritmo es ${state.exponent}, cifras menos uno.`, `في الجزء الصحيح من $N$ ‏${digits} أرقام: الجزء الصحيح من اللوغاريتم ${state.exponent}، أي عدد الأرقام ناقص واحد.`, `$N$ has ${digits} digits in its whole part: the whole-number part of the logarithm is ${state.exponent}, digits minus one.`)
        : say(`$N$ 1 baino txikiagoa da: bere logaritmoa negatiboa da, eta zati osoa ${state.exponent < 0 ? `$${state.exponent}$` : '0'}.`, `$N$ es menor que 1: su logaritmo es negativo y su parte entera es ${state.exponent < 0 ? `$${state.exponent}$` : '0'}.`, `$N$ أصغر من 1: لوغاريتمه سالب وجزؤه الصحيح ${state.exponent < 0 ? `$${state.exponent}$` : '0'}.`, `$N$ is less than 1: its logarithm is negative and its whole-number part is ${state.exponent < 0 ? `$${state.exponent}$` : '0'}.`)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Logaritmoa ikusi aurretik: $\\log N$ zenbakia ${state.exponent < 0 ? `$${state.exponent}$` : state.exponent} zenbakitik ala hurrengotik gertuago dago?`, `Antes de ver el logaritmo: ¿$\\log N$ está más cerca de ${state.exponent < 0 ? `$${state.exponent}$` : state.exponent} o del siguiente entero?`, `قبل رؤية اللوغاريتم: هل $\\log N$ أقرب إلى ${state.exponent < 0 ? `$${state.exponent}$` : state.exponent} أم إلى العدد الصحيح التالي؟`, `Before you see the logarithm: is $\\log N$ nearer to ${state.exponent < 0 ? `$${state.exponent}$` : state.exponent} or to the next whole number?`)}
            labels={{ '<': say('Lehenengotik', 'Del primero', 'إلى الأول', 'The first'), '=': say('Erdian', 'En medio', 'في المنتصف', 'In the middle'), '>': say('Hurrengotik', 'Del siguiente', 'إلى التالي', 'The next') }}
            actual={digitsPrediction(state)}
            choice={state.prediction}
            tip={say('Erdia ez da 5: $\\log 3{,}16\\approx 0{,}5$. 3,16 baino mantisa txikiagoak lehenengo zenbakira hurbiltzen dira.', 'El punto medio no es el 5: $\\log 3{,}16\\approx 0{,}5$. Las mantisas menores que 3,16 se acercan al primero.', 'المنتصف ليس 5: ‏$\\log 3{,}16\\approx 0{,}5$. الأجزاء العشرية الأصغر من 3.16 تقترب من الأول.', 'The middle is not 5: $\\log 3{,}16\\approx 0{,}5$. Mantissas below 3.16 are nearer to the first.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`N=${full}=${arabicDecimal(mantissa(state.tenths).replace(',', '{,}'), props.language)}\\cdot 10^{${state.exponent}}`, `\\log N\\approx ${tex(log, 3, props.language)}`]} note={l(note)} />
        </Predict>
    )
    const point = X(log)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={digitsChallenges} extraChallenges={digitsExtra} state={state}>
            <Board height={180} label={l(say('Erregela logaritmikoa: 10 zenbakiaren berreturak zenbaki osoetan', 'Regla logarítmica: las potencias de 10 en los enteros', 'مسطرة لوغاريتمية: قوى 10 عند الأعداد الصحيحة', 'Logarithmic ruler: the powers of 10 at the whole numbers'))}>
                <rect x={X(state.exponent)} y={y - 14} width={100} height={28} fill={MUSTARD_TINT} />
                <line x1={14} x2={346} y1={y} y2={y} stroke={INK} strokeWidth={2} />
                {[0, 1, 2, 3].map((i) => {
                    const exponent = first + i
                    const inside = exponent === state.exponent || exponent === state.exponent + 1
                    return (
                        <g key={exponent}>
                            <line x1={X(exponent)} x2={X(exponent)} y1={y - 9} y2={y + 9} stroke={INK} strokeWidth={2} />
                            <text x={X(exponent)} y={y - 22} textAnchor="middle" fontSize={16} fontWeight={700} fill={inside ? STAGE : INK} direction="ltr">{power(exponent)}</text>
                            <text x={X(exponent)} y={y + 30} textAnchor="middle" fontSize={15} fill={MUTED} direction="ltr">{exponent < 0 ? `−${-exponent}` : String(exponent)}</text>
                            {i < 3 && [2, 3, 4, 5, 6, 7, 8, 9].map((m) => <line key={m} x1={X(exponent + Math.log10(m))} x2={X(exponent + Math.log10(m))} y1={y - 4} y2={y + 4} stroke={MUTED} strokeWidth={1} />)}
                        </g>
                    )
                })}
                <circle cx={point} cy={y} r={7} fill={SECOND} stroke={INK} strokeWidth={1} />
                <text x={Math.min(330, Math.max(30, point))} y={y - 44} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND} direction="ltr">{`N = ${written(state.tenths / 10, state.tenths % 10 === 0 ? 0 : 1, props.language)} · ${power(state.exponent)}`}</text>
                {shown
                    ? <text x={Math.min(330, Math.max(30, point))} y={y + 56} textAnchor="middle" fontSize={15} fontWeight={700} fill={SECOND} direction="ltr">{`log N ≈ ${written(log, 2, props.language)}`}</text>
                    : <Hidden x={Math.min(330, Math.max(30, point))} y={y + 60} size={22} />}
                <Label x={180} y={172} textAnchor="middle" fontSize={12} fill={MUTED}>{l(say('Goian zenbakia; behean, bere logaritmoa', 'Arriba el número; abajo, su logaritmo', 'في الأعلى العدد، وفي الأسفل لوغاريتمه', 'Above, the number; below, its logarithm'))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. The travelling point ---------- */

export function CommaTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CommaState>(initialCommaState)
    const shown = state.prediction !== null
    const figure = COMMA_FIGURES[state.figure]
    const scientific = scientificExponent(figure)
    const { min, max } = exponentLimits(figure)
    const playback = usePlayback(`${state.figure}-${state.exponent}`, 300 * Math.max(1, Math.abs(scientific - state.exponent)))
    // ▶ walks the exponent to the scientific one, one place at a time; the drawing follows
    const walked = playback.progress === null ? state.exponent : Math.round(state.exponent + (scientific - state.exponent) * playback.progress)
    const view = playback.progress === null ? state : { ...state, exponent: walked }
    const controls = (
        <>
            <Segmented<string>
                label={l(say('Datua', 'Dato', 'المعطى', 'Figure'))}
                value={String(state.figure)}
                options={COMMA_FIGURES.map((item, index) => ({ value: String(index), label: l(item.label) }))}
                onChange={(value) => setState((s) => setComma(s, { figure: Number(value) }))}
            />
            <Stepper label={l(say('Berretzailea n', 'Exponente n', 'الأس n', 'Exponent n'))} value={state.exponent} min={min} max={max} format={(value) => (value < 0 ? `−${-value}` : String(value))} onChange={(exponent) => setState((s) => setComma(s, { exponent }))} language={props.language} />
        </>
    )
    const where = commaPrediction(state)
    const latexOf = (s: CommaState) => arabicDecimal(`${mantissaLatex(s)}\\cdot 10^{${s.exponent}}`, props.language)
    const scientificState = { ...state, exponent: scientific }
    const readout = (
        <Predict
            language={props.language}
            question={say('Mantisa 1 eta 10 artean uzteko, berretzaileak jaitsi, berdin geratu ala igo beharko du?', 'Para dejar la mantisa entre 1 y 10, ¿el exponente tendrá que bajar, quedarse igual o subir?', 'لكي يكون الجزء العشري بين 1 و10، هل يجب أن ينقص الأس أم يبقى أم يزيد؟', 'To leave the mantissa between 1 and 10, will the exponent have to go down, stay or go up?')}
            labels={{ '<': say('Jaitsi', 'Bajar', 'ينقص', 'Go down'), '=': say('Berdin', 'Igual', 'يبقى', 'Stay'), '>': say('Igo', 'Subir', 'يزيد', 'Go up') }}
            actual={where}
            choice={state.prediction}
            tip={say('Koma ezkerrera mugitzen bada, mantisa txikiagoa da eta berretzailea igotzen da; eskuinera, alderantziz.', 'Si la coma va a la izquierda, la mantisa se hace menor y el exponente sube; a la derecha, al revés.', 'إذا تحركت الفاصلة إلى اليسار صغر الجزء العشري وزاد الأس، وإلى اليمين العكس.', 'If the point moves left, the mantissa gets smaller and the exponent goes up; to the right, the other way round.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`${latexOf(state)}=${latexOf(scientificState)}`]}
                note={l(isScientific(state)
                    ? say('Hau da idazkera zientifikoa: komaren aurretik zifra bakarra, ez zero.', 'Esta es la notación científica: una sola cifra, no cero, antes de la coma.', 'هذا هو الترميز العلمي: رقم واحد غير الصفر قبل الفاصلة.', 'This is scientific notation: a single non-zero digit before the point.')
                    : say(`Idazkera zientifikoan berretzailea $${scientific}$ da.`, `En notación científica el exponente es $${scientific}$.`, `في الترميز العلمي يكون الأس $${scientific}$.`, `In scientific notation the exponent is $${scientific}$.`))}
            />
        </Predict>
    )
    // The digits in boxes, the point between two of them (or zeros added at either end)
    const text = mantissaText(view)
    const chars = text.split('')
    const count = chars.filter((char) => char !== ',').length
    const box = Math.min(42, 230 / Math.max(1, count))
    const total = chars.reduce((width, char) => width + (char === ',' ? 12 : box), 0)
    // The digits of the figure are its first ones, or its last ones when the point adds zeros in front («0,0037»)
    const leading = text.startsWith('0,')
    let cursor = 180 - total / 2 - 50
    let seen = 0
    const cells = chars.map((char) => {
        const x = cursor
        cursor += char === ',' ? 12 : box
        const position = char === ',' ? -1 : seen++
        const own = position >= 0 && (leading ? position >= count - figure.digits.length : position < figure.digits.length)
        return { char, x, own }
    })
    const y = 70
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={commaChallenges} extraChallenges={commaExtra} state={state}>
            <Board height={160} label={l(say('Datuaren zifrak, koma eta 10 zenbakiaren berretura', 'Las cifras del dato, la coma y la potencia de 10', 'أرقام المعطى والفاصلة وقوة العدد 10', 'The digits of the figure, the point and the power of 10'))}>
                <Label x={180} y={24} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{l(figure.label)}</Label>
                {cells.map(({ char, x, own }, index) => char === ','
                    ? <circle key={index} cx={x + 6} cy={y + 18} r={4} fill={SECOND} />
                    : (
                        <g key={index}>
                            <rect x={x + 1} y={y - 26} width={box - 2} height={48} rx={4} fill={own ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.2} />
                            <text x={x + box / 2} y={y + 8} textAnchor="middle" fontSize={Math.min(30, box * 0.75)} fontWeight={700} fill={INK} direction="ltr">{char}</text>
                        </g>
                    ))}
                <text x={cursor + 8} y={y + 8} fontSize={26} fontWeight={700} fill={INK} direction="ltr">{`· ${power(view.exponent)}`}</text>
                {shown && isScientific(view) && <text x={180} y={y + 54} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE} direction="ltr">{`1 ≤ ${written(Number(text.replace(',', '.')), Math.max(0, text.length - 2), props.language)} < 10 ✓`}</text>}
                <Label x={180} y={152} textAnchor="middle" fontSize={12} fill={MUTED}>{l(say('Berretzailea aldatzean koma mugitzen da; zenbakia ez da aldatzen', 'Al cambiar el exponente se mueve la coma; el número no cambia', 'عند تغيير الأس تتحرك الفاصلة، والعدد لا يتغير', 'Changing the exponent moves the point; the number does not change'))}</Label>
            </Board>
            <PlayButton label={l(say('Eraman idazkera zientifikora', 'Llevar a notación científica', 'انقل إلى الترميز العلمي', 'Take to scientific notation'))} disabled={!shown || isScientific(state)} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

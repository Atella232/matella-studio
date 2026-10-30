import { gcd } from '../../../features/unit-v2/math/fraction.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Berreturen detektibea (3. DBH): a worked solution of three lines where
   exactly one line has a mistake, and the lines after it carry the mistake
   on. The learner taps the wrong line and says which mistake it is, among
   three. The mistakes are the typical ones of this topic: the sign of a
   power, a negative exponent, (a + b)², the exponent of a product, the
   exponent of a number in scientific notation, the radicands added, the
   root of a sum, truncating for rounding, the ends of an interval, the
   relative error divided by the wrong number. Level 1: powers; level 2:
   scientific notation and roots; level 3: real numbers and approximations.
   Every case is built from numbers whose exact values the tests recompute.
   ========================================================================== */

export type DetectiveError =
    | 'sign-base'
    | 'negative-result'
    | 'add-bases'
    | 'zero-power'
    | 'multiply-exponents'
    | 'power-of-power'
    | 'sci-sign'
    | 'no-adjust'
    | 'add-radicands'
    | 'outside-square'
    | 'root-sum'
    | 'round-trunc'
    | 'interval-count'
    | 'rel-denominator'
    | 'bounds'

export interface DetectiveLine {
    /** What the line works out */
    label: LocalizedText
    latex: string
}

export interface DetectiveCase {
    problem: LocalizedText
    lines: DetectiveLine[]
    wrong: number
    error: DetectiveError
    /** What the wrong line should have been */
    fix: string
    /** Three kinds of mistake to choose from, the right one among them */
    options: DetectiveError[]
    /** Numbers the tests recompute the case from */
    meta: Record<string, number>
}

export const detectiveLevels: DetectiveError[][] = [
    ['sign-base', 'negative-result', 'add-bases', 'zero-power', 'multiply-exponents', 'power-of-power'],
    ['sci-sign', 'no-adjust', 'add-radicands', 'outside-square', 'root-sum'],
    ['round-trunc', 'interval-count', 'rel-denominator', 'bounds']
]

export const DETECTIVE_CASES = 6

/** Two mistakes that are the same wrong identity read in two directions: never offered together */
const SAME_MISTAKE: Partial<Record<DetectiveError, DetectiveError>> = { 'add-radicands': 'root-sum', 'root-sum': 'add-radicands' }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`
const line = (label: LocalizedText, latex: string): DetectiveLine => ({ label, latex })
const paren = (value: number) => (value < 0 ? `(${value})` : String(value))

const LABELS = {
    start: say('Hasiera', 'Planteamiento', 'البداية', 'Set-up'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    exponent: say('Berretzailea', 'El exponente', 'الأس', 'The exponent'),
    jumps: say('Komaren jauziak', 'Saltos de la coma', 'قفزات الفاصلة', 'Decimal point jumps'),
    check: say('Egiaztapena', 'Comprobación', 'التحقق', 'Checking')
}

export const detectiveErrorNames: Record<DetectiveError, LocalizedText> = {
    'sign-base': say('Berretzaileak zeinuari ere eragin diola uste du', 'Creyó que el exponente afecta al signo', 'ظنّ أن الأس يؤثر في الإشارة', 'Thought the exponent affects the sign'),
    'negative-result': say('Berretzaile negatiboa emaitza negatibo bihurtu du', 'Convirtió el exponente negativo en resultado negativo', 'حوّل الأس السالب إلى نتيجة سالبة', 'Turned the negative exponent into a negative result'),
    'add-bases': say('Batuketaren berretura banatu du', 'Repartió la potencia de una suma', 'وزّع قوة المجموع', 'Distributed the power over a sum'),
    'zero-power': say('Berretzaile zeroa 0 dela uste du', 'Creyó que a⁰ = 0', 'ظنّ أن a⁰ = 0', 'Thought that a⁰ = 0'),
    'multiply-exponents': say('Berretzaileak biderkatu ditu, batu beharrean', 'Multiplicó los exponentes en lugar de sumarlos', 'ضرب الأسس بدل جمعها', 'Multiplied the exponents instead of adding them'),
    'power-of-power': say('Berreturaren berretura batuz egin du', 'Sumó los exponentes en una potencia de potencia', 'جمع الأسس في قوة القوة', 'Added the exponents in a power of a power'),
    'sci-sign': say('Berretzailearen zeinua alderantzizkoa da', 'El signo del exponente está al revés', 'إشارة الأس معكوسة', 'The sign of the exponent is the wrong way round'),
    'no-adjust': say('Ez du idazkera zientifikora egokitu', 'No ajustó a notación científica', 'لم يضبط الترميز العلمي', 'Did not adjust to scientific notation'),
    'add-radicands': say('Errokizunak batu ditu', 'Sumó los radicandos', 'جمع ما تحت الجذور', 'Added the radicands'),
    'outside-square': say('Karratua atera du erroaren kanpora', 'Sacó el cuadrado en lugar de la raíz', 'أخرج المربع بدل جذره', 'Took out the square instead of its root'),
    'root-sum': say('Batuketaren erroa banatu du', 'Repartió la raíz de una suma', 'وزّع جذر المجموع', 'Distributed the square root over a sum'),
    'round-trunc': say('Trunkatu du, biribildu beharrean', 'Truncó en lugar de redondear', 'بتر بدل أن يقرّب', 'Truncated instead of rounding'),
    'interval-count': say('Muturrak gaizki zenbatu ditu', 'Contó mal los extremos', 'عدّ الطرفين خطأً', 'Miscounted the endpoints'),
    'rel-denominator': say('Hurbilketaz zatitu du, zenbaki zehatzaz beharrean', 'Dividió entre la aproximación, no entre el valor exacto', 'قسم على التقريب لا على القيمة الصحيحة', 'Divided by the approximation, not by the exact value'),
    bounds: say('Zenbaki oso okerrak hartu ditu', 'Tomó los enteros equivocados', 'أخذ العددين الصحيحين الخطأ', 'Picked the wrong integers')
}

export const detectiveErrorTips: Record<DetectiveError, LocalizedText> = {
    'sign-base': say('Berretzaileak oinarriari bakarrik eragiten dio: $-3^{2}=-(3\\cdot 3)=-9$, baina $(-3)^{2}=9$.', 'El exponente solo afecta a la base: $-3^{2}=-(3\\cdot 3)=-9$, pero $(-3)^{2}=9$.', 'الأس يؤثر في الأساس فقط: $-3^{2}=-(3\\cdot 3)=-9$ لكن $(-3)^{2}=9$.', 'The exponent only affects the base: $-3^{2}=-(3\\cdot 3)=-9$, but $(-3)^{2}=9$.'),
    'negative-result': say('Berretzaile negatiboak alderantzizkoa ematen du, ez emaitza negatiboa: $a^{-n}=\\frac{1}{a^{n}}$.', 'Un exponente negativo da el inverso, no un resultado negativo: $a^{-n}=\\frac{1}{a^{n}}$.', 'الأس السالب يعطي المقلوب لا نتيجة سالبة: $a^{-n}=\\frac{1}{a^{n}}$.', 'A negative exponent gives the reciprocal, not a negative result: $a^{-n}=\\frac{1}{a^{n}}$.'),
    'add-bases': say('$(a+b)^{2}$ ez da $a^{2}+b^{2}$: lehenik batu parentesi barruan.', '$(a+b)^{2}$ no es $a^{2}+b^{2}$: primero se suma dentro del paréntesis.', '$(a+b)^{2}$ ليست $a^{2}+b^{2}$: اجمع أولًا داخل القوس.', '$(a+b)^{2}$ is not $a^{2}+b^{2}$: first add inside the brackets.'),
    'zero-power': say('Edozein oinarrik (0 ez dena), zero berretzailearekin, $1$ ematen du: $a^{0}=1$.', 'Cualquier base (distinta de 0) con exponente cero da $1$: $a^{0}=1$.', 'أي أساس (غير الصفر) بأس صفر يعطي $1$: $a^{0}=1$.', 'Any base (other than 0) with exponent zero gives $1$: $a^{0}=1$.'),
    'multiply-exponents': say('Oinarri bera biderkatzean berretzaileak batu egiten dira: $a^{m}\\cdot a^{n}=a^{m+n}$.', 'Al multiplicar la misma base los exponentes se suman: $a^{m}\\cdot a^{n}=a^{m+n}$.', 'عند ضرب الأساس نفسه تُجمع الأسس: $a^{m}\\cdot a^{n}=a^{m+n}$.', 'When multiplying the same base, the exponents are added: $a^{m}\\cdot a^{n}=a^{m+n}$.'),
    'power-of-power': say('Berreturaren berreturan berretzaileak biderkatu egiten dira: $(a^{m})^{n}=a^{m\\cdot n}$.', 'En una potencia de potencia los exponentes se multiplican: $(a^{m})^{n}=a^{m\\cdot n}$.', 'في قوة القوة تُضرب الأسس: $(a^{m})^{n}=a^{m\\cdot n}$.', 'In a power of a power, the exponents are multiplied: $(a^{m})^{n}=a^{m\\cdot n}$.'),
    'sci-sign': say('Zenbaki txikiak (1 baino txikiagoak) berretzaile negatiboa du: komak eskuinera egiten du jauzi.', 'Un número pequeño (menor que 1) lleva exponente negativo: la coma salta a la derecha.', 'العدد الصغير (أقل من 1) له أس سالب: الفاصلة تقفز نحو اليمين.', 'A small number (less than 1) has a negative exponent: the decimal point jumps to the right.'),
    'no-adjust': say('Idazkera zientifikoan komaren aurretik zifra bakarra egon behar da: $20\\cdot 10^{8}=2\\cdot 10^{9}$.', 'En notación científica delante de la coma va una sola cifra: $20\\cdot 10^{8}=2\\cdot 10^{9}$.', 'في الترميز العلمي رقم واحد قبل الفاصلة: $20\\cdot 10^{8}=2\\cdot 10^{9}$.', 'In scientific notation, only one digit goes before the decimal point: $20\\cdot 10^{8}=2\\cdot 10^{9}$.'),
    'add-radicands': say('$\\sqrt{a}+\\sqrt{b}$ ez da $\\sqrt{a+b}$: erroak ez dira errokizunak batuz batzen.', '$\\sqrt{a}+\\sqrt{b}$ no es $\\sqrt{a+b}$: las raíces no se suman sumando los radicandos.', '$\\sqrt{a}+\\sqrt{b}$ ليست $\\sqrt{a+b}$: لا تُجمع الجذور بجمع ما تحتها.', '$\\sqrt{a}+\\sqrt{b}$ is not $\\sqrt{a+b}$: roots are not added by adding the radicands.'),
    'outside-square': say('Atera behar dena erroa da: $\\sqrt{s^{2}\\cdot k}=s\\sqrt{k}$, ez $s^{2}\\sqrt{k}$.', 'Lo que sale es la raíz: $\\sqrt{s^{2}\\cdot k}=s\\sqrt{k}$, no $s^{2}\\sqrt{k}$.', 'ما يخرج هو الجذر: $\\sqrt{s^{2}\\cdot k}=s\\sqrt{k}$ لا $s^{2}\\sqrt{k}$.', 'What comes out is the root: $\\sqrt{s^{2}\\cdot k}=s\\sqrt{k}$, not $s^{2}\\sqrt{k}$.'),
    'root-sum': say('$\\sqrt{a^{2}+b^{2}}$ ez da $a+b$: lehenik batu errokizunean eta gero atera erroa.', '$\\sqrt{a^{2}+b^{2}}$ no es $a+b$: primero se suma dentro y luego se saca la raíz.', '$\\sqrt{a^{2}+b^{2}}$ ليست $a+b$: اجمع أولًا تحت الجذر ثم خذ الجذر.', '$\\sqrt{a^{2}+b^{2}}$ is not $a+b$: first add inside, then take the square root.'),
    'round-trunc': say('Biribiltzean, kendutako lehen zifra $5$ edo handiagoa bada, aurreko zifrari $1$ gehitzen zaio.', 'Al redondear, si la primera cifra suprimida es $5$ o mayor, se suma $1$ a la cifra anterior.', 'عند التقريب إذا كان أول رقم محذوف $5$ أو أكبر نضيف $1$ إلى الرقم السابق.', 'When rounding, if the first digit dropped is $5$ or more, add $1$ to the previous digit.'),
    'interval-count': say('Kortxeteko muturra sartzen da, parentesikoa ez: zenbaki osoak $b-a$ dira $[a,b)$ tartean.', 'El extremo con corchete entra, el de paréntesis no: en $[a,b)$ hay $b-a$ enteros.', 'الطرف بقوس مربع داخل والآخر لا: في $[a,b)$ يوجد $b-a$ عددًا صحيحًا.', 'An endpoint with a square bracket is included, one with a round bracket is not: in $[a,b)$ there are $b-a$ integers.'),
    'rel-denominator': say('Errore erlatiboa: errore absolutua zatitu zenbaki zehatzaz, ez hurbilketaz.', 'Error relativo: el error absoluto entre el valor exacto, no entre la aproximación.', 'الخطأ النسبي: الخطأ المطلق على القيمة الصحيحة لا على التقريب.', 'Relative error: the absolute error divided by the exact value, not by the approximation.'),
    bounds: say('$n^{2}<N<(n+1)^{2}$ betetzen duten zenbaki osoak hartu behar dira.', 'Hay que tomar los enteros $n$ con $n^{2}<N<(n+1)^{2}$.', 'يجب أخذ العددين $n$ اللذين يحققان $n^{2}<N<(n+1)^{2}$.', 'You must take the integers $n$ with $n^{2}<N<(n+1)^{2}$.')
}

/* ---------- Cases ---------- */

type Builder = (random: Random) => DetectiveCase | null

function signBase(random: Random): DetectiveCase | null {
    const a = randomInt(random, 2, 6)
    const n = pick(random, [2, 4])
    const value = a ** n
    return {
        problem: say(`Kalkulatu ${math(`-${a}^{${n}}`)}.`, `Calcula ${math(`-${a}^{${n}}`)}.`, `احسب ${math(`-${a}^{${n}}`)}.`, `Calculate ${math(`-${a}^{${n}}`)}.`),
        lines: [line(LABELS.start, `-${a}^{${n}}=(-${a})^{${n}}`), line(LABELS.step, `(-${a})^{${n}}=${value}`), line(LABELS.result, `-${a}^{${n}}=${value}`)],
        wrong: 0, error: 'sign-base', fix: `-${a}^{${n}}=-(${a}^{${n}})=-${value}`, options: [], meta: { a, n }
    }
}

function negativeResult(random: Random): DetectiveCase | null {
    const a = pick(random, [2, 3, 4, 5])
    const k = randomInt(random, 2, 3)
    const value = a ** k
    return {
        problem: say(`Kalkulatu ${math(`${a}^{-${k}}`)}.`, `Calcula ${math(`${a}^{-${k}}`)}.`, `احسب ${math(`${a}^{-${k}}`)}.`, `Calculate ${math(`${a}^{-${k}}`)}.`),
        lines: [line(LABELS.rule, `${a}^{-${k}}=-${a}^{${k}}`), line(LABELS.step, `-${a}^{${k}}=-${value}`), line(LABELS.result, `${a}^{-${k}}=-${value}`)],
        wrong: 0, error: 'negative-result', fix: `${a}^{-${k}}=\\frac{1}{${a}^{${k}}}=\\frac{1}{${value}}`, options: [], meta: { a, k }
    }
}

function addBases(random: Random): DetectiveCase | null {
    const a = randomInt(random, 2, 6)
    const b = randomInt(random, 2, 6)
    if (a === b) return null
    return {
        problem: say(`Kalkulatu ${math(`(${a}+${b})^{2}`)}.`, `Calcula ${math(`(${a}+${b})^{2}`)}.`, `احسب ${math(`(${a}+${b})^{2}`)}.`, `Calculate ${math(`(${a}+${b})^{2}`)}.`),
        lines: [line(LABELS.start, `(${a}+${b})^{2}=${a}^{2}+${b}^{2}`), line(LABELS.step, `${a}^{2}+${b}^{2}=${a * a}+${b * b}`), line(LABELS.result, `(${a}+${b})^{2}=${a * a + b * b}`)],
        wrong: 0, error: 'add-bases', fix: `(${a}+${b})^{2}=${a + b}^{2}=${(a + b) ** 2}`, options: [], meta: { a, b }
    }
}

function zeroPower(random: Random): DetectiveCase | null {
    const a = randomInt(random, 2, 5)
    const b = randomInt(random, 2, 9)
    return {
        problem: say(`Kalkulatu ${math(`${a}^{3}\\cdot ${b}^{0}`)}.`, `Calcula ${math(`${a}^{3}\\cdot ${b}^{0}`)}.`, `احسب ${math(`${a}^{3}\\cdot ${b}^{0}`)}.`, `Calculate ${math(`${a}^{3}\\cdot ${b}^{0}`)}.`),
        lines: [line(LABELS.start, `${a}^{3}=${a ** 3}`), line(LABELS.step, `${b}^{0}=0`), line(LABELS.result, `${a}^{3}\\cdot ${b}^{0}=${a ** 3}\\cdot 0=0`)],
        wrong: 1, error: 'zero-power', fix: `${b}^{0}=1\\to ${a ** 3}\\cdot 1=${a ** 3}`, options: [], meta: { a, b }
    }
}

function multiplyExponents(random: Random): DetectiveCase | null {
    const a = pick(random, [2, 3, 5])
    const m = randomInt(random, 2, 4)
    const n = randomInt(random, 2, 4)
    if (m === n || m * n === m + n || a ** (m * n) > 100000) return null
    return {
        problem: say(`Kalkulatu ${math(`${a}^{${m}}\\cdot ${a}^{${n}}`)}.`, `Calcula ${math(`${a}^{${m}}\\cdot ${a}^{${n}}`)}.`, `احسب ${math(`${a}^{${m}}\\cdot ${a}^{${n}}`)}.`, `Calculate ${math(`${a}^{${m}}\\cdot ${a}^{${n}}`)}.`),
        lines: [line(LABELS.start, `${a}^{${m}}\\cdot ${a}^{${n}}=${a}^{${m}\\cdot ${n}}`), line(LABELS.exponent, `${m}\\cdot ${n}=${m * n}`), line(LABELS.result, `${a}^{${m * n}}=${a ** (m * n)}`)],
        wrong: 0, error: 'multiply-exponents', fix: `${a}^{${m}+${n}}=${a}^{${m + n}}=${a ** (m + n)}`, options: [], meta: { a, m, n }
    }
}

function powerOfPower(random: Random): DetectiveCase | null {
    const a = pick(random, [2, 3])
    const m = randomInt(random, 2, 3)
    const n = randomInt(random, 2, 3)
    if (m + n === m * n) return null
    return {
        problem: say(`Kalkulatu ${math(`(${a}^{${m}})^{${n}}`)}.`, `Calcula ${math(`(${a}^{${m}})^{${n}}`)}.`, `احسب ${math(`(${a}^{${m}})^{${n}}`)}.`, `Calculate ${math(`(${a}^{${m}})^{${n}}`)}.`),
        lines: [line(LABELS.start, `(${a}^{${m}})^{${n}}=${a}^{${m}+${n}}`), line(LABELS.exponent, `${m}+${n}=${m + n}`), line(LABELS.result, `${a}^{${m + n}}=${a ** (m + n)}`)],
        wrong: 0, error: 'power-of-power', fix: `${a}^{${m}\\cdot ${n}}=${a}^{${m * n}}=${a ** (m * n)}`, options: [], meta: { a, m, n }
    }
}

function sciSign(random: Random): DetectiveCase | null {
    const digits = pick(random, [57, 34, 82, 19, 63])
    const places = randomInt(random, 3, 6)
    const mantissa = `${Math.floor(digits / 10)}{,}${digits % 10}`
    const written = `0{,}${'0'.repeat(places - 1)}${digits}`
    return {
        problem: say(`Idatzi ${math(written)} idazkera zientifikoan.`, `Escribe ${math(written)} en notación científica.`, `اكتب ${math(written)} بالترميز العلمي.`, `Write ${math(written)} in scientific notation.`),
        lines: [line(LABELS.jumps, `${written}\\to ${mantissa}\\ (${places})`), line(LABELS.exponent, `10^{${places}}`), line(LABELS.result, `${written}=${mantissa}\\cdot 10^{${places}}`)],
        wrong: 1, error: 'sci-sign', fix: `10^{-${places}}\\to ${written}=${mantissa}\\cdot 10^{-${places}}`, options: [], meta: { digits, places }
    }
}

function noAdjust(random: Random): DetectiveCase | null {
    const a = pick(random, [4, 5, 6, 7, 8])
    const b = pick(random, [3, 4, 5, 6, 9])
    const p = randomInt(random, 2, 7)
    const q = randomInt(random, 2, 7)
    const product = a * b
    if (product < 10) return null
    const mantissa = product % 10 === 0 ? String(product / 10) : `${Math.floor(product / 10)}{,}${product % 10}`
    return {
        problem: say(`Kalkulatu ${math(`(${a}\\cdot 10^{${p}})(${b}\\cdot 10^{${q}})`)} idazkera zientifikoan.`, `Calcula ${math(`(${a}\\cdot 10^{${p}})(${b}\\cdot 10^{${q}})`)} en notación científica.`, `احسب ${math(`(${a}\\cdot 10^{${p}})(${b}\\cdot 10^{${q}})`)} بالترميز العلمي.`, `Calculate ${math(`(${a}\\cdot 10^{${p}})(${b}\\cdot 10^{${q}})`)} in scientific notation.`),
        lines: [line(LABELS.step, `${a}\\cdot ${b}=${product}`), line(LABELS.exponent, `10^{${p}}\\cdot 10^{${q}}=10^{${p + q}}`), line(LABELS.result, `${product}\\cdot 10^{${p + q}}`)],
        wrong: 2, error: 'no-adjust', fix: `${product}\\cdot 10^{${p + q}}=${mantissa}\\cdot 10^{${p + q + 1}}`, options: [], meta: { a, b, p, q }
    }
}

function addRadicands(random: Random): DetectiveCase | null {
    const triple = pick(random, [[3, 4], [5, 12], [6, 8], [8, 15]])
    const [x, y] = triple
    const a = x * x
    const b = y * y
    return {
        problem: say(`Kalkulatu ${math(`\\sqrt{${a}}+\\sqrt{${b}}`)}.`, `Calcula ${math(`\\sqrt{${a}}+\\sqrt{${b}}`)}.`, `احسب ${math(`\\sqrt{${a}}+\\sqrt{${b}}`)}.`, `Calculate ${math(`\\sqrt{${a}}+\\sqrt{${b}}`)}.`),
        lines: [line(LABELS.start, `\\sqrt{${a}}+\\sqrt{${b}}=\\sqrt{${a}+${b}}`), line(LABELS.step, `\\sqrt{${a + b}}`), line(LABELS.result, `\\sqrt{${a + b}}=${Math.round(Math.sqrt(a + b))}`)],
        wrong: 0, error: 'add-radicands', fix: `\\sqrt{${a}}+\\sqrt{${b}}=${x}+${y}=${x + y}`, options: [], meta: { x, y }
    }
}

function outsideSquare(random: Random): DetectiveCase | null {
    const s = randomInt(random, 2, 7)
    const k = pick(random, [2, 3, 5, 6, 7])
    return {
        problem: say(`Sinplifikatu ${math(`\\sqrt{${s * s * k}}`)}.`, `Simplifica ${math(`\\sqrt{${s * s * k}}`)}.`, `بسّط ${math(`\\sqrt{${s * s * k}}`)}.`, `Simplify ${math(`\\sqrt{${s * s * k}}`)}.`),
        lines: [line(LABELS.start, `${s * s * k}=${s}^{2}\\cdot ${k}`), line(LABELS.step, `\\sqrt{${s}^{2}\\cdot ${k}}=${s * s}\\sqrt{${k}}`), line(LABELS.result, `\\sqrt{${s * s * k}}=${s * s}\\sqrt{${k}}`)],
        wrong: 1, error: 'outside-square', fix: `\\sqrt{${s}^{2}\\cdot ${k}}=${s}\\sqrt{${k}}`, options: [], meta: { s, k }
    }
}

function rootSum(random: Random): DetectiveCase | null {
    const [x, y] = pick(random, [[3, 4], [5, 12], [6, 8], [8, 15]])
    return {
        problem: say(`Kalkulatu ${math(`\\sqrt{${x}^{2}+${y}^{2}}`)}.`, `Calcula ${math(`\\sqrt{${x}^{2}+${y}^{2}}`)}.`, `احسب ${math(`\\sqrt{${x}^{2}+${y}^{2}}`)}.`, `Calculate ${math(`\\sqrt{${x}^{2}+${y}^{2}}`)}.`),
        lines: [line(LABELS.start, `\\sqrt{${x}^{2}+${y}^{2}}=${x}+${y}`), line(LABELS.step, `${x}+${y}=${x + y}`), line(LABELS.result, `\\sqrt{${x}^{2}+${y}^{2}}=${x + y}`)],
        wrong: 0, error: 'root-sum', fix: `\\sqrt{${x * x}+${y * y}}=\\sqrt{${x * x + y * y}}=${Math.round(Math.sqrt(x * x + y * y))}`, options: [], meta: { x, y }
    }
}

function roundTrunc(random: Random): DetectiveCase | null {
    const first = randomInt(random, 1, 9)
    const d1 = randomInt(random, 1, 9)
    const d2 = randomInt(random, 0, 8)
    const d3 = randomInt(random, 5, 9)
    const text = `${first}{,}${d1}${d2}${d3}`
    const truncated = `${first}{,}${d1}${d2}`
    const right = (Number(`${first}${d1}${d2}`) + 1) / 100
    const roundedText = right.toFixed(2).replace('.', '{,}')
    const error = Math.round((Number(`${first}.${d1}${d2}${d3}`) - Number(`${first}.${d1}${d2}`)) * 1000) / 1000
    return {
        problem: say(`Biribildu ${math(text)} ehunenetara eta kalkulatu errore absolutua.`, `Redondea ${math(text)} a las centésimas y calcula el error absoluto.`, `قرّب ${math(text)} إلى الأجزاء من مئة واحسب الخطأ المطلق.`, `Round ${math(text)} to two decimal places and calculate the absolute error.`),
        lines: [line(LABELS.check, `${d3}\\ge 5`), line(LABELS.step, `${text}\\approx ${truncated}`), line(LABELS.result, `E_{a}=|${text}-${truncated}|=${String(error).replace('.', '{,}')}`)],
        wrong: 1, error: 'round-trunc', fix: `${text}\\approx ${roundedText}`, options: [], meta: { first, d1, d2, d3 }
    }
}

function intervalCount(random: Random): DetectiveCase | null {
    const a = randomInt(random, -4, 3)
    const b = a + randomInt(random, 4, 8)
    return {
        problem: say(`Zenbat zenbaki oso daude ${math(`[${a},\\,${b})`)} tartean?`, `¿Cuántos enteros hay en el intervalo ${math(`[${a},\\,${b})`)}?`, `كم عددًا صحيحًا في الفترة ${math(`[${a},\\,${b})`)}؟`, `How many integers are in the interval ${math(`[${a},\\,${b})`)}?`),
        lines: [line(LABELS.start, `[${a},\\,${b})\\to ${a}\\le x<${b}`), line(LABELS.step, `${a},\\,${a + 1},\\ldots,\\,${b}`), line(LABELS.result, `${b}-${paren(a)}+1=${b - a + 1}`)],
        wrong: 1, error: 'interval-count', fix: `${a},\\,${a + 1},\\ldots,\\,${b - 1}\\to ${b}-${paren(a)}=${b - a}`, options: [], meta: { a, b }
    }
}

function relDenominator(random: Random): DetectiveCase | null {
    const exact = pick(random, [40, 50, 60, 80, 100, 120, 150, 200, 250])
    // The approximation is within a few percent of the exact value
    const error = randomInt(random, 1, Math.min(4, exact / 20))
    const approx = random() < 0.5 ? exact - error : exact + error
    const simplified = (numerator: number, denominator: number) => {
        const divisor = gcd(numerator, denominator)
        return numerator / divisor === 1 || denominator / divisor !== 1 ? `\\frac{${numerator / divisor}}{${denominator / divisor}}` : String(numerator / divisor)
    }
    return {
        problem: say(`Zenbaki zehatza ${math(String(exact))} da eta hurbilketa ${math(String(approx))}. Zenbat da errore erlatiboa?`, `El valor exacto es ${math(String(exact))} y la aproximación ${math(String(approx))}. ¿Cuánto es el error relativo?`, `القيمة الصحيحة ${math(String(exact))} والتقريب ${math(String(approx))}. كم الخطأ النسبي؟`, `The exact value is ${math(String(exact))} and the approximation is ${math(String(approx))}. What is the relative error?`),
        lines: [line(LABELS.step, `E_{a}=|${exact}-${approx}|=${error}`), line(LABELS.rule, `E_{r}=\\frac{${error}}{${approx}}`), line(LABELS.result, `E_{r}=\\frac{${error}}{${approx}}=${simplified(error, approx)}`)],
        wrong: 1, error: 'rel-denominator', fix: `E_{r}=\\frac{${error}}{${exact}}=${simplified(error, exact)}`, options: [], meta: { exact, approx }
    }
}

function bounds(random: Random): DetectiveCase | null {
    const n = randomInt(random, 3, 9)
    const radicand = randomInt(random, n * n + 1, (n + 1) * (n + 1) - 1)
    return {
        problem: say(`Zein bi zenbaki osoren artean dago ${math(`\\sqrt{${radicand}}`)}?`, `¿Entre qué dos enteros está ${math(`\\sqrt{${radicand}}`)}?`, `بين أي عددين صحيحين يقع ${math(`\\sqrt{${radicand}}`)}؟`, `Between which two integers is ${math(`\\sqrt{${radicand}}`)}?`),
        lines: [line(LABELS.start, `${n}^{2}=${n * n}`), line(LABELS.step, `${n + 1}^{2}=${(n + 1) ** 2}`), line(LABELS.result, `${n * n}<${radicand}<${(n + 1) ** 2}\\Rightarrow ${n + 1}<\\sqrt{${radicand}}<${n + 2}`)],
        wrong: 2, error: 'bounds', fix: `${n}<\\sqrt{${radicand}}<${n + 1}`, options: [], meta: { n, radicand }
    }
}

const builders: Record<DetectiveError, Builder> = {
    'sign-base': signBase,
    'negative-result': negativeResult,
    'add-bases': addBases,
    'zero-power': zeroPower,
    'multiply-exponents': multiplyExponents,
    'power-of-power': powerOfPower,
    'sci-sign': sciSign,
    'no-adjust': noAdjust,
    'add-radicands': addRadicands,
    'outside-square': outsideSquare,
    'root-sum': rootSum,
    'round-trunc': roundTrunc,
    'interval-count': intervalCount,
    'rel-denominator': relDenominator,
    bounds
}

export function createDetectiveCase(random: Random, levelIndex: number, error: DetectiveError): DetectiveCase {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    for (let attempt = 0; attempt < 500; attempt += 1) {
        const made = builders[error](random)
        if (!made) continue
        const others = shuffle(random, pool.filter((item) => item !== error && item !== SAME_MISTAKE[error])).slice(0, 2)
        return { ...made, options: shuffle(random, [error, ...others]) }
    }
    throw new Error(`No detective case for ${error}`)
}

/** Six cases: every mistake of the level once, and the rest repeated with other numbers */
export function createDetectiveCases(random: Random, levelIndex: number): DetectiveCase[] {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    const order = shuffle(random, pool)
    const errors = Array.from({ length: DETECTIVE_CASES }, (_, index) => order[index % order.length])
    return shuffle(random, errors).map((error) => createDetectiveCase(random, levelIndex, error))
}

export function detectiveStars(score: number): Stars {
    if (score >= 11) return 3
    if (score >= 9) return 2
    if (score >= 6) return 1
    return 0
}

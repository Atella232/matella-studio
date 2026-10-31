import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Progresioen detektibea (3. DBH): a worked solution of three lines where
   exactly one line has a mistake, and the lines after it carry the mistake
   on. The learner taps the wrong line and says which mistake it is, among
   three. The mistakes are the typical ones of this unit: n jumps instead
   of n − 1, the difference the wrong way round, terms counted instead of
   jumps, Gauss without halving, (a₁·r) raised to the power, rⁿ instead of
   rⁿ⁻¹, adding the ratio, forgetting the root, Gauss on a geometric
   progression, an infinite sum with r ≥ 1, rⁿ⁻¹ in the sum and r − 1 in
   the infinite sum. Level 1: arithmetic; level 2: geometric; level 3: sums.
   Every case carries `meta`, the numbers the tests recompute it from.
   ========================================================================== */

export type DetectiveError =
    | 'n-jumps'
    | 'sign-d'
    | 'count-terms'
    | 'gauss-half'
    | 'power-first'
    | 'exponent-n'
    | 'add-ratio'
    | 'no-root'
    | 'gauss-geometric'
    | 'diverge'
    | 'sum-exponent'
    | 'one-minus'

export interface DetectiveLine {
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
    options: DetectiveError[]
    /** The right final value and the wrong one the solution reached */
    right: number
    reached: number
    meta: Record<string, number>
}

export const detectiveLevels: DetectiveError[][] = [
    ['n-jumps', 'sign-d', 'count-terms', 'gauss-half'],
    ['power-first', 'exponent-n', 'add-ratio', 'no-root'],
    ['gauss-geometric', 'diverge', 'sum-exponent', 'one-minus']
]

export const DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const math = (latex: string) => `$${latex}$`
const line = (label: LocalizedText, latex: string): DetectiveLine => ({ label, latex })

const LABELS = {
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const detectiveErrorNames: Record<DetectiveError, LocalizedText> = {
    'n-jumps': say('n jauzi zenbatu ditu, n − 1 beharrean', 'Contó n saltos en vez de n − 1', 'عدّ n قفزة بدل n − 1', 'Counted n jumps instead of n − 1'),
    'sign-d': say('Diferentzia alderantziz kalkulatu du', 'Calculó la diferencia al revés', 'حسب الفرق بالعكس', 'Worked out the difference the wrong way round'),
    'count-terms': say('Gaiak zenbatu ditu, jauziak beharrean', 'Contó términos en vez de saltos', 'عدّ الحدود بدل القفزات', 'Counted terms instead of jumps'),
    'gauss-half': say('Ez du 2 zenbakiaz zatitu', 'No dividió entre 2', 'لم يقسم على 2', 'Did not divide by 2'),
    'power-first': say('a₁ · r osoa berretu du', 'Elevó a la potencia todo a₁ · r', 'رفع a₁ · r كله إلى القوة', 'Raised the whole of a₁ · r to the power'),
    'exponent-n': say('rⁿ erabili du, rⁿ⁻¹ beharrean', 'Usó rⁿ en lugar de rⁿ⁻¹', 'استعمل rⁿ بدل rⁿ⁻¹', 'Used rⁿ instead of rⁿ⁻¹'),
    'add-ratio': say('Arrazoia batu du, biderkatu beharrean', 'Sumó la razón en vez de multiplicar', 'جمع الأساس بدل الضرب', 'Added the ratio instead of multiplying'),
    'no-root': say('Ez du erroa atera', 'No sacó la raíz', 'لم يستخرج الجذر', 'Did not take the root'),
    'gauss-geometric': say('Gaussen formula erabili du progresio geometriko batean', 'Usó la fórmula de Gauss en una geométrica', 'استعمل صيغة غاوس في متتالية هندسية', 'Used Gauss\'s formula on a geometric progression'),
    diverge: say('Batura infinitua r ≥ 1 denean kalkulatu du', 'Calculó la suma infinita con r ≥ 1', 'حسب المجموع اللانهائي مع r ≥ 1', 'Worked out the infinite sum with r ≥ 1'),
    'sum-exponent': say('Baturan rⁿ⁻¹ jarri du, rⁿ beharrean', 'En la suma puso rⁿ⁻¹ en vez de rⁿ', 'وضع في المجموع rⁿ⁻¹ بدل rⁿ', 'Put rⁿ⁻¹ in the sum instead of rⁿ'),
    'one-minus': say('r − 1 zatitu du, 1 − r beharrean', 'Dividió entre r − 1 en vez de 1 − r', 'قسم على r − 1 بدل 1 − r', 'Divided by r − 1 instead of 1 − r')
}

export const detectiveErrorTips: Record<DetectiveError, LocalizedText> = {
    'n-jumps': say('Lehen gaitik $n$. gaira $n-1$ jauzi daude: $a_{n}=a_{1}+(n-1)\\cdot d$.', 'Del primer término al $n$-ésimo hay $n-1$ saltos: $a_{n}=a_{1}+(n-1)\\cdot d$.', 'من الحد الأول إلى الحد $n$ هناك $n-1$ قفزة: $a_{n}=a_{1}+(n-1)\\cdot d$.', 'From the first term to the $n$-th there are $n-1$ jumps: $a_{n}=a_{1}+(n-1)\\cdot d$.'),
    'sign-d': say('Diferentzia hurrengoa ken aurrekoa da: beherakorra bada, negatiboa.', 'La diferencia es el siguiente menos el anterior: si decrece, es negativa.', 'الفرق هو التالي ناقص السابق: إذا تناقصت فهو سالب.', 'The difference is the next term minus the previous one: if it decreases, it is negative.'),
    'count-terms': say('$a_{k}$ gaitik $a_{m}$ gaira $m-k$ jauzi daude: $d=\\frac{a_{m}-a_{k}}{m-k}$.', 'De $a_{k}$ a $a_{m}$ hay $m-k$ saltos: $d=\\frac{a_{m}-a_{k}}{m-k}$.', 'من $a_{k}$ إلى $a_{m}$ هناك $m-k$ قفزة: $d=\\frac{a_{m}-a_{k}}{m-k}$.', 'From $a_{k}$ to $a_{m}$ there are $m-k$ jumps: $d=\\frac{a_{m}-a_{k}}{m-k}$.'),
    'gauss-half': say('$(a_{1}+a_{n})\\cdot n$ batura bikoitza da: zatitu 2 zenbakiaz.', '$(a_{1}+a_{n})\\cdot n$ es el doble de la suma: divide entre 2.', '$(a_{1}+a_{n})\\cdot n$ ضعف المجموع: اقسم على 2.', '$(a_{1}+a_{n})\\cdot n$ is twice the sum: divide by 2.'),
    'power-first': say('Lehenik berretura, gero biderketa: $a_{1}\\cdot r^{n-1}$, ez $(a_{1}\\cdot r)^{n-1}$.', 'Primero la potencia, después el producto: $a_{1}\\cdot r^{n-1}$, no $(a_{1}\\cdot r)^{n-1}$.', 'القوة أولًا ثم الضرب: $a_{1}\\cdot r^{n-1}$ لا $(a_{1}\\cdot r)^{n-1}$.', 'First the power, then the product: $a_{1}\\cdot r^{n-1}$, not $(a_{1}\\cdot r)^{n-1}$.'),
    'exponent-n': say('$a_{1}$ gaitik $a_{n}$ gaira $n-1$ aldiz biderkatzen da: $a_{n}=a_{1}\\cdot r^{n-1}$.', 'De $a_{1}$ a $a_{n}$ se multiplica $n-1$ veces: $a_{n}=a_{1}\\cdot r^{n-1}$.', 'من $a_{1}$ إلى $a_{n}$ نضرب $n-1$ مرة: $a_{n}=a_{1}\\cdot r^{n-1}$.', 'From $a_{1}$ to $a_{n}$ you multiply $n-1$ times: $a_{n}=a_{1}\\cdot r^{n-1}$.'),
    'add-ratio': say('Geometrikoan arrazoia zatidura da: $r=\\frac{a_{2}}{a_{1}}$, eta biderkatu egiten da.', 'En la geométrica la razón es un cociente: $r=\\frac{a_{2}}{a_{1}}$, y se multiplica.', 'في الهندسية الأساس حاصل قسمة: $r=\\frac{a_{2}}{a_{1}}$ ونضرب به.', 'In a geometric progression the ratio is a quotient: $r=\\frac{a_{2}}{a_{1}}$, and you multiply by it.'),
    'no-root': say('Bi gai zatitzean $r^{m-k}$ lortzen da: atera erroa $r$ lortzeko.', 'Al dividir dos términos sale $r^{m-k}$: saca la raíz para obtener $r$.', 'عند قسمة حدّين نحصل على $r^{m-k}$: خذ الجذر للحصول على $r$.', 'Dividing two terms gives $r^{m-k}$: take the root to get $r$.'),
    'gauss-geometric': say('Gaussen formula aritmetikoentzat da. Geometrikoan: $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.', 'La fórmula de Gauss es para las aritméticas. En la geométrica: $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.', 'صيغة غاوس للحسابية. وفي الهندسية: $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.', 'Gauss\'s formula is for arithmetic progressions. For a geometric one: $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.'),
    diverge: say('Batura infinitua $|r|<1$ denean bakarrik dago. Bestela gaiak ez dira txikitzen.', 'La suma infinita solo existe si $|r|<1$. Si no, los términos no se hacen pequeños.', 'المجموع اللانهائي موجود فقط إذا $|r|<1$. وإلا فالحدود لا تصغر.', 'The infinite sum only exists if $|r|<1$. Otherwise the terms do not get small.'),
    'sum-exponent': say('$n$ gaien baturan berretzailea $n$ da: $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.', 'En la suma de $n$ términos el exponente es $n$: $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.', 'في مجموع $n$ حدًا يكون الأس $n$: $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.', 'In the sum of $n$ terms the exponent is $n$: $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.'),
    'one-minus': say('Batura infinitua $S=\\frac{a_{1}}{1-r}$ da: gai positiboekin, positiboa.', 'La suma infinita es $S=\\frac{a_{1}}{1-r}$: con términos positivos, es positiva.', 'المجموع اللانهائي $S=\\frac{a_{1}}{1-r}$: مع حدود موجبة يكون موجبًا.', 'The infinite sum is $S=\\frac{a_{1}}{1-r}$: with positive terms, it is positive.')
}

type Builder = (random: Random) => Omit<DetectiveCase, 'options'> | null

const calcA = (a1: number, d: number, n: number) => say(`$a_{1}=${a1}$ eta $d=${d}$. Kalkulatu ${math(`a_{${n}}`)}.`, `$a_{1}=${a1}$ y $d=${d}$. Calcula ${math(`a_{${n}}`)}.`, `$a_{1}=${a1}$ و$d=${d}$. احسب ${math(`a_{${n}}`)}.`, `$a_{1}=${a1}$ and $d=${d}$. Work out ${math(`a_{${n}}`)}.`)

function nJumps(random: Random) {
    const a1 = randomInt(random, 2, 9)
    const d = randomInt(random, 2, 6)
    const n = randomInt(random, 8, 15)
    const right = a1 + (n - 1) * d
    const reached = a1 + n * d
    return {
        problem: calcA(a1, d, n),
        lines: [line(LABELS.rule, `a_{${n}}=a_{1}+(${n}-1)\\cdot d`), line(LABELS.step, `a_{${n}}=${a1}+${n}\\cdot ${d}`), line(LABELS.result, `a_{${n}}=${reached}`)],
        wrong: 1, error: 'n-jumps' as const, fix: `a_{${n}}=${a1}+${n - 1}\\cdot ${d}=${right}`, right, reached, meta: { a1, d, n }
    }
}

function signD(random: Random) {
    const a1 = randomInt(random, 30, 60)
    const step = randomInt(random, 2, 6)
    const n = randomInt(random, 6, 10)
    const right = a1 - (n - 1) * step
    const reached = a1 + (n - 1) * step
    const list = [0, 1, 2].map((k) => a1 - k * step).join(',\\,')
    return {
        problem: say(`${math(`${list},\\ldots`)} Kalkulatu ${math(`a_{${n}}`)}.`, `${math(`${list},\\ldots`)} Calcula ${math(`a_{${n}}`)}.`, `${math(`${list},\\ldots`)} احسب ${math(`a_{${n}}`)}.`, `${math(`${list},\\ldots`)} Work out ${math(`a_{${n}}`)}.`),
        lines: [line(LABELS.step, `d=${a1}-${a1 - step}=${step}`), line(LABELS.rule, `a_{${n}}=${a1}+${n - 1}\\cdot ${step}`), line(LABELS.result, `a_{${n}}=${reached}`)],
        wrong: 0, error: 'sign-d' as const, fix: `d=${a1 - step}-${a1}=${-step}\\ \\to\\ a_{${n}}=${right}`, right, reached, meta: { a1, step, n }
    }
}

function countTerms(random: Random) {
    const k = randomInt(random, 2, 4)
    const gap = randomInt(random, 3, 6)
    const m = k + gap
    const d = randomInt(random, 2, 5)
    const ak = randomInt(random, 5, 20)
    const am = ak + gap * d
    const wrongD = (am - ak) / (gap + 1)
    if (!Number.isInteger(wrongD)) return null
    return {
        problem: say(`${math(`a_{${k}}=${ak},\\ a_{${m}}=${am}`)}. Kalkulatu ${math('d')}.`, `${math(`a_{${k}}=${ak},\\ a_{${m}}=${am}`)}. Calcula ${math('d')}.`, `${math(`a_{${k}}=${ak},\\ a_{${m}}=${am}`)}. احسب ${math('d')}.`, `${math(`a_{${k}}=${ak},\\ a_{${m}}=${am}`)}. Work out ${math('d')}.`),
        lines: [line(LABELS.step, `${am}-${ak}=${am - ak}`), line(LABELS.rule, `d=\\frac{${am - ak}}{${gap + 1}}`), line(LABELS.result, `d=${wrongD}`)],
        wrong: 1, error: 'count-terms' as const, fix: `d=\\frac{${am - ak}}{${m}-${k}}=${d}`, right: d, reached: wrongD, meta: { k, m, ak, am }
    }
}

function gaussHalf(random: Random) {
    const a1 = randomInt(random, 1, 8)
    const d = randomInt(random, 2, 5)
    const n = randomInt(random, 6, 14)
    const an = a1 + (n - 1) * d
    const right = ((a1 + an) * n) / 2
    const reached = (a1 + an) * n
    return {
        problem: say(`$a_{1}=${a1}$, $d=${d}$. Kalkulatu ${math(`S_{${n}}`)}.`, `$a_{1}=${a1}$, $d=${d}$. Calcula ${math(`S_{${n}}`)}.`, `$a_{1}=${a1}$ و$d=${d}$. احسب ${math(`S_{${n}}`)}.`, `$a_{1}=${a1}$, $d=${d}$. Work out ${math(`S_{${n}}`)}.`),
        lines: [line(LABELS.step, `a_{${n}}=${a1}+${n - 1}\\cdot ${d}=${an}`), line(LABELS.rule, `S_{${n}}=(${a1}+${an})\\cdot ${n}`), line(LABELS.result, `S_{${n}}=${reached}`)],
        wrong: 1, error: 'gauss-half' as const, fix: `S_{${n}}=\\frac{(${a1}+${an})\\cdot ${n}}{2}=${right}`, right, reached, meta: { a1, d, n }
    }
}

const calcG = (a1: number, r: number, n: number) => say(`$a_{1}=${a1}$ eta $r=${r}$. Kalkulatu ${math(`a_{${n}}`)}.`, `$a_{1}=${a1}$ y $r=${r}$. Calcula ${math(`a_{${n}}`)}.`, `$a_{1}=${a1}$ و$r=${r}$. احسب ${math(`a_{${n}}`)}.`, `$a_{1}=${a1}$ and $r=${r}$. Work out ${math(`a_{${n}}`)}.`)

function powerFirst(random: Random) {
    const a1 = randomInt(random, 2, 5)
    const r = pick(random, [2, 3])
    const n = randomInt(random, 3, 5)
    const right = a1 * r ** (n - 1)
    const reached = (a1 * r) ** (n - 1)
    return {
        problem: calcG(a1, r, n),
        lines: [line(LABELS.rule, `a_{${n}}=${a1}\\cdot ${r}^{${n - 1}}`), line(LABELS.step, `a_{${n}}=${a1 * r}^{${n - 1}}`), line(LABELS.result, `a_{${n}}=${reached}`)],
        wrong: 1, error: 'power-first' as const, fix: `a_{${n}}=${a1}\\cdot ${r ** (n - 1)}=${right}`, right, reached, meta: { a1, r, n }
    }
}

function exponentN(random: Random) {
    const a1 = randomInt(random, 2, 6)
    const r = pick(random, [2, 3])
    const n = randomInt(random, 3, 6)
    const right = a1 * r ** (n - 1)
    const reached = a1 * r ** n
    return {
        problem: calcG(a1, r, n),
        lines: [line(LABELS.rule, `a_{${n}}=${a1}\\cdot ${r}^{${n}}`), line(LABELS.step, `${r}^{${n}}=${r ** n}`), line(LABELS.result, `a_{${n}}=${reached}`)],
        wrong: 0, error: 'exponent-n' as const, fix: `a_{${n}}=${a1}\\cdot ${r}^{${n - 1}}=${right}`, right, reached, meta: { a1, r, n }
    }
}

function addRatio(random: Random) {
    const a1 = randomInt(random, 2, 5)
    const r = pick(random, [2, 3])
    const n = randomInt(random, 4, 6)
    const right = a1 * r ** (n - 1)
    const fakeD = a1 * r - a1
    const reached = a1 + (n - 1) * fakeD
    const list = [0, 1, 2].map((k) => a1 * r ** k).join(',\\,')
    return {
        problem: say(`${math(`${list},\\ldots`)} Kalkulatu ${math(`a_{${n}}`)}.`, `${math(`${list},\\ldots`)} Calcula ${math(`a_{${n}}`)}.`, `${math(`${list},\\ldots`)} احسب ${math(`a_{${n}}`)}.`, `${math(`${list},\\ldots`)} Work out ${math(`a_{${n}}`)}.`),
        lines: [line(LABELS.step, `${a1 * r}-${a1}=${fakeD}`), line(LABELS.rule, `a_{${n}}=${a1}+${n - 1}\\cdot ${fakeD}`), line(LABELS.result, `a_{${n}}=${reached}`)],
        wrong: 0, error: 'add-ratio' as const, fix: `r=\\frac{${a1 * r}}{${a1}}=${r}\\ \\to\\ a_{${n}}=${right}`, right, reached, meta: { a1, r, n }
    }
}

function noRoot(random: Random) {
    const r = pick(random, [2, 3])
    const a2 = r * randomInt(random, 1, 4)
    const jumps = pick(random, [2, 3])
    const am = a2 * r ** jumps
    const m = 2 + jumps
    const right = am * r
    const reached = am * r ** jumps
    return {
        problem: say(`${math(`a_{2}=${a2},\\ a_{${m}}=${am}`)}. Kalkulatu ${math(`a_{${m + 1}}`)}.`, `${math(`a_{2}=${a2},\\ a_{${m}}=${am}`)}. Calcula ${math(`a_{${m + 1}}`)}.`, `${math(`a_{2}=${a2},\\ a_{${m}}=${am}`)}. احسب ${math(`a_{${m + 1}}`)}.`, `${math(`a_{2}=${a2},\\ a_{${m}}=${am}`)}. Work out ${math(`a_{${m + 1}}`)}.`),
        lines: [line(LABELS.step, `\\frac{${am}}{${a2}}=${r ** jumps}`), line(LABELS.rule, `r=${r ** jumps}`), line(LABELS.result, `a_{${m + 1}}=${am}\\cdot ${r ** jumps}=${reached}`)],
        wrong: 1, error: 'no-root' as const, fix: `r^{${jumps}}=${r ** jumps}\\ \\to\\ r=${r}\\ \\to\\ a_{${m + 1}}=${right}`, right, reached, meta: { r, a2, jumps }
    }
}

function gaussGeometric(random: Random) {
    const a1 = randomInt(random, 1, 4)
    const r = pick(random, [2, 3])
    const n = randomInt(random, 4, 6)
    const an = a1 * r ** (n - 1)
    const right = (a1 * (r ** n - 1)) / (r - 1)
    const reached = ((a1 + an) * n) / 2
    if (!Number.isInteger(reached) || reached === right) return null
    return {
        problem: say(`$a_{1}=${a1}$, $r=${r}$. Kalkulatu ${math(`S_{${n}}`)}.`, `$a_{1}=${a1}$, $r=${r}$. Calcula ${math(`S_{${n}}`)}.`, `$a_{1}=${a1}$ و$r=${r}$. احسب ${math(`S_{${n}}`)}.`, `$a_{1}=${a1}$, $r=${r}$. Work out ${math(`S_{${n}}`)}.`),
        lines: [line(LABELS.step, `a_{${n}}=${a1}\\cdot ${r}^{${n - 1}}=${an}`), line(LABELS.rule, `S_{${n}}=\\frac{(${a1}+${an})\\cdot ${n}}{2}`), line(LABELS.result, `S_{${n}}=${reached}`)],
        wrong: 1, error: 'gauss-geometric' as const, fix: `S_{${n}}=\\frac{${a1}\\cdot(${r}^{${n}}-1)}{${r}-1}=${right}`, right, reached, meta: { a1, r, n }
    }
}

function diverge(random: Random) {
    const a1 = randomInt(random, 2, 9)
    const r = pick(random, [2, 3])
    const reached = a1 / (1 - r)
    if (!Number.isInteger(reached)) return null
    const list = [0, 1, 2].map((k) => a1 * r ** k).join('+')
    return {
        problem: say(`Kalkulatu ${math(`${list}+\\cdots`)}`, `Calcula ${math(`${list}+\\cdots`)}`, `احسب ${math(`${list}+\\cdots`)}`, `Work out ${math(`${list}+\\cdots`)}`),
        lines: [line(LABELS.step, `r=\\frac{${a1 * r}}{${a1}}=${r}`), line(LABELS.rule, `S=\\frac{${a1}}{1-${r}}`), line(LABELS.result, `S=${reached}`)],
        wrong: 1, error: 'diverge' as const, fix: `r=${r}\\geq 1\\ \\to\\ S=\\infty`, right: Infinity, reached, meta: { a1, r }
    }
}

function sumExponent(random: Random) {
    const a1 = randomInt(random, 1, 5)
    const r = pick(random, [2, 3])
    const n = randomInt(random, 4, 6)
    const right = (a1 * (r ** n - 1)) / (r - 1)
    const reached = (a1 * (r ** (n - 1) - 1)) / (r - 1)
    return {
        problem: say(`$a_{1}=${a1}$, $r=${r}$. Kalkulatu ${math(`S_{${n}}`)}.`, `$a_{1}=${a1}$, $r=${r}$. Calcula ${math(`S_{${n}}`)}.`, `$a_{1}=${a1}$ و$r=${r}$. احسب ${math(`S_{${n}}`)}.`, `$a_{1}=${a1}$, $r=${r}$. Work out ${math(`S_{${n}}`)}.`),
        lines: [line(LABELS.rule, `S_{${n}}=\\frac{${a1}\\cdot(${r}^{${n - 1}}-1)}{${r}-1}`), line(LABELS.step, `${r}^{${n - 1}}-1=${r ** (n - 1) - 1}`), line(LABELS.result, `S_{${n}}=${reached}`)],
        wrong: 0, error: 'sum-exponent' as const, fix: `S_{${n}}=\\frac{${a1}\\cdot(${r}^{${n}}-1)}{${r}-1}=${right}`, right, reached, meta: { a1, r, n }
    }
}

function oneMinus(random: Random) {
    const [p, q] = pick(random, [[1, 2], [1, 3], [1, 4], [2, 3]] as const)
    const a1 = (q - p) * randomInt(random, 2, 6)
    const right = (a1 * q) / (q - p)
    const reached = -right
    return {
        problem: say(`$a_{1}=${a1}$ eta $r=\\frac{${p}}{${q}}$. Kalkulatu batura infinitua.`, `$a_{1}=${a1}$ y $r=\\frac{${p}}{${q}}$. Calcula la suma infinita.`, `$a_{1}=${a1}$ و$r=\\frac{${p}}{${q}}$. احسب المجموع اللانهائي.`, `$a_{1}=${a1}$ and $r=\\frac{${p}}{${q}}$. Work out the infinite sum.`),
        lines: [line(LABELS.step, `|r|=\\frac{${p}}{${q}}<1`), line(LABELS.rule, `S=\\frac{${a1}}{\\frac{${p}}{${q}}-1}`), line(LABELS.result, `S=${reached}`)],
        wrong: 1, error: 'one-minus' as const, fix: `S=\\frac{${a1}}{1-\\frac{${p}}{${q}}}=${right}`, right, reached, meta: { a1, p, q }
    }
}

const builders: Record<DetectiveError, Builder> = {
    'n-jumps': nJumps,
    'sign-d': signD,
    'count-terms': countTerms,
    'gauss-half': gaussHalf,
    'power-first': powerFirst,
    'exponent-n': exponentN,
    'add-ratio': addRatio,
    'no-root': noRoot,
    'gauss-geometric': gaussGeometric,
    diverge,
    'sum-exponent': sumExponent,
    'one-minus': oneMinus
}

export function createDetectiveCase(random: Random, levelIndex: number, error: DetectiveError): DetectiveCase {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    for (let attempt = 0; attempt < 500; attempt += 1) {
        const made = builders[error](random)
        if (!made) continue
        const others = shuffle(random, pool.filter((item) => item !== error)).slice(0, 2)
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

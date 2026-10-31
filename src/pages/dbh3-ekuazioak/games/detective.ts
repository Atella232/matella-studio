import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Ekuazioen detektibea (3. DBH): a worked solution of three lines where
   exactly one line has a mistake, and the lines after it carry it on. The
   learner taps the wrong line and says which mistake it is, among three.
   The mistakes are the typical ones of this unit. Level 1: first degree
   (a term moved without changing its sign, subtracting instead of
   dividing, the minus in front of a bracket, a denominator cleared on one
   term only); level 2: second degree (a root lost dividing by x, only the
   positive root, b instead of −b, the sign of c lost in Δ); level 3:
   systems and problems (substituting without brackets, multiplying one
   side only, a pair that satisfies one equation only, the years added to
   one person only). Every case carries the right number and the number
   the wrong line led to, so that the tests can check they differ.
   ========================================================================== */

export type DetectiveError =
    | 'transpose-sign'
    | 'divide-subtract'
    | 'minus-bracket'
    | 'lcm-not-all'
    | 'lose-root'
    | 'only-plus'
    | 'minus-b'
    | 'c-sign'
    | 'no-bracket'
    | 'multiply-one-side'
    | 'one-equation'
    | 'ages-one'

export interface DetectiveLine {
    label: LocalizedText
    latex: string
}

export interface DetectiveCase {
    problem: LocalizedText
    lines: DetectiveLine[]
    wrong: number
    error: DetectiveError
    fix: string
    options: DetectiveError[]
    /** The right number and the one the solution reached */
    right: number
    reached: number
}

export const detectiveLevels: DetectiveError[][] = [
    ['transpose-sign', 'divide-subtract', 'minus-bracket', 'lcm-not-all'],
    ['lose-root', 'only-plus', 'minus-b', 'c-sign'],
    ['no-bracket', 'multiply-one-side', 'one-equation', 'ages-one']
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
const solve = (latex: string) => say(`Ebatzi ${math(latex)}.`, `Resuelve ${math(latex)}.`, `حلّ ${math(latex)}.`, `Solve ${math(latex)}.`)

export const detectiveErrorNames: Record<DetectiveError, LocalizedText> = {
    'transpose-sign': say('Gai bat beste atalera eraman du zeinua aldatu gabe', 'Pasó un término al otro miembro sin cambiarle el signo', 'نقل حدًّا إلى الطرف الآخر دون تغيير إشارته', 'Moved a term to the other side without changing its sign'),
    'divide-subtract': say('Kendu egin du, zatitu beharrean', 'Restó en vez de dividir', 'طرح بدل أن يقسم', 'Subtracted instead of dividing'),
    'minus-bracket': say('Minusak parentesiko lehen gaiari bakarrik eragin dio', 'El menos solo afectó al primer término del paréntesis', 'لم يؤثر السالب إلا في الحد الأول من القوس', 'The minus only affected the first term in the brackets'),
    'lcm-not-all': say('Ez ditu gai guztiak m.k.t.-az biderkatu', 'No multiplicó todos los términos por el m.c.m.', 'لم يضرب كل الحدود في م.م.أ.', 'Did not multiply every term by the LCM'),
    'lose-root': say('$x$ ezezagunaz zatitu du eta $x=0$ galdu', 'Dividió entre $x$ y perdió $x=0$', 'قسم على $x$ فضاع $x=0$', 'Divided by $x$ and lost $x=0$'),
    'only-plus': say('Erro positiboa bakarrik hartu du', 'Solo tomó la raíz positiva', 'لم يأخذ إلا الجذر الموجب', 'Took only the positive root'),
    'minus-b': say('Formulan $b$ jarri du, $-b$ beharrean', 'Puso $b$ en la fórmula en vez de $-b$', 'وضع $b$ في الصيغة بدل $-b$', 'Used $b$ in the formula instead of $-b$'),
    'c-sign': say('$c$ zenbakiaren zeinua galdu du $\\Delta$ kalkulatzean', 'Perdió el signo de $c$ al calcular $\\Delta$', 'أضاع إشارة $c$ عند حساب $\\Delta$', 'Lost the sign of $c$ when working out $\\Delta$'),
    'no-bracket': say('Ordezkatzean ez du parentesirik jarri', 'Sustituyó sin poner paréntesis', 'عوّض دون وضع قوسين', 'Substituted without brackets'),
    'multiply-one-side': say('Ekuazioaren atal bat bakarrik biderkatu du', 'Multiplicó solo un miembro de la ecuación', 'ضرب طرفًا واحدًا من المعادلة فقط', 'Multiplied only one side of the equation'),
    'one-equation': say('Ekuazio bat bakarrik betetzen duen bikotea hartu du', 'Tomó una pareja que solo cumple una ecuación', 'أخذ زوجًا يحقق معادلة واحدة فقط', 'Took a pair that satisfies only one equation'),
    'ages-one': say('Urteak pertsona bati bakarrik batu dizkio', 'Sumó los años a una sola persona', 'أضاف السنوات إلى شخص واحد فقط', 'Added the years to one person only')
}

export const detectiveErrorTips: Record<DetectiveError, LocalizedText> = {
    'transpose-sign': say('Atal batean batzen dena bestean kentzen da: $x+3=7\\ \\to\\ x=7-3$.', 'Lo que suma en un miembro pasa restando: $x+3=7\\ \\to\\ x=7-3$.', 'ما يُجمع في طرف ينتقل مطروحًا: $x+3=7\\ \\to\\ x=7-3$.', 'What is added on one side is subtracted on the other: $x+3=7\\ \\to\\ x=7-3$.'),
    'divide-subtract': say('$3x$ biderkadura bat da: zatitu, $3x=12\\ \\to\\ x=4$.', '$3x$ es un producto: divide, $3x=12\\ \\to\\ x=4$.', '$3x$ جداء: اقسم، $3x=12\\ \\to\\ x=4$.', '$3x$ is a product: divide, $3x=12\\ \\to\\ x=4$.'),
    'minus-bracket': say('$-(x-4)=-x+4$: zeinu guztiak aldatzen dira.', '$-(x-4)=-x+4$: cambian todos los signos.', '$-(x-4)=-x+4$: تتغيّر كل الإشارات.', '$-(x-4)=-x+4$: every sign changes.'),
    'lcm-not-all': say('m.k.t.-az biderkatzean, izendatzailerik gabeko gaiak ere biderkatzen dira.', 'Al multiplicar por el m.c.m. también se multiplican los términos sin denominador.', 'عند الضرب في م.م.أ. تُضرب أيضًا الحدود التي بلا مقام.', 'When you multiply by the LCM, the terms without a denominator are multiplied too.'),
    'lose-root': say('Atera $x$ faktore komun gisa: $x(x-k)=0$, bi ebazpen.', 'Saca $x$ factor común: $x(x-k)=0$, dos soluciones.', 'أخرج $x$ عاملًا مشتركًا: $x(x-k)=0$، حلّان.', 'Take $x$ out as a common factor: $x(x-k)=0$, two solutions.'),
    'only-plus': say('$x^{2}=25$ ekuazioak bi ebazpen ditu: $5$ eta $-5$.', '$x^{2}=25$ tiene dos soluciones: $5$ y $-5$.', 'لـ $x^{2}=25$ حلّان: $5$ و$-5$.', '$x^{2}=25$ has two solutions: $5$ and $-5$.'),
    'minus-b': say('Formulak $-b$ du: $b=-7$ bada, $-b=7$.', 'La fórmula lleva $-b$: si $b=-7$, $-b=7$.', 'في الصيغة $-b$: إذا $b=-7$ فإن $-b=7$.', 'The formula has $-b$: if $b=-7$, $-b=7$.'),
    'c-sign': say('$c$ negatiboa bada, $-4ac$ positiboa da.', 'Si $c$ es negativo, $-4ac$ es positivo.', 'إذا كان $c$ سالبًا فإن $-4ac$ موجب.', 'If $c$ is negative, $-4ac$ is positive.'),
    'no-bracket': say('Ordezkatutako adierazpen osoa biderkatzen da: $3(5-y)=15-3y$.', 'Se multiplica toda la expresión sustituida: $3(5-y)=15-3y$.', 'تُضرب العبارة المعوّضة كلها: $3(5-y)=15-3y$.', 'The whole substituted expression is multiplied: $3(5-y)=15-3y$.'),
    'multiply-one-side': say('Ekuazio bat biderkatzean, bi atalak biderkatzen dira.', 'Al multiplicar una ecuación, se multiplican los dos miembros.', 'عند ضرب معادلة يُضرب الطرفان.', 'When you multiply an equation, both sides are multiplied.'),
    'one-equation': say('Sistemaren ebazpenak BI ekuazioak bete behar ditu.', 'La solución del sistema tiene que cumplir LAS DOS ecuaciones.', 'يجب أن يحقق حل النظام المعادلتين.', 'The solution of the system must satisfy BOTH equations.'),
    'ages-one': say('Urteak bi pertsonei igarotzen zaizkie: $A+t$ eta $B+t$.', 'Los años pasan para las dos personas: $A+t$ y $B+t$.', 'تمرّ السنوات على الشخصين: $A+t$ و$B+t$.', 'The years pass for both people: $A+t$ and $B+t$.')
}

type Built = Omit<DetectiveCase, 'options'>
type Builder = (random: Random) => Built | null

function transposeSign(random: Random): Built {
    const k = pick(random, [2, 3])
    const c = randomInt(random, 1, 3)
    const a = c + k
    const r = randomInt(random, 1, 6)
    const b = k * randomInt(random, 1, 3)
    const d = k * r + b
    const reached = (d + b) / k
    return {
        problem: solve(`${a}x+${b}=${c === 1 ? '' : c}x+${d}`),
        lines: [line(LABELS.step, `${a}x-${c === 1 ? '' : c}x=${d}+${b}`), line(LABELS.step, `${k}x=${d + b}`), line(LABELS.result, `x=${reached}`)],
        wrong: 0, error: 'transpose-sign', fix: `${k}x=${d}-${b}\\ \\to\\ x=${r}`, right: r, reached
    }
}

function divideSubtract(random: Random): Built | null {
    const k = randomInt(random, 2, 5)
    const r = randomInt(random, 2, 7)
    const b = randomInt(random, 1, 9)
    const reached = k * r - k
    if (reached === r) return null
    return {
        problem: solve(`${k}x+${b}=${k * r + b}`),
        lines: [line(LABELS.step, `${k}x=${k * r}`), line(LABELS.step, `x=${k * r}-${k}`), line(LABELS.result, `x=${reached}`)],
        wrong: 1, error: 'divide-subtract', fix: `x=${k * r}\\div ${k}=${r}`, right: r, reached
    }
}

function minusBracket(random: Random): Built {
    const k = pick(random, [2, 3])
    const q = k * randomInt(random, 1, 3)
    const r = randomInt(random, 1, 6)
    const s = k * r + q
    const reached = (s + q) / k
    return {
        problem: solve(`${k + 1}x-(x-${q})=${s}`),
        lines: [line(LABELS.step, `${k + 1}x-x-${q}=${s}`), line(LABELS.step, `${k}x=${s + q}`), line(LABELS.result, `x=${reached}`)],
        wrong: 0, error: 'minus-bracket', fix: `${k + 1}x-x+${q}=${s}\\ \\to\\ x=${r}`, right: r, reached
    }
}

function lcmNotAll(random: Random): Built {
    const m = randomInt(random, 2, 5)
    const p = randomInt(random, 1, 6)
    const q = p + randomInt(random, 1, 5)
    const reached = m * q - p
    return {
        problem: solve(`\\frac{x}{${m}}+${p}=${q}`),
        lines: [line(LABELS.rule, `\\cdot ${m}`), line(LABELS.step, `x+${p}=${m * q}`), line(LABELS.result, `x=${reached}`)],
        wrong: 1, error: 'lcm-not-all', fix: `x+${m * p}=${m * q}\\ \\to\\ x=${m * (q - p)}`, right: m * (q - p), reached
    }
}

function loseRoot(random: Random): Built {
    const k = randomInt(random, 2, 9)
    return {
        problem: solve(`x^{2}=${k}x`),
        lines: [line(LABELS.step, `\\frac{x^{2}}{x}=\\frac{${k}x}{x}`), line(LABELS.step, `x=${k}`), line(LABELS.result, `x=${k}`)],
        wrong: 0, error: 'lose-root', fix: `x(x-${k})=0\\ \\to\\ x=0,\\ x=${k}`, right: 0, reached: k
    }
}

function onlyPlus(random: Random): Built {
    const n = randomInt(random, 2, 9)
    return {
        problem: solve(`x^{2}-${n * n}=0`),
        lines: [line(LABELS.step, `x^{2}=${n * n}`), line(LABELS.step, `x=\\sqrt{${n * n}}`), line(LABELS.result, `x=${n}`)],
        wrong: 1, error: 'only-plus', fix: `x=${n},\\ x=-${n}`, right: -n, reached: n
    }
}

function minusB(random: Random): Built | null {
    const p1 = randomInt(random, 1, 5)
    const p2 = randomInt(random, 2, 7)
    if (p2 <= p1) return null
    const s = p1 + p2
    return {
        problem: solve(`x^{2}-${s}x+${p1 * p2}=0`),
        lines: [line(LABELS.rule, `a=1,\\ b=-${s},\\ c=${p1 * p2}`), line(LABELS.step, `x=\\frac{-${s}\\pm ${p2 - p1}}{2}`), line(LABELS.result, `x=-${p1},\\ x=-${p2}`)],
        wrong: 1, error: 'minus-b', fix: `x=\\frac{${s}\\pm ${p2 - p1}}{2}\\ \\to\\ x=${p2},\\ x=${p1}`, right: p2, reached: -p2
    }
}

function cSign(random: Random): Built | null {
    const b = randomInt(random, 1, 4)
    const c = randomInt(random, 2, 9)
    if (b * b >= 4 * c) return null
    return {
        problem: say(`Zenbat ebazpen ditu ${math(`x^{2}+${b === 1 ? '' : b}x-${c}=0`)} ekuazioak?`, `¿Cuántas soluciones tiene ${math(`x^{2}+${b === 1 ? '' : b}x-${c}=0`)}?`, `كم حلًّا لـ ${math(`x^{2}+${b === 1 ? '' : b}x-${c}=0`)}؟`, `How many solutions does ${math(`x^{2}+${b === 1 ? '' : b}x-${c}=0`)} have?`),
        lines: [line(LABELS.rule, `\\Delta=b^{2}-4ac`), line(LABELS.step, `\\Delta=${b * b}-${4 * c}`), line(LABELS.result, `\\Delta=${b * b - 4 * c}<0`)],
        wrong: 1, error: 'c-sign', fix: `\\Delta=${b * b}+${4 * c}=${b * b + 4 * c}`, right: b * b + 4 * c, reached: b * b - 4 * c
    }
}

function noBracket(random: Random): Built {
    const m = pick(random, [3, 5])
    const y0 = randomInt(random, 1, 5)
    const x0 = y0 + randomInt(random, 0, 4)
    const s = x0 + y0
    const t = m * x0 - y0
    const reached = (y0 * (m + 1)) / 2
    return {
        problem: say(`Ebatzi ordezkapenez: ${math(`x+y=${s},\\ ${m}x-y=${t}`)}. Zenbat da ${math('y')}?`, `Resuelve por sustitución: ${math(`x+y=${s},\\ ${m}x-y=${t}`)}. ¿Cuánto vale ${math('y')}?`, `حلّ بالتعويض: ${math(`x+y=${s},\\ ${m}x-y=${t}`)}. كم يساوي ${math('y')}؟`, `Solve by substitution: ${math(`x+y=${s},\\ ${m}x-y=${t}`)}. What is ${math('y')}?`),
        lines: [line(LABELS.step, `x=${s}-y`), line(LABELS.step, `${m}\\cdot ${s}-y-y=${t}`), line(LABELS.result, `y=${reached}`)],
        wrong: 1, error: 'no-bracket', fix: `${m}(${s}-y)-y=${t}\\ \\to\\ y=${y0}`, right: y0, reached
    }
}

function multiplyOneSide(random: Random): Built | null {
    const k = pick(random, [3, 4])
    const x0 = randomInt(random, 1, 6)
    const y0 = randomInt(random, 1, 6)
    const c1 = (k - 1) * x0 + k * y0
    const c2 = x0 + y0
    const reached = c2 - c1
    if (reached === x0) return null
    return {
        problem: say(`Ebatzi laburketaz: ${math(`${k - 1}x+${k}y=${c1},\\ x+y=${c2}`)}. Zenbat da ${math('x')}?`, `Resuelve por reducción: ${math(`${k - 1}x+${k}y=${c1},\\ x+y=${c2}`)}. ¿Cuánto vale ${math('x')}?`, `حلّ بالحذف: ${math(`${k - 1}x+${k}y=${c1},\\ x+y=${c2}`)}. كم يساوي ${math('x')}؟`, `Solve by elimination: ${math(`${k - 1}x+${k}y=${c1},\\ x+y=${c2}`)}. What is ${math('x')}?`),
        lines: [line(LABELS.step, `${k}x+${k}y=${c2}`), line(LABELS.step, `(${k}x+${k}y)-(${k - 1}x+${k}y)=${c2}-${c1}`), line(LABELS.result, `x=${reached}`)],
        wrong: 0, error: 'multiply-one-side', fix: `${k}x+${k}y=${k * c2}\\ \\to\\ x=${x0}`, right: x0, reached
    }
}

function oneEquation(random: Random): Built | null {
    const y0 = randomInt(random, 1, 5)
    const x0 = y0 + randomInt(random, 1, 5)
    const s = x0 + y0
    const d = x0 - y0
    if (s - 1 === x0) return null
    return {
        problem: say(`Ebatzi: ${math(`x+y=${s},\\ x-y=${d}`)}. Zenbat da ${math('x')}?`, `Resuelve: ${math(`x+y=${s},\\ x-y=${d}`)}. ¿Cuánto vale ${math('x')}?`, `حلّ: ${math(`x+y=${s},\\ x-y=${d}`)}. كم يساوي ${math('x')}؟`, `Solve: ${math(`x+y=${s},\\ x-y=${d}`)}. What is ${math('x')}?`),
        lines: [line(LABELS.step, `x=${s - 1},\\ y=1`), line(LABELS.step, `${s - 1}+1=${s}`), line(LABELS.result, `x=${s - 1}`)],
        wrong: 0, error: 'one-equation', fix: `2x=${s + d}\\ \\to\\ x=${x0}`, right: x0, reached: s - 1
    }
}

function agesOne(random: Random): Built {
    const son = randomInt(random, 4, 12)
    const u = randomInt(random, 2, 8)
    const mother = 2 * son + 2 * u
    return {
        problem: say(`Amak ${mother} urte ditu eta semeak ${son}. Zenbat urte barru izango du amak semearen bikoitza?`, `La madre tiene ${mother} años y el hijo ${son}. ¿Dentro de cuántos años tendrá la madre el doble que el hijo?`, `عمر الأم ${mother} سنة وعمر الابن ${son}. بعد كم سنة يصير عمر الأم ضعف عمر الابن؟`, `The mother is ${mother} and her son is ${son}. In how many years will the mother be twice the son's age?`),
        lines: [line(LABELS.step, `${mother}=2(${son}+t)`), line(LABELS.step, `${mother}=${2 * son}+2t`), line(LABELS.result, `t=${u}`)],
        wrong: 0, error: 'ages-one', fix: `${mother}+t=2(${son}+t)\\ \\to\\ t=${2 * u}`, right: 2 * u, reached: u
    }
}

const builders: Record<DetectiveError, Builder> = {
    'transpose-sign': transposeSign,
    'divide-subtract': divideSubtract,
    'minus-bracket': minusBracket,
    'lcm-not-all': lcmNotAll,
    'lose-root': loseRoot,
    'only-plus': onlyPlus,
    'minus-b': minusB,
    'c-sign': cSign,
    'no-bracket': noBracket,
    'multiply-one-side': multiplyOneSide,
    'one-equation': oneEquation,
    'ages-one': agesOne
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

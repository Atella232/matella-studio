import { checkAnswer, fraction, type AnswerCheck } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Mugimenduen lasterketa (3. DBH): five circuits, one per stage — vector
   components and lengths; translations; rotations about the origin;
   reflections and two mirrors; friezes, tilings and enlargements. Every
   answer is a whole number and every question carries `meta`, so that the
   tests can work it out again.
   ========================================================================== */

export const MOTIONS3_RACE_CIRCUITS = 5

export type Motions3RaceError = 'start-minus-end' | 'modulus-add' | 'swap-only' | 'wrong-axis' | 'mirrors-once' | 'frieze-jumps' | 'homothety-add' | 'sign' | 'calculation'

export type Motions3RaceQuestion = RaceQuestion<Motions3RaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const par = (value: number) => (value < 0 ? `(${value})` : String(value))

interface Candidate {
    value: number
    error: Motions3RaceError
}
const wrong = (value: number, error: Motions3RaceError): Candidate => ({ value, error })

function options(random: Random, right: number, candidates: Candidate[]): RaceOption<Motions3RaceError>[] | null {
    const used = new Set([right])
    const chosen: Candidate[] = []
    for (const candidate of [...candidates, wrong(-right, 'sign'), wrong(right + 1, 'calculation'), wrong(right - 2, 'calculation'), wrong(right * 2, 'calculation')]) {
        if (chosen.length === 3) break
        if (!Number.isInteger(candidate.value) || used.has(candidate.value)) continue
        used.add(candidate.value)
        chosen.push(candidate)
    }
    if (chosen.length < 3) return null
    return shuffle(random, [{ latex: String(right), correct: true, error: null }, ...chosen.map((item) => ({ latex: String(item.value), correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Motions3RaceError>[], answer: number, solution: LocalizedText, meta: Record<string, number>): Motions3RaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: fraction(answer), answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20], [7, 24, 25]]

/* ---------- Circuit 0: vectors ---------- */

function component(random: Random): Motions3RaceQuestion | null {
    const a = randomInt(random, -6, 6)
    const c = randomInt(random, -6, 6)
    if (a === c) return null
    const answer = c - a
    const choices = options(random, answer, [wrong(a - c, 'start-minus-end'), wrong(a + c, 'calculation'), wrong(c, 'calculation')])
    return choices && build(0, 'component', say(`$A=(${a},0)$, $B=(${c},2)$. $\\vec{AB}$: lehen osagaia?`, `$A=(${a},0)$, $B=(${c},2)$. $\\vec{AB}$: ¿primera componente?`, `$A=(${a},0)$، $B=(${c},2)$. $\\vec{AB}$: المركّبة الأولى؟`, `$A=(${a},0)$, $B=(${c},2)$. $\\vec{AB}$: first component?`), choices, answer, same(`${c}-${par(a)}=${answer}`), { a, c })
}

function modulus(random: Random): Motions3RaceQuestion | null {
    const [a, b, length] = pick(random, TRIPLES)
    const sa = random() < 0.5 ? -a : a
    const choices = options(random, length, [wrong(a + b, 'modulus-add'), wrong(a * a + b * b, 'calculation'), wrong(b, 'calculation')])
    return choices && build(0, 'modulus', say(`$(${sa},${b})$ bektorearen modulua?`, `¿Módulo de $(${sa},${b})$?`, `طول $(${sa},${b})$؟`, `Length of $(${sa},${b})$?`), choices, length, same(`\\sqrt{${a * a}+${b * b}}=${length}`), { a: sa, b })
}

function vectorSum(random: Random): Motions3RaceQuestion | null {
    const a = randomInt(random, -6, 6)
    const c = randomInt(random, -6, 6)
    const answer = a + c
    const choices = options(random, answer, [wrong(a - c, 'sign'), wrong(a * c, 'calculation'), wrong(answer + 2, 'calculation')])
    return choices && build(0, 'sum', say(`$(${a},1)+(${c},3)$: lehen osagaia?`, `$(${a},1)+(${c},3)$: ¿primera componente?`, `$(${a},1)+(${c},3)$: المركّبة الأولى؟`, `$(${a},1)+(${c},3)$: first component?`), choices, answer, same(`${a}+${par(c)}=${answer}`), { a, c })
}

/* ---------- Circuit 1: translations ---------- */

function translateX(random: Random): Motions3RaceQuestion | null {
    const x = randomInt(random, -6, 6)
    const a = randomInt(random, -6, 6)
    if (a === 0) return null
    const answer = x + a
    const choices = options(random, answer, [wrong(x - a, 'sign'), wrong(a, 'calculation'), wrong(x * a, 'calculation')])
    return choices && build(1, 'translate', say(`$(${x},1)$ + bektorea $(${a},2)$: irudiaren $x$?`, `$(${x},1)$ con el vector $(${a},2)$: ¿$x$ de la imagen?`, `$(${x},1)$ بالمتجه $(${a},2)$: $x$ للصورة؟`, `$(${x},1)$ by the vector $(${a},2)$: $x$ of the image?`), choices, answer, same(`${x}+${par(a)}=${answer}`), { x, a })
}

function vectorFrom(random: Random): Motions3RaceQuestion | null {
    const x = randomInt(random, -6, 6)
    const x2 = randomInt(random, -6, 6)
    if (x === x2) return null
    const answer = x2 - x
    const choices = options(random, answer, [wrong(x - x2, 'start-minus-end'), wrong(x + x2, 'calculation'), wrong(x2, 'calculation')])
    return choices && build(1, 'vector-from', say(`$(${x},0)\\to(${x2},3)$: bektorearen lehen osagaia?`, `$(${x},0)\\to(${x2},3)$: ¿primera componente del vector?`, `$(${x},0)\\to(${x2},3)$: المركّبة الأولى للمتجه؟`, `$(${x},0)\\to(${x2},3)$: first component of the vector?`), choices, answer, same(`${x2}-${par(x)}=${answer}`), { x, x2 })
}

function twoTranslations(random: Random): Motions3RaceQuestion | null {
    const a = randomInt(random, -5, 5)
    const c = randomInt(random, -5, 5)
    const answer = a + c
    const choices = options(random, answer, [wrong(a - c, 'sign'), wrong(a * c, 'calculation'), wrong(c, 'calculation')])
    return choices && build(1, 'two-translations', say(`$(${a},1)$ eta gero $(${c},-2)$: bektore bakarraren lehen osagaia?`, `$(${a},1)$ y después $(${c},-2)$: ¿primera componente del vector único?`, `$(${a},1)$ ثم $(${c},-2)$: المركّبة الأولى للمتجه الوحيد؟`, `$(${a},1)$ then $(${c},-2)$: first component of the single vector?`), choices, answer, same(`${a}+${par(c)}=${answer}`), { a, c })
}

/* ---------- Circuit 2: rotations ---------- */

function rotation(random: Random): Motions3RaceQuestion | null {
    const x = randomInt(random, -6, 6)
    const y = randomInt(random, -6, 6)
    const angle = pick(random, [90, 180, 270])
    if (x === y || x === 0 || y === 0) return null
    const image = angle === 90 ? [-y, x] : angle === 180 ? [-x, -y] : [y, -x]
    const answer = image[0]
    const choices = options(random, answer, [wrong(y, 'swap-only'), wrong(x, 'calculation'), wrong(-answer, 'sign')])
    return choices && build(2, `rotate-${angle}`, say(`$(${x},${y})$ jatorriaren inguruan ${angle}°: irudiaren $x$?`, `$(${x},${y})$ gira ${angle}° alrededor del origen: ¿$x$ de la imagen?`, `$(${x},${y})$ تدور ${angle}° حول الأصل: $x$ للصورة؟`, `$(${x},${y})$ turned ${angle}° about the origin: $x$ of the image?`), choices, answer, same(`(${x},${y})\\to(${image[0]},${image[1]})`), { x, y, angle })
}

function centralX(random: Random): Motions3RaceQuestion | null {
    const o = randomInt(random, -3, 3)
    const p = randomInt(random, -6, 6)
    if (p === o) return null
    const answer = 2 * o - p
    const choices = options(random, answer, [wrong(o - p, 'calculation'), wrong(-p, 'calculation'), wrong(o + p, 'calculation')])
    return choices && build(2, 'central', say(`Zentroa $O=${o}$ eta $P=${p}$ ($x$ ardatzean). $P'$?`, `Centro $O=${o}$ y $P=${p}$ (en el eje $x$). ¿$P'$?`, `المركز $O=${o}$ و$P=${p}$ (على المحور $x$). $P'$؟`, `Centre $O=${o}$ and $P=${p}$ (on the $x$ axis). $P'$?`), choices, answer, same(`2\\cdot ${par(o)}-${par(p)}=${answer}`), { o, p })
}

function order(random: Random): Motions3RaceQuestion | null {
    const sides = pick(random, [3, 4, 5, 6, 8, 9, 10, 12])
    const answer = 360 / sides
    const choices = options(random, answer, [wrong(180 - answer, 'calculation'), wrong(sides, 'calculation'), wrong(answer * 2, 'calculation')])
    return choices && build(2, 'order', say(`${sides} aldeko poligono erregularra: biraketa txikiena (°)?`, `Polígono regular de ${sides} lados: ¿menor giro (°)?`, `مضلع منتظم ذو ${sides} أضلاع: أصغر دوران (°)؟`, `Regular polygon with ${sides} sides: smallest turn (°)?`), choices, answer, same(`360°\\div ${sides}=${answer}°`), { sides })
}

/* ---------- Circuit 3: reflections ---------- */

function axisReflection(random: Random): Motions3RaceQuestion | null {
    const x = randomInt(random, -6, 6)
    const y = randomInt(random, -6, 6)
    if (x === 0 || y === 0 || x === y) return null
    const inX = random() < 0.5
    const answer = inX ? -y : -x
    const choices = options(random, answer, [wrong(inX ? y : x, 'calculation'), wrong(inX ? -x : -y, 'wrong-axis'), wrong(inX ? x : y, 'calculation')])
    return choices && build(3, inX ? 'reflect-x' : 'reflect-y', inX
        ? say(`$(${x},${y})$ X ardatzarekiko: irudiaren $y$?`, `$(${x},${y})$ respecto al eje X: ¿$y$ de la imagen?`, `$(${x},${y})$ بالنسبة إلى محور X: $y$ للصورة؟`, `$(${x},${y})$ in the X axis: $y$ of the image?`)
        : say(`$(${x},${y})$ Y ardatzarekiko: irudiaren $x$?`, `$(${x},${y})$ respecto al eje Y: ¿$x$ de la imagen?`, `$(${x},${y})$ بالنسبة إلى محور Y: $x$ للصورة؟`, `$(${x},${y})$ in the Y axis: $x$ of the image?`), choices, answer, same(inX ? `(${x},${y})\\to(${x},${-y})` : `(${x},${y})\\to(${-x},${y})`), { x, y, inX: inX ? 1 : 0 })
}

function lineReflection(random: Random): Motions3RaceQuestion | null {
    const k = randomInt(random, -3, 3)
    const x = randomInt(random, -5, 6)
    if (x === k) return null
    const answer = 2 * k - x
    const choices = options(random, answer, [wrong(k - x, 'calculation'), wrong(-x, 'calculation'), wrong(2 * k + x, 'sign')])
    return choices && build(3, 'reflect-k', say(`$(${x},2)$ eta $x=${k}$ ardatza: irudiaren $x$?`, `$(${x},2)$ y el eje $x=${k}$: ¿$x$ de la imagen?`, `$(${x},2)$ والمحور $x=${k}$: $x$ للصورة؟`, `$(${x},2)$ and the axis $x=${k}$: $x$ of the image?`), choices, answer, same(`2\\cdot ${par(k)}-${par(x)}=${answer}`), { k, x })
}

function twoMirrors(random: Random): Motions3RaceQuestion | null {
    const k1 = randomInt(random, -4, 2)
    const k2 = k1 + randomInt(random, 1, 5)
    const answer = 2 * (k2 - k1)
    const choices = options(random, answer, [wrong(k2 - k1, 'mirrors-once'), wrong(k1 + k2, 'calculation'), wrong(answer + 2, 'calculation')])
    return choices && build(3, 'two-mirrors', say(`$x=${k1}$ eta gero $x=${k2}$ ispiluak: lekualdaketa (unitate)?`, `Espejos $x=${k1}$ y después $x=${k2}$: ¿traslación (unidades)?`, `المرآتان $x=${k1}$ ثم $x=${k2}$: الانسحاب (وحدات)؟`, `Mirrors $x=${k1}$ then $x=${k2}$: translation (units)?`), choices, answer, same(`2\\cdot(${k2}-${par(k1)})=${answer}`), { k1, k2 })
}

/* ---------- Circuit 4: patterns ---------- */

function tiles(random: Random): Motions3RaceQuestion | null {
    const sides = pick(random, [3, 4, 6])
    const angle = 180 - 360 / sides
    const answer = 360 / angle
    const choices = options(random, answer, [wrong(sides, 'calculation'), wrong(answer + 1, 'calculation'), wrong(360 / sides, 'calculation')])
    return choices && build(4, 'tiles', say(`Zenbat ${sides} aldeko poligono erregular erpin batean?`, `¿Cuántos polígonos regulares de ${sides} lados en un vértice?`, `كم مضلعًا منتظمًا ذا ${sides} أضلاع عند رأس؟`, `How many regular polygons with ${sides} sides at a vertex?`), choices, answer, same(`360°\\div ${angle}°=${answer}`), { sides })
}

function frieze(random: Random): Motions3RaceQuestion | null {
    const count = randomInt(random, 3, 10)
    const step = randomInt(random, 3, 8)
    const width = randomInt(random, 1, step - 1)
    const answer = (count - 1) * step + width
    const choices = options(random, answer, [wrong(count * step + width, 'frieze-jumps'), wrong(count * step, 'calculation'), wrong(count * width, 'calculation')])
    return choices && build(4, 'frieze', say(`Frisoa: ${count} motibo, ${width} cm zabal, ${step} cm-ko bektorea. Luzera (cm)?`, `Friso: ${count} motivos de ${width} cm, vector de ${step} cm. ¿Longitud (cm)?`, `إفريز: ${count} نقوش بعرض ${width} سم ومتجه ${step} سم. الطول (سم)؟`, `Frieze: ${count} motifs ${width} cm wide, ${step} cm vector. Length (cm)?`), choices, answer, same(`${count - 1}\\cdot ${step}+${width}=${answer}`), { count, step, width })
}

function homothety(random: Random): Motions3RaceQuestion | null {
    const k = pick(random, [-3, -2, 2, 3, 4])
    const x = randomInt(random, -6, 6)
    if (x === 0) return null
    const answer = k * x
    const choices = options(random, answer, [wrong(x + k, 'homothety-add'), wrong(-answer, 'sign'), wrong(x, 'calculation')])
    return choices && build(4, 'homothety', say(`Homotezia jatorrian, $k=${k}$: $(${x},1)$ puntuaren irudiaren $x$?`, `Homotecia en el origen, $k=${k}$: ¿$x$ de la imagen de $(${x},1)$?`, `تحاكٍ في الأصل، $k=${k}$: $x$ لصورة $(${x},1)$؟`, `Enlargement from the origin, $k=${k}$: $x$ of the image of $(${x},1)$?`), choices, answer, same(`${k}\\cdot ${par(x)}=${answer}`), { k, x })
}

type Generator = (random: Random, tier: Tier) => Motions3RaceQuestion | null

const circuitGenerators: Generator[][] = [
    [component, modulus, vectorSum],
    [translateX, vectorFrom, twoTranslations],
    [rotation, centralX, order],
    [axisReflection, lineReflection, twoMirrors],
    [tiles, frieze, homothety]
]

export function generateMotions3RaceQuestion(random: Random, circuit: number, tier: Tier): Motions3RaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkMotions3PitAnswer(question: RaceQuestion<Motions3RaceError>, input: string): AnswerCheck {
    return checkAnswer(input, question.answer, question.answerForm)
}

export function motions3ParTime(circuit: number): number {
    return parTimeFor([12, 12, 14, 14, 14][circuit] ?? 13)
}

export const motions3RaceErrorTips: Record<Motions3RaceError, LocalizedText> = {
    'start-minus-end': say('Muturra ken jatorria.', 'Extremo menos origen.', 'النهاية ناقص البداية.', 'End minus start.'),
    'modulus-add': say('$\\sqrt{a^{2}+b^{2}}$, ez $a+b$.', '$\\sqrt{a^{2}+b^{2}}$, no $a+b$.', '$\\sqrt{a^{2}+b^{2}}$ لا $a+b$.', '$\\sqrt{a^{2}+b^{2}}$, not $a+b$.'),
    'swap-only': say('$90°$: $(x,y)\\to(-y,x)$.', '$90°$: $(x,y)\\to(-y,x)$.', '$90°$: $(x,y)\\to(-y,x)$.', '$90°$: $(x,y)\\to(-y,x)$.'),
    'wrong-axis': say('X ardatza: $y$ aldatzen da. Y ardatza: $x$.', 'Eje X: cambia la $y$. Eje Y: la $x$.', 'محور X: تتغيّر $y$. محور Y: $x$.', 'X axis: $y$ changes. Y axis: $x$.'),
    'mirrors-once': say('Bi ispilu: distantziaren bikoitza.', 'Dos espejos: el doble de la distancia.', 'مرآتان: ضعف المسافة.', 'Two mirrors: twice the distance.'),
    'frieze-jumps': say('$n$ motibo, $n-1$ jauzi.', '$n$ motivos, $n-1$ saltos.', '$n$ نقشًا، $n-1$ قفزة.', '$n$ motifs, $n-1$ jumps.'),
    'homothety-add': say('Homotezia biderkatu egiten da.', 'La homotecia multiplica.', 'التحاكي يضرب.', 'An enlargement multiplies.'),
    sign: say('Kontuz zeinuekin.', 'Cuidado con los signos.', 'انتبه للإشارات.', 'Watch the signs.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}

import { pick, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J3 · Planteatu eta optimizatu (Plantea y optimiza): a short problem in
   two steps. First the learner picks the function to optimise among
   three (the wrong ones misuse the condition), then its optimum value
   among three (the wrong ones are the x of the optimum and a slip).
   Level 1: numbers (sums and products); level 2: rectangles, fences and
   boxes; level 3: distances, average costs and profits.
   ========================================================================== */

export const OPTIMIZE_ROUNDS = 6

export interface OptimizeRound {
    prompt: LocalizedText
    /** Three functions in LaTeX, and the right one */
    functions: string[]
    function: number
    /** Three optimum values in LaTeX, and the right one */
    values: string[]
    value: number
    /** The working, for the verdict */
    working: string
}

const frac = (p: number, q: number) => {
    const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y))
    const g = gcd(p, q)
    const [n, d] = [p / g, q / g]
    return d === 1 ? String(n) : `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`
}

function round(random: Random, prompt: LocalizedText, right: string, wrongFunctions: string[], value: string, wrongValues: string[], working: string): OptimizeRound | null {
    if (new Set([right, ...wrongFunctions]).size < 3 || new Set([value, ...wrongValues]).size < 3) return null
    const functions = shuffle(random, [right, ...wrongFunctions.slice(0, 2)])
    const values = shuffle(random, [value, ...wrongValues.slice(0, 2)])
    return { prompt, functions, function: functions.indexOf(right), values, value: values.indexOf(value), working }
}

type Maker = (random: Random) => OptimizeRound | null

/* ---------- Level 1: numbers ---------- */

const productOfSum: Maker = (random) => {
    const s = pick(random, [8, 10, 12, 14, 16, 20])
    return round(random,
        say(`Bi zenbaki positiboren batura ${s} da. Zein da haien biderkaduraren balio handiena?`, `Dos números positivos suman ${s}. ¿Cuál es el mayor valor de su producto?`, `مجموع عددين موجبين ${s}. ما أكبر قيمة لجدائهما؟`, `Two positive numbers add up to ${s}. What is the largest value of their product?`),
        `P(x)=x(${s}-x)`, [`P(x)=x(${s}+x)`, `P(x)=x+(${s}-x)`], String((s * s) / 4), [String(s / 2), String((s * s) / 2)],
        `P'(x)=${s}-2x=0\\ \\to\\ x=${s / 2}\\ \\to\\ P=${(s * s) / 4}`)
}

const sumOfProduct: Maker = (random) => {
    const k = pick(random, [4, 9, 16, 25, 36])
    const r = Math.sqrt(k)
    return round(random,
        say(`Bi zenbaki positiboren biderkadura ${k} da. Zein da haien baturaren balio txikiena?`, `Dos números positivos tienen producto ${k}. ¿Cuál es el menor valor de su suma?`, `جداء عددين موجبين ${k}. ما أصغر قيمة لمجموعهما؟`, `Two positive numbers have product ${k}. What is the smallest value of their sum?`),
        `S(x)=x+\\frac{${k}}{x}`, [`S(x)=x+${k}x`, `S(x)=x\\cdot\\frac{${k}}{x}`], String(2 * r), [String(r), String(k)],
        `S'(x)=1-\\frac{${k}}{x^2}=0\\ \\to\\ x=${r}\\ \\to\\ S=${2 * r}`)
}

const squaresOfSum: Maker = (random) => {
    const s = pick(random, [4, 6, 8, 10])
    return round(random,
        say(`Bi zenbakiren batura ${s} da. Zein da haien karratuen baturaren balio txikiena?`, `Dos números suman ${s}. ¿Cuál es el menor valor de la suma de sus cuadrados?`, `مجموع عددين ${s}. ما أصغر قيمة لمجموع مربعيهما؟`, `Two numbers add up to ${s}. What is the smallest value of the sum of their squares?`),
        `S(x)=x^2+(${s}-x)^2`, [`S(x)=x^2+${s}-x`, `S(x)=(x+${s}-x)^2`], String((s * s) / 2), [String(s / 2), String(s * s)],
        `S'(x)=4x-${2 * s}=0\\ \\to\\ x=${s / 2}\\ \\to\\ S=${(s * s) / 2}`)
}

/* ---------- Level 2: rectangles, fences and boxes ---------- */

const rectangleArea: Maker = (random) => {
    const p = pick(random, [16, 20, 24, 28, 32])
    const half = p / 2
    return round(random,
        say(`${p} cm-ko perimetroko laukizuzenetatik, zein da azalera handiena, cm²-tan?`, `De los rectángulos de perímetro ${p} cm, ¿cuál es el área máxima, en cm²?`, `من بين المستطيلات التي محيطها ${p} cm، ما أكبر مساحة بـ cm²؟`, `Of the rectangles with perimeter ${p} cm, what is the largest area, in cm²?`),
        `A(x)=x(${half}-x)`, [`A(x)=x(${p}-x)`, `A(x)=x(${p}-2x)`], String((half * half) / 4), [String(half / 2), String((p * p) / 4)],
        `A'(x)=${half}-2x=0\\ \\to\\ x=${half / 2}\\ \\to\\ A=${(half * half) / 4}`)
}

const rectanglePerimeter: Maker = (random) => {
    const a = pick(random, [16, 25, 36, 49, 64])
    const r = Math.sqrt(a)
    return round(random,
        say(`${a} cm²-ko azalerako laukizuzenetatik, zein da perimetro txikiena, cm-tan?`, `De los rectángulos de área ${a} cm², ¿cuál es el perímetro mínimo, en cm?`, `من بين المستطيلات التي مساحتها ${a} cm²، ما أصغر محيط بـ cm؟`, `Of the rectangles with area ${a} cm², what is the smallest perimeter, in cm?`),
        `P(x)=2x+\\frac{${2 * a}}{x}`, [`P(x)=2x+\\frac{${a}}{x}`, `P(x)=x+\\frac{${a}}{x}`], String(4 * r), [String(r), String(2 * r)],
        `P'(x)=2-\\frac{${2 * a}}{x^2}=0\\ \\to\\ x=${r}\\ \\to\\ P=${4 * r}`)
}

const riverFence: Maker = (random) => {
    const l = pick(random, [40, 60, 80, 100, 120])
    return round(random,
        say(`Ibai baten ondoko lur laukizuzen bat hesitu nahi da, ibaiaren aldea hesitu gabe, ${l} m hesirekin. Zein da azalera handiena, m²-tan?`, `Se valla un terreno rectangular junto a un río, sin vallar el lado del río, con ${l} m de valla. ¿Cuál es el área máxima, en m²?`, `نسيّج قطعة أرض مستطيلة بجانب نهر، دون تسييج جهة النهر، بسياج طوله ${l} m. ما أكبر مساحة بـ m²؟`, `A rectangular plot next to a river is fenced, leaving the river side open, with ${l} m of fence. What is the largest area, in m²?`),
        `A(x)=x(${l}-2x)`, [`A(x)=x(${l}-x)`, `A(x)=x\\left(\\frac{${l}}{2}-x\\right)`], String((l * l) / 8), [String(l / 4), String((l * l) / 4)],
        `A'(x)=${l}-4x=0\\ \\to\\ x=${l / 4}\\ \\to\\ A=${(l * l) / 8}`)
}

const openBox: Maker = (random) => {
    const x = pick(random, [2, 4, 6])
    const v = (x ** 3) / 2
    return round(random,
        say(`Estalkirik gabeko oinarri karratuko kutxa batek $${v}\\ \\text{m}^3$ bolumena du. Zein da azalera minimoa, m²-tan?`, `Una caja sin tapa de base cuadrada tiene $${v}\\ \\text{m}^3$ de volumen. ¿Cuál es su superficie mínima, en m²?`, `علبة بلا غطاء قاعدتها مربعة وحجمها $${v}\\ \\text{m}^3$. ما أصغر مساحة لها بـ m²؟`, `A box with no lid and a square base has a volume of $${v}\\ \\text{m}^3$. What is its smallest surface, in m²?`),
        `S(x)=x^2+\\frac{${4 * v}}{x}`, [`S(x)=x^2+\\frac{${v}}{x}`, `S(x)=2x^2+\\frac{${4 * v}}{x}`], String(3 * x * x), [String(x), String(x * x)],
        `S'(x)=2x-\\frac{${4 * v}}{x^2}=0\\ \\to\\ x=${x}\\ \\to\\ S=${3 * x * x}`)
}

/* ---------- Level 3: distances, average costs and profits ---------- */

const distanceParabola: Maker = (random) => {
    const k = pick(random, [1, 2, 3, 4])
    return round(random,
        say(`Zein da $(0,\\,${k})$ puntutik $y=x^2$ parabolarainoko distantziaren karratuaren balio txikiena?`, `¿Cuál es el menor valor del cuadrado de la distancia de $(0,\\,${k})$ a la parábola $y=x^2$?`, `ما أصغر قيمة لمربع المسافة من $(0,\\,${k})$ إلى القطع المكافئ $y=x^2$؟`, `What is the smallest value of the square of the distance from $(0,\\,${k})$ to the parabola $y=x^2$?`),
        `D(x)=x^2+(x^2-${k})^2`, [`D(x)=x+(x^2-${k})^2`, `D(x)=x^2+(x-${k})^2`], frac(4 * k - 1, 4), [frac(2 * k - 1, 2), String(k * k)],
        `D'(x)=0\\ \\to\\ x^2=${frac(2 * k - 1, 2)}\\ \\to\\ D=${frac(4 * k - 1, 4)}`)
}

const distanceRoot: Maker = (random) => {
    const a = pick(random, [2, 3, 4, 5])
    return round(random,
        say(`Zein da $(${a},\\,0)$ puntutik $y=\\sqrt{x}$ kurbarainoko distantziaren karratuaren balio txikiena?`, `¿Cuál es el menor valor del cuadrado de la distancia de $(${a},\\,0)$ a la curva $y=\\sqrt{x}$?`, `ما أصغر قيمة لمربع المسافة من $(${a},\\,0)$ إلى المنحنى $y=\\sqrt{x}$؟`, `What is the smallest value of the square of the distance from $(${a},\\,0)$ to the curve $y=\\sqrt{x}$?`),
        `D(x)=(x-${a})^2+x`, [`D(x)=(x-${a})^2+\\sqrt{x}`, `D(x)=x^2+(x-${a})`], frac(4 * a - 1, 4), [frac(2 * a - 1, 2), String(a)],
        `D'(x)=2x-${2 * a - 1}=0\\ \\to\\ x=${frac(2 * a - 1, 2)}\\ \\to\\ D=${frac(4 * a - 1, 4)}`)
}

const averageCost: Maker = (random) => {
    const k = pick(random, [25, 49, 64, 100])
    const r = Math.sqrt(k)
    return round(random,
        say(`$x$ unitate egiteko kostua $C(x)=x^2+${k}$ euro da. Zein da batez besteko kostuaren balio txikiena?`, `Fabricar $x$ unidades cuesta $C(x)=x^2+${k}$ euros. ¿Cuál es el menor coste medio?`, `تكلفة صنع $x$ وحدة هي $C(x)=x^2+${k}$ يورو. ما أصغر تكلفة متوسطة؟`, `Making $x$ units costs $C(x)=x^2+${k}$ euros. What is the smallest average cost?`),
        `M(x)=x+\\frac{${k}}{x}`, [`M(x)=x^2+${k}`, `M(x)=2x`], String(2 * r), [String(r), String(k)],
        `M'(x)=1-\\frac{${k}}{x^2}=0\\ \\to\\ x=${r}\\ \\to\\ M=${2 * r}`)
}

const profit: Maker = (random) => {
    const p = pick(random, [40, 50, 60])
    const c = pick(random, [10, 20])
    const m = p - c
    return round(random,
        say(`Denda batek $x$ unitate saltzen ditu, bakoitza $${p}-x$ eurotan, eta bakoitza egiteak ${c} € balio du. Zein da mozkinik handiena?`, `Una tienda vende $x$ unidades a $${p}-x$ euros cada una, y fabricar cada una cuesta ${c} €. ¿Cuál es el beneficio máximo?`, `يبيع متجر $x$ وحدة بسعر $${p}-x$ يورو للوحدة، وتكلفة صنع الوحدة ${c} يورو. ما أكبر ربح؟`, `A shop sells $x$ units at $${p}-x$ euros each, and making each one costs ${c} euros. What is the largest profit?`),
        `B(x)=x(${p}-x)-${c}x`, [`B(x)=x(${p}-x)`, `B(x)=x(${p}-x)+${c}x`], String((m * m) / 4), [String(m / 2), String((p * p) / 4)],
        `B'(x)=${m}-2x=0\\ \\to\\ x=${m / 2}\\ \\to\\ B=${(m * m) / 4}`)
}

const LEVELS: Maker[][] = [
    [productOfSum, sumOfProduct, squaresOfSum],
    [rectangleArea, rectanglePerimeter, riverFence, openBox],
    [distanceParabola, distanceRoot, averageCost, profit]
]

export function createOptimizeRounds(random: Random, levelIndex: number): OptimizeRound[] {
    const makers = LEVELS[levelIndex] ?? LEVELS[0]
    for (let attempt = 0; attempt < 200; attempt += 1) {
        const order = shuffle(random, [...makers, ...makers]).slice(0, OPTIMIZE_ROUNDS)
        const rounds: OptimizeRound[] = []
        for (const make of order) {
            for (let tries = 0; tries < 50; tries += 1) {
                const next = make(random)
                if (next && !rounds.some((other) => other.prompt.es === next.prompt.es)) {
                    rounds.push(next)
                    break
                }
            }
        }
        if (rounds.length === OPTIMIZE_ROUNDS) return rounds
    }
    throw new Error('No optimisation rounds')
}

import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J2 · Osatu fitxa (Completa la ficha): a function and one line of its
   card to fill in, with four options. Level 1, the domain and the
   intercepts. Level 2, the asymptotes (vertical, horizontal, oblique).
   Level 3, the extrema and the inflection. The wrong options are the
   typical slips: the sign of a changed, the asymptotes swapped, the
   ratio of the wrong coefficients, the x of the extremum given as y.
   ========================================================================== */

export const SHEET_ROUNDS = 6

export interface SheetRound {
    prompt: LocalizedText
    latex: string
    options: string[]
    answer: number
    working: string
}

const signed = (value: number) => (value < 0 ? `-${-value}` : `+${value}`)
const minus = (a: number) => (a === 0 ? '' : signed(-a))

const ASK = {
    domain: say('Zein da izate-eremua?', '¿Cuál es el dominio?', 'ما مجال التعريف؟', 'What is the domain?'),
    yCut: say('Non mozten du $Y$ ardatza?', '¿Dónde corta al eje $Y$?', 'أين تقطع محور $Y$؟', 'Where does it cut the $Y$ axis?'),
    xCut: say('Non mozten du $X$ ardatza?', '¿Dónde corta al eje $X$?', 'أين تقطع محور $X$؟', 'Where does it cut the $X$ axis?'),
    vertical: say('Zein da asintota bertikala?', '¿Cuál es la asíntota vertical?', 'ما المقارب العمودي؟', 'Which is the vertical asymptote?'),
    horizontal: say('Zein da asintota horizontala?', '¿Cuál es la asíntota horizontal?', 'ما المقارب الأفقي؟', 'Which is the horizontal asymptote?'),
    oblique: say('Zein da asintota zeiharra?', '¿Cuál es la asíntota oblicua?', 'ما المقارب المائل؟', 'Which is the oblique asymptote?'),
    max: say('Non dago maximo erlatiboa?', '¿Dónde está el máximo relativo?', 'أين القيمة العظمى المحلية؟', 'Where is the relative maximum?'),
    min: say('Non dago minimo erlatiboa?', '¿Dónde está el mínimo relativo?', 'أين القيمة الصغرى المحلية؟', 'Where is the relative minimum?'),
    inflection: say('Non dago inflexio-puntua?', '¿Dónde está el punto de inflexión?', 'أين نقطة الانعطاف؟', 'Where is the point of inflection?')
}

function round(random: Random, prompt: LocalizedText, latex: string, right: string, wrong: string[], working: string): SheetRound | null {
    const all = [right, ...wrong]
    if (new Set(all).size !== 4) return null
    const options = shuffle(random, all)
    return { prompt, latex, options, answer: options.indexOf(right), working }
}

/** Level 1: domain and intercepts */
function firstRound(random: Random): SheetRound | null {
    const a = randomInt(random, -5, 5)
    const p = randomInt(random, -5, 5)
    if (a === 0 || p === a || p === 0) return null
    const latex = `f(x)=\\frac{x${minus(p)}}{x${minus(a)}}`
    const kind = randomInt(random, 0, 2)
    if (kind === 0) return round(random, ASK.domain, latex, `\\mathbb{R}-\\{${a}\\}`, [`\\mathbb{R}-\\{${-a}\\}`, `\\mathbb{R}-\\{${p}\\}`, '\\mathbb{R}'], `x${minus(a)}=0\\ \\to\\ x=${a}`)
    if (kind === 1) {
        const g = gcd(Math.abs(p), Math.abs(a))
        const y = fractionLatex(p / g, a / g)
        return round(random, ASK.yCut, latex, `(0,${y})`, [`(${p},0)`, `(0,${fractionLatex(a / g, p / g)})`, `(0,${fractionLatex(-p / g, a / g)})`], `f(0)=${y}`)
    }
    return round(random, ASK.xCut, latex, `(${p},0)`, [`(${-p},0)`, `(${a},0)`, `(0,${p})`], `x${minus(p)}=0\\ \\to\\ x=${p}`)
}

/** Level 2: the asymptotes */
function asymptoteRound(random: Random): SheetRound | null {
    const kind = randomInt(random, 0, 2)
    const a = randomInt(random, -4, 4)
    if (a === 0) return null
    if (kind === 0) {
        const b = randomInt(random, 2, 6)
        const latex = `f(x)=\\frac{${b}x+1}{x${minus(a)}}`
        return round(random, ASK.vertical, latex, `x=${a}`, [`x=${-a}`, `x=${b}`, `y=${a}`], `x${minus(a)}=0`)
    }
    if (kind === 1) {
        const b = randomInt(random, 2, 6)
        const c = pick(random, [2, 3])
        const latex = `f(x)=\\frac{${b * c}x+1}{${c}x${minus(a)}}`
        return round(random, ASK.horizontal, latex, `y=${b}`, [`y=${b * c}`, `y=${c}`, 'y=0'], `\\frac{${b * c}}{${c}}=${b}`)
    }
    const n = randomInt(random, -4, 4)
    const r = pick(random, [1, 2, 3, -1, -2])
    // (x + n)(x − a) + r over x − a
    const top = [1, n - a, -n * a + r]
    const latex = `f(x)=\\frac{x^2${top[1] === 0 ? '' : `${signed(top[1])}x`}${top[2] === 0 ? '' : signed(top[2])}}{x${minus(a)}}`
    const line = (m: number) => `y=x${m === 0 ? '' : signed(m)}`
    return round(random, ASK.oblique, latex, line(n), [line(n + 1), line(-n === n ? n - 2 : -n), line(top[1])], `f(x)=x${n === 0 ? '' : signed(n)}${r < 0 ? '-' : '+'}\\frac{${Math.abs(r)}}{x${minus(a)}}`)
}

/** Level 3: the extrema and the inflection of x³ − 3k²x + c and friends */
function extremaRound(random: Random): SheetRound | null {
    const k = randomInt(random, 1, 3)
    const c = randomInt(random, -3, 3)
    const latex = `f(x)=x^3-${3 * k * k}x${c === 0 ? '' : signed(c)}`
    const top = 2 * k ** 3 + c
    const bottom = -2 * k ** 3 + c
    const kind = randomInt(random, 0, 2)
    if (kind === 0) return round(random, ASK.max, latex, `(-${k},${top})`, [`(${k},${bottom})`, `(${k},${top})`, `(-${k},${bottom})`], `f''(-${k})=-${6 * k}<0`)
    if (kind === 1) return round(random, ASK.min, latex, `(${k},${bottom})`, [`(-${k},${top})`, `(-${k},${bottom})`, `(${k},${top})`], `f''(${k})=${6 * k}>0`)
    return round(random, ASK.inflection, latex, `(0,${c})`, [`(${k},${bottom})`, `(0,${c + 1})`, `(${c === 0 ? k : c},0)`], "f''(x)=6x\\ \\to\\ x=0")
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
function fractionLatex(p: number, q: number): string {
    if (q < 0) return fractionLatex(-p, -q)
    if (q === 1) return String(p)
    return `${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}}`
}

/** Six rounds of a level, no question twice */
export function createSheetRounds(random: Random, levelIndex: number): SheetRound[] {
    const generator = [firstRound, asymptoteRound, extremaRound][levelIndex] ?? firstRound
    const rounds: SheetRound[] = []
    for (let tries = 0; rounds.length < SHEET_ROUNDS && tries < 4000; tries += 1) {
        const next = generator(random)
        if (next && !rounds.some((other) => other.latex === next.latex && other.prompt.es === next.prompt.es)) rounds.push(next)
    }
    if (rounds.length < SHEET_ROUNDS) throw new Error('No sheet rounds')
    return rounds
}

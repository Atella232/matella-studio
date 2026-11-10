/* ==========================================================================
   Formulas inside the Arabic sentences of the SVG figures. The sentence reads
   right to left, but "x = −2", "(0, 2)" or "π r² dx" must keep reading left
   to right. Inside an SVG <text>, WebKit (Safari and every browser on an
   iPhone or iPad) ignores the isolates LRI … PDI, while WebKit and Chromium
   both honour the older embedding LRE … PDF. An embedding lets its direction
   leak to the signs around it (the «←» or «،» between "x = 0" and "y = 0"
   would join them left to right), so each formula is also fenced by an RLM
   on both sides: from outside it then counts as one Arabic letter, which is
   what an isolate gives inside an Arabic sentence.
   ========================================================================== */

const RLM = '\u200F'
const LRE = '\u202A'
const PDF = '\u202C'

/** Arabic letters, digits and punctuation (، ؛ ؟) */
const ARABIC_CHARS = '\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFC'
export const ARABIC = new RegExp(`[${ARABIC_CHARS}]`)

/** Direction marks a text may already carry: they are replaced by the ones added here */
const OLD_MARKS = /[\u202A-\u202E\u2066-\u2069]/g

/**
 * Never part of a formula: Arabic, arrows (the Arabic texts point ← on purpose, from one step to the next),
 * quotes, direction marks and line breaks. Everything else can be: Latin and Greek letters, digits,
 * brackets, signs, roots, integrals, primes, exponents, subscripts, € and %.
 */
const OUTSIDE = `${ARABIC_CHARS}\\u2190-\\u21FF\\u27F0-\\u27FF\\u200E\\u200F\\u202A-\\u202E\\u2066-\\u2069«»“”"\\n\\r\\t`
const SIGNS = '+−\\-±×÷'
/** The Arabic percent sign ٪ and the Arabic comma between the ends of an interval, [−5، 3], are also part of it */
const INSIDE = `(?:[^${OUTSIDE}]|\\u066A|،(?=(?:[^${ARABIC_CHARS}()\\[\\]{}]|،)*[)\\]}]))`
/**
 * A formula does not start with a space, a closing bracket or a sign that only joins two things. A + or a −
 * starts one when it is stuck to what follows (+6, −4) or when no Arabic word stands before it
 * («× 100² = × 10 000»); after an Arabic word, in «الأحرف + 2», it joins the word and the number.
 */
const START = `(?:[${SIGNS}](?=\\S)|(?<![${ARABIC_CHARS}]\\s*)[${SIGNS}]|[^${OUTSIDE}\\s)\\]}.,:;!?…·=<>≤≥≠≈/–—${SIGNS}])`
/** …and does not end with a space, an opening bracket or a sign that waits for something after it */
const END = `(?:[^${OUTSIDE}\\s(\\[{.,:;!?·=<>≤≥≠≈/–—${SIGNS}]|\\u066A)`
const RUN = `${START}${INSIDE}*${END}|(?=${END})${START}`
/** "1. " at the start numbers a step and stays apart from the formula after it */
const FORMULA = new RegExp(`^\\d+\\.(?= )|${RUN}`, 'g')
const PART = new RegExp(RUN, 'g')

const OPENING = '([{'
const CLOSING = ')]}'

type Piece = { text: string; formula: boolean }

/** Splits a text into formulas and the rest, with PART or FORMULA */
function split(text: string, pattern: RegExp, out: Piece[], inner: (run: string, out: Piece[]) => void) {
    let last = 0
    for (const match of text.matchAll(pattern)) {
        if (match.index > last) out.push({ text: text.slice(last, match.index), formula: false })
        inner(match[0], out)
        last = match.index + match[0].length
    }
    if (last < text.length) out.push({ text: text.slice(last), formula: false })
}

/**
 * A bracket that does not close inside the formula belongs to the Arabic sentence: in «r³ (1 و8 و27)» the
 * brackets hold Arabic words too, so they stay outside and the Arabic order mirrors them.
 */
function balanced(run: string, out: Piece[]) {
    const loose = new Set<number>()
    const open: number[] = []
    for (let index = 0; index < run.length; index++) {
        if (OPENING.includes(run[index])) open.push(index)
        else if (CLOSING.includes(run[index])) {
            if (open.length > 0) open.pop()
            else loose.add(index)
        }
    }
    open.forEach((index) => loose.add(index))
    if (loose.size === 0) {
        out.push({ text: run, formula: true })
        return
    }
    let last = 0
    for (const index of [...loose].sort((a, b) => a - b)) {
        split(run.slice(last, index), PART, out, (part, list) => list.push({ text: part, formula: true }))
        out.push({ text: run[index], formula: false })
        last = index + 1
    }
    split(run.slice(last), PART, out, (part, list) => list.push({ text: part, formula: true }))
}

function pieces(text: string): Piece[] {
    const out: Piece[] = []
    split(text.replace(OLD_MARKS, ''), FORMULA, out, balanced)
    return out
}

/** Wraps every formula of an Arabic sentence so that it reads left to right; any other text comes back as it was */
export function markFormulas(text: string): string {
    if (!ARABIC.test(text)) return text
    return pieces(text).map((piece) => (piece.formula ? `${RLM}${LRE}${piece.text}${PDF}${RLM}` : piece.text)).join('')
}

/** The formulas markFormulas finds, for tests and reviews */
export function formulasIn(text: string): string[] {
    if (!ARABIC.test(text)) return []
    return pieces(text).filter((piece) => piece.formula).map((piece) => piece.text)
}

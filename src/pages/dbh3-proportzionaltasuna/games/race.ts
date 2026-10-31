import { checkAnswer, fraction, hasTerminatingDecimal, toExactDecimal, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { readMoneyAnswer } from '../../dbh4-aplikatuak-proportzionaltasuna/answers.ts'

/* ==========================================================================
   Proportzionaltasunaren lasterketa (3. DBH): five circuits, one per stage —
   ratios (the fourth and the mean proportional, map scales), direct and
   inverse (unit price, workers and days, gear wheels, a missing value in an
   inverse table), compound proportion and sharing, percentages and interest
   (an index, the original price, successive changes, interest for months)
   and arithmetic problems (mixtures, meeting, catching up, taps). Wrong
   options are the typical mistakes of the unit. Every question carries
   `meta`, the numbers the tests check it against.
   ========================================================================== */

export const PROPORTION3_RACE_CIRCUITS = 5

export type Proportion3RaceError =
    | 'additive'
    | 'swap'
    | 'unit'
    | 'direct-for-inverse'
    | 'inverse-for-direct'
    | 'equal-share'
    | 'share-swap'
    | 'all-direct'
    | 'percent-of-final'
    | 'add-percent'
    | 'months-years'
    | 'plain-average'
    | 'speeds'
    | 'add-times'
    | 'calculation'

export type Proportion3RaceQuestion = RaceQuestion<Proportion3RaceError> & { meta: Record<string, number> }

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (latex: string): LocalizedText => ({ eu: `$${latex}$`, es: `$${latex}$`, en: `$${latex}$`, ar: `$${latex.replace(/\{,\}/g, '.')}$` })
const math = (latex: string) => `$${latex}$`
/** A decimal for LaTeX: 12{,}5 */
const d = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')

/** A value in LaTeX: a whole number, a short decimal or a fraction */
export function written(value: FractionValue): string | null {
    if (value.denominator === 1) return String(value.numerator)
    if (hasTerminatingDecimal(value)) {
        const decimal = toExactDecimal(value, ',')
        if (decimal !== null && decimal.split(',')[1].length <= 3) return decimal.replace(',', '{,}')
    }
    return null
}

interface Candidate {
    value: number
    error: Proportion3RaceError
}
const wrong = (value: number, error: Proportion3RaceError): Candidate => ({ value, error })
/** A decimal with at most three places as an exact fraction */
const exact = (value: number) => fraction(Math.round(value * 1000), 1000)

/** The right option and three different mistakes; null when the numbers are not «nice» */
function options(random: Random, right: number, candidates: Candidate[]): RaceOption<Proportion3RaceError>[] | null {
    const rightLatex = written(exact(right))
    if (rightLatex === null || Math.abs(right * 1000 - Math.round(right * 1000)) > 1e-6) return null
    const used = new Set([rightLatex])
    const chosen: Array<{ latex: string; error: Proportion3RaceError }> = []
    for (const candidate of [...candidates, wrong(right + 1, 'calculation'), wrong(right * 2, 'calculation'), wrong(right / 2, 'calculation'), wrong(right + 10, 'calculation')]) {
        if (chosen.length === 3) break
        if (!Number.isFinite(candidate.value) || candidate.value <= 0) continue
        if (Math.abs(candidate.value * 1000 - Math.round(candidate.value * 1000)) > 1e-6) continue
        const latex = written(exact(candidate.value))
        if (latex === null || used.has(latex)) continue
        used.add(latex)
        chosen.push({ latex, error: candidate.error })
    }
    if (chosen.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...chosen.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<Proportion3RaceError>[], answer: number, solution: LocalizedText, meta: Record<string, number>): Proportion3RaceQuestion {
    return { circuit, kind, prompt, options: choices, answer: exact(answer), answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

/* ---------- Circuit 0: ratios and proportions ---------- */

function fourthQuestion(random: Random, tier: Tier): Proportion3RaceQuestion | null {
    const a = randomInt(random, 2, tier === 0 ? 6 : 9)
    const k = pick(random, tier === 0 ? [2, 3, 4] : [1.5, 2.5, 3, 4, 5])
    const b = randomInt(random, 2, 9)
    const c = a * k
    const x = b * k
    if (!Number.isInteger(c) || a === b) return null
    const choices = options(random, x, [wrong(b + (c - a), 'additive'), wrong((a * c) / b, 'swap'), wrong((a * b) / c, 'swap')])
    return choices && build(0, 'fourth', say(`${math(`\\frac{${a}}{${b}}=\\frac{${c}}{x}`)}. Zenbat da ${math('x')}?`, `${math(`\\frac{${a}}{${b}}=\\frac{${c}}{x}`)}. ¿Cuánto vale ${math('x')}?`, `${math(`\\frac{${a}}{${b}}=\\frac{${c}}{x}`)}. كم يساوي ${math('x')}؟`, `${math(`\\frac{${a}}{${b}}=\\frac{${c}}{x}`)}. What is ${math('x')}?`), choices, x, same(`x=\\frac{${b}\\cdot ${c}}{${a}}=${d(x)}`), { a, b, c })
}

function meanQuestion(random: Random): Proportion3RaceQuestion | null {
    const p = randomInt(random, 1, 6)
    const q = randomInt(random, 2, 7)
    const s = pick(random, [1, 2, 3])
    const a = p * p * s
    const b = q * q * s
    const x = p * q * s
    if (a === b) return null
    const choices = options(random, x, [wrong((a + b) / 2, 'additive'), wrong(a * b, 'calculation'), wrong(x * 2, 'calculation')])
    return choices && build(0, 'mean', say(`${math(`\\frac{${a}}{x}=\\frac{x}{${b}}`)}. Zenbat da ${math('x')} (positiboa)?`, `${math(`\\frac{${a}}{x}=\\frac{x}{${b}}`)}. ¿Cuánto vale ${math('x')} (positivo)?`, `${math(`\\frac{${a}}{x}=\\frac{x}{${b}}`)}. كم يساوي ${math('x')} الموجب؟`, `${math(`\\frac{${a}}{x}=\\frac{x}{${b}}`)}. What is ${math('x')} (positive)?`), choices, x, same(`x^{2}=${a}\\cdot ${b}=${a * b}\\ \\to\\ x=${x}`), { a, b })
}

const SCALES = [10000, 20000, 25000, 50000, 100000, 200000]
const grouped = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,')

function scaleQuestion(random: Random, tier: Tier): Proportion3RaceQuestion | null {
    const n = pick(random, SCALES)
    const cm = pick(random, tier === 0 ? [2, 3, 4, 5, 6, 8] : [1.5, 2.5, 3.5, 4, 6, 7.5, 9])
    const km = (cm * n) / 100000
    const choices = options(random, km, [wrong(km * 10, 'unit'), wrong(km / 10, 'unit'), wrong(cm * n / 1000, 'unit'), wrong(km * 100, 'unit')])
    return choices && build(0, 'scale', say(`${math(`1\\mathbin{:}${grouped(n)}`)} eskala. Mapan ${math(`${d(cm)}`)} cm. Zenbat km benetan?`, `Escala ${math(`1\\mathbin{:}${grouped(n)}`)}. En el mapa, ${math(`${d(cm)}`)} cm. ¿Cuántos km reales?`, `المقياس ${math(`1\\mathbin{:}${grouped(n)}`)}. على الخريطة ${math(`${d(cm)}`)} سم. كم كيلومترًا في الحقيقة؟`, `Scale ${math(`1\\mathbin{:}${grouped(n)}`)}. On the map, ${math(`${d(cm)}`)} cm. How many km in real life?`), choices, km, same(`${d(cm)}\\cdot ${grouped(n)}=${grouped(cm * n)}\\ \\mathrm{cm}=${d(km)}\\ \\mathrm{km}`), { n, cm })
}

/* ---------- Circuit 1: direct and inverse ---------- */

function unitPriceQuestion(random: Random, tier: Tier): Proportion3RaceQuestion | null {
    const units = randomInt(random, 2, 8)
    const price = pick(random, tier === 0 ? [1.5, 2, 2.5, 3, 4] : [0.75, 1.2, 1.25, 1.8, 2.4, 3.5])
    const asked = randomInt(random, 3, 12)
    if (asked === units) return null
    const total = units * price
    const answer = asked * price
    const choices = options(random, answer, [wrong((total * units) / asked, 'inverse-for-direct'), wrong(total + (asked - units), 'additive'), wrong(total * asked, 'calculation')])
    return choices && build(1, 'unit-price', say(`${units} kaxak ${math(d(total))} € balio dute. Zenbat balio dute ${asked} kaxak (€)?`, `${units} cajas cuestan ${math(d(total))} €. ¿Cuánto cuestan ${asked} cajas (€)?`, `${units} علب تكلّف ${math(d(total))} €. كم تكلّف ${asked} علبة (€)؟`, `${units} boxes cost €${math(d(total))}. How much do ${asked} boxes cost (€)?`), choices, answer, same(`${d(total)}\\mathbin{:}${units}=${d(price)}\\quad ${d(price)}\\cdot ${asked}=${d(answer)}`), { units, price, asked })
}

function workersQuestion(random: Random): Proportion3RaceQuestion | null {
    const workers = randomInt(random, 2, 12)
    const days = randomInt(random, 3, 24)
    const asked = randomInt(random, 2, 16)
    const total = workers * days
    const answer = total / asked
    if (asked === workers || !Number.isInteger(answer)) return null
    const choices = options(random, answer, [wrong((days * asked) / workers, 'direct-for-inverse'), wrong(days + (workers - asked), 'additive'), wrong(total, 'calculation')])
    return choices && build(1, 'workers', say(`${workers} langilek lan bat ${days} egunean egiten dute. Zenbat egun beharko lituzkete ${asked} langilek?`, `${workers} obreros hacen un trabajo en ${days} días. ¿Cuántos días tardarían ${asked} obreros?`, `${workers} عمال ينجزون عملًا في ${days} يومًا. كم يومًا يحتاج ${asked} عاملًا؟`, `${workers} workers do a job in ${days} days. How many days would ${asked} workers take?`), choices, answer, same(`${workers}\\cdot ${days}=${total}\\quad ${total}\\mathbin{:}${asked}=${answer}`), { workers, days, asked })
}

function gearQuestion(random: Random): Proportion3RaceQuestion | null {
    const teethA = randomInt(random, 4, 24) * 2
    const rpmA = pick(random, [10, 15, 20, 25, 30, 40])
    const teethB = randomInt(random, 4, 24) * 2
    const answer = (teethA * rpmA) / teethB
    if (teethA === teethB || !Number.isInteger(answer)) return null
    const choices = options(random, answer, [wrong((teethB * rpmA) / teethA, 'direct-for-inverse'), wrong(rpmA + (teethA - teethB), 'additive'), wrong(teethA * rpmA, 'calculation')])
    return choices && build(1, 'gears', say(`${teethA} hortzeko gurpil batek minutuko ${rpmA} bira egiten ditu eta ${teethB} hortzeko bat mugitzen du. Zenbat bira minutuko?`, `Una rueda de ${teethA} dientes da ${rpmA} vueltas por minuto y mueve una de ${teethB}. ¿Cuántas vueltas por minuto da esta?`, `عجلة لها ${teethA} سنًّا تدور ${rpmA} دورة في الدقيقة وتحرّك عجلة لها ${teethB}. كم دورة في الدقيقة تدور؟`, `A wheel with ${teethA} teeth turns ${rpmA} times a minute and drives one with ${teethB}. How many turns a minute does it make?`), choices, answer, same(`\\frac{${teethA}\\cdot ${rpmA}}{${teethB}}=${answer}`), { teethA, rpmA, teethB })
}

function inverseTableQuestion(random: Random): Proportion3RaceQuestion | null {
    const k = pick(random, [12, 18, 24, 30, 36, 48, 60, 72])
    const divisors = Array.from({ length: k }, (_, i) => i + 1).filter((value) => k % value === 0 && value > 1 && value < k)
    const [x1, x2] = shuffle(random, divisors).slice(0, 2)
    if (x1 === undefined || x2 === undefined) return null
    const y1 = k / x1
    const answer = k / x2
    const choices = options(random, answer, [wrong((y1 * x2) / x1, 'direct-for-inverse'), wrong(y1 - (x2 - x1), 'additive'), wrong(k, 'calculation')])
    return choices && build(1, 'inverse-table', say(`Alderantzizko taula: ${math(`x=${x1}\\to y=${y1}`)}. Zenbat da ${math('y')} ${math(`x=${x2}`)} denean?`, `Tabla inversa: ${math(`x=${x1}\\to y=${y1}`)}. ¿Cuánto vale ${math('y')} cuando ${math(`x=${x2}`)}?`, `جدول عكسي: ${math(`x=${x1}\\to y=${y1}`)}. كم تساوي ${math('y')} عندما ${math(`x=${x2}`)}؟`, `Inverse table: ${math(`x=${x1}\\to y=${y1}`)}. What is ${math('y')} when ${math(`x=${x2}`)}?`), choices, answer, same(`${x1}\\cdot ${y1}=${k}\\quad ${k}\\mathbin{:}${x2}=${answer}`), { k, x1, x2 })
}

/* ---------- Circuit 2: compound proportion and sharing ---------- */

function directShareQuestion(random: Random, tier: Tier): Proportion3RaceQuestion | null {
    const parts = tier === 0 ? [randomInt(random, 1, 5), randomInt(random, 2, 7)] : [randomInt(random, 1, 4), randomInt(random, 2, 6), randomInt(random, 3, 8)]
    const sum = parts.reduce((a, b) => a + b, 0)
    const unit = pick(random, [10, 20, 25, 30, 40, 50])
    const total = sum * unit
    const askedIndex = parts.length - 1
    const answer = parts[askedIndex] * unit
    if (new Set(parts).size < parts.length) return null
    const choices = options(random, answer, [wrong(total / parts.length, 'equal-share'), wrong(total - answer, 'share-swap'), wrong(parts[askedIndex] * (total / parts.length), 'calculation')])
    const list = parts.join(', ')
    return choices && build(2, 'direct-share', say(`Banatu ${total} € ${list} zenbakiekiko zuzenki proportzionalean. Zenbat dagokio ${parts[askedIndex]} duenari?`, `Reparte ${total} € de forma directamente proporcional a ${list}. ¿Cuánto le toca al de ${parts[askedIndex]}?`, `وزّع ${total} € توزيعًا طرديًا على ${parts.join('، ')}. كم ينال صاحب ${parts[askedIndex]}؟`, `Share €${total} in direct proportion to ${list}. How much does the one with ${parts[askedIndex]} get?`), choices, answer, same(`${total}\\mathbin{:}${sum}=${unit}\\quad ${unit}\\cdot ${parts[askedIndex]}=${answer}`), { total, sum, part: parts[askedIndex] })
}

function inverseShareQuestion(random: Random): Proportion3RaceQuestion | null {
    const [a, b] = pick(random, [[2, 3], [1, 2], [1, 3], [2, 5], [3, 4], [1, 4], [4, 6], [3, 6]])
    const lcm = (a * b) / gcd(a, b)
    const wa = lcm / a
    const wb = lcm / b
    const unit = pick(random, [10, 20, 30, 40, 60])
    const total = (wa + wb) * unit
    const answer = wa * unit
    const choices = options(random, answer, [wrong((total * a) / (a + b), 'share-swap'), wrong(total / 2, 'equal-share'), wrong(wb * unit, 'share-swap')])
    return choices && build(2, 'inverse-share', say(`Banatu ${total} € ${a} eta ${b} zenbakiekiko alderantziz proportzionalean. Zenbat dagokio ${a} duenari?`, `Reparte ${total} € de forma inversamente proporcional a ${a} y ${b}. ¿Cuánto le toca al de ${a}?`, `وزّع ${total} € توزيعًا عكسيًا على ${a} و${b}. كم ينال صاحب ${a}؟`, `Share €${total} in inverse proportion to ${a} and ${b}. How much does the one with ${a} get?`), choices, answer, same(`\\frac{1}{${a}},\\frac{1}{${b}}\\ \\to\\ ${wa},${wb}\\quad ${total}\\mathbin{:}${wa + wb}=${unit}\\quad ${unit}\\cdot ${wa}=${answer}`), { total, a, b })
}

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b)
}

function compoundQuestion(random: Random): Proportion3RaceQuestion | null {
    const machines = randomInt(random, 2, 8)
    const pieces = pick(random, [100, 120, 150, 200, 240, 300])
    const hours = randomInt(random, 2, 10)
    const newMachines = randomInt(random, 2, 10)
    const newPieces = pick(random, [100, 150, 180, 200, 300, 360, 400, 450, 600])
    if (newMachines === machines || newPieces === pieces) return null
    const answer = (hours * machines * newPieces) / (newMachines * pieces)
    const allDirect = (hours * newMachines * newPieces) / (machines * pieces)
    const choices = options(random, answer, [wrong(allDirect, 'all-direct'), wrong((hours * machines * pieces) / (newMachines * newPieces), 'all-direct'), wrong((hours * newMachines * pieces) / (machines * newPieces), 'all-direct')])
    return choices && build(2, 'compound', say(`${machines} makinak ${pieces} pieza egiten dituzte ${hours} orduan. Zenbat ordu beharko dituzte ${newMachines} makinak ${newPieces} pieza egiteko?`, `${machines} máquinas hacen ${pieces} piezas en ${hours} horas. ¿Cuántas horas tardarán ${newMachines} máquinas en hacer ${newPieces}?`, `${machines} آلات تصنع ${pieces} قطعة في ${hours} ساعات. كم ساعة تحتاج ${newMachines} آلات لصنع ${newPieces}؟`, `${machines} machines make ${pieces} parts in ${hours} hours. How many hours will ${newMachines} machines take to make ${newPieces}?`), choices, answer, same(`${hours}\\cdot\\frac{${machines}}{${newMachines}}\\cdot\\frac{${newPieces}}{${pieces}}=${d(answer)}`), { machines, pieces, hours, newMachines, newPieces })
}

/* ---------- Circuit 3: percentages and interest ---------- */

function finalPriceQuestion(random: Random, tier: Tier): Proportion3RaceQuestion | null {
    const price = pick(random, [40, 60, 80, 120, 150, 200, 250])
    const rate = pick(random, tier === 0 ? [10, 20, 25, 50] : [5, 12, 15, 30, 35])
    const up = random() < 0.5
    const answer = price * (up ? 100 + rate : 100 - rate) / 100
    const choices = options(random, answer, [wrong(price * (up ? 100 - rate : 100 + rate) / 100, 'calculation'), wrong((price * rate) / 100, 'calculation'), wrong(up ? price + rate : price - rate, 'additive')])
    const index = d((up ? 100 + rate : 100 - rate) / 100)
    return choices && build(3, 'final', say(`${price} € ${up ? 'garestitu' : 'merkatu'} egin da, % ${rate}. Zenbat balio du orain (€)?`, `${price} € ${up ? 'suben' : 'bajan'} un ${rate} %. ¿Cuánto es ahora (€)?`, `${up ? 'ارتفع' : 'انخفض'} مبلغ ${price} € بنسبة ${rate}٪. كم صار (€)؟`, `€${price} goes ${up ? 'up' : 'down'} by ${rate}%. How much is it now (€)?`), choices, answer, same(`${price}\\cdot ${index}=${d(answer)}`), { price, rate, up: up ? 1 : 0 })
}

function originalQuestion(random: Random): Proportion3RaceQuestion | null {
    const original = pick(random, [40, 50, 60, 80, 100, 120, 150, 200])
    const rate = pick(random, [10, 20, 25, 40, 50])
    const final = (original * (100 - rate)) / 100
    const choices = options(random, original, [wrong(final * (100 + rate) / 100, 'percent-of-final'), wrong(final + rate, 'additive'), wrong(final * (100 - rate) / 100, 'calculation')])
    return choices && build(3, 'original', say(`% ${rate} merkatu ondoren, ${math(d(final))} € ordaindu dira. Zenbat zen hasierako prezioa (€)?`, `Tras una rebaja del ${rate} % se pagan ${math(d(final))} €. ¿Cuál era el precio inicial (€)?`, `بعد تخفيض ${rate}٪ دُفع ${math(d(final))} €. كم كان السعر الأصلي (€)؟`, `After a ${rate}% discount, €${math(d(final))} is paid. What was the original price (€)?`), choices, original, same(`${d(final)}\\mathbin{:}${d((100 - rate) / 100)}=${original}`), { original, rate })
}

function chainedQuestion(random: Random): Proportion3RaceQuestion | null {
    const r1 = pick(random, [10, 20, 25, 50])
    const r2 = pick(random, [10, 20, 25, 40, 50])
    const index = ((100 + r1) * (100 - r2)) / 10000
    // Exactly: (100 + r1)(100 − r2) − 10 000, in hundredths of a per cent
    const answer = Math.abs((100 + r1) * (100 - r2) - 10000) / 100
    if (Math.abs(index - 1) < 1e-9) return null
    const up = index > 1
    const choices = options(random, answer, [wrong(Math.abs(r1 - r2), 'add-percent'), wrong(r1 + r2, 'add-percent'), wrong(answer + 1, 'calculation')])
    return choices && build(3, 'chained', say(`Prezio bat % ${r1} igo eta gero % ${r2} jaitsi da. Guztira zenbat ${up ? 'igo' : 'jaitsi'} da (%)?`, `Un precio sube un ${r1} % y después baja un ${r2} %. En total, ¿cuánto ${up ? 'ha subido' : 'ha bajado'} (%)?`, `ارتفع سعر ${r1}٪ ثم انخفض ${r2}٪. كم ${up ? 'ارتفع' : 'انخفض'} في المجموع (٪)؟`, `A price goes up ${r1}% and then down ${r2}%. Overall, how much has it gone ${up ? 'up' : 'down'} (%)?`), choices, answer, same(`${d((100 + r1) / 100)}\\cdot ${d((100 - r2) / 100)}=${d(index)}`), { r1, r2 })
}

function monthsQuestion(random: Random): Proportion3RaceQuestion | null {
    const capital = pick(random, [600, 1200, 1800, 2400, 3000, 3600])
    const rate = pick(random, [2, 3, 4, 5, 6])
    const months = pick(random, [3, 4, 6, 8, 9])
    const answer = (capital * rate * months) / 1200
    const choices = options(random, answer, [wrong((capital * rate * months) / 100, 'months-years'), wrong((capital * rate) / 100, 'months-years'), wrong(answer * 2, 'calculation')])
    return choices && build(3, 'months', say(`${capital} € % ${rate} interes bakunean, ${months} hilabetez. Zenbat interes (€)?`, `${capital} € al ${rate} % de interés simple durante ${months} meses. ¿Cuánto interés (€)?`, `${capital} € بفائدة بسيطة ${rate}٪ مدة ${months} أشهر. كم الفائدة (€)؟`, `€${capital} at ${rate}% simple interest for ${months} months. How much interest (€)?`), choices, answer, same(`\\frac{${capital}\\cdot ${rate}}{100}\\cdot\\frac{${months}}{12}=${d(answer)}`), { capital, rate, months })
}

/* ---------- Circuit 4: arithmetic problems ---------- */

function mixtureQuestion(random: Random): Proportion3RaceQuestion | null {
    const a = randomInt(random, 1, 6) * 2
    const b = randomInt(random, 1, 6) * 2
    const p = randomInt(random, 3, 8)
    const q = randomInt(random, p + 2, 14)
    const answer = (a * p + b * q) / (a + b)
    if (a === b) return null
    const choices = options(random, answer, [wrong((p + q) / 2, 'plain-average'), wrong((a * q + b * p) / (a + b), 'calculation'), wrong(a * p + b * q, 'calculation')])
    return choices && build(4, 'mixture', say(`${a} kg ${p} €/kg-an eta ${b} kg ${q} €/kg-an nahasten dira. Zenbat balio du nahastearen kilo batek (€)?`, `Se mezclan ${a} kg de ${p} €/kg con ${b} kg de ${q} €/kg. ¿Cuánto vale un kilo de la mezcla (€)?`, `نخلط ${a} كغ سعرها ${p} €/كغ مع ${b} كغ سعرها ${q} €/كغ. كم ثمن كيلوغرام الخليط (€)؟`, `${a} kg at €${p}/kg are mixed with ${b} kg at €${q}/kg. How much is a kilo of the mixture worth (€)?`), choices, answer, same(`\\frac{${a}\\cdot ${p}+${b}\\cdot ${q}}{${a + b}}=${d(answer)}`), { a, b, p, q })
}

function meetQuestion(random: Random): Proportion3RaceQuestion | null {
    const v1 = pick(random, [40, 50, 60, 70, 80, 90])
    const v2 = pick(random, [30, 40, 50, 60, 70, 80])
    const time = pick(random, [1, 1.5, 2, 2.5, 3, 4])
    const distance = (v1 + v2) * time
    if (v1 === v2) return null
    const choices = options(random, time, [wrong(distance / Math.abs(v1 - v2), 'speeds'), wrong(distance / v1, 'calculation'), wrong(distance / ((v1 + v2) / 2), 'calculation')])
    return choices && build(4, 'meet', say(`${distance} km-ko tartea. Bi auto elkarrengana, ${v1} km/h-ra eta ${v2} km/h-ra. Zenbat ordutan elkartzen dira?`, `Distancia ${distance} km. Dos coches van uno hacia el otro a ${v1} km/h y ${v2} km/h. ¿En cuántas horas se cruzan?`, `المسافة ${distance} كم. سيارتان متقابلتان بسرعة ${v1} كم/س و${v2} كم/س. بعد كم ساعة تلتقيان؟`, `${distance} km apart. Two cars travel towards each other at ${v1} km/h and ${v2} km/h. In how many hours do they meet?`), choices, time, same(`${distance}\\mathbin{:}(${v1}+${v2})=${d(time)}`), { distance, v1, v2 })
}

function catchQuestion(random: Random): Proportion3RaceQuestion | null {
    const slow = pick(random, [15, 20, 30, 40, 60])
    const fast = slow + pick(random, [10, 15, 20, 30])
    const time = pick(random, [0.5, 1, 1.5, 2, 3])
    const gap = (fast - slow) * time
    const choices = options(random, time, [wrong(gap / (fast + slow), 'speeds'), wrong(gap / fast, 'calculation'), wrong(gap / slow, 'calculation')])
    return choices && build(4, 'catch', say(`Bizikleta bat ${gap} km aurrerago doa, ${slow} km/h-ra. Moto bat atzetik, ${fast} km/h-ra. Zenbat ordutan harrapatzen du?`, `Una bici va ${gap} km por delante a ${slow} km/h. Una moto la sigue a ${fast} km/h. ¿En cuántas horas la alcanza?`, `دراجة تسبق بـ ${gap} كم بسرعة ${slow} كم/س. وتلحقها دراجة نارية بسرعة ${fast} كم/س. بعد كم ساعة تلحقها؟`, `A bike is ${gap} km ahead at ${slow} km/h. A motorbike follows at ${fast} km/h. In how many hours does it catch up?`), choices, time, same(`${gap}\\mathbin{:}(${fast}-${slow})=${d(time)}`), { gap, slow, fast })
}

function tapsQuestion(random: Random): Proportion3RaceQuestion | null {
    const [a, b] = pick(random, [[2, 2], [3, 6], [4, 12], [6, 12], [4, 4], [6, 3], [10, 15], [12, 6], [5, 20], [3, 3]])
    const answer = (a * b) / (a + b)
    const choices = options(random, answer, [wrong(a + b, 'add-times'), wrong((a + b) / 2, 'add-times'), wrong(Math.abs(a - b) || a * 2, 'calculation')])
    return choices && build(4, 'taps', say(`Txorrota batek depositua ${a} orduan betetzen du, beste batek ${b} orduan. Zenbat ordu biek batera?`, `Un grifo llena el depósito en ${a} horas y otro en ${b}. ¿Cuántas horas los dos juntos?`, `صنبور يملأ الخزان في ${a} ساعات وآخر في ${b}. كم ساعة معًا؟`, `One tap fills the tank in ${a} hours and another in ${b}. How many hours together?`), choices, answer, same(`\\frac{1}{${a}}+\\frac{1}{${b}}=\\frac{${a + b}}{${a * b}}\\ \\to\\ ${d(answer)}`), { a, b })
}

type Generator = (random: Random, tier: Tier) => Proportion3RaceQuestion | null

const circuitGenerators: Generator[][] = [
    [fourthQuestion, meanQuestion, scaleQuestion],
    [unitPriceQuestion, workersQuestion, gearQuestion, inverseTableQuestion],
    [directShareQuestion, inverseShareQuestion, compoundQuestion],
    [finalPriceQuestion, originalQuestion, chainedQuestion, monthsQuestion],
    [mixtureQuestion, meetQuestion, catchQuestion, tapsQuestion]
]

export function generateProportion3RaceQuestion(random: Random, circuit: number, tier: Tier): Proportion3RaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 800; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkProportion3PitAnswer(question: RaceQuestion<Proportion3RaceError>, input: string): AnswerCheck {
    return checkAnswer(readMoneyAnswer(input), question.answer, question.answerForm)
}

export function proportion3ParTime(circuit: number): number {
    return parTimeFor([12, 14, 15, 14, 15][circuit] ?? 13)
}

export const proportion3RaceErrorTips: Record<Proportion3RaceError, LocalizedText> = {
    additive: say('Proportzioetan biderkatzen edo zatitzen da, ez batu edo kendu.', 'En la proporcionalidad se multiplica o se divide, no se suma ni se resta.', 'في التناسب نضرب أو نقسم، لا نجمع ولا نطرح.', 'In proportion problems you multiply or divide, you do not add or subtract.'),
    swap: say('Ezezaguna: biderkatu gurutzean dauden bi gaiak eta zatitu hirugarrenaz.', 'Incógnita: multiplica los dos términos en cruz y divide entre el tercero.', 'المجهول: اضرب الحدّين المتقابلين واقسم على الثالث.', 'The unknown: multiply the two cross terms and divide by the third.'),
    unit: say('Eskalak ez du unitatea aldatzen: emaitza cm-tan dago. 1 km = 100 000 cm.', 'La escala no cambia la unidad: el resultado sale en cm. 1 km = 100 000 cm.', 'المقياس لا يغيّر الوحدة: النتيجة بالسنتيمتر. 1 كم = 100000 سم.', 'The scale does not change the unit: the result is in cm. 1 km = 100,000 cm.'),
    'direct-for-inverse': say('Alderantzizkoa da: bata handitzean bestea txikitzen da. Kalkulatu biderkadura eta zatitu.', 'Es inversa: si una crece, la otra disminuye. Calcula el producto y divide.', 'إنه عكسي: إذا كبر أحدهما صغر الآخر. احسب حاصل الضرب ثم اقسم.', 'It is inverse: if one grows, the other shrinks. Work out the product and divide.'),
    'inverse-for-direct': say('Zuzena da: gehiago erosiz, gehiago ordaintzen da. Lehenik unitate baten prezioa.', 'Es directa: si compras más, pagas más. Primero el precio de una unidad.', 'إنه طردي: إذا اشتريت أكثر دفعت أكثر. أولًا سعر الوحدة.', 'It is direct: if you buy more, you pay more. First find the price of one unit.'),
    'equal-share': say('Hori zati berdinak dira. Proportzionalean, zatitu zenbakien baturaz.', 'Eso es a partes iguales. En el proporcional, divide entre la suma de los números.', 'هذا توزيع بالتساوي. وفي التناسبي اقسم على مجموع الأعداد.', 'That is an equal share. In a proportional one, divide by the sum of the numbers.'),
    'share-swap': say('Begiratu nori dagokion: zuzenean zenbaki handiari gehiago, alderantzizkoan gutxiago.', 'Mira a quién le toca: en la directa, al número mayor le toca más; en la inversa, menos.', 'انظر لمن الحصة: في الطردي ينال العدد الأكبر أكثر، وفي العكسي أقل.', 'Check who gets what: in a direct share the larger number gets more; in an inverse one, less.'),
    'all-direct': say('Magnitude bakoitza bakarka: makina gehiagorekin ordu gutxiago (alderantzizkoa), pieza gehiagorekin ordu gehiago (zuzena).', 'Cada magnitud por separado: con más máquinas, menos horas (inversa); con más piezas, más horas (directa).', 'كل مقدار على حدة: آلات أكثر ساعات أقل (عكسي)، وقطع أكثر ساعات أكثر (طردي).', 'Each quantity separately: more machines, fewer hours (inverse); more parts, more hours (direct).'),
    'percent-of-final': say('Ehunekoa hasierako prezioarena da: zatitu amaierakoa indizeaz.', 'El porcentaje es del precio inicial: divide el final entre el índice.', 'النسبة من السعر الأصلي: اقسم النهائي على المؤشر.', 'The percentage is of the original price: divide the final price by the index.'),
    'add-percent': say('Ehuneko kateatuak ez dira batzen edo kentzen: biderkatu indizeak.', 'Los porcentajes encadenados no se suman ni se restan: multiplica los índices.', 'النسب المتتالية لا تُجمع ولا تُطرح: اضرب المؤشرات.', 'Successive percentages are not added or subtracted: multiply the indices.'),
    'months-years': say('Interes-tasa urtekoa da: hilabeteak urte bihurtu, zatitu 12 zenbakiaz.', 'El rédito es anual: pasa los meses a años, divide entre 12.', 'السعر سنوي: حوّل الأشهر إلى سنوات بالقسمة على 12.', 'The rate is per year: change the months into years, divide by 12.'),
    'plain-average': say('Nahastearen prezioa ez da prezioen erdia: kilo bakoitzak bere pisua du.', 'El precio de la mezcla no es la media de los precios: cuenta cuántos kilos hay de cada uno.', 'سعر الخليط ليس متوسط السعرين: احسب كم كيلوغرامًا من كل منهما.', 'The price of a mixture is not the average of the prices: count how many kilos there are of each.'),
    speeds: say('Elkarrengana: abiadurak batu. Atzetik: abiadurak kendu.', 'Al encuentro: se suman las velocidades. Alcance: se restan.', 'التقابل: تُجمع السرعتان. اللحاق: تُطرحان.', 'Towards each other: add the speeds. Catching up: subtract them.'),
    'add-times': say('Denborak ez dira batzen: batu ordu bateko zatiak. Elkarrekin azkarrago.', 'Los tiempos no se suman: suma las partes de una hora. Juntos se tarda menos.', 'الأزمنة لا تُجمع: اجمع أجزاء الساعة. معًا أسرع.', 'Times are not added: add the parts per hour. Together is faster.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}

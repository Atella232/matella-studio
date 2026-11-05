import { checkAnswer, fraction, type AnswerCheck, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import { parTimeFor, type RaceOption, type RaceQuestion, type Tier } from '../../../features/unit-v2/games/raceCore.ts'
import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { written } from '../../batx1-zientziak-errealak/games/race.ts'
import { readTrigonometryAnswer } from '../../dbh4-akademikoak-trigonometria/answers.ts'
import { say } from '../../dbh4-akademikoak-trigonometria/text.ts'

/* ==========================================================================
   Triangeluen lasterketa (Batxilergoa 1 · Zientziak): five circuits, one
   per stage — any angle (an angle reduced to one turn, the cosine of the
   second quadrant, the obtuse angle with a notable sine), right triangles
   and heights (a hypotenuse, a leg against 30°, a height that falls
   outside), the sine rule (a side, how many triangles, the radius), the
   cosine rule (a side with 60° or 120°, an angle from three sides) and
   areas and problems (½ · b · c · sen A, Heron, perpendicular forces).
   The numbers are chosen so that every answer is whole or a simple
   fraction, and the wrong options are the typical mistakes. Formulas
   write \sen and \tg (say of 4. DBH gives each language its names). Every
   question carries `meta`, the numbers the tests check it against.
   ========================================================================== */

export const TRIANGLES_RACE_CIRCUITS = 5

export type TrianglesRaceError =
    | 'decimal-part'
    | 'one-turn'
    | 'sign'
    | 'swapped'
    | 'acute'
    | 'cosine-symmetry'
    | 'added'
    | 'other-ratio'
    | 'wrong-pair'
    | 'count'
    | 'diameter'
    | 'no-cosine'
    | 'cosine-sign'
    | 'supplement'
    | 'no-half'
    | 'perimeter'
    | 'calculation'

export type TrianglesRaceQuestion = RaceQuestion<TrianglesRaceError> & { meta: Record<string, number> }

const math = (latex: string) => `$${latex}$`
const same = (latex: string): LocalizedText => say(math(latex), math(latex), math(latex), math(latex))

interface Candidate {
    value: FractionValue
    error: TrianglesRaceError
}
const whole = (value: number, error: TrianglesRaceError): Candidate => ({ value: fraction(Math.round(value) + 0), error })
const ratio = (p: number, q: number, error: TrianglesRaceError): Candidate => ({ value: fraction(p, q), error })
const nearby = (value: number): Candidate[] => [value + 1, value - 1, value + 2, value * 2].map((item) => ({ value: fraction(Math.round(item * 10000), 10000), error: 'calculation' as const }))

/** The right option and three different mistakes */
function options(random: Random, right: FractionValue, candidates: Candidate[]): RaceOption<TrianglesRaceError>[] | null {
    const rightLatex = written(right)
    if (rightLatex === null) return null
    const used = new Set([rightLatex])
    const wrong: Array<{ latex: string; error: TrianglesRaceError }> = []
    for (const candidate of [...candidates, ...nearby(right.numerator / right.denominator)]) {
        if (wrong.length === 3) break
        const latex = written(candidate.value)
        if (latex === null || latex === '-0' || used.has(latex)) continue
        used.add(latex)
        wrong.push({ latex, error: candidate.error })
    }
    if (wrong.length < 3) return null
    return shuffle(random, [{ latex: rightLatex, correct: true, error: null }, ...wrong.map((item) => ({ latex: item.latex, correct: false, error: item.error }))])
}

function build(circuit: number, kind: string, prompt: LocalizedText, choices: RaceOption<TrianglesRaceError>[], answer: FractionValue, solution: LocalizedText, meta: Record<string, number>): TrianglesRaceQuestion {
    return { circuit, kind, prompt, options: choices, answer, answerForm: 'any', percentAnswer: false, writable: true, solution, meta }
}

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29]]

/* ---------- Circuit 0: any angle ---------- */

function reduceQuestion(random: Random): TrianglesRaceQuestion | null {
    const turns = randomInt(random, 1, 4)
    const rest = randomInt(random, 2, 35) * 10
    const angle = turns * 360 + rest
    const decimals = Math.round(((angle / 360) % 1) * 100)
    const answer = fraction(rest)
    const choices = options(random, answer, [whole(decimals, 'decimal-part'), whole(angle - 360, 'one-turn'), whole(360 - rest, 'sign')])
    return choices && build(0, 'reduce', say(`Zein angeluren baliokidea da ${angle}°-ko angelua, 0°-tik 360°-ra?`, `¿A qué ángulo entre 0° y 360° equivale uno de ${angle}°?`, `أي زاوية بين 0° و360° تكافئ زاوية ${angle}°؟`, `Which angle between 0° and 360° is the same as one of ${angle}°?`), choices, answer, same(`${angle}°=${turns}\\cdot 360°+${rest}°`), { angle, rest })
}

function quadrantQuestion(random: Random): TrianglesRaceQuestion | null {
    const [p, q, h] = pick(random, TRIPLES)
    const answer = fraction(-q, h)
    const choices = options(random, answer, [ratio(q, h, 'sign'), ratio(-p, h, 'swapped'), ratio(-p, q, 'other-ratio')])
    return choices && build(0, 'quadrant', say(`$\\sen\\alpha=\\frac{${p}}{${h}}$ eta α bigarren koadrantean. Zenbat da $\\cos\\alpha$?`, `$\\sen\\alpha=\\frac{${p}}{${h}}$ y α en el segundo cuadrante. ¿Cuánto vale $\\cos\\alpha$?`, `$\\sen\\alpha=\\frac{${p}}{${h}}$ وα في الربع الثاني. كم $\\cos\\alpha$؟`, `$\\sin\\alpha=\\frac{${p}}{${h}}$ and α in the second quadrant. What is $\\cos\\alpha$?`), choices, answer, same(`\\cos\\alpha=-\\sqrt{1-\\frac{${p * p}}{${h * h}}}=-\\frac{${q}}{${h}}`), { p, q, h })
}

const NOTABLE: Array<{ latex: string; angle: number }> = [{ latex: '\\frac{1}{2}', angle: 30 }, { latex: '\\frac{\\sqrt{2}}{2}', angle: 45 }, { latex: '\\frac{\\sqrt{3}}{2}', angle: 60 }]

function obtuseQuestion(random: Random): TrianglesRaceQuestion | null {
    const { latex, angle } = pick(random, NOTABLE)
    const answer = fraction(180 - angle)
    const choices = options(random, answer, [whole(angle, 'acute'), whole(360 - angle, 'cosine-symmetry'), whole(90 + angle, 'added')])
    return choices && build(0, 'obtuse', say(`Zein angelu kamutsek du $\\sen\\alpha=${latex}$?`, `¿Qué ángulo obtuso cumple $\\sen\\alpha=${latex}$?`, `أي زاوية منفرجة تحقق $\\sen\\alpha=${latex}$؟`, `Which obtuse angle has $\\sin\\alpha=${latex}$?`), choices, answer, same(`180°-${angle}°=${180 - angle}°`), { angle })
}

/* ---------- Circuit 1: right triangles and heights ---------- */

function hypotenuseQuestion(random: Random): TrianglesRaceQuestion | null {
    const [p, q, h] = pick(random, TRIPLES)
    const answer = fraction(h)
    const choices = options(random, answer, [whole(p + q, 'added'), whole(q, 'calculation'), whole(Math.round(Math.sqrt(q * q - p * p)), 'sign')])
    return choices && build(1, 'hypotenuse', say(`Triangelu angeluzuzen baten katetoak ${p} eta ${q} dira. Zenbat da hipotenusa?`, `Los catetos de un triángulo rectángulo miden ${p} y ${q}. ¿Cuánto mide la hipotenusa?`, `ضلعا مثلث قائم ${p} و${q}. كم طول الوتر؟`, `The legs of a right-angled triangle are ${p} and ${q}. How long is the hypotenuse?`), choices, answer, same(`\\sqrt{${p}^2+${q}^2}=${h}`), { p, q, h })
}

function legQuestion(random: Random): TrianglesRaceQuestion | null {
    const hypotenuse = randomInt(random, 2, 12) * 2
    const answer = fraction(hypotenuse / 2)
    const choices = options(random, answer, [whole(hypotenuse, 'calculation'), whole(hypotenuse * 2, 'other-ratio'), ratio(hypotenuse, 4, 'calculation')])
    return choices && build(1, 'leg', say(`Triangelu angeluzuzen baten hipotenusa ${hypotenuse} da. Zenbat da 30°-ko angeluaren aurkako katetoa?`, `La hipotenusa de un triángulo rectángulo mide ${hypotenuse}. ¿Cuánto mide el cateto opuesto al ángulo de 30°?`, `وتر مثلث قائم ${hypotenuse}. كم طول الضلع المقابل للزاوية 30°؟`, `The hypotenuse of a right-angled triangle is ${hypotenuse}. How long is the leg opposite the 30° angle?`), choices, answer, same(`${hypotenuse}\\cdot\\sen 30°=${hypotenuse / 2}`), { hypotenuse })
}

function heightQuestion(random: Random): TrianglesRaceQuestion | null {
    const a = randomInt(random, 2, 10) * 2
    const answer = fraction(a / 2)
    const choices = options(random, answer, [whole(a, 'calculation'), whole(2 * a, 'other-ratio'), ratio(a, 4, 'calculation')])
    return choices && build(1, 'height', say(`ABC triangeluan $a=${a}$ eta $B=150°$ dira. Zenbat da C-tik ateratako altuera?`, `En el triángulo ABC, $a=${a}$ y $B=150°$. ¿Cuánto mide la altura desde C?`, `في المثلث ABC: $a=${a}$ و$B=150°$. كم طول الارتفاع النازل من C؟`, `In triangle ABC, $a=${a}$ and $B=150°$. How long is the height from C?`), choices, answer, same(`h=${a}\\cdot\\sen 30°=${a / 2}`), { a })
}

/* ---------- Circuit 2: the sine rule ---------- */

function sineSideQuestion(random: Random): TrianglesRaceQuestion | null {
    const a = randomInt(random, 2, 12)
    const answer = fraction(2 * a)
    const choices = options(random, answer, [ratio(a, 2, 'wrong-pair'), whole(a, 'calculation'), whole(3 * a, 'calculation')])
    return choices && build(2, 'sine-side', say(`ABC triangeluan $a=${a}$, $A=30°$ eta $B=90°$ dira. Zenbat da $b$?`, `En el triángulo ABC, $a=${a}$, $A=30°$ y $B=90°$. ¿Cuánto mide $b$?`, `في المثلث ABC: $a=${a}$ و$A=30°$ و$B=90°$. كم طول $b$؟`, `In triangle ABC, $a=${a}$, $A=30°$ and $B=90°$. How long is $b$?`), choices, answer, same(`b=\\frac{${a}\\cdot\\sen 90°}{\\sen 30°}=${2 * a}`), { a })
}

function countQuestion(random: Random): TrianglesRaceQuestion | null {
    // A = 30° and b even: the height is b / 2, so the count is easy to see
    const b = randomInt(random, 3, 6) * 2
    const a = randomInt(random, 2, b + 2)
    const h = b / 2
    const count = a < h ? 0 : a === h || a >= b ? 1 : 2
    const answer = fraction(count)
    const others = [0, 1, 2, 3].filter((item) => item !== count)
    const choices = options(random, answer, others.map((item) => whole(item, 'count')))
    return choices && build(2, 'count', say(`ABC triangeluan $a=${a}$, $b=${b}$ eta $A=30°$ dira. Zenbat triangelu daude?`, `En el triángulo ABC, $a=${a}$, $b=${b}$ y $A=30°$. ¿Cuántos triángulos hay?`, `في المثلث ABC: $a=${a}$ و$b=${b}$ و$A=30°$. كم مثلثًا يوجد؟`, `In triangle ABC, $a=${a}$, $b=${b}$ and $A=30°$. How many triangles are there?`), choices, answer, same(`h=${b}\\cdot\\sen 30°=${h}\\qquad a=${a}`), { a, b, count })
}

function radiusQuestion(random: Random): TrianglesRaceQuestion | null {
    const a = randomInt(random, 2, 12)
    const angle = pick(random, [30, 90, 150])
    const radius = angle === 90 ? a / 2 : a
    const answer = fraction(angle === 90 ? a : 2 * a, 2)
    const choices = options(random, answer, [whole(2 * radius, 'diameter'), ratio(a, angle === 90 ? 4 : 2, 'calculation'), whole(radius + a, 'calculation')])
    return choices && build(2, 'radius', say(`Triangelu batean $a=${a}$ eta $A=${angle}°$ dira. Zenbat da zirkunferentzia zirkunskribatuaren erradioa?`, `En un triángulo, $a=${a}$ y $A=${angle}°$. ¿Cuánto mide el radio de la circunferencia circunscrita?`, `في مثلث: $a=${a}$ و$A=${angle}°$. كم نصف قطر الدائرة المحيطة؟`, `In a triangle, $a=${a}$ and $A=${angle}°$. What is the radius of the circumscribed circle?`), choices, answer, same(`2R=\\frac{${a}}{\\sen ${angle}°}=${2 * radius}`), { a, angle })
}

/* ---------- Circuit 3: the cosine rule ---------- */

// b² + c² − bc and b² + c² + bc that are squares: 60° and 120°
const SIXTY: Array<[number, number, number]> = [[3, 8, 7], [5, 8, 7], [8, 15, 13], [7, 15, 13], [5, 21, 19], [16, 21, 19]]
const ONE_TWENTY: Array<[number, number, number]> = [[3, 5, 7], [7, 8, 13], [6, 10, 14], [5, 16, 19], [9, 15, 21]]

function cosineSideQuestion(random: Random): TrianglesRaceQuestion | null {
    const obtuse = pick(random, [false, true])
    const [b, c, a] = pick(random, obtuse ? ONE_TWENTY : SIXTY)
    const angle = obtuse ? 120 : 60
    const answer = fraction(a)
    const flipped = b * b + c * c + (obtuse ? -b * c : b * c)
    const choices = options(random, answer, [whole(Math.sqrt(flipped), 'cosine-sign'), whole(b + c, 'added'), { value: fraction(Math.round(Math.sqrt(b * b + c * c) * 100), 100), error: 'no-cosine' }])
    return choices && build(3, 'cosine-side', say(`ABC triangeluan $b=${b}$, $c=${c}$ eta $A=${angle}°$ dira. Zenbat da $a$?`, `En el triángulo ABC, $b=${b}$, $c=${c}$ y $A=${angle}°$. ¿Cuánto mide $a$?`, `في المثلث ABC: $b=${b}$ و$c=${c}$ و$A=${angle}°$. كم طول $a$؟`, `In triangle ABC, $b=${b}$, $c=${c}$ and $A=${angle}°$. How long is $a$?`), choices, answer, same(`a^2=${b * b}+${c * c}-${2 * b * c}\\cdot\\cos ${angle}°=${a * a}`), { b, c, angle, a })
}

function angleQuestion(random: Random): TrianglesRaceQuestion | null {
    const obtuse = pick(random, [false, true])
    const [b, c, a] = pick(random, obtuse ? ONE_TWENTY : SIXTY)
    const angle = obtuse ? 120 : 60
    const answer = fraction(angle)
    const choices = options(random, answer, [whole(180 - angle, 'supplement'), whole(90, 'calculation'), whole(angle / 2, 'calculation')])
    return choices && build(3, 'angle', say(`Triangelu baten aldeak ${b}, ${c} eta ${a} dira. Zenbat neurtzen du ${a} aldearen aurkako angeluak?`, `Los lados de un triángulo miden ${b}, ${c} y ${a}. ¿Cuánto mide el ángulo opuesto al lado ${a}?`, `أضلاع مثلث ${b} و${c} و${a}. كم قياس الزاوية المقابلة للضلع ${a}؟`, `The sides of a triangle are ${b}, ${c} and ${a}. What is the angle opposite the side ${a}?`), choices, answer, same(`\\cos A=\\frac{${b * b}+${c * c}-${a * a}}{${2 * b * c}}=${obtuse ? '-' : ''}\\frac{1}{2}`), { b, c, a, angle })
}

function largestQuestion(random: Random): TrianglesRaceQuestion | null {
    const [b, c, a] = pick(random, ONE_TWENTY)
    const answer = fraction(a)
    const choices = options(random, answer, [whole(b, 'calculation'), whole(c, 'calculation'), whole(b + c, 'added')])
    return choices && build(3, 'largest', say(`Triangelu baten aldeak ${b}, ${c} eta $x$ dira, eta $x$ aldearen aurkako angelua 120° da. Zenbat da $x$?`, `Un triángulo tiene lados ${b}, ${c} y $x$, y el ángulo opuesto a $x$ mide 120°. ¿Cuánto vale $x$?`, `أضلاع مثلث ${b} و${c} و$x$، والزاوية المقابلة لـ $x$ قياسها 120°. كم $x$؟`, `A triangle has sides ${b}, ${c} and $x$, and the angle opposite $x$ is 120°. What is $x$?`), choices, answer, same(`x^2=${b * b}+${c * c}+${b * c}=${a * a}`), { b, c, a })
}

/* ---------- Circuit 4: areas and problems ---------- */

function areaQuestion(random: Random): TrianglesRaceQuestion | null {
    const b = randomInt(random, 2, 12)
    const c = randomInt(random, 2, 12)
    const angle = pick(random, [30, 150])
    if ((b * c) % 4 !== 0) return null
    const answer = fraction(b * c, 4)
    const choices = options(random, answer, [ratio(b * c, 2, 'no-half'), whole(b * c, 'no-half'), ratio(b * c * 3, 4, 'calculation')])
    return choices && build(4, 'area', say(`Triangelu baten bi aldeak ${b} eta ${c} dira, eta ${angle}° osatzen dute. Zenbat da azalera?`, `Dos lados de un triángulo miden ${b} y ${c} y forman ${angle}°. ¿Cuál es el área?`, `ضلعان في مثلث ${b} و${c} وبينهما ${angle}°. ما المساحة؟`, `Two sides of a triangle are ${b} and ${c} and make ${angle}°. What is the area?`), choices, answer, same(`S=\\frac{1}{2}\\cdot ${b}\\cdot ${c}\\cdot\\sen ${angle}°=${b * c / 4}`), { b, c, angle })
}

const HERON: Array<[number, number, number, number]> = [[5, 12, 13, 30], [6, 8, 10, 24], [13, 14, 15, 84], [9, 10, 17, 36], [7, 15, 20, 42], [10, 13, 13, 60], [5, 5, 6, 12], [5, 5, 8, 12]]

function heronQuestion(random: Random): TrianglesRaceQuestion | null {
    const [x, y, z, area] = pick(random, HERON)
    const s = (x + y + z) / 2
    const answer = fraction(area)
    const choices = options(random, answer, [whole(area * 4, 'perimeter'), whole(x * y / 2, 'calculation'), whole(s, 'calculation')])
    return choices && build(4, 'heron', say(`Zenbat da aldeak ${x}, ${y} eta ${z} dituen triangeluaren azalera?`, `¿Cuál es el área del triángulo de lados ${x}, ${y} y ${z}?`, `ما مساحة المثلث الذي أضلاعه ${x} و${y} و${z}؟`, `What is the area of the triangle with sides ${x}, ${y} and ${z}?`), choices, answer, same(`S=\\sqrt{${s}\\cdot ${s - x}\\cdot ${s - y}\\cdot ${s - z}}=${area}`), { x, y, z, area })
}

function forcesQuestion(random: Random): TrianglesRaceQuestion | null {
    const [p, q, h] = pick(random, TRIPLES)
    const k = pick(random, [1, 2, 5, 10])
    const answer = fraction(h * k)
    const choices = options(random, answer, [whole((p + q) * k, 'added'), whole((q - p) * k, 'calculation'), whole(q * k, 'calculation')])
    return choices && build(4, 'forces', say(`${p * k} N eta ${q * k} N-eko bi indar elkarzutak dira. Zenbatekoa da erresultantea?`, `Dos fuerzas de ${p * k} N y ${q * k} N son perpendiculares. ¿Cuánto mide la resultante?`, `قوتان ${p * k} N و${q * k} N متعامدتان. كم مقدار المحصلة؟`, `Two forces of ${p * k} N and ${q * k} N are perpendicular. How big is the resultant?`), choices, answer, same(`R=\\sqrt{${p * k}^2+${q * k}^2}=${h * k}`), { p: p * k, q: q * k, h: h * k })
}

const circuitGenerators: Array<Array<(random: Random, tier: Tier) => TrianglesRaceQuestion | null>> = [
    [reduceQuestion, quadrantQuestion, obtuseQuestion],
    [hypotenuseQuestion, legQuestion, heightQuestion],
    [sineSideQuestion, countQuestion, radiusQuestion],
    [cosineSideQuestion, angleQuestion, largestQuestion],
    [areaQuestion, heronQuestion, forcesQuestion]
]

export function generateTrianglesRaceQuestion(random: Random, circuit: number, tier: Tier): TrianglesRaceQuestion {
    const generators = circuitGenerators[circuit] ?? circuitGenerators[0]
    for (let attempt = 0; attempt < 600; attempt += 1) {
        const next = pick(random, generators)(random, tier)
        if (next) return next
    }
    throw new Error(`No question for circuit ${circuit}`)
}

export function checkTrianglesPitAnswer(question: RaceQuestion<TrianglesRaceError>, input: string): AnswerCheck {
    return checkAnswer(readTrigonometryAnswer(input), question.answer, question.answerForm)
}

export function trianglesParTime(circuit: number): number {
    return parTimeFor([12, 12, 13, 14, 13][circuit] ?? 13)
}

export const trianglesRaceErrorTips: Record<TrianglesRaceError, LocalizedText> = {
    'decimal-part': say('Kendu bira osoak: hondarra da angelua, ez zatiketaren hamartarrak.', 'Quita vueltas enteras: el ángulo es el resto, no los decimales de la división.', 'احذف الدورات الكاملة: الزاوية هي الباقي لا الأجزاء العشرية من القسمة.', 'Take away whole turns: the angle is the remainder, not the decimals of the division.'),
    'one-turn': say('Bira bat baino gehiago egon daitezke: kendu 360° behar adina aldiz.', 'Puede haber más de una vuelta: quita 360° las veces que haga falta.', 'قد توجد أكثر من دورة: احذف 360° بقدر ما يلزم.', 'There may be more than one turn: take away 360° as many times as needed.'),
    sign: say('Begiratu koadranteari: zeinua hark ematen du.', 'Mira el cuadrante: él da el signo.', 'انظر إلى الربع: هو يعطي الإشارة.', 'Look at the quadrant: it gives the sign.'),
    swapped: say('Hori sinua da, ez kosinua.', 'Ese es el seno, no el coseno.', 'هذا الجيب لا جيب التمام.', 'That is the sine, not the cosine.'),
    acute: say('Kalkulagailuak zorrotza ematen du; kamutsa 180° ken hura da.', 'La calculadora da el agudo; el obtuso es 180° menos ese.', 'تعطي الآلة الحاسبة الحادة؛ والمنفرجة 180° ناقصها.', 'The calculator gives the acute one; the obtuse one is 180° minus it.'),
    'cosine-symmetry': say('360° − α angeluak kosinu bera du, ez sinu bera.', '360° − α tiene el mismo coseno, no el mismo seno.', '360° − α لها جيب التمام نفسه لا الجيب نفسه.', '360° − α has the same cosine, not the same sine.'),
    added: say('Aldeak edo indarrak ez dira zuzenean batzen: Pitagoras edo kosinua.', 'Los lados o las fuerzas no se suman sin más: Pitágoras o el coseno.', 'لا تُجمع الأضلاع أو القوى مباشرة: فيثاغورس أو جيب التمام.', 'Sides or forces do not simply add: Pythagoras or the cosine.'),
    'other-ratio': say('Begiratu zein arrazoi lotzen dituen datua eta ezezaguna.', 'Mira qué razón une el dato y la incógnita.', 'انظر أي نسبة تربط المعطى بالمجهول.', 'Look at which ratio links the given value and the unknown.'),
    'wrong-pair': say('Alde bakoitza bere aurkako angeluaren sinuarekin.', 'Cada lado con el seno de su ángulo opuesto.', 'كل ضلع مع جيب الزاوية المقابلة له.', 'Each side with the sine of its opposite angle.'),
    count: say('Konparatu a altuerarekin (h = b · sin A) eta b aldearekin.', 'Compara a con la altura (h = b · sen A) y con b.', 'قارن a بالارتفاع (h = b · sin A) وبـ b.', 'Compare a with the height (h = b · sin A) and with b.'),
    diameter: say('a / sin A diametroa da: erradioa haren erdia.', 'a / sen A es el diámetro: el radio es la mitad.', 'a / sin A هو القطر: ونصف القطر نصفه.', 'a / sin A is the diameter: the radius is half of it.'),
    'no-cosine': say('Hori Pitagoras da: A ez bada 90°, −2bc · cos A falta da.', 'Eso es Pitágoras: si A no es 90°, falta −2bc · cos A.', 'هذا فيثاغورس: إذا لم تكن A قائمة نقص −2bc · cos A.', 'That is Pythagoras: if A is not 90°, −2bc · cos A is missing.'),
    'cosine-sign': say('Kontuz cos 120° zeinuarekin: negatiboa da.', 'Cuidado con el signo de cos 120°: es negativo.', 'انتبه لإشارة cos 120°: إنها سالبة.', 'Watch the sign of cos 120°: it is negative.'),
    supplement: say('Kosinuaren zeinuak esaten du zorrotza ala kamutsa den.', 'El signo del coseno dice si es agudo u obtuso.', 'إشارة جيب التمام تقول هل هي حادة أم منفرجة.', 'The sign of the cosine tells you whether it is acute or obtuse.'),
    'no-half': say('Azalera ½ · b · c · sin A da: ez ahaztu erdia eta sinua.', 'El área es ½ · b · c · sen A: no olvides la mitad y el seno.', 'المساحة ½ · b · c · sin A: لا تنسَ النصف والجيب.', 'The area is ½ · b · c · sin A: do not forget the half and the sine.'),
    perimeter: say('Heronek perimetro-erdia erabiltzen du, ez perimetroa.', 'Herón usa el semiperímetro, no el perímetro.', 'تستعمل صيغة هيرون نصف المحيط لا المحيط.', 'Heron uses the semi-perimeter, not the perimeter.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}

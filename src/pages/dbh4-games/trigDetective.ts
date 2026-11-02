import { pick, type Random } from '../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'
import { say } from '../dbh4-akademikoak-trigonometria/text.ts'
import { TRIPLES } from './trigonometry.ts'

/* ==========================================================================
   Trigonometriaren detektibea (4. DBH academic): a worked solution of three
   lines with one wrong line. Lines write \sen and \tg; the game passes the
   unit's `localize` so each language reads its names. Level 1: right
   triangles (cos for sen, the tangent upside down, sen for the elevation);
   level 2: identities (sen + cos = 1, the sign of the quadrant, tg = cos/sen,
   the reduction with 90°); level 3: areas, heights and radians.
   ========================================================================== */

export type TrigDetectiveError =
    | 'cos-for-sen'
    | 'tan-inverted'
    | 'elevation-sine'
    | 'identity-no-square'
    | 'quadrant-sign'
    | 'tan-upside-down'
    | 'reduction-ninety'
    | 'area-no-half'
    | 'oblique-cosine'
    | 'degrees-radians'

export const trigDetectiveLevels: TrigDetectiveError[][] = [
    ['cos-for-sen', 'tan-inverted', 'elevation-sine'],
    ['identity-no-square', 'quadrant-sign', 'tan-upside-down', 'reduction-ninety'],
    ['area-no-half', 'oblique-cosine', 'degrees-radians']
]

export const TRIG_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    ratio: say('Arrazoia', 'Razón', 'النسبة', 'Ratio'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    identity: say('Identitatea', 'Identidad', 'المتطابقة', 'Identity'),
    sign: say('Zeinua', 'Signo', 'الإشارة', 'Sign'),
    reduction: say('Lehen koadrantera', 'Al primer cuadrante', 'إلى الربع الأول', 'To the first quadrant'),
    area: say('Azalera', 'Área', 'المساحة', 'Area'),
    height: say('Altuera', 'Altura', 'الارتفاع', 'Height'),
    convert: say('Bihurketa', 'Conversión', 'التحويل', 'Conversion')
}

export const trigDetectiveNames: Record<TrigDetectiveError, LocalizedText> = {
    'cos-for-sen': say('Kosinua erabili du, sinua beharrean', 'Usó el coseno en vez del seno', 'استعمل جيب التمام بدل الجيب', 'Used the cosine instead of the sine'),
    'tan-inverted': say('Tangentez biderkatu du, zatitu beharrean', 'Multiplicó por la tangente en vez de dividir', 'ضرب في الظل بدل القسمة', 'Multiplied by the tangent instead of dividing'),
    'elevation-sine': say('Sinua erabili du, tangentea beharrean', 'Usó el seno en vez de la tangente', 'استعمل الجيب بدل الظل', 'Used the sine instead of the tangent'),
    'identity-no-square': say('Karratuak ahaztu ditu: $\\sen\\alpha+\\cos\\alpha=1$', 'Olvidó los cuadrados: $\\sen\\alpha+\\cos\\alpha=1$', 'نسي المربعات: $\\sen\\alpha+\\cos\\alpha=1$', 'Forgot the squares: $\\sen\\alpha+\\cos\\alpha=1$'),
    'quadrant-sign': say('Koadrantearen zeinua ahaztu du', 'Olvidó el signo del cuadrante', 'نسي إشارة الربع', 'Forgot the sign of the quadrant'),
    'tan-upside-down': say('Tangentea alderantziz egin du', 'Hizo la tangente al revés', 'حسب الظل مقلوبًا', 'Worked out the tangent upside down'),
    'reduction-ninety': say('90° kendu du, 180° beharrean', 'Restó 90° en vez de 180°', 'طرح 90° بدل 180°', 'Took away 90° instead of 180°'),
    'area-no-half': say('Ez du 2 zatitu', 'No dividió entre 2', 'لم يقسم على 2', 'Did not divide by 2'),
    'oblique-cosine': say('Altuerarako kosinua erabili du', 'Usó el coseno para la altura', 'استعمل جيب التمام للارتفاع', 'Used the cosine for the height'),
    'degrees-radians': say('$\\pi$ radian $360^{\\circ}$ direla pentsatu du', 'Pensó que $\\pi$ radianes son $360^{\\circ}$', 'ظن أن $\\pi$ راديان تساوي $360^{\\circ}$', 'Thought that $\\pi$ radians are $360^{\\circ}$')
}

export const trigDetectiveTips: Record<TrigDetectiveError, LocalizedText> = {
    'cos-for-sen': say('Aurkako katetoa: $\\sen\\alpha=\\frac{a}{h}$.', 'El cateto opuesto: $\\sen\\alpha=\\frac{a}{h}$.', 'الضلع المقابل: $\\sen\\alpha=\\frac{a}{h}$.', 'The opposite side: $\\sen\\alpha=\\frac{a}{h}$.'),
    'tan-inverted': say('$\\tg\\alpha=\\frac{a}{b}$, beraz $b=\\frac{a}{\\tg\\alpha}$.', '$\\tg\\alpha=\\frac{a}{b}$, así que $b=\\frac{a}{\\tg\\alpha}$.', '$\\tg\\alpha=\\frac{a}{b}$ إذن $b=\\frac{a}{\\tg\\alpha}$.', '$\\tg\\alpha=\\frac{a}{b}$, so $b=\\frac{a}{\\tg\\alpha}$.'),
    'elevation-sine': say('Altuera eta distantzia katetoak dira: $h=d\\cdot\\tg\\alpha$.', 'Altura y distancia son catetos: $h=d\\cdot\\tg\\alpha$.', 'الارتفاع والمسافة ضلعا القائمة: $h=d\\cdot\\tg\\alpha$.', 'Height and distance are the two legs: $h=d\\cdot\\tg\\alpha$.'),
    'identity-no-square': say('$\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$.', '$\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$.', '$\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$.', '$\\sen^{2}\\alpha+\\cos^{2}\\alpha=1$.'),
    'quadrant-sign': say('II. koadrantean kosinua eta tangentea negatiboak dira.', 'En el II cuadrante, coseno y tangente son negativos.', 'في الربع الثاني جيب التمام والظل سالبان.', 'In quadrant II, cosine and tangent are negative.'),
    'tan-upside-down': say('$\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$.', '$\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$.', '$\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$.', '$\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}$.'),
    'reduction-ninety': say('II. koadrantean: $\\sen(180^{\\circ}-\\alpha)=\\sen\\alpha$.', 'En el II cuadrante: $\\sen(180^{\\circ}-\\alpha)=\\sen\\alpha$.', 'في الربع الثاني: $\\sen(180^{\\circ}-\\alpha)=\\sen\\alpha$.', 'In quadrant II: $\\sen(180^{\\circ}-\\alpha)=\\sen\\alpha$.'),
    'area-no-half': say('$A=\\frac{1}{2}\\cdot a\\cdot b\\cdot\\sen C$.', '$A=\\frac{1}{2}\\cdot a\\cdot b\\cdot\\sen C$.', '$A=\\frac{1}{2}\\cdot a\\cdot b\\cdot\\sen C$.', '$A=\\frac{1}{2}\\cdot a\\cdot b\\cdot\\sen C$.'),
    'oblique-cosine': say('Altuera aurkako katetoa da: $h=c\\cdot\\sen A$.', 'La altura es el cateto opuesto: $h=c\\cdot\\sen A$.', 'الارتفاع هو الضلع المقابل: $h=c\\cdot\\sen A$.', 'The height is the opposite side: $h=c\\cdot\\sen A$.'),
    'degrees-radians': say('$\\pi\\ \\text{rad}=180^{\\circ}$.', '$\\pi\\ \\text{rad}=180^{\\circ}$.', '$\\pi\\ \\text{rad}=180^{\\circ}$.', '$\\pi\\ \\text{rad}=180^{\\circ}$.')
}

type Built = Omit<WorkedCase<TrigDetectiveError>, 'options'>

/** sen, cos and tg of 30°, 45° and 60°: exact LaTeX and value */
const NOTABLE: Record<30 | 45 | 60, Record<'sen' | 'cos' | 'tg', [string, number]>> = {
    30: { sen: ['\\frac{1}{2}', 0.5], cos: ['\\frac{\\sqrt{3}}{2}', Math.sqrt(3) / 2], tg: ['\\frac{\\sqrt{3}}{3}', Math.sqrt(3) / 3] },
    45: { sen: ['\\frac{\\sqrt{2}}{2}', Math.SQRT1_2], cos: ['\\frac{\\sqrt{2}}{2}', Math.SQRT1_2], tg: ['1', 1] },
    60: { sen: ['\\frac{\\sqrt{3}}{2}', Math.sqrt(3) / 2], cos: ['\\frac{1}{2}', 0.5], tg: ['\\sqrt{3}', Math.sqrt(3)] }
}

/** k·(value) as exact LaTeX: 10·√3/2 → 5\sqrt{3}; k·1/2 → k/2; k·√3/3 → (k/3)\sqrt{3} */
function times(k: number, angle: 30 | 45 | 60, ratio: 'sen' | 'cos' | 'tg'): string | null {
    const [latex] = NOTABLE[angle][ratio]
    const match = latex.match(/^(?:\\frac\{(\\sqrt\{(\d)\}|1)\}\{(\d)\}|\\sqrt\{(\d)\}|1)$/)!
    const root = match[2] ?? match[4] ?? null
    const denominator = Number(match[3] ?? 1)
    if (k % denominator !== 0) return null
    const coefficient = k / denominator
    return root ? `${coefficient === 1 ? '' : coefficient}\\sqrt{${root}}` : String(coefficient)
}

function build(random: Random, error: TrigDetectiveError): Built | null {
    switch (error) {
        case 'cos-for-sen': {
            const angle = pick(random, [30, 45, 60] as const)
            const h = pick(random, [4, 6, 8, 10, 12, 20])
            const [rightLatex, wrongLatex] = [times(h, angle, 'sen'), times(h, angle, 'cos')]
            if (!rightLatex || !wrongLatex || angle === 45) return null
            return {
                problem: say(`Triangelu angeluzuzena: hipotenusa $${h}\\ \\text{cm}$ eta $\\alpha=${angle}^{\\circ}$. Kalkulatu α-ren aurkako katetoa, $a$.`, `Triángulo rectángulo: hipotenusa $${h}\\ \\text{cm}$ y $\\alpha=${angle}^{\\circ}$. Halla el cateto opuesto a α, $a$.`, `مثلث قائم: الوتر $${h}\\ \\text{cm}$ و$\\alpha=${angle}^{\\circ}$. أوجد الضلع المقابل للزاوية α، أي $a$.`, `Right triangle: hypotenuse $${h}\\ \\text{cm}$ and $\\alpha=${angle}^{\\circ}$. Find the side opposite α, $a$.`),
                lines: [line(LABELS.ratio, `a=${h}\\cdot\\cos ${angle}^{\\circ}`), line(LABELS.substitute, `a=${h}\\cdot ${NOTABLE[angle].cos[0]}`), line(LABELS.result, `a=${wrongLatex}`)],
                wrong: 0, error, fix: `a=${h}\\cdot\\sen ${angle}^{\\circ}=${rightLatex}`, right: h * NOTABLE[angle].sen[1], reached: h * NOTABLE[angle].cos[1]
            }
        }
        case 'tan-inverted': {
            const angle = pick(random, [30, 60] as const)
            const a = pick(random, [3, 6, 9, 12])
            const [tg] = NOTABLE[angle].tg
            // b = a / tg: for 60°, a/√3 = (a/3)√3; for 30°, a/(√3/3) = a√3
            const right = a / NOTABLE[angle].tg[1]
            const reached = a * NOTABLE[angle].tg[1]
            const rightLatex = angle === 60 ? `${a / 3 === 1 ? '' : a / 3}\\sqrt{3}` : `${a}\\sqrt{3}`
            const reachedLatex = angle === 60 ? `${a}\\sqrt{3}` : `${a / 3 === 1 ? '' : a / 3}\\sqrt{3}`
            return {
                problem: say(`Triangelu angeluzuzena: α-ren aurkako katetoa $a=${a}\\ \\text{cm}$ eta $\\alpha=${angle}^{\\circ}$. Kalkulatu ondoko katetoa, $b$.`, `Triángulo rectángulo: el cateto opuesto a α mide $a=${a}\\ \\text{cm}$ y $\\alpha=${angle}^{\\circ}$. Halla el cateto contiguo, $b$.`, `مثلث قائم: الضلع المقابل للزاوية α هو $a=${a}\\ \\text{cm}$ و$\\alpha=${angle}^{\\circ}$. أوجد الضلع المجاور $b$.`, `Right triangle: the side opposite α is $a=${a}\\ \\text{cm}$ and $\\alpha=${angle}^{\\circ}$. Find the adjacent side, $b$.`),
                lines: [line(LABELS.ratio, `b=${a}\\cdot\\tg ${angle}^{\\circ}`), line(LABELS.substitute, `b=${a}\\cdot ${tg}`), line(LABELS.result, `b=${reachedLatex}`)],
                wrong: 0, error, fix: `b=\\frac{${a}}{\\tg ${angle}^{\\circ}}=${rightLatex}`, right, reached
            }
        }
        case 'elevation-sine': {
            const angle = pick(random, [30, 45, 60] as const)
            const d = pick(random, [6, 12, 18, 24, 30])
            const [rightLatex, wrongLatex] = [times(d, angle, 'tg'), times(d, angle, 'sen')]
            if (!rightLatex || !wrongLatex) return null
            return {
                problem: say(`Dorre baten oinetik $${d}\\ \\text{m}$-ra, goialdea $${angle}^{\\circ}$-ko angeluz ikusten da. Zer altuera du?`, `A $${d}\\ \\text{m}$ del pie de una torre, su punta se ve con un ángulo de $${angle}^{\\circ}$. ¿Qué altura tiene?`, `على بعد $${d}\\ \\text{m}$ من أسفل برج تُرى قمته بزاوية $${angle}^{\\circ}$. ما ارتفاعه؟`, `At $${d}\\ \\text{m}$ from the foot of a tower, its top is seen at an angle of $${angle}^{\\circ}$. How tall is it?`),
                lines: [line(LABELS.ratio, `h=${d}\\cdot\\sen ${angle}^{\\circ}`), line(LABELS.substitute, `h=${d}\\cdot ${NOTABLE[angle].sen[0]}`), line(LABELS.result, `h=${wrongLatex}\\ \\text{m}`)],
                wrong: 0, error, fix: `h=${d}\\cdot\\tg ${angle}^{\\circ}=${rightLatex}`, right: d * NOTABLE[angle].tg[1], reached: d * NOTABLE[angle].sen[1]
            }
        }
        case 'identity-no-square': {
            const [p, q, r] = pick(random, TRIPLES)
            return {
                problem: say(`$\\sen\\alpha=\\frac{${p}}{${r}}$ eta α lehen koadrantean. Kalkulatu $\\cos\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${r}}$ con α en el primer cuadrante. Halla $\\cos\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${r}}$ وα في الربع الأول. أوجد $\\cos\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${r}}$ with α in the first quadrant. Find $\\cos\\alpha$.`),
                lines: [line(LABELS.identity, `\\cos\\alpha=1-\\sen\\alpha`), line(LABELS.substitute, `\\cos\\alpha=1-\\frac{${p}}{${r}}`), line(LABELS.result, `\\cos\\alpha=\\frac{${r - p}}{${r}}`)],
                wrong: 0, error, fix: `\\cos\\alpha=\\sqrt{1-\\frac{${p * p}}{${r * r}}}=\\frac{${q}}{${r}}`, right: q / r, reached: (r - p) / r
            }
        }
        case 'quadrant-sign': {
            const [p, q, r] = pick(random, TRIPLES)
            return {
                problem: say(`$\\sen\\alpha=\\frac{${p}}{${r}}$ eta α bigarren koadrantean. Kalkulatu $\\tg\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${r}}$ con α en el segundo cuadrante. Halla $\\tg\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${r}}$ وα في الربع الثاني. أوجد $\\tg\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${r}}$ with α in the second quadrant. Find $\\tg\\alpha$.`),
                lines: [line(LABELS.identity, `\\cos^{2}\\alpha=\\frac{${q * q}}{${r * r}}`), line(LABELS.sign, `\\cos\\alpha=\\frac{${q}}{${r}}`), line(LABELS.result, `\\tg\\alpha=\\frac{${p}}{${q}}`)],
                wrong: 1, error, fix: `\\cos\\alpha=-\\frac{${q}}{${r}}\\ \\to\\ \\tg\\alpha=-\\frac{${p}}{${q}}`, right: -p / q, reached: p / q
            }
        }
        case 'tan-upside-down': {
            const [p, q, r] = pick(random, TRIPLES)
            return {
                problem: say(`$\\sen\\alpha=\\frac{${p}}{${r}}$ eta $\\cos\\alpha=\\frac{${q}}{${r}}$. Kalkulatu $\\tg\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${r}}$ y $\\cos\\alpha=\\frac{${q}}{${r}}$. Halla $\\tg\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${r}}$ و$\\cos\\alpha=\\frac{${q}}{${r}}$. أوجد $\\tg\\alpha$.`, `$\\sen\\alpha=\\frac{${p}}{${r}}$ and $\\cos\\alpha=\\frac{${q}}{${r}}$. Find $\\tg\\alpha$.`),
                lines: [line(LABELS.identity, `\\tg\\alpha=\\frac{\\cos\\alpha}{\\sen\\alpha}`), line(LABELS.substitute, `\\tg\\alpha=\\frac{${q}}{${r}}\\div\\frac{${p}}{${r}}`), line(LABELS.result, `\\tg\\alpha=\\frac{${q}}{${p}}`)],
                wrong: 0, error, fix: `\\tg\\alpha=\\frac{\\sen\\alpha}{\\cos\\alpha}=\\frac{${p}}{${q}}`, right: p / q, reached: q / p
            }
        }
        case 'reduction-ninety': {
            const angle = pick(random, [120, 135, 150])
            const reducedWrong = angle - 90
            const reducedRight = 180 - angle
            if (reducedWrong === reducedRight) return null
            const value = (degrees: number) => NOTABLE[degrees as 30 | 45 | 60].sen
            return {
                problem: say(`Kalkulatu $\\sen ${angle}^{\\circ}$ kalkulagailurik gabe.`, `Calcula $\\sen ${angle}^{\\circ}$ sin calculadora.`, `احسب $\\sen ${angle}^{\\circ}$ دون آلة حاسبة.`, `Work out $\\sen ${angle}^{\\circ}$ without a calculator.`),
                lines: [line(LABELS.reduction, `\\sen(${angle}^{\\circ}-90^{\\circ})`), line(LABELS.substitute, `\\sen ${reducedWrong}^{\\circ}`), line(LABELS.result, value(reducedWrong)[0])],
                wrong: 0, error, fix: `\\sen(180^{\\circ}-${angle}^{\\circ})\\ \\to\\ \\sen ${reducedRight}^{\\circ}=${value(reducedRight)[0]}`, right: value(reducedRight)[1], reached: value(reducedWrong)[1]
            }
        }
        case 'area-no-half': {
            const angle = pick(random, [30, 45, 60] as const)
            const a = pick(random, [4, 6, 8, 10])
            const b = pick(random, [3, 5, 6, 8, 12])
            const product = a * b
            const [rightLatex, wrongLatex] = [times(product / 2, angle, 'sen'), times(product, angle, 'sen')]
            if (!rightLatex || !wrongLatex || !Number.isInteger(product / 2)) return null
            return {
                problem: say(`Triangelu baten bi alde: $${a}\\ \\text{cm}$ eta $${b}\\ \\text{cm}$; haien arteko angelua $${angle}^{\\circ}$. Kalkulatu azalera.`, `Dos lados de un triángulo miden $${a}\\ \\text{cm}$ y $${b}\\ \\text{cm}$, y el ángulo entre ellos $${angle}^{\\circ}$. Halla el área.`, `ضلعا مثلث $${a}\\ \\text{cm}$ و$${b}\\ \\text{cm}$ والزاوية بينهما $${angle}^{\\circ}$. أوجد المساحة.`, `Two sides of a triangle are $${a}\\ \\text{cm}$ and $${b}\\ \\text{cm}$, with an angle of $${angle}^{\\circ}$ between them. Find the area.`),
                lines: [line(LABELS.area, `A=${a}\\cdot ${b}\\cdot\\sen ${angle}^{\\circ}`), line(LABELS.substitute, `A=${product}\\cdot ${NOTABLE[angle].sen[0]}`), line(LABELS.result, `A=${wrongLatex}`)],
                wrong: 0, error, fix: `A=\\frac{${a}\\cdot ${b}}{2}\\cdot\\sen ${angle}^{\\circ}\\ \\to\\ A=${rightLatex}`, right: (product / 2) * NOTABLE[angle].sen[1], reached: product * NOTABLE[angle].sen[1]
            }
        }
        case 'oblique-cosine': {
            const angle = pick(random, [30, 60] as const)
            const c = pick(random, [4, 6, 8, 10, 12])
            const [rightLatex, wrongLatex] = [times(c, angle, 'sen'), times(c, angle, 'cos')]
            if (!rightLatex || !wrongLatex) return null
            return {
                problem: say(`$ABC$ triangeluan, $c=AB=${c}\\ \\text{cm}$ eta $A=${angle}^{\\circ}$. Kalkulatu $B$ erpinetik $AC$ aldera doan altuera, $h$.`, `En el triángulo $ABC$, $c=AB=${c}\\ \\text{cm}$ y $A=${angle}^{\\circ}$. Halla la altura $h$ desde $B$ sobre el lado $AC$.`, `في المثلث $ABC$ يكون $c=AB=${c}\\ \\text{cm}$ و$A=${angle}^{\\circ}$. أوجد الارتفاع $h$ من $B$ على الضلع $AC$.`, `In triangle $ABC$, $c=AB=${c}\\ \\text{cm}$ and $A=${angle}^{\\circ}$. Find the height $h$ from $B$ onto side $AC$.`),
                lines: [line(LABELS.height, `h=${c}\\cdot\\cos ${angle}^{\\circ}`), line(LABELS.substitute, `h=${c}\\cdot ${NOTABLE[angle].cos[0]}`), line(LABELS.result, `h=${wrongLatex}`)],
                wrong: 0, error, fix: `h=${c}\\cdot\\sen ${angle}^{\\circ}=${rightLatex}`, right: c * NOTABLE[angle].sen[1], reached: c * NOTABLE[angle].cos[1]
            }
        }
        case 'degrees-radians': {
            const degrees = pick(random, [30, 45, 60, 90, 120, 135, 150, 270])
            const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y))
            const fraction = (top: number, bottom: number) => {
                const divisor = gcd(top, bottom)
                const [n, d] = [top / divisor, bottom / divisor]
                const numerator = n === 1 ? '\\pi' : `${n}\\pi`
                return d === 1 ? numerator : `\\frac{${numerator}}{${d}}`
            }
            return {
                problem: say(`Pasatu radianetara: $${degrees}^{\\circ}$`, `Pasa a radianes: $${degrees}^{\\circ}$`, `حوّل إلى الراديان: $${degrees}^{\\circ}$`, `Change into radians: $${degrees}^{\\circ}$`),
                lines: [line(LABELS.convert, `\\pi\\ \\text{rad}=360^{\\circ}`), line(LABELS.substitute, `\\frac{${degrees}\\cdot\\pi}{360}`), line(LABELS.result, fraction(degrees, 360))],
                wrong: 0, error, fix: `\\pi\\ \\text{rad}=180^{\\circ}\\ \\to\\ \\frac{${degrees}\\cdot\\pi}{180}=${fraction(degrees, 180)}`, right: (degrees * Math.PI) / 180, reached: (degrees * Math.PI) / 360
            }
        }
    }
}

export const createTrigDetectiveCases = (random: Random, levelIndex: number) => createWorkedCases(random, trigDetectiveLevels[levelIndex], TRIG_DETECTIVE_CASES, build)

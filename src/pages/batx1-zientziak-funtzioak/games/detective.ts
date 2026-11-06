import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../text.ts'

/* ==========================================================================
   J4 · Funtzioen detektibea (Detective de funciones): a worked solution
   of three lines with one wrong line, the mistakes of this unit. Level 1:
   a logarithm with ≥ 0, a domain that forgets the denominator, a
   translation the wrong way, «odd» because of x³; level 2: the inverse as
   1/f, undoing in the wrong order, the inverse of 2ˣ + c, an arc cosine
   outside [0, π]; level 3: E(x) by cutting the decimals, the wrong piece,
   f ∘ g read left to right, the zeros of the numerator taken out of the
   domain of f/g. `right` and `reached` only tell the cases apart.
   ========================================================================== */

export type BachFunctionsDetectiveError =
    | 'log-closed'
    | 'denominator-forgotten'
    | 'shift-direction'
    | 'odd-by-term'
    | 'inverse-reciprocal'
    | 'inverse-order'
    | 'log-inverse'
    | 'arc-range'
    | 'floor-truncate'
    | 'piecewise-wrong'
    | 'compose-order'
    | 'quotient-zeros'

export const bachFunctionsDetectiveLevels: BachFunctionsDetectiveError[][] = [
    ['log-closed', 'denominator-forgotten', 'shift-direction', 'odd-by-term'],
    ['inverse-reciprocal', 'inverse-order', 'log-inverse', 'arc-range'],
    ['floor-truncate', 'piecewise-wrong', 'compose-order', 'quotient-zeros']
]

export const BACH_FUNCTIONS_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
const LABELS = {
    condition: say('Baldintza', 'Condición', 'الشرط', 'Condition'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    solve: say('Askatu', 'Despeja', 'اعزل', 'Solve'),
    piece: say('Zatia', 'Trozo', 'الجزء', 'Piece'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const domainOf = (formula: string) => say(`Aurkitu $${formula}$ funtzioaren izate-eremua.`, `Halla el dominio de $${formula}$.`, `أوجد مجال $${formula}$.`, `Find the domain of $${formula}$.`)
const inverseOf = (formula: string) => say(`Aurkitu $${formula}$ funtzioaren alderantzizkoa.`, `Halla la inversa de $${formula}$.`, `أوجد الدالة العكسية لـ $${formula}$.`, `Find the inverse of $${formula}$.`)
const work = (formula: string) => say(`Kalkulatu $${formula}$.`, `Calcula $${formula}$.`, `احسب $${formula}$.`, `Work out $${formula}$.`)

export const bachFunctionsDetectiveNames: Record<BachFunctionsDetectiveError, LocalizedText> = {
    'log-closed': say('Logaritmoari $\\ge 0$ jarri dio, eta $>0$ behar da', 'Puso $\\ge 0$ en el logaritmo, y hace falta $>0$', 'وضع $\\ge 0$ في اللوغاريتم والمطلوب $>0$', 'Used $\\ge 0$ for the logarithm, and it needs $>0$'),
    'denominator-forgotten': say('Izendatzailearen zeroa ahaztu du', 'Olvidó el cero del denominador', 'نسي صفر المقام', 'Forgot the zero of the denominator'),
    'shift-direction': say('$x+a$ eskuinera eraman du', 'Llevó $x+a$ a la derecha', 'نقل $x+a$ إلى اليمين', 'Moved $x+a$ to the right'),
    'odd-by-term': say('$-f(x)$ gaizki kalkulatu du', 'Calculó mal $-f(x)$', 'أخطأ في حساب $-f(x)$', 'Worked out $-f(x)$ wrongly'),
    'inverse-reciprocal': say('$f^{-1}$ eta $\\frac{1}{f}$ nahastu ditu', 'Confundió $f^{-1}$ con $\\frac{1}{f}$', 'خلط بين $f^{-1}$ و$\\frac{1}{f}$', 'Mixed up $f^{-1}$ and $\\frac{1}{f}$'),
    'inverse-order': say('Ordena okerrean desegin du', 'Deshizo en el orden equivocado', 'عكس بالترتيب الخاطئ', 'Undid it in the wrong order'),
    'log-inverse': say('Logaritmoa hartu du batugaia kendu aurretik', 'Tomó el logaritmo antes de quitar el sumando', 'أخذ اللوغاريتم قبل حذف الحد المضاف', 'Took the logarithm before removing the added term'),
    'arc-range': say('Arku kosinua $[0,\\pi]$ tartetik kanpo eman du', 'Dio un arco coseno fuera de $[0,\\pi]$', 'أعطى قوس جيب تمام خارج $[0,\\pi]$', 'Gave an arc cosine outside $[0,\\pi]$'),
    'floor-truncate': say('$E$ kalkulatzeko hamartarrak kendu ditu', 'Calculó $E$ quitando los decimales', 'حسب $E$ بحذف الأجزاء العشرية', 'Worked out $E$ by dropping the decimals'),
    'piecewise-wrong': say('Ez dagokion zatia erabili du', 'Usó el trozo que no toca', 'استعمل الجزء غير المناسب', 'Used the wrong piece'),
    'compose-order': say('$f\\circ g$ ezkerretik eskuinera irakurri du', 'Leyó $f\\circ g$ de izquierda a derecha', 'قرأ $f\\circ g$ من اليسار إلى اليمين', 'Read $f\\circ g$ from left to right'),
    'quotient-zeros': say('Zenbakitzailearen zeroa kendu du', 'Quitó el cero del numerador', 'حذف صفر البسط', 'Took out the zero of the numerator')
}

export const bachFunctionsDetectiveTips: Record<BachFunctionsDetectiveError, LocalizedText> = {
    'log-closed': say('$\\log 0$ ez dago: logaritmoaren barrukoak $>0$ izan behar du.', '$\\log 0$ no existe: lo de dentro del logaritmo tiene que ser $>0$.', '$\\log 0$ غير موجود: يجب أن يكون ما داخل اللوغاريتم $>0$.', '$\\log 0$ does not exist: the inside of a logarithm must be $>0$.'),
    'denominator-forgotten': say('Baldintza guztiak batera: erroa $\\ge 0$ eta izendatzailea $\\neq 0$.', 'Todas las condiciones a la vez: raíz $\\ge 0$ y denominador $\\neq 0$.', 'كل الشروط معًا: الجذر $\\ge 0$ والمقام $\\neq 0$.', 'Every condition at once: root $\\ge 0$ and denominator $\\neq 0$.'),
    'shift-direction': say('Erpina barrukoa 0 den lekuan dago: $x+a=0$, hau da, $x=-a$.', 'El vértice está donde lo de dentro vale 0: $x+a=0$, es decir, $x=-a$.', 'الرأس حيث يساوي ما بالداخل 0: $x+a=0$ أي $x=-a$.', 'The vertex is where the inside is 0: $x+a=0$, that is, $x=-a$.'),
    'odd-by-term': say('$-f(x)$ eginda, gai guztiei aldatzen zaie zeinua, baita konstanteari ere.', 'En $-f(x)$ cambia el signo de todos los términos, también el de la constante.', 'في $-f(x)$ تتغير إشارة كل الحدود، ومنها الثابت.', 'In $-f(x)$ every term changes sign, the constant too.'),
    'inverse-reciprocal': say('$f^{-1}$ funtzioak $f$ desegiten du: askatu $x$, eta trukatu letrak.', '$f^{-1}$ deshace $f$: despeja $x$ y cambia las letras.', '$f^{-1}$ تعكس $f$: اعزل $x$ وبدّل الحرفين.', '$f^{-1}$ undoes $f$: solve for $x$ and swap the letters.'),
    'inverse-order': say('Azkena egin dena desegiten da lehenik: lehenik kendu, gero zatitu.', 'Se deshace primero lo último que se hizo: primero restar y después dividir.', 'نعكس أولًا آخر ما فُعل: نطرح أولًا ثم نقسم.', 'Undo first what was done last: subtract first, then divide.'),
    'log-inverse': say('Lehenik isolatu $2^x=y-c$, eta gero hartu logaritmoa.', 'Primero aísla $2^x=y-c$ y después toma logaritmos.', 'اعزل أولًا $2^x=y-c$ ثم خذ اللوغاريتم.', 'First isolate $2^x=y-c$ and then take logarithms.'),
    'arc-range': say('Arku kosinuak beti ematen du $0$ eta $\\pi$ arteko angelu bat.', 'El arco coseno siempre da un ángulo entre $0$ y $\\pi$.', 'قوس جيب التمام يعطي دائمًا زاوية بين $0$ و$\\pi$.', 'The arc cosine always gives an angle between $0$ and $\\pi$.'),
    'floor-truncate': say('$E(x)$ beti beherantz: negatiboekin, aurreko osoa.', '$E(x)$ siempre hacia abajo: con negativos, el entero anterior.', '$E(x)$ دائمًا إلى الأسفل: مع السالبة العدد الصحيح السابق.', '$E(x)$ always rounds down: with negatives, the whole number below.'),
    'piecewise-wrong': say('Begiratu mutur bakoitzeko ikurrari: $\\ge$ daramanak barne hartzen du puntua.', 'Mira el signo de cada extremo: el que lleva $\\ge$ incluye el punto.', 'انظر إلى رمز كل طرف: الذي فيه $\\ge$ يشمل النقطة.', 'Look at the sign at each end: the one with $\\ge$ includes the point.'),
    'compose-order': say('$(f\\circ g)(x)=f(g(x))$: lehenik $g$.', '$(f\\circ g)(x)=f(g(x))$: primero $g$.', '$(f\\circ g)(x)=f(g(x))$: أولًا $g$.', '$(f\\circ g)(x)=f(g(x))$: $g$ first.'),
    'quotient-zeros': say('$\\frac{f}{g}$ funtzioan, izendatzailearen zeroak bakarrik kentzen dira.', 'En $\\frac{f}{g}$ solo se quitan los ceros del denominador.', 'في $\\frac{f}{g}$ لا تُحذف إلا أصفار المقام.', 'In $\\frac{f}{g}$ only the zeros of the denominator are removed.')
}

type Built = Omit<WorkedCase<BachFunctionsDetectiveError>, 'options'>

/** The arc cosines of the notable negative values, in thirds, quarters and sixths of π */
const ARC_COSINES = [
    { value: '-\\frac{1}{2}', base: '\\frac{1}{2}', small: '\\frac{\\pi}{3}', right: '\\frac{2\\pi}{3}', angle: 2 / 3 },
    { value: '-\\frac{\\sqrt{2}}{2}', base: '\\frac{\\sqrt{2}}{2}', small: '\\frac{\\pi}{4}', right: '\\frac{3\\pi}{4}', angle: 3 / 4 },
    { value: '-\\frac{\\sqrt{3}}{2}', base: '\\frac{\\sqrt{3}}{2}', small: '\\frac{\\pi}{6}', right: '\\frac{5\\pi}{6}', angle: 5 / 6 }
]

function build(random: Random, error: BachFunctionsDetectiveError): Built | null {
    switch (error) {
        case 'log-closed': {
            const a = randomInt(random, 1, 7)
            return {
                problem: domainOf(`f(x)=\\log(x-${a})`),
                lines: [line(LABELS.condition, `x-${a}\\ge 0`), line(LABELS.step, `x\\ge ${a}`), line(LABELS.result, `[${a},+\\infty)`)],
                wrong: 0, error, fix: `x-${a}>0\\ \\to\\ (${a},+\\infty)`, right: a + 0.5, reached: a
            }
        }
        case 'denominator-forgotten': {
            const a = randomInt(random, 1, 4)
            const b = a + randomInt(random, 1, 4)
            return {
                problem: domainOf(`f(x)=\\frac{\\sqrt{x-${a}}}{x-${b}}`),
                lines: [line(LABELS.condition, `x-${a}\\ge 0`), line(LABELS.step, `x\\ge ${a}`), line(LABELS.result, `[${a},+\\infty)`)],
                wrong: 0, error, fix: `x\\ge ${a},\\ x\\neq ${b}\\ \\to\\ [${a},${b})\\cup(${b},+\\infty)`, right: b, reached: a
            }
        }
        case 'shift-direction': {
            const a = randomInt(random, 1, 5)
            const k = randomInt(random, -4, 4)
            return {
                problem: say(`Aurkitu $y=(x+${a})^2${signed(k)}$ parabolaren erpina.`, `Halla el vértice de $y=(x+${a})^2${signed(k)}$.`, `أوجد رأس $y=(x+${a})^2${signed(k)}$.`, `Find the vertex of $y=(x+${a})^2${signed(k)}$.`),
                lines: [line(LABELS.step, `y=x^2\\ \\to\\ (0,0)`), line(LABELS.step, `x+${a}\\ \\to\\ (${a},0)`), line(LABELS.result, `(${a},${k})`)],
                wrong: 1, error, fix: `x+${a}=0\\ \\to\\ (-${a},${k})`, right: -a, reached: a
            }
        }
        case 'odd-by-term': {
            const c = pick(random, [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
            return {
                problem: say(`Aztertu $f(x)=x^3${signed(c)}$ funtzioaren simetria.`, `Estudia la simetría de $f(x)=x^3${signed(c)}$.`, `ادرس تناظر $f(x)=x^3${signed(c)}$.`, `Study the symmetry of $f(x)=x^3${signed(c)}$.`),
                lines: [line(LABELS.step, `f(-x)=-x^3${signed(c)}`), line(LABELS.step, `-f(x)=-x^3${signed(c)}`), line(LABELS.result, `f(-x)=-f(x)`)],
                wrong: 1, error, fix: `-f(x)=-x^3${signed(-c)}\\neq f(-x)`, right: 0, reached: 1
            }
        }
        case 'inverse-reciprocal': {
            const b = randomInt(random, 1, 6)
            if ((1 - b) * (2 + b) === 2) return null
            return {
                problem: inverseOf(`f(x)=2x+${b}`),
                lines: [line(LABELS.step, `y=2x+${b}`), line(LABELS.solve, `f^{-1}(x)=\\frac{1}{2x+${b}}`), line(LABELS.result, `f^{-1}(1)=\\frac{1}{${2 + b}}`)],
                wrong: 1, error, fix: `x=\\frac{y-${b}}{2}\\ \\to\\ f^{-1}(x)=\\frac{x-${b}}{2}`, right: (1 - b) / 2, reached: 1 / (2 + b)
            }
        }
        case 'inverse-order': {
            const a = randomInt(random, 2, 5)
            const b = randomInt(random, 1, 6)
            return {
                problem: inverseOf(`f(x)=${a}x+${b}`),
                lines: [line(LABELS.step, `y=${a}x+${b}`), line(LABELS.solve, `x=\\frac{y}{${a}}-${b}`), line(LABELS.result, `f^{-1}(x)=\\frac{x}{${a}}-${b}`)],
                wrong: 1, error, fix: `x=\\frac{y-${b}}{${a}}\\ \\to\\ f^{-1}(x)=\\frac{x-${b}}{${a}}`, right: -b / a, reached: -b
            }
        }
        case 'log-inverse': {
            const c = randomInt(random, 1, 6)
            return {
                problem: inverseOf(`f(x)=2^x+${c}`),
                lines: [line(LABELS.step, `y=2^x+${c}`), line(LABELS.solve, `x=\\log_2 y+${c}`), line(LABELS.result, `f^{-1}(x)=\\log_2 x+${c}`)],
                wrong: 1, error, fix: `2^x=y-${c}\\ \\to\\ f^{-1}(x)=\\log_2(x-${c})`, right: 2, reached: Math.log2(c + 4) + c
            }
        }
        case 'arc-range': {
            const arc = pick(random, ARC_COSINES)
            return {
                problem: work(`\\arccos\\left(${arc.value}\\right)`),
                lines: [line(LABELS.step, `\\cos ${arc.small}=${arc.base}`), line(LABELS.step, `\\arccos\\left(${arc.value}\\right)=-${arc.small}`), line(LABELS.result, `-${arc.small}`)],
                wrong: 1, error, fix: `\\cos ${arc.right}=${arc.value}\\ \\to\\ \\arccos\\left(${arc.value}\\right)=${arc.right}`, right: arc.angle, reached: -(1 - arc.angle)
            }
        }
        case 'floor-truncate': {
            const a = randomInt(random, 1, 6)
            const tenth = randomInt(random, 1, 9)
            const c = randomInt(random, 1, 6)
            const d = randomInt(random, 1, 9)
            return {
                problem: work(`E(-${a}{,}${tenth})+E(${c}{,}${d})`),
                lines: [line(LABELS.step, `E(-${a}{,}${tenth})=-${a}`), line(LABELS.step, `E(${c}{,}${d})=${c}`), line(LABELS.result, `-${a}+${c}=${c - a}`)],
                wrong: 0, error, fix: `E(-${a}{,}${tenth})=-${a + 1}\\ \\to\\ -${a + 1}+${c}=${c - a - 1}`, right: c - a - 1, reached: c - a
            }
        }
        case 'piecewise-wrong': {
            const t = randomInt(random, 1, 3)
            const a = randomInt(random, 1, 5)
            const b = randomInt(random, 1, 5)
            const left = t + a
            const right = t * t - b
            if (left === right) return null
            const formula = `f(x)=\\begin{cases}x+${a} & x<${t}\\\\ x^2-${b} & x\\ge ${t}\\end{cases}`
            return {
                problem: say(`$${formula}$ bada, kalkulatu $f(${t})$.`, `Si $${formula}$, calcula $f(${t})$.`, `إذا كانت $${formula}$ فاحسب $f(${t})$.`, `If $${formula}$, work out $f(${t})$.`),
                lines: [line(LABELS.piece, `x<${t}`), line(LABELS.step, `f(${t})=${t}+${a}`), line(LABELS.result, `${left}`)],
                wrong: 0, error, fix: `x\\ge ${t}\\ \\to\\ f(${t})=${t}^2-${b}=${right}`, right, reached: left
            }
        }
        case 'compose-order': {
            const a = randomInt(random, 1, 5)
            const r = randomInt(random, 1, 4)
            const right = (r + a) ** 2
            const reached = r * r + a
            if (right === reached) return null
            return {
                problem: say(`$f(x)=x^2$ eta $g(x)=x+${a}$ badira, kalkulatu $(f\\circ g)(${r})$.`, `Si $f(x)=x^2$ y $g(x)=x+${a}$, calcula $(f\\circ g)(${r})$.`, `إذا كانت $f(x)=x^2$ و$g(x)=x+${a}$ فاحسب $(f\\circ g)(${r})$.`, `If $f(x)=x^2$ and $g(x)=x+${a}$, work out $(f\\circ g)(${r})$.`),
                lines: [line(LABELS.step, `f(${r})=${r * r}`), line(LABELS.step, `g(${r * r})=${r * r}+${a}`), line(LABELS.result, `${reached}`)],
                wrong: 0, error, fix: `g(${r})=${r + a}\\ \\to\\ f(${r + a})=${right}`, right, reached
            }
        }
        case 'quotient-zeros': {
            const a = randomInt(random, -4, 4)
            const b = randomInt(random, -4, 4)
            if (a === b) return null
            const fa = a === 0 ? 'x' : `x${signed(-a)}`
            const gb = b === 0 ? 'x' : `x${signed(-b)}`
            return {
                problem: say(`$f(x)=${fa}$ eta $g(x)=${gb}$ badira, aurkitu $\\frac{f}{g}$ funtzioaren izate-eremua.`, `Si $f(x)=${fa}$ y $g(x)=${gb}$, halla el dominio de $\\frac{f}{g}$.`, `إذا كانت $f(x)=${fa}$ و$g(x)=${gb}$ فأوجد مجال $\\frac{f}{g}$.`, `If $f(x)=${fa}$ and $g(x)=${gb}$, find the domain of $\\frac{f}{g}$.`),
                lines: [line(LABELS.condition, `${fa}=0\\ \\to\\ x=${a}`), line(LABELS.step, `x\\neq ${a}`), line(LABELS.result, `\\mathbb{R}-\\{${a}\\}`)],
                wrong: 0, error, fix: `${gb}=0\\ \\to\\ \\mathbb{R}-\\{${b}\\}`, right: b, reached: a
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBachFunctionsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bachFunctionsDetectiveLevels[levelIndex], BACH_FUNCTIONS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

/** Every case of a level, for the tests */
export const BACH_FUNCTIONS_DETECTIVE_ERRORS = bachFunctionsDetectiveLevels.flat()

import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Limiteen detektibea · Batxilergoa 2 · Gizarte Zientziak (Detective de
   límites de 2.º Sociales): a solved exercise with exactly one wrong
   line, and the mistake to name. Level 1, limits at infinity: ∞ − ∞ = 0,
   1^∞ = 1, the quotient of the coefficients upside down, the sign of a
   cube at −∞. Level 2, a point and continuity: k/0 = 0, 0/0 read as «no
   limit», continuity checked with f(a) alone, the wrong piece at a
   joint. Level 3, economy and society: the long run read at t = 0, the
   average cost tending to the fixed cost, the jump taken as the
   difference of prices, the charge with no jump without the edge. The
   lines carry formulas only.
   ========================================================================== */

export type Bach2gLimitsDetectiveError =
    | 'infinity-minus'
    | 'one-infinity'
    | 'inverse-degrees'
    | 'minus-sign'
    | 'k-zero'
    | 'zero-no-limit'
    | 'value-only'
    | 'wrong-piece'
    | 'initial-value'
    | 'fixed-cost'
    | 'jump-price'
    | 'edge-forgot'

export const bach2gLimitsDetectiveLevels: Bach2gLimitsDetectiveError[][] = [
    ['infinity-minus', 'one-infinity', 'inverse-degrees', 'minus-sign'],
    ['k-zero', 'zero-no-limit', 'value-only', 'wrong-piece'],
    ['initial-value', 'fixed-cost', 'jump-price', 'edge-forgot']
]

export const BACH2G_LIMITS_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const tex = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')
const LABELS = {
    substitute: say('Ordezkatu', 'Sustituye', 'عوّض', 'Substitute'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    left: say('Ezkerretik', 'Por la izquierda', 'من اليسار', 'From the left'),
    right: say('Eskuinetik', 'Por la derecha', 'من اليمين', 'From the right'),
    joint: say('Lotunea', 'Unión', 'الالتقاء', 'Joint'),
    conclusion: say('Ondorioa', 'Conclusión', 'الاستنتاج', 'Conclusion')
}
const work = (formula: string) => say(`Kalkulatu $${formula}$.`, `Calcula $${formula}$.`, `احسب $${formula}$.`, `Work out $${formula}$.`)

type Built = Omit<WorkedCase<Bach2gLimitsDetectiveError>, 'options'>

function build(random: Random, error: Bach2gLimitsDetectiveError): Built | null {
    switch (error) {
        case 'infinity-minus': {
            const p = randomInt(random, 2, 12)
            return {
                problem: work(`\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+${p}x}-x\\right)`),
                lines: [line(LABELS.substitute, '\\infty-\\infty'), line(LABELS.step, '\\infty-\\infty=0'), line(LABELS.result, '0')],
                wrong: 1, error, fix: `\\frac{${p}x}{\\sqrt{x^2+${p}x}+x}\\ \\to\\ \\frac{${p}}{2}`, right: p / 2, reached: 0
            }
        }
        case 'one-infinity': {
            const p = randomInt(random, 1, 5)
            const q = randomInt(random, 2, 4)
            return {
                problem: work(`\\lim_{x\\to+\\infty}\\left(1+\\frac{${p}}{x}\\right)^{${q}x}`),
                lines: [line(LABELS.substitute, '1^{\\infty}'), line(LABELS.step, '1^{\\infty}=1'), line(LABELS.result, '1')],
                wrong: 1, error, fix: `e^{${q}x\\cdot\\frac{${p}}{x}}=e^{${p * q}}`, right: Math.exp(p * q), reached: 1
            }
        }
        case 'inverse-degrees': {
            const a = randomInt(random, 2, 9)
            const b = randomInt(random, 2, 9)
            if (a === b) return null
            return {
                problem: work(`\\lim_{x\\to+\\infty}\\frac{${a}x^2+1}{${b}x^2-x}`),
                lines: [line(LABELS.substitute, '\\frac{\\infty}{\\infty}'), line(LABELS.step, `\\frac{${a}x^2}{${b}x^2}`), line(LABELS.result, `\\frac{${b}}{${a}}`)],
                wrong: 2, error, fix: `\\frac{${a}x^2}{${b}x^2}=\\frac{${a}}{${b}}`, right: a / b, reached: b / a
            }
        }
        case 'minus-sign': {
            const a = randomInt(random, 2, 7)
            return {
                problem: work(`\\lim_{x\\to-\\infty}(x^3-${a}x^2)`),
                lines: [line(LABELS.step, `x^3\\left(1-\\frac{${a}}{x}\\right)`), line(LABELS.step, '(-\\infty)^3=+\\infty'), line(LABELS.result, '+\\infty')],
                wrong: 1, error, fix: '(-\\infty)^3=-\\infty', right: -1, reached: 1
            }
        }
        case 'k-zero': {
            const a = randomInt(random, 1, 6)
            const k = randomInt(random, 2, 9)
            return {
                problem: work(`\\lim_{x\\to ${a}^+}\\frac{${k}}{x-${a}}`),
                lines: [line(LABELS.substitute, `\\frac{${k}}{0^+}`), line(LABELS.step, `\\frac{${k}}{0}=0`), line(LABELS.result, '0')],
                wrong: 1, error, fix: `\\frac{${k}}{0^+}=+\\infty`, right: 1e9, reached: 0
            }
        }
        case 'zero-no-limit': {
            const a = randomInt(random, 2, 8)
            return {
                problem: work(`\\lim_{x\\to ${a}}\\frac{x^2-${a * a}}{x-${a}}`),
                lines: [line(LABELS.substitute, '\\frac{0}{0}'), line(LABELS.step, '\\frac{0}{0}\\ \\to\\ \\nexists'), line(LABELS.result, '\\nexists\\lim')],
                wrong: 1, error, fix: `x+${a}\\ \\to\\ ${2 * a}`, right: 2 * a, reached: -1
            }
        }
        case 'value-only': {
            const t = randomInt(random, 1, 4)
            const m = randomInt(random, 2, 4)
            const c = randomInt(random, 1, 5)
            const left = m * t
            const right = t + c
            if (left === right) return null
            return {
                problem: say(`Jarraitua al da $f(x)=\\begin{cases}${m}x & x<${t}\\\\ x+${c} & x\\ge ${t}\\end{cases}$ funtzioa $x=${t}$ puntuan?`, `¿Es continua $f(x)=\\begin{cases}${m}x & x<${t}\\\\ x+${c} & x\\ge ${t}\\end{cases}$ en $x=${t}$?`, `هل $f(x)=\\begin{cases}${m}x & x<${t}\\\\ x+${c} & x\\ge ${t}\\end{cases}$ متصلة عند $x=${t}$؟`, `Is $f(x)=\\begin{cases}${m}x & x<${t}\\\\ x+${c} & x\\ge ${t}\\end{cases}$ continuous at $x=${t}$?`),
                lines: [line(LABELS.substitute, `f(${t})=${t}+${c}=${right}`), line(LABELS.step, `\\exists f(${t})\\ \\to\\ \\checkmark`), line(LABELS.conclusion, '\\checkmark')],
                wrong: 1, error, fix: `\\lim_{x\\to ${t}^-}${m}x=${left}\\neq ${right}`, right: 0, reached: 1
            }
        }
        case 'wrong-piece': {
            const t = randomInt(random, 1, 4)
            const m = randomInt(random, 2, 5)
            if (m === t) return null
            return {
                problem: say(`Aurkitu $k$, $f(x)=\\begin{cases}${m}x & x<${t}\\\\ x^2+k & x\\ge ${t}\\end{cases}$ jarraitua izan dadin.`, `Halla $k$ para que $f(x)=\\begin{cases}${m}x & x<${t}\\\\ x^2+k & x\\ge ${t}\\end{cases}$ sea continua.`, `أوجد $k$ لتكون $f(x)=\\begin{cases}${m}x & x<${t}\\\\ x^2+k & x\\ge ${t}\\end{cases}$ متصلة.`, `Find $k$ so that $f(x)=\\begin{cases}${m}x & x<${t}\\\\ x^2+k & x\\ge ${t}\\end{cases}$ is continuous.`),
                lines: [line(LABELS.left, `\\lim_{x\\to ${t}^-}${m}x=${m * t}`), line(LABELS.right, `f(${t})=${m}\\cdot ${t}+k`), line(LABELS.result, `k=0`)],
                wrong: 1, error, fix: `f(${t})=${t * t}+k\\ \\to\\ k=${m * t - t * t}`, right: m * t - t * t, reached: 0
            }
        }
        case 'initial-value': {
            const p = randomInt(random, 2, 9) * 5
            const q = randomInt(random, 1, 9)
            const r = randomInt(random, 1, 4)
            if (q % r !== 0 || q / r === p) return null
            return {
                problem: say(`Biztanleria (milakatan) $P(t)=\\frac{${p}t+${q}}{t+${r}}$ da. Zenbatera hurbiltzen da epe luzera?`, `La población (miles) es $P(t)=\\frac{${p}t+${q}}{t+${r}}$. ¿A cuánto se acerca a largo plazo?`, `السكان (بالآلاف) $P(t)=\\frac{${p}t+${q}}{t+${r}}$. إلى كم يقترب على المدى الطويل؟`, `The population (thousands) is $P(t)=\\frac{${p}t+${q}}{t+${r}}$. What does it approach in the long run?`),
                lines: [line(LABELS.step, 't=0'), line(LABELS.substitute, `P(0)=\\frac{${q}}{${r}}`), line(LABELS.result, `${q / r}`)],
                wrong: 0, error, fix: `t\\to+\\infty:\\ \\frac{${p}t}{t}=${p}`, right: p, reached: q / r
            }
        }
        case 'fixed-cost': {
            const fixed = randomInt(random, 2, 9) * 100
            const c = randomInt(random, 2, 15)
            return {
                problem: say(`$C(x)=${fixed}+${c}x$ euro. Zenbatera hurbiltzen da batez besteko kostua?`, `$C(x)=${fixed}+${c}x$ euros. ¿A cuánto se acerca el coste medio?`, `$C(x)=${fixed}+${c}x$ يورو. إلى كم يقترب متوسط التكلفة؟`, `$C(x)=${fixed}+${c}x$ euros. What does the average cost approach?`),
                lines: [line(LABELS.step, `\\frac{C(x)}{x}=\\frac{${fixed}}{x}+${c}`), line(LABELS.step, `\\frac{${fixed}}{x}\\to ${fixed}`), line(LABELS.result, `${fixed + c}`)],
                wrong: 1, error, fix: `\\frac{${fixed}}{x}\\to 0\\ \\to\\ ${c}`, right: c, reached: fixed + c
            }
        }
        case 'jump-price': {
            const [p1, p2] = pick(random, [[2, 1.5], [3, 2], [4, 3], [2.5, 2]])
            const edge = pick(random, [10, 20, 30])
            const k = (p1 - p2) * edge + randomInt(random, 2, 6)
            const jump = p2 * edge + k - p1 * edge
            return {
                problem: say(`$f(x)=\\begin{cases}${tex(p1)}x & x\\le ${edge}\\\\ ${tex(p2)}x+${tex(k)} & x>${edge}\\end{cases}$ euro. Zenbatekoa da jauzia $x=${edge}$ puntuan?`, `$f(x)=\\begin{cases}${tex(p1)}x & x\\le ${edge}\\\\ ${tex(p2)}x+${tex(k)} & x>${edge}\\end{cases}$ euros. ¿De cuánto es el salto en $x=${edge}$?`, `$f(x)=\\begin{cases}${tex(p1)}x & x\\le ${edge}\\\\ ${tex(p2)}x+${tex(k)} & x>${edge}\\end{cases}$ يورو. كم مقدار القفزة عند $x=${edge}$؟`, `$f(x)=\\begin{cases}${tex(p1)}x & x\\le ${edge}\\\\ ${tex(p2)}x+${tex(k)} & x>${edge}\\end{cases}$ euros. How big is the jump at $x=${edge}$?`),
                lines: [line(LABELS.left, `f(${edge})=${tex(p1 * edge)}`), line(LABELS.step, `${tex(p1)}-${tex(p2)}=${tex(p1 - p2)}`), line(LABELS.result, tex(p1 - p2))],
                wrong: 1, error, fix: `${tex(p2 * edge + k)}-${tex(p1 * edge)}=${tex(jump)}`, right: jump, reached: p1 - p2
            }
        }
        case 'edge-forgot': {
            const [p1, p2] = pick(random, [[2, 1.5], [3, 2], [4, 3], [2.5, 2], [1.2, 1]])
            const edge = pick(random, [10, 20, 50])
            const k = (p1 - p2) * edge
            return {
                problem: say(`Zein $k$ baliorekin ez du jauzirik $f(x)=\\begin{cases}${tex(p1)}x & x\\le ${edge}\\\\ ${p2 === 1 ? '' : tex(p2)}x+k & x>${edge}\\end{cases}$ tarifak?`, `¿Con qué $k$ no salta la tarifa $f(x)=\\begin{cases}${tex(p1)}x & x\\le ${edge}\\\\ ${p2 === 1 ? '' : tex(p2)}x+k & x>${edge}\\end{cases}$?`, `بأي $k$ لا تقفز التعريفة $f(x)=\\begin{cases}${tex(p1)}x & x\\le ${edge}\\\\ ${p2 === 1 ? '' : tex(p2)}x+k & x>${edge}\\end{cases}$؟`, `With which $k$ does the tariff $f(x)=\\begin{cases}${tex(p1)}x & x\\le ${edge}\\\\ ${p2 === 1 ? '' : tex(p2)}x+k & x>${edge}\\end{cases}$ not jump?`),
                lines: [line(LABELS.joint, `${tex(p1)}x=${p2 === 1 ? '' : tex(p2)}x+k`), line(LABELS.step, `k=${tex(p1)}-${tex(p2)}`), line(LABELS.result, `k=${tex(p1 - p2)}`)],
                wrong: 1, error, fix: `k=(${tex(p1)}-${tex(p2)})\\cdot ${edge}=${tex(k)}`, right: k, reached: p1 - p2
            }
        }
    }
}

export const bach2gLimitsDetectiveNames: Record<Bach2gLimitsDetectiveError, LocalizedText> = {
    'infinity-minus': say('$\\infty-\\infty=0$ hartu du', 'Tomó $\\infty-\\infty=0$', 'أخذ $\\infty-\\infty=0$', 'Took $\\infty-\\infty=0$'),
    'one-infinity': say('$1^{\\infty}$ bat dela esan du', 'Dijo que $1^{\\infty}$ es uno', 'قال إن $1^{\\infty}$ واحد', 'Said that $1^{\\infty}$ is one'),
    'inverse-degrees': say('Koefizienteen zatidura alderantziz idatzi du', 'Escribió el cociente de los coeficientes al revés', 'كتب خارج قسمة المعاملين معكوسًا', 'Wrote the quotient of the coefficients upside down'),
    'minus-sign': say('Kubo baten zeinua gaizki hartu du $-\\infty$ aldera', 'Se equivocó con el signo de un cubo en $-\\infty$', 'أخطأ في إشارة مكعب عند $-\\infty$', 'Got the sign of a cube at $-\\infty$ wrong'),
    'k-zero': say('Zenbaki bat zati 0, 0 dela esan du', 'Dijo que un número entre 0 es 0', 'قال إن عددًا على 0 يساوي 0', 'Said that a number over 0 is 0'),
    'zero-no-limit': say('$\\frac{0}{0}$ ateratzean limiterik ez dagoela esan du', 'Dijo que si sale $\\frac{0}{0}$ no hay límite', 'قال إنه لا نهاية إذا ظهرت $\\frac{0}{0}$', 'Said there is no limit when you get $\\frac{0}{0}$'),
    'value-only': say('$f(a)$ bakarrik begiratu du jarraitutasuna aztertzeko', 'Miró solo $f(a)$ para la continuidad', 'نظر إلى $f(a)$ فقط لدراسة الاتصال', 'Looked only at $f(a)$ for continuity'),
    'wrong-piece': say('Lotunean beste aldeko zatia erabili du', 'Usó en la unión el trozo del otro lado', 'استعمل عند الالتقاء جزء الجانب الآخر', 'Used the piece of the other side at the joint'),
    'initial-value': say('Hasierako balioa ($t=0$) hartu du epe luzerako balioa bezala', 'Tomó el valor inicial ($t=0$) por el de largo plazo', 'أخذ القيمة الابتدائية ($t=0$) على أنها قيمة المدى الطويل', 'Took the initial value ($t=0$) for the long-run one'),
    'fixed-cost': say('Kostu finkoa ez dela banatzen pentsatu du', 'Creyó que el coste fijo no se reparte', 'ظن أن التكلفة الثابتة لا تتوزع', 'Thought the fixed cost is not shared'),
    'jump-price': say('Jauzia prezioen kenketa dela esan du', 'Dijo que el salto es la diferencia de precios', 'قال إن القفزة هي فرق السعرين', 'Said the jump is the difference of prices'),
    'edge-forgot': say('Tartearen muga ahaztu du', 'Olvidó el límite del tramo', 'نسي حد الشريحة', 'Forgot the edge of the bracket')
}

export const bach2gLimitsDetectiveTips: Record<Bach2gLimitsDetectiveError, LocalizedText> = {
    'infinity-minus': say('$\\infty-\\infty$ indeterminazioa da: biderkatu konjokatuaz.', '$\\infty-\\infty$ es una indeterminación: multiplica por el conjugado.', '$\\infty-\\infty$ حالة عدم تعيين: اضرب في المرافق.', '$\\infty-\\infty$ is indeterminate: multiply by the conjugate.'),
    'one-infinity': say('$1^{\\infty}$ indeterminazioa da: $e^{\\lim g\\,(f-1)}$.', '$1^{\\infty}$ es una indeterminación: $e^{\\lim g\\,(f-1)}$.', '$1^{\\infty}$ حالة عدم تعيين: $e^{\\lim g\\,(f-1)}$.', '$1^{\\infty}$ is indeterminate: $e^{\\lim g\\,(f-1)}$.'),
    'inverse-degrees': say('Goiko koefizientea goian geratzen da.', 'El coeficiente de arriba se queda arriba.', 'معامل البسط يبقى في البسط.', 'The coefficient on top stays on top.'),
    'minus-sign': say('Zenbaki negatibo baten kuboa negatiboa da.', 'El cubo de un número negativo es negativo.', 'مكعب العدد السالب سالب.', 'The cube of a negative number is negative.'),
    'k-zero': say('$\\frac{k}{0}$ infinitua da, zeinua alde bakoitzean.', '$\\frac{k}{0}$ es infinito, con el signo de cada lado.', '$\\frac{k}{0}$ لانهاية بإشارة كل جانب.', '$\\frac{k}{0}$ is infinite, with each side\'s sign.'),
    'zero-no-limit': say('$\\frac{0}{0}$ indeterminazioa da: faktorizatu eta sinplifikatu.', '$\\frac{0}{0}$ es una indeterminación: factoriza y simplifica.', '$\\frac{0}{0}$ حالة عدم تعيين: حلّل واختصر.', '$\\frac{0}{0}$ is indeterminate: factorise and cancel.'),
    'value-only': say('Hiru baldintzak: $f(a)$, limitea, eta biak berdinak.', 'Las tres condiciones: $f(a)$, el límite, y que coincidan.', 'الشروط الثلاثة: $f(a)$ والنهاية وتساويهما.', 'The three conditions: $f(a)$, the limit, and that they agree.'),
    'wrong-piece': say('$f(a)$ berdintza daraman zatiarekin kalkulatzen da.', '$f(a)$ se calcula con el trozo que lleva el igual.', 'تُحسب $f(a)$ بالجزء الذي فيه المساواة.', '$f(a)$ is worked out with the piece carrying the equals sign.'),
    'initial-value': say('Epe luzera: $t\\to+\\infty$, ez $t=0$.', 'A largo plazo: $t\\to+\\infty$, no $t=0$.', 'على المدى الطويل: $t\\to+\\infty$ لا $t=0$.', 'In the long run: $t\\to+\\infty$, not $t=0$.'),
    'fixed-cost': say('$\\frac{F}{x}\\to 0$: kostu finkoa unitate askotan banatzen da.', '$\\frac{F}{x}\\to 0$: el coste fijo se reparte entre muchas unidades.', '$\\frac{F}{x}\\to 0$: تتوزع التكلفة الثابتة على وحدات كثيرة.', '$\\frac{F}{x}\\to 0$: the fixed cost is shared among many units.'),
    'jump-price': say('Jauzia = eskuineko limitea − ezkerrekoa, mugan.', 'Salto = límite por la derecha − por la izquierda, en el límite del tramo.', 'القفزة = النهاية اليمنى − اليسرى عند حد الشريحة.', 'Jump = right-hand limit − left-hand limit, at the edge.'),
    'edge-forgot': say('Ordezkatu muga bi zatietan: $(p_1-p_2)\\cdot B$.', 'Sustituye el límite del tramo en los dos trozos: $(p_1-p_2)\\cdot B$.', 'عوّض حد الشريحة في الجزأين: $(p_1-p_2)\\cdot B$.', 'Substitute the edge in both pieces: $(p_1-p_2)\\cdot B$.')
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBach2gLimitsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bach2gLimitsDetectiveLevels[levelIndex], BACH2G_LIMITS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH2G_LIMITS_DETECTIVE_ERRORS = bach2gLimitsDetectiveLevels.flat()

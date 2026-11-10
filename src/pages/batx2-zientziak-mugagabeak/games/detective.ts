import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J5 · Integral mugagabeen detektibea / Detective de integrales
   indefinidas: a worked solution of three lines with one wrong line, the
   mistakes of this unit. Level 1, by parts: the sign of −∫ v du, v
   differentiated instead of integrated, the last step left out, the new
   integral worked out wrong; level 2, rational integrals: no division
   first, a double root read as a logarithm, A not divided by a − b, the
   roots with the wrong sign; level 3, substitution and conditions: dx not
   changed, the change not undone, cos² x integrated as a power, a single
   constant after integrating twice. The lines carry no words; the game
   writes \cos in each language's way. `right` and `reached` only tell the
   cases apart.
   ========================================================================== */

export type Bach2IndefiniteDetectiveError =
    | 'parts-sign'
    | 'parts-v'
    | 'parts-last'
    | 'parts-inner'
    | 'no-divide'
    | 'double-log'
    | 'cover-forget'
    | 'roots-sign'
    | 'dx-unchanged'
    | 'not-undone'
    | 'trig-power'
    | 'one-constant'

export const bach2IndefiniteDetectiveLevels: Bach2IndefiniteDetectiveError[][] = [
    ['parts-sign', 'parts-v', 'parts-last', 'parts-inner'],
    ['no-divide', 'double-log', 'cover-forget', 'roots-sign'],
    ['dx-unchanged', 'not-undone', 'trig-power', 'one-constant']
]

export const BACH2_INDEFINITE_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
const linear = (a: number) => (a > 0 ? `x-${a}` : `x+${-a}`)
const work = (latex: string) => say(`Kalkulatu $${latex}$.`, `Calcula $${latex}$.`, `احسب $${latex}$.`, `Work out $${latex}$.`)

const LABELS = {
    rule: say('Erregela', 'Regla', 'القاعدة', 'Rule'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    substitute: say('Ordezkatu', 'Sustituye', 'عوّض', 'Substitute'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const bach2IndefiniteDetectiveNames: Record<Bach2IndefiniteDetectiveError, LocalizedText> = {
    'parts-sign': say('$-\\int v\\,du$ zatiaren zeinua aldatu du', 'Cambió el signo de $-\\int v\\,du$', 'غيّر إشارة $-\\int v\\,du$', 'Changed the sign of $-\\int v\\,du$'),
    'parts-v': say('$dv$ deribatu du, integratu beharrean', 'Derivó $dv$ en vez de integrarlo', 'اشتق $dv$ بدل تكامله', 'Differentiated $dv$ instead of integrating it'),
    'parts-last': say('Azken integrala ahaztu du', 'Olvidó la última integral', 'نسي التكامل الأخير', 'Forgot the last integral'),
    'parts-inner': say('Integral berria gaizki egin du', 'Hizo mal la integral nueva', 'أخطأ في التكامل الجديد', 'Got the new integral wrong'),
    'no-divide': say('Ez du lehenik zatitu', 'No dividió primero', 'لم يقسم أولًا', 'Did not divide first'),
    'double-log': say('Erro bikoitza logaritmo gisa integratu du', 'Integró la raíz doble como un logaritmo', 'كامَل الجذر المضاعف كلوغاريتم', 'Integrated the double root as a logarithm'),
    'cover-forget': say('Ez du $a-b$ zenbakiaz zatitu', 'No dividió entre $a-b$', 'لم يقسم على $a-b$', 'Did not divide by $a-b$'),
    'roots-sign': say('Erroen zeinua aldatu du', 'Cambió el signo de las raíces', 'غيّر إشارة الجذور', 'Changed the sign of the roots'),
    'dx-unchanged': say('Ez du $dx$ aldatu', 'No cambió $dx$', 'لم يغيّر $dx$', 'Did not change $dx$'),
    'not-undone': say('Ez du aldaketa desegin', 'No deshizo el cambio', 'لم يتراجع عن التعويض', 'Did not undo the change'),
    'trig-power': say('Kosinuaren karratua berretura bat balitz bezala integratu du', 'Integró el coseno al cuadrado como una potencia', 'كامَل مربع جيب التمام كأنه قوة', 'Integrated cosine squared as if it were a power'),
    'one-constant': say('Konstante bakarra jarri du, bi aldiz integratu ondoren', 'Puso una sola constante tras integrar dos veces', 'وضع ثابتًا واحدًا بعد التكامل مرتين', 'Used a single constant after integrating twice')
}

export const bach2IndefiniteDetectiveTips: Record<Bach2IndefiniteDetectiveError, LocalizedText> = {
    'parts-sign': say('$\\int u\\,dv=uv-\\int v\\,du$: $v$ negatiboa bada, minus bider minus plus da.', '$\\int u\\,dv=uv-\\int v\\,du$: si $v$ es negativa, menos por menos es más.', '$\\int u\\,dv=uv-\\int v\\,du$: إذا كانت $v$ سالبة فسالب في سالب موجب.', '$\\int u\\,dv=uv-\\int v\\,du$: if $v$ is negative, minus times minus is plus.'),
    'parts-v': say('$v$ funtzioa $dv$ adierazpenaren integrala da: $\\int e^{ax}\\,dx=\\frac{e^{ax}}{a}$.', '$v$ es la integral de $dv$: $\\int e^{ax}\\,dx=\\frac{e^{ax}}{a}$.', '$v$ هو تكامل $dv$: $\\int e^{ax}\\,dx=\\frac{e^{ax}}{a}$.', '$v$ is the integral of $dv$: $\\int e^{ax}\\,dx=\\frac{e^{ax}}{a}$.'),
    'parts-last': say('Integral bat geratzen den bitartean, ez da amaitu: integratu hura ere.', 'Mientras quede una integral, no has terminado: intégrala también.', 'ما دام هناك تكامل فلم تنتهِ: كامله أيضًا.', 'While an integral is left, you have not finished: integrate it too.'),
    'parts-inner': say('Integral berria ere doitu behar da: $\\int e^{ax}\\,dx=\\frac{e^{ax}}{a}$.', 'La integral nueva también se ajusta: $\\int e^{ax}\\,dx=\\frac{e^{ax}}{a}$.', 'التكامل الجديد يُضبط أيضًا: $\\int e^{ax}\\,dx=\\frac{e^{ax}}{a}$.', 'The new integral is adjusted too: $\\int e^{ax}\\,dx=\\frac{e^{ax}}{a}$.'),
    'no-divide': say('Zenbakitzailearen maila handiagoa edo berdina bada, lehenik zatitu: zatidura + hondarra/zatitzailea.', 'Si el numerador tiene grado mayor o igual, primero divide: cociente + resto/divisor.', 'إذا كانت درجة البسط أكبر أو مساوية فاقسم أولًا: خارج القسمة + الباقي/المقسوم عليه.', 'If the numerator has a greater or equal degree, divide first: quotient + remainder/divisor.'),
    'double-log': say('$\\int\\frac{B}{(x-a)^2}\\,dx=-\\frac{B}{x-a}$: berretura bat da.', '$\\int\\frac{B}{(x-a)^2}\\,dx=-\\frac{B}{x-a}$: es una potencia.', '$\\int\\frac{B}{(x-a)^2}\\,dx=-\\frac{B}{x-a}$: إنها قوة.', '$\\int\\frac{B}{(x-a)^2}\\,dx=-\\frac{B}{x-a}$: it is a power.'),
    'cover-forget': say('Estali $x-a$ faktorea, eta ordeztu $x=a$ gainerakoan: beste faktorea ere zatitzen ari da.', 'Tapa $x-a$ y sustituye $x=a$ en lo que queda: el otro factor también divide.', 'غطِّ $x-a$ وعوّض $x=a$ في الباقي: العامل الآخر يقسم أيضًا.', 'Cover $x-a$ and put $x=a$ in what is left: the other factor divides too.'),
    'roots-sign': say('$x-a$ faktorearen erroa $a$ da: egiaztatu biderkatuz.', 'La raíz de $x-a$ es $a$: compruébalo multiplicando.', 'جذر $x-a$ هو $a$: تحقق بالضرب.', 'The root of $x-a$ is $a$: check it by multiplying.'),
    'dx-unchanged': say('$dt=u\'\\,dx$: falta den zenbakia kanpora ateratzen da.', '$dt=u\'\\,dx$: el número que falta sale fuera.', '$dt=u\'\\,dx$: العدد الناقص يخرج.', '$dt=u\'\\,dx$: the missing number comes out.'),
    'not-undone': say('Emaitza $x$ aldagaiaz ematen da: ordezkatu $t$ berriro.', 'El resultado se da en $x$: vuelve a poner lo que era $t$.', 'تُعطى النتيجة بدلالة $x$: أعد ما كانت عليه $t$.', 'The result is given in $x$: put back what $t$ was.'),
    'trig-power': say('$\\cos^2 x=\\frac{1+\\cos 2x}{2}$: angelu bikoitza.', '$\\cos^2 x=\\frac{1+\\cos 2x}{2}$: el ángulo doble.', '$\\cos^2 x=\\frac{1+\\cos 2x}{2}$: ضعف الزاوية.', '$\\cos^2 x=\\frac{1+\\cos 2x}{2}$: the double angle.'),
    'one-constant': say('Integratze bakoitzak konstante bat dakar: $f(x)$ funtzioak $k_1x+k_2$ du.', 'Cada integración trae una constante: $f(x)$ lleva $k_1x+k_2$.', 'كل تكامل يجلب ثابتًا: في $f(x)$ يوجد $k_1x+k_2$.', 'Each integration brings a constant: $f(x)$ carries $k_1x+k_2$.')
}

type Built = Omit<WorkedCase<Bach2IndefiniteDetectiveError>, 'options'>

function build(random: Random, error: Bach2IndefiniteDetectiveError): Built | null {
    switch (error) {
        case 'parts-sign': {
            const k = pick(random, [2, 3, 4])
            const e = `e^{-${k}x}`
            return {
                problem: work(`\\int x${e}\\,dx`),
                lines: [
                    line(LABELS.rule, `u=x\\quad v=-\\frac{${e}}{${k}}`),
                    line(LABELS.step, `=-\\frac{x${e}}{${k}}-\\int\\frac{${e}}{${k}}\\,dx`),
                    line(LABELS.result, `=-\\frac{x${e}}{${k}}+\\frac{${e}}{${k * k}}+k`)
                ],
                wrong: 1, error, fix: `=-\\frac{x${e}}{${k}}+\\int\\frac{${e}}{${k}}\\,dx`, right: -1 / (k * k), reached: 1 / (k * k)
            }
        }
        case 'parts-v': {
            const k = pick(random, [2, 3, 4])
            const e = `e^{${k}x}`
            return {
                problem: work(`\\int x${e}\\,dx`),
                lines: [
                    line(LABELS.rule, `u=x\\quad dv=${e}\\,dx`),
                    line(LABELS.step, `v=${k}${e}`),
                    line(LABELS.result, `=${k}x${e}-\\int ${k}${e}\\,dx`)
                ],
                wrong: 1, error, fix: `v=\\frac{${e}}{${k}}`, right: 1 / k, reached: k
            }
        }
        case 'parts-last': {
            const c = pick(random, [1, 2, 3])
            const lead = c === 1 ? '' : String(c)
            return {
                problem: work(`\\int ${lead}x^2e^x\\,dx`),
                lines: [
                    line(LABELS.step, `=${lead}x^2e^x-\\int ${2 * c}xe^x\\,dx`),
                    line(LABELS.step, `\\int ${2 * c}xe^x=${2 * c}e^x(x-1)`),
                    line(LABELS.result, `=${lead}x^2e^x-${2 * c}xe^x+k`)
                ],
                wrong: 2, error, fix: `=${lead}x^2e^x-${2 * c}xe^x+${2 * c}e^x+k`, right: 2 * c, reached: 0
            }
        }
        case 'parts-inner': {
            const k = pick(random, [2, 3, 4])
            const e = `e^{${k}x}`
            return {
                problem: work(`\\int x${e}\\,dx`),
                lines: [
                    line(LABELS.rule, `u=x\\quad v=\\frac{${e}}{${k}}`),
                    line(LABELS.step, `=\\frac{x${e}}{${k}}-\\int\\frac{${e}}{${k}}\\,dx`),
                    line(LABELS.result, `=\\frac{x${e}}{${k}}-\\frac{${e}}{${k}}+k`)
                ],
                wrong: 2, error, fix: `=\\frac{x${e}}{${k}}-\\frac{${e}}{${k * k}}+k`, right: 1 / (k * k), reached: 1 / k
            }
        }
        case 'no-divide': {
            const a = pick(random, [1, 2, 3])
            const c = pick(random, [1, 2, 3, 5])
            const r = a * a + c
            return {
                problem: work(`\\int\\frac{x^2+${c}}{x-${a}}\\,dx`),
                lines: [
                    line(LABELS.rule, `\\frac{A}{x-${a}}\\ \\to\\ A\\ln|x-${a}|`),
                    line(LABELS.step, `=(x^2+${c})\\ln|x-${a}|`),
                    line(LABELS.result, `(x^2+${c})\\ln|x-${a}|+k`)
                ],
                wrong: 1, error, fix: `\\frac{x^2+${c}}{x-${a}}=x+${a}+\\frac{${r}}{x-${a}}`, right: r, reached: c
            }
        }
        case 'double-log': {
            const a = pick(random, [1, 2, 3])
            const A = pick(random, [1, 2, 3])
            const B = pick(random, [2, 3, 4, 5])
            const p = A
            const q = B - A * a
            return {
                problem: work(`\\int\\frac{${p === 1 ? '' : p}x${signed(q)}}{(x-${a})^2}\\,dx`),
                lines: [
                    line(LABELS.step, `=\\frac{${A}}{x-${a}}+\\frac{${B}}{(x-${a})^2}`),
                    line(LABELS.step, `\\frac{${B}}{(x-${a})^2}\\ \\to\\ ${B}\\ln(x-${a})^2`),
                    line(LABELS.result, `=${A + 2 * B}\\ln|x-${a}|+k`)
                ],
                wrong: 1, error, fix: `\\int\\frac{${B}}{(x-${a})^2}\\,dx=-\\frac{${B}}{x-${a}}`, right: -B, reached: 2 * B
            }
        }
        case 'cover-forget': {
            for (;;) {
                const a = pick(random, [1, 2, 3])
                const b = pick(random, [-1, -2, -3])
                if (a - b < 2) continue
                const A = pick(random, [1, 2, 3])
                const B = pick(random, [-2, -1, 1, 2])
                const p = A + B
                const q = -(A * b + B * a)
                if (p === 0) continue
                const top = `${p === 1 ? '' : p === -1 ? '-' : p}x${signed(q)}`
                const naive = A * (a - b)
                return {
                    problem: work(`\\int\\frac{${top}}{(${linear(a)})(${linear(b)})}\\,dx`),
                    lines: [
                        line(LABELS.rule, `=\\frac{A}{${linear(a)}}+\\frac{B}{${linear(b)}}`),
                        line(LABELS.substitute, `x=${a}\\ \\to\\ A=${naive}`),
                        line(LABELS.result, `\\frac{${naive}}{${linear(a)}}\\ \\to\\ ${naive}\\ln|${linear(a)}|`)
                    ],
                    wrong: 1, error, fix: `x=${a}\\ \\to\\ A=\\frac{${naive}}{${a - b}}=${A}`, right: A, reached: naive
                }
            }
        }
        case 'roots-sign': {
            const [a, b] = pick(random, [[3, -2], [2, -1], [4, -1], [3, -1], [1, -4]])
            const s = -(a + b)
            const pr = a * b
            const bottom = `x^2${s === 0 ? '' : s === 1 ? '+x' : s === -1 ? '-x' : `${signed(s)}x`}${signed(pr)}`
            const c = a - b
            return {
                problem: work(`\\int\\frac{${c}}{${bottom}}\\,dx`),
                lines: [
                    line(LABELS.step, `x=${-a},\\ x=${-b}`),
                    line(LABELS.step, `=\\frac{1}{${linear(-a)}}-\\frac{1}{${linear(-b)}}`),
                    line(LABELS.result, `\\ln\\left|\\frac{${linear(-a)}}{${linear(-b)}}\\right|+k`)
                ],
                wrong: 0, error, fix: `x=${a},\\ x=${b}`, right: a, reached: -a
            }
        }
        case 'dx-unchanged': {
            const p = pick(random, [2, 3])
            const outside = p === 2 ? 'x' : 'x^2'
            return {
                problem: work(`\\int ${outside}e^{x^${p}}\\,dx`),
                lines: [
                    line(LABELS.rule, `t=x^${p}\\quad dt=${p}${outside}\\,dx`),
                    line(LABELS.step, `\\int ${outside}e^{x^${p}}\\,dx=\\int e^t\\,dt`),
                    line(LABELS.result, `=e^{x^${p}}+k`)
                ],
                wrong: 1, error, fix: `\\int ${outside}e^{x^${p}}\\,dx=\\frac{1}{${p}}\\int e^t\\,dt`, right: 1 / p, reached: 1
            }
        }
        case 'not-undone': {
            const n = randomInt(random, 2, 5)
            return {
                problem: work(`\\int\\frac{(\\ln x)^${n}}{x}\\,dx`),
                lines: [
                    line(LABELS.rule, `t=\\ln x\\quad dt=\\frac{dx}{x}`),
                    line(LABELS.step, `\\int t^${n}\\,dt=\\frac{t^${n + 1}}{${n + 1}}`),
                    line(LABELS.result, `=\\frac{t^${n + 1}}{${n + 1}}+k`)
                ],
                wrong: 2, error, fix: `=\\frac{(\\ln x)^${n + 1}}{${n + 1}}+k`, right: n + 1, reached: 0
            }
        }
        case 'trig-power': {
            const c = pick(random, [2, 4, 6])
            return {
                problem: work(`\\int ${c}\\cos^2 x\\,dx`),
                lines: [
                    line(LABELS.rule, `\\int u^2\\,du=\\frac{u^3}{3}`),
                    line(LABELS.step, `\\int ${c}\\cos^2 x\\,dx=\\frac{${c}\\cos^3 x}{3}`),
                    line(LABELS.result, `\\frac{${c}\\cos^3 x}{3}+k`)
                ],
                wrong: 1, error, fix: `\\int ${c}\\cos^2 x\\,dx=\\int ${c === 2 ? '' : c / 2}(1+\\cos 2x)\\,dx`, right: c / 2, reached: c / 3
            }
        }
        case 'one-constant': {
            const p = pick(random, [1, 2, 3, 4, 5])
            const q = pick(random, [-2, -1, 1, 3, 4])
            return {
                problem: say(`Aurkitu $f$, $f''(x)=6x$, $f'(0)=${p}$ eta $f(0)=${q}$ badira.`, `Halla $f$ si $f''(x)=6x$, $f'(0)=${p}$ y $f(0)=${q}$.`, `أوجد $f$ إذا كان $f''(x)=6x$ و$f'(0)=${p}$ و$f(0)=${q}$.`, `Find $f$ if $f''(x)=6x$, $f'(0)=${p}$ and $f(0)=${q}$.`),
                lines: [
                    line(LABELS.step, `f'(x)=3x^2+${p}`),
                    line(LABELS.step, 'f(x)=x^3+k_2'),
                    line(LABELS.result, `f(x)=x^3${signed(q)}`)
                ],
                wrong: 1, error, fix: `f(x)=x^3+${p}x+k_2`, right: p, reached: 0
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBach2IndefiniteDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bach2IndefiniteDetectiveLevels[levelIndex], BACH2_INDEFINITE_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH2_INDEFINITE_DETECTIVE_ERRORS = bach2IndefiniteDetectiveLevels.flat()

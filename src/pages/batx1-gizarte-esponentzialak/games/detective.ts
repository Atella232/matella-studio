import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../text.ts'

/* ==========================================================================
   Funtzioen detektibea (Detective, 1.º Sociales · exponenciales): a worked
   solution of three lines with one wrong line, the mistakes of this unit.
   Level 1: f(x + a) taken to the right, f(−x) mixed up with −f(x),
   f ∘ g read left to right, f⁻¹ as 1/f; level 2: the factor of a fall as
   r instead of 1 − r, a from two data without the root, k·aˣ computed as
   (k·a)ˣ, two rises of r % added as 2r %; level 3: aᵗ = c solved as c/a,
   log c / log a taken as log(c/a), the domain of log(x + a) as x > a, three
   doublings as ×6. `right` and `reached` only tell the cases apart.
   ========================================================================== */

export type SocExpDetectiveError =
    | 'shift-direction'
    | 'reflect-axis'
    | 'compose-order'
    | 'inverse-reciprocal'
    | 'percent-factor'
    | 'two-points-root'
    | 'power-order'
    | 'percent-sum'
    | 'log-divide'
    | 'log-quotient'
    | 'log-domain'
    | 'doubling-linear'

export const socExpDetectiveLevels: SocExpDetectiveError[][] = [
    ['shift-direction', 'reflect-axis', 'compose-order', 'inverse-reciprocal'],
    ['percent-factor', 'two-points-root', 'power-order', 'percent-sum'],
    ['log-divide', 'log-quotient', 'log-domain', 'doubling-linear']
]

export const SOC_EXP_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    solve: say('Askatu', 'Despeja', 'اعزل', 'Solve'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
const dec = (value: number) => String(Math.round(value * 10000) / 10000).replace('.', '{,}')

export const socExpDetectiveNames: Record<SocExpDetectiveError, LocalizedText> = {
    'shift-direction': say('$x+a$ eskuinera eraman du', 'Llevó $x+a$ a la derecha', 'نقل $x+a$ إلى اليمين', 'Moved $x+a$ to the right'),
    'reflect-axis': say('$f(-x)$ eta $-f(x)$ nahastu ditu', 'Confundió $f(-x)$ con $-f(x)$', 'خلط بين $f(-x)$ و$-f(x)$', 'Mixed up $f(-x)$ and $-f(x)$'),
    'compose-order': say('$f\\circ g$ ezkerretik eskuinera irakurri du', 'Leyó $f\\circ g$ de izquierda a derecha', 'قرأ $f\\circ g$ من اليسار إلى اليمين', 'Read $f\\circ g$ from left to right'),
    'inverse-reciprocal': say('$f^{-1}$ eta $\\frac{1}{f}$ nahastu ditu', 'Confundió $f^{-1}$ con $\\frac{1}{f}$', 'خلط بين $f^{-1}$ و$\\frac{1}{f}$', 'Mixed up $f^{-1}$ and $\\frac{1}{f}$'),
    'percent-factor': say('Beherakadan $r$ erabili du, $1-r$ beharrean', 'Usó $r$ en lugar de $1-r$ al bajar', 'استعمل $r$ بدل $1-r$ عند التناقص', 'Used $r$ instead of $1-r$ for a fall'),
    'two-points-root': say('Bi urratsetan, erroa ahaztu du', 'Olvidó la raíz con dos pasos', 'نسي الجذر مع خطوتين', 'Forgot the root over two steps'),
    'power-order': say('$k\\cdot a^x$ kalkulatu du $(k\\cdot a)^x$ balitz bezala', 'Calculó $k\\cdot a^x$ como $(k\\cdot a)^x$', 'حسب $k\\cdot a^x$ كأنها $(k\\cdot a)^x$', 'Worked out $k\\cdot a^x$ as $(k\\cdot a)^x$'),
    'percent-sum': say('Ehunekoak batu ditu, biderkatu beharrean', 'Sumó los porcentajes en lugar de multiplicar', 'جمع النسب بدل ضربها', 'Added the percentages instead of multiplying'),
    'log-divide': say('$a^t=c$ ebatzi du $c$ zati $a$ eginez', 'Resolvió $a^t=c$ dividiendo $c$ entre $a$', 'حل $a^t=c$ بقسمة $c$ على $a$', 'Solved $a^t=c$ by dividing $c$ by $a$'),
    'log-quotient': say('$\\frac{\\log c}{\\log a}$ eta $\\log\\frac{c}{a}$ nahastu ditu', 'Confundió $\\frac{\\log c}{\\log a}$ con $\\log\\frac{c}{a}$', 'خلط بين $\\frac{\\log c}{\\log a}$ و$\\log\\frac{c}{a}$', 'Mixed up $\\frac{\\log c}{\\log a}$ and $\\log\\frac{c}{a}$'),
    'log-domain': say('Logaritmoaren izate-eremuan zeinua aldatu du', 'Cambió el signo en el dominio del logaritmo', 'غيّر الإشارة في مجال اللوغاريتم', 'Changed the sign in the domain of the logarithm'),
    'doubling-linear': say('Bikoizketak batu ditu, biderkatu beharrean', 'Sumó las duplicaciones en lugar de multiplicarlas', 'جمع المضاعفات بدل ضربها', 'Added the doublings instead of multiplying them')
}

export const socExpDetectiveTips: Record<SocExpDetectiveError, LocalizedText> = {
    'shift-direction': say('Barrukoa 0 den lekuan dago erpina: $x+a=0$, $x=-a$.', 'El vértice está donde lo de dentro vale 0: $x+a=0$, $x=-a$.', 'الرأس حيث يساوي ما بالداخل 0: $x+a=0$، $x=-a$.', 'The vertex is where the inside is 0: $x+a=0$, $x=-a$.'),
    'reflect-axis': say('$f(-x)$: $x$ aldatzen da zeinuz; $-f(x)$: $y$.', '$f(-x)$: cambia el signo de la $x$; $-f(x)$, el de la $y$.', '$f(-x)$: تتغير إشارة $x$؛ و$-f(x)$: إشارة $y$.', '$f(-x)$: the sign of $x$ changes; $-f(x)$: that of $y$.'),
    'compose-order': say('$(f\\circ g)(x)=f(g(x))$: lehenik $g$.', '$(f\\circ g)(x)=f(g(x))$: primero $g$.', '$(f\\circ g)(x)=f(g(x))$: أولًا $g$.', '$(f\\circ g)(x)=f(g(x))$: $g$ first.'),
    'inverse-reciprocal': say('$f^{-1}$ funtzioak $f$ desegiten du: askatu $x$.', '$f^{-1}$ deshace $f$: despeja $x$.', '$f^{-1}$ تلغي $f$: اعزل $x$.', '$f^{-1}$ undoes $f$: solve for $x$.'),
    'percent-factor': say('% $r$ jaistean, $1-r$ geratzen da.', 'Al bajar un $r$ %, queda $1-r$.', 'عند نقص $r$ % يبقى $1-r$.', 'Falling $r$ % leaves $1-r$.'),
    'two-points-root': say('Bi urratsetan $a^2$ biderkatzen da: atera erro karratua.', 'En dos pasos se multiplica por $a^2$: saca la raíz cuadrada.', 'في خطوتين نضرب في $a^2$: خذ الجذر التربيعي.', 'Over two steps you multiply by $a^2$: take the square root.'),
    'power-order': say('Lehenik berretura, gero biderketa: $k\\cdot(a^x)$.', 'Primero la potencia y después el producto: $k\\cdot(a^x)$.', 'أولًا القوة ثم الضرب: $k\\cdot(a^x)$.', 'The power first, then the product: $k\\cdot(a^x)$.'),
    'percent-sum': say('Bi igoera biderkatu egiten dira: $(1+r)^2$.', 'Dos subidas se multiplican: $(1+r)^2$.', 'الزيادتان تُضربان: $(1+r)^2$.', 'Two rises multiply: $(1+r)^2$.'),
    'log-divide': say('$t$ berretzailea da: $t=\\frac{\\log c}{\\log a}$.', '$t$ es el exponente: $t=\\frac{\\log c}{\\log a}$.', '$t$ هو الأس: $t=\\frac{\\log c}{\\log a}$.', '$t$ is the exponent: $t=\\frac{\\log c}{\\log a}$.'),
    'log-quotient': say('Bi logaritmoen zatidura da, ez zatiduraren logaritmoa.', 'Es el cociente de dos logaritmos, no el logaritmo del cociente.', 'إنه خارج قسمة لوغاريتمين لا لوغاريتم خارج القسمة.', 'It is the quotient of two logarithms, not the logarithm of the quotient.'),
    'log-domain': say('$x+a>0$ bada, $x>-a$.', 'Si $x+a>0$, entonces $x>-a$.', 'إذا $x+a>0$ فإن $x>-a$.', 'If $x+a>0$, then $x>-a$.'),
    'doubling-linear': say('$n$ bikoizketa: bider $2^n$.', '$n$ duplicaciones: por $2^n$.', '$n$ مضاعفات: في $2^n$.', '$n$ doublings: times $2^n$.')
}

type Built = Omit<WorkedCase<SocExpDetectiveError>, 'options'>

function build(random: Random, error: SocExpDetectiveError): Built | null {
    switch (error) {
        case 'shift-direction': {
            const a = randomInt(random, 1, 5)
            const k = randomInt(random, 1, 6)
            return {
                problem: say(`Aurkitu $y=(x+${a})^2+${k}$ parabolaren erpina.`, `Halla el vértice de $y=(x+${a})^2+${k}$.`, `أوجد رأس $y=(x+${a})^2+${k}$.`, `Find the vertex of $y=(x+${a})^2+${k}$.`),
                lines: [line(LABELS.step, `x+${a}\\ \\to\\ ${a}`), line(LABELS.step, `+${k}\\ \\to\\ ${k}`), line(LABELS.result, `(${a},${k})`)],
                wrong: 0, error, fix: `x+${a}=0\\ \\to\\ (-${a},${k})`, right: -a, reached: a
            }
        }
        case 'reflect-axis': {
            const p = randomInt(random, 1, 6)
            const q = randomInt(random, 1, 6)
            if (p === q) return null
            return {
                problem: say(`$f$ funtzioa $(${p},${q})$ puntutik pasatzen da. Zein puntutatik pasatzen da $y=f(-x)$?`, `La gráfica de $f$ pasa por $(${p},${q})$. ¿Por qué punto pasa $y=f(-x)$?`, `يمر رسم $f$ بالنقطة $(${p},${q})$. بأي نقطة يمر $y=f(-x)$؟`, `The graph of $f$ passes through $(${p},${q})$. Which point does $y=f(-x)$ pass through?`),
                lines: [line(LABELS.step, `f(-x)`), line(LABELS.step, `y\\ \\to\\ -y`), line(LABELS.result, `(${p},-${q})`)],
                wrong: 1, error, fix: `x\\ \\to\\ -x\\ \\to\\ (-${p},${q})`, right: -p, reached: p
            }
        }
        case 'compose-order': {
            const a = randomInt(random, 2, 5)
            const r = randomInt(random, 1, 4)
            const right = (r + a) ** 2
            const reached = r * r + a
            return {
                problem: say(`$f(x)=x^2$ eta $g(x)=x+${a}$ badira, kalkulatu $(f\\circ g)(${r})$.`, `Si $f(x)=x^2$ y $g(x)=x+${a}$, calcula $(f\\circ g)(${r})$.`, `إذا كانت $f(x)=x^2$ و$g(x)=x+${a}$ فاحسب $(f\\circ g)(${r})$.`, `If $f(x)=x^2$ and $g(x)=x+${a}$, work out $(f\\circ g)(${r})$.`),
                lines: [line(LABELS.step, `f(${r})=${r * r}`), line(LABELS.step, `g(${r * r})=${r * r}+${a}`), line(LABELS.result, `${reached}`)],
                wrong: 0, error, fix: `g(${r})=${r + a}\\ \\to\\ f(${r + a})=${right}`, right, reached
            }
        }
        case 'inverse-reciprocal': {
            const b = randomInt(random, 2, 9)
            return {
                problem: say(`Aurkitu $f(x)=x+${b}$ funtzioaren alderantzizkoa.`, `Halla la inversa de $f(x)=x+${b}$.`, `أوجد عكسية $f(x)=x+${b}$.`, `Find the inverse of $f(x)=x+${b}$.`),
                lines: [line(LABELS.step, `y=x+${b}`), line(LABELS.solve, `f^{-1}(x)=\\frac{1}{x+${b}}`), line(LABELS.result, `f^{-1}(1)=\\frac{1}{${1 + b}}`)],
                wrong: 1, error, fix: `x=y-${b}\\ \\to\\ f^{-1}(x)=x-${b}`, right: 1 - b, reached: 1 / (1 + b)
            }
        }
        case 'percent-factor': {
            const r = pick(random, [10, 15, 20, 25, 30])
            const k = 100 * randomInt(random, 2, 9)
            return {
                problem: say(`${k} euroko makina batek % ${r} galtzen du urtero. Zenbat balio du urtebete geroago?`, `Una máquina de ${k} € pierde un ${r} % al año. ¿Cuánto vale un año después?`, `آلة قيمتها ${k} € تفقد ${r} % سنويًّا. كم قيمتها بعد سنة؟`, `A €${k} machine loses ${r} % a year. What is it worth a year later?`),
                lines: [line(LABELS.step, `a=${dec(r / 100)}`), line(LABELS.step, `V(1)=${k}\\cdot ${dec(r / 100)}`), line(LABELS.result, `${k * r / 100}`)],
                wrong: 0, error, fix: `a=1-${dec(r / 100)}=${dec(1 - r / 100)}\\ \\to\\ ${k * (100 - r) / 100}`, right: k * (100 - r) / 100, reached: k * r / 100
            }
        }
        case 'two-points-root': {
            const k = randomInt(random, 2, 6)
            const a = randomInt(random, 2, 5)
            const y2 = k * a * a
            return {
                problem: say(`$y=k\\cdot a^x$ funtzioa $(0,${k})$ eta $(2,${y2})$ puntuetatik pasatzen da. Aurkitu $a$.`, `La función $y=k\\cdot a^x$ pasa por $(0,${k})$ y $(2,${y2})$. Halla $a$.`, `تمر $y=k\\cdot a^x$ بـ $(0,${k})$ و$(2,${y2})$. أوجد $a$.`, `The function $y=k\\cdot a^x$ passes through $(0,${k})$ and $(2,${y2})$. Find $a$.`),
                lines: [line(LABELS.step, `k=${k}`), line(LABELS.step, `\\frac{${y2}}{${k}}=${a * a}`), line(LABELS.result, `a=${a * a}`)],
                wrong: 2, error, fix: `a^2=${a * a}\\ \\to\\ a=${a}`, right: a, reached: a * a
            }
        }
        case 'power-order': {
            const k = randomInt(random, 2, 5)
            const a = randomInt(random, 2, 3)
            const x = randomInt(random, 2, 3)
            return {
                problem: say(`Kalkulatu $y=${k}\\cdot ${a}^x$ funtzioaren balioa $x=${x}$ denean.`, `Calcula el valor de $y=${k}\\cdot ${a}^x$ en $x=${x}$.`, `احسب قيمة $y=${k}\\cdot ${a}^x$ عند $x=${x}$.`, `Work out $y=${k}\\cdot ${a}^x$ at $x=${x}$.`),
                lines: [line(LABELS.step, `${k}\\cdot ${a}=${k * a}`), line(LABELS.step, `${k * a}^{${x}}`), line(LABELS.result, `${(k * a) ** x}`)],
                wrong: 0, error, fix: `${a}^{${x}}=${a ** x}\\ \\to\\ ${k}\\cdot ${a ** x}=${k * a ** x}`, right: k * a ** x, reached: (k * a) ** x
            }
        }
        case 'percent-sum': {
            const r = pick(random, [10, 20, 30])
            const p = 100 * randomInt(random, 1, 9)
            const right = Math.round(p * (1 + r / 100) ** 2 * 100) / 100
            const reached = p * (1 + (2 * r) / 100)
            return {
                problem: say(`${p} euroko prezio bat % ${r} igo da bi aldiz. Zein da prezio berria?`, `Un precio de ${p} € sube un ${r} % dos veces. ¿Cuál es el precio nuevo?`, `سعر قيمته ${p} € يرتفع ${r} % مرتين. ما السعر الجديد؟`, `A price of €${p} goes up ${r} % twice. What is the new price?`),
                lines: [line(LABELS.step, `${r}+${r}=${2 * r}`), line(LABELS.step, `${p}\\cdot ${dec(1 + (2 * r) / 100)}`), line(LABELS.result, `${dec(reached)}`)],
                wrong: 0, error, fix: `${p}\\cdot ${dec(1 + r / 100)}^2=${dec(right)}`, right, reached
            }
        }
        case 'log-divide': {
            const a = randomInt(random, 2, 3)
            const t = randomInt(random, 3, 4)
            const c = a ** t
            return {
                problem: say(`Ebatzi $${a}^t=${c}$.`, `Resuelve $${a}^t=${c}$.`, `حُلّ $${a}^t=${c}$.`, `Solve $${a}^t=${c}$.`),
                lines: [line(LABELS.solve, `t=\\frac{${c}}{${a}}`), line(LABELS.step, `\\frac{${c}}{${a}}=${dec(c / a)}`), line(LABELS.result, `t=${dec(c / a)}`)],
                wrong: 0, error, fix: `${c}=${a}^{${t}}\\ \\to\\ t=${t}`, right: t, reached: c / a
            }
        }
        case 'log-quotient': {
            const a = pick(random, [2, 3])
            const c = pick(random, [10, 20, 50])
            const right = Math.log10(c) / Math.log10(a)
            const reached = Math.log10(c / a)
            return {
                problem: say(`Ebatzi $${a}^t=${c}$ logaritmoekin.`, `Resuelve $${a}^t=${c}$ con logaritmos.`, `حُلّ $${a}^t=${c}$ باللوغاريتمات.`, `Solve $${a}^t=${c}$ with logarithms.`),
                lines: [line(LABELS.step, `t\\cdot\\log ${a}=\\log ${c}`), line(LABELS.solve, `t=\\log\\frac{${c}}{${a}}`), line(LABELS.result, `t\\approx ${dec(Math.round(reached * 100) / 100)}`)],
                wrong: 1, error, fix: `t=\\frac{\\log ${c}}{\\log ${a}}\\approx ${dec(Math.round(right * 100) / 100)}`, right, reached
            }
        }
        case 'log-domain': {
            const a = randomInt(random, 1, 9)
            return {
                problem: say(`Aurkitu $y=\\log(x+${a})$ funtzioaren izate-eremua.`, `Halla el dominio de $y=\\log(x+${a})$.`, `أوجد مجال $y=\\log(x+${a})$.`, `Find the domain of $y=\\log(x+${a})$.`),
                lines: [line(LABELS.step, `x+${a}>0`), line(LABELS.solve, `x>${a}`), line(LABELS.result, `(${a},+\\infty)`)],
                wrong: 1, error, fix: `x>-${a}\\ \\to\\ (-${a},+\\infty)`, right: -a, reached: a
            }
        }
        case 'doubling-linear': {
            const T = randomInt(random, 3, 12)
            const n = randomInt(random, 3, 4)
            return {
                problem: say(`Kopuru bat ${T} urtean behin bikoizten da. Zenbat aldiz handiagoa da ${n * T} urteren buruan?`, `Una cantidad se duplica cada ${T} años. ¿Por cuánto queda multiplicada a los ${n * T} años?`, `تتضاعف كمية كل ${T} سنوات. في كم تُضرب بعد ${n * T} سنة؟`, `An amount doubles every ${T} years. What is it multiplied by after ${n * T} years?`),
                lines: [line(LABELS.step, `\\frac{${n * T}}{${T}}=${n}`), line(LABELS.step, `2\\cdot ${n}`), line(LABELS.result, `${2 * n}`)],
                wrong: 1, error, fix: `2^{${n}}=${2 ** n}`, right: 2 ** n, reached: 2 * n
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createSocExpDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, socExpDetectiveLevels[levelIndex], SOC_EXP_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

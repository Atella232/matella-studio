import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuen detektibea · Batxilergoa 2 (Detective de derivadas de 2.º):
   a solved exercise with exactly one wrong line, and the mistake to name.
   The mistakes are the typical ones of this unit. Level 1, the review and
   differentiability: the normal with slope −m, (uv)′ = u′v′, equal slopes
   over a jump, a corner where the inside only touches 0. Level 2, the
   chain: the inner layer forgotten, the u′ of ln u forgotten, the
   alternating sign lost, n instead of n!. Level 3, special derivatives
   and tangents: 1/f′(b) for the inverse, y² derived as 2y, (xˣ)′ = x·xˣ⁻¹
   and the slope at the exterior point. The lines carry formulas only;
   \sin goes through the language's names.
   ========================================================================== */

export type Bach2DerivativesDetectiveError =
    | 'normal-slope'
    | 'product-rule'
    | 'slopes-only'
    | 'absolute-corner'
    | 'inner-layer'
    | 'missing-u-prime'
    | 'alternating-sign'
    | 'factorial'
    | 'inverse-point'
    | 'implicit-y-prime'
    | 'power-rule-exponent'
    | 'exterior-point'

export const bach2DerivativesDetectiveLevels: Bach2DerivativesDetectiveError[][] = [
    ['normal-slope', 'product-rule', 'slopes-only', 'absolute-corner'],
    ['inner-layer', 'missing-u-prime', 'alternating-sign', 'factorial'],
    ['inverse-point', 'implicit-y-prime', 'power-rule-exponent', 'exterior-point']
]

export const BACH2_DERIVATIVES_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
/** A term c·letters after another one: nothing for 0, +x or −x for ±1 */
const plusTerm = (coefficient: number, letters: string) => (coefficient === 0 ? '' : `${coefficient < 0 ? '-' : '+'}${Math.abs(coefficient) === 1 ? '' : Math.abs(coefficient)}${letters}`)
const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1))
const LABELS = {
    slope: say('Malda', 'Pendiente', 'الميل', 'Slope'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    left: say('Ezkerretik', 'Por la izquierda', 'من اليسار', 'From the left'),
    right: say('Eskuinetik', 'Por la derecha', 'من اليمين', 'From the right'),
    conclusion: say('Ondorioa', 'Conclusión', 'الاستنتاج', 'Conclusion'),
    derive: say('Deribatu', 'Deriva', 'اشتق', 'Differentiate'),
    pattern: say('Patroia', 'Patrón', 'النمط', 'Pattern')
}
const valueAt = (fn: string, ask: string) => say(`$${fn}$. Zenbat da $${ask}$?`, `$${fn}$. ¿Cuánto vale $${ask}$?`, `$${fn}$. كم تساوي $${ask}$؟`, `$${fn}$. What is $${ask}$?`)

type Built = Omit<WorkedCase<Bach2DerivativesDetectiveError>, 'options'>

function build(random: Random, error: Bach2DerivativesDetectiveError): Built | null {
    switch (error) {
        case 'normal-slope': {
            const a = randomInt(random, 1, 2)
            const p = randomInt(random, -1, 3)
            const m = 2 * a + p
            if (Math.abs(m) < 2) return null
            const fa = a * a + p * a
            return {
                problem: say(`Aurkitu $f(x)=x^2${plusTerm(p, 'x')}$ funtzioaren normalaren malda $x=${a}$ puntuan.`, `Halla la pendiente de la normal a $f(x)=x^2${plusTerm(p, 'x')}$ en $x=${a}$.`, `أوجد ميل العمودي على $f(x)=x^2${plusTerm(p, 'x')}$ عند $x=${a}$.`, `Find the slope of the normal to $f(x)=x^2${plusTerm(p, 'x')}$ at $x=${a}$.`),
                lines: [line(LABELS.slope, `f'(${a})=${m}`), line(LABELS.step, `m_{\\perp}=${-m}`), line(LABELS.result, `y${fa === 0 ? '' : `-${fa}`}=${-m}(x-${a})`)],
                wrong: 1, error, fix: `m_{\\perp}=-\\frac{1}{f'(${a})}=-\\frac{1}{${m}}`, right: -1 / m, reached: -m
            }
        }
        case 'product-rule': {
            const p = randomInt(random, 1, 4)
            const q = randomInt(random, 1, 4)
            const right = 2 * (1 + q) + (1 + p)
            return {
                problem: valueAt(`f(x)=(x^2+${p})(x+${q})`, "f'(1)"),
                lines: [line(LABELS.derive, "u'=2x\\qquad v'=1"), line(LABELS.step, "f'(x)=u'\\cdot v'=2x"), line(LABELS.result, "f'(1)=2")],
                wrong: 1, error, fix: `f'(x)=2x(x+${q})+(x^2+${p})\\ \\to\\ f'(1)=${right}`, right, reached: 2
            }
        }
        case 'slopes-only': {
            const c1 = randomInt(random, -3, 3)
            const c2 = randomInt(random, -3, 3)
            if (1 + c1 === 2 + c2) return null
            return {
                problem: say(`Deribagarria al da $f(x)=\\begin{cases}x^2${signed(c1)} & x<1\\\\ 2x${signed(c2)} & x\\ge 1\\end{cases}$ funtzioa $x=1$ puntuan?`, `¿Es derivable $f(x)=\\begin{cases}x^2${signed(c1)} & x<1\\\\ 2x${signed(c2)} & x\\ge 1\\end{cases}$ en $x=1$?`, `هل $f(x)=\\begin{cases}x^2${signed(c1)} & x<1\\\\ 2x${signed(c2)} & x\\ge 1\\end{cases}$ قابلة للاشتقاق عند $x=1$؟`, `Is $f(x)=\\begin{cases}x^2${signed(c1)} & x<1\\\\ 2x${signed(c2)} & x\\ge 1\\end{cases}$ differentiable at $x=1$?`),
                lines: [line(LABELS.left, "f'(1^-)=2"), line(LABELS.right, "f'(1^+)=2"), line(LABELS.conclusion, "f'(1)=2")],
                wrong: 2, error, fix: `f(1^-)=${1 + c1}\\neq f(1^+)=${2 + c2}\\ \\to\\ \\nexists f'(1)`, right: 0, reached: 1
            }
        }
        case 'absolute-corner': {
            const a = randomInt(random, 1, 4)
            return {
                problem: say(`Zenbat puntutan ez da deribagarria $f(x)=|x^2-${2 * a}x+${a * a}|$?`, `¿En cuántos puntos no es derivable $f(x)=|x^2-${2 * a}x+${a * a}|$?`, `في كم نقطة تكون $f(x)=|x^2-${2 * a}x+${a * a}|$ غير قابلة للاشتقاق؟`, `At how many points is $f(x)=|x^2-${2 * a}x+${a * a}|$ not differentiable?`),
                lines: [line(LABELS.step, `x^2-${2 * a}x+${a * a}=(x-${a})^2`), line(LABELS.step, `f'(${a}^-)\\neq f'(${a}^+)`), line(LABELS.result, '1')],
                wrong: 1, error, fix: `(x-${a})^2\\ge 0\\ \\to\\ f'(${a}^-)=f'(${a}^+)=0`, right: 0, reached: 1
            }
        }
        case 'inner-layer': {
            const k = randomInt(random, 2, 6)
            return {
                problem: valueAt(`f(x)=e^{\\sin(${k}x)}`, "f'(0)"),
                lines: [line(LABELS.derive, `f'(x)=e^{\\sin(${k}x)}\\cdot\\cos(${k}x)`), line(LABELS.step, "f'(0)=e^{0}\\cdot\\cos 0"), line(LABELS.result, '1')],
                wrong: 0, error, fix: `f'(x)=e^{\\sin(${k}x)}\\cdot\\cos(${k}x)\\cdot ${k}\\ \\to\\ ${k}`, right: k, reached: 1
            }
        }
        case 'missing-u-prime': {
            const c = randomInt(random, 1, 5)
            return {
                problem: valueAt(`f(x)=\\ln(x^2+${c})`, "f'(1)"),
                lines: [line(LABELS.derive, `f'(x)=\\frac{1}{x^2+${c}}`), line(LABELS.step, `f'(1)=\\frac{1}{1+${c}}`), line(LABELS.result, `\\frac{1}{${1 + c}}`)],
                wrong: 0, error, fix: `f'(x)=\\frac{2x}{x^2+${c}}\\ \\to\\ \\frac{2}{${1 + c}}`, right: 2 / (1 + c), reached: 1 / (1 + c)
            }
        }
        case 'alternating-sign': {
            const n = pick(random, [3, 5])
            const b = randomInt(random, 1, 3)
            const value = factorial(n) / b ** (n + 1)
            const shown = b === 1 ? String(factorial(n)) : `\\frac{${factorial(n)}}{${b ** (n + 1)}}`
            return {
                problem: valueAt(`f(x)=\\frac{1}{x+${b}}`, `f^{(${n})}(0)`),
                lines: [line(LABELS.derive, `f''(x)=2(x+${b})^{-3}`), line(LABELS.pattern, `f^{(n)}=n!\\,(x+${b})^{-(n+1)}`), line(LABELS.result, `f^{(${n})}(0)=${shown}`)],
                wrong: 1, error, fix: `f^{(n)}=(-1)^n\\,n!\\,(x+${b})^{-(n+1)}\\ \\to\\ -${shown}`, right: -value, reached: value
            }
        }
        case 'factorial': {
            const n = randomInt(random, 3, 5)
            return {
                problem: valueAt('f(x)=\\frac{1}{1-x}', `f^{(${n})}(0)`),
                lines: [line(LABELS.derive, "f''(x)=2(1-x)^{-3}"), line(LABELS.pattern, 'f^{(n)}=n\\,(1-x)^{-(n+1)}'), line(LABELS.result, `f^{(${n})}(0)=${n}`)],
                wrong: 1, error, fix: `f^{(n)}=n!\\,(1-x)^{-(n+1)}\\ \\to\\ ${n}!=${factorial(n)}`, right: factorial(n), reached: n
            }
        }
        case 'inverse-point': {
            const p = randomInt(random, 1, 4)
            const b = 1 + p
            const wrongSlope = 3 * b * b + p
            return {
                problem: say(`$f(x)=x^3+${p === 1 ? '' : p}x$ funtzioak alderantzizkoa du, eta $f(1)=${b}$. Zenbat da $(f^{-1})'(${b})$?`, `$f(x)=x^3+${p === 1 ? '' : p}x$ tiene inversa y $f(1)=${b}$. ¿Cuánto vale $(f^{-1})'(${b})$?`, `للدالة $f(x)=x^3+${p === 1 ? '' : p}x$ دالة عكسية و$f(1)=${b}$. كم تساوي $(f^{-1})'(${b})$؟`, `$f(x)=x^3+${p === 1 ? '' : p}x$ has an inverse and $f(1)=${b}$. What is $(f^{-1})'(${b})$?`),
                lines: [line(LABELS.derive, `f'(x)=3x^2+${p}`), line(LABELS.step, `(f^{-1})'(${b})=\\frac{1}{f'(${b})}`), line(LABELS.result, `\\frac{1}{${wrongSlope}}`)],
                wrong: 1, error, fix: `(f^{-1})'(${b})=\\frac{1}{f'(1)}=\\frac{1}{${3 + p}}`, right: 1 / (3 + p), reached: 1 / wrongSlope
            }
        }
        case 'implicit-y-prime': {
            const [x, y] = pick(random, [[3, 4], [4, 3], [1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2]] as Array<[number, number]>)
            const r2 = x * x + y * y
            return {
                problem: say(`Aurkitu $x^2+y^2=${r2}$ kurbaren zuzen ukitzailearen malda $(${x},${y})$ puntuan.`, `Halla la pendiente de la tangente a $x^2+y^2=${r2}$ en $(${x},${y})$.`, `أوجد ميل مماس $x^2+y^2=${r2}$ عند $(${x},${y})$.`, `Find the slope of the tangent to $x^2+y^2=${r2}$ at $(${x},${y})$.`),
                lines: [line(LABELS.derive, '2x+2y=0'), line(LABELS.step, 'y=-x'), line(LABELS.result, "y'=-1")],
                wrong: 0, error, fix: `2x+2y\\,y'=0\\ \\to\\ y'=-\\frac{${x}}{${y}}`, right: -x / y, reached: -1
            }
        }
        case 'power-rule-exponent': {
            const a = pick(random, [2, 3])
            const power = a ** a
            return {
                problem: valueAt('f(x)=x^x', `f'(${a})`),
                lines: [line(LABELS.derive, "f'(x)=x\\cdot x^{x-1}"), line(LABELS.step, `f'(${a})=${a}\\cdot ${a}^{${a - 1}}`), line(LABELS.result, String(power))],
                wrong: 0, error, fix: `f'(x)=x^x(\\ln x+1)\\ \\to\\ ${power}(\\ln ${a}+1)`, right: power * (Math.log(a) + 1), reached: power
            }
        }
        case 'exterior-point': {
            const k = randomInt(random, 1, 4)
            return {
                problem: say(`Aurkitu $y=x^2$ parabolaren zuzen ukitzaileen malda positiboa, $P(0,-${k * k})$ puntutik igarotzen direnean.`, `Halla la pendiente positiva de las tangentes a $y=x^2$ que pasan por $P(0,-${k * k})$.`, `أوجد الميل الموجب لمماسات $y=x^2$ المارة بالنقطة $P(0,-${k * k})$.`, `Find the positive slope of the tangents to $y=x^2$ through $P(0,-${k * k})$.`),
                lines: [line(LABELS.slope, "f'(0)=0"), line(LABELS.step, 'm=0'), line(LABELS.result, `y=-${k * k}`)],
                wrong: 0, error, fix: `-${k * k}=-c^2\\ \\to\\ c=\\pm ${k}\\ \\to\\ m=${2 * k}`, right: 2 * k, reached: 0
            }
        }
    }
}

export const bach2DerivativesDetectiveNames: Record<Bach2DerivativesDetectiveError, LocalizedText> = {
    'normal-slope': say('Normalaren malda $-m$ dela uste du', 'Creyó que la normal tiene pendiente $-m$', 'ظن أن ميل العمودي $-m$', 'Thought the normal has slope $-m$'),
    'product-rule': say('Deribatuak biderkatu ditu: $(uv)\'=u\'v\'$', 'Multiplicó las derivadas: $(uv)\'=u\'v\'$', 'ضرب المشتقتين: $(uv)\'=u\'v\'$', 'Multiplied the derivatives: $(uv)\'=u\'v\'$'),
    'slopes-only': say('Maldak bakarrik begiratu ditu, jarraitutasuna ez', 'Miró solo las pendientes, no la continuidad', 'نظر إلى الميلين فقط لا إلى الاتصال', 'Looked only at the slopes, not continuity'),
    'absolute-corner': say('Barrukoa zero den tokian beti punta dagoela uste du', 'Creyó que siempre hay pico donde lo de dentro se anula', 'ظن أن الزاوية تظهر دائمًا حيث ينعدم ما بالداخل', 'Thought there is always a corner where the inside is 0'),
    'inner-layer': say('Barruko geruza ahaztu du', 'Olvidó la capa de dentro', 'نسي الطبقة الداخلية', 'Forgot the inner layer'),
    'missing-u-prime': say('$(\\ln u)\'$ deribatuan $u\'$ ahaztu du', 'Olvidó la $u\'$ de $(\\ln u)\'$', 'نسي $u\'$ في $(\\ln u)\'$', 'Forgot the $u\'$ of $(\\ln u)\'$'),
    'alternating-sign': say('Txandakatzen den zeinua galdu du', 'Perdió el signo que alterna', 'أضاع الإشارة المتناوبة', 'Lost the alternating sign'),
    factorial: say('$n$ idatzi du $n!$ ordez', 'Escribió $n$ en lugar de $n!$', 'كتب $n$ بدل $n!$', 'Wrote $n$ instead of $n!$'),
    'inverse-point': say('$f\'$ deribatua $b$ puntuan ebaluatu du, $a$ puntuan ordez', 'Evaluó $f\'$ en $b$ en lugar de en $a$', 'قيّم $f\'$ عند $b$ بدل $a$', 'Evaluated $f\'$ at $b$ instead of at $a$'),
    'implicit-y-prime': say('$y^2$ deribatzean $y\'$ ahaztu du', 'Al derivar $y^2$ olvidó la $y\'$', 'نسي $y\'$ عند اشتقاق $y^2$', 'Forgot the $y\'$ when differentiating $y^2$'),
    'power-rule-exponent': say('Berreturen erregela erabili du berretzaile aldakor batekin', 'Usó la regla de la potencia con exponente variable', 'استعمل قاعدة القوة مع أس متغير', 'Used the power rule with a variable exponent'),
    'exterior-point': say('Malda $P$ puntuaren abzisan kalkulatu du', 'Calculó la pendiente en la abscisa de $P$', 'حسب الميل عند فاصلة $P$', 'Worked out the slope at the abscissa of $P$')
}

export const bach2DerivativesDetectiveTips: Record<Bach2DerivativesDetectiveError, LocalizedText> = {
    'normal-slope': say('Normala perpendikularra da: $m_{\\perp}=-\\frac{1}{m}$.', 'La normal es perpendicular: $m_{\\perp}=-\\frac{1}{m}$.', 'العمودي متعامد: $m_{\\perp}=-\\frac{1}{m}$.', 'The normal is perpendicular: $m_{\\perp}=-\\frac{1}{m}$.'),
    'product-rule': same('$(uv)\'=u\'v+uv\'$'),
    'slopes-only': say('Lehenik jarraitutasuna: jauzirik badago, ez da deribagarria.', 'Primero la continuidad: si hay salto, no es derivable.', 'الاتصال أولًا: إذا وُجدت قفزة فليست قابلة للاشتقاق.', 'Continuity first: with a jump, it is not differentiable.'),
    'absolute-corner': say('$g\\ge 0$ bada, $|g|=g$: ez dago puntarik.', 'Si $g\\ge 0$, $|g|=g$: no hay pico.', 'إذا كان $g\\ge 0$ فإن $|g|=g$: لا زاوية.', 'If $g\\ge 0$, $|g|=g$: there is no corner.'),
    'inner-layer': say('Geruza bakoitzak faktore bat ematen du, barrukoak ere bai.', 'Cada capa da un factor, también la de dentro.', 'كل طبقة تعطي عاملًا، والداخلية أيضًا.', 'Each layer gives a factor, the inner one too.'),
    'missing-u-prime': same('$(\\ln u)\'=\\frac{u\'}{u}$'),
    'alternating-sign': say('Deribatu bakoitzak zeinua aldatzen du: $(-1)^n$.', 'Cada derivada cambia el signo: $(-1)^n$.', 'كل مشتقة تغيّر الإشارة: $(-1)^n$.', 'Each derivative changes the sign: $(-1)^n$.'),
    factorial: say('Koefizienteak $1,\\ 2,\\ 6,\\ 24$ dira: $n!$.', 'Los coeficientes son $1,\\ 2,\\ 6,\\ 24$: $n!$.', 'المعاملات $1,\\ 2,\\ 6,\\ 24$: أي $n!$.', 'The coefficients are $1,\\ 2,\\ 6,\\ 24$: $n!$.'),
    'inverse-point': say('$(f^{-1})\'(b)=\\frac{1}{f\'(a)}$, $f(a)=b$ izanik.', '$(f^{-1})\'(b)=\\frac{1}{f\'(a)}$, con $f(a)=b$.', '$(f^{-1})\'(b)=\\frac{1}{f\'(a)}$ حيث $f(a)=b$.', '$(f^{-1})\'(b)=\\frac{1}{f\'(a)}$, with $f(a)=b$.'),
    'implicit-y-prime': same('$(y^2)\'=2y\\,y\'$'),
    'power-rule-exponent': say('Hartu logaritmoak: $(x^x)\'=x^x(\\ln x+1)$.', 'Toma logaritmos: $(x^x)\'=x^x(\\ln x+1)$.', 'خذ اللوغاريتم: $(x^x)\'=x^x(\\ln x+1)$.', 'Take logarithms: $(x^x)\'=x^x(\\ln x+1)$.'),
    'exterior-point': say('Ukitze-puntua ezezaguna da: $(c,c^2)$.', 'El punto de tangencia es desconocido: $(c,c^2)$.', 'نقطة التماس مجهولة: $(c,c^2)$.', 'The point of tangency is unknown: $(c,c^2)$.')
}

function same(text: string): LocalizedText {
    return say(text, text, text, text)
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBach2DerivativesDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bach2DerivativesDetectiveLevels[levelIndex], BACH2_DERIVATIVES_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH2_DERIVATIVES_DETECTIVE_ERRORS = bach2DerivativesDetectiveLevels.flat()

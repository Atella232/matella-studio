import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Adierazpenaren detektibea · Batxilergoa 2 (Detective de la
   representación): a solved exercise with exactly one wrong line, and the
   mistake to name. Level 1, the study before differentiating: an
   asymptote where there is a hole, even and odd mixed up, the sign of the
   difference with the asymptote, the n of the oblique one without the
   remainder. Level 2, exponentials, logarithms, roots and periods: ≥ in
   the domain of a logarithm, the constant of the horizontal asymptote
   forgotten, √x² read as x on the left, the period multiplied by k. Level
   3, reading graphs: f(|x|) read as |f(x)|, the vertex of f′ taken as the
   extremum of f, f′ touching the axis taken as an extremum, corners where
   f has no zeros. The lines carry formulas only.
   ========================================================================== */

export type Bach2SketchDetectiveError =
    | 'hole'
    | 'parity'
    | 'position-sign'
    | 'oblique-n'
    | 'log-domain'
    | 'horizontal-constant'
    | 'root-left'
    | 'period'
    | 'abs-even'
    | 'vertex'
    | 'touch'
    | 'corners'

export const bach2SketchDetectiveLevels: Bach2SketchDetectiveError[][] = [
    ['hole', 'parity', 'position-sign', 'oblique-n'],
    ['log-domain', 'horizontal-constant', 'root-left', 'period'],
    ['abs-even', 'vertex', 'touch', 'corners']
]

export const BACH2_SKETCH_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    limit: say('Limitea', 'Límite', 'النهاية', 'Limit'),
    domain: say('Izate-eremua', 'Dominio', 'المجال', 'Domain'),
    division: say('Zatiketa', 'División', 'القسمة', 'Division'),
    symmetry: say('Simetria', 'Simetría', 'التناظر', 'Symmetry'),
    sign: say('Zeinua', 'Signo', 'الإشارة', 'Sign'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

type Built = Omit<WorkedCase<Bach2SketchDetectiveError>, 'options'>

function build(random: Random, error: Bach2SketchDetectiveError): Built | null {
    switch (error) {
        case 'hole': {
            const a = randomInt(random, 2, 5)
            return {
                problem: say(`Zenbat asintota bertikal ditu $f(x)=\\frac{x^2-${a * a}}{x-${a}}$ funtzioak?`, `¿Cuántas asíntotas verticales tiene $f(x)=\\frac{x^2-${a * a}}{x-${a}}$?`, `كم مقاربًا رأسيًّا للدالة $f(x)=\\frac{x^2-${a * a}}{x-${a}}$؟`, `How many vertical asymptotes does $f(x)=\\frac{x^2-${a * a}}{x-${a}}$ have?`),
                lines: [line(LABELS.step, `x-${a}=0\\ \\to\\ x=${a}`), line(LABELS.limit, `\\lim_{x\\to ${a}}f(x)=\\infty`), line(LABELS.result, '1')],
                wrong: 1, error, fix: `\\lim_{x\\to ${a}}\\frac{(x-${a})(x+${a})}{x-${a}}=${2 * a}\\ \\to\\ 0`, right: 0, reached: 1
            }
        }
        case 'parity': {
            const k = pick(random, [1, 2, 3, 5])
            const f2 = 8 - 2 * k
            return {
                problem: say(`$f(x)=x^3-${k}x$ eta $f(2)=${f2}$. Kalkulatu $f(-2)$ simetria erabiliz.`, `$f(x)=x^3-${k}x$ y $f(2)=${f2}$. Calcula $f(-2)$ usando la simetría.`, `$f(x)=x^3-${k}x$ و$f(2)=${f2}$. احسب $f(-2)$ مستعملًا التناظر.`, `$f(x)=x^3-${k}x$ and $f(2)=${f2}$. Work out $f(-2)$ using symmetry.`),
                lines: [line(LABELS.symmetry, `f(-x)=-x^3+${k}x=-f(x)`), line(LABELS.step, 'f(-2)=f(2)'), line(LABELS.result, `f(-2)=${f2}`)],
                wrong: 1, error, fix: `f(-2)=-f(2)=${-f2}`, right: -f2, reached: f2
            }
        }
        case 'position-sign': {
            const k = pick(random, [2, 4, 6])
            return {
                problem: say(`$f(x)=x+\\frac{${k}}{x}$ funtziorako, kalkulatu $f(-2)-(-2)$, asintota zeiharrarekiko kendura.`, `Para $f(x)=x+\\frac{${k}}{x}$, calcula $f(-2)-(-2)$, la diferencia con la asíntota oblicua.`, `للدالة $f(x)=x+\\frac{${k}}{x}$، احسب $f(-2)-(-2)$، الفرق عن المقارب المائل.`, `For $f(x)=x+\\frac{${k}}{x}$, work out $f(-2)-(-2)$, the difference from the oblique asymptote.`),
                lines: [line(LABELS.step, `f(x)-x=\\frac{${k}}{x}`), line(LABELS.sign, `f(-2)-(-2)=\\frac{${k}}{2}`), line(LABELS.result, `${k / 2}>0`)],
                wrong: 1, error, fix: `f(-2)-(-2)=\\frac{${k}}{-2}=${-k / 2}`, right: -k / 2, reached: k / 2
            }
        }
        case 'oblique-n': {
            const b = pick(random, [1, 2, 3])
            const p = pick(random, [1, 2])
            const q = b + p
            const rest = p * q
            return {
                problem: say(`$f(x)=\\frac{x^2+${b}x}{x-${p}}$ funtzioaren asintota zeiharra $y=x+n$ da. Zenbat da $n$?`, `La asíntota oblicua de $f(x)=\\frac{x^2+${b}x}{x-${p}}$ es $y=x+n$. ¿Cuánto vale $n$?`, `المقارب المائل للدالة $f(x)=\\frac{x^2+${b}x}{x-${p}}$ هو $y=x+n$. كم تساوي $n$؟`, `The oblique asymptote of $f(x)=\\frac{x^2+${b}x}{x-${p}}$ is $y=x+n$. What is $n$?`),
                lines: [line(LABELS.division, `x^2+${b}x=(x-${p})(x+${q})+${rest}`), line(LABELS.step, `y=x+${b}`), line(LABELS.result, `n=${b}`)],
                wrong: 1, error, fix: `y=x+${q}\\ \\to\\ n=${q}`, right: q, reached: b
            }
        }
        case 'log-domain': {
            const p = randomInt(random, 1, 5)
            return {
                problem: say(`Zein da $f(x)=\\ln(x-${p})$ funtzioaren izate-eremuko zenbaki osorik txikiena?`, `¿Cuál es el menor número entero del dominio de $f(x)=\\ln(x-${p})$?`, `ما أصغر عدد صحيح في مجال $f(x)=\\ln(x-${p})$؟`, `What is the smallest whole number in the domain of $f(x)=\\ln(x-${p})$?`),
                lines: [line(LABELS.domain, `x-${p}\\ge 0`), line(LABELS.step, `x\\ge ${p}`), line(LABELS.result, `${p}`)],
                wrong: 0, error, fix: `x-${p}>0\\ \\to\\ x>${p}\\ \\to\\ ${p + 1}`, right: p + 1, reached: p
            }
        }
        case 'horizontal-constant': {
            const k = randomInt(random, 2, 6)
            return {
                problem: say(`Aurkitu $f(x)=${k}+e^{-x}$ funtzioaren asintota horizontala $x\\to+\\infty$ doanean.`, `Halla la asíntota horizontal de $f(x)=${k}+e^{-x}$ cuando $x\\to+\\infty$.`, `أوجد المقارب الأفقي للدالة $f(x)=${k}+e^{-x}$ عندما $x\\to+\\infty$.`, `Find the horizontal asymptote of $f(x)=${k}+e^{-x}$ as $x\\to+\\infty$.`),
                lines: [line(LABELS.limit, '\\lim_{x\\to+\\infty}e^{-x}=0'), line(LABELS.step, '\\lim_{x\\to+\\infty}f(x)=0'), line(LABELS.result, 'y=0')],
                wrong: 1, error, fix: `\\lim_{x\\to+\\infty}f(x)=${k}+0=${k}\\ \\to\\ y=${k}`, right: k, reached: 0
            }
        }
        case 'root-left': {
            const c = randomInt(random, 1, 9)
            return {
                problem: say(`Zein da $f(x)=\\sqrt{x^2+${c}}$ funtzioaren asintota zeiharraren malda $x\\to-\\infty$ doanean?`, `¿Cuál es la pendiente de la asíntota oblicua de $f(x)=\\sqrt{x^2+${c}}$ cuando $x\\to-\\infty$?`, `ما ميل المقارب المائل للدالة $f(x)=\\sqrt{x^2+${c}}$ عندما $x\\to-\\infty$؟`, `What is the slope of the oblique asymptote of $f(x)=\\sqrt{x^2+${c}}$ as $x\\to-\\infty$?`),
                lines: [line(LABELS.limit, `m=\\lim_{x\\to-\\infty}\\frac{\\sqrt{x^2+${c}}}{x}`), line(LABELS.step, '\\sqrt{x^2}=x'), line(LABELS.result, 'm=1')],
                wrong: 1, error, fix: '\\sqrt{x^2}=|x|=-x\\ \\to\\ m=-1', right: -1, reached: 1
            }
        }
        case 'period': {
            const k = pick(random, [3, 4, 5])
            return {
                problem: say(`$f(x)=\\sin ${k}x$ funtzioaren periodoa $T=c\\,\\pi$ da. Zenbat da $c$?`, `El periodo de $f(x)=\\sin ${k}x$ es $T=c\\,\\pi$. ¿Cuánto vale $c$?`, `دور الدالة $f(x)=\\sin ${k}x$ هو $T=c\\,\\pi$. كم تساوي $c$؟`, `The period of $f(x)=\\sin ${k}x$ is $T=c\\,\\pi$. What is $c$?`),
                lines: [line(LABELS.step, `\\sin(${k}x+2\\pi)=\\sin ${k}x`), line(LABELS.step, `T=2\\pi\\cdot ${k}`), line(LABELS.result, `c=${2 * k}`)],
                wrong: 1, error, fix: `${k}T=2\\pi\\ \\to\\ T=\\frac{2\\pi}{${k}}`, right: 2 / k, reached: 2 * k
            }
        }
        case 'abs-even': {
            const a = randomInt(random, 1, 5)
            return {
                problem: say(`$f(x)=x^2-${a}x$ izanik, kalkulatu $f(|x|)$ funtzioaren balioa $x=-2$ puntuan.`, `Con $f(x)=x^2-${a}x$, calcula el valor de $f(|x|)$ en $x=-2$.`, `مع $f(x)=x^2-${a}x$، احسب قيمة $f(|x|)$ عند $x=-2$.`, `With $f(x)=x^2-${a}x$, work out the value of $f(|x|)$ at $x=-2$.`),
                lines: [line(LABELS.step, '|-2|=2'), line(LABELS.step, 'f(|-2|)=|f(-2)|'), line(LABELS.result, `|4+${2 * a}|=${4 + 2 * a}`)],
                wrong: 1, error, fix: `f(|-2|)=f(2)=4-${2 * a}=${4 - 2 * a}`, right: 4 - 2 * a, reached: 4 + 2 * a
            }
        }
        case 'vertex': {
            const a = randomInt(random, 1, 3)
            return {
                problem: say(`$f'$ deribatuaren grafikoa $y=x^2-${a * a}$ parabola da. Zein $x$ baliotan du $f$ funtzioak maximoa?`, `La gráfica de $f'$ es la parábola $y=x^2-${a * a}$. ¿En qué $x$ tiene $f$ su máximo?`, `رسم $f'$ هو القطع المكافئ $y=x^2-${a * a}$. عند أي $x$ تكون القيمة العظمى لـ $f$؟`, `The graph of $f'$ is the parabola $y=x^2-${a * a}$. At which $x$ does $f$ have its maximum?`),
                lines: [line(LABELS.step, `x^2-${a * a}=0\\ \\to\\ x=\\pm ${a}`), line(LABELS.step, `V(0,\\,-${a * a})`), line(LABELS.result, '\\max\\ \\to\\ x=0')],
                wrong: 2, error, fix: `f':\\ +\\ \\to\\ -\\ \\to\\ x=-${a}`, right: -a, reached: 0
            }
        }
        case 'touch': {
            const a = randomInt(random, -3, 3)
            const shown = a === 0 ? 'x^2' : `(x${a > 0 ? '-' : '+'}${Math.abs(a)})^2`
            return {
                problem: say(`$f'(x)=${shown}$ bada, zenbat mutur erlatibo ditu $f$ funtzioak?`, `Si $f'(x)=${shown}$, ¿cuántos extremos relativos tiene $f$?`, `إذا كانت $f'(x)=${shown}$ فكم قيمة قصوى محلية للدالة $f$؟`, `If $f'(x)=${shown}$, how many local extrema does $f$ have?`),
                lines: [line(LABELS.step, `${shown}=0\\ \\to\\ x=${a}`), line(LABELS.result, '1')],
                wrong: 1, error, fix: `${shown}\\ge 0\\ \\to\\ 0`, right: 0, reached: 1
            }
        }
        case 'corners': {
            const k = randomInt(random, 1, 9)
            return {
                problem: say(`Zenbat punta ditu $y=|x^2+${k}|$ funtzioaren grafikoak?`, `¿Cuántos picos tiene la gráfica de $y=|x^2+${k}|$?`, `كم زاوية في رسم $y=|x^2+${k}|$؟`, `How many corners does the graph of $y=|x^2+${k}|$ have?`),
                lines: [line(LABELS.step, `x^2+${k}=0`), line(LABELS.step, `x=\\pm\\sqrt{${k}}`), line(LABELS.result, '2')],
                wrong: 1, error, fix: `x^2=-${k}<0\\ \\to\\ 0`, right: 0, reached: 2
            }
        }
    }
}

export const bach2SketchDetectiveNames: Record<Bach2SketchDetectiveError, LocalizedText> = {
    hole: say('Zuloa asintotatzat hartu du', 'Tomar un agujero por una asíntota', 'اعتبار الفجوة مقاربًا', 'Taking a hole for an asymptote'),
    parity: say('Bikoitia eta bakoitia nahastu ditu', 'Confundir par e impar', 'الخلط بين الزوجية والفردية', 'Mixing up even and odd'),
    'position-sign': say('Kenduraren zeinuan huts egin du', 'Equivocarse en el signo de la diferencia', 'الخطأ في إشارة الفرق', 'Getting the sign of the difference wrong'),
    'oblique-n': say('Zatidura ondo idatzi gabe utzi du', 'No usar bien el cociente', 'عدم استعمال خارج القسمة جيدًا', 'Not using the quotient properly'),
    'log-domain': say('Logaritmoan 0 onartu du', 'Admitir el 0 en el logaritmo', 'قبول الصفر في اللوغاريتم', 'Allowing 0 in the logarithm'),
    'horizontal-constant': say('Konstantea ahaztu du', 'Olvidar la constante', 'نسيان الثابت', 'Forgetting the constant'),
    'root-left': say('$\\sqrt{x^2}=x$ jarri du', 'Poner $\\sqrt{x^2}=x$', 'كتابة $\\sqrt{x^2}=x$', 'Writing $\\sqrt{x^2}=x$'),
    period: say('Periodoa $k$ bider egin du', 'Multiplicar el periodo por $k$', 'ضرب الدور في $k$', 'Multiplying the period by $k$'),
    'abs-even': say('$f(|x|)$ eta $|f(x)|$ nahastu ditu', 'Confundir $f(|x|)$ con $|f(x)|$', 'الخلط بين $f(|x|)$ و$|f(x)|$', 'Mixing up $f(|x|)$ and $|f(x)|$'),
    vertex: say('$f\'$ grafikoa $f$ grafikoa balitz bezala irakurri du', 'Leer la gráfica de $f\'$ como si fuera la de $f$', 'قراءة رسم $f\'$ كأنه رسم $f$', 'Reading the graph of $f\'$ as if it were that of $f$'),
    touch: say('Ukitzea muturtzat hartu du', 'Tomar un roce por un extremo', 'اعتبار التماس قيمة قصوى', 'Taking a touch for an extremum'),
    corners: say('Zerorik ez dagoen tokian puntak jarri ditu', 'Poner picos donde no hay ceros', 'وضع زوايا حيث لا توجد أصفار', 'Putting corners where there are no zeros')
}

export const bach2SketchDetectiveTips: Record<Bach2SketchDetectiveError, LocalizedText> = {
    hole: say('Zenbakitzailea ere zero bada, sinplifikatu: zulo bat izan daiteke, ez asintota.', 'Si el numerador también se anula, simplifica: puede ser un agujero, no una asíntota.', 'إذا انعدم البسط أيضًا فبسّط: قد تكون فجوة لا مقاربًا.', 'If the numerator is 0 as well, simplify: it can be a hole, not an asymptote.'),
    parity: say('$f(-x)=-f(x)$ bada, funtzioa bakoitia da: $f(-2)=-f(2)$.', 'Si $f(-x)=-f(x)$, la función es impar: $f(-2)=-f(2)$.', 'إذا كان $f(-x)=-f(x)$ فالدالة فردية: $f(-2)=-f(2)$.', 'If $f(-x)=-f(x)$, the function is odd: $f(-2)=-f(2)$.'),
    'position-sign': say('Ordezkatu $x=-2$ zeinuarekin: kendura negatiboa da, kurba azpitik doa.', 'Sustituye $x=-2$ con su signo: la diferencia es negativa, la curva va por debajo.', 'عوّض $x=-2$ بإشارتها: الفرق سالب، يسير المنحنى تحته.', 'Substitute $x=-2$ with its sign: the difference is negative, the curve runs below.'),
    'oblique-n': say('Zeiharra zatiketaren zatidura osoa da.', 'La oblicua es el cociente entero de la división.', 'المائل هو خارج القسمة كاملًا.', 'The oblique asymptote is the whole quotient of the division.'),
    'log-domain': say('$\\ln$ funtzioak zenbaki positiboak bakarrik onartzen ditu: $>$, ez $\\ge$.', 'El $\\ln$ solo admite positivos: $>$, no $\\ge$.', 'لا يقبل $\\ln$ إلا الأعداد الموجبة: $>$ لا $\\ge$.', 'The $\\ln$ only takes positive numbers: $>$, not $\\ge$.'),
    'horizontal-constant': say('Batura baten limitea limiteen batura da: konstantea geratu egiten da.', 'El límite de una suma es la suma de los límites: la constante se queda.', 'نهاية المجموع مجموع النهايات: يبقى الثابت.', 'The limit of a sum is the sum of the limits: the constant stays.'),
    'root-left': say('$\\sqrt{x^2}=|x|$, eta $x<0$ denean, $|x|=-x$.', '$\\sqrt{x^2}=|x|$, y si $x<0$, $|x|=-x$.', '$\\sqrt{x^2}=|x|$، وإذا كان $x<0$ فإن $|x|=-x$.', '$\\sqrt{x^2}=|x|$, and if $x<0$, $|x|=-x$.'),
    period: say('$\\sin kx$ funtzioaren periodoa $\\frac{2\\pi}{k}$ da: $k$ handiagoa, uhin estuagoa.', 'El periodo de $\\sin kx$ es $\\frac{2\\pi}{k}$: más $k$, onda más estrecha.', 'دور $\\sin kx$ هو $\\frac{2\\pi}{k}$: كلما كبر $k$ ضاقت الموجة.', 'The period of $\\sin kx$ is $\\frac{2\\pi}{k}$: the bigger $k$, the narrower the wave.'),
    'abs-even': say('$f(|x|)$: lehenik balio absolutua $x$ aldagaiari, gero $f$.', '$f(|x|)$: primero el valor absoluto de $x$, después $f$.', '$f(|x|)$: أولًا القيمة المطلقة لـ $x$ ثم $f$.', '$f(|x|)$: first the absolute value of $x$, then $f$.'),
    vertex: say('$f$ funtzioaren muturra $f\'$ deribatuak zeinua aldatzen duen tokian dago; $f\'$ deribatuaren erpina $f$ funtzioaren inflexioa da.', 'El extremo de $f$ está donde $f\'$ cambia de signo; el vértice de $f\'$ es la inflexión de $f$.', 'القيمة القصوى لـ $f$ حيث تغيّر $f\'$ إشارتها؛ ورأس $f\'$ هو انعطاف $f$.', 'The extremum of $f$ is where $f\'$ changes sign; the vertex of $f\'$ is the inflection of $f$.'),
    touch: say('Muturra egoteko $f\'$ deribatuak zeinua aldatu behar du; karratu bat ez da negatiboa.', 'Para que haya extremo, $f\'$ tiene que cambiar de signo; un cuadrado no es negativo.', 'لتوجد قيمة قصوى يجب أن تغيّر $f\'$ إشارتها؛ والمربع ليس سالبًا.', 'For an extremum, $f\'$ has to change sign; a square is not negative.'),
    corners: say('Puntak $f$ funtzioak zeinua aldatzen duen zeroetan daude; $x^2+k$ beti da positiboa.', 'Los picos están en los ceros donde $f$ cambia de signo; $x^2+k$ siempre es positivo.', 'الزوايا عند الأصفار التي تغيّر فيها $f$ إشارتها؛ و$x^2+k$ موجبة دائمًا.', 'The corners are at the zeros where $f$ changes sign; $x^2+k$ is always positive.')
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBach2SketchDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bach2SketchDetectiveLevels[levelIndex], BACH2_SKETCH_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH2_SKETCH_DETECTIVE_ERRORS = bach2SketchDetectiveLevels.flat()

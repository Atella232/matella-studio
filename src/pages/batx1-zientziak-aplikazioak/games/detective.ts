import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   J5 · Deribatuaren aplikazioen detektibea (Detective de aplicaciones): a
   worked solution of three lines with one wrong line, the mistakes of
   this unit. Level 1, increase and extrema: the sign of f instead of f′,
   one interval across a point outside the domain, «f′ = 0, so an
   extremum» (x³), f″ > 0 read as a maximum; level 2, concavity and
   coefficients: «f″ = 0, so an inflection» (x⁴), f′ used for an
   inflection, the height put into f′, f′ > 0 read as ∪; level 3,
   optimisation and graphs: the ends of [a, b] forgotten, x given instead
   of the value asked for, the whole perimeter in place of half of it, a
   point outside the domain read as an extremum. The lines carry no words:
   ↗ and ↘ say rises and falls, ∪ and ∩ the concavity.
   `right` and `reached` only tell the cases apart.
   ========================================================================== */

export type BachApplicationsDetectiveError =
    | 'sign-of-f'
    | 'domain-gap'
    | 'flat-extremum'
    | 'second-swap'
    | 'second-zero'
    | 'first-for-inflection'
    | 'height-in-derivative'
    | 'concavity-from-first'
    | 'forgot-ends'
    | 'x-not-value'
    | 'whole-perimeter'
    | 'hole-extremum'

export const bachApplicationsDetectiveLevels: BachApplicationsDetectiveError[][] = [
    ['sign-of-f', 'domain-gap', 'flat-extremum', 'second-swap'],
    ['second-zero', 'first-for-inflection', 'height-in-derivative', 'concavity-from-first'],
    ['forgot-ends', 'x-not-value', 'whole-perimeter', 'hole-extremum']
]

export const BACH_APPLICATIONS_DETECTIVE_CASES = 6

const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const signed = (value: number) => (value === 0 ? '' : value > 0 ? `+${value}` : `-${-value}`)
/** −3p/2 written as a whole number or a fraction */
const halfOf = (value: number) => (Number.isInteger(value / 2) ? String(value / 2) : `${value < 0 ? '-' : ''}\\frac{${Math.abs(value)}}{2}`)
const LABELS = {
    substitute: say('Ordezkatu', 'Sustituye', 'عوّض', 'Substitute'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    rule: say('Erregela', 'Regla', 'القاعدة', 'Rule'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const bachApplicationsDetectiveNames: Record<BachApplicationsDetectiveError, LocalizedText> = {
    'sign-of-f': say('$f$ funtzioaren zeinua begiratu du, ez $f\'$ deribatuarena', 'Miró el signo de $f$, no el de $f\'$', 'نظر إلى إشارة $f$ لا إلى إشارة $f\'$', 'Looked at the sign of $f$, not of $f\'$'),
    'domain-gap': say('Izate-eremutik kanpoko puntu bat jauzi du', 'Se saltó un punto fuera del dominio', 'تجاوز نقطة خارج المجال', 'Skipped a point outside the domain'),
    'flat-extremum': say('$f\'=0$ denez, mutur bat dagoela esan du', 'Dijo que hay extremo porque $f\'=0$', 'قال إن هناك قيمة قصوى لأن $f\'=0$', 'Said there is an extremum because $f\'=0$'),
    'second-swap': say('$f\'\'>0$ maximoa dela hartu du', 'Tomó $f\'\'>0$ como máximo', 'أخذ $f\'\'>0$ قيمة عظمى', 'Took $f\'\'>0$ as a maximum'),
    'second-zero': say('$f\'\'=0$ denez, inflexioa dagoela esan du', 'Dijo que hay inflexión porque $f\'\'=0$', 'قال إن هناك انعطافًا لأن $f\'\'=0$', 'Said there is an inflection because $f\'\'=0$'),
    'first-for-inflection': say('Inflexiorako $f\'$ erabili du, ez $f\'\'$', 'Usó $f\'$ para la inflexión, no $f\'\'$', 'استعمل $f\'$ للانعطاف لا $f\'\'$', 'Used $f\'$ for the inflection, not $f\'\'$'),
    'height-in-derivative': say('Puntuaren altuera deribatuan jarri du', 'Puso la altura del punto en la derivada', 'وضع ارتفاع النقطة في المشتقة', 'Put the height of the point into the derivative'),
    'concavity-from-first': say('Kurbadura $f\'$ deribatutik atera du', 'Sacó la curvatura de $f\'$', 'استخرج التقعّر من $f\'$', 'Took the concavity from $f\'$'),
    'forgot-ends': say('Tartearen muturrak ahaztu ditu', 'Olvidó los bordes del intervalo', 'نسي طرفي الفترة', 'Forgot the edges of the interval'),
    'x-not-value': say('$x$ eman du, eskatutako balioa eman beharrean', 'Dio la $x$ en vez del valor pedido', 'أعطى $x$ بدل القيمة المطلوبة', 'Gave $x$ instead of the value asked for'),
    'whole-perimeter': say('Perimetro osoa erabili du, erdia beharrean', 'Usó el perímetro entero en vez de la mitad', 'استعمل المحيط كله بدل نصفه', 'Used the whole perimeter instead of half'),
    'hole-extremum': say('Izate-eremutik kanpoko puntu bat mutur gisa hartu du', 'Tomó un punto fuera del dominio como extremo', 'أخذ نقطة خارج المجال قيمة قصوى', 'Took a point outside the domain as an extremum')
}

export const bachApplicationsDetectiveTips: Record<BachApplicationsDetectiveError, LocalizedText> = {
    'sign-of-f': say('Hazkundea $f\'$ deribatuaren zeinuak ematen du.', 'El crecimiento lo da el signo de $f\'$.', 'يحدد التزايدَ إشارةُ $f\'$.', 'Growth comes from the sign of $f\'$.'),
    'domain-gap': say('Izate-eremutik kanpoko puntuek tarteak bereizten dituzte.', 'Los puntos fuera del dominio separan los intervalos.', 'النقاط الواقعة خارج المجال تفصل الفترات.', 'The points outside the domain split the intervals.'),
    'flat-extremum': say('$f\'$ deribatuak zeinua aldatu behar du; $x^3$ funtzioan ez du aldatzen.', '$f\'$ tiene que cambiar de signo; en $x^3$ no cambia.', 'يجب أن تغير $f\'$ إشارتها؛ وفي $x^3$ لا تغيرها.', '$f\'$ has to change sign; for $x^3$ it does not.'),
    'second-swap': say('$f\'\'>0$ ∪ forma da: minimoa.', '$f\'\'>0$ es forma ∪: mínimo.', '$f\'\'>0$ شكل ∪: قيمة صغرى.', '$f\'\'>0$ is the shape ∪: a minimum.'),
    'second-zero': say('$f\'\'$ deribatuak zeinua aldatu behar du; $x^4$ funtzioan ez du aldatzen.', '$f\'\'$ tiene que cambiar de signo; en $x^4$ no cambia.', 'يجب أن تغير $f\'\'$ إشارتها؛ وفي $x^4$ لا تغيرها.', '$f\'\'$ has to change sign; for $x^4$ it does not.'),
    'first-for-inflection': say('Inflexio-puntua: $f\'\'(a)=0$.', 'Punto de inflexión: $f\'\'(a)=0$.', 'نقطة الانعطاف: $f\'\'(a)=0$.', 'Point of inflection: $f\'\'(a)=0$.'),
    'height-in-derivative': say('$(a,\\,b)$ puntuko muturra: $f\'(a)=0$ eta $f(a)=b$.', 'Extremo en $(a,\\,b)$: $f\'(a)=0$ y $f(a)=b$.', 'قيمة قصوى عند $(a,\\,b)$: $f\'(a)=0$ و$f(a)=b$.', 'An extremum at $(a,\\,b)$: $f\'(a)=0$ and $f(a)=b$.'),
    'concavity-from-first': say('Kurbadura $f\'\'$ deribatuak ematen du.', 'La curvatura la da $f\'\'$.', 'يحدد التقعّرَ $f\'\'$.', 'The concavity comes from $f\'\'$.'),
    'forgot-ends': say('$[a,\\,b]$ tartean, konparatu $f(a)$ eta $f(b)$ ere.', 'En $[a,\\,b]$, compara también $f(a)$ y $f(b)$.', 'في $[a,\\,b]$ قارن أيضًا $f(a)$ و$f(b)$.', 'On $[a,\\,b]$, compare $f(a)$ and $f(b)$ too.'),
    'x-not-value': say('Mozkina $B(x)$ da, ez $x$.', 'El beneficio es $B(x)$, no $x$.', 'الربح هو $B(x)$ لا $x$.', 'The profit is $B(x)$, not $x$.'),
    'whole-perimeter': say('$2x+2y=P$ bada, $y=\\frac{P}{2}-x$.', 'Si $2x+2y=P$, $y=\\frac{P}{2}-x$.', 'إذا كان $2x+2y=P$ فإن $y=\\frac{P}{2}-x$.', 'If $2x+2y=P$, then $y=\\frac{P}{2}-x$.'),
    'hole-extremum': say('$f$ ez badago puntu batean, ezin du muturrik izan han.', 'Si $f$ no existe en un punto, allí no puede haber extremo.', 'إذا لم توجد $f$ عند نقطة فلا قيمة قصوى هناك.', 'If $f$ does not exist at a point, there can be no extremum there.')
}

type Built = Omit<WorkedCase<BachApplicationsDetectiveError>, 'options'>

function build(random: Random, error: BachApplicationsDetectiveError): Built | null {
    switch (error) {
        case 'sign-of-f': {
            // f = x² − 2px + p² + c at p − 1: f > 0 but f′ < 0
            const p = randomInt(random, 2, 4)
            const c = randomInt(random, 1, 3)
            const a = p - 1
            const q = p * p + c
            return {
                problem: say(`Gorakorra ala beherakorra da $f(x)=x^2-${2 * p}x+${q}$ funtzioa $x=${a}$ puntuan?`, `¿Crece o decrece $f(x)=x^2-${2 * p}x+${q}$ en $x=${a}$?`, `هل $f(x)=x^2-${2 * p}x+${q}$ متزايدة أو متناقصة عند $x=${a}$؟`, `Is $f(x)=x^2-${2 * p}x+${q}$ increasing or decreasing at $x=${a}$?`),
                lines: [line(LABELS.substitute, `f(${a})=${a * a - 2 * p * a + q}`), line(LABELS.rule, `f(${a})>0\\ \\to\\ \\nearrow`), line(LABELS.result, '\\nearrow')],
                wrong: 1, error, fix: `f'(${a})=${2 * a - 2 * p}<0\\ \\to\\ \\searrow`, right: -1, reached: 1
            }
        }
        case 'domain-gap': {
            const a = pick(random, [-2, -1, 1, 2, 3])
            const k = pick(random, [1, 2, 3, 5])
            return {
                problem: say(`Aurkitu $f(x)=\\frac{${k}}{x${signed(-a)}}$ funtzioaren hazkunde-tarteak.`, `Halla los intervalos de crecimiento de $f(x)=\\frac{${k}}{x${signed(-a)}}$.`, `أوجد فترات تزايد $f(x)=\\frac{${k}}{x${signed(-a)}}$ وتناقصها.`, `Find where $f(x)=\\frac{${k}}{x${signed(-a)}}$ increases and decreases.`),
                lines: [line(LABELS.step, `f'(x)=-\\frac{${k}}{(x${signed(-a)})^2}<0`), line(LABELS.rule, '(-\\infty,\\,+\\infty)\\ \\searrow'), line(LABELS.result, '\\searrow')],
                wrong: 1, error, fix: `(-\\infty,\\,${a})\\quad (${a},\\,+\\infty)`, right: 2, reached: 1
            }
        }
        case 'flat-extremum': {
            const a = randomInt(random, -2, 2)
            const b = randomInt(random, -3, 3)
            return {
                problem: say(`Aurkitu $f(x)=${a === 0 ? 'x' : `(x${signed(-a)})`}^3${signed(b)}$ funtzioaren muturrak.`, `Halla los extremos de $f(x)=${a === 0 ? 'x' : `(x${signed(-a)})`}^3${signed(b)}$.`, `أوجد القيم القصوى للدالة $f(x)=${a === 0 ? 'x' : `(x${signed(-a)})`}^3${signed(b)}$.`, `Find the extrema of $f(x)=${a === 0 ? 'x' : `(x${signed(-a)})`}^3${signed(b)}$.`),
                lines: [line(LABELS.step, `f'(x)=3${a === 0 ? 'x' : `(x${signed(-a)})`}^2`), line(LABELS.rule, `f'(${a})=0\\ \\to\\ \\nearrow\\searrow`), line(LABELS.result, `(${a},\\,${b})`)],
                wrong: 1, error, fix: `f'(x)\\ge 0\\ \\to\\ \\nearrow\\nearrow`, right: 0, reached: 1
            }
        }
        case 'second-swap': {
            const a = pick(random, [-3, -2, -1, 1, 2, 3])
            return {
                problem: say(`Sailkatu $f(x)=x^2${signed(-2 * a)}x$ funtzioaren puntu singularra.`, `Clasifica el punto singular de $f(x)=x^2${signed(-2 * a)}x$.`, `صنّف النقطة الحرجة للدالة $f(x)=x^2${signed(-2 * a)}x$.`, `Classify the stationary point of $f(x)=x^2${signed(-2 * a)}x$.`),
                lines: [line(LABELS.step, `f'(x)=2x${signed(-2 * a)}=0`), line(LABELS.rule, `f''(${a})>0\\ \\to\\ \\nearrow\\searrow`), line(LABELS.result, `(${a},\\,${-a * a})`)],
                wrong: 1, error, fix: `f''(${a})>0\\ \\to\\ \\searrow\\nearrow`, right: -1, reached: 1
            }
        }
        case 'second-zero': {
            const c = randomInt(random, -3, 3)
            return {
                problem: say(`Badu $f(x)=x^4${signed(c)}$ funtzioak inflexio-punturik?`, `¿Tiene $f(x)=x^4${signed(c)}$ algún punto de inflexión?`, `هل للدالة $f(x)=x^4${signed(c)}$ نقطة انعطاف؟`, `Does $f(x)=x^4${signed(c)}$ have a point of inflection?`),
                lines: [line(LABELS.step, "f''(x)=12x^2"), line(LABELS.rule, "f''(0)=0\\ \\to\\ \\cap\\,\\cup"), line(LABELS.result, `(0,\\,${c})`)],
                wrong: 1, error, fix: '12x^2\\ge 0\\ \\to\\ \\cup\\,\\cup', right: 0, reached: 1
            }
        }
        case 'first-for-inflection': {
            const p = pick(random, [-2, -1, 1, 2])
            return {
                problem: say(`$f(x)=x^3+ax^2$ funtzioak inflexio-puntu bat du $x=${p}$ puntuan. Aurkitu $a$.`, `$f(x)=x^3+ax^2$ tiene un punto de inflexión en $x=${p}$. Halla $a$.`, `للدالة $f(x)=x^3+ax^2$ نقطة انعطاف عند $x=${p}$. أوجد $a$.`, `$f(x)=x^3+ax^2$ has a point of inflection at $x=${p}$. Find $a$.`),
                lines: [line(LABELS.rule, `f'(${p})=${3 * p * p}${signed(2 * p)}a=0`), line(LABELS.step, `a=${halfOf(-3 * p)}`), line(LABELS.result, `f(x)=x^3${halfOf(-3 * p).startsWith('-') ? '' : '+'}${halfOf(-3 * p)}x^2`)],
                wrong: 0, error, fix: `${6 * p}+2a=0\\ \\to\\ a=${-3 * p}`, right: -3 * p, reached: -3 * p / 2
            }
        }
        case 'height-in-derivative': {
            const p = pick(random, [-2, -1, 1, 2, 3])
            const q = pick(random, [-3, -2, -1, 1, 2, 4])
            return {
                problem: say(`$f(x)=x^2+bx+c$ funtzioak minimo bat du $(${p},\\,${q})$ puntuan. Aurkitu $b$.`, `$f(x)=x^2+bx+c$ tiene un mínimo en $(${p},\\,${q})$. Halla $b$.`, `للدالة $f(x)=x^2+bx+c$ قيمة صغرى عند $(${p},\\,${q})$. أوجد $b$.`, `$f(x)=x^2+bx+c$ has a minimum at $(${p},\\,${q})$. Find $b$.`),
                lines: [line(LABELS.rule, `f'(${p})=${q}`), line(LABELS.step, `${2 * p}+b=${q}`), line(LABELS.result, `b=${q - 2 * p}`)],
                wrong: 0, error, fix: `f'(${p})=0\\ \\to\\ b=${-2 * p}`, right: -2 * p, reached: q - 2 * p
            }
        }
        case 'concavity-from-first': {
            const p = randomInt(random, 1, 3)
            const c = randomInt(random, 0, 4)
            const f = `x^3${c === 0 ? '' : `${signed(c)}x`}`
            return {
                problem: say(`Nolakoa da $f(x)=${f}$ funtzioaren kurbadura $x=${-p}$ puntuan?`, `¿Cómo es la curvatura de $f(x)=${f}$ en $x=${-p}$?`, `كيف تقعّر $f(x)=${f}$ عند $x=${-p}$؟`, `How is $f(x)=${f}$ curved at $x=${-p}$?`),
                lines: [line(LABELS.substitute, `f'(${-p})=${3 * p * p + c}`), line(LABELS.rule, `f'(${-p})>0\\ \\to\\ \\cup`), line(LABELS.result, '\\cup')],
                wrong: 1, error, fix: `f''(${-p})<0\\ \\to\\ \\cap`, right: -1, reached: 1
            }
        }
        case 'forgot-ends': {
            const b = pick(random, [2, 3])
            return {
                problem: say(`Aurkitu $f(x)=x^3-3x$ funtzioaren maximo absolutua $[0,\\,${b}]$ tartean.`, `Halla el máximo absoluto de $f(x)=x^3-3x$ en $[0,\\,${b}]$.`, `أوجد القيمة العظمى المطلقة للدالة $f(x)=x^3-3x$ في $[0,\\,${b}]$.`, `Find the absolute maximum of $f(x)=x^3-3x$ on $[0,\\,${b}]$.`),
                lines: [line(LABELS.step, "f'(x)=3x^2-3=0"), line(LABELS.substitute, 'x=1\\ \\to\\ f(1)=-2'), line(LABELS.result, '(1,\\,-2)')],
                wrong: 2, error, fix: `f(0)=0\\quad f(${b})=${b ** 3 - 3 * b}`, right: b ** 3 - 3 * b, reached: -2
            }
        }
        case 'x-not-value': {
            const p = pick(random, [10, 15, 20, 25])
            const q = pick(random, [50, 100, 150])
            return {
                problem: say(`$B(x)=-x^2+${2 * p}x-${q}$ bada, zein da mozkinik handiena?`, `Si $B(x)=-x^2+${2 * p}x-${q}$, ¿cuál es el beneficio máximo?`, `إذا كان $B(x)=-x^2+${2 * p}x-${q}$ فما الربح الأكبر؟`, `If $B(x)=-x^2+${2 * p}x-${q}$, what is the greatest profit?`),
                lines: [line(LABELS.step, `B'(x)=-2x+${2 * p}=0`), line(LABELS.substitute, `x=${p}`), line(LABELS.result, String(p))],
                wrong: 2, error, fix: `B(${p})=${p * p - q}`, right: p * p - q, reached: p
            }
        }
        case 'whole-perimeter': {
            const P = pick(random, [12, 16, 20, 24])
            return {
                problem: say(`Perimetroa ${P} duten laukizuzenetatik, zein oinarrik ematen du azalerarik handiena?`, `De los rectángulos de perímetro ${P}, ¿qué base da el área mayor?`, `من المستطيلات التي محيطها ${P}، أي قاعدة تعطي أكبر مساحة؟`, `Of the rectangles with perimeter ${P}, which base gives the greatest area?`),
                lines: [line(LABELS.rule, `y=${P}-x`), line(LABELS.step, `A(x)=x(${P}-x)`), line(LABELS.result, `x=${P / 2}`)],
                wrong: 0, error, fix: `y=${P / 2}-x\\ \\to\\ x=${P / 4}`, right: P / 4, reached: P / 2
            }
        }
        case 'hole-extremum': {
            const a = pick(random, [-2, -1, 1, 2])
            return {
                problem: say(`Aurkitu $f(x)=\\frac{1}{(x${signed(-a)})^2}$ funtzioaren muturrak.`, `Halla los extremos de $f(x)=\\frac{1}{(x${signed(-a)})^2}$.`, `أوجد القيم القصوى للدالة $f(x)=\\frac{1}{(x${signed(-a)})^2}$.`, `Find the extrema of $f(x)=\\frac{1}{(x${signed(-a)})^2}$.`),
                lines: [line(LABELS.step, `f'(x)=-\\frac{2}{(x${signed(-a)})^3}`), line(LABELS.rule, `x=${a}:\\ +\\ \\to\\ -`), line(LABELS.result, `x=${a}\\ \\to\\ \\nearrow\\searrow`)],
                wrong: 2, error, fix: `x=${a}\\notin D`, right: 0, reached: 1
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createBachApplicationsDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, bachApplicationsDetectiveLevels[levelIndex], BACH_APPLICATIONS_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

export const BACH_APPLICATIONS_DETECTIVE_ERRORS = bachApplicationsDetectiveLevels.flat()

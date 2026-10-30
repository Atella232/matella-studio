import { fraction, type FractionValue } from '../../../features/unit-v2/math/fraction.ts'
import type { LabChallenge, LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { planeChallenges, reductionChallenges } from '../../dbh4-aplikatuak-ekuazioak/lab/labTools.ts'
import type { SystemsStageId } from '../lessons.tsx'
import { classify, inHalfPlane, latticePoints, solveLinear, type HalfPlane, type Linear, type Point, type Sense, type SystemKind } from '../systems.ts'

/* ==========================================================================
   Sistemak (4. DBH akademikoak) laboratory. The point on two lines and the
   reduction method come from 4. DBH aplikatuak, with their own challenges.
   The new tools: a second line moved against a fixed one (the coefficient
   test), the four ways to start a substitution, a line against a circle,
   two squares (a circle and a hyperbola), a half-plane with its test
   point, the triangle x ≥ 0, y ≥ 0, ax + by ≤ c with its whole points,
   two kinds of things that add up to a count and a total, and a shopping
   basket under a budget. Pure state logic; the components live next to
   this file. Tests in tests/sistemak-dbh4ak-lab.test.ts.
   ========================================================================== */

export type SystemsLabToolId = 'plane' | 'classify' | 'substitution' | 'reduction' | 'circle' | 'squares' | 'half-plane' | 'region' | 'mixture' | 'shopping'

export interface SystemsLabTool extends LabToolInfo {
    id: SystemsLabToolId
    stage: SystemsStageId
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export const systemsLabTools: SystemsLabTool[] = [
    { id: 'plane', stage: 'linear', lessonTopic: 'graphic', title: say('Puntua bi zuzenetan', 'El punto en las dos rectas', 'النقطة على المستقيمين', 'The point on both straight lines'), observe: say('Puntu bat sistemaren ebazpena da bi zuzenetan badago. Zuzenak paraleloak badira ez dago puntu hori; bat badatoz, zuzenaren puntu guztiek balio dute.', 'Un punto es solución del sistema si está en las dos rectas. Si son paralelas, no hay tal punto; si coinciden, vale cualquier punto de la recta.', 'تكون النقطة حلًّا للنظام إذا كانت على المستقيمين. وإذا كانا متوازيين فلا توجد نقطة كهذه؛ وإذا انطبقا صلحت كل نقطة من المستقيم.', 'A point is a solution of the system if it lies on both straight lines. If they are parallel, there is no such point; if they coincide, any point on the line works.') },
    { id: 'classify', stage: 'linear', lessonTopic: 'classify', title: say('Bigarren zuzena mugitzen', 'Mueve la segunda recta', 'حرّك المستقيم الثاني', 'Move the second straight line'), observe: say('a′ eta b′ aldatzean, zuzenak norabidea aldatzen du; c′ aldatzean, paraleloan mugitzen da. a/a′ = b/b′ denean, zuzenak paraleloak dira: c/c′ ere berdina bada, bat datoz.', 'Al cambiar a′ y b′, la recta cambia de dirección; al cambiar c′, se desplaza en paralelo. Cuando a/a′ = b/b′, las rectas son paralelas: si c/c′ también es igual, coinciden.', 'عند تغيير a′ وb′ يتغيّر اتجاه المستقيم؛ وعند تغيير c′ ينسحب موازيًا لنفسه. وعندما a/a′ = b/b′ يتوازى المستقيمان: وإذا تساوت c/c′ أيضًا انطبقا.', 'Changing a′ and b′ changes the direction of the straight line. Changing c′ moves it, keeping it parallel. When a/a′ = b/b′, the lines are parallel: if c/c′ is also equal, they coincide.') },
    { id: 'substitution', stage: 'methods', lessonTopic: 'substitution', title: say('Zein askatu?', '¿Qué despejar?', 'ماذا نعزل؟', 'What should you solve for?'), observe: say('Lau aukera daude: bi ekuazio eta bi ezezagun. Koefizientea 1 edo −1 bada, ez da zatikirik agertzen; bestela, bai. Ebazpena beti bera da.', 'Hay cuatro opciones: dos ecuaciones y dos incógnitas. Si el coeficiente es 1 o −1, no salen fracciones; si no, sí. La solución es siempre la misma.', 'هناك أربعة خيارات: معادلتان ومجهولان. إذا كان المعامل 1 أو −1 فلا تظهر كسور؛ وإلا ظهرت. والحل هو نفسه دائمًا.', 'There are four options: two equations and two unknowns. If the coefficient is 1 or −1, no fractions appear; otherwise, they do. The solution is always the same.') },
    { id: 'reduction', stage: 'methods', lessonTopic: 'reduction', title: say('Laburketa', 'Reducción', 'الحذف', 'Elimination'), observe: say('Biderkatzaileak aukeratu ezezagun baten koefizienteak aurkakoak izan daitezen. Orduan batzean ezezagun hori desagertzen da.', 'Elige los multiplicadores para que los coeficientes de una incógnita sean opuestos. Entonces, al sumar, esa incógnita desaparece.', 'اختر المضاعِفين ليصير معاملا أحد المجهولين متعاكسين. عندئذ يختفي ذلك المجهول بالجمع.', 'Choose multipliers so that the coefficients of one unknown are opposites. Then, when you add, that unknown disappears.') },
    { id: 'circle', stage: 'nonlinear', lessonTopic: 'line-curve', title: say('Zuzena eta zirkunferentzia', 'Recta y circunferencia', 'المستقيم والدائرة', 'Straight line and circle'), observe: say('Ordezkatzean bigarren mailako ekuazio bat ateratzen da: haren diskriminatzaileak esaten du zenbat ebaki-puntu dauden. Bi, bat (ukitzailea) edo bat ere ez.', 'Al sustituir sale una ecuación de segundo grado: su discriminante dice cuántos puntos de corte hay. Dos, uno (tangente) o ninguno.', 'بالتعويض تظهر معادلة من الدرجة الثانية: يخبر مميّزها بعدد نقاط التقاطع. اثنتان أو واحدة (مماس) أو لا شيء.', 'Substituting gives a quadratic equation: its discriminant tells you how many meeting points there are. Two, one (tangent) or none.') },
    { id: 'squares', stage: 'nonlinear', lessonTopic: 'squares', title: say('Bi karratu', 'Dos cuadrados', 'مربعان', 'Two squared terms'), observe: say('x² eta y² laburketaz ateratzen dira. Biak positiboak badira, lau ebazpen simetriko; bat 0 bada, bi; bat negatiboa bada, bat ere ez.', 'x² e y² salen por reducción. Si los dos son positivos, cuatro soluciones simétricas; si uno es 0, dos; si uno es negativo, ninguna.', 'يخرج x² وy² بالحذف. إذا كانا موجبين فأربعة حلول متناظرة؛ وإذا كان أحدهما 0 فحلّان؛ وإذا كان أحدهما سالبًا فلا حل.', 'x² and y² come out by elimination. If both are positive, four symmetric solutions; if one is 0, two; if one is negative, none.') },
    { id: 'half-plane', stage: 'half-planes', lessonTopic: 'half-plane', title: say('Erdiplanoa eta proba-puntua', 'Semiplano y punto de prueba', 'نصف المستوى ونقطة الاختبار', 'Half-plane and test point'), observe: say('Muga-zuzenaren alde batean inekuazioa betetzen da eta bestean ez. Proba-puntu bakar batek esaten du zein den. < edo > bada, zuzena bera ez dago barruan.', 'A un lado de la recta frontera se cumple la inecuación y al otro no. Un solo punto de prueba dice cuál es. Con < o >, la propia recta no entra.', 'تتحقق المتراجحة في جانب من المستقيم الحدّي ولا تتحقق في الآخر. وتكفي نقطة اختبار واحدة لمعرفة الجانب. ومع < أو > لا يدخل المستقيم نفسه.', 'The inequality holds on one side of the boundary line and not on the other. A single test point tells you which side. With < or >, the line itself is not included.') },
    { id: 'region', stage: 'half-planes', lessonTopic: 'region', title: say('Triangeluaren puntu osoak', 'Los puntos enteros del triángulo', 'النقاط الصحيحة في المثلث', 'The integer points of the triangle'), observe: say('x ≥ 0, y ≥ 0 eta ax + by ≤ c triangelu bat da, erpinak (c/a, 0) eta (0, c/b) dituena. Puntu osoak zutabeka zenbatzen dira.', 'x ≥ 0, y ≥ 0 y ax + by ≤ c forman un triángulo de vértices (c/a, 0) y (0, c/b). Los puntos enteros se cuentan por columnas.', 'x ≥ 0 وy ≥ 0 وax + by ≤ c تكوّن مثلثًا رأساه (c/a, 0) و(0, c/b). وتُعدّ النقاط الصحيحة عمودًا عمودًا.', 'x ≥ 0, y ≥ 0 and ax + by ≤ c form a triangle with vertices (c/a, 0) and (0, c/b). The integer points are counted column by column.') },
    { id: 'mixture', stage: 'problems', lessonTopic: 'linear-problems', title: say('Kopurua eta guztizkoa', 'Cuántos y cuánto', 'العدد والمجموع', 'How many and how much'), observe: say('Lehen ekuazioak kopurua ematen du (x + y = N) eta bigarrenak guztizkoa. x mugitzean, y ere aldatzen da, eta guztizkoa kantitate berean igotzen edo jaisten da beti.', 'La primera ecuación da cuántos hay (x + y = N) y la segunda el total. Al mover x, también cambia y, y el total sube o baja siempre en la misma cantidad.', 'تعطي المعادلة الأولى العدد (x + y = N) والثانية المجموع. وعند تحريك x يتغيّر y أيضًا، ويزيد المجموع أو ينقص دائمًا بالمقدار نفسه.', 'The first equation gives how many there are (x + y = N), and the second gives the total. When x changes, y changes too, and the total always goes up or down by the same amount.') },
    { id: 'shopping', stage: 'problems', lessonTopic: 'region-problems', title: say('Aurrekontuarekin erosten', 'Comprar con un presupuesto', 'الشراء بميزانية', 'Shop with a budget'), observe: say('Puntu bakoitza erosketa bat da. Eskualdeko puntu osoak bakarrik ordain daitezke. Muga-zuzenean dauden puntuek aurrekontu osoa gastatzen dute.', 'Cada punto es una compra. Solo se pueden pagar los puntos enteros de la región. Los que están en la recta frontera gastan todo el presupuesto.', 'كل نقطة عملية شراء. ولا يمكن دفع ثمن إلا النقاط الصحيحة من المنطقة. والنقاط على المستقيم الحدّي تنفق الميزانية كلها.', 'Each point is a purchase. Only the integer points of the region can be paid for. The points on the boundary line use up the whole budget.') }
]

export const systemsLabToolForTopic: Record<string, SystemsLabToolId | undefined> = {
    'linear-equations': 'plane',
    graphic: 'plane',
    classify: 'classify',
    substitution: 'substitution',
    equalization: 'substitution',
    reduction: 'reduction',
    'simplify-first': 'reduction',
    'line-curve': 'circle',
    squares: 'squares',
    'check-solutions': 'circle',
    'half-plane': 'half-plane',
    region: 'region',
    'linear-problems': 'mixture',
    'nonlinear-problems': 'circle',
    'region-problems': 'shopping'
}

/** ax + by = c in LaTeX: x+2y=3, -x-y=0, 2y=5 */
export function linearLatex({ a, b, c }: Linear, relation = '='): string {
    const term = (k: number, letter: string, first: boolean) => (k === 0 ? '' : `${k < 0 ? '-' : first ? '' : '+'}${Math.abs(k) === 1 ? '' : Math.abs(k)}${letter}`)
    const left = `${term(a, 'x', true)}${term(b, 'y', a === 0)}` || '0'
    return `${left}${relation}${c}`
}

/** A fraction in LaTeX */
export const texFraction = (value: FractionValue) => (value.denominator === 1 ? String(value.numerator) : `${value.numerator < 0 ? '-' : ''}\\frac{${Math.abs(value.numerator)}}{${value.denominator}}`)

/* ---------- 1. Moving the second line ---------- */

export const classifyFirstLines: Linear[] = [
    { a: 1, b: 2, c: 3 },
    { a: 2, b: -1, c: 4 },
    { a: 3, b: 1, c: 6 }
]

export const COEFFICIENT_LIMIT = 6

export interface ClassifyState {
    first: number
    second: Linear
}

export const initialClassifyState: ClassifyState = { first: 0, second: { a: 1, b: 1, c: 5 } }

export function setClassify(state: ClassifyState, patch: { first?: number; a?: number; b?: number; c?: number }): ClassifyState {
    const limit = (value: number) => clamp(value, -COEFFICIENT_LIMIT, COEFFICIENT_LIMIT)
    let a = limit(patch.a ?? state.second.a)
    let b = limit(patch.b ?? state.second.b)
    // 0x + 0y is not a line: jump over it
    if (a === 0 && b === 0) {
        if (patch.a !== undefined) a = patch.a < state.second.a ? -1 : 1
        else b = (patch.b ?? 0) < state.second.b ? -1 : 1
    }
    return { first: clamp(patch.first ?? state.first, 0, classifyFirstLines.length - 1), second: { a, b, c: limit(patch.c ?? state.second.c) } }
}

export const classifyKind = (state: ClassifyState): SystemKind => classify(classifyFirstLines[state.first], state.second)
export const classifySolution = (state: ClassifyState): Point | null => solveLinear(classifyFirstLines[state.first], state.second)
const solvedAt = (state: ClassifyState, x: number, y: number) => {
    const point = classifySolution(state)
    return point !== null && Math.abs(point[0] - x) < 1e-9 && Math.abs(point[1] - y) < 1e-9
}

export const classifyChallenges: LabChallenge<ClassifyState>[] = [
    { id: 67101, prompt: say('$x+2y=3$ izanik, egin sistema bateraezina.', 'Con $x+2y=3$, haz que el sistema sea incompatible.', 'مع $x+2y=3$ اجعل النظام غير متوافق.', 'With $x+2y=3$, make the system inconsistent.'), hint: say('$\\frac{a}{a\'}=\\frac{b}{b\'}\\ne\\frac{c}{c\'}$: adibidez $2x+4y=5$.', '$\\frac{a}{a\'}=\\frac{b}{b\'}\\ne\\frac{c}{c\'}$: por ejemplo $2x+4y=5$.', '$\\frac{a}{a\'}=\\frac{b}{b\'}\\ne\\frac{c}{c\'}$: مثلًا $2x+4y=5$.', '$\\frac{a}{a\'}=\\frac{b}{b\'}\\ne\\frac{c}{c\'}$: for example $2x+4y=5$.'), isSolved: (state) => state.first === 0 && classifyKind(state) === 'none' },
    { id: 67102, prompt: say('$2x-y=4$ izanik, egin sistemak infinitu ebazpen izatea.', 'Con $2x-y=4$, haz que el sistema tenga infinitas soluciones.', 'مع $2x-y=4$ اجعل للنظام حلولًا لا نهاية لها.', 'With $2x-y=4$, make the system have infinitely many solutions.'), hint: say('Bigarrena lehena bider zenbaki bat.', 'La segunda, la primera por un número.', 'الثانية هي الأولى مضروبة في عدد.', 'The second one is the first one multiplied by a number.'), isSolved: (state) => state.first === 1 && classifyKind(state) === 'infinite' },
    { id: 67103, prompt: say('$x+2y=3$ izanik, lortu $(1,1)$ ebazpena.', 'Con $x+2y=3$, consigue que la solución sea $(1,1)$.', 'مع $x+2y=3$ اجعل الحل $(1,1)$.', 'With $x+2y=3$, make the solution $(1,1)$.'), hint: say('Bigarren zuzenak $(1,1)$ puntutik pasatu behar du: $a\'+b\'=c\'$.', 'La segunda recta tiene que pasar por $(1,1)$: $a\'+b\'=c\'$.', 'يجب أن يمر المستقيم الثاني بـ$(1,1)$: $a\'+b\'=c\'$.', 'The second straight line must pass through $(1,1)$: $a\'+b\'=c\'$.'), isSolved: (state) => state.first === 0 && solvedAt(state, 1, 1) },
    { id: 67104, prompt: say('$3x+y=6$ izanik eta bigarren zuzena horizontala ($a\'=0$), lortu $(2,0)$ ebazpena.', 'Con $3x+y=6$ y la segunda recta horizontal ($a\'=0$), consigue que la solución sea $(2,0)$.', 'مع $3x+y=6$ ومستقيم ثانٍ أفقي ($a\'=0$) اجعل الحل $(2,0)$.', 'With $3x+y=6$ and a horizontal second straight line ($a\'=0$), make the solution $(2,0)$.'), hint: say('Zuzen horizontal hori X ardatza da: $y=0$.', 'Esa recta horizontal es el eje X: $y=0$.', 'هذا المستقيم الأفقي هو المحور X: $y=0$.', 'That horizontal line is the x-axis: $y=0$.'), isSolved: (state) => state.first === 2 && state.second.a === 0 && solvedAt(state, 2, 0) }
]

/* ---------- 2. What to isolate in a substitution ---------- */

export const substitutionSystems: Array<[Linear, Linear]> = [
    [{ a: 1, b: -2, c: 1 }, { a: 3, b: 1, c: 17 }],
    [{ a: 2, b: 3, c: 12 }, { a: 5, b: -2, c: 11 }],
    [{ a: 3, b: 2, c: 7 }, { a: 1, b: 4, c: 9 }]
]

export type Unknown = 'x' | 'y'

export interface SubstitutionState {
    system: number
    equation: 0 | 1
    unknown: Unknown
}

export const initialSubstitutionState: SubstitutionState = { system: 1, equation: 0, unknown: 'y' }

export const setSubstitution = (state: SubstitutionState, patch: Partial<SubstitutionState>): SubstitutionState => ({
    system: clamp(patch.system ?? state.system, 0, substitutionSystems.length - 1),
    equation: patch.equation ?? state.equation,
    unknown: patch.unknown ?? state.unknown
})

/** The coefficient of the unknown being isolated */
export function isolatedCoefficient(state: SubstitutionState): number {
    const equation = substitutionSystems[state.system][state.equation]
    return state.unknown === 'x' ? equation.a : equation.b
}

/** u = p + q·v, with v the other unknown, as two fractions */
export function isolate(state: SubstitutionState): { constant: FractionValue; slope: FractionValue } {
    const { a, b, c } = substitutionSystems[state.system][state.equation]
    const [own, other] = state.unknown === 'x' ? [a, b] : [b, a]
    return { constant: fraction(c, own), slope: fraction(-other, own) }
}

/** After substituting: K·v = C in the other equation, and the solution */
export function substituted(state: SubstitutionState): { k: FractionValue; c: FractionValue; value: FractionValue; solution: Point } {
    const { constant, slope } = isolate(state)
    const other = substitutionSystems[state.system][1 - state.equation]
    const [ownOther, vOther] = state.unknown === 'x' ? [other.a, other.b] : [other.b, other.a]
    // ownOther·(p + q·v) + vOther·v = c'
    const k = fraction(ownOther * slope.numerator * 1 + vOther * slope.denominator, slope.denominator)
    const cValue = fraction(other.c * constant.denominator - ownOther * constant.numerator, constant.denominator)
    const value = fraction(cValue.numerator * k.denominator, cValue.denominator * k.numerator)
    const isolatedValue = constant.numerator / constant.denominator + (slope.numerator / slope.denominator) * (value.numerator / value.denominator)
    const v = value.numerator / value.denominator
    return { k, c: cValue, value, solution: state.unknown === 'x' ? [isolatedValue, v] : [v, isolatedValue] }
}

/** The isolated unknown in LaTeX: x=2y+1, y=\frac{12-2x}{3} */
export function isolatedLatex(state: SubstitutionState): string {
    const { a, b, c } = substitutionSystems[state.system][state.equation]
    const [own, other, otherName] = state.unknown === 'x' ? [a, b, 'y'] : [b, a, 'x']
    // u = (c − other·v)/own, written with a positive denominator
    const sign = own < 0 ? -1 : 1
    const top = { k: (-other) * sign, c: c * sign }
    const term = top.k === 0 ? '' : `${top.k < 0 ? '-' : ''}${Math.abs(top.k) === 1 ? '' : Math.abs(top.k)}${otherName}`
    const numerator = top.c === 0 ? term || '0' : `${top.c}${top.k === 0 ? '' : top.k < 0 ? term : `+${term}`}`
    return Math.abs(own) === 1 ? `${state.unknown}=${numerator}` : `${state.unknown}=\\frac{${numerator}}{${Math.abs(own)}}`
}

export const substitutionChallenges: LabChallenge<SubstitutionState>[] = [
    { id: 67201, prompt: say('S1 sisteman, askatu zatikirik gabe.', 'En el sistema S1, despeja sin que salgan fracciones.', 'في النظام S1 اعزل دون أن تظهر كسور.', 'In system S1, solve for a variable without getting fractions.'), hint: say('Bilatu 1 edo −1 koefizientea.', 'Busca un coeficiente 1 o −1.', 'ابحث عن معامل 1 أو −1.', 'Look for a coefficient of 1 or −1.'), isSolved: (state) => state.system === 0 && Math.abs(isolatedCoefficient(state)) === 1 },
    { id: 67202, prompt: say('S3 sisteman, askatu x zatikirik gabe.', 'En el sistema S3, despeja la x sin fracciones.', 'في النظام S3 اعزل x دون كسور.', 'In system S3, solve for x without fractions.'), hint: say('Zein ekuaziotan du x-k 1 koefizientea?', '¿En qué ecuación tiene la x coeficiente 1?', 'في أي معادلة يكون معامل x هو 1؟', 'In which equation does x have a coefficient of 1?'), isSolved: (state) => state.system === 2 && state.unknown === 'x' && Math.abs(isolatedCoefficient(state)) === 1 },
    { id: 67203, prompt: say('S2 sisteman ez dago 1 koefizienterik. Aukeratu izendatzailerik txikiena ematen duen askapena.', 'En el sistema S2 no hay ningún coeficiente 1. Elige el despeje que da el denominador más pequeño.', 'لا يوجد في النظام S2 معامل 1. اختر العزل الذي يعطي أصغر مقام.', 'In system S2 there is no coefficient of 1. Choose the variable to solve for that gives the smallest denominator.'), hint: say('Koefizienteak: 2, 3, 5 eta −2.', 'Los coeficientes: 2, 3, 5 y −2.', 'المعاملات: 2 و3 و5 و−2.', 'The coefficients: 2, 3, 5 and −2.'), isSolved: (state) => state.system === 1 && Math.abs(isolatedCoefficient(state)) === 2 },
    { id: 67204, prompt: say('S1 sisteman, askatu y zatikirik gabe.', 'En el sistema S1, despeja la y sin fracciones.', 'في النظام S1 اعزل y دون كسور.', 'In system S1, solve for y without fractions.'), hint: say('Bigarren ekuazioan y-ren koefizientea 1 da.', 'En la segunda ecuación, el coeficiente de y es 1.', 'في المعادلة الثانية معامل y هو 1.', 'In the second equation, the coefficient of y is 1.'), isSolved: (state) => state.system === 0 && state.unknown === 'y' && Math.abs(isolatedCoefficient(state)) === 1 }
]

/* ---------- 3. A line against a circle ---------- */

export const CIRCLE_LIMITS = { r: { min: 1, max: 6 }, m: { min: -3, max: 3 }, n: { min: -9, max: 9 } } as const

export interface CircleState {
    r: number
    m: number
    n: number
}

export const initialCircleState: CircleState = { r: 4, m: 1, n: 1 }

export const setCircle = (state: CircleState, patch: Partial<CircleState>): CircleState => ({
    r: clamp(patch.r ?? state.r, CIRCLE_LIMITS.r.min, CIRCLE_LIMITS.r.max),
    m: clamp(patch.m ?? state.m, CIRCLE_LIMITS.m.min, CIRCLE_LIMITS.m.max),
    n: clamp(patch.n ?? state.n, CIRCLE_LIMITS.n.min, CIRCLE_LIMITS.n.max)
})

/** x² + (mx + n)² = r² ⇔ (1 + m²)x² + 2mn·x + n² − r² = 0; a quarter of its discriminant */
export const circleDiscriminant = ({ r, m, n }: CircleState) => r * r * (1 + m * m) - n * n

export function circlePoints(state: CircleState): Point[] {
    const { m, n } = state
    const delta = circleDiscriminant(state)
    if (delta < 0) return []
    const xs = delta === 0 ? [(-m * n) / (1 + m * m)] : [(-m * n - Math.sqrt(delta)) / (1 + m * m), (-m * n + Math.sqrt(delta)) / (1 + m * m)]
    return xs.map((x) => [x, m * x + n])
}

const hasPoint = (points: Point[], [x, y]: Point) => points.some((point) => Math.abs(point[0] - x) < 1e-9 && Math.abs(point[1] - y) < 1e-9)

export const circleChallenges: LabChallenge<CircleState>[] = [
    { id: 67301, prompt: say('Egin zuzena zirkunferentziaren ukitzailea izatea.', 'Haz que la recta sea tangente a la circunferencia.', 'اجعل المستقيم مماسًا للدائرة.', 'Make the straight line tangent to the circle.'), hint: say('Ebaki-puntu bakarra: adibidez $y=5$ eta erradioa 5.', 'Un solo punto de corte: por ejemplo $y=5$ y radio 5.', 'نقطة تقاطع واحدة: مثلًا $y=5$ ونصف القطر 5.', 'One meeting point: for example $y=5$ and radius 5.'), isSolved: (state) => circleDiscriminant(state) === 0 },
    { id: 67302, prompt: say('Ebatzi $x^{2}+y^{2}=25$, $x+y=7$: zuzena $(3,4)$ eta $(4,3)$ puntuetatik.', 'Resuelve $x^{2}+y^{2}=25$, $x+y=7$: la recta por $(3,4)$ y $(4,3)$.', 'حل $x^{2}+y^{2}=25$ و$x+y=7$: المستقيم يمر بـ$(3,4)$ و$(4,3)$.', 'Solve $x^{2}+y^{2}=25$, $x+y=7$: the straight line through $(3,4)$ and $(4,3)$.'), hint: say('$y=-x+7$: $m=-1$, $n=7$.', '$y=-x+7$: $m=-1$, $n=7$.', '$y=-x+7$: $m=-1$ و$n=7$.', '$y=-x+7$: $m=-1$, $n=7$.'), isSolved: (state) => state.r === 5 && hasPoint(circlePoints(state), [3, 4]) && hasPoint(circlePoints(state), [4, 3]) },
    { id: 67303, prompt: say('$n=6$ eta erradioa 5 izanik, egin zuzenak zirkunferentzia ez moztea.', 'Con $n=6$ y radio 5, haz que la recta no corte la circunferencia.', 'مع $n=6$ ونصف القطر 5 اجعل المستقيم لا يقطع الدائرة.', 'With $n=6$ and radius 5, make the straight line not meet the circle.'), hint: say('Zenbat eta inklinatuagoa, orduan eta errazago mozten du.', 'Cuanto más inclinada, más fácil corta.', 'كلما ازداد الميل سهل التقاطع.', 'The steeper the line, the easier it is for it to meet the circle.'), isSolved: (state) => state.n === 6 && state.r === 5 && circlePoints(state).length === 0 },
    { id: 67304, prompt: say('Egin bi ebaki-puntuak aurkakoak izatea: $(x,y)$ eta $(-x,-y)$.', 'Haz que los dos puntos de corte sean opuestos: $(x,y)$ y $(-x,-y)$.', 'اجعل نقطتي التقاطع متعاكستين: $(x,y)$ و$(-x,-y)$.', 'Make the two meeting points opposite: $(x,y)$ and $(-x,-y)$.'), hint: say('Zuzenak zentrotik pasatu behar du.', 'La recta tiene que pasar por el centro.', 'يجب أن يمر المستقيم بالمركز.', 'The straight line must pass through the centre.'), isSolved: (state) => state.n === 0 }
]

/* ---------- 4. Two squares: x² + y² = A, x² − y² = B ---------- */

export const SQUARES_LIMITS = { A: { min: 1, max: 60 }, B: { min: -30, max: 30 } } as const

export interface SquaresState {
    A: number
    B: number
}

export const initialSquaresState: SquaresState = { A: 20, B: 4 }

export const setSquares = (state: SquaresState, patch: Partial<SquaresState>): SquaresState => ({
    A: clamp(patch.A ?? state.A, SQUARES_LIMITS.A.min, SQUARES_LIMITS.A.max),
    B: clamp(patch.B ?? state.B, SQUARES_LIMITS.B.min, SQUARES_LIMITS.B.max)
})

/** x² and y², by reduction */
export const squaresValues = ({ A, B }: SquaresState): [number, number] => [(A + B) / 2, (A - B) / 2]
const roots = (square: number) => (square < 0 ? [] : square === 0 ? [0] : [-Math.sqrt(square), Math.sqrt(square)])
export function squaresSolutions(state: SquaresState): Point[] {
    const [x2, y2] = squaresValues(state)
    return roots(x2).flatMap((x) => roots(y2).map((y): Point => [x, y]))
}
const isWhole = (value: number) => Math.abs(value - Math.round(value)) < 1e-9

export const squaresChallenges: LabChallenge<SquaresState>[] = [
    { id: 67401, prompt: say('Ebatzi $x^{2}+y^{2}=41$, $x^{2}-y^{2}=9$.', 'Resuelve $x^{2}+y^{2}=41$, $x^{2}-y^{2}=9$.', 'حل $x^{2}+y^{2}=41$ و$x^{2}-y^{2}=9$.', 'Solve $x^{2}+y^{2}=41$, $x^{2}-y^{2}=9$.'), hint: say('$A=41$ eta $B=9$.', '$A=41$ y $B=9$.', '$A=41$ و$B=9$.', '$A=41$ and $B=9$.'), isSolved: (state) => state.A === 41 && state.B === 9 },
    { id: 67402, prompt: say('Lortu zehazki bi ebazpen dituen sistema bat.', 'Consigue un sistema con exactamente dos soluciones.', 'احصل على نظام له حلّان بالضبط.', 'Make a system with exactly two solutions.'), hint: say('$y^{2}=0$ izan dadin: $A=B$.', 'Que $y^{2}$ sea 0: $A=B$.', 'اجعل $y^{2}=0$: $A=B$.', 'Make $y^{2}$ equal 0: $A=B$.'), isSolved: (state) => squaresSolutions(state).length === 2 },
    { id: 67403, prompt: say('Lortu ebazpenik gabeko sistema bat.', 'Consigue un sistema sin ninguna solución.', 'احصل على نظام بلا حل.', 'Make a system with no solutions.'), hint: say('$x^{2}$ edo $y^{2}$ negatiboa: $B>A$.', '$x^{2}$ o $y^{2}$ negativo: $B>A$.', '$x^{2}$ أو $y^{2}$ سالب: $B>A$.', '$x^{2}$ or $y^{2}$ negative: $B>A$.'), isSolved: (state) => squaresSolutions(state).length === 0 },
    { id: 67404, prompt: say('Lortu koordenatu osoko lau ebazpen, $(\\pm 5,\\pm 4)$ ez direnak.', 'Consigue cuatro soluciones de coordenadas enteras que no sean $(\\pm 5,\\pm 4)$.', 'احصل على أربعة حلول إحداثياتها صحيحة غير $(\\pm 5,\\pm 4)$.', 'Make four solutions with integer coordinates that are not $(\\pm 5,\\pm 4)$.'), hint: say('Adibidez $x^{2}=9$ eta $y^{2}=4$: $A=13$, $B=5$.', 'Por ejemplo $x^{2}=9$ e $y^{2}=4$: $A=13$, $B=5$.', 'مثلًا $x^{2}=9$ و$y^{2}=4$: $A=13$ و$B=5$.', 'For example $x^{2}=9$ and $y^{2}=4$: $A=13$, $B=5$.'), isSolved: (state) => { const solutions = squaresSolutions(state); return solutions.length === 4 && solutions.every(([x, y]) => isWhole(x) && isWhole(y)) && !(state.A === 41 && state.B === 9) } }
]

/* ---------- 5. A half-plane and its test point ---------- */

export const HALF_LIMITS = { coefficient: 4, c: 8, point: 5 } as const

export interface HalfPlaneState {
    a: number
    b: number
    c: number
    sense: Sense
    px: number
    py: number
}

export const initialHalfPlaneState: HalfPlaneState = { a: 1, b: 1, c: 3, sense: '≤', px: 0, py: 0 }

export function setHalfPlane(state: HalfPlaneState, patch: Partial<HalfPlaneState>): HalfPlaneState {
    const k = HALF_LIMITS.coefficient
    let a = clamp(patch.a ?? state.a, -k, k)
    let b = clamp(patch.b ?? state.b, -k, k)
    if (a === 0 && b === 0) {
        if (patch.a !== undefined) a = patch.a < state.a ? -1 : 1
        else b = (patch.b ?? 0) < state.b ? -1 : 1
    }
    return {
        a,
        b,
        c: clamp(patch.c ?? state.c, -HALF_LIMITS.c, HALF_LIMITS.c),
        sense: patch.sense ?? state.sense,
        px: clamp(patch.px ?? state.px, -HALF_LIMITS.point, HALF_LIMITS.point),
        py: clamp(patch.py ?? state.py, -HALF_LIMITS.point, HALF_LIMITS.point)
    }
}

export const halfPlaneOf = (state: HalfPlaneState): HalfPlane => ({ a: state.a, b: state.b, c: state.c, sense: state.sense })
export const testPointHolds = (state: HalfPlaneState) => inHalfPlane(halfPlaneOf(state), [state.px, state.py])
const strict = (sense: Sense) => sense === '<' || sense === '>'

export const halfPlaneChallenges: LabChallenge<HalfPlaneState>[] = [
    { id: 67501, prompt: say('Egin $(0,0)$ puntua $\\le$ inekuazio baten ebazpena ez izatea.', 'Haz que $(0,0)$ no sea solución de una inecuación con $\\le$.', 'اجعل $(0,0)$ ليست حلًّا لمتراجحة بـ$\\le$.', 'Make $(0,0)$ not a solution of an inequality with $\\le$.'), hint: say('$0\\le c$ gezurra izan behar da: c negatiboa.', '$0\\le c$ tiene que ser falso: c negativo.', 'يجب أن يكون $0\\le c$ خطأ: c سالب.', '$0\\le c$ must be false: c negative.'), isSolved: (state) => state.sense === '≤' && !inHalfPlane(halfPlaneOf(state), [0, 0]) },
    { id: 67502, prompt: say('Eraiki $2x+y\\le 4$ eta jarri proba-puntua $(1,1)$ puntuan.', 'Construye $2x+y\\le 4$ y pon el punto de prueba en $(1,1)$.', 'ابنِ $2x+y\\le 4$ وضع نقطة الاختبار في $(1,1)$.', 'Build $2x+y\\le 4$ and put the test point at $(1,1)$.'), hint: say('$a=2$, $b=1$, $c=4$.', '$a=2$, $b=1$, $c=4$.', '$a=2$ و$b=1$ و$c=4$.', '$a=2$, $b=1$, $c=4$.'), isSolved: (state) => state.a === 2 && state.b === 1 && state.c === 4 && state.sense === '≤' && state.px === 1 && state.py === 1 },
    { id: 67503, prompt: say('Egin muga-zuzena jatorritik pasatzea eta $(1,0)$ ebazpena izatea.', 'Haz que la recta frontera pase por el origen y que $(1,0)$ sea solución.', 'اجعل المستقيم الحدّي يمر بالأصل وتكون $(1,0)$ حلًّا.', 'Make the boundary line pass through the origin, with $(1,0)$ as a solution.'), hint: say('$c=0$; orduan $(0,0)$ ezin da proba-puntua izan.', '$c=0$; entonces $(0,0)$ no sirve como punto de prueba.', '$c=0$؛ عندئذ لا تصلح $(0,0)$ نقطة اختبار.', '$c=0$; so $(0,0)$ cannot be used as the test point.'), isSolved: (state) => state.c === 0 && inHalfPlane(halfPlaneOf(state), [1, 0]) },
    { id: 67504, prompt: say('Inekuazio hertsi batean ($<$ edo $>$), jarri proba-puntua muga-zuzenaren gainean.', 'En una inecuación estricta ($<$ o $>$), pon el punto de prueba sobre la recta frontera.', 'في متراجحة صارمة ($<$ أو $>$) ضع نقطة الاختبار على المستقيم الحدّي.', 'In a strict inequality ($<$ or $>$), put the test point on the boundary line.'), hint: say('$ax+by=c$ betetzen duen puntu bat: ez da ebazpena.', 'Un punto que cumpla $ax+by=c$: no es solución.', 'نقطة تحقق $ax+by=c$: ليست حلًّا.', 'A point that satisfies $ax+by=c$ is not a solution.'), isSolved: (state) => strict(state.sense) && state.a * state.px + state.b * state.py === state.c }
]

/* ---------- 6. The whole points of x ≥ 0, y ≥ 0, ax + by ≤ c ---------- */

export const REGION_LIMITS = { coefficient: { min: 1, max: 6 }, c: { min: 1, max: 12 } } as const

export interface RegionState {
    a: number
    b: number
    c: number
}

export const initialRegionState: RegionState = { a: 1, b: 1, c: 4 }

export const setRegion = (state: RegionState, patch: Partial<RegionState>): RegionState => ({
    a: clamp(patch.a ?? state.a, REGION_LIMITS.coefficient.min, REGION_LIMITS.coefficient.max),
    b: clamp(patch.b ?? state.b, REGION_LIMITS.coefficient.min, REGION_LIMITS.coefficient.max),
    c: clamp(patch.c ?? state.c, REGION_LIMITS.c.min, REGION_LIMITS.c.max)
})

export const regionHalves = ({ a, b, c }: RegionState): HalfPlane[] => [{ a, b, c, sense: '≤' }, { a: 1, b: 0, c: 0, sense: '≥' }, { a: 0, b: 1, c: 0, sense: '≥' }]
export const regionPoints = (state: RegionState) => latticePoints({ xMin: 0, xMax: REGION_LIMITS.c.max, yMin: 0, yMax: REGION_LIMITS.c.max }, regionHalves(state))
/** The vertices on the axes, (c/a, 0) and (0, c/b), and the area c²/(2ab) */
export const regionVertices = ({ a, b, c }: RegionState): [FractionValue, FractionValue] => [fraction(c, a), fraction(c, b)]
export const regionArea = ({ a, b, c }: RegionState) => fraction(c * c, 2 * a * b)

export const regionChallenges: LabChallenge<RegionState>[] = [
    { id: 67601, prompt: say('Lortu zehazki 10 puntu oso dituen eskualde bat.', 'Consigue una región con exactamente 10 puntos enteros.', 'احصل على منطقة فيها 10 نقاط صحيحة بالضبط.', 'Make a region with exactly 10 integer points.'), hint: say('$4+3+2+1=10$', '$4+3+2+1=10$', '$4+3+2+1=10$', '$4+3+2+1=10$'), isSolved: (state) => regionPoints(state).length === 10 },
    { id: 67602, prompt: say('Lortu erpinak $(4,0)$ eta $(0,6)$ dituen triangelua.', 'Consigue el triángulo de vértices $(4,0)$ y $(0,6)$.', 'احصل على المثلث ذي الرأسين $(4,0)$ و$(0,6)$.', 'Make the triangle with vertices $(4,0)$ and $(0,6)$.'), hint: say('$\\frac{c}{a}=4$ eta $\\frac{c}{b}=6$.', '$\\frac{c}{a}=4$ y $\\frac{c}{b}=6$.', '$\\frac{c}{a}=4$ و$\\frac{c}{b}=6$.', '$\\frac{c}{a}=4$ and $\\frac{c}{b}=6$.'), isSolved: (state) => { const [p, q] = regionVertices(state); return p.numerator === 4 && p.denominator === 1 && q.numerator === 6 && q.denominator === 1 } },
    { id: 67603, prompt: say('Lortu $12{,}5$-eko azalera duen triangelua.', 'Consigue un triángulo de área $12{,}5$.', 'احصل على مثلث مساحته $12{,}5$.', 'Make a triangle with an area of $12{,}5$.'), hint: say('Azalera $\\frac{c^{2}}{2ab}$ da: $\\frac{25}{2}$.', 'El área es $\\frac{c^{2}}{2ab}$: $\\frac{25}{2}$.', 'المساحة $\\frac{c^{2}}{2ab}$: $\\frac{25}{2}$.', 'The area is $\\frac{c^{2}}{2ab}$: $\\frac{25}{2}$.'), isSolved: (state) => { const area = regionArea(state); return area.numerator === 25 && area.denominator === 2 } },
    { id: 67604, prompt: say('Lortu zehazki 19 puntu oso dituen eskualde bat.', 'Consigue una región con exactamente 19 puntos enteros.', 'احصل على منطقة فيها 19 نقطة صحيحة بالضبط.', 'Make a region with exactly 19 integer points.'), hint: say('Saiatu $3x+2y\\le 12$.', 'Prueba con $3x+2y\\le 12$.', 'جرّب $3x+2y\\le 12$.', 'Try $3x+2y\\le 12$.'), isSolved: (state) => regionPoints(state).length === 19 }
]

/* ---------- 7. How many and how much ---------- */

export const mixtureScenarios: Array<{ count: number; first: number; second: number; total: number; step: number; title: LocalizedText; things: [LocalizedText, LocalizedText]; unit: LocalizedText }> = [
    { count: 20, first: 2, second: 4, total: 56, step: 1, title: say('Oiloak', 'Granja', 'المزرعة', 'Farm'), things: [say('oilo', 'gallinas', 'دجاج', 'hens'), say('untxi', 'conejos', 'أرانب', 'rabbits')], unit: say('hanka', 'patas', 'رجل', 'legs') },
    { count: 20, first: 1, second: 2, total: 25, step: 1, title: say('Txanponak', 'Monedas', 'النقود', 'Coins'), things: [say('1 €', '1 €', '1 €', '€1'), say('2 €', '2 €', '2 €', '€2')], unit: say('€', '€', '€', '€') },
    { count: 120, first: 15, second: 10, total: 1550, step: 10, title: say('Sarrerak', 'Entradas', 'التذاكر', 'Tickets'), things: [say('15 €', '15 €', '15 €', '€15'), say('10 €', '10 €', '10 €', '€10')], unit: say('€', '€', '€', '€') },
    { count: 20, first: 8, second: 12, total: 180, step: 1, title: say('Kafea', 'Café', 'البن', 'Coffee'), things: [say('8 €/kg', '8 €/kg', '8 €/كغ', '€8/kg'), say('12 €/kg', '12 €/kg', '12 €/كغ', '€12/kg')], unit: say('€', '€', '€', '€') }
]

export interface MixtureState {
    scenario: number
    x: number
}

export const initialMixtureState: MixtureState = { scenario: 0, x: 0 }

export function setMixture(state: MixtureState, patch: Partial<MixtureState>): MixtureState {
    const scenario = clamp(patch.scenario ?? state.scenario, 0, mixtureScenarios.length - 1)
    const { count, step } = mixtureScenarios[scenario]
    const x = patch.scenario !== undefined && patch.scenario !== state.scenario ? 0 : clamp(Math.round((patch.x ?? state.x) / step) * step, 0, count)
    return { scenario, x }
}

export function mixtureTotal(state: MixtureState): number {
    const { count, first, second } = mixtureScenarios[state.scenario]
    return first * state.x + second * (count - state.x)
}

/** The x that makes the total right */
export function mixtureSolution(scenario: number): number {
    const { count, first, second, total } = mixtureScenarios[scenario]
    return (total - second * count) / (first - second)
}

export const mixtureChallenges: LabChallenge<MixtureState>[] = mixtureScenarios.map((scenario, index) => ({
    id: 67701 + index,
    prompt: [
        say('Baserri batean 20 buru eta 56 hanka daude. Zenbat oilo?', 'En una granja hay 20 cabezas y 56 patas. ¿Cuántas gallinas?', 'في مزرعة 20 رأسًا و56 رجلًا. كم دجاجة؟', 'On a farm there are 20 heads and 56 legs. How many hens are there?'),
        say('1 eta 2 euroko 20 txanponek 25 € egiten dute. Zenbat dira 1 eurokoak?', '20 monedas de 1 € y de 2 € suman 25 €. ¿Cuántas son de 1 €?', '20 قطعة من فئتي 1 € و2 € مجموعها 25 €. كم منها من فئة 1 €؟', '20 coins of €1 and €2 add up to €25. How many are €1 coins?'),
        say('120 sarrera, 15 €-koak eta 10 €-koak, 1 550 €. Zenbat 15 €-koak?', '120 entradas, de 15 € y de 10 €, por 1 550 €. ¿Cuántas de 15 €?', '120 تذكرة بـ15 € و10 € بمجموع 1 550 €. كم تذكرة بـ15 €؟', '120 tickets at €15 and €10 come to €1,550. How many are €15 tickets?'),
        say('8 €/kg eta 12 €/kg-ko kafeak, 20 kg 180 €-tan. Zenbat kg 8 €/kg-koa?', 'Café de 8 €/kg y de 12 €/kg, 20 kg por 180 €. ¿Cuántos kg del de 8 €/kg?', 'بن بـ8 €/كغ و12 €/كغ، 20 كغ بـ180 €. كم كغ من بن 8 €/كغ؟', 'Coffee at €8/kg and at €12/kg: 20 kg for €180. How many kg of the €8/kg coffee are there?')
    ][index],
    hint: say(`$x+y=${scenario.count}$, $${scenario.first}x+${scenario.second}y=${scenario.total}$`, `$x+y=${scenario.count}$, $${scenario.first}x+${scenario.second}y=${scenario.total}$`, `$x+y=${scenario.count}$، $${scenario.first}x+${scenario.second}y=${scenario.total}$`, `$x+y=${scenario.count}$, $${scenario.first}x+${scenario.second}y=${scenario.total}$`),
    isSolved: (state: MixtureState) => state.scenario === index && state.x === mixtureSolution(index)
}))

/* ---------- 8. A shopping basket under a budget ---------- */

export const SHOPPING_LIMITS = { budget: { min: 6, max: 20 }, price: { min: 1, max: 5 }, amount: 10 } as const

export interface ShoppingState {
    budget: number
    p: number
    q: number
    x: number
    y: number
}

export const initialShoppingState: ShoppingState = { budget: 12, p: 3, q: 2, x: 0, y: 0 }

export const setShopping = (state: ShoppingState, patch: Partial<ShoppingState>): ShoppingState => ({
    budget: clamp(patch.budget ?? state.budget, SHOPPING_LIMITS.budget.min, SHOPPING_LIMITS.budget.max),
    p: clamp(patch.p ?? state.p, SHOPPING_LIMITS.price.min, SHOPPING_LIMITS.price.max),
    q: clamp(patch.q ?? state.q, SHOPPING_LIMITS.price.min, SHOPPING_LIMITS.price.max),
    x: clamp(patch.x ?? state.x, 0, SHOPPING_LIMITS.amount),
    y: clamp(patch.y ?? state.y, 0, SHOPPING_LIMITS.amount)
})

export const shoppingCost = (state: ShoppingState) => state.p * state.x + state.q * state.y
export const shoppingHalves = ({ budget, p, q }: ShoppingState): HalfPlane[] => [{ a: p, b: q, c: budget, sense: '≤' }, { a: 1, b: 0, c: 0, sense: '≥' }, { a: 0, b: 1, c: 0, sense: '≥' }]
export const shoppingPoints = (state: ShoppingState) => latticePoints({ xMin: 0, xMax: SHOPPING_LIMITS.amount, yMin: 0, yMax: SHOPPING_LIMITS.amount }, shoppingHalves(state))
const classic = (state: ShoppingState) => state.budget === 12 && state.p === 3 && state.q === 2

export const shoppingChallenges: LabChallenge<ShoppingState>[] = [
    { id: 67801, prompt: say('12 €, 3 €-ko ogitartekoak eta 2 €-ko freskagarriak: aukeratu artikulu gehien dituen erosketa.', '12 €, bocadillos de 3 € y refrescos de 2 €: elige la compra con más artículos.', '12 €، شطائر بـ3 € ومشروبات بـ2 €: اختر الشراء الذي فيه أكثر القطع.', '€12, sandwiches at €3 and soft drinks at €2: choose the purchase with the most items.'), hint: say('Merkeena bakarrik erosi.', 'Compra solo lo más barato.', 'اشترِ الأرخص فقط.', 'Buy only the cheapest items.'), isSolved: (state) => classic(state) && state.x === 0 && state.y === 6 },
    { id: 67802, prompt: say('Prezio berekin, ogitarteko bat gutxienez eta ahalik eta freskagarri gehien.', 'Con los mismos precios, al menos un bocadillo y el máximo de refrescos.', 'بالأسعار نفسها: شطيرة على الأقل وأكبر عدد من المشروبات.', 'With the same prices, at least one sandwich and the maximum number of soft drinks.'), hint: say('$3+2y\\le 12$', '$3+2y\\le 12$', '$3+2y\\le 12$', '$3+2y\\le 12$'), isSolved: (state) => classic(state) && state.x === 1 && state.y === 4 },
    { id: 67803, prompt: say('Gastatu aurrekontu osoa, 2 ogitartekorekin.', 'Gasta exactamente todo el presupuesto con 2 bocadillos.', 'أنفق الميزانية كلها بالضبط بشطيرتين.', 'Spend exactly the whole budget with 2 sandwiches.'), hint: say('Puntua muga-zuzenean.', 'El punto, sobre la recta frontera.', 'النقطة على المستقيم الحدّي.', 'The point is on the boundary line.'), isSolved: (state) => state.x === 2 && shoppingCost(state) === state.budget },
    { id: 67804, prompt: say('20 € eta 4 €-ko ogitartekoak: jarri freskagarriaren prezioa ogitartekorik gabe gehienez 10 freskagarri eros daitezen, eta aukeratu erosketa hori.', '20 € y bocadillos de 4 €: pon el precio del refresco para que sin bocadillos se puedan comprar como mucho 10, y elige esa compra.', '20 € وشطائر بـ4 €: ضع ثمن المشروب بحيث يمكن شراء 10 مشروبات على الأكثر دون شطائر، واختر هذا الشراء.', '€20 and sandwiches at €4: set the price of the soft drink so that, with no sandwiches, you can buy at most 10, and choose that purchase.'), hint: say('$10\\cdot q\\le 20$', '$10\\cdot q\\le 20$', '$10\\cdot q\\le 20$', '$10\\cdot q\\le 20$'), isSolved: (state) => state.budget === 20 && state.p === 4 && state.q === 2 && state.x === 0 && state.y === 10 }
]

/* ---------- Progress ids: the borrowed tools' challenges, then the new ones ---------- */

export const systemsLabChallengeIds = [
    ...planeChallenges,
    ...classifyChallenges,
    ...substitutionChallenges,
    ...reductionChallenges,
    ...circleChallenges,
    ...squaresChallenges,
    ...halfPlaneChallenges,
    ...regionChallenges,
    ...mixtureChallenges,
    ...shoppingChallenges
].map((challenge) => challenge.id)

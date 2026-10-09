import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseItem, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import type { GraphSpec, Point } from '../dbh2-funtzioak-v2/functions.ts'
import { sampled, smoothThrough, studyKnots } from './functions.ts'

/* ==========================================================================
   Funtzioak · 4. DBH aplikatuak — diagnostic, guided practice, exercise
   bank and challenges. Exercises follow Santillana Aplicadas 4, unit 7
   (bolis and prices, x·2 + 2, the taxi at 0,95 €/min, the dripping tap,
   domains of (1 − x)/(x − 3) and x²/(x + 4), the intercepts of
   2x² − 7x − 4 and (2x + 6)/(x − 1), T.V.M. of given functions, the study
   of two graphs, periods 2 and 4) and Anaya Aplicadas 4, unit 8 (the tap
   at 10–58 °C, photocopies, the falling ball, the stone 35/75/80 m, the
   parking that charges every hour, the cistern every 2 minutes, the Halley
   comet, glucose, three swimmers, a company's value, the 40 × 30 card and
   the square inscribed in a square). Every closed answer is a single
   number; exercises that read a graph carry it as a GraphSpec.
   ========================================================================== */

type WithGraph = { graph?: GraphSpec; solutionGraph?: GraphSpec }
export type FunctionsDiagnosticQuestion = DiagnosticQuestion & WithGraph
export type FunctionsPracticeItem = PracticeItem & WithGraph
export type FunctionsChallengeItem = ChallengeItem & WithGraph
export type FunctionsExerciseItem = ExerciseItem & WithGraph
export interface FunctionsExerciseSection {
    id: string
    title: LocalizedText
    items: FunctionsExerciseItem[]
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })
const n = (value: number, denominator = 1) => fraction(value, denominator)

/* ---------- The graphs of the exercises (plain data, checked by the tests) ---------- */

const time = (unit: string, unitAr: string) => say(`denbora (${unit})`, `tiempo (${unit})`, `الزمن (${unitAr})`)

/** A curve that starts at (−3, 1), rises to (−1, 4), falls to (2, −2) and ends at (4, 2) */
export const domainKnots: Point[] = [[-3, 1], [-1, 4], [2, -2], [4, 2]]
const domainGraph: GraphSpec = { box: { xMin: -4, xMax: 5, yMin: -3, yMax: 5 }, cell: 30, curves: [{ points: smoothThrough(domainKnots) }], points: [{ at: [-3, 1], color: 'ink' }, { at: [4, 2], color: 'ink' }] }

/** The graph studied in the lesson: [0, 8], peaks (1, 3), (5, 2), (7, 3), valleys (3, 1), (6, 1) */
const studyGraph: GraphSpec = { box: { xMin: 0, xMax: 8, yMin: 0, yMax: 4 }, cell: 34, curves: [{ points: smoothThrough(studyKnots) }] }

/** y = (x³ − 12x)/8: maximum (−2, 2), minimum (2, −2) */
const cubicGraph: GraphSpec = { box: { xMin: -4, xMax: 4, yMin: -3, yMax: 3 }, cell: 32, curves: [{ points: sampled((x) => (x * x * x - 12 * x) / 8, -4.6, 4.6) }] }

/** y = x² − 4x + 5 between 0 and 5 */
const parabolaGraph: GraphSpec = { box: { xMin: 0, xMax: 5, yMin: 0, yMax: 8 }, cell: 30, curves: [{ points: sampled((x) => x * x - 4 * x + 5, 0, 5) }], points: [0, 1, 2, 3, 4].map((x) => ({ at: [x, x * x - 4 * x + 5] as Point, color: 'ink' as const })) }

/** Period 4: (0, 1) → (1, 2) → (2, 3) → (3, 3) → (4, 1), repeated */
export const periodicPattern: Point[] = [[0, 1], [1, 2], [2, 3], [3, 3]]
const periodicPoints: Point[] = [0, 4, 8].flatMap((start) => periodicPattern.map(([x, y]) => [x + start, y] as Point)).concat([[12, 1]])
const periodicGraph: GraphSpec = { box: { xMin: 0, xMax: 12, yMin: 0, yMax: 4 }, cell: 28, curves: [{ points: periodicPoints }] }

/** Parking: 2 € for every hour started, up to 4 h (one square = 2 €) */
const parkingGraph: GraphSpec = {
    box: { xMin: 0, xMax: 5, yMin: 0, yMax: 5 },
    cell: 32,
    yUnit: 2,
    xTitle: time('h', 'س'),
    yTitle: say('prezioa (€)', 'precio (€)', 'السعر (€)'),
    curves: [1, 2, 3, 4].map((hour) => ({ points: [[hour - 1, hour], [hour, hour]] as Point[] })),
    points: [1, 2, 3, 4].flatMap((hour) => [{ at: [hour - 1, hour] as Point, color: 'stage' as const, hollow: true }, { at: [hour, hour] as Point, color: 'stage' as const }])
}

/** Glucose: 90 → 120 at 1 h → 80 at 4 h → 90 from 5 h (one square = 20 mg/dl) */
const glucoseGraph: GraphSpec = {
    box: { xMin: 0, xMax: 8, yMin: 0, yMax: 7 },
    cell: 30,
    yUnit: 20,
    xTitle: time('h', 'س'),
    yTitle: say('glukemia (mg/dl)', 'glucemia (mg/dl)', 'سكر الدم (mg/dl)'),
    curves: [{ points: smoothThrough([[0, 4.5], [1, 6], [4, 4], [5, 4.5], [8, 4.5]]) }]
}

/** A trip: 0 → 90 km/h at 10 min → 45 at 15 → 60 at 20 → 0 at 25 (squares of 5 min and 15 km/h) */
const speedGraph: GraphSpec = {
    box: { xMin: 0, xMax: 5, yMin: 0, yMax: 7 },
    cell: 34,
    xUnit: 5,
    yUnit: 15,
    xTitle: time('min', 'د'),
    yTitle: say('abiadura (km/h)', 'velocidad (km/h)', 'السرعة (كم/س)'),
    curves: [{ points: [[0, 0], [2, 6], [3, 3], [4, 4], [5, 0]] }]
}

/** Water out of the fridge: 2 °C towards 22 °C (squares of 10 min and 5 °C) */
const fridgeGraph: GraphSpec = {
    box: { xMin: 0, xMax: 6, yMin: 0, yMax: 5 },
    cell: 32,
    xUnit: 10,
    yUnit: 5,
    xTitle: time('min', 'د'),
    yTitle: say('tenperatura (°C)', 'temperatura (°C)', 'الحرارة (°م)'),
    curves: [{ points: sampled((x) => 4.4 - 4 * 0.6 ** x, 0, 6) }, { points: [[0, 4.4], [6, 4.4]], color: 'ink', dashed: true }]
}

/** The tap: 10 °C at the start, 58 °C at minute 6 (squares of 10 °C) */
const tapGraph: GraphSpec = {
    box: { xMin: 0, xMax: 6, yMin: 0, yMax: 6 },
    cell: 32,
    yUnit: 10,
    xTitle: time('min', 'د'),
    yTitle: say('tenperatura (°C)', 'temperatura (°C)', 'الحرارة (°م)'),
    curves: [{ points: smoothThrough([[0, 1], [1, 1.2], [3, 4], [5, 5.6], [6, 5.8]]) }],
    points: [{ at: [0, 1], color: 'ink' }, { at: [6, 5.8], color: 'ink' }]
}

/** A jump at x = 2 and a hollow point at x = 4 */
const brokenGraph: GraphSpec = {
    box: { xMin: 0, xMax: 6, yMin: 0, yMax: 5 },
    cell: 30,
    curves: [{ points: [[0, 1], [2, 2]] }, { points: [[2, 4], [6, 2]] }],
    points: [{ at: [2, 2], color: 'stage', hollow: true }, { at: [2, 4], color: 'stage' }, { at: [4, 3], color: 'stage', hollow: true }, { at: [4, 1], color: 'stage' }]
}

export const exerciseGraphs = { domainGraph, studyGraph, cubicGraph, parabolaGraph, periodicGraph, parkingGraph, glucoseGraph, speedGraph, fridgeGraph, tapGraph, brokenGraph }

/* ---------- Diagnostic ---------- */

export const functionsDiagnostic: FunctionsDiagnosticQuestion[] = [
    {
        id: 4701,
        prompt: say('Zein da funtzio bat?', '¿Cuál de estas relaciones es una función?', 'أيّ هذه العلاقات دالة؟'),
        options: [say('Pertsona baten pisua → bere altuera', 'El peso de una persona → su estatura', 'وزن الشخص ← طوله'), say('Boligrafo kopurua → prezioa', 'El número de bolis → su precio', 'عدد الأقلام ← ثمنها'), say('Zenbaki bat → bere erro karratuak', 'Un número → sus raíces cuadradas', 'عدد ← جذراه التربيعيان')],
        correctIndex: 1,
        explanation: say('Kopuru bakoitzak prezio bakarra du. Pisu bereko bi pertsonek altuera desberdina izan dezakete, eta 9ri 3 eta $-3$ dagozkio.', 'Cada cantidad tiene un único precio. Dos personas del mismo peso pueden medir distinto, y al 9 le corresponden 3 y $-3$.', 'لكل كمية ثمن واحد. قد يختلف طول شخصين لهما الوزن نفسه، وللعدد 9 يقابل 3 و$-3$.'),
        topic: 'what-is'
    },
    {
        id: 4702,
        prompt: say('$f(x)=x^2-3x$ bada, zenbat da $f(-2)$?', 'Si $f(x)=x^2-3x$, ¿cuánto vale $f(-2)$?', 'إذا كانت $f(x)=x^2-3x$ فكم تساوي $f(-2)$؟'),
        options: [same('$10$'), same('$-2$'), same('$-10$')],
        correctIndex: 0,
        explanation: same('$(-2)^{2}-3\\cdot(-2)=4+6=10$'),
        topic: 'evaluate'
    },
    {
        id: 4703,
        prompt: say('Zein da $y=\\frac{1}{x-5}$ funtzioaren izate-eremua?', '¿Cuál es el dominio de $y=\\frac{1}{x-5}$?', 'ما مجال $y=\\frac{1}{x-5}$؟'),
        options: [same('$\\mathbb{R}$'), same('$\\mathbb{R}-\\{-5\\}$'), same('$\\mathbb{R}-\\{5\\}$')],
        correctIndex: 2,
        explanation: say('Izendatzailea 0 da $x=5$ denean: balio hori kendu behar da.', 'El denominador vale 0 cuando $x=5$: hay que quitar ese valor.', 'المقام يساوي 0 عندما $x=5$: يجب حذف هذه القيمة.'),
        topic: 'domain-formula'
    },
    {
        id: 4704,
        prompt: say('Non ebakitzen du $y=3x-6$ funtzioak Y ardatza?', '¿Dónde corta $y=3x-6$ al eje Y?', 'أين يقطع $y=3x-6$ محور Y؟'),
        options: [same('$(2,\\,0)$'), same('$(0,\\,-6)$'), same('$(0,\\,6)$')],
        correctIndex: 1,
        explanation: same('$x=0\\to y=3\\cdot 0-6=-6$'),
        topic: 'intercepts'
    },
    {
        id: 4705,
        prompt: say('Grafikoan, zein tartetan da beherakorra funtzioa?', 'En la gráfica, ¿en qué intervalo decrece la función?', 'في الرسم، في أي فترة تتناقص الدالة؟'),
        options: [same('$(-2,\\,2)$'), same('$(-\\infty,\\,-2)$'), same('$(2,\\,-2)$')],
        correctIndex: 0,
        explanation: say('$x=-2$ puntutik $x=2$ puntura jaisten da. Tarteak $x$-ren balioekin idazten dira, txikitik handira.', 'Baja desde $x=-2$ hasta $x=2$. Los intervalos se escriben con valores de $x$, de menor a mayor.', 'ينزل من $x=-2$ إلى $x=2$. تُكتب الفترات بقيم $x$ من الأصغر إلى الأكبر.'),
        topic: 'monotony',
        graph: cubicGraph
    },
    {
        id: 4706,
        prompt: say('Zein da $f(x)=x^2$ funtzioaren batez besteko aldakuntza-tasa $[1,\\,3]$ tartean?', '¿Cuál es la T.V.M. de $f(x)=x^2$ en $[1,\\,3]$?', 'ما معدل التغير المتوسط للدالة $f(x)=x^2$ في $[1,\\,3]$؟'),
        options: [same('$8$'), same('$2$'), same('$4$')],
        correctIndex: 2,
        explanation: same('$\\frac{9-1}{3-1}=\\frac{8}{2}=4$'),
        topic: 'rate'
    },
    {
        id: 4707,
        prompt: say('Aparkaleku batek 2 € kobratzen ditu hasitako ordu bakoitzeko. Prezioaren funtzioa…', 'Un aparcamiento cobra 2 € por cada hora empezada. La función del precio es…', 'يأخذ موقف سيارات 2 € عن كل ساعة بدأت. دالة السعر…'),
        options: [say('jarraitua', 'continua', 'متصلة'), say('etena: jauziak ditu', 'discontinua: tiene saltos', 'منفصلة: فيها قفزات'), say('periodikoa', 'periódica', 'دورية')],
        correctIndex: 1,
        explanation: say('Ordu bakoitzean prezioa 2 € igotzen da bat-batean: jauzi bat.', 'Cada hora el precio sube 2 € de golpe: es un salto.', 'كل ساعة يرتفع السعر 2 € فجأة: قفزة.'),
        topic: 'continuity'
    },
    {
        id: 4708,
        prompt: say('Funtzio baten periodoa 5 da eta $f(2)=3$. Zenbat da $f(12)$?', 'Una función tiene periodo 5 y $f(2)=3$. ¿Cuánto vale $f(12)$?', 'دالة دورها 5 و$f(2)=3$. كم تساوي $f(12)$؟'),
        options: [same('$12$'), same('$15$'), same('$3$')],
        correctIndex: 2,
        explanation: same('$12=2\\cdot 5+2\\to f(12)=f(2)=3$'),
        topic: 'periodicity'
    }
]

/* ---------- Guided practice ---------- */

export const functionsPractice: FunctionsPracticeItem[] = [
    /* Concept */
    { id: 1, stage: 'concept', prompt: say('$f(x)=3x^2-2x$ bada, kalkulatu $f(-1)$.', 'Si $f(x)=3x^2-2x$, calcula $f(-1)$.', 'إذا كانت $f(x)=3x^2-2x$ فاحسب $f(-1)$.'), expected: n(5), hint: say('Ordeztu parentesi artean: $3\\cdot(-1)^2-2\\cdot(-1)$.', 'Sustituye entre paréntesis: $3\\cdot(-1)^2-2\\cdot(-1)$.', 'عوّض بين قوسين: $3\\cdot(-1)^2-2\\cdot(-1)$.'), explanation: same('$3\\cdot(-1)^{2}-2\\cdot(-1)=3+2=5$') },
    { id: 2, stage: 'concept', prompt: say('Taxi batek 2,20 € kobratzen ditu igotzean eta 0,95 € minutuko: $y=0{,}95x+2{,}2$. Zenbat ordaintzen da 10 minutuko bidaia batengatik?', 'Un taxi cobra 2,20 € al subir y 0,95 € por minuto: $y=0{,}95x+2{,}2$. ¿Cuánto cuesta un viaje de 10 minutos?', 'تأخذ سيارة أجرة 2.20 € عند الركوب و0.95 € عن كل دقيقة: $y=0{,}95x+2{,}2$. كم تكلف رحلة 10 دقائق؟'), expected: n(117, 10), hint: say('Ordeztu $x=10$.', 'Sustituye $x=10$.', 'عوّض $x=10$.'), explanation: same('$0{,}95\\cdot 10+2{,}2=9{,}5+2{,}2=11{,}7$') },
    { id: 3, stage: 'concept', prompt: say('$f(x)=x^2-3$ funtzioan, zein $x$ positibok du 6 irudia?', 'En $f(x)=x^2-3$, ¿qué $x$ positiva tiene imagen 6?', 'في $f(x)=x^2-3$، ما قيمة $x$ الموجبة التي صورتها 6؟'), expected: n(3), hint: say('Ebatzi $x^2-3=6$.', 'Resuelve $x^2-3=6$.', 'حُلّ $x^2-3=6$.'), explanation: say('$x^2=9$, beraz $x=3$ edo $x=-3$. Positiboa: 3.', '$x^2=9$, así que $x=3$ o $x=-3$. La positiva: 3.', '$x^2=9$، إذن $x=3$ أو $x=-3$. الموجبة: 3.') },
    { id: 4, stage: 'concept', prompt: say('Fotokopia bakoitzak 0,08 € balio du: $y=0{,}08x$. Zenbat balio dute 199 fotokopiak?', 'Cada fotocopia cuesta 0,08 €: $y=0{,}08x$. ¿Cuánto cuestan 199 fotocopias?', 'تكلف كل نسخة 0.08 €: $y=0{,}08x$. كم تكلف 199 نسخة؟'), expected: n(1592, 100), hint: say('Ordeztu $x=199$.', 'Sustituye $x=199$.', 'عوّض $x=199$.'), explanation: same('$0{,}08\\cdot 199=15{,}92$') },
    /* Domain and intercepts */
    { id: 5, stage: 'domain', prompt: say('Grafikoaren ibiltartea $[-2,\\,b]$ da. Zenbat da $b$?', 'El recorrido de la gráfica es $[-2,\\,b]$. ¿Cuánto vale $b$?', 'مدى الرسم هو $[-2,\\,b]$. كم تساوي $b$؟'), expected: n(4), hint: say('Bilatu grafikoaren punturik altuena eta irakurri bere $y$.', 'Busca el punto más alto de la gráfica y lee su $y$.', 'ابحث عن أعلى نقطة في الرسم واقرأ $y$ فيها.'), explanation: say('Punturik altuena $(-1,\\,4)$ da: $b=4$. Izate-eremua $[-3,\\,4]$ da.', 'El punto más alto es $(-1,\\,4)$: $b=4$. El dominio es $[-3,\\,4]$.', 'أعلى نقطة $(-1,\\,4)$: $b=4$. والمجال $[-3,\\,4]$.'), graph: domainGraph },
    { id: 6, stage: 'domain', prompt: say('Zein $x$ balio ez dago $y=\\frac{x+1}{x-6}$ funtzioaren izate-eremuan?', '¿Qué valor de $x$ no está en el dominio de $y=\\frac{x+1}{x-6}$?', 'ما قيمة $x$ التي ليست في مجال $y=\\frac{x+1}{x-6}$؟'), expected: n(6), hint: say('Izendatzailea ezin da 0 izan.', 'El denominador no puede ser 0.', 'لا يكون المقام 0.'), explanation: same('$x-6=0\\to x=6$') },
    { id: 7, stage: 'domain', prompt: say('$y=\\sqrt{x-5}$ funtzioaren izate-eremua $[a,\\,+\\infty)$ da. Zenbat da $a$?', 'El dominio de $y=\\sqrt{x-5}$ es $[a,\\,+\\infty)$. ¿Cuánto vale $a$?', 'مجال $y=\\sqrt{x-5}$ هو $[a,\\,+\\infty)$. كم تساوي $a$؟'), expected: n(5), hint: say('Errokizunak ez du negatiboa izan behar.', 'El radicando no puede ser negativo.', 'لا يكون ما تحت الجذر سالبًا.'), explanation: same('$x-5\\ge 0\\to x\\ge 5$') },
    { id: 8, stage: 'domain', prompt: say('Non ebakitzen du $y=\\frac{2x-8}{x+2}$ funtzioak Y ardatza? Idatzi ordenatua.', '¿Dónde corta $y=\\frac{2x-8}{x+2}$ al eje Y? Escribe la ordenada.', 'أين يقطع $y=\\frac{2x-8}{x+2}$ محور Y؟ اكتب الترتيبة.'), expected: n(-4), hint: say('Jarri $x=0$.', 'Pon $x=0$.', 'ضع $x=0$.'), explanation: same('$\\frac{2\\cdot 0-8}{0+2}=\\frac{-8}{2}=-4$') },
    /* Increasing, extremes and rate */
    { id: 9, stage: 'change', prompt: say('Zein $x$ puntutan du funtzioak maximo erlatiboa?', '¿En qué valor de $x$ tiene la función su máximo relativo?', 'عند أي قيمة لـ $x$ تكون للدالة قيمتها العظمى النسبية؟'), expected: n(-2), hint: say('Bilatu igotzetik jaistera pasatzen den lekua.', 'Busca dónde pasa de subir a bajar.', 'ابحث عن الموضع الذي تنتقل فيه من الصعود إلى النزول.'), explanation: say('Maximoa $(-2,\\,2)$ da: $x=-2$. Minimoa $(2,\\,-2)$.', 'El máximo es $(-2,\\,2)$: $x=-2$. El mínimo, $(2,\\,-2)$.', 'العظمى $(-2,\\,2)$: $x=-2$. والصغرى $(2,\\,-2)$.'), graph: cubicGraph },
    { id: 10, stage: 'change', prompt: say('Zenbat maximo erlatibo ditu grafikoak?', '¿Cuántos máximos relativos tiene la gráfica?', 'كم قيمة عظمى نسبية في الرسم؟'), expected: n(3), hint: say('Kontatu tontorrak.', 'Cuenta las cimas.', 'عُدّ القمم.'), explanation: say('Maximoak: $(1,\\,3)$, $(5,\\,2)$ eta $(7,\\,3)$. Hiru dira.', 'Máximos: $(1,\\,3)$, $(5,\\,2)$ y $(7,\\,3)$. Son 3.', 'القيم العظمى: $(1,\\,3)$ و$(5,\\,2)$ و$(7,\\,3)$. عددها 3.'), graph: studyGraph },
    { id: 11, stage: 'change', prompt: say('Grafikoa $f(x)=x^2-4x+5$ da. Kalkulatu batez besteko aldakuntza-tasa $[0,\\,2]$ tartean.', 'La gráfica es $f(x)=x^2-4x+5$. Calcula la T.V.M. en $[0,\\,2]$.', 'الرسم هو $f(x)=x^2-4x+5$. احسب معدل التغير المتوسط في $[0,\\,2]$.'), expected: n(-2), hint: say('$f(0)=5$ eta $f(2)=1$.', '$f(0)=5$ y $f(2)=1$.', '$f(0)=5$ و$f(2)=1$.'), explanation: same('$\\frac{f(2)-f(0)}{2-0}=\\frac{1-5}{2}=-2$'), graph: parabolaGraph },
    { id: 12, stage: 'change', prompt: say('Harri bat 80 m-ra dago 4 s-tan eta lurrean (0 m) 8 s-tan. Kalkulatu batez besteko abiadura $[4,\\,8]$ tartean (m/s).', 'Una piedra está a 80 m en el segundo 4 y en el suelo (0 m) en el segundo 8. Calcula su velocidad media en $[4,\\,8]$ (m/s).', 'حجر على ارتفاع 80 م في الثانية 4 وعلى الأرض (0 م) في الثانية 8. احسب سرعته المتوسطة في $[4,\\,8]$ (م/ث).'), expected: n(-20), hint: say('Altueraren aldaketa zati denbora.', 'Cambio de altura entre tiempo.', 'تغير الارتفاع على الزمن.'), explanation: say('$\\frac{0-80}{8-4}=-20$: jaisten ari da.', '$\\frac{0-80}{8-4}=-20$: está bajando.', '$\\frac{0-80}{8-4}=-20$: إنه ينزل.') },
    /* Continuity, periodicity and tendency */
    { id: 13, stage: 'properties', prompt: say('Aparkalekuak 2 € kobratzen ditu hasitako ordu bakoitzeko. Zenbat ordaintzen da 3 ordu eta 20 minuturengatik?', 'El aparcamiento cobra 2 € por cada hora empezada. ¿Cuánto se paga por 3 h y 20 min?', 'يأخذ الموقف 2 € عن كل ساعة بدأت. كم يُدفع عن 3 ساعات و20 دقيقة؟'), expected: n(8), hint: say('Zenbat ordu hasi dira?', '¿Cuántas horas se han empezado?', 'كم ساعة بدأت؟'), explanation: say('4 ordu hasi dira: $4\\cdot 2=8$ €.', 'Se han empezado 4 horas: $4\\cdot 2=8$ €.', 'بدأت 4 ساعات: $4\\cdot 2=8$ €.'), graph: parkingGraph },
    { id: 14, stage: 'properties', prompt: say('Grafikoa periodikoa da. Zein da bere periodoa?', 'La gráfica es periódica. ¿Cuál es su periodo?', 'الرسم دوري. ما دوره؟'), expected: n(4), hint: say('Bilatu bi puntu berdinen arteko distantzia: adibidez, $y=1$ duten bi puntu.', 'Busca la distancia entre dos puntos iguales: por ejemplo, dos con $y=1$.', 'ابحث عن المسافة بين نقطتين متماثلتين: مثلًا نقطتان فيهما $y=1$.'), explanation: say('$(0,\\,1)$ eta $(4,\\,1)$: zatia 4 unitatean errepikatzen da. $T=4$.', '$(0,\\,1)$ y $(4,\\,1)$: el trozo se repite cada 4 unidades. $T=4$.', '$(0,\\,1)$ و$(4,\\,1)$: يتكرر الجزء كل 4 وحدات. $T=4$.'), graph: periodicGraph },
    { id: 15, stage: 'properties', prompt: say('Grafiko periodiko berean, zenbat da $f(21)$?', 'En la misma gráfica periódica, ¿cuánto vale $f(21)$?', 'في الرسم الدوري نفسه، كم تساوي $f(21)$؟'), expected: n(2), hint: say('Zatitu 21 periodoaz eta begiratu hondarra.', 'Divide 21 entre el periodo y mira el resto.', 'اقسم 21 على الدور وانظر إلى الباقي.'), explanation: same('$21=5\\cdot 4+1\\to f(21)=f(1)=2$'), graph: periodicGraph },
    { id: 16, stage: 'properties', prompt: say('Halleyren kometa 77 urtean behin hurbiltzen da Eguzkira. 1986an ikusi zen. Zein urtetan itzuliko da?', 'El cometa Halley se acerca al Sol cada 77 años. Se vio en 1986. ¿En qué año volverá?', 'يقترب مذنب هالي من الشمس كل 77 سنة. شوهد في 1986. في أي سنة سيعود؟'), expected: n(2063), hint: say('Gehitu periodoa.', 'Suma el periodo.', 'أضف الدور.'), explanation: same('$1986+77=2063$') },
    /* Studying functions */
    { id: 17, stage: 'study', prompt: say('Glukemiaren grafikoan, zenbat da balio maximoa (mg/dl)?', 'En la gráfica de la glucemia, ¿cuánto vale el máximo (mg/dl)?', 'في رسم سكر الدم، كم القيمة العظمى (mg/dl)؟'), expected: n(120), hint: say('Lauki bertikal bakoitza 20 mg/dl da.', 'Cada cuadro vertical son 20 mg/dl.', 'كل خانة رأسية 20 mg/dl.'), explanation: say('Punturik altuena ordu 1ean dago, 6 laukitan: $6\\cdot 20=120$ mg/dl.', 'El punto más alto está a la 1 h, a 6 cuadros: $6\\cdot 20=120$ mg/dl.', 'أعلى نقطة عند الساعة 1 على ارتفاع 6 خانات: $6\\cdot 20=120$ mg/dl.'), graph: glucoseGraph },
    { id: 18, stage: 'study', prompt: say('Abiadura-grafikoan, zenbat da minimo erlatiboaren abiadura (km/h)?', 'En la gráfica de la velocidad, ¿cuánto vale la velocidad en el mínimo relativo (km/h)?', 'في رسم السرعة، كم السرعة عند القيمة الصغرى النسبية (كم/س)؟'), expected: n(45), hint: say('Bilatu jaistetik igotzera pasatzen den lekua. Lauki bertikal bakoitza 15 km/h da.', 'Busca dónde pasa de bajar a subir. Cada cuadro vertical son 15 km/h.', 'ابحث عن الموضع الذي تنتقل فيه من النزول إلى الصعود. كل خانة رأسية 15 كم/س.'), explanation: say('Minimoa 15. minutuan dago: $3\\cdot 15=45$ km/h.', 'El mínimo está en el minuto 15: $3\\cdot 15=45$ km/h.', 'الصغرى عند الدقيقة 15: $3\\cdot 15=45$ كم/س.'), graph: speedGraph },
    { id: 19, stage: 'study', prompt: say('40 × 30 cm-ko kartulinarekin egindako kutxaren bolumena $V(x)=(40-2x)(30-2x)\\,x$ da. Kalkulatu $V(10)$ (cm³).', 'El volumen de la caja hecha con la cartulina de 40 × 30 cm es $V(x)=(40-2x)(30-2x)\\,x$. Calcula $V(10)$ (cm³).', 'حجم العلبة المصنوعة من ورق 40 × 30 سم هو $V(x)=(40-2x)(30-2x)\\,x$. احسب $V(10)$ (سم³).'), expected: n(2000), hint: say('Kalkulatu parentesi bakoitza lehenik.', 'Calcula primero cada paréntesis.', 'احسب كل قوس أولًا.'), explanation: same('$(40-20)\\cdot(30-20)\\cdot 10=20\\cdot 10\\cdot 10=2000$') },
    { id: 20, stage: 'study', prompt: say('7 cm-ko karratu batean inskribatutako karratuaren azalera $A(x)=2x^2-14x+49$ da. Kalkulatu $A(2)$.', 'El área del cuadrado inscrito en uno de 7 cm es $A(x)=2x^2-14x+49$. Calcula $A(2)$.', 'مساحة المربع المرسوم داخل مربع ضلعه 7 سم هي $A(x)=2x^2-14x+49$. احسب $A(2)$.'), expected: n(29), hint: say('Ordeztu $x=2$.', 'Sustituye $x=2$.', 'عوّض $x=2$.'), explanation: same('$2\\cdot 2^{2}-14\\cdot 2+49=8-28+49=29$') }
]

/* ---------- Challenges ---------- */

export const functionsChallenges: FunctionsChallengeItem[] = [
    { id: 101, stage: 'concept', context: 'starter', points: 10, prompt: say('$f(x)=2x^2-3x+1$ bada, zenbat da $f(-2)$?', 'Si $f(x)=2x^2-3x+1$, ¿cuánto vale $f(-2)$?', 'إذا كانت $f(x)=2x^2-3x+1$ فكم تساوي $f(-2)$؟'), expected: n(15), hint: say('$(-2)^2=4$ eta $-3\\cdot(-2)=6$.', '$(-2)^2=4$ y $-3\\cdot(-2)=6$.', '$(-2)^2=4$ و$-3\\cdot(-2)=6$.'), explanation: same('$2\\cdot 4+6+1=15$') },
    { id: 102, stage: 'concept', context: 'advanced', points: 20, prompt: say('Taxi batek $y=0{,}95x+2{,}2$ kobratzen du ($x$ minutuak, $y$ €). Bidaia batek 14,55 € balio izan du. Zenbat minutu iraun du?', 'Un taxi cobra $y=0{,}95x+2{,}2$ ($x$ minutos, $y$ €). Un viaje ha costado 14,55 €. ¿Cuántos minutos ha durado?', 'تأخذ سيارة أجرة $y=0{,}95x+2{,}2$ ($x$ دقائق و$y$ €). كلفت رحلة 14.55 €. كم دقيقة استغرقت؟'), expected: n(13), hint: say('Ebatzi $0{,}95x+2{,}2=14{,}55$.', 'Resuelve $0{,}95x+2{,}2=14{,}55$.', 'حُلّ $0{,}95x+2{,}2=14{,}55$.'), explanation: same('$0{,}95x=14{,}55-2{,}2=12{,}35\\to x=\\frac{12{,}35}{0{,}95}=13$') },
    { id: 103, stage: 'concept', context: 'master', points: 30, prompt: say('Bola bat aldapa batetik behera doa: $e=10t^2$ ($t$ segundoak, $e$ cm). Zenbat segundo behar ditu 250 cm egiteko?', 'Una bola baja por una rampa: $e=10t^2$ ($t$ en segundos, $e$ en cm). ¿Cuántos segundos tarda en recorrer 250 cm?', 'تنزل كرة على منحدر: $e=10t^2$ ($t$ بالثواني و$e$ بالسنتيمتر). كم ثانية تحتاج لقطع 250 سم؟'), expected: n(5), hint: say('Ebatzi $10t^2=250$; denbora positiboa da.', 'Resuelve $10t^2=250$; el tiempo es positivo.', 'حُلّ $10t^2=250$؛ الزمن موجب.'), explanation: same('$t^{2}=\\frac{250}{10}=25\\to t=\\sqrt{25}=5$') },
    { id: 104, stage: 'domain', context: 'starter', points: 10, prompt: say('$y=\\sqrt{12-3x}$ funtzioaren izate-eremua $(-\\infty,\\,a]$ da. Zenbat da $a$?', 'El dominio de $y=\\sqrt{12-3x}$ es $(-\\infty,\\,a]$. ¿Cuánto vale $a$?', 'مجال $y=\\sqrt{12-3x}$ هو $(-\\infty,\\,a]$. كم تساوي $a$؟'), expected: n(4), hint: say('$12-3x\\ge 0$', '$12-3x\\ge 0$', '$12-3x\\ge 0$'), explanation: say('$12\\ge 3x$, beraz $x\\le 4$: $a=4$.', '$12\\ge 3x$, así que $x\\le 4$: $a=4$.', '$12\\ge 3x$، إذن $x\\le 4$: $a=4$.') },
    { id: 105, stage: 'domain', context: 'advanced', points: 20, prompt: say('Non ebakitzen du $y=\\frac{x^2-1}{x+3}$ funtzioak Y ardatza? Idatzi ordenatua.', '¿Dónde corta $y=\\frac{x^2-1}{x+3}$ al eje Y? Escribe la ordenada.', 'أين يقطع $y=\\frac{x^2-1}{x+3}$ محور Y؟ اكتب الترتيبة.'), expected: n(-1, 3), hint: say('Jarri $x=0$.', 'Pon $x=0$.', 'ضع $x=0$.'), explanation: same('$\\frac{0^{2}-1}{0+3}=-\\frac{1}{3}$') },
    { id: 106, stage: 'domain', context: 'master', points: 30, prompt: say('$y=2x^2-7x-4$ funtzioak X ardatza bi puntutan ebakitzen du. Idatzi abzisa negatiboa.', '$y=2x^2-7x-4$ corta al eje X en dos puntos. Escribe la abscisa negativa.', 'يقطع $y=2x^2-7x-4$ محور X في نقطتين. اكتب الفاصلة السالبة.'), expected: n(-1, 2), hint: say('Ebatzi $2x^2-7x-4=0$ formula orokorrarekin.', 'Resuelve $2x^2-7x-4=0$ con la fórmula general.', 'حُلّ $2x^2-7x-4=0$ بالصيغة العامة.'), explanation: say('$x=\\frac{7\\pm\\sqrt{49+32}}{4}=\\frac{7\\pm 9}{4}$: $x=4$ eta $x=-\\frac{1}{2}$.', '$x=\\frac{7\\pm\\sqrt{49+32}}{4}=\\frac{7\\pm 9}{4}$: $x=4$ y $x=-\\frac{1}{2}$.', '$x=\\frac{7\\pm\\sqrt{49+32}}{4}=\\frac{7\\pm 9}{4}$: $x=4$ و$x=-\\frac{1}{2}$.') },
    { id: 107, stage: 'change', context: 'starter', points: 10, prompt: say('Kalkulatu $f(x)=x^3$ funtzioaren batez besteko aldakuntza-tasa $[1,\\,2]$ tartean.', 'Calcula la T.V.M. de $f(x)=x^3$ en $[1,\\,2]$.', 'احسب معدل التغير المتوسط للدالة $f(x)=x^3$ في $[1,\\,2]$.'), expected: n(7), hint: say('$f(1)=1$ eta $f(2)=8$.', '$f(1)=1$ y $f(2)=8$.', '$f(1)=1$ و$f(2)=8$.'), explanation: same('$\\frac{8-1}{2-1}=7$') },
    { id: 108, stage: 'change', context: 'advanced', points: 20, prompt: say('Igerilari batek 1500 m egiten ditu 30 minututan. Zein da bere batez besteko abiadura (m/min)?', 'Un nadador recorre 1500 m en 30 minutos. ¿Cuál es su velocidad media (m/min)?', 'يقطع سبّاح 1500 م في 30 دقيقة. ما سرعته المتوسطة (م/د)؟'), expected: n(50), hint: say('BAT $[0,\\,30]$ tartean.', 'La T.V.M. en $[0,\\,30]$.', 'المعدل في $[0,\\,30]$.'), explanation: same('$\\frac{1500-0}{30-0}=50$') },
    { id: 109, stage: 'change', context: 'master', points: 30, prompt: say('Gora jaurtitako harri baten altuera $h(t)=40t-5t^2$ da. Zein da batez besteko abiadura 1. eta 3. segundoen artean (m/s)?', 'La altura de una piedra lanzada hacia arriba es $h(t)=40t-5t^2$. ¿Cuál es su velocidad media entre los segundos 1 y 3 (m/s)?', 'ارتفاع حجر قُذف إلى أعلى $h(t)=40t-5t^2$. ما سرعته المتوسطة بين الثانيتين 1 و3 (م/ث)؟'), expected: n(20), hint: say('$h(1)=35$ eta $h(3)=75$.', '$h(1)=35$ y $h(3)=75$.', '$h(1)=35$ و$h(3)=75$.'), explanation: same('$\\frac{75-35}{3-1}=\\frac{40}{2}=20$') },
    { id: 110, stage: 'properties', context: 'starter', points: 10, prompt: say('Aparkaleku batek 3 € kobratzen ditu hasitako ordu bakoitzeko. Zenbat ordaintzen da 4 ordu eta minutu batengatik?', 'Un aparcamiento cobra 3 € por cada hora empezada. ¿Cuánto se paga por 4 h y 1 min?', 'يأخذ موقف 3 € عن كل ساعة بدأت. كم يُدفع عن 4 ساعات ودقيقة؟'), expected: n(15), hint: say('Minutu batek ordu berri bat hasten du.', 'Un minuto más empieza una hora nueva.', 'دقيقة إضافية تبدأ ساعة جديدة.'), explanation: say('5 ordu hasi dira: $5\\cdot 3=15$ €.', 'Se han empezado 5 horas: $5\\cdot 3=15$ €.', 'بدأت 5 ساعات: $5\\cdot 3=15$ €.') },
    { id: 111, stage: 'properties', context: 'advanced', points: 20, prompt: say('Zisterna bat 2 minuturo betetzen eta husten da: $f(t)=20t$ litro $[0,\\,2)$ tartean. Zenbat litro daude 40 minutu eta 30 segundotan?', 'Una cisterna se llena y se vacía cada 2 minutos: $f(t)=20t$ litros en $[0,\\,2)$. ¿Cuántos litros hay a los 40 min 30 s?', 'خزان يمتلئ ويفرغ كل دقيقتين: $f(t)=20t$ لترًا في $[0,\\,2)$. كم لترًا فيه بعد 40 دقيقة و30 ثانية؟'), expected: n(10), hint: say('40 min 30 s = 40,5 min. Kendu periodoa.', '40 min 30 s = 40,5 min. Quita el periodo.', '40 د 30 ث = 40.5 د. اطرح الدور.'), explanation: same('$40{,}5=20\\cdot 2+0{,}5\\to f(0{,}5)=20\\cdot 0{,}5=10$') },
    { id: 112, stage: 'properties', context: 'master', points: 30, prompt: say('Substantzia batek 128 unitate erradioaktibo ditu eta urtero erdia galtzen du. Zenbat geratzen dira 5 urtean?', 'Una sustancia tiene 128 unidades de radiactividad y cada año pierde la mitad. ¿Cuántas quedan a los 5 años?', 'مادة فيها 128 وحدة إشعاعية وتفقد نصفها كل سنة. كم يبقى بعد 5 سنوات؟'), expected: n(4), hint: say('Bost aldiz erdira.', 'Cinco veces a la mitad.', 'خمس مرات إلى النصف.'), explanation: say('$\\frac{128}{2^{5}}=\\frac{128}{32}=4$. 0ra jotzen du.', '$\\frac{128}{2^{5}}=\\frac{128}{32}=4$. Tiende a 0.', '$\\frac{128}{2^{5}}=\\frac{128}{32}=4$. تتجه إلى 0.') },
    { id: 113, stage: 'study', context: 'starter', points: 10, prompt: say('40 × 30 cm-ko kartulinaren kutxan, zein da $x$-ren goiko muga zentzuzkoa?', 'En la caja de la cartulina de 40 × 30 cm, ¿cuál es el límite superior con sentido para $x$?', 'في علبة الورق 40 × 30 سم، ما الحد الأعلى المنطقي لـ $x$؟'), expected: n(15), hint: say('Alde laburrari $2x$ kentzen zaio.', 'Al lado corto se le quita $2x$.', 'يُطرح $2x$ من الضلع القصير.'), explanation: same('$30-2x>0\\to x<15$') },
    { id: 114, stage: 'study', context: 'advanced', points: 20, prompt: say('1 dm-ko karratu baten diagonalean P puntu bat hartzen da, eta laukizuzen baten azalera $y=x(1-x)$ da. Kalkulatu $y$ $x=\\frac{1}{2}$ denean.', 'Sobre la diagonal de un cuadrado de 1 dm se toma un punto P y el área de un rectángulo es $y=x(1-x)$. Calcula $y$ para $x=\\frac{1}{2}$.', 'على قطر مربع ضلعه 1 دسم تؤخذ نقطة P، ومساحة مستطيل $y=x(1-x)$. احسب $y$ عندما $x=\\frac{1}{2}$.'), expected: n(1, 4), hint: say('$\\frac{1}{2}\\cdot\\frac{1}{2}$', '$\\frac{1}{2}\\cdot\\frac{1}{2}$', '$\\frac{1}{2}\\cdot\\frac{1}{2}$'), explanation: same('$\\frac{1}{2}\\cdot\\left(1-\\frac{1}{2}\\right)=\\frac{1}{4}=0{,}25$') },
    { id: 115, stage: 'study', context: 'master', points: 30, prompt: say('Enpresa baten balioa 200 000 €-koa zen 4. hilabetean eta 1 800 000 €-koa 12.ean. Zein da BAT $[4,\\,12]$ tartean, mila eurotan hilabeteko?', 'Una empresa valía 200 000 € en el mes 4 y 1 800 000 € en el mes 12. ¿Cuál es la T.V.M. en $[4,\\,12]$, en miles de euros por mes?', 'كانت قيمة شركة 200 000 € في الشهر 4 و1 800 000 € في الشهر 12. ما معدل التغير المتوسط في $[4,\\,12]$ بآلاف اليوروهات في الشهر؟'), expected: n(200), hint: say('Mila eurotan: 200 eta 1800.', 'En miles de euros: 200 y 1800.', 'بالآلاف: 200 و1800.'), explanation: same('$\\frac{1800-200}{12-4}=\\frac{1600}{8}=200$') }
]

/* ---------- Exercise bank ---------- */

export const functionsExerciseBank: FunctionsExerciseSection[] = [
    {
        id: 'concept',
        title: say('Funtzio kontzeptua', 'Concepto de función', 'مفهوم الدالة'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Funtzioak al dira? a) boligrafo kopurua eta prezioa; b) pertsona baten pisua eta altuera; c) poligono erregular baten aldea eta perimetroa; d) ikasteko orduak eta nota.', '¿Son funciones? a) el número de bolis y su precio; b) el peso y la estatura de una persona; c) el lado de un polígono regular y su perímetro; d) las horas de estudio y la nota.', 'هل هي دوال؟ أ) عدد الأقلام وثمنها؛ ب) وزن الشخص وطوله؛ ج) ضلع مضلع منتظم ومحيطه؛ د) ساعات الدراسة والعلامة.'), solution: say('a) Bai. b) Ez: pisu bereko bi pertsonek altuera desberdina izan dezakete. c) Bai. d) Ez: ordu berak nota desberdinak eman ditzake.', 'a) Sí. b) No: dos personas del mismo peso pueden medir distinto. c) Sí. d) No: las mismas horas pueden dar notas distintas.', 'أ) نعم. ب) لا: قد يختلف طول شخصين بالوزن نفسه. ج) نعم. د) لا: الساعات نفسها قد تعطي علامات مختلفة.') },
            { id: 2, difficulty: 'easy', question: say('$x\\to 2x+2$ erlazioan, kalkulatu 3, 5, 7 eta 9 zenbakien irudiak.', 'En la relación $x\\to 2x+2$, calcula las imágenes de 3, 5, 7 y 9.', 'في العلاقة $x\\to 2x+2$ احسب صور 3 و5 و7 و9.'), solution: same('$2\\cdot 3+2=8\\qquad 2\\cdot 5+2=12\\qquad 2\\cdot 7+2=16\\qquad 2\\cdot 9+2=20$') },
            { id: 3, difficulty: 'easy', question: say('$f(x)=x^2-5x$ bada, kalkulatu $f(-1)$.', 'Si $f(x)=x^2-5x$, calcula $f(-1)$.', 'إذا كانت $f(x)=x^2-5x$ فاحسب $f(-1)$.'), solution: same('$(-1)^{2}-5\\cdot(-1)=1+5=6$'), answer: { expected: n(6) } },
            { id: 4, difficulty: 'medium', question: say('Txorrota batek 1,5 litro galtzen ditu orduko. Idatzi formula eta kalkulatu zenbat litro galtzen diren egun batean.', 'Un grifo gotea 1,5 litros por hora. Escribe la fórmula y calcula cuántos litros pierde en un día.', 'يقطر صنبور 1.5 لتر في الساعة. اكتب الصيغة واحسب كم لترًا يفقد في يوم.'), solution: say('$y=1{,}5x$ ($x$ orduak). Egun batean: $1{,}5\\cdot 24=36$ litro.', '$y=1{,}5x$ ($x$ en horas). En un día: $1{,}5\\cdot 24=36$ litros.', '$y=1{,}5x$ ($x$ بالساعات). في يوم: $1{,}5\\cdot 24=36$ لترًا.'), answer: { expected: n(36) } },
            { id: 5, difficulty: 'medium', question: say('Osatu $y=-2x+3$ funtzioaren taula $x=-2,\\,-1,\\,0,\\,1,\\,2$ balioekin. Zenbat da $y$ $x=-2$ denean?', 'Completa la tabla de $y=-2x+3$ con $x=-2,\\,-1,\\,0,\\,1,\\,2$. ¿Cuánto vale $y$ para $x=-2$?', 'أكمل جدول $y=-2x+3$ بالقيم $x=-2,\\,-1,\\,0,\\,1,\\,2$. كم تساوي $y$ عندما $x=-2$؟'), solution: same('$y=7,\\ 5,\\ 3,\\ 1,\\ -1\\qquad -2\\cdot(-2)+3=7$'), answer: { expected: n(7) } },
            { id: 6, difficulty: 'medium', question: say('$(3,\\,k)$ puntua $f(x)=2x^2-x$ funtzioaren grafikoan dago. Zenbat da $k$?', 'El punto $(3,\\,k)$ está en la gráfica de $f(x)=2x^2-x$. ¿Cuánto vale $k$?', 'النقطة $(3,\\,k)$ على رسم $f(x)=2x^2-x$. كم تساوي $k$؟'), solution: same('$k=f(3)=2\\cdot 9-3=15$'), answer: { expected: n(15) } },
            { id: 7, difficulty: 'medium', question: say('$(2,\\,5)$ puntua $f(x)=x^2+1$ funtzioaren grafikoan dago? Eta $(-1,\\,3)$?', '¿Está el punto $(2,\\,5)$ en la gráfica de $f(x)=x^2+1$? ¿Y $(-1,\\,3)$?', 'هل النقطة $(2,\\,5)$ على رسم $f(x)=x^2+1$؟ وماذا عن $(-1,\\,3)$؟'), solution: say('$f(2)=4+1=5$: bai. $f(-1)=1+1=2\\ne 3$: ez.', '$f(2)=4+1=5$: sí. $f(-1)=1+1=2\\ne 3$: no.', '$f(2)=4+1=5$: نعم. $f(-1)=1+1=2\\ne 3$: لا.') },
            { id: 8, difficulty: 'hard', question: say('Fotokopia batek 0,08 € balio du 200 baino gutxiago egiten badira, eta 0,07 € 200 edo gehiago egiten badira. 199 fotokopiak 15,92 € dira. Gutxienez zenbat fotokopia eskatu behar dira gehiago ordaintzeko?', 'Una fotocopia cuesta 0,08 € si se hacen menos de 200 y 0,07 € si se hacen 200 o más. Hacer 199 cuesta 15,92 €. ¿Cuántas fotocopias hay que pedir como mínimo para pagar más que eso?', 'تكلف النسخة 0.08 € إذا كانت أقل من 200، و0.07 € إذا كانت 200 أو أكثر. 199 نسخة تكلف 15.92 €. ما أقل عدد نسخ يُدفع عنه أكثر من ذلك؟'), solution: say('$15{,}92\\mathbin{:}0{,}07\\approx 227{,}4$. Beraz, 228 fotokopia edo gehiago.', '$15{,}92\\mathbin{:}0{,}07\\approx 227{,}4$. Así que 228 fotocopias o más.', '$15{,}92\\mathbin{:}0{,}07\\approx 227{,}4$. إذن 228 نسخة أو أكثر.'), answer: { expected: n(228) } },
            { id: 9, difficulty: 'hard', question: say('Pendulu baten periodoa $T=\\sqrt{4l}$ da gutxi gorabehera ($l$ metrotan, $T$ segundotan). Zenbat neurtzen du 6 s-ko periodoa duen penduluak?', 'El periodo de un péndulo es, aproximadamente, $T=\\sqrt{4l}$ ($l$ en metros, $T$ en segundos). ¿Cuánto mide un péndulo de periodo 6 s?', 'دور النواس تقريبًا $T=\\sqrt{4l}$ ($l$ بالأمتار و$T$ بالثواني). كم طول نواس دوره 6 ث؟'), solution: same('$6=\\sqrt{4l}\\to 36=4l\\to l=\\frac{36}{4}=9$'), answer: { expected: n(9) } },
            { id: 10, difficulty: 'hard', question: say('Bola bat aldapa batetik behera doa: $e=10t^2$ (cm). Zenbat cm egiten ditu 3. segundoan bakarrik (2 s-tik 3 s-ra)?', 'Una bola baja por una rampa: $e=10t^2$ (cm). ¿Cuántos cm recorre solo durante el tercer segundo (de 2 s a 3 s)?', 'تنزل كرة على منحدر: $e=10t^2$ (سم). كم سنتيمترًا تقطع خلال الثانية الثالثة وحدها (من 2 ث إلى 3 ث)؟'), solution: same('$10\\cdot 3^{2}-10\\cdot 2^{2}=90-40=50$'), answer: { expected: n(50) } }
        ]
    },
    {
        id: 'domain',
        title: say('Izate-eremua eta ebaki-puntuak', 'Dominio y puntos de corte', 'المجال ونقاط التقاطع'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Idatzi grafikoaren izate-eremua eta ibiltartea.', 'Escribe el dominio y el recorrido de la gráfica.', 'اكتب مجال الرسم ومداه.'), solution: same('$\\text{Dom}\\,f=[-3,\\,4]\\qquad \\text{Rec}\\,f=[-2,\\,4]$'), graph: domainGraph },
            { id: 12, difficulty: 'easy', question: say('Txorrota baten uraren tenperatura 0. minututik 6.era. Zein da ibiltartearen goiko muturra (°C)?', 'Temperatura del agua de un grifo del minuto 0 al 6. ¿Cuál es el extremo superior del recorrido (°C)?', 'حرارة ماء صنبور من الدقيقة 0 إلى 6. ما الطرف الأعلى للمدى (°م)؟'), solution: say('Dom $f=[0,\\,6]$ eta Rec $f=[10,\\,58]$. Goiko muturra: 58 °C.', 'Dom $f=[0,\\,6]$ y Rec $f=[10,\\,58]$. El extremo superior: 58 °C.', 'Dom $f=[0,\\,6]$ وRec $f=[10,\\,58]$. الطرف الأعلى: 58 °م.'), answer: { expected: n(58) }, graph: tapGraph },
            { id: 13, difficulty: 'easy', question: say('Kalkulatu izate-eremua: a) $y=x^2-4x+1$; b) $y=\\frac{1-x}{x-3}$; c) $y=\\sqrt{x+2}$.', 'Calcula el dominio: a) $y=x^2-4x+1$; b) $y=\\frac{1-x}{x-3}$; c) $y=\\sqrt{x+2}$.', 'احسب المجال: أ) $y=x^2-4x+1$؛ ب) $y=\\frac{1-x}{x-3}$؛ ج) $y=\\sqrt{x+2}$.'), solution: same('$\\text{a)}\\ \\mathbb{R}\\qquad \\text{b)}\\ \\mathbb{R}-\\{3\\}\\qquad \\text{c)}\\ [-2,\\,+\\infty)$') },
            { id: 14, difficulty: 'medium', question: say('Zein $x$ balio ez dago $y=\\frac{x^2}{x+4}$ funtzioaren izate-eremuan?', '¿Qué valor de $x$ no está en el dominio de $y=\\frac{x^2}{x+4}$?', 'ما قيمة $x$ التي ليست في مجال $y=\\frac{x^2}{x+4}$؟'), solution: same('$x+4=0\\to x=-4$'), answer: { expected: n(-4) } },
            { id: 15, difficulty: 'medium', question: say('Asmatu izate-eremutzat $[0,\\,5]$ eta ibiltartetzat $\\{1\\}$ dituen funtzio bat.', 'Inventa una función con dominio $[0,\\,5]$ y recorrido $\\{1\\}$.', 'اخترع دالة مجالها $[0,\\,5]$ ومداها $\\{1\\}$.'), solution: say('Adibidez, $y=1$ zuzenkia $x=0$ puntutik $x=5$ puntura: funtzio konstantea.', 'Por ejemplo, el segmento $y=1$ desde $x=0$ hasta $x=5$: una función constante.', 'مثلًا القطعة $y=1$ من $x=0$ إلى $x=5$: دالة ثابتة.') },
            { id: 16, difficulty: 'medium', question: say('Kalkulatu $y=x^3-1$ funtzioaren ebaki-puntuak ardatzekin. Zenbat da Y ardatzeko ordenatua?', 'Calcula los cortes de $y=x^3-1$ con los ejes. ¿Cuál es la ordenada del corte con el eje Y?', 'احسب تقاطعات $y=x^3-1$ مع المحورين. ما ترتيبة التقاطع مع محور Y؟'), solution: say('X ardatza: $x^3=1$, $(1,\\,0)$. Y ardatza: $y=0^{3}-1=-1$, $(0,\\,-1)$.', 'Eje X: $x^3=1$, $(1,\\,0)$. Eje Y: $y=0^{3}-1=-1$, $(0,\\,-1)$.', 'محور X: $x^3=1$، $(1,\\,0)$. محور Y: $y=0^{3}-1=-1$، $(0,\\,-1)$.'), answer: { expected: n(-1) } },
            { id: 17, difficulty: 'medium', question: say('$(-3,\\,0)$ $y=x^2-x-12$ funtzioaren ebaki-puntua da? Kalkulatu beste ebaki-puntuaren abzisa X ardatzarekin.', '¿Es $(-3,\\,0)$ un punto de corte de $y=x^2-x-12$? Calcula la abscisa del otro corte con el eje X.', 'هل $(-3,\\,0)$ نقطة تقاطع لـ $y=x^2-x-12$؟ احسب فاصلة التقاطع الآخر مع محور X.'), solution: say('$(-3)^{2}-(-3)-12=9+3-12=0$: bai. $x^2-x-12=0$ ebaztean: $x=-3$ eta $x=4$.', '$(-3)^{2}-(-3)-12=9+3-12=0$: sí. Al resolver $x^2-x-12=0$: $x=-3$ y $x=4$.', '$(-3)^{2}-(-3)-12=9+3-12=0$: نعم. بحل $x^2-x-12=0$: $x=-3$ و$x=4$.'), answer: { expected: n(4) } },
            { id: 18, difficulty: 'hard', question: say('Kalkulatu $y=\\frac{2x+6}{x-1}$ funtzioaren ebaki-puntuak. Zein da X ardatzekoaren abzisa?', 'Calcula los cortes de $y=\\frac{2x+6}{x-1}$. ¿Cuál es la abscisa del corte con el eje X?', 'احسب تقاطعات $y=\\frac{2x+6}{x-1}$. ما فاصلة التقاطع مع محور X؟'), solution: say('X ardatza: $2x+6=0$, $x=-3$, $(-3,\\,0)$. Y ardatza: $\\frac{6}{-1}=-6$, $(0,\\,-6)$.', 'Eje X: $2x+6=0$, $x=-3$, $(-3,\\,0)$. Eje Y: $\\frac{6}{-1}=-6$, $(0,\\,-6)$.', 'محور X: $2x+6=0$، $x=-3$، $(-3,\\,0)$. محور Y: $\\frac{6}{-1}=-6$، $(0,\\,-6)$.'), answer: { expected: n(-3) } },
            { id: 19, difficulty: 'hard', question: say('$y=\\frac{x-6}{x-2}$ funtzioak Y ardatza non ebakitzen du? Idatzi ordenatua.', '¿Dónde corta $y=\\frac{x-6}{x-2}$ al eje Y? Escribe la ordenada.', 'أين يقطع $y=\\frac{x-6}{x-2}$ محور Y؟ اكتب الترتيبة.'), solution: same('$\\frac{0-6}{0-2}=\\frac{-6}{-2}=3$'), answer: { expected: n(3) } },
            { id: 20, difficulty: 'hard', question: say('Kutxa bat 40 × 30 cm-ko kartulinarekin egiten da, izkinetan $x$ aldeko karratuak moztuta. Zein da $x$-ren izate-eremua? Zenbat da goiko muturra?', 'Una caja se hace con una cartulina de 40 × 30 cm cortando cuadrados de lado $x$ en las esquinas. ¿Cuál es el dominio de $x$? ¿Cuánto vale su extremo superior?', 'تُصنع علبة من ورق 40 × 30 سم بقص مربعات ضلعها $x$ في الزوايا. ما مجال $x$؟ وكم طرفه الأعلى؟'), solution: say('$x>0$ eta $30-2x>0$: $0<x<15$. Goiko muturra: 15.', '$x>0$ y $30-2x>0$: $0<x<15$. El extremo superior: 15.', '$x>0$ و$30-2x>0$: $0<x<15$. الطرف الأعلى: 15.'), answer: { expected: n(15) } }
        ]
    },
    {
        id: 'change',
        title: say('Hazkundea eta muturrak', 'Crecimiento y extremos', 'التزايد والقيم القصوى'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Idatzi funtzioa gorakorra eta beherakorra den tarteak.', 'Escribe los intervalos de crecimiento y de decrecimiento.', 'اكتب فترات التزايد والتناقص.'), solution: say('Gorakorra: $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$. Beherakorra: $(-2,\\,2)$.', 'Crece: $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$. Decrece: $(-2,\\,2)$.', 'متزايدة: $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$. متناقصة: $(-2,\\,2)$.'), graph: cubicGraph },
            { id: 22, difficulty: 'easy', question: say('Zenbat minimo erlatibo ditu grafikoak?', '¿Cuántos mínimos relativos tiene la gráfica?', 'كم قيمة صغرى نسبية في الرسم؟'), solution: say('Minimoak: $(3,\\,1)$ eta $(6,\\,1)$. Bi dira.', 'Mínimos: $(3,\\,1)$ y $(6,\\,1)$. Son 2.', 'القيم الصغرى: $(3,\\,1)$ و$(6,\\,1)$. عددها 2.'), answer: { expected: n(2) }, graph: studyGraph },
            { id: 23, difficulty: 'easy', question: say('Kalkulatu $f(x)=x^2-4x+5$ funtzioaren BAT $[1,\\,3]$ tartean.', 'Calcula la T.V.M. de $f(x)=x^2-4x+5$ en $[1,\\,3]$.', 'احسب معدل التغير المتوسط للدالة $f(x)=x^2-4x+5$ في $[1,\\,3]$.'), solution: same('$\\frac{f(3)-f(1)}{3-1}=\\frac{2-2}{2}=0$'), answer: { expected: n(0) }, graph: parabolaGraph },
            { id: 24, difficulty: 'medium', question: say('Kalkulatu $f(x)=x^2-4x+5$ funtzioaren BAT $[1,\\,4]$ tartean.', 'Calcula la T.V.M. de $f(x)=x^2-4x+5$ en $[1,\\,4]$.', 'احسب معدل التغير المتوسط للدالة $f(x)=x^2-4x+5$ في $[1,\\,4]$.'), solution: same('$\\frac{5-2}{4-1}=\\frac{3}{3}=1$'), answer: { expected: n(1) }, graph: parabolaGraph },
            { id: 25, difficulty: 'medium', question: say('Harri bat: 0 s-tan 0 m, 1 s-tan 35 m, 3 s-tan 75 m, 4 s-tan 80 m. Kalkulatu batez besteko abiadura $[0,\\,1]$, $[0,\\,3]$ eta $[3,\\,4]$ tarteetan. Zenbat da $[3,\\,4]$ tartekoa?', 'Una piedra: a 0 m en 0 s, 35 m en 1 s, 75 m en 3 s y 80 m en 4 s. Calcula su velocidad media en $[0,\\,1]$, $[0,\\,3]$ y $[3,\\,4]$. ¿Cuánto vale la de $[3,\\,4]$?', 'حجر: 0 م في 0 ث، 35 م في 1 ث، 75 م في 3 ث، 80 م في 4 ث. احسب سرعته المتوسطة في $[0,\\,1]$ و$[0,\\,3]$ و$[3,\\,4]$. كم تساوي في $[3,\\,4]$؟'), solution: same('$\\frac{35-0}{1}=35\\qquad \\frac{75-0}{3}=25\\qquad \\frac{80-75}{4-3}=5$'), answer: { expected: n(5) } },
            { id: 26, difficulty: 'medium', question: say('Kalkulatu $y=3x^3+9x^2-3x-9$ funtzioaren BAT $[-2,\\,0]$ tartean.', 'Calcula la T.V.M. de $y=3x^3+9x^2-3x-9$ en $[-2,\\,0]$.', 'احسب معدل التغير المتوسط للدالة $y=3x^3+9x^2-3x-9$ في $[-2,\\,0]$.'), solution: say('$f(0)=-9$ eta $f(-2)=-24+36+6-9=9$. $\\frac{-9-9}{0+2}=-9$.', '$f(0)=-9$ y $f(-2)=-24+36+6-9=9$. $\\frac{-9-9}{0+2}=-9$.', '$f(0)=-9$ و$f(-2)=-24+36+6-9=9$. $\\frac{-9-9}{0+2}=-9$.'), answer: { expected: n(-9) } },
            { id: 27, difficulty: 'medium', question: say('Funtzio bat gorakorra da $(-\\infty,\\,-1)$ tartean, beherakorra $(-1,\\,3)$ tartean eta gorakorra $(3,\\,+\\infty)$ tartean. $f(-1)=4$ eta $f(3)=-2$. Idatzi maximoa eta minimoa.', 'Una función crece en $(-\\infty,\\,-1)$, decrece en $(-1,\\,3)$ y crece en $(3,\\,+\\infty)$. $f(-1)=4$ y $f(3)=-2$. Escribe el máximo y el mínimo.', 'دالة متزايدة في $(-\\infty,\\,-1)$ ومتناقصة في $(-1,\\,3)$ ومتزايدة في $(3,\\,+\\infty)$. $f(-1)=4$ و$f(3)=-2$. اكتب العظمى والصغرى.'), solution: say('Maximo erlatiboa: $(-1,\\,4)$. Minimo erlatiboa: $(3,\\,-2)$.', 'Máximo relativo: $(-1,\\,4)$. Mínimo relativo: $(3,\\,-2)$.', 'العظمى النسبية: $(-1,\\,4)$. الصغرى النسبية: $(3,\\,-2)$.') },
            { id: 28, difficulty: 'hard', question: say('Hiru igerilari 30 minututan: A-k 1100 m, B-k 1500 m eta C-k 1600 m. Zein da azkarrena eta zenbat da bere batez besteko abiaduraren eta B-rena arteko aldea (m/min), hamarrenetara?', 'Tres nadadores en 30 minutos: A hace 1100 m, B 1500 m y C 1600 m. ¿Quién es el más rápido y cuál es la diferencia entre su velocidad media y la de B (m/min), a las décimas?', 'ثلاثة سباحين في 30 دقيقة: A يقطع 1100 م وB يقطع 1500 م وC يقطع 1600 م. من الأسرع، وما الفرق بين سرعته المتوسطة وسرعة B (م/د) مقربًا إلى الأعشار؟'), solution: say('C: $\\frac{1600}{30}\\approx 53{,}3$; B: $\\frac{1500}{30}=50$. C da azkarrena: $53{,}3-50=3{,}3$ m/min.', 'C: $\\frac{1600}{30}\\approx 53{,}3$; B: $\\frac{1500}{30}=50$. El más rápido es C: $53{,}3-50=3{,}3$ m/min.', 'C: $\\frac{1600}{30}\\approx 53{,}3$؛ B: $\\frac{1500}{30}=50$. الأسرع C: $53{,}3-50=3{,}3$ م/د.'), answer: { expected: n(33, 10) } },
            { id: 29, difficulty: 'hard', question: say('Grafikoan, zein da maximo absolutuaren ordenatua? Eta minimo absolutuarena?', 'En la gráfica, ¿cuál es la ordenada del máximo absoluto? ¿Y la del mínimo absoluto?', 'في الرسم، ما ترتيبة العظمى المطلقة؟ وترتيبة الصغرى المطلقة؟'), solution: say('Maximo absolutua 3 da ($x=1$ eta $x=7$ puntuetan); minimo absolutua 0 ($x=0$ eta $x=8$ muturretan).', 'El máximo absoluto vale 3 (en $x=1$ y $x=7$); el mínimo absoluto, 0 (en los extremos $x=0$ y $x=8$).', 'العظمى المطلقة 3 (عند $x=1$ و$x=7$)، والصغرى المطلقة 0 (عند الطرفين $x=0$ و$x=8$).'), answer: { expected: n(3) }, graph: studyGraph },
            { id: 30, difficulty: 'hard', question: say('Bola baten ibilbidea $e=10t^2$ da (cm). Kalkulatu batez besteko abiadura $[1,\\,3]$ tartean (cm/s).', 'Una bola recorre $e=10t^2$ (cm). Calcula su velocidad media en $[1,\\,3]$ (cm/s).', 'تقطع كرة $e=10t^2$ (سم). احسب سرعتها المتوسطة في $[1,\\,3]$ (سم/ث).'), solution: same('$\\frac{10\\cdot 9-10\\cdot 1}{3-1}=\\frac{80}{2}=40$'), answer: { expected: n(40) } }
        ]
    },
    {
        id: 'properties',
        title: say('Jarraitutasuna, periodikotasuna eta joera', 'Continuidad, periodicidad y tendencia', 'الاتصال والدورية والاتجاه'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Zein $x$ puntutan du grafikoak jauzi bat? Eta zein puntutan puntu lekualdatu bat?', '¿En qué $x$ tiene la gráfica un salto? ¿Y un punto desplazado?', 'عند أي $x$ يقفز الرسم؟ وعند أي $x$ توجد نقطة منزاحة؟'), solution: say('Jauzia $x=2$ puntuan (2tik 4ra). Puntu lekualdatua $x=4$ puntuan: kurba $(4,\\,3)$ puntutik pasatzen da, baina puntua $(4,\\,1)$ da.', 'Salto en $x=2$ (de 2 a 4). Punto desplazado en $x=4$: la curva pasa por $(4,\\,3)$, pero el punto está en $(4,\\,1)$.', 'قفزة عند $x=2$ (من 2 إلى 4). نقطة منزاحة عند $x=4$: يمر المنحنى بـ $(4,\\,3)$ لكن النقطة في $(4,\\,1)$.'), graph: brokenGraph },
            { id: 32, difficulty: 'easy', question: say('Grafiko berean, zenbat da $f(2)$?', 'En la misma gráfica, ¿cuánto vale $f(2)$?', 'في الرسم نفسه، كم تساوي $f(2)$؟'), solution: say('Puntu betea $(2,\\,4)$ da; $(2,\\,2)$ hutsik dago. $f(2)=4$.', 'El punto relleno es $(2,\\,4)$; $(2,\\,2)$ está hueco. $f(2)=4$.', 'النقطة الممتلئة $(2,\\,4)$؛ و$(2,\\,2)$ فارغة. $f(2)=4$.'), answer: { expected: n(4) }, graph: brokenGraph },
            { id: 33, difficulty: 'easy', question: say('Zein puntutan da etena $y=\\frac{1}{x-2}$? Zergatik?', '¿En qué punto es discontinua $y=\\frac{1}{x-2}$? ¿Por qué?', 'عند أي نقطة تكون $y=\\frac{1}{x-2}$ منفصلة؟ ولماذا؟'), solution: say('$x=2$ puntuan: ez dago izate-eremuan eta adar infinituak ditu.', 'En $x=2$: no está en el dominio y tiene ramas infinitas.', 'عند $x=2$: ليست في المجال ولها فروع لانهائية.'), answer: { expected: n(2) } },
            { id: 34, difficulty: 'medium', question: say('Aparkaleku bat: 1 € ordu erdi bakoitzeko (hasitakoa). Zenbat ordaintzen da 1 ordu eta 40 minuturengatik?', 'Un aparcamiento: 1 € por cada media hora empezada. ¿Cuánto se paga por 1 h 40 min?', 'موقف: 1 € عن كل نصف ساعة بدأت. كم يُدفع عن ساعة و40 دقيقة؟'), solution: say('100 minutu dira: $3\\cdot 30=90$ baino gehiago, beraz 4 ordu erdi hasi dira: 4 €.', 'Son 100 minutos: más de $3\\cdot 30=90$, así que se han empezado 4 medias horas: 4 €.', 'إنها 100 دقيقة: أكثر من $3\\cdot 30=90$، إذن بدأت 4 أنصاف ساعات: 4 €.'), answer: { expected: n(4) } },
            { id: 35, difficulty: 'medium', question: say('Grafiko periodikoan, zenbat da $f(42)$?', 'En la gráfica periódica, ¿cuánto vale $f(42)$?', 'في الرسم الدوري، كم تساوي $f(42)$؟'), solution: same('$42=10\\cdot 4+2\\to f(42)=f(2)=3$'), answer: { expected: n(3) }, graph: periodicGraph },
            { id: 36, difficulty: 'medium', question: say('Zisterna bat 2 minuturo betetzen eta husten da: $f(t)=20t$ litro $[0,\\,2)$ tartean. Zenbat litro daude 17 minututan?', 'Una cisterna se llena y se vacía cada 2 minutos: $f(t)=20t$ litros en $[0,\\,2)$. ¿Cuántos litros hay a los 17 minutos?', 'خزان يمتلئ ويفرغ كل دقيقتين: $f(t)=20t$ لترًا في $[0,\\,2)$. كم لترًا فيه بعد 17 دقيقة؟'), solution: same('$17=8\\cdot 2+1\\to f(17)=f(1)=20$'), answer: { expected: n(20) } },
            { id: 37, difficulty: 'medium', question: say('Zisterna berean, zenbat litro daude ordubete, 9 minutu eta 30 segundotan?', 'En la misma cisterna, ¿cuántos litros hay a 1 h 9 min 30 s?', 'في الخزان نفسه، كم لترًا فيه بعد ساعة و9 دقائق و30 ثانية؟'), solution: say('69,5 minutu dira: $69{,}5=34\\cdot 2+1{,}5$, beraz $f(1{,}5)=20\\cdot 1{,}5=30$.', 'Son 69,5 minutos: $69{,}5=34\\cdot 2+1{,}5$, así que $f(1{,}5)=20\\cdot 1{,}5=30$.', 'إنها 69.5 دقيقة: $69{,}5=34\\cdot 2+1{,}5$، إذن $f(1{,}5)=20\\cdot 1{,}5=30$.'), answer: { expected: n(30) } },
            { id: 38, difficulty: 'hard', question: say('Hozkailutik ateratako ur-baso baten tenperatura. Zertara jotzen du (°C)?', 'Temperatura de un vaso de agua sacado de la nevera. ¿A qué tiende (°C)?', 'حرارة كأس ماء أُخرج من الثلاجة. إلى أين تتجه (°م)؟'), solution: say('Marra etenera hurbiltzen da: 22 °C, gelako tenperatura. Hasieran 2 °C zegoen.', 'Se acerca a la línea discontinua: 22 °C, la temperatura de la habitación. Al principio estaba a 2 °C.', 'تقترب من الخط المتقطع: 22 °م، حرارة الغرفة. وكانت في البداية 2 °م.'), answer: { expected: n(22) }, graph: fridgeGraph },
            { id: 39, difficulty: 'hard', question: say('Halleyren kometa Eguzkitik hurbil igaro zen 1755, 1832, 1909 eta 1986 urteetan. Zein da periodoa (urtetan)?', 'El cometa Halley pasó cerca del Sol en 1755, 1832, 1909 y 1986. ¿Cuál es su periodo (en años)?', 'مرّ مذنب هالي قرب الشمس في 1755 و1832 و1909 و1986. ما دوره (بالسنوات)؟'), solution: same('$1832-1755=77\\qquad 1909-1832=77\\qquad 1986-1909=77$'), answer: { expected: n(77) } },
            { id: 40, difficulty: 'hard', question: say('Kulunka bateko haurraren altuera 4 segundoan errepikatzen da. 1 s-tan 2 m-ra dago. Zenbat metrotara dago 13 s-tan?', 'La altura de un niño en un columpio se repite cada 4 s. En el segundo 1 está a 2 m. ¿A cuántos metros está en el segundo 13?', 'يتكرر ارتفاع طفل على أرجوحة كل 4 ث. في الثانية 1 يكون على ارتفاع 2 م. على أي ارتفاع يكون في الثانية 13؟'), solution: same('$13=3\\cdot 4+1\\to f(13)=f(1)=2$'), answer: { expected: n(2) } }
        ]
    },
    {
        id: 'study',
        title: say('Funtzioak aztertzea', 'Estudiar funciones', 'دراسة الدوال'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Glukemiaren grafikoan, zenbat ordutara da minimoa?', 'En la gráfica de la glucemia, ¿a cuántas horas está el mínimo?', 'في رسم سكر الدم، بعد كم ساعة تكون الصغرى؟'), solution: say('Minimoa $(4,\\,80)$ da: 4 orduan, 80 mg/dl.', 'El mínimo es $(4,\\,80)$: a las 4 h, con 80 mg/dl.', 'الصغرى $(4,\\,80)$: بعد 4 ساعات، 80 mg/dl.'), answer: { expected: n(4) }, graph: glucoseGraph },
            { id: 42, difficulty: 'easy', question: say('Abiadura-grafikoan, zein da abiadura maximoa (km/h)?', 'En la gráfica de la velocidad, ¿cuál es la velocidad máxima (km/h)?', 'في رسم السرعة، ما السرعة العظمى (كم/س)؟'), solution: say('Punturik altuena 10. minutuan dago, 6 laukitan: $6\\cdot 15=90$ km/h.', 'El punto más alto está en el minuto 10, a 6 cuadros: $6\\cdot 15=90$ km/h.', 'أعلى نقطة عند الدقيقة 10 على ارتفاع 6 خانات: $6\\cdot 15=90$ كم/س.'), answer: { expected: n(90) }, graph: speedGraph },
            { id: 43, difficulty: 'easy', question: say('Egin abiadura-grafikoaren azterketa osoa.', 'Haz el estudio completo de la gráfica de la velocidad.', 'ادرس رسم السرعة دراسة كاملة.'), solution: say('Dom $[0,\\,25]$, Rec $[0,\\,90]$. Ebakiak: $(0,\\,0)$ eta $(25,\\,0)$. Gorakorra $(0,\\,10)\\cup(15,\\,20)$, beherakorra $(10,\\,15)\\cup(20,\\,25)$. Maximoak $(10,\\,90)$ eta $(20,\\,60)$, minimoa $(15,\\,45)$. Jarraitua, ez periodikoa.', 'Dom $[0,\\,25]$, Rec $[0,\\,90]$. Cortes: $(0,\\,0)$ y $(25,\\,0)$. Crece en $(0,\\,10)\\cup(15,\\,20)$ y decrece en $(10,\\,15)\\cup(20,\\,25)$. Máximos $(10,\\,90)$ y $(20,\\,60)$; mínimo $(15,\\,45)$. Continua, no periódica.', 'Dom $[0,\\,25]$، Rec $[0,\\,90]$. التقاطع: $(0,\\,0)$ و$(25,\\,0)$. تتزايد في $(0,\\,10)\\cup(15,\\,20)$ وتتناقص في $(10,\\,15)\\cup(20,\\,25)$. العظمى $(10,\\,90)$ و$(20,\\,60)$؛ الصغرى $(15,\\,45)$. متصلة وغير دورية.'), graph: speedGraph },
            { id: 44, difficulty: 'medium', question: say('Egin grafikoaren azterketa osoa eta adierazi zenbat den bere ibiltartearen luzera.', 'Haz el estudio completo de la gráfica e indica cuánto mide su recorrido.', 'ادرس الرسم دراسة كاملة وبيّن طول مداه.'), solution: say('Dom $[0,\\,8]$, Rec $[0,\\,3]$ (luzera 3). Ebakiak $(0,\\,0)$ eta $(8,\\,0)$. Gorakorra $(0,\\,1)\\cup(3,\\,5)\\cup(6,\\,7)$. Maximoak $(1,\\,3)$, $(5,\\,2)$, $(7,\\,3)$; minimoak $(3,\\,1)$, $(6,\\,1)$. Jarraitua.', 'Dom $[0,\\,8]$, Rec $[0,\\,3]$ (mide 3). Cortes $(0,\\,0)$ y $(8,\\,0)$. Crece en $(0,\\,1)\\cup(3,\\,5)\\cup(6,\\,7)$. Máximos $(1,\\,3)$, $(5,\\,2)$, $(7,\\,3)$; mínimos $(3,\\,1)$, $(6,\\,1)$. Continua.', 'Dom $[0,\\,8]$، Rec $[0,\\,3]$ (طوله 3). التقاطع $(0,\\,0)$ و$(8,\\,0)$. تتزايد في $(0,\\,1)\\cup(3,\\,5)\\cup(6,\\,7)$. العظمى $(1,\\,3)$ و$(5,\\,2)$ و$(7,\\,3)$؛ الصغرى $(3,\\,1)$ و$(6,\\,1)$. متصلة.'), answer: { expected: n(3) }, graph: studyGraph },
            { id: 45, difficulty: 'medium', question: say('Kalkulatu 40 × 30 cm-ko kartulinaren kutxaren bolumena $x=5$ cm denean.', 'Calcula el volumen de la caja de la cartulina de 40 × 30 cm cuando $x=5$ cm.', 'احسب حجم علبة الورق 40 × 30 سم عندما $x=5$ سم.'), solution: same('$V(5)=(40-10)\\cdot(30-10)\\cdot 5=30\\cdot 20\\cdot 5=3000$'), answer: { expected: n(3000) } },
            { id: 46, difficulty: 'medium', question: say('Idatzi 7 cm-ko karratu batean inskribatutako karratuaren azalera: erpinak $x$ distantziara daude. Kalkulatu $A(3)$.', 'Escribe el área del cuadrado inscrito en uno de 7 cm con los vértices a distancia $x$. Calcula $A(3)$.', 'اكتب مساحة المربع المرسوم داخل مربع ضلعه 7 سم ورؤوسه على بعد $x$. احسب $A(3)$.'), solution: say('Pitagoras: $A(x)=x^2+(7-x)^2=2x^2-14x+49$. $A(3)=18-42+49=25$.', 'Por Pitágoras: $A(x)=x^2+(7-x)^2=2x^2-14x+49$. $A(3)=18-42+49=25$.', 'بفيثاغورس: $A(x)=x^2+(7-x)^2=2x^2-14x+49$. $A(3)=18-42+49=25$.'), answer: { expected: n(25) } },
            { id: 47, difficulty: 'medium', question: say('Telefono-konpainia batek 0,10 € kobratzen du deia hasteko eta 0,40 € hasitako 3 minutu bakoitzeko. Zenbat balio du ordu erdiko dei batek?', 'Una compañía cobra 0,10 € por establecer la llamada y 0,40 € por cada 3 minutos empezados. ¿Cuánto cuesta una llamada de media hora?', 'تأخذ شركة 0.10 € لبدء المكالمة و0.40 € عن كل 3 دقائق بدأت. كم تكلف مكالمة نصف ساعة؟'), solution: same('$0{,}1+0{,}40\\cdot 10=4{,}1$'), answer: { expected: n(41, 10) } },
            { id: 48, difficulty: 'hard', question: say('Enpresa bat 600 000 €-ko balioarekin ireki zen eta 4 hilabetean 200 000 €-ra jaitsi zen. Zenbat galdu zuen hilabeteko batez beste (mila eurotan)?', 'Una empresa abrió valiendo 600 000 € y a los 4 meses bajó a 200 000 €. ¿Cuánto perdió de media al mes (en miles de euros)?', 'افتُتحت شركة بقيمة 600 000 € وبعد 4 أشهر انخفضت إلى 200 000 €. كم خسرت في المتوسط شهريًا (بالآلاف)؟'), solution: same('$\\frac{200-600}{4-0}=-100$'), answer: { expected: n(100) } },
            { id: 49, difficulty: 'hard', question: say('1 dm-ko karratu baten diagonaleko P puntutik laukizuzen bat sortzen da: $y=x(1-x)$. Kalkulatu azalera $x=\\frac{1}{4}$ denean.', 'Desde un punto P de la diagonal de un cuadrado de 1 dm se forma un rectángulo: $y=x(1-x)$. Calcula el área para $x=\\frac{1}{4}$.', 'من نقطة P على قطر مربع ضلعه 1 دسم يتكوّن مستطيل: $y=x(1-x)$. احسب المساحة عندما $x=\\frac{1}{4}$.'), solution: same('$\\frac{1}{4}\\cdot\\frac{3}{4}=\\frac{3}{16}=0{,}1875$'), answer: { expected: n(3, 16) } },
            { id: 50, difficulty: 'hard', question: say('Zein $x$-rentzat dute 7 cm-ko karratuko bi karratu inskribatuk azalera bera (29 cm²)? Idatzi handiena.', '¿Para qué $x$ tienen dos cuadrados inscritos en el de 7 cm la misma área (29 cm²)? Escribe la mayor.', 'عند أي قيم $x$ يكون لمربعين مرسومين داخل المربع 7 سم المساحة نفسها (29 سم²)؟ اكتب الأكبر.'), solution: say('$2x^2-14x+49=29\\to x^2-7x+10=0\\to x=2$ edo $x=5$. Handiena: 5.', '$2x^2-14x+49=29\\to x^2-7x+10=0\\to x=2$ o $x=5$. La mayor: 5.', '$2x^2-14x+49=29\\to x^2-7x+10=0\\to x=2$ أو $x=5$. الأكبر: 5.'), answer: { expected: n(5) } }
        ]
    }
]

import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseItem, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { bachSystemsChallenges, bachSystemsDiagnostic, bachSystemsExerciseBank, bachSystemsPractice } from '../batx1-zientziak-sistemak/content.ts'
import { integerPoints, linearTerms, objectiveLatex, optimum, pointLatex, systemLatex, vertices, withSigns, type Goal, type HalfPlane, type Objective, type Point } from './lp.ts'
import { programazioaStages, type ProgramazioaStageId } from './stages.ts'

/* ==========================================================================
   Programazio lineala · Batxilergoa 2 · Gizarte Zientziak — diagnostic,
   guided practice, challenges and exercise bank. The half-planes and
   regions come from 1.º Ciencias (imported and renumbered, with the stage
   of this unit); the rest is this unit's own. Most exercises are built
   from a few kinds (where two lines cross, the whole points of a region,
   F at a vertex, the optimum by the vertices, a problem with a context)
   whose answers and worked solutions are worked out by lp.ts, so the
   numbers always agree. The problems follow the style of the Basque exam
   of Matemáticas Aplicadas a las CCSS II.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
const n = (value: number, denominator = 1) => fraction(value, denominator)
const L = (a: number, b: number, c: number, sense: HalfPlane['sense'] = '≤'): HalfPlane => ({ a, b, c, sense })
const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))

const twinDiagnostic = (id: number) => bachSystemsDiagnostic.find((item) => item.id === id)!
const twinPractice = (id: number) => bachSystemsPractice.find((item) => item.id === id)!
const twinChallenge = (id: number) => bachSystemsChallenges.find((item) => item.id === id)!
const twinBank = (id: number) => bachSystemsExerciseBank.flatMap((section) => section.items).find((item) => item.id === id)!

/* ---------- The kinds of exercise ---------- */

interface Built {
    prompt: LocalizedText
    expected: number
    hint: LocalizedText
    explanation: LocalizedText
}

const equation = (h: HalfPlane) => `${linearTerms(h.a, h.b)}=${h.c}`

/** Where two boundary lines cross; asks for x or y */
function cross(first: HalfPlane, second: HalfPlane, ask: 'x' | 'y'): Built {
    const det = first.a * second.b - first.b * second.a
    const x = (first.c * second.b - first.b * second.c) / det
    const y = (first.a * second.c - first.c * second.a) / det
    const system = `\\begin{cases}${equation(first)}\\\\ ${equation(second)}\\end{cases}`
    return {
        prompt: say(`Aurkitu $${equation(first)}$ eta $${equation(second)}$ zuzenen ebaki-puntua. Zenbat da $${ask}$?`, `Halla el corte de $${equation(first)}$ y $${equation(second)}$. ¿Cuánto vale $${ask}$?`, `أوجد تقاطع $${equation(first)}$ و$${equation(second)}$. كم تساوي $${ask}$؟`, `Find where $${equation(first)}$ and $${equation(second)}$ cross. What is $${ask}$?`),
        expected: ask === 'x' ? x : y,
        hint: say('Ebatzi sistema laburketaz.', 'Resuelve el sistema por reducción.', 'حُلّ النظام بالحذف.', 'Solve the system by elimination.'),
        explanation: same(`$${system}\\ \\to\\ x=${x},\\ y=${y}$`)
    }
}

/** The whole points of a region, counted column by column */
function count(constraints: HalfPlane[], size: number): Built {
    const all = withSigns(constraints)
    const points = integerPoints(all, size)
    const columns = Array.from({ length: size + 1 }, (_, x) => points.filter(([px]) => px === x).length).filter((value) => value > 0)
    return {
        prompt: say(`Zenbat puntu oso daude $${systemLatex(constraints)}$ eskualdean ($x,y\\ge 0$)?`, `¿Cuántos puntos enteros hay en la región $${systemLatex(constraints)}$ ($x,y\\ge 0$)?`, `كم نقطة صحيحة في المنطقة $${systemLatex(constraints)}$ ($x,y\\ge 0$)؟`, `How many whole points are there in the region $${systemLatex(constraints)}$ ($x,y\\ge 0$)?`),
        expected: points.length,
        hint: say('Hartu $x$ balio bakoitza eta zenbatu $y$ balioak.', 'Toma cada valor de $x$ y cuenta los de $y$.', 'خذ كل قيمة لـ $x$ وعدّ قيم $y$.', 'Take each value of $x$ and count the values of $y$.'),
        explanation: same(`$${columns.join('+')}=${points.length}$`)
    }
}

/** F at one point */
function valueAt(objective: Objective, point: Point): Built {
    const v = objective.a * point[0] + objective.b * point[1]
    return {
        prompt: say(`Zenbat da $${objectiveLatex(objective)}$ funtzioa $${pointLatex(point)}$ erpinean?`, `¿Cuánto vale $${objectiveLatex(objective)}$ en el vértice $${pointLatex(point)}$?`, `كم تساوي $${objectiveLatex(objective)}$ عند الرأس $${pointLatex(point)}$؟`, `What is $${objectiveLatex(objective)}$ at the vertex $${pointLatex(point)}$?`),
        expected: v,
        hint: say('Ordezkatu $x$ eta $y$.', 'Sustituye $x$ e $y$.', 'عوّض $x$ و$y$.', 'Substitute $x$ and $y$.'),
        explanation: same(`$${objective.a}\\cdot ${bracket(point[0])}+${objective.b}\\cdot ${bracket(point[1])}=${v}$`)
    }
}

/** The values of F at every vertex, as a worked line */
const table = (constraints: HalfPlane[], objective: Objective) => vertices(withSigns(constraints)).map((point) => `F${pointLatex(point)}=${objective.a * point[0] + objective.b * point[1]}`).join(',\\quad ')

/** The optimum by the method of the vertices */
function best(constraints: HalfPlane[], objective: Objective, goal: Goal): Built {
    const found = optimum(withSigns(constraints), objective, goal)
    const verb = goal === 'max' ? say('Maximizatu', 'Maximiza', 'عظّم', 'Maximise') : say('Minimizatu', 'Minimiza', 'صغّر', 'Minimise')
    const asked = goal === 'max' ? say('Zenbat da maximoa?', '¿Cuánto vale el máximo?', 'كم القيمة العظمى؟', 'What is the maximum?') : say('Zenbat da minimoa?', '¿Cuánto vale el mínimo?', 'كم القيمة الصغرى؟', 'What is the minimum?')
    return {
        prompt: say(`${verb.eu} $${objectiveLatex(objective)}$, $${systemLatex(constraints)}$ eta $x,y\\ge 0$ izanik. ${asked.eu}`, `${verb.es} $${objectiveLatex(objective)}$ con $${systemLatex(constraints)}$, $x,y\\ge 0$. ${asked.es}`, `${verb.ar} $${objectiveLatex(objective)}$ مع $${systemLatex(constraints)}$ و$x,y\\ge 0$. ${asked.ar}`, `${verb.en} $${objectiveLatex(objective)}$ with $${systemLatex(constraints)}$, $x,y\\ge 0$. ${asked.en}`),
        expected: found.value!,
        hint: say('Aurkitu erpinak eta kalkulatu $F$ bakoitzean.', 'Halla los vértices y calcula $F$ en cada uno.', 'أوجد الرؤوس واحسب $F$ عند كل منها.', 'Find the vertices and work out $F$ at each one.'),
        explanation: same(`$${table(constraints, objective)}$`)
    }
}

/** A problem with a context: its statement, and the optimum of F */
function problem(statement: LocalizedText, constraints: HalfPlane[], objective: Objective, goal: Goal): Built {
    const found = optimum(withSigns(constraints), objective, goal)
    return {
        prompt: statement,
        expected: found.value!,
        hint: say('Idatzi murrizketak eta $F$; gero, erpinak.', 'Escribe las restricciones y $F$; después, los vértices.', 'اكتب القيود و$F$؛ ثم الرؤوس.', 'Write the constraints and $F$; then the vertices.'),
        explanation: same(`$${table(constraints, objective)}$`)
    }
}

const practice = (stage: ProgramazioaStageId, built: Built): Omit<PracticeItem, 'id'> => ({ stage, prompt: built.prompt, expected: n(built.expected), hint: built.hint, explanation: built.explanation })
const challenge = (stage: ProgramazioaStageId, points: number, built: Built): Omit<ChallengeItem, 'id'> => ({ ...practice(stage, built), points, context: points === 10 ? 'starter' : points === 20 ? 'advanced' : 'master' })
const bank = (difficulty: ExerciseItem['difficulty'], built: Built): Omit<ExerciseItem, 'id'> => ({ difficulty, question: built.prompt, solution: built.explanation, answer: { expected: n(built.expected) } })

/* ---------- Diagnostic ---------- */

export const programazioaDiagnostic: DiagnosticQuestion[] = [
    { ...twinDiagnostic(113008), id: 144001, topic: 'half-plane-regions' },
    {
        id: 144002,
        prompt: say('$x$ eta $y$ bi produktuen kiloak dira. «Ez gehiago 20 kilo baino guztira.» Zein da murrizketa?', '$x$ e $y$ son los kilos de dos productos. «No más de 20 kilos en total.» ¿Cuál es la restricción?', '$x$ و$y$ كيلوغرامات منتجين. «لا أكثر من 20 كيلوغرامًا إجمالًا.» ما القيد؟', '$x$ and $y$ are the kilos of two products. «No more than 20 kilos in total.» What is the constraint?'),
        options: [same('$x+y\\ge 20$'), same('$x+y\\le 20$'), same('$x+y=20$')],
        correctIndex: 1,
        explanation: say('«Ez gehiago» $\\le$ da.', '«No más de» es $\\le$.', '«لا أكثر من» هي $\\le$.', '«No more than» is $\\le$.'),
        topic: 'constraints'
    },
    {
        id: 144003,
        prompt: say('Zer da eskualde bideragarriaren erpin bat?', '¿Qué es un vértice de la región factible?', 'ما رأس المنطقة الممكنة؟', 'What is a vertex of the feasible region?'),
        options: [say('Eskualdean dagoen bi muga-zuzenen ebaki-puntua', 'Un corte de dos rectas frontera que está en la región', 'تقاطع مستقيمين حدّيين يقع في المنطقة', 'A crossing of two boundary lines that is in the region'), say('Eskualdearen erdiko puntua', 'El punto del centro de la región', 'النقطة الوسطى للمنطقة', 'The point in the middle of the region'), say('Zuzenen edozein ebaki-puntu', 'Cualquier corte de las rectas', 'أي تقاطع للمستقيمات', 'Any crossing of the lines')],
        correctIndex: 0,
        explanation: say('Ebaki-puntuak murrizketa guztiak bete behar ditu.', 'El corte tiene que cumplir todas las restricciones.', 'يجب أن يحقق التقاطع كل القيود.', 'The crossing must satisfy every constraint.'),
        topic: 'vertices'
    },
    {
        id: 144004,
        prompt: say('Zenbat puntu oso daude $x\\le 1$, $y\\le 1$, $x\\ge 0$ eta $y\\ge 0$ eskualdean?', '¿Cuántos puntos enteros hay en $x\\le 1$, $y\\le 1$, $x\\ge 0$, $y\\ge 0$?', 'كم نقطة صحيحة في $x\\le 1$ و$y\\le 1$ و$x\\ge 0$ و$y\\ge 0$؟', 'How many whole points are there in $x\\le 1$, $y\\le 1$, $x\\ge 0$, $y\\ge 0$?'),
        options: [same('$1$'), same('$2$'), same('$4$')],
        correctIndex: 2,
        explanation: same('$(0,0),\\ (1,0),\\ (0,1),\\ (1,1)$'),
        topic: 'integer-points'
    },
    {
        id: 144005,
        prompt: say('Nolakoak dira $2x+3y=k$ zuzenak, $k$ aldatzean?', '¿Cómo son las rectas $2x+3y=k$ al cambiar $k$?', 'كيف تكون المستقيمات $2x+3y=k$ عند تغيير $k$؟', 'What are the lines $2x+3y=k$ like as $k$ changes?'),
        options: [say('Ebakitzaileak', 'Secantes', 'متقاطعة', 'They cross'), say('Paraleloak', 'Paralelas', 'متوازية', 'Parallel'), say('Perpendikularrak', 'Perpendiculares', 'متعامدة', 'Perpendicular')],
        correctIndex: 1,
        explanation: say('Malda bera dute: $k$ bakarrik aldatzen da.', 'Tienen la misma pendiente: solo cambia $k$.', 'لها الميل نفسه: تتغير $k$ فقط.', 'They have the same slope: only $k$ changes.'),
        topic: 'level-lines'
    },
    {
        id: 144006,
        prompt: say('Programazio lineal batean, non dago optimoa?', 'En programación lineal, ¿dónde está el óptimo?', 'في البرمجة الخطية، أين القيمة المثلى؟', 'In linear programming, where is the optimum?'),
        options: [say('Erpin batean (edo alde oso batean)', 'En un vértice (o en todo un lado)', 'عند رأس (أو على ضلع كامل)', 'At a vertex (or along a whole side)'), say('Eskualdearen erdian', 'En el centro de la región', 'في وسط المنطقة', 'In the middle of the region'), say('Jatorrian beti', 'Siempre en el origen', 'دائمًا في المبدأ', 'Always at the origin')],
        correctIndex: 0,
        explanation: say('Maila-zuzenak eskualdea izkina batean uzten du.', 'La recta de nivel deja la región por una esquina.', 'يغادر مستقيم المستوى المنطقة من زاوية.', 'The level line leaves the region at a corner.'),
        topic: 'vertex-method'
    },
    {
        id: 144007,
        prompt: say('Bi erpinek $F$ balio maximo bera ematen dute. Nolakoa da soluzioa?', 'Dos vértices dan el mismo valor máximo de $F$. ¿Cómo es la solución?', 'يعطي رأسان القيمة العظمى نفسها لـ $F$. كيف يكون الحل؟', 'Two vertices give the same largest value of $F$. What is the solution like?'),
        options: [say('Ez dago soluziorik', 'No hay solución', 'لا حل', 'There is no solution'), say('Bakarra', 'Única', 'وحيد', 'Unique'), say('Anitza: haien arteko alde osoa', 'Múltiple: todo el lado entre ellos', 'متعدد: الضلع كله بينهما', 'Multiple: the whole side between them')],
        correctIndex: 2,
        explanation: say('$F$ alde horren paraleloa da.', '$F$ es paralela a ese lado.', '$F$ موازية لذلك الضلع.', '$F$ is parallel to that side.'),
        topic: 'solution-types'
    },
    {
        id: 144008,
        prompt: say('Erpinak: $(0,0)$, $(4,0)$, $(2,2)$ eta $(0,3)$. Zenbat da $F=2x+3y$ funtzioaren maximoa?', 'Vértices: $(0,0)$, $(4,0)$, $(2,2)$ y $(0,3)$. ¿Cuánto vale el máximo de $F=2x+3y$?', 'الرؤوس: $(0,0)$ و$(4,0)$ و$(2,2)$ و$(0,3)$. كم القيمة العظمى لـ $F=2x+3y$؟', 'Vertices: $(0,0)$, $(4,0)$, $(2,2)$ and $(0,3)$. What is the maximum of $F=2x+3y$?'),
        options: [same('$9$'), same('$8$'), same('$10$')],
        correctIndex: 2,
        explanation: same('$F(4,0)=8,\\quad F(2,2)=10,\\quad F(0,3)=9$'),
        topic: 'max-profit'
    }
]

/* ---------- Guided practice: four per stage ---------- */

const ownPractice: Array<Omit<PracticeItem, 'id'>> = [
    practice('feasible', cross(L(1, 1, 7), L(2, 1, 10), 'x')),
    practice('feasible', cross(L(1, 2, 10), L(3, 1, 15), 'y')),
    practice('feasible', count([L(1, 1, 3)], 5)),
    practice('feasible', count([L(2, 1, 6), L(0, 1, 2)], 6)),
    practice('objective', valueAt({ a: 3, b: 4 }, [2, 5])),
    practice('objective', valueAt({ a: 5, b: 2 }, [6, 1])),
    practice('objective', best([L(1, 1, 4), L(1, 0, 3)], { a: 2, b: 1 }, 'max')),
    practice('objective', best([L(1, 2, 8), L(1, 0, 4)], { a: 1, b: 3 }, 'max')),
    {
        stage: 'cases',
        prompt: say('$x+y\\le 6$, $x\\le 5$ eta $y\\le 4$ eskualdean ($x,y\\ge 0$), zenbat erpinetan da maximoa $F=x+y$ funtzioa?', 'En la región $x+y\\le 6$, $x\\le 5$, $y\\le 4$ ($x,y\\ge 0$), ¿en cuántos vértices es máxima $F=x+y$?', 'في المنطقة $x+y\\le 6$ و$x\\le 5$ و$y\\le 4$ ($x,y\\ge 0$)، عند كم رأسًا تكون $F=x+y$ عظمى؟', 'In the region $x+y\\le 6$, $x\\le 5$, $y\\le 4$ ($x,y\\ge 0$), at how many vertices is $F=x+y$ greatest?'),
        expected: n(2),
        hint: say('$F$ funtzioa $x+y=6$ aldearen paraleloa da.', '$F$ es paralela al lado $x+y=6$.', '$F$ موازية للضلع $x+y=6$.', '$F$ is parallel to the side $x+y=6$.'),
        explanation: same('$F(5,1)=5+1=6,\\quad F(2,4)=2+4=6\\ \\to\\ 2$')
    },
    {
        stage: 'cases',
        prompt: say('Zein $a$ baliotarako da $F=ax+y$ paraleloa $2x+y\\le 8$ aldearen?', '¿Para qué $a$ es $F=ax+y$ paralela al lado $2x+y\\le 8$?', 'لأي $a$ تكون $F=ax+y$ موازية للضلع $2x+y\\le 8$؟', 'For which $a$ is $F=ax+y$ parallel to the side $2x+y\\le 8$?'),
        expected: n(2),
        hint: say('Paraleloak: koefiziente berdinak (edo proportzionalak).', 'Paralelas: los mismos coeficientes (o proporcionales).', 'متوازيان: المعاملات نفسها (أو متناسبة).', 'Parallel: the same coefficients (or proportional ones).'),
        explanation: same('$\\frac{a}{2}=\\frac{1}{1}\\ \\to\\ a=2$')
    },
    practice('cases', best([L(1, 1, 3, '≥'), L(1, 2, 4, '≥')], { a: 2, b: 3 }, 'min')),
    {
        stage: 'cases',
        prompt: say('$x+y\\le 4$ eta $x+y\\ge 6$ eskualdean, zenbat puntu daude?', '¿Cuántos puntos tiene la región $x+y\\le 4$, $x+y\\ge 6$?', 'كم نقطة في المنطقة $x+y\\le 4$ و$x+y\\ge 6$؟', 'How many points does the region $x+y\\le 4$, $x+y\\ge 6$ have?'),
        expected: n(0),
        hint: say('Batura ezin da aldi berean 4 baino txikiagoa eta 6 baino handiagoa izan.', 'La suma no puede ser a la vez menor que 4 y mayor que 6.', 'لا يمكن أن يكون المجموع أصغر من 4 وأكبر من 6 معًا.', 'The sum cannot be less than 4 and more than 6 at once.'),
        explanation: say('Eskualdea hutsik dago: 0 puntu, eta ez dago soluziorik.', 'La región está vacía: 0 puntos y no hay solución.', 'المنطقة خالية: 0 نقطة ولا حل.', 'The region is empty: 0 points and no solution.')
    },
    practice('problems', problem(say('Denda batek $x$ kilo sagar eta $y$ kilo madari saltzen ditu: $x+y\\le 50$ eta $x\\le 30$. Sagarrak 2 euro uzten ditu, eta madariak 3 euro. Zenbat da irabazi handiena?', 'Una tienda vende $x$ kilos de manzanas e $y$ de peras: $x+y\\le 50$ y $x\\le 30$. La manzana deja 2 € y la pera, 3 €. ¿Cuál es el beneficio máximo?', 'يبيع متجر $x$ كيلوغرام تفاح و$y$ كيلوغرام إجاص: $x+y\\le 50$ و$x\\le 30$. يترك التفاح 2 € والإجاص 3 €. ما أكبر ربح؟', 'A shop sells $x$ kilos of apples and $y$ of pears: $x+y\\le 50$ and $x\\le 30$. Apples leave €2 and pears €3. What is the greatest profit?'), [L(1, 1, 50), L(1, 0, 30)], { a: 2, b: 3 }, 'max')),
    practice('problems', problem(say('Bi pentsu: $x+y\\ge 6$ eta $x+2y\\ge 8$ ($x,y$ kiloak). Kostua $F=4x+5y$ eurotan. Zenbat da kostu txikiena?', 'Dos piensos: $x+y\\ge 6$ y $x+2y\\ge 8$ ($x,y$ en kilos). El coste es $F=4x+5y$ euros. ¿Cuál es el coste mínimo?', 'علفان: $x+y\\ge 6$ و$x+2y\\ge 8$ ($x,y$ بالكيلوغرام). الكلفة $F=4x+5y$ يورو. ما أقل كلفة؟', 'Two feeds: $x+y\\ge 6$ and $x+2y\\ge 8$ ($x,y$ in kilos). The cost is $F=4x+5y$ euros. What is the least cost?'), [L(1, 1, 6, '≥'), L(1, 2, 8, '≥')], { a: 4, b: 5 }, 'min')),
    practice('problems', problem(say('Bi produktu: $2x+y\\le 12$ eta $x+3y\\le 21$ ordu. Irabazia $F=3x+4y$ eurotan. Zenbat da irabazi handiena?', 'Dos productos: $2x+y\\le 12$ y $x+3y\\le 21$ horas. El beneficio es $F=3x+4y$ euros. ¿Cuál es el beneficio máximo?', 'منتجان: $2x+y\\le 12$ و$x+3y\\le 21$ ساعة. الربح $F=3x+4y$ يورو. ما أكبر ربح؟', 'Two products: $2x+y\\le 12$ and $x+3y\\le 21$ hours. The profit is $F=3x+4y$ euros. What is the greatest profit?'), [L(2, 1, 12), L(1, 3, 21)], { a: 3, b: 4 }, 'max')),
    practice('problems', problem(say('Garraioa: bi kamioi motak, $x+y\\ge 4$ eta $2x+y\\ge 6$. Kostua $F=5x+3y$ (ehunka euro). Zenbat da kostu txikiena?', 'Transporte: dos tipos de camión, $x+y\\ge 4$ y $2x+y\\ge 6$. El coste es $F=5x+3y$ (cientos de euros). ¿Cuál es el coste mínimo?', 'النقل: نوعان من الشاحنات، $x+y\\ge 4$ و$2x+y\\ge 6$. الكلفة $F=5x+3y$ (مئات اليوروهات). ما أقل كلفة؟', 'Transport: two kinds of lorry, $x+y\\ge 4$ and $2x+y\\ge 6$. The cost is $F=5x+3y$ (hundreds of euros). What is the least cost?'), [L(1, 1, 4, '≥'), L(2, 1, 6, '≥')], { a: 5, b: 3 }, 'min'))
]

export const programazioaPractice: PracticeItem[] = [
    ...[17, 18, 19, 20].map((id) => ({ ...twinPractice(id), stage: 'regions' })),
    ...ownPractice
].map((item, index) => ({ ...item, id: index + 1 }))

/* ---------- Challenges: three per stage ---------- */

const ownChallenges: Array<Omit<ChallengeItem, 'id'>> = [
    challenge('feasible', 10, cross(L(1, 1, 9), L(1, 3, 15), 'y')),
    challenge('feasible', 20, count([L(1, 1, 5), L(1, 0, 3)], 6)),
    {
        stage: 'feasible',
        points: 30,
        context: 'master',
        prompt: say('Zenbat erpin ditu $x+y\\le 8$, $x\\le 6$, $y\\le 5$, $x\\ge 0$ eta $y\\ge 0$ eskualdeak?', '¿Cuántos vértices tiene la región $x+y\\le 8$, $x\\le 6$, $y\\le 5$, $x\\ge 0$, $y\\ge 0$?', 'كم رأسًا للمنطقة $x+y\\le 8$ و$x\\le 6$ و$y\\le 5$ و$x\\ge 0$ و$y\\ge 0$؟', 'How many vertices does the region $x+y\\le 8$, $x\\le 6$, $y\\le 5$, $x\\ge 0$, $y\\ge 0$ have?'),
        expected: n(5),
        hint: say('Izkina bat moztuta duen laukizuzen bat da.', 'Es un rectángulo con una esquina cortada.', 'إنه مستطيل قُطعت إحدى زواياه.', 'It is a rectangle with one corner cut off.'),
        explanation: same('$(0,0),\\ (6,0),\\ (6,2),\\ (3,5),\\ (0,5)\\ \\to\\ 5$')
    },
    challenge('objective', 10, valueAt({ a: 4, b: 7 }, [3, 2])),
    challenge('objective', 20, best([L(2, 1, 8), L(1, 1, 5)], { a: 3, b: 2 }, 'max')),
    challenge('objective', 30, best([L(1, 1, 10), L(1, 4, 16)], { a: 1, b: 2 }, 'max')),
    {
        stage: 'cases',
        points: 10,
        context: 'starter',
        prompt: say('Bi erpinek $F$ balio maximo bera ematen dute: 12. Zenbat da maximoa alde horretako erdiko puntuan?', 'Dos vértices dan el mismo máximo de $F$: 12. ¿Cuánto vale $F$ en el punto medio de ese lado?', 'يعطي رأسان القيمة العظمى نفسها لـ $F$: 12. كم تساوي $F$ في منتصف ذلك الضلع؟', 'Two vertices give the same largest value of $F$: 12. What is $F$ at the midpoint of that side?'),
        expected: n(12),
        hint: say('Alde osoa da soluzioa.', 'Todo el lado es solución.', 'الضلع كله حل.', 'The whole side is a solution.'),
        explanation: say('Soluzio anitza: alde osoan $F=12$.', 'Solución múltiple: en todo el lado $F=12$.', 'حل متعدد: على الضلع كله $F=12$.', 'Multiple solution: along the whole side $F=12$.')
    },
    {
        stage: 'cases',
        points: 20,
        context: 'advanced',
        prompt: say('$x+y\\le 6$, $x\\le 4$ eskualdean ($x,y\\ge 0$), zein $b$ baliotarako da anitza $F=2x+by$ funtzioaren maximoa?', 'En la región $x+y\\le 6$, $x\\le 4$ ($x,y\\ge 0$), ¿para qué $b$ es múltiple el máximo de $F=2x+by$?', 'في المنطقة $x+y\\le 6$ و$x\\le 4$ ($x,y\\ge 0$)، لأي $b$ تكون القيمة العظمى لـ $F=2x+by$ متعددة؟', 'In the region $x+y\\le 6$, $x\\le 4$ ($x,y\\ge 0$), for which $b$ is the maximum of $F=2x+by$ multiple?'),
        expected: n(2),
        hint: say('$F$ paraleloa izan behar da $x+y=6$ aldearen.', '$F$ tiene que ser paralela al lado $x+y=6$.', 'يجب أن تكون $F$ موازية للضلع $x+y=6$.', '$F$ must be parallel to the side $x+y=6$.'),
        explanation: same('$\\frac{2}{1}=\\frac{b}{1}\\ \\to\\ b=2\\qquad F(4,2)=F(0,6)=12$')
    },
    challenge('cases', 30, best([L(1, 1, 5, '≥'), L(1, 3, 9, '≥'), L(0, 1, 6)], { a: 3, b: 4 }, 'min')),
    challenge('problems', 10, problem(say('$x+y\\le 20$ eta $y\\le 12$ ($x,y\\ge 0$). Irabazia $F=10x+15y$ eurotan. Zenbat da maximoa?', '$x+y\\le 20$ e $y\\le 12$ ($x,y\\ge 0$). El beneficio es $F=10x+15y$ euros. ¿Cuál es el máximo?', '$x+y\\le 20$ و$y\\le 12$ ($x,y\\ge 0$). الربح $F=10x+15y$ يورو. ما القيمة العظمى؟', '$x+y\\le 20$ and $y\\le 12$ ($x,y\\ge 0$). The profit is $F=10x+15y$ euros. What is the maximum?'), [L(1, 1, 20), L(0, 1, 12)], { a: 10, b: 15 }, 'max')),
    challenge('problems', 20, problem(say('Dieta: $x+2y\\ge 10$ eta $3x+y\\ge 15$ unitate. Kostua $F=2x+3y$ eurotan. Zenbat da minimoa?', 'Dieta: $x+2y\\ge 10$ y $3x+y\\ge 15$ unidades. El coste es $F=2x+3y$ euros. ¿Cuál es el mínimo?', 'نظام غذائي: $x+2y\\ge 10$ و$3x+y\\ge 15$ وحدة. الكلفة $F=2x+3y$ يورو. ما القيمة الصغرى؟', 'Diet: $x+2y\\ge 10$ and $3x+y\\ge 15$ units. The cost is $F=2x+3y$ euros. What is the minimum?'), [L(1, 2, 10, '≥'), L(3, 1, 15, '≥')], { a: 2, b: 3 }, 'min')),
    challenge('problems', 30, problem(say('Enpresa batek gehienez 80 lepoko ($x$) eta eskumuturreko ($y$) egin ditzake, eta $x+2y\\le 120$ gramo urre ditu. Lepoko batek 30 euro uzten ditu, eta eskumuturreko batek 40 euro. Zenbat da irabazi handiena?', 'Una empresa puede hacer como mucho 80 collares ($x$) y pulseras ($y$), y tiene $x+2y\\le 120$ gramos de oro. Cada collar deja 30 € y cada pulsera, 40 €. ¿Cuál es el beneficio máximo?', 'يمكن لشركة أن تصنع 80 قلادة ($x$) وسوارًا ($y$) على الأكثر، ولديها $x+2y\\le 120$ غرامًا من الذهب. تترك القلادة 30 € والسوار 40 €. ما أكبر ربح؟', 'A company can make at most 80 necklaces ($x$) and bracelets ($y$), and has $x+2y\\le 120$ grams of gold. Each necklace leaves €30 and each bracelet €40. What is the greatest profit?'), [L(1, 1, 80), L(1, 2, 120)], { a: 30, b: 40 }, 'max'))
]

export const programazioaChallenges: ChallengeItem[] = [
    ...[113, 114, 115].map((id) => ({ ...twinChallenge(id), stage: 'regions' })),
    ...ownChallenges
].map((item, index) => ({ ...item, id: 101 + index }))

/* ---------- Exercise bank: ten per stage ---------- */

const ownSections: Record<Exclude<ProgramazioaStageId, 'regions'>, Array<Omit<ExerciseItem, 'id'>>> = {
    feasible: [
        bank('easy', cross(L(1, 1, 4), L(1, -1, 2), 'x')),
        bank('easy', cross(L(1, 2, 6), L(1, 0, 2), 'y')),
        bank('easy', count([L(1, 1, 2)], 4)),
        bank('medium', cross(L(2, 1, 11), L(1, 2, 10), 'x')),
        bank('medium', cross(L(3, 2, 18), L(1, 1, 7), 'y')),
        bank('medium', count([L(1, 1, 4), L(1, 0, 2)], 5)),
        bank('medium', count([L(2, 1, 8), L(0, 1, 1, '≥')], 6)),
        bank('hard', count([L(1, 2, 8), L(1, 1, 5)], 8)),
        bank('hard', cross(L(4, 3, 24), L(1, 1, 7), 'x')),
        {
            difficulty: 'hard',
            question: say('Aurkitu $x+y\\le 7$, $x+3y\\le 15$, $x\\ge 0$ eta $y\\ge 0$ eskualdearen erpinak.', 'Halla los vértices de la región $x+y\\le 7$, $x+3y\\le 15$, $x\\ge 0$, $y\\ge 0$.', 'أوجد رؤوس المنطقة $x+y\\le 7$ و$x+3y\\le 15$ و$x\\ge 0$ و$y\\ge 0$.', 'Find the vertices of the region $x+y\\le 7$, $x+3y\\le 15$, $x\\ge 0$, $y\\ge 0$.'),
            solution: same('$(0,0),\\ (7,0),\\ (3,4),\\ (0,5)\\qquad 3+4=7,\\quad 3+3\\cdot 4=15$')
        }
    ],
    objective: [
        bank('easy', valueAt({ a: 2, b: 5 }, [4, 3])),
        bank('easy', valueAt({ a: 6, b: 1 }, [2, 7])),
        bank('easy', valueAt({ a: 10, b: 20 }, [5, 3])),
        bank('medium', best([L(1, 1, 6), L(2, 1, 8)], { a: 3, b: 2 }, 'max')),
        bank('medium', best([L(1, 2, 10), L(1, 0, 6)], { a: 1, b: 1 }, 'max')),
        bank('medium', best([L(1, 1, 3, '≥'), L(0, 1, 5), L(1, 0, 5)], { a: 2, b: 1 }, 'min')),
        bank('medium', best([L(3, 1, 12), L(1, 1, 6)], { a: 4, b: 3 }, 'max')),
        bank('hard', best([L(1, 1, 8), L(1, 3, 18), L(1, 0, 6)], { a: 2, b: 5 }, 'max')),
        bank('hard', best([L(2, 1, 10, '≥'), L(1, 2, 11, '≥')], { a: 3, b: 4 }, 'min')),
        {
            difficulty: 'hard',
            question: say('Azaldu zergatik ezin den optimoa eskualdearen barruko puntu batean bakarrik egon.', 'Explica por qué el óptimo no puede estar solo en un punto del interior de la región.', 'اشرح لماذا لا يمكن أن تكون القيمة المثلى في نقطة داخلية فقط.', 'Explain why the optimum cannot be only at a point inside the region.'),
            solution: say('Barruko puntu batetik, maila-zuzena paraleloan mugi daiteke $F$ hobetuz, eskualdetik atera gabe: beraz, ez zen optimoa.', 'Desde un punto interior la recta de nivel se puede desplazar en paralelo mejorando $F$ sin salir de la región: así que no era el óptimo.', 'من نقطة داخلية يمكن تحريك مستقيم المستوى موازيًا مع تحسين $F$ دون الخروج من المنطقة: إذن لم تكن القيمة المثلى.', 'From an inside point the level line can move parallel, improving $F$, without leaving the region: so it was not the optimum.')
        }
    ],
    cases: [
        {
            difficulty: 'easy',
            question: say('Ba al du soluziorik $x+y\\le 2$, $x\\ge 3$, $y\\ge 0$ eskualdeko problema batek?', '¿Tiene solución un problema con la región $x+y\\le 2$, $x\\ge 3$, $y\\ge 0$?', 'هل لمسألة منطقتها $x+y\\le 2$ و$x\\ge 3$ و$y\\ge 0$ حل؟', 'Does a problem with the region $x+y\\le 2$, $x\\ge 3$, $y\\ge 0$ have a solution?'),
            solution: say('Ez: $x\\ge 3$ bada, $x+y\\ge 3>2$. Eskualdea hutsik dago.', 'No: si $x\\ge 3$, $x+y\\ge 3>2$. La región está vacía.', 'لا: إذا كان $x\\ge 3$ فإن $x+y\\ge 3>2$. المنطقة خالية.', 'No: if $x\\ge 3$, $x+y\\ge 3>2$. The region is empty.')
        },
        {
            difficulty: 'easy',
            question: say('Ba al du minimorik $F=x+y$ funtzioak $x+y\\ge 4$ eskualdean ($x,y\\ge 0$)? Zenbat?', '¿Tiene mínimo $F=x+y$ en la región $x+y\\ge 4$ ($x,y\\ge 0$)? ¿Cuál?', 'هل لـ $F=x+y$ قيمة صغرى في المنطقة $x+y\\ge 4$ ($x,y\\ge 0$)؟ كم هي؟', 'Does $F=x+y$ have a minimum in the region $x+y\\ge 4$ ($x,y\\ge 0$)? What is it?'),
            solution: say('Bai: 4, $x+y=4$ alde osoan (soluzio anitza). Maximorik ez dago.', 'Sí: 4, en todo el lado $x+y=4$ (solución múltiple). Máximo no hay.', 'نعم: 4 على الضلع كله $x+y=4$ (حل متعدد). ولا قيمة عظمى.', 'Yes: 4, along the whole side $x+y=4$ (multiple solution). There is no maximum.'),
            answer: { expected: n(4) }
        },
        bank('easy', best([L(1, 1, 5), L(1, 0, 3)], { a: 1, b: 1 }, 'max')),
        bank('medium', best([L(2, 1, 10), L(0, 1, 6)], { a: 2, b: 1 }, 'max')),
        {
            difficulty: 'medium',
            question: say('$x+2y\\le 10$, $x\\le 6$ eskualdean ($x,y\\ge 0$), zein $a$ baliotarako da anitza $F=ax+2y$ funtzioaren maximoa?', 'En la región $x+2y\\le 10$, $x\\le 6$ ($x,y\\ge 0$), ¿para qué $a$ es múltiple el máximo de $F=ax+2y$?', 'في المنطقة $x+2y\\le 10$ و$x\\le 6$ ($x,y\\ge 0$)، لأي $a$ تكون القيمة العظمى لـ $F=ax+2y$ متعددة؟', 'In the region $x+2y\\le 10$, $x\\le 6$ ($x,y\\ge 0$), for which $a$ is the maximum of $F=ax+2y$ multiple?'),
            solution: same('$\\frac{a}{1}=\\frac{2}{2}\\ \\to\\ a=1\\qquad F(6,2)=F(0,5)=10$'),
            answer: { expected: n(1) }
        },
        {
            difficulty: 'medium',
            question: say('Ba al du maximorik $F=3x+y$ funtzioak $x+y\\ge 2$, $y\\le 4$ eskualdean ($x,y\\ge 0$)?', '¿Tiene máximo $F=3x+y$ en la región $x+y\\ge 2$, $y\\le 4$ ($x,y\\ge 0$)?', 'هل لـ $F=3x+y$ قيمة عظمى في المنطقة $x+y\\ge 2$ و$y\\le 4$ ($x,y\\ge 0$)؟', 'Does $F=3x+y$ have a maximum in the region $x+y\\ge 2$, $y\\le 4$ ($x,y\\ge 0$)?'),
            solution: say('Ez: eskualdea eskuinera irekita dago, eta $x$ handitzean $F$ ere bai.', 'No: la región está abierta a la derecha y al crecer $x$ crece $F$.', 'لا: المنطقة مفتوحة يمينًا وعندما تكبر $x$ تكبر $F$.', 'No: the region is open to the right and $F$ grows as $x$ grows.')
        },
        bank('medium', best([L(1, 1, 2, '≥'), L(0, 1, 4)], { a: 3, b: 1 }, 'min')),
        bank('hard', best([L(1, 1, 4, '≥'), L(2, 1, 6, '≥'), L(1, 0, 5)], { a: 1, b: 1 }, 'min')),
        {
            difficulty: 'hard',
            question: say('Erpinak: $(0,0)$, $(6,0)$, $(4,3)$ eta $(0,5)$. Bilatu $F=ax+2y$ funtzio bat, maximoa $(6,0)$ eta $(4,3)$ artean anitza izan dadin.', 'Vértices: $(0,0)$, $(6,0)$, $(4,3)$ y $(0,5)$. Busca $F=ax+2y$ para que el máximo sea múltiple entre $(6,0)$ y $(4,3)$.', 'الرؤوس: $(0,0)$ و$(6,0)$ و$(4,3)$ و$(0,5)$. ابحث عن $F=ax+2y$ لتكون القيمة العظمى متعددة بين $(6,0)$ و$(4,3)$.', 'Vertices: $(0,0)$, $(6,0)$, $(4,3)$ and $(0,5)$. Find $F=ax+2y$ so that the maximum is multiple between $(6,0)$ and $(4,3)$.'),
            solution: same('$6a=4a+6\\ \\to\\ a=3\\qquad F(6,0)=F(4,3)=18$'),
            answer: { expected: n(3) }
        },
        {
            difficulty: 'hard',
            question: say('Azaldu zergatik dagoen minimoa dieta-problema batean, eskualdea gorantz irekita egon arren.', 'Explica por qué existe el mínimo en un problema de dieta aunque la región esté abierta hacia arriba.', 'اشرح لماذا توجد القيمة الصغرى في مسألة نظام غذائي رغم أن المنطقة مفتوحة إلى الأعلى.', 'Explain why the minimum exists in a diet problem even though the region is open upwards.'),
            solution: say('Kostua txikiagotzeko, maila-zuzena jatorrira mugitzen da, eta alde horretan eskualdea ixten da: azken puntua erpin bat da.', 'Para bajar el coste la recta de nivel va hacia el origen, y por ese lado la región se cierra: el último punto es un vértice.', 'لتقليل الكلفة يتجه مستقيم المستوى نحو المبدأ، ومن تلك الجهة تنغلق المنطقة: آخر نقطة رأس.', 'To lower the cost the level line moves towards the origin, and on that side the region closes: the last point is a vertex.')
        }
    ],
    problems: [
        bank('easy', problem(say('$x+y\\le 10$ eta $x\\le 6$ ($x,y\\ge 0$). Irabazia $F=5x+4y$. Zenbat da maximoa?', '$x+y\\le 10$ y $x\\le 6$ ($x,y\\ge 0$). El beneficio es $F=5x+4y$. ¿Cuál es el máximo?', '$x+y\\le 10$ و$x\\le 6$ ($x,y\\ge 0$). الربح $F=5x+4y$. ما القيمة العظمى؟', '$x+y\\le 10$ and $x\\le 6$ ($x,y\\ge 0$). The profit is $F=5x+4y$. What is the maximum?'), [L(1, 1, 10), L(1, 0, 6)], { a: 5, b: 4 }, 'max')),
        bank('easy', problem(say('Kostua $F=2x+y$, $x+y\\ge 5$ eta $y\\le 3$ izanik ($x,y\\ge 0$). Zenbat da minimoa?', 'El coste es $F=2x+y$ con $x+y\\ge 5$ e $y\\le 3$ ($x,y\\ge 0$). ¿Cuál es el mínimo?', 'الكلفة $F=2x+y$ مع $x+y\\ge 5$ و$y\\le 3$ ($x,y\\ge 0$). ما القيمة الصغرى؟', 'The cost is $F=2x+y$ with $x+y\\ge 5$ and $y\\le 3$ ($x,y\\ge 0$). What is the minimum?'), [L(1, 1, 5, '≥'), L(0, 1, 3)], { a: 2, b: 1 }, 'min')),
        {
            difficulty: 'easy',
            question: say('Idatzi murrizketak: «gehienez 60 ordu; A produktuak 2 ordu eta B produktuak 3 ordu behar ditu; gutxienez 10 A».', 'Escribe las restricciones: «como mucho 60 horas; el producto A necesita 2 horas y el B, 3; al menos 10 de A».', 'اكتب القيود: «60 ساعة على الأكثر؛ يحتاج المنتج A ساعتين وB ثلاث ساعات؛ 10 من A على الأقل».', 'Write the constraints: «at most 60 hours; product A needs 2 hours and B 3; at least 10 of A».'),
            solution: same('$2x+3y\\le 60,\\quad x\\ge 10,\\quad y\\ge 0$')
        },
        bank('medium', problem(say('Okindegi batek $x$ ogi eta $y$ opil egiten ditu: $x+y\\le 40$ eta $x+2y\\le 60$ kilo irin. Irabazia $F=2x+3y$ da (hamarnaka zentimo). Zenbat da maximoa?', 'Una panadería hace $x$ panes e $y$ bollos: $x+y\\le 40$ y $x+2y\\le 60$ kilos de harina. El beneficio es $F=2x+3y$ (decenas de céntimos). ¿Cuál es el máximo?', 'يصنع مخبز $x$ رغيفًا و$y$ كعكة: $x+y\\le 40$ و$x+2y\\le 60$ كيلوغرامًا من الطحين. الربح $F=2x+3y$ (عشرات السنتات). ما القيمة العظمى؟', 'A bakery makes $x$ loaves and $y$ buns: $x+y\\le 40$ and $x+2y\\le 60$ kilos of flour. The profit is $F=2x+3y$ (tens of cents). What is the maximum?'), [L(1, 1, 40), L(1, 2, 60)], { a: 2, b: 3 }, 'max')),
        bank('medium', problem(say('Bi lantegi: $x+y\\ge 8$ eta $x+3y\\ge 12$ unitate. Kostua $F=3x+5y$. Zenbat da kostu txikiena?', 'Dos talleres: $x+y\\ge 8$ y $x+3y\\ge 12$ unidades. El coste es $F=3x+5y$. ¿Cuál es el coste mínimo?', 'ورشتان: $x+y\\ge 8$ و$x+3y\\ge 12$ وحدة. الكلفة $F=3x+5y$. ما أقل كلفة؟', 'Two workshops: $x+y\\ge 8$ and $x+3y\\ge 12$ units. The cost is $F=3x+5y$. What is the least cost?'), [L(1, 1, 8, '≥'), L(1, 3, 12, '≥')], { a: 3, b: 5 }, 'min')),
        bank('medium', problem(say('Inbertsioa: gehienez 12 mila euro bi funtsetan, eta B funtsean gehienez 8 mila. Errentagarritasuna $F=4x+6y$ (ehunka euro). Zenbat da maximoa?', 'Inversión: como mucho 12 mil euros en dos fondos, y en el B como mucho 8 mil. La rentabilidad es $F=4x+6y$ (cientos de euros). ¿Cuál es el máximo?', 'استثمار: 12 ألف يورو على الأكثر في صندوقين، وفي B ثمانية آلاف على الأكثر. العائد $F=4x+6y$ (مئات اليوروهات). ما القيمة العظمى؟', 'Investment: at most 12 thousand euros in two funds, and at most 8 thousand in B. The return is $F=4x+6y$ (hundreds of euros). What is the maximum?'), [L(1, 1, 12), L(0, 1, 8)], { a: 4, b: 6 }, 'max')),
        bank('medium', problem(say('Garraioa: $x+y\\ge 6$ eta $3x+y\\ge 10$. Kostua $F=4x+2y$. Zenbat da minimoa?', 'Transporte: $x+y\\ge 6$ y $3x+y\\ge 10$. El coste es $F=4x+2y$. ¿Cuál es el mínimo?', 'النقل: $x+y\\ge 6$ و$3x+y\\ge 10$. الكلفة $F=4x+2y$. ما القيمة الصغرى؟', 'Transport: $x+y\\ge 6$ and $3x+y\\ge 10$. The cost is $F=4x+2y$. What is the minimum?'), [L(1, 1, 6, '≥'), L(3, 1, 10, '≥')], { a: 4, b: 2 }, 'min')),
        bank('hard', problem(say('Eraikitzaile batek gehienez 50 etxebizitza egin ditzake: $x+y\\le 50$ eta $x+2y\\le 80$ (kapitala). Irabazia $F=3x+5y$ (hamarnaka mila euro). Zenbat da maximoa?', 'Una constructora puede hacer como mucho 50 viviendas: $x+y\\le 50$ y $x+2y\\le 80$ (capital). El beneficio es $F=3x+5y$ (decenas de miles de euros). ¿Cuál es el máximo?', 'يمكن لشركة بناء أن تبني 50 مسكنًا على الأكثر: $x+y\\le 50$ و$x+2y\\le 80$ (رأس المال). الربح $F=3x+5y$ (عشرات آلاف اليوروهات). ما القيمة العظمى؟', 'A builder can make at most 50 homes: $x+y\\le 50$ and $x+2y\\le 80$ (capital). The profit is $F=3x+5y$ (tens of thousands of euros). What is the maximum?'), [L(1, 1, 50), L(1, 2, 80)], { a: 3, b: 5 }, 'max')),
        bank('hard', problem(say('Bitxi-denda batek gehienez 30 pieza egin ditzake, $2x+y\\le 40$ gramo zilarrekin. Irabazia $F=5x+4y$ eurotan. Zenbat da maximoa?', 'Una joyería puede hacer como mucho 30 piezas, con $2x+y\\le 40$ gramos de plata. El beneficio es $F=5x+4y$ euros. ¿Cuál es el máximo?', 'يمكن لمحل مجوهرات أن يصنع 30 قطعة على الأكثر بـ $2x+y\\le 40$ غرامًا من الفضة. الربح $F=5x+4y$ يورو. ما القيمة العظمى؟', 'A jeweller\'s can make at most 30 pieces, with $2x+y\\le 40$ grams of silver. The profit is $F=5x+4y$ euros. What is the maximum?'), [L(1, 1, 30), L(2, 1, 40)], { a: 5, b: 4 }, 'max')),
        {
            difficulty: 'hard',
            question: say('Ebatzi bost urratsetan: denda batek gehienez 40 kaxa ($x$ sagar, $y$ laranja) eros ditzake, eta 120 euro ditu: sagar-kaxa 2 euro eta laranja-kaxa 4 euro. Irabazia $F=3x+5y$. Zenbat kaxa?', 'Resuelve en cinco pasos: una tienda puede comprar como mucho 40 cajas ($x$ de manzanas, $y$ de naranjas) y tiene 120 €: la caja de manzanas cuesta 2 € y la de naranjas, 4 €. El beneficio es $F=3x+5y$. ¿Cuántas cajas?', 'حُلّ في خمس خطوات: يمكن لمتجر أن يشتري 40 صندوقًا على الأكثر ($x$ تفاح و$y$ برتقال) ولديه 120 €: صندوق التفاح بـ 2 € والبرتقال بـ 4 €. الربح $F=3x+5y$. كم صندوقًا؟', 'Solve in five steps: a shop can buy at most 40 boxes ($x$ of apples, $y$ of oranges) and has €120: a box of apples costs €2 and one of oranges €4. The profit is $F=3x+5y$. How many boxes?'),
            solution: same('$x+y\\le 40,\\ 2x+4y\\le 120\\qquad F(40,0)=120,\\quad F(20,20)=160,\\quad F(0,30)=150$'),
            answer: { expected: n(160) }
        }
    ]
}

export const programazioaExerciseBank: ExerciseSection[] = programazioaStages.map((stage) => ({
    id: stage.id,
    title: stage.title,
    items: stage.id === 'regions' ? [41, 42, 43, 44, 45, 46, 47, 48, 49, 50].map(twinBank) : ownSections[stage.id as Exclude<ProgramazioaStageId, 'regions'>]
})).reduce<ExerciseSection[]>((sections, section) => {
    const before = sections.reduce((sum, item) => sum + item.items.length, 0)
    return [...sections, { ...section, items: section.items.map((item, index) => ({ ...item, id: before + index + 1 })) }]
}, [])

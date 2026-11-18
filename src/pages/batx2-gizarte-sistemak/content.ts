import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseItem, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { bachSystemsChallenges, bachSystemsDiagnostic, bachSystemsExerciseBank, bachSystemsPractice } from '../batx1-zientziak-sistemak/content.ts'
import { sistemakChallenges, sistemakDiagnostic, sistemakExerciseBank, sistemakPractice } from '../batx2-zientziak-sistemak/content.ts'
import { gizarteSistemakStages, type GizarteSistemakStageId } from './stages.ts'

/* ==========================================================================
   Sistemak · Batxilergoa 2 · Gizarte Zientziak — diagnostic, guided
   practice, challenges and exercise bank. The exercises of calculation
   come from the Ciencias twins (Gauss from 1.º, Rouché, Cramer and the
   discussion from 2.º; imported and renumbered, never copied or edited,
   with the stage of this unit), without lines in the plane, four unknowns
   and Cramer with a parameter λ. Those of this unit are bundles whose
   prices are none, one or infinitely many, sentences turned into
   equations and the style of the Basque exam of Matemáticas Aplicadas a
   las CCSS II (exams with right, wrong and blank answers, investments).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
const n = (value: number, denominator = 1) => fraction(value, denominator)

type Twin = 'b1' | 'b2'
const find = <T extends { id: number }>(list: T[], id: number) => list.find((item) => item.id === id)!
const twinDiagnostic = (twin: Twin, id: number) => find(twin === 'b1' ? bachSystemsDiagnostic : sistemakDiagnostic, id)
const twinPractice = (twin: Twin, id: number) => find(twin === 'b1' ? bachSystemsPractice : sistemakPractice, id)
const twinChallenge = (twin: Twin, id: number) => find(twin === 'b1' ? bachSystemsChallenges : sistemakChallenges, id)
const twinBank = (twin: Twin, id: number) => find((twin === 'b1' ? bachSystemsExerciseBank : sistemakExerciseBank).flatMap((section) => section.items), id)

export const gizarteSistemakDiagnostic: DiagnosticQuestion[] = [
    { ...twinDiagnostic('b1', 113002), id: 143001 },
    { ...twinDiagnostic('b1', 113005), id: 143002 },
    { ...twinDiagnostic('b2', 118002), id: 143003 },
    { ...twinDiagnostic('b2', 118003), id: 143004 },
    { ...twinDiagnostic('b2', 118004), id: 143005 },
    { ...twinDiagnostic('b2', 118006), id: 143006 },
    {
        id: 143007,
        prompt: say(
            '$x$ liburu baten prezioa da eta $y$ koaderno batena. «Liburua koadernoa baino 5 euro garestiagoa da.» Zein da ekuazioa?',
            '$x$ es el precio de un libro e $y$ el de un cuaderno. «El libro cuesta 5 € más que el cuaderno.» ¿Cuál es la ecuación?',
            '$x$ سعر كتاب و$y$ سعر دفتر. «الكتاب أغلى من الدفتر بـ 5 €.» ما المعادلة؟',
            '$x$ is the price of a book and $y$ that of a notebook. «The book costs €5 more than the notebook.» What is the equation?'
        ),
        options: [same('$y=x+5$'), same('$x=y+5$'), same('$x+y=5$')],
        correctIndex: 1,
        explanation: say('Koadernoa da merkeena: haren prezioari 5 gehitzen zaizkio.', 'El cuaderno es el barato: a su precio se le suman 5.', 'الدفتر هو الأرخص: نضيف 5 إلى سعره.', 'The notebook is the cheaper one: add 5 to its price.'),
        topic: 'statement-system'
    },
    {
        id: 143008,
        prompt: say(
            'Bi produktuko hiru sorta: $\\operatorname{rg}(A)=1$ eta $\\operatorname{rg}(A^*)=1$. Zenbat prezio-multzo daude?',
            'Tres lotes de dos productos: $\\operatorname{rg}(A)=1$ y $\\operatorname{rg}(A^*)=1$. ¿Cuántos juegos de precios hay?',
            'ثلاث مجموعات من منتجين: $\\operatorname{rg}(A)=1$ و$\\operatorname{rg}(A^*)=1$. كم مجموعة أسعار توجد؟',
            'Three bundles of two products: $\\operatorname{rg}(A)=1$ and $\\operatorname{rg}(A^*)=1$. How many sets of prices are there?'
        ),
        options: [say('Bat ere ez', 'Ninguno', 'لا شيء', 'None'), say('Bat', 'Uno', 'واحدة', 'One'), say('Infinitu', 'Infinitos', 'لا نهائية', 'Infinitely many')],
        correctIndex: 2,
        explanation: say('Heinak berdinak dira, baina 2 produktu baino gutxiago: datuak falta dira.', 'Los rangos son iguales pero menores que 2 productos: faltan datos.', 'الرتبتان متساويتان لكنهما أصغر من عدد المنتجين: تنقص معطيات.', 'The ranks are equal but smaller than 2 products: data are missing.'),
        topic: 'prices-how-many'
    }
]

/* ---------- Guided practice: four per stage ---------- */

const ownPractice: Record<string, Omit<PracticeItem, 'id'>> = {
    rankBundles: {
        stage: 'rouche',
        prompt: say(
            'Bi produktuko hiru sortatan, $\\operatorname{rg}(A)=2$ eta $\\operatorname{rg}(A^*)=2$ dira. Zenbat prezio-multzo daude?',
            'En tres lotes de dos productos, $\\operatorname{rg}(A)=2$ y $\\operatorname{rg}(A^*)=2$. ¿Cuántos juegos de precios hay?',
            'في ثلاث مجموعات من منتجين، $\\operatorname{rg}(A)=2$ و$\\operatorname{rg}(A^*)=2$. كم مجموعة أسعار توجد؟',
            'In three bundles of two products, $\\operatorname{rg}(A)=2$ and $\\operatorname{rg}(A^*)=2$. How many sets of prices are there?'
        ),
        expected: n(1),
        hint: say('Konparatu heinak eta produktu-kopurua.', 'Compara los rangos con el número de productos.', 'قارن الرتبتين بعدد المنتجات.', 'Compare the ranks with the number of products.'),
        explanation: say('Heinak berdinak eta 2 produktu: prezio bakarrak, 1 multzo.', 'Rangos iguales y 2 productos: precios únicos, 1 juego.', 'الرتبتان متساويتان ومنتجان: أسعار وحيدة، مجموعة 1.', 'Equal ranks and 2 products: unique prices, 1 set.')
    },
    translate: {
        stage: 'problems',
        prompt: say(
            '«Boligrafoak arkatzak baino 3 euro gehiago balio du.» $b$ boligrafoaren prezioa da eta $l$ arkatzarena. $l=2$ bada, zenbat da $b$?',
            '«El bolígrafo cuesta 3 € más que el lápiz.» $b$ es el precio del bolígrafo y $l$ el del lápiz. Si $l=2$, ¿cuánto vale $b$?',
            '«القلم الجاف أغلى من قلم الرصاص بـ 3 €.» $b$ سعر القلم الجاف و$l$ سعر قلم الرصاص. إذا كان $l=2$ فكم $b$؟',
            '«The pen costs €3 more than the pencil.» $b$ is the price of the pen and $l$ that of the pencil. If $l=2$, what is $b$?'
        ),
        expected: n(5),
        hint: say('Gehiago balio duena boligrafoa da.', 'El que cuesta más es el bolígrafo.', 'الأغلى هو القلم الجاف.', 'The one that costs more is the pen.'),
        explanation: same('$b=l+3=2+3=5$')
    },
    infinitePrices: {
        stage: 'problems',
        prompt: say(
            'Sortak: $(2,1)$ 7 euro eta $(4,2)$ 14 euro (sagarrak, madariak). Madaria 1 euro balitz, zenbat balioko luke sagarrak?',
            'Lotes: $(2,1)$ a 7 € y $(4,2)$ a 14 € (manzanas, peras). Si la pera costara 1 €, ¿cuánto costaría la manzana?',
            'المجموعات: $(2,1)$ بـ 7 € و$(4,2)$ بـ 14 € (تفاح، إجاص). لو كان الإجاص بـ 1 € فكم يكون التفاح؟',
            'Bundles: $(2,1)$ at €7 and $(4,2)$ at €14 (apples, pears). If pears cost €1, how much would apples cost?'
        ),
        expected: n(3),
        hint: say('Bigarren sorta lehenaren bikoitza da: ekuazio bakarra geratzen da.', 'El segundo lote es el doble del primero: queda una sola ecuación.', 'المجموعة الثانية ضعف الأولى: تبقى معادلة واحدة.', 'The second bundle is twice the first: only one equation is left.'),
        explanation: say('Infinitu prezio, $y$ bakoitzeko bat: $2x+1=7\\ \\to\\ x=3$.', 'Infinitos precios, uno por cada $y$: $2x+1=7\\ \\to\\ x=3$.', 'أسعار لا نهائية، واحدة لكل $y$: $2x+1=7\\ \\to\\ x=3$.', 'Infinitely many prices, one for each $y$: $2x+1=7\\ \\to\\ x=3$.')
    }
}

const practiceOrder: Array<[Twin, number] | string> = [
    ['b1', 5], ['b1', 6], ['b1', 9], ['b1', 10],
    ['b2', 1], ['b2', 2], ['b2', 3], 'rankBundles',
    ['b2', 5], ['b2', 7], ['b2', 8], ['b2', 9],
    ['b2', 13], ['b2', 14], ['b2', 15], ['b2', 16],
    ['b2', 17], ['b2', 20], 'translate', 'infinitePrices'
]

/** The stage of this unit for each block of four */
const stageOf = (index: number, size: number): GizarteSistemakStageId => gizarteSistemakStages[Math.floor(index / size)].id as GizarteSistemakStageId

export const gizarteSistemakPractice: PracticeItem[] = practiceOrder.map((key, index) => (typeof key === 'string'
    ? { ...ownPractice[key], id: index + 1 }
    : { ...twinPractice(...key), id: index + 1, stage: stageOf(index, 4) }))

/* ---------- Challenges: three per stage ---------- */

const ownChallenges: Record<string, Omit<ChallengeItem, 'id'>> = {
    noPrices: {
        stage: 'rouche',
        points: 10,
        context: 'starter',
        prompt: say(
            'Bi produktuko hiru sortatan, $\\operatorname{rg}(A)=2$ eta $\\operatorname{rg}(A^*)=3$ dira. Zenbat prezio-multzo daude?',
            'En tres lotes de dos productos, $\\operatorname{rg}(A)=2$ y $\\operatorname{rg}(A^*)=3$. ¿Cuántos juegos de precios hay?',
            'في ثلاث مجموعات من منتجين، $\\operatorname{rg}(A)=2$ و$\\operatorname{rg}(A^*)=3$. كم مجموعة أسعار توجد؟',
            'In three bundles of two products, $\\operatorname{rg}(A)=2$ and $\\operatorname{rg}(A^*)=3$. How many sets of prices are there?'
        ),
        expected: n(0),
        hint: say('Heinak desberdinak dira.', 'Los rangos son distintos.', 'الرتبتان مختلفتان.', 'The ranks are different.'),
        explanation: say('$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$: datuak ez datoz bat, 0 multzo.', '$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$: los datos no cuadran, 0 juegos.', '$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$: المعطيات لا تتوافق، 0 مجموعة.', '$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$: the data do not fit, 0 sets.')
    },
    thirdBundle: {
        stage: 'rouche',
        points: 30,
        context: 'master',
        prompt: say(
            'Sortak: $(1,1)$ 5 euro, $(1,2)$ 8 euro eta $(2,3)$ $k$ euro. Zein $k$ baliotarako dago preziorik?',
            'Lotes: $(1,1)$ a 5 €, $(1,2)$ a 8 € y $(2,3)$ a $k$ €. ¿Para qué $k$ hay precios?',
            'المجموعات: $(1,1)$ بـ 5 € و$(1,2)$ بـ 8 € و$(2,3)$ بـ $k$ €. لأي $k$ توجد أسعار؟',
            'Bundles: $(1,1)$ at €5, $(1,2)$ at €8 and $(2,3)$ at €$k$. For which $k$ are there prices?'
        ),
        expected: n(13),
        hint: say('$\\operatorname{rg}(A)=2$ da: $|A^*|=0$ izan behar du.', '$\\operatorname{rg}(A)=2$: hace falta $|A^*|=0$.', '$\\operatorname{rg}(A)=2$: يجب أن يكون $|A^*|=0$.', '$\\operatorname{rg}(A)=2$: you need $|A^*|=0$.'),
        explanation: say('$|A^*|=k-13=0\\ \\to\\ k=13$: hirugarren sorta beste bien batura da.', '$|A^*|=k-13=0\\ \\to\\ k=13$: el tercer lote es la suma de los otros dos.', '$|A^*|=k-13=0\\ \\to\\ k=13$: المجموعة الثالثة مجموع الأخريين.', '$|A^*|=k-13=0\\ \\to\\ k=13$: the third bundle is the sum of the other two.')
    },
    cramerPrices: {
        stage: 'cramer',
        points: 30,
        context: 'master',
        prompt: say(
            'Hiru produktuko sortak: $(1,1,1)$ 6 euro, $(1,2,0)$ 5 euro eta $(0,1,2)$ 8 euro. Cramerren erregelaz, zenbat balio du hirugarren produktuak?',
            'Lotes de tres productos: $(1,1,1)$ a 6 €, $(1,2,0)$ a 5 € y $(0,1,2)$ a 8 €. Por Cramer, ¿cuánto cuesta el tercer producto?',
            'مجموعات من ثلاثة منتجات: $(1,1,1)$ بـ 6 € و$(1,2,0)$ بـ 5 € و$(0,1,2)$ بـ 8 €. بقاعدة كرامر، كم سعر المنتج الثالث؟',
            'Bundles of three products: $(1,1,1)$ at €6, $(1,2,0)$ at €5 and $(0,1,2)$ at €8. By Cramer, how much does the third product cost?'
        ),
        expected: n(3),
        hint: same('$|A|=3$'),
        explanation: same('$\\frac{|A_z|}{|A|}=\\frac{9}{3}=3$')
    },
    exam: {
        stage: 'problems',
        points: 30,
        context: 'master',
        prompt: say(
            '25 galderako azterketa: asmatzeak 2 puntu, hutsak $-1$ eta zuriak 0. Ikasle batek 29 puntu ditu, eta hutsak baino 2 zuri gutxiago. Zenbat asmatu ditu?',
            'Examen de 25 preguntas: acierto 2 puntos, fallo $-1$ y en blanco 0. Un alumno saca 29 puntos y deja 2 en blanco menos que fallos. ¿Cuántos aciertos tiene?',
            'امتحان من 25 سؤالًا: الصحيحة نقطتان والخاطئة $-1$ والفارغة 0. حصل طالب على 29 نقطة، وترك من الفارغة أقل من الخاطئة بـ 2. كم إجابة صحيحة؟',
            'A 25-question exam: a right answer scores 2, a wrong one $-1$ and a blank 0. A student scores 29 and leaves 2 fewer blanks than wrong answers. How many right answers?'
        ),
        expected: n(17),
        hint: same('$a+f+b=25\\qquad 2a-f=29\\qquad b=f-2$'),
        explanation: same('$a=17,\\ f=5,\\ b=3\\qquad 17+5+3=25$')
    }
}

const challengeOrder: Array<[Twin, number] | string> = [
    ['b1', 104], ['b1', 105], ['b1', 106],
    'noPrices', ['b2', 102], 'thirdBundle',
    ['b2', 104], ['b2', 105], 'cramerPrices',
    ['b2', 110], ['b2', 111], ['b2', 112],
    ['b2', 113], ['b2', 114], 'exam'
]

export const gizarteSistemakChallenges: ChallengeItem[] = challengeOrder.map((key, index) => (typeof key === 'string'
    ? { ...ownChallenges[key], id: 101 + index }
    : { ...twinChallenge(...key), id: 101 + index, stage: stageOf(index, 3) }))

/* ---------- Exercise bank: ten per stage ---------- */

const ownBank: Record<string, Omit<ExerciseItem, 'id'>> = {
    bundlesThree: {
        difficulty: 'medium',
        question: say(
            'Sortak: $(1,2)$ 8 euro, $(2,1)$ 7 euro eta $(1,1)$ 5 euro. Ba al dago preziorik? Zein da lehen produktuarena?',
            'Lotes: $(1,2)$ a 8 €, $(2,1)$ a 7 € y $(1,1)$ a 5 €. ¿Hay precios? ¿Cuál es el del primer producto?',
            'المجموعات: $(1,2)$ بـ 8 € و$(2,1)$ بـ 7 € و$(1,1)$ بـ 5 €. هل توجد أسعار؟ وما سعر المنتج الأول؟',
            'Bundles: $(1,2)$ at €8, $(2,1)$ at €7 and $(1,1)$ at €5. Are there prices? What is that of the first product?'
        ),
        solution: say(
            'Bai: $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$. Lehen bi sortek $x=2$ eta $y=3$ ematen dute, eta hirugarrena bat dator: $2+3=5$.',
            'Sí: $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$. Los dos primeros lotes dan $x=2$ e $y=3$, y el tercero cuadra: $2+3=5$.',
            'نعم: $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$. تعطي المجموعتان الأوليان $x=2$ و$y=3$، والثالثة تتوافق: $2+3=5$.',
            'Yes: $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$. The first two bundles give $x=2$ and $y=3$, and the third fits: $2+3=5$.'
        ),
        answer: { expected: n(2) }
    },
    invest: {
        difficulty: 'easy',
        question: say(
            '12 mila euro bi fondotan banatzen dira, eta bigarrenean lehenean bezainbeste bider bi. Zenbat mila euro doaz lehenengora?',
            'Se reparten 12 mil euros en dos fondos, y en el segundo va el doble que en el primero. ¿Cuántos miles van al primero?',
            'تُوزَّع 12 ألف يورو على صندوقين، وفي الثاني ضعف ما في الأول. كم ألفًا يذهب إلى الأول؟',
            '12 thousand euros are split between two funds, with twice as much in the second as in the first. How many thousand go to the first?'
        ),
        solution: same('$x+2x=12\\ \\to\\ x=4$'),
        answer: { expected: n(4) }
    },
    cakes: {
        difficulty: 'medium',
        question: say(
            'Gozotegi batek hiru tarta mota saltzen ditu: 7, 5 eta 8 euro. Egun batean 20 tarta saltzen ditu eta 142 euro jasotzen ditu; hirugarren motakoak beste bien adina dira. Zenbat saltzen ditu lehen motakoak?',
            'Una pastelería vende tres tipos de tarta a 7 €, 5 € y 8 €. Un día vende 20 tartas e ingresa 142 €; del tercer tipo vende tantas como de los otros dos juntos. ¿Cuántas vende del primer tipo?',
            'يبيع محل حلويات ثلاثة أنواع من الكعك بـ 7 € و5 € و8 €. في يوم باع 20 كعكة وجنى 142 €؛ وباع من النوع الثالث بقدر النوعين الآخرين معًا. كم باع من النوع الأول؟',
            'A cake shop sells three kinds of cake at €7, €5 and €8. One day it sells 20 cakes and takes €142; of the third kind it sells as many as of the other two together. How many of the first kind does it sell?'
        ),
        solution: same('$x+y=10,\\ z=10,\\ 7x+5y=62\\ \\to\\ x=6,\\ y=4\\qquad 7\\cdot 6+5\\cdot 4+8\\cdot 10=142$'),
        answer: { expected: n(6) }
    }
}

const sectionOrder: Array<Array<[Twin, number] | string>> = [
    [['b1', 11], ['b1', 12], ['b1', 21], ['b1', 22], ['b1', 14], ['b1', 15], ['b1', 17], ['b1', 25], ['b1', 18], ['b1', 19]],
    [['b2', 1], ['b2', 2], ['b2', 3], ['b2', 4], ['b2', 5], ['b2', 6], 'bundlesThree', ['b2', 8], ['b2', 9], ['b2', 10]],
    [['b2', 11], ['b2', 12], ['b2', 13], ['b2', 21], ['b2', 14], ['b2', 15], ['b2', 17], ['b2', 18], ['b2', 19], ['b2', 20]],
    [['b2', 31], ['b2', 32], ['b2', 33], ['b2', 34], ['b2', 35], ['b2', 36], ['b2', 37], ['b2', 38], ['b2', 39], ['b2', 40]],
    ['invest', ['b2', 43], ['b2', 44], 'cakes', ['b2', 45], ['b2', 46], ['b2', 47], ['b2', 48], ['b2', 49], ['b2', 50]]
]

let bankId = 0
export const gizarteSistemakExerciseBank: ExerciseSection[] = gizarteSistemakStages.map((stage, index) => ({
    id: stage.id,
    title: stage.title,
    items: sectionOrder[index].map((key) => {
        bankId += 1
        return typeof key === 'string' ? { ...ownBank[key], id: bankId } : { ...twinBank(...key), id: bankId }
    })
}))

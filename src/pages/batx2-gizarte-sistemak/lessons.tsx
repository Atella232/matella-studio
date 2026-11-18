import type { LocalizedText, UnitTopic } from '../../features/unit-v2/types'
import { bachSystemsTopics } from '../batx1-zientziak-sistemak/lessons'
import { sistemakTopics } from '../batx2-zientziak-sistemak/lessons'
import { PricesCountFigure, StatementFigure } from './figures'
import { gizarteSistemakLessonChecks, type GizarteSistemakTopicId } from './lessonChecks'
import { gizarteSistemakLessonTexts } from './lessonTexts'
import type { GizarteSistemakStageId } from './stages'

/* ==========================================================================
   Sistemak · Batxilergoa 2 · Gizarte Zientziak — stages and lessons. The
   scope follows unit 3 of Santillana 2.º Bachillerato CCSS, unit 1 (Gauss)
   and §6–§9 of unit 3 of Anaya Matemáticas Aplicadas a las CCSS II. As the
   owner chose (2026-11-18), the lessons of calculation come as they are
   from the Ciencias twins (Gauss from 1.º, Rouché, Cramer and the
   discussion from 2.º; imported, never copied or edited, with the stage
   of this unit), and two lessons with an economic context are this
   unit's own: none, one or infinitely many prices, and from the sentences
   of a problem to the system. Non-linear systems, lines and ranks, more
   equations than unknowns and Cramer with infinitely many solutions stay
   out.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons of this unit without what they tell, which lives in lessonTexts.ts */
const ownTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'prices-how-many',
        stage: 'rouche',
        title: say('Prezio bat ere ez, bat ala infinitu?', '¿Ninguno, uno o infinitos precios?', 'لا أسعار أم واحدة أم لا نهائية؟', 'No prices, one set or infinitely many?'),
        goal: say('Sorta batzuen datuekin, prezioak bakarrak, infinituak ala ezinezkoak diren erabakitzea, $\\operatorname{rg}(A)$ eta $\\operatorname{rg}(A^*)$ konparatuz.', 'Decidir con los datos de unos lotes si los precios son únicos, infinitos o imposibles, comparando $\\operatorname{rg}(A)$ y $\\operatorname{rg}(A^*)$.', 'تقرير، بمعطيات مجموعات، هل الأسعار وحيدة أم لا نهائية أم مستحيلة بمقارنة $\\operatorname{rg}(A)$ و$\\operatorname{rg}(A^*)$.', 'Decide from the data of some bundles whether the prices are unique, infinitely many or impossible, comparing $\\operatorname{rg}(A)$ and $\\operatorname{rg}(A^*)$.'),
        needs: [
            { unit: 'batx2-zientziak/determinantes', topic: 'rank-by-minors', title: { eu: 'Heina menoreekin', es: 'El rango con menores', en: 'Rank with minors', ar: 'الرتبة بالمحددات الصغرى' } }
        ],
        problem: say(
            'Fruta-denda batek hiru sorta iragartzen ditu: 2 kilo sagar eta kilo bat madari, 8 euro; kilo bat bakoitzetik, 5 euro; eta 4 kilo sagar eta 3 kilo madari, 18 euro. Ba al dago bat datozen preziorik? Zenbat?',
            'Una frutería anuncia tres lotes: 2 kilos de manzanas y 1 de peras, 8 €; un kilo de cada, 5 €; y 4 kilos de manzanas y 3 de peras, 18 €. ¿Hay precios que cuadren? ¿Cuántos?',
            'يعلن محل فواكه عن ثلاث مجموعات: كيلوغرامان من التفاح وكيلوغرام من الإجاص بـ 8 €؛ وكيلوغرام من كل منهما بـ 5 €؛ و4 كيلوغرامات من التفاح و3 من الإجاص بـ 18 €. هل توجد أسعار تتوافق؟ كم؟',
            'A fruit shop advertises three bundles: 2 kilos of apples and 1 of pears, €8; a kilo of each, €5; and 4 kilos of apples and 3 of pears, €18. Are there prices that fit? How many?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Sorta bakoitza errenkada bat da: $A$ kopuruekin eta $A^*$ prezioen zutabearekin.', 'Cada lote es una fila: $A$ con las cantidades y $A^*$ con la columna de lo que cuesta.', 'كل مجموعة صف: $A$ بالكميات و$A^*$ بعمود الأثمان.', 'Each bundle is a row: $A$ with the quantities and $A^*$ with the column of what it costs.'), math: same('$A^*=\\begin{pmatrix}2&1&8\\\\1&1&5\\\\4&3&18\\end{pmatrix}$') },
            { text: say('$A$ matrizeak 0 ez den 2. ordenako menore bat du, eta $|A^*|=0$: bi heinak 2 dira.', '$A$ tiene un menor de orden 2 que no es 0 y $|A^*|=0$: los dos rangos valen 2.', 'لـ $A$ محدد أصغر من الرتبة 2 غير صفري و$|A^*|=0$: الرتبتان تساويان 2.', '$A$ has a minor of order 2 that is not 0, and $|A^*|=0$: both ranks are 2.'), math: same('$\\begin{vmatrix}2&1\\\\1&1\\end{vmatrix}=1\\neq 0\\qquad |A^*|=0$') },
            { text: say('Heinak berdinak dira eta 2 produktu daude: prezio bakarrak. Sagarra 3 euro da kiloa, eta madaria 2 euro; hirugarren sorta bat dator.', 'Rangos iguales y 2 productos: precios únicos. La manzana cuesta 3 € el kilo y la pera, 2 €; el tercer lote cuadra.', 'الرتبتان متساويتان والمنتجان اثنان: أسعار وحيدة. كيلو التفاح بـ 3 € وكيلو الإجاص بـ 2 €؛ والمجموعة الثالثة تتوافق.', 'Equal ranks and 2 products: unique prices. Apples cost €3 a kilo and pears €2; the third bundle fits.'), math: same('$x=3,\\ y=2\\qquad 4\\cdot 3+3\\cdot 2=18$') }
        ],
        takeaway: say(
            'Sorta bakoitza ekuazio bat da. $\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$ bada, datuak ez datoz bat: ez dago preziorik. Heinak berdinak eta produktu-kopurua badira, prezio bakarrak daude. Heinak berdinak baina txikiagoak badira, infinitu prezio daude: datuak falta dira.',
            'Cada lote es una ecuación. Si $\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$, los datos no cuadran: no hay precios. Si los rangos son iguales al número de productos, hay precios únicos. Si son iguales pero menores, hay infinitos: faltan datos.',
            'كل مجموعة معادلة. إذا كان $\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$ فالمعطيات لا تتوافق: لا أسعار. وإذا تساوت الرتبتان مع عدد المنتجات فالأسعار وحيدة. وإذا تساوتا وكانتا أصغر فالأسعار لا نهائية: تنقص معطيات.',
            'Each bundle is an equation. If $\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$, the data do not fit: there are no prices. If the ranks equal the number of products, the prices are unique. If they are equal but smaller, there are infinitely many: data are missing.'
        ),
        figure: (language) => <PricesCountFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'statement-system',
        stage: 'problems',
        title: say('Enuntziatutik sistemara', 'Del enunciado al sistema', 'من نص المسألة إلى النظام', 'From the statement to the system'),
        goal: say('Problema ekonomiko baten esaldiak ekuazio bihurtzea, sistema Gaussen metodoaz ebaztea eta emaitza esaldietan egiaztatzea.', 'Pasar las frases de un problema económico a ecuaciones, resolver el sistema por Gauss y comprobar el resultado en las frases.', 'تحويل جمل مسألة اقتصادية إلى معادلات، وحل النظام بطريقة غاوس، والتحقق من النتيجة في الجمل.', 'Turn the sentences of an economic problem into equations, solve the system by Gauss and check the result in the sentences.'),
        needs: [
            { unit: 'batx1-zientziak/sistemas', topic: 'three-unknown-problems', title: { eu: 'Hiru ezezaguneko problemak', es: 'Problemas con tres incógnitas', en: 'Problems with three unknowns', ar: 'مسائل بثلاثة مجاهيل' } }
        ],
        problem: say(
            'Enpresa batek 30 mila euro inbertitzen ditu A, B eta C fondoetan. B fondoan A fondoan bezainbeste bider bi jartzen du, eta C fondoan A fondoan baino 6 mila gehiago. Zenbat jartzen du fondo bakoitzean?',
            'Una empresa invierte 30 mil euros en los fondos A, B y C. En B pone el doble que en A, y en C, 6 mil más que en A. ¿Cuánto pone en cada fondo?',
            'تستثمر شركة 30 ألف يورو في الصناديق A وB وC. تضع في B ضعف ما في A، وفي C أكثر مما في A بـ 6 آلاف. كم تضع في كل صندوق؟',
            'A company invests 30 thousand euros in funds A, B and C. It puts twice as much in B as in A, and 6 thousand more in C than in A. How much does it put in each fund?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezezagunak: $x$, $y$ eta $z$, A, B eta C fondoetako milaka euroak. Esaldi bakoitza, ekuazio bat.', 'Incógnitas: $x$, $y$ y $z$, miles de euros en A, B y C. Cada frase, una ecuación.', 'المجاهيل: $x$ و$y$ و$z$، آلاف اليوروهات في A وB وC. كل جملة معادلة.', 'Unknowns: $x$, $y$ and $z$, thousands of euros in A, B and C. Each sentence, one equation.'), math: same('$x+y+z=30\\qquad y=2x\\qquad z=x+6$') },
            { text: say('Ordezkatu $y$ eta $z$ lehen ekuazioan.', 'Sustituye $y$ y $z$ en la primera ecuación.', 'عوّض $y$ و$z$ في المعادلة الأولى.', 'Substitute $y$ and $z$ in the first equation.'), math: same('$x+2x+(x+6)=30\\ \\to\\ 4x=24$') },
            { text: say('A fondoan 6 mila euro, B fondoan 12 mila eta C fondoan 12 mila. Egiaztatu batura.', 'En A, 6 mil euros; en B, 12 mil, y en C, 12 mil. Comprueba la suma.', 'في A ستة آلاف يورو، وفي B اثنا عشر ألفًا، وفي C اثنا عشر ألفًا. تحقق من المجموع.', 'In A, 6 thousand euros; in B, 12 thousand, and in C, 12 thousand. Check the sum.'), math: same('$x=6,\\ y=12,\\ z=12\\qquad 6+12+12=30$') }
        ],
        takeaway: say(
            'Problema bat sistema bihurtzeko: izendatu ezezagunak unitatearekin, idatzi esaldi bakoitza ekuazio gisa («bikoitza» bider bi, «baino 6 gehiago» +6 txikiaren aldean), ebatzi eta egiaztatu emaitza esaldi guztietan.',
            'Para pasar un problema a sistema: nombra las incógnitas con su unidad, escribe cada frase como ecuación («el doble» es por dos, «6 más que» es +6 en el lado de la pequeña), resuelve y comprueba el resultado en todas las frases.',
            'لتحويل مسألة إلى نظام: سمِّ المجاهيل مع وحدتها، واكتب كل جملة معادلة («الضعف» ضرب في اثنين، و«أكثر بـ 6» إضافة 6 إلى جهة الأصغر)، ثم حُلّ وتحقق من النتيجة في كل الجمل.',
            'To turn a problem into a system: name the unknowns with their unit, write each sentence as an equation («twice» is times two, «6 more than» is +6 on the side of the smaller one), solve and check the result in every sentence.'
        ),
        figure: (language) => <StatementFigure language={language} />,
        figureAfterSteps: true
    }
]

const own = Object.fromEntries(ownTopics.map((topic) => [topic.id, {
    ...topic,
    ...gizarteSistemakLessonTexts[topic.id as GizarteSistemakTopicId],
    ...gizarteSistemakLessonChecks[topic.id as GizarteSistemakTopicId]
} as UnitTopic]))

/** The stage of this unit for each borrowed lesson */
const twinStage: Record<string, GizarteSistemakStageId> = {
    'classify-systems': 'gauss', 'triangular-systems': 'gauss', 'gauss-method': 'gauss', 'solutions-count': 'gauss', 'parametric-solutions': 'gauss',
    'matrix-form': 'rouche', 'rouche-theorem': 'rouche', 'rank-classify': 'rouche',
    'cramer-rule': 'cramer', 'inverse-solve': 'cramer', 'homogeneous-trivial': 'cramer',
    'parameter-determinant': 'discussion', 'parameter-ranks': 'discussion', 'parameter-solve': 'discussion',
    'word-problems': 'problems', 'parameter-problems': 'problems'
}
const twin = Object.fromEntries([...bachSystemsTopics, ...sistemakTopics]
    .filter((topic) => topic.id in twinStage)
    .map((topic) => [topic.id, { ...topic, stage: twinStage[topic.id] }]))

/** The order of the unit: the lessons of the Ciencias twins and this unit's own */
const order = [
    'classify-systems', 'triangular-systems', 'gauss-method', 'solutions-count', 'parametric-solutions',
    'matrix-form', 'rouche-theorem', 'rank-classify', 'prices-how-many',
    'cramer-rule', 'inverse-solve', 'homogeneous-trivial',
    'parameter-determinant', 'parameter-ranks', 'parameter-solve',
    'statement-system', 'word-problems', 'parameter-problems'
]

/** The lesson ids borrowed from the Ciencias twins */
export const gizarteSistemakTwinTopicIds = order.filter((id) => !(id in own))

export const gizarteSistemakTopics: UnitTopic[] = order.map((id) => own[id] ?? twin[id])

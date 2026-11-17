import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { determinanteakStages, determinanteakTopics } from '../batx2-zientziak-determinanteak/lessons'
import { UniquePricesFigure } from './figures'
import { gizarteDeterminanteakLessonChecks, type GizarteDeterminanteakTopicId } from './lessonChecks'
import { gizarteDeterminanteakLessonTexts } from './lessonTexts'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 · Gizarte Zientziak — stages and lessons.
   The scope follows unit 2 of Santillana 2.º Bachillerato CCSS and §1–§5
   and §10 of unit 3 of Anaya Matemáticas Aplicadas a las CCSS II. As the
   owner chose (2026-11-17), the lessons of calculation come from the
   Ciencias twin as they are (imported, never copied or edited), and the
   lesson with an economic context is this unit's own: can the prices of
   some bundles be found? Order 4 and equations with determinants (not in
   the Sociales books) stay out; Cramer and Rouché belong to Sistemak.
   ========================================================================== */

export type GizarteDeterminanteakStageId = 'orders' | 'properties' | 'expansion' | 'rank' | 'inverse'

export const gizarteDeterminanteakStages: UnitStage[] = determinanteakStages

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lesson of this unit without what it tells, which lives in lessonTexts.ts */
const ownTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'unique-prices',
        stage: 'inverse',
        title: say('Ondoriozta daitezke prezioak?', '¿Se pueden averiguar los precios?', 'هل يمكن معرفة الأسعار؟', 'Can the prices be found?'),
        goal: say('Sorta batzuen prezioetatik produktu bakoitzaren prezioa ondoriozta daitekeen erabakitzea, $|A|$ begiratuta, eta, ahal bada, $X=A^{-1}B$ eginez kalkulatzea.', 'Decidir con $|A|$ si los precios de unos lotes permiten averiguar el precio de cada producto y, si se puede, hallarlo con $X=A^{-1}B$.', 'تقرير، بالنظر إلى $|A|$، هل تسمح أسعار مجموعات بمعرفة سعر كل منتج، وإن أمكن حسابه بـ $X=A^{-1}B$.', 'Decide with $|A|$ whether the prices of some bundles let you find the price of each product and, if they do, work it out with $X=A^{-1}B$.'),
        needs: [
            { unit: 'batx2-zientziak/matrices', topic: 'matrix-equations', title: { eu: 'Matrize bat askatzea', es: 'Despejar una matriz', en: 'Solving for a matrix', ar: 'استخراج مصفوفة مجهولة' } }
        ],
        problem: say(
            'Fruta-denda batean, 2 kilo sagar eta kilo bat madari dituen sortak 7 euro balio du, eta 3 kilo sagar eta 2 kilo madari dituenak, 12 euro. Ondoriozta al daiteke kilo bakoitzaren prezioa? Zein da?',
            'En una frutería, un lote de 2 kilos de manzanas y 1 de peras cuesta 7 €, y otro de 3 kilos de manzanas y 2 de peras, 12 €. ¿Se puede averiguar el precio de cada kilo? ¿Cuál es?',
            'في محل فواكه، تكلّف مجموعة من كيلوغرامين من التفاح وكيلوغرام من الإجاص 7 €، وأخرى من 3 كيلوغرامات من التفاح وكيلوغرامين من الإجاص 12 €. هل يمكن معرفة سعر كل كيلوغرام؟ وما هو؟',
            'At a fruit shop, a bundle of 2 kilos of apples and 1 of pears costs €7, and another of 3 kilos of apples and 2 of pears costs €12. Can the price of each kilo be found? What is it?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Sorta bakoitza errenkada bat da: kopuruak $A$ matrizean, prezioak $X$ zutabean eta guztizkoak $B$ zutabean.', 'Cada lote es una fila: las cantidades en $A$, los precios en la columna $X$ y los totales en la columna $B$.', 'كل مجموعة صف: الكميات في $A$، والأسعار في العمود $X$، والمجاميع في العمود $B$.', 'Each bundle is a row: the quantities in $A$, the prices in the column $X$ and the totals in the column $B$.'), math: same('$\\begin{pmatrix}2&1\\\\3&2\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}7\\\\12\\end{pmatrix}$') },
            { text: say('Kalkulatu $|A|$: zero ez denez, $A$ matrizeak alderantzizkoa du eta prezioak bakarrak dira.', 'Calcula $|A|$: como no es cero, $A$ tiene inversa y los precios son únicos.', 'احسب $|A|$: بما أنه ليس صفرًا فلـ $A$ معكوس والأسعار وحيدة.', 'Work out $|A|$: since it is not zero, $A$ has an inverse and the prices are unique.'), math: same('$|A|=\\begin{vmatrix}2&1\\\\3&2\\end{vmatrix}=2\\cdot 2-1\\cdot 3=1\\neq 0$') },
            { text: say('$A^{-1}$ adjuntuekin, eta $X=A^{-1}B$: sagarrak 2 euro balio du kiloko, eta madariak 3 euro.', '$A^{-1}$ con los adjuntos y $X=A^{-1}B$: la manzana cuesta 2 € el kilo y la pera, 3 €.', '$A^{-1}$ بالمتممات الجبرية ثم $X=A^{-1}B$: كيلو التفاح بـ 2 € وكيلو الإجاص بـ 3 €.', '$A^{-1}$ with the cofactors and $X=A^{-1}B$: apples cost €2 a kilo and pears €3.'), math: same('$X=\\begin{pmatrix}2&-1\\\\-3&2\\end{pmatrix}\\begin{pmatrix}7\\\\12\\end{pmatrix}=\\begin{pmatrix}2\\\\3\\end{pmatrix}$') }
        ],
        takeaway: say(
            'Sorten prezioek $AX=B$ sistema osatzen dute. $|A|\\neq 0$ bada, prezioak bakarrak dira: $X=A^{-1}B$. $|A|=0$ bada, sorta bat besteen multiploa edo konbinazioa da, eta datuekin ezin dira prezioak finkatu: sorta berri bat behar da.',
            'Los precios de los lotes forman el sistema $AX=B$. Si $|A|\\neq 0$, los precios son únicos: $X=A^{-1}B$. Si $|A|=0$, un lote es múltiplo o mezcla de los otros y con esos datos no se pueden fijar los precios: hace falta otro lote.',
            'تكوّن أسعار المجموعات النظام $AX=B$. إذا كان $|A|\\neq 0$ فالأسعار وحيدة: $X=A^{-1}B$. وإذا كان $|A|=0$ فإحدى المجموعات مضاعف للأخرى أو مزيج منها، ولا يمكن بهذه المعطيات تحديد الأسعار: نحتاج إلى مجموعة أخرى.',
            'The prices of the bundles make the system $AX=B$. If $|A|\\neq 0$, the prices are unique: $X=A^{-1}B$. If $|A|=0$, one bundle is a multiple or a mix of the others and with those data the prices cannot be fixed: another bundle is needed.'
        ),
        figure: (language) => <UniquePricesFigure language={language} />,
        figureAfterSteps: true
    }
]

const own = Object.fromEntries(ownTopics.map((topic) => [topic.id, {
    ...topic,
    ...gizarteDeterminanteakLessonTexts[topic.id as GizarteDeterminanteakTopicId],
    ...gizarteDeterminanteakLessonChecks[topic.id as GizarteDeterminanteakTopicId]
} as UnitTopic]))
const twin = Object.fromEntries(determinanteakTopics.map((topic) => [topic.id, topic]))

/** The order of the unit: the lessons of the Ciencias twin (without order 4 and equations) and this unit's own */
const order = [
    'det-two', 'sarrus', 'zero-det',
    'transpose-swap', 'scale-row', 'add-multiple', 'product-det',
    'minors-cofactors', 'laplace',
    'rank-by-minors', 'rank-parameter-minors',
    'adjugate-inverse', 'inverse-parameter', 'det-matrix-equations', 'unique-prices'
]

/** The lesson ids borrowed from the Ciencias twin */
export const gizarteDeterminanteakTwinTopicIds = order.filter((id) => !(id in own))

export const gizarteDeterminanteakTopics: UnitTopic[] = order.map((id) => own[id] ?? twin[id])

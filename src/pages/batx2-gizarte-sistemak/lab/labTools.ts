import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { gaussChallenges } from '../../batx1-zientziak-sistemak/lab/gaussMachine.ts'
import { bachSystemsLabTools } from '../../batx1-zientziak-sistemak/lab/labTools.ts'
import { discussionChallenges } from '../../batx2-zientziak-sistemak/lab/discussionMap.ts'
import { sistemakLabTools } from '../../batx2-zientziak-sistemak/lab/labTools.ts'
import type { GizarteSistemakStageId } from '../stages.ts'
import { pricesChallenges } from './pricesCount.ts'
import { statementChallenges } from './statement.ts'

/* ==========================================================================
   Sistemak (Batxilergoa 2 · Gizarte Zientziak) laboratory. Two tools of
   its own: none, one or infinitely many prices (Rouché with bundles) and
   from the statement to the equation. The Gauss machine of 1.º Ciencias
   and the discussion map of 2.º Ciencias come back as they are, with
   their challenges and ids (progress is kept under this unit's prefix).
   Tests in tests/sistemak-batx2g-lab.test.ts.
   ========================================================================== */

export type GizarteSistemakLabToolId = 'gauss-machine' | 'prices-count' | 'discussion-map' | 'statement'

export interface GizarteSistemakLabTool extends LabToolInfo {
    id: GizarteSistemakLabToolId
    stage: GizarteSistemakStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const gizarteSistemakLabTools: GizarteSistemakLabTool[] = [
    { ...bachSystemsLabTools.find((tool) => tool.id === 'gauss-machine')!, id: 'gauss-machine', stage: 'gauss' },
    {
        id: 'prices-count',
        stage: 'rouche',
        lessonTopic: 'prices-how-many',
        title: say('Bat ere ez, bat ala infinitu?', '¿Ninguno, uno o infinitos?', 'لا شيء أم واحدة أم لا نهائية؟', 'None, one or infinitely many?'),
        observe: say('Hiru sorta eta bi prezio: hirugarren sorta beste bien konbinazioa denean eta haren prezioa bat datorrenean, prezio bakarrak daude. Prezioa bat ez badator, $\\operatorname{rg}(A^*)$ igotzen da: ez dago preziorik. Sorta guztiak proportzionalak badira, infinitu.', 'Tres lotes y dos precios: cuando el tercer lote es combinación de los otros y lo que cuesta cuadra, hay precios únicos. Si no cuadra, $\\operatorname{rg}(A^*)$ sube: no hay precios. Si todos los lotes son proporcionales, infinitos.', 'ثلاث مجموعات وسعران: عندما تكون المجموعة الثالثة تركيبًا من الأخريين ويتوافق ثمنها، فالأسعار وحيدة. وإذا لم يتوافق ترتفع $\\operatorname{rg}(A^*)$: لا أسعار. وإذا تناسبت كل المجموعات فلا نهائية.', 'Three bundles and two prices: when the third bundle is a combination of the others and what it costs fits, the prices are unique. If it does not fit, $\\operatorname{rg}(A^*)$ goes up: no prices. If every bundle is proportional, infinitely many.')
    },
    { ...sistemakLabTools.find((tool) => tool.id === 'discussion-map')!, id: 'discussion-map', stage: 'discussion' },
    {
        id: 'statement',
        stage: 'problems',
        lessonTopic: 'statement-system',
        title: say('Enuntziatutik ekuaziora', 'Del enunciado a la ecuación', 'من النص إلى المعادلة', 'From the statement to the equation'),
        observe: say('Esaldi bakoitza ekuazio bat da. «Bikoitza» eta «baino gutxiago» esaldietan, erraz trukatzen da zer den handiagoa: egiaztatu beti zenbaki batekin. Ekuazio bat bider zenbaki bat ere zuzena da.', 'Cada frase es una ecuación. En «el doble» y «menos que» es fácil cambiar qué es lo mayor: compruébalo siempre con un número. Una ecuación multiplicada por un número también vale.', 'كل جملة معادلة. في «الضعف» و«أقل من» يسهل الخلط في أيهما الأكبر: تحقق دائمًا بعدد. والمعادلة المضروبة في عدد صحيحة أيضًا.', 'Each sentence is an equation. In «twice» and «less than» it is easy to swap which is larger: always check with a number. An equation multiplied by a number is right too.')
    }
]

export const gizarteSistemakLabToolForTopic: Record<string, GizarteSistemakLabToolId | undefined> = {
    'triangular-systems': 'gauss-machine',
    'gauss-method': 'gauss-machine',
    'solutions-count': 'gauss-machine',
    'rouche-theorem': 'prices-count',
    'rank-classify': 'prices-count',
    'prices-how-many': 'prices-count',
    'parameter-determinant': 'discussion-map',
    'parameter-ranks': 'discussion-map',
    'parameter-solve': 'discussion-map',
    'statement-system': 'statement',
    'word-problems': 'statement',
    'parameter-problems': 'discussion-map'
}

export const gizarteSistemakLabChallengeIds: number[] = [gaussChallenges, pricesChallenges, discussionChallenges, statementChallenges]
    .flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

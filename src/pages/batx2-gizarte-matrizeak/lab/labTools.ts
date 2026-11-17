import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { jordanChallenges } from '../../batx2-zientziak-matrizeak/lab/jordanMachine.ts'
import { matrizeakLabTools } from '../../batx2-zientziak-matrizeak/lab/labTools.ts'
import { rankChallenges } from '../../batx2-zientziak-matrizeak/lab/rankSlider.ts'
import type { GizarteMatrizeakStageId } from '../lessons.tsx'
import { chainChallenges } from './chain.ts'
import { ticketChallenges } from './ticket.ts'

/* ==========================================================================
   Matrizeak (Batxilergoa 2 · Gizarte Zientziak) laboratory. Two tools of
   its own: the ticket (quantities and prices from a table, the order of
   the product, income, cost and profit) and the production chain
   (customers → products → parts, AB and not BA). The rank slider and the
   Gauss–Jordan machine of the Ciencias twin come back as they are, with
   their challenges and ids (progress is kept under this unit's prefix).
   Tests in tests/matrizeak-batx2g-lab.test.ts.
   ========================================================================== */

export type GizarteMatrizeakLabToolId = 'ticket' | 'production-chain' | 'rank-slider' | 'gauss-jordan'

export interface GizarteMatrizeakLabTool extends LabToolInfo {
    id: GizarteMatrizeakLabToolId
    stage: GizarteMatrizeakStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const twin = (id: 'rank-slider' | 'gauss-jordan') => matrizeakLabTools.find((tool) => tool.id === id)!

export const gizarteMatrizeakLabTools: GizarteMatrizeakLabTool[] = [
    {
        id: 'ticket',
        stage: 'operations',
        lessonTopic: 'costs-profits',
        title: say('Tiketa', 'El ticket', 'الفاتورة', 'The receipt'),
        observe: say('Kopuruen matrizea eta prezioena biderkatzeko, lehenaren zutabeek eta bigarrenaren errenkadek produktu berak izan behar dituzte. Zortzi aukeretatik bi bakarrik egin daitezke, QP eta PᵗQᵗ, eta biek ematen dute denda bakoitzaren guztizkoa.', 'Para multiplicar la matriz de cantidades por la de precios, las columnas de la primera y las filas de la segunda tienen que ser los mismos productos. De las ocho formas solo se pueden hacer dos, QP y PᵗQᵗ, y las dos dan el total de cada tienda.', 'لضرب مصفوفة الكميات في مصفوفة الأسعار يجب أن تكون أعمدة الأولى وصفوف الثانية هي المنتجات نفسها. ومن الطرق الثماني لا يمكن إلا اثنتان، QP وPᵗQᵗ، وكلتاهما تعطي مجموع كل متجر.', 'To multiply the matrix of quantities by the prices, the columns of the first and the rows of the second must be the same products. Of the eight ways only two can be done, QP and PᵗQᵗ, and both give each shop\'s total.')
    },
    {
        id: 'production-chain',
        stage: 'operations',
        lessonTopic: 'production-chain',
        title: say('Ekoizpen-katea', 'La cadena de producción', 'سلسلة الإنتاج', 'The production chain'),
        observe: say('AB matrizeko lauki bakoitzak bezero baten bide guztiak batzen ditu: eskaera bider errezeta, produktuz produktu. BA ezin da egin, eta ez du zentzurik: katea bezeroetatik piezetara doa.', 'Cada casilla de AB suma todos los caminos de un cliente: el pedido por la receta, producto a producto. BA no se puede hacer ni tiene sentido: la cadena va de los clientes a las piezas.', 'كل خانة من AB تجمع كل مسارات زبون: الطلب في الوصفة، منتجًا منتجًا. أما BA فلا يمكن حسابه ولا معنى له: السلسلة تسير من الزبائن إلى القطع.', 'Each cell of AB adds up all the paths of a customer: the order times the recipe, product by product. BA cannot be done and makes no sense: the chain goes from the customers to the parts.')
    },
    { ...twin('rank-slider'), id: 'rank-slider', stage: 'rank' },
    { ...twin('gauss-jordan'), id: 'gauss-jordan', stage: 'inverse' }
]

export const gizarteMatrizeakLabToolForTopic: Record<string, GizarteMatrizeakLabToolId | undefined> = {
    'data-tables': 'ticket',
    'sum-scalar': 'ticket',
    'matrix-product': 'ticket',
    'product-properties': 'production-chain',
    'costs-profits': 'ticket',
    'production-chain': 'production-chain',
    'rank-gauss': 'rank-slider',
    'rank-parameter': 'rank-slider',
    'inverse-definition': 'gauss-jordan',
    'gauss-jordan': 'gauss-jordan',
    'matrix-equations': 'gauss-jordan',
    'matrix-form-system': 'gauss-jordan'
}

export const gizarteMatrizeakLabChallengeIds: number[] = [ticketChallenges, chainChallenges, rankChallenges, jordanChallenges]
    .flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

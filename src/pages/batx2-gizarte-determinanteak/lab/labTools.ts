import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { detSliderChallenges } from '../../batx2-zientziak-determinanteak/lab/detSlider.ts'
import { determinanteakLabTools } from '../../batx2-zientziak-determinanteak/lab/labTools.ts'
import { propertyChallenges } from '../../batx2-zientziak-determinanteak/lab/propertyMachine.ts'
import type { GizarteDeterminanteakStageId } from '../lessons.tsx'
import { adjugateChallenges } from './adjugate.ts'
import { bundlesChallenges } from './bundles.ts'

/* ==========================================================================
   Determinanteak (Batxilergoa 2 · Gizarte Zientziak) laboratory. Two tools
   of its own: the bundles (can the prices be found? |A| decides) and the
   adjugate cell by cell (minor, sign, cofactor, Adj A and, transposed,
   A⁻¹). The property machine and the determinant slider of the Ciencias
   twin come back as they are, with their challenges and ids (progress is
   kept under this unit's prefix). Tests in
   tests/determinanteak-batx2g-lab.test.ts.
   ========================================================================== */

export type GizarteDeterminanteakLabToolId = 'property-machine' | 'adjugate' | 'det-slider' | 'bundles'

export interface GizarteDeterminanteakLabTool extends LabToolInfo {
    id: GizarteDeterminanteakLabToolId
    stage: GizarteDeterminanteakStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const twin = (id: 'property-machine' | 'det-slider') => determinanteakLabTools.find((tool) => tool.id === id)!

export const gizarteDeterminanteakLabTools: GizarteDeterminanteakLabTool[] = [
    { ...twin('property-machine'), id: 'property-machine', stage: 'properties' },
    {
        id: 'adjugate',
        stage: 'expansion',
        lessonTopic: 'adjugate-inverse',
        title: say('Adjuntua, laukiz lauki', 'La adjunta, casilla a casilla', 'المرافقة خانةً خانة', 'The adjugate, cell by cell'),
        observe: say('Lauki baten adjuntua haren menorea da, taulako zeinuarekin. Adj A matrizean bere tokian geratzen da; A⁻¹ matrizean, berriz, (i, j) adjuntua (j, i) laukira doa, irauli egiten baita, eta |A| zenbakiaz zatitzen da.', 'El adjunto de una casilla es su menor con el signo del tablero. En Adj A se queda en su sitio; en A⁻¹, en cambio, el adjunto (i, j) pasa a la casilla (j, i), porque se traspone, y se divide entre |A|.', 'المتمم الجبري لخانة هو محددها الأصغر بإشارة اللوحة. في Adj A يبقى في مكانه؛ أما في A⁻¹ فينتقل المتمم (i، j) إلى الخانة (j، i) لأن المصفوفة تُنقل، ويُقسم على |A|.', 'The cofactor of a cell is its minor with the sign of the board. In Adj A it stays in its place; in A⁻¹, though, cofactor (i, j) moves to cell (j, i), because it is transposed, and is divided by |A|.')
    },
    { ...twin('det-slider'), id: 'det-slider', stage: 'inverse' },
    {
        id: 'bundles',
        stage: 'inverse',
        lessonTopic: 'unique-prices',
        title: say('Ondoriozta daitezke prezioak?', '¿Se deducen los precios?', 'هل تُستنتج الأسعار؟', 'Can the prices be found?'),
        observe: say('Sorta bakoitza A matrizeko errenkada bat da. |A| ≠ 0 denean, prezioak bakarrak dira eta ateratzen dira. Sorta bat beste baten multiploa edo besteen nahasketa denean, |A| = 0 da: sorta horrek ez du ezer berririk esaten, eta datuek ez dituzte prezioak finkatzen.', 'Cada lote es una fila de A. Cuando |A| ≠ 0, los precios son únicos y salen. Cuando un lote es múltiplo de otro o mezcla de los demás, |A| = 0: ese lote no dice nada nuevo y los datos no fijan los precios.', 'كل مجموعة صف من A. عندما يكون |A| ≠ 0 تكون الأسعار وحيدة وتُستخرج. وعندما تكون مجموعة مضاعفًا لأخرى أو مزيجًا من البقية يكون |A| = 0: تلك المجموعة لا تقول شيئًا جديدًا والمعطيات لا تحدد الأسعار.', 'Each bundle is a row of A. When |A| ≠ 0, the prices are unique and come out. When a bundle is a multiple of another or a mix of the rest, |A| = 0: that bundle says nothing new and the data do not fix the prices.')
    }
]

export const gizarteDeterminanteakLabToolForTopic: Record<string, GizarteDeterminanteakLabToolId | undefined> = {
    'zero-det': 'bundles',
    'transpose-swap': 'property-machine',
    'scale-row': 'property-machine',
    'add-multiple': 'property-machine',
    'minors-cofactors': 'adjugate',
    laplace: 'adjugate',
    'adjugate-inverse': 'adjugate',
    'inverse-parameter': 'det-slider',
    'det-matrix-equations': 'property-machine',
    'unique-prices': 'bundles'
}

export const gizarteDeterminanteakLabChallengeIds: number[] = [propertyChallenges, adjugateChallenges, detSliderChallenges, bundlesChallenges]
    .flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

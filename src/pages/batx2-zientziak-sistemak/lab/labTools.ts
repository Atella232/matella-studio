import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { bachSystemsLabTools } from '../../batx1-zientziak-sistemak/lab/labTools.ts'
import { familyChallenges } from '../../batx1-zientziak-sistemak/lab/solutionFamily.ts'
import type { SistemakStageId } from '../lessons.tsx'
import { cramerChallenges } from './cramerMachine.ts'
import { discussionChallenges } from './discussionMap.ts'
import { roucheChallenges } from './roucheLight.ts'
import { linesChallenges } from './threeLines.ts'

/* ==========================================================================
   Sistemak (Batxilergoa 2 · Zientziak) laboratory. Four tools of its own:
   the Rouché traffic light (change A* and see the type), three lines (the
   ranks in the plane), the Cramer machine (column B into the column of an
   unknown) and the map of the discussion (the type for every a). The
   family of solutions of 1.º Bachillerato comes back as it is (M1), with
   its challenges and ids; progress is kept under this unit's prefix.
   Tests in tests/sistemak-batx2z-lab.test.ts.
   ========================================================================== */

export type SistemakLabToolId = 'rouche-light' | 'three-lines' | 'cramer-machine' | 'solution-family' | 'discussion-map'

export interface SistemakLabTool extends LabToolInfo {
    id: SistemakLabToolId
    stage: SistemakStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const solutionFamily = bachSystemsLabTools.find((tool) => tool.id === 'solution-family')!

export const sistemakLabTools: SistemakLabTool[] = [
    {
        id: 'rouche-light',
        stage: 'rouche',
        lessonTopic: 'rouche-theorem',
        title: say('Rouchéren semaforoa', 'El semáforo de Rouché', 'إشارة روشيه', 'The Rouché traffic light'),
        observe: say('Gai aske bat aldatzean, A matrizearen heina ez da aldatzen, baina A* matrizearena bai, alda daiteke. Heinak desberdinak direnean, gorria: bateraezina. Berdinak eta 3 baino txikiagoak, horia: infinitu soluzio. Biak 3, berdea: soluzio bakarra.', 'Al cambiar un término independiente, el rango de A no cambia, pero el de A* puede cambiar. Rangos distintos, rojo: incompatible. Iguales y menores que 3, ámbar: infinitas soluciones. Los dos 3, verde: una sola solución.', 'عند تغيير حد ثابت لا تتغير رتبة A، لكن رتبة A* قد تتغير. رتبتان مختلفتان، أحمر: غير متوافق. متساويتان وأصغر من 3، كهرماني: حلول لا نهائية. كلتاهما 3، أخضر: حل واحد.', 'Changing a constant term does not change the rank of A, but the rank of A* can change. Different ranks, red: inconsistent. Equal and less than 3, amber: infinitely many solutions. Both 3, green: one solution.')
    },
    {
        id: 'three-lines',
        stage: 'rouche',
        lessonTopic: 'geometric-meaning',
        title: say('Hiru zuzen', 'Tres rectas', 'ثلاثة مستقيمات', 'Three lines'),
        observe: say('Ekuazio bakoitza zuzen bat da. Puntu batean ebakitzen badira, bi heinak 2 dira. Triangelu bat osatzen badute edo bi paraleloak badira, A* matrizearen heina 3 da, eta ez dago puntu komunik.', 'Cada ecuación es una recta. Si se cortan en un punto, los dos rangos valen 2. Si forman un triángulo o dos son paralelas, el rango de A* es 3 y no hay punto común.', 'كل معادلة مستقيم. إذا تقاطعت في نقطة فالرتبتان 2. وإذا شكّلت مثلثًا أو كان اثنان متوازيين فرتبة A* هي 3 ولا نقطة مشتركة.', 'Each equation is a line. If they meet at one point, both ranks are 2. If they make a triangle or two are parallel, the rank of A* is 3 and there is no common point.')
    },
    {
        id: 'cramer-machine',
        stage: 'cramer',
        lessonTopic: 'cramer-rule',
        title: say('Cramerren makina', 'La máquina de Cramer', 'آلة كرامر', 'The Cramer machine'),
        observe: say('Ezezagun bat kalkulatzeko, B zutabea haren zutabearen lekuan sartzen da. Izendatzailea beti |A| da, eta ez da aldatzen; B aldatzean, zenbakitzailea bakarrik aldatzen da.', 'Para una incógnita, la columna B entra en el lugar de su columna. El denominador es siempre |A| y no cambia; al cambiar B, solo cambia el numerador.', 'لحساب مجهول يدخل العمود B مكان عموده. المقام دائمًا |A| ولا يتغير؛ وعند تغيير B يتغير البسط فقط.', 'For an unknown, the column B goes into the place of its column. The denominator is always |A| and does not change; changing B changes only the numerator.')
    },
    { ...solutionFamily, id: 'solution-family', stage: 'cramer', lessonTopic: 'cramer-indeterminate' },
    {
        id: 'discussion-map',
        stage: 'discussion',
        lessonTopic: 'parameter-ranks',
        title: say('Eztabaidaren mapa', 'El mapa de la discusión', 'خريطة المناقشة', 'The discussion map'),
        observe: say('Ia a guztietan sistema bateragarri determinatua da. |A| zero egiten duten balioetan bakarrik alda daiteke mota: hor, heinek esaten dute indeterminatua ala bateraezina den.', 'Con casi todos los valores de a el sistema es compatible determinado. Solo en los que anulan |A| puede cambiar el tipo: ahí los rangos dicen si es indeterminado o incompatible.', 'مع كل قيم a تقريبًا يكون النظام متوافقًا محددًا. ولا يتغير النوع إلا في القيم التي تعدم |A|: هناك تقول الرتب هل هو غير محدد أم غير متوافق.', 'For almost every value of a the system is consistent and independent. Only where |A| is zero can the type change: there the ranks say whether it is dependent or inconsistent.')
    }
]

export const sistemakLabToolForTopic: Record<string, SistemakLabToolId | undefined> = {
    'matrix-form': 'rouche-light',
    'rouche-theorem': 'rouche-light',
    'rank-classify': 'rouche-light',
    'geometric-meaning': 'three-lines',
    'cramer-rule': 'cramer-machine',
    'cramer-indeterminate': 'solution-family',
    'inverse-solve': 'cramer-machine',
    'homogeneous-trivial': 'three-lines',
    'homogeneous-parameter': 'discussion-map',
    'parameter-determinant': 'discussion-map',
    'parameter-ranks': 'discussion-map',
    'parameter-solve': 'discussion-map',
    'extra-equations': 'three-lines',
    'word-problems': 'cramer-machine',
    'parameter-problems': 'discussion-map'
}

export const sistemakLabChallengeIds: number[] = [
    roucheChallenges,
    linesChallenges,
    cramerChallenges,
    familyChallenges,
    discussionChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

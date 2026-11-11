import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { matrizeakLabTools } from '../../batx2-zientziak-matrizeak/lab/labTools.ts'
import { rankChallenges } from '../../batx2-zientziak-matrizeak/lab/rankSlider.ts'
import type { DeterminanteakStageId } from '../lessons.tsx'
import { detSliderChallenges } from './detSlider.ts'
import { parallelogramChallenges } from './parallelogram.ts'
import { propertyChallenges } from './propertyMachine.ts'
import { signBoardChallenges } from './signBoard.ts'

/* ==========================================================================
   Determinanteak (Batxilergoa 2 · Zientziak) laboratory. Four tools of
   its own: the parallelogram (|A| as a signed area), the property machine
   (what a row operation does to |A|), the sign board (expanding along the
   line with most zeros) and the determinant slider (|A(k)| as a curve and
   the k with no inverse). The rank slider of Matrizeak comes back as it
   is (M1), with its challenges and ids; progress is kept under this
   unit's prefix. Tests in tests/determinanteak-batx2z-lab.test.ts.
   ========================================================================== */

export type DeterminanteakLabToolId = 'parallelogram' | 'property-machine' | 'sign-board' | 'rank-slider' | 'det-slider'

export interface DeterminanteakLabTool extends LabToolInfo {
    id: DeterminanteakLabToolId
    stage: DeterminanteakStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const rankSlider = matrizeakLabTools.find((tool) => tool.id === 'rank-slider')!

export const determinanteakLabTools: DeterminanteakLabTool[] = [
    {
        id: 'parallelogram',
        stage: 'orders',
        lessonTopic: 'det-two',
        title: say('Paralelogramoa', 'El paralelogramo', 'متوازي الأضلاع', 'The parallelogram'),
        observe: say('Matrizearen bi zutabeak bi gezi dira. Haien paralelogramoaren azalera da determinantea, zeinuarekin: positiboa, v gezia u geziaren ezkerraldera biratuta dagoenean; negatiboa, eskuinaldera dagoenean; eta zero, biak lerro berean daudenean.', 'Las dos columnas de la matriz son dos flechas. El área de su paralelogramo es el determinante, con signo: positivo si v está girada a la izquierda de u, negativo si está a la derecha, y cero si las dos están en la misma recta.', 'عمودا المصفوفة سهمان. ومساحة متوازي الأضلاع الذي يشكّلانه هي المحدد بإشارته: موجبة إذا كان v مُدارًا إلى يسار u، وسالبة إذا كان إلى يمينه، وصفر إذا كان السهمان على المستقيم نفسه.', 'The two columns of the matrix are two arrows. The area of their parallelogram is the determinant, with a sign: positive if v is turned to the left of u, negative if it is to the right, and zero if both lie on the same line.')
    },
    {
        id: 'property-machine',
        stage: 'properties',
        lessonTopic: 'add-multiple',
        title: say('Propietateen makina', 'La máquina de propiedades', 'آلة الخواص', 'The property machine'),
        observe: say('Bi errenkada trukatzean, zeinua aldatzen da. Errenkada bat k zenbakiaz biderkatzean, determinantea ere k zenbakiaz biderkatzen da. Beste errenkada baten multiplo bat batzean, ez da aldatzen: horrela zeroak egiten dira, eta matrize triangeluarrean diagonaleko biderkadura da determinantea.', 'Al cambiar dos filas cambia el signo. Al multiplicar una fila por k, el determinante también se multiplica por k. Al sumar un múltiplo de otra fila no cambia: así se hacen ceros, y en una matriz triangular el determinante es el producto de la diagonal.', 'تبديل صفين يغيّر الإشارة. وضرب صف في k يضرب المحدد في k أيضًا. وإضافة مضاعف صف آخر لا تغيّره: هكذا تُصنع الأصفار، وفي المصفوفة المثلثية يكون المحدد حاصل ضرب القطر.', 'Swapping two rows changes the sign. Multiplying a row by k multiplies the determinant by k too. Adding a multiple of another row does not change it: that is how zeros are made, and in a triangular matrix the determinant is the product of the diagonal.')
    },
    {
        id: 'sign-board',
        stage: 'expansion',
        lessonTopic: 'laplace',
        title: say('Zeinuen taula', 'El tablero de signos', 'لوحة الإشارات', 'The sign board'),
        observe: say('Adjuntu bakoitzak taulako zeinua du: plus eta minus, xake-taula batean bezala. Edozein lerroren arabera garatuta, emaitza bera ateratzen da; lerroko zero bakoitzak adjuntu bat aurrezten du.', 'Cada adjunto lleva el signo del tablero: más y menos, como en un tablero de ajedrez. Desarrollando por cualquier línea sale lo mismo; cada cero de la línea ahorra un adjunto.', 'لكل متمم جبري إشارة اللوحة: موجب وسالب كما في رقعة الشطرنج. والنشر حسب أي خط يعطي النتيجة نفسها؛ وكل صفر في الخط يوفّر متممًا جبريًا.', 'Each cofactor carries the sign of the board: plus and minus, as on a chessboard. Expanding along any line gives the same; each zero in the line saves one cofactor.')
    },
    { ...rankSlider, id: 'rank-slider', stage: 'rank', lessonTopic: 'rank-parameter-minors' },
    {
        id: 'det-slider',
        stage: 'inverse',
        lessonTopic: 'inverse-parameter',
        title: say('Determinantea, k aldatzean', 'El deslizador del determinante', 'منزلقة المحدد', 'The determinant slider'),
        observe: say('k mugitzean, determinantea k aldagaiaren polinomio bat da, kurba bat. Kurbak ardatza mozten edo ukitzen duen tokietan, determinantea zero da, eta matrizeak ez du alderantzizkorik; beste k guztietan, badu.', 'Al mover k, el determinante es un polinomio en k, una curva. Donde la curva corta o toca el eje, el determinante vale cero y la matriz no tiene inversa; con todas las demás k, sí la tiene.', 'عند تحريك k يكون المحدد كثير حدود في k، أي منحنى. وحيث يقطع المنحنى المحور أو يمسّه يكون المحدد صفرًا وليس للمصفوفة معكوس؛ ومع كل قيم k الأخرى يكون لها معكوس.', 'As k moves, the determinant is a polynomial in k, a curve. Where the curve crosses or touches the axis, the determinant is zero and the matrix has no inverse; for every other k, it has one.')
    }
]

export const determinanteakLabToolForTopic: Record<string, DeterminanteakLabToolId | undefined> = {
    'det-two': 'parallelogram',
    sarrus: 'sign-board',
    'zero-det': 'parallelogram',
    'transpose-swap': 'property-machine',
    'scale-row': 'property-machine',
    'add-multiple': 'property-machine',
    'product-det': 'parallelogram',
    'minors-cofactors': 'sign-board',
    laplace: 'sign-board',
    'order-four': 'sign-board',
    'det-equations': 'det-slider',
    'rank-by-minors': 'rank-slider',
    'rank-parameter-minors': 'rank-slider',
    'adjugate-inverse': 'det-slider',
    'inverse-parameter': 'det-slider',
    'det-matrix-equations': 'property-machine'
}

export const determinanteakLabChallengeIds: number[] = [
    parallelogramChallenges,
    propertyChallenges,
    signBoardChallenges,
    rankChallenges,
    detSliderChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

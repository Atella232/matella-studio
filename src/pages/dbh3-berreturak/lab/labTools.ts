import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import {
    intervalsChallenges,
    powersChallenges,
    radicalsChallenges,
    realsLabTools,
    roundingChallenges,
    scientificChallenges,
    zoomChallenges
} from '../../dbh4-aplikatuak-errealak/lab/labTools.ts'
import type { PowersStageId } from '../lessons.tsx'
import { scaleChallenges } from './scale.ts'
import { spiralChallenges } from './spiral.ts'
import { squareChallenges } from './square.ts'
import { tokensChallenges } from './tokens.ts'

/* ==========================================================================
   Berreturak eta erroak (3. DBH) laboratory. Four tools are new and belong
   to this topic: the tokens that cancel in aᵐ · aⁿ : aᵖ, the square whose
   side is √n, the strip of powers of ten with real objects, and the spiral
   of roots. The ladder of powers, the jumps of the comma, simplifying a
   radical, zooming into the real line, intervals and rounding come from
   4. DBH aplikatuak with their own challenges. Tests in
   tests/berreturak-dbh3-lab.test.ts.
   ========================================================================== */

export type PowersLabToolId = 'tokens' | 'powers' | 'scale' | 'scientific' | 'square' | 'radicals' | 'spiral' | 'zoom' | 'intervals' | 'rounding'

export interface PowersLabTool extends LabToolInfo {
    id: PowersLabToolId
    stage: PowersStageId
}

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })

/** A tool of the 4. DBH aplikatuak laboratory, put in this unit's stage and lesson */
const borrowed = (id: PowersLabToolId, stage: PowersStageId, lessonTopic: string): PowersLabTool => {
    const tool = realsLabTools.find((candidate) => candidate.id === id)
    if (!tool) throw new Error(`No borrowed tool ${id}`)
    return { ...tool, id, stage, lessonTopic }
}

export const powersLabTools: PowersLabTool[] = [
    { id: 'tokens', stage: 'powers', lessonTopic: 'power-rules', title: say('Faktore-fitxak', 'Las fichas de factores', 'رقاقات العوامل'), observe: say('Goiko fitxak eta beheko fitxak bikoteka kentzen dira. Geratzen direnak dira emaitzaren berretzailea: goian bada positiboa, behean bada negatiboa.', 'Las fichas de arriba y las de abajo se anulan por parejas. Las que sobran son el exponente del resultado: positivo si están arriba, negativo si están abajo.', 'تتلاشى الرقاقات العلوية والسفلية بالأزواج. وما يبقى هو أس النتيجة: موجب إن كان في الأعلى وسالب إن كان في الأسفل.') },
    borrowed('powers', 'powers', 'negative-zero'),
    { id: 'scale', stage: 'scientific', lessonTopic: 'sci-compare', title: say('Magnitude-eskala', 'La escala de magnitudes', 'سُلّم المقادير'), observe: say('Iragarri objektu baten tamainaren berretzailea eta egiaztatu. Berretzaile bakoitzak magnitude-ordena bat jauzten du: 10 aldiz handiagoa.', 'Predice el exponente del tamaño de un objeto y compruébalo. Cada exponente es un salto de orden de magnitud: 10 veces mayor.', 'توقّع أس حجم الجسم ثم تحقق منه. كل أس قفزة في رتبة المقدار: عشرة أضعاف.') },
    borrowed('scientific', 'scientific', 'sci-write'),
    { id: 'square', stage: 'roots', lessonTopic: 'extract', title: say('Erroaren karratua', 'El cuadrado de la raíz', 'مربع الجذر'), observe: say('√n azalera n duen karratuaren aldea da. Aukeratu bloke baten aldea: blokeek azalera osoa betetzen badute, aldea errotik ateratzen da.', '√n es el lado de un cuadrado de área n. Elige el lado de un bloque: si los bloques llenan el área exacta, ese lado sale de la raíz.', '√n هو ضلع مربع مساحته n. اختر ضلع كتلة: إذا ملأت الكتل المساحة تمامًا خرج هذا الضلع من الجذر.') },
    borrowed('radicals', 'roots', 'radical-ops'),
    { id: 'spiral', stage: 'reals', lessonTopic: 'real-line', title: say('Erroen espirala', 'La espiral de raíces', 'حلزون الجذور'), observe: say('Triangelu zuzen bakoitzak aldeak √k eta 1 ditu, eta hipotenusa √(k+1) da. Konpasarekin zuzenera eramanda, √n puntu zehatz bat da.', 'Cada triángulo rectángulo tiene catetos √k y 1, y su hipotenusa mide √(k+1). Llevada a la recta con el compás, √n es un punto exacto.', 'لكل مثلث قائم ضلعان √k و1 ووتره √(k+1). وبعد نقله إلى المستقيم بالفرجار تصير √n نقطة محددة.') },
    borrowed('zoom', 'reals', 'irrational'),
    borrowed('intervals', 'reals', 'intervals'),
    borrowed('rounding', 'approx', 'rounding')
]

export const powersLabToolForTopic: Record<string, PowersLabToolId | undefined> = {
    'power-sign': 'powers',
    'negative-zero': 'powers',
    'power-rules': 'tokens',
    'sci-write': 'scientific',
    'sci-compare': 'scale',
    'sci-ops': 'scientific',
    roots: 'square',
    extract: 'square',
    introduce: 'square',
    'radical-ops': 'radicals',
    irrational: 'zoom',
    'real-line': 'spiral',
    intervals: 'intervals',
    rounding: 'rounding',
    errors: 'rounding'
}

export const powersLabChallengeIds: number[] = [
    tokensChallenges,
    powersChallenges,
    scaleChallenges,
    scientificChallenges,
    squareChallenges,
    radicalsChallenges,
    spiralChallenges,
    zoomChallenges,
    intervalsChallenges,
    roundingChallenges
].flatMap((list) => list.map((challenge) => challenge.id))

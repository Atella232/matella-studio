import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { figuresLabTools, polygonChallenges, sectorChallenges } from '../../dbh1-figurak-v2/lab/labTools.ts'
import { figureChallenges, pythagorasLabTools, squaresChallenges } from '../../dbh2-pitagoras-v2/lab/labTools.ts'
import { areasVolumesLabTools, regularChallenges } from '../../dbh4-aplikatuak-areak/lab/labTools.ts'
import { similarityLabTools, thalesChallenges } from '../../dbh4-aplikatuak-antzekotasuna/lab/labTools.ts'
import type { Geometry3StageId } from '../lessons.tsx'
import { enlargeChallenges } from './enlarge.ts'
import { inscribedChallenges } from './inscribed.ts'
import { ladderChallenges } from './ladder.ts'
import { notableChallenges } from './notable.ts'

/* ==========================================================================
   Planoko geometria (3. DBH) laboratory. Four tools are new and belong to
   this unit: the inscribed angle that stays the same while P moves, the
   notable points of a triangle with a vertex to move, the ladder that
   slides down the wall and the enlarged copy whose area grows by k². The
   angle sums and the sector come from 1. DBH, the squares and the shapes
   from 2. DBH Pitagoras, the regular polygon from 4. DBH aplikatuak and
   Thales from 4. DBH aplikatuak Antzekotasuna, with their own challenges.
   Tests in tests/geometria-dbh3-lab.test.ts.
   ========================================================================== */

export type Geometry3LabToolId = 'polygon' | 'inscribed' | 'notable' | 'squares' | 'figure' | 'ladder' | 'regular' | 'sector' | 'thales' | 'enlarge'

export interface Geometry3LabTool extends LabToolInfo {
    id: Geometry3LabToolId
    stage: Geometry3StageId
}

/** Arabic text runs right to left: every formula in it (P, k², 2·…) is isolated left to right and kept on one line */
const isolate = (text: string) => text.replace(/[A-Za-z0-9(][A-Za-z0-9²³ ()+\-−·=°]*[A-Za-z0-9²³°)]|[A-Za-z]/g, (formula) => `⁦${formula.replace(/ /g, ' ')}⁩`)
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: isolate(ar) })

/** A tool of an earlier laboratory, put in this unit's stage and lesson */
function borrowed(list: LabToolInfo[], id: Geometry3LabToolId, stage: Geometry3StageId, lessonTopic: string): Geometry3LabTool {
    const tool = list.find((candidate) => candidate.id === id)
    if (!tool) throw new Error(`No borrowed tool ${id}`)
    return { ...tool, id, stage, lessonTopic }
}

export const geometry3LabTools: Geometry3LabTool[] = [
    borrowed(figuresLabTools, 'polygon', 'angles', 'polygon-angles'),
    { id: 'inscribed', stage: 'angles', lessonTopic: 'circle-angles', title: say('Angelu inskribatua', 'El ángulo inscrito', 'الزاوية المحيطية', 'The inscribed angle'), observe: say('P puntua arku berean mugitzean, angelua ez da aldatzen: angelu zentralaren erdia da. P beste arkura pasatzean, 180° ken erdi hori bihurtzen da. A eta B diametro baten muturrak badira, angelua beti zuzena da.', 'Al mover P por el mismo arco, el ángulo no cambia: es la mitad del central. Al pasar P al otro arco, pasa a ser 180° menos esa mitad. Si A y B son los extremos de un diámetro, el ángulo siempre es recto.', 'عند تحريك P على القوس نفسه لا تتغيّر الزاوية: إنها نصف المركزية. وعند انتقال P إلى القوس الآخر تصير 180° ناقص ذلك النصف. وإذا كان A وB طرفي قطر فالزاوية قائمة دائمًا.', 'Moving P along the same arc, the angle does not change: it is half the central angle. When P crosses to the other arc, it becomes 180° minus that half. If A and B are the ends of a diameter, the angle is always a right angle.') },
    { id: 'notable', stage: 'loci', lessonTopic: 'notable-points', title: say('Puntu nabarmenak', 'Los puntos notables', 'النقاط الشهيرة', 'The notable points'), observe: say('C erpina mugitzean, lau puntuak mugitzen dira. Inzentroa eta barizentroa beti barruan geratzen dira; zirkunzentroa eta ortozentroa kanpora ateratzen dira triangelua kamutsa denean, eta ertzera iristen dira zuzena denean.', 'Al mover el vértice C se mueven los cuatro puntos. El incentro y el baricentro se quedan siempre dentro; el circuncentro y el ortocentro salen fuera cuando el triángulo es obtusángulo y llegan al borde cuando es rectángulo.', 'عند تحريك الرأس C تتحرك النقاط الأربع. يبقى مركز الدائرة المحاطة ومركز الثقل في الداخل دائمًا، ويخرج مركز الدائرة المحيطة وملتقى الارتفاعات عندما يكون المثلث منفرجًا، ويبلغان الحافة عندما يكون قائمًا.', 'Moving vertex C moves all four points. The incentre and the centroid always stay inside; the circumcentre and the orthocentre go outside when the triangle is obtuse and reach the edge when it is right-angled.') },
    borrowed(pythagorasLabTools, 'squares', 'pythagoras', 'pythagoras'),
    borrowed(pythagorasLabTools, 'figure', 'pythagoras', 'pythagoras-figures'),
    { id: 'ladder', stage: 'pythagoras', lessonTopic: 'pythagoras-problems', title: say('Eskailera horman', 'La escalera en la pared', 'السلّم على الجدار', 'The ladder against the wall'), observe: say('Eskailerak beti luzera bera du: hipotenusa. Oina hormatik urruntzean, goiko muturra jaisten da, baina ez abiadura berean: hormatik hurbil gutxi jaisten da eta lurretik hurbil asko.', 'La escalera siempre mide lo mismo: es la hipotenusa. Al alejar el pie de la pared, la parte de arriba baja, pero no al mismo ritmo: cerca de la pared baja poco y cerca del suelo mucho.', 'للسلّم الطول نفسه دائمًا: إنه الوتر. وعند إبعاد القدم عن الجدار ينزل الطرف العلوي، لكن لا بالسرعة نفسها: قرب الجدار ينزل قليلًا وقرب الأرض كثيرًا.', 'The ladder always has the same length: it is the hypotenuse. Moving the foot away from the wall brings the top down, but not at the same pace: near the wall it drops little and near the floor a lot.') },
    borrowed(areasVolumesLabTools, 'regular', 'areas', 'regular-area'),
    borrowed(figuresLabTools, 'sector', 'areas', 'circle-areas'),
    borrowed(similarityLabTools, 'thales', 'similarity', 'thales'),
    { id: 'enlarge', stage: 'similarity', lessonTopic: 'scale-areas', title: say('Irudiak handitu', 'Ampliar figuras', 'تكبير الأشكال', 'Enlarging shapes'), observe: say('k arrazoiarekin, alde guztiak k aldiz luzeagoak dira eta perimetroa ere bai. Azalera, berriz, k² aldiz handiagoa da: k = 2 denean laukoiztu egiten da, eta k = 0,5 denean laurdena da.', 'Con razón k, todos los lados son k veces más largos y el perímetro también. El área, en cambio, es k² veces mayor: con k = 2 se multiplica por 4, y con k = 0,5 se queda en la cuarta parte.', 'بالنسبة k تصير كل الأضلاع أطول k مرة وكذلك المحيط. أما المساحة فأكبر k² مرة: مع k = 2 تُضرب في 4، ومع k = 0.5 تصير الربع.', 'With factor k, every side is k times longer and so is the perimeter. The area, though, is k² times larger: with k = 2 it is multiplied by 4, and with k = 0.5 it is a quarter.') }
]

export const geometry3LabToolForTopic: Record<string, Geometry3LabToolId | undefined> = {
    'polygon-angles': 'polygon',
    'regular-polygons': 'polygon',
    'circle-angles': 'inscribed',
    'perpendicular-bisector': 'notable',
    'angle-bisector': 'notable',
    'notable-points': 'notable',
    pythagoras: 'squares',
    'pythagoras-figures': 'figure',
    'pythagoras-problems': 'ladder',
    'polygon-areas': 'figure',
    'regular-area': 'regular',
    'circle-areas': 'sector',
    thales: 'thales',
    'similar-triangles': 'thales',
    'scale-areas': 'enlarge'
}

export const geometry3LabChallengeIds: number[] = [polygonChallenges, inscribedChallenges, notableChallenges, squaresChallenges, figureChallenges, ladderChallenges, regularChallenges, sectorChallenges, thalesChallenges, enlargeChallenges].flatMap((list) => list.map((challenge) => challenge.id))

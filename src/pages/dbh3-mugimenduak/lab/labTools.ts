import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { figuresLabTools, tilingChallenges } from '../../dbh1-figurak-v2/lab/labTools.ts'
import { combinationChallenges, vectorChallenges, vectorsLabTools } from '../../dbh4-akademikoak-bektoreak/lab/labTools.ts'
import { homothetyChallenges, similarityLabTools } from '../../dbh4-aplikatuak-antzekotasuna/lab/labTools.ts'
import type { Motions3StageId } from '../lessons.tsx'
import { mirrorChallenges } from './mirror.ts'
import { slideChallenges } from './slide.ts'
import { turnChallenges } from './turn.ts'
import { twoMirrorsChallenges } from './twoMirrors.ts'

/* ==========================================================================
   Planoko mugimenduak (3. DBH) laboratory. Four tools are new and belong
   to this unit: slide the flag with a vector, turn it about a centre,
   reflect it in a mirror and reflect it in two mirrors. The vector and
   the sum of vectors come from 4. DBH akademikoak Bektoreak, the tiles
   round a vertex from 1. DBH Figurak and the enlargement from 4. DBH
   aplikatuak Antzekotasuna, with their own challenges. Tests in
   tests/mugimenduak-dbh3-lab.test.ts.
   ========================================================================== */

export type Motions3LabToolId = 'vector' | 'combination' | 'slide' | 'turn' | 'mirror' | 'two-mirrors' | 'tiling' | 'homothety'

export interface Motions3LabTool extends LabToolInfo {
    id: Motions3LabToolId
    stage: Motions3StageId
}

/** Arabic text runs right to left: every formula in it (P′, 2d, x = k) is isolated left to right and kept on one line */
const isolate = (text: string) => text.replace(/[A-Za-z0-9(][A-Za-z0-9²³′ ()+\-−·=°]*[A-Za-z0-9²³°′)]|[A-Za-z]/g, (formula) => `⁦${formula.replace(/ /g, ' ')}⁩`)
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: isolate(ar) })

/** A tool of an earlier laboratory, put in this unit's stage and lesson */
function borrowed(list: LabToolInfo[], id: Motions3LabToolId, stage: Motions3StageId, lessonTopic: string): Motions3LabTool {
    const tool = list.find((candidate) => candidate.id === id)
    if (!tool) throw new Error(`No borrowed tool ${id}`)
    return { ...tool, id, stage, lessonTopic }
}

export const motions3LabTools: Motions3LabTool[] = [
    borrowed(vectorsLabTools, 'vector', 'vectors', 'vector-components'),
    borrowed(vectorsLabTools, 'combination', 'vectors', 'vector-sum'),
    { id: 'slide', stage: 'translations', lessonTopic: 'translation', title: say('Lekualdatu bandera', 'Desliza la bandera', 'انقل العلم', 'Slide the flag'), observe: say('Banderaren puntu guztiak bektore berarekin mugitzen dira: bandera ez da biratzen ezta iraultzen. Puntu bakoitzak bektorearen modulua adina egiten du.', 'Todos los puntos de la bandera se mueven con el mismo vector: la bandera no gira ni se da la vuelta. Cada punto recorre el módulo del vector.', 'تتحرك كل نقاط العلم بالمتجه نفسه: لا يدور العلم ولا ينقلب. وتقطع كل نقطة طول المتجه.', 'Every point of the flag moves by the same vector: the flag neither turns nor flips. Each point travels the length of the vector.') },
    { id: 'turn', stage: 'rotations', lessonTopic: 'rotation', title: say('Biratu bandera', 'Gira la bandera', 'أدِر العلم', 'Turn the flag'), observe: say('Puntu bakoitzak zirkunferentzia bat egiten du zentroaren inguruan, eta zentrorako distantzia ez da aldatzen. 180° biratzean, simetria zentrala lortzen da.', 'Cada punto recorre una circunferencia alrededor del centro y su distancia al centro no cambia. Al girar 180° se obtiene la simetría central.', 'تقطع كل نقطة دائرة حول المركز ولا يتغيّر بعدها عنه. وعند الدوران 180° نحصل على التناظر المركزي.', 'Each point travels round a circle about the centre and its distance to the centre does not change. Turning by 180° gives the central symmetry.') },
    { id: 'mirror', stage: 'reflections', lessonTopic: 'axial-symmetry', title: say('Ispilua', 'El espejo', 'المرآة', 'The mirror'), observe: say('Ispiluak bandera iraultzen du. Puntu bakoitza ispiluaren beste aldera doa, distantzia berera; ispilua puntuaren eta haren irudiaren arteko erdibitzailea da.', 'El espejo da la vuelta a la bandera. Cada punto pasa al otro lado del espejo, a la misma distancia; el espejo es la mediatriz entre el punto y su imagen.', 'تقلب المرآة العلم. تنتقل كل نقطة إلى الجهة الأخرى من المرآة على البعد نفسه؛ والمرآة هي المنصّف العمودي بين النقطة وصورتها.', 'The mirror flips the flag. Each point goes to the other side of the mirror, at the same distance; the mirror is the perpendicular bisector between a point and its image.') },
    { id: 'two-mirrors', stage: 'reflections', lessonTopic: 'two-mirrors', title: say('Bi ispilu', 'Dos espejos', 'مرآتان', 'Two mirrors'), observe: say('Bi aldiz islatzean, bandera berriro zuzen geratzen da. Ispilu paraleloekin lekualdaketa bat da, distantziaren bikoitza; ebakitzen direnean, biraketa bat, angeluaren bikoitza.', 'Al reflejar dos veces, la bandera vuelve a quedar del derecho. Con espejos paralelos es una traslación del doble de la distancia; si se cortan, un giro del doble del ángulo.', 'عند العكس مرتين يعود العلم إلى وضعه الصحيح. مع مرآتين متوازيتين انسحاب بضعف المسافة، ومع مرآتين متقاطعتين دوران بضعف الزاوية.', 'Reflecting twice puts the flag the right way round again. With parallel mirrors it is a translation of twice the distance; with crossing mirrors, a rotation of twice the angle.') },
    borrowed(figuresLabTools, 'tiling', 'patterns', 'tessellations'),
    borrowed(similarityLabTools, 'homothety', 'patterns', 'homothety')
]

export const motions3LabToolForTopic: Record<string, Motions3LabToolId | undefined> = {
    'vector-components': 'vector',
    'vector-modulus': 'vector',
    'vector-sum': 'combination',
    translation: 'slide',
    'translation-coordinates': 'slide',
    'translation-composition': 'combination',
    rotation: 'turn',
    'rotation-coordinates': 'turn',
    'central-symmetry': 'turn',
    'axial-symmetry': 'mirror',
    'reflection-coordinates': 'mirror',
    'two-mirrors': 'two-mirrors',
    friezes: 'slide',
    tessellations: 'tiling',
    homothety: 'homothety'
}

export const motions3LabChallengeIds: number[] = [vectorChallenges, combinationChallenges, slideChallenges, turnChallenges, mirrorChallenges, twoMirrorsChallenges, tilingChallenges, homothetyChallenges].flatMap((list) => list.map((challenge) => challenge.id))

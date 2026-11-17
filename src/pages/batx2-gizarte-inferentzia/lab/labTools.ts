import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { bandChallenges } from '../../batx2-gizarte-banaketak/lab/band.ts'
import { distributionsBatx2gLabTools } from '../../batx2-gizarte-banaketak/lab/labTools.ts'
import { lookupChallenges } from '../../batx2-zientziak-banaketak/lab/lookup.ts'
import type { InferenceBatx2gStageId } from '../lessons.tsx'
import { hundredChallenges } from './hundred.ts'
import { marginChallenges } from './margin.ts'

/* ==========================================================================
   Inferentzia (Batxilergoa 2 · Gizarte Zientziak) laboratory. Two tools of
   its own: a hundred intervals (how many of 100 confidence intervals
   catch μ) and the margin of error (level, σ or p̂, and n, against the
   95 % interval). Two come with their challenges and ids from Banaketak:
   the normal table of 2.º Ciencias and the band of k % of 2.º Sociales.
   Tests in tests/inferentzia-batx2g-lab.test.ts.
   ========================================================================== */

export type InferenceBatx2gLabToolId = 'lookup' | 'band' | 'hundred' | 'margin'

export interface InferenceBatx2gLabTool extends LabToolInfo {
    id: InferenceBatx2gLabToolId
    stage: InferenceBatx2gStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const borrowed = (id: string) => distributionsBatx2gLabTools.find((tool) => tool.id === id)!

export const inferenceBatx2gLabTools: InferenceBatx2gLabTool[] = [
    { ...borrowed('lookup'), id: 'lookup', stage: 'estimation', lessonTopic: 'critical-value' },
    { ...borrowed('band'), id: 'band', stage: 'estimation', lessonTopic: 'confidence-level' },
    { id: 'hundred', stage: 'mean-ci', lessonTopic: 'interpret', title: say('Ehun tarte', 'Cien intervalos', 'مئة فترة', 'A hundred intervals'), observe: say('Lagin bakoitzak bere tartea ematen du. % 95 mailan, 100 tartetatik 95 inguruk harrapatzen dute μ, baina sorta batetik bestera kopurua aldatu egiten da. n handitzean tarteak estutzen dira, baina asmatzen dutenen proportzioa ez da aldatzen.', 'Cada muestra da su intervalo. Al 95 %, unos 95 de cada 100 atrapan μ, pero el número cambia de una tanda a otra. Al crecer n los intervalos se estrechan, pero la proporción de aciertos no cambia.', 'تعطي كل عيّنة فترتها. عند 95 % تلتقط نحو 95 من كل 100 فترة μ، لكن العدد يتغير من دفعة إلى أخرى. وحين يكبر n تضيق الفترات لكن نسبة الإصابة لا تتغير.', 'Each sample gives its interval. At 95%, about 95 in every 100 catch μ, but the count changes from one batch to another. As n grows the intervals narrow, but the share that catch μ does not change.') },
    { id: 'margin', stage: 'error-size', lessonTopic: 'what-changes', title: say('Errore-marjina', 'El margen de error', 'هامش الخطأ', 'The margin of error'), observe: say('Mailak, σ zenbakiak edo p̂ zenbakiak eta n zenbakiak tartearen zabalera erabakitzen dute. Maila igotzean tartea zabaltzen da; n lau aldiz handiagoa denean, erdia da. Proportzioetan, p̂ = 0,5 denean da zabalena.', 'El nivel, σ o p̂, y n deciden la anchura del intervalo. Al subir el nivel se ensancha; con n cuatro veces mayor, mide la mitad. En proporciones, es más ancho cuando p̂ = 0,5.', 'المستوى وσ أو p̂ وn تحدد عرض الفترة. برفع المستوى تتسع؛ ومع n أكبر بأربع مرات تصبح نصفها. وفي النسب تكون أعرض عندما p̂ = 0.5.', 'The level, σ or p̂, and n set the width of the interval. Raising the level widens it; with n four times bigger, it is half as wide. For proportions, it is widest when p̂ = 0.5.') }
]

export const inferenceBatx2gLabToolForTopic: Record<string, InferenceBatx2gLabToolId | undefined> = {
    'confidence-level': 'band',
    'critical-value': 'lookup',
    'mean-interval': 'margin',
    interpret: 'hundred',
    'interval-to-data': 'margin',
    'error-margin': 'margin',
    'sample-size': 'margin',
    'what-changes': 'margin',
    'proportion-interval': 'margin',
    'proportion-error': 'margin',
    'proportion-size': 'margin',
    polls: 'margin',
    'compare-claim': 'hundred',
    'level-or-size': 'margin'
}

export const inferenceBatx2gLabChallengeIds: number[] = [lookupChallenges, bandChallenges, hundredChallenges, marginChallenges].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

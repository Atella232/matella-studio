import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { approxChallenges } from '../../batx2-zientziak-banaketak/lab/approx.ts'
import { bellChallenges } from '../../batx2-zientziak-banaketak/lab/bell.ts'
import { distributionsBatx2LabTools } from '../../batx2-zientziak-banaketak/lab/labTools.ts'
import { lookupChallenges } from '../../batx2-zientziak-banaketak/lab/lookup.ts'
import { machineChallenges } from '../../batx2-zientziak-banaketak/lab/machine.ts'
import type { DistributionsBatx2gStageId } from '../lessons.tsx'
import { bandChallenges } from './band.ts'
import { surveysChallenges } from './surveys.ts'

/* ==========================================================================
   Banaketak (Batxilergoa 2 · Gizarte Zientziak) laboratory. Two tools of
   its own: a thousand polls (the binomial built by repeating a poll, with
   the bell when np ≥ 5 and nq ≥ 5) and the band of k % (the
   characteristic interval μ ± z·σ). The rest come with their challenges
   and ids from 2.º Ciencias: the binomial machine, under the bell, the
   normal table and the binomial under the bell. Tests in
   tests/banaketak-batx2g-lab.test.ts.
   ========================================================================== */

export type DistributionsBatx2gLabToolId = 'machine' | 'surveys' | 'lookup' | 'bell' | 'band' | 'approx'

export interface DistributionsBatx2gLabTool extends LabToolInfo {
    id: DistributionsBatx2gLabToolId
    stage: DistributionsBatx2gStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const fromCiencias = (id: string) => distributionsBatx2LabTools.find((tool) => tool.id === id)!

export const distributionsBatx2gLabTools: DistributionsBatx2gLabTool[] = [
    { ...fromCiencias('machine'), id: 'machine', stage: 'binomial', lessonTopic: 'binomial-formula' },
    { id: 'surveys', stage: 'binomial', lessonTopic: 'binomial-mean', title: say('Mila inkesta', 'Mil encuestas', 'ألف استطلاع', 'A thousand polls'), observe: say('Inkesta bera askotan errepikatuz, barrak banaketa binomialaren barren antzera hazten dira. Gehienak batez bestekotik gertu geratzen dira, eta np eta nq gutxienez 5 direnean, kanpai bat osatzen dute.', 'Al repetir muchas veces la misma encuesta, las barras crecen como las de la binomial. La mayoría queda cerca de la media y, cuando np y nq son al menos 5, forman una campana.', 'بتكرار الاستطلاع نفسه مرات كثيرة تنمو الأعمدة مثل أعمدة التوزيع الثنائي. ويبقى معظمها قرب المتوسط، وعندما يكون np وnq على الأقل 5 تكوّن جرسًا.', 'Repeating the same poll many times, the bars grow like those of the binomial. Most stay near the mean and, when np and nq are at least 5, they make a bell.') },
    { ...fromCiencias('lookup'), id: 'lookup', stage: 'normal', lessonTopic: 'standard-table' },
    { ...fromCiencias('bell'), id: 'bell', stage: 'normal', lessonTopic: 'standardize' },
    { id: 'band', stage: 'approximation', lessonTopic: 'characteristic-interval', title: say('% k-ko zerrenda', 'La franja del k %', 'شريط k %', 'The band of k%'), observe: say('Zerrenda batez bestekoan zentratuta dago, eta haren erradioa z bider σ da. Maila igotzean zerrenda zabaldu egiten da; % 95 maila μ ± 2σ ingurukoa da.', 'La franja está centrada en la media y su radio es z por σ. Al subir el nivel la franja se ensancha; el 95 % es más o menos μ ± 2σ.', 'الشريط متمركز حول المتوسط ونصف قطره z في σ. وكلما ارتفع المستوى اتسع الشريط؛ و95 % تقارب μ ± 2σ.', 'The band is centred on the mean and its radius is z times σ. Raising the level widens the band; 95% is roughly μ ± 2σ.') },
    { ...fromCiencias('approx'), id: 'approx', stage: 'approximation', lessonTopic: 'continuity' }
]

export const distributionsBatx2gLabToolForTopic: Record<string, DistributionsBatx2gLabToolId | undefined> = {
    'is-binomial': 'surveys',
    'binomial-formula': 'machine',
    'binomial-mean': 'surveys',
    'normal-curve': 'bell',
    'standard-table': 'lookup',
    standardize: 'bell',
    'compare-scores': 'bell',
    'inverse-normal': 'lookup',
    'characteristic-interval': 'band',
    'binomial-to-normal': 'surveys',
    continuity: 'approx'
}

export const distributionsBatx2gLabChallengeIds: number[] = [machineChallenges, surveysChallenges, lookupChallenges, bellChallenges, bandChallenges, approxChallenges].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

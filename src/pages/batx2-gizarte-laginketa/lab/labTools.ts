import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { stats3LabTools } from '../../dbh3-estatistika/lab/labTools.ts'
import { sampleChallenges } from '../../dbh3-estatistika/lab/sample.ts'
import { statisticsAkLabTools, strataChallenges } from '../../dbh4-akademikoak-estatistika/lab/labTools.ts'
import type { SamplingBatx2gStageId } from '../lessons.tsx'
import { manyChallenges } from './many.ts'
import { urnChallenges } from './urn.ts'

/* ==========================================================================
   Laginketa (Batxilergoa 2 · Gizarte Zientziak) laboratory. Two tools of
   its own: the urn of the means (every sample of size n and its mean) and
   many samples (500 samples of a population far from normal, with the
   bell of the central limit theorem). Two come with their challenges and
   ids from ESO: the sample of 3. DBH and the stratified sample of 4. DBH
   akademikoak. Tests in tests/laginketa-batx2g-lab.test.ts.
   ========================================================================== */

export type SamplingBatx2gLabToolId = 'sample' | 'strata' | 'urn' | 'many'

export interface SamplingBatx2gLabTool extends LabToolInfo {
    id: SamplingBatx2gLabToolId
    stage: SamplingBatx2gStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const borrowed = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const samplingBatx2gLabTools: SamplingBatx2gLabTool[] = [
    { ...borrowed(stats3LabTools, 'sample'), id: 'sample', stage: 'sampling', lessonTopic: 'population-sample' },
    { ...borrowed(statisticsAkLabTools, 'strata'), id: 'strata', stage: 'strata', lessonTopic: 'proportional-allocation' },
    { id: 'urn', stage: 'strata', lessonTopic: 'all-samples', title: say('Batez bestekoen kutxa', 'La urna de las medias', 'صندوق المتوسطات', 'The urn of the means'), observe: say('n tamainako lagin guztiak ateratzen dira, eta bakoitza bere batez bestekoan jartzen da. Batez bestekoen batez bestekoa beti da μ, eta n handitzean, batez bestekoak elkarrengana biltzen dira: haien desbideratzea σ / √n da.', 'Se sacan todas las muestras de tamaño n y cada una se coloca en su media. La media de las medias siempre es μ y, al crecer n, las medias se juntan: su desviación es σ / √n.', 'تُسحب كل العيّنات ذات الحجم n وتوضع كل واحدة عند متوسطها. متوسط المتوسطات دائمًا μ، وحين يكبر n تتجمع المتوسطات: انحرافها σ / √n.', 'Every sample of size n is drawn and each one is placed at its mean. The mean of the means is always μ and, as n grows, the means gather together: their deviation is σ / √n.') },
    { id: 'many', stage: 'means', lessonTopic: 'central-limit', title: say('Lagin asko', 'Muchas muestras', 'عيّنات كثيرة', 'Many samples'), observe: say('Populazioa normala ez izan arren, 500 laginen batez bestekoek kanpai bat osatzen dute n handia denean. Proportzioekin ere gertatzen da, np eta nq gutxienez 5 direnean. Beti, % 95 inguru μ ± 2σ tartean geratzen da.', 'Aunque la población no sea normal, las medias de 500 muestras forman una campana cuando n es grande. Con proporciones pasa lo mismo cuando np y nq son al menos 5. Siempre, cerca del 95 % cae en μ ± 2σ.', 'مع أن المجتمع ليس طبيعيًّا، تكوّن متوسطات 500 عيّنة جرسًا حين يكون n كبيرًا. ويحدث الشيء نفسه مع النسب حين يكون np وnq على الأقل 5. ودائمًا يقع نحو 95 % في μ ± 2σ.', 'Even if the population is not normal, the means of 500 samples make a bell when n is large. The same happens with proportions when np and nq are at least 5. Always, about 95% falls within μ ± 2σ.') }
]

export const samplingBatx2gLabToolForTopic: Record<string, SamplingBatx2gLabToolId | undefined> = {
    'population-sample': 'sample',
    bias: 'sample',
    'proportional-allocation': 'strata',
    'equal-allocation': 'strata',
    'all-samples': 'urn',
    'sample-mean-distribution': 'urn',
    'central-limit': 'many',
    'sum-distribution': 'many',
    'sample-proportion': 'sample',
    'proportion-distribution': 'many',
    'proportion-probability': 'many',
    'bigger-sample': 'urn'
}

export const samplingBatx2gLabChallengeIds: number[] = [sampleChallenges, strataChallenges, urnChallenges, manyChallenges].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

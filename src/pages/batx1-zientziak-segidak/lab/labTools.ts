import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { bounceChallenges } from '../../dbh3-segidak/lab/bounce.ts'
import { barChallenges } from '../../dbh3-segidak/lab/endlessBar.ts'
import { frogChallenges } from '../../dbh3-segidak/lab/frog.ts'
import { gaussChallenges } from '../../dbh3-segidak/lab/gaussBars.ts'
import { sequencesLabTools } from '../../dbh3-segidak/lab/labTools.ts'
import { sticksChallenges } from '../../dbh3-segidak/lab/sticks.ts'
import type { BachSequencesStageId } from '../lessons.tsx'
import { eMachineChallenges } from './eMachine.ts'
import { fibChallenges } from './fibonacci.ts'
import { limitBandChallenges } from './limitBand.ts'

/* ==========================================================================
   Segidak (Batxilergoa 1 · Zientziak) laboratory. Three tools of its own,
   for what 1.º Bachillerato adds: Fibonacci and the golden ratio, the band
   of the limit (from which term on) and the e machine (interest paid more
   and more often). The review comes from 3. DBH with its challenges and
   ids (progress is kept apart, under this unit's storage prefix): the
   stick patterns, the frog, Gauss's bars, the bouncing ball and the bar
   that never fills up. Tests in tests/segidak-batx1z-lab.test.ts.
   ========================================================================== */

export type BachSequencesLabToolId = 'sticks' | 'fibonacci' | 'frog' | 'gauss' | 'bounce' | 'bar' | 'limit-band' | 'e-machine'

export interface BachSequencesLabTool extends LabToolInfo {
    id: BachSequencesLabToolId
    stage: BachSequencesStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const from = (id: string) => sequencesLabTools.find((tool) => tool.id === id)!

export const bachSequencesLabTools: BachSequencesLabTool[] = [
    { ...from('sticks'), id: 'sticks', stage: 'sequences', lessonTopic: 'terms' },
    { id: 'fibonacci', stage: 'sequences', lessonTopic: 'fibonacci', title: say('Fibonacci eta zenbaki urrea', 'Fibonacci y el número de oro', 'فيبوناتشي والعدد الذهبي', 'Fibonacci and the golden ratio'), observe: say('Hasierako bi gaiak edozein direla ere, bi gai jarraituren zatidura φ ≈ 1,618 zenbakira hurbiltzen da, txandaka azpitik eta gainetik.', 'Sean cuales sean los dos primeros términos, el cociente de dos términos seguidos se acerca a φ ≈ 1,618, por turnos por debajo y por encima.', 'مهما كان الحدان الأولان، يقترب خارج قسمة حدين متتاليين من φ ≈ 1.618، مرة من تحت ومرة من فوق.', 'Whatever the first two terms, the quotient of two consecutive terms gets close to φ ≈ 1.618, taking turns below and above.') },
    { ...from('frog'), id: 'frog', stage: 'progressions', lessonTopic: 'arithmetic' },
    { ...from('gauss'), id: 'gauss', stage: 'progressions', lessonTopic: 'arithmetic' },
    { ...from('bounce'), id: 'bounce', stage: 'progressions', lessonTopic: 'geometric' },
    { ...from('bar'), id: 'bar', stage: 'infinite-sums', lessonTopic: 'geometric-series' },
    { id: 'limit-band', stage: 'limits', lessonTopic: 'from-term', title: say('Limitearen banda', 'La banda del límite', 'شريط النهاية', 'The band of the limit'), observe: say('ε txikiagoa, banda estuagoa, eta N urrunago. Baina beti dago N bat: hortik aurrera, gai guztiak bandan.', 'Cuanto menor es ε, más estrecha la banda y más lejos queda N. Pero siempre hay un N: desde él, todos los términos en la banda.', 'كلما صغرت ε ضاق الشريط وابتعد N. لكن يوجد دائمًا N تكون بعده كل الحدود في الشريط.', 'The smaller ε, the narrower the band and the further away N. But there is always an N: from there on, every term is in the band.') },
    { id: 'e-machine', stage: 'number-e', lessonTopic: 'e-number', title: say('e zenbakiaren makina', 'La máquina de e', 'آلة العدد e', 'The e machine'), observe: say('Interesa maizago ordaintzean, diru gehiago dago urte amaieran, baina inoiz ez eᵏ baino gehiago: eskailera kurbaren azpian geratzen da.', 'Al pagar el interés más a menudo hay más dinero a final de año, pero nunca más que eᵏ: la escalera queda bajo la curva.', 'كلما دُفعت الفائدة أكثر زاد المال في آخر السنة، لكنه لا يتجاوز eᵏ أبدًا: يبقى الدرج تحت المنحنى.', 'Paying the interest more often gives more money at the end of the year, but never more than eᵏ: the staircase stays below the curve.') }
]

export const bachSequencesLabToolForTopic: Record<string, BachSequencesLabToolId | undefined> = {
    terms: 'sticks',
    fibonacci: 'fibonacci',
    monotony: 'limit-band',
    arithmetic: 'frog',
    geometric: 'bounce',
    'progression-problems': 'bounce',
    'geometric-series': 'bar',
    'periodic-decimals': 'bar',
    converge: 'limit-band',
    'from-term': 'limit-band',
    'quotient-limits': 'limit-band',
    'e-number': 'e-machine',
    'continuous-growth': 'e-machine'
}

export const bachSequencesLabChallengeIds: number[] = [
    sticksChallenges,
    fibChallenges,
    frogChallenges,
    gaussChallenges,
    bounceChallenges,
    barChallenges,
    limitBandChallenges,
    eMachineChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

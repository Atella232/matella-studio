import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import type { SequencesStageId } from '../lessons.tsx'
import { bounceChallenges } from './bounce.ts'
import { barChallenges } from './endlessBar.ts'
import { frogChallenges } from './frog.ts'
import { gaussChallenges } from './gaussBars.ts'
import { sticksChallenges } from './sticks.ts'

/* ==========================================================================
   Segidak (3. DBH) laboratory. No earlier unit has sequences, so all five
   tools are new: the stick patterns, the frog on the number line, Gauss's
   bars, the bouncing ball and the bar that never fills up. Tests in
   tests/segidak-dbh3-lab.test.ts.
   ========================================================================== */

export type SequencesLabToolId = 'sticks' | 'frog' | 'gauss' | 'bounce' | 'bar'

export interface SequencesLabTool extends LabToolInfo {
    id: SequencesLabToolId
    stage: SequencesStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

export const sequencesLabTools: SequencesLabTool[] = [
    { id: 'sticks', stage: 'sequences', lessonTopic: 'general-term', title: say('Makilen patroiak', 'Los patrones de palillos', 'أنماط العيدان', 'Stick patterns'), observe: say('Begiratu zenbat gehitzen den urrats batetik hurrengora. Beti berdina bada, progresio aritmetikoa da; gero eta gehiago bada, ez.', 'Mira cuánto se añade de un paso al siguiente. Si siempre es lo mismo, es una progresión aritmética; si cada vez es más, no.', 'انظر كم يُضاف من خطوة إلى التالية. إذا كان المقدار نفسه دائمًا فهي متتالية حسابية، وإذا زاد كل مرة فلا.', 'See how much is added from one step to the next. If it is always the same, it is an arithmetic progression; if it is more each time, it is not.') },
    { id: 'frog', stage: 'arithmetic', lessonTopic: 'arith-general', title: say('Igela zuzenean', 'La rana en la recta', 'الضفدع على المستقيم', 'The frog on the number line'), observe: say('Igela a₁ zenbakian hasten da eta jauzi bakoitza d da. n. gaira iristeko n − 1 jauzi egiten ditu, ez n.', 'La rana empieza en a₁ y cada salto mide d. Para llegar al término n da n − 1 saltos, no n.', 'يبدأ الضفدع من a₁ وطول كل قفزة d. وللوصول إلى الحد n يقفز n − 1 قفزة لا n.', 'The frog starts at a₁ and each jump is d. To reach term n it makes n − 1 jumps, not n.') },
    { id: 'gauss', stage: 'sums', lessonTopic: 'arith-sum', title: say('Gaussen barrak', 'Las barras de Gauss', 'أعمدة غاوس', 'Gauss\'s bars'), observe: say('Progresioaren kopia bat buruz behera jarrita, zutabe guztiek a₁ + aₙ neurtzen dute. Errektangeluak bi batura ditu: horregatik zatitzen da 2 zenbakiaz.', 'Al poner una copia de la progresión del revés, todas las columnas miden a₁ + aₙ. El rectángulo son dos sumas: por eso se divide entre 2.', 'عند وضع نسخة مقلوبة من المتتالية يصير طول كل عمود a₁ + aₙ. والمستطيل مجموعان: لذلك نقسم على 2.', 'When you put an upside-down copy of the progression on top, every column measures a₁ + aₙ. The rectangle is two sums: that is why you divide by 2.') },
    { id: 'bounce', stage: 'geometric', lessonTopic: 'geo-general', title: say('Errebotatzen duen pilota', 'La pelota que rebota', 'الكرة المرتدة', 'The bouncing ball'), observe: say('Errebote bakoitzean altuera bider r da. n errebote ondoren, h₀ · rⁿ. Aritmetikoan bezala jauziak zenbatzen dira, baina hemen biderkatuz.', 'En cada bote la altura se multiplica por r. Tras n botes, h₀ · rⁿ. Como en la aritmética se cuentan los saltos, pero aquí multiplicando.', 'في كل ارتداد يُضرب الارتفاع في r. وبعد n ارتدادات h₀ · rⁿ. وكما في الحسابية نعدّ القفزات لكن بالضرب.', 'At each bounce the height is multiplied by r. After n bounces, h₀ · rⁿ. As with arithmetic progressions you count the jumps, but here by multiplying.') },
    { id: 'bar', stage: 'geo-sums', lessonTopic: 'geo-infinite', title: say('Inoiz betetzen ez den barra', 'La barra que nunca se llena', 'العمود الذي لا يمتلئ', 'The bar that never fills up'), observe: say('|r| < 1 denean zatiak gero eta txikiagoak dira, eta batura a₁ : (1 − r) zenbakira hurbiltzen da, baina ez du inoiz gainditzen.', 'Cuando |r| < 1 los trozos son cada vez más pequeños y la suma se acerca a a₁ : (1 − r), pero nunca lo pasa.', 'عندما |r| < 1 تصغر القطع باستمرار ويقترب المجموع من a₁ : (1 − r) لكنه لا يتجاوزه أبدًا.', 'When |r| < 1 the pieces get smaller and smaller and the sum gets closer to a₁ : (1 − r), but never goes past it.') }
]

export const sequencesLabToolForTopic: Record<string, SequencesLabToolId | undefined> = {
    terms: 'sticks',
    'general-term': 'sticks',
    recursive: 'sticks',
    'arith-difference': 'frog',
    'arith-general': 'frog',
    'arith-find': 'frog',
    gauss: 'gauss',
    'arith-sum': 'gauss',
    'arith-problems': 'gauss',
    'geo-ratio': 'bounce',
    'geo-general': 'bounce',
    'geo-find': 'bounce',
    'geo-sum': 'bar',
    'geo-infinite': 'bar',
    'geo-problems': 'bounce'
}

export const sequencesLabChallengeIds: number[] = [sticksChallenges, frogChallenges, gaussChallenges, bounceChallenges, barChallenges].flatMap((list) => list.map((challenge) => challenge.id))

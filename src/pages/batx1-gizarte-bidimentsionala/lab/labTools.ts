import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { bivarLabTools } from '../../batx1-zientziak-bidimentsionala/lab/labTools.ts'
import { independenceChallenges } from '../../batx1-zientziak-bidimentsionala/lab/independenceTable.ts'
import { quadrantChallenges } from '../../batx1-zientziak-bidimentsionala/lab/quadrantBoard.ts'
import { scissorsChallenges } from '../../batx1-zientziak-bidimentsionala/lab/scissors.ts'
import { contingencyChallenges, scatterChallenges } from '../../dbh4-aplikatuak-estatistika/lab/labTools.ts'
import type { SocialBivarStageId } from '../lessons.tsx'
import { relationChallenges } from './relation.ts'
import { reliableChallenges } from './reliable.ts'

/* ==========================================================================
   Estatistika bidimentsionala (Batxilergoa 1 · Gizarte Zientziak)
   laboratory. Two tools of its own: «functional or statistical?» (a cloud
   around a line with a slope and a noise) and «reliable or not?» (two
   clouds with the same line and different r, and an estimate dragged along
   the axis). Borrowed with their challenges and ids: the four quadrants,
   the scissors and «independent?» of 1.º Ciencias (the scissors read
   m_yx and m_xy, the same notation as this unit), and the cloud with r and
   the contingency table of 4. DBH aplikatuak. Tests in
   tests/bidimentsionala-batx1g-lab.test.ts.
   ========================================================================== */

export type SocialBivarLabToolId = 'relation' | 'quadrants' | 'scatter' | 'reliable' | 'scissors' | 'contingency' | 'independence'

export interface SocialBivarLabTool extends LabToolInfo {
    id: SocialBivarLabToolId
    stage: SocialBivarStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const fromCiencias = (id: string) => bivarLabTools.find((tool) => tool.id === id)!

export const socialBivarLabTools: SocialBivarLabTool[] = [
    { id: 'relation', stage: 'cloud', lessonTopic: 'scatter-dependence', title: say('Funtzionala ala estatistikoa?', '¿Funcional o estadística?', 'دالية أم إحصائية؟', 'Functional or statistical?'), observe: say('Zaratarik gabe, puntu guztiak zuzenaren gainean daude, eta r 1 edo −1 da. Zarata hazi ahala, puntuak urruntzen dira eta |r| txikitzen da. Maldak zeinua aldatzen du, ez indarra, eta zuzen laua bada r 0 da.', 'Sin ruido, todos los puntos están sobre la recta y r vale 1 o −1. Al crecer el ruido, los puntos se alejan y |r| baja. La pendiente cambia el signo, no la fuerza, y con la recta plana r es 0.', 'بلا تشويش تقع كل النقاط على المستقيم ويكون r مساويًا 1 أو −1. ومع ازدياد التشويش تبتعد النقاط وينزل |r|. والميل يغيّر الإشارة لا القوة، ومع المستقيم الأفقي يكون r صفرًا.', 'With no noise, all the points lie on the line and r is 1 or −1. As the noise grows, the points move away and |r| drops. The slope changes the sign, not the strength, and with a flat line r is 0.') },
    { ...fromCiencias('quadrants'), id: 'quadrants', stage: 'cloud', lessonTopic: 'quadrants' },
    { ...fromCiencias('scatter'), id: 'scatter', stage: 'parameters', lessonTopic: 'correlation-coefficient' },
    { id: 'reliable', stage: 'regression', lessonTopic: 'estimation', title: say('Fidagarria ala ez?', '¿Fiable o no?', 'موثوق أم لا؟', 'Reliable or not?'), observe: say('Bi hodeiek zuzen bera dute, beraz estimazioak berdinak dira; baina fidagarritasuna ez. r txikia bada, ez da fidagarria inon. r handia bada, datuen barruan bai, eta datuetatik urruntzean gero eta gutxiago.', 'Las dos nubes tienen la misma recta, así que las estimaciones son iguales; pero la fiabilidad no. Si r es pequeño, no es fiable en ningún sitio. Si r es grande, dentro de los datos sí, y cada vez menos al alejarse de ellos.', 'للسحابتين المستقيم نفسه، فالتقديرات متساوية؛ لكن الموثوقية ليست كذلك. إذا كان r صغيرًا فالتقدير غير موثوق في أي مكان. وإذا كان كبيرًا فهو موثوق داخل البيانات، ويقلّ كلما ابتعدنا عنها.', 'Both clouds have the same line, so the estimates are the same; but the reliability is not. If r is small, it is not reliable anywhere. If r is large, it is within the data, and less and less as you move away from them.') },
    { ...fromCiencias('scissors'), id: 'scissors', stage: 'regression', lessonTopic: 'both-lines' },
    { ...fromCiencias('contingency'), id: 'contingency', stage: 'tables', lessonTopic: 'conditional' },
    { ...fromCiencias('independence'), id: 'independence', stage: 'tables', lessonTopic: 'independence' }
]

export const socialBivarLabToolForTopic: Record<string, SocialBivarLabToolId | undefined> = {
    'scatter-dependence': 'relation',
    'reading-r': 'relation',
    quadrants: 'quadrants',
    covariance: 'quadrants',
    'correlation-coefficient': 'scatter',
    'units-change': 'scatter',
    'regression-yx': 'scatter',
    estimation: 'reliable',
    'line-xy': 'scissors',
    'both-lines': 'scissors',
    'inverse-problems': 'scissors',
    'two-variables': 'contingency',
    marginal: 'contingency',
    conditional: 'contingency',
    independence: 'independence'
}

export const socialBivarLabChallengeIds: number[] = [
    relationChallenges,
    quadrantChallenges,
    scatterChallenges,
    reliableChallenges,
    scissorsChallenges,
    contingencyChallenges,
    independenceChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

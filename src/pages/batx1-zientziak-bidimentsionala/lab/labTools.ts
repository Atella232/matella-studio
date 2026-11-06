import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { contingencyChallenges, scatterChallenges, statisticsLabTools } from '../../dbh4-aplikatuak-estatistika/lab/labTools.ts'
import type { BivarStageId } from '../lessons.tsx'
import { independenceChallenges } from './independenceTable.ts'
import { quadrantChallenges } from './quadrantBoard.ts'
import { scissorsChallenges } from './scissors.ts'

/* ==========================================================================
   Estatistika bidimentsionala (Batxilergoa 1 · Zientziak) laboratory.
   Three tools of its own, for what 1.º Bachillerato adds: «independent?»
   (a 2 × 2 table whose rows become bars of 100 %), the four quadrants
   (five points around the centre of gravity, each with its signed
   rectangle) and the scissors (the two regression lines closing as |r|
   grows). The contingency table and the cloud with r and its line come
   from 4. DBH aplikatuak with their challenges and ids; their progress is
   kept under this unit's storage prefix. Tests in
   tests/bidimentsionala-batx1z-lab.test.ts.
   ========================================================================== */

export type BivarLabToolId = 'contingency' | 'independence' | 'quadrants' | 'scatter' | 'scissors'

export interface BivarLabTool extends LabToolInfo {
    id: BivarLabToolId
    stage: BivarStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const fromAp = (id: string) => statisticsLabTools.find((tool) => tool.id === id)!

export const bivarLabTools: BivarLabTool[] = [
    { ...fromAp('contingency'), id: 'contingency', stage: 'tables', lessonTopic: 'conditional' },
    { id: 'independence', stage: 'tables', lessonTopic: 'independence', title: say('Independenteak?', '¿Independientes?', 'مستقلان؟', 'Independent?'), observe: say('Errenkada bakoitza barra oso bat da, % 100. Bi barrak leku berean mozten badira, bi errenkadak proportzionalak dira eta aldagaiak independenteak. Zenbaki handiagoek ez dute zati handiagoa esan nahi.', 'Cada fila es una barra del 100 %. Si las dos barras se cortan en el mismo sitio, las filas son proporcionales y las variables, independientes. Números más grandes no quieren decir una parte mayor.', 'كل سطر عمود من 100٪. فإذا انقسم العمودان في الموضع نفسه كان السطران متناسبين والمتغيران مستقلين. والأعداد الأكبر لا تعني نصيبًا أكبر.', 'Each row is a bar of 100%. If both bars split at the same place, the rows are proportional and the variables independent. Bigger numbers do not mean a bigger share.') },
    { id: 'quadrants', stage: 'cloud', lessonTopic: 'quadrants', title: say('Lau koadranteak', 'Los cuatro cuadrantes', 'الأرباع الأربعة', 'The four quadrants'), observe: say('Puntu bat mugitzean, grabitate-zentroa ere mugitzen da, eta laukizuzen guztiak aldatzen dira. Berdeek batu egiten dute eta koralek kendu; zentrotik urrun dagoen puntu batek asko pisatzen du.', 'Al mover un punto también se mueve el centro de gravedad, y cambian todos los rectángulos. Los verdes suman y los corales restan; un punto lejos del centro pesa mucho.', 'عند تحريك نقطة يتحرك مركز الثقل أيضًا وتتغيّر كل المستطيلات. الخضراء تجمع والمرجانية تطرح؛ والنقطة البعيدة عن المركز ترجح كثيرًا.', 'When you move a point, the centre of gravity moves too, and every rectangle changes. Green ones add and coral ones subtract; a point far from the centre weighs a lot.') },
    { ...fromAp('scatter'), id: 'scatter', stage: 'parameters', lessonTopic: 'correlation-coefficient' },
    { id: 'scissors', stage: 'regression', lessonTopic: 'two-lines', title: say('Guraizeak', 'Las tijeras', 'المقصّ', 'The scissors'), observe: say('Bi zuzenak grabitate-zentrotik pasatzen dira beti. |r| handitzean, guraizeak ixten dira, eta |r| = 1 denean zuzen bakarra dira; r = 0 denean, perpendikularrak. Koefizienteen biderkadura r² da beti.', 'Las dos rectas pasan siempre por el centro de gravedad. Al crecer |r|, las tijeras se cierran, y con |r| = 1 son una sola recta; con r = 0, perpendiculares. El producto de los coeficientes es siempre r².', 'يمرّ المستقيمان دائمًا بمركز الثقل. وعندما يكبر |r| ينغلق المقصّ، ومع |r| = 1 يصيران مستقيمًا واحدًا، ومع r = 0 يتعامدان. وجداء المعاملين دائمًا r².', 'Both lines always pass through the centre of gravity. As |r| grows, the scissors close, and with |r| = 1 they are a single line; with r = 0, perpendicular. The product of the coefficients is always r².') }
]

export const bivarLabToolForTopic: Record<string, BivarLabToolId | undefined> = {
    'two-variables': 'contingency',
    marginal: 'contingency',
    conditional: 'contingency',
    independence: 'independence',
    'scatter-dependence': 'scatter',
    quadrants: 'quadrants',
    covariance: 'quadrants',
    'correlation-coefficient': 'scatter',
    'regression-yx': 'scatter',
    estimation: 'scatter',
    'regression-xy': 'scissors',
    'two-lines': 'scissors',
    'inverse-problems': 'scissors'
}

export const bivarLabChallengeIds: number[] = [
    contingencyChallenges,
    independenceChallenges,
    quadrantChallenges,
    scatterChallenges,
    scissorsChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

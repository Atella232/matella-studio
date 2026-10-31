import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { chainChallenges, compoundChallenges, interestChallenges, shareChallenges } from '../../dbh2-proportzionaltasuna-v2/lab/labTools.ts'
import { mixtureChallenges, motionChallenges, proportionDbh4ApLabTools, tapsChallenges } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/labTools.ts'
import { percentBarChallenges } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/percentBar.ts'
import { ruleChallenges } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/ruleOfThree.ts'
import type { Proportion3StageId } from '../lessons.tsx'
import { gearsChallenges } from './gears.ts'
import { mapChallenges } from './mapScale.ts'
import { recipeChallenges } from './recipe.ts'
import { rectangleChallenges } from './rectangle.ts'

/* ==========================================================================
   Proportzionaltasuna (3. DBH) laboratory. Four tools are new and belong to
   this unit: the recipe whose pantry runs out (direct proportion with a
   limiting ingredient), the map with its scale, the gear wheels (teeth and
   turns are inversely proportional) and the rectangle that stretches (a
   line through the origin against a hyperbola). The rule of three with
   arrows, the 100 % bar, the mixture, the road and the taps come from
   4. DBH aplikatuak, and the compound machine, the shares, the chained
   percentages and simple interest from 2. DBH, with their own challenges.
   Tests in tests/proportzionaltasuna-dbh3-lab.test.ts.
   ========================================================================== */

export type Proportion3LabToolId = 'recipe' | 'map' | 'rule' | 'gears' | 'rectangle' | 'compound' | 'share' | 'percentbar' | 'chain' | 'interest' | 'mixture' | 'motion' | 'taps'

export interface Proportion3LabTool extends LabToolInfo {
    id: Proportion3LabToolId
    stage: Proportion3StageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** A tool of the 4. DBH aplikatuak laboratory, put in this unit's stage and lesson */
const borrowed = (id: Proportion3LabToolId, stage: Proportion3StageId, lessonTopic: string): Proportion3LabTool => {
    const tool = proportionDbh4ApLabTools.find((candidate) => candidate.id === id)
    if (!tool) throw new Error(`No borrowed tool ${id}`)
    return { ...tool, id, stage, lessonTopic }
}

export const proportion3LabTools: Proportion3LabTool[] = [
    { id: 'recipe', stage: 'ratios', lessonTopic: 'proportion', title: say('Errezeta eta despentsa', 'La receta y la despensa', 'الوصفة والمخزن', 'The recipe and the pantry'), observe: say('Osagai bakoitza lagun kopuruarekiko zuzenki proportzionala da, bere konstantearekin. Despentsan lehenik amaitzen den osagaiak erabakitzen du zenbat lagunentzat egin daitekeen.', 'Cada ingrediente es directamente proporcional al número de personas, con su propia constante. El ingrediente que se acaba primero en la despensa decide para cuántas personas se puede cocinar.', 'كل مكوّن يتناسب طرديًا مع عدد الأشخاص بثابته الخاص. والمكوّن الذي ينفد أولًا في المخزن يقرّر لكم شخصًا يمكن الطبخ.', 'Each ingredient is directly proportional to the number of people, with its own constant. The ingredient that runs out first in the pantry decides how many people you can cook for.') },
    { id: 'map', stage: 'ratios', lessonTopic: 'scale', title: say('Mapa eskalan', 'El mapa a escala', 'الخريطة بالمقياس', 'The scale map'), observe: say('Mapako cm bakoitzak eskalaren zenbakia adina cm balio ditu benetan. Emaitza cm-tan ateratzen da: gero pasatu m-tara edo km-tara.', 'Cada cm del mapa vale en la realidad tantos cm como dice el número de la escala. El resultado sale en cm: después pásalo a m o a km.', 'كل سنتيمتر على الخريطة يساوي في الحقيقة عدد سنتيمترات يساوي عدد المقياس. النتيجة بالسنتيمتر: ثم حوّلها إلى أمتار أو كيلومترات.', 'Each cm on the map is worth, in real life, as many cm as the scale number says. The result comes out in cm: then change it into m or km.') },
    borrowed('rule', 'simple', 'direct'),
    { id: 'gears', stage: 'simple', lessonTopic: 'inverse', title: say('Gurpil hortzdunak', 'Las ruedas dentadas', 'العجلات المسننة', 'The gear wheels'), observe: say('Bi gurpiletan hortz kopuru bera igarotzen da minutuko. Horregatik hortzak bider birak konstantea da: hortz gutxiago dituen gurpilak bira gehiago egiten ditu.', 'Por el punto de contacto pasan los mismos dientes por minuto en las dos ruedas. Por eso dientes por vueltas es constante: la rueda con menos dientes da más vueltas.', 'يمر عدد الأسنان نفسه في الدقيقة في العجلتين. لذلك حاصل ضرب الأسنان في الدورات ثابت: العجلة ذات الأسنان الأقل تدور أكثر.', 'The same number of teeth passes the contact point every minute on both wheels. That is why teeth times turns is constant: the wheel with fewer teeth turns more.') },
    { id: 'rectangle', stage: 'simple', lessonTopic: 'graphs', title: say('Luzatzen den laukizuzena', 'El rectángulo que se estira', 'المستطيل الذي يتمدّد', 'The stretching rectangle'), observe: say('Azalera finkoarekin, oinarria eta altuera alderantziz proportzionalak dira eta erpinak hiperbola bat marrazten du. Altuera finkoarekin, azalera eta oinarria zuzenki proportzionalak dira: jatorritik pasatzen den zuzena.', 'Con el área fija, base y altura son inversamente proporcionales y la esquina dibuja una hipérbola. Con la altura fija, área y base son directamente proporcionales: una recta por el origen.', 'عند ثبات المساحة تتناسب القاعدة والارتفاع عكسيًا وترسم الزاوية قطعًا زائدًا. وعند ثبات الارتفاع تتناسب المساحة والقاعدة طرديًا: مستقيم يمر بالأصل.', 'With a fixed area, base and height are inversely proportional and the corner draws a hyperbola. With a fixed height, area and base are directly proportional: a line through the origin.') },
    borrowed('compound', 'compound', 'compound'),
    borrowed('share', 'compound', 'direct-share'),
    borrowed('percentbar', 'percent', 'percent-index'),
    borrowed('chain', 'percent', 'chained'),
    borrowed('interest', 'percent', 'interest'),
    borrowed('mixture', 'problems', 'mixtures'),
    borrowed('motion', 'problems', 'motion'),
    borrowed('taps', 'problems', 'work')
]

export const proportion3LabToolForTopic: Record<string, Proportion3LabToolId | undefined> = {
    ratio: 'recipe',
    proportion: 'recipe',
    scale: 'map',
    direct: 'rule',
    inverse: 'gears',
    graphs: 'rectangle',
    compound: 'compound',
    'direct-share': 'share',
    'inverse-share': 'share',
    'percent-index': 'percentbar',
    chained: 'chain',
    interest: 'interest',
    mixtures: 'mixture',
    motion: 'motion',
    work: 'taps'
}

export const proportion3LabChallengeIds: number[] = [
    recipeChallenges,
    mapChallenges,
    ruleChallenges,
    gearsChallenges,
    rectangleChallenges,
    compoundChallenges,
    shareChallenges,
    percentBarChallenges,
    chainChallenges,
    interestChallenges,
    mixtureChallenges,
    motionChallenges,
    tapsChallenges
].flatMap((list) => list.map((challenge) => challenge.id))

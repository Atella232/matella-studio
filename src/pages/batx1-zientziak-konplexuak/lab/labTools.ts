import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { combinationChallenges, vectorChallenges, vectorsLabTools } from '../../dbh4-akademikoak-bektoreak/lab/labTools.ts'
import { circleChallenges, trigonometryLabTools } from '../../dbh4-akademikoak-trigonometria/lab/labTools.ts'
import { trigonometryBatx1zLabTools } from '../../batx1-zientziak-trigonometria/lab/labTools.ts'
import { spinChallenges } from '../../batx1-zientziak-trigonometria/lab/spin.ts'
import type { ComplexStageId } from '../lessons.tsx'
import { say } from '../text.ts'
import { planeChallenges } from './plane.ts'
import { rootsChallenges } from './roots.ts'
import { turnChallenges } from './turn.ts'

/* ==========================================================================
   Zenbaki konplexuak (Batxilergoa 1 · Zientziak) laboratory. Three tools
   of its own: the complex plane (opposite, conjugate, modulus and
   argument), multiplying is turning and the roots that make a polygon.
   The rest is borrowed with its challenges and ids (progress is kept
   apart, under this unit's storage prefix): the vector from A to B and the
   combination a · u + b · v of 4. DBH académicas (the affix as a vector and
   the sum as a parallelogram), the unit circle of 4. DBH académicas (the
   polar form) and the solutions that go round of Formula eta funtzio
   trigonometrikoak (the n turns of the roots). Tests in
   tests/konplexuak-batx1z-lab.test.ts.
   ========================================================================== */

export type KonplexuakBatx1zLabToolId = 'plane' | 'vector' | 'combination' | 'circle' | 'turn' | 'roots' | 'spin'

export interface KonplexuakBatx1zLabTool extends LabToolInfo {
    id: KonplexuakBatx1zLabToolId
    stage: ComplexStageId
}

const fromVectors = (id: string) => vectorsLabTools.find((tool) => tool.id === id)!
const fromTrigonometry = (id: string) => trigonometryLabTools.find((tool) => tool.id === id)!
const fromFormulas = (id: string) => trigonometryBatx1zLabTools.find((tool) => tool.id === id)!

export const konplexuakBatx1zLabTools: KonplexuakBatx1zLabTool[] = [
    { id: 'plane', stage: 'binomial', lessonTopic: 'complex-plane', title: say('Plano konplexua', 'El plano complejo', 'المستوى المركب', 'The complex plane'), observe: say('Aurkakoa jatorriaren beste aldean dago, eta konjokatua ardatz errealaren beste aldean. Biek z zenbakiaren modulu bera dute. Zenbaki erreal baten konjokatua zenbaki bera da, eta irudikari huts baten konjokatua haren aurkakoa.', 'El opuesto está al otro lado del origen y el conjugado, al otro lado del eje real. Los dos tienen el mismo módulo que z. El conjugado de un número real es el mismo número, y el de un imaginario puro, su opuesto.', 'المعاكس في الجهة الأخرى من الأصل، والمرافق في الجهة الأخرى من المحور الحقيقي. ولكليهما طويلة z نفسها. ومرافق العدد الحقيقي هو العدد نفسه، ومرافق التخيلي الصرف هو معاكسه.', 'The opposite is on the other side of the origin and the conjugate on the other side of the real axis. Both have the same modulus as z. The conjugate of a real number is the same number, and that of a purely imaginary number is its opposite.') },
    { ...fromVectors('vector'), id: 'vector', stage: 'binomial', lessonTopic: 'complex-plane' },
    { ...fromVectors('combination'), id: 'combination', stage: 'operations', lessonTopic: 'add-multiply' },
    { ...fromTrigonometry('circle'), id: 'circle', stage: 'polar', lessonTopic: 'polar-binomial' },
    { id: 'turn', stage: 'turns', lessonTopic: 'rotations', title: say('Biderkatzea biratzea da', 'Multiplicar es girar', 'الضرب دوران', 'Multiplying is turning'), observe: say('z bider w egitean, z zenbakiak w zenbakiaren argumentua biratzen du, eta haren modulua bider w zenbakiaren modulua egiten da. i, −1 eta −i zenbakiekin biratu bakarrik egiten du; 2 zenbakiarekin luzatu bakarrik; 1 + i zenbakiarekin 45° biratu eta luzatu.', 'Al multiplicar z por w, z gira el argumento de w y su módulo se multiplica por el de w. Con i, −1 y −i solo gira; con 2 solo se estira; con 1 + i gira 45° y se estira.', 'عند ضرب z في w يدور z بمقدار عمدة w وتُضرب طويلته في طويلة w. مع i و−1 و−i يدور فقط، ومع 2 يمتد فقط، ومع 1 + i يدور 45° ويمتد.', 'When z is multiplied by w, z turns by the argument of w and its modulus is multiplied by that of w. With i, −1 and −i it only turns; with 2 it only stretches; with 1 + i it turns 45° and stretches.') },
    { id: 'roots', stage: 'roots', lessonTopic: 'roots-polygons', title: say('Erroek poligono bat osatzen dute', 'Las raíces forman un polígono', 'الجذور تشكّل مضلعًا', 'The roots make a polygon'), observe: say('n erroek modulu bera dute, w zenbakiaren moduluaren erro n-garrena: zirkunferentzia batean daude. 360°/n banatzen dira, eta poligono erregular baten erpinak dira. w zenbakiaren argumentua aldatzean, poligonoa biratu egiten da, baina ez da aldatzen.', 'Las n raíces tienen el mismo módulo, la raíz n-ésima del de w: están en una circunferencia. Se separan 360°/n y son los vértices de un polígono regular. Al cambiar el argumento de w, el polígono gira, pero no cambia.', 'للجذور الـ n الطويلة نفسها، وهي الجذر النوني لطويلة w: فهي على دائرة. وتفصل بينها 360°/n، وهي رؤوس مضلع منتظم. وعند تغيير عمدة w يدور المضلع ولا يتغير.', 'The n roots have the same modulus, the n-th root of that of w: they lie on a circle. They are 360°/n apart and are the vertices of a regular polygon. When the argument of w changes, the polygon turns, but it does not change.') },
    { ...fromFormulas('spin'), id: 'spin', stage: 'roots', lessonTopic: 'binomial-equations' }
]

export const konplexuakBatx1zLabToolForTopic: Record<string, KonplexuakBatx1zLabToolId | undefined> = {
    'imaginary-unit': 'plane',
    'binomial-form': 'plane',
    'complex-plane': 'plane',
    'add-multiply': 'combination',
    division: 'plane',
    'powers-of-i': 'turn',
    'quadratic-complex': 'plane',
    'modulus-argument': 'plane',
    'polar-binomial': 'circle',
    'product-quotient': 'turn',
    rotations: 'turn',
    'de-moivre': 'turn',
    'nth-roots': 'roots',
    'roots-polygons': 'roots',
    'binomial-equations': 'roots'
}

export const konplexuakBatx1zLabChallengeIds: number[] = [
    planeChallenges,
    vectorChallenges,
    combinationChallenges,
    circleChallenges,
    turnChallenges,
    rootsChallenges,
    spinChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

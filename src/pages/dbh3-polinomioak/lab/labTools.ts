import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { areaChallenges, machineChallenges, tilesChallenges } from '../../dbh2-aljebra-v2/lab/labTools.ts'
import { polynomialsLabTools as appliedTools, ruffiniChallenges } from '../../dbh4-aplikatuak-polinomioak/lab/labTools.ts'
import type { PolynomialsStageId } from '../lessons.tsx'
import { squareChallenges } from './binomialSquare.ts'
import { chipsChallenges } from './chips.ts'
import { factorChallenges } from './factorRectangle.ts'
import { machineChallenges as remainderChallenges } from './remainderMachine.ts'

/* ==========================================================================
   Polinomioak (3. DBH) laboratory. Four tools are new and belong to this
   unit: the monomial chips that join only with like terms, the square of a
   binomial cut into its pieces, the remainder machine (Ruffini's last
   number next to the graph of P) and the rectangle that factorises
   x² + bx + c. The number machine, the algebra tiles, the area of a
   product and Ruffini's table come from 2. and 4. DBH with their own
   challenges. Tests in tests/polinomioak-dbh3-lab.test.ts.
   ========================================================================== */

export type Polynomials3LabToolId = 'chips' | 'machine' | 'tiles' | 'area' | 'square' | 'ruffini' | 'remainder' | 'factor'

export interface Polynomials3LabTool extends LabToolInfo {
    id: Polynomials3LabToolId
    stage: PolynomialsStageId
}

/** Arabic text runs right to left: every formula in it (P(a), (a + b)², p · q = c) is isolated left to right and kept on one line */
const isolate = (text: string) => text.replace(/[A-Za-z0-9(][A-Za-z0-9²³ ()+\-−·=]*[A-Za-z0-9²³)]|[A-Za-z]/g, (formula) => `\u2066${formula.replace(/ /g, '\u00a0')}\u2069`)
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: isolate(ar) })

/** A tool of the 4. DBH aplikatuak laboratory, put in this unit's stage and lesson */
const borrowed = (id: Polynomials3LabToolId, stage: PolynomialsStageId, lessonTopic: string): Polynomials3LabTool => {
    const tool = appliedTools.find((candidate) => candidate.id === id)
    if (!tool) throw new Error(`No borrowed tool ${id}`)
    return { ...tool, id, stage, lessonTopic }
}

export const polynomials3LabTools: Polynomials3LabTool[] = [
    { id: 'chips', stage: 'algebra', lessonTopic: 'monomials', title: say('Monomio-fitxak', 'Las fichas de monomios', 'رقاقات وحيدات الحد', 'Monomial chips'), observe: say('Bi fitxa antzekoak badira (berretzaile bera), elkartu egiten dira eta koefizienteak batzen dira. Ez badira antzekoak, ezin dira elkartu. Bi fitxa aurkako desagertu egiten dira.', 'Si dos fichas son semejantes (mismo exponente), se juntan y se suman los coeficientes. Si no lo son, no se pueden juntar. Dos fichas opuestas desaparecen.', 'إذا كانت رقاقتان متشابهتين (الأس نفسه) تُجمعان وتُجمع معاملاتهما. وإلا فلا تُجمعان. والرقاقتان المتعاكستان تختفيان.', 'If two chips are like terms (same exponent), they join and their coefficients are added. If not, they cannot be joined. Two opposite chips disappear.') },
    borrowed('machine', 'algebra', 'value'),
    borrowed('tiles', 'operations', 'add-sub'),
    borrowed('area', 'operations', 'product'),
    { id: 'square', stage: 'identities', lessonTopic: 'square-sum', title: say('Binomioaren karratua', 'El cuadrado del binomio', 'مربع ثنائي الحد', 'The square of a binomial'), observe: say('(a + b)² karratua lau zatitan banatzen da: a², b² eta bi laukizuzen ab. Bi laukizuzenak ahaztea da akatsik ohikoena.', 'El cuadrado (a + b)² se divide en cuatro piezas: a², b² y dos rectángulos ab. Olvidar los dos rectángulos es el error más común.', 'ينقسم المربع (a + b)² إلى أربع قطع: a² وb² ومستطيلين ab. ونسيان المستطيلين أكثر الأخطاء شيوعًا.', 'The square (a + b)² splits into four pieces: a², b² and two rectangles ab. Forgetting the two rectangles is the most common mistake.') },
    borrowed('ruffini', 'ruffini', 'ruffini'),
    { id: 'remainder', stage: 'ruffini', lessonTopic: 'remainder', title: say('Hondarraren makina', 'La máquina del resto', 'آلة الباقي', 'The remainder machine'), observe: say('Ruffiniren taularen azken zenbakia beti P(a) da. Hondarra 0 denean, a erroa da eta grafikoak ardatza mozten du.', 'El último número de la tabla de Ruffini siempre es P(a). Cuando el resto es 0, a es raíz y la gráfica corta el eje.', 'آخر عدد في جدول روفيني هو دائمًا P(a). وعندما يكون الباقي 0 فإن a جذر والمنحنى يقطع المحور.', 'The last number in Ruffini\'s table is always P(a). When the remainder is 0, a is a root and the graph crosses the axis.') },
    { id: 'factor', stage: 'factor', lessonTopic: 'factor-identities', title: say('Faktorizatzen den laukizuzena', 'El rectángulo que se factoriza', 'المستطيل الذي يتحلّل', 'The rectangle that factorises'), observe: say('x² + bx + c fitxekin (x + p)(x + q) laukizuzena egiteko, p + q = b eta p · q = c izan behar dira. Batzuetan karratu bat ateratzen da, eta beste batzuetan ezin da ezer egin.', 'Para formar el rectángulo (x + p)(x + q) con las fichas de x² + bx + c, tiene que ser p + q = b y p · q = c. A veces sale un cuadrado, y a veces no se puede.', 'لتكوين المستطيل (x + p)(x + q) برقاقات x² + bx + c يجب أن يكون p + q = b وp · q = c. وأحيانًا يخرج مربع وأحيانًا لا يمكن.', 'To make the rectangle (x + p)(x + q) with the tiles of x² + bx + c, p + q = b and p · q = c. Sometimes you get a square, and sometimes it cannot be done.') }
]

export const polynomials3LabToolForTopic: Record<string, Polynomials3LabToolId | undefined> = {
    expressions: 'machine',
    monomials: 'chips',
    value: 'machine',
    'add-sub': 'tiles',
    product: 'area',
    division: 'ruffini',
    'square-sum': 'square',
    'square-diff': 'square',
    'sum-diff': 'square',
    ruffini: 'ruffini',
    remainder: 'remainder',
    roots: 'remainder',
    'common-factor': 'factor',
    'factor-identities': 'factor',
    'algebraic-fractions': 'factor'
}

export const polynomials3LabChallengeIds: number[] = [chipsChallenges, machineChallenges, tilesChallenges, areaChallenges, squareChallenges, ruffiniChallenges, remainderChallenges, factorChallenges].flatMap((list) => list.map((challenge) => challenge.id))

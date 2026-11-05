import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { pythagorasChallenges, realsPercentLabTools } from '../../dbh4-akademikoak-errealak/lab/labTools.ts'
import { combinatoricsAkLabTools, pascalChallenges } from '../../dbh4-akademikoak-konbinatoria/lab/labTools.ts'
import { changeChallenges, commonChallenges, conjugateChallenges, extractChallenges, powersLabTools } from '../../dbh4-akademikoak-potentziak/lab/labTools.ts'
import { intervalsChallenges, roundingChallenges } from '../../dbh4-aplikatuak-errealak/lab/labTools.ts'
import type { BachRealsStageId } from '../lessons.tsx'
import { distanceChallenges } from './distance.ts'
import { bandChallenges } from './errorBand.ts'
import { slideChallenges } from './slideRule.ts'

/* ==========================================================================
   Zenbaki errealak (Batxilergoa 1 · Zientziak) laboratory. Three tools of
   its own, for what 1.º Bachillerato adds: the distance on the line
   (absolute value and neighbourhoods), the slide rule (logarithms turn
   products into sums) and the band of the error (bounds and relative
   error). The review comes from 4. DBH académicas with its challenges and
   ids, so what a student did there counts here too: the Pythagoras
   builder, intervals and rounding, the common index, factors out of the
   root, the conjugate, change of base and Tartaglia's triangle. Tests in
   tests/errealak-batx1z-lab.test.ts.
   ========================================================================== */

export type BachRealsLabToolId = 'pythagoras' | 'intervals' | 'distance' | 'rounding' | 'error-band' | 'extract' | 'common' | 'conjugate' | 'slide-rule' | 'change-base' | 'pascal'

export interface BachRealsLabTool extends LabToolInfo {
    id: BachRealsLabToolId
    stage: BachRealsStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bachRealsLabTools: BachRealsLabTool[] = [
    { ...from(realsPercentLabTools, 'pythagoras'), id: 'pythagoras', stage: 'reals', lessonTopic: 'exact-line' },
    { id: 'distance', stage: 'absolute', lessonTopic: 'absolute-value', title: say('Distantzia zuzenean', 'Distancia en la recta', 'المسافة على المستقيم', 'Distance on the line'), observe: say('|x − a| x eta a arteko distantzia da. x ingurunean dago distantzia r baino txikiagoa denean: ertza ez dago barruan.', '|x − a| es la distancia entre x y a. x está en el entorno cuando esa distancia es menor que r: el borde no entra.', '|x − a| هي المسافة بين x وa. تكون x في الجوار إذا كانت هذه المسافة أقل من r، والحافة لا تدخل.', '|x − a| is the distance between x and a. x is in the neighbourhood when that distance is less than r: the edge is not included.') },
    { ...from(realsPercentLabTools, 'intervals'), id: 'intervals', stage: 'absolute', lessonTopic: 'interval-sets' },
    { id: 'error-band', stage: 'errors', lessonTopic: 'relative', title: say('Errorearen banda', 'La banda del error', 'شريط الخطأ', 'The error band'), observe: say('Zifra bat gehiago, banda hamar aldiz estuagoa. Biribiltzean, balio zehatza unitate erdi bat baino gertuago dago; moztean, beti gainean.', 'Una cifra más, la banda diez veces más estrecha. Al redondear, el valor exacto está a menos de media unidad; al truncar, siempre por encima.', 'رقم إضافي يجعل الشريط أضيق بعشر مرات. عند التدوير تكون القيمة الدقيقة على بعد أقل من نصف وحدة، وعند القطع تكون دائمًا فوق.', 'One more figure, a band ten times narrower. When rounding, the exact value is less than half a unit away; when truncating, it is always above.') },
    { ...from(realsPercentLabTools, 'rounding'), id: 'rounding', stage: 'errors', lessonTopic: 'scientific-errors' },
    { ...from(powersLabTools, 'extract'), id: 'extract', stage: 'radicals', lessonTopic: 'radical-ops' },
    { ...from(powersLabTools, 'common'), id: 'common', stage: 'radicals', lessonTopic: 'radical-ops' },
    { ...from(powersLabTools, 'conjugate'), id: 'conjugate', stage: 'radicals', lessonTopic: 'rationalize' },
    { id: 'slide-rule', stage: 'radicals', lessonTopic: 'logarithms', title: say('Kalkulu-erregela', 'La regla de cálculo', 'مسطرة الحساب', 'The slide rule'), observe: say('Eskala logaritmikoan luzerak batzean zenbakiak biderkatzen dira: log a + log b = log(a · b). Kentzean, zatitu.', 'En la escala logarítmica, al sumar longitudes se multiplican los números: log a + log b = log(a · b). Al restarlas, se divide.', 'في السلّم اللوغاريتمي يؤدي جمع الأطوال إلى ضرب الأعداد: log a + log b = log(a · b). وطرحها يعني القسمة.', 'On the logarithmic scale, adding lengths multiplies the numbers: log a + log b = log(a · b). Subtracting them divides.') },
    { ...from(powersLabTools, 'change-base'), id: 'change-base', stage: 'radicals', lessonTopic: 'log-unknown' },
    { ...from(combinatoricsAkLabTools, 'pascal'), id: 'pascal', stage: 'newton-stage', lessonTopic: 'combinatorial' }
]

export const bachRealsLabToolForTopic: Record<string, BachRealsLabToolId | undefined> = {
    'irrational-proof': 'pythagoras',
    'exact-line': 'pythagoras',
    'interval-sets': 'intervals',
    'absolute-value': 'distance',
    neighbourhoods: 'distance',
    significant: 'error-band',
    relative: 'error-band',
    'scientific-errors': 'rounding',
    'radical-ops': 'extract',
    rationalize: 'conjugate',
    logarithms: 'slide-rule',
    'log-unknown': 'change-base',
    combinatorial: 'pascal',
    newton: 'pascal'
}

export const bachRealsLabChallengeIds: number[] = [
    pythagorasChallenges,
    distanceChallenges,
    intervalsChallenges,
    bandChallenges,
    roundingChallenges,
    extractChallenges,
    commonChallenges,
    conjugateChallenges,
    slideChallenges,
    changeChallenges,
    pascalChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

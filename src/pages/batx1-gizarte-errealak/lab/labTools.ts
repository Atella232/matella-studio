import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { bachRealsLabTools } from '../../batx1-zientziak-errealak/lab/labTools.ts'
import { distanceChallenges } from '../../batx1-zientziak-errealak/lab/distance.ts'
import { changeChallenges, commonChallenges, conjugateChallenges, extractChallenges } from '../../dbh4-akademikoak-potentziak/lab/labTools.ts'
import { intervalsChallenges, roundingChallenges } from '../../dbh4-aplikatuak-errealak/lab/labTools.ts'
import type { GizRealsStageId } from '../lessons.tsx'
import { commaChallenges } from './comma.ts'
import { digitsChallenges } from './digits.ts'
import { weightChallenges } from './weight.ts'

/* ==========================================================================
   Zenbaki errealak (Batxilergoa 1 · Gizarte Zientziak) laboratory. Three
   tools of its own, with economic data: the same error with a different
   weight (relative error), how many digits (the whole-number part of a
   logarithm on a logarithmic ruler) and the travelling point (scientific
   notation). The others come from the 1.º Ciencias twin as they are there,
   with their challenges and ids (progress is kept apart, under this unit's
   storage prefix): intervals, distance on the line, rounding, taking
   factors out, the common index, the conjugate and change of base.
   Tests in tests/errealak-batx1g-lab.test.ts.
   ========================================================================== */

export type GizRealsLabToolId = 'intervals' | 'distance' | 'common' | 'extract' | 'conjugate' | 'digits' | 'change-base' | 'rounding' | 'weight' | 'comma'

export interface GizRealsLabTool extends LabToolInfo {
    id: GizRealsLabToolId
    stage: GizRealsStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** A tool of 1.º Ciencias in a stage of this unit */
const borrowed = (id: GizRealsLabToolId, stage: GizRealsStageId, lessonTopic: string): GizRealsLabTool => ({ ...bachRealsLabTools.find((tool) => tool.id === id)!, id, stage, lessonTopic })

export const gizRealsLabTools: GizRealsLabTool[] = [
    borrowed('intervals', 'line', 'interval-sets'),
    borrowed('distance', 'line', 'absolute-value'),
    borrowed('common', 'radicals', 'radical-power'),
    borrowed('extract', 'radicals', 'radical-ops'),
    borrowed('conjugate', 'radicals', 'rationalize'),
    { id: 'digits', stage: 'logs', lessonTopic: 'log-integer', title: say('Zenbat zifra ditu?', '¿Cuántas cifras tiene?', 'كم رقمًا فيه؟', 'How many digits?'), observe: say('Erregela logaritmikoan, 10 zenbakiaren berreturak zenbaki osoetan daude. log N zenbakiaren zati osoa berretzailea da: zifra kopurua ken bat. Erdia ez da 5: 3,16 da.', 'En la regla logarítmica, las potencias de 10 caen en los enteros. La parte entera de log N es el exponente: las cifras menos una. El punto medio no es el 5: es el 3,16.', 'على المسطرة اللوغاريتمية تقع قوى 10 عند الأعداد الصحيحة. الجزء الصحيح من log N هو الأس: عدد الأرقام ناقص واحد. والمنتصف ليس 5 بل 3.16.', 'On the logarithmic ruler, the powers of 10 fall on the whole numbers. The whole-number part of log N is the exponent: the digits minus one. The middle is not 5: it is 3.16.') },
    borrowed('change-base', 'logs', 'log-unknown'),
    borrowed('rounding', 'errors', 'significant'),
    { id: 'weight', stage: 'errors', lessonTopic: 'relative', title: say('Errore bera, pisu desberdina', 'El mismo error, distinto peso', 'الخطأ نفسه بوزن مختلف', 'Same error, different weight'), observe: say('Errore absolutu handi batek pisu txikia izan dezake kantitate handi batean. Errore erlatiboak, errorea zati balioa, konparatzen ditu biak.', 'Un error absoluto grande puede pesar poco en una cantidad grande. El error relativo, error entre valor, es el que permite comparar.', 'قد يكون الخطأ المطلق الكبير خفيفًا في كمية كبيرة. والخطأ النسبي، أي الخطأ مقسومًا على القيمة، هو الذي يسمح بالمقارنة.', 'A big absolute error can weigh little in a big quantity. The relative error, error divided by value, is what lets you compare.') },
    { id: 'comma', stage: 'errors', lessonTopic: 'big-numbers', title: say('Koma bidaiaria', 'La coma viajera', 'الفاصلة المتنقلة', 'The travelling point'), observe: say('Berretzailea bat igotzen bada, koma leku bat ezkerrera doa, eta zenbakia ez da aldatzen. Idazkera zientifikoan, zifra bakarra komaren aurretik.', 'Si el exponente sube uno, la coma va un lugar a la izquierda, y el número no cambia. En notación científica, una sola cifra antes de la coma.', 'إذا زاد الأس واحدًا تحركت الفاصلة منزلة إلى اليسار، والعدد لا يتغير. وفي الترميز العلمي رقم واحد قبل الفاصلة.', 'If the exponent goes up by one, the point moves one place left, and the number does not change. In scientific notation, a single digit before the point.') }
]

export const gizRealsLabToolForTopic: Record<string, GizRealsLabToolId | undefined> = {
    'set-language': 'intervals',
    'interval-sets': 'intervals',
    'absolute-value': 'distance',
    neighbourhoods: 'distance',
    'radical-power': 'common',
    'radical-ops': 'extract',
    rationalize: 'conjugate',
    logarithms: 'digits',
    'log-integer': 'digits',
    'log-unknown': 'change-base',
    significant: 'rounding',
    relative: 'weight',
    'big-numbers': 'comma',
    'scientific-errors': 'comma'
}

export const gizRealsLabChallengeIds: number[] = [
    intervalsChallenges,
    distanceChallenges,
    commonChallenges,
    extractChallenges,
    conjugateChallenges,
    digitsChallenges,
    changeChallenges,
    roundingChallenges,
    weightChallenges,
    commaChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

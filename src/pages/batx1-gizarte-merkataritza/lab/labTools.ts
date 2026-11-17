import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { chainChallenges } from '../../dbh2-proportzionaltasuna-v2/lab/labTools.ts'
import { calendarChallenges } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/calendar.ts'
import { growthChallenges, proportionDbh4ApLabTools } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/labTools.ts'
import { percentBarChallenges } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/percentBar.ts'
import { receiptChallenges } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/receipt.ts'
import type { GizMoneyStageId } from '../lessons.tsx'
import { doubleChallenges } from './double.ts'
import { tableChallenges } from './table.ts'
import { taeChallenges } from './tae.ts'

/* ==========================================================================
   Merkataritza-aritmetika (Batxilergoa 1 · Gizarte Zientziak) laboratory.
   Three tools of its own: when does it double (time with logarithms), the
   repayment table and the APR grows. The others come from 4. DBH
   aplikatuak as they are there, with their challenges and ids (progress is
   kept apart, under this unit's storage prefix): the 100 % bar, chained
   percentages, the shopping receipt, simple or compound, and interest in
   months and days. Tests in tests/merkataritza-batx1g-lab.test.ts.
   ========================================================================== */

export type GizMoneyLabToolId = 'percentbar' | 'chain' | 'receipt' | 'growth' | 'calendar' | 'double' | 'tae' | 'table'

export interface GizMoneyLabTool extends LabToolInfo {
    id: GizMoneyLabToolId
    stage: GizMoneyStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** A tool of 4. DBH aplikatuak in a stage of this unit */
const borrowed = (id: GizMoneyLabToolId, stage: GizMoneyStageId, lessonTopic: string): GizMoneyLabTool => ({ ...proportionDbh4ApLabTools.find((tool) => tool.id === id)!, id, stage, lessonTopic })

export const gizMoneyLabTools: GizMoneyLabTool[] = [
    borrowed('percentbar', 'percent', 'index'),
    borrowed('chain', 'percent', 'chained'),
    borrowed('receipt', 'percent', 'chained'),
    borrowed('growth', 'interest', 'compound-interest'),
    borrowed('calendar', 'interest', 'periods'),
    { id: 'double', stage: 'interest', lessonTopic: 'interest-time', title: say('Noiz bikoizten da?', '¿Cuándo se duplica?', 'متى يتضاعف؟', 'When does it double?'), observe: say('Interesa bikoiztean, denbora ia erdira jaisten da, baina ez zehazki. Urteak logaritmoekin kalkulatzen dira eta gora biribiltzen dira: 72 zati interesa, gutxi gorabehera bikoizteko urteak.', 'Al duplicar el interés, el tiempo baja casi a la mitad, pero no exactamente. Los años salen con logaritmos y se redondean hacia arriba: 72 entre el interés, más o menos, los años para duplicar.', 'عند مضاعفة الفائدة ينخفض الزمن إلى النصف تقريبًا لا بالضبط. السنوات تُحسب باللوغاريتمات وتُقرَّب إلى الأعلى: 72 مقسومة على الفائدة تقريبًا سنوات المضاعفة.', 'When the interest doubles, the time drops to almost half, but not exactly. The years come from logarithms and are rounded up: 72 divided by the interest is roughly the years to double.') },
    { id: 'tae', stage: 'tae', lessonTopic: 'tae', title: say('Urteko tasa baliokidea hazten da', 'La TAE crece', 'المعدل السنوي المكافئ ينمو', 'The APR grows'), observe: say('Urtean behin ordainduta, tasa nominala bera da. Aldi gehiagorekin hazten da, baina gero eta gutxiago: hilero eta egunero ia berdin. Interes handiagoarekin, alde handiagoa.', 'Pagada una vez al año, la TAE es el nominal. Con más periodos crece, pero cada vez menos: mensual y diario casi igual. Con más interés, más diferencia.', 'إذا دُفعت مرة في السنة فالمعدل هو الاسمي. ومع فترات أكثر يزيد لكن بشكل أقل فأقل: الشهري واليومي متقاربان. ومع فائدة أكبر يكون الفرق أكبر.', 'Paid once a year, the APR is the nominal rate. With more periods it grows, but less and less: monthly and daily are almost the same. With more interest, a bigger gap.') },
    { id: 'table', stage: 'loans', lessonTopic: 'amortization-table', title: say('Amortizazio-taula', 'El cuadro de amortización', 'جدول الإطفاء', 'The repayment table'), observe: say('Urteko bera ordainduta, zorra gero eta azkarrago jaisten da: interesak txikitzen dira eta amortizazioa handitzen. Urtekoa txikiegia bada, zorra geratzen da; handiegia bada, gehiegi ordaintzen da.', 'Pagando lo mismo cada año, la deuda baja cada vez más deprisa: los intereses bajan y la amortización sube. Si la anualidad es pequeña, queda deuda; si es grande, se paga de más.', 'بدفع المبلغ نفسه كل سنة ينخفض الدين بسرعة متزايدة: الفوائد تنقص والإطفاء يزيد. إذا كانت الدفعة صغيرة بقي دين، وإذا كانت كبيرة دُفع أكثر.', 'Paying the same each year, the debt goes down faster and faster: the interest shrinks and the repayment grows. If the payment is too small, debt is left; if too big, you overpay.') }
]

export const gizMoneyLabToolForTopic: Record<string, GizMoneyLabToolId | undefined> = {
    index: 'percentbar',
    chained: 'chain',
    'percent-inverse': 'percentbar',
    'compound-interest': 'growth',
    periods: 'calendar',
    'interest-time': 'double',
    tae: 'tae',
    'tae-costs': 'tae',
    'loan-payment': 'table',
    'amortization-table': 'table',
    'pending-debt': 'table'
}

export const gizMoneyLabChallengeIds: number[] = [
    percentBarChallenges,
    chainChallenges,
    receiptChallenges,
    growthChallenges,
    calendarChallenges,
    doubleChallenges,
    taeChallenges,
    tableChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { centreChallenges, cumulativeChallenges, histogramChallenges } from '../../dbh2-estatistika-v2/lab/labTools.ts'
import { balanceChallenges, statisticsAkLabTools } from '../../dbh4-akademikoak-estatistika/lab/labTools.ts'
import { intervalsChallenges, percentileChallenges, tableChallenges, whiskersChallenges } from '../../dbh4-aplikatuak-estatistika/lab/labTools.ts'
import type { SocialStatsStageId } from '../lessons.tsx'
import { betweenChallenges } from './between.ts'
import { ogiveChallenges } from './ogive.ts'
import { widthsChallenges } from './widths.ts'

/* ==========================================================================
   Estatistika unidimentsionala (Batxilergoa 1 · Gizarte Zientziak)
   laboratory. Three tools of its own, for what the Sociales book adds:
   different widths (bars drawn with height f and then with height f / a),
   the cumulative percentage polygon (percentiles of grouped data by
   interpolation, and the percentile of a value) and «how many fit?» (two
   cuts on a histogram, the intervals at the ends split in proportion).
   The review comes with its challenges and ids from 4. DBH, as in 1.º
   Ciencias (cumulative frequencies, intervals, centre, histogram, the
   two-group balance, percentile tape, whiskers, σ of a table); their
   progress is kept under this unit's storage prefix. Tests in
   tests/estatistika-batx1g-lab.test.ts.
   ========================================================================== */

export type SocialStatsLabToolId = 'cumulative' | 'intervals' | 'widths' | 'centre' | 'histogram' | 'balance' | 'percentile' | 'ogive' | 'whiskers' | 'table' | 'between'

export interface SocialStatsLabTool extends LabToolInfo {
    id: SocialStatsLabToolId
    stage: SocialStatsStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const fromAk = (id: string) => statisticsAkLabTools.find((tool) => tool.id === id)!

export const socialStatsLabTools: SocialStatsLabTool[] = [
    { ...fromAk('cumulative'), id: 'cumulative', stage: 'data', lessonTopic: 'frequency-tables' },
    { ...fromAk('intervals'), id: 'intervals', stage: 'data', lessonTopic: 'class-intervals' },
    { id: 'widths', stage: 'data', lessonTopic: 'unequal-widths', title: say('Zabalera desberdinak', 'Anchos distintos', 'أطوال مختلفة', 'Different widths'), observe: say('Altuera maiztasuna bada, barra zabal batek datu gehiago dituela ematen du. Altuera f / a bada, azalera da maiztasuna, eta barrek orduko zenbat pertsona dauden erakusten dute.', 'Si la altura es la frecuencia, una barra ancha parece tener más datos. Si la altura es f / a, el área es la frecuencia y las barras muestran cuántas personas hay por hora.', 'إذا كان الارتفاع هو التكرار بدا العمود العريض كأن فيه بيانات أكثر. وإذا كان الارتفاع f / a فالمساحة هي التكرار، وتُظهر الأعمدة عدد الأشخاص لكل ساعة.', 'If the height is the frequency, a wide bar looks as if it held more data. If the height is f / a, the area is the frequency and the bars show how many people there are per hour.') },
    { ...fromAk('centre'), id: 'centre', stage: 'centre', lessonTopic: 'centre-measures' },
    { ...fromAk('histogram'), id: 'histogram', stage: 'centre', lessonTopic: 'grouped-centre' },
    { ...fromAk('balance'), id: 'balance', stage: 'centre', lessonTopic: 'group-means' },
    { ...fromAk('percentile'), id: 'percentile', stage: 'position', lessonTopic: 'quartiles-percentiles' },
    { id: 'ogive', stage: 'position', lessonTopic: 'grouped-percentiles', title: say('Poligono metatua', 'El polígono acumulado', 'المضلّع المتجمّع', 'The cumulative polygon'), observe: say('Tarte baten barruan poligonoa zuzena da, eta pertzentila triangelu antzekoekin irakurtzen da. Poligonoa malkartsua den lekuan, ehunekoa azkar igotzen da eta pertzentilak elkarrengandik gertu daude.', 'Dentro de un intervalo el polígono es recto y el percentil se lee con triángulos semejantes. Donde el polígono es empinado, el porcentaje sube deprisa y los percentiles quedan muy juntos.', 'داخل الفئة يكون المضلّع مستقيمًا ويُقرأ المئين بمثلثات متشابهة. وحيث يكون المضلّع شديد الانحدار تصعد النسبة بسرعة وتتقارب المئينات.', 'Inside an interval the polygon is straight and the percentile is read with similar triangles. Where the polygon is steep, the percentage rises fast and the percentiles are close together.') },
    { ...fromAk('whiskers'), id: 'whiskers', stage: 'position', lessonTopic: 'box-plot' },
    { ...fromAk('table'), id: 'table', stage: 'spread', lessonTopic: 'variance-sd' },
    { id: 'between', stage: 'interpretation', lessonTopic: 'share-between', title: say('Zenbat sartzen dira?', '¿Cuántos caben?', 'كم يتّسع؟', 'How many fit?'), observe: say('Muturretako tarteetatik, ebakien artean geratzen den zatia bakarrik zenbatzen da: zabaleraren erdia bada, haren datuen erdia. Ebakiak erditik zabaltzean, hasieran datu asko sartzen dira, eta muturretan gutxi.', 'De los intervalos de los extremos solo cuenta la parte que queda entre los cortes: si es la mitad de la amplitud, la mitad de sus datos. Al abrir los cortes desde el centro, al principio entran muchos datos y en los extremos pocos.', 'من فئتي الطرفين لا يُعدّ إلا الجزء الواقع بين القطعين: فإن كان نصف الطول فنصف بياناتها. وعند فتح القطعين من الوسط تدخل في البداية بيانات كثيرة وفي الطرفين قليلة.', 'From the intervals at the ends only the part between the cuts counts: if it is half the width, half of its data. As the cuts open from the middle, many data come in at first and few at the ends.') }
]

export const socialStatsLabToolForTopic: Record<string, SocialStatsLabToolId | undefined> = {
    'frequency-tables': 'cumulative',
    'class-intervals': 'intervals',
    'unequal-widths': 'widths',
    'centre-measures': 'centre',
    'grouped-centre': 'histogram',
    'group-means': 'balance',
    'quartiles-percentiles': 'percentile',
    'cumulative-polygon': 'ogive',
    'grouped-percentiles': 'ogive',
    'percentile-of-value': 'ogive',
    'box-plot': 'whiskers',
    'variance-sd': 'table',
    'quartile-counts': 'whiskers',
    'share-between': 'between',
    'mean-sd-band': 'between'
}

export const socialStatsLabChallengeIds: number[] = [
    cumulativeChallenges,
    intervalsChallenges,
    widthsChallenges,
    centreChallenges,
    histogramChallenges,
    balanceChallenges,
    percentileChallenges,
    ogiveChallenges,
    whiskersChallenges,
    tableChallenges,
    betweenChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))

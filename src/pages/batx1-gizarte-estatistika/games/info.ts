import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { statisticsAkGames } from '../../dbh4-akademikoak-estatistika/games/info.ts'
import { bachStatsGames } from '../../batx1-zientziak-estatistika/games/info.ts'

/* ==========================================================================
   Estatistika unidimentsionala (Batxilergoa 1 · Gizarte Zientziak) games:
   the list shown in the hub, with levels and the unit progress id each
   level earns with its first star. Three games of its own (quality
   control, hunt the percentile and the detective), the race and the
   memory; and two borrowed with their texts and levels but the progress
   ids of this unit: the box plot of 4. DBH académicas and «which
   histogram?» of 1.º Ciencias.
   ========================================================================== */

export type SocialStatsGameId = 'race' | 'quality' | 'hunt' | 'detective' | 'memory' | 'histogram' | 'box'

export const SOCIAL_STATS_GAME_RECORDS_KEY = 'matella-estatistika-batx1g-game-records'

const boxSource = statisticsAkGames.find((game) => game.id === 'box')!
const histogramSource = bachStatsGames.find((game) => game.id === 'histogram')!

export const socialStatsGames: GameInfo<SocialStatsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Estatistikaren lasterketa', es: 'Carrera de estadística', en: 'Statistics race', ar: 'سباق الإحصاء' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 137401, stage: 'data', title: { eu: 'Datuak', es: 'Datos', en: 'Data', ar: 'البيانات' }, description: { eu: 'Ehunekoak eta barren altuera.', es: 'Porcentajes y altura de las barras.', en: 'Percentages and bar heights.', ar: 'النسب وارتفاع الأعمدة.' } },
            { progressId: 137402, stage: 'centre', title: { eu: 'Zentralizazioa', es: 'Centralización', en: 'Centre', ar: 'النزعة المركزية' }, description: { eu: 'Batez bestekoa, tarteak eta bi talde.', es: 'Media, intervalos y dos grupos.', en: 'Mean, intervals and two groups.', ar: 'المتوسط والفئات ومجموعتان.' } },
            { progressId: 137403, stage: 'position', title: { eu: 'Posizioa', es: 'Posición', en: 'Position', ar: 'الموضع' }, description: { eu: 'Interpolazioa eta mediana.', es: 'Interpolación y mediana.', en: 'Interpolation and median.', ar: 'الاستكمال والوسيط.' } },
            { progressId: 137404, stage: 'spread', title: { eu: 'Sakabanatzea', es: 'Dispersión', en: 'Spread', ar: 'التشتت' }, description: { eu: 'σ, bariantza eta CV.', es: 'σ, varianza y CV.', en: 'σ, variance and CV.', ar: 'σ والتباين وCV.' } },
            { progressId: 137405, stage: 'interpretation', title: { eu: 'Interpretatu', es: 'Interpretar', en: 'Interpret', ar: 'التفسير' }, description: { eu: 'Kuartilak, tarte baten zatia eta banda.', es: 'Cuartiles, parte de un intervalo y banda.', en: 'Quartiles, part of an interval and the band.', ar: 'الربيعيات وجزء فئة والنطاق.' } }
        ]
    },
    {
        id: 'quality',
        title: { eu: 'Kalitate-kontrola', es: 'Control de calidad', en: 'Quality control', ar: 'مراقبة الجودة' },
        tagline: { eu: 'Lantegi batek bi mugaren arteko piezak onartzen ditu: zenbat dira akastunak?', es: 'Una fábrica acepta las piezas entre dos límites: ¿cuántas son defectuosas?', en: 'A factory accepts the parts between two limits: how many are faulty?', ar: 'يقبل مصنع القطع بين حدّين: كم قطعة معيبة؟' },
        skills: { eu: 'Tarteak proportzioan zatitzea', es: 'Partir intervalos en proporción', en: 'Splitting intervals in proportion', ar: 'تقسيم الفئات بالتناسب' },
        levels: [
            { progressId: 137501, stage: 'interpretation', title: { eu: 'Erdian', es: 'En el centro', en: 'In the middle', ar: 'في الوسط' }, description: { eu: 'Mugak tarteen erdian.', es: 'Los límites en la mitad de los intervalos.', en: 'The limits halfway along the intervals.', ar: 'الحدّان في منتصف الفئتين.' } },
            { progressId: 137502, stage: 'interpretation', title: { eu: 'Laurdenak', es: 'Cuartos', en: 'Quarters', ar: 'الأرباع' }, description: { eu: 'Mugak laurden batean edo hirutan.', es: 'Los límites a un cuarto o a tres cuartos.', en: 'The limits at a quarter or three quarters.', ar: 'الحدّان عند ربع أو ثلاثة أرباع.' } },
            { progressId: 137503, stage: 'interpretation', title: { eu: 'Ehunekotan', es: 'En porcentaje', en: 'As a percentage', ar: 'بالنسبة المئوية' }, description: { eu: 'Akastunen ehunekoa.', es: 'El porcentaje de defectuosas.', en: 'The percentage of faulty parts.', ar: 'نسبة القطع المعيبة.' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Ehizatu pertzentila', es: 'Caza el percentil', en: 'Hunt the percentile', ar: 'اصطد المئين' },
        tagline: { eu: 'Ehuneko metatuen poligono bat: aurkitu pertzentila, balio baten pertzentila edo bi balioren arteko ehunekoa.', es: 'Un polígono de porcentajes acumulados: encuentra el percentil, el percentil de un valor o el porcentaje entre dos valores.', en: 'A cumulative percentage polygon: find the percentile, the percentile of a value or the percentage between two values.', ar: 'مضلّع نسب متجمّعة: جد المئين أو مئين قيمة أو النسبة بين قيمتين.' },
        skills: { eu: 'Poligonoan interpolatzea', es: 'Interpolar en el polígono', en: 'Interpolating on the polygon', ar: 'الاستكمال على المضلّع' },
        levels: [
            { progressId: 137601, stage: 'position', title: { eu: 'Pₖ balioa', es: 'El valor de Pₖ', en: 'The value of Pₖ', ar: 'قيمة Pₖ' }, description: { eu: 'Ehunekotik baliora.', es: 'Del porcentaje al valor.', en: 'From the percentage to the value.', ar: 'من النسبة إلى القيمة.' } },
            { progressId: 137602, stage: 'position', title: { eu: 'Balio baten %', es: 'El % de un valor', en: 'The % of a value', ar: 'نسبة قيمة' }, description: { eu: 'Baliotik ehunekora.', es: 'Del valor al porcentaje.', en: 'From the value to the percentage.', ar: 'من القيمة إلى النسبة.' } },
            { progressId: 137603, stage: 'interpretation', title: { eu: 'Bi balioren artean', es: 'Entre dos valores', en: 'Between two values', ar: 'بين قيمتين' }, description: { eu: 'Zer ehuneko dago tarte batean.', es: 'Qué porcentaje hay en un tramo.', en: 'What percentage lies in a stretch.', ar: 'كم نسبة في جزء.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Estatistikaren detektibea', es: 'Detective de estadística', en: 'Statistics detective', ar: 'مخبر الإحصاء' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 137701, stage: 'centre', title: { eu: 'Datuak eta zentroa', es: 'Datos y centro', en: 'Data and centre', ar: 'البيانات والنزعة المركزية' }, description: { eu: 'Altuerak, bi taldeak eta poligonoa.', es: 'Alturas, dos grupos y el polígono.', en: 'Heights, two groups and the polygon.', ar: 'الارتفاعات والمجموعتان والمضلّع.' } },
            { progressId: 137702, stage: 'position', title: { eu: 'Pertzentilak', es: 'Percentiles', en: 'Percentiles', ar: 'المئينات' }, description: { eu: 'Datu multzokatuetan interpolatzea.', es: 'Interpolar con datos agrupados.', en: 'Interpolating with grouped data.', ar: 'الاستكمال مع البيانات المبوّبة.' } },
            { progressId: 137703, stage: 'interpretation', title: { eu: 'Interpretatu', es: 'Interpretar', en: 'Interpret', ar: 'التفسير' }, description: { eu: 'Zatiak, banda, kuartilak eta CV.', es: 'Partes, banda, cuartiles y CV.', en: 'Parts, the band, quartiles and CV.', ar: 'الأجزاء والنطاق والربيعيات وCV.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: maiztasuna eta zabalera haien altuerarekin, interpolazio bat haren balioarekin, edo bi talde haien batez bestekoarekin.', es: 'Encuentra las parejas: frecuencia y amplitud con su altura, una interpolación con su valor, o dos grupos con su media.', en: 'Find the pairs: frequency and width with their height, an interpolation with its value, or two groups with their mean.', ar: 'جد الأزواج: التكرار والطول مع الارتفاع، أو استكمال مع قيمته، أو مجموعتان مع متوسطهما.' },
        skills: { eu: 'Altuerak, pertzentilak eta batez bestekoak', es: 'Alturas, percentiles y medias', en: 'Heights, percentiles and means', ar: 'الارتفاعات والمئينات والمتوسطات' },
        levels: [
            { progressId: 137801, stage: 'data', title: { eu: 'Altuerak', es: 'Alturas', en: 'Heights', ar: 'الارتفاعات' }, description: { eu: 'f = 30, a = 5 ↔ 6', es: 'f = 30, a = 5 ↔ 6', en: 'f = 30, a = 5 ↔ 6', ar: 'f = 30, a = 5 ↔ 6' } },
            { progressId: 137802, stage: 'position', title: { eu: 'Pertzentilak', es: 'Percentiles', en: 'Percentiles', ar: 'المئينات' }, description: { eu: '20 + 10/40 · 10 ↔ 22,5', es: '20 + 10/40 · 10 ↔ 22,5', en: '20 + 10/40 · 10 ↔ 22.5', ar: '20 + 10/40 · 10 ↔ 22.5' } },
            { progressId: 137803, stage: 'centre', title: { eu: 'Bi talde', es: 'Dos grupos', en: 'Two groups', ar: 'مجموعتان' }, description: { eu: '10 · 4 eta 30 · 8 ↔ x̄ = 7', es: '10 · 4 y 30 · 8 ↔ x̄ = 7', en: '10 · 4 and 30 · 8 ↔ x̄ = 7', ar: '10 · 4 و30 · 8 ↔ x̄ = 7' } }
        ]
    },
    // «Which histogram?» of 1.º Ciencias, with this unit's progress ids
    { ...histogramSource, id: 'histogram', levels: histogramSource.levels.map((level, index) => ({ ...level, progressId: 137821 + index })) },
    // The 4. DBH box plot, with this unit's progress ids
    { ...boxSource, id: 'box', levels: boxSource.levels.map((level, index) => ({ ...level, stage: 'position', progressId: 137811 + index })) }
]

export const socialStatsGameProgressIds: number[] = levelProgressIds(socialStatsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const socialStatsGameSlugs: Record<SocialStatsGameId, string> = { race: 'lasterketa', quality: 'kalitatea', hunt: 'pertzentila', detective: 'detektibea', memory: 'memoria', histogram: 'histograma', box: 'kaxa' }

export function socialStatsGameModeForPath(pathname: string): SocialStatsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['kalitatea', 'calidad'].includes(game)) return 'quality'
    if (['pertzentila', 'percentil'].includes(game)) return 'hunt'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['histograma', 'que-histograma'].includes(game)) return 'histogram'
    if (['kaxa', 'caja'].includes(game)) return 'box'
    return 'hub'
}

import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Estatistika (4. DBH akademikoak) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   ========================================================================== */

export type StatisticsAkGameId = 'race' | 'memory'

export const STATISTICS_AK_GAME_RECORDS_KEY = 'matella-estatistika-dbh4ak-game-records'

export const statisticsAkGames: GameInfo<StatisticsAkGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Datuen lasterketa', es: 'Carrera de datos', ar: 'سباق البيانات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 82101, stage: 'data', title: { eu: 'Laginak eta taulak', es: 'Muestras y tablas', ar: 'العيّنات والجداول' }, description: { eu: 'Geruzak, lagin sistematikoak eta metatuak.', es: 'Estratos, muestras sistemáticas y acumuladas.', ar: 'الطبقات والعيّنات المنتظمة والمتجمّعة.' } },
            { progressId: 82102, stage: 'centre', title: { eu: 'Batez bestekoak', es: 'Medias', ar: 'المتوسطات' }, description: { eu: 'Taulak, talde batuak eta falta diren datuak.', es: 'Tablas, grupos juntos y datos que faltan.', ar: 'الجداول والمجموعات المدمجة والبيانات الناقصة.' } },
            { progressId: 82103, stage: 'position', title: { eu: 'Posizioa', es: 'Posición', ar: 'الموقع' }, description: { eu: 'Kuartilak, biboteak eta pertzentilak.', es: 'Cuartiles, bigotes y percentiles.', ar: 'الربيعيات والشاربان والمئينات.' } },
            { progressId: 82104, stage: 'spread', title: { eu: 'Sakabanaketa', es: 'Dispersión', ar: 'التشتت' }, description: { eu: 'DM, bariantza eta CV.', es: 'DM, varianza y CV.', ar: 'DM والتباين وCV.' } },
            { progressId: 82105, stage: 'two', title: { eu: 'Erregresioa', es: 'Regresión', ar: 'الانحدار' }, description: { eu: 'Estimazioak eta zuzenaren parametroak.', es: 'Estimaciones y parámetros de la recta.', ar: 'التقديرات ومعاملات المستقيم.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Geruzak, batez bestekoak eta CV', es: 'Estratos, medias y CV', ar: 'الطبقات والمتوسطات وCV' },
        levels: [
            { progressId: 82201, stage: 'data', title: { eu: 'Geruzak', es: 'Estratos', ar: 'الطبقات' }, description: { eu: '40 · 90/400 ↔ 9', es: '40 · 90/400 ↔ 9', ar: '40 · 90/400 ↔ 9' } },
            { progressId: 82202, stage: 'centre', title: { eu: 'Batez bestekoak', es: 'Medias', ar: 'المتوسطات' }, description: { eu: '3, 5, 10 ↔ 6', es: '3, 5, 10 ↔ 6', ar: '3, 5, 10 ↔ 6' } },
            { progressId: 82203, stage: 'spread', title: { eu: 'Aldakuntza', es: 'Variación', ar: 'الاختلاف' }, description: { eu: 'σ = 3, x̄ = 12 ↔ 0,25', es: 'σ = 3, x̄ = 12 ↔ 0,25', ar: 'σ = 3، x̄ = 12 ↔ 0.25' } }
        ]
    }
]

export const statisticsAkGameProgressIds: number[] = levelProgressIds(statisticsAkGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const statisticsAkGameSlugs: Record<StatisticsAkGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function statisticsAkGameModeForPath(pathname: string): StatisticsAkGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Estatistika eta probabilitatea (4. DBH aplikatuak) games: the list shown
   in the hub, with levels and the unit progress id each level earns with
   its first star.
   ========================================================================== */

export type StatisticsGameId = 'race' | 'memory'

export const STATISTICS_GAME_RECORDS_KEY = 'matella-estatistika-dbh4ap-game-records'

export const statisticsGames: GameInfo<StatisticsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Estatistikaren lasterketa', es: 'Carrera estadística', ar: 'السباق الإحصائي' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 60101, stage: 'data', title: { eu: 'Datuak', es: 'Datos', ar: 'البيانات' }, description: { eu: 'Zabalerak, klase-markak eta sektoreak.', es: 'Amplitudes, marcas de clase y sectores.', ar: 'أطوال الفئات ومراكزها والقطاعات.' } },
            { progressId: 60102, stage: 'centre', title: { eu: 'Posizioa', es: 'Posición', ar: 'الموقع' }, description: { eu: 'Batez bestekoa, pertzentilak eta biboteak.', es: 'Media, percentiles y bigotes.', ar: 'المتوسط والمئينات والشاربان.' } },
            { progressId: 60103, stage: 'spread', title: { eu: 'Sakabanaketa', es: 'Dispersión', ar: 'التشتت' }, description: { eu: 'Bariantza, σ eta CV.', es: 'Varianza, σ y CV.', ar: 'التباين وσ وCV.' } },
            { progressId: 60104, stage: 'two', title: { eu: 'Bi aldagai', es: 'Dos variables', ar: 'متغيران' }, description: { eu: 'Estimazioak eta r.', es: 'Estimaciones y r.', ar: 'التقديرات وr.' } },
            { progressId: 60105, stage: 'chance', title: { eu: 'Probabilitatea', es: 'Probabilidad', ar: 'الاحتمال' }, description: { eu: 'Bildura, zuhaitzak eta baldintzatuak.', es: 'Unión, árboles y condicionadas.', ar: 'الاتحاد والأشجار والمشروط.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu datu bakoitza bere emaitzarekin.', es: 'Une cada dato con su resultado.', ar: 'صِل كل معطى بنتيجته.' },
        skills: { eu: 'Biboteak, CV eta zuhaitzak', es: 'Bigotes, CV y árboles', ar: 'الشاربان وCV والأشجار' },
        levels: [
            { progressId: 60201, stage: 'centre', title: { eu: 'Biboteak', es: 'Bigotes', ar: 'الشاربان' }, description: { eu: 'Q₁ = 4, Q₃ = 8 ↔ 14', es: 'Q₁ = 4, Q₃ = 8 ↔ 14', ar: 'Q₁ = 4, Q₃ = 8 ↔ 14' } },
            { progressId: 60202, stage: 'spread', title: { eu: 'Aldakuntza', es: 'Variación', ar: 'الاختلاف' }, description: { eu: 'x̄ = 50, σ = 4 ↔ 8 %', es: 'x̄ = 50, σ = 4 ↔ 8 %', ar: 'x̄ = 50, σ = 4 ↔ 8 %' } },
            { progressId: 60203, stage: 'chance', title: { eu: 'Zuhaitzak', es: 'Árboles', ar: 'الأشجار' }, description: { eu: '2/5 · 3/4 ↔ 3/10', es: '2/5 · 3/4 ↔ 3/10', ar: '2/5 · 3/4 ↔ 3/10' } }
        ]
    }
]

export const statisticsGameProgressIds: number[] = levelProgressIds(statisticsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const statisticsGameSlugs: Record<StatisticsGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function statisticsGameModeForPath(pathname: string): StatisticsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

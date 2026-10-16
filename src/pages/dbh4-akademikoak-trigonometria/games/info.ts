import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Trigonometria (4. DBH akademikoak) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first
   star.
   ========================================================================== */

export type TrigonometryGameId = 'race' | 'memory'

export const TRIGONOMETRY_GAME_RECORDS_KEY = 'matella-trigonometria-dbh4ak-game-records'

export const trigonometryGames: GameInfo<TrigonometryGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Trigonometriaren lasterketa', es: 'Carrera de trigonometría', ar: 'سباق حساب المثلثات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 72101, stage: 'ratios', title: { eu: 'Arrazoiak', es: 'Razones', ar: 'النسب' }, description: { eu: 'Hiru aldeetatik, 30°, 45° eta 60°, eta hipotenusa.', es: 'A partir de los tres lados, 30°, 45° y 60°, y la hipotenusa.', ar: 'من الأضلاع الثلاثة، و30° و45° و60°، والوتر.' } },
            { progressId: 72102, stage: 'identities', title: { eu: 'Oinarrizko erlazioak', es: 'Relaciones fundamentales', ar: 'العلاقات الأساسية' }, description: { eu: 'Arrazoi batetik besteetara, minutuak eta kalkulagailua.', es: 'De una razón a las demás, minutos y calculadora.', ar: 'من نسبة إلى البقية، والدقائق والآلة الحاسبة.' } },
            { progressId: 72103, stage: 'solving', title: { eu: 'Triangelu angeluzuzenak', es: 'Triángulos rectángulos', ar: 'المثلثات القائمة' }, description: { eu: 'Aldeak, angeluak, goratzea eta beheratzea.', es: 'Lados, ángulos, elevación y depresión.', ar: 'الأضلاع والزوايا والارتفاع والانخفاض.' } },
            { progressId: 72104, stage: 'problems', title: { eu: 'Altuerak eta azalerak', es: 'Alturas y áreas', ar: 'الارتفاعات والمساحات' }, description: { eu: 'Behaketa bikoitza, triangeluak eta paralelogramoak.', es: 'Doble observación, triángulos y paralelogramos.', ar: 'الرصد المزدوج والمثلثات ومتوازيات الأضلاع.' } },
            { progressId: 72105, stage: 'circle', title: { eu: 'Zirkunferentzia goniometrikoa', es: 'Circunferencia goniométrica', ar: 'الدائرة المثلثية' }, description: { eu: 'Zeinuak, lehen koadrantera eta radianak.', es: 'Signos, reducción al primer cuadrante y radianes.', ar: 'الإشارات والإرجاع إلى الربع الأول والراديان.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Radianak, minutuak eta azalerak', es: 'Radianes, minutos y áreas', ar: 'الراديان والدقائق والمساحات' },
        levels: [
            { progressId: 72201, stage: 'circle', title: { eu: 'Graduak eta radianak', es: 'Grados y radianes', ar: 'الدرجات والراديان' }, description: { eu: '150° ↔ 5π/6', es: '150° ↔ 5π/6', ar: '150° ↔ 5π/6' } },
            { progressId: 72202, stage: 'identities', title: { eu: 'Minutuak eta hamartarrak', es: 'Minutos y decimales', ar: 'الدقائق والأعداد العشرية' }, description: { eu: '12° 30′ ↔ 12,5°', es: '12° 30′ ↔ 12,5°', ar: '12° 30′ ↔ 12.5°' } },
            { progressId: 72203, stage: 'problems', title: { eu: 'Triangeluen azalerak', es: 'Áreas de triángulos', ar: 'مساحات المثلثات' }, description: { eu: 'b = 4, c = 6, A = 30° ↔ S = 6', es: 'b = 4, c = 6, A = 30° ↔ S = 6', ar: 'b = 4, c = 6, A = 30° ↔ S = 6' } }
        ]
    }
]

export const trigonometryGameProgressIds: number[] = levelProgressIds(trigonometryGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const trigonometryGameSlugs: Record<TrigonometryGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function trigonometryGameModeForPath(pathname: string): TrigonometryGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

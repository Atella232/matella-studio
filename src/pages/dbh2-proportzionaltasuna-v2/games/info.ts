import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Proportzionaltasuna eta ehunekoak (2. DBH) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its first
   star.
   ========================================================================== */

export type ProportionDbh2GameId = 'race' | 'memory'

export const PROPORTION_DBH2_GAME_RECORDS_KEY = 'matella-proportzionaltasuna-dbh2-game-records'

export const proportionDbh2Games: GameInfo<ProportionDbh2GameId>[] = [
    {
        id: 'race',
        title: { eu: 'Proportzioen lasterketa', es: 'Carrera de proporciones', ar: 'سباق التناسب' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 22101, stage: 'proportions', title: { eu: 'Proportzioak', es: 'Proporciones', ar: 'التناسبات' }, description: { eu: 'Laugarren proportzionala eta alderantzizkoa.', es: 'Cuarto proporcional e inversa.', ar: 'الرابع المتناسب والعكسي.' } },
            { progressId: 22102, stage: 'compound', title: { eu: 'Konposatua', es: 'Compuesta', ar: 'المركّب' }, description: { eu: 'Bi magnitude aldi berean.', es: 'Dos magnitudes a la vez.', ar: 'مقداران معًا.' } },
            { progressId: 22103, stage: 'shares', title: { eu: 'Banaketak', es: 'Repartos', ar: 'التوزيعات' }, description: { eu: 'Zuzenak eta alderantzizkoak.', es: 'Directos e inversos.', ar: 'طردية وعكسية.' } },
            { progressId: 22104, stage: 'percent', title: { eu: 'Ehunekoak', es: 'Porcentajes', ar: 'النسب المئوية' }, description: { eu: 'Zatia, osoa eta aldakuntza.', es: 'La parte, el total y la variación.', ar: 'الجزء والكل والتغيّر.' } },
            { progressId: 22105, stage: 'changes', title: { eu: 'Indizeak eta interesa', es: 'Índices e interés', ar: 'المؤشرات والفائدة' }, description: { eu: 'Hasierakoa, kateatuak eta interesa.', es: 'La inicial, encadenados e interés.', ar: 'الأصلية والمتتالية والفائدة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Ehunekoak, indizeak eta kateatuak', es: 'Porcentajes, índices y encadenados', ar: 'النسب والمؤشرات والمتتالية' },
        levels: [
            { progressId: 22201, stage: 'percent', title: { eu: 'Ehunekoa eta hamartarra', es: 'Porcentaje y decimal', ar: 'النسبة والعدد العشري' }, description: { eu: '120 % ↔ 1,2', es: '120 % ↔ 1,2', ar: '120٪ ↔ 1.2' } },
            { progressId: 22202, stage: 'changes', title: { eu: 'Aldakuntza-indizea', es: 'Índice de variación', ar: 'مؤشر التغيّر' }, description: { eu: '−15 % ↔ · 0,85', es: '−15 % ↔ · 0,85', ar: '−15٪ ↔ · 0.85' } },
            { progressId: 22203, stage: 'changes', title: { eu: 'Indize kateatuak', es: 'Índices encadenados', ar: 'المؤشرات المتتالية' }, description: { eu: '1,1 · 0,9 ↔ 0,99', es: '1,1 · 0,9 ↔ 0,99', ar: '1.1 · 0.9 ↔ 0.99' } }
        ]
    }
]

export const proportionDbh2GameProgressIds: number[] = levelProgressIds(proportionDbh2Games)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const proportionDbh2GameSlugs: Record<ProportionDbh2GameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function proportionDbh2GameModeForPath(pathname: string): ProportionDbh2GameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

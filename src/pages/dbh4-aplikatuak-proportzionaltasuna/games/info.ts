import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Proportzionaltasuna (4. DBH aplikatuak) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first
   star.
   ========================================================================== */

export type ProportionDbh4ApGameId = 'race' | 'memory'

export const PROPORTION_DBH4AP_GAME_RECORDS_KEY = 'matella-proportzionaltasuna-dbh4ap-game-records'

export const proportionDbh4ApGames: GameInfo<ProportionDbh4ApGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Proportzioen lasterketa', es: 'Carrera de proporciones', ar: 'سباق التناسب' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 44101, stage: 'simple', title: { eu: 'Proportzio soila', es: 'Proporcionalidad simple', ar: 'التناسب البسيط' }, description: { eu: 'Laugarren proportzionala eta alderantzizkoa.', es: 'Cuarto proporcional e inversa.', ar: 'الرابع المتناسب والعكسي.' } },
            { progressId: 44102, stage: 'compound', title: { eu: 'Konposatua eta banaketak', es: 'Compuesta y repartos', ar: 'المركّب والتوزيعات' }, description: { eu: 'Bi magnitude aldi berean eta banaketak.', es: 'Dos magnitudes a la vez y repartos.', ar: 'مقداران معًا والتوزيعات.' } },
            { progressId: 44103, stage: 'percent', title: { eu: 'Ehunekoak', es: 'Porcentajes', ar: 'النسب المئوية' }, description: { eu: 'Zatia, osoa, indizeak eta kateatuak.', es: 'La parte, el total, índices y encadenados.', ar: 'الجزء والكل والمؤشرات والمتتالية.' } },
            { progressId: 44104, stage: 'interest', title: { eu: 'Interesa', es: 'Interés', ar: 'الفائدة' }, description: { eu: 'Konposatua aurrera eta atzera, bakuna hilabeteka.', es: 'Compuesto hacia delante y hacia atrás, simple por meses.', ar: 'المركّبة ذهابًا وإيابًا، والبسيطة بالأشهر.' } },
            { progressId: 44105, stage: 'problems', title: { eu: 'Nahasketak, mugikariak eta txorrotak', es: 'Mezclas, móviles y grifos', ar: 'الخلائط والمتحركات والصنابير' }, description: { eu: 'Prezio ertaina, topaketak eta lan bateratua.', es: 'Precio medio, encuentros y trabajo conjunto.', ar: 'السعر المتوسط والتلاقي والعمل المشترك.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Indizeak, kateatuak eta interes konposatua', es: 'Índices, encadenados e interés compuesto', ar: 'المؤشرات والمتتالية والفائدة المركّبة' },
        levels: [
            { progressId: 44201, stage: 'percent', title: { eu: 'Aldakuntza-indizea', es: 'Índice de variación', ar: 'مؤشر التغيّر' }, description: { eu: '−15 % ↔ · 0,85', es: '−15 % ↔ · 0,85', ar: '−15٪ ↔ · 0.85' } },
            { progressId: 44202, stage: 'percent', title: { eu: 'Indize kateatuak', es: 'Índices encadenados', ar: 'المؤشرات المتتالية' }, description: { eu: '1,1 · 0,9 ↔ 0,99', es: '1,1 · 0,9 ↔ 0,99', ar: '1.1 · 0.9 ↔ 0.99' } },
            { progressId: 44203, stage: 'interest', title: { eu: 'Interes konposatua', es: 'Interés compuesto', ar: 'الفائدة المركّبة' }, description: { eu: '1000 · 1,1² ↔ 1210', es: '1000 · 1,1² ↔ 1210', ar: '1000 · 1.1² ↔ 1210' } }
        ]
    }
]

export const proportionDbh4ApGameProgressIds: number[] = levelProgressIds(proportionDbh4ApGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const proportionDbh4ApGameSlugs: Record<ProportionDbh4ApGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function proportionDbh4ApGameModeForPath(pathname: string): ProportionDbh4ApGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

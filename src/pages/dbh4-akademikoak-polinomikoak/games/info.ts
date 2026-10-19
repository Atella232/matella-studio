import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Funtzio polinomikoak eta arrazionalak (4. DBH akademikoak) games: the
   list shown in the hub, with levels and the unit progress id each level
   earns with its first star.
   ========================================================================== */

export type PolynomialAkGameId = 'race' | 'memory'

export const POLYNOMIAL_AK_GAME_RECORDS_KEY = 'matella-polinomikoak-dbh4ak-game-records'

export const polynomialAkGames: GameInfo<PolynomialAkGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zuzen eta kurben lasterketa', es: 'Carrera de rectas y curvas', ar: 'سباق المستقيمات والمنحنيات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 78101, stage: 'lines', title: { eu: 'Zuzenak', es: 'Rectas', ar: 'المستقيمات' }, description: { eu: 'Malda, jatorriko ordenatua eta X ardatzarekiko ebakidura.', es: 'Pendiente, ordenada en el origen y corte con el eje X.', ar: 'الميل والجزء المقطوع والتقاطع مع محور X.' } },
            { progressId: 78102, stage: 'parabolas', title: { eu: 'Parabolak', es: 'Parábolas', ar: 'القطوع المكافئة' }, description: { eu: 'Erpina, maximoak eta minimoak, erroak.', es: 'Vértice, máximos y mínimos, raíces.', ar: 'الرأس والقيم العظمى والصغرى والجذور.' } },
            { progressId: 78103, stage: 'shifts', title: { eu: 'Lekualdaketak', es: 'Traslaciones', ar: 'الانسحابات' }, description: { eu: 'Forma kanonikoa, a parametroa, ebakidurak eta ukitzaileak.', es: 'Forma canónica, el parámetro a, cortes y tangentes.', ar: 'الصورة القانونية والوسيط a والتقاطعات والمماسات.' } },
            { progressId: 78104, stage: 'absolute', title: { eu: 'Balio absolutua', es: 'Valor absoluto', ar: 'القيمة المطلقة' }, description: { eu: 'Irudiak, erpinak, ekuazioak eta islatutako maximoak.', es: 'Imágenes, picos, ecuaciones y máximos reflejados.', ar: 'الصور والرؤوس والمعادلات والقيم العظمى المنعكسة.' } },
            { progressId: 78105, stage: 'rational', title: { eu: 'Hiperbolak', es: 'Hipérbolas', ar: 'القطوع الزائدة' }, description: { eu: 'k, alderantzizko proportzionaltasuna eta asintotak.', es: 'k, proporcionalidad inversa y asíntotas.', ar: 'k والتناسب العكسي والمقاربات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Maldak, erpinak eta asintotak', es: 'Pendientes, vértices y asíntotas', ar: 'الميول والرؤوس والمقاربات' },
        levels: [
            { progressId: 78201, stage: 'lines', title: { eu: 'Bi puntu eta malda', es: 'Dos puntos y la pendiente', ar: 'نقطتان والميل' }, description: { eu: '(1, 2) · (3, 8) ↔ 3', es: '(1, 2) · (3, 8) ↔ 3', ar: '(1, 2) · (3, 8) ↔ 3' } },
            { progressId: 78202, stage: 'parabolas', title: { eu: 'Parabola eta erpina', es: 'Parábola y vértice', ar: 'القطع ورأسه' }, description: { eu: 'x² − 6x + 5 ↔ (3, −4)', es: 'x² − 6x + 5 ↔ (3, −4)', ar: 'x² − 6x + 5 ↔ (3, −4)' } },
            { progressId: 78203, stage: 'rational', title: { eu: 'Asintotak', es: 'Asíntotas', ar: 'المقاربات' }, description: { eu: '(2x + 1)/(x − 1) ↔ x = 1, y = 2', es: '(2x + 1)/(x − 1) ↔ x = 1, y = 2', ar: '(2x + 1)/(x − 1) ↔ x = 1, y = 2' } }
        ]
    }
]

export const polynomialAkGameProgressIds: number[] = levelProgressIds(polynomialAkGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const polynomialAkGameSlugs: Record<PolynomialAkGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function polynomialAkGameModeForPath(pathname: string): PolynomialAkGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

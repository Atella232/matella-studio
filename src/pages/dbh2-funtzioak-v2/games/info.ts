import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Funtzioak (2. DBH) games: the list shown in the hub, with levels and the
   unit progress id each level earns with its first star.
   ========================================================================== */

export type FunctionsGameId = 'race' | 'plot' | 'memory'

export const FUNCTIONS_GAME_RECORDS_KEY = 'matella-funtzioak-dbh2-game-records'

export const functionsGames: GameInfo<FunctionsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Funtzioen lasterketa', es: 'Carrera de funciones', en: 'Function race', ar: 'سباق الدوال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 31101, stage: 'idea', title: { eu: 'Koordenatuak eta erlazioak', es: 'Coordenadas y relaciones', en: 'Coordinates and relations', ar: 'الإحداثيات والعلاقات' }, description: { eu: 'Koadranteak, planoko puntuak, funtzioak eta laukizuzenak.', es: 'Cuadrantes, puntos del plano, funciones y rectángulos.', en: 'Quadrants, points on the grid, functions and rectangles.', ar: 'الأرباع ونقاط المستوى والدوال والمستطيلات.' } },
            { progressId: 31102, stage: 'representations', title: { eu: 'Formulak eta puntuak', es: 'Fórmulas y puntos', en: 'Formulas and points', ar: 'الصيغ والنقاط' }, description: { eu: 'f(x) kalkulatu eta puntuak egiaztatu.', es: 'Calcular f(x) y comprobar puntos.', en: 'Work out f(x) and check points.', ar: 'حساب f(x) والتحقق من النقاط.' } },
            { progressId: 31103, stage: 'reading', title: { eu: 'Grafikoak irakurri', es: 'Leer gráficas', en: 'Read graphs', ar: 'قراءة الرسوم' }, description: { eu: 'Balioak, maximoak, beherakortasuna eta ebakidurak.', es: 'Valores, máximos, decrecimiento y cortes con los ejes.', en: 'Values, maxima, decrease and intercepts with the axes.', ar: 'القيم والقيم العظمى والتناقص والتقاطعات.' } },
            { progressId: 31104, stage: 'proportional', title: { eu: 'Malda', es: 'La pendiente', en: 'Slope', ar: 'الميل' }, description: { eu: 'y = mx eta malda, kalkulatuta eta grafikoan irakurrita.', es: 'y = mx y la pendiente, calculada y leída en la gráfica.', en: 'y = mx and the slope, calculated and read from the graph.', ar: 'y = mx والميل حسابًا وقراءةً من الرسم.' } },
            { progressId: 31105, stage: 'lines', title: { eu: 'Zuzenak eta tarifak', es: 'Rectas y tarifas', en: 'Straight lines and tariffs', ar: 'الخطوط والتعرفات' }, description: { eu: 'y = mx + n: grafikoaren ekuazioa eta buruketak.', es: 'y = mx + n: la ecuación de una gráfica y problemas.', en: 'y = mx + n: the equation of a graph and problems.', ar: 'y = mx + n: معادلة الرسم والمسائل.' } }
        ]
    },
    {
        id: 'plot',
        title: { eu: 'Kokatu puntua', es: 'Sitúa el punto', en: 'Plot the point', ar: 'ضع النقطة' },
        tagline: { eu: 'Zortzi puntu planoan: sakatu non dagoen. Bi saiakera dituzu puntu bakoitzeko.', es: 'Ocho puntos en el plano: pulsa dónde está cada uno. Tienes dos intentos por punto.', en: 'Eight points on the grid: click where each one is. You have two tries per point.', ar: 'ثماني نقاط في المستوى: اضغط على موضع كل نقطة. لديك محاولتان لكل نقطة.' },
        skills: { eu: 'Koordenatuak eta funtzioen puntuak kokatzea', es: 'Situar coordenadas y puntos de funciones', en: 'Plot coordinates and points of functions', ar: 'تحديد الإحداثيات ونقاط الدوال' },
        levels: [
            { progressId: 31201, stage: 'idea', title: { eu: 'Lehen koadrantea', es: 'Primer cuadrante', en: 'First quadrant', ar: 'الربع الأول' }, description: { eu: 'Bi koordenatuak positiboak.', es: 'Las dos coordenadas son positivas.', en: 'Both coordinates are positive.', ar: 'الإحداثيان موجبان.' } },
            { progressId: 31202, stage: 'idea', title: { eu: 'Lau koadranteak', es: 'Los cuatro cuadrantes', en: 'All four quadrants', ar: 'الأرباع الأربعة' }, description: { eu: 'Zeinu guztiak eta ardatzak.', es: 'Todos los signos y los ejes.', en: 'All the signs and the axes.', ar: 'كل الإشارات والمحاور.' } },
            { progressId: 31203, stage: 'representations', title: { eu: 'Funtzioen puntuak', es: 'Puntos de funciones', en: 'Points of functions', ar: 'نقاط الدوال' }, description: { eu: 'Kalkulatu y eta kokatu (x, y).', es: 'Calcula y y sitúa (x, y).', en: 'Work out y and plot (x, y).', ar: 'احسب y وضع (x, y).' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: funtzio bat eta bere emaitza, bi puntu eta malda edo zuzen bat eta bere ebakidura.', es: 'Encuentra las parejas: una función y su resultado, dos puntos y su pendiente o una recta y su corte.', en: 'Find the pairs: a function and its result, two points and their slope, or a straight line and its intercept.', ar: 'جد الأزواج: دالة ونتيجتها أو نقطتان وميلهما أو خط وتقاطعه.' },
        skills: { eu: 'f(x), malda eta ebakidurak buruz kalkulatzea', es: 'Calcular f(x), pendientes y cortes de cabeza', en: 'Work out f(x), slopes and intercepts in your head', ar: 'حساب f(x) والميول والتقاطعات ذهنيًا' },
        levels: [
            { progressId: 31301, stage: 'representations', title: { eu: 'Balioak', es: 'Valores', en: 'Values', ar: 'القيم' }, description: { eu: 'y = 2x − 3, x = 4 ↔ y = 5', es: 'y = 2x − 3, x = 4 ↔ y = 5', en: 'y = 2x − 3, x = 4 ↔ y = 5', ar: 'y = 2x − 3, x = 4 ↔ y = 5' } },
            { progressId: 31302, stage: 'proportional', title: { eu: 'Maldak', es: 'Pendientes', en: 'Slopes', ar: 'الميول' }, description: { eu: 'A(1, 2), B(3, 6) ↔ m = 2', es: 'A(1, 2), B(3, 6) ↔ m = 2', en: 'A(1, 2), B(3, 6) ↔ m = 2', ar: 'A(1, 2), B(3, 6) ↔ m = 2' } },
            { progressId: 31303, stage: 'lines', title: { eu: 'Ebakidurak', es: 'Cortes con el eje X', en: 'x-axis intercepts', ar: 'التقاطعات' }, description: { eu: 'y = 2x − 6 ↔ (3, 0)', es: 'y = 2x − 6 ↔ (3, 0)', en: 'y = 2x − 6 ↔ (3, 0)', ar: 'y = 2x − 6 ↔ (3, 0)' } }
        ]
    }
]

export const functionsGameProgressIds: number[] = levelProgressIds(functionsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const functionsGameSlugs: Record<FunctionsGameId, string> = { race: 'lasterketa', plot: 'puntuak', memory: 'memoria' }

export function functionsGameModeForPath(pathname: string): FunctionsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['puntos', 'puntuak', 'situar'].includes(game)) return 'plot'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

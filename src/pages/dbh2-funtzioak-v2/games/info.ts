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
        title: { eu: 'Funtzioen lasterketa', es: 'Carrera de funciones', ar: 'سباق الدوال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 31101, stage: 'idea', title: { eu: 'Koordenatuak eta erlazioak', es: 'Coordenadas y relaciones', ar: 'الإحداثيات والعلاقات' }, description: { eu: 'Koadranteak, planoko puntuak, funtzioak eta laukizuzenak.', es: 'Cuadrantes, puntos del plano, funciones y rectángulos.', ar: 'الأرباع ونقاط المستوى والدوال والمستطيلات.' } },
            { progressId: 31102, stage: 'representations', title: { eu: 'Formulak eta puntuak', es: 'Fórmulas y puntos', ar: 'الصيغ والنقاط' }, description: { eu: 'f(x) kalkulatu eta puntuak egiaztatu.', es: 'Calcular f(x) y comprobar puntos.', ar: 'حساب f(x) والتحقق من النقاط.' } },
            { progressId: 31103, stage: 'reading', title: { eu: 'Grafikoak irakurri', es: 'Leer gráficas', ar: 'قراءة الرسوم' }, description: { eu: 'Balioak, maximoak, beherakortasuna eta ebakidurak.', es: 'Valores, máximos, decrecimiento y cortes con los ejes.', ar: 'القيم والقيم العظمى والتناقص والتقاطعات.' } },
            { progressId: 31104, stage: 'proportional', title: { eu: 'Malda', es: 'La pendiente', ar: 'الميل' }, description: { eu: 'y = mx eta malda, kalkulatuta eta grafikoan irakurrita.', es: 'y = mx y la pendiente, calculada y leída en la gráfica.', ar: 'y = mx والميل حسابًا وقراءةً من الرسم.' } },
            { progressId: 31105, stage: 'lines', title: { eu: 'Zuzenak eta tarifak', es: 'Rectas y tarifas', ar: 'الخطوط والتعرفات' }, description: { eu: 'y = mx + n: grafikoaren ekuazioa eta buruketak.', es: 'y = mx + n: la ecuación de una gráfica y problemas.', ar: 'y = mx + n: معادلة الرسم والمسائل.' } }
        ]
    },
    {
        id: 'plot',
        title: { eu: 'Kokatu puntua', es: 'Sitúa el punto', ar: 'ضع النقطة' },
        tagline: { eu: 'Zortzi puntu planoan: sakatu non dagoen. Bi saiakera dituzu puntu bakoitzeko.', es: 'Ocho puntos en el plano: pulsa dónde está cada uno. Tienes dos intentos por punto.', ar: 'ثماني نقاط في المستوى: اضغط على موضع كل نقطة. لديك محاولتان لكل نقطة.' },
        skills: { eu: 'Koordenatuak eta funtzioen puntuak kokatzea', es: 'Situar coordenadas y puntos de funciones', ar: 'تحديد الإحداثيات ونقاط الدوال' },
        levels: [
            { progressId: 31201, stage: 'idea', title: { eu: 'Lehen koadrantea', es: 'Primer cuadrante', ar: 'الربع الأول' }, description: { eu: 'Bi koordenatuak positiboak.', es: 'Las dos coordenadas son positivas.', ar: 'الإحداثيان موجبان.' } },
            { progressId: 31202, stage: 'idea', title: { eu: 'Lau koadranteak', es: 'Los cuatro cuadrantes', ar: 'الأرباع الأربعة' }, description: { eu: 'Zeinu guztiak eta ardatzak.', es: 'Todos los signos y los ejes.', ar: 'كل الإشارات والمحاور.' } },
            { progressId: 31203, stage: 'representations', title: { eu: 'Funtzioen puntuak', es: 'Puntos de funciones', ar: 'نقاط الدوال' }, description: { eu: 'Kalkulatu y eta kokatu (x, y).', es: 'Calcula y y sitúa (x, y).', ar: 'احسب y وضع (x, y).' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: funtzio bat eta bere emaitza, bi puntu eta malda edo zuzen bat eta bere ebakidura.', es: 'Encuentra las parejas: una función y su resultado, dos puntos y su pendiente o una recta y su corte.', ar: 'جد الأزواج: دالة ونتيجتها أو نقطتان وميلهما أو خط وتقاطعه.' },
        skills: { eu: 'f(x), malda eta ebakidurak buruz kalkulatzea', es: 'Calcular f(x), pendientes y cortes de cabeza', ar: 'حساب f(x) والميول والتقاطعات ذهنيًا' },
        levels: [
            { progressId: 31301, stage: 'representations', title: { eu: 'Balioak', es: 'Valores', ar: 'القيم' }, description: { eu: 'y = 2x − 3, x = 4 ↔ y = 5', es: 'y = 2x − 3, x = 4 ↔ y = 5', ar: 'y = 2x − 3, x = 4 ↔ y = 5' } },
            { progressId: 31302, stage: 'proportional', title: { eu: 'Maldak', es: 'Pendientes', ar: 'الميول' }, description: { eu: 'A(1, 2), B(3, 6) ↔ m = 2', es: 'A(1, 2), B(3, 6) ↔ m = 2', ar: 'A(1, 2), B(3, 6) ↔ m = 2' } },
            { progressId: 31303, stage: 'lines', title: { eu: 'Ebakidurak', es: 'Cortes con el eje X', ar: 'التقاطعات' }, description: { eu: 'y = 2x − 6 ↔ (3, 0)', es: 'y = 2x − 6 ↔ (3, 0)', ar: 'y = 2x − 6 ↔ (3, 0)' } }
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

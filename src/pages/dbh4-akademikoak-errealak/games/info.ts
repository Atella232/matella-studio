import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Zenbaki errealak eta ehunekoak (4. DBH, akademikoak) games: the list shown
   in the hub, with levels and the unit progress id each level earns with
   its first star. "Kokatu zuzenean" is the applied unit's game.
   ========================================================================== */

export type PercentGameId = 'race' | 'place' | 'memory'

export const PERCENT_GAME_RECORDS_KEY = 'matella-errealak-dbh4ak-game-records'

export const percentGames: GameInfo<PercentGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Errealen eta ehunekoen lasterketa', es: 'Carrera de reales y porcentajes', ar: 'سباق الأعداد الحقيقية والنسب' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 42101, stage: 'rational', title: { eu: 'Hamartarrak eta zatikiak', es: 'Decimales y fracciones', ar: 'العشريات والكسور' }, description: { eu: 'Hamartar motak eta zatiki sortzailea.', es: 'Tipos de decimales y fracción generatriz.', ar: 'أنواع العشريات والكسر المولّد.' } },
            { progressId: 42102, stage: 'reals', title: { eu: 'Irrazionalak', es: 'Irracionales', ar: 'غير النسبية' }, description: { eu: 'Zein den irrazionala eta erroak zuzenean.', es: 'Reconocer irracionales y situar raíces.', ar: 'تمييز غير النسبية وتحديد الجذور.' } },
            { progressId: 42103, stage: 'approx', title: { eu: 'Tarteak eta hurbilketak', es: 'Intervalos y aproximaciones', ar: 'الفترات والتقريب' }, description: { eu: 'Tarteak, biribiltzea eta errore absolutua.', es: 'Intervalos, redondeo y error absoluto.', ar: 'الفترات والتدوير والخطأ المطلق.' } },
            { progressId: 42104, stage: 'percent', title: { eu: 'Ehunekoak', es: 'Porcentajes', ar: 'النسب المئوية' }, description: { eu: 'Ehunekoa, indizea, kateatuak eta hasierako kantitatea.', es: 'Porcentaje, índice, encadenados y cantidad inicial.', ar: 'النسبة والمؤشر والمتسلسلة والكمية الأولية.' } },
            { progressId: 42105, stage: 'interest', title: { eu: 'Interesak', es: 'Intereses', ar: 'الفوائد' }, description: { eu: 'Interes sinplea eta konposatua.', es: 'Interés simple y compuesto.', ar: 'الفائدة البسيطة والمركبة.' } }
        ]
    },
    {
        id: 'place',
        title: { eu: 'Kokatu zuzenean', es: 'Sitúa en la recta', ar: 'ضعه على المستقيم' },
        tagline: { eu: 'Zortzi zenbaki zuzen errealean: sakatu non dagoen bakoitza. Bi saiakera dituzu zenbaki bakoitzeko.', es: 'Ocho números en la recta real: pulsa dónde está cada uno. Tienes dos intentos por número.', ar: 'ثمانية أعداد على المستقيم الحقيقي: اضغط على موضع كل عدد. لديك محاولتان لكل عدد.' },
        skills: { eu: 'Zatikiak, hamartarrak eta irrazionalak zuzenean kokatzea', es: 'Situar fracciones, decimales e irracionales en la recta', ar: 'وضع الكسور والعشريات وغير النسبية على المستقيم' },
        levels: [
            { progressId: 42201, stage: 'rational', title: { eu: 'Laurdenak', es: 'Cuartos', ar: 'الأرباع' }, description: { eu: 'Zatikiak eta hamartarrak: 3/4, −1,5, 7/4…', es: 'Fracciones y decimales: 3/4, −1,5, 7/4…', ar: 'كسور وعشريات: 3/4 و⁦−1.5⁩ و7/4…' } },
            { progressId: 42202, stage: 'rational', title: { eu: 'Hamarrenak', es: 'Décimas', ar: 'الأعشار' }, description: { eu: 'Hamarrenetako marrak: 0,7, −1,3, 3/5…', es: 'Marcas de décimas: 0,7, −1,3, 3/5…', ar: 'علامات الأعشار: 0.7 و⁦−1.3⁩ و3/5…' } },
            { progressId: 42203, stage: 'reals', title: { eu: 'Irrazionalak', es: 'Irracionales', ar: 'غير النسبية' }, description: { eu: '√2, √10, π… inguruko hamarrenean.', es: '√2, √10, π… en la décima más próxima.', ar: '√2 و√10 وπ… عند أقرب عُشر.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: hamartar periodiko bat eta bere zatikia, ehuneko bat eta bere indizea edo tarte bat eta bere desberdintza.', es: 'Encuentra las parejas: un decimal periódico y su fracción, un porcentaje y su índice o un intervalo y su desigualdad.', ar: 'جد الأزواج: عدد عشري دوري وكسره، أو نسبة ومؤشرها، أو فترة ومتباينتها.' },
        skills: { eu: 'Zatiki sortzailea, indizeak eta tarteak buruz', es: 'Fracción generatriz, índices e intervalos de cabeza', ar: 'الكسر المولّد والمؤشرات والفترات ذهنيًا' },
        levels: [
            { progressId: 42301, stage: 'rational', title: { eu: 'Zatiki sortzailea', es: 'Fracción generatriz', ar: 'الكسر المولّد' }, description: { eu: '0,8333… ↔ 5/6', es: '0,8333… ↔ 5/6', ar: '0.8333… ↔ 5/6' } },
            { progressId: 42302, stage: 'percent', title: { eu: 'Indizeak', es: 'Índices', ar: 'المؤشرات' }, description: { eu: '+21 % ↔ × 1,21', es: '+21 % ↔ × 1,21', ar: '+21 % ↔ × 1.21' } },
            { progressId: 42303, stage: 'approx', title: { eu: 'Tarteak', es: 'Intervalos', ar: 'الفترات' }, description: { eu: '−2 ≤ x < 4 ↔ [−2, 4)', es: '−2 ≤ x < 4 ↔ [−2, 4)', ar: '−2 ≤ x < 4 ↔ [−2, 4)' } }
        ]
    }
]

export const percentGameProgressIds: number[] = levelProgressIds(percentGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const percentGameSlugs: Record<PercentGameId, string> = { race: 'lasterketa', place: 'zuzena', memory: 'memoria' }

export function percentGameModeForPath(pathname: string): PercentGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zuzena', 'recta', 'situar', 'kokatu'].includes(game)) return 'place'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

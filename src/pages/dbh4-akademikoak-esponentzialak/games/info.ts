import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Funtzio esponentzialak, logaritmikoak eta trigonometrikoak (4. DBH
   akademikoak) games: the list shown in the hub, with levels and the unit
   progress id each level earns with its first star.
   ========================================================================== */

export type ExponentialAkGameId = 'race' | 'memory' | 'laser' | 'growth' | 'detective'

export const EXPONENTIAL_AK_GAME_RECORDS_KEY = 'matella-esponentzialak-dbh4ak-game-records'

export const exponentialAkGames: GameInfo<ExponentialAkGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Berretura eta uhinen lasterketa', es: 'Carrera de potencias y ondas', en: 'Powers and waves race', ar: 'سباق القوى والموجات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 80101, stage: 'exponential', title: { eu: 'Esponentzialak', es: 'Exponenciales', en: 'Exponentials', ar: 'الأسية' }, description: { eu: 'Balioak, asintotak eta oinarria.', es: 'Valores, asíntotas y base.', en: 'Values, asymptotes and base.', ar: 'القيم والمقاربات والأساس.' } },
            { progressId: 80102, stage: 'growth', title: { eu: 'Hazkundea', es: 'Crecimiento', en: 'Growth', ar: 'النمو' }, description: { eu: 'Interes konposatua, erdibizitza eta ekuazioak.', es: 'Interés compuesto, semivida y ecuaciones.', en: 'Compound interest, half-life and equations.', ar: 'الفائدة المركبة وعمر النصف والمعادلات.' } },
            { progressId: 80103, stage: 'logarithmic', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'Balioak, izate-eremuak eta ebaki-puntuak.', es: 'Valores, dominios y cortes.', en: 'Values, domains and intercepts.', ar: 'القيم والمجالات ونقاط التقاطع.' } },
            { progressId: 80104, stage: 'trigonometric', title: { eu: 'Sinua eta kosinua', es: 'Seno y coseno', en: 'Sine and cosine', ar: 'الجيب وجيب التمام' }, description: { eu: 'Radianak, balio ohikoak eta zeroak.', es: 'Radianes, valores habituales y ceros.', en: 'Radians, common values and zeros.', ar: 'الراديان والقيم المألوفة والأصفار.' } },
            { progressId: 80105, stage: 'transforms', title: { eu: 'Uhinak', es: 'Ondas', en: 'Waves', ar: 'الموجات' }, description: { eu: 'Maximoak, periodoak eta anplitudeak.', es: 'Máximos, periodos y amplitudes.', en: 'Maxima, periods and amplitudes.', ar: 'القيم العظمى والأدوار والسعات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', en: 'Match each card with its pair.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Berreturak, logaritmoak eta periodoak', es: 'Potencias, logaritmos y periodos', en: 'Powers, logarithms and periods', ar: 'القوى واللوغاريتمات والأدوار' },
        levels: [
            { progressId: 80201, stage: 'exponential', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: '2⁻³ ↔ 1/8', es: '2⁻³ ↔ 1/8', en: '2⁻³ ↔ 1/8', ar: '2⁻³ ↔ 1/8' } },
            { progressId: 80202, stage: 'logarithmic', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'log₂ 32 ↔ 5', es: 'log₂ 32 ↔ 5', en: 'log₂ 32 ↔ 5', ar: 'log₂ 32 ↔ 5' } },
            { progressId: 80203, stage: 'transforms', title: { eu: 'Periodoak', es: 'Periodos', en: 'Periods', ar: 'الأدوار' }, description: { eu: 'cos 3x ↔ 2π/3', es: 'cos 3x ↔ 2π/3', en: 'cos 3x ↔ 2π/3', ar: 'cos 3x ↔ 2π/3' } }
        ]
    },
    {
        id: 'laser',
        title: { eu: 'Kurben laserra', es: 'Láser de curvas', en: 'Curve laser', ar: 'ليزر المنحنيات' },
        tagline: { eu: 'Doitu kurbaren parametroak eta jaurti: jomuga guztiak jo behar ditu.', es: 'Ajusta los parámetros de la curva y dispara: tiene que dar en todas las dianas.', en: 'Set the parameters of the curve and fire: it has to hit every target.', ar: 'اضبط معاملات المنحنى وأطلق: يجب أن يصيب كل الأهداف.' },
        skills: { eu: 'Parametroak eta grafikoak', es: 'Parámetros y gráficas', en: 'Parameters and graphs', ar: 'المعاملات والتمثيلات' },
        levels: [
            { progressId: 80301, stage: 'exponential', title: { eu: 'Esponentzialak', es: 'Exponenciales', en: 'Exponentials', ar: 'الأسية' }, description: { eu: 'y = b^(x − h) + k', es: 'y = b^(x − h) + k', en: 'y = b^(x − h) + k', ar: 'y = b^(x − h) + k' } },
            { progressId: 80302, stage: 'logarithmic', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'y = log_b(x − h) + k', es: 'y = log_b(x − h) + k', en: 'y = log_b(x − h) + k', ar: 'y = log_b(x − h) + k' } },
            { progressId: 80303, stage: 'transforms', title: { eu: 'Nahastuta', es: 'Mezcladas', en: 'Mixed', ar: 'مختلطة' }, description: { eu: 'Esponentzialak eta logaritmoak.', es: 'Exponenciales y logaritmos.', en: 'Exponentials and logarithms.', ar: 'الأسية واللوغاريتمية.' } }
        ]
    },
    {
        id: 'growth',
        title: { eu: 'Noiz bikoizten da?', es: '¿Cuándo se duplica?', en: 'When does it double?', ar: 'متى يتضاعف؟' },
        tagline: { eu: 'Bakterioak, erradioaktibitatea: zenbat denbora behar da?', es: 'Bacterias, radiactividad: ¿cuánto tiempo hace falta?', en: 'Bacteria, radioactivity: how long does it take?', ar: 'بكتيريا وإشعاع: كم من الوقت يلزم؟' },
        skills: { eu: 'Hazkunde eta beherakada esponentziala', es: 'Crecimiento y decrecimiento exponencial', en: 'Exponential growth and decay', ar: 'النمو والتناقص الأسي' },
        levels: [
            { progressId: 80401, stage: 'growth', title: { eu: 'Bikoiztu', es: 'Duplicar', en: 'Double', ar: 'التضاعف' }, description: { eu: 'Ordu bakoitzean bider 2.', es: 'Cada hora por 2.', en: 'Times 2 every hour.', ar: 'في 2 كل ساعة.' } },
            { progressId: 80402, stage: 'growth', title: { eu: 'Bikoiztu eta hirukoiztu', es: 'Duplicar y triplicar', en: 'Double and triple', ar: 'التضاعف والتثليث' }, description: { eu: 'Aldiak 2, 3 edo 5 urtekoak.', es: 'Periodos de 2, 3 o 5 años.', en: 'Periods of 2, 3 or 5 years.', ar: 'فترات من 2 أو 3 أو 5 سنوات.' } },
            { progressId: 80403, stage: 'growth', title: { eu: 'Erdibizitza ere bai', es: 'También semivida', en: 'Half-life too', ar: 'ونصف العمر أيضًا' }, description: { eu: 'Erdia desagertzen da.', es: 'La mitad desaparece.', en: 'Half disappears.', ar: 'يختفي النصف.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Grafikoen detektibea', es: 'Detective de gráficas', en: 'Graphs detective', ar: 'مخبر التمثيلات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Grafiko eta funtzioetako akats tipikoak', es: 'Errores típicos con gráficas y funciones', en: 'Common mistakes with graphs and functions', ar: 'الأخطاء الشائعة في التمثيلات والدوال' },
        levels: [
            { progressId: 80501, stage: 'exponential', title: { eu: 'Esponentzialak', es: 'Exponenciales', en: 'Exponentials', ar: 'الأسية' }, description: { eu: 'Berretzaile negatiboak eta zeroa.', es: 'Exponentes negativos y cero.', en: 'Negative and zero exponents.', ar: 'الأسس السالبة والصفر.' } },
            { progressId: 80502, stage: 'logarithmic', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'Propietateak.', es: 'Propiedades.', en: 'Properties.', ar: 'الخصائص.' } },
            { progressId: 80503, stage: 'transforms', title: { eu: 'Eraldaketak', es: 'Transformaciones', en: 'Transformations', ar: 'التحويلات' }, description: { eu: 'Lekualdaketak eta asintotak.', es: 'Traslaciones y asíntotas.', en: 'Shifts and asymptotes.', ar: 'الإزاحات والمقاربات.' } }
        ]
    }
]

export const exponentialAkGameProgressIds: number[] = levelProgressIds(exponentialAkGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const exponentialAkGameSlugs: Record<ExponentialAkGameId, string> = { race: 'lasterketa', memory: 'memoria', laser: 'laserra', growth: 'hazkundea', detective: 'detektibea' }

export function exponentialAkGameModeForPath(pathname: string): ExponentialAkGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['laserra', 'laser'].includes(game)) return 'laser'
    if (['hazkundea', 'crecimiento'].includes(game)) return 'growth'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

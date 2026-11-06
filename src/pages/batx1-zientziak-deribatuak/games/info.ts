import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Deribatuak (Batxilergoa 1 · Zientziak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star. Four games of its own (which slope?, match f and f′, the
   exact tangent and the detective), the race and the memory.
   ========================================================================== */

export type BachDerivativesGameId = 'race' | 'slopes' | 'match' | 'tangent' | 'detective' | 'memory'

export const BACH_DERIVATIVES_GAME_RECORDS_KEY = 'matella-deribatuak-batx1z-game-records'

export const bachDerivativesGames: GameInfo<BachDerivativesGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Deribatuen lasterketa', es: 'Carrera de derivadas', en: 'Derivatives race', ar: 'سباق المشتقات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 110401, stage: 'rate', title: { eu: 'Aldakuntza-tasa', es: 'Tasa de variación', en: 'Rate of change', ar: 'معدل التغير' }, description: { eu: 'T.V.M., f′(a) eta zuzen ukitzailea.', es: 'T.V.M., f′(a) y la tangente.', en: 'Average rate, f′(a) and the tangent.', ar: 'معدل التغير المتوسط وf′(a) والمماس.' } },
            { progressId: 110402, stage: 'derivability', title: { eu: 'Deribagarritasuna', es: 'Derivabilidad', en: 'Differentiability', ar: 'قابلية الاشتقاق' }, description: { eu: 'Alboko deribatuak eta zatiak lotzea.', es: 'Derivadas laterales y unir trozos.', en: 'One-sided derivatives and joining pieces.', ar: 'المشتقتان الجانبيتان ووصل الأجزاء.' } },
            { progressId: 110403, stage: 'function', title: { eu: 'Funtzio deribatua', es: 'Función derivada', en: 'Derivative function', ar: 'الدالة المشتقة' }, description: { eu: 'Berreturak, erroak eta polinomioak.', es: 'Potencias, raíces y polinomios.', en: 'Powers, roots and polynomials.', ar: 'القوى والجذور والحدوديات.' } },
            { progressId: 110404, stage: 'rules', title: { eu: 'Erregelak', es: 'Reglas', en: 'Rules', ar: 'القواعد' }, description: { eu: 'Biderkadura, zatidura eta katea.', es: 'Producto, cociente y cadena.', en: 'Product, quotient and chain.', ar: 'الجداء وخارج القسمة والسلسلة.' } },
            { progressId: 110405, stage: 'elementary', title: { eu: 'Funtzio elementalak', es: 'Funciones elementales', en: 'Elementary functions', ar: 'الدوال الأساسية' }, description: { eu: 'Esponentzialak, logaritmoak eta trigonometrikoak.', es: 'Exponenciales, logaritmos y trigonométricas.', en: 'Exponentials, logarithms and trigonometric functions.', ar: 'الأسية واللوغاريتمية والمثلثية.' } }
        ]
    },
    {
        id: 'slopes',
        title: { eu: 'Zer malda?', es: '¿Qué pendiente?', en: 'Which slope?', ar: 'أي ميل؟' },
        tagline: { eu: 'Grafiko bat eta hiru puntu: zein puntutan da malda zero, positiboa, handiena edo zuzen baten paraleloa?', es: 'Una gráfica y tres puntos: ¿en cuál es la pendiente cero, positiva, la mayor o paralela a una recta?', en: 'A graph and three points: at which one is the slope zero, positive, the greatest or parallel to a line?', ar: 'رسم وثلاث نقاط: عند أيها يكون الميل صفرًا أو موجبًا أو الأكبر أو موازيًا لمستقيم؟' },
        skills: { eu: 'Deribatua zuzen ukitzailearen malda gisa', es: 'La derivada como pendiente de la tangente', en: 'The derivative as the slope of the tangent', ar: 'المشتقة ميلًا للمماس' },
        levels: [
            { progressId: 110501, stage: 'rate', title: { eu: 'Zeinua', es: 'El signo', en: 'The sign', ar: 'الإشارة' }, description: { eu: 'f′ = 0, f′ > 0 edo f′ < 0.', es: 'f′ = 0, f′ > 0 o f′ < 0.', en: 'f′ = 0, f′ > 0 or f′ < 0.', ar: 'f′ = 0 أو f′ > 0 أو f′ < 0.' } },
            { progressId: 110502, stage: 'rate', title: { eu: 'Konparatu', es: 'Compara', en: 'Compare', ar: 'قارن' }, description: { eu: 'Maldarik handiena edo txikiena.', es: 'La pendiente mayor o la menor.', en: 'The greatest or the smallest slope.', ar: 'الميل الأكبر أو الأصغر.' } },
            { progressId: 110503, stage: 'elementary', title: { eu: 'Paraleloa', es: 'Paralela', en: 'Parallel', ar: 'موازٍ' }, description: { eu: 'Zuzen ukitzailea zuzen baten paraleloa.', es: 'La tangente paralela a una recta.', en: 'The tangent parallel to a line.', ar: 'المماس الموازي لمستقيم.' } }
        ]
    },
    {
        id: 'match',
        title: { eu: 'Parekatu f eta f′', es: 'Empareja f y f′', en: 'Match f and f′', ar: 'طابِق f وf′' },
        tagline: { eu: 'Goian f funtzioaren grafikoa; behean, hiru grafiko: zein da haren deribatua?', es: 'Arriba la gráfica de f; abajo, tres gráficas: ¿cuál es su derivada?', en: 'Above, the graph of f; below, three graphs: which one is its derivative?', ar: 'في الأعلى رسم f، وفي الأسفل ثلاثة رسوم: أيها مشتقتها؟' },
        skills: { eu: 'f′ funtzioaren grafikoa irakurtzea', es: 'Leer la gráfica de f′', en: 'Reading the graph of f′', ar: 'قراءة رسم f′' },
        levels: [
            { progressId: 110601, stage: 'function', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'Deribatua zuzen bat da.', es: 'La derivada es una recta.', en: 'The derivative is a line.', ar: 'المشتقة مستقيم.' } },
            { progressId: 110602, stage: 'function', title: { eu: 'Kubikoak', es: 'Cúbicas', en: 'Cubics', ar: 'الدوال التكعيبية' }, description: { eu: 'Deribatua parabola bat da.', es: 'La derivada es una parábola.', en: 'The derivative is a parabola.', ar: 'المشتقة قطع مكافئ.' } },
            { progressId: 110603, stage: 'elementary', title: { eu: 'Elementalak', es: 'Elementales', en: 'Elementary', ar: 'الأساسية' }, description: { eu: 'Sinua, kosinua, esponentziala eta logaritmoa.', es: 'Seno, coseno, exponencial y logaritmo.', en: 'Sine, cosine, exponential and logarithm.', ar: 'الجيب وجيب التمام والأسية واللوغاريتم.' } }
        ]
    },
    {
        id: 'tangent',
        title: { eu: 'Zuzen ukitzaile zehatza', es: 'Tangente exacta', en: 'The exact tangent', ar: 'المماس الدقيق' },
        tagline: { eu: 'Funtzio bat eta puntu bat: eraiki y = mx + n zuzen ukitzailea, eta ikusi kurba ukitzen duen.', es: 'Una función y un punto: construye la tangente y = mx + n y mira si toca la curva.', en: 'A function and a point: build the tangent y = mx + n and see whether it touches the curve.', ar: 'دالة ونقطة: ابنِ المماس y = mx + n وانظر هل يمس المنحنى.' },
        skills: { eu: 'm = f′(a) eta n = f(a) − a·f′(a)', es: 'm = f′(a) y n = f(a) − a·f′(a)', en: 'm = f′(a) and n = f(a) − a·f′(a)', ar: 'm = f′(a) و n = f(a) − a·f′(a)' },
        levels: [
            { progressId: 110651, stage: 'rate', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'x² + bx + c', es: 'x² + bx + c', en: 'x² + bx + c', ar: 'x² + bx + c' } },
            { progressId: 110652, stage: 'function', title: { eu: 'Kubikoak eta k/x', es: 'Cúbicas y k/x', en: 'Cubics and k/x', ar: 'التكعيبية و k/x' }, description: { eu: 'Berreturaren erregela.', es: 'La regla de la potencia.', en: 'The power rule.', ar: 'قاعدة القوة.' } },
            { progressId: 110653, stage: 'elementary', title: { eu: 'Elementalak', es: 'Elementales', en: 'Elementary', ar: 'الأساسية' }, description: { eu: 'Esponentzialak, logaritmoak eta trigonometrikoak.', es: 'Exponenciales, logaritmos y trigonométricas.', en: 'Exponentials, logarithms and trigonometric functions.', ar: 'الأسية واللوغاريتمية والمثلثية.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Deribatuen detektibea', es: 'Detective de derivadas', en: 'Derivatives detective', ar: 'مخبر المشتقات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 110701, stage: 'rate', title: { eu: 'Definizioa eta zuzen ukitzailea', es: 'Definición y tangente', en: 'Definition and tangent', ar: 'التعريف والمماس' }, description: { eu: 'T.V.M., h = 0, f′(a) eta normala.', es: 'T.V.M., h = 0, f′(a) y la normal.', en: 'Average rate, h = 0, f′(a) and the normal.', ar: 'معدل التغير وh = 0 وf′(a) والعمودي.' } },
            { progressId: 110702, stage: 'rules', title: { eu: 'Erregelak', es: 'Reglas', en: 'Rules', ar: 'القواعد' }, description: { eu: 'Biderkadura, zatidura, katea eta x⁻ⁿ.', es: 'Producto, cociente, cadena y x⁻ⁿ.', en: 'Product, quotient, chain and x⁻ⁿ.', ar: 'الجداء وخارج القسمة والسلسلة وx⁻ⁿ.' } },
            { progressId: 110703, stage: 'elementary', title: { eu: 'Elementalak eta puntak', es: 'Elementales y picos', en: 'Elementary and corners', ar: 'الأساسية والزوايا' }, description: { eu: 'eᵏˣ, aˣ, ln u eta |x − a|.', es: 'eᵏˣ, aˣ, ln u y |x − a|.', en: 'eᵏˣ, aˣ, ln u and |x − a|.', ar: 'eᵏˣ وaˣ وln u و|x − a|.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: funtzio bat eta bere deribatua.', es: 'Encuentra las parejas: una función y su derivada.', en: 'Find the pairs: a function and its derivative.', ar: 'اعثر على الأزواج: دالة ومشتقتها.' },
        skills: { eu: 'Deribatuen taula', es: 'La tabla de derivadas', en: 'The table of derivatives', ar: 'جدول المشتقات' },
        levels: [
            { progressId: 110801, stage: 'function', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: '3x⁴ ↔ 12x³', es: '3x⁴ ↔ 12x³', en: '3x⁴ ↔ 12x³', ar: '3x⁴ ↔ 12x³' } },
            { progressId: 110802, stage: 'rules', title: { eu: 'Erregelak', es: 'Reglas', en: 'Rules', ar: 'القواعد' }, description: { eu: '(2x + 1)³ ↔ 6(2x + 1)²', es: '(2x + 1)³ ↔ 6(2x + 1)²', en: '(2x + 1)³ ↔ 6(2x + 1)²', ar: '(2x + 1)³ ↔ 6(2x + 1)²' } },
            { progressId: 110803, stage: 'elementary', title: { eu: 'Esponentzialak eta logaritmoak', es: 'Exponenciales y logaritmos', en: 'Exponentials and logarithms', ar: 'الأسية واللوغاريتمية' }, description: { eu: 'e³ˣ ↔ 3e³ˣ', es: 'e³ˣ ↔ 3e³ˣ', en: 'e³ˣ ↔ 3e³ˣ', ar: 'e³ˣ ↔ 3e³ˣ' } }
        ]
    }
]

export const bachDerivativesGameProgressIds: number[] = levelProgressIds(bachDerivativesGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachDerivativesGameSlugs: Record<BachDerivativesGameId, string> = { race: 'lasterketa', slopes: 'maldak', match: 'parekatu', tangent: 'ukitzailea', detective: 'detektibea', memory: 'memoria' }

export function bachDerivativesGameModeForPath(pathname: string): BachDerivativesGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['maldak', 'pendientes'].includes(game)) return 'slopes'
    if (['parekatu', 'empareja'].includes(game)) return 'match'
    if (['ukitzailea', 'tangente'].includes(game)) return 'tangent'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

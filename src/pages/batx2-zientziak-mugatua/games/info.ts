import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Integral mugatua (Batxilergoa 2 · Zientziak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star. Three games of its own (does Barrow work?, change the
   limits, differentiate the integral function), the detective of the
   mistakes of 2.º, the race and the memory.
   ========================================================================== */

export type Bach2DefiniteGameId = 'race' | 'barrow' | 'limits' | 'derive' | 'detective' | 'memory'

export const BACH2_DEFINITE_GAME_RECORDS_KEY = 'matella-mugatua-batx2z-game-records'

export const bach2DefiniteGames: GameInfo<Bach2DefiniteGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Integral mugatuaren lasterketa', es: 'Carrera de la integral definida', en: 'Definite integral race', ar: 'سباق التكامل المحدد' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 127401, stage: 'review', title: { eu: 'Errepasoa', es: 'Repaso', en: 'Review', ar: 'المراجعة' }, description: { eu: 'Barrow eta parabola baten azalera.', es: 'Barrow y el área de una parábola.', en: 'Barrow and the area of a parabola.', ar: 'بارو ومساحة قطع مكافئ.' } },
            { progressId: 127402, stage: 'sums', title: { eu: 'Baturak', es: 'Sumas', en: 'Sums', ar: 'المجاميع' }, description: { eu: 'Behe- eta goi-baturak, batez besteko balioa.', es: 'Sumas inferior y superior, valor medio.', en: 'Lower and upper sums, mean value.', ar: 'المجموعان الأدنى والأعلى، والقيمة المتوسطة.' } },
            { progressId: 127403, stage: 'fundamental', title: { eu: 'Oinarrizko teorema', es: 'Teorema fundamental', en: 'Fundamental theorem', ar: 'المبرهنة الأساسية' }, description: { eu: 'F′(q), muga x edo x² denean.', es: 'F′(q) con límite x o x².', en: 'F′(q) with x or x² as the limit.', ar: 'F′(q) والحد x أو x².' } },
            { progressId: 127404, stage: 'techniques', title: { eu: 'Kalkulatu', es: 'Calcular', en: 'Working out', ar: 'الحساب' }, description: { eu: 'Muga berriak eta balio absolutua.', es: 'Límites nuevos y valor absoluto.', en: 'New limits and absolute value.', ar: 'الحدود الجديدة والقيمة المطلقة.' } },
            { progressId: 127405, stage: 'problems', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' }, description: { eu: 'Parametroak, bolumenak eta barrutiak.', es: 'Parámetros, volúmenes y recintos.', en: 'Parameters, volumes and regions.', ar: 'الوسائط والأحجام والمناطق.' } }
        ]
    },
    {
        id: 'barrow',
        title: { eu: 'Barrow-k balio du?', es: '¿Vale Barrow?', en: 'Does Barrow work?', ar: 'هل تصح قاعدة بارو؟' },
        tagline: { eu: 'Integral bakoitzean: Barrow zuzenean aplika daiteke, zatitu behar da, ala asintota batek eragozten du?', es: 'En cada integral: ¿se puede aplicar Barrow directamente, hay que partir o lo impide una asíntota?', en: 'For each integral: can Barrow be applied directly, must it be split, or does an asymptote rule it out?', ar: 'في كل تكامل: هل تُطبق قاعدة بارو مباشرة أم يجب التقسيم أم يمنعها مقارب؟' },
        skills: { eu: 'Jarraitutasuna eta Barrow-ren erregela', es: 'Continuidad y regla de Barrow', en: 'Continuity and Barrow\'s rule', ar: 'الاتصال وقاعدة بارو' },
        levels: [
            { progressId: 127501, stage: 'fundamental', title: { eu: 'Asintotak', es: 'Asíntotas', en: 'Asymptotes', ar: 'المقاربات' }, description: { eu: 'Polinomioak eta k/(x − c)².', es: 'Polinomios y k/(x − c)².', en: 'Polynomials and k/(x − c)².', ar: 'كثيرات الحدود و k/(x − c)².' } },
            { progressId: 127502, stage: 'fundamental', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'k/(x − c), logaritmo bat ematen duena.', es: 'k/(x − c), que da un logaritmo.', en: 'k/(x − c), which gives a logarithm.', ar: 'k/(x − c) الذي يعطي لوغاريتمًا.' } },
            { progressId: 127503, stage: 'techniques', title: { eu: 'Zatitu', es: 'Partir', en: 'Split', ar: 'التقسيم' }, description: { eu: 'Balio absolutua eta jauziak.', es: 'Valor absoluto y saltos.', en: 'Absolute value and jumps.', ar: 'القيمة المطلقة والقفزات.' } }
        ]
    },
    {
        id: 'limits',
        title: { eu: 'Aldatu mugak', es: 'Cambia los límites', en: 'Change the limits', ar: 'غيّر الحدود' },
        tagline: { eu: 't = g(x) aldaketa egitean, aukeratu muga berriak dituen integrala.', es: 'Al hacer el cambio t = g(x), elige la integral con los límites nuevos.', en: 'With the change t = g(x), choose the integral with the new limits.', ar: 'عند التعويض t = g(x) اختر التكامل ذا الحدود الجديدة.' },
        skills: { eu: 'Aldagai-aldaketa integral mugatuetan', es: 'Cambio de variable en integrales definidas', en: 'Substitution in definite integrals', ar: 'تغيير المتغير في التكاملات المحددة' },
        levels: [
            { progressId: 127551, stage: 'techniques', title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'كثيرات الحدود' }, description: { eu: 't = x² + m eta t = kx + m.', es: 't = x² + m y t = kx + m.', en: 't = x² + m and t = kx + m.', ar: 't = x² + m و t = kx + m.' } },
            { progressId: 127552, stage: 'techniques', title: { eu: 'Funtzioak', es: 'Funciones', en: 'Functions', ar: 'الدوال' }, description: { eu: 't = ln x, t = sin x eta t = eˣ.', es: 't = ln x, t = sen x y t = eˣ.', en: 't = ln x, t = sin x and t = eˣ.', ar: 't = ln x و t = sin x و t = eˣ.' } },
            { progressId: 127553, stage: 'techniques', title: { eu: 'Denak', es: 'Todas', en: 'All of them', ar: 'الكل' }, description: { eu: 'Baita dt aldaketak dakarren zenbakia ere.', es: 'También el número que trae dt.', en: 'The number dt brings, too.', ar: 'والعدد الذي يجلبه dt أيضًا.' } }
        ]
    },
    {
        id: 'derive',
        title: { eu: 'Deribatu funtzio integrala', es: 'Deriva la función integral', en: 'Differentiate the integral function', ar: 'اشتق الدالة التكاملية' },
        tagline: { eu: 'F(x) integral bat da, mugak x aldagaiaren mende dituena: aukeratu F′(x).', es: 'F(x) es una integral cuyos límites dependen de x: elige F′(x).', en: 'F(x) is an integral whose limits depend on x: choose F′(x).', ar: 'F(x) تكامل تعتمد حدوده على x: اختر F′(x).' },
        skills: { eu: 'Oinarrizko teorema eta katearen erregela', es: 'Teorema fundamental y regla de la cadena', en: 'Fundamental theorem and chain rule', ar: 'المبرهنة الأساسية وقاعدة السلسلة' },
        levels: [
            { progressId: 127601, stage: 'fundamental', title: { eu: 'Goian x', es: 'Arriba x', en: 'x on top', ar: 'x في الأعلى' }, description: { eu: 'F′(x) = f(x).', es: 'F′(x) = f(x).', en: 'F′(x) = f(x).', ar: 'F′(x) = f(x).' } },
            { progressId: 127602, stage: 'fundamental', title: { eu: 'Goian g(x)', es: 'Arriba g(x)', en: 'g(x) on top', ar: 'g(x) في الأعلى' }, description: { eu: 'f(g(x))·g′(x).', es: 'f(g(x))·g′(x).', en: 'f(g(x))·g′(x).', ar: 'f(g(x))·g′(x).' } },
            { progressId: 127603, stage: 'fundamental', title: { eu: 'Bi mugak', es: 'Los dos límites', en: 'Both limits', ar: 'الحدّان' }, description: { eu: 'f(g)·g′ − f(h)·h′.', es: 'f(g)·g′ − f(h)·h′.', en: 'f(g)·g′ − f(h)·h′.', ar: 'f(g)·g′ − f(h)·h′.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Integral mugatuaren detektibea', es: 'Detective de la integral definida', en: 'Definite integral detective', ar: 'مخبر التكامل المحدد' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: '2. mailako akats tipikoak', es: 'Los errores típicos de 2.º', en: 'The typical mistakes of 2.º', ar: 'الأخطاء الشائعة في السنة الثانية' },
        levels: [
            { progressId: 127701, stage: 'sums', title: { eu: 'Baturak eta teoremak', es: 'Sumas y teoremas', en: 'Sums and theorems', ar: 'المجاميع والمبرهنات' }, description: { eu: 'Behe-batura, batez besteko balioa eta asintotak.', es: 'Suma inferior, valor medio y asíntotas.', en: 'Lower sum, mean value and asymptotes.', ar: 'المجموع الأدنى والقيمة المتوسطة والمقاربات.' } },
            { progressId: 127702, stage: 'techniques', title: { eu: 'Kalkulatu', es: 'Calcular', en: 'Working out', ar: 'الحساب' }, description: { eu: 'Mugak, uv eta balio absolutua.', es: 'Límites, uv y valor absoluto.', en: 'Limits, uv and absolute value.', ar: 'الحدود و uv والقيمة المطلقة.' } },
            { progressId: 127703, stage: 'problems', title: { eu: 'Funtzio integrala eta bolumenak', es: 'Función integral y volúmenes', en: 'Integral function and volumes', ar: 'الدالة التكاملية والأحجام' }, description: { eu: 'g′, π eta erradioaren karratua.', es: 'g′, π y el radio al cuadrado.', en: 'g′, π and the squared radius.', ar: 'g′ و π ومربع نصف القطر.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: integral bat eta haren balioa, edo funtzio integral bat eta haren deribatua.', es: 'Encuentra las parejas: una integral y su valor, o una función integral y su derivada.', en: 'Find the pairs: an integral and its value, or an integral function and its derivative.', ar: 'اعثر على الأزواج: تكامل وقيمته، أو دالة تكاملية ومشتقتها.' },
        skills: { eu: 'Barrow, oinarrizko teorema eta bolumenak', es: 'Barrow, teorema fundamental y volúmenes', en: 'Barrow, fundamental theorem and volumes', ar: 'بارو والمبرهنة الأساسية والأحجام' },
        levels: [
            { progressId: 127801, stage: 'review', title: { eu: 'Balioak', es: 'Valores', en: 'Values', ar: 'القيم' }, description: { eu: '∫₀² 3x² dx ↔ 8', es: '∫₀² 3x² dx ↔ 8', en: '∫₀² 3x² dx ↔ 8', ar: '∫₀² 3x² dx ↔ 8' } },
            { progressId: 127802, stage: 'fundamental', title: { eu: 'Deribatuak', es: 'Derivadas', en: 'Derivatives', ar: 'المشتقات' }, description: { eu: '∫₀^(x²) t dt ↔ 2x³', es: '∫₀^(x²) t dt ↔ 2x³', en: '∫₀^(x²) t dt ↔ 2x³', ar: '∫₀^(x²) t dt ↔ 2x³' } },
            { progressId: 127803, stage: 'problems', title: { eu: 'Bolumenak eta azalerak', es: 'Volúmenes y áreas', en: 'Volumes and areas', ar: 'الأحجام والمساحات' }, description: { eu: 'π∫₀¹ x² dx ↔ π/3', es: 'π∫₀¹ x² dx ↔ π/3', en: 'π∫₀¹ x² dx ↔ π/3', ar: 'π∫₀¹ x² dx ↔ π/3' } }
        ]
    }
]

export const bach2DefiniteGameProgressIds: number[] = levelProgressIds(bach2DefiniteGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bach2DefiniteGameSlugs: Record<Bach2DefiniteGameId, string> = { race: 'lasterketa', barrow: 'barrow', limits: 'mugak', derive: 'deribatu', detective: 'detektibea', memory: 'memoria' }

export function bach2DefiniteGameModeForPath(pathname: string): Bach2DefiniteGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['barrow'].includes(game)) return 'barrow'
    if (['mugak', 'limites'].includes(game)) return 'limits'
    if (['deribatu', 'deriva'].includes(game)) return 'derive'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

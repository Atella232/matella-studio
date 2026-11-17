import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Diskretuak (Batxilergoa 1 · Gizarte Zientziak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star. Four games of its own (which bin?, words to symbols, is it
   worth it? and the detective of this unit), «is it binomial?» borrowed
   from 2.º Ciencias with ids of this unit, the race with a circuit per
   stage and the memory.
   ========================================================================== */

export type DiscreteBatx1gGameId = 'race' | 'galton' | 'events' | 'worth' | 'binomial' | 'detective' | 'memory'

export const DISCRETE_BATX1G_GAME_RECORDS_KEY = 'matella-diskretuak-batx1g-game-records'

export const discreteBatx1gGames: GameInfo<DiscreteBatx1gGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Banaketen lasterketa', es: 'Carrera de distribuciones', en: 'Distributions race', ar: 'سباق التوزيعات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Lau zirkuitu, etapa bakoitzeko bat', es: 'Cuatro circuitos, uno por etapa', en: 'Four circuits, one per stage', ar: 'أربع حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 139401, stage: 'review', title: { eu: 'Errepasoa', es: 'Repaso', en: 'Review', ar: 'مراجعة' }, description: { eu: 'Itzulita, itzuli gabe eta ordenak.', es: 'Con y sin devolución, y los órdenes.', en: 'With and without replacement, and the orders.', ar: 'مع الإرجاع ودونه، والترتيبات.' } },
            { progressId: 139402, stage: 'variable', title: { eu: 'Aldagaia', es: 'Variable', en: 'Variable', ar: 'المتغير' }, description: { eu: 'Falta den probabilitatea, μ eta irabazia.', es: 'La probabilidad que falta, μ y la ganancia.', en: 'The missing probability, μ and the gain.', ar: 'الاحتمال الناقص وμ والربح.' } },
            { progressId: 139403, stage: 'binomial', title: { eu: 'Binomiala', es: 'Binomial', en: 'Binomial', ar: 'الثنائي' }, description: { eu: 'Probabilitateak, μ, σ² eta «gutxienez bat».', es: 'Probabilidades, μ, σ² y «al menos uno».', en: 'Probabilities, μ, σ² and ‘at least one’.', ar: 'الاحتمالات وμ وσ² و«واحد على الأقل».' } },
            { progressId: 139404, stage: 'fit', title: { eu: 'Doikuntza', es: 'Ajuste', en: 'Fit', ar: 'المطابقة' }, description: { eu: 'p, itxaronak eta ehunekoa.', es: 'p, los esperados y el porcentaje.', en: 'p, the expected values and the percentage.', ar: 'p والقيم المتوقعة والنسبة.' } }
        ]
    },
    {
        id: 'galton',
        title: { eu: 'Zein kutxatilatara?', es: '¿A qué casilla?', en: 'Which bin?', ar: 'إلى أي خانة؟' },
        tagline: { eu: 'Galtonen tresnan: bide batek nora eramaten duen, zenbat bide iristen diren eta zein den probabilitatea.', es: 'En el aparato de Galton: adónde lleva un camino, cuántos caminos llegan y qué probabilidad hay.', en: 'On the Galton board: where a path leads, how many paths get there and what the probability is.', ar: 'في جهاز غالتون: إلى أين يؤدي مسار، وكم مسارًا يصل، وما الاحتمال.' },
        skills: { eu: 'Bideak eta zenbaki konbinatorioak', es: 'Caminos y números combinatorios', en: 'Paths and binomial coefficients', ar: 'المسارات والأعداد التوافقية' },
        levels: [
            { progressId: 139501, stage: 'binomial', title: { eu: 'Bidea', es: 'El camino', en: 'The path', ar: 'المسار' }, description: { eu: 'Geziak irakurri eta kutxatila esan.', es: 'Lee las flechas y di la casilla.', en: 'Read the arrows and name the bin.', ar: 'اقرأ الأسهم وقل الخانة.' } },
            { progressId: 139502, stage: 'binomial', title: { eu: 'Bide kopurua', es: 'Cuántos caminos', en: 'How many paths', ar: 'كم مسارًا' } , description: { eu: 'Tartagliaren zenbakia.', es: 'El número de Tartaglia.', en: 'Tartaglia\'s number.', ar: 'عدد تارتاليا.' } },
            { progressId: 139503, stage: 'binomial', title: { eu: 'Probabilitatea', es: 'La probabilidad', en: 'The probability', ar: 'الاحتمال' }, description: { eu: 'Bideak zati bide guztiak.', es: 'Caminos entre todos los caminos.', en: 'Paths over all the paths.', ar: 'المسارات على كل المسارات.' } }
        ]
    },
    {
        id: 'events',
        title: { eu: 'Itzuli gertaera', es: 'Traduce el suceso', en: 'Translate the event', ar: 'ترجم الحدث' },
        tagline: { eu: '«Gutxienez», «baino gehiago», «gehienez», «bat ere ez»: hitzak ikur eta kalkulu bihurtu.', es: '«Al menos», «más de», «como mucho», «ninguno»: pasa las palabras a símbolos y a cálculos.', en: '‘At least’, ‘more than’, ‘at most’, ‘none’: turn the words into symbols and sums.', ar: '«على الأقل» و«أكثر من» و«على الأكثر» و«لا شيء»: حوّل الكلمات إلى رموز وحسابات.' },
        skills: { eu: 'Gertaerak binomial batean, eta aurkakoa', es: 'Sucesos en una binomial, y el contrario', en: 'Events in a binomial, and the complement', ar: 'الأحداث في توزيع ثنائي، والمعاكس' },
        levels: [
            { progressId: 139551, stage: 'binomial', title: { eu: 'Ikurra', es: 'El símbolo', en: 'The symbol', ar: 'الرمز' }, description: { eu: '≥, >, ≤, < ala =.', es: '≥, >, ≤, < o =.', en: '≥, >, ≤, < or =.', ar: '≥ أو > أو ≤ أو < أو =.' } },
            { progressId: 139552, stage: 'binomial', title: { eu: 'Aurkakoa', es: 'El contrario', en: 'The complement', ar: 'المعاكس' }, description: { eu: '1 ken zer?', es: '¿1 menos qué?', en: '1 minus what?', ar: '1 ناقص ماذا؟' } },
            { progressId: 139553, stage: 'binomial', title: { eu: 'Kalkulua', es: 'El cálculo', en: 'The sum', ar: 'الحساب' }, description: { eu: 'Probabilitatea zenbakitan.', es: 'La probabilidad en números.', en: 'The probability in numbers.', ar: 'الاحتمال بالأعداد.' } }
        ]
    },
    {
        id: 'worth',
        title: { eu: 'Merezi du?', es: '¿Merece la pena?', en: 'Is it worth it?', ar: 'هل يستحق؟' },
        tagline: { eu: 'Zozketak, dado-jokoak eta txanponak: batez besteko irabazia, jokoa nolakoa den eta prezio bidezkoa.', es: 'Rifas, juegos de dados y monedas: la ganancia media, cómo es el juego y el precio justo.', en: 'Raffles, dice and coin games: the mean gain, what the game is like and the fair price.', ar: 'اليانصيب وألعاب النرد والقطع النقدية: الربح المتوسط ونوع اللعبة والثمن العادل.' },
        skills: { eu: 'Batez bestekoa eta irabazia', es: 'La media y la ganancia', en: 'The mean and the gain', ar: 'المتوسط والربح' },
        levels: [
            { progressId: 139601, stage: 'variable', title: { eu: 'Irabazia', es: 'La ganancia', en: 'The gain', ar: 'الربح' }, description: { eu: 'μ ken prezioa.', es: 'μ menos el precio.', en: 'μ minus the price.', ar: 'μ ناقص الثمن.' } },
            { progressId: 139602, stage: 'variable', title: { eu: 'Nolakoa?', es: '¿Cómo es?', en: 'What is it like?', ar: 'كيف هي؟' }, description: { eu: 'Kontrakoa, bidezkoa ala aldekoa.', es: 'Desfavorable, justo o favorable.', en: 'Unfavourable, fair or favourable.', ar: 'ضده أم عادلة أم في صالحه.' } },
            { progressId: 139603, stage: 'variable', title: { eu: 'Prezio bidezkoa', es: 'El precio justo', en: 'The fair price', ar: 'الثمن العادل' }, description: { eu: 'Zenbat balio beharko luke?', es: '¿Cuánto debería costar?', en: 'How much should it cost?', ar: 'كم يجب أن يكلّف؟' } }
        ]
    },
    {
        id: 'binomial',
        title: { eu: 'Binomiala da?', es: '¿Es binomial?', en: 'Is it binomial?', ar: 'هل هو ثنائي؟' },
        tagline: { eu: 'Egoera bat irakurri eta erabaki: binomiala bada, zein n eta p ditu; ez bada, zergatik.', es: 'Lee una situación y decide: si es binomial, con qué n y p; si no, por qué.', en: 'Read a situation and decide: if it is binomial, with which n and p; if not, why.', ar: 'اقرأ موقفًا وقرّر: إذا كان ثنائيًّا فما n وp، وإن لم يكن فلماذا.' },
        skills: { eu: 'Binomiala ezagutzea eta haren formula', es: 'Reconocer la binomial y su fórmula', en: 'Recognising the binomial and its formula', ar: 'التعرّف على التوزيع الثنائي وصيغته' },
        levels: [
            { progressId: 139651, stage: 'binomial', title: { eu: 'Bai ala ez', es: 'Sí o no', en: 'Yes or no', ar: 'نعم أم لا' }, description: { eu: 'Binomiala ala ez, eta zergatik.', es: 'Binomial o no, y por qué.', en: 'Binomial or not, and why.', ar: 'ثنائي أم لا، ولماذا.' } },
            { progressId: 139652, stage: 'binomial', title: { eu: 'Parametroak', es: 'Parámetros', en: 'Parameters', ar: 'الوسيطان' }, description: { eu: 'Zein n eta zein p.', es: 'Qué n y qué p.', en: 'Which n and which p.', ar: 'أي n وأي p.' } },
            { progressId: 139653, stage: 'binomial', title: { eu: 'Formula', es: 'La fórmula', en: 'The formula', ar: 'الصيغة' }, description: { eu: 'P(X = k) idatzita, ordenekin.', es: 'P(X = k) escrita, con los órdenes.', en: 'P(X = k) written out, with the orders.', ar: 'P(X = k) مكتوبًا مع الترتيبات.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Banaketen detektibea', es: 'Detective de distribuciones', en: 'Distributions detective', ar: 'مخبر التوزيعات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Taularen, binomialaren eta doikuntzaren akats tipikoak', es: 'Los errores típicos de la tabla, la binomial y el ajuste', en: 'The typical mistakes with the table, the binomial and the fit', ar: 'الأخطاء الشائعة في الجدول والثنائي والمطابقة' },
        levels: [
            { progressId: 139701, stage: 'variable', title: { eu: 'Taula', es: 'La tabla', en: 'The table', ar: 'الجدول' }, description: { eu: 'μ, σ eta irabazia.', es: 'μ, σ y la ganancia.', en: 'μ, σ and the gain.', ar: 'μ وσ والربح.' } },
            { progressId: 139702, stage: 'binomial', title: { eu: 'Binomiala', es: 'Binomial', en: 'Binomial', ar: 'الثنائي' }, description: { eu: 'Ordenak, mugak eta σ.', es: 'Los órdenes, los bordes y σ.', en: 'The orders, the boundaries and σ.', ar: 'الترتيبات والحدود وσ.' } },
            { progressId: 139703, stage: 'fit', title: { eu: 'Doikuntza', es: 'Ajuste', en: 'Fit', ar: 'المطابقة' }, description: { eu: 'p, itxaronak eta ehunekoa.', es: 'p, los esperados y el porcentaje.', en: 'p, the expected values and the percentage.', ar: 'p والقيم المتوقعة والنسبة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: kutxatila bat eta haren bideak, binomial bat eta haren batez bestekoa, edo doikuntza bat eta haren balio itxarona.', es: 'Encuentra las parejas: una casilla y sus caminos, una binomial y su media, o un ajuste y su valor esperado.', en: 'Find the pairs: a bin and its paths, a binomial and its mean, or a fit and its expected value.', ar: 'جد الأزواج: خانة ومساراتها، أو توزيع ثنائي ومتوسطه، أو مطابقة وقيمتها المتوقعة.' },
        skills: { eu: 'C(n, k), μ = np eta N · P(X = k)', es: 'C(n, k), μ = np y N · P(X = k)', en: 'C(n, k), μ = np and N · P(X = k)', ar: 'C(n, k) وμ = np وN · P(X = k)' },
        levels: [
            { progressId: 139801, stage: 'binomial', title: { eu: 'Bideak', es: 'Caminos', en: 'Paths', ar: 'المسارات' }, description: { eu: 'n errenkada, k kutxatila ↔ C(n, k)', es: 'n filas, casilla k ↔ C(n, k)', en: 'n rows, bin k ↔ C(n, k)', ar: 'n صفًّا، الخانة k ↔ C(n, k)' } },
            { progressId: 139802, stage: 'binomial', title: { eu: 'Batez bestekoa', es: 'La media', en: 'The mean', ar: 'المتوسط' }, description: { eu: 'B(n; p) ↔ μ = np', es: 'B(n; p) ↔ μ = np', en: 'B(n; p) ↔ μ = np', ar: 'B(n; p) ↔ μ = np' } },
            { progressId: 139803, stage: 'fit', title: { eu: 'Itxaronak', es: 'Esperados', en: 'Expected', ar: 'المتوقعة' }, description: { eu: 'N eta P(X = k) ↔ N · P(X = k)', es: 'N y P(X = k) ↔ N · P(X = k)', en: 'N and P(X = k) ↔ N · P(X = k)', ar: 'N وP(X = k) ↔ N · P(X = k)' } }
        ]
    }
]

export const discreteBatx1gGameProgressIds: number[] = levelProgressIds(discreteBatx1gGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const discreteBatx1gGameSlugs: Record<DiscreteBatx1gGameId, string> = { race: 'lasterketa', galton: 'kutxatila', events: 'gertaera', worth: 'merezi', binomial: 'binomiala', detective: 'detektibea', memory: 'memoria' }

export function discreteBatx1gGameModeForPath(pathname: string): DiscreteBatx1gGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['kutxatila', 'casilla'].includes(game)) return 'galton'
    if (['gertaera', 'suceso'].includes(game)) return 'events'
    if (['merezi', 'merece'].includes(game)) return 'worth'
    if (['binomiala', 'es-binomial'].includes(game)) return 'binomial'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

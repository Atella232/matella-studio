import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { bachApplicationsGames } from '../../batx1-zientziak-aplikazioak/games/info.ts'
import { bachDerivativesGames } from '../../batx1-zientziak-deribatuak/games/info.ts'
import type { SocDerivStageId } from '../lessons.tsx'

/* ==========================================================================
   Deribatuak eta haien aplikazioak (Batxilergoa 1 · Gizarte Zientziak)
   games: two of their own (how much to produce?, average or
   instantaneous?) and the detective, the race and the memory, and four
   games of the Ciencias twins with their texts and levels but this unit's
   stages and progress ids: which slope? and match f and f′ (its first two
   levels: the third has sin and cos), up or down? and hunt the extremes.
   ========================================================================== */

export type SocDerivGameId = 'race' | 'produce' | 'rates' | 'detective' | 'memory' | 'slopes' | 'match' | 'updown' | 'extrema'

export const SOC_DERIV_GAME_RECORDS_KEY = 'matella-deribatuak-batx1g-game-records'

function reused(source: GameInfo<string>, id: SocDerivGameId, stages: SocDerivStageId[], firstId: number): GameInfo<SocDerivGameId> {
    return { ...source, id, levels: source.levels.slice(0, stages.length).map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}
const derivatives = (id: string) => bachDerivativesGames.find((game) => game.id === id)!
const applications = (id: string) => bachApplicationsGames.find((game) => game.id === id)!

export const socDerivGames: GameInfo<SocDerivGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Deribatuen lasterketa', es: 'Carrera de derivadas', en: 'Derivatives race', ar: 'سباق المشتقات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 136401, stage: 'rate', title: { eu: 'Aldakuntza-tasa', es: 'Tasa de variación', en: 'Rate of change', ar: 'معدل التغير' }, description: { eu: 'T.V.M., f′(a) eta ukitzailea.', es: 'T.V.M., f′(a) y la tangente.', en: 'Average rate, f′(a) and the tangent.', ar: 'المعدل المتوسط وf′(a) والمماس.' } },
            { progressId: 136402, stage: 'rules', title: { eu: 'Erregelak', es: 'Reglas', en: 'Rules', ar: 'القواعد' }, description: { eu: 'Polinomioak, biderkadura eta katea.', es: 'Polinomios, producto y cadena.', en: 'Polynomials, product and chain.', ar: 'الحدوديات والجداء والسلسلة.' } },
            { progressId: 136403, stage: 'monotony', title: { eu: 'Muturrak', es: 'Extremos', en: 'Extremes', ar: 'القيم القصوى' }, description: { eu: 'Erpina, haren balioa eta parametroak.', es: 'El vértice, su valor y parámetros.', en: 'The vertex, its value and parameters.', ar: 'الرأس وقيمته والوسائط.' } },
            { progressId: 136404, stage: 'optimization', title: { eu: 'Optimizazioa', es: 'Optimización', en: 'Optimisation', ar: 'الاستمثال' }, description: { eu: 'Ekoizpena, mozkina eta biderkadura.', es: 'Producción, beneficio y producto.', en: 'Production, profit and product.', ar: 'الإنتاج والربح والجداء.' } },
            { progressId: 136405, stage: 'graphs', title: { eu: 'Grafikoak', es: 'Representación', en: 'Graphs', ar: 'التمثيل البياني' }, description: { eu: 'Puntu singularrak, asintotak eta f′.', es: 'Puntos singulares, asíntotas y f′.', en: 'Stationary points, asymptotes and f′.', ar: 'النقاط الحرجة والمقاربات وf′.' } }
        ]
    },
    {
        id: 'produce',
        title: { eu: 'Zenbat ekoiztu?', es: '¿Cuánto producir?', en: 'How much to produce?', ar: 'كم ننتج؟' },
        tagline: { eu: 'Igo edo jaitsi ekoizpena, unitate bat gehiagoren diru-sarrera eta haren kostua berdinak izan arte.', es: 'Sube o baja la producción hasta que el ingreso de una unidad más iguale a su coste.', en: 'Raise or lower the production until the revenue of one more unit equals its cost.', ar: 'ارفع الإنتاج أو اخفضه حتى يساوي إيرادُ وحدة إضافية تكلفتَها.' },
        skills: { eu: 'Mozkin maximoa: I′ = C′', es: 'Beneficio máximo: I′ = C′', en: 'Greatest profit: I′ = C′', ar: 'الربح الأعظم: I′ = C′' },
        levels: [
            { progressId: 136501, stage: 'optimization', title: { eu: 'Prezio finkoa', es: 'Precio fijo', en: 'Fixed price', ar: 'سعر ثابت' }, description: { eu: 'I = p·x eta c = 1.', es: 'I = p·x y c = 1.', en: 'I = p·x and c = 1.', ar: 'I = p·x وc = 1.' } },
            { progressId: 136502, stage: 'optimization', title: { eu: 'Beste kostu batzuk', es: 'Otros costes', en: 'Other costs', ar: 'تكاليف أخرى' }, description: { eu: 'c = 0,5, 1 edo 2.', es: 'c = 0,5, 1 o 2.', en: 'c = 0.5, 1 or 2.', ar: 'c = 0.5 أو 1 أو 2.' } },
            { progressId: 136503, stage: 'optimization', title: { eu: 'Prezioa jaisten da', es: 'El precio baja', en: 'The price falls', ar: 'السعر ينخفض' }, description: { eu: 'I = (P − d·x)·x', es: 'I = (P − d·x)·x', en: 'I = (P − d·x)·x', ar: 'I = (P − d·x)·x' } }
        ]
    },
    {
        id: 'rates',
        title: { eu: 'Batez bestekoa ala berehalakoa?', es: '¿Media o instantánea?', en: 'Average or instantaneous?', ar: 'متوسط أم لحظي؟' },
        tagline: { eu: 'Funtzio bat eta galdera bat haren aldakuntza-tasari buruz: aukeratu txartel zuzena.', es: 'Una función y una pregunta sobre su tasa de variación: elige la tarjeta correcta.', en: 'A function and a question about its rate of change: choose the right card.', ar: 'دالة وسؤال عن معدل تغيرها: اختر البطاقة الصحيحة.' },
        skills: { eu: 'Batez besteko tasa eta berehalakoa', es: 'Tasa media e instantánea', en: 'Average and instantaneous rate', ar: 'المعدل المتوسط واللحظي' },
        levels: [
            { progressId: 136551, stage: 'rate', title: { eu: 'Batez bestekoa', es: 'Media', en: 'Average', ar: 'المتوسط' }, description: { eu: 'T.V.M. tarte batean.', es: 'T.V.M. en un intervalo.', en: 'Average rate on an interval.', ar: 'المعدل المتوسط في مجال.' } },
            { progressId: 136552, stage: 'rate', title: { eu: 'Berehalakoa', es: 'Instantánea', en: 'Instantaneous', ar: 'اللحظي' }, description: { eu: 'Abiadura eta kostu marjinala.', es: 'Velocidad y coste marginal.', en: 'Speed and marginal cost.', ar: 'السرعة والتكلفة الحدية.' } },
            { progressId: 136553, stage: 'rate', title: { eu: 'Noiz berdinak?', es: '¿Cuándo son iguales?', en: 'When are they equal?', ar: 'متى يتساويان؟' }, description: { eu: 'Berehalakoa = batez bestekoa.', es: 'Instantánea = media.', en: 'Instantaneous = average.', ar: 'اللحظي = المتوسط.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Deribatuen detektibea', es: 'Detective de derivadas', en: 'Derivatives detective', ar: 'مخبر المشتقات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 136701, stage: 'rate', title: { eu: 'Tasa eta ukitzailea', es: 'Tasa y tangente', en: 'Rate and tangent', ar: 'المعدل والمماس' }, description: { eu: 'b − a, puntua, normala eta malda.', es: 'b − a, el punto, la normal y la pendiente.', en: 'b − a, the point, the normal and the slope.', ar: 'b − a والنقطة والعمودي والميل.' } },
            { progressId: 136702, stage: 'rules', title: { eu: 'Erregelak', es: 'Reglas', en: 'Rules', ar: 'القواعد' }, description: { eu: 'Berretzailea, biderkadura, zatidura eta katea.', es: 'Exponente, producto, cociente y cadena.', en: 'Exponent, product, quotient and chain.', ar: 'الأس والجداء وخارج القسمة والسلسلة.' } },
            { progressId: 136703, stage: 'optimization', title: { eu: 'Aplikazioak', es: 'Aplicaciones', en: 'Applications', ar: 'التطبيقات' }, description: { eu: 'Zeinua, puntu lauak, ertzak eta mozkina.', es: 'El signo, puntos planos, bordes y beneficio.', en: 'The sign, flat points, borders and profit.', ar: 'الإشارة والنقاط المستوية والطرفان والربح.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: funtzio bat eta haren deribatua, edo funtzio bat eta haren muturra.', es: 'Encuentra las parejas: una función y su derivada, o una función y su extremo.', en: 'Find the pairs: a function and its derivative, or a function and its extreme.', ar: 'اعثر على الأزواج: دالة ومشتقتها، أو دالة وقيمتها القصوى.' },
        skills: { eu: 'Deribatuak eta muturrak', es: 'Derivadas y extremos', en: 'Derivatives and extremes', ar: 'المشتقات والقيم القصوى' },
        levels: [
            { progressId: 136801, stage: 'rules', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: '3x⁴ ↔ 12x³', es: '3x⁴ ↔ 12x³', en: '3x⁴ ↔ 12x³', ar: '3x⁴ ↔ 12x³' } },
            { progressId: 136802, stage: 'monotony', title: { eu: 'Muturrak', es: 'Extremos', en: 'Extremes', ar: 'القيم القصوى' }, description: { eu: 'x² − 6x ↔ x = 3', es: 'x² − 6x ↔ x = 3', en: 'x² − 6x ↔ x = 3', ar: 'x² − 6x ↔ x = 3' } },
            { progressId: 136803, stage: 'optimization', title: { eu: 'Mozkina', es: 'Beneficio', en: 'Profit', ar: 'الربح' }, description: { eu: '−x² + 40x ↔ x = 20', es: '−x² + 40x ↔ x = 20', en: '−x² + 40x ↔ x = 20', ar: '−x² + 40x ↔ x = 20' } }
        ]
    },
    reused(derivatives('slopes'), 'slopes', ['rate', 'rate', 'rate'], 136811),
    reused(derivatives('match'), 'match', ['rules', 'graphs'], 136821),
    reused(applications('updown'), 'updown', ['monotony', 'monotony', 'monotony'], 136831),
    reused(applications('extrema'), 'extrema', ['monotony', 'monotony', 'graphs'], 136841)
]

export const socDerivGameProgressIds: number[] = levelProgressIds(socDerivGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const socDerivGameSlugs: Record<SocDerivGameId, string> = { race: 'lasterketa', produce: 'ekoiztu', rates: 'tasak', detective: 'detektibea', memory: 'memoria', slopes: 'maldak', match: 'bikoteak', updown: 'gora-behera', extrema: 'muturrak' }

export function socDerivGameModeForPath(pathname: string): SocDerivGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['ekoiztu', 'producir'].includes(game)) return 'produce'
    if (['tasak', 'tasas'].includes(game)) return 'rates'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['maldak', 'pendientes'].includes(game)) return 'slopes'
    if (['bikoteak', 'empareja'].includes(game)) return 'match'
    if (['gora-behera', 'sube-baja'].includes(game)) return 'updown'
    if (['muturrak', 'extremos'].includes(game)) return 'extrema'
    return 'hub'
}

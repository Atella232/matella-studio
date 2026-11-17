import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import type { Bach2gApplicationsStageId } from '../lessons.tsx'

/* ==========================================================================
   Deribatuaren aplikazioak (Batxilergoa 2 · Gizarte Zientziak) games: the
   list shown in the hub, with levels and the unit progress id each level
   earns with its first star. Two games of its own (maximum, minimum or
   nothing?, optimise the firm), the detective with the mistakes of this
   unit, the race and the memory.
   ========================================================================== */

export type Bach2gApplicationsGameId = 'race' | 'extreme' | 'optimize' | 'detective' | 'memory'

export const BACH2G_APPLICATIONS_GAME_RECORDS_KEY = 'matella-aplikazioak-batx2g-game-records'

const level = (progressId: number, stage: Bach2gApplicationsStageId, title: [string, string, string, string], description: [string, string, string, string]) => ({
    progressId,
    stage,
    title: { eu: title[0], es: title[1], ar: title[2], en: title[3] },
    description: { eu: description[0], es: description[1], ar: description[2], en: description[3] }
})

export const bach2gApplicationsGames: GameInfo<Bach2gApplicationsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Aplikazioen lasterketa', es: 'Carrera de aplicaciones', en: 'Applications race', ar: 'سباق التطبيقات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            level(147401, 'tangent', ['Ukitzailea', 'Tangente', 'المماس', 'Tangent'], ['Malda, n eta paraleloak.', 'Pendiente, n y paralelas.', 'الميل وn والمستقيمات الموازية.', 'Slope, n and parallels.']),
            level(147402, 'growth', ['Hazkundea', 'Crecimiento', 'التزايد', 'Growth'], ["f' funtzioaren zeinua.", "El signo de f'.", "إشارة f'.", "The sign of f'."]),
            level(147403, 'extrema', ['Muturrak', 'Extremos', 'القيم القصوى', 'Extrema'], ['Erlatiboak eta absolutuak.', 'Relativos y absolutos.', 'المحلية والمطلقة.', 'Relative and absolute.']),
            level(147404, 'curvature', ['Kurbadura', 'Curvatura', 'التقعّر', 'Curvature'], ["f'' eta inflexioa.", "f'' e inflexión.", "‏f'' والانعطاف.", "f'' and inflection."]),
            level(147405, 'optimization', ['Optimizazioa', 'Optimización', 'الاستمثال', 'Optimisation'], ['Irabazia eta batez besteko kostua.', 'Beneficio y coste medio.', 'الربح ومتوسط التكلفة.', 'Profit and average cost.'])
        ]
    },
    {
        id: 'extreme',
        title: { eu: 'Maximoa, minimoa ala ezer ez?', es: '¿Máximo, mínimo o nada?', en: 'Maximum, minimum or nothing?', ar: 'عظمى أم صغرى أم لا شيء؟' },
        tagline: { eu: 'Deribatua zero den puntu bat: esan zer dagoen han.', es: 'Un punto donde la derivada vale cero: di qué hay allí.', en: 'A point where the derivative is zero: say what is there.', ar: 'نقطة تنعدم فيها المشتقة: قل ماذا يوجد هناك.' },
        skills: { eu: 'Zeinu-taula eta bigarren deribatua', es: 'La tabla de signos y la segunda derivada', en: 'The sign chart and the second derivative', ar: 'جدول الإشارات والمشتقة الثانية' },
        levels: [
            level(147501, 'extrema', ['Zeinu-taula', 'Tabla de signos', 'جدول الإشارات', 'Sign chart'], ["f' funtzioaren zeinuak.", "Los signos de f'.", "إشارات f'.", "The signs of f'."]),
            level(147502, 'extrema', ['Polinomioak', 'Polinomios', 'الحدوديات', 'Polynomials'], ["f'' edo f' funtzioaren zeinua.", "f'' o el signo de f'.", "‏f'' أو إشارة f'.", "f'' or the sign of f'."]),
            level(147503, 'optimization', ['Ekonomia', 'Economía', 'الاقتصاد', 'Economy'], ['Irabaziak, salmentak eta kostuak.', 'Beneficios, ventas y costes.', 'الأرباح والمبيعات والتكاليف.', 'Profits, sales and costs.'])
        ]
    },
    {
        id: 'optimize',
        title: { eu: 'Optimizatu enpresa', es: 'Optimiza la empresa', en: 'Optimise the firm', ar: 'استمثل الشركة' },
        tagline: { eu: 'Enpresa baten problema labur bat: aukeratu zenbaki onena.', es: 'Un problema corto de una empresa: elige el mejor número.', en: 'A short problem of a firm: pick the best number.', ar: 'مسألة قصيرة لشركة: اختر أفضل عدد.' },
        skills: { eu: 'Irabazirik handiena, kosturik txikiena, prezio onena', es: 'Mayor beneficio, menor coste, mejor precio', en: 'Highest profit, lowest cost, best price', ar: 'أكبر ربح وأصغر تكلفة وأفضل سعر' },
        levels: [
            level(147601, 'optimization', ['Irabazia', 'Beneficio', 'الربح', 'Profit'], ['B = −ax² + bx − c.', 'B = −ax² + bx − c.', 'B = −ax² + bx − c.', 'B = −ax² + bx − c.']),
            level(147602, 'optimization', ['Batez besteko kostua', 'Coste medio', 'متوسط التكلفة', 'Average cost'], ['M = C / x.', 'M = C / x.', 'M = C / x.', 'M = C / x.']),
            level(147603, 'optimization', ['Prezioa', 'Precio', 'السعر', 'Price'], ['(p + x)(q − kx).', '(p + x)(q − kx).', '(p + x)(q − kx).', '(p + x)(q − kx).'])
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Aplikazioen detektibea', es: 'Detective de aplicaciones', en: 'Applications detective', ar: 'مخبر التطبيقات' },
        tagline: { eu: 'Ebatzitako ariketa batean lerro bat dago gaizki: aurkitu eta esan zer akats den.', es: 'En un ejercicio resuelto hay una línea mal: encuéntrala y di qué error es.', en: 'In a solved exercise one line is wrong: find it and name the mistake.', ar: 'في تمرين محلول سطر خاطئ: اعثر عليه وسمِّ الخطأ.' },
        skills: { eu: 'Deribatuaren aplikazioetako akats ohikoak', es: 'Los errores típicos de las aplicaciones de la derivada', en: 'The typical mistakes in applying the derivative', ar: 'الأخطاء الشائعة في تطبيقات المشتقة' },
        levels: [
            level(147701, 'growth', ['Ukitzailea eta hazkundea', 'Tangente y crecimiento', 'المماس والتزايد', 'Tangent and growth'], ['Malda, n, zeinua eta tartea.', 'Pendiente, n, signo e intervalo.', 'الميل وn والإشارة والفترة.', 'Slope, n, sign and interval.']),
            level(147702, 'extrema', ['Muturrak', 'Extremos', 'القيم القصوى', 'Extrema'], ["f' = 0, muturrak, f'' eta parametroak.", "f' = 0, extremos, f'' y parámetros.", "‏f' = 0 والطرفان و‏f'' والوسطاء.", "f' = 0, ends, f'' and parameters."]),
            level(147703, 'optimization', ['Optimizazioa', 'Optimización', 'الاستمثال', 'Optimisation'], ['Kostua, batez bestekoa, prezioa eta biderkadura.', 'Coste, medio, precio y producto.', 'التكلفة والمتوسط والسعر والجداء.', 'Cost, average, price and product.'])
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Aplikazioen memoria', es: 'Memoria de aplicaciones', en: 'Applications memory', ar: 'ذاكرة التطبيقات' },
        tagline: { eu: 'Aurkitu bikoteak: funtzio bat eta bere puntu garrantzitsua.', es: 'Encuentra las parejas: una función y su punto clave.', en: 'Find the pairs: a function and its key point.', ar: 'اعثر على الأزواج: دالة ونقطتها المهمة.' },
        skills: { eu: 'Erpina, inflexioa eta produkzio onena', es: 'Vértice, inflexión y mejor producción', en: 'Vertex, inflection and best production', ar: 'الرأس والانعطاف وأفضل إنتاج' },
        levels: [
            level(147801, 'extrema', ['Erpina', 'Vértice', 'الرأس', 'Vertex'], ['Parabolak.', 'Parábolas.', 'القطوع المكافئة.', 'Parabolas.']),
            level(147802, 'curvature', ['Inflexioa', 'Inflexión', 'الانعطاف', 'Inflection'], ['Kubikoak.', 'Cúbicas.', 'التكعيبية.', 'Cubics.']),
            level(147803, 'optimization', ['Produkzio onena', 'Mejor producción', 'أفضل إنتاج', 'Best production'], ['Irabazia eta batez besteko kostua.', 'Beneficio y coste medio.', 'الربح ومتوسط التكلفة.', 'Profit and average cost.'])
        ]
    }
]

export const bach2gApplicationsGameProgressIds: number[] = levelProgressIds(bach2gApplicationsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bach2gApplicationsGameSlugs: Record<Bach2gApplicationsGameId, string> = { race: 'lasterketa', extreme: 'muturra', optimize: 'optimizatu', detective: 'detektibea', memory: 'memoria' }

export function bach2gApplicationsGameModeForPath(pathname: string): Bach2gApplicationsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['muturra', 'extremo'].includes(game)) return 'extreme'
    if (['optimizatu', 'optimiza'].includes(game)) return 'optimize'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

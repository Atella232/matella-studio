import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { functionsAkGames } from '../../dbh4-akademikoak-funtzioak/games/info.ts'
import { polynomialAkGames } from '../../dbh4-akademikoak-polinomikoak/games/info.ts'
import type { SocFunctionsStageId } from '../lessons.tsx'

/* ==========================================================================
   Funtzio elementalak (Batxilergoa 1 · Gizarte Zientziak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star. Four games of its own (estimate the datum, the
   right price, the bill in stretches and the detective), the race and the
   memory, and two games of 4. DBH académicas (paint the domain and the
   curve laser), with their texts and levels but the stages and progress
   ids of this unit.
   ========================================================================== */

export type SocFunctionsGameId = 'race' | 'estimate' | 'price' | 'bill' | 'detective' | 'memory' | 'domain' | 'laser'

export const SOC_FUNCTIONS_GAME_RECORDS_KEY = 'matella-funtzioak-batx1g-game-records'

/** A 4. DBH game with its texts and levels, the stages and progress ids of this unit */
function reused(source: GameInfo<string>, id: SocFunctionsGameId, stages: SocFunctionsStageId[], firstId: number): GameInfo<SocFunctionsGameId> {
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}
const laser = polynomialAkGames.find((game) => game.id === 'laser')!

/** The curve families of each level of the laser in this unit */
export const SOC_FUNCTIONS_LASER_FAMILIES = [['line', 'parabola'], ['inverse', 'abs'], ['parabola', 'inverse', 'abs']] as const

export const socFunctionsGames: GameInfo<SocFunctionsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Funtzioen lasterketa', es: 'Carrera de funciones', en: 'Functions race', ar: 'سباق الدوال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 133401, stage: 'families', title: { eu: 'Izate-eremua', es: 'Dominio', en: 'Domain', ar: 'المجال' }, description: { eu: 'Erroak, zatikiak eta prezioak.', es: 'Raíces, fracciones y precios.', en: 'Roots, fractions and prices.', ar: 'الجذور والكسور والأسعار.' } },
            { progressId: 133402, stage: 'linear', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'Malda, interpolazioa eta tarifak.', es: 'Pendiente, interpolación y tarifas.', en: 'Slope, interpolation and tariffs.', ar: 'الميل والاستيفاء والتعرفات.' } },
            { progressId: 133403, stage: 'quadratic', title: { eu: 'Parabolak', es: 'Parábolas', en: 'Parabolas', ar: 'القطوع المكافئة' }, description: { eu: 'Erpina, mozkina eta prezioa.', es: 'Vértice, beneficio y precio.', en: 'Vertex, profit and price.', ar: 'الرأس والربح والسعر.' } },
            { progressId: 133404, stage: 'inverse', title: { eu: 'Hiperbolak', es: 'Hipérbolas', en: 'Hyperbolas', ar: 'القطوع الزائدة' }, description: { eu: 'Alderantzizkoa, batez besteko kostua eta asintotak.', es: 'Inversa, coste medio y asíntotas.', en: 'Inverse, average cost and asymptotes.', ar: 'العكسي والتكلفة المتوسطة والمقاربات.' } },
            { progressId: 133405, stage: 'piecewise', title: { eu: 'Zatika', es: 'A trozos', en: 'Piecewise', ar: 'على أجزاء' }, description: { eu: 'Muga, faktura eta |f(x)|.', es: 'El límite, la factura y |f(x)|.', en: 'The threshold, the bill and |f(x)|.', ar: 'الحدّ والفاتورة و|f(x)|.' } }
        ]
    },
    {
        id: 'estimate',
        title: { eu: 'Estimatu datua', es: 'Estima el dato', en: 'Estimate the datum', ar: 'قدّر البيانة' },
        tagline: { eu: 'Datu batzuk sarean: esan interpolatzea ala estrapolatzea den, eta sakatu estimazioa.', es: 'Unos datos en la cuadrícula: di si es interpolar o extrapolar y toca la estimación.', en: 'Some data on the grid: say whether it is interpolating or extrapolating and tap the estimate.', ar: 'بيانات على الشبكة: قل هل هو استيفاء أم استقراء خارجي والمس التقدير.' },
        skills: { eu: 'Interpolazio lineala eta parabolikoa', es: 'Interpolación lineal y parabólica', en: 'Linear and parabolic interpolation', ar: 'الاستيفاء الخطي والتربيعي' },
        levels: [
            { progressId: 133501, stage: 'linear', title: { eu: 'Bi datu', es: 'Dos datos', en: 'Two data', ar: 'بيانتان' }, description: { eu: 'Zuzena, hurbil.', es: 'La recta, cerca.', en: 'The line, close by.', ar: 'المستقيم عن قرب.' } },
            { progressId: 133502, stage: 'linear', title: { eu: 'Urrunago', es: 'Más lejos', en: 'Further away', ar: 'أبعد' }, description: { eu: 'Datu urrunak eta estrapolazioak.', es: 'Datos separados y extrapolaciones.', en: 'Spread data and extrapolations.', ar: 'بيانات متباعدة واستقراءات خارجية.' } },
            { progressId: 133503, stage: 'quadratic', title: { eu: 'Hiru datu', es: 'Tres datos', en: 'Three data', ar: 'ثلاث بيانات' }, description: { eu: 'Newtonen parabola.', es: 'La parábola de Newton.', en: 'Newton\'s parabola.', ar: 'قطع نيوتن المكافئ.' } }
        ]
    },
    {
        id: 'price',
        title: { eu: 'Prezio zuzena', es: 'El precio justo', en: 'The right price', ar: 'السعر المناسب' },
        tagline: { eu: 'Lau prezio, eta bakoitzak bere laukizuzena: aukeratu gehien ematen duena.', es: 'Cuatro precios, cada uno con su rectángulo: elige el que más da.', en: 'Four prices, each with its rectangle: choose the one that brings in most.', ar: 'أربعة أسعار لكل منها مستطيله: اختر الذي يعطي أكثر.' },
        skills: { eu: 'Diru-sarrera eta mozkin handienak', es: 'Ingresos y beneficios máximos', en: 'Greatest revenue and profit', ar: 'أكبر الإيرادات والأرباح' },
        levels: [
            { progressId: 133551, stage: 'quadratic', title: { eu: 'Diru-sarrerak', es: 'Ingresos', en: 'Revenue', ar: 'الإيرادات' }, description: { eu: 'p · q handiena.', es: 'El mayor p · q.', en: 'The greatest p · q.', ar: 'أكبر p · q.' } },
            { progressId: 133552, stage: 'quadratic', title: { eu: 'Mozkina', es: 'Beneficio', en: 'Profit', ar: 'الربح' }, description: { eu: 'Unitateko kostuarekin.', es: 'Con coste por unidad.', en: 'With a cost per unit.', ar: 'مع تكلفة للوحدة.' } },
            { progressId: 133553, stage: 'quadratic', title: { eu: 'Igoerak', es: 'Subidas', en: 'Rises', ar: 'الزيادات' }, description: { eu: 'Igoera bakoitzeko, gutxiago saltzen da.', es: 'Por cada subida, se vende menos.', en: 'Each rise sells less.', ar: 'كل زيادة تقلل المبيعات.' } }
        ]
    },
    {
        id: 'bill',
        title: { eu: 'Faktura zatika', es: 'La factura a trozos', en: 'The bill in stretches', ar: 'الفاتورة على أجزاء' },
        tagline: { eu: 'Tarifa bat bi preziorekin: kalkulatu faktura, edo aurkitu zenbat kontsumitu den.', es: 'Una tarifa con dos precios: calcula la factura o averigua cuánto se gastó.', en: 'A tariff with two prices: work out the bill or find how much was used.', ar: 'تعرفة بسعرين: احسب الفاتورة أو جد مقدار الاستهلاك.' },
        skills: { eu: 'Zatika definitutako funtzioak', es: 'Funciones a trozos', en: 'Piecewise functions', ar: 'الدوال المعرّفة على أجزاء' },
        levels: [
            { progressId: 133601, stage: 'piecewise', title: { eu: 'Formulatik', es: 'Desde la fórmula', en: 'From the formula', ar: 'من الصيغة' }, description: { eu: 'C(x) zatika eta kopuru bat.', es: 'C(x) a trozos y una cantidad.', en: 'C(x) piecewise and an amount.', ar: 'C(x) على أجزاء وكمية.' } },
            { progressId: 133602, stage: 'piecewise', title: { eu: 'Hitzetatik', es: 'Desde el enunciado', en: 'From the words', ar: 'من النص' }, description: { eu: 'Tarifa idatzita.', es: 'La tarifa escrita.', en: 'The tariff in words.', ar: 'التعرفة مكتوبة.' } },
            { progressId: 133603, stage: 'piecewise', title: { eu: 'Alderantziz', es: 'Al revés', en: 'Backwards', ar: 'بالعكس' }, description: { eu: 'Faktura ezaguna: zenbat kontsumitu?', es: 'Se sabe la factura: ¿cuánto se gastó?', en: 'The bill is known: how much was used?', ar: 'الفاتورة معروفة: كم الاستهلاك؟' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Funtzioen detektibea', es: 'Detective de funciones', en: 'Functions detective', ar: 'مخبر الدوال' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 133701, stage: 'families', title: { eu: 'Izate-eremua eta zuzenak', es: 'Dominio y rectas', en: 'Domain and lines', ar: 'المجال والمستقيمات' }, description: { eu: 'Erroa, izendatzailea, malda eta kostu finkoa.', es: 'Raíz, denominador, pendiente y coste fijo.', en: 'Root, denominator, slope and fixed cost.', ar: 'الجذر والمقام والميل والتكلفة الثابتة.' } },
            { progressId: 133702, stage: 'quadratic', title: { eu: 'Parabolak eta datuak', es: 'Parábolas y datos', en: 'Parabolas and data', ar: 'القطوع المكافئة والبيانات' }, description: { eu: 'Erpina, mozkina, kostua eta interpolazioa.', es: 'Vértice, beneficio, coste e interpolación.', en: 'Vertex, profit, cost and interpolation.', ar: 'الرأس والربح والتكلفة والاستيفاء.' } },
            { progressId: 133703, stage: 'piecewise', title: { eu: 'Hiperbolak eta tarifak', es: 'Hipérbolas y tarifas', en: 'Hyperbolas and tariffs', ar: 'القطوع الزائدة والتعرفات' }, description: { eu: 'Alderantzizkoa, asintota, muga eta prezioak.', es: 'Inversa, asíntota, límite y precios.', en: 'Inverse, asymptote, threshold and prices.', ar: 'العكسي والمقارب والحدّ والأسعار.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: funtzio bat eta bere izate-eremua, parabola bat eta bere erpina, edo hiperbola bat eta bere asintotak.', es: 'Encuentra las parejas: una función y su dominio, una parábola y su vértice, o una hipérbola y sus asíntotas.', en: 'Find the pairs: a function and its domain, a parabola and its vertex, or a hyperbola and its asymptotes.', ar: 'اعثر على الأزواج: دالة ومجالها، أو قطع مكافئ ورأسه، أو قطع زائد وخطاه المقاربان.' },
        skills: { eu: 'Izate-eremuak, erpinak eta asintotak', es: 'Dominios, vértices y asíntotas', en: 'Domains, vertices and asymptotes', ar: 'المجالات والرؤوس والمقاربات' },
        levels: [
            { progressId: 133801, stage: 'families', title: { eu: 'Izate-eremuak', es: 'Dominios', en: 'Domains', ar: 'المجالات' }, description: { eu: '√(x − 2) ↔ [2, +∞)', es: '√(x − 2) ↔ [2, +∞)', en: '√(x − 2) ↔ [2, +∞)', ar: '√(x − 2) ↔ [2, +∞)' } },
            { progressId: 133802, stage: 'quadratic', title: { eu: 'Erpinak', es: 'Vértices', en: 'Vertices', ar: 'الرؤوس' }, description: { eu: 'x² − 4x + 1 ↔ V(2, −3)', es: 'x² − 4x + 1 ↔ V(2, −3)', en: 'x² − 4x + 1 ↔ V(2, −3)', ar: 'x² − 4x + 1 ↔ V(2, −3)' } },
            { progressId: 133803, stage: 'inverse', title: { eu: 'Asintotak', es: 'Asíntotas', en: 'Asymptotes', ar: 'المقاربات' }, description: { eu: '2 + 3/(x − 1) ↔ x = 1, y = 2', es: '2 + 3/(x − 1) ↔ x = 1, y = 2', en: '2 + 3/(x − 1) ↔ x = 1, y = 2', ar: '2 + 3/(x − 1) ↔ x = 1, y = 2' } }
        ]
    },
    reused(functionsAkGames.find((game) => game.id === 'domain')!, 'domain', ['families', 'families', 'families'], 133811),
    {
        ...reused(laser, 'laser', ['linear', 'inverse', 'quadratic'], 133821),
        levels: [
            { progressId: 133821, stage: 'linear', title: { eu: 'Zuzenak eta parabolak', es: 'Rectas y parábolas', en: 'Lines and parabolas', ar: 'المستقيمات والقطوع المكافئة' }, description: { eu: 'mx + n eta a(x − h)² + k', es: 'mx + n y a(x − h)² + k', en: 'mx + n and a(x − h)² + k', ar: 'mx + n وa(x − h)² + k' } },
            { progressId: 133822, stage: 'inverse', title: { eu: 'Hiperbolak eta |x|', es: 'Hipérbolas y |x|', en: 'Hyperbolas and |x|', ar: 'القطوع الزائدة و|x|' }, description: { eu: 'k/(x − h) + c eta a|x − h| + k', es: 'k/(x − h) + c y a|x − h| + k', en: 'k/(x − h) + c and a|x − h| + k', ar: 'k/(x − h) + c وa|x − h| + k' } },
            { progressId: 133823, stage: 'quadratic', title: { eu: 'Nahastuta', es: 'Mezcladas', en: 'Mixed', ar: 'مختلطة' }, description: { eu: 'Parabolak, hiperbolak eta |x|.', es: 'Parábolas, hipérbolas y |x|.', en: 'Parabolas, hyperbolas and |x|.', ar: 'القطوع المكافئة والزائدة و|x|.' } }
        ]
    }
]

export const socFunctionsGameProgressIds: number[] = levelProgressIds(socFunctionsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const socFunctionsGameSlugs: Record<SocFunctionsGameId, string> = { race: 'lasterketa', estimate: 'datua', price: 'prezioa', bill: 'faktura', detective: 'detektibea', memory: 'memoria', domain: 'eremua', laser: 'laserra' }

export function socFunctionsGameModeForPath(pathname: string): SocFunctionsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['datua', 'dato'].includes(game)) return 'estimate'
    if (['prezioa', 'precio'].includes(game)) return 'price'
    if (['faktura', 'factura'].includes(game)) return 'bill'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['eremua', 'dominio'].includes(game)) return 'domain'
    if (['laserra', 'laser'].includes(game)) return 'laser'
    return 'hub'
}

import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { bachFunctionsGames } from '../../batx1-zientziak-funtzioak/games/info.ts'
import { exponentialAkGames } from '../../dbh4-akademikoak-esponentzialak/games/info.ts'
import type { SocExpStageId } from '../lessons.tsx'

/* ==========================================================================
   Funtzio esponentzialak eta logaritmikoak (Batxilergoa 1 · Gizarte
   Zientziak) games: two of their own (linear or exponential?, discount,
   VAT and delivery) and the detective, the race and the memory, and games
   borrowed with their texts and levels but this unit's stages and
   progress ids: from the Ciencias twin, where does the point land? (only
   its first two levels: the third has stretches), put the machines in
   order and undo the machine; from 4. DBH, when does it double? and the
   curve laser.
   ========================================================================== */

export type SocExpGameId = 'race' | 'table' | 'checkout' | 'detective' | 'memory' | 'where' | 'order' | 'undo' | 'growth' | 'laser'

export const SOC_EXP_GAME_RECORDS_KEY = 'matella-esponentzialak-batx1g-game-records'

function reused(source: GameInfo<string>, id: SocExpGameId, stages: SocExpStageId[], firstId: number): GameInfo<SocExpGameId> {
    return { ...source, id, levels: source.levels.slice(0, stages.length).map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}
const ciencias = (id: string) => bachFunctionsGames.find((game) => game.id === id)!
const fourth = (id: string) => exponentialAkGames.find((game) => game.id === id)!

/** The curve families of each level of the laser in this unit */
export const SOC_EXP_LASER_FAMILIES = [['exp', 'parabola'], ['log', 'inverse'], ['exp', 'log']] as const

export const socExpGames: GameInfo<SocExpGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Funtzioen lasterketa', es: 'Carrera de funciones', en: 'Functions race', ar: 'سباق الدوال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 134401, stage: 'transforms', title: { eu: 'Transformazioak', es: 'Transformaciones', en: 'Transformations', ar: 'التحويلات' }, description: { eu: 'f(x + c), (x − m)² + p eta k·f(x).', es: 'f(x + c), (x − m)² + p y k·f(x).', en: 'f(x + c), (x − m)² + p and k·f(x).', ar: 'f(x + c) و(x − m)² + p وk·f(x).' } },
            { progressId: 134402, stage: 'composition', title: { eu: 'Konposizioa', es: 'Composición', en: 'Composition', ar: 'التركيب' }, description: { eu: 'f ∘ g, f⁻¹ eta prezioak.', es: 'f ∘ g, f⁻¹ y precios.', en: 'f ∘ g, f⁻¹ and prices.', ar: 'f ∘ g وf⁻¹ والأسعار.' } },
            { progressId: 134403, stage: 'exponential', title: { eu: 'Esponentzialak', es: 'Exponenciales', en: 'Exponentials', ar: 'الأسية' }, description: { eu: 'k·aᵗ, ehunekoak eta bi datu.', es: 'k·aᵗ, porcentajes y dos datos.', en: 'k·aᵗ, percentages and two data.', ar: 'k·aᵗ والنسب وبيانتان.' } },
            { progressId: 134404, stage: 'logarithmic', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'Balioak, ekuazioak eta izate-eremuak.', es: 'Valores, ecuaciones y dominios.', en: 'Values, equations and domains.', ar: 'القيم والمعادلات والمجالات.' } },
            { progressId: 134405, stage: 'models', title: { eu: 'Ereduak', es: 'Modelos', en: 'Models', ar: 'النماذج' }, description: { eu: 'Bikoiztu, erdibizitza eta logistikoa.', es: 'Duplicar, semivida y logística.', en: 'Doubling, half-life and logistic.', ar: 'التضاعف وعمر النصف واللوجستية.' } }
        ]
    },
    {
        id: 'table',
        title: { eu: 'Lineala ala esponentziala?', es: '¿Lineal o exponencial?', en: 'Linear or exponential?', ar: 'خطية أم أسية؟' },
        tagline: { eu: 'Datu-taula bat: kendurak ala zatidurak dira konstanteak? Aukeratu eredua eta hurrengo datua.', es: 'Una tabla de datos: ¿son constantes las diferencias o los cocientes? Elige el modelo y el dato que sigue.', en: 'A table of data: are the differences or the quotients constant? Choose the model and the next datum.', ar: 'جدول بيانات: هل الفروق ثابتة أم خوارج القسمة؟ اختر النموذج والبيانة التالية.' },
        skills: { eu: 'Eredu lineala eta esponentziala', es: 'Modelo lineal y exponencial', en: 'Linear and exponential models', ar: 'النموذج الخطي والأسي' },
        levels: [
            { progressId: 134501, stage: 'exponential', title: { eu: 'Urrats osoak', es: 'Pasos enteros', en: 'Whole steps', ar: 'خطوات صحيحة' }, description: { eu: '+5 ala ×3?', es: '¿+5 o ×3?', en: '+5 or ×3?', ar: '+5 أم ×3؟' } },
            { progressId: 134502, stage: 'exponential', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' }, description: { eu: '+100 ala ×1,1?', es: '¿+100 o ×1,1?', en: '+100 or ×1.1?', ar: '+100 أم ×1.1؟' } },
            { progressId: 134503, stage: 'exponential', title: { eu: 'Urrunago', es: 'Más lejos', en: 'Further on', ar: 'أبعد' }, description: { eu: 'Bi urrats harago.', es: 'Dos pasos más allá.', en: 'Two steps further.', ar: 'خطوتان أبعد.' } }
        ]
    },
    {
        id: 'checkout',
        title: { eu: 'Deskontua, BEZa eta bidalketa', es: 'Descuento, IVA y envío', en: 'Discount, VAT and delivery', ar: 'الخصم والضريبة والشحن' },
        tagline: { eu: 'Eragiketak prezio bati: ordenak garrantzia du. Kalkulatu azken prezioa edo aurkitu ordena.', es: 'Operaciones sobre un precio: el orden importa. Calcula el precio final o encuentra el orden.', en: 'Operations on a price: the order matters. Work out the final price or find the order.', ar: 'عمليات على سعر: الترتيب مهم. احسب السعر النهائي أو جد الترتيب.' },
        skills: { eu: 'Funtzioen konposizioa', es: 'Composición de funciones', en: 'Composition of functions', ar: 'تركيب الدوال' },
        levels: [
            { progressId: 134551, stage: 'composition', title: { eu: 'Azken prezioa', es: 'El precio final', en: 'The final price', ar: 'السعر النهائي' }, description: { eu: 'Bi eragiketa ordenan.', es: 'Dos operaciones en orden.', en: 'Two operations in order.', ar: 'عمليتان بالترتيب.' } },
            { progressId: 134552, stage: 'composition', title: { eu: 'Zein ordena?', es: '¿Qué orden?', en: 'Which order?', ar: 'أي ترتيب؟' }, description: { eu: 'Bi eragiketa eta prezio bat.', es: 'Dos operaciones y un precio.', en: 'Two operations and a price.', ar: 'عمليتان وسعر.' } },
            { progressId: 134553, stage: 'composition', title: { eu: 'Hiru eragiketa', es: 'Tres operaciones', en: 'Three operations', ar: 'ثلاث عمليات' }, description: { eu: 'Sei ordena, bat zuzena.', es: 'Seis órdenes, uno bueno.', en: 'Six orders, one right.', ar: 'ستة ترتيبات، واحد صحيح.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Funtzioen detektibea', es: 'Detective de funciones', en: 'Functions detective', ar: 'مخبر الدوال' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 134701, stage: 'transforms', title: { eu: 'Transformazioak eta konposizioa', es: 'Transformaciones y composición', en: 'Transformations and composition', ar: 'التحويلات والتركيب' }, description: { eu: 'x + a, f(−x), f ∘ g eta f⁻¹.', es: 'x + a, f(−x), f ∘ g y f⁻¹.', en: 'x + a, f(−x), f ∘ g and f⁻¹.', ar: 'x + a وf(−x) وf ∘ g وf⁻¹.' } },
            { progressId: 134702, stage: 'exponential', title: { eu: 'Esponentzialak', es: 'Exponenciales', en: 'Exponentials', ar: 'الأسية' }, description: { eu: '1 − r, erroa, k·aˣ eta bi igoera.', es: '1 − r, la raíz, k·aˣ y dos subidas.', en: '1 − r, the root, k·aˣ and two rises.', ar: '1 − r والجذر وk·aˣ وزيادتان.' } },
            { progressId: 134703, stage: 'logarithmic', title: { eu: 'Logaritmoak eta ereduak', es: 'Logaritmos y modelos', en: 'Logarithms and models', ar: 'اللوغاريتمات والنماذج' }, description: { eu: 'aᵗ = c, log c / log a, izate-eremua eta 2ⁿ.', es: 'aᵗ = c, log c / log a, dominio y 2ⁿ.', en: 'aᵗ = c, log c / log a, domain and 2ⁿ.', ar: 'aᵗ = c وlog c / log a والمجال و2ⁿ.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: ehuneko bat eta bere biderkatzailea, logaritmo bat eta bere balioa, edo funtzio bat eta bere alderantzizkoa.', es: 'Encuentra las parejas: un porcentaje y su factor, un logaritmo y su valor, o una función y su inversa.', en: 'Find the pairs: a percentage and its factor, a logarithm and its value, or a function and its inverse.', ar: 'اعثر على الأزواج: نسبة ومعاملها، أو لوغاريتم وقيمته، أو دالة وعكسيتها.' },
        skills: { eu: 'Biderkatzaileak, logaritmoak eta alderantzizkoak', es: 'Factores, logaritmos e inversas', en: 'Factors, logarithms and inverses', ar: 'المعاملات واللوغاريتمات والعكسيات' },
        levels: [
            { progressId: 134801, stage: 'exponential', title: { eu: 'Biderkatzaileak', es: 'Factores', en: 'Factors', ar: 'المعاملات' }, description: { eu: '−15 % ↔ ×0,85', es: '−15 % ↔ ×0,85', en: '−15 % ↔ ×0.85', ar: '−15 % ↔ ×0.85' } },
            { progressId: 134802, stage: 'logarithmic', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'log₂ 8 ↔ 3', es: 'log₂ 8 ↔ 3', en: 'log₂ 8 ↔ 3', ar: 'log₂ 8 ↔ 3' } },
            { progressId: 134803, stage: 'composition', title: { eu: 'Alderantzizkoak', es: 'Inversas', en: 'Inverses', ar: 'العكسيات' }, description: { eu: '2ˣ + 3 ↔ log₂(x − 3)', es: '2ˣ + 3 ↔ log₂(x − 3)', en: '2ˣ + 3 ↔ log₂(x − 3)', ar: '2ˣ + 3 ↔ log₂(x − 3)' } }
        ]
    },
    reused(ciencias('where'), 'where', ['transforms', 'transforms'], 134811),
    reused(ciencias('order'), 'order', ['composition', 'composition', 'composition'], 134821),
    reused(ciencias('undo'), 'undo', ['composition', 'composition', 'composition'], 134831),
    reused(fourth('growth'), 'growth', ['models', 'models', 'models'], 134841),
    reused(fourth('laser'), 'laser', ['exponential', 'logarithmic', 'logarithmic'], 134851)
]

export const socExpGameProgressIds: number[] = levelProgressIds(socExpGames)

export const socExpGameSlugs: Record<SocExpGameId, string> = { race: 'lasterketa', table: 'taula', checkout: 'kutxa', detective: 'detektibea', memory: 'memoria', where: 'puntua', order: 'makinak', undo: 'desegin', growth: 'bikoiztu', laser: 'laserra' }

export function socExpGameModeForPath(pathname: string): SocExpGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    const pairs: Array<[SocExpGameId, string[]]> = [
        ['race', ['carrera', 'lasterketa']], ['table', ['taula', 'tabla']], ['checkout', ['kutxa', 'caja']], ['detective', ['detektibea', 'detective']],
        ['memory', ['memoria', 'memory']], ['where', ['puntua', 'punto']], ['order', ['makinak', 'maquinas']], ['undo', ['desegin', 'deshaz']],
        ['growth', ['bikoiztu', 'duplica']], ['laser', ['laserra', 'laser']]
    ]
    return pairs.find(([, names]) => names.includes(game))?.[0] ?? 'hub'
}

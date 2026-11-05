import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { trigonometryGames } from '../../dbh4-akademikoak-trigonometria/games/info.ts'
import type { TrigonometryStageId } from '../lessons.tsx'

/* ==========================================================================
   Formula eta funtzio trigonometrikoak (Batxilergoa 1 · Zientziak) games:
   the list shown in the hub, with levels and the unit progress id each
   level earns with its first star. Three games of its own (build the
   formula, hunt the solutions, exact value), the detective, the race and
   the memory, and the unit circle of 4. DBH kept for the review (its
   radian level too), with its texts and levels but the stages and
   progress ids of this unit. Every id is in the block 103401–103899.
   ========================================================================== */

export type TrigonometryBatx1zGameId = 'race' | 'build' | 'hunt' | 'exact' | 'detective' | 'memory' | 'circle'

export const TRIGONOMETRY_BATX1Z_GAME_RECORDS_KEY = 'matella-trigonometria-batx1z-game-records'

/** A 4. DBH game with its texts and levels, the stages and progress ids of this unit */
function reused(id: 'circle', stages: TrigonometryStageId[], firstId: number): GameInfo<TrigonometryBatx1zGameId> {
    const source = trigonometryGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const trigonometryBatx1zGames: GameInfo<TrigonometryBatx1zGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Trigonometriaren lasterketa', es: 'Carrera de trigonometría', en: 'Trigonometry race', ar: 'سباق حساب المثلثات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 103401, stage: 'ratios', title: { eu: 'Sei arrazoiak', es: 'Las seis razones', en: 'The six ratios', ar: 'النسب الست' }, description: { eu: 'Radianak, sekantea eta kosekantea.', es: 'Radianes, secante y cosecante.', en: 'Radians, secant and cosecant.', ar: 'الراديان والقاطع وقاطع التمام.' } },
            { progressId: 103402, stage: 'sums', title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', en: 'Sums and differences', ar: 'المجموع والفرق' }, description: { eu: 'Batuketaren sinua, kosinua eta tangentea.', es: 'Seno, coseno y tangente de una suma.', en: 'Sine, cosine and tangent of a sum.', ar: 'جيب المجموع وجيب تمامه وظله.' } },
            { progressId: 103403, stage: 'double', title: { eu: 'Bikoitza eta erdia', es: 'Doble y mitad', en: 'Double and half', ar: 'الضعف والنصف' }, description: { eu: 'sin 2α, cos 2α eta angelu erdia.', es: 'sen 2α, cos 2α y el ángulo mitad.', en: 'sin 2α, cos 2α and the half angle.', ar: 'sin 2α وcos 2α ونصف الزاوية.' } },
            { progressId: 103404, stage: 'equations', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' }, description: { eu: 'Zenbat soluzio eta handiena.', es: 'Cuántas soluciones y la mayor.', en: 'How many solutions and the largest.', ar: 'كم حلًّا وأكبرها.' } },
            { progressId: 103405, stage: 'functions', title: { eu: 'Funtzioak', es: 'Funciones', en: 'Functions', ar: 'الدوال' }, description: { eu: 'Periodoa, anplitudea eta noria.', es: 'Periodo, amplitud y noria.', en: 'Period, amplitude and Ferris wheel.', ar: 'الدور والسعة والدولاب.' } }
        ]
    },
    {
        id: 'build',
        title: { eu: 'Muntatu formula', es: 'Monta la fórmula', en: 'Build the formula', ar: 'ركّب الصيغة' },
        tagline: { eu: 'Formula baten hutsuneak, banan-banan: aukeratu pieza zuzena. Zeinu bat aldatzea nahikoa da hutsegiteko.', es: 'Los huecos de una fórmula, uno a uno: elige la pieza buena. Basta un signo cambiado para fallar.', en: 'The gaps of a formula, one by one: choose the right piece. One wrong sign is enough to fail.', ar: 'فراغات صيغة واحدًا تلو الآخر: اختر القطعة الصحيحة. تكفي إشارة خاطئة للفشل.' },
        skills: { eu: 'Batuketa, bikoitza, erdia eta biderkadurak', es: 'Suma, doble, mitad y productos', en: 'Sum, double, half and products', ar: 'المجموع والضعف والنصف والجداءات' },
        levels: [
            { progressId: 103501, stage: 'sums', title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', en: 'Sum and difference', ar: 'المجموع والفرق' }, description: { eu: 'Sinua eta kosinua.', es: 'Seno y coseno.', en: 'Sine and cosine.', ar: 'الجيب وجيب التمام.' } },
            { progressId: 103502, stage: 'double', title: { eu: 'Tangentea eta bikoitza', es: 'Tangente y doble', en: 'Tangent and double', ar: 'الظل والضعف' }, description: { eu: 'cos 2α angeluaren hiru formak ere bai.', es: 'También las tres formas de cos 2α.', en: 'The three forms of cos 2α too.', ar: 'والصيغ الثلاث لـ cos 2α أيضًا.' } },
            { progressId: 103503, stage: 'double', title: { eu: 'Erdia eta biderkadurak', es: 'Mitad y productos', en: 'Half and products', ar: 'النصف والجداءات' }, description: { eu: 'Angelu erdia eta baturak biderkadura bihurtuta.', es: 'Ángulo mitad y sumas en productos.', en: 'Half angle and sums into products.', ar: 'نصف الزاوية وتحويل المجاميع إلى جداءات.' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Ehizatu soluzioak', es: 'Caza las soluciones', en: 'Hunt the solutions', ar: 'اصطد الحلول' },
        tagline: { eu: 'Ekuazio bat eta zirkunferentzia bat, 15° bakoitzean puntu batekin: ukitu soluzio guztiak, ez gehiago ez gutxiago.', es: 'Una ecuación y una circunferencia con un punto cada 15°: toca todas las soluciones, ni una más ni una menos.', en: 'An equation and a circle with a point every 15°: tap every solution, not one more, not one fewer.', ar: 'معادلة ودائرة فيها نقطة كل 15°: المس كل الحلول، لا أكثر ولا أقل.' },
        skills: { eu: 'Ekuazio trigonometrikoak', es: 'Ecuaciones trigonométricas', en: 'Trigonometric equations', ar: 'المعادلات المثلثية' },
        levels: [
            { progressId: 103601, stage: 'equations', title: { eu: 'Oinarrizkoak', es: 'Elementales', en: 'Basic', ar: 'الأساسية' }, description: { eu: 'sin x, cos x eta tg x.', es: 'sen x, cos x y tg x.', en: 'sin x, cos x and tan x.', ar: 'sin x وcos x وtan x.' } },
            { progressId: 103602, stage: 'equations', title: { eu: 'Birak ematen dituzte', es: 'Dan vueltas', en: 'They go round', ar: 'تدور' }, description: { eu: '2x eta 3x angeluak.', es: 'Los ángulos 2x y 3x.', en: 'The angles 2x and 3x.', ar: 'الزاويتان 2x و3x.' } },
            { progressId: 103603, stage: 'equations', title: { eu: 'Bigarren mailakoak eta formulak', es: 'De segundo grado y con fórmulas', en: 'Quadratic and with formulas', ar: 'من الدرجة الثانية وبالصيغ' }, description: { eu: 'Aldaketa, faktorea eta formulak.', es: 'Cambio, factor y fórmulas.', en: 'Change, factor and formulas.', ar: 'التغيير والعامل والصيغ.' } }
        ]
    },
    {
        id: 'exact',
        title: { eu: 'Balio zehatza', es: 'Valor exacto', en: 'Exact value', ar: 'القيمة الدقيقة' },
        tagline: { eu: 'Angelu ez-nabarmen baten arrazoia: aukeratu bere balio zehatza lau aukeren artean. Gero, nondik datorren.', es: 'La razón de un ángulo no notable: elige su valor exacto entre cuatro. Después, de dónde sale.', en: 'A ratio of an angle that is not notable: choose its exact value out of four. Then, where it comes from.', ar: 'نسبة زاوية غير شهيرة: اختر قيمتها الدقيقة من أربع. ثم من أين تأتي.' },
        skills: { eu: 'Balio zehatzak eta zeinuak', es: 'Valores exactos y signos', en: 'Exact values and signs', ar: 'القيم الدقيقة والإشارات' },
        levels: [
            { progressId: 103701, stage: 'sums', title: { eu: '15°, 75° eta 105°', es: '15°, 75° y 105°', en: '15°, 75° and 105°', ar: '15° و75° و105°' }, description: { eu: 'Sinua eta kosinua.', es: 'Seno y coseno.', en: 'Sine and cosine.', ar: 'الجيب وجيب التمام.' } },
            { progressId: 103702, stage: 'sums', title: { eu: 'Edozein koadrante', es: 'Cualquier cuadrante', en: 'Any quadrant', ar: 'أي ربع' }, description: { eu: 'Tangentea ere bai.', es: 'También la tangente.', en: 'The tangent too.', ar: 'والظل أيضًا.' } },
            { progressId: 103703, stage: 'double', title: { eu: 'Angelu erdiak', es: 'Ángulos mitad', en: 'Half angles', ar: 'أنصاف الزوايا' }, description: { eu: '22,5° eta 67,5°.', es: '22,5° y 67,5°.', en: '22.5° and 67.5°.', ar: '22.5° و67.5°.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Trigonometriaren detektibea', es: 'Detective de trigonometría', en: 'Trigonometry detective', ar: 'مخبر حساب المثلثات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 103801, stage: 'sums', title: { eu: 'Arrazoiak eta baturak', es: 'Razones y sumas', en: 'Ratios and sums', ar: 'النسب والمجاميع' }, description: { eu: 'Sekantea, batuketaren sinua eta kosinua, tangentea.', es: 'Secante, seno y coseno de la suma, tangente.', en: 'Secant, sine and cosine of a sum, tangent.', ar: 'القاطع وجيب المجموع وجيب تمامه والظل.' } },
            { progressId: 103802, stage: 'double', title: { eu: 'Bikoitza eta erdia', es: 'Doble y mitad', en: 'Double and half', ar: 'الضعف والنصف' }, description: { eu: 'Formak, zeinuak eta erroak.', es: 'Formas, signos y raíces.', en: 'Forms, signs and roots.', ar: 'الصيغ والإشارات والجذور.' } },
            { progressId: 103803, stage: 'functions', title: { eu: 'Ekuazioak eta funtzioak', es: 'Ecuaciones y funciones', en: 'Equations and functions', ar: 'المعادلات والدوال' }, description: { eu: 'Galdutako soluzioak, periodoa eta desfasea.', es: 'Soluciones perdidas, periodo y desfase.', en: 'Lost solutions, period and phase shift.', ar: 'الحلول الضائعة والدور وانزياح الطور.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: angelu bat graduetan eta radianetan, arrazoi berri bat eta haren balioa, edo arrazoi bat eta haren balio zehatza.', es: 'Encuentra las parejas: un ángulo en grados y en radianes, una razón nueva y su valor, o una razón y su valor exacto.', en: 'Find the pairs: an angle in degrees and in radians, a new ratio and its value, or a ratio and its exact value.', ar: 'اعثر على الأزواج: زاوية بالدرجات وبالراديان، ونسبة جديدة وقيمتها، أو نسبة وقيمتها الدقيقة.' },
        skills: { eu: 'Radianak, arrazoiak eta balio zehatzak', es: 'Radianes, razones y valores exactos', en: 'Radians, ratios and exact values', ar: 'الراديان والنسب والقيم الدقيقة' },
        levels: [
            { progressId: 103811, stage: 'ratios', title: { eu: 'Radianak', es: 'Radianes', en: 'Radians', ar: 'الراديان' }, description: { eu: '135° ↔ 3π/4', es: '135° ↔ 3π/4', en: '135° ↔ 3π/4', ar: '135° ↔ 3π/4' } },
            { progressId: 103812, stage: 'ratios', title: { eu: 'Arrazoi berriak', es: 'Razones nuevas', en: 'New ratios', ar: 'النسب الجديدة' }, description: { eu: 'sec 60° ↔ 2', es: 'sec 60° ↔ 2', en: 'sec 60° ↔ 2', ar: 'sec 60° ↔ 2' } },
            { progressId: 103813, stage: 'sums', title: { eu: 'Balio zehatzak', es: 'Valores exactos', en: 'Exact values', ar: 'القيم الدقيقة' }, description: { eu: 'tg 15° ↔ 2 − √3', es: 'tg 15° ↔ 2 − √3', en: 'tan 15° ↔ 2 − √3', ar: 'tan 15° ↔ 2 − √3' } }
        ]
    },
    reused('circle', ['ratios', 'equations', 'ratios'], 103821)
]

export const trigonometryBatx1zGameProgressIds: number[] = levelProgressIds(trigonometryBatx1zGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const trigonometryBatx1zGameSlugs: Record<TrigonometryBatx1zGameId, string> = { race: 'lasterketa', build: 'muntatu', hunt: 'ehizatu', exact: 'zehatza', detective: 'detektibea', memory: 'memoria', circle: 'zirkulua' }

export function trigonometryBatx1zGameModeForPath(pathname: string): TrigonometryBatx1zGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['muntatu', 'monta'].includes(game)) return 'build'
    if (['ehizatu', 'caza'].includes(game)) return 'hunt'
    if (['zehatza', 'exacto'].includes(game)) return 'exact'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['zirkulua', 'circunferencia'].includes(game)) return 'circle'
    return 'hub'
}

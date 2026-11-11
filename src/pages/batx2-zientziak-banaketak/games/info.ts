import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Banaketak (Batxilergoa 2 · Zientziak) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first
   star. Four games of its own (is it binomial?, which area is it?, find
   it in the table and the detective of distributions), the race with a
   circuit per stage and the memory.
   ========================================================================== */

export type DistributionsBatx2GameId = 'race' | 'binomial' | 'area' | 'hunt' | 'detective' | 'memory'

export const DISTRIBUTIONS_BATX2_GAME_RECORDS_KEY = 'matella-banaketak-batx2z-game-records'

export const distributionsBatx2Games: GameInfo<DistributionsBatx2GameId>[] = [
    {
        id: 'race',
        title: { eu: 'Banaketen lasterketa', es: 'Carrera de distribuciones', en: 'Distributions race', ar: 'سباق التوزيعات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 129401, stage: 'review', title: { eu: 'Errepasoa', es: 'Repaso', en: 'Review', ar: 'مراجعة' }, description: { eu: 'Zenbaki konbinatorioak eta batez bestekoa.', es: 'Números combinatorios y media.', en: 'Binomial coefficients and the mean.', ar: 'الأعداد التوافقية والمتوسط.' } },
            { progressId: 129402, stage: 'discrete', title: { eu: 'Aldagai diskretuak', es: 'Variables discretas', en: 'Discrete variables', ar: 'المتغيرات المتقطعة' }, description: { eu: 'Falta den probabilitatea, batez bestekoa eta irabazia.', es: 'La probabilidad que falta, la media y la ganancia.', en: 'The missing probability, the mean and the gain.', ar: 'الاحتمال الناقص والمتوسط والربح.' } },
            { progressId: 129403, stage: 'binomial', title: { eu: 'Binomiala', es: 'Binomial', en: 'Binomial', ar: 'الثنائي' }, description: { eu: 'Probabilitateak, batez bestekoa eta bariantza.', es: 'Probabilidades, media y varianza.', en: 'Probabilities, mean and variance.', ar: 'الاحتمالات والمتوسط والتباين.' } },
            { progressId: 129404, stage: 'normal', title: { eu: 'Normala', es: 'Normal', en: 'Normal', ar: 'الطبيعي' }, description: { eu: 'Taula, simetria eta tipifikazioa.', es: 'La tabla, la simetría y la tipificación.', en: 'The table, symmetry and standardising.', ar: 'الجدول والتماثل والتوحيد المعياري.' } },
            { progressId: 129405, stage: 'approximation', title: { eu: 'Hurbilketa', es: 'Aproximación', en: 'Approximation', ar: 'التقريب' }, description: { eu: 'Normal hurbiltzailea eta puntu erdia.', es: 'La normal que aproxima y el medio punto.', en: 'The approximating normal and the half unit.', ar: 'الطبيعي المقرِّب ونصف الوحدة.' } }
        ]
    },
    {
        id: 'binomial',
        title: { eu: 'Binomiala da?', es: '¿Es binomial?', en: 'Is it binomial?', ar: 'هل هو ثنائي؟' },
        tagline: { eu: 'Egoera bat irakurri eta erabaki: binomiala bada, zein n eta p ditu; ez bada, zergatik.', es: 'Lee una situación y decide: si es binomial, con qué n y p; si no, por qué.', en: 'Read a situation and decide: if it is binomial, with which n and p; if not, why.', ar: 'اقرأ موقفًا وقرّر: إذا كان ثنائيًّا فما n وp، وإن لم يكن فلماذا.' },
        skills: { eu: 'Binomiala ezagutzea eta haren formula', es: 'Reconocer la binomial y su fórmula', en: 'Recognising the binomial and its formula', ar: 'التعرّف على التوزيع الثنائي وصيغته' },
        levels: [
            { progressId: 129501, stage: 'binomial', title: { eu: 'Bai ala ez', es: 'Sí o no', en: 'Yes or no', ar: 'نعم أم لا' }, description: { eu: 'Binomiala ala ez, eta zergatik.', es: 'Binomial o no, y por qué.', en: 'Binomial or not, and why.', ar: 'ثنائي أم لا، ولماذا.' } },
            { progressId: 129502, stage: 'binomial', title: { eu: 'Parametroak', es: 'Parámetros', en: 'Parameters', ar: 'الوسيطان' }, description: { eu: 'Zein n eta zein p.', es: 'Qué n y qué p.', en: 'Which n and which p.', ar: 'أي n وأي p.' } },
            { progressId: 129503, stage: 'binomial', title: { eu: 'Formula', es: 'La fórmula', en: 'The formula', ar: 'الصيغة' }, description: { eu: 'P(X = k) idatzita, ordenekin.', es: 'P(X = k) escrita, con los órdenes.', en: 'P(X = k) written out, with the orders.', ar: 'P(X = k) مكتوبًا مع الترتيبات.' } }
        ]
    },
    {
        id: 'area',
        title: { eu: 'Zein azalera da?', es: '¿Qué área es?', en: 'Which area is it?', ar: 'أي مساحة هي؟' },
        tagline: { eu: 'Probabilitate bat eta hiru kanpai itzaleztatu: aukeratu ondo margotuta dagoena.', es: 'Una probabilidad y tres campanas sombreadas: elige la que está bien pintada.', en: 'A probability and three shaded bells: choose the one painted right.', ar: 'احتمال وثلاثة أجراس مظللة: اختر المظلل صحيحًا.' },
        skills: { eu: 'Azalerak kanpaiaren azpian', es: 'Áreas bajo la campana', en: 'Areas under the bell', ar: 'المساحات تحت الجرس' },
        levels: [
            { progressId: 129601, stage: 'normal', title: { eu: 'Azpitik eta gainetik', es: 'Por debajo y por encima', en: 'Below and above', ar: 'تحت وفوق' }, description: { eu: 'k positiboa.', es: 'k positivo.', en: 'A positive k.', ar: 'k موجب.' } },
            { progressId: 129602, stage: 'normal', title: { eu: 'Negatiboak', es: 'Negativos', en: 'Negatives', ar: 'السوالب' }, description: { eu: 'Simetriarekin.', es: 'Con la simetría.', en: 'With symmetry.', ar: 'بالتماثل.' } },
            { progressId: 129603, stage: 'normal', title: { eu: 'Bi balioren artean', es: 'Entre dos valores', en: 'Between two values', ar: 'بين قيمتين' }, description: { eu: 'Tarteak eta isatsak.', es: 'Intervalos y colas.', en: 'Intervals and tails.', ar: 'المجالات والذيول.' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Bilatu taulan', es: 'Busca en la tabla', en: 'Find it in the table', ar: 'ابحث في الجدول' },
        tagline: { eu: 'Probabilitatea emanda, aurkitu k: kontuz zeinuarekin eta aldearekin.', es: 'Dada una probabilidad, encuentra k: cuidado con el signo y con el lado.', en: 'Given a probability, find k: watch the sign and the side.', ar: 'إذا أُعطي احتمال فجد k: انتبه للإشارة والجهة.' },
        skills: { eu: 'Taula alderantziz', es: 'La tabla al revés', en: 'The table backwards', ar: 'الجدول بالعكس' },
        levels: [
            { progressId: 129701, stage: 'normal', title: { eu: 'Zuzenean', es: 'Directa', en: 'Direct', ar: 'مباشرة' }, description: { eu: '0,5 baino handiagoa azpitik.', es: 'Más de 0,5 por debajo.', en: 'More than 0.5 below.', ar: 'أكثر من 0.5 تحت.' } },
            { progressId: 129702, stage: 'normal', title: { eu: 'Simetriarekin', es: 'Con simetría', en: 'With symmetry', ar: 'بالتماثل' }, description: { eu: 'Gainetik edo 0,5 baino gutxiago.', es: 'Por encima o menos de 0,5.', en: 'Above, or less than 0.5.', ar: 'فوق أو أقل من 0.5.' } },
            { progressId: 129703, stage: 'normal', title: { eu: 'x balioa', es: 'El valor x', en: 'The value x', ar: 'القيمة x' }, description: { eu: 'Tipifikazioa desegin.', es: 'Deshaz la tipificación.', en: 'Undo the standardising.', ar: 'اعكس التوحيد المعياري.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Banaketen detektibea', es: 'Detective de distribuciones', en: 'Distributions detective', ar: 'مخبر التوزيعات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Binomialaren eta normalaren akats tipikoak', es: 'Los errores típicos de la binomial y la normal', en: 'The typical mistakes with the binomial and the normal', ar: 'الأخطاء الشائعة في الثنائي والطبيعي' },
        levels: [
            { progressId: 129751, stage: 'binomial', title: { eu: 'Binomiala', es: 'Binomial', en: 'Binomial', ar: 'الثنائي' }, description: { eu: 'Ordenak, p eta q, eta σ.', es: 'Los órdenes, p y q, y σ.', en: 'The orders, p and q, and σ.', ar: 'الترتيبات وp وq وσ.' } },
            { progressId: 129752, stage: 'normal', title: { eu: 'Normala', es: 'Normal', en: 'Normal', ar: 'الطبيعي' }, description: { eu: 'Taula, zeinua eta tipifikazioa.', es: 'La tabla, el signo y la tipificación.', en: 'The table, the sign and standardising.', ar: 'الجدول والإشارة والتوحيد المعياري.' } },
            { progressId: 129753, stage: 'approximation', title: { eu: 'Hurbilketa', es: 'Aproximación', en: 'Approximation', ar: 'التقريب' }, description: { eu: 'Puntu erdia eta σ.', es: 'El medio punto y σ.', en: 'The half unit and σ.', ar: 'نصف الوحدة وσ.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: binomial bat eta haren batez bestekoa, probabilitate bat eta taulako balioa, edo x bat eta haren z.', es: 'Encuentra las parejas: una binomial y su media, una probabilidad y su valor en la tabla, o una x y su z.', en: 'Find the pairs: a binomial and its mean, a probability and its table value, or an x and its z.', ar: 'جد الأزواج: توزيع ثنائي ومتوسطه، أو احتمال وقيمته في الجدول، أو x وقيمة z لها.' },
        skills: { eu: 'μ = np, taula eta tipifikazioa', es: 'μ = np, la tabla y la tipificación', en: 'μ = np, the table and standardising', ar: 'μ = np والجدول والتوحيد المعياري' },
        levels: [
            { progressId: 129801, stage: 'binomial', title: { eu: 'Batez bestekoa', es: 'La media', en: 'The mean', ar: 'المتوسط' }, description: { eu: 'B(n; p) ↔ μ = np', es: 'B(n; p) ↔ μ = np', en: 'B(n; p) ↔ μ = np', ar: 'B(n; p) ↔ μ = np' } },
            { progressId: 129802, stage: 'normal', title: { eu: 'Taula', es: 'La tabla', en: 'The table', ar: 'الجدول' }, description: { eu: 'P(Z > k) ↔ 1 − taula', es: 'P(Z > k) ↔ 1 − tabla', en: 'P(Z > k) ↔ 1 − table', ar: 'P(Z > k) ↔ 1 − الجدول' } },
            { progressId: 129803, stage: 'normal', title: { eu: 'Tipifikatu', es: 'Tipificar', en: 'Standardise', ar: 'التوحيد المعياري' }, description: { eu: 'N(μ; σ) eta x ↔ z', es: 'N(μ; σ) y x ↔ z', en: 'N(μ; σ) and x ↔ z', ar: 'N(μ; σ) وx ↔ z' } }
        ]
    }
]

export const distributionsBatx2GameProgressIds: number[] = levelProgressIds(distributionsBatx2Games)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const distributionsBatx2GameSlugs: Record<DistributionsBatx2GameId, string> = { race: 'lasterketa', binomial: 'binomiala', area: 'azalera', hunt: 'taula', detective: 'detektibea', memory: 'memoria' }

export function distributionsBatx2GameModeForPath(pathname: string): DistributionsBatx2GameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['binomiala', 'es-binomial'].includes(game)) return 'binomial'
    if (['azalera', 'que-area'].includes(game)) return 'area'
    if (['taula', 'tabla'].includes(game)) return 'hunt'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

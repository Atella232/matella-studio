import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Normala (Batxilergoa 1 · Gizarte Zientziak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star. Four games of its own (which percentage?, is it a density?,
   the cut-off mark and the detective of this unit), «which area is it?»
   and «find it in the table» borrowed from 2.º Ciencias with ids of this
   unit, the race with a circuit per stage and the memory.
   ========================================================================== */

export type NormalBatx1gGameId = 'race' | 'percent' | 'density' | 'cutoff' | 'area' | 'hunt' | 'detective' | 'memory'

export const NORMAL_BATX1G_GAME_RECORDS_KEY = 'matella-normala-batx1g-game-records'

export const normalBatx1gGames: GameInfo<NormalBatx1gGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Normalaren lasterketa', es: 'Carrera de la normal', en: 'The normal race', ar: 'سباق التوزيع الطبيعي' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 140401, stage: 'review', title: { eu: 'Errepasoa', es: 'Repaso', en: 'Review', ar: 'مراجعة' }, description: { eu: 'Barren altuera eta puntuazio tipikoa.', es: 'Altura de las barras y puntuación típica.', en: 'Bar heights and standard scores.', ar: 'ارتفاع الأعمدة والدرجة المعيارية.' } },
            { progressId: 140402, stage: 'continuous', title: { eu: 'Dentsitatea', es: 'Densidad', en: 'Density', ar: 'الكثافة' }, description: { eu: 'k eta azalerak.', es: 'k y las áreas.', en: 'k and the areas.', ar: 'k والمساحات.' } },
            { progressId: 140403, stage: 'normal', title: { eu: 'Normala', es: 'Normal', en: 'Normal', ar: 'الطبيعي' }, description: { eu: 'Taula, simetria eta tipifikazioa.', es: 'La tabla, la simetría y la tipificación.', en: 'The table, symmetry and standardising.', ar: 'الجدول والتماثل والتوحيد.' } },
            { progressId: 140404, stage: 'approximation', title: { eu: 'Hurbilketa', es: 'Aproximación', en: 'Approximation', ar: 'التقريب' }, description: { eu: 'σ eta puntu erdia.', es: 'σ y el medio punto.', en: 'σ and the half unit.', ar: 'σ ونصف الوحدة.' } },
            { progressId: 140405, stage: 'fit', title: { eu: 'Doikuntza', es: 'Ajuste', en: 'Fit', ar: 'المطابقة' }, description: { eu: 'Klase-markak, itxaronak eta ehunekoa.', es: 'Marcas, esperados y porcentaje.', en: 'Marks, expected values and percentage.', ar: 'المراكز والمتوقعة والنسبة.' } }
        ]
    },
    {
        id: 'percent',
        title: { eu: 'Zer ehuneko?', es: '¿Qué porcentaje?', en: 'Which percentage?', ar: 'أي نسبة؟' },
        tagline: { eu: 'Normal bat eta tarte bat: aukeratu ehunekoa, taularik gabe, 68–95–99,7 arauarekin.', es: 'Una normal y un intervalo: elige el porcentaje sin tabla, con la regla del 68–95–99,7.', en: 'A normal and an interval: choose the percentage without a table, with the 68–95–99.7 rule.', ar: 'توزيع طبيعي ومجال: اختر النسبة دون جدول بقاعدة 68–95–99.7.' },
        skills: { eu: '68–95–99,7 araua eta simetria', es: 'La regla del 68–95–99,7 y la simetría', en: 'The 68–95–99.7 rule and symmetry', ar: 'قاعدة 68–95–99.7 والتماثل' },
        levels: [
            { progressId: 140501, stage: 'normal', title: { eu: 'Erdian', es: 'En el centro', en: 'In the middle', ar: 'في الوسط' }, description: { eu: 'μ ± σ, μ ± 2σ, μ ± 3σ.', es: 'μ ± σ, μ ± 2σ, μ ± 3σ.', en: 'μ ± σ, μ ± 2σ, μ ± 3σ.', ar: 'μ ± σ وμ ± 2σ وμ ± 3σ.' } },
            { progressId: 140502, stage: 'normal', title: { eu: 'Erdiak eta isatsak', es: 'Mitades y colas', en: 'Halves and tails', ar: 'الأنصاف والذيول' }, description: { eu: 'Alde bakarra.', es: 'Un solo lado.', en: 'One side only.', ar: 'جهة واحدة.' } },
            { progressId: 140503, stage: 'normal', title: { eu: 'Nahastuta', es: 'Combinados', en: 'Mixed', ar: 'مختلطة' }, description: { eu: 'Bi zati batuta.', es: 'Dos trozos sumados.', en: 'Two pieces added.', ar: 'قطعتان مجموعتان.' } }
        ]
    },
    {
        id: 'density',
        title: { eu: 'Dentsitatea da?', es: '¿Es una densidad?', en: 'Is it a density?', ar: 'هل هي كثافة؟' },
        tagline: { eu: 'Laukizuzenak eta triangeluak: dentsitatea den, zein den $k$ eta zenbat den azalera bat.', es: 'Rectángulos y triángulos: si es una densidad, cuánto vale $k$ y cuánto un área.', en: 'Rectangles and triangles: whether it is a density, what $k$ is and how big an area is.', ar: 'مستطيلات ومثلثات: هل هي كثافة، وكم $k$، وكم مساحة ما.' },
        skills: { eu: 'Zati zuzeneko dentsitateak', es: 'Densidades de trozos rectos', en: 'Straight-piece densities', ar: 'كثافات من قطع مستقيمة' },
        levels: [
            { progressId: 140551, stage: 'continuous', title: { eu: 'Bai ala ez', es: 'Sí o no', en: 'Yes or no', ar: 'نعم أم لا' }, description: { eu: 'Azalera 1 eta ez negatiboa.', es: 'Área 1 y nada negativo.', en: 'Area 1 and nothing negative.', ar: 'مساحة 1 ولا شيء سالب.' } },
            { progressId: 140552, stage: 'continuous', title: { eu: 'k aurkitu', es: 'Halla k', en: 'Find k', ar: 'أوجد k' }, description: { eu: 'Azalera osoa 1.', es: 'Área total 1.', en: 'Total area 1.', ar: 'المساحة الكلية 1.' } },
            { progressId: 140553, stage: 'continuous', title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمال' }, description: { eu: 'Tarte baten azalera.', es: 'El área de un intervalo.', en: 'The area of an interval.', ar: 'مساحة مجال.' } }
        ]
    },
    {
        id: 'cutoff',
        title: { eu: 'Ebaketa-nota', es: 'Nota de corte', en: 'Cut-off mark', ar: 'العلامة الدنيا' },
        tagline: { eu: 'Plazak, bekak eta pertzentilak: ehunekotik $k$ zenbakira, eta $k$ zenbakitik balio errealera.', es: 'Plazas, becas y percentiles: del porcentaje a $k$, y de $k$ al valor real.', en: 'Places, grants and percentiles: from the percentage to $k$, and from $k$ to the real value.', ar: 'مقاعد ومنح ومئينات: من النسبة إلى $k$، ومن $k$ إلى القيمة الحقيقية.' },
        skills: { eu: 'Taula alderantziz', es: 'La tabla al revés', en: 'The table backwards', ar: 'الجدول بالعكس' },
        levels: [
            { progressId: 140601, stage: 'normal', title: { eu: 'k zenbakia', es: 'El número k', en: 'The number k', ar: 'العدد k' }, description: { eu: 'Gainetik edo azpitik.', es: 'Por encima o por debajo.', en: 'Above or below.', ar: 'فوق أو تحت.' } },
            { progressId: 140602, stage: 'normal', title: { eu: 'Balioa', es: 'El valor', en: 'The value', ar: 'القيمة' }, description: { eu: 'x = μ + kσ.', es: 'x = μ + kσ.', en: 'x = μ + kσ.', ar: 'x = μ + kσ.' } },
            { progressId: 140603, stage: 'normal', title: { eu: 'Egoerak', es: 'Situaciones', en: 'Situations', ar: 'مواقف' }, description: { eu: 'Plazak, bekak eta kontrolak.', es: 'Plazas, becas y controles.', en: 'Places, grants and checks.', ar: 'مقاعد ومنح وفحوص.' } }
        ]
    },
    {
        id: 'area',
        title: { eu: 'Zein azalera da?', es: '¿Qué área es?', en: 'Which area is it?', ar: 'أي مساحة هي؟' },
        tagline: { eu: 'Probabilitate bat eta hiru kanpai itzaleztatu: aukeratu ondo margotuta dagoena.', es: 'Una probabilidad y tres campanas sombreadas: elige la que está bien pintada.', en: 'A probability and three shaded bells: choose the one painted right.', ar: 'احتمال وثلاثة أجراس مظللة: اختر المظلل صحيحًا.' },
        skills: { eu: 'Azalerak kanpaiaren azpian', es: 'Áreas bajo la campana', en: 'Areas under the bell', ar: 'المساحات تحت الجرس' },
        levels: [
            { progressId: 140651, stage: 'normal', title: { eu: 'Azpitik eta gainetik', es: 'Por debajo y por encima', en: 'Below and above', ar: 'تحت وفوق' }, description: { eu: 'k positiboa.', es: 'k positivo.', en: 'A positive k.', ar: 'k موجب.' } },
            { progressId: 140652, stage: 'normal', title: { eu: 'Negatiboak', es: 'Negativos', en: 'Negatives', ar: 'السوالب' }, description: { eu: 'Simetriarekin.', es: 'Con la simetría.', en: 'With symmetry.', ar: 'بالتماثل.' } },
            { progressId: 140653, stage: 'normal', title: { eu: 'Bi balioren artean', es: 'Entre dos valores', en: 'Between two values', ar: 'بين قيمتين' }, description: { eu: 'Tarteak eta isatsak.', es: 'Intervalos y colas.', en: 'Intervals and tails.', ar: 'المجالات والذيول.' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Bilatu taulan', es: 'Busca en la tabla', en: 'Find it in the table', ar: 'ابحث في الجدول' },
        tagline: { eu: 'Probabilitatea emanda, aurkitu k: kontuz zeinuarekin eta aldearekin.', es: 'Dada una probabilidad, encuentra k: cuidado con el signo y con el lado.', en: 'Given a probability, find k: watch the sign and the side.', ar: 'إذا أُعطي احتمال فجد k: انتبه للإشارة والجهة.' },
        skills: { eu: 'Taula alderantziz', es: 'La tabla al revés', en: 'The table backwards', ar: 'الجدول بالعكس' },
        levels: [
            { progressId: 140671, stage: 'normal', title: { eu: 'Zuzenean', es: 'Directa', en: 'Direct', ar: 'مباشرة' }, description: { eu: '0,5 baino handiagoa azpitik.', es: 'Más de 0,5 por debajo.', en: 'More than 0.5 below.', ar: 'أكثر من 0.5 تحت.' } },
            { progressId: 140672, stage: 'normal', title: { eu: 'Simetriarekin', es: 'Con simetría', en: 'With symmetry', ar: 'بالتماثل' }, description: { eu: 'Gainetik edo 0,5 baino gutxiago.', es: 'Por encima o menos de 0,5.', en: 'Above, or less than 0.5.', ar: 'فوق أو أقل من 0.5.' } },
            { progressId: 140673, stage: 'normal', title: { eu: 'x balioa', es: 'El valor x', en: 'The value x', ar: 'القيمة x' }, description: { eu: 'Tipifikazioa desegin.', es: 'Deshaz la tipificación.', en: 'Undo the standardising.', ar: 'اعكس التوحيد المعياري.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Normalaren detektibea', es: 'Detective de la normal', en: 'The normal detective', ar: 'مخبر التوزيع الطبيعي' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Taularen, tipifikazioaren eta doikuntzaren akats tipikoak', es: 'Los errores típicos de la tabla, la tipificación y el ajuste', en: 'The typical mistakes with the table, standardising and the fit', ar: 'الأخطاء الشائعة في الجدول والتوحيد والمطابقة' },
        levels: [
            { progressId: 140701, stage: 'normal', title: { eu: 'Taula', es: 'La tabla', en: 'The table', ar: 'الجدول' }, description: { eu: 'Gainetik, negatiboak eta azalerak.', es: 'Por encima, negativos y áreas.', en: 'Above, negatives and areas.', ar: 'فوق والسوالب والمساحات.' } },
            { progressId: 140702, stage: 'approximation', title: { eu: 'Tipifikatu eta hurbildu', es: 'Tipificar y aproximar', en: 'Standardise and approximate', ar: 'التوحيد والتقريب' }, description: { eu: 'σ, alderantzizkoa eta puntu erdia.', es: 'σ, la inversa y el medio punto.', en: 'σ, the inverse and the half unit.', ar: 'σ والعكس ونصف الوحدة.' } },
            { progressId: 140703, stage: 'fit', title: { eu: 'Doikuntza', es: 'Ajuste', en: 'Fit', ar: 'المطابقة' }, description: { eu: 'Markak, muturrak eta ehunekoa.', es: 'Marcas, extremos y porcentaje.', en: 'Marks, ends and percentage.', ar: 'المراكز والأطراف والنسبة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: tarte bat eta haren ehunekoa, probabilitate bat eta taulako balioa, edo x bat eta haren z.', es: 'Encuentra las parejas: un intervalo y su porcentaje, una probabilidad y su valor en la tabla, o una x y su z.', en: 'Find the pairs: an interval and its percentage, a probability and its table value, or an x and its z.', ar: 'جد الأزواج: مجال ونسبته، أو احتمال وقيمته في الجدول، أو x وقيمة z لها.' },
        skills: { eu: 'Araua, taula eta tipifikazioa', es: 'La regla, la tabla y la tipificación', en: 'The rule, the table and standardising', ar: 'القاعدة والجدول والتوحيد' },
        levels: [
            { progressId: 140801, stage: 'normal', title: { eu: 'Araua', es: 'La regla', en: 'The rule', ar: 'القاعدة' }, description: { eu: 'μ ± kσ ↔ ehunekoa', es: 'μ ± kσ ↔ porcentaje', en: 'μ ± kσ ↔ percentage', ar: 'μ ± kσ ↔ النسبة' } },
            { progressId: 140802, stage: 'normal', title: { eu: 'Taula', es: 'La tabla', en: 'The table', ar: 'الجدول' }, description: { eu: 'P(Z > k) ↔ 1 − taula', es: 'P(Z > k) ↔ 1 − tabla', en: 'P(Z > k) ↔ 1 − table', ar: 'P(Z > k) ↔ 1 − الجدول' } },
            { progressId: 140803, stage: 'normal', title: { eu: 'Tipifikatu', es: 'Tipificar', en: 'Standardise', ar: 'التوحيد المعياري' }, description: { eu: 'N(μ; σ) eta x ↔ z', es: 'N(μ; σ) y x ↔ z', en: 'N(μ; σ) and x ↔ z', ar: 'N(μ; σ) وx ↔ z' } }
        ]
    }
]

export const normalBatx1gGameProgressIds: number[] = levelProgressIds(normalBatx1gGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const normalBatx1gGameSlugs: Record<NormalBatx1gGameId, string> = { race: 'lasterketa', percent: 'ehunekoa', density: 'dentsitatea', cutoff: 'ebaketa', area: 'azalera', hunt: 'taula', detective: 'detektibea', memory: 'memoria' }

export function normalBatx1gGameModeForPath(pathname: string): NormalBatx1gGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['ehunekoa', 'porcentaje'].includes(game)) return 'percent'
    if (['dentsitatea', 'densidad'].includes(game)) return 'density'
    if (['ebaketa', 'nota-de-corte'].includes(game)) return 'cutoff'
    if (['azalera', 'que-area'].includes(game)) return 'area'
    if (['taula', 'tabla'].includes(game)) return 'hunt'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

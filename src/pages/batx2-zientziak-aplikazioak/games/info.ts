import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { bachApplicationsGames } from '../../batx1-zientziak-aplikazioak/games/info.ts'
import type { Bach2ApplicationsStageId } from '../lessons.tsx'

/* ==========================================================================
   Aplikazioak (Batxilergoa 2 · Zientziak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star. Three games of its own (does L'Hôpital apply?, does Rolle
   hold?, set up and optimise) and the detective, the race and the memory,
   and two games of Aplikazioak 1.º for the review (hunt the extrema and
   ∪ or ∩?), with their texts and levels but the stages and progress ids
   of this unit.
   ========================================================================== */

export type Bach2ApplicationsGameId = 'race' | 'hopital' | 'rolle' | 'optimize' | 'detective' | 'memory' | 'extrema' | 'shape'

export const BACH2_APPLICATIONS_GAME_RECORDS_KEY = 'matella-aplikazioak-batx2z-game-records'

/** An Aplikazioak 1.º game with its texts and levels, the stages and progress ids of this unit */
function reused(id: 'extrema' | 'shape', stages: Bach2ApplicationsStageId[], firstId: number): GameInfo<Bach2ApplicationsGameId> {
    const source = bachApplicationsGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const bach2ApplicationsGames: GameInfo<Bach2ApplicationsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Aplikazioen lasterketa', es: 'Carrera de aplicaciones', en: 'Applications race', ar: 'سباق التطبيقات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 124401, stage: 'review', title: { eu: 'Errepasoa', es: 'Repaso', en: 'Review', ar: 'مراجعة' }, description: { eu: 'Maximoa, inflexioa eta maximo absolutua.', es: 'Máximo, inflexión y máximo absoluto.', en: 'Maximum, inflection and absolute maximum.', ar: 'القيمة العظمى والانعطاف والعظمى المطلقة.' } },
            { progressId: 124402, stage: 'rolle', title: { eu: 'Rolle', es: 'Rolle', en: 'Rolle', ar: 'رول' }, description: { eu: 'Rolleren c, batez besteko balioarena eta erroak.', es: 'El c de Rolle, el del valor medio y las raíces.', en: 'The c of Rolle, that of the mean value and the roots.', ar: 'قيمة c لرول وللقيمة المتوسطة والجذور.' } },
            { progressId: 124403, stage: 'hopital', title: { eu: 'L\'Hôpital', es: 'L\'Hôpital', en: 'L\'Hôpital', ar: 'لوبيتال' }, description: { eu: 'Sinua, kosinua eta berreturak.', es: 'Seno, coseno y potencias.', en: 'Sine, cosine and powers.', ar: 'الجيب وجيب التمام والقوى.' } },
            { progressId: 124404, stage: 'conditions', title: { eu: 'Koefizienteak', es: 'Coeficientes', en: 'Coefficients', ar: 'المعاملات' }, description: { eu: 'Minimoa, inflexioa eta zuzen ukitzailea.', es: 'Mínimo, inflexión y tangente.', en: 'Minimum, inflection and tangent.', ar: 'القيمة الصغرى والانعطاف والمماس.' } },
            { progressId: 124405, stage: 'optimization', title: { eu: 'Optimizazioa', es: 'Optimización', en: 'Optimisation', ar: 'الاستمثال' }, description: { eu: 'Biderkadura, azalera eta batura.', es: 'Producto, área y suma.', en: 'Product, area and sum.', ar: 'الجداء والمساحة والمجموع.' } }
        ]
    },
    {
        id: 'hopital',
        title: { eu: 'L\'Hôpitalek balio du?', es: '¿Vale L\'Hôpital?', en: 'Does L\'Hôpital apply?', ar: 'هل تصح قاعدة لوبيتال؟' },
        tagline: { eu: 'Limite bat: L\'Hôpital orain aplikatzen da, lehenago eraldatu behar da, ala ez dago indeterminaziorik?', es: 'Un límite: ¿L\'Hôpital se aplica ya, hay que transformarlo antes o no hay indeterminación?', en: 'A limit: does L\'Hôpital apply now, must it be transformed first, or is there no indeterminate form?', ar: 'نهاية: هل تُطبَّق قاعدة لوبيتال الآن، أم يجب تحويلها أولًا، أم لا يوجد عدم تعيين؟' },
        skills: { eu: 'Lehenik ordezkatu, gero erabaki', es: 'Primero sustituir, después decidir', en: 'First substitute, then decide', ar: 'عوّض أولًا ثم قرّر' },
        levels: [
            { progressId: 124501, stage: 'hopital', title: { eu: 'Puntu batean', es: 'En un punto', en: 'At a point', ar: 'عند نقطة' }, description: { eu: 'x → a', es: 'x → a', en: 'x → a', ar: 'x → a' } },
            { progressId: 124502, stage: 'hopital', title: { eu: 'Infinituan', es: 'En el infinito', en: 'At infinity', ar: 'عند اللانهاية' }, description: { eu: 'x → +∞', es: 'x → +∞', en: 'x → +∞', ar: 'x → +∞' } },
            { progressId: 124503, stage: 'hopital', title: { eu: 'Denak nahasian', es: 'Todo mezclado', en: 'All mixed', ar: 'الكل مختلط' }, description: { eu: 'Zatidurak, biderkadurak eta berreturak.', es: 'Cocientes, productos y potencias.', en: 'Quotients, products and powers.', ar: 'خوارج قسمة وجداءات وقوى.' } }
        ]
    },
    {
        id: 'rolle',
        title: { eu: 'Rolle betetzen du?', es: '¿Cumple Rolle?', en: 'Does Rolle hold?', ar: 'هل تتحقق مبرهنة رول؟' },
        tagline: { eu: 'Funtzio bat eta tarte bat: ba al dago c punturik, ala zein hipotesi ez da betetzen?', es: 'Una función y un intervalo: ¿hay un c, o qué hipótesis falla?', en: 'A function and an interval: is there a c, or which hypothesis fails?', ar: 'دالة وفترة: هل توجد c، أم أي فرضية تسقط؟' },
        skills: { eu: 'Jarraitutasuna, deribagarritasuna eta altuera bera', es: 'Continuidad, derivabilidad y misma altura', en: 'Continuity, differentiability and the same height', ar: 'الاتصال والاشتقاق والارتفاع نفسه' },
        levels: [
            { progressId: 124601, stage: 'rolle', title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'الحدوديات' }, description: { eu: 'Altuerak eta lehen puntak.', es: 'Alturas y los primeros picos.', en: 'Heights and the first corners.', ar: 'الارتفاعات وأولى الزوايا.' } },
            { progressId: 124602, stage: 'rolle', title: { eu: 'Puntak eta jauziak', es: 'Picos y saltos', en: 'Corners and jumps', ar: 'الزوايا والقفزات' }, description: { eu: '|x − k| eta zatiak.', es: '|x − k| y trozos.', en: '|x − k| and pieces.', ar: '|x − k| والأجزاء.' } },
            { progressId: 124603, stage: 'rolle', title: { eu: 'Denak', es: 'Todo', en: 'Everything', ar: 'الكل' }, description: { eu: 'Asintotak eta erro kubikoak ere bai.', es: 'También asíntotas y raíces cúbicas.', en: 'Asymptotes and cube roots too.', ar: 'والمقاربات والجذور التكعيبية أيضًا.' } }
        ]
    },
    {
        id: 'optimize',
        title: { eu: 'Planteatu eta optimizatu', es: 'Plantea y optimiza', en: 'Set up and optimise', ar: 'صُغ واستمثل' },
        tagline: { eu: 'Problema labur bat: lehenik aukeratu ondo planteatutako funtzioa, gero haren balio optimoa.', es: 'Un problema corto: primero elige la función bien planteada, después su valor óptimo.', en: 'A short problem: first choose the function that is set up right, then its optimum value.', ar: 'مسألة قصيرة: اختر أولًا الدالة المصوغة صحيحًا، ثم قيمتها المثلى.' },
        skills: { eu: 'Baldintza erabili eta deribatua 0 egin', es: 'Usar la condición y anular la derivada', en: 'Use the condition and set the derivative to 0', ar: 'استعمال الشرط ومساواة المشتقة بالصفر' },
        levels: [
            { progressId: 124651, stage: 'optimization', title: { eu: 'Zenbakiak', es: 'Números', en: 'Numbers', ar: 'الأعداد' }, description: { eu: 'Baturak eta biderkadurak.', es: 'Sumas y productos.', en: 'Sums and products.', ar: 'مجاميع وجداءات.' } },
            { progressId: 124652, stage: 'optimization', title: { eu: 'Irudiak', es: 'Figuras', en: 'Shapes', ar: 'الأشكال' }, description: { eu: 'Laukizuzenak, hesiak eta kutxak.', es: 'Rectángulos, vallas y cajas.', en: 'Rectangles, fences and boxes.', ar: 'مستطيلات وأسيجة وعلب.' } },
            { progressId: 124653, stage: 'optimization', title: { eu: 'Distantziak eta kostuak', es: 'Distancias y costes', en: 'Distances and costs', ar: 'المسافات والتكاليف' }, description: { eu: 'Kurbak, batez besteko kostua eta mozkina.', es: 'Curvas, coste medio y beneficio.', en: 'Curves, average cost and profit.', ar: 'منحنيات وتكلفة متوسطة وربح.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Aplikazioen detektibea', es: 'Detective de aplicaciones', en: 'Applications detective', ar: 'مخبر التطبيقات' },
        tagline: { eu: 'Ebatzitako ariketa batean lerro bat dago gaizki: aurkitu eta esan zer akats den.', es: 'En un ejercicio resuelto hay una línea mal: encuéntrala y di qué error es.', en: 'In a solved exercise one line is wrong: find it and name the mistake.', ar: 'في تمرين محلول سطر خاطئ: اعثر عليه وسمِّ الخطأ.' },
        skills: { eu: '2. mailako akats ohikoak', es: 'Los errores típicos de 2.º', en: 'The typical mistakes of 2nd year', ar: 'الأخطاء الشائعة في السنة الثانية' },
        levels: [
            { progressId: 124701, stage: 'rolle', title: { eu: 'Errepasoa eta teoremak', es: 'Repaso y teoremas', en: 'Review and theorems', ar: 'مراجعة ومبرهنات' }, description: { eu: 'f′ eta f″ zeinuak, muturrak eta f(c).', es: 'Signos de f′ y f″, bordes y f(c).', en: 'Signs of f′ and f″, ends and f(c).', ar: 'إشارتا f′ وf″، والطرفان، وf(c).' } },
            { progressId: 124702, stage: 'hopital', title: { eu: 'L\'Hôpital', es: 'L\'Hôpital', en: 'L\'Hôpital', ar: 'لوبيتال' }, description: { eu: 'Indeterminaziorik gabe, zatidura, ∞·0 eta ln L.', es: 'Sin indeterminación, cociente, ∞·0 y ln L.', en: 'No indeterminate form, the quotient, ∞·0 and ln L.', ar: 'دون عدم تعيين، وخارج القسمة، و∞·0، وln L.' } },
            { progressId: 124703, stage: 'optimization', title: { eu: 'Baldintzak eta optimizazioa', es: 'Condiciones y optimización', en: 'Conditions and optimisation', ar: 'الشروط والاستمثال' }, description: { eu: 'f = 0, f′ = 0, x ala balioa eta erroa.', es: 'f = 0, f′ = 0, x o valor y la raíz.', en: 'f = 0, f′ = 0, x or value and the root.', ar: 'f = 0 وf′ = 0 وx أم القيمة والجذر.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Aplikazioen memoria', es: 'Memoria de aplicaciones', en: 'Applications memory', ar: 'ذاكرة التطبيقات' },
        tagline: { eu: 'Egin bikoteak: limite bat eta bere balioa, funtzio bat eta bere muturra, problema bat eta bere optimoa.', es: 'Haz parejas: un límite y su valor, una función y su extremo, un problema y su óptimo.', en: 'Make pairs: a limit and its value, a function and its extremum, a problem and its optimum.', ar: 'كوّن أزواجًا: نهاية وقيمتها، دالة وقيمتها القصوى، مسألة وقيمتها المثلى.' },
        skills: { eu: 'L\'Hôpital, muturrak eta optimoak', es: 'L\'Hôpital, extremos y óptimos', en: 'L\'Hôpital, extrema and optima', ar: 'لوبيتال والقيم القصوى والمثلى' },
        levels: [
            { progressId: 124801, stage: 'hopital', title: { eu: 'Limiteak', es: 'Límites', en: 'Limits', ar: 'النهايات' }, description: { eu: 'ln(1 + 2x)/x ↔ 2', es: 'ln(1 + 2x)/x ↔ 2', en: 'ln(1 + 2x)/x ↔ 2', ar: 'ln(1 + 2x)/x ↔ 2' } },
            { progressId: 124802, stage: 'review', title: { eu: 'Muturrak', es: 'Extremos', en: 'Extrema', ar: 'القيم القصوى' }, description: { eu: 'x·e⁻ˣ ↔ x = 1', es: 'x·e⁻ˣ ↔ x = 1', en: 'x·e⁻ˣ ↔ x = 1', ar: 'x·e⁻ˣ ↔ x = 1' } },
            { progressId: 124803, stage: 'optimization', title: { eu: 'Optimoak', es: 'Óptimos', en: 'Optima', ar: 'القيم المثلى' }, description: { eu: 'max x(12 − x) ↔ 36', es: 'max x(12 − x) ↔ 36', en: 'max x(12 − x) ↔ 36', ar: 'max x(12 − x) ↔ 36' } }
        ]
    },
    reused('extrema', ['review', 'review', 'review'], 124811),
    reused('shape', ['review', 'review', 'review'], 124821)
]

export const bach2ApplicationsGameProgressIds: number[] = levelProgressIds(bach2ApplicationsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bach2ApplicationsGameSlugs: Record<Bach2ApplicationsGameId, string> = { race: 'lasterketa', hopital: 'lhopital', rolle: 'rolle', optimize: 'optimizatu', detective: 'detektibea', memory: 'memoria', extrema: 'muturrak', shape: 'kurbadura' }

export function bach2ApplicationsGameModeForPath(pathname: string): Bach2ApplicationsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['lhopital', 'hopital'].includes(game)) return 'hopital'
    if (['rolle', 'cumple-rolle'].includes(game)) return 'rolle'
    if (['optimizatu', 'optimiza'].includes(game)) return 'optimize'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['muturrak', 'extremos'].includes(game)) return 'extrema'
    if (['kurbadura', 'curvatura'].includes(game)) return 'shape'
    return 'hub'
}

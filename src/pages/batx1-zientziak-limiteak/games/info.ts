import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { bachSequencesGames } from '../../batx1-zientziak-segidak/games/info.ts'
import type { BachLimitsStageId } from '../lessons.tsx'

/* ==========================================================================
   Limiteak eta jarraitutasuna (Batxilergoa 1 · Zientziak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star. Four games of its own (indeterminate or not?, hunt
   the asymptote, which discontinuity? and the detective), the race and
   the memory, and two games of Segidak (where does it go? and catch the
   band), with their texts and levels but the stages and progress ids of
   this unit.
   ========================================================================== */

export type BachLimitsGameId = 'race' | 'forms' | 'asymptote' | 'discontinuity' | 'detective' | 'memory' | 'toward' | 'band'

export const BACH_LIMITS_GAME_RECORDS_KEY = 'matella-limiteak-batx1z-game-records'

/** A Segidak game with its texts and levels, the stages and progress ids of this unit */
function reused(source: GameInfo<string>, id: BachLimitsGameId, stages: BachLimitsStageId[], firstId: number): GameInfo<BachLimitsGameId> {
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const bachLimitsGames: GameInfo<BachLimitsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Limiteen lasterketa', es: 'Carrera de límites', en: 'Limits race', ar: 'سباق النهايات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 109401, stage: 'point', title: { eu: 'Limitea puntu batean', es: 'Límite en un punto', en: 'The limit at a point', ar: 'النهاية عند نقطة' }, description: { eu: 'Alboko limiteak eta asintota bertikalak.', es: 'Límites laterales y asíntotas verticales.', en: 'One-sided limits and vertical asymptotes.', ar: 'النهايتان الجانبيتان والمقاربات الرأسية.' } },
            { progressId: 109402, stage: 'calculus', title: { eu: 'Kalkulatu', es: 'Calcula', en: 'Work it out', ar: 'احسب' }, description: { eu: 'Faktorizatu, konjokatua eta ordezkatu.', es: 'Factoriza, conjugado y sustituye.', en: 'Factorise, the conjugate and substitute.', ar: 'التحليل والمرافق والتعويض.' } },
            { progressId: 109403, stage: 'infinity', title: { eu: 'Infinituan', es: 'En el infinito', en: 'At infinity', ar: 'عند اللانهاية' }, description: { eu: 'Mailak, ∞ − ∞ eta e zenbakia.', es: 'Grados, ∞ − ∞ y el número e.', en: 'Degrees, ∞ − ∞ and the number e.', ar: 'الدرجات و∞ − ∞ والعدد e.' } },
            { progressId: 109404, stage: 'asymptotes', title: { eu: 'Asintotak', es: 'Asíntotas', en: 'Asymptotes', ar: 'المقاربات' }, description: { eu: 'Horizontalak eta zeiharrak.', es: 'Horizontales y oblicuas.', en: 'Horizontal and oblique.', ar: 'الأفقية والمائلة.' } },
            { progressId: 109405, stage: 'continuity', title: { eu: 'Jarraitutasuna', es: 'Continuidad', en: 'Continuity', ar: 'الاتصال' }, description: { eu: 'Lotu zatiak, bete zuloa eta Bolzano.', es: 'Une los trozos, llena el agujero y Bolzano.', en: 'Join the pieces, fill the hole and Bolzano.', ar: 'صِل الأجزاء واملأ الثقب وبولتسانو.' } }
        ]
    },
    {
        id: 'forms',
        title: { eu: 'Indeterminazioa ala ez?', es: '¿Indeterminación o no?', en: 'Indeterminate or not?', ar: 'عدم تعيين أم لا؟' },
        tagline: { eu: 'Limite bat: ordezkatu buruz eta esan zer ateratzen den, indeterminazio bat, 0, infinitua edo beste zenbaki bat.', es: 'Un límite: sustituye de cabeza y di qué sale, una indeterminación, 0, infinito u otro número.', en: 'A limit: substitute in your head and say what you get, an indeterminate form, 0, infinity or another number.', ar: 'نهاية: عوّض ذهنيًّا وقل ماذا تجد: حالة عدم تعيين أو 0 أو لانهاية أو عددًا آخر.' },
        skills: { eu: 'Badakigunak eta indeterminazioak', es: 'Lo que se sabe y las indeterminaciones', en: 'What is known and the indeterminate forms', ar: 'المعلوم وحالات عدم التعيين' },
        levels: [
            { progressId: 109501, stage: 'calculus', title: { eu: 'Puntu batean', es: 'En un punto', en: 'At a point', ar: 'عند نقطة' }, description: { eu: '0/0, k/0, 0/k eta zenbaki bat.', es: '0/0, k/0, 0/k y un número.', en: '0/0, k/0, 0/k and a number.', ar: '0/0 وk/0 و0/k وعدد.' } },
            { progressId: 109502, stage: 'infinity', title: { eu: 'Infinituan', es: 'En el infinito', en: 'At infinity', ar: 'عند اللانهاية' }, description: { eu: '∞/∞, ∞ − ∞, 0·∞ eta k/∞.', es: '∞/∞, ∞ − ∞, 0·∞ y k/∞.', en: '∞/∞, ∞ − ∞, 0·∞ and k/∞.', ar: '∞/∞ و∞ − ∞ و0·∞ وk/∞.' } },
            { progressId: 109503, stage: 'infinity', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: '1^∞, 2^∞, ∞⁰ eta 0^∞.', es: '1^∞, 2^∞, ∞⁰ y 0^∞.', en: '1^∞, 2^∞, ∞⁰ and 0^∞.', ar: '1^∞ و2^∞ و∞⁰ و0^∞.' } }
        ]
    },
    {
        id: 'asymptote',
        title: { eu: 'Ehizatu asintotak', es: 'Caza las asíntotas', en: 'Hunt the asymptotes', ar: 'اصطد المقاربات' },
        tagline: { eu: 'Funtzio bat eta zenbait zuzen: markatu asintota guztiak, eta besterik ez.', es: 'Una función y unas rectas: marca todas las asíntotas y ninguna más.', en: 'A function and some lines: mark every asymptote and nothing else.', ar: 'دالة وبعض المستقيمات: حدّد كل المقاربات ولا شيء غيرها.' },
        skills: { eu: 'Asintota bertikalak, horizontalak eta zeiharrak', es: 'Asíntotas verticales, horizontales y oblicuas', en: 'Vertical, horizontal and oblique asymptotes', ar: 'المقاربات الرأسية والأفقية والمائلة' },
        levels: [
            { progressId: 109601, stage: 'asymptotes', title: { eu: 'Bertikalak', es: 'Verticales', en: 'Vertical', ar: 'الرأسية' }, description: { eu: 'Kontuz zuloekin.', es: 'Cuidado con los agujeros.', en: 'Watch out for holes.', ar: 'احذر الثقوب.' } },
            { progressId: 109602, stage: 'asymptotes', title: { eu: 'Horizontalak ere bai', es: 'También horizontales', en: 'Horizontal too', ar: 'والأفقية أيضًا' }, description: { eu: 'Maila bera ala behean handiagoa.', es: 'El mismo grado o mayor abajo.', en: 'The same degree or higher below.', ar: 'الدرجة نفسها أو أكبر في المقام.' } },
            { progressId: 109603, stage: 'asymptotes', title: { eu: 'Zeiharrak', es: 'Oblicuas', en: 'Oblique', ar: 'المائلة' }, description: { eu: 'Goian maila bat gehiago.', es: 'Un grado más arriba.', en: 'One degree more on top.', ar: 'درجة واحدة زائدة في البسط.' } }
        ]
    },
    {
        id: 'discontinuity',
        title: { eu: 'Zer etenune?', es: '¿Qué discontinuidad?', en: 'Which discontinuity?', ar: 'أي انقطاع؟' },
        tagline: { eu: 'Funtzio bat eta puntu bat: jarraitua, gaindigarria, jauzi finitua ala jauzi infinitua?', es: 'Una función y un punto: ¿continua, evitable, salto finito o salto infinito?', en: 'A function and a point: continuous, removable, finite jump or infinite jump?', ar: 'دالة ونقطة: متصلة أم انقطاع قابل للإزالة أم قفزة منتهية أم قفزة لانهائية؟' },
        skills: { eu: 'Alboko limiteak eta f(a)', es: 'Límites laterales y f(a)', en: 'One-sided limits and f(a)', ar: 'النهايتان الجانبيتان وf(a)' },
        levels: [
            { progressId: 109651, stage: 'continuity', title: { eu: 'Grafikotik', es: 'Desde la gráfica', en: 'From the graph', ar: 'من الرسم' }, description: { eu: 'Puntu hutsak eta beteak.', es: 'Puntos huecos y llenos.', en: 'Open and filled dots.', ar: 'نقاط فارغة وممتلئة.' } },
            { progressId: 109652, stage: 'continuity', title: { eu: 'Zatika', es: 'A trozos', en: 'Piecewise', ar: 'على أجزاء' }, description: { eu: 'Kalkulatu alboko limiteak.', es: 'Calcula los límites laterales.', en: 'Work out the one-sided limits.', ar: 'احسب النهايتين الجانبيتين.' } },
            { progressId: 109653, stage: 'continuity', title: { eu: 'Formulatik', es: 'Desde la fórmula', en: 'From the formula', ar: 'من الصيغة' }, description: { eu: 'Zatidurak, |x − a| eta E(x).', es: 'Cocientes, |x − a| y E(x).', en: 'Quotients, |x − a| and E(x).', ar: 'خوارج القسمة و|x − a| وE(x).' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Limiteen detektibea', es: 'Detective de límites', en: 'Limits detective', ar: 'مخبر النهايات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 109701, stage: 'calculus', title: { eu: 'Puntu batean', es: 'En un punto', en: 'At a point', ar: 'عند نقطة' }, description: { eu: '0/0, k/0, f(a) eta faktorizazioa.', es: '0/0, k/0, f(a) y la factorización.', en: '0/0, k/0, f(a) and factorising.', ar: '0/0 وk/0 وf(a) والتحليل.' } },
            { progressId: 109702, stage: 'infinity', title: { eu: 'Infinituan', es: 'En el infinito', en: 'At infinity', ar: 'عند اللانهاية' }, description: { eu: '∞ − ∞, 1^∞, koefizienteak eta √x².', es: '∞ − ∞, 1^∞, coeficientes y √x².', en: '∞ − ∞, 1^∞, coefficients and √x².', ar: '∞ − ∞ و1^∞ والمعاملات و√x².' } },
            { progressId: 109703, stage: 'asymptotes', title: { eu: 'Asintotak eta Bolzano', es: 'Asíntotas y Bolzano', en: 'Asymptotes and Bolzano', ar: 'المقاربات وبولتسانو' }, description: { eu: 'Zuloak, y = 0, zatiketa eta jauziak.', es: 'Agujeros, y = 0, la división y los saltos.', en: 'Holes, y = 0, the division and jumps.', ar: 'الثقوب وy = 0 والقسمة والقفزات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: limite bat eta bere balioa, edo funtzio bat eta bere asintotak.', es: 'Encuentra las parejas: un límite y su valor, o una función y sus asíntotas.', en: 'Find the pairs: a limit and its value, or a function and its asymptotes.', ar: 'اعثر على الأزواج: نهاية وقيمتها، أو دالة ومقارباتها.' },
        skills: { eu: 'Limiteak eta asintotak', es: 'Límites y asíntotas', en: 'Limits and asymptotes', ar: 'النهايات والمقاربات' },
        levels: [
            { progressId: 109801, stage: 'calculus', title: { eu: 'Puntu batean', es: 'En un punto', en: 'At a point', ar: 'عند نقطة' }, description: { eu: '(x² − 9)/(x − 3) ↔ 6', es: '(x² − 9)/(x − 3) ↔ 6', en: '(x² − 9)/(x − 3) ↔ 6', ar: '(x² − 9)/(x − 3) ↔ 6' } },
            { progressId: 109802, stage: 'infinity', title: { eu: 'Infinituan', es: 'En el infinito', en: 'At infinity', ar: 'عند اللانهاية' }, description: { eu: 'x → +∞ denean: (1 + 2/x)ˣ ↔ e²', es: 'Con x → +∞: (1 + 2/x)ˣ ↔ e²', en: 'As x → +∞: (1 + 2/x)ˣ ↔ e²', ar: 'عندما x → +∞: ‏(1 + 2/x)ˣ ↔ e²' } },
            { progressId: 109803, stage: 'asymptotes', title: { eu: 'Asintotak', es: 'Asíntotas', en: 'Asymptotes', ar: 'المقاربات' }, description: { eu: '3x/(x − 2) ↔ x = 2, y = 3', es: '3x/(x − 2) ↔ x = 2, y = 3', en: '3x/(x − 2) ↔ x = 2, y = 3', ar: '3x/(x − 2) ↔ x = 2, y = 3' } }
        ]
    },
    reused(bachSequencesGames.find((game) => game.id === 'where')!, 'toward', ['infinity', 'infinity', 'infinity'], 109811),
    reused(bachSequencesGames.find((game) => game.id === 'band')!, 'band', ['point', 'point', 'point'], 109821)
]

export const bachLimitsGameProgressIds: number[] = levelProgressIds(bachLimitsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachLimitsGameSlugs: Record<BachLimitsGameId, string> = { race: 'lasterketa', forms: 'indeterminazioak', asymptote: 'asintotak', discontinuity: 'etenuneak', detective: 'detektibea', memory: 'memoria', toward: 'nora', band: 'banda' }

export function bachLimitsGameModeForPath(pathname: string): BachLimitsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['indeterminazioak', 'indeterminaciones'].includes(game)) return 'forms'
    if (['asintotak', 'asintotas'].includes(game)) return 'asymptote'
    if (['etenuneak', 'discontinuidades'].includes(game)) return 'discontinuity'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['nora', 'hacia-donde'].includes(game)) return 'toward'
    if (['banda'].includes(game)) return 'band'
    return 'hub'
}

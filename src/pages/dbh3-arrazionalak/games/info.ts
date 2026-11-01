import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Zenbaki arrazionalak (3. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   Three games belong to this topic (fill the jug, catch the period and
   the rational numbers detective); the race and the memory are shared
   engines, and "Kokatu zuzenean" is the 4. DBH game with its two
   rational levels. Level descriptions are plain text.
   ========================================================================== */

export type RationalsGameId = 'race' | 'jug' | 'period' | 'detective' | 'place' | 'memory'

export const RATIONALS_GAME_RECORDS_KEY = 'matella-arrazionalak-dbh3-game-records'

export const rationalsGames: GameInfo<RationalsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zenbaki arrazionalen lasterketa', es: 'Carrera de números racionales', en: 'Rational numbers race', ar: 'سباق الأعداد النسبية' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 33101, stage: 'fractions', title: { eu: 'Baliokideak', es: 'Equivalentes', en: 'Equivalent', ar: 'المتكافئة' }, description: { eu: 'Sinplifikatu eta osatu zatiki baliokideak.', es: 'Simplifica y completa fracciones equivalentes.', en: 'Simplify and complete equivalent fractions.', ar: 'بسّط الكسور المتكافئة وأكملها.' } },
            { progressId: 33102, stage: 'order', title: { eu: 'Ordena', es: 'Orden', en: 'Order', ar: 'الترتيب' }, description: { eu: 'Handiena, txikiena eta tartekoa, negatiboekin.', es: 'La mayor, la menor y la intermedia, con negativas.', en: 'The greatest, the smallest and the one in between, including negatives.', ar: 'الأكبر والأصغر والوسيط مع السالبة.' } },
            { progressId: 33103, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Batu, kendu, biderkatu, zatitu eta konbinatuak.', es: 'Sumar, restar, multiplicar, dividir y combinadas.', en: 'Adding, subtracting, multiplying, dividing and combined operations.', ar: 'الجمع والطرح والضرب والقسمة والمركبة.' } },
            { progressId: 33104, stage: 'decimals', title: { eu: 'Hamartarrak', es: 'Decimales', en: 'Decimals', ar: 'العشريات' }, description: { eu: 'Hamartar motak eta zatiki sortzailea.', es: 'Tipos de decimales y fracción generatriz.', en: 'Types of decimals and generating fraction.', ar: 'أنواع العشريات والكسر المولّد.' } },
            { progressId: 33105, stage: 'problems', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' }, description: { eu: 'Kantitate baten zatikia, geratzen dena eta osoa.', es: 'Fracción de una cantidad, lo que queda y el total.', en: 'Fraction of a quantity, what is left and the total.', ar: 'كسر من كمية والباقي والكل.' } }
        ]
    },
    {
        id: 'jug',
        title: { eu: 'Bete pitxerra', es: 'Llena la jarra', en: 'Fill the jug', ar: 'املأ الإبريق' },
        tagline: { eu: 'Aukeratu marka arte justu betetzen duten zatikiak: ez gutxiago, ez gehiago.', es: 'Elige las fracciones que la llenan justo hasta la marca: ni menos ni más.', en: 'Choose the fractions that fill it exactly up to the mark: no less, no more.', ar: 'اختر الكسور التي تملؤه حتى العلامة تمامًا: لا أقل ولا أكثر.' },
        skills: { eu: 'Zatikiak batu eta kendu buruz', es: 'Sumar y restar fracciones de cabeza', en: 'Add and subtract fractions in your head', ar: 'جمع الكسور وطرحها ذهنيًا' },
        levels: [
            { progressId: 33501, stage: 'operations', title: { eu: 'Erdiak eta laurdenak', es: 'Medios y cuartos', en: 'Halves and quarters', ar: 'الأنصاف والأرباع' }, description: { eu: 'Erdiak, laurdenak eta zortzirenak.', es: 'Medios, cuartos y octavos.', en: 'Halves, quarters and eighths.', ar: 'الأنصاف والأرباع والأثمان.' } },
            { progressId: 33502, stage: 'operations', title: { eu: 'Herenak eta seirenak', es: 'Tercios y sextos', en: 'Thirds and sixths', ar: 'الأثلاث والأسداس' }, description: { eu: 'Herenak, seirenak eta hamabirenak ere bai.', es: 'También tercios, sextos y doceavos.', en: 'Thirds, sixths and twelfths too.', ar: 'والأثلاث والأسداس والأجزاء من اثني عشر أيضًا.' } },
            { progressId: 33503, stage: 'operations', title: { eu: 'Negatiboekin', es: 'Con negativas', en: 'With negatives', ar: 'مع السالبة' }, description: { eu: 'Txartel negatibo batek ura kentzen du.', es: 'Una carta negativa quita agua.', en: 'A negative card takes water out.', ar: 'البطاقة السالبة تُخرج ماءً.' } }
        ]
    },
    {
        id: 'period',
        title: { eu: 'Ehizatu periodoa', es: 'Caza el periodo', en: 'Catch the period', ar: 'اصطد الدور' },
        tagline: { eu: 'Zenbakiak erortzen dira: bota bakoitza bere ontzira lurrera iritsi aurretik.', es: 'Caen números: echa cada uno a su cubo antes de que llegue al suelo.', en: 'Numbers fall: drop each into its bin before it hits the floor.', ar: 'تسقط أعداد: ضع كل عدد في سلّته قبل أن يصل إلى الأرض.' },
        skills: { eu: 'Hamartar zehatzak, periodiko hutsak eta mistoak', es: 'Decimales exactos, periódicos puros y mixtos', en: 'Terminating, purely recurring and mixed recurring decimals', ar: 'العشريات المنتهية والدورية البحتة والمختلطة' },
        levels: [
            { progressId: 33601, stage: 'decimals', title: { eu: 'Hamartarrak', es: 'Decimales', en: 'Decimals', ar: 'العشريات' }, description: { eu: 'Hamartarra idatzita: 0,375 · 0,333… · 0,1666…', es: 'El decimal escrito: 0,375 · 0,333… · 0,1666…', en: 'The decimal written out: 0.375 · 0.333… · 0.1666…', ar: 'العشري مكتوبًا: 0.375 · 0.333… · 0.1666…' } },
            { progressId: 33602, stage: 'decimals', title: { eu: 'Zatikiak', es: 'Fracciones', en: 'Fractions', ar: 'الكسور' }, description: { eu: 'Izendatzaileak esaten du: 2 eta 5, besterik ez, ala biak.', es: 'Lo dice el denominador: 2 y 5, otros o de los dos.', en: 'The denominator tells: 2s and 5s, others or both.', ar: 'المقام يخبرك: 2 و5، أو غيرهما، أو كلاهما.' } },
            { progressId: 33603, stage: 'decimals', title: { eu: 'Tranpak', es: 'Trampas', en: 'Traps', ar: 'الفخاخ' }, description: { eu: 'Sinplifikatu gabeko zatikiak: 6/15 zehatza da.', es: 'Fracciones sin simplificar: 6/15 es exacto.', en: 'Fractions not in lowest terms: 6/15 terminates.', ar: 'كسور غير مختزلة: 6/15 منتهٍ.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Zenbaki arrazionalen detektibea', es: 'Detective de racionales', en: 'Rational numbers detective', ar: 'مخبر الأعداد النسبية' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Zatikietako akats tipikoak', es: 'Errores típicos con fracciones', en: 'Common mistakes with fractions', ar: 'الأخطاء الشائعة في الكسور' },
        levels: [
            { progressId: 33401, stage: 'order', title: { eu: 'Zatikiak eta ordena', es: 'Fracciones y orden', en: 'Fractions and order', ar: 'الكسور والترتيب' }, description: { eu: 'Batuketak, izendatzaile komuna eta negatiboak.', es: 'Sumas, denominador común y negativas.', en: 'Sums, common denominator and negatives.', ar: 'الجمع والمقام المشترك والسالبة.' } },
            { progressId: 33402, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Biderketak, zatiketak, hierarkia eta zeinuak.', es: 'Productos, divisiones, jerarquía y signos.', en: 'Products, divisions, order of operations and signs.', ar: 'الضرب والقسمة والأولويات والإشارات.' } },
            { progressId: 33403, stage: 'problems', title: { eu: 'Hamartarrak eta problemak', es: 'Decimales y problemas', en: 'Decimals and problems', ar: 'العشريات والمسائل' }, description: { eu: 'Zatiki sortzailea, geratzen dena eta osoa.', es: 'Generatriz, lo que queda y el total.', en: 'Generating fraction, what is left and the whole.', ar: 'الكسر المولّد والباقي والكل.' } }
        ]
    },
    {
        id: 'place',
        title: { eu: 'Kokatu zuzenean', es: 'Sitúa en la recta', en: 'Place on the number line', ar: 'ضعه على المستقيم' },
        tagline: { eu: 'Zortzi zatiki zuzenean, negatiboak barne: sakatu non dagoen bakoitza. Bi saiakera zenbaki bakoitzeko.', es: 'Ocho fracciones en la recta, también negativas: pulsa dónde está cada una. Dos intentos por número.', en: 'Eight fractions on the number line, including negative ones: tap where each one is. Two attempts per number.', ar: 'ثمانية كسور على المستقيم، والسالبة منها: اضغط على موضع كل كسر. محاولتان لكل عدد.' },
        skills: { eu: 'Zatikiak eta hamartarrak zuzenean kokatzea', es: 'Situar fracciones y decimales en la recta', en: 'Place fractions and decimals on the number line', ar: 'وضع الكسور والعشريات على المستقيم' },
        levels: [
            { progressId: 33201, stage: 'order', title: { eu: 'Laurdenak', es: 'Cuartos', en: 'Quarters', ar: 'الأرباع' }, description: { eu: 'Zatikiak eta hamartarrak: 3/4, −1,5, 7/4…', es: 'Fracciones y decimales: 3/4, −1,5, 7/4…', en: 'Fractions and decimals: 3/4, −1.5, 7/4…', ar: 'كسور وعشريات: 3/4 و⁦−1.5⁩ و7/4…' } },
            { progressId: 33202, stage: 'decimals', title: { eu: 'Hamarrenak', es: 'Décimas', en: 'Tenths', ar: 'الأعشار' }, description: { eu: 'Hamarrenetako marrak: 0,7, −1,3, 3/5…', es: 'Marcas de décimas: 0,7, −1,3, 3/5…', en: 'Tenth marks: 0.7, −1.3, 3/5…', ar: 'علامات الأعشار: 0.7 و⁦−1.3⁩ و3/5…' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: zatiki bat eta bere laburtezina, edo hamartar bat eta bere zatikia.', es: 'Encuentra las parejas: una fracción y su irreducible, o un decimal y su fracción.', en: 'Find the pairs: a fraction and its simplest form, or a decimal and its fraction.', ar: 'جد الأزواج: كسر وأبسط صورة له، أو عدد عشري وكسره.' },
        skills: { eu: 'Sinplifikatu eta zatiki sortzailea buruz', es: 'Simplificar y fracción generatriz de cabeza', en: 'Simplify and find the generating fraction in your head', ar: 'الاختزال والكسر المولّد ذهنيًا' },
        levels: [
            { progressId: 33301, stage: 'fractions', title: { eu: 'Laburtezina', es: 'Irreducible', en: 'Simplest form', ar: 'أبسط صورة' }, description: { eu: '24/36 ↔ 2/3', es: '24/36 ↔ 2/3', en: '24/36 ↔ 2/3', ar: '24/36 ↔ 2/3' } },
            { progressId: 33302, stage: 'decimals', title: { eu: 'Hamartar zehatzak', es: 'Decimales exactos', en: 'Terminating decimals', ar: 'العشريات المنتهية' }, description: { eu: '0,375 ↔ 3/8', es: '0,375 ↔ 3/8', en: '0.375 ↔ 3/8', ar: '0.375 ↔ 3/8' } },
            { progressId: 33303, stage: 'decimals', title: { eu: 'Periodikoak', es: 'Periódicos', en: 'Recurring', ar: 'الدورية' }, description: { eu: '0,8333… ↔ 5/6', es: '0,8333… ↔ 5/6', en: '0.8333… ↔ 5/6', ar: '0.8333… ↔ 5/6' } }
        ]
    }
]

export const rationalsGameProgressIds: number[] = levelProgressIds(rationalsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const rationalsGameSlugs: Record<RationalsGameId, string> = { race: 'lasterketa', jug: 'pitxerra', period: 'periodoa', detective: 'detektibea', place: 'zuzena', memory: 'memoria' }

export function rationalsGameModeForPath(pathname: string): RationalsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['pitxerra', 'jarra'].includes(game)) return 'jug'
    if (['periodoa', 'periodo'].includes(game)) return 'period'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['zuzena', 'recta', 'situar', 'kokatu'].includes(game)) return 'place'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

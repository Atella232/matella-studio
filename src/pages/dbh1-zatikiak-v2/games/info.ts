import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { fraction } from '../../../features/unit-v2/math/fraction.ts'
import type { MemoryLevel } from '../../dbh2-zatikiak-prototype/games/memory.ts'
import type { TargetLevel } from '../../dbh2-zatikiak-prototype/games/target.ts'

/* ==========================================================================
   Zatikiak (1. DBH) games: the list shown in the hub, with levels and the
   unit progress id each level earns with its first star. The target, the
   wall and the memory are the 2. DBH games with first-year levels: no
   negative fractions and no percentages.
   ========================================================================== */

export type IntroFractionGameId = 'race' | 'target' | 'wall' | 'memory'

export const INTRO_FRACTION_GAME_RECORDS_KEY = 'matella-zatikiak-dbh1-game-records'

export const introFractionGames: GameInfo<IntroFractionGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zatikien lasterketa', es: 'Carrera de fracciones', en: 'Fraction race', ar: 'سباق الكسور' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 6101, stage: 'types', title: { eu: 'Zenbaki mistoak', es: 'Números mixtos', en: 'Mixed numbers', ar: 'الأعداد الكسرية' }, description: { eu: 'Zatiki inpropioetatik mistoetara eta alderantziz.', es: 'De impropias a mixtos y al revés.', en: 'From improper fractions to mixed numbers and back.', ar: 'من الكسور غير الحقيقية إلى الأعداد الكسرية وبالعكس.' } },
            { progressId: 6102, stage: 'equivalence', title: { eu: 'Baliokideak', es: 'Equivalentes', en: 'Equivalent', ar: 'المتكافئة' }, description: { eu: 'Sinplifikatu eta osatu zatiki baliokideak.', es: 'Simplifica y completa fracciones equivalentes.', en: 'Simplify and complete equivalent fractions.', ar: 'بسّط الكسور المتكافئة وأكملها.' } },
            { progressId: 6103, stage: 'equivalence', title: { eu: 'Konparatu', es: 'Comparar', en: 'Compare', ar: 'المقارنة' }, description: { eu: 'Handiena, txikiena eta tartekoa.', es: 'La mayor, la menor y la intermedia.', en: 'The greatest, the smallest and the middle one.', ar: 'الأكبر والأصغر والوسيط.' } },
            { progressId: 6104, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Batu, kendu, biderkatu eta zatitu.', es: 'Suma, resta, multiplica y divide.', en: 'Add, subtract, multiply and divide.', ar: 'اجمع واطرح واضرب واقسم.' } },
            { progressId: 6105, stage: 'problems', title: { eu: 'Kopuruak', es: 'Cantidades', en: 'Quantities', ar: 'الكميات' }, description: { eu: 'Kopuru baten zatikia eta geratzen dena.', es: 'Fracción de una cantidad y lo que queda.', en: 'Fraction of a quantity and what is left.', ar: 'كسر من كمية والمتبقي.' } }
        ]
    },
    {
        id: 'target',
        title: { eu: 'Itua', es: 'Diana', en: 'Target', ar: 'الهدف' },
        tagline: { eu: 'Jaurti zatikia zenbaki-zuzenera. Zenbat eta hurbilago, orduan eta puntu gehiago.', es: 'Lanza la fracción a la recta. Cuanto más cerca, más puntos.', en: 'Throw the fraction onto the number line. The closer, the more points.', ar: 'ارمِ الكسر على خط الأعداد. كلما اقتربت زادت النقاط.' },
        skills: { eu: 'Estimazioa eta ordena', es: 'Estimación y orden', en: 'Estimation and order', ar: 'التقدير والترتيب' },
        levels: [
            { progressId: 6201, stage: 'types', title: { eu: '0 eta 1 artean', es: 'Entre 0 y 1', en: 'Between 0 and 1', ar: 'بين 0 و1' }, description: { eu: 'Zatiki propioak, marka gabeko zuzen batean.', es: 'Fracciones propias en una recta sin marcas.', en: 'Proper fractions on a number line with no marks.', ar: 'كسور حقيقية على خط بلا علامات.' } },
            { progressId: 6202, stage: 'types', title: { eu: '0tik 2ra', es: 'De 0 a 2', en: 'From 0 to 2', ar: 'من 0 إلى 2' }, description: { eu: 'Zatiki inpropioak eta zenbaki mistoak.', es: 'Impropias y números mixtos.', en: 'Improper fractions and mixed numbers.', ar: 'كسور غير حقيقية وأعداد كسرية.' } },
            { progressId: 6203, stage: 'types', title: { eu: '0tik 3ra', es: 'De 0 a 3', en: 'From 0 to 3', ar: 'من 0 إلى 3' }, description: { eu: 'Zatikiak, mistoak eta hamartarrak.', es: 'Fracciones, mixtos y decimales.', en: 'Fractions, mixed numbers and decimals.', ar: 'كسور وأعداد كسرية وعشرية.' } }
        ]
    },
    {
        id: 'wall',
        title: { eu: 'Zatiki-horma', es: 'Muro de fracciones', en: 'Fraction wall', ar: 'جدار الكسور' },
        tagline: { eu: 'Kokatu adreiluak eta osatu zehazki unitate bat balio duten ilarak.', es: 'Coloca los ladrillos y completa filas que valgan exactamente una unidad.', en: 'Place the bricks and complete rows that are worth exactly one whole.', ar: 'ضع الطوب وأكمل صفوفًا تساوي وحدة واحدة تمامًا.' },
        skills: { eu: 'Batuketak eta baliokidetasuna', es: 'Sumas y equivalencia', en: 'Sums and equivalence', ar: 'الجمع والتكافؤ' },
        levels: [
            { progressId: 6301, stage: 'equivalence', title: { eu: 'Erdiak eta laurdenak', es: 'Medios y cuartos', en: 'Halves and quarters', ar: 'الأنصاف والأرباع' }, description: { eu: '1/2, 1/4 eta 1/8 adreiluak.', es: 'Ladrillos de 1/2, 1/4 y 1/8.', en: 'Bricks of 1/2, 1/4 and 1/8.', ar: 'طوب 1/2 و1/4 و1/8.' } },
            { progressId: 6302, stage: 'equivalence', title: { eu: 'Herenak eta seirenak', es: 'Tercios y sextos', en: 'Thirds and sixths', ar: 'الأثلاث والأسداس' }, description: { eu: '1/2, 1/3, 1/4, 1/6 eta 1/12 nahasita.', es: 'Mezcla de 1/2, 1/3, 1/4, 1/6 y 1/12.', en: 'Mix of 1/2, 1/3, 1/4, 1/6 and 1/12.', ar: 'مزيج من 1/2 و1/3 و1/4 و1/6 و1/12.' } },
            { progressId: 6303, stage: 'operations', title: { eu: 'Adreilu handiak', es: 'Ladrillos grandes', en: 'Large bricks', ar: 'طوب كبير' }, description: { eu: '2/3, 3/4, 5/12, 3/10… ere agertzen dira.', es: 'También aparecen 2/3, 3/4, 5/12, 3/10…', en: '2/3, 3/4, 5/12, 3/10… also appear.', ar: 'تظهر أيضًا 2/3 و3/4 و5/12 و3/10…' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera modu desberdinetan idazten duten kartak.', es: 'Encuentra las cartas que escriben el mismo valor de formas distintas.', en: 'Find the cards that write the same value in different ways.', ar: 'جد البطاقات التي تكتب القيمة نفسها بطرق مختلفة.' },
        skills: { eu: 'Zatikia, marrazkia, hamartarra eta mistoa', es: 'Fracción, dibujo, decimal y mixto', en: 'Fraction, drawing, decimal and mixed number', ar: 'كسر ورسم وعدد عشري وعدد كسري' },
        levels: [
            { progressId: 6401, stage: 'meaning', title: { eu: 'Bikoteak', es: 'Parejas', en: 'Pairs', ar: 'أزواج' }, description: { eu: '6 bikote: zatikiak, marrazkiak eta hamartarrak.', es: '6 parejas: fracciones, dibujos y decimales.', en: '6 pairs: fractions, drawings and decimals.', ar: '6 أزواج: كسور ورسوم وأعداد عشرية.' } },
            { progressId: 6402, stage: 'types', title: { eu: 'Mistoak eta zuzena', es: 'Mixtos y la recta', en: 'Mixed numbers and the number line', ar: 'الأعداد الكسرية والمستقيم' }, description: { eu: '8 bikote: mistoak, marrazkiak eta zuzena.', es: '8 parejas: mixtos, dibujos y la recta.', en: '8 pairs: mixed numbers, drawings and the number line.', ar: '8 أزواج: أعداد كسرية ورسوم والمستقيم.' } },
            { progressId: 6403, stage: 'equivalence', title: { eu: 'Hirukoteak', es: 'Tríos', en: 'Trios', ar: 'ثلاثيات' }, description: { eu: '6 hirukote: zatikia, hamartarra eta marrazkia.', es: '6 tríos: fracción, decimal y dibujo.', en: '6 trios: fraction, decimal and drawing.', ar: '6 ثلاثيات: كسر وعدد عشري ورسم.' } }
        ]
    }
]

export const introFractionGameProgressIds: number[] = levelProgressIds(introFractionGames)

/** First-year levels for the 2. DBH target: never below 0 */
export const introTargetLevels: TargetLevel[] = [
    { min: 0, max: 1, forms: ['fraction'], denominators: [2, 3, 4, 5, 6, 8, 10], negatives: false },
    { min: 0, max: 2, forms: ['fraction', 'mixed'], denominators: [2, 3, 4, 5, 6, 8], negatives: false },
    { min: 0, max: 3, forms: ['fraction', 'mixed', 'decimal'], denominators: [2, 3, 4, 5, 6, 8], negatives: false }
]

const f = fraction

/** First-year levels for the 2. DBH memory: no percentages */
export const introMemoryLevels: MemoryLevel[] = [
    {
        groups: 6,
        groupSize: 2,
        layouts: [['fraction', 'bar'], ['fraction', 'decimal']],
        values: [f(1, 2), f(1, 3), f(2, 3), f(1, 4), f(3, 4), f(1, 5), f(2, 5), f(3, 5), f(4, 5), f(1, 6), f(5, 6), f(3, 8), f(7, 10)]
    },
    {
        groups: 8,
        groupSize: 2,
        layouts: [['fraction', 'mixed'], ['fraction', 'line'], ['fraction', 'bar'], ['mixed', 'line']],
        values: [f(1, 4), f(3, 4), f(2, 5), f(3, 5), f(1, 2), f(5, 4), f(3, 2), f(7, 4), f(5, 3), f(7, 3), f(9, 4), f(4, 3), f(2, 3), f(5, 6), f(7, 6)]
    },
    {
        groups: 6,
        groupSize: 3,
        layouts: [['fraction', 'decimal', 'bar'], ['mixed', 'fraction', 'line']],
        values: [f(1, 4), f(2, 5), f(1, 5), f(1, 2), f(3, 4), f(3, 5), f(4, 5), f(1, 8), f(5, 4), f(3, 2), f(7, 4), f(9, 10)]
    }
]

/** Address of each game (Basque); the parser below also accepts the Spanish ones and the legacy ones */
export const introFractionGameSlugs: Record<IntroFractionGameId, string> = { race: 'lasterketa', target: 'itua', wall: 'horma', memory: 'memoria' }

export function introFractionGameModeForPath(pathname: string): IntroFractionGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['diana', 'itua'].includes(game)) return 'target'
    if (['muro', 'horma'].includes(game)) return 'wall'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

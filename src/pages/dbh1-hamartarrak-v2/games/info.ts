import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import type { TargetLevel } from '../../dbh2-zatikiak-prototype/games/target.ts'

/* ==========================================================================
   Zenbaki hamartarrak (1. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   The target is the 2. DBH game with decimal levels; the memory is the
   engine's pairs game.
   ========================================================================== */

export type DecimalsGameId = 'race' | 'target' | 'memory'

export const DECIMALS_GAME_RECORDS_KEY = 'matella-hamartarrak-dbh1-game-records'

export const decimalsGames: GameInfo<DecimalsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Hamartarren lasterketa', es: 'Carrera de decimales', en: 'Decimal race', ar: 'سباق الأعداد العشرية' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 14101, stage: 'structure', title: { eu: 'Posizioak', es: 'Posiciones', en: 'Positions', ar: 'المنازل' }, description: { eu: 'Zifren balioa eta unitate hamartarrak.', es: 'Valor de las cifras y unidades decimales.', en: 'Value of digits and decimal places.', ar: 'قيمة الأرقام والوحدات العشرية.' } },
            { progressId: 14102, stage: 'order', title: { eu: 'Ordena', es: 'Orden', en: 'Order', ar: 'الترتيب' }, description: { eu: 'Handiena, txikiena eta tartekoa.', es: 'El mayor, el menor y el intermedio.', en: 'The largest, the smallest and the middle one.', ar: 'الأكبر والأصغر والوسيط.' } },
            { progressId: 14103, stage: 'fractions', title: { eu: 'Zatikiak eta biribiltzea', es: 'Fracciones y redondeo', en: 'Fractions and rounding', ar: 'الكسور والتقريب' }, description: { eu: 'Zatiki hamartarrak, zatiketak eta biribiltzea.', es: 'Fracciones decimales, divisiones y redondeo.', en: 'Decimal fractions, divisions and rounding.', ar: 'الكسور العشرية والقسمة والتقريب.' } },
            { progressId: 14104, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Batu, kendu, biderkatu eta koma mugitu.', es: 'Suma, resta, multiplica y mueve la coma.', en: 'Add, subtract, multiply and move the decimal point.', ar: 'اجمع واطرح واضرب وحرّك الفاصلة.' } },
            { progressId: 14105, stage: 'division', title: { eu: 'Zatiketak eta problemak', es: 'Divisiones y problemas', en: 'Divisions and problems', ar: 'القسمة والمسائل' }, description: { eu: 'Zatitu eta erosketak egin.', es: 'Divide y haz la compra.', en: 'Divide and go shopping.', ar: 'اقسم وتسوّق.' } }
        ]
    },
    {
        id: 'target',
        title: { eu: 'Itua', es: 'Diana', en: 'Target', ar: 'الهدف' },
        tagline: { eu: 'Jaurti hamartarra zenbaki-zuzenera. Zenbat eta hurbilago, orduan eta puntu gehiago.', es: 'Lanza el decimal a la recta. Cuanto más cerca, más puntos.', en: 'Throw the decimal onto the number line. The closer, the more points.', ar: 'ارمِ العدد العشري على خط الأعداد. كلما اقتربت زادت النقاط.' },
        skills: { eu: 'Hamartarrak zuzenean', es: 'Decimales en la recta', en: 'Decimals on the number line.', ar: 'الأعداد العشرية على المستقيم' },
        levels: [
            { progressId: 14201, stage: 'order', title: { eu: 'Hamarrenak', es: 'Décimas', en: 'Tenths', ar: 'الأعشار' }, description: { eu: '0 eta 2 artean: 0,3, 1,7…', es: 'Entre 0 y 2: 0,3, 1,7…', en: 'Between 0 and 2: 0.3, 1.7…', ar: 'بين 0 و2: 0.3 و1.7…' } },
            { progressId: 14202, stage: 'order', title: { eu: 'Ehunenak', es: 'Centésimas', en: 'Hundredths', ar: 'الأجزاء من مئة' }, description: { eu: '0 eta 1 artean: 0,35, 0,82…', es: 'Entre 0 y 1: 0,35, 0,82…', en: 'Between 0 and 1: 0.35, 0.82…', ar: 'بين 0 و1: 0.35 و0.82…' } },
            { progressId: 14203, stage: 'order', title: { eu: '0tik 3ra', es: 'De 0 a 3', en: 'From 0 to 3', ar: 'من 0 إلى 3' }, description: { eu: '1,25, 2,6, 0,85…', es: '1,25, 2,6, 0,85…', en: '1.25, 2.6, 0.85…', ar: '1.25 و2.6 و0.85…' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', en: 'Find the cards that are worth the same.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Hamartarrak, zatikiak eta eragiketak', es: 'Decimales, fracciones y operaciones', en: 'Decimals, fractions and operations', ar: 'الأعداد العشرية والكسور والعمليات' },
        levels: [
            { progressId: 14301, stage: 'fractions', title: { eu: 'Zatiki hamartarrak', es: 'Fracciones decimales', en: 'Decimal fractions', ar: 'الكسور العشرية' }, description: { eu: '0,45 ↔ 45/100', es: '0,45 ↔ 45/100', en: '0.45 ↔ 45/100', ar: '0.45 ↔ 45/100' } },
            { progressId: 14302, stage: 'fractions', title: { eu: 'Zatikia zatiketa gisa', es: 'La fracción como división', en: 'A fraction as a division', ar: 'الكسر قسمةً' }, description: { eu: '3/4 ↔ 0,75 · 1/3 ↔ 0,333…', es: '3/4 ↔ 0,75 · 1/3 ↔ 0,333…', en: '3/4 ↔ 0.75 · 1/3 ↔ 0.333…', ar: '3/4 ↔ 0.75 · 1/3 ↔ 0.333…' } },
            { progressId: 14303, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: '2,7 · 1,5 ↔ 4,05', es: '2,7 · 1,5 ↔ 4,05', en: '2.7 · 1.5 ↔ 4.05', ar: '2.7 · 1.5 ↔ 4.05' } }
        ]
    }
]

export const decimalsGameProgressIds: number[] = levelProgressIds(decimalsGames)

/** Decimal levels for the 2. DBH target: tenths, hundredths, then up to 3 */
export const decimalsTargetLevels: TargetLevel[] = [
    { min: 0, max: 2, forms: ['decimal'], denominators: [10], negatives: false },
    { min: 0, max: 1, forms: ['decimal'], denominators: [20, 25, 50, 100], negatives: false },
    { min: 0, max: 3, forms: ['decimal'], denominators: [4, 5, 10, 20], negatives: false }
]

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const decimalsGameSlugs: Record<DecimalsGameId, string> = { race: 'lasterketa', target: 'itua', memory: 'memoria' }

export function decimalsGameModeForPath(pathname: string): DecimalsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['diana', 'itua'].includes(game)) return 'target'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

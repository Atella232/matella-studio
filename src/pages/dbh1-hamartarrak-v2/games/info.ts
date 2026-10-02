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
        title: { eu: 'Hamartarren lasterketa', es: 'Carrera de decimales', ar: 'سباق الأعداد العشرية' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 14101, stage: 'structure', title: { eu: 'Posizioak', es: 'Posiciones', ar: 'المنازل' }, description: { eu: 'Zifren balioa eta unitate hamartarrak.', es: 'Valor de las cifras y unidades decimales.', ar: 'قيمة الأرقام والوحدات العشرية.' } },
            { progressId: 14102, stage: 'order', title: { eu: 'Ordena', es: 'Orden', ar: 'الترتيب' }, description: { eu: 'Handiena, txikiena eta tartekoa.', es: 'El mayor, el menor y el intermedio.', ar: 'الأكبر والأصغر والوسيط.' } },
            { progressId: 14103, stage: 'fractions', title: { eu: 'Zatikiak eta biribiltzea', es: 'Fracciones y redondeo', ar: 'الكسور والتقريب' }, description: { eu: 'Zatiki hamartarrak, zatiketak eta biribiltzea.', es: 'Fracciones decimales, divisiones y redondeo.', ar: 'الكسور العشرية والقسمة والتقريب.' } },
            { progressId: 14104, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', ar: 'العمليات' }, description: { eu: 'Batu, kendu, biderkatu eta koma mugitu.', es: 'Suma, resta, multiplica y mueve la coma.', ar: 'اجمع واطرح واضرب وحرّك الفاصلة.' } },
            { progressId: 14105, stage: 'division', title: { eu: 'Zatiketak eta problemak', es: 'Divisiones y problemas', ar: 'القسمة والمسائل' }, description: { eu: 'Zatitu eta erosketak egin.', es: 'Divide y haz la compra.', ar: 'اقسم وتسوّق.' } }
        ]
    },
    {
        id: 'target',
        title: { eu: 'Itua', es: 'Diana', ar: 'الهدف' },
        tagline: { eu: 'Jaurti hamartarra zenbaki-zuzenera. Zenbat eta hurbilago, orduan eta puntu gehiago.', es: 'Lanza el decimal a la recta. Cuanto más cerca, más puntos.', ar: 'ارمِ العدد العشري على خط الأعداد. كلما اقتربت زادت النقاط.' },
        skills: { eu: 'Hamartarrak zuzenean', es: 'Decimales en la recta', ar: 'الأعداد العشرية على المستقيم' },
        levels: [
            { progressId: 14201, stage: 'order', title: { eu: 'Hamarrenak', es: 'Décimas', ar: 'الأعشار' }, description: { eu: '0 eta 2 artean: 0,3, 1,7…', es: 'Entre 0 y 2: 0,3, 1,7…', ar: 'بين 0 و2: 0.3 و1.7…' } },
            { progressId: 14202, stage: 'order', title: { eu: 'Ehunenak', es: 'Centésimas', ar: 'الأجزاء من مئة' }, description: { eu: '0 eta 1 artean: 0,35, 0,82…', es: 'Entre 0 y 1: 0,35, 0,82…', ar: 'بين 0 و1: 0.35 و0.82…' } },
            { progressId: 14203, stage: 'order', title: { eu: '0tik 3ra', es: 'De 0 a 3', ar: 'من 0 إلى 3' }, description: { eu: '1,25, 2,6, 0,85…', es: '1,25, 2,6, 0,85…', ar: '1.25 و2.6 و0.85…' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Hamartarrak, zatikiak eta eragiketak', es: 'Decimales, fracciones y operaciones', ar: 'الأعداد العشرية والكسور والعمليات' },
        levels: [
            { progressId: 14301, stage: 'fractions', title: { eu: 'Zatiki hamartarrak', es: 'Fracciones decimales', ar: 'الكسور العشرية' }, description: { eu: '0,45 ↔ 45/100', es: '0,45 ↔ 45/100', ar: '0.45 ↔ 45/100' } },
            { progressId: 14302, stage: 'fractions', title: { eu: 'Zatikia zatiketa gisa', es: 'La fracción como división', ar: 'الكسر قسمةً' }, description: { eu: '3/4 ↔ 0,75 · 1/3 ↔ 0,333…', es: '3/4 ↔ 0,75 · 1/3 ↔ 0,333…', ar: '3/4 ↔ 0.75 · 1/3 ↔ 0.333…' } },
            { progressId: 14303, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', ar: 'العمليات' }, description: { eu: '2,7 · 1,5 ↔ 4,05', es: '2,7 · 1,5 ↔ 4,05', ar: '2.7 · 1.5 ↔ 4.05' } }
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

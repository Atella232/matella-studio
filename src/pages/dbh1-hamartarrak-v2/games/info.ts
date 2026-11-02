import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import type { TargetLevel } from '../../dbh2-zatikiak-prototype/games/target.ts'

/* ==========================================================================
   Zenbaki hamartarrak (1. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   The target is the 2. DBH game with decimal levels; the memory is the
   engine's pairs game.
   ========================================================================== */

export type DecimalsGameId = 'race' | 'target' | 'memory' | 'comma' | 'podium' | 'detective'

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
    },
    {
        id: 'comma',
        title: { eu: 'Mugitu koma', es: 'Mueve la coma', en: 'Move the comma', ar: 'حرّك الفاصلة' },
        tagline: { eu: 'Zifrak posizio-taulan: ×10 ezkerrera, ÷10 eskuinera.', es: 'Las cifras en la tabla de posiciones: ×10 a la izquierda, ÷10 a la derecha.', en: 'The digits in the place-value table: ×10 to the left, ÷10 to the right.', ar: 'الأرقام في جدول المنازل: ×10 إلى اليسار و÷10 إلى اليمين.' },
        skills: { eu: '10, 100 eta 1000 zenbakiekin biderkatu eta zatitu', es: 'Multiplicar y dividir por 10, 100 y 1000', en: 'Multiplying and dividing by 10, 100 and 1000', ar: 'الضرب والقسمة على 10 و100 و1000' },
        levels: [
            { progressId: 14401, stage: 'operations', title: { eu: '×10, ×100, ×1000', es: '×10, ×100, ×1000', en: '×10, ×100, ×1000', ar: '×10، ×100، ×1000' }, description: { eu: 'Biderkatu eta zatitu.', es: 'Multiplicar y dividir.', en: 'Multiplying and dividing.', ar: 'الضرب والقسمة.' } },
            { progressId: 14402, stage: 'operations', title: { eu: 'Biderkadurak', es: 'Productos', en: 'Products', ar: 'الضرب' }, description: { eu: 'Zenbat zifra hamartar?', es: '¿Cuántas cifras decimales?', en: 'How many decimal places?', ar: 'كم رقمًا عشريًا؟' } },
            { progressId: 14403, stage: 'division', title: { eu: '×0,1 eta ÷0,1', es: '×0,1 y ÷0,1', en: '×0.1 and ÷0.1', ar: '×0.1 و÷0.1' }, description: { eu: 'Ezkerrera ala eskuinera?', es: '¿A la izquierda o a la derecha?', en: 'To the left or to the right?', ar: 'إلى اليسار أم إلى اليمين؟' } }
        ]
    },
    {
        id: 'podium',
        title: { eu: 'Podiuma', es: 'El podio', en: 'The podium', ar: 'المنصة' },
        tagline: { eu: 'Ordenatu hamartarrak txikienetik handienera; gero, zenbaki-zuzenean.', es: 'Ordena los decimales de menor a mayor; luego, en la recta.', en: 'Put the decimals in order from smallest to biggest; then on the number line.', ar: 'رتّب الأعداد العشرية من الأصغر إلى الأكبر، ثم على المستقيم.' },
        skills: { eu: 'Hamartarrak konparatu eta ordenatu', es: 'Comparar y ordenar decimales', en: 'Comparing and ordering decimals', ar: 'مقارنة الأعداد العشرية وترتيبها' },
        levels: [
            { progressId: 14501, stage: 'order', title: { eu: 'Zifra kopuru bera', es: 'Mismas cifras', en: 'Same number of digits', ar: 'عدد الأرقام نفسه' }, description: { eu: 'Bi zifra hamartar denek.', es: 'Todos con dos decimales.', en: 'All with two decimal places.', ar: 'كلها برقمين عشريين.' } },
            { progressId: 14502, stage: 'order', title: { eu: 'Luzera desberdinak', es: 'Distinta longitud', en: 'Different lengths', ar: 'أطوال مختلفة' }, description: { eu: '0,5 eta 0,45: tranpa.', es: '0,5 y 0,45: la trampa.', en: '0.5 and 0.45: the trap.', ar: '0.5 و0.45: الفخ.' } },
            { progressId: 14503, stage: 'order', title: { eu: 'Zeroak', es: 'Ceros', en: 'Zeros', ar: 'الأصفار' }, description: { eu: 'Bost zenbaki: 0,7, 0,07, 0,705…', es: 'Cinco números: 0,7, 0,07, 0,705…', en: 'Five numbers: 0.7, 0.07, 0.705…', ar: 'خمسة أعداد: 0.7 و0.07 و0.705…' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Hamartarren detektibea', es: 'Detective de decimales', en: 'Decimals detective', ar: 'مخبر الأعداد العشرية' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Hamartarrekin akats tipikoak', es: 'Errores típicos con decimales', en: 'Common mistakes with decimals', ar: 'الأخطاء الشائعة في الأعداد العشرية' },
        levels: [
            { progressId: 14601, stage: 'order', title: { eu: 'Ordena eta biribilketa', es: 'Orden y redondeo', en: 'Order and rounding', ar: 'الترتيب والتقريب' }, description: { eu: 'Konparatu, zatikiak eta biribildu.', es: 'Comparar, fracciones y redondear.', en: 'Comparing, fractions and rounding.', ar: 'المقارنة والكسور والتقريب.' } },
            { progressId: 14602, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Batu, biderkatu eta hamarrez zatitu.', es: 'Sumar, multiplicar y dividir entre 10.', en: 'Adding, multiplying and dividing by 10.', ar: 'الجمع والضرب والقسمة على 10.' } },
            { progressId: 14603, stage: 'division', title: { eu: 'Zatiketak eta buruketak', es: 'Divisiones y problemas', en: 'Divisions and problems', ar: 'القسمة والمسائل' }, description: { eu: 'Komak zatiketan eta itzulia.', es: 'Las comas al dividir y el cambio.', en: 'The commas when dividing and the change.', ar: 'الفواصل في القسمة والباقي.' } }
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
export const decimalsGameSlugs: Record<DecimalsGameId, string> = { race: 'lasterketa', target: 'itua', memory: 'memoria', comma: 'koma', podium: 'podiuma', detective: 'detektibea' }

export function decimalsGameModeForPath(pathname: string): DecimalsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['diana', 'itua'].includes(game)) return 'target'
    if (['koma', 'coma'].includes(game)) return 'comma'
    if (['podiuma', 'podio'].includes(game)) return 'podium'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

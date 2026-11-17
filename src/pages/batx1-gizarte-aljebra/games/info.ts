import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { bachEquationsGames } from '../../batx1-zientziak-ekuazioak/games/info.ts'
import { bachSystemsGames } from '../../batx1-zientziak-sistemak/games/info.ts'
import type { GizAlgebraStageId } from '../lessons.tsx'

/* ==========================================================================
   Aljebra (Batxilergoa 1 · Gizarte Zientziak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its first
   star. Three games of its own (square the box office, does it earn or
   lose, and the detective), the race and the memory, and three games of
   1.º Ciencias kept as they are there (make the zero, valid or false, and
   fill in the sign table), with the stages and progress ids of this unit.
   ========================================================================== */

export type GizAlgebraGameId = 'race' | 'box' | 'gain' | 'detective' | 'memory' | 'zero' | 'valid' | 'signs'

export const GIZ_ALGEBRA_GAME_RECORDS_KEY = 'matella-aljebra-batx1g-game-records'

/** A game of 1.º Ciencias with its texts and levels, the stages and progress ids of this unit */
function reused(id: 'zero' | 'valid' | 'signs', stage: GizAlgebraStageId, firstId: number): GameInfo<GizAlgebraGameId> {
    const source = [...bachSystemsGames, ...bachEquationsGames].find((game) => game.id === id)! as GameInfo<string>
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage, progressId: firstId + index })) }
}

export const gizAlgebraGames: GameInfo<GizAlgebraGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Aljebraren lasterketa', es: 'Carrera del álgebra', en: 'Algebra race', ar: 'سباق الجبر' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 132401, stage: 'polynomials', title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'كثيرات الحدود' }, description: { eu: 'Hondarrak, erroak eta zatikiak.', es: 'Restos, raíces y fracciones.', en: 'Remainders, roots and fractions.', ar: 'البواقي والجذور والكسور.' } },
            { progressId: 132402, stage: 'equations', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' }, description: { eu: 'Bikarratuak, erroak, berretzaileak eta logaritmoak.', es: 'Bicuadradas, radicales, exponenciales y logaritmos.', en: 'Biquadratic, radical, exponential and logarithmic.', ar: 'ثنائية التربيع والجذرية والأسية واللوغاريتمية.' } },
            { progressId: 132403, stage: 'systems', title: { eu: 'Sistemak', es: 'Sistemas', en: 'Systems', ar: 'الأنظمة' }, description: { eu: 'Bi prezio, batura eta biderkadura, mailakatuak.', es: 'Dos precios, suma y producto, escalonados.', en: 'Two prices, sum and product, triangular.', ar: 'سعران، والمجموع والجداء، والدرجية.' } },
            { progressId: 132404, stage: 'inequalities', title: { eu: 'Inekuazioak', es: 'Inecuaciones', en: 'Inequalities', ar: 'المتراجحات' }, description: { eu: 'Zenbaki osorik handiena eta zenbat oso.', es: 'El mayor entero y cuántos enteros.', en: 'The greatest integer and how many integers.', ar: 'أكبر عدد صحيح وكم عددًا صحيحًا.' } },
            { progressId: 132405, stage: 'economy', title: { eu: 'Ekonomia', es: 'Economía', en: 'Economics', ar: 'الاقتصاد' }, description: { eu: 'Atalasea, mozkina eta oreka.', es: 'Punto muerto, beneficio y equilibrio.', en: 'Break-even, profit and equilibrium.', ar: 'نقطة التعادل والربح والتوازن.' } }
        ]
    },
    {
        id: 'box',
        title: { eu: 'Koadratu leihatila', es: 'Cuadra la taquilla', en: 'Balance the box office', ar: 'وازن شباك التذاكر' },
        tagline: { eu: 'Badakizu zenbat sarrera saldu diren eta zenbat diru bildu den: zenbat dira prezio bakoitzekoak?', es: 'Sabes cuántas entradas se vendieron y cuánto se recaudó: ¿cuántas hay de cada precio?', en: 'You know how many tickets were sold and how much was taken: how many are there at each price?', ar: 'تعرف كم تذكرة بيعت وكم جُمع من المال: كم تذكرة بكل سعر؟' },
        skills: { eu: 'Sistemak eta Gaussen metodoa', es: 'Sistemas y método de Gauss', en: 'Systems and Gaussian elimination', ar: 'الأنظمة وطريقة غاوس' },
        levels: [
            { progressId: 132501, stage: 'systems', title: { eu: 'Bi prezio', es: 'Dos precios', en: 'Two prices', ar: 'سعران' }, description: { eu: 'Bi ekuazio, bi ezezagun.', es: 'Dos ecuaciones, dos incógnitas.', en: 'Two equations, two unknowns.', ar: 'معادلتان ومجهولان.' } },
            { progressId: 132502, stage: 'systems', title: { eu: 'Hiru prezio', es: 'Tres precios', en: 'Three prices', ar: 'ثلاثة أسعار' }, description: { eu: 'Merkeenak garestienen bikoitza edo hirukoitza.', es: 'De las baratas, el doble o el triple que de las caras.', en: 'Twice or three times as many cheap ones as dear ones.', ar: 'الرخيصة ضعف الغالية أو ثلاثة أضعافها.' } },
            { progressId: 132503, stage: 'systems', title: { eu: 'Beste baldintza bat', es: 'Otra condición', en: 'Another condition', ar: 'شرط آخر' }, description: { eu: 'Merkeenak beste bien adina.', es: 'Tantas baratas como las otras dos juntas.', en: 'As many cheap ones as the other two together.', ar: 'الرخيصة بقدر النوعين الآخرين معًا.' } }
        ]
    },
    {
        id: 'gain',
        title: { eu: 'Irabazi ala galdu?', es: '¿Gana o pierde?', en: 'Earn or lose?', ar: 'ربح أم خسارة؟' },
        tagline: { eu: 'Kostu finkoak, unitateko kostua eta prezioa: negozioak irabazten du, galtzen du ala berdin geratzen da?', es: 'Costes fijos, coste por unidad y precio: ¿el negocio gana, pierde o se queda igual?', en: 'Fixed costs, cost per unit and price: does the business earn, lose or break even?', ar: 'تكاليف ثابتة وتكلفة الوحدة والسعر: هل يربح المشروع أم يخسر أم يتعادل؟' },
        skills: { eu: 'Mozkina eta atalasea', es: 'Beneficio y punto muerto', en: 'Profit and break-even', ar: 'الربح ونقطة التعادل' },
        levels: [
            { progressId: 132601, stage: 'economy', title: { eu: 'Datuekin', es: 'Con datos', en: 'With data', ar: 'بالمعطيات' }, description: { eu: 'Prezioa, kostuak eta unitateak.', es: 'Precio, costes y unidades.', en: 'Price, costs and units.', ar: 'السعر والتكاليف والوحدات.' } },
            { progressId: 132602, stage: 'economy', title: { eu: 'Formulekin', es: 'Con fórmulas', en: 'With formulas', ar: 'بالصيغ' }, description: { eu: 'I(x) eta C(x).', es: 'I(x) y C(x).', en: 'I(x) and C(x).', ar: 'I(x) وC(x).' } },
            { progressId: 132603, stage: 'economy', title: { eu: 'Atalasea', es: 'Punto muerto', en: 'Break-even', ar: 'نقطة التعادل' }, description: { eu: 'F : (p − c), hiru aukeratatik.', es: 'F ÷ (p − c), entre tres opciones.', en: 'F ÷ (p − c), out of three options.', ar: 'F ÷ (p − c) من بين ثلاثة خيارات.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Aljebraren detektibea', es: 'Detective del álgebra', en: 'Algebra detective', ar: 'مخبر الجبر' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 132701, stage: 'equations', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' }, description: { eu: 'Soluzio faltsuak, logaritmoak eta berretzaileak.', es: 'Soluciones falsas, logaritmos y exponentes.', en: 'False solutions, logarithms and exponents.', ar: 'الحلول الزائفة واللوغاريتمات والأسس.' } },
            { progressId: 132702, stage: 'inequalities', title: { eu: 'Sistemak eta inekuazioak', es: 'Sistemas e inecuaciones', en: 'Systems and inequalities', ar: 'الأنظمة والمتراجحات' }, description: { eu: 'Gauss, x zenbakiaz zatitzea eta zeinuak.', es: 'Gauss, dividir entre x y los signos.', en: 'Gauss, dividing by x and the signs.', ar: 'غاوس والقسمة على x والإشارات.' } },
            { progressId: 132703, stage: 'economy', title: { eu: 'Ekonomia', es: 'Economía', en: 'Economics', ar: 'الاقتصاد' }, description: { eu: 'Atalasea, mozkina, oreka eta murrizketak.', es: 'Punto muerto, beneficio, equilibrio y restricciones.', en: 'Break-even, profit, equilibrium and constraints.', ar: 'نقطة التعادل والربح والتوازن والقيود.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: polinomioa eta bere erroak, ekuazio esponentziala eta bere soluzioa, edo atalasea eta bere unitateak.', es: 'Encuentra las parejas: un polinomio y sus raíces, una ecuación exponencial y su solución, o un punto muerto y sus unidades.', en: 'Find the pairs: a polynomial and its roots, an exponential equation and its solution, or a break-even point and its units.', ar: 'جد الأزواج: كثير حدود وجذوره، أو معادلة أسية وحلها، أو نقطة تعادل ووحداتها.' },
        skills: { eu: 'Erroak, berretzaileak eta atalaseak', es: 'Raíces, exponentes y puntos muertos', en: 'Roots, exponents and break-even points', ar: 'الجذور والأسس ونقاط التعادل' },
        levels: [
            { progressId: 132801, stage: 'polynomials', title: { eu: 'Erroak', es: 'Raíces', en: 'Roots', ar: 'الجذور' }, description: { eu: 'x² − 5x + 6 ↔ 2 eta 3', es: 'x² − 5x + 6 ↔ 2 y 3', en: 'x² − 5x + 6 ↔ 2 and 3', ar: 'x² − 5x + 6 ↔ 2 و3' } },
            { progressId: 132802, stage: 'equations', title: { eu: 'Esponentzialak', es: 'Exponenciales', en: 'Exponentials', ar: 'الأسية' }, description: { eu: '2ˣ = 32 ↔ x = 5', es: '2ˣ = 32 ↔ x = 5', en: '2ˣ = 32 ↔ x = 5', ar: '2ˣ = 32 ↔ x = 5' } },
            { progressId: 132803, stage: 'economy', title: { eu: 'Atalaseak', es: 'Puntos muertos', en: 'Break-even points', ar: 'نقاط التعادل' }, description: { eu: '600 : (9 − 5) ↔ 150', es: '600 ÷ (9 − 5) ↔ 150', en: '600 ÷ (9 − 5) ↔ 150', ar: '600 ÷ (9 − 5) ↔ 150' } }
        ]
    },
    reused('zero', 'systems', 132811),
    reused('valid', 'equations', 132821),
    reused('signs', 'inequalities', 132831)
]

export const gizAlgebraGameProgressIds: number[] = levelProgressIds(gizAlgebraGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const gizAlgebraGameSlugs: Record<GizAlgebraGameId, string> = { race: 'lasterketa', box: 'leihatila', gain: 'irabazi', detective: 'detektibea', memory: 'memoria', zero: 'zeroa', valid: 'baliozkoa', signs: 'zeinuak' }

export function gizAlgebraGameModeForPath(pathname: string): GizAlgebraGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['leihatila', 'taquilla'].includes(game)) return 'box'
    if (['irabazi', 'gana'].includes(game)) return 'gain'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['zeroa', 'cero'].includes(game)) return 'zero'
    if (['baliozkoa', 'valida'].includes(game)) return 'valid'
    if (['zeinuak', 'signos'].includes(game)) return 'signs'
    return 'hub'
}

import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { equationsGames } from '../../dbh4-akademikoak-ekuazioak/games/info.ts'
import { polynomialsGames } from '../../dbh4-akademikoak-polinomioak/games/info.ts'
import type { BachEquationsStageId } from '../lessons.tsx'

/* ==========================================================================
   Ekuazioak eta inekuazioak (Batxilergoa 1 · Zientziak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star. Three games of its own (valid or false, the sign
   table and the detective), the race and the memory, and four games of
   4. DBH kept for the review (is it a solution?, paint the solution, the
   root hunt and simplify the fraction), with their texts and levels but
   the stages and progress ids of this unit.
   ========================================================================== */

export type BachEquationsGameId = 'race' | 'valid' | 'signs' | 'detective' | 'memory' | 'check' | 'paint' | 'hunt' | 'simplify'

export const BACH_EQUATIONS_GAME_RECORDS_KEY = 'matella-ekuazioak-batx1z-game-records'

/** A 4. DBH game with its texts and levels, the stages and progress ids of this unit */
function reused(source: GameInfo<string>, id: BachEquationsGameId, stages: BachEquationsStageId[], firstId: number): GameInfo<BachEquationsGameId> {
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}
const fromEquations = (id: 'check' | 'paint') => equationsGames.find((game) => game.id === id)!
const fromPolynomials = (id: 'hunt' | 'simplify') => polynomialsGames.find((game) => game.id === id)!

export const bachEquationsGames: GameInfo<BachEquationsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Ekuazioen lasterketa', es: 'Carrera de ecuaciones', en: 'Equation race', ar: 'سباق المعادلات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 101401, stage: 'polynomials', title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'كثيرات الحدود' }, description: { eu: 'Hondarra, erroa eta parametroa.', es: 'Resto, raíz y parámetro.', en: 'Remainder, root and parameter.', ar: 'الباقي والجذر والوسيط.' } },
            { progressId: 101402, stage: 'polynomial-equations', title: { eu: 'Ekuazio polinomikoak', es: 'Ecuaciones polinómicas', en: 'Polynomial equations', ar: 'المعادلات الحدودية' }, description: { eu: 'Hirugarren maila, bikarratuak eta x⁶.', es: 'Tercer grado, bicuadradas y x⁶.', en: 'Third degree, biquadratics and x⁶.', ar: 'الدرجة الثالثة وثنائية التربيع وx⁶.' } },
            { progressId: 101403, stage: 'radical-absolute', title: { eu: 'Erroak eta balio absolutua', es: 'Radicales y valor absoluto', en: 'Radicals and absolute value', ar: 'الجذور والقيمة المطلقة' }, description: { eu: 'Soluzio faltsuak eta bi kasuak.', es: 'Soluciones falsas y los dos casos.', en: 'False solutions and the two cases.', ar: 'الحلول الزائفة والحالتان.' } },
            { progressId: 101404, stage: 'exp-log', title: { eu: 'Esponentzialak eta logaritmoak', es: 'Exponenciales y logaritmos', en: 'Exponentials and logarithms', ar: 'الأسية واللوغاريتمية' }, description: { eu: 'Oinarri bera, t = 2ˣ eta logaritmoak.', es: 'Misma base, t = 2ˣ y logaritmos.', en: 'Same base, t = 2ˣ and logarithms.', ar: 'الأساس نفسه وt = 2ˣ واللوغاريتمات.' } },
            { progressId: 101405, stage: 'inequalities', title: { eu: 'Inekuazioak', es: 'Inecuaciones', en: 'Inequalities', ar: 'المتراجحات' }, description: { eu: 'Zenbat oso, balio absolutua eta zatidurak.', es: 'Cuántos enteros, valor absoluto y cocientes.', en: 'How many integers, absolute value and quotients.', ar: 'كم عددًا صحيحًا والقيمة المطلقة وخوارج القسمة.' } }
        ]
    },
    {
        id: 'valid',
        title: { eu: 'Baliozkoa ala faltsua?', es: '¿Válida o falsa?', en: 'True or false?', ar: 'صحيح أم زائف؟' },
        tagline: { eu: 'Ekuazio bat ebatzita, bere hautagaiekin: esan bakoitzak balio duen eta, ez badu, zergatik.', es: 'Una ecuación ya resuelta con sus candidatas: di si cada una vale y, si no, por qué.', en: 'An equation already solved, with its candidates: say whether each one works and, if not, why.', ar: 'معادلة محلولة مع مرشحيها: قل هل يصلح كل واحد، وإن لم يصلح فلماذا.' },
        skills: { eu: 'Soluzio faltsuak eta zergatik agertzen diren', es: 'Las soluciones falsas y por qué salen', en: 'False solutions and why they appear', ar: 'الحلول الزائفة ولماذا تظهر' },
        levels: [
            { progressId: 101501, stage: 'radical-absolute', title: { eu: 'Zatikiak eta erroak', es: 'Fracciones y radicales', en: 'Fractions and radicals', ar: 'الكسور والجذور' }, description: { eu: 'Izendatzailea 0 edo erro negatiboa.', es: 'Denominador 0 o raíz negativa.', en: 'Denominator 0 or a negative root.', ar: 'مقام 0 أو جذر سالب.' } },
            { progressId: 101502, stage: 'exp-log', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'Negatibo baten logaritmorik ez dago.', es: 'No hay logaritmo de un negativo.', en: 'There is no logarithm of a negative number.', ar: 'لا لوغاريتم لعدد سالب.' } },
            { progressId: 101503, stage: 'exp-log', title: { eu: 'Denak nahastuta', es: 'Todo mezclado', en: 'All mixed up', ar: 'الكل مختلط' }, description: { eu: 'Zatikiak, erroak eta logaritmoak.', es: 'Fracciones, radicales y logaritmos.', en: 'Fractions, radicals and logarithms.', ar: 'الكسور والجذور واللوغاريتمات.' } }
        ]
    },
    {
        id: 'signs',
        title: { eu: 'Bete zeinuen taula', es: 'Rellena la tabla de signos', en: 'Fill in the sign table', ar: 'املأ جدول الإشارات' },
        tagline: { eu: 'Erroek zuzena zatitzen dute: jarri + edo − zati bakoitzean eta aukeratu soluzioa.', es: 'Las raíces cortan la recta: pon + o − en cada tramo y elige la solución.', en: 'The roots cut the line: put + or − on each piece and choose the solution.', ar: 'تقطع الجذور المستقيم: ضع + أو − على كل جزء واختر الحل.' },
        skills: { eu: 'Inekuazio polinomikoak eta arrazionalak', es: 'Inecuaciones polinómicas y racionales', en: 'Polynomial and rational inequalities', ar: 'المتراجحات الحدودية والكسرية' },
        levels: [
            { progressId: 101601, stage: 'inequalities', title: { eu: 'Bi faktore', es: 'Dos factores', en: 'Two factors', ar: 'عاملان' }, description: { eu: '(x − a)(x − b) > 0', es: '(x − a)(x − b) > 0', en: '(x − a)(x − b) > 0', ar: '(x − a)(x − b) > 0' } },
            { progressId: 101602, stage: 'inequalities', title: { eu: 'Hiru faktore', es: 'Tres factores', en: 'Three factors', ar: 'ثلاثة عوامل' }, description: { eu: 'Erro bikoitzak ere bai.', es: 'También raíces dobles.', en: 'Double roots too.', ar: 'والجذور المضاعفة أيضًا.' } },
            { progressId: 101603, stage: 'inequalities', title: { eu: 'Zatidurak', es: 'Cocientes', en: 'Quotients', ar: 'خوارج القسمة' }, description: { eu: 'Izendatzailearen zuloa.', es: 'El agujero del denominador.', en: 'The hole of the denominator.', ar: 'ثقب المقام.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Ekuazioen detektibea', es: 'Detective de ecuaciones', en: 'Equations detective', ar: 'مخبر المعادلات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 101701, stage: 'polynomial-equations', title: { eu: 'Ekuazio polinomikoak', es: 'Ecuaciones polinómicas', en: 'Polynomial equations', ar: 'المعادلات الحدودية' }, description: { eu: 'x zenbakiaz zatitzea, t negatiboa eta izendatzaileak.', es: 'Dividir entre x, t negativo y denominadores.', en: 'Dividing by x, a negative t and denominators.', ar: 'القسمة على x وt السالب والمقامات.' } },
            { progressId: 101702, stage: 'exp-log', title: { eu: 'Erroak, balio absolutua eta logaritmoak', es: 'Radicales, valor absoluto y logaritmos', en: 'Radicals, absolute value and logarithms', ar: 'الجذور والقيمة المطلقة واللوغاريتمات' }, description: { eu: 'Karratua, bi kasuak eta logaritmoen arauak.', es: 'El cuadrado, los dos casos y las reglas de los logaritmos.', en: 'Squaring, the two cases and the rules of logarithms.', ar: 'التربيع والحالتان وقواعد اللوغاريتمات.' } },
            { progressId: 101703, stage: 'inequalities', title: { eu: 'Inekuazioak', es: 'Inecuaciones', en: 'Inequalities', ar: 'المتراجحات' }, description: { eu: 'Zeinua, izendatzailea eta balio absolutua.', es: 'El signo, el denominador y el valor absoluto.', en: 'The sign, the denominator and the absolute value.', ar: 'الإشارة والمقام والقيمة المطلقة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: ekuazio bat eta bere soluzioak, edo inekuazio bat eta bere tartea.', es: 'Encuentra las parejas: una ecuación y sus soluciones, o una inecuación y su intervalo.', en: 'Find the pairs: an equation and its solutions, or an inequality and its interval.', ar: 'اعثر على الأزواج: معادلة وحلولها، أو متراجحة ومجالها.' },
        skills: { eu: 'Soluzioak eta tarteak', es: 'Soluciones e intervalos', en: 'Solutions and intervals', ar: 'الحلول والمجالات' },
        levels: [
            { progressId: 101801, stage: 'polynomial-equations', title: { eu: 'Bigarren maila', es: 'Segundo grado', en: 'Second degree', ar: 'الدرجة الثانية' }, description: { eu: 'x² − 5x + 6 = 0 ↔ 2, 3', es: 'x² − 5x + 6 = 0 ↔ 2, 3', en: 'x² − 5x + 6 = 0 ↔ 2, 3', ar: 'x² − 5x + 6 = 0 ↔ 2, 3' } },
            { progressId: 101802, stage: 'exp-log', title: { eu: 'Berretzaileak eta logaritmoak', es: 'Exponentes y logaritmos', en: 'Exponents and logarithms', ar: 'الأسس واللوغاريتمات' }, description: { eu: '2ˣ⁺¹ = 16 ↔ 3', es: '2ˣ⁺¹ = 16 ↔ 3', en: '2ˣ⁺¹ = 16 ↔ 3', ar: '2ˣ⁺¹ = 16 ↔ 3' } },
            { progressId: 101803, stage: 'inequalities', title: { eu: 'Tarteak', es: 'Intervalos', en: 'Intervals', ar: 'المجالات' }, description: { eu: '|x − 2| < 3 ↔ (−1, 5)', es: '|x − 2| < 3 ↔ (−1, 5)', en: '|x − 2| < 3 ↔ (−1, 5)', ar: '|x − 2| < 3 ↔ (−1, 5)' } }
        ]
    },
    reused(fromEquations('check'), 'check', ['radical-absolute', 'polynomial-equations', 'polynomial-equations'], 101811),
    reused(fromEquations('paint'), 'paint', ['inequalities', 'inequalities', 'inequalities'], 101821),
    reused(fromPolynomials('hunt'), 'hunt', ['polynomials', 'polynomials', 'polynomials'], 101831),
    reused(fromPolynomials('simplify'), 'simplify', ['polynomials', 'polynomials', 'polynomials'], 101841)
]

export const bachEquationsGameProgressIds: number[] = levelProgressIds(bachEquationsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachEquationsGameSlugs: Record<BachEquationsGameId, string> = { race: 'lasterketa', valid: 'baliozkoa', signs: 'zeinuak', detective: 'detektibea', memory: 'memoria', check: 'soluzioa', paint: 'margotu', hunt: 'erroak', simplify: 'sinplifikatu' }

export function bachEquationsGameModeForPath(pathname: string): BachEquationsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['baliozkoa', 'valida'].includes(game)) return 'valid'
    if (['zeinuak', 'signos'].includes(game)) return 'signs'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['soluzioa', 'es-solucion'].includes(game)) return 'check'
    if (['margotu', 'pinta'].includes(game)) return 'paint'
    if (['erroak', 'raices'].includes(game)) return 'hunt'
    if (['sinplifikatu', 'simplifica'].includes(game)) return 'simplify'
    return 'hub'
}

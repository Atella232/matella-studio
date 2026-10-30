import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Ekuazioak eta inekuazioak (4. DBH akademikoak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star.
   ========================================================================== */

export type EquationsGameId = 'race' | 'memory'

export const EQUATIONS_GAME_RECORDS_KEY = 'matella-ekuazioak-dbh4ak-game-records'

export const equationsGames: GameInfo<EquationsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Ekuazioen lasterketa', es: 'Carrera de ecuaciones', en: 'Equation race', ar: 'سباق المعادلات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 66101, stage: 'quadratic', title: { eu: 'Bigarren maila', es: 'Segundo grado', en: 'Second degree', ar: 'الدرجة الثانية' }, description: { eu: 'Diskriminatzailea, erroak, batura eta biderkadura.', es: 'Discriminante, raíces, suma y producto.', en: 'Discriminant, roots, sum and product.', ar: 'المميّز والجذور والمجموع والجداء.' } },
            { progressId: 66102, stage: 'other', title: { eu: 'Beste ekuazio batzuk', es: 'Otras ecuaciones', en: 'Other equations', ar: 'معادلات أخرى' }, description: { eu: 'Bikarratuak, faktorizatuak eta arrazionalak.', es: 'Bicuadradas, factorizadas y racionales.', en: 'Biquadratic, factorised and rational.', ar: 'الثنائية التربيع والمحلّلة والكسرية.' } },
            { progressId: 66103, stage: 'exponential', title: { eu: 'Erroak eta berretzaileak', es: 'Raíces y exponentes', en: 'Roots and exponents', ar: 'الجذور والأسس' }, description: { eu: 'Irrazionalak, esponentzialak eta logaritmoak.', es: 'Irracionales, exponenciales y logaritmos.', en: 'Irrational, exponential and logarithmic equations.', ar: 'الجذرية والأسية واللوغاريتمات.' } },
            { progressId: 66104, stage: 'inequalities', title: { eu: 'Inekuazioak', es: 'Inecuaciones', en: 'Inequalities', ar: 'المتراجحات' }, description: { eu: 'Ebazpen osoak, zentzua eta problemak.', es: 'Soluciones enteras, el sentido y problemas.', en: 'Integer solutions, sense and problems.', ar: 'الحلول الصحيحة والاتجاه والمسائل.' } },
            { progressId: 66105, stage: 'quadratic-inequalities', title: { eu: 'Bigarren maila eta sistemak', es: 'Segundo grado y sistemas', en: 'Second degree and systems', ar: 'الدرجة الثانية والأنظمة' }, description: { eu: 'Zenbat oso, parabola eta zuzena, sistemak.', es: 'Cuántos enteros, parábola y recta, sistemas.', en: 'How many integers, parabola and straight line, systems.', ar: 'كم عددًا صحيحًا، والقطع والمستقيم، والأنظمة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu ekuazio edo inekuazio bakoitza bere bikotearekin.', es: 'Une cada ecuación o inecuación con su pareja.', en: 'Match each equation or inequality with its pair.', ar: 'صِل كل معادلة أو متراجحة بشريكتها.' },
        skills: { eu: 'Batura eta biderkadura, eta tarteak', es: 'Suma y producto, e intervalos', en: 'Sum and product, and intervals', ar: 'المجموع والجداء، والمجالات' },
        levels: [
            { progressId: 66201, stage: 'quadratic', title: { eu: 'Batura eta biderkadura', es: 'Suma y producto', en: 'Sum and product', ar: 'المجموع والجداء' }, description: { eu: 'S = 5, P = 6 ↔ x² − 5x + 6', es: 'S = 5, P = 6 ↔ x² − 5x + 6', en: 'S = 5, P = 6 ↔ x² − 5x + 6', ar: 'S = 5, P = 6 ↔ x² − 5x + 6' } },
            { progressId: 66202, stage: 'inequalities', title: { eu: 'Inekuazioak', es: 'Inecuaciones', en: 'Inequalities', ar: 'المتراجحات' }, description: { eu: '−2x + 1 < 7 ↔ (−3, +∞)', es: '−2x + 1 < 7 ↔ (−3, +∞)', en: '−2x + 1 < 7 ↔ (−3, +∞)', ar: '−2x + 1 < 7 ↔ (−3, +∞)' } },
            { progressId: 66203, stage: 'quadratic-inequalities', title: { eu: 'Bigarren mailakoak', es: 'De segundo grado', en: 'Second degree', ar: 'من الدرجة الثانية' }, description: { eu: 'x² − 4 ≤ 0 ↔ [−2, 2]', es: 'x² − 4 ≤ 0 ↔ [−2, 2]', en: 'x² − 4 ≤ 0 ↔ [−2, 2]', ar: 'x² − 4 ≤ 0 ↔ [−2, 2]' } }
        ]
    }
]

export const equationsGameProgressIds: number[] = levelProgressIds(equationsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const equationsGameSlugs: Record<EquationsGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function equationsGameModeForPath(pathname: string): EquationsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

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
        title: { eu: 'Ekuazioen lasterketa', es: 'Carrera de ecuaciones', ar: 'سباق المعادلات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 66101, stage: 'quadratic', title: { eu: 'Bigarren maila', es: 'Segundo grado', ar: 'الدرجة الثانية' }, description: { eu: 'Diskriminatzailea, erroak, batura eta biderkadura.', es: 'Discriminante, raíces, suma y producto.', ar: 'المميّز والجذور والمجموع والجداء.' } },
            { progressId: 66102, stage: 'other', title: { eu: 'Beste ekuazio batzuk', es: 'Otras ecuaciones', ar: 'معادلات أخرى' }, description: { eu: 'Bikarratuak, faktorizatuak eta arrazionalak.', es: 'Bicuadradas, factorizadas y racionales.', ar: 'الثنائية التربيع والمحلّلة والكسرية.' } },
            { progressId: 66103, stage: 'exponential', title: { eu: 'Erroak eta berretzaileak', es: 'Raíces y exponentes', ar: 'الجذور والأسس' }, description: { eu: 'Irrazionalak, esponentzialak eta logaritmoak.', es: 'Irracionales, exponenciales y logaritmos.', ar: 'الجذرية والأسية واللوغاريتمات.' } },
            { progressId: 66104, stage: 'inequalities', title: { eu: 'Inekuazioak', es: 'Inecuaciones', ar: 'المتراجحات' }, description: { eu: 'Ebazpen osoak, zentzua eta problemak.', es: 'Soluciones enteras, el sentido y problemas.', ar: 'الحلول الصحيحة والاتجاه والمسائل.' } },
            { progressId: 66105, stage: 'quadratic-inequalities', title: { eu: 'Bigarren maila eta sistemak', es: 'Segundo grado y sistemas', ar: 'الدرجة الثانية والأنظمة' }, description: { eu: 'Zenbat oso, parabola eta zuzena, sistemak.', es: 'Cuántos enteros, parábola y recta, sistemas.', ar: 'كم عددًا صحيحًا، والقطع والمستقيم، والأنظمة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu ekuazio edo inekuazio bakoitza bere bikotearekin.', es: 'Une cada ecuación o inecuación con su pareja.', ar: 'صِل كل معادلة أو متراجحة بشريكتها.' },
        skills: { eu: 'Batura eta biderkadura, eta tarteak', es: 'Suma y producto, e intervalos', ar: 'المجموع والجداء، والمجالات' },
        levels: [
            { progressId: 66201, stage: 'quadratic', title: { eu: 'Batura eta biderkadura', es: 'Suma y producto', ar: 'المجموع والجداء' }, description: { eu: 'S = 5, P = 6 ↔ x² − 5x + 6', es: 'S = 5, P = 6 ↔ x² − 5x + 6', ar: 'S = 5, P = 6 ↔ x² − 5x + 6' } },
            { progressId: 66202, stage: 'inequalities', title: { eu: 'Inekuazioak', es: 'Inecuaciones', ar: 'المتراجحات' }, description: { eu: '−2x + 1 < 7 ↔ (−3, +∞)', es: '−2x + 1 < 7 ↔ (−3, +∞)', ar: '−2x + 1 < 7 ↔ (−3, +∞)' } },
            { progressId: 66203, stage: 'quadratic-inequalities', title: { eu: 'Bigarren mailakoak', es: 'De segundo grado', ar: 'من الدرجة الثانية' }, description: { eu: 'x² − 4 ≤ 0 ↔ [−2, 2]', es: 'x² − 4 ≤ 0 ↔ [−2, 2]', ar: 'x² − 4 ≤ 0 ↔ [−2, 2]' } }
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

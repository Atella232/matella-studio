import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Ekuazioak eta sistemak (4. DBH aplikatuak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star.
   ========================================================================== */

export type EquationsSystemsGameId = 'race' | 'memory'

export const EQUATIONS_SYSTEMS_GAME_RECORDS_KEY = 'matella-ekuazioak-dbh4ap-game-records'

export const equationsSystemsGames: GameInfo<EquationsSystemsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Ekuazioen lasterketa', es: 'Carrera de ecuaciones', en: 'Equation race', ar: 'سباق المعادلات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 48101, stage: 'first-degree', title: { eu: 'Lehen maila', es: 'Primer grado', en: 'First degree', ar: 'الدرجة الأولى' }, description: { eu: 'Parentesiak eta izendatzaileak.', es: 'Paréntesis y denominadores.', en: 'Brackets and denominators.', ar: 'الأقواس والمقامات.' } },
            { progressId: 48102, stage: 'quadratic', title: { eu: 'Bigarren maila', es: 'Segundo grado', en: 'Second degree', ar: 'الدرجة الثانية' }, description: { eu: 'Formula orokorra eta diskriminatzailea.', es: 'Fórmula general y discriminante.', en: 'General formula and discriminant.', ar: 'الصيغة العامة والمميّز.' } },
            { progressId: 48103, stage: 'other', title: { eu: 'Beste ekuazio batzuk', es: 'Otras ecuaciones', en: 'Other equations', ar: 'معادلات أخرى' }, description: { eu: 'Faktorizatuak, erroak eta zenbaki jarraiak.', es: 'Factorizadas, radicales y consecutivos.', en: 'Factorised, radical and consecutive numbers.', ar: 'المحلَّلة والجذرية والأعداد المتتالية.' } },
            { progressId: 48104, stage: 'systems', title: { eu: 'Sistemak', es: 'Sistemas', en: 'Systems', ar: 'الأنظمة' }, description: { eu: 'Zuzen baten puntuak eta ordezkapena.', es: 'Puntos de una recta y sustitución.', en: 'Points on a straight line and substitution.', ar: 'نقاط المستقيم والتعويض.' } },
            { progressId: 48105, stage: 'methods', title: { eu: 'Laburketa eta problemak', es: 'Reducción y problemas', en: 'Elimination and problems', ar: 'الحذف والمسائل' }, description: { eu: 'Laburketa, buruak eta hankak, batura eta kendura.', es: 'Reducción, cabezas y patas, suma y diferencia.', en: 'Elimination, heads and legs, sum and difference.', ar: 'الحذف والرؤوس والأرجل والمجموع والفرق.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu ekuazio edo sistema bakoitza bere ebazpenarekin.', es: 'Une cada ecuación o sistema con su solución.', en: 'Match each equation or system with its solution.', ar: 'صِل كل معادلة أو نظام بحلّه.' },
        skills: { eu: 'Lehen maila, faktorizatuak eta sistemak', es: 'Primer grado, factorizadas y sistemas', en: 'First-degree, factorised and systems', ar: 'الدرجة الأولى والمحلَّلة والأنظمة' },
        levels: [
            { progressId: 48201, stage: 'first-degree', title: { eu: 'Lehen mailakoak', es: 'De primer grado', en: 'First-degree', ar: 'من الدرجة الأولى' }, description: { eu: '3x + 2 = 14 ↔ x = 4', es: '3x + 2 = 14 ↔ x = 4', en: '3x + 2 = 14 ↔ x = 4', ar: '3x + 2 = 14 ↔ x = 4' } },
            { progressId: 48202, stage: 'other', title: { eu: 'Faktorizatuak', es: 'Factorizadas', en: 'Factorised', ar: 'المحلَّلة' }, description: { eu: '(x − 2)(x + 3) = 0 ↔ x = −3, x = 2', es: '(x − 2)(x + 3) = 0 ↔ x = −3, x = 2', en: '(x − 2)(x + 3) = 0 ↔ x = −3, x = 2', ar: '(x − 2)(x + 3) = 0 ↔ x = −3, x = 2' } },
            { progressId: 48203, stage: 'systems', title: { eu: 'Sistemak', es: 'Sistemas', en: 'Systems', ar: 'الأنظمة' }, description: { eu: 'x + y = 5, x − y = 1 ↔ x = 3, y = 2', es: 'x + y = 5, x − y = 1 ↔ x = 3, y = 2', en: 'x + y = 5, x − y = 1 ↔ x = 3, y = 2', ar: 'x + y = 5, x − y = 1 ↔ x = 3, y = 2' } }
        ]
    }
]

export const equationsSystemsGameProgressIds: number[] = levelProgressIds(equationsSystemsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const equationsSystemsGameSlugs: Record<EquationsSystemsGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function equationsSystemsGameModeForPath(pathname: string): EquationsSystemsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

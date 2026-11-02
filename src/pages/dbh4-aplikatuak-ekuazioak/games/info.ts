import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Ekuazioak eta sistemak (4. DBH aplikatuak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star.
   ========================================================================== */

export type EquationsSystemsGameId = 'race' | 'memory' | 'build' | 'cross' | 'detective'

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
    },
    {
        id: 'build',
        title: { eu: 'Eraiki ekuazioa', es: 'Construye la ecuación', en: 'Build the equation', ar: 'ابنِ المعادلة' },
        tagline: { eu: 'Bi soluzio: aurkitu b eta c, x² + bx + c = 0 ekuazioan.', es: 'Dos soluciones: halla b y c en x² + bx + c = 0.', en: 'Two solutions: find b and c in x² + bx + c = 0.', ar: 'حلان: أوجد b وc في x² + bx + c = 0.' },
        skills: { eu: 'Soluzioen batura eta biderkadura', es: 'Suma y producto de soluciones', en: 'Sum and product of the solutions', ar: 'مجموع الحلين وجداؤهما' },
        levels: [
            { progressId: 48301, stage: 'quadratic', title: { eu: 'Soluzio positiboak', es: 'Soluciones positivas', en: 'Positive solutions', ar: 'حلول موجبة' }, description: { eu: 'x₁ = 2, x₂ = 5', es: 'x₁ = 2, x₂ = 5', en: 'x₁ = 2, x₂ = 5', ar: 'x₁ = 2، x₂ = 5' } },
            { progressId: 48302, stage: 'quadratic', title: { eu: 'Negatiboak ere bai', es: 'También negativas', en: 'Negatives too', ar: 'وسالبة أيضًا' }, description: { eu: 'x₁ = −3, x₂ = 4', es: 'x₁ = −3, x₂ = 4', en: 'x₁ = −3, x₂ = 4', ar: 'x₁ = −3، x₂ = 4' } },
            { progressId: 48303, stage: 'quadratic', title: { eu: 'Soluzio bikoitza', es: 'Solución doble', en: 'Double solution', ar: 'حل مضاعف' }, description: { eu: 'Batzuetan x₁ = x₂.', es: 'A veces x₁ = x₂.', en: 'Sometimes x₁ = x₂.', ar: 'أحيانًا x₁ = x₂.' } }
        ]
    },
    {
        id: 'cross',
        title: { eu: 'Ebaki-puntua', es: 'El punto de corte', en: 'The crossing point', ar: 'نقطة التقاطع' },
        tagline: { eu: 'Bi zuzen: sakatu sistemaren soluzioa den puntua.', es: 'Dos rectas: pulsa el punto que resuelve el sistema.', en: 'Two lines: tap the point that solves the system.', ar: 'مستقيمان: اضغط النقطة التي تحل النظام.' },
        skills: { eu: 'Sistemak grafikoki ebaztea', es: 'Resolver sistemas gráficamente', en: 'Solving systems on a graph', ar: 'حل الأنظمة بيانيًا' },
        levels: [
            { progressId: 48401, stage: 'systems', title: { eu: 'y = mx + n', es: 'y = mx + n', en: 'y = mx + n', ar: 'y = mx + n' }, description: { eu: 'Lehen koadrantean.', es: 'En el primer cuadrante.', en: 'In the first quadrant.', ar: 'في الربع الأول.' } },
            { progressId: 48402, stage: 'systems', title: { eu: 'ax + by = c', es: 'ax + by = c', en: 'ax + by = c', ar: 'ax + by = c' }, description: { eu: 'Lau koadranteetan.', es: 'En los cuatro cuadrantes.', en: 'In all four quadrants.', ar: 'في الأرباع الأربعة.' } },
            { progressId: 48403, stage: 'systems', title: { eu: 'Nahastuta', es: 'Mezcladas', en: 'Mixed', ar: 'مختلطة' }, description: { eu: 'Bi formak.', es: 'Las dos formas.', en: 'Both forms.', ar: 'الصيغتان.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Ekuazioen detektibea', es: 'Detective de ecuaciones', en: 'Equations detective', ar: 'مخبر المعادلات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Ekuazioetako akats tipikoak', es: 'Errores típicos con ecuaciones', en: 'Common mistakes with equations', ar: 'الأخطاء الشائعة في المعادلات' },
        levels: [
            { progressId: 48501, stage: 'first-degree', title: { eu: 'Lehen maila', es: 'Primer grado', en: 'First degree', ar: 'الدرجة الأولى' }, description: { eu: 'Gaiak lekuz aldatu eta x askatu.', es: 'Transponer y despejar.', en: 'Moving terms and solving for x.', ar: 'نقل الحدود وعزل x.' } },
            { progressId: 48502, stage: 'quadratic', title: { eu: 'Bigarren maila', es: 'Segundo grado', en: 'Second degree', ar: 'الدرجة الثانية' }, description: { eu: 'Bi soluzio, faktorizazioa eta formula.', es: 'Dos soluciones, factorizar y la fórmula.', en: 'Two solutions, factorising and the formula.', ar: 'حلان والتحليل والقانون العام.' } },
            { progressId: 48503, stage: 'methods', title: { eu: 'Sistemak', es: 'Sistemas', en: 'Systems', ar: 'الأنظمة' }, description: { eu: 'Ordezkapena eta laburpena.', es: 'Sustitución y reducción.', en: 'Substitution and elimination.', ar: 'التعويض والحذف.' } }
        ]
    }
]

export const equationsSystemsGameProgressIds: number[] = levelProgressIds(equationsSystemsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const equationsSystemsGameSlugs: Record<EquationsSystemsGameId, string> = { race: 'lasterketa', memory: 'memoria', build: 'eraiki', cross: 'ebakidura', detective: 'detektibea' }

export function equationsSystemsGameModeForPath(pathname: string): EquationsSystemsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['eraiki', 'construye'].includes(game)) return 'build'
    if (['ebakidura', 'corte'].includes(game)) return 'cross'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

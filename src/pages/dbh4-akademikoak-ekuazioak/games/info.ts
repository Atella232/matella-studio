import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Ekuazioak eta inekuazioak (4. DBH akademikoak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star.
   ========================================================================== */

export type EquationsGameId = 'race' | 'memory' | 'check' | 'paint' | 'detective'

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
    },
    {
        id: 'check',
        title: { eu: 'Soluzioa al da?', es: '¿Es solución?', en: 'Is it a solution?', ar: 'هل هو حل؟' },
        tagline: { eu: 'Hautagaien artean, hautatu benetako soluzioak: kontuz faltsuekin.', es: 'Entre los candidatos, elige las soluciones de verdad: cuidado con las falsas.', en: 'Among the candidates, choose the true solutions: watch out for the false ones.', ar: 'من بين المرشحين اختر الحلول الحقيقية: انتبه للزائفة.' },
        skills: { eu: 'Erroak, zatikiak eta bikarratuak', es: 'Radicales, fracciones y bicuadradas', en: 'Radicals, fractions and biquadratics', ar: 'الجذور والكسور والمعادلات ثنائية التربيع' },
        levels: [
            { progressId: 66301, stage: 'other', title: { eu: 'Erroak', es: 'Radicales', en: 'Radicals', ar: 'الجذور' }, description: { eu: '√(x + c) = x + d', es: '√(x + c) = x + d', en: '√(x + c) = x + d', ar: '√(x + c) = x + d' } },
            { progressId: 66302, stage: 'other', title: { eu: 'Zatikiak', es: 'Fracciones', en: 'Fractions', ar: 'الكسور' }, description: { eu: 'Izendatzailea zero ez.', es: 'El denominador no puede ser 0.', en: 'The denominator cannot be 0.', ar: 'لا يكون المقام صفرًا.' } },
            { progressId: 66303, stage: 'quadratic', title: { eu: 'Bikarratuak', es: 'Bicuadradas', en: 'Biquadratics', ar: 'ثنائية التربيع' }, description: { eu: 't = x²', es: 't = x²', en: 't = x²', ar: 't = x²' } }
        ]
    },
    {
        id: 'paint',
        title: { eu: 'Margotu soluzioa', es: 'Pinta la solución', en: 'Paint the solution', ar: 'لوّن الحل' },
        tagline: { eu: 'Zuzena erroetan mozten da: piztu inekuazioa betetzen duten zatiak.', es: 'La recta se corta en las raíces: enciende los trozos que cumplen la inecuación.', en: 'The line is cut at the roots: switch on the pieces that solve the inequality.', ar: 'يُقطع المستقيم عند الجذور: أضئ الأجزاء التي تحقق المتباينة.' },
        skills: { eu: 'Inekuazioak', es: 'Inecuaciones', en: 'Inequalities', ar: 'المتباينات' },
        levels: [
            { progressId: 66401, stage: 'inequalities', title: { eu: 'Lehen mailakoak', es: 'De primer grado', en: 'First degree', ar: 'من الدرجة الأولى' }, description: { eu: 'ax + b > 0', es: 'ax + b > 0', en: 'ax + b > 0', ar: 'ax + b > 0' } },
            { progressId: 66402, stage: 'quadratic-inequalities', title: { eu: 'Bigarren mailakoak', es: 'De segundo grado', en: 'Second degree', ar: 'من الدرجة الثانية' }, description: { eu: 'Erroak agerian.', es: 'Con las raíces a la vista.', en: 'With the roots shown.', ar: 'مع إظهار الجذور.' } },
            { progressId: 66403, stage: 'quadratic-inequalities', title: { eu: 'Erroak ezkutuan', es: 'Raíces ocultas', en: 'Hidden roots', ar: 'جذور مخفية' }, description: { eu: 'Erro bikoitzak eta errorik gabekoak.', es: 'Raíces dobles y sin raíces.', en: 'Double roots and no roots.', ar: 'جذور مضاعفة ودون جذور.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Ekuazioen detektibea', es: 'Detective de ecuaciones', en: 'Equations detective', ar: 'مخبر المعادلات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Ekuazioetako akats tipikoak', es: 'Errores típicos con ecuaciones', en: 'Common mistakes with equations', ar: 'الأخطاء الشائعة في المعادلات' },
        levels: [
            { progressId: 66501, stage: 'quadratic', title: { eu: 'Bigarren maila eta bikarratuak', es: 'Segundo grado y bicuadradas', en: 'Quadratics and biquadratics', ar: 'الدرجة الثانية وثنائية التربيع' }, description: { eu: 'Formula, x-z zatitzea eta t = x².', es: 'La fórmula, dividir entre x y t = x².', en: 'The formula, dividing by x and t = x².', ar: 'القانون والقسمة على x وt = x².' } },
            { progressId: 66502, stage: 'other', title: { eu: 'Beste ekuazio batzuk', es: 'Otras ecuaciones', en: 'Other equations', ar: 'معادلات أخرى' }, description: { eu: 'Erroak, zatikiak eta esponentzialak.', es: 'Radicales, fracciones y exponenciales.', en: 'Radicals, fractions and exponentials.', ar: 'الجذور والكسور والأسية.' } },
            { progressId: 66503, stage: 'quadratic-inequalities', title: { eu: 'Inekuazioak', es: 'Inecuaciones', en: 'Inequalities', ar: 'المتباينات' }, description: { eu: 'Zeinua, erroak eta tarteak.', es: 'Signo, raíces e intervalos.', en: 'Sign, roots and intervals.', ar: 'الإشارة والجذور والفترات.' } }
        ]
    }
]

export const equationsGameProgressIds: number[] = levelProgressIds(equationsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const equationsGameSlugs: Record<EquationsGameId, string> = { race: 'lasterketa', memory: 'memoria', check: 'soluzioa', paint: 'margotu', detective: 'detektibea' }

export function equationsGameModeForPath(pathname: string): EquationsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['soluzioa', 'solucion'].includes(game)) return 'check'
    if (['margotu', 'pinta'].includes(game)) return 'paint'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Sistemak (4. DBH akademikoak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star.
   ========================================================================== */

export type SystemsGameId = 'race' | 'memory' | 'cross' | 'touch' | 'detective'

export const SYSTEMS_GAME_RECORDS_KEY = 'matella-sistemak-dbh4ak-game-records'

export const systemsGames: GameInfo<SystemsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Sistemen lasterketa', es: 'Carrera de sistemas', en: 'Systems race', ar: 'سباق الأنظمة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 68101, stage: 'linear', title: { eu: 'Sistema linealak', es: 'Sistemas lineales', en: 'Linear systems', ar: 'الأنظمة الخطية' }, description: { eu: 'Puntuak, zuzenak, parametroak eta ardatzak.', es: 'Puntos, rectas, parámetros y ejes.', en: 'Points, straight lines, parameters and axes.', ar: 'النقاط والمستقيمات والوسائط والمحاور.' } },
            { progressId: 68102, stage: 'methods', title: { eu: 'Metodoak', es: 'Métodos', en: 'Methods', ar: 'الطرق' }, description: { eu: 'Ordezkapena, laburketa, berdinketa eta izendatzaileak.', es: 'Sustitución, reducción, igualación y denominadores.', en: 'Substitution, elimination, comparison and denominators.', ar: 'التعويض والحذف والمساواة والمقامات.' } },
            { progressId: 68103, stage: 'nonlinear', title: { eu: 'Ez-linealak', es: 'No lineales', en: 'Non-linear', ar: 'غير الخطية' }, description: { eu: 'Batura eta biderkadura, karratuak eta zirkunferentzia.', es: 'Suma y producto, cuadrados y circunferencia.', en: 'Sum and product, squares and circle.', ar: 'المجموع والجداء والمربعات والدائرة.' } },
            { progressId: 68104, stage: 'half-planes', title: { eu: 'Erdiplanoak', es: 'Semiplanos', en: 'Half-planes', ar: 'أنصاف المستويات' }, description: { eu: 'Proba-puntuak, puntu osoak, erpinak eta azalerak.', es: 'Puntos de prueba, puntos enteros, vértices y áreas.', en: 'Test points, integer points, vertices and areas.', ar: 'نقاط الاختبار والنقاط الصحيحة والرؤوس والمساحات.' } },
            { progressId: 68105, stage: 'problems', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' }, description: { eu: 'Buruak eta hankak, txanponak, zenbakiak eta aurrekontuak.', es: 'Cabezas y patas, monedas, números y presupuestos.', en: 'Heads and legs, coins, numbers and budgets.', ar: 'الرؤوس والأرجل والنقود والأعداد والميزانيات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu sistema bakoitza bere ebazpenarekin.', es: 'Une cada sistema con su solución.', en: 'Match each system with its solution.', ar: 'صِل كل نظام بحله.' },
        skills: { eu: 'Ebazpenak, bi zenbaki eta puntu osoak', es: 'Soluciones, dos números y puntos enteros', en: 'Solutions, two numbers and integer points', ar: 'الحلول وعددان والنقاط الصحيحة' },
        levels: [
            { progressId: 68201, stage: 'linear', title: { eu: 'Sistema linealak', es: 'Sistemas lineales', en: 'Linear systems', ar: 'الأنظمة الخطية' }, description: { eu: 'x + y = 5, x − y = 1 ↔ (3, 2)', es: 'x + y = 5, x − y = 1 ↔ (3, 2)', en: 'x + y = 5, x − y = 1 ↔ (3, 2)', ar: 'x + y = 5, x − y = 1 ↔ (3, 2)' } },
            { progressId: 68202, stage: 'nonlinear', title: { eu: 'Batura eta biderkadura', es: 'Suma y producto', en: 'Sum and product', ar: 'المجموع والجداء' }, description: { eu: 'x + y = 5, xy = 6 ↔ 2, 3', es: 'x + y = 5, xy = 6 ↔ 2, 3', en: 'x + y = 5, xy = 6 ↔ 2, 3', ar: 'x + y = 5, xy = 6 ↔ 2, 3' } },
            { progressId: 68203, stage: 'half-planes', title: { eu: 'Puntu osoak', es: 'Puntos enteros', en: 'Integer points', ar: 'النقاط الصحيحة' }, description: { eu: 'x, y ≥ 0, x + y ≤ 3 ↔ 10', es: 'x, y ≥ 0, x + y ≤ 3 ↔ 10', en: 'x, y ≥ 0, x + y ≤ 3 ↔ 10', ar: 'x, y ≥ 0, x + y ≤ 3 ↔ 10' } }
        ]
    },
    {
        id: 'cross',
        title: { eu: 'Ebaki-puntua', es: 'El punto de corte', en: 'The crossing point', ar: 'نقطة التقاطع' },
        tagline: { eu: 'Bi zuzen: sakatu sistemaren soluzioa den puntua.', es: 'Dos rectas: pulsa el punto que resuelve el sistema.', en: 'Two lines: tap the point that solves the system.', ar: 'مستقيمان: اضغط النقطة التي تحل النظام.' },
        skills: { eu: 'Sistemak grafikoki ebaztea', es: 'Resolver sistemas gráficamente', en: 'Solving systems on a graph', ar: 'حل الأنظمة بيانيًا' },
        levels: [
            { progressId: 68301, stage: 'linear', title: { eu: 'y = mx + n', es: 'y = mx + n', en: 'y = mx + n', ar: 'y = mx + n' }, description: { eu: 'Lehen koadrantean.', es: 'En el primer cuadrante.', en: 'In the first quadrant.', ar: 'في الربع الأول.' } },
            { progressId: 68302, stage: 'linear', title: { eu: 'ax + by = c', es: 'ax + by = c', en: 'ax + by = c', ar: 'ax + by = c' }, description: { eu: 'Lau koadranteetan.', es: 'En los cuatro cuadrantes.', en: 'In all four quadrants.', ar: 'في الأرباع الأربعة.' } },
            { progressId: 68303, stage: 'methods', title: { eu: 'Nahastuta', es: 'Mezcladas', en: 'Mixed', ar: 'مختلطة' }, description: { eu: 'Bi formak.', es: 'Las dos formas.', en: 'Both forms.', ar: 'الصيغتان.' } }
        ]
    },
    {
        id: 'touch',
        title: { eu: 'Sakatu soluzioa', es: 'Toca la solución', en: 'Touch the solution', ar: 'المس الحل' },
        tagline: { eu: 'Desberdintza-sistema bat: sakatu guztiak betetzen dituen puntu bat.', es: 'Un sistema de inecuaciones: pulsa un punto que cumpla todas.', en: 'A system of inequalities: tap a point that satisfies all of them.', ar: 'نظام متباينات: اضغط نقطة تحققها كلها.' },
        skills: { eu: 'Erdiplanoak eta desberdintza-sistemak', es: 'Semiplanos y sistemas de inecuaciones', en: 'Half-planes and systems of inequalities', ar: 'أنصاف المستويات وأنظمة المتباينات' },
        levels: [
            { progressId: 68401, stage: 'half-planes', title: { eu: 'Desberdintza bat', es: 'Una inecuación', en: 'One inequality', ar: 'متباينة واحدة' }, description: { eu: 'Erdiplano bat.', es: 'Un semiplano.', en: 'A half-plane.', ar: 'نصف مستوى.' } },
            { progressId: 68402, stage: 'half-planes', title: { eu: 'Bi desberdintza', es: 'Dos inecuaciones', en: 'Two inequalities', ar: 'متباينتان' }, description: { eu: 'Bi erdiplanoen ebakidura.', es: 'La intersección de dos semiplanos.', en: 'Where two half-planes meet.', ar: 'تقاطع نصفي مستوى.' } },
            { progressId: 68403, stage: 'half-planes', title: { eu: 'Hiru desberdintza', es: 'Tres inecuaciones', en: 'Three inequalities', ar: 'ثلاث متباينات' }, description: { eu: 'Eskualde txiki bat.', es: 'Una región pequeña.', en: 'A small region.', ar: 'منطقة صغيرة.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Sistemen detektibea', es: 'Detective de sistemas', en: 'Systems detective', ar: 'مخبر الأنظمة' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Sistemetako akats tipikoak', es: 'Errores típicos con sistemas', en: 'Common mistakes with systems', ar: 'الأخطاء الشائعة في الأنظمة' },
        levels: [
            { progressId: 68501, stage: 'methods', title: { eu: 'Metodoak', es: 'Métodos', en: 'Methods', ar: 'الطرائق' }, description: { eu: 'Ordezkapena eta laburpena.', es: 'Sustitución y reducción.', en: 'Substitution and elimination.', ar: 'التعويض والحذف.' } },
            { progressId: 68502, stage: 'nonlinear', title: { eu: 'Ez-linealak', es: 'No lineales', en: 'Non-linear', ar: 'غير الخطية' }, description: { eu: 'Bi soluzio eta ordezkapenak.', es: 'Dos soluciones y sustituciones.', en: 'Two solutions and substitutions.', ar: 'حلان وتعويضات.' } },
            { progressId: 68503, stage: 'problems', title: { eu: 'Buruketak', es: 'Problemas', en: 'Problems', ar: 'المسائل' }, description: { eu: 'Hankak, prezioak eta adinak.', es: 'Patas, precios y edades.', en: 'Legs, prices and ages.', ar: 'الأرجل والأسعار والأعمار.' } }
        ]
    }
]

export const systemsGameProgressIds: number[] = levelProgressIds(systemsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const systemsGameSlugs: Record<SystemsGameId, string> = { race: 'lasterketa', memory: 'memoria', cross: 'ebakidura', touch: 'ukitu', detective: 'detektibea' }

export function systemsGameModeForPath(pathname: string): SystemsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['ebakidura', 'corte'].includes(game)) return 'cross'
    if (['ukitu', 'toca'].includes(game)) return 'touch'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

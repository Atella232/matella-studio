import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Sistemak (4. DBH akademikoak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star.
   ========================================================================== */

export type SystemsGameId = 'race' | 'memory'

export const SYSTEMS_GAME_RECORDS_KEY = 'matella-sistemak-dbh4ak-game-records'

export const systemsGames: GameInfo<SystemsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Sistemen lasterketa', es: 'Carrera de sistemas', ar: 'سباق الأنظمة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 68101, stage: 'linear', title: { eu: 'Sistema linealak', es: 'Sistemas lineales', ar: 'الأنظمة الخطية' }, description: { eu: 'Puntuak, zuzenak, parametroak eta ardatzak.', es: 'Puntos, rectas, parámetros y ejes.', ar: 'النقاط والمستقيمات والوسائط والمحاور.' } },
            { progressId: 68102, stage: 'methods', title: { eu: 'Metodoak', es: 'Métodos', ar: 'الطرق' }, description: { eu: 'Ordezkapena, laburketa, berdinketa eta izendatzaileak.', es: 'Sustitución, reducción, igualación y denominadores.', ar: 'التعويض والحذف والمساواة والمقامات.' } },
            { progressId: 68103, stage: 'nonlinear', title: { eu: 'Ez-linealak', es: 'No lineales', ar: 'غير الخطية' }, description: { eu: 'Batura eta biderkadura, karratuak eta zirkunferentzia.', es: 'Suma y producto, cuadrados y circunferencia.', ar: 'المجموع والجداء والمربعات والدائرة.' } },
            { progressId: 68104, stage: 'half-planes', title: { eu: 'Erdiplanoak', es: 'Semiplanos', ar: 'أنصاف المستويات' }, description: { eu: 'Proba-puntuak, puntu osoak, erpinak eta azalerak.', es: 'Puntos de prueba, puntos enteros, vértices y áreas.', ar: 'نقاط الاختبار والنقاط الصحيحة والرؤوس والمساحات.' } },
            { progressId: 68105, stage: 'problems', title: { eu: 'Problemak', es: 'Problemas', ar: 'المسائل' }, description: { eu: 'Buruak eta hankak, txanponak, zenbakiak eta aurrekontuak.', es: 'Cabezas y patas, monedas, números y presupuestos.', ar: 'الرؤوس والأرجل والنقود والأعداد والميزانيات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu sistema bakoitza bere ebazpenarekin.', es: 'Une cada sistema con su solución.', ar: 'صِل كل نظام بحله.' },
        skills: { eu: 'Ebazpenak, bi zenbaki eta puntu osoak', es: 'Soluciones, dos números y puntos enteros', ar: 'الحلول وعددان والنقاط الصحيحة' },
        levels: [
            { progressId: 68201, stage: 'linear', title: { eu: 'Sistema linealak', es: 'Sistemas lineales', ar: 'الأنظمة الخطية' }, description: { eu: 'x + y = 5, x − y = 1 ↔ (3, 2)', es: 'x + y = 5, x − y = 1 ↔ (3, 2)', ar: 'x + y = 5, x − y = 1 ↔ (3, 2)' } },
            { progressId: 68202, stage: 'nonlinear', title: { eu: 'Batura eta biderkadura', es: 'Suma y producto', ar: 'المجموع والجداء' }, description: { eu: 'x + y = 5, xy = 6 ↔ 2, 3', es: 'x + y = 5, xy = 6 ↔ 2, 3', ar: 'x + y = 5, xy = 6 ↔ 2, 3' } },
            { progressId: 68203, stage: 'half-planes', title: { eu: 'Puntu osoak', es: 'Puntos enteros', ar: 'النقاط الصحيحة' }, description: { eu: 'x, y ≥ 0, x + y ≤ 3 ↔ 10', es: 'x, y ≥ 0, x + y ≤ 3 ↔ 10', ar: 'x, y ≥ 0, x + y ≤ 3 ↔ 10' } }
        ]
    }
]

export const systemsGameProgressIds: number[] = levelProgressIds(systemsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const systemsGameSlugs: Record<SystemsGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function systemsGameModeForPath(pathname: string): SystemsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

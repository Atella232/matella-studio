import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Bektoreak eta zuzenak (4. DBH akademikoak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star.
   ========================================================================== */

export type VectorsGameId = 'race' | 'memory'

export const VECTORS_GAME_RECORDS_KEY = 'matella-bektoreak-dbh4ak-game-records'

export const vectorsGames: GameInfo<VectorsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Bektoreen lasterketa', es: 'Carrera de vectores', en: 'Vector race', ar: 'سباق المتجهات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 74101, stage: 'vectors', title: { eu: 'Bektoreak', es: 'Vectores', en: 'Vectors', ar: 'المتجهات' }, description: { eu: 'Koordenatuak, modulua, konbinazioak eta paraleloak.', es: 'Coordenadas, módulo, combinaciones y paralelos.', en: 'Coordinates, magnitude, linear combinations and parallel vectors.', ar: 'المركّبات والطول والتركيبات والتوازي.' } },
            { progressId: 74102, stage: 'points', title: { eu: 'Puntuak', es: 'Puntos', en: 'Points', ar: 'النقاط' }, description: { eu: 'Distantzia, erdiko puntua, simetrikoa eta lerrokatutako puntuak.', es: 'Distancia, punto medio, simétrico y puntos alineados.', en: 'Distance, midpoint, symmetric point and collinear points.', ar: 'المسافة والمنتصف والنظيرة والنقاط على استقامة واحدة.' } },
            { progressId: 74103, stage: 'equations', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' }, description: { eu: 'Malda, jatorriko ordenatua, parametrikoa eta esplizitua.', es: 'Pendiente, ordenada en el origen, paramétrica y explícita.', en: 'Slope, y-intercept, parametric and explicit.', ar: 'الميل والجزء المقطوع والصيغة الوسيطية والصريحة.' } },
            { progressId: 74104, stage: 'positions', title: { eu: 'Posizioak', es: 'Posiciones', en: 'Positions', ar: 'الأوضاع' }, description: { eu: 'Paraleloak, perpendikularrak, ebaki-puntua eta k parametroa.', es: 'Paralelas, perpendiculares, punto de corte y el parámetro k.', en: 'Parallel and perpendicular lines, intersection point and parameter k.', ar: 'التوازي والتعامد ونقطة التقاطع والوسيط k.' } },
            { progressId: 74105, stage: 'applications', title: { eu: 'Aplikazioak', es: 'Aplicaciones', en: 'Applications', ar: 'التطبيقات' }, description: { eu: 'Erdibitzailea, zirkunferentzia eta paralelogramoa.', es: 'Mediatriz, circunferencia y paralelogramo.', en: 'Perpendicular bisector, circle and parallelogram.', ar: 'المحور والدائرة ومتوازي الأضلاع.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu karta bakoitza bere bikotearekin.', es: 'Une cada carta con su pareja.', en: 'Match each card with its pair.', ar: 'صِل كل بطاقة بقرينتها.' },
        skills: { eu: 'Bektoreak, ekuazioak eta zirkunferentziak', es: 'Vectores, ecuaciones y circunferencias', en: 'Vectors, equations and circles', ar: 'المتجهات والمعادلات والدوائر' },
        levels: [
            { progressId: 74201, stage: 'vectors', title: { eu: 'Bi puntu eta haien bektorea', es: 'Dos puntos y su vector', en: 'Two points and their vector', ar: 'نقطتان ومتجههما' }, description: { eu: 'A(1, 2), B(4, 6) ↔ (3, 4)', es: 'A(1, 2), B(4, 6) ↔ (3, 4)', en: 'A(1, 2), B(4, 6) ↔ (3, 4)', ar: 'A(1, 2), B(4, 6) ↔ (3, 4)' } },
            { progressId: 74202, stage: 'equations', title: { eu: 'Orokorra eta esplizitua', es: 'General y explícita', en: 'General and explicit', ar: 'العامة والصريحة' }, description: { eu: '2x − y + 3 = 0 ↔ y = 2x + 3', es: '2x − y + 3 = 0 ↔ y = 2x + 3', en: '2x − y + 3 = 0 ↔ y = 2x + 3', ar: '2x − y + 3 = 0 ↔ y = 2x + 3' } },
            { progressId: 74203, stage: 'applications', title: { eu: 'Zirkunferentziak', es: 'Circunferencias', en: 'Circumferences', ar: 'الدوائر' }, description: { eu: '(x − 2)² + y² = 9 ↔ C(2, 0), r = 3', es: '(x − 2)² + y² = 9 ↔ C(2, 0), r = 3', en: '(x − 2)² + y² = 9 ↔ C(2, 0), r = 3', ar: '(x − 2)² + y² = 9 ↔ C(2, 0), r = 3' } }
        ]
    }
]

export const vectorsGameProgressIds: number[] = levelProgressIds(vectorsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const vectorsGameSlugs: Record<VectorsGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function vectorsGameModeForPath(pathname: string): VectorsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

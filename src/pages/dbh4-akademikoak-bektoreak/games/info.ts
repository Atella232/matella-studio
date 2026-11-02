import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Bektoreak eta zuzenak (4. DBH akademikoak) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star.
   ========================================================================== */

export type VectorsGameId = 'race' | 'memory' | 'jump' | 'lines' | 'detective'

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
    },
    {
        id: 'jump',
        title: { eu: 'Bektore-jauzia', es: 'El salto del vector', en: 'The vector jump', ar: 'قفزة المتجه' },
        tagline: { eu: 'Jarri bi zenbaki: bektorea, puntua edo a eta b. Gero, geziak marraztuko dira.', es: 'Pon dos números: el vector, el punto o a y b. Luego se dibujan las flechas.', en: 'Set two numbers: the vector, the point or a and b. Then the arrows are drawn.', ar: 'ضع عددين: المتجه أو النقطة أو a وb، ثم تُرسم الأسهم.' },
        skills: { eu: 'Bektoreak eta puntuak', es: 'Vectores y puntos', en: 'Vectors and points', ar: 'المتجهات والنقاط' },
        levels: [
            { progressId: 74301, stage: 'vectors', title: { eu: 'A-tik B-ra', es: 'De A a B', en: 'From A to B', ar: 'من A إلى B' }, description: { eu: 'Bektorea bi puntutatik.', es: 'El vector de dos puntos.', en: 'The vector between two points.', ar: 'المتجه بين نقطتين.' } },
            { progressId: 74302, stage: 'points', title: { eu: 'Erdiko puntua', es: 'El punto medio', en: 'The midpoint', ar: 'المنتصف' }, description: { eu: 'Aurkitu beste muturra.', es: 'Halla el otro extremo.', en: 'Find the other end.', ar: 'أوجد الطرف الآخر.' } },
            { progressId: 74303, stage: 'vectors', title: { eu: 'Konbinazioak', es: 'Combinaciones', en: 'Combinations', ar: 'التركيبات' }, description: { eu: 'a·u + b·v = w.', es: 'a·u + b·v = w.', en: 'a·u + b·v = w.', ar: 'a·u + b·v = w.' } }
        ]
    },
    {
        id: 'lines',
        title: { eu: 'Aurkitu k', es: 'Encuentra k', en: 'Find k', ar: 'أوجد k' },
        tagline: { eu: 'Bi zuzen eta k bat: paraleloak, perpendikularrak edo puntu batetik. Gero, zuzenak.', es: 'Dos rectas y una k: paralelas, perpendiculares o por un punto. Luego, las rectas.', en: 'Two lines and a k: parallel, perpendicular or through a point. Then the lines.', ar: 'مستقيمان وk: متوازيان أو متعامدان أو عبر نقطة. ثم المستقيمان.' },
        skills: { eu: 'Zuzenen posizioak', es: 'Posiciones de rectas', en: 'Positions of lines', ar: 'أوضاع المستقيمات' },
        levels: [
            { progressId: 74401, stage: 'positions', title: { eu: 'Paraleloak', es: 'Paralelas', en: 'Parallel', ar: 'متوازيان' }, description: { eu: 'Koefiziente proportzionalak.', es: 'Coeficientes proporcionales.', en: 'Proportional coefficients.', ar: 'معاملات متناسبة.' } },
            { progressId: 74402, stage: 'positions', title: { eu: 'Perpendikularrak', es: 'Perpendiculares', en: 'Perpendicular', ar: 'متعامدان' }, description: { eu: 'Normalen biderkadura 0.', es: 'Producto de normales 0.', en: 'Normals with dot product 0.', ar: 'جداء الناظمين 0.' } },
            { progressId: 74403, stage: 'equations', title: { eu: 'Puntu batetik', es: 'Por un punto', en: 'Through a point', ar: 'عبر نقطة' }, description: { eu: 'Ordeztu puntua.', es: 'Sustituye el punto.', en: 'Substitute the point.', ar: 'عوّض النقطة.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Bektoreen detektibea', es: 'Detective de vectores', en: 'Vectors detective', ar: 'مخبر المتجهات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Bektore eta zuzenetako akats tipikoak', es: 'Errores típicos con vectores y rectas', en: 'Common mistakes with vectors and lines', ar: 'الأخطاء الشائعة في المتجهات والمستقيمات' },
        levels: [
            { progressId: 74501, stage: 'vectors', title: { eu: 'Bektoreak', es: 'Vectores', en: 'Vectors', ar: 'المتجهات' }, description: { eu: 'Bektoreak, erdiko puntuak eta moduluak.', es: 'Vectores, puntos medios y módulos.', en: 'Vectors, midpoints and lengths.', ar: 'المتجهات والمنتصفات والأطوال.' } },
            { progressId: 74502, stage: 'equations', title: { eu: 'Zuzenak', es: 'Rectas', en: 'Lines', ar: 'المستقيمات' }, description: { eu: 'Maldak eta ekuazioak.', es: 'Pendientes y ecuaciones.', en: 'Slopes and equations.', ar: 'الميول والمعادلات.' } },
            { progressId: 74503, stage: 'applications', title: { eu: 'Aplikazioak', es: 'Aplicaciones', en: 'Applications', ar: 'التطبيقات' }, description: { eu: 'Paraleloak, zirkunferentziak eta distantziak.', es: 'Paralelas, circunferencias y distancias.', en: 'Parallels, circles and distances.', ar: 'التوازي والدوائر والمسافات.' } }
        ]
    }
]

export const vectorsGameProgressIds: number[] = levelProgressIds(vectorsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const vectorsGameSlugs: Record<VectorsGameId, string> = { race: 'lasterketa', memory: 'memoria', jump: 'jauzia', lines: 'k-aurkitu', detective: 'detektibea' }

export function vectorsGameModeForPath(pathname: string): VectorsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['jauzia', 'salto'].includes(game)) return 'jump'
    if (['k-aurkitu', 'encuentra-k'].includes(game)) return 'lines'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { vectorsGames } from '../../dbh4-akademikoak-bektoreak/games/info.ts'
import type { BachGeometryStageId } from '../lessons.tsx'

/* ==========================================================================
   Geometria analitikoa (Batxilergoa 1 · Zientziak) games: the list shown
   in the hub, with levels and the unit progress id each level earns with
   its first star. Three games of its own (twin lines, the radar and the
   detective), the race and the memory, and «Find k» of 4. DBH kept for
   the review, with its texts and levels but the stages and progress ids
   of this unit.
   ========================================================================== */

export type BachGeometryGameId = 'race' | 'twins' | 'radar' | 'detective' | 'memory' | 'lines'

export const BACH_GEOMETRY_GAME_RECORDS_KEY = 'matella-geometria-batx1z-game-records'

/** A 4. DBH game with its texts and levels, the stages and progress ids of this unit */
function reused(id: 'lines', stages: BachGeometryStageId[], firstId: number): GameInfo<BachGeometryGameId> {
    const source = vectorsGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const bachGeometryGames: GameInfo<BachGeometryGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zuzenen lasterketa', es: 'Carrera de rectas', en: 'Lines race', ar: 'سباق المستقيمات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 106401, stage: 'points', title: { eu: 'Puntuak', es: 'Puntos', en: 'Points', ar: 'النقاط' }, description: { eu: 'Erdiko puntua, simetrikoa eta zatiketa.', es: 'Punto medio, simétrico y división.', en: 'Midpoint, symmetric point and division.', ar: 'المنتصف والنظير والتقسيم.' } },
            { progressId: 106402, stage: 'lines', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' }, description: { eu: 'Malda, jatorriko ordenatua eta puntu batetik.', es: 'Pendiente, ordenada en el origen y por un punto.', en: 'Slope, y-intercept and through a point.', ar: 'الميل والجزء المقطوع والمرور بنقطة.' } },
            { progressId: 106403, stage: 'positions', title: { eu: 'Posizioak', es: 'Posiciones', en: 'Positions', ar: 'الأوضاع' }, description: { eu: 'Paraleloak, perpendikularrak eta ebaki-puntua.', es: 'Paralelas, perpendiculares y punto de corte.', en: 'Parallel, perpendicular and crossing point.', ar: 'التوازي والتعامد ونقطة التقاطع.' } },
            { progressId: 106404, stage: 'distances', title: { eu: 'Distantziak', es: 'Distancias', en: 'Distances', ar: 'المسافات' }, description: { eu: 'Puntutik zuzenera, paraleloen artean eta simetrikoak.', es: 'De punto a recta, entre paralelas y simétricos.', en: 'Point to line, between parallels and reflections.', ar: 'من نقطة إلى مستقيم وبين متوازيين والنظائر.' } },
            { progressId: 106405, stage: 'triangles', title: { eu: 'Triangeluak', es: 'Triángulos', en: 'Triangles', ar: 'المثلثات' }, description: { eu: 'Barizentroa, azalera eta hirugarren erpina.', es: 'Baricentro, área y tercer vértice.', en: 'Centroid, area and third vertex.', ar: 'مركز الثقل والمساحة والرأس الثالث.' } }
        ]
    },
    {
        id: 'twins',
        title: { eu: 'Zuzen bikiak', es: 'Rectas gemelas', en: 'Twin lines', ar: 'المستقيمات التوأم' },
        tagline: { eu: 'Zuzen bat forma batean, eta lau beste forma batean: zein da zuzen bera?', es: 'Una recta en una forma y cuatro en otra: ¿cuál es la misma recta?', en: 'One line in one form and four in another: which is the same line?', ar: 'مستقيم بصيغة وأربعة بصيغة أخرى: أيها المستقيم نفسه؟' },
        skills: { eu: 'Zuzen baten ekuazio guztiak', es: 'Todas las ecuaciones de una recta', en: 'Every equation of a line', ar: 'كل معادلات المستقيم' },
        levels: [
            { progressId: 106501, stage: 'lines', title: { eu: 'Orokorra eta esplizitua', es: 'General y explícita', en: 'General and explicit', ar: 'العامة والصريحة' }, description: { eu: 'Ax + By + C = 0 eta y = mx + n.', es: 'Ax + By + C = 0 e y = mx + n.', en: 'Ax + By + C = 0 and y = mx + n.', ar: 'Ax + By + C = 0 وy = mx + n.' } },
            { progressId: 106502, stage: 'lines', title: { eu: 'Bektorearekin', es: 'Con el vector', en: 'With the vector', ar: 'بالمتجه' }, description: { eu: 'Bektoriala, parametrikoak eta jarraitua.', es: 'Vectorial, paramétricas y continua.', en: 'Vector, parametric and continuous.', ar: 'المتجهية والوسيطيتان والمتصلة.' } },
            { progressId: 106503, stage: 'positions', title: { eu: 'Denak nahastuta', es: 'Todas mezcladas', en: 'All mixed', ar: 'كلها مختلطة' }, description: { eu: 'Sei formak, puntu-malda barne.', es: 'Las seis formas, punto-pendiente incluida.', en: 'The six forms, point-slope included.', ar: 'الصيغ الست ومنها النقطة والميل.' } }
        ]
    },
    {
        id: 'radar',
        title: { eu: 'Radarra', es: 'El radar', en: 'The radar', ar: 'الرادار' },
        tagline: { eu: 'Itsasontzi batek bide zuzena darama: zenbat hurbiltzen da radarrera? Antzemango du?', es: 'Un barco sigue una ruta recta: ¿cuánto se acerca al radar? ¿Lo detectará?', en: 'A ship follows a straight route: how close does it get to the radar? Will it be detected?', ar: 'سفينة تسير في طريق مستقيم: كم تقترب من الرادار؟ هل سيكشفها؟' },
        skills: { eu: 'Puntu batetik zuzen baterako distantzia', es: 'La distancia de un punto a una recta', en: 'The distance from a point to a line', ar: 'المسافة من نقطة إلى مستقيم' },
        levels: [
            { progressId: 106601, stage: 'distances', title: { eu: 'Forma orokorra', es: 'Forma general', en: 'General form', ar: 'الصيغة العامة' }, description: { eu: 'Bidea Ax + By + C = 0 moduan.', es: 'La ruta como Ax + By + C = 0.', en: 'The route as Ax + By + C = 0.', ar: 'الطريق بالصيغة Ax + By + C = 0.' } },
            { progressId: 106602, stage: 'distances', title: { eu: 'Forma esplizitua', es: 'Forma explícita', en: 'Explicit form', ar: 'الصيغة الصريحة' }, description: { eu: 'Bidea y = mx + n moduan: lehenik, forma orokorra.', es: 'La ruta como y = mx + n: primero, la forma general.', en: 'The route as y = mx + n: first, the general form.', ar: 'الطريق بالصيغة y = mx + n: الصيغة العامة أولًا.' } },
            { progressId: 106603, stage: 'distances', title: { eu: 'Bide paraleloak', es: 'Rutas paralelas', en: 'Parallel routes', ar: 'طريقان متوازيان' }, description: { eu: 'Bi itsasontzi, bi bide paralelo.', es: 'Dos barcos, dos rutas paralelas.', en: 'Two ships, two parallel routes.', ar: 'سفينتان وطريقان متوازيان.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Zuzenen detektibea', es: 'Detective de rectas', en: 'Lines detective', ar: 'مخبر المستقيمات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 106701, stage: 'lines', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' }, description: { eu: 'Normala eta norabidea, malda eta puntua.', es: 'Normal y director, pendiente y punto.', en: 'Normal and direction, slope and point.', ar: 'الناظمي والتوجيه والميل والنقطة.' } },
            { progressId: 106702, stage: 'positions', title: { eu: 'Posizioak eta angeluak', es: 'Posiciones y ángulos', en: 'Positions and angles', ar: 'الأوضاع والزوايا' }, description: { eu: 'Perpendikularrak, bat datozenak eta angelua.', es: 'Perpendiculares, coincidentes y ángulo.', en: 'Perpendicular, coincident and angle.', ar: 'التعامد والانطباق والزاوية.' } },
            { progressId: 106703, stage: 'triangles', title: { eu: 'Distantziak eta triangeluak', es: 'Distancias y triángulos', en: 'Distances and triangles', ar: 'المسافات والمثلثات' }, description: { eu: 'Erroa, paraleloak, barizentroa eta simetrikoa.', es: 'La raíz, paralelas, baricentro y simétrico.', en: 'The root, parallels, centroid and reflection.', ar: 'الجذر والمتوازيان ومركز الثقل والنظير.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: zuzen bat edo puntu batzuk, eta haien emaitza.', es: 'Encuentra las parejas: una recta o unos puntos, y su resultado.', en: 'Find the pairs: a line or some points, and their result.', ar: 'اعثر على الأزواج: مستقيم أو نقاط ونتيجتها.' },
        skills: { eu: 'Malda, erdiko puntua eta distantzia', es: 'Pendiente, punto medio y distancia', en: 'Slope, midpoint and distance', ar: 'الميل والمنتصف والمسافة' },
        levels: [
            { progressId: 106801, stage: 'lines', title: { eu: 'Malda', es: 'Pendiente', en: 'Slope', ar: 'الميل' }, description: { eu: '2x − 3y + 1 = 0 ↔ m = 2/3', es: '2x − 3y + 1 = 0 ↔ m = 2/3', en: '2x − 3y + 1 = 0 ↔ m = 2/3', ar: '2x − 3y + 1 = 0 ↔ m = 2/3' } },
            { progressId: 106802, stage: 'points', title: { eu: 'Erdiko puntua', es: 'Punto medio', en: 'Midpoint', ar: 'المنتصف' }, description: { eu: 'A(1, 2), B(3, 6) ↔ M(2, 4)', es: 'A(1, 2), B(3, 6) ↔ M(2, 4)', en: 'A(1, 2), B(3, 6) ↔ M(2, 4)', ar: 'A(1, 2), B(3, 6) ↔ M(2, 4)' } },
            { progressId: 106803, stage: 'distances', title: { eu: 'Distantzia', es: 'Distancia', en: 'Distance', ar: 'المسافة' }, description: { eu: 'P(1, 1), 3x + 4y − 2 = 0 ↔ d = 1', es: 'P(1, 1), 3x + 4y − 2 = 0 ↔ d = 1', en: 'P(1, 1), 3x + 4y − 2 = 0 ↔ d = 1', ar: 'P(1, 1), 3x + 4y − 2 = 0 ↔ d = 1' } }
        ]
    },
    reused('lines', ['positions', 'positions', 'lines'], 106811)
]

export const bachGeometryGameProgressIds: number[] = levelProgressIds(bachGeometryGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bachGeometryGameSlugs: Record<BachGeometryGameId, string> = { race: 'lasterketa', twins: 'zuzen-bikiak', radar: 'radarra', detective: 'detektibea', memory: 'memoria', lines: 'k-aurkitu' }

export function bachGeometryGameModeForPath(pathname: string): BachGeometryGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zuzen-bikiak', 'rectas-gemelas'].includes(game)) return 'twins'
    if (['radarra', 'radar'].includes(game)) return 'radar'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['k-aurkitu', 'encuentra-k'].includes(game)) return 'lines'
    return 'hub'
}

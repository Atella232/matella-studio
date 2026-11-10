import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Espazioko bektoreak (Batxilergoa 2 · Zientziak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star. Four games of their own (number or vector? in space, which
   is u × v?, the flattened box and the detective), the race and the
   memory.
   ========================================================================== */

export type SpaceVectorsGameId = 'race' | 'kind' | 'cross' | 'flat' | 'detective' | 'memory'

export const SPACE_VECTORS_GAME_RECORDS_KEY = 'matella-bektoreak-batx2z-game-records'

export const spaceVectorsGames: GameInfo<SpaceVectorsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Espazioko lasterketa', es: 'Carrera en el espacio', en: 'Race in space', ar: 'سباق في الفضاء' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 119401, stage: 'space', title: { eu: 'Puntuak eta bektoreak', es: 'Puntos y vectores', en: 'Points and vectors', ar: 'النقاط والمتجهات' }, description: { eu: 'AB, modulua eta simetrikoa.', es: 'AB, módulo y simétrico.', en: 'AB, magnitude and symmetric point.', ar: 'AB والطول والنظيرة.' } },
            { progressId: 119402, stage: 'dependence', title: { eu: 'Mendekotasuna', es: 'Dependencia', en: 'Dependence', ar: 'الارتباط' }, description: { eu: 'Determinanteak, k parametroa eta konbinazioak.', es: 'Determinantes, el parámetro k y combinaciones.', en: 'Determinants, the parameter k and combinations.', ar: 'المحددات والوسيط k والتركيبات.' } },
            { progressId: 119403, stage: 'dot', title: { eu: 'Biderkadura eskalarra', es: 'Producto escalar', en: 'Dot product', ar: 'الجداء السلمي' }, description: { eu: 'u · v, perpendikularrak eta proiekzioak.', es: 'u · v, perpendiculares y proyecciones.', en: 'u · v, perpendiculars and projections.', ar: 'u · v والتعامد والإسقاطات.' } },
            { progressId: 119404, stage: 'cross', title: { eu: 'Biderkadura bektoriala', es: 'Producto vectorial', en: 'Cross product', ar: 'الجداء المتجهي' }, description: { eu: 'u × v eta azalerak.', es: 'u × v y áreas.', en: 'u × v and areas.', ar: 'u × v والمساحات.' } },
            { progressId: 119405, stage: 'mixed', title: { eu: 'Biderkadura mistoa', es: 'Producto mixto', en: 'Scalar triple product', ar: 'الجداء المختلط' }, description: { eu: '[u, v, w], bolumenak eta planokideak.', es: '[u, v, w], volúmenes y coplanarios.', en: '[u, v, w], volumes and coplanar vectors.', ar: '[u, v, w] والحجوم والمتجهات المستوية.' } }
        ]
    },
    {
        id: 'kind',
        title: { eu: 'Zenbakia ala bektorea?', es: '¿Número o vector?', en: 'Number or vector?', ar: 'عدد أم متجه؟' },
        tagline: { eu: 'Hiru biderkadurak nahastuta: zenbaki bat, bektore bat, ala zentzurik gabea? Gero, haren balioa.', es: 'Los tres productos mezclados: ¿un número, un vector o no tiene sentido? Después, su valor.', en: 'The three products mixed up: a number, a vector or does it make no sense? Then, its value.', ar: 'الجداءات الثلاثة مختلطة: عدد أم متجه أم بلا معنى؟ ثم قيمتها.' },
        skills: { eu: 'Eskalarra zenbaki bat da; bektoriala, bektore bat', es: 'El escalar es un número; el vectorial, un vector', en: 'The dot product is a number; the cross product, a vector', ar: 'السلمي عدد والمتجهي متجه' },
        levels: [
            { progressId: 119501, stage: 'cross', title: { eu: 'Oinarrizkoak', es: 'Básicas', en: 'Basic', ar: 'أساسية' }, description: { eu: 'u · v, u × v, 2u − v eta u · u.', es: 'u · v, u × v, 2u − v y u · u.', en: 'u · v, u × v, 2u − v and u · u.', ar: 'u · v وu × v و2u − v وu · u.' } },
            { progressId: 119502, stage: 'mixed', title: { eu: 'Nahastuak', es: 'Mezcladas', en: 'Mixed', ar: 'مختلطة' }, description: { eu: '[u, v, w], (u · v) w eta |u × v|.', es: '[u, v, w], (u · v) w y |u × v|.', en: '[u, v, w], (u · v) w and |u × v|.', ar: '[u, v, w] و(u · v) w و|u × v|.' } },
            { progressId: 119503, stage: 'mixed', title: { eu: 'Denak', es: 'Todas', en: 'All of them', ar: 'الكل' }, description: { eu: 'u × (v × w) ere bai.', es: 'También u × (v × w).', en: 'u × (v × w) too.', ar: 'وu × (v × w) أيضًا.' } }
        ]
    },
    {
        id: 'cross',
        title: { eu: 'Zein da u × v?', es: '¿Cuál es u × v?', en: 'Which is u × v?', ar: 'أيها u × v؟' },
        tagline: { eu: 'Lau gezi: biratu taula, erabili eskuineko eskua eta aukeratu u × v.', es: 'Cuatro flechas: gira el tablero, usa la mano derecha y elige u × v.', en: 'Four arrows: turn the board, use your right hand and pick u × v.', ar: 'أربعة أسهم: أدِر اللوحة واستعمل يدك اليمنى واختر u × v.' },
        skills: { eu: 'Bi bektoreekiko perpendikularra, noranzko egokian', es: 'Perpendicular a los dos, con el sentido correcto', en: 'Perpendicular to both, with the right sense', ar: 'عمودي على الاثنين وبالمنحى الصحيح' },
        levels: [
            { progressId: 119551, stage: 'cross', title: { eu: 'Ardatzetan', es: 'En los ejes', en: 'On the axes', ar: 'على المحاور' }, description: { eu: 'u eta v bi ardatzetan.', es: 'u y v sobre dos ejes.', en: 'u and v on two axes.', ar: 'u وv على محورين.' } },
            { progressId: 119552, stage: 'cross', title: { eu: 'Plano batean', es: 'En un plano', en: 'In a plane', ar: 'في مستوى' }, description: { eu: 'u plano koordenatu batean.', es: 'u en un plano coordenado.', en: 'u in a coordinate plane.', ar: 'u في مستوى إحداثي.' } },
            { progressId: 119553, stage: 'cross', title: { eu: 'Koordenatuekin', es: 'Con coordenadas', en: 'With coordinates', ar: 'بالمركّبات' }, description: { eu: 'Edozein bektore; geziek koordenatuak dituzte.', es: 'Cualquier vector; las flechas llevan coordenadas.', en: 'Any vectors; the arrows carry coordinates.', ar: 'أي متجهات؛ والأسهم بمركّباتها.' } }
        ]
    },
    {
        id: 'flat',
        title: { eu: 'Kutxa zapaldua', es: 'La caja aplastada', en: 'The flattened box', ar: 'الصندوق المنضغط' },
        tagline: { eu: 'Aurkitu kutxa zapaltzen duen k: hiru bektoreak plano batean.', es: 'Encuentra el k que aplasta la caja: los tres vectores en un plano.', en: 'Find the k that flattens the box: the three vectors in one plane.', ar: 'أوجد k الذي يضغط الصندوق: المتجهات الثلاثة في مستوى واحد.' },
        skills: { eu: 'Biderkadura mistoa eta bolumena', es: 'Producto mixto y volumen', en: 'Scalar triple product and volume', ar: 'الجداء المختلط والحجم' },
        levels: [
            { progressId: 119601, stage: 'mixed', title: { eu: 'Erraza', es: 'Fácil', en: 'Easy', ar: 'سهل' }, description: { eu: '0, 1 eta 2 koordenatuak.', es: 'Coordenadas 0, 1 y 2.', en: 'Coordinates 0, 1 and 2.', ar: 'المركّبات 0 و1 و2.' } },
            { progressId: 119602, stage: 'mixed', title: { eu: 'Edozein', es: 'Cualquiera', en: 'Any', ar: 'أي' }, description: { eu: 'Edozein bektore txiki.', es: 'Cualquier vector pequeño.', en: 'Any small vectors.', ar: 'أي متجهات صغيرة.' } },
            { progressId: 119603, stage: 'mixed', title: { eu: 'Bolumen jakin bat', es: 'Un volumen dado', en: 'A given volume', ar: 'حجم معلوم' }, description: { eu: 'k > 0, bolumen jakin bat lortzeko.', es: 'k > 0 para un volumen dado.', en: 'k > 0 for a given volume.', ar: 'k > 0 لحجم معلوم.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Espazioko bektoreen detektibea', es: 'Detective de vectores en el espacio', en: 'Space vectors detective', ar: 'مخبر المتجهات في الفضاء' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 119701, stage: 'dependence', title: { eu: 'Puntuak eta konbinazioak', es: 'Puntos y combinaciones', en: 'Points and combinations', ar: 'النقاط والتركيبات' }, description: { eu: 'AB, modulua, simetrikoa eta hirugarren ekuazioa.', es: 'AB, módulo, simétrico y la tercera ecuación.', en: 'AB, magnitude, symmetric point and the third equation.', ar: 'AB والطول والنظيرة والمعادلة الثالثة.' } },
            { progressId: 119702, stage: 'cross', title: { eu: 'Biderkadurak', es: 'Productos', en: 'Products', ar: 'الجداءات' }, description: { eu: 'Zenbakia ala bektorea, j bektorearen zeinua, ordena eta proiekzioa.', es: 'Número o vector, el signo de la j, el orden y la proyección.', en: 'Number or vector, the sign of the j, the order and the projection.', ar: 'عدد أم متجه، وإشارة j، والترتيب، والإسقاط.' } },
            { progressId: 119703, stage: 'mixed', title: { eu: 'Azalerak eta bolumenak', es: 'Áreas y volúmenes', en: 'Areas and volumes', ar: 'المساحات والحجوم' }, description: { eu: 'Erdia, seirena, balio absolutua eta errotazioak.', es: 'La mitad, la sexta parte, el valor absoluto y las rotaciones.', en: 'The half, the sixth, the absolute value and rotations.', ar: 'النصف والسدس والقيمة المطلقة والتدوير.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: eragiketa bat eta bere emaitza.', es: 'Encuentra las parejas: una operación y su resultado.', en: 'Find the pairs: an operation and its result.', ar: 'اعثر على الأزواج: عملية ونتيجتها.' },
        skills: { eu: 'Biderkadura eskalarra, modulua eta biderkadura bektoriala', es: 'Producto escalar, módulo y producto vectorial', en: 'Dot product, magnitude and cross product', ar: 'الجداء السلمي والطول والجداء المتجهي' },
        levels: [
            { progressId: 119801, stage: 'dot', title: { eu: 'Biderkadura eskalarra', es: 'Producto escalar', en: 'Dot product', ar: 'الجداء السلمي' }, description: { eu: '(1, 2, 3) · (2, 0, 1) ↔ 5', es: '(1, 2, 3) · (2, 0, 1) ↔ 5', en: '(1, 2, 3) · (2, 0, 1) ↔ 5', ar: '(1, 2, 3) · (2, 0, 1) ↔ 5' } },
            { progressId: 119802, stage: 'space', title: { eu: 'Modulua', es: 'Módulo', en: 'Magnitude', ar: 'الطول' }, description: { eu: '|(2, 3, 6)| ↔ 7', es: '|(2, 3, 6)| ↔ 7', en: '|(2, 3, 6)| ↔ 7', ar: '|(2, 3, 6)| ↔ 7' } },
            { progressId: 119803, stage: 'cross', title: { eu: 'Biderkadura bektoriala', es: 'Producto vectorial', en: 'Cross product', ar: 'الجداء المتجهي' }, description: { eu: '(1, 0, 0) × (0, 1, 0) ↔ (0, 0, 1)', es: '(1, 0, 0) × (0, 1, 0) ↔ (0, 0, 1)', en: '(1, 0, 0) × (0, 1, 0) ↔ (0, 0, 1)', ar: '(1, 0, 0) × (0, 1, 0) ↔ (0, 0, 1)' } }
        ]
    }
]

export const spaceVectorsGameProgressIds: number[] = levelProgressIds(spaceVectorsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const spaceVectorsGameSlugs: Record<SpaceVectorsGameId, string> = { race: 'lasterketa', kind: 'zenbakia-bektorea', cross: 'u-bider-v', flat: 'kutxa-zapaldua', detective: 'detektibea', memory: 'memoria' }

export function spaceVectorsGameModeForPath(pathname: string): SpaceVectorsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zenbakia-bektorea', 'numero-vector'].includes(game)) return 'kind'
    if (['u-bider-v', 'u-por-v'].includes(game)) return 'cross'
    if (['kutxa-zapaldua', 'caja-aplastada'].includes(game)) return 'flat'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

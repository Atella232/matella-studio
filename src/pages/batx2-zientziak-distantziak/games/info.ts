import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Angeluak eta distantziak (Batxilergoa 2 · Zientziak) games: the list
   shown in the hub, with levels and the unit progress id each level
   earns with its first star. Four games of their own (sine or cosine,
   the mirror, who is nearer and the detective), the race and the memory.
   ========================================================================== */

export type AnglesDistancesGameId = 'race' | 'sine' | 'mirror' | 'nearer' | 'detective' | 'memory'

export const ANGLES_DISTANCES_GAME_RECORDS_KEY = 'matella-distantziak-batx2z-game-records'

export const anglesDistancesGames: GameInfo<AnglesDistancesGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Angelu eta distantzien lasterketa', es: 'Carrera de ángulos y distancias', en: 'Race of angles and distances', ar: 'سباق الزوايا والمسافات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 121401, stage: 'angles', title: { eu: 'Angeluak', es: 'Ángulos', en: 'Angles', ar: 'الزوايا' }, description: { eu: 'Bi zuzen, zuzena eta planoa, bi plano.', es: 'Dos rectas, recta y plano, dos planos.', en: 'Two lines, a line and a plane, two planes.', ar: 'مستقيمان، مستقيم ومستوى، مستويان.' } },
            { progressId: 121402, stage: 'projections', title: { eu: 'Proiekzioak', es: 'Proyecciones', en: 'Projections', ar: 'المساقط' }, description: { eu: 'Oinaren t parametroa eta oinaren koordenatuak.', es: 'El t del pie y las coordenadas del pie.', en: 'The t of the foot and the coordinates of the foot.', ar: 't للمسقط وإحداثيات المسقط.' } },
            { progressId: 121403, stage: 'symmetric', title: { eu: 'Simetrikoak', es: 'Simétricos', en: 'Symmetric points', ar: 'النظائر' }, description: { eu: 'Planoarekiko eta zuzenarekiko simetrikoa, plano erdikaria.', es: 'Simétrico respecto de un plano y de una recta, plano mediador.', en: 'Symmetric about a plane and about a line, the mediator plane.', ar: 'النظيرة بالنسبة إلى مستوى وإلى مستقيم، والمستوى المنصِّف.' } },
            { progressId: 121404, stage: 'point-distances', title: { eu: 'Puntutik', es: 'Desde un punto', en: 'From a point', ar: 'من نقطة' }, description: { eu: 'Puntua eta planoa, plano paraleloak, puntua eta zuzena.', es: 'Punto y plano, planos paralelos, punto y recta.', en: 'Point and plane, parallel planes, point and line.', ar: 'نقطة ومستوى، مستويان متوازيان، نقطة ومستقيم.' } },
            { progressId: 121405, stage: 'line-distances', title: { eu: 'Zuzenen artean', es: 'Entre rectas', en: 'Between lines', ar: 'بين المستقيمات' }, description: { eu: 'Biderkadura mistoa, gurutzatzen direnak eta paraleloak.', es: 'Producto mixto, las que se cruzan y las paralelas.', en: 'Triple product, skew lines and parallel lines.', ar: 'الجداء المختلط والمتخالفان والمتوازيان.' } }
        ]
    },
    {
        id: 'sine',
        title: { eu: 'Sinua ala kosinua?', es: '¿Seno o coseno?', en: 'Sine or cosine?', ar: 'جيب أم جيب تمام؟' },
        tagline: { eu: 'Lehenik aukeratu formula, gero angelua. Kontuz osagarriarekin eta angelu kamutsarekin.', es: 'Primero elige la fórmula, después el ángulo. Cuidado con el complementario y el obtuso.', en: 'First choose the formula, then the angle. Watch out for the complement and the obtuse angle.', ar: 'اختر الصيغة أولًا ثم الزاوية. احذر من المتممة والزاوية المنفرجة.' },
        skills: { eu: 'Norabideak, normalak eta balio absolutua', es: 'Directores, normales y valor absoluto', en: 'Directions, normals and the absolute value', ar: 'متجهات التوجيه والناظمات والقيمة المطلقة' },
        levels: [
            { progressId: 121501, stage: 'angles', title: { eu: 'Kosinua', es: 'Coseno', en: 'Cosine', ar: 'جيب التمام' }, description: { eu: 'Bi zuzen edo bi plano.', es: 'Dos rectas o dos planos.', en: 'Two lines or two planes.', ar: 'مستقيمان أو مستويان.' } },
            { progressId: 121502, stage: 'angles', title: { eu: 'Sinua', es: 'Seno', en: 'Sine', ar: 'الجيب' }, description: { eu: 'Zuzena eta planoa.', es: 'Recta y plano.', en: 'A line and a plane.', ar: 'مستقيم ومستوى.' } },
            { progressId: 121503, stage: 'angles', title: { eu: 'Nahastuta', es: 'Mezclados', en: 'Mixed', ar: 'مختلطة' }, description: { eu: 'Hiru kasuak, ordenarik gabe.', es: 'Los tres casos, sin orden.', en: 'The three cases, in any order.', ar: 'الحالات الثلاث بلا ترتيب.' } }
        ]
    },
    {
        id: 'mirror',
        title: { eu: 'Ispilua', es: 'El espejo', en: 'The mirror', ar: 'المرآة' },
        tagline: { eu: 'Lau puntu taulan: bakarra da P puntuaren simetrikoa. Besteak ohiko akatsak dira.', es: 'Cuatro puntos en el tablero: solo uno es el simétrico de P. Los otros son errores típicos.', en: 'Four points on the board: only one is the symmetric of P. The others are typical mistakes.', ar: 'أربع نقاط على اللوحة: واحدة فقط نظيرة P. والبقية أخطاء شائعة.' },
        skills: { eu: 'Oina, erdiko puntua eta P′ = 2M − P', es: 'El pie, el punto medio y P′ = 2M − P', en: 'The foot, the midpoint and P′ = 2M − P', ar: 'المسقط والمنتصف وP′ = 2M − P' },
        levels: [
            { progressId: 121551, stage: 'symmetric', title: { eu: 'Plano errazak', es: 'Planos sencillos', en: 'Simple planes', ar: 'مستويات بسيطة' }, description: { eu: 'Normal bat ardatz baten norabidean.', es: 'Un normal en la dirección de un eje.', en: 'A normal along an axis.', ar: 'ناظم في اتجاه محور.' } },
            { progressId: 121552, stage: 'symmetric', title: { eu: 'Edozein plano', es: 'Cualquier plano', en: 'Any plane', ar: 'أي مستوى' }, description: { eu: 'Lehenik oina, gero simetrikoa.', es: 'Primero el pie, después el simétrico.', en: 'First the foot, then the symmetric point.', ar: 'المسقط أولًا ثم النظيرة.' } },
            { progressId: 121553, stage: 'symmetric', title: { eu: 'Zuzen batekiko', es: 'Respecto de una recta', en: 'About a line', ar: 'بالنسبة إلى مستقيم' }, description: { eu: 'Oina zuzenean, eta simetrikoa beste aldean.', es: 'El pie en la recta y el simétrico al otro lado.', en: 'The foot on the line and the symmetric point on the other side.', ar: 'المسقط على المستقيم والنظيرة في الجهة الأخرى.' } }
        ]
    },
    {
        id: 'nearer',
        title: { eu: 'Nor dago hurbilago?', es: '¿Quién está más cerca?', en: 'Who is nearer?', ar: 'من الأقرب؟' },
        tagline: { eu: 'Puntu bat eta bi objektu: kalkulatu bi distantziak eta aukeratu. Gero ikusi perpendikularrak taulan.', es: 'Un punto y dos objetos: calcula las dos distancias y elige. Después mira las perpendiculares en el tablero.', en: 'A point and two objects: work out both distances and choose. Then see the perpendiculars on the board.', ar: 'نقطة وجسمان: احسب المسافتين واختر. ثم شاهد العموديين على اللوحة.' },
        skills: { eu: 'Puntutik planora eta zuzenera distantzia', es: 'Distancia de un punto a un plano y a una recta', en: 'Distance from a point to a plane and to a line', ar: 'المسافة من نقطة إلى مستوى وإلى مستقيم' },
        levels: [
            { progressId: 121601, stage: 'point-distances', title: { eu: 'Bi plano', es: 'Dos planos', en: 'Two planes', ar: 'مستويان' }, description: { eu: 'Balio absolutua zati normalaren modulua.', es: 'Valor absoluto entre el módulo del normal.', en: 'Absolute value over the magnitude of the normal.', ar: 'القيمة المطلقة على طول الناظم.' } },
            { progressId: 121602, stage: 'point-distances', title: { eu: 'Planoa eta zuzena', es: 'Plano y recta', en: 'Plane and line', ar: 'مستوى ومستقيم' }, description: { eu: 'Formula bat objektu bakoitzeko.', es: 'Una fórmula para cada objeto.', en: 'One formula for each object.', ar: 'صيغة لكل جسم.' } },
            { progressId: 121603, stage: 'point-distances', title: { eu: 'Bi zuzen', es: 'Dos rectas', en: 'Two lines', ar: 'مستقيمان' }, description: { eu: 'Biderkadura bektoriala zati |u|.', es: 'Producto vectorial entre |u|.', en: 'Cross product over |u|.', ar: 'الجداء المتجهي على |u|.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Angelu eta distantzien detektibea', es: 'Detective de ángulos y distancias', en: 'Angles and distances detective', ar: 'مخبر الزوايا والمسافات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 121701, stage: 'angles', title: { eu: 'Angeluak eta oinak', es: 'Ángulos y pies', en: 'Angles and feet', ar: 'الزوايا والمساقط' }, description: { eu: 'Balio absolutua, sinua, t eta oina.', es: 'El valor absoluto, el seno, la t y el pie.', en: 'The absolute value, the sine, t and the foot.', ar: 'القيمة المطلقة والجيب وt والمسقط.' } },
            { progressId: 121702, stage: 'point-distances', title: { eu: 'Puntu batetik', es: 'Desde un punto', en: 'From a point', ar: 'من نقطة' }, description: { eu: 'Modulua, D, normal bera eta |AP|.', es: 'El módulo, la D, el mismo normal y |AP|.', en: 'The magnitude, D, the same normal and |AP|.', ar: 'الطول وD والناظم نفسه و|AP|.' } },
            { progressId: 121703, stage: 'line-distances', title: { eu: 'Zuzenen artean', es: 'Entre rectas', en: 'Between lines', ar: 'بين المستقيمات' }, description: { eu: 'Oinarria, formula egokia eta plano erdikaria.', es: 'La base, la fórmula adecuada y el plano mediador.', en: 'The base, the right formula and the mediator plane.', ar: 'القاعدة والصيغة المناسبة والمستوى المنصِّف.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: puntu bat eta plano bat bere distantziarekin, edo puntu bat bere simetrikoarekin.', es: 'Encuentra las parejas: un punto y un plano con su distancia, o un punto con su simétrico.', en: 'Find the pairs: a point and a plane with their distance, or a point with its symmetric point.', ar: 'اعثر على الأزواج: نقطة ومستوى مع مسافتهما، أو نقطة مع نظيرتها.' },
        skills: { eu: 'Distantziak eta simetrikoak buruz', es: 'Distancias y simétricos de cabeza', en: 'Distances and symmetric points in your head', ar: 'المسافات والنظائر ذهنيًا' },
        levels: [
            { progressId: 121801, stage: 'point-distances', title: { eu: 'Puntua eta planoa', es: 'Punto y plano', en: 'Point and plane', ar: 'نقطة ومستوى' }, description: { eu: 'P(1, 2, 1), z = 4 ↔ d = 3', es: 'P(1, 2, 1), z = 4 ↔ d = 3', en: 'P(1, 2, 1), z = 4 ↔ d = 3', ar: 'P(1, 2, 1), z = 4 ↔ d = 3' } },
            { progressId: 121802, stage: 'point-distances', title: { eu: 'Plano paraleloak', es: 'Planos paralelos', en: 'Parallel planes', ar: 'مستويان متوازيان' }, description: { eu: 'x = 1, 2x = 8 ↔ d = 3', es: 'x = 1, 2x = 8 ↔ d = 3', en: 'x = 1, 2x = 8 ↔ d = 3', ar: 'x = 1, 2x = 8 ↔ d = 3' } },
            { progressId: 121803, stage: 'symmetric', title: { eu: 'Simetrikoa', es: 'Simétrico', en: 'Symmetric point', ar: 'النظيرة' }, description: { eu: 'P(1, 2, 3), z = 1 ↔ (1, 2, −1)', es: 'P(1, 2, 3), z = 1 ↔ (1, 2, −1)', en: 'P(1, 2, 3), z = 1 ↔ (1, 2, −1)', ar: 'P(1, 2, 3), z = 1 ↔ (1, 2, −1)' } }
        ]
    }
]

export const anglesDistancesGameProgressIds: number[] = levelProgressIds(anglesDistancesGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const anglesDistancesGameSlugs: Record<AnglesDistancesGameId, string> = { race: 'lasterketa', sine: 'sinua-kosinua', mirror: 'ispilua', nearer: 'hurbilago', detective: 'detektibea', memory: 'memoria' }

export function anglesDistancesGameModeForPath(pathname: string): AnglesDistancesGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['sinua-kosinua', 'seno-coseno'].includes(game)) return 'sine'
    if (['ispilua', 'espejo'].includes(game)) return 'mirror'
    if (['hurbilago', 'mas-cerca'].includes(game)) return 'nearer'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

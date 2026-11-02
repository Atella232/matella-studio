import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Irudi lauak (1. DBH) games: the list shown in the hub, with levels and
   the unit progress id each level earns with its first star.
   ========================================================================== */

export type FiguresGameId = 'race' | 'memory' | 'sticks' | 'symmetry' | 'detective'

export const FIGURES_GAME_RECORDS_KEY = 'matella-figurak-dbh1-game-records'

export const figuresGames: GameInfo<FiguresGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Irudien lasterketa', es: 'Carrera de figuras', en: 'Shape race', ar: 'سباق الأشكال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 18101, stage: 'polygons', title: { eu: 'Poligonoak', es: 'Polígonos', en: 'Polygons', ar: 'المضلعات' }, description: { eu: 'Diagonalak eta angeluak.', es: 'Diagonales y ángulos.', en: 'Diagonals and angles.', ar: 'الأقطار والزوايا.' } },
            { progressId: 18102, stage: 'triangles', title: { eu: 'Triangeluak', es: 'Triángulos', en: 'Triangles', ar: 'المثلثات' }, description: { eu: 'Isoszeleak, aldeak eta zirkunferentzia.', es: 'Isósceles, lados y circunferencia.', en: 'Isosceles, sides and circumference.', ar: 'متساوي الساقين والأضلاع والدائرة.' } },
            { progressId: 18103, stage: 'quadrilaterals', title: { eu: 'Laukiak', es: 'Cuadriláteros', en: 'Quadrilaterals', ar: 'الرباعيات' }, description: { eu: 'Angeluak eta simetria-ardatzak.', es: 'Ángulos y ejes de simetría.', en: 'Angles and lines of symmetry.', ar: 'الزوايا ومحاور التناظر.' } },
            { progressId: 18104, stage: 'circles', title: { eu: 'Zirkunferentziak', es: 'Circunferencias', en: 'Circumferences', ar: 'الدوائر' }, description: { eu: 'Ukitzaileak eta angeluak.', es: 'Tangentes y ángulos.', en: 'Tangents and angles.', ar: 'التماس والزوايا.' } },
            { progressId: 18105, stage: 'areas', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' }, description: { eu: 'Sektoreak, koroak eta L formak.', es: 'Sectores, coronas y figuras en L.', en: 'Sectors, rings and L-shapes.', ar: 'القطاعات والحلقات والأشكال L.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', en: 'Find the cards that are worth the same.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Poligonoen angeluak eta diagonalak', es: 'Ángulos y diagonales de polígonos', en: 'Angles and diagonals of polygons', ar: 'زوايا المضلعات وأقطارها' },
        levels: [
            { progressId: 18201, stage: 'polygons', title: { eu: 'Angeluen batura', es: 'Suma de ángulos', en: 'Sum of angles', ar: 'مجموع الزوايا' }, description: { eu: '(5 − 2) · 180° ↔ 540°', es: '(5 − 2) · 180° ↔ 540°', en: '(5 − 2) · 180° ↔ 540°', ar: '(5 − 2) · 180° ↔ 540°' } },
            { progressId: 18202, stage: 'polygons', title: { eu: 'Angelu zentrala', es: 'Ángulo central', en: 'Central angle', ar: 'الزاوية المركزية' }, description: { eu: '360° : 8 ↔ 45°', es: '360° : 8 ↔ 45°', en: '360° : 8 ↔ 45°', ar: '360° : 8 ↔ 45°' } },
            { progressId: 18203, stage: 'polygons', title: { eu: 'Diagonalak', es: 'Diagonales', en: 'Diagonals', ar: 'الأقطار' }, description: { eu: '6 · 3 : 2 ↔ 9', es: '6 · 3 : 2 ↔ 9', en: '6 · 3 : 2 ↔ 9', ar: '6 · 3 : 2 ↔ 9' } }
        ]
    },
    {
        id: 'sticks',
        title: { eu: 'Eraiki daiteke?', es: '¿Se puede construir?', en: 'Can it be built?', ar: 'هل يمكن البناء؟' },
        tagline: { eu: 'Hiru makil: triangelua ixten da ala ez? Gero, makilak ixten saiatzen dira.', es: 'Tres palitos: ¿se cierra el triángulo? Luego, los palitos intentan cerrarse.', en: 'Three sticks: does the triangle close? Then the sticks try to close.', ar: 'ثلاثة عيدان: هل يُغلق المثلث؟ ثم تحاول العيدان أن تُغلق.' },
        skills: { eu: 'Desberdintza triangeluarra', es: 'Desigualdad triangular', en: 'The triangle inequality', ar: 'متباينة المثلث' },
        levels: [
            { progressId: 18301, stage: 'triangles', title: { eu: 'Argiak', es: 'Claros', en: 'Clear cases', ar: 'حالات واضحة' }, description: { eu: 'Bai ala ez.', es: 'Sí o no.', en: 'Yes or no.', ar: 'نعم أو لا.' } },
            { progressId: 18302, stage: 'triangles', title: { eu: 'Mugan', es: 'En el límite', en: 'On the edge', ar: 'على الحد' }, description: { eu: 'Batura berdina denean ere bai.', es: 'También cuando la suma es igual.', en: 'Also when the sum is equal.', ar: 'وحين يتساوى المجموع أيضًا.' } },
            { progressId: 18303, stage: 'triangles', title: { eu: 'Hirugarren aldea', es: 'El tercer lado', en: 'The third side', ar: 'الضلع الثالث' }, description: { eu: 'Laburrena eta luzeena.', es: 'El más corto y el más largo.', en: 'The shortest and the longest.', ar: 'الأقصر والأطول.' } }
        ]
    },
    {
        id: 'symmetry',
        title: { eu: 'Simetria-ardatzak', es: 'Ejes de simetría', en: 'Lines of symmetry', ar: 'محاور التناظر' },
        tagline: { eu: 'Sakatu ardatzak diren lerroak edo kontatu ardatzak; gero, ardatz guztiak.', es: 'Toca las líneas que son ejes o cuenta los ejes; luego, todos los ejes.', en: 'Tap the lines that are axes or count them; then all the axes.', ar: 'المس الخطوط التي هي محاور أو عدّها، ثم كل المحاور.' },
        skills: { eu: 'Simetria irudi lauetan', es: 'Simetría en figuras planas', en: 'Symmetry in plane shapes', ar: 'التناظر في الأشكال المستوية' },
        levels: [
            { progressId: 18401, stage: 'quadrilaterals', title: { eu: 'Laukiak', es: 'Cuadriláteros', en: 'Quadrilaterals', ar: 'الرباعيات' }, description: { eu: 'Laukizuzena, karratua, erronboa…', es: 'Rectángulo, cuadrado, rombo…', en: 'Rectangle, square, rhombus…', ar: 'المستطيل والمربع والمعين…' } },
            { progressId: 18402, stage: 'triangles', title: { eu: 'Bat ere ez?', es: '¿Ninguno?', en: 'None?', ar: 'ولا واحد؟' }, description: { eu: 'Paralelogramoak eta triangeluak.', es: 'Paralelogramos y triángulos.', en: 'Parallelograms and triangles.', ar: 'متوازيات الأضلاع والمثلثات.' } },
            { progressId: 18403, stage: 'polygons', title: { eu: 'Zenbat ardatz?', es: '¿Cuántos ejes?', en: 'How many axes?', ar: 'كم محورًا؟' }, description: { eu: 'Poligono erregularrak ere bai.', es: 'También polígonos regulares.', en: 'Regular polygons too.', ar: 'والمضلعات المنتظمة أيضًا.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Irudien detektibea', es: 'Detective de figuras', en: 'Shapes detective', ar: 'مخبر الأشكال' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Irudi lauetan akats tipikoak', es: 'Errores típicos con figuras planas', en: 'Common mistakes with plane shapes', ar: 'الأخطاء الشائعة في الأشكال المستوية' },
        levels: [
            { progressId: 18501, stage: 'polygons', title: { eu: 'Poligonoak', es: 'Polígonos', en: 'Polygons', ar: 'المضلعات' }, description: { eu: 'Diagonalak eta angeluak.', es: 'Diagonales y ángulos.', en: 'Diagonals and angles.', ar: 'الأقطار والزوايا.' } },
            { progressId: 18502, stage: 'triangles', title: { eu: 'Triangeluak eta laukiak', es: 'Triángulos y cuadriláteros', en: 'Triangles and quadrilaterals', ar: 'المثلثات والرباعيات' }, description: { eu: 'Aldeak eta angeluak.', es: 'Lados y ángulos.', en: 'Sides and angles.', ar: 'الأضلاع والزوايا.' } },
            { progressId: 18503, stage: 'areas', title: { eu: 'Zirkuluak eta azalerak', es: 'Círculos y áreas', en: 'Circles and areas', ar: 'الدوائر والمساحات' }, description: { eu: 'Inskribatua, zuloak eta koroak.', es: 'Inscritos, huecos y coronas.', en: 'Inscribed angles, holes and rings.', ar: 'الزوايا المحيطية والفراغات والحلقات.' } }
        ]
    }
]

export const figuresGameProgressIds: number[] = levelProgressIds(figuresGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const figuresGameSlugs: Record<FiguresGameId, string> = { race: 'lasterketa', memory: 'memoria', sticks: 'makilak', symmetry: 'simetria', detective: 'detektibea' }

export function figuresGameModeForPath(pathname: string): FiguresGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['makilak', 'palitos'].includes(game)) return 'sticks'
    if (['simetria', 'simetria-ejes'].includes(game)) return 'symmetry'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

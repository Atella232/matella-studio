import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Geometria (1. DBH) games: the list shown in the hub, with levels and the
   unit progress id each level earns with its first star.
   ========================================================================== */

export type GeometryGameId = 'race' | 'angles' | 'memory'

export const GEOMETRY_GAME_RECORDS_KEY = 'matella-geometria-dbh1-game-records'

export const geometryGames: GameInfo<GeometryGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Geometriaren lasterketa', es: 'Carrera de geometría', en: 'Geometry race', ar: 'سباق الهندسة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 10101, stage: 'angles', title: { eu: 'Angeluak', es: 'Ángulos', en: 'Angles', ar: 'الزوايا' }, description: { eu: 'Osagarriak, betegarriak eta erpinez aurkakoak.', es: 'Complementarios, suplementarios y opuestos por el vértice.', en: 'Complementary, supplementary and vertically opposite angles.', ar: 'المتتامة والمتكاملة والمتقابلة بالرأس.' } },
            { progressId: 10102, stage: 'polygons', title: { eu: 'Poligonoak', es: 'Polígonos', en: 'Polygons', ar: 'المضلعات' }, description: { eu: 'Triangeluen eta laukien angeluak.', es: 'Ángulos de triángulos y cuadriláteros.', en: 'Angles of triangles and quadrilaterals.', ar: 'زوايا المثلثات والرباعيات.' } },
            { progressId: 10103, stage: 'pythagoras', title: { eu: 'Pitagoras', es: 'Pitágoras', en: 'Pythagoras', ar: 'فيثاغورس' }, description: { eu: 'Hipotenusa eta katetoak.', es: 'Hipotenusa y catetos.', en: 'Hypotenuse and legs.', ar: 'الوتر والضلعان القائمان.' } },
            { progressId: 10104, stage: 'perimeters', title: { eu: 'Perimetroak', es: 'Perímetros', en: 'Perimeters', ar: 'المحيطات' }, description: { eu: 'Poligonoak, unitateak eta zirkunferentzia.', es: 'Polígonos, unidades y circunferencia.', en: 'Polygons, units and circumference.', ar: 'المضلعات والوحدات والدائرة.' } },
            { progressId: 10105, stage: 'areas', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' }, description: { eu: 'Laukizuzena, triangelua, erronboa, trapezioa eta zirkulua.', es: 'Rectángulo, triángulo, rombo, trapecio y círculo.', en: 'Rectangle, triangle, rhombus, trapezium and circle.', ar: 'المستطيل والمثلث والمعيّن وشبه المنحرف والقرص.' } }
        ]
    },
    {
        id: 'angles',
        title: { eu: 'Angelu-begia', es: 'Ojo de ángulos', en: 'Eye for angles', ar: 'عين الزوايا' },
        tagline: { eu: 'Angelu bat ikusi eta asmatu zenbat gradu dituen. Zenbat eta hurbilago, orduan eta puntu gehiago.', es: 'Mira un ángulo y estima cuántos grados mide. Cuanto más cerca, más puntos.', en: 'Look at an angle and estimate how many degrees it measures. The closer, the more points.', ar: 'انظر إلى زاوية وقدّر قياسها بالدرجات. كلما اقتربت زادت النقاط.' },
        skills: { eu: 'Angeluen estimazioa', es: 'Estimación de ángulos', en: 'Estimating angles', ar: 'تقدير الزوايا' },
        levels: [
            { progressId: 10201, stage: 'angles', title: { eu: '0°-tik 180°-ra, 10ez 10', es: 'De 0° a 180°, de 10 en 10', en: 'From 0° to 180°, in steps of 10.', ar: 'من 0° إلى 180°، كل 10' }, description: { eu: 'Zorrotzak eta kamutsak.', es: 'Agudos y obtusos.', en: 'Acute and obtuse.', ar: 'حادة ومنفرجة.' } },
            { progressId: 10202, stage: 'angles', title: { eu: '0°-tik 180°-ra, 5ez 5', es: 'De 0° a 180°, de 5 en 5', en: 'From 0° to 180°, in steps of 5.', ar: 'من 0° إلى 180°، كل 5' }, description: { eu: 'Zehaztasun handiagoa.', es: 'Más precisión.', en: 'More precision.', ar: 'دقة أكبر.' } },
            { progressId: 10203, stage: 'angles', title: { eu: '360° arte', es: 'Hasta 360°', en: 'Up to 360°.', ar: 'حتى 360°' }, description: { eu: '180° baino handiagoak ere bai.', es: 'También mayores de 180°.', en: 'Also greater than 180°.', ar: 'وأكبر من 180° أيضًا.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak: kalkulu bat eta bere emaitza.', es: 'Encuentra las cartas que valen lo mismo: un cálculo y su resultado.', en: 'Find the cards that are worth the same: a calculation and its result.', ar: 'جد البطاقات ذات القيمة نفسها: عملية وناتجها.' },
        skills: { eu: 'Angeluak, azalerak eta Pitagoras', es: 'Ángulos, áreas y Pitágoras', en: 'Angles, areas and Pythagoras.', ar: 'الزوايا والمساحات وفيثاغورس' },
        levels: [
            { progressId: 10301, stage: 'angles', title: { eu: 'Osagarriak eta betegarriak', es: 'Complementarios y suplementarios', en: 'Complementary and supplementary.', ar: 'المتتامة والمتكاملة' }, description: { eu: '90° − 35° ↔ 55°', es: '90° − 35° ↔ 55°', en: '90° − 35° ↔ 55°', ar: '90° − 35° ↔ 55°' } },
            { progressId: 10302, stage: 'areas', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' }, description: { eu: '6 · 4 ↔ 24', es: '6 · 4 ↔ 24', en: '6 · 4 ↔ 24', ar: '6 · 4 ↔ 24' } },
            { progressId: 10303, stage: 'pythagoras', title: { eu: 'Hipotenusak', es: 'Hipotenusas', en: 'Hypotenuses', ar: 'الأوتار' }, description: { eu: '√(3² + 4²) ↔ 5', es: '√(3² + 4²) ↔ 5', en: '√(3² + 4²) ↔ 5', ar: '√(3² + 4²) ↔ 5' } }
        ]
    }
]

export const geometryGameProgressIds: number[] = levelProgressIds(geometryGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const geometryGameSlugs: Record<GeometryGameId, string> = { race: 'lasterketa', angles: 'angeluak', memory: 'memoria' }

export function geometryGameModeForPath(pathname: string): GeometryGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['angulos', 'angeluak'].includes(game)) return 'angles'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

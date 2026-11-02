import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Perimetroak, azalerak eta bolumenak (4. DBH aplikatuak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star.
   ========================================================================== */

export type AreasVolumesGameId = 'race' | 'memory' | 'tiles' | 'pour' | 'detective'

export const AREAS_VOLUMES_GAME_RECORDS_KEY = 'matella-areak-dbh4ap-game-records'

export const areasVolumesGames: GameInfo<AreasVolumesGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Neurrien lasterketa', es: 'Carrera de medidas', en: 'Measurements race', ar: 'سباق القياسات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 50101, stage: 'polygons', title: { eu: 'Poligonoak', es: 'Polígonos', en: 'Polygons', ar: 'المضلعات' }, description: { eu: 'Angeluak, diagonalak, zirkunferentziak eta arkuak.', es: 'Ángulos, diagonales, circunferencias y arcos.', en: 'Angles, diagonals, circumferences and arcs.', ar: 'الزوايا والأقطار والدوائر والأقواس.' } },
            { progressId: 50102, stage: 'pythagoras', title: { eu: 'Pitagoras', es: 'Pitágoras', en: 'Pythagoras', ar: 'فيثاغورس' }, description: { eu: 'Aldeak, altuerak eta eskailerak.', es: 'Lados, alturas y escaleras.', en: 'Sides, heights and staircase shapes.', ar: 'الأضلاع والارتفاعات والسلالم.' } },
            { progressId: 50103, stage: 'plane-areas', title: { eu: 'Azalera lauak', es: 'Áreas planas', en: 'Areas of flat shapes', ar: 'المساحات المستوية' }, description: { eu: 'Poligonoak, sektoreak, koroak eta L irudiak.', es: 'Polígonos, sectores, coronas y figuras en L.', en: 'Polygons, sectors, rings and L-shapes.', ar: 'المضلعات والقطاعات والحلقات والأشكال L.' } },
            { progressId: 50104, stage: 'solid-areas', title: { eu: 'Gorputzen azalerak', es: 'Áreas de cuerpos', en: 'Areas of solids', ar: 'مساحات الأجسام' }, description: { eu: 'Kuboak, piramideak, zilindroak eta konoak.', es: 'Cubos, pirámides, cilindros y conos.', en: 'Cubes, pyramids, cylinders and cones.', ar: 'المكعبات والأهرامات والأسطوانات والمخاريط.' } },
            { progressId: 50105, stage: 'volumes', title: { eu: 'Bolumenak', es: 'Volúmenes', en: 'Volumes', ar: 'الحجوم' }, description: { eu: 'Gorputz bakunak eta konposatuak.', es: 'Cuerpos simples y compuestos.', en: 'Simple and compound solids.', ar: 'الأجسام البسيطة والمركّبة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu kalkulu bakoitza bere emaitzarekin.', es: 'Une cada cálculo con su resultado.', en: 'Match each calculation with its result.', ar: 'صِل كل حساب بنتيجته.' },
        skills: { eu: 'Angeluak, azalerak eta bolumenak', es: 'Ángulos, áreas y volúmenes', en: 'Angles, areas and volumes', ar: 'الزوايا والمساحات والحجوم' },
        levels: [
            { progressId: 50201, stage: 'polygons', title: { eu: 'Angeluen batura', es: 'Suma de ángulos', en: 'Sum of angles', ar: 'مجموع الزوايا' }, description: { eu: '(5 − 2) · 180° ↔ 540°', es: '(5 − 2) · 180° ↔ 540°', en: '(5 − 2) · 180° ↔ 540°', ar: '(5 − 2) · 180° ↔ 540°' } },
            { progressId: 50202, stage: 'plane-areas', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' }, description: { eu: '(7 + 3) · 4 : 2 ↔ 20', es: '(7 + 3) · 4 : 2 ↔ 20', en: '(7 + 3) · 4 : 2 ↔ 20', ar: '(7 + 3) · 4 : 2 ↔ 20' } },
            { progressId: 50203, stage: 'volumes', title: { eu: 'Bolumenak', es: 'Volúmenes', en: 'Volumes', ar: 'الحجوم' }, description: { eu: '6² · 9 : 3 ↔ 108', es: '6² · 9 : 3 ↔ 108', en: '6² · 9 : 3 ↔ 108', ar: '6² · 9 : 3 ↔ 108' } }
        ]
    },
    {
        id: 'tiles',
        title: { eu: 'Lauzatu lurra', es: 'Embaldosa el suelo', en: 'Tile the floor', ar: 'بلّط الأرضية' },
        tagline: { eu: 'Plano bat eta lauza bat: zenbat lauza behar dira? Gero, jarri eta begiratu.', es: 'Un plano y una baldosa: ¿cuántas hacen falta? Luego colócalas y mira.', en: 'A plan and a tile: how many are needed? Then lay them and look.', ar: 'مخطط وبلاطة: كم بلاطة نحتاج؟ ثم ضعها وانظر.' },
        skills: { eu: 'Azalera lauak eta unitateak', es: 'Áreas planas y unidades', en: 'Areas of flat shapes and units', ar: 'المساحات المستوية والوحدات' },
        levels: [
            { progressId: 50301, stage: 'plane-areas', title: { eu: 'Laukizuzenak', es: 'Rectángulos', en: 'Rectangles', ar: 'المستطيلات' }, description: { eu: 'Lauza karratuak.', es: 'Baldosas cuadradas.', en: 'Square tiles.', ar: 'بلاطات مربعة.' } },
            { progressId: 50302, stage: 'plane-areas', title: { eu: 'L formako lurzoruak', es: 'Suelos en L', en: 'L-shaped floors', ar: 'أرضيات على شكل L' }, description: { eu: 'Zatitu bi laukizuzenetan.', es: 'Pártelos en dos rectángulos.', en: 'Split them into two rectangles.', ar: 'قسّمها إلى مستطيلين.' } },
            { progressId: 50303, stage: 'plane-areas', title: { eu: 'L, U eta T', es: 'L, U y T', en: 'L, U and T', ar: 'L وU وT' }, description: { eu: 'Lauza luzangak.', es: 'Baldosas alargadas.', en: 'Oblong tiles.', ar: 'بلاطات مستطيلة.' } }
        ]
    },
    {
        id: 'pour',
        title: { eu: 'Zenbat ontzi?', es: '¿Cuántos vasos?', en: 'How many glasses?', ar: 'كم كأسًا؟' },
        tagline: { eu: 'Bi ontzi eskala berean: zenbat aldiz hustu behar da txikia handia betetzeko?', es: 'Dos recipientes a la misma escala: ¿cuántas veces vacías el pequeño para llenar el grande?', en: 'Two containers drawn to the same scale: how many times do you empty the small one to fill the big one?', ar: 'وعاءان بالمقياس نفسه: كم مرة تفرغ الصغير لتملأ الكبير؟' },
        skills: { eu: 'Bolumenak eta haien arrazoia', es: 'Volúmenes y su razón', en: 'Volumes and their ratio', ar: 'الحجوم ونسبتها' },
        levels: [
            { progressId: 50401, stage: 'volumes', title: { eu: 'Oinarri bera', es: 'La misma base', en: 'The same base', ar: 'القاعدة نفسها' }, description: { eu: 'Konoa zilindroan, piramidea prisman.', es: 'Cono en cilindro, pirámide en prisma.', en: 'Cone into cylinder, pyramid into prism.', ar: 'مخروط في أسطوانة وهرم في منشور.' } },
            { progressId: 50402, stage: 'volumes', title: { eu: 'Beste oinarri bat', es: 'Otra base', en: 'Another base', ar: 'قاعدة أخرى' }, description: { eu: 'r² eta a² kontuan hartuta.', es: 'Cuentan r² y a².', en: 'r² and a² count.', ar: 'يُحسب r² وa².' } },
            { progressId: 50403, stage: 'volumes', title: { eu: 'Esferak', es: 'Esferas', en: 'Spheres', ar: 'الكرات' }, description: { eu: 'Esferak, erdiesferak eta konoak.', es: 'Esferas, semiesferas y conos.', en: 'Spheres, hemispheres and cones.', ar: 'كرات وأنصاف كرات ومخاريط.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Geometriaren detektibea', es: 'Detective de geometría', en: 'Geometry detective', ar: 'مخبر الهندسة' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Azalera eta bolumenetako akats tipikoak', es: 'Errores típicos en áreas y volúmenes', en: 'Common mistakes with areas and volumes', ar: 'الأخطاء الشائعة في المساحات والحجوم' },
        levels: [
            { progressId: 50501, stage: 'plane-areas', title: { eu: 'Azalera lauak', es: 'Áreas planas', en: 'Areas of flat shapes', ar: 'المساحات المستوية' }, description: { eu: 'Altuerak, apotemak, sektoreak eta koroak.', es: 'Alturas, apotemas, sectores y coronas.', en: 'Heights, apothems, sectors and rings.', ar: 'الارتفاعات والعوامد والقطاعات والحلقات.' } },
            { progressId: 50502, stage: 'solid-areas', title: { eu: 'Gorputzen azalerak', es: 'Áreas de cuerpos', en: 'Areas of solids', ar: 'مساحات الأجسام' }, description: { eu: 'Konoak, esferak eta gorputz konposatuak.', es: 'Conos, esferas y cuerpos compuestos.', en: 'Cones, spheres and compound solids.', ar: 'المخاريط والكرات والأجسام المركّبة.' } },
            { progressId: 50503, stage: 'volumes', title: { eu: 'Bolumenak', es: 'Volúmenes', en: 'Volumes', ar: 'الحجوم' }, description: { eu: 'Erdiesferak, konoak eta zuloak.', es: 'Semiesferas, conos y agujeros.', en: 'Hemispheres, cones and holes.', ar: 'أنصاف الكرات والمخاريط والثقوب.' } }
        ]
    }
]

export const areasVolumesGameProgressIds: number[] = levelProgressIds(areasVolumesGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const areasVolumesGameSlugs: Record<AreasVolumesGameId, string> = { race: 'lasterketa', memory: 'memoria', tiles: 'lauzak', pour: 'ontziak', detective: 'detektibea' }

export function areasVolumesGameModeForPath(pathname: string): AreasVolumesGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['lauzak', 'baldosas'].includes(game)) return 'tiles'
    if (['ontziak', 'vasos'].includes(game)) return 'pour'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

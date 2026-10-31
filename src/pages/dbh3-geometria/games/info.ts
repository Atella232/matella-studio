import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Planoko geometria (3. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   Four games belong to this topic (hunting angles, which triangle it is,
   which notable point it is and the geometry detective); the race and the
   memory are shared engines. Level descriptions are plain text.
   ========================================================================== */

export type Geometry3GameId = 'race' | 'angles' | 'triangle' | 'point' | 'detective' | 'memory'

export const GEOMETRY3_GAME_RECORDS_KEY = 'matella-geometria-dbh3-game-records'

export const geometry3Games: GameInfo<Geometry3GameId>[] = [
    {
        id: 'race',
        title: { eu: 'Geometriaren lasterketa', es: 'Carrera de geometría', en: 'Geometry race', ar: 'سباق الهندسة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك وتجعلها الأخطاء تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 96101, stage: 'angles', title: { eu: 'Angeluak', es: 'Ángulos', en: 'Angles', ar: 'الزوايا' }, description: { eu: 'Poligonoak eta zirkunferentzia.', es: 'Polígonos y circunferencia.', en: 'Polygons and the circle.', ar: 'المضلعات والدائرة.' } },
            { progressId: 96102, stage: 'loci', title: { eu: 'Puntu nabarmenak', es: 'Puntos notables', en: 'Notable points', ar: 'النقاط الشهيرة' }, description: { eu: 'Erdibitzaileak eta medianak.', es: 'Mediatrices y medianas.', en: 'Bisectors and medians.', ar: 'المنصّفات والمتوسطات.' } },
            { progressId: 96103, stage: 'pythagoras', title: { eu: 'Pitagoras', es: 'Pitágoras', en: 'Pythagoras', ar: 'فيثاغورس' }, description: { eu: 'Hipotenusak eta katetoak.', es: 'Hipotenusas y catetos.', en: 'Hypotenuses and legs.', ar: 'الأوتار والأضلاع القائمة.' } },
            { progressId: 96104, stage: 'areas', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' }, description: { eu: 'Poligonoak eta zirkuluak.', es: 'Polígonos y círculos.', en: 'Polygons and circles.', ar: 'المضلعات والدوائر.' } },
            { progressId: 96105, stage: 'similarity', title: { eu: 'Antzekotasuna', es: 'Semejanza', en: 'Similarity', ar: 'التشابه' }, description: { eu: 'Tales eta eskalak.', es: 'Tales y escalas.', en: 'Thales and scales.', ar: 'طاليس والمقاييس.' } }
        ]
    },
    {
        id: 'angles',
        title: { eu: 'Angeluen ehiza', es: 'La caza de ángulos', en: 'Angle hunt', ar: 'صيد الزوايا' },
        tagline: { eu: 'Irudian angelu bat falta da: aurkitu haren neurria.', es: 'En la figura falta un ángulo: encuentra cuánto mide.', en: 'An angle is missing from the figure: find its size.', ar: 'تنقص الشكلَ زاوية: جد قياسها.' },
        skills: { eu: 'Poligonoen eta zirkunferentziaren angeluak', es: 'Ángulos de polígonos y de la circunferencia', en: 'Angles of polygons and circles', ar: 'زوايا المضلعات والدائرة' },
        levels: [
            { progressId: 96301, stage: 'angles', title: { eu: 'Triangeluak eta laukiak', es: 'Triángulos y cuadriláteros', en: 'Triangles and quadrilaterals', ar: 'المثلثات والرباعيات' }, description: { eu: '180° eta 360°.', es: '180° y 360°.', en: '180° and 360°.', ar: '180° و360°.' } },
            { progressId: 96302, stage: 'angles', title: { eu: 'Poligono erregularrak', es: 'Polígonos regulares', en: 'Regular polygons', ar: 'المضلعات المنتظمة' }, description: { eu: 'Barnekoa eta kanpokoa.', es: 'Interior y exterior.', en: 'Interior and exterior.', ar: 'الداخلية والخارجية.' } },
            { progressId: 96303, stage: 'angles', title: { eu: 'Zirkunferentzia', es: 'Circunferencia', en: 'The circle', ar: 'الدائرة' }, description: { eu: 'Zentrala eta inskribatua.', es: 'Central e inscrito.', en: 'Central and inscribed.', ar: 'المركزية والمحيطية.' } }
        ]
    },
    {
        id: 'triangle',
        title: { eu: 'Zer triangelu da?', es: '¿Qué triángulo es?', en: 'Which triangle is it?', ar: 'أي مثلث هذا؟' },
        tagline: { eu: 'Hiru aldeak ezagututa, esan zorrotza, zuzena ala kamutsa den.', es: 'Con los tres lados, di si es acutángulo, rectángulo u obtusángulo.', en: 'Given the three sides, say whether it is acute, right or obtuse.', ar: 'بمعرفة الأضلاع الثلاثة قل هل هو حاد أم قائم أم منفرج.' },
        skills: { eu: 'Pitagorasen teoremaren alderantzizkoa', es: 'El recíproco de Pitágoras', en: 'The converse of Pythagoras', ar: 'عكس مبرهنة فيثاغورس' },
        levels: [
            { progressId: 96401, stage: 'pythagoras', title: { eu: 'Zuzena ala ez', es: 'Rectángulo o no', en: 'Right or not', ar: 'قائم أم لا' }, description: { eu: 'Hirukote pitagorikoak.', es: 'Ternas pitagóricas.', en: 'Pythagorean triples.', ar: 'ثلاثيات فيثاغورس.' } },
            { progressId: 96402, stage: 'pythagoras', title: { eu: 'Hiru motak', es: 'Los tres tipos', en: 'All three kinds', ar: 'الأنواع الثلاثة' }, description: { eu: 'Zorrotza, zuzena, kamutsa.', es: 'Agudo, recto, obtuso.', en: 'Acute, right, obtuse.', ar: 'حاد، قائم، منفرج.' } },
            { progressId: 96403, stage: 'pythagoras', title: { eu: 'Ez da triangelua', es: 'No es triángulo', en: 'Not a triangle', ar: 'ليس مثلثًا' }, description: { eu: 'Batzuetan ez da ixten.', es: 'A veces no se cierra.', en: 'Sometimes it does not close.', ar: 'أحيانًا لا ينغلق.' } }
        ]
    },
    {
        id: 'point',
        title: { eu: 'Zer puntu da?', es: '¿Qué punto es?', en: 'Which point is it?', ar: 'أي نقطة هذه؟' },
        tagline: { eu: 'Begiratu zuzenei eta esan zein puntu nabarmen den.', es: 'Mira las rectas y di qué punto notable es.', en: 'Look at the lines and say which notable point it is.', ar: 'انظر إلى المستقيمات وقل أي نقطة شهيرة هي.' },
        skills: { eu: 'Triangeluaren zuzen eta puntu nabarmenak', es: 'Rectas y puntos notables del triángulo', en: 'Notable lines and points of a triangle', ar: 'المستقيمات والنقاط الشهيرة في المثلث' },
        levels: [
            { progressId: 96501, stage: 'loci', title: { eu: 'Hiru zuzen', es: 'Tres rectas', en: 'Three lines', ar: 'ثلاثة مستقيمات' }, description: { eu: 'Hiru zuzenak marraztuta.', es: 'Las tres rectas dibujadas.', en: 'All three lines drawn.', ar: 'المستقيمات الثلاثة مرسومة.' } },
            { progressId: 96502, stage: 'loci', title: { eu: 'Bi zuzen', es: 'Dos rectas', en: 'Two lines', ar: 'مستقيمان' }, description: { eu: 'Bat falta da.', es: 'Falta una.', en: 'One is missing.', ar: 'ينقص واحد.' } },
            { progressId: 96503, stage: 'loci', title: { eu: 'Zuzen bat', es: 'Una recta', en: 'One line', ar: 'مستقيم واحد' }, description: { eu: 'Begiratu ondo nondik doan.', es: 'Mira bien por dónde pasa.', en: 'Look closely at where it goes.', ar: 'انظر جيدًا أين يمرّ.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Geometriaren detektibea', es: 'Detective de geometría', en: 'Geometry detective', ar: 'مخبر الهندسة' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Geometriako akats tipikoak', es: 'Errores típicos de geometría', en: 'Common mistakes in geometry', ar: 'الأخطاء الشائعة في الهندسة' },
        levels: [
            { progressId: 96601, stage: 'angles', title: { eu: 'Angeluak', es: 'Ángulos', en: 'Angles', ar: 'الزوايا' }, description: { eu: 'Batura, barnekoa eta inskribatua.', es: 'Suma, interior e inscrito.', en: 'Sums, interior and inscribed.', ar: 'المجموع والداخلية والمحيطية.' } },
            { progressId: 96602, stage: 'pythagoras', title: { eu: 'Pitagoras', es: 'Pitágoras', en: 'Pythagoras', ar: 'فيثاغورس' }, description: { eu: 'Karratuak, erroak eta erdiak.', es: 'Cuadrados, raíces y mitades.', en: 'Squares, roots and halves.', ar: 'المربعات والجذور والأنصاف.' } },
            { progressId: 96603, stage: 'areas', title: { eu: 'Azalerak eta antzekotasuna', es: 'Áreas y semejanza', en: 'Areas and similarity', ar: 'المساحات والتشابه' }, description: { eu: 'Erdiak, erradioak eta k².', es: 'Mitades, radios y k².', en: 'Halves, radii and k².', ar: 'الأنصاف وأنصاف الأقطار و⁦k²⁩.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu galdera bakoitza bere neurriarekin.', es: 'Une cada pregunta con su medida.', en: 'Match each question with its measurement.', ar: 'صِل كل سؤال بقياسه.' },
        skills: { eu: 'Angeluak, Pitagoras eta azalerak buruz', es: 'Ángulos, Pitágoras y áreas de cabeza', en: 'Angles, Pythagoras and areas in your head', ar: 'الزوايا وفيثاغورس والمساحات ذهنيًا' },
        levels: [
            { progressId: 96201, stage: 'angles', title: { eu: 'Angeluak', es: 'Ángulos', en: 'Angles', ar: 'الزوايا' }, description: { eu: 'Aldeak ↔ angeluen batura', es: 'Lados ↔ suma de ángulos', en: 'Sides ↔ sum of angles', ar: 'الأضلاع ↔ مجموع الزوايا' } },
            { progressId: 96202, stage: 'pythagoras', title: { eu: 'Pitagoras', es: 'Pitágoras', en: 'Pythagoras', ar: 'فيثاغورس' }, description: { eu: 'Katetoak ↔ hipotenusa', es: 'Catetos ↔ hipotenusa', en: 'Legs ↔ hypotenuse', ar: 'الضلعان ↔ الوتر' } },
            { progressId: 96203, stage: 'areas', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' }, description: { eu: 'Formula ↔ azalera', es: 'Fórmula ↔ área', en: 'Formula ↔ area', ar: 'الصيغة ↔ المساحة' } }
        ]
    }
]

export const geometry3GameProgressIds: number[] = levelProgressIds(geometry3Games)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const geometry3GameSlugs: Record<Geometry3GameId, string> = { race: 'lasterketa', angles: 'angeluak', triangle: 'triangelua', point: 'puntua', detective: 'detektibea', memory: 'memoria' }

export function geometry3GameModeForPath(pathname: string): Geometry3GameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['angeluak', 'angulos'].includes(game)) return 'angles'
    if (['triangelua', 'triangulo'].includes(game)) return 'triangle'
    if (['puntua', 'punto'].includes(game)) return 'point'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

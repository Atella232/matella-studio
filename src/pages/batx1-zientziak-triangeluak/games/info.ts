import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { trigonometryGames } from '../../dbh4-akademikoak-trigonometria/games/info.ts'
import type { TrianglesStageId } from '../lessons.tsx'

/* ==========================================================================
   Triangeluen ebazpena (Batxilergoa 1 · Zientziak) games: the list shown
   in the hub, with levels and the unit progress id each level earns with
   its first star. Three games of its own (how many triangles, solve it
   piece by piece, find the radio station), the detective, the race and
   the memory, and two games of 4. DBH kept for the review (the unit circle
   and the other ratios), with their texts and levels but the stages and
   progress ids of this unit. Every id is in the block 102401–102899.
   ========================================================================== */

export type TrianglesGameId = 'race' | 'count' | 'pieces' | 'station' | 'detective' | 'memory' | 'circle' | 'ratios'

export const TRIANGLES_GAME_RECORDS_KEY = 'matella-triangeluak-batx1z-game-records'

/** A 4. DBH game with its texts and levels, the stages and progress ids of this unit */
function reused(id: 'circle' | 'ratios', stages: TrianglesStageId[], firstId: number): GameInfo<TrianglesGameId> {
    const source = trigonometryGames.find((game) => game.id === id)!
    return { ...source, id, levels: source.levels.map((level, index) => ({ ...level, stage: stages[index], progressId: firstId + index })) }
}

export const trianglesGames: GameInfo<TrianglesGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Triangeluen lasterketa', es: 'Carrera de triángulos', en: 'Triangle race', ar: 'سباق المثلثات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 102401, stage: 'angles', title: { eu: 'Edozein angelu', es: 'Cualquier ángulo', en: 'Any angle', ar: 'أي زاوية' }, description: { eu: 'Birak, koadrantea eta angelu kamutsa.', es: 'Vueltas, cuadrante y ángulo obtuso.', en: 'Turns, quadrant and obtuse angle.', ar: 'الدورات والربع والزاوية المنفرجة.' } },
            { progressId: 102402, stage: 'right', title: { eu: 'Angeluzuzenak eta altuera', es: 'Rectángulos y altura', en: 'Right triangles and heights', ar: 'القائمة والارتفاع' }, description: { eu: 'Hipotenusa, katetoa eta kanpoko altuera.', es: 'Hipotenusa, cateto y altura exterior.', en: 'Hypotenuse, leg and outside height.', ar: 'الوتر والضلع القائم والارتفاع الخارجي.' } },
            { progressId: 102403, stage: 'sines', title: { eu: 'Sinuaren teorema', es: 'Teorema de los senos', en: 'The sine rule', ar: 'مبرهنة الجيوب' }, description: { eu: 'Alde bat, zenbat triangelu eta erradioa.', es: 'Un lado, cuántos triángulos y el radio.', en: 'A side, how many triangles and the radius.', ar: 'ضلع وكم مثلثًا ونصف القطر.' } },
            { progressId: 102404, stage: 'cosines', title: { eu: 'Kosinuaren teorema', es: 'Teorema del coseno', en: 'The cosine rule', ar: 'مبرهنة جيب التمام' }, description: { eu: '60°, 120° eta hiru alde.', es: '60°, 120° y tres lados.', en: '60°, 120° and three sides.', ar: '60° و120° وثلاثة أضلاع.' } },
            { progressId: 102405, stage: 'applications', title: { eu: 'Azalerak eta problemak', es: 'Áreas y problemas', en: 'Areas and problems', ar: 'المساحات والمسائل' }, description: { eu: 'Sinua, Heron eta indarrak.', es: 'Seno, Herón y fuerzas.', en: 'Sine, Heron and forces.', ar: 'الجيب وهيرون والقوى.' } }
        ]
    },
    {
        id: 'count',
        title: { eu: 'Zenbat triangelu?', es: '¿Cuántos triángulos?', en: 'How many triangles?', ar: 'كم مثلثًا؟' },
        tagline: { eu: 'Bi alde eta baten aurkako angelua: bat ere ez, bat edo bi? Gero, konpasa marraztuko da.', es: 'Dos lados y el ángulo opuesto a uno: ¿ninguno, uno o dos? Después se dibuja el compás.', en: 'Two sides and the angle opposite one: none, one or two? Then the compass is drawn.', ar: 'ضلعان والزاوية المقابلة لأحدهما: لا شيء أم واحد أم اثنان؟ ثم يُرسم الفرجار.' },
        skills: { eu: 'Kasu zalantzazkoa', es: 'El caso dudoso', en: 'The ambiguous case', ar: 'الحالة الملتبسة' },
        levels: [
            { progressId: 102501, stage: 'sines', title: { eu: 'Altuerarekin', es: 'Con la altura', en: 'With the height', ar: 'بالارتفاع' }, description: { eu: 'Altuera marraztuta dago.', es: 'La altura está dibujada.', en: 'The height is drawn.', ar: 'الارتفاع مرسوم.' } },
            { progressId: 102502, stage: 'sines', title: { eu: 'Muga-kasuak', es: 'Casos al límite', en: 'Borderline cases', ar: 'حالات حدّية' }, description: { eu: 'Angelu kamutsak, a = b eta ukitzea.', es: 'Ángulos obtusos, a = b y tocar.', en: 'Obtuse angles, a = b and touching.', ar: 'زوايا منفرجة وa = b والتماس.' } },
            { progressId: 102503, stage: 'sines', title: { eu: 'Marrazkirik gabe', es: 'Sin dibujo', en: 'No drawing', ar: 'بلا رسم' }, description: { eu: 'Kalkulatu sin B.', es: 'Calcula sen B.', en: 'Work out sin B.', ar: 'احسب sin B.' } }
        ]
    },
    {
        id: 'pieces',
        title: { eu: 'Zatika ebatzi', es: 'Resuelve por piezas', en: 'Solve it piece by piece', ar: 'حلّ قطعة قطعة' },
        tagline: { eu: 'Hiru pieza ezagututa, osatu triangelua: aukeratu pieza eta tresna, 180°, sinuak edo kosinua.', es: 'Con tres piezas, completa el triángulo: elige la pieza y la herramienta, 180°, senos o coseno.', en: 'From three pieces, finish the triangle: choose the piece and the tool, 180°, sines or cosine.', ar: 'بثلاث قطع أكمل المثلث: اختر القطعة والأداة، 180° أو الجيوب أو جيب التمام.' },
        skills: { eu: 'Zein teorema eta zein ordenatan', es: 'Qué teorema y en qué orden', en: 'Which rule and in which order', ar: 'أي مبرهنة وبأي ترتيب' },
        levels: [
            { progressId: 102601, stage: 'sines', title: { eu: 'Bi angelu edo bi alde', es: 'Dos ángulos o dos lados', en: 'Two angles or two sides', ar: 'زاويتان أو ضلعان' }, description: { eu: 'Bi angelu eta alde bat; bi alde eta haien angelua.', es: 'Dos ángulos y un lado; dos lados y su ángulo.', en: 'Two angles and a side; two sides and their angle.', ar: 'زاويتان وضلع؛ ضلعان والزاوية بينهما.' } },
            { progressId: 102602, stage: 'cosines', title: { eu: 'Hiru alde', es: 'Tres lados', en: 'Three sides', ar: 'ثلاثة أضلاع' }, description: { eu: 'Hiru alde, edo bi eta haien angelua.', es: 'Tres lados, o dos y su ángulo.', en: 'Three sides, or two and their angle.', ar: 'ثلاثة أضلاع، أو ضلعان والزاوية بينهما.' } },
            { progressId: 102603, stage: 'cosines', title: { eu: 'Denak nahastuta', es: 'Todo mezclado', en: 'All mixed up', ar: 'الكل مختلط' }, description: { eu: 'Aurkako angelu bat ere bai.', es: 'También un ángulo opuesto.', en: 'An opposite angle too.', ar: 'وزاوية مقابلة أيضًا.' } }
        ]
    },
    {
        id: 'station',
        title: { eu: 'Aurkitu igorlea', es: 'Localiza la emisora', en: 'Find the radio station', ar: 'حدّد موقع المحطة' },
        tagline: { eu: 'Bi postuk igorlea entzuten dute, angelu banarekin: jarri bandera mapan, eta gero kalkulatu distantzia.', es: 'Dos puestos oyen la emisora, cada uno con un ángulo: pon la bandera en el mapa y luego calcula la distancia.', en: 'Two posts hear the station, each at an angle: put the flag on the map, then work out the distance.', ar: 'يسمع موقعان المحطة، كلٌّ بزاوية: ضع العلم على الخريطة ثم احسب المسافة.' },
        skills: { eu: 'Triangulazioa', es: 'La triangulación', en: 'Triangulation', ar: 'التثليث' },
        levels: [
            { progressId: 102701, stage: 'applications', title: { eu: 'Bisualekin', es: 'Con las visuales', en: 'With the sight lines', ar: 'بخطوط النظر' }, description: { eu: 'Bisualen hasiera ikusten da.', es: 'Se ve el principio de las visuales.', en: 'The start of the sight lines is shown.', ar: 'تظهر بداية خطوط النظر.' } },
            { progressId: 102702, stage: 'applications', title: { eu: 'Angeluak bakarrik', es: 'Solo los ángulos', en: 'Only the angles', ar: 'الزاويتان فقط' }, description: { eu: 'Bisualik gabe.', es: 'Sin visuales.', en: 'No sight lines.', ar: 'بلا خطوط نظر.' } },
            { progressId: 102703, stage: 'applications', title: { eu: 'Distantzia', es: 'La distancia', en: 'The distance', ar: 'المسافة' }, description: { eu: 'Sinuaren teorema.', es: 'El teorema de los senos.', en: 'The sine rule.', ar: 'مبرهنة الجيوب.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Triangeluen detektibea', es: 'Detective de triángulos', en: 'Triangle detective', ar: 'مخبر المثلثات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 102801, stage: 'angles', title: { eu: 'Edozein angelu', es: 'Cualquier ángulo', en: 'Any angle', ar: 'أي زاوية' }, description: { eu: 'Birak, izenak, zeinuak eta bigarren angelua.', es: 'Vueltas, nombres, signos y el segundo ángulo.', en: 'Turns, names, signs and the second angle.', ar: 'الدورات والأسماء والإشارات والزاوية الثانية.' } },
            { progressId: 102802, stage: 'sines', title: { eu: 'Sinuaren teorema', es: 'Teorema de los senos', en: 'The sine rule', ar: 'مبرهنة الجيوب' }, description: { eu: 'Bikoteak, kasu zalantzazkoa eta 2R.', es: 'Parejas, caso dudoso y 2R.', en: 'Pairs, the ambiguous case and 2R.', ar: 'الثنائيات والحالة الملتبسة و2R.' } },
            { progressId: 102803, stage: 'applications', title: { eu: 'Kosinua eta azalerak', es: 'Coseno y áreas', en: 'Cosine and areas', ar: 'جيب التمام والمساحات' }, description: { eu: 'Kosinua, zeinua, Heron eta indarrak.', es: 'El coseno, el signo, Herón y fuerzas.', en: 'The cosine, the sign, Heron and forces.', ar: 'جيب التمام والإشارة وهيرون والقوى.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: angelu bat eta bere bira bakarreko angelua, datuak eta aldea, edo aldeak eta azalera.', es: 'Encuentra las parejas: un ángulo y su ángulo de una vuelta, los datos y el lado, o los lados y el área.', en: 'Find the pairs: an angle and its angle within one turn, the data and the side, or the sides and the area.', ar: 'اعثر على الأزواج: زاوية وما يكافئها في دورة واحدة، والمعطيات والضلع، أو الأضلاع والمساحة.' },
        skills: { eu: 'Birak, aldeak eta azalerak', es: 'Vueltas, lados y áreas', en: 'Turns, sides and areas', ar: 'الدورات والأضلاع والمساحات' },
        levels: [
            { progressId: 102811, stage: 'angles', title: { eu: 'Birak', es: 'Vueltas', en: 'Turns', ar: 'الدورات' }, description: { eu: '1230° ↔ 150°', es: '1230° ↔ 150°', en: '1230° ↔ 150°', ar: '1230° ↔ 150°' } },
            { progressId: 102812, stage: 'cosines', title: { eu: 'Aldeak', es: 'Lados', en: 'Sides', ar: 'الأضلاع' }, description: { eu: 'b = 5, c = 8, A = 60° ↔ a = 7', es: 'b = 5, c = 8, A = 60° ↔ a = 7', en: 'b = 5, c = 8, A = 60° ↔ a = 7', ar: 'b = 5, c = 8, A = 60° ↔ a = 7' } },
            { progressId: 102813, stage: 'applications', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' }, description: { eu: '5, 12, 13 ↔ S = 30', es: '5, 12, 13 ↔ S = 30', en: '5, 12, 13 ↔ S = 30', ar: '5, 12, 13 ↔ S = 30' } }
        ]
    },
    reused('circle', ['angles', 'angles', 'angles'], 102821),
    reused('ratios', ['angles', 'angles', 'angles'], 102831)
]

export const trianglesGameProgressIds: number[] = levelProgressIds(trianglesGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const trianglesGameSlugs: Record<TrianglesGameId, string> = { race: 'lasterketa', count: 'zenbat', pieces: 'zatika', station: 'igorlea', detective: 'detektibea', memory: 'memoria', circle: 'zirkulua', ratios: 'arrazoiak' }

export function trianglesGameModeForPath(pathname: string): TrianglesGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zenbat', 'cuantos'].includes(game)) return 'count'
    if (['zatika', 'piezas'].includes(game)) return 'pieces'
    if (['igorlea', 'emisora'].includes(game)) return 'station'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    if (['zirkulua', 'circunferencia'].includes(game)) return 'circle'
    if (['arrazoiak', 'razones'].includes(game)) return 'ratios'
    return 'hub'
}

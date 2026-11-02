import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Pitagorasen teorema (2. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   Three games belong to this topic (the ladder, what triangle is it and
   the Pythagoras detective); the race and the memory are shared engines.
   ========================================================================== */

export type PythagorasGameId = 'race' | 'ladder' | 'classify' | 'detective' | 'memory'

export const PYTHAGORAS_GAME_RECORDS_KEY = 'matella-pitagoras-dbh2-game-records'

export const pythagorasGames: GameInfo<PythagorasGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Pitagorasen lasterketa', es: 'Carrera de Pitágoras', en: 'Pythagoras race', ar: 'سباق فيثاغورس' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 24101, stage: 'theorem', title: { eu: 'Teorema', es: 'El teorema', en: 'The theorem', ar: 'النظرية' }, description: { eu: 'Karratuak eta hirukoteak.', es: 'Cuadrados y ternas.', en: 'Squares and Pythagorean triples.', ar: 'المربعات والثلاثيات.' } },
            { progressId: 24102, stage: 'sides', title: { eu: 'Aldeak', es: 'Lados', en: 'Sides', ar: 'الأضلاع' }, description: { eu: 'Hipotenusa eta katetoak.', es: 'Hipotenusa y catetos.', en: 'Hypotenuse and legs.', ar: 'الوتر والضلعان القائمان.' } },
            { progressId: 24103, stage: 'plane', title: { eu: 'Irudi lauak', es: 'Figuras planas', en: 'Flat shapes', ar: 'الأشكال المستوية' }, description: { eu: 'Altuerak, diagonalak eta erronboak.', es: 'Alturas, diagonales y rombos.', en: 'Heights, diagonals and rhombuses.', ar: 'الارتفاعات والأقطار والمعيّنات.' } },
            { progressId: 24104, stage: 'circle', title: { eu: 'Zirkunferentzia', es: 'Circunferencia', en: 'Circumference', ar: 'الدائرة' }, description: { eu: 'Kordak eta ukitzaileak.', es: 'Cuerdas y tangentes.', en: 'Chords and tangents.', ar: 'الأوتار والمماسات.' } },
            { progressId: 24105, stage: 'space', title: { eu: 'Espazioa eta problemak', es: 'Espacio y problemas', en: 'Space and problems', ar: 'الفضاء والمسائل' }, description: { eu: 'Kaxak, sarea eta eskailerak.', es: 'Cajas, cuadrícula y escaleras.', en: 'Boxes, grids and ladders.', ar: 'الصناديق والشبكة والسلالم.' } }
        ]
    },
    {
        id: 'ladder',
        title: { eu: 'Eskailera', es: 'La escalera', en: 'The ladder', ar: 'السلّم' },
        tagline: { eu: 'Kalkulatu non jarri eskaileraren oina, edo zer eskailera behar den, leihora iristeko.', es: 'Calcula dónde poner el pie de la escalera, o qué escalera hace falta, para llegar a la ventana.', en: 'Work out where to put the foot of the ladder, or which ladder you need, to reach the window.', ar: 'احسب أين تضع قاعدة السلّم، أو أي سلّم تحتاج، لتصل إلى النافذة.' },
        skills: { eu: 'Katetoa eta hipotenusa egoera errealetan', es: 'Cateto e hipotenusa en situaciones reales', en: 'Legs and hypotenuse in real situations', ar: 'الضلع القائم والوتر في مواقف واقعية' },
        levels: [
            { progressId: 24301, stage: 'sides', title: { eu: 'Hirukote txikiak', es: 'Ternas pequeñas', en: 'Small triples', ar: 'ثلاثيات صغيرة' }, description: { eu: 'Oinaren distantzia: 3, 4, 5.', es: 'La distancia del pie: 3, 4, 5.', en: 'The distance of the foot: 3, 4, 5.', ar: 'بعد القاعدة: 3، 4، 5.' } },
            { progressId: 24302, stage: 'sides', title: { eu: 'Oina ala eskailera', es: 'El pie o la escalera', en: 'The foot or the ladder', ar: 'القاعدة أو السلّم' }, description: { eu: 'Katetoa edo hipotenusa, hirukote handiekin.', es: 'Cateto o hipotenusa, con ternas grandes.', en: 'Leg or hypotenuse, with large triples.', ar: 'ضلع قائم أو وتر بثلاثيات كبيرة.' } },
            { progressId: 24303, stage: 'space', title: { eu: 'Hamarrenak', es: 'Décimas', en: 'Tenths', ar: 'الأعشار' }, description: { eu: 'Edozein luzera, hamarren batera biribilduta.', es: 'Cualquier longitud, redondeada a las décimas.', en: 'Any length, rounded to one decimal place.', ar: 'أي طول مقرّبًا إلى أقرب عُشر.' } }
        ]
    },
    {
        id: 'classify',
        title: { eu: 'Zer triangelu da?', es: '¿Qué triángulo es?', en: 'What triangle is it?', ar: 'أي مثلث هذا؟' },
        tagline: { eu: 'Hiru alde: angelu-zorrotza, angeluzuzena ala angelu-kamutsa?', es: 'Tres lados: ¿acutángulo, rectángulo u obtusángulo?', en: 'Three sides: acute, right or obtuse?', ar: 'ثلاثة أضلاع: حاد أم قائم أم منفرج؟' },
        skills: { eu: 'Triangeluak aldeen arabera sailkatzea', es: 'Clasificar triángulos por sus lados', en: 'Classifying triangles by their sides', ar: 'تصنيف المثلثات حسب أضلاعها' },
        levels: [
            { progressId: 24401, stage: 'sides', title: { eu: 'Alde osoak', es: 'Lados enteros', en: 'Whole sides', ar: 'أضلاع صحيحة' }, description: { eu: 'Handiena azkena.', es: 'El mayor, el último.', en: 'The longest one last.', ar: 'الأكبر في الأخير.' } },
            { progressId: 24402, stage: 'sides', title: { eu: 'Ia hirukoteak', es: 'Casi ternas', en: 'Near triples', ar: 'شبه ثلاثيات' }, description: { eu: 'Edozein ordenatan: 6, 8, 11.', es: 'En cualquier orden: 6, 8, 11.', en: 'In any order: 6, 8, 11.', ar: 'بأي ترتيب: 6، 8، 11.' } },
            { progressId: 24403, stage: 'sides', title: { eu: 'Alde hamartarrak', es: 'Lados decimales', en: 'Decimal sides', ar: 'أضلاع عشرية' }, description: { eu: 'Hirukoteen erdiak.', es: 'Mitades de ternas.', en: 'Halves of triples.', ar: 'أنصاف الثلاثيات.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Pitagorasen detektibea', es: 'Detective de Pitágoras', en: 'Pythagoras detective', ar: 'مخبر فيثاغورس' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Teorema erabiltzean egiten diren akats tipikoak', es: 'Errores típicos al usar el teorema', en: 'Common mistakes when using the theorem', ar: 'الأخطاء الشائعة في استعمال النظرية' },
        levels: [
            { progressId: 24501, stage: 'theorem', title: { eu: 'Hipotenusa', es: 'Hipotenusa', en: 'Hypotenuse', ar: 'الوتر' }, description: { eu: 'Karratuak, batura eta erroa.', es: 'Cuadrados, suma y raíz.', en: 'Squares, sum and root.', ar: 'المربعات والمجموع والجذر.' } },
            { progressId: 24502, stage: 'sides', title: { eu: 'Katetoak eta unitateak', es: 'Catetos y unidades', en: 'Legs and units', ar: 'الأضلاع القائمة والوحدات' }, description: { eu: 'Batu ala kendu, eta metroak.', es: 'Sumar o restar, y los metros.', en: 'Add or subtract, and the metres.', ar: 'الجمع أو الطرح والأمتار.' } },
            { progressId: 24503, stage: 'plane', title: { eu: 'Irudietan', es: 'En las figuras', en: 'In shapes', ar: 'في الأشكال' }, description: { eu: 'Isoszelea, erronboa, kaxa eta ukitzailea.', es: 'Isósceles, rombo, caja y tangente.', en: 'Isosceles, rhombus, box and tangent.', ar: 'متساوي الساقين والمعيّن والصندوق والمماس.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak.', es: 'Encuentra las cartas que valen lo mismo.', en: 'Find the cards that are worth the same.', ar: 'جد البطاقات ذات القيمة نفسها.' },
        skills: { eu: 'Erroak, hipotenusak eta katetoak', es: 'Raíces, hipotenusas y catetos', en: 'Square roots, hypotenuses and legs', ar: 'الجذور والأوتار والأضلاع القائمة' },
        levels: [
            { progressId: 24201, stage: 'theorem', title: { eu: 'Erro karratuak', es: 'Raíces cuadradas', en: 'Square roots', ar: 'الجذور التربيعية' }, description: { eu: '√169 ↔ 13', es: '√169 ↔ 13', en: '√169 ↔ 13', ar: '√169 ↔ 13' } },
            { progressId: 24202, stage: 'sides', title: { eu: 'Hipotenusa', es: 'Hipotenusa', en: 'Hypotenuse', ar: 'الوتر' }, description: { eu: '√(6² + 8²) ↔ 10', es: '√(6² + 8²) ↔ 10', en: '√(6² + 8²) ↔ 10', ar: '√(6² + 8²) ↔ 10' } },
            { progressId: 24203, stage: 'sides', title: { eu: 'Katetoa', es: 'Cateto', en: 'Leg', ar: 'الضلع القائم' }, description: { eu: '√(13² − 5²) ↔ 12', es: '√(13² − 5²) ↔ 12', en: '√(13² − 5²) ↔ 12', ar: '√(13² − 5²) ↔ 12' } }
        ]
    }
]

export const pythagorasGameProgressIds: number[] = levelProgressIds(pythagorasGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const pythagorasGameSlugs: Record<PythagorasGameId, string> = { race: 'lasterketa', ladder: 'eskailera', classify: 'sailkatu', detective: 'detektibea', memory: 'memoria' }

export function pythagorasGameModeForPath(pathname: string): PythagorasGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['eskailera', 'escalera'].includes(game)) return 'ladder'
    if (['sailkatu', 'clasifica'].includes(game)) return 'classify'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

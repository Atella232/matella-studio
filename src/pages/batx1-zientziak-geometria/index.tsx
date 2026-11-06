import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readVectorsAnswer } from '../dbh4-akademikoak-bektoreak/answers'
import { bachGeometryChallenges, bachGeometryDiagnostic, bachGeometryExerciseBank, bachGeometryPractice } from './content'
import { BachGeometryHeroArt } from './figures'
import { BachGeometryGames } from './games'
import { BACH_GEOMETRY_GAME_RECORDS_KEY, bachGeometryGameProgressIds } from './games/info'
import { BachGeometryLaboratory } from './lab'
import { bachGeometryLabChallengeIds, bachGeometryLabToolForTopic, bachGeometryLabTools } from './lab/labTools'
import { bachGeometryStages, bachGeometryTopics } from './lessons'

const geometriaBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-geometria-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Geometria analitikoa', es: 'Geometría analítica', en: 'Analytic geometry', ar: 'الهندسة التحليلية' },
    documentTitle: { eu: 'Geometria analitikoa · Batxilergoa 1', es: 'Geometría analítica · 1.º Bachillerato', en: 'Analytic geometry · 1st Bachillerato', ar: 'الهندسة التحليلية · البكالوريا الأولى' },
    tagline: {
        eu: 'Erdiko puntua eta zuzenki baten zatiketa, zuzenaren ekuazio guztiak, bektore normala eta zuzen-sortak, posizioak eta angeluak, distantziak eta simetrikoak, eta triangeluaren puntu nabarmenak eta azalera.',
        es: 'Punto medio y división de un segmento, todas las ecuaciones de la recta, vector normal y haces de rectas, posiciones y ángulos, distancias y simétricos, y los puntos notables y el área del triángulo.',
        en: 'Midpoints and dividing a segment, every equation of a line, the normal vector and pencils of lines, positions and angles, distances and reflections, and the notable points and area of a triangle.',
        ar: 'المنتصف وتقسيم القطعة، وكل معادلات المستقيم، والمتجه الناظمي وحزم المستقيمات، والأوضاع والزوايا، والمسافات والنظائر، والنقاط الشهيرة في المثلث ومساحته.'
    },
    heroArt: <BachGeometryHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, puntutik triangeluaren azalerara', es: 'Cinco etapas, del punto al área del triángulo', en: 'Five stages, from the point to the area of a triangle', ar: 'خمس مراحل، من النقطة إلى مساحة المثلث' },
    stages: bachGeometryStages,
    topics: bachGeometryTopics,
    diagnostic: bachGeometryDiagnostic,
    guidedPractice: bachGeometryPractice,
    exerciseBank: bachGeometryExerciseBank,
    challenges: bachGeometryChallenges,
    lab: {
        description: {
            eu: `${bachGeometryLabTools.length} tresna, erronkekin: zuzen-sorta, bi zuzenen angelua eta biderik laburrena, berriak; 4. DBHko zuzenkia, hirugarren puntua, zuzenaren formak eta bigarren zuzena; eta 3. DBHko puntu nabarmenak.`,
            es: `${bachGeometryLabTools.length} herramientas con retos: el haz de rectas, el ángulo de dos rectas y la distancia más corta, nuevas; de 4.º ESO, el segmento, el tercer punto, las formas de la recta y la segunda recta; y de 3.º ESO, los puntos notables.`,
            en: `${bachGeometryLabTools.length} tools with challenges: the pencil of lines, the angle of two lines and the shortest distance, new; from 4th ESO, the segment, the third point, the forms of a line and the second line; and from 3rd ESO, the notable points.`,
            ar: `${bachGeometryLabTools.length} أدوات مع تحديات: حزمة المستقيمات وزاوية مستقيمين وأقصر مسافة، وهي جديدة؛ ومن الصف الرابع: القطعة والنقطة الثالثة وصيغ المستقيم والمستقيم الثاني؛ ومن الصف الثالث: النقاط الشهيرة.`
        },
        progressIds: bachGeometryLabChallengeIds,
        toolForTopic: bachGeometryLabToolForTopic,
        render: (props) => <BachGeometryLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Sei joko: lasterketa, zuzen bikiak, radarra, zuzenen detektibea eta memoria, berriak; eta 4. DBHko aurkitu k.',
            es: 'Seis juegos: carrera, rectas gemelas, el radar, detective de rectas y memoria, nuevos; y de 4.º ESO, encuentra k.',
            en: 'Six games: race, twin lines, the radar, lines detective and memory, new; and from 4th ESO, find k.',
            ar: 'ست ألعاب: السباق والمستقيمات التوأم والرادار ومخبر المستقيمات والذاكرة، وهي جديدة؛ ومن الصف الرابع: أوجد k.'
        },
        progressIds: bachGeometryGameProgressIds,
        recordsKey: BACH_GEOMETRY_GAME_RECORDS_KEY,
        render: (props) => <BachGeometryGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bakar bat: eskatzen den koordenatua, koefizientea, malda, angelua gradutan, distantzia, azalera edo parametroa. Adibidez 5, −3, 2,5 edo 3/5.', es: 'Escribe un solo número: la coordenada, el coeficiente, la pendiente, el ángulo en grados, la distancia, el área o el parámetro que se pide. Por ejemplo 5, −3, 2,5 o 3/5.', en: 'Write a single number: the coordinate, coefficient, slope, angle in degrees, distance, area or parameter that is asked for. For example 5, −3, 2.5 or 3/5.', ar: 'اكتب عددًا واحدًا: الإحداثي أو المعامل أو الميل أو الزاوية بالدرجات أو المسافة أو المساحة أو الوسيط المطلوب. مثلًا 5 أو ⁦−3⁩ أو 2.5 أو 3/5.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readVectorsAnswer,
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', en: 'e.g. −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bakar bat, adibidez −3, 2,5 edo 3/5.', es: 'No entiendo esa respuesta. Escribe un solo número, por ejemplo −3, 2,5 o 3/5.', en: 'I don\'t understand that answer. Write a single number, for example −3, 2.5 or 3/5.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا واحدًا، مثل ⁦−3⁩ أو 2.5 أو 3/5.' }
    },
    errorByStage: {
        points: { eu: 'Erdiko puntua batez bestekoa da, ez muturren arteko kenketa. Simetrikoa: A′ = 2P − A, ez P − A.', es: 'El punto medio es la media, no la resta de los extremos. Simétrico: A′ = 2P − A, no P − A.', en: 'The midpoint is the mean, not the difference of the end points. Symmetric point: A′ = 2P − A, not P − A.', ar: 'المنتصف متوسط الطرفين لا الفرق بينهما. النظير: A′ = 2P − A لا P − A.' },
        lines: { eu: 'Ax + By + C = 0 zuzenean, (A, B) normala da, ez norabide-bektorea: norabidea (−B, A) da. Malda: y askatu, eta x-ren koefizientea.', es: 'En Ax + By + C = 0, (A, B) es el normal, no el director: el director es (−B, A). Pendiente: despeja y, y es el coeficiente de x.', en: 'In Ax + By + C = 0, (A, B) is the normal, not the direction vector: the direction is (−B, A). Slope: solve for y; it is the coefficient of x.', ar: 'في Ax + By + C = 0 يكون (A, B) الناظمي لا متجه التوجيه: التوجيه (−B, A). الميل: اعزل y، وهو معامل x.' },
        positions: { eu: 'Perpendikularrean A eta B trukatu eta zeinu bat aldatu. Bi zuzenen angelua zorrotza da: biderkadura balio absolutuan.', es: 'En la perpendicular se intercambian A y B y se cambia un signo. El ángulo de dos rectas es el agudo: el producto, en valor absoluto.', en: 'For the perpendicular, swap A and B and change one sign. The angle between two lines is the acute one: the product in absolute value.', ar: 'في العمودي نبدّل A وB ونغيّر إشارة. وزاوية مستقيمين هي الحادة: الجداء بالقيمة المطلقة.' },
        distances: { eu: 'Distantzia: |Ax₀ + By₀ + C| zati √(A² + B²), ez zati A + B. Bi zuzen paraleloetan, lehenik A eta B berdindu.', es: 'Distancia: |Ax₀ + By₀ + C| entre √(A² + B²), no entre A + B. Con dos paralelas, iguala antes A y B.', en: 'Distance: |Ax₀ + By₀ + C| divided by √(A² + B²), not by A + B. With two parallels, make A and B equal first.', ar: 'المسافة: ‏|Ax₀ + By₀ + C| مقسومًا على √(A² + B²) لا على A + B. ومع متوازيين ساوِ A وB أولًا.' },
        triangles: { eu: 'Barizentroa: erpinen batez bestekoa, hiru zati. Altuera aldearekiko perpendikularra da eta aurkako erpinetik pasatzen da; erdibitzailea, aldearen erdiko puntutik.', es: 'Baricentro: la media de los vértices, entre tres. La altura es perpendicular al lado y pasa por el vértice opuesto; la mediatriz, por el punto medio del lado.', en: 'Centroid: the mean of the vertices, divided by three. An altitude is perpendicular to a side and passes through the opposite vertex; a perpendicular bisector, through the midpoint of the side.', ar: 'مركز الثقل: متوسط الرؤوس مقسومًا على ثلاثة. الارتفاع عمودي على الضلع ويمر بالرأس المقابل؛ والمحور يمر بمنتصف الضلع.' }
    }
}

export function GeometriaBatx1zIntroPage() {
    return <UnitPage unit={geometriaBatx1zUnit} />
}

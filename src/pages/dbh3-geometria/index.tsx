import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { SimilarityHeroArt } from '../dbh4-aplikatuak-antzekotasuna/figures'
import { geometry3Challenges, geometry3Diagnostic, geometry3ExerciseBank, geometry3Practice } from './content'
import { Geometry3Games } from './games'
import { GEOMETRY3_GAME_RECORDS_KEY, geometry3GameProgressIds } from './games/info'
import { Geometry3Laboratory } from './lab'
import { geometry3LabChallengeIds, geometry3LabToolForTopic, geometry3LabTools } from './lab/labTools'
import { geometry3Stages, geometry3Topics } from './lessons'

const geometryUnit: UnitDefinition = {
    storagePrefix: 'matella-geometria-dbh3',
    coursePath: '/matematika/dbh3',
    courseTitle: { eu: '3. DBH', es: '3.º ESO', en: '3rd ESO', ar: 'الصف الثالث' },
    title: { eu: 'Planoko geometria', es: 'Geometría del plano', en: 'Plane geometry', ar: 'هندسة المستوى' },
    documentTitle: { eu: 'Planoko geometria · 3. DBH', es: 'Geometría del plano · 3.º ESO', en: 'Plane geometry · 3rd ESO', ar: 'هندسة المستوى · الصف الثالث' },
    tagline: {
        eu: 'Angeluetatik antzekotasunera: poligonoak eta zirkunferentzia, leku geometrikoak eta puntu nabarmenak, Pitagoras, azalerak eta Tales.',
        es: 'De los ángulos a la semejanza: polígonos y circunferencia, lugares geométricos y puntos notables, Pitágoras, áreas y Tales.',
        en: 'From angles to similarity: polygons and circles, loci and notable points, Pythagoras, areas and Thales.',
        ar: 'من الزوايا إلى التشابه: المضلعات والدائرة، والمحلات الهندسية والنقاط الشهيرة، وفيثاغورس، والمساحات وطاليس.'
    },
    heroArt: <SimilarityHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, angeluetatik antzekotasunera', es: 'Cinco etapas, de los ángulos a la semejanza', en: 'Five stages, from angles to similarity', ar: 'خمس مراحل، من الزوايا إلى التشابه' },
    stages: geometry3Stages,
    topics: geometry3Topics,
    diagnostic: geometry3Diagnostic,
    guidedPractice: geometry3Practice,
    exerciseBank: geometry3ExerciseBank,
    challenges: geometry3Challenges,
    lab: {
        description: {
            eu: `${geometry3LabTools.length} tresna: angelu inskribatua, puntu nabarmenak, eskailera horman, irudiak handitu eta beste sei, erronkekin.`,
            es: `${geometry3LabTools.length} herramientas: el ángulo inscrito, los puntos notables, la escalera en la pared, ampliar figuras y seis más, con retos.`,
            en: `${geometry3LabTools.length} tools: the inscribed angle, the notable points, the ladder against the wall, enlarging shapes and six more, with challenges.`,
            ar: `${geometry3LabTools.length} أدوات: الزاوية المحيطية والنقاط الشهيرة والسلّم على الجدار وتكبير الأشكال وست أخرى، مع تحديات.`
        },
        progressIds: geometry3LabChallengeIds,
        toolForTopic: geometry3LabToolForTopic,
        render: (props) => <Geometry3Laboratory {...props} />
    },
    games: {
        description: {
            eu: 'Sei joko: lasterketa, angeluen ehiza, zer triangelu da, zer puntu da, geometriaren detektibea eta memoria.',
            es: 'Seis juegos: carrera, la caza de ángulos, qué triángulo es, qué punto es, el detective de geometría y memoria.',
            en: 'Six games: race, angle hunt, which triangle it is, which point it is, the geometry detective and memory.',
            ar: 'ست ألعاب: السباق وصيد الزوايا وأي مثلث هذا وأي نقطة هذه ومخبر الهندسة والذاكرة.'
        },
        progressIds: geometry3GameProgressIds,
        recordsKey: GEOMETRY3_GAME_RECORDS_KEY,
        render: (props) => <Geometry3Games {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 12, 7,5 edo 16/5. Gradurik (°) eta unitaterik gabe.', es: 'Escribe un número: 12, 7,5 o 16/5. Sin grados (°) ni unidades.', en: 'Write a number: 12, 7.5 or 16/5. Without degrees (°) or units.', ar: 'اكتب عددًا: 12 أو 7.5 أو 16/5. دون درجات (°) أو وحدات.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 12', es: 'Ej.: 12', en: 'e.g. 12', ar: 'مثال: 12' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 12 edo 7,5.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 12 o 7,5.', en: 'I don\'t understand that answer. Write a number, for example 12 or 7.5.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 12 أو 7.5.' }
    },
    errorByStage: {
        angles: { eu: '(n − 2) · 180°; kanpokoa 360° : n; inskribatua zentralaren erdia.', es: '(n − 2) · 180°; exterior 360° : n; el inscrito, la mitad del central.', en: '(n − 2) · 180°; exterior 360° ÷ n; inscribed is half the central angle.', ar: '(n − 2) · 180°؛ الخارجية 360° ÷ n؛ والمحيطية نصف المركزية.' },
        loci: { eu: 'Erdibitzailea: PA = PB. Erdikaria: angeluaren erdia. Barizentroa medianaren 2/3 erpinetik.', es: 'Mediatriz: PA = PB. Bisectriz: la mitad del ángulo. Baricentro a 2/3 de la mediana desde el vértice.', en: 'Perpendicular bisector: PA = PB. Angle bisector: half the angle. Centroid 2/3 of the median from the vertex.', ar: 'المنصّف العمودي: PA = PB. منصّف الزاوية: نصفها. مركز الثقل على 2/3 من المتوسط من الرأس.' },
        pythagoras: { eu: 'Hipotenusa: batu karratuak. Katetoa: kendu. Amaieran, erroa.', es: 'Hipotenusa: suma los cuadrados. Cateto: resta. Al final, la raíz.', en: 'Hypotenuse: add the squares. Leg: subtract. At the end, the root.', ar: 'الوتر: اجمع المربعين. الضلع القائم: اطرح. وفي النهاية الجذر.' },
        areas: { eu: 'Triangeluan, trapezioan eta erronboan zati 2. Zirkuluan, erradioa.', es: 'En el triángulo, el trapecio y el rombo, entre 2. En el círculo, el radio.', en: 'Triangles, trapeziums and rhombuses: divide by 2. Circles: use the radius.', ar: 'في المثلث وشبه المنحرف والمعيّن على 2. وفي الدائرة نصف القطر.' },
        similarity: { eu: 'Tales: ordena bera bi aldeetan. Luzerak bider k, azalerak bider k².', es: 'Tales: el mismo orden en los dos lados. Longitudes por k, áreas por k².', en: 'Thales: the same order on both sides. Lengths times k, areas times k².', ar: 'طاليس: الترتيب نفسه في الطرفين. الأطوال في k والمساحات في k².' }
    }
}

export function GeometriaDBH3Page() {
    return <UnitPage unit={geometryUnit} />
}

import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readVectorsAnswer } from '../dbh4-akademikoak-bektoreak/answers'
import { bachConicsChallenges, bachConicsDiagnostic, bachConicsExerciseBank, bachConicsPractice } from './content'
import { BachConicsHeroArt } from './figures'
import { BachConicsLaboratory } from './lab'
import { bachConicsLabChallengeIds, bachConicsLabToolForTopic, bachConicsLabTools } from './lab/labTools'
import { bachConicsStages, bachConicsTopics } from './lessons'

const konikakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-konikak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Leku geometrikoak eta konikak', es: 'Lugares geométricos y cónicas', en: 'Loci and conic sections', ar: 'المحلات الهندسية والقطوع المخروطية' },
    documentTitle: { eu: 'Leku geometrikoak eta konikak · Batxilergoa 1', es: 'Lugares geométricos y cónicas · 1.º Bachillerato', en: 'Loci and conic sections · 1st Bachillerato', ar: 'المحلات الهندسية والقطوع المخروطية · البكالوريا الأولى' },
    tagline: {
        eu: 'Erdibitzailea eta erdikariak leku geometriko gisa, zirkunferentzia eta haren posizioak, elipsea, hiperbola eta parabola beren fokuekin, eta konika bat ekuaziotik ezagutzea.',
        es: 'La mediatriz y las bisectrices como lugares geométricos, la circunferencia y sus posiciones, la elipse, la hipérbola y la parábola con sus focos, y reconocer una cónica por su ecuación.',
        en: 'The perpendicular bisector and the angle bisectors as loci, the circle and its positions, the ellipse, the hyperbola and the parabola with their foci, and recognising a conic from its equation.',
        ar: 'محور القطعة ومنصّفا الزاويتين محلّاتٍ هندسية، والدائرة وأوضاعها، والقطع الناقص والزائد والمكافئ مع بؤرها، والتعرف على القطع المخروطي من معادلته.'
    },
    heroArt: <BachConicsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, erdibitzailetik konika bat ezagutzera', es: 'Cinco etapas, de la mediatriz a reconocer una cónica', en: 'Five stages, from the perpendicular bisector to recognising a conic', ar: 'خمس مراحل، من محور القطعة إلى التعرف على قطع مخروطي' },
    stages: bachConicsStages,
    topics: bachConicsTopics,
    diagnostic: bachConicsDiagnostic,
    guidedPractice: bachConicsPractice,
    exerciseBank: bachConicsExerciseBank,
    challenges: bachConicsChallenges,
    lab: {
        description: {
            eu: `${bachConicsLabTools.length} tresna, erronkekin: lorazainaren elipsea, fokua eta zuzentzailea eta eszentrikotasuna, berriak; eta 4. DBHko zuzenkiaren erdibitzailea eta zirkunferentzia.`,
            es: `${bachConicsLabTools.length} herramientas con retos: el jardinero, foco y directriz y la excentricidad, nuevas; y de 4.º ESO, la mediatriz del segmento y la circunferencia.`,
            en: `${bachConicsLabTools.length} tools with challenges: the gardener's ellipse, focus and directrix and the eccentricity, new; and from 4th ESO, the perpendicular bisector and the circle.`,
            ar: `${bachConicsLabTools.length} أدوات مع تحديات: قطع البستاني والبؤرة والدليل والاختلاف المركزي، وهي جديدة؛ ومن الصف الرابع: محور القطعة والدائرة.`
        },
        progressIds: bachConicsLabChallengeIds,
        toolForTopic: bachConicsLabToolForTopic,
        render: (props) => <BachConicsLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bakar bat: eskatzen den koefizientea, koordenatua, erradioa, ardatzerdia, distantzia, eszentrikotasuna edo parametroa. Adibidez 5, −3, 0,6 edo 3/4.', es: 'Escribe un solo número: el coeficiente, la coordenada, el radio, el semieje, la distancia, la excentricidad o el parámetro que se pide. Por ejemplo 5, −3, 0,6 o 3/4.', en: 'Write a single number: the coefficient, coordinate, radius, semi-axis, distance, eccentricity or parameter that is asked for. For example 5, −3, 0.6 or 3/4.', ar: 'اكتب عددًا واحدًا: المعامل أو الإحداثي أو نصف القطر أو نصف المحور أو المسافة أو الاختلاف المركزي أو الوسيط المطلوب. مثلًا 5 أو ⁦−3⁩ أو 0.6 أو 3/4.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readVectorsAnswer,
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', en: 'e.g. −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bakar bat, adibidez −3, 0,6 edo 3/4.', es: 'No entiendo esa respuesta. Escribe un solo número, por ejemplo −3, 0,6 o 3/4.', en: 'I don\'t understand that answer. Write a single number, for example −3, 0.6 or 3/4.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا واحدًا، مثل ⁦−3⁩ أو 0.6 أو 3/4.' }
    },
    errorByStage: {
        loci: { eu: 'Distantziekin, karratura jaso eta garatu: (x − a)² = x² − 2ax + a², ez x² − a². Balio absolutuak bi zuzen ematen ditu: ez ahaztu ± zeinua.', es: 'Con distancias, eleva al cuadrado y desarrolla: (x − a)² = x² − 2ax + a², no x² − a². El valor absoluto da dos rectas: no olvides el ±.', en: 'With distances, square and expand: (x − a)² = x² − 2ax + a², not x² − a². The absolute value gives two lines: do not forget the ±.', ar: 'مع المسافات ربّع وانشر: (x − a)² = x² − 2ax + a² لا x² − a². والقيمة المطلقة تعطي مستقيمين: لا تنسَ ±.' },
        circle: { eu: 'Zentroa zeinua aldatuta doa: (x − 3)² gaiak 3 ematen du, ez −3. Eskuineko zenbakia r² da, ez r: atera erro karratua.', es: 'El centro va con el signo cambiado: (x − 3)² da 3, no −3. El número de la derecha es r², no r: saca la raíz.', en: 'The centre comes with the sign changed: (x − 3)² gives 3, not −3. The number on the right is r², not r: take the square root.', ar: 'يأتي المركز بإشارة معكوسة: (x − 3)² تعطي 3 لا −3. والعدد في الطرف الأيمن هو r² لا r: خذ الجذر.' },
        ellipse: { eu: 'Elipsean a da handiena: a² = b² + c², beraz c² = a² − b². Ardatz nagusia izendatzaile handiena dagoen aldean doa.', es: 'En la elipse a es el mayor: a² = b² + c², así que c² = a² − b². El eje mayor va donde está el denominador mayor.', en: 'In an ellipse a is the greatest: a² = b² + c², so c² = a² − b². The major axis goes where the greater denominator is.', ar: 'في القطع الناقص a هو الأكبر: a² = b² + c² إذن c² = a² − b². والمحور الأكبر حيث المقام الأكبر.' },
        hyperbola: { eu: 'Hiperbolan c da handiena: c² = a² + b². Asintoten malda b/a da, ez a/b.', es: 'En la hipérbola c es el mayor: c² = a² + b². La pendiente de las asíntotas es b/a, no a/b.', en: 'In a hyperbola c is the greatest: c² = a² + b². The slope of the asymptotes is b/a, not a/b.', ar: 'في القطع الزائد c هو الأكبر: c² = a² + b². وميل المقاربين b/a لا a/b.' },
        parabola: { eu: 'y² = 2px parabolan fokua (p/2, 0) da, ez (p, 0), eta zuzentzailea x = −p/2. Konika bat ezagutzeko, begiratu x² eta y² gaien koefizienteei.', es: 'En y² = 2px el foco es (p/2, 0), no (p, 0), y la directriz x = −p/2. Para reconocer una cónica, mira los coeficientes de x² e y².', en: 'In y² = 2px the focus is (p/2, 0), not (p, 0), and the directrix is x = −p/2. To recognise a conic, look at the coefficients of x² and y².', ar: 'في y² = 2px البؤرة (p/2, 0) لا (p, 0)، والدليل x = −p/2. ولتمييز قطع مخروطي انظر إلى معاملي x² وy².' }
    }
}

export function KonikakBatx1zIntroPage() {
    return <UnitPage unit={konikakBatx1zUnit} />
}

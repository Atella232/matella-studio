import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readVectorsAnswer } from '../dbh4-akademikoak-bektoreak/answers'
import { anglesDistancesChallenges, anglesDistancesDiagnostic, anglesDistancesExerciseBank, anglesDistancesPractice } from './content'
import { AnglesDistancesHeroArt } from './figures'
import { AnglesDistancesLaboratory } from './lab'
import { anglesDistancesLabChallengeIds, anglesDistancesLabToolForTopic, anglesDistancesLabTools } from './lab/labTools'
import { anglesDistancesStages, anglesDistancesTopics } from './lessons'

const distantziakBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-distantziak-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Angeluak eta distantziak', es: 'Ángulos y distancias', en: 'Angles and distances', ar: 'الزوايا والمسافات' },
    documentTitle: { eu: 'Angeluak eta distantziak · Batxilergoa 2', es: 'Ángulos y distancias · 2.º Bachillerato', en: 'Angles and distances · 2nd Bachillerato', ar: 'الزوايا والمسافات · البكالوريا الثانية' },
    tagline: {
        eu: 'Zuzenen eta planoen angeluak, proiekzio ortogonalak, simetrikoak eta plano erdikaria, puntu batetik plano eta zuzen baterako distantzia, eta zuzenen arteko distantzia, perpendikular komunarekin.',
        es: 'Ángulos de rectas y planos, proyecciones ortogonales, simétricos y plano mediador, la distancia de un punto a un plano y a una recta, y la distancia entre rectas, con la perpendicular común.',
        en: 'Angles of lines and planes, orthogonal projections, symmetric points and the mediator plane, the distance from a point to a plane and to a line, and the distance between lines, with the common perpendicular.',
        ar: 'زوايا المستقيمات والمستويات، والمساقط العمودية، والنظائر والمستوى المنصِّف، والمسافة من نقطة إلى مستوى وإلى مستقيم، والمسافة بين المستقيمات مع العمودي المشترك.'
    },
    heroArt: <AnglesDistancesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, angelutik perpendikular komunera', es: 'Cinco etapas, del ángulo a la perpendicular común', en: 'Five stages, from the angle to the common perpendicular', ar: 'خمس مراحل، من الزاوية إلى العمودي المشترك' },
    stages: anglesDistancesStages,
    topics: anglesDistancesTopics,
    diagnostic: anglesDistancesDiagnostic,
    guidedPractice: anglesDistancesPractice,
    exerciseBank: anglesDistancesExerciseBank,
    challenges: anglesDistancesChallenges,
    lab: {
        description: {
            eu: `${anglesDistancesLabTools.length} tresna, erronkekin, guztiak 3D taulan: garraiagailua, perpendikularraren oina, ispilua, distantziaren erregela eta gurutzatzen diren zuzenen kutxa.`,
            es: `${anglesDistancesLabTools.length} herramientas con retos, todas en el tablero 3D: el transportador, el pie de la perpendicular, el espejo, la regla de la distancia y la caja de las que se cruzan.`,
            en: `${anglesDistancesLabTools.length} tools with challenges, all on the 3D board: the protractor, the foot of the perpendicular, the mirror, the distance ruler and the box of skew lines.`,
            ar: `${anglesDistancesLabTools.length} أدوات مع تحديات، كلها على اللوحة ثلاثية الأبعاد: المنقلة، ومسقط العمودي، والمرآة، ومسطرة المسافة، وصندوق المستقيمين المتخالفين.`
        },
        progressIds: anglesDistancesLabChallengeIds,
        toolForTopic: anglesDistancesLabToolForTopic,
        render: (props) => <AnglesDistancesLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bakar bat: angelua gradutan, koordenatua, parametroa edo distantzia. Adibidez 45, −3, 2,5 edo 11/3.', es: 'Escribe un solo número: el ángulo en grados, la coordenada, el parámetro o la distancia. Por ejemplo 45, −3, 2,5 o 11/3.', en: 'Write a single number: the angle in degrees, the coordinate, the parameter or the distance. For example 45, −3, 2.5 or 11/3.', ar: 'اكتب عددًا واحدًا: الزاوية بالدرجات أو المركّبة أو الوسيط أو المسافة. مثلًا 45 أو ⁦−3⁩ أو 2.5 أو 11/3.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: (input: string) => readVectorsAnswer(input.replace(/[°º]/g, '')),
        placeholder: () => ({ eu: 'Adib.: 45', es: 'Ej.: 45', en: 'e.g. 45', ar: 'مثال: 45' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bakar bat, adibidez 45, −3 edo 11/3.', es: 'No entiendo esa respuesta. Escribe un solo número, por ejemplo 45, −3 o 11/3.', en: 'I don\'t understand that answer. Write a single number, for example 45, −3 or 11/3.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا واحدًا، مثل 45 أو ⁦−3⁩ أو 11/3.' }
    },
    errorByStage: {
        angles: { eu: 'Angeluak 0 eta 90 gradu artean: kosinuak balio absolutua du. Zuzena eta planoa: normalarekin sinua ateratzen da, ez kosinua.', es: 'Los ángulos van de 0 a 90 grados: el coseno lleva valor absoluto. Recta y plano: con el normal sale el seno, no el coseno.', en: 'Angles go from 0 to 90 degrees: the cosine takes the absolute value. Line and plane: with the normal you get the sine, not the cosine.', ar: 'الزوايا من 0 إلى 90 درجة: جيب التمام بالقيمة المطلقة. مستقيم ومستوى: مع الناظم يخرج الجيب لا جيب التمام.' },
        projections: { eu: 'Aurkitutako t zenbakia zuzenean ordezkatu: t ez da puntua. Zuzen batean proiektatzeko, plano perpendikularra P puntutik pasatzen da.', es: 'El t que sale se sustituye en la recta: t no es el punto. Para proyectar sobre una recta, el plano perpendicular pasa por P.', en: 'Put the t you get back into the line: t is not the point. To project on a line, the perpendicular plane goes through P.', ar: 'تُعوَّض t الناتجة في المستقيم: t ليست النقطة. وللإسقاط على مستقيم يمر المستوى العمودي بـ P.' },
        symmetric: { eu: 'Oina ez da simetrikoa: M erdian geratzen da, eta P′ = 2M − P. Plano erdikaria erdiko puntutik pasatzen da.', es: 'El pie no es el simétrico: M queda en medio y P′ = 2M − P. El plano mediador pasa por el punto medio.', en: 'The foot is not the symmetric point: M is in the middle and P′ = 2M − P. The mediator plane goes through the midpoint.', ar: 'المسقط ليس النظيرة: M في المنتصف وP′ = 2M − P. والمستوى المنصِّف يمر بالمنتصف.' },
        'point-distances': { eu: 'Balio absolutua eta normalaren moduluaz zatitu. Plano paraleloetan, lehenik normal bera. Zuzen batera, |AP × u| zati |u|, ez |AP|.', es: 'Valor absoluto y dividir entre el módulo del normal. En planos paralelos, primero el mismo normal. A una recta, |AP × u| entre |u|, no |AP|.', en: 'Absolute value and divide by the magnitude of the normal. For parallel planes, first the same normal. To a line, |AP × u| divided by |u|, not |AP|.', ar: 'القيمة المطلقة والقسمة على طول الناظم. في المستويين المتوازيين أولًا الناظم نفسه. وإلى مستقيم |AP × u| على |u| لا |AP|.' },
        'line-distances': { eu: 'Gurutzatzen diren zuzenak: bolumena zati |u × v|, ez |u|·|v|. Perpendikular komunak bi zuzenekiko perpendikularra izan behar du.', es: 'Rectas que se cruzan: volumen entre |u × v|, no |u|·|v|. La perpendicular común tiene que serlo a las dos rectas.', en: 'Skew lines: volume divided by |u × v|, not |u|·|v|. The common perpendicular has to be perpendicular to both lines.', ar: 'المستقيمان المتخالفان: الحجم على |u × v| لا |u|·|v|. ويجب أن يكون العمودي المشترك عموديًا على المستقيمين.' }
    }
}

export function DistantziakBatx2zIntroPage() {
    return <UnitPage unit={distantziakBatx2zUnit} />
}

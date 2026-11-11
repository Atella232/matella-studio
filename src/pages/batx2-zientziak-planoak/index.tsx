import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readVectorsAnswer } from '../dbh4-akademikoak-bektoreak/answers'
import { linesPlanesChallenges, linesPlanesDiagnostic, linesPlanesExerciseBank, linesPlanesPractice } from './content'
import { LinesPlanesHeroArt } from './figures'
import { LinesPlanesLaboratory } from './lab'
import { linesPlanesLabChallengeIds, linesPlanesLabToolForTopic, linesPlanesLabTools } from './lab/labTools'
import { linesPlanesStages, linesPlanesTopics } from './lessons'

const planoakBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-planoak-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Zuzenak eta planoak espazioan', es: 'Rectas y planos en el espacio', en: 'Lines and planes in space', ar: 'المستقيمات والمستويات في الفضاء' },
    documentTitle: { eu: 'Zuzenak eta planoak espazioan · Batxilergoa 2', es: 'Rectas y planos en el espacio · 2.º Bachillerato', en: 'Lines and planes in space · 2nd Bachillerato', ar: 'المستقيمات والمستويات في الفضاء · البكالوريا الثانية' },
    tagline: {
        eu: 'Zuzenaren eta planoaren ekuazioak, bi zuzenen posizioa (ebaki, gurutzatu, paralelo), zuzena eta planoa, plano-sorta eta bizpahiru planoren posizioa, heinekin eta parametroekin.',
        es: 'Las ecuaciones de la recta y del plano, la posición de dos rectas (se cortan, se cruzan, paralelas), recta y plano, el haz de planos y la posición de dos y tres planos, con rangos y parámetros.',
        en: 'The equations of a line and of a plane, the position of two lines (meeting, skew, parallel), a line and a plane, the pencil of planes and the position of two and three planes, with ranks and parameters.',
        ar: 'معادلات المستقيم والمستوى، ووضع مستقيمين (متقاطعان أو متخالفان أو متوازيان)، والمستقيم والمستوى، وحزمة المستويات، ووضع مستويين وثلاثة مستويات، مع الرتب والوسطاء.'
    },
    heroArt: <LinesPlanesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, zuzenetik hiru planoetara', es: 'Cinco etapas, de la recta a los tres planos', en: 'Five stages, from the line to three planes', ar: 'خمس مراحل، من المستقيم إلى ثلاثة مستويات' },
    stages: linesPlanesStages,
    topics: linesPlanesTopics,
    diagnostic: linesPlanesDiagnostic,
    guidedPractice: linesPlanesPractice,
    exerciseBank: linesPlanesExerciseBank,
    challenges: linesPlanesChallenges,
    lab: {
        description: {
            eu: `${linesPlanesLabTools.length} tresna, erronkekin, guztiak 3D taulan: t parametroa, planoa eta haren normala, ebakitzen dira ala gurutzatzen?, planoa zeharkatzen duen zuzena eta hiru plano.`,
            es: `${linesPlanesLabTools.length} herramientas con retos, todas en el tablero 3D: el parámetro t, el plano y su normal, ¿se cortan o se cruzan?, la recta que atraviesa y tres planos.`,
            en: `${linesPlanesLabTools.length} tools with challenges, all on the 3D board: the parameter t, the plane and its normal, do they meet or are they skew?, the line that goes through and three planes.`,
            ar: `${linesPlanesLabTools.length} أدوات مع تحديات، كلها على اللوحة ثلاثية الأبعاد: الوسيط t، والمستوى وناظمه، ومتقاطعان أم متخالفان؟، والمستقيم الذي يخترق، وثلاثة مستويات.`
        },
        progressIds: linesPlanesLabChallengeIds,
        toolForTopic: linesPlanesLabToolForTopic,
        render: (props) => <LinesPlanesLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bakar bat: eskatzen den koordenatua, koefizientea, parametroa, determinantea edo t balioa. Adibidez 5, −3, 0,5 edo 3/2.', es: 'Escribe un solo número: la coordenada, el coeficiente, el parámetro, el determinante o el valor de t que se pide. Por ejemplo 5, −3, 0,5 o 3/2.', en: 'Write a single number: the coordinate, coefficient, parameter, determinant or value of t that is asked for. For example 5, −3, 0.5 or 3/2.', ar: 'اكتب عددًا واحدًا: المركّبة أو المعامل أو الوسيط أو المحدد أو قيمة t المطلوبة. مثلًا 5 أو ⁦−3⁩ أو 0.5 أو 3/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readVectorsAnswer,
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', en: 'e.g. −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bakar bat, adibidez −3, 0,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un solo número, por ejemplo −3, 0,5 o 3/2.', en: 'I don\'t understand that answer. Write a single number, for example −3, 0.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا واحدًا، مثل ⁦−3⁩ أو 0.5 أو 3/2.' }
    },
    errorByStage: {
        lines: { eu: 'Parametrikoetan puntua gai askean doa eta norabidea t-ren ondoan. Jarraituan, (x − a) zeinuarekin: 3 − y idazten bada, norabideak −1 hartzen du. Inplizituetan norabidea normalen biderkadura bektoriala da.', es: 'En las paramétricas el punto va como término independiente y la dirección junto a t. En la continua, (x − a) con su signo: si pone 3 − y, la dirección lleva −1. En las implícitas, la dirección es el producto vectorial de los normales.', en: 'In the parametric equations the point is the constant term and the direction goes with t. In the continuous one, (x − a) with its sign: if it says 3 − y, the direction takes −1. In the implicit ones, the direction is the cross product of the normals.', ar: 'في المعادلات الوسيطية النقطة حد ثابت والاتجاه بجانب t. وفي المتصلة (x − a) بإشارتها: إذا كُتب 3 − y فالاتجاه يأخذ −1. وفي الديكارتيتين الاتجاه هو الجداء المتجهي للناظمين.' },
        planes: { eu: 'Normala x, y eta z aldagaien koefizienteak dira, D gabe. Planoaren bi norabideak ez dira paraleloak izan behar. Hiru puntu lerrokatuek ez dute plano bakarra ematen.', es: 'El normal son los coeficientes de x, y y z, sin la D. Las dos direcciones del plano no pueden ser paralelas. Tres puntos alineados no dan un plano único.', en: 'The normal is the coefficients of x, y and z, without D. The two directions of the plane cannot be parallel. Three collinear points do not give a single plane.', ar: 'الناظم هو معاملات x وy وz بدون D. ولا يجوز أن يتوازى اتجاها المستوى. وثلاث نقاط على استقامة واحدة لا تعطي مستوى وحيدًا.' },
        'two-lines': { eu: 'Norabide proportzionalak: paraleloak edo bat datozenak; egiaztatu puntu bat. Paraleloak ez badira, ebaki ala gurutzatu: biderkadura mistoa. Ebaki-puntuan, parametro bana zuzen bakoitzerako.', es: 'Directores proporcionales: paralelas o coincidentes; comprueba un punto. Si no son paralelas, se cortan o se cruzan: producto mixto. Para el punto de corte, un parámetro distinto para cada recta.', en: 'Proportional directions: parallel or coincident; check a point. If they are not parallel, they meet or are skew: scalar triple product. For the meeting point, a different parameter for each line.', ar: 'اتجاهان متناسبان: متوازيان أو منطبقان؛ تحقق من نقطة. وإن لم يتوازيا فهما متقاطعان أو متخالفان: الجداء المختلط. ولنقطة التقاطع وسيط مختلف لكل مستقيم.' },
        'line-plane': { eu: 'u · n = 0 bada, zuzena paraleloa da edo planoan dago: puntu bat egiaztatu. Ebaki-puntuan t aurkitu eta gero zuzenean ordezkatu: t ez da puntua.', es: 'Si u · n = 0, la recta es paralela o está en el plano: comprueba un punto. En el punto de corte, halla t y sustitúyelo después en la recta: t no es el punto.', en: 'If u · n = 0, the line is parallel or lies in the plane: check a point. For the meeting point, find t and then put it into the line: t is not the point.', ar: 'إذا كان u · n = 0 فالمستقيم موازٍ أو في المستوى: تحقق من نقطة. ولنقطة التقاطع أوجد t ثم عوّضها في المستقيم: t ليست النقطة.' },
        'planes-position': { eu: 'Normal ez-proportzionalak: ebakitzaileak. Hiru planotan, heinak: rg M = 3 puntua; rg M = 2 eta rg M* = 3 ez dago puntu komunik; det M = 0 ez da beti zuzena.', es: 'Normales no proporcionales: secantes. Con tres planos, los rangos: rg M = 3, un punto; rg M = 2 y rg M* = 3, ningún punto común; det M = 0 no siempre es una recta.', en: 'Non-proportional normals: secant. With three planes, the ranks: rg M = 3, a point; rg M = 2 and rg M* = 3, no common point; det M = 0 is not always a line.', ar: 'ناظمان غير متناسبين: متقاطعان. ومع ثلاثة مستويات الرتب: rg M = 3 نقطة؛ rg M = 2 وrg M* = 3 لا نقطة مشتركة؛ وdet M = 0 ليس دائمًا مستقيمًا.' }
    }
}

export function PlanoakBatx2zIntroPage() {
    return <UnitPage unit={planoakBatx2zUnit} />
}

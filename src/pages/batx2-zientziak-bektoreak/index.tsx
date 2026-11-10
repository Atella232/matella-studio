import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readVectorsAnswer } from '../dbh4-akademikoak-bektoreak/answers'
import { spaceVectorsChallenges, spaceVectorsDiagnostic, spaceVectorsExerciseBank, spaceVectorsPractice } from './content'
import { SpaceVectorsHeroArt } from './figures'
import { SpaceVectorsGames } from './games'
import { SPACE_VECTORS_GAME_RECORDS_KEY, spaceVectorsGameProgressIds } from './games/info'
import { SpaceVectorsLaboratory } from './lab'
import { spaceVectorsLabChallengeIds, spaceVectorsLabToolForTopic, spaceVectorsLabTools } from './lab/labTools'
import { spaceVectorsStages, spaceVectorsTopics } from './lessons'

const bektoreakBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-bektoreak-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Espazioko bektoreak', es: 'Vectores en el espacio', en: 'Vectors in space', ar: 'المتجهات في الفضاء' },
    documentTitle: { eu: 'Espazioko bektoreak · Batxilergoa 2', es: 'Vectores en el espacio · 2.º Bachillerato', en: 'Vectors in space · 2nd Bachillerato', ar: 'المتجهات في الفضاء · البكالوريا الثانية' },
    tagline: {
        eu: 'Puntuak eta bektoreak hiru dimentsiotan, mendekotasun lineala eta oinarriak, biderkadura eskalarra, biderkadura bektoriala eta azalerak, eta biderkadura mistoa eta bolumenak.',
        es: 'Puntos y vectores en tres dimensiones, dependencia lineal y bases, el producto escalar, el producto vectorial y las áreas, y el producto mixto y los volúmenes.',
        en: 'Points and vectors in three dimensions, linear dependence and bases, the dot product, the cross product and areas, and the scalar triple product and volumes.',
        ar: 'النقاط والمتجهات في ثلاثة أبعاد، والارتباط الخطي والأساسات، والجداء السلمي، والجداء المتجهي والمساحات، والجداء المختلط والحجوم.'
    },
    heroArt: <SpaceVectorsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, puntutik kutxaren bolumenera', es: 'Cinco etapas, del punto al volumen de la caja', en: 'Five stages, from the point to the volume of the box', ar: 'خمس مراحل، من النقطة إلى حجم الصندوق' },
    stages: spaceVectorsStages,
    topics: spaceVectorsTopics,
    diagnostic: spaceVectorsDiagnostic,
    guidedPractice: spaceVectorsPractice,
    exerciseBank: spaceVectorsExerciseBank,
    challenges: spaceVectorsChallenges,
    lab: {
        description: {
            eu: `${spaceVectorsLabTools.length} tresna, erronkekin, guztiak 3D taulan: puntua eta haren kutxa, planoan sartzen da?, itzala espazioan, eskuineko eskua eta hiru bektoreren kutxa.`,
            es: `${spaceVectorsLabTools.length} herramientas con retos, todas en el tablero 3D: el punto y su caja, ¿cabe en el plano?, la sombra en el espacio, la mano derecha y la caja de tres vectores.`,
            en: `${spaceVectorsLabTools.length} tools with challenges, all on the 3D board: the point and its box, does it fit in the plane?, the shadow in space, the right hand and the box of three vectors.`,
            ar: `${spaceVectorsLabTools.length} أدوات مع تحديات، كلها على اللوحة ثلاثية الأبعاد: النقطة وصندوقها، وهل يدخل في المستوى؟، والظل في الفضاء، واليد اليمنى، وصندوق ثلاثة متجهات.`
        },
        progressIds: spaceVectorsLabChallengeIds,
        toolForTopic: spaceVectorsLabToolForTopic,
        render: (props) => <SpaceVectorsLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Sei joko: lasterketa, zenbakia ala bektorea?, zein da u × v?, kutxa zapaldua, detektibea eta memoria.',
            es: 'Seis juegos: carrera, ¿número o vector?, ¿cuál es u × v?, la caja aplastada, detective y memoria.',
            en: 'Six games: race, number or vector?, which is u × v?, the flattened box, detective and memory.',
            ar: 'ست ألعاب: السباق، وعدد أم متجه؟، وأيها u × v؟، والصندوق المنضغط، والمخبر، والذاكرة.'
        },
        progressIds: spaceVectorsGameProgressIds,
        recordsKey: SPACE_VECTORS_GAME_RECORDS_KEY,
        render: (props) => <SpaceVectorsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bakar bat: eskatzen den koordenatua, modulua, biderkadura, angelua gradutan, azalera, bolumena edo parametroa. Adibidez 5, −3, 2,5 edo 3/5.', es: 'Escribe un solo número: la coordenada, el módulo, el producto, el ángulo en grados, el área, el volumen o el parámetro que se pide. Por ejemplo 5, −3, 2,5 o 3/5.', en: 'Write a single number: the coordinate, magnitude, product, angle in degrees, area, volume or parameter that is asked for. For example 5, −3, 2.5 or 3/5.', ar: 'اكتب عددًا واحدًا: المركّبة أو الطول أو الجداء أو الزاوية بالدرجات أو المساحة أو الحجم أو الوسيط المطلوب. مثلًا 5 أو ⁦−3⁩ أو 2.5 أو 3/5.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readVectorsAnswer,
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', en: 'e.g. −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bakar bat, adibidez −3, 2,5 edo 3/5.', es: 'No entiendo esa respuesta. Escribe un solo número, por ejemplo −3, 2,5 o 3/5.', en: 'I don\'t understand that answer. Write a single number, for example −3, 2.5 or 3/5.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا واحدًا، مثل ⁦−3⁩ أو 2.5 أو 3/5.' }
    },
    errorByStage: {
        space: { eu: 'Koordenatuak: muturra ken jatorria, ez alderantziz. Moduluan hiru karratuak, z ere bai. Simetrikoa: 2M − P, ez batezbestekoa.', es: 'Coordenadas: extremo menos origen, no al revés. En el módulo, los tres cuadrados, también el de z. Simétrico: 2M − P, no la media.', en: 'Coordinates: end point minus start point, not the other way round. In the magnitude, all three squares, the z one too. Symmetric point: 2M − P, not the average.', ar: 'المركّبات: الطرف ناقص الأصل لا العكس. وفي الطول المربعات الثلاثة، ومنها مربع z. والنظيرة: 2M − P لا المتوسط.' },
        dependence: { eu: 'Hirugarren ekuazioa ere egiaztatu. Hiru bektore biko paraleloak ez izanda ere, mendekoak izan daitezke: begiratu determinantea.', es: 'Comprueba también la tercera ecuación. Tres vectores pueden ser dependientes sin ser paralelos dos a dos: mira el determinante.', en: 'Check the third equation too. Three vectors can be dependent without being parallel in pairs: look at the determinant.', ar: 'تحقق من المعادلة الثالثة أيضًا. قد تكون ثلاثة متجهات مرتبطة دون أن تكون متوازية مثنى مثنى: انظر إلى المحدد.' },
        dot: { eu: 'Biderkadura eskalarra zenbaki bat da. Kosinuan, moduluen biderkaduraz zatitu. Proiekzioa: proiektatzen den gaineko bektorearen moduluaz zatitu.', es: 'El producto escalar es un número. En el coseno, divide entre el producto de los módulos. Proyección: entre el módulo del vector sobre el que se proyecta.', en: 'The dot product is a number. In the cosine, divide by the product of the magnitudes. Projection: divide by the magnitude of the vector you project onto.', ar: 'الجداء السلمي عدد. وفي جيب التمام اقسم على جداء الطولين. والإسقاط: على طول المتجه الذي نُسقط عليه.' },
        cross: { eu: 'Biderkadura bektoriala bektore bat da. j minus zeinuarekin. Ordenak garrantzia du: v × u = −u × v. Triangelua: erdia.', es: 'El producto vectorial es un vector. La j, con signo menos. El orden importa: v × u = −u × v. Triángulo: la mitad.', en: 'The cross product is a vector. The j, with a minus sign. The order matters: v × u = −u × v. Triangle: half.', ar: 'الجداء المتجهي متجه. وj بإشارة سالبة. والترتيب مهم: v × u = −u × v. والمثلث: النصف.' },
        mixed: { eu: 'Bolumena: biderkadura mistoaren balio absolutua. Tetraedroa: seirena. Bi bektore trukatzeak zeinua aldatzen du.', es: 'Volumen: el valor absoluto del producto mixto. Tetraedro: la sexta parte. Intercambiar dos vectores cambia el signo.', en: 'Volume: the absolute value of the scalar triple product. Tetrahedron: a sixth. Swapping two vectors changes the sign.', ar: 'الحجم: القيمة المطلقة للجداء المختلط. ورباعي الأوجه: السدس. وتبديل متجهين يغيّر الإشارة.' }
    }
}

export function BektoreakBatx2zIntroPage() {
    return <UnitPage unit={bektoreakBatx2zUnit} />
}

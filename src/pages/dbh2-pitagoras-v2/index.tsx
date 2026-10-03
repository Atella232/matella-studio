import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readFiguresAnswer } from '../dbh1-figurak-v2/answers'
import { pythagorasChallenges, pythagorasDiagnostic, pythagorasExerciseBank, pythagorasPractice } from './content'
import { PythagorasHeroArt } from './figures'
import { PythagorasLaboratory } from './lab'
import { pythagorasLabChallengeIds, pythagorasLabToolForTopic, pythagorasLabTools } from './lab/labTools'
import { pythagorasStages, pythagorasTopics } from './lessons'

const pitagorasUnit: UnitDefinition = {
    storagePrefix: 'matella-pitagoras-dbh2',
    coursePath: '/matematika/dbh2',
    courseTitle: { eu: '2. DBH', es: '2.º ESO', ar: 'الصف الثاني' },
    title: { eu: 'Pitagorasen teorema', es: 'Teorema de Pitágoras', ar: 'نظرية فيثاغورس' },
    documentTitle: { eu: 'Pitagorasen teorema · 2. DBH', es: 'Teorema de Pitágoras · 2.º ESO', ar: 'نظرية فيثاغورس · الصف الثاني' },
    tagline: {
        eu: 'Aldeetako karratuak, hipotenusa eta katetoak, altuerak, apotemak, kordak, kaxen diagonalak eta eskailerak: triangelu angeluzuzena nonahi.',
        es: 'Cuadrados sobre los lados, hipotenusa y catetos, alturas, apotemas, cuerdas, diagonales de cajas y escaleras: el triángulo rectángulo en todas partes.',
        ar: 'المربعات على الأضلاع، والوتر والضلعان القائمان، والارتفاعات والعوامد والأوتار وأقطار الصناديق والسلالم: المثلث القائم في كل مكان.'
    },
    heroArt: <PythagorasHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, karratuetatik eguneroko problemetara', es: 'Cinco etapas, de los cuadrados a los problemas cotidianos', ar: 'خمس مراحل، من المربعات إلى مسائل الحياة اليومية' },
    stages: pythagorasStages,
    topics: pythagorasTopics,
    diagnostic: pythagorasDiagnostic,
    guidedPractice: pythagorasPractice,
    exerciseBank: pythagorasExerciseBank,
    challenges: pythagorasChallenges,
    lab: {
        description: { eu: `${pythagorasLabTools.length} tresna triangelu angeluzuzena ukitzeko: aldeetako karratuak, triangeluak sailkatu, hipotenusa eta katetoak, irudi lauetako triangelu ezkutatua, kordak eta ukitzaileak, kaxaren diagonala eta sareko distantziak, erronkekin.`, es: `${pythagorasLabTools.length} herramientas para tocar el triángulo rectángulo: cuadrados sobre los lados, clasificar triángulos, hipotenusa y catetos, el triángulo escondido en las figuras planas, cuerdas y tangentes, la diagonal de la caja y distancias en la cuadrícula, con retos.`, ar: `${pythagorasLabTools.length} أدوات للمس المثلث القائم: المربعات على الأضلاع، وتصنيف المثلثات، والوتر والضلعان القائمان، والمثلث المخفي في الأشكال المستوية، والأوتار والمماسات، وقطر الصندوق، والمسافات على الشبكة، مع تحديات.` },
        progressIds: pythagorasLabChallengeIds,
        toolForTopic: pythagorasLabToolForTopic,
        render: (props) => <PythagorasLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat, komarekin edo puntuarekin (5,83 edo 5.83), unitaterik gabe. Erroa zehatza ez denean, hurbildu ariketak esaten duen bezala.', es: 'Escribe un número, con coma o con punto (5,83 o 5.83), sin la unidad. Si la raíz no es exacta, aproxima como diga el ejercicio.', ar: 'اكتب عددًا بالنقطة أو بالفاصلة (5.83) دون الوحدة. وإذا لم يكن الجذر دقيقًا فقرّب كما يطلب التمرين.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        normalizeInput: readFiguresAnswer,
        placeholder: () => ({ eu: 'Adib.: 13', es: 'Ej.: 13', ar: 'مثال: 13' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 13 edo 5,83.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 13 o 5,83.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 13 أو 5.83.' }
    },
    errorByStage: {
        theorem: { eu: 'Hipotenusaren karratua = katetoen karratuen batura. Hipotenusa angelu zuzenaren aurrean dago.', es: 'Cuadrado de la hipotenusa = suma de los cuadrados de los catetos. La hipotenusa está frente al ángulo recto.', ar: 'مربع الوتر = مجموع مربعي الضلعين القائمين. الوتر يقابل الزاوية القائمة.' },
        sides: { eu: 'Hipotenusa: batu eta erroa. Katetoa: kendu eta erroa. Erroa amaieran, ez zatika.', es: 'Hipotenusa: suma y raíz. Cateto: resta y raíz. La raíz al final, no por partes.', ar: 'الوتر: اجمع ثم الجذر. الضلع القائم: اطرح ثم الجذر. الجذر في النهاية لا لكل حد.' },
        plane: { eu: 'Bilatu triangelu angeluzuzena: oinarri-erdia, diagonal-erdiak edo oinarrien kendura.', es: 'Busca el triángulo rectángulo: media base, semidiagonales o diferencia de bases.', ar: 'ابحث عن المثلث القائم: نصف القاعدة أو نصفا القطرين أو فرق القاعدتين.' },
        circle: { eu: 'Erradioa hipotenusa da (apotema, korda). Ukitzailean, angelu zuzena ukitze-puntuan.', es: 'El radio es la hipotenusa (apotema, cuerda). En la tangente, el ángulo recto está en el punto de tangencia.', ar: 'نصف القطر هو الوتر (العامد، الوتر في الدائرة). وفي المماس الزاوية القائمة عند نقطة التماس.' },
        space: { eu: 'Marraztu eta bilatu angelu zuzena. Kaxan: √(a² + b² + c²).', es: 'Dibuja y busca el ángulo recto. En la caja: √(a² + b² + c²).', ar: 'ارسم وابحث عن الزاوية القائمة. في الصندوق: √(a² + b² + c²).' }
    }
}

export function PitagorasIntroPage() {
    return <UnitPage unit={pitagorasUnit} />
}

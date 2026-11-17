import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { socFunctionsChallenges, socFunctionsDiagnostic, socFunctionsExerciseBank, socFunctionsPractice } from './content'
import { SocFunctionsHeroArt } from './figures'
import { SocFunctionsLaboratory } from './lab'
import { socFunctionsLabChallengeIds, socFunctionsLabToolForTopic, socFunctionsLabTools } from './lab/labTools'
import { socFunctionsStages, socFunctionsTopics } from './lessons'

const funtzioakBatx1gUnit: UnitDefinition = {
    storagePrefix: 'matella-funtzioak-batx1g',
    coursePath: '/matematika/batx1-gizarte',
    courseTitle: { eu: 'Batxilergoa 1 · Gizarte Zientziak', es: '1.º Bachillerato · Ciencias Sociales', en: '1st Bachillerato · Social Sciences', ar: 'البكالوريا الأولى · العلوم الاجتماعية' },
    title: { eu: 'Funtzio elementalak', es: 'Funciones elementales', en: 'Elementary functions', ar: 'الدوال الأساسية' },
    documentTitle: { eu: 'Funtzio elementalak · Batxilergoa 1 · Gizarte Zientziak', es: 'Funciones elementales · 1.º Bachillerato · Ciencias Sociales', en: 'Elementary functions · 1st Bachillerato · Social Sciences', ar: 'الدوال الأساسية · البكالوريا الأولى · العلوم الاجتماعية' },
    tagline: {
        eu: 'Funtzio-familiak eta izate-eremua, zuzenak eta interpolazioa, parabolak eta diru-sarrera edo mozkin handienak, batez besteko kostua eta erroak, eta tarifak zatika.',
        es: 'Familias de funciones y dominio, rectas e interpolación, parábolas e ingresos o beneficios máximos, coste medio y raíces, y tarifas a trozos.',
        en: 'Families of functions and domain, lines and interpolation, parabolas and the greatest revenue or profit, average cost and roots, and piecewise tariffs.',
        ar: 'عائلات الدوال والمجال، والمستقيمات والاستيفاء، والقطوع المكافئة وأكبر الإيرادات أو الأرباح، والتكلفة المتوسطة والجذور، والتعرفات المعرّفة على أجزاء.'
    },
    heroArt: <SocFunctionsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, familietatik tarifetara', es: 'Cinco etapas, de las familias a las tarifas', en: 'Five stages, from families to tariffs', ar: 'خمس مراحل، من العائلات إلى التعرفات' },
    stages: socFunctionsStages,
    topics: socFunctionsTopics,
    diagnostic: socFunctionsDiagnostic,
    guidedPractice: socFunctionsPractice,
    exerciseBank: socFunctionsExerciseBank,
    challenges: socFunctionsChallenges,
    lab: {
        description: {
            eu: `${socFunctionsLabTools.length} tresna, erronkekin: bi (edo hiru) datuen artean, gehien ematen duen prezioa eta batez besteko kostua, berriak; eta 4. DBHko izate-eremua eraikitzea, azalerarik handieneko markoa, puntua eta malda, parabola, parabola erroetatik, hiperbola, erroa, bi zati lotzea eta balio absolutua tolestea.`,
            es: `${socFunctionsLabTools.length} herramientas con retos: entre dos (o tres) datos, el precio que más da y el coste medio, nuevas; y de 4.º ESO, construye el dominio, el marco de mayor área, punto y pendiente, la parábola, la parábola desde sus raíces, la hipérbola, la raíz, une dos trozos y dobla el valor absoluto.`,
            en: `${socFunctionsLabTools.length} tools with challenges: between two (or three) data, the price that brings in most and the average cost, new; and from 4th ESO, build the domain, the frame of greatest area, point and slope, the parabola, a parabola from its roots, the hyperbola, the root, join two pieces and fold the absolute value.`,
            ar: `${socFunctionsLabTools.length} أداة مع تحديات: بين بيانتين (أو ثلاث) والسعر الذي يعطي أكثر والتكلفة المتوسطة، وهي جديدة؛ ومن الصف الرابع: ابنِ المجال والإطار ذو المساحة الأكبر والنقطة والميل والقطع المكافئ والقطع المكافئ من جذريه والقطع الزائد والجذر وصِل جزأين واطوِ القيمة المطلقة.`
        },
        progressIds: socFunctionsLabChallengeIds,
        toolForTopic: socFunctionsLabToolForTopic,
        render: (props) => <SocFunctionsLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Eurotan edo unitateetan eskatzen bada, zenbakia bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si se pide en euros o en unidades, solo el número.', en: 'Write a number: 5, −3, 1.5 or 3/2. If it is asked in euros or units, just the number.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا طُلب باليورو أو بالوحدات فاكتب العدد وحده.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        families: { eu: 'Zatiki batean, kendu izendatzailearen zeroak; erro batean, errokizuna ≥ 0. Testuinguruan, zentzua duten balioak bakarrik.', es: 'En una fracción, quita los ceros del denominador; en una raíz, radicando ≥ 0. En un contexto, solo los valores con sentido.', en: 'In a fraction, remove the zeros of the denominator; in a root, radicand ≥ 0. In a context, only the values that make sense.', ar: 'في الكسر احذف أصفار المقام، وفي الجذر ما تحت الجذر ≥ 0. وفي السياق القيم ذات المعنى فقط.' },
        linear: { eu: 'Malda: y-ren aldaketa zati x-ren aldaketa. Datuetatik urrun estrapolatzea ez da fidagarria. Ez ahaztu kostu finkoa.', es: 'Pendiente: lo que cambia la y entre lo que cambia la x. Extrapolar lejos de los datos no es fiable. No olvides el coste fijo.', en: 'Slope: change in y over change in x. Extrapolating far from the data is not reliable. Do not forget the fixed cost.', ar: 'الميل: تغيّر y على تغيّر x. والاستقراء بعيدًا عن البيانات غير موثوق. ولا تنسَ التكلفة الثابتة.' },
        quadratic: { eu: 'Erpina x = −b/2a zuzenean dago. Mozkinik handiena eskatzen bada, kalkulatu funtzioaren balioa erpinean, ez x bakarrik.', es: 'El vértice está en x = −b/2a. Si se pide el beneficio máximo, calcula el valor de la función en el vértice, no solo la x.', en: 'The vertex is at x = −b/2a. If the greatest profit is asked for, work out the value of the function at the vertex, not just the x.', ar: 'الرأس عند x = −b/2a. وإذا طُلب أكبر ربح فاحسب قيمة الدالة عند الرأس لا x وحدها.' },
        inverse: { eu: 'y = k/x: x·y = k. y = a + k/(x − b) funtzioaren asintotak x = b eta y = a dira. Batez besteko kostua v + F/x da.', es: 'y = k/x: x·y = k. Las asíntotas de y = a + k/(x − b) son x = b e y = a. El coste medio es v + F/x.', en: 'y = k/x: x·y = k. The asymptotes of y = a + k/(x − b) are x = b and y = a. The average cost is v + F/x.', ar: 'y = k/x: ‏x·y = k. والخطان المقاربان لـ y = a + k/(x − b) هما x = b وy = a. والتكلفة المتوسطة v + F/x.' },
        piecewise: { eu: 'x bakoitzak zati bakarra erabiltzen du: begiratu ≤ eta < ondo. Mugaz gaindiko zatian, gehitu mugaraino metatutakoa.', es: 'Cada x usa un solo trozo: mira bien el ≤ y el <. En el trozo de después del límite, suma lo acumulado hasta el límite.', en: 'Each x uses a single piece: look carefully at ≤ and <. In the piece after the threshold, add what has built up to it.', ar: 'كل x تستعمل جزءًا واحدًا: انتبه إلى ≤ و<. وفي الجزء الذي بعد الحدّ أضف المتراكم حتى الحدّ.' }
    }
}

export function FuntzioakBatx1gIntroPage() {
    return <UnitPage unit={funtzioakBatx1gUnit} />
}

import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { equationsSystemsChallenges, equationsSystemsDiagnostic, equationsSystemsExerciseBank, equationsSystemsPractice } from './content'
import { EquationsSystemsHeroArt } from './figures'
import { EquationsSystemsLaboratory } from './lab'
import { equationsSystemsLabChallengeIds, equationsSystemsLabToolForTopic, equationsSystemsLabTools } from './lab/labTools'
import { equationsSystemsStages, equationsSystemsTopics } from './lessons'

const ekuazioakUnit: UnitDefinition = {
    storagePrefix: 'matella-ekuazioak-dbh4ap',
    coursePath: '/matematika/dbh4-aplikatuak',
    courseTitle: { eu: '4. DBH · Aplikatuak', es: '4.º ESO · Aplicadas', ar: 'الصف الرابع · التطبيقية' },
    title: { eu: 'Ekuazioak eta sistemak', es: 'Ecuaciones y sistemas', ar: 'المعادلات والأنظمة' },
    documentTitle: { eu: 'Ekuazioak eta sistemak · 4. DBH', es: 'Ecuaciones y sistemas · 4.º ESO', ar: 'المعادلات والأنظمة · الصف الرابع' },
    tagline: {
        eu: 'Lehen eta bigarren mailako ekuazioetatik sistemetara: parentesiak eta izendatzaileak, formula orokorra, ekuazio faktorizatuak eta irrazionalak, ordezkapena, berdinketa eta laburketa, eta problemak.',
        es: 'De las ecuaciones de primer y segundo grado a los sistemas: paréntesis y denominadores, fórmula general, ecuaciones factorizadas y con radicales, sustitución, igualación y reducción, y problemas.',
        ar: 'من معادلات الدرجتين الأولى والثانية إلى الأنظمة: الأقواس والمقامات، والصيغة العامة، والمعادلات المحلَّلة والجذرية، والتعويض والمساواة والحذف، والمسائل.'
    },
    heroArt: <EquationsSystemsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, lehen mailako ekuazioetatik sistemen problemetara', es: 'Cinco etapas, de las ecuaciones de primer grado a los problemas con sistemas', ar: 'خمس مراحل، من معادلات الدرجة الأولى إلى مسائل الأنظمة' },
    stages: equationsSystemsStages,
    topics: equationsSystemsTopics,
    diagnostic: equationsSystemsDiagnostic,
    guidedPractice: equationsSystemsPractice,
    exerciseBank: equationsSystemsExerciseBank,
    challenges: equationsSystemsChallenges,
    lab: {
        description: { eu: `${equationsSystemsLabTools.length} tresna: urratsez urrats, izendatzaileak kentzea, diskriminatzailea, erroak egiaztatzea, sistemak planoan eta laburketa-metodoa, erronkekin.`, es: `${equationsSystemsLabTools.length} herramientas: paso a paso, quitar denominadores, discriminante, comprobar raíces, sistemas en el plano y método de reducción, con retos.`, ar: `${equationsSystemsLabTools.length} أدوات: خطوة بخطوة، وحذف المقامات، والمميّز، والتحقق من الجذور، والأنظمة في المستوى، وطريقة الحذف، مع تحديات.` },
        progressIds: equationsSystemsLabChallengeIds,
        toolForTopic: equationsSystemsLabToolForTopic,
        render: (props) => <EquationsSystemsLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: −4, 11, 1,78 edo 2/3.', es: 'Escribe un número: −4, 11, 1,78 o 2/3.', ar: 'اكتب عددًا: ⁦−4⁩ أو 11 أو 1.78 أو 2/3.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −4', es: 'Ej.: −4', ar: 'مثال: ⁦−4⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −4.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −4.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−4⁩.' }
    },
    errorByStage: {
        'first-degree': { eu: 'Minus baten atzean zeinu guztiak aldatu. Izendatzaileak: biderkatu gai GUZTIAK MKTz.', es: 'Tras un menos cambian todos los signos. Denominadores: multiplica TODOS los términos por el m.c.m.', ar: 'بعد الناقص تتغيّر كل الإشارات. المقامات: اضرب كل الحدود في المضاعف المشترك.' },
        quadratic: { eu: 'Ordenatu ax² + bx + c = 0 eta idatzi a, b eta c zeinuekin. Ez zatitu x-z.', es: 'Ordena ax² + bx + c = 0 y escribe a, b y c con sus signos. No dividas entre x.', ar: 'رتّب ax² + bx + c = 0 واكتب a وb وc بإشاراتها. لا تقسم على x.' },
        other: { eu: 'Biderkadura = 0: faktore bakoitza 0. Erroak: karratura jaso eta egiaztatu beti.', es: 'Producto = 0: cada factor, 0. Raíces: eleva al cuadrado y comprueba siempre.', ar: 'الجداء = 0: كل عامل 0. الجذور: ربّع وتحقّق دائمًا.' },
        systems: { eu: 'Ebazpenak bi ekuazioak bete behar ditu. Ordeztean, adierazpena parentesi artean.', es: 'La solución tiene que cumplir las dos ecuaciones. Al sustituir, la expresión entre paréntesis.', ar: 'يجب أن يحقق الحل المعادلتين. عند التعويض ضع العبارة بين قوسين.' },
        methods: { eu: 'Laburketan, biderkatu ekuazio osoa, bi atalak. Egiaztatu emaitza bi ekuazioetan.', es: 'En reducción, multiplica la ecuación entera, los dos miembros. Comprueba el resultado en las dos ecuaciones.', ar: 'في الحذف اضرب المعادلة كلها بطرفيها. تحقّق من النتيجة في المعادلتين.' }
    }
}

export function EkuazioakDbh4ApIntroPage() {
    return <UnitPage unit={ekuazioakUnit} />
}

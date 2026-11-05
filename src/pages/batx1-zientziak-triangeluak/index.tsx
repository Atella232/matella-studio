import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readTrigonometryAnswer } from '../dbh4-akademikoak-trigonometria/answers'
import { trianglesChallenges, trianglesDiagnostic, trianglesExerciseBank, trianglesPractice } from './content'
import { TrianglesHeroArt } from './figures'
import { trianglesStages, trianglesTopics } from './lessons'

const triangeluakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-triangeluak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Triangeluen ebazpena', es: 'Resolución de triángulos', en: 'Solving triangles', ar: 'حل المثلثات' },
    documentTitle: { eu: 'Triangeluen ebazpena · Batxilergoa 1', es: 'Resolución de triángulos · 1.º Bachillerato', en: 'Solving triangles · 1st Bachillerato', ar: 'حل المثلثات · البكالوريا الأولى' },
    tagline: {
        eu: 'Edozein angeluren arrazoiak, 360° baino handiagoko angeluak eta kalkulagailuaren beste angelua, triangelu angeluzuzenak eta altuera, sinuaren teorema eta kasu zalantzazkoa, kosinuaren teorema, Heron eta triangulazioa.',
        es: 'Razones de cualquier ángulo, ángulos mayores de 360° y el otro ángulo de la calculadora, triángulos rectángulos y la altura, el teorema de los senos y el caso dudoso, el teorema del coseno, Herón y la triangulación.',
        en: 'Ratios of any angle, angles over 360° and the other angle on the calculator, right-angled triangles and the height, the sine rule and the ambiguous case, the cosine rule, Heron and triangulation.',
        ar: 'نسب أي زاوية، والزوايا الأكبر من 360° والزاوية الأخرى في الآلة الحاسبة، والمثلثات القائمة والارتفاع، ومبرهنة الجيوب والحالة الملتبسة، ومبرهنة جيب التمام، وصيغة هيرون والتثليث.'
    },
    heroArt: <TrianglesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, edozein angelutik triangulaziora', es: 'Cinco etapas, de cualquier ángulo a la triangulación', en: 'Five stages, from any angle to triangulation', ar: 'خمس مراحل، من أي زاوية إلى التثليث' },
    stages: trianglesStages,
    topics: trianglesTopics,
    diagnostic: trianglesDiagnostic,
    guidedPractice: trianglesPractice,
    exerciseBank: trianglesExerciseBank,
    challenges: trianglesChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bat, komarekin edo puntuarekin (0,75 edo 0.75), unitaterik gabe; angeluak gradutan. Negatiboak minus ikurrarekin.', es: 'Escribe un número, con coma o con punto (0,75 o 0.75), sin la unidad; los ángulos, en grados. Los negativos, con signo menos.', en: 'Write a number (a decimal point or a comma both work, e.g. 0.75), without the unit; angles in degrees. Negatives with a minus sign.', ar: 'اكتب عددًا بالنقطة أو بالفاصلة (0.75) دون الوحدة؛ والزوايا بالدرجات. والسالب بإشارة الناقص.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readTrigonometryAnswer,
        placeholder: () => ({ eu: 'Adib.: 36,9', es: 'Ej.: 36,9', en: 'e.g. 36.9', ar: 'مثال: 36.9' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 12,25, −0,6 edo 36,9.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 12,25, −0,6 o 36,9.', en: 'I don\'t understand that answer. Write a number, for example 12.25, −0.6 or 36.9.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 12.25 أو ⁦−0.6⁩ أو 36.9.' }
    },
    errorByStage: {
        angles: { eu: 'Bira osoak kendu, ez zati hamartarra. 180° ± α: izen bera; 90° ± α eta 270° ± α: sinua ↔ kosinua. Zeinua, koadrantearena. Kalkulagailuak angelu bakarra ematen du.', es: 'Quita vueltas enteras, no la parte decimal. 180° ± α: mismo nombre; 90° ± α y 270° ± α: seno ↔ coseno. El signo, el del cuadrante. La calculadora da un solo ángulo.', en: 'Take away whole turns, not the decimal part. 180° ± α: same name; 90° ± α and 270° ± α: sine ↔ cosine. The sign is the quadrant\'s. The calculator gives only one angle.', ar: 'احذف دورات كاملة لا الجزء العشري. 180° ± α: الاسم نفسه؛ 90° ± α و270° ± α: الجيب ↔ جيب التمام. والإشارة إشارة الربع. والآلة الحاسبة تعطي زاوية واحدة.' },
        right: { eu: 'Aurkako katetoa: sinua; ondokoa: kosinua. Altuera kanpoan erortzen bada, zatiak kendu egiten dira eta 180° ken angelua erabiltzen da.', es: 'Cateto opuesto: seno; contiguo: coseno. Si la altura cae fuera, los trozos se restan y se usa 180° menos el ángulo.', en: 'Opposite leg: sine; adjacent leg: cosine. If the height falls outside, the pieces are subtracted and you use 180° minus the angle.', ar: 'الضلع المقابل: الجيب؛ والمجاور: جيب التمام. وإذا وقع الارتفاع خارجًا طُرح الجزآن واستُعمل 180° ناقص الزاوية.' },
        sines: { eu: 'Alde bakoitza bere aurkako angeluarekin. Sinutik angelura: 180° − B ere begiratu; sin B > 1 bada, ez dago triangelurik. 2R diametroa da.', es: 'Cada lado con su ángulo opuesto. Del seno al ángulo: mira también 180° − B; si sen B > 1, no hay triángulo. 2R es el diámetro.', en: 'Each side with its opposite angle. From the sine to the angle: check 180° − B too; if sin B > 1, there is no triangle. 2R is the diameter.', ar: 'كل ضلع مع الزاوية المقابلة له. من الجيب إلى الزاوية: انظر أيضًا إلى 180° − B؛ وإذا كان sin B > 1 فلا مثلث. و2R هو القطر.' },
        cosines: { eu: 'a² = b² + c² − 2bc · cos A: kosinua azken gaian bakarrik. Angelu kamutsean kosinua negatiboa da. Hiru aldeekin, hasi angelu handienetik.', es: 'a² = b² + c² − 2bc · cos A: el coseno solo en el último término. En un ángulo obtuso el coseno es negativo. Con tres lados, empieza por el ángulo mayor.', en: 'a² = b² + c² − 2bc · cos A: the cosine only in the last term. For an obtuse angle the cosine is negative. With three sides, start with the largest angle.', ar: 'a² = b² + c² − 2bc · cos A: جيب التمام في الحد الأخير فقط. وفي الزاوية المنفرجة جيب التمام سالب. ومع ثلاثة أضلاع ابدأ بأكبر زاوية.' },
        applications: { eu: 'Heron: s perimetro-erdia da, ez perimetroa. Indarrak ez dira zenbakiak bezala batzen: diagonala, 180° − θ triangeluan.', es: 'Herón: s es el semiperímetro, no el perímetro. Las fuerzas no se suman como números: la diagonal, con 180° − θ en el triángulo.', en: 'Heron: s is the semi-perimeter, not the perimeter. Forces do not add like numbers: the diagonal, with 180° − θ in the triangle.', ar: 'هيرون: s نصف المحيط لا المحيط. والقوى لا تُجمع كالأعداد: القطر، مع 180° − θ في المثلث.' }
    }
}

export function TriangeluakBatx1zIntroPage() {
    return <UnitPage unit={triangeluakBatx1zUnit} />
}

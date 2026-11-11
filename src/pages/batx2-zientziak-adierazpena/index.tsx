import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bach2SketchChallenges, bach2SketchDiagnostic, bach2SketchExerciseBank, bach2SketchPractice } from './content'
import { Bach2SketchHeroArt } from './figures'
import { Bach2SketchGames } from './games'
import { BACH2_SKETCH_GAME_RECORDS_KEY, bach2SketchGameProgressIds } from './games/info'
import { Bach2SketchLaboratory } from './lab'
import { bach2SketchLabChallengeIds, bach2SketchLabToolForTopic, bach2SketchLabTools } from './lab/labTools'
import { bach2SketchStages, bach2SketchTopics } from './lessons'

const adierazpenaBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-adierazpena-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Funtzioen adierazpen grafikoa', es: 'Representación de funciones', en: 'Curve sketching', ar: 'التمثيل البياني للدوال' },
    documentTitle: { eu: 'Funtzioen adierazpen grafikoa · Batxilergoa 2', es: 'Representación de funciones · 2.º Bachillerato', en: 'Curve sketching · 2nd Bachillerato', ar: 'التمثيل البياني للدوال · البكالوريا الثانية' },
    tagline: {
        eu: '1. mailako gidoiaren eta asintoten errepaso laburra, deribatu aurreko azterketa sakonago (simetriak, periodoa, asintotekiko posizioa eta izate-eremuaren ertzak), funtzio esponentzialak, logaritmikoak, erroak dituztenak, trigonometrikoak eta zatika definitutakoak, balio absolutua, eta grafikoak alderantziz: f′ grafikotik f grafikora eta datuetatik kurbara.',
        es: 'Un repaso corto del guion y las asíntotas de 1.º, el estudio previo a fondo (simetrías, periodo, posición respecto de las asíntotas y bordes del dominio), funciones exponenciales, logarítmicas, con raíces, trigonométricas y a trozos, el valor absoluto, y gráficas al revés: de la gráfica de f′ a la de f y de unos datos a la curva.',
        en: 'A short review of the plan and the asymptotes from 1st year, the study before differentiating in depth (symmetry, period, position relative to the asymptotes and edges of the domain), exponential, logarithmic, root, trigonometric and piecewise functions, absolute values, and graphs the other way round: from the graph of f′ to that of f and from data to a curve.',
        ar: 'مراجعة قصيرة لخطة الرسم والمقاربات من السنة الأولى، والدراسة المسبقة بعمق (التناظر والدور ووضع المنحنى بالنسبة إلى المقاربات وحواف المجال)، والدوال الأسية واللوغاريتمية وذات الجذور والمثلثية والمعرّفة على أجزاء، والقيمة المطلقة، والرسوم بالعكس: من رسم ⁦f′⁩ إلى رسم ⁦f⁩ ومن المعطيات إلى المنحنى.'
    },
    heroArt: <Bach2SketchHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, errepasotik grafikoak alderantziz irakurtzeraino', es: 'Cinco etapas, del repaso a leer gráficas al revés', en: 'Five stages, from the review to reading graphs the other way round', ar: 'خمس مراحل، من المراجعة إلى قراءة الرسوم بالعكس' },
    stages: bach2SketchStages,
    topics: bach2SketchTopics,
    diagnostic: bach2SketchDiagnostic,
    guidedPractice: bach2SketchPractice,
    exerciseBank: bach2SketchExerciseBank,
    challenges: bach2SketchChallenges,
    lab: {
        description: {
            eu: `${bach2SketchLabTools.length} tresna, erronkekin: kurba eta haren asintota, simetria eta periodoa, balio absolutuaren ispilua eta f′ grafikotik f grafikora, berriak; eta 1. mailako Aplikazioak unitateko muntatu grafikoa eta Funtzioak unitateko transformazioen tailerra.`,
            es: `${bach2SketchLabTools.length} herramientas con retos: la curva y su asíntota, simetría y periodo, el espejo del valor absoluto y de f′ a f, nuevas; y de 1.º, monta la gráfica (Aplicaciones) y el taller de transformaciones (Funciones).`,
            en: `${bach2SketchLabTools.length} tools with challenges: the curve and its asymptote, symmetry and period, the mirror of the absolute value and from f′ to f, new; and from 1st year, build the graph (Applications) and the transformation workshop (Functions).`,
            ar: `${bach2SketchLabTools.length} أدوات مع تحديات: المنحنى ومقاربه، والتناظر والدور، ومرآة القيمة المطلقة، ومن f′ إلى f، وهي جديدة؛ ومن السنة الأولى: ابنِ الرسم (التطبيقات) وورشة التحويلات (الدوال).`
        },
        progressIds: bach2SketchLabChallengeIds,
        toolForTopic: bach2SketchLabToolForTopic,
        render: (props) => <Bach2SketchLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zortzi joko: lasterketa, zein grafiko da?, irakurri deribatua, asintotak begi-bistan, adierazpenaren detektibea eta memoria, berriak; eta 1. mailako igo ala jaitsi (Aplikazioak) eta ehizatu asintotak (Limiteak).',
            es: 'Ocho juegos: carrera, ¿qué gráfica es?, lee la derivada, asíntotas a la vista, detective de la representación y memoria, nuevos; y de 1.º, sube o baja (Aplicaciones) y caza las asíntotas (Límites).',
            en: 'Eight games: race, which graph is it?, read the derivative, asymptotes in sight, curve-sketching detective and memory, new; and from 1st year, up or down (Applications) and hunt the asymptotes (Limits).',
            ar: 'ثماني ألعاب: السباق، وأي رسم هو؟، واقرأ المشتقة، والمقاربات في الأفق، ومخبر التمثيل البياني، والذاكرة، وهي جديدة؛ ومن السنة الأولى: تصعد أم تنزل (التطبيقات) واصطد المقاربات (النهايات).'
        },
        progressIds: bach2SketchGameProgressIds,
        recordsKey: BACH2_SKETCH_GAME_RECORDS_KEY,
        render: (props) => <Bach2SketchGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 0,25 edo 3/2.', es: 'Escribe un número: 5, −3, 0,25 o 3/2.', en: 'Write a number: 5, −3, 0.25 or 3/2.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 0.25 أو 3/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        review: { eu: 'Hasi izate-eremutik, ez deribatutik. Asintota bertikala izendatzailea zero den tokian dago (zenbakitzailea zero ez bada); horizontala edo zeiharra mailak alderatuz; zeiharra zatiketaren zatidura da.', es: 'Empieza por el dominio, no por la derivada. Hay asíntota vertical donde se anula el denominador (y el numerador no); horizontal u oblicua comparando grados; la oblicua es el cociente de la división.', en: 'Start with the domain, not the derivative. There is a vertical asymptote where the denominator is 0 (and the numerator is not); horizontal or oblique by comparing degrees; the oblique one is the quotient of the division.', ar: 'ابدأ بالمجال لا بالمشتقة. يوجد مقارب رأسي حيث ينعدم المقام (ولا ينعدم البسط)؛ والأفقي أو المائل بمقارنة الدرجات؛ والمائل هو خارج القسمة.' },
        study: { eu: 'Bikoitia: f(−x) = f(x), Y ardatzarekiko simetrikoa; bakoitia: f(−x) = −f(x), jatorriarekiko. f(x) − (mx + n) kenduraren zeinuak esaten du kurba gainetik ala azpitik doan; kurbak asintota horizontal edo zeihar bat ebaki dezake. Erro baten ertzean zuzen ukitzaile bertikala egon daiteke.', es: 'Par: f(−x) = f(x), simétrica respecto del eje Y; impar: f(−x) = −f(x), respecto del origen. El signo de f(x) − (mx + n) dice si la curva va por encima o por debajo; la curva sí puede cortar a una asíntota horizontal u oblicua. En el borde de una raíz puede haber tangente vertical.', en: 'Even: f(−x) = f(x), symmetric about the Y axis; odd: f(−x) = −f(x), about the origin. The sign of f(x) − (mx + n) says whether the curve runs above or below; a curve can cross a horizontal or oblique asymptote. At the edge of a root there may be a vertical tangent.', ar: 'زوجية: ⁦f(−x) = f(x)⁩ متناظرة بالنسبة إلى المحور ⁦Y⁩؛ فردية: ⁦f(−x) = −f(x)⁩ بالنسبة إلى الأصل. تدل إشارة ⁦f(x) − (mx + n)⁩ على أن المنحنى فوق المقارب أو تحته؛ ويمكن أن يقطع المنحنى مقاربًا أفقيًّا أو مائلًا. وعند حافة جذر قد يكون المماس رأسيًّا.' },
        explog: { eu: 'Esponentzialak edozein berretura irabazten du, eta berreturak logaritmoa. ln g(x) funtzioak g(x) > 0 eskatzen du: g → 0⁺ doan tokian asintota bertikala dago. e^g(x) beti da positiboa.', es: 'La exponencial gana a cualquier potencia, y la potencia gana al logaritmo. ln g(x) exige g(x) > 0: donde g → 0⁺ hay una asíntota vertical. e^g(x) es siempre positiva.', en: 'The exponential beats any power, and a power beats the logarithm. ln g(x) needs g(x) > 0: where g → 0⁺ there is a vertical asymptote. e^g(x) is always positive.', ar: 'تغلب الدالة الأسية أي قوة، وتغلب القوة اللوغاريتم. تشترط ⁦ln g(x)⁩ أن يكون ⁦g(x) > 0⁩: وحيث ⁦g → 0⁺⁩ يوجد مقارب رأسي. و⁦e^g(x)⁩ موجبة دائمًا.' },
        roots: { eu: '√(x²) = |x|: ezkerretik zeiharraren malda zeinuz aldatzen da. Funtzio trigonometriko bat periodo batean aztertzen da. Zatika definitutako funtzio batean, zati bakoitzak bere tartean bakarrik balio du; lotuneetan, begiratu altuerak eta maldak.', es: '√(x²) = |x|: por la izquierda la pendiente de la oblicua cambia de signo. Una trigonométrica se estudia en un periodo. En una función a trozos, cada trozo solo vale en su intervalo; en las uniones, mira las alturas y las pendientes.', en: '√(x²) = |x|: on the left the slope of the oblique asymptote changes sign. A trigonometric function is studied over one period. In a piecewise function, each piece only counts on its interval; at the joints, look at the heights and the slopes.', ar: '⁦√(x²) = |x|⁩: من اليسار يغيّر ميل المقارب المائل إشارته. تُدرس الدالة المثلثية في دور واحد. وفي الدالة المعرّفة على أجزاء لا يصح كل جزء إلا على فترته؛ وعند نقاط الالتقاء انظر إلى الارتفاعات والميول.' },
        reading: { eu: '|f(x)| funtzioak X ardatzaren azpikoa gora islatzen du; f(|x|) funtzioak x ≥ 0 duen zatia ezkerrera kopiatzen du. f′ grafikoan ez irakurri f: f′ > 0 den tokian f gorakorra da; f′ ardatza zeinua aldatuz ebakitzen duen tokian, f funtzioak mutur bat du; f′ deribatuak mutur bat duen tokian, f funtzioak inflexio bat du.', es: '|f(x)| refleja hacia arriba lo que está bajo el eje X; f(|x|) copia a la izquierda la parte con x ≥ 0. En la gráfica de f′ no leas f: donde f′ > 0, f crece; donde f′ corta el eje cambiando de signo, f tiene un extremo; donde f′ tiene un extremo, f tiene una inflexión.', en: '|f(x)| reflects upwards what is below the X axis; f(|x|) copies the part with x ≥ 0 to the left. On the graph of f′, do not read f: where f′ > 0, f increases; where f′ crosses the axis changing sign, f has an extremum; where f′ has an extremum, f has an inflection.', ar: 'تعكس ⁦|f(x)|⁩ ما تحت المحور ⁦X⁩ إلى الأعلى؛ وتنسخ ⁦f(|x|)⁩ الجزء الذي فيه ⁦x ≥ 0⁩ إلى اليسار. في رسم ⁦f′⁩ لا تقرأ ⁦f⁩: حيث ⁦f′ > 0⁩ تتزايد ⁦f⁩؛ وحيث يقطع ⁦f′⁩ المحور مغيّرًا إشارته تكون لـ ⁦f⁩ قيمة قصوى؛ وحيث تبلغ ⁦f′⁩ قيمة قصوى يكون لـ ⁦f⁩ انعطاف.' }
    }
}

export function AdierazpenaBatx2zIntroPage() {
    return <UnitPage unit={adierazpenaBatx2zUnit} />
}

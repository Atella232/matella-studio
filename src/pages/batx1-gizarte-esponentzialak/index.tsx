import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { socExpChallenges, socExpDiagnostic, socExpExerciseBank, socExpPractice } from './content'
import { SocExpHeroArt } from './figures'
import { SocExpGames } from './games'
import { SOC_EXP_GAME_RECORDS_KEY, socExpGameProgressIds } from './games/info'
import { SocExpLaboratory } from './lab'
import { socExpLabChallengeIds, socExpLabToolForTopic, socExpLabTools } from './lab/labTools'
import { socExpStages, socExpTopics } from './lessons'

const esponentzialakBatx1gUnit: UnitDefinition = {
    storagePrefix: 'matella-esponentzialak-batx1g',
    coursePath: '/matematika/batx1-gizarte',
    courseTitle: { eu: 'Batxilergoa 1 · Gizarte Zientziak', es: '1.º Bachillerato · Ciencias Sociales', en: '1st Bachillerato · Social Sciences', ar: 'البكالوريا الأولى · العلوم الاجتماعية' },
    title: { eu: 'Funtzio esponentzialak eta logaritmikoak', es: 'Funciones exponenciales y logarítmicas', en: 'Exponential and logarithmic functions', ar: 'الدوال الأسية واللوغاريتمية' },
    documentTitle: { eu: 'Funtzio esponentzialak eta logaritmikoak · Batxilergoa 1 · Gizarte Zientziak', es: 'Funciones exponenciales y logarítmicas · 1.º Bachillerato · Ciencias Sociales', en: 'Exponential and logarithmic functions · 1st Bachillerato · Social Sciences', ar: 'الدوال الأسية واللوغاريتمية · البكالوريا الأولى · العلوم الاجتماعية' },
    tagline: {
        eu: 'Grafikoen transformazioak, konposizioa eta alderantzizkoa, ehunekoetan hazi eta jaitsi, logaritmoak «noiz?» erantzuteko, eta bikoizte-denbora, kurba logistikoa eta eredu logaritmikoak.',
        es: 'Transformaciones de gráficas, composición e inversa, crecer y decrecer en porcentaje, logaritmos para responder «¿cuándo?», y tiempo de duplicación, curva logística y modelos logarítmicos.',
        en: 'Transformations of graphs, composition and the inverse, growing and falling by a percentage, logarithms to answer «when?», and doubling time, the logistic curve and logarithmic models.',
        ar: 'تحويلات الرسوم والتركيب والعكسية، والنمو والتناقص بالنسبة المئوية، واللوغاريتمات للإجابة عن «متى؟»، وزمن التضاعف والمنحنى اللوجستي والنماذج اللوغاريتمية.'
    },
    heroArt: <SocExpHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, transformazioetatik ereduetara', es: 'Cinco etapas, de las transformaciones a los modelos', en: 'Five stages, from transformations to models', ar: 'خمس مراحل، من التحويلات إلى النماذج' },
    stages: socExpStages,
    topics: socExpTopics,
    diagnostic: socExpDiagnostic,
    guidedPractice: socExpPractice,
    exerciseBank: socExpExerciseBank,
    challenges: socExpChallenges,
    lab: {
        description: {
            eu: `${socExpLabTools.length} tresna, erronkekin: zuzena ala esponentziala? eta S kurba, berriak; Zientzietako bi makina segidan eta y = x ispilua; eta 4. DBHko funtzio esponentziala, esponentziala mugitzen, hazkundea eta beherakuntza, logaritmoen eskailera eta logaritmoa mugitzen.`,
            es: `${socExpLabTools.length} herramientas con retos: ¿recta o exponencial? y la curva en S, nuevas; de Ciencias, dos máquinas en cadena y el espejo y = x; y de 4.º ESO, la función exponencial, mueve la exponencial, crecimiento y decrecimiento, la escalera de los logaritmos y mueve el logaritmo.`,
            en: `${socExpLabTools.length} tools with challenges: line or exponential? and the S curve, new; from Sciences, two machines in a row and the mirror y = x; and from 4th ESO, the exponential function, move the exponential, growth and decay, the ladder of logarithms and move the logarithm.`,
            ar: `${socExpLabTools.length} أدوات مع تحديات: مستقيم أم أسية؟ والمنحنى على شكل S، وهما جديدتان؛ ومن العلوم: آلتان متتاليتان ومرآة y = x؛ ومن الصف الرابع: الدالة الأسية وحرّك الأسية والنمو والتناقص وسُلّم اللوغاريتمات وحرّك اللوغاريتم.`
        },
        progressIds: socExpLabChallengeIds,
        toolForTopic: socExpLabToolForTopic,
        render: (props) => <SocExpLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Hamar joko: lasterketa, lineala ala esponentziala?, deskontua, BEZa eta bidalketa, funtzioen detektibea eta memoria, berriak; Zientzietako non erortzen da puntua?, ordenatu makinak eta desegin makina; eta 4. DBHko noiz bikoizten da? eta kurben laserra.',
            es: 'Diez juegos: carrera, ¿lineal o exponencial?, descuento, IVA y envío, detective de funciones y memoria, nuevos; de Ciencias, ¿dónde cae el punto?, ordena las máquinas y deshaz la máquina; y de 4.º ESO, ¿cuándo se duplica? y láser de curvas.',
            en: 'Ten games: race, linear or exponential?, discount, VAT and delivery, functions detective and memory, new; from Sciences, where does the point land?, put the machines in order and undo the machine; and from 4th ESO, when does it double? and the curve laser.',
            ar: 'عشر ألعاب: السباق وخطية أم أسية؟ والخصم والضريبة والشحن ومخبر الدوال والذاكرة، وهي جديدة؛ ومن العلوم: أين تقع النقطة؟ ورتّب الآلات واعكس الآلة؛ ومن الصف الرابع: متى يتضاعف؟ وليزر المنحنيات.'
        },
        progressIds: socExpGameProgressIds,
        recordsKey: SOC_EXP_GAME_RECORDS_KEY,
        render: (props) => <SocExpGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Urte edo egun oso bat eskatzen bada, zenbaki osoa.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si se pide un año o un día entero, el número entero.', en: 'Write a number: 5, −3, 1.5 or 3/2. If a whole year or day is asked for, the whole number.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا طُلبت سنة أو يوم كامل فاكتب العدد الصحيح.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        transforms: { eu: 'f(x − a) eskuinera doa eta f(x + a) ezkerrera. −f(x) X ardatzean islatzen da; f(−x), Y ardatzean.', es: 'f(x − a) va a la derecha y f(x + a), a la izquierda. −f(x) se refleja en el eje X; f(−x), en el eje Y.', en: 'f(x − a) goes right and f(x + a) left. −f(x) is reflected in the x-axis; f(−x), in the y-axis.', ar: 'f(x − a) تذهب إلى اليمين وf(x + a) إلى اليسار. −f(x) تنعكس في محور X، وf(−x) في محور Y.' },
        composition: { eu: '(f ∘ g)(x) = f(g(x)): lehenik g. f⁻¹ ez da 1/f: askatu x eta trukatu letrak.', es: '(f ∘ g)(x) = f(g(x)): primero g. f⁻¹ no es 1/f: despeja x y cambia las letras.', en: '(f ∘ g)(x) = f(g(x)): g first. f⁻¹ is not 1/f: solve for x and swap the letters.', ar: '(f ∘ g)(x) = f(g(x)): أولًا g. وf⁻¹ ليست 1/f: اعزل x وبدّل الحرفين.' },
        exponential: { eu: '% r hazi: bider 1 + r. % r jaitsi: bider 1 − r, ez r.', es: 'Subir un r %: por 1 + r. Bajar un r %: por 1 − r, no por r.', en: 'Rising r %: times 1 + r. Falling r %: times 1 − r, not r.', ar: 'الزيادة r %: الضرب في 1 + r. والنقص r %: الضرب في 1 − r لا في r.' },
        logarithmic: { eu: 'log_a x berretzailea da. aᵗ = c bada, t = log c / log a, ez c / a.', es: 'log_a x es un exponente. Si aᵗ = c, t = log c / log a, no c / a.', en: 'log_a x is an exponent. If aᵗ = c, t = log c / log a, not c / a.', ar: 'log_a x أس. إذا aᵗ = c فإن t = log c / log a لا c / a.' },
        models: { eu: 'T urtean bikoizten bada, nT urtean bider 2ⁿ. Logistikoa M sabairantz hurbiltzen da.', es: 'Si se duplica en T años, en nT años se multiplica por 2ⁿ. La logística se acerca al techo M.', en: 'If it doubles in T years, in nT years it is multiplied by 2ⁿ. The logistic approaches the ceiling M.', ar: 'إذا تضاعف في T سنة فبعد nT سنة يُضرب في 2ⁿ. واللوجستية تقترب من السقف M.' }
    }
}

export function EsponentzialakBatx1gIntroPage() {
    return <UnitPage unit={esponentzialakBatx1gUnit} />
}

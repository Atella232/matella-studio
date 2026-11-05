import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bachFunctionsChallenges, bachFunctionsDiagnostic, bachFunctionsExerciseBank, bachFunctionsPractice } from './content'
import { BachFunctionsHeroArt } from './figures'
import { BachFunctionsGames } from './games'
import { BACH_FUNCTIONS_GAME_RECORDS_KEY, bachFunctionsGameProgressIds } from './games/info'
import { BachFunctionsLaboratory } from './lab'
import { bachFunctionsLabChallengeIds, bachFunctionsLabToolForTopic, bachFunctionsLabTools } from './lab/labTools'
import { bachFunctionsStages, bachFunctionsTopics } from './lessons'

const funtzioakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-funtzioak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Funtzio elementalak', es: 'Funciones elementales', en: 'Elementary functions', ar: 'الدوال الأساسية' },
    documentTitle: { eu: 'Funtzio elementalak · Batxilergoa 1', es: 'Funciones elementales · 1.º Bachillerato', en: 'Elementary functions · 1st Bachillerato', ar: 'الدوال الأساسية · البكالوريا الأولى' },
    tagline: {
        eu: 'Izate-eremua eta simetriak, grafikoen transformazioak, alderantzizko funtzioa eta arku-funtzioak, zatika definitutako funtzioak eta zati osoa, eta funtzioen konposizioa.',
        es: 'Dominio y simetrías, transformaciones de gráficas, función inversa y funciones arco, funciones a trozos y parte entera, y composición de funciones.',
        en: 'Domain and symmetry, transformations of graphs, inverse and arc functions, piecewise functions and the integer part, and composition of functions.',
        ar: 'المجال والتناظر، وتحويلات الرسوم، والدالة العكسية ودوال القوس، والدوال المعرّفة على أجزاء والجزء الصحيح، وتركيب الدوال.'
    },
    heroArt: <BachFunctionsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, izate-eremutik konposiziora', es: 'Cinco etapas, del dominio a la composición', en: 'Five stages, from the domain to composition', ar: 'خمس مراحل، من المجال إلى التركيب' },
    stages: bachFunctionsStages,
    topics: bachFunctionsTopics,
    diagnostic: bachFunctionsDiagnostic,
    guidedPractice: bachFunctionsPractice,
    exerciseBank: bachFunctionsExerciseBank,
    challenges: bachFunctionsChallenges,
    lab: {
        description: {
            eu: `${bachFunctionsLabTools.length} tresna, erronkekin: transformazioen tailerra, y = x ispilua, zati osoaren eskailera eta bi makina segidan, berriak; eta 4. DBHko izate-eremua eraikitzea, bikoitia ala bakoitia?, funtzio periodikoak, esponentziala eta logaritmoa mugitzen, bi zati lotzea eta balio absolutua tolestea.`,
            es: `${bachFunctionsLabTools.length} herramientas con retos: el taller de transformaciones, el espejo y = x, la escalera de la parte entera y dos máquinas en cadena, nuevas; y de 4.º ESO, construye el dominio, ¿par o impar?, funciones periódicas, mueve la exponencial y el logaritmo, une dos trozos y dobla el valor absoluto.`,
            en: `${bachFunctionsLabTools.length} tools with challenges: the transformation workshop, the mirror y = x, the integer part staircase and two machines in a row, new; and from 4th ESO, build the domain, even or odd?, periodic functions, move the exponential and the logarithm, join two pieces and fold the absolute value.`,
            ar: `${bachFunctionsLabTools.length} أداة مع تحديات: ورشة التحويلات ومرآة y = x ودرج الجزء الصحيح وآلتان متتاليتان، وهي جديدة؛ ومن الصف الرابع: ابنِ المجال وزوجية أم فردية؟ والدوال الدورية وحرّك الدالة الأسية واللوغاريتم وصِل جزأين واطوِ القيمة المطلقة.`
        },
        progressIds: bachFunctionsLabChallengeIds,
        toolForTopic: bachFunctionsLabToolForTopic,
        render: (props) => <BachFunctionsLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zortzi joko: lasterketa, non erortzen da puntua?, ordenatu makinak, desegin makina, funtzioen detektibea eta memoria, berriak; eta 4. DBHko margotu eremua eta kurben laserra.',
            es: 'Ocho juegos: carrera, ¿dónde cae el punto?, ordena las máquinas, deshaz la máquina, detective de funciones y memoria, nuevos; y de 4.º ESO, pinta el dominio y láser de curvas.',
            en: 'Eight games: race, where does the point land?, put the machines in order, undo the machine, functions detective and memory, new; and from 4th ESO, paint the domain and the curve laser.',
            ar: 'ثماني ألعاب: السباق وأين تقع النقطة؟ ورتّب الآلات واعكس الآلة ومخبر الدوال والذاكرة، وهي جديدة؛ ومن الصف الرابع: لوّن المجال وليزر المنحنيات.'
        },
        progressIds: bachFunctionsGameProgressIds,
        recordsKey: BACH_FUNCTIONS_GAME_RECORDS_KEY,
        render: (props) => <BachFunctionsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Puntu baten koordenatu bat eskatzen bada, hori bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si se pide una coordenada de un punto, solo esa.', en: 'Write a number: 5, −3, 1.5 or 3/2. If one coordinate of a point is asked for, only that one.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا طُلب أحد إحداثيي نقطة فاكتبه وحده.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        study: { eu: 'Idatzi baldintza guztiak: erroaren barrukoa ≥ 0, izendatzailea ≠ 0, logaritmoaren barrukoa > 0. Simetria aztertzeko, kalkulatu f(−x).', es: 'Apunta todas las condiciones: dentro de la raíz ≥ 0, denominador ≠ 0, dentro del logaritmo > 0. Para la simetría, calcula f(−x).', en: 'Write down every condition: inside the root ≥ 0, denominator ≠ 0, inside the logarithm > 0. For symmetry, work out f(−x).', ar: 'اكتب كل الشروط: ما تحت الجذر ≥ 0، والمقام ≠ 0، وما داخل اللوغاريتم > 0. وللتناظر احسب f(−x).' },
        transforms: { eu: 'f(x − a) eskuinera doa, eta f(x + a) ezkerrera. −f(x) X ardatzean islatzen da; f(−x), Y ardatzean. f(kx) estutu egiten da.', es: 'f(x − a) va a la derecha y f(x + a), a la izquierda. −f(x) se refleja en el eje X; f(−x), en el eje Y. f(kx) se comprime.', en: 'f(x − a) goes to the right and f(x + a) to the left. −f(x) is reflected in the x-axis; f(−x), in the y-axis. f(kx) is squeezed.', ar: 'f(x − a) تذهب إلى اليمين وf(x + a) إلى اليسار. −f(x) تنعكس في محور X، وf(−x) في محور Y. وf(kx) تتقلص.' },
        inverse: { eu: 'f⁻¹ ez da 1/f: askatu x eta trukatu letrak. Funtzio injektiboek bakarrik dute alderantzizkoa. Arku sinua −π/2 eta π/2 artean dago; arku kosinua, 0 eta π artean.', es: 'f⁻¹ no es 1/f: despeja x y cambia las letras. Solo tienen inversa las funciones inyectivas. El arco seno está entre −π/2 y π/2; el arco coseno, entre 0 y π.', en: 'f⁻¹ is not 1/f: solve for x and swap the letters. Only injective functions have an inverse. The arc sine lies between −π/2 and π/2; the arc cosine, between 0 and π.', ar: 'f⁻¹ ليست 1/f: اعزل x وبدّل الحرفين. ولا عكسية إلا للدوال المتباينة. قوس الجيب بين −π/2 وπ/2، وقوس جيب التمام بين 0 وπ.' },
        piecewise: { eu: 'x bakoitzak zati bakarra erabiltzen du. |f(x)| funtzioan, f negatiboa den lekuan aldatzen da zeinua. E(x) beti beherantz: E(−2,5) = −3.', es: 'Cada x usa un solo trozo. En |f(x)| se cambia el signo donde f es negativa. E(x) siempre hacia abajo: E(−2,5) = −3.', en: 'Each x uses a single piece. In |f(x)| the sign is changed where f is negative. E(x) always rounds down: E(−2.5) = −3.', ar: 'كل x تستعمل جزءًا واحدًا. في |f(x)| نغيّر الإشارة حيث f سالبة. E(x) دائمًا إلى الأسفل: E(−2.5) = −3.' },
        operations: { eu: '(f ∘ g)(x) = f(g(x)): lehenik g. f/g funtzioan, kendu g funtzioaren zeroak.', es: '(f ∘ g)(x) = f(g(x)): primero g. En f/g, quita los ceros de g.', en: '(f ∘ g)(x) = f(g(x)): g first. In f/g, remove the zeros of g.', ar: '(f ∘ g)(x) = f(g(x)): أولًا g. وفي f/g احذف أصفار g.' }
    }
}

export function FuntzioakBatx1zIntroPage() {
    return <UnitPage unit={funtzioakBatx1zUnit} />
}

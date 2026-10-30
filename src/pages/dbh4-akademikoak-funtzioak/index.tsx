import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readFunctionsAnswer } from './answers'
import { functionsAkChallenges, functionsAkDiagnostic, functionsAkExerciseBank, functionsAkPractice } from './content'
import { FunctionsAkHeroArt } from './figures'
import { FunctionsAkGames } from './games'
import { FUNCTIONS_AK_GAME_RECORDS_KEY, functionsAkGameProgressIds } from './games/info'
import { FunctionsAkLaboratory } from './lab'
import { functionsAkLabChallengeIds, functionsAkLabToolForTopic, functionsAkLabTools } from './lab/labTools'
import { functionsAkStages, functionsAkTopics } from './lessons'

const funtzioakUnit: UnitDefinition = {
    storagePrefix: 'matella-funtzioak-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', en: '4th ESO · Academic', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Funtzioak', es: 'Funciones', en: 'Functions', ar: 'الدوال' },
    documentTitle: { eu: 'Funtzioak · 4. DBH', es: 'Funciones · 4.º ESO', en: 'Functions · 4th ESO', ar: 'الدوال · الصف الرابع' },
    tagline: {
        eu: 'Irudiak eta aurreirudiak, izate-eremua eta ibiltartea, zatikien eta erroen izate-eremua, etenuneak, zatika definitutako funtzioak, ebaki-puntuak, zeinua, simetria, hazkundea, T.V.M. eta funtzio periodikoak.',
        es: 'Imágenes y antiimágenes, dominio y recorrido, el dominio de fracciones y raíces, discontinuidades, funciones definidas a trozos, puntos de corte, signo, simetría, crecimiento, T.V.M. y funciones periódicas.',
        en: 'Images and preimages, domain and range, the domain of fractions and roots, discontinuities, piecewise functions, intercepts, sign, symmetry, growth, ARC and periodic functions.',
        ar: 'الصور والأصول، والمجال والمدى، ومجال الكسور والجذور، والانقطاعات، والدوال المعرّفة على أجزاء، ونقاط التقاطع، والإشارة، والتناظر، والتزايد، ومعدل التغير المتوسط، والدوال الدورية.'
    },
    heroArt: <FunctionsAkHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, irudietatik periodora', es: 'Cinco etapas, de la imagen al periodo', en: 'Five stages, from the image to the period.', ar: 'خمس مراحل، من الصورة إلى الدور' },
    stages: functionsAkStages,
    topics: functionsAkTopics,
    diagnostic: functionsAkDiagnostic,
    guidedPractice: functionsAkPractice,
    exerciseBank: functionsAkExerciseBank,
    challenges: functionsAkChallenges,
    lab: {
        description: {
            eu: `${functionsAkLabTools.length} tresna, erronkekin: funtzioa ala ez, taula eta formula, izate-eremua eta ibiltartea grafikoan, 1/P, √P eta 1/√P funtzioen izate-eremua zatiz zati, k-rekin lotutako bi zati, kubikoa bere erroetatik, bikoitia ala bakoitia, grafiko baten bidaia, T.V.M. eta funtzio periodikoak.`,
            es: `${functionsAkLabTools.length} herramientas con retos: función o no, tabla y fórmula, dominio y recorrido en una gráfica, el dominio de 1/P, √P y 1/√P trozo a trozo, dos trozos unidos con k, una cúbica desde sus raíces, par o impar, recorrer una gráfica, la T.V.M. y las funciones periódicas.`,
            en: `${functionsAkLabTools.length} tools with challenges: function or not, table and formula, domain and range on a graph, the domain of 1/P, √P and 1/√P piece by piece, two pieces joined with k, a cubic from its roots, even or odd, travel along a graph, the ARC and periodic functions.`,
            ar: `${functionsAkLabTools.length} أدوات مع تحديات: دالة أم لا، والجدول والصيغة، والمجال والمدى في الرسم، ومجال 1/P و√P و1/√P جزءًا جزءًا، وجزآن يصلهما k، ودالة تكعيبية من جذورها، وزوجية أم فردية، والتجوّل في رسم، ومعدل التغير المتوسط، والدوال الدورية.`
        },
        progressIds: functionsAkLabChallengeIds,
        toolForTopic: functionsAkLabToolForTopic,
        render: (props) => <FunctionsAkLaboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', en: 'Two games to train speed and accuracy: race and memory.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: functionsAkGameProgressIds,
        recordsKey: FUNCTIONS_AK_GAME_RECORDS_KEY,
        render: (props) => <FunctionsAkGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bakar bat: irudia, tartearen muturra, erroa, parametroa edo tasa. Adibidez 5, −3, 2,5 edo 4/3.', es: 'Escribe un solo número: la imagen, el extremo del intervalo, la raíz, el parámetro o la tasa. Por ejemplo 5, −3, 2,5 o 4/3.', en: 'Write a single number: the image, the endpoint of the interval, the root, the parameter or the rate. For example 5, −3, 2.5 or 4/3.', ar: 'اكتب عددًا واحدًا: الصورة أو طرف الفترة أو الجذر أو الوسيط أو المعدل. مثلًا 5 أو ⁦−3⁩ أو 2.5 أو 4/3.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readFunctionsAnswer,
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', en: 'E.g.: −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bakar bat, adibidez −3, 2,5 edo 4/3.', es: 'No entiendo esa respuesta. Escribe un solo número, por ejemplo −3, 2,5 o 4/3.', en: 'I don\'t understand that answer. Write a single number, for example −3, 2.5 or 4/3.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا واحدًا، مثل ⁦−3⁩ أو 2.5 أو 4/3.' }
    },
    errorByStage: {
        concept: { eu: 'Ordeztu beti parentesi artean: (−3)² = 9. Aurreirudiak: f(x) = b ekuazioa, eta begiratu soluzioek zentzua duten.', es: 'Sustituye siempre entre paréntesis: (−3)² = 9. Antiimágenes: la ecuación f(x) = b, y mira si las soluciones tienen sentido.', en: 'Always substitute using brackets: (−3)² = 9. Preimages: the equation f(x) = b, and check whether the solutions make sense.', ar: 'عوّض دائمًا بين قوسين: (−3)² = 9. الأصول: المعادلة f(x) = b، وتأكد من أن للحلول معنى.' },
        domain: { eu: 'Zatikia: izendatzailea ≠ 0. Erroa: errokizuna ≥ 0. Erroa izendatzailean: > 0, hertsia.', es: 'Fracción: denominador ≠ 0. Raíz: radicando ≥ 0. Raíz en el denominador: > 0, estricto.', en: 'Fraction: denominator ≠ 0. Root: radicand ≥ 0. Root in the denominator: > 0, strictly.', ar: 'الكسر: المقام ≠ 0. الجذر: ما تحته ≥ 0. الجذر في المقام: > 0 تمامًا.' },
        continuity: { eu: 'Zati bakoitza bere tartean. Lotunean, kalkulatu bi zatien balioa eta berdindu.', es: 'Cada trozo en su intervalo. En la unión, calcula el valor de los dos trozos e iguálalos.', en: 'Each piece in its interval. At the junction, calculate the value of both pieces and make them equal.', ar: 'كل جزء في فترته. عند نقطة الالتقاء احسب قيمة الجزأين وساوِ بينهما.' },
        features: { eu: 'Y ardatza: x = 0. X ardatza: y = 0 eta faktorizatu. Bakoitia: f(−x) = −f(x).', es: 'Eje Y: x = 0. Eje X: y = 0 y factoriza. Impar: f(−x) = −f(x).', en: 'y-axis: x = 0. x-axis: y = 0; factorise. Odd: f(−x) = −f(x).', ar: 'محور Y: x = 0. محور X: y = 0 ثم حلّل. الفردية: f(−x) = −f(x).' },
        change: { eu: 'T.V.M.: (f(b) − f(a)) / (b − a), ordena berean. Periodikoa: kendu periodoa eta erabili hondarra.', es: 'T.V.M.: (f(b) − f(a)) / (b − a), en el mismo orden. Periódica: quita el periodo y usa el resto.', en: 'ARC: (f(b) − f(a)) / (b − a), in the same order. Periodic: remove the period and use the remainder.', ar: 'المعدل: (f(b) − f(a)) / (b − a) بالترتيب نفسه. الدورية: اطرح الدور واستعمل الباقي.' }
    }
}

export function FuntzioakDbh4AkIntroPage() {
    return <UnitPage unit={funtzioakUnit} />
}

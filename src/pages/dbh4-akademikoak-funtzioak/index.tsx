import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readFunctionsAnswer } from './answers'
import { functionsAkChallenges, functionsAkDiagnostic, functionsAkExerciseBank, functionsAkPractice } from './content'
import { FunctionsAkHeroArt } from './figures'
import { functionsAkStages, functionsAkTopics } from './lessons'

const funtzioakUnit: UnitDefinition = {
    storagePrefix: 'matella-funtzioak-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Funtzioak', es: 'Funciones', ar: 'الدوال' },
    documentTitle: { eu: 'Funtzioak · 4. DBH', es: 'Funciones · 4.º ESO', ar: 'الدوال · الصف الرابع' },
    tagline: {
        eu: 'Irudiak eta aurreirudiak, izate-eremua eta ibiltartea, zatikien eta erroen izate-eremua, etenuneak, zatika definitutako funtzioak, ebaki-puntuak, zeinua, simetria, hazkundea, T.V.M. eta funtzio periodikoak.',
        es: 'Imágenes y antiimágenes, dominio y recorrido, el dominio de fracciones y raíces, discontinuidades, funciones definidas a trozos, puntos de corte, signo, simetría, crecimiento, T.V.M. y funciones periódicas.',
        ar: 'الصور والأصول، والمجال والمدى، ومجال الكسور والجذور، والانقطاعات، والدوال المعرّفة على أجزاء، ونقاط التقاطع، والإشارة، والتناظر، والتزايد، ومعدل التغير المتوسط، والدوال الدورية.'
    },
    heroArt: <FunctionsAkHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, irudietatik periodora', es: 'Cinco etapas, de la imagen al periodo', ar: 'خمس مراحل، من الصورة إلى الدور' },
    stages: functionsAkStages,
    topics: functionsAkTopics,
    diagnostic: functionsAkDiagnostic,
    guidedPractice: functionsAkPractice,
    exerciseBank: functionsAkExerciseBank,
    challenges: functionsAkChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bakar bat: irudia, tartearen muturra, erroa, parametroa edo tasa. Adibidez 5, −3, 2,5 edo 4/3.', es: 'Escribe un solo número: la imagen, el extremo del intervalo, la raíz, el parámetro o la tasa. Por ejemplo 5, −3, 2,5 o 4/3.', ar: 'اكتب عددًا واحدًا: الصورة أو طرف الفترة أو الجذر أو الوسيط أو المعدل. مثلًا 5 أو ⁦−3⁩ أو 2.5 أو 4/3.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readFunctionsAnswer,
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bakar bat, adibidez −3, 2,5 edo 4/3.', es: 'No entiendo esa respuesta. Escribe un solo número, por ejemplo −3, 2,5 o 4/3.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا واحدًا، مثل ⁦−3⁩ أو 2.5 أو 4/3.' }
    },
    errorByStage: {
        concept: { eu: 'Ordeztu beti parentesi artean: (−3)² = 9. Aurreirudiak: f(x) = b ekuazioa, eta begiratu soluzioek zentzua duten.', es: 'Sustituye siempre entre paréntesis: (−3)² = 9. Antiimágenes: la ecuación f(x) = b, y mira si las soluciones tienen sentido.', ar: 'عوّض دائمًا بين قوسين: (−3)² = 9. الأصول: المعادلة f(x) = b، وتأكد من أن للحلول معنى.' },
        domain: { eu: 'Zatikia: izendatzailea ≠ 0. Erroa: errokizuna ≥ 0. Erroa izendatzailean: > 0, hertsia.', es: 'Fracción: denominador ≠ 0. Raíz: radicando ≥ 0. Raíz en el denominador: > 0, estricto.', ar: 'الكسر: المقام ≠ 0. الجذر: ما تحته ≥ 0. الجذر في المقام: > 0 تمامًا.' },
        continuity: { eu: 'Zati bakoitza bere tartean. Lotunean, kalkulatu bi zatien balioa eta berdindu.', es: 'Cada trozo en su intervalo. En la unión, calcula el valor de los dos trozos e iguálalos.', ar: 'كل جزء في فترته. عند نقطة الالتقاء احسب قيمة الجزأين وساوِ بينهما.' },
        features: { eu: 'Y ardatza: x = 0. X ardatza: y = 0 eta faktorizatu. Bakoitia: f(−x) = −f(x).', es: 'Eje Y: x = 0. Eje X: y = 0 y factoriza. Impar: f(−x) = −f(x).', ar: 'محور Y: x = 0. محور X: y = 0 ثم حلّل. الفردية: f(−x) = −f(x).' },
        change: { eu: 'T.V.M.: (f(b) − f(a)) / (b − a), ordena berean. Periodikoa: kendu periodoa eta erabili hondarra.', es: 'T.V.M.: (f(b) − f(a)) / (b − a), en el mismo orden. Periódica: quita el periodo y usa el resto.', ar: 'المعدل: (f(b) − f(a)) / (b − a) بالترتيب نفسه. الدورية: اطرح الدور واستعمل الباقي.' }
    }
}

export function FuntzioakDbh4AkIntroPage() {
    return <UnitPage unit={funtzioakUnit} />
}

import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readFunctionsAnswer } from '../dbh4-akademikoak-funtzioak/answers'
import { polynomialAkChallenges, polynomialAkDiagnostic, polynomialAkExerciseBank, polynomialAkPractice } from './content'
import { PolynomialAkHeroArt } from './figures'
import { PolynomialAkLaboratory } from './lab'
import { polynomialAkLabChallengeIds, polynomialAkLabToolForTopic, polynomialAkLabTools } from './lab/labTools'
import { polynomialAkStages, polynomialAkTopics } from './lessons'

const polinomikoakUnit: UnitDefinition = {
    storagePrefix: 'matella-polinomikoak-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Funtzio polinomikoak eta arrazionalak', es: 'Funciones polinómicas y racionales', ar: 'الدوال كثيرة الحدود والكسرية' },
    documentTitle: { eu: 'Funtzio polinomikoak · 4. DBH', es: 'Funciones polinómicas · 4.º ESO', ar: 'الدوال كثيرة الحدود · الصف الرابع' },
    tagline: {
        eu: 'Zuzenak eta haien malda eta ekuazioa, parabolak, erpina eta ebaki-puntuak, lekualdaketak, zuzen eta parabola baten ebakidurak, balio absolutua, alderantzizko proportzionaltasuna eta hiperbolak bere asintotekin.',
        es: 'Rectas con su pendiente y su ecuación, parábolas, vértice y puntos de corte, traslaciones, cortes de recta y parábola, valor absoluto, proporcionalidad inversa e hipérbolas con sus asíntotas.',
        ar: 'المستقيمات وميلها ومعادلتها، والقطوع المكافئة ورأسها ونقاط تقاطعها، والانسحابات، وتقاطع مستقيم وقطع مكافئ، والقيمة المطلقة، والتناسب العكسي، والقطوع الزائدة ومقارباتها.'
    },
    heroArt: <PolynomialAkHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, zuzenetik hiperbolara', es: 'Cinco etapas, de la recta a la hipérbola', ar: 'خمس مراحل، من المستقيم إلى القطع الزائد' },
    stages: polynomialAkStages,
    topics: polynomialAkTopics,
    diagnostic: polynomialAkDiagnostic,
    guidedPractice: polynomialAkPractice,
    exerciseBank: polynomialAkExerciseBank,
    challenges: polynomialAkChallenges,
    lab: {
        description: {
            eu: `${polynomialAkLabTools.length} tresna, erronkekin: zuzena eta haren malda, puntu bat eta malda bat, parabola eta haren erpina, ebaki-puntuak, parabola bat bere erroetatik, zuzen bat parabolaren aurka, balio absolutua tolestuta, hiperbola eta asintotak, eta (ax + b) / (x + d) funtzioa.`,
            es: `${polynomialAkLabTools.length} herramientas con retos: la recta y su pendiente, un punto y una pendiente, la parábola y su vértice, los puntos de corte, una parábola desde sus raíces, una recta contra una parábola, el valor absoluto doblado, la hipérbola y sus asíntotas, y la función (ax + b) / (x + d).`,
            ar: `${polynomialAkLabTools.length} أدوات مع تحديات: المستقيم وميله، ونقطة وميل، والقطع المكافئ ورأسه، ونقاط التقاطع، وقطع مكافئ من جذريه، ومستقيم مقابل قطع مكافئ، والقيمة المطلقة مطويّة، والقطع الزائد ومقارباه، والدالة ⁦(ax + b) / (x + d)⁩.`
        },
        progressIds: polynomialAkLabChallengeIds,
        toolForTopic: polynomialAkLabToolForTopic,
        render: (props) => <PolynomialAkLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bakar bat: malda, koordenatu bat, parametroa edo emaitza. Adibidez 5, −3, 3,5 edo −1/2.', es: 'Escribe un solo número: la pendiente, una coordenada, el parámetro o el resultado. Por ejemplo 5, −3, 3,5 o −1/2.', ar: 'اكتب عددًا واحدًا: الميل أو إحداثيًا أو الوسيط أو النتيجة. مثلًا 5 أو ⁦−3⁩ أو 3.5 أو ⁦−1/2⁩.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readFunctionsAnswer,
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bakar bat, adibidez −3, 3,5 edo −1/2.', es: 'No entiendo esa respuesta. Escribe un solo número, por ejemplo −3, 3,5 o −1/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا واحدًا، مثل ⁦−3⁩ أو 3.5 أو ⁦−1/2⁩.' }
    },
    errorByStage: {
        lines: { eu: 'Malda: (y₂ − y₁) / (x₂ − x₁), ordena berean. Gero y − y₀ = m(x − x₀) eta askatu y.', es: 'Pendiente: (y₂ − y₁) / (x₂ − x₁), en el mismo orden. Luego y − y₀ = m(x − x₀) y despeja y.', ar: 'الميل: (y₂ − y₁) / (x₂ − x₁) بالترتيب نفسه. ثم y − y₀ = m(x − x₀) واعزل y.' },
        parabolas: { eu: 'Erpina: x = −b / 2a, eta gero haren irudia. Ebaki-puntuak: Δ = b² − 4ac.', es: 'Vértice: x = −b / 2a y luego su imagen. Cortes: Δ = b² − 4ac.', ar: 'الرأس: x = −b / 2a ثم صورته. التقاطعات: Δ = b² − 4ac.' },
        shifts: { eu: 'a(x − p)² + q: erpina (p, q), p zeinua aldatuta. Ebakidurak: berdindu bi adierazpenak.', es: 'a(x − p)² + q: vértice (p, q), p con el signo cambiado. Cortes: iguala las dos expresiones.', ar: 'a(x − p)² + q: الرأس (p, q) وp بإشارة معكوسة. التقاطعات: ساوِ بين العبارتين.' },
        absolute: { eu: 'Balio absolutua ez da inoiz negatiboa. |A| = b: A = b edo A = −b.', es: 'El valor absoluto nunca es negativo. |A| = b: A = b o A = −b.', ar: 'القيمة المطلقة ليست سالبة أبدًا. |A| = b: A = b أو A = −b.' },
        rational: { eu: 'k = x · y. Asintotak: izendatzailea 0 (bertikala) eta x-en koefizienteen zatidura (horizontala).', es: 'k = x · y. Asíntotas: denominador 0 (vertical) y cociente de los coeficientes de x (horizontal).', ar: 'k = x · y. المقاربان: المقام 0 (رأسي) وناتج قسمة معاملي x (أفقي).' }
    }
}

export function PolinomikoakDbh4AkIntroPage() {
    return <UnitPage unit={polinomikoakUnit} />
}

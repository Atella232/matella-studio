import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bachRealsChallenges, bachRealsDiagnostic, bachRealsExerciseBank, bachRealsPractice } from './content'
import { BachRealsHeroArt } from './figures'
import { BachRealsGames } from './games'
import { BACH_REALS_GAME_RECORDS_KEY, bachRealsGameProgressIds } from './games/info'
import { BachRealsLaboratory } from './lab'
import { bachRealsLabChallengeIds, bachRealsLabToolForTopic, bachRealsLabTools } from './lab/labTools'
import { bachRealsStages, bachRealsTopics } from './lessons'

const errealakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-errealak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Zenbaki errealak', es: 'Números reales', en: 'Real numbers', ar: 'الأعداد الحقيقية' },
    documentTitle: { eu: 'Zenbaki errealak · Batxilergoa 1', es: 'Números reales · 1.º Bachillerato', en: 'Real numbers · 1st Bachillerato', ar: 'الأعداد الحقيقية · البكالوريا الأولى' },
    tagline: {
        eu: 'Multzoak eta irrazionalak, tarteak, balio absolutua eta inguruneak, hurbilketak eta erroreak, erradikalak eta logaritmoak, eta Newtonen binomioa.',
        es: 'Conjuntos e irracionales, intervalos, valor absoluto y entornos, aproximaciones y errores, radicales y logaritmos, y el binomio de Newton.',
        en: 'Sets and irrational numbers, intervals, absolute value and neighbourhoods, approximations and errors, radicals and logarithms, and the binomial theorem.',
        ar: 'المجموعات والأعداد غير النسبية، والفترات، والقيمة المطلقة والجوارات، والتقريب والأخطاء، والجذور واللوغاريتمات، وذات الحدين لنيوتن.'
    },
    heroArt: <BachRealsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, multzoetatik Newtonen binomiora', es: 'Cinco etapas, de los conjuntos al binomio de Newton', en: 'Five stages, from sets to the binomial theorem', ar: 'خمس مراحل، من المجموعات إلى ذات الحدين' },
    stages: bachRealsStages,
    topics: bachRealsTopics,
    diagnostic: bachRealsDiagnostic,
    guidedPractice: bachRealsPractice,
    exerciseBank: bachRealsExerciseBank,
    challenges: bachRealsChallenges,
    lab: {
        description: {
            eu: `${bachRealsLabTools.length} tresna, erronkekin: distantzia zuzenean, kalkulu-erregela eta errorearen banda, berriak; eta 4. DBHko Pitagorasen eraikitzailea, tarteak, biribiltzea, faktoreak ateratzea, indize komuna, konjokatua, oinarri-aldaketa eta Tartaglia.`,
            es: `${bachRealsLabTools.length} herramientas con retos: la distancia en la recta, la regla de cálculo y la banda del error, nuevas; y de 4.º ESO, el constructor de Pitágoras, los intervalos, el redondeo, sacar factores, el índice común, el conjugado, el cambio de base y Tartaglia.`,
            en: `${bachRealsLabTools.length} tools with challenges: distance on the line, the slide rule and the error band, new; and from 4th ESO, the Pythagoras builder, intervals, rounding, taking factors out, the common index, the conjugate, change of base and Tartaglia.`,
            ar: `${bachRealsLabTools.length} أداة مع تحديات: المسافة على المستقيم ومسطرة الحساب وشريط الخطأ، وهي جديدة؛ ومن الصف الرابع: باني فيثاغورس والفترات والتدوير وإخراج العوامل والدليل المشترك والمرافق وتغيير الأساس ومثلث تارتاليا.`
        },
        progressIds: bachRealsLabChallengeIds,
        toolForTopic: bachRealsLabToolForTopic,
        render: (props) => <BachRealsLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Bederatzi joko: lasterketa, ingurunea jomugan, koefiziente ezkutua, errealen detektibea eta memoria, berriak; eta 4. DBHko zuzenean kokatu, tartea eraiki, sinplifikatu errokizuna eta aurkitu berretzailea.',
            es: 'Nueve juegos: carrera, entorno al blanco, el coeficiente escondido, detective de los reales y memoria, nuevos; y de 4.º ESO, sitúa en la recta, construye el intervalo, simplifica el radical y encuentra el exponente.',
            en: 'Nine games: race, neighbourhood on target, the hidden coefficient, real numbers detective and memory, new; and from 4th ESO, place on the line, build the interval, simplify the radical and find the exponent.',
            ar: 'تسع ألعاب: السباق والجوار في الهدف والمعامل المخفي ومخبر الأعداد الحقيقية والذاكرة، وهي جديدة؛ ومن الصف الرابع: ضع على المستقيم وابنِ الفترة وبسّط الجذر وأوجد الأس.'
        },
        progressIds: bachRealsGameProgressIds,
        recordsKey: BACH_REALS_GAME_RECORDS_KEY,
        render: (props) => <BachRealsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Emaitza tarte, multzo edo erradikal bat bada, eskatzen den zenbakia bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si el resultado es un intervalo, un conjunto o un radical, solo el número que se pide.', en: 'Write a number: 5, −3, 1.5 or 3/2. If the result is an interval, a set or a radical, only the number asked for.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا كانت النتيجة فترة أو مجموعة أو جذرًا فاكتب العدد المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        reals: { eu: '∪: batean edo bestean; ∩: bietan. Arrazional bat zatiki bat da; √2, π eta φ ez. √n: katetoen karratuek n batu behar dute.', es: '∪: en uno o en otro; ∩: en los dos. Un racional es una fracción; √2, π y φ no. √n: los catetos al cuadrado deben sumar n.', en: '∪: in one or the other; ∩: in both. A rational number is a fraction; √2, π and φ are not. √n: the squared legs must add up to n.', ar: '∪: في إحداهما أو الأخرى، ∩: في الاثنتين. العدد النسبي كسر، أما √2 وπ وφ فلا. √n: يجب أن يكون مجموع مربعي الضلعين n.' },
        absolute: { eu: 'Parentesia: muturra kanpoan; kortxetea: barruan; ±∞ ondoan, parentesia. |x − a| < r: a − r < x < a + r, bi aldeak.', es: 'Paréntesis: el extremo fuera; corchete: dentro; junto a ±∞, paréntesis. |x − a| < r: a − r < x < a + r, los dos lados.', en: 'Round bracket: endpoint out; square bracket: in; next to ±∞, round bracket. |x − a| < r: a − r < x < a + r, both sides.', ar: 'القوس: الطرف خارج، والقوس المعقوف: داخل، وبجانب ±∞ قوس. |x − a| < r: ‏a − r < x < a + r، الجانبان معًا.' },
        errors: { eu: 'Ezkerreko zeroak ez dira zifra esanguratsuak. Biribiltzean, errorea < azken zifraren unitate erdia. Errore erlatiboa = errorea : neurria.', es: 'Los ceros de la izquierda no son cifras significativas. Al redondear, error < media unidad de la última cifra. Error relativo = error ÷ medida.', en: 'Zeros on the left are not significant figures. When rounding, error < half a unit of the last figure. Relative error = error ÷ measurement.', ar: 'الأصفار على اليسار ليست أرقامًا معنوية. عند التدوير الخطأ < نصف وحدة الرقم الأخير. الخطأ النسبي = الخطأ ÷ القياس.' },
        radicals: { eu: 'Antzekoak bakarrik batzen dira. Indize desberdinak: indize komuna. a ± √b: konjokatua. log(ab) = log a + log b, baina log(a + b) ez.', es: 'Solo se suman los semejantes. Índices distintos: índice común. a ± √b: el conjugado. log(ab) = log a + log b, pero log(a + b) no.', en: 'Only like radicals are added. Different indexes: common index. a ± √b: the conjugate. log(ab) = log a + log b, but not log(a + b).', ar: 'لا تُجمع إلا المتشابهة. أدلة مختلفة: دليل مشترك. a ± √b: المرافق. log(ab) = log a + log b، أما log(a + b) فلا.' },
        'newton-stage': { eu: 'C(n, k) = n! : (k!·(n − k)!). (a + b)ⁿ: a jaisten da, b igotzen; k + 1 gaian, bⁿ ez baizik bᵏ.', es: 'C(n, k) = n! ÷ (k!·(n − k)!). (a + b)ⁿ: a baja, b sube; en el término k + 1 va bᵏ.', en: 'C(n, k) = n! ÷ (k!·(n − k)!). (a + b)ⁿ: a goes down, b goes up; term k + 1 has bᵏ.', ar: 'C(n, k) = n! ÷ (k!·(n − k)!). (a + b)ⁿ: ‏a ينقص وb يزيد، والحد ذو الرتبة k + 1 فيه bᵏ.' }
    }
}

export function ErrealakBatx1zIntroPage() {
    return <UnitPage unit={errealakBatx1zUnit} />
}

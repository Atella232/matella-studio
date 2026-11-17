import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { gizRealsChallenges, gizRealsDiagnostic, gizRealsExerciseBank, gizRealsPractice } from './content'
import { GizRealsHeroArt } from './figures'
import { gizRealsStages, gizRealsTopics } from './lessons'

const errealakBatx1gUnit: UnitDefinition = {
    storagePrefix: 'matella-errealak-batx1g',
    coursePath: '/matematika/batx1-gizarte',
    courseTitle: { eu: 'Batxilergoa 1 · Gizarte Zientziak', es: '1.º Bachillerato · Ciencias Sociales', en: '1st Bachillerato · Social Sciences', ar: 'البكالوريا الأولى · العلوم الاجتماعية' },
    title: { eu: 'Zenbaki errealak', es: 'Números reales', en: 'Real numbers', ar: 'الأعداد الحقيقية' },
    documentTitle: { eu: 'Zenbaki errealak · Batxilergoa 1 · Gizarte Zientziak', es: 'Números reales · 1.º Bachillerato · Ciencias Sociales', en: 'Real numbers · 1st Bachillerato · Social Sciences', ar: 'الأعداد الحقيقية · البكالوريا الأولى · العلوم الاجتماعية' },
    tagline: {
        eu: 'Zenbaki-multzoak eta haien hizkuntza, zuzen erreala eta balio absolutua, erroak eta logaritmoak, eta ekonomiako zifra handiak idazkera zientifikoan, haien erroreekin.',
        es: 'Los conjuntos de números y su lenguaje, la recta real y el valor absoluto, raíces y logaritmos, y las grandes cifras de la economía en notación científica, con sus errores.',
        en: 'Sets of numbers and their language, the real line and absolute value, roots and logarithms, and the big figures of the economy in scientific notation, with their errors.',
        ar: 'مجموعات الأعداد ولغتها، والمستقيم الحقيقي والقيمة المطلقة، والجذور واللوغاريتمات، وأرقام الاقتصاد الكبيرة بالترميز العلمي مع أخطائها.'
    },
    heroArt: <GizRealsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, multzoetatik idazkera zientifikora', es: 'Cinco etapas, de los conjuntos a la notación científica', en: 'Five stages, from sets to scientific notation', ar: 'خمس مراحل، من المجموعات إلى الترميز العلمي' },
    stages: gizRealsStages,
    topics: gizRealsTopics,
    diagnostic: gizRealsDiagnostic,
    guidedPractice: gizRealsPractice,
    exerciseBank: gizRealsExerciseBank,
    challenges: gizRealsChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Emaitza tarte, multzo edo erradikal bat bada, eskatzen den zenbakia bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si el resultado es un intervalo, un conjunto o un radical, solo el número que se pide.', en: 'Write a number: 5, −3, 1.5 or 3/2. If the result is an interval, a set or a radical, only the number asked for.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا كانت النتيجة فترة أو مجموعة أو جذرًا فاكتب العدد المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        numbers: { eu: 'Lehenik sinplifikatu: √36 = 6 arrunta da. Arrazional bat zatiki bat da; √7 eta π ez. Negatibo baten erro karratua ez da erreala. <: muturra kanpoan; ≤: barruan.', es: 'Simplifica primero: √36 = 6 es natural. Un racional es una fracción; √7 y π no. La raíz cuadrada de un negativo no es real. <: el extremo fuera; ≤: dentro.', en: 'Simplify first: √36 = 6 is natural. A rational number is a fraction; √7 and π are not. The square root of a negative number is not real. <: endpoint out; ≤: in.', ar: 'بسّط أولًا: √36 = 6 عدد طبيعي. العدد النسبي كسر، أما √7 وπ فلا. الجذر التربيعي لعدد سالب ليس حقيقيًا. <: الطرف خارج، ≤: داخل.' },
        line: { eu: 'Parentesia: muturra kanpoan; kortxetea: barruan; ±∞ ondoan, parentesia. |x − a| < r: a − r < x < a + r, bi aldeak.', es: 'Paréntesis: el extremo fuera; corchete: dentro; junto a ±∞, paréntesis. |x − a| < r: a − r < x < a + r, los dos lados.', en: 'Round bracket: endpoint out; square bracket: in; next to ±∞, round bracket. |x − a| < r: a − r < x < a + r, both sides.', ar: 'القوس: الطرف خارج، والقوس المعقوف: داخل، وبجانب ±∞ قوس. |x − a| < r: ‏a − r < x < a + r، الجانبان معًا.' },
        radicals: { eu: 'ⁿ√(aᵐ) = a^(m/n): indizea izendatzailean. Antzekoak bakarrik batzen dira: √2 + √3 ez da √5. a ± √b izendatzailean: konjokatua.', es: 'ⁿ√(aᵐ) = a^(m/n): el índice al denominador. Solo se suman los semejantes: √2 + √3 no es √5. a ± √b en el denominador: el conjugado.', en: 'ⁿ√(aᵐ) = a^(m/n): the index in the denominator. Only like radicals add: √2 + √3 is not √5. a ± √b in the denominator: the conjugate.', ar: 'ⁿ√(aᵐ) = a^(m/n): الدليل في المقام. لا تُجمع إلا الجذور المتشابهة: √2 + √3 ليس √5. a ± √b في المقام: المرافق.' },
        logs: { eu: 'log(ab) = log a + log b, baina log(a + b) ez. Zati osoa: oinarriaren berreturak bilatu; 10 oinarrian, zifra kopurua ken bat. 0 eta 1 arteko zenbakien logaritmoa negatiboa da.', es: 'log(ab) = log a + log b, pero log(a + b) no. Parte entera: busca las potencias de la base; en base 10, cifras menos uno. Los números entre 0 y 1 tienen logaritmo negativo.', en: 'log(ab) = log a + log b, but not log(a + b). Whole-number part: find the powers of the base; in base 10, digits minus one. Numbers between 0 and 1 have a negative logarithm.', ar: 'log(ab) = log a + log b، أما log(a + b) فلا. الجزء الصحيح: ابحث عن قوى الأساس، وفي الأساس 10 عدد الأرقام ناقص واحد. لوغاريتم الأعداد بين 0 و1 سالب.' },
        errors: { eu: 'Ezkerreko zeroak ez dira zifra esanguratsuak. Errore erlatiboa = errorea : balioa. Idazkera zientifikoan, mantisa 1 eta 10 artean; koma ezkerrera, berretzailea gora.', es: 'Los ceros de la izquierda no son cifras significativas. Error relativo = error ÷ valor. En notación científica, mantisa entre 1 y 10; coma a la izquierda, exponente arriba.', en: 'Zeros on the left are not significant figures. Relative error = error ÷ value. In scientific notation, mantissa between 1 and 10; point to the left, exponent up.', ar: 'الأصفار على اليسار ليست أرقامًا معنوية. الخطأ النسبي = الخطأ ÷ القيمة. في الترميز العلمي الجزء العشري بين 1 و10، والفاصلة إلى اليسار تعني زيادة الأس.' }
    }
}

export function ErrealakBatx1gIntroPage() {
    return <UnitPage unit={errealakBatx1gUnit} />
}

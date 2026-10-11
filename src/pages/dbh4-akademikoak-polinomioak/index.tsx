import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { polynomialsFractionsChallenges, polynomialsFractionsDiagnostic, polynomialsFractionsExerciseBank, polynomialsFractionsPractice } from './content'
import { PolynomialsFractionsHeroArt } from './figures'
import { PolynomialsFractionsLaboratory } from './lab'
import { polynomialsFractionsLabChallengeIds, polynomialsFractionsLabToolForTopic, polynomialsFractionsLabTools } from './lab/labTools'
import { polynomialsFractionsStages, polynomialsFractionsTopics } from './lessons'

const polinomioakUnit: UnitDefinition = {
    storagePrefix: 'matella-polinomioak-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Polinomioak eta zatiki aljebraikoak', es: 'Polinomios y fracciones algebraicas', ar: 'الحدوديات والكسور الجبرية' },
    documentTitle: { eu: 'Polinomioak eta zatiki aljebraikoak · 4. DBH', es: 'Polinomios y fracciones algebraicas · 4.º ESO', ar: 'الحدوديات والكسور الجبرية · الصف الرابع' },
    tagline: {
        eu: 'Eragiketak, identitate nabarmenak eta Tartagliaren triangelua, zatiketa eta Ruffini, hondarraren teorema, erroak eta faktorizazioa, eta zatiki aljebraikoak eta haien eragiketak.',
        es: 'Operaciones, igualdades notables y triángulo de Tartaglia, división y Ruffini, teorema del resto, raíces y factorización, y las fracciones algebraicas y sus operaciones.',
        ar: 'العمليات والمتطابقات الشهيرة ومثلث تارتاليا، والقسمة وروفيني، ومبرهنة الباقي، والجذور والتحليل، والكسور الجبرية وعملياتها.'
    },
    heroArt: <PolynomialsFractionsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, polinomioetatik zatiki aljebraikoetara', es: 'Cinco etapas, de los polinomios a las fracciones algebraicas', ar: 'خمس مراحل، من الحدوديات إلى الكسور الجبرية' },
    stages: polynomialsFractionsStages,
    topics: polynomialsFractionsTopics,
    diagnostic: polynomialsFractionsDiagnostic,
    guidedPractice: polynomialsFractionsPractice,
    exerciseBank: polynomialsFractionsExerciseBank,
    challenges: polynomialsFractionsChallenges,
    lab: {
        description: {
            eu: `${polynomialsFractionsLabTools.length} tresna, erronkekin: biderketaren azalera, identitateak, Tartagliaren triangelua, Ruffiniren taula, parametroa duen hondarra, erroen bila, ax² + bx + c faktorizatzea, z.k.h. eta m.k.t., zatikiaren balioa, faktoreak ezabatzea, izendatzaile komuna eta bi txorrota.`,
            es: `${polynomialsFractionsLabTools.length} herramientas con retos: el área del producto, las identidades, el triángulo de Tartaglia, la tabla de Ruffini, el resto con parámetro, la caza de raíces, factorizar ax² + bx + c, el m.c.d. y el m.c.m., el valor de una fracción, eliminar factores, el denominador común y dos grifos.`,
            ar: `${polynomialsFractionsLabTools.length} أداة مع تحديات: مساحة الجداء، والمتطابقات، ومثلث تارتاليا، وجدول روفيني، والباقي بوسيط، والبحث عن الجذور، وتحليل ax² + bx + c، والقاسم والمضاعف المشترك، وقيمة الكسر، وحذف العوامل، والمقام المشترك، وصنبوران.`
        },
        progressIds: polynomialsFractionsLabChallengeIds,
        toolForTopic: polynomialsFractionsLabToolForTopic,
        render: (props) => <PolynomialsFractionsLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Emaitza polinomio edo zatiki bat bada, eskatzen den zenbakia bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si el resultado es un polinomio o una fracción, solo el número que se pide.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا كانت النتيجة حدودية أو كسرًا فاكتب العدد المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −4', es: 'Ej.: −4', ar: 'مثال: ⁦−4⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        operations: { eu: 'Biderkatzean, gai bakoitza gai guztiez. (a ± b)² = a² ± 2ab + b²: ez ahaztu 2ab. Tartaglia: n. errenkada.', es: 'Al multiplicar, cada término por todos. (a ± b)² = a² ± 2ab + b²: no olvides 2ab. Tartaglia: la fila n.', ar: 'في الضرب كل حد في كل الحدود. (a ± b)² = a² ± 2ab + b²: لا تنسَ 2ab. تارتاليا: الصف n.' },
        division: { eu: 'Utzi 0 falta diren gaietan. x + 3 bada, a = −3. Hondarra = P(a).', es: 'Deja un 0 en los términos que faltan. Si es x + 3, a = −3. Resto = P(a).', ar: 'ضع 0 مكان الحدود الناقصة. إذا كان x + 3 فإن a = −3. الباقي = P(a).' },
        factor: { eu: 'Erro osoak: gai askearen zatitzaileak. Ordena: faktore komuna, identitateak, Ruffini, 2. mailakoa. Ez ahaztu koefiziente nagusia.', es: 'Raíces enteras: divisores del término independiente. Orden: factor común, identidades, Ruffini, 2.º grado. No olvides el coeficiente principal.', ar: 'الجذور الصحيحة: قواسم الحد الثابت. الترتيب: العامل المشترك، المتطابقات، روفيني، الدرجة الثانية. لا تنسَ المعامل الرئيسي.' },
        fractions: { eu: 'Faktorizatu eta ezabatu faktoreak, inoiz ez batugaiak. Izendatzailea 0: ez dago.', es: 'Factoriza y elimina factores, nunca sumandos. Denominador 0: no existe.', ar: 'حلّل واحذف العوامل، لا الحدود المجموعة. المقام 0: غير معرّف.' },
        operate: { eu: 'Batu: m.k.t.-a eta kentzean parentesia. Zatitu: bigarrenari buelta. Lehenik faktorizatu.', es: 'Sumar: m.c.m. y paréntesis al restar. Dividir: la vuelta a la segunda. Factoriza primero.', ar: 'الجمع: المضاعف المشترك الأصغر وقوس عند الطرح. القسمة: اقلب الثاني. حلّل أولًا.' }
    }
}

export function PolinomioakDbh4AkIntroPage() {
    return <UnitPage unit={polinomioakUnit} />
}

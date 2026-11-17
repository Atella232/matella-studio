import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bach2gDerivativesChallenges, bach2gDerivativesDiagnostic, bach2gDerivativesExerciseBank, bach2gDerivativesPractice } from './content'
import { Bach2gDerivativesHeroArt } from './figures'
import { Bach2gDerivativesGames } from './games'
import { BACH2G_DERIVATIVES_GAME_RECORDS_KEY, bach2gDerivativesGameProgressIds } from './games/info'
import { Bach2gDerivativesLaboratory } from './lab'
import { bach2gDerivativesLabChallengeIds, bach2gDerivativesLabToolForTopic, bach2gDerivativesLabTools } from './lab/labTools'
import { bach2gDerivativesStages, bach2gDerivativesTopics } from './lessons'

const deribatuakBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-deribatuak-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Deribatuak', es: 'Derivadas', en: 'Derivatives', ar: 'المشتقات' },
    documentTitle: { eu: 'Deribatuak · Batxilergoa 2 · Gizarte Zientziak', es: 'Derivadas · 2.º Bachillerato · Ciencias Sociales', en: 'Derivatives · 2nd Bachillerato · Social Sciences', ar: 'المشتقات · البكالوريا الثانية · العلوم الاجتماعية' },
    tagline: {
        eu: 'Aldakuntza-tasa, deribatua puntu batean eta zuzen ukitzailea, deribagarritasuna, deribatzeko erregelak eta katearen erregela, eta deribatua ekonomian: hurrengo unitatearen kostua.',
        es: 'La tasa de variación, la derivada en un punto y la tangente, la derivabilidad, las reglas de derivación y la regla de la cadena, y la derivada en economía: lo que cuesta la unidad siguiente.',
        en: 'The rate of change, the derivative at a point and the tangent, differentiability, the rules of differentiation and the chain rule, and the derivative in economy: what the next unit costs.',
        ar: 'معدل التغير، والمشتقة عند نقطة والمماس، وقابلية الاشتقاق، وقواعد الاشتقاق وقاعدة السلسلة، والمشتقة في الاقتصاد: تكلفة الوحدة التالية.'
    },
    heroArt: <Bach2gDerivativesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, T.V.M.-tik hurrengo unitateraino', es: 'Cinco etapas, de la T.V.M. a la unidad siguiente', en: 'Five stages, from the average rate to the next unit', ar: 'خمس مراحل، من معدل التغير المتوسط إلى الوحدة التالية' },
    stages: bach2gDerivativesStages,
    topics: bach2gDerivativesTopics,
    diagnostic: bach2gDerivativesDiagnostic,
    guidedPractice: bach2gDerivativesPractice,
    exerciseBank: bach2gDerivativesExerciseBank,
    challenges: bach2gDerivativesChallenges,
    lab: {
        description: {
            eu: `${bach2gDerivativesLabTools.length} tresna, erronkekin: batez bestekotik unean unekora, leundu tarifa eta hurrengo unitatea, berriak; eta 1. mailako Deribatuak unitateko deribagarria hemen?, f′ funtzioaren grafikoa eta makinen katea.`,
            es: `${bach2gDerivativesLabTools.length} herramientas con retos: de la media a la instantánea, suaviza la tarifa y la unidad siguiente, nuevas; y de Derivadas de 1.º, ¿derivable aquí?, la gráfica de f′ y la cadena de máquinas.`,
            en: `${bach2gDerivativesLabTools.length} tools with challenges: from the average to the instantaneous, smooth the tariff and the next unit, new; and from Derivatives of 1st year, differentiable here?, the graph of f′ and the chain of machines.`,
            ar: `${bach2gDerivativesLabTools.length} أدوات مع تحديات: من المتوسط إلى اللحظي ونعّم التعريفة والوحدة التالية، وهي جديدة؛ ومن مشتقات السنة الأولى: قابلة للاشتقاق هنا؟ ورسم f′ وسلسلة الآلات.`
        },
        progressIds: bach2gDerivativesLabChallengeIds,
        toolForTopic: bach2gDerivativesLabToolForTopic,
        render: (props) => <Bach2gDerivativesLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Bost joko: lasterketa, zenbat kostatzen da hurrengoa?, lotu f eta f′, deribatuen detektibea eta memoria.',
            es: 'Cinco juegos: carrera, ¿cuánto cuesta la siguiente?, une f con f′, detective de derivadas y memoria.',
            en: 'Five games: race, what does the next one cost?, match f with f′, derivatives detective and memory.',
            ar: 'خمس ألعاب: السباق وكم تكلّف التالية؟ وصِل f بـ f′ ومخبر المشتقات والذاكرة.'
        },
        progressIds: bach2gDerivativesGameProgressIds,
        recordsKey: BACH2G_DERIVATIVES_GAME_RECORDS_KEY,
        render: (props) => <Bach2gDerivativesGames {...props} />
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
        rate: { eu: 'T.V.M. = (f(b) − f(a)) / (b − a): aldaketa tartearen luzeraz zatitu. Unitateak: f-renak zati x-renak.', es: 'T.V.M. = (f(b) − f(a)) / (b − a): el cambio entre la longitud del intervalo. Unidades: las de f entre las de x.', en: 'Average rate = (f(b) − f(a)) / (b − a): the change over the length of the interval. Units: those of f over those of x.', ar: 'معدل التغير المتوسط = ⁦(f(b) − f(a)) / (b − a)⁩: التغير على طول الفترة. والوحدات: وحدات f على وحدات x.' },
        point: { eu: "f'(a) = lim (f(a + h) − f(a)) / h: garatu, h sinplifikatu eta h = 0. Ukitzailea: y − f(a) = f'(a)(x − a).", es: "f'(a) = lim (f(a + h) − f(a)) / h: desarrolla, simplifica h y h = 0. Tangente: y − f(a) = f'(a)(x − a).", en: "f'(a) = lim (f(a + h) − f(a)) / h: expand, cancel h and h = 0. Tangent: y − f(a) = f'(a)(x − a).", ar: "⁦f'(a) = lim (f(a + h) − f(a)) / h⁩: انشر واختصر h ثم h = 0. والمماس: ⁦y − f(a) = f'(a)(x − a)⁩." },
        rules: { eu: "(xⁿ)' = n xⁿ⁻¹; (uv)' = u'v + uv'; (u/v)' = (u'v − uv')/v².", es: "(xⁿ)' = n xⁿ⁻¹; (uv)' = u'v + uv'; (u/v)' = (u'v − uv')/v².", en: "(xⁿ)' = n xⁿ⁻¹; (uv)' = u'v + uv'; (u/v)' = (u'v − uv')/v².", ar: "⁦(xⁿ)' = n xⁿ⁻¹⁩؛ ⁦(uv)' = u'v + uv'⁩؛ ⁦(u/v)' = (u'v − uv')/v²⁩." },
        chain: { eu: "Kanpokoa deribatu eta barrukoaren deribatuaz biderkatu: (uⁿ)' = n uⁿ⁻¹ u', (eᵘ)' = eᵘ u', (ln u)' = u'/u.", es: "Deriva lo de fuera y multiplica por la derivada de dentro: (uⁿ)' = n uⁿ⁻¹ u', (eᵘ)' = eᵘ u', (ln u)' = u'/u.", en: "Differentiate the outside and multiply by the derivative of the inside: (uⁿ)' = n uⁿ⁻¹ u', (eᵘ)' = eᵘ u', (ln u)' = u'/u.", ar: "اشتق الخارج واضرب في مشتقة الداخل: ⁦(uⁿ)' = n uⁿ⁻¹ u'⁩، ⁦(eᵘ)' = eᵘ u'⁩، ⁦(ln u)' = u'/u⁩." },
        economy: { eu: "C'(x) ≈ C(x + 1) − C(x): hurrengo unitatearen kostua. Deribagarria izateko lotunean: balio bera eta malda bera.", es: "C'(x) ≈ C(x + 1) − C(x): lo que cuesta la unidad siguiente. Para que sea derivable en la unión: mismo valor y misma pendiente.", en: "C'(x) ≈ C(x + 1) − C(x): what the next unit costs. To be differentiable at the joint: same value and same slope.", ar: "⁦C'(x) ≈ C(x + 1) − C(x)⁩: تكلفة الوحدة التالية. ولتكون قابلة للاشتقاق عند الالتقاء: القيمة نفسها والميل نفسه." }
    }
}

export function DeribatuakBatx2gIntroPage() {
    return <UnitPage unit={deribatuakBatx2gUnit} />
}

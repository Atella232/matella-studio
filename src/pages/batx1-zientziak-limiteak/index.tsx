import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bachLimitsChallenges, bachLimitsDiagnostic, bachLimitsExerciseBank, bachLimitsPractice } from './content'
import { BachLimitsHeroArt } from './figures'
import { bachLimitsStages, bachLimitsTopics } from './lessons'

const limiteakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-limiteak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Limiteak eta jarraitutasuna', es: 'Límites y continuidad', en: 'Limits and continuity', ar: 'النهايات والاتصال' },
    documentTitle: { eu: 'Limiteak eta jarraitutasuna · Batxilergoa 1', es: 'Límites y continuidad · 1.º Bachillerato', en: 'Limits and continuity · 1st Bachillerato', ar: 'النهايات والاتصال · البكالوريا الأولى' },
    tagline: {
        eu: 'Limitea puntu batean eta alboko limiteak, 0/0 eta erroen indeterminazioak, limiteak infinituan eta e zenbakia, asintotak eta adarrak, eta jarraitutasuna Bolzanoren teoremaraino.',
        es: 'Límite en un punto y límites laterales, indeterminaciones 0/0 y con raíces, límites en el infinito y el número e, asíntotas y ramas, y continuidad hasta el teorema de Bolzano.',
        en: 'The limit at a point and one-sided limits, 0/0 and root indeterminate forms, limits at infinity and the number e, asymptotes and branches, and continuity up to Bolzano\'s theorem.',
        ar: 'النهاية عند نقطة والنهايتان الجانبيتان، وحالات عدم التعيين 0/0 ومع الجذور، والنهايات عند اللانهاية والعدد e، والمقاربات والفروع، والاتصال حتى مبرهنة بولتسانو.'
    },
    heroArt: <BachLimitsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, puntu bateko limitetik Bolzanoraino', es: 'Cinco etapas, del límite en un punto a Bolzano', en: 'Five stages, from the limit at a point to Bolzano', ar: 'خمس مراحل، من النهاية عند نقطة إلى بولتسانو' },
    stages: bachLimitsStages,
    topics: bachLimitsTopics,
    diagnostic: bachLimitsDiagnostic,
    guidedPractice: bachLimitsPractice,
    exerciseBank: bachLimitsExerciseBank,
    challenges: bachLimitsChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Emaitza eᵃ bada, a bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si el resultado es eᵃ, solo a.', en: 'Write a number: 5, −3, 1.5 or 3/2. If the result is eᵃ, only a.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا كانت النتيجة eᵃ فاكتب a وحدها.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        point: { eu: 'Limiteak ez du f(a) begiratzen, a puntuaren ingurua baizik. Zatika definitutako funtzioan, kalkulatu alboko bi limiteak: berdinak badira bakarrik dago limitea.', es: 'El límite no mira f(a), sino lo que pasa cerca de a. En una función a trozos, calcula los dos límites laterales: solo hay límite si coinciden.', en: 'The limit does not look at f(a) but at what happens near a. In a piecewise function, work out both one-sided limits: there is a limit only if they are equal.', ar: 'النهاية لا تنظر إلى f(a) بل إلى ما يحدث قرب a. في الدالة المعرّفة على أجزاء احسب النهايتين الجانبيتين: لا توجد نهاية إلا إذا تساوتا.' },
        calculus: { eu: 'Lehenik ordezkatu. 0/0 ateratzen bada, faktorizatu eta sinplifikatu; erroak badaude, biderkatu konjokatuaz. k/0 bada, aztertu zeinua alde bakoitzean.', es: 'Primero sustituye. Si sale 0/0, factoriza y simplifica; si hay raíces, multiplica por el conjugado. Si sale k/0, estudia el signo a cada lado.', en: 'Substitute first. If you get 0/0, factorise and simplify; if there are roots, multiply by the conjugate. If you get k/0, study the sign on each side.', ar: 'عوّض أولًا. إذا ظهر 0/0 فحلّل واختصر؛ وإذا وُجدت جذور فاضرب في المرافق. وإذا ظهر k/0 فادرس الإشارة على كل جانب.' },
        infinity: { eu: '∞/∞ denean, konparatu mailak. ∞ − ∞ denean, izendatzaile komuna edo konjokatua. 1^∞ denean, e^(lim g·(f − 1)).', es: 'En ∞/∞, compara los grados. En ∞ − ∞, denominador común o conjugado. En 1^∞, e^(lim g·(f − 1)).', en: 'For ∞/∞, compare the degrees. For ∞ − ∞, a common denominator or the conjugate. For 1^∞, e^(lim g·(f − 1)).', ar: 'في ∞/∞ قارن الدرجات. وفي ∞ − ∞ وحّد المقامات أو استعمل المرافق. وفي 1^∞ استعمل e^(lim g·(f − 1)).' },
        asymptotes: { eu: 'Bertikala: izendatzailea 0 eta zenbakitzailea ez. Horizontala: x → ±∞ denean limite finitua. Zeiharra: goian maila bat gehiago; zatitu eta zatidura da asintota.', es: 'Vertical: denominador 0 y numerador no. Horizontal: límite finito cuando x → ±∞. Oblicua: un grado más arriba; divide y el cociente es la asíntota.', en: 'Vertical: denominator 0 and numerator not. Horizontal: a finite limit as x → ±∞. Oblique: one degree more on top; divide and the quotient is the asymptote.', ar: 'الرأسي: المقام 0 والبسط لا. الأفقي: نهاية منتهية عندما x → ±∞. المائل: درجة البسط أكبر بواحد؛ اقسم فيكون خارج القسمة هو المقارب.' },
        continuity: { eu: 'Jarraitua a puntuan: f(a) badago, limitea badago eta biak berdinak dira. Zatika definitutakoetan, berdindu zatiak lotunean. Bolzano: jarraitua eta zeinu-aldaketa.', es: 'Continua en a: existe f(a), existe el límite y los dos coinciden. A trozos, iguala los trozos en la unión. Bolzano: continua y cambio de signo.', en: 'Continuous at a: f(a) exists, the limit exists and both are equal. For piecewise functions, set the pieces equal where they join. Bolzano: continuous and a change of sign.', ar: 'متصلة عند a: توجد f(a) وتوجد النهاية وتتساويان. في الدوال المعرّفة على أجزاء ساوِ الأجزاء عند نقطة الالتقاء. بولتسانو: متصلة مع تغيّر في الإشارة.' }
    }
}

export function LimiteakBatx1zIntroPage() {
    return <UnitPage unit={limiteakBatx1zUnit} />
}

import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { socLimitsChallenges, socLimitsDiagnostic, socLimitsExerciseBank, socLimitsPractice } from './content'
import { SocLimitsHeroArt } from './figures'
import { socLimitsStages, socLimitsTopics } from './lessons'

const limiteakBatx1gUnit: UnitDefinition = {
    storagePrefix: 'matella-limiteak-batx1g',
    coursePath: '/matematika/batx1-gizarte',
    courseTitle: { eu: 'Batxilergoa 1 · Gizarte Zientziak', es: '1.º Bachillerato · Ciencias Sociales', en: '1st Bachillerato · Social Sciences', ar: 'البكالوريا الأولى · العلوم الاجتماعية' },
    title: { eu: 'Limiteak eta jarraitutasuna', es: 'Límites y continuidad', en: 'Limits and continuity', ar: 'النهايات والاتصال' },
    documentTitle: { eu: 'Limiteak eta jarraitutasuna · Batxilergoa 1 · Gizarte Zientziak', es: 'Límites y continuidad · 1.º Bachillerato · Ciencias Sociales', en: 'Limits and continuity · 1st Bachillerato · Social Sciences', ar: 'النهايات والاتصال · البكالوريا الأولى · العلوم الاجتماعية' },
    tagline: {
        eu: 'Funtzio batek epe luzera zer egiten duen, mailak eta erroak infinituan, alboko limiteak eta 0/0, jauzirik egiten ez duten tarifak, eta asintotak eta adar parabolikoak.',
        es: 'Qué hace una función a la larga, grados y raíces en el infinito, límites laterales y 0/0, tarifas que no saltan, y asíntotas y ramas parabólicas.',
        en: 'What a function does in the long run, degrees and roots at infinity, one-sided limits and 0/0, tariffs that do not jump, and asymptotes and parabolic branches.',
        ar: 'ماذا تفعل الدالة على المدى البعيد، والدرجات والجذور عند اللانهاية، والنهايتان الجانبيتان و0/0، وتعرفات لا تقفز، والمقاربات والفروع المكافئة.'
    },
    heroArt: <SocLimitsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, infinitutik asintotetara', es: 'Cinco etapas, del infinito a las asíntotas', en: 'Five stages, from infinity to asymptotes', ar: 'خمس مراحل، من اللانهاية إلى المقاربات' },
    stages: socLimitsStages,
    topics: socLimitsTopics,
    diagnostic: socLimitsDiagnostic,
    guidedPractice: socLimitsPractice,
    exerciseBank: socLimitsExerciseBank,
    challenges: socLimitsChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 2,5 edo 5/6.', es: 'Escribe un número: 5, −3, 2,5 o 5/6.', en: 'Write a number: 5, −3, 2.5 or 5/6.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 2.5 أو 5/6.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 5/6', es: 'Ej.: 5/6', en: 'e.g. 5/6', ar: 'مثال: 5/6' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 5/6.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 5/6.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 5/6.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 5/6.' }
    },
    errorByStage: {
        infinity: { eu: 'Maila handieneko gaiak agintzen du. ∞/∞ ez da 1: maila bera bada, koefiziente nagusien zatidura.', es: 'Manda el término de mayor grado. ∞/∞ no es 1: con el mismo grado, el cociente de los coeficientes principales.', en: 'The highest-degree term rules. ∞/∞ is not 1: with the same degree, the quotient of the leading coefficients.', ar: 'الحد ذو الدرجة الأكبر هو الذي يحكم. و∞/∞ ليست 1: مع الدرجة نفسها خارج قسمة المعاملين الرئيسيين.' },
        'more-infinity': { eu: 'x → −∞ denean, (−x)² positiboa da eta (−x)³ negatiboa. √(ax²) = √a · x.', es: 'Si x → −∞, (−x)² es positivo y (−x)³, negativo. √(ax²) = √a · x.', en: 'If x → −∞, (−x)² is positive and (−x)³ negative. √(ax²) = √a · x.', ar: 'إذا x → −∞ فإن (−x)² موجب و(−x)³ سالب. و√(ax²) = √a · x.' },
        point: { eu: 'Limiteak bi aldeak begiratzen ditu, ez f(a). 0/0 ez da «ez dago»: faktorizatu eta sinplifikatu.', es: 'El límite mira los dos lados, no f(a). 0/0 no es «no existe»: factoriza y simplifica.', en: 'The limit looks at both sides, not at f(a). 0/0 is not «does not exist»: factorise and cancel.', ar: 'تنظر النهاية إلى الجانبين لا إلى f(a). و0/0 لا تعني «غير موجودة»: حلّل واختصر.' },
        continuity: { eu: 'Jarraitua: f(a) badago, limitea badago eta berdinak dira. Lotura-puntuan berdindu bi zatiak.', es: 'Continua: existe f(a), existe el límite y son iguales. En el punto de unión, iguala los dos trozos.', en: 'Continuous: f(a) exists, the limit exists and they are equal. At the joining point, set both pieces equal.', ar: 'متصلة: f(a) موجودة والنهاية موجودة وهما متساويتان. وعند نقطة الوصل ساوِ بين الجزأين.' },
        asymptotes: { eu: 'Zeiharra goian maila bat gehiago dagoenean bakarrik; bi gehiago badira, adar parabolikoa.', es: 'Oblicua solo con un grado más arriba; con dos más, rama parabólica.', en: 'Oblique only with one degree more on top; with two more, a parabolic branch.', ar: 'المائل فقط مع درجة زائدة واحدة في البسط؛ ومع درجتين فرع مكافئ.' }
    }
}

export function LimiteakBatx1gIntroPage() {
    return <UnitPage unit={limiteakBatx1gUnit} />
}

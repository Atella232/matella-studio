import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { inferenceBatx2gChallenges, inferenceBatx2gDiagnostic, inferenceBatx2gExerciseBank, inferenceBatx2gPractice } from './content'
import { InferenceBatx2gHeroArt } from './figures'
import { inferenceBatx2gStages, inferenceBatx2gTopics } from './lessons'

const inferentziaBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-inferentzia-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Inferentzia estatistikoa', es: 'Inferencia estadística', en: 'Statistical inference', ar: 'الاستدلال الإحصائي' },
    documentTitle: { eu: 'Inferentzia · Batxilergoa 2 · Gizarte', es: 'Inferencia · 2.º Bachillerato · Sociales', en: 'Inference · 2nd Bachillerato · Social Sciences', ar: 'الاستدلال · البكالوريا الثانية · اجتماعية' },
    tagline: {
        eu: 'Estimazio puntuala, konfiantza-maila eta balio kritikoa, batez bestekoaren eta proportzioaren konfiantza-tarteak, errorea, laginaren tamaina, inkestak eta baieztapenak egiaztatzea.',
        es: 'La estimación puntual, el nivel de confianza y el valor crítico, los intervalos de confianza para la media y la proporción, el error, el tamaño de la muestra, las encuestas y contrastar afirmaciones.',
        en: 'The point estimate, the confidence level and the critical value, confidence intervals for the mean and the proportion, the error, the sample size, polls and checking claims.',
        ar: 'التقدير النقطي ومستوى الثقة والقيمة الحرجة، وفترات الثقة للمتوسط والنسبة، والخطأ وحجم العيّنة، والاستطلاعات والتحقق من الادعاءات.'
    },
    heroArt: <InferenceBatx2gHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, estimaziotik erabakietara', es: 'Cinco etapas, de la estimación a las decisiones', en: 'Five stages, from estimation to decisions', ar: 'خمس مراحل، من التقدير إلى القرارات' },
    stages: inferenceBatx2gStages,
    topics: inferenceBatx2gTopics,
    diagnostic: inferenceBatx2gDiagnostic,
    guidedPractice: inferenceBatx2gPractice,
    exerciseBank: inferenceBatx2gExerciseBank,
    challenges: inferenceBatx2gChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki zehatz bat: 0,0392, 97 edo 1,645. Laginaren tamaina, gorantz biribilduta.', es: 'Escribe un número exacto: 0,0392, 97 o 1,645. El tamaño de muestra, redondeado hacia arriba.', en: 'Write an exact number: 0.0392, 97 or 1.645. Sample sizes rounded up.', ar: 'اكتب عددًا مضبوطًا: 0.0392 أو 97 أو 1.645. وحجم العيّنة مقرّبًا إلى الأعلى.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 0,0392', es: 'Ej.: 0,0392', en: 'e.g. 0.0392', ar: 'مثال: 0.0392' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat: 0,0392, 97 edo 1,645.', es: 'No entiendo esa respuesta. Escribe un número: 0,0392, 97 o 1,645.', en: 'I don\'t understand that answer. Write a number: 0.0392, 97 or 1.645.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا: 0.0392 أو 97 أو 1.645.' }
    },
    errorByStage: {
        estimation: { eu: 'Buztan bakoitzean α / 2: bilatu 1 − α / 2 taulan, ez maila bera.', es: 'En cada cola α / 2: busca 1 − α / 2 en la tabla, no el propio nivel.', en: 'Each tail holds α / 2: look up 1 − α / 2 in the table, not the level itself.', ar: 'في كل ذيل α / 2: ابحث عن 1 − α / 2 في الجدول لا عن المستوى نفسه.' },
        'mean-ci': { eu: 'Erradioa z · σ / √n da, ez z · σ. x̄ erdiko puntua da.', es: 'El radio es z · σ / √n, no z · σ. x̄ es el punto medio.', en: 'The radius is z · σ / √n, not z · σ. x̄ is the midpoint.', ar: 'نصف القطر z · σ / √n لا z · σ. وx̄ هو المنتصف.' },
        'error-size': { eu: 'n askatzean, karratura jaso eta gorantz biribildu.', es: 'Al despejar n, eleva al cuadrado y redondea hacia arriba.', en: 'When solving for n, square it and round up.', ar: 'عند استخراج n ربّع وقرّب إلى الأعلى.' },
        'proportion-ci': { eu: 'Desbideratzea √(p̂q̂ / n) da, erroarekin. Daturik gabe, p̂ = 0,5.', es: 'La desviación es √(p̂q̂ / n), con raíz. Sin datos, p̂ = 0,5.', en: 'The deviation is √(p̂q̂ / n), with the root. With no data, p̂ = 0.5.', ar: 'الانحراف √(p̂q̂ / n) بالجذر. وبلا بيانات p̂ = 0.5.' },
        decisions: { eu: 'Baieztapena tartean badago, bateragarria da; kanpoan, ez da sinesgarria maila horretan.', es: 'Si la afirmación está en el intervalo, es compatible; fuera, no es creíble a ese nivel.', en: 'If the claim is in the interval, it is compatible; outside, it is not believable at that level.', ar: 'إذا كان الادعاء في الفترة فهو متوافق؛ وخارجها غير مقنع عند ذلك المستوى.' }
    }
}

export function InferentziaBatx2gIntroPage() {
    return <UnitPage unit={inferentziaBatx2gUnit} />
}

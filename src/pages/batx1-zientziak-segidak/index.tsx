import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bachSequencesChallenges, bachSequencesDiagnostic, bachSequencesExerciseBank, bachSequencesPractice } from './content'
import { BachSequencesHeroArt } from './figures'
import { BachSequencesGames } from './games'
import { BACH_SEQUENCES_GAME_RECORDS_KEY, bachSequencesGameProgressIds } from './games/info'
import { BachSequencesLaboratory } from './lab'
import { bachSequencesLabChallengeIds, bachSequencesLabToolForTopic, bachSequencesLabTools } from './lab/labTools'
import { bachSequencesStages, bachSequencesTopics } from './lessons'

const segidakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-segidak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Segidak', es: 'Sucesiones', en: 'Sequences', ar: 'المتتاليات' },
    documentTitle: { eu: 'Segidak · Batxilergoa 1', es: 'Sucesiones · 1.º Bachillerato', en: 'Sequences · 1st Bachillerato', ar: 'المتتاليات · البكالوريا الأولى' },
    tagline: {
        eu: 'Gai orokorra eta errepikapena, Fibonacci eta zenbaki urrea, progresioak, batura infinituak, segida baten limitea eta e zenbakia.',
        es: 'Término general y recurrencia, Fibonacci y el número áureo, progresiones, sumas infinitas, el límite de una sucesión y el número e.',
        en: 'General term and recursion, Fibonacci and the golden ratio, progressions, infinite sums, the limit of a sequence and the number e.',
        ar: 'الحد العام والتراجع، وفيبوناتشي والعدد الذهبي، والمتتاليات الحسابية والهندسية، والمجاميع اللانهائية، ونهاية المتتالية، والعدد e.'
    },
    heroArt: <BachSequencesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, gai orokorretik e zenbakira', es: 'Cinco etapas, del término general al número e', en: 'Five stages, from the general term to the number e', ar: 'خمس مراحل، من الحد العام إلى العدد e' },
    stages: bachSequencesStages,
    topics: bachSequencesTopics,
    diagnostic: bachSequencesDiagnostic,
    guidedPractice: bachSequencesPractice,
    exerciseBank: bachSequencesExerciseBank,
    challenges: bachSequencesChallenges,
    lab: {
        description: {
            eu: `${bachSequencesLabTools.length} tresna, erronkekin: Fibonacci eta zenbaki urrea, limitearen banda eta e zenbakiaren makina, berriak; eta 3. DBHko makilen patroiak, igela, Gaussen barrak, errebotatzen duen pilota eta inoiz betetzen ez den barra.`,
            es: `${bachSequencesLabTools.length} herramientas con retos: Fibonacci y el número de oro, la banda del límite y la máquina de e, nuevas; y de 3.º ESO, los patrones de palillos, la rana, las barras de Gauss, la pelota que rebota y la barra que nunca se llena.`,
            en: `${bachSequencesLabTools.length} tools with challenges: Fibonacci and the golden ratio, the band of the limit and the e machine, new; and from 3rd ESO, the stick patterns, the frog, Gauss's bars, the bouncing ball and the bar that never fills up.`,
            ar: `${bachSequencesLabTools.length} أدوات مع تحديات: فيبوناتشي والعدد الذهبي وشريط النهاية وآلة العدد e، وهي جديدة؛ ومن الصف الثالث: أنماط العيدان والضفدع وأعمدة غاوس والكرة المرتدة والعمود الذي لا يمتلئ.`
        },
        progressIds: bachSequencesLabChallengeIds,
        toolForTopic: bachSequencesLabToolForTopic,
        render: (props) => <BachSequencesLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zortzi joko: lasterketa, nora doa?, harrapatu banda, segiden detektibea eta memoria, berriak; eta 3. DBHko patroi ezkutua, sailkatzailea eta Gaussen eskailera.',
            es: 'Ocho juegos: carrera, ¿hacia dónde va?, atrapa la banda, detective de sucesiones y memoria, nuevos; y de 3.º ESO, el patrón escondido, el clasificador y la escalera de Gauss.',
            en: 'Eight games: race, where does it go?, catch the band, sequences detective and memory, new; and from 3rd ESO, the hidden pattern, the sorter and Gauss\'s staircase.',
            ar: 'ثماني ألعاب: السباق وإلى أين تتجه؟ والتقط الشريط ومخبر المتتاليات والذاكرة، وهي جديدة؛ ومن الصف الثالث: النمط المخفي والمصنِّف ودرج غاوس.'
        },
        progressIds: bachSequencesGameProgressIds,
        recordsKey: BACH_SEQUENCES_GAME_RECORDS_KEY,
        render: (props) => <BachSequencesGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Gai baten posizioa eskatzen bada, n bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si se pide el lugar de un término, solo n.', en: 'Write a number: 5, −3, 1.5 or 3/2. If the place of a term is asked for, only n.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا طُلبت رتبة حد فاكتب الرتبة فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        sequences: { eu: 'aₙ₊₁ lortzeko, ordezkatu n, n + 1 jarrita, eta ez gehitu 1 amaieran. Gorakorra: aₙ₊₁ − aₙ > 0 beti.', es: 'Para aₙ₊₁, sustituye n por n + 1; no sumes 1 al final. Creciente: aₙ₊₁ − aₙ > 0 siempre.', en: 'For aₙ₊₁, replace n with n + 1; do not add 1 at the end. Increasing: aₙ₊₁ − aₙ > 0 always.', ar: 'لإيجاد aₙ₊₁ عوّض n بـ n + 1، ولا تضف 1 في النهاية. متزايدة: aₙ₊₁ − aₙ > 0 دائمًا.' },
        progressions: { eu: 'aₙ = a₁ + (n − 1)·d, ez n·d. Geometrikoan, rⁿ⁻¹. % p hazten bada, r = 1 + p/100.', es: 'aₙ = a₁ + (n − 1)·d, no n·d. En la geométrica, rⁿ⁻¹. Si crece un p %, r = 1 + p/100.', en: 'aₙ = a₁ + (n − 1)·d, not n·d. In the geometric one, rⁿ⁻¹. If it grows by p%, r = 1 + p/100.', ar: 'aₙ = a₁ + (n − 1)·d وليس n·d. وفي الهندسية rⁿ⁻¹. وإذا زادت p % فإن r = 1 + p/100.' },
        'infinite-sums': { eu: 'S∞ = a₁/(1 − r) |r| < 1 denean bakarrik. 0,ababab…: bloke bakoitza aurrekoa zati 100.', es: 'S∞ = a₁/(1 − r) solo si |r| < 1. 0,ababab…: cada bloque es el anterior entre 100.', en: 'S∞ = a₁/(1 − r) only if |r| < 1. 0.ababab…: each block is the one before divided by 100.', ar: 'S∞ = a₁/(1 − r) فقط إذا كان |r| < 1. وفي 0.ababab… كل كتلة هي السابقة مقسومة على 100.' },
        limits: { eu: 'Limitea ez da beti 0. Alderatu mailak: berdinak, koefiziente nagusiak; behean handiagoa, 0; goian handiagoa, ±∞. (−1)ⁿ: oszilatzen du.', es: 'El límite no siempre es 0. Compara grados: iguales, coeficientes principales; mayor abajo, 0; mayor arriba, ±∞. (−1)ⁿ: oscila.', en: 'The limit is not always 0. Compare degrees: equal, leading coefficients; higher below, 0; higher on top, ±∞. (−1)ⁿ: it oscillates.', ar: 'النهاية ليست دائمًا 0. قارن الدرجتين: متساويتان، المعاملان الرئيسيان؛ المقام أكبر، 0؛ البسط أكبر، ±∞. و(−1)ⁿ تتذبذب.' },
        'number-e': { eu: '(1 + 1/n)ⁿ → e ≈ 2,718, ez 1. (1 + k/n)ⁿ → eᵏ. Interes jarraituan, C = C₀·eᵏᵗ.', es: '(1 + 1/n)ⁿ → e ≈ 2,718, no 1. (1 + k/n)ⁿ → eᵏ. Con interés continuo, C = C₀·eᵏᵗ.', en: '(1 + 1/n)ⁿ → e ≈ 2.718, not 1. (1 + k/n)ⁿ → eᵏ. With continuous interest, C = C₀·eᵏᵗ.', ar: '(1 + 1/n)ⁿ → e ≈ 2.718 وليس 1. و(1 + k/n)ⁿ → eᵏ. ومع الفائدة المستمرة C = C₀·eᵏᵗ.' }
    }
}

export function SegidakBatx1zIntroPage() {
    return <UnitPage unit={segidakBatx1zUnit} />
}

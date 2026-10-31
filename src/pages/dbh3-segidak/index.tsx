import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { sequencesChallenges, sequencesDiagnostic, sequencesExerciseBank, sequencesPractice } from './content'
import { SequencesHeroArt } from './figures'
import { SequencesGames } from './games'
import { SEQUENCES_GAME_RECORDS_KEY, sequencesGameProgressIds } from './games/info'
import { SequencesLaboratory } from './lab'
import { sequencesLabChallengeIds, sequencesLabToolForTopic, sequencesLabTools } from './lab/labTools'
import { sequencesStages, sequencesTopics } from './lessons'

const sequencesUnit: UnitDefinition = {
    storagePrefix: 'matella-segidak-dbh3',
    coursePath: '/matematika/dbh3',
    courseTitle: { eu: '3. DBH', es: '3.º ESO', en: '3rd ESO', ar: 'الصف الثالث' },
    title: { eu: 'Segidak', es: 'Sucesiones', en: 'Sequences', ar: 'المتتاليات' },
    documentTitle: { eu: 'Segidak · 3. DBH', es: 'Sucesiones · 3.º ESO', en: 'Sequences · 3rd ESO', ar: 'المتتاليات · الصف الثالث' },
    tagline: {
        eu: 'Patroietatik progresioetara: gai orokorra eta errepikapena, progresio aritmetikoak eta geometrikoak, Gaussen batura eta inoiz amaitzen ez diren baturak.',
        es: 'De los patrones a las progresiones: término general y recurrencia, progresiones aritméticas y geométricas, la suma de Gauss y las sumas que nunca acaban.',
        en: 'From patterns to progressions: the general term and recursion, arithmetic and geometric progressions, Gauss\'s sum and sums that never end.',
        ar: 'من الأنماط إلى المتتاليات: الحد العام والتراجع، والمتتاليات الحسابية والهندسية، ومجموع غاوس والمجاميع التي لا تنتهي.'
    },
    heroArt: <SequencesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, patroietatik batura infinituetara', es: 'Cinco etapas, de los patrones a las sumas infinitas', en: 'Five stages, from patterns to infinite sums', ar: 'خمس مراحل، من الأنماط إلى المجاميع اللانهائية' },
    stages: sequencesStages,
    topics: sequencesTopics,
    diagnostic: sequencesDiagnostic,
    guidedPractice: sequencesPractice,
    exerciseBank: sequencesExerciseBank,
    challenges: sequencesChallenges,
    lab: {
        description: {
            eu: `${sequencesLabTools.length} tresna: makilen patroiak, igela zuzenean, Gaussen barrak, errebotatzen duen pilota eta inoiz betetzen ez den barra, erronkekin.`,
            es: `${sequencesLabTools.length} herramientas: los patrones de palillos, la rana en la recta, las barras de Gauss, la pelota que rebota y la barra que nunca se llena, con retos.`,
            en: `${sequencesLabTools.length} tools: stick patterns, the frog on the number line, Gauss's bars, the bouncing ball and the bar that never fills up, with challenges.`,
            ar: `${sequencesLabTools.length} أدوات: أنماط العيدان والضفدع على المستقيم وأعمدة غاوس والكرة المرتدة والعمود الذي لا يمتلئ، مع تحديات.`
        },
        progressIds: sequencesLabChallengeIds,
        toolForTopic: sequencesLabToolForTopic,
        render: (props) => <SequencesLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Sei joko: lasterketa, patroi ezkutua, sailkatzailea, Gaussen eskailera, progresioen detektibea eta memoria.',
            es: 'Seis juegos: carrera, el patrón escondido, el clasificador, la escalera de Gauss, el detective de progresiones y memoria.',
            en: 'Six games: race, the hidden pattern, the sorter, Gauss\'s staircase, the progressions detective and memory.',
            ar: 'ست ألعاب: السباق والنمط المخفي والمصنِّف ودرج غاوس ومخبر المتتاليات والذاكرة.'
        },
        progressIds: sequencesGameProgressIds,
        recordsKey: SEQUENCES_GAME_RECORDS_KEY,
        render: (props) => <SequencesGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat edo zatiki bat: 23, −4, 1,25 edo 7/9.', es: 'Escribe un número o una fracción: 23, −4, 1,25 o 7/9.', en: 'Write a number or a fraction: 23, −4, 1.25 or 7/9.', ar: 'اكتب عددًا أو كسرًا: 23 أو ⁦−4⁩ أو 1.25 أو 7/9.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 23', es: 'Ej.: 23', en: 'e.g. 23', ar: 'مثال: 23' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 23 edo 7/9.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 23 o 7/9.', en: 'I don\'t understand that answer. Write a number, for example 23 or 7/9.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 23 أو 7/9.' }
    },
    errorByStage: {
        sequences: { eu: 'aₙ: n lekuan dagoen gaia. Ordezkatu n lekua; leku bat bilatzeko, berdindu eta ebatzi.', es: 'aₙ: el término del lugar n. Sustituye el lugar; para hallar un lugar, iguala y resuelve.', en: 'aₙ: the term in position n. Substitute the position; to find a position, set equal and solve.', ar: 'aₙ: الحد في الرتبة n. عوّض الرتبة؛ ولإيجاد رتبة ساوِ وحلّ.' },
        arithmetic: { eu: 'aₙ = a₁ + (n − 1) · d: n − 1 jauzi. d = hurrengoa − aurrekoa.', es: 'aₙ = a₁ + (n − 1) · d: n − 1 saltos. d = siguiente − anterior.', en: 'aₙ = a₁ + (n − 1) · d: n − 1 jumps. d = next − previous.', ar: 'aₙ = a₁ + (n − 1) · d: عدد القفزات n − 1. d = التالي − السابق.' },
        sums: { eu: 'Sₙ = (a₁ + aₙ) · n : 2. Ez ahaztu 2 zenbakiaz zatitzea.', es: 'Sₙ = (a₁ + aₙ) · n : 2. No olvides dividir entre 2.', en: 'Sₙ = (a₁ + aₙ) · n ÷ 2. Do not forget to divide by 2.', ar: 'Sₙ = (a₁ + aₙ) · n ÷ 2. لا تنسَ القسمة على 2.' },
        geometric: { eu: 'aₙ = a₁ · rⁿ⁻¹: lehenik berretura. r = hurrengoa : aurrekoa.', es: 'aₙ = a₁ · rⁿ⁻¹: primero la potencia. r = siguiente : anterior.', en: 'aₙ = a₁ · rⁿ⁻¹: the power first. r = next ÷ previous.', ar: 'aₙ = a₁ · rⁿ⁻¹: القوة أولًا. r = التالي ÷ السابق.' },
        'geo-sums': { eu: 'Sₙ = a₁(rⁿ − 1) : (r − 1). |r| < 1 bada, S = a₁ : (1 − r).', es: 'Sₙ = a₁(rⁿ − 1) : (r − 1). Si |r| < 1, S = a₁ : (1 − r).', en: 'Sₙ = a₁(rⁿ − 1) ÷ (r − 1). If |r| < 1, S = a₁ ÷ (1 − r).', ar: 'Sₙ = a₁(rⁿ − 1) ÷ (r − 1). إذا |r| < 1 فإن S = a₁ ÷ (1 − r).' }
    }
}

export function SegidakDBH3Page() {
    return <UnitPage unit={sequencesUnit} />
}

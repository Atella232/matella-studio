import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bach2gApplicationsChallenges, bach2gApplicationsDiagnostic, bach2gApplicationsExerciseBank, bach2gApplicationsPractice } from './content'
import { Bach2gApplicationsHeroArt } from './figures'
import { Bach2gApplicationsGames } from './games'
import { BACH2G_APPLICATIONS_GAME_RECORDS_KEY, bach2gApplicationsGameProgressIds } from './games/info'
import { Bach2gApplicationsLaboratory } from './lab'
import { bach2gApplicationsLabChallengeIds, bach2gApplicationsLabToolForTopic, bach2gApplicationsLabTools } from './lab/labTools'
import { bach2gApplicationsStages, bach2gApplicationsTopics } from './lessons'

const aplikazioakBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-aplikazioak-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Deribatuaren aplikazioak', es: 'Aplicaciones de la derivada', en: 'Applications of the derivative', ar: 'تطبيقات المشتقة' },
    documentTitle: { eu: 'Deribatuaren aplikazioak · Batxilergoa 2 · Gizarte Zientziak', es: 'Aplicaciones de la derivada · 2.º Bachillerato · Ciencias Sociales', en: 'Applications of the derivative · 2nd Bachillerato · Social Sciences', ar: 'تطبيقات المشتقة · البكالوريا الثانية · العلوم الاجتماعية' },
    tagline: {
        eu: 'Zuzen ukitzailea, hazkundea eta beherakada, maximoak eta minimoak, kurbadura eta inflexioa, eta optimizazioa enpresan: irabazirik handiena, kosturik txikiena eta prezio onena.',
        es: 'La recta tangente, el crecimiento y el decrecimiento, los máximos y mínimos, la curvatura y la inflexión, y la optimización en la empresa: el mayor beneficio, el menor coste y el mejor precio.',
        en: 'The tangent line, increase and decrease, maxima and minima, curvature and inflection, and optimisation in the firm: the highest profit, the lowest cost and the best price.',
        ar: 'المماس، والتزايد والتناقص، والقيم العظمى والصغرى، والتقعّر والانعطاف، والاستمثال في الشركة: أكبر ربح وأصغر تكلفة وأفضل سعر.'
    },
    heroArt: <Bach2gApplicationsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, zuzen ukitzailetik enpresa optimizatzeraino', es: 'Cinco etapas, de la tangente a optimizar la empresa', en: 'Five stages, from the tangent to optimising the firm', ar: 'خمس مراحل، من المماس إلى استمثال الشركة' },
    stages: bach2gApplicationsStages,
    topics: bach2gApplicationsTopics,
    diagnostic: bach2gApplicationsDiagnostic,
    guidedPractice: bach2gApplicationsPractice,
    exerciseBank: bach2gApplicationsExerciseBank,
    challenges: bach2gApplicationsChallenges,
    lab: {
        description: {
            eu: `${bach2gApplicationsLabTools.length} tresna, erronkekin: diru-sarrerak ken kostuak, batez besteko kostu minimoa eta diru gehien ematen duen prezioa, berriak; eta 1. mailako Aplikazioak unitateko f′ deribatuaren semaforoa, kurbadura zuzen ukitzailearekin eta estalkirik gabeko kutxa.`,
            es: `${bach2gApplicationsLabTools.length} herramientas con retos: ingreso menos coste, coste medio mínimo y el precio que más ingresa, nuevas; y de Aplicaciones de 1.º, el semáforo de f′, la curvatura con la tangente y la caja sin tapa.`,
            en: `${bach2gApplicationsLabTools.length} tools with challenges: income minus cost, the lowest average cost and the price that brings in most, new; and from Applications of 1st year, the traffic light of f′, concavity with the tangent and the box without a lid.`,
            ar: `${bach2gApplicationsLabTools.length} أدوات مع تحديات: الإيراد ناقص التكلفة وأصغر متوسط تكلفة والسعر الذي يعطي أكبر إيراد، وهي جديدة؛ ومن تطبيقات السنة الأولى: إشارة f′ الضوئية والتقعّر بالمماس والعلبة بلا غطاء.`
        },
        progressIds: bach2gApplicationsLabChallengeIds,
        toolForTopic: bach2gApplicationsLabToolForTopic,
        render: (props) => <Bach2gApplicationsLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Bost joko: lasterketa, maximoa, minimoa ala ezer ez?, optimizatu enpresa, aplikazioen detektibea eta memoria.',
            es: 'Cinco juegos: carrera, ¿máximo, mínimo o nada?, optimiza la empresa, detective de aplicaciones y memoria.',
            en: 'Five games: race, maximum, minimum or nothing?, optimise the firm, applications detective and memory.',
            ar: 'خمس ألعاب: السباق وعظمى أم صغرى أم لا شيء؟ واستمثل الشركة ومخبر التطبيقات والذاكرة.'
        },
        progressIds: bach2gApplicationsGameProgressIds,
        recordsKey: BACH2G_APPLICATIONS_GAME_RECORDS_KEY,
        render: (props) => <Bach2gApplicationsGames {...props} />
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
        tangent: { eu: "Ukitzailea: y − f(a) = f'(a)(x − a). Paraleloa: f'(x) = m, zuzenaren malda.", es: "Tangente: y − f(a) = f'(a)(x − a). Paralela: f'(x) = m, la pendiente de la recta.", en: "Tangent: y − f(a) = f'(a)(x − a). Parallel: f'(x) = m, the slope of the line.", ar: "المماس: ⁦y − f(a) = f'(a)(x − a)⁩. والموازي: ⁦f'(x) = m⁩، ميل المستقيم." },
        growth: { eu: "f' > 0: gorakorra; f' < 0: beherakorra. Ebatzi f'(x) = 0 eta probatu balio bat tarte bakoitzean.", es: "f' > 0: crece; f' < 0: decrece. Resuelve f'(x) = 0 y prueba un valor en cada intervalo.", en: "f' > 0: increasing; f' < 0: decreasing. Solve f'(x) = 0 and try a value in each interval.", ar: "⁦f' > 0⁩: متزايدة؛ ⁦f' < 0⁩: متناقصة. حلّ ⁦f'(x) = 0⁩ وجرّب قيمة في كل فترة." },
        extrema: { eu: "f'(a) = 0 eta f''(a) < 0: maximoa; f''(a) > 0: minimoa. Tarte itxian, alderatu muturrak ere.", es: "f'(a) = 0 y f''(a) < 0: máximo; f''(a) > 0: mínimo. En un intervalo cerrado, compara también los extremos.", en: "f'(a) = 0 and f''(a) < 0: maximum; f''(a) > 0: minimum. On a closed interval, compare the ends too.", ar: "⁦f'(a) = 0⁩ و⁦f''(a) < 0⁩: عظمى؛ ⁦f''(a) > 0⁩: صغرى. وفي فترة مغلقة قارن الطرفين أيضًا." },
        curvature: { eu: "f'' > 0: ahurra (∪); f'' < 0: ganbila (∩). Inflexioa: f'' = 0 eta zeinuz aldatzen da.", es: "f'' > 0: cóncava (∪); f'' < 0: convexa (∩). Inflexión: f'' = 0 y cambia de signo.", en: "f'' > 0: concave up (∪); f'' < 0: concave down (∩). Inflection: f'' = 0 and it changes sign.", ar: "⁦f'' > 0⁩: مقعّرة نحو الأعلى (∪)؛ ⁦f'' < 0⁩: نحو الأسفل (∩). الانعطاف: ⁦f'' = 0⁩ مع تغيّر الإشارة." },
        optimization: { eu: "B = I − C eta B' = 0. Batez bestekoa: M = C / x eta M' = 0. Erantzun galderari: unitateak, prezioa edo diru-kopurua.", es: "B = I − C y B' = 0. Medio: M = C / x y M' = 0. Contesta a la pregunta: unidades, precio o cantidad.", en: "B = I − C and B' = 0. Average: M = C / x and M' = 0. Answer the question: units, price or amount.", ar: "⁦B = I − C⁩ و⁦B' = 0⁩. المتوسط: ⁦M = C / x⁩ و⁦M' = 0⁩. أجب عن السؤال: الوحدات أو السعر أو المبلغ." }
    }
}

export function AplikazioakBatx2gIntroPage() {
    return <UnitPage unit={aplikazioakBatx2gUnit} />
}

import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { withGraphs } from '../dbh2-funtzioak-v2/withGraphs'
import '../dbh2-funtzioak-v2/Functions.css'
import { functionsChallenges, functionsDiagnostic, functionsExerciseBank, functionsPractice } from './content'
import { FunctionsHeroArt } from './figures'
import { FunctionsGames } from './games'
import { FUNCTIONS_GAME_RECORDS_KEY, functionsGameProgressIds } from './games/info'
import { FunctionsLaboratory } from './lab'
import { functionsLabChallengeIds, functionsLabToolForTopic, functionsLabTools } from './lab/labTools'
import { functionsStages, functionsTopics } from './lessons'

const funtzioakUnit: UnitDefinition = {
    storagePrefix: 'matella-funtzioak-dbh4ap',
    coursePath: '/matematika/dbh4-aplikatuak',
    courseTitle: { eu: '4. DBH · Aplikatuak', es: '4.º ESO · Aplicadas', ar: 'الصف الرابع · التطبيقية' },
    title: { eu: 'Funtzioak', es: 'Funciones', ar: 'الدوال' },
    documentTitle: { eu: 'Funtzioak · 4. DBH', es: 'Funciones · 4.º ESO', ar: 'الدوال · الصف الرابع' },
    tagline: {
        eu: 'Funtzio kontzeptutik azterketa osora: adierazteko erak, izate-eremua eta ibiltartea, ebaki-puntuak, hazkundea, maximoak eta minimoak, batez besteko aldakuntza-tasa, jarraitutasuna, periodikotasuna eta joera.',
        es: 'Del concepto de función a su estudio completo: formas de expresarla, dominio y recorrido, puntos de corte, crecimiento, máximos y mínimos, tasa de variación media, continuidad, periodicidad y tendencia.',
        ar: 'من مفهوم الدالة إلى دراستها الكاملة: طرق التعبير عنها، والمجال والمدى، ونقاط التقاطع، والتزايد، والقيم العظمى والصغرى، ومعدل التغير المتوسط، والاتصال، والدورية، والاتجاه.'
    },
    heroArt: <FunctionsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, kontzeptutik azterketa osora', es: 'Cinco etapas, del concepto al estudio completo', ar: 'خمس مراحل، من المفهوم إلى الدراسة الكاملة' },
    stages: functionsStages,
    topics: functionsTopics,
    diagnostic: withGraphs(functionsDiagnostic),
    guidedPractice: withGraphs(functionsPractice),
    exerciseBank: functionsExerciseBank.map((section) => ({ ...section, items: withGraphs(section.items) })),
    challenges: withGraphs(functionsChallenges),
    lab: {
        description: {
            eu: `${functionsLabTools.length} tresna: funtzioa ala ez, taulak eta formulak, izate-eremua eta ibiltartea, parabola baten ebakidurak, grafiko bat korritzea, BAT, funtzio periodikoak eta kartulinazko kutxa, erronkekin.`,
            es: `${functionsLabTools.length} herramientas: función o no, tablas y fórmulas, dominio y recorrido, cortes de una parábola, recorrer una gráfica, T.V.M., funciones periódicas y la caja de cartulina, con retos.`,
            ar: `${functionsLabTools.length} أدوات: دالة أم لا، والجداول والصيغ، والمجال والمدى، وتقاطعات قطع مكافئ، والتجوّل في رسم، ومعدل التغير، والدوال الدورية، وعلبة الورق المقوى، مع تحديات.`
        },
        progressIds: functionsLabChallengeIds,
        toolForTopic: functionsLabToolForTopic,
        render: (props) => <FunctionsLaboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: functionsGameProgressIds,
        recordsKey: FUNCTIONS_GAME_RECORDS_KEY,
        render: (props) => <FunctionsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2, unitaterik gabe.', es: 'Escribe un número: 5, −3, 1,5 o 3/2, sin la unidad.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2، دون الوحدة.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3 o 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 3/2.' }
    },
    errorByStage: {
        concept: { eu: 'Ordeztu x parentesi artean eta egin berretura lehenik. Funtzio batean, x bakoitzak y bakarra du.', es: 'Sustituye x entre paréntesis y haz primero la potencia. En una función, cada x tiene una sola y.', ar: 'عوّض x بين قوسين واحسب القوة أولًا. في الدالة لكل x قيمة y واحدة.' },
        domain: { eu: 'Izendatzailea ezin da 0 izan eta erro baten barrukoa ezin da negatiboa izan. Y ardatza: x = 0; X ardatza: y = 0.', es: 'El denominador no puede ser 0 y lo de dentro de una raíz no puede ser negativo. Eje Y: x = 0; eje X: y = 0.', ar: 'لا يكون المقام 0 ولا ما تحت الجذر سالبًا. محور Y: x = 0؛ محور X: y = 0.' },
        change: { eu: 'Irakurri ezkerretik eskuinera eta eman tarteak x-ren balioekin. BAT = (f(b) − f(a)) / (b − a), ordena berean.', es: 'Lee de izquierda a derecha y da los intervalos con valores de x. T.V.M. = (f(b) − f(a)) / (b − a), en el mismo orden.', ar: 'اقرأ من اليسار إلى اليمين وأعطِ الفترات بقيم x. المعدل = (f(b) − f(a)) / (b − a) بالترتيب نفسه.' },
        properties: { eu: 'Puntu hutsa ez dago grafikoan. Periodikoetan, kendu periodoa lehen periodora iritsi arte.', es: 'Un punto hueco no está en la gráfica. En las periódicas, quita el periodo hasta llegar al primer periodo.', ar: 'النقطة الفارغة ليست على الرسم. في الدورية اطرح الدور حتى تصل إلى الدور الأول.' },
        study: { eu: 'Begiratu ardatzen unitateak eta lauki bakoitzaren balioa. Problemetan, aukeratu x eta idatzi dena x-ren arabera.', es: 'Mira las unidades de los ejes y cuánto vale cada cuadro. En los problemas, elige x y escribe todo en función de x.', ar: 'انظر إلى وحدات المحاور وقيمة كل خانة. في المسائل اختر x واكتب كل شيء بدلالتها.' }
    }
}

export function FuntzioakDbh4ApIntroPage() {
    return <UnitPage unit={funtzioakUnit} />
}

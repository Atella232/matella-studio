import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { functionsChallenges, functionsDiagnostic, functionsExerciseBank, functionsPractice } from './content'
import { FunctionsHeroArt } from './figures'
import { withGraphs } from './withGraphs'
import { FunctionsLaboratory } from './lab'
import { FunctionsGames } from './games'
import { FUNCTIONS_GAME_RECORDS_KEY, functionsGameProgressIds } from './games/info'
import { functionsLabChallengeIds, functionsLabToolForTopic, functionsLabTools } from './lab/labTools'
import { functionsStages, functionsTopics } from './lessons'
import './Functions.css'

const funtzioakUnit: UnitDefinition = {
    storagePrefix: 'matella-funtzioak-dbh2',
    coursePath: '/matematika/dbh2',
    courseTitle: { eu: '2. DBH', es: '2.º ESO', en: '2nd ESO', ar: 'الصف الثاني' },
    title: { eu: 'Funtzioak', es: 'Funciones', en: 'Functions', ar: 'الدوال' },
    documentTitle: { eu: 'Funtzioak · 2. DBH', es: 'Funciones · 2.º ESO', en: 'Functions · 2nd ESO', ar: 'الدوال · الصف الثاني' },
    tagline: {
        eu: 'Koordenatuetatik zuzenen ekuazioetara: ikasi funtzioak taula, formula eta grafiko bidez adierazten, grafikoak irakurtzen eta y = mx + n zuzenak aztertzen.',
        es: 'De las coordenadas a las ecuaciones de las rectas: aprende a representar funciones con tablas, fórmulas y gráficas, a leer gráficas y a estudiar las rectas y = mx + n.',
        en: 'From coordinates to the equations of straight lines: learn to represent functions with tables, formulas and graphs, to read graphs and to study the straight lines y = mx + n.',
        ar: 'من الإحداثيات إلى معادلات الخطوط: تعلّم تمثيل الدوال بالجداول والصيغ والرسوم، وقراءة الرسوم البيانية، ودراسة الخطوط y = mx + n.'
    },
    heroArt: <FunctionsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, koordenatuetatik zuzenen ekuaziora', es: 'Cinco etapas, de las coordenadas a la ecuación de la recta', en: 'Five stages, from coordinates to the equation of a straight line', ar: 'خمس مراحل، من الإحداثيات إلى معادلة الخط' },
    stages: functionsStages,
    topics: functionsTopics,
    diagnostic: withGraphs(functionsDiagnostic),
    guidedPractice: withGraphs(functionsPractice),
    exerciseBank: functionsExerciseBank.map((section) => ({ ...section, items: withGraphs(section.items) })),
    challenges: withGraphs(functionsChallenges),
    lab: {
        description: {
            eu: `${functionsLabTools.length} tresna: koordenatuak kokatu, funtzioak sailkatu, taulak eta formulak erabili, grafikoak irakurri, maldak neurtu eta zuzenak marraztu, erronkekin.`,
            es: `${functionsLabTools.length} herramientas: situar coordenadas, clasificar funciones, usar tablas y fórmulas, leer gráficas, medir pendientes y dibujar rectas, con retos.`,
            en: `${functionsLabTools.length} tools: plot coordinates, classify functions, use tables and formulas, read graphs, measure slopes and draw straight lines, with challenges.`,
            ar: `${functionsLabTools.length} أدوات: تحديد الإحداثيات وتصنيف الدوال واستعمال الجداول والصيغ وقراءة الرسوم وقياس الميول ورسم الخطوط، مع تحديات.`
        },
        progressIds: functionsLabChallengeIds,
        toolForTopic: functionsLabToolForTopic,
        render: (props) => <FunctionsLaboratory {...props} />
    },
    games: {
        description: { eu: 'Hiru joko: lasterketa, puntuak planoan kokatu eta memoria.', es: 'Tres juegos: carrera, situar puntos en el plano y memoria.', en: 'Three games: race, plot points on the grid and memory.', ar: 'ثلاث ألعاب: السباق ووضع النقاط في المستوى والذاكرة.' },
        progressIds: functionsGameProgressIds,
        recordsKey: FUNCTIONS_GAME_RECORDS_KEY,
        render: (props) => <FunctionsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2.', es: 'Escribe un número: 5, −3, 1,5 o 3/2.', en: 'Write a number: 5, −3, 1.5 or 3/2.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', en: 'E.g.: −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 3/2.' }
    },
    errorByStage: {
        idea: { eu: 'Koordenatuetan lehenengo x dator (horizontala) eta gero y (bertikala). Funtzio batean, sarrera bakoitzak irteera bakarra du.', es: 'En las coordenadas va primero x (horizontal) y después y (vertical). En una función, cada entrada tiene una sola salida.', en: 'In coordinates, x comes first (horizontal) and then y (vertical). In a function, each input has only one output.', ar: 'في الإحداثيات يأتي x أولًا (أفقي) ثم y (رأسي). وفي الدالة لكل مدخل مخرج واحد.' },
        representations: { eu: 'Ordeztu x parentesi artean, egin eragiketak hierarkiaren arabera (berreturak lehenik) eta lotu sarrera bakoitza bere y balioarekin.', es: 'Sustituye x entre paréntesis, opera según la jerarquía (primero las potencias) y empareja cada entrada con su valor de y.', en: 'Put x in brackets, work it out following the order of operations (powers first) and pair each input with its y-value.', ar: 'عوّض x بين قوسين، وأجرِ العمليات بحسب الأولويات (القوى أولًا)، واربط كل مدخل بقيمة y المقابلة.' },
        reading: { eu: 'Begiratu lehenik ardatzak eta eskala; gero irakurri kurba ezkerretik eskuinera. Tarteak x balioekin ematen dira.', es: 'Mira primero los ejes y la escala; después lee la curva de izquierda a derecha. Los tramos se dan con valores de x.', en: 'First look at the axes and the scale; then read the curve from left to right. Intervals are given in terms of x-values.', ar: 'انظر أولًا إلى المحاور والتدريج ثم اقرأ المنحنى من اليسار إلى اليمين. تُعطى الفترات بقيم x.' },
        proportional: { eu: 'Malda = y-ren aldaketa / x-ren aldaketa, bi puntuetan ordena berean. Proportzionaltasun zuzena: y = mx, jatorritik pasatzen da.', es: 'Pendiente = cambio de y / cambio de x, restando los dos puntos en el mismo orden. Proporcionalidad directa: y = mx, pasa por el origen.', en: 'Slope = change in y / change in x, subtracting the two points in the same order. Direct proportion: y = mx, passes through the origin.', ar: 'الميل = تغير y ÷ تغير x بطرح النقطتين بالترتيب نفسه. التناسب الطردي: y = mx ويمر بنقطة الأصل.' },
        lines: { eu: 'y = mx + n formulan, m malda da eta n Y ardatzeko ebakidura (x = 0). Ebakidura X ardatzarekin: y = 0 jarri eta x askatu.', es: 'En y = mx + n, m es la pendiente y n el corte con el eje Y (x = 0). Corte con el eje X: pon y = 0 y despeja x.', en: 'In y = mx + n, m is the slope and n is the y-intercept (x = 0). To find the x-intercept, put y = 0 and solve for x.', ar: 'في y = mx + n يمثّل m الميل وn التقاطع مع محور Y (x = 0). للتقاطع مع محور X ضع y = 0 واعزل x.' }
    }
}

export function FuntzioakDBH2Page() {
    return <UnitPage unit={funtzioakUnit} />
}

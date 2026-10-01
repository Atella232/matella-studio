import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { FunctionsHeroArt } from './figures'
import { functionsStages, functionsTopics } from './lessons'
import './Functions.css'

const funtzioakUnit: UnitDefinition = {
    storagePrefix: 'matella-funtzioak-dbh2',
    coursePath: '/matematika/dbh2',
    courseTitle: { eu: '2. DBH', es: '2.º ESO', ar: 'الصف الثاني' },
    title: { eu: 'Funtzioak', es: 'Funciones', ar: 'الدوال' },
    documentTitle: { eu: 'Funtzioak · 2. DBH', es: 'Funciones · 2.º ESO', ar: 'الدوال · الصف الثاني' },
    tagline: {
        eu: 'Koordenatuetatik zuzenen ekuazioetara: ikasi funtzioak taula, formula eta grafiko bidez adierazten, grafikoak irakurtzen eta y = mx + n zuzenak aztertzen.',
        es: 'De las coordenadas a las ecuaciones de las rectas: aprende a representar funciones con tablas, fórmulas y gráficas, a leer gráficas y a estudiar las rectas y = mx + n.',
        ar: 'من الإحداثيات إلى معادلات الخطوط: تعلّم تمثيل الدوال بالجداول والصيغ والرسوم، وقراءة الرسوم البيانية، ودراسة الخطوط y = mx + n.'
    },
    heroArt: <FunctionsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, koordenatuetatik zuzenen ekuaziora', es: 'Cinco etapas, de las coordenadas a la ecuación de la recta', ar: 'خمس مراحل، من الإحداثيات إلى معادلة الخط' },
    stages: functionsStages,
    topics: functionsTopics,
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2.', es: 'Escribe un número: 5, −3, 1,5 o 3/2.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3 o 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 3/2.' }
    },
    errorByStage: {
        idea: { eu: 'Koordenatuetan lehenengo x dator (horizontala) eta gero y (bertikala). Funtzio batean, sarrera bakoitzak irteera bakarra du.', es: 'En las coordenadas va primero x (horizontal) y después y (vertical). En una función, cada entrada tiene una sola salida.', ar: 'في الإحداثيات يأتي x أولًا (أفقي) ثم y (رأسي). وفي الدالة لكل مدخل مخرج واحد.' },
        representations: { eu: 'Ordeztu x parentesi artean, egin eragiketak hierarkiaren arabera (berreturak lehenik) eta lotu sarrera bakoitza bere y balioarekin.', es: 'Sustituye x entre paréntesis, opera según la jerarquía (primero las potencias) y empareja cada entrada con su valor de y.', ar: 'عوّض x بين قوسين، وأجرِ العمليات بحسب الأولويات (القوى أولًا)، واربط كل مدخل بقيمة y المقابلة.' },
        reading: { eu: 'Begiratu lehenik ardatzak eta eskala; gero irakurri kurba ezkerretik eskuinera. Tarteak x balioekin ematen dira.', es: 'Mira primero los ejes y la escala; después lee la curva de izquierda a derecha. Los tramos se dan con valores de x.', ar: 'انظر أولًا إلى المحاور والتدريج ثم اقرأ المنحنى من اليسار إلى اليمين. تُعطى الفترات بقيم x.' },
        proportional: { eu: 'Malda = y-ren aldaketa / x-ren aldaketa, bi puntuetan ordena berean. Proportzionaltasun zuzena: y = mx, jatorritik pasatzen da.', es: 'Pendiente = cambio de y / cambio de x, restando los dos puntos en el mismo orden. Proporcionalidad directa: y = mx, pasa por el origen.', ar: 'الميل = تغير y ÷ تغير x بطرح النقطتين بالترتيب نفسه. التناسب الطردي: y = mx ويمر بنقطة الأصل.' },
        lines: { eu: 'y = mx + n formulan, m malda da eta n Y ardatzeko ebakidura (x = 0). Ebakidura X ardatzarekin: y = 0 jarri eta x askatu.', es: 'En y = mx + n, m es la pendiente y n el corte con el eje Y (x = 0). Corte con el eje X: pon y = 0 y despeja x.', ar: 'في y = mx + n يمثّل m الميل وn التقاطع مع محور Y (x = 0). للتقاطع مع محور X ضع y = 0 واعزل x.' }
    }
}

export function FuntzioakDBH2Page() {
    return <UnitPage unit={funtzioakUnit} />
}

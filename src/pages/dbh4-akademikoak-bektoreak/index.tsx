import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readVectorsAnswer } from './answers'
import { vectorsChallenges, vectorsDiagnostic, vectorsExerciseBank, vectorsPractice } from './content'
import { VectorsHeroArt } from './figures'
import { VectorsLaboratory } from './lab'
import { vectorsLabChallengeIds, vectorsLabToolForTopic, vectorsLabTools } from './lab/labTools'
import { vectorsStages, vectorsTopics } from './lessons'

const bektoreakUnit: UnitDefinition = {
    storagePrefix: 'matella-bektoreak-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Bektoreak eta zuzenak', es: 'Vectores y rectas', ar: 'المتجهات والمستقيمات' },
    documentTitle: { eu: 'Bektoreak eta zuzenak · 4. DBH', es: 'Vectores y rectas · 4.º ESO', ar: 'المتجهات والمستقيمات · الصف الرابع' },
    tagline: {
        eu: 'Bektoreak eta haien eragiketak, distantziak, erdiko puntuak eta lerrokatutako puntuak, zuzenaren ekuazioak, malda, zuzen paraleloak eta perpendikularrak, posizio erlatiboak, erdibitzailea, zirkunferentzia eta poligonoak.',
        es: 'Vectores y sus operaciones, distancias, puntos medios y puntos alineados, las ecuaciones de la recta, la pendiente, rectas paralelas y perpendiculares, posiciones relativas, la mediatriz, la circunferencia y los polígonos.',
        ar: 'المتجهات وعملياتها، والمسافات والمنتصفات والنقاط المستقيمة، ومعادلات المستقيم، والميل، والمستقيمات المتوازية والمتعامدة، والأوضاع النسبية، ومحور القطعة، والدائرة، والمضلعات.'
    },
    heroArt: <VectorsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, bektoretik zirkunferentziara', es: 'Cinco etapas, del vector a la circunferencia', ar: 'خمس مراحل، من المتجه إلى الدائرة' },
    stages: vectorsStages,
    topics: vectorsTopics,
    diagnostic: vectorsDiagnostic,
    guidedPractice: vectorsPractice,
    exerciseBank: vectorsExerciseBank,
    challenges: vectorsChallenges,
    lab: {
        description: {
            eu: `${vectorsLabTools.length} tresna, erronkekin: A-tik B-rako bektorea, a · u + b · v konbinazioa, zuzenkiaren luzera eta erdiko puntua, hirugarren puntua, puntua, norabidea eta t, zuzen bera forma guztietan, malda, bigarren zuzena, erdibitzailea, eta zirkunferentzia eta puntu bat.`,
            es: `${vectorsLabTools.length} herramientas con retos: el vector de A a B, la combinación a · u + b · v, longitud y punto medio de un segmento, el tercer punto, punto, dirección y t, la misma recta en todas sus formas, la pendiente, la segunda recta, la mediatriz, y una circunferencia y un punto.`,
            ar: `${vectorsLabTools.length} أدوات مع تحديات: المتجه من A إلى B، والتركيب a · u + b · v، وطول القطعة ومنتصفها، والنقطة الثالثة، ونقطة واتجاه وt، والمستقيم نفسه بكل صيغه، والميل، والمستقيم الثاني، ومحور القطعة، ودائرة ونقطة.`
        },
        progressIds: vectorsLabChallengeIds,
        toolForTopic: vectorsLabToolForTopic,
        render: (props) => <VectorsLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bakar bat: eskatzen den koordenatua, luzera, malda edo parametroa. Adibidez 5, −3, 2,5 edo 4/3.', es: 'Escribe un solo número: la coordenada, la longitud, la pendiente o el parámetro que se pide. Por ejemplo 5, −3, 2,5 o 4/3.', ar: 'اكتب عددًا واحدًا: الإحداثي أو الطول أو الميل أو الوسيط المطلوب. مثلًا 5 أو ⁦−3⁩ أو 2.5 أو 4/3.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readVectorsAnswer,
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bakar bat, adibidez −3, 2,5 edo 4/3.', es: 'No entiendo esa respuesta. Escribe un solo número, por ejemplo −3, 2,5 o 4/3.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا واحدًا، مثل ⁦−3⁩ أو 2.5 أو 4/3.' }
    },
    errorByStage: {
        vectors: { eu: 'Koordenatuak: muturra ken jatorria, ez alderantziz. Modulua: √(x² + y²). Bider zenbaki bat: bi koordenatuak.', es: 'Coordenadas: extremo menos origen, no al revés. Módulo: √(x² + y²). Por un número: las dos coordenadas.', ar: 'المركّبتان: الطرف ناقص الأصل لا العكس. الطول: √(x² + y²). الضرب في عدد: المركّبتان معًا.' },
        points: { eu: 'Erdiko puntua: batu eta zatitu 2. Simetrikoa: 2P − A. Distantzia: kendurak karratura, batu eta erroa.', es: 'Punto medio: suma y divide entre 2. Simétrico: 2P − A. Distancia: diferencias al cuadrado, suma y raíz.', ar: 'المنتصف: اجمع واقسم على 2. النظيرة: 2P − A. المسافة: ربّع الفرقين واجمع وخذ الجذر.' },
        equations: { eu: 'Norabide-bektorea (d₁, d₂) bada, malda d₂ / d₁ da. Ardatzekiko ebakidurak: x = 0 edo y = 0.', es: 'Si el vector director es (d₁, d₂), la pendiente es d₂ / d₁. Cortes con los ejes: x = 0 o y = 0.', ar: 'إذا كان متجه التوجيه (d₁, d₂) فالميل d₂ / d₁. التقاطع مع المحورين: x = 0 أو y = 0.' },
        positions: { eu: 'Malda: ordenatuen kendura zati abzisen kendura, ordena berean. Perpendikularra: −1/m.', es: 'Pendiente: diferencia de ordenadas entre diferencia de abscisas, en el mismo orden. Perpendicular: −1/m.', ar: 'الميل: فرق الصادات على فرق السينات بالترتيب نفسه. العمودي: −1/m.' },
        applications: { eu: 'Erdibitzailea: erdiko puntutik eta perpendikularra. Zirkunferentzia: (x − a)² + (y − b)² = r²; kontuz zeinuekin.', es: 'Mediatriz: por el punto medio y perpendicular. Circunferencia: (x − a)² + (y − b)² = r²; cuidado con los signos.', ar: 'المحور: من المنتصف وعموديًا. الدائرة: (x − a)² + (y − b)² = r²؛ انتبه للإشارات.' }
    }
}

export function BektoreakDbh4AkIntroPage() {
    return <UnitPage unit={bektoreakUnit} />
}

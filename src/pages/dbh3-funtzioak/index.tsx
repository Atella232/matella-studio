import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import '../dbh2-funtzioak-v2/Functions.css'
import { GraphsHeroArt } from '../dbh4-aplikatuak-grafikoa/figures'
import { functions3Challenges, functions3Diagnostic, functions3ExerciseBank, functions3Practice } from './content'
import { Functions3Games } from './games'
import { FUNCTIONS3_GAME_RECORDS_KEY, functions3GameProgressIds } from './games/info'
import { Functions3Laboratory } from './lab'
import { functions3LabChallengeIds, functions3LabToolForTopic, functions3LabTools } from './lab/labTools'
import { functions3Stages, functions3Topics } from './lessons'

const functionsUnit: UnitDefinition = {
    storagePrefix: 'matella-funtzioak-dbh3',
    coursePath: '/matematika/dbh3',
    courseTitle: { eu: '3. DBH', es: '3.º ESO', en: '3rd ESO', ar: 'الصف الثالث' },
    title: { eu: 'Funtzioak', es: 'Funciones', en: 'Functions', ar: 'الدوال' },
    documentTitle: { eu: 'Funtzioak · 3. DBH', es: 'Funciones · 3.º ESO', en: 'Functions · 3rd ESO', ar: 'الدوال · الصف الثالث' },
    tagline: {
        eu: 'Grafikoetatik parabolara: irakurri grafikoak, ezaugarriak, malda, zuzenak, tarifak, erpina eta ebaki-puntuak.',
        es: 'De las gráficas a la parábola: leer gráficas, características, pendiente, rectas, tarifas, vértice y cortes.',
        en: 'From graphs to the parabola: reading graphs, features, slope, lines, prices, the vertex and the cuts.',
        ar: 'من التمثيلات البيانية إلى القطع المكافئ: قراءة التمثيلات والخصائص والميل والمستقيمات والتعريفات والرأس والتقاطعات.'
    },
    heroArt: <GraphsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, grafikoetatik parabolara', es: 'Cinco etapas, de las gráficas a la parábola', en: 'Five stages, from graphs to the parabola', ar: 'خمس مراحل، من التمثيلات إلى القطع المكافئ' },
    stages: functions3Stages,
    topics: functions3Topics,
    diagnostic: functions3Diagnostic,
    guidedPractice: functions3Practice,
    exerciseBank: functions3ExerciseBank,
    challenges: functions3Challenges,
    lab: {
        description: {
            eu: `${functions3LabTools.length} tresna: ibilaldia, taxia, bi tarifa, jaurtiketa eta beste bederatzi, erronkekin.`,
            es: `${functions3LabTools.length} herramientas: el paseo, el taxímetro, dos tarifas, el lanzamiento y nueve más, con retos.`,
            en: `${functions3LabTools.length} tools: the walk, the taxi meter, two plans, the throw and nine more, with challenges.`,
            ar: `${functions3LabTools.length} أداة: النزهة وعدّاد سيارة الأجرة والتعريفتان والرمية وتسع أخرى، مع تحديات.`
        },
        progressIds: functions3LabChallengeIds,
        toolForTopic: functions3LabToolForTopic,
        render: (props) => <Functions3Laboratory {...props} />
    },
    games: {
        description: {
            eu: 'Sei joko: lasterketa, zein grafiko da, ibilaldiaren istorioa, zeinuen ehiztaria, funtzioen detektibea eta memoria.',
            es: 'Seis juegos: carrera, qué gráfica es, la historia del paseo, cazador de signos, el detective de funciones y memoria.',
            en: 'Six games: race, which graph it is, the story of a walk, sign hunter, the functions detective and memory.',
            ar: 'ست ألعاب: السباق وأي تمثيل هذا وقصة النزهة وصائد الإشارات ومخبر الدوال والذاكرة.'
        },
        progressIds: functions3GameProgressIds,
        recordsKey: FUNCTIONS3_GAME_RECORDS_KEY,
        render: (props) => <Functions3Games {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3 edo 2,5. Unitaterik gabe.', es: 'Escribe un número: 5, −3 o 2,5. Sin unidades.', en: 'Write a number: 5, −3 or 2.5. Without units.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 2.5. دون وحدات.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', en: 'e.g. −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 5 edo −3.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 5 o −3.', en: 'I don\'t understand that answer. Write a number, for example 5 or −3.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 5 أو ⁦−3⁩.' }
    },
    errorByStage: {
        graphs: { eu: 'Negatiboa parentesi artean: (−3)² = 9. Eremua: x ardatza; ibilbidea: y ardatza.', es: 'El negativo entre paréntesis: (−3)² = 9. Dominio: eje x; recorrido: eje y.', en: 'Negatives in brackets: (−3)² = 9. Domain: x axis; range: y axis.', ar: 'السالب بين قوسين: (−3)² = 9. المجال: محور x؛ المدى: محور y.' },
        features: { eu: 'Tarteak x ardatzean. X ardatza: y = 0. Maximoa puntu bat da: (x, y).', es: 'Intervalos en el eje x. Eje X: y = 0. El máximo es un punto: (x, y).', en: 'Intervals on the x axis. X axis: y = 0. A maximum is a point: (x, y).', ar: 'الفترات على محور x. محور X: y = 0. العظمى نقطة: (x, y).' },
        linear: { eu: 'Malda: (y₂ − y₁) : (x₂ − x₁), ordena bera. y = mx + n: n Y ardatzean.', es: 'Pendiente: (y₂ − y₁) : (x₂ − x₁), mismo orden. y = mx + n: n en el eje Y.', en: 'Slope: (y₂ − y₁) ÷ (x₂ − x₁), same order. y = mx + n: n on the Y axis.', ar: 'الميل: (y₂ − y₁) ÷ (x₂ − x₁) بالترتيب نفسه. y = mx + n: n على محور Y.' },
        lines: { eu: 'n kalkulatzeko, ordezkatu puntua. Paraleloak: m bera. Ebakidura: berdindu.', es: 'Para hallar n, sustituye el punto. Paralelas: misma m. Corte: igualar.', en: 'To find n, substitute the point. Parallel: same m. Crossing: set equal.', ar: 'لإيجاد n عوّض النقطة. المتوازيان: m نفسه. التقاطع: المساواة.' },
        quadratic: { eu: 'Erpina: x = −b : 2a, minus eta 2 barne. a > 0: gora; a < 0: behera.', es: 'Vértice: x = −b : 2a, con el menos y el 2. a > 0: arriba; a < 0: abajo.', en: 'Vertex: x = −b ÷ 2a, with the minus and the 2. a > 0: up; a < 0: down.', ar: 'الرأس: x = −b ÷ 2a بالسالب و2. a > 0: إلى الأعلى؛ a < 0: إلى الأسفل.' }
    }
}

export function FuntzioakDBH3Page() {
    return <UnitPage unit={functionsUnit} />
}

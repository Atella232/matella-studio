import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { StatisticsHeroArt } from '../dbh4-aplikatuak-estatistika/figures'
import { stats3Challenges, stats3Diagnostic, stats3ExerciseBank, stats3Practice } from './content'
import { Stats3Games } from './games'
import { STATS3_GAME_RECORDS_KEY, stats3GameProgressIds } from './games/info'
import { Stats3Laboratory } from './lab'
import { stats3LabChallengeIds, stats3LabToolForTopic, stats3LabTools } from './lab/labTools'
import { stats3Stages, stats3Topics } from './lessons'

const statisticsUnit: UnitDefinition = {
    storagePrefix: 'matella-estatistika-dbh3',
    coursePath: '/matematika/dbh3',
    courseTitle: { eu: '3. DBH', es: '3.º ESO', en: '3rd ESO', ar: 'الصف الثالث' },
    title: { eu: 'Estatistika eta probabilitatea', es: 'Estadística y probabilidad', en: 'Statistics and probability', ar: 'الإحصاء والاحتمالات' },
    documentTitle: { eu: 'Estatistika eta probabilitatea · 3. DBH', es: 'Estadística y probabilidad · 3.º ESO', en: 'Statistics and probability · 3rd ESO', ar: 'الإحصاء والاحتمالات · الصف الثالث' },
    tagline: {
        eu: 'Laginetatik ruletara: taulak, grafikoak, batez bestekoa, mediana, kuartilak, desbideratzea eta probabilitatea.',
        es: 'De las muestras a la ruleta: tablas, gráficos, media, mediana, cuartiles, desviación y probabilidad.',
        en: 'From samples to spinners: tables, charts, mean, median, quartiles, deviation and probability.',
        ar: 'من العيّنات إلى الدولاب: الجداول والمخططات والمتوسط والوسيط والربيعيات والانحراف والاحتمال.'
    },
    heroArt: <StatisticsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, datuetatik zorira', es: 'Cinco etapas, de los datos al azar', en: 'Five stages, from data to chance', ar: 'خمس مراحل، من البيانات إلى الصدفة' },
    stages: stats3Stages,
    topics: stats3Topics,
    diagnostic: stats3Diagnostic,
    guidedPractice: stats3Practice,
    exerciseBank: stats3ExerciseBank,
    challenges: stats3Challenges,
    lab: {
        description: {
            eu: `${stats3LabTools.length} tresna: lagina, ardatz engainagarria, zer nota behar dudan, ruleta eta beste hamar, erronkekin.`,
            es: `${stats3LabTools.length} herramientas: la muestra, el eje engañoso, qué nota necesito, la ruleta y diez más, con retos.`,
            en: `${stats3LabTools.length} tools: the sample, the misleading axis, which mark I need, the spinner and ten more, with challenges.`,
            ar: `${stats3LabTools.length} أداة: العيّنة والمحور المضلِّل والدرجة التي أحتاجها والدولاب وعشر أخرى، مع تحديات.`
        },
        progressIds: stats3LabChallengeIds,
        toolForTopic: stats3LabToolForTopic,
        render: (props) => <Stats3Laboratory {...props} />
    },
    games: {
        description: {
            eu: 'Sei joko: lasterketa, irakurri grafikoa, zer aldagai mota, zein poltsa, estatistikaren detektibea eta memoria.',
            es: 'Seis juegos: carrera, lee el gráfico, qué tipo de variable, qué bolsa, el detective de estadística y memoria.',
            en: 'Six games: race, read the chart, which kind of variable, which bag, the statistics detective and memory.',
            ar: 'ست ألعاب: السباق واقرأ المخطط وأي نوع من المتغيّرات وأي كيس ومخبر الإحصاء والذاكرة.'
        },
        progressIds: stats3GameProgressIds,
        recordsKey: STATS3_GAME_RECORDS_KEY,
        render: (props) => <Stats3Games {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat edo zatiki bat: 18, 1,8 edo 3/8. Ehunekoetan eta graduetan, zenbakia bakarrik.', es: 'Escribe un número o una fracción: 18, 1,8 o 3/8. En porcentajes y grados, solo el número.', en: 'Write a number or a fraction: 18, 1.8 or 3/8. For percentages and degrees, only the number.', ar: 'اكتب عددًا أو كسرًا: 18 أو 1.8 أو 3/8. وفي النسب المئوية والدرجات اكتب العدد فقط.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 3/8', es: 'Ej.: 3/8', en: 'E.g.: 3/8', ar: 'مثال: 3/8' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki edo zatiki gisa.', es: 'El valor es correcto, pero escríbelo como número o fracción.', en: 'The value is correct, but write it as a number or a fraction.', ar: 'القيمة صحيحة، لكن اكتبها عددًا أو كسرًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat: 18, 1,8 edo 3/8.', es: 'No entiendo esa respuesta. Escribe un número o una fracción: 18, 1,8 o 3/8.', en: 'I don\'t understand that answer. Write a number or a fraction: 18, 1.8 or 3/8.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا: 18 أو 1.8 أو 3/8.' }
    },
    errorByStage: {
        data: { eu: 'hᵢ = fᵢ zati N. Fᵢ: aurreko metatua gehi fᵢ. Klase-marka: tartearen erdia.', es: 'hᵢ = fᵢ entre N. Fᵢ: la acumulada anterior más fᵢ. Marca de clase: el medio del intervalo.', en: 'hᵢ = fᵢ divided by N. Fᵢ: the previous cumulative plus fᵢ. Class midpoint: the middle of the interval.', ar: 'hᵢ = fᵢ على N. Fᵢ: المتجمّع السابق زائد fᵢ. مركز الفئة: منتصف الفترة.' },
        charts: { eu: 'Angelua: f zati N bider 360°. Begiratu ardatza 0-tik hasten den.', es: 'Ángulo: f entre N por 360°. Mira si el eje empieza en 0.', en: 'Angle: f over N times 360°. Check whether the axis starts at 0.', ar: 'الزاوية: f على N في 360°. انظر هل يبدأ المحور من 0.' },
        centre: { eu: 'Batez bestekoa: Σ xᵢ·fᵢ zati N. Mediana: ordenatu lehenik. Moda: balioa, ez maiztasuna.', es: 'Media: Σ xᵢ·fᵢ entre N. Mediana: ordena primero. Moda: el valor, no la frecuencia.', en: 'Mean: Σ xᵢ·fᵢ over N. Median: sort first. Mode: the value, not the frequency.', ar: 'المتوسط: Σ xᵢ·fᵢ على N. الوسيط: رتّب أولًا. المنوال: القيمة لا التكرار.' },
        spread: { eu: 'Ibiltartea: handiena − txikiena. Q₁: N : 4. σ: bariantzaren erro karratua.', es: 'Recorrido: mayor − menor. Q₁: N : 4. σ: raíz cuadrada de la varianza.', en: 'Range: largest − smallest. Q₁: N ÷ 4. σ: square root of the variance.', ar: 'المدى: الأكبر − الأصغر. Q₁: N ÷ 4. σ: جذر التباين.' },
        chance: { eu: 'P = aldekoak : posibleak. P(Ā) = 1 − P(A). Itzuli gabe: bola bat gutxiago.', es: 'P = favorables : posibles. P(Ā) = 1 − P(A). Sin devolver: una bola menos.', en: 'P = favourable ÷ possible. P(Ā) = 1 − P(A). Without putting back: one ball fewer.', ar: 'P = المواتية ÷ الممكنة. P(Ā) = 1 − P(A). دون إرجاع: كرة أقل.' }
    }
}

export function EstatistikaDBH3Page() {
    return <UnitPage unit={statisticsUnit} />
}

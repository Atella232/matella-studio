import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { bachStatsChallenges, bachStatsDiagnostic, bachStatsExerciseBank, bachStatsPractice } from './content'
import { BachStatsHeroArt } from './figures'
import { BachStatsGames } from './games'
import { BACH_STATS_GAME_RECORDS_KEY, bachStatsGameProgressIds } from './games/info'
import { BachStatsLaboratory } from './lab'
import { bachStatsLabChallengeIds, bachStatsLabToolForTopic, bachStatsLabTools } from './lab/labTools'
import { bachStatsStages, bachStatsTopics } from './lessons'

const estatistikaBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-estatistika-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Estatistika unidimentsionala', es: 'Estadística unidimensional', en: 'One-variable statistics', ar: 'الإحصاء أحادي المتغير' },
    documentTitle: { eu: 'Estatistika unidimentsionala · Batxilergoa 1', es: 'Estadística unidimensional · 1.º Bachillerato', en: 'One-variable statistics · 1st Bachillerato', ar: 'الإحصاء أحادي المتغير · البكالوريا الأولى' },
    tagline: {
        eu: 'Taulak, tarteak eta grafikoak, zentralizazio- eta posizio-neurriak, asimetria, sakabanatzea, datu atipikoak, puntuazio tipikoak eta datuak aldatzean zer gertatzen den.',
        es: 'Tablas, intervalos y gráficos, medidas de centralización y de posición, asimetría, dispersión, datos atípicos, puntuaciones típicas y qué pasa al transformar los datos.',
        en: 'Tables, intervals and charts, measures of centre and position, skewness, spread, outliers, standard scores and what happens when the data are transformed.',
        ar: 'الجداول والفئات والرسوم، ومقاييس النزعة المركزية والموضع، والالتواء، والتشتت، والقيم الشاذة، والدرجات المعيارية، وما يحدث عند تحويل البيانات.'
    },
    heroArt: <BachStatsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, taulatik puntuazio tipikora', es: 'Cinco etapas, de la tabla a la puntuación típica', en: 'Five stages, from the table to the standard score', ar: 'خمس مراحل، من الجدول إلى الدرجة المعيارية' },
    stages: bachStatsStages,
    topics: bachStatsTopics,
    diagnostic: bachStatsDiagnostic,
    guidedPractice: bachStatsPractice,
    exerciseBank: bachStatsExerciseBank,
    challenges: bachStatsChallenges,
    lab: {
        description: {
            eu: `${bachStatsLabTools.length} tresna, erronkekin: puntuazio tipikoa, atipikoa ala ez eta histogramaren isatsa, berriak; eta 4. DBHko maiztasun metatuak, tarteak, batez bestekoa, mediana eta moda, histograma, bi taldeen balantza, pertzentilen zinta, biboteak, distantziak eta karratuak, taula baten σ eta a · x + b, eta 3. DBHko ardatz engainagarria.`,
            es: `${bachStatsLabTools.length} herramientas con retos: la puntuación típica, ¿atípico o no? y la cola del histograma, nuevas; y de 4.º ESO, frecuencias acumuladas, intervalos, media, mediana y moda, histograma, la balanza de dos grupos, la cinta de los percentiles, los bigotes, distancias y cuadrados, la σ de una tabla y a · x + b, y el eje engañoso de 3.º ESO.`,
            en: `${bachStatsLabTools.length} tools with challenges: the standard score, outlier or not? and the tail of the histogram, new; and from 4th ESO, cumulative frequencies, intervals, mean, median and mode, the histogram, the two-group balance, the percentile tape, the whiskers, distances and squares, the σ of a table and a · x + b, and the misleading axis from 3rd ESO.`,
            ar: `${bachStatsLabTools.length} أداة مع تحديات: الدرجة المعيارية وشاذ أم لا وذيل المدرّج، وهي جديدة؛ ومن الصف الرابع: التكرارات المتجمّعة والفئات والمتوسط والوسيط والمنوال والمدرّج وميزان المجموعتين وشريط المئينات والشاربان والمسافات والمربعات وσ لجدول وa · x + b؛ والمحور المضلِّل من الصف الثالث.`
        },
        progressIds: bachStatsLabChallengeIds,
        toolForTopic: bachStatsLabToolForTopic,
        render: (props) => <BachStatsLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Sei joko: lasterketa, nork nabarmentzen du gehiago, zein histograma, estatistikaren detektibea eta memoria, berriak; eta 4. DBHko kutxa-diagrama eraikitzea.',
            es: 'Seis juegos: carrera, ¿quién destaca más?, ¿qué histograma?, detective de estadística y memoria, nuevos; y de 4.º ESO, construye el diagrama de caja.',
            en: 'Six games: race, who stands out more?, which histogram?, statistics detective and memory, new; and from 4th ESO, build the box plot.',
            ar: 'ست ألعاب: السباق ومن يتميّز أكثر وأي مدرّج ومخبر الإحصاء والذاكرة، وهي جديدة؛ ومن الصف الرابع: ارسم مخطط الصندوق.'
        },
        progressIds: bachStatsGameProgressIds,
        recordsKey: BACH_STATS_GAME_RECORDS_KEY,
        render: (props) => <BachStatsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −2, 0,15 edo 3/4. Ehunekoak, % ikurrik gabe.', es: 'Escribe un número: 5, −2, 0,15 o 3/4. Los porcentajes, sin el signo %.', en: 'Write a number: 5, −2, 0.15 or 3/4. Percentages without the % sign.', ar: 'اكتب عددًا: 5 أو ⁦−2⁩ أو 0.15 أو 3/4. والنسب المئوية بلا علامة ٪.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 0,15', es: 'Ej.: 0,15', en: 'e.g. 0.15', ar: 'مثال: 0.15' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −2, 0,15 edo 3/4.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −2, 0,15 o 3/4.', en: 'I don\'t understand that answer. Write a number, for example −2, 0.15 or 3/4.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−2⁩ أو 0.15 أو 3/4.' }
    },
    errorByStage: {
        data: { eu: '$h_i=\\frac{f_i}{N}$, ez alderantziz. Klase-marka tartearen erdiko puntua da. Sektore baten angelua $h_i\\cdot 360^\\circ$ da.', es: '$h_i=\\frac{f_i}{N}$, no al revés. La marca de clase es el punto medio del intervalo. El ángulo de un sector es $h_i\\cdot 360^\\circ$.', en: '$h_i=\\frac{f_i}{N}$, not the other way round. The class mark is the midpoint of the interval. The angle of a sector is $h_i\\cdot 360^\\circ$.', ar: '$h_i=\\frac{f_i}{N}$ لا العكس. ومركز الفئة منتصفها. وزاوية القطاع $h_i\\cdot 360^\\circ$.' },
        centre: { eu: 'Ordenatu datuak mediana bilatu baino lehen. Tarteekin, erabili klase-markak. Batez bestekoak batura ematen du: $\\sum f_i x_i=N\\cdot\\bar{x}$.', es: 'Ordena los datos antes de buscar la mediana. Con intervalos, usa las marcas de clase. La media da la suma: $\\sum f_i x_i=N\\cdot\\bar{x}$.', en: 'Order the data before looking for the median. With intervals, use the class marks. The mean gives the sum: $\\sum f_i x_i=N\\cdot\\bar{x}$.', ar: 'رتّب البيانات قبل البحث عن الوسيط. ومع الفئات استعمل المراكز. والمتوسط يعطي المجموع: $\\sum f_i x_i=N\\cdot\\bar{x}$.' },
        position: { eu: '$N\\cdot\\frac{k}{100}$ posizioa osoa bada, datu horren eta hurrengoaren batez bestekoa; bestela, hurrengo datua. Biboteak ez dira beti muturretaraino iristen.', es: 'Si la posición $N\\cdot\\frac{k}{100}$ es entera, la media de ese dato y el siguiente; si no, el dato siguiente. Los bigotes no siempre llegan a los extremos.', en: 'If the position $N\\cdot\\frac{k}{100}$ is whole, the mean of that datum and the next; if not, the next datum. The whiskers do not always reach the ends.', ar: 'إذا كان الموضع $N\\cdot\\frac{k}{100}$ صحيحًا فمتوسط ذلك البيان والذي يليه، وإلا فالبيان التالي. ولا يصل الشاربان دائمًا إلى الطرفين.' },
        spread: { eu: 'Desbideratzeak zeinurik gabe hartzen dira. Bariantzaren formula praktikoan, ez ahaztu $-\\bar{x}^2$. $CV=\\frac{\\sigma}{\\bar{x}}$, ez alderantziz.', es: 'Las desviaciones se toman sin signo. En la fórmula práctica de la varianza no olvides el $-\\bar{x}^2$. $CV=\\frac{\\sigma}{\\bar{x}}$, no al revés.', en: 'Deviations are taken without sign. In the working formula for the variance, do not forget the $-\\bar{x}^2$. $CV=\\frac{\\sigma}{\\bar{x}}$, not the other way round.', ar: 'تؤخذ الانحرافات دون إشارة. وفي الصيغة العملية للتباين لا تنسَ $-\\bar{x}^2$. و$CV=\\frac{\\sigma}{\\bar{x}}$ لا العكس.' },
        interpretation: { eu: 'Erabili $\\sigma$, ez $\\sigma^2$, atipikoetan eta puntuazio tipikoetan. Zenbaki bat batzeak ez du $\\sigma$ aldatzen; biderkatzeak, bai.', es: 'Usa $\\sigma$, no $\\sigma^2$, en los atípicos y en las puntuaciones típicas. Sumar un número no cambia $\\sigma$; multiplicar, sí.', en: 'Use $\\sigma$, not $\\sigma^2$, for outliers and standard scores. Adding a number does not change $\\sigma$; multiplying does.', ar: 'استعمل $\\sigma$ لا $\\sigma^2$ في القيم الشاذة والدرجات المعيارية. وإضافة عدد لا تغيّر $\\sigma$، أما الضرب فيغيّره.' }
    }
}

export function EstatistikaBatx1zIntroPage() {
    return <UnitPage unit={estatistikaBatx1zUnit} />
}

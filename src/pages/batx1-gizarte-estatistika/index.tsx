import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { socialStatsChallenges, socialStatsDiagnostic, socialStatsExerciseBank, socialStatsPractice } from './content'
import { SocialStatsHeroArt } from './figures'
import { SocialStatsGames } from './games'
import { SOCIAL_STATS_GAME_RECORDS_KEY, socialStatsGameProgressIds } from './games/info'
import { SocialStatsLaboratory } from './lab'
import { socialStatsLabChallengeIds, socialStatsLabToolForTopic, socialStatsLabTools } from './lab/labTools'
import { socialStatsStages, socialStatsTopics } from './lessons'

const estatistikaBatx1gUnit: UnitDefinition = {
    storagePrefix: 'matella-estatistika-batx1g',
    coursePath: '/matematika/batx1-gizarte',
    courseTitle: { eu: 'Batxilergoa 1 · Gizarte Zientziak', es: '1.º Bachillerato · Ciencias Sociales', en: '1st Bachillerato · Social Sciences', ar: 'البكالوريا الأولى · العلوم الاجتماعية' },
    title: { eu: 'Estatistika unidimentsionala', es: 'Estadística unidimensional', en: 'One-variable statistics', ar: 'الإحصاء أحادي المتغير' },
    documentTitle: { eu: 'Estatistika unidimentsionala · Batxilergoa 1 · Gizarte Zientziak', es: 'Estadística unidimensional · 1.º Bachillerato · Ciencias Sociales', en: 'One-variable statistics · 1st Bachillerato · Social Sciences', ar: 'الإحصاء أحادي المتغير · البكالوريا الأولى · العلوم الاجتماعية' },
    tagline: {
        eu: 'Taulak eta histogramak, batez bestekoa eta mediana, ehuneko metatuen poligonoa eta pertzentilak, sakabanatzea, eta zenbat pertsona dauden bi balioren artean: inkestetan, enpresetan eta lantegietan.',
        es: 'Tablas e histogramas, media y mediana, el polígono de porcentajes acumulados y los percentiles, la dispersión y cuántas personas hay entre dos valores: en encuestas, empresas y fábricas.',
        en: 'Tables and histograms, mean and median, the cumulative percentage polygon and percentiles, spread and how many people lie between two values: in surveys, companies and factories.',
        ar: 'الجداول والمدرّجات، والمتوسط والوسيط، ومضلّع النسب المتجمّعة والمئينات، والتشتت، وكم شخصًا بين قيمتين: في الاستطلاعات والشركات والمصانع.'
    },
    heroArt: <SocialStatsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, taulatik interpretaziora', es: 'Cinco etapas, de la tabla a la interpretación', en: 'Five stages, from the table to interpretation', ar: 'خمس مراحل، من الجدول إلى التفسير' },
    stages: socialStatsStages,
    topics: socialStatsTopics,
    diagnostic: socialStatsDiagnostic,
    guidedPractice: socialStatsPractice,
    exerciseBank: socialStatsExerciseBank,
    challenges: socialStatsChallenges,
    lab: {
        description: {
            eu: `${socialStatsLabTools.length} tresna, erronkekin: zabalera desberdinak, poligono metatua eta zenbat sartzen dira, berriak; eta 4. DBHko maiztasun metatuak, tarteak, batez bestekoa, mediana eta moda, histograma, bi taldeen balantza, pertzentilen zinta, biboteak eta taula baten σ.`,
            es: `${socialStatsLabTools.length} herramientas con retos: anchos distintos, el polígono acumulado y ¿cuántos caben?, nuevas; y de 4.º ESO, frecuencias acumuladas, intervalos, media, mediana y moda, histograma, la balanza de dos grupos, la cinta de los percentiles, los bigotes y la σ de una tabla.`,
            en: `${socialStatsLabTools.length} tools with challenges: different widths, the cumulative polygon and how many fit?, new; and from 4th ESO, cumulative frequencies, intervals, mean, median and mode, the histogram, the two-group balance, the percentile tape, the whiskers and the σ of a table.`,
            ar: `${socialStatsLabTools.length} أداة مع تحديات: أطوال مختلفة والمضلّع المتجمّع وكم يتّسع، وهي جديدة؛ ومن الصف الرابع: التكرارات المتجمّعة والفئات والمتوسط والوسيط والمنوال والمدرّج وميزان المجموعتين وشريط المئينات والشاربان وσ لجدول.`
        },
        progressIds: socialStatsLabChallengeIds,
        toolForTopic: socialStatsLabToolForTopic,
        render: (props) => <SocialStatsLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zazpi joko: lasterketa, kalitate-kontrola, ehizatu pertzentila, estatistikaren detektibea eta memoria, berriak; eta Zientzietako zein histograma eta 4. DBHko kutxa-diagrama eraikitzea.',
            es: 'Siete juegos: carrera, control de calidad, caza el percentil, detective de estadística y memoria, nuevos; y ¿qué histograma? de Ciencias y construye el diagrama de caja de 4.º ESO.',
            en: 'Seven games: race, quality control, hunt the percentile, statistics detective and memory, new; and which histogram? from Sciences and build the box plot from 4th ESO.',
            ar: 'سبع ألعاب: السباق ومراقبة الجودة واصطد المئين ومخبر الإحصاء والذاكرة، وهي جديدة؛ وأي مدرّج من العلوم وارسم مخطط الصندوق من الصف الرابع.'
        },
        progressIds: socialStatsGameProgressIds,
        recordsKey: SOCIAL_STATS_GAME_RECORDS_KEY,
        render: (props) => <SocialStatsGames {...props} />
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
        data: { eu: 'Histograma batean maiztasuna azalera da: zabalera desberdinekin, altuera $\\frac{f_i}{a_i}$. Klase-marka tartearen erdiko puntua da.', es: 'En un histograma la frecuencia es el área: con amplitudes distintas, la altura es $\\frac{f_i}{a_i}$. La marca de clase es el punto medio del intervalo.', en: 'In a histogram the frequency is the area: with different widths, the height is $\\frac{f_i}{a_i}$. The class mark is the midpoint of the interval.', ar: 'في المدرّج التكراري التكرار هو المساحة: مع أطوال مختلفة يكون الارتفاع $\\frac{f_i}{a_i}$. ومركز الفئة منتصفها.' },
        centre: { eu: 'Ordenatu datuak mediana bilatu baino lehen. Bi taldeen batez bestekoa ez da bien batez bestekoen erdia: batu guztizkoak.', es: 'Ordena los datos antes de buscar la mediana. La media de dos grupos no es la mitad de sus medias: suma los totales.', en: 'Order the data before looking for the median. The mean of two groups is not half of their means: add the totals.', ar: 'رتّب البيانات قبل البحث عن الوسيط. ومتوسط مجموعتين ليس نصف متوسطيهما: اجمع المجموعين.' },
        position: { eu: 'Poligonoaren puntuak goiko muturretan doaz. Interpolatzean, zatitu tartearen beraren ehunekoaz, $h_i$, ez metatuaz.', es: 'Los puntos del polígono van en los extremos superiores. Al interpolar, divide entre el porcentaje del propio intervalo, $h_i$, no entre el acumulado.', en: 'The points of the polygon go at the upper ends. When interpolating, divide by the percentage of the interval itself, $h_i$, not by the cumulative one.', ar: 'نقاط المضلّع عند الأطراف العليا. وعند الاستكمال اقسم على نسبة الفئة نفسها $h_i$ لا على المتجمّعة.' },
        spread: { eu: 'Bariantzaren formula praktikoan, ez ahaztu $-\\bar{x}^2$. $CV=\\frac{\\sigma}{\\bar{x}}$, ez alderantziz. Barrarik altuenak ez du sakabanatzea erabakitzen.', es: 'En la fórmula práctica de la varianza no olvides el $-\\bar{x}^2$. $CV=\\frac{\\sigma}{\\bar{x}}$, no al revés. La barra más alta no decide la dispersión.', en: 'In the working formula for the variance, do not forget the $-\\bar{x}^2$. $CV=\\frac{\\sigma}{\\bar{x}}$, not the other way round. The tallest bar does not decide the spread.', ar: 'في الصيغة العملية للتباين لا تنسَ $-\\bar{x}^2$. و$CV=\\frac{\\sigma}{\\bar{x}}$ لا العكس. والعمود الأعلى لا يحدّد التشتت.' },
        interpretation: { eu: 'Muga bat tarte baten erdian badago, haren datuen zati bat bakarrik zenbatzen da. Bandan $\\sigma$ erabiltzen da, ez $\\sigma^2$.', es: 'Si un límite cae en medio de un intervalo, solo se cuenta una parte de sus datos. En la banda se usa $\\sigma$, no $\\sigma^2$.', en: 'If a limit falls in the middle of an interval, only part of its data is counted. The band uses $\\sigma$, not $\\sigma^2$.', ar: 'إذا وقع حدّ في وسط فئة فلا نعدّ إلا جزءًا من بياناتها. وفي النطاق نستعمل $\\sigma$ لا $\\sigma^2$.' }
    }
}

export function EstatistikaBatx1gIntroPage() {
    return <UnitPage unit={estatistikaBatx1gUnit} />
}

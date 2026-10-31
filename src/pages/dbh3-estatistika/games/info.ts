import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Estatistika eta probabilitatea (3. DBH) games: the list shown in the
   hub, with levels and the unit progress id each level earns with its
   first star. Four games belong to this topic (read the chart, which kind
   of variable, which bag and the statistics detective); the race and the
   memory are shared engines. Level descriptions are plain text.
   ========================================================================== */

export type Stats3GameId = 'race' | 'read' | 'variable' | 'bags' | 'detective' | 'memory'

export const STATS3_GAME_RECORDS_KEY = 'matella-estatistika-dbh3-game-records'

export const stats3Games: GameInfo<Stats3GameId>[] = [
    {
        id: 'race',
        title: { eu: 'Estatistikaren lasterketa', es: 'Carrera de estadística', en: 'Statistics race', ar: 'سباق الإحصاء' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك وتجعلها الأخطاء تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 32101, stage: 'data', title: { eu: 'Taulak', es: 'Tablas', en: 'Tables', ar: 'الجداول' }, description: { eu: 'Ehunekoak, metatuak eta klase-markak.', es: 'Porcentajes, acumuladas y marcas de clase.', en: 'Percentages, cumulative frequencies and midpoints.', ar: 'النسب المئوية والتكرارات المتجمّعة ومراكز الفئات.' } },
            { progressId: 32102, stage: 'charts', title: { eu: 'Grafikoak', es: 'Gráficos', en: 'Charts', ar: 'المخططات' }, description: { eu: 'Graduak eta aldaketak.', es: 'Grados y variaciones.', en: 'Degrees and changes.', ar: 'الدرجات والتغيّرات.' } },
            { progressId: 32103, stage: 'centre', title: { eu: 'Erdigunea', es: 'Centro', en: 'Centre', ar: 'المركز' }, description: { eu: 'Batez bestekoa, mediana eta moda.', es: 'Media, mediana y moda.', en: 'Mean, median and mode.', ar: 'المتوسط والوسيط والمنوال.' } },
            { progressId: 32104, stage: 'spread', title: { eu: 'Sakabanaketa', es: 'Dispersión', en: 'Spread', ar: 'التشتت' }, description: { eu: 'Ibiltartea, kuartilak eta bariantza.', es: 'Recorrido, cuartiles y varianza.', en: 'Range, quartiles and variance.', ar: 'المدى والربيعيات والتباين.' } },
            { progressId: 32105, stage: 'chance', title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمال' }, description: { eu: 'Laplace eta bi ateratze.', es: 'Laplace y dos extracciones.', en: 'Laplace and two draws.', ar: 'لابلاس وسحبتان.' } }
        ]
    },
    {
        id: 'read',
        title: { eu: 'Irakurri grafikoa', es: 'Lee el gráfico', en: 'Read the chart', ar: 'اقرأ المخطط' },
        tagline: { eu: 'Barra-diagrama bat: aurkitu moda, mediana edo batez bestekoa.', es: 'Un diagrama de barras: encuentra la moda, la mediana o la media.', en: 'A bar chart: find the mode, the median or the mean.', ar: 'مخطط أعمدة: جد المنوال أو الوسيط أو المتوسط.' },
        skills: { eu: 'Zentralizazio-neurriak grafikoan', es: 'Medidas de centralización en el gráfico', en: 'Measures of centre on a chart', ar: 'مقاييس النزعة المركزية في المخطط' },
        levels: [
            { progressId: 32301, stage: 'centre', title: { eu: 'Moda', es: 'Moda', en: 'Mode', ar: 'المنوال' }, description: { eu: 'Barrarik altuena.', es: 'La barra más alta.', en: 'The tallest bar.', ar: 'أعلى عمود.' } },
            { progressId: 32302, stage: 'centre', title: { eu: 'Mediana', es: 'Mediana', en: 'Median', ar: 'الوسيط' }, description: { eu: 'Erdiko datua.', es: 'El dato central.', en: 'The middle datum.', ar: 'البيان الأوسط.' } },
            { progressId: 32303, stage: 'centre', title: { eu: 'Batez bestekoa', es: 'Media', en: 'Mean', ar: 'المتوسط' }, description: { eu: 'Maiztasunez biderkatuta.', es: 'Multiplicando por las frecuencias.', en: 'Multiplying by the frequencies.', ar: 'بالضرب في التكرارات.' } }
        ]
    },
    {
        id: 'variable',
        title: { eu: 'Zer aldagai mota?', es: '¿Qué tipo de variable?', en: 'Which kind of variable?', ar: 'أي نوع من المتغيّرات؟' },
        tagline: { eu: 'Inkesta baten galdera: sailkatu aldagaia eta aukeratu grafikoa.', es: 'La pregunta de una encuesta: clasifica la variable y elige el gráfico.', en: 'A survey question: classify the variable and choose the chart.', ar: 'سؤال استبيان: صنّف المتغيّر واختر المخطط.' },
        skills: { eu: 'Aldagaiak eta grafikoak', es: 'Variables y gráficos', en: 'Variables and charts', ar: 'المتغيّرات والمخططات' },
        levels: [
            { progressId: 32401, stage: 'data', title: { eu: 'Aldagaiak', es: 'Variables', en: 'Variables', ar: 'المتغيّرات' }, description: { eu: 'Kualitatiboa, diskretua ala jarraitua.', es: 'Cualitativa, discreta o continua.', en: 'Qualitative, discrete or continuous.', ar: 'نوعي أم منفصل أم متصل.' } },
            { progressId: 32402, stage: 'charts', title: { eu: 'Grafikoak', es: 'Gráficos', en: 'Charts', ar: 'المخططات' }, description: { eu: 'Barrak, histograma ala sektoreak.', es: 'Barras, histograma o sectores.', en: 'Bars, histogram or pie.', ar: 'أعمدة أم مدرّج أم دائري.' } },
            { progressId: 32403, stage: 'charts', title: { eu: 'Nahastuta', es: 'Mezclados', en: 'Mixed', ar: 'مختلطة' }, description: { eu: 'Aldagaiak eta grafikoak.', es: 'Variables y gráficos.', en: 'Variables and charts.', ar: 'المتغيّرات والمخططات.' } }
        ]
    },
    {
        id: 'bags',
        title: { eu: 'Zein poltsa?', es: '¿Qué bolsa?', en: 'Which bag?', ar: 'أي كيس؟' },
        tagline: { eu: 'Bi poltsa: zeinetan da probableagoa gorria ateratzea?', es: 'Dos bolsas: ¿en cuál es más probable sacar roja?', en: 'Two bags: in which is a red ball more likely?', ar: 'كيسان: في أيهما يكون سحب الحمراء أرجح؟' },
        skills: { eu: 'Probabilitateak konparatzea', es: 'Comparar probabilidades', en: 'Comparing probabilities', ar: 'مقارنة الاحتمالات' },
        levels: [
            { progressId: 32501, stage: 'chance', title: { eu: 'Bola kopuru bera', es: 'Mismo número de bolas', en: 'Same number of balls', ar: 'عدد الكرات نفسه' }, description: { eu: 'Zenbatu gorriak.', es: 'Cuenta las rojas.', en: 'Count the red ones.', ar: 'عُدّ الحمراء.' } },
            { progressId: 32502, stage: 'chance', title: { eu: 'Poltsa desberdinak', es: 'Bolsas distintas', en: 'Different bags', ar: 'أكياس مختلفة' }, description: { eu: 'Konparatu zatikiak.', es: 'Compara fracciones.', en: 'Compare fractions.', ar: 'قارن الكسور.' } },
            { progressId: 32503, stage: 'chance', title: { eu: 'Hiru kolore', es: 'Tres colores', en: 'Three colours', ar: 'ثلاثة ألوان' }, description: { eu: 'Gorria ala urdina.', es: 'Roja o azul.', en: 'Red or blue.', ar: 'الأحمر أو الأزرق.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Estatistikaren detektibea', es: 'Detective de estadística', en: 'Statistics detective', ar: 'مخبر الإحصاء' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Estatistikako akats tipikoak', es: 'Errores típicos de estadística', en: 'Common mistakes in statistics', ar: 'الأخطاء الشائعة في الإحصاء' },
        levels: [
            { progressId: 32601, stage: 'data', title: { eu: 'Taulak eta grafikoak', es: 'Tablas y gráficos', en: 'Tables and charts', ar: 'الجداول والمخططات' }, description: { eu: 'Maiztasunak, graduak eta klase-markak.', es: 'Frecuencias, grados y marcas de clase.', en: 'Frequencies, degrees and midpoints.', ar: 'التكرارات والدرجات ومراكز الفئات.' } },
            { progressId: 32602, stage: 'centre', title: { eu: 'Erdigunea', es: 'Centro', en: 'Centre', ar: 'المركز' }, description: { eu: 'Batez bestekoa, mediana eta moda.', es: 'Media, mediana y moda.', en: 'Mean, median and mode.', ar: 'المتوسط والوسيط والمنوال.' } },
            { progressId: 32603, stage: 'chance', title: { eu: 'Sakabanaketa eta zoria', es: 'Dispersión y azar', en: 'Spread and chance', ar: 'التشتت والصدفة' }, description: { eu: 'Desbideratzea eta probabilitateak.', es: 'Desviación y probabilidades.', en: 'Deviation and probabilities.', ar: 'الانحراف والاحتمالات.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu datu bakoitza bere neurriarekin.', es: 'Une cada conjunto de datos con su medida.', en: 'Match each set of data with its measure.', ar: 'صِل كل مجموعة بيانات بمقياسها.' },
        skills: { eu: 'Estatistika buruz', es: 'Estadística de cabeza', en: 'Statistics in your head', ar: 'الإحصاء ذهنيًا' },
        levels: [
            { progressId: 32201, stage: 'centre', title: { eu: 'Batez bestekoak', es: 'Medias', en: 'Means', ar: 'المتوسطات' }, description: { eu: 'Hiru datu ↔ batez bestekoa', es: 'Tres datos ↔ media', en: 'Three data ↔ mean', ar: 'ثلاثة بيانات ↔ المتوسط' } },
            { progressId: 32202, stage: 'centre', title: { eu: 'Medianak', es: 'Medianas', en: 'Medians', ar: 'الوسيطات' }, description: { eu: 'Lau datu ↔ mediana', es: 'Cuatro datos ↔ mediana', en: 'Four data ↔ median', ar: 'أربعة بيانات ↔ الوسيط' } },
            { progressId: 32203, stage: 'chance', title: { eu: 'Poltsak', es: 'Bolsas', en: 'Bags', ar: 'الأكياس' }, description: { eu: 'Bolak ↔ probabilitatea', es: 'Bolas ↔ probabilidad', en: 'Balls ↔ probability', ar: 'الكرات ↔ الاحتمال' } }
        ]
    }
]

export const stats3GameProgressIds: number[] = levelProgressIds(stats3Games)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const stats3GameSlugs: Record<Stats3GameId, string> = { race: 'lasterketa', read: 'irakurri', variable: 'aldagaia', bags: 'poltsak', detective: 'detektibea', memory: 'memoria' }

export function stats3GameModeForPath(pathname: string): Stats3GameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['irakurri', 'lee'].includes(game)) return 'read'
    if (['aldagaia', 'variable'].includes(game)) return 'variable'
    if (['poltsak', 'bolsas'].includes(game)) return 'bags'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}

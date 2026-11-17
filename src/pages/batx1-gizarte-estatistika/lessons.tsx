import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { bachStatsTopics } from '../batx1-zientziak-estatistika/lessons'
import { quartilesExplanation } from './borrowed'
import { BandFigure, CompareSpreadFigure, GroupMeansFigure, OgiveFigure, QuartileCountsFigure, ShareBetweenFigure, UnequalWidthsFigure } from './figures'
import { socialStatsLessonChecks, type SocialStatsTopicId } from './lessonChecks'
import { socialStatsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Estatistika unidimentsionala · Batxilergoa 1 · Gizarte Zientziak — stages
   and lessons. The scope follows unit 8 of Anaya Matemáticas Aplicadas a
   las Ciencias Sociales I (only its solutions are in the owner's Drive):
   tables and intervals, centre, quartiles and percentiles —of grouped data
   by interpolation on the cumulative percentage polygon—, box plot, σ and
   CV, and reading how many people lie between two values. Nine lessons
   are borrowed unchanged from 1.º Ciencias (`borrow`); the other nine are
   new, with economy and society contexts. Skewness, outliers with 3σ,
   standard scores and transforming the data are not in the Sociales book
   and stay out. All the exercises and numbers are our own.
   ========================================================================== */

export type SocialStatsStageId = 'data' | 'centre' | 'position' | 'spread' | 'interpretation'

export const socialStatsStages: UnitStage[] = [
    { id: 'data', tone: 'blue', title: { eu: 'Datuak eta grafikoak', es: 'Datos y gráficos', en: 'Data and charts', ar: 'البيانات والرسوم' } },
    { id: 'centre', tone: 'violet', title: { eu: 'Zentralizazio-neurriak', es: 'Medidas de centralización', en: 'Measures of centre', ar: 'مقاييس النزعة المركزية' } },
    { id: 'position', tone: 'mustard', title: { eu: 'Posizio-neurriak', es: 'Medidas de posición', en: 'Measures of position', ar: 'مقاييس الموضع' } },
    { id: 'spread', tone: 'coral', title: { eu: 'Sakabanatze-neurriak', es: 'Medidas de dispersión', en: 'Measures of spread', ar: 'مقاييس التشتت' } },
    { id: 'interpretation', tone: 'green', title: { eu: 'Interpretatu', es: 'Interpretar', en: 'Interpret', ar: 'التفسير' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const need = {
    intervals: { unit: 'dbh4-akademikoak/estadistica', topic: 'intervals', title: { eu: 'Tarteak eta histograma', es: 'Intervalos e histograma', en: 'Intervals and histograms', ar: 'الفئات والمدرّج التكراري' } },
    mean: { unit: 'dbh4-akademikoak/estadistica', topic: 'mean', title: { eu: 'Batez bestekoa eta haztatua', es: 'Media y media ponderada', en: 'Mean and weighted mean', ar: 'المتوسط والمتوسط المرجّح' } },
    percentiles: { unit: 'dbh4-akademikoak/estadistica', topic: 'percentiles', title: { eu: 'Pertzentilak', es: 'Percentiles', en: 'Percentiles', ar: 'المئينات' } },
    quartiles: { unit: 'dbh4-akademikoak/estadistica', topic: 'quartiles', title: { eu: 'Kuartilak', es: 'Cuartiles', en: 'Quartiles', ar: 'الربيعيات' } },
    variance: { unit: 'dbh4-akademikoak/estadistica', topic: 'variance', title: { eu: 'Bariantza eta desbideratze tipikoa', es: 'Varianza y desviación típica', en: 'Variance and standard deviation', ar: 'التباين والانحراف المعياري' } }
}

/** A lesson of 1.º Ciencias, unchanged, in a stage of this unit */
const borrow = (id: string, stage: SocialStatsStageId, change: Partial<UnitTopic> = {}): UnitTopic => {
    const topic = bachStatsTopics.find((item) => item.id === id)
    if (!topic) throw new Error(`No lesson ${id} in 1.º Ciencias`)
    return { ...topic, stage, ...change }
}

/** The new lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const ownTopics: Record<SocialStatsTopicId, Omit<UnitTopic, 'explanation' | 'example'>> = {
    /* ---------- 1. Data and charts ---------- */
    'unequal-widths': {
        id: 'unequal-widths',
        stage: 'data',
        title: say('Zabalera desberdineko tarteak', 'Intervalos de distinta amplitud', 'فئات بأطوال مختلفة', 'Intervals of different widths'),
        goal: say('Tarteen zabalera desberdina denean histograma ondo marraztea: barra bakoitzaren azalera haren maiztasuna izan dadin.', 'Dibujar bien un histograma cuando los intervalos tienen distinta amplitud: que el área de cada barra sea su frecuencia.', 'رسم المدرّج التكراري بشكل صحيح عندما تختلف أطوال الفئات: أن تكون مساحة كل عمود تكراره.', 'Draw a histogram properly when the intervals have different widths: so that the area of each bar is its frequency.'),
        needs: [need.intervals],
        problem: say('60 pertsonari asteburuan zenbat ordu ikusten duten telebista galdetu zaie: $[0,1)$ tartean 12, $[1,2)$ tartean 18, $[2,4)$ tartean 20 eta $[4,8)$ tartean 10. Zer altuera du barra bakoitzak?', 'Se pregunta a 60 personas cuántas horas ven la televisión el fin de semana: 12 en $[0,1)$, 18 en $[1,2)$, 20 en $[2,4)$ y 10 en $[4,8)$. ¿Qué altura tiene cada barra?', 'سُئل 60 شخصًا كم ساعة يشاهدون التلفاز في عطلة نهاية الأسبوع: 12 في $[0,1)$ و18 في $[1,2)$ و20 في $[2,4)$ و10 في $[4,8)$. ما ارتفاع كل عمود؟', '60 people are asked how many hours of television they watch at the weekend: 12 in $[0,1)$, 18 in $[1,2)$, 20 in $[2,4)$ and 10 in $[4,8)$. How tall is each bar?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen bi tarteek 1 zabalera dute: altuera maiztasuna bera da.', 'Los dos primeros intervalos tienen amplitud 1: la altura es la propia frecuencia.', 'طول الفئتين الأوليين 1: فالارتفاع هو التكرار نفسه.', 'The first two intervals have width 1: the height is the frequency itself.'), math: same('$\\frac{12}{1}=12\\qquad\\frac{18}{1}=18$') },
            { text: say('Hirugarrenak 2 zabalera du.', 'El tercero tiene amplitud 2.', 'طول الثالثة 2.', 'The third has width 2.'), math: same('$\\frac{20}{4-2}=10$') },
            { text: say('Laugarrenak 4 zabalera du: maiztasun handia du, baina barra baxua.', 'El cuarto tiene amplitud 4: una frecuencia grande pero una barra baja.', 'طول الرابعة 4: تكرار كبير لكن عمود منخفض.', 'The fourth has width 4: a large frequency but a low bar.'), math: same('$\\frac{10}{8-4}=2{,}5$') }
        ],
        takeaway: say(
            'Histograma batean maiztasuna azalera da. Zabalera desberdinekin, barra bakoitzaren altuera $\\frac{f_i}{a_i}$ da.',
            'En un histograma la frecuencia es el área. Con amplitudes distintas, la altura de cada barra es $\\frac{f_i}{a_i}$.',
            'في المدرّج التكراري التكرار هو المساحة. ومع أطوال مختلفة يكون ارتفاع كل عمود $\\frac{f_i}{a_i}$.',
            'In a histogram the frequency is the area. With different widths, the height of each bar is $\\frac{f_i}{a_i}$.'
        ),
        figure: (language) => <UnequalWidthsFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Measures of centre ---------- */
    'group-means': {
        id: 'group-means',
        stage: 'centre',
        title: say('Bi taldeen batez bestekoa', 'La media de dos grupos', 'متوسط مجموعتين', 'The mean of two groups'),
        goal: say('Bi taldeen batez bestekoak elkartzea eta falta den maiztasun bat aurkitzea, batez bestekoak guztizkoa ematen duela erabiliz.', 'Juntar las medias de dos grupos y hallar una frecuencia que falta, usando que la media da el total.', 'ضمّ متوسطي مجموعتين وإيجاد تكرار ناقص، باستعمال أن المتوسط يعطي المجموع.', 'Join the means of two groups and find a missing frequency, using the fact that the mean gives the total.'),
        needs: [need.mean],
        problem: say('Akademia batean, 30 ikaslek batez beste 20 € gastatzen dute astean aisian, eta beste 10 ikaslek, 28 €. Zein da 40 ikasleen batez bestekoa?', 'En una academia, 30 alumnos gastan de media 20 € a la semana en ocio y otros 10, 28 €. ¿Cuál es la media de los 40?', 'في أكاديمية ينفق 30 طالبًا في المتوسط 20 € أسبوعيًّا على الترفيه، و10 آخرون 28 €. ما متوسط الأربعين؟', 'At an academy, 30 students spend on average €20 a week on leisure and another 10, €28. What is the mean of the 40?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen taldearen guztizkoa.', 'El total del primer grupo.', 'مجموع المجموعة الأولى.', 'The total of the first group.'), math: same('$30\\cdot 20=600$') },
            { text: say('Bigarren taldearen guztizkoa.', 'El total del segundo.', 'مجموع الثانية.', 'The total of the second.'), math: same('$10\\cdot 28=280$') },
            { text: say('Batu eta zatitu 40 ikasleen artean: 22 €, eta ez 24 €.', 'Suma y divide entre los 40 alumnos: 22 €, y no 24 €.', 'اجمع واقسم على الأربعين: 22 € لا 24 €.', 'Add and divide among the 40 students: €22, not €24.'), math: same('$\\bar{x}=\\frac{600+280}{40}=22$') }
        ],
        takeaway: say(
            'Bi taldeen batez bestekoa: $\\bar{x}=\\frac{N_A\\,\\bar{x}_A+N_B\\,\\bar{x}_B}{N_A+N_B}$. Falta den maiztasun bat aurkitzeko, batez bestekoaren ekuazioa ebazten da.',
            'Media de dos grupos: $\\bar{x}=\\frac{N_A\\,\\bar{x}_A+N_B\\,\\bar{x}_B}{N_A+N_B}$. Para hallar una frecuencia que falta, se resuelve la ecuación de la media.',
            'متوسط مجموعتين: $\\bar{x}=\\frac{N_A\\,\\bar{x}_A+N_B\\,\\bar{x}_B}{N_A+N_B}$. ولإيجاد تكرار ناقص نحلّ معادلة المتوسط.',
            'Mean of two groups: $\\bar{x}=\\frac{N_A\\,\\bar{x}_A+N_B\\,\\bar{x}_B}{N_A+N_B}$. To find a missing frequency, solve the equation of the mean.'
        ),
        figure: (language) => <GroupMeansFigure language={language} />
    },

    /* ---------- 3. Measures of position ---------- */
    'cumulative-polygon': {
        id: 'cumulative-polygon',
        stage: 'position',
        title: say('Ehuneko metatuen poligonoa', 'El polígono de porcentajes acumulados', 'مضلّع النسب المتجمّعة', 'The cumulative percentage polygon'),
        goal: say('Tarteetan dauden datuen ehuneko metatuak kalkulatzea, haien poligonoa marraztea eta bertan irakurtzea.', 'Calcular los porcentajes acumulados de unos datos en intervalos, dibujar su polígono y leer en él.', 'حساب النسب المتجمّعة لبيانات مبوّبة ورسم مضلّعها والقراءة عليه.', 'Work out the cumulative percentages of data in intervals, draw their polygon and read from it.'),
        needs: [need.percentiles],
        problem: say('Denda bateko 200 bezeroren adinak: $[20,30)$ tartean 20, $[30,40)$ tartean 60, $[40,50)$ tartean 80 eta $[50,60)$ tartean 40. Egin ehuneko metatuen zutabea. Zer ehunekok du 40 urte baino gutxiago?', 'Edades de los 200 clientes de una tienda: 20 en $[20,30)$, 60 en $[30,40)$, 80 en $[40,50)$ y 40 en $[50,60)$. Haz la columna de porcentajes acumulados. ¿Qué porcentaje tiene menos de 40 años?', 'أعمار 200 زبون لمتجر: 20 في $[20,30)$ و60 في $[30,40)$ و80 في $[40,50)$ و40 في $[50,60)$. اصنع عمود النسب المتجمّعة. ما النسبة التي عمرها أقل من 40 سنة؟', 'Ages of the 200 customers of a shop: 20 in $[20,30)$, 60 in $[30,40)$, 80 in $[40,50)$ and 40 in $[50,60)$. Make the column of cumulative percentages. What percentage is under 40?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maiztasun metatuak.', 'Frecuencias acumuladas.', 'التكرارات المتجمّعة.', 'Cumulative frequencies.'), math: same('$20\\qquad 20+60=80\\qquad 80+80=160\\qquad 160+40=200$') },
            { text: say('Ehunekotan, 200 bezeroen artean.', 'En porcentaje, sobre los 200 clientes.', 'بالنسبة المئوية من 200 زبون.', 'As percentages of the 200 customers.'), math: same('$\\frac{20}{200}\\cdot 100=10\\qquad\\frac{80}{200}\\cdot 100=40\\qquad\\frac{160}{200}\\cdot 100=80$') },
            { text: say('Puntuak goiko muturretan: (20, % 0), (30, % 10), (40, % 40), (50, % 80) eta (60, % 100). 40 urte baino gutxiago: % 40.', 'Los puntos en los extremos superiores: (20, 0 %), (30, 10 %), (40, 40 %), (50, 80 %) y (60, 100 %). Menos de 40 años: el 40 %.', 'النقاط عند الأطراف العليا: (20، 0٪) و(30، 10٪) و(40، 40٪) و(50، 80٪) و(60، 100٪). أقل من 40 سنة: 40٪.', 'The points at the upper ends: (20, 0%), (30, 10%), (40, 40%), (50, 80%) and (60, 100%). Under 40: 40%.') }
        ],
        takeaway: say(
            'Ehuneko metatuen poligonoak (goiko muturra, ehuneko metatua) puntuak lotzen ditu, % 0 ehunekotik % 100 ehunekora. Bertan irakurtzen da balio bakoitzaren azpian zer ehuneko dagoen.',
            'El polígono de porcentajes acumulados une los puntos (extremo superior, porcentaje acumulado), del 0 % al 100 %. En él se lee qué porcentaje queda por debajo de cada valor.',
            'يصل مضلّع النسب المتجمّعة النقاط (الطرف الأعلى، النسبة المتجمّعة) من 0٪ إلى 100٪. وعليه نقرأ النسبة التي تقع تحت كل قيمة.',
            'The cumulative percentage polygon joins the points (upper end, cumulative percentage), from 0% to 100%. On it you read what percentage lies below each value.'
        ),
        figure: (language) => <OgiveFigure language={language} mode="build" />,
        figureAfterSteps: true
    },
    'grouped-percentiles': {
        id: 'grouped-percentiles',
        stage: 'position',
        title: say('Datu multzokatuen pertzentilak', 'Percentiles de datos agrupados', 'مئينات البيانات المبوّبة', 'Percentiles of grouped data'),
        goal: say('Tarteetan dauden datuen kuartilak eta pertzentilak kalkulatzea, ehuneko metatuen poligonoan interpolatuz.', 'Calcular los cuartiles y percentiles de datos en intervalos interpolando en el polígono de porcentajes acumulados.', 'حساب ربيعيات البيانات المبوّبة ومئيناتها بالاستكمال على مضلّع النسب المتجمّعة.', 'Work out the quartiles and percentiles of data in intervals by interpolating on the cumulative percentage polygon.'),
        needs: [need.percentiles],
        problem: say('200 bezeroen adin berak: $[20,30)$ tartean % 10, $[30,40)$ tartean % 30, $[40,50)$ tartean % 40 eta $[50,60)$ tartean % 20. Aurkitu $Q_1$ eta mediana.', 'Las mismas edades de los 200 clientes: el 10 % en $[20,30)$, el 30 % en $[30,40)$, el 40 % en $[40,50)$ y el 20 % en $[50,60)$. Halla $Q_1$ y la mediana.', 'أعمار الزبائن المئتين نفسها: 10٪ في $[20,30)$ و30٪ في $[30,40)$ و40٪ في $[40,50)$ و20٪ في $[50,60)$. أوجد $Q_1$ والوسيط.', 'The same ages of the 200 customers: 10% in $[20,30)$, 30% in $[30,40)$, 40% in $[40,50)$ and 20% in $[50,60)$. Find $Q_1$ and the median.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ehuneko metatuak: 10, 40, 80 eta 100. % 25 ehunekoa $[30,40)$ tartean dago, % 10 eta % 40 artean.', 'Acumulados: 10, 40, 80 y 100. El 25 % está en $[30,40)$, entre el 10 % y el 40 %.', 'المتجمّعة: 10 و40 و80 و100. النسبة 25٪ في $[30,40)$ بين 10٪ و40٪.', 'Cumulative: 10, 40, 80 and 100. The 25% is in $[30,40)$, between 10% and 40%.'), math: same('$Q_1=30+\\frac{25-10}{30}\\cdot 10=35$') },
            { text: say('% 50 ehunekoa $[40,50)$ tartean dago, % 40 eta % 80 artean.', 'El 50 % está en $[40,50)$, entre el 40 % y el 80 %.', 'النسبة 50٪ في $[40,50)$ بين 40٪ و80٪.', 'The 50% is in $[40,50)$, between 40% and 80%.'), math: same('$Me=40+\\frac{50-40}{40}\\cdot 10=42{,}5$') },
            { text: say('Bezeroen laurdenak 35 urte baino gutxiago ditu, eta erdiak, 42,5 baino gutxiago.', 'Un cuarto de los clientes tiene menos de 35 años y la mitad, menos de 42,5.', 'ربع الزبائن أعمارهم أقل من 35 سنة ونصفهم أقل من 42.5.', 'A quarter of the customers are under 35 and half are under 42.5.') }
        ],
        takeaway: say(
            'Datu multzokatuetan, $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$, % $k$ ehunekoa sartzen den tartean. $Q_1=P_{25}$, $Me=P_{50}$ eta $Q_3=P_{75}$.',
            'Con datos agrupados, $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$, en el intervalo donde entra el $k$ %. $Q_1=P_{25}$, $Me=P_{50}$ y $Q_3=P_{75}$.',
            'مع البيانات المبوّبة $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$ في الفئة التي تقع فيها النسبة $k$٪. و$Q_1=P_{25}$ و$Me=P_{50}$ و$Q_3=P_{75}$.',
            'With grouped data, $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$, in the interval where the $k$% falls. $Q_1=P_{25}$, $Me=P_{50}$ and $Q_3=P_{75}$.'
        ),
        figure: (language) => <OgiveFigure language={language} mode="percentile" />,
        figureAfterSteps: true
    },
    'percentile-of-value': {
        id: 'percentile-of-value',
        stage: 'position',
        title: say('Balio baten pertzentila', 'El percentil de un valor', 'مئين قيمة', 'The percentile of a value'),
        goal: say('Balio bat emanda, haren pertzentila kalkulatzea, eta haren azpian edo gainean zenbat pertsona dauden.', 'Dado un valor, calcular qué percentil es y cuántas personas quedan por debajo o por encima.', 'بمعرفة قيمة، حساب مئينها وكم شخصًا يقع تحتها أو فوقها.', 'Given a value, work out which percentile it is and how many people lie below or above it.'),
        needs: [need.percentiles],
        problem: say('200 bezeroen adinekin (% 10, % 40, % 80 eta % 100 metatuak 30, 40, 50 eta 60 urteetan), zer pertzentil da 45 urte? Zenbat bezerok dute 45 urte baino gehiago?', 'Con las edades de los 200 clientes (acumulados 10 %, 40 %, 80 % y 100 % en 30, 40, 50 y 60 años), ¿qué percentil son 45 años? ¿Cuántos clientes tienen más de 45?', 'مع أعمار الزبائن المئتين (المتجمّعة 10٪ و40٪ و80٪ و100٪ عند 30 و40 و50 و60 سنة)، ما مئين 45 سنة؟ وكم زبونًا عمره أكثر من 45؟', 'With the ages of the 200 customers (cumulative 10%, 40%, 80% and 100% at 30, 40, 50 and 60), which percentile is 45? How many customers are over 45?'),
        stepsKind: 'steps',
        steps: [
            { text: say('45 urte $[40,50)$ tartean daude, tartearen erdian; poligonoa % 40 ehunekotik % 80 ehunekora igotzen da.', 'Los 45 años están en $[40,50)$, en la mitad del intervalo; el polígono sube del 40 % al 80 %.', 'تقع 45 سنة في $[40,50)$ في منتصف الفئة، والمضلّع يصعد من 40٪ إلى 80٪.', '45 is in $[40,50)$, halfway along the interval; the polygon rises from 40% to 80%.'), math: same('$k=40+\\frac{45-40}{10}\\cdot 40=60$') },
            { text: say('45 urte $P_{60}$ da: bezeroen % 60 ehunekoa gazteagoa da.', 'Los 45 años son $P_{60}$: el 60 % de los clientes es más joven.', 'سنّ 45 هي $P_{60}$: 60٪ من الزبائن أصغر سنًّا.', '45 is $P_{60}$: 60% of the customers are younger.') },
            { text: say('Gainean, % 40 geratzen da.', 'Por encima queda el 40 %.', 'فوقها تبقى 40٪.', 'Above it lies 40%.'), math: same('$0{,}4\\cdot 200=80$') }
        ],
        takeaway: say(
            'Balio baten pertzentila: $k=H_{i-1}+\\frac{x-L_i}{a_i}\\cdot h_i$. Datuen % $k$ ehunekoa dago haren azpian.',
            'El percentil de un valor: $k=H_{i-1}+\\frac{x-L_i}{a_i}\\cdot h_i$. Por debajo de él está el $k$ % de los datos.',
            'مئين قيمة: $k=H_{i-1}+\\frac{x-L_i}{a_i}\\cdot h_i$. وتحتها تقع $k$٪ من البيانات.',
            'The percentile of a value: $k=H_{i-1}+\\frac{x-L_i}{a_i}\\cdot h_i$. Below it lies $k$% of the data.'
        ),
        figure: (language) => <OgiveFigure language={language} mode="value" />,
        figureAfterSteps: true
    },

    /* ---------- 4. Measures of spread ---------- */
    'compare-spread': {
        id: 'compare-spread',
        stage: 'spread',
        title: say('Sakabanatzea begiz konparatzea', 'Comparar la dispersión a ojo', 'مقارنة التشتت بالنظر', 'Comparing spread by eye'),
        goal: say('Grafiko batean begiratuta, batez besteko bera duten banaketak $\\sigma$ handienetik txikienera ordenatzea.', 'Ordenar de mayor a menor $\\sigma$ distribuciones con la misma media mirando su gráfico.', 'ترتيب توزيعات لها المتوسط نفسه من الأكبر إلى الأصغر $\\sigma$ بالنظر إلى رسمها.', 'Order distributions with the same mean from largest to smallest $\\sigma$ by looking at their chart.'),
        needs: [need.variance],
        problem: say('A, B eta C hiru diagramek 10 datu dituzte, 1 eta 5 artean, eta batez bestekoa 3 da hiruretan. A: 1, 2, 4, 2, 1. B: 2, 2, 2, 2, 2. C: 4, 1, 0, 1, 4. Ordenatu $\\sigma$ txikienetik handienera.', 'Tres diagramas A, B y C tienen 10 datos entre 1 y 5, y media 3. A: 1, 2, 4, 2, 1. B: 2, 2, 2, 2, 2. C: 4, 1, 0, 1, 4. Ordénalos de menor a mayor $\\sigma$.', 'لثلاثة مخططات A وB وC عشرة بيانات بين 1 و5 ومتوسط 3. A: 1، 2، 4، 2، 1. B: 2، 2، 2، 2، 2. C: 4، 1، 0، 1، 4. رتّبها من الأصغر إلى الأكبر $\\sigma$.', 'Three charts A, B and C have 10 data between 1 and 5, and mean 3. A: 1, 2, 4, 2, 1. B: 2, 2, 2, 2, 2. C: 4, 1, 0, 1, 4. Order them from smallest to largest $\\sigma$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('A erdian pilatzen da; C muturretan. B tartean dago.', 'A se amontona en el centro; C, en los extremos. B queda en medio.', 'تتكدّس A في الوسط، وC في الطرفين، وB بينهما.', 'A piles up in the middle; C, at the ends. B is in between.') },
            { text: say('Bariantzarekin egiaztatzen da: desbideratzeak $\\pm 2$ eta $\\pm 1$ dira.', 'Se comprueba con la varianza: las desviaciones son $\\pm 2$ y $\\pm 1$.', 'نتحقق بالتباين: الانحرافات $\\pm 2$ و$\\pm 1$.', 'Check it with the variance: the deviations are $\\pm 2$ and $\\pm 1$.'), math: same('$\\sigma_A^2=\\frac{1\\cdot 4+2\\cdot 1+2\\cdot 1+1\\cdot 4}{10}=1{,}2$') },
            { text: say('Beste biak modu berean.', 'Las otras dos, igual.', 'والأخريان بالطريقة نفسها.', 'The other two the same way.'), math: same('$\\sigma_B^2=\\frac{2\\cdot 4+2\\cdot 1+2\\cdot 1+2\\cdot 4}{10}=2\\qquad\\sigma_C^2=\\frac{4\\cdot 4+1+1+4\\cdot 4}{10}=3{,}4$') },
            { text: say('Ordena: A, B, C.', 'Orden: A, B, C.', 'الترتيب: A، B، C.', 'Order: A, B, C.') }
        ],
        takeaway: say(
            'Batez besteko bera izanda, datuak muturretan pilatzen badira $\\sigma$ handia da, eta erdian pilatzen badira, txikia.',
            'Con la misma media, si los datos se acumulan en los extremos $\\sigma$ es grande, y si se acumulan en el centro, pequeña.',
            'مع المتوسط نفسه، إذا تجمّعت البيانات في الطرفين كان $\\sigma$ كبيرًا، وإذا تجمّعت في الوسط كان صغيرًا.',
            'With the same mean, if the data gather at the ends $\\sigma$ is large, and if they gather in the middle, small.'
        ),
        figure: (language) => <CompareSpreadFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Interpret ---------- */
    'quartile-counts': {
        id: 'quartile-counts',
        stage: 'interpretation',
        title: say('Kuartilek zer esaten duten', 'Lo que dicen los cuartiles', 'ماذا تقول الربيعيات', 'What the quartiles say'),
        goal: say('Kuartiletatik abiatuta, populazio bateko zenbat pertsona dauden tarte bakoitzean kalkulatzea.', 'Calcular, a partir de los cuartiles, cuántas personas de una población hay en cada tramo.', 'حساب عدد الأشخاص في كل جزء من مجتمع انطلاقًا من الربيعيات.', 'Work out, from the quartiles, how many people of a population lie in each stretch.'),
        needs: [need.quartiles],
        problem: say('400 etxebizitzaren hileko alokairua, eurotan: $Q_1=600$, $Me=750$ eta $Q_3=900$. Zenbat etxebizitza daude 600 baino merkeago? Eta 600 eta 900 artean?', 'Alquiler mensual en euros de 400 pisos: $Q_1=600$, $Me=750$ y $Q_3=900$. ¿Cuántos pisos cuestan menos de 600? ¿Y entre 600 y 900?', 'الإيجار الشهري باليورو لـ 400 شقة: $Q_1=600$ و$Me=750$ و$Q_3=900$. كم شقة أقل من 600؟ وكم بين 600 و900؟', 'Monthly rent in euros of 400 flats: $Q_1=600$, $Me=750$ and $Q_3=900$. How many flats cost less than 600? And between 600 and 900?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$Q_1$ azpian datuen laurdena dago.', 'Bajo $Q_1$ está la cuarta parte de los datos.', 'تحت $Q_1$ يقع ربع البيانات.', 'Below $Q_1$ lies a quarter of the data.'), math: same('$0{,}25\\cdot 400=100$') },
            { text: say('$Q_1$ eta $Q_3$ artean, erdia.', 'Entre $Q_1$ y $Q_3$, la mitad.', 'بين $Q_1$ و$Q_3$ النصف.', 'Between $Q_1$ and $Q_3$, half.'), math: same('$0{,}5\\cdot 400=200$') },
            { text: say('100 etxebizitza dira 600 baino merkeagoak, eta 200, 600 eta 900 artean.', 'Hay 100 pisos de menos de 600 y 200 entre 600 y 900.', 'هناك 100 شقة أقل من 600 و200 بين 600 و900.', 'There are 100 flats under 600 and 200 between 600 and 900.') }
        ],
        takeaway: say(
            'Ondoz ondoko bi kuartilen artean beti dago datuen % 25: $N$ pertsona badira, $0{,}25\\cdot N$ pertsona.',
            'Entre dos cuartiles seguidos siempre está el 25 % de los datos: si hay $N$ personas, $0{,}25\\cdot N$ personas.',
            'بين ربيعيين متتاليين يوجد دائمًا 25٪ من البيانات: إذا كان هناك $N$ شخص فهم $0{,}25\\cdot N$ شخص.',
            'Between two consecutive quartiles there is always 25% of the data: if there are $N$ people, $0{,}25\\cdot N$ people.'
        ),
        figure: (language) => <QuartileCountsFigure language={language} />
    },
    'share-between': {
        id: 'share-between',
        stage: 'interpretation',
        title: say('Zenbat dauden bi balioren artean', 'Cuántos hay entre dos valores', 'كم بيانًا بين قيمتين', 'How many lie between two values'),
        goal: say('Tarteetan dauden datuetatik, bi balioren artean zenbat dauden kalkulatzea, muturretako tarteak proportzioan zatituz.', 'Calcular cuántos datos en intervalos hay entre dos valores, partiendo en proporción los intervalos de los extremos.', 'حساب عدد البيانات المبوّبة بين قيمتين بتقسيم فئتي الطرفين بالتناسب.', 'Work out how many data in intervals lie between two values, splitting the intervals at the ends in proportion.'),
        needs: [need.intervals],
        problem: say('Lantegi batean 500 piezaren luzera neurtu da, milimetrotan: $[40,44)$ tartean 20, $[44,48)$ tartean 150, $[48,52)$ tartean 260, $[52,56)$ tartean 60 eta $[56,60)$ tartean 10. 46 eta 54 artekoak onargarriak dira. Zer ehuneko dira akastunak?', 'En una fábrica se mide la longitud en milímetros de 500 piezas: 20 en $[40,44)$, 150 en $[44,48)$, 260 en $[48,52)$, 60 en $[52,56)$ y 10 en $[56,60)$. Son aceptables las que miden entre 46 y 54. ¿Qué porcentaje es defectuoso?', 'في مصنع قيس طول 500 قطعة بالمليمتر: 20 في $[40,44)$ و150 في $[44,48)$ و260 في $[48,52)$ و60 في $[52,56)$ و10 في $[56,60)$. المقبولة ما بين 46 و54. ما النسبة المعيبة؟', 'In a factory the length in millimetres of 500 parts is measured: 20 in $[40,44)$, 150 in $[44,48)$, 260 in $[48,52)$, 60 in $[52,56)$ and 10 in $[56,60)$. Those between 46 and 54 are acceptable. What percentage is faulty?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$[44,48)$ tartetik, 46 eta 48 artekoak bakarrik: zabaleraren erdia.', 'De $[44,48)$, solo las de 46 a 48: la mitad de la amplitud.', 'من $[44,48)$ فقط ما بين 46 و48: نصف الطول.', 'From $[44,48)$, only those from 46 to 48: half the width.'), math: same('$\\frac{48-46}{4}\\cdot 150=75$') },
            { text: say('$[48,52)$ osorik sartzen da, eta $[52,56)$ tartetik, 52 eta 54 artekoak.', '$[48,52)$ entra entero y de $[52,56)$, las de 52 a 54.', 'تدخل $[48,52)$ كاملة، ومن $[52,56)$ ما بين 52 و54.', '$[48,52)$ is fully inside and from $[52,56)$, those from 52 to 54.'), math: same('$\\frac{54-52}{4}\\cdot 60=30$') },
            { text: say('Onargarriak eta akastunak.', 'Aceptables y defectuosas.', 'المقبولة والمعيبة.', 'Acceptable and faulty.'), math: same('$75+260+30=365\\qquad 500-365=135\\qquad\\frac{135}{500}\\cdot 100=27$') },
            { text: say('Piezen % 27 akastuna da.', 'El 27 % de las piezas es defectuoso.', '27٪ من القطع معيبة.', '27% of the parts are faulty.') }
        ],
        takeaway: say(
            'Tarte baten zati bat bakarrik sartzen bada, haren datuen zati bera hartzen da: barruan $d$ zabalera badago, $\\frac{d}{a_i}\\cdot f_i$.',
            'Si de un intervalo solo entra una parte, se toma la misma parte de sus datos: si dentro queda una amplitud $d$, $\\frac{d}{a_i}\\cdot f_i$.',
            'إذا دخل جزء فقط من فئة أخذنا الجزء نفسه من بياناتها: إذا بقي في الداخل طول $d$ فالعدد $\\frac{d}{a_i}\\cdot f_i$.',
            'If only part of an interval is inside, take the same part of its data: if a width $d$ lies inside, $\\frac{d}{a_i}\\cdot f_i$.'
        ),
        figure: (language) => <ShareBetweenFigure language={language} />,
        figureAfterSteps: true
    },
    'mean-sd-band': {
        id: 'mean-sd-band',
        stage: 'interpretation',
        title: say('Batez bestekoaren inguruko banda', 'La banda alrededor de la media', 'النطاق حول المتوسط', 'The band around the mean'),
        goal: say('$(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$ tartean datuen zer ehuneko dagoen kalkulatzea.', 'Calcular qué porcentaje de los datos hay en el intervalo $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$.', 'حساب نسبة البيانات في الفئة $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$.', 'Work out what percentage of the data lies in the interval $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$.'),
        needs: [need.variance],
        problem: say('Kontsulta bateko 50 pazienteren itxaron-minutuak: $[0,10)$ tartean 3, $[10,20)$ tartean 22, $[20,30)$ tartean 22 eta $[30,40)$ tartean 3. $\\bar{x}=20$ eta $\\sigma=7$ dira. Zer ehuneko dago $\\bar{x}-\\sigma$ eta $\\bar{x}+\\sigma$ artean?', 'Minutos de espera de 50 pacientes de una consulta: 3 en $[0,10)$, 22 en $[10,20)$, 22 en $[20,30)$ y 3 en $[30,40)$. Se sabe que $\\bar{x}=20$ y $\\sigma=7$. ¿Qué porcentaje hay entre $\\bar{x}-\\sigma$ y $\\bar{x}+\\sigma$?', 'دقائق انتظار 50 مريضًا في عيادة: 3 في $[0,10)$ و22 في $[10,20)$ و22 في $[20,30)$ و3 في $[30,40)$. ونعلم أن $\\bar{x}=20$ و$\\sigma=7$. ما النسبة بين $\\bar{x}-\\sigma$ و$\\bar{x}+\\sigma$؟', 'Waiting minutes of 50 patients at a clinic: 3 in $[0,10)$, 22 in $[10,20)$, 22 in $[20,30)$ and 3 in $[30,40)$. We know $\\bar{x}=20$ and $\\sigma=7$. What percentage lies between $\\bar{x}-\\sigma$ and $\\bar{x}+\\sigma$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bandaren muturrak.', 'Los extremos de la banda.', 'طرفا النطاق.', 'The ends of the band.'), math: same('$20-7=13\\qquad 20+7=27$') },
            { text: say('$[10,20)$ tartetik, 13 eta 20 artekoak; $[20,30)$ tartetik, 20 eta 27 artekoak.', 'De $[10,20)$, los de 13 a 20; de $[20,30)$, los de 20 a 27.', 'من $[10,20)$ ما بين 13 و20، ومن $[20,30)$ ما بين 20 و27.', 'From $[10,20)$, those from 13 to 20; from $[20,30)$, those from 20 to 27.'), math: same('$\\frac{20-13}{10}\\cdot 22=15{,}4\\qquad\\frac{27-20}{10}\\cdot 22=15{,}4$') },
            { text: say('Ehunekotan, 50 pazienteen artean.', 'En porcentaje, sobre los 50 pacientes.', 'بالنسبة المئوية من 50 مريضًا.', 'As a percentage of the 50 patients.'), math: same('$\\frac{30{,}8}{50}\\cdot 100=61{,}6$') }
        ],
        takeaway: say(
            '$(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$ tartean datuen zati handi bat dago: muturrak kalkulatu eta muturretako tarteak zatitu.',
            'En $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$ hay una gran parte de los datos: calcula los extremos y parte los intervalos de los extremos.',
            'في $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$ جزء كبير من البيانات: احسب الطرفين وقسّم فئتي الطرفين.',
            'In $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$ lies a large part of the data: work out the ends and split the intervals at the ends.'
        ),
        figure: (language) => <BandFigure language={language} />,
        figureAfterSteps: true
    }
}

/** A new lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
const own = (id: SocialStatsTopicId): UnitTopic => ({ ...ownTopics[id], ...socialStatsLessonTexts[id], ...socialStatsLessonChecks[id] })

export const socialStatsTopics: UnitTopic[] = [
    /* ---------- 1. Data and charts ---------- */
    borrow('population-sample', 'data'),
    borrow('frequency-tables', 'data'),
    borrow('class-intervals', 'data'),
    own('unequal-widths'),
    /* ---------- 2. Measures of centre ---------- */
    borrow('centre-measures', 'centre'),
    borrow('grouped-centre', 'centre'),
    own('group-means'),
    /* ---------- 3. Measures of position ---------- */
    borrow('quartiles-percentiles', 'position', { explanation: quartilesExplanation }),
    own('cumulative-polygon'),
    own('grouped-percentiles'),
    own('percentile-of-value'),
    borrow('box-plot', 'position'),
    /* ---------- 4. Measures of spread ---------- */
    borrow('variance-sd', 'spread'),
    borrow('coefficient-variation', 'spread'),
    own('compare-spread'),
    /* ---------- 5. Interpret ---------- */
    own('quartile-counts'),
    own('share-between'),
    own('mean-sd-band')
]

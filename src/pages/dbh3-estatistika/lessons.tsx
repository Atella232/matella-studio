import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BoxPlotFigure, CumulativeFigure, EventsFigure, GroupedFigure, HistogramFigure, MeanTableFigure, MedianTableFigure, MisleadingFigure, PieFigure, QuartilesFigure, SampleFigure, SymmetryFigure, TreeFigure } from '../dbh2-estatistika-v2/figures'
import { TwoDiceFigure } from '../dbh4-akademikoak-probabilitatea/figures'
import { VarianceFigure } from '../dbh4-aplikatuak-estatistika/figures'
import { say, same } from './text'

/* ==========================================================================
   Estatistika eta probabilitatea · 3. DBH — stages and lessons, after
   Santillana 3.º ESO units 13 «Estadística» and 14 «Probabilidad», and
   Anaya 3.º ESO units 13–15 (statistics, parameters, probability). Every
   number and context is original: the books only fix the scope and the
   order. Each lesson names its typical mistake. Medians and quartiles
   follow the textbook rule of ../dbh4-aplikatuak-estatistika/stats.ts.
   ========================================================================== */

export type Stats3StageId = 'data' | 'charts' | 'centre' | 'spread' | 'chance'

export const stats3Stages: UnitStage[] = [
    { id: 'data', tone: 'blue', title: { eu: 'Datuak eta taulak', es: 'Datos y tablas', en: 'Data and tables', ar: 'البيانات والجداول' } },
    { id: 'charts', tone: 'violet', title: { eu: 'Grafikoak', es: 'Gráficos', en: 'Charts', ar: 'المخططات' } },
    { id: 'centre', tone: 'mustard', title: { eu: 'Zentralizazio-neurriak', es: 'Medidas de centralización', en: 'Measures of centre', ar: 'مقاييس النزعة المركزية' } },
    { id: 'spread', tone: 'coral', title: { eu: 'Posizioa eta sakabanaketa', es: 'Posición y dispersión', en: 'Position and spread', ar: 'الموقع والتشتت' } },
    { id: 'chance', tone: 'green', title: { eu: 'Probabilitatea', es: 'Probabilidad', en: 'Probability', ar: 'الاحتمال' } }
]

export const stats3Topics: UnitTopic[] = [
    /* ---------- 1. Data and tables ---------- */
    {
        id: 'population-sample',
        stage: 'data',
        title: say('Populazioa, lagina eta aldagaiak', 'Población, muestra y variables', 'المجتمع والعيّنة والمتغيّرات', 'Population, sample and variables'),
        goal: say('Azterketa estatistiko bateko populazioa, lagina eta aldagai mota bereiztea.', 'Distinguir población, muestra y tipo de variable en un estudio estadístico.', 'التمييز بين المجتمع والعيّنة ونوع المتغيّر في دراسة إحصائية.', 'Tell apart the population, the sample and the kind of variable in a statistical study.'),
        explanation: say(
            'Populazioa aztertu nahi den talde osoa da; lagina, benetan galdetzen zaion zatia. Lagina adierazgarria izan behar da: ausaz aukeratua eta behar bezain handia. Aldagaia kualitatiboa da hitzekin erantzuten bada (kolore gogokoena) eta kuantitatiboa zenbakiekin; kuantitatiboa diskretua da balio solteak hartzen baditu (anai-arreba kopurua) eta jarraitua tarte bateko edozein balio har badezake (altuera).',
            'La población es todo el grupo que se quiere estudiar; la muestra, la parte a la que de verdad se pregunta. La muestra debe ser representativa: elegida al azar y lo bastante grande. Una variable es cualitativa si se responde con palabras (color favorito) y cuantitativa si se responde con números; la cuantitativa es discreta si toma valores sueltos (número de hermanos) y continua si puede tomar cualquier valor de un intervalo (altura).',
            'المجتمع هو المجموعة كلها التي نريد دراستها، والعيّنة هي الجزء الذي نسأله فعلًا. ويجب أن تكون العيّنة ممثِّلة: مختارة عشوائيًا وكبيرة بما يكفي. والمتغيّر نوعي إذا كان الجواب كلمات (اللون المفضّل) وكمّي إذا كان أعدادًا؛ والكمّي منفصل إذا أخذ قيمًا منفردة (عدد الإخوة) ومتصل إذا أمكن أن يأخذ أي قيمة في فترة (الطول).',
            'The population is the whole group you want to study; the sample is the part you actually ask. The sample must be representative: chosen at random and large enough. A variable is qualitative if the answer is words (favourite colour) and quantitative if it is numbers; a quantitative one is discrete if it takes separate values (number of siblings) and continuous if it can take any value in an interval (height).'
        ),
        problem: say('Ikastetxe batean 600 ikasle daude, eta horietako 60 ikasleri galdetu zaie zenbat ordu lo egiten duten. Zein da lagina, eta zer motatako aldagaia da?', 'En un centro de 600 alumnos se pregunta a 60 cuántas horas duermen. ¿Cuál es la muestra y de qué tipo es la variable?', 'في مدرسة فيها 600 طالب سُئل 60 منهم عن عدد ساعات نومهم. ما العيّنة وما نوع المتغيّر؟', 'In a school of 600 pupils, 60 are asked how many hours they sleep. What is the sample, and what kind of variable is it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Populazioa: 600 ikasle. Lagina: galdetutako 60 ikasleak.', 'Población: los 600 alumnos. Muestra: los 60 a los que se pregunta.', 'المجتمع: 600 طالب. العيّنة: الطلاب الـ60 المسؤولون.', 'Population: the 600 pupils. Sample: the 60 who are asked.') },
            { text: say('Orduak zenbakiak dira, eta edozein balio izan daiteke: kuantitatibo jarraitua.', 'Las horas son números y pueden tomar cualquier valor: cuantitativa continua.', 'الساعات أعداد وقد تأخذ أي قيمة: كمّي متصل.', 'Hours are numbers and can take any value: quantitative continuous.'), math: same('$\\frac{60}{600}=\\frac{1}{10}$') }
        ],
        example: same('$\\frac{60}{600}\\cdot 100=10$'),
        mistake: {
            wrong: say('Etxeko anai-arreba kopurua aldagai jarraitua da, zenbakiak direlako.', 'El número de hermanos es una variable continua porque son números.', 'عدد الإخوة متغيّر متصل لأنه أعداد.', 'The number of siblings is continuous because it is a number.'),
            right: say('Zenbakiak dira, baina balio solteak (0, 1, 2…): kuantitatibo diskretua.', 'Son números, pero valores sueltos (0, 1, 2…): cuantitativa discreta.', 'إنها أعداد لكنها قيم منفردة (0، 1، 2…): كمّي منفصل.', 'They are numbers, but separate values (0, 1, 2…): quantitative discrete.')
        },
        takeaway: say('Lagina: AUSAZ eta behar bezain HANDIA.', 'Muestra: al AZAR y lo bastante GRANDE.', 'العيّنة: عشوائية وكبيرة بما يكفي.', 'Sample: at RANDOM and LARGE enough.'),
        figure: (language) => <SampleFigure language={language} />
    },
    {
        id: 'frequency-table',
        stage: 'data',
        title: say('Maiztasun-taulak', 'Tablas de frecuencias', 'جداول التكرارات', 'Frequency tables'),
        goal: say('Maiztasun absolutuak, erlatiboak eta metatuak kalkulatzea.', 'Calcular frecuencias absolutas, relativas y acumuladas.', 'حساب التكرارات المطلقة والنسبية والمتجمّعة.', 'Work out absolute, relative and cumulative frequencies.'),
        explanation: say(
            'Maiztasun absolutua $f_{i}$ balio bat zenbat aldiz agertzen den da; denak batuta datu kopurua $N$ ematen dute. Maiztasun erlatiboa $h_{i}=\\frac{f_{i}}{N}$ da, eta ehuneko gisa ere idazten da. Maiztasun metatua $F_{i}$ balio horretaraino agertu diren datuak dira: aurreko metatua gehi $f_{i}$. Azken metatua beti $N$ da, eta maiztasun erlatiboen batura 1.',
            'La frecuencia absoluta $f_{i}$ es cuántas veces aparece un valor; todas juntas suman el número de datos $N$. La frecuencia relativa es $h_{i}=\\frac{f_{i}}{N}$, y también se escribe en porcentaje. La frecuencia acumulada $F_{i}$ son los datos que han aparecido hasta ese valor: la acumulada anterior más $f_{i}$. La última acumulada siempre es $N$, y las relativas suman 1.',
            'التكرار المطلق $f_{i}$ هو عدد مرات ظهور قيمة، ومجموعها كلها عدد البيانات $N$. والتكرار النسبي $h_{i}=\\frac{f_{i}}{N}$، ويُكتب أيضًا نسبةً مئوية. والتكرار المتجمّع $F_{i}$ هو البيانات التي ظهرت حتى تلك القيمة: المتجمّع السابق زائد $f_{i}$. وآخر متجمّع هو دائمًا $N$، ومجموع التكرارات النسبية 1.',
            'The absolute frequency $f_{i}$ is how many times a value appears; all of them add up to the number of data $N$. The relative frequency is $h_{i}=\\frac{f_{i}}{N}$, also written as a percentage. The cumulative frequency $F_{i}$ is the data that have appeared up to that value: the previous cumulative frequency plus $f_{i}$. The last cumulative frequency is always $N$, and the relative ones add up to 1.'
        ),
        problem: say('Hogei ikasleri galdetu zaie zenbat anai-arreba dituzten: 0 → 4, 1 → 9, 2 → 5, 3 → 2. Zein da 1 balioaren maiztasun erlatiboa eta metatua?', 'Se pregunta a veinte alumnos cuántos hermanos tienen: 0 → 4, 1 → 9, 2 → 5, 3 → 2. ¿Cuáles son la frecuencia relativa y la acumulada del valor 1?', 'سُئل عشرون طالبًا عن عدد إخوتهم: 0 ← 4، 1 ← 9، 2 ← 5، 3 ← 2. ما التكرار النسبي والمتجمّع للقيمة 1؟', 'Twenty pupils are asked how many siblings they have: 0 → 4, 1 → 9, 2 → 5, 3 → 2. What are the relative and the cumulative frequency of the value 1?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erlatiboa.', 'Relativa.', 'النسبي.', 'Relative.'), math: same('$h=\\frac{9}{20}=0{,}45$') },
            { text: say('Metatua: 0 eta 1 balioak.', 'Acumulada: los valores 0 y 1.', 'المتجمّع: القيمتان 0 و1.', 'Cumulative: the values 0 and 1.'), math: same('$F=4+9=13$') }
        ],
        example: same('$4+9+5+2=20$'),
        mistake: {
            wrong: say('1 balioaren metatua 9 da.', 'La acumulada del valor 1 es 9.', 'المتجمّع للقيمة 1 هو 9.', 'The cumulative frequency of 1 is 9.'),
            right: say('9 maiztasun absolutua da; metatuak aurrekoak ere batzen ditu: $4+9=13$.', '9 es la absoluta; la acumulada suma también las anteriores: $4+9=13$.', '9 هو المطلق؛ والمتجمّع يضيف السابق أيضًا: $4+9=13$.', '9 is the absolute frequency; the cumulative one adds the earlier ones too: $4+9=13$.')
        },
        takeaway: same('$H_{I}=\\frac{F_{I}}{N}$'),
        figure: (language) => <CumulativeFigure language={language} />
    },
    {
        id: 'grouped-data',
        stage: 'data',
        title: say('Tarteetan multzokatutako datuak', 'Datos agrupados en intervalos', 'البيانات المجمّعة في فترات', 'Data grouped in intervals'),
        goal: say('Datu jarraituak tarteetan biltzea eta klase-marka kalkulatzea.', 'Agrupar datos continuos en intervalos y calcular la marca de clase.', 'تجميع البيانات المتصلة في فترات وحساب مركز الفئة.', 'Group continuous data in intervals and work out the class midpoint.'),
        explanation: say(
            'Datu asko eta desberdinak daudenean, tarteetan biltzen dira, adibidez $[150,160)$: 150 barne eta 160 ez. Tarte guztiek zabalera bera izan ohi dute. Tarte bakoitzaren klase-marka haren erdiko puntua da, $\\frac{a+b}{2}$, eta kalkuluetan tarteko datu guztien ordez erabiltzen da.',
            'Cuando hay muchos datos distintos, se agrupan en intervalos, por ejemplo $[150,160)$: incluye el 150 y no el 160. Todos los intervalos suelen tener la misma amplitud. La marca de clase de cada intervalo es su punto medio, $\\frac{a+b}{2}$, y en los cálculos sustituye a todos los datos del intervalo.',
            'عندما تكثر البيانات وتختلف تُجمَّع في فترات، مثل $[150,160)$: تشمل 150 ولا تشمل 160. وعادةً يكون للفترات العرض نفسه. ومركز الفئة نقطة منتصفها $\\frac{a+b}{2}$، ويحلّ في الحسابات محل كل بيانات الفترة.',
            'When there are many different data, they are grouped in intervals, for example $[150,160)$: 150 is in, 160 is not. All the intervals usually have the same width. The class midpoint of each interval is its middle point, $\\frac{a+b}{2}$, and in calculations it stands for all the data in the interval.'
        ),
        problem: say('Zein tartetan sartzen da 160 cm-ko altuera, $[150,160)$ ala $[160,170)$? Eta zein da tarte horren klase-marka?', '¿En qué intervalo entra una altura de 160 cm, $[150,160)$ o $[160,170)$? ¿Y cuál es la marca de clase de ese intervalo?', 'في أي فترة يقع طول 160 سم، $[150,160)$ أم $[160,170)$؟ وما مركز تلك الفئة؟', 'Which interval does a height of 160 cm go into, $[150,160)$ or $[160,170)$? And what is the class midpoint of that interval?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Parentesi karratuak muturra barne hartzen du.', 'El corchete incluye el extremo.', 'القوس المربّع يشمل الطرف.', 'The square bracket includes the end.'), math: same('$160\\in[160,170)$') },
            { text: say('Klase-marka.', 'Marca de clase.', 'مركز الفئة.', 'Class midpoint.'), math: same('$\\frac{160+170}{2}=165$') }
        ],
        example: same('$\\frac{20+30}{2}=25$'),
        mistake: {
            wrong: say('$[150,160)$ tartearen klase-marka 160 da, muturra delako.', 'La marca de clase de $[150,160)$ es 160, porque es el extremo.', 'مركز الفئة $[150,160)$ هو 160 لأنه الطرف.', 'The class midpoint of $[150,160)$ is 160, because it is the end.'),
            right: say('Klase-marka erdiko puntua da: $\\frac{150+160}{2}=155$.', 'La marca de clase es el punto medio: $\\frac{150+160}{2}=155$.', 'مركز الفئة نقطة المنتصف: $\\frac{150+160}{2}=155$.', 'The class midpoint is the middle point: $\\frac{150+160}{2}=155$.')
        },
        takeaway: say('Klase-marka: $\\frac{A+B}{2}$, tartearen ERDIA.', 'Marca de clase: $\\frac{A+B}{2}$, el MEDIO del intervalo.', 'مركز الفئة: $\\frac{A+B}{2}$، منتصف الفترة.', 'Class midpoint: $\\frac{A+B}{2}$, the MIDDLE of the interval.'),
        figure: (language) => <GroupedFigure language={language} />
    },
    /* ---------- 2. Charts ---------- */
    {
        id: 'bar-histogram',
        stage: 'charts',
        title: say('Barra-diagramak eta histogramak', 'Diagramas de barras e histogramas', 'مخططات الأعمدة والمدرّجات التكرارية', 'Bar charts and histograms'),
        goal: say('Aldagai bakoitzerako grafiko egokia aukeratzea eta irakurtzea.', 'Elegir y leer el gráfico adecuado para cada variable.', 'اختيار المخطط المناسب لكل متغيّر وقراءته.', 'Choose and read the right chart for each variable.'),
        explanation: say(
            'Barra-diagraman barra bakoitza balio bat da eta haren altuera maiztasuna; barrak bereizita daude. Histograman, datuak tarteetan bilduta, laukizuzenak elkarren ondoan daude, aldagaia jarraitua delako. Maiztasun-poligonoak barren edo laukizuzenen goiko erdiguneak lotzen ditu, eta bi banaketa konparatzeko erabilgarria da.',
            'En un diagrama de barras cada barra es un valor y su altura es la frecuencia; las barras van separadas. En un histograma, con datos agrupados en intervalos, los rectángulos van pegados porque la variable es continua. El polígono de frecuencias une los puntos medios de lo alto de las barras o rectángulos, y sirve para comparar dos distribuciones.',
            'في مخطط الأعمدة يمثّل كل عمود قيمة وارتفاعه تكرارها، والأعمدة منفصلة. وفي المدرّج التكراري، مع بيانات مجمّعة في فترات، تتلاصق المستطيلات لأن المتغيّر متصل. ويصل المضلّع التكراري منتصفات أعالي الأعمدة أو المستطيلات، ويفيد في مقارنة توزيعين.',
            'In a bar chart each bar is a value and its height is the frequency; the bars are separate. In a histogram, with data grouped in intervals, the rectangles touch because the variable is continuous. The frequency polygon joins the middle points of the tops of the bars or rectangles, and is handy for comparing two distributions.'
        ),
        problem: say('Histograma batean $[10,20)$ tarteko laukizuzenak 8 balio du, eta $[20,30)$ tartekoak 12. Zenbat datu daude 10 eta 30 artean?', 'En un histograma, el rectángulo de $[10,20)$ mide 8 y el de $[20,30)$ mide 12. ¿Cuántos datos hay entre 10 y 30?', 'في مدرّج تكراري ارتفاع مستطيل $[10,20)$ هو 8 ومستطيل $[20,30)$ هو 12. كم بيانًا بين 10 و30؟', 'In a histogram the rectangle for $[10,20)$ is 8 high and the one for $[20,30)$ is 12. How many data are there between 10 and 30?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu bi maiztasunak.', 'Suma las dos frecuencias.', 'اجمع التكرارين.', 'Add the two frequencies.'), math: same('$8+12=20$') }
        ],
        example: same('$\\frac{12}{40}\\cdot 100=30$'),
        mistake: {
            wrong: say('Altuerak histograma batean barra-diagraman bezala bereizita marrazten dira.', 'Las alturas de un histograma se dibujan separadas, como en un diagrama de barras.', 'تُرسم المستطيلات في المدرّج التكراري منفصلة كما في مخطط الأعمدة.', 'The rectangles of a histogram are drawn apart, like in a bar chart.'),
            right: say('Histogramako laukizuzenak elkarren ondoan doaz: tarteak jarraian daude.', 'Los rectángulos del histograma van pegados: los intervalos son seguidos.', 'تتلاصق مستطيلات المدرّج: الفترات متتالية.', 'The rectangles of a histogram touch: the intervals follow each other.')
        },
        takeaway: say('Barrak: BEREIZITA. Histograma: ELKARREN ONDOAN.', 'Barras: SEPARADAS. Histograma: PEGADOS.', 'الأعمدة: منفصلة. المدرّج: متلاصق.', 'Bars: APART. Histogram: TOUCHING.'),
        figure: (language) => <HistogramFigure language={language} />
    },
    {
        id: 'pie-chart',
        stage: 'charts',
        title: say('Sektore-diagramak', 'Diagramas de sectores', 'المخططات الدائرية', 'Pie charts'),
        goal: say('Sektore baten angelua kalkulatzea maiztasunetik.', 'Calcular el ángulo de un sector a partir de la frecuencia.', 'حساب زاوية القطاع من التكرار.', 'Work out the angle of a sector from the frequency.'),
        explanation: say(
            'Sektore-diagraman zirkulu osoa, 360°, datu guztiak dira. Sektore bakoitzaren angelua maiztasun erlatiboa bider 360° da: $\\frac{f}{N}\\cdot 360$. Ehunekoarekin: % 1 = 3,6°. Aldagai kualitatiboetarako da egokia, zatiek osotasunaren barruan duten pisua ikusteko.',
            'En un diagrama de sectores el círculo entero, 360°, son todos los datos. El ángulo de cada sector es la frecuencia relativa por 360°: $\\frac{f}{N}\\cdot 360$. Con porcentajes: 1 % = 3,6°. Va bien para variables cualitativas, para ver el peso de cada parte en el total.',
            'في المخطط الدائري تمثّل الدائرة كاملة، 360°، كل البيانات. وزاوية كل قطاع هي التكرار النسبي في 360°: $\\frac{f}{N}\\cdot 360$. وبالنسب المئوية: 1 % = 3.6°. وهو مناسب للمتغيّرات النوعية، لرؤية وزن كل جزء في الكل.',
            'In a pie chart the whole circle, 360°, is all the data. The angle of each sector is the relative frequency times 360°: $\\frac{f}{N}\\cdot 360$. With percentages: 1% = 3.6°. It suits qualitative variables, to see the share of each part in the whole.'
        ),
        problem: say('40 ikasletik 14 bizikletan etortzen dira. Zenbat gradu ditu bizikletaren sektoreak?', 'De 40 alumnos, 14 vienen en bici. ¿Cuántos grados mide el sector de la bici?', 'من بين 40 طالبًا يأتي 14 بالدراجة. كم درجة قطاع الدراجة؟', 'Of 40 pupils, 14 come by bike. How many degrees is the bike sector?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maiztasun erlatiboa bider 360°.', 'Frecuencia relativa por 360°.', 'التكرار النسبي في 360°.', 'Relative frequency times 360°.'), math: same('$\\frac{14}{40}\\cdot 360=126$') }
        ],
        example: same('$25\\cdot 3{,}6=90$'),
        mistake: {
            wrong: say('% 25 duen sektoreak 25° ditu.', 'Un sector del 25 % mide 25°.', 'قطاع نسبته 25 % زاويته 25°.', 'A 25% sector measures 25°.'),
            right: say('Zirkulua 360° da, ez 100: $25\\cdot 3{,}6=90°$.', 'El círculo son 360°, no 100: $25\\cdot 3{,}6=90°$.', 'الدائرة 360° لا 100: $25\\cdot 3{,}6=90°$.', 'The circle is 360°, not 100: $25\\cdot 3{,}6=90°$.')
        },
        takeaway: say('Angelua = $\\frac{F}{N}\\cdot 360°$.', 'Ángulo = $\\frac{F}{N}\\cdot 360°$.', 'الزاوية = $\\frac{F}{N}\\cdot 360°$.', 'Angle = $\\frac{F}{N}\\cdot 360°$.'),
        figure: (language) => <PieFigure language={language} />
    },
    {
        id: 'reading-charts',
        stage: 'charts',
        title: say('Grafikoak kritikoki irakurri', 'Leer gráficos con sentido crítico', 'قراءة المخططات بعين ناقدة', 'Reading charts critically'),
        goal: say('Grafiko engainagarriak ezagutzea.', 'Reconocer gráficos engañosos.', 'التعرّف على المخططات المضلِّلة.', 'Spot misleading charts.'),
        explanation: say(
            'Grafiko bat ondo irakurtzeko, begiratu ardatzak zerotik hasten diren eta eskalak berdinak diren. Ardatz bertikala 0-tik hasten ez bada, alde txikiak oso handiak dirudite. Irudiekin eginiko grafikoetan, irudia bi aldiz handiagoa egiten bada luzeran eta zabaleran, haren azalera lau aldiz handiagoa da: aldea puztuta ikusten da.',
            'Para leer bien un gráfico, mira si los ejes empiezan en cero y si las escalas son iguales. Si el eje vertical no empieza en 0, diferencias pequeñas parecen enormes. En los gráficos con dibujos, si un dibujo se hace el doble de alto y de ancho, su área es cuatro veces mayor: la diferencia se ve inflada.',
            'لقراءة المخطط جيدًا انظر هل يبدأ المحوران من الصفر وهل المقاييس متساوية. فإذا لم يبدأ المحور العمودي من 0 بدت الفروق الصغيرة كبيرة جدًا. وفي المخططات المصوّرة إذا ضوعف الرسم طولًا وعرضًا صارت مساحته أربعة أضعاف: فيبدو الفرق منتفخًا.',
            'To read a chart well, check whether the axes start at zero and whether the scales are equal. If the vertical axis does not start at 0, small differences look huge. In picture charts, if a drawing is made twice as tall and twice as wide, its area is four times as big: the difference looks blown up.'
        ),
        problem: say('Grafiko batean salmentak igo dira: lehen 96 ziren eta orain 100, eta barra bat bestea baino hiru aldiz altuagoa ikusten da. Zenbat igo dira ehunekotan?', 'En un gráfico las ventas pasan de 96 a 100 y una barra se ve el triple de alta que la otra. ¿Cuánto han subido en porcentaje?', 'في مخطط ترتفع المبيعات من 96 إلى 100 ويبدو عمود أعلى من الآخر بثلاث مرات. كم ارتفعت بالنسبة المئوية؟', 'On a chart sales go from 96 to 100 and one bar looks three times as tall as the other. By what percentage have they risen?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Igoera zati hasierakoa.', 'La subida entre lo inicial.', 'الزيادة على القيمة الابتدائية.', 'The rise over the starting value.'), math: same('$\\frac{4}{96}\\cdot 100\\approx 4{,}2$') },
            { text: say('Ardatza ez da 0-tik hasten: hiru aldiz altuagoa ikusten da, baina % 4 inguru da.', 'El eje no empieza en 0: se ve el triple, pero es un 4 % aproximadamente.', 'المحور لا يبدأ من 0: يبدو ثلاثة أضعاف لكنه نحو 4 %.', 'The axis does not start at 0: it looks three times as tall, but it is about 4%.') }
        ],
        example: same('$2\\cdot 2=4$'),
        mistake: {
            wrong: say('Barra bat bestea baino bi aldiz altuagoa bada, balioa bikoitza da beti.', 'Si una barra es el doble de alta que otra, su valor es siempre el doble.', 'إذا كان عمود أعلى من آخر بمرتين فقيمته ضعفها دائمًا.', 'If one bar is twice as tall as another, its value is always double.'),
            right: say('Ardatza 0-tik hasten bada bakarrik. Bestela, irakurri zenbakiak.', 'Solo si el eje empieza en 0. Si no, lee los números.', 'فقط إذا بدأ المحور من 0. وإلا فاقرأ الأعداد.', 'Only if the axis starts at 0. Otherwise, read the numbers.')
        },
        takeaway: say('Begiratu ARDATZA: 0-tik hasten al da?', 'Mira el EJE: ¿empieza en 0?', 'انظر إلى المحور: هل يبدأ من 0؟', 'Look at the AXIS: does it start at 0?'),
        figure: (language) => <MisleadingFigure language={language} />
    },
    /* ---------- 3. Measures of centre ---------- */
    {
        id: 'mean',
        stage: 'centre',
        title: say('Batez besteko aritmetikoa', 'La media aritmética', 'المتوسط الحسابي', 'The mean'),
        goal: say('Datu-zerrenda baten eta maiztasun-taula baten batez bestekoa kalkulatzea.', 'Calcular la media de una lista de datos y de una tabla de frecuencias.', 'حساب متوسط قائمة بيانات وجدول تكرارات.', 'Work out the mean of a list of data and of a frequency table.'),
        explanation: say(
            'Batez bestekoa datu guztien batura zati datu kopurua da: $\\bar{x}=\\frac{\\Sigma x_{i}}{N}$. Taula batean, balio bakoitza bere maiztasunaz biderkatzen da: $\\bar{x}=\\frac{\\Sigma x_{i}f_{i}}{N}$. Datu guztiak erabiltzen ditu, eta horregatik muturreko balio batek asko mugitzen du.',
            'La media es la suma de todos los datos entre el número de datos: $\\bar{x}=\\frac{\\Sigma x_{i}}{N}$. En una tabla, cada valor se multiplica por su frecuencia: $\\bar{x}=\\frac{\\Sigma x_{i}f_{i}}{N}$. Usa todos los datos, y por eso un valor extremo la mueve mucho.',
            'المتوسط هو مجموع كل البيانات على عددها: $\\bar{x}=\\frac{\\Sigma x_{i}}{N}$. وفي الجدول تُضرب كل قيمة في تكرارها: $\\bar{x}=\\frac{\\Sigma x_{i}f_{i}}{N}$. وهو يستعمل كل البيانات، ولذلك تحرّكه قيمة متطرفة كثيرًا.',
            'The mean is the sum of all the data divided by how many there are: $\\bar{x}=\\frac{\\Sigma x_{i}}{N}$. In a table, each value is multiplied by its frequency: $\\bar{x}=\\frac{\\Sigma x_{i}f_{i}}{N}$. It uses every datum, so one extreme value moves it a lot.'
        ),
        problem: say('Taula: $x_{i}=1,2,3$ eta $f_{i}=4,5,1$. Zein da batez bestekoa?', 'Tabla: $x_{i}=1,2,3$ y $f_{i}=4,5,1$. ¿Cuál es la media?', 'الجدول: $x_{i}=1,2,3$ و$f_{i}=4,5,1$. ما المتوسط؟', 'Table: $x_{i}=1,2,3$ and $f_{i}=4,5,1$. What is the mean?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu eta batu.', 'Multiplica y suma.', 'اضرب واجمع.', 'Multiply and add.'), math: same('$1\\cdot 4+2\\cdot 5+3\\cdot 1=17$') },
            { text: say('Zatitu $N$ zenbakiaz.', 'Divide entre $N$.', 'اقسم على $N$.', 'Divide by $N$.'), math: same('$\\frac{17}{10}=1{,}7$') }
        ],
        example: same('$\\frac{6+8+7}{3}=7$'),
        mistake: {
            wrong: same('$\\bar{x}=\\frac{1+2+3}{3}=2$'),
            right: say('Taula batean balioak maiztasunez biderkatzen dira eta $N=10$ zenbakiaz zatitzen: $1{,}7$.', 'En una tabla los valores se multiplican por su frecuencia y se divide entre $N=10$: $1{,}7$.', 'في الجدول تُضرب القيم في تكراراتها ويُقسم على $N=10$: $1{,}7$.', 'In a table the values are multiplied by their frequencies and divided by $N=10$: $1{,}7$.')
        },
        takeaway: same('$\\bar{X}=\\frac{\\Sigma X_{I}F_{I}}{N}$'),
        figure: (language) => <MeanTableFigure language={language} />
    },
    {
        id: 'median',
        stage: 'centre',
        title: say('Mediana', 'La mediana', 'الوسيط', 'The median'),
        goal: say('Datuak ordenatu eta erdiko balioa aurkitzea.', 'Ordenar los datos y encontrar el valor central.', 'ترتيب البيانات وإيجاد القيمة الوسطى.', 'Sort the data and find the middle value.'),
        explanation: say(
            'Mediana datuak ordenatuta erdian geratzen den balioa da: datuen erdia haren azpian daude eta beste erdia gainean. Datu kopurua bakoitia bada, erdiko datua da; bikoitia bada, erdiko bi datuen batez bestekoa. Muturreko balioek ez dute mugitzen, eta horregatik batzuetan batez bestekoa baino hobeto deskribatzen du talde bat.',
            'La mediana es el valor que queda en medio cuando los datos están ordenados: la mitad de los datos están por debajo y la otra mitad por encima. Si el número de datos es impar, es el dato central; si es par, la media de los dos centrales. Los valores extremos no la mueven, y por eso a veces describe un grupo mejor que la media.',
            'الوسيط هو القيمة التي تقع في المنتصف عند ترتيب البيانات: نصفها تحته ونصفها فوقه. إذا كان عدد البيانات فرديًا فهو البيان الأوسط، وإذا كان زوجيًا فهو متوسط البيانين الأوسطين. والقيم المتطرفة لا تحرّكه، ولذلك يصف المجموعة أحيانًا أفضل من المتوسط.',
            'The median is the value that ends up in the middle when the data are sorted: half the data are below it and half above. With an odd number of data it is the middle datum; with an even number, the mean of the two middle ones. Extreme values do not move it, so it sometimes describes a group better than the mean.'
        ),
        problem: say('Datuak: $7,\\ 2,\\ 9,\\ 4,\\ 6,\\ 3$. Zein da mediana?', 'Datos: $7,\\ 2,\\ 9,\\ 4,\\ 6,\\ 3$. ¿Cuál es la mediana?', 'البيانات: $7,\\ 2,\\ 9,\\ 4,\\ 6,\\ 3$. ما الوسيط؟', 'Data: $7,\\ 2,\\ 9,\\ 4,\\ 6,\\ 3$. What is the median?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordenatu.', 'Ordena.', 'رتّب.', 'Sort.'), math: same('$2,\\ 3,\\ 4,\\ 6,\\ 7,\\ 9$') },
            { text: say('Sei datu: erdiko bien batez bestekoa.', 'Seis datos: la media de los dos centrales.', 'ستة بيانات: متوسط البيانين الأوسطين.', 'Six data: the mean of the two middle ones.'), math: same('$\\frac{4+6}{2}=5$') }
        ],
        example: same('$1,\\ 3,\\ 8\\ \\to\\ 3$'),
        mistake: {
            wrong: say('$7,\\ 2,\\ 9,\\ 4,\\ 6$ datuen mediana 9 da, erdian dagoelako.', 'La mediana de $7,\\ 2,\\ 9,\\ 4,\\ 6$ es 9, porque está en medio.', 'وسيط $7,\\ 2,\\ 9,\\ 4,\\ 6$ هو 9 لأنه في المنتصف.', 'The median of $7,\\ 2,\\ 9,\\ 4,\\ 6$ is 9, because it is in the middle.'),
            right: say('Lehenik ordenatu: $2,\\ 4,\\ 6,\\ 7,\\ 9$. Mediana 6 da.', 'Primero ordena: $2,\\ 4,\\ 6,\\ 7,\\ 9$. La mediana es 6.', 'رتّب أولًا: $2,\\ 4,\\ 6,\\ 7,\\ 9$. الوسيط 6.', 'Sort first: $2,\\ 4,\\ 6,\\ 7,\\ 9$. The median is 6.')
        },
        takeaway: say('Lehenik ORDENATU, gero ERDIKOA.', 'Primero ORDENA, después el CENTRAL.', 'رتّب أولًا ثم خذ الأوسط.', 'First SORT, then the MIDDLE one.'),
        figure: (language) => <MedianTableFigure language={language} />
    },
    {
        id: 'mode',
        stage: 'centre',
        title: say('Moda eta neurrien konparazioa', 'La moda y comparar medidas', 'المنوال ومقارنة المقاييس', 'The mode and comparing measures'),
        goal: say('Moda aurkitzea eta zentralizazio-neurri egokiena aukeratzea.', 'Encontrar la moda y elegir la medida de centralización más adecuada.', 'إيجاد المنوال واختيار مقياس النزعة المركزية الأنسب.', 'Find the mode and choose the most suitable measure of centre.'),
        explanation: say(
            'Moda maiztasun handiena duen balioa da. Aldagai kualitatiboetan ere erabil daiteke (kolore gogokoena). Banaketa batek moda bat baino gehiago izan ditzake. Datuak simetrikoak direnean, batez bestekoa, mediana eta moda gutxi gorabehera berdinak dira; muturreko balioak daudenean, mediana hobea da.',
            'La moda es el valor con mayor frecuencia. Se puede usar también con variables cualitativas (color favorito). Una distribución puede tener más de una moda. Cuando los datos son simétricos, media, mediana y moda son parecidas; cuando hay valores extremos, la mediana es mejor.',
            'المنوال هو القيمة ذات التكرار الأكبر. ويمكن استعماله أيضًا مع المتغيّرات النوعية (اللون المفضّل). وقد يكون للتوزيع أكثر من منوال. وعندما تكون البيانات متناظرة يتقارب المتوسط والوسيط والمنوال، وعند وجود قيم متطرفة يكون الوسيط أفضل.',
            'The mode is the value with the highest frequency. It also works for qualitative variables (favourite colour). A distribution can have more than one mode. When the data are symmetric, mean, median and mode are about the same; when there are extreme values, the median is better.'
        ),
        problem: say('Oinetakoen neurriak: 38 → 3, 39 → 7, 40 → 5, 41 → 2. Zein da moda?', 'Tallas de zapato: 38 → 3, 39 → 7, 40 → 5, 41 → 2. ¿Cuál es la moda?', 'مقاسات الأحذية: 38 ← 3، 39 ← 7، 40 ← 5، 41 ← 2. ما المنوال؟', 'Shoe sizes: 38 → 3, 39 → 7, 40 → 5, 41 → 2. What is the mode?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maiztasun handiena 7 da.', 'La mayor frecuencia es 7.', 'أكبر تكرار 7.', 'The highest frequency is 7.') },
            { text: say('Moda balioa da, ez maiztasuna.', 'La moda es el valor, no la frecuencia.', 'المنوال هو القيمة لا التكرار.', 'The mode is the value, not the frequency.'), math: same('$Mo=39$') }
        ],
        example: same('$2,\\ 5,\\ 5,\\ 8\\ \\to\\ 5$'),
        mistake: {
            wrong: say('Moda 7 da, maiztasunik handiena delako.', 'La moda es 7, porque es la mayor frecuencia.', 'المنوال 7 لأنه أكبر تكرار.', 'The mode is 7, because it is the highest frequency.'),
            right: say('7 maiztasuna da; moda 39 neurria da, gehien errepikatzen dena.', '7 es la frecuencia; la moda es la talla 39, la que más se repite.', '7 هو التكرار؛ والمنوال هو المقاس 39 الأكثر تكرارًا.', '7 is the frequency; the mode is size 39, the one that repeats most.')
        },
        takeaway: say('Moda: GEHIEN errepikatzen den BALIOA.', 'Moda: el VALOR que MÁS se repite.', 'المنوال: القيمة الأكثر تكرارًا.', 'Mode: the VALUE that repeats MOST.'),
        figure: (language) => <SymmetryFigure language={language} />
    },
    /* ---------- 4. Position and spread ---------- */
    {
        id: 'range-quartiles',
        stage: 'spread',
        title: say('Ibiltartea eta kuartilak', 'Recorrido y cuartiles', 'المدى والربيعيات', 'Range and quartiles'),
        goal: say('Ibiltartea eta kuartilak kalkulatzea.', 'Calcular el recorrido y los cuartiles.', 'حساب المدى والربيعيات.', 'Work out the range and the quartiles.'),
        explanation: say(
            'Ibiltartea datu handiena ken txikiena da: datuak zenbat zabaltzen diren esaten du. Kuartilek datu ordenatuak lau zati berdinetan banatzen dituzte: $Q_{1}$ datuen laurdenaren azpian, mediana $Q_{2}$ erdian eta $Q_{3}$ hiru laurdenen azpian. $Q_{1}$ aurkitzeko, kalkulatu $\\frac{N}{4}$: zenbaki osoa bada, posizio horretako eta hurrengoko datuen batez bestekoa; bestela, hurrengo datua.',
            'El recorrido es el dato mayor menos el menor: dice cuánto se extienden los datos. Los cuartiles dividen los datos ordenados en cuatro partes iguales: $Q_{1}$ deja por debajo la cuarta parte, la mediana $Q_{2}$ la mitad y $Q_{3}$ tres cuartas partes. Para hallar $Q_{1}$, calcula $\\frac{N}{4}$: si es entero, la media del dato de esa posición y el siguiente; si no, el dato siguiente.',
            'المدى هو أكبر بيان ناقص أصغرها: يقول كم تمتد البيانات. والربيعيات تقسم البيانات المرتّبة أربعة أجزاء متساوية: $Q_{1}$ تحته الربع، والوسيط $Q_{2}$ تحته النصف، و$Q_{3}$ تحته ثلاثة أرباع. ولإيجاد $Q_{1}$ احسب $\\frac{N}{4}$: إن كان صحيحًا فمتوسط بيان ذلك الموضع والذي يليه، وإلا فالبيان التالي.',
            'The range is the largest datum minus the smallest: it tells how far the data spread. The quartiles split the sorted data into four equal parts: $Q_{1}$ has a quarter below it, the median $Q_{2}$ half and $Q_{3}$ three quarters. To find $Q_{1}$, work out $\\frac{N}{4}$: if it is whole, the mean of the datum in that place and the next one; if not, the next datum.'
        ),
        problem: say('Datu ordenatuak: $3,\\ 5,\\ 6,\\ 8,\\ 9,\\ 11,\\ 12,\\ 15$. Kalkulatu ibiltartea eta $Q_{1}$.', 'Datos ordenados: $3,\\ 5,\\ 6,\\ 8,\\ 9,\\ 11,\\ 12,\\ 15$. Calcula el recorrido y $Q_{1}$.', 'بيانات مرتّبة: $3,\\ 5,\\ 6,\\ 8,\\ 9,\\ 11,\\ 12,\\ 15$. احسب المدى و$Q_{1}$.', 'Sorted data: $3,\\ 5,\\ 6,\\ 8,\\ 9,\\ 11,\\ 12,\\ 15$. Work out the range and $Q_{1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ibiltartea.', 'Recorrido.', 'المدى.', 'Range.'), math: same('$15-3=12$') },
            { text: say('$\\frac{8}{4}=2$ osoa da: 2. eta 3. datuak.', '$\\frac{8}{4}=2$ es entero: datos 2.º y 3.º', '$\\frac{8}{4}=2$ صحيح: البيانان الثاني والثالث.', '$\\frac{8}{4}=2$ is whole: the 2nd and 3rd data.'), math: same('$Q_{1}=\\frac{5+6}{2}=5{,}5$') }
        ],
        example: same('$11{,}5-5{,}5=6$'),
        mistake: {
            wrong: say('Ibiltartea azken datua ken lehena da, ordenatu gabe: $7,\\ 2,\\ 9,\\ 4\\ \\to\\ 4-7$.', 'El recorrido es el último dato menos el primero, sin ordenar: $7,\\ 2,\\ 9,\\ 4\\ \\to\\ 4-7$.', 'المدى هو البيان الأخير ناقص الأول دون ترتيب: $7,\\ 2,\\ 9,\\ 4\\ \\to\\ 4-7$.', 'The range is the last datum minus the first, unsorted: $7,\\ 2,\\ 9,\\ 4\\ \\to\\ 4-7$.'),
            right: say('Handiena ken txikiena: $9-2=7$.', 'El mayor menos el menor: $9-2=7$.', 'الأكبر ناقص الأصغر: $9-2=7$.', 'The largest minus the smallest: $9-2=7$.')
        },
        takeaway: say('Ibiltartea: HANDIENA − TXIKIENA. $Q_{1}$: $\\frac{N}{4}$.', 'Recorrido: MAYOR − MENOR. $Q_{1}$: $\\frac{N}{4}$.', 'المدى: الأكبر − الأصغر. $Q_{1}$: $\\frac{N}{4}$.', 'Range: LARGEST − SMALLEST. $Q_{1}$: $\\frac{N}{4}$.'),
        figure: (language) => <QuartilesFigure language={language} />
    },
    {
        id: 'box-plot',
        stage: 'spread',
        title: say('Kutxa-diagrama', 'El diagrama de caja', 'مخطط الصندوق', 'The box plot'),
        goal: say('Kutxa-diagrama bat irakurtzea eta marraztea.', 'Leer y dibujar un diagrama de caja y bigotes.', 'قراءة مخطط الصندوق ورسمه.', 'Read and draw a box plot.'),
        explanation: say(
            'Kutxa-diagramak bost zenbaki erakusten ditu: txikiena, $Q_{1}$, mediana, $Q_{3}$ eta handiena. Kutxa $Q_{1}$-etik $Q_{3}$-ra doa, eta datuen erdia dauka barruan; haren luzera kuartil arteko ibiltartea da, $Q_{3}-Q_{1}$. Biboteak muturretaraino doaz. Kutxa estua bada, erdiko datuak elkarrengandik hurbil daude.',
            'El diagrama de caja muestra cinco números: el mínimo, $Q_{1}$, la mediana, $Q_{3}$ y el máximo. La caja va de $Q_{1}$ a $Q_{3}$ y contiene la mitad de los datos; su longitud es el rango intercuartílico, $Q_{3}-Q_{1}$. Los bigotes llegan hasta los extremos. Si la caja es estrecha, los datos centrales están muy juntos.',
            'يُظهر مخطط الصندوق خمسة أعداد: الأصغر و$Q_{1}$ والوسيط و$Q_{3}$ والأكبر. يمتد الصندوق من $Q_{1}$ إلى $Q_{3}$ ويحوي نصف البيانات، وطوله المدى الربيعي $Q_{3}-Q_{1}$. ويصل الشاربان إلى الطرفين. وإذا كان الصندوق ضيقًا فالبيانات الوسطى متقاربة.',
            'A box plot shows five numbers: the minimum, $Q_{1}$, the median, $Q_{3}$ and the maximum. The box goes from $Q_{1}$ to $Q_{3}$ and holds half the data; its length is the interquartile range, $Q_{3}-Q_{1}$. The whiskers reach the extremes. A narrow box means the middle data are close together.'
        ),
        problem: say('Kutxa-diagrama batean: txikiena 4, $Q_{1}=7$, mediana 10, $Q_{3}=15$, handiena 20. Zein da kuartil arteko ibiltartea? Datuen zer ehuneko daude 7 eta 15 artean?', 'En un diagrama de caja: mínimo 4, $Q_{1}=7$, mediana 10, $Q_{3}=15$, máximo 20. ¿Cuál es el rango intercuartílico? ¿Qué porcentaje de datos hay entre 7 y 15?', 'في مخطط صندوق: الأصغر 4، $Q_{1}=7$، الوسيط 10، $Q_{3}=15$، الأكبر 20. ما المدى الربيعي؟ وما نسبة البيانات بين 7 و15؟', 'In a box plot: minimum 4, $Q_{1}=7$, median 10, $Q_{3}=15$, maximum 20. What is the interquartile range? What percentage of the data lie between 7 and 15?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kutxaren luzera.', 'Longitud de la caja.', 'طول الصندوق.', 'Length of the box.'), math: same('$15-7=8$') },
            { text: say('Kutxak datuen erdia dauka: % 50.', 'La caja tiene la mitad de los datos: el 50 %.', 'الصندوق يحوي نصف البيانات: 50 %.', 'The box holds half the data: 50%.') }
        ],
        example: same('$20-4=16$'),
        mistake: {
            wrong: say('Kutxaren erdiko marra batez bestekoa da.', 'La raya del medio de la caja es la media.', 'الخط الأوسط في الصندوق هو المتوسط.', 'The line in the middle of the box is the mean.'),
            right: say('Erdiko marra mediana da: datuen erdia haren alde bakoitzean.', 'La raya del medio es la mediana: la mitad de los datos a cada lado.', 'الخط الأوسط هو الوسيط: نصف البيانات على كل جانب.', 'The middle line is the median: half the data on each side.')
        },
        takeaway: say('Kutxa: $Q_{1}$ → $Q_{3}$, datuen % 50.', 'Caja: $Q_{1}$ → $Q_{3}$, el 50 % de los datos.', 'الصندوق: $Q_{1}$ ← $Q_{3}$، 50 % من البيانات.', 'Box: $Q_{1}$ → $Q_{3}$, 50% of the data.'),
        figure: (language) => <BoxPlotFigure language={language} />
    },
    {
        id: 'variance',
        stage: 'spread',
        title: say('Bariantza eta desbideratze tipikoa', 'Varianza y desviación típica', 'التباين والانحراف المعياري', 'Variance and standard deviation'),
        goal: say('Datuak batez bestekoarekiko nola sakabanatzen diren neurtzea.', 'Medir cuánto se separan los datos de la media.', 'قياس مدى ابتعاد البيانات عن المتوسط.', 'Measure how far the data are from the mean.'),
        explanation: say(
            'Bariantza batez bestekoarekiko distantzien karratuen batez bestekoa da: $\\sigma^{2}=\\frac{\\Sigma(x_{i}-\\bar{x})^{2}}{N}$. Desbideratze tipikoa haren erro karratua da, $\\sigma$, eta datuen unitate berean neurtzen da. Zenbat eta handiagoa, orduan eta sakabanatuago daude datuak. Bariazio-koefizienteak, $\\frac{\\sigma}{\\bar{x}}$, batez besteko desberdineko bi talde konparatzen ditu.',
            'La varianza es la media de los cuadrados de las distancias a la media: $\\sigma^{2}=\\frac{\\Sigma(x_{i}-\\bar{x})^{2}}{N}$. La desviación típica es su raíz cuadrada, $\\sigma$, y se mide en las mismas unidades que los datos. Cuanto mayor es, más dispersos están los datos. El coeficiente de variación, $\\frac{\\sigma}{\\bar{x}}$, compara dos grupos con medias distintas.',
            'التباين هو متوسط مربعات المسافات عن المتوسط: $\\sigma^{2}=\\frac{\\Sigma(x_{i}-\\bar{x})^{2}}{N}$. والانحراف المعياري جذره التربيعي $\\sigma$، ويُقاس بوحدات البيانات نفسها. وكلما كبر زاد تشتت البيانات. ومعامل الاختلاف $\\frac{\\sigma}{\\bar{x}}$ يقارن مجموعتين متوسطاهما مختلفان.',
            'The variance is the mean of the squares of the distances from the mean: $\\sigma^{2}=\\frac{\\Sigma(x_{i}-\\bar{x})^{2}}{N}$. The standard deviation is its square root, $\\sigma$, measured in the same units as the data. The larger it is, the more spread out the data are. The coefficient of variation, $\\frac{\\sigma}{\\bar{x}}$, compares two groups with different means.'
        ),
        problem: say('Datuak: $2,\\ 4,\\ 6,\\ 8,\\ 10$. Kalkulatu bariantza eta desbideratze tipikoa.', 'Datos: $2,\\ 4,\\ 6,\\ 8,\\ 10$. Calcula la varianza y la desviación típica.', 'البيانات: $2,\\ 4,\\ 6,\\ 8,\\ 10$. احسب التباين والانحراف المعياري.', 'Data: $2,\\ 4,\\ 6,\\ 8,\\ 10$. Work out the variance and the standard deviation.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.', 'Mean.'), math: same('$\\frac{30}{5}=6$') },
            { text: say('Distantzien karratuak.', 'Cuadrados de las distancias.', 'مربعات المسافات.', 'Squares of the distances.'), math: same('$16+4+0+4+16=40$') },
            { text: say('Bariantza eta erroa.', 'Varianza y raíz.', 'التباين والجذر.', 'Variance and root.'), math: same('$\\frac{40}{5}=8\\ \\to\\ \\sigma=\\sqrt{8}\\approx 2{,}83$') }
        ],
        example: same('$\\sqrt{9}=3$'),
        mistake: {
            wrong: say('Distantziak batu eta zatitu besterik ez: $(-4)+(-2)+0+2+4=0$, beraz ez dago sakabanaketarik.', 'Basta sumar las distancias y dividir: $(-4)+(-2)+0+2+4=0$, así que no hay dispersión.', 'يكفي جمع المسافات والقسمة: $(-4)+(-2)+0+2+4=0$، إذن لا تشتت.', 'Just add the distances and divide: $(-4)+(-2)+0+2+4=0$, so there is no spread.'),
            right: say('Distantziek elkar deuseztatzen dute; horregatik karratura igotzen dira lehenik.', 'Las distancias se anulan entre sí; por eso primero se elevan al cuadrado.', 'المسافات يلغي بعضها بعضًا؛ لذلك تُربَّع أولًا.', 'The distances cancel each other out; that is why they are squared first.')
        },
        takeaway: same('$\\sigma=\\sqrt{\\frac{\\Sigma(X_{I}-\\bar{X})^{2}}{N}}$'),
        figure: (language) => <VarianceFigure language={language} />
    },
    /* ---------- 5. Probability ---------- */
    {
        id: 'events',
        stage: 'chance',
        title: say('Ausazko esperimentuak eta gertaerak', 'Experimentos aleatorios y sucesos', 'التجارب العشوائية والأحداث', 'Random experiments and events'),
        goal: say('Lagin-espazioa eta gertaerak idaztea.', 'Escribir el espacio muestral y los sucesos.', 'كتابة فضاء العيّنة والأحداث.', 'Write down the sample space and events.'),
        explanation: say(
            'Ausazko esperimentu batean ezin da jakin zer aterako den, nahiz eta emaitza posibleak ezagutu. Lagin-espazioa $E$ emaitza posible guztien multzoa da. Gertaera bat haren zati bat da: dado batean, «bikoitia» $A=\\{2,4,6\\}$ da. Aurkako gertaera $\\bar{A}$ $A$ betetzen ez denean gertatzen da. Bi gertaera bateraezinak dira batera gerta ezin badira.',
            'En un experimento aleatorio no se puede saber qué saldrá, aunque se conozcan los resultados posibles. El espacio muestral $E$ es el conjunto de todos los resultados posibles. Un suceso es una parte de él: en un dado, «par» es $A=\\{2,4,6\\}$. El suceso contrario $\\bar{A}$ ocurre cuando no ocurre $A$. Dos sucesos son incompatibles si no pueden ocurrir a la vez.',
            'في التجربة العشوائية لا يمكن معرفة ما سيظهر وإن عُرفت النتائج الممكنة. وفضاء العيّنة $E$ مجموعة كل النتائج الممكنة. والحدث جزء منه: في النرد «زوجي» هو $A=\\{2,4,6\\}$. والحدث المتمّم $\\bar{A}$ يقع عندما لا يقع $A$. والحدثان متنافيان إذا لم يمكن وقوعهما معًا.',
            'In a random experiment you cannot know what will come up, even if you know the possible outcomes. The sample space $E$ is the set of all possible outcomes. An event is a part of it: on a die, «even» is $A=\\{2,4,6\\}$. The complementary event $\\bar{A}$ happens when $A$ does not. Two events are mutually exclusive if they cannot happen together.'
        ),
        problem: say('Dado bat jaurtitzen da. $A$: «4 baino handiagoa». Idatzi $A$ eta $\\bar{A}$.', 'Se lanza un dado. $A$: «mayor que 4». Escribe $A$ y $\\bar{A}$.', 'يُرمى نرد. $A$: «أكبر من 4». اكتب $A$ و$\\bar{A}$.', 'A die is rolled. $A$: «greater than 4». Write $A$ and $\\bar{A}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lagin-espazioa.', 'Espacio muestral.', 'فضاء العيّنة.', 'Sample space.'), math: same('$E=\\{1,2,3,4,5,6\\}$') },
            { text: say('Gertaera eta aurkakoa.', 'Suceso y contrario.', 'الحدث ومتمّمه.', 'Event and complement.'), math: same('$A=\\{5,6\\},\\ \\bar{A}=\\{1,2,3,4\\}$') }
        ],
        example: same('$E=\\{C,X\\}$'),
        mistake: {
            wrong: say('«Bikoitia» eta «3 baino handiagoa» bateraezinak dira.', '«Par» y «mayor que 3» son incompatibles.', '«زوجي» و«أكبر من 3» متنافيان.', '«Even» and «greater than 3» are mutually exclusive.'),
            right: say('Biak gerta daitezke batera: 4 edo 6 ateratzen bada. Bateragarriak dira.', 'Pueden ocurrir a la vez: si sale 4 o 6. Son compatibles.', 'يمكن وقوعهما معًا: إذا ظهر 4 أو 6. فهما غير متنافيين.', 'They can happen together: if 4 or 6 comes up. They are not exclusive.')
        },
        takeaway: say('$\\bar{A}$: $A$ GERTATZEN EZ DENEAN.', '$\\bar{A}$: cuando NO ocurre $A$.', '$\\bar{A}$: عندما لا يقع $A$.', '$\\bar{A}$: when $A$ does NOT happen.'),
        figure: (language) => <EventsFigure language={language} />
    },
    {
        id: 'laplace',
        stage: 'chance',
        title: say('Laplaceren erregela', 'La regla de Laplace', 'قاعدة لابلاس', 'Laplace’s rule'),
        goal: say('Probabilitateak kalkulatzea emaitza berdin probableekin.', 'Calcular probabilidades con resultados igual de probables.', 'حساب الاحتمالات مع نتائج متساوية الاحتمال.', 'Work out probabilities with equally likely outcomes.'),
        explanation: say(
            'Emaitza guztiek aukera bera badute, gertaera baten probabilitatea aldeko kasuak zati kasu posibleak da. Probabilitatea beti 0 eta 1 artean dago: 0 ezinezkoa da eta 1 ziurra. Aurkako gertaerarena $P(\\bar{A})=1-P(A)$ da. Esperimentua askotan errepikatuz, maiztasun erlatiboa probabilitatera hurbiltzen da (zenbaki handien legea).',
            'Si todos los resultados tienen la misma posibilidad, la probabilidad de un suceso es casos favorables entre casos posibles. La probabilidad siempre está entre 0 y 1: 0 es imposible y 1 seguro. La del suceso contrario es $P(\\bar{A})=1-P(A)$. Al repetir muchas veces el experimento, la frecuencia relativa se acerca a la probabilidad (ley de los grandes números).',
            'إذا تساوت فرص كل النتائج فاحتمال الحدث هو الحالات المواتية على الحالات الممكنة. والاحتمال دائمًا بين 0 و1: 0 مستحيل و1 أكيد. واحتمال الحدث المتمّم $P(\\bar{A})=1-P(A)$. وعند تكرار التجربة مرات كثيرة يقترب التكرار النسبي من الاحتمال (قانون الأعداد الكبيرة).',
            'If every outcome is equally likely, the probability of an event is favourable cases over possible cases. A probability is always between 0 and 1: 0 is impossible and 1 is certain. For the complementary event, $P(\\bar{A})=1-P(A)$. Repeating the experiment many times, the relative frequency gets close to the probability (the law of large numbers).'
        ),
        problem: say('Poltsa batean 12 bola daude: 5 gorri, 4 urdin eta 3 berde. Zein da bola ez-gorri bat ateratzeko probabilitatea?', 'En una bolsa hay 12 bolas: 5 rojas, 4 azules y 3 verdes. ¿Cuál es la probabilidad de sacar una bola que no sea roja?', 'في كيس 12 كرة: 5 حمراء و4 زرقاء و3 خضراء. ما احتمال سحب كرة ليست حمراء؟', 'A bag holds 12 balls: 5 red, 4 blue and 3 green. What is the probability of drawing a ball that is not red?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gorria.', 'Roja.', 'حمراء.', 'Red.'), math: same('$P(R)=\\frac{5}{12}$') },
            { text: say('Aurkakoa.', 'Contrario.', 'المتمّم.', 'Complement.'), math: same('$1-\\frac{5}{12}=\\frac{7}{12}$') }
        ],
        example: same('$P(6)=\\frac{1}{6}$'),
        mistake: {
            wrong: say('Bi dado: batura 7 izateko probabilitatea $\\frac{1}{11}$ da, 11 batura posible daudelako (2, 3… 12).', 'Dos dados: la probabilidad de sumar 7 es $\\frac{1}{11}$, porque hay 11 sumas posibles (de 2 a 12).', 'نردان: احتمال أن يكون المجموع 7 هو $\\frac{1}{11}$ لأن هناك 11 مجموعًا ممكنًا (من 2 إلى 12).', 'Two dice: the probability of a total of 7 is $\\frac{1}{11}$, because there are 11 possible totals (from 2 to 12).'),
            right: say('Baturek ez dute aukera bera. 36 emaitza berdin probable daude, eta horietako 6 emaitzak ematen dute 7: $\\frac{6}{36}=\\frac{1}{6}$.', 'Las sumas no son igual de probables. Hay 36 resultados igual de probables y 6 dan 7: $\\frac{6}{36}=\\frac{1}{6}$.', 'المجاميع ليست متساوية الاحتمال. هناك 36 نتيجة متساوية الاحتمال و6 منها تعطي 7: $\\frac{6}{36}=\\frac{1}{6}$.', 'The totals are not equally likely. There are 36 equally likely outcomes and 6 give 7: $\\frac{6}{36}=\\frac{1}{6}$.')
        },
        takeaway: say('P = ALDEKOAK : POSIBLEAK, 0 eta 1 artean.', 'P = FAVORABLES : POSIBLES, entre 0 y 1.', 'الاحتمال = المواتية ÷ الممكنة، بين 0 و1.', 'P = FAVOURABLE ÷ POSSIBLE, between 0 and 1.'),
        figure: (language) => <TwoDiceFigure language={language} />
    },
    {
        id: 'compound',
        stage: 'chance',
        title: say('Esperimentu konposatuak', 'Experimentos compuestos', 'التجارب المركّبة', 'Compound experiments'),
        goal: say('Zuhaitz-diagramekin bi urratseko probabilitateak kalkulatzea.', 'Calcular probabilidades de dos pasos con diagramas de árbol.', 'حساب احتمالات خطوتين بمخططات الشجرة.', 'Work out two-step probabilities with tree diagrams.'),
        explanation: say(
            'Esperimentu batek urrats bat baino gehiago dituenean, zuhaitz-diagrama batek emaitza guztiak erakusten ditu. Bide baten probabilitatea bere adarren probabilitateen biderkadura da. Hainbat bidek gertaera bera ematen badute, haien probabilitateak batu egiten dira. Itzuli gabe ateratzean, bigarren adarrak aldatzen dira: bola bat gutxiago dago.',
            'Cuando un experimento tiene más de un paso, un diagrama de árbol muestra todos los resultados. La probabilidad de un camino es el producto de las probabilidades de sus ramas. Si varios caminos dan el mismo suceso, sus probabilidades se suman. Al sacar sin devolver, las segundas ramas cambian: hay una bola menos.',
            'عندما تكون للتجربة أكثر من خطوة يُظهر مخطط الشجرة كل النتائج. واحتمال مسار هو حاصل ضرب احتمالات فروعه. وإذا أعطت عدة مسارات الحدث نفسه جُمعت احتمالاتها. وعند السحب دون إرجاع تتغيّر الفروع الثانية: تنقص كرة واحدة.',
            'When an experiment has more than one step, a tree diagram shows every outcome. The probability of a path is the product of the probabilities of its branches. If several paths give the same event, their probabilities are added. When drawing without putting back, the second branches change: there is one ball fewer.'
        ),
        problem: say('Poltsa batean 3 bola gorri eta 2 urdin daude. Bi atera dira, itzuli gabe. Zein da biak gorriak izateko probabilitatea?', 'En una bolsa hay 3 bolas rojas y 2 azules. Se sacan dos sin devolver. ¿Cuál es la probabilidad de que las dos sean rojas?', 'في كيس 3 كرات حمراء و2 زرقاوان. تُسحب كرتان دون إرجاع. ما احتمال أن تكونا حمراوين؟', 'A bag holds 3 red balls and 2 blue ones. Two are drawn without putting back. What is the probability that both are red?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoa gorria.', 'La primera roja.', 'الأولى حمراء.', 'First one red.'), math: same('$\\frac{3}{5}$') },
            { text: say('Bigarrena gorria: 4 bola geratzen dira, 2 gorri.', 'La segunda roja: quedan 4 bolas, 2 rojas.', 'الثانية حمراء: تبقى 4 كرات منها 2 حمراوان.', 'Second one red: 4 balls left, 2 red.'), math: same('$\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{6}{20}=\\frac{3}{10}$') }
        ],
        example: same('$\\frac{1}{2}\\cdot\\frac{1}{2}=\\frac{1}{4}$'),
        mistake: {
            wrong: same('$\\frac{3}{5}\\cdot\\frac{3}{5}=\\frac{9}{25}$'),
            right: say('Itzuli gabe, bigarren aldian 4 bola daude eta 2 gorri: $\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$.', 'Sin devolver, la segunda vez hay 4 bolas y 2 rojas: $\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$.', 'دون إرجاع تكون في المرة الثانية 4 كرات منها 2 حمراوان: $\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$.', 'Without putting back, the second time there are 4 balls and 2 red: $\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$.')
        },
        takeaway: say('Bide batean: BIDERKATU. Bideen artean: BATU.', 'En un camino: MULTIPLICA. Entre caminos: SUMA.', 'في المسار: اضرب. بين المسارات: اجمع.', 'Along a path: MULTIPLY. Across paths: ADD.'),
        figure: (language) => <TreeFigure language={language} />
    }
]

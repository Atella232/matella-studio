import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BarChartFigure, DiceFigure, FrequencyTableFigure, LineChartFigure, MeanFigure, PieChartFigure, PopulationFigure } from './figures'

/* ==========================================================================
   Estatistika · 1. DBH — stages and lessons
   Sequence follows Anaya 1.º ESO unit 15 (statistical study, frequency
   tables, graphs, parameters) and Santillana 1.º ESO unit 14 (random
   experiments, sample space, events, relative frequency and Laplace's
   rule). The class survey on favourite sports runs through the unit.
   Decimals with a comma (a point in Arabic).
   ========================================================================== */

export type StatisticsIntroStageId = 'data' | 'tables' | 'graphs' | 'parameters' | 'probability'

const dec = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })

export const statisticsIntroStages: UnitStage[] = [
    { id: 'data', tone: 'blue', title: { eu: 'Datuak eta aldagaiak', es: 'Datos y variables', ar: 'البيانات والمتغيرات' } },
    { id: 'tables', tone: 'violet', title: { eu: 'Maiztasun-taulak', es: 'Tablas de frecuencias', ar: 'جداول التكرارات' } },
    { id: 'graphs', tone: 'mustard', title: { eu: 'Grafikoak', es: 'Gráficos', ar: 'التمثيلات البيانية' } },
    { id: 'parameters', tone: 'coral', title: { eu: 'Parametroak', es: 'Parámetros', ar: 'المقاييس' } },
    { id: 'probability', tone: 'green', title: { eu: 'Probabilitatea', es: 'Probabilidad', ar: 'الاحتمال' } }
]

export const statisticsIntroTopics: UnitTopic[] = [
    {
        id: 'study',
        stage: 'data',
        title: { eu: 'Azterketa estatistiko bat', es: 'Un estudio estadístico', ar: 'دراسة إحصائية' },
        goal: {
            eu: 'Populazioa, lagina eta banakoa bereiztea eta azterketa baten urratsak ezagutzea.',
            es: 'Distinguir población, muestra e individuo y conocer los pasos de un estudio.',
            ar: 'التمييز بين المجتمع والعيّنة والفرد ومعرفة خطوات الدراسة.'
        },
        explanation: {
            eu: 'Estatistikak datuak biltzen, antolatzen eta interpretatzen ditu. Aztertu nahi diren elementu guztiek populazioa osatzen dute; elementu bakoitza banakoa da. Askotan ezin da denei galdetu, eta haien zati bat hartzen da: lagina. Azterketa baten urratsak: zer aztertu erabaki, datuak bildu (inkesta), taula batean antolatu, grafikoz irudikatu eta ondorioak atera.',
            es: 'La estadística recoge, organiza e interpreta datos. Todos los elementos que se quieren estudiar forman la población; cada elemento es un individuo. Muchas veces no se puede preguntar a todos y se toma una parte: la muestra. Pasos de un estudio: decidir qué estudiar, recoger los datos (encuesta), organizarlos en una tabla, representarlos en un gráfico y sacar conclusiones.',
            ar: 'يجمع علم الإحصاء البيانات وينظّمها ويفسّرها. تكوّن كل العناصر التي نريد دراستها المجتمع، وكل عنصر فرد. وكثيرًا لا يمكن سؤال الجميع فنأخذ جزءًا منهم: العيّنة. خطوات الدراسة: تحديد ما ندرسه، وجمع البيانات (استبيان)، وتنظيمها في جدول، وتمثيلها بيانيًا، واستخلاص النتائج.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Populazioa', es: 'Población', ar: 'المجتمع' }, text: { eu: 'Ikastetxeko ikasle guztiak.', es: 'Todos los alumnos del instituto.', ar: 'كل تلاميذ المدرسة.' } },
            { title: { eu: 'Lagina', es: 'Muestra', ar: 'العيّنة' }, text: { eu: 'Maila bakoitzeko 20 ikasle, zoriz aukeratuta.', es: '20 alumnos de cada curso, elegidos al azar.', ar: '20 تلميذًا من كل صف مختارون عشوائيًا.' } },
            { title: { eu: 'Banakoa', es: 'Individuo', ar: 'الفرد' }, text: { eu: 'Ikasle bakoitza.', es: 'Cada alumno.', ar: 'كل تلميذ.' } }
        ],
        example: { eu: '$\\text{lagina}\\subset\\text{populazioa}$', es: '$\\text{muestra}\\subset\\text{población}$', ar: '$E\\subset P$' },
        takeaway: {
            eu: 'Lagina populazioaren zati bat da, eta ondo ordezkatu behar du.',
            es: 'La muestra es una parte de la población y tiene que representarla bien.',
            ar: 'العيّنة جزء من المجتمع ويجب أن تمثّله جيدًا.'
        },
        figure: (language) => <PopulationFigure language={language} />
    },
    {
        id: 'variables',
        stage: 'data',
        title: { eu: 'Aldagai estatistikoak', es: 'Variables estadísticas', ar: 'المتغيرات الإحصائية' },
        goal: {
            eu: 'Aldagai kualitatiboak eta kuantitatiboak (diskretuak eta jarraituak) bereiztea.',
            es: 'Distinguir variables cualitativas y cuantitativas (discretas y continuas).',
            ar: 'التمييز بين المتغيرات النوعية والكمية (المنفصلة والمتصلة).'
        },
        explanation: {
            eu: 'Aldagai estatistikoa banako bakoitzari aztertzen zaion ezaugarria da. Kualitatiboa da zenbakiz adierazten ez bada (kirol gogokoena, begien kolorea). Kuantitatiboa da zenbaki bat bada: diskretua, balio solteak hartzen baditu (anai-arreba kopurua), edo jarraitua, tarte bateko edozein balio har badezake (altuera, pisua).',
            es: 'Una variable estadística es la característica que se estudia en cada individuo. Es cualitativa si no se expresa con números (deporte favorito, color de ojos). Es cuantitativa si es un número: discreta si toma valores sueltos (número de hermanos) o continua si puede tomar cualquier valor de un intervalo (altura, peso).',
            ar: 'المتغير الإحصائي هو الخاصية التي ندرسها في كل فرد. ويكون نوعيًا إذا لم يُعبَّر عنه بأعداد (الرياضة المفضلة، لون العينين)، وكميًا إذا كان عددًا: منفصلًا إذا أخذ قيمًا متفرقة (عدد الإخوة)، أو متصلًا إذا أمكن أن يأخذ أي قيمة في مجال (الطول، الوزن).'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Kualitatiboa', es: 'Cualitativa', ar: 'نوعي' }, text: { eu: 'Ezaugarri bat: kirola, kolorea, jatorria.', es: 'Una cualidad: deporte, color, origen.', ar: 'صفة: الرياضة، اللون، الأصل.' } },
            { title: { eu: 'Kuantitatibo diskretua', es: 'Cuantitativa discreta', ar: 'كمي منفصل' }, text: { eu: 'Zenbatu egiten da: anai-arrebak, oinetako-zenbakia.', es: 'Se cuenta: hermanos, número de pie.', ar: 'يُعَدّ: الإخوة، مقاس الحذاء.' } },
            { title: { eu: 'Kuantitatibo jarraitua', es: 'Cuantitativa continua', ar: 'كمي متصل' }, text: { eu: 'Neurtu egiten da: altuera, denbora, pisua.', es: 'Se mide: altura, tiempo, peso.', ar: 'يُقاس: الطول، الزمن، الوزن.' } }
        ],
        example: dec('$1{,}62\\ \\text{m},\\ 1{,}58\\ \\text{m},\\ 1{,}70\\ \\text{m}$'),
        takeaway: {
            eu: 'Zenbatu → diskretua. Neurtu → jarraitua. Zenbakirik ez → kualitatiboa.',
            es: 'Se cuenta → discreta. Se mide → continua. Sin números → cualitativa.',
            ar: 'يُعَدّ ← منفصل. يُقاس ← متصل. بلا أعداد ← نوعي.'
        }
    },
    {
        id: 'frequencies',
        stage: 'tables',
        title: { eu: 'Maiztasun absolutua eta erlatiboa', es: 'Frecuencia absoluta y relativa', ar: 'التكرار المطلق والنسبي' },
        goal: {
            eu: 'Maiztasun absolutua, erlatiboa eta ehunekoa kalkulatzea.',
            es: 'Calcular la frecuencia absoluta, la relativa y el porcentaje.',
            ar: 'حساب التكرار المطلق والنسبي والنسبة المئوية.'
        },
        explanation: {
            eu: 'Datu baten maiztasun absolutua (fᵢ) zenbat aldiz errepikatzen den da. Maiztasun absolutu guztien batura datu kopurua da (N). Maiztasun erlatiboa (hᵢ) maiztasun absolutua zati N da, eta 0 eta 1 artean dago. Bider 100 eginda, ehunekoa lortzen da.',
            es: 'La frecuencia absoluta (fᵢ) de un dato es el número de veces que se repite. La suma de todas las frecuencias absolutas es el número de datos (N). La frecuencia relativa (hᵢ) es la absoluta entre N y está entre 0 y 1. Multiplicada por 100 da el porcentaje.',
            ar: 'التكرار المطلق (fᵢ) لقيمة هو عدد مرات تكرارها. ومجموع كل التكرارات المطلقة هو عدد البيانات (N). والتكرار النسبي (hᵢ) هو المطلق مقسومًا على N، ويقع بين 0 و1. وبضربه في 100 نحصل على النسبة المئوية.'
        },
        problem: { eu: '20 ikasletatik 8k futbola nahiago dute. Kalkulatu maiztasun erlatiboa eta ehunekoa.', es: 'De 20 alumnos, 8 prefieren el fútbol. Calcula la frecuencia relativa y el porcentaje.', ar: 'من 20 تلميذًا يفضّل 8 كرة القدم. احسب التكرار النسبي والنسبة المئوية.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Maiztasun absolutua: 8. Datu kopurua: N = 20.', es: 'Frecuencia absoluta: 8. Número de datos: N = 20.', ar: 'التكرار المطلق: 8. عدد البيانات: N = 20.' } },
            { text: { eu: 'Maiztasun erlatiboa: zatitu N-z.', es: 'Frecuencia relativa: divide entre N.', ar: 'التكرار النسبي: اقسم على N.' }, math: dec('$h=8\\mathbin{:}20=0{,}4$') },
            { text: { eu: 'Ehunekoa: bider 100.', es: 'Porcentaje: por 100.', ar: 'النسبة المئوية: في 100.' }, math: dec('$0{,}4\\cdot 100=40$') }
        ],
        example: dec('$\\frac{5}{20}=0{,}25\\ \\to\\ 25$'),
        takeaway: {
            eu: 'Maiztasun erlatibo guztiek 1 dute batuta; ehunekoek, 100.',
            es: 'Todas las frecuencias relativas suman 1; los porcentajes, 100.',
            ar: 'مجموع كل التكرارات النسبية 1، ومجموع النسب المئوية 100.'
        }
    },
    {
        id: 'table',
        stage: 'tables',
        title: { eu: 'Maiztasun-taula egitea', es: 'Construir una tabla de frecuencias', ar: 'بناء جدول تكرارات' },
        goal: {
            eu: 'Datu-zerrenda batetik maiztasun-taula osatzea.',
            es: 'Completar una tabla de frecuencias a partir de una lista de datos.',
            ar: 'إكمال جدول تكرارات انطلاقًا من قائمة بيانات.'
        },
        explanation: {
            eu: 'Datuak antolatzeko, idatzi balio desberdin bakoitza zutabe batean eta zenbatu zenbat aldiz agertzen den (marrak eginez errazagoa da). Gero kalkulatu maiztasun erlatiboak eta ehunekoak. Azkenik, egiaztatu: fᵢ guztiek N dute batuta, hᵢ guztiek 1 eta ehunekoek 100.',
            es: 'Para organizar los datos, escribe cada valor distinto en una columna y cuenta cuántas veces aparece (con palotes es más fácil). Después calcula las frecuencias relativas y los porcentajes. Al final, comprueba: las fᵢ suman N, las hᵢ suman 1 y los porcentajes, 100.',
            ar: 'لتنظيم البيانات اكتب كل قيمة مختلفة في عمود وعُدّ كم مرة تظهر (بالعلامات أسهل). ثم احسب التكرارات النسبية والنسب المئوية. وفي النهاية تحقّق: مجموع fᵢ يساوي N، ومجموع hᵢ يساوي 1، ومجموع النسب 100.'
        },
        problem: { eu: 'Anai-arreba kopurua: 1, 2, 0, 1, 1, 3, 2, 1, 0, 1. Egin taula.', es: 'Número de hermanos: 1, 2, 0, 1, 1, 3, 2, 1, 0, 1. Haz la tabla.', ar: 'عدد الإخوة: 1، 2، 0، 1، 1، 3، 2، 1، 0، 1. أنشئ الجدول.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Balioak: 0, 1, 2, 3.', es: 'Valores: 0, 1, 2, 3.', ar: 'القيم: 0، 1، 2، 3.' } },
            { text: { eu: 'Zenbatu: 0 → 2, 1 → 5, 2 → 2, 3 → 1.', es: 'Cuenta: 0 → 2, 1 → 5, 2 → 2, 3 → 1.', ar: 'عُدّ: 0 ← 2، 1 ← 5، 2 ← 2، 3 ← 1.' }, math: '$2+5+2+1=10$' },
            { text: { eu: 'Maiztasun erlatiboak: zati 10.', es: 'Frecuencias relativas: entre 10.', ar: 'التكرارات النسبية: على 10.' }, math: dec('$0{,}2+0{,}5+0{,}2+0{,}1=1$') }
        ],
        example: '$N=\\sum f_{i}=10$',
        takeaway: {
            eu: 'Egiaztatu beti fᵢ-en batura datu kopurua dela.',
            es: 'Comprueba siempre que la suma de las fᵢ es el número de datos.',
            ar: 'تحقّق دائمًا من أن مجموع fᵢ يساوي عدد البيانات.'
        },
        figure: (language) => <FrequencyTableFigure language={language} />
    },
    {
        id: 'bar-chart',
        stage: 'graphs',
        title: { eu: 'Barra-diagramak', es: 'Diagramas de barras', ar: 'مخططات الأعمدة' },
        goal: {
            eu: 'Barra-diagrama bat egitea eta irakurtzea.',
            es: 'Construir y leer un diagrama de barras.',
            ar: 'بناء مخطط أعمدة وقراءته.'
        },
        explanation: {
            eu: 'Barra-diagraman, balio bakoitzak barra bat du, eta barraren altuera haren maiztasuna da. Ardatz horizontalean balioak jartzen dira eta bertikalean maiztasunak, eskala egoki batekin. Aldagai kualitatiboetarako eta kuantitatibo diskretuetarako erabiltzen da.',
            es: 'En un diagrama de barras cada valor tiene una barra, y la altura de la barra es su frecuencia. En el eje horizontal van los valores y en el vertical las frecuencias, con una escala adecuada. Se usa para variables cualitativas y cuantitativas discretas.',
            ar: 'في مخطط الأعمدة لكل قيمة عمود، وارتفاع العمود هو تكرارها. توضع القيم على المحور الأفقي والتكرارات على الرأسي بمقياس مناسب. ويُستعمل للمتغيرات النوعية والكمية المنفصلة.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Marraztu bi ardatzak eta aukeratu eskala.', es: 'Dibuja los dos ejes y elige la escala.', ar: 'ارسم المحورين واختر المقياس.' } },
            { text: { eu: 'Balio bakoitzeko, marraztu bere maiztasunaren altuerako barra.', es: 'Para cada valor, dibuja una barra con la altura de su frecuencia.', ar: 'لكل قيمة ارسم عمودًا ارتفاعه تكرارها.' } },
            { text: { eu: 'Jarri izenburua eta ardatzen izenak.', es: 'Pon título y nombre a los ejes.', ar: 'ضع عنوانًا واسمًا للمحورين.' } }
        ],
        example: '$8,\\ 5,\\ 4,\\ 3$',
        takeaway: {
            eu: 'Barra altuena = modarik gabe ere ikusten da zein den gehien errepikatzen dena.',
            es: 'La barra más alta muestra de un vistazo el valor que más se repite.',
            ar: 'العمود الأعلى يُظهر فورًا القيمة الأكثر تكرارًا.'
        },
        figure: (language) => <BarChartFigure language={language} />
    },
    {
        id: 'pie-chart',
        stage: 'graphs',
        title: { eu: 'Sektore-diagramak', es: 'Diagramas de sectores', ar: 'المخططات الدائرية' },
        goal: {
            eu: 'Sektore-diagrama bateko angeluak kalkulatzea.',
            es: 'Calcular los ángulos de un diagrama de sectores.',
            ar: 'حساب زوايا مخطط دائري.'
        },
        explanation: {
            eu: 'Sektore-diagramak osoaren zatiak erakusten ditu, tarta bat bezala. Zirkulu osoa (360°) datu guztiak dira. Balio bakoitzaren sektoreak bere maiztasun erlatiboaren araberako angelua du: hᵢ · 360°.',
            es: 'El diagrama de sectores muestra las partes de un total, como una tarta. El círculo completo (360°) son todos los datos. El sector de cada valor tiene un ángulo proporcional a su frecuencia relativa: hᵢ · 360°.',
            ar: 'يُظهر المخطط الدائري أجزاء الكل كأنه كعكة. الدائرة كاملة (360°) هي كل البيانات. ولقطاع كل قيمة زاوية تتناسب مع تكرارها النسبي: hᵢ · 360°.'
        },
        problem: { eu: '20 ikasletatik 5ek saskibaloia nahiago dute. Zenbat gradu ditu bere sektoreak?', es: 'De 20 alumnos, 5 prefieren el baloncesto. ¿Cuántos grados mide su sector?', ar: 'من 20 تلميذًا يفضّل 5 كرة السلة. كم درجة قطاعها؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Pertsona bakoitzeko gradua: 360 zati 20.', es: 'Grados por persona: 360 entre 20.', ar: 'درجات كل شخص: 360 على 20.' }, math: '$360\\mathbin{:}20=18$' },
            { text: { eu: 'Bider maiztasuna.', es: 'Por la frecuencia.', ar: 'في التكرار.' }, math: '$5\\cdot 18=90$' },
            { text: { eu: 'Sektoreak 90° ditu: zirkuluaren laurdena.', es: 'El sector mide 90°: un cuarto del círculo.', ar: 'القطاع 90°: ربع الدائرة.' } }
        ],
        example: dec('$0{,}25\\cdot 360=90$'),
        takeaway: {
            eu: 'Angelu guztiek 360° dute batuta.',
            es: 'Todos los ángulos suman 360°.',
            ar: 'مجموع كل الزوايا 360°.'
        },
        figure: (language) => <PieChartFigure language={language} />
    },
    {
        id: 'line-chart',
        stage: 'graphs',
        title: { eu: 'Lerro-diagramak', es: 'Diagramas de líneas', ar: 'المخططات الخطية' },
        goal: {
            eu: 'Denboran aldatzen diren datuak lerro-diagrama batean irudikatzea eta irakurtzea.',
            es: 'Representar y leer datos que cambian con el tiempo en un diagrama de líneas.',
            ar: 'تمثيل بيانات تتغيّر مع الزمن بمخطط خطي وقراءتها.'
        },
        explanation: {
            eu: 'Datu batek denboran zehar nola aldatzen den ikusteko (tenperaturak, salmentak), puntu bakoitza bere egunari eta balioari dagokion lekuan jartzen da, eta puntuak zuzenki bidez lotzen dira. Lerroa igotzen bada, datua handitu da; jaisten bada, txikitu.',
            es: 'Para ver cómo cambia un dato a lo largo del tiempo (temperaturas, ventas), se pone cada punto en su día y su valor, y se unen los puntos con segmentos. Si la línea sube, el dato ha aumentado; si baja, ha disminuido.',
            ar: 'لرؤية كيف تتغيّر قيمة مع الزمن (درجات الحرارة، المبيعات) نضع كل نقطة عند يومها وقيمتها ونصل النقاط بقطع مستقيمة. إذا صعد الخط فالقيمة ازدادت، وإذا نزل فقد نقصت.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Igotzen da', es: 'Sube', ar: 'يصعد' }, text: { eu: 'Asteazkenetik ostiralera tenperatura igo da.', es: 'Del miércoles al viernes la temperatura sube.', ar: 'من الأربعاء إلى الجمعة ترتفع الحرارة.' }, math: '$15\\to 21$' },
            { title: { eu: 'Maximoa', es: 'Máximo', ar: 'القيمة العظمى' }, text: { eu: 'Punturik altuena: ostirala, 21°.', es: 'El punto más alto: el viernes, 21°.', ar: 'أعلى نقطة: الجمعة، 21°.' } }
        ],
        example: '$14,\\ 16,\\ 15,\\ 18,\\ 21,\\ 20,\\ 17$',
        takeaway: {
            eu: 'Lerro-diagramak aldaketak erakusten ditu: igoerak eta jaitsierak.',
            es: 'El diagrama de líneas muestra cambios: subidas y bajadas.',
            ar: 'المخطط الخطي يُظهر التغيّرات: الصعود والنزول.'
        },
        figure: (language) => <LineChartFigure language={language} />
    },
    {
        id: 'mean',
        stage: 'parameters',
        title: { eu: 'Batez bestekoa', es: 'La media', ar: 'المتوسط الحسابي' },
        goal: {
            eu: 'Datu-multzo baten batez bestekoa kalkulatzea.',
            es: 'Calcular la media de un conjunto de datos.',
            ar: 'حساب متوسط مجموعة بيانات.'
        },
        explanation: {
            eu: 'Batez bestekoa (x̄) datu guztien batura zati datu kopurua da. Datu guztiak berdinak balira izango luketen balioa da: datuen «oreka-puntua». Datuak taula batean badaude, biderkatu balio bakoitza bere maiztasunaz, batu eta zatitu N-z.',
            es: 'La media (x̄) es la suma de todos los datos dividida entre el número de datos. Es el valor que tendrían todos si fueran iguales: el «punto de equilibrio» de los datos. Si los datos están en una tabla, multiplica cada valor por su frecuencia, suma y divide entre N.',
            ar: 'المتوسط (x̄) هو مجموع كل البيانات مقسومًا على عددها. إنه القيمة التي تكون لكل البيانات لو كانت متساوية: «نقطة توازن» البيانات. وإذا كانت البيانات في جدول فاضرب كل قيمة في تكرارها واجمع واقسم على N.'
        },
        problem: { eu: 'Kalkulatu nota hauen batez bestekoa: 5, 7, 7, 8, 9, 6.', es: 'Calcula la media de estas notas: 5, 7, 7, 8, 9, 6.', ar: 'احسب متوسط هذه العلامات: 5، 7، 7، 8، 9، 6.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Batu datu guztiak.', es: 'Suma todos los datos.', ar: 'اجمع كل البيانات.' }, math: '$5+7+7+8+9+6=42$' },
            { text: { eu: 'Zatitu datu kopuruaz.', es: 'Divide entre el número de datos.', ar: 'اقسم على عدد البيانات.' }, math: '$42\\mathbin{:}6=7$' }
        ],
        example: dec('$\\frac{0\\cdot 2+1\\cdot 5+2\\cdot 2+3\\cdot 1}{10}=1{,}2$'),
        takeaway: {
            eu: 'Batez bestekoa = batura : zenbat datu.',
            es: 'Media = suma : cuántos datos.',
            ar: 'المتوسط = المجموع : عدد البيانات.'
        },
        figure: (language) => <MeanFigure language={language} />
    },
    {
        id: 'median-mode',
        stage: 'parameters',
        title: { eu: 'Mediana eta moda', es: 'Mediana y moda', ar: 'الوسيط والمنوال' },
        goal: {
            eu: 'Datu-multzo baten mediana eta moda aurkitzea.',
            es: 'Encontrar la mediana y la moda de un conjunto de datos.',
            ar: 'إيجاد الوسيط والمنوال لمجموعة بيانات.'
        },
        explanation: {
            eu: 'Moda gehien errepikatzen den balioa da (maiztasun handienekoa); bat baino gehiago egon daitezke. Mediana datuak txikienetik handienera ordenatzean erdian geratzen den balioa da. Datu kopurua bikoitia bada, erdiko bi balioen batez bestekoa da.',
            es: 'La moda es el valor que más se repite (el de mayor frecuencia); puede haber más de una. La mediana es el valor que queda en el centro al ordenar los datos de menor a mayor. Si el número de datos es par, es la media de los dos valores centrales.',
            ar: 'المنوال هو القيمة الأكثر تكرارًا (صاحبة أكبر تكرار)؛ وقد يوجد أكثر من منوال. والوسيط هو القيمة التي تبقى في الوسط عند ترتيب البيانات تصاعديًا. وإذا كان عدد البيانات زوجيًا فهو متوسط القيمتين الوسطيين.'
        },
        problem: { eu: 'Aurkitu mediana eta moda: 3, 7, 5, 7, 9.', es: 'Halla la mediana y la moda de: 3, 7, 5, 7, 9.', ar: 'أوجد الوسيط والمنوال لـ: 3، 7، 5، 7، 9.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Ordenatu datuak.', es: 'Ordena los datos.', ar: 'رتّب البيانات.' }, math: '$3,\\ 5,\\ 7,\\ 7,\\ 9$' },
            { text: { eu: 'Erdikoa (hirugarrena): mediana.', es: 'El del centro (el tercero): la mediana.', ar: 'الأوسط (الثالث): الوسيط.' }, math: '$\\text{Me}=7$' },
            { text: { eu: 'Gehien errepikatzen dena: moda.', es: 'El que más se repite: la moda.', ar: 'الأكثر تكرارًا: المنوال.' }, math: '$\\text{Mo}=7$' }
        ],
        example: '$2,\\ 4,\\ 6,\\ 8\\ \\to\\ \\text{Me}=\\frac{4+6}{2}=5$',
        takeaway: {
            eu: 'Mediana: lehenik ordenatu. Moda: gehien errepikatzen dena.',
            es: 'Mediana: primero ordena. Moda: la que más se repite.',
            ar: 'الوسيط: رتّب أولًا. المنوال: الأكثر تكرارًا.'
        }
    },
    {
        id: 'range',
        stage: 'parameters',
        title: { eu: 'Ibiltartea', es: 'El rango', ar: 'المدى' },
        goal: {
            eu: 'Datuen ibiltartea kalkulatzea eta sakabanaketa ulertzea.',
            es: 'Calcular el rango de los datos y entender la dispersión.',
            ar: 'حساب مدى البيانات وفهم التشتت.'
        },
        explanation: {
            eu: 'Ibiltartea (edo heina) datu handienaren eta txikienaren arteko kendura da. Datuak zenbat sakabanatuta dauden adierazten du: bi talderen batez bestekoa berdina izan daiteke, baina ibiltartea oso desberdina.',
            es: 'El rango (o recorrido) es la diferencia entre el dato mayor y el menor. Indica cuánto se dispersan los datos: dos grupos pueden tener la misma media y un rango muy distinto.',
            ar: 'المدى هو الفرق بين أكبر قيمة وأصغرها. ويبيّن مقدار تشتت البيانات: قد يكون لمجموعتين المتوسط نفسه ومدى مختلف جدًا.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'A taldea', es: 'Grupo A', ar: 'المجموعة أ' }, text: { eu: 'Notak 6, 7, 7, 8: x̄ = 7, ibiltartea 2.', es: 'Notas 6, 7, 7, 8: x̄ = 7, rango 2.', ar: 'العلامات 6، 7، 7، 8: x̄ = 7، المدى 2.' }, math: '$8-6=2$' },
            { title: { eu: 'B taldea', es: 'Grupo B', ar: 'المجموعة ب' }, text: { eu: 'Notak 3, 7, 8, 10: x̄ = 7, ibiltartea 7.', es: 'Notas 3, 7, 8, 10: x̄ = 7, rango 7.', ar: 'العلامات 3، 7، 8، 10: x̄ = 7، المدى 7.' }, math: '$10-3=7$' }
        ],
        example: '$14,\\dots,21\\ \\to\\ 21-14=7$',
        takeaway: {
            eu: 'Ibiltartea = handiena − txikiena.',
            es: 'Rango = mayor − menor.',
            ar: 'المدى = الأكبر − الأصغر.'
        }
    },
    {
        id: 'random',
        stage: 'probability',
        title: { eu: 'Esperimentu aleatorioak eta gertaerak', es: 'Experimentos aleatorios y sucesos', ar: 'التجارب العشوائية والأحداث' },
        goal: {
            eu: 'Esperimentu aleatorioak ezagutzea eta haien lagin-espazioa eta gertaerak idaztea.',
            es: 'Reconocer experimentos aleatorios y escribir su espacio muestral y sus sucesos.',
            ar: 'التعرّف إلى التجارب العشوائية وكتابة فضاء عيّنتها وأحداثها.'
        },
        explanation: {
            eu: 'Esperimentu bat aleatorioa da emaitza aurretik jakin ezin bada (dado bat jaurti, txanpon bat bota); determinista, berriz, beti emaitza bera ematen badu (ura 100 °C-an irakitea). Emaitza posible guztiek lagin-espazioa (E) osatzen dute. Gertaera bat emaitza batzuen multzoa da: oinarrizkoa (emaitza bakarra), ziurra (beti gertatzen da) edo ezinezkoa (ez da inoiz gertatzen).',
            es: 'Un experimento es aleatorio si no se puede saber el resultado antes (lanzar un dado, una moneda); es determinista si siempre da el mismo resultado (el agua hierve a 100 °C). Todos los resultados posibles forman el espacio muestral (E). Un suceso es un conjunto de resultados: elemental (un solo resultado), seguro (ocurre siempre) o imposible (no ocurre nunca).',
            ar: 'تكون التجربة عشوائية إذا لم نستطع معرفة نتيجتها مسبقًا (رمي نرد أو قطعة نقود)، وحتمية إذا أعطت النتيجة نفسها دائمًا (غليان الماء عند 100 °C). وكل النتائج الممكنة تكوّن فضاء العيّنة (E). والحدث مجموعة من النتائج: بسيط (نتيجة واحدة)، أو أكيد (يقع دائمًا)، أو مستحيل (لا يقع أبدًا).'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Lagin-espazioa', es: 'Espacio muestral', ar: 'فضاء العيّنة' }, text: { eu: 'Dado bat jaurtitzean.', es: 'Al lanzar un dado.', ar: 'عند رمي نرد.' }, math: '$E=\\{1,2,3,4,5,6\\}$' },
            { title: { eu: 'Gertaera', es: 'Suceso', ar: 'الحدث' }, text: { eu: '«Bikoitia ateratzea».', es: '«Sacar par».', ar: '«الحصول على عدد زوجي».' }, math: '$A=\\{2,4,6\\}$' },
            { title: { eu: 'Ziurra eta ezinezkoa', es: 'Seguro e imposible', ar: 'أكيد ومستحيل' }, text: { eu: '«7 baino gutxiago ateratzea» ziurra da; «7 ateratzea», ezinezkoa.', es: '«Sacar menos de 7» es seguro; «sacar un 7», imposible.', ar: '«الحصول على أقل من 7» أكيد؛ و«الحصول على 7» مستحيل.' } }
        ],
        example: '$E=\\{\\text{C},\\ \\text{X}\\}$',
        takeaway: {
            eu: 'Aleatorioa: ezin da aurreikusi. Lagin-espazioa: emaitza posible guztiak.',
            es: 'Aleatorio: no se puede prever. Espacio muestral: todos los resultados posibles.',
            ar: 'العشوائي: لا يمكن توقّعه. فضاء العيّنة: كل النتائج الممكنة.'
        },
        figure: (language) => <DiceFigure language={language} />
    },
    {
        id: 'laplace',
        stage: 'probability',
        title: { eu: 'Laplaceren erregela', es: 'La regla de Laplace', ar: 'قاعدة لابلاس' },
        goal: {
            eu: 'Gertaera baten probabilitatea Laplaceren erregelarekin kalkulatzea.',
            es: 'Calcular la probabilidad de un suceso con la regla de Laplace.',
            ar: 'حساب احتمال حدث بقاعدة لابلاس.'
        },
        explanation: {
            eu: 'Emaitza guztiek aukera bera badute, gertaera baten probabilitatea aldeko kasuen kopurua zati kasu posibleen kopurua da. Probabilitatea 0 eta 1 artean dago: 0 gertaera ezinezkoena da, eta 1 ziurrarena. Zatiki, hamartar edo ehuneko gisa eman daiteke.',
            es: 'Si todos los resultados tienen la misma posibilidad, la probabilidad de un suceso es el número de casos favorables dividido entre el número de casos posibles. La probabilidad está entre 0 y 1: 0 es la del suceso imposible y 1, la del seguro. Se puede dar como fracción, decimal o porcentaje.',
            ar: 'إذا كانت كل النتائج متساوية الإمكان فاحتمال الحدث هو عدد الحالات الملائمة مقسومًا على عدد الحالات الممكنة. والاحتمال بين 0 و1: 0 للحدث المستحيل و1 للأكيد. ويمكن كتابته كسرًا أو عددًا عشريًا أو نسبة مئوية.'
        },
        problem: { eu: 'Poltsa batean 3 bola gorri eta 5 urdin daude. Zein da gorri bat ateratzeko probabilitatea?', es: 'En una bolsa hay 3 bolas rojas y 5 azules. ¿Cuál es la probabilidad de sacar una roja?', ar: 'في كيس 3 كرات حمراء و5 زرقاء. ما احتمال سحب كرة حمراء؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Kasu posibleak: bola guztiak.', es: 'Casos posibles: todas las bolas.', ar: 'الحالات الممكنة: كل الكرات.' }, math: '$3+5=8$' },
            { text: { eu: 'Aldeko kasuak: bola gorriak.', es: 'Casos favorables: las rojas.', ar: 'الحالات الملائمة: الكرات الحمراء.' }, math: '$3$' },
            { text: { eu: 'Zatitu.', es: 'Divide.', ar: 'اقسم.' }, math: dec('$P=\\frac{3}{8}=0{,}375$') }
        ],
        example: '$P(\\text{par})=\\frac{3}{6}=\\frac{1}{2}$',
        takeaway: {
            eu: 'P = aldeko kasuak : kasu posibleak.',
            es: 'P = casos favorables : casos posibles.',
            ar: 'P = الحالات الملائمة : الحالات الممكنة.'
        }
    },
    {
        id: 'frequency-probability',
        stage: 'probability',
        title: { eu: 'Maiztasuna eta probabilitatea', es: 'Frecuencia y probabilidad', ar: 'التكرار والاحتمال' },
        goal: {
            eu: 'Maiztasun erlatiboaren eta probabilitatearen arteko lotura ulertzea.',
            es: 'Entender la relación entre la frecuencia relativa y la probabilidad.',
            ar: 'فهم العلاقة بين التكرار النسبي والاحتمال.'
        },
        explanation: {
            eu: 'Esperimentu bat askotan errepikatzen bada, gertaera baten maiztasun erlatiboa haren probabilitatetik gero eta hurbilago egoten da. Txanpon bat 10 aldiz botata 7 aurpegi atera daitezke (0,7), baina 1.000 aldiz botata 500etik hurbil aterako dira (0,5).',
            es: 'Si un experimento se repite muchas veces, la frecuencia relativa de un suceso se acerca cada vez más a su probabilidad. Al lanzar una moneda 10 veces pueden salir 7 caras (0,7), pero al lanzarla 1.000 veces saldrán cerca de 500 (0,5).',
            ar: 'إذا تكررت تجربة مرات كثيرة يقترب التكرار النسبي لحدث أكثر فأكثر من احتماله. عند رمي قطعة نقود 10 مرات قد يظهر الوجه 7 مرات (0.7)، لكن عند رميها 1000 مرة سيظهر قرابة 500 مرة (0.5).'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Gutxitan', es: 'Pocas veces', ar: 'مرات قليلة' }, text: { eu: 'Emaitzak asko alda daitezke.', es: 'Los resultados pueden variar mucho.', ar: 'قد تتغيّر النتائج كثيرًا.' }, math: dec('$\\frac{7}{10}=0{,}7$') },
            { title: { eu: 'Askotan', es: 'Muchas veces', ar: 'مرات كثيرة' }, text: { eu: 'Maiztasuna probabilitatera hurbiltzen da.', es: 'La frecuencia se acerca a la probabilidad.', ar: 'يقترب التكرار من الاحتمال.' }, math: dec('$\\frac{497}{1\\,000}\\approx 0{,}5$') }
        ],
        example: dec('$h\\approx P=0{,}5$'),
        takeaway: {
            eu: 'Zenbat eta saiakera gehiago, orduan eta hurbilago probabilitatetik.',
            es: 'Cuantas más pruebas, más cerca de la probabilidad.',
            ar: 'كلما زادت التجارب اقتربنا من الاحتمال.'
        }
    }
]

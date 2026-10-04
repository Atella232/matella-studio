import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    BoxPlotFigure,
    CumulativeFigure,
    DeviationFigure,
    DoubleTableFigure,
    EventsFigure,
    GroupedFigure,
    HistogramFigure,
    MeanTableFigure,
    MedianTableFigure,
    MisleadingFigure,
    PieFigure,
    QuartilesFigure,
    SampleFigure,
    SymmetryFigure,
    TreeFigure
} from './figures'

/* ==========================================================================
   Estatistika eta probabilitatea · 2. DBH — stages and lessons, following
   Anaya 2.º ESO units 14 (Estadística: tables and graphs, centralization,
   dispersion, position, double-entry tables) and 15 (Azar y probabilidad:
   events, regular and irregular devices, trees and tables), and Santillana
   2.º ESO unit 14 (cumulative frequencies, graphs, parameters, Laplace).
   It builds on the 1. DBH unit (frequency tables, bar and pie charts, mean,
   median, mode, range and Laplace) and goes further: cumulative and grouped
   frequencies, histograms, parameters from a table, mean deviation,
   quartiles and box plots, complementary events, trees and double tables.
   ========================================================================== */

export type StatisticsStageId = 'tables' | 'graphs' | 'centre' | 'spread' | 'chance'

export const statisticsStages: UnitStage[] = [
    { id: 'tables', tone: 'blue', title: { eu: 'Datuak eta taulak', es: 'Datos y tablas', ar: 'البيانات والجداول' } },
    { id: 'graphs', tone: 'violet', title: { eu: 'Grafikoak', es: 'Gráficos', ar: 'التمثيلات البيانية' } },
    { id: 'centre', tone: 'mustard', title: { eu: 'Zentralizazio-parametroak', es: 'Parámetros de centralización', ar: 'مقاييس النزعة المركزية' } },
    { id: 'spread', tone: 'coral', title: { eu: 'Sakabanaketa eta posizioa', es: 'Dispersión y posición', ar: 'التشتت والموقع' } },
    { id: 'chance', tone: 'green', title: { eu: 'Zoria eta probabilitatea', es: 'Azar y probabilidad', ar: 'الصدفة والاحتمال' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const statisticsTopics: UnitTopic[] = [
    /* ---------- 1. Data and tables ---------- */
    {
        id: 'sample',
        stage: 'tables',
        title: say('Lagina eta aldagaiak', 'Muestra y variables', 'العيّنة والمتغيرات'),
        goal: say('Noiz behar den lagin bat erabakitzea, lagin adierazgarria aukeratzea eta aldagaiak sailkatzea.', 'Decidir cuándo hace falta una muestra, elegir una muestra representativa y clasificar las variables.', 'تقرير متى نحتاج إلى عيّنة، واختيار عيّنة ممثِّلة، وتصنيف المتغيرات.'),
        explanation: say(
            'Azterketa estatistiko batean, aztertu nahi diren elementu guztiek populazioa osatzen dute. Populazioa txikia bada (klase bat, talde bat), denei galdetzen zaie; handia bada (hiri bat, herrialde bat), lagin bat hartzen da. Lagina adierazgarria izan behar da: zoriz aukeratua eta populazioaren talde guztiak kontuan hartuta. Ikastetxeko ikasleen kirol-ohiturak aztertzeko, saskibaloi-taldeari bakarrik galdetzea lagin alboratua da. Aldagaiak kualitatiboak dira (zenbakirik gabe) edo kuantitatiboak: diskretuak, zenbatu egiten badira, eta jarraituak, neurtu egiten badira.',
            'En un estudio estadístico, todos los elementos que se quieren estudiar forman la población. Si la población es pequeña (una clase, un equipo), se pregunta a todos; si es grande (una ciudad, un país), se toma una muestra. La muestra tiene que ser representativa: elegida al azar y teniendo en cuenta todos los grupos de la población. Para estudiar los hábitos deportivos del alumnado de un instituto, preguntar solo al equipo de baloncesto es una muestra sesgada. Las variables son cualitativas (sin números) o cuantitativas: discretas, si se cuentan, y continuas, si se miden.',
            'في الدراسة الإحصائية تكوّن كل العناصر التي نريد دراستها المجتمع. إذا كان المجتمع صغيرًا (قسم، فريق) سألنا الجميع، وإذا كان كبيرًا (مدينة، بلد) أخذنا عيّنة. ويجب أن تكون العيّنة ممثِّلة: مختارة عشوائيًا ومراعية لكل فئات المجتمع. لدراسة العادات الرياضية لتلاميذ مدرسة، يكون سؤال فريق كرة السلة وحده عيّنة متحيّزة. والمتغيرات نوعية (بلا أعداد) أو كمية: منفصلة إذا كانت تُعَدّ، ومتصلة إذا كانت تُقاس.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Populazio osoa', 'Toda la población', 'المجتمع كله'), text: say('Taldea txikia denean: klaseko 25 ikasleak, diskoko abestiak.', 'Cuando el grupo es pequeño: los 25 alumnos de la clase, las canciones de un disco.', 'عندما تكون المجموعة صغيرة: تلاميذ القسم الخمسة والعشرون، أغاني ألبوم.') },
            { title: say('Lagina', 'Muestra', 'العيّنة'), text: say('Taldea handia denean: hiriko 250 biztanle, zoriz aukeratuta.', 'Cuando el grupo es grande: 250 habitantes de la ciudad, elegidos al azar.', 'عندما تكون المجموعة كبيرة: 250 من سكان المدينة مختارون عشوائيًا.') },
            { title: say('Lagin alboratua', 'Muestra sesgada', 'عيّنة متحيّزة'), text: say('Talde bakar bati galdetzea: emaitzak ez du populazioa ordezkatzen.', 'Preguntar a un solo grupo: el resultado no representa a la población.', 'سؤال فئة واحدة فقط: لا تمثّل النتيجة المجتمع.') }
        ],
        example: say('$\\text{lagina}\\subset\\text{populazioa}$', '$\\text{muestra}\\subset\\text{población}$', '$E\\subset P$'),
        takeaway: say('Lagina adierazgarria izan behar da: zoriz eta talde guztiekin.', 'La muestra tiene que ser representativa: al azar y con todos los grupos.', 'يجب أن تكون العيّنة ممثِّلة: عشوائية ومن كل الفئات.'),
        figure: (language) => <SampleFigure language={language} />
    },
    {
        id: 'cumulative',
        stage: 'tables',
        title: say('Maiztasun metatuak', 'Frecuencias acumuladas', 'التكرارات المتجمّعة'),
        goal: say('Maiztasun absolutu eta erlatibo metatuak kalkulatzea eta «zenbat gutxiago» galderei erantzutea.', 'Calcular las frecuencias absolutas y relativas acumuladas y responder preguntas de «cuántos como mucho».', 'حساب التكرارات المطلقة والنسبية المتجمّعة والإجابة عن أسئلة «كم على الأكثر».'),
        explanation: say(
            'Aldagaia kuantitatiboa denean, balioak ordenatu egin daitezke, eta galdera berri bat egin: zenbat datu daude balio bat edo txikiagoa? Erantzuna maiztasun absolutu metatua da ($F_i$): balio horren eta aurrekoen maiztasun absolutuen batura. Azken $F_i$ beti $N$ da. Maiztasun erlatibo metatua ($H_i$) $F_i$ zati $N$ da, eta azkena beti 1. Adibidez, udan irakurritako liburuen taulan, $F_2=14$ bada, 20 ikasletatik 14k gehienez 2 liburu irakurri dituzte, eta $H_2=0{,}7$: % 70.',
            'Cuando la variable es cuantitativa, los valores se pueden ordenar y hacer una pregunta nueva: ¿cuántos datos hay iguales o menores que un valor? La respuesta es la frecuencia absoluta acumulada ($F_i$): la suma de las frecuencias absolutas de ese valor y de los anteriores. La última $F_i$ es siempre $N$. La frecuencia relativa acumulada ($H_i$) es $F_i$ entre $N$, y la última es siempre 1. Por ejemplo, en la tabla de libros leídos en verano, si $F_2=14$, 14 de los 20 alumnos han leído como mucho 2 libros, y $H_2=0{,}7$: el 70 %.',
            'عندما يكون المتغير كميًا يمكن ترتيب القيم وطرح سؤال جديد: كم بيانًا يساوي قيمة ما أو يقلّ عنها؟ الجواب هو التكرار المطلق المتجمّع ($F_i$): مجموع التكرارات المطلقة لتلك القيمة وما قبلها. وآخر $F_i$ يساوي دائمًا $N$. والتكرار النسبي المتجمّع ($H_i$) هو $F_i$ مقسومًا على $N$، وآخره دائمًا 1. مثلًا، في جدول الكتب المقروءة في الصيف، إذا كان $F_2=14$ فإن 14 من 20 تلميذًا قرؤوا كتابين على الأكثر، و$H_2=0{,}7$: أي 70 %.'
        ),
        problem: say('Udan irakurritako liburuak: 0 liburu → 3 ikasle, 1 → 6, 2 → 5, 3 → 4, 4 → 2. Kalkulatu $F_i$ eta $H_i$.', 'Libros leídos en verano: 0 libros → 3 alumnos, 1 → 6, 2 → 5, 3 → 4, 4 → 2. Calcula $F_i$ y $H_i$.', 'الكتب المقروءة في الصيف: 0 كتب ← 3 تلاميذ، 1 ← 6، 2 ← 5، 3 ← 4، 4 ← 2. احسب $F_i$ و$H_i$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Metatu: aurreko $F_i$ gehi errenkada honetako $f_i$.', 'Acumula: la $F_i$ anterior más la $f_i$ de esta fila.', 'اجمع تراكميًا: $F_i$ السابق زائد $f_i$ هذا السطر.'), math: same('$3,\\ 9,\\ 14,\\ 18,\\ 20$') },
            { text: say('Azkena $N$ da: 20 ikasle.', 'La última es $N$: 20 alumnos.', 'الأخير هو $N$: 20 تلميذًا.') },
            { text: say('Zatitu bakoitza 20z.', 'Divide cada una entre 20.', 'اقسم كلًّا منها على 20.'), math: same('$0{,}15,\\ 0{,}45,\\ 0{,}7,\\ 0{,}9,\\ 1$') }
        ],
        example: same('$F_3=3+6+5+4=18\\qquad H_3=\\frac{18}{20}=0{,}9$'),
        takeaway: say('Metatua: zenbat datu dauden balio horretaraino. Azkena datu kopurua da; erlatibo metatuaren azkena, 1.', 'Acumulada: cuántos datos hay hasta ese valor. La última es el número de datos; la última relativa acumulada, 1.', 'المتجمّع: كم بيانًا حتى تلك القيمة. الأخير هو عدد البيانات، وآخر متجمّع نسبي هو 1.'),
        figure: (language) => <CumulativeFigure language={language} />
    },
    {
        id: 'grouped',
        stage: 'tables',
        title: say('Datu multzokatuak', 'Datos agrupados', 'البيانات المبوّبة'),
        goal: say('Datu asko edo jarraituak tartetan multzokatzea eta klase-markak kalkulatzea.', 'Agrupar en intervalos muchos datos o datos continuos y calcular las marcas de clase.', 'تبويب البيانات الكثيرة أو المتصلة في فئات وحساب مراكز الفئات.'),
        explanation: say(
            'Balio desberdin asko daudenean edo aldagaia jarraitua denean (altuera, denbora), datuak tartetan edo klasetan multzokatzen dira. $[150,160)$ tartean 150 sartzen da, baina 160 ez: hurrengo tartean doa. Tarte guztiek zabalera bera izan ohi dute, eta 5 eta 10 tarte artean egitea gomendatzen da. Tarte bakoitzaren erdiko balioa klase-marka da, $x_i$: muturren batura zati 2. Klase-markak tarteko datu guztien ordezkari gisa erabiltzen dira, adibidez batez bestekoa kalkulatzeko.',
            'Cuando hay muchos valores distintos o la variable es continua (altura, tiempo), los datos se agrupan en intervalos o clases. En el intervalo $[150,160)$ entra el 150, pero no el 160: va en el intervalo siguiente. Todos los intervalos suelen tener la misma amplitud, y se recomienda hacer entre 5 y 10. El valor central de cada intervalo es la marca de clase, $x_i$: la suma de los extremos entre 2. Las marcas de clase se usan como representantes de todos los datos del intervalo, por ejemplo para calcular la media.',
            'عندما تكثر القيم المختلفة أو يكون المتغير متصلًا (الطول، الزمن) تُبوَّب البيانات في فئات. في الفئة $[150,160)$ يدخل 150 ولا يدخل 160: إنه في الفئة التالية. وعادةً يكون للفئات الطول نفسه، ويُنصح بعمل ما بين 5 و10 فئات. والقيمة الوسطى لكل فئة هي مركز الفئة $x_i$: مجموع الطرفين مقسومًا على 2. وتُستعمل مراكز الفئات ممثِّلة لكل بيانات الفئة، مثلًا لحساب المتوسط.'
        ),
        problem: say('30 ikasleren altuerak (cm) tartetan: $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6. Zein dira klase-markak? Zenbat ikaslek neurtzen dute 160 cm baino gutxiago?', 'Alturas (cm) de 30 alumnos en intervalos: $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6. ¿Cuáles son las marcas de clase? ¿Cuántos miden menos de 160 cm?', 'أطوال 30 تلميذًا (سم) في فئات: $[140,150)$ 3، $[150,160)$ 9، $[160,170)$ 12، $[170,180)$ 6. ما مراكز الفئات؟ كم تلميذًا طوله أقل من 160 سم؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Klase-marka: muturren erdia.', 'Marca de clase: la mitad de los extremos.', 'مركز الفئة: نصف مجموع الطرفين.'), math: same('$\\frac{140+150}{2}=145$') },
            { text: say('Besteak, 10na aurrera.', 'Las demás, de 10 en 10.', 'والبقية بخطوة 10.'), math: same('$145,\\ 155,\\ 165,\\ 175$') },
            { text: say('160 baino gutxiago: lehen bi tarteak.', 'Menos de 160: los dos primeros intervalos.', 'أقل من 160: الفئتان الأوليان.'), math: same('$3+9=12$') }
        ],
        example: same('$[160,170)\\ \\to\\ x_i=\\frac{160+170}{2}=165$'),
        takeaway: say('Tarte batean beheko muturra sartzen da eta goikoa ez. Klase-marka: bi muturren erdia.', 'En un intervalo entra el extremo inferior y no el superior. Marca de clase: la mitad de los dos extremos.', 'في الفئة يدخل الطرف الأدنى ولا يدخل الأعلى. مركز الفئة: منتصف الطرفين.'),
        figure: (language) => <GroupedFigure language={language} />
    },

    /* ---------- 2. Graphs ---------- */
    {
        id: 'histogram',
        stage: 'graphs',
        title: say('Histograma eta maiztasun-poligonoa', 'Histograma y polígono de frecuencias', 'المدرّج التكراري والمضلّع التكراري'),
        goal: say('Datu multzokatuen histograma eta maiztasun-poligonoa egitea eta irakurtzea.', 'Construir y leer el histograma y el polígono de frecuencias de datos agrupados.', 'بناء المدرّج التكراري والمضلّع التكراري للبيانات المبوّبة وقراءتهما.'),
        explanation: say(
            'Datu multzokatuak histograma batean irudikatzen dira: tarte bakoitzak laukizuzen bat du, oinarria tartea bera eta altuera haren maiztasuna. Barra-diagraman ez bezala, laukizuzenak elkarren ondoan daude, hutsunerik gabe, aldagaia jarraitua delako. Laukizuzen bakoitzaren goiko aldearen erdiko puntuak (klase-markaren gainean) lotzen badira, maiztasun-poligonoa lortzen da; normalean ardatzeraino ixten da, alde bakoitzean tarte huts bat gehituta. Maiztasun metatuekin ere egin daiteke poligono bat: beti gorantz doa eta $N$-n amaitzen da.',
            'Los datos agrupados se representan en un histograma: cada intervalo tiene un rectángulo cuya base es el propio intervalo y cuya altura es su frecuencia. A diferencia del diagrama de barras, los rectángulos están pegados, sin huecos, porque la variable es continua. Si se unen los puntos medios del lado de arriba de cada rectángulo (sobre la marca de clase), se obtiene el polígono de frecuencias; normalmente se cierra hasta el eje añadiendo un intervalo vacío a cada lado. También se puede hacer un polígono con las frecuencias acumuladas: siempre sube y termina en $N$.',
            'تُمثَّل البيانات المبوّبة بمدرّج تكراري: لكل فئة مستطيل قاعدته الفئة نفسها وارتفاعه تكرارها. وخلافًا لمخطط الأعمدة تكون المستطيلات متلاصقة بلا فراغات لأن المتغير متصل. وإذا وصلنا منتصفات الأضلاع العليا للمستطيلات (فوق مراكز الفئات) حصلنا على المضلّع التكراري؛ وعادةً يُغلَق حتى المحور بإضافة فئة فارغة في كل جهة. ويمكن أيضًا رسم مضلّع بالتكرارات المتجمّعة: يصعد دائمًا وينتهي عند $N$.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Ardatz horizontalean, tarteen mugak (140, 150, 160…); bertikalean, maiztasunak.', 'En el eje horizontal, los límites de los intervalos (140, 150, 160…); en el vertical, las frecuencias.', 'على المحور الأفقي حدود الفئات (140، 150، 160…)، وعلى الرأسي التكرارات.') },
            { text: say('Tarte bakoitzean, bere maiztasunaren altuerako laukizuzena, hutsunerik gabe.', 'En cada intervalo, un rectángulo con la altura de su frecuencia, sin huecos.', 'في كل فئة مستطيل ارتفاعه تكرارها، بلا فراغات.'), math: same('$3,\\ 9,\\ 12,\\ 6$') },
            { text: say('Poligonoa: lotu klase-marken gaineko puntuak.', 'Polígono: une los puntos sobre las marcas de clase.', 'المضلّع: صِل النقاط فوق مراكز الفئات.'), math: same('$(145,3),\\ (155,9)\\ldots$') }
        ],
        example: same('$3+9+12+6=30$'),
        takeaway: say('Histograma: laukizuzen itsatsiak. Poligonoa: klase-marken gaineko puntuak lotuta.', 'Histograma: rectángulos pegados. Polígono: los puntos sobre las marcas de clase unidos.', 'المدرّج: مستطيلات متلاصقة. المضلّع: نقاط فوق مراكز الفئات موصولة.'),
        figure: (language) => <HistogramFigure language={language} />
    },
    {
        id: 'pie',
        stage: 'graphs',
        title: say('Sektore-diagramak eta ehunekoak', 'Diagramas de sectores y porcentajes', 'المخططات الدائرية والنسب المئوية'),
        goal: say('Ehunekoetatik angeluak kalkulatzea eta, alderantziz, angelu batetik zenbat datu diren jakitea.', 'Calcular ángulos a partir de porcentajes y, al revés, saber cuántos datos son a partir de un ángulo.', 'حساب الزوايا انطلاقًا من النسب المئوية، وبالعكس معرفة عدد البيانات انطلاقًا من زاوية.'),
        explanation: say(
            'Sektore-diagraman zirkulu osoa (360°) datu guztiak dira, eta sektore bakoitzaren angelua bere maiztasunarekiko proportzionala da: $h_i\\cdot 360^{\\circ}$. Ehunekoa ematen badute, % 1 zirkuluaren 3,6° da; beraz, % 30 → $30\\cdot 3{,}6=108^{\\circ}$. Alderantziz ere egin daiteke: 90°-ko sektorea zirkuluaren laurdena da, hau da, datuen % 25. Datu kopurua jakinda, sektore bakoitzean zenbat banako dauden kalkulatzen da. Diagrama hau osoaren zatiak konparatzeko da egokia, eta ez balio asko daudenean.',
            'En el diagrama de sectores el círculo completo (360°) son todos los datos, y el ángulo de cada sector es proporcional a su frecuencia: $h_i\\cdot 360^{\\circ}$. Si dan el porcentaje, el 1 % del círculo son 3,6°; así, 30 % → $30\\cdot 3{,}6=108^{\\circ}$. También se puede hacer al revés: un sector de 90° es un cuarto del círculo, es decir, el 25 % de los datos. Conociendo el número de datos, se calcula cuántos individuos hay en cada sector. Este diagrama sirve para comparar las partes de un total, y no cuando hay muchos valores.',
            'في المخطط الدائري تمثّل الدائرة كاملة (360°) كل البيانات، وزاوية كل قطاع تتناسب مع تكراره: $h_i\\cdot 360^{\\circ}$. وإذا أُعطيت النسبة المئوية فإن 1 % من الدائرة 3.6°؛ وهكذا 30 % ← $30\\cdot 3{,}6=108^{\\circ}$. ويمكن العمل بالعكس: قطاع 90° ربع الدائرة، أي 25 % من البيانات. وبمعرفة عدد البيانات نحسب عدد الأفراد في كل قطاع. يصلح هذا المخطط لمقارنة أجزاء الكل، لا عندما تكثر القيم.'
        ),
        problem: say('40 ikasleri nola etortzen diren galdetu zaie: % 45 oinez, % 30 autobusez, % 15 autoz eta % 10 bizikletaz. Kalkulatu angeluak. Zenbat etortzen dira autobusez?', 'Se ha preguntado a 40 alumnos cómo vienen: 45 % a pie, 30 % en autobús, 15 % en coche y 10 % en bici. Calcula los ángulos. ¿Cuántos vienen en autobús?', 'سُئل 40 تلميذًا كيف يأتون: 45 % مشيًا، و30 % بالحافلة، و15 % بالسيارة، و10 % بالدراجة. احسب الزوايا. كم تلميذًا يأتي بالحافلة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ehuneko bakoitza bider 3,6°; autobusa: 108°.', 'Cada porcentaje por 3,6°; autobús: 108°.', 'كل نسبة في 3.6°؛ الحافلة: 108°.'), math: same('$45\\cdot 3{,}6=162$') },
            { text: say('Besteak: 54° eta 36°. Egiaztatu batura.', 'Los demás: 54° y 36°. Comprueba la suma.', 'والباقيتان: 54° و36°. تحقّق من المجموع.'), math: same('$162+108+54+36=360$') },
            { text: say('Autobusez: 40ren % 30.', 'En autobús: el 30 % de 40.', 'بالحافلة: 30 % من 40.'), math: same('$0{,}3\\cdot 40=12$') }
        ],
        example: same('$90^{\\circ}\\ \\to\\ \\frac{90}{360}=0{,}25\\ \\to\\ 25\\,\\%$'),
        takeaway: say('% 1 = 3,6°. Angelua zati 360 maiztasun erlatiboa da.', '1 % = 3,6°. El ángulo entre 360 es la frecuencia relativa.', '1 % = 3.6°. والزاوية على 360 هي التكرار النسبي.'),
        figure: (language) => <PieFigure language={language} />
    },
    {
        id: 'misleading',
        stage: 'graphs',
        title: say('Grafikoak irakurtzen: tranpak', 'Leer gráficos: trampas', 'قراءة التمثيلات: الفخاخ'),
        goal: say('Grafiko engainagarriak ezagutzea eta grafiko bati buruzko galderak arretaz erantzutea.', 'Reconocer gráficos engañosos y responder con cuidado preguntas sobre un gráfico.', 'التعرّف إلى التمثيلات المضلِّلة والإجابة بعناية عن أسئلة حول تمثيل بياني.'),
        explanation: say(
            'Grafiko batek datuak ondo erakutsi behar ditu, baina batzuetan, nahita edo ez, engainatu egiten du. Tranpa ohikoenak: ardatz bertikala zerotik ez hastea (aldaketa txiki bat izugarria dirudi), eskala desberdinak erabiltzea bi grafiko konparatzeko, edo hiru dimentsioko marrazkiak (bikoitza den kopuru bat zortzi aldiz handiagoa dirudi, bolumenean). Sektore-diagrama batean ehunekoek 100 eman behar dute. Grafiko bat irakurtzean, begiratu beti eskala, ardatzak eta unitateak, eta kalkulatu benetako proportzioa.',
            'Un gráfico tiene que mostrar bien los datos, pero a veces, a propósito o no, engaña. Las trampas más habituales: que el eje vertical no empiece en cero (un cambio pequeño parece enorme), usar escalas distintas para comparar dos gráficos, o los dibujos en tres dimensiones (una cantidad doble parece ocho veces mayor, en volumen). En un diagrama de sectores los porcentajes tienen que sumar 100. Al leer un gráfico, mira siempre la escala, los ejes y las unidades, y calcula la proporción real.',
            'يجب أن يُظهر التمثيل البيانات بشكل صحيح، لكنه أحيانًا يضلّل عمدًا أو دون قصد. أكثر الفخاخ شيوعًا: ألّا يبدأ المحور الرأسي من الصفر (فيبدو تغيّر صغير هائلًا)، واستعمال مقاييس مختلفة لمقارنة تمثيلين، والرسوم ثلاثية الأبعاد (تبدو الكمية المضاعفة أكبر بثماني مرات في الحجم). وفي المخطط الدائري يجب أن يكون مجموع النسب 100. عند قراءة تمثيل انظر دائمًا إلى المقياس والمحاور والوحدات، واحسب النسبة الحقيقية.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Ardatza ez da 0tik hasten', 'El eje no empieza en 0', 'المحور لا يبدأ من 0'), text: say('3000tik 3200era igotzea % 7 besterik ez da, baina ardatza 2900etik hasten bada, barra hirukoitza dirudi.', 'Pasar de 3000 a 3200 es solo un 7 %, pero si el eje empieza en 2900, la barra parece el triple.', 'الانتقال من 3000 إلى 3200 زيادة 7 % فقط، لكن إذا بدأ المحور من 2900 بدا العمود ثلاثة أضعاف.'), math: same('$\\frac{200}{3000}\\approx 0{,}07$') },
            { title: say('Irudi handituak', 'Dibujos agrandados', 'رسوم مكبَّرة'), text: say('Bidoi baten altuera bikoizten bada, bolumena 8 aldiz handiagoa dirudi.', 'Si se duplica la altura de un bidón, su volumen parece 8 veces mayor.', 'إذا ضوعف ارتفاع برميل بدا حجمه أكبر بثماني مرات.'), math: same('$2^{3}=8$') },
            { title: say('Ehunekoen batura', 'Suma de porcentajes', 'مجموع النسب'), text: say('Sektoreek % 38, % 22 eta % 40 badute, ondo dago: 100.', 'Si los sectores son 38 %, 22 % y 40 %, está bien: 100.', 'إذا كانت القطاعات 38 % و22 % و40 % فهو صحيح: 100.'), math: same('$38+22+40=100$') }
        ],
        example: same('$3200-3000=200$'),
        takeaway: say('Begiratu beti ardatzak eta eskala; kalkulatu benetako aldaketa.', 'Mira siempre los ejes y la escala; calcula el cambio real.', 'انظر دائمًا إلى المحاور والمقياس، واحسب التغيّر الحقيقي.'),
        figure: (language) => <MisleadingFigure language={language} />
    },

    /* ---------- 3. Centralization ---------- */
    {
        id: 'mean-table',
        stage: 'centre',
        title: say('Batez bestekoa taula batetik', 'La media desde una tabla', 'المتوسط من جدول'),
        goal: say('Maiztasun-taula baten batez bestekoa kalkulatzea, datu multzokatuekin ere bai.', 'Calcular la media de una tabla de frecuencias, también con datos agrupados.', 'حساب متوسط جدول تكرارات، وكذلك للبيانات المبوّبة.'),
        explanation: say(
            'Batez bestekoa ($\\bar{x}$) datu guztien batura zati datu kopurua da. Datuak taula batean daudenean, ez dago bat banaka batu beharrik: balio bakoitza bider bere maiztasuna, $x_i\\cdot f_i$, zutabe berri batean idazten da, zutabe hori batu eta $N$-z zatitu: $\\bar{x}=\\frac{\\sum x_i f_i}{N}$. Datuak multzokatuta badaude, $x_i$ klase-marka da; emaitza hurbilketa bat da, tarte bakoitzeko datu guztiak klase-markan daudela suposatzen delako. Batez bestekoa aldagai kuantitatiboekin bakarrik kalkula daiteke.',
            'La media ($\\bar{x}$) es la suma de todos los datos entre el número de datos. Cuando los datos están en una tabla, no hace falta sumarlos uno a uno: cada valor por su frecuencia, $x_i\\cdot f_i$, se escribe en una columna nueva, se suma esa columna y se divide entre $N$: $\\bar{x}=\\frac{\\sum x_i f_i}{N}$. Si los datos están agrupados, $x_i$ es la marca de clase; el resultado es una aproximación, porque se supone que todos los datos de cada intervalo están en su marca de clase. La media solo se puede calcular con variables cuantitativas.',
            'المتوسط ($\\bar{x}$) هو مجموع كل البيانات مقسومًا على عددها. عندما تكون البيانات في جدول لا داعي لجمعها واحدًا واحدًا: تُكتب كل قيمة مضروبة في تكرارها، $x_i\\cdot f_i$، في عمود جديد، ثم يُجمع هذا العمود ويُقسم على $N$: $\\bar{x}=\\frac{\\sum x_i f_i}{N}$. وإذا كانت البيانات مبوّبة فإن $x_i$ هو مركز الفئة؛ والنتيجة تقريبية لأننا نفترض أن كل بيانات الفئة عند مركزها. ولا يُحسب المتوسط إلا للمتغيرات الكمية.'
        ),
        problem: say('Kalkulatu irakurritako liburuen batez bestekoa: 0 → 3, 1 → 6, 2 → 5, 3 → 4, 4 → 2.', 'Calcula la media de libros leídos: 0 → 3, 1 → 6, 2 → 5, 3 → 4, 4 → 2.', 'احسب متوسط الكتب المقروءة: 0 ← 3، 1 ← 6، 2 ← 5، 3 ← 4، 4 ← 2.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zutabe berria: $x_i\\cdot f_i$.', 'Columna nueva: $x_i\\cdot f_i$.', 'عمود جديد: $x_i\\cdot f_i$.'), math: same('$0,\\ 6,\\ 10,\\ 12,\\ 8$') },
            { text: say('Batu zutabea.', 'Suma la columna.', 'اجمع العمود.'), math: same('$0+6+10+12+8=36$') },
            { text: say('Zatitu $N=20$-z.', 'Divide entre $N=20$.', 'اقسم على $N=20$.'), math: same('$\\bar{x}=\\frac{36}{20}=1{,}8$') }
        ],
        example: same('$\\frac{145\\cdot 3+155\\cdot 9+165\\cdot 12+175\\cdot 6}{30}=162$'),
        takeaway: say('Batez bestekoa: balio bakoitza bider bere maiztasuna, batu eta zati datu kopurua. Multzokatuta, klase-markekin.', 'Media: cada valor por su frecuencia, suma y divide entre el número de datos. Agrupados, con las marcas de clase.', 'المتوسط: كل قيمة في تكرارها، ثم الجمع والقسمة على عدد البيانات. وفي المبوّبة بمراكز الفئات.'),
        figure: (language) => <MeanTableFigure language={language} />
    },
    {
        id: 'median-table',
        stage: 'centre',
        title: say('Mediana eta moda taula batetik', 'Mediana y moda desde una tabla', 'الوسيط والمنوال من جدول'),
        goal: say('Maiztasun metatuak erabiliz mediana aurkitzea eta moda (edo modak) ezagutzea.', 'Encontrar la mediana con las frecuencias acumuladas y reconocer la moda (o las modas).', 'إيجاد الوسيط بالتكرارات المتجمّعة والتعرّف إلى المنوال (أو المنوالات).'),
        explanation: say(
            'Moda maiztasun handieneko balioa da; bi balio berdinduta badaude, banaketa bimodala da. Aldagai kualitatiboetan ere badago moda. Mediana datuak ordenatuta erdian geratzen den balioa da. Taula batean, ez dago datuak idatzi beharrik: kalkulatu $N:2$ eta bilatu lehen $F_i$ hori gainditzen duena. $N$ bakoitia bada, $\\frac{N+1}{2}$. postuko datua da; bikoitia bada, $\\frac{N}{2}$. eta hurrengo postuko datuen batez bestekoa. Liburuen taulan $N=20$: 10. eta 11. datuak. $F_1=9$ denez, biak 2 dira: $\\text{Me}=2$.',
            'La moda es el valor de mayor frecuencia; si dos valores empatan, la distribución es bimodal. También hay moda en las variables cualitativas. La mediana es el valor que queda en el centro con los datos ordenados. En una tabla no hace falta escribir los datos: calcula $N:2$ y busca la primera $F_i$ que lo supera. Si $N$ es impar, es el dato de la posición $\\frac{N+1}{2}$; si es par, la media de los datos de las posiciones $\\frac{N}{2}$ y la siguiente. En la tabla de libros $N=20$: datos 10.º y 11.º. Como $F_1=9$, los dos son 2: $\\text{Me}=2$.',
            'المنوال هو القيمة ذات التكرار الأكبر؛ وإذا تساوت قيمتان كان التوزيع ثنائي المنوال. وللمتغيرات النوعية منوال أيضًا. والوسيط هو القيمة التي تبقى في الوسط بعد ترتيب البيانات. في الجدول لا حاجة لكتابة البيانات: احسب $N:2$ وابحث عن أول $F_i$ يتجاوزه. إذا كان $N$ فرديًا فهو البيان في الموقع $\\frac{N+1}{2}$، وإذا كان زوجيًا فهو متوسط البيانين في الموقع $\\frac{N}{2}$ والذي يليه. في جدول الكتب $N=20$: البيانان العاشر والحادي عشر. وبما أن $F_1=9$ فكلاهما 2: $\\text{Me}=2$.'
        ),
        problem: say('Familia bakoitzeko seme-alabak: 0 → 2, 1 → 5, 2 → 8, 3 → 6, 4 → 3 ($N=24$). Aurkitu mediana eta moda.', 'Hijos por familia: 0 → 2, 1 → 5, 2 → 8, 3 → 6, 4 → 3 ($N=24$). Halla la mediana y la moda.', 'عدد الأبناء في كل أسرة: 0 ← 2، 1 ← 5، 2 ← 8، 3 ← 6، 4 ← 3 ($N=24$). أوجد الوسيط والمنوال.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maiztasun metatuak.', 'Frecuencias acumuladas.', 'التكرارات المتجمّعة.'), math: same('$2,\\ 7,\\ 15,\\ 21,\\ 24$') },
            { text: say('$N$ bikoitia: 12. eta 13. datuak. Biak $F_i=15$-en barruan: 2.', '$N$ par: datos 12.º y 13.º. Los dos caen dentro de $F_i=15$: 2.', '$N$ زوجي: البيانان 12 و13. كلاهما ضمن $F_i=15$: أي 2.'), math: same('$\\frac{2+2}{2}=2$') },
            { text: say('Moda: maiztasun handiena, 8.', 'Moda: la mayor frecuencia, 8.', 'المنوال: أكبر تكرار، 8.'), math: say('$\\text{Mo}=2$', '$\\text{Mo}=2$', '$\\text{Mo}=2$') }
        ],
        example: same('$N=15\\ \\to\\ \\frac{15+1}{2}=8$'),
        takeaway: say('Mediana: kalkulatu erdiko postua eta bilatu metatuetan. Moda: maiztasun handiena duen balioa.', 'Mediana: calcula la posición central y búscala en las acumuladas. Moda: el valor de mayor frecuencia.', 'الوسيط: احسب الموقع الأوسط وابحث عنه في المتجمّعة. المنوال: القيمة ذات التكرار الأكبر.'),
        figure: (language) => <MedianTableFigure language={language} />
    },
    {
        id: 'symmetry',
        stage: 'centre',
        title: say('Batez bestekoa ala mediana?', '¿Media o mediana?', 'المتوسط أم الوسيط؟'),
        goal: say('Banaketa simetrikoak eta asimetrikoak bereiztea eta muturreko balioek batez bestekoan duten eragina ikustea.', 'Distinguir distribuciones simétricas y asimétricas y ver el efecto de los valores extremos en la media.', 'التمييز بين التوزيعات المتماثلة وغير المتماثلة ورؤية أثر القيم المتطرفة في المتوسط.'),
        explanation: say(
            'Banaketa simetrikoa da grafikoa erdiko lerro batekiko ispilu bat bezalakoa denean; orduan batez bestekoa eta mediana oso hurbil daude. Asimetrikoa denean, datu batzuk alde batera luzatzen dira, eta batez bestekoa alde horretara mugitzen da, mediana baino gehiago. Muturreko balio bakar batek (oso handia edo oso txikia) batez bestekoa asko alda dezake, baina mediana ia ez. Adibidez, enpresa batean lau langilek 1200 € irabazten badituzte eta zuzendariak 6000 €, batez bestekoa 2160 € da, baina mediana 1200 €: kasu horretan mediana da ordezkari hobea.',
            'Una distribución es simétrica cuando su gráfico es como un espejo respecto a una línea central; entonces la media y la mediana están muy cerca. Cuando es asimétrica, algunos datos se alargan hacia un lado y la media se desplaza hacia ese lado, más que la mediana. Un solo valor extremo (muy grande o muy pequeño) puede cambiar mucho la media, pero casi nada la mediana. Por ejemplo, si en una empresa cuatro empleados ganan 1200 € y el director 6000 €, la media es 2160 €, pero la mediana 1200 €: en ese caso la mediana representa mejor.',
            'يكون التوزيع متماثلًا عندما يكون تمثيله كالمرآة بالنسبة إلى خط في الوسط؛ وعندئذ يكون المتوسط والوسيط متقاربين جدًا. وعندما يكون غير متماثل تمتد بعض البيانات نحو جهة، فينزاح المتوسط نحوها أكثر من الوسيط. وقيمة متطرفة واحدة (كبيرة جدًا أو صغيرة جدًا) قد تغيّر المتوسط كثيرًا، لكنها لا تكاد تغيّر الوسيط. مثلًا، إذا كان أربعة موظفين في شركة يتقاضون 1200 € والمدير 6000 €، فالمتوسط 2160 € لكن الوسيط 1200 €: في هذه الحالة يمثّل الوسيط أفضل.'
        ),
        problem: say('Soldatak (€): 1200, 1200, 1200, 1200, 6000. Kalkulatu batez bestekoa eta mediana. Zeinek ordezkatzen ditu hobeto?', 'Sueldos (€): 1200, 1200, 1200, 1200, 6000. Calcula la media y la mediana. ¿Cuál los representa mejor?', 'الرواتب (€): 1200، 1200، 1200، 1200، 6000. احسب المتوسط والوسيط. أيهما يمثّلها أفضل؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoa.', 'Media.', 'المتوسط.'), math: same('$\\frac{4\\cdot 1200+6000}{5}=2160$') },
            { text: say('Mediana: erdiko datua (3.a).', 'Mediana: el dato central (el 3.º).', 'الوسيط: البيان الأوسط (الثالث).'), math: say('$\\text{Me}=1200$', '$\\text{Me}=1200$', '$\\text{Me}=1200$') },
            { text: say('Inork ez du 2160 € irabazten: mediana da ordezkari hobea.', 'Nadie gana 2160 €: la mediana representa mejor.', 'لا أحد يتقاضى 2160 €: الوسيط يمثّل أفضل.') }
        ],
        example: same('$\\frac{3+4+5+6+7}{5}=5$'),
        takeaway: say('Simetrikoa: batez bestekoa ≈ mediana. Muturreko balioekin, mediana fidagarriagoa.', 'Simétrica: media ≈ mediana. Con valores extremos, la mediana es más fiable.', 'المتماثل: المتوسط ≈ الوسيط. ومع القيم المتطرفة يكون الوسيط أوثق.'),
        figure: (language) => <SymmetryFigure language={language} />
    },

    /* ---------- 4. Dispersion and position ---------- */
    {
        id: 'deviation',
        stage: 'spread',
        title: say('Ibiltartea eta batez besteko desbideratzea', 'Recorrido y desviación media', 'المدى والانحراف المتوسط'),
        goal: say('Datuen sakabanaketa ibiltartearekin eta batez besteko desbideratzearekin neurtzea.', 'Medir la dispersión de los datos con el recorrido y la desviación media.', 'قياس تشتت البيانات بالمدى والانحراف المتوسط.'),
        explanation: say(
            'Bi talderen batez bestekoa berdina izan daiteke eta datuak oso modu desberdinean banatuta egon. Sakabanaketa-parametroek datuak batez bestekotik zenbat urruntzen diren neurtzen dute. Ibiltartea (heina) handiena ken txikiena da: azkarra, baina bi datu bakarrik begiratzen ditu. Batez besteko desbideratzeak (DM) datu guztiak hartzen ditu kontuan: datu bakoitzaren eta batez bestekoaren arteko distantzien batez bestekoa da, $\\text{DM}=\\frac{\\sum |x_i-\\bar{x}|\\cdot f_i}{N}$. Distantziak beti positiboak dira. Zenbat eta txikiagoa izan, orduan eta bilduago daude datuak batez bestekoaren inguruan.',
            'Dos grupos pueden tener la misma media y los datos repartidos de manera muy distinta. Los parámetros de dispersión miden cuánto se alejan los datos de la media. El recorrido (o rango) es el mayor menos el menor: rápido, pero solo mira dos datos. La desviación media (DM) tiene en cuenta todos los datos: es la media de las distancias de cada dato a la media, $\\text{DM}=\\frac{\\sum |x_i-\\bar{x}|\\cdot f_i}{N}$. Las distancias son siempre positivas. Cuanto menor es, más agrupados están los datos alrededor de la media.',
            'قد يكون لمجموعتين المتوسط نفسه وتكون بياناتهما موزعة بطريقة مختلفة جدًا. تقيس مقاييس التشتت مقدار ابتعاد البيانات عن المتوسط. المدى هو الأكبر ناقص الأصغر: سريع لكنه لا ينظر إلا إلى بيانين. أما الانحراف المتوسط (DM) فيأخذ كل البيانات في الحسبان: إنه متوسط مسافات كل بيان عن المتوسط، $\\text{DM}=\\frac{\\sum |x_i-\\bar{x}|\\cdot f_i}{N}$. والمسافات موجبة دائمًا. وكلما صغر كانت البيانات أكثر تجمّعًا حول المتوسط.'
        ),
        problem: say('Kalkulatu 4, 6, 7, 8, 10 noten ibiltartea eta batez besteko desbideratzea.', 'Calcula el recorrido y la desviación media de las notas 4, 6, 7, 8, 10.', 'احسب المدى والانحراف المتوسط للعلامات 4، 6، 7، 8، 10.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ibiltartea: 10 − 4 = 6. Batez bestekoa:', 'Recorrido: 10 − 4 = 6. Media:', 'المدى: 10 − 4 = 6. المتوسط:'), math: same('$\\frac{4+6+7+8+10}{5}=7$') },
            { text: say('Distantziak 7ra.', 'Distancias a 7.', 'المسافات عن 7.'), math: same('$3,\\ 1,\\ 0,\\ 1,\\ 3$') },
            { text: say('Distantzien batez bestekoa.', 'Media de las distancias.', 'متوسط المسافات.'), math: same('$\\frac{3+1+0+1+3}{5}=1{,}6$') }
        ],
        example: same('$\\text{DM}=\\frac{20{,}4}{20}=1{,}02$'),
        takeaway: say('Ibiltartea: handiena − txikiena. DM: batez bestekoarekiko distantzien batez bestekoa.', 'Recorrido: mayor − menor. DM: media de las distancias a la media.', 'المدى: الأكبر − الأصغر. DM: متوسط المسافات عن المتوسط.'),
        figure: (language) => <DeviationFigure language={language} />
    },
    {
        id: 'quartiles',
        stage: 'spread',
        title: say('Kuartilak', 'Cuartiles', 'الربيعيات'),
        goal: say('Ordenatutako datuak lau zati berdinetan banatzen dituzten kuartilak kalkulatzea.', 'Calcular los cuartiles, que dividen los datos ordenados en cuatro partes iguales.', 'حساب الربيعيات التي تقسم البيانات المرتّبة إلى أربعة أجزاء متساوية.'),
        explanation: say(
            'Posizio-parametroek esaten dute datu bat ordenatutako zerrendan non dagoen. Medianak datuak bi erditan banatzen ditu. Kuartilek lau zatitan: lehen kuartilaren ($Q_1$) azpian datuen % 25 dago, medianaren ($Q_2=\\text{Me}$) azpian % 50, eta hirugarren kuartilaren ($Q_3$) azpian % 75. Kalkulatzeko: ordenatu datuak, aurkitu mediana, eta gero $Q_1$ beheko erdiaren mediana da eta $Q_3$ goiko erdiarena ($N$ bakoitia bada, mediana bera ez da erdietan sartzen). $Q_3-Q_1$ tartean erdiko datuen % 50 dago.',
            'Los parámetros de posición dicen dónde está un dato en la lista ordenada. La mediana divide los datos en dos mitades. Los cuartiles, en cuatro partes: por debajo del primer cuartil ($Q_1$) está el 25 % de los datos, por debajo de la mediana ($Q_2=\\text{Me}$) el 50 %, y por debajo del tercer cuartil ($Q_3$) el 75 %. Para calcularlos: ordena los datos, halla la mediana, y después $Q_1$ es la mediana de la mitad inferior y $Q_3$ la de la superior (si $N$ es impar, la propia mediana no entra en las mitades). Entre $Q_1$ y $Q_3$ está el 50 % central de los datos.',
            'تبيّن مقاييس الموقع أين يقع بيان في القائمة المرتّبة. يقسم الوسيط البيانات إلى نصفين، والربيعيات إلى أربعة أجزاء: تحت الربيع الأول ($Q_1$) يقع 25 % من البيانات، وتحت الوسيط ($Q_2=\\text{Me}$) 50 %، وتحت الربيع الثالث ($Q_3$) 75 %. لحسابها: رتّب البيانات وأوجد الوسيط، ثم $Q_1$ هو وسيط النصف الأدنى و$Q_3$ وسيط النصف الأعلى (إذا كان $N$ فرديًا لا يدخل الوسيط نفسه في النصفين). وبين $Q_1$ و$Q_3$ يقع 50 % الأوسط من البيانات.'
        ),
        problem: say('Aurkitu mediana eta kuartilak: 13, 12, 15, 19, 12, 12, 13, 14, 15, 14, 13, 18, 17, 9, 8.', 'Halla la mediana y los cuartiles de: 13, 12, 15, 19, 12, 12, 13, 14, 15, 14, 13, 18, 17, 9, 8.', 'أوجد الوسيط والربيعيات لـ: 13، 12، 15، 19، 12، 12، 13، 14، 15، 14، 13، 18، 17، 9، 8.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordenatu 15 datuak: 8, 9, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 17, 18, 19.', 'Ordena los 15 datos: 8, 9, 12, 12, 12, 13, 13, 13, 14, 14, 15, 15, 17, 18, 19.', 'رتّب البيانات الخمسة عشر: 8، 9، 12، 12، 12، 13، 13، 13، 14، 14، 15، 15، 17، 18، 19.') },
            { text: say('Mediana: 8. datua.', 'Mediana: el dato 8.º.', 'الوسيط: البيان الثامن.'), math: same('$\\text{Me}=13$') },
            { text: say('Beheko 7 datuen erdikoa (4.a) eta goiko 7en erdikoa (12.a).', 'El central de los 7 de abajo (el 4.º) y el de los 7 de arriba (el 12.º).', 'أوسط البيانات السبعة الدنيا (الرابع) وأوسط السبعة العليا (الثاني عشر).'), math: same('$Q_1=12\\qquad Q_3=15$') }
        ],
        example: same('$Q_3-Q_1=15-12=3$'),
        takeaway: say('$Q_1$, Me eta $Q_3$: datuen % 25, % 50 eta % 75 haien azpian.', '$Q_1$, Me y $Q_3$: el 25 %, el 50 % y el 75 % de los datos por debajo.', '$Q_1$ وMe و$Q_3$: تحتها 25 % و50 % و75 % من البيانات.'),
        figure: (language) => <QuartilesFigure language={language} />
    },
    {
        id: 'box-plot',
        stage: 'spread',
        title: say('Kutxa-diagrama', 'Diagrama de caja y bigotes', 'مخطط الصندوق'),
        goal: say('Bost zenbakiko laburpenarekin kutxa-diagrama egitea eta irakurtzea.', 'Construir y leer un diagrama de caja y bigotes con el resumen de cinco números.', 'بناء مخطط الصندوق وقراءته بملخّص الأعداد الخمسة.'),
        explanation: say(
            'Kutxa-diagramak (kutxa eta bibote diagramak) bost balio laburtzen ditu: txikiena, $Q_1$, mediana, $Q_3$ eta handiena. Eskala baten gainean, kutxa bat marrazten da $Q_1$-etik $Q_3$-ra, marra bat medianan, eta bi bibote kutxatik muturretaraino. Lau zatietako bakoitzean datuen % 25 dago, nahiz eta luzera desberdina izan: zati laburra bada, datuak bilduta daude; luzea bada, sakabanatuta. Bi talde konparatzeko oso erabilgarria da: bi kutxa eskala beraren gainean.',
            'El diagrama de caja y bigotes resume cinco valores: el mínimo, $Q_1$, la mediana, $Q_3$ y el máximo. Sobre una escala se dibuja una caja de $Q_1$ a $Q_3$, una raya en la mediana y dos bigotes desde la caja hasta los extremos. En cada una de las cuatro partes está el 25 % de los datos, aunque tengan longitudes distintas: si una parte es corta, los datos están agrupados; si es larga, dispersos. Es muy útil para comparar dos grupos: dos cajas sobre la misma escala.',
            'يلخّص مخطط الصندوق خمس قيم: الأصغر و$Q_1$ والوسيط و$Q_3$ والأكبر. فوق مقياس نرسم صندوقًا من $Q_1$ إلى $Q_3$، وخطًا عند الوسيط، وشاربين من الصندوق إلى الطرفين. في كل جزء من الأجزاء الأربعة 25 % من البيانات، وإن اختلفت أطوالها: إذا كان الجزء قصيرًا فالبيانات متجمّعة، وإذا كان طويلًا فهي متشتتة. وهو مفيد جدًا لمقارنة مجموعتين: صندوقان فوق المقياس نفسه.'
        ),
        problem: say('30 ikasleren noten kutxa-diagraman: txikiena 1, $Q_1=3{,}5$, $\\text{Me}=5$, $Q_3=6$, handiena 9. Interpretatu.', 'En el diagrama de caja de las notas de 30 alumnos: mínimo 1, $Q_1=3{,}5$, $\\text{Me}=5$, $Q_3=6$, máximo 9. Interprétalo.', 'في مخطط صندوق علامات 30 تلميذًا: الأصغر 1، $Q_1=3{,}5$، $\\text{Me}=5$، $Q_3=6$، الأكبر 9. فسّره.'),
        stepsKind: 'steps',
        steps: [
            { text: say('% 25ek 1 eta 3,5 artean atera dute; beste % 25ek 3,5 eta 5 artean.', 'Un 25 % ha sacado entre 1 y 3,5; otro 25 %, entre 3,5 y 5.', '25 % حصلوا على ما بين 1 و3.5، و25 % آخرون بين 3.5 و5.') },
            { text: say('Beste % 25 5 eta 6 artean (zati laburrena: bilduen dauden notak), eta azken % 25 6 eta 9 artean.', 'Otro 25 % entre 5 y 6 (la parte más corta: las notas más agrupadas), y el último 25 % entre 6 y 9.', 'و25 % بين 5 و6 (أقصر جزء: العلامات الأكثر تجمّعًا)، وآخر 25 % بين 6 و9.') },
            { text: say('Erdiak gainditu du: $\\text{Me}=5$. Ibiltartea eta kutxaren luzera:', 'La mitad ha aprobado: $\\text{Me}=5$. Recorrido y longitud de la caja:', 'نصفهم نجحوا: $\\text{Me}=5$. المدى وطول الصندوق:'), math: same('$9-1=8\\qquad 6-3{,}5=2{,}5$') }
        ],
        example: same('$1\\quad 3{,}5\\quad 5\\quad 6\\quad 9$'),
        takeaway: say('Kutxa: $Q_1$-etik $Q_3$-ra, marra medianan; biboteak muturretaraino. Zati bakoitzean % 25.', 'Caja: de $Q_1$ a $Q_3$, raya en la mediana; bigotes hasta los extremos. En cada parte, el 25 %.', 'الصندوق: من $Q_1$ إلى $Q_3$ وخط عند الوسيط، والشاربان حتى الطرفين. في كل جزء 25 %.'),
        figure: (language) => <BoxPlotFigure language={language} />
    },

    /* ---------- 5. Chance and probability ---------- */
    {
        id: 'events',
        stage: 'chance',
        title: say('Gertaerak eta aurkako gertaera', 'Sucesos y suceso contrario', 'الأحداث والحدث المعاكس'),
        goal: say('Gertaerak lagin-espazioaren zati gisa idaztea, aurkako gertaeraren probabilitatea kalkulatzea eta gailu erregularrak eta irregularrak bereiztea.', 'Escribir sucesos como partes del espacio muestral, calcular la probabilidad del suceso contrario y distinguir instrumentos regulares e irregulares.', 'كتابة الأحداث أجزاءً من فضاء العيّنة، وحساب احتمال الحدث المعاكس، والتمييز بين الأدوات المنتظمة وغير المنتظمة.'),
        explanation: say(
            'Gertaera bat lagin-espazioaren azpimultzo bat da. A gertaeraren aurkakoa, $\\bar{A}$, A gertatzen ez denean gertatzen dena da: «bikoitia» ateratzearen aurkakoa «bakoitia» da. Bien artean lagin-espazio osoa osatzen dute; beraz, $P(\\bar{A})=1-P(A)$. Dado edo txanpon zuzen bat gailu erregularra da: emaitza guztiek aukera bera dute, eta Laplaceren erregela erabil daiteke. Txintxeta edo hezur-dado (taba) bat irregularra da: probabilitatea esperimentatuz bakarrik ezagutzen da, askotan errepikatu eta maiztasun erlatiboa hartuta.',
            'Un suceso es un subconjunto del espacio muestral. El contrario del suceso A, $\\bar{A}$, es lo que ocurre cuando no ocurre A: el contrario de sacar «par» es sacar «impar». Entre los dos forman todo el espacio muestral; por eso $P(\\bar{A})=1-P(A)$. Un dado o una moneda correctos son instrumentos regulares: todos los resultados tienen la misma posibilidad y se puede usar la regla de Laplace. Una chincheta o una taba son irregulares: la probabilidad solo se conoce experimentando, repitiendo muchas veces y tomando la frecuencia relativa.',
            'الحدث مجموعة جزئية من فضاء العيّنة. الحدث المعاكس للحدث A، أي $\\bar{A}$، هو ما يقع عندما لا يقع A: معاكس «عدد زوجي» هو «عدد فردي». ويكوّنان معًا فضاء العيّنة كله؛ لذلك $P(\\bar{A})=1-P(A)$. والنرد أو قطعة النقود السليمان أداتان منتظمتان: لكل النتائج الإمكان نفسه، ويمكن استعمال قاعدة لابلاس. أما الدبوس أو عظمة الكعب فغير منتظمين: لا يُعرف الاحتمال إلا بالتجريب، بالتكرار مرات كثيرة وأخذ التكرار النسبي.'
        ),
        problem: say('Poltsa batean 1etik 10era zenbakitutako bolak daude. A = «3ren multiploa». Idatzi A eta $\\bar{A}$, eta kalkulatu haien probabilitateak.', 'En una bolsa hay bolas numeradas del 1 al 10. A = «múltiplo de 3». Escribe A y $\\bar{A}$ y calcula sus probabilidades.', 'في كيس كرات مرقّمة من 1 إلى 10. A = «مضاعف للعدد 3». اكتب A و$\\bar{A}$ واحسب احتماليهما.'),
        stepsKind: 'steps',
        steps: [
            { text: say('A gertaera.', 'El suceso A.', 'الحدث A.'), math: same('$A=\\{3,6,9\\}\\qquad P(A)=\\frac{3}{10}$') },
            { text: say('Aurkakoa: gainerako zazpiak.', 'El contrario: los otros siete.', 'المعاكس: السبعة الباقية.'), math: same('$\\bar{A}=\\{1,2,4,5,7,8,10\\}$') },
            { text: say('Egiaztatu formularekin.', 'Comprueba con la fórmula.', 'تحقّق بالصيغة.'), math: same('$1-\\frac{3}{10}=\\frac{7}{10}$') }
        ],
        example: same('$P(A)=0{,}37\\ \\to\\ P(\\bar{A})=1-0{,}37=0{,}63$'),
        takeaway: say('$P(\\bar{A})=1-P(A)$. Gailu irregularretan, probabilitatea maiztasun erlatiboz hurbiltzen da.', '$P(\\bar{A})=1-P(A)$. En instrumentos irregulares, la probabilidad se aproxima con la frecuencia relativa.', '$P(\\bar{A})=1-P(A)$. وفي الأدوات غير المنتظمة يُقرَّب الاحتمال بالتكرار النسبي.'),
        figure: (language) => <EventsFigure language={language} />
    },
    {
        id: 'tree',
        stage: 'chance',
        title: say('Zuhaitz-diagramak eta taulak', 'Diagramas de árbol y tablas', 'المخططات الشجرية والجداول'),
        goal: say('Esperimentu konposatuen emaitza guztiak zuhaitz edo taula batekin zenbatzea eta probabilitateak kalkulatzea.', 'Contar todos los resultados de experimentos compuestos con un árbol o una tabla y calcular probabilidades.', 'عدّ كل نتائج التجارب المركّبة بشجرة أو جدول وحساب الاحتمالات.'),
        explanation: say(
            'Esperimentu batek hainbat urrats dituenean (bi txanpon, bi dado), emaitza guztiak ez ahazteko zuhaitz-diagrama bat marrazten da: lehen urratsaren emaitza bakoitzetik bigarrenaren adar guztiak ateratzen dira, eta abar. Adarren amaiera bakoitza emaitza bat da, eta guztiek aukera bera dute. Bi txanponekin 4 emaitza daude (AA, AX, XA, XX), ez 3: «aurpegi bat eta gurutze bat» bi aldiz agertzen da. Bi dadorekin hobe da taula bat: $6\\cdot 6=36$ gelaxka. Gero Laplaceren erregela aplikatzen da.',
            'Cuando un experimento tiene varios pasos (dos monedas, dos dados), para no olvidar ningún resultado se dibuja un diagrama de árbol: de cada resultado del primer paso salen todas las ramas del segundo, y así sucesivamente. Cada final de rama es un resultado, y todos tienen la misma posibilidad. Con dos monedas hay 4 resultados (CC, C+, +C, ++), no 3: «una cara y una cruz» aparece dos veces. Con dos dados es mejor una tabla: $6\\cdot 6=36$ casillas. Después se aplica la regla de Laplace.',
            'عندما تكون للتجربة عدة خطوات (قطعتا نقود، نردان) نرسم مخططًا شجريًا كي لا ننسى أي نتيجة: من كل نتيجة للخطوة الأولى تخرج كل فروع الخطوة الثانية، وهكذا. وكل نهاية فرع نتيجة، ولكل النتائج الإمكان نفسه. مع قطعتي نقود هناك 4 نتائج (CC، C+، +C، ++)، لا 3: «وجه وظهر» تظهر مرتين. ومع نردين يكون الجدول أفضل: $6\\cdot 6=36$ خانة. ثم نطبّق قاعدة لابلاس.'
        ),
        problem: say('Hiru txanpon botatzen dira. Zein da aurpegi bakarra ateratzeko probabilitatea? Eta gutxienez aurpegi bat?', 'Se lanzan tres monedas. ¿Cuál es la probabilidad de obtener una sola cara? ¿Y al menos una cara?', 'تُرمى ثلاث قطع نقود. ما احتمال الحصول على وجه واحد فقط؟ وعلى وجه واحد على الأقل؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zuhaitza: 2 adar, gero 2, gero 2.', 'Árbol: 2 ramas, luego 2, luego 2.', 'الشجرة: فرعان ثم فرعان ثم فرعان.'), math: same('$2\\cdot 2\\cdot 2=8$') },
            { text: say('Aurpegi bakarra: AXX, XAX, XXA.', 'Una sola cara: C++, +C+, ++C.', 'وجه واحد فقط: C++، +C+، ++C.'), math: same('$P=\\frac{3}{8}$') },
            { text: say('Gutxienez bat: «aurpegirik ez»-ren aurkakoa.', 'Al menos una: el contrario de «ninguna cara».', 'وجه على الأقل: معاكس «لا وجه».'), math: same('$1-\\frac{1}{8}=\\frac{7}{8}$') }
        ],
        example: same('$6\\cdot 6=36\\qquad \\frac{6}{36}=\\frac{1}{6}$'),
        takeaway: say('Zuhaitzak edo taulak emaitza guztiak erakusten ditu. Gero, aldekoak zati posibleak.', 'El árbol o la tabla muestran todos los resultados. Luego, favorables entre posibles.', 'الشجرة أو الجدول يُظهران كل النتائج. ثم الملائمة على الممكنة.'),
        figure: (language) => <TreeFigure language={language} />
    },
    {
        id: 'double-table',
        stage: 'chance',
        title: say('Sarrera bikoitzeko taulak', 'Tablas de doble entrada', 'الجداول ذات المدخلين'),
        goal: say('Bi ezaugarri batera dituzten taulak irakurtzea, osatzea eta haietatik probabilitateak kalkulatzea.', 'Leer y completar tablas con dos características a la vez y calcular probabilidades a partir de ellas.', 'قراءة جداول تجمع خاصيتين معًا وإكمالها وحساب الاحتمالات منها.'),
        explanation: say(
            'Sarrera bikoitzeko taula batean banakoak bi ezaugarriren arabera sailkatzen dira: errenkadetan bata eta zutabeetan bestea. Gelaxka bakoitzak bi ezaugarriak batera dituztenak zenbatzen ditu, eta azken errenkadak eta zutabeak guztizkoak. Hutsuneak betetzeko, erabili errenkaden eta zutabeen baturak. Probabilitate bat kalkulatzeko, aldekoak zati posibleak egin, baina kontuz kasu posibleekin: «gaixorik dagoela jakinda, katua izatea» galdetzen badute, kasu posibleak gaixo daudenak bakarrik dira, ez animalia guztiak.',
            'En una tabla de doble entrada los individuos se clasifican según dos características: una en las filas y otra en las columnas. Cada casilla cuenta los que tienen las dos características a la vez, y la última fila y la última columna, los totales. Para rellenar los huecos, usa las sumas de filas y columnas. Para calcular una probabilidad, favorables entre posibles, pero cuidado con los casos posibles: si preguntan «sabiendo que está enfermo, que sea gato», los casos posibles son solo los enfermos, no todos los animales.',
            'في الجدول ذي المدخلين يُصنَّف الأفراد حسب خاصيتين: إحداهما في الأسطر والأخرى في الأعمدة. وكل خانة تعدّ من يجمعون الخاصيتين معًا، والسطر الأخير والعمود الأخير للمجاميع. لملء الفراغات استعمل مجاميع الأسطر والأعمدة. ولحساب احتمال نقسم الملائمة على الممكنة، مع الحذر في الحالات الممكنة: إذا سُئل «علمًا أنه مريض، أن يكون قطًّا» فالحالات الممكنة هي المرضى فقط، لا كل الحيوانات.'
        ),
        problem: say('Animalien babesleku batean: katu osasuntsuak 12, txakur osasuntsuak 17, katu gaixoak 4, txakur gaixoak 7. Animalia bat zoriz hartuta, zein da txakurra izateko probabilitatea? Eta, gaixorik dagoela jakinda, katua izatekoa?', 'En un refugio de animales: gatos sanos 12, perros sanos 17, gatos enfermos 4, perros enfermos 7. Tomando uno al azar, ¿cuál es la probabilidad de que sea perro? ¿Y, sabiendo que está enfermo, de que sea gato?', 'في ملجأ للحيوانات: قطط سليمة 12، كلاب سليمة 17، قطط مريضة 4، كلاب مريضة 7. إذا أخذنا حيوانًا عشوائيًا، ما احتمال أن يكون كلبًا؟ وعلمًا أنه مريض، ما احتمال أن يكون قطًّا؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Guztizkoak: 24 txakur, 11 gaixo eta 40 animalia.', 'Totales: 24 perros, 11 enfermos y 40 animales.', 'المجاميع: 24 كلبًا و11 مريضًا و40 حيوانًا.'), math: same('$12+17+4+7=40$') },
            { text: say('Txakurra: 40tik 24.', 'Perro: 24 de 40.', 'كلب: 24 من 40.'), math: same('$P=\\frac{24}{40}=\\frac{3}{5}$') },
            { text: say('Gaixorik dagoela jakinda: 11 kasu posible, 4 katu.', 'Sabiendo que está enfermo: 11 casos posibles, 4 gatos.', 'علمًا أنه مريض: 11 حالة ممكنة، منها 4 قطط.'), math: same('$P=\\frac{4}{11}$') }
        ],
        example: same('$\\frac{12}{40}=\\frac{3}{10}\\qquad \\frac{4}{11}\\approx 0{,}36$'),
        takeaway: say('Begiratu ondo kasu posibleak: denak ala errenkada edo zutabe bat bakarrik?', 'Mira bien los casos posibles: ¿todos o solo una fila o columna?', 'انتبه إلى الحالات الممكنة: الكل أم سطر أو عمود فقط؟'),
        figure: (language) => <DoubleTableFigure language={language} />
    }
]

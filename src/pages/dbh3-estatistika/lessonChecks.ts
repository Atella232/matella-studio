import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Estatistika · 3. DBH — the typical mistake and the «Check it» question
   of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The mistakes are the ones the
   lessons already had; the questions use new numbers, never those of
   «Let's solve» or of the example, and one of their wrong answers is the
   lesson's typical mistake. Tables are given in words. Tests in
   tests/lesson-checks.test.ts.
   ========================================================================== */

export type Stats3TopicId = 'population-sample' | 'frequency-table' | 'grouped-data' | 'bar-histogram' | 'pie-chart' | 'reading-charts' | 'mean' | 'median' | 'mode' | 'range-quartiles' | 'box-plot' | 'variance' | 'events' | 'laplace' | 'compound'

export const stats3LessonChecks: Record<Stats3TopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'population-sample': {
        mistake: {
            wrong: say('Etxeko anai-arreba kopurua aldagai jarraitua da, zenbakiak direlako.', 'El número de hermanos es una variable continua porque son números.', 'عدد الإخوة متغيّر متصل لأنه أعداد.', 'The number of siblings is continuous because it is a number.'),
            right: say('Zenbakiak dira, baina balio solteak (0, 1, 2…): kuantitatibo diskretua.', 'Son números, pero valores sueltos (0, 1, 2…): cuantitativa discreta.', 'إنها أعداد لكنها قيم منفردة (0، 1، 2…): كمّي منفصل.', 'They are numbers, but separate values (0, 1, 2…): quantitative discrete.')
        },
        check: {
            prompt: say('Nolako aldagaia da «institutura iristeko behar duzun denbora»?', '¿Qué tipo de variable es «el tiempo que tardas en llegar al instituto»?', 'ما نوع المتغير «الزمن الذي تستغرقه للوصول إلى المدرسة»؟', 'What kind of variable is «the time it takes you to get to school»?'),
            options: [say('Kualitatiboa', 'Cualitativa', 'نوعي', 'Qualitative'), say('Kuantitatibo diskretua', 'Cuantitativa discreta', 'كمي متقطع', 'Discrete quantitative'), say('Kuantitatibo jarraitua', 'Cuantitativa continua', 'كمي متصل', 'Continuous quantitative')],
            correctIndex: 2,
            explanation: say('Zenbaki bat da, eta tarte bateko edozein balio har dezake (12,5 minutu, 13,2…): jarraitua.', 'Es un número y puede tomar cualquier valor de un intervalo (12,5 minutos, 13,2…): continua.', 'إنه عدد ويمكن أن يأخذ أي قيمة في فترة (12.5 دقيقة، 13.2…): متصل.', 'It is a number and can take any value in an interval (12.5 minutes, 13.2…): continuous.')
        }
    },
    'frequency-table': {
        mistake: {
            wrong: say('1 balioaren metatua 9 da.', 'La acumulada del valor 1 es 9.', 'المتجمّع للقيمة 1 هو 9.', 'The cumulative frequency of 1 is 9.'),
            right: say('9 maiztasun absolutua da; metatuak aurrekoak ere batzen ditu: $4+9=13$.', '9 es la absoluta; la acumulada suma también las anteriores: $4+9=13$.', '9 هو المطلق؛ والمتجمّع يضيف السابق أيضًا: $4+9=13$.', '9 is the absolute frequency; the cumulative one adds the earlier ones too: $4+9=13$.')
        },
        check: {
            prompt: say('3 ikaslek 5 bat atera dute, 7 ikaslek 6 bat, 6 ikaslek 7 bat eta 4 ikaslek 8 bat. Zein da 7 notaren maiztasun metatua?', '3 alumnos sacan un 5, 7 alumnos un 6, 6 alumnos un 7 y 4 alumnos un 8. ¿Cuál es la frecuencia acumulada del 7?', 'حصل 3 تلاميذ على 5، و7 على 6، و6 على 7، و4 على 8. ما التكرار المتجمّع للعلامة 7؟', '3 students get a 5, 7 get a 6, 6 get a 7 and 4 get an 8. What is the cumulative frequency of 7?'),
            options: [say('6', '6', '6', '6'), say('16', '16', '16', '16'), say('13', '13', '13', '13')],
            correctIndex: 1,
            explanation: say('Metatuak aurreko notak ere batzen ditu: $3+7+6=16$. 6 absolutua da.', 'La acumulada suma también las notas anteriores: $3+7+6=16$. 6 es la absoluta.', 'المتجمّع يجمع العلامات السابقة أيضًا: $3+7+6=16$. أما 6 فهو التكرار المطلق.', 'The cumulative frequency also adds the lower marks: $3+7+6=16$. 6 is the absolute one.')
        }
    },
    'grouped-data': {
        mistake: {
            wrong: say('$[150,160)$ tartearen klase-marka 160 da, muturra delako.', 'La marca de clase de $[150,160)$ es 160, porque es el extremo.', 'مركز الفئة $[150,160)$ هو 160 لأنه الطرف.', 'The class midpoint of $[150,160)$ is 160, because it is the end.'),
            right: say('Klase-marka erdiko puntua da: $\\frac{150+160}{2}=155$.', 'La marca de clase es el punto medio: $\\frac{150+160}{2}=155$.', 'مركز الفئة نقطة المنتصف: $\\frac{150+160}{2}=155$.', 'The class midpoint is the middle point: $\\frac{150+160}{2}=155$.')
        },
        check: {
            prompt: say('Zein da $[12,18)$ tartearen klase-marka?', '¿Cuál es la marca de clase de $[12,18)$?', 'ما مركز الفئة $[12,18)$؟', 'What is the class midpoint of $[12,18)$?'),
            options: [say('18', '18', '18', '18'), say('15', '15', '15', '15'), say('6', '6', '6', '6')],
            correctIndex: 1,
            explanation: say('Erdiko puntua: $\\frac{12+18}{2}=15$. 18 muturra da, eta 6 zabalera.', 'El punto medio: $\\frac{12+18}{2}=15$. 18 es el extremo, y 6, la amplitud.', 'المنتصف: $\\frac{12+18}{2}=15$. أما 18 فهو الطرف و6 طول الفئة.', 'The midpoint: $\\frac{12+18}{2}=15$. 18 is the endpoint, and 6 the width.')
        }
    },
    'bar-histogram': {
        mistake: {
            wrong: say('Altuerak histograma batean barra-diagraman bezala bereizita marrazten dira.', 'Las alturas de un histograma se dibujan separadas, como en un diagrama de barras.', 'تُرسم المستطيلات في المدرّج التكراري منفصلة كما في مخطط الأعمدة.', 'The rectangles of a histogram are drawn apart, like in a bar chart.'),
            right: say('Histogramako laukizuzenak elkarren ondoan doaz: tarteak jarraian daude.', 'Los rectángulos del histograma van pegados: los intervalos son seguidos.', 'تتلاصق مستطيلات المدرّج: الفترات متتالية.', 'The rectangles of a histogram touch: the intervals follow each other.')
        },
        check: {
            prompt: say('Zein grafikotan doaz laukizuzenak itsatsita?', '¿En qué gráfico van pegados los rectángulos?', 'في أي تمثيل تكون المستطيلات ملتصقة؟', 'In which chart do the rectangles touch?'),
            options: [say('Barra-diagraman', 'En el diagrama de barras', 'في مخطط الأعمدة', 'In the bar chart'), say('Histograman', 'En el histograma', 'في المدرّج التكراري', 'In the histogram'), say('Bietan', 'En los dos', 'في الاثنين', 'In both')],
            correctIndex: 1,
            explanation: say('Histogramaren tarteak bata bestearen ondoan daude; barra-diagraman balio solteak daude, eta barrak bananduta.', 'Los intervalos del histograma van seguidos; en el de barras hay valores sueltos y las barras van separadas.', 'فئات المدرّج متتالية، أما في مخطط الأعمدة فالقيم منفصلة والأعمدة متباعدة.', 'The intervals of a histogram follow on from each other; a bar chart has separate values and the bars are apart.')
        }
    },
    'pie-chart': {
        mistake: {
            wrong: say('% 25 duen sektoreak 25° ditu.', 'Un sector del 25 % mide 25°.', 'قطاع نسبته 25 % زاويته 25°.', 'A 25% sector measures 25°.'),
            right: say('Zirkulua 360° da, ez 100: $25\\cdot 3{,}6=90°$.', 'El círculo son 360°, no 100: $25\\cdot 3{,}6=90°$.', 'الدائرة 360° لا 100: $25\\cdot 3{,}6=90°$.', 'The circle is 360°, not 100: $25\\cdot 3{,}6=90°$.')
        },
        check: {
            prompt: say('Sektore batek 72° ditu. Datuen zer ehuneko adierazten du?', 'Un sector mide 72°. ¿Qué porcentaje de los datos representa?', 'قطاع قياسه 72°. ما النسبة المئوية التي يمثلها من البيانات؟', 'A sector measures 72°. What percentage of the data does it show?'),
            options: [say('% 72', '72 %', '72٪', '72%'), say('% 20', '20 %', '20٪', '20%'), say('% 36', '36 %', '36٪', '36%')],
            correctIndex: 1,
            explanation: say('Zirkulua 360° da, ez 100: $72\\div 3{,}6=20$.', 'El círculo son 360°, no 100: $72\\div 3{,}6=20$.', 'الدائرة 360° لا 100: $72\\div 3{,}6=20$.', 'The circle is 360°, not 100: $72\\div 3{,}6=20$.')
        }
    },
    'reading-charts': {
        mistake: {
            wrong: say('Barra bat bestea baino bi aldiz altuagoa bada, balioa bikoitza da beti.', 'Si una barra es el doble de alta que otra, su valor es siempre el doble.', 'إذا كان عمود أعلى من آخر بمرتين فقيمته ضعفها دائمًا.', 'If one bar is twice as tall as another, its value is always double.'),
            right: say('Ardatza 0 balioan hasten bada bakarrik. Bestela, irakurri zenbakiak.', 'Solo si el eje empieza en 0. Si no, lee los números.', 'فقط إذا بدأ المحور من 0. وإلا فاقرأ الأعداد.', 'Only if the axis starts at 0. Otherwise, read the numbers.')
        },
        check: {
            prompt: say('Barra batek beste batek baino bi aldiz gehiago neurtzen du, baina ardatza 50 zenbakian hasten da. Balioak 60 eta 70 dira. Bikoitza da?', 'Una barra mide el doble que otra, pero el eje empieza en 50. Los valores son 60 y 70. ¿Es el doble?', 'عمود طوله ضعف آخر، لكن المحور يبدأ من 50. والقيمتان 60 و70. هل هو الضعف؟', 'One bar is twice as long as another, but the axis starts at 50. The values are 60 and 70. Is it double?'),
            options: [say('Bai, bikoitza da', 'Sí, el doble', 'نعم، الضعف', 'Yes, double'), say('Ez: $\\frac{70}{60}\\approx 1{,}17$ aldiz bakarrik', 'No: solo $\\frac{70}{60}\\approx 1{,}17$ veces', 'لا: فقط $\\frac{70}{60}\\approx 1{,}17$ مرة', 'No: only $\\frac{70}{60}\\approx 1{,}17$ times'), say('Ez: erdia da', 'No: es la mitad', 'لا: إنه النصف', 'No: it is half')],
            correctIndex: 1,
            explanation: say('Ardatza zeroan hasten ez denez, barren altuerak ez du balioen arrazoia ematen: irakurri zenbakiak.', 'Como el eje no empieza en cero, la altura de las barras no da la razón de los valores: lee los números.', 'لأن المحور لا يبدأ من الصفر فطول العمودين لا يعطي نسبة القيمتين: اقرأ الأعداد.', 'As the axis does not start at zero, the heights of the bars do not give the ratio of the values: read the numbers.')
        }
    },
    mean: {
        mistake: {
            wrong: same('$\\bar{x}=\\frac{1+2+3}{3}=2$'),
            right: say('Taula batean balioak maiztasunez biderkatzen dira eta $N=10$ zenbakiaz zatitzen: $1{,}7$.', 'En una tabla los valores se multiplican por su frecuencia y se divide entre $N=10$: $1{,}7$.', 'في الجدول تُضرب القيم في تكراراتها ويُقسم على $N=10$: $1{,}7$.', 'In a table the values are multiplied by their frequencies and divided by $N=10$: $1{,}7$.')
        },
        check: {
            prompt: say('Taula: $x_{i}=0,\\,1,\\,2$ eta $f_{i}=5,\\,3,\\,2$. Zein da batez bestekoa?', 'Tabla: $x_{i}=0,\\,1,\\,2$ y $f_{i}=5,\\,3,\\,2$. ¿Cuál es la media?', 'جدول: $x_{i}=0,\\,1,\\,2$ و$f_{i}=5,\\,3,\\,2$. ما المتوسط؟', 'Table: $x_{i}=0,\\,1,\\,2$ and $f_{i}=5,\\,3,\\,2$. What is the mean?'),
            options: [same('$1$'), same('$0{,}7$'), same('$2{,}33$')],
            correctIndex: 1,
            explanation: say('Balio bakoitza bider bere maiztasuna, eta zati $N=10$: $\\frac{0+3+4}{10}=0{,}7$.', 'Cada valor por su frecuencia, y entre $N=10$: $\\frac{0+3+4}{10}=0{,}7$.', 'كل قيمة في تكرارها ثم القسمة على $N=10$: $\\frac{0+3+4}{10}=0{,}7$.', 'Each value times its frequency, divided by $N=10$: $\\frac{0+3+4}{10}=0{,}7$.')
        }
    },
    median: {
        mistake: {
            wrong: say('$7,\\ 2,\\ 9,\\ 4,\\ 6$ datuen mediana 9 da, erdian dagoelako.', 'La mediana de $7,\\ 2,\\ 9,\\ 4,\\ 6$ es 9, porque está en medio.', 'وسيط $7,\\ 2,\\ 9,\\ 4,\\ 6$ هو 9 لأنه في المنتصف.', 'The median of $7,\\ 2,\\ 9,\\ 4,\\ 6$ is 9, because it is in the middle.'),
            right: say('Lehenik ordenatu: $2,\\ 4,\\ 6,\\ 7,\\ 9$. Mediana 6 da.', 'Primero ordena: $2,\\ 4,\\ 6,\\ 7,\\ 9$. La mediana es 6.', 'رتّب أولًا: $2,\\ 4,\\ 6,\\ 7,\\ 9$. الوسيط 6.', 'Sort first: $2,\\ 4,\\ 6,\\ 7,\\ 9$. The median is 6.')
        },
        check: {
            prompt: say('Datuak: $8,\\ 1,\\ 6,\\ 3$. Zein da mediana?', 'Datos: $8,\\ 1,\\ 6,\\ 3$. ¿Cuál es la mediana?', 'البيانات: $8,\\ 1,\\ 6,\\ 3$. ما الوسيط؟', 'Data: $8,\\ 1,\\ 6,\\ 3$. What is the median?'),
            options: [same('$3{,}5$'), same('$4{,}5$'), same('$6$')],
            correctIndex: 1,
            explanation: say('Lehenik ordenatu: $1,\\ 3,\\ 6,\\ 8$. Lau datu: erdiko bien batez bestekoa, $\\frac{3+6}{2}=4{,}5$.', 'Primero ordena: $1,\\ 3,\\ 6,\\ 8$. Cuatro datos: la media de los dos centrales, $\\frac{3+6}{2}=4{,}5$.', 'رتّب أولًا: $1,\\ 3,\\ 6,\\ 8$. أربع قيم: متوسط الوسطيين $\\frac{3+6}{2}=4{,}5$.', 'Order them first: $1,\\ 3,\\ 6,\\ 8$. Four data: the mean of the two middle ones, $\\frac{3+6}{2}=4{,}5$.')
        }
    },
    mode: {
        mistake: {
            wrong: say('Moda 7 da, maiztasunik handiena delako.', 'La moda es 7, porque es la mayor frecuencia.', 'المنوال 7 لأنه أكبر تكرار.', 'The mode is 7, because it is the highest frequency.'),
            right: say('7 maiztasuna da; moda 39 neurria da, gehien errepikatzen dena.', '7 es la frecuencia; la moda es la talla 39, la que más se repite.', '7 هو التكرار؛ والمنوال هو المقاس 39 الأكثر تكرارًا.', '7 is the frequency; the mode is size 39, the one that repeats most.')
        },
        check: {
            prompt: say('4 ikaslek 12 urte dituzte, 9 ikaslek 13 eta 5 ikaslek 14. Zein da moda?', '4 alumnos tienen 12 años, 9 tienen 13 y 5 tienen 14. ¿Cuál es la moda?', '4 تلاميذ أعمارهم 12 سنة، و9 أعمارهم 13، و5 أعمارهم 14. ما المنوال؟', '4 students are 12, 9 are 13 and 5 are 14. What is the mode?'),
            options: [say('9', '9', '9', '9'), say('13 urte', '13 años', '13 سنة', '13 years'), say('14 urte', '14 años', '14 سنة', '14 years')],
            correctIndex: 1,
            explanation: say('9 maiztasuna da; moda gehien errepikatzen den adina da: 13 urte.', '9 es la frecuencia; la moda es la edad que más se repite: 13 años.', '9 هو التكرار، والمنوال هو العمر الأكثر تكرارًا: 13 سنة.', '9 is the frequency; the mode is the age that repeats most: 13.')
        }
    },
    'range-quartiles': {
        mistake: {
            wrong: say('Ibiltartea azken datua ken lehena da, ordenatu gabe: $7,\\ 2,\\ 9,\\ 4\\ \\to\\ 4-7$.', 'El recorrido es el último dato menos el primero, sin ordenar: $7,\\ 2,\\ 9,\\ 4\\ \\to\\ 4-7$.', 'المدى هو البيان الأخير ناقص الأول دون ترتيب: $7,\\ 2,\\ 9,\\ 4\\ \\to\\ 4-7$.', 'The range is the last datum minus the first, unsorted: $7,\\ 2,\\ 9,\\ 4\\ \\to\\ 4-7$.'),
            right: say('Handiena ken txikiena: $9-2=7$.', 'El mayor menos el menor: $9-2=7$.', 'الأكبر ناقص الأصغر: $9-2=7$.', 'The largest minus the smallest: $9-2=7$.')
        },
        check: {
            prompt: say('Datuak: $5,\\ 9,\\ 2,\\ 7$. Zein da ibiltartea?', 'Datos: $5,\\ 9,\\ 2,\\ 7$. ¿Cuál es el recorrido?', 'البيانات: $5,\\ 9,\\ 2,\\ 7$. ما المدى؟', 'Data: $5,\\ 9,\\ 2,\\ 7$. What is the range?'),
            options: [same('$2$'), same('$7$'), same('$4$')],
            correctIndex: 1,
            explanation: say('Handiena ken txikiena: $9-2=7$. 2 ateratzen da azkena ken lehena eginez, ordenatu gabe.', 'El mayor menos el menor: $9-2=7$. 2 sale de restar el último menos el primero sin ordenar.', 'الأكبر ناقص الأصغر: $9-2=7$. أما 2 فينتج عن طرح الأول من الأخير دون ترتيب.', 'The largest minus the smallest: $9-2=7$. 2 comes from the last minus the first without ordering.')
        }
    },
    'box-plot': {
        mistake: {
            wrong: say('Kutxaren erdiko marra batez bestekoa da.', 'La raya del medio de la caja es la media.', 'الخط الأوسط في الصندوق هو المتوسط.', 'The line in the middle of the box is the mean.'),
            right: say('Erdiko marra mediana da: datuen erdia haren alde bakoitzean.', 'La raya del medio es la mediana: la mitad de los datos a cada lado.', 'الخط الأوسط هو الوسيط: نصف البيانات على كل جانب.', 'The middle line is the median: half the data on each side.')
        },
        check: {
            prompt: say('Kutxa-diagrama batean, zer adierazten du kutxa barruko marrak?', 'En un diagrama de caja, ¿qué marca la raya de dentro de la caja?', 'في مخطط الصندوق، ماذا يمثّل الخط داخل الصندوق؟', 'In a box plot, what does the line inside the box show?'),
            options: [say('Batez bestekoa', 'La media', 'المتوسط', 'The mean'), say('Mediana', 'La mediana', 'الوسيط', 'The median'), say('Moda', 'La moda', 'المنوال', 'The mode')],
            correctIndex: 1,
            explanation: say('Erdiko marra mediana da: datuen erdia alde bakoitzean.', 'La raya del medio es la mediana: la mitad de los datos a cada lado.', 'الخط الأوسط هو الوسيط: نصف البيانات على كل جانب.', 'The middle line is the median: half the data on each side.')
        }
    },
    variance: {
        mistake: {
            wrong: say('Distantziak batu eta zatitu besterik ez: $(-4)+(-2)+0+2+4=0$, beraz ez dago sakabanaketarik.', 'Basta sumar las distancias y dividir: $(-4)+(-2)+0+2+4=0$, así que no hay dispersión.', 'يكفي جمع المسافات والقسمة: $(-4)+(-2)+0+2+4=0$، إذن لا تشتت.', 'Just add the distances and divide: $(-4)+(-2)+0+2+4=0$, so there is no spread.'),
            right: say('Distantziek elkar deuseztatzen dute; horregatik karratura igotzen dira lehenik.', 'Las distancias se anulan entre sí; por eso primero se elevan al cuadrado.', 'المسافات يلغي بعضها بعضًا؛ لذلك تُربَّع أولًا.', 'The distances cancel each other out; that is why they are squared first.')
        },
        check: {
            prompt: say('Zergatik ez da nahikoa batez bestekorako distantziak batzea?', '¿Por qué no basta con sumar las distancias a la media?', 'لماذا لا يكفي جمع المسافات عن المتوسط؟', 'Why is it not enough to add up the distances to the mean?'),
            options: [say('Positiboek eta negatiboek elkar ezeztatzen dutelako', 'Porque las positivas y las negativas se anulan', 'لأن الموجبة والسالبة تلغي بعضها', 'Because the positive and negative ones cancel out'), say('Luzeagoa delako', 'Porque es más largo', 'لأنه أطول', 'Because it takes longer'), say('Batez bestekoa aldatzen delako', 'Porque la media cambia', 'لأن المتوسط يتغير', 'Because the mean changes')],
            correctIndex: 0,
            explanation: say('Distantziek beti 0 batzen dute: horregatik karratura jasotzen dira lehenik.', 'Las distancias siempre suman 0: por eso primero se elevan al cuadrado.', 'مجموع المسافات صفر دائمًا: لذلك نربّعها أولًا.', 'The distances always add up to 0: that is why they are squared first.')
        }
    },
    events: {
        mistake: {
            wrong: say('«Bikoitia» eta «3 baino handiagoa» bateraezinak dira.', '«Par» y «mayor que 3» son incompatibles.', '«زوجي» و«أكبر من 3» متنافيان.', '«Even» and «greater than 3» are mutually exclusive.'),
            right: say('Biak gerta daitezke batera: 4 edo 6 ateratzen bada. Bateragarriak dira.', 'Pueden ocurrir a la vez: si sale 4 o 6. Son compatibles.', 'يمكن وقوعهما معًا: إذا ظهر 4 أو 6. فهما غير متنافيين.', 'They can happen together: if 4 or 6 comes up. They are not exclusive.')
        },
        check: {
            prompt: say('Dado batean, bateraezinak dira «5 atera» eta «bakoitia atera»?', 'En un dado, ¿son incompatibles «sale 5» y «sale impar»?', 'في النرد، هل الحدثان «يظهر 5» و«يظهر فردي» متنافيان؟', 'On a dice, are «5» and «odd» mutually exclusive?'),
            options: [say('Bai', 'Sí', 'نعم', 'Yes'), say('Ez: 5 ateratzen bada, biak gertatzen dira', 'No: si sale 5, ocurren los dos', 'لا: إذا ظهر 5 وقع الاثنان', 'No: if 5 comes up, both happen'), say('Batzuetan bakarrik', 'Solo a veces', 'أحيانًا فقط', 'Only sometimes')],
            correctIndex: 1,
            explanation: say('Aldi berean gerta daitezke: 5 bakoitia da. Bateragarriak dira.', 'Pueden ocurrir a la vez: el 5 es impar. Son compatibles.', 'يمكن أن يقعا معًا: 5 عدد فردي. فهما غير متنافيين.', 'They can happen together: 5 is odd. They are not mutually exclusive.')
        }
    },
    laplace: {
        mistake: {
            wrong: say('Bi dado: batura 7 izateko probabilitatea $\\frac{1}{11}$ da, 11 batura posible daudelako (2, 3… 12).', 'Dos dados: la probabilidad de sumar 7 es $\\frac{1}{11}$, porque hay 11 sumas posibles (de 2 a 12).', 'نردان: احتمال أن يكون المجموع 7 هو $\\frac{1}{11}$ لأن هناك 11 مجموعًا ممكنًا (من 2 إلى 12).', 'Two dice: the probability of a total of 7 is $\\frac{1}{11}$, because there are 11 possible totals (from 2 to 12).'),
            right: say('Baturek ez dute aukera bera. 36 emaitza berdin probable daude, eta horietako 6 emaitzak ematen dute 7: $\\frac{6}{36}=\\frac{1}{6}$.', 'Las sumas no son igual de probables. Hay 36 resultados igual de probables y 6 dan 7: $\\frac{6}{36}=\\frac{1}{6}$.', 'المجاميع ليست متساوية الاحتمال. هناك 36 نتيجة متساوية الاحتمال و6 منها تعطي 7: $\\frac{6}{36}=\\frac{1}{6}$.', 'The totals are not equally likely. There are 36 equally likely outcomes and 6 give 7: $\\frac{6}{36}=\\frac{1}{6}$.')
        },
        check: {
            prompt: say('Bi txanpon botatzean, zein da aurpegi bat eta gurutze bat ateratzeko probabilitatea?', 'Al lanzar dos monedas, ¿cuál es la probabilidad de sacar una cara y una cruz?', 'عند رمي قطعتي نقود، ما احتمال ظهور وجه وظهر؟', 'Throwing two coins, what is the probability of one heads and one tails?'),
            options: [same('$\\frac{1}{3}$'), same('$\\frac{1}{2}$'), same('$\\frac{1}{4}$')],
            correctIndex: 1,
            explanation: say('Lau emaitza berdin probable daude: AA, AG, GA eta GG. Bik balio dute: $\\frac{2}{4}=\\frac{1}{2}$.', 'Hay cuatro resultados igual de probables: CC, CX, XC y XX. Dos sirven: $\\frac{2}{4}=\\frac{1}{2}$.', 'هناك أربع نتائج متساوية الاحتمال، اثنتان منها ملائمتان: $\\frac{2}{4}=\\frac{1}{2}$.', 'There are four equally likely outcomes: HH, HT, TH and TT. Two work: $\\frac{2}{4}=\\frac{1}{2}$.')
        }
    },
    compound: {
        mistake: {
            wrong: same('$\\frac{3}{5}\\cdot\\frac{3}{5}=\\frac{9}{25}$'),
            right: say('Itzuli gabe, bigarren aldian 4 bola daude eta 2 gorri: $\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$.', 'Sin devolver, la segunda vez hay 4 bolas y 2 rojas: $\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$.', 'دون إرجاع تكون في المرة الثانية 4 كرات منها 2 حمراوان: $\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$.', 'Without putting back, the second time there are 4 balls and 2 red: $\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$.')
        },
        check: {
            prompt: say('Poltsa batean 4 bola zuri eta beltz bat daude. Bi ateratzen dira, itzuli gabe. Zein da biak zuriak izateko probabilitatea?', 'En una bolsa hay 4 bolas blancas y 1 negra. Se sacan dos sin devolver. ¿Cuál es la probabilidad de que las dos sean blancas?', 'في كيس 4 كرات بيضاء وكرة سوداء. نسحب اثنتين دون إرجاع. ما احتمال أن تكونا بيضاوين؟', 'A bag has 4 white balls and 1 black. Two are drawn without replacing. What is the probability that both are white?'),
            options: [same('$\\frac{16}{25}$'), same('$\\frac{3}{5}$'), same('$\\frac{4}{5}$')],
            correctIndex: 1,
            explanation: say('Itzuli gabe, bigarrenean 4 bola daude eta 3 zuri: $\\frac{4}{5}\\cdot\\frac{3}{4}=\\frac{3}{5}$.', 'Sin devolver, la segunda vez hay 4 bolas y 3 blancas: $\\frac{4}{5}\\cdot\\frac{3}{4}=\\frac{3}{5}$.', 'دون إرجاع تبقى في المرة الثانية 4 كرات منها 3 بيضاء: $\\frac{4}{5}\\cdot\\frac{3}{4}=\\frac{3}{5}$.', 'Without replacing, the second time there are 4 balls and 3 white: $\\frac{4}{5}\\cdot\\frac{3}{4}=\\frac{3}{5}$.')
        }
    }
}

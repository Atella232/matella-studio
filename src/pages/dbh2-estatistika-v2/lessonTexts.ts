import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { StatisticsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Estatistika eta probabilitatea · 2. DBH — what each lesson tells: the new
   words (definitions), a short explanation, its cases as cards and the
   example as an exercise («Another example»). Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics. Tables and
   charts are given in words; the example uses data of its own, never those
   of «Let's solve», of «Check it» or of the typical mistake. Percentages as
   in the lessons: «% 15», «15 %», «15%», «15 %», with a non-breaking space.
   English writes Med and MD for Me and DM. Histogram gets a «Let's solve»
   of its own here: drawing the heights of «Grouped data».
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

/** As in lessons.tsx, the Arabic formulas get a decimal point */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const statisticsLessonTexts: Record<StatisticsTopicId, LessonTexts> = {
    /* ---------- 1. Data and tables ---------- */
    sample: {
        vocabulary: [
            say('aldagai kualitatiboa', 'variable cualitativa', 'المتغير النوعي', 'qualitative variable'),
            say('aldagai kuantitatiboa', 'variable cuantitativa', 'المتغير الكمي', 'quantitative variable')
        ],
        definitions: [
            {
                term: say('Populazioa', 'Población', 'المجتمع', 'Population'),
                meaning: say('Aztertu nahi diren elementu guztiak.', 'Todos los elementos que se quieren estudiar.', 'كل العناصر التي نريد دراستها.', 'All the elements you want to study.')
            },
            {
                term: say('Lagina', 'Muestra', 'العيّنة', 'Sample'),
                meaning: say(
                    'Populazioa handia denean aztertzen den zatia. Adierazgarria izan behar du: zoriz aukeratua eta talde guztietatik.',
                    'La parte de la población que se estudia cuando es grande. Tiene que ser representativa: elegida al azar y de todos los grupos.',
                    'الجزء الذي ندرسه من المجتمع حين يكون كبيرًا. ويجب أن تكون ممثِّلة: مختارة عشوائيًا ومن كل الفئات.',
                    'The part of the population you study when it is large. It must be representative: chosen at random and from every group.'
                )
            }
        ],
        explanation: say(
            'Populazioa txikia bada (klase bat, talde bat), denei galdetzen zaie; handia bada (hiri bat), lagin bat hartzen da. Elementu bakoitzetik aztertzen dena aldagaia da, eta hiru motatakoa izan daiteke:',
            'Si la población es pequeña (una clase, un equipo), se pregunta a todos; si es grande (una ciudad), se toma una muestra. Lo que se estudia de cada elemento es una variable, y puede ser de tres tipos:',
            'إذا كان المجتمع صغيرًا (قسم، فريق) سألنا الجميع، وإذا كان كبيرًا (مدينة) أخذنا عيّنة. وما ندرسه في كل عنصر هو المتغير، وهو ثلاثة أنواع:',
            'If the population is small (a class, a team), you ask everyone; if it is large (a city), you take a sample. What you study about each element is a variable, and it can be of three kinds:'
        ),
        cases: [
            {
                title: say('Kualitatiboa', 'Cualitativa', 'نوعي', 'Qualitative'),
                text: say('Zenbakirik gabe: kolorea, kirol gogokoena.', 'Sin números: el color, el deporte favorito.', 'بلا أعداد: اللون، الرياضة المفضّلة.', 'Not numbers: a colour, a favourite sport.')
            },
            {
                title: say('Kuantitatibo diskretua', 'Cuantitativa discreta', 'كمي منفصل', 'Discrete quantitative'),
                text: say('Zenbatu egiten da: anai-arreba kopurua.', 'Se cuenta: el número de hermanos.', 'يُعَدّ: عدد الإخوة.', 'You count it: the number of brothers and sisters.')
            },
            {
                title: say('Kuantitatibo jarraitua', 'Cuantitativa continua', 'كمي متصل', 'Continuous quantitative'),
                text: say('Neurtu egiten da: altuera, denbora.', 'Se mide: la altura, el tiempo.', 'يُقاس: الطول، الزمن.', 'You measure it: height, time.')
            }
        ],
        examplePrompt: say(
            '600 ikasleko ikastetxe bateko ikasleek klasera iristeko behar duten denbora jakiteko, kurtso guztietako 60 ikasleri galdetzen zaie, zoriz aukeratuta.',
            'Para saber cuánto tarda en llegar a clase el alumnado de un instituto de 600 alumnos, se pregunta a 60 alumnos elegidos al azar de todos los cursos.',
            'لمعرفة الوقت الذي يستغرقه تلاميذ مدرسة فيها 600 تلميذ للوصول إلى القسم، سُئل 60 تلميذًا اختيروا عشوائيًا من كل المستويات.',
            'To find out how long the students at a school of 600 take to get to class, 60 students chosen at random from every year are asked.'
        ),
        example: '',
        exampleAnswer: say(
            'Populazioa: 600 ikasleak. Lagina: 60 ikasleak, zoriz eta kurtso guztietatik. Aldagaia: denbora, kuantitatibo jarraitua.',
            'Población: los 600 alumnos. Muestra: los 60, al azar y de todos los cursos. Variable: el tiempo, cuantitativa continua.',
            'المجتمع: التلاميذ الـ600. العيّنة: الـ60، عشوائيًا ومن كل المستويات. المتغير: الزمن، كمي متصل.',
            'Population: the 600 students. Sample: the 60, at random and from every year. Variable: time, continuous quantitative.'
        )
    },
    cumulative: {
        vocabulary: [
            say('maiztasuna', 'frecuencia', 'التكرار', 'frequency'),
            say('ordenatu', 'ordenar', 'ترتيب', 'order')
        ],
        definitions: [
            {
                term: say('Maiztasun absolutu metatua', 'Frecuencia absoluta acumulada', 'التكرار المطلق المتجمّع', 'Cumulative frequency'),
                meaning: say(
                    '$F_i$: balio bat edo txikiagoa duten datuak; haren maiztasuna eta aurrekoena batuta.',
                    '$F_i$: cuántos datos son iguales o menores que un valor; su frecuencia más las de los anteriores.',
                    '$F_i$: عدد البيانات التي تساوي قيمة ما أو تقلّ عنها؛ تكرارها مع تكرارات ما قبلها.',
                    '$F_i$: how many values are less than or equal to a value; its frequency plus those before it.'
                )
            },
            {
                term: say('Maiztasun erlatibo metatua', 'Frecuencia relativa acumulada', 'التكرار النسبي المتجمّع', 'Cumulative relative frequency'),
                meaning: say('$H_i$: $F_i$ zati datu kopurua, $N$.', '$H_i$: $F_i$ entre el número de datos, $N$.', '$H_i$: هو $F_i$ مقسومًا على عدد البيانات $N$.', '$H_i$: $F_i$ divided by the number of values, $N$.')
            }
        ],
        explanation: say(
            'Aldagai kuantitatibo batekin, balioak ordenatu eta hau galde daiteke: zenbat datu daude balio honetaraino? Maiztasun metatuek erantzuten dute. Azken $F_i$ beti $N$ da, eta azken $H_i$, 1.',
            'Con una variable cuantitativa, los valores se pueden ordenar y preguntar: ¿cuántos datos hay hasta este valor? Las frecuencias acumuladas responden. La última $F_i$ es siempre $N$, y la última $H_i$, 1.',
            'مع متغير كمي يمكن ترتيب القيم والسؤال: كم بيانًا يوجد حتى هذه القيمة؟ والتكرارات المتجمّعة تجيب. وآخر $F_i$ يساوي دائمًا $N$، وآخر $H_i$ يساوي 1.',
            'With a quantitative variable, the values can be put in order and you can ask: how many values are there up to this one? Cumulative frequencies answer. The last $F_i$ is always $N$, and the last $H_i$, 1.'
        ),
        examplePrompt: say(
            '25 ikasleren oinetako neurria: 36 → 5, 37 → 8, 38 → 9, 39 → 3. Zenbatek darabilte 37 edo txikiagoa?',
            'Talla de calzado de 25 alumnas: 36 → 5, 37 → 8, 38 → 9, 39 → 3. ¿Cuántas calzan un 37 o menos?',
            'مقاس حذاء 25 تلميذة: 36 ← 5، 37 ← 8، 38 ← 9، 39 ← 3. كم منهن مقاسها 37 أو أقل؟',
            'Shoe sizes of 25 students: 36 → 5, 37 → 8, 38 → 9, 39 → 3. How many wear a 37 or smaller?'
        ),
        example: same('$\\begin{gathered}F_2=5+8=13\\\\H_2=\\frac{13}{25}=0{,}52\\end{gathered}$'),
        exampleAnswer: say('13 ikasle, % 52.', '13 alumnas, el 52 %.', '13 تلميذة، أي 52 %.', '13 students, 52%.')
    },
    grouped: {
        vocabulary: [
            say('zabalera', 'amplitud', 'طول الفئة', 'width'),
            say('aldagai jarraitua', 'variable continua', 'المتغير المتصل', 'continuous variable')
        ],
        definitions: [
            {
                term: say('Tartea (klasea)', 'Intervalo (clase)', 'الفئة', 'Interval (class)'),
                meaning: say('Balio-zati bat. $[150,160)$ tartean 150 sartzen da, baina 160 ez.', 'Un tramo de valores. En $[150,160)$ entra el 150, pero no el 160.', 'مجال من القيم. في $[150,160)$ يدخل 150 ولا يدخل 160.', 'A stretch of values. $[150,160)$ includes 150, but not 160.')
            },
            {
                term: say('Klase-marka', 'Marca de clase', 'مركز الفئة', 'Class mark'),
                meaning: say('$x_i$: tartearen erdiko balioa, muturren batura zati 2.', '$x_i$: el valor central del intervalo, la suma de los extremos entre 2.', '$x_i$: القيمة الوسطى للفئة، مجموع الطرفين مقسومًا على 2.', '$x_i$: the middle value of the interval, the sum of its ends divided by 2.')
            }
        ],
        explanation: say(
            'Balio desberdin asko daudenean edo aldagaia jarraitua denean (altuera, denbora), datuak tartetan multzokatzen dira, normalean zabalera berekoak eta 5 eta 10 artean. Klase-markak bere tarteko datu guztiak ordezkatzen ditu, adibidez batez bestekoa kalkulatzeko.',
            'Cuando hay muchos valores distintos o la variable es continua (altura, tiempo), los datos se agrupan en intervalos, normalmente de la misma amplitud y entre 5 y 10. La marca de clase representa a todos los datos de su intervalo, por ejemplo para calcular la media.',
            'عندما تكثر القيم المختلفة أو يكون المتغير متصلًا (الطول، الزمن) تُبوَّب البيانات في فئات، عادةً بالطول نفسه وما بين 5 و10 فئات. ويمثّل مركز الفئة كل بيانات فئته، مثلًا لحساب المتوسط.',
            'When there are many different values or the variable is continuous (height, time), the data are grouped into intervals, usually of the same width and between 5 and 10 of them. The class mark stands for all the data in its interval, for example to work out the mean.'
        ),
        examplePrompt: say(
            '20 korrikalariren denborak (minututan): $[40,50)$ 5, $[50,60)$ 8, $[60,70)$ 7. Zein da erdiko tartearen klase-marka? Zenbatek behar dute 60 minutu baino gutxiago?',
            'Tiempos (en minutos) de 20 corredores: $[40,50)$ 5, $[50,60)$ 8, $[60,70)$ 7. ¿Cuál es la marca de clase del intervalo central? ¿Cuántos tardan menos de 60 minutos?',
            'أزمنة 20 عدّاءً (بالدقائق): $[40,50)$ 5، $[50,60)$ 8، $[60,70)$ 7. ما مركز الفئة الوسطى؟ وكم عدّاءً استغرق أقل من 60 دقيقة؟',
            'Times (in minutes) of 20 runners: $[40,50)$ 5, $[50,60)$ 8, $[60,70)$ 7. What is the class mark of the middle interval? How many take less than 60 minutes?'
        ),
        example: same('$\\begin{gathered}x_2=\\frac{50+60}{2}=55\\\\5+8=13\\end{gathered}$'),
        exampleAnswer: say(
            'Klase-marka 55 minutu da, eta 13 korrikalarik behar dute 60 minutu baino gutxiago: 60 ez dago $[50,60)$ tartean.',
            'La marca de clase es 55 minutos, y 13 corredores tardan menos de 60: el 60 no entra en $[50,60)$.',
            'مركز الفئة 55 دقيقة، و13 عدّاءً استغرقوا أقل من 60: لأن 60 لا يدخل في $[50,60)$.',
            'The class mark is 55 minutes, and 13 runners take less than 60: 60 is not in $[50,60)$.'
        )
    },

    /* ---------- 2. Charts ---------- */
    histogram: {
        vocabulary: [
            say('barra-diagrama', 'diagrama de barras', 'المخطط بالأعمدة', 'bar chart'),
            say('laukizuzenak', 'rectángulos', 'المستطيلات', 'rectangles')
        ],
        definitions: [
            {
                term: say('Histograma', 'Histograma', 'المدرّج التكراري', 'Histogram'),
                meaning: say('Laukizuzen itsatsiak, bat tarte bakoitzeko: oinarria tartea da, eta altuera haren maiztasuna.', 'Rectángulos pegados, uno por intervalo: la base es el intervalo y la altura, su frecuencia.', 'مستطيلات متلاصقة، واحد لكل فئة: قاعدته الفئة وارتفاعه تكرارها.', 'Rectangles side by side, one per interval: the base is the interval and the height, its frequency.')
            },
            {
                term: say('Maiztasun-poligonoa', 'Polígono de frecuencias', 'المضلّع التكراري', 'Frequency polygon'),
                meaning: say('Laukizuzen bakoitzaren goiko erdiko puntuak lotzen dituen lerroa, klase-marken gainean.', 'La línea que une los puntos de arriba de cada rectángulo, sobre las marcas de clase.', 'الخط الذي يصل النقاط العليا لكل مستطيل فوق مراكز الفئات.', 'The line joining the points on top of each rectangle, above the class marks.')
            }
        ],
        explanation: say(
            'Barra-diagraman ez bezala, histograman laukizuzenak itsatsita doaz, aldagaia jarraitua delako. Poligonoa ardatzeraino ixten da normalean, alde bakoitzean tarte huts bat gehituta. Maiztasun metatuekin, poligonoa beti gorantz doa eta $N$ balioan amaitzen da.',
            'A diferencia del diagrama de barras, en el histograma los rectángulos van pegados, porque la variable es continua. El polígono se suele cerrar hasta el eje con un intervalo vacío a cada lado. Con las frecuencias acumuladas, el polígono siempre sube y termina en $N$.',
            'خلافًا لمخطط الأعمدة تكون مستطيلات المدرّج التكراري متلاصقة، لأن المتغير متصل. وعادةً يُغلَق المضلّع حتى المحور بإضافة فئة فارغة في كل جهة. ومع التكرارات المتجمّعة يصعد المضلّع دائمًا وينتهي عند $N$.',
            'Unlike a bar chart, the rectangles of a histogram touch, because the variable is continuous. The polygon is usually closed off at the axis with an empty interval at each end. With cumulative frequencies, the polygon always goes up and ends at $N$.'
        ),
        problem: say(
            'Irudikatu histograma batean 30 ikasleren altuerak (cm): $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6, eta marraztu maiztasun-poligonoa.',
            'Representa en un histograma las alturas (cm) de 30 alumnos: $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6, y dibuja su polígono de frecuencias.',
            'مثّل في مدرّج تكراري أطوال 30 تلميذًا (سم): $[140,150)$ 3، $[150,160)$ 9، $[160,170)$ 12، $[170,180)$ 6، وارسم المضلّع التكراري.',
            'Draw a histogram of the heights (cm) of 30 students: $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6, and draw its frequency polygon.'
        ),
        examplePrompt: say(
            '$[0,4)$, $[4,8)$ eta $[8,12)$ tarteen maiztasunak 6, 10 eta 4 dira. Zer altuera du laukizuzen bakoitzak, eta zein puntu lotzen ditu poligonoak?',
            'Los intervalos $[0,4)$, $[4,8)$ y $[8,12)$ tienen frecuencias 6, 10 y 4. ¿Qué altura tiene cada rectángulo y qué puntos une el polígono?',
            'تكرارات الفئات $[0,4)$ و$[4,8)$ و$[8,12)$ هي 6 و10 و4. ما ارتفاع كل مستطيل، وما النقاط التي يصلها المضلّع؟',
            'The intervals $[0,4)$, $[4,8)$ and $[8,12)$ have frequencies 6, 10 and 4. How tall is each rectangle, and which points does the polygon join?'
        ),
        example: same('$(2,6),\\ (6,10),\\ (10,4)$'),
        exampleAnswer: say(
            'Laukizuzenek 6, 10 eta 4 dituzte altueran; poligonoak 2, 6 eta 10 klase-marken gaineko puntuak lotzen ditu.',
            'Los rectángulos miden 6, 10 y 4 de alto; el polígono une los puntos sobre las marcas de clase 2, 6 y 10.',
            'ارتفاعات المستطيلات 6 و10 و4، ويصل المضلّع النقاط فوق مراكز الفئات 2 و6 و10.',
            'The rectangles are 6, 10 and 4 high; the polygon joins the points above the class marks 2, 6 and 10.'
        )
    },
    pie: {
        vocabulary: [
            say('angelua', 'ángulo', 'الزاوية', 'angle'),
            say('sektorea', 'sector', 'القطاع', 'sector'),
            say('zirkulua', 'círculo', 'الدائرة', 'circle')
        ],
        definitions: [
            {
                term: say('Sektore-diagrama', 'Diagrama de sectores', 'المخطط الدائري', 'Pie chart'),
                meaning: say('Sektoreetan banatutako zirkulua: zirkulu osoa (360°) datu guztiak dira, eta sektore bakoitza zati bat.', 'Un círculo repartido en sectores: el círculo entero (360°) son todos los datos, y cada sector, una parte.', 'دائرة مقسّمة إلى قطاعات: الدائرة كاملة (360°) هي كل البيانات، وكل قطاع جزء منها.', 'A circle split into sectors: the whole circle (360°) is all the data, and each sector, a part.')
            }
        ],
        explanation: say(
            'Sektore bakoitzaren angelua bere maiztasunarekiko proportzionala da: $h_i\\cdot 360^{\\circ}$. Ehunekoekin, zirkuluaren % 1 3,6° da. Alderantziz, angelua zati 360° maiztasun erlatiboa da. Diagrama honek osoaren zatiak konparatzeko balio du, ez balio asko daudenean.',
            'El ángulo de cada sector es proporcional a su frecuencia: $h_i\\cdot 360^{\\circ}$. Con porcentajes, el 1 % del círculo son 3,6°. Al revés, el ángulo entre 360° da la frecuencia relativa. Este diagrama sirve para comparar partes de un total, no cuando hay muchos valores.',
            'زاوية كل قطاع تتناسب مع تكراره: $h_i\\cdot 360^{\\circ}$. ومع النسب المئوية يكون 1 % من الدائرة 3.6°. وبالعكس، الزاوية مقسومة على 360° تعطي التكرار النسبي. يصلح هذا المخطط لمقارنة أجزاء الكل، لا عندما تكثر القيم.',
            'The angle of each sector is proportional to its frequency: $h_i\\cdot 360^{\\circ}$. With percentages, 1% of the circle is 3.6°. The other way round, the angle divided by 360° gives the relative frequency. This chart is for comparing the parts of a whole, not for many different values.'
        ),
        examplePrompt: say(
            '80 pertsonari egindako inkesta batean, sektore batek 54° ditu. Datuen zer ehuneko da? Zenbat pertsona dira?',
            'En una encuesta a 80 personas, un sector mide 54°. ¿Qué porcentaje de los datos es? ¿Cuántas personas son?',
            'في استطلاع شمل 80 شخصًا قياس أحد القطاعات 54°. ما النسبة المئوية التي يمثّلها؟ وكم شخصًا هم؟',
            'In a survey of 80 people, one sector measures 54°. What percentage of the data is it? How many people are they?'
        ),
        example: same('$\\begin{gathered}\\frac{54}{360}=0{,}15\\\\0{,}15\\cdot 80=12\\end{gathered}$'),
        exampleAnswer: say('Datuen % 15 da: 12 pertsona.', 'Es el 15 % de los datos: 12 personas.', 'إنه 15 % من البيانات: 12 شخصًا.', 'It is 15% of the data: 12 people.')
    },
    misleading: {
        vocabulary: [
            say('eskala', 'escala', 'المقياس', 'scale'),
            say('ardatzak', 'ejes', 'المحاور', 'axes'),
            say('tranpa', 'trampa', 'الفخ', 'trap')
        ],
        explanation: say(
            'Grafiko batek engaina dezake, nahita edo ez. Irakurtzean, begiratu beti eskala, ardatzak eta unitateak, eta kalkulatu benetako aldaketa. Tranpa ohikoenak:',
            'Un gráfico puede engañar, a propósito o no. Al leerlo, mira siempre la escala, los ejes y las unidades, y calcula el cambio real. Las trampas más habituales:',
            'قد يضلّل التمثيل البياني عمدًا أو دون قصد. عند قراءته انظر دائمًا إلى المقياس والمحاور والوحدات، واحسب التغيّر الحقيقي. أكثر الفخاخ شيوعًا:',
            'A chart can mislead, on purpose or not. When you read it, always look at the scale, the axes and the units, and work out the real change. The most common traps:'
        ),
        examplePrompt: say(
            'Barra-grafiko batean, web baten bisitak 4000 ziren eta orain 4400 dira, eta ardatz bertikala 3800 balioan hasten da. Zenbat igo dira benetan?',
            'Un gráfico de barras muestra que las visitas a una web pasan de 4000 a 4400, y el eje vertical empieza en 3800. ¿Cuánto han subido de verdad?',
            'يُظهر مخطط أعمدة أن زيارات موقع ارتفعت من 4000 إلى 4400، والمحور الرأسي يبدأ من 3800. كم ارتفعت فعلًا؟',
            'A bar chart shows a website\'s visits going from 4,000 to 4,400, and the vertical axis starts at 3,800. How much have they really gone up?'
        ),
        example: same('$\\frac{400}{4000}=0{,}1$'),
        exampleAnswer: say('% 10 bakarrik, nahiz eta barrak hirukoitza dirudien.', 'Solo un 10 %, aunque la barra parezca el triple.', '10 % فقط، وإن بدا العمود ثلاثة أضعاف.', 'Only 10%, even though the bar looks three times as tall.')
    },

    /* ---------- 3. Centre and spread ---------- */
    'mean-table': {
        vocabulary: [
            say('batez bestekoa', 'media', 'المتوسط', 'mean'),
            say('zutabea', 'columna', 'العمود', 'column')
        ],
        why: {
            text: say(
                '3 balioa 4 aldiz agertzen bada, lau aldiz batzea biderkatzea bezala da: $3+3+3+3=3\\cdot 4$. Horregatik, datu guztiak idatzi beharrean, balio bakoitza bere maiztasunaz biderkatzen da eta biderkadurak batzen dira.',
                'Si el valor 3 aparece 4 veces, sumarlo cuatro veces es lo mismo que multiplicarlo: $3+3+3+3=3\\cdot 4$. Por eso, en vez de escribir todos los datos, se multiplica cada valor por su frecuencia y se suman los productos.',
                'إذا ظهرت القيمة 3 أربع مرات فجمعها أربع مرات يساوي ضربها: $3+3+3+3=3\\cdot 4$. لذلك بدل كتابة كل البيانات نضرب كل قيمة في تكرارها ونجمع النواتج.',
                'If the value 3 appears 4 times, adding it four times is the same as multiplying: $3+3+3+3=3\\cdot 4$. That is why, instead of writing out all the data, you multiply each value by its frequency and add the products.'
            )
        },
        explanation: say(
            'Batez bestekoa ($\\bar{x}$) datuen batura zati datu kopurua da. Taula batean, biderkatu balio bakoitza bere maiztasunarekin zutabe berri batean, batu zutabea eta zatitu $N$-z: $\\bar{x}=\\frac{\\sum x_i f_i}{N}$. Datu multzokatuekin, $x_i$ klase-marka da, eta batez bestekoa hurbildua ateratzen da.',
            'La media ($\\bar{x}$) es la suma de los datos entre el número de datos. En una tabla, multiplica cada valor por su frecuencia en una columna nueva, suma la columna y divide entre $N$: $\\bar{x}=\\frac{\\sum x_i f_i}{N}$. Con datos agrupados, $x_i$ es la marca de clase y la media sale aproximada.',
            'المتوسط ($\\bar{x}$) هو مجموع البيانات مقسومًا على عددها. في الجدول اضرب كل قيمة في تكرارها في عمود جديد، واجمع العمود، واقسم على $N$: $\\bar{x}=\\frac{\\sum x_i f_i}{N}$. ومع البيانات المبوّبة يكون $x_i$ مركز الفئة ويخرج المتوسط تقريبيًا.',
            'The mean ($\\bar{x}$) is the sum of the data divided by the number of values. In a table, multiply each value by its frequency in a new column, add up the column and divide by $N$: $\\bar{x}=\\frac{\\sum x_i f_i}{N}$. With grouped data, $x_i$ is the class mark and the mean comes out approximate.'
        ),
        examplePrompt: say(
            'Talde bateko jokalarien adinak: 13 urte → 4 jokalari, 14 → 7, 15 → 9. Zein da batez bestekoa?',
            'Edades de un equipo: 13 años → 4 jugadores, 14 → 7, 15 → 9. ¿Cuál es la media?',
            'أعمار لاعبي فريق: 13 سنة ← 4 لاعبين، 14 ← 7، 15 ← 9. ما المتوسط؟',
            'Ages in a team: 13 years → 4 players, 14 → 7, 15 → 9. What is the mean?'
        ),
        example: same('$\\begin{aligned}\\bar{x}&=\\frac{13\\cdot 4+14\\cdot 7+15\\cdot 9}{20}\\\\&=\\frac{285}{20}=14{,}25\\end{aligned}$'),
        exampleAnswer: say('Batez bestekoa 14,25 urte da. Datu kopurua: $4+7+9=20$.', 'La media es 14,25 años. El número de datos: $4+7+9=20$.', 'المتوسط 14.25 سنة. وعدد البيانات: $4+7+9=20$.', 'The mean is 14.25 years. The number of values: $4+7+9=20$.')
    },
    'median-table': {
        vocabulary: [
            say('erdiko posizioa', 'posición central', 'الموقع الأوسط', 'middle position'),
            say('bakoitia', 'impar', 'فردي', 'odd'),
            say('bikoitia', 'par', 'زوجي', 'even')
        ],
        definitions: [
            {
                term: say('Moda', 'Moda', 'المنوال', 'Mode'),
                meaning: say('Maiztasun handieneko balioa. Bi berdinduta badaude, banaketa bimodala da.', 'El valor con mayor frecuencia. Si empatan dos, la distribución es bimodal.', 'القيمة ذات التكرار الأكبر. وإذا تساوت قيمتان كان التوزيع ثنائي المنوال.', 'The value with the highest frequency. If two tie, the distribution is bimodal.')
            },
            {
                term: say('Mediana', 'Mediana', 'الوسيط', 'Median'),
                meaning: say('Datuak ordenatuta erdian geratzen den balioa.', 'El valor que queda en el centro con los datos ordenados.', 'القيمة التي تبقى في الوسط بعد ترتيب البيانات.', 'The value in the middle when the data are in order.')
            }
        ],
        explanation: say(
            'Taula batean ez dago datuak idatzi beharrik: kalkulatu erdiko postua eta bilatu $F_i$ zutabean. $N$ bakoitia bada, $\\frac{N+1}{2}$ postua da; bikoitia bada, mediana $\\frac{N}{2}$ postuko eta hurrengoko datuen batez bestekoa da.',
            'En una tabla no hace falta escribir los datos: calcula la posición central y búscala en la columna de $F_i$. Si $N$ es impar, es la posición $\\frac{N+1}{2}$; si es par, la mediana es la media de los datos de las posiciones $\\frac{N}{2}$ y la siguiente.',
            'في الجدول لا حاجة لكتابة البيانات: احسب الموقع الأوسط وابحث عنه في عمود $F_i$. إذا كان $N$ فرديًا فهو الموقع $\\frac{N+1}{2}$، وإذا كان زوجيًا فالوسيط متوسط البيانين في الموقع $\\frac{N}{2}$ والذي يليه.',
            'In a table you do not need to write out the data: work out the middle position and find it in the $F_i$ column. If $N$ is odd, it is position $\\frac{N+1}{2}$; if it is even, the median is the mean of the values in position $\\frac{N}{2}$ and the next one.'
        ),
        examplePrompt: say(
            '11 ikasleren notak: 5 → 4, 6 → 1, 7 → 3, 8 → 3. Aurkitu mediana eta moda.',
            'Notas de 11 alumnos: 5 → 4, 6 → 1, 7 → 3, 8 → 3. Halla la mediana y la moda.',
            'علامات 11 تلميذًا: 5 ← 4، 6 ← 1، 7 ← 3، 8 ← 3. أوجد الوسيط والمنوال.',
            'Marks of 11 students: 5 → 4, 6 → 1, 7 → 3, 8 → 3. Find the median and the mode.'
        ),
        example: same('$\\frac{11+1}{2}=6$'),
        exampleAnswer: say(
            'Metatuak: 4, 5, 8, 11. 6. datua 7 bat da: mediana 7 da. Moda 5 da, maiztasun handiena duelako.',
            'Acumuladas: 4, 5, 8, 11. El 6.º dato es un 7: la mediana es 7. La moda es 5, la de mayor frecuencia.',
            'المتجمّعة: 4، 5، 8، 11. البيان السادس 7: فالوسيط 7. والمنوال 5، صاحب التكرار الأكبر.',
            'Cumulative: 4, 5, 8, 11. The 6th value is a 7: the median is 7. The mode is 5, the most frequent.'
        )
    },
    symmetry: {
        vocabulary: [
            say('asimetrikoa', 'asimétrica', 'غير متماثل', 'asymmetric'),
            say('muturreko balioa', 'valor extremo', 'القيمة المتطرفة', 'extreme value')
        ],
        definitions: [
            {
                term: say('Banaketa simetrikoa', 'Distribución simétrica', 'التوزيع المتماثل', 'Symmetric distribution'),
                meaning: say('Haren grafikoa erdiko lerro batekiko ispilu bat bezalakoa da; batez bestekoa eta mediana oso hurbil daude.', 'Su gráfico es como un espejo respecto a una línea central; la media y la mediana están muy cerca.', 'تمثيله كالمرآة بالنسبة إلى خط في الوسط، والمتوسط والوسيط متقاربان جدًا.', 'Its graph is like a mirror image across a central line; the mean and the median are very close.')
            }
        ],
        why: {
            text: say(
                'Batez bestekoak datu bakoitzaren tamaina erabiltzen du; medianak, haren posizioa bakarrik. 2, 3 eta 4 datuekin, biek 3 balio dute. 4 datua 40 bihurtzen bada, batez bestekoa 15 izatera igotzen da, baina mediana 3 da oraindik: erdiko datua ez da aldatu.',
                'La media usa el tamaño de cada dato; la mediana, solo su posición. Con 2, 3 y 4, las dos valen 3. Si el 4 se convierte en 40, la media sube a 15, pero la mediana sigue siendo 3: el dato del centro no ha cambiado.',
                'المتوسط يستعمل قيمة كل معطى، أما الوسيط فموقعه فقط. مع 2 و3 و4 يساوي كلاهما 3. وإذا صار 4 هو 40 ارتفع المتوسط إلى 15، لكن الوسيط يبقى 3: فالمعطى الذي في الوسط لم يتغير.',
                'The mean uses the size of every value; the median, only its position. With 2, 3 and 4, both are 3. If the 4 becomes 40, the mean goes up to 15, but the median is still 3: the value in the middle has not changed.'
            ),
            math: same('$\\begin{gathered}\\frac{2+3+4}{3}=3\\\\\\frac{2+3+40}{3}=15\\end{gathered}$')
        },
        explanation: say(
            'Banaketa asimetrikoa denean, batez bestekoa alde luzeenera mugitzen da, mediana baino gehiago. Muturreko balio bakar batek, oso handia edo oso txikia, batez bestekoa asko alda dezake, baina mediana ia ez: orduan mediana da ordezkari hobea.',
            'Cuando la distribución es asimétrica, la media se desplaza hacia el lado más largo, más que la mediana. Un solo valor extremo, muy grande o muy pequeño, puede cambiar mucho la media, pero casi nada la mediana: entonces la mediana representa mejor.',
            'عندما يكون التوزيع غير متماثل ينزاح المتوسط نحو الجهة الأطول أكثر من الوسيط. وقيمة متطرفة واحدة، كبيرة جدًا أو صغيرة جدًا، قد تغيّر المتوسط كثيرًا لكنها لا تكاد تغيّر الوسيط: عندئذ يمثّل الوسيط أفضل.',
            'When the distribution is asymmetric, the mean moves towards the longer side, more than the median. A single extreme value, very large or very small, can change the mean a lot but the median hardly at all: then the median represents the data better.'
        ),
        examplePrompt: say(
            'Sei ikaslek azterketa egiteko behar izan duten denbora (minututan): 30, 32, 33, 35, 36 eta 90. Batez bestekoa ala mediana?',
            'Tiempos (en minutos) de seis alumnos en hacer un examen: 30, 32, 33, 35, 36 y 90. ¿Media o mediana?',
            'أزمنة ستة تلاميذ في إنجاز امتحان (بالدقائق): 30، 32، 33، 35، 36 و90. المتوسط أم الوسيط؟',
            'Times (in minutes) six students took to do an exam: 30, 32, 33, 35, 36 and 90. Mean or median?'
        ),
        example: same('$\\begin{gathered}\\bar{x}=\\frac{256}{6}\\approx 42{,}67\\\\\\frac{33+35}{2}=34\\end{gathered}$'),
        exampleAnswer: say(
            '90 balioak batez bestekoa arrastatzen du, 42,7 min ingurura; medianak, 34 min, hobeto ordezkatzen du taldea.',
            'El 90 arrastra la media, unos 42,7 min; la mediana, 34 min, representa mejor al grupo.',
            'يجرّ الـ90 المتوسط إلى نحو 42.7 دقيقة؛ أما الوسيط، 34 دقيقة، فيمثّل المجموعة أفضل.',
            'The 90 drags the mean up to about 42.7 min; the median, 34 min, represents the group better.'
        )
    },
    deviation: {
        vocabulary: [
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value'),
            say('batez bestekoa', 'media', 'المتوسط', 'mean')
        ],
        definitions: [
            {
                term: say('Ibiltartea', 'Recorrido', 'المدى', 'Range'),
                meaning: say('Daturik handiena ken txikiena.', 'El dato mayor menos el menor.', 'أكبر بيان ناقص أصغره.', 'The largest value minus the smallest.')
            },
            {
                term: say('Batez besteko desbideratzea', 'Desviación media', 'الانحراف المتوسط', 'Mean deviation'),
                meaning: say('Datu bakoitzetik batez bestekora dagoen distantzien batez bestekoa. Zenbat eta txikiagoa, orduan eta bilduago datuak.', 'La media de las distancias de cada dato a la media. Cuanto menor, más agrupados están los datos.', 'متوسط مسافات كل بيان عن المتوسط. وكلما صغر كانت البيانات أكثر تجمّعًا.', 'The mean of the distances from each value to the mean. The smaller it is, the closer together the data are.')
            }
        ],
        why: {
            text: say(
                'Batez bestekoaren gaineko eta azpiko distantziak beti orekatzen dira: 2, 4 eta 9 datuekin batez bestekoa 5 da, eta $-3-1+4=0$. Zeinuak kenduko ez balira, batura 0 izango litzateke edozein taldetan. Horregatik, batez besteko desbideratzeak balio absolutuak erabiltzen ditu.',
                'Las distancias a la media por encima y por debajo siempre se compensan: con 2, 4 y 9 la media es 5, y $-3-1+4=0$. Si no se quitaran los signos, la suma daría 0 en cualquier grupo. Por eso la desviación media usa valores absolutos.',
                'فروق البيانات عن المتوسط فوقه وتحته تتعادل دائمًا: مع 2 و4 و9 يكون المتوسط 5، و$-3-1+4=0$. ولو لم نحذف الإشارات لكان المجموع 0 في أي مجموعة. لذلك يستعمل الانحراف المتوسط القيم المطلقة.',
                'The distances above and below the mean always balance out: with 2, 4 and 9 the mean is 5, and $-3-1+4=0$. Without removing the signs, the sum would be 0 for any group. That is why the mean deviation uses absolute values.'
            ),
            math: same('$|2-5|+|4-5|+|9-5|=3+1+4=8$')
        },
        explanation: say(
            'Bi talderen batez bestekoa berdina izan daiteke eta datuak oso modu desberdinean banatuta egon. Ibiltartea azkarra da, baina bi datu bakarrik begiratzen ditu; batez besteko desbideratzeak denak hartzen ditu kontuan: $\\text{DM}=\\frac{\\sum |x_i-\\bar{x}|\\cdot f_i}{N}$. Distantziak beti positiboak dira.',
            'Dos grupos pueden tener la misma media y los datos repartidos de forma muy distinta. El recorrido es rápido, pero solo mira dos datos; la desviación media los tiene en cuenta todos: $\\text{DM}=\\frac{\\sum |x_i-\\bar{x}|\\cdot f_i}{N}$. Las distancias son siempre positivas.',
            'قد يكون لمجموعتين المتوسط نفسه وتكون بياناتهما موزعة بطريقة مختلفة جدًا. المدى سريع لكنه لا ينظر إلا إلى بيانين، أما الانحراف المتوسط فيأخذها كلها في الحسبان: $\\text{DM}=\\frac{\\sum |x_i-\\bar{x}|\\cdot f_i}{N}$. والمسافات موجبة دائمًا.',
            'Two groups can have the same mean with their data spread out very differently. The range is quick, but it only looks at two values; the mean deviation takes them all into account: $\\text{MD}=\\frac{\\sum |x_i-\\bar{x}|\\cdot f_i}{N}$. The distances are always positive.'
        ),
        examplePrompt: say('Aurkitu 1, 4, 6, 8 eta 11 datuen ibiltartea eta batez besteko desbideratzea.', 'Halla el recorrido y la desviación media de 1, 4, 6, 8 y 11.', 'أوجد المدى والانحراف المتوسط للبيانات 1 و4 و6 و8 و11.', 'Find the range and the mean deviation of 1, 4, 6, 8 and 11.'),
        example: {
            eu: '$\\begin{gathered}11-1=10\\\\\\bar{x}=\\frac{30}{5}=6\\\\\\text{DM}=\\frac{5+2+0+2+5}{5}=2{,}8\\end{gathered}$',
            es: '$\\begin{gathered}11-1=10\\\\\\bar{x}=\\frac{30}{5}=6\\\\\\text{DM}=\\frac{5+2+0+2+5}{5}=2{,}8\\end{gathered}$',
            en: '$\\begin{gathered}11-1=10\\\\\\bar{x}=\\frac{30}{5}=6\\\\\\text{MD}=\\frac{5+2+0+2+5}{5}=2{,}8\\end{gathered}$',
            ar: '$\\begin{gathered}11-1=10\\\\\\bar{x}=\\frac{30}{5}=6\\\\\\text{DM}=\\frac{5+2+0+2+5}{5}=2.8\\end{gathered}$'
        },
        exampleAnswer: say('Ibiltartea 10 da, eta batez besteko desbideratzea 2,8. Distantziak: 5, 2, 0, 2, 5.', 'Recorrido 10 y desviación media 2,8. Las distancias: 5, 2, 0, 2, 5.', 'المدى 10 والانحراف المتوسط 2.8. والمسافات: 5، 2، 0، 2، 5.', 'Range 10 and mean deviation 2.8. The distances: 5, 2, 0, 2, 5.')
    },
    quartiles: {
        vocabulary: [
            say('erdia', 'mitad', 'النصف', 'half'),
            say('mediana', 'mediana', 'الوسيط', 'median')
        ],
        definitions: [
            {
                term: say('Kuartilak', 'Cuartiles', 'الربيعيات', 'Quartiles'),
                meaning: say(
                    'Datu ordenatuak lau zatitan banatzen dituzte: $Q_1$ azpian % 25 dago; $Q_2$ azpian (mediana), % 50; $Q_3$ azpian, % 75.',
                    'Dividen los datos ordenados en cuatro partes: por debajo de $Q_1$ está el 25 %; de $Q_2$ (la mediana), el 50 %; de $Q_3$, el 75 %.',
                    'تقسم البيانات المرتّبة إلى أربعة أجزاء: تحت $Q_1$ يقع 25 %، وتحت $Q_2$ (الوسيط) 50 %، وتحت $Q_3$ 75 %.',
                    'They divide the ordered data into four parts: 25% lie below $Q_1$; 50% below $Q_2$ (the median); 75% below $Q_3$.'
                )
            }
        ],
        explanation: say(
            'Kalkulatzeko, ordenatu datuak eta aurkitu mediana. Gero, $Q_1$ beheko erdiaren mediana da, eta $Q_3$ goikoarena; $N$ bakoitia bada, mediana bera ez da erdietan sartzen. $Q_1$ eta $Q_3$ artean erdiko datuen % 50 dago.',
            'Para calcularlos, ordena los datos y halla la mediana. Después, $Q_1$ es la mediana de la mitad inferior y $Q_3$ la de la superior; si $N$ es impar, la propia mediana no entra en las mitades. Entre $Q_1$ y $Q_3$ está el 50 % central.',
            'لحسابها رتّب البيانات وأوجد الوسيط. ثم $Q_1$ هو وسيط النصف الأدنى و$Q_3$ وسيط النصف الأعلى؛ وإذا كان $N$ فرديًا لا يدخل الوسيط نفسه في النصفين. وبين $Q_1$ و$Q_3$ يقع 50 % الأوسط.',
            'To work them out, order the data and find the median. Then $Q_1$ is the median of the lower half and $Q_3$ that of the upper half; if $N$ is odd, the median itself is left out of both halves. The middle 50% lies between $Q_1$ and $Q_3$.'
        ),
        examplePrompt: say('Aurkitu kuartilak: 2, 4, 5, 7, 10, 11, 16, 20.', 'Halla los cuartiles de: 2, 4, 5, 7, 10, 11, 16, 20.', 'أوجد ربيعيات: 2، 4، 5، 7، 10، 11، 16، 20.', 'Find the quartiles of: 2, 4, 5, 7, 10, 11, 16, 20.'),
        example: same('$\\begin{gathered}Q_1=\\frac{4+5}{2}=4{,}5\\\\Q_2=\\frac{7+10}{2}=8{,}5\\\\Q_3=\\frac{11+16}{2}=13{,}5\\end{gathered}$'),
        exampleAnswer: say('8 datu daude, bikoitia: kuartil bakoitza bi daturen batez bestekoa da.', 'Hay 8 datos, un número par: cada cuartil es la media de dos datos.', 'عدد البيانات 8، وهو زوجي: كل ربيع متوسط بيانين.', 'There are 8 values, an even number: each quartile is the mean of two values.')
    },
    'box-plot': {
        vocabulary: [
            say('kutxa', 'caja', 'الصندوق', 'box'),
            say('sakabanatuta', 'dispersos', 'متشتتة', 'spread out'),
            say('bilduta', 'agrupados', 'متجمّعة', 'close together')
        ],
        definitions: [
            {
                term: say('Kutxa-diagrama', 'Diagrama de caja y bigotes', 'مخطط الصندوق', 'Box plot'),
                meaning: say(
                    'Bost balio laburtzen ditu: txikiena, $Q_1$, mediana, $Q_3$ eta handiena. Kutxa $Q_1$-etik $Q_3$-ra doa, marra bat medianan duela.',
                    'Resume cinco valores: mínimo, $Q_1$, mediana, $Q_3$ y máximo. La caja va de $Q_1$ a $Q_3$, con una raya en la mediana.',
                    'يلخّص خمس قيم: الأصغر و$Q_1$ والوسيط و$Q_3$ والأكبر. يمتد الصندوق من $Q_1$ إلى $Q_3$ وفيه خط عند الوسيط.',
                    'It summarises five values: minimum, $Q_1$, median, $Q_3$ and maximum. The box goes from $Q_1$ to $Q_3$, with a line at the median.'
                )
            }
        ],
        explanation: say(
            'Lau zatietako bakoitzean datuen % 25 dago, nahiz eta luzera desberdina izan: zati laburra bada, datuak bilduta daude; luzea bada, sakabanatuta. Bi talde konparatzeko balio du: bi kutxa eskala beraren gainean.',
            'En cada una de las cuatro partes está el 25 % de los datos, aunque midan distinto: si una parte es corta, los datos están agrupados; si es larga, dispersos. Sirve para comparar dos grupos: dos cajas sobre la misma escala.',
            'في كل جزء من الأجزاء الأربعة 25 % من البيانات، وإن اختلفت أطوالها: إذا كان الجزء قصيرًا فالبيانات متجمّعة، وإذا كان طويلًا فهي متشتتة. ويفيد في مقارنة مجموعتين: صندوقان فوق المقياس نفسه.',
            'Each of the four parts holds 25% of the data, even if they have different lengths: if a part is short, the data are close together; if it is long, they are spread out. It is useful for comparing two groups: two boxes on the same scale.'
        ),
        examplePrompt: say(
            'Klub bateko adinak: txikiena 8, $Q_1=11$, mediana 13, $Q_3=14$, handiena 20. Non daude datuak bilduen? Zer ehunekok ditu 14 urte baino gehiago?',
            'Edades en un club: mínimo 8, $Q_1=11$, mediana 13, $Q_3=14$, máximo 20. ¿Dónde están más agrupados los datos? ¿Qué porcentaje tiene más de 14 años?',
            'أعمار أعضاء نادٍ: الأصغر 8، $Q_1=11$، الوسيط 13، $Q_3=14$، الأكبر 20. أين تتجمّع البيانات أكثر؟ وما نسبة من تزيد أعمارهم على 14 سنة؟',
            'Ages in a club: minimum 8, $Q_1=11$, median 13, $Q_3=14$, maximum 20. Where are the data closest together? What percentage is over 14?'
        ),
        example: same('$\\begin{gathered}14-13=1\\\\20-14=6\\end{gathered}$'),
        exampleAnswer: say(
            'Bilduenak mediana eta $Q_3$ artean daude (urte 1); datuen % 25 dira 14 urtetik gorakoak.',
            'Lo más agrupado está entre la mediana y $Q_3$ (1 año); el 25 % tiene más de 14 años.',
            'أكثر البيانات تجمّعًا بين الوسيط و$Q_3$ (سنة واحدة)؛ و25 % أعمارهم أكثر من 14 سنة.',
            'The closest together are between the median and $Q_3$ (1 year); 25% are over 14.'
        )
    },

    /* ---------- 4. Probability ---------- */
    events: {
        vocabulary: [
            say('probabilitatea', 'probabilidad', 'الاحتمال', 'probability'),
            say('Laplaceren erregela', 'regla de Laplace', 'قاعدة لابلاس', 'Laplace\'s rule'),
            say('dadoa', 'dado', 'حجر النرد', 'dice')
        ],
        definitions: [
            {
                term: say('Gertaera', 'Suceso', 'الحدث', 'Event'),
                meaning: say('Lagin-espazioaren azpimultzo bat: emaitza bat edo gehiago.', 'Un subconjunto del espacio muestral: uno o varios resultados.', 'مجموعة جزئية من فضاء العيّنة: نتيجة واحدة أو أكثر.', 'A subset of the sample space: one or more outcomes.')
            },
            {
                term: say('Aurkako gertaera', 'Suceso contrario', 'الحدث المعاكس', 'Complementary event'),
                meaning: say('$\\bar{A}$: A gertatzen ez denean gertatzen dena. Biek batera lagin-espazio osoa osatzen dute.', '$\\bar{A}$: lo que ocurre cuando no ocurre A. Entre los dos forman todo el espacio muestral.', '$\\bar{A}$: ما يقع عندما لا يقع A. ويكوّنان معًا فضاء العيّنة كله.', '$\\bar{A}$: what happens when A does not. Together they make up the whole sample space.')
            }
        ],
        explanation: say(
            'Horregatik, $P(\\bar{A})=1-P(A)$. Dado edo txanpon zuzen batekin, emaitza guztiek aukera bera dute, eta Laplaceren erregelak balio du. Txintxeta batekin, ez: probabilitatea esperimentatuz estimatzen da, askotan errepikatuta, maiztasun erlatiboarekin.',
            'Por eso $P(\\bar{A})=1-P(A)$. Con un dado o una moneda correctos, todos los resultados tienen la misma posibilidad y vale la regla de Laplace. Con una chincheta, no: la probabilidad se estima experimentando muchas veces, con la frecuencia relativa.',
            'لذلك $P(\\bar{A})=1-P(A)$. مع نرد أو قطعة نقود سليمين لكل النتائج الإمكان نفسه، وتصح قاعدة لابلاس. أما مع الدبوس فلا: يُقدَّر الاحتمال بالتجريب مرات كثيرة، بالتكرار النسبي.',
            'That is why $P(\\bar{A})=1-P(A)$. With a fair die or coin, all the outcomes are equally likely and Laplace\'s rule works. With a drawing pin, it does not: the probability is estimated by experimenting many times, with the relative frequency.'
        ),
        examplePrompt: say(
            'Dado bat jaurtitzen da. A = «3 baino gutxiago ateratzea». Zenbat balio dute $P(A)$ eta $P(\\bar{A})$?',
            'Se lanza un dado. A = «sacar menos de 3». ¿Cuánto valen $P(A)$ y $P(\\bar{A})$?',
            'يُرمى نرد. A = «الحصول على أقل من 3». كم تساوي $P(A)$ و$P(\\bar{A})$؟',
            'A die is rolled. A = “rolling less than 3”. What are $P(A)$ and $P(\\bar{A})$?'
        ),
        example: same('$\\begin{gathered}P(A)=\\frac{2}{6}=\\frac{1}{3}\\\\P(\\bar{A})=1-\\frac{1}{3}=\\frac{2}{3}\\end{gathered}$'),
        exampleAnswer: say('$\\bar{A}$ «3 edo gehiago ateratzea» da: 3, 4, 5 edo 6.', '$\\bar{A}$ es «sacar 3 o más»: 3, 4, 5 o 6.', '$\\bar{A}$ هو «الحصول على 3 أو أكثر»: 3 أو 4 أو 5 أو 6.', '$\\bar{A}$ is “rolling 3 or more”: 3, 4, 5 or 6.')
    },
    tree: {
        vocabulary: [
            say('emaitza', 'resultado', 'النتيجة', 'outcome'),
            say('txanpona', 'moneda', 'قطعة النقود', 'coin'),
            say('esperimentua', 'experimento', 'التجربة', 'experiment')
        ],
        definitions: [
            {
                term: say('Zuhaitz-diagrama', 'Diagrama de árbol', 'المخطط الشجري', 'Tree diagram'),
                meaning: say('Urrats bakoitzeko emaitza bakoitzetik hurrengo urratsaren adar guztiak ateratzen diren marrazkia. Adar-amaiera bakoitza emaitza bat da.', 'Un dibujo en el que, de cada resultado de un paso, salen todas las ramas del siguiente. Cada final de rama es un resultado.', 'رسم تخرج فيه من كل نتيجة لخطوة كل فروع الخطوة التالية. وكل نهاية فرع نتيجة.', 'A drawing where all the branches of the next step come out of each outcome of a step. Each branch end is an outcome.')
            }
        ],
        explanation: say(
            'Esperimentu batek hainbat urrats dituenean, emaitzarik ez ahazteko balio du. Bi txanponekin 4 emaitza daude, ez 3: «aurpegi bat eta gurutze bat» bi aldiz ateratzen da. Bi dadorekin hobe da $6\\cdot 6=36$ gelaxkako taula. Gero, Laplaceren erregela.',
            'Sirve para no olvidar ningún resultado cuando un experimento tiene varios pasos. Con dos monedas hay 4 resultados, no 3: «una cara y una cruz» sale dos veces. Con dos dados es mejor una tabla de $6\\cdot 6=36$ casillas. Después, la regla de Laplace.',
            'يفيد كي لا ننسى أي نتيجة عندما تكون للتجربة عدة خطوات. مع قطعتي نقود هناك 4 نتائج لا 3: «وجه وظهر» تظهر مرتين. ومع نردين يكون الجدول ذو $6\\cdot 6=36$ خانة أفضل. ثم قاعدة لابلاس.',
            'It stops you forgetting any outcome when an experiment has several steps. With two coins there are 4 outcomes, not 3: “one head and one tail” comes up twice. With two dice, a table of $6\\cdot 6=36$ cells is better. Then, Laplace\'s rule.'
        ),
        examplePrompt: say(
            'Dado bat eta txanpon bat jaurtitzen dira. Zein da aurpegia eta zenbaki bikoiti bat ateratzeko probabilitatea?',
            'Se lanzan un dado y una moneda. ¿Cuál es la probabilidad de sacar cara y un número par?',
            'يُرمى نرد وقطعة نقود. ما احتمال الحصول على وجه وعدد زوجي؟',
            'A die and a coin are thrown. What is the probability of getting heads and an even number?'
        ),
        example: same('$\\begin{gathered}2\\cdot 6=12\\\\\\frac{3}{12}=\\frac{1}{4}\\end{gathered}$'),
        exampleAnswer: say('12 emaitza daude, eta 3 dira aldekoak: aurpegia eta 2, 4 edo 6.', 'Hay 12 resultados y 3 favorables: cara con 2, 4 o 6.', 'هناك 12 نتيجة، منها 3 ملائمة: وجه مع 2 أو 4 أو 6.', 'There are 12 outcomes and 3 favourable ones: heads with 2, 4 or 6.')
    },
    'double-table': {
        vocabulary: [
            say('gelaxka', 'casilla', 'الخانة', 'cell'),
            say('errenkada', 'fila', 'الصف', 'row'),
            say('zutabea', 'columna', 'العمود', 'column')
        ],
        definitions: [
            {
                term: say('Sarrera bikoitzeko taula', 'Tabla de doble entrada', 'الجدول ذو المدخلين', 'Two-way table'),
                meaning: say('Banakoak bi ezaugarriren arabera sailkatzen ditu: bata errenkadetan eta bestea zutabeetan, guztizkoak amaieran.', 'Clasifica a los individuos según dos características: una en las filas y otra en las columnas, con los totales al final.', 'يصنّف الأفراد حسب خاصيتين: إحداهما في الأسطر والأخرى في الأعمدة، والمجاميع في الآخر.', 'It sorts individuals by two characteristics: one in the rows and the other in the columns, with the totals at the end.')
            }
        ],
        explanation: say(
            'Gelaxka bakoitzak bi ezaugarriak batera dituztenak zenbatzen ditu. Hutsuneak betetzeko, erabili errenkaden eta zutabeen baturak. Probabilitate batean, kontuz kasu posibleekin: «gaixorik dagoela jakinda» esateak esan nahi du posibleak gaixoak bakarrik direla.',
            'Cada casilla cuenta los que tienen las dos características a la vez. Para rellenar huecos, usa las sumas de filas y columnas. En una probabilidad, cuidado con los casos posibles: «sabiendo que está enfermo» quiere decir que los posibles son solo los enfermos.',
            'كل خانة تعدّ من يجمعون الخاصيتين معًا. لملء الفراغات استعمل مجاميع الأسطر والأعمدة. وفي الاحتمال انتبه إلى الحالات الممكنة: «علمًا أنه مريض» يعني أن الممكنة هي المرضى فقط.',
            'Each cell counts those with both characteristics at once. To fill in gaps, use the row and column totals. In a probability, be careful with the possible cases: “given that it is sick” means the possible ones are only the sick ones.'
        ),
        examplePrompt: say(
            'Kiroldegi batean 30 bazkide daude: 10 neskak eta 8 mutilek igeri egiten dute; 5 neskak eta 7 mutilek ez. Igeri egiten duela jakinda, zein da mutila izateko probabilitatea?',
            'En un polideportivo hay 30 socios: 10 chicas y 8 chicos nadan; 5 chicas y 7 chicos, no. Sabiendo que nada, ¿qué probabilidad hay de que sea chico?',
            'في مركز رياضي 30 عضوًا: 10 فتيات و8 فتيان يسبحون، و5 فتيات و7 فتيان لا يسبحون. علمًا أنه يسبح، ما احتمال أن يكون فتى؟',
            'A sports centre has 30 members: 10 girls and 8 boys swim; 5 girls and 7 boys do not. Given that a member swims, what is the probability of it being a boy?'
        ),
        example: same('$\\begin{gathered}10+8=18\\\\\\frac{8}{18}=\\frac{4}{9}\\end{gathered}$'),
        exampleAnswer: say('Kasu posibleak igeri egiten duten 18 bazkideak dira: $\\frac{4}{9}\\approx 0{,}44$.', 'Los casos posibles son los 18 que nadan: $\\frac{4}{9}\\approx 0{,}44$.', 'الحالات الممكنة هي الـ18 الذين يسبحون: $\\frac{4}{9}\\approx 0{,}44$.', 'The possible cases are the 18 who swim: $\\frac{4}{9}\\approx 0{,}44$.')
    }
}

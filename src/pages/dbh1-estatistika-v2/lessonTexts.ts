import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { StatisticsIntroTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Estatistika · 1. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, the example as an exercise («Another example», or «Example»
   in the lessons of facts) and, in three lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. The explanation keeps the numbers that its drawing shows (the
   sports survey: football 8, basketball 5, swimming 4, pelota 3; the
   temperatures 14 to 21; the die); the drawings of the pie chart and of
   the mean showed «Let's solve» solved and wait after the steps. Lessons
   about kinds and words give their example in words only. The example uses
   numbers of its own, never those of «Let's solve», of «Check it» or of the
   typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const statisticsIntroLessonTexts: Record<StatisticsIntroTopicId, LessonTexts> = {
    /* ---------- 1. Data ---------- */
    study: {
        vocabulary: [
            say('inkesta', 'encuesta', 'الاستبيان', 'survey'),
            say('datuak', 'datos', 'البيانات', 'data'),
            say('ondorioak', 'conclusiones', 'الاستنتاجات', 'conclusions')
        ],
        definitions: [
            {
                term: say('Populazioa eta lagina', 'Población y muestra', 'المجتمع والعيّنة', 'Population and sample'),
                meaning: say('Populazioa aztertu nahi diren banako guztiak dira; lagina, galdetzen zaien zatia.', 'La población son todos los individuos que se quieren estudiar; la muestra, la parte a la que se pregunta.', 'المجتمع هو كل الأفراد الذين نريد دراستهم؛ والعيّنة هي الجزء الذي نسأله.', 'The population is all the individuals you want to study; the sample, the part you ask.')
            },
            {
                term: say('Banakoa', 'Individuo', 'الفرد', 'Individual'),
                meaning: say('Populazioaren elementu bakoitza.', 'Cada elemento de la población.', 'كل عنصر من عناصر المجتمع.', 'Each member of the population.')
            }
        ],
        explanation: say(
            'Estatistikak datuak bildu, antolatu eta interpretatzen ditu. Azterketa batek urrats batzuk ditu: zer aztertu erabaki, datuak inkesta batekin bildu, taula batean ordenatu, grafiko batean marraztu eta ondorioak atera. Laginak populazioa ondo ordezkatu behar du, marrazkian bezala.',
            'La estadística recoge, organiza e interpreta datos. Un estudio sigue unos pasos: decidir qué estudiar, recoger los datos con una encuesta, ordenarlos en una tabla, dibujarlos en un gráfico y sacar conclusiones. La muestra tiene que representar bien a la población, como en el dibujo.',
            'الإحصاء يجمع البيانات وينظّمها ويفسّرها. وللدراسة خطوات: نحدد ما ندرسه، ونجمع البيانات باستبيان، ونرتّبها في جدول، ونرسمها في مخطط، ونستخلص الاستنتاجات. ويجب أن تمثّل العيّنة المجتمع جيدًا، كما في الرسم.',
            'Statistics collects, organises and interprets data. A study follows some steps: decide what to study, collect the data with a survey, put them in a table, draw them in a chart and draw conclusions. The sample has to represent the population well, as in the drawing.'
        ),
        examplePrompt: say('Udal batek bere 8000 gazteek zenbat ordu kirol egiten duten jakin nahi du, eta 300 gazteri galdetzen die. Zein da populazioa, eta zein lagina?', 'Un ayuntamiento quiere saber cuántas horas de deporte hacen sus 8000 jóvenes, y pregunta a 300. ¿Cuál es la población y cuál la muestra?', 'تريد بلدية أن تعرف عدد ساعات الرياضة لدى شبابها الـ8000، فتسأل 300 منهم. ما المجتمع وما العيّنة؟', 'A town council wants to know how many hours of sport its 8,000 young people do, and asks 300. Which is the population and which the sample?'),
        example: '',
        exampleAnswer: say('Populazioa: 8000 gazteak. Lagina: galdetzen zaien 300 gazteak. Gazte bakoitza banako bat da.', 'Población: los 8000 jóvenes. Muestra: los 300 a los que se pregunta. Cada joven es un individuo.', 'المجتمع: الشباب الـ8000. العيّنة: الـ300 الذين نسألهم. وكل شاب فرد.', 'Population: the 8,000 young people. Sample: the 300 who are asked. Each young person is an individual.')
    },
    variables: {
        vocabulary: [
            say('kualitatiboa', 'cualitativa', 'نوعي', 'qualitative'),
            say('kuantitatiboa', 'cuantitativa', 'كمي', 'quantitative'),
            say('tartea', 'intervalo', 'المجال', 'interval')
        ],
        definitions: [
            {
                term: say('Aldagai estatistikoa', 'Variable estadística', 'المتغير الإحصائي', 'Statistical variable'),
                meaning: say('Banako bakoitzean aztertzen den ezaugarria.', 'La característica que se estudia en cada individuo.', 'الخاصية التي ندرسها في كل فرد.', 'The feature studied in each individual.')
            }
        ],
        explanation: say(
            'Aldagai bat kualitatiboa da zenbakiekin adierazten ez bada, eta kuantitatiboa zenbaki bat bada: diskretua, zenbatu egiten bada eta balio solteak hartzen baditu, eta jarraitua, neurtu egiten bada eta tarte bateko edozein balio har badezake.',
            'Una variable es cualitativa si no se expresa con números, y cuantitativa si es un número: discreta si se cuenta y toma valores sueltos, y continua si se mide y puede tomar cualquier valor de un intervalo.',
            'يكون المتغير نوعيًا إذا لم يُعبَّر عنه بأعداد، وكميًا إذا كان عددًا: متقطعًا إذا كان يُعدّ ويأخذ قيمًا منفصلة، ومتصلًا إذا كان يُقاس ويأخذ أي قيمة في مجال.',
            'A variable is qualitative if it is not expressed with numbers, and quantitative if it is a number: discrete if it is counted and takes separate values, and continuous if it is measured and can take any value in an interval.'
        ),
        examplePrompt: say('Nolakoak dira aldagai hauek: maskota kopurua, institutura iristeko denbora eta jotzen duzun musika-tresna?', '¿De qué tipo son estas variables: el número de mascotas, el tiempo en llegar al instituto y el instrumento que tocas?', 'ما نوع هذه المتغيرات: عدد الحيوانات الأليفة، والزمن اللازم للوصول إلى المدرسة، والآلة الموسيقية التي تعزف عليها؟', 'What kind of variables are these: the number of pets, the time it takes to get to school and the instrument you play?'),
        example: '',
        exampleAnswer: say('Maskotak: kuantitatibo diskretua (zenbatu egiten da). Denbora: jarraitua (neurtu egiten da). Musika-tresna: kualitatiboa.', 'Mascotas: cuantitativa discreta (se cuenta). Tiempo: continua (se mide). Instrumento: cualitativa.', 'الحيوانات الأليفة: كمي متقطع (يُعدّ). الزمن: متصل (يُقاس). الآلة: نوعي.', 'Pets: discrete (counted). Time: continuous (measured). Instrument: qualitative.')
    },

    /* ---------- 2. Tables ---------- */
    frequencies: {
        vocabulary: [
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage'),
            say('datu kopurua', 'número de datos', 'عدد البيانات', 'number of data'),
            say('errepikatu', 'se repite', 'التكرار', 'repeat')
        ],
        definitions: [
            {
                term: say('Maiztasun absolutua eta erlatiboa', 'Frecuencia absoluta y relativa', 'التكرار المطلق والنسبي', 'Absolute and relative frequency'),
                meaning: say('Absolutua ($f_{i}$) datu bat zenbat aldiz errepikatzen den da; erlatiboa ($h_{i}$), absolutua zati datu kopurua ($N$).', 'La absoluta ($f_{i}$) es cuántas veces se repite un dato; la relativa ($h_{i}$), la absoluta entre el número de datos ($N$).', 'المطلق ($f_{i}$) عدد مرات تكرار القيمة؛ والنسبي ($h_{i}$) المطلق مقسومًا على عدد البيانات ($N$).', 'The absolute ($f_{i}$) is how many times a value repeats; the relative ($h_{i}$), the absolute divided by the number of data ($N$).')
            }
        ],
        explanation: say(
            'Maiztasun absolutu guztien batura datu kopurua da, $N$. Maiztasun erlatiboa 0 eta 1 artean dago, eta 100 zenbakiaz biderkatuta ehunekoa ematen du. Erlatibo guztiek 1 batzen dute, eta ehunekoek, 100.',
            'La suma de todas las frecuencias absolutas es el número de datos, $N$. La frecuencia relativa está entre 0 y 1, y multiplicada por 100 da el porcentaje. Todas las relativas suman 1, y los porcentajes, 100.',
            'مجموع كل التكرارات المطلقة هو عدد البيانات $N$. والتكرار النسبي بين 0 و1، وإذا ضربناه في 100 أعطى النسبة المئوية. ومجموع كل التكرارات النسبية 1، ومجموع النسب المئوية 100.',
            'All the absolute frequencies add up to the number of data, $N$. The relative frequency is between 0 and 1, and multiplied by 100 it gives the percentage. All the relative ones add up to 1, and the percentages to 100.'
        ),
        examplePrompt: say('Dado bat 25 aldiz jaurti da, eta 6 zenbakia 4 aldiz atera da. Zein da haren maiztasun erlatiboa? Eta ehunekoa?', 'En 25 lanzamientos de un dado, el 6 ha salido 4 veces. ¿Cuál es su frecuencia relativa? ¿Y el porcentaje?', 'في 25 رمية لنرد ظهر العدد 6 أربع مرات. ما تكراره النسبي؟ وما النسبة المئوية؟', 'In 25 rolls of a die, the 6 came up 4 times. What is its relative frequency? And the percentage?'),
        example: same('$\\begin{gathered}h=\\frac{4}{25}=0{,}16\\\\0{,}16\\cdot 100=16\\end{gathered}$'),
        exampleAnswer: say('Maiztasun absolutua 4 da, eta erlatiboa $0{,}16$: aldien %\u00a016.', 'Frecuencia absoluta 4, relativa $0{,}16$: el 16\u00a0% de las veces.', 'التكرار المطلق 4 والنسبي $0{,}16$: أي 16٪ من المرات.', 'Absolute frequency 4, relative $0{,}16$: 16% of the time.')
    },
    table: {
        vocabulary: [
            say('marrak', 'palotes', 'الخطوط', 'tally marks'),
            say('zutabea', 'columna', 'العمود', 'column'),
            say('taula', 'tabla', 'الجدول', 'table')
        ],
        explanation: say(
            'Datuak antolatzeko, idatzi balio desberdin bakoitza zutabe batean, eta zenbatu zenbat aldiz agertzen den (marrekin errazagoa da). Gero, kalkulatu maiztasun erlatiboak eta ehunekoak, marrazkiko kirolen taulan bezala. Amaieran, egiaztatu $f_{i}$ maiztasunek $N$ batzen dutela.',
            'Para organizar los datos, escribe cada valor distinto en una columna y cuenta cuántas veces aparece (con palotes es más fácil). Después, calcula las frecuencias relativas y los porcentajes, como en la tabla de deportes del dibujo. Al final, comprueba que las $f_{i}$ suman $N$.',
            'لتنظيم البيانات اكتب كل قيمة مختلفة في عمود وعُدّ مرات ظهورها (بالخطوط أسهل). ثم احسب التكرارات النسبية والنسب المئوية، كما في جدول الرياضات في الرسم. وفي النهاية تحقّق من أن مجموع $f_{i}$ هو $N$.',
            'To organise the data, write each different value in a column and count how many times it appears (tally marks make it easier). Then work out the relative frequencies and the percentages, as in the sports table in the drawing. At the end, check that the $f_{i}$ add up to $N$.'
        ),
        examplePrompt: say('Azterketa bateko notak: 6, 8, 5, 6, 7, 8, 6, 9. Egin maiztasun absolutuen taula.', 'Notas de un examen: 6, 8, 5, 6, 7, 8, 6, 9. Haz la tabla de frecuencias absolutas.', 'علامات امتحان: 6، 8، 5، 6، 7، 8، 6، 9. اصنع جدول التكرارات المطلقة.', 'Marks in a test: 6, 8, 5, 6, 7, 8, 6, 9. Make the table of absolute frequencies.'),
        example: same('$\\begin{gathered}5\\to 1\\quad 6\\to 3\\quad 7\\to 1\\\\8\\to 2\\quad 9\\to 1\\\\1+3+1+2+1=8\\end{gathered}$'),
        exampleAnswer: say('$f_{i}$ maiztasunek 8 batzen dute, nota kopurua.', 'Las $f_{i}$ suman 8, el número de notas.', 'مجموع $f_{i}$ هو 8، أي عدد العلامات.', 'The $f_{i}$ add up to 8, the number of marks.')
    },

    /* ---------- 3. Charts ---------- */
    'bar-chart': {
        vocabulary: [
            say('ardatza', 'eje', 'المحور', 'axis'),
            say('eskala', 'escala', 'المقياس', 'scale'),
            say('altuera', 'altura', 'الارتفاع', 'height')
        ],
        explanation: say(
            'Barra-diagrama batean balio bakoitzak barra bat du, eta haren altuera maiztasuna da: marrazkian, futbola 8, saskibaloia 5, igeriketa 4 eta pilota 3. Balioak ardatz horizontalean doaz, eta maiztasunak bertikalean. Aldagai kualitatibo eta diskretuetarako balio du.',
            'En un diagrama de barras cada valor tiene una barra, y su altura es la frecuencia: en el dibujo, fútbol 8, baloncesto 5, natación 4 y pelota 3. Los valores van en el eje horizontal y las frecuencias en el vertical. Sirve para variables cualitativas y discretas.',
            'في مخطط الأعمدة لكل قيمة عمود، وارتفاعه هو التكرار: في الرسم كرة القدم 8، وكرة السلة 5، والسباحة 4، والبيلوتا 3. والقيم على المحور الأفقي والتكرارات على العمودي. ويصلح للمتغيرات النوعية والمتقطعة.',
            'In a bar chart each value has a bar, and its height is the frequency: in the drawing, football 8, basketball 5, swimming 4 and pelota 3. The values go on the horizontal axis and the frequencies on the vertical one. It works for qualitative and discrete variables.'
        ),
        examplePrompt: say('Maskoten inkesta batean, 12 txakur, 7 katu eta 3 arrain atera dira. Zenbat laukitxo da barra bakoitza, laukitxo bat 2 boto badira?', 'En una encuesta de mascotas salen 12 perros, 7 gatos y 3 peces. ¿Cuántos cuadraditos mide cada barra si uno vale 2 votos?', 'في استبيان عن الحيوانات الأليفة: 12 كلبًا و7 قطط و3 أسماك. كم مربعًا صغيرًا ارتفاع كل عمود إذا كان المربع يساوي صوتين؟', 'A pet survey gives 12 dogs, 7 cats and 3 fish. How many squares tall is each bar if one square is worth 2 votes?'),
        example: same('$\\begin{gathered}12\\mathbin{:}2=6\\qquad 7\\mathbin{:}2=3{,}5\\\\3\\mathbin{:}2=1{,}5\\end{gathered}$'),
        exampleAnswer: say('Txakurrak, 6 laukitxo; katuak, 3,5; arrainak, 1,5. Barrarik altuena txakurrena da.', 'Perros, 6 cuadraditos; gatos, 3,5; peces, 1,5. La barra más alta es la de los perros.', 'الكلاب 6 مربعات، والقطط 3.5، والأسماك 1.5. وأعلى عمود هو عمود الكلاب.', 'Dogs, 6 squares; cats, 3.5; fish, 1.5. The tallest bar is the dogs\' one.')
    },
    'pie-chart': {
        vocabulary: [
            say('sektorea', 'sector', 'القطاع', 'sector'),
            say('angelua', 'ángulo', 'الزاوية', 'angle'),
            say('osoa', 'total', 'الكل', 'whole')
        ],
        explanation: say(
            'Sektore-diagrama batek oso baten zatiak erakusten ditu, tarta bat bezala: zirkulu osoa, $360^{\\circ}$, datu guztiak dira. Sektore bakoitzaren angelua haren maiztasunarekiko proportzionala da: $h_{i}\\cdot 360^{\\circ}$.',
            'Un diagrama de sectores muestra las partes de un total, como una tarta: el círculo completo, $360^{\\circ}$, son todos los datos. El ángulo de cada sector es proporcional a su frecuencia: $h_{i}\\cdot 360^{\\circ}$.',
            'المخطط الدائري يبيّن أجزاء الكل مثل الكعكة: الدائرة الكاملة $360^{\\circ}$ هي كل البيانات. وزاوية كل قطاع متناسبة مع تكراره: $h_{i}\\cdot 360^{\\circ}$.',
            'A pie chart shows the parts of a whole, like a cake: the whole circle, $360^{\\circ}$, is all the data. The angle of each sector is proportional to its frequency: $h_{i}\\cdot 360^{\\circ}$.'
        ),
        examplePrompt: say('40 ikasleko bozketa batean, 14 ikaslek museoa aukeratzen dute. Zenbat gradu neurtzen ditu haren sektoreak?', 'En una votación de 40 alumnos, 14 eligen el museo. ¿Cuántos grados mide su sector?', 'في تصويت بين 40 طالبًا اختار 14 المتحف. كم درجة قياس قطاعه؟', 'In a vote of 40 pupils, 14 choose the museum. How many degrees is its sector?'),
        example: same('$360\\mathbin{:}40\\cdot 14=126$'),
        exampleAnswer: say('Ikasle bakoitzak $9^{\\circ}$ balio du: sektoreak $126^{\\circ}$ neurtzen ditu.', 'Cada alumno vale $9^{\\circ}$: el sector mide $126^{\\circ}$.', 'كل طالب يساوي $9^{\\circ}$: قياس القطاع $126^{\\circ}$.', 'Each pupil is worth $9^{\\circ}$: the sector is $126^{\\circ}$.'),
        why: {
            text: say(
                'Zirkulu osoa datu guztiak dira. Aukera bati datuen herena badagokio, zirkuluaren herena ere badagokio: $\\frac{1}{3}\\cdot 360^{\\circ}=120^{\\circ}$. Horregatik biderkatzen da maiztasun erlatiboa $360^{\\circ}$-rekin.',
                'El círculo entero son todos los datos. Si a una opción le toca la tercera parte de los datos, le toca la tercera parte del círculo: $\\frac{1}{3}\\cdot 360^{\\circ}=120^{\\circ}$. Por eso la frecuencia relativa se multiplica por $360^{\\circ}$.',
                'الدائرة الكاملة هي كل البيانات. فإذا كان لخيار ثلث البيانات كان له ثلث الدائرة: $\\frac{1}{3}\\cdot 360^{\\circ}=120^{\\circ}$. لذلك نضرب التكرار النسبي في $360^{\\circ}$.',
                'The whole circle is all the data. If an option gets a third of the data, it gets a third of the circle: $\\frac{1}{3}\\cdot 360^{\\circ}=120^{\\circ}$. That is why the relative frequency is multiplied by $360^{\\circ}$.'
            )
        }
    },
    'line-chart': {
        vocabulary: [
            say('denbora', 'tiempo', 'الزمن', 'time'),
            say('igo', 'subir', 'يصعد', 'go up'),
            say('jaitsi', 'bajar', 'ينزل', 'go down')
        ],
        explanation: say(
            'Datu bat denboran nola aldatzen den ikusteko, puntu bakoitza bere egunean eta bere balioan jartzen da, eta zuzenkiekin lotzen dira. Lerroa igotzen bada, datua handitu da; jaisten bada, txikitu. Marrazkian, tenperatura 14°-tik 21°-ra igotzen da, eta gero 17°-ra jaisten.',
            'Para ver cómo cambia un dato con el tiempo, se pone cada punto en su día y su valor, y se unen con segmentos. Si la línea sube, el dato aumenta; si baja, disminuye. En el dibujo, la temperatura sube de 14° a 21° y luego baja a 17°.',
            'لنرى كيف تتغير قيمة مع الزمن نضع كل نقطة عند يومها وقيمتها ونصل النقاط بقطع. إذا صعد الخط زادت القيمة، وإذا نزل نقصت. في الرسم تصعد الحرارة من 14° إلى 21° ثم تنزل إلى 17°.',
            'To see how a value changes over time, put each point at its day and its value, and join the points with segments. If the line goes up, the value increases; if it goes down, it decreases. In the drawing, the temperature goes up from 14° to 21° and then down to 17°.'
        ),
        examplePrompt: say('Izozki-salmentak astelehenetik ostegunera: 30, 45, 40 eta 60. Zein egunen artean igotzen da gehien?', 'Ventas de helados de lunes a jueves: 30, 45, 40 y 60. ¿Entre qué días sube más?', 'مبيعات المثلجات من الاثنين إلى الخميس: 30، 45، 40، 60. بين أيّ يومين كان الصعود أكبر؟', 'Ice-cream sales from Monday to Thursday: 30, 45, 40 and 60. Between which days does it go up most?'),
        example: same('$\\begin{gathered}45-30=15\\qquad 40-45=-5\\\\60-40=20\\end{gathered}$'),
        exampleAnswer: say('Asteazkenetik ostegunera: 20 igotzen da. Asteartetik asteazkenera jaitsi egiten da.', 'Del miércoles al jueves: sube 20. Del martes al miércoles baja.', 'من الأربعاء إلى الخميس: تصعد 20. ومن الثلاثاء إلى الأربعاء تنزل.', 'From Wednesday to Thursday: it goes up 20. From Tuesday to Wednesday it goes down.')
    },

    /* ---------- 4. Parameters ---------- */
    mean: {
        vocabulary: [
            say('oreka', 'equilibrio', 'التوازن', 'balance'),
            say('batura', 'suma', 'المجموع', 'sum'),
            say('maiztasuna', 'frecuencia', 'التكرار', 'frequency')
        ],
        definitions: [
            {
                term: say('Batez bestekoa', 'Media', 'المتوسط', 'Mean'),
                meaning: say('Datu guztien batura zati datu kopurua; $\\bar{x}$ idazten da.', 'La suma de todos los datos dividida entre el número de datos; se escribe $\\bar{x}$.', 'مجموع كل البيانات مقسومًا على عددها؛ ويُكتب $\\bar{x}$.', 'The sum of all the data divided by the number of data; it is written $\\bar{x}$.')
            }
        ],
        explanation: say(
            'Batez bestekoa datu guztiek izango luketen balioa da, guztiak berdinak balira: haien oreka-puntua. Datuak taula batean badaude, biderkatu balio bakoitza bere maiztasunaz, batu eta zatitu $N$ zenbakiarekin.',
            'La media es el valor que tendrían todos los datos si fueran iguales: su punto de equilibrio. Si los datos están en una tabla, multiplica cada valor por su frecuencia, suma y divide entre $N$.',
            'المتوسط هو القيمة التي تكون لكل البيانات لو كانت متساوية: نقطة توازنها. وإذا كانت البيانات في جدول فاضرب كل قيمة في تكرارها، واجمع، واقسم على $N$.',
            'The mean is the value all the data would have if they were equal: their balance point. If the data are in a table, multiply each value by its frequency, add up and divide by $N$.'
        ),
        examplePrompt: say('Kalkulatu 12, 15, 9, 14 eta 10 minutuen batez bestekoa.', 'Calcula la media de 12, 15, 9, 14 y 10 minutos.', 'احسب متوسط 12 و15 و9 و14 و10 دقائق.', 'Work out the mean of 12, 15, 9, 14 and 10 minutes.'),
        example: same('$\\begin{aligned}\\bar{x}&=\\frac{12+15+9+14+10}{5}\\\\&=\\frac{60}{5}=12\\end{aligned}$'),
        exampleAnswer: say('Batez beste, 12 minutu.', 'De media, 12 minutos.', 'في المتوسط 12 دقيقة.', 'On average, 12 minutes.'),
        why: {
            text: say(
                'Lau lagunek 1, 3, 5 eta 11 kromo badituzte eta denak elkartzen badituzte, 20 dira; zati berdinetan banatuta, 5 dagozkio bakoitzari. Hori da batez bestekoa: guztiek gauza bera izango balute, bakoitzak izango lukeena.',
                'Si cuatro amigos tienen 1, 3, 5 y 11 cromos y los juntan, son 20; repartidos a partes iguales, tocan a 5 cada uno. Eso es la media: lo que tendría cada uno si todos tuvieran lo mismo.',
                'إذا كان لأربعة أصدقاء 1 و3 و5 و11 بطاقة وجمعوها صارت 20؛ وإذا وُزّعت بالتساوي كان لكل واحد 5. هذا هو المتوسط: ما يكون لكل واحد لو تساووا جميعًا.',
                'If four friends have 1, 3, 5 and 11 stickers and put them together, that is 20; shared out equally, each gets 5. That is the mean: what each one would have if they all had the same.'
            ),
            math: same('$\\frac{1+3+5+11}{4}=\\frac{20}{4}=5$')
        }
    },
    'median-mode': {
        vocabulary: [
            say('ordenatu', 'ordenar', 'رتّب', 'put in order'),
            say('erdia', 'centro', 'الوسط', 'middle'),
            say('bikoitia', 'par', 'زوجي', 'even')
        ],
        definitions: [
            {
                term: say('Moda eta mediana', 'Moda y mediana', 'المنوال والوسيط', 'Mode and median'),
                meaning: say('Moda gehien errepikatzen den balioa da; mediana, datuak ordenatzean erdian geratzen dena.', 'La moda es el valor que más se repite; la mediana, el que queda en el centro al ordenar los datos.', 'المنوال هو القيمة الأكثر تكرارًا؛ والوسيط هو القيمة التي تقع في الوسط بعد ترتيب البيانات.', 'The mode is the value that comes up most; the median, the one left in the middle when the data are put in order.')
            }
        ],
        explanation: say(
            'Medianarako, lehenik datuak txikienetik handienera ordenatu behar dira. Datu kopurua bikoitia bada, bi daude erdian, eta mediana haien batez bestekoa da. Moda bat baino gehiago egon daitezke.',
            'Para la mediana, primero hay que ordenar los datos de menor a mayor. Si el número de datos es par, hay dos en el centro, y la mediana es su media. Puede haber más de una moda.',
            'لإيجاد الوسيط يجب أولًا ترتيب البيانات من الأصغر إلى الأكبر. وإذا كان عدد البيانات زوجيًا ففي الوسط قيمتان، والوسيط متوسطهما. وقد يكون هناك أكثر من منوال.',
            'For the median, first put the data in order from smallest to largest. If the number of data is even, there are two in the middle, and the median is their mean. There can be more than one mode.'
        ),
        examplePrompt: say('Aurkitu datu hauen mediana eta moda: 12, 15, 10, 15, 11, 14.', 'Halla la mediana y la moda de: 12, 15, 10, 15, 11, 14.', 'أوجد الوسيط والمنوال لـ: 12، 15، 10، 15، 11، 14.', 'Find the median and the mode of: 12, 15, 10, 15, 11, 14.'),
        example: same('$\\begin{gathered}10,\\ 11,\\ 12,\\ 14,\\ 15,\\ 15\\\\\\frac{12+14}{2}=13\\end{gathered}$'),
        exampleAnswer: say('Sei datu: mediana erdiko bien batez bestekoa da, 13. Moda 15 da.', 'Seis datos: la mediana es la media de los dos centrales, 13. La moda es 15.', 'ست قيم: الوسيط متوسط القيمتين الوسطيين، 13. والمنوال 15.', 'Six data: the median is the mean of the two middle ones, 13. The mode is 15.')
    },
    range: {
        vocabulary: [
            say('sakabanatuak', 'dispersos', 'متباعدة', 'spread out'),
            say('handiena', 'mayor', 'الأكبر', 'biggest'),
            say('txikiena', 'menor', 'الأصغر', 'smallest')
        ],
        definitions: [
            {
                term: say('Ibiltartea', 'Rango', 'المدى', 'Range'),
                meaning: say('Datu handienaren eta txikienaren arteko kendura.', 'La diferencia entre el dato mayor y el menor.', 'الفرق بين أكبر قيمة وأصغرها.', 'The difference between the biggest and the smallest value.')
            }
        ],
        explanation: say(
            'Ibiltarteak datuak zenbat bereizten diren adierazten du. Bi taldek batez besteko bera eta ibiltarte oso desberdina izan ditzakete: batean datuak elkarren ondoan daude, eta bestean, sakabanatuak.',
            'El rango indica cuánto se separan los datos. Dos grupos pueden tener la misma media y un rango muy distinto: en uno los datos están juntos y en el otro, dispersos.',
            'يدل المدى على مدى تباعد البيانات. وقد يكون لمجموعتين المتوسط نفسه ومدى مختلف جدًا: في إحداهما البيانات متقاربة وفي الأخرى متباعدة.',
            'The range shows how spread out the data are. Two groups can have the same mean and a very different range: in one the data are close together and in the other, spread out.'
        ),
        examplePrompt: say('Talde bateko altuerak: 158, 171, 165, 149 eta 160 cm. Zein da ibiltartea?', 'Alturas de un equipo: 158, 171, 165, 149 y 160 cm. ¿Cuál es el rango?', 'أطوال أعضاء فريق: 158 و171 و165 و149 و160 سم. ما المدى؟', 'Heights in a team: 158, 171, 165, 149 and 160 cm. What is the range?'),
        example: same('$171-149=22$'),
        exampleAnswer: say('Ibiltartea 22 cm da: baxuenetik altuenera.', 'El rango es 22 cm: del más bajo al más alto.', 'المدى 22 سم: من الأقصر إلى الأطول.', 'The range is 22 cm: from the shortest to the tallest.')
    },

    /* ---------- 5. Probability ---------- */
    random: {
        vocabulary: [
            say('dadoa', 'dado', 'النرد', 'die'),
            say('segurua', 'seguro', 'مؤكد', 'certain'),
            say('ezinezkoa', 'imposible', 'مستحيل', 'impossible')
        ],
        definitions: [
            {
                term: say('Ausazko esperimentua', 'Experimento aleatorio', 'التجربة العشوائية', 'Random experiment'),
                meaning: say('Emaitza aurretik jakin ezin den esperimentua, dado bat jaurtitzea bezala.', 'Uno en el que no se puede saber el resultado antes, como lanzar un dado.', 'تجربة لا يمكن معرفة نتيجتها مسبقًا، مثل رمي نرد.', 'One whose result cannot be known in advance, like rolling a die.')
            },
            {
                term: say('Lagin-espazioa', 'Espacio muestral', 'فضاء العيّنة', 'Sample space'),
                meaning: say('Emaitza posible guztiak, $E$.', 'Todos los resultados posibles, $E$.', 'كل النتائج الممكنة، $E$.', 'All the possible results, $E$.')
            },
            {
                term: say('Gertaera', 'Suceso', 'الحدث', 'Event'),
                meaning: say('Emaitza multzo bat: oinarrizkoa, segurua edo ezinezkoa izan daiteke.', 'Un conjunto de resultados: puede ser elemental, seguro o imposible.', 'مجموعة من النتائج: قد يكون بسيطًا أو مؤكدًا أو مستحيلًا.', 'A set of results: it can be elementary, certain or impossible.')
            }
        ],
        explanation: say(
            'Esperimentu bat determinista da beti emaitza bera ematen badu, 100 °C-tan irakiten duen ura bezala. Marrazkiko dadoan, $E=\\{1,2,3,4,5,6\\}$; «bikoitia ateratzea» gertaera bat da, «7 baino gutxiago ateratzea» segurua, eta «7 ateratzea», ezinezkoa.',
            'Un experimento es determinista si siempre da el mismo resultado, como el agua que hierve a 100 °C. En el dado del dibujo, $E=\\{1,2,3,4,5,6\\}$; «sacar par» es un suceso, «sacar menos de 7» es seguro y «sacar un 7», imposible.',
            'تكون التجربة حتمية إذا أعطت النتيجة نفسها دائمًا، مثل الماء الذي يغلي عند 100 °C. وفي النرد المرسوم $E=\\{1,2,3,4,5,6\\}$؛ «الحصول على عدد زوجي» حدث، و«الحصول على أقل من 7» مؤكد، و«الحصول على 7» مستحيل.',
            'An experiment is deterministic if it always gives the same result, like water boiling at 100 °C. For the die in the drawing, $E=\\{1,2,3,4,5,6\\}$; «getting an even number» is an event, «getting less than 7» is certain and «getting a 7» is impossible.'
        ),
        examplePrompt: say('Lau kartatatik bat ateratzen da: A, B, C eta D. Idatzi lagin-espazioa eta «bokal bat ateratzea» gertaera.', 'Se saca una carta de cuatro: A, B, C y D. Escribe el espacio muestral y el suceso «sacar una vocal».', 'نسحب بطاقة من أربع: A وB وC وD. اكتب فضاء العيّنة والحدث «سحب حرف علة».', 'One card is drawn from four: A, B, C and D. Write the sample space and the event «drawing a vowel».'),
        example: same('$E=\\{A,\\ B,\\ C,\\ D\\}\\qquad V=\\{A\\}$'),
        exampleAnswer: say('Lau emaitza posible; «bokala» gertaera oinarrizkoa da: A bakarrik.', 'Cuatro resultados posibles; el suceso «vocal» es elemental: solo la A.', 'أربع نتائج ممكنة؛ وحدث «حرف علة» بسيط: A فقط.', 'Four possible results; the event «vowel» is elementary: only A.')
    },
    laplace: {
        vocabulary: [
            say('kasu aldekoak', 'casos favorables', 'الحالات المواتية', 'favourable outcomes'),
            say('kasu posibleak', 'casos posibles', 'الحالات الممكنة', 'possible outcomes'),
            say('probabilitatea', 'probabilidad', 'الاحتمال', 'probability')
        ],
        definitions: [
            {
                term: say('Laplaceren erregela', 'Regla de Laplace', 'قاعدة لابلاس', 'Laplace\'s rule'),
                meaning: say('Emaitza guztiek aukera bera badute, probabilitatea kasu aldekoak zati kasu posibleak da.', 'Si todos los resultados son igual de posibles, la probabilidad es casos favorables entre casos posibles.', 'إذا كانت كل النتائج متساوية الإمكان فالاحتمال هو الحالات المواتية على الحالات الممكنة.', 'If all the results are equally likely, the probability is favourable outcomes divided by possible outcomes.')
            }
        ],
        explanation: say(
            'Probabilitatea 0 eta 1 artean dago: 0 gertaera ezinezkoarena da, eta 1, seguruarena. Zatiki, hamartar edo ehuneko gisa eman daiteke. Dadoan, bikoitia ateratzeak 6 kasutatik 3 kasu aldeko ditu: $P=\\frac{3}{6}=\\frac{1}{2}$.',
            'La probabilidad está entre 0 y 1: 0 es la del suceso imposible, y 1, la del seguro. Se puede dar como fracción, decimal o porcentaje. En el dado, sacar par tiene 3 casos favorables de 6: $P=\\frac{3}{6}=\\frac{1}{2}$.',
            'الاحتمال بين 0 و1: 0 للحدث المستحيل و1 للمؤكد. ويمكن كتابته كسرًا أو عددًا عشريًا أو نسبة مئوية. وفي النرد للحصول على عدد زوجي 3 حالات مواتية من 6: $P=\\frac{3}{6}=\\frac{1}{2}$.',
            'Probability is between 0 and 1: 0 for an impossible event and 1 for a certain one. It can be given as a fraction, a decimal or a percentage. On a die, getting an even number has 3 favourable outcomes out of 6: $P=\\frac{3}{6}=\\frac{1}{2}$.'
        ),
        examplePrompt: say('Kutxa batean 12 goxoki daude: 4 marrubizkoak, 6 limoizkoak eta 2 mendazkoak. Zer probabilitate dago limoizko bat ateratzeko?', 'En una caja hay 12 caramelos: 4 de fresa, 6 de limón y 2 de menta. ¿Qué probabilidad hay de sacar uno de limón?', 'في علبة 12 حلوى: 4 بالفراولة و6 بالليمون و2 بالنعناع. ما احتمال سحب واحدة بالليمون؟', 'A box has 12 sweets: 4 strawberry, 6 lemon and 2 mint. What is the probability of taking a lemon one?'),
        example: same('$P=\\frac{6}{12}=\\frac{1}{2}=0{,}5$'),
        exampleAnswer: say('%\u00a050: goxokien erdia limoizkoak dira.', 'Un 50\u00a0%: la mitad de los caramelos son de limón.', '50٪: نصف الحلوى بالليمون.', '50%: half the sweets are lemon.'),
        why: {
            text: say(
                'Emaitza guztiek aukera bera badute, bakoitzak 1 zenbakiaren zati bera hartzen du: 5 bolarekin, $\\frac{1}{5}$ bakoitzak. 2 bola gorriek, elkarrekin, $\\frac{2}{5}$ hartzen dute: kasu aldekoak zati posibleak.',
                'Si todos los resultados tienen la misma posibilidad, cada uno se lleva la misma parte de 1: con 5 bolas, $\\frac{1}{5}$ cada una. Las 2 rojas juntas se llevan $\\frac{2}{5}$: favorables entre posibles.',
                'إذا كانت لكل النتائج الإمكانية نفسها أخذت كل واحدة الجزء نفسه من 1: مع 5 كرات، $\\frac{1}{5}$ لكل كرة. والكرتان الحمراوان معًا تأخذان $\\frac{2}{5}$: المواتية على الممكنة.',
                'If all the results are equally likely, each one gets the same share of 1: with 5 balls, $\\frac{1}{5}$ each. The 2 red ones together get $\\frac{2}{5}$: favourable over possible.'
            ),
            math: same('$2\\cdot\\frac{1}{5}=\\frac{2}{5}$')
        }
    },
    'frequency-probability': {
        vocabulary: [
            say('maiztasun erlatiboa', 'frecuencia relativa', 'التكرار النسبي', 'relative frequency'),
            say('probabilitatea', 'probabilidad', 'الاحتمال', 'probability'),
            say('txanpona', 'moneda', 'قطعة النقود', 'coin')
        ],
        explanation: say(
            'Esperimentu bat askotan errepikatzen bada, gertaera baten maiztasun erlatiboa gero eta gehiago hurbiltzen da haren probabilitatera. Txanpon bat 10 aldiz jaurtita 7 aurpegi atera daitezke, baina 1000 aldiz jaurtita, 500 inguru: maiztasuna $0{,}5$ zenbakira hurbiltzen da.',
            'Si un experimento se repite muchas veces, la frecuencia relativa de un suceso se acerca cada vez más a su probabilidad. Con 10 lanzamientos de una moneda pueden salir 7 caras, pero con 1000 saldrán cerca de 500: la frecuencia se acerca a $0{,}5$.',
            'إذا كررنا تجربة مرات كثيرة اقترب التكرار النسبي لحدث أكثر فأكثر من احتماله. في 10 رميات لقطعة نقود قد يظهر الوجه 7 مرات، لكن في 1000 رمية سيظهر نحو 500 مرة: يقترب التكرار من $0{,}5$.',
            'If an experiment is repeated many times, the relative frequency of an event gets closer and closer to its probability. With 10 tosses of a coin you might get 7 heads, but with 1,000 you will get about 500: the frequency gets close to $0{,}5$.'
        ),
        examplePrompt: say('Dado bat 600 aldiz jaurti da, eta 5 zenbakia 103 aldiz atera da. Zein da haren maiztasun erlatiboa? Eta probabilitatea?', 'Se lanza un dado 600 veces y el 5 sale 103 veces. ¿Qué frecuencia relativa tiene? ¿Y qué probabilidad?', 'رُمي نرد 600 مرة وظهر العدد 5 مئة وثلاث مرات. ما تكراره النسبي؟ وما احتماله؟', 'A die is rolled 600 times and the 5 comes up 103 times. What is its relative frequency? And its probability?'),
        example: same('$\\begin{gathered}h=\\frac{103}{600}\\approx 0{,}17\\\\P=\\frac{1}{6}\\approx 0{,}17\\end{gathered}$'),
        exampleAnswer: say('Hainbeste jaurtiketarekin, maiztasun erlatiboa probabilitatetik oso gertu dago.', 'Con tantas tiradas, la frecuencia relativa ya está muy cerca de la probabilidad.', 'مع هذا العدد من الرميات صار التكرار النسبي قريبًا جدًا من الاحتمال.', 'With so many rolls, the relative frequency is already very close to the probability.')
    }
}

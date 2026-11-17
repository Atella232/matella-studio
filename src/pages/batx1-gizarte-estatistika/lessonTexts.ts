import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { SocialStatsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Estatistika unidimentsionala · Batxilergoa 1 · Gizarte Zientziak — what
   the lessons that are new in Sociales tell: the new words, a short
   explanation, the example as an exercise («Another example»), the key
   words in four languages and, in three lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. The example uses numbers of its own, never those of «Let's
   solve», of «Check it» or of the typical mistake.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const socialStatsLessonTexts: Record<SocialStatsTopicId, LessonTexts> = {
    /* ---------- 1. Data and charts ---------- */
    'unequal-widths': {
        definitions: [
            { term: say('Tartearen zabalera', 'Amplitud del intervalo', 'طول الفئة', 'Width of the interval'), meaning: say('Tartearen luzera: goiko muturra ken beheko muturra, $a_i$.', 'La longitud del intervalo: extremo superior menos extremo inferior, $a_i$.', 'طول الفئة: الطرف الأعلى ناقص الطرف الأدنى، $a_i$.', 'The length of the interval: upper end minus lower end, $a_i$.') }
        ],
        vocabulary: [
            say('histograma', 'histograma', 'المدرّج التكراري', 'histogram'),
            say('azalera', 'área', 'المساحة', 'area'),
            say('altuera', 'altura', 'الارتفاع', 'height')
        ],
        explanation: say(
            'Histograma batean, barra bakoitzaren azalera da haren maiztasuna. Tarte guztiek zabalera bera badute, altuera maiztasuna izan daiteke. Zabalerak desberdinak badira, altuera maiztasuna zati zabalera da, $\\frac{f_i}{a_i}$; bestela, tarte zabal batek bere datuak baino gehiago dituela ematen du.',
            'En un histograma, el área de cada barra es su frecuencia. Si todos los intervalos tienen la misma amplitud, la altura puede ser la frecuencia. Si las amplitudes son distintas, la altura es la frecuencia entre la amplitud, $\\frac{f_i}{a_i}$; si no, un intervalo ancho parece tener más datos de los que tiene.',
            'في المدرّج التكراري مساحة كل عمود هي تكراره. إذا كان لكل الفئات الطول نفسه أمكن أن يكون الارتفاع هو التكرار. وإذا اختلفت الأطوال فالارتفاع هو التكرار مقسومًا على الطول $\\frac{f_i}{a_i}$؛ وإلا بدت فئة عريضة كأن فيها بيانات أكثر مما فيها.',
            'In a histogram, the area of each bar is its frequency. If all the intervals have the same width, the height can be the frequency. If the widths differ, the height is the frequency divided by the width, $\\frac{f_i}{a_i}$; otherwise a wide interval looks as if it had more data than it does.'
        ),
        examplePrompt: say('70 bezeroren gastua, eurotan: $[0,10)$ tartean 30 eta $[10,30)$ tartean 40. Zer altuera du barra bakoitzak?', 'Gasto en euros de 70 clientes: 30 en $[0,10)$ y 40 en $[10,30)$. ¿Qué altura tiene cada barra?', 'إنفاق 70 زبونًا باليورو: 30 في $[0,10)$ و40 في $[10,30)$. ما ارتفاع كل عمود؟', 'Spending in euros of 70 customers: 30 in $[0,10)$ and 40 in $[10,30)$. How tall is each bar?'),
        example: same('$\\frac{30}{10}=3\\qquad\\frac{40}{20}=2$'),
        exampleAnswer: say('Bigarren tarteak datu gehiago ditu, baina haren barra baxuagoa da: bi aldiz zabalagoa da.', 'El segundo intervalo tiene más datos, pero su barra es más baja: es el doble de ancho.', 'للفئة الثانية بيانات أكثر لكن عمودها أقصر: فهي أعرض بمرتين.', 'The second interval has more data, but its bar is lower: it is twice as wide.')
    },

    /* ---------- 2. Measures of centre ---------- */
    'group-means': {
        definitions: [
            { term: say('Batez besteko bateratua', 'Media conjunta', 'المتوسط المشترك', 'Combined mean'), meaning: say('Bi talde batera hartuta duten batez bestekoa: guztizkoak batu eta datu guztien kopuruaz zatitzen da.', 'La media de dos grupos juntos: se suman los totales y se divide entre el número de todos los datos.', 'متوسط مجموعتين معًا: نجمع المجموعين ونقسم على عدد كل البيانات.', 'The mean of two groups together: add up the totals and divide by the number of all the data.') }
        ],
        vocabulary: [
            say('guztizkoa', 'total', 'المجموع', 'total'),
            say('taldea', 'grupo', 'المجموعة', 'group'),
            say('maiztasuna', 'frecuencia', 'التكرار', 'frequency')
        ],
        explanation: say(
            'Batez bestekoak guztizkoa ematen du: $N\\cdot\\bar{x}$. Bi talde batzeko, talde bakoitzaren guztizkoa kalkulatu, batu eta datu guztien kopuruaz zatitu. Ideia berarekin aurkitzen da falta den maiztasun bat: batez bestekoaren ekuazioa planteatu eta ebatzi.',
            'La media da el total: $N\\cdot\\bar{x}$. Para juntar dos grupos, calcula el total de cada uno, súmalos y divide entre el número de todos los datos. Con la misma idea se halla una frecuencia que falta: se plantea la ecuación de la media y se resuelve.',
            'المتوسط يعطي المجموع: $N\\cdot\\bar{x}$. ولضمّ مجموعتين احسب مجموع كل منهما واجمعهما واقسم على عدد كل البيانات. وبالفكرة نفسها نجد تكرارًا ناقصًا: نكتب معادلة المتوسط ونحلّها.',
            'The mean gives the total: $N\\cdot\\bar{x}$. To join two groups, work out the total of each one, add them and divide by the number of all the data. With the same idea you find a missing frequency: set up the equation of the mean and solve it.'
        ),
        examplePrompt: say('1, 2, 3 eta 4 balioen maiztasunak 3, $x$, 7 eta 4 dira, eta batez bestekoa 2,6 da. Aurkitu $x$.', 'Los valores 1, 2, 3 y 4 tienen frecuencias 3, $x$, 7 y 4, y la media es 2,6. Halla $x$.', 'للقيم 1 و2 و3 و4 التكرارات 3 و$x$ و7 و4، والمتوسط 2.6. أوجد $x$.', 'The values 1, 2, 3 and 4 have frequencies 3, $x$, 7 and 4, and the mean is 2.6. Find $x$.'),
        example: same('$\\frac{3+2x+21+16}{14+x}=2{,}6\\ \\to\\ 40+2x=36{,}4+2{,}6x\\ \\to\\ x=6$'),
        exampleAnswer: say('Bigarren balioa 6 aldiz agertzen da.', 'El segundo valor sale 6 veces.', 'تظهر القيمة الثانية 6 مرات.', 'The second value appears 6 times.'),
        why: {
            text: say(
                'Zergatik ez da balio bi batez bestekoen erdia? Talde handiak datu gehiago ekartzen ditu guztizkora. 30 ikaslek 20 € badute eta 10 ikaslek 28 €, 40 ikasleetatik 30 ikasle 20 € ingurukoak dira: batez bestekoa 20 € aldera hurbiltzen da, eta 22 € da, ez 24 €.',
                '¿Por qué no vale la mitad de las dos medias? El grupo grande aporta más datos al total. Si 30 alumnos tienen 20 € y 10 alumnos 28 €, de los 40 hay 30 cerca de 20 €: la media se acerca a 20 € y es 22 €, no 24 €.',
                'لماذا لا يصح نصف المتوسطين؟ المجموعة الكبيرة تضيف بيانات أكثر إلى المجموع. فإذا كان مع 30 طالبًا 20 € ومع 10 طلاب 28 € فإن 30 من الأربعين قريبون من 20 €: يقترب المتوسط من 20 € فيكون 22 € لا 24 €.',
                'Why is half the two means wrong? The big group brings more data to the total. If 30 students have €20 and 10 students €28, then 30 of the 40 are near €20: the mean moves towards €20 and is €22, not €24.'
            )
        }
    },

    /* ---------- 3. Measures of position ---------- */
    'cumulative-polygon': {
        definitions: [
            { term: say('Ehuneko metatuen poligonoa', 'Polígono de porcentajes acumulados', 'مضلّع النسب المتجمّعة', 'Cumulative percentage polygon'), meaning: say('Tarte bakoitzaren puntua (goiko muturra, ehuneko metatua) lotzen duen lerroa, % 0 ehunekotik % 100 ehunekora.', 'La línea que une los puntos (extremo superior, porcentaje acumulado) de cada intervalo, del 0 % al 100 %.', 'الخط الذي يصل النقاط (الطرف الأعلى، النسبة المتجمّعة) لكل فئة، من 0٪ إلى 100٪.', 'The line that joins the points (upper end, cumulative percentage) of each interval, from 0% to 100%.') }
        ],
        vocabulary: [
            say('muturra', 'extremo', 'الطرف', 'end'),
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage')
        ],
        explanation: say(
            'Datuak tarteetan daudenean, ez dakigu zein den datu bakoitza, baina bai zenbat dauden tarte bakoitzaren muturreraino. Maiztasun metatuak ehunekotan ematen dira, eta puntu bakoitza goiko muturrean jartzen da. Poligonoak beti gora egiten du, % 0 ehunekotik % 100 ehunekora, eta datuen edozein ehuneko irakurtzen uzten du.',
            'Con los datos en intervalos no sabemos cuál es cada dato, pero sí cuántos hay hasta el extremo de cada intervalo. Las frecuencias acumuladas se pasan a porcentaje y cada punto se pone en el extremo superior. El polígono siempre sube, del 0 % al 100 %, y deja leer cualquier porcentaje de los datos.',
            'مع البيانات المبوّبة لا نعرف كل بيان، لكننا نعرف كم بيانًا يوجد حتى طرف كل فئة. نحوّل التكرارات المتجمّعة إلى نسب مئوية ونضع كل نقطة عند الطرف الأعلى. والمضلّع يصعد دائمًا من 0٪ إلى 100٪، ويسمح بقراءة أي نسبة من البيانات.',
            'With the data in intervals we do not know each datum, but we do know how many there are up to the end of each interval. The cumulative frequencies are turned into percentages and each point goes at the upper end. The polygon always rises, from 0% to 100%, and lets you read any percentage of the data.'
        ),
        examplePrompt: say('Lanera joateko 25 langilek egiten dituzten kilometroak: $[0,4)$ tartean 5, $[4,8)$ tartean 15 eta $[8,12)$ tartean 5. Eman ehuneko metatuak.', 'Kilómetros que hacen 25 empleados para ir al trabajo: 5 en $[0,4)$, 15 en $[4,8)$ y 5 en $[8,12)$. Da los porcentajes acumulados.', 'الكيلومترات التي يقطعها 25 موظفًا للذهاب إلى العمل: 5 في $[0,4)$ و15 في $[4,8)$ و5 في $[8,12)$. أعطِ النسب المتجمّعة.', 'Kilometres that 25 employees travel to work: 5 in $[0,4)$, 15 in $[4,8)$ and 5 in $[8,12)$. Give the cumulative percentages.'),
        example: same('$\\frac{5}{25}\\cdot 100=20\\qquad\\frac{20}{25}\\cdot 100=80\\qquad\\frac{25}{25}\\cdot 100=100$'),
        exampleAnswer: say('Poligonoaren puntuak: (0, % 0), (4, % 20), (8, % 80) eta (12, % 100).', 'Los puntos del polígono: (0, 0 %), (4, 20 %), (8, 80 %) y (12, 100 %).', 'نقاط المضلّع: (0، 0٪) و(4، 20٪) و(8، 80٪) و(12، 100٪).', 'The points of the polygon: (0, 0%), (4, 20%), (8, 80%) and (12, 100%).')
    },
    'grouped-percentiles': {
        definitions: [
            { term: say('Interpolatzea', 'Interpolar', 'الاستكمال', 'Interpolate'), meaning: say('Bi puntu ezagunen arteko balio bat aurkitzea, haien artean poligonoa zuzen bat dela suposatuz.', 'Hallar un valor entre dos puntos conocidos suponiendo que entre ellos el polígono es una recta.', 'إيجاد قيمة بين نقطتين معروفتين بافتراض أن المضلّع بينهما مستقيم.', 'Find a value between two known points assuming the polygon is a straight line between them.') }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'الفئة', 'interval'),
            say('zuzena', 'recta', 'المستقيم', 'straight line')
        ],
        explanation: say(
            '$P_k$ pertzentila bilatzeko, aurkitu % $k$ ehunekoa zein tartetan sartzen den. Tarte horretan poligonoa zuzen bat da, eta zuzen horretan irakurtzen da: $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$. $L_i$ beheko muturra da, $a_i$ zabalera, $h_i$ tartearen ehunekoa eta $H_{i-1}$ aurreko ehuneko metatua.',
            'Para $P_k$, busca en qué intervalo entra el $k$ %. En ese intervalo el polígono es una recta, y se lee sobre ella: $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$. $L_i$ es el extremo inferior, $a_i$ la amplitud, $h_i$ el porcentaje del intervalo y $H_{i-1}$ el porcentaje acumulado anterior.',
            'لإيجاد $P_k$ ابحث في أي فئة تقع النسبة $k$٪. في تلك الفئة المضلّع مستقيم، ونقرأ عليه: $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$. حيث $L_i$ الطرف الأدنى و$a_i$ الطول و$h_i$ نسبة الفئة و$H_{i-1}$ النسبة المتجمّعة السابقة.',
            'For $P_k$, find which interval the $k$% falls in. In that interval the polygon is a straight line, and you read it there: $P_k=L_i+\\frac{k-H_{i-1}}{h_i}\\cdot a_i$. $L_i$ is the lower end, $a_i$ the width, $h_i$ the percentage of the interval and $H_{i-1}$ the cumulative percentage before it.'
        ),
        examplePrompt: say('25 maletaren pisuak, kilotan: $[6,10)$ tartean 5, $[10,14)$ tartean 15 eta $[14,18)$ tartean 5. Aurkitu $P_{35}$.', 'Pesos en kilos de 25 maletas: 5 en $[6,10)$, 15 en $[10,14)$ y 5 en $[14,18)$. Halla $P_{35}$.', 'أوزان 25 حقيبة بالكيلوغرام: 5 في $[6,10)$ و15 في $[10,14)$ و5 في $[14,18)$. أوجد $P_{35}$.', 'Weights in kilos of 25 suitcases: 5 in $[6,10)$, 15 in $[10,14)$ and 5 in $[14,18)$. Find $P_{35}$.'),
        example: same('$P_{35}=10+\\frac{35-20}{60}\\cdot 4=11$'),
        exampleAnswer: say('Maleten % 35 ehunekoak 11 kilo baino gutxiago pisatzen du.', 'El 35 % de las maletas pesa menos de 11 kilos.', '35٪ من الحقائب تزن أقل من 11 كيلوغرامًا.', '35% of the suitcases weigh less than 11 kilos.'),
        why: {
            text: say(
                'Zergatik balio du formulak? Tartearen barruan datuak berdin banatuta daudela suposatzen da: poligonoa zuzen bat da, eta triangelu antzekoetan aurrera egiten dena ($P_k-L_i$) igotzen denarekiko ($k-H_{i-1}$) proportzionala da, $a_i$ eta $h_i$ bezala.',
                '¿Por qué vale la fórmula? Se supone que dentro del intervalo los datos están repartidos por igual: el polígono es una recta, y en triángulos semejantes lo que se avanza ($P_k-L_i$) es proporcional a lo que se sube ($k-H_{i-1}$), como $a_i$ a $h_i$.',
                'لماذا تصح الصيغة؟ نفترض أن البيانات داخل الفئة موزعة بالتساوي: فالمضلّع مستقيم، وفي المثلثات المتشابهة يتناسب ما نتقدّمه ($P_k-L_i$) مع ما نصعده ($k-H_{i-1}$)، كما يتناسب $a_i$ مع $h_i$.',
                'Why does the formula work? You assume that inside the interval the data are spread evenly: the polygon is a straight line, and in similar triangles how far you move ($P_k-L_i$) is proportional to how far you rise ($k-H_{i-1}$), as $a_i$ is to $h_i$.'
            ),
            math: same('$\\frac{P_k-L_i}{a_i}=\\frac{k-H_{i-1}}{h_i}$')
        }
    },
    'percentile-of-value': {
        definitions: [
            { term: say('Balio baten pertzentila', 'Percentil de un valor', 'مئين قيمة', 'Percentile of a value'), meaning: say('Balio horren azpian geratzen den datuen ehunekoa, $k$: balioa $P_k$ da.', 'El porcentaje $k$ de datos que queda por debajo de ese valor: el valor es $P_k$.', 'النسبة $k$ من البيانات التي تقع تحت تلك القيمة: فالقيمة هي $P_k$.', 'The percentage $k$ of data that lies below that value: the value is $P_k$.') }
        ],
        vocabulary: [
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage'),
            say('poligonoa', 'polígono', 'المضلّع', 'polygon')
        ],
        explanation: say(
            'Orain alderantziz egiten da: balioa ezaguna da, eta haren ehunekoa bilatzen da. Aurkitu balioa zein tartetan dagoen, eta kalkulatu tartearen zer zati dagoen azpian: $k=H_{i-1}+\\frac{x-L_i}{a_i}\\cdot h_i$. Ehuneko horrekin, zenbat pertsona dauden balioaren azpian edo gainean ere kalkula daiteke.',
            'Ahora se hace al revés: se conoce el valor y se busca su porcentaje. Busca en qué intervalo está y calcula qué parte del intervalo queda por debajo: $k=H_{i-1}+\\frac{x-L_i}{a_i}\\cdot h_i$. Con ese porcentaje también se calcula cuántas personas quedan por debajo o por encima del valor.',
            'الآن نعمل بالعكس: القيمة معروفة ونبحث عن نسبتها. ابحث في أي فئة تقع واحسب أي جزء من الفئة يقع تحتها: $k=H_{i-1}+\\frac{x-L_i}{a_i}\\cdot h_i$. وبتلك النسبة نحسب أيضًا كم شخصًا يقع تحت القيمة أو فوقها.',
            'Now you go the other way: the value is known and you look for its percentage. Find which interval it is in and work out what part of the interval lies below it: $k=H_{i-1}+\\frac{x-L_i}{a_i}\\cdot h_i$. With that percentage you can also work out how many people are below or above the value.'
        ),
        examplePrompt: say('Azterketa batean, $[5,7)$ notek % 30 eta % 70 arteko ehuneko metatua dute. Zer pertzentil du 6,5 batek?', 'En un examen, el intervalo de notas $[5,7)$ va del 30 % al 70 % acumulado. ¿Qué percentil tiene un 6,5?', 'في امتحان تمتد فئة العلامات $[5,7)$ من 30٪ إلى 70٪ متجمّعة. ما مئين العلامة 6.5؟', 'In an exam, the interval of marks $[5,7)$ runs from 30% to 70% cumulative. What percentile does a 6.5 have?'),
        example: same('$k=30+\\frac{6{,}5-5}{2}\\cdot 40=60$'),
        exampleAnswer: say('6,5 da $P_{60}$: nota hori baino txikiagoa dute ikasleen % 60 ehunekoak.', 'El 6,5 es $P_{60}$: el 60 % de los alumnos saca menos.', 'العلامة 6.5 هي $P_{60}$: 60٪ من الطلاب يحصلون على أقل منها.', '6.5 is $P_{60}$: 60% of the students get less.')
    },

    /* ---------- 4. Measures of spread ---------- */
    'compare-spread': {
        vocabulary: [
            say('sakabanatzea', 'dispersión', 'التشتت', 'spread'),
            say('muturra', 'extremo', 'الطرف', 'end'),
            say('desbideratze tipikoa', 'desviación típica', 'الانحراف المعياري', 'standard deviation')
        ],
        explanation: say(
            'Batez besteko bera duten bi banaketaren artean, sakabanatuena datuak batez bestekotik urrunen dituena da. Grafikoan, barrak muturretan altuak badira, $\\sigma$ handia da; erdian pilatzen badira, txikia. Zalantza baduzu, galdetu: zer egin behar diot banaketa honi bestearen antza izan dezan?',
            'Entre dos distribuciones con la misma media, la más dispersa es la que tiene los datos más lejos de la media. En el gráfico, si las barras son altas en los extremos, $\\sigma$ es grande; si se amontonan en el centro, pequeña. Si dudas, pregúntate: ¿qué le hago a esta para que se parezca a la otra?',
            'بين توزيعين لهما المتوسط نفسه، الأكثر تشتتًا هو الذي بياناته أبعد عن المتوسط. في الرسم، إذا كانت الأعمدة عالية في الطرفين كان $\\sigma$ كبيرًا، وإذا تكدّست في الوسط كان صغيرًا. وإذا ترددت فاسأل: ماذا أفعل بهذا ليشبه الآخر؟',
            'Between two distributions with the same mean, the more spread out one is the one with its data further from the mean. In the chart, if the bars are tall at the ends, $\\sigma$ is large; if they pile up in the middle, it is small. If in doubt, ask yourself: what would I do to this one to make it look like the other?'
        ),
        examplePrompt: say('Bi klasek batez besteko bera dute. A klasean ia denek batez bestekotik gertu ateratzen dute; B klasean, nota oso altuak eta oso baxuak. Zeinek du $\\sigma$ handiagoa?', 'Dos clases tienen la misma media. En A casi todos sacan cerca de la media; en B hay notas muy altas y muy bajas. ¿Cuál tiene mayor $\\sigma$?', 'لصفّين المتوسط نفسه. في A يحصل الجميع تقريبًا على علامات قريبة من المتوسط، وفي B علامات عالية جدًّا ومنخفضة جدًّا. أيهما له $\\sigma$ أكبر؟', 'Two classes have the same mean. In A almost everyone scores near the mean; in B there are very high and very low marks. Which has the larger $\\sigma$?'),
        example: '',
        exampleAnswer: say('B klaseak: haren notak batez bestekotik urrunago daude.', 'La clase B: sus notas están más lejos de la media.', 'الصف B: علاماته أبعد عن المتوسط.', 'Class B: its marks are further from the mean.')
    },

    /* ---------- 5. Interpret ---------- */
    'quartile-counts': {
        vocabulary: [
            say('kuartila', 'cuartil', 'الربيعي', 'quartile'),
            say('laurdena', 'cuarta parte', 'الربع', 'quarter')
        ],
        explanation: say(
            'Kuartilek datuak lau zati berdinetan banatzen dituzte: $Q_1$ azpian % 25 dago, $Q_1$ eta $Me$ artean beste % 25, eta horrela. Hortaz, populazioaren tamaina jakinda, zenbat pertsona dauden tarte bakoitzean kalkula daiteke, datu bakar bat ere ezagutu gabe.',
            'Los cuartiles parten los datos en cuatro partes iguales: bajo $Q_1$ está el 25 %, entre $Q_1$ y $Me$ otro 25 %, y así. Por eso, sabiendo el tamaño de la población, se calcula cuántas personas hay en cada tramo sin conocer ni un solo dato.',
            'تقسم الربيعيات البيانات إلى أربعة أجزاء متساوية: تحت $Q_1$ يوجد 25٪، وبين $Q_1$ و$Me$ 25٪ أخرى، وهكذا. لذلك، بمعرفة حجم المجتمع نحسب كم شخصًا في كل جزء دون معرفة أي بيان.',
            'Quartiles split the data into four equal parts: below $Q_1$ lies 25%, between $Q_1$ and $Me$ another 25%, and so on. So, knowing the size of the population, you can work out how many people are in each stretch without knowing a single datum.'
        ),
        examplePrompt: say('120 ikasleren notetan, $Q_3=7$. Zenbat ikaslek ateratzen dute 7 baino gehiago?', 'En las notas de 120 alumnos, $Q_3=7$. ¿Cuántos sacan más de 7?', 'في علامات 120 طالبًا $Q_3=7$. كم طالبًا يحصل على أكثر من 7؟', 'In the marks of 120 students, $Q_3=7$. How many get more than 7?'),
        example: same('$0{,}25\\cdot 120=30$'),
        exampleAnswer: say('30 ikasle: $Q_3$ gainean datuen laurdena dago.', '30 alumnos: por encima de $Q_3$ está la cuarta parte de los datos.', '30 طالبًا: فوق $Q_3$ يقع ربع البيانات.', '30 students: above $Q_3$ lies a quarter of the data.')
    },
    'share-between': {
        definitions: [
            { term: say('Banaketa uniformea', 'Reparto uniforme', 'التوزيع المنتظم', 'Even spread'), meaning: say('Tarte bateko datuak tarte osoan berdin banatuta daudela suposatzea.', 'Suponer que los datos de un intervalo están repartidos por igual a lo largo de él.', 'افتراض أن بيانات الفئة موزعة بالتساوي على طولها.', 'Assuming that the data of an interval are spread equally along it.') }
        ],
        vocabulary: [
            say('akastuna', 'defectuosa', 'معيبة', 'faulty'),
            say('zabalera', 'amplitud', 'الطول', 'width')
        ],
        explanation: say(
            'Bi balioren artean zenbat datu dauden jakiteko, batu barruan osorik dauden tarteak, eta muga bat erdian duten tarteetatik barruan geratzen den zatia bakarrik: zabaleraren zati bera, maiztasunaren zati bera. Horrela kalkulatzen da, adibidez, pieza onargarriak edo akastunak zenbat diren.',
            'Para saber cuántos datos hay entre dos valores, suma los intervalos que quedan dentro enteros y, de los que tienen un límite en medio, solo la parte que queda dentro: la misma parte de la amplitud, la misma parte de la frecuencia. Así se calcula, por ejemplo, cuántas piezas son aceptables o defectuosas.',
            'لمعرفة عدد البيانات بين قيمتين اجمع الفئات الواقعة كلها في الداخل، ومن الفئات التي يقع حدّ في وسطها خذ الجزء الداخلي فقط: الجزء نفسه من الطول هو الجزء نفسه من التكرار. وهكذا نحسب مثلًا كم قطعة مقبولة أو معيبة.',
            'To know how many data there are between two values, add the intervals that lie wholly inside and, from those with a limit in the middle, only the part that lies inside: the same part of the width, the same part of the frequency. That is how you work out, for example, how many parts are acceptable or faulty.'
        ),
        examplePrompt: say('90 bazkideren adinak: $[10,16)$ tartean 30 eta $[16,22)$ tartean 60. Zenbatek dituzte 13 eta 19 urte artean?', 'Edades de 90 socios: 30 en $[10,16)$ y 60 en $[16,22)$. ¿Cuántos tienen entre 13 y 19 años?', 'أعمار 90 عضوًا: 30 في $[10,16)$ و60 في $[16,22)$. كم منهم بين 13 و19 سنة؟', 'Ages of 90 members: 30 in $[10,16)$ and 60 in $[16,22)$. How many are between 13 and 19?'),
        example: same('$\\frac{16-13}{6}\\cdot 30+\\frac{19-16}{6}\\cdot 60=15+30=45$'),
        exampleAnswer: say('45 bazkide, guztien erdia.', '45 socios, la mitad del total.', '45 عضوًا، أي نصف المجموع.', '45 members, half of the total.')
    },
    'mean-sd-band': {
        vocabulary: [
            say('desbideratze tipikoa', 'desviación típica', 'الانحراف المعياري', 'standard deviation'),
            say('banda', 'banda', 'النطاق', 'band')
        ],
        explanation: say(
            '$(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$ tarteak banaketaren erdigunea erakusten du. Kalkulatu bi muturrak, bilatu zein tartetan erortzen diren, eta zenbatu barruko datuak muturretako tarteak zatituz. Kanpai-formako banaketetan, datuen % 68 inguru egoten da bertan.',
            'El intervalo $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$ muestra el centro de la distribución. Calcula sus dos extremos, busca en qué intervalos caen y cuenta los datos de dentro partiendo los intervalos de los extremos. En las distribuciones con forma de campana suele haber ahí cerca del 68 % de los datos.',
            'تُظهر الفئة $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$ مركز التوزيع. احسب طرفيها وابحث في أي فئات يقعان، ثم عدّ البيانات الداخلية بتقسيم فئتي الطرفين. وفي التوزيعات الجرسية يكون فيها عادةً نحو 68٪ من البيانات.',
            'The interval $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$ shows the centre of the distribution. Work out its two ends, find which intervals they fall in and count the data inside by splitting the intervals at the ends. In bell-shaped distributions about 68% of the data are usually there.'
        ),
        examplePrompt: say('$\\bar{x}=6$ eta $\\sigma=1{,}5$ dira, eta $[3,9)$ tarteak 120 datu ditu, berdin banatuta. Zenbat daude $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$ tartean?', 'Con $\\bar{x}=6$ y $\\sigma=1{,}5$, el intervalo $[3,9)$ tiene 120 datos repartidos por igual. ¿Cuántos hay en $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$?', 'مع $\\bar{x}=6$ و$\\sigma=1{,}5$ في الفئة $[3,9)$ يوجد 120 بيانًا موزعة بالتساوي. كم بيانًا في $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$؟', 'With $\\bar{x}=6$ and $\\sigma=1{,}5$, the interval $[3,9)$ has 120 data spread evenly. How many are in $(\\bar{x}-\\sigma,\\ \\bar{x}+\\sigma)$?'),
        example: same('$\\frac{7{,}5-4{,}5}{6}\\cdot 120=60$'),
        exampleAnswer: say('60 datu: banda tartearen erdia da.', '60 datos: la banda es la mitad del intervalo.', '60 بيانًا: النطاق نصف الفئة.', '60 data: the band is half the interval.')
    }
}

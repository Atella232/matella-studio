import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'
import type { Stats3TopicId } from './lessonChecks.ts'

/* ==========================================================================
   Estatistika · 3. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, its cases, the example as an exercise («Another example»)
   and, in three lessons, «Why does it work?» (sharing out the total,
   favourable cases never more than possible ones, half of a half). Plain
   data so the tests can import it; lessons.tsx merges it into the topics.
   The explanations use the numbers of their drawings (heights from 140 to
   180 cm, 1 % = 3,6°, the axis from 3000 to 3200, the 36 outcomes of two
   dice, three coins); the example uses numbers of its own. No text command
   inside the formulas (the unit test forbids it). Tests in
   tests/lesson-texts.test.ts.
   ========================================================================== */

export const stats3LessonTexts: Record<Stats3TopicId, LessonTexts> = {
    'population-sample': {
        definitions: [
            {
                term: say('Populazioa', 'Población', 'المجتمع الإحصائي', 'Population'),
                meaning: say('Aztertu nahi den talde osoa.', 'Todo el grupo que se quiere estudiar.', 'المجموعة كلها التي نريد دراستها.', 'The whole group you want to study.')
            },
            {
                term: say('Lagina', 'Muestra', 'العيّنة', 'Sample'),
                meaning: say('Benetan galdetzen zaion populazioaren zatia; adierazgarria izan behar du.', 'La parte de la población a la que de verdad se pregunta; tiene que ser representativa.', 'جزء المجتمع الذي نسأله فعلًا، ويجب أن يكون ممثِّلًا.', 'The part of the population that is really asked; it has to be representative.')
            }
        ],
        vocabulary: [
            say('ausaz', 'al azar', 'عشوائيًا', 'at random'),
            say('aldagaia', 'variable', 'المتغير', 'variable'),
            say('kopurua', 'números', 'أعداد', 'numbers')
        ],
        explanation: say(
            'Lagin adierazgarri bat ausaz aukeratzen da, eta nahikoa handia da. Aldagai bat kualitatiboa da hitzekin erantzuten bada, eta kuantitatiboa zenbakiekin erantzuten bada:',
            'Una muestra representativa se elige al azar y es lo bastante grande. Una variable es cualitativa si se responde con palabras, y cuantitativa si se responde con números:',
            'تُختار العيّنة الممثِّلة عشوائيًا وتكون كبيرة بما يكفي. ويكون المتغير نوعيًا إذا أُجيب عنه بكلمات، وكميًا إذا أُجيب عنه بأعداد:',
            'A representative sample is chosen at random and is big enough. A variable is qualitative if it is answered with words, and quantitative if it is answered with numbers:'
        ),
        cases: [
            {
                title: say('Kualitatiboa', 'Cualitativa', 'نوعي', 'Qualitative'),
                text: say('Hitzak: kolore gogokoena.', 'Palabras: el color favorito.', 'كلمات: اللون المفضّل.', 'Words: the favourite colour.')
            },
            {
                title: say('Kuantitatibo diskretua', 'Cuantitativa discreta', 'كمي متقطع', 'Discrete quantitative'),
                text: say('Balio solteak: anai-arreba kopurua.', 'Valores sueltos: el número de hermanos.', 'قيم منفصلة: عدد الإخوة.', 'Separate values: the number of siblings.')
            },
            {
                title: say('Kuantitatibo jarraitua', 'Cuantitativa continua', 'كمي متصل', 'Continuous quantitative'),
                text: say('Tarte bateko edozein balio: altuera edo denbora.', 'Cualquier valor de un intervalo: la altura o el tiempo.', 'أي قيمة في فترة: الطول أو الزمن.', 'Any value in an interval: height or time.')
            }
        ],
        examplePrompt: say('50\u00a0000 biztanleko hiri batean, 800 pertsonari galdetzen zaie zein den haien kirol gogokoena. Zein da lagina, eta nolako aldagaia da?', 'En una ciudad de 50\u00a0000 habitantes se pregunta a 800 personas su deporte favorito. ¿Cuál es la muestra y qué tipo de variable es?', 'في مدينة سكانها 50\u00a0000 نسمة نسأل 800 شخص عن رياضتهم المفضلة. ما العيّنة؟ وما نوع المتغير؟', 'In a city of 50,000 people, 800 are asked their favourite sport. What is the sample, and what kind of variable is it?'),
        example: same('$\\frac{800}{50\\,000}\\cdot 100=1{,}6$'),
        exampleAnswer: say('Lagina 800 pertsonak dira, populazioaren % 1,6; aldagaia kualitatiboa da.', 'La muestra son las 800 personas, el 1,6 % de la población; la variable es cualitativa.', 'العيّنة هي الـ 800 شخص، أي 1.6٪ من المجتمع؛ والمتغير نوعي.', 'The sample is the 800 people, 1.6% of the population; the variable is qualitative.')
    },
    'frequency-table': {
        vocabulary: [
            say('maiztasun absolutua', 'frecuencia absoluta', 'التكرار المطلق', 'absolute frequency'),
            say('maiztasun erlatiboa', 'frecuencia relativa', 'التكرار النسبي', 'relative frequency'),
            say('maiztasun metatua', 'frecuencia acumulada', 'التكرار المتجمّع', 'cumulative frequency')
        ],
        explanation: say(
            '$f_{i}$ maiztasun absolutua balio bat zenbat aldiz agertzen den da, eta guztiek $N$ batzen dute. Erlatiboa $h_{i}=\\frac{f_{i}}{N}$ da, ehunekotan ere bai, eta guztiek 1 batzen dute. $F_{i}$ maiztasun metatuak balio horretaraino datuak batzen ditu: aurreko metatua gehi $f_{i}$. Azkena $N$ da.',
            'La frecuencia absoluta $f_{i}$ es cuántas veces aparece un valor, y todas suman $N$. La relativa es $h_{i}=\\frac{f_{i}}{N}$, también en porcentaje, y todas suman 1. La acumulada $F_{i}$ suma los datos hasta ese valor: la acumulada anterior más $f_{i}$. La última es $N$.',
            'التكرار المطلق $f_{i}$ هو عدد مرات ظهور القيمة، ومجموعها كلها $N$. والنسبي $h_{i}=\\frac{f_{i}}{N}$، ويُكتب نسبة مئوية أيضًا، ومجموعها 1. والتكرار المتجمّع $F_{i}$ يجمع البيانات حتى تلك القيمة: المتجمّع السابق زائد $f_{i}$. والأخير $N$.',
            'The absolute frequency $f_{i}$ is how many times a value appears, and they all add up to $N$. The relative one is $h_{i}=\\frac{f_{i}}{N}$, also as a percentage, and they all add up to 1. The cumulative frequency $F_{i}$ adds the data up to that value: the previous cumulative plus $f_{i}$. The last one is $N$.'
        ),
        examplePrompt: say('Dado bat 25 aldiz bota da: 1, 2, 3 eta 4 zenbakiak 3, 5, 4 eta 6 aldiz atera dira. Zenbat da 4 zenbakiaren maiztasun metatua?', 'Tiramos un dado 25 veces: el 1, el 2, el 3 y el 4 salen 3, 5, 4 y 6 veces. ¿Cuánto vale la frecuencia acumulada del 4?', 'رمينا نردًا 25 مرة: ظهرت الأعداد 1 و2 و3 و4 على الترتيب 3 و5 و4 و6 مرات. كم التكرار المتجمّع للعدد 4؟', 'A dice is rolled 25 times: 1, 2, 3 and 4 come up 3, 5, 4 and 6 times. What is the cumulative frequency of 4?'),
        example: same('$\\begin{gathered}F_{4}=3+5+4+6=18\\\\ h_{4}=\\frac{6}{25}=0{,}24\\end{gathered}$'),
        exampleAnswer: say('18 jaurtiketatan 4 edo gutxiago atera da; 4 zenbakiaren erlatiboa 0,24 da.', '18 tiradas han dado 4 o menos; la relativa del 4 es 0,24.', 'في 18 رمية ظهر 4 أو أقل؛ والتكرار النسبي للعدد 4 هو 0.24.', '18 rolls gave 4 or less; the relative frequency of 4 is 0.24.')
    },
    'grouped-data': {
        definitions: [
            {
                term: say('Klase-marka', 'Marca de clase', 'مركز الفئة', 'Class midpoint'),
                meaning: say('Tarte baten erdiko puntua, $\\frac{a+b}{2}$; kalkuluetan tarteko datu guztien ordez erabiltzen da.', 'El punto medio de un intervalo, $\\frac{a+b}{2}$; en los cálculos sustituye a los datos del intervalo.', 'منتصف الفئة $\\frac{a+b}{2}$؛ ويحل في الحسابات محل كل بيانات الفئة.', 'The midpoint of an interval, $\\frac{a+b}{2}$; in calculations it stands for all the data in the interval.')
            }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'الفئة', 'interval'),
            say('zabalera', 'amplitud', 'طول الفئة', 'width'),
            say('parentesi karratua', 'corchete', 'القوس المربّع', 'square bracket')
        ],
        explanation: say(
            'Datu desberdin asko daudenean, zabalera bereko tarteetan biltzen dira, 140 eta 180 cm arteko altuerak 10 cm-ko tarteetan bezala. $[140,150)$ tarteak 140 hartzen du baina ez 150: parentesi karratuak muturra barne hartzen du, eta biribilak ez.',
            'Cuando hay muchos datos distintos, se agrupan en intervalos de la misma amplitud, como las alturas de 140 a 180 cm en tramos de 10 cm. El intervalo $[140,150)$ incluye el 140 y no el 150: el corchete incluye el extremo, y el paréntesis no.',
            'عندما تكثر البيانات المختلفة نجمعها في فئات متساوية الطول، مثل الأطوال من 140 إلى 180 سم في فئات طولها 10 سم. والفئة $[140,150)$ تضم 140 ولا تضم 150: القوس المربّع يضم الطرف والقوس العادي لا يضمه.',
            'When there are many different data, they are grouped in intervals of the same width, like heights from 140 to 180 cm in steps of 10 cm. The interval $[140,150)$ includes 140 but not 150: the square bracket includes the endpoint, and the round one does not.'
        ),
        examplePrompt: say('Denbora batzuk $[0,20)$, $[20,40)$ eta $[40,60)$ segundoko tarteetan biltzen dira. Zein tartetan doa 40 s, eta zein da haren klase-marka?', 'Unos tiempos se agrupan en $[0,20)$, $[20,40)$ y $[40,60)$ segundos. ¿En qué intervalo va 40 s y cuál es su marca de clase?', 'تُجمع أزمنة في الفئات $[0,20)$ و$[20,40)$ و$[40,60)$ ثانية. في أي فئة يقع 40 ث؟ وما مركزها؟', 'Some times are grouped in $[0,20)$, $[20,40)$ and $[40,60)$ seconds. Which interval does 40 s go in, and what is its class midpoint?'),
        example: same('$40\\in[40,60)\\qquad\\frac{40+60}{2}=50$'),
        exampleAnswer: say('$[40,60)$ tartean, 50 klase-markarekin: 40 zenbakiak irekitzen du tarte hori.', 'En $[40,60)$, de marca 50: el 40 abre ese intervalo.', 'في $[40,60)$ ومركزها 50: العدد 40 يبدأ هذه الفئة.', 'In $[40,60)$, with class midpoint 50: 40 opens that interval.')
    },
    'bar-histogram': {
        vocabulary: [
            say('histograma', 'histograma', 'المدرّج التكراري', 'histogram'),
            say('maiztasun-poligonoa', 'polígono de frecuencias', 'المضلّع التكراري', 'frequency polygon'),
            say('laukizuzenak', 'rectángulos', 'المستطيلات', 'rectangles')
        ],
        explanation: say(
            'Barra-diagraman, barra bakoitza balio bat da eta haren altuera maiztasuna; barrak bananduta doaz. Histograman, tarteetan bildutako datuekin, laukizuzenak itsatsita doaz, aldagaia jarraitua delako. Maiztasun-poligonoak barren goiko erdiko puntuak lotzen ditu.',
            'En un diagrama de barras, cada barra es un valor y su altura es la frecuencia; las barras van separadas. En un histograma, con datos en intervalos, los rectángulos van pegados, porque la variable es continua. El polígono de frecuencias une los puntos medios de lo alto de las barras.',
            'في مخطط الأعمدة كل عمود قيمة وارتفاعه التكرار، والأعمدة منفصلة. وفي المدرّج التكراري، مع بيانات مجمّعة في فئات، تكون المستطيلات ملتصقة لأن المتغير متصل. ويصل المضلّع التكراري بين منتصفات أعلى الأعمدة.',
            'In a bar chart, each bar is a value and its height is the frequency; the bars are separate. In a histogram, with data grouped in intervals, the rectangles touch, because the variable is continuous. The frequency polygon joins the midpoints of the tops of the bars.'
        ),
        examplePrompt: say('Histograma baten laukizuzenek 5, 11, 14 eta 10 neurtzen dute $[50,60)$, $[60,70)$, $[70,80)$ eta $[80,90)$ tarteetan. Datuen zer ehuneko dago 70 baino gutxiago?', 'Un histograma tiene rectángulos de 5, 11, 14 y 10 en $[50,60)$, $[60,70)$, $[70,80)$ y $[80,90)$. ¿Qué porcentaje de datos está por debajo de 70?', 'في مدرّج تكراري ارتفاعات المستطيلات 5 و11 و14 و10 في $[50,60)$ و$[60,70)$ و$[70,80)$ و$[80,90)$. ما نسبة البيانات الأقل من 70؟', 'A histogram has rectangles of 5, 11, 14 and 10 on $[50,60)$, $[60,70)$, $[70,80)$ and $[80,90)$. What percentage of the data is below 70?'),
        example: same('$\\frac{5+11}{40}\\cdot 100=40$'),
        exampleAnswer: say('% 40: 40 datuetatik 16.', 'El 40 %: 16 de los 40 datos.', '40٪: ‏16 من 40 بيانًا.', '40%: 16 of the 40 data.')
    },
    'pie-chart': {
        vocabulary: [
            say('sektorea', 'sector', 'القطاع', 'sector'),
            say('angelua', 'ángulo', 'الزاوية', 'angle'),
            say('ehunekoa', 'porcentaje', 'النسب المئوية', 'percentage')
        ],
        explanation: say(
            'Zirkulu osoa, 360°, datu guztiak dira. Sektore bakoitzaren angelua maiztasun erlatiboa bider 360° da, $\\frac{f}{N}\\cdot 360$; ehunekoekin, % 1 bakoitza 3,6° da. Aldagai kualitatiboetarako egokia da, zati bakoitzak osoan duen pisua ikusteko.',
            'El círculo entero, 360°, son todos los datos. El ángulo de cada sector es la frecuencia relativa por 360°, $\\frac{f}{N}\\cdot 360$; con porcentajes, cada 1 % son 3,6°. Va bien para variables cualitativas, para ver el peso de cada parte en el total.',
            'الدائرة كلها، 360°، هي كل البيانات. وزاوية كل قطاع هي التكرار النسبي في 360°، $\\frac{f}{N}\\cdot 360$؛ ومع النسب المئوية كل 1٪ يساوي 3.6°. ويناسب المتغيرات النوعية لرؤية وزن كل جزء من الكل.',
            'The whole circle, 360°, is all the data. The angle of each sector is the relative frequency times 360°, $\\frac{f}{N}\\cdot 360$; with percentages, each 1% is 3.6°. It suits qualitative variables, to see the weight of each part in the whole.'
        ),
        examplePrompt: say('Inkesta batean, saskibaloia nahiago dutenak % 15 dira. Zenbat gradu ditu haren sektoreak?', 'En una encuesta, el 15 % prefiere el baloncesto. ¿Cuántos grados mide su sector?', 'في استطلاع يفضّل 15٪ كرة السلة. كم درجة قطاعها؟', 'In a survey, 15% prefer basketball. How many degrees is its sector?'),
        example: same('$15\\cdot 3{,}6=54$'),
        exampleAnswer: say('54°: % 1 bakoitzeko 3,6°.', '54°: 3,6° por cada 1 %.', '54°: ‏3.6° لكل 1٪.', '54°: 3.6° for each 1%.')
    },
    'reading-charts': {
        vocabulary: [
            say('ardatz bertikala', 'eje vertical', 'المحور العمودي', 'vertical axis'),
            say('zeroa', 'cero', 'الصفر', 'zero'),
            say('azalera', 'área', 'مساحته', 'area')
        ],
        explanation: say(
            'Begiratu ardatz bertikala zeroan hasten den: hala ez bada, alde txikiak izugarriak dirudite, marrazkiko 3000 eta 3200 artean bezala. Marrazkidun grafikoetan, marrazki bat bi aldiz altuago eta zabalago egiten bada, haren azalera lau aldiz handiagoa da.',
            'Mira si el eje vertical empieza en cero: si no, diferencias pequeñas parecen enormes, como entre 3000 y 3200 en el dibujo. En los gráficos con dibujos, si un dibujo se hace el doble de alto y de ancho, su área se multiplica por cuatro.',
            'انظر هل يبدأ المحور العمودي من الصفر: إذا لم يبدأ منه بدت الفروق الصغيرة ضخمة، كما بين 3000 و3200 في الرسم. وفي التمثيلات بالصور، إذا صار الرسم ضعفي الطول والعرض صارت مساحته أربعة أضعاف.',
            'Check whether the vertical axis starts at zero: if not, small differences look huge, as between 3,000 and 3,200 in the drawing. In picture charts, if a picture is made twice as tall and twice as wide, its area is four times bigger.'
        ),
        examplePrompt: say('Salmentak 400 izatetik 420 izatera pasatzen dira, eta ardatza 390 zenbakian hasten da. Zenbat igo dira benetan?', 'Las ventas pasan de 400 a 420, y el eje empieza en 390. ¿Cuánto han subido de verdad?', 'ارتفعت المبيعات من 400 إلى 420، والمحور يبدأ من 390. كم ارتفعت فعلًا؟', 'Sales go from 400 to 420, and the axis starts at 390. How much have they really gone up?'),
        example: same('$\\frac{20}{400}\\cdot 100=5$'),
        exampleAnswer: say('% 5, nahiz eta barrak hiru aldiz altuagoa dirudien.', 'Un 5 %, aunque la barra parezca el triple de alta.', '5٪، وإن بدا العمود ثلاثة أضعاف.', '5%, even though the bar looks three times as tall.')
    },
    mean: {
        vocabulary: [
            say('batez bestekoa', 'media', 'المتوسط', 'mean'),
            say('maiztasuna', 'frecuencia', 'تكرار', 'frequency'),
            say('muturreko balioa', 'valor extremo', 'قيمة متطرفة', 'extreme value')
        ],
        explanation: say(
            'Batez bestekoa datu guztien batura zati datu kopurua da: $\\bar{x}=\\frac{\\Sigma x_{i}}{N}$. Taula batean, balio bakoitza bere maiztasunaz biderkatzen da: $\\bar{x}=\\frac{\\Sigma x_{i}f_{i}}{N}$. Datu guztiak erabiltzen ditu; horregatik mugitzen du asko muturreko balio batek.',
            'La media es la suma de todos los datos entre el número de datos: $\\bar{x}=\\frac{\\Sigma x_{i}}{N}$. En una tabla, cada valor se multiplica por su frecuencia: $\\bar{x}=\\frac{\\Sigma x_{i}f_{i}}{N}$. Usa todos los datos, y por eso un valor extremo la mueve mucho.',
            'المتوسط مجموع كل البيانات مقسومًا على عددها: $\\bar{x}=\\frac{\\Sigma x_{i}}{N}$. وفي الجدول نضرب كل قيمة في تكرارها: $\\bar{x}=\\frac{\\Sigma x_{i}f_{i}}{N}$. وهو يستعمل كل البيانات، ولذلك تحرّكه قيمة متطرفة كثيرًا.',
            'The mean is the sum of all the data divided by the number of data: $\\bar{x}=\\frac{\\Sigma x_{i}}{N}$. In a table, each value is multiplied by its frequency: $\\bar{x}=\\frac{\\Sigma x_{i}f_{i}}{N}$. It uses all the data, so an extreme value moves it a lot.'
        ),
        examplePrompt: say('Taula: $x_{i}=10,\\,20,\\,30$ eta $f_{i}=2,\\,5,\\,3$. Zein da batez bestekoa?', 'Tabla: $x_{i}=10,\\,20,\\,30$ y $f_{i}=2,\\,5,\\,3$. ¿Cuál es la media?', 'جدول: $x_{i}=10,\\,20,\\,30$ و$f_{i}=2,\\,5,\\,3$. ما المتوسط؟', 'Table: $x_{i}=10,\\,20,\\,30$ and $f_{i}=2,\\,5,\\,3$. What is the mean?'),
        example: same('$\\frac{10\\cdot 2+20\\cdot 5+30\\cdot 3}{10}=\\frac{210}{10}=21$'),
        exampleAnswer: say('21: $N=10$ zenbakiaz zatitzen da, ez 3 zenbakiaz.', '21: se divide entre $N=10$, no entre 3.', '21: نقسم على $N=10$ لا على 3.', '21: divide by $N=10$, not by 3.'),
        why: {
            text: say(
                'Batez bestekoa denek izango luketen balioa da, osoa zati berdinetan banatuko balitz: hiru lagunek 6, 8 eta 7 goxoki badituzte, elkartu eta banatuz gero, 7 dagokio bakoitzari.',
                'La media es el valor que tendrían todos si se repartiera el total a partes iguales: si tres amigos tienen 6, 8 y 7 caramelos, al juntarlos y repartirlos tocan a 7.',
                'المتوسط هو القيمة التي يأخذها الجميع لو وُزّع المجموع بالتساوي: إذا كان مع ثلاثة أصدقاء 6 و8 و7 حلوى، فعند جمعها وتوزيعها يأخذ كل واحد 7.',
                'The mean is what everyone would have if the total were shared out equally: if three friends have 6, 8 and 7 sweets, putting them together and sharing them out gives 7 each.'
            ),
            math: same('$\\frac{6+8+7}{3}=7$')
        }
    },
    median: {
        vocabulary: [
            say('ordenatuta', 'ordenados', 'مرتبة', 'in order'),
            say('erdiko datua', 'dato central', 'القيمة الوسطى', 'middle value'),
            say('bikoitia', 'par', 'زوجيًا', 'even')
        ],
        explanation: say(
            'Mediana datuak ordenatuta daudenean erdian geratzen den balioa da. Datu kopurua bakoitia bada, erdiko datua da; bikoitia bada, erdiko bien batez bestekoa. Muturreko balioek ez dute mugitzen: batzuetan batez bestekoak baino hobeto deskribatzen du talde bat.',
            'La mediana es el valor que queda en medio cuando los datos están ordenados. Si el número de datos es impar, es el dato central; si es par, la media de los dos centrales. Los valores extremos no la mueven: a veces describe un grupo mejor que la media.',
            'الوسيط هو القيمة التي تقع في الوسط عندما تكون البيانات مرتبة. إذا كان عدد البيانات فرديًا فهو القيمة الوسطى، وإذا كان زوجيًا فمتوسط القيمتين الوسطيين. ولا تحرّكه القيم المتطرفة، فقد يصف المجموعة أفضل من المتوسط.',
            'The median is the value left in the middle when the data are in order. If the number of data is odd, it is the middle value; if it is even, the mean of the two middle ones. Extreme values do not move it: sometimes it describes a group better than the mean.'
        ),
        examplePrompt: say('Datuak: $12,\\ 5,\\ 40,\\ 8,\\ 10$. Zein da mediana? Eta batez bestekoa?', 'Datos: $12,\\ 5,\\ 40,\\ 8,\\ 10$. ¿Cuál es la mediana? ¿Y la media?', 'البيانات: $12,\\ 5,\\ 40,\\ 8,\\ 10$. ما الوسيط؟ وما المتوسط؟', 'Data: $12,\\ 5,\\ 40,\\ 8,\\ 10$. What is the median? And the mean?'),
        example: same('$\\begin{gathered}5,\\ 8,\\ 10,\\ 12,\\ 40\\ \\to\\ Me=10\\\\ \\bar{x}=\\frac{75}{5}=15\\end{gathered}$'),
        exampleAnswer: say('Mediana 10 eta batez bestekoa 15: 40 zenbakiak batez bestekoa igotzen du, baina ez mediana.', 'Mediana 10 y media 15: el 40 sube la media, pero no la mediana.', 'الوسيط 10 والمتوسط 15: العدد 40 يرفع المتوسط لا الوسيط.', 'Median 10 and mean 15: the 40 raises the mean, but not the median.')
    },
    mode: {
        vocabulary: [
            say('maiztasunik handiena', 'mayor frecuencia', 'أكبر تكرار', 'highest frequency'),
            say('simetrikoak', 'simétricos', 'متماثلة', 'symmetrical'),
            say('mediana', 'mediana', 'الوسيط', 'median')
        ],
        explanation: say(
            'Moda maiztasunik handiena duen balioa da, eta aldagai kualitatiboekin ere balio du. Moda bat baino gehiago egon daitezke. Datuak simetrikoak badira, batez bestekoa, mediana eta moda antzekoak dira; muturreko balioak badaude, medianak hobeto deskribatzen du taldea.',
            'La moda es el valor con mayor frecuencia, y también sirve con variables cualitativas. Puede haber más de una moda. Si los datos son simétricos, media, mediana y moda se parecen; si hay valores extremos, la mediana describe mejor el grupo.',
            'المنوال هو القيمة ذات أكبر تكرار، ويصلح أيضًا للمتغيرات النوعية. وقد يكون هناك أكثر من منوال. وإذا كانت البيانات متماثلة تقاربت المتوسط والوسيط والمنوال، وإذا وُجدت قيم متطرفة فالوسيط يصف المجموعة أفضل.',
            'The mode is the value with the highest frequency, and it also works with qualitative variables. There may be more than one mode. If the data are symmetrical, mean, median and mode are alike; if there are extreme values, the median describes the group better.'
        ),
        examplePrompt: say('Kolore gogokoenak: urdina 7, gorria 9, berdea 9 eta beltza 4. Zein da moda?', 'Colores favoritos: azul 7, rojo 9, verde 9 y negro 4. ¿Cuál es la moda?', 'الألوان المفضلة: الأزرق 7، والأحمر 9، والأخضر 9، والأسود 4. ما المنوال؟', 'Favourite colours: blue 7, red 9, green 9 and black 4. What is the mode?'),
        example: '',
        exampleAnswer: say('Bi moda daude: gorria eta berdea, 9 bakoitza. Koloreekin ezin da batez bestekoa kalkulatu.', 'Hay dos modas: rojo y verde, con 9 cada uno. Con colores no se puede calcular la media.', 'هناك منوالان: الأحمر والأخضر، 9 لكل منهما. ولا يمكن حساب المتوسط مع الألوان.', 'There are two modes: red and green, with 9 each. You cannot work out a mean with colours.')
    },
    'range-quartiles': {
        definitions: [
            {
                term: say('Ibiltartea', 'Recorrido', 'المدى', 'Range'),
                meaning: say('Daturik handiena ken txikiena.', 'El dato mayor menos el menor.', 'أكبر قيمة ناقص أصغر قيمة.', 'The largest value minus the smallest.')
            },
            {
                term: say('Kuartilak', 'Cuartiles', 'الربيعيات', 'Quartiles'),
                meaning: say('Datu ordenatuak lau zati berdinetan banatzen dituzten $Q_{1}$, $Q_{2}$ eta $Q_{3}$ balioak.', 'Los valores $Q_{1}$, $Q_{2}$ y $Q_{3}$ que dividen los datos ordenados en cuatro partes iguales.', 'القيم $Q_{1}$ و$Q_{2}$ و$Q_{3}$ التي تقسم البيانات المرتبة إلى أربعة أجزاء متساوية.', 'The values $Q_{1}$, $Q_{2}$ and $Q_{3}$ that split the ordered data into four equal parts.')
            }
        ],
        vocabulary: [
            say('posizioa', 'posición', 'الموضع', 'position'),
            say('laurdena', 'cuarta parte', 'الربع', 'quarter'),
            say('datu ordenatuak', 'datos ordenados', 'البيانات المرتبة', 'ordered data')
        ],
        explanation: say(
            '$Q_{1}$ kuartilak datuen laurdena uzten du azpian, $Q_{2}$ medianak erdia eta $Q_{3}$ kuartilak hiru laurden. $Q_{1}$ aurkitzeko, kalkulatu $\\frac{N}{4}$: osoa bada, posizio horretako datuaren eta hurrengoaren batez bestekoa; bestela, hurrengo datua.',
            '$Q_{1}$ deja por debajo la cuarta parte de los datos, la mediana $Q_{2}$ la mitad y $Q_{3}$ tres cuartas partes. Para hallar $Q_{1}$, calcula $\\frac{N}{4}$: si es entero, la media del dato de esa posición y el siguiente; si no, el dato siguiente.',
            'يترك $Q_{1}$ تحته ربع البيانات، والوسيط $Q_{2}$ نصفها، و$Q_{3}$ ثلاثة أرباعها. ولإيجاد $Q_{1}$ احسب $\\frac{N}{4}$: إذا كان صحيحًا فمتوسط القيمة في ذلك الموضع والتي تليها، وإلا فالقيمة التالية.',
            '$Q_{1}$ leaves a quarter of the data below it, the median $Q_{2}$ half and $Q_{3}$ three quarters. To find $Q_{1}$, work out $\\frac{N}{4}$: if it is whole, the mean of the value in that position and the next; if not, the next value.'
        ),
        examplePrompt: say('Datu ordenatuak: $2,\\ 4,\\ 4,\\ 5,\\ 7,\\ 8,\\ 9,\\ 10,\\ 12,\\ 13$. Kalkulatu ibiltartea eta $Q_{3}$.', 'Datos ordenados: $2,\\ 4,\\ 4,\\ 5,\\ 7,\\ 8,\\ 9,\\ 10,\\ 12,\\ 13$. Calcula el recorrido y $Q_{3}$.', 'بيانات مرتبة: $2,\\ 4,\\ 4,\\ 5,\\ 7,\\ 8,\\ 9,\\ 10,\\ 12,\\ 13$. احسب المدى و$Q_{3}$.', 'Ordered data: $2,\\ 4,\\ 4,\\ 5,\\ 7,\\ 8,\\ 9,\\ 10,\\ 12,\\ 13$. Work out the range and $Q_{3}$.'),
        example: same('$\\begin{gathered}13-2=11\\\\ \\frac{3\\cdot 10}{4}=7{,}5\\ \\to\\ Q_{3}=10\\end{gathered}$'),
        exampleAnswer: say('Ibiltartea 11 eta $Q_{3}=10$, 8. datua.', 'Recorrido 11 y $Q_{3}=10$, el 8.º dato.', 'المدى 11 و$Q_{3}=10$، القيمة الثامنة.', 'Range 11 and $Q_{3}=10$, the 8th value.')
    },
    'box-plot': {
        vocabulary: [
            say('kutxa', 'caja', 'الصندوق', 'box'),
            say('biboteak', 'bigotes', 'الشاربان', 'whiskers'),
            say('kuartil arteko heina', 'rango intercuartílico', 'المدى الربيعي', 'interquartile range')
        ],
        explanation: say(
            'Kutxa-diagramak bost zenbaki erakusten ditu: minimoa, $Q_{1}$, mediana, $Q_{3}$ eta maximoa. Kutxa $Q_{1}$ kuartiletik $Q_{3}$ kuartilera doa eta datuen erdia du; haren luzera kuartil arteko heina da, $Q_{3}-Q_{1}$. Biboteak muturretaraino iristen dira.',
            'El diagrama de caja muestra cinco números: el mínimo, $Q_{1}$, la mediana, $Q_{3}$ y el máximo. La caja va de $Q_{1}$ a $Q_{3}$ y tiene la mitad de los datos; su longitud es el rango intercuartílico, $Q_{3}-Q_{1}$. Los bigotes llegan hasta los extremos.',
            'يعرض مخطط الصندوق خمسة أعداد: الصغرى و$Q_{1}$ والوسيط و$Q_{3}$ والعظمى. ويمتد الصندوق من $Q_{1}$ إلى $Q_{3}$ ويحوي نصف البيانات، وطوله المدى الربيعي $Q_{3}-Q_{1}$. ويصل الشاربان حتى الطرفين.',
            'The box plot shows five numbers: the minimum, $Q_{1}$, the median, $Q_{3}$ and the maximum. The box goes from $Q_{1}$ to $Q_{3}$ and holds half the data; its length is the interquartile range, $Q_{3}-Q_{1}$. The whiskers reach the extremes.'
        ),
        examplePrompt: say('Kutxa bat $Q_{1}=12$ kuartiletik $Q_{3}=20$ kuartilera doa, 5 minimoarekin eta 31 maximoarekin. Zein dira ibiltartea eta kuartil arteko heina?', 'Una caja va de $Q_{1}=12$ a $Q_{3}=20$, con mínimo 5 y máximo 31. ¿Cuáles son el recorrido y el rango intercuartílico?', 'صندوق يمتد من $Q_{1}=12$ إلى $Q_{3}=20$، والصغرى 5 والعظمى 31. ما المدى والمدى الربيعي؟', 'A box goes from $Q_{1}=12$ to $Q_{3}=20$, with minimum 5 and maximum 31. What are the range and the interquartile range?'),
        example: same('$31-5=26\\qquad 20-12=8$'),
        exampleAnswer: say('Ibiltartea 26 eta kuartil arteko heina 8: erdiko erdia oso elkarrengandik hurbil dago.', 'Recorrido 26 y rango intercuartílico 8: la mitad central está muy junta.', 'المدى 26 والمدى الربيعي 8: النصف الأوسط متقارب جدًا.', 'Range 26 and interquartile range 8: the middle half is tightly packed.')
    },
    variance: {
        definitions: [
            {
                term: say('Desbideratze tipikoa', 'Desviación típica', 'الانحراف المعياري', 'Standard deviation'),
                meaning: say('Bariantzaren erro karratua, $\\sigma$; datuen unitate beretan neurtzen da.', 'La raíz cuadrada de la varianza, $\\sigma$; se mide en las mismas unidades que los datos.', 'الجذر التربيعي للتباين $\\sigma$، ويُقاس بوحدات البيانات نفسها.', 'The square root of the variance, $\\sigma$; it is measured in the same units as the data.')
            }
        ],
        vocabulary: [
            say('bariantza', 'varianza', 'التباين', 'variance'),
            say('sakabanatuak', 'dispersos', 'متشتتة', 'spread out'),
            say('koefizientea', 'coeficiente', 'معامل', 'coefficient')
        ],
        explanation: say(
            'Bariantza batez bestekorako distantzien karratuen batez bestekoa da: $\\sigma^{2}=\\frac{\\Sigma(x_{i}-\\bar{x})^{2}}{N}$. Zenbat eta handiagoa izan desbideratze tipikoa, orduan eta sakabanatuago daude datuak. Aldakuntza-koefizienteak, $\\frac{\\sigma}{\\bar{x}}$, batez besteko desberdineko taldeak konparatzen ditu.',
            'La varianza es la media de los cuadrados de las distancias a la media: $\\sigma^{2}=\\frac{\\Sigma(x_{i}-\\bar{x})^{2}}{N}$. Cuanto mayor es la desviación típica, más dispersos están los datos. El coeficiente de variación, $\\frac{\\sigma}{\\bar{x}}$, compara grupos con medias distintas.',
            'التباين متوسط مربعات المسافات عن المتوسط: $\\sigma^{2}=\\frac{\\Sigma(x_{i}-\\bar{x})^{2}}{N}$. وكلما كبر الانحراف المعياري كانت البيانات متشتتة أكثر. ويقارن معامل الاختلاف $\\frac{\\sigma}{\\bar{x}}$ بين مجموعات متوسطاتها مختلفة.',
            'The variance is the mean of the squares of the distances to the mean: $\\sigma^{2}=\\frac{\\Sigma(x_{i}-\\bar{x})^{2}}{N}$. The bigger the standard deviation, the more spread out the data. The coefficient of variation, $\\frac{\\sigma}{\\bar{x}}$, compares groups with different means.'
        ),
        examplePrompt: say('Datuak: $1,\\ 3,\\ 5$. Kalkulatu bariantza eta desbideratze tipikoa.', 'Datos: $1,\\ 3,\\ 5$. Calcula la varianza y la desviación típica.', 'البيانات: $1,\\ 3,\\ 5$. احسب التباين والانحراف المعياري.', 'Data: $1,\\ 3,\\ 5$. Work out the variance and the standard deviation.'),
        example: same('$\\sigma^{2}=\\frac{4+0+4}{3}\\approx 2{,}67\\qquad\\sigma\\approx 1{,}63$'),
        exampleAnswer: say('Batez bestekoa 3 da; $\\sigma^{2}\\approx 2{,}67$ eta $\\sigma\\approx 1{,}63$.', 'La media es 3; $\\sigma^{2}\\approx 2{,}67$ y $\\sigma\\approx 1{,}63$.', 'المتوسط 3؛ ‏$\\sigma^{2}\\approx 2{,}67$ و$\\sigma\\approx 1{,}63$.', 'The mean is 3; $\\sigma^{2}\\approx 2{,}67$ and $\\sigma\\approx 1{,}63$.')
    },
    events: {
        definitions: [
            {
                term: say('Lagin-espazioa', 'Espacio muestral', 'فضاء العيّنة', 'Sample space'),
                meaning: say('Emaitza posible guztien $E$ multzoa.', 'El conjunto $E$ de todos los resultados posibles.', 'المجموعة $E$ لكل النتائج الممكنة.', 'The set $E$ of all the possible outcomes.')
            },
            {
                term: say('Aurkako gertaera', 'Suceso contrario', 'الحدث المعاكس', 'Complementary event'),
                meaning: say('$\\bar{A}$: $A$ gertatzen ez denean gertatzen da.', '$\\bar{A}$: ocurre cuando no ocurre $A$.', '$\\bar{A}$: يقع عندما لا يقع $A$.', '$\\bar{A}$: it happens when $A$ does not.')
            }
        ],
        vocabulary: [
            say('ausazko esperimentua', 'experimento aleatorio', 'تجربة عشوائية', 'random experiment'),
            say('gertaera', 'suceso', 'الحدث', 'event'),
            say('bateraezinak', 'incompatibles', 'متنافيين', 'mutually exclusive')
        ],
        explanation: say(
            'Ausazko esperimentu batean ezin da jakin zer aterako den, emaitza posibleak ezagutu arren. Gertaera bat lagin-espazioaren zati bat da: dado batean, «bikoitia» $A=\\{2,4,6\\}$ da. Bi gertaera bateraezinak dira aldi berean gerta ezin badira.',
            'En un experimento aleatorio no se puede saber qué saldrá, aunque se conozcan los resultados posibles. Un suceso es una parte del espacio muestral: en un dado, «par» es $A=\\{2,4,6\\}$. Dos sucesos son incompatibles si no pueden ocurrir a la vez.',
            'في التجربة العشوائية لا يمكن معرفة ما سيظهر وإن عرفنا النتائج الممكنة. والحدث جزء من فضاء العيّنة: في النرد «زوجي» هو $A=\\{2,4,6\\}$. ويكون حدثان متنافيين إذا لم يمكن وقوعهما معًا.',
            'In a random experiment you cannot know what will come out, even if you know the possible outcomes. An event is part of the sample space: on a dice, «even» is $A=\\{2,4,6\\}$. Two events are mutually exclusive if they cannot happen at the same time.'
        ),
        examplePrompt: say('Lau kartatatik bat ateratzen da: 1, 2, 3 eta 4. $A$: «bikoitia atera»; $B$: «1 atera». Bateraezinak dira? Zein da $\\bar{A}$?', 'Se saca una carta de cuatro: 1, 2, 3 y 4. $A$: «sale par»; $B$: «sale 1». ¿Son incompatibles? ¿Cuál es $\\bar{A}$?', 'نسحب بطاقة من أربع: 1 و2 و3 و4. $A$: «تظهر زوجية»؛ $B$: «يظهر 1». هل هما متنافيان؟ وما $\\bar{A}$؟', 'A card is drawn from four: 1, 2, 3 and 4. $A$: «even»; $B$: «1». Are they mutually exclusive? What is $\\bar{A}$?'),
        example: same('$\\begin{gathered}A=\\{2,4\\}\\\\ B=\\{1\\}\\\\ \\bar{A}=\\{1,3\\}\\end{gathered}$'),
        exampleAnswer: say('Bai, bateraezinak dira: ez dute emaitza komunik.', 'Sí, son incompatibles: no tienen ningún resultado en común.', 'نعم، هما متنافيان: لا نتيجة مشتركة بينهما.', 'Yes, they are mutually exclusive: they have no outcome in common.')
    },
    laplace: {
        definitions: [
            {
                term: say('Laplaceren erregela', 'Regla de Laplace', 'قاعدة لابلاس', 'Laplace’s rule'),
                meaning: say('Emaitza guztiak berdin probableak badira, gertaera baten probabilitatea kasu aldekoak zati kasu posibleak da.', 'Si todos los resultados son igual de probables, la probabilidad de un suceso es casos favorables entre casos posibles.', 'إذا كانت كل النتائج متساوية الاحتمال فاحتمال الحدث هو عدد الحالات الملائمة على عدد الحالات الممكنة.', 'If every outcome is equally likely, the probability of an event is favourable cases over possible cases.')
            }
        ],
        vocabulary: [
            say('probabilitatea', 'probabilidad', 'الاحتمال', 'probability'),
            say('aurkako gertaera', 'suceso contrario', 'الحدث المعاكس', 'complementary event'),
            say('maiztasun erlatiboa', 'frecuencia relativa', 'التكرار النسبي', 'relative frequency')
        ],
        explanation: say(
            'Probabilitatea beti dago 0 eta 1 artean: 0 ezinezkoa da eta 1 ziurra. Aurkako gertaerarena $P(\\bar{A})=1-P(A)$ da. Bi dadorekin 36 emaitza daude, denak berdin probableak. Asko errepikatzean, maiztasun erlatiboa probabilitatera hurbiltzen da.',
            'La probabilidad siempre está entre 0 y 1: 0 es imposible y 1, seguro. La del suceso contrario es $P(\\bar{A})=1-P(A)$. Con dos dados hay 36 resultados igual de probables. Al repetir muchas veces, la frecuencia relativa se acerca a la probabilidad.',
            'الاحتمال دائمًا بين 0 و1: 0 مستحيل و1 مؤكد. واحتمال الحدث المعاكس $P(\\bar{A})=1-P(A)$. ومع نردين توجد 36 نتيجة متساوية الاحتمال. وعند التكرار كثيرًا يقترب التكرار النسبي من الاحتمال.',
            'A probability is always between 0 and 1: 0 is impossible and 1 certain. That of the complementary event is $P(\\bar{A})=1-P(A)$. With two dice there are 36 equally likely outcomes. Repeating many times, the relative frequency gets close to the probability.'
        ),
        examplePrompt: say('Txanpon bat eta dado bat botatzen dira. Zein da aurpegia eta 4 baino handiagoa ateratzeko probabilitatea?', 'Se lanzan una moneda y un dado. ¿Cuál es la probabilidad de sacar cara y un número mayor que 4?', 'نرمي قطعة نقود ونردًا. ما احتمال ظهور الوجه وعدد أكبر من 4؟', 'A coin and a dice are thrown. What is the probability of heads and a number greater than 4?'),
        example: same('$\\frac{2}{12}=\\frac{1}{6}$'),
        exampleAnswer: say('$\\frac{1}{6}$: 12 emaitza daude, eta 2 aldekoak dira, aurpegia 5 zenbakiarekin eta aurpegia 6 zenbakiarekin.', '$\\frac{1}{6}$: hay 12 resultados, y 2 son favorables: cara con 5 y cara con 6.', '$\\frac{1}{6}$: هناك 12 نتيجة، اثنتان منها ملائمتان: الوجه مع 5 والوجه مع 6.', '$\\frac{1}{6}$: there are 12 outcomes, and 2 are favourable: heads with 5 and heads with 6.'),
        why: {
            text: say(
                'Kasu aldekoak kasu posibleen artean daude: ezin dira gehiago izan, ezta zero baino gutxiago ere. Horregatik zatidura beti dago 0 eta 1 artean, eta aldekoak eta aurkakoak batera, kasu guztiak.',
                'Los casos favorables están entre los posibles: no pueden ser más, ni menos de cero. Por eso el cociente siempre está entre 0 y 1, y favorables y contrarios juntos son todos los casos.',
                'الحالات الملائمة جزء من الحالات الممكنة: لا يمكن أن تكون أكثر منها ولا أقل من الصفر. لذلك يكون حاصل القسمة دائمًا بين 0 و1، والملائمة مع المعاكسة هي كل الحالات.',
                'The favourable cases are among the possible ones: there cannot be more of them, nor fewer than zero. That is why the quotient is always between 0 and 1, and favourable and complementary cases together are all of them.'
            ),
            math: same('$\\frac{3}{8}+\\frac{5}{8}=1$')
        }
    },
    compound: {
        vocabulary: [
            say('zuhaitz-diagrama', 'diagrama de árbol', 'المخطط الشجري', 'tree diagram'),
            say('adarrak', 'ramas', 'الفروع', 'branches'),
            say('itzuli gabe', 'sin devolver', 'دون إرجاع', 'without replacing')
        ],
        explanation: say(
            'Zuhaitz-diagrama batek pauso bat baino gehiagoko esperimentu baten emaitza guztiak erakusten ditu, hiru txanpon botatzean bezala. Bide baten probabilitatea haren adarren biderkadura da, eta bide batzuek gertaera bera ematen badute, batu egiten dira. Itzuli gabe ateratzean, bigarren adarrak aldatu egiten dira.',
            'Un diagrama de árbol muestra todos los resultados de un experimento de varios pasos, como lanzar tres monedas. La probabilidad de un camino es el producto de sus ramas, y si varios caminos dan el mismo suceso, se suman. Al sacar sin devolver, las segundas ramas cambian.',
            'يعرض المخطط الشجري كل نتائج تجربة من عدة خطوات، مثل رمي ثلاث قطع نقود. واحتمال المسار حاصل ضرب فروعه، وإذا أعطت عدة مسارات الحدث نفسه نجمع احتمالاتها. وعند السحب دون إرجاع تتغير الفروع الثانية.',
            'A tree diagram shows all the outcomes of an experiment with several steps, like throwing three coins. The probability of a path is the product of its branches, and if several paths give the same event, they are added. Drawing without replacing, the second branches change.'
        ),
        examplePrompt: say('Hiru txanpon botatzen dira. Zein da hiru aurpegi ateratzeko probabilitatea? Eta zehazki bi?', 'Se lanzan tres monedas. ¿Cuál es la probabilidad de sacar tres caras? ¿Y exactamente dos?', 'نرمي ثلاث قطع نقود. ما احتمال ظهور ثلاثة وجوه؟ وما احتمال ظهور وجهين بالضبط؟', 'Three coins are thrown. What is the probability of three heads? And of exactly two?'),
        example: same('$\\frac{1}{2}\\cdot\\frac{1}{2}\\cdot\\frac{1}{2}=\\frac{1}{8}\\qquad 3\\cdot\\frac{1}{8}=\\frac{3}{8}$'),
        exampleAnswer: say('$\\frac{1}{8}$ eta $\\frac{3}{8}$: bi aurpegi dituzten hiru bide daude.', '$\\frac{1}{8}$ y $\\frac{3}{8}$: hay tres caminos con dos caras.', '$\\frac{1}{8}$ و$\\frac{3}{8}$: هناك ثلاثة مسارات فيها وجهان.', '$\\frac{1}{8}$ and $\\frac{3}{8}$: there are three paths with two heads.'),
        why: {
            text: say(
                'Lehen txanponean, aldien erdian aurpegia ateratzen da, eta horietatik erdian berriro aurpegia. Bi aurpegiak, beraz, erdiaren erdian: horregatik biderkatzen dira adarrak.',
                'En la primera moneda sale cara la mitad de las veces, y de esas, la mitad otra vez cara. Las dos caras salen, por tanto, en la mitad de la mitad: por eso se multiplican las ramas.',
                'في القطعة الأولى يظهر الوجه في نصف المرات، ومن هذه يظهر الوجه مرة أخرى في نصفها. فالوجهان يظهران في نصف النصف: لذلك نضرب الفروع.',
                'On the first coin, heads comes up half the time, and of those, half again it is heads. So two heads come up in half of a half: that is why the branches are multiplied.'
            ),
            math: same('$\\frac{1}{2}\\cdot\\frac{1}{2}=\\frac{1}{4}$')
        }
    }
}

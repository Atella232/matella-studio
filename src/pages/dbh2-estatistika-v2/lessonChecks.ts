import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistika eta probabilitatea · 2. DBH — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. The questions use new
   numbers, never those of «Let's solve» or of the example, and one of their
   wrong answers is the lesson's typical mistake. The card has no drawing:
   tables and graphs are given in words. Percentages go in the words, as in
   the lessons (% 25 in Basque).
   ========================================================================== */

export type StatisticsTopicId = 'sample' | 'cumulative' | 'grouped' | 'histogram' | 'pie' | 'misleading' | 'mean-table' | 'median-table' | 'symmetry' | 'deviation' | 'quartiles' | 'box-plot' | 'events' | 'tree' | 'double-table'

/** As in lessons.tsx, the Arabic formulas get a decimal point */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const statisticsLessonChecks: Record<StatisticsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    sample: {
        mistake: {
            wrong: say('Herri bateko jendeak zenbat kirol egiten duen jakiteko, kiroldegitik ateratzen diren 100 pertsonari galdetzen diet.', 'Para saber cuánto deporte hace la gente de un pueblo, pregunto a 100 personas a la salida del polideportivo.', 'لأعرف كم يمارس سكان بلدة الرياضة، أسأل 100 شخص عند خروجهم من الصالة الرياضية.', 'To find out how much sport the people of a town do, I ask 100 people coming out of the sports centre.'),
            right: say('Lagin alboratua da: denek egiten dute kirola. Zoriz aukeratu behar da, talde guztietatik.', 'Es una muestra sesgada: todos hacen deporte. Hay que elegir al azar y de todos los grupos.', 'إنها عيّنة متحيّزة: كلهم يمارسون الرياضة. يجب الاختيار عشوائيًا ومن كل الفئات.', 'It is a biased sample: they all do sport. You must choose at random and from every group.')
        },
        check: {
            prompt: say('800 ikasleko institutu batean, ikasleek zer musika nahiago duten jakin nahi da. Zein lagin da hobea?', 'Se quiere saber qué música prefiere el alumnado de un instituto de 800 alumnos. ¿Qué muestra es mejor?', 'نريد أن نعرف الموسيقى التي يفضّلها تلاميذ مدرسة فيها 800 تلميذ. أيّ عيّنة أفضل؟', 'We want to know what music the 800 pupils of a school prefer. Which sample is best?'),
            options: [
                say('Abesbatzako 30 ikasleak', 'Los 30 alumnos del coro', 'تلاميذ الجوقة الثلاثون', 'The 30 pupils in the choir'),
                say('Maila guztietatik zoriz aukeratutako 80 ikasle', '80 alumnos elegidos al azar de todos los cursos', '80 تلميذًا مختارين عشوائيًا من كل الصفوف', '80 pupils chosen at random from every year'),
                say('Gela bateko 25 ikasleak', 'Los 25 alumnos de una clase', 'تلاميذ صف واحد الخمسة والعشرون', 'The 25 pupils of one class')
            ],
            correctIndex: 1,
            explanation: say('Zoriz eta maila guztietatik: horrela, laginak populazioa adierazten du. Abesbatza edo gela bakarra talde alboratuak dira.', 'Al azar y de todos los cursos: así la muestra representa a la población. El coro o una sola clase son grupos sesgados.', 'عشوائيًا ومن كل الصفوف: هكذا تمثّل العيّنة المجتمع. أما الجوقة أو صف واحد فمجموعات متحيّزة.', 'At random and from every year: that way the sample represents the population. The choir or a single class are biased groups.')
        }
    },
    cumulative: {
        mistake: {
            wrong: say('$F_2=11$ bada, 11 ikaslek 2 liburu irakurri dituzte, ez gehiago eta ez gutxiago.', 'Si $F_2=11$, 11 alumnos han leído exactamente 2 libros.', 'إذا كان $F_2=11$ فإن 11 تلميذًا قرؤوا كتابين بالضبط.', 'If $F_2=11$, 11 pupils have read exactly 2 books.'),
            right: say('$F_2$ zenbatzen ditu 2 liburu edo gutxiago irakurri dituztenak. Zehazki 2 irakurri dituztenak $f_2$ dira.', '$F_2$ cuenta los que han leído 2 libros o menos. Los que han leído exactamente 2 son $f_2$.', '$F_2$ يعدّ من قرؤوا كتابين أو أقل. أما من قرؤوا كتابين بالضبط فهم $f_2$.', '$F_2$ counts those who have read 2 books or fewer. Those who have read exactly 2 are $f_2$.')
        },
        check: {
            prompt: say('5, 6, 7 eta 8 noten maiztasunak 3, 6, 8 eta 3 dira (20 ikasle). Zenbat ikaslek dute 7 edo gutxiago?', 'Las notas 5, 6, 7 y 8 tienen frecuencias 3, 6, 8 y 3 (20 alumnos). ¿Cuántos alumnos tienen un 7 o menos?', 'تكرارات العلامات 5 و6 و7 و8 هي 3 و6 و8 و3 (20 تلميذًا). كم تلميذًا علامته 7 أو أقل؟', 'The marks 5, 6, 7 and 8 have frequencies 3, 6, 8 and 3 (20 pupils). How many pupils got a 7 or less?'),
            options: [same('$17$'), same('$8$'), same('$11$')],
            correctIndex: 0,
            explanation: say('7 notaren maiztasun metatua: $3+6+8=17$. 8 zehazki 7 dutenak dira, eta 11, 7 edo gehiago dutenak.', 'Frecuencia acumulada del 7: $3+6+8=17$. El 8 son solo los que tienen un 7, y 11, los que tienen un 7 o más.', 'التكرار المتجمّع للعلامة 7: $3+6+8=17$. أما 8 فهم من علامتهم 7 بالضبط، و11 من علامتهم 7 أو أكثر.', 'Cumulative frequency of 7: $3+6+8=17$. 8 is only those who got exactly 7, and 11 those who got 7 or more.')
        }
    },
    grouped: {
        mistake: {
            wrong: say('160 cm neurtzen dituen ikasle bat $[150,160)$ tartean doa.', 'Un alumno que mide 160 cm va en el intervalo $[150,160)$.', 'تلميذ طوله 160 سم يوضع في الفئة $[150,160)$.', 'A pupil who is 160 cm tall goes in the interval $[150,160)$.'),
            right: say('$[150,160)$ tartean 150 sartzen da, baina ez 160: ikasle hori $[160,170)$ tartean doa.', 'En $[150,160)$ entra el 150 pero no el 160: ese alumno va en $[160,170)$.', 'في $[150,160)$ يدخل 150 ولا يدخل 160: هذا التلميذ يوضع في $[160,170)$.', '$[150,160)$ includes 150 but not 160: that pupil goes in $[160,170)$.')
        },
        check: {
            prompt: say('Zein da $[20,30)$ tartearen klase-marka?', '¿Cuál es la marca de clase del intervalo $[20,30)$?', 'ما مركز الفئة $[20,30)$؟', 'What is the class mark of the interval $[20,30)$?'),
            options: [same('$10$'), same('$30$'), same('$25$')],
            correctIndex: 2,
            explanation: say('Klase-marka bi muturren erdia da: $\\frac{20+30}{2}=25$. 10 tartearen zabalera da.', 'La marca de clase es la mitad de los dos extremos: $\\frac{20+30}{2}=25$. El 10 es la amplitud del intervalo.', 'مركز الفئة منتصف الطرفين: $\\frac{20+30}{2}=25$. أما 10 فهو طول الفئة.', 'The class mark is halfway between the two ends: $\\frac{20+30}{2}=25$. 10 is the width of the interval.')
        }
    },
    histogram: {
        mistake: {
            wrong: say('Altueren histograman, tarte bat uzten dut laukizuzen batetik bestera, barra-diagrama batean bezala.', 'En el histograma de las alturas dejo un hueco entre rectángulo y rectángulo, como en un diagrama de barras.', 'في مدرّج الأطوال أترك فراغًا بين كل مستطيل وآخر، كما في المخطط بالأعمدة.', 'In the histogram of heights I leave a gap between the rectangles, as in a bar chart.'),
            right: say('Aldagaia jarraitua da: laukizuzenak itsatsita doaz, tarte bat amaitzen den lekuan hurrengoa hasten delako.', 'La variable es continua: los rectángulos van pegados, porque donde acaba un intervalo empieza el siguiente.', 'المتغيّر متصل: المستطيلات متلاصقة لأن كل فئة تبدأ حيث تنتهي السابقة.', 'The variable is continuous: the rectangles touch, because each interval starts where the last one ends.')
        },
        check: {
            prompt: say('Histograma batean, $[0,10)$, $[10,20)$ eta $[20,30)$ tarteen maiztasunak 4, 9 eta 5 dira. Zein puntu lotzen ditu maiztasun-poligonoak?', 'En un histograma, los intervalos $[0,10)$, $[10,20)$ y $[20,30)$ tienen frecuencias 4, 9 y 5. ¿Qué puntos une el polígono de frecuencias?', 'في مدرّج تكراري تكرارات الفئات $[0,10)$ و$[10,20)$ و$[20,30)$ هي 4 و9 و5. ما النقاط التي يصلها المضلّع التكراري؟', 'In a histogram, the intervals $[0,10)$, $[10,20)$ and $[20,30)$ have frequencies 4, 9 and 5. Which points does the frequency polygon join?'),
            options: [same('$(0,4),\\ (10,9),\\ (20,5)$'), same('$(5,4),\\ (15,9),\\ (25,5)$'), same('$(10,4),\\ (20,9),\\ (30,5)$')],
            correctIndex: 1,
            explanation: say('Poligonoak klase-marken gaineko puntuak lotzen ditu: 5, 15 eta 25, bakoitza bere maiztasunarekin.', 'El polígono une los puntos de arriba sobre las marcas de clase: 5, 15 y 25, cada uno con su frecuencia.', 'يصل المضلّع النقاط العليا فوق مراكز الفئات: 5 و15 و25، كلٌّ بتكراره.', 'The polygon joins the top points above the class marks: 5, 15 and 25, each with its frequency.')
        }
    },
    pie: {
        mistake: {
            wrong: say('% 25 bat 25°-ko sektore batekin marrazten da.', 'Un 25 % se dibuja con un sector de 25°.', 'تُرسم 25 % بقطاع زاويته 25°.', '25% is drawn as a 25° sector.'),
            right: say('% 1 = 3,6°: $25\\cdot 3{,}6=90^{\\circ}$, zirkuluaren laurden bat.', 'El 1 % son 3,6°: $25\\cdot 3{,}6=90^{\\circ}$, un cuarto del círculo.', '1 % = 3.6°: $25\\cdot 3{,}6=90^{\\circ}$، أي ربع الدائرة.', '1% is 3.6°: $25\\cdot 3{,}6=90^{\\circ}$, a quarter of the circle.')
        },
        check: {
            prompt: say('Sektore-diagrama batean, datuen zer ehuneko da 72°-ko sektore bat?', 'En un diagrama de sectores, ¿qué porcentaje de los datos es un sector de 72°?', 'في مخطط دائري، ما النسبة المئوية من البيانات التي يمثّلها قطاع زاويته 72°؟', 'In a pie chart, what percentage of the data is a 72° sector?'),
            options: [say('% 20', '20 %', '20 %', '20%'), say('% 72', '72 %', '72 %', '72%'), say('% 7,2', '7,2 %', '7.2 %', '7.2%')],
            correctIndex: 0,
            explanation: say('$\\frac{72}{360}=0{,}2$, hau da, % 20. Egiaztatu: $20\\cdot 3{,}6=72^{\\circ}$.', '$\\frac{72}{360}=0{,}2$, es decir, el 20 %. Comprueba: $20\\cdot 3{,}6=72^{\\circ}$.', '$\\frac{72}{360}=0{,}2$، أي 20 %. تحقّق: $20\\cdot 3{,}6=72^{\\circ}$.', '$\\frac{72}{360}=0{,}2$, that is 20%. Check: $20\\cdot 3{,}6=72^{\\circ}$.')
        }
    },
    misleading: {
        mistake: {
            wrong: say('Grafikoan, 2021 urteko barra 2020 urtekoaren bikoitza da: salmentak bikoiztu egin dira.', 'En la gráfica, la barra de 2021 es el doble de alta que la de 2020: las ventas se han duplicado.', 'في الرسم، عمود 2021 ضعف عمود 2020: إذن تضاعفت المبيعات.', 'In the chart, the 2021 bar is twice as tall as the 2020 one: sales have doubled.'),
            right: say('Begiratu non hasten den ardatz bertikala. Salmentak 5000 izan eta gero 5250 badira, % 5 bakarrik igo dira.', 'Mira dónde empieza el eje vertical. Si las ventas pasan de 5000 a 5250, solo han subido un 5 %.', 'انظر من أين يبدأ المحور الرأسي. إذا ارتفعت المبيعات من 5000 إلى 5250 فقد زادت 5 % فقط.', 'Look where the vertical axis starts. If sales go from 5000 to 5250, they have only gone up 5%.')
        },
        check: {
            prompt: say('Sektore-diagrama batek % 45, % 30 eta % 35 sektoreak ditu. Zer gertatzen da?', 'Un diagrama de sectores tiene sectores del 45 %, el 30 % y el 35 %. ¿Qué pasa?', 'مخطط دائري قطاعاته 45 % و30 % و35 %. ما المشكلة؟', 'A pie chart has sectors of 45%, 30% and 35%. What is wrong?'),
            options: [
                say('Ondo dago', 'Está bien hecho', 'إنه صحيح', 'Nothing, it is fine'),
                say('Sektorerik handiena % 35 da', 'El sector mayor es el del 35 %', 'أكبر قطاع هو 35 %', 'The biggest sector is the 35% one'),
                say('% 110 batzen dute: gaizki dago', 'Suman el 110 %: está mal', 'مجموعها 110 %: إنه خطأ', 'They add up to 110%: it is wrong')
            ],
            correctIndex: 2,
            explanation: say('$45+30+35=110$: sektore-diagrama batean ehunekoek 100 batu behar dute.', '$45+30+35=110$: en un diagrama de sectores los porcentajes tienen que sumar 100.', '$45+30+35=110$: في المخطط الدائري يجب أن يكون مجموع النسب 100.', '$45+30+35=110$: in a pie chart the percentages must add up to 100.')
        }
    },
    'mean-table': {
        mistake: {
            wrong: say('1, 2 eta 3 balioak, 5, 3 eta 2 maiztasunekin: batez bestekoa $=\\frac{1\\cdot 5+2\\cdot 3+3\\cdot 2}{3}$.', 'Valores 1, 2 y 3 con frecuencias 5, 3 y 2: media $=\\frac{1\\cdot 5+2\\cdot 3+3\\cdot 2}{3}$.', 'القيم 1 و2 و3 بالتكرارات 5 و3 و2: المتوسط $=\\frac{1\\cdot 5+2\\cdot 3+3\\cdot 2}{3}$.', 'Values 1, 2 and 3 with frequencies 5, 3 and 2: mean $=\\frac{1\\cdot 5+2\\cdot 3+3\\cdot 2}{3}$.'),
            right: say('Datu kopuruaz zatitzen da, $N=5+3+2=10$: $\\bar{x}=\\frac{17}{10}=1{,}7$.', 'Se divide entre el número de datos, $N=5+3+2=10$: $\\bar{x}=\\frac{17}{10}=1{,}7$.', 'نقسم على عدد البيانات $N=5+3+2=10$: $\\bar{x}=\\frac{17}{10}=1{,}7$.', 'You divide by the number of data, $N=5+3+2=10$: $\\bar{x}=\\frac{17}{10}=1{,}7$.')
        },
        check: {
            prompt: say('Partida bakoitzeko golak: 2 partidatan 0 gol, 5 partidatan gol 1 eta 3 partidatan 2 gol. Zein da batez bestekoa?', 'Goles por partido: 0 goles en 2 partidos, 1 gol en 5 y 2 goles en 3. ¿Cuál es la media?', 'الأهداف في كل مباراة: 0 هدف في مباراتين، وهدف واحد في 5، وهدفان في 3. ما المتوسط؟', 'Goals per match: 0 goals in 2 matches, 1 goal in 5 and 2 goals in 3. What is the mean?'),
            options: [same('$1$'), same('$1{,}1$'), same('$\\approx 3{,}7$')],
            correctIndex: 1,
            explanation: say('$\\frac{0\\cdot 2+1\\cdot 5+2\\cdot 3}{10}=\\frac{11}{10}=1{,}1$ gol. 10 partidez zatitzen da, ez 3 lerroez.', '$\\frac{0\\cdot 2+1\\cdot 5+2\\cdot 3}{10}=\\frac{11}{10}=1{,}1$ goles. Se divide entre los 10 partidos, no entre las 3 filas.', '$\\frac{0\\cdot 2+1\\cdot 5+2\\cdot 3}{10}=\\frac{11}{10}=1{,}1$ هدف. نقسم على المباريات العشر لا على الأسطر الثلاثة.', '$\\frac{0\\cdot 2+1\\cdot 5+2\\cdot 3}{10}=\\frac{11}{10}=1{,}1$ goals. You divide by the 10 matches, not by the 3 rows.')
        }
    },
    'median-table': {
        mistake: {
            wrong: say('4, 5, 6, 7 eta 8 notak, 1, 2, 3, 8 eta 6 maiztasunekin: mediana 6 da, erdiko lerroa.', 'Notas 4, 5, 6, 7 y 8 con frecuencias 1, 2, 3, 8 y 6: la mediana es 6, la fila del centro.', 'العلامات 4 و5 و6 و7 و8 بالتكرارات 1 و2 و3 و8 و6: الوسيط 6، السطر الأوسط.', 'Marks 4, 5, 6, 7 and 8 with frequencies 1, 2, 3, 8 and 6: the median is 6, the middle row.'),
            right: say('Datuetara joan behar da, ez lerroetara: $N=20$, 10. eta 11. datuak. Metatuak: 1, 3, 6, 14… biak 7 dira; beraz, $\\text{Me}=7$.', 'Hay que ir a los datos, no a las filas: $N=20$, datos 10.º y 11.º. Acumuladas: 1, 3, 6, 14… los dos son 7, así que $\\text{Me}=7$.', 'يجب النظر إلى البيانات لا إلى الأسطر: $N=20$، البيانان العاشر والحادي عشر. المتجمّعة: 1، 3، 6، 14… وكلاهما 7، إذن $\\text{Me}=7$.', 'Go to the data, not to the rows: $N=20$, the 10th and 11th data. Cumulative: 1, 3, 6, 14… both are 7, so $\\text{Me}=7$.')
        },
        check: {
            prompt: say('Ikasle bakoitzaren maskotak: 0 → 6, 1 → 3, 2 → 4, 3 → 2 ($N=15$). Zein da mediana?', 'Mascotas por alumno: 0 → 6, 1 → 3, 2 → 4, 3 → 2 ($N=15$). ¿Cuál es la mediana?', 'الحيوانات الأليفة لكل تلميذ: 0 ← 6، 1 ← 3، 2 ← 4، 3 ← 2 ($N=15$). ما الوسيط؟', 'Pets per pupil: 0 → 6, 1 → 3, 2 → 4, 3 → 2 ($N=15$). What is the median?'),
            options: [same('$1$'), same('$0$'), same('$1{,}5$')],
            correctIndex: 0,
            explanation: say('Erdiko postua: $\\frac{15+1}{2}=8$. Metatuak: 6, 9… 8. datua 1 da. 0 moda da, ez mediana.', 'Posición central: $\\frac{15+1}{2}=8$. Acumuladas: 6, 9… el dato 8.º es 1. El 0 es la moda, no la mediana.', 'الموقع الأوسط: $\\frac{15+1}{2}=8$. المتجمّعة: 6، 9… البيان الثامن هو 1. أما 0 فهو المنوال لا الوسيط.', 'Middle position: $\\frac{15+1}{2}=8$. Cumulative: 6, 9… the 8th piece of data is 1. 0 is the mode, not the median.')
        }
    },
    symmetry: {
        mistake: {
            wrong: say('Talde baten adinak: 12, 12, 13, 13, 50. Batez bestekoak, 20, ondo adierazten du taldea.', 'Edades de un grupo: 12, 12, 13, 13, 50. La media, 20, representa bien al grupo.', 'أعمار مجموعة: 12، 12، 13، 13، 50. المتوسط 20 يمثّل المجموعة جيدًا.', 'Ages in a group: 12, 12, 13, 13, 50. The mean, 20, represents the group well.'),
            right: say('50 muturreko balio bat da, eta batez bestekoa berarekin eramaten du. Medianak, 13, hobeto adierazten du.', 'El 50 es un valor extremo y arrastra la media. La mediana, 13, representa mejor.', 'العدد 50 قيمة متطرفة تسحب المتوسط. أما الوسيط 13 فيمثّل المجموعة أفضل.', '50 is an extreme value and drags the mean. The median, 13, represents them better.')
        },
        check: {
            prompt: say('Bost etxebizitzaren prezioak (milaka eurotan): 150, 160, 160, 170, 900. Zein baliok adierazten du hobeto prezio arrunta?', 'Precios de cinco pisos (en miles de €): 150, 160, 160, 170, 900. ¿Qué valor representa mejor el precio típico?', 'أسعار خمس شقق (بآلاف اليوروهات): 150، 160، 160، 170، 900. أيّ قيمة تمثّل السعر المعتاد أفضل؟', 'Prices of five flats (in thousands of euros): 150, 160, 160, 170, 900. Which value best represents the typical price?'),
            options: [
                say('Batez bestekoak, 308', 'La media, 308', 'المتوسط 308', 'The mean, 308'),
                say('Handienak, 900', 'El mayor, 900', 'الأكبر 900', 'The largest, 900'),
                say('Medianak, 160', 'La mediana, 160', 'الوسيط 160', 'The median, 160')
            ],
            correctIndex: 2,
            explanation: say('900 muturreko balio bat da: batez bestekoa 308 arte igotzen du, baina ia ez du mediana mugitzen, 160.', 'El 900 es un valor extremo: sube la media hasta 308, pero casi no mueve la mediana, 160.', 'العدد 900 قيمة متطرفة: يرفع المتوسط إلى 308 لكنه لا يكاد يحرّك الوسيط 160.', '900 is an extreme value: it pushes the mean up to 308, but hardly moves the median, 160.')
        }
    },
    deviation: {
        mistake: {
            wrong: say('2, 4 eta 9 datuak (batez bestekoa 5): distantziak $-3,\\ -1,\\ 4$; haien batez bestekoa 0 da.', 'Datos 2, 4 y 9 (media 5): distancias $-3,\\ -1,\\ 4$; su media es 0.', 'البيانات 2 و4 و9 (المتوسط 5): المسافات $-3,\\ -1,\\ 4$، ومتوسطها 0.', 'Data 2, 4 and 9 (mean 5): distances $-3,\\ -1,\\ 4$; their mean is 0.'),
            right: say('Distantziak beti positiboak dira: 3, 1 eta 4. $\\text{DM}=\\frac{3+1+4}{3}\\approx 2{,}67$.', 'Las distancias son siempre positivas: 3, 1 y 4. $\\text{DM}=\\frac{3+1+4}{3}\\approx 2{,}67$.', 'المسافات موجبة دائمًا: 3 و1 و4. $\\text{DM}=\\frac{3+1+4}{3}\\approx 2{,}67$.', 'Distances are always positive: 3, 1 and 4. $\\text{DM}=\\frac{3+1+4}{3}\\approx 2{,}67$.')
        },
        check: {
            prompt: say('Zein da 3, 5, 7 eta 9 datuen batez besteko desbideratzea?', '¿Cuál es la desviación media de los datos 3, 5, 7 y 9?', 'ما الانحراف المتوسط للبيانات 3 و5 و7 و9؟', 'What is the mean deviation of the data 3, 5, 7 and 9?'),
            options: [same('$2$'), same('$0$'), same('$6$')],
            correctIndex: 0,
            explanation: say('Batez bestekoa: 6. Distantziak: 3, 1, 1 eta 3. $\\text{DM}=\\frac{3+1+1+3}{4}=2$. 6 ibiltartea da, $9-3$.', 'Media: 6. Distancias: 3, 1, 1 y 3. $\\text{DM}=\\frac{3+1+1+3}{4}=2$. El 6 es el recorrido, $9-3$.', 'المتوسط: 6. المسافات: 3 و1 و1 و3. $\\text{DM}=\\frac{3+1+1+3}{4}=2$. أما 6 فهو المدى $9-3$.', 'Mean: 6. Distances: 3, 1, 1 and 3. $\\text{DM}=\\frac{3+1+1+3}{4}=2$. 6 is the range, $9-3$.')
        }
    },
    quartiles: {
        mistake: {
            wrong: say('7, 2, 9, 4, 5 datuak: mediana 9 da, erdikoa.', 'Datos 7, 2, 9, 4, 5: la mediana es 9, el del centro.', 'البيانات 7، 2، 9، 4، 5: الوسيط 9، الذي في الوسط.', 'Data 7, 2, 9, 4, 5: the median is 9, the one in the middle.'),
            right: say('Lehenik ordenatu egin behar da: 2, 4, 5, 7, 9. Mediana 5 da.', 'Primero hay que ordenar: 2, 4, 5, 7, 9. La mediana es 5.', 'يجب الترتيب أولًا: 2، 4، 5، 7، 9. الوسيط 5.', 'First you must put them in order: 2, 4, 5, 7, 9. The median is 5.')
        },
        check: {
            prompt: say('Datu ordenatuak: 1, 3, 4, 6, 7, 8, 10. Zenbat da $Q_1$?', 'Datos ordenados: 1, 3, 4, 6, 7, 8, 10. ¿Cuánto vale $Q_1$?', 'بيانات مرتّبة: 1، 3، 4، 6، 7، 8، 10. كم يساوي $Q_1$؟', 'Ordered data: 1, 3, 4, 6, 7, 8, 10. What is $Q_1$?'),
            options: [same('$6$'), same('$3$'), same('$1$')],
            correctIndex: 1,
            explanation: say('Mediana 4. datua da, 6. $Q_1$ beheko erdiaren mediana da (1, 3, 4): 3.', 'La mediana es el 4.º dato, 6. $Q_1$ es la mediana de la mitad de abajo (1, 3, 4): 3.', 'الوسيط هو البيان الرابع، 6. و$Q_1$ وسيط النصف الأدنى (1، 3، 4): 3.', 'The median is the 4th piece of data, 6. $Q_1$ is the median of the lower half (1, 3, 4): 3.')
        }
    },
    'box-plot': {
        mistake: {
            wrong: say('Eskuineko bibotea luzeagoa da; beraz, han datu gehiago daude.', 'El bigote de la derecha es más largo, así que ahí hay más datos.', 'الشارب الأيمن أطول، إذن فيه بيانات أكثر.', 'The right whisker is longer, so there is more data there.'),
            right: say('Zati bakoitzean datuen % 25 dago. Luzeagoak esan nahi du sakabanatuagoak, ez datu gehiago.', 'En cada parte hay el 25 % de los datos. Más largo quiere decir más dispersos, no más datos.', 'في كل جزء 25 % من البيانات. الأطول يعني أكثر تشتتًا لا بيانات أكثر.', 'Each part holds 25% of the data. Longer means more spread out, not more data.')
        },
        check: {
            prompt: say('Kutxa-diagrama batean: minimoa 2, $Q_1=4$, $\\text{Me}=5$, $Q_3=9$, maximoa 10. Datuen zer ehuneko dago 4 eta 9 artean?', 'En un diagrama de caja: mínimo 2, $Q_1=4$, $\\text{Me}=5$, $Q_3=9$, máximo 10. ¿Qué porcentaje de los datos está entre 4 y 9?', 'في مخطط صندوقي: الأدنى 2، $Q_1=4$، $\\text{Me}=5$، $Q_3=9$، الأعلى 10. ما النسبة المئوية للبيانات بين 4 و9؟', 'In a box plot: minimum 2, $Q_1=4$, $\\text{Me}=5$, $Q_3=9$, maximum 10. What percentage of the data lies between 4 and 9?'),
            options: [say('% 25', '25 %', '25 %', '25%'), say('% 75', '75 %', '75 %', '75%'), say('% 50', '50 %', '50 %', '50%')],
            correctIndex: 2,
            explanation: say('$Q_1$ eta $Q_3$ artean kutxa dago: datuen erdiko % 50, nahiz eta 5 eta 9 arteko zatia luzeagoa izan.', 'Entre $Q_1$ y $Q_3$ está la caja: el 50 % central de los datos, aunque la parte de 5 a 9 sea más larga.', 'بين $Q_1$ و$Q_3$ يقع الصندوق: 50 % الوسطى من البيانات، حتى لو كان الجزء من 5 إلى 9 أطول.', 'The box lies between $Q_1$ and $Q_3$: the middle 50% of the data, even if the part from 5 to 9 is longer.')
        }
    },
    events: {
        mistake: {
            wrong: say('Dado batean, «6 ateratzea» gertaeraren aurkakoa «1 ateratzea» da.', 'En un dado, el contrario de «sacar un 6» es «sacar un 1».', 'في حجر النرد، عكس «الحصول على 6» هو «الحصول على 1».', 'On a dice, the opposite of «rolling a 6» is «rolling a 1».'),
            right: say('Aurkakoa gainerako guztia da: «6 ez ateratzea» = {1, 2, 3, 4, 5}, eta $P=1-\\frac{1}{6}=\\frac{5}{6}$.', 'El contrario es todo lo demás: «no sacar un 6» = {1, 2, 3, 4, 5}, y $P=1-\\frac{1}{6}=\\frac{5}{6}$.', 'العكس هو كل ما تبقّى: «عدم الحصول على 6» = {1، 2، 3، 4، 5}، و$P=1-\\frac{1}{6}=\\frac{5}{6}$.', 'The opposite is everything else: «not rolling a 6» = {1, 2, 3, 4, 5}, and $P=1-\\frac{1}{6}=\\frac{5}{6}$.')
        },
        check: {
            prompt: say('Bihar euria egiteko probabilitatea 0,35 da. Zein da euririk ez egiteko probabilitatea?', 'La probabilidad de que llueva mañana es 0,35. ¿Cuál es la probabilidad de que no llueva?', 'احتمال أن تمطر غدًا 0.35. ما احتمال ألّا تمطر؟', 'The probability of rain tomorrow is 0.35. What is the probability that it does not rain?'),
            options: [same('$0{,}65$'), same('$0{,}35$'), same('$1{,}35$')],
            correctIndex: 0,
            explanation: say('Aurkako gertaera: $P(\\bar{A})=1-0{,}35=0{,}65$. Bien artean espazio osoa betetzen dute: 1.', 'Suceso contrario: $P(\\bar{A})=1-0{,}35=0{,}65$. Entre los dos forman todo el espacio: 1.', 'الحدث المعاكس: $P(\\bar{A})=1-0{,}35=0{,}65$. ومعًا يكوّنان الفضاء كله: 1.', 'The opposite event: $P(\\bar{A})=1-0{,}35=0{,}65$. Together they make up the whole space: 1.')
        }
    },
    tree: {
        mistake: {
            wrong: say('Bi txanponekin 3 emaitza daude: bi aurpegi, bi gurutze edo bakoitzetik bat. Bakoitzetik bat ateratzeko probabilitatea $\\frac{1}{3}$ da.', 'Con dos monedas hay 3 resultados: dos caras, dos cruces o una de cada. La probabilidad de una de cada es $\\frac{1}{3}$.', 'مع قطعتي نقد هناك 3 نتائج: وجهان، أو ظهران، أو واحد من كل. احتمال واحد من كل هو $\\frac{1}{3}$.', 'With two coins there are 3 outcomes: two heads, two tails or one of each. The probability of one of each is $\\frac{1}{3}$.'),
            right: say('4 emaitza dira, eta «bakoitzetik bat» bi aldiz ateratzen da (aurpegia-gurutzea eta gurutzea-aurpegia): $\\frac{2}{4}=\\frac{1}{2}$.', 'Son 4 resultados, y «una de cada» sale dos veces (cara-cruz y cruz-cara): $\\frac{2}{4}=\\frac{1}{2}$.', 'النتائج 4، و«واحد من كل» يظهر مرتين (وجه ثم ظهر، وظهر ثم وجه): $\\frac{2}{4}=\\frac{1}{2}$.', 'There are 4 outcomes, and «one of each» comes up twice (heads-tails and tails-heads): $\\frac{2}{4}=\\frac{1}{2}$.')
        },
        check: {
            prompt: say('Bi dado jaurtitzen dira. Zein da 4 batzeko probabilitatea?', 'Se lanzan dos dados. ¿Cuál es la probabilidad de que sumen 4?', 'نرمي حجري نرد. ما احتمال أن يكون المجموع 4؟', 'Two dice are rolled. What is the probability that they add up to 4?'),
            options: [same('$\\frac{1}{11}$'), same('$\\frac{1}{12}$'), same('$\\frac{1}{18}$')],
            correctIndex: 1,
            explanation: say('36 laukiko taulan, 4 batzen dute: 1 eta 3, 2 eta 2, 3 eta 1. $P=\\frac{3}{36}=\\frac{1}{12}$. Baturak ez dira berdin probableak.', 'En la tabla de 36 casillas, suman 4: 1 y 3, 2 y 2, 3 y 1. $P=\\frac{3}{36}=\\frac{1}{12}$. Las sumas no son igual de probables.', 'في جدول من 36 خانة يكون المجموع 4 في: 1 و3، و2 و2، و3 و1. $P=\\frac{3}{36}=\\frac{1}{12}$. والمجاميع ليست متساوية الاحتمال.', 'In the 36-square table, these add up to 4: 1 and 3, 2 and 2, 3 and 1. $P=\\frac{3}{36}=\\frac{1}{12}$. The sums are not equally likely.')
        }
    },
    'double-table': {
        mistake: {
            wrong: say('Gela bat: betaurrekodun 8 neska eta betaurrekorik gabeko 6; betaurrekodun 4 mutil eta betaurrekorik gabeko 12. Betaurrekoak dituela jakinda, neska izateko probabilitatea $\\frac{8}{30}$ da.', 'Una clase: 8 chicas con gafas y 6 sin gafas; 4 chicos con gafas y 12 sin gafas. Sabiendo que lleva gafas, la probabilidad de que sea chica es $\\frac{8}{30}$.', 'صف فيه 8 بنات بنظارات و6 بلا نظارات، و4 أولاد بنظارات و12 بلا نظارات. إذا علمنا أن التلميذ يلبس نظارة، فاحتمال أن يكون بنتًا $\\frac{8}{30}$.', 'A class: 8 girls with glasses and 6 without; 4 boys with glasses and 12 without. Given that the pupil wears glasses, the probability of a girl is $\\frac{8}{30}$.'),
            right: say('Betaurrekoak dituela jakinda, kasu posibleak betaurrekoak dituzten 12 ikasleak bakarrik dira: $\\frac{8}{12}=\\frac{2}{3}$.', 'Sabiendo que lleva gafas, los casos posibles son solo los 12 con gafas: $\\frac{8}{12}=\\frac{2}{3}$.', 'إذا علمنا أنه يلبس نظارة، فالحالات الممكنة هي الاثنا عشر بنظارات فقط: $\\frac{8}{12}=\\frac{2}{3}$.', 'Given that the pupil wears glasses, the possible cases are only the 12 with glasses: $\\frac{8}{12}=\\frac{2}{3}$.')
        },
        check: {
            prompt: say('Klub batean 20 bazkide daude: 9 bazkidek futbolean jokatzen dute (5 neska eta 4 mutil) eta 11 bazkidek saskibaloian (6 neska eta 5 mutil). Neska bat dela jakinda, zein da futbolean jokatzeko probabilitatea?', 'En un club hay 20 socios: 9 juegan al fútbol (5 chicas y 4 chicos) y 11 al baloncesto (6 chicas y 5 chicos). Sabiendo que es una chica, ¿cuál es la probabilidad de que juegue al fútbol?', 'في نادٍ 20 عضوًا: 9 يلعبون كرة القدم (5 بنات و4 أولاد) و11 كرة السلة (6 بنات و5 أولاد). إذا علمنا أن العضو بنت، فما احتمال أن تلعب كرة القدم؟', 'A club has 20 members: 9 play football (5 girls and 4 boys) and 11 basketball (6 girls and 5 boys). Given that it is a girl, what is the probability that she plays football?'),
            options: [same('$\\frac{1}{4}$'), same('$\\frac{5}{9}$'), same('$\\frac{5}{11}$')],
            correctIndex: 2,
            explanation: say('Neska bat dela jakinda, kasu posibleak 11 neskak dira, eta horietatik 5 neskak jokatzen dute futbolean: $\\frac{5}{11}$. $\\frac{5}{20}=\\frac{1}{4}$ bazkide guztiak hartuz ateratzen da.', 'Sabiendo que es una chica, los casos posibles son las 11 chicas, y 5 juegan al fútbol: $\\frac{5}{11}$. El $\\frac{5}{20}=\\frac{1}{4}$ sale contando a todos los socios.', 'إذا علمنا أنها بنت، فالحالات الممكنة هي البنات الإحدى عشرة، و5 منهن يلعبن كرة القدم: $\\frac{5}{11}$. أما $\\frac{5}{20}=\\frac{1}{4}$ فيأتي من عدّ كل الأعضاء.', 'Given that it is a girl, the possible cases are the 11 girls, and 5 play football: $\\frac{5}{11}$. $\\frac{5}{20}=\\frac{1}{4}$ comes from counting every member.')
        }
    }
}

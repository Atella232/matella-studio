import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistika unidimentsionala · Batxilergoa 1 · Zientziak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no JSX)
   so the tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical mistake.
   ========================================================================== */

export type BachStatsTopicId =
    | 'population-sample' | 'frequency-tables' | 'class-intervals' | 'charts'
    | 'centre-measures' | 'grouped-centre' | 'missing-datum'
    | 'quartiles-percentiles' | 'box-plot' | 'skewness'
    | 'range-mean-deviation' | 'variance-sd' | 'coefficient-variation'
    | 'outliers' | 'standard-scores' | 'transform-data'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachStatsLessonChecks: Record<BachStatsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Data and tables ---------- */
    'population-sample': {
        mistake: {
            wrong: say('Oinetakoen neurria kuantitatibo jarraitua da, oinak edozein luzera izan dezakeelako.', 'La talla de zapato es cuantitativa continua, porque el pie puede medir cualquier cosa.', 'مقاس الحذاء كمي متصل لأن القدم قد يكون بأي طول.', 'Shoe size is continuous quantitative, because a foot can be any length.'),
            right: say('Neurriak balio solteak dira (38, 39, 40…): kuantitatibo diskretua da.', 'Las tallas son valores sueltos (38, 39, 40…): es cuantitativa discreta.', 'المقاسات قيم متفرقة (38، 39، 40…): إنه كمي منفصل.', 'Sizes are separate values (38, 39, 40…): it is discrete quantitative.')
        },
        check: {
            prompt: say('Aldagai hauetako zein da kuantitatibo jarraitua?', '¿Cuál de estas variables es cuantitativa continua?', 'أي هذه المتغيرات كمي متصل؟', 'Which of these variables is continuous quantitative?'),
            options: [
                say('Lasterketa baten denbora', 'El tiempo de una carrera', 'زمن سباق', 'The time of a race'),
                say('Partida bateko golak', 'Los goles de un partido', 'أهداف مباراة', 'The goals in a match'),
                say('Begien kolorea', 'El color de los ojos', 'لون العينين', 'Eye colour')
            ],
            correctIndex: 0,
            explanation: say('Denbora neurtu egiten da, eta tarte bateko edozein balio har dezake, $12{,}37$ s adibidez. Golak zenbatu egiten dira, eta kolorea ezaugarri bat da.', 'El tiempo se mide y puede tomar cualquier valor de un intervalo, por ejemplo $12{,}37$ s. Los goles se cuentan y el color es una cualidad.', 'يُقاس الزمن ويمكن أن يأخذ أي قيمة من مجال، مثل $12{,}37$ ث. أما الأهداف فتُعدّ، واللون صفة.', 'Time is measured and can take any value in an interval, for example $12{,}37$ s. Goals are counted and colour is a quality.')
        }
    },
    'frequency-tables': {
        mistake: {
            wrong: same('$h_i=\\frac{N}{f_i}$'),
            right: say('Alderantziz: $h_i=\\frac{f_i}{N}$, osotik zer zati den; beti 0 eta 1 artean dago.', 'Al revés: $h_i=\\frac{f_i}{N}$, la parte del total; siempre está entre 0 y 1.', 'بالعكس: $h_i=\\frac{f_i}{N}$ أي الجزء من الكل، وهو دائمًا بين 0 و1.', 'The other way round: $h_i=\\frac{f_i}{N}$, the part of the total; it is always between 0 and 1.')
        },
        check: {
            prompt: say('40 datu daude, eta $F_3=30$. Zenbat da $H_3$?', 'Hay 40 datos y $F_3=30$. ¿Cuánto vale $H_3$?', 'هناك 40 بيانًا و$F_3=30$. كم قيمة $H_3$؟', 'There are 40 data and $F_3=30$. What is $H_3$?'),
            options: [same('$30$'), same('$0{,}75$'), same('$1{,}33$')],
            correctIndex: 1,
            explanation: same('$H_3=\\frac{30}{40}=0{,}75$')
        }
    },
    'class-intervals': {
        mistake: {
            wrong: say('$[10,20)$ tartearen klase-marka 10 da.', 'La marca de clase de $[10,20)$ es 10.', 'مركز الفئة $[10,20)$ هو 10.', 'The class mark of $[10,20)$ is 10.'),
            right: say('Erdiko puntua da: $\\frac{10+20}{2}=15$.', 'Es el punto medio: $\\frac{10+20}{2}=15$.', 'إنه المنتصف: $\\frac{10+20}{2}=15$.', 'It is the midpoint: $\\frac{10+20}{2}=15$.')
        },
        check: {
            prompt: say('Zein da $[25,35)$ tartearen klase-marka?', '¿Cuál es la marca de clase de $[25,35)$?', 'ما مركز الفئة $[25,35)$؟', 'What is the class mark of $[25,35)$?'),
            options: [same('$25$'), same('$10$'), same('$30$')],
            correctIndex: 2,
            explanation: same('$\\frac{25+35}{2}=30$')
        }
    },
    charts: {
        mistake: {
            wrong: same('$h=0{,}4\\ \\to\\ 40^\\circ$'),
            right: say('Sektorea $360^\\circ$ angeluaren zati bat da: $0{,}4\\cdot 360^\\circ=144^\\circ$.', 'El sector es una parte de $360^\\circ$: $0{,}4\\cdot 360^\\circ=144^\\circ$.', 'القطاع جزء من $360^\\circ$: $0{,}4\\cdot 360^\\circ=144^\\circ$.', 'The sector is a part of $360^\\circ$: $0{,}4\\cdot 360^\\circ=144^\\circ$.')
        },
        check: {
            prompt: say('60 datu daude, eta balio batek $f=10$ du. Zein angelu dagokio sektore-diagraman?', 'Hay 60 datos y un valor tiene $f=10$. ¿Qué ángulo le toca en el diagrama de sectores?', 'هناك 60 بيانًا ولقيمة $f=10$. ما زاويتها في المخطط الدائري؟', 'There are 60 data and one value has $f=10$. What angle does it get in the pie chart?'),
            options: [same('$60^\\circ$'), same('$10^\\circ$'), same('$36^\\circ$')],
            correctIndex: 0,
            explanation: same('$\\frac{10}{60}\\cdot 360^\\circ=60^\\circ$')
        }
    },

    /* ---------- 2. Measures of centre ---------- */
    'centre-measures': {
        mistake: {
            wrong: say('7, 2, 9 datuen mediana 2 da, erdian dagoelako.', 'La mediana de 7, 2, 9 es 2, porque está en el centro.', 'وسيط 7، 2، 9 هو 2 لأنه في الوسط.', 'The median of 7, 2, 9 is 2, because it is in the middle.'),
            right: say('Lehenik ordenatu egiten dira: 2, 7, 9; mediana 7 da.', 'Primero se ordenan: 2, 7, 9; la mediana es 7.', 'نرتّبها أولًا: 2، 7، 9؛ فالوسيط 7.', 'First put them in order: 2, 7, 9; the median is 7.')
        },
        check: {
            prompt: say('Zein da 4, 1, 7, 3, 9, 6 datuen mediana?', '¿Cuál es la mediana de 4, 1, 7, 3, 9, 6?', 'ما وسيط 4، 1، 7، 3، 9، 6؟', 'What is the median of 4, 1, 7, 3, 9, 6?'),
            options: [same('$7$'), same('$5$'), same('$4$')],
            correctIndex: 1,
            explanation: say('Ordenatuta, 1, 3, 4, 6, 7, 9: $Me=\\frac{4+6}{2}=5$.', 'Ordenados, 1, 3, 4, 6, 7, 9: $Me=\\frac{4+6}{2}=5$.', 'بعد الترتيب 1، 3، 4، 6، 7، 9: $Me=\\frac{4+6}{2}=5$.', 'In order, 1, 3, 4, 6, 7, 9: $Me=\\frac{4+6}{2}=5$.')
        }
    },
    'grouped-centre': {
        mistake: {
            wrong: say('$[30,40)$ eta $[40,50)$ tarteetan, $x_i$ 30 eta 40 dira.', 'En $[30,40)$ y $[40,50)$, los $x_i$ son 30 y 40.', 'في $[30,40)$ و$[40,50)$ تكون $x_i$ هي 30 و40.', 'In $[30,40)$ and $[40,50)$, the $x_i$ are 30 and 40.'),
            right: say('Klase-markak erdiko puntuak dira: 35 eta 45.', 'Las marcas de clase son los puntos medios: 35 y 45.', 'المراكز هي المنتصفات: 35 و45.', 'The class marks are the midpoints: 35 and 45.')
        },
        check: {
            prompt: say('$[0,10)$ tartean 4 datu daude eta $[10,20)$ tartean 6. Zenbat da batez bestekoa?', 'En $[0,10)$ hay 4 datos y en $[10,20)$, 6. ¿Cuánto vale la media?', 'في $[0,10)$ 4 بيانات وفي $[10,20)$ 6. كم المتوسط؟', 'There are 4 data in $[0,10)$ and 6 in $[10,20)$. What is the mean?'),
            options: [same('$11$'), same('$6$'), same('$10$')],
            correctIndex: 0,
            explanation: same('$\\bar{x}=\\frac{4\\cdot 5+6\\cdot 15}{10}=\\frac{110}{10}=11$')
        }
    },
    'missing-datum': {
        mistake: {
            wrong: say('Notak 4, 6 eta falta den bat dira, eta batez bestekoa 6: falta dena 6 da.', 'Las notas son 4, 6 y una que falta, y la media es 6: la que falta es un 6.', 'العلامات 4 و6 وواحدة ناقصة، والمتوسط 6: فالناقصة 6.', 'The marks are 4, 6 and a missing one, and the mean is 6: the missing one is a 6.'),
            right: say('Batura $3\\cdot 6=18$ da: falta dena $18-10=8$ da.', 'La suma es $3\\cdot 6=18$: la que falta es $18-10=8$.', 'المجموع $3\\cdot 6=18$: فالناقصة $18-10=8$.', 'The sum is $3\\cdot 6=18$: the missing one is $18-10=8$.')
        },
        check: {
            prompt: say('Lau datuen batez bestekoa 5 da, eta horietako hiru 2, 6 eta 7 dira. Zein da laugarrena?', 'Cuatro datos tienen media 5 y tres de ellos son 2, 6 y 7. ¿Cuál es el cuarto?', 'لأربعة بيانات متوسط 5، وثلاثة منها 2 و6 و7. ما الرابع؟', 'Four data have a mean of 5 and three of them are 2, 6 and 7. What is the fourth?'),
            options: [same('$15$'), same('$4$'), same('$5$')],
            correctIndex: 2,
            explanation: same('$4\\cdot 5=20\\qquad 20-15=5$')
        }
    },

    /* ---------- 3. Measures of position ---------- */
    'quartiles-percentiles': {
        mistake: {
            wrong: say('$N=40$ denean, $40\\cdot 0{,}25=10$, eta $Q_1$ 10. datua da.', 'Con $N=40$, $40\\cdot 0{,}25=10$, y $Q_1$ es el dato 10.º.', 'مع $N=40$ يكون $40\\cdot 0{,}25=10$، و$Q_1$ هو البيان العاشر.', 'With $N=40$, $40\\cdot 0{,}25=10$, and $Q_1$ is the 10th datum.'),
            right: say('Posizioa osoa denean, 10. eta 11. datuen batez bestekoa hartzen da.', 'Cuando la posición es entera, se toma la media de los datos 10.º y 11.º.', 'عندما يكون الموضع صحيحًا نأخذ متوسط البيانين العاشر والحادي عشر.', 'When the position is whole, take the mean of the 10th and 11th data.')
        },
        check: {
            prompt: say('50 datu ordenatuta daude. Zein datu da $Q_3$?', 'Hay 50 datos ordenados. ¿Qué dato es $Q_3$?', 'هناك 50 بيانًا مرتبًا. أي بيان هو $Q_3$؟', 'There are 50 ordered data. Which datum is $Q_3$?'),
            options: [
                say('37.a', 'El 37.º', 'السابع والثلاثون', 'The 37th'),
                say('38.a', 'El 38.º', 'الثامن والثلاثون', 'The 38th'),
                say('25.a', 'El 25.º', 'الخامس والعشرون', 'The 25th')
            ],
            correctIndex: 1,
            explanation: say('$50\\cdot 0{,}75=37{,}5$ ez da osoa: hurrengo datua, 38.a.', '$50\\cdot 0{,}75=37{,}5$ no es entera: el dato siguiente, el 38.º.', '$50\\cdot 0{,}75=37{,}5$ ليس صحيحًا: البيان التالي، الثامن والثلاثون.', '$50\\cdot 0{,}75=37{,}5$ is not whole: the next datum, the 38th.')
        }
    },
    'box-plot': {
        mistake: {
            wrong: say('Biboteak beti iristen dira minimoraino eta maximoraino.', 'Los bigotes llegan siempre al mínimo y al máximo.', 'يصل الشاربان دائمًا إلى الأصغر والأكبر.', 'The whiskers always reach the minimum and the maximum.'),
            right: say('Kutxatik $1{,}5\\cdot(Q_3-Q_1)$ baino urrunago ez dagoen daturaino bakarrik iristen dira; urrunagokoak atipikoak dira.', 'Solo llegan hasta el dato que no pasa de $1{,}5\\cdot(Q_3-Q_1)$ desde la caja; los más alejados son atípicos.', 'لا يصلان إلا إلى البيان الذي لا يبعد عن الصندوق أكثر من $1{,}5\\cdot(Q_3-Q_1)$؛ وما هو أبعد شاذ.', 'They only reach the datum no more than $1{,}5\\cdot(Q_3-Q_1)$ from the box; the ones further away are outliers.')
        },
        check: {
            prompt: say('$Q_1=4$ eta $Q_3=10$ badira, atipikoa al da 21 datua?', 'Con $Q_1=4$ y $Q_3=10$, ¿es atípico el dato 21?', 'مع $Q_1=4$ و$Q_3=10$، هل البيان 21 شاذ؟', 'With $Q_1=4$ and $Q_3=10$, is the datum 21 an outlier?'),
            options: [
                say('Ez', 'No', 'لا', 'No'),
                say('Bai', 'Sí', 'نعم', 'Yes'),
                say('$Me=7$ bada bakarrik', 'Solo si $Me=7$', 'فقط إذا كان $Me=7$', 'Only if $Me=7$')
            ],
            correctIndex: 1,
            explanation: say('Muga $10+1{,}5\\cdot 6=19$ da, eta 21 urrunago dago.', 'El límite es $10+1{,}5\\cdot 6=19$, y el 21 está más lejos.', 'الحد $10+1{,}5\\cdot 6=19$ و21 أبعد منه.', 'The limit is $10+1{,}5\\cdot 6=19$, and 21 is further out.')
        }
    },
    skewness: {
        mistake: {
            wrong: say('$\\bar{x}>Me$ bada, isatsa ezkerrean dago.', 'Si $\\bar{x}>Me$, la cola está a la izquierda.', 'إذا كان $\\bar{x}>Me$ فالذيل في اليسار.', 'If $\\bar{x}>Me$, the tail is on the left.'),
            right: say('Alderantziz: datu handi gutxi batzuek batez bestekoa eskuinera eramaten dute, eta isatsa eskuinean dago.', 'Al revés: unos pocos datos grandes llevan la media a la derecha, y la cola está a la derecha.', 'بالعكس: بيانات كبيرة قليلة تسحب المتوسط إلى اليمين، والذيل في اليمين.', 'The other way round: a few large data pull the mean to the right, and the tail is on the right.')
        },
        check: {
            prompt: say('Banaketa batean $\\bar{x}=25$ eta $Me=30$. Nolakoa da?', 'En una distribución, $\\bar{x}=25$ y $Me=30$. ¿Cómo es?', 'في توزيع $\\bar{x}=25$ و$Me=30$. كيف هو؟', 'In a distribution, $\\bar{x}=25$ and $Me=30$. What is it like?'),
            options: [
                say('Simetrikoa', 'Simétrica', 'متماثل', 'Symmetric'),
                say('Eskuinetik asimetrikoa', 'Asimétrica por la derecha', 'ملتوٍ إلى اليمين', 'Skewed to the right'),
                say('Ezkerretik asimetrikoa', 'Asimétrica por la izquierda', 'ملتوٍ إلى اليسار', 'Skewed to the left')
            ],
            correctIndex: 2,
            explanation: say('$25<30$: datu txiki gutxi batzuek batez bestekoa ezkerrera eramaten dute.', '$25<30$: unos pocos datos pequeños llevan la media a la izquierda.', '$25<30$: بيانات صغيرة قليلة تسحب المتوسط إلى اليسار.', '$25<30$: a few small data pull the mean to the left.')
        }
    },

    /* ---------- 4. Measures of spread ---------- */
    'range-mean-deviation': {
        mistake: {
            wrong: say('1 eta 5 datuekin: $DM=\\frac{(1-3)+(5-3)}{2}=0$', 'Con 1 y 5: $DM=\\frac{(1-3)+(5-3)}{2}=0$', 'مع 1 و5: $DM=\\frac{(1-3)+(5-3)}{2}=0$', 'With 1 and 5: $DM=\\frac{(1-3)+(5-3)}{2}=0$'),
            right: say('Distantziak zeinurik gabe hartzen dira: $DM=\\frac{2+2}{2}=2$.', 'Las distancias se toman sin signo: $DM=\\frac{2+2}{2}=2$.', 'تؤخذ المسافات دون إشارة: $DM=\\frac{2+2}{2}=2$.', 'Distances are taken without sign: $DM=\\frac{2+2}{2}=2$.')
        },
        check: {
            prompt: say('Zein da 7, 3, 12 eta 9 datuen ibiltartea?', '¿Cuál es el recorrido de 7, 3, 12 y 9?', 'ما مدى 7، 3، 12، 9؟', 'What is the range of 7, 3, 12 and 9?'),
            options: [same('$12$'), same('$3$'), same('$9$')],
            correctIndex: 2,
            explanation: same('$12-3=9$')
        }
    },
    'variance-sd': {
        mistake: {
            wrong: say('2 eta 4 datuekin: $\\sigma^2=\\frac{4+16}{2}=10$', 'Con 2 y 4: $\\sigma^2=\\frac{4+16}{2}=10$', 'مع 2 و4: $\\sigma^2=\\frac{4+16}{2}=10$', 'With 2 and 4: $\\sigma^2=\\frac{4+16}{2}=10$'),
            right: say('Batez bestekoaren karratua kendu behar da: $10-3^2=1$.', 'Hay que restar el cuadrado de la media: $10-3^2=1$.', 'يجب طرح مربع المتوسط: $10-3^2=1$.', 'You have to subtract the square of the mean: $10-3^2=1$.')
        },
        check: {
            prompt: say('Banaketa batek $\\sigma^2=16$ du. Zenbat da $\\sigma$?', 'Una distribución tiene $\\sigma^2=16$. ¿Cuánto vale $\\sigma$?', 'لتوزيع $\\sigma^2=16$. كم قيمة $\\sigma$؟', 'A distribution has $\\sigma^2=16$. What is $\\sigma$?'),
            options: [same('$16$'), same('$4$'), same('$256$')],
            correctIndex: 1,
            explanation: same('$\\sigma=\\sqrt{16}=4$')
        }
    },
    'coefficient-variation': {
        mistake: {
            wrong: say('$\\bar{x}=50$ eta $\\sigma=5$ badira: $CV=\\frac{50}{5}=10$', 'Con $\\bar{x}=50$ y $\\sigma=5$: $CV=\\frac{50}{5}=10$', 'مع $\\bar{x}=50$ و$\\sigma=5$: $CV=\\frac{50}{5}=10$', 'With $\\bar{x}=50$ and $\\sigma=5$: $CV=\\frac{50}{5}=10$'),
            right: say('$\\sigma$ batez bestekoaz zatitzen da: $CV=\\frac{5}{50}=0{,}1$.', 'Se divide $\\sigma$ entre la media: $CV=\\frac{5}{50}=0{,}1$.', 'نقسم $\\sigma$ على المتوسط: $CV=\\frac{5}{50}=0{,}1$.', 'Divide $\\sigma$ by the mean: $CV=\\frac{5}{50}=0{,}1$.')
        },
        check: {
            prompt: say('$\\bar{x}=80$ eta $\\sigma=8$ badira, zenbat da $CV$?', 'Con $\\bar{x}=80$ y $\\sigma=8$, ¿cuánto vale $CV$?', 'مع $\\bar{x}=80$ و$\\sigma=8$، كم قيمة $CV$؟', 'With $\\bar{x}=80$ and $\\sigma=8$, what is $CV$?'),
            options: [same('$10$'), same('$8$'), same('$0{,}1$')],
            correctIndex: 2,
            explanation: same('$CV=\\frac{8}{80}=0{,}1$')
        }
    },

    /* ---------- 5. Interpret and compare ---------- */
    outliers: {
        mistake: {
            wrong: say('$\\bar{x}=50$ eta $\\sigma^2=9$ badira, tartea $50\\pm 3\\cdot 9$ da.', 'Con $\\bar{x}=50$ y $\\sigma^2=9$, el intervalo es $50\\pm 3\\cdot 9$.', 'مع $\\bar{x}=50$ و$\\sigma^2=9$ يكون المجال $50\\pm 3\\cdot 9$.', 'With $\\bar{x}=50$ and $\\sigma^2=9$, the interval is $50\\pm 3\\cdot 9$.'),
            right: say('Desbideratze tipikoa erabiltzen da, $\\sigma=3$: tartea 41 eta 59 artean dago.', 'Se usa la desviación típica, $\\sigma=3$: el intervalo va de 41 a 59.', 'نستعمل الانحراف المعياري $\\sigma=3$: المجال من 41 إلى 59.', 'Use the standard deviation, $\\sigma=3$: the interval goes from 41 to 59.')
        },
        check: {
            prompt: say('$\\bar{x}=100$ eta $\\sigma=10$ badira, datu hauetako zein da atipikoa?', 'Con $\\bar{x}=100$ y $\\sigma=10$, ¿cuál de estos datos es atípico?', 'مع $\\bar{x}=100$ و$\\sigma=10$، أي هذه البيانات شاذ؟', 'With $\\bar{x}=100$ and $\\sigma=10$, which of these data is an outlier?'),
            options: [same('$125$'), same('$135$'), same('$71$')],
            correctIndex: 1,
            explanation: say('Tartea $100-30=70$ eta $100+30=130$ artean dago: 135 bakarrik geratzen da kanpoan.', 'El intervalo va de $100-30=70$ a $100+30=130$: solo 135 queda fuera.', 'المجال من $100-30=70$ إلى $100+30=130$: وحده 135 يقع خارجه.', 'The interval goes from $100-30=70$ to $100+30=130$: only 135 lies outside.')
        }
    },
    'standard-scores': {
        mistake: {
            wrong: say('$\\sigma=3$ denean, ${z}=\\frac{x-\\bar{x}}{9}$', 'Con $\\sigma=3$, ${z}=\\frac{x-\\bar{x}}{9}$', 'مع $\\sigma=3$، ${z}=\\frac{x-\\bar{x}}{9}$', 'With $\\sigma=3$, ${z}=\\frac{x-\\bar{x}}{9}$'),
            right: say('Desbideratze tipikoaz zatitzen da, ez bariantzaz: ${z}=\\frac{x-\\bar{x}}{3}$.', 'Se divide entre la desviación típica, no entre la varianza: ${z}=\\frac{x-\\bar{x}}{3}$.', 'نقسم على الانحراف المعياري لا على التباين: ${z}=\\frac{x-\\bar{x}}{3}$.', 'Divide by the standard deviation, not the variance: ${z}=\\frac{x-\\bar{x}}{3}$.')
        },
        check: {
            prompt: say('Talde batean $\\bar{x}=60$ eta $\\sigma=5$. Zenbat da 70 datuaren puntuazio tipikoa?', 'En un grupo, $\\bar{x}=60$ y $\\sigma=5$. ¿Cuál es la puntuación típica del dato 70?', 'في مجموعة $\\bar{x}=60$ و$\\sigma=5$. ما الدرجة المعيارية للبيان 70؟', 'In a group, $\\bar{x}=60$ and $\\sigma=5$. What is the standard score of the datum 70?'),
            options: [same('$10$'), same('$2$'), same('$0{,}5$')],
            correctIndex: 1,
            explanation: same('${z}=\\frac{70-60}{5}=2$')
        }
    },
    'transform-data': {
        mistake: {
            wrong: say('Datu guztiei 10 batzen bazaie, $\\sigma$ 3 izatetik 13 izatera pasatzen da.', 'Si a todos los datos se les suma 10, $\\sigma$ pasa de 3 a 13.', 'إذا أُضيف 10 إلى كل البيانات انتقل $\\sigma$ من 3 إلى 13.', 'If 10 is added to all the data, $\\sigma$ goes from 3 to 13.'),
            right: say('Datuak batera mugitzen dira, eta haien arteko distantziak ez dira aldatzen: $\\sigma$ desbideratzeak 3 izaten jarraitzen du.', 'Los datos se mueven juntos y sus distancias no cambian: $\\sigma$ sigue siendo 3.', 'تتحرك البيانات معًا ولا تتغيّر المسافات بينها: يبقى $\\sigma$ مساويًا 3.', 'The data move together and the distances between them do not change: $\\sigma$ is still 3.')
        },
        check: {
            prompt: say('Datu batzuek $\\sigma=2$ dute, eta guztiak 3 bider egiten dira. Zenbat da $\\sigma$ berria?', 'Unos datos tienen $\\sigma=2$ y se multiplican todos por 3. ¿Cuánto vale la nueva $\\sigma$?', 'لبيانات $\\sigma=2$ وضُربت كلها في 3. كم قيمة $\\sigma$ الجديدة؟', 'Some data have $\\sigma=2$ and they are all multiplied by 3. What is the new $\\sigma$?'),
            options: [same('$2$'), same('$6$'), same('$12$')],
            correctIndex: 1,
            explanation: same('$3\\cdot 2=6$')
        }
    }
}

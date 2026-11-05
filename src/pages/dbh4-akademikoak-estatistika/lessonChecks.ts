import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistika · 4. DBH akademikoak — the typical mistake and the «Check
   it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics.
   ========================================================================== */

export type StatisticsAkTopicId = 'sampling' | 'frequencies' | 'intervals' | 'mean' | 'median-mode' | 'grouped-centre' | 'quartiles' | 'percentiles' | 'box-plot' | 'mean-deviation' | 'variance' | 'cv' | 'scatter' | 'correlation' | 'regression'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const statisticsAkLessonChecks: Record<StatisticsAkTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    sampling: {
        mistake: {
            wrong: say('Institutu bateko ikasleek zer pentsatzen duten jakiteko, iristen diren lehen 30 ikasleei galdetzen diet.', 'Para saber qué opinan los alumnos de un instituto, pregunto a los 30 primeros que llegan.', 'لأعرف رأي تلاميذ معهد أسأل أول 30 تلميذًا يصلون.', 'To find out what the pupils of a school think, I ask the first 30 who arrive.'),
            right: say('Lagin hori ez da ausazkoa ezta adierazgarria ere: zoriz aukeratu behar da, zozketaz edo geruzaka.', 'Esa muestra no es aleatoria ni representativa: hay que elegirla al azar, por sorteo o por estratos.', 'تلك العيّنة ليست عشوائية ولا ممثِّلة: يجب اختيارها عشوائيًا بالقرعة أو بالطبقات.', 'That sample is neither random nor representative: it must be chosen at random, by a draw or by strata.')
        },
        check: {
            prompt: say('450 pertsonako populazio batean 300 heldu eta 150 adingabe daude. 30 pertsonako geruzakako lagin batean, zenbat adingabe daude?', 'Una población de 450 personas tiene 300 adultos y 150 menores. En una muestra estratificada de 30, ¿cuántos menores hay?', 'مجتمع من 450 شخصًا فيه 300 بالغ و150 قاصرًا. في عيّنة طبقية من 30، كم قاصرًا؟', 'A population of 450 people has 300 adults and 150 minors. In a stratified sample of 30, how many minors are there?'),
            options: [same('$10$'), same('$15$'), same('$20$')],
            correctIndex: 0,
            explanation: same('$\\frac{30}{450}\\cdot 150=10$')
        }
    },
    frequencies: {
        mistake: {
            wrong: say('40 datutan 6 aldiz agertzen den balio baten maiztasun erlatiboa 6 da.', 'La frecuencia relativa de un valor que aparece 6 veces en 40 datos es 6.', 'التكرار النسبي لقيمة تظهر 6 مرات في 40 بيانًا هو 6.', 'The relative frequency of a value that appears 6 times in 40 data is 6.'),
            right: say('Hori absolutua da; erlatiboa $\\frac{6}{40}=0{,}15$ da.', 'Esa es la absoluta; la relativa es $\\frac{6}{40}=0{,}15$.', 'ذلك هو المطلق؛ والنسبي $\\frac{6}{40}=0{,}15$.', 'That is the absolute one; the relative one is $\\frac{6}{40}=0{,}15$.')
        },
        check: {
            prompt: say('Taula batean, $F_3=17$ eta $F_2=11$. Zenbat da $f_3$?', 'En una tabla, $F_3=17$ y $F_2=11$. ¿Cuánto vale $f_3$?', 'في جدول $F_3=17$ و$F_2=11$. ما قيمة $f_3$؟', 'In a table, $F_3=17$ and $F_2=11$. What is $f_3$?'),
            options: [same('$6$'), same('$28$'), same('$17$')],
            correctIndex: 0,
            explanation: same('$f_3=F_3-F_2=17-11=6$')
        }
    },
    intervals: {
        mistake: {
            wrong: say('Zehazki 20 balio duen datu bat $[10,20)$ tartean doa.', 'Un dato que vale justo 20 va en el intervalo $[10,20)$.', 'بيان قيمته 20 تمامًا يقع في الفئة $[10,20)$.', 'A value of exactly 20 goes in the interval $[10,20)$.'),
            right: say('Eskuineko muturra ez da sartzen: 20 balioa $[20,30)$ tartean doa.', 'El extremo derecho no entra: el 20 va en $[20,30)$.', 'الطرف الأيمن لا يدخل: 20 يقع في $[20,30)$.', 'The right end is not included: 20 goes in $[20,30)$.')
        },
        check: {
            prompt: say('Zein da $[15,25)$ tartearen klase-marka?', '¿Cuál es la marca de clase de $[15,25)$?', 'ما مركز الفئة $[15,25)$؟', 'What is the class mark of $[15,25)$?'),
            options: [same('$20$'), same('$10$'), same('$40$')],
            correctIndex: 0,
            explanation: same('$\\frac{15+25}{2}=20$')
        }
    },
    mean: {
        mistake: {
            wrong: say('8 batez bestekoko 10 laguneko talde batek eta 4 batez bestekoko 30 laguneko beste batek, batera, 6 batez bestekoa dute.', 'Un grupo de 10 con media 8 y otro de 30 con media 4 tienen juntos media 6.', 'مجموعة من 10 متوسطها 8 وأخرى من 30 متوسطها 4 متوسطهما معًا 6.', 'A group of 10 with mean 8 and another of 30 with mean 4 have a joint mean of 6.'),
            right: say('Talde handiak gehiago pisatzen du: $\\frac{10\\cdot 8+30\\cdot 4}{40}=5$.', 'El grupo grande pesa más: $\\frac{10\\cdot 8+30\\cdot 4}{40}=5$.', 'المجموعة الكبيرة تزن أكثر: $\\frac{10\\cdot 8+30\\cdot 4}{40}=5$.', 'The big group weighs more: $\\frac{10\\cdot 8+30\\cdot 4}{40}=5$.')
        },
        check: {
            prompt: say('Hiru zenbakiren batez bestekoa 9 da. Bi 7 eta 12 badira, zein da hirugarrena?', 'Tres números tienen media 9. Si dos son 7 y 12, ¿cuál es el tercero?', 'متوسط ثلاثة أعداد 9. إذا كان اثنان منها 7 و12 فما الثالث؟', 'Three numbers have mean 9. If two of them are 7 and 12, what is the third?'),
            options: [same('$8$'), same('$9$'), same('$10$')],
            correctIndex: 0,
            explanation: same('$3\\cdot 9-(7+12)=8$')
        }
    },
    'median-mode': {
        mistake: {
            wrong: say('7, 1, 9, 3, 4 datuen mediana 9 da, erdiko datua.', 'La mediana de 7, 1, 9, 3, 4 es 9, el dato del centro.', 'وسيط 7، 1، 9، 3، 4 هو 9، البيان الأوسط.', 'The median of 7, 1, 9, 3, 4 is 9, the middle value.'),
            right: say('Lehenik ordenatu egiten dira: 1, 3, 4, 7, 9. Mediana 4 da.', 'Primero se ordenan: 1, 3, 4, 7, 9. La mediana es 4.', 'نرتّبها أولًا: 1، 3، 4، 7، 9. الوسيط 4.', 'First put them in order: 1, 3, 4, 7, 9. The median is 4.')
        },
        check: {
            prompt: say('Zein da 2, 3, 6, 8, 10, 15 datuen mediana?', '¿Cuál es la mediana de 2, 3, 6, 8, 10, 15?', 'ما وسيط 2، 3، 6، 8، 10، 15؟', 'What is the median of 2, 3, 6, 8, 10, 15?'),
            options: [same('$7$'), same('$6$'), same('$8$')],
            correctIndex: 0,
            explanation: same('$\\frac{6+8}{2}=7$')
        }
    },
    'grouped-centre': {
        mistake: {
            wrong: say('Datuak tartetan daudenean, batez bestekoa zehatza ateratzen da.', 'Con datos en intervalos, la media sale exacta.', 'مع البيانات المبوّبة يخرج المتوسط دقيقًا.', 'With data in intervals, the mean comes out exact.'),
            right: say('Datu bakoitzaren ordez klase-marka erabiltzen da: hurbilketa bat da.', 'Se usa la marca de clase en lugar de cada dato: es una aproximación.', 'نستعمل مركز الفئة بدل كل بيان: إنه تقريب.', 'The class mark is used instead of each value: it is an approximation.')
        },
        check: {
            prompt: say('Lau tarteren maiztasun metatuak: 5, 12, 21, 30. Zein da tarte mediana?', 'Frecuencias acumuladas de cuatro intervalos: 5, 12, 21, 30. ¿Cuál es el intervalo mediano?', 'التكرارات المتجمّعة لأربع فئات: 5، 12، 21، 30. ما الفئة الوسيطة؟', 'Cumulative frequencies of four intervals: 5, 12, 21, 30. Which is the median interval?'),
            options: [say('Lehena', 'El primero', 'الأولى', 'The first'), say('Bigarrena', 'El segundo', 'الثانية', 'The second'), say('Hirugarrena', 'El tercero', 'الثالثة', 'The third')],
            correctIndex: 2,
            explanation: say('$\\frac{30}{2}=15$, eta $F$ hirugarrenean iristen da 15 zenbakira.', '$\\frac{30}{2}=15$, y $F$ alcanza 15 en el tercero.', '$\\frac{30}{2}=15$، ويبلغ $F$ القيمة 15 في الثالثة.', '$\\frac{30}{2}=15$, and $F$ reaches 15 in the third.')
        }
    },
    quartiles: {
        mistake: {
            wrong: say('Datuen % 25 dago $Q_1$ gainetik.', 'El 25 % de los datos está por encima de $Q_1$.', '25 % من البيانات فوق $Q_1$.', '25% of the data are above $Q_1$.'),
            right: say('$Q_1$ azpitik dago % 25; gainetik, % 75.', 'Por debajo de $Q_1$ está el 25 %; por encima, el 75 %.', 'تحت $Q_1$ يوجد 25 %، وفوقه 75 %.', 'Below $Q_1$ lies 25%; above it, 75%.')
        },
        check: {
            prompt: say('$Q_1=12$ eta $Q_3=20$ badira, zein da kuartil arteko ibiltartea?', 'Si $Q_1=12$ y $Q_3=20$, ¿cuál es el recorrido intercuartílico?', 'إذا كان $Q_1=12$ و$Q_3=20$ فما المدى الربيعي؟', 'If $Q_1=12$ and $Q_3=20$, what is the interquartile range?'),
            options: [same('$8$'), same('$32$'), same('$16$')],
            correctIndex: 0,
            explanation: same('$20-12=8$')
        }
    },
    percentiles: {
        mistake: {
            wrong: say('Azterketa bateko 70 pertzentilean egotea 7 bat ateratzea da.', 'Estar en el percentil 70 de un examen es sacar un 7.', 'أن تكون في المئين 70 في امتحان يعني أنك حصلت على 7.', 'Being in the 70th percentile of a test means scoring 7.'),
            right: say('Esan nahi du ikasleen % 70 nota horretan edo azpitik geratu zela.', 'Quiere decir que el 70 % de la clase sacó esa nota o menos.', 'يعني أن 70 % من الصف حصلوا على تلك العلامة أو أقل.', 'It means that 70% of the class scored that mark or less.')
        },
        check: {
            prompt: say('Zein kuartil da $p_{75}$ pertzentila?', '¿Qué cuartil es el percentil $p_{75}$?', 'أيّ ربيعي هو المئين $p_{75}$؟', 'Which quartile is the percentile $p_{75}$?'),
            options: [same('$Q_1$'), same('$\\text{Me}$'), same('$Q_3$')],
            correctIndex: 2,
            explanation: say('$Q_3$ azpitik datuen % 75 geratzen da.', 'Por debajo de $Q_3$ queda el 75 % de los datos.', 'تحت $Q_3$ يبقى 75 % من البيانات.', 'Below $Q_3$ lies 75% of the data.')
        }
    },
    'box-plot': {
        mistake: {
            wrong: say('Kutxa-diagrama batean, zatirik luzeenak datu gehien ditu.', 'En un diagrama de caja, el tramo más largo es el que tiene más datos.', 'في مخطط الصندوق الجزء الأطول فيه أكثر البيانات.', 'In a box plot, the longest part holds the most data.'),
            right: say('Zati bakoitzak datuen % 25 inguru du: zati luze batek datu sakabanatuagoak esan nahi du.', 'Cada tramo tiene más o menos el 25 % de los datos: un tramo largo significa datos más dispersos.', 'في كل جزء نحو 25 % من البيانات: الجزء الطويل يعني بيانات أكثر تشتتًا.', 'Each part holds about 25% of the data: a long part means more spread-out data.')
        },
        check: {
            prompt: say('$Q_1=6$ eta $Q_3=10$ badira, zein baliotik aurrera da atipikoa datu handi bat?', 'Si $Q_1=6$ y $Q_3=10$, ¿a partir de qué valor un dato grande es atípico?', 'إذا كان $Q_1=6$ و$Q_3=10$ فابتداءً من أي قيمة يكون البيان الكبير شاذًا؟', 'If $Q_1=6$ and $Q_3=10$, above which value is a large value an outlier?'),
            options: [same('$16$'), same('$14$'), same('$12$')],
            correctIndex: 0,
            explanation: same('$10+1{,}5\\cdot 4=16$')
        }
    },
    'mean-deviation': {
        mistake: {
            wrong: say('2, 4, 6 datuen desbideratze ertaina $\\frac{(2-4)+(4-4)+(6-4)}{3}=0$ da.', 'La desviación media de 2, 4, 6 es $\\frac{(2-4)+(4-4)+(6-4)}{3}=0$.', 'الانحراف المتوسط لـ 2، 4، 6 هو $\\frac{(2-4)+(4-4)+(6-4)}{3}=0$.', 'The mean deviation of 2, 4, 6 is $\\frac{(2-4)+(4-4)+(6-4)}{3}=0$.'),
            right: say('Distantziak erabili behar dira, balio absolutuarekin: $\\frac{2+0+2}{3}=\\frac{4}{3}$.', 'Hay que usar distancias, con valor absoluto: $\\frac{2+0+2}{3}=\\frac{4}{3}$.', 'يجب استعمال المسافات بالقيمة المطلقة: $\\frac{2+0+2}{3}=\\frac{4}{3}$.', 'You must use distances, with absolute value: $\\frac{2+0+2}{3}=\\frac{4}{3}$.')
        },
        check: {
            prompt: say('Multzo hauetatik, zeinek du 0 desbideratze ertaina?', '¿Qué conjunto tiene una desviación media de 0?', 'أيّ مجموعة انحرافها المتوسط 0؟', 'Which set has a mean deviation of 0?'),
            options: [same('5, 5, 5, 5'), same('1, 5, 9'), same('4, 5, 6')],
            correctIndex: 0,
            explanation: say('Datu guztiak batez bestekoaren berdinak dira: ez dago sakabanaketarik.', 'Todos los datos son iguales a la media: no hay dispersión.', 'كل البيانات تساوي المتوسط: لا تشتت.', 'Every value equals the mean: there is no spread.')
        }
    },
    variance: {
        mistake: {
            wrong: say('$\\sigma^2=16$ bada, desbideratze tipikoa 8 da.', 'Si $\\sigma^2=16$, la desviación típica es 8.', 'إذا كان $\\sigma^2=16$ فالانحراف المعياري 8.', 'If $\\sigma^2=16$, the standard deviation is 8.'),
            right: say('$\\sigma=\\sqrt{16}=4$: erroa da, ez erdia.', '$\\sigma=\\sqrt{16}=4$: es la raíz, no la mitad.', '$\\sigma=\\sqrt{16}=4$: إنه الجذر لا النصف.', '$\\sigma=\\sqrt{16}=4$: it is the root, not half.')
        },
        check: {
            prompt: say('Datu batzuek $\\frac{\\sum x_i^2}{N}=29$ eta $\\bar{x}=5$ dituzte. Zenbat da $\\sigma^2$?', 'Unos datos tienen $\\frac{\\sum x_i^2}{N}=29$ y $\\bar{x}=5$. ¿Cuánto vale $\\sigma^2$?', 'لبيانات $\\frac{\\sum x_i^2}{N}=29$ و$\\bar{x}=5$. ما قيمة $\\sigma^2$؟', 'Some data have $\\frac{\\sum x_i^2}{N}=29$ and $\\bar{x}=5$. What is $\\sigma^2$?'),
            options: [same('$4$'), same('$24$'), same('$2$')],
            correctIndex: 0,
            explanation: same('$29-5^{2}=4$')
        }
    },
    cv: {
        mistake: {
            wrong: say('$\\sigma$ txikieneko banaketa da beti homogeneoena.', 'La distribución con menor $\\sigma$ es siempre la más homogénea.', 'التوزيع ذو $\\sigma$ الأصغر هو دائمًا الأكثر تجانسًا.', 'The distribution with the smaller $\\sigma$ is always the more even one.'),
            right: say('Batez bestekoaren araberakoa da: $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$ konparatzen da. $\\sigma=3$ eta $\\bar{x}=10$ direnean, CV 0,3 da; $\\sigma=6$ eta $\\bar{x}=60$ direnean, 0,1 bakarrik.', 'Depende de la media: se compara $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$. Con $\\sigma=3$ y $\\bar{x}=10$, el CV es 0,3; con $\\sigma=6$ y $\\bar{x}=60$, solo 0,1.', 'يتوقف على المتوسط: نقارن $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$. مع $\\sigma=3$ و$\\bar{x}=10$ يكون 0.3، ومع $\\sigma=6$ و$\\bar{x}=60$ يكون 0.1 فقط.', 'It depends on the mean: compare $\\text{CV}=\\frac{\\sigma}{\\bar{x}}$. With $\\sigma=3$ and $\\bar{x}=10$, the CV is 0.3; with $\\sigma=6$ and $\\bar{x}=60$, only 0.1.')
        },
        check: {
            prompt: say('$\\bar{x}=40$ eta $\\sigma=6$ badira, zein da CV?', 'Si $\\bar{x}=40$ y $\\sigma=6$, ¿cuál es el CV?', 'إذا كان $\\bar{x}=40$ و$\\sigma=6$ فما معامل الاختلاف؟', 'If $\\bar{x}=40$ and $\\sigma=6$, what is the CV?'),
            options: [same('$0{,}15$'), same('$6{,}67$'), same('$0{,}6$')],
            correctIndex: 0,
            explanation: same('$\\frac{6}{40}=0{,}15$')
        }
    },
    scatter: {
        mistake: {
            wrong: say('Bi ikaslek ordu berak ikasi eta nota desberdinak ateratzen badituzte, ez dago inolako erlaziorik orduen eta notaren artean.', 'Si dos alumnos estudian las mismas horas y sacan notas distintas, no hay ninguna relación entre las horas y la nota.', 'إذا درس تلميذان الساعات نفسها وحصلا على علامتين مختلفتين فلا علاقة بين الساعات والعلامة.', 'If two pupils study the same hours and get different marks, there is no relation between hours and mark.'),
            right: say('Ez da funtzionala, baina estatistikoa izan daiteke: hodeiak joera erakusten du.', 'No es funcional, pero puede ser estadística: la nube muestra la tendencia.', 'ليست دالية لكنها قد تكون إحصائية: السحابة تُظهر الاتجاه.', 'It is not functional, but it can be statistical: the cloud shows the trend.')
        },
        check: {
            prompt: say('Zer erlazio dago karratu baten aldearen eta perimetroaren artean?', '¿Qué relación hay entre el lado de un cuadrado y su perímetro?', 'ما العلاقة بين ضلع مربع ومحيطه؟', 'What relation is there between the side of a square and its perimeter?'),
            options: [say('Funtzionala', 'Funcional', 'دالية', 'Functional'), say('Estatistikoa', 'Estadística', 'إحصائية', 'Statistical'), say('Bat ere ez', 'Ninguna', 'لا علاقة', 'None')],
            correctIndex: 0,
            explanation: say('Alde bakoitzak perimetro zehatz bat ematen du: $P=4l$.', 'Cada lado da un perímetro exacto: $P=4l$.', 'كل ضلع يعطي محيطًا محددًا: $P=4l$.', 'Each side gives an exact perimeter: $P=4l$.')
        }
    },
    correlation: {
        mistake: {
            wrong: say('$r=-0{,}95$ bada, korrelazioa ahula da, negatiboa delako.', 'Si $r=-0{,}95$, la correlación es débil, porque es negativa.', 'إذا كان $r=-0{,}95$ فالارتباط ضعيف لأنه سالب.', 'If $r=-0{,}95$, the correlation is weak, because it is negative.'),
            right: say('Zeinuak noranzkoa ematen du bakarrik: $|r|=0{,}95$ 1 zenbakitik hurbil dago; beraz, sendoa da (eta negatiboa).', 'El signo solo da el sentido: $|r|=0{,}95$ está cerca de 1, así que es fuerte (y negativa).', 'الإشارة تعطي الاتجاه فقط: $|r|=0{,}95$ قريب من 1، إذن هو قوي (وسالب).', 'The sign only gives the direction: $|r|=0{,}95$ is close to 1, so it is strong (and negative).')
        },
        check: {
            prompt: say('Zein $r$ baliok adierazten du korrelazio lineal sendoena?', '¿Qué valor de $r$ indica la correlación lineal más fuerte?', 'أيّ قيمة لـ $r$ تدل على أقوى ارتباط خطي؟', 'Which value of $r$ shows the strongest linear correlation?'),
            options: [same('$r=0{,}6$'), same('$r=-0{,}85$'), same('$r=0{,}1$')],
            correctIndex: 1,
            explanation: say('$|-0{,}85|$ da 1 zenbakitik hurbilena.', '$|-0{,}85|$ es el más cercano a 1.', '$|-0{,}85|$ هو الأقرب إلى 1.', '$|-0{,}85|$ is the closest to 1.')
        }
    },
    regression: {
        mistake: {
            wrong: say('3 eta 12 urte arteko haurren altueraren erregresio-zuzenarekin, 40 urteko altuera estimatzen dut.', 'Con la recta de regresión de la estatura de niños de 3 a 12 años, estimo la estatura a los 40 años.', 'بمستقيم انحدار طول الأطفال من 3 إلى 12 سنة أقدّر الطول في سن 40.', 'With the regression line of the height of children aged 3 to 12, I estimate the height at 40.'),
            right: say('Datuen tartetik kanpo (estrapolazioa) estimazioa ez da fidagarria: joera aldatu egiten da.', 'Fuera del intervalo de los datos (extrapolación) la estimación no es fiable: la tendencia cambia.', 'خارج فترة البيانات (الاستقراء الخارجي) لا يكون التقدير موثوقًا: الاتجاه يتغير.', 'Outside the interval of the data (extrapolation) the estimate is not reliable: the trend changes.')
        },
        check: {
            prompt: say('Erregresio-zuzena $(\\bar{x},\\bar{y})=(5,\\,20)$ puntutik pasatzen da, 3 maldarekin. Zein da?', 'La recta de regresión pasa por $(\\bar{x},\\bar{y})=(5,\\,20)$ con pendiente 3. ¿Cuál es?', 'يمر مستقيم الانحدار بـ $(\\bar{x},\\bar{y})=(5,\\,20)$ بميل 3. ما معادلته؟', 'The regression line goes through $(\\bar{x},\\bar{y})=(5,\\,20)$ with slope 3. Which is it?'),
            options: [same('$\\hat{y}=3x+5$'), same('$\\hat{y}=3x+20$'), same('$\\hat{y}=5x+3$')],
            correctIndex: 0,
            explanation: same('$\\hat{y}-20=3\\,(x-5)$')
        }
    }
}

import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistika · 1. DBH — the typical mistake and the «Check it» question
   of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. Tables and charts are given in
   words; percentages go in the words as each language writes them.
   ========================================================================== */

export type StatisticsIntroTopicId = 'study' | 'variables' | 'frequencies' | 'table' | 'bar-chart' | 'pie-chart' | 'line-chart' | 'mean' | 'median-mode' | 'range' | 'random' | 'laplace' | 'frequency-probability'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const statisticsIntroLessonChecks: Record<StatisticsIntroTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Data ---------- */
    study: {
        mistake: {
            wrong: say('Institutuko ikasleek zer kirol nahiago duten jakiteko, nahikoa da futbol taldeari galdetzea.', 'Para saber qué deporte prefieren los alumnos del instituto, basta con preguntar al equipo de fútbol.', 'لمعرفة الرياضة المفضلة لدى طلاب المدرسة يكفي أن نسأل فريق كرة القدم.', 'To find out which sport the pupils at school prefer, it is enough to ask the football team.'),
            right: say('Lagin horrek ez du populazioa ondo ordezkatzen: talde guztietako ikasleak aukeratu behar dira, zoriz.', 'Esa muestra no representa a la población: hay que elegir alumnos de todos los grupos, al azar.', 'هذه العيّنة لا تمثّل المجتمع: يجب اختيار طلاب من كل الأفواج عشوائيًا.', 'That sample does not represent the population: you have to choose pupils from every group, at random.')
        },
        check: {
            prompt: say('Supermerkatu bateko 2000 bezeroetatik 50 bezerori galdetzen zaie. Zein da lagina?', 'Se pregunta a 50 clientes de un supermercado de un total de 2000. ¿Qué es la muestra?', 'نسأل 50 زبونًا من أصل 2000 زبون في متجر. ما العيّنة؟', '50 customers out of 2,000 at a supermarket are asked. What is the sample?'),
            options: [say('2000 bezeroak', 'Los 2000 clientes', 'الزبائن الـ2000', 'The 2,000 customers'), say('50 bezeroak', 'Los 50 clientes', 'الزبائن الـ50', 'The 50 customers'), say('Bezero bakoitza', 'Cada cliente', 'كل زبون', 'Each customer')],
            correctIndex: 1,
            explanation: say('Lagina galdetzen zaien zatia da: 50 bezeroak. 2000 bezeroak populazioa dira, eta bakoitza, banakoa.', 'La muestra es la parte a la que se pregunta: los 50. Los 2000 son la población, y cada uno, un individuo.', 'العيّنة هي الجزء الذي نسأله: الـ50. والـ2000 هم المجتمع، وكل واحد منهم فرد.', 'The sample is the part you ask: the 50. The 2,000 are the population, and each one is an individual.')
        }
    },
    variables: {
        mistake: {
            wrong: say('Oinetakoen zenbakia aldagai jarraitua da, zenbaki bat delako.', 'El número de calzado es una variable continua, porque es un número.', 'مقاس الحذاء متغير متصل لأنه عدد.', 'Shoe size is a continuous variable, because it is a number.'),
            right: say('Balio solteak bakarrik hartzen ditu (37, 38, 39…): diskretua da. Jarraitua neurtzen dena da, oinaren luzera bezala.', 'Solo toma valores sueltos (37, 38, 39…): es discreta. Continua es lo que se mide, como la longitud del pie.', 'لا يأخذ إلا قيمًا منفصلة (37، 38، 39…): إنه متقطع. والمتصل ما يُقاس، مثل طول القدم.', 'It only takes separate values (37, 38, 39…): it is discrete. Continuous is what you measure, like the length of your foot.')
        },
        check: {
            prompt: say('Zein aldagai da kuantitatibo jarraitua?', '¿Qué variable es cuantitativa continua?', 'أيّ متغير كمي متصل؟', 'Which variable is continuous?'),
            options: [say('Ilearen kolorea', 'El color del pelo', 'لون الشعر', 'Hair colour'), say('Motxila baten pisua', 'El peso de una mochila', 'وزن حقيبة', 'The weight of a rucksack'), say('Lehengusu kopurua', 'El número de primos', 'عدد أبناء العم', 'The number of cousins')],
            correctIndex: 1,
            explanation: say('Pisua neurtu egiten da eta edozein balio har dezake. Lehengusuak zenbatu egiten dira (diskretua), eta kolorea ez da zenbaki bat.', 'El peso se mide y puede tomar cualquier valor. Los primos se cuentan (discreta) y el color no es un número.', 'الوزن يُقاس ويأخذ أي قيمة. أما أبناء العم فيُعدّون (متقطع)، واللون ليس عددًا.', 'Weight is measured and can take any value. Cousins are counted (discrete) and colour is not a number.')
        }
    },

    /* ---------- 2. Tables ---------- */
    frequencies: {
        mistake: {
            wrong: say('30 datutatik 6 aldiz agertzen den datu baten maiztasun erlatiboa $\\frac{30}{6}=5$ da.', 'La frecuencia relativa de un dato que sale 6 veces en 30 es $\\frac{30}{6}=5$.', 'التكرار النسبي لقيمة ظهرت 6 مرات من 30 هو $\\frac{30}{6}=5$.', 'The relative frequency of a value that comes up 6 times out of 30 is $\\frac{30}{6}=5$.'),
            right: say('Absolutua zati $N$ da: $\\frac{6}{30}=0{,}2$. Ez da inoiz 1 baino handiagoa.', 'Es la absoluta entre $N$: $\\frac{6}{30}=0{,}2$. Nunca pasa de 1.', 'إنه التكرار المطلق مقسومًا على $N$: $\\frac{6}{30}=0{,}2$. ولا يتجاوز 1 أبدًا.', 'It is the absolute frequency divided by $N$: $\\frac{6}{30}=0{,}2$. It is never more than 1.')
        },
        check: {
            prompt: say('40 ikasleko gela batean, 10 ikaslek betaurrekoak dituzte. Zein da maiztasun erlatiboa?', 'En una clase de 40 alumnos, 10 llevan gafas. ¿Cuál es la frecuencia relativa?', 'في صف فيه 40 طالبًا، يرتدي 10 منهم نظارات. ما التكرار النسبي؟', 'In a class of 40 pupils, 10 wear glasses. What is the relative frequency?'),
            options: [same('$0{,}25$'), same('$4$'), same('$10$')],
            correctIndex: 0,
            explanation: say('$\\frac{10}{40}=0{,}25$: 1 baino txikiagoa.', '$\\frac{10}{40}=0{,}25$: menor que 1.', '$\\frac{10}{40}=0{,}25$: أصغر من 1.', '$\\frac{10}{40}=0{,}25$: less than 1.')
        }
    },
    table: {
        mistake: {
            wrong: say('Datuak: 2, 4, 4, 5, 2, 4. Taula: 2 → 2, 4 → 3. Bukatu da.', 'Datos: 2, 4, 4, 5, 2, 4. Tabla: 2 → 2, 4 → 3. Ya está.', 'البيانات: 2، 4، 4، 5، 2، 4. الجدول: 2 ← 2، 4 ← 3. انتهى.', 'Data: 2, 4, 4, 5, 2, 4. Table: 2 → 2, 4 → 3. Done.'),
            right: say('5 falta da, behin agertzen dena: $f_{i}$ maiztasunek 6 batu behar dute, datu kopurua.', 'Falta el 5, que sale una vez: las $f_{i}$ tienen que sumar 6, el número de datos.', 'ينقص 5 الذي ظهر مرة واحدة: يجب أن يكون مجموع $f_{i}$ هو 6، عدد البيانات.', 'The 5 is missing; it comes up once: the $f_{i}$ must add up to 6, the number of data.')
        },
        check: {
            prompt: say('Datuak: 3, 1, 3, 2, 3, 1. Zein da 3 zenbakiaren maiztasun absolutua?', 'Datos: 3, 1, 3, 2, 3, 1. ¿Cuál es la frecuencia absoluta del 3?', 'البيانات: 3، 1، 3، 2، 3، 1. ما التكرار المطلق للعدد 3؟', 'Data: 3, 1, 3, 2, 3, 1. What is the absolute frequency of 3?'),
            options: [same('$\\frac{1}{2}$'), same('$3$'), same('$6$')],
            correctIndex: 1,
            explanation: say('3 zenbakia 3 aldiz agertzen da. $\\frac{1}{2}$ haren maiztasun erlatiboa litzateke.', 'El 3 sale 3 veces. $\\frac{1}{2}$ sería su frecuencia relativa.', 'يظهر 3 ثلاث مرات. أما $\\frac{1}{2}$ فهو تكراره النسبي.', 'The 3 comes up 3 times. $\\frac{1}{2}$ would be its relative frequency.')
        }
    },

    /* ---------- 3. Charts ---------- */
    'bar-chart': {
        mistake: {
            wrong: say('Ardatz bertikalean 0, 5, 7, 12 jartzen ditut: taulako zenbakiak.', 'En el eje vertical pongo 0, 5, 7, 12: los números de la tabla.', 'أضع على المحور العمودي 0، 5، 7، 12: أعداد الجدول.', 'On the vertical axis I put 0, 5, 7, 12: the numbers in the table.'),
            right: say('Eskalak tarte berdinez joan behar du (0, 2, 4, 6…); bestela, altuerek engainatu egiten dute.', 'La escala tiene que ir de igual en igual (0, 2, 4, 6…); si no, las alturas engañan.', 'يجب أن يسير المقياس بخطوات متساوية (0، 2، 4، 6…)، وإلا خدعتنا الارتفاعات.', 'The scale has to go up in equal steps (0, 2, 4, 6…); if not, the heights are misleading.')
        },
        check: {
            prompt: say('Barra-diagrama batean, zer adierazten du barra bakoitzaren altuerak?', 'En un diagrama de barras, ¿qué indica la altura de cada barra?', 'في مخطط الأعمدة، علامَ يدل ارتفاع كل عمود؟', 'In a bar chart, what does the height of each bar show?'),
            options: [say('Balioa', 'El valor', 'القيمة', 'The value'), say('Maiztasuna', 'La frecuencia', 'التكرار', 'The frequency'), say('Balio kopurua', 'El número de valores', 'عدد القيم', 'The number of values')],
            correctIndex: 1,
            explanation: say('Balioa ardatz horizontalean dago; altuerak zenbat aldiz agertzen den esaten du.', 'El valor está en el eje horizontal; la altura dice cuántas veces aparece.', 'القيمة على المحور الأفقي؛ والارتفاع يدل على عدد مرات ظهورها.', 'The value is on the horizontal axis; the height says how many times it appears.')
        }
    },
    'pie-chart': {
        mistake: {
            wrong: say('24 ikasletatik 6 ikaslek antzerkia aukeratzen badute, haren sektoreak $6^{\\circ}$ neurtzen ditu.', 'Si 6 de 24 alumnos eligen teatro, su sector mide $6^{\\circ}$.', 'إذا اختار 6 من 24 طالبًا المسرح فقياس قطاعه $6^{\\circ}$.', 'If 6 of 24 pupils choose drama, its sector is $6^{\\circ}$.'),
            right: say('Zirkulua $360^{\\circ}$ da: $\\frac{6}{24}\\cdot 360^{\\circ}=90^{\\circ}$.', 'El círculo son $360^{\\circ}$: $\\frac{6}{24}\\cdot 360^{\\circ}=90^{\\circ}$.', 'الدائرة $360^{\\circ}$: $\\frac{6}{24}\\cdot 360^{\\circ}=90^{\\circ}$.', 'The circle is $360^{\\circ}$: $\\frac{6}{24}\\cdot 360^{\\circ}=90^{\\circ}$.')
        },
        check: {
            prompt: say('Sektore batek zirkuluaren erdia hartzen du. Zenbat gradu neurtzen ditu?', 'Un sector ocupa la mitad del círculo. ¿Cuántos grados mide?', 'قطاع يشغل نصف الدائرة. كم درجة قياسه؟', 'A sector takes up half the circle. How many degrees is it?'),
            options: [same('$180^{\\circ}$'), same('$50^{\\circ}$'), same('$90^{\\circ}$')],
            correctIndex: 0,
            explanation: say('$360^{\\circ}$-ren erdia: $180^{\\circ}$. $50^{\\circ}$ ehunekoa nahastea da graduekin.', 'La mitad de $360^{\\circ}$: $180^{\\circ}$. $50^{\\circ}$ es confundir el porcentaje con los grados.', 'نصف $360^{\\circ}$: $180^{\\circ}$. أما $50^{\\circ}$ فخلط بين النسبة المئوية والدرجات.', 'Half of $360^{\\circ}$: $180^{\\circ}$. $50^{\\circ}$ mixes up the percentage with degrees.')
        }
    },
    'line-chart': {
        mistake: {
            wrong: say('Lerro-diagrama bat erabiltzen dut gelako kolore gogokoenerako.', 'Uso un diagrama de líneas para el color favorito de la clase.', 'أستعمل مخططًا خطيًا للون المفضّل في الصف.', 'I use a line chart for the class\'s favourite colour.'),
            right: say('Lerroak denboran aldatzen diren datuetarako dira; kolorerako, barrak edo sektoreak.', 'Las líneas son para datos que cambian con el tiempo; para el color, barras o sectores.', 'الخطوط للبيانات التي تتغير مع الزمن؛ أما اللون فللأعمدة أو القطاعات.', 'Lines are for data that change over time; for colour, bars or a pie chart.')
        },
        check: {
            prompt: say('Lerro-diagrama batean, astelehenetik asteartera doan zuzenkia jaitsi egiten da. Zer gertatu da?', 'En un diagrama de líneas, el segmento de lunes a martes baja. ¿Qué ha pasado?', 'في مخطط خطي ينزل الجزء من الاثنين إلى الثلاثاء. ماذا حدث؟', 'On a line chart, the segment from Monday to Tuesday goes down. What has happened?'),
            options: [say('Datua handitu egin da', 'El dato ha aumentado', 'زادت القيمة', 'The value has gone up'), say('Datua txikitu egin da', 'El dato ha disminuido', 'نقصت القيمة', 'The value has gone down'), say('Ez dago daturik', 'No hay datos', 'لا توجد بيانات', 'There are no data')],
            correctIndex: 1,
            explanation: say('Lerroa jaisten bada, asteartekoa astelehenekoa baino txikiagoa da.', 'Si la línea baja, el dato del martes es menor que el del lunes.', 'إذا نزل الخط فقيمة الثلاثاء أصغر من قيمة الاثنين.', 'If the line goes down, Tuesday\'s value is smaller than Monday\'s.')
        }
    },

    /* ---------- 4. Parameters ---------- */
    mean: {
        mistake: {
            wrong: say('4, 6 eta 8 zenbakien batez bestekoa $4+6+8=18$ da.', 'La media de 4, 6 y 8 es $4+6+8=18$.', 'متوسط 4 و6 و8 هو $4+6+8=18$.', 'The mean of 4, 6 and 8 is $4+6+8=18$.'),
            right: say('Datu kopuruaz zatitzea falta da: $\\frac{18}{3}=6$.', 'Falta dividir entre el número de datos: $\\frac{18}{3}=6$.', 'ينقص القسمة على عدد البيانات: $\\frac{18}{3}=6$.', 'You still have to divide by the number of data: $\\frac{18}{3}=6$.')
        },
        check: {
            prompt: say('Zein da 2, 4, 6 eta 8 zenbakien batez bestekoa?', '¿Cuál es la media de 2, 4, 6 y 8?', 'ما متوسط 2 و4 و6 و8؟', 'What is the mean of 2, 4, 6 and 8?'),
            options: [same('$20$'), same('$5$'), same('$4$')],
            correctIndex: 1,
            explanation: say('$\\frac{2+4+6+8}{4}=\\frac{20}{4}=5$.', '$\\frac{2+4+6+8}{4}=\\frac{20}{4}=5$.', '$\\frac{2+4+6+8}{4}=\\frac{20}{4}=5$.', '$\\frac{2+4+6+8}{4}=\\frac{20}{4}=5$.')
        }
    },
    'median-mode': {
        mistake: {
            wrong: say('9, 2, 5 zenbakien mediana 2 da, erdian dagoelako.', 'La mediana de 9, 2, 5 es 2, porque es el del centro.', 'وسيط 9، 2، 5 هو 2 لأنه في الوسط.', 'The median of 9, 2, 5 is 2, because it is in the middle.'),
            right: say('Lehenik ordenatu behar da: 2, 5, 9. Mediana 5 da.', 'Primero hay que ordenar: 2, 5, 9. La mediana es 5.', 'يجب الترتيب أولًا: 2، 5، 9. الوسيط هو 5.', 'You have to put them in order first: 2, 5, 9. The median is 5.')
        },
        check: {
            prompt: say('Zein da 4, 6, 6, 3, 6, 4 datuen moda?', '¿Cuál es la moda de 4, 6, 6, 3, 6, 4?', 'ما منوال 4، 6، 6، 3، 6، 4؟', 'What is the mode of 4, 6, 6, 3, 6, 4?'),
            options: [same('$4$'), same('$5$'), same('$6$')],
            correctIndex: 2,
            explanation: say('6 da gehien errepikatzen dena: 3 aldiz.', 'El 6 es el que más se repite: 3 veces.', 'العدد 6 هو الأكثر تكرارًا: 3 مرات.', '6 is the one that comes up most: 3 times.')
        }
    },
    range: {
        mistake: {
            wrong: say('5, 12, 8 eta 3 zenbakien ibiltartea $5-3=2$ da: lehena ken azkena.', 'El rango de 5, 12, 8 y 3 es $5-3=2$: el primero menos el último.', 'مدى 5 و12 و8 و3 هو $5-3=2$: الأول ناقص الأخير.', 'The range of 5, 12, 8 and 3 is $5-3=2$: the first minus the last.'),
            right: say('Handiena ken txikiena da: $12-3=9$.', 'Es el mayor menos el menor: $12-3=9$.', 'إنه الأكبر ناقص الأصغر: $12-3=9$.', 'It is the biggest minus the smallest: $12-3=9$.')
        },
        check: {
            prompt: say('Zein da 20, 35, 28, 17 eta 31 zenbakien ibiltartea?', '¿Cuál es el rango de 20, 35, 28, 17 y 31?', 'ما مدى 20 و35 و28 و17 و31؟', 'What is the range of 20, 35, 28, 17 and 31?'),
            options: [same('$11$'), same('$18$'), same('$15$')],
            correctIndex: 1,
            explanation: say('Handiena 35 da eta txikiena 17: $35-17=18$.', 'El mayor es 35 y el menor, 17: $35-17=18$.', 'الأكبر 35 والأصغر 17: $35-17=18$.', 'The biggest is 35 and the smallest 17: $35-17=18$.')
        }
    },

    /* ---------- 5. Probability ---------- */
    random: {
        mistake: {
            wrong: say('Dado batekin 0 baino zenbaki handiago bat ateratzea gertaera ezinezkoa da.', 'Sacar un número mayor que 0 con un dado es un suceso imposible.', 'الحصول على عدد أكبر من 0 بنرد حدث مستحيل.', 'Getting a number greater than 0 on a die is an impossible event.'),
            right: say('Beti ateratzen da 0 baino handiagoa: gertaera segurua da.', 'Siempre sale un número mayor que 0: es un suceso seguro.', 'يظهر دائمًا عدد أكبر من 0: إنه حدث مؤكد.', 'You always get a number greater than 0: it is a certain event.')
        },
        check: {
            prompt: say('Zein esperimentu da ausazkoa?', '¿Qué experimento es aleatorio?', 'أيّ تجربة عشوائية؟', 'Which experiment is random?'),
            options: [say('Izotza berotu eta urtzen den ikustea', 'Calentar hielo y ver si se funde', 'تسخين الجليد ورؤية هل يذوب', 'Heating ice and seeing whether it melts'), say('Koloretako bolak dituen poltsa batetik bola bat ateratzea', 'Sacar una bola de una bolsa con bolas de colores', 'سحب كرة من كيس فيه كرات ملوّنة', 'Taking a ball out of a bag of coloured balls'), say('Harri bat askatu eta erortzen den ikustea', 'Soltar una piedra y ver si cae', 'إفلات حجر ورؤية هل يسقط', 'Dropping a stone and seeing whether it falls')],
            correctIndex: 1,
            explanation: say('Ezin da jakin zein kolore aterako den. Izotza urtu eta harria erori egiten dira beti: deterministak.', 'No se puede saber qué color saldrá. El hielo se funde y la piedra cae siempre: son deterministas.', 'لا يمكن معرفة اللون الذي سيظهر. أما الجليد فيذوب دائمًا والحجر يسقط دائمًا: تجربتان حتميتان.', 'You cannot know which colour will come out. Ice always melts and the stone always falls: they are deterministic.')
        }
    },
    laplace: {
        mistake: {
            wrong: say('2 bola gorri eta 6 berde dituen poltsa batean, gorria ateratzeko probabilitatea $\\frac{2}{6}$ da.', 'En una bolsa con 2 bolas rojas y 6 verdes, la probabilidad de roja es $\\frac{2}{6}$.', 'في كيس فيه كرتان حمراوان و6 خضراء، احتمال الحمراء هو $\\frac{2}{6}$.', 'In a bag with 2 red balls and 6 green ones, the probability of red is $\\frac{2}{6}$.'),
            right: say('Kasu posibleak bola guztiak dira, 8: $\\frac{2}{8}=\\frac{1}{4}$.', 'Los casos posibles son todas las bolas, 8: $\\frac{2}{8}=\\frac{1}{4}$.', 'الحالات الممكنة هي كل الكرات، 8: $\\frac{2}{8}=\\frac{1}{4}$.', 'The possible outcomes are all the balls, 8: $\\frac{2}{8}=\\frac{1}{4}$.')
        },
        check: {
            prompt: say('Dado bat jaurtitzen da. Zer probabilitate dago 3 baino zenbaki txikiago bat ateratzeko?', 'Se lanza un dado. ¿Qué probabilidad hay de sacar un número menor que 3?', 'نرمي نردًا. ما احتمال الحصول على عدد أصغر من 3؟', 'A die is rolled. What is the probability of getting a number less than 3?'),
            options: [same('$\\frac{3}{6}$'), same('$\\frac{2}{6}$'), same('$\\frac{2}{3}$')],
            correctIndex: 1,
            explanation: say('Kasu aldekoak: 1 eta 2. Posibleak: 6. $\\frac{2}{6}=\\frac{1}{3}$.', 'Favorables: 1 y 2. Posibles: 6. $\\frac{2}{6}=\\frac{1}{3}$.', 'الحالات المواتية: 1 و2. الممكنة: 6. $\\frac{2}{6}=\\frac{1}{3}$.', 'Favourable: 1 and 2. Possible: 6. $\\frac{2}{6}=\\frac{1}{3}$.')
        }
    },
    'frequency-probability': {
        mistake: {
            wrong: say('Txanpon bat 4 aldiz jaurti eta 3 aurpegi ateratzen badira, aurpegiaren probabilitatea $\\frac{3}{4}$ da.', 'Si lanzo una moneda 4 veces y salen 3 caras, la probabilidad de cara es $\\frac{3}{4}$.', 'إذا رميت قطعة نقود 4 مرات وظهر الوجه 3 مرات فاحتمال الوجه $\\frac{3}{4}$.', 'If I toss a coin 4 times and get 3 heads, the probability of heads is $\\frac{3}{4}$.'),
            right: say('Hori maiztasun erlatiboa da. Probabilitatea $\\frac{1}{2}$ da oraindik; jaurtiketa askorekin, maiztasuna hartara hurbiltzen da.', 'Eso es la frecuencia relativa. La probabilidad sigue siendo $\\frac{1}{2}$; con muchas tiradas, la frecuencia se acerca a ella.', 'هذا هو التكرار النسبي. الاحتمال يبقى $\\frac{1}{2}$؛ ومع رميات كثيرة يقترب التكرار منه.', 'That is the relative frequency. The probability is still $\\frac{1}{2}$; with lots of tosses, the frequency gets close to it.')
        },
        check: {
            prompt: say('Txanpon bat 1000 aldiz jaurtitzean, zenbat aurpegi aterako dira, gutxi gorabehera?', 'Al lanzar una moneda 1000 veces, ¿cuántas caras saldrán, más o menos?', 'عند رمي قطعة نقود 1000 مرة، كم وجهًا يظهر تقريبًا؟', 'If you toss a coin 1,000 times, roughly how many heads will you get?'),
            options: [same('$500$'), same('$1000$'), same('$250$')],
            correctIndex: 0,
            explanation: say('Probabilitatea $\\frac{1}{2}$ da: 1000 jaurtiketaren erdia inguru.', 'La probabilidad es $\\frac{1}{2}$: cerca de la mitad de 1000.', 'الاحتمال $\\frac{1}{2}$: قرابة نصف 1000.', 'The probability is $\\frac{1}{2}$: about half of 1,000.')
        }
    }
}

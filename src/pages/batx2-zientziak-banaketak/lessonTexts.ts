import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { DistributionsBatx2TopicId } from './lessonChecks.ts'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Zientziak — what each lesson tells: the new
   words (definitions), a short explanation, the example as an exercise
   («Another example»), the key words in four languages and, in the new
   lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics. The example uses numbers of its
   own, never those of «Let's solve», of «Check it» or of the typical
   mistake. The values of the normal table come from normal.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const distributionsBatx2LessonTexts: Record<DistributionsBatx2TopicId, LessonTexts> = {
    /* ---------- 1. Before you start: review ---------- */
    'review-combinatorial': {
        definitions: [
            { term: say('Zenbaki konbinatorioa', 'Número combinatorio', 'العدد التوافقي', 'Binomial coefficient'), meaning: say('$\\binom{n}{k}$ zenbakia $n$ elementutatik $k$ aukeratzeko modu kopurua da, ordenak axola ez duela.', '$\\binom{n}{k}$ es el número de formas de elegir $k$ elementos de $n$ sin que importe el orden.', '$\\binom{n}{k}$ هو عدد طرق اختيار $k$ عنصرًا من $n$ دون أن يهم الترتيب.', '$\\binom{n}{k}$ is the number of ways of choosing $k$ elements out of $n$ when the order does not matter.') }
        ],
        vocabulary: [
            say('simetria', 'simetría', 'التماثل', 'symmetry'),
            say('Tartagliaren triangelua', 'triángulo de Tartaglia', 'مثلث تارتاليا', 'Tartaglia\'s triangle'),
            say('ordena', 'orden', 'الترتيب', 'order')
        ],
        explanation: say(
            '$n$ botalditan $k$ aurpegi zenbat modutan ateratzen diren zenbatzeko, nahikoa da zein $k$ botalditan ateratzen diren aukeratzea: $\\binom{n}{k}$ modu daude. Faktorialekin kalkulatzen da, goian eta behean sinplifikatuz, edo Tartagliaren triangeluan irakurtzen da. $k$ aurpegiak aukeratzea $n-k$ gurutzeak aukeratzea da: horregatik $\\binom{n}{k}=\\binom{n}{n-k}$.',
            'Para contar de cuántas formas salen $k$ caras en $n$ lanzamientos, basta elegir en qué $k$ lanzamientos salen: hay $\\binom{n}{k}$ formas. Se calcula con factoriales, simplificando arriba y abajo, o se lee en el triángulo de Tartaglia. Elegir las $k$ caras es elegir las $n-k$ cruces: por eso $\\binom{n}{k}=\\binom{n}{n-k}$.',
            'لعدّ طرق ظهور $k$ وجهًا في $n$ رمية يكفي اختيار الرميات $k$ التي تظهر فيها: هناك $\\binom{n}{k}$ طريقة. يُحسب بالعاملي مع الاختصار في البسط والمقام، أو يُقرأ في مثلث تارتاليا. واختيار الأوجه $k$ هو اختيار الظهور $n-k$: لذلك $\\binom{n}{k}=\\binom{n}{n-k}$.',
            'To count the ways of getting $k$ heads in $n$ tosses, it is enough to choose in which $k$ tosses they come up: there are $\\binom{n}{k}$ ways. It is worked out with factorials, simplifying top and bottom, or read in Tartaglia\'s triangle. Choosing the $k$ heads is choosing the $n-k$ tails: that is why $\\binom{n}{k}=\\binom{n}{n-k}$.'
        ),
        examplePrompt: say('Zenbat da $\\binom{7}{3}$, 7 galderatatik 3 asmatzeko modu kopurua?', '¿Cuánto vale $\\binom{7}{3}$, el número de formas de acertar 3 de 7 preguntas?', 'كم يساوي $\\binom{7}{3}$، أي عدد طرق إصابة 3 من 7 أسئلة؟', 'What is $\\binom{7}{3}$, the number of ways of getting 3 of 7 questions right?'),
        example: same('$\\binom{7}{3}=\\frac{7\\cdot 6\\cdot 5}{3\\cdot 2\\cdot 1}=35$'),
        exampleAnswer: say('35 modu daude, 4 huts egiteko adina: $\\binom{7}{4}=35$.', 'Hay 35 formas, las mismas que de fallar 4: $\\binom{7}{4}=35$.', 'هناك 35 طريقة، بقدر طرق الخطأ في 4: $\\binom{7}{4}=35$.', 'There are 35 ways, as many as of getting 4 wrong: $\\binom{7}{4}=35$.'),
        why: {
            text: say('Zergatik zatitzen da $k!$ zenbakiaz? Ordenarekin, $k$ elementuko talde bakoitza $k!$ aldiz agertzen da, ordenatzeko modu bakoitzeko behin; errepikapen horiek kendu behar dira.', '¿Por qué se divide entre $k!$? Con orden, cada grupo de $k$ elementos aparece $k!$ veces, una por cada forma de ordenarlo, así que hay que quitar esas repeticiones.', 'لماذا نقسم على $k!$؟ مع الترتيب تظهر كل مجموعة من $k$ عناصر $k!$ مرة، مرة لكل طريقة لترتيبها، فيجب حذف هذا التكرار.', 'Why divide by $k!$? With order, each group of $k$ elements appears $k!$ times, once for each way of ordering it, so those repeats have to be removed.'),
            math: same('$V_{4,2}=4\\cdot 3=12\\qquad\\binom{4}{2}=\\frac{12}{2!}=6$')
        }
    },
    'review-mean-sd': {
        definitions: [
            { term: say('Maiztasun erlatiboa', 'Frecuencia relativa', 'التكرار النسبي', 'Relative frequency'), meaning: say('Balio bat hartzen duten datuen zatia: haren kopurua zati guztizkoa, $h_i=\\frac{n_i}{N}$.', 'La fracción de los datos que toma un valor: su recuento entre el total, $h_i=\\frac{n_i}{N}$.', 'جزء البيانات التي تأخذ قيمة ما: عددها على الكل، $h_i=\\frac{n_i}{N}$.', 'The fraction of the data that take a value: its count over the total, $h_i=\\frac{n_i}{N}$.') }
        ],
        vocabulary: [
            say('batez bestekoa', 'media', 'المتوسط', 'mean'),
            say('bariantza', 'varianza', 'التباين', 'variance'),
            say('puntuazio tipikoa', 'puntuación típica', 'الدرجة المعيارية', 'standard score')
        ],
        explanation: say(
            'Maiztasun-taula batean, batez bestekoa balio bakoitza bider hura hartzen duten datuen zatia da, dena batuta: $\\bar{x}=\\sum x_i\\,h_i$. Bariantzak erdigunetik zenbat urruntzen diren neurtzen du: karratuen batez bestekoa ken batez bestekoaren karratua da, eta haren erroa da $\\sigma$ desbideratze tipikoa. Gai honetan, $h_i$ maiztasunak probabilitateak izango dira.',
            'Con una tabla de frecuencias, la media es cada valor por la parte de los datos que lo toma, sumado: $\\bar{x}=\\sum x_i\\,h_i$. La varianza mide cuánto se alejan del centro: es la media de los cuadrados menos el cuadrado de la media, y su raíz es la desviación típica $\\sigma$. En este tema, las $h_i$ serán probabilidades.',
            'في جدول تكرارات، المتوسط هو مجموع كل قيمة مضروبة في جزء البيانات الذي يأخذها: $\\bar{x}=\\sum x_i\\,h_i$. ويقيس التباين مدى ابتعاد البيانات عن المركز: هو متوسط المربعات ناقص مربع المتوسط، وجذره الانحراف المعياري $\\sigma$. وفي هذا الموضوع ستصير $h_i$ احتمالات.',
            'With a frequency table, the mean is each value times the share of the data that take it, all added: $\\bar{x}=\\sum x_i\\,h_i$. The variance measures how far they spread from the centre: it is the mean of the squares minus the square of the mean, and its root is the standard deviation $\\sigma$. In this topic, the $h_i$ will be probabilities.'
        ),
        examplePrompt: say('Azterketa batean, notak hauek dira: 4 (% 25), 6 (% 50) eta 8 (% 25). Zein da batez bestekoa?', 'Las notas de un examen son 4 (el 25 %), 6 (el 50 %) y 8 (el 25 %). ¿Cuál es la media?', 'علامات اختبار هي 4 (25٪) و6 (50٪) و8 (25٪). ما المتوسط؟', 'The marks in a test are 4 (25%), 6 (50%) and 8 (25%). What is the mean?'),
        example: same('$\\bar{x}=4\\cdot 0{,}25+6\\cdot 0{,}5+8\\cdot 0{,}25=6$'),
        exampleAnswer: say('Batez bestekoa 6 da, eta bariantza, $16\\cdot 0{,}25+36\\cdot 0{,}5+64\\cdot 0{,}25-36=2$.', 'La media es 6, y la varianza, $16\\cdot 0{,}25+36\\cdot 0{,}5+64\\cdot 0{,}25-36=2$.', 'المتوسط 6، والتباين $16\\cdot 0{,}25+36\\cdot 0{,}5+64\\cdot 0{,}25-36=2$.', 'The mean is 6, and the variance, $16\\cdot 0{,}25+36\\cdot 0{,}5+64\\cdot 0{,}25-36=2$.')
    },

    /* ---------- 2. Discrete random variables ---------- */
    'random-variable': {
        definitions: [
            { term: say('Aldagai aleatorioa', 'Variable aleatoria', 'المتغير العشوائي', 'Random variable'), meaning: say('Esperimentu aleatorio baten emaitza bakoitzari zenbaki bat lotzen dion araua, aurpegi kopurua adibidez.', 'Una regla que asocia un número a cada resultado de un experimento aleatorio, como el número de caras.', 'قاعدة تربط عددًا بكل نتيجة لتجربة عشوائية، مثل عدد الأوجه.', 'A rule that attaches a number to each outcome of a random experiment, such as the number of heads.') },
            { term: say('Probabilitate-funtzioa', 'Función de probabilidad', 'دالة الاحتمال', 'Probability function'), meaning: say('Aldagai diskretu baten $x_i$ balio bakoitzari bere $p_i=P(X=x_i)$ probabilitatea ematen dion taula.', 'La tabla que da, para cada valor $x_i$ de una variable discreta, su probabilidad $p_i=P(X=x_i)$.', 'الجدول الذي يعطي لكل قيمة $x_i$ لمتغير متقطع احتمالها $p_i=P(X=x_i)$.', 'The table that gives, for each value $x_i$ of a discrete variable, its probability $p_i=P(X=x_i)$.') }
        ],
        vocabulary: [
            say('diskretua', 'discreta', 'المتقطع', 'discrete'),
            say('balioa', 'valor', 'القيمة', 'value')
        ],
        explanation: say(
            '$X$ aldagai aleatorio batek emaitza bakoitza zenbaki bihurtzen du. Diskretua da, zerrenda daitezkeen balio solteak hartzen baditu. Haren probabilitate-funtzioak balio bakoitza bere probabilitatearekin ematen du: guztiak 0 edo handiagoak dira eta 1 egiten dute batuta; beraz, bat falta bada, 1 zenbakitik kenduz kalkulatzen da. Hainbat balioren probabilitateak batu egiten dira.',
            'Una variable aleatoria $X$ convierte cada resultado en un número. Es discreta si toma valores sueltos que se pueden enumerar. Su función de probabilidad da cada valor con su probabilidad: todas son mayores o iguales que 0 y suman 1, así que si falta una, se calcula restando de 1. Las probabilidades de varios valores se suman.',
            'يحوّل المتغير العشوائي $X$ كل نتيجة إلى عدد. ويكون متقطعًا إذا أخذ قيمًا منفصلة يمكن عدّها. وتعطي دالة احتماله كل قيمة مع احتمالها: كلها أكبر من 0 أو تساويه ومجموعها 1، فإذا نقص احتمال حُسب بالطرح من 1. وتُجمع احتمالات عدة قيم.',
            'A random variable $X$ turns each outcome into a number. It is discrete if it takes separate values that can be listed. Its probability function gives each value with its probability: they are all 0 or more and add up to 1, so if one is missing, it is found by subtracting from 1. The probabilities of several values are added.'
        ),
        examplePrompt: say('$X$ aldagaiak 1, 2 eta 3 balioak hartzen ditu, 0,15; 0,6 eta $k$ probabilitateekin. Zenbat da $k$?', '$X$ toma los valores 1, 2 y 3 con probabilidades 0,15; 0,6 y $k$. ¿Cuánto vale $k$?', 'يأخذ $X$ القيم 1 و2 و3 باحتمالات 0.15 و0.6 و$k$. كم يساوي $k$؟', '$X$ takes the values 1, 2 and 3 with probabilities 0.15, 0.6 and $k$. What is $k$?'),
        example: same('$k=1-0{,}15-0{,}6=0{,}25$'),
        exampleAnswer: say('Hiru probabilitateek 1 egiten dute batuta; beraz, $k=0{,}25$.', 'Las tres probabilidades suman 1, así que $k=0{,}25$.', 'مجموع الاحتمالات الثلاثة 1، لذلك $k=0{,}25$.', 'The three probabilities add up to 1, so $k=0{,}25$.'),
        why: {
            text: say('Zergatik egiten dute 1? $X$ aldagaiaren balioek esperimentuaren emaitza guztiak elkar zapaltzen ez diren taldetan banatzen dituzte: guztiak batera gertaera ziurra dira.', '¿Por qué suman 1? Los valores de $X$ reparten todos los resultados del experimento en grupos que no se pisan: juntos son el suceso seguro.', 'لماذا مجموعها 1؟ تقسّم قيم $X$ كل نتائج التجربة إلى مجموعات لا تتداخل: ومعًا تكوّن الحدث الأكيد.', 'Why do they add up to 1? The values of $X$ share out all the outcomes of the experiment into groups that do not overlap: together they are the certain event.'),
            math: same('$\\frac{1}{8}+\\frac{3}{8}+\\frac{3}{8}+\\frac{1}{8}=1$')
        }
    },
    'mean-variance': {
        definitions: [
            { term: say('Batez bestekoa edo itxaropena', 'Media o esperanza', 'المتوسط أو الأمل الرياضي', 'Mean or expected value'), meaning: say('$\\mu=\\sum x_i\\,p_i$: esperimentua askotan errepikatuz epe luzean lortzen den batez besteko balioa.', '$\\mu=\\sum x_i\\,p_i$: el valor medio que se obtiene a la larga repitiendo el experimento.', '$\\mu=\\sum x_i\\,p_i$: القيمة المتوسطة التي نحصل عليها على المدى الطويل بتكرار التجربة.', '$\\mu=\\sum x_i\\,p_i$: the average value obtained in the long run by repeating the experiment.') },
            { term: say('Desbideratze tipikoa', 'Desviación típica', 'الانحراف المعياري', 'Standard deviation'), meaning: say('$\\sigma=\\sqrt{\\sum x_i^2\\,p_i-\\mu^2}$: balioak $\\mu$ baliotik batez beste zenbat urruntzen diren.', '$\\sigma=\\sqrt{\\sum x_i^2\\,p_i-\\mu^2}$: cuánto se separan, de media, los valores de $\\mu$.', '$\\sigma=\\sqrt{\\sum x_i^2\\,p_i-\\mu^2}$: مقدار ابتعاد القيم عن $\\mu$ في المتوسط.', '$\\sigma=\\sqrt{\\sum x_i^2\\,p_i-\\mu^2}$: how far, on average, the values are from $\\mu$.') }
        ],
        vocabulary: [
            say('bariantza', 'varianza', 'التباين', 'variance'),
            say('epe luzean', 'a la larga', 'على المدى الطويل', 'in the long run')
        ],
        explanation: say(
            'Aldagai baten batez bestekoa taula batena bezala kalkulatzen da, maiztasun erlatiboen ordez probabilitateak erabiliz: $\\mu=\\sum x_i\\,p_i$. Bariantza karratuen batez bestekoa ken batez bestekoaren karratua da, $\\sigma^2=\\sum x_i^2\\,p_i-\\mu^2$, eta $\\sigma$ haren erroa da. $\\mu$ ez da zertan balioetako bat izan.',
            'La media de una variable se calcula como la de una tabla, con las probabilidades en lugar de las frecuencias relativas: $\\mu=\\sum x_i\\,p_i$. La varianza es la media de los cuadrados menos el cuadrado de la media, $\\sigma^2=\\sum x_i^2\\,p_i-\\mu^2$, y $\\sigma$ es su raíz. $\\mu$ no tiene por qué ser uno de los valores.',
            'يُحسب متوسط المتغير كمتوسط الجدول، باستعمال الاحتمالات بدل التكرارات النسبية: $\\mu=\\sum x_i\\,p_i$. والتباين هو متوسط المربعات ناقص مربع المتوسط، $\\sigma^2=\\sum x_i^2\\,p_i-\\mu^2$، و$\\sigma$ جذره. ولا يلزم أن تكون $\\mu$ إحدى القيم.',
            'The mean of a variable is worked out like that of a table, with the probabilities instead of the relative frequencies: $\\mu=\\sum x_i\\,p_i$. The variance is the mean of the squares minus the square of the mean, $\\sigma^2=\\sum x_i^2\\,p_i-\\mu^2$, and $\\sigma$ is its root. $\\mu$ need not be one of the values.'
        ),
        examplePrompt: say('$X$ aldagaiak 1 balio du 0,6 probabilitatearekin, eta 4, 0,4 probabilitatearekin. Kalkulatu $\\mu$ eta $\\sigma^2$.', '$X$ vale 1 con probabilidad 0,6 y 4 con probabilidad 0,4. Calcula $\\mu$ y $\\sigma^2$.', 'يأخذ $X$ القيمة 1 باحتمال 0.6 والقيمة 4 باحتمال 0.4. احسب $\\mu$ و$\\sigma^2$.', '$X$ is 1 with probability 0.6 and 4 with probability 0.4. Work out $\\mu$ and $\\sigma^2$.'),
        example: same('$\\mu=1\\cdot 0{,}6+4\\cdot 0{,}4=2{,}2$'),
        exampleAnswer: say('Batez bestekoa 2,2 da, $X$ aldagaiak inoiz 2,2 balio ez badu ere; eta $\\sigma^2=0{,}6+6{,}4-2{,}2^2=2{,}16$.', 'La media es 2,2, aunque $X$ nunca vale 2,2; y $\\sigma^2=0{,}6+6{,}4-2{,}2^2=2{,}16$.', 'المتوسط 2.2 مع أن $X$ لا يساوي 2.2 أبدًا؛ و$\\sigma^2=0{,}6+6{,}4-2{,}2^2=2{,}16$.', 'The mean is 2.2, although $X$ is never 2.2; and $\\sigma^2=0{,}6+6{,}4-2{,}2^2=2{,}16$.'),
        why: {
            text: say('Zergatik $\\sum x_i\\,p_i$? Esperimentua $N$ aldiz errepikatzen bada, $x_i$ balio bakoitza $N\\,p_i$ aldiz inguru ateratzen da; emaitza guztien batez bestekoa $x_i\\,N\\,p_i$ batugaien batura zati $N$ da.', '¿Por qué $\\sum x_i\\,p_i$? Si se repite el experimento $N$ veces, cada valor $x_i$ sale unas $N\\,p_i$ veces; la media de todos los resultados es la suma de $x_i\\,N\\,p_i$ entre $N$.', 'لماذا $\\sum x_i\\,p_i$؟ إذا كُررت التجربة $N$ مرة ظهرت كل قيمة $x_i$ نحو $N\\,p_i$ مرة، ومتوسط كل النتائج هو مجموع $x_i\\,N\\,p_i$ مقسومًا على $N$.', 'Why $\\sum x_i\\,p_i$? If the experiment is repeated $N$ times, each value $x_i$ comes up about $N\\,p_i$ times; the mean of all the results is the sum of $x_i\\,N\\,p_i$ divided by $N$.'),
            math: same('$\\frac{\\sum x_i\\,N\\,p_i}{N}=\\sum x_i\\,p_i$')
        }
    },
    'expected-value': {
        definitions: [
            { term: say('Joko bidezkoa', 'Juego equitativo', 'اللعبة العادلة', 'Fair game'), meaning: say('Irabaziaren itxaropena 0 duen jokoa: epe luzean, ez da irabazten ez galtzen.', 'Un juego en el que la esperanza de la ganancia es 0: a la larga, ni se gana ni se pierde.', 'لعبة أملُ الربح فيها 0: على المدى الطويل لا ربح ولا خسارة.', 'A game in which the expected gain is 0: in the long run, you neither win nor lose.') }
        ],
        vocabulary: [
            say('irabazia', 'ganancia', 'الربح', 'gain'),
            say('saria', 'premio', 'الجائزة', 'prize')
        ],
        explanation: say(
            'Zorizko joko batean, partida bakoitzeko irabazia aldagai aleatorio bat da: saria ken jokatzeak balio duena. Haren batez bestekoak, itxaropenak, esaten du zenbat irabazten edo galtzen den partidako epe luzean. 0 bada, jokoa bidezkoa da; negatiboa bada, hobe da ez jokatzea, noizbait irabazi arren.',
            'En un juego de azar, la ganancia de cada partida es una variable aleatoria: el premio menos lo que cuesta jugar. Su media, la esperanza, dice cuánto se gana o se pierde por partida a la larga. Si es 0, el juego es equitativo; si es negativa, conviene no jugar, aunque alguna vez se gane.',
            'في لعبة حظ، الربح في كل جولة متغير عشوائي: الجائزة ناقص كلفة اللعب. ويقول متوسطه، أي الأمل الرياضي، كم نربح أو نخسر في الجولة على المدى الطويل. فإذا كان 0 كانت اللعبة عادلة، وإذا كان سالبًا فالأفضل ألّا نلعب، ولو ربحنا أحيانًا.',
            'In a game of chance, the gain in each round is a random variable: the prize minus what it costs to play. Its mean, the expected value, says how much you win or lose per round in the long run. If it is 0, the game is fair; if it is negative, better not to play, even if you win now and then.'
        ),
        examplePrompt: say('Zozketa batek 100 txartel saltzen ditu, 2 euro bakoitza, eta 150 euroko sari bat ematen du. Zein da txartel baten irabaziaren itxaropena?', 'Una rifa vende 100 papeletas a 2 € y da un premio de 150 €. ¿Cuál es la ganancia esperada de una papeleta?', 'يبيع يانصيب 100 ورقة بسعر 2 € للورقة ويعطي جائزة 150 €. ما الربح المتوقع لورقة واحدة؟', 'A raffle sells 100 tickets at €2 each and gives one prize of €150. What is the expected gain of a ticket?'),
        example: same('$150\\cdot\\frac{1}{100}-2=-0{,}5$'),
        exampleAnswer: say('Batez beste 0,50 euro galtzen dira txartel bakoitzeko: zozketa ez da bidezkoa.', 'Se pierden 0,50 € por papeleta, de media: la rifa no es equitativa.', 'نخسر 0.50 € في المتوسط عن كل ورقة: اليانصيب ليس عادلًا.', 'You lose €0.50 per ticket on average: the raffle is not fair.'),
        why: {
            text: say('Zergatik kentzen da prezio osoa? Partida guztietan ordaintzen da, 1 probabilitatearekin; beraz, batez bestekoan prezioa bider 1 da haren zatia.', '¿Por qué se resta el precio entero? Se paga en todas las partidas, con probabilidad 1, así que su parte en la media es el precio por 1.', 'لماذا نطرح السعر كاملًا؟ لأنه يُدفع في كل الجولات، باحتمال 1، فنصيبه في المتوسط هو السعر مضروبًا في 1.', 'Why is the whole price subtracted? It is paid in every round, with probability 1, so its part of the mean is the price times 1.'),
            math: same('$12\\cdot\\frac{1}{6}+3\\cdot\\frac{2}{6}-3\\cdot 1=0$')
        }
    },

    /* ---------- 3. The binomial distribution ---------- */
    'is-binomial': {
        definitions: [
            { term: say('Arrakasta eta porrota', 'Éxito y fracaso', 'النجاح والفشل', 'Success and failure'), meaning: say('Proba bakoitzaren bi emaitzak: zenbatzen dena, $p$ probabilitatearekin, eta bestea, $q=1-p$ probabilitatearekin.', 'Los dos resultados de cada prueba: el que se cuenta, con probabilidad $p$, y el otro, con $q=1-p$.', 'نتيجتا كل محاولة: التي نعدّها باحتمال $p$، والأخرى باحتمال $q=1-p$.', 'The two outcomes of each trial: the one counted, with probability $p$, and the other, with $q=1-p$.') },
            { term: say('Banaketa binomiala', 'Distribución binomial', 'التوزيع الثنائي', 'Binomial distribution'), meaning: say('$B(n;\\,p)$: arrakasten kopurua $n$ proba independentetan, arrakastaren $p$ probabilitatea berdina dela guztietan.', '$B(n;\\,p)$: el número de éxitos en $n$ pruebas independientes con la misma probabilidad de éxito $p$.', '$B(n;\\,p)$: عدد النجاحات في $n$ محاولة مستقلة باحتمال النجاح نفسه $p$.', '$B(n;\\,p)$: the number of successes in $n$ independent trials with the same probability of success $p$.') }
        ],
        vocabulary: [
            say('proba', 'prueba', 'المحاولة', 'trial'),
            say('itzuli gabe', 'sin devolución', 'دون إرجاع', 'without replacement'),
            say('independentea', 'independiente', 'مستقلة', 'independent')
        ],
        explanation: say(
            'Aldagai askok arrakastak zenbatzen dituzte: aurpegiak, seiak, pieza akastunak. Binomialak dira proba bera $n$ aldiz errepikatzen bada, modu independentean, bi emaitzarekin eta arrakastaren $p$ probabilitate berarekin aldi bakoitzean. Itzuli gabe ateratzeak $p$ aldatzen du; populazioa oso handia bada, aldaketa hain txikia da, ezen binomialtzat hartzen baita.',
            'Muchas variables cuentan éxitos: caras, seises, piezas defectuosas. Son binomiales si se repite $n$ veces la misma prueba, de forma independiente, con dos resultados y la misma probabilidad de éxito $p$ en cada una. Sacar sin devolución cambia $p$; si la población es muy grande, el cambio es tan pequeño que se toma como binomial.',
            'تعدّ متغيرات كثيرة نجاحات: الأوجه، ومرات ظهور 6، والقطع المعيبة. وتكون ثنائية إذا كُررت المحاولة نفسها $n$ مرة باستقلال، بنتيجتين وباحتمال النجاح نفسه $p$ في كل مرة. والسحب دون إرجاع يغيّر $p$؛ وإذا كان المجتمع كبيرًا جدًّا كان التغيّر صغيرًا فيُعدّ ثنائيًّا.',
            'Many variables count successes: heads, sixes, faulty parts. They are binomial if the same trial is repeated $n$ times, independently, with two outcomes and the same probability of success $p$ each time. Drawing without replacement changes $p$; if the population is very large, the change is so small that it is taken as binomial.'
        ),
        examplePrompt: say('8 galderako test bat, 4 aukerakoa, zoriz erantzuten da. Nola banatzen da $X$ = «asmatze kopurua»?', 'Un test de 8 preguntas con 4 opciones se contesta al azar. ¿Cómo se distribuye $X$ = «número de aciertos»?', 'يُجاب عشوائيًّا عن اختبار من 8 أسئلة لكل منها 4 خيارات. كيف يتوزع $X$ = «عدد الإجابات الصحيحة»؟', 'An 8-question test with 4 options each is answered at random. How is $X$ = «number of right answers» distributed?'),
        example: same('$X\\sim B(8;\\,0{,}25)$'),
        exampleAnswer: say('8 proba independente, «asmatzea» arrakasta dela eta $p=\\frac{1}{4}$ guztietan.', '8 pruebas independientes, con éxito «acertar» y $p=\\frac{1}{4}$ en todas.', '8 محاولات مستقلة، والنجاح «الإصابة» و$p=\\frac{1}{4}$ في كلها.', '8 independent trials, with success «right answer» and $p=\\frac{1}{4}$ in all of them.'),
        why: {
            text: say('Zergatik ez itzuli gabe? Bateko bat atera ondoren, bateko eta karta gutxiago geratzen dira: bigarren proba lehenaren mende dago, eta $p$ ez da berdina.', '¿Por qué falla sin devolución? Tras sacar un as quedan menos ases y menos cartas: la segunda prueba depende de la primera, y $p$ ya no es la misma.', 'لماذا لا يصح دون إرجاع؟ بعد سحب آس يبقى عدد أقل من الآسات والأوراق: فتتوقف المحاولة الثانية على الأولى ولا يبقى $p$ نفسه.', 'Why not without replacement? After an ace is drawn, fewer aces and fewer cards are left: the second trial depends on the first, and $p$ is no longer the same.'),
            math: same('$\\frac{4}{40}=0{,}1\\qquad\\frac{3}{39}\\approx 0{,}077$')
        }
    },
    'binomial-formula': {
        definitions: [
            { term: say('Gutxienez eta gehienez', 'Al menos y como mucho', 'على الأقل وعلى الأكثر', 'At least and at most'), meaning: say('«Gutxienez $k$» $X\\ge k$ da; «gehienez $k$», $X\\le k$. «Bat ere ez» $X=0$ da.', '«Al menos $k$» es $X\\ge k$; «como mucho $k$», $X\\le k$. «Ninguno» es $X=0$.', '«$k$ على الأقل» هو $X\\ge k$، و«$k$ على الأكثر» هو $X\\le k$. و«لا شيء» هو $X=0$.', '‘At least $k$’ is $X\\ge k$; ‘at most $k$’ is $X\\le k$. ‘None’ is $X=0$.') }
        ],
        vocabulary: [
            say('ordena', 'orden', 'الترتيب', 'order'),
            say('aurkakoa', 'contrario', 'المعاكس', 'complement')
        ],
        explanation: say(
            '$n$ probatan, $k$ arrakasta dituen zerrenda jakin baten probabilitatea $p^k q^{n-k}$ da, probak independenteak direlako. Arrakasten ordenak berdin duenez, horrelako $\\binom{n}{k}$ zerrenda daude. «Gutxienez» edo «gehienez» kalkulatzeko, sartzen diren balioak batzen dira edo, asko badira, aurkakoa kalkulatu eta 1 zenbakitik kentzen da.',
            'En $n$ pruebas, una lista concreta con $k$ éxitos tiene probabilidad $p^k q^{n-k}$, porque las pruebas son independientes. Como el orden de los éxitos da igual, hay $\\binom{n}{k}$ listas así. Para «al menos» o «como mucho», se suman los valores que entran o, si son muchos, se calcula el contrario y se resta de 1.',
            'في $n$ محاولة، احتمال قائمة معيّنة فيها $k$ نجاحًا هو $p^k q^{n-k}$، لأن المحاولات مستقلة. وبما أن ترتيب النجاحات لا يهم، فهناك $\\binom{n}{k}$ قائمة كهذه. ولحساب «على الأقل» أو «على الأكثر» نجمع القيم التي تدخل، أو إذا كانت كثيرة نحسب المعاكس ونطرحه من 1.',
            'In $n$ trials, a given list with $k$ successes has probability $p^k q^{n-k}$, because the trials are independent. As the order of the successes does not matter, there are $\\binom{n}{k}$ such lists. For ‘at least’ or ‘at most’, add the values that count or, if there are many, work out the complement and subtract it from 1.'
        ),
        examplePrompt: say('Txanpon bat 5 aldiz botatzen da. Zein da zehazki 2 aurpegi ateratzeko probabilitatea?', 'Se lanza una moneda 5 veces. ¿Qué probabilidad hay de sacar exactamente 2 caras?', 'تُرمى قطعة نقود 5 مرات. ما احتمال ظهور وجهين بالضبط؟', 'A coin is tossed 5 times. What is the probability of exactly 2 heads?'),
        example: same('$P(X=2)=10\\cdot 0{,}5^5=\\frac{10}{32}=\\frac{5}{16}$'),
        exampleAnswer: say('$\\binom{5}{2}=10$ ordena daude, eta bakoitzak $0{,}5^5$ probabilitatea du.', 'Hay $\\binom{5}{2}=10$ órdenes, y cada uno tiene probabilidad $0{,}5^5$.', 'هناك $\\binom{5}{2}=10$ ترتيبات، ولكل منها الاحتمال $0{,}5^5$.', 'There are $\\binom{5}{2}=10$ orders, and each one has probability $0{,}5^5$.'),
        why: {
            text: say('Zergatik $p^k q^{n-k}$? Zerrenda jakin bat, arrakasta, arrakasta, porrota… adibidez, proba independenteen ebakidura da: haien probabilitateak biderkatzen dira, $k$ aldiz $p$ eta $n-k$ aldiz $q$.', '¿Por qué $p^k q^{n-k}$? Una lista concreta, como éxito, éxito, fracaso…, es una intersección de pruebas independientes: se multiplican sus probabilidades, $k$ veces $p$ y $n-k$ veces $q$.', 'لماذا $p^k q^{n-k}$؟ القائمة المعيّنة، مثل نجاح ثم نجاح ثم فشل…، تقاطع لمحاولات مستقلة: تُضرب احتمالاتها، $k$ مرة $p$ و$n-k$ مرة $q$.', 'Why $p^k q^{n-k}$? A given list, such as success, success, failure…, is an intersection of independent trials: their probabilities are multiplied, $k$ times $p$ and $n-k$ times $q$.'),
            math: same('$p\\cdot p\\cdot q\\cdot q\\cdot q=p^2q^3$')
        }
    },
    'binomial-parameters': {
        vocabulary: [
            say('batez bestekoa', 'media', 'المتوسط', 'mean'),
            say('desbideratze tipikoa', 'desviación típica', 'الانحراف المعياري', 'standard deviation')
        ],
        explanation: say(
            'Ez da taularik behar binomial baten batez bestekoa eta desbideratzea kalkulatzeko. Proba bakoitzak batez beste $p$ arrakasta ematen ditu; beraz, $n$ probek $\\mu=np$ ematen dute. Proba baten bariantza $pq$ da, eta proba independenteenak batu egiten dira: $\\sigma^2=npq$. Emaitza gehienak bi $\\sigma$ baino gutxiagora daude $\\mu$ baliotik.',
            'No hace falta la tabla para la media y la desviación de una binomial. Cada prueba aporta de media $p$ éxitos, así que $n$ pruebas aportan $\\mu=np$. La varianza de una prueba es $pq$, y las de pruebas independientes se suman: $\\sigma^2=npq$. La mayoría de los resultados caen a menos de dos $\\sigma$ de $\\mu$.',
            'لا نحتاج إلى الجدول لحساب متوسط التوزيع الثنائي وانحرافه. تعطي كل محاولة في المتوسط $p$ نجاحًا، فتعطي $n$ محاولة $\\mu=np$. وتباين المحاولة الواحدة $pq$، وتُجمع تباينات المحاولات المستقلة: $\\sigma^2=npq$. وتبعد معظم النتائج أقل من ضعفي $\\sigma$ عن $\\mu$.',
            'The table is not needed for the mean and the deviation of a binomial. Each trial gives $p$ successes on average, so $n$ trials give $\\mu=np$. The variance of one trial is $pq$, and those of independent trials add up: $\\sigma^2=npq$. Most results fall less than two $\\sigma$ away from $\\mu$.'
        ),
        examplePrompt: say('Dado bat 180 aldiz botatzen da. Zein dira sei kopuruaren batez bestekoa eta desbideratze tipikoa?', 'Se lanza un dado 180 veces. ¿Cuál es la media y la desviación típica del número de seises?', 'يُرمى نرد 180 مرة. ما متوسط عدد مرات ظهور 6 وانحرافه المعياري؟', 'A die is rolled 180 times. What are the mean and the standard deviation of the number of sixes?'),
        example: same('$\\mu=180\\cdot\\frac{1}{6}=30\\qquad\\sigma=\\sqrt{180\\cdot\\frac{1}{6}\\cdot\\frac{5}{6}}=5$'),
        exampleAnswer: say('30 sei inguru espero dira, eta normalena 20 eta 40 artean ateratzea da.', 'Se esperan unos 30 seises, y lo normal es que salgan entre 20 y 40.', 'يُتوقع نحو 30 مرة، والمعتاد أن يكون العدد بين 20 و40.', 'About 30 sixes are expected, and usually between 20 and 40 come up.'),
        why: {
            text: say('Zergatik batzen dira bariantzak? Proba bakar batek 1 balio du $p$ probabilitatearekin, eta 0, $q$ probabilitatearekin: haren bariantza $p-p^2=pq$ da. $n$ proba independenterekin, bariantzak batu egiten dira.', '¿Por qué se suman las varianzas? Una sola prueba vale 1 con probabilidad $p$ y 0 con $q$: su varianza es $p-p^2=pq$. Con $n$ pruebas independientes, las varianzas se suman.', 'لماذا تُجمع التباينات؟ المحاولة الواحدة تساوي 1 باحتمال $p$ و0 باحتمال $q$: تباينها $p-p^2=pq$. ومع $n$ محاولة مستقلة تُجمع التباينات.', 'Why do the variances add up? A single trial is 1 with probability $p$ and 0 with $q$: its variance is $p-p^2=pq$. With $n$ independent trials, the variances add up.'),
            math: same('$1^2\\cdot p+0^2\\cdot q-p^2=p\\,(1-p)=pq$')
        }
    },

    /* ---------- 4. Continuous variables and the normal ---------- */
    density: {
        definitions: [
            { term: say('Aldagai jarraitua', 'Variable continua', 'المتغير المتصل', 'Continuous variable'), meaning: say('Tarte bateko edozein balio har dezakeen aldagaia, denbora, altuera edo pisu bat adibidez.', 'Una variable que puede tomar cualquier valor de un intervalo, como un tiempo, una altura o un peso.', 'متغير يمكن أن يأخذ أي قيمة من مجال، مثل زمن أو طول أو وزن.', 'A variable that can take any value in an interval, such as a time, a height or a weight.') },
            { term: say('Dentsitate-funtzioa', 'Función de densidad', 'دالة الكثافة', 'Density function'), meaning: say('$f(x)\\ge 0$ funtzio bat, azpian 1 azalera osoa duena; tarte baten probabilitatea haren gaineko azalera da.', 'Una función $f(x)\\ge 0$ con área total 1 bajo ella; la probabilidad de un intervalo es el área encima de él.', 'دالة $f(x)\\ge 0$ مساحتها الكلية 1؛ واحتمال مجال هو المساحة فوقه.', 'A function $f(x)\\ge 0$ with total area 1 under it; the probability of an interval is the area above it.') }
        ],
        vocabulary: [
            say('azalera', 'área', 'المساحة', 'area'),
            say('tartea', 'intervalo', 'المجال', 'interval')
        ],
        explanation: say(
            'Denbora batek edo altuera batek ez dute balio solterik hartzen: aldagai jarraituak dira, eta probabilitatea kurba baten azpiko azalera gisa banatzen da, dentsitate-funtzioa. Azalera osoa 1 da, eta tarte baten probabilitatea haren gaineko azalera zatia da. Puntu batek ez du zabalerarik: $P(X=a)=0$.',
            'Un tiempo o una altura no toman valores sueltos: son variables continuas, y la probabilidad se reparte como un área bajo una curva, la función de densidad. Esa área total vale 1, y la probabilidad de un intervalo es el trozo de área encima de él. Un punto no tiene anchura: $P(X=a)=0$.',
            'لا يأخذ الزمن أو الطول قيمًا منفصلة: إنها متغيرات متصلة، ويتوزع الاحتمال كمساحة تحت منحنى هو دالة الكثافة. والمساحة الكلية 1، واحتمال مجال هو جزء المساحة فوقه. وليس للنقطة عرض: $P(X=a)=0$.',
            'A time or a height does not take separate values: they are continuous variables, and the probability is spread out as an area under a curve, the density function. That total area is 1, and the probability of an interval is the piece of area above it. A point has no width: $P(X=a)=0$.'
        ),
        examplePrompt: say('Dentsitate batek $f(x)=kx$ balio du 0 eta 2 artean, eta 0 kanpoan. Aurkitu $k$ eta $P(X\\le 1)$.', 'Una densidad vale $f(x)=kx$ entre 0 y 2, y 0 fuera. Halla $k$ y $P(X\\le 1)$.', 'كثافة تساوي $f(x)=kx$ بين 0 و2، و0 خارج ذلك. أوجد $k$ و$P(X\\le 1)$.', 'A density is $f(x)=kx$ between 0 and 2, and 0 outside. Find $k$ and $P(X\\le 1)$.'),
        example: same('$k=\\frac{1}{2}\\qquad P(X\\le 1)=\\frac{1}{2}\\cdot 1\\cdot\\frac{1}{2}=\\frac{1}{4}$'),
        exampleAnswer: say('Dentsitatea 2 oinarriko eta $2k$ altuerako triangelu bat da: azalera $2k=1$. 1 arte, 1 oinarriko eta $\\frac{1}{2}$ altuerako triangelua geratzen da.', 'La densidad es un triángulo de base 2 y altura $2k$: área $2k=1$. Hasta 1 queda un triángulo de base 1 y altura $\\frac{1}{2}$.', 'الكثافة مثلث قاعدته 2 وارتفاعه $2k$: مساحته $2k=1$. وحتى 1 يبقى مثلث قاعدته 1 وارتفاعه $\\frac{1}{2}$.', 'The density is a triangle with base 2 and height $2k$: area $2k=1$. Up to 1 there is a triangle with base 1 and height $\\frac{1}{2}$.'),
        why: {
            text: say('Zergatik $P(X=a)=0$? $P(a\\le X\\le a+h)$ ia $h$ zabalerako laukizuzen bat da; $h$ gero eta txikiagoa eginez, azalera 0 aldera doa.', '¿Por qué $P(X=a)=0$? $P(a\\le X\\le a+h)$ es casi un rectángulo de anchura $h$; al hacer $h$ cada vez más pequeño, el área se va a 0.', 'لماذا $P(X=a)=0$؟ $P(a\\le X\\le a+h)$ مستطيل عرضه $h$ تقريبًا؛ وكلما صغّرنا $h$ اقتربت المساحة من 0.', 'Why is $P(X=a)=0$? $P(a\\le X\\le a+h)$ is almost a rectangle of width $h$; as $h$ gets smaller and smaller, the area goes to 0.')
        }
    },
    'normal-curve': {
        definitions: [
            { term: say('Banaketa normala', 'Distribución normal', 'التوزيع الطبيعي', 'Normal distribution'), meaning: say('$N(\\mu;\\,\\sigma)$: kanpai-formako dentsitatea duen aldagai jarraitua, bere $\\mu$ batez bestekoaren inguruan simetrikoa.', '$N(\\mu;\\,\\sigma)$: una variable continua con densidad en forma de campana, simétrica alrededor de su media $\\mu$.', '$N(\\mu;\\,\\sigma)$: متغير متصل كثافته على شكل جرس، متماثل حول متوسطه $\\mu$.', '$N(\\mu;\\,\\sigma)$: a continuous variable whose density is bell-shaped, symmetric about its mean $\\mu$.') }
        ],
        vocabulary: [
            say('kanpaia', 'campana', 'الجرس', 'bell'),
            say('simetrikoa', 'simétrica', 'متماثل', 'symmetric'),
            say('ehunekoa', 'porcentaje', 'النسبة', 'percentage')
        ],
        explanation: say(
            'Neurri asko —altuerak, pisuak, erroreak, notak— kanpai batean biltzen dira: $N(\\mu;\\,\\sigma)$ normala. Simetrikoa da $\\mu$ batez bestekoaren inguruan, eta hori moda eta mediana ere bada; $\\sigma$ balioak haren zabalera markatzen du: inflexio-puntuak $\\mu\\pm\\sigma$ puntuetan daude. Bat, bi eta hiru $\\sigma$ arteko ehunekoak beti berak dira.',
            'Muchas medidas —alturas, pesos, errores, notas— se agrupan en una campana: la normal $N(\\mu;\\,\\sigma)$. Es simétrica alrededor de la media $\\mu$, que también es la moda y la mediana, y $\\sigma$ marca su anchura: los puntos de inflexión están en $\\mu\\pm\\sigma$. Los porcentajes a una, dos y tres $\\sigma$ son siempre los mismos.',
            'تتجمع قياسات كثيرة —الأطوال والأوزان والأخطاء والعلامات— في شكل جرس: التوزيع الطبيعي $N(\\mu;\\,\\sigma)$. وهو متماثل حول المتوسط $\\mu$، وهو أيضًا المنوال والوسيط، ويحدد $\\sigma$ عرضه: نقطتا الانعطاف عند $\\mu\\pm\\sigma$. والنسب على بعد واحد واثنين وثلاثة $\\sigma$ هي نفسها دائمًا.',
            'Many measurements —heights, weights, errors, marks— cluster in a bell: the normal $N(\\mu;\\,\\sigma)$. It is symmetric about the mean $\\mu$, which is also the mode and the median, and $\\sigma$ sets its width: the points of inflection are at $\\mu\\pm\\sigma$. The percentages within one, two and three $\\sigma$ are always the same.'
        ),
        examplePrompt: say('Sagar batzuen pisua $N(200;\\,20)$ da, gramotan. Zer ehunekok pisatzen du 140 eta 260 g artean?', 'El peso de unas manzanas sigue una $N(200;\\,20)$ en gramos. ¿Qué porcentaje pesa entre 140 y 260 g?', 'يتبع وزن تفاح التوزيع $N(200;\\,20)$ بالغرام. ما النسبة التي يتراوح وزنها بين 140 و260 غ؟', 'The weight of some apples follows $N(200;\\,20)$ in grams. What percentage weighs between 140 and 260 g?'),
        example: same('$200-3\\cdot 20=140\\qquad 200+3\\cdot 20=260$'),
        exampleAnswer: say('$\\mu-3\\sigma$ eta $\\mu+3\\sigma$ dira: ia denak, % 99,74.', 'Son $\\mu-3\\sigma$ y $\\mu+3\\sigma$: casi todas, el 99,74 %.', 'إنهما $\\mu-3\\sigma$ و$\\mu+3\\sigma$: تقريبًا الكل، 99.74٪.', 'They are $\\mu-3\\sigma$ and $\\mu+3\\sigma$: almost all, 99.74%.'),
        why: {
            text: say('Nondik datoz % 68,26, % 95,44 eta % 99,74? Kanpaiaren azpiko azalerak dira, eta normalaren taulan irakurtzen dira, hurrengo ikasgaian. Adibidez, $-1$ eta 1 artean:', '¿De dónde salen el 68,26 %, el 95,44 % y el 99,74 %? Son áreas bajo la campana, que se leen en la tabla de la normal, en la lección siguiente. Por ejemplo, entre $-1$ y 1:', 'من أين تأتي 68.26٪ و95.44٪ و99.74٪؟ إنها مساحات تحت الجرس تُقرأ في جدول التوزيع الطبيعي، في الدرس التالي. مثلًا بين $-1$ و1:', 'Where do 68.26%, 95.44% and 99.74% come from? They are areas under the bell, read in the normal table, in the next lesson. For example, between $-1$ and 1:'),
            math: same('$2\\cdot 0{,}8413-1=0{,}6826$')
        }
    },
    'standard-table': {
        definitions: [
            { term: say('Normal estandarra', 'Normal estándar', 'الطبيعي المعياري', 'Standard normal'), meaning: say('$Z\\sim N(0;\\,1)$, 0 batez bestekoa eta 1 desbideratzea dituen normala; haren taulak $P(Z\\le k)$ ematen du $k\\ge 0$ denean.', '$Z\\sim N(0;\\,1)$, la normal de media 0 y desviación 1; su tabla da $P(Z\\le k)$ para $k\\ge 0$.', '$Z\\sim N(0;\\,1)$، التوزيع الطبيعي بمتوسط 0 وانحراف 1؛ ويعطي جدوله $P(Z\\le k)$ عندما $k\\ge 0$.', '$Z\\sim N(0;\\,1)$, the normal with mean 0 and deviation 1; its table gives $P(Z\\le k)$ for $k\\ge 0$.') }
        ],
        vocabulary: [
            say('taula', 'tabla', 'الجدول', 'table'),
            say('errenkada', 'fila', 'الصف', 'row'),
            say('zutabea', 'columna', 'العمود', 'column')
        ],
        explanation: say(
            'Edozein normal $Z\\sim N(0;\\,1)$ estandarrera eramaten da, eta haren taulak $P(Z\\le k)$ ematen du, $k$ balioa bi hamartarrekin: errenkadak unitateak eta hamarrenak ematen ditu, eta zutabeak, ehunenak. Taulak $k\\ge 0$ bakarrik dakar; gainerakoa bi ideiatatik ateratzen da: azalera osoa 1 da, eta kanpaia simetrikoa da 0 zenbakiarekiko.',
            'Cualquier normal se reduce a la estándar $Z\\sim N(0;\\,1)$, cuya tabla da $P(Z\\le k)$ con dos decimales de $k$: la fila da las unidades y décimas, y la columna, las centésimas. La tabla solo trae $k\\ge 0$; el resto sale de dos ideas: el área total es 1 y la campana es simétrica respecto de 0.',
            'يُردّ كل توزيع طبيعي إلى المعياري $Z\\sim N(0;\\,1)$، الذي يعطي جدوله $P(Z\\le k)$ بمنزلتين عشريتين للعدد $k$: يعطي الصف الآحاد والأعشار، ويعطي العمود الأجزاء من مئة. ولا يضم الجدول إلا $k\\ge 0$؛ والباقي يأتي من فكرتين: المساحة الكلية 1، والجرس متماثل حول 0.',
            'Any normal is reduced to the standard one $Z\\sim N(0;\\,1)$, whose table gives $P(Z\\le k)$ with two decimals of $k$: the row gives the units and tenths, and the column, the hundredths. The table only has $k\\ge 0$; the rest comes from two ideas: the total area is 1 and the bell is symmetric about 0.'
        ),
        examplePrompt: say('$Z$ aldagaia $N(0;\\,1)$ da. Zenbat da $P(0{,}5\\le Z\\le 1{,}5)$?', '$Z$ sigue una $N(0;\\,1)$. ¿Cuánto vale $P(0{,}5\\le Z\\le 1{,}5)$?', 'يتبع $Z$ التوزيع $N(0;\\,1)$. كم يساوي $P(0{,}5\\le Z\\le 1{,}5)$؟', '$Z$ follows $N(0;\\,1)$. What is $P(0{,}5\\le Z\\le 1{,}5)$?'),
        example: same('$0{,}9332-0{,}6915=0{,}2417$'),
        exampleAnswer: say('1,5 azpitik geratzen denari 0,5 azpitik geratzen dena kentzen zaio.', 'Se resta lo que queda por debajo de 0,5 a lo que queda por debajo de 1,5.', 'نطرح ما يقع تحت 0.5 مما يقع تحت 1.5.', 'What lies below 0.5 is subtracted from what lies below 1.5.'),
        why: {
            text: say('Zergatik $P(Z\\le -k)=P(Z>k)$? Kanpaia simetrikoa da 0 zenbakiarekiko: $-k$ puntuaren ezkerreko isatsa $k$ puntuaren eskuineko isatsaren isla da, eta azalera bera dute.', '¿Por qué $P(Z\\le -k)=P(Z>k)$? La campana es simétrica respecto de 0: la cola a la izquierda de $-k$ es el reflejo de la cola a la derecha de $k$, y tienen la misma área.', 'لماذا $P(Z\\le -k)=P(Z>k)$؟ الجرس متماثل حول 0: الذيل على يسار $-k$ انعكاس للذيل على يمين $k$، ولهما المساحة نفسها.', 'Why is $P(Z\\le -k)=P(Z>k)$? The bell is symmetric about 0: the tail to the left of $-k$ is the mirror image of the tail to the right of $k$, and they have the same area.')
        }
    },
    standardize: {
        definitions: [
            { term: say('Tipifikatu', 'Tipificar', 'التوحيد المعياري', 'Standardise'), meaning: say('$x$ balioa ${z}=\\frac{x-\\mu}{\\sigma}$ balioaz ordeztea: $x$ batez bestekotik zenbat desbideratze tipiko gorago edo beherago dagoen.', 'Cambiar $x$ por ${z}=\\frac{x-\\mu}{\\sigma}$: cuántas desviaciones típicas está $x$ por encima o por debajo de la media.', 'استبدال $x$ بـ ${z}=\\frac{x-\\mu}{\\sigma}$: كم انحرافًا معياريًّا تقع $x$ فوق المتوسط أو تحته.', 'Replace $x$ by ${z}=\\frac{x-\\mu}{\\sigma}$: how many standard deviations $x$ is above or below the mean.') }
        ],
        vocabulary: [
            say('puntuazio tipikoa', 'puntuación típica', 'الدرجة المعيارية', 'standard score'),
            say('ehunekoa', 'porcentaje', 'النسبة', 'percentage')
        ],
        explanation: say(
            'Normal guztiek forma bera dute: erdigunea eta zabalera bakarrik aldatzen dira. Horregatik, $X\\sim N(\\mu;\\,\\sigma)$ banaketarekin kalkulatzeko, $x$ balio bakoitza bere ${z}$ puntuazio tipikoaz ordezten da, eta horrek taulako $N(0;\\,1)$ banaketa du. Komeni da kanpaia marraztea eta zona itzaleztatzea irakurri aurretik.',
            'Todas las normales tienen la misma forma: solo cambian el centro y la anchura. Por eso, para calcular con $X\\sim N(\\mu;\\,\\sigma)$, cada valor $x$ se cambia por su puntuación típica ${z}$, que sigue la $N(0;\\,1)$ de la tabla. Conviene dibujar la campana y sombrear la zona antes de leer.',
            'لكل التوزيعات الطبيعية الشكل نفسه: يتغيّر المركز والعرض فقط. لذلك، للحساب مع $X\\sim N(\\mu;\\,\\sigma)$ تُستبدل كل قيمة $x$ بدرجتها المعيارية ${z}$، التي تتبع $N(0;\\,1)$ في الجدول. ويحسن رسم الجرس وتظليل المنطقة قبل القراءة.',
            'All normals have the same shape: only the centre and the width change. So, to work with $X\\sim N(\\mu;\\,\\sigma)$, each value $x$ is replaced by its standard score ${z}$, which follows the $N(0;\\,1)$ of the table. It helps to draw the bell and shade the zone before reading.'
        ),
        examplePrompt: say('Adimen-kozientea $N(100;\\,15)$ da. Zein da pertsona batek 130 gainditzeko probabilitatea?', 'El cociente intelectual sigue una $N(100;\\,15)$. ¿Qué probabilidad hay de que una persona pase de 130?', 'يتبع حاصل الذكاء التوزيع $N(100;\\,15)$. ما احتمال أن يتجاوز شخص 130؟', 'IQ follows $N(100;\\,15)$. What is the probability that a person scores over 130?'),
        example: same('${z}=\\frac{130-100}{15}=2\\qquad 1-0{,}9772=0{,}0228$'),
        exampleAnswer: say('130 batez bestekotik bi desbideratze gorago dago: % 2,28 bakarrik da handiagoa.', '130 está a dos desviaciones por encima de la media: solo lo supera un 2,28 %.', 'يقع 130 فوق المتوسط بانحرافين: لا يتجاوزه إلا 2.28٪.', '130 is two deviations above the mean: only 2.28% are above it.'),
        why: {
            text: say('Zergatik da $Z$ aldagaia $N(0;\\,1)$? $\\mu$ kentzeak kanpaia mugitzen du, erdigunea 0 izan arte; $\\sigma$ zenbakiaz zatitzeak estutu edo zabaldu egiten du, desbideratzea 1 izan arte. Azalerak ez dira aldatzen.', '¿Por qué $Z$ es $N(0;\\,1)$? Restar $\\mu$ mueve la campana hasta que su centro está en 0; dividir entre $\\sigma$ la estrecha o la ensancha hasta que su desviación es 1. Las áreas no cambian.', 'لماذا يكون $Z$ هو $N(0;\\,1)$؟ طرح $\\mu$ يحرّك الجرس حتى يصير مركزه 0، والقسمة على $\\sigma$ تضيّقه أو توسّعه حتى يصير انحرافه 1. ولا تتغيّر المساحات.', 'Why is $Z$ $N(0;\\,1)$? Subtracting $\\mu$ moves the bell until its centre is at 0; dividing by $\\sigma$ narrows or widens it until its deviation is 1. The areas do not change.')
        }
    },
    'inverse-normal': {
        definitions: [
            { term: say('Alderantzizko bilaketa', 'Búsqueda inversa', 'البحث العكسي', 'Inverse search'), meaning: say('Probabilitate bat emanda, taularen barruan bilatzea eta haren errenkadako eta zutabeko $k$ irakurtzea.', 'Dada una probabilidad, buscarla dentro de la tabla y leer el $k$ de su fila y su columna.', 'إذا أُعطي احتمال، نبحث عنه داخل الجدول ونقرأ $k$ من صفّه وعموده.', 'Given a probability, look for it inside the table and read the $k$ of its row and column.') }
        ],
        vocabulary: [
            say('isatsa', 'cola', 'الذيل', 'tail'),
            say('hurbilena', 'más cercano', 'الأقرب', 'closest')
        ],
        explanation: say(
            'Batzuetan probabilitatea ematen da, eta balioa eskatzen da: isatsean % 10 uzten duena, erdiko % 80 bereizten duena… Datua «azpitik geratzen den probabilitate» bihurtzen da, taularen barruan zenbaki hurbilena bilatzen da, eta haren errenkada eta zutabea irakurtzen dira. Gero tipifikazioa desegiten da: $x=\\mu+k\\,\\sigma$.',
            'A veces se da la probabilidad y se pide el valor: el que deja el 10 % en la cola, el que separa el 80 % central… Se pasa el dato a «probabilidad por debajo», se busca dentro de la tabla el número más cercano y se leen su fila y su columna. Después se deshace la tipificación: $x=\\mu+k\\,\\sigma$.',
            'أحيانًا يُعطى الاحتمال وتُطلب القيمة: التي تترك 10٪ في الذيل، أو التي تفصل الـ80٪ الوسطى… نحوّل المعطى إلى «احتمال ما تحت»، ونبحث داخل الجدول عن العدد الأقرب، ونقرأ صفّه وعموده. ثم نعكس التوحيد المعياري: $x=\\mu+k\\,\\sigma$.',
            'Sometimes the probability is given and the value is asked for: the one that leaves 10% in the tail, the one that cuts off the middle 80%… Turn the data into a ‘probability below’, look inside the table for the closest number and read its row and column. Then undo the standardising: $x=\\mu+k\\,\\sigma$.'
        ),
        examplePrompt: say('Pakete batzuen pisua $N(500;\\,10)$ da, gramotan. Zein pisuk uzten du azpitik % 20 arinena?', 'Unos paquetes pesan según una $N(500;\\,10)$ en gramos. ¿Qué peso deja por debajo al 20 % más ligero?', 'يتبع وزن طرود التوزيع $N(500;\\,10)$ بالغرام. ما الوزن الذي يترك تحته أخفّ 20٪؟', 'Some parcels weigh according to $N(500;\\,10)$ in grams. What weight has the lightest 20% below it?'),
        example: same('$P(Z\\le 0{,}84)=0{,}7995\\qquad x=500-0{,}84\\cdot 10=491{,}6$'),
        exampleAnswer: say('Azpitik % 20 geratzen da: simetriagatik, $k=-0{,}84$, 0,7995 baita 0,8 zenbakitik hurbilena.', 'Por debajo queda un 20 %: por simetría, $k=-0{,}84$, porque 0,7995 es lo más cercano a 0,8.', 'يبقى تحته 20٪: بالتماثل $k=-0{,}84$، لأن 0.7995 هو الأقرب إلى 0.8.', '20% lies below it: by symmetry, $k=-0{,}84$, because 0.7995 is the closest to 0.8.'),
        why: {
            text: say('Zergatik bilatzen da «azpitik»? Taulak $k$ puntuaren ezkerreko azalerak bakarrik gordetzen ditu: datua forma horretara itzuli behar da bilatu aurretik, aurkakoarekin edo simetriarekin.', '¿Por qué se busca «por debajo»? La tabla solo guarda áreas a la izquierda de $k$: hay que traducir el dato a esa forma antes de buscar, con el contrario o con la simetría.', 'لماذا نبحث عن «ما تحت»؟ لا يحفظ الجدول إلا المساحات على يسار $k$: فيجب ترجمة المعطى إلى هذه الصورة قبل البحث، بالمعاكس أو بالتماثل.', 'Why look for ‘below’? The table only stores areas to the left of $k$: the data must be put in that form before searching, with the complement or with symmetry.')
        }
    },

    /* ---------- 5. Approximating the binomial by the normal ---------- */
    'binomial-to-normal': {
        definitions: [
            { term: say('Hurbilketa normala', 'Aproximación normal', 'التقريب الطبيعي', 'Normal approximation'), meaning: say('$B(n;\\,p)$ banaketa $N(np;\\,\\sqrt{npq})$ banaketaz ordeztea —batez besteko eta desbideratze berak—, $np\\ge 5$ eta $nq\\ge 5$ direnean.', 'Cambiar una $B(n;\\,p)$ por la $N(np;\\,\\sqrt{npq})$, de la misma media y desviación, cuando $np\\ge 5$ y $nq\\ge 5$.', 'استبدال $B(n;\\,p)$ بـ $N(np;\\,\\sqrt{npq})$ ذي المتوسط والانحراف نفسيهما، عندما $np\\ge 5$ و$nq\\ge 5$.', 'Replacing $B(n;\\,p)$ by $N(np;\\,\\sqrt{npq})$, with the same mean and deviation, when $np\\ge 5$ and $nq\\ge 5$.') }
        ],
        vocabulary: [
            say('barrak', 'barras', 'الأعمدة', 'bars'),
            say('baldintza', 'condición', 'الشرط', 'condition')
        ],
        explanation: say(
            '$n$ handia denean, binomial bat gaiz gai kalkulatzea amaigabea da. Baina haren barrek kanpai bat marrazten dute: $np\\ge 5$ eta $nq\\ge 5$ badira, binomiala batez besteko eta desbideratze bereko normalaren antzekoa da. $p$ oso hurbil badago 0 edo 1 zenbakitik, $n$ handiagoa behar da kanpaia okertuta gera ez dadin.',
            'Con $n$ grande, calcular una binomial término a término es eterno. Pero sus barras dibujan una campana: si $np\\ge 5$ y $nq\\ge 5$, la binomial se parece a la normal de su misma media y su misma desviación. Si $p$ está muy cerca de 0 o de 1, hace falta un $n$ mayor para que la campana no quede torcida.',
            'عندما يكون $n$ كبيرًا يطول حساب التوزيع الثنائي حدًّا حدًّا. لكن أعمدته ترسم جرسًا: إذا كان $np\\ge 5$ و$nq\\ge 5$ أشبه التوزيعُ الثنائي التوزيعَ الطبيعي ذا المتوسط والانحراف نفسيهما. وإذا كان $p$ قريبًا جدًّا من 0 أو 1 احتجنا إلى $n$ أكبر كي لا يكون الجرس مائلًا.',
            'With a large $n$, working out a binomial term by term takes forever. But its bars draw a bell: if $np\\ge 5$ and $nq\\ge 5$, the binomial looks like the normal with its same mean and its same deviation. If $p$ is very close to 0 or to 1, a larger $n$ is needed so that the bell is not lopsided.'
        ),
        examplePrompt: say('$B(400;\\,0{,}1)$ normal batez hurbil daiteke? Zeinez?', '¿Se puede aproximar $B(400;\\,0{,}1)$ por una normal? ¿Por cuál?', 'هل يمكن تقريب $B(400;\\,0{,}1)$ بتوزيع طبيعي؟ بأيّها؟', 'Can $B(400;\\,0{,}1)$ be approximated by a normal? By which one?'),
        example: same('$np=40\\qquad nq=360\\qquad\\sigma=\\sqrt{36}=6$'),
        exampleAnswer: say('Bai, biek 5 gainditzen dute: $N(40;\\,6)$.', 'Sí, las dos pasan de 5: $N(40;\\,6)$.', 'نعم، كلاهما أكبر من 5: $N(40;\\,6)$.', 'Yes, both are over 5: $N(40;\\,6)$.'),
        why: {
            text: say('Zergatik kanpai bat? Binomiala $n$ proba independenteren batura da, bakoitza 0 edo 1. Gauza independente asko batzean, emaitzak batez bestekotik hurbil pilatzen dira eta simetrikoki banatzen dira: normala agertzen da.', '¿Por qué una campana? Una binomial es la suma de $n$ pruebas independientes, cada una 0 o 1. Al sumar muchas cosas independientes, los resultados se amontonan cerca de la media y se reparten simétricamente: aparece la normal.', 'لماذا جرس؟ التوزيع الثنائي مجموع $n$ محاولة مستقلة، كل منها 0 أو 1. وعند جمع أشياء مستقلة كثيرة تتكدس النتائج قرب المتوسط وتتوزع بتماثل: فيظهر التوزيع الطبيعي.', 'Why a bell? A binomial is the sum of $n$ independent trials, each 0 or 1. When many independent things are added, the results pile up near the mean and spread out symmetrically: the normal appears.')
        }
    },
    continuity: {
        definitions: [
            { term: say('Jarraitutasun-zuzenketa', 'Corrección de continuidad', 'تصحيح الاتصال', 'Continuity correction'), meaning: say('Binomialaren $k$ balio oso bakoitza $k-0{,}5$ eta $k+0{,}5$ arteko tartera zabaltzea, normalera pasatzean.', 'Ensanchar cada valor entero $k$ de la binomial al intervalo de $k-0{,}5$ a $k+0{,}5$ al pasar a la normal.', 'توسيع كل قيمة صحيحة $k$ للتوزيع الثنائي إلى المجال من $k-0{,}5$ إلى $k+0{,}5$ عند الانتقال إلى الطبيعي.', 'Widening each whole value $k$ of the binomial to the interval from $k-0{,}5$ to $k+0{,}5$ when moving to the normal.') }
        ],
        vocabulary: [
            say('barra', 'barra', 'العمود', 'bar'),
            say('tipifikatu', 'tipificar', 'التوحيد المعياري', 'standardise')
        ],
        explanation: say(
            'Binomialak zenbaki osoak bakarrik hartzen ditu, eta normalak azalera modu jarraituan banatzen du. $k$ balio bakoitza 1 zabalerako barra bat da, $k$ puntuan zentratua: $k-0{,}5$ puntutik $k+0{,}5$ punturaino doa. Horregatik, $Y$ normalera pasatzean, mutur bakoitza puntu erdi mugitzen da, balioa sartuz edo kanpoan utziz, enuntziatuak dioenaren arabera.',
            'La binomial solo toma enteros, y la normal reparte el área de forma continua. Cada valor $k$ es una barra de anchura 1 centrada en $k$: va de $k-0{,}5$ a $k+0{,}5$. Por eso, al pasar a la normal $Y$, se mueve medio punto cada extremo, incluyendo o dejando fuera el valor según diga el enunciado.',
            'لا يأخذ التوزيع الثنائي إلا أعدادًا صحيحة، ويوزع التوزيع الطبيعي المساحة بشكل متصل. كل قيمة $k$ عمود عرضه 1 مركزه $k$: يمتد من $k-0{,}5$ إلى $k+0{,}5$. لذلك عند الانتقال إلى الطبيعي $Y$ نحرّك كل طرف نصف وحدة، فندخل القيمة أو نتركها خارجًا بحسب نص المسألة.',
            'The binomial only takes whole numbers, and the normal spreads the area continuously. Each value $k$ is a bar of width 1 centred on $k$: it goes from $k-0{,}5$ to $k+0{,}5$. So, when moving to the normal $Y$, each end is moved half a unit, including or leaving out the value as the question says.'
        ),
        cases: [
            { title: say('Gehienez', 'Como mucho', 'على الأكثر', 'At most'), text: say('$k$ balioa osorik sartzen da.', 'El valor $k$ entra entero.', 'تدخل القيمة $k$ كاملة.', 'The value $k$ goes in whole.'), math: same('$P(X\\le k)\\approx P(Y\\le k+0{,}5)$') },
            { title: say('Gutxienez', 'Al menos', 'على الأقل', 'At least'), text: say('$k$ barraren ezkerreko ertzetik.', 'Desde el borde izquierdo de la barra $k$.', 'من الحافة اليسرى للعمود $k$.', 'From the left edge of bar $k$.'), math: same('$P(X\\ge k)\\approx P(Y\\ge k-0{,}5)$') },
            { title: say('Zehazki', 'Exactamente', 'بالضبط', 'Exactly'), text: say('$k$ barra bakarrik.', 'Solo la barra $k$.', 'العمود $k$ وحده.', 'Only bar $k$.'), math: same('$P(X=k)\\approx P(k-0{,}5\\le Y\\le k+0{,}5)$') },
            { title: say('Baino gutxiago', 'Menos de', 'أقل من', 'Fewer than'), text: say('$X<k$ eta $X\\le k-1$ gauza bera dira: $k$ barra kanpoan geratzen da.', '$X<k$ es $X\\le k-1$: la barra $k$ queda fuera.', '$X<k$ هي $X\\le k-1$: يبقى العمود $k$ خارجًا.', '$X<k$ is $X\\le k-1$: bar $k$ is left out.'), math: same('$P(X<k)\\approx P(Y\\le k-0{,}5)$') }
        ],
        examplePrompt: say('Dado bat 180 aldiz botatzen da; sei kopurua $N(30;\\,5)$ da, gutxi gorabehera. Zein da gehienez 25 sei ateratzeko probabilitatea?', 'Se lanza un dado 180 veces; el número de seises es aproximadamente $N(30;\\,5)$. ¿Qué probabilidad hay de sacar como mucho 25 seises?', 'يُرمى نرد 180 مرة؛ وعدد مرات ظهور 6 يتبع تقريبًا $N(30;\\,5)$. ما احتمال ظهور 6 في 25 مرة على الأكثر؟', 'A die is rolled 180 times; the number of sixes is roughly $N(30;\\,5)$. What is the probability of at most 25 sixes?'),
        example: same('$P(Y\\le 25{,}5)=1-0{,}8159=0{,}1841$'),
        exampleAnswer: say('Zuzenketarekin, ${z}=\\frac{25{,}5-30}{5}=-0{,}9$; simetriagatik, 1 zenbakitik kentzen da.', 'Con la corrección, ${z}=\\frac{25{,}5-30}{5}=-0{,}9$; por simetría, se resta de 1.', 'مع التصحيح ${z}=\\frac{25{,}5-30}{5}=-0{,}9$؛ وبالتماثل نطرح من 1.', 'With the correction, ${z}=\\frac{25{,}5-30}{5}=-0{,}9$; by symmetry, it is subtracted from 1.'),
        why: {
            text: say('Zergatik puntu erdi? Binomialean, $k$ barraren azalera $P(X=k)$ da. Kanpaia barra bakoitzaren erditik igarotzen da; beraz, dagokion azalera $k-0{,}5$ puntutik $k+0{,}5$ punturaino doa; zuzenketarik gabe, barra erdi galtzen da mutur bakoitzean.', '¿Por qué medio punto? En la binomial, el área de la barra $k$ es $P(X=k)$. La campana pasa por el centro de cada barra, así que el área que le toca va de $k-0{,}5$ a $k+0{,}5$; sin la corrección se pierde media barra en cada extremo.', 'لماذا نصف وحدة؟ في التوزيع الثنائي مساحة العمود $k$ هي $P(X=k)$. ويمر الجرس بمنتصف كل عمود، فالمساحة المقابلة تمتد من $k-0{,}5$ إلى $k+0{,}5$؛ ودون التصحيح يضيع نصف عمود في كل طرف.', 'Why half a unit? In the binomial, the area of bar $k$ is $P(X=k)$. The bell passes through the middle of each bar, so the matching area goes from $k-0{,}5$ to $k+0{,}5$; without the correction, half a bar is lost at each end.')
        }
    }
}

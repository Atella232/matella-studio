import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { SamplingBatx2gTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Laginketa · Batxilergoa 2 · Gizarte Zientziak — what each lesson tells:
   the new words, a short explanation, the example as an exercise, the key
   words and, in some lessons, «Why does it work?». Plain data so the
   tests can import it; lessons.tsx merges it into the topics.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const samplingBatx2gLessonTexts: Record<SamplingBatx2gTopicId, LessonTexts> = {
    'population-sample': {
        definitions: [
            { term: say('Populazioa', 'Población', 'المجتمع', 'Population'), meaning: say('Aztertu nahi diren elementu guztien multzoa.', 'El conjunto de todos los elementos que se quieren estudiar.', 'مجموعة كل العناصر المراد دراستها.', 'The set of all the elements to be studied.') },
            { term: say('Lagina', 'Muestra', 'العيّنة', 'Sample'), meaning: say('Benetan aztertzen den populazioaren zatia.', 'La parte de la población que se estudia de verdad.', 'جزء المجتمع الذي يُدرس فعلًا.', 'The part of the population that is actually studied.') }
        ],
        vocabulary: [say('inkesta', 'encuesta', 'الاستطلاع', 'poll'), say('suntsitzailea', 'destructiva', 'متلف', 'destructive')],
        explanation: say(
            'Gehienetan ezin da populazio osoa aztertu: handiegia da, garestiegia, denbora gehiegi behar da, edo proba suntsitzailea da. Orduan lagin bat aztertzen da, eta haren emaitzekin populazioa estimatzen da. Inkesta bat ia beti lagin bat da.',
            'Casi nunca se puede estudiar toda la población: es demasiado grande, cara o lenta, o la prueba es destructiva. Entonces se estudia una muestra y con sus resultados se estima la población. Una encuesta es casi siempre una muestra.',
            'نادرًا ما يمكن دراسة المجتمع كله: فهو كبير جدًّا أو مكلف أو بطيء، أو الاختبار متلف. فنَدرس عيّنة ونقدّر المجتمع بنتائجها. والاستطلاع غالبًا عيّنة.',
            'The whole population can hardly ever be studied: it is too big, too expensive or too slow, or the test is destructive. So a sample is studied and its results are used to estimate the population. A poll is almost always a sample.'
        ),
        examplePrompt: say('Egunkari baten 30 000 irakurleen iritzia jakiteko, 500 irakurleri galdetzen zaie. Zein da populazioa eta zein lagina?', 'Para conocer la opinión de los 30 000 lectores de un periódico se pregunta a 500. ¿Cuál es la población y cuál la muestra?', 'لمعرفة رأي 30 000 قارئ لصحيفة يُسأل 500 منهم. ما المجتمع وما العيّنة؟', 'To learn the opinion of a newspaper\'s 30,000 readers, 500 are asked. What is the population and what is the sample?'),
        example: '',
        exampleAnswer: say('Populazioa, irakurle guztiak; lagina, galdetutako 500 irakurleak.', 'Población, todos los lectores; muestra, los 500 preguntados.', 'المجتمع كل القراء؛ والعيّنة الـ 500 المسؤولون.', 'Population, all the readers; sample, the 500 asked.')
    },
    bias: {
        definitions: [
            { term: say('Alborapena', 'Sesgo', 'التحيّز', 'Bias'), meaning: say('Lagin batek populazioa sistematikoki gaizki islatzeko joera, talde batzuk kanpoan uzten dituelako.', 'La tendencia de una muestra a reflejar mal la población porque deja fuera a algunos grupos.', 'ميل العيّنة إلى عكس المجتمع بشكل خاطئ لأنها تستبعد بعض المجموعات.', 'A sample\'s tendency to reflect the population wrongly because it leaves some groups out.') }
        ],
        vocabulary: [say('adierazgarria', 'representativa', 'ممثلة', 'representative'), say('zoriz', 'al azar', 'عشوائيًّا', 'at random')],
        explanation: say(
            'Lagin bat adierazgarria da populazioaren antzekoa bada: proportzio beretan gizon eta emakume, gazte eta zahar… Errazena zoriz aukeratzea da. Lekuak, orduak edo bitartekoak (telefonoa, Internet) aukeratzean, talde batzuk kanpoan gera daitezke: hori da alborapena.',
            'Una muestra es representativa si se parece a la población: en las mismas proporciones hombres y mujeres, jóvenes y mayores… Lo más sencillo es elegir al azar. Al elegir lugares, horas o medios (teléfono, Internet), algunos grupos pueden quedar fuera: eso es el sesgo.',
            'تكون العيّنة ممثلة إذا شابهت المجتمع: بالنسب نفسها رجالًا ونساءً وشبابًا وكبارًا… والأبسط الاختيار عشوائيًّا. وعند اختيار أماكن أو ساعات أو وسائل (هاتف، إنترنت) قد تُستبعد بعض المجموعات: هذا هو التحيّز.',
            'A sample is representative if it looks like the population: men and women, young and old in the same proportions… The simplest way is to choose at random. When places, times or channels (phone, Internet) are chosen, some groups may be left out: that is bias.'
        ),
        examplePrompt: say('Gazteek mugikorra nola erabiltzen duten aztertzeko, mugikor-denda batean galdetzen da. Badago alborapenik?', 'Para estudiar cómo usan el móvil los jóvenes, se pregunta en una tienda de móviles. ¿Hay sesgo?', 'لدراسة استعمال الشباب للهاتف المحمول يُسأل في متجر هواتف. هل هناك تحيّز؟', 'To study how young people use their phones, people are asked in a phone shop. Is there bias?'),
        example: '',
        exampleAnswer: say('Bai: dendara doazenak mugikorraren erabiltzaile handiagoak dira.', 'Sí: quienes van a la tienda usan más el móvil.', 'نعم: من يذهبون إلى المتجر يستعملون الهاتف أكثر.', 'Yes: those who go to the shop use their phones more.')
    },
    'simple-systematic': {
        definitions: [
            { term: say('Laginketa sistematikoa', 'Muestreo sistemático', 'المعاينة المنتظمة', 'Systematic sampling'), meaning: say('Lehenengoa zoriz aukeratzen da, eta gero $h$ jauziarekin, zerrenda bat jarraituz.', 'Se elige al azar el primero y después, siguiendo una lista, con un salto $h$.', 'يُختار الأول عشوائيًّا ثم بقفزة $h$ على قائمة.', 'The first is chosen at random and then, along a list, with a step $h$.') }
        ],
        vocabulary: [say('jauzia', 'salto', 'القفزة', 'step'), say('zerrenda', 'lista', 'القائمة', 'list')],
        explanation: say(
            'Ausazko laginketa sinplean, populazioko kide guztiak zenbakitzen dira eta $n$ zenbaki zozketatzen dira (kalkulagailuarekin, adibidez). Sistematikoan, nahikoa da lehenengoa zozketatzea: gainerakoak $h$ jauzian datoz. Kontuz zerrendak erritmo bat badu (adibidez, txandak): alborapena sor dezake.',
            'En el muestreo aleatorio simple se numeran todos los miembros de la población y se sortean $n$ números (con la calculadora, por ejemplo). En el sistemático basta con sortear el primero: los demás vienen cada $h$ puestos. Cuidado si la lista tiene un ritmo (turnos, por ejemplo): puede producir sesgo.',
            'في المعاينة العشوائية البسيطة نرقّم كل أفراد المجتمع ونسحب $n$ رقمًا (بالآلة الحاسبة مثلًا). وفي المنتظمة يكفي سحب الأول: والباقون يأتون كل $h$. انتبه إذا كان للقائمة إيقاع (نوبات مثلًا): قد يولّد تحيّزًا.',
            'In simple random sampling every member of the population is numbered and $n$ numbers are drawn (with a calculator, for example). In systematic sampling it is enough to draw the first: the rest come every $h$. Careful if the list has a rhythm (shifts, for example): it can produce bias.'
        ),
        examplePrompt: say('1200 langiletatik 40 langileko lagin sistematiko bat nahi da. Zein da jauzia?', 'De 1200 trabajadores se quiere una muestra sistemática de 40. ¿Cuál es el salto?', 'تُراد عيّنة منتظمة من 40 من بين 1200 عامل. ما القفزة؟', 'A systematic sample of 40 is wanted from 1,200 workers. What is the step?'),
        example: same('$h=\\frac{1200}{40}=30$'),
        exampleAnswer: say('30 langiletik behin aukeratzen da.', 'Se elige uno de cada 30.', 'يُختار واحد من كل 30.', 'One in every 30 is chosen.')
    },
    'proportional-allocation': {
        definitions: [
            { term: say('Geruza', 'Estrato', 'الطبقة', 'Stratum'), meaning: say('Populazioaren talde bat, barrutik antzekoa (maila bat, auzo bat, adin-talde bat).', 'Un grupo de la población, parecido por dentro (un curso, un barrio, una edad).', 'مجموعة من المجتمع متشابهة داخليًّا (صف أو حي أو عمر).', 'A group of the population, alike inside (a year, a district, an age group).') }
        ],
        vocabulary: [say('hondarra', 'resto', 'الباقي', 'remainder'), say('proportzioa', 'proporción', 'النسبة', 'share')],
        explanation: say(
            'Populazioak talde oso desberdinak dituenean, talde bakoitzetik kide batzuk aukeratzen dira, bakoitzaren barruan zoriz. Esleipen proportzionalean, geruza bakoitzak laginean populazioan duen proportzio bera du. Zatiketak osoak ez badira, beheratu eta falta direnak hondar handienei eman.',
            'Cuando la población tiene grupos muy distintos, se eligen miembros de cada grupo, al azar dentro de cada uno. Con afijación proporcional, cada estrato tiene en la muestra la misma proporción que en la población. Si las cuentas no salen enteras, se redondea hacia abajo y lo que falta se da a los mayores restos.',
            'عندما يضم المجتمع مجموعات مختلفة جدًّا نختار أفرادًا من كل مجموعة، عشوائيًّا داخل كل منها. وفي التوزيع التناسبي يكون لكل طبقة في العيّنة النسبة نفسها التي لها في المجتمع. وإذا لم تكن الأعداد صحيحة نقرّب إلى الأدنى ونعطي الناقص لأكبر البواقي.',
            'When the population has very different groups, members are chosen from each group, at random within each. With proportional allocation, each stratum has the same share in the sample as in the population. If the numbers are not whole, round down and give what is missing to the largest remainders.'
        ),
        examplePrompt: say('Bi geruza daude, 500 eta 300 kiderekin. 40 kideko lagin proportzionala nahi da. Zenbat lehen geruzatik?', 'Hay dos estratos de 500 y 300 miembros. Se quiere una muestra proporcional de 40. ¿Cuántos del primero?', 'هناك طبقتان فيهما 500 و300 عضو. تُراد عيّنة تناسبية من 40. كم من الأولى؟', 'There are two strata of 500 and 300 members. A proportional sample of 40 is wanted. How many from the first?'),
        example: same('$40\\cdot\\frac{500}{800}=25$'),
        exampleAnswer: say('25 lehen geruzatik eta 15 bigarrenetik.', '25 del primero y 15 del segundo.', '25 من الأولى و15 من الثانية.', '25 from the first and 15 from the second.')
    },
    'equal-allocation': {
        vocabulary: [say('esleipena', 'afijación', 'التوزيع', 'allocation'), say('geruzatu', 'estratificar', 'التقسيم الطبقي', 'stratify')],
        explanation: say(
            'Esleipen berdinean, geruza guztiek kide kopuru bera dute laginean, txikiak izan arren. Erabilgarria da geruza txiki bat ondo ezagutu nahi denean. Esleipen proportzionalak, aldiz, populazioaren itxura gordetzen du, eta hura erabiltzen da populazio osoaren batez bestekoa estimatzeko.',
            'Con afijación igual, todos los estratos tienen el mismo número de miembros en la muestra, aunque sean pequeños. Sirve cuando se quiere conocer bien un estrato pequeño. La proporcional, en cambio, conserva la forma de la población, y es la que se usa para estimar la media de toda la población.',
            'في التوزيع المتساوي لكل الطبقات العدد نفسه في العيّنة ولو كانت صغيرة. ويفيد حين نريد معرفة طبقة صغيرة جيدًا. أما التناسبي فيحافظ على شكل المجتمع، وهو المستعمل لتقدير متوسط المجتمع كله.',
            'With equal allocation, every stratum has the same number of members in the sample, even small ones. It is useful when a small stratum must be known well. Proportional allocation, instead, keeps the shape of the population, and it is the one used to estimate the mean of the whole population.'
        ),
        examplePrompt: say('5 geruza daude, eta 150 kideko lagina nahi da esleipen berdinarekin. Zenbat geruza bakoitzetik?', 'Hay 5 estratos y se quiere una muestra de 150 con afijación igual. ¿Cuántos de cada estrato?', 'هناك 5 طبقات وتُراد عيّنة من 150 بالتوزيع المتساوي. كم من كل طبقة؟', 'There are 5 strata and a sample of 150 with equal allocation is wanted. How many from each stratum?'),
        example: same('$\\frac{150}{5}=30$'),
        exampleAnswer: say('30 kide geruza bakoitzetik.', '30 miembros de cada estrato.', '30 عضوًا من كل طبقة.', '30 members from each stratum.')
    },
    'all-samples': {
        definitions: [
            { term: say('Laginaren batez bestekoa', 'Media muestral', 'متوسط العيّنة', 'Sample mean'), meaning: say('Lagin baten balioen batez bestekoa, $\\bar{x}$; lagin batetik bestera aldatzen da.', 'La media de los valores de una muestra, $\\bar{x}$; cambia de una muestra a otra.', 'متوسط قيم عيّنة $\\bar{x}$؛ ويتغير من عيّنة إلى أخرى.', 'The mean of the values of a sample, $\\bar{x}$; it changes from one sample to another.') }
        ],
        vocabulary: [say('itzulita', 'con reemplazamiento', 'مع الإرجاع', 'with replacement'), say('sakabanatzea', 'dispersión', 'التشتت', 'spread')],
        explanation: say(
            'Lagin bakoitzaren batez bestekoa aldagai aleatorio bat da, $\\bar{X}$: lagina zoriz aukeratzen denez, haren balioa ere zorizkoa da. Populazio txiki batean lagin guztiak idatz daitezke, itzulita, eta haien batez bestekoak $\\mu$ zenbakiaren inguruan biltzen dira, sakabanatze txikiagoarekin.',
            'La media de cada muestra es una variable aleatoria, $\\bar{X}$: como la muestra se elige al azar, su valor también es aleatorio. En una población pequeña se pueden escribir todas las muestras, con reemplazamiento, y sus medias se agrupan alrededor de $\\mu$, con menos dispersión.',
            'متوسط كل عيّنة متغير عشوائي $\\bar{X}$: لأن العيّنة تُختار عشوائيًّا فقيمته عشوائية أيضًا. وفي مجتمع صغير يمكن كتابة كل العيّنات مع الإرجاع، فتتجمع متوسطاتها حول $\\mu$ بتشتت أقل.',
            'The mean of each sample is a random variable, $\\bar{X}$: as the sample is chosen at random, its value is random too. In a small population every sample can be written down, with replacement, and their means gather around $\\mu$, with less spread.'
        ),
        examplePrompt: say('Populazioa 1 eta 5 da. 2 tamainako lagin guztiak, itzulita: zein da haien batez bestekoen batez bestekoa?', 'La población es 1 y 5. Todas las muestras de tamaño 2 con reemplazamiento: ¿cuál es la media de sus medias?', 'المجتمع 1 و5. كل العيّنات ذات الحجم 2 مع الإرجاع: ما متوسط متوسطاتها؟', 'The population is 1 and 5. All the samples of size 2 with replacement: what is the mean of their means?'),
        example: same('$\\frac{1+3+3+5}{4}=3$'),
        exampleAnswer: say('$\\mu$ bera: 3.', 'La misma $\\mu$: 3.', 'الـ $\\mu$ نفسها: 3.', 'The same $\\mu$: 3.')
    },
    'sample-mean-distribution': {
        definitions: [
            { term: say('Errore tipikoa', 'Error típico', 'الخطأ المعياري', 'Standard error'), meaning: say('Laginen batez bestekoen desbideratze tipikoa: $\\frac{\\sigma}{\\sqrt{n}}$.', 'La desviación típica de las medias muestrales: $\\frac{\\sigma}{\\sqrt{n}}$.', 'الانحراف المعياري لمتوسطات العيّنات: $\\frac{\\sigma}{\\sqrt{n}}$.', 'The standard deviation of the sample means: $\\frac{\\sigma}{\\sqrt{n}}$.') }
        ],
        vocabulary: [say('tipifikatu', 'tipifica', 'وحّد', 'standardise'), say('taula', 'tabla', 'الجدول', 'table')],
        explanation: say(
            'Lagin baten batez bestekoan, balio altuak eta baxuak konpentsatu egiten dira: horregatik, laginen batez bestekoak balio solteak baino gertuago daude $\\mu$ zenbakitik. Populazioa normala bada, $\\bar{X}$ ere normala da, batez beste bera eta $\\frac{\\sigma}{\\sqrt{n}}$ desbideratzearekin. Probabilitateak kalkulatzeko, tipifika eta erabili taula.',
            'En la media de una muestra los valores altos y bajos se compensan: por eso las medias muestrales están más cerca de $\\mu$ que los valores sueltos. Si la población es normal, $\\bar{X}$ también lo es, con la misma media y desviación $\\frac{\\sigma}{\\sqrt{n}}$. Para las probabilidades, tipifica y usa la tabla.',
            'في متوسط العيّنة تتعادل القيم العالية والمنخفضة: لذلك تكون متوسطات العيّنات أقرب إلى $\\mu$ من القيم المفردة. وإذا كان المجتمع طبيعيًّا فإن $\\bar{X}$ طبيعي أيضًا بالمتوسط نفسه وانحراف $\\frac{\\sigma}{\\sqrt{n}}$. وللاحتمالات وحّد واستعمل الجدول.',
            'In the mean of a sample, high and low values cancel out: that is why sample means are closer to $\\mu$ than single values. If the population is normal, $\\bar{X}$ is normal too, with the same mean and deviation $\\frac{\\sigma}{\\sqrt{n}}$. For the probabilities, standardise and use the table.'
        ),
        examplePrompt: say('$X\\sim N(200;\\,30)$ eta $n=9$. Zenbat da $P(\\bar{X}<210)$?', '$X\\sim N(200;\\,30)$ y $n=9$. ¿Cuánto vale $P(\\bar{X}<210)$?', '$X\\sim N(200;\\,30)$ و$n=9$. كم يساوي $P(\\bar{X}<210)$؟', '$X\\sim N(200;\\,30)$ and $n=9$. What is $P(\\bar{X}<210)$?'),
        example: same('$\\frac{30}{\\sqrt{9}}=10\\ \\to\\ z=\\frac{210-200}{10}=1\\ \\to\\ 0{,}8413$'),
        exampleAnswer: say('Laginen % 84 inguruk 210 baino gutxiago ematen du.', 'Cerca del 84 % de las muestras da menos de 210.', 'نحو 84 % من العيّنات تعطي أقل من 210.', 'About 84% of the samples give less than 210.'),
        why: {
            text: say('$n$ balio independenteren baturaren bariantza $n\\sigma^2$ da; batez bestekoa batura zati $n$ denez, haren bariantza $\\frac{n\\sigma^2}{n^2}=\\frac{\\sigma^2}{n}$ da, eta desbideratzea $\\frac{\\sigma}{\\sqrt{n}}$.', 'La varianza de la suma de $n$ valores independientes es $n\\sigma^2$; como la media es la suma entre $n$, su varianza es $\\frac{n\\sigma^2}{n^2}=\\frac{\\sigma^2}{n}$ y su desviación $\\frac{\\sigma}{\\sqrt{n}}$.', 'تباين مجموع $n$ قيمة مستقلة هو $n\\sigma^2$؛ ولأن المتوسط هو المجموع على $n$ فتباينه $\\frac{n\\sigma^2}{n^2}=\\frac{\\sigma^2}{n}$ وانحرافه $\\frac{\\sigma}{\\sqrt{n}}$.', 'The variance of the sum of $n$ independent values is $n\\sigma^2$; as the mean is the sum over $n$, its variance is $\\frac{n\\sigma^2}{n^2}=\\frac{\\sigma^2}{n}$ and its deviation $\\frac{\\sigma}{\\sqrt{n}}$.')
        }
    },
    'central-limit': {
        vocabulary: [say('teorema', 'teorema', 'المبرهنة', 'theorem'), say('lagin handia', 'muestra grande', 'العيّنة الكبيرة', 'large sample')],
        explanation: say(
            'Populazioaren banaketa edozein izanda ere (asimetrikoa, bi gailurrekin…), lagin handien batez bestekoak kanpai baten itxuran banatzen dira. Hori da limitearen teorema zentrala, eta praktikan $n\\ge 30$ denean erabiltzen da. Lagin handia izanik, $\\mu$ eta $\\sigma$ besterik ez dira behar.',
            'Sea cual sea la distribución de la población (asimétrica, con dos picos…), las medias de muestras grandes se reparten en forma de campana. Es el teorema central del límite, y en la práctica se usa cuando $n\\ge 30$. Con una muestra grande solo hacen falta $\\mu$ y $\\sigma$.',
            'مهما كان توزيع المجتمع (غير متماثل، بقمتين…) تتوزع متوسطات العيّنات الكبيرة على شكل جرس. هذه مبرهنة النهاية المركزية، وتُستعمل عمليًّا عندما $n\\ge 30$. ومع عيّنة كبيرة لا نحتاج إلا $\\mu$ و$\\sigma$.',
            'Whatever the distribution of the population (skewed, with two peaks…), the means of large samples spread out in the shape of a bell. That is the central limit theorem, and in practice it is used when $n\\ge 30$. With a large sample, only $\\mu$ and $\\sigma$ are needed.'
        ),
        examplePrompt: say('Populazio ez-normal batek $\\mu=50$ eta $\\sigma=20$ ditu. 400 kideko laginak hartzen dira. Zein normalekin hurbiltzen da $\\bar{X}$?', 'Una población no normal tiene $\\mu=50$ y $\\sigma=20$. Se toman muestras de 400. ¿Por qué normal se aproxima $\\bar{X}$?', 'لمجتمع غير طبيعي $\\mu=50$ و$\\sigma=20$. تؤخذ عيّنات من 400. بأي توزيع طبيعي يُقرَّب $\\bar{X}$؟', 'A non-normal population has $\\mu=50$ and $\\sigma=20$. Samples of 400 are taken. Which normal approximates $\\bar{X}$?'),
        example: same('$\\frac{20}{\\sqrt{400}}=1\\ \\to\\ N(50;\\,1)$'),
        exampleAnswer: say('$n=400\\ge 30$ denez, teorema erabil daiteke.', 'Como $n=400\\ge 30$, se puede usar el teorema.', 'لأن $n=400\\ge 30$ يمكن استعمال المبرهنة.', 'As $n=400\\ge 30$, the theorem can be used.')
    },
    'sum-distribution': {
        vocabulary: [say('batura', 'suma', 'المجموع', 'sum'), say('desbideratzea', 'desviación', 'الانحراف', 'deviation')],
        explanation: say(
            'Batzuetan batura bat interesatzen da, ez batez bestekoa: igogailu baten edo hegazkin baten pisua, saltoki baten diru-sarrerak. Batura $n\\,\\bar{X}$ da; beraz, batez bestekoa $n\\mu$ da eta desbideratzea $\\sigma\\sqrt{n}$, ez $n\\,\\sigma$, balioak elkarren artean konpentsatzen direlako.',
            'A veces interesa la suma, no la media: el peso en un ascensor o en un avión, la caja de una tienda. La suma es $n\\,\\bar{X}$; así que su media es $n\\mu$ y su desviación $\\sigma\\sqrt{n}$, no $n\\,\\sigma$, porque los valores se compensan entre sí.',
            'أحيانًا يهمنا المجموع لا المتوسط: الوزن في مصعد أو طائرة، أو دخل متجر. والمجموع هو $n\\,\\bar{X}$؛ فمتوسطه $n\\mu$ وانحرافه $\\sigma\\sqrt{n}$ لا $n\\,\\sigma$، لأن القيم يعوّض بعضها بعضًا.',
            'Sometimes the sum matters, not the mean: the weight in a lift or a plane, a shop\'s takings. The sum is $n\\,\\bar{X}$; so its mean is $n\\mu$ and its deviation $\\sigma\\sqrt{n}$, not $n\\,\\sigma$, because the values cancel each other out.'
        ),
        examplePrompt: say('$\\mu=5$, $\\sigma=1$ eta $n=36$. Zein normal da batura?', '$\\mu=5$, $\\sigma=1$ y $n=36$. ¿Qué normal sigue la suma?', '$\\mu=5$ و$\\sigma=1$ و$n=36$. أي توزيع طبيعي يتبعه المجموع؟', '$\\mu=5$, $\\sigma=1$ and $n=36$. Which normal does the sum follow?'),
        example: same('$36\\cdot 5=180\\qquad 1\\cdot\\sqrt{36}=6$'),
        exampleAnswer: say('Batura $N(180;\\,6)$ da.', 'La suma sigue una $N(180;\\,6)$.', 'يتبع المجموع $N(180;\\,6)$.', 'The sum follows an $N(180;\\,6)$.')
    },
    'sample-proportion': {
        definitions: [
            { term: say('Estimazio puntuala', 'Estimación puntual', 'التقدير النقطي', 'Point estimate'), meaning: say('Populazioaren parametro bat estimatzeko lagin batetik ateratako zenbaki bakarra.', 'Un solo número sacado de una muestra para estimar un parámetro de la población.', 'عدد واحد مأخوذ من عيّنة لتقدير معلمة في المجتمع.', 'A single number taken from a sample to estimate a population parameter.') }
        ],
        vocabulary: [say('ezaugarria', 'característica', 'الصفة', 'feature'), say('parametroa', 'parámetro', 'المعلمة', 'parameter')],
        explanation: say(
            'Populazioaren $p$ proportzioa (ezaugarri bat dutenena) ezezaguna da gehienetan. Lagin batean, ezaugarria dutenak zenbatu eta laginaren tamainaz zatitzen dira: $\\hat{p}$. Haren balioa estimazio puntuala da, eta lagin bakoitzak bere $\\hat{p}$ ematen du.',
            'La proporción $p$ de la población (la de los que tienen una característica) casi nunca se conoce. En una muestra se cuentan los que la tienen y se divide entre el tamaño: $\\hat{p}$. Su valor es una estimación puntual, y cada muestra da su propia $\\hat{p}$.',
            'نسبة المجتمع $p$ (لمن لديهم صفة) نادرًا ما تكون معروفة. في العيّنة نعدّ من لديهم الصفة ونقسم على الحجم: $\\hat{p}$. وقيمتها تقدير نقطي، وكل عيّنة تعطي $\\hat{p}$ خاصة بها.',
            'The population proportion $p$ (of those with a feature) is hardly ever known. In a sample, those who have the feature are counted and divided by the size: $\\hat{p}$. Its value is a point estimate, and each sample gives its own $\\hat{p}$.'
        ),
        examplePrompt: say('80 ikasletatik 12 ezkerrak dira. Zenbat da $\\hat{p}$?', 'De 80 alumnos, 12 son zurdos. ¿Cuánto vale $\\hat{p}$?', 'من 80 طالبًا 12 يستعملون اليد اليسرى. كم يساوي $\\hat{p}$؟', 'Of 80 students, 12 are left-handed. What is $\\hat{p}$?'),
        example: same('$\\hat{p}=\\frac{12}{80}=0{,}15$'),
        exampleAnswer: say('% 15 inguru ezkerrak.', 'Cerca del 15 % zurdos.', 'نحو 15 % يستعملون اليسرى.', 'About 15% left-handed.')
    },
    'proportion-distribution': {
        vocabulary: [say('baldintzak', 'condiciones', 'الشرطين', 'conditions'), say('desbideratze tipikoa', 'desviación típica', 'الانحراف المعياري', 'standard deviation')],
        explanation: say(
            'Lagin bateko ezaugarria dutenen kopurua binomiala da, $B(n;\\,p)$, eta haren proportzioa, zati $n$. $np\\ge 5$ eta $nq\\ge 5$ badira, binomiala normala bihurtzen da; beraz, $\\hat{p}$ ere normala da, $p$ batez bestekoarekin eta $\\sqrt{\\frac{pq}{n}}$ desbideratze tipikoarekin.',
            'El número de los que tienen la característica en una muestra es binomial, $B(n;\\,p)$, y su proporción, eso entre $n$. Si $np\\ge 5$ y $nq\\ge 5$ la binomial se vuelve normal; así que $\\hat{p}$ también es normal, de media $p$ y desviación típica $\\sqrt{\\frac{pq}{n}}$.',
            'عدد من لديهم الصفة في العيّنة ثنائي $B(n;\\,p)$، ونسبتهم ذلك على $n$. وإذا كان $np\\ge 5$ و$nq\\ge 5$ يصبح الثنائي طبيعيًّا؛ فيكون $\\hat{p}$ طبيعيًّا أيضًا بمتوسط $p$ وانحراف معياري $\\sqrt{\\frac{pq}{n}}$.',
            'The number with the feature in a sample is binomial, $B(n;\\,p)$, and its proportion is that over $n$. If $np\\ge 5$ and $nq\\ge 5$ the binomial becomes normal; so $\\hat{p}$ is normal too, with mean $p$ and standard deviation $\\sqrt{\\frac{pq}{n}}$.'
        ),
        examplePrompt: say('$p=0{,}5$ eta $n=400$. Zein da $\\hat{p}$ aldagaiaren desbideratze tipikoa?', '$p=0{,}5$ y $n=400$. ¿Cuál es la desviación típica de $\\hat{p}$?', '$p=0{,}5$ و$n=400$. ما الانحراف المعياري لـ $\\hat{p}$؟', '$p=0{,}5$ and $n=400$. What is the standard deviation of $\\hat{p}$?'),
        example: same('$\\sqrt{\\frac{0{,}5\\cdot 0{,}5}{400}}=0{,}025$'),
        exampleAnswer: say('$\\hat{p}\\approx N(0{,}5;\\,0{,}025)$.', '$\\hat{p}\\approx N(0{,}5;\\,0{,}025)$.', '$\\hat{p}\\approx N(0{,}5;\\,0{,}025)$.', '$\\hat{p}\\approx N(0{,}5;\\,0{,}025)$.'),
        why: {
            text: say('$X\\sim B(n;\\,p)$ bada, $\\hat{p}=\\frac{X}{n}$; haren batez bestekoa $\\frac{np}{n}=p$ da eta bariantza $\\frac{npq}{n^2}=\\frac{pq}{n}$.', 'Si $X\\sim B(n;\\,p)$, $\\hat{p}=\\frac{X}{n}$; su media es $\\frac{np}{n}=p$ y su varianza $\\frac{npq}{n^2}=\\frac{pq}{n}$.', 'إذا كان $X\\sim B(n;\\,p)$ فإن $\\hat{p}=\\frac{X}{n}$؛ متوسطه $\\frac{np}{n}=p$ وتباينه $\\frac{npq}{n^2}=\\frac{pq}{n}$.', 'If $X\\sim B(n;\\,p)$, $\\hat{p}=\\frac{X}{n}$; its mean is $\\frac{np}{n}=p$ and its variance $\\frac{npq}{n^2}=\\frac{pq}{n}$.')
        }
    },
    'proportion-probability': {
        vocabulary: [say('tipifikatu', 'tipifica', 'وحّد', 'standardise'), say('harrigarria', 'sorprendente', 'مفاجئة', 'surprising')],
        explanation: say(
            '$\\hat{p}$ normala denez, haren probabilitateak batez bestekoen modu berean kalkulatzen dira: tipifikatu eta taulan irakurri. Lagin baten emaitza harrigarria den jakiteko erabiltzen da: probabilitatea oso txikia bada, agian $p$ ez da uste genuena.',
            'Como $\\hat{p}$ es normal, sus probabilidades se calculan como las de las medias: se tipifica y se lee en la tabla. Sirve para saber si el resultado de una muestra es sorprendente: si la probabilidad es muy pequeña, quizá $p$ no es la que creíamos.',
            'لأن $\\hat{p}$ طبيعي تُحسب احتمالاته كاحتمالات المتوسطات: نوحّد ونقرأ في الجدول. ويفيد لمعرفة ما إذا كانت نتيجة عيّنة مفاجئة: إذا كان الاحتمال صغيرًا جدًّا فربما ليس $p$ ما ظنناه.',
            'As $\\hat{p}$ is normal, its probabilities are worked out like those of the means: standardise and read the table. It tells whether a sample\'s result is surprising: if the probability is very small, maybe $p$ is not what we thought.'
        ),
        examplePrompt: say('$\\hat{p}\\sim N(0{,}6;\\,0{,}04)$. Zenbat da $P(\\hat{p}<0{,}56)$?', '$\\hat{p}\\sim N(0{,}6;\\,0{,}04)$. ¿Cuánto vale $P(\\hat{p}<0{,}56)$?', '$\\hat{p}\\sim N(0{,}6;\\,0{,}04)$. كم يساوي $P(\\hat{p}<0{,}56)$؟', '$\\hat{p}\\sim N(0{,}6;\\,0{,}04)$. What is $P(\\hat{p}<0{,}56)$?'),
        example: same('${z}=\\frac{0{,}56-0{,}6}{0{,}04}=-1\\ \\to\\ 1-0{,}8413=0{,}1587$'),
        exampleAnswer: say('% 16 inguru.', 'Cerca del 16 %.', 'نحو 16 %.', 'About 16%.')
    },
    'mean-interval': {
        vocabulary: [say('erradioa', 'radio', 'نصف القطر', 'radius'), say('arraroa', 'raro', 'نادر', 'rare')],
        explanation: say(
            '$\\bar{X}$ normala denez, haren tarte karakteristikoa normalaren beste edozeinena bezala kalkulatzen da, baina $\\frac{\\sigma}{\\sqrt{n}}$ desbideratzearekin. Lagin batek tarte horretatik kanpoko batez bestekoa ematen badu, gertaera arraroa da: probabilitatea $\\alpha$ baino ez da.',
            'Como $\\bar{X}$ es normal, su intervalo característico se calcula como el de cualquier normal, pero con la desviación $\\frac{\\sigma}{\\sqrt{n}}$. Si una muestra da una media fuera de ese intervalo, es algo raro: su probabilidad es solo $\\alpha$.',
            'لأن $\\bar{X}$ طبيعي تُحسب فترته المميزة كأي توزيع طبيعي، لكن بالانحراف $\\frac{\\sigma}{\\sqrt{n}}$. وإذا أعطت عيّنة متوسطًا خارج هذه الفترة فهو أمر نادر: احتماله $\\alpha$ فقط.',
            'As $\\bar{X}$ is normal, its characteristic interval is worked out like that of any normal, but with the deviation $\\frac{\\sigma}{\\sqrt{n}}$. If a sample gives a mean outside that interval, it is rare: its probability is only $\\alpha$.'
        ),
        examplePrompt: say('$N(40;\\,6)$ eta $n=9$. Zein da batez bestekoen tartea, % 99 probabilitatearekin?', '$N(40;\\,6)$ y $n=9$. ¿Cuál es el intervalo del 99 % de las medias?', '$N(40;\\,6)$ و$n=9$. ما فترة 99 % للمتوسطات؟', '$N(40;\\,6)$ and $n=9$. What is the 99% interval of the means?'),
        example: same('$2{,}575\\cdot\\frac{6}{\\sqrt{9}}=5{,}15\\ \\to\\ (34{,}85;\\ 45{,}15)$'),
        exampleAnswer: say('Laginetatik, % 99 dute batez bestekoa tarte horretan.', 'El 99 % de las muestras tiene la media en ese intervalo.', '99 % من العيّنات متوسطها في هذه الفترة.', '99% of the samples have their mean in that interval.')
    },
    'proportion-interval': {
        vocabulary: [say('proportzioa', 'proporción', 'النسبة', 'proportion'), say('erradioa', 'radio', 'نصف القطر', 'radius')],
        explanation: say(
            'Laginen proportzioek ere tarte karakteristiko bat dute: $p$ erdian eta ${z}_{\\alpha/2}\\,\\sqrt{\\frac{pq}{n}}$ erradioa. Hauteskundeetako inkestetan ikusten da: «% 2 errore-marjina», adibidez, % 95 probabilitateko tartearen erradioa da.',
            'Las proporciones muestrales también tienen un intervalo característico: $p$ en el centro y radio ${z}_{\\alpha/2}\\,\\sqrt{\\frac{pq}{n}}$. Se ve en las encuestas electorales: el «margen de error del 2 %», por ejemplo, es el radio del intervalo del 95 %.',
            'لنسب العيّنات أيضًا فترة مميزة: $p$ في الوسط ونصف قطر ${z}_{\\alpha/2}\\,\\sqrt{\\frac{pq}{n}}$. ويظهر ذلك في الاستطلاعات الانتخابية: «هامش الخطأ 2 %» مثلًا هو نصف قطر فترة 95 %.',
            'Sample proportions also have a characteristic interval: $p$ in the middle and radius ${z}_{\\alpha/2}\\,\\sqrt{\\frac{pq}{n}}$. It shows up in election polls: the «2% margin of error», for example, is the radius of the 95% interval.'
        ),
        examplePrompt: say('$p=0{,}1$ eta $n=100$. Zein da proportzioen tartearen erradioa, % 90 probabilitatearekin?', '$p=0{,}1$ y $n=100$. ¿Cuál es el radio del intervalo del 90 % de las proporciones?', '$p=0{,}1$ و$n=100$. ما نصف قطر فترة 90 % للنسب؟', '$p=0{,}1$ and $n=100$. What is the radius of the 90% interval of the proportions?'),
        example: same('$1{,}645\\cdot\\sqrt{\\frac{0{,}1\\cdot 0{,}9}{100}}=1{,}645\\cdot 0{,}03=0{,}04935$'),
        exampleAnswer: say('Erradioa 0,04935 da, % 5 inguru.', 'El radio es 0,04935, cerca del 5 %.', 'نصف القطر 0.04935، أي نحو 5 %.', 'The radius is 0.04935, about 5%.')
    },
    'bigger-sample': {
        vocabulary: [say('zabalera', 'anchura', 'العرض', 'width'), say('tamaina', 'tamaño', 'الحجم', 'size')],
        explanation: say(
            'Tartearen erradioan, $n$ erro karratu baten barruan dago. Beraz, lagina bikoizteak ez du erradioa erdira jaisten: lau aldiz handiagoa behar da. Horregatik, lagin oso handiak garestiak dira eta ez dira beti merezi: tamainaren eta zehaztasunaren arteko oreka bilatzen da.',
            'En el radio del intervalo, $n$ está dentro de una raíz cuadrada. Así que duplicar la muestra no reduce el radio a la mitad: hace falta cuatro veces más. Por eso las muestras enormes son caras y no siempre compensan: se busca un equilibrio entre tamaño y precisión.',
            'في نصف قطر الفترة يقع $n$ داخل جذر تربيعي. لذلك لا تؤدي مضاعفة العيّنة إلى تنصيف نصف القطر: نحتاج أربعة أضعاف. ولهذا العيّنات الضخمة مكلفة ولا تستحق دائمًا: نبحث عن توازن بين الحجم والدقة.',
            'In the radius of the interval, $n$ is inside a square root. So doubling the sample does not halve the radius: four times as much is needed. That is why huge samples are expensive and not always worth it: a balance between size and precision is sought.'
        ),
        examplePrompt: say('$\\sigma=12$ da, eta $n$ 16 izatetik 64 izatera pasatzen da. Zer gertatzen zaio $\\frac{\\sigma}{\\sqrt{n}}$ zenbakiari?', 'Con $\\sigma=12$, $n$ pasa de 16 a 64. ¿Qué le pasa a $\\frac{\\sigma}{\\sqrt{n}}$?', 'مع $\\sigma=12$ ينتقل $n$ من 16 إلى 64. ماذا يحدث لـ $\\frac{\\sigma}{\\sqrt{n}}$؟', 'With $\\sigma=12$, $n$ goes from 16 to 64. What happens to $\\frac{\\sigma}{\\sqrt{n}}$?'),
        example: same('$\\frac{12}{\\sqrt{16}}=3\\qquad\\frac{12}{\\sqrt{64}}=1{,}5$'),
        exampleAnswer: say('Erdia: lagina lau aldiz handiagoa da.', 'La mitad: la muestra es cuatro veces mayor.', 'النصف: العيّنة أكبر بأربع مرات.', 'Half: the sample is four times bigger.'),
        why: {
            text: say('$n$ bider 4 egitean, $\\sqrt{n}$ bider 2 egiten da, eta $\\frac{\\sigma}{\\sqrt{n}}$ erdira jaisten da. Orokorrean, erradioa $k$ zenbakiaz zatitzeko, $n$ bider $k^2$ egin behar da.', 'Al multiplicar $n$ por 4, $\\sqrt{n}$ se multiplica por 2 y $\\frac{\\sigma}{\\sqrt{n}}$ se reduce a la mitad. En general, para dividir el radio entre $k$ hay que multiplicar $n$ por $k^2$.', 'عند ضرب $n$ في 4 يُضرب $\\sqrt{n}$ في 2 وينخفض $\\frac{\\sigma}{\\sqrt{n}}$ إلى النصف. وعمومًا لقسمة نصف القطر على $k$ نضرب $n$ في $k^2$.', 'Multiplying $n$ by 4 multiplies $\\sqrt{n}$ by 2 and halves $\\frac{\\sigma}{\\sqrt{n}}$. In general, to divide the radius by $k$ you multiply $n$ by $k^2$.')
        }
    }
}

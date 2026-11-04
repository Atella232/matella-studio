import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { ProportionTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Proportzionaltasuna · 1. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, the example as an exercise («Another example», or «Example»
   in the lessons of facts) and, in three lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. The explanation keeps the story that its drawing tells (the
   croquettes, 1/2 = 2/4, the fodder, the chocolate bars, the felt-tip
   pens, the tap and the barrel, the painters, the bricklayers, 85 of 100,
   Enrique's trainers, the sheep, the fine); no drawing shows «Let's solve»
   solved. Percentages and prices go in the words, as each language writes
   them (% 25, 25 %, 25%, 25٪; 60 €, €60). The example uses numbers of its
   own, never those of «Let's solve», of «Check it» or of the typical
   mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const proportionLessonTexts: Record<ProportionTopicId, LessonTexts> = {
    /* ---------- 1. Ratios and proportions ---------- */
    magnitude: {
        vocabulary: [
            say('unitatea', 'unidad', 'الوحدة', 'unit'),
            say('neurtu', 'medir', 'قياس', 'measure'),
            say('luzera', 'longitud', 'الطول', 'length')
        ],
        definitions: [
            {
                term: say('Magnitudea', 'Magnitud', 'المقدار', 'Magnitude'),
                meaning: say('Neur daitekeen ezaugarri bat, zenbaki batekin eta unitate batekin adierazten dena.', 'Una característica que se puede medir y expresar con un número y una unidad.', 'خاصية يمكن قياسها والتعبير عنها بعدد ووحدة.', 'A feature that can be measured and written with a number and a unit.')
            },
            {
                term: say('Kantitatea', 'Cantidad', 'الكمية', 'Amount'),
                meaning: say('Magnitude baten balioa: zenbakia eta unitatea, 2 kg bezala.', 'El valor de una magnitud: número y unidad, como 2 kg.', 'قيمة المقدار: عدد ووحدة، مثل 2 كغ.', 'The value of a magnitude: number and unit, like 2 kg.')
            }
        ],
        explanation: say(
            'Luzera, masa, edukiera, denbora, prezioa edo abiadura magnitudeak dira, eta unitatetan adierazten dira: metroak, kiloak, litroak, euroak, km/h… Maitasuna, edertasuna edo barrea ez dira magnitudeak: ezin dira zenbaki batekin eta unitate batekin neurtu, marrazkian bezala.',
            'Longitud, masa, capacidad, tiempo, precio o velocidad son magnitudes, y se expresan en unidades: metros, kilos, litros, euros, km/h… El cariño, la belleza o la risa no son magnitudes: no se pueden medir con un número y una unidad, como se ve en el dibujo.',
            'الطول والكتلة والسعة والزمن والسعر والسرعة مقادير، ويُعبَّر عنها بوحدات: الأمتار والكيلوغرامات واللترات واليوروهات وكم/س… أما المودّة والجمال والضحك فليست مقادير: لا يمكن قياسها بعدد ووحدة، كما في الرسم.',
            'Length, mass, capacity, time, price or speed are magnitudes, and they are written in units: metres, kilos, litres, euros, km/h… Love, beauty or laughter are not magnitudes: they cannot be measured with a number and a unit, as the drawing shows.'
        ),
        examplePrompt: say('Hauetatik zein dira magnitudeak: zuhaitz baten altuera, beldurra, lasterketa baten denbora, jatortasuna?', '¿Cuáles son magnitudes: la altura de un árbol, el miedo, el tiempo de una carrera, la simpatía?', 'أيّها مقادير: ارتفاع شجرة، الخوف، زمن سباق، اللطف؟', 'Which are magnitudes: the height of a tree, fear, the time of a race, kindness?'),
        example: same('$12\\ \\mathrm{m}\\qquad 45\\ \\mathrm{s}$'),
        exampleAnswer: say('Altuera eta denbora neurtzen dira (adibidez, 12 m eta 45 s); beldurra eta jatortasuna, ez.', 'La altura y el tiempo se miden (por ejemplo, 12 m y 45 s); el miedo y la simpatía, no.', 'الارتفاع والزمن يُقاسان (مثلًا 12 م و45 ث)؛ أما الخوف واللطف فلا.', 'Height and time can be measured (for example, 12 m and 45 s); fear and kindness cannot.')
    },
    ratio: {
        vocabulary: [
            say('aurrekaria', 'antecedente', 'المقدَّم', 'antecedent'),
            say('ondorengoa', 'consecuente', 'التالي', 'consequent'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient')
        ],
        definitions: [
            {
                term: say('Arrazoia', 'Razón', 'النسبة', 'Ratio'),
                meaning: say('Bi kantitateren arteko zatidura, $\\frac{a}{b}$: $a$ aurrekaria da, eta $b$ ondorengoa.', 'El cociente entre dos cantidades, $\\frac{a}{b}$: $a$ es el antecedente y $b$, el consecuente.', 'خارج قسمة كميتين، $\\frac{a}{b}$: $a$ هو المقدَّم و$b$ هو التالي.', 'The quotient of two amounts, $\\frac{a}{b}$: $a$ is the antecedent and $b$ the consequent.')
            }
        ],
        explanation: say(
            'Jantokian, ikasle bakoitzak 2 kroketa jaten ditu: ikasle 1, 2; 2 ikasle, 4; 3, 6… Ikasleen eta kroketen arteko arrazoiek, $\\frac{1}{2}$, $\\frac{2}{4}$, $\\frac{3}{6}$, $0{,}5$ balio dute denek. Zatiki batek ez bezala, arrazoi batek hamartarrak izan ditzake: $\\frac{2{,}5}{4}$.',
            'En el comedor, cada alumno come 2 croquetas: 1 alumno, 2; 2 alumnos, 4; 3, 6… Las razones entre alumnos y croquetas, $\\frac{1}{2}$, $\\frac{2}{4}$, $\\frac{3}{6}$, valen todas $0{,}5$. A diferencia de una fracción, una razón puede tener decimales: $\\frac{2{,}5}{4}$.',
            'في المطعم يأكل كل تلميذ كروكيتين: تلميذ واحد 2؛ تلميذان 4؛ 3 تلاميذ 6… والنسب بين التلاميذ والكروكيت، $\\frac{1}{2}$ و$\\frac{2}{4}$ و$\\frac{3}{6}$، كلها تساوي $0{,}5$. وبخلاف الكسر قد تحوي النسبة أعدادًا عشرية: $\\frac{2{,}5}{4}$.',
            'In the canteen, each pupil eats 2 croquettes: 1 pupil, 2; 2 pupils, 4; 3, 6… The ratios of pupils to croquettes, $\\frac{1}{2}$, $\\frac{2}{4}$, $\\frac{3}{6}$, are all worth $0{,}5$. Unlike a fraction, a ratio can have decimals: $\\frac{2{,}5}{4}$.'
        ),
        examplePrompt: say('Auto batek 18 litro gastatzen ditu 300 km-tan. Zein da litroen eta kilometroen arteko arrazoia?', 'Un coche gasta 18 litros en 300 km. ¿Cuál es la razón entre litros y kilómetros?', 'تستهلك سيارة 18 لترًا في 300 كم. ما النسبة بين اللترات والكيلومترات؟', 'A car uses 18 litres in 300 km. What is the ratio of litres to kilometres?'),
        example: same('$\\frac{18}{300}=0{,}06$'),
        exampleAnswer: say('$0{,}06$ litro kilometroko: aurrekaria, litroak, goian.', '$0{,}06$ litros por kilómetro: el antecedente, los litros, arriba.', '$0{,}06$ لتر لكل كيلومتر: المقدَّم، أي اللترات، في الأعلى.', '$0{,}06$ litres per kilometre: the antecedent, the litres, on top.')
    },
    proportion: {
        vocabulary: [
            say('muturrak', 'extremos', 'الطرفان', 'extremes'),
            say('erdikoak', 'medios', 'الوسطان', 'means'),
            say('zatiki baliokideak', 'fracciones equivalentes', 'الكسور المتكافئة', 'equivalent fractions')
        ],
        definitions: [
            {
                term: say('Proportzioa', 'Proporción', 'التناسب', 'Proportion'),
                meaning: say('Bi arrazoiren berdintza, $\\frac{a}{b}=\\frac{c}{d}$; $a$ eta $d$ muturrak dira, eta $b$ eta $c$, erdikoak.', 'La igualdad de dos razones, $\\frac{a}{b}=\\frac{c}{d}$; $a$ y $d$ son los extremos, y $b$ y $c$, los medios.', 'تساوي نسبتين، $\\frac{a}{b}=\\frac{c}{d}$؛ و$a$ و$d$ هما الطرفان، و$b$ و$c$ هما الوسطان.', 'Two equal ratios, $\\frac{a}{b}=\\frac{c}{d}$; $a$ and $d$ are the extremes, and $b$ and $c$ the means.')
            }
        ],
        explanation: say(
            'Proportzio batean, muturren biderkadura erdikoen biderkaduraren berdina da, zatiki baliokideetan bezala: marrazkian, $\\frac{1}{2}=\\frac{2}{4}$ eta $1\\cdot 4=2\\cdot 2$. Horrela aurkitzen da falta den gai bat.',
            'En una proporción, el producto de extremos es igual al producto de medios, como en las fracciones equivalentes: en el dibujo, $\\frac{1}{2}=\\frac{2}{4}$ y $1\\cdot 4=2\\cdot 2$. Así se halla un término que falta.',
            'في التناسب يساوي حاصلُ ضرب الطرفين حاصلَ ضرب الوسطين، كما في الكسور المتكافئة: في الرسم $\\frac{1}{2}=\\frac{2}{4}$ و$1\\cdot 4=2\\cdot 2$. وهكذا نجد الحد الناقص.',
            'In a proportion, the product of the extremes equals the product of the means, as with equivalent fractions: in the drawing, $\\frac{1}{2}=\\frac{2}{4}$ and $1\\cdot 4=2\\cdot 2$. That is how you find a missing term.'
        ),
        examplePrompt: say('Aurkitu $x$: $\\frac{4}{10}=\\frac{x}{25}$.', 'Halla $x$: $\\frac{4}{10}=\\frac{x}{25}$.', 'أوجد $x$: $\\frac{4}{10}=\\frac{x}{25}$.', 'Find $x$: $\\frac{4}{10}=\\frac{x}{25}$.'),
        example: same('$\\begin{gathered}4\\cdot 25=10\\cdot x\\\\x=100\\mathbin{:}10\\end{gathered}$'),
        exampleAnswer: say('$x=10$: $\\frac{4}{10}=\\frac{10}{25}=0{,}4$.', '$x=10$: $\\frac{4}{10}=\\frac{10}{25}=0{,}4$.', '$x=10$: $\\frac{4}{10}=\\frac{10}{25}=0{,}4$.', '$x=10$: $\\frac{4}{10}=\\frac{10}{25}=0{,}4$.')
    },

    /* ---------- 2. Direct proportion ---------- */
    direct: {
        vocabulary: [
            say('taula', 'tabla', 'الجدول', 'table'),
            say('bikoitza', 'doble', 'الضعف', 'double'),
            say('erdia', 'mitad', 'النصف', 'half')
        ],
        definitions: [
            {
                term: say('Zuzenki proportzionalak', 'Directamente proporcionales', 'متناسبان طرديًا', 'Directly proportional'),
                meaning: say('Magnitude bat bikoizten bada, bestea ere bai; bata erdira jaisten bada, bestea ere bai.', 'Dos magnitudes en las que, si una se dobla, la otra también; y si una se hace la mitad, la otra también.', 'مقداران إذا تضاعف أحدهما تضاعف الآخر، وإذا صار أحدهما النصف صار الآخر النصف.', 'Two quantities where, if one doubles, so does the other; and if one drops to half, so does the other.')
            },
            {
                term: say('Proportzionaltasun-konstantea', 'Constante de proporcionalidad', 'ثابت التناسب', 'Constant of proportionality'),
                meaning: say('Bi balio elkarkideren arteko arrazoia, beti bera.', 'La razón entre dos valores correspondientes, siempre la misma.', 'النسبة بين قيمتين متقابلتين، وهي دائمًا نفسها.', 'The ratio between two matching values, always the same.')
            }
        ],
        explanation: say(
            'Ukuilu batean, 6 kg pentsurekin 10 behi elikatzen dira; 12 kg-rekin, 20; 18 kg-rekin, 30. Taulan, arrazoi guztiek balio bera dute: $\\frac{6}{10}=\\frac{12}{20}=\\frac{18}{30}=0{,}6$. Kontuz: ez da nahikoa biak haztea; adina eta altuera ez dira proportzionalak.',
            'En un establo, con 6 kg de pienso se alimentan 10 vacas; con 12 kg, 20; con 18 kg, 30. En la tabla, todas las razones valen lo mismo: $\\frac{6}{10}=\\frac{12}{20}=\\frac{18}{30}=0{,}6$. Cuidado: no basta con que crezcan las dos; la edad y la altura no son proporcionales.',
            'في حظيرة تكفي 6 كغ من العلف لإطعام 10 أبقار؛ و12 كغ لـ20؛ و18 كغ لـ30. وفي الجدول كل النسب متساوية: $\\frac{6}{10}=\\frac{12}{20}=\\frac{18}{30}=0{,}6$. انتبه: لا يكفي أن يزيد الاثنان؛ فالعمر والطول غير متناسبين.',
            'In a cowshed, 6 kg of feed feeds 10 cows; 12 kg, 20; 18 kg, 30. In the table, all the ratios are worth the same: $\\frac{6}{10}=\\frac{12}{20}=\\frac{18}{30}=0{,}6$. Careful: it is not enough for both to grow; age and height are not proportional.'
        ),
        examplePrompt: say('Zuzenki proportzionalak dira? 2 koaderno, 3 euro; 4 koaderno, 6 euro; 10 koaderno, 15 euro.', '¿Son directamente proporcionales? 2 cuadernos, 3 €; 4 cuadernos, 6 €; 10 cuadernos, 15 €.', 'هل هما متناسبان طرديًا؟ دفتران، 3 يورو؛ 4 دفاتر، 6 يورو؛ 10 دفاتر، 15 يورو.', 'Are they directly proportional? 2 notebooks, €3; 4 notebooks, €6; 10 notebooks, €15.'),
        example: same('$\\frac{3}{2}=\\frac{6}{4}=\\frac{15}{10}=1{,}5$'),
        exampleAnswer: say('Bai: arrazoia beti $1{,}5$ da, koaderno bakoitzaren prezioa.', 'Sí: la razón siempre es $1{,}5$, lo que cuesta cada cuaderno.', 'نعم: النسبة دائمًا $1{,}5$، وهي ثمن الدفتر الواحد.', 'Yes: the ratio is always $1{,}5$, the price of each notebook.')
    },
    'direct-unit': {
        vocabulary: [
            say('unitatera laburtzea', 'reducción a la unidad', 'الرجوع إلى الوحدة', 'unit method'),
            say('zatitu', 'dividir', 'اقسم', 'divide'),
            say('biderkatu', 'multiplicar', 'اضرب', 'multiply')
        ],
        explanation: say(
            'Hiru txokolatinak 90 g pisatzen dute. Zenbat pisatzen dute bik? Lehenik, batek: $90\\mathbin{:}3=30$ g. Gero, biderkatu: $30\\cdot 2=60$ g. Hori da unitatera laburtzea: zatitu unitate baten balioa lortzeko, eta biderkatu.',
            'Tres chocolatinas pesan 90 g. ¿Cuánto pesan dos? Primero, una: $90\\mathbin{:}3=30$ g. Después, multiplica: $30\\cdot 2=60$ g. Eso es la reducción a la unidad: divide para obtener el valor de una unidad, y multiplica.',
            'ثلاث قطع شوكولاتة تزن 90 غ. كم تزن قطعتان؟ أولًا قطعة واحدة: $90\\mathbin{:}3=30$ غ. ثم اضرب: $30\\cdot 2=60$ غ. هذا هو الرجوع إلى الوحدة: اقسم لتحصل على قيمة الوحدة، ثم اضرب.',
            'Three chocolate bars weigh 90 g. How much do two weigh? First, one: $90\\mathbin{:}3=30$ g. Then multiply: $30\\cdot 2=60$ g. That is the unit method: divide to get the value of one unit, and multiply.'
        ),
        examplePrompt: say('Kanguru batek 12 m egiten ditu 4 jauzitan. Zenbat egingo ditu 10 jauzitan?', 'Un canguro avanza 12 m en 4 saltos. ¿Cuánto avanza en 10 saltos?', 'يتقدم كنغر 12 م في 4 قفزات. كم يتقدم في 10 قفزات؟', 'A kangaroo covers 12 m in 4 jumps. How far does it go in 10 jumps?'),
        example: same('$12\\mathbin{:}4=3\\ \\to\\ 3\\cdot 10=30$'),
        exampleAnswer: say('Jauzi batean, 3 m; 10 jauzitan, 30 m.', 'En un salto, 3 m; en 10 saltos, 30 m.', 'في قفزة واحدة 3 م؛ وفي 10 قفزات 30 م.', 'In one jump, 3 m; in 10 jumps, 30 m.')
    },
    'rule-of-three': {
        vocabulary: [
            say('hiruko erregela', 'regla de tres', 'قاعدة الثلاثة', 'rule of three'),
            say('zutabea', 'columna', 'العمود', 'column')
        ],
        explanation: say(
            '3 errotulagailuk 6 euro balio badute, zenbat balio dute 7 errotulagailuk? Errotulagailu gehiago, diru gehiago: zuzena da, eta arrazoiak berdinak dira, $\\frac{3}{6}=\\frac{7}{x}$. Biderkadura gurutzatuekin, $3\\cdot x=7\\cdot 6=42$, eta $x=14$ euro. Idatzi magnitude bakoitza bere zutabean.',
            'Si 3 rotuladores cuestan 6 €, ¿cuánto cuestan 7? Más rotuladores, más dinero: es directa, y las razones son iguales, $\\frac{3}{6}=\\frac{7}{x}$. Con los productos cruzados, $3\\cdot x=7\\cdot 6=42$, y $x=14$ €. Escribe cada magnitud en su columna.',
            'إذا كان ثمن 3 أقلام تلوين 6 يورو، فكم ثمن 7؟ أقلام أكثر، مال أكثر: تناسب طردي، والنسب متساوية، $\\frac{3}{6}=\\frac{7}{x}$. وبالضرب التبادلي $3\\cdot x=7\\cdot 6=42$، و$x=14$ يورو. اكتب كل مقدار في عموده.',
            'If 3 felt-tip pens cost €6, how much do 7 cost? More pens, more money: it is direct, and the ratios are equal, $\\frac{3}{6}=\\frac{7}{x}$. With cross products, $3\\cdot x=7\\cdot 6=42$, and $x=14$ euros. Write each quantity in its own column.'
        ),
        examplePrompt: say('8 kg irinarekin 20 ogi-barra egiten dira. Zenbat barra 14 kg-rekin?', 'Con 8 kg de harina se hacen 20 barras de pan. ¿Cuántas barras con 14 kg?', 'من 8 كغ من الطحين نصنع 20 رغيفًا. كم رغيفًا من 14 كغ؟', '8 kg of flour make 20 loaves of bread. How many loaves from 14 kg?'),
        example: same('$\\begin{gathered}\\frac{8}{20}=\\frac{14}{x}\\\\x=\\frac{20\\cdot 14}{8}=35\\end{gathered}$'),
        exampleAnswer: say('14 kg-rekin 35 barra ateratzen dira.', 'Con 14 kg salen 35 barras.', 'من 14 كغ نحصل على 35 رغيفًا.', '14 kg make 35 loaves.')
    },

    /* ---------- 3. Inverse proportion ---------- */
    inverse: {
        vocabulary: [
            say('biderkadura', 'producto', 'حاصل الضرب', 'product'),
            say('emaria', 'caudal', 'التدفق', 'flow'),
            say('erdia', 'mitad', 'النصف', 'half')
        ],
        definitions: [
            {
                term: say('Alderantziz proportzionalak', 'Inversamente proporcionales', 'متناسبان عكسيًا', 'Inversely proportional'),
                meaning: say('Magnitude bat bikoizten bada, bestea erdira jaisten da; bata hirukoizten bada, bestea herenera.', 'Dos magnitudes en las que, si una se dobla, la otra se reduce a la mitad; si una se triplica, la otra a la tercera parte.', 'مقداران إذا تضاعف أحدهما صار الآخر النصف، وإذا تضاعف ثلاث مرات صار الآخر الثلث.', 'Two quantities where, if one doubles, the other halves; if one triples, the other drops to a third.')
            }
        ],
        explanation: say(
            'Minutuko 3 litroko txorrota batek upel bat 15 minututan betetzen du; 6 l/min-ko emariarekin, $7{,}5$ minututan, eta 9 l/min-koarekin, 5 minututan. Arrazoiak ez dira berdinak, baina biderkadura bai: $3\\cdot 15=6\\cdot 7{,}5=9\\cdot 5=45$ litro, upelean sartzen dena.',
            'Un grifo de 3 litros por minuto llena un tonel en 15 minutos; con un caudal de 6 l/min tarda $7{,}5$ minutos, y con 9 l/min, 5. Las razones no son iguales, pero el producto sí: $3\\cdot 15=6\\cdot 7{,}5=9\\cdot 5=45$ litros, lo que cabe en el tonel.',
            'صنبور تدفقه 3 لترات في الدقيقة يملأ برميلًا في 15 دقيقة؛ وبتدفق 6 ل/د يحتاج إلى $7{,}5$ دقائق، وبتدفق 9 ل/د إلى 5. النسب غير متساوية، لكن حاصل الضرب متساوٍ: $3\\cdot 15=6\\cdot 7{,}5=9\\cdot 5=45$ لترًا، وهو ما يتسع له البرميل.',
            'A tap with a flow of 3 litres a minute fills a barrel in 15 minutes; with 6 l/min it takes $7{,}5$ minutes, and with 9 l/min, 5. The ratios are not equal, but the product is: $3\\cdot 15=6\\cdot 7{,}5=9\\cdot 5=45$ litres, what the barrel holds.'
        ),
        examplePrompt: say('Alderantziz proportzionalak dira? 2 langile, 12 egun; 3 langile, 8 egun; 6 langile, 4 egun.', '¿Son inversamente proporcionales? 2 obreros, 12 días; 3 obreros, 8 días; 6 obreros, 4 días.', 'هل هما متناسبان عكسيًا؟ عاملان، 12 يومًا؛ 3 عمال، 8 أيام؛ 6 عمال، 4 أيام.', 'Are they inversely proportional? 2 workers, 12 days; 3 workers, 8 days; 6 workers, 4 days.'),
        example: same('$2\\cdot 12=3\\cdot 8=6\\cdot 4=24$'),
        exampleAnswer: say('Bai: biderkadura beti 24 da, langile bakar baten lan-egunak.', 'Sí: el producto siempre es 24, los días de trabajo de un solo obrero.', 'نعم: حاصل الضرب دائمًا 24، وهي أيام عمل عامل واحد.', 'Yes: the product is always 24, the days one worker on their own would need.'),
        why: {
            text: say(
                'Upelak beti 45 litro hartzen ditu. Minutuko bikoitza isurtzen baduzu, minutuen erdia behar duzu: minutuko litroak bider minutuak beti dira upeleko litroak.',
                'El tonel siempre tiene 45 litros. Si echas el doble cada minuto, necesitas la mitad de minutos: litros por minuto por minutos da siempre los litros del tonel.',
                'البرميل يتسع دائمًا لـ45 لترًا. إذا صببت الضعف كل دقيقة احتجت إلى نصف الدقائق: اللترات في الدقيقة مضروبة في الدقائق تعطي دائمًا لترات البرميل.',
                'The barrel always holds 45 litres. If you pour twice as much each minute, you need half the minutes: litres per minute times minutes always gives the litres in the barrel.'
            ),
            math: same('$3\\cdot 15=6\\cdot 7{,}5=45$')
        }
    },
    'inverse-unit': {
        vocabulary: [
            say('alderantziz', 'al revés', 'بالعكس', 'the other way round'),
            say('biderkatu', 'multiplicar', 'نضرب', 'multiply'),
            say('zatitu', 'dividir', 'نقسم', 'divide')
        ],
        explanation: say(
            'Bi margolarik horma bat 9 ordutan margotzen dute. Zenbat behar dute hiruk? Bakar batek bikoitza, $9\\cdot 2=18$ ordu, eta hiruk herena, $18\\mathbin{:}3=6$ ordu. Alderantzizkoan, lehenik biderkatu eta gero zatitu egiten da: zuzenean baino alderantziz.',
            'Dos pintores pintan una pared en 9 horas. ¿Cuánto tardan tres? Uno solo tarda el doble, $9\\cdot 2=18$ horas, y tres, la tercera parte, $18\\mathbin{:}3=6$ horas. En la inversa, primero se multiplica y después se divide: al revés que en la directa.',
            'يدهن دهّانان جدارًا في 9 ساعات. كم يحتاج ثلاثة؟ الدهّان الواحد يحتاج الضعف، $9\\cdot 2=18$ ساعة، والثلاثة الثلث، $18\\mathbin{:}3=6$ ساعات. في التناسب العكسي نضرب أولًا ثم نقسم: بالعكس مما في الطردي.',
            'Two painters paint a wall in 9 hours. How long do three take? One alone takes twice as long, $9\\cdot 2=18$ hours, and three take a third, $18\\mathbin{:}3=6$ hours. In inverse proportion you first multiply and then divide: the other way round from direct.'
        ),
        examplePrompt: say('4 txorrotak igerileku bat 15 ordutan betetzen dute. Zenbat beharko lukete 6 txorrotak?', '4 grifos llenan una piscina en 15 horas. ¿Cuánto tardarían 6 grifos?', '4 صنابير تملأ مسبحًا في 15 ساعة. كم تحتاج 6 صنابير؟', '4 taps fill a pool in 15 hours. How long would 6 taps take?'),
        example: same('$15\\cdot 4=60\\ \\to\\ 60\\mathbin{:}6=10$'),
        exampleAnswer: say('Txorrota bakar batek 60 ordu beharko lituzke; 6 txorrotak, 10 ordu.', 'Un grifo solo tardaría 60 horas; 6 grifos, 10 horas.', 'الصنبور الواحد يحتاج 60 ساعة؛ و6 صنابير 10 ساعات.', 'One tap alone would take 60 hours; 6 taps, 10 hours.')
    },
    'inverse-rule': {
        vocabulary: [
            say('alderantzizkoa', 'inversa', 'عكسي', 'inverse'),
            say('biderkadurak', 'productos', 'حاصلا الضرب', 'products'),
            say('txikitu', 'decrecer', 'ينقص', 'go down')
        ],
        explanation: say(
            '10 igeltserok horma bat 45 egunean eraikitzen dute. Zenbat behar dira 15 egunean amaitzeko? Egun gutxiago, igeltsero gehiago: alderantzizkoa, beraz biderkadurak berdinak dira, $10\\cdot 45=x\\cdot 15$, eta $x=450\\mathbin{:}15=30$ igeltsero. Galdetu beti: bata haztean, bestea hazten ala txikitzen da?',
            '10 albañiles construyen un muro en 45 días. ¿Cuántos hacen falta para terminarlo en 15? Menos días, más albañiles: inversa, así que los productos son iguales, $10\\cdot 45=x\\cdot 15$, y $x=450\\mathbin{:}15=30$ albañiles. Pregúntate siempre: al crecer una, ¿la otra crece o decrece?',
            'يبني 10 بنّائين جدارًا في 45 يومًا. كم بنّاءً نحتاج لإنهائه في 15 يومًا؟ أيام أقل، بنّاؤون أكثر: تناسب عكسي، إذن حاصلا الضرب متساويان، $10\\cdot 45=x\\cdot 15$، و$x=450\\mathbin{:}15=30$ بنّاءً. اسأل نفسك دائمًا: إذا زاد أحدهما، هل يزيد الآخر أم ينقص؟',
            '10 bricklayers build a wall in 45 days. How many are needed to finish it in 15? Fewer days, more bricklayers: inverse, so the products are equal, $10\\cdot 45=x\\cdot 15$, and $x=450\\mathbin{:}15=30$ bricklayers. Always ask yourself: when one goes up, does the other go up or go down?'
        ),
        examplePrompt: say('12 oilorekin, pentsuak 20 egun irauten du. Zenbat egun iraungo du 16 oilorekin?', 'Con 12 gallinas, el pienso dura 20 días. ¿Cuántos días dura con 16 gallinas?', 'مع 12 دجاجة يكفي العلف 20 يومًا. كم يومًا يكفي مع 16 دجاجة؟', 'With 12 hens, the feed lasts 20 days. How many days does it last with 16 hens?'),
        example: same('$\\begin{gathered}12\\cdot 20=16\\cdot x\\\\x=240\\mathbin{:}16=15\\end{gathered}$'),
        exampleAnswer: say('16 oilorekin, pentsuak 15 egun irauten du.', 'Con 16 gallinas, el pienso dura 15 días.', 'مع 16 دجاجة يكفي العلف 15 يومًا.', 'With 16 hens, the feed lasts 15 days.')
    },

    /* ---------- 4. Percentages ---------- */
    'percent-meaning': {
        vocabulary: [
            say('osoa', 'total', 'الكل', 'whole'),
            say('zatikia', 'fracción', 'الكسر', 'fraction'),
            say('hamartarra', 'decimal', 'عشري', 'decimal')
        ],
        definitions: [
            {
                term: say('Ehunekoa', 'Porcentaje', 'النسبة المئوية', 'Percentage'),
                meaning: say('100 kantitate bati dagokion zatia. % ikurrarekin idazten da.', 'La parte que corresponde a una cantidad de 100. Se escribe con %.', 'الجزء المقابل لكمية مقدارها 100. ويُكتب بالرمز ٪.', 'The part that goes with an amount of 100. It is written with %.')
            }
        ],
        explanation: say(
            '«Taldeak partiden %\u00a085 irabazi zuen» esan nahi du 100 bakoitzeko 85 irabazi zituela, laukidunean bezala: $\\frac{85}{100}=0{,}85$. Ehuneko bakoitza 100 izendatzailedun zatikia da, eta hamartar bat. Osoa %\u00a0100 da.',
            '«El equipo ganó el 85\u00a0% de los partidos» quiere decir que ganó 85 de cada 100, como en la cuadrícula: $\\frac{85}{100}=0{,}85$. Cada porcentaje es una fracción de denominador 100 y un decimal. El total es el 100\u00a0%.',
            '«ربح الفريق 85٪ من المباريات» يعني أنه ربح 85 من كل 100، كما في الشبكة: $\\frac{85}{100}=0{,}85$. وكل نسبة مئوية كسر مقامه 100 وعدد عشري. والكل هو 100٪.',
            '«The team won 85% of its matches» means it won 85 out of every 100, as in the grid: $\\frac{85}{100}=0{,}85$. Each percentage is a fraction with denominator 100 and a decimal. The whole is 100%.'
        ),
        examplePrompt: say('Idatzi %\u00a064 eta %\u00a05 zatiki gisa eta hamartar gisa.', 'Escribe el 64\u00a0% y el 5\u00a0% como fracción y como decimal.', 'اكتب 64٪ و5٪ على شكل كسر وعدد عشري.', 'Write 64% and 5% as a fraction and as a decimal.'),
        example: same('$\\frac{64}{100}=0{,}64\\qquad\\frac{5}{100}=0{,}05$'),
        exampleAnswer: say('%\u00a05 zenbakiak zero bat darama: bost ehunen, $0{,}05$.', 'El 5\u00a0% lleva un cero: cinco centésimas, $0{,}05$.', '5٪ فيها صفر: خمسة أجزاء من مئة، $0{,}05$.', '5% needs a zero: five hundredths, $0{,}05$.')
    },
    'percent-of': {
        vocabulary: [
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage'),
            say('kantitatea', 'cantidad', 'الكمية', 'amount'),
            say('buruz', 'de cabeza', 'ذهنيًا', 'in your head')
        ],
        explanation: say(
            'Enrikek 60 euroko zapatila batzuk erosi ditu, %\u00a015 merkatuta. Ehuneko bat zatiki bat denez, $\\frac{15}{100}$, berdin kalkulatzen da: $60\\cdot 15\\mathbin{:}100=9$ euro. Buruz: %\u00a010 10 zenbakiarekin zatitzea da, %\u00a050 erdia, eta %\u00a025 laurdena.',
            'Enrique compra unas zapatillas de 60 € con un descuento del 15\u00a0%. Como un porcentaje es una fracción, $\\frac{15}{100}$, se calcula igual: $60\\cdot 15\\mathbin{:}100=9$ €. De cabeza: el 10\u00a0% es dividir entre 10, el 50\u00a0%, la mitad, y el 25\u00a0%, la cuarta parte.',
            'اشترى إنريكي حذاء رياضيًا ثمنه 60 يورو بخصم 15٪. ولأن النسبة المئوية كسر، $\\frac{15}{100}$، نحسبها بالطريقة نفسها: $60\\cdot 15\\mathbin{:}100=9$ يورو. وذهنيًا: 10٪ هي القسمة على 10، و50٪ النصف، و25٪ الربع.',
            'Enrique buys a pair of €60 trainers with 15% off. Since a percentage is a fraction, $\\frac{15}{100}$, it is worked out the same way: $60\\cdot 15\\mathbin{:}100=9$ euros. In your head: 10% is dividing by 10, 50% is half and 25% is a quarter.'
        ),
        examplePrompt: say('Kalkulatu 260 zenbakiaren %\u00a035.', 'Calcula el 35\u00a0% de 260.', 'احسب 35٪ من 260.', 'Work out 35% of 260.'),
        example: same('$260\\cdot 35\\mathbin{:}100=91$'),
        exampleAnswer: say('260 zenbakiaren %\u00a035 91 da.', 'El 35\u00a0% de 260 es 91.', '35٪ من 260 هي 91.', '35% of 260 is 91.'),
        why: {
            text: say(
                '%\u00a010 $\\frac{10}{100}=\\frac{1}{10}$ da: hamarrena. Horregatik da 10 zenbakiarekin zatitzea. Era berean, %\u00a050 $\\frac{1}{2}$ da, erdia, eta %\u00a025, $\\frac{1}{4}$, laurdena.',
                'El 10\u00a0% es $\\frac{10}{100}=\\frac{1}{10}$: la décima parte. Por eso es dividir entre 10. Igual, el 50\u00a0% es $\\frac{1}{2}$, la mitad, y el 25\u00a0%, $\\frac{1}{4}$, la cuarta parte.',
                '10٪ هي $\\frac{10}{100}=\\frac{1}{10}$: العُشر. لذلك هي القسمة على 10. وبالمثل 50٪ هي $\\frac{1}{2}$، النصف، و25٪ هي $\\frac{1}{4}$، الربع.',
                '10% is $\\frac{10}{100}=\\frac{1}{10}$: a tenth. That is why it means dividing by 10. In the same way, 50% is $\\frac{1}{2}$, a half, and 25% is $\\frac{1}{4}$, a quarter.'
            )
        }
    },
    'which-percent': {
        vocabulary: [
            say('zatia', 'parte', 'الجزء', 'part'),
            say('osoa', 'total', 'الكل', 'whole')
        ],
        explanation: say(
            '480 ardietatik 120 moztu dituzte: zenbat da ehunekotan? Zatia osoarekin zatitzen da, eta 100 zenbakiaz biderkatu: %\u00a025, marrazkian bezala. Alderantziz, zatia eta ehunekoa ezagutzen badira, osoa kalkulatzen da.',
            'De 480 ovejas se han esquilado 120: ¿qué porcentaje es? Se divide la parte entre el total y se multiplica por 100: el 25\u00a0%, como en el dibujo. Al revés, si se conocen la parte y el porcentaje, se calcula el total.',
            'من 480 نعجة جُزّ صوف 120: ما النسبة المئوية؟ نقسم الجزء على الكل ونضرب في 100: 25٪، كما في الرسم. وبالعكس، إذا عرفنا الجزء والنسبة المئوية نحسب الكل.',
            'Out of 480 sheep, 120 have been sheared: what percentage is that? Divide the part by the whole and multiply by 100: 25%, as in the drawing. The other way round, if you know the part and the percentage, you work out the whole.'
        ),
        examplePrompt: say('Azterketa batean, Luziak 24 galderetatik 18 asmatu ditu. Zer ehuneko asmatu du?', 'En un examen, Lucía acierta 18 de 24 preguntas. ¿Qué porcentaje ha acertado?', 'في امتحان أجابت لوسيا إجابة صحيحة عن 18 من 24 سؤالًا. ما النسبة المئوية؟', 'In a test, Lucía gets 18 out of 24 questions right. What percentage has she got right?'),
        example: same('$18\\mathbin{:}24\\cdot 100=75$'),
        exampleAnswer: say('%\u00a075 asmatu du.', 'Ha acertado el 75\u00a0%.', 'أصابت في 75٪.', 'She has got 75% right.')
    },

    /* ---------- 5. Discounts, increases and problems ---------- */
    discount: {
        vocabulary: [
            say('deskontua', 'descuento', 'الخصم', 'discount'),
            say('prezioa', 'precio', 'السعر', 'price')
        ],
        explanation: say(
            'Enrikeren zapatilek 60 euro balio zuten, eta %\u00a015 deskontatu diote, 9 euro: $60-9=51$ euro ordaindu ditu. Bide laburra: %\u00a015 deskontatzen badute, %\u00a085 ordaintzen da, eta $60\\cdot 0{,}85=51$. %\u00a015 deskontatzea ez da 15 euro kentzea.',
            'Las zapatillas de Enrique valían 60 € y le descuentan el 15\u00a0%, 9 €: paga $60-9=51$ €. Camino corto: si descuentan el 15\u00a0%, se paga el 85\u00a0%, y $60\\cdot 0{,}85=51$. Un descuento del 15\u00a0% no es quitar 15 €.',
            'كان ثمن حذاء إنريكي 60 يورو وخُصم منه 15٪، أي 9 يورو: يدفع $60-9=51$ يورو. الطريق الأقصر: إذا خُصم 15٪ ندفع 85٪، و$60\\cdot 0{,}85=51$. وخصم 15٪ لا يعني طرح 15 يورو.',
            'Enrique\'s trainers cost €60 and he gets 15% off, €9: he pays $60-9=51$ euros. Shortcut: if they take off 15%, you pay 85%, and $60\\cdot 0{,}85=51$. A 15% discount is not taking off €15.'
        ),
        examplePrompt: say('Joko batek 45 euro balio du, eta %\u00a020 merkatuta dago. Zenbat ordaintzen da?', 'Un juego cuesta 45 € y tiene un 20\u00a0% de descuento. ¿Cuánto se paga?', 'ثمن لعبة 45 يورو وعليها خصم 20٪. كم ندفع؟', 'A game costs €45 and has 20% off. How much do you pay?'),
        example: same('$45\\cdot 0{,}8=36$'),
        exampleAnswer: say('%\u00a080 ordaintzen da: 36 euro.', 'Se paga el 80\u00a0%: 36 €.', 'ندفع 80٪: 36 يورو.', 'You pay 80%: €36.'),
        why: {
            text: say(
                '100 bakoitzeko 15 kentzen badituzte, 100 bakoitzeko 85 geratzen dira. %\u00a085 ordaintzea $\\frac{85}{100}=0{,}85$ zenbakiaz biderkatzea da: deskontua eta kenketa urrats bakarrean.',
                'Si quitan 15 de cada 100, quedan 85 de cada 100. Pagar el 85\u00a0% es multiplicar por $\\frac{85}{100}=0{,}85$: el descuento y la resta en un solo paso.',
                'إذا خصموا 15 من كل 100 بقي 85 من كل 100. ودفع 85٪ هو الضرب في $\\frac{85}{100}=0{,}85$: الخصم والطرح في خطوة واحدة.',
                'If they take off 15 out of every 100, 85 out of every 100 are left. Paying 85% is multiplying by $\\frac{85}{100}=0{,}85$: the discount and the subtraction in one step.'
            ),
            math: same('$\\frac{85}{100}=0{,}85$')
        }
    },
    increase: {
        vocabulary: [
            say('errekargua', 'recargo', 'الزيادة', 'surcharge'),
            say('igoera', 'aumento', 'ارتفاع', 'increase'),
            say('batu', 'sumar', 'نجمع', 'add')
        ],
        explanation: say(
            '75 euroko isun bat berandu ordaintzeagatik, errekargu bat kobratzen da, %\u00a015: $75\\cdot 15\\mathbin{:}100=11{,}25$ euro, eta guztira $86{,}25$ euro. Bide laburra: %\u00a015 igotzen bada, %\u00a0115 ordaintzen da, $75\\cdot 1{,}15=86{,}25$. Igoeretan batu egiten da; deskontuetan, kendu.',
            'Por pagar tarde una multa de 75 €, se cobra un recargo del 15\u00a0%: $75\\cdot 15\\mathbin{:}100=11{,}25$ €, y en total, $86{,}25$ €. Camino corto: si sube un 15\u00a0%, se paga el 115\u00a0%, $75\\cdot 1{,}15=86{,}25$. En los aumentos se suma; en los descuentos, se resta.',
            'عند دفع مخالفة قيمتها 75 يورو متأخرًا تُضاف زيادة 15٪: $75\\cdot 15\\mathbin{:}100=11{,}25$ يورو، وفي المجموع $86{,}25$ يورو. الطريق الأقصر: إذا ارتفع السعر 15٪ ندفع 115٪، $75\\cdot 1{,}15=86{,}25$. في الارتفاع نجمع، وفي الخصم نطرح.',
            'For paying a €75 fine late, there is a 15% surcharge: $75\\cdot 15\\mathbin{:}100=11{,}25$ euros, and $86{,}25$ euros in all. Shortcut: if it goes up by 15%, you pay 115%, $75\\cdot 1{,}15=86{,}25$. With increases you add; with discounts, you subtract.'
        ),
        examplePrompt: say('600 euroko alokairua %\u00a03 igo da. Zenbat balio du orain?', 'Un alquiler de 600 € sube un 3\u00a0%. ¿Cuánto cuesta ahora?', 'ارتفع إيجار قيمته 600 يورو بنسبة 3٪. كم صار الآن؟', 'A €600 rent goes up by 3%. How much is it now?'),
        example: same('$600\\cdot 1{,}03=618$'),
        exampleAnswer: say('Orain %\u00a0103 ordaintzen da: 618 euro.', 'Ahora se paga el 103\u00a0%: 618 €.', 'صار الدفع 103٪: 618 يورو.', 'Now you pay 103%: €618.')
    },
    problems: {
        vocabulary: [
            say('zuzena', 'directa', 'طردي', 'direct'),
            say('alderantzizkoa', 'inversa', 'عكسي', 'inverse'),
            say('ez proportzionala', 'no proporcional', 'غير متناسب', 'not proportional')
        ],
        explanation: say(
            'Ebatzi aurretik, bilatu bi magnitudeak eta galdetu: bata haztean, bestea proportzio berean hazten da? Zuzena. Txikitzen da? Alderantzizkoa. Ez bata ez bestea? Ez dira proportzionalak. Eta % agertzen bada, pentsatu zatia, osoa ala aldaketa bat bilatzen duzun.',
            'Antes de resolver, busca las dos magnitudes y pregúntate: al crecer una, ¿la otra crece en la misma proporción? Directa. ¿Decrece? Inversa. ¿Ni una cosa ni otra? No son proporcionales. Y si aparece %, piensa si buscas la parte, el total o un cambio.',
            'قبل الحل ابحث عن المقدارين واسأل نفسك: إذا زاد أحدهما، هل يزيد الآخر بالنسبة نفسها؟ طردي. هل ينقص؟ عكسي. لا هذا ولا ذاك؟ غير متناسبين. وإذا ظهر الرمز ٪ ففكّر: هل تبحث عن الجزء أم الكل أم عن تغيّر؟',
            'Before solving, find the two quantities and ask yourself: when one goes up, does the other go up in the same proportion? Direct. Does it go down? Inverse. Neither? They are not proportional. And if % appears, think whether you want the part, the whole or a change.'
        ),
        examplePrompt: say('Zer metodo? 5 koadernok 8 euro balio dute; zenbat 15 koadernok? Eta 5 txorrotak depositu bat 8 ordutan betetzen badute, zenbat behar dute 4 txorrotak?', '¿Qué método? 5 cuadernos cuestan 8 €; ¿cuánto cuestan 15? Y si 5 grifos llenan un depósito en 8 horas, ¿cuánto tardan 4 grifos?', 'أيّ طريقة؟ ثمن 5 دفاتر 8 يورو؛ فكم ثمن 15؟ وإذا ملأت 5 صنابير خزانًا في 8 ساعات، فكم تحتاج 4 صنابير؟', 'Which method? 5 notebooks cost €8; how much do 15 cost? And if 5 taps fill a tank in 8 hours, how long do 4 taps take?'),
        example: same('$\\begin{gathered}8\\cdot 3=24\\\\8\\cdot 5\\mathbin{:}4=10\\end{gathered}$'),
        exampleAnswer: say('Koadernoak: zuzena, 24 euro. Txorrotak: alderantzizkoa, 10 ordu.', 'Cuadernos: directa, 24 €. Grifos: inversa, 10 horas.', 'الدفاتر: طردي، 24 يورو. الصنابير: عكسي، 10 ساعات.', 'Notebooks: direct, €24. Taps: inverse, 10 hours.')
    }
}

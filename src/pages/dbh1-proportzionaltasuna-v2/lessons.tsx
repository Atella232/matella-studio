import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    ChooseMethodFigure,
    DirectTableFigure,
    DiscountFigure,
    IncreaseFigure,
    InverseRuleFigure,
    InverseTableFigure,
    InverseUnitFigure,
    MagnitudesFigure,
    PercentGridFigure,
    PercentOfFigure,
    ProportionFigure,
    RatioFigure,
    RuleOfThreeFigure,
    UnitReductionFigure,
    WhichPercentFigure
} from './figures'

/* ==========================================================================
   Proportzionaltasuna · 1. DBH — stages and lessons. Sequence follows the
   class textbook (Santillana 1.º ESO, unit 8, curricular adaptation):
   magnitudes, ratios and proportions, direct proportionality (the canteen
   croquettes, the cows' fodder, the felt-tip pens), inverse
   proportionality (the tap and the barrel, the bricklayers) and
   percentages (Enrique's trainers). Anaya (unit 9) adds the reduction to
   the unit, the rule of three and the percentage problems.
   ========================================================================== */

export type ProportionStageId = 'ratios' | 'direct' | 'inverse' | 'percent' | 'changes'

export const proportionStages: UnitStage[] = [
    { id: 'ratios', tone: 'blue', title: { eu: 'Magnitudeak eta arrazoiak', es: 'Magnitudes y razones', ar: 'المقادير والنسب' } },
    { id: 'direct', tone: 'violet', title: { eu: 'Proportzionaltasun zuzena', es: 'Proporcionalidad directa', ar: 'التناسب الطردي' } },
    { id: 'inverse', tone: 'mustard', title: { eu: 'Alderantzizko proportzionaltasuna', es: 'Proporcionalidad inversa', ar: 'التناسب العكسي' } },
    { id: 'percent', tone: 'coral', title: { eu: 'Ehunekoak', es: 'Porcentajes', ar: 'النسب المئوية' } },
    { id: 'changes', tone: 'green', title: { eu: 'Igoerak, beherapenak eta problemak', es: 'Aumentos, descuentos y problemas', ar: 'الزيادات والتخفيضات والمسائل' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const proportionTopics: UnitTopic[] = [
    /* ---------- 1. Magnitudes and ratios ---------- */
    {
        id: 'magnitude',
        stage: 'ratios',
        title: say('Magnitudeak eta unitateak', 'Magnitudes y unidades', 'المقادير والوحدات'),
        goal: say('Magnitude bat zer den jakitea eta neurtu daitezkeenak bereiztea.', 'Saber qué es una magnitud y distinguir lo que se puede medir.', 'معرفة ما هو المقدار وتمييز ما يمكن قياسه.'),
        explanation: say(
            'Magnitudea objektu baten neur daitekeen ezaugarri bat da: luzera, masa, edukiera, denbora, prezioa, ikasle kopurua, abiadura… Magnitudeak unitateetan adierazten dira: metroak, kilogramoak, litroak, euroak, km/h… eta magnitude bakoitzak kantitate asko izan ditzake: 1 metroko erregela, 2 kiloko kaxa, 95 km/h. Maitasuna, edertasuna edo barrea ez dira magnitudeak, ezin baitira zenbaki eta unitate batekin neurtu.',
            'Una magnitud es una característica de un objeto que se puede medir: longitud, masa, capacidad, tiempo, precio, número de alumnos, velocidad… Las magnitudes se expresan en unidades: metros, kilogramos, litros, euros, km/h… y cada magnitud puede tomar muchas cantidades: una regla de 1 metro, una caja de 2 kilos, 95 km/h. El cariño, la belleza o la risa no son magnitudes, porque no se pueden medir con un número y una unidad.',
            'المقدار صفة في شيء يمكن قياسها: الطول والكتلة والسعة والزمن والسعر وعدد التلاميذ والسرعة… وتُعبَّر المقادير بوحدات: الأمتار والكيلوغرامات واللترات واليورو وكم/س… ويمكن أن يأخذ كل مقدار كميات كثيرة: مسطرة طولها متر، وصندوق وزنه كيلوغرامان، و95 كم/س. أما المحبة والجمال والضحك فليست مقادير، لأنها لا تُقاس بعدد ووحدة.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Magnitudea', 'Magnitud', 'المقدار'), text: say('Neur daitekeena: luzera, masa, denbora, prezioa…', 'Lo que se puede medir: longitud, masa, tiempo, precio…', 'ما يمكن قياسه: الطول والكتلة والزمن والسعر…') },
            { title: say('Unitatea', 'Unidad', 'الوحدة'), text: say('Neurtzeko erabiltzen dena: m, kg, l, €, min…', 'Con lo que se mide: m, kg, l, €, min…', 'ما نقيس به: م، كغ، ل، €، د…') },
            { title: say('Kantitatea', 'Cantidad', 'الكمية'), text: say('Zenbakia eta unitatea: 2 kg, 5 l, 75 km.', 'Número y unidad: 2 kg, 5 l, 75 km.', 'عدد ووحدة: 2 كغ، 5 ل، 75 كم.') }
        ],
        example: same('$2$ kg · $1{,}50$ € · $95$ km/h'),
        takeaway: say('Magnitudea: neur daitekeena. Kantitatea: zenbakia + unitatea.', 'Magnitud: lo que se puede medir. Cantidad: número + unidad.', 'المقدار: ما يمكن قياسه. الكمية: عدد + وحدة.'),
        figure: (language) => <MagnitudesFigure language={language} />
    },
    {
        id: 'ratio',
        stage: 'ratios',
        title: say('Arrazoia', 'La razón', 'النسبة'),
        goal: say('Bi kantitateren arteko arrazoia idaztea eta haren balioa kalkulatzea.', 'Escribir la razón entre dos cantidades y calcular su valor.', 'كتابة النسبة بين كميتين وحساب قيمتها.'),
        explanation: say(
            'Eskolako jantokian ikasle bakoitzak 2 kroketa jaten ditu: 2 ikaslek 4, 3 ikaslek 6… Bi kantitateren arteko arrazoia haien zatidura da, $\\frac{a}{b}$: $a$ aurrekaria da eta $b$ ondorengoa. Ikasleen eta kroketen arteko arrazoiak $\\frac{1}{2}$, $\\frac{2}{4}$, $\\frac{3}{6}$… dira, eta denek balio bera dute: $0{,}5$. Ez nahastu zatikiarekin: zatiki batean bi gaiak zenbaki osoak dira; arrazoi batean hamartarrak ere izan daitezke, $\\frac{2{,}5}{4}$.',
            'En el comedor escolar cada alumno se come 2 croquetas: 2 alumnos, 4; 3 alumnos, 6… La razón entre dos cantidades es su cociente, $\\frac{a}{b}$: $a$ es el antecedente y $b$ el consecuente. Las razones entre alumnos y croquetas son $\\frac{1}{2}$, $\\frac{2}{4}$, $\\frac{3}{6}$… y todas valen lo mismo: $0{,}5$. No la confundas con una fracción: en una fracción los dos términos son números enteros; en una razón también pueden ser decimales, $\\frac{2{,}5}{4}$.',
            'في مطعم المدرسة يأكل كل تلميذ قطعتي كروكيت: تلميذان 4، وثلاثة تلاميذ 6… النسبة بين كميتين هي حاصل قسمتهما $\\frac{a}{b}$: $a$ هو المقدَّم و$b$ هو التالي. والنسب بين التلاميذ وقطع الكروكيت هي $\\frac{1}{2}$ و$\\frac{2}{4}$ و$\\frac{3}{6}$… وكلها تساوي $0{,}5$. لا تخلط بينها وبين الكسر: حدّا الكسر عددان صحيحان، أما في النسبة فقد يكونان عشريين $\\frac{2{,}5}{4}$.'
        ),
        problem: say('Zein da 6 kg pentsuren eta 10 behiren arteko arrazoia?', '¿Cuál es la razón entre 6 kg de pienso y 10 vacas?', 'ما النسبة بين 6 كغ من العلف و10 أبقار؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aurrekaria goian, ondorengoa behean.', 'El antecedente arriba, el consecuente abajo.', 'المقدَّم في الأعلى والتالي في الأسفل.'), math: same('$\\frac{6}{10}$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.'), math: same('$6\\mathbin{:}10=0{,}6$') }
        ],
        example: same('$\\frac{1}{2}=\\frac{2}{4}=\\frac{3}{6}=0{,}5$'),
        takeaway: say('Arrazoia: $\\frac{a}{b}$, zatidura bat.', 'Razón: $\\frac{a}{b}$, un cociente.', 'النسبة: $\\frac{a}{b}$، حاصل قسمة.'),
        figure: (language) => <RatioFigure language={language} />
    },
    {
        id: 'proportion',
        stage: 'ratios',
        title: say('Proportzioak', 'Proporciones', 'التناسبات'),
        goal: say('Proportzio bat ezagutzea eta falta den gaia gurutzeko biderkaduren bidez aurkitzea.', 'Reconocer una proporción y hallar el término que falta con los productos cruzados.', 'التعرّف إلى التناسب وإيجاد الحد الناقص بالضرب التبادلي.'),
        explanation: say(
            'Proportzioa bi arrazoiren berdintasuna da: $\\frac{a}{b}=\\frac{c}{d}$. $a$ eta $d$ muturrak dira, eta $b$ eta $c$ erdikoak. Proportzio batean muturren biderkadura eta erdikoen biderkadura berdinak dira: $a\\cdot d=b\\cdot c$, zatiki baliokideetan bezala. Horri esker, gai bat falta denean aurki daiteke: $\\frac{3}{6}=\\frac{7}{x}$ bada, $3\\cdot x=6\\cdot 7=42$, beraz $x=42\\mathbin{:}3=14$. Arrazoi berdinen serie batean, aurrekarien batura zati ondorengoen batura ere arrazoi bera da.',
            'Una proporción es la igualdad de dos razones: $\\frac{a}{b}=\\frac{c}{d}$. $a$ y $d$ son los extremos, y $b$ y $c$, los medios. En una proporción el producto de extremos es igual al producto de medios: $a\\cdot d=b\\cdot c$, como en las fracciones equivalentes. Así se puede hallar un término que falta: si $\\frac{3}{6}=\\frac{7}{x}$, entonces $3\\cdot x=6\\cdot 7=42$, y $x=42\\mathbin{:}3=14$. En una serie de razones iguales, la suma de los antecedentes entre la suma de los consecuentes también da la misma razón.',
            'التناسب تساوي نسبتين: $\\frac{a}{b}=\\frac{c}{d}$. $a$ و$d$ هما الطرفان، و$b$ و$c$ هما الوسطان. وفي التناسب حاصل ضرب الطرفين يساوي حاصل ضرب الوسطين: $a\\cdot d=b\\cdot c$، كما في الكسور المتكافئة. وهكذا يمكن إيجاد حد ناقص: إذا كان $\\frac{3}{6}=\\frac{7}{x}$ فإن $3\\cdot x=6\\cdot 7=42$ و$x=42\\mathbin{:}3=14$. وفي سلسلة نسب متساوية، مجموع المقدَّمات على مجموع التوالي يعطي النسبة نفسها.'
        ),
        problem: say('Aurkitu $x$: $\\frac{5}{x}=\\frac{15}{9}$.', 'Halla $x$: $\\frac{5}{x}=\\frac{15}{9}$.', 'أوجد $x$: $\\frac{5}{x}=\\frac{15}{9}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gurutzeko biderkadurak berdindu.', 'Iguala los productos cruzados.', 'ساوِ حاصلي الضرب التبادلي.'), math: same('$5\\cdot 9=15\\cdot x$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.'), math: same('$45=15\\cdot x$') },
            { text: say('Zatitu $x$ bakarrik geratzeko.', 'Divide para dejar $x$ sola.', 'اقسم ليبقى $x$ وحده.'), math: same('$x=45\\mathbin{:}15=3$') }
        ],
        example: same('$\\frac{1}{2}=\\frac{2}{4}\\ \\to\\ 1\\cdot 4=2\\cdot 2$'),
        takeaway: say('Proportzio batean: muturren biderkadura = erdikoen biderkadura.', 'En una proporción: producto de extremos = producto de medios.', 'في التناسب: حاصل ضرب الطرفين = حاصل ضرب الوسطين.'),
        figure: (language) => <ProportionFigure language={language} />
    },

    /* ---------- 2. Direct proportionality ---------- */
    {
        id: 'direct',
        stage: 'direct',
        title: say('Zuzenki proportzionalak diren magnitudeak', 'Magnitudes directamente proporcionales', 'المقادير المتناسبة طرديًا'),
        goal: say('Bi magnitude zuzenki proportzionalak diren jakitea eta proportzionaltasun-konstantea aurkitzea.', 'Saber si dos magnitudes son directamente proporcionales y hallar la constante de proporcionalidad.', 'معرفة هل المقداران متناسبان طرديًا وإيجاد ثابت التناسب.'),
        explanation: say(
            'Ukuilu batean, 6 kg pentsurekin 10 behi elikatzen dira; 12 kg-rekin, 20 behi; 18 kg-rekin, 30. Magnitude bat bikoiztean, hirukoiztean… bestea ere bikoiztu, hirukoiztu… egiten bada, eta erdia egitean bestea ere erdia, magnitudeak zuzenki proportzionalak dira. Taulan, edozein bi balio korrespondenteren arteko arrazoia beti bera da: $\\frac{6}{10}=\\frac{12}{20}=\\frac{18}{30}=0{,}6$, proportzionaltasun-konstantea. Kontuz: bat handitzean bestea handitzea ez da nahikoa; adina eta altuera ez dira proportzionalak.',
            'En un establo, con 6 kg de pienso se alimentan 10 vacas; con 12 kg, 20 vacas; con 18 kg, 30. Si al doblar, triplicar… una magnitud la otra también se dobla, se triplica…, y al hacer la mitad la otra también se hace la mitad, las magnitudes son directamente proporcionales. En la tabla, la razón entre dos valores correspondientes es siempre la misma: $\\frac{6}{10}=\\frac{12}{20}=\\frac{18}{30}=0{,}6$, la constante de proporcionalidad. Cuidado: no basta con que al crecer una crezca la otra; la edad y la altura no son proporcionales.',
            'في إسطبل تكفي 6 كغ من العلف لإطعام 10 أبقار، و12 كغ لـ20 بقرة، و18 كغ لـ30. إذا تضاعف أحد المقدارين مرتين أو ثلاثًا… فتضاعف الآخر كذلك، وإذا نُصِّف أحدهما نُصِّف الآخر، فهما متناسبان طرديًا. وفي الجدول تبقى النسبة بين أي قيمتين متقابلتين ثابتة: $\\frac{6}{10}=\\frac{12}{20}=\\frac{18}{30}=0{,}6$، وهي ثابت التناسب. انتبه: لا يكفي أن يزيد أحدهما حين يزيد الآخر؛ فالعمر والطول ليسا متناسبين.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Bikoitza → bikoitza', 'Doble → doble', 'الضعف ← الضعف'), text: say('Biak batera handitu edo txikitzen dira, proportzio berean.', 'Las dos crecen o decrecen a la vez, en la misma proporción.', 'يزيدان أو ينقصان معًا بالنسبة نفسها.') },
            { title: say('Konstantea', 'La constante', 'الثابت'), text: say('Arrazoi guztiek balio bera dute.', 'Todas las razones valen lo mismo.', 'كل النسب تساوي القيمة نفسها.'), math: same('$\\frac{6}{10}=\\frac{12}{20}=0{,}6$') },
            { title: say('Ez dira proportzionalak', 'No son proporcionales', 'ليسا متناسبين'), text: say('Botila 1: $3{,}50$ €; 2 botila: 6 €. Arrazoiak ez dira berdinak.', '1 botella: $3{,}50$ €; 2 botellas: 6 €. Las razones no son iguales.', 'زجاجة واحدة: $3{,}50$ €؛ زجاجتان: 6 €. النسبتان غير متساويتين.') }
        ],
        example: same('$\\frac{1}{2}=\\frac{2}{4}=\\frac{3}{6}=\\ldots=0{,}5$'),
        takeaway: say('Zuzena: bikoitza → bikoitza, eta arrazoia beti bera.', 'Directa: doble → doble, y la razón siempre igual.', 'طردي: الضعف ← الضعف، والنسبة ثابتة دائمًا.'),
        figure: (language) => <DirectTableFigure language={language} />
    },
    {
        id: 'direct-unit',
        stage: 'direct',
        title: say('Unitatera laburtzea', 'Reducción a la unidad', 'الإرجاع إلى الوحدة'),
        goal: say('Proportzionaltasun zuzeneko problemak unitate baten balioa kalkulatuz ebaztea.', 'Resolver problemas de proporcionalidad directa calculando el valor de una unidad.', 'حلّ مسائل التناسب الطردي بحساب قيمة الوحدة.'),
        explanation: say(
            'Hiru txokolatinek 90 gramo pisatzen dute. Zenbat pisatzen dute bik? Lehenik, kalkulatu zenbat pisatzen duen batek: $90\\mathbin{:}3=30$ gramo. Gero, biderkatu nahi duzun kopuruaz: $30\\cdot 2=60$ gramo. Hori da unitatera laburtzea: zatitu unitate baten balioa lortzeko, eta biderkatu. Zuzenean proportzionalak diren magnitudeetan beti balio du: kanguru batek 4 jauzitan 12 metro egiten ditu; jauzi batean $12\\mathbin{:}4=3$ m, eta 10 jauzitan $3\\cdot 10=30$ m.',
            'Tres chocolatinas pesan 90 gramos. ¿Cuánto pesan dos? Primero calcula cuánto pesa una: $90\\mathbin{:}3=30$ gramos. Después multiplica por la cantidad que quieras: $30\\cdot 2=60$ gramos. Eso es la reducción a la unidad: divide para obtener el valor de una unidad, y multiplica. Siempre funciona con magnitudes directamente proporcionales: un canguro avanza 12 metros en 4 saltos; en un salto, $12\\mathbin{:}4=3$ m, y en 10 saltos, $3\\cdot 10=30$ m.',
            'تزن ثلاث قطع شوكولاتة 90 غرامًا. كم تزن قطعتان؟ احسب أولًا وزن القطعة الواحدة: $90\\mathbin{:}3=30$ غرامًا. ثم اضرب في الكمية التي تريدها: $30\\cdot 2=60$ غرامًا. هذا هو الإرجاع إلى الوحدة: اقسم لتحصل على قيمة الوحدة ثم اضرب. وهو ينجح دائمًا مع المقادير المتناسبة طرديًا: يقطع كنغر 12 مترًا في 4 قفزات؛ ففي القفزة الواحدة $12\\mathbin{:}4=3$ م، وفي 10 قفزات $3\\cdot 10=30$ م.'
        ),
        problem: say('Bi kilo laranjak $1{,}50$ € balio dute. Zenbat balio dute 5 kilok?', 'Dos kilos de naranjas cuestan $1{,}50$ €. ¿Cuánto cuestan 5 kilos?', 'ثمن كيلوغرامين من البرتقال $1{,}50$ €. كم ثمن 5 كيلوغرامات؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kilo batek:', 'Un kilo:', 'الكيلو الواحد:'), math: same('$1{,}50\\mathbin{:}2=0{,}75$') },
            { text: say('Bost kilok:', 'Cinco kilos:', 'خمسة كيلوغرامات:'), math: same('$0{,}75\\cdot 5=3{,}75$') }
        ],
        example: same('$90\\mathbin{:}3=30\\ \\to\\ 30\\cdot 2=60$'),
        takeaway: say('Lehenik bat (zatitu), gero nahi direnak (biderkatu).', 'Primero uno (divide), luego los que quieras (multiplica).', 'أولًا الواحد (اقسم)، ثم ما تريد (اضرب).'),
        figure: (language) => <UnitReductionFigure language={language} />
    },
    {
        id: 'rule-of-three',
        stage: 'direct',
        title: say('Hiruko erregela zuzena', 'La regla de tres directa', 'قاعدة الثلاثة الطردية'),
        goal: say('Proportzionaltasun zuzeneko problemak proportzio baten bidez ebaztea.', 'Resolver problemas de proporcionalidad directa con una proporción.', 'حلّ مسائل التناسب الطردي بتناسب.'),
        explanation: say(
            '3 errotulagailuk 6 € balio badute, zenbat balio dute 7k? Hiru kantitate ezagutzen ditugu eta laugarren bat, $x$, falta zaigu. Magnitudeak zuzenki proportzionalak dira (errotulagailu gehiago, diru gehiago), beraz arrazoiak berdinak dira: $\\frac{3}{6}=\\frac{7}{x}$. Gurutzeko biderkadurekin: $3\\cdot x=7\\cdot 6=42$, eta $x=42\\mathbin{:}3=14$ €. Idatzi beti magnitude bakoitza bere zutabean, unitate berarekin.',
            'Si 3 rotuladores cuestan 6 €, ¿cuánto cuestan 7? Conocemos tres cantidades y nos falta una cuarta, $x$. Las magnitudes son directamente proporcionales (más rotuladores, más dinero), así que las razones son iguales: $\\frac{3}{6}=\\frac{7}{x}$. Con los productos cruzados: $3\\cdot x=7\\cdot 6=42$, y $x=42\\mathbin{:}3=14$ €. Escribe siempre cada magnitud en su columna, con la misma unidad.',
            'إذا كان ثمن 3 أقلام تلوين 6 €، فكم ثمن 7؟ نعرف ثلاث كميات وتنقصنا رابعة $x$. المقداران متناسبان طرديًا (أقلام أكثر، مال أكثر)، فالنسبتان متساويتان: $\\frac{3}{6}=\\frac{7}{x}$. وبالضرب التبادلي: $3\\cdot x=7\\cdot 6=42$، و$x=42\\mathbin{:}3=14$ €. اكتب دائمًا كل مقدار في عموده وبالوحدة نفسها.'
        ),
        problem: say('Txirrindulari batek 75 km egiten ditu 2 ordutan. Abiadura berean, zenbat km 5 ordutan?', 'Un ciclista recorre 75 km en 2 horas. A la misma velocidad, ¿cuántos km en 5 horas?', 'يقطع دراج 75 كم في ساعتين. بالسرعة نفسها، كم كيلومترًا في 5 ساعات؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioa: ordu gehiago, km gehiago.', 'La proporción: más horas, más km.', 'التناسب: ساعات أكثر، كيلومترات أكثر.'), math: same('$\\frac{2}{75}=\\frac{5}{x}$') },
            { text: say('Gurutzeko biderkadurak.', 'Productos cruzados.', 'الضرب التبادلي.'), math: same('$2\\cdot x=5\\cdot 75=375$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.'), math: same('$x=375\\mathbin{:}2=187{,}5$') }
        ],
        example: same('$\\frac{3}{6}=\\frac{7}{x}\\ \\to\\ x=\\frac{7\\cdot 6}{3}=14$'),
        takeaway: say('Zuzena: $\\frac{a}{b}=\\frac{c}{x}$, eta $x=\\frac{b\\cdot c}{a}$.', 'Directa: $\\frac{a}{b}=\\frac{c}{x}$, y $x=\\frac{b\\cdot c}{a}$.', 'الطردي: $\\frac{a}{b}=\\frac{c}{x}$، و$x=\\frac{b\\cdot c}{a}$.'),
        figure: (language) => <RuleOfThreeFigure language={language} />
    },

    /* ---------- 3. Inverse proportionality ---------- */
    {
        id: 'inverse',
        stage: 'inverse',
        title: say('Alderantziz proportzionalak diren magnitudeak', 'Magnitudes inversamente proporcionales', 'المقادير المتناسبة عكسيًا'),
        goal: say('Bi magnitude alderantziz proportzionalak diren jakitea: biderkadura konstantea.', 'Saber si dos magnitudes son inversamente proporcionales: el producto constante.', 'معرفة هل المقداران متناسبان عكسيًا: حاصل الضرب الثابت.'),
        explanation: say(
            'Txorrota batek minutuko 3 litro botatzen ditu eta 15 minututan betetzen du upel bat. Emaria bikoiztuz gero, 6 l/min, 7,5 minututan beteko du; hirukoiztuz gero, 9 l/min, 5 minututan. Magnitude bat bikoiztean bestea erdia egiten bada, hirukoiztean herena…, magnitudeak alderantziz proportzionalak dira. Kasu horretan arrazoiak ez dira berdinak, baina bi balio korrespondenteren biderkadura beti bera da: $3\\cdot 15=6\\cdot 7{,}5=9\\cdot 5=45$ litro, upelaren edukiera.',
            'Un grifo vierte 3 litros por minuto y llena un tonel en 15 minutos. Si se dobla el caudal, 6 l/min, lo llena en 7,5 minutos; si se triplica, 9 l/min, en 5 minutos. Si al doblar una magnitud la otra se reduce a la mitad, al triplicarla a la tercera parte…, las magnitudes son inversamente proporcionales. En ese caso las razones no son iguales, pero el producto de dos valores correspondientes es siempre el mismo: $3\\cdot 15=6\\cdot 7{,}5=9\\cdot 5=45$ litros, la capacidad del tonel.',
            'يصبّ صنبور 3 لترات في الدقيقة ويملأ برميلًا في 15 دقيقة. فإذا ضاعفنا التدفق إلى 6 ل/د ملأه في 7.5 دقائق، وإذا جعلناه ثلاثة أضعاف 9 ل/د ملأه في 5 دقائق. إذا تضاعف أحد المقدارين فنقص الآخر إلى النصف، وإذا صار ثلاثة أضعاف صار الآخر الثلث…، فالمقداران متناسبان عكسيًا. وفي هذه الحالة لا تتساوى النسب، لكن حاصل ضرب كل قيمتين متقابلتين ثابت: $3\\cdot 15=6\\cdot 7{,}5=9\\cdot 5=45$ لترًا، وهي سعة البرميل.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Bikoitza → erdia', 'Doble → mitad', 'الضعف ← النصف'), text: say('Bat handitzean bestea txikitzen da, proportzio berean.', 'Al crecer una, la otra decrece en la misma proporción.', 'حين يزيد أحدهما ينقص الآخر بالنسبة نفسها.') },
            { title: say('Biderkadura konstantea', 'Producto constante', 'حاصل ضرب ثابت'), text: say('Bi balio korrespondenteren biderkadura ez da aldatzen.', 'El producto de dos valores correspondientes no cambia.', 'لا يتغيّر حاصل ضرب القيمتين المتقابلتين.'), math: same('$3\\cdot 15=9\\cdot 5=45$') },
            { title: say('Adibideak', 'Ejemplos', 'أمثلة'), text: say('Langileak eta denbora; abiadura eta denbora; txorrotak eta betetzeko denbora.', 'Obreros y tiempo; velocidad y tiempo; grifos y tiempo de llenado.', 'العمال والزمن؛ السرعة والزمن؛ الصنابير وزمن الملء.') }
        ],
        example: same('$1\\cdot 20=2\\cdot 10=4\\cdot 5=5\\cdot 4=20$'),
        takeaway: say('Alderantzizkoa: bikoitza → erdia, eta biderkadura beti bera.', 'Inversa: doble → mitad, y el producto siempre igual.', 'العكسي: الضعف ← النصف، وحاصل الضرب ثابت دائمًا.'),
        figure: (language) => <InverseTableFigure language={language} />
    },
    {
        id: 'inverse-unit',
        stage: 'inverse',
        title: say('Unitatera laburtzea alderantzizkoan', 'Reducción a la unidad en la inversa', 'الإرجاع إلى الوحدة في التناسب العكسي'),
        goal: say('Alderantzizko problemak unitatera laburtuz ebaztea: lehenik biderkatu, gero zatitu.', 'Resolver problemas inversos reduciendo a la unidad: primero multiplica, luego divide.', 'حلّ المسائل العكسية بالإرجاع إلى الوحدة: اضرب أولًا ثم اقسم.'),
        explanation: say(
            'Bi margolarik horma bat 9 ordutan margotzen dute. Zenbat behar dute hiruk? Langile bakarrak denbora gehiago behar du: bikoitza, $9\\cdot 2=18$ ordu. Hiru langilek, berriz, horren herena: $18\\mathbin{:}3=6$ ordu. Alderantzizkoan, unitatera laburtzean biderkatu egiten da (bat bakarrik, denbora gehiago) eta gero zatitu (gehiago, denbora gutxiago). Proportzionaltasun zuzenean ez bezala!',
            'Dos pintores pintan una pared en 9 horas. ¿Cuánto tardan tres? Un solo pintor tarda más: el doble, $9\\cdot 2=18$ horas. Tres pintores tardan la tercera parte: $18\\mathbin{:}3=6$ horas. En la inversa, al reducir a la unidad se multiplica (uno solo, más tiempo) y después se divide (más pintores, menos tiempo). ¡Justo al revés que en la directa!',
            'يدهن رسّامان جدارًا في 9 ساعات. كم يحتاج ثلاثة رسّامين؟ الرسّام الواحد يحتاج وقتًا أطول: الضعف، $9\\cdot 2=18$ ساعة. والثلاثة يحتاجون الثلث: $18\\mathbin{:}3=6$ ساعات. في التناسب العكسي نضرب عند الإرجاع إلى الوحدة (واحد فقط، وقت أطول) ثم نقسم (عدد أكبر، وقت أقصر). عكس التناسب الطردي تمامًا!'
        ),
        problem: say('Belar-zama batek 3 zaldi elikatzen ditu 6 egunez. Zenbat egunez elikatuko lituzke 2 zaldi?', 'Una carga de heno alimenta a 3 caballos durante 6 días. ¿Cuántos días alimentaría a 2 caballos?', 'حمولة تبن تطعم 3 خيول 6 أيام. كم يومًا تطعم حصانين؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zaldi bakarrari:', 'A un solo caballo:', 'لحصان واحد:'), math: same('$6\\cdot 3=18$') },
            { text: say('Bi zaldiri:', 'A dos caballos:', 'لحصانين:'), math: same('$18\\mathbin{:}2=9$') }
        ],
        example: same('$9\\cdot 2=18\\ \\to\\ 18\\mathbin{:}3=6$'),
        takeaway: say('Alderantzizkoan: bat bakarra lortzeko biderkatu, gero zatitu.', 'En la inversa: multiplica para obtener uno solo, después divide.', 'في العكسي: اضرب لتحصل على الواحد ثم اقسم.'),
        figure: (language) => <InverseUnitFigure language={language} />
    },
    {
        id: 'inverse-rule',
        stage: 'inverse',
        title: say('Hiruko erregela alderantzizkoa', 'La regla de tres inversa', 'قاعدة الثلاثة العكسية'),
        goal: say('Alderantzizko problemak biderkadurak berdinduz ebaztea.', 'Resolver problemas inversos igualando los productos.', 'حلّ المسائل العكسية بمساواة حاصلي الضرب.'),
        explanation: say(
            '10 igeltseruk 45 egunetan eraikitzen dute horma bat. 15 egunetan amaitu nahi bada, zenbat igeltsero behar dira? Magnitudeak alderantziz proportzionalak dira (egun gutxiago, igeltsero gehiago), beraz biderkadurak berdinak dira: $10\\cdot 45=x\\cdot 15$. Hortik, $450=15\\cdot x$ eta $x=450\\mathbin{:}15=30$ igeltsero. Lehenik, galdetu beti: bat handitzean, bestea handitu ala txikitu egiten da?',
            '10 albañiles construyen un muro en 45 días. Si se quiere terminar en 15 días, ¿cuántos albañiles hacen falta? Las magnitudes son inversamente proporcionales (menos días, más albañiles), así que los productos son iguales: $10\\cdot 45=x\\cdot 15$. De ahí, $450=15\\cdot x$ y $x=450\\mathbin{:}15=30$ albañiles. Pregúntate siempre primero: al crecer una, ¿la otra crece o decrece?',
            'يبني 10 بنّائين جدارًا في 45 يومًا. إذا أردنا إنهاءه في 15 يومًا فكم بنّاءً نحتاج؟ المقداران متناسبان عكسيًا (أيام أقل، بنّاؤون أكثر)، فحاصلا الضرب متساويان: $10\\cdot 45=x\\cdot 15$. ومنه $450=15\\cdot x$ و$x=450\\mathbin{:}15=30$ بنّاءً. اسأل نفسك دائمًا أولًا: حين يزيد أحدهما، هل يزيد الآخر أم ينقص؟'
        ),
        problem: say('Ibiltari batek 30 minutu behar ditu ibilbide bat egiteko 4 km/h-ko abiaduran. Zenbat minutu beharko ditu txirrindulari batek 15 km/h-ra?', 'Un paseante tarda 30 minutos en un recorrido a 4 km/h. ¿Cuántos minutos tardará un ciclista a 15 km/h?', 'يقطع ماشٍ مسارًا في 30 دقيقة بسرعة 4 كم/س. كم دقيقة يحتاج دراج بسرعة 15 كم/س؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Abiadura gehiago, denbora gutxiago: alderantzizkoa.', 'Más velocidad, menos tiempo: inversa.', 'سرعة أكبر، زمن أقل: عكسي.'), math: same('$4\\cdot 30=15\\cdot x$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.'), math: same('$120=15\\cdot x$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.'), math: same('$x=120\\mathbin{:}15=8$') }
        ],
        example: same('$25\\cdot 18=45\\cdot x\\ \\to\\ x=450\\mathbin{:}45=10$'),
        takeaway: say('Alderantzizkoa: $a\\cdot b=c\\cdot x$, eta $x=\\frac{a\\cdot b}{c}$.', 'Inversa: $a\\cdot b=c\\cdot x$, y $x=\\frac{a\\cdot b}{c}$.', 'العكسي: $a\\cdot b=c\\cdot x$، و$x=\\frac{a\\cdot b}{c}$.'),
        figure: (language) => <InverseRuleFigure language={language} />
    },

    /* ---------- 4. Percentages ---------- */
    {
        id: 'percent-meaning',
        stage: 'percent',
        title: say('Ehunekoaren esanahia', 'Qué es un porcentaje', 'معنى النسبة المئوية'),
        goal: say('Ehuneko bat zatiki, hamartar eta «100etik» gisa idaztea.', 'Escribir un porcentaje como fracción, como decimal y como «de cada 100».', 'كتابة النسبة المئوية كسرًا وعددًا عشريًا و«من كل 100».'),
        explanation: say(
            '«Taldeak partiden % 85 irabazi ditu»: 100 partidatik 85 irabazi dituela esan nahi du. Ehuneko bat 100eko kantitate bati dagokion zatia da: % 85 = $\\frac{85}{100}=0{,}85$. Ehuneko bakoitza zatiki eta hamartar gisa idatz daiteke: % 9 = $\\frac{9}{100}=0{,}09$; % 50 erdia da, $\\frac{1}{2}$; % 25 laurdena, $\\frac{1}{4}$; % 10 hamarrena, $\\frac{1}{10}$. Osoa % 100 da: % 70 ardiak badira, gainerakoak, % 30, ahuntzak dira.',
            '«El equipo ganó el 85 % de los partidos»: quiere decir que ganó 85 de cada 100. Un porcentaje es la parte que corresponde a una cantidad de 100: 85 % = $\\frac{85}{100}=0{,}85$. Cada porcentaje se puede escribir como fracción y como decimal: 9 % = $\\frac{9}{100}=0{,}09$; el 50 % es la mitad, $\\frac{1}{2}$; el 25 %, la cuarta parte, $\\frac{1}{4}$; el 10 %, la décima parte, $\\frac{1}{10}$. El total es el 100 %: si el 70 % son ovejas, el resto, el 30 %, son cabras.',
            '«فاز الفريق بـ 85٪ من المباريات»: أي فاز بـ 85 من كل 100. النسبة المئوية هي الجزء المقابل لكمية قدرها 100: 85٪ = $\\frac{85}{100}=0{,}85$. ويمكن كتابة كل نسبة مئوية كسرًا وعددًا عشريًا: 9٪ = $\\frac{9}{100}=0{,}09$؛ و50٪ هي النصف $\\frac{1}{2}$؛ و25٪ الربع $\\frac{1}{4}$؛ و10٪ العُشر $\\frac{1}{10}$. والكل هو 100٪: إذا كانت 70٪ نعاجًا فالباقي، 30٪، ماعز.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Zatikia', 'Fracción', 'كسر'), text: say('Izendatzailea 100.', 'Denominador 100.', 'المقام 100.'), math: same('$\\frac{38}{100}$') },
            { title: say('Hamartarra', 'Decimal', 'عدد عشري'), text: say('Zati 100: koma bi toki ezkerrera.', 'Entre 100: la coma dos lugares a la izquierda.', 'القسمة على 100: الفاصلة منزلتين يسارًا.'), math: same('$0{,}38$') },
            { title: say('Ezagunak', 'Los conocidos', 'المعروفة'), text: say('% 50 erdia, % 25 laurdena, % 75 hiru laurden, % 10 hamarrena.', '50 % la mitad, 25 % la cuarta parte, 75 % tres cuartos, 10 % la décima parte.', '50٪ النصف، 25٪ الربع، 75٪ ثلاثة أرباع، 10٪ العُشر.'), math: same('$\\frac{1}{2}\\qquad\\frac{1}{4}\\qquad\\frac{3}{4}\\qquad\\frac{1}{10}$') }
        ],
        example: same('$\\frac{85}{100}=0{,}85\\qquad\\frac{9}{100}=0{,}09\\qquad\\frac{3}{4}=\\frac{75}{100}=0{,}75$'),
        takeaway: say('Ehunekoa: 100etik zenbat. Zatiki gisa, izendatzailea 100.', 'Porcentaje: cuántos de cada 100. Como fracción, denominador 100.', 'النسبة المئوية: كم من كل 100. وكسرًا، المقام 100.'),
        figure: (language) => <PercentGridFigure language={language} />
    },
    {
        id: 'percent-of',
        stage: 'percent',
        title: say('Kantitate baten ehunekoa', 'El porcentaje de una cantidad', 'النسبة المئوية من كمية'),
        goal: say('Kantitate baten ehuneko bat kalkulatzea.', 'Calcular un porcentaje de una cantidad.', 'حساب نسبة مئوية من كمية.'),
        explanation: say(
            'Enrikek 60 €-ko zapatilak erosi ditu % 15eko beherapenarekin. Zenbat euro deskontatu dizkiote? Ehuneko bat zatikia da, $\\frac{15}{100}$, beraz kantitatearen zatiki bat bezala kalkulatzen da: biderkatu ehunekoaz eta zatitu 100ez, $60\\cdot 15\\mathbin{:}100=900\\mathbin{:}100=9$ €; edo zatitu 100ez eta biderkatu, $60\\mathbin{:}100\\cdot 15=0{,}6\\cdot 15=9$ €. Buruz: % 10 = zati 10, % 50 = erdia, % 25 = laurdena.',
            'Enrique ha comprado unas zapatillas de 60 € con un descuento del 15 %. ¿Cuántos euros le han descontado? Un porcentaje es una fracción, $\\frac{15}{100}$, así que se calcula como la fracción de una cantidad: multiplica por el tanto y divide entre 100, $60\\cdot 15\\mathbin{:}100=900\\mathbin{:}100=9$ €; o divide entre 100 y multiplica, $60\\mathbin{:}100\\cdot 15=0{,}6\\cdot 15=9$ €. De cabeza: el 10 % es dividir entre 10, el 50 %, la mitad, y el 25 %, la cuarta parte.',
            'اشترى إنريكي حذاءً رياضيًا ثمنه 60 € بخصم 15٪. كم يورو خُصم له؟ النسبة المئوية كسر $\\frac{15}{100}$، فتُحسب ككسر من كمية: اضرب في النسبة واقسم على 100، $60\\cdot 15\\mathbin{:}100=900\\mathbin{:}100=9$ €؛ أو اقسم على 100 ثم اضرب، $60\\mathbin{:}100\\cdot 15=0{,}6\\cdot 15=9$ €. ذهنيًا: 10٪ قسمة على 10، و50٪ النصف، و25٪ الربع.'
        ),
        problem: say('Nire klasean 30 ikasle daude eta % 40 jantokian geratzen dira. Zenbat dira?', 'En mi clase hay 30 alumnos y el 40 % se queda al comedor. ¿Cuántos son?', 'في صفي 30 تلميذًا، يبقى 40٪ منهم في المطعم. كم عددهم؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu ehunekoaz.', 'Multiplica por el tanto.', 'اضرب في النسبة.'), math: same('$30\\cdot 40=1200$') },
            { text: say('Zatitu 100ez.', 'Divide entre 100.', 'اقسم على 100.'), math: same('$1200\\mathbin{:}100=12$') }
        ],
        example: same('$\\frac{15}{100}\\cdot 60=9\\qquad\\frac{25}{100}\\cdot 400=100$'),
        takeaway: say('Kantitate baten % $p$: kantitatea · $p$ : 100.', 'El $p$ % de una cantidad: cantidad · $p$ : 100.', '$p$٪ من كمية: الكمية · $p$ : 100.'),
        figure: (language) => <PercentOfFigure language={language} />
    },
    {
        id: 'which-percent',
        stage: 'percent',
        title: say('Zer ehuneko da? Eta osoa?', '¿Qué porcentaje es? ¿Y el total?', 'ما النسبة؟ وما الكل؟'),
        goal: say('Zati batek osoaren zer ehuneko den eta ehuneko batetik osoa kalkulatzea.', 'Calcular qué porcentaje es una parte y el total a partir de un porcentaje.', 'حساب النسبة المئوية لجزء، والكل انطلاقًا من نسبة مئوية.'),
        explanation: say(
            '480 ardiko artaldean 120 ilea moztuta daude. Zer ehuneko da? Zatia zati osoa da, $\\frac{120}{480}=0{,}25$, eta bider 100: % 25. Proportzio gisa ere bai: 480tik 120 badira, 100etik $x$: $\\frac{480}{120}=\\frac{100}{x}$. Alderantzizko galdera: erlezain batek 54 erlauntzetako eztia atera du, erlategiaren % 30. Zenbat erlauntza ditu? % 30 54 bada, % 1 $54\\mathbin{:}30=1{,}8$ da, eta % 100 $1{,}8\\cdot 100=180$ erlauntza.',
            'En un rebaño de 480 ovejas se han esquilado 120. ¿Qué porcentaje es? La parte entre el total, $\\frac{120}{480}=0{,}25$, y por 100: el 25 %. También con una proporción: si de 480 son 120, de 100 son $x$: $\\frac{480}{120}=\\frac{100}{x}$. La pregunta al revés: un apicultor ha sacado la miel de 54 colmenas, el 30 % del colmenar. ¿Cuántas colmenas tiene? Si el 30 % son 54, el 1 % es $54\\mathbin{:}30=1{,}8$, y el 100 %, $1{,}8\\cdot 100=180$ colmenas.',
            'في قطيع من 480 نعجة جُزّ صوف 120 منها. ما النسبة المئوية؟ الجزء على الكل $\\frac{120}{480}=0{,}25$، وفي 100: 25٪. ويمكن بتناسب أيضًا: إذا كان من 480 مئة وعشرون، فمن 100 يكون $x$: $\\frac{480}{120}=\\frac{100}{x}$. والسؤال المعكوس: استخرج نحّال عسل 54 خلية، وهي 30٪ من المنحل. كم خلية عنده؟ إذا كانت 30٪ تساوي 54، فإن 1٪ يساوي $54\\mathbin{:}30=1{,}8$، و100٪ يساوي $1{,}8\\cdot 100=180$ خلية.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Zer ehuneko', 'Qué porcentaje', 'أي نسبة'), text: say('Zatia : osoa, bider 100.', 'Parte : total, por 100.', 'الجزء : الكل، في 100.'), math: same('$120\\mathbin{:}480\\cdot 100=25$') },
            { title: say('Osoa', 'El total', 'الكل'), text: say('Zatia : ehunekoa, bider 100.', 'Parte : porcentaje, por 100.', 'الجزء : النسبة، في 100.'), math: same('$54\\mathbin{:}30\\cdot 100=180$') }
        ],
        example: same('$\\frac{120}{480}=0{,}25\\qquad 54\\mathbin{:}30\\cdot 100=180$'),
        takeaway: say('Ehunekoa = zatia : osoa · 100. Osoa = zatia : ehunekoa · 100.', 'Porcentaje = parte : total · 100. Total = parte : porcentaje · 100.', 'النسبة = الجزء : الكل · 100. الكل = الجزء : النسبة · 100.'),
        figure: (language) => <WhichPercentFigure language={language} />
    },

    /* ---------- 5. Increases, discounts and problems ---------- */
    {
        id: 'discount',
        stage: 'changes',
        title: say('Beherapenak', 'Descuentos', 'التخفيضات'),
        goal: say('Ehuneko beherapen baten ondorengo prezioa kalkulatzea.', 'Calcular el precio después de un descuento porcentual.', 'حساب السعر بعد تخفيض بنسبة مئوية.'),
        explanation: say(
            'Enrikeren zapatilek 60 € balio zuten eta % 15 deskontatu diote: 9 €. Zenbat ordaindu du? Kendu deskontua prezioari: $60-9=51$ €. Bide laburrago bat ere badago: % 15 deskontatzen badute, % 85 ordaintzen da, $100-15=85$, eta $60\\cdot 0{,}85=51$ €. Kontuz: % 15eko beherapena ez da 15 € kentzea; prezioaren % 15 da.',
            'Las zapatillas de Enrique valían 60 € y le han descontado el 15 %: 9 €. ¿Cuánto ha pagado? Resta el descuento al precio: $60-9=51$ €. Hay un camino más corto: si descuentan el 15 %, se paga el 85 %, $100-15=85$, y $60\\cdot 0{,}85=51$ €. Cuidado: un descuento del 15 % no es quitar 15 €; es el 15 % del precio.',
            'كان ثمن حذاء إنريكي 60 € وخُصم منه 15٪: أي 9 €. كم دفع؟ اطرح الخصم من السعر: $60-9=51$ €. وهناك طريق أقصر: إذا خُصم 15٪ فإنك تدفع 85٪، $100-15=85$، و$60\\cdot 0{,}85=51$ €. انتبه: خصم 15٪ لا يعني طرح 15 €؛ بل هو 15٪ من السعر.'
        ),
        problem: say('Beroki batek 80 € balio du eta % 10 merkatu dute. Zenbat ordainduko dut?', 'Un abrigo cuesta 80 € y lo rebajan un 10 %. ¿Cuánto pagaré?', 'ثمن معطف 80 € وخُفّض 10٪. كم سأدفع؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Beherapena:', 'El descuento:', 'الخصم:'), math: same('$80\\cdot 10\\mathbin{:}100=8$') },
            { text: say('Prezio berria:', 'El precio nuevo:', 'السعر الجديد:'), math: same('$80-8=72$') }
        ],
        example: same('$60-9=51\\qquad 60\\cdot 0{,}85=51$'),
        takeaway: say('Beherapena: prezioa − prezioaren % $p$; edo prezioa · $(100-p)$ : 100.', 'Descuento: precio − el $p$ % del precio; o precio · $(100-p)$ : 100.', 'التخفيض: السعر − $p$٪ من السعر؛ أو السعر · $(100-p)$ : 100.'),
        figure: (language) => <DiscountFigure language={language} />
    },
    {
        id: 'increase',
        stage: 'changes',
        title: say('Igoerak eta errekarguak', 'Aumentos y recargos', 'الزيادات والرسوم الإضافية'),
        goal: say('Ehuneko igoera baten ondorengo kantitatea kalkulatzea.', 'Calcular la cantidad después de un aumento porcentual.', 'حساب الكمية بعد زيادة بنسبة مئوية.'),
        explanation: say(
            'Udalak % 15eko errekargua jartzen die berandu ordaintzen diren isunei. 75 €-ko isun batengatik, errekargua $75\\cdot 15\\mathbin{:}100=11{,}25$ € da, eta guztira $75+11{,}25=86{,}25$ € ordaintzen dira. Bide laburragoa: % 15 igotzean % 115 ordaintzen da, $75\\cdot 1{,}15=86{,}25$ €. Igoeretan gehitu egiten da; beherapenetan, kendu.',
            'El Ayuntamiento pone un recargo del 15 % a las multas pagadas con retraso. Por una multa de 75 €, el recargo es $75\\cdot 15\\mathbin{:}100=11{,}25$ €, y en total se pagan $75+11{,}25=86{,}25$ €. Camino corto: al subir un 15 % se paga el 115 %, $75\\cdot 1{,}15=86{,}25$ €. En los aumentos se suma; en los descuentos, se resta.',
            'تفرض البلدية رسمًا إضافيًا قدره 15٪ على المخالفات المدفوعة متأخرة. عن مخالفة قيمتها 75 € يكون الرسم $75\\cdot 15\\mathbin{:}100=11{,}25$ €، ويُدفع في المجموع $75+11{,}25=86{,}25$ €. والطريق الأقصر: عند الزيادة 15٪ تدفع 115٪، $75\\cdot 1{,}15=86{,}25$ €. في الزيادات نجمع، وفي التخفيضات نطرح.'
        ),
        problem: say('Bizikleta batek 200 € balio zuen eta % 5 garestitu da. Zenbat balio du orain?', 'Una bici costaba 200 € y ha subido un 5 %. ¿Cuánto cuesta ahora?', 'كان ثمن دراجة 200 € وارتفع 5٪. كم ثمنها الآن؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Igoera:', 'La subida:', 'الزيادة:'), math: same('$200\\cdot 5\\mathbin{:}100=10$') },
            { text: say('Prezio berria:', 'El precio nuevo:', 'السعر الجديد:'), math: same('$200+10=210$') }
        ],
        example: same('$75+11{,}25=86{,}25\\qquad 75\\cdot 1{,}15=86{,}25$'),
        takeaway: say('Igoera: kantitatea + kantitatearen % $p$; edo kantitatea · $(100+p)$ : 100.', 'Aumento: cantidad + el $p$ % de la cantidad; o cantidad · $(100+p)$ : 100.', 'الزيادة: الكمية + $p$٪ منها؛ أو الكمية · $(100+p)$ : 100.'),
        figure: (language) => <IncreaseFigure language={language} />
    },
    {
        id: 'problems',
        stage: 'changes',
        title: say('Zein metodo? Problemak', '¿Qué método? Problemas', 'أي طريقة؟ مسائل'),
        goal: say('Problema batean proportzionaltasun zuzena, alderantzizkoa edo ehunekoak diren ezagutzea eta ebaztea.', 'Reconocer si un problema es de proporcionalidad directa, inversa o de porcentajes, y resolverlo.', 'تمييز ما إذا كانت المسألة تناسبًا طرديًا أو عكسيًا أو نسبًا مئوية، وحلّها.'),
        explanation: say(
            'Problema bat ebatzi aurretik, aurkitu bi magnitudeak eta galdetu: bata handitzean, bestea handitu egiten da proportzio berean? Zuzena: zatitu eta biderkatu (edo $\\frac{a}{b}=\\frac{c}{x}$). Bestea txikitu egiten da? Alderantzizkoa: biderkatu eta zatitu (edo $a\\cdot b=c\\cdot x$). Ez bata ez bestea? Ez dira proportzionalak, eta ezin da hiruko erregela erabili. «%» agertzen bada, ehunekoak: zatia, osoa ala aldaketa?',
            'Antes de resolver un problema, busca las dos magnitudes y pregúntate: al crecer una, ¿la otra crece en la misma proporción? Directa: divide y multiplica (o $\\frac{a}{b}=\\frac{c}{x}$). ¿La otra decrece? Inversa: multiplica y divide (o $a\\cdot b=c\\cdot x$). ¿Ni una cosa ni otra? No son proporcionales y no sirve la regla de tres. Si aparece «%», porcentajes: ¿la parte, el total o un cambio?',
            'قبل حلّ المسألة حدّد المقدارين واسأل: حين يزيد أحدهما، هل يزيد الآخر بالنسبة نفسها؟ طردي: اقسم واضرب (أو $\\frac{a}{b}=\\frac{c}{x}$). هل ينقص الآخر؟ عكسي: اضرب واقسم (أو $a\\cdot b=c\\cdot x$). لا هذا ولا ذاك؟ ليسا متناسبين ولا تصلح قاعدة الثلاثة. وإذا ظهر «٪» فهي نسب مئوية: الجزء أم الكل أم تغيّر؟'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Gehiago → gehiago', 'Más → más', 'أكثر ← أكثر'), text: say('Zuzena: errotulagailuak eta prezioa, orduak eta km.', 'Directa: rotuladores y precio, horas y km.', 'طردي: الأقلام والسعر، الساعات والكيلومترات.') },
            { title: say('Gehiago → gutxiago', 'Más → menos', 'أكثر ← أقل'), text: say('Alderantzizkoa: langileak eta egunak, abiadura eta denbora.', 'Inversa: obreros y días, velocidad y tiempo.', 'عكسي: العمال والأيام، السرعة والزمن.') },
            { title: say('Ez proportzionala', 'No proporcional', 'غير متناسب'), text: say('Adina eta altuera; sarreraren prezioa eta filmaren iraupena.', 'Edad y altura; precio de la entrada y duración de la película.', 'العمر والطول؛ سعر التذكرة ومدة الفيلم.') }
        ],
        example: same('$\\frac{3}{6}=\\frac{7}{x}\\qquad 10\\cdot 45=15\\cdot x\\qquad\\frac{40}{100}\\cdot 30$'),
        takeaway: say('Lehenik erabaki: zuzena, alderantzizkoa, ehunekoa ala ez proportzionala.', 'Primero decide: directa, inversa, porcentaje o no proporcional.', 'قرّر أولًا: طردي أم عكسي أم نسبة مئوية أم غير متناسب.'),
        figure: (language) => <ChooseMethodFigure language={language} />
    }
]

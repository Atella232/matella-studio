import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    BetweenFigure,
    ColumnAddFigure,
    CompareDigitsFigure,
    DecimalFractionFigure,
    DecimalUnitsFigure,
    DivideDecimalFigure,
    DivideNaturalFigure,
    DivisionKindsFigure,
    MultiplyFigure,
    PlaceTableFigure,
    RoundingFigure,
    SameValueFigure,
    ShiftFigure,
    ShoppingFigure,
    ZoomLineFigure
} from './figures'

/* ==========================================================================
   Zenbaki hamartarrak · 1. DBH — stages and lessons. Sequence follows the
   class textbook (Santillana 1.º ESO, unit 4, curricular adaptation):
   tenths, hundredths and thousandths, place value and reading, comparing
   and the number line, decimal fractions and the fraction as a division,
   adding and subtracting in columns, multiplying, multiplying and
   dividing by 10, 100, 1000, and the three cases of division. Anaya
   (unit 5) adds numbers in between, rounding, combined operations and the
   shopping problems.
   ========================================================================== */

export type DecimalsStageId = 'structure' | 'order' | 'fractions' | 'operations' | 'division'

export const decimalsStages: UnitStage[] = [
    { id: 'structure', tone: 'blue', title: { eu: 'Zenbaki hamartarren egitura', es: 'La estructura de los decimales', en: 'The structure of decimals', ar: 'بنية الأعداد العشرية' } },
    { id: 'order', tone: 'violet', title: { eu: 'Ordena eta zuzena', es: 'Orden y recta', en: 'Order and number line', ar: 'الترتيب والمستقيم' } },
    { id: 'fractions', tone: 'mustard', title: { eu: 'Zatikiak eta biribiltzea', es: 'Fracciones y redondeo', en: 'Fractions and rounding', ar: 'الكسور والتقريب' } },
    { id: 'operations', tone: 'coral', title: { eu: 'Batu, kendu eta biderkatu', es: 'Sumar, restar y multiplicar', en: 'Add, subtract and multiply', ar: 'الجمع والطرح والضرب' } },
    { id: 'division', tone: 'green', title: { eu: 'Zatiketak eta problemak', es: 'Divisiones y problemas', en: 'Divisions and problems', ar: 'القسمة والمسائل' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const decimalsTopics: UnitTopic[] = [
    /* ---------- 1. Structure ---------- */
    {
        id: 'decimal-units',
        stage: 'structure',
        title: say('Hamarrenak, ehunenak eta milarenak', 'Décimas, centésimas y milésimas', 'الأعشار والأجزاء من مئة والأجزاء من ألف', 'Tenths, hundredths and thousandths'),
        goal: say('Unitate hamartarrak ezagutzea eta haien arteko baliokidetasunak erabiltzea.', 'Conocer las unidades decimales y usar las equivalencias entre ellas.', 'التعرّف إلى الوحدات العشرية واستعمال التكافؤ بينها.', 'Know the decimal units and convert between them.'),
        explanation: say(
            'Gure zenbaki-sistema hamartarra da: maila bateko 10 unitatek hurrengo mailako unitate bat osatzen dute. Unitatea baino zati txikiagoak behar ditugunean, unitatea 10 zati berdinetan banatzen dugu: zati bakoitza hamarren bat da, $0{,}1$. Hamarren bat 10 zatitan banatuz gero, ehunen bat lortzen da, $0{,}01$; eta ehunen bat 10 zatitan banatuz gero, milaren bat, $0{,}001$. Horregatik, 1 unitate = 10 hamarren = 100 ehunen = 1000 milaren.',
            'Nuestro sistema de numeración es decimal: 10 unidades de un orden forman 1 unidad del orden siguiente. Cuando necesitamos partes más pequeñas que la unidad, la dividimos en 10 partes iguales: cada parte es una décima, $0{,}1$. Si dividimos una décima en 10 partes, obtenemos una centésima, $0{,}01$; y si dividimos una centésima en 10, una milésima, $0{,}001$. Por eso, 1 unidad = 10 décimas = 100 centésimas = 1000 milésimas.',
            'نظام العدّ عندنا عشري: كل 10 وحدات من رتبة تكوّن وحدة واحدة من الرتبة التالية. وحين نحتاج أجزاء أصغر من الوحدة نقسمها إلى 10 أجزاء متساوية: كل جزء عُشر، $0{,}1$. وإذا قسمنا العُشر إلى 10 أجزاء حصلنا على جزء من مئة، $0{,}01$؛ وإذا قسمنا الجزء من مئة إلى 10 حصلنا على جزء من ألف، $0{,}001$. لذلك: وحدة واحدة = 10 أعشار = 100 جزء من مئة = 1000 جزء من ألف.', 'Our number system is decimal: 10 units of one place make 1 unit of the next place to the left. When we need parts smaller than one unit, we divide it into 10 equal parts: each part is a tenth, $0{,}1$. If we divide a tenth into 10 parts, we get a hundredth, $0{,}01$; and if we divide a hundredth into 10, a thousandth, $0{,}001$. So, 1 unit = 10 tenths = 100 hundredths = 1000 thousandths.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Hamarrena', 'La décima', 'العُشر', 'The tenth'), text: say('Unitatea 10 zati berdinetan.', 'La unidad en 10 partes iguales.', 'الوحدة مقسومة إلى 10 أجزاء متساوية.', 'The unit split into 10 equal parts.'), math: same('$\\frac{1}{10}=0{,}1$') },
            { title: say('Ehunena', 'La centésima', 'الجزء من مئة', 'The hundredth'), text: say('Unitatea 100 zati berdinetan.', 'La unidad en 100 partes iguales.', 'الوحدة مقسومة إلى 100 جزء متساوٍ.', 'The unit split into 100 equal parts.'), math: same('$\\frac{1}{100}=0{,}01$') },
            { title: say('Milarena', 'La milésima', 'الجزء من ألف', 'The thousandth'), text: say('Unitatea 1000 zati berdinetan.', 'La unidad en 1000 partes iguales.', 'الوحدة مقسومة إلى 1000 جزء متساوٍ.', 'The unit split into 1000 equal parts.'), math: same('$\\frac{1}{1000}=0{,}001$') },
            { title: say('Hamarna bider', 'De diez en diez', 'عشرةً عشرة', 'In tens'), text: say('Maila bakoitzak hurrengoaren 10 balio ditu: 3 hamarren = 30 ehunen = 300 milaren.', 'Cada orden vale 10 del siguiente: 3 décimas = 30 centésimas = 300 milésimas.', 'كل رتبة تساوي 10 من الرتبة التي تليها: 3 أعشار = 30 جزءًا من مئة = 300 جزء من ألف.', 'Each place is worth 10 of the next one: 3 tenths = 30 hundredths = 300 thousandths.') }
        ],
        example: same('$1=10\\cdot 0{,}1=100\\cdot 0{,}01=1000\\cdot 0{,}001$'),
        takeaway: say('1 unitate = 10 hamarren = 100 ehunen = 1000 milaren.', '1 unidad = 10 décimas = 100 centésimas = 1000 milésimas.', 'الوحدة = 10 أعشار = 100 جزء من مئة = 1000 جزء من ألف.', '1 unit = 10 tenths = 100 hundredths = 1000 thousandths.'),
        figure: (language) => <DecimalUnitsFigure language={language} />
    },
    {
        id: 'place-value',
        stage: 'structure',
        title: say('Zati osoa, zati hamartarra eta posizioa', 'Parte entera, parte decimal y posición', 'الجزء الصحيح والجزء العشري والمنزلة', 'Whole part, decimal part and place value'),
        goal: say('Zenbaki hamartar baten zifra bakoitzaren balioa jakitea eta zenbakia deskonposatzea.', 'Saber el valor de cada cifra de un número decimal y descomponerlo.', 'معرفة قيمة كل رقم في عدد عشري وتفكيكه.', 'Know the value of each digit in a decimal and break it into parts.'),
        explanation: say(
            'Zenbaki hamartar batek bi zati ditu, koma batez bereizita: ezkerrean zati osoa (unitateak, hamarrekoak, ehunekoak…) eta eskuinean zati hamartarra (hamarrenak, ehunenak, milarenak…). Sistema posizionala da: zifra baten balioa haren tokiaren araberakoa da. $43{,}07$ zenbakian, 7 zazpi ehunen da, $0{,}07$; $37{,}98$ zenbakian, berriz, zazpi unitate. Zenbaki bat deskonposatzeko, idatzi zifra bakoitzaren balioa eta batu: $430{,}581=400+30+0{,}5+0{,}08+0{,}001$.',
            'Un número decimal tiene dos partes separadas por una coma: a la izquierda, la parte entera (unidades, decenas, centenas…), y a la derecha, la parte decimal (décimas, centésimas, milésimas…). El sistema es posicional: el valor de una cifra depende del lugar que ocupa. En $43{,}07$, el 7 vale siete centésimas, $0{,}07$; en cambio, en $37{,}98$ vale siete unidades. Para descomponer un número, escribe el valor de cada cifra y súmalos: $430{,}581=400+30+0{,}5+0{,}08+0{,}001$.',
            'للعدد العشري جزآن تفصل بينهما فاصلة: على اليسار الجزء الصحيح (الآحاد والعشرات والمئات…)، وعلى اليمين الجزء العشري (الأعشار والأجزاء من مئة والأجزاء من ألف…). النظام موضعي: قيمة الرقم تتوقف على منزلته. في $43{,}07$ يساوي الرقم 7 سبعة أجزاء من مئة، $0{,}07$؛ أما في $37{,}98$ فيساوي سبع وحدات. ولتفكيك عدد اكتب قيمة كل رقم واجمعها: $430{,}581=400+30+0{,}5+0{,}08+0{,}001$.', 'A decimal number has two parts separated by a decimal point: on the left, the whole part (units, tens, hundreds…), and on the right, the decimal part (tenths, hundredths, thousandths…). Our system is a place-value system: the value of a digit depends on the place it is in. In $43{,}07$, the 7 is worth seven hundredths, $0{,}07$; but in $37{,}98$ it is worth seven units. To break a number down, write the value of each digit and add them: $430{,}581=400+30+0{,}5+0{,}08+0{,}001$.'
        ),
        problem: say('Zenbat balio du 5 zifrak $52{,}347$ zenbakian? Eta 4ak?', '¿Cuánto vale la cifra 5 en $52{,}347$? ¿Y el 4?', 'كم قيمة الرقم 5 في $52{,}347$؟ وكم قيمة الرقم 4؟', 'What is the value of the digit 5 in $52{,}347$? And the 4?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kokatu zifra bakoitza taulan: D U , h e m.', 'Coloca cada cifra en la tabla: D U , d c m.', 'ضع كل رقم في الجدول: عشرات، آحاد، فاصلة، أعشار، أجزاء من مئة، أجزاء من ألف.', 'Place each digit in the table: T U . t h th.'), math: same('$5\\;2\\;,\\;3\\;4\\;7$') },
            { text: say('5a hamarrekoen tokian dago.', 'El 5 está en las decenas.', 'الرقم 5 في منزلة العشرات.', 'The 5 is in the tens.'), math: same('$5\\cdot 10=50$') },
            { text: say('4a ehunenen tokian dago.', 'El 4 está en las centésimas.', 'الرقم 4 في منزلة الأجزاء من مئة.', 'The 4 is in the hundredths.'), math: same('$4\\cdot 0{,}01=0{,}04$') }
        ],
        example: same('$52{,}347=50+2+0{,}3+0{,}04+0{,}007$'),
        takeaway: say('Zifra baten balioa: zifra bider bere tokiaren balioa.', 'El valor de una cifra: la cifra por el valor de su lugar.', 'قيمة الرقم: الرقم مضروبًا في قيمة منزلته.', 'The value of a digit: the digit times the value of its place.'),
        figure: (language) => <PlaceTableFigure language={language} />
    },
    {
        id: 'read-write',
        stage: 'structure',
        title: say('Hamartarrak irakurri eta idatzi', 'Leer y escribir decimales', 'قراءة الأعداد العشرية وكتابتها', 'Reading and writing decimals'),
        goal: say('Zenbaki hamartarrak hitzez irakurtzea, zifraz idaztea eta eskuineko zeroak ulertzea.', 'Leer decimales con palabras, escribirlos con cifras y entender los ceros a la derecha.', 'قراءة الأعداد العشرية بالكلمات وكتابتها بالأرقام وفهم الأصفار على اليمين.', 'Read decimals in words, write them in digits and understand zeros on the right.'),
        explanation: say(
            'Hamartar bat irakurtzeko, esan zati osoa unitatetan eta, ondoren, zati hamartarra azken zifraren unitatean: $12{,}56$ «hamabi unitate eta berrogeita hamasei ehunen» da; $5{,}004$, «bost unitate eta lau milaren». Zifraz idaztean, begiratu azken unitateari: «hamaika milaren» $0{,}011$ da, hiru zifra hamartarrekin. Eskuinean zeroak gehitzeak ez du balioa aldatzen, $11{,}8=11{,}80=11{,}800$, baina erdian dagoen zero bat ezin da kendu: $1{,}06\\neq 1{,}6$.',
            'Para leer un decimal, di la parte entera en unidades y después la parte decimal en la unidad de su última cifra: $12{,}56$ es «doce unidades y cincuenta y seis centésimas»; $5{,}004$, «cinco unidades y cuatro milésimas». Al escribirlo con cifras, fíjate en la última unidad: «once milésimas» es $0{,}011$, con tres cifras decimales. Añadir ceros a la derecha no cambia el valor, $11{,}8=11{,}80=11{,}800$, pero un cero en medio no se puede quitar: $1{,}06\\neq 1{,}6$.',
            'لقراءة عدد عشري اذكر الجزء الصحيح بالوحدات ثم الجزء العشري بوحدة آخر رقم فيه: $12{,}56$ هو «اثنتا عشرة وحدة وستة وخمسون جزءًا من مئة»، و$5{,}004$ هو «خمس وحدات وأربعة أجزاء من ألف». وعند كتابته بالأرقام انتبه إلى آخر وحدة: «أحد عشر جزءًا من ألف» هو $0{,}011$ بثلاثة أرقام عشرية. إضافة أصفار على اليمين لا تغيّر القيمة، $11{,}8=11{,}80=11{,}800$، لكن الصفر الذي في الوسط لا يُحذف: $1{,}06\\neq 1{,}6$.', 'To read a decimal, say the whole part in units and then the decimal part in the unit of its last digit: $12{,}56$ is “twelve units and fifty-six hundredths”; $5{,}004$, “five units and four thousandths”. When writing it in digits, look at the last unit: “eleven thousandths” is $0{,}011$, with three decimal places. Adding zeros on the right does not change the value, $11{,}8=11{,}80=11{,}800$, but a zero in the middle cannot be removed: $1{,}06\\neq 1{,}6$.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Irakurri', 'Leer', 'القراءة', 'Read'), text: say('Zati osoa unitatetan, zati hamartarra azken zifraren unitatean.', 'Parte entera en unidades, parte decimal en la unidad de la última cifra.', 'الجزء الصحيح بالوحدات، والجزء العشري بوحدة آخر رقم.', 'Whole part in units, decimal part in the unit of the last digit.'), math: same('$3{,}27$') },
            { title: say('Idatzi', 'Escribir', 'الكتابة', 'Write'), text: say('Hamarrenak: zifra bat; ehunenak: bi; milarenak: hiru.', 'Décimas: una cifra; centésimas: dos; milésimas: tres.', 'الأعشار: رقم واحد؛ الأجزاء من مئة: رقمان؛ الأجزاء من ألف: ثلاثة أرقام.', 'Tenths: one digit; hundredths: two; thousandths: three.'), math: same('$0{,}5\\qquad 0{,}15\\qquad 0{,}114$') },
            { title: say('Eskuineko zeroak', 'Ceros a la derecha', 'الأصفار على اليمين', 'Zeros on the right'), text: say('Ez dute balioa aldatzen.', 'No cambian el valor.', 'لا تغيّر القيمة.', 'They do not change the value.'), math: same('$0{,}3=0{,}30=0{,}300$') }
        ],
        example: same('$0{,}3=\\frac{3}{10}=\\frac{30}{100}$'),
        takeaway: say('Azken zifraren tokiak esaten du nola irakurri: hamarrenak, ehunenak edo milarenak.', 'El lugar de la última cifra dice cómo se lee: décimas, centésimas o milésimas.', 'منزلة آخر رقم تحدّد القراءة: أعشار أو أجزاء من مئة أو أجزاء من ألف.', 'The place of the last digit shows how to read it: tenths, hundredths or thousandths.'),
        figure: (language) => <SameValueFigure language={language} />
    },

    /* ---------- 2. Order and the number line ---------- */
    {
        id: 'compare',
        stage: 'order',
        title: say('Hamartarrak konparatu eta ordenatu', 'Comparar y ordenar decimales', 'مقارنة الأعداد العشرية وترتيبها', 'Comparing and ordering decimals'),
        goal: say('Bi hamartarretatik zein den handiagoa jakitea eta hamartar zerrendak ordenatzea.', 'Saber cuál de dos decimales es mayor y ordenar listas de decimales.', 'معرفة الأكبر من عددين عشريين وترتيب قوائم من الأعداد العشرية.', 'Know which of two decimals is bigger and order lists of decimals.'),
        explanation: say(
            'Gorputz Hezkuntzako jaurtiketa-proban, Albertok $2{,}95$ m lortu ditu, Anak $3{,}16$ m eta Elenak $3{,}17$ m. Nork jaurti du urrunen? Lehenik zati osoa begiratzen da: handiena duena da handiena, $2<3$. Zati osoak berdinak badira, zati hamartarrak alderatzen dira zifraz zifra, hamarrenetatik hasita: $3{,}16$ eta $3{,}17$ zenbakietan hamarrenak berdinak dira, eta ehunenetan $7>6$. Beraz, $3{,}17>3{,}16>2{,}95$. Kontuz: zifra gehiago izateak ez du esan nahi handiagoa denik: $0{,}5>0{,}355$.',
            'En la prueba de lanzamiento de peso de Educación Física, Alberto ha lanzado $2{,}95$ m, Ana $3{,}16$ m y Elena $3{,}17$ m. ¿Quién ha lanzado más lejos? Primero se mira la parte entera: es mayor el que tiene la mayor, $2<3$. Si las partes enteras son iguales, se comparan las partes decimales cifra a cifra, empezando por las décimas: en $3{,}16$ y $3{,}17$ las décimas coinciden, y en las centésimas $7>6$. Por tanto, $3{,}17>3{,}16>2{,}95$. Cuidado: tener más cifras no significa ser mayor: $0{,}5>0{,}355$.',
            'في اختبار رمي الجُلّة في التربية البدنية رمى ألبرتو $2{,}95$ م، وآنا $3{,}16$ م، وإيلينا $3{,}17$ م. من رمى أبعد؟ ننظر أولًا إلى الجزء الصحيح: الأكبر صاحب الجزء الصحيح الأكبر، $2<3$. وإذا تساوى الجزآن الصحيحان نقارن الجزأين العشريين رقمًا رقمًا بدءًا بالأعشار: في $3{,}16$ و$3{,}17$ تتساوى الأعشار، وفي الأجزاء من مئة $7>6$. إذن $3{,}17>3{,}16>2{,}95$. انتبه: كثرة الأرقام لا تعني أن العدد أكبر: $0{,}5>0{,}355$.', 'In the shot put test in PE, Alberto threw $2{,}95$ m, Ana $3{,}16$ m and Elena $3{,}17$ m. Who threw the farthest? First compare the whole parts: the bigger whole part means the bigger number, $2<3$. If the whole parts are equal, compare the decimal parts digit by digit, starting with the tenths: in $3{,}16$ and $3{,}17$ the tenths are the same, and in the hundredths $7>6$. So, $3{,}17>3{,}16>2{,}95$. Be careful: having more digits does not make a number bigger: $0{,}5>0{,}355$.'
        ),
        problem: say('Ordenatu txikienetik handienera: $2{,}3$; $2{,}03$; $2{,}303$; $2{,}033$.', 'Ordena de menor a mayor: $2{,}3$; $2{,}03$; $2{,}303$; $2{,}033$.', 'رتّب من الأصغر إلى الأكبر: $2{,}3$؛ $2{,}03$؛ $2{,}303$؛ $2{,}033$.', 'Order from smallest to largest: $2{,}3$; $2{,}03$; $2{,}303$; $2{,}033$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati osoa berdina da guztietan: 2.', 'La parte entera es igual en todos: 2.', 'الجزء الصحيح متساوٍ في جميعها: 2.', 'The whole part is the same in all of them: 2.') },
            { text: say('Idatzi denak zifra hamartar kopuru berarekin.', 'Escríbelos todos con el mismo número de cifras decimales.', 'اكتبها كلها بالعدد نفسه من الأرقام العشرية.', 'Write them all with the same number of decimal places.'), math: same('$2{,}300\\quad 2{,}030\\quad 2{,}303\\quad 2{,}033$') },
            { text: say('Konparatu komarik gabe: 2030 < 2033 < 2300 < 2303.', 'Compara sin la coma: 2030 < 2033 < 2300 < 2303.', 'قارن بلا فاصلة: 2030 < 2033 < 2300 < 2303.', 'Compare without the decimal point: 2030 < 2033 < 2300 < 2303.'), math: same('$2{,}03<2{,}033<2{,}3<2{,}303$') }
        ],
        example: same('$13{,}56<13{,}65\\qquad 11{,}8=11{,}80\\qquad 0{,}355>0{,}35$'),
        takeaway: say('Lehenik zati osoa; gero hamarrenak, ehunenak, milarenak… ordenan.', 'Primero la parte entera; después décimas, centésimas, milésimas… por orden.', 'أولًا الجزء الصحيح؛ ثم الأعشار فالأجزاء من مئة فالأجزاء من ألف بالترتيب.', 'First the whole part; then tenths, hundredths, thousandths… in order.'),
        figure: (language) => <CompareDigitsFigure language={language} />
    },
    {
        id: 'line',
        stage: 'order',
        title: say('Hamartarrak zenbaki-zuzenean', 'Los decimales en la recta', 'الأعداد العشرية على المستقيم', 'Decimals on the number line'),
        goal: say('Hamartarrak zenbaki-zuzenean kokatzea eta zuzeneko puntu baten balioa irakurtzea.', 'Situar decimales en la recta numérica y leer el valor de un punto de la recta.', 'وضع الأعداد العشرية على خط الأعداد وقراءة قيمة نقطة عليه.', 'Place decimals on the number line and read the value of a point on the line.'),
        explanation: say(
            '$2{,}35$ zuzenean kokatzeko, lehenik bilatu zein bi unitateren artean dagoen: 2 eta 3. Banatu tarte hori 10 zatitan: marka bakoitza hamarren bat da, $2{,}1$, $2{,}2$, $2{,}3$… $2{,}35$ zenbakia $2{,}3$ eta $2{,}4$ artean dago. Handitu tarte hori eta banatu berriro 10 zatitan: orain marka bakoitza ehunen bat da, eta $2{,}35$ erdian dago. Zuzenean, ezkerrean dagoena beti da txikiagoa.',
            'Para situar $2{,}35$ en la recta, busca primero entre qué dos unidades está: entre 2 y 3. Divide ese tramo en 10 partes: cada marca es una décima, $2{,}1$, $2{,}2$, $2{,}3$… El $2{,}35$ está entre $2{,}3$ y $2{,}4$. Amplía ese tramo y divídelo otra vez en 10 partes: ahora cada marca es una centésima, y $2{,}35$ está justo en el medio. En la recta, el que está más a la izquierda siempre es menor.',
            'لوضع $2{,}35$ على المستقيم ابحث أولًا بين أي وحدتين يقع: بين 2 و3. قسّم هذه القطعة إلى 10 أجزاء: كل علامة عُشر، $2{,}1$ و$2{,}2$ و$2{,}3$… ويقع $2{,}35$ بين $2{,}3$ و$2{,}4$. كبّر هذه القطعة وقسّمها مرة أخرى إلى 10 أجزاء: صارت كل علامة جزءًا من مئة، و$2{,}35$ في المنتصف تمامًا. وعلى المستقيم، العدد الواقع إلى اليسار أصغر دائمًا.', 'To place $2{,}35$ on the number line, first find which two whole numbers it is between: 2 and 3. Divide that interval into 10 parts: each mark is a tenth, $2{,}1$, $2{,}2$, $2{,}3$… $2{,}35$ is between $2{,}3$ and $2{,}4$. Zoom in on that interval and divide it into 10 parts again: now each mark is a hundredth, and $2{,}35$ is exactly in the middle. On the number line, the number further to the left is always smaller.'
        ),
        problem: say('Zein zenbaki dago zuzenean, $6{,}3$ eta $6{,}4$ artean, laugarren markan, tartea 10 zatitan banatuta?', '¿Qué número está en la recta entre $6{,}3$ y $6{,}4$, en la cuarta marca, si el tramo está dividido en 10 partes?', 'ما العدد الواقع على المستقيم بين $6{,}3$ و$6{,}4$ عند العلامة الرابعة إذا قُسمت القطعة إلى 10 أجزاء؟', 'Which number is on the number line between $6{,}3$ and $6{,}4$, at the fourth mark, if the interval is divided into 10 parts?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Tartea hamarren bat da; 10 zatitan, marka bakoitza ehunen bat.', 'El tramo es una décima; en 10 partes, cada marca es una centésima.', 'القطعة عُشر واحد؛ وبتقسيمها إلى 10 أجزاء تصبح كل علامة جزءًا من مئة.', 'The interval is one tenth; split into 10 parts, each mark is a hundredth.'), math: same('$0{,}1\\mathbin{:}10=0{,}01$') },
            { text: say('Lau marka aurrera $6{,}3$-tik.', 'Avanza cuatro marcas desde $6{,}3$.', 'تقدّم أربع علامات من $6{,}3$.', 'Move four marks on from $6{,}3$.'), math: same('$6{,}3+4\\cdot 0{,}01=6{,}34$') }
        ],
        example: same('$2{,}3<2{,}35<2{,}4$'),
        takeaway: say('Tartea 10 zatitan: hamarrenak; berriro 10 zatitan: ehunenak.', 'El tramo en 10 partes: décimas; otra vez en 10: centésimas.', 'القطعة في 10 أجزاء: أعشار؛ ومرة أخرى في 10: أجزاء من مئة.', 'The interval split into 10 parts: tenths; split again into 10: hundredths.'),
        figure: (language) => <ZoomLineFigure language={language} />
    },
    {
        id: 'between',
        stage: 'order',
        title: say('Bi hamartarren arteko zenbakiak', 'Números entre dos decimales', 'أعداد بين عددين عشريين', 'Numbers between two decimals'),
        goal: say('Bi hamartarren artean beste hamartar bat tartekatzea eta erdiko puntua aurkitzea.', 'Intercalar un decimal entre otros dos y hallar el punto medio.', 'إدراج عدد عشري بين عددين آخرين وإيجاد نقطة المنتصف.', 'Insert a decimal between two others and find the midpoint.'),
        explanation: say(
            'Bi zenbaki oso jarraituren artean ez dago beste zenbaki osorik, baina bi hamartarren artean beti daude beste hamartar asko. $1{,}3$ eta $1{,}4$ artean zenbaki bat idazteko, gehitu zero bat bakoitzari, $1{,}30$ eta $1{,}40$, eta hartu bien arteko edozein: $1{,}35$, $1{,}31$, $1{,}39$… Tartea txikiegia bada, gehitu beste zero bat: $0{,}523$ eta $0{,}524$ artean dago $0{,}5235$. Bi zenbakiren erdian dagoena aurkitzeko, batu eta zatitu 2z: $(1{,}8+1{,}9)\\mathbin{:}2=1{,}85$.',
            'Entre dos números enteros consecutivos no hay ningún otro entero, pero entre dos decimales siempre hay muchísimos decimales. Para escribir un número entre $1{,}3$ y $1{,}4$, añade un cero a cada uno, $1{,}30$ y $1{,}40$, y toma cualquiera entre ellos: $1{,}35$, $1{,}31$, $1{,}39$… Si el tramo es muy pequeño, añade otro cero: entre $0{,}523$ y $0{,}524$ está $0{,}5235$. Para hallar el que está justo en medio de dos números, súmalos y divide entre 2: $(1{,}8+1{,}9)\\mathbin{:}2=1{,}85$.',
            'لا يوجد عدد صحيح بين عددين صحيحين متتاليين، لكن بين عددين عشريين توجد دائمًا أعداد عشرية كثيرة جدًا. لكتابة عدد بين $1{,}3$ و$1{,}4$ أضف صفرًا إلى كل منهما، $1{,}30$ و$1{,}40$، وخذ أي عدد بينهما: $1{,}35$ أو $1{,}31$ أو $1{,}39$… وإذا كانت القطعة صغيرة جدًا فأضف صفرًا آخر: بين $0{,}523$ و$0{,}524$ يقع $0{,}5235$. ولإيجاد العدد الواقع في منتصف عددين اجمعهما واقسم على 2: $(1{,}8+1{,}9)\\mathbin{:}2=1{,}85$.', 'Between two consecutive integers there is no other integer, but between any two decimals there are always lots more decimals. To write a number between $1{,}3$ and $1{,}4$, add a zero to each, $1{,}30$ and $1{,}40$, and pick any one of the numbers in between: $1{,}35$, $1{,}31$, $1{,}39$… If the interval is very small, add another zero: between $0{,}523$ and $0{,}524$ there is $0{,}5235$. To find the number exactly in the middle of two numbers, add them and divide by 2: $(1{,}8+1{,}9)\\mathbin{:}2=1{,}85$.'
        ),
        problem: say('Tartekatu hiru zenbaki $2{,}7$ eta $2{,}8$ artean, tarte berdinetan.', 'Intercala tres números entre $2{,}7$ y $2{,}8$, a intervalos iguales.', 'أدرج ثلاثة أعداد بين $2{,}7$ و$2{,}8$ على مسافات متساوية.', 'Insert three numbers between $2{,}7$ and $2{,}8$, at equal intervals.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru zenbakik lau tarte egiten dituzte: zatitu $0{,}1$ 4z.', 'Tres números hacen cuatro tramos: divide $0{,}1$ entre 4.', 'ثلاثة أعداد تصنع أربع قطع: اقسم $0{,}1$ على 4.', 'Three numbers make four intervals: divide $0{,}1$ by 4.'), math: same('$0{,}1\\mathbin{:}4=0{,}025$') },
            { text: say('Batu $0{,}025$ behin eta berriz.', 'Suma $0{,}025$ una y otra vez.', 'اجمع $0{,}025$ مرة بعد مرة.', 'Add $0{,}025$ over and over.'), math: same('$2{,}725\\quad 2{,}75\\quad 2{,}775$') }
        ],
        example: same('$4{,}8<4{,}83<4{,}86\\qquad (4+5)\\mathbin{:}2=4{,}5$'),
        takeaway: say('Bi hamartarren artean beti daude beste hamartar batzuk: gehitu zeroak eta aukeratu.', 'Entre dos decimales siempre hay otros: añade ceros y elige.', 'بين عددين عشريين توجد دائمًا أعداد أخرى: أضف أصفارًا واختر.', 'Between two decimals there are always others: add zeros and choose one.'),
        figure: (language) => <BetweenFigure language={language} />
    },

    /* ---------- 3. Fractions and rounding ---------- */
    {
        id: 'decimal-fraction',
        stage: 'fractions',
        title: say('Zatiki hamartarrak', 'Fracciones decimales', 'الكسور العشرية', 'Decimal fractions'),
        goal: say('Hamartar bat zatiki hamartar gisa idaztea eta alderantziz.', 'Escribir un decimal como fracción decimal y al revés.', 'كتابة عدد عشري كسرًا عشريًا والعكس.', 'Write a decimal as a decimal fraction and the other way round.'),
        explanation: say(
            'Zatiki hamartarra izendatzailea 10, 100, 1000… duen zatikia da. Hamartar bat zatiki hamartar bihurtzeko, idatzi zenbakia komarik gabe zenbakitzailean, eta izendatzailean bat eta komaren eskuinean dauden zifrak adina zero: $45{,}78=\\frac{4578}{100}$, bi zifra hamartar, bi zero. Alderantziz, zatiki hamartar batetik hamartarra lortzeko, idatzi zenbakitzailea eta jarri koma izendatzaileak zero dituen adina toki ezkerrerago: $\\frac{398}{100}=3{,}98$.',
            'Una fracción decimal es la que tiene por denominador 10, 100, 1000… Para pasar un decimal a fracción decimal, escribe el número sin la coma en el numerador, y en el denominador la unidad seguida de tantos ceros como cifras haya a la derecha de la coma: $45{,}78=\\frac{4578}{100}$, dos cifras decimales, dos ceros. Al revés, para pasar de fracción decimal a decimal, escribe el numerador y pon la coma tantos lugares a la izquierda como ceros tenga el denominador: $\\frac{398}{100}=3{,}98$.',
            'الكسر العشري كسر مقامه 10 أو 100 أو 1000… ولتحويل عدد عشري إلى كسر عشري اكتب العدد بلا فاصلة في البسط، واكتب في المقام واحدًا تتبعه أصفار بعدد الأرقام الواقعة يمين الفاصلة: $45{,}78=\\frac{4578}{100}$، رقمان عشريان وصفران. وبالعكس، لتحويل كسر عشري إلى عدد عشري اكتب البسط وضع الفاصلة إلى اليسار بعدد أصفار المقام: $\\frac{398}{100}=3{,}98$.', 'A decimal fraction is one whose denominator is 10, 100, 1000… To change a decimal into a decimal fraction, write the number without the decimal point as the numerator, and as the denominator write a 1 followed by as many zeros as there are decimal places: $45{,}78=\\frac{4578}{100}$. Two decimal places, two zeros. The other way round, to change a decimal fraction into a decimal, write the numerator and put the decimal point as many places to the left as the denominator has zeros: $\\frac{398}{100}=3{,}98$.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Hamartarretik zatikira', 'De decimal a fracción', 'من العشري إلى الكسر', 'From decimal to fraction'), text: say('Zifra hamartar adina zero izendatzailean.', 'Tantos ceros en el denominador como cifras decimales.', 'أصفار في المقام بعدد الأرقام العشرية.', 'As many zeros in the denominator as decimal places.'), math: same('$15{,}379=\\frac{15379}{1000}$') },
            { title: say('Zatikitik hamartarrera', 'De fracción a decimal', 'من الكسر إلى العشري', 'From fraction to decimal'), text: say('Koma ezkerrera, izendatzailearen zero adina toki.', 'La coma a la izquierda, tantos lugares como ceros.', 'الفاصلة إلى اليسار بعدد الأصفار.', 'The decimal point moves left, as many places as zeros.'), math: same('$\\frac{24}{10}=2{,}4\\qquad\\frac{6}{1000}=0{,}006$') },
            { title: say('Zeroak betetzeko', 'Ceros de relleno', 'أصفار للتعبئة', 'Padding zeros'), text: say('Zifra nahikorik ez badago, jarri zeroak komaren ondoren.', 'Si no hay cifras suficientes, pon ceros tras la coma.', 'إذا لم تكفِ الأرقام فضع أصفارًا بعد الفاصلة.', 'If there are not enough digits, put zeros after the decimal point.'), math: same('$\\frac{35}{1000}=0{,}035$') }
        ],
        example: same('$0{,}75=\\frac{75}{100}\\qquad 2{,}801=\\frac{2801}{1000}$'),
        takeaway: say('Zifra hamartar bakoitzeko, zero bat izendatzailean.', 'Por cada cifra decimal, un cero en el denominador.', 'لكل رقم عشري صفر في المقام.', 'For each decimal place, one zero in the denominator.'),
        figure: (language) => <DecimalFractionFigure language={language} />
    },
    {
        id: 'fraction-division',
        stage: 'fractions',
        title: say('Zatikia zatiketa gisa: zehatza edo periodikoa', 'La fracción como división: exacto o periódico', 'الكسر قسمةً: منتهٍ أو دوري', 'A fraction as a division: terminating or recurring'),
        goal: say('Zatiki baten hamartarra zatiketaz lortzea eta zehatza edo periodikoa den bereiztea.', 'Obtener el decimal de una fracción dividiendo y distinguir si es exacto o periódico.', 'الحصول على العدد العشري لكسر بالقسمة وتمييز كونه منتهيًا أو دوريًا.', 'Find the decimal form of a fraction by dividing and tell whether it is terminating or recurring.'),
        explanation: say(
            'Zatiki bat zenbakitzailea zati izendatzailea da. Zatiketa egiten jarraitzen badugu, zero bat jaitsiz eta zatidurari koma jarriz, hamartar bat lortzen da. Hondarra zero bada, hamartar zehatza da: $\\frac{7}{2}=7\\mathbin{:}2=3{,}5$. Hondarra inoiz zero ez bada, zifra bera edo zifra-multzo bera errepikatzen da behin eta berriz: hamartar periodikoa da, $\\frac{7}{3}=2{,}333\\ldots$; errepikatzen den zatia periodoa da, eta arku batekin idazten da: $2{,}\\overline{3}$.',
            'Una fracción es el numerador dividido entre el denominador. Si seguimos dividiendo, bajando un cero y poniendo la coma en el cociente, obtenemos un decimal. Si el resto llega a cero, es un decimal exacto: $\\frac{7}{2}=7\\mathbin{:}2=3{,}5$. Si el resto nunca es cero, se repite una y otra vez la misma cifra o el mismo grupo de cifras: es un decimal periódico, $\\frac{7}{3}=2{,}333\\ldots$; la parte que se repite es el periodo y se escribe con un arco: $2{,}\\overline{3}$.',
            'الكسر هو البسط مقسومًا على المقام. وإذا تابعنا القسمة بإنزال صفر ووضع الفاصلة في الناتج حصلنا على عدد عشري. فإذا صار الباقي صفرًا فهو عدد عشري منتهٍ: $\\frac{7}{2}=7\\mathbin{:}2=3{,}5$. وإذا لم يصبح الباقي صفرًا أبدًا تكرّر الرقم نفسه أو مجموعة الأرقام نفسها بلا نهاية: هو عدد عشري دوري، $\\frac{7}{3}=2{,}333\\ldots$؛ والجزء المتكرّر هو الدورة، ويُكتب تحت قوس: $2{,}\\overline{3}$.', 'A fraction is the numerator divided by the denominator. If we keep dividing, bringing down a zero and putting a decimal point in the quotient, we get a decimal. If the remainder reaches zero, it is a terminating decimal: $\\frac{7}{2}=7\\mathbin{:}2=3{,}5$. If the remainder is never zero, the same digit or the same group of digits repeats over and over: it is a recurring decimal, $\\frac{7}{3}=2{,}333\\ldots$. The repeating part is called the period, and it is written with a bar over it: $2{,}\\overline{3}$.'
        ),
        problem: say('$\\frac{11}{6}$ zehatza ala periodikoa da?', '¿$\\frac{11}{6}$ es exacto o periódico?', 'هل $\\frac{11}{6}$ منتهٍ أم دوري؟', 'Is $\\frac{11}{6}$ terminating or recurring?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu: 11 : 6 = 1, hondarra 5.', 'Divide: 11 : 6 = 1, resto 5.', 'اقسم: 11 : 6 = 1، والباقي 5.', 'Divide: 11 : 6 = 1, remainder 5.') },
            { text: say('Jaitsi zero bat: 50 : 6 = 8, hondarra 2.', 'Baja un cero: 50 : 6 = 8, resto 2.', 'أنزل صفرًا: 50 : 6 = 8، والباقي 2.', 'Bring down a zero: 50 : 6 = 8, remainder 2.') },
            { text: say('20 : 6 = 3, hondarra 2… eta berriro 2: 3a errepikatzen da.', '20 : 6 = 3, resto 2… y otra vez 2: el 3 se repite.', '20 : 6 = 3، والباقي 2… ثم 2 مرة أخرى: يتكرّر الرقم 3.', '20 : 6 = 3, remainder 2… and again 2: the 3 repeats.'), math: same('$\\frac{11}{6}=1{,}8333\\ldots=1{,}8\\overline{3}$') }
        ],
        example: same('$\\frac{24}{50}=0{,}48\\qquad\\frac{1}{3}=0{,}333\\ldots$'),
        takeaway: say('Hondarra 0 → zehatza; hondarrak errepikatzen dira → periodikoa.', 'Resto 0 → exacto; los restos se repiten → periódico.', 'الباقي 0 ← منتهٍ؛ البواقي تتكرّر ← دوري.', 'Remainder 0 → terminating; remainders repeat → recurring.'),
        figure: (language) => <DivisionKindsFigure language={language} />
    },
    {
        id: 'rounding',
        stage: 'fractions',
        title: say('Hamartarrak biribildu', 'Redondear decimales', 'تقريب الأعداد العشرية', 'Rounding decimals'),
        goal: say('Hamartar bat unitateetara, hamarrenetara edo ehunenetara biribiltzea.', 'Redondear un decimal a las unidades, a las décimas o a las centésimas.', 'تقريب عدد عشري إلى الآحاد أو الأعشار أو الأجزاء من مئة.', 'Round a decimal to the nearest whole number, tenth or hundredth.'),
        explanation: say(
            'Biribiltzea zenbaki bat zifra gutxiagoko beste zenbaki hurbil batez ordezkatzea da. Hamarrenetara biribiltzeko, begiratu hurrengo zifrari, ehunenei: 5 baino txikiagoa bada, hamarrenak dauden bezala geratzen dira; 5 edo handiagoa bada, hamarrenari bat gehitzen zaio. $6{,}27$ hamarrenetara: 7 ≥ 5, beraz $6{,}3$. $3{,}84$: 4 < 5, beraz $3{,}8$. Zuzenean ikusten da: $6{,}27$ hurbilago dago $6{,}3$-tik $6{,}2$-tik baino. Kontuz bederatziekin: $2{,}99$ hamarrenetara $3{,}0$ da.',
            'Redondear es cambiar un número por otro cercano con menos cifras. Para redondear a las décimas, mira la cifra siguiente, las centésimas: si es menor que 5, las décimas se quedan como están; si es 5 o mayor, se suma uno a las décimas. $6{,}27$ a las décimas: 7 ≥ 5, así que $6{,}3$. $3{,}84$: 4 < 5, así que $3{,}8$. En la recta se ve: $6{,}27$ está más cerca de $6{,}3$ que de $6{,}2$. Cuidado con los nueves: $2{,}99$ a las décimas es $3{,}0$.',
            'التقريب هو استبدال عدد بعدد قريب منه بأرقام أقل. للتقريب إلى الأعشار انظر إلى الرقم التالي، الأجزاء من مئة: إذا كان أصغر من 5 تبقى الأعشار كما هي؛ وإذا كان 5 أو أكبر نضيف واحدًا إلى الأعشار. $6{,}27$ إلى الأعشار: 7 ≥ 5، إذن $6{,}3$. و$3{,}84$: 4 < 5، إذن $3{,}8$. ويُرى ذلك على المستقيم: $6{,}27$ أقرب إلى $6{,}3$ منه إلى $6{,}2$. انتبه إلى التسعات: $2{,}99$ مقرّبًا إلى الأعشار هو $3{,}0$.', 'Rounding means changing a number to a nearby one with fewer digits. To round to the tenths, look at the next digit, the hundredths: if it is less than 5, the tenths stay the same; if it is 5 or more, add one to the tenths. $6{,}27$ to the tenths: 7 ≥ 5, so $6{,}3$. $3{,}84$: 4 < 5, so $3{,}8$. On the number line you can see it: $6{,}27$ is closer to $6{,}3$ than to $6{,}2$. Be careful with nines: $2{,}99$ to the tenths is $3{,}0$.'
        ),
        problem: say('Biribildu $2{,}726$ hamarrenetara eta ehunenetara.', 'Redondea $2{,}726$ a las décimas y a las centésimas.', 'قرّب $2{,}726$ إلى الأعشار وإلى الأجزاء من مئة.', 'Round $2{,}726$ to the tenths and to the hundredths.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hamarrenetara: hurrengo zifra 2 da, 5 baino txikiagoa.', 'A las décimas: la cifra siguiente es 2, menor que 5.', 'إلى الأعشار: الرقم التالي 2، وهو أصغر من 5.', 'To the tenths: the next digit is 2, less than 5.'), math: same('$2{,}726\\approx 2{,}7$') },
            { text: say('Ehunenetara: hurrengo zifra 6 da, 5 edo handiagoa.', 'A las centésimas: la cifra siguiente es 6, 5 o mayor.', 'إلى الأجزاء من مئة: الرقم التالي 6، وهو 5 أو أكبر.', 'To the hundredths: the next digit is 6, which is 5 or more.'), math: same('$2{,}726\\approx 2{,}73$') }
        ],
        example: same('$0{,}574\\approx 0{,}57\\qquad 1{,}278\\approx 1{,}28\\qquad 5{,}099\\approx 5{,}10$'),
        takeaway: say('Hurrengo zifra 0–4: utzi; 5–9: gehitu bat.', 'Cifra siguiente 0–4: se deja; 5–9: se suma uno.', 'الرقم التالي 0–4: نترك؛ 5–9: نضيف واحدًا.', 'Next digit 0–4: leave it; 5–9: add one.'),
        figure: (language) => <RoundingFigure language={language} />
    },

    /* ---------- 4. Add, subtract and multiply ---------- */
    {
        id: 'add-sub',
        stage: 'operations',
        title: say('Hamartarrak batu eta kendu', 'Sumar y restar decimales', 'جمع الأعداد العشرية وطرحها', 'Adding and subtracting decimals'),
        goal: say('Hamartarrak zutabean batzea eta kentzea, komak lerrokatuta.', 'Sumar y restar decimales en columna, con las comas alineadas.', 'جمع الأعداد العشرية وطرحها عموديًا مع محاذاة الفواصل.', 'Add and subtract decimals in columns, with the decimal points lined up.'),
        explanation: say(
            'Kale batean lau ibilgailu daude aparkatuta: $3{,}8$ m, $4{,}17$ m, $10{,}23$ m eta $5{,}1$ m. Zenbat kale hartzen dute? Hamartarrak batzeko edo kentzeko, jarri zenbakiak zutabean, komak bata bestearen azpian: unitateak unitateen azpian, hamarrenak hamarrenen azpian… Gehitu zeroak denek zifra hamartar kopuru bera izan dezaten, eta batu edo kendu zenbaki arruntak bezala; emaitzan koma toki berean jartzen da: $3{,}80+4{,}17+10{,}23+5{,}10=23{,}30$ m.',
            'En una calle hay aparcados cuatro vehículos: $3{,}8$ m, $4{,}17$ m, $10{,}23$ m y $5{,}1$ m. ¿Qué longitud de calle ocupan? Para sumar o restar decimales, coloca los números en columna con las comas una debajo de otra: unidades bajo unidades, décimas bajo décimas… Añade ceros para que todos tengan el mismo número de cifras decimales, y suma o resta como con números naturales; en el resultado, la coma va en el mismo lugar: $3{,}80+4{,}17+10{,}23+5{,}10=23{,}30$ m.',
            'في شارع أربع سيارات متوقفة: $3{,}8$ م و$4{,}17$ م و$10{,}23$ م و$5{,}1$ م. كم طولًا من الشارع تشغل؟ لجمع الأعداد العشرية أو طرحها ضعها عموديًا والفواصل بعضها تحت بعض: الآحاد تحت الآحاد والأعشار تحت الأعشار… أضف أصفارًا لتصبح لها جميعًا الأرقام العشرية نفسها، واجمع أو اطرح كما في الأعداد الطبيعية؛ وتوضع الفاصلة في الناتج في المكان نفسه: $3{,}80+4{,}17+10{,}23+5{,}10=23{,}30$ م.', 'Four vehicles are parked on a street: $3{,}8$ m, $4{,}17$ m, $10{,}23$ m and $5{,}1$ m. What length of street do they take up? To add or subtract decimals, write the numbers in a column with the decimal points under each other: units under units, tenths under tenths… Add zeros so that they all have the same number of decimal places, and add or subtract as with natural numbers; in the answer, the decimal point goes in the same place: $3{,}80+4{,}17+10{,}23+5{,}10=23{,}30$ m.'
        ),
        problem: say('Bi kamioi daude: batek $16{,}3$ m ditu eta besteak $12{,}98$ m. Zenbateko aldea dago?', 'Hay dos camiones: uno mide $16{,}3$ m y el otro $12{,}98$ m. ¿Qué diferencia hay?', 'هناك شاحنتان: طول الأولى $16{,}3$ م والثانية $12{,}98$ م. كم الفرق بينهما؟', 'There are two lorries: one is $16{,}3$ m long and the other is $12{,}98$ m. What is the difference?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Komak lerrokatu eta zero bat gehitu.', 'Alinea las comas y añade un cero.', 'حاذِ الفاصلتين وأضف صفرًا.', 'Line up the decimal points and add a zero.'), math: same('$16{,}30-12{,}98$') },
            { text: say('Kendu zenbaki arruntak bezala: 1630 − 1298 = 332.', 'Resta como con naturales: 1630 − 1298 = 332.', 'اطرح كما في الأعداد الطبيعية: 1630 − 1298 = 332.', 'Subtract as with natural numbers: 1630 − 1298 = 332.') },
            { text: say('Koma toki berean: bi zifra hamartar.', 'La coma en el mismo lugar: dos cifras decimales.', 'الفاصلة في المكان نفسه: رقمان عشريان.', 'The decimal point in the same place: two decimal places.'), math: same('$16{,}30-12{,}98=3{,}32$') }
        ],
        example: same('$0{,}8+0{,}4=1{,}2\\qquad 2-0{,}97=1{,}03$'),
        takeaway: say('Koma komaren azpian, zeroak bete, eta zenbaki arruntak bezala.', 'Coma bajo coma, rellena con ceros y como con naturales.', 'فاصلة تحت فاصلة، أكمل بالأصفار، ثم كما في الأعداد الطبيعية.', 'Decimal point under decimal point, fill in with zeros and work as with natural numbers.'),
        figure: (language) => <ColumnAddFigure language={language} />
    },
    {
        id: 'multiply',
        stage: 'operations',
        title: say('Hamartarrak biderkatu', 'Multiplicar decimales', 'ضرب الأعداد العشرية', 'Multiplying decimals'),
        goal: say('Bi hamartar biderkatzea eta emaitzan koma behar den tokian jartzea.', 'Multiplicar dos decimales y colocar la coma en el resultado.', 'ضرب عددين عشريين ووضع الفاصلة في مكانها من الناتج.', 'Multiply two decimals and place the decimal point in the answer.'),
        explanation: say(
            'Liburuak forratzeko $2{,}75$ m forro behar izan dut, eta metroak $1{,}30$ € balio du. Zenbat ordaindu dut? Bi hamartar biderkatzeko, biderkatu zenbaki arruntak balira bezala, komak kontuan hartu gabe: $275\\cdot 13=3575$. Gero, zenbatu bi faktoreek guztira zenbat zifra hamartar dituzten, $2+1=3$, eta jarri koma emaitzan eskuinetik hasita hainbeste toki zenbatuta: $2{,}75\\cdot 1{,}3=3{,}575$ €. Kontuz: 1 baino txikiagoa den zenbaki batez biderkatzean emaitza txikiagoa da: $40\\cdot 0{,}8=32$.',
            'Para forrar mis libros he necesitado $2{,}75$ m de forro, y el metro cuesta $1{,}30$ €. ¿Cuánto he pagado? Para multiplicar dos decimales, multiplícalos como si fueran naturales, sin tener en cuenta la coma: $275\\cdot 13=3575$. Después cuenta cuántas cifras decimales tienen en total los dos factores, $2+1=3$, y coloca la coma en el resultado contando ese número de lugares desde la derecha: $2{,}75\\cdot 1{,}3=3{,}575$ €. Cuidado: al multiplicar por un número menor que 1, el resultado es menor: $40\\cdot 0{,}8=32$.',
            'احتجت $2{,}75$ م من ورق التغليف لتغليف كتبي، وثمن المتر $1{,}30$ €. كم دفعت؟ لضرب عددين عشريين اضربهما كأنهما عددان طبيعيان دون اعتبار للفاصلة: $275\\cdot 13=3575$. ثم عُدّ الأرقام العشرية في العاملين معًا، $2+1=3$، وضع الفاصلة في الناتج بعدّ هذا العدد من المنازل من اليمين: $2{,}75\\cdot 1{,}3=3{,}575$ €. انتبه: عند الضرب في عدد أصغر من 1 يصبح الناتج أصغر: $40\\cdot 0{,}8=32$.', 'To cover my books I needed $2{,}75$ m of book covering, and a metre costs $1{,}30$ €. How much did I pay? To multiply two decimals, multiply them as if they were natural numbers, ignoring the decimal point: $275\\cdot 13=3575$. Then count how many decimal places the two factors have in total, $2+1=3$, and place the decimal point in the answer, counting that number of places from the right: $2{,}75\\cdot 1{,}3=3{,}575$ €. Be careful: when you multiply by a number less than 1, the result is smaller: $40\\cdot 0{,}8=32$.'
        ),
        problem: say('Kalkulatu $3{,}64\\cdot 1{,}23$, jakinda $364\\cdot 123=44772$.', 'Calcula $3{,}64\\cdot 1{,}23$ sabiendo que $364\\cdot 123=44772$.', 'احسب $3{,}64\\cdot 1{,}23$ علمًا أن $364\\cdot 123=44772$.', 'Work out $3{,}64\\cdot 1{,}23$ knowing that $364\\cdot 123=44772$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zifra hamartarrak: 2 eta 2, guztira 4.', 'Cifras decimales: 2 y 2, en total 4.', 'الأرقام العشرية: 2 و2، المجموع 4.', 'Decimal places: 2 and 2, so 4 in total.') },
            { text: say('Lau toki eskuinetik.', 'Cuatro lugares desde la derecha.', 'أربع منازل من اليمين.', 'Four places from the right.'), math: same('$3{,}64\\cdot 1{,}23=4{,}4772$') }
        ],
        example: same('$0{,}6\\cdot 0{,}4=0{,}24\\qquad 0{,}3\\cdot 0{,}02=0{,}006$'),
        takeaway: say('Biderkatu komarik gabe; emaitzak bi faktoreen zifra hamartar guztiak ditu.', 'Multiplica sin coma; el resultado lleva las cifras decimales de los dos factores.', 'اضرب بلا فاصلة؛ وللناتج مجموع الأرقام العشرية للعاملين.', 'Multiply without the decimal point; the result has all the decimal places of both factors.'),
        figure: (language) => <MultiplyFigure language={language} />
    },
    {
        id: 'powers-of-ten',
        stage: 'operations',
        title: say('10ez, 100ez eta 1000ez biderkatu eta zatitu', 'Multiplicar y dividir por 10, 100 y 1000', 'الضرب والقسمة على 10 و100 و1000', 'Multiplying and dividing by 10, 100 and 1000'),
        goal: say('Koma mugituz 10, 100 eta 1000ez buruz biderkatzea eta zatitzea.', 'Multiplicar y dividir de memoria por 10, 100 y 1000 moviendo la coma.', 'الضرب والقسمة ذهنيًا على 10 و100 و1000 بتحريك الفاصلة.', 'Multiply and divide by 10, 100 and 1000 in your head by moving the decimal point.'),
        explanation: say(
            'Hamartar bat 10, 100, 1000… zenbakiez biderkatzeko, mugitu koma eskuinera zeroak adina toki: $3{,}26\\cdot 100=326$. Zifrarik falta bada, gehitu zeroak: $4{,}7\\cdot 1000=4700$. Zatitzeko, mugitu koma ezkerrera: $834{,}7\\mathbin{:}100=8{,}347$ eta, behar bada, jarri zeroak aurrean: $18{,}3\\mathbin{:}1000=0{,}0183$. Biderkatzean zenbakia handitu egiten da; zatitzean, txikitu. Ondorioz, $0{,}1$ez biderkatzea 10ez zatitzea da, eta $0{,}5$ez biderkatzea 2z zatitzea.',
            'Para multiplicar un decimal por 10, 100, 1000…, desplaza la coma hacia la derecha tantos lugares como ceros: $3{,}26\\cdot 100=326$. Si faltan cifras, añade ceros: $4{,}7\\cdot 1000=4700$. Para dividir, desplaza la coma hacia la izquierda: $834{,}7\\mathbin{:}100=8{,}347$ y, si hace falta, pon ceros delante: $18{,}3\\mathbin{:}1000=0{,}0183$. Al multiplicar el número crece; al dividir, decrece. Por eso, multiplicar por $0{,}1$ es dividir entre 10, y multiplicar por $0{,}5$ es dividir entre 2.',
            'لضرب عدد عشري في 10 أو 100 أو 1000… حرّك الفاصلة إلى اليمين بعدد الأصفار: $3{,}26\\cdot 100=326$. وإذا نقصت الأرقام فأضف أصفارًا: $4{,}7\\cdot 1000=4700$. وللقسمة حرّك الفاصلة إلى اليسار: $834{,}7\\mathbin{:}100=8{,}347$، وضع أصفارًا في البداية إن لزم: $18{,}3\\mathbin{:}1000=0{,}0183$. بالضرب يكبر العدد وبالقسمة يصغر. لذلك فالضرب في $0{,}1$ قسمة على 10، والضرب في $0{,}5$ قسمة على 2.', 'To multiply a decimal by 10, 100, 1000…, move the decimal point to the right as many places as there are zeros: $3{,}26\\cdot 100=326$. If digits are missing, add zeros: $4{,}7\\cdot 1000=4700$. To divide, move the decimal point to the left: $834{,}7\\mathbin{:}100=8{,}347$ and, if needed, put zeros in front: $18{,}3\\mathbin{:}1000=0{,}0183$. When you multiply, the number gets bigger; when you divide, it gets smaller. So, multiplying by $0{,}1$ is dividing by 10, and multiplying by $0{,}5$ is dividing by 2.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Bider 10, 100, 1000', 'Por 10, 100, 1000', 'الضرب في 10، 100، 1000', 'Times 10, 100, 1000'), text: say('Koma eskuinera, zeroak adina toki.', 'La coma a la derecha, tantos lugares como ceros.', 'الفاصلة إلى اليمين بعدد الأصفار.', 'The decimal point moves right, as many places as there are zeros.'), math: same('$78{,}562\\cdot 100=7856{,}2$') },
            { title: say('Zati 10, 100, 1000', 'Entre 10, 100, 1000', 'القسمة على 10، 100، 1000', 'Divided by 10, 100, 1000'), text: say('Koma ezkerrera, zeroak adina toki.', 'La coma a la izquierda, tantos lugares como ceros.', 'الفاصلة إلى اليسار بعدد الأصفار.', 'The decimal point moves left, as many places as there are zeros.'), math: same('$5{,}7\\mathbin{:}100=0{,}057$') },
            { title: say('Zero gehiagorekin', 'Con más ceros', 'مع أصفار أخرى', 'With more zeros'), text: say('$8{,}56\\cdot 200$: lehenik $\\cdot 2$, gero $\\cdot 100$.', '$8{,}56\\cdot 200$: primero $\\cdot 2$, luego $\\cdot 100$.', '$8{,}56\\cdot 200$: أولًا $\\cdot 2$ ثم $\\cdot 100$.', '$8{,}56\\cdot 200$: first $\\cdot 2$, then $\\cdot 100$.'), math: same('$8{,}56\\cdot 2=17{,}12\\ \\to\\ 17{,}12\\cdot 100=1712$') }
        ],
        example: same('$0{,}12\\cdot 10=1{,}2\\qquad 0{,}12\\mathbin{:}10=0{,}012\\qquad 6\\cdot 0{,}5=3$'),
        takeaway: say('Bider: koma eskuinera. Zati: koma ezkerrera. Zero bakoitzeko, toki bat.', 'Por: la coma a la derecha. Entre: a la izquierda. Un lugar por cada cero.', 'الضرب: الفاصلة يمينًا. القسمة: يسارًا. منزلة لكل صفر.', 'Times: the decimal point moves right. Divided by: left. One place for each zero.'),
        figure: (language) => <ShiftFigure language={language} />
    },

    /* ---------- 5. Division and problems ---------- */
    {
        id: 'divide-natural',
        stage: 'division',
        title: say('Zatiketa hamartarra: zatitzailea zenbaki arrunta', 'División decimal: divisor natural', 'القسمة العشرية: المقسوم عليه عدد طبيعي', 'Decimal division: natural-number divisor'),
        goal: say('Zatidura hamartarra lortzea zatitzailea zenbaki arrunta denean, eta zatidura hurbiltzea.', 'Obtener el cociente decimal cuando el divisor es natural, y aproximar el cociente.', 'الحصول على ناتج قسمة عشري حين يكون المقسوم عليه عددًا طبيعيًا، وتقريب الناتج.', 'Find the decimal quotient when the divisor is a natural number, and approximate the quotient.'),
        explanation: say(
            'Zatiketa bat zehatza ez denean, jarraitu daiteke: jarri koma zatiduran eta jaitsi zero bat hondarrera. $125\\mathbin{:}20$: zatidura 6, hondarra 5; jaitsi zero bat, 50 : 20 = 2, hondarra 10; beste zero bat, 100 : 20 = 5, hondarra 0. Beraz, $125\\mathbin{:}20=6{,}25$. Zatikizuna hamartarra bada eta zatitzailea arrunta, zatitu ohi bezala eta jarri koma zatiduran lehen zifra hamartarra jaistean: $8{,}5\\mathbin{:}5=1{,}7$. Zatiketa ez bada inoiz bukatzen, gelditu nahi dituzun zifra hamartarretan: $10\\mathbin{:}3\\approx 3{,}33$.',
            'Cuando una división no es exacta se puede seguir: pon la coma en el cociente y baja un cero al resto. $125\\mathbin{:}20$: cociente 6, resto 5; baja un cero, 50 : 20 = 2, resto 10; otro cero, 100 : 20 = 5, resto 0. Así, $125\\mathbin{:}20=6{,}25$. Si el dividendo es decimal y el divisor natural, divide de forma normal y pon la coma en el cociente al bajar la primera cifra decimal: $8{,}5\\mathbin{:}5=1{,}7$. Si la división no termina nunca, para en las cifras decimales que quieras: $10\\mathbin{:}3\\approx 3{,}33$.',
            'حين لا تكون القسمة تامة يمكن متابعتها: ضع الفاصلة في الناتج وأنزل صفرًا إلى الباقي. $125\\mathbin{:}20$: الناتج 6 والباقي 5؛ أنزل صفرًا، 50 : 20 = 2 والباقي 10؛ صفرًا آخر، 100 : 20 = 5 والباقي 0. إذن $125\\mathbin{:}20=6{,}25$. وإذا كان المقسوم عشريًا والمقسوم عليه طبيعيًا فاقسم كالمعتاد وضع الفاصلة في الناتج عند إنزال أول رقم عشري: $8{,}5\\mathbin{:}5=1{,}7$. وإذا لم تنتهِ القسمة أبدًا فتوقّف عند عدد الأرقام العشرية الذي تريده: $10\\mathbin{:}3\\approx 3{,}33$.', 'When a division is not exact, you can keep going: put a decimal point in the quotient and bring down a zero next to the remainder. $125\\mathbin{:}20$: quotient 6, remainder 5; bring down a zero, 50 : 20 = 2, remainder 10; another zero, 100 : 20 = 5, remainder 0. So, $125\\mathbin{:}20=6{,}25$. If the dividend is a decimal and the divisor a natural number, divide in the normal way and put the decimal point in the quotient when you bring down the first decimal digit: $8{,}5\\mathbin{:}5=1{,}7$. If the division never ends, you can stop at as many decimal places as you want: $10\\mathbin{:}3\\approx 3{,}33$.'
        ),
        problem: say('Lau lagunek $156{,}34$ € bildu dituzte, denek kopuru bera jarrita. Zenbat jarri du bakoitzak?', 'Cuatro amigos han reunido $156{,}34$ €, todos con la misma cantidad. ¿Cuánto ha puesto cada uno?', 'جمع أربعة أصدقاء $156{,}34$ € بالتساوي. كم دفع كل واحد؟', 'Four friends have pooled $156{,}34$ €, each putting in the same amount. How much did each one put in?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati osoa: 156 : 4 = 39, hondarra 0.', 'Parte entera: 156 : 4 = 39, resto 0.', 'الجزء الصحيح: 156 : 4 = 39، والباقي 0.', 'Whole part: 156 : 4 = 39, remainder 0.') },
            { text: say('Jaitsi 3a eta jarri koma: 3 : 4 = 0, hondarra 3.', 'Baja el 3 y pon la coma: 3 : 4 = 0, resto 3.', 'أنزل 3 وضع الفاصلة: 3 : 4 = 0، والباقي 3.', 'Bring down the 3 and put in the decimal point: 3 : 4 = 0, remainder 3.') },
            { text: say('Jaitsi 4a: 34 : 4 = 8, hondarra 2; zero bat: 20 : 4 = 5.', 'Baja el 4: 34 : 4 = 8, resto 2; un cero: 20 : 4 = 5.', 'أنزل 4: 34 : 4 = 8، والباقي 2؛ وصفرًا: 20 : 4 = 5.', 'Bring down the 4: 34 : 4 = 8, remainder 2; bring down a zero: 20 : 4 = 5.'), math: same('$156{,}34\\mathbin{:}4=39{,}085$') }
        ],
        example: same('$7\\mathbin{:}2=3{,}5\\qquad 1\\mathbin{:}4=0{,}25\\qquad 15\\mathbin{:}8=1{,}875$'),
        takeaway: say('Zero bat jaitsi eta koma zatiduran: zatiketa hamartarra.', 'Bajar un cero y poner la coma en el cociente: división decimal.', 'إنزال صفر ووضع الفاصلة في الناتج: القسمة العشرية.', 'Bring down a zero and put the decimal point in the quotient: decimal division.'),
        figure: (language) => <DivideNaturalFigure language={language} />
    },
    {
        id: 'divide-decimal',
        stage: 'division',
        title: say('Zatitzailea hamartarra denean', 'Cuando el divisor es decimal', 'حين يكون المقسوم عليه عشريًا', 'When the divisor is a decimal'),
        goal: say('Zatitzailearen koma kentzea, zatikizuna eta zatitzailea 10, 100… zenbakiez biderkatuz.', 'Quitar la coma del divisor multiplicando dividendo y divisor por 10, 100…', 'حذف فاصلة المقسوم عليه بضرب المقسوم والمقسوم عليه في 10 أو 100…', 'Remove the decimal point from the divisor by multiplying the dividend and the divisor by 10, 100…'),
        explanation: say(
            'Zatiketa batean, zatikizuna eta zatitzailea zenbaki berak biderkatzen badira, zatidura ez da aldatzen: $8\\mathbin{:}2=80\\mathbin{:}20=4$. Horri esker, zatitzailearen koma ken daiteke: biderkatu biak 10ez, 100ez edo 1000ez, zatitzaileak zifra hamartar dituen adina zerorekin. $1{,}28\\mathbin{:}0{,}2$: zatitzaileak zifra hamartar bat du, beraz biak 10ez: $12{,}8\\mathbin{:}2=6{,}4$. Zatikizunari zifrak falta bazaizkio, gehitu zeroak: $44\\mathbin{:}3{,}6=440\\mathbin{:}36$.',
            'En una división, si se multiplican el dividendo y el divisor por el mismo número, el cociente no cambia: $8\\mathbin{:}2=80\\mathbin{:}20=4$. Gracias a eso se puede quitar la coma del divisor: multiplica los dos por 10, 100 o 1000, con tantos ceros como cifras decimales tenga el divisor. $1{,}28\\mathbin{:}0{,}2$: el divisor tiene una cifra decimal, así que los dos por 10: $12{,}8\\mathbin{:}2=6{,}4$. Si al dividendo le faltan cifras, añade ceros: $44\\mathbin{:}3{,}6=440\\mathbin{:}36$.',
            'في القسمة إذا ضُرب المقسوم والمقسوم عليه في العدد نفسه لا يتغيّر الناتج: $8\\mathbin{:}2=80\\mathbin{:}20=4$. وبفضل ذلك يمكن حذف فاصلة المقسوم عليه: اضرب الاثنين في 10 أو 100 أو 1000 بعدد أصفار يساوي عدد الأرقام العشرية في المقسوم عليه. $1{,}28\\mathbin{:}0{,}2$: للمقسوم عليه رقم عشري واحد، إذن نضرب الاثنين في 10: $12{,}8\\mathbin{:}2=6{,}4$. وإذا نقصت المقسومَ أرقامٌ فأضف أصفارًا: $44\\mathbin{:}3{,}6=440\\mathbin{:}36$.', 'In a division, if you multiply the dividend and the divisor by the same number, the quotient does not change: $8\\mathbin{:}2=80\\mathbin{:}20=4$. Thanks to this, you can remove the decimal point from the divisor: multiply both by 10, 100 or 1000, with as many zeros as the divisor has decimal places. $1{,}28\\mathbin{:}0{,}2$: the divisor has one decimal place, so multiply both by 10: $12{,}8\\mathbin{:}2=6{,}4$. If the dividend needs more digits, add zeros: $44\\mathbin{:}3{,}6=440\\mathbin{:}36$.'
        ),
        problem: say('Festa batean $9{,}5$ l freskagarri daude, eta edalontziek $0{,}25$ l hartzen dute. Zenbat edalontzi bete daitezke?', 'En una fiesta hay $9{,}5$ l de refresco y los vasos tienen $0{,}25$ l de capacidad. ¿Cuántos vasos se llenan?', 'في حفلة $9{,}5$ لتر من المشروب، وسعة الكأس $0{,}25$ لتر. كم كأسًا تُملأ؟', 'At a party there is $9{,}5$ l of soft drink, and each glass holds $0{,}25$ l. How many glasses can be filled?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitzaileak bi zifra hamartar ditu: biak 100ez.', 'El divisor tiene dos cifras decimales: los dos por 100.', 'للمقسوم عليه رقمان عشريان: نضرب الاثنين في 100.', 'The divisor has two decimal places: multiply both by 100.'), math: same('$9{,}5\\mathbin{:}0{,}25=950\\mathbin{:}25$') },
            { text: say('Zatitu zenbaki arruntak.', 'Divide los naturales.', 'اقسم العددين الطبيعيين.', 'Divide the natural numbers.'), math: same('$950\\mathbin{:}25=38$') }
        ],
        example: same('$0{,}52\\mathbin{:}0{,}2=5{,}2\\mathbin{:}2=2{,}6\\qquad 7\\mathbin{:}0{,}05=700\\mathbin{:}5=140$'),
        takeaway: say('Zatitzailearen koma kendu: biak 10, 100, 1000ez biderkatu.', 'Quita la coma del divisor: multiplica los dos por 10, 100, 1000.', 'احذف فاصلة المقسوم عليه: اضرب الاثنين في 10 أو 100 أو 1000.', 'Remove the decimal point from the divisor: multiply both by 10, 100 or 1000.'),
        figure: (language) => <DivideDecimalFigure language={language} />
    },
    {
        id: 'problems',
        stage: 'division',
        title: say('Eragiketa konbinatuak eta problemak', 'Operaciones combinadas y problemas', 'العمليات المركّبة والمسائل', 'Combined operations and problems'),
        goal: say('Hamartarrekin eragiketa konbinatuak eta eguneroko problemak ebaztea.', 'Resolver operaciones combinadas y problemas cotidianos con decimales.', 'حلّ عمليات مركّبة ومسائل يومية بالأعداد العشرية.', 'Solve combined operations and everyday problems with decimals.'),
        explanation: say(
            'Hamartarrekin ere eragiketen hurrenkera bera da: lehenik parentesiak, gero biderketak eta zatiketak, eta azkenik batuketak eta kenketak. Erosketa-problemetan, prezioa bider kopurua egiten da: $0{,}92$ kg bakailao, kiloa $13{,}25$ €, $0{,}92\\cdot 13{,}25=12{,}19$ €. Unitate baten prezioa jakiteko, zatitu: $15{,}75$ € kilo eta laurdeneko legatzarengatik, $15{,}75\\mathbin{:}1{,}25=12{,}6$ € kiloa. Eurotan, emaitza ehunenetara biribiltzen da.',
            'Con decimales el orden de las operaciones es el mismo: primero los paréntesis, después multiplicaciones y divisiones, y por último sumas y restas. En los problemas de compras se multiplica precio por cantidad: $0{,}92$ kg de bacalao a $13{,}25$ € el kilo, $0{,}92\\cdot 13{,}25=12{,}19$ €. Para saber el precio de una unidad, se divide: una merluza de kilo y cuarto por $15{,}75$ €, $15{,}75\\mathbin{:}1{,}25=12{,}6$ € el kilo. En euros, el resultado se redondea a las centésimas.',
            'ترتيب العمليات مع الأعداد العشرية هو نفسه: الأقواس أولًا، ثم الضرب والقسمة، وأخيرًا الجمع والطرح. وفي مسائل الشراء نضرب السعر في الكمية: $0{,}92$ كغ من سمك القد بسعر $13{,}25$ € للكيلو، $0{,}92\\cdot 13{,}25=12{,}19$ €. ولمعرفة سعر الوحدة نقسم: سمكة نازلي وزنها كيلو وربع بسعر $15{,}75$ €، $15{,}75\\mathbin{:}1{,}25=12{,}6$ € للكيلو. وباليورو يُقرّب الناتج إلى الأجزاء من مئة.', 'With decimals, the order of operations is the same: first brackets, then multiplications and divisions, and finally additions and subtractions. In shopping problems, you multiply the price by the quantity: $0{,}92$ kg of cod at $13{,}25$ € per kilo, $0{,}92\\cdot 13{,}25=12{,}19$ €. To find the price of one unit, you divide: a hake weighing a kilo and a quarter costs $15{,}75$ €, $15{,}75\\mathbin{:}1{,}25=12{,}6$ € per kilo. In euros, the result is rounded to the nearest cent.'
        ),
        problem: say('Kalkulatu $4{,}2-0{,}2\\cdot(5-0{,}6)$.', 'Calcula $4{,}2-0{,}2\\cdot(5-0{,}6)$.', 'احسب $4{,}2-0{,}2\\cdot(5-0{,}6)$.', 'Work out $4{,}2-0{,}2\\cdot(5-0{,}6)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Parentesia.', 'El paréntesis.', 'القوس.', 'The brackets.'), math: same('$5-0{,}6=4{,}4$') },
            { text: say('Biderketa.', 'La multiplicación.', 'الضرب.', 'The multiplication.'), math: same('$0{,}2\\cdot 4{,}4=0{,}88$') },
            { text: say('Kenketa.', 'La resta.', 'الطرح.', 'The subtraction.'), math: same('$4{,}2-0{,}88=3{,}32$') }
        ],
        example: same('$5\\cdot 1{,}05+2{,}85=8{,}1\\qquad (5{,}5+7+2{,}4)\\mathbin{:}3\\approx 4{,}97$'),
        takeaway: say('Parentesiak, biderketak eta zatiketak, batuketak eta kenketak; eurotan, ehunenetara.', 'Paréntesis, multiplicaciones y divisiones, sumas y restas; en euros, a las centésimas.', 'الأقواس ثم الضرب والقسمة ثم الجمع والطرح؛ وباليورو إلى الأجزاء من مئة.', 'Brackets, multiplications and divisions, additions and subtractions; in euros, to the nearest cent.'),
        figure: (language) => <ShoppingFigure language={language} />
    }
]

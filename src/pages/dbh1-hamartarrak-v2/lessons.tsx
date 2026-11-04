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
import { decimalsLessonChecks, type DecimalsTopicId } from './lessonChecks'
import { decimalsLessonTexts } from './lessonTexts'

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

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Structure ---------- */
    {
        id: 'decimal-units',
        stage: 'structure',
        title: say('Hamarrenak, ehunenak eta milarenak', 'Décimas, centésimas y milésimas', 'الأعشار والأجزاء من مئة والأجزاء من ألف', 'Tenths, hundredths and thousandths'),
        goal: say('Unitate hamartarrak ezagutzea eta haien arteko baliokidetasunak erabiltzea.', 'Conocer las unidades decimales y usar las equivalencias entre ellas.', 'التعرّف إلى الوحدات العشرية واستعمال التكافؤ بينها.', 'Know the decimal units and convert between them.'),
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'place-value', title: { eu: 'Sistema hamartarra eta posizioa', es: 'El sistema de numeración decimal', en: 'The decimal number system', ar: 'نظام العدّ العشري' } }],
        stepsKind: 'facts',
        steps: [
            { title: say('Hamarrena', 'La décima', 'العُشر', 'The tenth'), text: say('Unitatea 10 zati berdinetan.', 'La unidad en 10 partes iguales.', 'الوحدة مقسومة إلى 10 أجزاء متساوية.', 'The unit split into 10 equal parts.'), math: same('$\\frac{1}{10}=0{,}1$') },
            { title: say('Ehunena', 'La centésima', 'الجزء من مئة', 'The hundredth'), text: say('Unitatea 100 zati berdinetan.', 'La unidad en 100 partes iguales.', 'الوحدة مقسومة إلى 100 جزء متساوٍ.', 'The unit split into 100 equal parts.'), math: same('$\\frac{1}{100}=0{,}01$') },
            { title: say('Milarena', 'La milésima', 'الجزء من ألف', 'The thousandth'), text: say('Unitatea 1000 zati berdinetan.', 'La unidad en 1000 partes iguales.', 'الوحدة مقسومة إلى 1000 جزء متساوٍ.', 'The unit split into 1000 equal parts.'), math: same('$\\frac{1}{1000}=0{,}001$') },
            { title: say('Hamarna bider', 'De diez en diez', 'عشرةً عشرة', 'In tens'), text: say('Maila bakoitzak hurrengoaren 10 balio ditu: 3 hamarren = 30 ehunen = 300 milaren.', 'Cada orden vale 10 del siguiente: 3 décimas = 30 centésimas = 300 milésimas.', 'كل رتبة تساوي 10 من الرتبة التي تليها: 3 أعشار = 30 جزءًا من مئة = 300 جزء من ألف.', 'Each place is worth 10 of the next one: 3 tenths = 30 hundredths = 300 thousandths.') }
        ],
        takeaway: say('1 unitate = 10 hamarren = 100 ehunen = 1000 milaren.', '1 unidad = 10 décimas = 100 centésimas = 1000 milésimas.', 'الوحدة = 10 أعشار = 100 جزء من مئة = 1000 جزء من ألف.', '1 unit = 10 tenths = 100 hundredths = 1000 thousandths.'),
        figure: (language) => <DecimalUnitsFigure language={language} />
    },
    {
        id: 'place-value',
        stage: 'structure',
        title: say('Zati osoa, zati hamartarra eta posizioa', 'Parte entera, parte decimal y posición', 'الجزء الصحيح والجزء العشري والمنزلة', 'Whole part, decimal part and place value'),
        goal: say('Zenbaki hamartar baten zifra bakoitzaren balioa jakitea eta zenbakia deskonposatzea.', 'Saber el valor de cada cifra de un número decimal y descomponerlo.', 'معرفة قيمة كل رقم في عدد عشري وتفكيكه.', 'Know the value of each digit in a decimal and break it into parts.'),
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'place-value', title: { eu: 'Sistema hamartarra eta posizioa', es: 'El sistema de numeración decimal', en: 'The decimal number system', ar: 'نظام العدّ العشري' } }],
        problem: say('Zenbat balio du 5 zifrak $52{,}347$ zenbakian? Eta 4 zifrak?', '¿Cuánto vale la cifra 5 en $52{,}347$? ¿Y el 4?', 'كم قيمة الرقم 5 في $52{,}347$؟ وكم قيمة الرقم 4؟', 'What is the value of the digit 5 in $52{,}347$? And the 4?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kokatu zifra bakoitza taulan: D U , h e m.', 'Coloca cada cifra en la tabla: D U , d c m.', 'ضع كل رقم في الجدول: عشرات، آحاد، فاصلة، أعشار، أجزاء من مئة، أجزاء من ألف.', 'Place each digit in the table: T U . t h th.'), math: same('$5\\;2\\;,\\;3\\;4\\;7$') },
            { text: say('5 zifra hamarrekoen tokian dago.', 'El 5 está en las decenas.', 'الرقم 5 في منزلة العشرات.', 'The 5 is in the tens.'), math: same('$5\\cdot 10=50$') },
            { text: say('4 zifra ehunenen tokian dago.', 'El 4 está en las centésimas.', 'الرقم 4 في منزلة الأجزاء من مئة.', 'The 4 is in the hundredths.'), math: same('$4\\cdot 0{,}01=0{,}04$') }
        ],
        takeaway: say('Zifra baten balioa: zifra bider bere tokiaren balioa.', 'El valor de una cifra: la cifra por el valor de su lugar.', 'قيمة الرقم: الرقم مضروبًا في قيمة منزلته.', 'The value of a digit: the digit times the value of its place.'),
        figure: (language) => <PlaceTableFigure language={language} />
    },
    {
        id: 'read-write',
        stage: 'structure',
        title: say('Hamartarrak irakurri eta idatzi', 'Leer y escribir decimales', 'قراءة الأعداد العشرية وكتابتها', 'Reading and writing decimals'),
        goal: say('Zenbaki hamartarrak hitzez irakurtzea, zifraz idaztea eta eskuineko zeroak ulertzea.', 'Leer decimales con palabras, escribirlos con cifras y entender los ceros a la derecha.', 'قراءة الأعداد العشرية بالكلمات وكتابتها بالأرقام وفهم الأصفار على اليمين.', 'Read decimals in words, write them in digits and understand zeros on the right.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Irakurri', 'Leer', 'القراءة', 'Read'), text: say('Zati osoa unitatetan, zati hamartarra azken zifraren unitatean.', 'Parte entera en unidades, parte decimal en la unidad de la última cifra.', 'الجزء الصحيح بالوحدات، والجزء العشري بوحدة آخر رقم.', 'Whole part in units, decimal part in the unit of the last digit.'), math: same('$3{,}27$') },
            { title: say('Idatzi', 'Escribir', 'الكتابة', 'Write'), text: say('Hamarrenak: zifra bat; ehunenak: bi; milarenak: hiru.', 'Décimas: una cifra; centésimas: dos; milésimas: tres.', 'الأعشار: رقم واحد؛ الأجزاء من مئة: رقمان؛ الأجزاء من ألف: ثلاثة أرقام.', 'Tenths: one digit; hundredths: two; thousandths: three.'), math: same('$0{,}5\\qquad 0{,}15\\qquad 0{,}114$') },
            { title: say('Eskuineko zeroak', 'Ceros a la derecha', 'الأصفار على اليمين', 'Zeros on the right'), text: say('Ez dute balioa aldatzen.', 'No cambian el valor.', 'لا تغيّر القيمة.', 'They do not change the value.'), math: same('$0{,}3=0{,}30=0{,}300$') }
        ],
        takeaway: say('Azken zifraren tokiak esaten du nola irakurri: hamarrenak, ehunenak edo milarenak.', 'El lugar de la última cifra dice cómo se lee: décimas, centésimas o milésimas.', 'منزلة آخر رقم تحدّد القراءة: أعشار أو أجزاء من مئة أو أجزاء من ألف.', 'The place of the last digit shows how to read it: tenths, hundredths or thousandths.'),
        figure: (language) => <SameValueFigure language={language} />
    },

    /* ---------- 2. Order and the number line ---------- */
    {
        id: 'compare',
        stage: 'order',
        title: say('Hamartarrak konparatu eta ordenatu', 'Comparar y ordenar decimales', 'مقارنة الأعداد العشرية وترتيبها', 'Comparing and ordering decimals'),
        goal: say('Bi hamartarretatik zein den handiagoa jakitea eta hamartar zerrendak ordenatzea.', 'Saber cuál de dos decimales es mayor y ordenar listas de decimales.', 'معرفة الأكبر من عددين عشريين وترتيب قوائم من الأعداد العشرية.', 'Know which of two decimals is bigger and order lists of decimals.'),
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'order', title: { eu: 'Ordenatu eta zuzenean kokatu', es: 'Ordenar y situar en la recta', en: 'Ordering and placing on the number line', ar: 'الترتيب والتمثيل على المستقيم' } }],
        problem: say('Ordenatu txikienetik handienera: $2{,}3$; $2{,}03$; $2{,}303$; $2{,}033$.', 'Ordena de menor a mayor: $2{,}3$; $2{,}03$; $2{,}303$; $2{,}033$.', 'رتّب من الأصغر إلى الأكبر: $2{,}3$؛ $2{,}03$؛ $2{,}303$؛ $2{,}033$.', 'Order from smallest to largest: $2{,}3$; $2{,}03$; $2{,}303$; $2{,}033$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati osoa berdina da guztietan: 2.', 'La parte entera es igual en todos: 2.', 'الجزء الصحيح متساوٍ في جميعها: 2.', 'The whole part is the same in all of them: 2.') },
            { text: say('Idatzi denak zifra hamartar kopuru berarekin.', 'Escríbelos todos con el mismo número de cifras decimales.', 'اكتبها كلها بالعدد نفسه من الأرقام العشرية.', 'Write them all with the same number of decimal places.'), math: same('$2{,}300\\quad 2{,}030\\quad 2{,}303\\quad 2{,}033$') },
            { text: say('Konparatu komarik gabe: 2030 < 2033 < 2300 < 2303.', 'Compara sin la coma: 2030 < 2033 < 2300 < 2303.', 'قارن بلا فاصلة: 2030 < 2033 < 2300 < 2303.', 'Compare without the decimal point: 2030 < 2033 < 2300 < 2303.'), math: same('$2{,}03<2{,}033<2{,}3<2{,}303$') }
        ],
        takeaway: say('Lehenik zati osoa; gero hamarrenak, ehunenak, milarenak… ordenan.', 'Primero la parte entera; después décimas, centésimas, milésimas… por orden.', 'أولًا الجزء الصحيح؛ ثم الأعشار فالأجزاء من مئة فالأجزاء من ألف بالترتيب.', 'First the whole part; then tenths, hundredths, thousandths… in order.'),
        figure: (language) => <CompareDigitsFigure language={language} />
    },
    {
        id: 'line',
        stage: 'order',
        title: say('Hamartarrak zenbaki-zuzenean', 'Los decimales en la recta', 'الأعداد العشرية على المستقيم', 'Decimals on the number line'),
        goal: say('Hamartarrak zenbaki-zuzenean kokatzea eta zuzeneko puntu baten balioa irakurtzea.', 'Situar decimales en la recta numérica y leer el valor de un punto de la recta.', 'وضع الأعداد العشرية على خط الأعداد وقراءة قيمة نقطة عليه.', 'Place decimals on the number line and read the value of a point on the line.'),
        problem: say('Zein zenbaki dago zuzenean, $6{,}3$ eta $6{,}4$ artean, laugarren markan, tartea 10 zatitan banatuta?', '¿Qué número está en la recta entre $6{,}3$ y $6{,}4$, en la cuarta marca, si el tramo está dividido en 10 partes?', 'ما العدد الواقع على المستقيم بين $6{,}3$ و$6{,}4$ عند العلامة الرابعة إذا قُسمت القطعة إلى 10 أجزاء؟', 'Which number is on the number line between $6{,}3$ and $6{,}4$, at the fourth mark, if the interval is divided into 10 parts?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Tartea hamarren bat da; 10 zatitan, marka bakoitza ehunen bat.', 'El tramo es una décima; en 10 partes, cada marca es una centésima.', 'القطعة عُشر واحد؛ وبتقسيمها إلى 10 أجزاء تصبح كل علامة جزءًا من مئة.', 'The interval is one tenth; split into 10 parts, each mark is a hundredth.'), math: same('$0{,}1\\mathbin{:}10=0{,}01$') },
            { text: say('Lau marka aurrera, $6{,}3$ zenbakitik hasita.', 'Avanza cuatro marcas desde $6{,}3$.', 'تقدّم أربع علامات من $6{,}3$.', 'Move four marks on from $6{,}3$.'), math: same('$6{,}3+4\\cdot 0{,}01=6{,}34$') }
        ],
        takeaway: say('Tartea 10 zatitan: hamarrenak; berriro 10 zatitan: ehunenak.', 'El tramo en 10 partes: décimas; otra vez en 10: centésimas.', 'القطعة في 10 أجزاء: أعشار؛ ومرة أخرى في 10: أجزاء من مئة.', 'The interval split into 10 parts: tenths; split again into 10: hundredths.'),
        figure: (language) => <ZoomLineFigure language={language} />
    },
    {
        id: 'between',
        stage: 'order',
        title: say('Bi hamartarren arteko zenbakiak', 'Números entre dos decimales', 'أعداد بين عددين عشريين', 'Numbers between two decimals'),
        goal: say('Bi hamartarren artean beste hamartar bat tartekatzea eta erdiko puntua aurkitzea.', 'Intercalar un decimal entre otros dos y hallar el punto medio.', 'إدراج عدد عشري بين عددين آخرين وإيجاد نقطة المنتصف.', 'Insert a decimal between two others and find the midpoint.'),
        problem: say('Tartekatu hiru zenbaki $2{,}7$ eta $2{,}8$ artean, tarte berdinetan.', 'Intercala tres números entre $2{,}7$ y $2{,}8$, a intervalos iguales.', 'أدرج ثلاثة أعداد بين $2{,}7$ و$2{,}8$ على مسافات متساوية.', 'Insert three numbers between $2{,}7$ and $2{,}8$, at equal intervals.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru zenbakik lau tarte egiten dituzte: zatitu $0{,}1$ 4 zenbakiaz.', 'Tres números hacen cuatro tramos: divide $0{,}1$ entre 4.', 'ثلاثة أعداد تصنع أربع قطع: اقسم $0{,}1$ على 4.', 'Three numbers make four intervals: divide $0{,}1$ by 4.'), math: same('$0{,}1\\mathbin{:}4=0{,}025$') },
            { text: say('Batu $0{,}025$ behin eta berriz.', 'Suma $0{,}025$ una y otra vez.', 'اجمع $0{,}025$ مرة بعد مرة.', 'Add $0{,}025$ over and over.'), math: same('$2{,}725\\quad 2{,}75\\quad 2{,}775$') }
        ],
        takeaway: say('Bi hamartarren artean beti daude beste hamartar batzuk: gehitu zeroak eta aukeratu.', 'Entre dos decimales siempre hay otros: añade ceros y elige.', 'بين عددين عشريين توجد دائمًا أعداد أخرى: أضف أصفارًا واختر.', 'Between two decimals there are always others: add zeros and choose one.'),
        figureAfterSteps: true,
        figure: (language) => <BetweenFigure language={language} />
    },

    /* ---------- 3. Fractions and rounding ---------- */
    {
        id: 'decimal-fraction',
        stage: 'fractions',
        title: say('Zatiki hamartarrak', 'Fracciones decimales', 'الكسور العشرية', 'Decimal fractions'),
        goal: say('Hamartar bat zatiki hamartar gisa idaztea eta alderantziz.', 'Escribir un decimal como fracción decimal y al revés.', 'كتابة عدد عشري كسرًا عشريًا والعكس.', 'Write a decimal as a decimal fraction and the other way round.'),
        needs: [{ unit: 'dbh1/zatikiak', topic: 'what', title: { eu: 'Zatikiak: zenbakitzailea eta izendatzailea', es: 'La fracción: numerador y denominador', en: 'The fraction: numerator and denominator', ar: 'الكسر: البسط والمقام' } }],
        stepsKind: 'facts',
        steps: [
            { title: say('Hamartarretik zatikira', 'De decimal a fracción', 'من العشري إلى الكسر', 'From decimal to fraction'), text: say('Zifra hamartar adina zero izendatzailean.', 'Tantos ceros en el denominador como cifras decimales.', 'أصفار في المقام بعدد الأرقام العشرية.', 'As many zeros in the denominator as decimal places.'), math: same('$15{,}379=\\frac{15379}{1000}$') },
            { title: say('Zatikitik hamartarrera', 'De fracción a decimal', 'من الكسر إلى العشري', 'From fraction to decimal'), text: say('Koma ezkerrera, izendatzailearen zero adina toki.', 'La coma a la izquierda, tantos lugares como ceros.', 'الفاصلة إلى اليسار بعدد الأصفار.', 'The decimal point moves left, as many places as zeros.'), math: same('$\\frac{24}{10}=2{,}4\\qquad\\frac{6}{1000}=0{,}006$') },
            { title: say('Zeroak betetzeko', 'Ceros de relleno', 'أصفار للتعبئة', 'Padding zeros'), text: say('Zifra nahikorik ez badago, jarri zeroak komaren ondoren.', 'Si no hay cifras suficientes, pon ceros tras la coma.', 'إذا لم تكفِ الأرقام فضع أصفارًا بعد الفاصلة.', 'If there are not enough digits, put zeros after the decimal point.'), math: same('$\\frac{35}{1000}=0{,}035$') }
        ],
        takeaway: say('Zifra hamartar bakoitzeko, zero bat izendatzailean.', 'Por cada cifra decimal, un cero en el denominador.', 'لكل رقم عشري صفر في المقام.', 'For each decimal place, one zero in the denominator.'),
        figure: (language) => <DecimalFractionFigure language={language} />
    },
    {
        id: 'fraction-division',
        stage: 'fractions',
        title: say('Zatikia zatiketa gisa: zehatza edo periodikoa', 'La fracción como división: exacto o periódico', 'الكسر قسمةً: منتهٍ أو دوري', 'A fraction as a division: terminating or recurring'),
        goal: say('Zatiki baten hamartarra zatiketaz lortzea eta zehatza edo periodikoa den bereiztea.', 'Obtener el decimal de una fracción dividiendo y distinguir si es exacto o periódico.', 'الحصول على العدد العشري لكسر بالقسمة وتمييز كونه منتهيًا أو دوريًا.', 'Find the decimal form of a fraction by dividing and tell whether it is terminating or recurring.'),
        needs: [{ unit: 'dbh1/zatikiak', topic: 'division', title: { eu: 'Zatikia zatiketa gisa', es: 'La fracción como división', en: 'A fraction as a division', ar: 'الكسر قسمةً' } }],
        problem: say('$\\frac{11}{6}$ zehatza ala periodikoa da?', '¿$\\frac{11}{6}$ es exacto o periódico?', 'هل $\\frac{11}{6}$ منتهٍ أم دوري؟', 'Is $\\frac{11}{6}$ terminating or recurring?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu: 11 : 6 = 1, hondarra 5.', 'Divide: 11 : 6 = 1, resto 5.', 'اقسم: 11 : 6 = 1، والباقي 5.', 'Divide: 11 : 6 = 1, remainder 5.') },
            { text: say('Jaitsi zero bat: 50 : 6 = 8, hondarra 2.', 'Baja un cero: 50 : 6 = 8, resto 2.', 'أنزل صفرًا: 50 : 6 = 8، والباقي 2.', 'Bring down a zero: 50 : 6 = 8, remainder 2.') },
            { text: say('20 : 6 = 3, hondarra 2… eta berriro 2: 3 zifra errepikatzen da.', '20 : 6 = 3, resto 2… y otra vez 2: el 3 se repite.', '20 : 6 = 3، والباقي 2… ثم 2 مرة أخرى: يتكرّر الرقم 3.', '20 : 6 = 3, remainder 2… and again 2: the 3 repeats.'), math: same('$\\frac{11}{6}=1{,}8333\\ldots=1{,}8\\overline{3}$') }
        ],
        takeaway: say('Hondarra 0 → zehatza; hondarrak errepikatzen dira → periodikoa.', 'Resto 0 → exacto; los restos se repiten → periódico.', 'الباقي 0 ← منتهٍ؛ البواقي تتكرّر ← دوري.', 'Remainder 0 → terminating; remainders repeat → recurring.'),
        figure: (language) => <DivisionKindsFigure language={language} />
    },
    {
        id: 'rounding',
        stage: 'fractions',
        title: say('Hamartarrak biribildu', 'Redondear decimales', 'تقريب الأعداد العشرية', 'Rounding decimals'),
        goal: say('Hamartar bat unitateetara, hamarrenetara edo ehunenetara biribiltzea.', 'Redondear un decimal a las unidades, a las décimas o a las centésimas.', 'تقريب عدد عشري إلى الآحاد أو الأعشار أو الأجزاء من مئة.', 'Round a decimal to the nearest whole number, tenth or hundredth.'),
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'rounding', title: { eu: 'Biribiltzea', es: 'El redondeo', en: 'Rounding', ar: 'التقريب' } }],
        problem: say('Biribildu $2{,}726$ hamarrenetara eta ehunenetara.', 'Redondea $2{,}726$ a las décimas y a las centésimas.', 'قرّب $2{,}726$ إلى الأعشار وإلى الأجزاء من مئة.', 'Round $2{,}726$ to the tenths and to the hundredths.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hamarrenetara: hurrengo zifra 2 da, 5 baino txikiagoa.', 'A las décimas: la cifra siguiente es 2, menor que 5.', 'إلى الأعشار: الرقم التالي 2، وهو أصغر من 5.', 'To the tenths: the next digit is 2, less than 5.'), math: same('$2{,}726\\approx 2{,}7$') },
            { text: say('Ehunenetara: hurrengo zifra 6 da, 5 edo handiagoa.', 'A las centésimas: la cifra siguiente es 6, 5 o mayor.', 'إلى الأجزاء من مئة: الرقم التالي 6، وهو 5 أو أكبر.', 'To the hundredths: the next digit is 6, which is 5 or more.'), math: same('$2{,}726\\approx 2{,}73$') }
        ],
        takeaway: say('Hurrengo zifra 0–4: utzi; 5–9: gehitu bat.', 'Cifra siguiente 0–4: se deja; 5–9: se suma uno.', 'الرقم التالي 0–4: نترك؛ 5–9: نضيف واحدًا.', 'Next digit 0–4: leave it; 5–9: add one.'),
        figure: (language) => <RoundingFigure language={language} />
    },

    /* ---------- 4. Add, subtract and multiply ---------- */
    {
        id: 'add-sub',
        stage: 'operations',
        title: say('Hamartarrak batu eta kendu', 'Sumar y restar decimales', 'جمع الأعداد العشرية وطرحها', 'Adding and subtracting decimals'),
        goal: say('Hamartarrak zutabean batzea eta kentzea, komak lerrokatuta.', 'Sumar y restar decimales en columna, con las comas alineadas.', 'جمع الأعداد العشرية وطرحها عموديًا مع محاذاة الفواصل.', 'Add and subtract decimals in columns, with the decimal points lined up.'),
        problem: say('Bi kamioi daude: batek $16{,}3$ m ditu eta besteak $12{,}98$ m. Zenbateko aldea dago?', 'Hay dos camiones: uno mide $16{,}3$ m y el otro $12{,}98$ m. ¿Qué diferencia hay?', 'هناك شاحنتان: طول الأولى $16{,}3$ م والثانية $12{,}98$ م. كم الفرق بينهما؟', 'There are two lorries: one is $16{,}3$ m long and the other is $12{,}98$ m. What is the difference?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Komak lerrokatu eta zero bat gehitu.', 'Alinea las comas y añade un cero.', 'حاذِ الفاصلتين وأضف صفرًا.', 'Line up the decimal points and add a zero.'), math: same('$16{,}30-12{,}98$') },
            { text: say('Kendu zenbaki arruntak bezala: 1630 − 1298 = 332.', 'Resta como con naturales: 1630 − 1298 = 332.', 'اطرح كما في الأعداد الطبيعية: 1630 − 1298 = 332.', 'Subtract as with natural numbers: 1630 − 1298 = 332.') },
            { text: say('Koma toki berean: bi zifra hamartar.', 'La coma en el mismo lugar: dos cifras decimales.', 'الفاصلة في المكان نفسه: رقمان عشريان.', 'The decimal point in the same place: two decimal places.'), math: same('$16{,}30-12{,}98=3{,}32$') }
        ],
        takeaway: say('Koma komaren azpian, zeroak bete, eta zenbaki arruntak bezala.', 'Coma bajo coma, rellena con ceros y como con naturales.', 'فاصلة تحت فاصلة، أكمل بالأصفار، ثم كما في الأعداد الطبيعية.', 'Decimal point under decimal point, fill in with zeros and work as with natural numbers.'),
        figure: (language) => <ColumnAddFigure language={language} />
    },
    {
        id: 'multiply',
        stage: 'operations',
        title: say('Hamartarrak biderkatu', 'Multiplicar decimales', 'ضرب الأعداد العشرية', 'Multiplying decimals'),
        goal: say('Bi hamartar biderkatzea eta emaitzan koma behar den tokian jartzea.', 'Multiplicar dos decimales y colocar la coma en el resultado.', 'ضرب عددين عشريين ووضع الفاصلة في مكانها من الناتج.', 'Multiply two decimals and place the decimal point in the answer.'),
        problem: say('Kalkulatu $3{,}64\\cdot 1{,}23$, jakinda $364\\cdot 123=44772$.', 'Calcula $3{,}64\\cdot 1{,}23$ sabiendo que $364\\cdot 123=44772$.', 'احسب $3{,}64\\cdot 1{,}23$ علمًا أن $364\\cdot 123=44772$.', 'Work out $3{,}64\\cdot 1{,}23$ knowing that $364\\cdot 123=44772$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zifra hamartarrak: 2 eta 2, guztira 4.', 'Cifras decimales: 2 y 2, en total 4.', 'الأرقام العشرية: 2 و2، المجموع 4.', 'Decimal places: 2 and 2, so 4 in total.') },
            { text: say('Lau toki eskuinetik.', 'Cuatro lugares desde la derecha.', 'أربع منازل من اليمين.', 'Four places from the right.'), math: same('$3{,}64\\cdot 1{,}23=4{,}4772$') }
        ],
        takeaway: say('Biderkatu komarik gabe; emaitzak bi faktoreen zifra hamartar guztiak ditu.', 'Multiplica sin coma; el resultado lleva las cifras decimales de los dos factores.', 'اضرب بلا فاصلة؛ وللناتج مجموع الأرقام العشرية للعاملين.', 'Multiply without the decimal point; the result has all the decimal places of both factors.'),
        figure: (language) => <MultiplyFigure language={language} />
    },
    {
        id: 'powers-of-ten',
        stage: 'operations',
        title: say('10, 100 eta 1000 zenbakiez biderkatu eta zatitu', 'Multiplicar y dividir por 10, 100 y 1000', 'الضرب والقسمة على 10 و100 و1000', 'Multiplying and dividing by 10, 100 and 1000'),
        goal: say('Koma mugituz 10, 100 eta 1000 zenbakiez buruz biderkatzea eta zatitzea.', 'Multiplicar y dividir de memoria por 10, 100 y 1000 moviendo la coma.', 'الضرب والقسمة ذهنيًا على 10 و100 و1000 بتحريك الفاصلة.', 'Multiply and divide by 10, 100 and 1000 in your head by moving the decimal point.'),
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'powers-of-ten', title: { eu: '10 oinarriko berreturak', es: 'Potencias de base 10', en: 'Powers of 10', ar: 'قوى العدد 10' } }],
        stepsKind: 'facts',
        steps: [
            { title: say('Bider 10, 100, 1000', 'Por 10, 100, 1000', 'الضرب في 10، 100، 1000', 'Times 10, 100, 1000'), text: say('Koma eskuinera, zeroak adina toki.', 'La coma a la derecha, tantos lugares como ceros.', 'الفاصلة إلى اليمين بعدد الأصفار.', 'The decimal point moves right, as many places as there are zeros.'), math: same('$78{,}562\\cdot 100=7856{,}2$') },
            { title: say('Zati 10, 100, 1000', 'Entre 10, 100, 1000', 'القسمة على 10، 100، 1000', 'Divided by 10, 100, 1000'), text: say('Koma ezkerrera, zeroak adina toki.', 'La coma a la izquierda, tantos lugares como ceros.', 'الفاصلة إلى اليسار بعدد الأصفار.', 'The decimal point moves left, as many places as there are zeros.'), math: same('$5{,}7\\mathbin{:}100=0{,}057$') },
            { title: say('Zero gehiagorekin', 'Con más ceros', 'مع أصفار أخرى', 'With more zeros'), text: say('$8{,}56\\cdot 200$: lehenik $\\cdot 2$, gero $\\cdot 100$.', '$8{,}56\\cdot 200$: primero $\\cdot 2$, luego $\\cdot 100$.', '$8{,}56\\cdot 200$: أولًا $\\cdot 2$ ثم $\\cdot 100$.', '$8{,}56\\cdot 200$: first $\\cdot 2$, then $\\cdot 100$.'), math: same('$8{,}56\\cdot 2=17{,}12\\ \\to\\ 17{,}12\\cdot 100=1712$') }
        ],
        takeaway: say('Bider: koma eskuinera. Zati: koma ezkerrera. Zero bakoitzeko, toki bat.', 'Por: la coma a la derecha. Entre: a la izquierda. Un lugar por cada cero.', 'الضرب: الفاصلة يمينًا. القسمة: يسارًا. منزلة لكل صفر.', 'Times: the decimal point moves right. Divided by: left. One place for each zero.'),
        figure: (language) => <ShiftFigure language={language} />
    },

    /* ---------- 5. Division and problems ---------- */
    {
        id: 'divide-natural',
        stage: 'division',
        title: say('Zatiketa hamartarra: zatitzailea zenbaki arrunta', 'División decimal: divisor natural', 'القسمة العشرية: المقسوم عليه عدد طبيعي', 'Decimal division: natural-number divisor'),
        goal: say('Zatidura hamartarra lortzea zatitzailea zenbaki arrunta denean, eta zatidura hurbiltzea.', 'Obtener el cociente decimal cuando el divisor es natural, y aproximar el cociente.', 'الحصول على ناتج قسمة عشري حين يكون المقسوم عليه عددًا طبيعيًا، وتقريب الناتج.', 'Find the decimal quotient when the divisor is a natural number, and approximate the quotient.'),
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'divide', title: { eu: 'Zatiketa', es: 'La división', en: 'Division', ar: 'القسمة' } }],
        problem: say('Lau lagunek $156{,}34$ € bildu dituzte, denek kopuru bera jarrita. Zenbat jarri du bakoitzak?', 'Cuatro amigos han reunido $156{,}34$ €, todos con la misma cantidad. ¿Cuánto ha puesto cada uno?', 'جمع أربعة أصدقاء $156{,}34$ € بالتساوي. كم دفع كل واحد؟', 'Four friends have pooled €$156{,}34$, each putting in the same amount. How much did each one put in?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati osoa: 156 : 4 = 39, hondarra 0.', 'Parte entera: 156 : 4 = 39, resto 0.', 'الجزء الصحيح: 156 : 4 = 39، والباقي 0.', 'Whole part: 156 : 4 = 39, remainder 0.') },
            { text: say('Jaitsi 3 zifra eta jarri koma: 3 : 4 = 0, hondarra 3.', 'Baja el 3 y pon la coma: 3 : 4 = 0, resto 3.', 'أنزل 3 وضع الفاصلة: 3 : 4 = 0، والباقي 3.', 'Bring down the 3 and put in the decimal point: 3 : 4 = 0, remainder 3.') },
            { text: say('Jaitsi 4 zifra: 34 : 4 = 8, hondarra 2; zero bat: 20 : 4 = 5.', 'Baja el 4: 34 : 4 = 8, resto 2; un cero: 20 : 4 = 5.', 'أنزل 4: 34 : 4 = 8، والباقي 2؛ وصفرًا: 20 : 4 = 5.', 'Bring down the 4: 34 : 4 = 8, remainder 2; bring down a zero: 20 : 4 = 5.'), math: same('$156{,}34\\mathbin{:}4=39{,}085$') }
        ],
        takeaway: say('Zero bat jaitsi eta koma zatiduran: zatiketa hamartarra.', 'Bajar un cero y poner la coma en el cociente: división decimal.', 'إنزال صفر ووضع الفاصلة في الناتج: القسمة العشرية.', 'Bring down a zero and put the decimal point in the quotient: decimal division.'),
        figure: (language) => <DivideNaturalFigure language={language} />
    },
    {
        id: 'divide-decimal',
        stage: 'division',
        title: say('Zatitzailea hamartarra denean', 'Cuando el divisor es decimal', 'حين يكون المقسوم عليه عشريًا', 'When the divisor is a decimal'),
        goal: say('Zatitzailearen koma kentzea, zatikizuna eta zatitzailea 10, 100… zenbakiez biderkatuz.', 'Quitar la coma del divisor multiplicando dividendo y divisor por 10, 100…', 'حذف فاصلة المقسوم عليه بضرب المقسوم والمقسوم عليه في 10 أو 100…', 'Remove the decimal point from the divisor by multiplying the dividend and the divisor by 10, 100…'),
        problem: say('Festa batean $9{,}5$ l freskagarri daude, eta edalontziek $0{,}25$ l hartzen dute. Zenbat edalontzi bete daitezke?', 'En una fiesta hay $9{,}5$ l de refresco y los vasos tienen $0{,}25$ l de capacidad. ¿Cuántos vasos se llenan?', 'في حفلة $9{,}5$ لتر من المشروب، وسعة الكأس $0{,}25$ لتر. كم كأسًا تُملأ؟', 'At a party there is $9{,}5$ l of soft drink, and each glass holds $0{,}25$ l. How many glasses can be filled?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitzaileak bi zifra hamartar ditu: biak 100 zenbakiaz.', 'El divisor tiene dos cifras decimales: los dos por 100.', 'للمقسوم عليه رقمان عشريان: نضرب الاثنين في 100.', 'The divisor has two decimal places: multiply both by 100.'), math: same('$9{,}5\\mathbin{:}0{,}25=950\\mathbin{:}25$') },
            { text: say('Zatitu zenbaki arruntak.', 'Divide los naturales.', 'اقسم العددين الطبيعيين.', 'Divide the natural numbers.'), math: same('$950\\mathbin{:}25=38$') }
        ],
        takeaway: say('Zatitzailearen koma kendu: biak 10, 100 edo 1000 zenbakiaz biderkatu.', 'Quita la coma del divisor: multiplica los dos por 10, 100, 1000.', 'احذف فاصلة المقسوم عليه: اضرب الاثنين في 10 أو 100 أو 1000.', 'Remove the decimal point from the divisor: multiply both by 10, 100 or 1000.'),
        figure: (language) => <DivideDecimalFigure language={language} />
    },
    {
        id: 'problems',
        stage: 'division',
        title: say('Eragiketa konbinatuak eta problemak', 'Operaciones combinadas y problemas', 'العمليات المركّبة والمسائل', 'Combined operations and problems'),
        goal: say('Hamartarrekin eragiketa konbinatuak eta eguneroko problemak ebaztea.', 'Resolver operaciones combinadas y problemas cotidianos con decimales.', 'حلّ عمليات مركّبة ومسائل يومية بالأعداد العشرية.', 'Solve combined operations and everyday problems with decimals.'),
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'hierarchy', title: { eu: 'Eragiketen hierarkia', es: 'La jerarquía de las operaciones', en: 'Order of operations', ar: 'أولوية العمليات' } }],
        problem: say('Kalkulatu $4{,}2-0{,}2\\cdot(5-0{,}6)$.', 'Calcula $4{,}2-0{,}2\\cdot(5-0{,}6)$.', 'احسب $4{,}2-0{,}2\\cdot(5-0{,}6)$.', 'Work out $4{,}2-0{,}2\\cdot(5-0{,}6)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Parentesia.', 'El paréntesis.', 'القوس.', 'The brackets.'), math: same('$5-0{,}6=4{,}4$') },
            { text: say('Biderketa.', 'La multiplicación.', 'الضرب.', 'The multiplication.'), math: same('$0{,}2\\cdot 4{,}4=0{,}88$') },
            { text: say('Kenketa.', 'La resta.', 'الطرح.', 'The subtraction.'), math: same('$4{,}2-0{,}88=3{,}32$') }
        ],
        takeaway: say('Parentesiak, biderketak eta zatiketak, batuketak eta kenketak; eurotan, ehunenetara.', 'Paréntesis, multiplicaciones y divisiones, sumas y restas; en euros, a las centésimas.', 'الأقواس ثم الضرب والقسمة ثم الجمع والطرح؛ وباليورو إلى الأجزاء من مئة.', 'Brackets, multiplications and divisions, additions and subtractions; in euros, to the nearest cent.'),
        figure: (language) => <ShoppingFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const decimalsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...decimalsLessonTexts[topic.id as DecimalsTopicId], ...decimalsLessonChecks[topic.id as DecimalsTopicId] }))

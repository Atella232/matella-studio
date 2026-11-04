import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { DistributiveFigure, DivisionFigure, DpeFigure, NumberLineJumpsFigure, PeriodsFigure, PlaceValueFigure, PowerFigure, RomanFigure, RoundingFigure, SemaphoreFigure } from './figures'
import { naturalsLessonChecks, type NaturalsTopicId } from './lessonChecks'
import { naturalsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Zenbaki naturalak · 1. DBH — stages and lessons
   Sequence follows the class textbook (Santillana 1.º ESO, unit 1: decimal
   system, operations, combined operations, powers) completed with Anaya
   unit 1 (Roman numerals, large numbers, rounding, properties) and the
   Basque class guide "Zenbaki arruntak eta hamartarrak" (jumps on the
   number line, the "semaforoa" for combined operations and the D-P-E
   structure for problems). Decimals are a separate unit.
   Large numbers group their digits with a space from five digits (15 728,
   but 2918). What each lesson tells lives in lessonTexts.ts; its typical
   mistake and «Check it» question, in lessonChecks.ts.
   ========================================================================== */

export type NaturalsStageId = 'numbering' | 'rounding' | 'operations' | 'combined' | 'powers'

/** Keeps an expression left-to-right inside Arabic text */
const ltr = (text: string) => `⁦${text}⁩`

export const naturalsStages: UnitStage[] = [
    { id: 'numbering', tone: 'blue', title: { eu: 'Sistema hamartarra', es: 'El sistema decimal', en: 'The decimal system', ar: 'النظام العشري' } },
    { id: 'rounding', tone: 'violet', title: { eu: 'Biribiltzea eta estimazioa', es: 'Redondeo y estimación', en: 'Rounding and estimation', ar: 'التقريب والتقدير' } },
    { id: 'operations', tone: 'mustard', title: { eu: 'Oinarrizko eragiketak', es: 'Operaciones básicas', en: 'Basic operations', ar: 'العمليات الأساسية' } },
    { id: 'combined', tone: 'coral', title: { eu: 'Hierarkia eta buruketak', es: 'Jerarquía y problemas', en: 'Order of operations and word problems', ar: 'الأولوية والمسائل' } },
    { id: 'powers', tone: 'green', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'place-value',
        stage: 'numbering',
        title: { eu: 'Sistema hamartarra eta posizioa', es: 'El sistema de numeración decimal', en: 'The decimal number system', ar: 'نظام العدّ العشري' },
        goal: {
            eu: 'Zifra bakoitzaren balioa haren posizioaren arabera jakitea eta zenbakiak deskonposatzea.',
            es: 'Saber el valor de cada cifra según su posición y descomponer números.',
            en: 'Know the value of each digit according to its position, and break numbers down.',
            ar: 'معرفة قيمة كل رقم حسب موقعه وتفكيك الأعداد.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Hamarna osatzen dute', es: 'De diez en diez', en: 'Counting in tens', ar: 'كل عشرة تكوّن واحدًا' },
                text: { eu: '10 unitate = hamarreko 1; 10 hamarreko = ehuneko 1; 10 ehuneko = milako 1.', es: '10 unidades = 1 decena; 10 decenas = 1 centena; 10 centenas = 1 unidad de millar.', en: '10 units = 1 ten; 10 tens = 1 hundred; 10 hundreds = 1 thousand.', ar: '10 آحاد = عشرة واحدة؛ 10 عشرات = مئة واحدة؛ 10 مئات = ألف واحد.' },
                math: '$10\\cdot 10\\cdot 10=1000$'
            },
            {
                title: { eu: 'Zifraren balioa', es: 'El valor de una cifra', en: 'The value of a digit', ar: 'قيمة الرقم' },
                text: { eu: '7 zifrak 700 balio du 15\u00a0728 zenbakian (ehunekoak), baina 7 bakarrik 1967 zenbakian (unitateak).', es: 'La cifra 7 vale 700 en 15\u00a0728 (centenas), pero solo 7 en 1967 (unidades).', en: 'The digit 7 is worth 700 in 15,728 (hundreds), but only 7 in 1,967 (units).', ar: `الرقم 7 قيمته 700 في ${ltr('15\u00a0728')} (مئات)، لكن قيمته 7 فقط في ${ltr('1967')} (آحاد).` },
                math: '$15\\,\\underline{7}28 \\to 700 \\qquad 196\\underline{7} \\to 7$'
            },
            {
                title: { eu: 'Deskonposizio polinomikoa', es: 'Descomposición polinómica', en: 'Expanded form', ar: 'التفكيك' },
                text: { eu: 'Zenbakia zifra bakoitzaren balioen batura gisa idazten da.', es: 'El número se escribe como la suma de los valores de sus cifras.', en: 'The number is written as the sum of the values of its digits.', ar: 'نكتب العدد مجموعًا لقيم أرقامه.' },
                math: '$4321=4000+300+20+1$'
            },
            {
                title: { eu: 'Zero bat eskuinean', es: 'Un cero a la derecha', en: 'A zero on the right', ar: 'صفر على اليمين' },
                text: { eu: 'Zenbaki baten eskuinean zero bat idaztean, haren balioa 10 zenbakiaz biderkatzen da. Ezkerrean idaztean, ez da aldatzen.', es: 'Al añadir un cero a la derecha de un número, su valor se multiplica por 10. A la izquierda, no cambia.', en: 'When you add a zero to the right of a number, its value is multiplied by 10. Adding a zero on the left does not change it.', ar: 'عند إضافة صفر على يمين العدد تُضرب قيمته في 10. وعلى اليسار لا تتغير.' },
                math: '$57 \\to 570 \\qquad 057=57$'
            }
        ],
        takeaway: {
            eu: 'Zifra bera, posizio desberdina, balio desberdina.',
            es: 'Misma cifra, distinta posición, distinto valor.',
            en: 'Same digit, different position, different value.',
            ar: 'الرقم نفسه في موقع مختلف له قيمة مختلفة.'
        },
        figure: (language) => <PlaceValueFigure language={language} />
    },
    {
        id: 'big-numbers',
        stage: 'numbering',
        title: { eu: 'Zenbaki handiak', es: 'Los números grandes', en: 'Large numbers', ar: 'الأعداد الكبيرة' },
        goal: {
            eu: 'Milioiak, mila milioiak eta bilioiak irakurtzea eta idaztea.',
            es: 'Leer y escribir millones, miles de millones y billones.',
            en: 'Read and write millions, billions and trillions.',
            ar: 'قراءة الملايين والمليارات والتريليونات وكتابتها.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Milioi bat', es: 'Un millón', en: 'One million', ar: 'مليون' },
                text: { eu: 'Mila milako: 1 eta 6 zero.', es: 'Mil millares: un 1 y 6 ceros.', en: 'A thousand thousands: a 1 followed by 6 zeros.', ar: 'ألف ألف: 1 و6 أصفار.' },
                math: '$1\\,000\\,000$'
            },
            {
                title: { eu: 'Mila milioi', es: 'Mil millones', en: 'One billion', ar: 'مليار' },
                text: { eu: '1 eta 9 zero. Gaztelaniaz «millardo» ere esaten zaio.', es: 'Un 1 y 9 ceros. También se llama millardo.', en: 'A 1 followed by 9 zeros. It is also called a milliard.', ar: '1 و9 أصفار. ويسمّى بالإسبانية «ألف مليون».' },
                math: '$1\\,000\\,000\\,000$'
            },
            {
                title: { eu: 'Bilioi bat', es: 'Un billón', en: 'One trillion', ar: 'تريليون' },
                text: { eu: 'Milioi bat milioi: 1 eta 12 zero.', es: 'Un millón de millones: un 1 y 12 ceros.', en: 'A million million: a 1 followed by 12 zeros.', ar: 'مليون مليون: 1 و12 صفرًا.' },
                math: '$1\\,000\\,000\\,000\\,000$'
            },
            {
                title: { eu: 'Nola irakurri', es: 'Cómo se lee', en: 'How to read it', ar: 'كيف نقرأ' },
                text: { eu: '28\u00a0350\u00a0000: hogeita zortzi milioi hirurehun eta berrogeita hamar mila.', es: '28\u00a0350\u00a0000: veintiocho millones trescientos cincuenta mil.', en: '28,350,000: twenty-eight million three hundred and fifty thousand.', ar: `${ltr('28\u00a0350\u00a0000')}: ثمانية وعشرون مليونًا وثلاثمائة وخمسون ألفًا.` }
            }
        ],
        takeaway: {
            eu: 'Hiruko taldeak eskuinetik: unitateak, milakoak, milioiak, mila milioiak, bilioiak.',
            es: 'Grupos de tres desde la derecha: unidades, millares, millones, miles de millones, billones.',
            en: 'Groups of three from the right: units, thousands, millions, billions, trillions.',
            ar: 'مجموعات من ثلاثة من اليمين: آحاد، آلاف، ملايين، مليارات، تريليونات.'
        },
        figure: (language) => <PeriodsFigure language={language} />
    },
    {
        id: 'order',
        stage: 'numbering',
        title: { eu: 'Ordenatu eta zuzenean kokatu', es: 'Ordenar y situar en la recta', en: 'Ordering and placing on the number line', ar: 'الترتيب والتمثيل على المستقيم' },
        goal: {
            eu: 'Zenbaki naturalak konparatzea, ordenatzea eta zuzen zenbakidunean kokatzea.',
            es: 'Comparar y ordenar números naturales y situarlos en la recta numérica.',
            en: 'Compare and order natural numbers and place them on the number line.',
            ar: 'مقارنة الأعداد الطبيعية وترتيبها وتمثيلها على مستقيم الأعداد.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Zifra kopurua', es: 'Número de cifras', en: 'Number of digits', ar: 'عدد الأرقام' },
                text: { eu: '75\u00a0460 zenbakiak bost zifra ditu eta 8990 zenbakiak lau: lehena handiagoa da.', es: '75\u00a0460 tiene cinco cifras y 8990 tiene cuatro: el primero es mayor.', en: '75,460 has five digits and 8,990 has four: the first one is bigger.', ar: `للعدد ${ltr('75\u00a0460')} خمسة أرقام وللعدد ${ltr('8990')} أربعة: الأول أكبر.` },
                math: '$75\\,460>8990$'
            },
            {
                title: { eu: 'Ezkerretik eskuinera', es: 'De izquierda a derecha', en: 'From left to right', ar: 'من اليسار إلى اليمين' },
                text: { eu: '318 eta 316: 3 eta 1 berdinak dira; 8 handiagoa da 6 baino.', es: '318 y 316: el 3 y el 1 coinciden; 8 es mayor que 6.', en: '318 and 316: the 3 and the 1 match; 8 is bigger than 6.', ar: '318 و316: الرقمان 3 و1 متساويان؛ و8 أكبر من 6.' },
                math: '$318>316$'
            },
            {
                title: { eu: 'Zuzeneko saltoak', es: 'Saltos en la recta', en: 'Jumps on the number line', ar: 'القفزات على المستقيم' },
                text: { eu: 'Zuzenean bi zenbaki ezagun badaude, kalkulatu haien arteko distantzia eta zatitu salto kopuruarekin. 430 zenbakitik 830 zenbakira 4 salto daude: salto bakoitza 100 da.', es: 'Si en la recta hay dos números conocidos, calcula la distancia entre ellos y divídela entre el número de saltos. De 430 a 830 hay 4 saltos: cada salto vale 100.', en: 'If there are two known numbers on the number line, work out the distance between them and divide it by the number of jumps. From 430 to 830 there are 4 jumps: each jump is worth 100.', ar: 'إذا عرفنا عددين على المستقيم نحسب المسافة بينهما ونقسمها على عدد القفزات. من 430 إلى 830 توجد 4 قفزات: كل قفزة تساوي 100.' },
                math: '$(830-430)\\mathbin{:}4=100$'
            }
        ],
        takeaway: {
            eu: 'Zifra gehiago → zenbaki handiagoa. Berdin badira, ezkerreko lehen zifra desberdinak erabakitzen du.',
            es: 'Más cifras → número mayor. Si empatan, decide la primera cifra distinta por la izquierda.',
            en: 'More digits → bigger number. If they have the same number of digits, the first different digit from the left decides.',
            ar: 'أرقام أكثر ← عدد أكبر. وعند التساوي يحسم أول رقم مختلف من اليسار.'
        },
        figure: (language) => <NumberLineJumpsFigure language={language} />
    },
    {
        id: 'roman',
        stage: 'numbering',
        title: { eu: 'Erromatar zenbakiak', es: 'Los números romanos', en: 'Roman numerals', ar: 'الأرقام الرومانية' },
        goal: {
            eu: 'Erromatar zenbakiak irakurtzea eta idaztea, eta sistema batukorra posizionaletik bereiztea.',
            es: 'Leer y escribir números romanos y distinguir un sistema aditivo de uno posicional.',
            en: 'Read and write Roman numerals, and tell an additive system apart from a positional one.',
            ar: 'قراءة الأرقام الرومانية وكتابتها، والتمييز بين النظام الجمعي والنظام الموضعي.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Batu', es: 'Se suma', en: 'Add', ar: 'نجمع' },
                text: { eu: 'Ikur bat bere berdina edo handiagoa den baten eskuinean badago, batu egiten da.', es: 'Un símbolo a la derecha de otro igual o mayor se suma.', en: 'A symbol to the right of an equal or bigger symbol is added.', ar: 'الرمز الموجود يمين رمز مساوٍ له أو أكبر منه يُجمع.' },
                math: '$\\mathrm{XVI}=10+5+1=16$'
            },
            {
                title: { eu: 'Kendu', es: 'Se resta', en: 'Subtract', ar: 'نطرح' },
                text: { eu: 'I, X edo C ikur handiago baten ezkerrean badago, kendu egiten da: IV, IX, XL, XC, CD, CM.', es: 'I, X o C a la izquierda de un símbolo mayor se restan: IV, IX, XL, XC, CD, CM.', en: 'I, X or C to the left of a bigger symbol are subtracted: IV, IX, XL, XC, CD, CM.', ar: `إذا جاء I أو X أو C يسار رمز أكبر منه يُطرح: ${ltr('IV, IX, XL, XC, CD, CM')}.` },
                math: '$\\mathrm{XC}=100-10=90$'
            },
            {
                title: { eu: 'Hiru aldiz gehienez', es: 'Como mucho tres veces', en: 'At most three times', ar: 'ثلاث مرات على الأكثر' },
                text: { eu: 'I, X, C eta M hiru aldiz errepika daitezke gehienez; V, L eta D ez dira errepikatzen.', es: 'I, X, C y M se pueden repetir como mucho tres veces; V, L y D no se repiten.', en: 'I, X, C and M can be repeated at most three times; V, L and D cannot be repeated.', ar: 'يمكن تكرار I وX وC وM ثلاث مرات على الأكثر؛ ولا تتكرر V وL وD.' },
                math: '$\\mathrm{XXX}=30 \\qquad \\mathrm{XL}=40$'
            },
            {
                title: { eu: 'Marra gainean', es: 'Una raya encima', en: 'A bar above', ar: 'خط فوق الرمز' },
                text: { eu: 'Ikur baten gaineko marrak haren balioa 1000 zenbakiaz biderkatzen du.', es: 'Una raya encima de un símbolo multiplica su valor por 1000.', en: 'A bar above a symbol multiplies its value by 1,000.', ar: `الخط فوق الرمز يضرب قيمته في ${ltr('1000')}.` },
                math: '$\\overline{\\mathrm{V}}=5000$'
            }
        ],
        takeaway: {
            eu: 'Erromatarrak: ikurrak batu eta kendu. Gurea: posizioak ematen du balioa.',
            es: 'Romano: se suman y restan símbolos. El nuestro: la posición da el valor.',
            en: 'Roman: symbols are added and subtracted. Ours: the position gives the value.',
            ar: 'الروماني: نجمع الرموز ونطرحها. نظامنا: الموقع يعطي القيمة.'
        },
        figure: (language) => <RomanFigure language={language} />
    },
    {
        id: 'rounding',
        stage: 'rounding',
        title: { eu: 'Biribiltzea', es: 'El redondeo', en: 'Rounding', ar: 'التقريب' },
        goal: {
            eu: 'Zenbaki bat hamarrekoetara, ehunekoetara, milakoetara… biribiltzea.',
            es: 'Redondear un número a las decenas, centenas, millares…',
            en: 'Round a number to the nearest ten, hundred, thousand…',
            ar: 'تقريب عدد إلى العشرات أو المئات أو الآلاف…'
        },
        problem: { eu: 'Biribildu 14\u00a0823 milakoetara.', es: 'Redondea 14\u00a0823 a los millares.', en: 'Round 14,823 to the nearest thousand.', ar: `قرّب ${ltr('14\u00a0823')} إلى الآلاف.` },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Markatu biribildu beharreko zifra. Milakoetara: 4.', es: 'Marca la cifra que vas a redondear. A los millares: el 4.', en: 'Mark the digit you are going to round. To the nearest thousand: the 4.', ar: 'حدّد الرقم المراد تقريبه. إلى الآلاف: 4.' }, math: '$1\\underline{4}\\,823$' },
            { text: { eu: 'Begiratu haren eskuineko zifrari: 8.', es: 'Mira la cifra de su derecha: el 8.', en: 'Look at the digit to its right: the 8.', ar: 'انظر إلى الرقم الذي على يمينه: 8.' }, math: '$14\\,\\underline{8}23$' },
            { text: { eu: '5 edo gehiago denez, gehitu 1 milakoari.', es: 'Como es 5 o más, suma 1 a los millares.', en: 'Since it is 5 or more, add 1 to the thousands.', ar: 'بما أنه 5 أو أكثر نضيف 1 إلى الآلاف.' }, math: '$4+1=5$' },
            { text: { eu: 'Eskuineko zifrak zero bihurtu.', es: 'Convierte en ceros las cifras de la derecha.', en: 'Turn the digits on the right into zeros.', ar: 'حوّل الأرقام التي على اليمين إلى أصفار.' }, math: '$14\\,823\\approx 15\\,000$' }
        ],
        takeaway: {
            eu: 'Eskuineko zifra 5 eta 9 artean: gora. 0 eta 4 artean: bere horretan.',
            es: 'Cifra de la derecha de 5 a 9: hacia arriba. De 0 a 4: se queda igual.',
            en: 'Digit on the right from 5 to 9: round up. From 0 to 4: it stays the same.',
            ar: 'الرقم الذي على اليمين من 5 إلى 9: نرفع. من 0 إلى 4: يبقى كما هو.'
        },
        figureAfterSteps: true,
        figure: (language) => <RoundingFigure language={language} />
    },
    {
        id: 'estimation',
        stage: 'rounding',
        title: { eu: 'Emaitzak estimatzea', es: 'Estimar resultados', en: 'Estimating results', ar: 'تقدير النتائج' },
        goal: {
            eu: 'Emaitza bat gutxi gorabehera kalkulatzea eta emaitza zehatza zentzuzkoa den egiaztatzea.',
            es: 'Calcular un resultado aproximado y comprobar si el resultado exacto es razonable.',
            en: 'Work out an approximate result and check whether the exact result is reasonable.',
            ar: 'حساب نتيجة تقريبية والتحقق من أن النتيجة الدقيقة معقولة.'
        },
        problem: { eu: 'Carmenek 167 €, 235 € eta 32 € ordaindu ditu. Gutxi gorabehera, zenbat ordaindu du guztira?', es: 'Carmen ha pagado 167 €, 235 € y 32 €. ¿Cuánto ha pagado en total, aproximadamente?', en: 'Carmen has paid €167, €235 and €32. Roughly how much has she paid in total?', ar: 'دفعت كارمن 167 € و235 € و32 €. كم دفعت في المجموع تقريبًا؟' },
        stepsKind: 'steps',
        steps: [
            {
                text: { eu: 'Biribildu zenbaki bakoitza hamarrekoetara.', es: 'Redondea cada número a las decenas.', en: 'Round each number to the nearest ten.', ar: 'قرّب كل عدد إلى العشرات.' },
                math: '$167\\approx 170 \\quad 235\\approx 240 \\quad 32\\approx 30$'
            },
            { text: { eu: 'Egin eragiketa buruz.', es: 'Haz la operación mentalmente.', en: 'Do the calculation in your head.', ar: 'أجرِ العملية ذهنيًا.' }, math: '$170+240+30=440$' },
            { text: { eu: 'Konparatu emaitza zehatzarekin: oso gertu dago, beraz zentzuzkoa da.', es: 'Compara con el resultado exacto: está muy cerca, así que es razonable.', en: 'Compare with the exact result: it is very close, so it is reasonable.', ar: 'قارن مع النتيجة الدقيقة: قريبة جدًا، إذن هي معقولة.' }, math: '$167+235+32=434\\approx 440$' }
        ],
        takeaway: {
            eu: 'Biribildu, kalkulatu buruz eta egiaztatu: emaitza zehatzak gertu egon behar du.',
            es: 'Redondea, calcula mentalmente y comprueba: el resultado exacto debe estar cerca.',
            en: 'Round, work it out in your head and check: the exact result should be close.',
            ar: 'قرّب، احسب ذهنيًا، ثم تحقّق: يجب أن تكون النتيجة الدقيقة قريبة.'
        }
    },
    {
        id: 'add-subtract',
        stage: 'operations',
        title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', en: 'Addition and subtraction', ar: 'الجمع والطرح' },
        goal: {
            eu: 'Batuketaren eta kenketaren terminoak ezagutzea eta kenketa bat egiaztatzea.',
            es: 'Conocer los términos de la suma y la resta y comprobar una resta.',
            en: 'Know the terms of addition and subtraction, and check a subtraction.',
            ar: 'معرفة حدود الجمع والطرح والتحقق من صحة عملية طرح.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Batugaiak eta batura', es: 'Sumandos y suma', en: 'Addends and sum', ar: 'الحدود والمجموع' },
                text: { eu: 'Arrain-haztegi batean 24\u00a0350 eta 18\u00a0812 amuarrain sartu dituzte.', es: 'En una piscifactoría se introducen 24\u00a0350 y 18\u00a0812 truchas.', en: 'At a fish farm, 24,350 and 18,812 trout are put in.', ar: `وُضع في مزرعة أسماك ${ltr('24\u00a0350')} و${ltr('18\u00a0812')} سمكة.` },
                math: '$24\\,350+18\\,812=43\\,162$'
            },
            {
                title: { eu: 'Kenkizuna, kentzailea eta kendura', es: 'Minuendo, sustraendo y diferencia', en: 'Minuend, subtrahend and difference', ar: 'المطروح منه والمطروح والفرق' },
                text: { eu: '15\u00a0000 litroko igerileku batetik 1568 litro irten dira.', es: 'De una piscina de 15\u00a0000 litros se han salido 1568 litros.', en: 'From a 15,000-litre pool, 1,568 litres have drained out.', ar: `تسرّب ${ltr('1568')} لترًا من مسبح سعته ${ltr('15\u00a0000')} لتر.` },
                math: '$15\\,000-1568=13\\,432$'
            },
            {
                title: { eu: 'Kenketaren proba', es: 'Prueba de la resta', en: 'Checking a subtraction', ar: 'التحقق من الطرح' },
                text: { eu: 'Kentzailea + kendura = kenkizuna.', es: 'Sustraendo + diferencia = minuendo.', en: 'Subtrahend + difference = minuend.', ar: 'المطروح + الفرق = المطروح منه.' },
                math: '$1568+13\\,432=15\\,000$'
            },
            {
                title: { eu: 'Ordena ez da garrantzitsua', es: 'El orden no importa', en: 'The order does not matter', ar: 'الترتيب لا يهم' },
                text: { eu: 'Batuketan batugaien ordenak ez du emaitza aldatzen (trukatze-propietatea). Kenketan, bai.', es: 'En la suma, el orden de los sumandos no cambia el resultado (propiedad conmutativa). En la resta, sí.', en: 'When adding, the order of the addends does not change the result (commutative property). When subtracting, it does.', ar: 'في الجمع لا يغيّر ترتيب الحدود النتيجة (خاصية التبديل). أما في الطرح فيغيّرها.' },
                math: '$254+136=136+254$'
            }
        ],
        takeaway: {
            eu: 'Kenketa egiaztatzeko: kentzailea + kendura = kenkizuna.',
            es: 'Para comprobar una resta: sustraendo + diferencia = minuendo.',
            en: 'To check a subtraction: subtrahend + difference = minuend.',
            ar: 'للتحقق من الطرح: المطروح + الفرق = المطروح منه.'
        }
    },
    {
        id: 'multiply',
        stage: 'operations',
        title: { eu: 'Biderketa eta haren propietateak', es: 'La multiplicación y sus propiedades', en: 'Multiplication and its properties', ar: 'الضرب وخصائصه' },
        goal: {
            eu: 'Biderketaren propietateak ezagutzea eta buruzko kalkulurako erabiltzea.',
            es: 'Conocer las propiedades de la multiplicación y usarlas para el cálculo mental.',
            en: 'Know the properties of multiplication and use them for mental calculation.',
            ar: 'معرفة خصائص الضرب واستعمالها في الحساب الذهني.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Trukatze-propietatea', es: 'Propiedad conmutativa', en: 'Commutative property', ar: 'خاصية التبديل' },
                text: { eu: 'Biderkagaien ordenak ez du biderkadura aldatzen.', es: 'El orden de los factores no cambia el producto.', en: 'The order of the factors does not change the product.', ar: 'ترتيب العوامل لا يغيّر حاصل الضرب.' },
                math: '$6\\cdot 10=10\\cdot 6=60$'
            },
            {
                title: { eu: 'Elkartze-propietatea', es: 'Propiedad asociativa', en: 'Associative property', ar: 'خاصية التجميع' },
                text: { eu: 'Hiru biderkagai edozein modutan elkar daitezke.', es: 'Tres factores se pueden agrupar de cualquier forma.', en: 'Three factors can be grouped in any way.', ar: 'يمكن تجميع ثلاثة عوامل بأي طريقة.' },
                math: '$(6\\cdot 10)\\cdot 4=6\\cdot (10\\cdot 4)=240$'
            },
            {
                title: { eu: 'Banatze-propietatea', es: 'Propiedad distributiva', en: 'Distributive property', ar: 'خاصية التوزيع' },
                text: { eu: 'Batura bat zenbaki batez biderkatzea batugai bakoitza biderkatu eta emaitzak batzea da.', es: 'Multiplicar una suma por un número es multiplicar cada sumando y sumar los resultados.', en: 'Multiplying a sum by a number means multiplying each addend and adding the results.', ar: 'ضرب مجموع في عدد يساوي ضرب كل حد ثم جمع النتائج.' },
                math: '$6\\cdot (8+2)=6\\cdot 8+6\\cdot 2=60$'
            },
            {
                title: { eu: '10, 100, 1000 zenbakiez', es: 'Por 10, 100, 1000', en: 'By 10, 100, 1,000', ar: `في 10، 100، ${ltr('1000')}` },
                text: { eu: 'Zenbakiaren eskuinean zero bat, bi edo hiru idazten dira.', es: 'Se añaden uno, dos o tres ceros a la derecha del número.', en: 'You add one, two or three zeros to the right of the number.', ar: 'نضيف صفرًا أو صفرين أو ثلاثة أصفار على يمين العدد.' },
                math: '$15\\cdot 1000=15\\,000$'
            },
            {
                title: { eu: '9 eta 11 zenbakiez buruz', es: 'Por 9 y por 11 mentalmente', en: 'Multiplying by 9 and 11 in your head', ar: 'الضرب في 9 و11 ذهنيًا' },
                text: { eu: '9 zenbakiaz biderkatzeko: 10 zenbakiaz biderkatu eta zenbakia kendu. 11 zenbakiaz: 10 zenbakiaz biderkatu eta zenbakia batu.', es: 'Por 9: multiplica por 10 y resta el número. Por 11: multiplica por 10 y suma el número.', en: 'To multiply by 9: multiply by 10 and subtract the number. To multiply by 11: multiply by 10 and add the number.', ar: 'في 9: اضرب في 10 واطرح العدد. في 11: اضرب في 10 وأضف العدد.' },
                math: '$23\\cdot 9=230-23=207$'
            }
        ],
        takeaway: {
            eu: 'Ordenak ez du axola (trukatze), taldekatzeak ere ez (elkartze), eta biderketa batugaien artean bana daiteke (banatze).',
            es: 'El orden no importa (conmutativa), la agrupación tampoco (asociativa) y la multiplicación se reparte entre los sumandos (distributiva).',
            en: 'The order does not matter (commutative), grouping does not either (associative), and multiplication is spread across the addends (distributive).',
            ar: 'الترتيب لا يهم (التبديل)، والتجميع لا يهم (التجميع)، والضرب يتوزّع على الحدود (التوزيع).'
        },
        figure: (language) => <DistributiveFigure language={language} />
    },
    {
        id: 'divide',
        stage: 'operations',
        title: { eu: 'Zatiketa', es: 'La división', en: 'Division', ar: 'القسمة' },
        goal: {
            eu: 'Zatiketaren terminoak ezagutzea eta zatiketa bat egiaztatzea.',
            es: 'Conocer los términos de la división y comprobar una división.',
            en: 'Know the terms of division and check a division.',
            ar: 'معرفة حدود القسمة والتحقق من صحة قسمة.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Zatiketa zehatza', es: 'División exacta', en: 'Exact division', ar: 'قسمة تامة' },
                text: { eu: 'Hondarra 0 da: ez da ezer geratzen banatu gabe.', es: 'El resto es 0: no sobra nada.', en: 'The remainder is 0: nothing is left over.', ar: 'الباقي 0: لا يبقى شيء.' },
                math: '$288\\mathbin{:}24=12 \\qquad 288=24\\cdot 12$'
            },
            {
                title: { eu: 'Zatiketa osoa (ez-zehatza)', es: 'División entera (inexacta)', en: 'Division with remainder (inexact)', ar: 'قسمة غير تامة' },
                text: { eu: 'Hondarra ez da 0, eta zatitzailea baino txikiagoa da.', es: 'El resto no es 0 y es menor que el divisor.', en: 'The remainder is not 0 and it is smaller than the divisor.', ar: 'الباقي ليس 0 وهو أصغر من المقسوم عليه.' },
                math: '$96=25\\cdot 3+21 \\qquad 21<25$'
            },
            {
                title: { eu: 'Falta den terminoa', es: 'El término que falta', en: 'The missing term', ar: 'الحد الناقص' },
                text: { eu: 'Oinarrizko propietateari esker, zatikizuna kalkula daiteke zatitzailea, zatidura eta hondarra ezagututa.', es: 'Con la propiedad fundamental se puede calcular el dividendo conociendo divisor, cociente y resto.', en: 'Using the fundamental property, you can work out the dividend when you know the divisor, the quotient and the remainder.', ar: 'بفضل هذه الخاصية نحسب المقسوم إذا عرفنا المقسوم عليه وخارج القسمة والباقي.' },
                math: '$53\\cdot 15+39=834$'
            },
            {
                title: { eu: 'Ordenak axola du', es: 'El orden sí importa', en: 'The order does matter', ar: 'الترتيب مهم' },
                text: { eu: 'Zatiketak ez du ez trukatze- ez elkartze-propietaterik betetzen.', es: 'La división no cumple ni la propiedad conmutativa ni la asociativa.', en: 'Division does not have the commutative or the associative property.', ar: 'القسمة لا تحقق خاصية التبديل ولا خاصية التجميع.' },
                math: '$(36\\mathbin{:}6)\\mathbin{:}2=3 \\qquad 36\\mathbin{:}(6\\mathbin{:}2)=12$'
            }
        ],
        takeaway: {
            eu: 'Zatikizuna = zatitzailea · zatidura + hondarra, eta hondarra < zatitzailea.',
            es: 'D = d · c + r, y el resto es menor que el divisor.',
            en: 'D = d · c + r, and the remainder is smaller than the divisor.',
            ar: `${ltr('D = d · c + r')}، والباقي أصغر من المقسوم عليه.`
        },
        figure: (language) => <DivisionFigure language={language} />
    },
    {
        id: 'hierarchy',
        stage: 'combined',
        title: { eu: 'Eragiketen hierarkia', es: 'La jerarquía de las operaciones', en: 'Order of operations', ar: 'أولوية العمليات' },
        goal: {
            eu: 'Eragiketa konbinatuak ordena egokian ebaztea.',
            es: 'Resolver operaciones combinadas en el orden correcto.',
            en: 'Solve combined operations in the correct order.',
            ar: 'حل العمليات المركبة بالترتيب الصحيح.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Gorria · parentesiak', es: 'Rojo · paréntesis', en: 'Red · brackets', ar: 'الأحمر · الأقواس' },
                text: { eu: 'Parentesien barrukoa egiten da lehenik.', es: 'Primero se hace lo que hay dentro de los paréntesis.', en: 'First, do what is inside the brackets.', ar: 'نحسب أولًا ما داخل الأقواس.' },
                math: '$(15\\cdot 2)\\mathbin{:}(17-12)=30\\mathbin{:}5=6$'
            },
            {
                title: { eu: 'Horia · biderketak eta zatiketak', es: 'Amarillo · multiplicaciones y divisiones', en: 'Yellow · multiplications and divisions', ar: 'الأصفر · الضرب والقسمة' },
                text: { eu: 'Batuketen eta kenketen aurretik, agertzen diren ordenan.', es: 'Antes que las sumas y restas, en el orden en que aparecen.', en: 'Before additions and subtractions, in the order they appear.', ar: 'قبل الجمع والطرح، حسب ترتيب ظهورها.' },
                math: '$12-2\\cdot 4=12-8=4$'
            },
            {
                title: { eu: 'Berdea · batuketak eta kenketak', es: 'Verde · sumas y restas', en: 'Green · additions and subtractions', ar: 'الأخضر · الجمع والطرح' },
                text: { eu: 'Azken pausoa, ezkerretik eskuinera.', es: 'El último paso, de izquierda a derecha.', en: 'The last step, from left to right.', ar: 'الخطوة الأخيرة، من اليسار إلى اليمين.' },
                math: '$18-4-5=14-5=9$'
            },
            {
                title: { eu: 'Ohiko akatsa', es: 'Error frecuente', en: 'Common mistake', ar: 'خطأ شائع' },
                text: { eu: '8 + 5 · 2 ez da 13 · 2 = 26: biderketa lehenik.', es: '8 + 5 · 2 no es 13 · 2 = 26: primero la multiplicación.', en: '8 + 5 · 2 is not 13 · 2 = 26: do the multiplication first.', ar: `${ltr('8 + 5 · 2')} ليس ${ltr('13 · 2 = 26')}: الضرب أولًا.` },
                math: '$8+5\\cdot 2=8+10=18$'
            }
        ],
        takeaway: {
            eu: 'Gorria → horia → berdea: parentesiak, biderketak eta zatiketak, batuketak eta kenketak.',
            es: 'Rojo → amarillo → verde: paréntesis, multiplicaciones y divisiones, sumas y restas.',
            en: 'Red → yellow → green: brackets, multiplication and division, addition and subtraction.',
            ar: 'أحمر ← أصفر ← أخضر: الأقواس، ثم الضرب والقسمة، ثم الجمع والطرح.'
        },
        figure: (language) => <SemaphoreFigure language={language} />
    },
    {
        id: 'brackets',
        stage: 'combined',
        title: { eu: 'Parentesiak eta kako zuzenak', es: 'Paréntesis y corchetes', en: 'Brackets and square brackets', ar: 'الأقواس والأقواس المعقوفة' },
        goal: {
            eu: 'Parentesiek emaitza nola aldatzen duten ulertzea eta parentesi habiaratuak ebaztea.',
            es: 'Entender cómo cambian el resultado los paréntesis y resolver paréntesis dentro de corchetes.',
            en: 'Understand how brackets change the result and solve brackets inside square brackets.',
            ar: 'فهم كيف تغيّر الأقواس النتيجة وحل الأقواس داخل الأقواس المعقوفة.'
        },
        problem: { eu: 'Kalkulatu $3\\cdot [13-3\\cdot (5-2)]$.', es: 'Calcula $3\\cdot [13-3\\cdot (5-2)]$.', en: 'Calculate $3\\cdot [13-3\\cdot (5-2)]$.', ar: 'احسب $3\\cdot [13-3\\cdot (5-2)]$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Ebatzi barruko parentesia.', es: 'Resuelve el paréntesis de dentro.', en: 'Solve the inner bracket.', ar: 'حلّ القوس الداخلي.' }, math: '$3\\cdot [13-3\\cdot (5-2)]=3\\cdot [13-3\\cdot 3]$' },
            { text: { eu: 'Ebatzi kako zuzenen barrukoa, hierarkia errespetatuz: biderketa lehenik.', es: 'Resuelve lo de dentro del corchete respetando la jerarquía: primero la multiplicación.', en: 'Solve what is inside the square brackets, following the order of operations: do the multiplication first.', ar: 'حلّ ما داخل القوس المعقوف مع احترام الأولوية: الضرب أولًا.' }, math: '$=3\\cdot [13-9]=3\\cdot 4$' },
            { text: { eu: 'Egin azken eragiketa.', es: 'Haz la última operación.', en: 'Do the last operation.', ar: 'أجرِ العملية الأخيرة.' }, math: '$=12$' }
        ],
        takeaway: {
            eu: 'Barrutik kanpora: lehenik ( ), gero [ ].',
            es: 'De dentro hacia fuera: primero ( ), luego [ ].',
            en: 'From the inside out: first ( ), then [ ].',
            ar: 'من الداخل إلى الخارج: أولًا ( ) ثم [ ].'
        }
    },
    {
        id: 'problems',
        stage: 'combined',
        title: { eu: 'Buruketak: Datuak, Prozedura, Erantzuna', es: 'Problemas: Datos, Procedimiento, Respuesta', en: 'Problems: Data, Procedure, Answer', ar: 'المسائل: المعطيات، الطريقة، الجواب' },
        goal: {
            eu: 'Buruketak D-P-E egiturarekin ebaztea eta eragiketa konbinatu batean planteatzea.',
            es: 'Resolver problemas con la estructura Datos-Procedimiento-Respuesta y plantearlos en una operación combinada.',
            en: 'Solve problems with the Data-Procedure-Answer structure and set them up as one combined operation.',
            ar: 'حل المسائل ببنية المعطيات-الطريقة-الجواب وكتابتها في عملية مركبة واحدة.'
        },
        problem: { eu: 'Eraikin batek 27 solairu ditu; solairu bakoitzean 12 bizileku daude, eta bizileku bakoitzean 7 leiho. Zenbat leiho ditu eraikinak?', es: 'Un edificio tiene 27 plantas; en cada planta hay 12 viviendas, y en cada vivienda, 7 ventanas. ¿Cuántas ventanas tiene el edificio?', en: 'A building has 27 floors; each floor has 12 flats, and each flat has 7 windows. How many windows does the building have?', ar: 'في مبنى 27 طابقًا؛ في كل طابق 12 شقة، وفي كل شقة 7 نوافذ. كم نافذة في المبنى؟' },
        stepsKind: 'steps',
        steps: [
            {
                title: { eu: 'Datuak', es: 'Datos', en: 'Data', ar: 'المعطيات' },
                text: { eu: 'Atera zenbakiak: 27 solairu, 12 bizileku solairuko eta 7 leiho bizilekuko.', es: 'Saca los números: 27 plantas, 12 viviendas por planta y 7 ventanas por vivienda.', en: 'Pull out the numbers: 27 floors, 12 flats per floor and 7 windows per flat.', ar: 'استخرج الأعداد: 27 طابقًا، و12 شقة في كل طابق، و7 نوافذ في كل شقة.' }
            },
            {
                title: { eu: 'Prozedura', es: 'Procedimiento', en: 'Procedure', ar: 'الطريقة' },
                text: { eu: 'Biderkatu hiru datuak.', es: 'Multiplica los tres datos.', en: 'Multiply the three numbers.', ar: 'اضرب المعطيات الثلاثة.' },
                math: '$27\\cdot 12\\cdot 7=2268$'
            },
            {
                title: { eu: 'Erantzuna', es: 'Respuesta', en: 'Answer', ar: 'الجواب' },
                text: { eu: 'Eraikinak 2268 leiho ditu guztira.', es: 'El edificio tiene 2268 ventanas en total.', en: 'The building has 2,268 windows in total.', ar: `في المبنى ${ltr('2268')} نافذة في المجموع.` }
            }
        ],
        takeaway: {
            eu: 'D-P-E: datuak laburrean, eragiketa garbi eta erantzuna esaldi oso batean.',
            es: 'Datos breves, operación clara y respuesta en una frase completa.',
            en: 'Brief data, a clear operation and an answer in a full sentence.',
            ar: 'معطيات مختصرة، عملية واضحة، وجواب بجملة كاملة.'
        },
        figureAfterSteps: true,
        figure: (language) => <DpeFigure language={language} />
    },
    {
        id: 'powers',
        stage: 'powers',
        title: { eu: 'Berreturak', es: 'Las potencias', en: 'Powers', ar: 'القوى' },
        goal: {
            eu: 'Berretura baten oinarria eta berretzailea ezagutzea eta haren balioa kalkulatzea.',
            es: 'Reconocer la base y el exponente de una potencia y calcular su valor.',
            en: 'Recognise the base and the exponent of a power and calculate its value.',
            ar: 'التعرّف على أساس القوة وأسّها وحساب قيمتها.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Oinarria eta berretzailea', es: 'Base y exponente', en: 'Base and exponent', ar: 'الأساس والأسّ' },
                text: { eu: '4 oinarria da eta 3 berretzailea: 4 hiru aldiz biderkatzen da.', es: '4 es la base y 3 el exponente: el 4 se multiplica tres veces.', en: '4 is the base and 3 is the exponent: the 4 is multiplied three times.', ar: '4 هو الأساس و3 هو الأس: نضرب 4 ثلاث مرات.' },
                math: '$4^3=4\\cdot 4\\cdot 4=64$'
            },
            {
                title: { eu: 'Karratua eta kuboa', es: 'Cuadrado y cubo', en: 'Square and cube', ar: 'المربع والمكعب' },
                text: { eu: 'Karratu baten azalera eta kubo baten bolumena.', es: 'El área de un cuadrado y el volumen de un cubo.', en: 'The area of a square and the volume of a cube.', ar: 'مساحة مربع وحجم مكعب.' },
                math: '$5^2=25 \\qquad 2^3=8$'
            },
            {
                title: { eu: 'Kontuz', es: 'Cuidado', en: 'Be careful', ar: 'انتبه' },
                text: { eu: 'Berretura ez da oinarria bider berretzailea: 3⁴ ez da 3 · 4 = 12.', es: 'Una potencia no es base por exponente: 3⁴ no es 3 · 4 = 12.', en: 'A power is not the base multiplied by the exponent: 3⁴ is not 3 · 4 = 12.', ar: `القوة ليست الأساس مضروبًا في الأس: ${ltr('3⁴')} ليست ${ltr('3 · 4 = 12')}.` },
                math: '$3^4=3\\cdot 3\\cdot 3\\cdot 3=81$'
            },
            {
                title: { eu: 'Oinarri bereko biderketa', es: 'Producto de igual base', en: 'Multiplying powers with the same base', ar: 'ضرب قوى لها الأساس نفسه' },
                text: { eu: 'Oinarria mantendu eta berretzaileak batu.', es: 'Se deja la misma base y se suman los exponentes.', en: 'Keep the same base and add the exponents.', ar: 'نُبقي الأساس نفسه ونجمع الأسس.' },
                math: '$2^3\\cdot 2^2=2^{3+2}=2^5=32$'
            }
        ],
        takeaway: {
            eu: 'Oinarria: zer biderkatzen den. Berretzailea: zenbat aldiz.',
            es: 'La base: qué se multiplica. El exponente: cuántas veces.',
            en: 'The base: what is multiplied. The exponent: how many times.',
            ar: 'الأساس: ماذا نضرب. الأسّ: كم مرة.'
        },
        figure: (language) => <PowerFigure language={language} />
    },
    {
        id: 'powers-of-ten',
        stage: 'powers',
        title: { eu: '10 oinarriko berreturak', es: 'Potencias de base 10', en: 'Powers of 10', ar: 'قوى العدد 10' },
        goal: {
            eu: '10 oinarriko berreturak kalkulatzea eta zenbaki handiak haiekin labur idaztea.',
            es: 'Calcular potencias de base 10 y usarlas para escribir números grandes de forma abreviada.',
            en: 'Calculate powers of 10 and use them to write large numbers in a shorter form.',
            ar: 'حساب قوى العدد 10 واستعمالها لكتابة الأعداد الكبيرة باختصار.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Zero kopurua = berretzailea', es: 'Número de ceros = exponente', en: 'Number of zeros = exponent', ar: 'عدد الأصفار = الأسّ' },
                text: { eu: '10² ehun da, 10³ mila, eta 10⁶ milioi bat.', es: '10² es cien, 10³ es mil y 10⁶ es un millón.', en: '10² is one hundred, 10³ is one thousand and 10⁶ is one million.', ar: `${ltr('10²')} مئة، و${ltr('10³')} ألف، و${ltr('10⁶')} مليون.` },
                math: '$10^2=100 \\qquad 10^3=1000$'
            },
            {
                title: { eu: 'Zenbaki handiak labur', es: 'Números grandes abreviados', en: 'Large numbers in short form', ar: 'الأعداد الكبيرة باختصار' },
                text: { eu: 'Zenbakia eta 10 oinarriko berretura baten biderkadura gisa idazten da.', es: 'Se escribe como un número por una potencia de 10.', en: 'It is written as a number times a power of 10.', ar: 'نكتبه عددًا مضروبًا في قوة للعدد 10.' },
                math: '$25\\,000=25\\cdot 10^3$'
            },
            {
                title: { eu: 'Deskonposizioa berreturekin', es: 'Descomposición con potencias', en: 'Expanded form with powers', ar: 'التفكيك بالقوى' },
                text: { eu: 'Zifra bakoitza bere ordenaren berreturarekin biderkatzen da.', es: 'Cada cifra se multiplica por la potencia de su orden.', en: 'Each digit is multiplied by the power that matches its place.', ar: 'نضرب كل رقم في قوة مرتبته.' },
                math: '$3402=3\\cdot 10^3+4\\cdot 10^2+2$'
            },
            {
                title: { eu: 'Bilioi bat', es: 'Un billón', en: 'One trillion', ar: 'تريليون' },
                text: { eu: '1 eta 12 zero.', es: 'Un 1 y 12 ceros.', en: 'A 1 followed by 12 zeros.', ar: '1 و12 صفرًا.' },
                math: '$10^{12}=1\\,000\\,000\\,000\\,000$'
            }
        ],
        takeaway: {
            eu: '10ⁿ = 1 eta n zero.',
            es: '10ⁿ = un 1 seguido de n ceros.',
            en: '10ⁿ = a 1 followed by n zeros.',
            ar: `${ltr('10ⁿ')} = 1 متبوعًا بـ n صفرًا.`
        }
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const naturalsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...naturalsLessonTexts[topic.id as NaturalsTopicId], ...naturalsLessonChecks[topic.id as NaturalsTopicId] }))

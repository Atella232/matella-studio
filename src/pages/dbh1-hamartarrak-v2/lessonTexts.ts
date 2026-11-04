import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { DecimalsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zenbaki hamartarrak · 1. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, the example as an exercise («Another example», or «Example»
   in the lessons of facts) and, in three lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. say() writes the decimal point in the Arabic formulas. The
   explanation keeps the numbers that its drawing shows (430,581, 0,3 =
   0,30, the shot put, 2,35, 0,45, 7 : 2 and 7 : 3, 6,27, the parked cars,
   2,75 · 1,3, the shifting point, 125 : 20, 1,28 : 0,2, the shopping).
   Rounding is written with an arrow (8,451 → 8,5): the test reads ≈ with
   the decimals of both sides. Prices go in the words (1,45 €, €1.45), so
   each language writes them its own way. The example uses numbers of its
   own, never those of «Let's solve», of «Check it» or of the typical
   mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const decimalsLessonTexts: Record<DecimalsTopicId, LessonTexts> = {
    /* ---------- 1. The structure of decimals ---------- */
    'decimal-units': {
        vocabulary: [
            say('unitatea', 'unidad', 'الوحدة', 'unit'),
            say('zati berdinak', 'partes iguales', 'أجزاء متساوية', 'equal parts'),
            say('maila', 'orden', 'الرتبة', 'place')
        ],
        definitions: [
            {
                term: say('Hamarrena, ehunena, milarena', 'Décima, centésima, milésima', 'العُشر، الجزء من مئة، الجزء من ألف', 'Tenth, hundredth, thousandth'),
                meaning: say('Unitatea 10, 100 edo 1000 zati berdinetan banatuta: $0{,}1$, $0{,}01$ eta $0{,}001$.', 'La unidad partida en 10, 100 o 1000 partes iguales: $0{,}1$, $0{,}01$ y $0{,}001$.', 'الوحدة مقسومة إلى 10 أو 100 أو 1000 جزء متساوٍ: $0{,}1$ و$0{,}01$ و$0{,}001$.', 'The unit split into 10, 100 or 1,000 equal parts: $0{,}1$, $0{,}01$ and $0{,}001$.')
            }
        ],
        explanation: say(
            'Gure sistema hamartarra da: maila bateko 10 unitatek hurrengo mailako 1 osatzen dute. Unitatea baino zati txikiagoak neurtzeko, 10 zati berdinetan banatzen da, eta zati bakoitza berriro 10 zatitan, marrazkian bezala. Horregatik, unitate 1 = 10 hamarren = 100 ehunen.',
            'Nuestro sistema es decimal: 10 unidades de un orden forman 1 del siguiente. Para medir partes más pequeñas que la unidad, se divide en 10 partes iguales, y cada parte otra vez en 10, como en el dibujo. Por eso 1 unidad = 10 décimas = 100 centésimas.',
            'نظامنا عشري: 10 وحدات من رتبة تكوّن 1 من الرتبة التالية. ولقياس أجزاء أصغر من الوحدة نقسمها إلى 10 أجزاء متساوية، ونقسم كل جزء مرة أخرى إلى 10، كما في الرسم. لذلك وحدة واحدة = 10 أعشار = 100 جزء من مئة.',
            'Our system is decimal: 10 units of one place make 1 of the next. To measure parts smaller than one unit, it is split into 10 equal parts, and each part again into 10, as in the drawing. That is why 1 unit = 10 tenths = 100 hundredths.'
        ),
        examplePrompt: say('Zenbat ehunen dira 4 hamarren? Eta zenbat milaren dira 7 ehunen?', '¿Cuántas centésimas son 4 décimas? ¿Y cuántas milésimas son 7 centésimas?', 'كم جزءًا من مئة في 4 أعشار؟ وكم جزءًا من ألف في 7 أجزاء من مئة؟', 'How many hundredths are 4 tenths? And how many thousandths are 7 hundredths?'),
        example: same('$\\begin{gathered}0{,}4=0{,}40\\\\0{,}07=0{,}070\\end{gathered}$'),
        exampleAnswer: say('4 hamarren 40 ehunen dira, eta 7 ehunen 70 milaren.', '4 décimas son 40 centésimas, y 7 centésimas son 70 milésimas.', '4 أعشار = 40 جزءًا من مئة، و7 أجزاء من مئة = 70 جزءًا من ألف.', '4 tenths are 40 hundredths, and 7 hundredths are 70 thousandths.')
    },
    'place-value': {
        vocabulary: [
            say('koma', 'coma', 'الفاصلة', 'decimal point'),
            say('hamarrenak', 'décimas', 'الأعشار', 'tenths'),
            say('ehunenak', 'centésimas', 'الأجزاء من مئة', 'hundredths')
        ],
        definitions: [
            {
                term: say('Zati osoa eta zati hamartarra', 'Parte entera y parte decimal', 'الجزء الصحيح والجزء العشري', 'Whole part and decimal part'),
                meaning: say('Komaren ezkerreko eta eskuineko zifrak.', 'Las cifras a la izquierda y a la derecha de la coma.', 'الأرقام الواقعة يسار الفاصلة ويمينها.', 'The digits to the left and to the right of the decimal point.')
            }
        ],
        explanation: say(
            'Hamartar batek bi zati ditu, komaz bereizita: ezkerrean zati osoa, eta eskuinean zati hamartarra. Zifra baten balioa haren tokiaren araberakoa da; deskonposatzeko, batu balio horiek: $430{,}581=400+30+0{,}5+0{,}08+0{,}001$.',
            'Un decimal tiene dos partes separadas por la coma: a la izquierda, la parte entera, y a la derecha, la parte decimal. El valor de una cifra depende del lugar que ocupa; para descomponer, suma esos valores: $430{,}581=400+30+0{,}5+0{,}08+0{,}001$.',
            'للعدد العشري جزآن تفصل بينهما الفاصلة: على اليسار الجزء الصحيح، وعلى اليمين الجزء العشري. قيمة الرقم تتعلق بمنزلته؛ وللتفكيك اجمع هذه القيم: $430{,}581=400+30+0{,}5+0{,}08+0{,}001$.',
            'A decimal has two parts separated by the decimal point: on the left, the whole part, and on the right, the decimal part. The value of a digit depends on its place; to break a number down, add those values: $430{,}581=400+30+0{,}5+0{,}08+0{,}001$.'
        ),
        examplePrompt: say('Deskonposatu $9{,}063$, eta esan zenbat balio duen 6 zifrak.', 'Descompón $9{,}063$ y di cuánto vale el 6.', 'فكّك $9{,}063$ وبيّن قيمة الرقم 6.', 'Break down $9{,}063$ and say what the 6 is worth.'),
        example: same('$9{,}063=9+0{,}06+0{,}003$'),
        exampleAnswer: say('6 zifra ehunenetan dago: $0{,}06$ balio du. Hamarrenetako 0 zifrak tokia gordetzen du.', 'El 6 está en las centésimas: vale $0{,}06$. El 0 de las décimas guarda el sitio.', 'الرقم 6 في منزلة الأجزاء من مئة: قيمته $0{,}06$. والصفر في منزلة الأعشار يحفظ المكان.', 'The 6 is in the hundredths: it is worth $0{,}06$. The 0 in the tenths keeps the place.')
    },
    'read-write': {
        vocabulary: [
            say('azken zifra', 'última cifra', 'آخر رقم', 'last digit'),
            say('eskuineko zeroak', 'ceros a la derecha', 'الأصفار على اليمين', 'zeros on the right'),
            say('milarenak', 'milésimas', 'الأجزاء من ألف', 'thousandths')
        ],
        explanation: say(
            'Hamartar bat irakurtzeko, esan zati osoa eta gero zati hamartarra, azken zifraren izenarekin: $5{,}004$ «bost unitate eta lau milaren» da. Eskuineko zeroek ez dute balioa aldatzen, marrazkiko $0{,}3=0{,}30$ bezala, baina erdiko zero batek bai: $1{,}06\\neq 1{,}6$.',
            'Para leer un decimal, di la parte entera y después la parte decimal con el nombre de su última cifra: $5{,}004$ es «cinco unidades y cuatro milésimas». Los ceros a la derecha no cambian el valor, como $0{,}3=0{,}30$ en el dibujo, pero un cero en medio sí: $1{,}06\\neq 1{,}6$.',
            'لقراءة عدد عشري اذكر الجزء الصحيح ثم الجزء العشري باسم آخر رقم فيه: $5{,}004$ هو «خمس وحدات وأربعة أجزاء من ألف». والأصفار على اليمين لا تغيّر القيمة، مثل $0{,}3=0{,}30$ في الرسم، لكن الصفر في الوسط يغيّرها: $1{,}06\\neq 1{,}6$.',
            'To read a decimal, say the whole part and then the decimal part with the name of its last digit: $5{,}004$ is «five units and four thousandths». Zeros on the right do not change the value, like $0{,}3=0{,}30$ in the drawing, but a zero in the middle does: $1{,}06\\neq 1{,}6$.'
        ),
        examplePrompt: say('Idatzi zifrekin: «hamabi unitate eta zortzi milaren» eta «berrogeita bost ehunen».', 'Escribe con cifras: «doce unidades y ocho milésimas» y «cuarenta y cinco centésimas».', 'اكتب بالأرقام: «اثنتا عشرة وحدة وثمانية أجزاء من ألف» و«خمسة وأربعون جزءًا من مئة».', 'Write in digits: «twelve units and eight thousandths» and «forty-five hundredths».'),
        example: same('$12{,}008\\qquad 0{,}45$'),
        exampleAnswer: say('Milarenak: hiru zifra hamartar. Ehunenak: bi.', 'Milésimas: tres cifras decimales. Centésimas: dos.', 'الأجزاء من ألف: ثلاثة أرقام عشرية. والأجزاء من مئة: رقمان.', 'Thousandths: three decimal places. Hundredths: two.')
    },

    /* ---------- 2. Order and the number line ---------- */
    compare: {
        vocabulary: [
            say('zati osoa', 'parte entera', 'الجزء الصحيح', 'whole part'),
            say('zifraz zifra', 'cifra a cifra', 'رقمًا رقمًا', 'digit by digit')
        ],
        explanation: say(
            'Pisu-jaurtiketan, Albertok $2{,}95$ m jaurti ditu, Anak $3{,}16$ m eta Elenak $3{,}17$ m. Lehenik zati osoa begiratzen da, $2<3$; berdina bada, zifra hamartarrak konparatzen dira zifraz zifra: $3{,}16<3{,}17$. Zifra gehiago izateak ez du esan nahi handiagoa denik.',
            'En lanzamiento de peso, Alberto ha lanzado $2{,}95$ m, Ana $3{,}16$ m y Elena $3{,}17$ m. Primero se mira la parte entera, $2<3$; si es igual, se comparan las cifras decimales cifra a cifra: $3{,}16<3{,}17$. Tener más cifras no significa ser mayor.',
            'في رمي الجُلّة رمى ألبرتو $2{,}95$ م، وآنا $3{,}16$ م، وإيلينا $3{,}17$ م. ننظر أولًا إلى الجزء الصحيح، $2<3$؛ وإذا تساوى نقارن الأرقام العشرية رقمًا رقمًا: $3{,}16<3{,}17$. وكثرة الأرقام لا تعني أن العدد أكبر.',
            'In the shot put, Alberto threw $2{,}95$ m, Ana $3{,}16$ m and Elena $3{,}17$ m. First look at the whole part, $2<3$; if it is the same, compare the decimal digits digit by digit: $3{,}16<3{,}17$. Having more digits does not mean being bigger.'
        ),
        examplePrompt: say('Ordenatu handienetik txikienera: $7{,}4$; $7{,}38$; $7{,}405$; $7{,}04$.', 'Ordena de mayor a menor: $7{,}4$; $7{,}38$; $7{,}405$; $7{,}04$.', 'رتّب من الأكبر إلى الأصغر: $7{,}4$؛ $7{,}38$؛ $7{,}405$؛ $7{,}04$.', 'Order from biggest to smallest: $7{,}4$; $7{,}38$; $7{,}405$; $7{,}04$.'),
        example: same('$7{,}405>7{,}4>7{,}38>7{,}04$'),
        exampleAnswer: say('Hiru zifra hamartarrekin: $7{,}405$, $7{,}400$, $7{,}380$, $7{,}040$.', 'Con tres cifras decimales: $7{,}405$, $7{,}400$, $7{,}380$, $7{,}040$.', 'بثلاثة أرقام عشرية: $7{,}405$، $7{,}400$، $7{,}380$، $7{,}040$.', 'With three decimal places: $7{,}405$, $7{,}400$, $7{,}380$, $7{,}040$.')
    },
    line: {
        vocabulary: [
            say('tartea', 'tramo', 'القطعة', 'stretch'),
            say('marka', 'marca', 'العلامة', 'mark'),
            say('handitu', 'ampliar', 'كبّر', 'zoom in')
        ],
        explanation: say(
            '$2{,}35$ kokatzeko, bilatu zein unitateren artean dagoen: 2 eta 3. Banatu tarte hori 10 zatitan, hamarrenetan: $2{,}3$ eta $2{,}4$ artean dago. Handitu tarte hori eta banatu berriro 10 zatitan: marka bakoitza ehunen bat da. Zuzenean, ezkerrekoa da txikiena.',
            'Para situar $2{,}35$, busca entre qué unidades está: entre 2 y 3. Divide ese tramo en 10 partes, las décimas: está entre $2{,}3$ y $2{,}4$. Al ampliar ese tramo y dividirlo otra vez en 10, cada marca es una centésima. En la recta, el de la izquierda es menor.',
            'لوضع $2{,}35$ ابحث بين أي وحدتين يقع: بين 2 و3. قسّم هذه القطعة إلى 10 أجزاء، هي الأعشار: يقع بين $2{,}3$ و$2{,}4$. كبّر هذه القطعة وقسّمها مرة أخرى إلى 10: كل علامة جزء من مئة. وعلى المستقيم يكون الذي على اليسار أصغر.',
            'To place $2{,}35$, find which units it is between: 2 and 3. Split that stretch into 10 parts, the tenths: it is between $2{,}3$ and $2{,}4$. Zoom in on that stretch and split it into 10 again: each mark is a hundredth. On the line, the one on the left is smaller.'
        ),
        examplePrompt: say('$4{,}1$ eta $4{,}2$ arteko tartea 10 zatitan banatuta dago. Zein zenbaki dago zazpigarren markan?', 'El tramo entre $4{,}1$ y $4{,}2$ está dividido en 10 partes. ¿Qué número está en la séptima marca?', 'القطعة بين $4{,}1$ و$4{,}2$ مقسومة إلى 10 أجزاء. ما العدد عند العلامة السابعة؟', 'The stretch between $4{,}1$ and $4{,}2$ is split into 10 parts. Which number is at the seventh mark?'),
        example: same('$4{,}1+7\\cdot 0{,}01=4{,}17$'),
        exampleAnswer: say('Marka bakoitza ehunen bat da: $4{,}17$ zenbakia $4{,}1$ eta $4{,}2$ artean dago.', 'Cada marca es una centésima: $4{,}17$ está entre $4{,}1$ y $4{,}2$.', 'كل علامة جزء من مئة: يقع $4{,}17$ بين $4{,}1$ و$4{,}2$.', 'Each mark is a hundredth: $4{,}17$ is between $4{,}1$ and $4{,}2$.')
    },
    between: {
        vocabulary: [
            say('zeroak', 'ceros', 'الأصفار', 'zeros'),
            say('jarraituak', 'seguidos', 'متتاليين', 'consecutive')
        ],
        definitions: [
            {
                term: say('Erdiko puntua', 'Punto medio', 'نقطة المنتصف', 'Halfway point'),
                meaning: say('Bi zenbakiren erdi-erdian dagoena: haien batura 2 zenbakiarekin zatituta.', 'El número que está justo en medio de dos: su suma dividida entre 2.', 'العدد الواقع في منتصف عددين تمامًا: مجموعهما مقسومًا على 2.', 'The number exactly halfway between two: their sum divided by 2.')
            }
        ],
        explanation: say(
            'Bi zenbaki oso jarraituren artean ez dago beste zenbaki osorik, baina bi hamartarren artean beti daude asko. $1{,}3$ eta $1{,}4$ artean bat idazteko, gehitu zero bana, $1{,}30$ eta $1{,}40$, eta aukeratu: $1{,}35$.',
            'Entre dos enteros seguidos no hay ningún otro entero, pero entre dos decimales siempre hay muchos. Para escribir uno entre $1{,}3$ y $1{,}4$, añade un cero a cada uno, $1{,}30$ y $1{,}40$, y elige: $1{,}35$.',
            'لا يوجد عدد صحيح بين عددين صحيحين متتاليين، لكن بين عددين عشريين توجد دائمًا أعداد كثيرة. لكتابة عدد بين $1{,}3$ و$1{,}4$ أضف صفرًا إلى كل منهما، $1{,}30$ و$1{,}40$، واختر: $1{,}35$.',
            'Between two consecutive whole numbers there is no other whole number, but between two decimals there are always many. To write one between $1{,}3$ and $1{,}4$, add a zero to each, $1{,}30$ and $1{,}40$, and choose: $1{,}35$.'
        ),
        examplePrompt: say('Idatzi zenbaki bat $0{,}52$ eta $0{,}53$ artean, eta aurkitu $3{,}6$ eta $3{,}9$ zenbakien erdiko puntua.', 'Escribe un número entre $0{,}52$ y $0{,}53$, y halla el punto medio de $3{,}6$ y $3{,}9$.', 'اكتب عددًا بين $0{,}52$ و$0{,}53$، وأوجد نقطة المنتصف بين $3{,}6$ و$3{,}9$.', 'Write a number between $0{,}52$ and $0{,}53$, and find the halfway point of $3{,}6$ and $3{,}9$.'),
        example: same('$\\begin{gathered}0{,}52<0{,}525<0{,}53\\\\(3{,}6+3{,}9)\\mathbin{:}2=3{,}75\\end{gathered}$'),
        exampleAnswer: say('Beste zero batekin, $0{,}520$ eta $0{,}530$, $0{,}525$ sartzen da. Erdiko puntua $3{,}75$ da.', 'Con otro cero, $0{,}520$ y $0{,}530$, cabe $0{,}525$. El punto medio es $3{,}75$.', 'بصفر آخر، $0{,}520$ و$0{,}530$، يتسع $0{,}525$. ونقطة المنتصف $3{,}75$.', 'With another zero, $0{,}520$ and $0{,}530$, $0{,}525$ fits in. The halfway point is $3{,}75$.')
    },

    /* ---------- 3. Fractions and rounding ---------- */
    'decimal-fraction': {
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zeroak', 'ceros', 'الأصفار', 'zeros'),
            say('koma', 'coma', 'الفاصلة', 'decimal point')
        ],
        definitions: [
            {
                term: say('Zatiki hamartarra', 'Fracción decimal', 'الكسر العشري', 'Decimal fraction'),
                meaning: say('Izendatzailea 10, 100, 1000… duen zatikia.', 'La fracción cuyo denominador es 10, 100, 1000…', 'الكسر الذي مقامه 10 أو 100 أو 1000…', 'A fraction whose denominator is 10, 100, 1,000…')
            }
        ],
        explanation: say(
            'Hamartar bat zatiki hamartar bihurtzeko, idatzi goian zenbakia komarik gabe, eta behean 1 bat, zifra hamartarrak adina zerorekin: $0{,}45=\\frac{45}{100}$, marrazkian bezala. Alderantziz, zenbakitzailearen koma ezkerrera doa, izendatzaileak zero adina toki.',
            'Para pasar un decimal a fracción decimal, escribe arriba el número sin coma, y abajo un 1 con tantos ceros como cifras decimales: $0{,}45=\\frac{45}{100}$, como en el dibujo. Al revés, la coma del numerador va a la izquierda tantos lugares como ceros tiene el denominador.',
            'لتحويل عدد عشري إلى كسر عشري اكتب في الأعلى العدد بلا فاصلة، وفي الأسفل 1 تتبعه أصفار بعدد الأرقام العشرية: $0{,}45=\\frac{45}{100}$، كما في الرسم. وبالعكس، تنتقل فاصلة البسط إلى اليسار بعدد أصفار المقام.',
            'To turn a decimal into a decimal fraction, write the number without the point on top, and underneath a 1 with as many zeros as decimal places: $0{,}45=\\frac{45}{100}$, as in the drawing. The other way round, the point of the numerator moves left as many places as the denominator has zeros.'
        ),
        examplePrompt: say('Idatzi $3{,}08$ zatiki hamartar gisa, eta $\\frac{127}{1000}$ hamartar gisa.', 'Escribe $3{,}08$ como fracción decimal y $\\frac{127}{1000}$ como decimal.', 'اكتب $3{,}08$ كسرًا عشريًا، و$\\frac{127}{1000}$ عددًا عشريًا.', 'Write $3{,}08$ as a decimal fraction and $\\frac{127}{1000}$ as a decimal.'),
        example: same('$3{,}08=\\frac{308}{100}\\qquad\\frac{127}{1000}=0{,}127$'),
        exampleAnswer: say('Bi zifra hamartar, bi zero; hiru zero, hiru zifra hamartar.', 'Dos cifras decimales, dos ceros; tres ceros, tres cifras decimales.', 'رقمان عشريان، صفران؛ ثلاثة أصفار، ثلاثة أرقام عشرية.', 'Two decimal places, two zeros; three zeros, three decimal places.')
    },
    'fraction-division': {
        vocabulary: [
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('zehatza', 'exacto', 'منتهٍ', 'terminating'),
            say('periodikoa', 'periódico', 'دوري', 'recurring')
        ],
        definitions: [
            {
                term: say('Periodoa', 'Periodo', 'الدور', 'Period'),
                meaning: say('Amaierarik gabe errepikatzen den zifra edo zifra-multzoa; arku batez markatzen da: $2{,}\\overline{3}$.', 'La cifra o el grupo de cifras que se repite sin fin; se marca con un arco: $2{,}\\overline{3}$.', 'الرقم أو مجموعة الأرقام التي تتكرر بلا نهاية؛ وتُعلَّم بقوس: $2{,}\\overline{3}$.', 'The digit or group of digits that repeats for ever; it is marked with a bar: $2{,}\\overline{3}$.')
            }
        ],
        explanation: say(
            'Zatiki bat zenbakitzailea zati izendatzailea da. Zatiketa egitean, marrazkian bezala, bi kasu daude:',
            'Una fracción es el numerador dividido entre el denominador. Al hacer la división, como en el dibujo, hay dos casos:',
            'الكسر هو البسط مقسومًا على المقام. وعند إجراء القسمة، كما في الرسم، توجد حالتان:',
            'A fraction is the numerator divided by the denominator. When you do the division, as in the drawing, there are two cases:'
        ),
        cases: [
            { title: say('Zehatza', 'Exacto', 'منتهٍ', 'Terminating'), text: say('Hondarra 0 izatera iristen da.', 'El resto llega a 0.', 'يصل الباقي إلى 0.', 'The remainder reaches 0.'), math: same('$\\frac{7}{2}=7\\mathbin{:}2=3{,}5$') },
            { title: say('Periodikoa', 'Periódico', 'دوري', 'Recurring'), text: say('Hondarrak errepikatzen dira, eta zifra bat edo zifra-multzo bat amaierarik gabe errepikatzen da.', 'Los restos se repiten, y una cifra o un grupo de cifras se repite sin fin.', 'تتكرر البواقي، ويتكرر رقم أو مجموعة أرقام بلا نهاية.', 'The remainders repeat, and a digit or group of digits repeats for ever.'), math: same('$\\frac{7}{3}=2{,}333\\ldots=2{,}\\overline{3}$') }
        ],
        examplePrompt: say('$\\frac{5}{8}$ eta $\\frac{4}{9}$ zehatzak ala periodikoak dira?', '¿$\\frac{5}{8}$ y $\\frac{4}{9}$ son exactos o periódicos?', 'هل $\\frac{5}{8}$ و$\\frac{4}{9}$ منتهيان أم دوريان؟', 'Are $\\frac{5}{8}$ and $\\frac{4}{9}$ terminating or recurring?'),
        example: same('$\\begin{gathered}\\frac{5}{8}=0{,}625\\\\\\frac{4}{9}=0{,}444\\ldots=0{,}\\overline{4}\\end{gathered}$'),
        exampleAnswer: say('$\\frac{5}{8}$ zehatza da: hondarra 0 izatera iristen da. $\\frac{4}{9}$ periodikoa da: hondarra beti 4 da.', '$\\frac{5}{8}$ es exacto: el resto llega a 0. $\\frac{4}{9}$ es periódico: el resto siempre es 4.', '$\\frac{5}{8}$ منتهٍ: يصل الباقي إلى 0. و$\\frac{4}{9}$ دوري: الباقي دائمًا 4.', '$\\frac{5}{8}$ is terminating: the remainder reaches 0. $\\frac{4}{9}$ is recurring: the remainder is always 4.'),
        why: {
            text: say(
                '3 zenbakiarekin zatitzean, hondarra 0, 1 edo 2 bakarrik izan daiteke. Inoiz 0 ez bada, lehenago agertutako hondar bat itzuliko da, eta handik aurrera dena errepikatzen da: zatidurako zifrak ere bai.',
                'Al dividir entre 3, el resto solo puede ser 0, 1 o 2. Si nunca es 0, tarde o temprano vuelve a salir un resto que ya salió, y desde ahí todo se repite: también las cifras del cociente.',
                'عند القسمة على 3 لا يكون الباقي إلا 0 أو 1 أو 2. فإذا لم يكن 0 أبدًا عاد عاجلًا أو آجلًا باقٍ ظهر من قبل، ومن هناك يتكرر كل شيء: وأرقام الناتج أيضًا.',
                'When dividing by 3, the remainder can only be 0, 1 or 2. If it is never 0, sooner or later a remainder you have already had comes back, and from there everything repeats: the digits of the quotient too.'
            )
        }
    },
    rounding: {
        vocabulary: [
            say('hamarrenak', 'décimas', 'الأعشار', 'tenths'),
            say('ehunenak', 'centésimas', 'الأجزاء من مئة', 'hundredths'),
            say('hurbil', 'cerca', 'أقرب', 'closer')
        ],
        explanation: say(
            'Biribiltzea zenbaki bat zifra gutxiagoko beste hurbil batez ordeztea da. Hamarrenetara biribiltzeko, begiratu ehunenei: 0 eta 4 artean, hamarrenak berdin geratzen dira; 5 eta 9 artean, bat igotzen dira. Marrazkian, $6{,}27$ zenbakia $6{,}3$ zenbakitik hurbilago dago $6{,}2$ zenbakitik baino.',
            'Redondear es cambiar un número por otro cercano con menos cifras. Para redondear a las décimas, mira las centésimas: de 0 a 4, las décimas se quedan igual; de 5 a 9, suben uno. En el dibujo, $6{,}27$ está más cerca de $6{,}3$ que de $6{,}2$.',
            'التقريب هو استبدال عدد بعدد قريب منه بأرقام أقل. للتقريب إلى الأعشار انظر إلى الأجزاء من مئة: من 0 إلى 4 تبقى الأعشار كما هي؛ ومن 5 إلى 9 تزيد واحدًا. في الرسم $6{,}27$ أقرب إلى $6{,}3$ منه إلى $6{,}2$.',
            'Rounding means replacing a number with a nearby one with fewer digits. To round to the tenths, look at the hundredths: from 0 to 4, the tenths stay the same; from 5 to 9, they go up by one. In the drawing, $6{,}27$ is closer to $6{,}3$ than to $6{,}2$.'
        ),
        examplePrompt: say('Biribildu $8{,}451$ hamarrenetara, eta $0{,}996$ ehunenetara.', 'Redondea $8{,}451$ a las décimas y $0{,}996$ a las centésimas.', 'قرّب $8{,}451$ إلى الأعشار، و$0{,}996$ إلى الأجزاء من مئة.', 'Round $8{,}451$ to the nearest tenth and $0{,}996$ to the nearest hundredth.'),
        example: same('$\\begin{gathered}8{,}451\\to 8{,}5\\\\0{,}996\\to 1{,}00\\end{gathered}$'),
        exampleAnswer: say('Ehunenak 5: 4 zifra 5 zifrara igotzen da. Milarenak 6: ehunenak 9 zifratik 10 zifrara igotzen dira, eta bat eramaten da.', 'Centésimas 5: el 4 sube a 5. Milésimas 6: las centésimas pasan de 9 a 10 y se llevan una.', 'الأجزاء من مئة 5: يرتفع 4 إلى 5. والأجزاء من ألف 6: ترتفع الأجزاء من مئة من 9 إلى 10 ونحمل واحدًا.', 'Hundredths 5: the 4 goes up to 5. Thousandths 6: the hundredths go from 9 to 10 and you carry one.')
    },

    /* ---------- 4. Add, subtract and multiply ---------- */
    'add-sub': {
        vocabulary: [
            say('zutabea', 'columna', 'عموديًا', 'column'),
            say('koma', 'coma', 'الفاصلة', 'decimal point')
        ],
        explanation: say(
            'Hamartarrak batu edo kentzeko, jarri zutabean, komak bata bestearen azpian; gehitu zeroak zifra hamartar kopurua berdintzeko, eta egin zenbaki arruntekin bezala. Emaitzaren koma toki berean doa: marrazkian, $3{,}80+4{,}17+10{,}23+5{,}10=23{,}30$.',
            'Para sumar o restar decimales, colócalos en columna con las comas una debajo de otra, añade ceros para igualar las cifras decimales y opera como con naturales. La coma del resultado va en el mismo lugar: en el dibujo, $3{,}80+4{,}17+10{,}23+5{,}10=23{,}30$.',
            'لجمع الأعداد العشرية أو طرحها ضعها عموديًا والفواصل بعضها تحت بعض، وأضف أصفارًا لتتساوى الأرقام العشرية، واحسب كما في الأعداد الطبيعية. وفاصلة النتيجة في المكان نفسه: في الرسم $3{,}80+4{,}17+10{,}23+5{,}10=23{,}30$.',
            'To add or subtract decimals, put them in a column with the decimal points one under the other, add zeros so they have the same number of decimal places and work as with whole numbers. The point of the result goes in the same place: in the drawing, $3{,}80+4{,}17+10{,}23+5{,}10=23{,}30$.'
        ),
        examplePrompt: say('Kalkulatu $12{,}5+0{,}86$ eta $9-3{,}47$.', 'Calcula $12{,}5+0{,}86$ y $9-3{,}47$.', 'احسب $12{,}5+0{,}86$ و$9-3{,}47$.', 'Work out $12{,}5+0{,}86$ and $9-3{,}47$.'),
        example: same('$\\begin{gathered}12{,}50+0{,}86=13{,}36\\\\9{,}00-3{,}47=5{,}53\\end{gathered}$'),
        exampleAnswer: say('Zeroekin betetzen da: $12{,}50$ eta $9{,}00$.', 'Se rellena con ceros: $12{,}50$ y $9{,}00$.', 'نكمل بالأصفار: $12{,}50$ و$9{,}00$.', 'Fill in with zeros: $12{,}50$ and $9{,}00$.')
    },
    multiply: {
        vocabulary: [
            say('zifra hamartarrak', 'cifras decimales', 'الأرقام العشرية', 'decimal places'),
            say('faktoreak', 'factores', 'العاملان', 'factors')
        ],
        explanation: say(
            'Hamartarrak biderkatzeko, biderkatu komarik gabe, eta gero zenbatu bi faktoreen zifra hamartarrak: emaitzak horiek bezainbeste ditu. Marrazkian, $275\\cdot 13=3575$ eta 3 zifra hamartar daude: $2{,}75\\cdot 1{,}3=3{,}575$.',
            'Para multiplicar decimales, multiplica sin las comas y después cuenta las cifras decimales de los dos factores: el resultado lleva esas mismas. En el dibujo, $275\\cdot 13=3575$ y hay 3 cifras decimales: $2{,}75\\cdot 1{,}3=3{,}575$.',
            'لضرب الأعداد العشرية اضرب دون الفواصل، ثم عُدّ الأرقام العشرية في العاملين: في النتيجة العدد نفسه منها. في الرسم $275\\cdot 13=3575$ وهناك 3 أرقام عشرية: $2{,}75\\cdot 1{,}3=3{,}575$.',
            'To multiply decimals, multiply without the points and then count the decimal places of both factors: the result has that many. In the drawing, $275\\cdot 13=3575$ and there are 3 decimal places: $2{,}75\\cdot 1{,}3=3{,}575$.'
        ),
        examplePrompt: say('Kalkulatu $0{,}25\\cdot 0{,}8$ eta $4{,}2\\cdot 1{,}5$.', 'Calcula $0{,}25\\cdot 0{,}8$ y $4{,}2\\cdot 1{,}5$.', 'احسب $0{,}25\\cdot 0{,}8$ و$4{,}2\\cdot 1{,}5$.', 'Work out $0{,}25\\cdot 0{,}8$ and $4{,}2\\cdot 1{,}5$.'),
        example: same('$\\begin{gathered}0{,}25\\cdot 0{,}8=0{,}200=0{,}2\\\\4{,}2\\cdot 1{,}5=6{,}30=6{,}3\\end{gathered}$'),
        exampleAnswer: say('Hiru eta bi zifra hamartar; amaierako zeroak kendu daitezke.', 'Tres y dos cifras decimales; los ceros del final se pueden quitar.', 'ثلاثة أرقام عشرية ثم رقمان؛ ويمكن حذف الأصفار في النهاية.', 'Three and two decimal places; the zeros at the end can be dropped.'),
        why: {
            text: say(
                '$0{,}3$ hiru hamarren dira, eta $0{,}2$ bi hamarren. Hamarren bat bider hamarren bat ehunen bat da: $\\frac{1}{10}\\cdot\\frac{1}{10}=\\frac{1}{100}$. Horregatik $3\\cdot 2=6$ ehunen dira, $0{,}06$: zifra hamartarrak batu egiten dira.',
                '$0{,}3$ son 3 décimas y $0{,}2$, 2 décimas. Una décima por una décima es una centésima: $\\frac{1}{10}\\cdot\\frac{1}{10}=\\frac{1}{100}$. Por eso salen $3\\cdot 2=6$ centésimas, $0{,}06$: las cifras decimales se suman.',
                '$0{,}3$ ثلاثة أعشار، و$0{,}2$ عُشران. والعُشر في العُشر جزء من مئة: $\\frac{1}{10}\\cdot\\frac{1}{10}=\\frac{1}{100}$. لذلك نحصل على $3\\cdot 2=6$ أجزاء من مئة، أي $0{,}06$: تُجمع الأرقام العشرية.',
                '$0{,}3$ is 3 tenths and $0{,}2$ is 2 tenths. A tenth times a tenth is a hundredth: $\\frac{1}{10}\\cdot\\frac{1}{10}=\\frac{1}{100}$. That is why you get $3\\cdot 2=6$ hundredths, $0{,}06$: the decimal places add up.'
            ),
            math: same('$\\frac{3}{10}\\cdot\\frac{2}{10}=\\frac{6}{100}=0{,}06$')
        }
    },
    'powers-of-ten': {
        vocabulary: [
            say('eskuinera', 'a la derecha', 'إلى اليمين', 'to the right'),
            say('ezkerrera', 'a la izquierda', 'إلى اليسار', 'to the left'),
            say('tokiak', 'lugares', 'منازل', 'places')
        ],
        explanation: say(
            '10, 100, 1000… zenbakiez biderkatzeko, koma eskuinera mugitzen da, zero adina toki; zatitzeko, ezkerrera. Zifrak falta badira, zeroak gehitzen dira. Marrazkian, $4{,}739\\cdot 1000=4739$ eta $834{,}7\\mathbin{:}100=8{,}347$.',
            'Para multiplicar por 10, 100, 1000…, la coma se mueve a la derecha tantos lugares como ceros; para dividir, a la izquierda. Si faltan cifras, se añaden ceros. En el dibujo, $4{,}739\\cdot 1000=4739$ y $834{,}7\\mathbin{:}100=8{,}347$.',
            'للضرب في 10 أو 100 أو 1000… تنتقل الفاصلة إلى اليمين منازل بعدد الأصفار؛ وللقسمة إلى اليسار. وإذا نقصت الأرقام نضيف أصفارًا. في الرسم $4{,}739\\cdot 1000=4739$ و$834{,}7\\mathbin{:}100=8{,}347$.',
            'To multiply by 10, 100, 1,000…, the decimal point moves to the right as many places as there are zeros; to divide, to the left. If digits are missing, add zeros. In the drawing, $4{,}739\\cdot 1000=4739$ and $834{,}7\\mathbin{:}100=8{,}347$.'
        ),
        examplePrompt: say('Kalkulatu $0{,}63\\cdot 100$, $5{,}2\\mathbin{:}1000$ eta $70\\cdot 0{,}1$.', 'Calcula $0{,}63\\cdot 100$, $5{,}2\\mathbin{:}1000$ y $70\\cdot 0{,}1$.', 'احسب $0{,}63\\cdot 100$ و$5{,}2\\mathbin{:}1000$ و$70\\cdot 0{,}1$.', 'Work out $0{,}63\\cdot 100$, $5{,}2\\mathbin{:}1000$ and $70\\cdot 0{,}1$.'),
        example: same('$\\begin{gathered}0{,}63\\cdot 100=63\\\\5{,}2\\mathbin{:}1000=0{,}0052\\\\70\\cdot 0{,}1=7\\end{gathered}$'),
        exampleAnswer: say('$0{,}1$ zenbakiaz biderkatzea 10 zenbakiarekin zatitzea da.', 'Multiplicar por $0{,}1$ es dividir entre 10.', 'الضرب في $0{,}1$ هو القسمة على 10.', 'Multiplying by $0{,}1$ is dividing by 10.')
    },

    /* ---------- 5. Divisions and problems ---------- */
    'divide-natural': {
        vocabulary: [
            say('zatidura', 'cociente', 'الناتج', 'quotient'),
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('zero bat jaitsi', 'bajar un cero', 'أنزل صفرًا', 'bring down a zero')
        ],
        explanation: say(
            'Zatiketa bat zehatza ez denean, jarraitu daiteke: jarri koma zatiduran eta jaitsi zero bat hondarrera. Marrazkian, $125\\mathbin{:}20$ zatiketak 6 ematen du eta 5 geratzen dira; zero batekin, $50\\mathbin{:}20$… $6{,}25$ arte. Zatikizuna hamartarra bada, jarri koma haren lehen zifra hamartarra jaistean.',
            'Si una división no es exacta, se puede seguir: pon la coma en el cociente y baja un cero al resto. En el dibujo, $125\\mathbin{:}20$ da 6 y sobran 5; con un cero, $50\\mathbin{:}20$… hasta $6{,}25$. Si el dividendo es decimal, pon la coma al bajar su primera cifra decimal.',
            'إذا لم تكن القسمة تامة يمكن متابعتها: ضع الفاصلة في الناتج وأنزل صفرًا إلى الباقي. في الرسم $125\\mathbin{:}20$ يعطي 6 ويبقى 5؛ وبصفر، $50\\mathbin{:}20$… حتى $6{,}25$. وإذا كان المقسوم عشريًا فضع الفاصلة عند إنزال أول رقم عشري فيه.',
            'If a division is not exact, you can go on: put the decimal point in the quotient and bring down a zero to the remainder. In the drawing, $125\\mathbin{:}20$ gives 6 with 5 left over; with a zero, $50\\mathbin{:}20$… up to $6{,}25$. If the dividend is a decimal, put in the point when you bring down its first decimal digit.'
        ),
        examplePrompt: say('Kalkulatu $9\\mathbin{:}8$ eta $14{,}7\\mathbin{:}6$.', 'Calcula $9\\mathbin{:}8$ y $14{,}7\\mathbin{:}6$.', 'احسب $9\\mathbin{:}8$ و$14{,}7\\mathbin{:}6$.', 'Work out $9\\mathbin{:}8$ and $14{,}7\\mathbin{:}6$.'),
        example: same('$\\begin{gathered}9\\mathbin{:}8=1{,}125\\\\14{,}7\\mathbin{:}6=2{,}45\\end{gathered}$'),
        exampleAnswer: say('$9\\mathbin{:}8$ zatiketan hiru zero jaisten dira, hondarra 0 izan arte.', 'En $9\\mathbin{:}8$ se bajan tres ceros hasta que el resto es 0.', 'في $9\\mathbin{:}8$ ننزل ثلاثة أصفار حتى يصير الباقي 0.', 'In $9\\mathbin{:}8$ you bring down three zeros until the remainder is 0.')
    },
    'divide-decimal': {
        vocabulary: [
            say('zatitzailea', 'divisor', 'المقسوم عليه', 'divisor'),
            say('zatikizuna', 'dividendo', 'المقسوم', 'dividend')
        ],
        explanation: say(
            'Zatikizuna eta zatitzailea zenbaki berarekin biderkatzen badira, zatidura ez da aldatzen. Horrela, zatitzailearen koma kentzen da: biderkatu biak 10, 100 edo 1000 zenbakiaz, haren zifra hamartarren arabera. Marrazkian, $1{,}28\\mathbin{:}0{,}2=12{,}8\\mathbin{:}2=6{,}4$.',
            'Si se multiplican el dividendo y el divisor por el mismo número, el cociente no cambia. Así se quita la coma del divisor: multiplica los dos por 10, 100 o 1000, según sus cifras decimales. En el dibujo, $1{,}28\\mathbin{:}0{,}2=12{,}8\\mathbin{:}2=6{,}4$.',
            'إذا ضُرب المقسوم والمقسوم عليه في العدد نفسه لا يتغيّر الناتج. وهكذا نحذف فاصلة المقسوم عليه: اضرب الاثنين في 10 أو 100 أو 1000 حسب أرقامه العشرية. في الرسم $1{,}28\\mathbin{:}0{,}2=12{,}8\\mathbin{:}2=6{,}4$.',
            'If the dividend and the divisor are multiplied by the same number, the quotient does not change. That is how you get rid of the point in the divisor: multiply both by 10, 100 or 1,000, depending on its decimal places. In the drawing, $1{,}28\\mathbin{:}0{,}2=12{,}8\\mathbin{:}2=6{,}4$.'
        ),
        examplePrompt: say('Kalkulatu $3{,}6\\mathbin{:}0{,}04$.', 'Calcula $3{,}6\\mathbin{:}0{,}04$.', 'احسب $3{,}6\\mathbin{:}0{,}04$.', 'Work out $3{,}6\\mathbin{:}0{,}04$.'),
        example: same('$3{,}6\\mathbin{:}0{,}04=360\\mathbin{:}4=90$'),
        exampleAnswer: say('Zatitzaileak bi zifra hamartar ditu: biak 100 zenbakiaz; zatikizunari zero bat falta zaio.', 'El divisor tiene dos cifras decimales: los dos por 100; al dividendo le falta un cero.', 'في المقسوم عليه رقمان عشريان: نضرب الاثنين في 100؛ وينقص المقسومَ صفر.', 'The divisor has two decimal places: both times 100; the dividend needs one more zero.'),
        why: {
            text: say(
                'Zatitzea banatzea da: banatzeko 10 aldiz gehiago badago eta 10 aldiz zati gehiago, zati bakoitzari gauza bera dagokio. $8\\mathbin{:}2=4$, eta $80\\mathbin{:}20$ ere 4.',
                'Dividir es repartir: si hay 10 veces más que repartir y 10 veces más partes, a cada parte le toca lo mismo. $8\\mathbin{:}2=4$, y $80\\mathbin{:}20$ también da 4.',
                'القسمة توزيع: إذا كان ما نوزّعه عشرة أضعاف وعدد الأجزاء عشرة أضعاف، فلكل جزء الحصة نفسها. $8\\mathbin{:}2=4$، و$80\\mathbin{:}20$ يعطي 4 أيضًا.',
                'Dividing is sharing: if there is 10 times as much to share and 10 times as many parts, each part gets the same. $8\\mathbin{:}2=4$, and $80\\mathbin{:}20$ also gives 4.'
            ),
            math: same('$8\\mathbin{:}2=80\\mathbin{:}20=4$')
        }
    },
    problems: {
        vocabulary: [
            say('prezioa', 'precio', 'السعر', 'price'),
            say('parentesiak', 'paréntesis', 'الأقواس', 'brackets'),
            say('ehunenak', 'centésimas', 'الأجزاء من مئة', 'hundredths')
        ],
        explanation: say(
            'Hamartarrekin eragiketen ordena bera da: parentesiak, biderketak eta zatiketak, eta batuketak eta kenketak. Marrazkiko erosketetan, prezioa bider kopurua: $0{,}92\\cdot 13{,}25=12{,}19$. Eurotan, emaitza ehunenetara biribiltzen da.',
            'Con decimales el orden de las operaciones es el mismo: paréntesis, multiplicaciones y divisiones, y sumas y restas. En las compras del dibujo, el precio por la cantidad: $0{,}92\\cdot 13{,}25=12{,}19$. En euros, el resultado se redondea a las centésimas.',
            'ترتيب العمليات مع الأعداد العشرية هو نفسه: الأقواس، ثم الضرب والقسمة، ثم الجمع والطرح. وفي مشتريات الرسم نضرب السعر في الكمية: $0{,}92\\cdot 13{,}25=12{,}19$. وباليورو تُقرَّب النتيجة إلى الأجزاء من مئة.',
            'With decimals the order of operations is the same: brackets, multiplications and divisions, and additions and subtractions. In the shopping in the drawing, price times amount: $0{,}92\\cdot 13{,}25=12{,}19$. In euros, the result is rounded to the hundredths.'
        ),
        examplePrompt: say('3 koaderno erosten dituzu, 1,45 euroan bakoitza, eta 0,85 euroko erregela bat. 10 eurorekin ordaintzen duzu. Zenbat itzultzen dizute?', 'Compras 3 cuadernos a 1,45 € y una regla de 0,85 €. Pagas con 10 €. ¿Cuánto te devuelven?', 'تشتري 3 دفاتر بسعر 1.45 يورو للواحد ومسطرة بسعر 0.85 يورو، وتدفع 10 يورو. كم يُرجعون لك؟', 'You buy 3 notebooks at €1.45 each and a ruler at €0.85. You pay with €10. How much change do you get?'),
        example: same('$\\begin{aligned}&10-(3\\cdot 1{,}45+0{,}85)\\\\&=10-5{,}2=4{,}8\\end{aligned}$'),
        exampleAnswer: say('4,80 euro itzultzen dizkizute.', 'Te devuelven 4,80 €.', 'يُرجعون لك 4.80 يورو.', 'You get €4.80 back.')
    }
}

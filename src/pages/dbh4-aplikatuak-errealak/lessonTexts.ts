import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { RealsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zenbaki errealak · 4. DBH aplikatuak — what each lesson tells: the new
   words (definitions), a short explanation, its cases and the example as an
   exercise («Another example»), with the key words in four languages and,
   in four lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics. The explanations keep the
   numbers their drawings show (8/5 and 3/7, 0,245, 1,83…, 82,745, the cable
   of 1 m, 83 400 000…). Decimals always go inside $…$, so English and Arabic
   get their decimal point. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const realsLessonTexts: Record<RealsTopicId, LessonTexts> = {
    /* ---------- 1. Rational numbers ---------- */
    'fraction-amount': {
        definitions: [
            {
                term: say('Zenbaki arrazionala', 'Número racional', 'العدد النسبي', 'Rational number'),
                meaning: say('Bi zenbaki osoren zatiki gisa idatz daitekeena: $\\frac{a}{b}$, $b\\neq 0$ izanik.', 'El que se puede escribir como fracción de dos enteros: $\\frac{a}{b}$, con $b\\neq 0$.', 'عدد يمكن كتابته كسرًا من عددين صحيحين: $\\frac{a}{b}$ حيث $b\\neq 0$.', 'A number that can be written as a fraction of two integers: $\\frac{a}{b}$, with $b\\neq 0$.')
            }
        ],
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zatiki baliokideak', 'fracciones equivalentes', 'كسور متكافئة', 'equivalent fractions')
        ],
        explanation: say(
            'Kantitate baten $\\frac{a}{b}$ kalkulatzeko, zatitu kantitatea $b$ zenbakiaz eta biderkatu $a$ zenbakiaz. Bi zatiki konparatzeko, bihurtu izendatzaile bereko zatiki baliokide (izendatzaileen m.k.t.) eta konparatu zenbakitzaileak: $\\frac{8}{5}=\\frac{56}{35}$ handiagoa da $\\frac{3}{7}=\\frac{15}{35}$ baino.',
            'Para hallar $\\frac{a}{b}$ de una cantidad, divide la cantidad entre $b$ y multiplica por $a$. Para comparar dos fracciones, pásalas a fracciones equivalentes con el mismo denominador (el m.c.m. de los denominadores) y compara los numeradores: $\\frac{8}{5}=\\frac{56}{35}$ es mayor que $\\frac{3}{7}=\\frac{15}{35}$.',
            'لحساب $\\frac{a}{b}$ من كمية اقسم الكمية على $b$ واضرب في $a$. ولمقارنة كسرين حوّلهما إلى كسرين متكافئين بالمقام نفسه (المضاعف المشترك الأصغر للمقامين) وقارن البسطين: $\\frac{8}{5}=\\frac{56}{35}$ أكبر من $\\frac{3}{7}=\\frac{15}{35}$.',
            'To find $\\frac{a}{b}$ of a quantity, divide the quantity by $b$ and multiply by $a$. To compare two fractions, turn them into equivalent fractions with the same denominator (the LCM of the denominators) and compare the numerators: $\\frac{8}{5}=\\frac{56}{35}$ is greater than $\\frac{3}{7}=\\frac{15}{35}$.'
        ),
        examplePrompt: say('Zein da handiagoa, 36 zenbakiaren $\\frac{3}{4}$ ala 30 zenbakiaren $\\frac{5}{6}$?', '¿Qué es mayor, $\\frac{3}{4}$ de 36 o $\\frac{5}{6}$ de 30?', 'أيهما أكبر: $\\frac{3}{4}$ من 36 أم $\\frac{5}{6}$ من 30؟', 'Which is greater, $\\frac{3}{4}$ of 36 or $\\frac{5}{6}$ of 30?'),
        example: same('$\\frac{3}{4}\\cdot 36=27\\qquad \\frac{5}{6}\\cdot 30=25$'),
        exampleAnswer: say('36 zenbakiaren $\\frac{3}{4}$ handiagoa da: 27 eta 25.', '$\\frac{3}{4}$ de 36 es mayor: 27 frente a 25.', '$\\frac{3}{4}$ من 36 أكبر: 27 مقابل 25.', '$\\frac{3}{4}$ of 36 is greater: 27 against 25.')
    },
    'fraction-ops': {
        vocabulary: [
            say('izendatzaile komuna', 'denominador común', 'مقام مشترك', 'common denominator'),
            say('hierarkia', 'jerarquía', 'أولويات العمليات', 'order of operations'),
            say('sinplifikatu', 'simplificar', 'بسّط', 'simplify')
        ],
        explanation: say(
            'Zatikiekin eragiketa bakoitzak bere araua du. Eragiketa konbinatuetan, hierarkia errespetatzen da: parentesiak, berreturak, biderketak eta zatiketak, eta azkenik batuketak eta kenketak. Amaieran, sinplifikatu emaitza.',
            'Con fracciones, cada operación tiene su regla. En las operaciones combinadas se respeta la jerarquía: paréntesis, potencias, multiplicaciones y divisiones y, por último, sumas y restas. Al final, simplifica el resultado.',
            'لكل عملية على الكسور قاعدتها. وفي العمليات المركبة نحترم أولويات العمليات: الأقواس ثم القوى ثم الضرب والقسمة وأخيرًا الجمع والطرح. وفي النهاية بسّط النتيجة.',
            'With fractions, each operation has its own rule. In combined operations you follow the order of operations: brackets, powers, multiplication and division and, last of all, addition and subtraction. At the end, simplify the result.'
        ),
        cases: [
            { title: say('Batu eta kendu', 'Sumar y restar', 'الجمع والطرح', 'Add and subtract'), text: say('Izendatzaile komun bat behar da.', 'Hace falta un denominador común.', 'نحتاج إلى مقام مشترك.', 'You need a common denominator.'), math: same('$\\frac{a}{b}+\\frac{c}{d}=\\frac{a\\cdot d+b\\cdot c}{b\\cdot d}$') },
            { title: say('Biderkatu', 'Multiplicar', 'الضرب', 'Multiply'), text: say('Zenbakitzailea bider zenbakitzailea eta izendatzailea bider izendatzailea.', 'Numerador por numerador y denominador por denominador.', 'البسط في البسط والمقام في المقام.', 'Numerator times numerator and denominator times denominator.'), math: same('$\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{a\\cdot c}{b\\cdot d}$') },
            { title: say('Zatitu', 'Dividir', 'القسمة', 'Divide'), text: say('Gurutzean biderkatzen da.', 'Se multiplica en cruz.', 'نضرب ضربًا تبادليًا.', 'Multiply across.'), math: same('$\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$') }
        ],
        examplePrompt: say('Kalkulatu $\\frac{5}{6}-\\frac{2}{3}\\cdot\\frac{3}{4}$.', 'Calcula $\\frac{5}{6}-\\frac{2}{3}\\cdot\\frac{3}{4}$.', 'احسب $\\frac{5}{6}-\\frac{2}{3}\\cdot\\frac{3}{4}$.', 'Calculate $\\frac{5}{6}-\\frac{2}{3}\\cdot\\frac{3}{4}$.'),
        example: same('$\\begin{aligned}\\frac{5}{6}-\\frac{2}{3}\\cdot\\frac{3}{4}&=\\frac{5}{6}-\\frac{1}{2}\\\\ &=\\frac{5-3}{6}=\\frac{1}{3}\\end{aligned}$'),
        exampleAnswer: say('Lehenik biderketa, gero kenketa: $\\frac{1}{3}$.', 'Primero la multiplicación y después la resta: $\\frac{1}{3}$.', 'الضرب أولًا ثم الطرح: $\\frac{1}{3}$.', 'First the multiplication, then the subtraction: $\\frac{1}{3}$.')
    },
    powers: {
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('alderantzizkoa', 'inverso', 'المقلوب', 'reciprocal')
        ],
        explanation: say(
            'Zatiki baten berretura kalkulatzeko, zenbakitzailea eta izendatzailea berretzen dira: $\\left(\\frac{a}{b}\\right)^{n}=\\frac{a^{n}}{b^{n}}$. Berreturen propietateak berretzaile osoekin ere betetzen dira:',
            'Para elevar una fracción se elevan el numerador y el denominador: $\\left(\\frac{a}{b}\\right)^{n}=\\frac{a^{n}}{b^{n}}$. Las propiedades de las potencias también valen con exponentes enteros:',
            'لرفع كسر إلى قوة نرفع البسط والمقام: $\\left(\\frac{a}{b}\\right)^{n}=\\frac{a^{n}}{b^{n}}$. وتصحّ خصائص القوى أيضًا مع الأسس الصحيحة:',
            'To raise a fraction to a power, raise the numerator and the denominator: $\\left(\\frac{a}{b}\\right)^{n}=\\frac{a^{n}}{b^{n}}$. The properties of powers also hold with integer exponents:'
        ),
        cases: [
            { title: say('Berretzailea 0', 'Exponente 0', 'الأس 0', 'Exponent 0'), text: say('0 ez den edozein zenbaki, 0 berretzailera jasota, 1 da.', 'Cualquier número distinto de 0 elevado a 0 da 1.', 'أي عدد غير الصفر مرفوع إلى 0 يساوي 1.', 'Any number other than 0 to the power of 0 is 1.'), math: same('$a^{0}=1$') },
            { title: say('Berretzaile negatiboa', 'Exponente negativo', 'الأس السالب', 'Negative exponent'), text: say('Alderantzizkoa adierazten du: eman buelta zatikiari.', 'Indica el inverso: da la vuelta a la fracción.', 'يدل على المقلوب: اقلب الكسر.', 'It means the reciprocal: turn the fraction upside down.'), math: same('$a^{-n}=\\frac{1}{a^{n}}$') },
            { title: say('Oinarri bera', 'Misma base', 'الأساس نفسه', 'Same base'), text: say('Biderkatzean berretzaileak batzen dira; zatitzean, kendu.', 'Al multiplicar se suman los exponentes; al dividir, se restan.', 'عند الضرب نجمع الأسس، وعند القسمة نطرحها.', 'When multiplying, add the exponents; when dividing, subtract them.'), math: same('$a^{m}\\cdot a^{n}=a^{m+n}$') }
        ],
        why: {
            text: say(
                'Marrazkiko taulan, berretzailea bat jaisten den bakoitzean, 2 zenbakiaz zatitzen da. Jarraitu $2^{1}$ berreturaren azpitik: berretzaile 0 duenak 1 ematen du, eta negatiboek alderantzizkoak.',
                'En la tabla del dibujo, cada vez que el exponente baja uno, se divide entre 2. Sigue por debajo de $2^{1}$: el exponente 0 da 1 y los negativos dan los inversos.',
                'في جدول الرسم، كلما نقص الأس واحدًا نقسم على 2. تابع تحت $2^{1}$: الأس 0 يعطي 1، والأسس السالبة تعطي المقلوبات.',
                'In the table of the drawing, each time the exponent goes down one, you divide by 2. Carry on below $2^{1}$: the exponent 0 gives 1, and the negative ones give the reciprocals.'
            ),
            math: same('$\\begin{gathered}2^{1}\\div 2=2^{0}=1\\\\ 2^{0}\\div 2=2^{-1}=\\frac{1}{2}\\end{gathered}$')
        },
        examplePrompt: say('Kalkulatu $\\left(\\frac{2}{5}\\right)^{-2}$ eta $4^{-3}$.', 'Calcula $\\left(\\frac{2}{5}\\right)^{-2}$ y $4^{-3}$.', 'احسب $\\left(\\frac{2}{5}\\right)^{-2}$ و$4^{-3}$.', 'Calculate $\\left(\\frac{2}{5}\\right)^{-2}$ and $4^{-3}$.'),
        example: same('$\\begin{gathered}\\left(\\frac{2}{5}\\right)^{-2}=\\left(\\frac{5}{2}\\right)^{2}=\\frac{25}{4}\\\\ 4^{-3}=\\frac{1}{4^{3}}=\\frac{1}{64}\\end{gathered}$'),
        exampleAnswer: say('Berretzaile negatiboak oinarriari buelta ematen dio: $\\frac{25}{4}$ eta $\\frac{1}{64}$.', 'El exponente negativo da la vuelta a la base: $\\frac{25}{4}$ y $\\frac{1}{64}$.', 'الأس السالب يقلب الأساس: $\\frac{25}{4}$ و$\\frac{1}{64}$.', 'The negative exponent turns the base upside down: $\\frac{25}{4}$ and $\\frac{1}{64}$.')
    },
    /* ---------- 2. Decimals and fractions ---------- */
    'decimal-kinds': {
        definitions: [
            {
                term: say('Periodoa', 'Periodo', 'الدور', 'Recurring part'),
                meaning: say('Behin eta berriz errepikatzen diren zifra hamartarrak.', 'Las cifras decimales que se repiten una y otra vez.', 'الأرقام العشرية التي تتكرر مرة بعد مرة.', 'The decimal digits that repeat over and over.')
            },
            {
                term: say('Aurreperiodoa', 'Anteperiodo', 'ما قبل الدور', 'Non-recurring part'),
                meaning: say('Komaren eta periodoaren artean dauden zifrak.', 'Las cifras que hay entre la coma y el periodo.', 'الأرقام الواقعة بين الفاصلة والدور.', 'The digits between the decimal point and the recurring part.')
            }
        ],
        vocabulary: [
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('faktorea', 'factor', 'عامل', 'factor'),
            say('zifrak', 'cifras', 'الأرقام', 'digits')
        ],
        explanation: say(
            'Zenbakitzailea izendatzaileaz zatitzean, hondarra 0 izatera iristen da, edo hondar bat errepikatzen da eta orduan zifrak ere errepikatzen dira. Hiru hamartar mota daude:',
            'Al dividir el numerador entre el denominador, o el resto llega a 0 o un resto se repite, y entonces las cifras también se repiten. Hay tres tipos de decimales:',
            'عند قسمة البسط على المقام إما أن يصل الباقي إلى 0 وإما أن يتكرر باقٍ فتتكرر الأرقام أيضًا. هناك ثلاثة أنواع من الأعداد العشرية:',
            'When you divide the numerator by the denominator, either the remainder reaches 0 or a remainder repeats, and then the digits repeat too. There are three kinds of decimals:'
        ),
        cases: [
            { title: say('Zehatza', 'Exacto', 'منتهٍ', 'Terminating'), text: say('Hondarra 0 izatera iristen da.', 'El resto llega a 0.', 'يصل الباقي إلى 0.', 'The remainder reaches 0.'), math: same('$\\frac{9}{5}=1{,}8$') },
            { title: say('Periodiko hutsa', 'Periódico puro', 'دوري بحت', 'Pure recurring'), text: say('Periodoa komaren ondoren berehala hasten da.', 'El periodo empieza justo después de la coma.', 'يبدأ الدور بعد الفاصلة مباشرة.', 'The recurring part starts right after the decimal point.'), math: same('$\\frac{2}{3}=0{,}\\overline{6}$') },
            { title: say('Periodiko mistoa', 'Periódico mixto', 'دوري مختلط', 'Mixed recurring'), text: say('Periodoaren aurretik aurreperiodo bat dago.', 'Antes del periodo hay un anteperiodo.', 'قبل الدور يوجد ما قبل الدور.', 'There is a non-recurring part before the recurring part.'), math: same('$\\frac{5}{6}=0{,}8\\overline{3}$') }
        ],
        why: {
            text: say(
                'Zatiki laburtezinaren izendatzaileak aurretik esaten du. 2 eta 5 faktoreak bakarrik baditu, 10, 100… bihur daiteke, $10=2\\cdot 5$ delako, eta hamartarra zehatza da. Beste faktore batekin ez da inoiz 10, 100… ateratzen, eta hamartarra periodikoa da.',
                'El denominador de la fracción irreducible lo anuncia. Si solo tiene los factores 2 y 5, se puede convertir en 10, 100…, porque $10=2\\cdot 5$, y el decimal es exacto. Con otro factor nunca se llega a 10, 100…, y el decimal es periódico.',
                'مقام الكسر غير القابل للاختزال يخبرنا مسبقًا. إذا لم يكن فيه إلا العاملان 2 و5 أمكن تحويله إلى 10 أو 100…، لأن $10=2\\cdot 5$، فيكون العدد العشري منتهيًا. ومع عامل آخر لا نصل أبدًا إلى 10 أو 100…، فيكون دوريًا.',
                'The denominator of the simplest fraction tells you in advance. If its only factors are 2 and 5, it can be turned into 10, 100…, because $10=2\\cdot 5$, and the decimal terminates. With any other factor you never reach 10, 100…, and the decimal recurs.'
            ),
            math: same('$\\frac{3}{4}=\\frac{3\\cdot 25}{4\\cdot 25}=\\frac{75}{100}=0{,}75$')
        },
        examplePrompt: say('Nolakoa da $\\frac{7}{12}$ zatikiaren hamartarra?', '¿De qué tipo es el decimal de $\\frac{7}{12}$?', 'ما نوع العدد العشري للكسر $\\frac{7}{12}$؟', 'What kind of decimal does $\\frac{7}{12}$ give?'),
        example: same('$7\\div 12=0{,}58333\\ldots=0{,}58\\overline{3}$'),
        exampleAnswer: say('Periodiko mistoa: aurreperiodoa 58 da eta periodoa 3. Izendatzaileak, $12=2^{2}\\cdot 3$, 2 eta beste faktore bat ditu.', 'Periódico mixto: el anteperiodo es 58 y el periodo, 3. El denominador, $12=2^{2}\\cdot 3$, tiene el 2 y otro factor.', 'دوري مختلط: ما قبل الدور 58 والدور 3. والمقام $12=2^{2}\\cdot 3$ فيه 2 وعامل آخر.', 'Mixed recurring: the non-recurring part is 58 and the recurring part is 3. The denominator, $12=2^{2}\\cdot 3$, has the 2 and another factor.')
    },
    'exact-to-fraction': {
        definitions: [
            {
                term: say('Zatiki hamartarra', 'Fracción decimal', 'الكسر العشري', 'Decimal fraction'),
                meaning: say('Izendatzailea 10, 100, 1000… duen zatikia.', 'Una fracción cuyo denominador es 10, 100, 1000…', 'كسر مقامه 10 أو 100 أو 1000…', 'A fraction whose denominator is 10, 100, 1,000…')
            }
        ],
        vocabulary: [
            say('koma', 'coma', 'الفاصلة', 'decimal point'),
            say('zatiki laburtezina', 'fracción irreducible', 'كسر غير قابل للاختزال', 'simplest form'),
            say('z.k.h.', 'm.c.d.', 'القاسم المشترك الأكبر', 'GCD')
        ],
        explanation: say(
            'Hamartar zehatz bat zatiki bihurtzeko, idatzi zenbakitzailean koma gabeko zenbakia, eta izendatzailean 1 bat eta hamartar adina zero: $0{,}245=\\frac{245}{1000}$. Gero, sinplifikatu zenbakitzailea eta izendatzailea haien z.k.h. zenbakiaz zatituz.',
            'Para pasar un decimal exacto a fracción, escribe en el numerador el número sin la coma y en el denominador un 1 seguido de tantos ceros como decimales: $0{,}245=\\frac{245}{1000}$. Después simplifica dividiendo numerador y denominador entre su m.c.d.',
            'لتحويل عدد عشري منتهٍ إلى كسر اكتب في البسط العدد دون الفاصلة، وفي المقام 1 متبوعًا بأصفار بعدد المنازل العشرية: $0{,}245=\\frac{245}{1000}$. ثم بسّط بقسمة البسط والمقام على القاسم المشترك الأكبر لهما.',
            'To turn a terminating decimal into a fraction, write the number without the decimal point as the numerator, and a 1 followed by as many zeros as decimal places as the denominator: $0{,}245=\\frac{245}{1000}$. Then simplify by dividing the numerator and the denominator by their GCD.'
        ),
        examplePrompt: say('Idatzi $2{,}35$ zatiki laburtezin gisa.', 'Escribe $2{,}35$ como fracción irreducible.', 'اكتب $2{,}35$ كسرًا غير قابل للاختزال.', 'Write $2{,}35$ as a fraction in its simplest form.'),
        example: same('$2{,}35=\\frac{235}{100}=\\frac{47}{20}$'),
        exampleAnswer: say('Bi hamartar, bi zero; gero sinplifikatu 5 zenbakiaz.', 'Dos decimales, dos ceros; después simplifica entre 5.', 'منزلتان عشريتان، صفران؛ ثم بسّط بالقسمة على 5.', 'Two decimal places, two zeros; then simplify by 5.')
    },
    'periodic-to-fraction': {
        definitions: [
            {
                term: say('Zatiki sortzailea', 'Fracción generatriz', 'الكسر المولّد', 'Generating fraction'),
                meaning: say('Zatitzean hamartar hori ematen duen zatiki laburtezina.', 'La fracción irreducible que da ese decimal al dividir.', 'الكسر غير القابل للاختزال الذي يعطي ذلك العدد العشري عند القسمة.', 'The fraction in its simplest form that gives that decimal when you divide.')
            }
        ],
        vocabulary: [
            say('periodoa', 'periodo', 'الدور', 'recurring part'),
            say('aurreperiodoa', 'anteperiodo', 'ما قبل الدور', 'non-recurring part'),
            say('bederatzi', 'nueve', 'تسعة', 'nine')
        ],
        explanation: say(
            'Hamartar periodiko bat ere zatiki bat da. Zenbakitzailea: zifra guztiak (periodoa behin) ken periodoaren aurreko zifrak. Izendatzailea: 9 bat periodoko zifra bakoitzeko eta 0 bat aurreperiodoko zifra bakoitzeko.',
            'Un decimal periódico también es una fracción. Numerador: todas las cifras (el periodo una vez) menos las anteriores al periodo. Denominador: un 9 por cada cifra del periodo y un 0 por cada cifra del anteperiodo.',
            'العدد العشري الدوري كسر أيضًا. البسط: كل الأرقام (الدور مرة واحدة) ناقص الأرقام التي قبل الدور. المقام: 9 لكل رقم في الدور و0 لكل رقم فيما قبل الدور.',
            'A recurring decimal is a fraction too. Numerator: all the digits (the recurring part once) minus the digits before the recurring part. Denominator: a 9 for each digit of the recurring part and a 0 for each digit of the non-recurring part.'
        ),
        cases: [
            { title: say('Hutsa', 'Puro', 'بحت', 'Pure'), text: say('Aurreperiodorik gabe: bederatziak bakarrik.', 'Sin anteperiodo: solo nueves.', 'بلا ما قبل الدور: تسعات فقط.', 'No non-recurring part: only nines.'), math: same('$0{,}\\overline{6}=\\frac{6}{9}=\\frac{2}{3}$') },
            { title: say('Mistoa', 'Mixto', 'مختلط', 'Mixed'), text: say('9 bat periodoagatik eta 0 bat aurreperiodoagatik.', 'Un 9 por el periodo y un 0 por el anteperiodo.', '9 للدور و0 لما قبل الدور.', 'A 9 for the recurring part and a 0 for the non-recurring part.'), math: same('$1{,}8\\overline{3}=\\frac{183-18}{90}=\\frac{165}{90}=\\frac{11}{6}$') }
        ],
        why: {
            text: say(
                'Izan bedi $x=0{,}\\overline{6}$. 10 zenbakiaz biderkatzean, periodoa zifra bat mugitzen da eta komaren atzean berdin geratzen da. Kentzean, hamartar infinituak desagertzen dira, eta $9x=6$ geratzen da. Horregatik ateratzen da 9 bat periodoko zifra bakoitzeko.',
                'Sea $x=0{,}\\overline{6}$. Al multiplicar por 10, el periodo se corre una cifra y detrás de la coma queda igual. Al restar, los decimales infinitos desaparecen y queda $9x=6$. Por eso sale un 9 por cada cifra del periodo.',
                'ليكن $x=0{,}\\overline{6}$. عند الضرب في 10 ينتقل الدور رقمًا واحدًا ويبقى ما بعد الفاصلة كما هو. وعند الطرح تختفي الأرقام العشرية اللانهائية فيبقى $9x=6$. لذلك نضع 9 لكل رقم في الدور.',
                'Let $x=0{,}\\overline{6}$. Multiplying by 10 shifts the recurring part one digit, and after the decimal point it stays the same. When you subtract, the endless decimals disappear and $9x=6$ is left. That is why there is a 9 for each digit of the recurring part.'
            ),
            math: same('$\\begin{gathered}10x=6{,}666\\ldots\\\\ x=0{,}666\\ldots\\\\ 9x=6\\ \\Rightarrow\\ x=\\frac{6}{9}=\\frac{2}{3}\\end{gathered}$')
        },
        examplePrompt: say('Aurkitu $2{,}\\overline{18}$ hamartarraren zatiki sortzailea.', 'Halla la fracción generatriz de $2{,}\\overline{18}$.', 'أوجد الكسر المولّد للعدد $2{,}\\overline{18}$.', 'Find the generating fraction of $2{,}\\overline{18}$.'),
        example: same('$2{,}\\overline{18}=\\frac{218-2}{99}=\\frac{216}{99}=\\frac{24}{11}$'),
        exampleAnswer: say('Periodoak bi zifra ditu: bi bederatzi. Egiaztatu: $24\\div 11=2{,}1818\\ldots$', 'El periodo tiene dos cifras: dos nueves. Comprueba: $24\\div 11=2{,}1818\\ldots$', 'في الدور رقمان: تسعتان. تحقّق: $24\\div 11=2{,}1818\\ldots$', 'The recurring part has two digits: two nines. Check: $24\\div 11=2{,}1818\\ldots$')
    },
    /* ---------- 3. Irrational numbers and the real line ---------- */
    irrational: {
        definitions: [
            {
                term: say('Zenbaki irrazionala', 'Número irracional', 'العدد غير النسبي', 'Irrational number'),
                meaning: say('Zatiki gisa idatz ezin den zenbakia: zifra hamartar infinitu ditu, periodorik gabe.', 'Un número que no se puede escribir como fracción: tiene infinitas cifras decimales sin periodo.', 'عدد لا يمكن كتابته كسرًا: له عدد لا نهائي من الأرقام العشرية بلا دور.', 'A number that cannot be written as a fraction: it has infinitely many decimal places and no recurring part.')
            }
        ],
        vocabulary: [
            say('karratu perfektua', 'cuadrado perfecto', 'مربع كامل', 'perfect square'),
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root'),
            say('diagonala', 'diagonal', 'القطر', 'diagonal')
        ],
        explanation: say(
            'Irrazionalak dira $\\sqrt{2}=1{,}41421\\ldots$ (1 aldeko karratuaren diagonala), $\\pi=3{,}14159\\ldots$ eta karratu perfektua ez den edozein zenbaki naturalen erro karratua. Irrazional bat 0 ez den arrazional batekin batuta edo biderkatuta, irrazionala da oraindik: $3\\pi$, $1-\\sqrt{2}$.',
            'Son irracionales $\\sqrt{2}=1{,}41421\\ldots$ (la diagonal de un cuadrado de lado 1), $\\pi=3{,}14159\\ldots$ y la raíz cuadrada de cualquier natural que no sea cuadrado perfecto. Un irracional sumado o multiplicado por un racional distinto de 0 sigue siendo irracional: $3\\pi$, $1-\\sqrt{2}$.',
            'من الأعداد غير النسبية $\\sqrt{2}=1{,}41421\\ldots$ (قطر مربع ضلعه 1) و$\\pi=3{,}14159\\ldots$ والجذر التربيعي لأي عدد طبيعي ليس مربعًا كاملًا. وإذا جمعنا عددًا غير نسبي مع عدد نسبي غير الصفر أو ضربناه فيه بقي غير نسبي: $3\\pi$ و$1-\\sqrt{2}$.',
            'Irrational numbers include $\\sqrt{2}=1{,}41421\\ldots$ (the diagonal of a square with side 1), $\\pi=3{,}14159\\ldots$ and the square root of any natural number that is not a perfect square. An irrational number plus or times a rational number other than 0 is still irrational: $3\\pi$, $1-\\sqrt{2}$.'
        ),
        examplePrompt: say('Arrazionalak ala irrazionalak? $\\sqrt{36}$, $0{,}\\overline{3}$ eta $\\sqrt{8}$.', '¿Racionales o irracionales? $\\sqrt{36}$, $0{,}\\overline{3}$ y $\\sqrt{8}$.', 'نسبية أم غير نسبية؟ $\\sqrt{36}$ و$0{,}\\overline{3}$ و$\\sqrt{8}$.', 'Rational or irrational? $\\sqrt{36}$, $0{,}\\overline{3}$ and $\\sqrt{8}$.'),
        example: same('$\\begin{gathered}\\sqrt{36}=6\\in\\mathbb{Q}\\qquad 0{,}\\overline{3}=\\frac{1}{3}\\in\\mathbb{Q}\\\\ \\sqrt{8}=2{,}828\\ldots\\notin\\mathbb{Q}\\end{gathered}$'),
        exampleAnswer: say('$\\sqrt{36}$ eta $0{,}\\overline{3}$ arrazionalak dira; $\\sqrt{8}$ irrazionala, 8 ez delako karratu perfektua.', '$\\sqrt{36}$ y $0{,}\\overline{3}$ son racionales; $\\sqrt{8}$ es irracional, porque 8 no es cuadrado perfecto.', '$\\sqrt{36}$ و$0{,}\\overline{3}$ نسبيان؛ و$\\sqrt{8}$ غير نسبي لأن 8 ليس مربعًا كاملًا.', '$\\sqrt{36}$ and $0{,}\\overline{3}$ are rational; $\\sqrt{8}$ is irrational, because 8 is not a perfect square.')
    },
    'number-sets': {
        vocabulary: [
            say('multzoa', 'conjunto', 'مجموعة', 'set'),
            say('aurkakoa', 'opuesto', 'معاكس', 'opposite'),
            say('zatikia', 'fracción', 'كسر', 'fraction')
        ],
        explanation: say(
            'Multzo bakoitzak aurrekoa barne hartzen du; beraz, zenbaki bat multzo batean baino gehiagotan egon daiteke: 5 naturala, osoa, arrazionala eta erreala da.',
            'Cada conjunto contiene al anterior, así que un número puede estar en varios: 5 es natural, entero, racional y real.',
            'كل مجموعة تحتوي التي قبلها، لذلك قد ينتمي العدد إلى عدة مجموعات: 5 طبيعي وصحيح ونسبي وحقيقي.',
            'Each set contains the one before it, so a number can be in several: 5 is natural, integer, rational and real.'
        ),
        cases: [
            { title: say('Naturalak', 'Naturales', 'الطبيعية', 'Natural numbers'), text: say('Zenbatzeko erabiltzen direnak, 0 barne.', 'Los de contar, y el 0.', 'أعداد العدّ، ومعها 0.', 'The counting numbers, and 0.'), math: same('$\\mathbb{N}=\\{0,\\,1,\\,2,\\,3,\\,\\dots\\}$') },
            { title: say('Osoak', 'Enteros', 'الصحيحة', 'Integers'), text: say('Naturalak eta haien aurkakoak.', 'Los naturales y sus opuestos.', 'الطبيعية ومعاكساتها.', 'The natural numbers and their opposites.'), math: same('$\\mathbb{Z}=\\{\\dots,\\,-2,\\,-1,\\,0,\\,1,\\,2,\\,\\dots\\}$') },
            { title: say('Arrazionalak', 'Racionales', 'النسبية', 'Rational numbers'), text: say('Zatiki gisa idazten direnak: hamartar zehatzak eta periodikoak ere bai.', 'Los que se escriben como fracción: también los decimales exactos y periódicos.', 'ما يُكتب كسرًا: ومنها العشرية المنتهية والدورية.', 'Those that can be written as a fraction: terminating and recurring decimals too.'), math: same('$0{,}\\overline{3}=\\frac{1}{3}\\in\\mathbb{Q}$') },
            { title: say('Errealak', 'Reales', 'الحقيقية', 'Real numbers'), text: say('Arrazionalak eta irrazionalak batera.', 'Los racionales y los irracionales juntos.', 'النسبية وغير النسبية معًا.', 'The rational and the irrational numbers together.'), math: same('$\\mathbb{R}=\\mathbb{Q}\\cup\\mathbb{I}$') }
        ],
        examplePrompt: say('Sailkatu $-\\frac{12}{4}$ eta $\\sqrt{7}$.', 'Clasifica $-\\frac{12}{4}$ y $\\sqrt{7}$.', 'صنّف $-\\frac{12}{4}$ و$\\sqrt{7}$.', 'Classify $-\\frac{12}{4}$ and $\\sqrt{7}$.'),
        example: same('$-\\frac{12}{4}=-3\\in\\mathbb{Z}\\qquad \\sqrt{7}\\in\\mathbb{I}$'),
        exampleAnswer: say('$-\\frac{12}{4}$ osoa da (eta arrazionala eta erreala), zatiki gisa idatzita egon arren; $\\sqrt{7}$ irrazionala da (eta erreala).', '$-\\frac{12}{4}$ es entero (y racional y real), aunque esté escrito como fracción; $\\sqrt{7}$ es irracional (y real).', '$-\\frac{12}{4}$ عدد صحيح (ونسبي وحقيقي) وإن كُتب كسرًا؛ و$\\sqrt{7}$ غير نسبي (وحقيقي).', '$-\\frac{12}{4}$ is an integer (and rational and real), even though it is written as a fraction; $\\sqrt{7}$ is irrational (and real).')
    },
    'real-line': {
        vocabulary: [
            say('zuzen erreala', 'recta real', 'المستقيم الحقيقي', 'real number line'),
            say('konpasa', 'compás', 'الفرجار', 'compass'),
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse')
        ],
        explanation: say(
            'Zenbaki erreal bakoitza zuzeneko puntu bat da, eta puntu bakoitza zenbaki erreal bat: zuzen errealak ez du hutsunerik. Zenbakiak ordenatzeko, idatzi hamartar gisa eta konparatu zifraz zifra.',
            'Cada número real es un punto de la recta y cada punto es un número real: la recta real no tiene huecos. Para ordenar números, escríbelos como decimales y compáralos cifra a cifra.',
            'كل عدد حقيقي نقطة على المستقيم وكل نقطة عدد حقيقي: لا فراغات في المستقيم الحقيقي. ولترتيب الأعداد اكتبها أعدادًا عشرية وقارنها رقمًا رقمًا.',
            'Every real number is a point on the line and every point is a real number: the real number line has no gaps. To order numbers, write them as decimals and compare them digit by digit.'
        ),
        cases: [
            { title: say('Zatiki bat', 'Una fracción', 'كسر', 'A fraction'), text: say('Zati osoa gehi zatiki propioa: zatitu unitate hori zati berdinetan.', 'Parte entera más fracción propia: divide esa unidad en partes iguales.', 'جزء صحيح زائد كسر حقيقي: قسّم تلك الوحدة إلى أجزاء متساوية.', 'Whole part plus a proper fraction: split that unit into equal parts.'), math: same('$\\frac{8}{3}=2+\\frac{2}{3}$') },
            { title: say('Erro bat', 'Una raíz', 'جذر', 'A root'), text: say('Pitagorasekin: 1 eta 1 katetoen hipotenusa $\\sqrt{2}$ da; konpasak zuzenera eramaten du.', 'Con Pitágoras: la hipotenusa de catetos 1 y 1 mide $\\sqrt{2}$; el compás la lleva a la recta.', 'بفيثاغورس: وتر المثلث الذي ضلعاه القائمان 1 و1 طوله $\\sqrt{2}$؛ والفرجار ينقله إلى المستقيم.', 'With Pythagoras: the hypotenuse with legs 1 and 1 is $\\sqrt{2}$; the compass carries it to the line.'), math: same('$\\sqrt{1^{2}+1^{2}}=\\sqrt{2}$') },
            { title: say('Hamartar bat', 'Un decimal', 'عدد عشري', 'A decimal'), text: say('Zatitu tartea hamarnetan, gero ehunenetan…', 'Divide el tramo en décimas, después en centésimas…', 'قسّم المسافة إلى أعشار ثم إلى أجزاء من مئة…', 'Split the stretch into tenths, then into hundredths…') }
        ],
        examplePrompt: say('Nola adierazten da $\\sqrt{10}$ zuzenean?', '¿Cómo se representa $\\sqrt{10}$ en la recta?', 'كيف نمثّل $\\sqrt{10}$ على المستقيم؟', 'How do you draw $\\sqrt{10}$ on the line?'),
        example: same('$\\sqrt{10}=\\sqrt{3^{2}+1^{2}}$'),
        exampleAnswer: say('3 eta 1 katetoak dituen triangeluarekin: konpasak hipotenusa 0 puntutik eramaten du.', 'Con un triángulo de catetos 3 y 1: el compás lleva la hipotenusa desde el 0.', 'بمثلث ضلعاه القائمان 3 و1: ينقل الفرجار الوتر بدءًا من 0.', 'With a triangle whose legs are 3 and 1: the compass carries the hypotenuse from 0.')
    },
    intervals: {
        definitions: [
            {
                term: say('Tartea', 'Intervalo', 'الفترة', 'Interval'),
                meaning: say('Bi zenbakiren, bere muturren, arteko zenbaki erreal guztiak.', 'Todos los números reales comprendidos entre dos números, sus extremos.', 'كل الأعداد الحقيقية الواقعة بين عددين هما طرفاها.', 'All the real numbers between two numbers, its endpoints.')
            }
        ],
        vocabulary: [
            say('muturra', 'extremo', 'الطرف', 'endpoint'),
            say('kortxetea', 'corchete', 'القوس المعقوف', 'square bracket'),
            say('infinitua', 'infinito', 'اللانهاية', 'infinity')
        ],
        explanation: say(
            'Kortxeteak esan nahi du muturra barne dagoela (puntu betea), eta parentesiak, kanpo dagoela (puntu hutsa). Infinitua ez da zenbaki bat: beti parentesiarekin.',
            'El corchete indica que el extremo está incluido (punto lleno) y el paréntesis, que no lo está (punto vacío). El infinito no es un número: siempre lleva paréntesis.',
            'القوس المعقوف يعني أن الطرف داخل (نقطة ممتلئة)، والقوس العادي يعني أنه خارج (نقطة فارغة). واللانهاية ليست عددًا: دائمًا بقوس عادي.',
            'A square bracket means the endpoint is included (filled dot), and a round bracket that it is not (empty dot). Infinity is not a number: it always takes a round bracket.'
        ),
        cases: [
            { title: say('Itxia', 'Cerrado', 'مغلقة', 'Closed'), text: say('Bi muturrak barne.', 'Los dos extremos incluidos.', 'الطرفان داخلان.', 'Both endpoints included.'), math: same('$[a,\\,b]\\qquad a\\le x\\le b$') },
            { title: say('Irekia', 'Abierto', 'مفتوحة', 'Open'), text: say('Mutur bat ere ez barne.', 'Ningún extremo incluido.', 'لا طرف داخل.', 'No endpoint included.'), math: same('$(a,\\,b)\\qquad a<x<b$') },
            { title: say('Erdi-irekia', 'Semiabierto', 'نصف مفتوحة', 'Half-open'), text: say('Mutur bat bai eta bestea ez.', 'Un extremo sí y el otro no.', 'طرف داخل والآخر لا.', 'One endpoint in and the other out.'), math: same('$[a,\\,b)\\qquad a\\le x<b$') },
            { title: say('Zuzenerdia', 'Semirrecta', 'نصف مستقيم', 'Half-line'), text: say('Mutur bakarra du; bestea infinitura doa.', 'Tiene un solo extremo; el otro lado llega al infinito.', 'لها طرف واحد، والجهة الأخرى تمتد إلى اللانهاية.', 'It has only one endpoint; the other side goes on to infinity.'), math: same('$(a,\\,+\\infty)\\qquad x>a$') }
        ],
        examplePrompt: say('Idatzi tarte gisa $-3$ baino handiagoak eta $2$ baino txikiagoak edo berdinak diren zenbakiak.', 'Escribe como intervalo los números mayores que $-3$ y menores o iguales que $2$.', 'اكتب على صورة فترة الأعداد الأكبر من $-3$ والأصغر من $2$ أو المساوية له.', 'Write as an interval the numbers greater than $-3$ and less than or equal to $2$.'),
        example: same('$(-3,\\,2]\\qquad -3<x\\le 2$'),
        exampleAnswer: say('$-3$ kanpo dago (parentesia) eta $2$ barne (kortxetea).', 'El $-3$ no entra (paréntesis) y el $2$ sí (corchete).', '$-3$ خارج (قوس عادي) و$2$ داخل (قوس معقوف).', '$-3$ is left out (round bracket) and $2$ is in (square bracket).')
    },
    /* ---------- 4. Approximations and scientific notation ---------- */
    rounding: {
        definitions: [
            {
                term: say('Hurbilketa', 'Aproximación', 'التقريب', 'Approximation'),
                meaning: say('Zenbaki baten ordez erabiltzen den balio hurbil bat.', 'Un valor cercano que se usa en lugar de un número.', 'قيمة قريبة نستعملها بدلًا من العدد.', 'A close value used instead of a number.')
            }
        ],
        vocabulary: [
            say('ehunena', 'centésima', 'جزء من مئة', 'hundredth'),
            say('zifra', 'cifra', 'رقم', 'digit'),
            say('errorea', 'error', 'الخطأ', 'error')
        ],
        explanation: say(
            'Ordena jakin batera hurbiltzen da: hamarrenetara, ehunenetara… Bi modu daude, eta biribiltzeak trunkatzeak baino errore txikiagoa edo berdina ematen du beti.',
            'Se aproxima a un orden: décimas, centésimas… Hay dos maneras, y el redondeo da siempre un error menor o igual que el truncamiento.',
            'نقرّب إلى مرتبة معيّنة: الأعشار أو الأجزاء من مئة… وهناك طريقتان، والتقريب يعطي دائمًا خطأً أصغر من البتر أو مساويًا له.',
            'You approximate to a place: tenths, hundredths… There are two ways, and rounding always gives an error smaller than or equal to truncating.'
        ),
        cases: [
            { title: say('Trunkatu', 'Truncar', 'البتر', 'Truncate'), text: say('Ordena horretatik aurrerako zifrak kentzen dira.', 'Se suprimen las cifras a partir de ese orden.', 'نحذف الأرقام ابتداءً من تلك المرتبة.', 'Drop the digits from that place on.'), math: same('$82{,}745\\to 82{,}74$') },
            { title: say('Biribildu', 'Redondear', 'التقريب إلى الأقرب', 'Round'), text: say('Kentzen den lehen zifra 5 edo handiagoa bada, aurrekoari 1 gehitzen zaio; bestela, trunkatzean bezala geratzen da.', 'Si la primera cifra suprimida es 5 o mayor, se suma 1 a la anterior; si no, queda como al truncar.', 'إذا كان أول رقم محذوف 5 أو أكثر نضيف 1 إلى الرقم السابق؛ وإلا يبقى كما في البتر.', 'If the first digit dropped is 5 or more, add 1 to the one before; if not, it stays as when truncating.'), math: same('$82{,}745\\to 82{,}75\\qquad 1{,}234\\to 1{,}23$') }
        ],
        examplePrompt: say('Trunkatu eta biribildu $\\pi=3{,}14159\\ldots$ milarenetara.', 'Trunca y redondea $\\pi=3{,}14159\\ldots$ a las milésimas.', 'ابتر $\\pi=3{,}14159\\ldots$ وقرّبه إلى الأجزاء من ألف.', 'Truncate and round $\\pi=3{,}14159\\ldots$ to three decimal places.'),
        example: same('$3{,}14159\\ldots\\to 3{,}141\\qquad \\pi\\approx 3{,}142$'),
        exampleAnswer: say('Trunkatuta $3{,}141$; biribilduta $3{,}142$, kentzen den lehen zifra 5 delako.', 'Truncado, $3{,}141$; redondeado, $3{,}142$, porque la primera cifra suprimida es un 5.', 'مبتورًا $3{,}141$، ومقرّبًا $3{,}142$ لأن أول رقم محذوف هو 5.', 'Truncated, $3{,}141$; rounded, $3{,}142$, because the first digit dropped is a 5.')
    },
    errors: {
        definitions: [
            {
                term: say('Errore absolutua', 'Error absoluto', 'الخطأ المطلق', 'Absolute error'),
                meaning: say('Balio errealaren eta hurbilketaren arteko diferentzia, zeinurik gabe. Datuaren unitate berean ematen da.', 'La diferencia entre el valor real y la aproximación, sin signo. Va en las mismas unidades que el dato.', 'الفرق بين القيمة الحقيقية والتقريب دون إشارة. ويُعطى بوحدات المعطى نفسها.', 'The difference between the true value and the approximation, without its sign. It is given in the same units as the data.')
            },
            {
                term: say('Errore erlatiboa', 'Error relativo', 'الخطأ النسبي', 'Relative error'),
                meaning: say('Errore absolutua zati balio erreala. Ez du unitaterik; ehunekotan eman daiteke.', 'El error absoluto dividido entre el valor real. No tiene unidades; se puede dar en porcentaje.', 'الخطأ المطلق مقسومًا على القيمة الحقيقية. ليس له وحدة، ويمكن إعطاؤه نسبةً مئوية.', 'The absolute error divided by the true value. It has no units; it can be given as a percentage.')
            }
        ],
        vocabulary: [
            say('balio erreala', 'valor real', 'القيمة الحقيقية', 'true value'),
            say('hurbilketa', 'aproximación', 'التقريب', 'approximation'),
            say('ehunekoa', 'porcentaje', 'نسبة مئوية', 'percentage')
        ],
        explanation: say(
            '1 m-ko hari bat 8 zatitan moztean, zati bakoitza $0{,}125$ m da; $0{,}12$ m hartzen badugu, huts egiten dugu. Errore erlatiboak esaten du zein hurbilketa den hobea: 1 cm-ko errorea handia da arkatz batean, baina txikia etxe batean.',
            'Al cortar un cable de 1 m en 8 trozos, cada uno mide $0{,}125$ m; si tomamos $0{,}12$ m, nos equivocamos. El error relativo dice qué aproximación es mejor: 1 cm de error es mucho en un lápiz, pero poco en una casa.',
            'عند قطع سلك طوله 1 م إلى 8 قطع يكون طول كل قطعة $0{,}125$ م؛ وإذا أخذنا $0{,}12$ م أخطأنا. والخطأ النسبي يبيّن أي التقريبين أفضل: خطأ 1 سم كبير في قلم لكنه صغير في بيت.',
            'When you cut a 1 m cable into 8 pieces, each one is $0{,}125$ m long; if we take $0{,}12$ m, we are off. The relative error tells you which approximation is better: a 1 cm error is a lot for a pencil, but little for a house.'
        ),
        cases: [
            { title: say('Absolutua', 'Absoluto', 'المطلق', 'Absolute'), text: say('Zenbat huts egin dugun, datuaren unitateetan.', 'Cuánto nos equivocamos, en las unidades del dato.', 'مقدار الخطأ بوحدات المعطى.', 'How far off we are, in the units of the data.'), math: same('$E_a=|0{,}125-0{,}12|=0{,}005\\ \\mathrm{m}$') },
            { title: say('Erlatiboa', 'Relativo', 'النسبي', 'Relative'), text: say('Errore horrek zer garrantzi duen: zenbat eta txikiagoa, hobea.', 'Qué importancia tiene ese error: cuanto menor, mejor.', 'أهمية ذلك الخطأ: كلما صغر كان أفضل.', 'How much that error matters: the smaller, the better.'), math: same('$E_r=\\frac{0{,}005}{0{,}125}=0{,}04\\to 4\\,\\%$') }
        ],
        examplePrompt: say('Mahai batek $2{,}45$ m ditu eta $2{,}4$ m neurtu ditugu. Kalkulatu erroreak.', 'Una mesa mide $2{,}45$ m y la medimos como $2{,}4$ m. Calcula los errores.', 'طول طاولة $2{,}45$ م وقسناه $2{,}4$ م. احسب الخطأين.', 'A table is $2{,}45$ m long and we measure it as $2{,}4$ m. Calculate the errors.'),
        example: same('$\\begin{gathered}E_a=|2{,}45-2{,}4|=0{,}05\\ \\mathrm{m}\\\\ E_r=\\frac{0{,}05}{2{,}45}\\approx 0{,}02\\end{gathered}$'),
        exampleAnswer: say('Errore absolutua $0{,}05$ m da eta erlatiboa, $0{,}02$, hau da, % 2.', 'El error absoluto es $0{,}05$ m y el relativo, $0{,}02$, es decir, el 2 %.', 'الخطأ المطلق $0{,}05$ م والنسبي $0{,}02$، أي 2٪.', 'The absolute error is $0{,}05$ m and the relative error is $0{,}02$, that is, 2%.')
    },
    scientific: {
        definitions: [
            {
                term: say('Idazkera zientifikoa', 'Notación científica', 'الترميز العلمي', 'Scientific notation'),
                meaning: say('Zenbaki bat $a\\cdot 10^{n}$ moduan idaztea, $1\\le a<10$ eta $n$ osoa izanik.', 'Escribir un número como $a\\cdot 10^{n}$, con $1\\le a<10$ y $n$ entero.', 'كتابة العدد على الصورة $a\\cdot 10^{n}$ حيث $1\\le a<10$ و$n$ عدد صحيح.', 'Writing a number as $a\\cdot 10^{n}$, with $1\\le a<10$ and $n$ an integer.')
            }
        ],
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('koma', 'coma', 'الفاصلة', 'decimal point'),
            say('jauzia', 'salto', 'قفزة', 'place')
        ],
        explanation: say(
            'Koma zero ez den lehen zifraren atzean jartzen da, eta berretzaileak komaren jauziak zenbatzen ditu.',
            'La coma se pone detrás de la primera cifra distinta de cero, y el exponente cuenta los saltos de la coma.',
            'توضع الفاصلة بعد أول رقم غير الصفر، والأس يعدّ قفزات الفاصلة.',
            'The decimal point goes after the first non-zero digit, and the exponent counts the places the point moves.'
        ),
        cases: [
            { title: say('Zenbaki handia', 'Número grande', 'عدد كبير', 'Large number'), text: say('Koma ezkerrera mugitzen da: $n$ positiboa da.', 'La coma salta a la izquierda: $n$ es positivo.', 'تقفز الفاصلة إلى اليسار: $n$ موجب.', 'The point moves left: $n$ is positive.'), math: same('$83\\,400\\,000=8{,}34\\cdot 10^{7}$') },
            { title: say('Zenbaki txikia', 'Número pequeño', 'عدد صغير', 'Small number'), text: say('Koma eskuinera mugitzen da: $n$ negatiboa da.', 'La coma salta a la derecha: $n$ es negativo.', 'تقفز الفاصلة إلى اليمين: $n$ سالب.', 'The point moves right: $n$ is negative.'), math: same('$0{,}00052=5{,}2\\cdot 10^{-4}$') }
        ],
        examplePrompt: say('Idatzi idazkera zientifikoan $6\\,050\\,000$ eta $0{,}0081$.', 'Escribe en notación científica $6\\,050\\,000$ y $0{,}0081$.', 'اكتب بالترميز العلمي $6\\,050\\,000$ و$0{,}0081$.', 'Write $6\\,050\\,000$ and $0{,}0081$ in scientific notation.'),
        example: same('$\\begin{gathered}6\\,050\\,000=6{,}05\\cdot 10^{6}\\\\ 0{,}0081=8{,}1\\cdot 10^{-3}\\end{gathered}$'),
        exampleAnswer: say('6 jauzi ezkerrera eta 3 eskuinera.', '6 saltos a la izquierda y 3 a la derecha.', '6 قفزات إلى اليسار و3 إلى اليمين.', '6 places to the left and 3 to the right.')
    },
    'scientific-ops': {
        vocabulary: [
            say('berretura', 'potencia', 'قوة', 'power'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('egokitu', 'ajustar', 'اضبط', 'adjust')
        ],
        explanation: say(
            'Hamartarrekin eta 10 oinarriko berreturekin bereizita egiten da eragiketa. Amaieran, egokitu koma $1\\le a<10$ izan dadin: $25{,}2\\cdot 10^{5}=2{,}52\\cdot 10^{6}$.',
            'Se opera por separado con los decimales y con las potencias de 10. Al final, ajusta la coma para que $1\\le a<10$: $25{,}2\\cdot 10^{5}=2{,}52\\cdot 10^{6}$.',
            'نُجري العملية على العددين العشريين وعلى قوى 10 كلًّا على حدة. وفي النهاية اضبط الفاصلة ليكون $1\\le a<10$: $25{,}2\\cdot 10^{5}=2{,}52\\cdot 10^{6}$.',
            'You work separately with the decimals and with the powers of 10. At the end, adjust the point so that $1\\le a<10$: $25{,}2\\cdot 10^{5}=2{,}52\\cdot 10^{6}$.'
        ),
        cases: [
            { title: say('Biderkatu', 'Multiplicar', 'الضرب', 'Multiply'), text: say('Biderkatu hamartarrak eta batu berretzaileak.', 'Multiplica los decimales y suma los exponentes.', 'اضرب العددين العشريين واجمع الأسس.', 'Multiply the decimals and add the exponents.'), math: same('$10^{m}\\cdot 10^{n}=10^{m+n}$') },
            { title: say('Zatitu', 'Dividir', 'القسمة', 'Divide'), text: say('Zatitu hamartarrak eta kendu berretzaileak.', 'Divide los decimales y resta los exponentes.', 'اقسم العددين العشريين واطرح الأسس.', 'Divide the decimals and subtract the exponents.'), math: same('$10^{m}\\div 10^{n}=10^{m-n}$') }
        ],
        why: {
            text: say(
                '10 oinarriko berretura batek zeroak zenbatzen ditu: $10^{3}\\cdot 10^{2}$ biderketan 3 zero gehi 2 zero daude. Horregatik batzen dira berretzaileak biderkatzean, eta zatitzean zeroak kentzen dira: berretzaileak kendu egiten dira.',
                'Una potencia de 10 cuenta ceros: en $10^{3}\\cdot 10^{2}$ hay 3 ceros más 2 ceros. Por eso al multiplicar se suman los exponentes, y al dividir se quitan ceros: los exponentes se restan.',
                'قوة 10 تعدّ الأصفار: في $10^{3}\\cdot 10^{2}$ ثلاثة أصفار زائد صفرين. لذلك نجمع الأسس عند الضرب، وعند القسمة نحذف أصفارًا: نطرح الأسس.',
                'A power of 10 counts zeros: in $10^{3}\\cdot 10^{2}$ there are 3 zeros plus 2 zeros. That is why multiplying adds the exponents, and dividing takes zeros away: the exponents are subtracted.'
            ),
            math: same('$\\begin{aligned}10^{3}\\cdot 10^{2}&=1000\\cdot 100\\\\ &=100\\,000=10^{5}\\end{aligned}$')
        },
        examplePrompt: say('Kalkulatu $(3\\cdot 10^{8})\\cdot(5\\cdot 10^{-3})$.', 'Calcula $(3\\cdot 10^{8})\\cdot(5\\cdot 10^{-3})$.', 'احسب $(3\\cdot 10^{8})\\cdot(5\\cdot 10^{-3})$.', 'Calculate $(3\\cdot 10^{8})\\cdot(5\\cdot 10^{-3})$.'),
        example: same('$\\begin{aligned}(3\\cdot 5)\\cdot 10^{8+(-3)}&=15\\cdot 10^{5}\\\\ &=1{,}5\\cdot 10^{6}\\end{aligned}$'),
        exampleAnswer: say('15 zenbakitik $1{,}5$ zenbakira: koma ezkerrera mugitzen da eta berretzailea 1 igotzen da.', 'De 15 a $1{,}5$: la coma salta a la izquierda y el exponente sube 1.', 'من 15 إلى $1{,}5$: تقفز الفاصلة إلى اليسار ويزيد الأس 1.', 'From 15 to $1{,}5$: the point moves left and the exponent goes up by 1.')
    },
    /* ---------- 5. Roots and radicals ---------- */
    roots: {
        definitions: [
            {
                term: say('$n$ indizeko erroa', 'Raíz de índice $n$', 'الجذر ذو الدليل $n$', 'Root with index $n$'),
                meaning: say('$n$ berretzailera jasota errokizuna ematen duen zenbakia: $\\sqrt[3]{8}=2$, $2^{3}=8$ delako.', 'El número que elevado a $n$ da el radicando: $\\sqrt[3]{8}=2$ porque $2^{3}=8$.', 'العدد الذي إذا رُفع إلى $n$ أعطى ما تحت الجذر: $\\sqrt[3]{8}=2$ لأن $2^{3}=8$.', 'The number that, raised to $n$, gives the radicand: $\\sqrt[3]{8}=2$ because $2^{3}=8$.')
            }
        ],
        vocabulary: [
            say('indizea', 'índice', 'الدليل', 'index'),
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand'),
            say('bakoitia', 'impar', 'فردي', 'odd')
        ],
        explanation: say(
            'Indizea bikoitia bada, errokizun negatibo batek ez du erro errealik ($\\sqrt{-4}$ ez dago $\\mathbb{R}$ multzoan); bakoitia bada, bai: $\\sqrt[5]{-32}=-2$. Erro bat berretzaile zatikidun berretura gisa idatz daiteke: izendatzailea indizea da eta zenbakitzailea, berretzailea.',
            'Con índice par, un radicando negativo no tiene raíz real ($\\sqrt{-4}$ no está en $\\mathbb{R}$); con índice impar, sí: $\\sqrt[5]{-32}=-2$. Una raíz se escribe como potencia de exponente fraccionario: el denominador es el índice y el numerador, el exponente.',
            'إذا كان الدليل زوجيًا فلا جذر حقيقي لما تحت الجذر السالب ($\\sqrt{-4}$ ليس في $\\mathbb{R}$)؛ وإذا كان فرديًا فنعم: $\\sqrt[5]{-32}=-2$. ويُكتب الجذر قوةً ذات أس كسري: المقام هو الدليل والبسط هو الأس.',
            'With an even index, a negative radicand has no real root ($\\sqrt{-4}$ is not in $\\mathbb{R}$); with an odd index, it does: $\\sqrt[5]{-32}=-2$. A root can be written as a power with a fractional exponent: the denominator is the index and the numerator is the exponent.'
        ),
        cases: [
            { title: say('Erroa berretura gisa', 'Raíz como potencia', 'الجذر قوةً', 'Root as a power'), text: say('Behekoa indizea da; goikoa, berretzailea.', 'El de abajo es el índice; el de arriba, el exponente.', 'الذي في الأسفل هو الدليل، والذي في الأعلى هو الأس.', 'The bottom number is the index; the top one, the exponent.'), math: same('$\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$') },
            { title: say('Indize bakoitia', 'Índice impar', 'دليل فردي', 'Odd index'), text: say('Negatibo baten erroa negatiboa da.', 'La raíz de un negativo es negativa.', 'جذر العدد السالب سالب.', 'The root of a negative number is negative.'), math: same('$\\sqrt[3]{-27}=-3$') }
        ],
        examplePrompt: say('Kalkulatu $27^{\\frac{2}{3}}$ eta idatzi $\\sqrt[4]{x^{3}}$ berretura gisa.', 'Calcula $27^{\\frac{2}{3}}$ y escribe $\\sqrt[4]{x^{3}}$ como potencia.', 'احسب $27^{\\frac{2}{3}}$ واكتب $\\sqrt[4]{x^{3}}$ قوةً.', 'Calculate $27^{\\frac{2}{3}}$ and write $\\sqrt[4]{x^{3}}$ as a power.'),
        example: same('$\\begin{gathered}27^{\\frac{2}{3}}=(3^{3})^{\\frac{2}{3}}=3^{2}=9\\\\ \\sqrt[4]{x^{3}}=x^{\\frac{3}{4}}\\end{gathered}$'),
        exampleAnswer: say('Idatzi oinarria berretura gisa, $27=3^{3}$, eta biderkatu berretzaileak.', 'Escribe la base como potencia, $27=3^{3}$, y multiplica los exponentes.', 'اكتب الأساس قوةً، $27=3^{3}$، واضرب الأسس.', 'Write the base as a power, $27=3^{3}$, and multiply the exponents.')
    },
    'radical-simplify': {
        vocabulary: [
            say('faktore lehena', 'factor primo', 'عامل أولي', 'prime factor'),
            say('bikotea', 'pareja', 'زوج', 'pair'),
            say('atera', 'extraer', 'أخرج', 'take out')
        ],
        explanation: say(
            'Deskonposatu errokizuna faktore lehenetan. Erro karratu batean, $a^{2}$ bikote bakoitza $a$ gisa ateratzen da; $n$ indizeko erroan, $n$ faktore berdinen talde bakoitza.',
            'Descompón el radicando en factores primos. En una raíz cuadrada, cada pareja $a^{2}$ sale como $a$; con índice $n$, sale cada grupo de $n$ factores iguales.',
            'حلّل ما تحت الجذر إلى عوامل أولية. في الجذر التربيعي يخرج كل زوج $a^{2}$ على صورة $a$؛ ومع الدليل $n$ تخرج كل مجموعة من $n$ عوامل متساوية.',
            'Break the radicand into prime factors. In a square root, each pair $a^{2}$ comes out as $a$; with index $n$, each group of $n$ equal factors comes out.'
        ),
        cases: [
            { title: say('Faktoreak atera', 'Extraer factores', 'إخراج العوامل', 'Take factors out'), text: say('Bi bikote ateratzen dira: $2\\cdot 3=6$.', 'Salen dos parejas: $2\\cdot 3=6$.', 'يخرج زوجان: $2\\cdot 3=6$.', 'Two pairs come out: $2\\cdot 3=6$.'), math: same('$\\sqrt{72}=\\sqrt{2^{2}\\cdot 3^{2}\\cdot 2}=6\\sqrt{2}$') },
            { title: say('Sinplifikatu', 'Simplificar', 'التبسيط', 'Simplify'), text: say('Zatitu indizea eta errokizunaren berretzailea zenbaki berberaz.', 'Divide el índice y el exponente del radicando entre el mismo número.', 'اقسم الدليل وأس ما تحت الجذر على العدد نفسه.', 'Divide the index and the exponent of the radicand by the same number.'), math: same('$\\sqrt[6]{8}=\\sqrt[6]{2^{3}}=\\sqrt{2}$') }
        ],
        examplePrompt: say('Atera faktoreak $\\sqrt{98}$ eta $\\sqrt[3]{54}$ erroetatik.', 'Extrae factores de $\\sqrt{98}$ y de $\\sqrt[3]{54}$.', 'أخرج العوامل من $\\sqrt{98}$ ومن $\\sqrt[3]{54}$.', 'Take the factors out of $\\sqrt{98}$ and $\\sqrt[3]{54}$.'),
        example: same('$\\begin{gathered}\\sqrt{98}=\\sqrt{2\\cdot 7^{2}}=7\\sqrt{2}\\\\ \\sqrt[3]{54}=\\sqrt[3]{2\\cdot 3^{3}}=3\\sqrt[3]{2}\\end{gathered}$'),
        exampleAnswer: say('Erro karratuan bikote bat ateratzen da ($7^{2}$); kubikoan, hiruko talde bat ($3^{3}$).', 'En la raíz cuadrada sale una pareja ($7^{2}$); en la cúbica, un grupo de tres ($3^{3}$).', 'في الجذر التربيعي يخرج زوج ($7^{2}$)، وفي التكعيبي مجموعة من ثلاثة ($3^{3}$).', 'In the square root a pair comes out ($7^{2}$); in the cube root, a group of three ($3^{3}$).')
    },
    'radical-ops': {
        definitions: [
            {
                term: say('Erradikal antzekoak', 'Radicales semejantes', 'الجذور المتشابهة', 'Like radicals'),
                meaning: say('Indize bera eta errokizun bera dituztenak, $3\\sqrt{2}$ eta $5\\sqrt{2}$ bezala.', 'Los que tienen el mismo índice y el mismo radicando, como $3\\sqrt{2}$ y $5\\sqrt{2}$.', 'الجذور التي لها الدليل نفسه وما تحت الجذر نفسه، مثل $3\\sqrt{2}$ و$5\\sqrt{2}$.', 'Radicals with the same index and the same radicand, like $3\\sqrt{2}$ and $5\\sqrt{2}$.')
            }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('arrazionalizatu', 'racionalizar', 'إنطاق المقام', 'rationalise'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Erradikalak errokizunak elkartuz biderkatzen dira, baina antzekoak badira bakarrik batzen dira. Eragiketak egin aurretik, atera faktoreak: horrela agertzen dira antzekoak.',
            'Los radicales se multiplican juntando los radicandos, pero solo se suman si son semejantes. Antes de operar, extrae factores: así aparecen los semejantes.',
            'تُضرب الجذور بجمع ما تحتها في جذر واحد، لكنها لا تُجمع إلا إذا كانت متشابهة. قبل الحساب أخرج العوامل: هكذا تظهر الجذور المتشابهة.',
            'Radicals are multiplied by putting the radicands together, but they are only added if they are like radicals. Before you work them out, take the factors out: that is how like radicals appear.'
        ),
        cases: [
            { title: say('Biderkatu', 'Multiplicar', 'الضرب', 'Multiply'), text: say('Indize berarekin, errokizunak elkartzen dira.', 'Con el mismo índice, se juntan los radicandos.', 'مع الدليل نفسه نجمع ما تحت الجذرين.', 'With the same index, put the radicands together.'), math: same('$\\sqrt{2}\\cdot\\sqrt{18}=\\sqrt{36}=6$') },
            { title: say('Batu', 'Sumar', 'الجمع', 'Add'), text: say('Antzekoak bakarrik: koefizienteak batzen dira.', 'Solo los semejantes: se suman los coeficientes.', 'المتشابهة فقط: نجمع المعاملات.', 'Only like radicals: add the coefficients.'), math: same('$3\\sqrt{2}+5\\sqrt{2}=8\\sqrt{2}$') },
            { title: say('Arrazionalizatu', 'Racionalizar', 'إنطاق المقام', 'Rationalise'), text: say('Izendatzailean erroa badago, biderkatu goian eta behean erro horrekin.', 'Si hay una raíz en el denominador, multiplica arriba y abajo por ella.', 'إذا كان في المقام جذر، اضرب البسط والمقام فيه.', 'If there is a root in the denominator, multiply the top and the bottom by it.'), math: same('$\\frac{2}{\\sqrt{3}}=\\frac{2\\sqrt{3}}{3}$') }
        ],
        why: {
            text: say(
                'Errokizunak batzeak ez du balio: $\\sqrt{9}+\\sqrt{16}$ batuketak 7 ematen du, baina $\\sqrt{25}$ erroak 5. Biderkatzean, berriz, bai: $\\sqrt{4}\\cdot\\sqrt{9}=2\\cdot 3=6$, eta $\\sqrt{36}=6$ ere bai.',
                'Sumar los radicandos no vale: $\\sqrt{9}+\\sqrt{16}$ da 7, pero $\\sqrt{25}$ da 5. Al multiplicar, en cambio, sí: $\\sqrt{4}\\cdot\\sqrt{9}=2\\cdot 3=6$, y también $\\sqrt{36}=6$.',
                'جمع ما تحت الجذور لا يصح: $\\sqrt{9}+\\sqrt{16}$ يساوي 7، أما $\\sqrt{25}$ فيساوي 5. أما في الضرب فيصح: $\\sqrt{4}\\cdot\\sqrt{9}=2\\cdot 3=6$، وكذلك $\\sqrt{36}=6$.',
                'Adding the radicands does not work: $\\sqrt{9}+\\sqrt{16}$ is 7, but $\\sqrt{25}$ is 5. Multiplying, however, does: $\\sqrt{4}\\cdot\\sqrt{9}=2\\cdot 3=6$, and $\\sqrt{36}=6$ too.'
            ),
            math: same('$\\begin{gathered}\\sqrt{9}+\\sqrt{16}=3+4=7\\\\ \\sqrt{25}=5\\end{gathered}$')
        },
        examplePrompt: say('Kalkulatu $\\sqrt{12}+\\sqrt{75}$ eta arrazionalizatu $\\frac{10}{\\sqrt{5}}$.', 'Calcula $\\sqrt{12}+\\sqrt{75}$ y racionaliza $\\frac{10}{\\sqrt{5}}$.', 'احسب $\\sqrt{12}+\\sqrt{75}$ وأنطق مقام $\\frac{10}{\\sqrt{5}}$.', 'Calculate $\\sqrt{12}+\\sqrt{75}$ and rationalise $\\frac{10}{\\sqrt{5}}$.'),
        example: same('$\\begin{gathered}\\sqrt{12}+\\sqrt{75}=2\\sqrt{3}+5\\sqrt{3}=7\\sqrt{3}\\\\ \\frac{10}{\\sqrt{5}}=\\frac{10\\sqrt{5}}{5}=2\\sqrt{5}\\end{gathered}$'),
        exampleAnswer: say('Faktoreak atera ondoren, $2\\sqrt{3}$ eta $5\\sqrt{3}$ antzekoak dira: $7\\sqrt{3}$. Bigarrena: $2\\sqrt{5}$.', 'Al extraer factores, $2\\sqrt{3}$ y $5\\sqrt{3}$ son semejantes: $7\\sqrt{3}$. El segundo: $2\\sqrt{5}$.', 'بعد إخراج العوامل يصبح $2\\sqrt{3}$ و$5\\sqrt{3}$ متشابهين: $7\\sqrt{3}$. والثاني: $2\\sqrt{5}$.', 'Once the factors are out, $2\\sqrt{3}$ and $5\\sqrt{3}$ are like radicals: $7\\sqrt{3}$. The second one: $2\\sqrt{5}$.')
    }
}

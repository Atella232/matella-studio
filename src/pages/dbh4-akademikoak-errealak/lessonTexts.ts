import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { RealsPercentTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zenbaki errealak eta ehunekoak · 4. DBH akademikoak — what each lesson
   tells: the new words (definitions), a short explanation, its cases, the
   example as an exercise («Another example»), the key words in four
   languages and, in a few lessons, «Why does it work?». Plain data so the
   tests can import it; lessons.tsx merges it into the topics. The example
   uses numbers of its own, never those of «Let's solve», of «Check it» or
   of the typical mistake. Arabic writes the decimal point ({,} becomes .).
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const realsPercentLessonTexts: Record<RealsPercentTopicId, LessonTexts> = {
    /* ---------- 1. Rational numbers ---------- */
    'decimal-kinds': {
        definitions: [
            {
                term: say('Zenbaki arrazionala', 'Número racional', 'العدد النسبي', 'Rational number'),
                meaning: say('Zatiki gisa idatz daitekeen zenbakia: $\\frac{a}{b}$, $a$ eta $b$ osoak eta $b\\neq 0$.', 'El que se puede escribir como fracción: $\\frac{a}{b}$, con $a$ y $b$ enteros y $b\\neq 0$.', 'عدد يمكن كتابته كسرًا: $\\frac{a}{b}$ حيث $a$ و$b$ صحيحان و$b\\neq 0$.', 'A number that can be written as a fraction: $\\frac{a}{b}$, with $a$ and $b$ integers and $b\\neq 0$.')
            },
            {
                term: say('Periodoa', 'Periodo', 'الدور', 'Recurring part'),
                meaning: say('Amaierarik gabe errepikatzen diren zifra hamartarrak. Haien aurretik doazen zifra hamartarrak aurreperiodoa dira.', 'Las cifras decimales que se repiten sin fin. Las cifras decimales que van antes forman el anteperiodo.', 'الأرقام العشرية التي تتكرر بلا نهاية. والأرقام العشرية التي تسبقها هي الجزء غير الدوري.', 'The decimal digits that repeat forever. The decimal digits before them are the non-recurring part.')
            }
        ],
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('faktore lehenak', 'factores primos', 'العوامل الأولية', 'prime factors'),
            say('koma', 'coma', 'الفاصلة', 'decimal point')
        ],
        explanation: say(
            'Zatiketa eginda, zatiki batek hamartar zehatza, periodiko hutsa edo periodiko mistoa ematen du. Mota zein den zatiki laburtezinaren izendatzaileak esaten du: deskonposatu faktore lehenetan eta begiratu 2 eta 5 faktoreak bakarrik dituen ala beste batzuk ere bai.',
            'Al hacer la división, una fracción da un decimal exacto, periódico puro o periódico mixto. El tipo lo dice el denominador de la fracción irreducible: descomponlo en factores primos y mira si solo tiene los factores 2 y 5 o tiene otros.',
            'عند إجراء القسمة يعطي الكسر عددًا عشريًا منتهيًا أو دوريًا بحتًا أو دوريًا مختلطًا. ويحدد النوعَ مقامُ الكسر بعد الاختزال: حلّله إلى العوامل الأولية وانظر هل فيه العاملان 2 و5 فقط أم عوامل أخرى.',
            'When you divide, a fraction gives a terminating, purely recurring or mixed recurring decimal. The denominator of the fraction in its simplest form tells you which: break it into prime factors and see whether it has only the factors 2 and 5 or others too.'
        ),
        cases: [
            { title: say('Zehatza', 'Exacto', 'منتهٍ', 'Terminating'), text: say('Izendatzaileak 2 eta 5 faktoreak bakarrik ditu.', 'El denominador solo tiene los factores 2 y 5.', 'ليس في المقام إلا العاملان 2 و5.', 'The denominator has only the factors 2 and 5.'), math: same('$\\frac{9}{5}=1{,}8$') },
            { title: say('Periodiko hutsa', 'Periódico puro', 'دوري بحت', 'Purely recurring'), text: say('Ez du ez 2 ez 5: periodoa komaren ondoren berehala hasten da.', 'No tiene ni 2 ni 5: el periodo empieza justo después de la coma.', 'ليس فيه 2 ولا 5: يبدأ الدور بعد الفاصلة مباشرة.', 'It has neither 2 nor 5: the recurring part starts right after the decimal point.'), math: same('$\\frac{2}{3}=0{,}\\overline{6}$') },
            { title: say('Periodiko mistoa', 'Periódico mixto', 'دوري مختلط', 'Mixed recurring'), text: say('2 edo 5 du, eta beste faktore bat: periodoaren aurretik aurreperiodoa dago.', 'Tiene 2 o 5 y otro factor: antes del periodo hay un anteperiodo.', 'فيه 2 أو 5 وعامل آخر: قبل الدور جزء غير دوري.', 'It has 2 or 5 and another factor: there is a non-recurring part before the recurring part.'), math: same('$\\frac{11}{6}=1{,}8\\overline{3}$') }
        ],
        examplePrompt: say('Zer hamartar mota ematen dute $\\frac{7}{20}$ eta $\\frac{7}{30}$ zatikiek?', '¿Qué tipo de decimal dan $\\frac{7}{20}$ y $\\frac{7}{30}$?', 'ما نوع العدد العشري الذي يعطيه $\\frac{7}{20}$ و$\\frac{7}{30}$؟', 'What type of decimal do $\\frac{7}{20}$ and $\\frac{7}{30}$ give?'),
        example: same('$\\begin{gathered}20=2^{2}\\cdot 5\\ \\to\\ \\frac{7}{20}=0{,}35\\\\ 30=2\\cdot 3\\cdot 5\\ \\to\\ \\frac{7}{30}=0{,}2\\overline{3}\\end{gathered}$'),
        exampleAnswer: say('$\\frac{7}{20}$ zehatza da; $\\frac{7}{30}$, periodiko mistoa (3 faktorea du).', '$\\frac{7}{20}$ es exacto; $\\frac{7}{30}$, periódico mixto (tiene el factor 3).', '$\\frac{7}{20}$ منتهٍ، و$\\frac{7}{30}$ دوري مختلط (فيه العامل 3).', '$\\frac{7}{20}$ is terminating; $\\frac{7}{30}$ is mixed recurring (it has the factor 3).'),
        why: {
            text: say(
                'Izendatzaileak 2 eta 5 bakarrik baditu, zatikia 10, 100, 1000… izendatzailearekin idatz daiteke, eta zehatza da. Bestela, zatiketako hondarrak zatitzailea baino txikiagoak dira; noizbait hondar bat errepikatzen da, eta handik aurrera zifrak ere bai.',
                'Si el denominador solo tiene doses y cincos, la fracción se puede escribir con denominador 10, 100, 1000…, y es exacta. Si no, los restos de la división son menores que el divisor; algún resto acaba repitiéndose y, desde ahí, también las cifras.',
                'إذا لم يكن في المقام إلا العاملان 2 و5 أمكن كتابة الكسر بمقام 10 أو 100 أو 1000…، فيكون منتهيًا. وإلا فإن بواقي القسمة أصغر من المقسوم عليه، فيتكرر أحد البواقي عاجلًا أو آجلًا، ومن هناك تتكرر الأرقام أيضًا.',
                'If the denominator has only 2s and 5s, the fraction can be written over 10, 100, 1,000…, so it terminates. If not, the remainders of the division are smaller than the divisor; sooner or later a remainder repeats, and from there the digits repeat too.'
            ),
            math: same('$\\frac{7}{20}=\\frac{7\\cdot 5}{20\\cdot 5}=\\frac{35}{100}=0{,}35$')
        }
    },
    generatrix: {
        definitions: [
            {
                term: say('Zatiki sortzailea', 'Fracción generatriz', 'الكسر المولّد', 'Generating fraction'),
                meaning: say('Zatitzean hamartar zehatz edo periodiko bat ematen duen zatiki laburtezina.', 'La fracción irreducible que, al dividir, da un decimal exacto o periódico.', 'الكسر غير القابل للاختزال الذي يعطي عند القسمة عددًا عشريًا منتهيًا أو دوريًا.', 'The fraction in simplest form that gives a terminating or recurring decimal when you divide.')
            }
        ],
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('sinplifikatu', 'simplificar', 'بسّط', 'simplify')
        ],
        explanation: say(
            'Errezeta bat dago hamartar zehatzetarako eta beste bat periodikoetarako. Bi kasuetan, sinplifikatu amaieran: zatiki sortzailea laburtezina da. Horrek frogatzen du hamartar zehatz eta periodiko guztiak zenbaki arrazionalak direla.',
            'Hay una receta para los decimales exactos y otra para los periódicos. En los dos casos, simplifica al final: la generatriz es irreducible. Esto prueba que todo decimal exacto o periódico es un número racional.',
            'هناك طريقة للأعداد العشرية المنتهية وأخرى للدورية. وفي الحالتين بسّط في النهاية: الكسر المولّد غير قابل للاختزال. وهذا يثبت أن كل عدد عشري منتهٍ أو دوري عدد نسبي.',
            'There is one recipe for terminating decimals and another for recurring ones. In both cases, simplify at the end: the generating fraction is in its simplest form. This shows that every terminating or recurring decimal is a rational number.'
        ),
        cases: [
            { title: say('Zehatza', 'Exacto', 'منتهٍ', 'Terminating'), text: say('Zenbakitzailean, zenbakia komarik gabe; izendatzailean, 1 bat eta hamartar adina zero.', 'Numerador: el número sin la coma. Denominador: un 1 seguido de tantos ceros como decimales.', 'البسط: العدد دون فاصلة. المقام: 1 تتبعه أصفار بعدد المنازل العشرية.', 'Numerator: the number without the decimal point. Denominator: a 1 followed by as many zeros as decimal places.'), math: same('$2{,}35=\\frac{235}{100}=\\frac{47}{20}$') },
            { title: say('Periodikoa', 'Periódico', 'دوري', 'Recurring'), text: say('Zenbakitzailean, zifra guztiak ken periodoaren aurrekoak; izendatzailean, 9 bat periodoko zifra bakoitzeko eta 0 bat aurreperiodoko bakoitzeko.', 'Numerador: todas las cifras menos las anteriores al periodo. Denominador: un 9 por cada cifra del periodo y un 0 por cada cifra del anteperiodo.', 'البسط: كل الأرقام ناقص الأرقام التي قبل الدور. المقام: 9 لكل رقم في الدور و0 لكل رقم في الجزء غير الدوري.', 'Numerator: all the digits minus those before the recurring part. Denominator: a 9 for each recurring digit and a 0 for each non-recurring digit.'), math: same('$1{,}8\\overline{3}=\\frac{183-18}{90}=\\frac{165}{90}=\\frac{11}{6}$') }
        ],
        examplePrompt: say('Aurkitu $0{,}\\overline{27}$ eta $3{,}12$ zenbakien zatiki sortzaileak.', 'Halla la fracción generatriz de $0{,}\\overline{27}$ y de $3{,}12$.', 'جد الكسر المولّد لكلٍّ من $0{,}\\overline{27}$ و$3{,}12$.', 'Find the generating fractions of $0{,}\\overline{27}$ and $3{,}12$.'),
        example: same('$\\begin{gathered}0{,}\\overline{27}=\\frac{27}{99}=\\frac{3}{11}\\\\ 3{,}12=\\frac{312}{100}=\\frac{78}{25}\\end{gathered}$'),
        exampleAnswer: say('$\\frac{3}{11}$ eta $\\frac{78}{25}$, jada laburtezinak.', '$\\frac{3}{11}$ y $\\frac{78}{25}$, ya irreducibles.', '$\\frac{3}{11}$ و$\\frac{78}{25}$، وهما غير قابلين للاختزال.', '$\\frac{3}{11}$ and $\\frac{78}{25}$, already in simplest form.'),
        why: {
            text: say(
                'Deitu $x$ hamartarrari. $x=0{,}\\overline{27}$ bada, 100 zenbakiaz biderkatzean periodoa bi lekutan mugitzen da: $100x=27{,}\\overline{27}$. Kentzean, periodoak ezabatu egiten dira: $99x=27$. Horregatik dago 9 bat periodoko zifra bakoitzeko.',
                'Llama $x$ al decimal. Si $x=0{,}\\overline{27}$, al multiplicar por 100 el periodo se corre dos lugares: $100x=27{,}\\overline{27}$. Al restar, los periodos se anulan: $99x=27$. Por eso hay un 9 por cada cifra del periodo.',
                'سمِّ العدد العشري $x$. إذا كان $x=0{,}\\overline{27}$ فإن الضرب في 100 يزيح الدور منزلتين: $100x=27{,}\\overline{27}$. وعند الطرح يختفي الدور: $99x=27$. لذلك يوجد 9 لكل رقم في الدور.',
                'Call the decimal $x$. If $x=0{,}\\overline{27}$, multiplying by 100 shifts the recurring part two places: $100x=27{,}\\overline{27}$. When you subtract, the recurring parts cancel: $99x=27$. That is why there is a 9 for each recurring digit.'
            ),
            math: same('$100x-x=27\\ \\to\\ x=\\frac{27}{99}=\\frac{3}{11}$')
        }
    },
    'order-density': {
        definitions: [
            {
                term: say('Multzo dentsoa', 'Conjunto denso', 'مجموعة كثيفة', 'Dense set'),
                meaning: say('Bere bi zenbakiren artean beti dago multzoko beste zenbaki bat, eta, beraz, infinitu.', 'Entre dos de sus números siempre hay otro número del conjunto y, por tanto, infinitos.', 'بين أي عددين منها يوجد دائمًا عدد آخر منها، وبالتالي عدد لا نهائي من الأعداد.', 'Between any two of its numbers there is always another number of the set, and so infinitely many.')
            }
        ],
        vocabulary: [
            say('erdiko puntua', 'punto medio', 'نقطة المنتصف', 'midpoint'),
            say('zifra', 'cifra', 'رقم', 'digit')
        ],
        explanation: say(
            'Hamartarrak konparatzeko, begiratu zifraz zifra ezkerretik: lehen zifra desberdinak erabakitzen du; periodikoetan, idatzi zifra batzuk. Zatikiak, jarri izendatzaile berarekin. Bi arrazionalen artean beti dago beste bat, haien erdiko puntua $\\frac{a+b}{2}$: $\\frac{1}{2}$ eta $\\frac{3}{4}$ zatikien artean $\\frac{5}{8}$ dago. Horregatik dira arrazionalak dentsoak.',
            'Para comparar decimales, mira cifra a cifra desde la izquierda: decide la primera cifra distinta; en los periódicos, escribe varias cifras. Las fracciones, pásalas al mismo denominador. Entre dos racionales siempre hay otro, su punto medio $\\frac{a+b}{2}$: entre $\\frac{1}{2}$ y $\\frac{3}{4}$ está $\\frac{5}{8}$. Por eso los racionales son densos.',
            'لمقارنة الأعداد العشرية قارن رقمًا برقم من اليسار: يحسم الأمر أول رقم مختلف، وفي الدورية اكتب عدة أرقام. أما الكسور فوحّد مقاماتها. وبين عددين نسبيين يوجد دائمًا عدد آخر هو نقطة المنتصف $\\frac{a+b}{2}$: بين $\\frac{1}{2}$ و$\\frac{3}{4}$ يقع $\\frac{5}{8}$. لذلك الأعداد النسبية كثيفة.',
            'To compare decimals, look digit by digit from the left: the first different digit decides; with recurring decimals, write out several digits. Write fractions with the same denominator. Between two rational numbers there is always another one, their midpoint $\\frac{a+b}{2}$: between $\\frac{1}{2}$ and $\\frac{3}{4}$ lies $\\frac{5}{8}$. That is why rational numbers are dense.'
        ),
        examplePrompt: say('Ordenatu txikienetik handienera: $0{,}\\overline{35}$, $0{,}3\\overline{5}$ eta $0{,}35$.', 'Ordena de menor a mayor: $0{,}\\overline{35}$, $0{,}3\\overline{5}$ y $0{,}35$.', 'رتّب تصاعديًا: $0{,}\\overline{35}$ و$0{,}3\\overline{5}$ و$0{,}35$.', 'Order from smallest to largest: $0{,}\\overline{35}$, $0{,}3\\overline{5}$ and $0{,}35$.'),
        example: same('$\\begin{gathered}0{,}3500<0{,}3535\\ldots<0{,}3555\\ldots\\\\ 0{,}35<0{,}\\overline{35}<0{,}3\\overline{5}\\end{gathered}$'),
        exampleAnswer: say('Lau zifrarekin ikusten da: hirugarren zifra da lehen desberdina.', 'Con cuatro cifras se ve: la primera cifra distinta es la tercera.', 'بأربعة أرقام يتضح الأمر: أول رقم مختلف هو الثالث.', 'With four digits you can see it: the first different digit is the third one.')
    },

    /* ---------- 2. Irrational numbers and the real line ---------- */
    irrational: {
        definitions: [
            {
                term: say('Zenbaki irrazionala', 'Número irracional', 'العدد غير النسبي', 'Irrational number'),
                meaning: say('Infinitu zifra hamartar dituen zenbakia, periodorik gabe: ezin da zatiki gisa idatzi.', 'Un número con infinitas cifras decimales sin periodo: no se puede escribir como fracción.', 'عدد له منازل عشرية لا نهائية بلا دور: لا يمكن كتابته كسرًا.', 'A number with infinitely many decimal digits and no recurring part: it cannot be written as a fraction.')
            }
        ],
        vocabulary: [
            say('karratu perfektua', 'cuadrado perfecto', 'مربع كامل', 'perfect square'),
            say('erroak', 'raíces', 'الجذور', 'roots')
        ],
        explanation: say(
            'Irrazionalak dira $\\pi$, karratu perfektuak ez diren zenbakien erroak ($\\sqrt{2}$, $\\sqrt{10}$) eta $3{,}1211221112\\ldots$ bezalako hamartarrak, periodorik gabe. Kontuz: $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$ arrazionala da. Irrazional bat gehi arrazional bat irrazionala da, baina bi irrazionalen batura arrazionala izan daiteke: $\\pi+(-\\pi)=0$.',
            'Son irracionales $\\pi$, las raíces de números que no son cuadrados perfectos ($\\sqrt{2}$, $\\sqrt{10}$) y decimales sin periodo como $3{,}1211221112\\ldots$ Cuidado: $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$ es racional. Un irracional más un racional es irracional, pero dos irracionales pueden sumar un racional: $\\pi+(-\\pi)=0$.',
            'من الأعداد غير النسبية $\\pi$ وجذور الأعداد التي ليست مربعات كاملة ($\\sqrt{2}$ و$\\sqrt{10}$) وأعداد عشرية بلا دور مثل $3{,}1211221112\\ldots$ انتبه: $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$ عدد نسبي. ومجموع عدد غير نسبي وعدد نسبي غير نسبي، لكن مجموع عددين غير نسبيين قد يكون نسبيًا: $\\pi+(-\\pi)=0$.',
            'Irrational numbers include $\\pi$, the roots of numbers that are not perfect squares ($\\sqrt{2}$, $\\sqrt{10}$) and decimals with no recurring part such as $3{,}1211221112\\ldots$ Careful: $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$ is rational. An irrational plus a rational is irrational, but two irrationals can add up to a rational: $\\pi+(-\\pi)=0$.'
        ),
        examplePrompt: say('Arrazionalak ala irrazionalak dira $\\sqrt{50}$, $\\sqrt{\\frac{25}{16}}$ eta $0{,}\\overline{18}$?', '¿Son racionales o irracionales $\\sqrt{50}$, $\\sqrt{\\frac{25}{16}}$ y $0{,}\\overline{18}$?', 'هل $\\sqrt{50}$ و$\\sqrt{\\frac{25}{16}}$ و$0{,}\\overline{18}$ أعداد نسبية أم غير نسبية؟', 'Are $\\sqrt{50}$, $\\sqrt{\\frac{25}{16}}$ and $0{,}\\overline{18}$ rational or irrational?'),
        example: same('$\\begin{gathered}\\sqrt{50}=7{,}0710\\ldots\\in\\mathbb{I}\\\\ \\sqrt{\\frac{25}{16}}=\\frac{5}{4}\\in\\mathbb{Q}\\qquad 0{,}\\overline{18}=\\frac{18}{99}\\in\\mathbb{Q}\\end{gathered}$'),
        exampleAnswer: say('$\\sqrt{50}$ irrazionala da (50 ez da karratu perfektua); beste biak, arrazionalak.', '$\\sqrt{50}$ es irracional (50 no es un cuadrado perfecto); los otros dos, racionales.', '$\\sqrt{50}$ غير نسبي (50 ليس مربعًا كاملًا)، والعددان الآخران نسبيان.', '$\\sqrt{50}$ is irrational (50 is not a perfect square); the other two are rational.'),
        why: {
            text: say(
                'Demagun $\\sqrt{2}=\\frac{a}{b}$ dela, zatiki laburtezina. Orduan $a^{2}=2b^{2}$, eta $a$ bikoitia da: $a=2c$. Geratzen da $4c^{2}=2b^{2}$, hau da, $b^{2}=2c^{2}$, eta $b$ ere bikoitia da. Baina zatiki laburtezin batek ezin ditu bi gaiak bikoitiak izan: $\\sqrt{2}$ ez da zatiki bat.',
                'Supón que $\\sqrt{2}=\\frac{a}{b}$, una fracción irreducible. Entonces $a^{2}=2b^{2}$, así que $a$ es par: $a=2c$. Queda $4c^{2}=2b^{2}$, es decir, $b^{2}=2c^{2}$, y $b$ también es par. Pero una fracción irreducible no puede tener los dos términos pares: $\\sqrt{2}$ no es una fracción.',
                'افترض أن $\\sqrt{2}=\\frac{a}{b}$ كسر غير قابل للاختزال. عندئذ $a^{2}=2b^{2}$، إذن $a$ زوجي: $a=2c$. فيصبح $4c^{2}=2b^{2}$، أي $b^{2}=2c^{2}$، فيكون $b$ زوجيًا أيضًا. لكن الكسر غير القابل للاختزال لا يكون حداه زوجيين: $\\sqrt{2}$ ليس كسرًا.',
                'Suppose $\\sqrt{2}=\\frac{a}{b}$, a fraction in simplest form. Then $a^{2}=2b^{2}$, so $a$ is even: $a=2c$. That leaves $4c^{2}=2b^{2}$, that is, $b^{2}=2c^{2}$, so $b$ is even too. But a fraction in simplest form cannot have both terms even: $\\sqrt{2}$ is not a fraction.'
            )
        }
    },
    'number-sets': {
        definitions: [
            {
                term: say('Zenbaki errealak ($\\mathbb{R}$)', 'Números reales ($\\mathbb{R}$)', 'الأعداد الحقيقية ($\\mathbb{R}$)', 'Real numbers ($\\mathbb{R}$)'),
                meaning: say('Arrazionalak ($\\mathbb{Q}$) eta irrazionalak ($\\mathbb{I}$) batera.', 'Los racionales ($\\mathbb{Q}$) y los irracionales ($\\mathbb{I}$) juntos.', 'الأعداد النسبية ($\\mathbb{Q}$) وغير النسبية ($\\mathbb{I}$) معًا.', 'The rational numbers ($\\mathbb{Q}$) and the irrational numbers ($\\mathbb{I}$) together.')
            }
        ],
        vocabulary: [
            say('multzoa', 'conjunto', 'مجموعة', 'set'),
            say('naturala', 'natural', 'طبيعي', 'natural'),
            say('osoa', 'entero', 'صحيح', 'integer')
        ],
        explanation: say(
            'Zenbaki-multzoak bata bestearen barruan daude: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. Irrazionalak ere $\\mathbb{R}$ multzoan daude, baina $\\mathbb{Q}$ multzotik kanpo. Zenbaki bat sailkatzeko, idatzi lehenik bere forma sinpleenean, $\\frac{48}{16}=3$ naturala baita. Gero aukeratu hura duen multzorik txikiena.',
            'Los conjuntos de números están unos dentro de otros: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. Los irracionales también están en $\\mathbb{R}$, pero fuera de $\\mathbb{Q}$. Para clasificar un número, escríbelo antes en su forma más sencilla, porque $\\frac{48}{16}=3$ es natural. Después elige el conjunto más pequeño que lo contiene.',
            'مجموعات الأعداد متداخلة: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. والأعداد غير النسبية أيضًا في $\\mathbb{R}$ لكنها خارج $\\mathbb{Q}$. لتصنيف عدد اكتبه أولًا في أبسط صورة، لأن $\\frac{48}{16}=3$ عدد طبيعي. ثم اختر أصغر مجموعة تحتويه.',
            'The sets of numbers sit inside one another: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. The irrational numbers are also in $\\mathbb{R}$, but outside $\\mathbb{Q}$. To classify a number, first write it in its simplest form, because $\\frac{48}{16}=3$ is natural. Then choose the smallest set that contains it.'
        ),
        examplePrompt: say('Sailkatu $\\frac{-30}{6}$, $\\sqrt{0{,}49}$ eta $\\sqrt{18}$ multzorik txikienean.', 'Clasifica $\\frac{-30}{6}$, $\\sqrt{0{,}49}$ y $\\sqrt{18}$ en el conjunto más pequeño.', 'صنّف $\\frac{-30}{6}$ و$\\sqrt{0{,}49}$ و$\\sqrt{18}$ في أصغر مجموعة.', 'Classify $\\frac{-30}{6}$, $\\sqrt{0{,}49}$ and $\\sqrt{18}$ in the smallest set.'),
        example: same('$\\begin{gathered}\\frac{-30}{6}=-5\\in\\mathbb{Z}\\\\ \\sqrt{0{,}49}=0{,}7\\in\\mathbb{Q}\\qquad\\sqrt{18}\\in\\mathbb{I}\\end{gathered}$'),
        exampleAnswer: say('$-5$ zenbaki osoa da; $0{,}7$, arrazionala; $\\sqrt{18}$, irrazionala (18 ez da karratu perfektua).', '$-5$ es entero; $0{,}7$, racional; $\\sqrt{18}$, irracional (18 no es un cuadrado perfecto).', '$-5$ عدد صحيح، و$0{,}7$ نسبي، و$\\sqrt{18}$ غير نسبي (18 ليس مربعًا كاملًا).', '$-5$ is an integer; $0{,}7$ is rational; $\\sqrt{18}$ is irrational (18 is not a perfect square).')
    },
    represent: {
        vocabulary: [
            say('konpasa', 'compás', 'الفرجار', 'compass'),
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse'),
            say('katetoak', 'catetos', 'الضلعان القائمان', 'legs')
        ],
        explanation: say(
            'Zenbaki erreal bakoitzari zuzeneko puntu bat dagokio. Batzuk zehatz koka daitezke erregela eta konpasarekin: erro karratuak, Pitagorasen teoremarekin, eta zatikiak, Talesenarekin.',
            'A cada número real le corresponde un punto de la recta. Algunos se sitúan exactamente con regla y compás: las raíces cuadradas, con el teorema de Pitágoras, y las fracciones, con el de Tales.',
            'لكل عدد حقيقي نقطة على المستقيم. ويمكن وضع بعضها بدقة بالمسطرة والفرجار: الجذور التربيعية بمبرهنة فيثاغورس، والكسور بمبرهنة طاليس.',
            'Each real number matches a point on the number line. Some can be placed exactly with a ruler and compass: square roots with Pythagoras\' theorem, and fractions with Thales\' theorem.'
        ),
        cases: [
            { title: say('Erroa: Pitagoras', 'Raíz: Pitágoras', 'الجذر: فيثاغورس', 'Root: Pythagoras'), text: say('Idatzi errokizuna bi karraturen batura gisa: katetoak horiek dituen triangeluaren hipotenusa da erroa. Eraman zuzenera konpasarekin.', 'Escribe el radicando como suma de dos cuadrados: la hipotenusa del triángulo con esos catetos mide la raíz. Llévala a la recta con el compás.', 'اكتب ما تحت الجذر مجموعَ مربعين: وتر المثلث الذي ضلعاه القائمان هذان العددان يساوي الجذر. انقله إلى المستقيم بالفرجار.', 'Write the number under the root as a sum of two squares: the hypotenuse of the triangle with those legs is the root. Carry it to the line with the compass.'), math: same('$\\sqrt{10}=\\sqrt{3^{2}+1^{2}}$') },
            { title: say('Zatikia: Tales', 'Fracción: Tales', 'الكسر: طاليس', 'Fraction: Thales'), text: say('$\\frac{4}{7}$ kokatzeko, markatu 7 zati berdin zuzen zeihar batean, lotu azken marka 1 puntuarekin eta marraztu paraleloak: laugarrenak $\\frac{4}{7}$ puntuan mozten du.', 'Para $\\frac{4}{7}$, marca 7 partes iguales en una recta oblicua, une la última marca con el 1 y traza paralelas: la cuarta corta en $\\frac{4}{7}$.', 'لوضع $\\frac{4}{7}$ علّم 7 أجزاء متساوية على مستقيم مائل، وصِل العلامة الأخيرة بالعدد 1، وارسم مستقيمات موازية: الرابع يقطع عند $\\frac{4}{7}$.', 'For $\\frac{4}{7}$, mark 7 equal parts on a slanted line, join the last mark to 1 and draw parallels: the fourth one cuts at $\\frac{4}{7}$.'), math: same('$\\frac{4}{7}\\approx 0{,}57$') }
        ],
        examplePrompt: say('Nola kokatzen dira zuzenean $\\frac{11}{4}$ eta $\\sqrt{29}$?', '¿Cómo sitúas en la recta $\\frac{11}{4}$ y $\\sqrt{29}$?', 'كيف تضع $\\frac{11}{4}$ و$\\sqrt{29}$ على المستقيم؟', 'How do you place $\\frac{11}{4}$ and $\\sqrt{29}$ on the line?'),
        example: same('$\\frac{11}{4}=2+\\frac{3}{4}\\qquad\\sqrt{29}=\\sqrt{5^{2}+2^{2}}$'),
        exampleAnswer: say('$\\frac{11}{4}$: zatitu $[2,\\,3]$ 4 zatitan eta hartu 3. $\\sqrt{29}$: 5 eta 2 katetoen hipotenusa.', '$\\frac{11}{4}$: divide $[2,\\,3]$ en 4 partes y toma 3. $\\sqrt{29}$: la hipotenusa de catetos 5 y 2.', '$\\frac{11}{4}$: قسّم $[2,\\,3]$ إلى 4 أجزاء وخذ 3. $\\sqrt{29}$: وتر مثلث ضلعاه القائمان 5 و2.', '$\\frac{11}{4}$: split $[2,\\,3]$ into 4 parts and take 3. $\\sqrt{29}$: the hypotenuse with legs 5 and 2.')
    },
    successive: {
        vocabulary: [
            say('hamarrena', 'décima', 'جزء من عشرة', 'tenth'),
            say('ehunena', 'centésima', 'جزء من مئة', 'hundredth'),
            say('tartea', 'intervalo', 'الفترة', 'interval')
        ],
        explanation: say(
            'Irrazional bat ezin bada erregela eta konpasarekin eraiki, hurbilketen artean kokatzen da: lehenik bi zenbaki osoren artean, gero bi hamarrenen artean, gero bi ehunenen artean… Zoom bakoitzak tartea 10 zatitan banatzen du eta zenbakia duena aukeratzen du: tartea 10 aldiz txikiagoa da, eta zifra hamartar bat irabazten da.',
            'Si un irracional no se puede construir con regla y compás, se encaja entre aproximaciones: primero entre dos enteros, luego entre dos décimas, luego entre dos centésimas… Cada zoom divide el intervalo en 10 partes y elige la que contiene el número: el intervalo es 10 veces más pequeño y se gana una cifra decimal.',
            'إذا لم يمكن إنشاء عدد غير نسبي بالمسطرة والفرجار نحصره بين تقريبات: أولًا بين عددين صحيحين، ثم بين جزأين من عشرة، ثم بين جزأين من مئة… كل تكبير يقسم الفترة إلى 10 أجزاء ويختار الجزء الذي فيه العدد: فتصغر الفترة 10 مرات ونربح رقمًا عشريًا.',
            'If an irrational number cannot be built with a ruler and compass, you trap it between approximations: first between two whole numbers, then between two tenths, then between two hundredths… Each zoom splits the interval into 10 parts and picks the one that holds the number: the interval is 10 times smaller and you gain one decimal digit.'
        ),
        examplePrompt: say('Kokatu $\\sqrt{7}=2{,}6457\\ldots$ ehunenetara arte.', 'Encaja $\\sqrt{7}=2{,}6457\\ldots$ hasta las centésimas.', 'احصر $\\sqrt{7}=2{,}6457\\ldots$ حتى أجزاء المئة.', 'Trap $\\sqrt{7}=2{,}6457\\ldots$ to the hundredths.'),
        example: same('$\\begin{gathered}2<\\sqrt{7}<3\\\\ 2{,}6<\\sqrt{7}<2{,}7\\\\ 2{,}64<\\sqrt{7}<2{,}65\\end{gathered}$'),
        exampleAnswer: say('$2{,}64$ eta $2{,}65$ artean dago: bi zoomekin bi hamartar ezagutzen dira.', 'Está entre $2{,}64$ y $2{,}65$: con dos zooms se conocen dos decimales.', 'يقع بين $2{,}64$ و$2{,}65$: بتكبيرين نعرف منزلتين عشريتين.', 'It lies between $2{,}64$ and $2{,}65$: two zooms give two decimal places.')
    },

    /* ---------- 3. Intervals and approximations ---------- */
    intervals: {
        definitions: [
            {
                term: say('Tartea', 'Intervalo', 'الفترة', 'Interval'),
                meaning: say('$a$ eta $b$ muturren arteko zenbaki errealak.', 'Los números reales comprendidos entre dos extremos $a$ y $b$.', 'الأعداد الحقيقية المحصورة بين طرفين $a$ و$b$.', 'The real numbers between two endpoints $a$ and $b$.')
            },
            {
                term: say('Zuzenerdia', 'Semirrecta', 'نصف المستقيم', 'Half-line'),
                meaning: say('Mutur baten alde bateko zenbaki errealak: $x>a$, $x\\le b$…', 'Los números reales a un lado de un extremo: $x>a$, $x\\le b$…', 'الأعداد الحقيقية في جهة واحدة من طرف: $x>a$، $x\\le b$…', 'The real numbers on one side of an endpoint: $x>a$, $x\\le b$…')
            }
        ],
        vocabulary: [
            say('muturra', 'extremo', 'الطرف', 'endpoint'),
            say('kortxetea', 'corchete', 'القوس المعقوف', 'square bracket'),
            say('infinitua', 'infinito', 'اللانهاية', 'infinity')
        ],
        explanation: say(
            'Kortxeteak muturra barne dagoela esan nahi du (puntu betea), eta parentesiak, kanpo dagoela (puntu hutsa). Infinitua ez da zenbaki bat: beti parentesiarekin doa. Zuzen osoa $\\mathbb{R}=(-\\infty,\\,+\\infty)$ da.',
            'El corchete indica que el extremo está incluido (punto relleno), y el paréntesis, que no lo está (punto hueco). El infinito no es un número: va siempre con paréntesis. La recta entera es $\\mathbb{R}=(-\\infty,\\,+\\infty)$.',
            'القوس المعقوف يعني أن الطرف داخل الفترة (نقطة ممتلئة)، والقوس العادي يعني أنه خارجها (نقطة فارغة). اللانهاية ليست عددًا: تُكتب دائمًا بقوس عادي. والمستقيم كله $\\mathbb{R}=(-\\infty,\\,+\\infty)$.',
            'A square bracket means the endpoint is included (filled dot), and a round bracket means it is not (open dot). Infinity is not a number: it always takes a round bracket. The whole line is $\\mathbb{R}=(-\\infty,\\,+\\infty)$.'
        ),
        cases: [
            { title: say('Itxia', 'Cerrado', 'مغلقة', 'Closed'), text: say('Bi muturrak barne: $a\\le x\\le b$.', 'Incluye los dos extremos: $a\\le x\\le b$.', 'تشمل الطرفين: $a\\le x\\le b$.', 'Both endpoints are included: $a\\le x\\le b$.'), math: same('$[a,\\,b]$') },
            { title: say('Irekia', 'Abierto', 'مفتوحة', 'Open'), text: say('Ez du muturrik barne: $a<x<b$.', 'No incluye ningún extremo: $a<x<b$.', 'لا تشمل أي طرف: $a<x<b$.', 'Neither endpoint is included: $a<x<b$.'), math: same('$(a,\\,b)$') },
            { title: say('Erdi-irekia', 'Semiabierto', 'نصف مفتوحة', 'Half-open'), text: say('Mutur bakarra barne: $a\\le x<b$.', 'Incluye solo un extremo: $a\\le x<b$.', 'تشمل طرفًا واحدًا فقط: $a\\le x<b$.', 'Only one endpoint is included: $a\\le x<b$.'), math: same('$[a,\\,b)$') },
            { title: say('Zuzenerdia', 'Semirrecta', 'نصف مستقيم', 'Half-line'), text: say('Mutur bakarra du: $x>a$.', 'Tiene un solo extremo: $x>a$.', 'لها طرف واحد: $x>a$.', 'It has only one endpoint: $x>a$.'), math: same('$(a,\\,+\\infty)$') }
        ],
        examplePrompt: say('Idatzi tarte gisa $-5<x\\le 2$ eta $x<3$, eta desberdintza gisa $[0,\\,7)$.', 'Escribe como intervalo $-5<x\\le 2$ y $x<3$, y como desigualdad $[0,\\,7)$.', 'اكتب $-5<x\\le 2$ و$x<3$ فترتين، واكتب $[0,\\,7)$ متباينة.', 'Write $-5<x\\le 2$ and $x<3$ as intervals, and $[0,\\,7)$ as an inequality.'),
        example: same('$(-5,\\,2]\\qquad(-\\infty,\\,3)\\qquad 0\\le x<7$'),
        exampleAnswer: say('$-5$ kanpo eta $2$ barne; zuzenerdiak parentesia du $-\\infty$ aldean.', '$-5$ queda fuera y $2$ dentro; la semirrecta lleva paréntesis en $-\\infty$.', '$-5$ خارج و$2$ داخل؛ ونصف المستقيم بقوس عادي عند $-\\infty$.', '$-5$ is left out and $2$ is in; the half-line has a round bracket at $-\\infty$.')
    },
    'interval-ops': {
        definitions: [
            {
                term: say('Bildura ($A\\cup B$)', 'Unión ($A\\cup B$)', 'الاتحاد ($A\\cup B$)', 'Union ($A\\cup B$)'),
                meaning: say('$A$ tartean, $B$ tartean edo bietan dauden zenbakiak.', 'Los números que están en $A$, en $B$ o en los dos.', 'الأعداد الموجودة في $A$ أو في $B$ أو فيهما معًا.', 'The numbers that are in $A$, in $B$ or in both.')
            },
            {
                term: say('Ebakidura ($A\\cap B$)', 'Intersección ($A\\cap B$)', 'التقاطع ($A\\cap B$)', 'Intersection ($A\\cap B$)'),
                meaning: say('$A$ eta $B$ tarteetan aldi berean dauden zenbakiak.', 'Los números que están en $A$ y en $B$ a la vez.', 'الأعداد الموجودة في $A$ و$B$ معًا.', 'The numbers that are in $A$ and in $B$ at the same time.')
            }
        ],
        vocabulary: [
            say('muturra', 'extremo', 'الطرف', 'endpoint'),
            say('hutsa', 'vacía', 'خالٍ', 'empty')
        ],
        explanation: say(
            'Marraztu bi tarteak zuzen berean, altuera desberdinetan. Bildura bi marrek estaltzen duten guztia da; ebakidura, gainjartzen diren zatia. Mutur bat ebakiduran dago bi tarteetan badago, eta bilduran, batean behintzat badago. Ebakidura hutsa izan daiteke: $\\emptyset$.',
            'Dibuja los dos intervalos en la misma recta, a distinta altura. La unión es todo lo que cubren las dos bandas; la intersección, la parte en que se solapan. Un extremo está en la intersección si está en los dos intervalos, y en la unión si está en alguno. La intersección puede ser vacía: $\\emptyset$.',
            'ارسم الفترتين على المستقيم نفسه وعلى ارتفاعين مختلفين. الاتحاد كل ما يغطيه الشريطان، والتقاطع الجزء الذي يتداخلان فيه. يكون الطرف في التقاطع إذا كان في الفترتين، وفي الاتحاد إذا كان في إحداهما. وقد يكون التقاطع خاليًا: $\\emptyset$.',
            'Draw both intervals on the same line, at different heights. The union is everything the two bands cover; the intersection, the part where they overlap. An endpoint is in the intersection if it is in both intervals, and in the union if it is in at least one. The intersection can be empty: $\\emptyset$.'
        ),
        examplePrompt: say('Kalkulatu $A\\cup B$ eta $A\\cap B$, $A=(-4,\\,2)$ eta $B=[0,\\,6]$ badira.', 'Halla $A\\cup B$ y $A\\cap B$ si $A=(-4,\\,2)$ y $B=[0,\\,6]$.', 'جد $A\\cup B$ و$A\\cap B$ إذا كانت $A=(-4,\\,2)$ و$B=[0,\\,6]$.', 'Find $A\\cup B$ and $A\\cap B$ if $A=(-4,\\,2)$ and $B=[0,\\,6]$.'),
        example: same('$A\\cup B=(-4,\\,6]\\qquad A\\cap B=[0,\\,2)$'),
        exampleAnswer: say('$0$ barne dago $B$ tartean, eta $2$ ez dago $A$ tartean.', '$0$ está en $B$, y $2$ no está en $A$.', '$0$ ينتمي إلى $B$، و$2$ لا ينتمي إلى $A$.', '$0$ is in $B$, and $2$ is not in $A$.')
    },
    rounding: {
        definitions: [
            {
                term: say('Gutxiagoz eta gehiagoz', 'Por defecto y por exceso', 'بالنقصان وبالزيادة', 'Lower and upper'),
                meaning: say('Gutxiagozko hurbilketa zenbakia baino txikiagoa da; gehiagozkoa, handiagoa.', 'Una aproximación por defecto es menor que el número; por exceso, mayor.', 'التقريب بالنقصان أصغر من العدد، وبالزيادة أكبر منه.', 'A lower approximation is smaller than the number; an upper one, greater.')
            },
            {
                term: say('Trunkatzea', 'Truncar', 'البتر', 'Truncating'),
                meaning: say('Orden batetik aurrerako zifrak kentzea, besteak aldatu gabe.', 'Suprimir las cifras a partir de un orden, sin cambiar las demás.', 'حذف الأرقام ابتداءً من منزلة معينة دون تغيير الباقي.', 'Dropping the digits from a given place on, without changing the others.')
            }
        ],
        vocabulary: [
            say('biribiltzea', 'redondeo', 'التقريب', 'rounding'),
            say('hamarrena', 'décima', 'الأعشار', 'tenth')
        ],
        explanation: say(
            'Biribiltzean, begiratu kentzen den lehen zifrari: 5 edo handiagoa bada, gehitu 1 aurreko zifrari; bestela, utzi zifrak trunkatzean bezala. Biribiltzeak hurbilketarik hurbilena ematen du. Kontuz bederatziekin: $1{,}\\overline{9}$ ehunenetara biribilduta $2{,}00$ da.',
            'Al redondear, mira la primera cifra suprimida: si es 5 o mayor, suma 1 a la cifra anterior; si no, deja las cifras como al truncar. El redondeo da la aproximación más cercana. Cuidado con los nueves: $1{,}\\overline{9}$ redondeado a las centésimas es $2{,}00$.',
            'عند التقريب انظر إلى أول رقم محذوف: إذا كان 5 أو أكبر فأضف 1 إلى الرقم الذي قبله، وإلا فاترك الأرقام كما في البتر. التقريب يعطي أقرب قيمة. انتبه للتسعات: $1{,}\\overline{9}$ مقرّبًا إلى أجزاء المئة يساوي $2{,}00$.',
            'When rounding, look at the first digit you drop: if it is 5 or more, add 1 to the digit before it; if not, leave the digits as when truncating. Rounding gives the closest approximation. Careful with nines: $1{,}\\overline{9}$ rounded to hundredths is $2{,}00$.'
        ),
        examplePrompt: say('Hurbildu $7{,}4862$ hamarrenetara: gutxiagoz, gehiagoz eta biribilduz.', 'Aproxima $7{,}4862$ a las décimas: por defecto, por exceso y redondeando.', 'قرّب $7{,}4862$ إلى الأعشار: بالنقصان وبالزيادة وبالتقريب.', 'Approximate $7{,}4862$ to tenths: lower, upper and rounded.'),
        example: same('$\\begin{gathered}7{,}4<7{,}4862<7{,}5\\\\ 7{,}4862\\ \\to\\ 7{,}5\\end{gathered}$'),
        exampleAnswer: say('Gutxiagoz $7{,}4$, gehiagoz $7{,}5$. Kentzen den lehen zifra 8 da: biribiltzea $7{,}5$ da.', 'Por defecto $7{,}4$, por exceso $7{,}5$. La primera cifra suprimida es 8: el redondeo es $7{,}5$.', 'بالنقصان $7{,}4$ وبالزيادة $7{,}5$. أول رقم محذوف هو 8: فالتقريب $7{,}5$.', 'Lower $7{,}4$, upper $7{,}5$. The first digit dropped is 8: the rounded value is $7{,}5$.')
    },
    errors: {
        definitions: [
            {
                term: say('Errore absolutua', 'Error absoluto', 'الخطأ المطلق', 'Absolute error'),
                meaning: say('Benetako balioaren eta hurbilketaren arteko diferentzia, zeinurik gabe: $E_a=\\lvert x-x\'\\rvert$.', 'La diferencia entre el valor real y la aproximación, sin signo: $E_a=\\lvert x-x\'\\rvert$.', 'الفرق بين القيمة الحقيقية والتقريب دون إشارة: $E_a=\\lvert x-x\'\\rvert$.', 'The difference between the real value and the approximation, without its sign: $E_a=\\lvert x-x\'\\rvert$.')
            },
            {
                term: say('Errore erlatiboa', 'Error relativo', 'الخطأ النسبي', 'Relative error'),
                meaning: say('Errore absolutua zati benetako balioa: $E_r=\\frac{E_a}{\\lvert x\\rvert}$. Askotan ehunekotan ematen da.', 'El error absoluto dividido entre el valor real: $E_r=\\frac{E_a}{\\lvert x\\rvert}$. A menudo se da en tanto por ciento.', 'الخطأ المطلق مقسومًا على القيمة الحقيقية: $E_r=\\frac{E_a}{\\lvert x\\rvert}$، ويُعطى غالبًا نسبة مئوية.', 'The absolute error divided by the real value: $E_r=\\frac{E_a}{\\lvert x\\rvert}$. It is often given as a percentage.')
            }
        ],
        vocabulary: [
            say('benetako balioa', 'valor real', 'القيمة الحقيقية', 'real value'),
            say('hurbilketa', 'aproximación', 'التقريب', 'approximation'),
            say('errore-bornea', 'cota', 'حدّ الخطأ', 'error bound')
        ],
        explanation: say(
            'Errore absolutuak zenbat huts egin dugun esaten du, unitatetan; erlatiboak, hori zenbat den benetako balioarekin alderatuta. Horregatik, erlatiboak neurtzen du hurbilketa baten kalitatea: zenbat eta txikiagoa, hobea. Benetako balioa ezagutzen ez bada, errore-bornea erabiltzen da: biribiltzean, errore absolutua ez da azken ordenaren unitate erdia baino handiagoa.',
            'El error absoluto dice cuánto nos equivocamos, en unidades; el relativo, cuánto es eso comparado con el valor real. Por eso el relativo mide la calidad de una aproximación: cuanto menor, mejor. Si no se conoce el valor real, se usa una cota: al redondear, el error absoluto no supera media unidad del último orden.',
            'الخطأ المطلق يقول كم أخطأنا بالوحدات، والنسبي يقول كم يمثل ذلك مقارنةً بالقيمة الحقيقية. لذلك يقيس النسبي جودة التقريب: كلما صغر كان أفضل. وإذا لم نعرف القيمة الحقيقية نستعمل حدّ الخطأ: عند التقريب لا يتجاوز الخطأ المطلق نصف وحدة آخر منزلة.',
            'The absolute error tells you how far off you are, in units; the relative error, how big that is compared with the real value. That is why the relative error measures how good an approximation is: the smaller, the better. If the real value is unknown, you use an error bound: when rounding, the absolute error is never more than half a unit of the last place.'
        ),
        examplePrompt: say('$\\frac{2}{3}$ zatikiaren ordez $0{,}67$ hartu dugu. Kalkulatu errore absolutua eta erlatiboa.', 'Aproximamos $\\frac{2}{3}$ por $0{,}67$. Calcula el error absoluto y el relativo.', 'قرّبنا $\\frac{2}{3}$ بالعدد $0{,}67$. احسب الخطأ المطلق والخطأ النسبي.', 'We approximate $\\frac{2}{3}$ by $0{,}67$. Work out the absolute and relative errors.'),
        example: same('$\\begin{gathered}E_a=\\left|\\frac{2}{3}-0{,}67\\right|=\\frac{1}{300}\\approx 0{,}0033\\\\ E_r=\\frac{1}{300}\\div\\frac{2}{3}=0{,}005\\ \\to\\ 0{,}5\\,\\%\\end{gathered}$'),
        exampleAnswer: say('Errore erlatiboa % 0,5 da: hurbilketa ona.', 'Un error relativo del 0,5 %: una buena aproximación.', 'خطأ نسبي قدره 0.5 %: تقريب جيد.', 'A relative error of 0.5%: a good approximation.')
    },

    /* ---------- 4. Percentages ---------- */
    'percent-basics': {
        definitions: [
            {
                term: say('Ehunekoa', 'Porcentaje', 'النسبة المئوية', 'Percentage'),
                meaning: say('Izendatzailea 100 duen zatikia: $p\\,\\%=\\frac{p}{100}$.', 'Una fracción de denominador 100: $p\\,\\%=\\frac{p}{100}$.', 'كسر مقامه 100: $p\\,\\%=\\frac{p}{100}$.', 'A fraction with denominator 100: $p\\,\\%=\\frac{p}{100}$.')
            }
        ],
        vocabulary: [
            say('kantitatea', 'cantidad', 'الكمية', 'amount'),
            say('osoa', 'total', 'الكل', 'whole'),
            say('hamartarra', 'decimal', 'العدد العشري', 'decimal')
        ],
        explanation: say(
            'Kantitate baten $p\\,\\%$ kalkulatzeko, biderkatu $\\frac{p}{100}$ zatikiaz edo bere hamartarraz: 220 zenbakiaren % 16 $0{,}16\\cdot 220=35{,}2$ da. Zati bat osoaren zer ehuneko den jakiteko, zatitu zatia osoaz eta biderkatu 100 zenbakiaz: $\\frac{6}{24}=0{,}25\\to 25\\,\\%$. Ehuneko baten ehunekorako, biderkatu hamartarrak.',
            'Para calcular el $p\\,\\%$ de una cantidad, multiplícala por $\\frac{p}{100}$ o por su decimal: el 16 % de 220 es $0{,}16\\cdot 220=35{,}2$. Para saber qué porcentaje es una parte, divídela entre el total y multiplica por 100: $\\frac{6}{24}=0{,}25\\to 25\\,\\%$. Para el porcentaje de un porcentaje, multiplica los decimales.',
            'لحساب $p\\,\\%$ من كمية اضربها في $\\frac{p}{100}$ أو في العدد العشري المقابل: 16 % من 220 هو $0{,}16\\cdot 220=35{,}2$. ولمعرفة النسبة التي يمثلها جزء اقسمه على الكل واضرب في 100: $\\frac{6}{24}=0{,}25\\to 25\\,\\%$. ولنسبة من نسبة اضرب العددين العشريين.',
            'To work out $p\\,\\%$ of an amount, multiply it by $\\frac{p}{100}$ or by its decimal: 16% of 220 is $0{,}16\\cdot 220=35{,}2$. To find what percentage a part is, divide it by the whole and multiply by 100: $\\frac{6}{24}=0{,}25\\to 25\\,\\%$. For a percentage of a percentage, multiply the decimals.'
        ),
        examplePrompt: say('Kalkulatu 180 zenbakiaren % 35, eta 60 zenbakitik 27 zer ehuneko diren.', 'Calcula el 35 % de 180, y qué porcentaje de 60 son 27.', 'احسب 35 % من 180، وما النسبة التي يمثلها 27 من 60.', 'Work out 35% of 180, and what percentage of 60 is 27.'),
        example: same('$0{,}35\\cdot 180=63\\qquad\\frac{27}{60}=0{,}45$'),
        exampleAnswer: say('63 da 180 zenbakiaren % 35; eta 27, 60 zenbakiaren % 45.', 'El 35 % de 180 es 63, y 27 son el 45 % de 60.', '35 % من 180 هو 63، و27 تمثل 45 % من 60.', '35% of 180 is 63, and 27 is 45% of 60.')
    },
    'percent-change': {
        definitions: [
            {
                term: say('Aldakuntza-indizea', 'Índice de variación', 'مؤشر التغير', 'Change multiplier'),
                meaning: say('Hasierako kantitatea biderkatzen duen zenbakia: $p\\,\\%$ igotzean, $1+\\frac{p}{100}$; jaistean, $1-\\frac{p}{100}$.', 'El número por el que se multiplica la cantidad inicial: si sube un $p\\,\\%$, $1+\\frac{p}{100}$; si baja, $1-\\frac{p}{100}$.', 'العدد الذي نضرب فيه الكمية الأولية: عند الزيادة بنسبة $p\\,\\%$ هو $1+\\frac{p}{100}$، وعند النقصان $1-\\frac{p}{100}$.', 'The number you multiply the initial amount by: for a rise of $p\\,\\%$, $1+\\frac{p}{100}$; for a fall, $1-\\frac{p}{100}$.')
            }
        ],
        vocabulary: [
            say('igoera', 'aumento', 'الزيادة', 'rise'),
            say('jaitsiera', 'disminución', 'النقصان', 'fall'),
            say('hasierako kantitatea', 'cantidad inicial', 'الكمية الأولية', 'initial amount')
        ],
        explanation: say(
            'Kantitate bat $p\\,\\%$ igotzean, amaierakoa hasierakoaren $(100+p)\\,\\%$ da; jaistean, $(100-p)\\,\\%$. Horregatik, amaierako kantitatea = hasierako kantitatea · indizea. % 21 igo: bider 1,21; % 20 jaitsi: bider 0,80. Indizea 1 baino handiagoa bada, igoera da, eta txikiagoa bada, jaitsiera.',
            'Al aumentar una cantidad un $p\\,\\%$, la final es el $(100+p)\\,\\%$ de la inicial; al disminuirla, el $(100-p)\\,\\%$. Por eso, cantidad final = cantidad inicial · índice. Subir un 21 %: por 1,21; bajar un 20 %: por 0,80. Un índice mayor que 1 es un aumento, y menor que 1, una disminución.',
            'عند زيادة كمية بنسبة $p\\,\\%$ تكون النهائية $(100+p)\\,\\%$ من الأولية، وعند إنقاصها $(100-p)\\,\\%$. لذلك الكمية النهائية = الكمية الأولية · المؤشر. الزيادة 21 %: الضرب في 1.21؛ والنقصان 20 %: الضرب في 0.80. المؤشر الأكبر من 1 زيادة، والأصغر من 1 نقصان.',
            'When an amount rises by $p\\,\\%$, the final amount is $(100+p)\\,\\%$ of the initial one; when it falls, $(100-p)\\,\\%$. So final amount = initial amount · multiplier. Up 21%: times 1.21; down 20%: times 0.80. A multiplier greater than 1 is a rise, and one less than 1, a fall.'
        ),
        examplePrompt: say('120 euroko beroki bat % 8 garestitu da, eta 350 euroko bizikleta bat % 30 merkatu. Zenbat balio dute orain?', 'Un abrigo de 120 € sube un 8 % y una bici de 350 € baja un 30 %. ¿Cuánto cuestan ahora?', 'معطف بسعر 120 € ارتفع 8 %، ودراجة بسعر 350 € انخفضت 30 %. كم سعرهما الآن؟', 'A €120 coat goes up 8% and a €350 bike goes down 30%. How much do they cost now?'),
        example: same('$120\\cdot 1{,}08=129{,}6\\qquad 350\\cdot 0{,}70=245$'),
        exampleAnswer: say('Berokia 129,60 € eta bizikleta 245 €.', 'El abrigo, 129,60 €; la bici, 245 €.', 'المعطف 129.60 € والدراجة 245 €.', 'The coat, €129.60; the bike, €245.')
    },
    chained: {
        vocabulary: [
            say('indizea', 'índice', 'المؤشر', 'multiplier'),
            say('ehunekoa', 'porcentaje', 'النسبة', 'percentage')
        ],
        explanation: say(
            'Kantitate bati hainbat aldaketa jarraian egiten bazaizkio, bakoitza aurrekoaren emaitzaren gainean kalkulatzen da. Horregatik, indizeak biderkatzen dira: $I=I_1\\cdot I_2\\cdots$ Ehunekoak ez dira batzen: % 30 igo eta % 15 jaistea $1{,}3\\cdot 0{,}85=1{,}105$ da, hau da, % 10,5 igotzea.',
            'Si a una cantidad se le aplican varias variaciones seguidas, cada una se calcula sobre el resultado de la anterior. Por eso se multiplican los índices: $I=I_1\\cdot I_2\\cdots$ Los porcentajes no se suman: subir un 30 % y bajar un 15 % es $1{,}3\\cdot 0{,}85=1{,}105$, una subida del 10,5 %.',
            'إذا طُبّقت على كمية عدة تغيرات متتالية، يُحسب كل منها على نتيجة السابق. لذلك تُضرب المؤشرات: $I=I_1\\cdot I_2\\cdots$ ولا تُجمع النسب: الزيادة 30 % ثم النقصان 15 % تعني $1{,}3\\cdot 0{,}85=1{,}105$، أي زيادة 10.5 %.',
            'When several changes are applied one after another, each one is worked out on the result of the one before. That is why the multipliers are multiplied: $I=I_1\\cdot I_2\\cdots$ The percentages are not added: up 30% and then down 15% is $1{,}3\\cdot 0{,}85=1{,}105$, a rise of 10.5%.'
        ),
        examplePrompt: say('Prezio bat % 10 igo da, eta hurrengo hilabetean % 10 jaitsi. Hasierako prezioa du berriz?', 'Un precio sube un 10 % y al mes siguiente baja un 10 %. ¿Vuelve a ser el de antes?', 'ارتفع سعر 10 % ثم انخفض في الشهر التالي 10 %. هل عاد كما كان؟', 'A price goes up 10% and the next month it goes down 10%. Is it back where it was?'),
        example: same('$1{,}1\\cdot 0{,}9=0{,}99$'),
        exampleAnswer: say('Ez: hasieran baino % 1 merkeagoa da.', 'No: es un 1 % más barato que al principio.', 'لا: صار أرخص بنسبة 1 % مما كان.', 'No: it is 1% cheaper than at the start.'),
        why: {
            text: say(
                '% 30 igo ondoren, $C$ kantitatea $1{,}3\\cdot C$ bihurtzen da, eta % 15 kantitate berri horren gainean kalkulatzen da, ez $C$ kantitatearen gainean. % 15 jaistea $1{,}3\\cdot C$ biderkatzea da $0{,}85$ zenbakiaz: emaitza $C$ bider bi indizeen biderkadura da.',
                'Tras subir un 30 %, la cantidad $C$ pasa a ser $1{,}3\\cdot C$, y el 15 % se calcula sobre esa cantidad nueva, no sobre $C$. Bajar un 15 % es multiplicar $1{,}3\\cdot C$ por $0{,}85$: el resultado es $C$ por el producto de los dos índices.',
                'بعد الزيادة 30 % تصبح الكمية $C$ مساوية $1{,}3\\cdot C$، وتُحسب 15 % على هذه الكمية الجديدة لا على $C$. والنقصان 15 % هو ضرب $1{,}3\\cdot C$ في $0{,}85$: فالنتيجة $C$ مضروبة في حاصل ضرب المؤشرين.',
                'After a 30% rise, the amount $C$ becomes $1{,}3\\cdot C$, and the 15% is worked out on that new amount, not on $C$. Going down 15% is multiplying $1{,}3\\cdot C$ by $0{,}85$: the result is $C$ times the product of the two multipliers.'
            )
        }
    },
    'percent-inverse': {
        vocabulary: [
            say('ekuazioa', 'ecuación', 'معادلة', 'equation'),
            say('amaierako kantitatea', 'cantidad final', 'الكمية النهائية', 'final amount'),
            say('indizea', 'índice', 'المؤشر', 'multiplier')
        ],
        explanation: say(
            'Amaierako kantitatea eta aldaketa ezagutzen badituzu, hasierakoa ekuazio batetik ateratzen da: $C\\cdot I=C_f$. Askatu indizeaz zatituz: $C=\\frac{C_f}{I}$. Ez kendu ehunekoa amaierako kantitateari: hasierakoaren gainean kalkulatu zen. Horregatik, % 10 igo ondoren, hasierara itzultzeko % 9,09 jaitsi behar da, ez % 10.',
            'Si conoces la cantidad final y la variación, la inicial sale de una ecuación: $C\\cdot I=C_f$. Despeja dividiendo entre el índice: $C=\\frac{C_f}{I}$. No restes el porcentaje a la cantidad final: se calculó sobre la inicial. Por eso, tras subir un 10 %, para volver al principio hay que bajar un 9,09 %, no un 10 %.',
            'إذا عرفت الكمية النهائية والتغير، فالأولية تُستخرج من معادلة: $C\\cdot I=C_f$. اعزلها بالقسمة على المؤشر: $C=\\frac{C_f}{I}$. لا تطرح النسبة من الكمية النهائية: فقد حُسبت على الأولية. لذلك بعد الزيادة 10 % يلزم نقصان 9.09 % لا 10 % للعودة إلى البداية.',
            'If you know the final amount and the change, the initial amount comes from an equation: $C\\cdot I=C_f$. Solve it by dividing by the multiplier: $C=\\frac{C_f}{I}$. Do not take the percentage off the final amount: it was worked out on the initial one. That is why, after a 10% rise, getting back to the start takes a 9.09% fall, not 10%.'
        ),
        examplePrompt: say('BEZ % 21 barne, mugikor batek 254,10 € balio du. Zenbat balio du BEZ gabe?', 'Con el 21 % de IVA, un móvil cuesta 254,10 €. ¿Cuánto cuesta sin IVA?', 'مع ضريبة 21 %، سعر هاتف 254.10 €. كم سعره دون الضريبة؟', 'With 21% VAT, a phone costs €254.10. How much is it without VAT?'),
        example: same('$C=\\frac{254{,}1}{1{,}21}=210$'),
        exampleAnswer: say('210 € BEZ gabe.', '210 € sin IVA.', '210 € دون الضريبة.', '€210 without VAT.')
    },

    /* ---------- 5. Simple and compound interest ---------- */
    'simple-interest': {
        definitions: [
            {
                term: say('Kapitala ($C$)', 'Capital ($C$)', 'رأس المال ($C$)', 'Principal ($C$)'),
                meaning: say('Bankuan uzten den dirua.', 'El dinero que se deja en el banco.', 'المال الذي يُودَع في البنك.', 'The money left in the bank.')
            },
            {
                term: say('Errendimendua ($r$)', 'Rédito ($r$)', 'معدل الفائدة ($r$)', 'Rate ($r$)'),
                meaning: say('Bankuak urtero ordaintzen duen interesaren ehunekoa.', 'El porcentaje de interés que paga el banco cada año.', 'نسبة الفائدة التي يدفعها البنك كل سنة.', 'The percentage of interest the bank pays each year.')
            },
            {
                term: say('Interesa ($I$)', 'Interés ($I$)', 'الفائدة ($I$)', 'Interest ($I$)'),
                meaning: say('Kapitalak irabazten duen dirua.', 'El dinero que gana el capital.', 'المال الذي يربحه رأس المال.', 'The money the principal earns.')
            }
        ],
        vocabulary: [
            say('urtea', 'año', 'سنة', 'year'),
            say('hilabetea', 'mes', 'شهر', 'month')
        ],
        explanation: say(
            'Interes sinplean, interesak ez dira kapitalari gehitzen: urtero gauza bera jasotzen da. $t$ urtetan dagoela, $I=\\frac{C\\cdot r\\cdot t}{100}$; $m$ hilabete badira, $t=\\frac{m}{12}$. Adibidez, 1000 € % 2 interesarekin: 20 € urtero. Amaieran, $C_f=C+I$.',
            'En el interés simple, los intereses no se suman al capital: cada año se cobra lo mismo. Con $t$ en años, $I=\\frac{C\\cdot r\\cdot t}{100}$; si son $m$ meses, $t=\\frac{m}{12}$. Por ejemplo, 1000 € al 2 % dan 20 € cada año. Al final, $C_f=C+I$.',
            'في الفائدة البسيطة لا تُضاف الفوائد إلى رأس المال: نحصل كل سنة على المبلغ نفسه. إذا كانت $t$ بالسنوات فإن $I=\\frac{C\\cdot r\\cdot t}{100}$، وإذا كانت المدة $m$ شهرًا فإن $t=\\frac{m}{12}$. مثلًا 1000 € بنسبة 2 % تعطي 20 € كل سنة. وفي النهاية $C_f=C+I$.',
            'With simple interest, the interest is not added to the principal: you earn the same each year. With $t$ in years, $I=\\frac{C\\cdot r\\cdot t}{100}$; for $m$ months, $t=\\frac{m}{12}$. For example, €1,000 at 2% earns €20 each year. At the end, $C_f=C+I$.'
        ),
        examplePrompt: say('Zer kapitalek ematen ditu 270 € interes 3 urtean, % 4,5 interesarekin?', '¿Qué capital da 270 € de interés en 3 años al 4,5 %?', 'ما رأس المال الذي يعطي فائدة 270 € في 3 سنوات بنسبة 4.5 %؟', 'What principal earns €270 of interest in 3 years at 4.5%?'),
        example: same('$C=\\frac{100\\cdot 270}{4{,}5\\cdot 3}=2000$'),
        exampleAnswer: say('2000 euroko kapitala.', 'Un capital de 2000 €.', 'رأس مال قدره 2000 €.', 'A principal of €2,000.')
    },
    'compound-interest': {
        vocabulary: [
            say('kapitala', 'capital', 'رأس المال', 'principal'),
            say('zentimoak', 'céntimos', 'السنتات', 'cents')
        ],
        explanation: say(
            'Interes konposatuan, urte bakoitzaren amaieran interesak kapitalari gehitzen zaizkio, eta haiek ere interesak sortzen dituzte. Urtero kapitala $1+\\frac{r}{100}$ indizeaz biderkatzen da: igoera kateatuak dira. $t$ urteren ondoren, $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$; adibidez, 1000 € % 2 interesarekin 5 urtez: 1104,08 €. Biribildu zentimoetara.',
            'En el interés compuesto, al final de cada año los intereses se suman al capital y también generan intereses. Cada año el capital se multiplica por $1+\\frac{r}{100}$: son aumentos encadenados. Tras $t$ años, $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$; por ejemplo, 1000 € al 2 % durante 5 años dan 1104,08 €. Redondea a los céntimos.',
            'في الفائدة المركبة تُضاف الفوائد إلى رأس المال في نهاية كل سنة، فتولّد هي أيضًا فوائد. كل سنة يُضرب رأس المال في $1+\\frac{r}{100}$: إنها زيادات متتالية. بعد $t$ سنة يكون $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$؛ مثلًا 1000 € بنسبة 2 % لمدة 5 سنوات تصبح 1104.08 €. قرّب إلى السنتات.',
            'With compound interest, at the end of each year the interest is added to the principal and earns interest too. Each year the principal is multiplied by $1+\\frac{r}{100}$: these are chained rises. After $t$ years, $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$; for example, €1,000 at 2% for 5 years becomes €1,104.08. Round to the cents.'
        ),
        examplePrompt: say('Zenbat bihurtzen dira 2500 € % 4 interes konposatuan 3 urtez?', '¿En cuánto se convierten 2500 € al 4 % durante 3 años, a interés compuesto?', 'كم تصبح 2500 € بنسبة 4 % لمدة 3 سنوات بفائدة مركبة؟', 'What do €2,500 at 4% for 3 years become, at compound interest?'),
        example: same('$2500\\cdot 1{,}04^{3}=2812{,}16$'),
        exampleAnswer: say('2812,16 €: 312,16 € interes.', '2812,16 €: 312,16 € de intereses.', '2812.16 €، منها 312.16 € فوائد.', '€2,812.16: €312.16 of interest.')
    },
    'interest-compare': {
        vocabulary: [
            say('zuzena', 'recta', 'مستقيم', 'line'),
            say('kurba', 'curva', 'منحنى', 'curve')
        ],
        explanation: say(
            'Lehen urtean bi interesek gauza bera ematen dute. Gero konposatuak gero eta gehiago ematen du, interesek ere interesak sortzen dituztelako: 1000 € % 10 interesarekin 10 urtez, 2000 € interes sinplean eta 2593,74 € konposatuan. Hasierako kapitala aurkitzeko, zatitu: $C_i=\\frac{C_f}{\\left(1+\\frac{r}{100}\\right)^{t}}$.',
            'El primer año los dos intereses dan lo mismo. Después el compuesto da cada vez más, porque los intereses también generan intereses: 1000 € al 10 % durante 10 años dan 2000 € con interés simple y 2593,74 € con compuesto. Para hallar el capital inicial, divide: $C_i=\\frac{C_f}{\\left(1+\\frac{r}{100}\\right)^{t}}$.',
            'في السنة الأولى تعطي الفائدتان المبلغ نفسه. ثم تعطي المركبة أكثر فأكثر لأن الفوائد تولّد فوائد أيضًا: 1000 € بنسبة 10 % لمدة 10 سنوات تصبح 2000 € بالفائدة البسيطة و2593.74 € بالمركبة. ولإيجاد رأس المال الأولي اقسم: $C_i=\\frac{C_f}{\\left(1+\\frac{r}{100}\\right)^{t}}$.',
            'In the first year both kinds of interest give the same. After that, compound interest gives more and more, because the interest earns interest too: €1,000 at 10% for 10 years becomes €2,000 with simple interest and €2,593.74 with compound. To find the initial principal, divide: $C_i=\\frac{C_f}{\\left(1+\\frac{r}{100}\\right)^{t}}$.'
        ),
        cases: [
            { title: say('Sinplea: zuzena', 'Simple: recta', 'البسيطة: مستقيم', 'Simple: a line'), text: say('Urtero interes bera batzen da.', 'Cada año se suma el mismo interés.', 'تُضاف كل سنة الفائدة نفسها.', 'The same interest is added every year.') },
            { title: say('Konposatua: kurba', 'Compuesto: curva', 'المركبة: منحنى', 'Compound: a curve'), text: say('Urtero indizeaz biderkatzen da: gero eta gehiago hazten da.', 'Cada año se multiplica por el índice: crece cada vez más.', 'تُضرب كل سنة في المؤشر: فتنمو أكثر فأكثر.', 'Each year it is multiplied by the multiplier: it grows faster and faster.') }
        ],
        examplePrompt: say('Inbertsio bat, % 5 interes konposatuan, 4630,50 € bihurtu da 3 urtean. Zenbat inbertitu zen?', 'Una inversión al 5 % de interés compuesto llega a 4630,50 € en 3 años. ¿Cuánto se invirtió?', 'استثمار بفائدة مركبة 5 % بلغ 4630.50 € في 3 سنوات. كم كان المبلغ المستثمر؟', 'An investment at 5% compound interest reaches €4,630.50 in 3 years. How much was invested?'),
        example: same('$C_i=\\frac{4630{,}5}{1{,}05^{3}}=4000$'),
        exampleAnswer: say('4000 € inbertitu ziren.', 'Se invirtieron 4000 €.', 'استُثمر 4000 €.', '€4,000 was invested.')
    }
}

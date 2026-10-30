import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { DecimalKindsFigure, ErrorsFigure, IntervalsFigure, IrrationalFigure, NumberSetsFigure, PeriodicFractionFigure } from '../dbh4-aplikatuak-errealak/figures'
import {
    ChainedFigure,
    CompoundInterestFigure,
    DefectExcessFigure,
    IntervalOpsFigure,
    InterestCompareFigure,
    InverseFigure,
    OrderDensityFigure,
    PercentChangeFigure,
    PercentFigure,
    RepresentFigure,
    SimpleInterestFigure,
    SuccessiveFigure
} from './figures'

/* ==========================================================================
   Zenbaki errealak eta ehunekoak · 4. DBH (matematika akademikoak) — stages
   and lessons. Sequence follows the class textbook (Santillana 4.º ESO
   Académicas unit 1, "Números reales. Porcentajes": rational and irrational
   numbers, representing reals, intervals, approximations and errors,
   percentages, simple and compound interest). Powers, radicals and
   logarithms are unit 2 of the course. The figures shared with the applied
   unit come from ../dbh4-aplikatuak-errealak.
   ========================================================================== */

export type RealsPercentStageId = 'rational' | 'reals' | 'approx' | 'percent' | 'interest'

export const realsPercentStages: UnitStage[] = [
    { id: 'rational', tone: 'blue', title: { eu: 'Zenbaki arrazionalak', es: 'Números racionales', en: 'Rational numbers', ar: 'الأعداد النسبية' } },
    { id: 'reals', tone: 'violet', title: { eu: 'Irrazionalak eta zuzen erreala', es: 'Irracionales y recta real', en: 'Irrational numbers and the real number line.', ar: 'غير النسبية والمستقيم الحقيقي' } },
    { id: 'approx', tone: 'mustard', title: { eu: 'Tarteak eta hurbilketak', es: 'Intervalos y aproximaciones', en: 'Intervals and approximations', ar: 'الفترات والتقريب' } },
    { id: 'percent', tone: 'coral', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' } },
    { id: 'interest', tone: 'green', title: { eu: 'Interes sinplea eta konposatua', es: 'Interés simple y compuesto', en: 'Simple and compound interest', ar: 'الفائدة البسيطة والمركبة' } }
]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const realsPercentTopics: UnitTopic[] = [
    {
        id: 'decimal-kinds',
        stage: 'rational',
        title: say('Arrazionalak eta adierazpen hamartarra', 'Racionales y expresión decimal', 'النسبية والصورة العشرية', 'Rational numbers and decimal form'),
        goal: say('Zatiki batek zer hamartar mota ematen duen jakitea: zehatza, periodiko hutsa ala mistoa.', 'Saber qué tipo de decimal da una fracción: exacto, periódico puro o periódico mixto.', 'معرفة نوع العدد العشري الذي يعطيه كسر: منتهٍ أو دوري بحت أو دوري مختلط.', 'Know what type of decimal a fraction gives: terminating, purely recurring or mixed recurring.'),
        explanation: say(
            'Zenbaki arrazionala zatiki gisa idatz daitekeena da: $\\frac{a}{b}$, $a$ eta $b$ osoak eta $b\\neq 0$. Zatiketa eginda, adierazpen hamartarra lortzen da, eta hiru mota baino ez daude: zehatza (hamartar kopuru mugatua), periodiko hutsa (periodoa komaren ondoren berehala hasten da) eta periodiko mistoa (periodoaren aurretik aurreperiodoa dago). Mota zein den izendatzaile laburtezinak esaten du: 2 eta 5 bakarrik baditu, zehatza; ez 2 ez 5, hutsa; 2 edo 5 eta beste faktore bat, mistoa.',
            'Un número racional es el que se puede escribir como fracción: $\\frac{a}{b}$, con $a$ y $b$ enteros y $b\\neq 0$. Al hacer la división se obtiene su expresión decimal, que solo puede ser de tres tipos: exacta (con un número finito de decimales), periódica pura (el periodo empieza justo después de la coma) o periódica mixta (antes del periodo hay un anteperiodo). El tipo lo dice el denominador irreducible: si solo tiene los factores 2 y 5, es exacta; si no tiene ni 2 ni 5, periódica pura; si tiene 2 o 5 y algún otro factor, periódica mixta.',
            'العدد النسبي هو ما يمكن كتابته كسرًا: $\\frac{a}{b}$ حيث $a$ و$b$ صحيحان و$b\\neq 0$. عند إجراء القسمة نحصل على صورته العشرية، وهي من ثلاثة أنواع فقط: منتهية (عدد منتهٍ من المنازل)، أو دورية بحتة (يبدأ الدور بعد الفاصلة مباشرة)، أو دورية مختلطة (قبل الدور جزء غير دوري). ويحدد النوعَ المقامُ بعد الاختزال: إذا لم يكن فيه إلا العاملان 2 و5 فهي منتهية، وإذا لم يكن فيه 2 ولا 5 فهي دورية بحتة، وإذا كان فيه 2 أو 5 مع عامل آخر فهي دورية مختلطة.', 'A rational number is one that can be written as a fraction: $\\frac{a}{b}$, with $a$ and $b$ integers and $b\\neq 0$. When you divide, you get its decimal form, which can only be one of three types: terminating (with a finite number of decimal places), purely recurring (the recurring part starts right after the decimal point) or mixed recurring (there is a non-recurring part before the recurring part). The type depends on the denominator in its simplest form: if it has only the factors 2 and 5, it is terminating; if it has neither 2 nor 5, it is purely recurring; if it has 2 or 5 and some other factor, it is mixed recurring.'
        ),
        problem: say('Zer motatakoak dira $\\frac{3}{40}$, $\\frac{11}{3}$ eta $\\frac{37}{15}$?', '¿De qué tipo son $\\frac{3}{40}$, $\\frac{11}{3}$ y $\\frac{37}{15}$?', 'ما نوع $\\frac{3}{40}$ و$\\frac{11}{3}$ و$\\frac{37}{15}$؟', 'What type of decimal are $\\frac{3}{40}$, $\\frac{11}{3}$ and $\\frac{37}{15}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$40=2^{3}\\cdot 5$: 2 eta 5 bakarrik → zehatza.', '$40=2^{3}\\cdot 5$: solo 2 y 5 → exacto.', '$40=2^{3}\\cdot 5$: فقط 2 و5 → منتهٍ.', '$40=2^{3}\\cdot 5$: only 2 and 5 → terminating.'), math: same('$\\frac{3}{40}=0{,}075$') },
            { text: say('3: ez 2, ez 5 → periodiko hutsa.', '3: ni 2 ni 5 → periódico puro.', '3: لا 2 ولا 5 → دوري بحت.', '3: neither 2 nor 5 → purely recurring.'), math: same('$\\frac{11}{3}=3{,}\\overline{6}$') },
            { text: say('$15=3\\cdot 5$: 5 eta beste faktore bat → mistoa.', '$15=3\\cdot 5$: 5 y otro factor → mixto.', '$15=3\\cdot 5$: 5 وعامل آخر → مختلط.', '$15=3\\cdot 5$: 5 and another factor → mixed recurring.'), math: same('$\\frac{37}{15}=2{,}4\\overline{6}$') }
        ],
        example: same('$\\frac{2}{3}=0{,}\\overline{6}\\qquad\\frac{29}{4}=7{,}25\\qquad\\frac{7}{90}=0{,}0\\overline{7}$'),
        takeaway: say('Begiratu izendatzaile laburtezinari: 2 eta 5 bakarrik → zehatza; bestela, periodikoa.', 'Mira el denominador irreducible: solo 2 y 5 → exacto; si no, periódico.', 'انظر إلى المقام بعد الاختزال: 2 و5 فقط ← منتهٍ؛ وإلا فدوري.', 'Look at the denominator in its simplest form: only 2 and 5 → terminating; otherwise, recurring.'),
        figure: (language) => <DecimalKindsFigure language={language} />
    },
    {
        id: 'generatrix',
        stage: 'rational',
        title: say('Zatiki sortzailea', 'La fracción generatriz', 'الكسر المولّد', 'The generating fraction'),
        goal: say('Hamartar zehatz edo periodiko bat sortzen duen zatikia aurkitzea.', 'Encontrar la fracción que genera un decimal exacto o periódico.', 'إيجاد الكسر الذي يولّد عددًا عشريًا منتهيًا أو دوريًا.', 'Find the fraction that generates a terminating or recurring decimal.'),
        explanation: say(
            'Hamartar zehatz baten zatiki sortzailea: zenbakitzailean komarik gabeko zenbakia eta izendatzailean 1 eta hamartar adina zero. Hamartar periodiko batena: zenbakitzailean, zenbaki osoa (koma eta periodoaren marka gabe) ken periodoaren aurreko zatia; izendatzailean, 9 bat periodoko zifra bakoitzeko eta, gero, 0 bat aurreperiodoko zifra bakoitzeko. Azkenik, sinplifikatu. Hamartar periodiko guztiak arrazionalak dira.',
            'La fracción generatriz de un decimal exacto tiene como numerador el número sin la coma y como denominador un 1 seguido de tantos ceros como decimales. La de un decimal periódico tiene como numerador el número entero (sin coma ni marca de periodo) menos la parte anterior al periodo, y como denominador un 9 por cada cifra del periodo seguido de un 0 por cada cifra del anteperiodo. Al final, simplifica. Todos los decimales periódicos son racionales.',
            'الكسر المولّد لعدد عشري منتهٍ: بسطه العدد دون فاصلة، ومقامه 1 تتبعه أصفار بعدد المنازل العشرية. وللعدد العشري الدوري: البسط هو العدد كاملًا (دون فاصلة ولا علامة الدور) ناقص الجزء الذي قبل الدور، والمقام 9 لكل رقم في الدور يتبعها 0 لكل رقم في الجزء غير الدوري. ثم بسّط. كل عدد عشري دوري عدد نسبي.', 'The generating fraction of a terminating decimal has as its numerator the number without the decimal point, and as its denominator a 1 followed by as many zeros as there are decimal places. For a recurring decimal, the numerator is the number without the decimal point or the bar over the recurring digits, minus the non-recurring part, and the denominator is a 9 for each recurring digit followed by a 0 for each non-recurring digit. Finally, simplify. All recurring decimals are rational.'
        ),
        problem: say('Aurkitu $5{,}2\\overline{31}$ zenbakiaren zatiki sortzailea.', 'Halla la fracción generatriz de $5{,}2\\overline{31}$.', 'جد الكسر المولّد للعدد $5{,}2\\overline{31}$.', 'Find the generating fraction of $5{,}2\\overline{31}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbaki osoa: 5231. Periodoaren aurretik: 52.', 'El número entero: 5231. Lo anterior al periodo: 52.', 'العدد كاملًا: 5231. ما قبل الدور: 52.', 'The number with no decimal point: 5231. The non-recurring part: 52.'), math: same('$5231-52=5179$') },
            { text: say('Periodoa: 2 zifra → 99; aurreperiodoa: zifra 1 → 0.', 'Periodo: 2 cifras → 99; anteperiodo: 1 cifra → 0.', 'الدور: رقمان ← 99؛ ما قبله: رقم واحد ← 0.', 'Recurring part: 2 digits → 99; non-recurring part: 1 digit → 0.'), math: same('$\\frac{5179}{990}$') },
            { text: say('Ezin da sinplifikatu (5179 ez da 2, 3, 5 edo 11ren multiploa).', 'No se puede simplificar (5179 no es múltiplo de 2, 3, 5 ni 11).', 'لا يمكن الاختزال (5179 ليس مضاعفًا لـ 2 أو 3 أو 5 أو 11).', 'It cannot be simplified (5179 is not a multiple of 2, 3, 5 or 11).'), math: same('$5{,}2\\overline{31}=\\frac{5179}{990}$') }
        ],
        example: same('$35{,}47=\\frac{3547}{100}\\qquad 13{,}\\overline{46}=\\frac{1346-13}{99}=\\frac{1333}{99}$'),
        takeaway: say('9ak periodoarentzat, 0ak aurreperiodoarentzat; zenbakitzailean, guztia ken periodoaren aurrekoa.', 'Nueves por el periodo, ceros por el anteperiodo; arriba, todo menos lo anterior al periodo.', 'تسعات للدور وأصفار لما قبله؛ وفي البسط الكل ناقص ما قبل الدور.', 'Nines for the recurring part, zeros for the non-recurring part; on top, everything except the non-recurring part.'),
        figure: (language) => <PeriodicFractionFigure language={language} />
    },
    {
        id: 'order-density',
        stage: 'rational',
        title: say('Arrazionalak ordenatu eta tartekatu', 'Ordenar e intercalar racionales', 'ترتيب الأعداد النسبية والإدخال بينها', 'Order rational numbers and find numbers in between'),
        goal: say('Hamartarrak eta zatikiak ordenatzea eta bi arrazionalen artean beste bat aurkitzea.', 'Ordenar decimales y fracciones y encontrar un racional entre otros dos.', 'ترتيب العشريات والكسور وإيجاد عدد نسبي بين عددين.', 'Order decimals and fractions, and find a rational number between two others.'),
        explanation: say(
            'Bi hamartar konparatzeko, begiratu zifraz zifra ezkerretik: lehen zifra desberdinak erabakitzen du. Periodikoetan, idatzi zifra batzuk: $0{,}\\overline{41}=0{,}4141\\ldots$ eta $0{,}4\\overline{1}=0{,}4111\\ldots$ Zatikiak konparatzeko, jarri izendatzaile bera edo pasatu hamartarrera. Bi zenbaki arrazional desberdinen artean beti daude infinitu arrazional: adibidez, erdiko puntua $\\frac{a+b}{2}$. Horregatik esaten da arrazionalak zuzenean "dentsoak" direla.',
            'Para comparar dos decimales, mira cifra a cifra desde la izquierda: decide la primera cifra distinta. En los periódicos, escribe varias cifras: $0{,}\\overline{41}=0{,}4141\\ldots$ y $0{,}4\\overline{1}=0{,}4111\\ldots$ Para comparar fracciones, ponlas con el mismo denominador o pásalas a decimal. Entre dos racionales distintos siempre hay infinitos racionales: por ejemplo, el punto medio $\\frac{a+b}{2}$. Por eso se dice que los racionales son "densos" en la recta.',
            'لمقارنة عددين عشريين قارن رقمًا برقم من اليسار: يحسم الأمر أول رقم مختلف. وفي الدورية اكتب عدة أرقام: $0{,}\\overline{41}=0{,}4141\\ldots$ و$0{,}4\\overline{1}=0{,}4111\\ldots$ ولمقارنة الكسور وحّد المقامات أو حوّلها إلى عشريات. وبين عددين نسبيين مختلفين توجد دائمًا أعداد نسبية لا نهائية: مثلًا نقطة المنتصف $\\frac{a+b}{2}$. لذلك نقول إن الأعداد النسبية "كثيفة" على المستقيم.', 'To compare two decimals, look digit by digit from the left: the first different digit decides. For recurring decimals, write out several digits: $0{,}\\overline{41}=0{,}4141\\ldots$ and $0{,}4\\overline{1}=0{,}4111\\ldots$ To compare fractions, write them with the same denominator or change them to decimals. Between two different rational numbers there are infinitely many rational numbers: for example, the midpoint $\\frac{a+b}{2}$. That is why rational numbers are said to be ‘dense’ on the number line.'
        ),
        problem: say('Aurkitu $\\frac{4}{5}$ eta $\\frac{5}{6}$ arteko zatiki bat.', 'Encuentra una fracción entre $\\frac{4}{5}$ y $\\frac{5}{6}$.', 'جد كسرًا بين $\\frac{4}{5}$ و$\\frac{5}{6}$.', 'Find a fraction between $\\frac{4}{5}$ and $\\frac{5}{6}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzaile bera: m.k.t.(5, 6) = 30.', 'Mismo denominador: m.c.m.(5, 6) = 30.', 'المقام نفسه: م.م.أ.(5، 6) = 30.', 'Same denominator: LCM(5, 6) = 30.'), math: same('$\\frac{4}{5}=\\frac{24}{30}\\qquad\\frac{5}{6}=\\frac{25}{30}$') },
            { text: say('Ez dago tarterik: biderkatu bi gaiak 4z.', 'No hay hueco: multiplica los dos términos por 4.', 'لا فراغ بينهما: اضرب الحدين في 4.', 'There is no gap: multiply the top and bottom by 4.'), math: same('$\\frac{96}{120}<\\frac{97}{120}<\\frac{98}{120}<\\frac{100}{120}$') },
            { text: say('Edo erdiko puntua.', 'O el punto medio.', 'أو نقطة المنتصف.', 'Or the midpoint.'), math: same('$\\frac{1}{2}\\left(\\frac{24}{30}+\\frac{25}{30}\\right)=\\frac{49}{60}$') }
        ],
        example: same('$0{,}4\\overline{12}>0{,}4\\overline{1}>0{,}\\overline{14}>0{,}14>0{,}\\overline{1}$'),
        takeaway: say('Ordenatzeko, zifraz zifra; tartekatzeko, erdiko puntua: beti dago beste arrazional bat.', 'Para ordenar, cifra a cifra; para intercalar, el punto medio: siempre hay otro racional.', 'للترتيب رقمًا برقم؛ وللإدخال نقطة المنتصف: يوجد دائمًا عدد نسبي آخر.', 'To order, compare digit by digit; to fit one in between, use the midpoint: there is always another rational number.'),
        figure: (language) => <OrderDensityFigure language={language} />
    },
    {
        id: 'irrational',
        stage: 'reals',
        title: say('Zenbaki irrazionalak', 'Números irracionales', 'الأعداد غير النسبية', 'Irrational numbers'),
        goal: say('Zenbaki irrazionalak ezagutzea eta arrazionaletatik bereiztea.', 'Reconocer los números irracionales y distinguirlos de los racionales.', 'التعرف على الأعداد غير النسبية وتمييزها من النسبية.', 'Recognise irrational numbers and tell them apart from rational numbers.'),
        explanation: say(
            'Zenbaki irrazionalak infinitu zifra hamartar dituzte, periodorik gabe; beraz, ezin dira zatiki gisa idatzi. Adibideak: $\\pi$, karratu perfektuak ez diren zenbakien erroak ($\\sqrt{2}$, $\\sqrt{10}$), $\\sqrt[3]{31}$ edo $3{,}121122111222\\ldots$ bezalako hamartarrak. Kontuz: $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$ arrazionala da, eta irrazional baten eta arrazional baten batura irrazionala da, baina bi irrazionalen batura arrazionala izan daiteke: $\\pi+(-\\pi)=0$. Gainera, $\\sqrt{a+b}\\neq\\sqrt{a}+\\sqrt{b}$.',
            'Los números irracionales tienen infinitas cifras decimales sin periodo; por eso no se pueden escribir como fracción. Ejemplos: $\\pi$, las raíces de números que no son cuadrados perfectos ($\\sqrt{2}$, $\\sqrt{10}$), $\\sqrt[3]{31}$ o decimales como $3{,}121122111222\\ldots$ Cuidado: $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$ es racional; la suma de un irracional y un racional es irracional, pero la suma de dos irracionales puede ser racional: $\\pi+(-\\pi)=0$. Además, $\\sqrt{a+b}\\neq\\sqrt{a}+\\sqrt{b}$.',
            'للأعداد غير النسبية منازل عشرية لا نهائية بلا دور؛ لذلك لا تُكتب كسورًا. أمثلة: $\\pi$، وجذور الأعداد التي ليست مربعات كاملة ($\\sqrt{2}$ و$\\sqrt{10}$)، و$\\sqrt[3]{31}$، وأعداد مثل $3{,}121122111222\\ldots$ انتبه: $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$ عدد نسبي؛ ومجموع عدد غير نسبي وعدد نسبي غير نسبي، لكن مجموع عددين غير نسبيين قد يكون نسبيًا: $\\pi+(-\\pi)=0$. كذلك $\\sqrt{a+b}\\neq\\sqrt{a}+\\sqrt{b}$.', 'Irrational numbers have an infinite number of decimal digits with no recurring part, so they cannot be written as a fraction. Examples: $\\pi$, the square roots of numbers that are not perfect squares ($\\sqrt{2}$, $\\sqrt{10}$), $\\sqrt[3]{31}$, or decimals such as $3{,}121122111222\\ldots$ Be careful: $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}$ is rational; the sum of an irrational and a rational is irrational, but the sum of two irrationals can be rational: $\\pi+(-\\pi)=0$. Also, $\\sqrt{a+b}\\neq\\sqrt{a}+\\sqrt{b}$.'
        ),
        stepsKind: 'facts',
        steps: [
            { text: say('Karratu perfektuaren erroa: arrazionala.', 'Raíz de un cuadrado perfecto: racional.', 'جذر مربع كامل: نسبي.', 'Square root of a perfect square: rational.'), math: same('$\\sqrt{196}=14\\qquad\\sqrt{1+8}=\\sqrt{9}=3$') },
            { text: say('Karratu perfektua ez bada: irrazionala.', 'Si no es cuadrado perfecto: irracional.', 'إذا لم يكن مربعًا كاملًا: غير نسبي.', 'If it is not a perfect square: irrational.'), math: same('$1+\\sqrt{8}=3{,}828427\\ldots$') },
            { text: say('Erroak ez dira batzen errokizunak batuz.', 'Las raíces no se suman sumando los radicandos.', 'لا تُجمع الجذور بجمع ما تحتها.', 'Roots are not added by adding the numbers under the root sign.'), math: same('$\\sqrt{9+4}=\\sqrt{13}\\neq\\sqrt{9}+\\sqrt{4}=5$') }
        ],
        example: same('$\\pi^{2}=9{,}8696\\ldots\\in\\mathbb{I}\\qquad 24{,}\\overline{23}=\\frac{2399}{99}\\in\\mathbb{Q}$'),
        takeaway: say('Irrazionala: infinitu hamartar periodorik gabe. Periodoa badu, arrazionala da.', 'Irracional: infinitos decimales sin periodo. Si tiene periodo, es racional.', 'غير النسبي: منازل لا نهائية بلا دور. وإن كان له دور فهو نسبي.', 'Irrational: an infinite number of decimal digits with no recurring part. If it has a recurring part, it is rational.'),
        figure: (language) => <IrrationalFigure language={language} />
    },
    {
        id: 'number-sets',
        stage: 'reals',
        title: say('Zenbaki errealak eta multzoak', 'Los números reales y sus conjuntos', 'الأعداد الحقيقية ومجموعاتها', 'Real numbers and their sets'),
        goal: say('Zenbaki bakoitza dagokion multzorik txikienean sailkatzea.', 'Clasificar cada número en el conjunto más pequeño al que pertenece.', 'تصنيف كل عدد في أصغر مجموعة ينتمي إليها.', 'Classify each number into the smallest set it belongs to.'),
        explanation: say(
            'Arrazionalek ($\\mathbb{Q}$) eta irrazionalek ($\\mathbb{I}$) batera zenbaki errealak ($\\mathbb{R}$) osatzen dituzte. Multzoak bata bestearen barruan daude: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$, eta $\\mathbb{I}$ $\\mathbb{R}$-ren barruan dago, $\\mathbb{Q}$-tik kanpo. Zenbaki bat sailkatzeko, idatzi bere forma sinpleenean: $\\frac{48}{16}=3$ naturala da eta $\\sqrt{20-4}=4$ ere bai; $-\\frac{6}{17}$ arrazionala da; $\\frac{\\pi}{5}$, irrazionala.',
            'Los racionales ($\\mathbb{Q}$) y los irracionales ($\\mathbb{I}$) juntos forman los números reales ($\\mathbb{R}$). Los conjuntos están unos dentro de otros: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$, e $\\mathbb{I}$ está dentro de $\\mathbb{R}$, fuera de $\\mathbb{Q}$. Para clasificar un número, escríbelo en su forma más sencilla: $\\frac{48}{16}=3$ es natural y $\\sqrt{20-4}=4$ también; $-\\frac{6}{17}$ es racional; $\\frac{\\pi}{5}$, irracional.',
            'تكوّن الأعداد النسبية ($\\mathbb{Q}$) وغير النسبية ($\\mathbb{I}$) معًا الأعداد الحقيقية ($\\mathbb{R}$). والمجموعات متداخلة: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$، و$\\mathbb{I}$ داخل $\\mathbb{R}$ وخارج $\\mathbb{Q}$. لتصنيف عدد اكتبه في أبسط صورة: $\\frac{48}{16}=3$ طبيعي و$\\sqrt{20-4}=4$ كذلك؛ و$-\\frac{6}{17}$ نسبي؛ و$\\frac{\\pi}{5}$ غير نسبي.', 'The rational numbers ($\\mathbb{Q}$) and the irrational numbers ($\\mathbb{I}$) together make up the real numbers ($\\mathbb{R}$). The sets are nested inside one another: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$, and $\\mathbb{I}$ is inside $\\mathbb{R}$ but outside $\\mathbb{Q}$. To classify a number, write it in its simplest form: $\\frac{48}{16}=3$ is natural and $\\sqrt{20-4}=4$ is too; $-\\frac{6}{17}$ is rational; $\\frac{\\pi}{5}$, irrational.'
        ),
        stepsKind: 'facts',
        steps: [
            { text: say('$\\mathbb{N}$: 0, 1, 2… · $\\mathbb{Z}$: negatiboak ere bai.', '$\\mathbb{N}$: 0, 1, 2… · $\\mathbb{Z}$: también los negativos.', '$\\mathbb{N}$: 0، 1، 2… · $\\mathbb{Z}$: والسالبة أيضًا.', '$\\mathbb{N}$: 0, 1, 2… · $\\mathbb{Z}$: also the negative numbers.'), math: same('$\\sqrt{256}=16\\in\\mathbb{N}\\qquad -47\\in\\mathbb{Z}$') },
            { text: say('$\\mathbb{Q}$: zatiki gisa idatz daitezkeenak.', '$\\mathbb{Q}$: los que se escriben como fracción.', '$\\mathbb{Q}$: ما يُكتب كسرًا.', '$\\mathbb{Q}$: those that can be written as a fraction.'), math: same('$-27{,}3\\overline{5}=-\\frac{1231}{45}\\in\\mathbb{Q}$') },
            { text: say('$\\mathbb{I}$: gainerakoak.', '$\\mathbb{I}$: el resto.', '$\\mathbb{I}$: الباقي.', '$\\mathbb{I}$: the rest.'), math: same('$\\sqrt{31}=5{,}5677\\ldots\\in\\mathbb{I}$') }
        ],
        example: same('$\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}\\qquad\\mathbb{Q}\\cup\\mathbb{I}=\\mathbb{R}$'),
        takeaway: say('Sinplifikatu lehenik; gero aukeratu multzorik txikiena.', 'Simplifica primero; después elige el conjunto más pequeño.', 'بسّط أولًا ثم اختر أصغر مجموعة.', 'Simplify first; then choose the smallest set.'),
        figure: (language) => <NumberSetsFigure language={language} />
    },
    {
        id: 'represent',
        stage: 'reals',
        title: say('Errealak zuzenean adierazi', 'Representar reales en la recta', 'تمثيل الأعداد الحقيقية على المستقيم', 'Represent real numbers on the number line'),
        goal: say('Zatikiak (Tales) eta erro karratuak (Pitagoras) zuzen errealean zehazki kokatzea.', 'Situar exactamente en la recta fracciones (Tales) y raíces cuadradas (Pitágoras).', 'وضع الكسور (طاليس) والجذور التربيعية (فيثاغورس) بدقة على المستقيم.', 'Place fractions (Thales) and square roots (Pythagoras) exactly on the number line.'),
        explanation: say(
            'Zenbaki erreal bakoitzari zuzeneko puntu bat dagokio, eta alderantziz. Zatiki bat kokatzeko, idatzi zati oso gisa eta zatiki propio gisa ($\\frac{17}{3}=5+\\frac{2}{3}$), eta zatitu $[5,\\,6]$ zatitan Talesen teoremarekin: zuzen zeihar batean hiru zati berdin markatu, azken marka 6rekin lotu eta paraleloak marraztu. $\\sqrt{n}$ kokatzeko, idatzi $n$ bi karraturen batura gisa ($10=3^{2}+1^{2}$): 3 eta 1 katetoak dituen triangelu zuzenaren hipotenusa $\\sqrt{10}$ da, eta konpasarekin zuzenera eramaten da.',
            'A cada número real le corresponde un punto de la recta, y al revés. Para situar una fracción, escríbela como parte entera más fracción propia ($\\frac{17}{3}=5+\\frac{2}{3}$) y divide $[5,\\,6]$ en partes con el teorema de Tales: marca tres partes iguales en una recta oblicua, une la última marca con el 6 y traza paralelas. Para situar $\\sqrt{n}$, escribe $n$ como suma de dos cuadrados ($10=3^{2}+1^{2}$): la hipotenusa del triángulo rectángulo de catetos 3 y 1 mide $\\sqrt{10}$, y se lleva a la recta con el compás.',
            'لكل عدد حقيقي نقطة على المستقيم والعكس. لوضع كسر اكتبه جزءًا صحيحًا مع كسر حقيقي ($\\frac{17}{3}=5+\\frac{2}{3}$) وقسّم $[5,\\,6]$ أجزاء بمبرهنة طاليس: علّم ثلاثة أجزاء متساوية على مستقيم مائل، وصِل العلامة الأخيرة بالعدد 6، وارسم مستقيمات موازية. ولوضع $\\sqrt{n}$ اكتب $n$ مجموع مربعين ($10=3^{2}+1^{2}$): وتر المثلث القائم ذي الضلعين 3 و1 طوله $\\sqrt{10}$، وننقله إلى المستقيم بالفرجار.', 'Each real number corresponds to one point on the number line, and vice versa. To place a fraction, write it as a whole number plus a proper fraction ($\\frac{17}{3}=5+\\frac{2}{3}$) and divide $[5,\\,6]$ into parts using Thales\' theorem: mark three equal parts on a slanted straight line, join the last mark to the 6 and draw parallel lines. To place $\\sqrt{n}$, write $n$ as the sum of two squares ($10=3^{2}+1^{2}$): the hypotenuse of the right-angled triangle with legs 3 and 1 measures $\\sqrt{10}$, and the compass carries it to the number line.'
        ),
        problem: say('Kokatu $\\sqrt{17}$ eta $-\\sqrt{17}$ zuzenean.', 'Sitúa $\\sqrt{17}$ y $-\\sqrt{17}$ en la recta.', 'ضع $\\sqrt{17}$ و$-\\sqrt{17}$ على المستقيم.', 'Place $\\sqrt{17}$ and $-\\sqrt{17}$ on the number line.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi 17 bi karraturen batura gisa.', 'Escribe 17 como suma de dos cuadrados.', 'اكتب 17 مجموع مربعين.', 'Write 17 as the sum of two squares.'), math: same('$17=4^{2}+1^{2}$') },
            { text: say('Marraztu 4 eta 1 katetoak: hipotenusa $\\sqrt{17}$ da.', 'Dibuja los catetos 4 y 1: la hipotenusa es $\\sqrt{17}$.', 'ارسم الضلعين 4 و1: الوتر هو $\\sqrt{17}$.', 'Draw legs of 4 and 1: the hypotenuse is $\\sqrt{17}$.'), math: same('$\\sqrt{4^{2}+1^{2}}=\\sqrt{17}$') },
            { text: say('Konpasarekin, 0an zentratuta, eraman eskuinera eta ezkerrera.', 'Con el compás centrado en 0, llévala a la derecha y a la izquierda.', 'بالفرجار في 0 انقله يمينًا ويسارًا.', 'With the compass centred on 0, carry it to the right and to the left.'), math: same('$\\sqrt{17}\\approx 4{,}12\\qquad -\\sqrt{17}\\approx -4{,}12$') }
        ],
        example: same('$\\sqrt{26}=\\sqrt{5^{2}+1^{2}}\\qquad\\frac{17}{6}=2+\\frac{5}{6}$'),
        takeaway: say('Zatikia: Tales eta paraleloak. Erroa: Pitagoras eta konpasa.', 'Fracción: Tales y paralelas. Raíz: Pitágoras y compás.', 'الكسر: طاليس والمتوازيات. الجذر: فيثاغورس والفرجار.', 'Fraction: Thales and parallel lines. Root: Pythagoras and compass.'),
        figure: (language) => <RepresentFigure language={language} />
    },
    {
        id: 'successive',
        stage: 'reals',
        title: say('Hurbilketa jarraituak zuzenean', 'Aproximaciones sucesivas en la recta', 'التقريبات المتتالية على المستقيم', 'Successive approximations on the number line'),
        goal: say('Irrazional bat zuzenean kokatzea, gero eta tarte txikiagoetan.', 'Situar un irracional en la recta en intervalos cada vez más pequeños.', 'وضع عدد غير نسبي على المستقيم في فترات تصغر شيئًا فشيئًا.', 'Place an irrational number on the number line in smaller and smaller intervals.'),
        explanation: say(
            'Irrazional bat ezin denean eraikuntza baten bidez kokatu, hurbilketa jarraituak erabiltzen dira. Lehenik, bilatu bi zenbaki osoren artean dagoela; gero zatitu tarte hori 10 zatitan eta aukeratu zenbakia duen zatia (hamarrenak); gero berriro (ehunenak)… Zoom bakoitzean tartea 10 aldiz txikiagoa da eta zifra hamartar bat gehiago lortzen da. Adibidez, $1{,}\\overline{5}<\\frac{\\pi}{2}<1{,}6$, $\\frac{\\pi}{2}=1{,}5707\\ldots$ delako.',
            'Cuando un irracional no se puede situar con una construcción, se usan aproximaciones sucesivas. Primero, busca entre qué dos enteros está; después divide ese intervalo en 10 partes y elige la que contiene el número (las décimas); después otra vez (las centésimas)… En cada zoom el intervalo es 10 veces más pequeño y se gana una cifra decimal. Por ejemplo, $1{,}\\overline{5}<\\frac{\\pi}{2}<1{,}6$, porque $\\frac{\\pi}{2}=1{,}5707\\ldots$',
            'عندما لا يمكن وضع عدد غير نسبي بإنشاء هندسي نستعمل التقريبات المتتالية. أولًا ابحث بين أي عددين صحيحين يقع، ثم قسّم الفترة 10 أجزاء واختر الجزء الذي فيه العدد (الأعشار)، ثم كرر (الأجزاء من مئة)… في كل تكبير تصغر الفترة 10 مرات ونكسب رقمًا عشريًا. مثلًا $1{,}\\overline{5}<\\frac{\\pi}{2}<1{,}6$ لأن $\\frac{\\pi}{2}=1{,}5707\\ldots$', 'When an irrational number cannot be placed with a construction, successive approximations are used. First, look for the two integers it lies between; then divide that interval into 10 parts and choose the one that contains the number (the tenths); then do it again (the hundredths)… At each zoom the interval is 10 times smaller, and you gain one decimal digit. For example, $1{,}\\overline{5}<\\frac{\\pi}{2}<1{,}6$, because $\\frac{\\pi}{2}=1{,}5707\\ldots$'
        ),
        problem: say('Kokatu $1+\\sqrt{3}=2{,}7320\\ldots$ ehunenetara.', 'Sitúa $1+\\sqrt{3}=2{,}7320\\ldots$ hasta las centésimas.', 'ضع $1+\\sqrt{3}=2{,}7320\\ldots$ حتى الأجزاء من مئة.', 'Place $1+\\sqrt{3}=2{,}7320\\ldots$ on the number line to the hundredths.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbaki osoak.', 'Los enteros.', 'الأعداد الصحيحة.', 'The integers.'), math: same('$2<1+\\sqrt{3}<3$') },
            { text: say('Hamarrenak.', 'Las décimas.', 'الأعشار.', 'The tenths.'), math: same('$2{,}7<1+\\sqrt{3}<2{,}8$') },
            { text: say('Ehunenak.', 'Las centésimas.', 'الأجزاء من مئة.', 'The hundredths.'), math: same('$2{,}73<1+\\sqrt{3}<2{,}74$') }
        ],
        example: same('$3\\pi=9{,}4247\\ldots\\ \\to\\ 9{,}42<3\\pi<9{,}43$'),
        takeaway: say('Zoom bakoitzak tartea 10 aldiz txikitzen du: zifra bat gehiago.', 'Cada zoom hace el intervalo 10 veces más pequeño: una cifra más.', 'كل تكبير يصغّر الفترة 10 مرات: رقم إضافي.', 'Each zoom makes the interval 10 times smaller: one more digit.'),
        figure: (language) => <SuccessiveFigure language={language} />
    },
    {
        id: 'intervals',
        stage: 'approx',
        title: say('Tarteak eta zuzenerdiak', 'Intervalos y semirrectas', 'الفترات وأنصاف المستقيمات', 'Intervals and half-lines'),
        goal: say('Zuzeneko zatiak tarte, desberdintza eta irudi gisa adieraztea.', 'Expresar trozos de la recta como intervalo, como desigualdad y con un dibujo.', 'التعبير عن أجزاء المستقيم فترةً ومتباينةً ورسمًا.', 'Express pieces of the number line as intervals, as inequalities and as drawings.'),
        explanation: say(
            'Tarte batek bi zenbakiren arteko errealak biltzen ditu. Itxia $[a,\\,b]$: $a\\le x\\le b$; irekia $(a,\\,b)$: $a<x<b$; erdi-irekiak $[a,\\,b)$ eta $(a,\\,b]$. Kortxeteak muturra barne dagoela esan nahi du (puntu betea) eta parentesiak kanpo dagoela (puntu hutsa). Zuzenerdiek mutur bakarra dute: $(a,\\,+\\infty)$ $x>a$ da eta $(-\\infty,\\,b]$ $x\\le b$. Infinitua ez da zenbaki bat: beti parentesiarekin. Zuzen osoa $\\mathbb{R}=(-\\infty,\\,+\\infty)$ da.',
            'Un intervalo reúne los reales comprendidos entre dos números. Cerrado $[a,\\,b]$: $a\\le x\\le b$; abierto $(a,\\,b)$: $a<x<b$; semiabiertos $[a,\\,b)$ y $(a,\\,b]$. El corchete indica que el extremo está incluido (punto relleno) y el paréntesis que no (punto hueco). Las semirrectas tienen un solo extremo: $(a,\\,+\\infty)$ es $x>a$ y $(-\\infty,\\,b]$ es $x\\le b$. El infinito no es un número: siempre con paréntesis. La recta entera es $\\mathbb{R}=(-\\infty,\\,+\\infty)$.',
            'تجمع الفترة الأعداد الحقيقية الواقعة بين عددين. المغلقة $[a,\\,b]$: $a\\le x\\le b$؛ والمفتوحة $(a,\\,b)$: $a<x<b$؛ ونصف المفتوحتين $[a,\\,b)$ و$(a,\\,b]$. القوس المعقوف يعني أن الطرف داخل (نقطة ممتلئة) والقوس العادي أنه خارج (نقطة فارغة). ولأنصاف المستقيمات طرف واحد: $(a,\\,+\\infty)$ هي $x>a$ و$(-\\infty,\\,b]$ هي $x\\le b$. اللانهاية ليست عددًا: دائمًا بقوس عادي. والمستقيم كله $\\mathbb{R}=(-\\infty,\\,+\\infty)$.', 'An interval is the set of real numbers between two numbers. Closed $[a,\\,b]$: $a\\le x\\le b$; open $(a,\\,b)$: $a<x<b$; half-open $[a,\\,b)$ and $(a,\\,b]$. The square bracket means the end is included (filled dot), and the round bracket means it is not (open dot). Half-lines have only one end: $(a,\\,+\\infty)$ is $x>a$ and $(-\\infty,\\,b]$ is $x\\le b$. Infinity is not a number, so always use a round bracket. The entire number line is $\\mathbb{R}=(-\\infty,\\,+\\infty)$.'
        ),
        stepsKind: 'facts',
        steps: [
            { text: say('Tartetik desberdintzara.', 'De intervalo a desigualdad.', 'من الفترة إلى المتباينة.', 'From interval to inequality.'), math: same('$(-3,\\,0]\\ \\to\\ -3<x\\le 0$') },
            { text: say('Desberdintzatik tartera (txikiena ezkerrean).', 'De desigualdad a intervalo (el menor a la izquierda).', 'من المتباينة إلى الفترة (الأصغر يسارًا).', 'From inequality to interval (the smaller number on the left).'), math: same('$10>x>4\\ \\to\\ (4,\\,10)$') },
            { text: say('Zuzenerdia.', 'Semirrecta.', 'نصف مستقيم.', 'Half-line.'), math: same('$x\\ge -1\\ \\to\\ [-1,\\,+\\infty)$') }
        ],
        example: same('$[1,\\,5)=\\{x\\in\\mathbb{R}:\\ 1\\le x<5\\}$'),
        takeaway: say('[ ] barne, ( ) kanpo; infinitua beti parentesiarekin.', '[ ] dentro, ( ) fuera; el infinito siempre con paréntesis.', '[ ] داخل و( ) خارج؛ واللانهاية دائمًا بقوس عادي.', '[ ]: included, ( ): not included; infinity always with a round bracket.'),
        figure: (language) => <IntervalsFigure language={language} />
    },
    {
        id: 'interval-ops',
        stage: 'approx',
        title: say('Tarteen bildura eta ebakidura', 'Unión e intersección de intervalos', 'اتحاد الفترات وتقاطعها', 'Union and intersection of intervals'),
        goal: say('Bi tarteren bildura eta ebakidura zuzenean irakurtzea.', 'Leer en la recta la unión y la intersección de dos intervalos.', 'قراءة اتحاد فترتين وتقاطعهما على المستقيم.', 'Read the union and the intersection of two intervals on the number line.'),
        explanation: say(
            'Bi tarteen bildura $A\\cup B$ gutxienez bietako batean dauden zenbakiek osatzen dute; ebakidura $A\\cap B$, bietan aldi berean daudenek. Marraztu bi tarteak zuzen berean, altuera desberdinetan: bildura bi marrek estaltzen duten guztia da; ebakidura, gainjartzen diren zatia. Mutur bat barne dago ebakiduran bi tarteetan barne badago; bilduran, batean behintzat barne badago. Ebakidura hutsa izan daiteke ($\\emptyset$).',
            'La unión $A\\cup B$ de dos intervalos la forman los números que están al menos en uno de los dos; la intersección $A\\cap B$, los que están en los dos a la vez. Dibuja los dos intervalos en la misma recta, a distinta altura: la unión es todo lo que cubren las dos bandas; la intersección, la parte en que se solapan. Un extremo está incluido en la intersección si lo está en los dos intervalos; en la unión, si lo está en alguno. La intersección puede ser vacía ($\\emptyset$).',
            'اتحاد فترتين $A\\cup B$ هو الأعداد الموجودة في إحداهما على الأقل؛ وتقاطعهما $A\\cap B$ الأعداد الموجودة فيهما معًا. ارسم الفترتين على المستقيم نفسه بارتفاعين مختلفين: الاتحاد كل ما يغطيه الشريطان، والتقاطع الجزء المتداخل. يكون الطرف داخل التقاطع إذا كان داخل الفترتين، وداخل الاتحاد إذا كان داخل إحداهما. وقد يكون التقاطع خاليًا ($\\emptyset$).', 'The union $A\\cup B$ of two intervals is made up of the numbers that are in at least one of them; the intersection $A\\cap B$ is made up of the numbers that are in both at once. Draw the two intervals on the same number line, at different heights: the union is everything covered by the two bands; the intersection is the part where they overlap. An end is included in the intersection only if it is included in both intervals; in the union, if it is included in at least one. The intersection can be empty ($\\emptyset$).'
        ),
        problem: same('$A=(-5,\\,3]\\qquad B=(-1,\\,+\\infty)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Marraztu biak: −1etik 3ra gainjartzen dira.', 'Dibuja los dos: se solapan de −1 a 3.', 'ارسمهما: يتداخلان من −1 إلى 3.', 'Draw both: they overlap from −1 to 3.'), math: same('$-1\\notin B\\qquad 3\\in A$') },
            { text: say('Ebakidura: biek estaltzen dutena.', 'Intersección: lo que cubren los dos.', 'التقاطع: ما يغطيانه معًا.', 'Intersection: what both of them cover.'), math: same('$A\\cap B=(-1,\\,3]$') },
            { text: say('Bildura: −5etik aurrera dena.', 'Unión: todo a partir de −5.', 'الاتحاد: كل ما بعد −5.', 'Union: everything from −5 onwards.'), math: same('$A\\cup B=(-5,\\,+\\infty)$') }
        ],
        example: same('$(-\\infty,\\,3)\\cap(-3,\\,+\\infty)=(-3,\\,3)\\qquad [0,\\,1)\\cap[1,\\,2]=\\emptyset$'),
        takeaway: say('∪: bietako batean; ∩: bietan. Marraztu beti.', '∪: en alguno; ∩: en los dos. Dibújalo siempre.', '∪: في إحداهما؛ ∩: فيهما معًا. ارسم دائمًا.', '∪: in either one; ∩: in both. Always draw it.'),
        figure: (language) => <IntervalOpsFigure language={language} />
    },
    {
        id: 'rounding',
        stage: 'approx',
        title: say('Hurbilketak: gutxiagoz, gehiagoz eta biribiltzea', 'Aproximaciones: por defecto, por exceso y redondeo', 'التقريب: بالنقصان وبالزيادة والتدوير', 'Approximations: lower, upper and rounded'),
        goal: say('Zenbaki bat ordena jakin bateraino hurbiltzea, trunkatuz edo biribilduz.', 'Aproximar un número hasta un orden dado, truncando o redondeando.', 'تقريب عدد حتى منزلة معينة بالبتر أو بالتدوير.', 'Approximate a number to a given place, by truncating or by rounding.'),
        explanation: say(
            'Gutxiagozko hurbilketa zenbakia baino txikiagoa da, eta gehiagozkoa handiagoa. Trunkatzeak ordenatik aurrerako zifrak kentzen ditu (zenbaki positiboetan, gutxiagozkoa da). Biribiltzean, kentzen den lehen zifra 5 edo handiagoa bada, aurreko zifrari 1 gehitzen zaio; bestela, trunkatzea bezala geratzen da. Horrela, biribiltzeak hurbilketarik onena ematen du. Kontuz bederatziekin: $1{,}\\overline{9}$ ehunenetara biribilduta $2{,}00$ da.',
            'Una aproximación por defecto es menor que el número, y por exceso, mayor. Truncar suprime las cifras a partir del orden (en los positivos, es una aproximación por defecto). Al redondear, si la primera cifra suprimida es 5 o mayor, se suma 1 a la cifra anterior; si no, queda como al truncar. Así el redondeo da la mejor aproximación. Cuidado con los nueves: $1{,}\\overline{9}$ redondeado a las centésimas es $2{,}00$.',
            'التقريب بالنقصان أصغر من العدد، وبالزيادة أكبر منه. البتر يحذف الأرقام بعد المنزلة (وهو في الأعداد الموجبة تقريب بالنقصان). وعند التدوير إذا كان أول رقم محذوف 5 أو أكثر أضفنا 1 إلى الرقم السابق، وإلا بقي كالبتر. وهكذا يعطي التدوير أفضل تقريب. انتبه إلى التسعات: $1{,}\\overline{9}$ مدوّرًا إلى الأجزاء من مئة هو $2{,}00$.', 'A lower approximation is smaller than the number, and an upper approximation is bigger. Truncating removes the digits from that place onwards (for positive numbers, it is a lower approximation). When rounding, if the first digit removed is 5 or more, add 1 to the previous digit; if not, the result is the same as when truncating. That is why rounding gives the best approximation. Be careful with nines: $1{,}\\overline{9}$ rounded to the hundredths is $2{,}00$.'
        ),
        problem: say('Hurbildu $\\frac{11}{9}=1{,}2222\\ldots$ ehunenetara, gutxiagoz eta gehiagoz. Zein da biribiltzea?', 'Aproxima $\\frac{11}{9}=1{,}2222\\ldots$ a las centésimas por defecto y por exceso. ¿Cuál es el redondeo?', 'قرّب $\\frac{11}{9}=1{,}2222\\ldots$ إلى الأجزاء من مئة بالنقصان وبالزيادة. ما التدوير؟', 'Find the lower and upper approximations of $\\frac{11}{9}=1{,}2222\\ldots$ to the hundredths. What is the rounded value?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gutxiagoz (trunkatuta).', 'Por defecto (truncando).', 'بالنقصان (بالبتر).', 'Lower approximation (truncating).'), math: same('$1{,}22$') },
            { text: say('Gehiagoz.', 'Por exceso.', 'بالزيادة.', 'Upper approximation.'), math: same('$1{,}23$') },
            { text: say('Kentzen den lehen zifra 2 da (< 5).', 'La primera cifra suprimida es 2 (< 5).', 'أول رقم محذوف هو 2 (< 5).', 'The first digit removed is 2 (< 5).'), math: same('$1{,}2222\\ldots\\approx 1{,}22$') }
        ],
        example: same('$4{,}7569\\approx 4{,}76\\qquad 0{,}1\\overline{21}\\approx 0{,}12$'),
        takeaway: say('Biribildu: hurbilena. Lehen zifra kendua ≥ 5 bada, gora.', 'Redondear: el más cercano. Si la primera cifra suprimida es ≥ 5, hacia arriba.', 'التدوير: الأقرب. إذا كان أول رقم محذوف ≥ 5 فإلى الأعلى.', 'Rounding: to the nearest. If the first digit removed is ≥ 5, round up.'),
        figure: (language) => <DefectExcessFigure language={language} />
    },
    {
        id: 'errors',
        stage: 'approx',
        title: say('Errore absolutua eta erlatiboa', 'Error absoluto y relativo', 'الخطأ المطلق والنسبي', 'Absolute and relative error'),
        goal: say('Hurbilketa baten erroreak kalkulatzea eta hurbilketak konparatzea.', 'Calcular los errores de una aproximación y comparar aproximaciones.', 'حساب أخطاء تقريب ومقارنة التقريبات.', 'Calculate the errors of an approximation and compare approximations.'),
        explanation: say(
            'Errore absolutua benetako balioaren eta hurbilketaren arteko diferentzia da, balio absolutuan: $E_a=|x-x\'|$. Errore erlatiboa errore absolutua zati benetako balioa da: $E_r=\\frac{E_a}{|x|}$, eta askotan ehunekotan ematen da. Erlatiboak hurbilketa baten kalitatea neurtzen du: zenbat eta txikiagoa, orduan eta hobea. Benetako balioa ezagutzen ez denean, errore-bornea erabiltzen da: biribiltzean, errore absolutua ez da inoiz azken ordenaren unitate erdia baino handiagoa.',
            'El error absoluto es la diferencia entre el valor real y la aproximación, en valor absoluto: $E_a=|x-x\'|$. El error relativo es el error absoluto dividido entre el valor real: $E_r=\\frac{E_a}{|x|}$, y a menudo se da en tanto por ciento. El relativo mide la calidad de una aproximación: cuanto menor, mejor. Cuando no se conoce el valor real se usa una cota de error: al redondear, el error absoluto nunca supera media unidad del último orden.',
            'الخطأ المطلق هو الفرق بين القيمة الحقيقية والتقريب بالقيمة المطلقة: $E_a=|x-x\'|$. والخطأ النسبي هو الخطأ المطلق مقسومًا على القيمة الحقيقية: $E_r=\\frac{E_a}{|x|}$، وكثيرًا ما يُعطى نسبة مئوية. يقيس الخطأ النسبي جودة التقريب: كلما صغر كان أفضل. وعندما لا تُعرف القيمة الحقيقية نستعمل حدّ الخطأ: عند التدوير لا يتجاوز الخطأ المطلق نصف وحدة آخر منزلة.', 'The absolute error is the difference between the true value and the approximation, always taken as a positive number: $E_a=|x-x\'|$. The relative error is the absolute error divided by the true value: $E_r=\\frac{E_a}{|x|}$, and it is often given as a percentage. The relative error measures how good an approximation is: the smaller, the better. When the true value is not known, an error bound is used: when rounding, the absolute error is never more than half a unit in the last place.'
        ),
        problem: say('$1{,}468$ zenbakirako, zein da hobea: $1{,}5$ ala $1{,}4$?', 'Para $1{,}468$, ¿qué aproximación es mejor: $1{,}5$ o $1{,}4$?', 'للعدد $1{,}468$ أي تقريب أفضل: $1{,}5$ أم $1{,}4$؟', 'For $1{,}468$, which approximation is better: $1{,}5$ or $1{,}4$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$1{,}5$ hartuta.', 'Tomando $1{,}5$.', 'بأخذ $1{,}5$.', 'Using $1{,}5$.'), math: same('$E_a=|1{,}468-1{,}5|=0{,}032\\qquad E_r=\\frac{0{,}032}{1{,}468}=0{,}0218\\ldots$') },
            { text: say('$1{,}4$ hartuta.', 'Tomando $1{,}4$.', 'بأخذ $1{,}4$.', 'Using $1{,}4$.'), math: same('$E_a=|1{,}468-1{,}4|=0{,}068\\qquad E_r=0{,}0463\\ldots$') },
            { text: say('Errore txikiagoak: $1{,}5$ da hobea.', 'Errores menores: es mejor $1{,}5$.', 'أخطاء أصغر: $1{,}5$ أفضل.', 'Smaller error: $1{,}5$ is better.'), math: same('$0{,}032<0{,}068$') }
        ],
        example: same('$\\frac{17}{3}=5{,}\\overline{6}\\approx 5{,}7\\qquad E_a=0{,}0\\overline{3}$'),
        takeaway: say('Absolutua: zenbat huts egin den. Erlatiboa: hutsegitea benetako balioarekiko.', 'Absoluto: cuánto nos equivocamos. Relativo: el error respecto al valor real.', 'المطلق: مقدار الخطأ. النسبي: الخطأ بالنسبة إلى القيمة الحقيقية.', 'Absolute: how far off we are. Relative: the error compared with the true value.'),
        figure: (language) => <ErrorsFigure language={language} />
    },
    {
        id: 'percent-basics',
        stage: 'percent',
        title: say('Ehunekoak', 'Porcentajes', 'النسب المئوية', 'Percentages'),
        goal: say('Kantitate baten ehunekoa kalkulatzea eta zati batek zer ehuneko adierazten duen jakitea.', 'Calcular el tanto por ciento de una cantidad y saber qué porcentaje representa una parte.', 'حساب نسبة مئوية من كمية ومعرفة ما تمثله جزء من نسبة.', 'Calculate the percentage of an amount and find what percentage a part represents.'),
        explanation: say(
            'Ehunekoa izendatzailea 100 duen zatikia da: $p\\,\\%=\\frac{p}{100}$. Kantitate baten % $p$ kalkulatzeko, biderkatu kantitatea $\\frac{p}{100}$-z edo zenbaki hamartarraz: 220ren % 16 $0{,}16\\cdot 220=35{,}2$ da. Zati batek osoaren zer ehuneko adierazten duen jakiteko, zatitu zatia osoaz eta biderkatu 100ez: $\\frac{6}{24}=0{,}25\\to$ % 25. Ehuneko baten ehunekoa ehunekoak biderkatuz kalkulatzen da.',
            'Un porcentaje es una fracción de denominador 100: $p\\,\\%=\\frac{p}{100}$. Para calcular el $p\\,\\%$ de una cantidad, multiplica la cantidad por $\\frac{p}{100}$ o por su decimal: el 16 % de 220 es $0{,}16\\cdot 220=35{,}2$. Para saber qué porcentaje representa una parte del total, divide la parte entre el total y multiplica por 100: $\\frac{6}{24}=0{,}25\\to 25\\,\\%$. El porcentaje de un porcentaje se calcula multiplicando los porcentajes.',
            'النسبة المئوية كسر مقامه 100: $p\\,\\%=\\frac{p}{100}$. لحساب $p\\,\\%$ من كمية اضرب الكمية في $\\frac{p}{100}$ أو في العدد العشري: 16 % من 220 هي $0{,}16\\cdot 220=35{,}2$. ولمعرفة النسبة التي يمثلها جزء من الكل اقسم الجزء على الكل واضرب في 100: $\\frac{6}{24}=0{,}25\\to 25\\,\\%$. ونسبة النسبة تُحسب بضرب النسبتين.', 'A percentage is a fraction with a denominator of 100: $p\\,\\%=\\frac{p}{100}$. To work out $p\\,\\%$ of an amount, multiply the amount by $\\frac{p}{100}$ or by its decimal: 16% of 220 is $0{,}16\\cdot 220=35{,}2$. To find what percentage one part is of the total, divide the part by the total and multiply by 100: $\\frac{6}{24}=0{,}25\\to 25\\,\\%$. A percentage of a percentage is found by multiplying the percentages.'
        ),
        problem: say('Kalkulatu 1575en % 115aren % 12.', 'Calcula el 12 % del 115 % de 1575.', 'احسب 12 % من 115 % من 1575.', 'Work out 12% of 115% of 1,575.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi ehunekoak hamartar gisa.', 'Escribe los porcentajes como decimales.', 'اكتب النسبتين عشريتين.', 'Write the percentages as decimals.'), math: same('$12\\,\\%=0{,}12\\qquad 115\\,\\%=1{,}15$') },
            { text: say('Biderkatu dena.', 'Multiplica todo.', 'اضرب الكل.', 'Multiply everything.'), math: same('$0{,}12\\cdot 1{,}15\\cdot 1575=217{,}35$') }
        ],
        example: same('$0{,}085\\cdot 48=4{,}08\\ \\to\\ 8{,}5\\,\\%$'),
        takeaway: say('% $p$ kalkulatzeko, biderkatu $\\frac{p}{100}$-z. Zer % den jakiteko, zatitu eta bider 100.', 'Para el $p\\,\\%$, multiplica por $\\frac{p}{100}$. Para saber qué % es, divide y multiplica por 100.', 'لحساب $p\\,\\%$ اضرب في $\\frac{p}{100}$. ولمعرفة النسبة اقسم واضرب في 100.', 'For $p\\,\\%$, multiply by $\\frac{p}{100}$. To find what percentage it is, divide and multiply by 100.'),
        figure: (language) => <PercentFigure language={language} />
    },
    {
        id: 'percent-change',
        stage: 'percent',
        title: say('Ehuneko igoerak eta jaitsierak', 'Aumentos y disminuciones porcentuales', 'الزيادة والنقصان بالنسبة المئوية', 'Percentage increases and decreases'),
        goal: say('Aldakuntza-indizea erabiltzea kantitate bat ehuneko batean igo edo jaisteko.', 'Usar el índice de variación para aumentar o disminuir una cantidad en un porcentaje.', 'استعمال مؤشر التغير لزيادة كمية أو إنقاصها بنسبة مئوية.', 'Use the multiplier to increase or decrease an amount by a percentage.'),
        explanation: say(
            'Kantitate bat % $p$ igotzean, amaierakoa hasierakoaren $(100+p)\\,\\%$ da; jaistean, $(100-p)\\,\\%$. Hamartar gisa idatzita, aldakuntza-indizea lortzen da: igoeretan $1+\\frac{p}{100}$ eta jaitsieretan $1-\\frac{p}{100}$. Amaierako kantitatea = hasierakoa · indizea. Adibidez, % 21 BEZ: bider 1,21; % 15eko deskontua: bider 0,85. Indizea 1 baino handiagoa bada, igoera da; txikiagoa bada, jaitsiera.',
            'Al aumentar una cantidad un $p\\,\\%$, la final es el $(100+p)\\,\\%$ de la inicial; al disminuirla, el $(100-p)\\,\\%$. Escrito como decimal, se obtiene el índice de variación: $1+\\frac{p}{100}$ en los aumentos y $1-\\frac{p}{100}$ en las disminuciones. Cantidad final = cantidad inicial · índice. Por ejemplo, el 21 % de IVA: por 1,21; un descuento del 15 %: por 0,85. Si el índice es mayor que 1, es un aumento; si es menor, una disminución.',
            'عند زيادة كمية بنسبة $p\\,\\%$ تكون النهائية $(100+p)\\,\\%$ من الأولية، وعند إنقاصها $(100-p)\\,\\%$. وبكتابتها عددًا عشريًا نحصل على مؤشر التغير: $1+\\frac{p}{100}$ في الزيادة و$1-\\frac{p}{100}$ في النقصان. الكمية النهائية = الأولية · المؤشر. مثلًا ضريبة 21 %: الضرب في 1.21؛ وخصم 15 %: الضرب في 0.85. إذا كان المؤشر أكبر من 1 فهي زيادة، وإذا كان أصغر فهو نقصان.', 'When an amount increases by $p\\,\\%$, the final amount is $(100+p)\\,\\%$ of the starting amount. When it decreases, it is $(100-p)\\,\\%$ of the starting amount. Written as a decimal, this gives the multiplier: $1+\\frac{p}{100}$ for increases and $1-\\frac{p}{100}$ for decreases. Final amount = starting amount · multiplier. For example, 21% VAT: multiply by 1.21; a 15% discount: multiply by 0.85. If the multiplier is greater than 1, it is an increase; if it is less than 1, it is a decrease.'
        ),
        problem: say('94 € balio duen jaka bat % 15 merkatu dute. Zenbat balio du orain?', 'Una chaqueta de 94 € se rebaja un 15 %. ¿Cuánto cuesta ahora?', 'سترة ثمنها 94 € خُفّض سعرها 15 %. كم ثمنها الآن؟', 'A jacket costing €94 is reduced by 15%. How much does it cost now?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizea: % 15 gutxiago.', 'Índice: un 15 % menos.', 'المؤشر: أقل بـ 15 %.', 'Multiplier: 15% less.'), math: same('$1-0{,}15=0{,}85$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$94\\cdot 0{,}85=79{,}9$') }
        ],
        example: same('$1{,}105\\ \\to\\ +10{,}5\\,\\%\\qquad 0{,}875\\ \\to\\ -12{,}5\\,\\%$'),
        takeaway: say('Igo % $p$: bider $1+\\frac{p}{100}$. Jaitsi % $p$: bider $1-\\frac{p}{100}$.', 'Aumentar un $p\\,\\%$: por $1+\\frac{p}{100}$. Disminuir un $p\\,\\%$: por $1-\\frac{p}{100}$.', 'الزيادة $p\\,\\%$: الضرب في $1+\\frac{p}{100}$. والنقصان: في $1-\\frac{p}{100}$.', 'Increase by $p\\,\\%$: multiply by $1+\\frac{p}{100}$. Decrease by $p\\,\\%$: multiply by $1-\\frac{p}{100}$.'),
        figure: (language) => <PercentChangeFigure language={language} />
    },
    {
        id: 'chained',
        stage: 'percent',
        title: say('Ehuneko kateatuak', 'Porcentajes encadenados', 'النسب المئوية المتسلسلة', 'Chained percentages'),
        goal: say('Bata bestearen atzetik egiten diren ehuneko aldaketak indize bakarrean biltzea.', 'Reunir en un solo índice varias variaciones porcentuales seguidas.', 'جمع عدة تغيرات مئوية متتالية في مؤشر واحد.', 'Combine several successive percentage changes into one multiplier.'),
        explanation: say(
            'Kantitate bati ehuneko aldaketa bat baino gehiago egiten zaizkionean, bakoitza aurrekoaren emaitzaren gainean aplikatzen da. Horregatik, indizeak biderkatzen dira, ez ehunekoak batu: $I=I_1\\cdot I_2\\cdots$ % 30 igo eta % 15 jaitsi: $1{,}3\\cdot 0{,}85=1{,}105$, hau da, % 10,5 igo, ez % 15. Bi aldiz % 30 igotzea ez da % 60 igotzea: $1{,}3^{2}=1{,}69$, % 69.',
            'Cuando a una cantidad se le aplican varias variaciones porcentuales seguidas, cada una se aplica sobre el resultado de la anterior. Por eso los índices se multiplican, no se suman los porcentajes: $I=I_1\\cdot I_2\\cdots$ Subir un 30 % y bajar un 15 %: $1{,}3\\cdot 0{,}85=1{,}105$, es decir, sube un 10,5 %, no un 15 %. Subir dos veces un 30 % no es subir un 60 %: $1{,}3^{2}=1{,}69$, un 69 %.',
            'عندما نطبق على كمية عدة تغيرات مئوية متتالية يُطبَّق كل منها على نتيجة السابق. لذلك تُضرب المؤشرات ولا تُجمع النسب: $I=I_1\\cdot I_2\\cdots$ الزيادة 30 % ثم النقصان 15 %: $1{,}3\\cdot 0{,}85=1{,}105$ أي زيادة 10.5 % وليس 15 %. والزيادة 30 % مرتين ليست زيادة 60 %: $1{,}3^{2}=1{,}69$ أي 69 %.', 'When several percentage changes are made to an amount one after another, each one is applied to the result of the one before. That is why the multipliers are multiplied, not the percentages added: $I=I_1\\cdot I_2\\cdots$ Increase by 30% and then decrease by 15%: $1{,}3\\cdot 0{,}85=1{,}105$, which is an increase of 10.5%, not 15%. Increasing by 30% twice is not an increase of 60%: $1{,}3^{2}=1{,}69$, a 69% increase.'
        ),
        problem: say('18 000 €-ko auto bati % 20ko deskontua egin diote eta gero % 21 BEZ gehitu. Zenbat ordaindu da?', 'A un coche de 18 000 € le hacen un descuento del 20 % y después le añaden el 21 % de IVA. ¿Cuánto se ha pagado?', 'سيارة ثمنها 18 000 € حصلت على خصم 20 % ثم أضيفت ضريبة 21 %. كم دُفع؟', 'A car costing €18,000 gets a 20% discount, and then 21% VAT is added. How much has been paid?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizeak.', 'Los índices.', 'المؤشرات.', 'The multipliers.'), math: same('$0{,}80\\qquad 1{,}21$') },
            { text: say('Indize osoa.', 'El índice total.', 'المؤشر الكلي.', 'The total multiplier.'), math: same('$0{,}80\\cdot 1{,}21=0{,}968$') },
            { text: say('Amaierako prezioa.', 'El precio final.', 'السعر النهائي.', 'The final price.'), math: same('$18\\,000\\cdot 0{,}968=17\\,424$') }
        ],
        example: same('$1{,}16\\cdot 0{,}40=0{,}464\\ \\to\\ 46{,}4\\,\\%$'),
        takeaway: say('Kateatutako ehunekoak: biderkatu indizeak. Ez batu ehunekoak.', 'Porcentajes encadenados: multiplica los índices. No sumes los porcentajes.', 'النسب المتسلسلة: اضرب المؤشرات. لا تجمع النسب.', 'Successive changes: multiply the multipliers. Do not add the percentages.'),
        figure: (language) => <ChainedFigure language={language} />
    },
    {
        id: 'percent-inverse',
        stage: 'percent',
        title: say('Hasierako kantitatea aurkitu', 'Calcular la cantidad inicial', 'إيجاد الكمية الأولية', 'Calculate the starting amount'),
        goal: say('Amaierako kantitatetik eta ehunekotik abiatuta hasierako kantitatea kalkulatzea.', 'Calcular la cantidad inicial a partir de la final y del porcentaje.', 'حساب الكمية الأولية انطلاقًا من النهائية والنسبة.', 'Calculate the starting amount from the final amount and the percentage.'),
        explanation: say(
            'Amaierako kantitatea eta aldaketak ezagutzen badira, hasierakoa ekuazio batekin aurkitzen da: $C\\cdot I=C_f$, beraz, $C=\\frac{C_f}{I}$. Hau da, zatitu indizeaz. Akats ohikoa: amaierako kantitateari ehunekoa kentzea edo gehitzea; ehunekoa hasierako kantitatearen gainean kalkulatu zen, ez amaierakoaren gainean. Hasierara itzultzeko ehunekoa ere ez da berdina: % 10 igo ondoren, % 9,09 jaitsi behar da ($\\frac{1}{1{,}1}=0{,}909\\ldots$).',
            'Si se conocen la cantidad final y las variaciones, la inicial se halla con una ecuación: $C\\cdot I=C_f$, así que $C=\\frac{C_f}{I}$. Es decir, divide entre el índice. Error típico: restar o sumar el porcentaje a la cantidad final; el porcentaje se calculó sobre la cantidad inicial, no sobre la final. El porcentaje para volver al principio tampoco es el mismo: tras subir un 10 %, hay que bajar un 9,09 % ($\\frac{1}{1{,}1}=0{,}909\\ldots$).',
            'إذا عُرفت الكمية النهائية والتغيرات نجد الأولية بمعادلة: $C\\cdot I=C_f$ إذن $C=\\frac{C_f}{I}$، أي نقسم على المؤشر. خطأ شائع: طرح النسبة من الكمية النهائية أو إضافتها إليها؛ فالنسبة حُسبت على الكمية الأولية لا على النهائية. ونسبة العودة إلى البداية ليست نفسها: بعد زيادة 10 % يلزم نقصان 9.09 % ($\\frac{1}{1{,}1}=0{,}909\\ldots$).', 'If the final amount and the changes are known, the starting amount is found with an equation: $C\\cdot I=C_f$, so $C=\\frac{C_f}{I}$. In other words, divide by the multiplier. Common mistake: subtracting or adding the percentage to the final amount. The percentage was worked out on the starting amount, not on the final amount. The percentage needed to get back to the start is not the same either: after going up by 10%, you need to go down by 9.09% ($\\frac{1}{1{,}1}=0{,}909\\ldots$).'
        ),
        problem: say('Heriotza-tasa % 12,5 jaitsi da eta aurten 98 pertsona hil dira. Zenbat hil ziren iaz?', 'La mortalidad ha descendido un 12,5 % y este año han muerto 98 personas. ¿Cuántas murieron el año pasado?', 'انخفضت الوفيات 12.5 % وتوفي هذا العام 98 شخصًا. كم توفي العام الماضي؟', 'Mortality has fallen by 12.5%, and this year 98 people have died. How many died last year?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizea: % 12,5 gutxiago.', 'Índice: un 12,5 % menos.', 'المؤشر: أقل بـ 12.5 %.', 'Multiplier: 12.5% less.'), math: same('$1-0{,}125=0{,}875$') },
            { text: say('Ekuazioa.', 'La ecuación.', 'المعادلة.', 'The equation.'), math: same('$0{,}875\\cdot C=98$') },
            { text: say('Zatitu indizeaz.', 'Divide entre el índice.', 'اقسم على المؤشر.', 'Divide by the multiplier.'), math: same('$C=98:0{,}875=112$') }
        ],
        example: same('$0{,}75\\cdot 0{,}70\\cdot C=125\\ \\to\\ C=\\frac{125}{0{,}525}\\approx 238{,}10$'),
        takeaway: say('Hasierakoa = amaierakoa : indizea.', 'Inicial = final : índice.', 'الأولية = النهائية : المؤشر.', 'Initial = final : multiplier.'),
        figure: (language) => <InverseFigure language={language} />
    },
    {
        id: 'simple-interest',
        stage: 'interest',
        title: say('Interes sinplea', 'Interés simple', 'الفائدة البسيطة', 'Simple interest'),
        goal: say('Interes sinplea kalkulatzea, eta haren formulatik kapitala, interes-tasa edo denbora askatzea.', 'Calcular el interés simple y despejar de su fórmula el capital, el rédito o el tiempo.', 'حساب الفائدة البسيطة وعزل رأس المال أو المعدل أو الزمن من صيغتها.', 'Calculate simple interest and solve its formula for the principal, the interest rate or the time.'),
        explanation: say(
            'Kapital bat ($C$) bankuan uzten denean, bankuak interes bat ($I$) ordaintzen du, urteko % $r$ (errendimendua). Interes sinplean, interesak ez dira kapitalari gehitzen: urtero interes bera jasotzen da. $I=\\frac{C\\cdot r\\cdot t}{100}$, $t$ urtetan. Denbora hilabetetan badago, $t=\\frac{\\text{hilabeteak}}{12}$. Amaieran, $C_f=C+I$. Formulatik edozein datu aska daiteke: $C=\\frac{100\\cdot I}{r\\cdot t}$ edo $r=\\frac{100\\cdot I}{C\\cdot t}$.',
            'Cuando se deja un capital ($C$) en el banco, el banco paga un interés ($I$) a un rédito del $r\\,\\%$ anual. En el interés simple los intereses no se suman al capital: cada año se cobra el mismo interés. $I=\\frac{C\\cdot r\\cdot t}{100}$, con $t$ en años. Si el tiempo está en meses, $t=\\frac{\\text{meses}}{12}$. Al final, $C_f=C+I$. De la fórmula se puede despejar cualquier dato: $C=\\frac{100\\cdot I}{r\\cdot t}$ o $r=\\frac{100\\cdot I}{C\\cdot t}$.',
            'عند إيداع رأس مال ($C$) في المصرف يدفع المصرف فائدة ($I$) بمعدل $r\\,\\%$ سنويًا. في الفائدة البسيطة لا تُضاف الفوائد إلى رأس المال: نحصل على الفائدة نفسها كل عام. $I=\\frac{C\\cdot r\\cdot t}{100}$ و$t$ بالأعوام. وإذا كان الزمن $m$ شهرًا فإن $t=\\frac{m}{12}$. وفي النهاية $C_f=C+I$. ويمكن عزل أي معطى من الصيغة: $C=\\frac{100\\cdot I}{r\\cdot t}$ أو $r=\\frac{100\\cdot I}{C\\cdot t}$.', 'When a principal ($C$) is left in the bank, the bank pays interest ($I$) at an annual interest rate of $r\\,\\%$. With simple interest, the interest is not added to the principal: the same amount of interest is earned each year. $I=\\frac{C\\cdot r\\cdot t}{100}$, with $t$ in years. If the time is in months, $t=\\frac{\\text{months}}{12}$. At the end, $C_f=C+I$. You can solve the formula for any value: $C=\\frac{100\\cdot I}{r\\cdot t}$ or $r=\\frac{100\\cdot I}{C\\cdot t}$.'
        ),
        problem: say('4500 € uzten ditugu % 3an 8 hilabetez. Zenbat jasoko dugu?', 'Ingresamos 4500 € al 3 % durante 8 meses. ¿Cuánto recibiremos?', 'نودع 4500 € بنسبة 3 % لمدة 8 أشهر. كم سنستلم؟', 'We deposit €4,500 at 3% for 8 months. How much will we receive?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Denbora urtetan.', 'El tiempo en años.', 'الزمن بالأعوام.', 'The time in years.'), math: same('$t=\\frac{8}{12}$') },
            { text: say('Interesa.', 'El interés.', 'الفائدة.', 'The interest.'), math: same('$I=\\frac{4500\\cdot 3\\cdot\\frac{8}{12}}{100}=90$') },
            { text: say('Amaierako kapitala.', 'El capital final.', 'رأس المال النهائي.', 'The final amount.'), math: same('$4500+90=4590$') }
        ],
        example: same('$2400=\\frac{20\\,000\\cdot r\\cdot 3}{100}\\ \\to\\ r=4\\,\\%$'),
        takeaway: say('Interes sinplea: $I=\\frac{C\\cdot r\\cdot t}{100}$; urtero interes bera.', 'Interés simple: $I=\\frac{C\\cdot r\\cdot t}{100}$; cada año el mismo interés.', 'الفائدة البسيطة: $I=\\frac{C\\cdot r\\cdot t}{100}$؛ الفائدة نفسها كل عام.', 'Simple interest: $I=\\frac{C\\cdot r\\cdot t}{100}$; the same interest each year.'),
        figure: (language) => <SimpleInterestFigure language={language} />
    },
    {
        id: 'compound-interest',
        stage: 'interest',
        title: say('Interes konposatua', 'Interés compuesto', 'الفائدة المركبة', 'Compound interest'),
        goal: say('Interes konposatuko kapitala kalkulatzea, ehuneko kateatu gisa.', 'Calcular el capital final con interés compuesto, como porcentajes encadenados.', 'حساب رأس المال النهائي بالفائدة المركبة كنسب متسلسلة.', 'Calculate the final amount with compound interest, as successive percentage changes.'),
        explanation: say(
            'Interes konposatuan, urte bakoitzaren amaieran interesak kapitalari gehitzen zaizkio, eta hurrengo urtean kapital berri horrek sortzen ditu interesak. Urtero kapitala $1+\\frac{r}{100}$ indizeaz biderkatzen da: % $r$-ko igoera kateatuak dira. Beraz, $t$ urteren ondoren: $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$. Interesak $I=C_f-C_i$ dira. Diruz ari garenez, biribildu zentimoetara.',
            'En el interés compuesto, al final de cada año los intereses se suman al capital, y al año siguiente ese capital nuevo genera intereses. Cada año el capital se multiplica por el índice $1+\\frac{r}{100}$: son aumentos encadenados del $r\\,\\%$. Por tanto, después de $t$ años: $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$. Los intereses son $I=C_f-C_i$. Como es dinero, redondea a los céntimos.',
            'في الفائدة المركبة تُضاف الفوائد في نهاية كل عام إلى رأس المال، وفي العام التالي يولّد رأس المال الجديد فوائد. كل عام يُضرب رأس المال في المؤشر $1+\\frac{r}{100}$: إنها زيادات متسلسلة بنسبة $r\\,\\%$. إذن بعد $t$ أعوام: $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$. والفوائد $I=C_f-C_i$. ولأنه مال نقرّب إلى السنت.', 'With compound interest, at the end of each year the interest is added to the principal, and the next year this new principal earns interest. Each year the principal is multiplied by the multiplier $1+\\frac{r}{100}$: these are successive increases of $r\\,\\%$. So, after $t$ years: $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$. The interest is $I=C_f-C_i$. As it is money, round to the nearest cent.'
        ),
        problem: say('600 € % 3,4an 5 urtez, interes konposatuan. Zenbat izango dira?', '600 € al 3,4 % durante 5 años, a interés compuesto. ¿En cuánto se convierten?', '600 € بنسبة 3.4 % لمدة 5 أعوام بفائدة مركبة. كم تصبح؟', '€600 at 3.4% for 5 years, with compound interest. How much will it be worth?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizea urteko.', 'Índice anual.', 'المؤشر السنوي.', 'Annual multiplier.'), math: same('$1+\\frac{3{,}4}{100}=1{,}034$') },
            { text: say('Bost urte: bost aldiz.', 'Cinco años: cinco veces.', 'خمسة أعوام: خمس مرات.', 'Five years: five times.'), math: same('$C_f=600\\cdot 1{,}034^{5}$') },
            { text: say('Biribildu zentimoetara.', 'Redondea a los céntimos.', 'قرّب إلى السنت.', 'Round to the nearest cent.'), math: same('$C_f\\approx 709{,}18$') }
        ],
        example: same('$1000\\cdot 1{,}02^{5}\\approx 1104{,}08\\qquad I\\approx 104{,}08$'),
        takeaway: say('Interes konposatua: $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$.', 'Interés compuesto: $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$.', 'الفائدة المركبة: $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$.', 'Compound interest: $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$.'),
        figure: (language) => <CompoundInterestFigure language={language} />
    },
    {
        id: 'interest-compare',
        stage: 'interest',
        title: say('Sinplea ala konposatua?', '¿Simple o compuesto?', 'بسيطة أم مركبة؟', 'Simple or compound?'),
        goal: say('Bi interes motak konparatzea eta kapitala edo epea aurkitzea.', 'Comparar los dos tipos de interés y hallar el capital o el plazo.', 'مقارنة نوعي الفائدة وإيجاد رأس المال أو المدة.', 'Compare the two types of interest and find the principal or the time period.'),
        explanation: say(
            'Urte baten ondoren bi interesek gauza bera ematen dute. Gero, konposatuak gehiago ematen du, interesek ere interesak sortzen dituztelako: sinplean kapitala zuzen batean hazten da (batuz) eta konposatuan kurba batean (biderkatuz). Hasierako kapitala aurkitzeko, zatitu: $C_i=\\frac{C_f}{\\left(1+\\frac{r}{100}\\right)^{t}}$. Inbertsio-aldia amaitu aurretik dirua ateratzen bada, aldi osoek interes konposatua dute, eta azken zatiak, interes sinplea.',
            'Al cabo de un año los dos intereses dan lo mismo. Después, el compuesto da más, porque los intereses también generan intereses: en el simple el capital crece en línea recta (sumando) y en el compuesto en una curva (multiplicando). Para hallar el capital inicial, divide: $C_i=\\frac{C_f}{\\left(1+\\frac{r}{100}\\right)^{t}}$. Si se saca el dinero antes de que acabe un periodo de inversión, los periodos completos llevan interés compuesto y el trozo final, interés simple.',
            'بعد عام واحد تعطي الفائدتان القدر نفسه. ثم تعطي المركبة أكثر لأن الفوائد تولّد بدورها فوائد: في البسيطة ينمو رأس المال على خط مستقيم (بالجمع) وفي المركبة على منحنى (بالضرب). ولإيجاد رأس المال الأولي نقسم: $C_i=\\frac{C_f}{\\left(1+\\frac{r}{100}\\right)^{t}}$. وإذا سُحب المال قبل نهاية فترة الاستثمار فإن الفترات الكاملة تأخذ فائدة مركبة والجزء الأخير فائدة بسيطة.', 'After one year, the two types of interest give the same amount. After that, compound interest gives more, because the interest also earns interest: with simple interest the principal grows in a straight line (by adding), and with compound interest it grows along a curve (by multiplying). To find the starting principal, divide: $C_i=\\frac{C_f}{\\left(1+\\frac{r}{100}\\right)^{t}}$. If the money is taken out before an investment period ends, the complete periods earn compound interest and the last part earns simple interest.'
        ),
        problem: say('Fernandok 1000 € uzten ditu % 2an 5 urtez interes konposatuan, eta Estherrek gauza bera interes sinplean. Zenbat irabazten du gehiago Fernandok?', 'Fernando deja 1000 € al 2 % durante 5 años a interés compuesto y Esther lo mismo a interés simple. ¿Cuánto gana Fernando de más?', 'يودع فرناندو 1000 € بنسبة 2 % لمدة 5 أعوام بفائدة مركبة وتودع إستير المبلغ نفسه بفائدة بسيطة. كم يربح فرناندو أكثر منها؟', 'Fernando deposits €1,000 at 2% for 5 years with compound interest, and Esther does the same with simple interest. How much more does Fernando earn?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Fernando (konposatua).', 'Fernando (compuesto).', 'فرناندو (مركبة).', 'Fernando (compound).'), math: same('$1000\\cdot 1{,}02^{5}\\approx 1104{,}08\\ \\to\\ 104{,}08$') },
            { text: say('Esther (sinplea).', 'Esther (simple).', 'إستير (بسيطة).', 'Esther (simple).'), math: same('$I=\\frac{1000\\cdot 2\\cdot 5}{100}=100$') },
            { text: say('Diferentzia.', 'La diferencia.', 'الفرق.', 'The difference.'), math: same('$104{,}08-100=4{,}08$') }
        ],
        example: same('$C_i\\cdot 1{,}05^{3}=C_i+1576{,}25\\ \\to\\ C_i=10\\,000$'),
        takeaway: say('Sinplea: batu (zuzena). Konposatua: biderkatu (kurba). Epe luzean, konposatuak irabazten du.', 'Simple: sumar (recta). Compuesto: multiplicar (curva). A largo plazo gana el compuesto.', 'البسيطة: جمع (خط مستقيم). المركبة: ضرب (منحنى). وعلى المدى الطويل تربح المركبة.', 'Simple: add (straight line). Compound: multiply (curve). In the long run, compound interest wins.'),
        figure: (language) => <InterestCompareFigure language={language} />
    }
]

/** The same formula in every language (decimal point in Arabic) */
function same(value: string): LocalizedText {
    return { eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') }
}

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
import { realsPercentLessonChecks, type RealsPercentTopicId } from './lessonChecks'
import { realsPercentLessonTexts } from './lessonTexts'

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
    { id: 'reals', tone: 'violet', title: { eu: 'Irrazionalak eta zuzen erreala', es: 'Irracionales y recta real', en: 'Irrational numbers and the real number line', ar: 'غير النسبية والمستقيم الحقيقي' } },
    { id: 'approx', tone: 'mustard', title: { eu: 'Tarteak eta hurbilketak', es: 'Intervalos y aproximaciones', en: 'Intervals and approximations', ar: 'الفترات والتقريب' } },
    { id: 'percent', tone: 'coral', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' } },
    { id: 'interest', tone: 'green', title: { eu: 'Interes sinplea eta konposatua', es: 'Interés simple y compuesto', en: 'Simple and compound interest', ar: 'الفائدة البسيطة والمركبة' } }
]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'decimal-kinds',
        stage: 'rational',
        title: say('Arrazionalak eta adierazpen hamartarra', 'Racionales y expresión decimal', 'النسبية والصورة العشرية', 'Rational numbers and decimal form'),
        goal: say('Zatiki batek zer hamartar mota ematen duen jakitea: zehatza, periodiko hutsa ala mistoa.', 'Saber qué tipo de decimal da una fracción: exacto, periódico puro o periódico mixto.', 'معرفة نوع العدد العشري الذي يعطيه كسر: منتهٍ أو دوري بحت أو دوري مختلط.', 'Know what type of decimal a fraction gives: terminating, purely recurring or mixed recurring.'),
        needs: [
            { unit: 'dbh3/numeros-racionales', topic: 'decimal-kinds', title: { eu: 'Zatikiak eta zenbaki hamartarrak', es: 'Fracciones y números decimales', en: 'Fractions and decimal numbers', ar: 'الكسور والأعداد العشرية' } }
        ],
        problem: say('Zer motatakoak dira $\\frac{3}{40}$, $\\frac{11}{3}$ eta $\\frac{37}{15}$?', '¿De qué tipo son $\\frac{3}{40}$, $\\frac{11}{3}$ y $\\frac{37}{15}$?', 'ما نوع $\\frac{3}{40}$ و$\\frac{11}{3}$ و$\\frac{37}{15}$؟', 'What type of decimal are $\\frac{3}{40}$, $\\frac{11}{3}$ and $\\frac{37}{15}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$40=2^{3}\\cdot 5$: 2 eta 5 bakarrik → zehatza.', '$40=2^{3}\\cdot 5$: solo 2 y 5 → exacto.', '$40=2^{3}\\cdot 5$: فقط 2 و5 → منتهٍ.', '$40=2^{3}\\cdot 5$: only 2 and 5 → terminating.'), math: same('$\\frac{3}{40}=0{,}075$') },
            { text: say('3: ez 2, ez 5 → periodiko hutsa.', '3: ni 2 ni 5 → periódico puro.', '3: لا 2 ولا 5 → دوري بحت.', '3: neither 2 nor 5 → purely recurring.'), math: same('$\\frac{11}{3}=3{,}\\overline{6}$') },
            { text: say('$15=3\\cdot 5$: 5 eta beste faktore bat → mistoa.', '$15=3\\cdot 5$: 5 y otro factor → mixto.', '$15=3\\cdot 5$: 5 وعامل آخر → مختلط.', '$15=3\\cdot 5$: 5 and another factor → mixed recurring.'), math: same('$\\frac{37}{15}=2{,}4\\overline{6}$') }
        ],
        takeaway: say('Begiratu izendatzaile laburtezinari: 2 eta 5 bakarrik → zehatza; bestela, periodikoa.', 'Mira el denominador irreducible: solo 2 y 5 → exacto; si no, periódico.', 'انظر إلى المقام بعد الاختزال: 2 و5 فقط ← منتهٍ؛ وإلا فدوري.', 'Look at the denominator in its simplest form: only 2 and 5 → terminating; otherwise, recurring.'),
        figure: (language) => <DecimalKindsFigure language={language} />
    },
    {
        id: 'generatrix',
        stage: 'rational',
        title: say('Zatiki sortzailea', 'La fracción generatriz', 'الكسر المولّد', 'The generating fraction'),
        goal: say('Hamartar zehatz edo periodiko bat sortzen duen zatikia aurkitzea.', 'Encontrar la fracción que genera un decimal exacto o periódico.', 'إيجاد الكسر الذي يولّد عددًا عشريًا منتهيًا أو دوريًا.', 'Find the fraction that generates a terminating or recurring decimal.'),
        needs: [
            { unit: 'dbh3/numeros-racionales', topic: 'periodic-generatrix', title: { eu: 'Hamartar periodiko baten zatikia', es: 'La fracción de un decimal periódico', en: 'The fraction of a recurring decimal', ar: 'كسر العشري الدوري' } }
        ],
        problem: say('Aurkitu $5{,}2\\overline{31}$ zenbakiaren zatiki sortzailea.', 'Halla la fracción generatriz de $5{,}2\\overline{31}$.', 'جد الكسر المولّد للعدد $5{,}2\\overline{31}$.', 'Find the generating fraction of $5{,}2\\overline{31}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbaki osoa: 5231. Periodoaren aurretik: 52.', 'El número entero: 5231. Lo anterior al periodo: 52.', 'العدد كاملًا: 5231. ما قبل الدور: 52.', 'The number with no decimal point: 5231. The non-recurring part: 52.'), math: same('$5231-52=5179$') },
            { text: say('Periodoa: 2 zifra → 99; aurreperiodoa: zifra 1 → 0.', 'Periodo: 2 cifras → 99; anteperiodo: 1 cifra → 0.', 'الدور: رقمان ← 99؛ ما قبله: رقم واحد ← 0.', 'Recurring part: 2 digits → 99; non-recurring part: 1 digit → 0.'), math: same('$\\frac{5179}{990}$') },
            { text: say('Ezin da sinplifikatu (5179 ez da 2, 3, 5 edo 11 zenbakiaren multiploa).', 'No se puede simplificar (5179 no es múltiplo de 2, 3, 5 ni 11).', 'لا يمكن الاختزال (5179 ليس مضاعفًا لـ 2 أو 3 أو 5 أو 11).', 'It cannot be simplified (5179 is not a multiple of 2, 3, 5 or 11).'), math: same('$5{,}2\\overline{31}=\\frac{5179}{990}$') }
        ],
        takeaway: say('9 zifrak periodoarentzat, 0 zifrak aurreperiodoarentzat; zenbakitzailean, guztia ken periodoaren aurrekoa.', 'Nueves por el periodo, ceros por el anteperiodo; arriba, todo menos lo anterior al periodo.', 'تسعات للدور وأصفار لما قبله؛ وفي البسط الكل ناقص ما قبل الدور.', 'Nines for the recurring part, zeros for the non-recurring part; on top, everything except the non-recurring part.'),
        figure: (language) => <PeriodicFractionFigure language={language} />
    },
    {
        id: 'order-density',
        stage: 'rational',
        title: say('Arrazionalak ordenatu eta tartekatu', 'Ordenar e intercalar racionales', 'ترتيب الأعداد النسبية والإدخال بينها', 'Order rational numbers and find numbers in between'),
        goal: say('Hamartarrak eta zatikiak ordenatzea eta bi arrazionalen artean beste bat aurkitzea.', 'Ordenar decimales y fracciones y encontrar un racional entre otros dos.', 'ترتيب العشريات والكسور وإيجاد عدد نسبي بين عددين.', 'Order decimals and fractions, and find a rational number between two others.'),
        needs: [
            { unit: 'dbh3/numeros-racionales', topic: 'between', title: { eu: 'Bi zatikiren arteko zatikiak', es: 'Fracciones entre dos fracciones', en: 'Fractions between two fractions', ar: 'كسور بين كسرين' } }
        ],
        problem: say('Aurkitu $\\frac{4}{5}$ eta $\\frac{5}{6}$ arteko zatiki bat.', 'Encuentra una fracción entre $\\frac{4}{5}$ y $\\frac{5}{6}$.', 'جد كسرًا بين $\\frac{4}{5}$ و$\\frac{5}{6}$.', 'Find a fraction between $\\frac{4}{5}$ and $\\frac{5}{6}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzaile bera: m.k.t.(5, 6) = 30.', 'Mismo denominador: m.c.m.(5, 6) = 30.', 'المقام نفسه: م.م.أ.(5، 6) = 30.', 'Same denominator: LCM(5, 6) = 30.'), math: same('$\\frac{4}{5}=\\frac{24}{30}\\qquad\\frac{5}{6}=\\frac{25}{30}$') },
            { text: say('Ez dago tarterik: biderkatu bi gaiak 4 zenbakiaz.', 'No hay hueco: multiplica los dos términos por 4.', 'لا فراغ بينهما: اضرب الحدين في 4.', 'There is no gap: multiply the top and bottom by 4.'), math: same('$\\frac{96}{120}<\\frac{97}{120}<\\frac{98}{120}<\\frac{100}{120}$') },
            { text: say('Edo erdiko puntua.', 'O el punto medio.', 'أو نقطة المنتصف.', 'Or the midpoint.'), math: same('$\\frac{1}{2}\\left(\\frac{24}{30}+\\frac{25}{30}\\right)=\\frac{49}{60}$') }
        ],
        takeaway: say('Ordenatzeko, zifraz zifra; tartekatzeko, erdiko puntua: beti dago beste arrazional bat.', 'Para ordenar, cifra a cifra; para intercalar, el punto medio: siempre hay otro racional.', 'للترتيب رقمًا برقم؛ وللإدخال نقطة المنتصف: يوجد دائمًا عدد نسبي آخر.', 'To order, compare digit by digit; to fit one in between, use the midpoint: there is always another rational number.'),
        figure: (language) => <OrderDensityFigure language={language} />
    },
    {
        id: 'irrational',
        stage: 'reals',
        title: say('Zenbaki irrazionalak', 'Números irracionales', 'الأعداد غير النسبية', 'Irrational numbers'),
        goal: say('Zenbaki irrazionalak ezagutzea eta arrazionaletatik bereiztea.', 'Reconocer los números irracionales y distinguirlos de los racionales.', 'التعرف على الأعداد غير النسبية وتمييزها من النسبية.', 'Recognise irrational numbers and tell them apart from rational numbers.'),
        needs: [
            { unit: 'dbh3/potencias-raices', topic: 'irrational', title: { eu: 'Zenbaki arrazionalak eta irrazionalak', es: 'Números racionales e irracionales', en: 'Rational and irrational numbers', ar: 'الأعداد النسبية وغير النسبية' } }
        ],
        stepsKind: 'facts',
        steps: [
            { text: say('Karratu perfektuaren erroa: arrazionala.', 'Raíz de un cuadrado perfecto: racional.', 'جذر مربع كامل: نسبي.', 'Square root of a perfect square: rational.'), math: same('$\\sqrt{196}=14\\qquad\\sqrt{1+8}=\\sqrt{9}=3$') },
            { text: say('Karratu perfektua ez bada: irrazionala.', 'Si no es cuadrado perfecto: irracional.', 'إذا لم يكن مربعًا كاملًا: غير نسبي.', 'If it is not a perfect square: irrational.'), math: same('$1+\\sqrt{8}=3{,}828427\\ldots$') },
            { text: say('Erroak ez dira batzen errokizunak batuz.', 'Las raíces no se suman sumando los radicandos.', 'لا تُجمع الجذور بجمع ما تحتها.', 'Roots are not added by adding the numbers under the root sign.'), math: same('$\\sqrt{9+4}=\\sqrt{13}\\neq\\sqrt{9}+\\sqrt{4}=5$') }
        ],
        takeaway: say('Irrazionala: infinitu hamartar periodorik gabe. Periodoa badu, arrazionala da.', 'Irracional: infinitos decimales sin periodo. Si tiene periodo, es racional.', 'غير النسبي: منازل لا نهائية بلا دور. وإن كان له دور فهو نسبي.', 'Irrational: an infinite number of decimal digits with no recurring part. If it has a recurring part, it is rational.'),
        figure: (language) => <IrrationalFigure language={language} />
    },
    {
        id: 'number-sets',
        stage: 'reals',
        title: say('Zenbaki errealak eta multzoak', 'Los números reales y sus conjuntos', 'الأعداد الحقيقية ومجموعاتها', 'Real numbers and their sets'),
        goal: say('Zenbaki bakoitza dagokion multzorik txikienean sailkatzea.', 'Clasificar cada número en el conjunto más pequeño al que pertenece.', 'تصنيف كل عدد في أصغر مجموعة ينتمي إليها.', 'Classify each number into the smallest set it belongs to.'),
        stepsKind: 'facts',
        steps: [
            { text: say('$\\mathbb{N}$: 0, 1, 2… · $\\mathbb{Z}$: negatiboak ere bai.', '$\\mathbb{N}$: 0, 1, 2… · $\\mathbb{Z}$: también los negativos.', '$\\mathbb{N}$: 0، 1، 2… · $\\mathbb{Z}$: والسالبة أيضًا.', '$\\mathbb{N}$: 0, 1, 2… · $\\mathbb{Z}$: also the negative numbers.'), math: same('$\\sqrt{256}=16\\in\\mathbb{N}\\qquad -47\\in\\mathbb{Z}$') },
            { text: say('$\\mathbb{Q}$: zatiki gisa idatz daitezkeenak.', '$\\mathbb{Q}$: los que se escriben como fracción.', '$\\mathbb{Q}$: ما يُكتب كسرًا.', '$\\mathbb{Q}$: those that can be written as a fraction.'), math: same('$-27{,}3\\overline{5}=-\\frac{1231}{45}\\in\\mathbb{Q}$') },
            { text: say('$\\mathbb{I}$: gainerakoak.', '$\\mathbb{I}$: el resto.', '$\\mathbb{I}$: الباقي.', '$\\mathbb{I}$: the rest.'), math: same('$\\sqrt{31}=5{,}5677\\ldots\\in\\mathbb{I}$') }
        ],
        takeaway: say('Sinplifikatu lehenik; gero aukeratu multzorik txikiena.', 'Simplifica primero; después elige el conjunto más pequeño.', 'بسّط أولًا ثم اختر أصغر مجموعة.', 'Simplify first; then choose the smallest set.'),
        figure: (language) => <NumberSetsFigure language={language} />
    },
    {
        id: 'represent',
        stage: 'reals',
        title: say('Errealak zuzenean adierazi', 'Representar reales en la recta', 'تمثيل الأعداد الحقيقية على المستقيم', 'Represent real numbers on the number line'),
        goal: say('Zatikiak (Tales) eta erro karratuak (Pitagoras) zuzen errealean zehazki kokatzea.', 'Situar exactamente en la recta fracciones (Tales) y raíces cuadradas (Pitágoras).', 'وضع الكسور (طاليس) والجذور التربيعية (فيثاغورس) بدقة على المستقيم.', 'Place fractions (Thales) and square roots (Pythagoras) exactly on the number line.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'pythagoras', title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } },
            { unit: 'dbh3/geometria-plana', topic: 'thales', title: { eu: 'Talesen teorema', es: 'El teorema de Tales', en: 'Thales\' theorem', ar: 'مبرهنة طاليس' } }
        ],
        problem: say('Kokatu $\\sqrt{17}$ eta $-\\sqrt{17}$ zuzenean.', 'Sitúa $\\sqrt{17}$ y $-\\sqrt{17}$ en la recta.', 'ضع $\\sqrt{17}$ و$-\\sqrt{17}$ على المستقيم.', 'Place $\\sqrt{17}$ and $-\\sqrt{17}$ on the number line.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi 17 bi karraturen batura gisa.', 'Escribe 17 como suma de dos cuadrados.', 'اكتب 17 مجموع مربعين.', 'Write 17 as the sum of two squares.'), math: same('$17=4^{2}+1^{2}$') },
            { text: say('Marraztu 4 eta 1 katetoak: hipotenusa $\\sqrt{17}$ da.', 'Dibuja los catetos 4 y 1: la hipotenusa es $\\sqrt{17}$.', 'ارسم الضلعين 4 و1: الوتر هو $\\sqrt{17}$.', 'Draw legs of 4 and 1: the hypotenuse is $\\sqrt{17}$.'), math: same('$\\sqrt{4^{2}+1^{2}}=\\sqrt{17}$') },
            { text: say('Konpasarekin, 0 puntuan zentratuta, eraman eskuinera eta ezkerrera.', 'Con el compás centrado en 0, llévala a la derecha y a la izquierda.', 'بالفرجار في 0 انقله يمينًا ويسارًا.', 'With the compass centred on 0, carry it to the right and to the left.'), math: same('$\\sqrt{17}\\approx 4{,}12\\qquad -\\sqrt{17}\\approx -4{,}12$') }
        ],
        takeaway: say('Zatikia: Tales eta paraleloak. Erroa: Pitagoras eta konpasa.', 'Fracción: Tales y paralelas. Raíz: Pitágoras y compás.', 'الكسر: طاليس والمتوازيات. الجذر: فيثاغورس والفرجار.', 'Fraction: Thales and parallel lines. Root: Pythagoras and compass.'),
        figure: (language) => <RepresentFigure language={language} />
    },
    {
        id: 'successive',
        stage: 'reals',
        title: say('Hurbilketa jarraituak zuzenean', 'Aproximaciones sucesivas en la recta', 'التقريبات المتتالية على المستقيم', 'Successive approximations on the number line'),
        goal: say('Irrazional bat zuzenean kokatzea, gero eta tarte txikiagoetan.', 'Situar un irracional en la recta en intervalos cada vez más pequeños.', 'وضع عدد غير نسبي على المستقيم في فترات تصغر شيئًا فشيئًا.', 'Place an irrational number on the number line in smaller and smaller intervals.'),
        needs: [
            { unit: 'dbh3/potencias-raices', topic: 'real-line', title: { eu: 'Zuzen erreala', es: 'La recta real', en: 'The real number line', ar: 'المستقيم الحقيقي' } }
        ],
        problem: say('Kokatu $1+\\sqrt{3}=2{,}7320\\ldots$ ehunenetara.', 'Sitúa $1+\\sqrt{3}=2{,}7320\\ldots$ hasta las centésimas.', 'ضع $1+\\sqrt{3}=2{,}7320\\ldots$ حتى الأجزاء من مئة.', 'Place $1+\\sqrt{3}=2{,}7320\\ldots$ on the number line to the hundredths.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbaki osoak.', 'Los enteros.', 'الأعداد الصحيحة.', 'The integers.'), math: same('$2<1+\\sqrt{3}<3$') },
            { text: say('Hamarrenak.', 'Las décimas.', 'الأعشار.', 'The tenths.'), math: same('$2{,}7<1+\\sqrt{3}<2{,}8$') },
            { text: say('Ehunenak.', 'Las centésimas.', 'الأجزاء من مئة.', 'The hundredths.'), math: same('$2{,}73<1+\\sqrt{3}<2{,}74$') }
        ],
        takeaway: say('Zoom bakoitzak tartea 10 aldiz txikitzen du: zifra bat gehiago.', 'Cada zoom hace el intervalo 10 veces más pequeño: una cifra más.', 'كل تكبير يصغّر الفترة 10 مرات: رقم إضافي.', 'Each zoom makes the interval 10 times smaller: one more digit.'),
        figure: (language) => <SuccessiveFigure language={language} />
    },
    {
        id: 'intervals',
        stage: 'approx',
        title: say('Tarteak eta zuzenerdiak', 'Intervalos y semirrectas', 'الفترات وأنصاف المستقيمات', 'Intervals and half-lines'),
        goal: say('Zuzeneko zatiak tarte, desberdintza eta irudi gisa adieraztea.', 'Expresar trozos de la recta como intervalo, como desigualdad y con un dibujo.', 'التعبير عن أجزاء المستقيم فترةً ومتباينةً ورسمًا.', 'Express pieces of the number line as intervals, as inequalities and as drawings.'),
        needs: [
            { unit: 'dbh3/potencias-raices', topic: 'intervals', title: { eu: 'Tarteak', es: 'Intervalos', en: 'Intervals', ar: 'الفترات' } }
        ],
        stepsKind: 'facts',
        steps: [
            { text: say('Tartetik desberdintzara.', 'De intervalo a desigualdad.', 'من الفترة إلى المتباينة.', 'From interval to inequality.'), math: same('$(-3,\\,0]\\ \\to\\ -3<x\\le 0$') },
            { text: say('Desberdintzatik tartera (txikiena ezkerrean).', 'De desigualdad a intervalo (el menor a la izquierda).', 'من المتباينة إلى الفترة (الأصغر يسارًا).', 'From inequality to interval (the smaller number on the left).'), math: same('$10>x>4\\ \\to\\ (4,\\,10)$') },
            { text: say('Zuzenerdia.', 'Semirrecta.', 'نصف مستقيم.', 'Half-line.'), math: same('$x\\ge -1\\ \\to\\ [-1,\\,+\\infty)$') }
        ],
        takeaway: say('[ ] barne, ( ) kanpo; infinitua beti parentesiarekin.', '[ ] dentro, ( ) fuera; el infinito siempre con paréntesis.', '[ ] داخل و( ) خارج؛ واللانهاية دائمًا بقوس عادي.', '[ ]: included, ( ): not included; infinity always with a round bracket.'),
        figure: (language) => <IntervalsFigure language={language} />
    },
    {
        id: 'interval-ops',
        stage: 'approx',
        figureAfterSteps: true,
        title: say('Tarteen bildura eta ebakidura', 'Unión e intersección de intervalos', 'اتحاد الفترات وتقاطعها', 'Union and intersection of intervals'),
        goal: say('Bi tarteren bildura eta ebakidura zuzenean irakurtzea.', 'Leer en la recta la unión y la intersección de dos intervalos.', 'قراءة اتحاد فترتين وتقاطعهما على المستقيم.', 'Read the union and the intersection of two intervals on the number line.'),
        problem: say('Kalkulatu $A\\cup B$ eta $A\\cap B$, $A=[-5,\\,3]$ eta $B=(-1,\\,+\\infty)$ badira.', 'Halla $A\\cup B$ y $A\\cap B$ si $A=[-5,\\,3]$ y $B=(-1,\\,+\\infty)$.', 'جد $A\\cup B$ و$A\\cap B$ إذا كانت $A=[-5,\\,3]$ و$B=(-1,\\,+\\infty)$.', 'Find $A\\cup B$ and $A\\cap B$ if $A=[-5,\\,3]$ and $B=(-1,\\,+\\infty)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Marraztu biak: −1 eta 3 artean gainjartzen dira.', 'Dibuja los dos: se solapan de −1 a 3.', 'ارسمهما: يتداخلان من −1 إلى 3.', 'Draw both: they overlap from −1 to 3.'), math: same('$-1\\notin B\\qquad 3\\in A$') },
            { text: say('Ebakidura: biek estaltzen dutena.', 'Intersección: lo que cubren los dos.', 'التقاطع: ما يغطيانه معًا.', 'Intersection: what both of them cover.'), math: same('$A\\cap B=(-1,\\,3]$') },
            { text: say('Bildura: −5 baliotik aurrera dena.', 'Unión: todo a partir de −5.', 'الاتحاد: كل ما بعد −5.', 'Union: everything from −5 onwards.'), math: same('$A\\cup B=[-5,\\,+\\infty)$') }
        ],
        takeaway: say('∪: bietako batean; ∩: bietan. Marraztu beti.', '∪: en alguno; ∩: en los dos. Dibújalo siempre.', '∪: في إحداهما؛ ∩: فيهما معًا. ارسم دائمًا.', '∪: in either one; ∩: in both. Always draw it.'),
        figure: (language) => <IntervalOpsFigure language={language} />
    },
    {
        id: 'rounding',
        stage: 'approx',
        title: say('Hurbilketak: gutxiagoz, gehiagoz eta biribiltzea', 'Aproximaciones: por defecto, por exceso y redondeo', 'التقريب: بالنقصان وبالزيادة والتدوير', 'Approximations: lower, upper and rounded'),
        goal: say('Zenbaki bat ordena jakin bateraino hurbiltzea, trunkatuz edo biribilduz.', 'Aproximar un número hasta un orden dado, truncando o redondeando.', 'تقريب عدد حتى منزلة معينة بالبتر أو بالتدوير.', 'Approximate a number to a given place, by truncating or by rounding.'),
        needs: [
            { unit: 'dbh3/potencias-raices', topic: 'rounding', title: { eu: 'Trunkatzea eta biribiltzea', es: 'Truncar y redondear', en: 'Truncating and rounding', ar: 'البتر والتقريب' } }
        ],
        problem: say('Hurbildu $\\frac{11}{9}=1{,}2222\\ldots$ ehunenetara, gutxiagoz eta gehiagoz. Zein da biribiltzea?', 'Aproxima $\\frac{11}{9}=1{,}2222\\ldots$ a las centésimas por defecto y por exceso. ¿Cuál es el redondeo?', 'قرّب $\\frac{11}{9}=1{,}2222\\ldots$ إلى الأجزاء من مئة بالنقصان وبالزيادة. ما التدوير؟', 'Find the lower and upper approximations of $\\frac{11}{9}=1{,}2222\\ldots$ to the hundredths. What is the rounded value?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gutxiagoz (trunkatuta).', 'Por defecto (truncando).', 'بالنقصان (بالبتر).', 'Lower approximation (truncating).'), math: same('$1{,}22$') },
            { text: say('Gehiagoz.', 'Por exceso.', 'بالزيادة.', 'Upper approximation.'), math: same('$1{,}23$') },
            { text: say('Kentzen den lehen zifra 2 da (< 5).', 'La primera cifra suprimida es 2 (< 5).', 'أول رقم محذوف هو 2 (< 5).', 'The first digit removed is 2 (< 5).'), math: same('$1{,}2222\\ldots\\approx 1{,}22$') }
        ],
        takeaway: say('Biribildu: hurbilena. Lehen zifra kendua ≥ 5 bada, gora.', 'Redondear: el más cercano. Si la primera cifra suprimida es ≥ 5, hacia arriba.', 'التدوير: الأقرب. إذا كان أول رقم محذوف ≥ 5 فإلى الأعلى.', 'Rounding: to the nearest. If the first digit removed is ≥ 5, round up.'),
        figure: (language) => <DefectExcessFigure language={language} />
    },
    {
        id: 'errors',
        stage: 'approx',
        title: say('Errore absolutua eta erlatiboa', 'Error absoluto y relativo', 'الخطأ المطلق والنسبي', 'Absolute and relative error'),
        goal: say('Hurbilketa baten erroreak kalkulatzea eta hurbilketak konparatzea.', 'Calcular los errores de una aproximación y comparar aproximaciones.', 'حساب أخطاء تقريب ومقارنة التقريبات.', 'Calculate the errors of an approximation and compare approximations.'),
        needs: [
            { unit: 'dbh3/potencias-raices', topic: 'errors', title: { eu: 'Errore absolutua eta erlatiboa', es: 'Error absoluto y relativo', en: 'Absolute and relative error', ar: 'الخطأ المطلق والنسبي' } }
        ],
        problem: say('$1{,}468$ zenbakirako, zein da hobea: $1{,}5$ ala $1{,}4$?', 'Para $1{,}468$, ¿qué aproximación es mejor: $1{,}5$ o $1{,}4$?', 'للعدد $1{,}468$ أي تقريب أفضل: $1{,}5$ أم $1{,}4$؟', 'For $1{,}468$, which approximation is better: $1{,}5$ or $1{,}4$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$1{,}5$ hartuta.', 'Tomando $1{,}5$.', 'بأخذ $1{,}5$.', 'Using $1{,}5$.'), math: same('$\\begin{gathered}E_a=|1{,}468-1{,}5|=0{,}032\\\\ E_r=\\frac{0{,}032}{1{,}468}=0{,}0218\\ldots\\end{gathered}$') },
            { text: say('$1{,}4$ hartuta.', 'Tomando $1{,}4$.', 'بأخذ $1{,}4$.', 'Using $1{,}4$.'), math: same('$\\begin{gathered}E_a=|1{,}468-1{,}4|=0{,}068\\\\ E_r=0{,}0463\\ldots\\end{gathered}$') },
            { text: say('Errore txikiagoak: $1{,}5$ da hobea.', 'Errores menores: es mejor $1{,}5$.', 'أخطاء أصغر: $1{,}5$ أفضل.', 'Smaller error: $1{,}5$ is better.'), math: same('$0{,}032<0{,}068$') }
        ],
        takeaway: say('Absolutua: zenbat huts egin den. Erlatiboa: hutsegitea benetako balioarekiko.', 'Absoluto: cuánto nos equivocamos. Relativo: el error respecto al valor real.', 'المطلق: مقدار الخطأ. النسبي: الخطأ بالنسبة إلى القيمة الحقيقية.', 'Absolute: how far off we are. Relative: the error compared with the true value.'),
        figure: (language) => <ErrorsFigure language={language} />
    },
    {
        id: 'percent-basics',
        stage: 'percent',
        title: say('Ehunekoak', 'Porcentajes', 'النسب المئوية', 'Percentages'),
        goal: say('Kantitate baten ehunekoa kalkulatzea eta zati batek zer ehuneko adierazten duen jakitea.', 'Calcular el tanto por ciento de una cantidad y saber qué porcentaje representa una parte.', 'حساب نسبة مئوية من كمية ومعرفة ما تمثله جزء من نسبة.', 'Calculate the percentage of an amount and find what percentage a part represents.'),
        problem: say('Kalkulatu 1575 zenbakiaren % 115, eta emaitzaren % 12.', 'Calcula el 12 % del 115 % de 1575.', 'احسب 12 % من 115 % من 1575.', 'Work out 12% of 115% of 1,575.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi ehunekoak hamartar gisa.', 'Escribe los porcentajes como decimales.', 'اكتب النسبتين عشريتين.', 'Write the percentages as decimals.'), math: same('$12\\,\\%=0{,}12\\qquad 115\\,\\%=1{,}15$') },
            { text: say('Biderkatu dena.', 'Multiplica todo.', 'اضرب الكل.', 'Multiply everything.'), math: same('$0{,}12\\cdot 1{,}15\\cdot 1575=217{,}35$') }
        ],
        takeaway: say('% $p$ kalkulatzeko, biderkatu $\\frac{p}{100}$ zatikiaz. Zer % den jakiteko, zatitu eta bider 100.', 'Para el $p\\,\\%$, multiplica por $\\frac{p}{100}$. Para saber qué % es, divide y multiplica por 100.', 'لحساب $p\\,\\%$ اضرب في $\\frac{p}{100}$. ولمعرفة النسبة اقسم واضرب في 100.', 'For $p\\,\\%$, multiply by $\\frac{p}{100}$. To find what percentage it is, divide and multiply by 100.'),
        figure: (language) => <PercentFigure language={language} />
    },
    {
        id: 'percent-change',
        stage: 'percent',
        title: say('Ehuneko igoerak eta jaitsierak', 'Aumentos y disminuciones porcentuales', 'الزيادة والنقصان بالنسبة المئوية', 'Percentage increases and decreases'),
        goal: say('Aldakuntza-indizea erabiltzea kantitate bat ehuneko batean igo edo jaisteko.', 'Usar el índice de variación para aumentar o disminuir una cantidad en un porcentaje.', 'استعمال مؤشر التغير لزيادة كمية أو إنقاصها بنسبة مئوية.', 'Use the multiplier to increase or decrease an amount by a percentage.'),
        needs: [
            { unit: 'dbh3/proporcionalidad', topic: 'percent-index', title: { eu: 'Ehunekoak eta aldakuntza-indizea', es: 'Porcentajes e índice de variación', en: 'Percentages and the index of change', ar: 'النسب المئوية ومؤشر التغيّر' } }
        ],
        problem: say('94 € balio duen jaka bat % 15 merkatu dute. Zenbat balio du orain?', 'Una chaqueta de 94 € se rebaja un 15 %. ¿Cuánto cuesta ahora?', 'سترة ثمنها 94 € خُفّض سعرها 15 %. كم ثمنها الآن؟', 'A jacket costing €94 is reduced by 15%. How much does it cost now?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizea: % 15 gutxiago.', 'Índice: un 15 % menos.', 'المؤشر: أقل بـ 15 %.', 'Multiplier: 15% less.'), math: same('$1-0{,}15=0{,}85$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$94\\cdot 0{,}85=79{,}9$') }
        ],
        takeaway: say('Igo % $p$: bider $1+\\frac{p}{100}$. Jaitsi % $p$: bider $1-\\frac{p}{100}$.', 'Aumentar un $p\\,\\%$: por $1+\\frac{p}{100}$. Disminuir un $p\\,\\%$: por $1-\\frac{p}{100}$.', 'الزيادة $p\\,\\%$: الضرب في $1+\\frac{p}{100}$. والنقصان: في $1-\\frac{p}{100}$.', 'Increase by $p\\,\\%$: multiply by $1+\\frac{p}{100}$. Decrease by $p\\,\\%$: multiply by $1-\\frac{p}{100}$.'),
        figure: (language) => <PercentChangeFigure language={language} />
    },
    {
        id: 'chained',
        stage: 'percent',
        figureAfterSteps: true,
        title: say('Ehuneko kateatuak', 'Porcentajes encadenados', 'النسب المئوية المتسلسلة', 'Chained percentages'),
        goal: say('Bata bestearen atzetik egiten diren ehuneko aldaketak indize bakarrean biltzea.', 'Reunir en un solo índice varias variaciones porcentuales seguidas.', 'جمع عدة تغيرات مئوية متتالية في مؤشر واحد.', 'Combine several successive percentage changes into one multiplier.'),
        needs: [
            { unit: 'dbh3/proporcionalidad', topic: 'chained', title: { eu: 'Ehuneko kateatuak', es: 'Porcentajes encadenados', en: 'Successive percentages', ar: 'النسب المتتالية' } }
        ],
        problem: say('18\u00a0000 €-ko auto bati % 20 deskontatu diote eta gero % 21 BEZ gehitu. Zenbat ordaindu da?', 'A un coche de 18\u00a0000 € le hacen un descuento del 20 % y después le añaden el 21 % de IVA. ¿Cuánto se ha pagado?', 'سيارة ثمنها 18\u00a0000 € حصلت على خصم 20 % ثم أضيفت ضريبة 21 %. كم دُفع؟', 'A car costing €18,000 gets a 20% discount, and then 21% VAT is added. How much has been paid?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizeak.', 'Los índices.', 'المؤشرات.', 'The multipliers.'), math: same('$0{,}80\\qquad 1{,}21$') },
            { text: say('Indize osoa.', 'El índice total.', 'المؤشر الكلي.', 'The total multiplier.'), math: same('$0{,}80\\cdot 1{,}21=0{,}968$') },
            { text: say('Amaierako prezioa.', 'El precio final.', 'السعر النهائي.', 'The final price.'), math: same('$18\\,000\\cdot 0{,}968=17\\,424$') }
        ],
        takeaway: say('Kateatutako ehunekoak: biderkatu indizeak. Ez batu ehunekoak.', 'Porcentajes encadenados: multiplica los índices. No sumes los porcentajes.', 'النسب المتسلسلة: اضرب المؤشرات. لا تجمع النسب.', 'Successive changes: multiply the multipliers. Do not add the percentages.'),
        figure: (language) => <ChainedFigure language={language} />
    },
    {
        id: 'percent-inverse',
        stage: 'percent',
        figureAfterSteps: true,
        title: say('Hasierako kantitatea aurkitu', 'Calcular la cantidad inicial', 'إيجاد الكمية الأولية', 'Calculate the starting amount'),
        goal: say('Amaierako kantitatetik eta ehunekotik abiatuta hasierako kantitatea kalkulatzea.', 'Calcular la cantidad inicial a partir de la final y del porcentaje.', 'حساب الكمية الأولية انطلاقًا من النهائية والنسبة.', 'Calculate the starting amount from the final amount and the percentage.'),
        problem: say('Heriotza-tasa % 12,5 jaitsi da eta aurten 98 pertsona hil dira. Zenbat hil ziren iaz?', 'La mortalidad ha descendido un 12,5 % y este año han muerto 98 personas. ¿Cuántas murieron el año pasado?', 'انخفضت الوفيات 12.5 % وتوفي هذا العام 98 شخصًا. كم توفي العام الماضي؟', 'Mortality has fallen by 12.5%, and this year 98 people have died. How many died last year?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizea: % 12,5 gutxiago.', 'Índice: un 12,5 % menos.', 'المؤشر: أقل بـ 12.5 %.', 'Multiplier: 12.5% less.'), math: same('$1-0{,}125=0{,}875$') },
            { text: say('Ekuazioa.', 'La ecuación.', 'المعادلة.', 'The equation.'), math: same('$0{,}875\\cdot C=98$') },
            { text: say('Zatitu indizeaz.', 'Divide entre el índice.', 'اقسم على المؤشر.', 'Divide by the multiplier.'), math: same('$C=98:0{,}875=112$') }
        ],
        takeaway: say('Hasierakoa = amaierakoa : indizea.', 'Inicial = final : índice.', 'الأولية = النهائية : المؤشر.', 'Initial = final : multiplier.'),
        figure: (language) => <InverseFigure language={language} />
    },
    {
        id: 'simple-interest',
        stage: 'interest',
        title: say('Interes sinplea', 'Interés simple', 'الفائدة البسيطة', 'Simple interest'),
        goal: say('Interes sinplea kalkulatzea, eta haren formulatik kapitala, interes-tasa edo denbora askatzea.', 'Calcular el interés simple y despejar de su fórmula el capital, el rédito o el tiempo.', 'حساب الفائدة البسيطة وعزل رأس المال أو المعدل أو الزمن من صيغتها.', 'Calculate simple interest and solve its formula for the principal, the interest rate or the time.'),
        needs: [
            { unit: 'dbh3/proporcionalidad', topic: 'interest', title: { eu: 'Interes bakuna', es: 'Interés simple', en: 'Simple interest', ar: 'الفائدة البسيطة' } }
        ],
        problem: say('4500 € uzten ditugu % 3 interesarekin 8 hilabetez. Zenbat jasoko dugu?', 'Ingresamos 4500 € al 3 % durante 8 meses. ¿Cuánto recibiremos?', 'نودع 4500 € بنسبة 3 % لمدة 8 أشهر. كم سنستلم؟', 'We deposit €4,500 at 3% for 8 months. How much will we receive?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Denbora urtetan.', 'El tiempo en años.', 'الزمن بالأعوام.', 'The time in years.'), math: same('$t=\\frac{8}{12}$') },
            { text: say('Interesa.', 'El interés.', 'الفائدة.', 'The interest.'), math: same('$I=\\frac{4500\\cdot 3\\cdot\\frac{8}{12}}{100}=90$') },
            { text: say('Amaierako kapitala.', 'El capital final.', 'رأس المال النهائي.', 'The final amount.'), math: same('$4500+90=4590$') }
        ],
        takeaway: say('Interes sinplea: $I=\\frac{C\\cdot r\\cdot t}{100}$; urtero interes bera.', 'Interés simple: $I=\\frac{C\\cdot r\\cdot t}{100}$; cada año el mismo interés.', 'الفائدة البسيطة: $I=\\frac{C\\cdot r\\cdot t}{100}$؛ الفائدة نفسها كل عام.', 'Simple interest: $I=\\frac{C\\cdot r\\cdot t}{100}$; the same interest each year.'),
        figure: (language) => <SimpleInterestFigure language={language} />
    },
    {
        id: 'compound-interest',
        stage: 'interest',
        title: say('Interes konposatua', 'Interés compuesto', 'الفائدة المركبة', 'Compound interest'),
        goal: say('Interes konposatuko kapitala kalkulatzea, ehuneko kateatu gisa.', 'Calcular el capital final con interés compuesto, como porcentajes encadenados.', 'حساب رأس المال النهائي بالفائدة المركبة كنسب متسلسلة.', 'Calculate the final amount with compound interest, as successive percentage changes.'),
        problem: say('600 €, % 3,4 interes konposatuan, 5 urtez. Zenbat izango dira?', '600 € al 3,4 % durante 5 años, a interés compuesto. ¿En cuánto se convierten?', '600 € بنسبة 3.4 % لمدة 5 أعوام بفائدة مركبة. كم تصبح؟', '€600 at 3.4% for 5 years, with compound interest. How much will it be worth?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizea urteko.', 'Índice anual.', 'المؤشر السنوي.', 'Annual multiplier.'), math: same('$1+\\frac{3{,}4}{100}=1{,}034$') },
            { text: say('Bost urte: bost aldiz.', 'Cinco años: cinco veces.', 'خمسة أعوام: خمس مرات.', 'Five years: five times.'), math: same('$C_f=600\\cdot 1{,}034^{5}$') },
            { text: say('Biribildu zentimoetara.', 'Redondea a los céntimos.', 'قرّب إلى السنت.', 'Round to the nearest cent.'), math: same('$C_f\\approx 709{,}18$') }
        ],
        takeaway: say('Interes konposatua: $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$.', 'Interés compuesto: $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$.', 'الفائدة المركبة: $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$.', 'Compound interest: $C_f=C_i\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$.'),
        figure: (language) => <CompoundInterestFigure language={language} />
    },
    {
        id: 'interest-compare',
        stage: 'interest',
        title: say('Sinplea ala konposatua?', '¿Simple o compuesto?', 'بسيطة أم مركبة؟', 'Simple or compound?'),
        goal: say('Bi interes motak konparatzea eta kapitala edo epea aurkitzea.', 'Comparar los dos tipos de interés y hallar el capital o el plazo.', 'مقارنة نوعي الفائدة وإيجاد رأس المال أو المدة.', 'Compare the two types of interest and find the principal or the time period.'),
        problem: say('Fernandok 1000 € uzten ditu, % 2 interes konposatuan, 5 urtez, eta Estherrek gauza bera interes sinplean. Zenbat irabazten du gehiago Fernandok?', 'Fernando deja 1000 € al 2 % durante 5 años a interés compuesto y Esther lo mismo a interés simple. ¿Cuánto gana Fernando de más?', 'يودع فرناندو 1000 € بنسبة 2 % لمدة 5 أعوام بفائدة مركبة وتودع إستير المبلغ نفسه بفائدة بسيطة. كم يربح فرناندو أكثر منها؟', 'Fernando deposits €1,000 at 2% for 5 years with compound interest, and Esther does the same with simple interest. How much more does Fernando earn?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Fernando (konposatua).', 'Fernando (compuesto).', 'فرناندو (مركبة).', 'Fernando (compound).'), math: same('$1000\\cdot 1{,}02^{5}\\approx 1104{,}08\\ \\to\\ 104{,}08$') },
            { text: say('Esther (sinplea).', 'Esther (simple).', 'إستير (بسيطة).', 'Esther (simple).'), math: same('$I=\\frac{1000\\cdot 2\\cdot 5}{100}=100$') },
            { text: say('Diferentzia.', 'La diferencia.', 'الفرق.', 'The difference.'), math: same('$104{,}08-100=4{,}08$') }
        ],
        takeaway: say('Sinplea: batu (zuzena). Konposatua: biderkatu (kurba). Epe luzean, konposatuak irabazten du.', 'Simple: sumar (recta). Compuesto: multiplicar (curva). A largo plazo gana el compuesto.', 'البسيطة: جمع (خط مستقيم). المركبة: ضرب (منحنى). وعلى المدى الطويل تربح المركبة.', 'Simple: add (straight line). Compound: multiply (curve). In the long run, compound interest wins.'),
        figure: (language) => <InterestCompareFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const realsPercentTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...realsPercentLessonTexts[topic.id as RealsPercentTopicId], ...realsPercentLessonChecks[topic.id as RealsPercentTopicId] }))

/** The same formula in every language (decimal point in Arabic) */
function same(value: string): LocalizedText {
    return { eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') }
}

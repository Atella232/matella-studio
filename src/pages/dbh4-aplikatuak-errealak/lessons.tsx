import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    DecimalKindsFigure,
    ErrorsFigure,
    ExactFractionFigure,
    FractionAmountFigure,
    FractionOpsFigure,
    IntervalsFigure,
    IrrationalFigure,
    NumberSetsFigure,
    PeriodicFractionFigure,
    PowersFigure,
    RadicalOpsFigure,
    RealLineFigure,
    RootsFigure,
    RoundingFigure,
    ScientificFigure,
    ScientificOpsFigure,
    SimplifyFigure
} from './figures'
import { realsLessonChecks, type RealsTopicId } from './lessonChecks'
import { realsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Zenbaki errealak · 4. DBH (matematika aplikatuak) — stages and lessons.
   Sequence follows the class textbook (Santillana 4.º ESO Aplicadas unit 1,
   "Números racionales e irracionales": fractions, decimals, irrationals,
   approximations and errors, powers, scientific notation, the real line and
   intervals) with Anaya 4.º ESO Aplicadas unit 3 ("Números reales": roots
   and radicals, which complete the real numbers of the course).
   ========================================================================== */

export type RealsStageId = 'rational' | 'decimals' | 'reals' | 'approx' | 'radicals'

export const realsStages: UnitStage[] = [
    { id: 'rational', tone: 'blue', title: { eu: 'Zenbaki arrazionalak', es: 'Números racionales', en: 'Rational numbers', ar: 'الأعداد النسبية' } },
    { id: 'decimals', tone: 'violet', title: { eu: 'Hamartarrak eta zatikiak', es: 'Decimales y fracciones', en: 'Decimals and fractions', ar: 'الأعداد العشرية والكسور' } },
    { id: 'reals', tone: 'mustard', title: { eu: 'Irrazionalak eta zuzen erreala', es: 'Irracionales y recta real', en: 'Irrational numbers and the real number line.', ar: 'غير النسبية والمستقيم الحقيقي' } },
    { id: 'approx', tone: 'coral', title: { eu: 'Hurbilketak eta idazkera zientifikoa', es: 'Aproximaciones y notación científica', en: 'Approximations and scientific notation', ar: 'التقريب والترميز العلمي' } },
    { id: 'radicals', tone: 'green', title: { eu: 'Erroak eta erradikalak', es: 'Raíces y radicales', en: 'Roots and radicals', ar: 'الجذور والجذريات' } }
]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'fraction-amount',
        stage: 'rational',
        figureAfterSteps: true,
        needs: [{ unit: 'dbh3/numeros-racionales', topic: 'equivalent', title: { eu: 'Zatiki baliokideak', es: 'Fracciones equivalentes', en: 'Equivalent fractions', ar: 'الكسور المتكافئة' } }],
        title: say('Zatikiak: kantitate baten zatikia eta konparazioa', 'Fracciones: fracción de una cantidad y comparación', 'الكسور: كسر من كمية والمقارنة', 'Fractions: fraction of a quantity and comparison'),
        goal: say('Kantitate baten zatikia kalkulatzea eta zatikiak izendatzaile komuna erabiliz konparatzea.', 'Calcular la fracción de una cantidad y comparar fracciones con un denominador común.', 'حساب كسر من كمية ومقارنة الكسور بمقام مشترك.', 'Calculate a fraction of a quantity and compare fractions with a common denominator.'),
        problem: say('Arturok 80 ateren $\\frac{2}{5}$ margotu ditu eta Celiak $\\frac{1}{2}$. Zenbat ate geratzen dira?', 'Arturo ha pintado $\\frac{2}{5}$ de 80 puertas y Celia $\\frac{1}{2}$. ¿Cuántas puertas quedan?', 'دهن أرتورو $\\frac{2}{5}$ من 80 بابًا ودهنت سيليا $\\frac{1}{2}$. كم بابًا بقي؟', 'Arturo has painted $\\frac{2}{5}$ of 80 doors and Celia $\\frac{1}{2}$. How many doors are left?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Arturo: zatitu 5 zenbakiaz eta biderkatu 2 zenbakiaz.', 'Arturo: divide entre 5 y multiplica por 2.', 'أرتورو: اقسم على 5 واضرب في 2.', 'Arturo: divide by 5 and multiply by 2.'), math: '$\\frac{2}{5}\\cdot 80=\\frac{160}{5}=32$' },
            { text: say('Celia: 80 zenbakiaren erdia.', 'Celia: la mitad de 80.', 'سيليا: نصف 80.', 'Celia: half of 80.'), math: '$\\frac{1}{2}\\cdot 80=40$' },
            { text: say('Kendu biak guztiari.', 'Resta las dos cantidades del total.', 'اطرح الكميتين من المجموع.', 'Subtract the two amounts from the total.'), math: '$80-(32+40)=8$' }
        ],
        takeaway: say('Kantitate baten zatikia: zatitu izendatzaileaz eta biderkatu zenbakitzaileaz.', 'Fracción de una cantidad: divide entre el denominador y multiplica por el numerador.', 'كسر من كمية: اقسم على المقام واضرب في البسط.', 'Fraction of a quantity: divide by the denominator and multiply by the numerator.'),
        figure: (language) => <FractionAmountFigure language={language} />
    },
    {
        id: 'fraction-ops',
        stage: 'rational',
        figureAfterSteps: true,
        title: say('Eragiketak zatikiekin', 'Operaciones con fracciones', 'العمليات على الكسور', 'Operations with fractions'),
        goal: say('Zatikiekin batu, kendu, biderkatu eta zatitzea, eragiketen hierarkia errespetatuz.', 'Sumar, restar, multiplicar y dividir fracciones respetando la jerarquía de las operaciones.', 'جمع الكسور وطرحها وضربها وقسمتها مع احترام أولويات العمليات.', 'Add, subtract, multiply and divide fractions, following the order of operations.'),
        problem: same('$\\frac{2}{7}\\cdot\\left(\\frac{1}{4}-\\frac{3}{5}\\right)+1$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Parentesia lehenik: izendatzaile komuna 20.', 'Primero el paréntesis: denominador común 20.', 'القوس أولًا: المقام المشترك 20.', 'First the brackets: common denominator 20.'), math: '$\\frac{1}{4}-\\frac{3}{5}=\\frac{5-12}{20}=-\\frac{7}{20}$' },
            { text: say('Gero biderketa, eta sinplifikatu.', 'Después la multiplicación, y simplifica.', 'ثم الضرب وبسّط.', 'Then the multiplication, and simplify.'), math: '$\\frac{2}{7}\\cdot\\left(-\\frac{7}{20}\\right)=-\\frac{14}{140}=-\\frac{1}{10}$' },
            { text: say('Azkenik batuketa.', 'Por último la suma.', 'وأخيرًا الجمع.', 'Last, the addition.'), math: '$-\\frac{1}{10}+1=\\frac{9}{10}$' }
        ],
        takeaway: say('Parentesiak → berreturak → biderketak eta zatiketak → batuketak eta kenketak.', 'Paréntesis → potencias → multiplicaciones y divisiones → sumas y restas.', 'الأقواس ← القوى ← الضرب والقسمة ← الجمع والطرح.', 'Brackets → powers → multiplications and divisions → additions and subtractions.'),
        figure: (language) => <FractionOpsFigure language={language} />
    },
    {
        id: 'powers',
        stage: 'rational',
        title: say('Berretzaile osoko berreturak', 'Potencias de exponente entero', 'القوى ذات الأس الصحيح', 'Powers with integer exponents'),
        goal: say('Berretzaile negatiboko berreturak kalkulatzea eta berreturen propietateak zatikiekin erabiltzea.', 'Calcular potencias de exponente negativo y usar las propiedades de las potencias con fracciones.', 'حساب القوى ذات الأس السالب واستعمال خواص القوى مع الكسور.', 'Calculate powers with negative exponents and use the properties of powers with fractions.'),
        problem: same('$\\begin{gathered}\\left(\\frac{3}{2}\\right)^{-5}\\\\ \\left(-\\frac{5}{6}\\right)^{3}\\cdot\\left(-\\frac{5}{6}\\right)^{-2}\\end{gathered}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berretzaile negatiboa: hartu alderantzizkoa.', 'Exponente negativo: toma el inverso.', 'الأس السالب: خذ المقلوب.', 'Negative exponent: take the reciprocal.'), math: '$\\left(\\frac{3}{2}\\right)^{-5}=\\left(\\frac{2}{3}\\right)^{5}=\\frac{32}{243}$' },
            { text: say('Oinarri bera: batu berretzaileak.', 'Misma base: suma los exponentes.', 'الأساس نفسه: اجمع الأسس.', 'Same base: add the exponents.'), math: '$\\left(-\\frac{5}{6}\\right)^{3+(-2)}=\\left(-\\frac{5}{6}\\right)^{1}$' },
            { text: say('Berretzailea 1 da: oinarria bera.', 'El exponente es 1: la propia base.', 'الأس 1: الأساس نفسه.', 'The exponent is 1: the base itself.'), math: '$=-\\frac{5}{6}$' }
        ],
        takeaway: say('Berretzaile negatiboa: zatikia buelta eman eta berretzailea positibo bihurtu.', 'Exponente negativo: da la vuelta a la fracción y el exponente pasa a positivo.', 'الأس السالب: اقلب الكسر ويصبح الأس موجبًا.', 'Negative exponent: flip the fraction and the exponent becomes positive.'),
        figure: (language) => <PowersFigure language={language} />
    },
    {
        id: 'decimal-kinds',
        stage: 'decimals',
        figureAfterSteps: true,
        title: say('Zatikitik hamartarrera', 'De fracción a decimal', 'من الكسر إلى العدد العشري', 'From fraction to decimal'),
        goal: say('Zatiki baten adierazpen hamartarra lortzea eta zehatza, periodiko hutsa ala mistoa den esatea.', 'Obtener la expresión decimal de una fracción y decir si es exacta, periódica pura o mixta.', 'إيجاد الصورة العشرية لكسر وتحديد ما إذا كانت منتهية أو دورية بحتة أو مختلطة.', 'Find the decimal form of a fraction and say whether it is terminating, pure recurring or mixed recurring.'),
        problem: say('Idatzi $\\frac{11}{6}$ hamartar gisa eta esan zer motatakoa den.', 'Escribe $\\frac{11}{6}$ como decimal y di de qué tipo es.', 'اكتب $\\frac{11}{6}$ عددًا عشريًا وقل ما نوعه.', 'Write $\\frac{11}{6}$ as a decimal and say what type it is.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu 11 : 6. Hondarrak: 5, 2, 2… 2 errepikatzen da.', 'Divide 11 : 6. Restos: 5, 2, 2… se repite el 2.', 'اقسم 11 : 6. البواقي: 5، 2، 2… يتكرر 2.', 'Divide 11 ÷ 6. Remainders: 5, 2, 2… the 2 repeats.'), math: same('$11:6=1{,}8333\\ldots$') },
            { text: say('8 behin agertzen da (aurreperiodoa) eta 3 errepikatzen da (periodoa).', 'El 8 aparece una vez (anteperiodo) y el 3 se repite (periodo).', 'يظهر 8 مرة واحدة (ما قبل الدور) ويتكرر 3 (الدور).', 'The 8 appears once (non-recurring part) and the 3 repeats (recurring part).'), math: same('$1{,}8\\overline{3}$') },
            { text: say('Izendatzailea $6=2\\cdot 3$: 2 eta beste faktore bat → mistoa.', 'Denominador $6=2\\cdot 3$: un 2 y otro factor → mixto.', 'المقام $6=2\\cdot 3$: 2 وعامل آخر ← مختلط.', 'Denominator $6=2\\cdot 3$: a 2 and another factor → mixed recurring.'), math: say('$\\to$ periodiko mistoa', '$\\to$ periódico mixto', '$\\to$ دوري مختلط', '$\\to$ mixed recurring decimal') }
        ],
        takeaway: say('Hondarra 0: zehatza. Hondar bat errepikatzen bada: periodikoa.', 'Resto 0: exacto. Si un resto se repite: periódico.', 'الباقي 0: منتهٍ. إذا تكرر باقٍ: دوري.', 'Remainder 0: terminating. If a remainder repeats: recurring.'),
        figure: (language) => <DecimalKindsFigure language={language} />
    },
    {
        id: 'exact-to-fraction',
        stage: 'decimals',
        needs: [{ unit: 'dbh3/numeros-racionales', topic: 'simplify', title: { eu: 'Anplifikatu, sinplifikatu eta zatiki laburtezina', es: 'Amplificar, simplificar y fracción irreducible', en: 'Amplifying, simplifying and the simplest form', ar: 'التوسيع والاختزال والكسر غير القابل للاختزال' } }],
        title: say('Hamartar zehatz baten zatikia', 'Fracción de un decimal exacto', 'كسر عدد عشري منتهٍ', 'Fraction of a terminating decimal'),
        goal: say('Hamartar zehatz bat zatiki hamartar gisa idaztea eta sinplifikatzea.', 'Escribir un decimal exacto como fracción decimal y simplificarla.', 'كتابة عدد عشري منتهٍ على صورة كسر عشري وتبسيطه.', 'Write a terminating decimal as a decimal fraction and simplify it.'),
        problem: say('Idatzi $0{,}0016$ eta $76{,}94$ zatiki laburtezin gisa.', 'Escribe $0{,}0016$ y $76{,}94$ como fracciones irreducibles.', 'اكتب $0{,}0016$ و$76{,}94$ كسرين غير قابلين للاختزال.', 'Write $0{,}0016$ and $76{,}94$ as fractions in their simplest form.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$0{,}0016$: lau hamartar → 10\u00a0000.', '$0{,}0016$: cuatro decimales → 10\u00a0000.', '$0{,}0016$: أربع منازل ← 10\u00a0000.', '$0{,}0016$: four decimal places → 10,000.'), math: '$\\frac{16}{10\\,000}=\\frac{1}{625}$' },
            { text: say('$76{,}94$: bi hamartar → 100.', '$76{,}94$: dos decimales → 100.', '$76{,}94$: منزلتان ← 100.', '$76{,}94$: two decimal places → 100.'), math: '$\\frac{7694}{100}$' },
            { text: say('Sinplifikatu 2 zenbakiaz.', 'Simplifica entre 2.', 'بسّط على 2.', 'Simplify by dividing by 2.'), math: '$=\\frac{3847}{50}$' }
        ],
        takeaway: say('Hamartar adina zero izendatzailean, eta gero sinplifikatu.', 'Tantos ceros en el denominador como decimales, y después simplifica.', 'أصفار في المقام بعدد المنازل العشرية ثم بسّط.', 'Put as many zeros in the denominator as decimal places, then simplify.'),
        figure: (language) => <ExactFractionFigure language={language} />
    },
    {
        id: 'periodic-to-fraction',
        stage: 'decimals',
        title: say('Hamartar periodikoen zatiki sortzailea', 'Fracción generatriz de los decimales periódicos', 'الكسر المولّد للأعداد العشرية الدورية', 'Generating fraction of recurring decimals'),
        goal: say('Hamartar periodiko huts eta misto baten zatiki sortzailea aurkitzea.', 'Hallar la fracción generatriz de un decimal periódico puro o mixto.', 'إيجاد الكسر المولّد لعدد عشري دوري بحت أو مختلط.', 'Find the generating fraction of a pure or mixed recurring decimal.'),
        problem: say('Aurkitu $4{,}\\overline{2}$ eta $3{,}7\\overline{5}$ hamartarren zatiki sortzaileak.', 'Halla la fracción generatriz de $4{,}\\overline{2}$ y de $3{,}7\\overline{5}$.', 'أوجد الكسر المولّد لكل من $4{,}\\overline{2}$ و$3{,}7\\overline{5}$.', 'Find the generating fraction of $4{,}\\overline{2}$ and $3{,}7\\overline{5}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$4{,}\\overline{2}$: periodoa zifra bat → 9; aurreperiodorik ez.', '$4{,}\\overline{2}$: periodo de una cifra → 9; sin anteperiodo.', '$4{,}\\overline{2}$: دور من رقم واحد ← 9؛ دون ما قبل الدور.', '$4{,}\\overline{2}$: recurring part of one digit → 9; no non-recurring part.'), math: '$\\frac{42-4}{9}=\\frac{38}{9}$' },
            { text: say('$3{,}7\\overline{5}$: periodoa (5) → 9; aurreperiodoa (7) → 0.', '$3{,}7\\overline{5}$: periodo (5) → 9; anteperiodo (7) → 0.', '$3{,}7\\overline{5}$: الدور (5) ← 9؛ ما قبله (7) ← 0.', '$3{,}7\\overline{5}$: recurring part (5) → 9; non-recurring part (7) → 0.'), math: '$\\frac{375-37}{90}=\\frac{338}{90}$' },
            { text: say('Sinplifikatu eta egiaztatu zatituz.', 'Simplifica y comprueba dividiendo.', 'بسّط وتحقق بالقسمة.', 'Simplify and check by dividing.'), math: same('$\\frac{338}{90}=\\frac{169}{45}=3{,}7555\\ldots$') }
        ],
        takeaway: say('Periodoko zifra bakoitzeko 9 bat, aurreperiodoko bakoitzeko 0 bat.', 'Un 9 por cada cifra del periodo y un 0 por cada cifra del anteperiodo.', '9 لكل رقم في الدور و0 لكل رقم قبله.', 'A 9 for each digit in the recurring part and a 0 for each digit in the non-recurring part.'),
        figure: (language) => <PeriodicFractionFigure language={language} />
    },
    {
        id: 'irrational',
        stage: 'reals',
        needs: [{ unit: 'dbh3/potencias-raices', topic: 'roots', title: { eu: 'Erro karratuak eta kuboak', es: 'Raíces cuadradas y cúbicas', en: 'Square and cube roots', ar: 'الجذور التربيعية والتكعيبية' } }],
        title: say('Zenbaki irrazionalak', 'Números irracionales', 'الأعداد غير النسبية', 'Irrational numbers'),
        goal: say('Zenbaki irrazionalak ezagutzea eta arrazionaletatik bereiztea.', 'Reconocer los números irracionales y distinguirlos de los racionales.', 'التعرف على الأعداد غير النسبية وتمييزها من النسبية.', 'Recognise irrational numbers and tell them apart from rational numbers.'),
        problem: say('Arrazionalak ala irrazionalak? $\\sqrt{16}$, $0{,}151515\\ldots$, $2{,}449489743\\ldots$, $\\sqrt{21}$', '¿Racionales o irracionales? $\\sqrt{16}$, $0{,}151515\\ldots$, $2{,}449489743\\ldots$, $\\sqrt{21}$', 'نسبية أم غير نسبية؟ $\\sqrt{16}$ و$0{,}151515\\ldots$ و$2{,}449489743\\ldots$ و$\\sqrt{21}$', 'Rational or irrational? $\\sqrt{16}$, $0{,}151515\\ldots$, $2{,}449489743\\ldots$, $\\sqrt{21}$'),
        stepsKind: 'facts',
        steps: [
            { title: say('Arrazionalak', 'Racionales', 'نسبية', 'Rational'), text: say('$\\sqrt{16}=4$ zenbaki osoa da; $0{,}1515\\ldots$ periodikoa da.', '$\\sqrt{16}=4$ es entero; $0{,}1515\\ldots$ es periódico.', '$\\sqrt{16}=4$ عدد صحيح و$0{,}1515\\ldots$ دوري.', '$\\sqrt{16}=4$ is an integer; $0{,}1515\\ldots$ is recurring.'), math: same('$0{,}\\overline{15}=\\frac{15}{99}$') },
            { title: say('Irrazionalak', 'Irracionales', 'غير نسبية', 'Irrational numbers'), text: say('$2{,}4494\\ldots$-k ez du periodorik; 21 ez da karratu perfektua.', '$2{,}4494\\ldots$ no tiene periodo; 21 no es cuadrado perfecto.', '$2{,}4494\\ldots$ لا دور له و21 ليس مربعًا كاملًا.', '$2{,}4494\\ldots$ has no recurring part; 21 is not a perfect square.'), math: same('$\\sqrt{21}=4{,}5825\\ldots$') },
            { title: say('Kontuz', 'Cuidado', 'انتبه', 'Be careful'), text: say('Hamartar infinitu guztiak ez dira irrazionalak: periodikoak arrazionalak dira.', 'No todos los decimales infinitos son irracionales: los periódicos son racionales.', 'ليست كل الأعداد العشرية غير المنتهية غير نسبية: الدورية نسبية.', 'Not all infinite decimals are irrational: recurring decimals are rational.') }
        ],
        takeaway: say('Irrazionala: hamartar infinituak eta periodorik gabe; ezin da zatiki gisa idatzi.', 'Irracional: infinitos decimales sin periodo; no se puede escribir como fracción.', 'غير النسبي: منازل عشرية لا نهائية بلا دور؛ لا يُكتب كسرًا.', 'Irrational: infinitely many decimal places with no recurring part; it cannot be written as a fraction.'),
        figure: (language) => <IrrationalFigure language={language} />
    },
    {
        id: 'number-sets',
        stage: 'reals',
        figureAfterSteps: true,
        title: say('Zenbaki-multzoak: N, Z, Q eta R', 'Conjuntos numéricos: N, Z, Q y R', 'المجموعات العددية: N وZ وQ وR', 'Number sets: N, Z, Q and R'),
        goal: say('Zenbaki bat dagokion multzo guztietan sailkatzea.', 'Clasificar un número en todos los conjuntos a los que pertenece.', 'تصنيف عدد في كل المجموعات التي ينتمي إليها.', 'Classify a number into all the sets it belongs to.'),
        problem: say('Sailkatu: $-4$, $\\frac{13}{6}$, $\\sqrt{5}$, $2{,}\\overline{7}$, $1+\\sqrt{3}$, $152$, $\\pi$.', 'Clasifica: $-4$, $\\frac{13}{6}$, $\\sqrt{5}$, $2{,}\\overline{7}$, $1+\\sqrt{3}$, $152$, $\\pi$.', 'صنّف: $-4$ و$\\frac{13}{6}$ و$\\sqrt{5}$ و$2{,}\\overline{7}$ و$1+\\sqrt{3}$ و$152$ و$\\pi$.', 'Classify: $-4$, $\\frac{13}{6}$, $\\sqrt{5}$, $2{,}\\overline{7}$, $1+\\sqrt{3}$, $152$, $\\pi$.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Naturalak eta osoak', 'Naturales y enteros', 'طبيعية وصحيحة', 'Natural numbers and integers'), text: say('152 naturala da (eta osoa). −4 osoa da, baina ez naturala.', '152 es natural (y entero). −4 es entero, pero no natural.', '152 طبيعي (وصحيح). و−4 صحيح لكنه ليس طبيعيًا.', '152 is natural (and an integer). −4 is an integer, but not natural.'), math: '$152\\in\\mathbb{N}\\qquad -4\\in\\mathbb{Z}$' },
            { title: say('Arrazionalak (ez osoak)', 'Racionales (no enteros)', 'نسبية (غير صحيحة)', 'Rational (not integers)'), text: say('Zatikiak eta hamartar periodikoak.', 'Fracciones y decimales periódicos.', 'الكسور والأعداد العشرية الدورية.', 'Fractions and recurring decimals.'), math: same('$\\frac{13}{6},\\ 2{,}\\overline{7}=\\frac{25}{9}$') },
            { title: say('Irrazionalak', 'Irracionales', 'غير نسبية', 'Irrational numbers'), text: say('Periodorik gabeko hamartar infinituak.', 'Decimales infinitos sin periodo.', 'عشرية لا نهائية بلا دور.', 'Infinite decimals with no recurring part.'), math: '$\\sqrt{5},\\ 1+\\sqrt{3},\\ \\pi$' }
        ],
        takeaway: say('Arrazionalak + irrazionalak = errealak. Zenbaki bat multzo batean baino gehiagotan egon daiteke.', 'Racionales + irracionales = reales. Un número puede estar en varios conjuntos.', 'النسبية + غير النسبية = الحقيقية. وقد ينتمي العدد إلى عدة مجموعات.', 'Rational + irrational = real. A number can be in several sets.'),
        figure: (language) => <NumberSetsFigure language={language} />
    },
    {
        id: 'real-line',
        stage: 'reals',
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'pythagoras', title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } }],
        title: say('Zenbakiak zuzen errealean', 'Los números en la recta real', 'الأعداد على المستقيم الحقيقي', 'Numbers on the real number line'),
        goal: say('Zatikiak, hamartarrak eta $\\sqrt{n}$ motako erroak zuzen errealean adieraztea eta ordenatzea.', 'Representar y ordenar en la recta real fracciones, decimales y raíces del tipo $\\sqrt{n}$.', 'تمثيل الكسور والأعداد العشرية والجذور من النوع $\\sqrt{n}$ على المستقيم الحقيقي وترتيبها.', 'Represent and order fractions, decimals and roots of the form $\\sqrt{n}$ on the real number line.'),
        problem: say('Ordenatu txikienetik handienera: $\\sqrt{3}$, $\\frac{7}{4}$, $-\\frac{1}{2}$, $1{,}7$.', 'Ordena de menor a mayor: $\\sqrt{3}$, $\\frac{7}{4}$, $-\\frac{1}{2}$, $1{,}7$.', 'رتّب من الأصغر إلى الأكبر: $\\sqrt{3}$ و$\\frac{7}{4}$ و$-\\frac{1}{2}$ و$1{,}7$.', 'Put in order from smallest to largest: $\\sqrt{3}$, $\\frac{7}{4}$, $-\\frac{1}{2}$, $1{,}7$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi denak hamartar gisa.', 'Escríbelos todos como decimales.', 'اكتبها كلها أعدادًا عشرية.', 'Write them all as decimals.'), math: same('$\\sqrt{3}=1{,}732\\ldots\\quad \\frac{7}{4}=1{,}75\\quad -\\frac{1}{2}=-0{,}5$') },
            { text: say('Negatiboa da txikiena.', 'El negativo es el menor.', 'السالب هو الأصغر.', 'The negative one is the smallest.'), math: same('$-0{,}5<1{,}7$') },
            { text: say('Konparatu hamarrenak eta ehunenak.', 'Compara décimas y centésimas.', 'قارن الأعشار والأجزاء من مئة.', 'Compare tenths and hundredths.'), math: same('$-\\frac{1}{2}<1{,}7<\\sqrt{3}<\\frac{7}{4}$') }
        ],
        takeaway: say('Zuzen errealean ez dago hutsunerik: zenbaki erreal bakoitza puntu bat da.', 'En la recta real no hay huecos: cada número real es un punto.', 'لا فراغات في المستقيم الحقيقي: كل عدد حقيقي نقطة.', 'There are no gaps on the real number line: every real number is a point.'),
        figure: (language) => <RealLineFigure language={language} />
    },
    {
        id: 'intervals',
        stage: 'reals',
        title: say('Tarteak eta zuzenerdiak', 'Intervalos y semirrectas', 'الفترات وأنصاف المستقيمات', 'Intervals and half-lines'),
        goal: say('Zuzen errealeko zatiak tarte, desberdintza eta irudi gisa adieraztea.', 'Expresar tramos de la recta real como intervalo, desigualdad y dibujo.', 'التعبير عن أجزاء المستقيم الحقيقي بفترة ومتباينة ورسم.', 'Express sections of the real number line as an interval, an inequality and a drawing.'),
        problem: say('Idatzi tarte gisa: a) 5 eta 6 artean, biak barne; b) 7 baino handiagoak; c) −5 edo txikiagoak.', 'Escribe como intervalo: a) entre 5 y 6, ambos incluidos; b) mayores que 7; c) menores o iguales que −5.', 'اكتب على صورة فترة: أ) بين 5 و6 وكلاهما داخل؛ ب) أكبر من 7؛ ج) أصغر من أو تساوي −5.', 'Write as an interval: a) between 5 and 6, both included; b) greater than 7; c) less than or equal to −5.'),
        stepsKind: 'facts',
        steps: [
            { title: say('a) Biak barne', 'a) Ambos incluidos', 'أ) كلاهما داخل', 'a) Both ends included'), text: say('Kortxeteak bi aldeetan.', 'Corchetes en los dos lados.', 'قوسان معقوفان من الجهتين.', 'Square brackets on both sides.'), math: '$[5,\\,6]\\qquad 5\\le x\\le 6$' },
            { title: say('b) 7 baino handiagoak', 'b) Mayores que 7', 'ب) أكبر من 7', 'b) Greater than 7'), text: say('7 ez dago barne; ez dago amaierarik eskuinean.', 'El 7 no está incluido y no hay final por la derecha.', '7 ليس داخلًا ولا نهاية من اليمين.', 'The 7 is not included, and there is no end on the right.'), math: '$(7,\\,+\\infty)\\qquad x>7$' },
            { title: say('c) −5 edo txikiagoak', 'c) Menores o iguales que −5', 'ج) أصغر من أو تساوي −5', 'c) Less than or equal to −5'), text: say('−5 barne dago.', 'El −5 está incluido.', '−5 داخل.', 'The −5 is included.'), math: '$(-\\infty,\\,-5]\\qquad x\\le -5$' }
        ],
        takeaway: say('[ edo ] → barne (●). ( edo ) → kanpo (○). ∞ → beti parentesia.', '[ o ] → incluido (●). ( o ) → excluido (○). ∞ → siempre paréntesis.', '[ أو ] ← داخل (●). ( أو ) ← خارج (○). ∞ ← دائمًا قوس عادي.', '[ or ] → included (●). ( or ) → excluded (○). ∞ → always a round bracket.'),
        figure: (language) => <IntervalsFigure language={language} />
    },
    {
        id: 'rounding',
        stage: 'approx',
        figureAfterSteps: true,
        title: say('Trunkatzea eta biribiltzea', 'Truncamiento y redondeo', 'البتر والتقريب', 'Truncation and rounding'),
        goal: say('Zenbaki baten hurbilketa bat lortzea trunkatuz eta biribilduz, ordena jakin batera.', 'Obtener una aproximación de un número truncando y redondeando a un orden dado.', 'الحصول على تقريب لعدد بالبتر والتقريب إلى مرتبة معينة.', 'Get an approximation of a number by truncating and rounding to a given place value.'),
        problem: say('Trunkatu eta biribildu ehunenetara: $3{,}555$ eta $9{,}007$.', 'Trunca y redondea a las centésimas: $3{,}555$ y $9{,}007$.', 'ابتر وقرّب إلى الأجزاء من مئة: $3{,}555$ و$9{,}007$.', 'Truncate and round to hundredths: $3{,}555$ and $9{,}007$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Trunkatu: moztu ehunenen ondoren.', 'Truncar: corta después de las centésimas.', 'البتر: اقطع بعد الأجزاء من مئة.', 'Truncate: cut after the hundredths.'), math: same('$3{,}555\\to 3{,}55\\qquad 9{,}007\\to 9{,}00$') },
            { text: say('Biribildu $3{,}555$: kentzen den zifra 5 da → gehitu 1.', 'Redondear $3{,}555$: la cifra suprimida es 5 → suma 1.', 'قرّب $3{,}555$: الرقم المحذوف 5 ← أضف 1.', 'Round $3{,}555$: the digit removed is 5 → add 1.'), math: same('$3{,}555\\to 3{,}56$') },
            { text: say('Biribildu $9{,}007$: kentzen den zifra 7 da → gehitu 1.', 'Redondear $9{,}007$: la cifra suprimida es 7 → suma 1.', 'قرّب $9{,}007$: الرقم المحذوف 7 ← أضف 1.', 'Round $9{,}007$: the digit removed is 7 → add 1.'), math: same('$9{,}007\\to 9{,}01$') }
        ],
        takeaway: say('Trunkatu: moztu. Biribildu: 5 zifratik aurrera, gora.', 'Truncar: cortar. Redondear: de 5 en adelante, hacia arriba.', 'البتر: القطع. التقريب: من 5 فما فوق إلى الأعلى.', 'Truncate: cut. Round: 5 or more, round up.'),
        figure: (language) => <RoundingFigure language={language} />
    },
    {
        id: 'errors',
        stage: 'approx',
        title: say('Errore absolutua eta erlatiboa', 'Error absoluto y error relativo', 'الخطأ المطلق والخطأ النسبي', 'Absolute error and relative error'),
        goal: say('Hurbilketa baten errore absolutua eta erlatiboa kalkulatzea eta konparatzea.', 'Calcular y comparar el error absoluto y el error relativo de una aproximación.', 'حساب الخطأ المطلق والنسبي لتقريب ومقارنتهما.', 'Calculate and compare the absolute error and the relative error of an approximation.'),
        problem: say('Julia 10 ml hartu ditu, benetan $\\frac{125}{11}$ ml hartu behar zituenean. Kalkulatu erroreak.', 'Julia ha tomado 10 ml cuando en realidad debía tomar $\\frac{125}{11}$ ml. Calcula los errores.', 'أخذت خوليا 10 مل بينما كان عليها أن تأخذ $\\frac{125}{11}$ مل. احسب الخطأين.', 'Julia has taken 10 ml when in reality she should have taken $\\frac{125}{11}$ ml. Calculate the errors.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Balio erreala hamartar gisa.', 'El valor real como decimal.', 'القيمة الحقيقية عددًا عشريًا.', 'The real value as a decimal.'), math: same('$\\frac{125}{11}=11{,}\\overline{36}\\approx 11{,}36$') },
            { text: say('Errore absolutua.', 'Error absoluto.', 'الخطأ المطلق.', 'Absolute error.'), math: same('$E_a=|11{,}36-10|=1{,}36\\ \\text{ml}$') },
            { text: say('Errore erlatiboa: zatitu balio errealaz.', 'Error relativo: divide entre el valor real.', 'الخطأ النسبي: اقسم على القيمة الحقيقية.', 'Relative error: divide by the real value.'), math: same('$E_r=\\frac{1{,}36}{11{,}36}\\approx 0{,}12\\to 12\\,\\%$') }
        ],
        takeaway: say('$E_a$: zenbat huts egin den. $E_r$: zein garrantzitsua den hutsegite hori.', '$E_a$: cuánto nos equivocamos. $E_r$: qué importancia tiene ese error.', '$E_a$: مقدار الخطأ. $E_r$: أهمية ذلك الخطأ.', '$E_a$: how much we got it wrong. $E_r$: how important that error is.'),
        figure: (language) => <ErrorsFigure language={language} />
    },
    {
        id: 'scientific',
        stage: 'approx',
        needs: [{ unit: 'dbh3/potencias-raices', topic: 'negative-zero', title: { eu: 'Berretzaile zero eta negatiboa', es: 'Exponente cero y negativo', en: 'Zero and negative exponents', ar: 'الأس صفر والأس السالب' } }],
        title: say('Idazkera zientifikoa', 'Notación científica', 'الترميز العلمي', 'Scientific notation'),
        goal: say('Zenbaki oso handiak eta oso txikiak idazkera zientifikoan idaztea eta irakurtzea.', 'Escribir y leer en notación científica números muy grandes y muy pequeños.', 'كتابة الأعداد الكبيرة جدًا والصغيرة جدًا بالترميز العلمي وقراءتها.', 'Write and read very large and very small numbers in scientific notation.'),
        problem: say('Idatzi idazkera zientifikoan: $51\\,270\\,000\\,000\\,000$ eta $0{,}0000000001846$.', 'Escribe en notación científica: $51\\,270\\,000\\,000\\,000$ y $0{,}0000000001846$.', 'اكتب بالترميز العلمي: $51\\,270\\,000\\,000\\,000$ و$0{,}0000000001846$.', 'Write in scientific notation: $51\\,270\\,000\\,000\\,000$ and $0{,}0000000001846$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Koma 5 zifraren ondoren jarri: 13 jauzi ezkerrera.', 'Pon la coma detrás del 5: 13 saltos a la izquierda.', 'ضع الفاصلة بعد 5: 13 قفزة إلى اليسار.', 'Put the decimal point after the 5: 13 places to the left.'), math: same('$5{,}127\\cdot 10^{13}$') },
            { text: say('Bigarrenean, koma 1 zifraren ondoren: 10 jauzi eskuinera.', 'En el segundo, la coma detrás del 1: 10 saltos a la derecha.', 'في الثاني الفاصلة بعد 1: 10 قفزات إلى اليمين.', 'In the second one, the decimal point goes after the 1: 10 places to the right.'), math: same('$1{,}846\\cdot 10^{-10}$') },
            { text: say('Egiaztatu: $a$-k zifra bakarra du komaren aurretik.', 'Comprueba: $a$ tiene una sola cifra delante de la coma.', 'تحقق: لـ $a$ رقم واحد قبل الفاصلة.', 'Check: $a$ has only one digit before the decimal point.'), math: same('$1\\le 5{,}127<10$') }
        ],
        takeaway: say('Handia → $n$ positiboa. Txikia (0 eta 1 artean) → $n$ negatiboa.', 'Grande → $n$ positivo. Pequeño (entre 0 y 1) → $n$ negativo.', 'كبير ← $n$ موجب. صغير (بين 0 و1) ← $n$ سالب.', 'Large → $n$ positive. Small (between 0 and 1) → $n$ negative.'),
        figure: (language) => <ScientificFigure language={language} />
    },
    {
        id: 'scientific-ops',
        stage: 'approx',
        needs: [{ unit: 'dbh3/potencias-raices', topic: 'power-rules', title: { eu: 'Berreturen propietateak', es: 'Propiedades de las potencias', en: 'Properties of powers', ar: 'خصائص القوى' } }],
        title: say('Eragiketak idazkera zientifikoan', 'Operaciones en notación científica', 'العمليات بالترميز العلمي', 'Operations in scientific notation'),
        goal: say('Idazkera zientifikoan dauden zenbakiak biderkatzea eta zatitzea, emaitza egokituz.', 'Multiplicar y dividir números en notación científica ajustando el resultado.', 'ضرب الأعداد المكتوبة بالترميز العلمي وقسمتها مع ضبط النتيجة.', 'Multiply and divide numbers in scientific notation, adjusting the result.'),
        problem: same('$(1{,}59\\cdot 10^{17}):(4{,}97\\cdot 10^{13})$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu hamartarrak (biribilduta).', 'Divide los decimales (redondeando).', 'اقسم العددين العشريين (مع التقريب).', 'Divide the decimals (rounding).'), math: same('$1{,}59:4{,}97\\approx 0{,}32$') },
            { text: say('Kendu berretzaileak.', 'Resta los exponentes.', 'اطرح الأسس.', 'Subtract the exponents.'), math: '$10^{17-13}=10^{4}$' },
            { text: say('Egokitu: 0,32 < 1 → koma eskuinera eta berretzaileari 1 kendu.', 'Ajusta: 0,32 < 1 → coma a la derecha y resta 1 al exponente.', 'اضبط: 0.32 < 1 ← الفاصلة إلى اليمين واطرح 1 من الأس.', 'Adjust: 0.32 < 1 → move the decimal point to the right and subtract 1 from the exponent.'), math: same('$0{,}32\\cdot 10^{4}=3{,}2\\cdot 10^{3}$') }
        ],
        takeaway: say('Biderkatu → berretzaileak batu. Zatitu → kendu. Azkenean, $1\\le a<10$.', 'Multiplicar → sumar exponentes. Dividir → restar. Al final, $1\\le a<10$.', 'الضرب ← جمع الأسس. القسمة ← طرحها. وفي النهاية $1\\le a<10$.', 'Multiply → add the exponents. Divide → subtract them. At the end, $1\\le a<10$.'),
        figure: (language) => <ScientificOpsFigure language={language} />
    },
    {
        id: 'roots',
        stage: 'radicals',
        figureAfterSteps: true,
        title: say('Erroak eta berretzaile zatikiak', 'Raíces y exponentes fraccionarios', 'الجذور والأسس الكسرية', 'Roots and fractional exponents'),
        goal: say('Erroak kalkulatzea eta erradikalak berretzaile zatikidun berretura gisa idaztea.', 'Calcular raíces y escribir radicales como potencias de exponente fraccionario.', 'حساب الجذور وكتابة الجذريات على صورة قوى ذات أس كسري.', 'Calculate roots and write radicals as powers with fractional exponents.'),
        problem: same('$8^{\\frac{2}{3}}\\qquad 64^{\\frac{5}{6}}\\qquad \\sqrt[4]{625}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi oinarria berretura gisa: $8=2^{3}$.', 'Escribe la base como potencia: $8=2^{3}$.', 'اكتب الأساس قوةً: $8=2^{3}$.', 'Write the base as a power: $8=2^{3}$.'), math: '$8^{\\frac{2}{3}}=(2^{3})^{\\frac{2}{3}}=2^{2}=4$' },
            { text: say('Gauza bera $64=2^{6}$ rekin.', 'Lo mismo con $64=2^{6}$.', 'الشيء نفسه مع $64=2^{6}$.', 'The same with $64=2^{6}$.'), math: '$64^{\\frac{5}{6}}=(2^{6})^{\\frac{5}{6}}=2^{5}=32$' },
            { text: say('$625=5^{4}$.', '$625=5^{4}$.', '$625=5^{4}$.', '$625=5^{4}$.'), math: '$\\sqrt[4]{625}=\\sqrt[4]{5^{4}}=5$' }
        ],
        takeaway: say('$a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$: behekoa indizea, goikoa berretzailea.', '$a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$: el de abajo es el índice; el de arriba, el exponente.', '$a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$: السفلي هو الدليل والعلوي هو الأس.', '$a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$: the bottom number is the index; the top number is the exponent.'),
        figure: (language) => <RootsFigure language={language} />
    },
    {
        id: 'radical-simplify',
        stage: 'radicals',
        title: say('Erradikalak sinplifikatu eta faktoreak atera', 'Simplificar radicales y extraer factores', 'تبسيط الجذريات وإخراج العوامل', 'Simplify radicals and take out factors'),
        goal: say('Erradikal bat sinplifikatzea eta errotik faktoreak ateratzea.', 'Simplificar un radical y extraer factores de la raíz.', 'تبسيط جذري وإخراج عوامل من الجذر.', 'Simplify a radical and take factors out of the root.'),
        problem: same('$\\sqrt{200}\\qquad \\sqrt{300}\\qquad \\sqrt[3]{16}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('$200=2^{2}\\cdot 5^{2}\\cdot 2$: bi bikote ateratzen dira.', '$200=2^{2}\\cdot 5^{2}\\cdot 2$: salen dos parejas.', '$200=2^{2}\\cdot 5^{2}\\cdot 2$: يخرج زوجان.', '$200=2^{2}\\cdot 5^{2}\\cdot 2$: two pairs come out.'), math: '$\\sqrt{200}=2\\cdot 5\\sqrt{2}=10\\sqrt{2}$' },
            { text: say('$300=2^{2}\\cdot 5^{2}\\cdot 3$.', '$300=2^{2}\\cdot 5^{2}\\cdot 3$.', '$300=2^{2}\\cdot 5^{2}\\cdot 3$.', '$300=2^{2}\\cdot 5^{2}\\cdot 3$.'), math: '$\\sqrt{300}=10\\sqrt{3}$' },
            { text: say('Erro kubikoan, hiruko taldeak: $16=2^{3}\\cdot 2$.', 'En la raíz cúbica, grupos de tres: $16=2^{3}\\cdot 2$.', 'في الجذر التكعيبي مجموعات من ثلاثة: $16=2^{3}\\cdot 2$.', 'For a cube root, groups of three: $16=2^{3}\\cdot 2$.'), math: '$\\sqrt[3]{16}=2\\sqrt[3]{2}$' }
        ],
        takeaway: say('Deskonposatu, egin $n$-ko taldeak eta atera talde bakoitzetik faktore bat.', 'Descompón, haz grupos de $n$ y saca un factor por cada grupo.', 'حلّل وكوّن مجموعات من $n$ وأخرج عاملًا من كل مجموعة.', 'Break it down, make groups of $n$ and take out one factor for each group.'),
        figure: (language) => <SimplifyFigure language={language} />
    },
    {
        id: 'radical-ops',
        stage: 'radicals',
        title: say('Eragiketak erradikalekin', 'Operaciones con radicales', 'العمليات على الجذريات', 'Operations with radicals'),
        goal: say('Erradikalak biderkatzea, zatitzea eta batzea, eta izendatzaileko erroa kentzea.', 'Multiplicar, dividir y sumar radicales, y suprimir la raíz del denominador.', 'ضرب الجذريات وقسمتها وجمعها وإزالة الجذر من المقام.', 'Multiply, divide and add radicals, and remove the root from the denominator.'),
        problem: same('$\\sqrt{20}+\\sqrt{45}-\\sqrt{80}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Atera faktoreak erradikal bakoitzetik.', 'Extrae factores de cada radical.', 'أخرج العوامل من كل جذري.', 'Take factors out of each radical.'), math: '$\\sqrt{20}=2\\sqrt{5}\\quad \\sqrt{45}=3\\sqrt{5}\\quad \\sqrt{80}=4\\sqrt{5}$' },
            { text: say('Orain antzekoak dira: batu koefizienteak.', 'Ahora son semejantes: suma los coeficientes.', 'الآن هي متشابهة: اجمع المعاملات.', 'Now they are like radicals: add the coefficients.'), math: '$(2+3-4)\\sqrt{5}$' },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: '$=\\sqrt{5}$' }
        ],
        takeaway: say('Biderkatu: errokizunak elkartu. Batu: antzekoak soilik. Izendatzailean erroa: arrazionalizatu.', 'Multiplicar: juntar radicandos. Sumar: solo semejantes. Raíz en el denominador: racionalizar.', 'الضرب: اجمع ما تحت الجذور. الجمع: للمتشابهة فقط. جذر في المقام: أنطِق المقام.', 'Multiply: combine the radicands. Add: only like radicals. Root in the denominator: rationalise.'),
        figure: (language) => <RadicalOpsFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const realsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...realsLessonTexts[topic.id as RealsTopicId], ...realsLessonChecks[topic.id as RealsTopicId] }))

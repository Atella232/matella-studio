import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AddFigure, AreaFigure, EquivalenceFigure, FractionOfFigure, MeaningFigure, OrderFigure, SimplifyFigure } from '../dbh2-zatikiak-prototype/figures'
import { DecimalKindsFigure, ExactFractionFigure, FractionOpsFigure, PeriodicFractionFigure } from '../dbh4-aplikatuak-errealak/figures'
import { OrderDensityFigure } from '../dbh4-akademikoak-errealak/figures'
import { RemainingFigure, ThalesLineFigure, WholeFigure } from './figures'
import { rationalsLessonChecks, type RationalsTopicId } from './lessonChecks'
import { rationalsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Zenbaki arrazionalak · 3. DBH — stages and lessons. Sequence follows the
   class textbook (Santillana 3.º ESO unit 1, "Números racionales"):
   fractions and equivalence, simplifying, comparing and the number line,
   operations and their order, decimal expressions and the generating
   fraction, and problems. Many figures are shared with the fractions unit
   of 2. DBH and the real numbers units of 4. DBH.
   ========================================================================== */

export type RationalsStageId = 'fractions' | 'order' | 'operations' | 'decimals' | 'problems'

export const rationalsStages: UnitStage[] = [
    { id: 'fractions', tone: 'blue', title: { eu: 'Zatikiak eta baliokidetasuna', es: 'Fracciones y equivalencia', en: 'Fractions and equivalence', ar: 'الكسور والتكافؤ' } },
    { id: 'order', tone: 'violet', title: { eu: 'Ordena eta zuzena', es: 'Orden y recta', en: 'Order and number line', ar: 'الترتيب والمستقيم' } },
    { id: 'operations', tone: 'mustard', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' } },
    { id: 'decimals', tone: 'coral', title: { eu: 'Hamartarrak eta zatiki sortzailea', es: 'Decimales y fracción generatriz', en: 'Decimals and generating fraction', ar: 'العشريات والكسر المولّد' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' } }
]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'rational-meaning',
        stage: 'fractions',
        title: say('Zatikiak eta zenbaki arrazionalak', 'Fracciones y números racionales', 'الكسور والأعداد النسبية', 'Fractions and rational numbers'),
        goal: say('Zatiki batek zer adierazten duen ulertzea eta zenbaki arrazionalak ezagutzea.', 'Entender qué expresa una fracción y reconocer los números racionales.', 'فهم ما يعبّر عنه الكسر والتعرف على الأعداد النسبية.', 'Understand what a fraction expresses and recognise rational numbers.'),
        needs: [{ unit: 'dbh2/numeros-enteros', topic: 'integer-set', title: { eu: 'ℤ multzoa eta zenbakizko zuzena', es: 'El conjunto ℤ y la recta numérica', en: 'The set ℤ and the number line', ar: 'المجموعة ℤ وخط الأعداد' } }],
        stepsKind: 'facts',
        steps: [
            { text: say('Zatiki baten zeinua: zeinu bereko gaiak → positiboa; desberdinak → negatiboa.', 'El signo de una fracción: términos del mismo signo → positiva; de distinto signo → negativa.', 'إشارة الكسر: حدّان بالإشارة نفسها ← موجب؛ مختلفان ← سالب.', 'The sign of a fraction: terms with the same sign → positive; with different signs → negative.'), math: same('$\\frac{-6}{-5}=\\frac{6}{5}\\qquad\\frac{-6}{5}=-\\frac{6}{5}$') },
            { text: say('Zenbaki osoa: izendatzailea 1, edo beste edozein.', 'Un entero: denominador 1, o cualquier otro.', 'العدد الصحيح: المقام 1 أو أي مقام آخر.', 'An integer as a fraction: denominator 1, or any other.'), math: same('$-2=\\frac{-2}{1}=\\frac{-10}{5}$') },
            { text: say('Zatiki inpropioa: zenbakitzailea handiagoa; zenbaki misto gisa idatz daiteke.', 'Fracción impropia: numerador mayor; se puede escribir como número mixto.', 'الكسر غير الحقيقي: البسط أكبر؛ ويمكن كتابته عددًا كسريًا.', 'Improper fraction: the numerator is bigger than the denominator; it can be written as a mixed number.'), math: same('$\\frac{17}{5}=3+\\frac{2}{5}$') }
        ],
        takeaway: say('Zenbaki arrazionala: zatiki gisa idatz daitekeena, positiboa edo negatiboa.', 'Número racional: el que se puede escribir como fracción, positivo o negativo.', 'العدد النسبي: ما يمكن كتابته كسرًا، موجبًا أو سالبًا.', 'Rational number: any number that can be written as a fraction, positive or negative.'),
        figure: (language) => <MeaningFigure language={language} />
    },
    {
        id: 'equivalent',
        stage: 'fractions',
        title: say('Zatiki baliokideak', 'Fracciones equivalentes', 'الكسور المتكافئة', 'Equivalent fractions'),
        goal: say('Bi zatiki baliokideak diren jakitea eta gai ezezagun bat kalkulatzea.', 'Saber si dos fracciones son equivalentes y calcular un término desconocido.', 'معرفة ما إذا كان كسران متكافئين وحساب حد مجهول.', 'Know whether two fractions are equivalent and work out an unknown term.'),
        problem: say('$\\frac{-6}{5}$ eta $\\frac{-18}{15}$ baliokideak dira?', '¿Son equivalentes $\\frac{-6}{5}$ y $\\frac{-18}{15}$?', 'هل $\\frac{-6}{5}$ و$\\frac{-18}{15}$ متكافئان؟', 'Are $\\frac{-6}{5}$ and $\\frac{-18}{15}$ equivalent?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen gurutzeko biderkadura.', 'Primer producto cruzado.', 'حاصل الضرب التبادلي الأول.', 'First cross product.'), math: same('$-6\\cdot 15=-90$') },
            { text: say('Bigarrena.', 'El segundo.', 'الثاني.', 'The second one.'), math: same('$5\\cdot(-18)=-90$') },
            { text: say('Berdinak dira: baliokideak.', 'Son iguales: son equivalentes.', 'متساويان: الكسران متكافئان.', 'They are equal: they are equivalent.'), math: same('$\\frac{-6}{5}=\\frac{-18}{15}$') }
        ],
        takeaway: say('Baliokideak ⇔ gurutzeko biderkadurak berdinak.', 'Equivalentes ⇔ productos cruzados iguales.', 'متكافئان ⇔ حاصلا الضرب التبادلي متساويان.', 'Equivalent ⇔ equal cross products.'),
        figure: (language) => <EquivalenceFigure language={language} />
    },
    {
        id: 'simplify',
        stage: 'fractions',
        title: say('Anplifikatu, sinplifikatu eta zatiki laburtezina', 'Amplificar, simplificar y fracción irreducible', 'التوسيع والاختزال والكسر غير القابل للاختزال', 'Amplifying, simplifying and the simplest form'),
        goal: say('Zatiki baten zatiki laburtezina aurkitzea, z.k.h. erabiliz.', 'Hallar la fracción irreducible de una fracción usando el m.c.d.', 'إيجاد الكسر غير القابل للاختزال باستعمال القاسم المشترك الأكبر.', 'Find the simplest form of a fraction using the GCD.'),
        needs: [{ unit: 'dbh2/divisibilidad', topic: 'gcd', title: { eu: 'Zatitzaile komunetako handiena (ZKH)', es: 'Máximo común divisor (m.c.d.)', en: 'Greatest common divisor (GCD)', ar: 'القاسم المشترك الأكبر (ق.م.أ · ZKH)' } }],
        problem: say('Lortu $\\frac{105}{126}$ zatikiaren zatiki laburtezina.', 'Obtén la fracción irreducible de $\\frac{105}{126}$.', 'جد الكسر غير القابل للاختزال لـ $\\frac{105}{126}$.', 'Find the simplest form of $\\frac{105}{126}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deskonposatu.', 'Descompón.', 'حلّل.', 'Find the prime factorisation.'), math: same('$105=3\\cdot 5\\cdot 7\\qquad 126=2\\cdot 3^{2}\\cdot 7$') },
            { text: say('Faktore komunak, berretzaile txikienarekin.', 'Factores comunes con el menor exponente.', 'العوامل المشتركة بأصغر أس.', 'Common factors with the smallest exponent.'), math: same('$3\\cdot 7=21$') },
            { text: say('Zatitu bi gaiak 21 zenbakiaz.', 'Divide los dos términos entre 21.', 'اقسم الحدين على 21.', 'Divide both terms by 21.'), math: same('$\\frac{105:21}{126:21}=\\frac{5}{6}$') }
        ],
        takeaway: say('Zatitu z.k.h.-z: zatiki laburtezina pauso bakarrean.', 'Divide entre el m.c.d.: la fracción irreducible en un paso.', 'اقسم على ق.م.أ.: الكسر غير القابل للاختزال بخطوة واحدة.', 'Divide by the GCD: the simplest form in one step.'),
        figure: (language) => <SimplifyFigure language={language} />
    },
    {
        id: 'compare',
        stage: 'order',
        title: say('Zatikiak konparatu eta ordenatu', 'Comparar y ordenar fracciones', 'مقارنة الكسور وترتيبها', 'Comparing and ordering fractions'),
        goal: say('Zatikiak, negatiboak barne, izendatzaile komunaren bidez ordenatzea.', 'Ordenar fracciones, también negativas, reduciéndolas a común denominador.', 'ترتيب الكسور، والسالبة منها، بتوحيد المقامات.', 'Order fractions, including negative ones, by reducing them to a common denominator.'),
        needs: [{ unit: 'dbh2/divisibilidad', topic: 'lcm', title: { eu: 'Multiplo komunetako txikiena (MKT)', es: 'Mínimo común múltiplo (m.c.m.)', en: 'Least common multiple (LCM)', ar: 'المضاعف المشترك الأصغر (م.م.أ · MKT)' } }],
        problem: say('Ordenatu txikienetik handienera: $\\frac{2}{7}$, $\\frac{1}{6}$ eta $\\frac{3}{5}$.', 'Ordena de menor a mayor: $\\frac{2}{7}$, $\\frac{1}{6}$ y $\\frac{3}{5}$.', 'رتّب من الأصغر إلى الأكبر: $\\frac{2}{7}$ و$\\frac{1}{6}$ و$\\frac{3}{5}$.', 'Order from smallest to largest: $\\frac{2}{7}$, $\\frac{1}{6}$ and $\\frac{3}{5}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('m.k.t.(7, 6, 5) = 210.', 'm.c.m.(7, 6, 5) = 210.', 'م.م.أ.(7، 6، 5) = 210.', 'LCM(7, 6, 5) = 210.'), math: same('$\\begin{gathered}\\frac{2}{7}=\\frac{60}{210}\\\\ \\frac{1}{6}=\\frac{35}{210}\\\\ \\frac{3}{5}=\\frac{126}{210}\\end{gathered}$') },
            { text: say('Konparatu zenbakitzaileak.', 'Compara los numeradores.', 'قارن البسوط.', 'Compare the numerators.'), math: same('$35<60<126$') },
            { text: say('Ordena.', 'El orden.', 'الترتيب.', 'The order.'), math: same('$\\frac{1}{6}<\\frac{2}{7}<\\frac{3}{5}$') }
        ],
        takeaway: say('Izendatzaile bera jarri eta konparatu zenbakitzaileak; negatiboetan, alderantziz.', 'Pon el mismo denominador y compara numeradores; en los negativos, al revés.', 'وحّد المقام وقارن البسوط؛ وفي السالبة بالعكس.', 'Give them the same denominator and compare the numerators; with negatives, do it the other way round.'),
        figure: (language) => <OrderFigure language={language} />
    },
    {
        id: 'line',
        stage: 'order',
        title: say('Zatikiak zuzenean', 'Fracciones en la recta', 'الكسور على المستقيم', 'Fractions on the number line'),
        goal: say('Zatiki bat, negatiboa izan arren, zuzenean zehatz kokatzea.', 'Situar exactamente una fracción, también negativa, en la recta.', 'وضع كسر، ولو كان سالبًا، بدقة على المستقيم.', 'Place a fraction exactly on the number line, including negative fractions.'),
        needs: [{ unit: 'dbh2/zatikiak', topic: 'representation', title: { eu: 'Zatiki propioak, inpropioak eta mistoak', es: 'Fracciones propias, impropias y mixtas', en: 'Proper, improper and mixed fractions', ar: 'الكسور الحقيقية وغير الحقيقية والأعداد الكسرية' } }],
        problem: say('Kokatu $\\frac{25}{8}$ zuzenean.', 'Sitúa $\\frac{25}{8}$ en la recta.', 'ضع $\\frac{25}{8}$ على المستقيم.', 'Place $\\frac{25}{8}$ on the number line.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati osoa: 25 : 8 = 3, hondarra 1.', 'Parte entera: 25 : 8 = 3, resto 1.', 'الجزء الصحيح: 25 : 8 = 3 والباقي 1.', 'Whole-number part: 25 ÷ 8 = 3, remainder 1.'), math: same('$\\frac{25}{8}=3+\\frac{1}{8}$') },
            { text: say('3 eta 4 artean, 8 zatitan banatuta.', 'Entre 3 y 4, dividido en 8 partes.', 'بين 3 و4 مقسومًا إلى 8 أجزاء.', 'Between 3 and 4, divided into 8 parts.'), math: same('$3<\\frac{25}{8}<4$') },
            { text: say('Hartu lehen zatia.', 'Toma la primera parte.', 'خذ الجزء الأول.', 'Take the first part.'), math: same('$\\frac{25}{8}=3{,}125$') }
        ],
        takeaway: say('Zati osoa lehenik, gero zatitu tartea izendatzaileak adina zatitan.', 'Primero la parte entera; después divide el tramo en tantas partes como el denominador.', 'الجزء الصحيح أولًا، ثم قسّم المجال أجزاء بعدد المقام.', 'First the whole-number part; then divide the segment into as many parts as the denominator.'),
        figure: (language) => <ThalesLineFigure language={language} />
    },
    {
        id: 'between',
        stage: 'order',
        title: say('Bi zatikiren arteko zatikiak', 'Fracciones entre dos fracciones', 'كسور بين كسرين', 'Fractions between two fractions'),
        goal: say('Bi zatikiren artean beste bat aurkitzea: arrazionalen dentsitatea.', 'Encontrar una fracción entre otras dos: la densidad de los racionales.', 'إيجاد كسر بين كسرين: كثافة الأعداد النسبية.', 'Finding a fraction between two others: the density of the rational numbers.'),
        problem: say('Aurkitu $\\frac{4}{5}$ eta $\\frac{7}{8}$ arteko zatiki bat.', 'Encuentra una fracción entre $\\frac{4}{5}$ y $\\frac{7}{8}$.', 'جد كسرًا بين $\\frac{4}{5}$ و$\\frac{7}{8}$.', 'Find a fraction between $\\frac{4}{5}$ and $\\frac{7}{8}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu.', 'Suma.', 'اجمع.', 'Add.'), math: same('$\\frac{4}{5}+\\frac{7}{8}=\\frac{32+35}{40}=\\frac{67}{40}$') },
            { text: say('Zatitu 2 zenbakiaz.', 'Divide entre 2.', 'اقسم على 2.', 'Divide by 2.'), math: same('$\\frac{67}{40}:2=\\frac{67}{80}$') },
            { text: say('Egiaztatu.', 'Comprueba.', 'تحقق.', 'Check it.'), math: same('$\\frac{64}{80}<\\frac{67}{80}<\\frac{70}{80}$') }
        ],
        takeaway: say('Erdiko puntua: batu eta zatitu 2 zenbakiaz. Beti dago beste bat.', 'El punto medio: suma y divide entre 2. Siempre hay otra.', 'نقطة المنتصف: اجمع واقسم على 2. يوجد دائمًا كسر آخر.', 'The midpoint: add them and divide by 2. There is always another one.'),
        figure: (language) => <OrderDensityFigure language={language} />
    },
    {
        id: 'add-sub',
        stage: 'operations',
        title: say('Batuketa eta kenketa', 'Suma y resta', 'الجمع والطرح', 'Addition and subtraction'),
        goal: say('Zatikiak eta zenbaki osoak batu eta kentzea, zeinuak zainduz.', 'Sumar y restar fracciones y enteros cuidando los signos.', 'جمع الكسور والأعداد الصحيحة وطرحها مع مراعاة الإشارات.', 'Add and subtract fractions and integers, taking care with the signs.'),
        needs: [{ unit: 'dbh2/divisibilidad', topic: 'lcm', title: { eu: 'Multiplo komunetako txikiena (MKT)', es: 'Mínimo común múltiplo (m.c.m.)', en: 'Least common multiple (LCM)', ar: 'المضاعف المشترك الأصغر (م.م.أ · MKT)' } }],
        problem: same('$\\frac{25}{6}-\\frac{11}{8}+\\frac{1}{3}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('m.k.t.(6, 8, 3) = 24.', 'm.c.m.(6, 8, 3) = 24.', 'م.م.أ.(6، 8، 3) = 24.', 'LCM(6, 8, 3) = 24.'), math: same('$\\frac{100}{24}-\\frac{33}{24}+\\frac{8}{24}$') },
            { text: say('Eragin zenbakitzaileekin.', 'Opera los numeradores.', 'أجرِ العمليات على البسوط.', 'Calculate the numerators.'), math: same('$\\frac{100-33+8}{24}=\\frac{75}{24}$') },
            { text: say('Sinplifikatu 3 zenbakiaz.', 'Simplifica entre 3.', 'اختزل على 3.', 'Simplify by dividing by 3.'), math: same('$\\frac{75}{24}=\\frac{25}{8}$') }
        ],
        takeaway: say('Izendatzaile komuna lehenik; gero zenbakitzaileekin eragin.', 'Primero el denominador común; después opera los numeradores.', 'المقام المشترك أولًا ثم العمليات على البسوط.', 'First the common denominator; then calculate the numerators.'),
        figure: (language) => <AddFigure language={language} />
    },
    {
        id: 'mul-div',
        stage: 'operations',
        title: say('Biderketa eta zatiketa', 'Multiplicación y división', 'الضرب والقسمة', 'Multiplication and division'),
        goal: say('Zatikiak biderkatu eta zatitzea, sinplifikatuz eta zeinuak zainduz.', 'Multiplicar y dividir fracciones simplificando y cuidando los signos.', 'ضرب الكسور وقسمتها مع الاختزال ومراعاة الإشارات.', 'Multiply and divide fractions, simplifying and taking care with the signs.'),
        needs: [{ unit: 'dbh2/numeros-enteros', topic: 'multiply-divide', title: { eu: 'Biderketa eta zatiketa: zeinuen araua', es: 'Producto y cociente: regla de los signos', en: 'Product and quotient: rule of signs', ar: 'الضرب والقسمة: قاعدة الإشارات' } }],
        problem: same('$\\frac{9}{12}\\cdot\\frac{4}{21}\\cdot\\frac{7}{33}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi zatiki bakarrean.', 'Escríbelo en una sola fracción.', 'اكتبه كسرًا واحدًا.', 'Write it as a single fraction.'), math: same('$\\frac{9\\cdot 4\\cdot 7}{12\\cdot 21\\cdot 33}$') },
            { text: say('Sinplifikatu faktoreak: 9 eta 33 (3), 4 eta 12 (4), 7 eta 21 (7).', 'Simplifica factores: 9 y 33 (3), 4 y 12 (4), 7 y 21 (7).', 'اختزل العوامل: 9 و33 (3)، 4 و12 (4)، 7 و21 (7).', 'Simplify common factors: 9 and 33 (3), 4 and 12 (4), 7 and 21 (7).'), math: same('$\\frac{3\\cdot 1\\cdot 1}{3\\cdot 3\\cdot 11}$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$\\frac{1}{33}$') }
        ],
        takeaway: say('Biderkatu zuzenean; zatitzeko, gurutzean. Sinplifikatu lehenik.', 'Multiplica en línea; para dividir, en cruz. Simplifica antes.', 'اضرب مباشرة؛ وللقسمة تبادليًا. اختزل أولًا.', 'Multiply straight across; to divide, cross-multiply. Simplify first.'),
        figure: (language) => <AreaFigure language={language} />
    },
    {
        id: 'combined',
        stage: 'operations',
        title: say('Eragiketa konbinatuak', 'Operaciones combinadas', 'العمليات المركبة', 'Combined operations'),
        goal: say('Eragiketa konbinatuak hierarkia errespetatuz ebaztea.', 'Resolver operaciones combinadas respetando la jerarquía.', 'حل العمليات المركبة مع احترام الأولويات.', 'Solve combined operations following the order of operations.'),
        needs: [{ unit: 'dbh2/numeros-enteros', topic: 'combined', title: { eu: 'Eragiketa konbinatuak eta kako zuzenak', es: 'Operaciones combinadas y corchetes', en: 'Combined operations and square brackets', ar: 'العمليات المركبة والأقواس المعقوفة' } }],
        problem: same('$\\frac{5}{3}:\\left(\\frac{1}{9}+\\frac{1}{6}\\right)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Parentesia: m.k.t. = 18.', 'El paréntesis: m.c.m. = 18.', 'القوس: م.م.أ. = 18.', 'The brackets: LCM = 18.'), math: same('$\\frac{1}{9}+\\frac{1}{6}=\\frac{2+3}{18}=\\frac{5}{18}$') },
            { text: say('Zatiketa: gurutzean.', 'La división: en cruz.', 'القسمة: تبادليًا.', 'The division: cross-multiply.'), math: same('$\\frac{5}{3}:\\frac{5}{18}=\\frac{5\\cdot 18}{3\\cdot 5}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$\\frac{90}{15}=6$') }
        ],
        takeaway: say('Parentesiak → biderketak eta zatiketak → batuketak eta kenketak.', 'Paréntesis → multiplicaciones y divisiones → sumas y restas.', 'الأقواس ← الضرب والقسمة ← الجمع والطرح.', 'Brackets → multiplications and divisions → additions and subtractions.'),
        figure: (language) => <FractionOpsFigure language={language} />
    },
    {
        id: 'decimal-kinds',
        stage: 'decimals',
        title: say('Zatikiak eta zenbaki hamartarrak', 'Fracciones y números decimales', 'الكسور والأعداد العشرية', 'Fractions and decimal numbers'),
        goal: say('Zatiki batek ematen duen hamartar mota sailkatzea, zatiketa egin gabe.', 'Clasificar el decimal que da una fracción sin hacer la división.', 'تصنيف العشري الذي يعطيه كسر دون إجراء القسمة.', 'Classify the decimal that a fraction gives without doing the division.'),
        needs: [{ unit: 'dbh2/divisibilidad', topic: 'factorization', title: { eu: 'Biderkagai lehenetan deskonposatzea', es: 'Descomposición en factores primos', en: 'Prime factorisation', ar: 'التحليل إلى عوامل أولية' } }],
        problem: say('Sailkatu, zatitu gabe: $\\frac{18}{300}$, $\\frac{7}{210}$ eta $\\frac{9}{40}$.', 'Clasifica sin dividir: $\\frac{18}{300}$, $\\frac{7}{210}$ y $\\frac{9}{40}$.', 'صنّف دون قسمة: $\\frac{18}{300}$ و$\\frac{7}{210}$ و$\\frac{9}{40}$.', 'Classify without dividing: $\\frac{18}{300}$, $\\frac{7}{210}$ and $\\frac{9}{40}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sinplifikatu eta deskonposatu.', 'Simplifica y descompón.', 'اختزل وحلّل.', 'Simplify and find the prime factorisation.'), math: same('$\\frac{18}{300}=\\frac{3}{50}=\\frac{3}{2\\cdot 5^{2}}$') },
            { text: say('2 eta 5 bakarrik: zehatza. Hurrengoa: 3 ere badu: periodikoa.', 'Solo 2 y 5: exacto. El siguiente tiene también un 3: periódico.', 'فقط 2 و5: منتهٍ. والتالي فيه 3 أيضًا: دوري.', 'Only 2 and 5: terminating. The next one also has a 3: recurring.'), math: same('$\\frac{7}{210}=\\frac{1}{30}=\\frac{1}{2\\cdot 3\\cdot 5}$') },
            { text: say('$40=2^{3}\\cdot 5$: zehatza.', '$40=2^{3}\\cdot 5$: exacto.', '$40=2^{3}\\cdot 5$: منتهٍ.', '$40=2^{3}\\cdot 5$: terminating.'), math: same('$\\frac{9}{40}=0{,}225$') }
        ],
        takeaway: say('Izendatzaile laburtezinean 2 eta 5 bakarrik → zehatza; bestela, periodikoa.', 'Denominador irreducible con solo 2 y 5 → exacto; si no, periódico.', 'مقام غير قابل للاختزال فيه 2 و5 فقط ← منتهٍ؛ وإلا فدوري.', 'Denominator of the simplest form with only 2s and 5s → terminating; if not, recurring.'),
        figure: (language) => <DecimalKindsFigure language={language} />
    },
    {
        id: 'exact-generatrix',
        stage: 'decimals',
        title: say('Hamartar zehatz baten zatikia', 'La fracción de un decimal exacto', 'كسر العشري المنتهي', 'The fraction of a terminating decimal'),
        goal: say('Hamartar zehatz baten zatiki sortzailea lortzea.', 'Obtener la fracción generatriz de un decimal exacto.', 'إيجاد الكسر المولّد لعشري منتهٍ.', 'Find the generating fraction of a terminating decimal.'),
        problem: say('Idatzi $35{,}47$ eta $0{,}375$ zatiki gisa.', 'Escribe $35{,}47$ y $0{,}375$ como fracción.', 'اكتب $35{,}47$ و$0{,}375$ كسرين.', 'Write $35{,}47$ and $0{,}375$ as fractions.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi hamartar → 100.', 'Dos decimales → 100.', 'منزلتان ← 100.', 'Two decimal places → 100.'), math: same('$35{,}47=\\frac{3547}{100}$') },
            { text: say('Hiru hamartar → 1000.', 'Tres decimales → 1000.', 'ثلاث منازل ← 1000.', 'Three decimal places → 1,000.'), math: same('$0{,}375=\\frac{375}{1000}$') },
            { text: say('Sinplifikatu 125 zenbakiaz.', 'Simplifica entre 125.', 'اختزل على 125.', 'Simplify by dividing by 125.'), math: same('$\\frac{375}{1000}=\\frac{3}{8}$') }
        ],
        takeaway: say('Komarik gabeko zenbakia zati 1 eta hamartar adina zero.', 'El número sin coma entre un 1 y tantos ceros como decimales.', 'العدد دون فاصلة على 1 وأصفار بعدد المنازل.', 'The number without the decimal point, over a 1 followed by as many zeros as decimal places.'),
        figure: (language) => <ExactFractionFigure language={language} />
    },
    {
        id: 'periodic-generatrix',
        stage: 'decimals',
        title: say('Hamartar periodiko baten zatikia', 'La fracción de un decimal periódico', 'كسر العشري الدوري', 'The fraction of a recurring decimal'),
        goal: say('Hamartar periodiko huts edo misto baten zatiki sortzailea lortzea.', 'Obtener la fracción generatriz de un decimal periódico puro o mixto.', 'إيجاد الكسر المولّد لعشري دوري بحت أو مختلط.', 'Find the generating fraction of a pure or mixed recurring decimal.'),
        problem: say('Idatzi $0{,}12\\overline{58}$ zatiki gisa.', 'Escribe $0{,}12\\overline{58}$ como fracción.', 'اكتب $0{,}12\\overline{58}$ كسرًا.', 'Write $0{,}12\\overline{58}$ as a fraction.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbakitzailea.', 'Numerador.', 'البسط.', 'Numerator.'), math: same('$1258-12=1246$') },
            { text: say('Periodoa 2 zifra (99), aurreperiodoa 2 zifra (00).', 'Periodo de 2 cifras (99), anteperiodo de 2 (00).', 'دور من رقمين (99) وجزء غير دوري من رقمين (00).', 'Repeating part of 2 digits (99), non-repeating part of 2 digits (00).'), math: same('$\\frac{1246}{9900}$') },
            { text: say('Sinplifikatu 2 zenbakiaz.', 'Simplifica entre 2.', 'اختزل على 2.', 'Simplify by dividing by 2.'), math: same('$\\frac{1246}{9900}=\\frac{623}{4950}$') }
        ],
        takeaway: say('Guztia ken periodoaren aurrekoa; 9 zifrak periodoarentzat, 0 zifrak aurreperiodoarentzat.', 'Todo menos lo anterior al periodo; nueves por el periodo, ceros por el anteperiodo.', 'الكل ناقص ما قبل الدور؛ تسعات للدور وأصفار لما قبله.', 'All of it minus the non-repeating part; nines for the repeating part, zeros for the non-repeating part.'),
        figure: (language) => <PeriodicFractionFigure language={language} />
    },
    {
        id: 'fraction-of',
        stage: 'problems',
        title: say('Kantitate baten zatikia', 'Fracción de una cantidad', 'كسر من كمية', 'Fraction of a quantity'),
        goal: say('Kantitate baten zatikia eta zatiki baten zatikia kalkulatzea.', 'Calcular la fracción de una cantidad y la fracción de una fracción.', 'حساب كسر من كمية وكسر من كسر.', 'Work out the fraction of a quantity and the fraction of a fraction.'),
        problem: say('Etxe batek 9600 kWh kontsumitzen ditu urtean, eta horren $\\frac{3}{5}$ berokuntzan. Zenbat kWh?', 'Una casa consume 9600 kWh al año, y $\\frac{3}{5}$ en calefacción. ¿Cuántos kWh?', 'يستهلك بيت 9600 ك.و.س في السنة، و$\\frac{3}{5}$ منها للتدفئة. كم ك.و.س؟', 'A house uses 9,600 kWh a year, and $\\frac{3}{5}$ of it is for heating. How many kWh go on heating?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu 5 zenbakiaz.', 'Divide entre 5.', 'اقسم على 5.', 'Divide by 5.'), math: same('$9600:5=1920$') },
            { text: say('Biderkatu 3 zenbakiaz.', 'Multiplica por 3.', 'اضرب في 3.', 'Multiply by 3.'), math: same('$1920\\cdot 3=5760$') }
        ],
        takeaway: say('"-ren" zatikia → biderkatu.', 'La fracción "de" → multiplica.', 'الكسر "من" ← اضرب.', 'A fraction “of” → multiply.'),
        figure: (language) => <FractionOfFigure language={language} />
    },
    {
        id: 'remaining',
        stage: 'problems',
        title: say('Geratzen den zatia', 'La parte que queda', 'الجزء الباقي', 'The part that is left'),
        goal: say('Zatiki jarraituak dituzten problemak ebaztea: gainerakoaren zatikia.', 'Resolver problemas de fracciones sucesivas: la fracción de lo que queda.', 'حل مسائل الكسور المتتالية: كسر الباقي.', 'Solve problems with successive fractions: the fraction of what is left.'),
        problem: say('Soldataren $\\frac{1}{3}$ alokairuan gastatzen da eta gainerakoaren $\\frac{1}{4}$ janarian. 1800 € badira, zenbat geratzen da?', 'Se gasta $\\frac{1}{3}$ del sueldo en el alquiler y $\\frac{1}{4}$ de lo que queda en comida. Si son 1800 €, ¿cuánto queda?', 'يُنفَق $\\frac{1}{3}$ من الراتب على الإيجار و$\\frac{1}{4}$ من الباقي على الطعام. إذا كان الراتب 1800 € فكم يبقى؟', '$\\frac{1}{3}$ of the salary is spent on rent and $\\frac{1}{4}$ of what is left is spent on food. If the salary is €1,800, how much is left?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alokairuaren ondoren geratzen dena.', 'Lo que queda tras el alquiler.', 'الباقي بعد الإيجار.', 'What is left after the rent.'), math: same('$1-\\frac{1}{3}=\\frac{2}{3}$') },
            { text: say('Janaria, osoarekiko.', 'La comida, respecto al total.', 'الطعام بالنسبة إلى الكل.', 'Food, as a fraction of the total.'), math: same('$\\frac{1}{4}\\cdot\\frac{2}{3}=\\frac{1}{6}$') },
            { text: say('Geratzen dena.', 'Lo que queda.', 'الباقي.', 'What is left.'), math: same('$\\begin{gathered}1-\\frac{1}{3}-\\frac{1}{6}=\\frac{1}{2}\\\\ \\to\\ \\frac{1}{2}\\cdot 1800=900\\end{gathered}$') }
        ],
        takeaway: say('"Gainerakoaren" zatikia: biderkatu geratzen den zatiaz.', 'La fracción "de lo que queda": multiplica por la parte que queda.', 'كسر "من الباقي": اضرب في الجزء الباقي.', 'The fraction “of what is left”: multiply by the part that is left.'),
        figure: (language) => <RemainingFigure language={language} />
    },
    {
        id: 'whole-from-part',
        stage: 'problems',
        title: say('Osoa zati batetik', 'El total a partir de una parte', 'الكل انطلاقًا من جزء', 'The total from one part'),
        goal: say('Zati bat eta haren zatikia ezagututa, osoa kalkulatzea.', 'Calcular el total conociendo una parte y su fracción.', 'حساب الكل بمعرفة جزء وكسره.', 'Work out the total when you know one part and its fraction.'),
        problem: say('Ur-depositu baten $\\frac{2}{7}$ hustu da eta 35 L geratzen dira. Zenbat litro sartzen dira depositu osoan?', 'Se ha vaciado $\\frac{2}{7}$ de un depósito y quedan 35 L. ¿Cuántos litros caben en el depósito?', 'أُفرغ $\\frac{2}{7}$ من خزان وبقي 35 لترًا. كم لترًا يتسع الخزان؟', '$\\frac{2}{7}$ of a tank has been emptied and 35 L are left. How many litres does the tank hold?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Geratzen den zatia.', 'La parte que queda.', 'الجزء الباقي.', 'The part that is left.'), math: same('$1-\\frac{2}{7}=\\frac{5}{7}$') },
            { text: say('Zazpiren bat.', 'Un séptimo.', 'سُبع واحد.', 'One seventh.'), math: same('$35:5=7$') },
            { text: say('Osoa.', 'El total.', 'الكل.', 'The total.'), math: same('$7\\cdot 7=49$') }
        ],
        takeaway: say('Zatitu zenbakitzaileaz, biderkatu izendatzaileaz.', 'Divide entre el numerador, multiplica por el denominador.', 'اقسم على البسط واضرب في المقام.', 'Divide by the numerator, multiply by the denominator.'),
        figure: (language) => <WholeFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const rationalsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...rationalsLessonTexts[topic.id as RationalsTopicId], ...rationalsLessonChecks[topic.id as RationalsTopicId] }))

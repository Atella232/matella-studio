import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AddFigure, AreaFigure, EquivalenceFigure, FractionOfFigure, MeaningFigure, MixedFigure } from '../dbh2-zatikiak-prototype/figures'
import { notation } from '../dbh2-zatigarritasuna/notation'
import { CheeseFigure, DivideFigure, PlaceOnLineFigure, SameDenominatorFigure, ShapesFigure, SimplifyBarsFigure, StickersFigure, TypesLineFigure } from './figures'
import { fractionsIntroLessonChecks, type FractionsIntroTopicId } from './lessonChecks'
import { fractionsIntroLessonTexts } from './lessonTexts'

/* ==========================================================================
   Zatikiak · 1. DBH — stages and lessons
   Sequence follows the class textbook (Santillana 1.º ESO, unit 3,
   curricular adaptation): what a fraction is and how it is read and drawn,
   the fraction as a division, proper and improper fractions, mixed numbers
   and the number line, equivalent fractions (cross products, amplifying
   and simplifying), comparing, and the four operations. Anaya units 7 and
   8 add the fraction of a quantity and the problems. It is the first
   contact with fractions: no negative fractions, powers or percentages,
   which the 2. DBH unit covers.
   ========================================================================== */

export type FractionsIntroStageId = 'meaning' | 'types' | 'equivalence' | 'operations' | 'problems'

/** The same formula in every language, with a decimal point instead of the comma in Arabic */
const dec = (latex: string): LocalizedText => ({ eu: latex, es: latex, en: latex, ar: latex.replace(/\{,\}/g, '.') })

export const fractionsIntroStages: UnitStage[] = [
    { id: 'meaning', tone: 'blue', title: { eu: 'Zer da zatiki bat?', es: '¿Qué es una fracción?', en: 'What is a fraction?', ar: 'ما الكسر؟' } },
    { id: 'types', tone: 'violet', title: { eu: 'Zatiki motak eta zuzena', es: 'Tipos de fracciones y la recta', en: 'Types of fractions and the number line', ar: 'أنواع الكسور والمستقيم' } },
    { id: 'equivalence', tone: 'mustard', title: { eu: 'Baliokideak eta alderaketa', es: 'Equivalentes y comparación', en: 'Equivalent fractions and comparison', ar: 'التكافؤ والمقارنة' } },
    { id: 'operations', tone: 'coral', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' } },
    { id: 'problems', tone: 'green', title: { eu: 'Zatikiak eta buruketak', es: 'Fracciones y problemas', en: 'Fractions and problems', ar: 'الكسور والمسائل' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'what',
        stage: 'meaning',
        title: { eu: 'Zatikiak: zenbakitzailea eta izendatzailea', es: 'La fracción: numerador y denominador', en: 'The fraction: numerator and denominator', ar: 'الكسر: البسط والمقام' },
        goal: {
            eu: 'Zatiki baten gaiak ezagutzea eta zatikiak irakurtzen eta idazten jakitea.',
            es: 'Reconocer los términos de una fracción y saber leer y escribir fracciones.',
            en: 'Recognise the parts of a fraction and know how to read and write fractions.',
            ar: 'التعرّف إلى حدّي الكسر ومعرفة قراءة الكسور وكتابتها.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Nola irakurri', es: 'Cómo se leen', en: 'How to read them', ar: 'كيف تُقرأ' },
                text: { eu: 'Lehenik zenbakitzailea, gero izendatzailea -ren atzizkiarekin: bi heren, hiru laurden, bost zortziren. $\\frac{1}{2}$ erdia da.', es: 'Primero el numerador y después el denominador: medios, tercios, cuartos, quintos… décimos; a partir de 11, con -avo: onceavos, doceavos…', en: 'First the numerator, then the denominator: halves, thirds, quarters, fifths… tenths; from 11 on: elevenths, twelfths…', ar: 'نقرأ البسط ثم المقام: نصف، ثلث، ربع، خُمس… وبعد العشرة نقول: جزء من أحد عشر…' },
                math: '$\\frac{3}{7}\\qquad\\frac{6}{9}\\qquad\\frac{8}{11}$'
            },
            {
                title: { eu: 'Zati berdinak', es: 'Partes iguales', en: 'Equal parts', ar: 'أجزاء متساوية' },
                text: { eu: 'Izendatzaileak zati berdinak eskatzen ditu: tamaina desberdineko 4 zati ez dira laurdenak.', es: 'El denominador exige partes iguales: 4 trozos de distinto tamaño no son cuartos.', en: 'The denominator requires equal parts: 4 pieces of different sizes are not quarters.', ar: 'المقام يشترط أجزاء متساوية: 4 قطع مختلفة الحجم ليست أرباعًا.' }
            },
            {
                title: { eu: 'Zatiki-marra', es: 'La raya de fracción', en: 'The fraction bar', ar: 'خط الكسر' },
                text: { eu: 'Marrak «zati», «-ren» edo «zatiketa» esan nahi du.', es: 'La raya significa «parte de», «entre» o «división».', en: 'The bar means “part of”, “divided by” or “division”.', ar: 'يعني الخط «جزء من» أو «على» أو «قسمة».' }
            }
        ],
        takeaway: {
            eu: 'Izendatzailea: zenbat zati berdin guztira. Zenbakitzailea: zenbat hartzen diren.',
            es: 'Denominador: cuántas partes iguales hay. Numerador: cuántas se toman.',
            en: 'Denominator: how many equal parts there are. Numerator: how many are taken.',
            ar: 'المقام: كم جزءًا متساويًا. البسط: كم جزءًا نأخذ.'
        },
        figure: (language) => <CheeseFigure language={language} />
    },
    {
        id: 'represent',
        stage: 'meaning',
        title: { eu: 'Zatikiak marraztea', es: 'Representar fracciones', en: 'Representing fractions', ar: 'تمثيل الكسور' },
        goal: {
            eu: 'Zatiki bat irudi batean marraztea eta irudi bateko zatikia idaztea.',
            es: 'Dibujar una fracción en una figura y escribir la fracción de una figura.',
            en: 'Draw a fraction in a shape and write the fraction of a shape.',
            ar: 'رسم كسر في شكل وكتابة الكسر الذي يمثّله شكل.'
        },
        problem: { eu: 'Marraztu $\\frac{3}{4}$ laukizuzen batean.', es: 'Dibuja $\\frac{3}{4}$ en un rectángulo.', en: 'Draw $\\frac{3}{4}$ in a rectangle.', ar: 'ارسم $\\frac{3}{4}$ في مستطيل.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Marraztu laukizuzen bat: osoa da.', es: 'Dibuja un rectángulo: es el total.', en: 'Draw a rectangle: it is the whole.', ar: 'ارسم مستطيلًا: إنه الكل.' } },
            { text: { eu: 'Zatitu 4 zati berdinetan (izendatzailea).', es: 'Divídelo en 4 partes iguales (denominador).', en: 'Divide it into 4 equal parts (denominator).', ar: 'قسّمه إلى 4 أجزاء متساوية (المقام).' } },
            { text: { eu: 'Koloreztatu 3 zati (zenbakitzailea).', es: 'Colorea 3 partes (numerador).', en: 'Colour in 3 parts (numerator).', ar: 'لوّن 3 أجزاء (البسط).' }, math: '$\\frac{3}{4}$' }
        ],
        takeaway: {
            eu: 'Irudia aldatu daiteke; zatiak berdinak izan behar dira beti.',
            es: 'La figura puede cambiar; las partes siempre tienen que ser iguales.',
            en: 'The shape can change; the parts always have to be equal.',
            ar: 'قد يتغيّر الشكل، لكن يجب أن تكون الأجزاء متساوية دائمًا.'
        },
        figure: (language) => <ShapesFigure language={language} />
    },
    {
        id: 'division',
        stage: 'meaning',
        title: { eu: 'Zatikia zatiketa gisa', es: 'La fracción como división', en: 'A fraction as a division', ar: 'الكسر قسمةً' },
        goal: {
            eu: 'Zatiki baten balioa zatiketa eginez kalkulatzea.',
            es: 'Calcular el valor de una fracción haciendo la división.',
            en: 'Calculate the value of a fraction by doing the division.',
            ar: 'حساب قيمة الكسر بإجراء القسمة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Gazta-kutxa', es: 'Los quesitos', en: 'The cheese wedges', ar: 'علبة الجبن' }, text: { eu: 'Jonek kutxaren $\\frac{3}{8}$ jan du.', es: 'Juan se ha comido $\\frac{3}{8}$ de la caja.', en: 'Juan has eaten $\\frac{3}{8}$ of the box.', ar: 'أكل خوان $\\frac{3}{8}$ العلبة.' }, math: dec('$\\begin{gathered}\\frac{3}{8}=3\\mathbin{:}8\\\\=0{,}375\\end{gathered}$') },
            { title: { eu: 'Zatiki bera, balio bera', es: 'Misma fracción, mismo valor', en: 'Same fraction, same value', ar: 'الكسر نفسه والقيمة نفسها' }, text: { eu: 'Zatiketak erakusten du zatikia 1 baino txikiagoa, berdina edo handiagoa den.', es: 'La división muestra si la fracción es menor, igual o mayor que 1.', en: 'Division shows whether the fraction is less than, equal to or greater than 1.', ar: 'تُظهر القسمة هل الكسر أصغر من 1 أم يساويه أم أكبر منه.' }, math: dec('$\\begin{gathered}\\frac{15}{8}=15\\mathbin{:}8\\\\=1{,}875\\end{gathered}$') }
        ],
        takeaway: {
            eu: 'Zatikia = zenbakitzailea : izendatzailea.',
            es: 'Fracción = numerador : denominador.',
            en: 'Fraction = numerator : denominator.',
            ar: 'الكسر = البسط : المقام.'
        },
        figure: (language) => <MeaningFigure language={language} />
    },
    {
        id: 'types',
        stage: 'types',
        title: { eu: 'Zatiki propioak eta inpropioak', es: 'Fracciones propias e impropias', en: 'Proper and improper fractions', ar: 'الكسور الحقيقية وغير الحقيقية' },
        goal: {
            eu: 'Zatiki bat 1 baino txikiagoa, berdina edo handiagoa den bereiztea.',
            es: 'Distinguir si una fracción es menor, igual o mayor que 1.',
            en: 'Tell whether a fraction is less than, equal to or greater than 1.',
            ar: 'التمييز هل الكسر أصغر من 1 أم يساويه أم أكبر منه.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Propioa', es: 'Propia', en: 'Proper', ar: 'حقيقي' }, text: { eu: 'Zenbakitzailea < izendatzailea: 1 baino gutxiago balio du.', es: 'Numerador < denominador: vale menos que 1.', en: 'Numerator < denominator: it is less than 1.', ar: 'البسط < المقام: قيمته أقل من 1.' }, math: '$\\frac{3}{8}<1$' },
            { title: { eu: 'Unitatea', es: 'Igual a la unidad', en: 'Equal to one', ar: 'يساوي الواحد' }, text: { eu: 'Zenbakitzailea = izendatzailea: 1 balio du.', es: 'Numerador = denominador: vale 1.', en: 'Numerator = denominator: it equals 1.', ar: 'البسط = المقام: قيمته 1.' }, math: '$\\frac{8}{8}=1$' },
            { title: { eu: 'Inpropioa', es: 'Impropia', en: 'Improper', ar: 'غير حقيقي' }, text: { eu: 'Zenbakitzailea > izendatzailea: 1 baino gehiago balio du.', es: 'Numerador > denominador: vale más que 1.', en: 'Numerator > denominator: it is more than 1.', ar: 'البسط > المقام: قيمته أكثر من 1.' }, math: '$\\frac{11}{8}>1$' }
        ],
        takeaway: {
            eu: 'Begiratu goian ala behean dagoen zenbaki handiena.',
            es: 'Mira si el número mayor está arriba o abajo.',
            en: 'Check whether the bigger number is on top or at the bottom.',
            ar: 'انظر: هل العدد الأكبر في الأعلى أم في الأسفل؟'
        },
        figure: (language) => <TypesLineFigure language={language} />
    },
    {
        id: 'mixed',
        stage: 'types',
        title: { eu: 'Zenbaki mistoak', es: 'Números mixtos', en: 'Mixed numbers', ar: 'الأعداد الكسرية' },
        goal: {
            eu: 'Zatiki inpropio bat zenbaki misto gisa idaztea eta alderantziz.',
            es: 'Escribir una fracción impropia como número mixto y al revés.',
            en: 'Write an improper fraction as a mixed number and the other way round.',
            ar: 'كتابة كسر غير حقيقي عددًا كسريًا وبالعكس.'
        },
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'divide', title: { eu: 'Zatiketa', es: 'La división', en: 'Division', ar: 'القسمة' } }],
        problem: { eu: 'Idatzi $\\frac{17}{5}$ zenbaki misto gisa.', es: 'Escribe $\\frac{17}{5}$ como número mixto.', en: 'Write $\\frac{17}{5}$ as a mixed number.', ar: 'اكتب $\\frac{17}{5}$ عددًا كسريًا.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zatitu zenbakitzailea izendatzaileaz.', es: 'Divide el numerador entre el denominador.', en: 'Divide the numerator by the denominator.', ar: 'اقسم البسط على المقام.' }, math: '$17=5\\cdot 3+2$' },
            { text: { eu: 'Zatidura (3) unitate osoak dira; hondarra (2), zenbakitzaile berria.', es: 'El cociente (3) son las unidades; el resto (2), el nuevo numerador.', en: 'The quotient (3) is the number of whole units; the remainder (2) is the new numerator.', ar: 'الناتج (3) هو الوحدات، والباقي (2) هو البسط الجديد.' }, math: '$\\frac{17}{5}=3\\frac{2}{5}$' },
            { text: { eu: 'Itzultzeko: biderkatu unitateak izendatzaileaz eta batu zenbakitzailea.', es: 'Para volver: multiplica las unidades por el denominador y suma el numerador.', en: 'To go back: multiply the whole units by the denominator and add the numerator.', ar: 'للعودة: اضرب الوحدات في المقام وأضف البسط.' }, math: '$3\\frac{2}{5}=\\frac{3\\cdot 5+2}{5}=\\frac{17}{5}$' }
        ],
        takeaway: {
            eu: 'Zatidura = unitateak; hondarra = soberan geratzen diren zatiak.',
            es: 'Cociente = unidades; resto = partes que sobran.',
            en: 'Quotient = whole units; remainder = parts left over.',
            ar: 'الناتج = الوحدات؛ الباقي = الأجزاء المتبقية.'
        },
        figureAfterSteps: true,
        figure: (language) => <MixedFigure language={language} />
    },
    {
        id: 'line',
        stage: 'types',
        title: { eu: 'Zatikiak zenbaki-zuzenean', es: 'Fracciones en la recta', en: 'Fractions on the number line', ar: 'الكسور على المستقيم' },
        goal: {
            eu: 'Zatiki bat zenbaki-zuzenean kokatzea.',
            es: 'Situar una fracción en la recta numérica.',
            en: 'Place a fraction on the number line.',
            ar: 'وضع كسر على خط الأعداد.'
        },
        problem: { eu: 'Kokatu $\\frac{5}{3}$ zenbaki-zuzenean.', es: 'Sitúa $\\frac{5}{3}$ en la recta.', en: 'Place $\\frac{5}{3}$ on the number line.', ar: 'ضع $\\frac{5}{3}$ على خط الأعداد.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Marraztu zuzena eta markatu unitateak: 0, 1, 2…', es: 'Dibuja la recta y marca las unidades: 0, 1, 2…', en: 'Draw the number line and mark the whole numbers: 0, 1, 2…', ar: 'ارسم المستقيم وعلّم الوحدات: 0، 1، 2…' } },
            { text: { eu: 'Zatitu unitate bakoitza izendatzaileak adina zatitan: 3.', es: 'Divide cada unidad en tantas partes como el denominador: 3.', en: 'Divide each unit into as many parts as the denominator: 3.', ar: 'قسّم كل وحدة إلى أجزاء بعدد المقام: 3.' } },
            { text: { eu: 'Zerotik hasita, aurreratu zenbakitzaileak adina zati: 5.', es: 'Desde el cero, avanza tantas partes como el numerador: 5.', en: 'From zero, go forward as many parts as the numerator: 5.', ar: 'انطلاقًا من الصفر تقدّم أجزاءً بعدد البسط: 5.' }, math: '$1<\\frac{5}{3}<2$' }
        ],
        takeaway: {
            eu: 'Izendatzailea: unitatea zenbat zatitan. Zenbakitzailea: zenbat zati aurrera.',
            es: 'Denominador: en cuántas partes la unidad. Numerador: cuántas partes avanzar.',
            en: 'Denominator: how many parts each unit is split into. Numerator: how many parts to move forward.',
            ar: 'المقام: كم جزءًا في الوحدة. البسط: كم جزءًا نتقدّم.'
        },
        figureAfterSteps: true,
        figure: (language) => <PlaceOnLineFigure language={language} />
    },
    {
        id: 'equivalent',
        stage: 'equivalence',
        title: { eu: 'Zatiki baliokideak', es: 'Fracciones equivalentes', en: 'Equivalent fractions', ar: 'الكسور المتكافئة' },
        goal: {
            eu: 'Bi zatiki baliokideak diren egiaztatzea biderkadura gurutzatuekin.',
            es: 'Comprobar si dos fracciones son equivalentes con los productos cruzados.',
            en: 'Check whether two fractions are equivalent using cross products.',
            ar: 'التحقق من تكافؤ كسرين بالضرب التبادلي.'
        },
        problem: { eu: 'Baliokideak al dira $\\frac{2}{5}$ eta $\\frac{6}{15}$?', es: '¿Son equivalentes $\\frac{2}{5}$ y $\\frac{6}{15}$?', en: 'Are $\\frac{2}{5}$ and $\\frac{6}{15}$ equivalent?', ar: 'هل $\\frac{2}{5}$ و$\\frac{6}{15}$ متكافئان؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu lehenengoaren zenbakitzailea bigarrenaren izendatzaileaz.', es: 'Multiplica el numerador de la primera por el denominador de la segunda.', en: 'Multiply the numerator of the first by the denominator of the second.', ar: 'اضرب بسط الأول في مقام الثاني.' }, math: '$2\\cdot 15=30$' },
            { text: { eu: 'Biderkatu lehenengoaren izendatzailea bigarrenaren zenbakitzaileaz.', es: 'Multiplica el denominador de la primera por el numerador de la segunda.', en: 'Multiply the denominator of the first by the numerator of the second.', ar: 'اضرب مقام الأول في بسط الثاني.' }, math: '$5\\cdot 6=30$' },
            { text: { eu: 'Berdinak dira: baliokideak.', es: 'Son iguales: equivalentes.', en: 'They are equal: equivalent.', ar: 'متساويان: الكسران متكافئان.' }, math: '$\\frac{2}{5}=\\frac{6}{15}$' }
        ],
        takeaway: {
            eu: 'Biderkadura gurutzatuak berdinak → zatiki baliokideak.',
            es: 'Productos cruzados iguales → fracciones equivalentes.',
            en: 'Equal cross products → equivalent fractions.',
            ar: 'الضرب التبادلي متساوٍ ← الكسران متكافئان.'
        },
        figure: (language) => <EquivalenceFigure language={language} />
    },
    {
        id: 'amplify-simplify',
        stage: 'equivalence',
        title: { eu: 'Anplifikatu eta sinplifikatu', es: 'Amplificar y simplificar', en: 'Expanding and simplifying', ar: 'التوسيع والتبسيط' },
        goal: {
            eu: 'Zatiki baliokideak lortzea eta zatiki bat laburtezina izan arte sinplifikatzea.',
            es: 'Obtener fracciones equivalentes y simplificar una fracción hasta la irreducible.',
            en: 'Find equivalent fractions and simplify a fraction to its simplest form.',
            ar: 'الحصول على كسور متكافئة وتبسيط كسر حتى أبسط صورة.'
        },
        needs: [{ unit: 'dbh1/divisibilidad', topic: 'gcd', title: { eu: 'Zatitzaile komunak eta ZKH', es: 'Divisores comunes y m.c.d.', en: 'Common divisors and GCD', ar: 'القواسم المشتركة وق.م.أ' } }],
        problem: { eu: 'Sinplifikatu $\\frac{30}{40}$.', es: 'Simplifica $\\frac{30}{40}$.', en: 'Simplify $\\frac{30}{40}$.', ar: 'بسّط $\\frac{30}{40}$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biak 10 zenbakiaz zatitu daitezke (0 zifrarekin amaitzen dira).', es: 'Los dos se pueden dividir entre 10 (acaban en 0).', en: 'Both can be divided by 10 (they end in 0).', ar: 'يمكن قسمة الاثنين على 10 (ينتهيان بـ 0).' }, math: '$\\frac{30}{40}=\\frac{30\\mathbin{:}10}{40\\mathbin{:}10}=\\frac{3}{4}$' },
            { text: { eu: '3 eta 4 zenbakiek ez dute zatitzaile komunik (1 izan ezik): laburtezina da.', es: '3 y 4 no tienen divisores comunes (salvo el 1): es irreducible.', en: '3 and 4 have no common divisors (except 1): it is in its simplest form.', ar: 'لا قاسم مشتركًا لـ 3 و4 (غير 1): الكسر في أبسط صورة.' }, math: notation('$@GCD(30,40)=10$') },
            { title: { eu: 'Anplifikatu', es: 'Amplificar', en: 'Expanding', ar: 'التوسيع' }, text: { eu: 'Alderantziz, biderkatuz zatiki baliokide gehiago lortzen dira.', es: 'Al revés, multiplicando se obtienen más fracciones equivalentes.', en: 'The other way round, multiplying gives more equivalent fractions.', ar: 'وبالعكس، بالضرب نحصل على كسور متكافئة أخرى.' }, math: '$\\frac{3}{4}=\\frac{3\\cdot 5}{4\\cdot 5}=\\frac{15}{20}$' }
        ],
        takeaway: {
            eu: 'Bi gaiei eragiketa bera; bestela zatikia aldatzen da.',
            es: 'La misma operación a los dos términos; si no, la fracción cambia.',
            en: 'The same operation on both terms; otherwise, the fraction changes.',
            ar: 'العملية نفسها على الحدّين؛ وإلا تغيّر الكسر.'
        },
        figure: (language) => <SimplifyBarsFigure language={language} />
    },
    {
        id: 'compare',
        stage: 'equivalence',
        title: { eu: 'Zatikiak alderatu eta ordenatu', es: 'Comparar y ordenar fracciones', en: 'Comparing and ordering fractions', ar: 'مقارنة الكسور وترتيبها' },
        goal: {
            eu: 'Zatikiak izendatzaile komunera eramanez alderatzea eta ordenatzea.',
            es: 'Comparar y ordenar fracciones pasándolas a común denominador.',
            en: 'Compare and order fractions by using a common denominator.',
            ar: 'مقارنة الكسور وترتيبها بتوحيد المقامات.'
        },
        needs: [{ unit: 'dbh1/divisibilidad', topic: 'lcm', title: { eu: 'Multiplo komunak eta MKT', es: 'Múltiplos comunes y m.c.m.', en: 'Common multiples and LCM', ar: 'المضاعفات المشتركة وم.م.أ' } }],
        problem: { eu: 'Ordenatu handienetik txikienera: $\\frac{2}{3}$, $\\frac{1}{2}$ eta $\\frac{3}{4}$.', es: 'Ordena de mayor a menor: $\\frac{2}{3}$, $\\frac{1}{2}$ y $\\frac{3}{4}$.', en: 'Order from greatest to least: $\\frac{2}{3}$, $\\frac{1}{2}$ and $\\frac{3}{4}$.', ar: 'رتّب من الأكبر إلى الأصغر: $\\frac{2}{3}$ و$\\frac{1}{2}$ و$\\frac{3}{4}$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Izendatzaile komuna: 3, 2 eta 4 zenbakien MKT.', es: 'Denominador común: el m.c.m. de 3, 2 y 4.', en: 'Common denominator: the LCM of 3, 2 and 4.', ar: 'المقام المشترك: م.م.أ للأعداد 3 و2 و4.' }, math: notation('$@LCM(3,2,4)=12$') },
            { text: { eu: 'Idatzi zatiki baliokideak 12 izendatzailearekin.', es: 'Escribe las fracciones equivalentes con denominador 12.', en: 'Write the equivalent fractions with denominator 12.', ar: 'اكتب الكسور المكافئة بالمقام 12.' }, math: '$\\frac{2}{3}=\\frac{8}{12}\\quad\\frac{1}{2}=\\frac{6}{12}\\quad\\frac{3}{4}=\\frac{9}{12}$' },
            { text: { eu: 'Alderatu zenbakitzaileak.', es: 'Compara los numeradores.', en: 'Compare the numerators.', ar: 'قارن البسوط.' }, math: '$\\frac{3}{4}>\\frac{2}{3}>\\frac{1}{2}$' }
        ],
        takeaway: {
            eu: 'Izendatzaile bera → zenbakitzaile handiena. Zenbakitzaile bera → izendatzaile txikiena.',
            es: 'Mismo denominador → el de mayor numerador. Mismo numerador → el de menor denominador.',
            en: 'Same denominator → the one with the greater numerator. Same numerator → the one with the smaller denominator.',
            ar: 'المقام نفسه ← صاحب البسط الأكبر. البسط نفسه ← صاحب المقام الأصغر.'
        },
        figureAfterSteps: true,
        figure: (language) => <StickersFigure language={language} />
    },
    {
        id: 'add-same',
        stage: 'operations',
        title: { eu: 'Izendatzaile bereko batuketak eta kenketak', es: 'Sumas y restas con igual denominador', en: 'Adding and subtracting with the same denominator', ar: 'الجمع والطرح بالمقام نفسه' },
        goal: {
            eu: 'Izendatzaile bera duten zatikiak batzea eta kentzea.',
            es: 'Sumar y restar fracciones con el mismo denominador.',
            en: 'Add and subtract fractions with the same denominator.',
            ar: 'جمع كسور لها المقام نفسه وطرحها.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Batuketa', es: 'Suma', en: 'Addition', ar: 'الجمع' }, text: { eu: 'Batu zenbakitzaileak.', es: 'Suma los numeradores.', en: 'Add the numerators.', ar: 'اجمع البسوط.' }, math: '$\\begin{gathered}\\frac{2}{7}+\\frac{3}{7}\\\\=\\frac{2+3}{7}=\\frac{5}{7}\\end{gathered}$' },
            { title: { eu: 'Kenketa', es: 'Resta', en: 'Subtraction', ar: 'الطرح' }, text: { eu: 'Kendu zenbakitzaileak.', es: 'Resta los numeradores.', en: 'Subtract the numerators.', ar: 'اطرح البسوط.' }, math: '$\\begin{gathered}\\frac{7}{9}-\\frac{4}{9}\\\\=\\frac{3}{9}=\\frac{1}{3}\\end{gathered}$' },
            { title: { eu: 'Kontuz', es: 'Cuidado', en: 'Be careful', ar: 'انتبه' }, text: { eu: 'Izendatzaileak ez dira batzen: $\\frac{2}{7}+\\frac{3}{7}$ ez da $\\frac{5}{14}$.', es: 'Los denominadores no se suman: $\\frac{2}{7}+\\frac{3}{7}$ no es $\\frac{5}{14}$.', en: 'Denominators are not added: $\\frac{2}{7}+\\frac{3}{7}$ is not $\\frac{5}{14}$.', ar: 'لا نجمع المقامات: $\\frac{2}{7}+\\frac{3}{7}$ ليس $\\frac{5}{14}$.' } }
        ],
        takeaway: {
            eu: 'Izendatzaile bera: zenbakitzaileekin bakarrik egiten da eragiketa.',
            es: 'Mismo denominador: solo se opera con los numeradores.',
            en: 'Same denominator: you only work with the numerators.',
            ar: 'المقام نفسه: نُجري العملية على البسوط فقط.'
        },
        figure: (language) => <SameDenominatorFigure language={language} />
    },
    {
        id: 'add-different',
        stage: 'operations',
        title: { eu: 'Izendatzaile desberdineko batuketak eta kenketak', es: 'Sumas y restas con distinto denominador', en: 'Adding and subtracting with different denominators', ar: 'الجمع والطرح بمقامات مختلفة' },
        goal: {
            eu: 'Izendatzaile desberdineko zatikiak izendatzaile komunera eramanez batzea eta kentzea.',
            es: 'Sumar y restar fracciones de distinto denominador reduciéndolas a común denominador.',
            en: 'Add and subtract fractions with different denominators by changing them to a common denominator.',
            ar: 'جمع كسور بمقامات مختلفة وطرحها بتوحيد المقامات.'
        },
        needs: [{ unit: 'dbh1/divisibilidad', topic: 'lcm', title: { eu: 'Multiplo komunak eta MKT', es: 'Múltiplos comunes y m.c.m.', en: 'Common multiples and LCM', ar: 'المضاعفات المشتركة وم.م.أ' } }],
        problem: { eu: 'Kalkulatu $\\frac{1}{2}+\\frac{1}{3}$.', es: 'Calcula $\\frac{1}{2}+\\frac{1}{3}$.', en: 'Calculate $\\frac{1}{2}+\\frac{1}{3}$.', ar: 'احسب $\\frac{1}{2}+\\frac{1}{3}$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Izendatzaile komuna: izendatzaileen MKT.', es: 'Denominador común: el m.c.m. de los denominadores.', en: 'Common denominator: the LCM of the denominators.', ar: 'المقام المشترك: م.م.أ للمقامات.' }, math: notation('$@LCM(2,3)=6$') },
            { text: { eu: 'Idatzi zatiki baliokideak 6 izendatzailearekin.', es: 'Escribe las fracciones equivalentes con denominador 6.', en: 'Write the equivalent fractions with denominator 6.', ar: 'اكتب الكسور المكافئة بالمقام 6.' }, math: '$\\frac{1}{2}=\\frac{3}{6}\\qquad\\frac{1}{3}=\\frac{2}{6}$' },
            { text: { eu: 'Batu zenbakitzaileak.', es: 'Suma los numeradores.', en: 'Add the numerators.', ar: 'اجمع البسوط.' }, math: '$\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$' }
        ],
        takeaway: {
            eu: 'Lehenik izendatzaile bera; gero zenbakitzaileak.',
            es: 'Primero el mismo denominador; después, los numeradores.',
            en: 'First the same denominator; then, the numerators.',
            ar: 'أولًا المقام نفسه، ثم البسوط.'
        },
        figureAfterSteps: true,
        figure: (language) => <AddFigure language={language} />
    },
    {
        id: 'multiply',
        stage: 'operations',
        title: { eu: 'Zatikien biderketa', es: 'Multiplicación de fracciones', en: 'Multiplying fractions', ar: 'ضرب الكسور' },
        goal: {
            eu: 'Zenbaki bat zatiki batez eta bi zatiki elkarren artean biderkatzea.',
            es: 'Multiplicar un número por una fracción y dos fracciones entre sí.',
            en: 'Multiply a number by a fraction and two fractions together.',
            ar: 'ضرب عدد في كسر وضرب كسرين.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Bi zatiki', es: 'Dos fracciones', en: 'Two fractions', ar: 'كسران' }, text: { eu: 'Zenbakitzaileak bider zenbakitzaileak, izendatzaileak bider izendatzaileak.', es: 'Numeradores por numeradores, denominadores por denominadores.', en: 'Numerators times numerators, denominators times denominators.', ar: 'البسط في البسط والمقام في المقام.' }, math: '$\\begin{gathered}\\frac{2}{3}\\cdot\\frac{3}{4}=\\frac{2\\cdot 3}{3\\cdot 4}\\\\=\\frac{6}{12}=\\frac{1}{2}\\end{gathered}$' },
            { title: { eu: 'Zenbaki bat bider zatiki bat', es: 'Un número por una fracción', en: 'A number times a fraction', ar: 'عدد في كسر' }, text: { eu: 'Zenbakiak zenbakitzailea biderkatzen du.', es: 'El número multiplica al numerador.', en: 'The number multiplies the numerator.', ar: 'العدد يضرب البسط.' }, math: '$4\\cdot\\frac{2}{5}=\\frac{8}{5}$' }
        ],
        takeaway: {
            eu: 'Biderketan zuzen-zuzenean: goikoak goikoekin, behekoak behekoekin.',
            es: 'En la multiplicación, en línea: arriba con arriba, abajo con abajo.',
            en: 'In multiplication, straight across: top with top, bottom with bottom.',
            ar: 'في الضرب نضرب مباشرة: الأعلى في الأعلى والأسفل في الأسفل.'
        },
        figure: (language) => <AreaFigure language={language} />
    },
    {
        id: 'divide',
        stage: 'operations',
        title: { eu: 'Zatikien zatiketa', es: 'División de fracciones', en: 'Dividing fractions', ar: 'قسمة الكسور' },
        goal: {
            eu: 'Bi zatiki zatitzea biderkadura gurutzatuekin.',
            es: 'Dividir dos fracciones con los productos cruzados.',
            en: 'Divide two fractions by cross-multiplying.',
            ar: 'قسمة كسرين بالضرب التبادلي.'
        },
        problem: { eu: 'Kalkulatu $\\frac{3}{4}\\mathbin{:}\\frac{1}{8}$.', es: 'Calcula $\\frac{3}{4}\\mathbin{:}\\frac{1}{8}$.', en: 'Calculate $\\frac{3}{4}\\mathbin{:}\\frac{1}{8}$.', ar: 'احسب $\\frac{3}{4}\\mathbin{:}\\frac{1}{8}$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zenbakitzaile berria: 3 · 8.', es: 'Nuevo numerador: 3 · 8.', en: 'New numerator: 3 · 8.', ar: 'البسط الجديد: 3 · 8.' }, math: '$3\\cdot 8=24$' },
            { text: { eu: 'Izendatzaile berria: 4 · 1.', es: 'Nuevo denominador: 4 · 1.', en: 'New denominator: 4 · 1.', ar: 'المقام الجديد: 4 · 1.' }, math: '$4\\cdot 1=4$' },
            { text: { eu: 'Sinplifikatu: 3/4 zatikian sei zortziren sartzen dira.', es: 'Simplifica: en 3/4 caben seis octavos.', en: 'Simplify: six eighths fit into 3/4.', ar: 'بسّط: في 3/4 ستة أثمان.' }, math: '$\\frac{24}{4}=6$' }
        ],
        takeaway: {
            eu: 'Zatiketan gurutzean; biderketan zuzenean.',
            es: 'En la división, en cruz; en la multiplicación, en línea.',
            en: 'In division, cross-multiply; in multiplication, straight across.',
            ar: 'في القسمة تبادليًا، وفي الضرب مباشرة.'
        },
        figureAfterSteps: true,
        figure: (language) => <DivideFigure language={language} />
    },
    {
        id: 'fraction-of',
        stage: 'problems',
        title: { eu: 'Kopuru baten zatikia', es: 'Fracción de una cantidad', en: 'Fraction of a quantity', ar: 'كسر من كمية' },
        goal: {
            eu: 'Kopuru baten zatiki bat kalkulatzea.',
            es: 'Calcular la fracción de una cantidad.',
            en: 'Calculate a fraction of a quantity.',
            ar: 'حساب كسر من كمية.'
        },
        problem: { eu: 'Kalkulatu 120 zenbakiaren $\\frac{3}{8}$.', es: 'Calcula $\\frac{3}{8}$ de 120.', en: 'Calculate $\\frac{3}{8}$ of 120.', ar: 'احسب $\\frac{3}{8}$ من 120.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zatitu kopurua izendatzaileaz: zati baten balioa.', es: 'Divide la cantidad entre el denominador: lo que vale una parte.', en: 'Divide the quantity by the denominator: the value of one part.', ar: 'اقسم الكمية على المقام: قيمة الجزء الواحد.' }, math: '$120\\mathbin{:}8=15$' },
            { text: { eu: 'Biderkatu zenbakitzaileaz.', es: 'Multiplica por el numerador.', en: 'Multiply by the numerator.', ar: 'اضرب في البسط.' }, math: '$15\\cdot 3=45$' }
        ],
        takeaway: {
            eu: 'Kopuru baten zatikia: zatitu izendatzaileaz eta biderkatu zenbakitzaileaz.',
            es: 'Fracción de una cantidad: divide entre el denominador y multiplica por el numerador.',
            en: 'Fraction of a quantity: divide by the denominator and multiply by the numerator.',
            ar: 'كسر من كمية: اقسم على المقام واضرب في البسط.'
        },
        figureAfterSteps: true,
        figure: (language) => <FractionOfFigure language={language} />
    },
    {
        id: 'problems',
        stage: 'problems',
        title: { eu: 'Zatikiekin buruketak', es: 'Problemas con fracciones', en: 'Problems with fractions', ar: 'مسائل بالكسور' },
        goal: {
            eu: 'Zatikiekin buruketak ebaztea, geratzen den zatia ere kalkulatuz.',
            es: 'Resolver problemas con fracciones, también calculando la parte que queda.',
            en: 'Solve problems with fractions, also calculating the part that is left.',
            ar: 'حل مسائل بالكسور، ومنها حساب الجزء المتبقي.'
        },
        problem: { eu: 'Anek 30 €-ko pagaren $\\frac{2}{5}$ gastatu ditu. Zenbat euro geratzen zaizkio?', es: 'Ana ha gastado $\\frac{2}{5}$ de su paga de 30 €. ¿Cuántos euros le quedan?', en: 'Ana has spent $\\frac{2}{5}$ of her €30 pocket money. How many euros does she have left?', ar: 'أنفقت آنه $\\frac{2}{5}$ مصروفها البالغ 30 €. كم يورو بقي لها؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Geratzen den zatia: unitatea ken gastatutakoa.', es: 'Parte que queda: la unidad menos lo gastado.', en: 'Part left: 1 minus what has been spent.', ar: 'الجزء المتبقي: الواحد ناقص ما أُنفق.' }, math: '$1-\\frac{2}{5}=\\frac{5}{5}-\\frac{2}{5}=\\frac{3}{5}$' },
            { text: { eu: 'Aplikatu zatiki hori kopuruari.', es: 'Aplica esa fracción a la cantidad.', en: 'Apply that fraction to the quantity.', ar: 'طبّق هذا الكسر على الكمية.' }, math: '$30\\mathbin{:}5\\cdot 3=18$' },
            { text: { eu: 'Erantzun: 18 € geratzen zaizkio (eta 12 € gastatu ditu).', es: 'Respuesta: le quedan 18 € (y ha gastado 12 €).', en: 'Answer: she has €18 left (and has spent €12).', ar: 'الجواب: بقي لها 18 € (وأنفقت 12 €).' } }
        ],
        takeaway: {
            eu: 'Osoa = 1. Geratzen dena = 1 ken erabilitakoa.',
            es: 'El total = 1. Lo que queda = 1 menos lo usado.',
            en: 'The whole = 1. What is left = 1 minus what has been used.',
            ar: 'الكل = 1. المتبقي = 1 ناقص المستعمل.'
        }
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const fractionsIntroTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...fractionsIntroLessonTexts[topic.id as FractionsIntroTopicId], ...fractionsIntroLessonChecks[topic.id as FractionsIntroTopicId] }))

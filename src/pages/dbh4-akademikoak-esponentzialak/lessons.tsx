import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { ExponentialFigure, GrowthFigure } from '../dbh4-aplikatuak-grafikoa/figures'
import { LogDefinitionFigure, PowerRulesFigure } from '../dbh4-akademikoak-potentziak/figures'
import { UnitCircleFigure } from '../dbh4-akademikoak-trigonometria/figures'
import { localizeNames, same, say } from '../dbh4-akademikoak-trigonometria/text'
import {
    AmplitudeFigure,
    CosineFigure,
    DecayFigure,
    ExpEquationFigure,
    ExpShiftFigure,
    LogGraphFigure,
    LogShiftFigure,
    PeriodFigure,
    SineFigure,
    TangentFigure
} from './figures'
import { exponentialAkLessonChecks, type ExponentialAkTopicId } from './lessonChecks'
import { exponentialAkLessonTexts } from './lessonTexts'

/* ==========================================================================
   Funtzio esponentzialak, logaritmikoak eta trigonometrikoak · 4. DBH
   akademikoak — stages and lessons, following Santillana 4.º Académicas
   unit 11 (exponential functions and their translations, logarithmic
   functions as their inverses, the trigonometric functions sine, cosine
   and tangent, with amplitude and period) and the exponential and
   logarithmic part of Anaya 4.º Académicas unit 5 (tables of aˣ, growth
   and decay, y = log_a x next to y = aˣ). Inside formulas write \sen and
   \tg: each language gets its own names (sen / sin, tg / tan).
   ========================================================================== */

export type ExponentialAkStageId = 'exponential' | 'growth' | 'logarithmic' | 'trigonometric' | 'transforms'

export const exponentialAkStages: UnitStage[] = [
    { id: 'exponential', tone: 'blue', title: { eu: 'Funtzio esponentziala', es: 'Función exponencial', en: 'Exponential function', ar: 'الدالة الأسية' } },
    { id: 'growth', tone: 'violet', title: { eu: 'Hazkundea eta ekuazioak', es: 'Crecimiento y ecuaciones', en: 'Growth and equations', ar: 'النمو والمعادلات' } },
    { id: 'logarithmic', tone: 'mustard', title: { eu: 'Funtzio logaritmikoa', es: 'Función logarítmica', en: 'Logarithmic function', ar: 'الدالة اللوغاريتمية' } },
    { id: 'trigonometric', tone: 'coral', title: { eu: 'Sinua eta kosinua', es: 'Seno y coseno', en: 'Sine and cosine', ar: 'الجيب وجيب التمام' } },
    { id: 'transforms', tone: 'green', title: { eu: 'Anplitudea eta periodoa', es: 'Amplitud y periodo', en: 'Amplitude and period', ar: 'السعة والدور' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. The exponential function ---------- */
    {
        id: 'exp-graph',
        stage: 'exponential',
        title: say('$y=a^{x}$ funtzioa', 'La función $y=a^{x}$', 'الدالة $y=a^{x}$', 'The function $y=a^{x}$'),
        goal: say('$y=a^{x}$ funtzioaren propietateak ezagutzea eta $a$-ren arabera gorakorra ala beherakorra den esatea.', 'Conocer las propiedades de $y=a^{x}$ y decir si es creciente o decreciente según $a$.', 'التعرف إلى خصائص $y=a^{x}$ وتحديد تزايدها أو تناقصها بحسب $a$.', 'Know the properties of $y=a^{x}$ and say whether it is increasing or decreasing depending on $a$.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'integer-powers', title: { eu: 'Berretzaile osoko berreturak', es: 'Potencias de exponente entero', en: 'Powers with integer exponents', ar: 'القوى ذات الأس الصحيح' } }
        ],
        problem: say('$f(x)=3^{x}$ izanik, kalkulatu $f(2)$ eta $f(-2)$. Gorakorra da?', 'Siendo $f(x)=3^{x}$, calcula $f(2)$ y $f(-2)$. ¿Es creciente?', 'إذا كان $f(x)=3^{x}$ فاحسب $f(2)$ و$f(-2)$. هل هي متزايدة؟', 'Given $f(x)=3^{x}$, work out $f(2)$ and $f(-2)$. Is it increasing?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berretzaile positiboa.', 'Exponente positivo.', 'أس موجب.', 'Positive exponent.'), math: same('$3^{2}=9$') },
            { text: say('Berretzaile negatiboa: alderantzizkoa.', 'Exponente negativo: el inverso.', 'أس سالب: المقلوب.', 'Negative exponent: the reciprocal.'), math: same('$3^{-2}=\\frac{1}{9}$') },
            { text: say('$3>1$: gorakorra.', '$3>1$: creciente.', '$3>1$: متزايدة.', '$3>1$: increasing.'), math: same('$\\frac{1}{9}<9$') }
        ],
        takeaway: say('y = aˣ: beti (0, 1) puntutik, beti positiboa. a > 1 gorakorra; 0 < a < 1 beherakorra.', 'y = aˣ: siempre por (0, 1), siempre positiva. a > 1 creciente; 0 < a < 1 decreciente.', 'y = aˣ: دائمًا عبر (0, 1) وموجبة دائمًا. a > 1 متزايدة؛ 0 < a < 1 متناقصة.', 'y = aˣ: always through (0, 1), always positive. a > 1 increasing; 0 < a < 1 decreasing.'),
        figure: (language) => <ExponentialFigure language={language} />
    },
    {
        id: 'exp-values',
        stage: 'exponential',
        title: say('Balioak eta forma baliokideak', 'Valores y formas equivalentes', 'القيم والصور المتكافئة', 'Values and equivalent forms'),
        goal: say('Funtzio esponentzialen balioak kalkulatzea eta berreturen propietateekin idazkera baliokideak aurkitzea.', 'Calcular valores de funciones exponenciales y encontrar escrituras equivalentes con las propiedades de las potencias.', 'حساب قيم الدوال الأسية وإيجاد كتابات متكافئة بخواص القوى.', 'Calculate values of exponential functions and find equivalent ways of writing them, using the rules of powers.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'fractional', title: { eu: 'Berretzaile zatikiak', es: 'Exponentes fraccionarios', en: 'Fractional exponents', ar: 'الأسس الكسرية' } }
        ],
        problem: say('$f(x)=8^{x}$ izanik, kalkulatu $f\\left(\\frac{2}{3}\\right)$ eta $f(-1)$.', 'Siendo $f(x)=8^{x}$, calcula $f\\left(\\frac{2}{3}\\right)$ y $f(-1)$.', 'إذا كان $f(x)=8^{x}$ فاحسب $f\\left(\\frac{2}{3}\\right)$ و$f(-1)$.', 'Given $f(x)=8^{x}$, work out $f\\left(\\frac{2}{3}\\right)$ and $f(-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatikizko berretzailea: erroa.', 'Exponente fraccionario: raíz.', 'أس كسري: جذر.', 'Fractional exponent: root.'), math: same('$8^{\\frac{2}{3}}=\\sqrt[3]{64}=4$') },
            { text: say('Berretzaile negatiboa.', 'Exponente negativo.', 'أس سالب.', 'Negative exponent.'), math: same('$8^{-1}=\\frac{1}{8}$') }
        ],
        takeaway: say('Berreturen arauak: a⁻ⁿ = 1/aⁿ eta oinarri bera lortzeko faktorizatu.', 'Reglas de las potencias: a⁻ⁿ = 1/aⁿ, y factoriza para tener la misma base.', 'قواعد القوى: a⁻ⁿ = 1/aⁿ، وحلّل للحصول على الأساس نفسه.', 'Rules of powers: a⁻ⁿ = 1/aⁿ, and rewrite with the same base.'),
        figure: (language) => <PowerRulesFigure language={language} />
    },
    {
        id: 'exp-shifts',
        stage: 'exponential',
        figureAfterSteps: true,
        title: say('Esponentzialen lekualdaketak', 'Traslaciones de exponenciales', 'انسحابات الدوال الأسية', 'Translations of exponentials'),
        goal: say('$y=a^{x-p}+q$ funtzioa $y=a^{x}$ funtzioaren lekualdaketa gisa irakurtzea, asintota eta puntu ezagunak barne.', 'Leer $y=a^{x-p}+q$ como una traslación de $y=a^{x}$, con su asíntota y sus puntos conocidos.', 'قراءة $y=a^{x-p}+q$ انسحابًا لـ $y=a^{x}$ مع مقاربها ونقاطها المعروفة.', 'Read $y=a^{x-p}+q$ as a translation of $y=a^{x}$, with its asymptote and its known points.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones-polinomicas-racionales', topic: 'vertex-form', title: { eu: 'Parabolen lekualdaketak', es: 'Traslaciones de parábolas', en: 'Translations of parabolas', ar: 'انسحابات القطوع المكافئة' } }
        ],
        problem: say('Nola lortzen da $y=2^{x-2}+1$ funtzioa $y=2^{x}$ funtziotik? Zein da haren asintota?', '¿Cómo se obtiene $y=2^{x-2}+1$ a partir de $y=2^{x}$? ¿Cuál es su asíntota?', 'كيف نحصل على $y=2^{x-2}+1$ من $y=2^{x}$؟ وما مقاربها؟', 'How do you get $y=2^{x-2}+1$ from $y=2^{x}$? What is its asymptote?'),
        stepsKind: 'steps',
        steps: [
            { text: say('2 eskuinera eta 1 gora.', '2 a la derecha y 1 hacia arriba.', '2 إلى اليمين و1 إلى الأعلى.', '2 to the right and 1 up.'), math: same('$(0,\\,1)\\ \\to\\ (2,\\,2)$') },
            { text: say('Asintota ere igotzen da.', 'La asíntota también sube.', 'يصعد المقارب أيضًا.', 'The asymptote also goes up.'), math: same('$y=1$') }
        ],
        takeaway: say('aˣ⁻ᵖ + q: p eskuinera, q gora. Asintota y = q eta (0, 1) puntua (p, 1 + q) puntura.', 'aˣ⁻ᵖ + q: p a la derecha, q hacia arriba. Asíntota y = q y el punto (0, 1) pasa a (p, 1 + q).', 'aˣ⁻ᵖ + q: p إلى اليمين وq إلى الأعلى. المقارب y = q والنقطة (0, 1) تصير (p, 1 + q).', 'aˣ⁻ᵖ + q: p to the right, q up. Asymptote y = q, and the point (0, 1) moves to (p, 1 + q).'),
        figure: (language) => <ExpShiftFigure language={language} />
    },

    /* ---------- 2. Growth, decay and equations ---------- */
    {
        id: 'growth',
        stage: 'growth',
        title: say('Hazkunde esponentziala', 'Crecimiento exponencial', 'النمو الأسي', 'Exponential growth'),
        goal: say('Ehuneko finko batean hazten diren magnitudeak $y=k\\cdot a^{x}$ eredu batekin adieraztea eta erabiltzea.', 'Expresar y usar con un modelo $y=k\\cdot a^{x}$ las magnitudes que crecen un porcentaje fijo.', 'التعبير عن الكميات التي تنمو بنسبة ثابتة بنموذج $y=k\\cdot a^{x}$ واستعماله.', 'Express and use, with a model $y=k\\cdot a^{x}$, quantities that grow by a fixed percentage.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'compound-interest', title: { eu: 'Interes konposatua', es: 'Interés compuesto', en: 'Compound interest', ar: 'الفائدة المركبة' } }
        ],
        problem: say('Herri batek 10\u00a0000 biztanle ditu eta urtero % 10 hazten da. Zenbat biztanle izango ditu 2 urte barru?', 'Un pueblo tiene 10\u00a0000 habitantes y crece un 10 % cada año. ¿Cuántos tendrá dentro de 2 años?', 'قرية فيها 10000 نسمة وتنمو 10 % كل سنة. كم سيكون عدد سكانها بعد سنتين؟', 'A village has 10,000 inhabitants and grows by 10% each year. How many will it have in 2 years?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorea: % 10 gehiago.', 'El factor: un 10 % más.', 'المعامل: 10 % أكثر.', 'The factor: 10% more.'), math: same('$a=1{,}1$') },
            { text: say('Eredua.', 'El modelo.', 'النموذج.', 'The model.'), math: same('$N=10\\,000\\cdot 1{,}1^{t}$') },
            { text: say('$t=2$.', '$t=2$.', '$t=2$.', '$t=2$.'), math: same('$10\\,000\\cdot 1{,}21=12\\,100$') }
        ],
        takeaway: say('Ehuneko finkoa: y = k · aˣ. % r igo: a = 1 + r/100; % r jaitsi: a = 1 − r/100.', 'Porcentaje fijo: y = k · aˣ. Subir r %: a = 1 + r/100; bajar r %: a = 1 − r/100.', 'نسبة ثابتة: y = k · aˣ. زيادة r %: a = 1 + r/100؛ نقص r %: a = 1 − r/100.', 'Fixed percentage: y = k · aˣ. Increase by r%: a = 1 + r/100; decrease by r%: a = 1 − r/100.'),
        figure: (language) => <GrowthFigure language={language} />
    },
    {
        id: 'decay',
        stage: 'growth',
        title: say('Beherakuntza eta erdibizitza', 'Decrecimiento y semivida', 'التناقص وعمر النصف', 'Decay and half-life'),
        goal: say('Beherakuntza esponentzialak eta erdibizitza ulertzea eta erabiltzea.', 'Entender y usar el decrecimiento exponencial y la semivida.', 'فهم التناقص الأسي وعمر النصف واستعمالهما.', 'Understand and use exponential decay and half-life.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'percent-change', title: { eu: 'Ehuneko igoerak eta jaitsierak', es: 'Aumentos y disminuciones porcentuales', en: 'Percentage increases and decreases', ar: 'الزيادة والنقصان بالنسبة المئوية' } }
        ],
        problem: say('Substantzia baten erdibizitza 8 egun da. 96 g badira, zenbat geratuko dira 24 egunean?', 'Una sustancia tiene una semivida de 8 días. Si hay 96 g, ¿cuántos quedarán en 24 días?', 'عمر النصف لمادة 8 أيام. إذا كان لدينا 96 غ فكم يبقى بعد 24 يومًا؟', 'A substance has a half-life of 8 days. If there are 96 g, how many grams will be left after 24 days?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbat erdibizitza?', '¿Cuántas semividas?', 'كم عمر نصف؟', 'How many half-lives?'), math: same('$\\frac{24}{8}=3$') },
            { text: say('Hiru aldiz erdira.', 'Tres veces a la mitad.', 'إلى النصف ثلاث مرات.', 'Three times halved.'), math: same('$96\\cdot\\left(\\frac{1}{2}\\right)^{3}=12$') }
        ],
        takeaway: say('Beherakuntza: 0 < a < 1. Erdibizitza bakoitzean erdia geratzen da, eta ez da inoiz 0 izatera iristen.', 'Decrecimiento: 0 < a < 1. En cada semivida queda la mitad, y nunca se llega a 0.', 'التناقص: 0 < a < 1. في كل عمر نصف يبقى النصف، ولا نبلغ 0 أبدًا.', 'Decay: 0 < a < 1. At each half-life, half is left, and it never reaches 0.'),
        figure: (language) => <DecayFigure language={language} />
    },
    {
        id: 'exp-equations',
        stage: 'growth',
        title: say('Ekuazio esponentzialak', 'Ecuaciones exponenciales', 'المعادلات الأسية', 'Exponential equations'),
        goal: say('Ekuazio esponentzialak ebaztea bi aldeak oinarri berean idatziz edo logaritmoak erabiliz.', 'Resolver ecuaciones exponenciales escribiendo los dos lados en la misma base o usando logaritmos.', 'حل المعادلات الأسية بكتابة الطرفين بالأساس نفسه أو باستعمال اللوغاريتمات.', 'Solve exponential equations by writing both sides with the same base or by using logarithms.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'power-rules', title: { eu: 'Berreturen propietateak', es: 'Propiedades de las potencias', en: 'Properties of powers', ar: 'خصائص القوى' } }
        ],
        problem: say('Ebatzi $4^{x+1}=8$.', 'Resuelve $4^{x+1}=8$.', 'حُلّ $4^{x+1}=8$.', 'Solve $4^{x+1}=8$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarri bera: 2.', 'Misma base: 2.', 'الأساس نفسه: 2.', 'Same base: 2.'), math: same('$2^{2x+2}=2^{3}$') },
            { text: say('Berdindu berretzaileak.', 'Iguala los exponentes.', 'ساوِ الأسين.', 'Set the exponents equal.'), math: same('$2x+2=3$') },
            { text: say('Askatu.', 'Despeja.', 'اعزل.', 'Solve for x.'), math: same('$x=\\frac{1}{2}$') }
        ],
        takeaway: say('Oinarri bera: berdindu berretzaileak. Bestela: x = log b / log a.', 'Misma base: iguala exponentes. Si no: x = log b / log a.', 'الأساس نفسه: ساوِ الأسين. وإلا: x = log b / log a.', 'Same base: set the exponents equal. If not: x = log b / log a.'),
        figure: (language) => <ExpEquationFigure language={language} />
    },

    /* ---------- 3. The logarithmic function ---------- */
    {
        id: 'log-values',
        stage: 'logarithmic',
        title: say('Logaritmoak', 'Logaritmos', 'اللوغاريتمات', 'Logarithms'),
        goal: say('Logaritmoaren definizioa gogoratzea eta logaritmo zehatzak kalkulatzea.', 'Recordar la definición de logaritmo y calcular logaritmos exactos.', 'تذكّر تعريف اللوغاريتم وحساب لوغاريتمات دقيقة.', 'Remember the definition of a logarithm and calculate exact logarithms.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'log-definition', title: { eu: 'Logaritmoa', es: 'El logaritmo', en: 'The logarithm', ar: 'اللوغاريتم' } }
        ],
        problem: say('Kalkulatu $\\log_5 125$ eta $\\log_2\\frac{1}{16}$.', 'Calcula $\\log_5 125$ y $\\log_2\\frac{1}{16}$.', 'احسب $\\log_5 125$ و$\\log_2\\frac{1}{16}$.', 'Work out $\\log_5 125$ and $\\log_2\\frac{1}{16}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('5 ber zenbat da 125?', '¿5 elevado a cuánto da 125?', '5 أس كم يساوي 125؟', '5 raised to what power gives 125?'), math: same('$5^{3}=125$') },
            { text: say('Alderantzizkoa: berretzaile negatiboa.', 'El inverso: exponente negativo.', 'المقلوب: أس سالب.', 'The reciprocal: a negative exponent.'), math: same('$2^{-4}=\\frac{1}{16}$') }
        ],
        takeaway: say('log_a x = y ⇔ aʸ = x. log_a 1 = 0 eta log_a a = 1. Ez dago logaritmorik 0 zenbakirako eta negatiboetarako.', 'log_a x = y ⇔ aʸ = x. log_a 1 = 0 y log_a a = 1. No hay logaritmo de 0 ni de negativos.', 'log_a x = y ⇔ aʸ = x. log_a 1 = 0 وlog_a a = 1. لا لوغاريتم للصفر ولا للسالب.', 'log_a x = y ⇔ aʸ = x. log_a 1 = 0 and log_a a = 1. There is no logarithm of 0 or of negative numbers.'),
        figure: (language) => <LogDefinitionFigure language={language} />
    },
    {
        id: 'log-graph',
        stage: 'logarithmic',
        title: say('$y=\\log_a x$ funtzioa', 'La función $y=\\log_a x$', 'الدالة $y=\\log_a x$', 'The function $y=\\log_a x$'),
        goal: say('$y=\\log_a x$ funtzioaren grafikoa eta propietateak ezagutzea eta esponentzialarekin erlazionatzea.', 'Conocer la gráfica y las propiedades de $y=\\log_a x$ y relacionarla con la exponencial.', 'التعرف إلى رسم $y=\\log_a x$ وخصائصها وربطها بالأسية.', 'Know the graph and properties of $y=\\log_a x$ and relate it to the exponential function.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'range-graph', title: { eu: 'Izate-eremua eta ibiltartea grafikoan', es: 'Dominio y recorrido en la gráfica', en: 'Domain and range on a graph', ar: 'المجال والمدى في الرسم' } }
        ],
        problem: say('$y=\\log_3 x$ izanik, kalkulatu $f(9)$ eta $f\\left(\\frac{1}{3}\\right)$. Zein da haren izate-eremua?', 'Siendo $y=\\log_3 x$, calcula $f(9)$ y $f\\left(\\frac{1}{3}\\right)$. ¿Cuál es su dominio?', 'إذا كان $y=\\log_3 x$ فاحسب $f(9)$ و$f\\left(\\frac{1}{3}\\right)$. ما مجالها؟', 'For $y=\\log_3 x$, calculate $f(9)$ and $f\\left(\\frac{1}{3}\\right)$. What is its domain?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$3^{2}=9$.', '$3^{2}=9$.', '$3^{2}=9$.', '$3^{2}=9$.'), math: same('$f(9)=2$') },
            { text: say('$3^{-1}=\\frac{1}{3}$.', '$3^{-1}=\\frac{1}{3}$.', '$3^{-1}=\\frac{1}{3}$.', '$3^{-1}=\\frac{1}{3}$.'), math: same('$f\\left(\\frac{1}{3}\\right)=-1$') },
            { text: say('Positiboak bakarrik.', 'Solo los positivos.', 'الموجبة فقط.', 'Only positive numbers.'), math: same('$(0,\\,+\\infty)$') }
        ],
        takeaway: say('log_a x: aˣ-ren alderantzizkoa. Beti (1, 0) puntutik, x > 0 bakarrik, x = 0 asintota.', 'log_a x: la inversa de aˣ. Siempre por (1, 0), solo x > 0, asíntota x = 0.', 'log_a x: عكس aˣ. دائمًا عبر (1, 0)، فقط x > 0، والمقارب x = 0.', 'log_a x: the inverse of aˣ. Always through (1, 0), only x > 0, asymptote x = 0.'),
        figure: (language) => <LogGraphFigure language={language} />
    },
    {
        id: 'log-shifts',
        stage: 'logarithmic',
        title: say('Logaritmoen lekualdaketak', 'Traslaciones de logaritmos', 'انسحابات اللوغاريتمات', 'Translations of logarithms'),
        goal: say('$y=\\log_a(x-p)+q$ funtzioen izate-eremua, asintota eta ebaki-puntuak aurkitzea.', 'Hallar el dominio, la asíntota y los cortes de $y=\\log_a(x-p)+q$.', 'إيجاد مجال $y=\\log_a(x-p)+q$ ومقاربها ونقاط تقاطعها.', 'Find the domain, the asymptote and the intercepts of $y=\\log_a(x-p)+q$.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'linear-inequality', title: { eu: 'Lehen mailako inekuazioak ebaztea', es: 'Resolver inecuaciones de primer grado', en: 'Solve first-degree inequalities', ar: 'حل متراجحات الدرجة الأولى' } }
        ],
        problem: say('Kalkulatu $y=\\log_3(x-1)+2$ funtzioaren izate-eremua eta $(1,\\,0)$ puntuaren irudia lekualdaketan.', 'Halla el dominio de $y=\\log_3(x-1)+2$ y adónde va el punto $(1,\\,0)$ en la traslación.', 'أوجد مجال $y=\\log_3(x-1)+2$ وإلى أين تنتقل النقطة $(1,\\,0)$.', 'Find the domain of $y=\\log_3(x-1)+2$ and where the point $(1,\\,0)$ goes after the translation.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrukoa positiboa.', 'Lo de dentro, positivo.', 'ما بالداخل موجب.', 'What is inside must be positive.'), math: same('$x-1>0\\ \\to\\ x>1$') },
            { text: say('1 eskuinera eta 2 gora.', '1 a la derecha y 2 arriba.', '1 يمينًا و2 أعلى.', '1 to the right and 2 up.'), math: same('$(1,\\,0)\\ \\to\\ (2,\\,2)$') }
        ],
        takeaway: say('log_a(x − p) + q: Dom = (p, +∞), asintota x = p, eta (1, 0) puntua (p + 1, q) puntura.', 'log_a(x − p) + q: Dom = (p, +∞), asíntota x = p, y (1, 0) pasa a (p + 1, q).', 'log_a(x − p) + q: Dom = (p, +∞)، المقارب x = p، و(1, 0) تصير (p + 1, q).', 'log_a(x − p) + q: Domain = (p, +∞), asymptote x = p, and (1, 0) moves to (p + 1, q).'),
        figure: (language) => <LogShiftFigure language={language} />
    },

    /* ---------- 4. Sine and cosine ---------- */
    {
        id: 'trig-values',
        stage: 'trigonometric',
        title: say('Angeluak radianetan', 'Ángulos en radianes', 'الزوايا بالراديان', 'Angles in radians'),
        goal: say('Radianetan emandako angelu ohikoen sinua eta kosinua zirkunferentzia unitarioan irakurtzea.', 'Leer en la circunferencia unidad el seno y el coseno de los ángulos habituales dados en radianes.', 'قراءة جيب الزوايا المألوفة المعطاة بالراديان وجيب تمامها على دائرة الوحدة.', 'Read the sine and cosine of common angles given in radians from the unit circle.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'unit-circle', title: { eu: 'Edozein angeluren arrazoiak', es: 'Razones de cualquier ángulo', en: 'Ratios of any angle', ar: 'نسب أي زاوية' } },
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'radians', title: { eu: 'Radiana', es: 'El radián', en: 'The radian', ar: 'الراديان' } }
        ],
        problem: say('Kalkulatu $\\sen\\frac{5\\pi}{2}$ eta $\\cos\\frac{4\\pi}{3}$.', 'Calcula $\\sen\\frac{5\\pi}{2}$ y $\\cos\\frac{4\\pi}{3}$.', 'احسب $\\sen\\frac{5\\pi}{2}$ و$\\cos\\frac{4\\pi}{3}$.', 'Calculate $\\sin\\frac{5\\pi}{2}$ and $\\cos\\frac{4\\pi}{3}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu buelta bat.', 'Quita una vuelta.', 'احذف دورة.', 'Remove one full turn.'), math: same('$\\sen\\frac{5\\pi}{2}=\\sen\\frac{\\pi}{2}=1$') },
            { text: say('$240°$: III. koadrantea.', '$240°$: tercer cuadrante.', '$240°$: الربع الثالث.', '$240°$: third quadrant.'), math: same('$\\cos\\frac{4\\pi}{3}=-\\frac{1}{2}$') }
        ],
        takeaway: say('Puntua (cos x, sin x) da. Buelta bat gehitzean (2π), balio berak.', 'El punto es (cos x, sen x). Al sumar una vuelta (2π), los mismos valores.', 'النقطة (cos x, sin x). بإضافة دورة (2π) نحصل على القيم نفسها.', 'The point is (cos x, sin x). Adding one full turn (2π) gives the same values.'),
        figure: (language) => <UnitCircleFigure language={language} />
    },
    {
        id: 'sine',
        stage: 'trigonometric',
        title: say('$y=\\sen x$ funtzioa', 'La función $y=\\sen x$', 'الدالة $y=\\sen x$', 'The function $y=\\sin x$'),
        goal: say('Sinu funtzioaren grafikoa eta propietateak ezagutzea: periodoa, ibiltartea, zeroak, maximoak eta minimoak.', 'Conocer la gráfica y las propiedades de la función seno: periodo, recorrido, ceros, máximos y mínimos.', 'التعرف إلى رسم دالة الجيب وخصائصها: الدور والمدى والأصفار والقيم العظمى والصغرى.', 'Know the graph and properties of the sine function: period, range, zeros, maxima and minima.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'periodic', title: { eu: 'Periodikotasuna eta joera', es: 'Periodicidad y tendencia', en: 'Periodicity and trend', ar: 'الدورية والاتجاه' } }
        ],
        problem: say('Zein $x$-tan du $y=\\sen x$ funtzioak maximoa $[0,\\,4\\pi]$ tartean? Eta zenbat zero ditu?', '¿En qué $x$ tiene máximos $y=\\sen x$ en $[0,\\,4\\pi]$? ¿Y cuántos ceros?', 'عند أي $x$ تبلغ $y=\\sen x$ قيمها العظمى في $[0,\\,4\\pi]$؟ وكم صفرًا لها؟', 'At which $x$ does $y=\\sin x$ have maxima in $[0,\\,4\\pi]$? And how many zeros?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maximoak, $2\\pi$-z behin.', 'Máximos, uno cada $2\\pi$.', 'عظمى كل $2\\pi$.', 'Maxima, one every $2\\pi$.'), math: same('$x=\\frac{\\pi}{2},\\ \\frac{5\\pi}{2}$') },
            { text: say('Zeroak: $k\\pi$.', 'Ceros: $k\\pi$.', 'الأصفار: $k\\pi$.', 'Zeros: $k\\pi$.'), math: same('$0,\\ \\pi,\\ 2\\pi,\\ 3\\pi,\\ 4\\pi$') }
        ],
        takeaway: say('sin x: periodoa 2π, ibiltartea [−1, 1], zeroak kπ, maximoa π/2 puntuan.', 'sen x: periodo 2π, recorrido [−1, 1], ceros en kπ, máximo en π/2.', 'sin x: الدور 2π، المدى [−1, 1]، الأصفار kπ، العظمى عند π/2.', 'sin x: period 2π, range [−1, 1], zeros at kπ, maximum at π/2.'),
        figure: (language) => <SineFigure language={language} />
    },
    {
        id: 'cosine',
        stage: 'trigonometric',
        title: say('$y=\\cos x$ funtzioa', 'La función $y=\\cos x$', 'الدالة $y=\\cos x$', 'The function $y=\\cos x$'),
        goal: say('Kosinu funtzioaren grafikoa eta propietateak ezagutzea eta sinuarekin erlazionatzea.', 'Conocer la gráfica y las propiedades de la función coseno y relacionarla con el seno.', 'التعرف إلى رسم دالة جيب التمام وخصائصها وربطها بالجيب.', 'Know the graph and properties of the cosine function and relate it to the sine.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'fundamental', title: { eu: 'Oinarrizko erlazioak', es: 'Relaciones fundamentales', en: 'Fundamental relationships', ar: 'العلاقات الأساسية' } }
        ],
        problem: say('Zenbat da $\\cos 3\\pi$? Eta zein da $y=\\cos x$ funtzioaren lehen zero positiboa?', '¿Cuánto vale $\\cos 3\\pi$? ¿Y cuál es el primer cero positivo de $y=\\cos x$?', 'كم يساوي $\\cos 3\\pi$؟ وما أول صفر موجب للدالة $y=\\cos x$؟', 'What is $\\cos 3\\pi$? And what is the first positive zero of $y=\\cos x$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu buelta bat.', 'Quita una vuelta.', 'احذف دورة.', 'Remove one full turn.'), math: same('$\\cos 3\\pi=\\cos\\pi=-1$') },
            { text: say('Lehen zeroa.', 'El primer cero.', 'أول صفر.', 'The first zero.'), math: same('$x=\\frac{\\pi}{2}$') }
        ],
        takeaway: say('cos x: sinua π/2 ezkerrera. Maximoa 0 puntuan, zeroak π/2 + kπ, bikoitia.', 'cos x: el seno π/2 a la izquierda. Máximo en 0, ceros en π/2 + kπ, par.', 'cos x: الجيب منقولًا π/2 إلى اليسار. العظمى عند 0، الأصفار π/2 + kπ، زوجية.', 'cos x: the sine moved π/2 to the left. Maximum at 0, zeros at π/2 + kπ, even.'),
        figure: (language) => <CosineFigure language={language} />
    },

    /* ---------- 5. Amplitude, period and tangent ---------- */
    {
        id: 'amplitude',
        stage: 'transforms',
        title: say('Anplitudea eta lekualdaketa bertikala', 'Amplitud y traslación vertical', 'السعة والانسحاب الرأسي', 'Amplitude and vertical translation'),
        goal: say('$y=A\\sen x+d$ funtzioen ibiltartea, maximoa eta minimoa kalkulatzea.', 'Calcular el recorrido, el máximo y el mínimo de $y=A\\sen x+d$.', 'حساب مدى $y=A\\sen x+d$ وقيمتيها العظمى والصغرى.', 'Calculate the range, the maximum and the minimum of $y=A\\sin x+d$.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'range-graph', title: { eu: 'Izate-eremua eta ibiltartea grafikoan', es: 'Dominio y recorrido en la gráfica', en: 'Domain and range on a graph', ar: 'المجال والمدى في الرسم' } }
        ],
        problem: say('Kalkulatu $y=3\\sen x-1$ funtzioaren maximoa eta minimoa.', 'Halla el máximo y el mínimo de $y=3\\sen x-1$.', 'أوجد القيمة العظمى والصغرى لـ $y=3\\sen x-1$.', 'Find the maximum and minimum of $y=3\\sin x-1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maximoa: $\\sen x=1$.', 'Máximo: $\\sen x=1$.', 'العظمى: $\\sen x=1$.', 'Maximum: $\\sin x=1$.'), math: same('$3-1=2$') },
            { text: say('Minimoa: $\\sen x=-1$.', 'Mínimo: $\\sen x=-1$.', 'الصغرى: $\\sen x=-1$.', 'Minimum: $\\sin x=-1$.'), math: same('$-3-1=-4$') }
        ],
        takeaway: say('A · sin x + d: anplitudea |A|, erdiko maila d. Ibiltartea [d − |A|, d + |A|].', 'A · sen x + d: amplitud |A|, nivel medio d. Recorrido [d − |A|, d + |A|].', 'A · sin x + d: السعة |A| والمستوى الأوسط d. المدى [d − |A|, d + |A|].', 'A · sin x + d: amplitude |A|, midline d. Range [d − |A|, d + |A|].'),
        figure: (language) => <AmplitudeFigure language={language} />
    },
    {
        id: 'period',
        stage: 'transforms',
        title: say('$y=\\sen kx$ funtzioaren periodoa', 'El periodo de $y=\\sen kx$', 'دور $y=\\sen kx$', 'The period of $y=\\sin kx$'),
        goal: say('$y=\\sen kx$ eta $y=\\cos kx$ funtzioen periodoa kalkulatzea eta grafikoan irakurtzea.', 'Calcular el periodo de $y=\\sen kx$ y $y=\\cos kx$ y leerlo en la gráfica.', 'حساب دور $y=\\sen kx$ و$y=\\cos kx$ وقراءته على الرسم.', 'Calculate the period of $y=\\sin kx$ and $y=\\cos kx$ and read it from the graph.'),
        needs: [
            { unit: 'dbh4-akademikoak/funciones', topic: 'periodic', title: { eu: 'Periodikotasuna eta joera', es: 'Periodicidad y tendencia', en: 'Periodicity and trend', ar: 'الدورية والاتجاه' } }
        ],
        problem: say('Kalkulatu $y=\\cos 4x$ funtzioaren periodoa eta lehen maximo positiboa.', 'Halla el periodo de $y=\\cos 4x$ y su primer máximo positivo.', 'أوجد دور $y=\\cos 4x$ وأول قيمة عظمى موجبة لها.', 'Find the period of $y=\\cos 4x$ and its first positive maximum.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Periodoa.', 'El periodo.', 'الدور.', 'The period.'), math: same('$T=\\frac{2\\pi}{4}=\\frac{\\pi}{2}$') },
            { text: say('$x=0$ ondoren, periodo bat geroago.', 'Tras $x=0$, un periodo después.', 'بعد $x=0$ بدور واحد.', 'After $x=0$, one period later.'), math: same('$x=\\frac{\\pi}{2}$') }
        ],
        takeaway: say('sin kx eta cos kx: periodoa 2π/k. k handiagoa, uhin estuagoak; altuera berdina.', 'sen kx y cos kx: periodo 2π/k. k mayor, ondas más apretadas; la misma altura.', 'sin kx وcos kx: الدور 2π/k. k أكبر: موجات أضيق؛ الارتفاع نفسه.', 'sin kx and cos kx: period 2π/k. Larger k, tighter waves; the same height.'),
        figure: (language) => <PeriodFigure language={language} />
    },
    {
        id: 'tangent',
        stage: 'transforms',
        title: say('$y=\\tg x$ funtzioa', 'La función $y=\\tg x$', 'الدالة $y=\\tg x$', 'The function $y=\\tan x$'),
        goal: say('Tangente funtzioaren grafikoa, periodoa, asintotak eta izate-eremua ezagutzea.', 'Conocer la gráfica, el periodo, las asíntotas y el dominio de la función tangente.', 'التعرف إلى رسم دالة الظل ودورها ومقارباتها ومجالها.', 'Know the graph, the period, the asymptotes and the domain of the tangent function.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'right-ratios', title: { eu: 'Sinua, kosinua eta tangentea', es: 'Seno, coseno y tangente', en: 'Sine, cosine and tangent', ar: 'الجيب وجيب التمام والظل' } }
        ],
        problem: say('Kalkulatu $\\tg\\frac{5\\pi}{4}$. Zein da $\\frac{\\pi}{2}$ ondorengo asintota?', 'Calcula $\\tg\\frac{5\\pi}{4}$. ¿Cuál es la asíntota después de $\\frac{\\pi}{2}$?', 'احسب $\\tg\\frac{5\\pi}{4}$. ما المقارب التالي بعد $\\frac{\\pi}{2}$؟', 'Calculate $\\tan\\frac{5\\pi}{4}$. What is the asymptote after $\\frac{\\pi}{2}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Periodoa $\\pi$: kendu $\\pi$.', 'Periodo $\\pi$: quita $\\pi$.', 'الدور $\\pi$: اطرح $\\pi$.', 'Period $\\pi$: take away $\\pi$.'), math: same('$\\tg\\frac{5\\pi}{4}=\\tg\\frac{\\pi}{4}=1$') },
            { text: say('Asintotak $\\pi$-z behin.', 'Una asíntota cada $\\pi$.', 'مقارب كل $\\pi$.', 'One asymptote every $\\pi$.'), math: same('$x=\\frac{3\\pi}{2}$') }
        ],
        takeaway: say('tg x: periodoa π, asintotak π/2 + kπ puntuetan, adar bakoitzean gorakorra.', 'tg x: periodo π, asíntotas en π/2 + kπ, creciente en cada rama.', 'tan x: الدور π، المقاربات عند π/2 + kπ، متزايدة في كل فرع.', 'tan x: period π, asymptotes at π/2 + kπ, increasing on each branch.'),
        figure: (language) => <TangentFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const exponentialAkTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...localizeNames(exponentialAkLessonTexts[topic.id as ExponentialAkTopicId]), ...localizeNames(exponentialAkLessonChecks[topic.id as ExponentialAkTopicId]) }))

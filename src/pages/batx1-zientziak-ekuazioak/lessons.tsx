import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { ExponentialFigure, IntervalIntersectionFigure, LogEquationFigure, RationalEquationFigure } from '../dbh4-akademikoak-ekuazioak/figures'
import { FactorStrategyFigure } from '../dbh4-akademikoak-polinomioak/figures'
import { FactoredFigure, RadicalFigure } from '../dbh4-aplikatuak-ekuazioak/figures'
import { AlgebraicFractionFigure, RuffiniFigure } from '../dbh4-aplikatuak-polinomioak/figures'
import { AbsoluteFoldFigure, ChangeVariableFigure, SignTableFigure } from './figures'
import { bachEquationsLessonChecks, type BachEquationsTopicId } from './lessonChecks'
import { bachEquationsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Ekuazioak eta inekuazioak · Batxilergoa 1 · Zientziak — stages and
   lessons. The scope follows unit 2 of Santillana 1.º Bachillerato
   Ciencias and sections 1–3 and 6 of unit 3 of Anaya Matemáticas I (the
   systems and Gauss go to the next topic). What 4. DBH académicas already
   taught comes back as a short review with «Review first» links; Ruffini
   on higher degrees, the change of variable x³ and aˣ, two radicals,
   absolute value, the domain of logarithms, sign tables and rational
   inequalities are new.
   ========================================================================== */

export type BachEquationsStageId = 'polynomials' | 'polynomial-equations' | 'radical-absolute' | 'exp-log' | 'inequalities'

export const bachEquationsStages: UnitStage[] = [
    { id: 'polynomials', tone: 'blue', title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'الحدوديات' } },
    { id: 'polynomial-equations', tone: 'violet', title: { eu: 'Ekuazio polinomikoak eta arrazionalak', es: 'Ecuaciones polinómicas y racionales', en: 'Polynomial and rational equations', ar: 'المعادلات الحدودية والكسرية' } },
    { id: 'radical-absolute', tone: 'mustard', title: { eu: 'Erroak eta balio absolutua', es: 'Radicales y valor absoluto', en: 'Radicals and absolute value', ar: 'الجذور والقيمة المطلقة' } },
    { id: 'exp-log', tone: 'coral', title: { eu: 'Esponentzialak eta logaritmikoak', es: 'Exponenciales y logarítmicas', en: 'Exponential and logarithmic', ar: 'الأسية واللوغاريتمية' } },
    { id: 'inequalities', tone: 'green', title: { eu: 'Inekuazioak', es: 'Inecuaciones', en: 'Inequalities', ar: 'المتراجحات' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Polynomials ---------- */
    {
        id: 'ruffini-roots',
        stage: 'polynomials',
        title: say('Erro osoak eta Ruffini', 'Raíces enteras y Ruffini', 'الجذور الصحيحة وروفيني', 'Integer roots and Ruffini'),
        goal: say('Polinomio baten erro osoak aurkitzea, gai askearen zatitzaileak Ruffiniren erregelarekin probatuz.', 'Encontrar las raíces enteras de un polinomio probando con Ruffini los divisores del término independiente.', 'إيجاد الجذور الصحيحة لحدودية بتجربة قواسم الحد الثابت بقاعدة روفيني.', 'Find the integer roots of a polynomial by trying the divisors of the constant term with Ruffini\'s rule.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'ruffini', title: { eu: 'Ruffiniren erregela', es: 'La regla de Ruffini', en: 'Ruffini\'s rule', ar: 'قاعدة روفيني' } },
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'roots', title: { eu: 'Polinomio baten erroak', es: 'Raíces de un polinomio', en: 'Roots of a polynomial', ar: 'جذور الحدودية' } }
        ],
        problem: say('Aurkitu $P(x)=x^3-2x^2-5x+6$ polinomioaren erro osoak.', 'Halla las raíces enteras de $P(x)=x^3-2x^2-5x+6$.', 'أوجد الجذور الصحيحة للحدودية $P(x)=x^3-2x^2-5x+6$.', 'Find the integer roots of $P(x)=x^3-2x^2-5x+6$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hautagaiak: 6 zenbakiaren zatitzaileak.', 'Candidatas: los divisores de 6.', 'المرشحة: قواسم 6.', 'Candidates: the divisors of 6.'), math: same('$\\pm 1,\\ \\pm 2,\\ \\pm 3,\\ \\pm 6$') },
            { text: say('$P(1)=0$: zatitu $x-1$ binomioaz.', '$P(1)=0$: divide entre $x-1$.', '$P(1)=0$: اقسم على $x-1$.', '$P(1)=0$: divide by $x-1$.'), math: same('$P(x)=(x-1)(x^2-x-6)$') },
            { text: say('Bigarren mailako zatidurak beste biak ematen ditu.', 'El cociente de grado 2 da las otras dos.', 'يعطي خارج القسمة من الدرجة الثانية الجذرين الآخرين.', 'The degree-2 quotient gives the other two.'), math: same('$x^2-x-6=0\\ \\to\\ x=3,\\ x=-2$') }
        ],
        takeaway: say('Erro oso bakoitzak gai askea zatitzen du. $a$ erro bakoitzak $(x-a)$ faktore bat ematen du, eta maila bat jaisten du.', 'Toda raíz entera divide al término independiente. Cada raíz $a$ da un factor $(x-a)$ y baja el grado en uno.', 'كل جذر صحيح يقسم الحد الثابت. وكل جذر $a$ يعطي عاملًا $(x-a)$ وينقص الدرجة واحدًا.', 'Every integer root divides the constant term. Each root $a$ gives a factor $(x-a)$ and lowers the degree by one.'),
        figure: (language) => <RuffiniFigure language={language} />
    },
    {
        id: 'factorize-high',
        stage: 'polynomials',
        title: say('Maila handiko polinomioak faktorizatzea', 'Factorizar polinomios de grado alto', 'تحليل حدوديات الدرجات العليا', 'Factorising higher-degree polynomials'),
        goal: say('Maila handiko polinomio bat faktoreetan deskonposatzea: faktore komuna atera, Ruffini behin baino gehiagotan aplikatu eta errorik gabeko bigarren mailako faktoreak ezagutu.', 'Descomponer en factores un polinomio de grado alto: sacar factor común, aplicar Ruffini varias veces y reconocer los factores de grado 2 sin raíces.', 'تحليل حدودية من درجة عالية: إخراج العامل المشترك وتطبيق روفيني عدة مرات وتمييز عوامل الدرجة الثانية التي لا جذور لها.', 'Break a higher-degree polynomial into factors: take out a common factor, apply Ruffini several times and spot the degree-2 factors with no roots.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'factorize', title: { eu: 'Polinomioak faktorizatzea', es: 'Factorizar polinomios', en: 'Factorising polynomials', ar: 'تحليل الحدوديات' } }
        ],
        problem: say('Faktorizatu $x^4+x^3-x-1$.', 'Factoriza $x^4+x^3-x-1$.', 'حلّل $x^4+x^3-x-1$.', 'Factorise $x^4+x^3-x-1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ez dago faktore komunik. Ruffini, $x=1$ balioarekin.', 'No hay factor común. Ruffini con $x=1$.', 'لا عامل مشترك. روفيني مع $x=1$.', 'There is no common factor. Ruffini with $x=1$.'), math: same('$\\begin{gathered}x^4+x^3-x-1\\\\ =(x-1)(x^3+2x^2+2x+1)\\end{gathered}$') },
            { text: say('Berriro Ruffini, $x=-1$ balioarekin.', 'Otra vez Ruffini, con $x=-1$.', 'روفيني مرة أخرى مع $x=-1$.', 'Ruffini again, with $x=-1$.'), math: same('$\\begin{gathered}x^3+2x^2+2x+1\\\\ =(x+1)(x^2+x+1)\\end{gathered}$') },
            { text: say('$x^2+x+1$ polinomioak ez du erro errealik: $\\Delta=1-4<0$.', '$x^2+x+1$ no tiene raíces: $\\Delta=1-4<0$.', 'ليس لـ $x^2+x+1$ جذور: $\\Delta=1-4<0$.', '$x^2+x+1$ has no roots: $\\Delta=1-4<0$.'), math: same('$(x-1)(x+1)(x^2+x+1)$') }
        ],
        takeaway: say('Ordena: faktore komuna, Ruffini zatitzaileekin, eta formula azken bigarren mailako faktorearentzat. Haren diskriminatzailea negatiboa bada, faktore hori ez da gehiago deskonposatzen.', 'Orden: factor común, Ruffini con los divisores y la fórmula para el último factor de grado 2. Si su discriminante es negativo, ese factor no se descompone más.', 'الترتيب: العامل المشترك، ثم روفيني بالقواسم، ثم الصيغة لآخر عامل من الدرجة الثانية. وإذا كان مميزه سالبًا فلا يتحلل أكثر.', 'Order: common factor, Ruffini with the divisors, and the formula for the last degree-2 factor. If its discriminant is negative, that factor does not break down any further.'),
        figure: (language) => <FactorStrategyFigure language={language} />
    },
    {
        id: 'algebraic-fractions',
        stage: 'polynomials',
        title: say('Zatiki aljebraikoekin eragiketak', 'Operar con fracciones algebraicas', 'العمليات على الكسور الجبرية', 'Working with algebraic fractions'),
        goal: say('Zatiki aljebraikoak sinplifikatzea eta haiekin eragiketak egitea, zenbakitzailea eta izendatzailea faktorizatuz, izendatzailea anulatzen duten balioak ahaztu gabe.', 'Simplificar y operar fracciones algebraicas factorizando numerador y denominador, sin olvidar los valores que anulan el denominador.', 'تبسيط الكسور الجبرية وإجراء العمليات عليها بتحليل البسط والمقام، دون نسيان القيم التي تعدم المقام.', 'Simplify and operate with algebraic fractions by factorising numerator and denominator, without forgetting the values that make the denominator zero.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'simplify', title: { eu: 'Zatiki aljebraikoak sinplifikatzea', es: 'Simplificar fracciones algebraicas', en: 'Simplifying algebraic fractions', ar: 'تبسيط الكسور الجبرية' } },
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'add-fractions', title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', en: 'Addition and subtraction', ar: 'الجمع والطرح' } }
        ],
        problem: say('Sinplifikatu $\\frac{x^2-9}{x^2+x-6}$.', 'Simplifica $\\frac{x^2-9}{x^2+x-6}$.', 'بسّط $\\frac{x^2-9}{x^2+x-6}$.', 'Simplify $\\frac{x^2-9}{x^2+x-6}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu goian eta behean.', 'Factoriza arriba y abajo.', 'حلّل البسط والمقام.', 'Factorise top and bottom.'), math: same('$\\frac{x^2-9}{x^2+x-6}=\\frac{(x-3)(x+3)}{(x+3)(x-2)}$') },
            { text: say('Ezabatu faktore komuna.', 'Elimina el factor común.', 'احذف العامل المشترك.', 'Cancel the common factor.'), math: same('$\\frac{x-3}{x-2}$') },
            { text: say('Idatzi debekatutako balioak: hasierako izendatzailea anulatzen dute.', 'Anota los valores prohibidos: anulan el denominador de partida.', 'اكتب القيم الممنوعة: إنها تعدم المقام الأصلي.', 'Write down the excluded values: they make the starting denominator zero.'), math: same('$x\\neq -3,\\ x\\neq 2$') }
        ],
        takeaway: say('Faktoreak bakarrik sinplifikatzen dira, inoiz ez batugaiak. Hasierako izendatzailea anulatzen duten balioak debekatuta jarraitzen dute sinplifikatu ondoren.', 'Solo se simplifican factores, nunca sumandos. Los valores que anulan el denominador de partida siguen prohibidos después de simplificar.', 'لا تُبسّط إلا العوامل، ولا تُبسّط الحدود المجموعة أبدًا. والقيم التي تعدم المقام الأصلي تبقى ممنوعة بعد التبسيط.', 'Only factors cancel, never terms of a sum. The values that make the starting denominator zero stay excluded after simplifying.'),
        figure: (language) => <AlgebraicFractionFigure language={language} />
    },

    /* ---------- 2. Polynomial and rational equations ---------- */
    {
        id: 'high-degree',
        stage: 'polynomial-equations',
        title: say('Hiru mailako edo handiagoko ekuazioak', 'Ecuaciones de grado tres o más', 'معادلات الدرجة الثالثة فما فوق', 'Equations of degree three or more'),
        goal: say('Maila handiko ekuazio polinomikoak ebaztea, faktorizatuz eta biderkadura bat 0 dela bere faktoreren bat 0 denean erabiliz.', 'Resolver ecuaciones polinómicas de grado alto factorizando y usando que un producto es 0 cuando lo es alguno de sus factores.', 'حل المعادلات الحدودية ذات الدرجة العالية بالتحليل واستعمال أن الجداء يساوي 0 عندما يساوي 0 أحد عوامله.', 'Solve higher-degree polynomial equations by factorising and using that a product is 0 when one of its factors is 0.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'factored', title: { eu: 'Faktorizatuz ebaztea', es: 'Resolver factorizando', en: 'Solving by factorising', ar: 'الحل بالتحليل' } }
        ],
        problem: say('Ebatzi $x^3-3x^2-4x+12=0$.', 'Resuelve $x^3-3x^2-4x+12=0$.', 'حُلّ $x^3-3x^2-4x+12=0$.', 'Solve $x^3-3x^2-4x+12=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Taldekatu gaiak binaka.', 'Agrupa los términos de dos en dos.', 'حلّل بتجميع الحدود مثنى مثنى.', 'Group the terms in pairs.'), math: same('$x^2(x-3)-4(x-3)=0$') },
            { text: say('Atera $x-3$ faktore komuna.', 'Saca el factor común $x-3$.', 'أخرج العامل المشترك $x-3$.', 'Take out the common factor $x-3$.'), math: same('$(x-3)(x^2-4)=0$') },
            { text: say('Faktore bakoitza 0 eginda.', 'Cada factor igualado a 0.', 'نساوي كل عامل بـ 0.', 'Each factor set equal to 0.'), math: same('$x=3,\\ x=2,\\ x=-2$') }
        ],
        takeaway: say('$A\\cdot B\\cdot C=0$ bada, faktoreren bat 0 da. Ez zatitu $x$ zenbakiaz: $x=0$ soluzioa gal zenezake.', 'Si $A\\cdot B\\cdot C=0$, alguno de los factores es 0. No dividas entre $x$: perderías la solución $x=0$.', 'إذا كان $A\\cdot B\\cdot C=0$ فأحد العوامل يساوي 0. لا تقسم على $x$: قد تضيّع الحل $x=0$.', 'If $A\\cdot B\\cdot C=0$, one of the factors is 0. Do not divide by $x$: you could lose the solution $x=0$.'),
        figure: (language) => <FactoredFigure language={language} />
    },
    {
        id: 'change-variable',
        stage: 'polynomial-equations',
        title: say('Aldagai-aldaketa', 'Cambio de variable', 'تغيير المتغير', 'Change of variable'),
        goal: say('$ax^{2n}+bx^n+c=0$ motako ekuazioak $t=x^n$ aldaketarekin ebaztea, eta aldaketa soluziorik galdu edo asmatu gabe desegitea.', 'Resolver ecuaciones del tipo $ax^{2n}+bx^n+c=0$ con el cambio $t=x^n$, y deshacer el cambio sin perder ni inventar soluciones.', 'حل المعادلات من النوع $ax^{2n}+bx^n+c=0$ بالتغيير $t=x^n$، وعكس التغيير دون إضاعة حلول أو اختلاقها.', 'Solve equations of the form $ax^{2n}+bx^n+c=0$ with the change $t=x^n$, and undo the change without losing or inventing solutions.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'biquadratic', title: { eu: 'Ekuazio bikarratuak', es: 'Ecuaciones bicuadradas', en: 'Biquadratic equations', ar: 'المعادلات الثنائية التربيع' } }
        ],
        problem: say('Ebatzi $x^6-7x^3-8=0$.', 'Resuelve $x^6-7x^3-8=0$.', 'حُلّ $x^6-7x^3-8=0$.', 'Solve $x^6-7x^3-8=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldaketa: $t=x^3$.', 'Cambio: $t=x^3$.', 'التغيير: $t=x^3$.', 'Change: $t=x^3$.'), math: same('$t^2-7t-8=0$') },
            { text: say('Bigarren mailako ekuazioa.', 'Ecuación de segundo grado.', 'معادلة من الدرجة الثانية.', 'A second-degree equation.'), math: same('$t=8,\\ t=-1$') },
            { text: say('Desegin aldaketa: zenbaki negatibo baten erro kubikoa existitzen da.', 'Deshaz el cambio: la raíz cúbica de un negativo existe.', 'اعكس التغيير: الجذر التكعيبي لعدد سالب موجود.', 'Undo the change: the cube root of a negative number exists.'), math: same('$\\begin{gathered}x^3=8\\ \\to\\ x=2\\\\ x^3=-1\\ \\to\\ x=-1\\end{gathered}$') }
        ],
        takeaway: say('$t=x^2$ eginda, $t>0$ bakoitzak bi soluzio ematen ditu, $\\pm\\sqrt{t}$, eta $t<0$ bakoitzak bat ere ez. $t=x^3$ eginda, $t$ bakoitzak bat bakarra, $\\sqrt[3]{t}$.', 'Con $t=x^2$, cada $t>0$ da dos soluciones, $\\pm\\sqrt{t}$, y cada $t<0$ ninguna. Con $t=x^3$, cada $t$ da una sola, $\\sqrt[3]{t}$.', 'مع $t=x^2$ يعطي كل $t>0$ حلّين $\\pm\\sqrt{t}$، ولا يعطي $t<0$ أي حل. ومع $t=x^3$ يعطي كل $t$ حلًّا واحدًا $\\sqrt[3]{t}$.', 'With $t=x^2$, each $t>0$ gives two solutions, $\\pm\\sqrt{t}$, and each $t<0$ none. With $t=x^3$, each $t$ gives just one, $\\sqrt[3]{t}$.'),
        figure: (language) => <ChangeVariableFigure language={language} kind="power" />
    },
    {
        id: 'rational-equations',
        stage: 'polynomial-equations',
        title: say('Zatiki aljebraikoak dituzten ekuazioak', 'Ecuaciones con fracciones algebraicas', 'معادلات فيها كسور جبرية', 'Equations with algebraic fractions'),
        goal: say('$x$ izendatzailean duten ekuazioak ebaztea m.k.t.-az biderkatuz, eta izendatzaileren bat anulatzen duten soluzioak baztertuz.', 'Resolver ecuaciones con $x$ en el denominador multiplicando por el m.c.m. y descartando las soluciones que anulan algún denominador.', 'حل معادلات فيها $x$ في المقام بالضرب في المضاعف المشترك الأصغر مع استبعاد الحلول التي تعدم أحد المقامات.', 'Solve equations with $x$ in the denominator by multiplying by the LCM and discarding the solutions that make a denominator zero.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'rational', title: { eu: 'Ekuazio arrazionalak', es: 'Ecuaciones racionales', en: 'Rational equations', ar: 'المعادلات الكسرية' } }
        ],
        problem: say('Ebatzi $\\frac{x}{x-1}+\\frac{2}{x+1}=\\frac{2}{x^2-1}$.', 'Resuelve $\\frac{x}{x-1}+\\frac{2}{x+1}=\\frac{2}{x^2-1}$.', 'حُلّ $\\frac{x}{x-1}+\\frac{2}{x+1}=\\frac{2}{x^2-1}$.', 'Solve $\\frac{x}{x-1}+\\frac{2}{x+1}=\\frac{2}{x^2-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu m.k.t.-az, $(x-1)(x+1)$.', 'Multiplica por el m.c.m., $(x-1)(x+1)$.', 'اضرب في المضاعف المشترك الأصغر $(x-1)(x+1)$.', 'Multiply by the LCM, $(x-1)(x+1)$.'), math: same('$x(x+1)+2(x-1)=2$') },
            { text: say('Bigarren mailako ekuazioa.', 'Ecuación de segundo grado.', 'معادلة من الدرجة الثانية.', 'A second-degree equation.'), math: same('$\\begin{gathered}x^2+3x-4=0\\\\ \\to\\ x=1,\\ x=-4\\end{gathered}$') },
            { text: say('$x=1$ balioak izendatzaile bat anulatzen du: ez da soluzioa.', '$x=1$ anula un denominador: no vale.', '$x=1$ يعدم أحد المقامات: ليس حلًّا.', '$x=1$ makes a denominator zero: it does not work.'), math: same('$x=-4$') }
        ],
        takeaway: say('m.k.t.-az biderkatzean soluzio faltsuak ager daitezke: baztertu izendatzaileren bat anulatzen dutenak.', 'Al multiplicar por el m.c.m. pueden aparecer soluciones falsas: descarta las que anulan algún denominador.', 'عند الضرب في المضاعف المشترك الأصغر قد تظهر حلول زائفة: استبعد التي تعدم أحد المقامات.', 'Multiplying by the LCM can bring in false solutions: discard those that make a denominator zero.'),
        figure: (language) => <RationalEquationFigure language={language} />
    },

    /* ---------- 3. Radicals and absolute value ---------- */
    {
        id: 'radical-equations',
        stage: 'radical-absolute',
        title: say('Erroak dituzten ekuazioak', 'Ecuaciones con radicales', 'معادلات فيها جذور', 'Equations with radicals'),
        goal: say('Erro bat edo bi dituzten ekuazioak ebaztea, erro bat isolatuz, karratura jasoz eta soluzio guztiak egiaztatuz.', 'Resolver ecuaciones con uno o dos radicales aislando un radical, elevando al cuadrado y comprobando todas las soluciones.', 'حل معادلات فيها جذر أو جذران بعزل جذر والتربيع والتحقق من كل الحلول.', 'Solve equations with one or two radicals by isolating a radical, squaring and checking every solution.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'radical', title: { eu: 'Ekuazio irrazionalak', es: 'Ecuaciones irracionales', en: 'Radical equations', ar: 'المعادلات الجذرية' } }
        ],
        problem: say('Ebatzi $\\sqrt{x+5}-\\sqrt{x}=1$.', 'Resuelve $\\sqrt{x+5}-\\sqrt{x}=1$.', 'حُلّ $\\sqrt{x+5}-\\sqrt{x}=1$.', 'Solve $\\sqrt{x+5}-\\sqrt{x}=1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Isolatu erro bat.', 'Aísla un radical.', 'اعزل أحد الجذرين.', 'Isolate one radical.'), math: same('$\\sqrt{x+5}=1+\\sqrt{x}$') },
            { text: say('Jaso karratura: $(1+\\sqrt{x})^2$ adierazpenak hiru gai ditu.', 'Eleva al cuadrado: $(1+\\sqrt{x})^2$ tiene tres términos.', 'ربّع الطرفين: في $(1+\\sqrt{x})^2$ ثلاثة حدود.', 'Square: $(1+\\sqrt{x})^2$ has three terms.'), math: same('$x+5=1+2\\sqrt{x}+x$') },
            { text: say('Erro bakarra geratzen da: $\\sqrt{x}=2$. Egiaztatu: $3-2=1$.', 'Queda un solo radical: $\\sqrt{x}=2$. Comprueba: $3-2=1$.', 'يبقى جذر واحد: $\\sqrt{x}=2$. تحقق: $3-2=1$.', 'Only one radical is left: $\\sqrt{x}=2$. Check: $3-2=1$.'), math: same('$x=4$') }
        ],
        takeaway: say('Isolatu erro bat karratura jaso aurretik, eta gogoratu $(a+b)^2=a^2+2ab+b^2$. Karratura jasotzeak soluzio faltsuak gehi ditzake: egiaztatu beti.', 'Aísla un radical antes de elevar al cuadrado, y recuerda que $(a+b)^2=a^2+2ab+b^2$. Elevar al cuadrado puede añadir soluciones falsas: comprueba siempre.', 'اعزل جذرًا قبل التربيع، وتذكّر أن $(a+b)^2=a^2+2ab+b^2$. وقد يضيف التربيع حلولًا زائفة: تحقق دائمًا.', 'Isolate a radical before squaring, and remember that $(a+b)^2=a^2+2ab+b^2$. Squaring can add false solutions: always check.'),
        figure: (language) => <RadicalFigure language={language} />
    },
    {
        id: 'absolute-equations',
        stage: 'radical-absolute',
        title: say('Balio absolutua duten ekuazioak', 'Ecuaciones con valor absoluto', 'معادلات فيها قيمة مطلقة', 'Equations with absolute value'),
        goal: say('Balio absolutua duten ekuazioak ebaztea, bi kasuak bereizita eta soluzioak egiaztatuta.', 'Resolver ecuaciones con valor absoluto separando los dos casos y comprobando las soluciones.', 'حل معادلات فيها قيمة مطلقة بفصل الحالتين والتحقق من الحلول.', 'Solve equations with absolute value by splitting the two cases and checking the solutions.'),
        needs: [
            { unit: 'batx1-zientziak/numeros-reales', topic: 'absolute-value', title: { eu: 'Balio absolutua eta distantzia', es: 'Valor absoluto y distancia', en: 'Absolute value and distance', ar: 'القيمة المطلقة والمسافة' } }
        ],
        problem: say('Ebatzi $|2x-3|=5$.', 'Resuelve $|2x-3|=5$.', 'حُلّ $|2x-3|=5$.', 'Solve $|2x-3|=5$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barrukoak 5 edo $-5$ balio du.', 'Lo de dentro vale 5 o $-5$.', 'ما في الداخل يساوي 5 أو $-5$.', 'The inside is 5 or $-5$.'), math: same('$\\begin{gathered}2x-3=5\\\\ 2x-3=-5\\end{gathered}$') },
            { text: say('Ebatzi kasu bakoitza.', 'Resuelve cada caso.', 'حُلّ كل حالة.', 'Solve each case.'), math: same('$x=4,\\ x=-1$') },
            { text: say('Egiaztatu: biek 5 ematen dute.', 'Comprueba: los dos dan 5.', 'تحقق: كلاهما يعطي 5.', 'Check: both give 5.'), math: same('$|2\\cdot 4-3|=|2\\cdot(-1)-3|=5$') }
        ],
        takeaway: say('$|A|=c$ ekuazioak, $c>0$ izanda, bi kasu ditu: $A=c$ edo $A=-c$. $c<0$ bada, ez dago soluziorik; $|A|=|B|$ ekuazioan, $A=B$ edo $A=-B$.', '$|A|=c$ con $c>0$ da dos casos: $A=c$ o $A=-c$. Si $c<0$, no hay solución; con $|A|=|B|$, $A=B$ o $A=-B$.', 'للمعادلة $|A|=c$ مع $c>0$ حالتان: $A=c$ أو $A=-c$. وإذا كان $c<0$ فلا حل؛ ومع $|A|=|B|$ يكون $A=B$ أو $A=-B$.', '$|A|=c$ with $c>0$ gives two cases: $A=c$ or $A=-c$. If $c<0$, there is no solution; with $|A|=|B|$, $A=B$ or $A=-B$.'),
        figure: (language) => <AbsoluteFoldFigure language={language} />
    },

    /* ---------- 4. Exponential and logarithmic equations ---------- */
    {
        id: 'exponential-equations',
        stage: 'exp-log',
        title: say('Esponentzialak: oinarri bera edo logaritmoak', 'Exponenciales: misma base o logaritmos', 'المعادلات الأسية: الأساس نفسه أو اللوغاريتمات', 'Exponentials: same base or logarithms'),
        goal: say('Ekuazio esponentzialak ebaztea: oinarriak berdinduz ahal denean, eta logaritmoak hartuz ezin denean.', 'Resolver ecuaciones exponenciales igualando bases cuando se puede y tomando logaritmos cuando no.', 'حل المعادلات الأسية بمساواة الأسس عند الإمكان وبأخذ اللوغاريتمات عندما لا يمكن.', 'Solve exponential equations by matching the bases when you can and by taking logarithms when you cannot.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'exponential', title: { eu: 'Ekuazio esponentzialak', es: 'Ecuaciones exponenciales', en: 'Exponential equations', ar: 'المعادلات الأسية' } }
        ],
        problem: say('Ebatzi $2^{x+1}=3^x$.', 'Resuelve $2^{x+1}=3^x$.', 'حُلّ $2^{x+1}=3^x$.', 'Solve $2^{x+1}=3^x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarri desberdinak: hartu logaritmoak.', 'Bases distintas: toma logaritmos.', 'أساسان مختلفان: خذ اللوغاريتم.', 'Different bases: take logarithms.'), math: same('$(x+1)\\log 2=x\\log 3$') },
            { text: say('Elkartu $x$ duten gaiak.', 'Agrupa los términos con $x$.', 'اجمع الحدود التي فيها $x$.', 'Gather the terms with $x$.'), math: same('$x(\\log 3-\\log 2)=\\log 2$') },
            { text: say('Askatu eta kalkulatu.', 'Despeja y calcula.', 'اعزل $x$ واحسب.', 'Isolate $x$ and work it out.'), math: same('$x=\\frac{\\log 2}{\\log 3-\\log 2}\\approx 1{,}71$') }
        ],
        takeaway: say('Oinarri berarekin idatz badaitezke, berdindu berretzaileak. Bestela, hartu logaritmoak: $\\log a^x=x\\log a$ propietateak berretzailea jaisten du.', 'Si se pueden escribir con la misma base, iguala los exponentes. Si no, toma logaritmos: $\\log a^x=x\\log a$ baja el exponente.', 'إذا أمكن كتابتهما بالأساس نفسه فساوِ الأسس. وإلا فخذ اللوغاريتم: تُنزل $\\log a^x=x\\log a$ الأس.', 'If they can be written with the same base, set the exponents equal. If not, take logarithms: $\\log a^x=x\\log a$ brings the exponent down.'),
        figure: (language) => <ExponentialFigure language={language} />
    },
    {
        id: 'exponential-change',
        stage: 'exp-log',
        title: say('Esponentzialak aldagai-aldaketarekin', 'Exponenciales con cambio de variable', 'المعادلات الأسية بتغيير المتغير', 'Exponentials with a change of variable'),
        goal: say('$4^x-3\\cdot 2^x-4=0$ bezalako ekuazioak $t=2^x$ aldaketarekin ebaztea, $t$ negatiboak edo nuluak baztertuz.', 'Resolver ecuaciones como $4^x-3\\cdot 2^x-4=0$ con el cambio $t=2^x$, descartando los $t$ negativos o nulos.', 'حل معادلات مثل $4^x-3\\cdot 2^x-4=0$ بالتغيير $t=2^x$ مع استبعاد قيم $t$ السالبة أو المعدومة.', 'Solve equations such as $4^x-3\\cdot 2^x-4=0$ with the change $t=2^x$, discarding the negative or zero values of $t$.'),
        problem: say('Ebatzi $4^x-2^x-12=0$.', 'Resuelve $4^x-2^x-12=0$.', 'حُلّ $4^x-2^x-12=0$.', 'Solve $4^x-2^x-12=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$4^x=(2^x)^2$: aldaketa $t=2^x$.', '$4^x=(2^x)^2$: cambio $t=2^x$.', '$4^x=(2^x)^2$: التغيير $t=2^x$.', '$4^x=(2^x)^2$: change $t=2^x$.'), math: same('$t^2-t-12=0$') },
            { text: say('Bigarren mailako ekuazioa.', 'Ecuación de segundo grado.', 'معادلة من الدرجة الثانية.', 'A second-degree equation.'), math: same('$t=4,\\ t=-3$') },
            { text: say('$2^x$ beti da positiboa: $t=-3$ balioak ez du ezer ematen.', '$2^x$ siempre es positivo: $t=-3$ no da nada.', '$2^x$ موجب دائمًا: لا يعطي $t=-3$ شيئًا.', '$2^x$ is always positive: $t=-3$ gives nothing.'), math: same('$2^x=4\\ \\to\\ x=2$') }
        ],
        takeaway: say('Idatzi berreturak oinarri berarekin, egin $t=a^x$ eta ebatzi $t$ aldagaian. $t>0$ bakoitzak $x=\\log_a t$ ematen du; $t\\le 0$ direnak baztertzen dira.', 'Escribe las potencias con la misma base, cambia $t=a^x$ y resuelve en $t$. Cada $t>0$ da $x=\\log_a t$; los $t\\le 0$ se descartan.', 'اكتب القوى بالأساس نفسه، وضع $t=a^x$ وحلّ بالنسبة إلى $t$. كل $t>0$ يعطي $x=\\log_a t$، وتُستبعد قيم $t\\le 0$.', 'Write the powers with the same base, change $t=a^x$ and solve for $t$. Each $t>0$ gives $x=\\log_a t$; the $t\\le 0$ are discarded.'),
        figure: (language) => <ChangeVariableFigure language={language} kind="exp" />
    },
    {
        id: 'log-equations',
        stage: 'exp-log',
        title: say('Ekuazio logaritmikoak eta eremua', 'Ecuaciones logarítmicas y dominio', 'المعادلات اللوغاريتمية والمجال', 'Logarithmic equations and domain'),
        goal: say('Ekuazio logaritmikoak ebaztea, logaritmoak haien propietateekin elkartuz eta argumentu ez-positibo baten logaritmoa ematen duten soluzioak baztertuz.', 'Resolver ecuaciones logarítmicas juntando los logaritmos con sus propiedades y descartando las soluciones que dan el logaritmo de un número no positivo.', 'حل المعادلات اللوغاريتمية بجمع اللوغاريتمات بخصائصها واستبعاد الحلول التي تعطي لوغاريتم عدد غير موجب.', 'Solve logarithmic equations by joining the logarithms with their properties and discarding the solutions that give the logarithm of a number that is not positive.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'logarithmic', title: { eu: 'Ekuazio logaritmikoak', es: 'Ecuaciones logarítmicas', en: 'Logarithmic equations', ar: 'المعادلات اللوغاريتمية' } }
        ],
        problem: say('Ebatzi $\\log x+\\log(x-3)=1$.', 'Resuelve $\\log x+\\log(x-3)=1$.', 'حُلّ $\\log x+\\log(x-3)=1$.', 'Solve $\\log x+\\log(x-3)=1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Elkartu logaritmoak: batura biderkaduraren logaritmoa da.', 'Junta los logaritmos: la suma es el logaritmo del producto.', 'اجمع اللوغاريتمين: المجموع لوغاريتم الجداء.', 'Join the logarithms: the sum is the logarithm of the product.'), math: same('$\\log[x(x-3)]=1$') },
            { text: say('Kendu logaritmoa: $1=\\log 10$.', 'Quita el logaritmo: $1=\\log 10$.', 'أزل اللوغاريتم: $1=\\log 10$.', 'Remove the logarithm: $1=\\log 10$.'), math: same('$\\begin{gathered}x^2-3x-10=0\\\\ \\to\\ x=5,\\ x=-2\\end{gathered}$') },
            { text: say('$\\log(-2)$ ez dago: $x=5$ bakarrik da soluzioa.', '$\\log(-2)$ no existe: solo vale $x=5$.', '$\\log(-2)$ غير موجود: الحل الوحيد $x=5$.', '$\\log(-2)$ does not exist: only $x=5$ works.'), math: same('$x=5$') }
        ],
        takeaway: say('Erabili $\\log A+\\log B=\\log(AB)$ eta $\\log A-\\log B=\\log\\frac{A}{B}$ logaritmo bakarra uzteko. Argumentu guztiak positibo dituzten soluzioak bakarrik dira onak.', 'Usa $\\log A+\\log B=\\log(AB)$ y $\\log A-\\log B=\\log\\frac{A}{B}$ para dejar un solo logaritmo. Solo valen las soluciones con todos los argumentos positivos.', 'استعمل $\\log A+\\log B=\\log(AB)$ و$\\log A-\\log B=\\log\\frac{A}{B}$ لتُبقي لوغاريتمًا واحدًا. ولا يصلح إلا الحل الذي تكون عنده كل الوسائط موجبة.', 'Use $\\log A+\\log B=\\log(AB)$ and $\\log A-\\log B=\\log\\frac{A}{B}$ to leave a single logarithm. Only the solutions with every argument positive work.'),
        figure: (language) => <LogEquationFigure language={language} />
    },

    /* ---------- 5. Inequalities ---------- */
    {
        id: 'polynomial-inequalities',
        stage: 'inequalities',
        title: say('Inekuazio polinomikoak', 'Inecuaciones polinómicas', 'المتراجحات الحدودية', 'Polynomial inequalities'),
        goal: say('Inekuazio polinomikoak ebaztea, faktorizatuz eta faktore bakoitzaren zeinua zeinuen taula batean aztertuz.', 'Resolver inecuaciones polinómicas factorizando y estudiando el signo de cada factor en una tabla de signos.', 'حل المتراجحات الحدودية بالتحليل ودراسة إشارة كل عامل في جدول الإشارات.', 'Solve polynomial inequalities by factorising and studying the sign of each factor in a sign table.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'quadratic-inequality', title: { eu: 'Bigarren mailako inekuazioak', es: 'Inecuaciones de segundo grado', en: 'Second-degree inequalities', ar: 'متراجحات الدرجة الثانية' } }
        ],
        problem: say('Ebatzi $x^3-4x>0$.', 'Resuelve $x^3-4x>0$.', 'حُلّ $x^3-4x>0$.', 'Solve $x^3-4x>0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu.', 'Factoriza.', 'حلّل.', 'Factorise.'), math: same('$x(x-2)(x+2)>0$') },
            { text: say('Erroek lau tartetan zatitzen dute zuzena.', 'Las raíces parten la recta en cuatro tramos.', 'تقسم الجذور المستقيم إلى أربعة مجالات.', 'The roots cut the line into four stretches.'), math: same('$x=-2,\\ x=0,\\ x=2$') },
            { text: say('Biderkadura positiboa da bi tartetan.', 'El producto es positivo en dos tramos.', 'الجداء موجب في مجالين.', 'The product is positive on two stretches.'), math: same('$(-2,0)\\cup(2,+\\infty)$') }
        ],
        takeaway: say('Faktorizatu, jarri erroak zuzenean eta aztertu zeinua tarte bakoitzean. $>$ edo $<$ denean erroak kanpoan geratzen dira; $\\ge$ edo $\\le$ denean, barruan.', 'Factoriza, coloca las raíces en la recta y estudia el signo en cada tramo. Con $>$ o $<$ las raíces quedan fuera; con $\\ge$ o $\\le$, dentro.', 'حلّل، وضع الجذور على المستقيم، وادرس الإشارة في كل مجال. مع $>$ أو $<$ تبقى الجذور خارجًا، ومع $\\ge$ أو $\\le$ داخلًا.', 'Factorise, place the roots on the line and study the sign on each stretch. With $>$ or $<$ the roots are left out; with $\\ge$ or $\\le$, they are included.'),
        figure: (language) => <SignTableFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'rational-inequalities',
        stage: 'inequalities',
        title: say('Inekuazio arrazionalak', 'Inecuaciones racionales', 'المتراجحات الكسرية', 'Rational inequalities'),
        goal: say('Zatiki aljebraikoak dituzten inekuazioak zeinuen taula batekin ebaztea, izendatzailea anulatzen duten balioak beti kanpoan utziz.', 'Resolver inecuaciones con fracciones algebraicas con una tabla de signos, dejando siempre fuera los valores que anulan el denominador.', 'حل متراجحات فيها كسور جبرية بجدول إشارات، مع إبقاء القيم التي تعدم المقام خارج الحل دائمًا.', 'Solve inequalities with algebraic fractions with a sign table, always leaving out the values that make the denominator zero.'),
        problem: say('Ebatzi $\\frac{x-1}{x+2}\\ge 0$.', 'Resuelve $\\frac{x-1}{x+2}\\ge 0$.', 'حُلّ $\\frac{x-1}{x+2}\\ge 0$.', 'Solve $\\frac{x-1}{x+2}\\ge 0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbakitzailearen eta izendatzailearen erroak.', 'Raíces del numerador y del denominador.', 'جذر البسط وجذر المقام.', 'Roots of the numerator and of the denominator.'), math: same('$x=1,\\ x=-2$') },
            { text: say('Zatiduraren zeinua tarte bakoitzean.', 'Signo del cociente en cada tramo.', 'إشارة خارج القسمة في كل مجال.', 'Sign of the quotient on each stretch.'), math: same('$\\begin{gathered}(-\\infty,-2)\\ \\to\\ +\\\\ (-2,1)\\ \\to\\ -\\\\ (1,+\\infty)\\ \\to\\ +\\end{gathered}$') },
            { text: say('1 sartzen da (zenbakitzailea 0 da); $-2$ inoiz ez.', 'El 1 entra (el numerador vale 0); el $-2$, nunca.', 'يدخل 1 (البسط يساوي 0)، أما $-2$ فلا يدخل أبدًا.', '1 is included (the numerator is 0); $-2$ never is.'), math: same('$(-\\infty,-2)\\cup[1,+\\infty)$') }
        ],
        takeaway: say('Ez biderkatu izendatzaileaz: haren zeinua aldatu egiten da. Aztertu zatiduraren zeinua; zenbakitzailearen zeroa sar daiteke, izendatzailearena inoiz ez.', 'No multipliques por el denominador: su signo cambia. Estudia el signo del cociente; el cero del numerador puede entrar, el del denominador nunca.', 'لا تضرب في المقام: إشارته تتغير. ادرس إشارة خارج القسمة؛ صفر البسط قد يدخل، وصفر المقام لا يدخل أبدًا.', 'Do not multiply by the denominator: its sign changes. Study the sign of the quotient; the zero of the numerator can be included, that of the denominator never.'),
        figure: (language) => <SignTableFigure language={language} rational />,
        figureAfterSteps: true
    },
    {
        id: 'absolute-inequalities',
        stage: 'inequalities',
        title: say('Balio absolutua duten inekuazioak', 'Inecuaciones con valor absoluto', 'متراجحات فيها قيمة مطلقة', 'Inequalities with absolute value'),
        goal: say('$|A|<c$ eta $|A|>c$ distantzia gisa ebaztea: tarte bakarra edo bi zuzenerdi.', 'Resolver $|A|<c$ y $|A|>c$ como distancias: un solo intervalo o dos semirrectas.', 'حل $|A|<c$ و$|A|>c$ كمسافات: مجال واحد أو نصفا مستقيم.', 'Solve $|A|<c$ and $|A|>c$ as distances: a single interval or two half-lines.'),
        needs: [
            { unit: 'batx1-zientziak/numeros-reales', topic: 'neighbourhoods', title: { eu: 'Inguruneak', es: 'Entornos', en: 'Neighbourhoods', ar: 'الجوارات' } }
        ],
        problem: say('Ebatzi $|2x-1|<5$.', 'Resuelve $|2x-1|<5$.', 'حُلّ $|2x-1|<5$.', 'Solve $|2x-1|<5$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('0 zenbakitik 5 baino gutxiagora.', 'A menos de 5 del 0.', 'على بعد أقل من 5 عن 0.', 'Less than 5 away from 0.'), math: same('$-5<2x-1<5$') },
            { text: say('Gehitu 1 eta zatitu 2 zenbakiaz hiru ataletan.', 'Suma 1 y divide entre 2 en los tres miembros.', 'أضف 1 واقسم على 2 في الأطراف الثلاثة.', 'Add 1 and divide by 2 in all three parts.'), math: same('$-2<x<3$') },
            { text: say('Tarte ireki bat da.', 'Es un intervalo abierto.', 'إنه مجال مفتوح.', 'It is an open interval.'), math: same('$(-2,3)$') }
        ],
        takeaway: say('$|A|<c$ inekuazioa $-c<A<c$ da: tarte bat. $|A|>c$ inekuazioa $A<-c$ edo $A>c$ da: bi zuzenerdi.', '$|A|<c$ es $-c<A<c$: un intervalo. $|A|>c$ es $A<-c$ o $A>c$: dos semirrectas.', '$|A|<c$ تعني $-c<A<c$: مجال واحد. و$|A|>c$ تعني $A<-c$ أو $A>c$: نصفا مستقيم.', '$|A|<c$ is $-c<A<c$: an interval. $|A|>c$ is $A<-c$ or $A>c$: two half-lines.'),
        figure: (language) => <AbsoluteFoldFigure language={language} inequality />
    },
    {
        id: 'inequality-systems',
        stage: 'inequalities',
        title: say('Inekuazio-sistemak eta problemak', 'Sistemas de inecuaciones y problemas', 'أنظمة المتراجحات والمسائل', 'Systems of inequalities and problems'),
        goal: say('Ezezagun bakarreko inekuazio-sistemak ebaztea, bakoitzaren soluzioen ebakidura hartuta, eta inekuazioekin problemak planteatzea.', 'Resolver sistemas de inecuaciones con una incógnita intersecando las soluciones de cada una, y plantear problemas con inecuaciones.', 'حل أنظمة المتراجحات بمجهول واحد بتقاطع حلول كل منها، وصياغة مسائل بالمتراجحات.', 'Solve systems of inequalities with one unknown by intersecting the solutions of each one, and set up problems with inequalities.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'inequality-systems', title: { eu: 'Inekuazio-sistemak', es: 'Sistemas de inecuaciones', en: 'Systems of inequalities', ar: 'أنظمة المتراجحات' } },
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'inequality-problems', title: { eu: 'Problemak inekuazioekin', es: 'Problemas con inecuaciones', en: 'Problems with inequalities', ar: 'مسائل بالمتراجحات' } }
        ],
        problem: say('Laukizuzen baten alde bat bestea baino 3 cm luzeagoa da, eta haren azalera gutxienez 10 cm² eta gehienez 40 cm² da. Zein balio izan ditzake alde laburrak, $x$?', 'Un rectángulo tiene un lado 3 cm más largo que el otro, y su área es al menos 10 cm² y como mucho 40 cm². ¿Qué valores puede tomar el lado menor $x$?', 'في مستطيل ضلع أطول من الآخر بـ 3 سم، ومساحته 10 سم² على الأقل و40 سم² على الأكثر. ما القيم الممكنة للضلع الأقصر $x$؟', 'A rectangle has one side 3 cm longer than the other, and its area is at least 10 cm² and at most 40 cm². What values can the shorter side $x$ take?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Planteatu sistema ($x>0$).', 'Plantea el sistema ($x>0$).', 'اكتب النظام ($x>0$).', 'Set up the system ($x>0$).'), math: same('$\\begin{gathered}x(x+3)\\ge 10\\\\ x(x+3)\\le 40\\end{gathered}$') },
            { text: say('Ebatzi bakoitza.', 'Resuelve cada una.', 'حُلّ كل واحدة.', 'Solve each one.'), math: same('$\\begin{gathered}(x+5)(x-2)\\ge 0\\ \\to\\ x\\ge 2\\\\ (x+8)(x-5)\\le 0\\ \\to\\ x\\le 5\\end{gathered}$') },
            { text: say('Ebakidura: soluzio komuna.', 'Interseca: la solución común.', 'التقاطع: الحل المشترك.', 'Intersect: the common solution.'), math: same('$2\\le x\\le 5$') }
        ],
        takeaway: say('Ebatzi inekuazio bakoitza bere aldetik, eta hartu soluzioen zati komuna. Problemetan, gehitu testuinguruaren baldintzak (luzera positiboak).', 'Resuelve cada inecuación por separado y quédate con la parte común de las soluciones. En los problemas, añade las condiciones del contexto (longitudes positivas).', 'حُلّ كل متراجحة على حدة وخذ الجزء المشترك من الحلول. وفي المسائل أضف شروط السياق (الأطوال موجبة).', 'Solve each inequality separately and keep the common part of the solutions. In problems, add the conditions of the context (positive lengths).'),
        figure: (language) => <IntervalIntersectionFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bachEquationsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bachEquationsLessonTexts[topic.id as BachEquationsTopicId], ...bachEquationsLessonChecks[topic.id as BachEquationsTopicId] }))

import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { ProblemStepsFigure } from '../dbh2-ekuazioak-v2/figures'
import { FactoredFigure, QuadraticFormulaFigure, RadicalFigure } from '../dbh4-aplikatuak-ekuazioak/figures'
import {
    BiquadraticFigure,
    ExponentialFigure,
    FlipSignFigure,
    GraphicInequalityFigure,
    IntervalIntersectionFigure,
    IntervalsFigure,
    LogEquationFigure,
    QuadraticSignFigure,
    RationalEquationFigure,
    SumProductFigure,
    TriangleProblemFigure
} from './figures'
import { equationsLessonChecks, type EquationsTopicId } from './lessonChecks'
import { equationsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Ekuazioak eta inekuazioak · 4. DBH akademikoak — stages and lessons,
   following Santillana 4.º Académicas unit 4 (second-degree equations and
   the relations between their roots, biquadratic, factored, rational and
   radical equations, inequalities of first and second degree and systems
   of inequalities) and the equations and inequalities of Anaya 4.º
   Académicas unit 3 (the triangle with sides three apart, biquadratics,
   rational and radical equations, exponential and logarithmic equations,
   inequalities solved algebraically and graphically). Systems of
   equations are the next unit. It builds on the 4. DBH aplikatuak
   equations unit and goes further: relations between roots, biquadratic,
   rational, exponential and logarithmic equations, and inequalities.
   ========================================================================== */

export type EquationsInequalitiesStageId = 'quadratic' | 'other' | 'exponential' | 'inequalities' | 'quadratic-inequalities'

export const equationsInequalitiesStages: UnitStage[] = [
    { id: 'quadratic', tone: 'blue', title: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', en: 'Second-degree equations', ar: 'معادلات الدرجة الثانية' } },
    { id: 'other', tone: 'violet', title: { eu: 'Beste ekuazio polinomiko batzuk', es: 'Otras ecuaciones polinómicas', en: 'Other polynomial equations', ar: 'معادلات حدودية أخرى' } },
    { id: 'exponential', tone: 'mustard', title: { eu: 'Erroak, esponentzialak eta logaritmoak', es: 'Radicales, exponenciales y logaritmos', en: 'Radicals, exponentials and logarithms', ar: 'الجذور والأسية واللوغاريتمية' } },
    { id: 'inequalities', tone: 'coral', title: { eu: 'Lehen mailako inekuazioak', es: 'Inecuaciones de primer grado', en: 'First-degree inequalities', ar: 'متراجحات الدرجة الأولى' } },
    { id: 'quadratic-inequalities', tone: 'green', title: { eu: 'Bigarren mailakoak eta sistemak', es: 'Segundo grado y sistemas', en: 'Second degree and systems', ar: 'الدرجة الثانية والأنظمة' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Second-degree equations ---------- */
    {
        id: 'quadratic-formula',
        stage: 'quadratic',
        title: say('Bigarren mailako ekuazioak', 'Ecuaciones de segundo grado', 'معادلات الدرجة الثانية', 'Second-degree equations'),
        goal: say('Bigarren mailako ekuazio osoak eta osatugabeak ebaztea eta diskriminatzailearekin zenbat ebazpen dituzten jakitea.', 'Resolver ecuaciones de segundo grado completas e incompletas y saber con el discriminante cuántas soluciones tienen.', 'حل معادلات الدرجة الثانية التامة وغير التامة ومعرفة عدد حلولها بالمميّز.', 'Solve complete and incomplete quadratic equations, and use the discriminant to know how many solutions they have.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'formula', title: { eu: 'Formula orokorra', es: 'La fórmula general', en: 'The quadratic formula', ar: 'الصيغة العامة' } },
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'incomplete', title: { eu: 'Bigarren mailako ekuazio osatugabeak', es: 'Ecuaciones de segundo grado incompletas', en: 'Incomplete quadratic equations', ar: 'معادلات الدرجة الثانية الناقصة' } }
        ],
        problem: say('Ebatzi $3x^{2}-4x-4=0$.', 'Resuelve $3x^{2}-4x-4=0$.', 'حل $3x^{2}-4x-4=0$.', 'Solve $3x^{2}-4x-4=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Diskriminatzailea.', 'El discriminante.', 'المميّز.', 'The discriminant.'), math: same('$\\Delta=16+48=64$') },
            { text: say('Formula.', 'La fórmula.', 'الصيغة.', 'The formula.'), math: same('$x=\\frac{4\\pm 8}{6}$') },
            { text: say('Bi ebazpen.', 'Dos soluciones.', 'حلّان.', 'Two solutions.'), math: same('$x=2,\\ x=-\\frac{2}{3}$') }
        ],
        takeaway: say('$x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$; $\\Delta<0$: ebazpenik ez.', '$x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$; $\\Delta<0$: sin solución.', '$x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$؛ $\\Delta<0$: لا حل.', '$x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$; $\\Delta<0$: no solution.'),
        figure: (language) => <QuadraticFormulaFigure language={language} />
    },
    {
        id: 'roots-relations',
        stage: 'quadratic',
        title: say('Erroen batura eta biderkadura', 'Suma y producto de las raíces', 'مجموع الجذرين وجداؤهما', 'Sum and product of the roots'),
        goal: say('Erroen batura eta biderkadura koefizienteekin lotzea eta erroak jakinda ekuazioa idaztea.', 'Relacionar la suma y el producto de las raíces con los coeficientes y escribir la ecuación conociendo sus raíces.', 'ربط مجموع الجذرين وجدائهما بالمعاملات وكتابة المعادلة بمعرفة جذريها.', 'Relate the sum and product of the roots to the coefficients, and write the equation when you know its roots.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'roots', title: { eu: 'Polinomio baten erroak', es: 'Raíces de un polinomio', en: 'Roots of a polynomial', ar: 'جذور الحدودية' } }
        ],
        problem: say('$x^{2}+bx-12=0$ ekuazioaren erro bat 3 da. Zein da bestea, eta zenbat da b?', 'Una raíz de $x^{2}+bx-12=0$ es 3. ¿Cuál es la otra, y cuánto vale b?', 'أحد جذري $x^{2}+bx-12=0$ هو 3. ما الجذر الآخر، وكم تساوي b؟', 'One root of $x^{2}+bx-12=0$ is 3. What is the other root, and what is the value of b?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura $\\frac{c}{a}=-12$.', 'Producto $\\frac{c}{a}=-12$.', 'الجداء $\\frac{c}{a}=-12$.', 'Product $\\frac{c}{a}=-12$.'), math: same('$3\\cdot x_2=-12\\ \\to\\ x_2=-4$') },
            { text: say('Batura $-b$ da.', 'La suma es $-b$.', 'المجموع هو $-b$.', 'The sum is $-b$.'), math: same('$3-4=-1\\ \\to\\ b=1$') }
        ],
        takeaway: say('$x_1+x_2=-\\frac{b}{a}$, $x_1\\cdot x_2=\\frac{c}{a}$.', '$x_1+x_2=-\\frac{b}{a}$, $x_1\\cdot x_2=\\frac{c}{a}$.', '$x_1+x_2=-\\frac{b}{a}$، $x_1\\cdot x_2=\\frac{c}{a}$.', '$x_1+x_2=-\\frac{b}{a}$, $x_1\\cdot x_2=\\frac{c}{a}$.'),
        figure: (language) => <SumProductFigure language={language} />
    },
    {
        id: 'quadratic-problems',
        stage: 'quadratic',
        title: say('Bigarren mailako problemak', 'Problemas de segundo grado', 'مسائل الدرجة الثانية', 'Quadratic word problems'),
        goal: say('Problemak bigarren mailako ekuazio batekin ebaztea eta testuingurura egokitzen ez diren ebazpenak baztertzea.', 'Resolver problemas con una ecuación de segundo grado y descartar las soluciones que no encajan en el contexto.', 'حل مسائل بمعادلة من الدرجة الثانية واستبعاد الحلول التي لا تناسب السياق.', 'Solve problems using a quadratic equation, and rule out the solutions that do not fit the context.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'quadratic-problems', title: { eu: 'Bigarren mailako problemak', es: 'Problemas de segundo grado', en: 'Quadratic problems', ar: 'مسائل من الدرجة الثانية' } }
        ],
        problem: say('Laukizuzen baten oinarriak altuerak baino 4 cm gehiago ditu, eta azalera 60 cm² da. Zenbat neurtzen du altuerak?', 'La base de un rectángulo mide 4 cm más que la altura y su área es 60 cm². ¿Cuánto mide la altura?', 'قاعدة مستطيل أطول من ارتفاعه بـ4 سم ومساحته 60 سم². كم ارتفاعه؟', 'The base of a rectangle is 4 cm longer than its height, and its area is 60 cm². How long is the height?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ekuazioa.', 'La ecuación.', 'المعادلة.', 'The equation.'), math: same('$x(x+4)=60$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$x^{2}+4x-60=0\\ \\to\\ x=6,\\ x=-10$') },
            { text: say('$-10$ ez da baliozkoa: 6 cm.', '$-10$ no vale: 6 cm.', '$-10$ لا يصلح: 6 سم.', '$-10$ doesn\'t work: 6 cm.'), math: same('$6\\cdot 10=60$') }
        ],
        takeaway: say('Izendatu, idatzi, ebatzi eta egiaztatu: ebazpen guztiak ez dira baliozkoak.', 'Nombra, escribe, resuelve y comprueba: no todas las soluciones valen.', 'سمِّ واكتب وحلّ وتحقّق: ليست كل الحلول صالحة.', 'Name, write, solve and check: not every solution is valid.'),
        figure: (language) => <TriangleProblemFigure language={language} />
    },

    /* ---------- 2. Other polynomial equations ---------- */
    {
        id: 'biquadratic',
        stage: 'other',
        title: say('Ekuazio bikarratuak', 'Ecuaciones bicuadradas', 'المعادلات الثنائية التربيع', 'Biquadratic equations'),
        goal: say('$ax^{4}+bx^{2}+c=0$ ekuazioak $t=x^{2}$ aldaketarekin ebaztea.', 'Resolver ecuaciones $ax^{4}+bx^{2}+c=0$ con el cambio $t=x^{2}$.', 'حل المعادلات $ax^{4}+bx^{2}+c=0$ بالتعويض $t=x^{2}$.', 'Solve equations $ax^{4}+bx^{2}+c=0$ using the substitution $t=x^{2}$.'),
        problem: say('Ebatzi $x^{4}-13x^{2}+36=0$.', 'Resuelve $x^{4}-13x^{2}+36=0$.', 'حل $x^{4}-13x^{2}+36=0$.', 'Solve $x^{4}-13x^{2}+36=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$t=x^{2}$.', '$t=x^{2}$.', '$t=x^{2}$.', '$t=x^{2}$.'), math: same('$t^{2}-13t+36=0$') },
            { text: say('t-ren balioak.', 'Los valores de t.', 'قيم t.', 'The values of t.'), math: same('$t=\\frac{13\\pm 5}{2}=9,\\ 4$') },
            { text: say('Lau ebazpen.', 'Cuatro soluciones.', 'أربعة حلول.', 'Four solutions.'), math: same('$x=\\pm 3,\\ x=\\pm 2$') }
        ],
        takeaway: say('$t=x^{2}$; $t$ negatiboa bada, ez dago $x$-rik.', '$t=x^{2}$; si $t$ es negativo, no hay $x$.', '$t=x^{2}$؛ إذا كان $t$ سالبًا فلا يوجد $x$.', '$t=x^{2}$; if $t$ is negative, there is no $x$.'),
        figure: (language) => <BiquadraticFigure language={language} />
    },
    {
        id: 'factored',
        stage: 'other',
        title: say('Faktorizatuz ebaztea', 'Resolver factorizando', 'الحل بالتحليل', 'Solving by factorising'),
        goal: say('Maila handiko ekuazioak faktorizatuz eta faktore bakoitza 0 eginez ebaztea.', 'Resolver ecuaciones de grado mayor factorizando e igualando a 0 cada factor.', 'حل المعادلات ذات الدرجة الأعلى بالتحليل ومساواة كل عامل بالصفر.', 'Solve higher-degree equations by factorising and setting each factor equal to 0.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'factorize', title: { eu: 'Polinomioak faktorizatzea', es: 'Factorizar polinomios', en: 'Factorising polynomials', ar: 'تحليل الحدوديات' } }
        ],
        problem: say('Ebatzi $x^{3}-4x^{2}+x+6=0$.', 'Resuelve $x^{3}-4x^{2}+x+6=0$.', 'حل $x^{3}-4x^{2}+x+6=0$.', 'Solve $x^{3}-4x^{2}+x+6=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$-1$ probatu.', 'Prueba con $-1$.', 'جرّب $-1$.', 'Try $-1$.'), math: same('$-1-4-1+6=0$') },
            { text: say('Ruffiniz zatidura.', 'Cociente con Ruffini.', 'خارج القسمة بروفيني.', 'Find the quotient with Ruffini.'), math: same('$x^{2}-5x+6=(x-2)(x-3)$') },
            { text: say('Hiru ebazpen.', 'Tres soluciones.', 'ثلاثة حلول.', 'Three solutions.'), math: same('$x=-1,\\ x=2,\\ x=3$') }
        ],
        takeaway: say('Faktorizatu eta berdindu faktore bakoitza 0; ez zatitu x-z.', 'Factoriza e iguala cada factor a 0; no dividas entre x.', 'حلّل وساوِ كل عامل بالصفر؛ ولا تقسم على x.', 'Factorise and set each factor equal to 0; do not divide by x.'),
        figure: (language) => <FactoredFigure language={language} />
    },
    {
        id: 'rational',
        stage: 'other',
        title: say('Ekuazio arrazionalak', 'Ecuaciones racionales', 'المعادلات الكسرية', 'Rational equations'),
        goal: say('Izendatzailean x duten ekuazioak m.k.t.-az biderkatuz ebaztea eta ebazpenak egiaztatzea.', 'Resolver ecuaciones con x en el denominador multiplicando por el m.c.m. y comprobar las soluciones.', 'حل المعادلات التي فيها x في المقام بالضرب في المضاعف المشترك الأصغر والتحقق من الحلول.', 'Solve equations with x in the denominator by multiplying by the LCM, and check the solutions.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'denominators', title: { eu: 'Izendatzaileak dituzten ekuazioak', es: 'Ecuaciones con denominadores', en: 'Equations with denominators', ar: 'معادلات بمقامات' } },
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'add-fractions', title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', en: 'Addition and subtraction', ar: 'الجمع والطرح' } }
        ],
        problem: say('Ebatzi $\\frac{1}{x}+\\frac{1}{x+1}=\\frac{3}{2}$.', 'Resuelve $\\frac{1}{x}+\\frac{1}{x+1}=\\frac{3}{2}$.', 'حل $\\frac{1}{x}+\\frac{1}{x+1}=\\frac{3}{2}$.', 'Solve $\\frac{1}{x}+\\frac{1}{x+1}=\\frac{3}{2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bider $2x(x+1)$.', 'Por $2x(x+1)$.', 'في $2x(x+1)$.', 'Multiply by $2x(x+1)$.'), math: same('$2(x+1)+2x=3x(x+1)$') },
            { text: say('Ordenatu.', 'Ordena.', 'رتّب.', 'Rearrange.'), math: same('$3x^{2}-x-2=0$') },
            { text: say('Biak baliozkoak dira.', 'Las dos valen.', 'كلاهما صالح.', 'Both work.'), math: same('$x=1,\\ x=-\\frac{2}{3}$') }
        ],
        takeaway: say('Bider m.k.t. eta egiaztatu: izendatzailea 0 egiten duena ez da ebazpena.', 'Por el m.c.m. y comprueba: lo que anula un denominador no es solución.', 'في المضاعف المشترك ثم تحقّق: ما يعدم المقام ليس حلًا.', 'Use the LCM and check: anything that makes a denominator zero is not a solution.'),
        figure: (language) => <RationalEquationFigure language={language} />
    },

    /* ---------- 3. Radical, exponential and logarithmic equations ---------- */
    {
        id: 'radical',
        stage: 'exponential',
        title: say('Ekuazio irrazionalak', 'Ecuaciones irracionales', 'المعادلات الجذرية', 'Radical equations'),
        goal: say('Erro bat duten ekuazioak erroa bakartuz eta karratura jasoz ebaztea, ebazpen faltsuak baztertuz.', 'Resolver ecuaciones con raíces aislando la raíz y elevando al cuadrado, descartando las soluciones falsas.', 'حل المعادلات ذات الجذور بعزل الجذر والتربيع واستبعاد الحلول الزائفة.', 'Solve equations with square roots by isolating the root, squaring both sides, and ruling out false solutions.'),
        needs: [
            { unit: 'dbh3/polinomios', topic: 'square-diff', title: { eu: 'Kendura baten karratua', es: 'Cuadrado de una diferencia', en: 'The square of a difference', ar: 'مربع فرق' } }
        ],
        problem: say('Ebatzi $\\sqrt{20-x}=x-8$.', 'Resuelve $\\sqrt{20-x}=x-8$.', 'حل $\\sqrt{20-x}=x-8$.', 'Solve $\\sqrt{20-x}=x-8$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Karratura jaso.', 'Eleva al cuadrado.', 'ربّع.', 'Square both sides.'), math: same('$20-x=x^{2}-16x+64$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$x^{2}-15x+44=0\\ \\to\\ 11,\\ 4$') },
            { text: say('Egiaztatu: 4 ez da baliozkoa.', 'Comprueba: 4 no vale.', 'تحقّق: 4 لا يصلح.', 'Check: 4 doesn\'t work.'), math: same('$\\sqrt{9}=3=11-8$') }
        ],
        takeaway: say('Bakartu, karratura jaso eta beti egiaztatu.', 'Aísla, eleva al cuadrado y comprueba siempre.', 'اعزل وربّع وتحقّق دائمًا.', 'Isolate the root, square both sides, and always check.'),
        figure: (language) => <RadicalFigure language={language} />
    },
    {
        id: 'exponential',
        stage: 'exponential',
        title: say('Ekuazio esponentzialak', 'Ecuaciones exponenciales', 'المعادلات الأسية', 'Exponential equations'),
        goal: say('Ezezaguna berretzailean duten ekuazioak oinarri bera bilatuz, faktore komuna aterata edo logaritmoekin ebaztea.', 'Resolver ecuaciones con la incógnita en el exponente buscando la misma base, sacando factor común o con logaritmos.', 'حل المعادلات التي فيها المجهول في الأس بإيجاد الأساس نفسه أو بإخراج العامل المشترك أو باللوغاريتمات.', 'Solve equations with the unknown in the exponent by finding the same base, taking out a common factor, or using logarithms.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'power-rules', title: { eu: 'Berreturen propietateak', es: 'Propiedades de las potencias', en: 'Properties of powers', ar: 'خصائص القوى' } }
        ],
        problem: say('Ebatzi $3^{x+1}+3^{x}=108$.', 'Resuelve $3^{x+1}+3^{x}=108$.', 'حل $3^{x+1}+3^{x}=108$.', 'Solve $3^{x+1}+3^{x}=108$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$3^{x+1}=3\\cdot 3^{x}$.', '$3^{x+1}=3\\cdot 3^{x}$.', '$3^{x+1}=3\\cdot 3^{x}$.', '$3^{x+1}=3\\cdot 3^{x}$.'), math: same('$4\\cdot 3^{x}=108$') },
            { text: say('Bakartu.', 'Aísla.', 'اعزل.', 'Isolate.'), math: same('$3^{x}=27=3^{3}$') },
            { text: say('Ebazpena.', 'La solución.', 'الحل.', 'The solution.'), math: same('$x=3$') }
        ],
        takeaway: say('Oinarri bera → berretzaileak berdindu. Bestela, logaritmoak.', 'Misma base → iguala exponentes. Si no, logaritmos.', 'الأساس نفسه ← ساوِ الأسس. وإلا فاللوغاريتمات.', 'Same base → equate the exponents. If not, use logarithms.'),
        figure: (language) => <ExponentialFigure language={language} />
    },
    {
        id: 'logarithmic',
        stage: 'exponential',
        title: say('Ekuazio logaritmikoak', 'Ecuaciones logarítmicas', 'المعادلات اللوغاريتمية', 'Logarithmic equations'),
        goal: say('Logaritmoak dituzten ekuazioak definizioarekin eta propietateekin ebaztea eta ebazpenak egiaztatzea.', 'Resolver ecuaciones con logaritmos usando la definición y las propiedades, y comprobar las soluciones.', 'حل المعادلات اللوغاريتمية بالتعريف والخصائص والتحقق من الحلول.', 'Solve equations with logarithms using the definition and the properties, and check the solutions.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'log-definition', title: { eu: 'Logaritmoa', es: 'El logaritmo', en: 'The logarithm', ar: 'اللوغاريتم' } },
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'log-properties', title: { eu: 'Logaritmoen propietateak', es: 'Propiedades de los logaritmos', en: 'Properties of logarithms', ar: 'خصائص اللوغاريتمات' } }
        ],
        problem: say('Ebatzi $\\log_3 (x+1)+\\log_3 (x-1)=1$.', 'Resuelve $\\log_3 (x+1)+\\log_3 (x-1)=1$.', 'حل $\\log_3 (x+1)+\\log_3 (x-1)=1$.', 'Solve $\\log_3 (x+1)+\\log_3 (x-1)=1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkaduraren logaritmoa.', 'Logaritmo del producto.', 'لوغاريتم الجداء.', 'The logarithm of a product.'), math: same('$(x+1)(x-1)=3^{1}$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$x^{2}=4\\ \\to\\ x=\\pm 2$') },
            { text: say('$-2$ ez da baliozkoa.', '$-2$ no vale.', '$-2$ لا يصلح.', '$-2$ does not work.'), math: same('$x=2$') }
        ],
        takeaway: say('Logaritmo bakarra bi aldeetan; argumentuak positiboak.', 'Un solo logaritmo en cada miembro; argumentos positivos.', 'لوغاريتم واحد في كل طرف؛ وما بداخله موجب.', 'One logarithm on each side; positive arguments.'),
        figure: (language) => <LogEquationFigure language={language} />
    },

    /* ---------- 4. First-degree inequalities ---------- */
    {
        id: 'inequalities',
        stage: 'inequalities',
        title: say('Inekuazioak eta tarteak', 'Inecuaciones e intervalos', 'المتراجحات والمجالات', 'Inequalities and intervals'),
        goal: say('Inekuazio baten ebazpenak ezagutzea eta tarte gisa zenbaki-zuzenean adieraztea.', 'Reconocer las soluciones de una inecuación y expresarlas como intervalo en la recta numérica.', 'التعرّف على حلول متراجحة والتعبير عنها مجالًا على مستقيم الأعداد.', 'Recognise the solutions of an inequality and write them as an interval on the number line.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'intervals', title: { eu: 'Tarteak eta zuzenerdiak', es: 'Intervalos y semirrectas', en: 'Intervals and half-lines', ar: 'الفترات وأنصاف المستقيمات' } }
        ],
        problem: say('$-5$, 0, 2 eta 10 zenbakietatik, zein dira $x^{2}-8x<12$ inekuazioaren ebazpenak?', 'De los números $-5$, 0, 2 y 10, ¿cuáles son soluciones de $x^{2}-8x<12$?', 'من الأعداد $-5$ و0 و2 و10، أيها حلول للمتراجحة $x^{2}-8x<12$؟', 'Which of the numbers $-5$, 0, 2 and 10 are solutions of $x^{2}-8x<12$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$-5$: ez.', '$-5$: no.', '$-5$: لا.', '$-5$: no.'), math: same('$25+40=65>12$') },
            { text: say('0 eta 2: bai.', '0 y 2: sí.', '0 و2: نعم.', '0 and 2: yes.'), math: same('$0<12,\\ \\ 4-16=-12<12$') },
            { text: say('10: ez.', '10: no.', '10: لا.', '10: no.'), math: same('$100-80=20>12$') }
        ],
        takeaway: say('[ ]: muturra sartzen da; ( ): ez. ∞ beti parentesiarekin.', '[ ]: el extremo entra; ( ): no. ∞ siempre con paréntesis.', '[ ]: الطرف داخل؛ ( ): خارج. و∞ دائمًا بقوس عادي.', '[ ]: the end is included; ( ): it is not. ∞ always gets a round bracket.'),
        figure: (language) => <IntervalsFigure language={language} />
    },
    {
        id: 'linear-inequality',
        stage: 'inequalities',
        title: say('Lehen mailako inekuazioak ebaztea', 'Resolver inecuaciones de primer grado', 'حل متراجحات الدرجة الأولى', 'Solve first-degree inequalities'),
        goal: say('Lehen mailako inekuazioak ekuazioak bezala ebaztea, negatibo batez biderkatzean zentzua aldatuz.', 'Resolver inecuaciones de primer grado como las ecuaciones, cambiando el sentido al multiplicar por un negativo.', 'حل متراجحات الدرجة الأولى كالمعادلات مع قلب الاتجاه عند الضرب في عدد سالب.', 'Solve first-degree inequalities like equations, reversing the inequality sign when you multiply by a negative.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'brackets', title: { eu: 'Parentesiak dituzten ekuazioak', es: 'Ecuaciones con paréntesis', en: 'Equations with brackets', ar: 'معادلات بأقواس' } }
        ],
        problem: say('Ebatzi $\\frac{x-1}{2}-\\frac{x+3}{3}\\ge 1$.', 'Resuelve $\\frac{x-1}{2}-\\frac{x+3}{3}\\ge 1$.', 'حل $\\frac{x-1}{2}-\\frac{x+3}{3}\\ge 1$.', 'Solve $\\frac{x-1}{2}-\\frac{x+3}{3}\\ge 1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bider 6.', 'Por 6.', 'في 6.', 'Multiply by 6.'), math: same('$3(x-1)-2(x+3)\\ge 6$') },
            { text: say('Laburtu.', 'Reduce.', 'بسّط.', 'Simplify.'), math: same('$x-9\\ge 6$') },
            { text: say('Ebazpena.', 'La solución.', 'الحل.', 'The solution.'), math: same('$x\\ge 15\\ \\to\\ [15,+\\infty)$') }
        ],
        takeaway: say('Ekuazio bat bezala, baina negatibo batez biderkatzean: zentzua aldatu.', 'Como una ecuación, pero al multiplicar por un negativo: cambia el sentido.', 'كالمعادلة، لكن عند الضرب في سالب: اقلب الاتجاه.', 'Like an equation, but when you multiply by a negative, the inequality sign reverses.'),
        figure: (language) => <FlipSignFigure language={language} />
    },
    {
        id: 'inequality-problems',
        stage: 'inequalities',
        title: say('Problemak inekuazioekin', 'Problemas con inecuaciones', 'مسائل بالمتراجحات', 'Problems with inequalities'),
        goal: say('«Gehienez», «gutxienez» edo «ez da iristen» bezalako enuntziatuak inekuazio gisa idaztea eta ebaztea.', 'Escribir y resolver como inecuación enunciados con «como mucho», «al menos» o «no llega a».', 'كتابة وحل عبارات مثل «على الأكثر» و«على الأقل» و«لا يصل إلى» متراجحاتٍ.', 'Write and solve, as inequalities, word problems that use ‘at most’, ‘at least’ or ‘less than’.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'equation-problems', title: { eu: 'Problemak ekuazioekin', es: 'Problemas con ecuaciones', en: 'Problems with equations', ar: 'مسائل بالمعادلات' } }
        ],
        problem: say('Ikasgela batean 28 ikasle daude. Txango baterako autobusak 400 € balio du, eta sarrera bakoitzak 6 €. Zenbat ordaindu behar du ikasle bakoitzak gutxienez, kostua estaltzeko? Biribildu euroetara.', 'En una clase hay 28 alumnos. Para una excursión, el autobús cuesta 400 € y cada entrada 6 €. ¿Cuánto debe pagar como mínimo cada alumno para cubrir el coste? Redondea a euros.', 'في صف 28 طالبًا. لرحلة يكلف الحافلة 400 € وكل تذكرة 6 €. كم يجب أن يدفع كل طالب على الأقل لتغطية التكلفة؟ قرّب إلى اليورو.', 'There are 28 students in a class. For a trip, the bus costs €400 and each ticket costs €6. What is the minimum amount each student must pay to cover the cost? Round to whole euros.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Inekuazioa.', 'La inecuación.', 'المتراجحة.', 'The inequality.'), math: same('$28x\\ge 400+28\\cdot 6$') },
            { text: say('Bakandu.', 'Despeja.', 'اعزل.', 'Solve for x.'), math: same('$x\\ge \\frac{568}{28}\\approx 20{,}29$') },
            { text: say('Euroetan, gutxienez 21 €.', 'En euros, al menos 21 €.', 'باليورو، 21 € على الأقل.', 'In euros, at least €21.'), math: same('$28\\cdot 21=588\\ge 568$') }
        ],
        takeaway: say('Gutxienez ≥, gehienez ≤; begiratu ebazpenek zentzua duten.', 'Al menos ≥, como mucho ≤; mira si las soluciones tienen sentido.', 'على الأقل ≥، على الأكثر ≤؛ وانظر هل للحلول معنى.', 'At least ≥, at most ≤; check whether the solutions make sense.'),
        figure: (language) => <ProblemStepsFigure language={language} />
    },

    /* ---------- 5. Second-degree inequalities and systems ---------- */
    {
        id: 'quadratic-inequality',
        stage: 'quadratic-inequalities',
        title: say('Bigarren mailako inekuazioak', 'Inecuaciones de segundo grado', 'متراجحات الدرجة الثانية', 'Second-degree inequalities'),
        goal: say('Bigarren mailako inekuazioak erroekin eta zeinuekin ebaztea.', 'Resolver inecuaciones de segundo grado con las raíces y los signos.', 'حل متراجحات الدرجة الثانية بالجذور والإشارات.', 'Solve second-degree inequalities using the roots and the signs.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'parabola-intercepts', title: { eu: 'Parabolaren ebaki-puntuak', es: 'Cortes de la parábola con los ejes', en: 'Where a parabola meets the axes', ar: 'تقاطعات القطع المكافئ مع المحورين' } }
        ],
        problem: say('Ebatzi $x^{2}-x-6>0$.', 'Resuelve $x^{2}-x-6>0$.', 'حل $x^{2}-x-6>0$.', 'Solve $x^{2}-x-6>0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erroak.', 'Las raíces.', 'الجذور.', 'The roots.'), math: same('$x=\\frac{1\\pm 5}{2}=3,\\ -2$') },
            { text: say('Probatu 0: $-6<0$, erdian negatiboa.', 'Prueba 0: $-6<0$, negativo en medio.', 'جرّب 0: $-6<0$، سالب في الوسط.', 'Try 0: $-6<0$, negative in the middle.'), math: same('$+\\ \\ -\\ \\ +$') },
            { text: say('Kanpoko zatiak.', 'Los trozos de fuera.', 'الجزآن الخارجيان.', 'The outer pieces.'), math: same('$(-\\infty,-2)\\cup(3,+\\infty)$') }
        ],
        takeaway: say('Erroak, zatiak eta zeinuak; $a>0$: erroen artean negatiboa.', 'Raíces, trozos y signos; $a>0$: negativo entre las raíces.', 'الجذور والأجزاء والإشارات؛ $a>0$: سالب بين الجذرين.', 'Roots, pieces and signs; $a>0$: negative between the roots.'),
        figure: (language) => <QuadraticSignFigure language={language} />
    },
    {
        id: 'graphic-inequality',
        stage: 'quadratic-inequalities',
        title: say('Inekuazioak grafikoki', 'Inecuaciones gráficamente', 'المتراجحات بيانيًا', 'Inequalities graphically'),
        goal: say('Inekuazio bat bi funtzioren grafikoak konparatuz ebaztea.', 'Resolver una inecuación comparando las gráficas de dos funciones.', 'حل متراجحة بمقارنة منحنيي دالتين.', 'Solve an inequality by comparing the graphs of two functions.'),
        needs: [
            { unit: 'dbh3/funciones-lineales', topic: 'reading-graphs', title: { eu: 'Grafikoak irakurri', es: 'Leer gráficas', en: 'Reading graphs', ar: 'قراءة التمثيلات البيانية' } }
        ],
        problem: say('Ebatzi $x^{2}-5x+4\\le -2$.', 'Resuelve $x^{2}-5x+4\\le -2$.', 'حل $x^{2}-5x+4\\le -2$.', 'Solve $x^{2}-5x+4\\le -2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebaki-puntuak.', 'Puntos de corte.', 'نقاط التقاطع.', 'Crossing points.'), math: same('$x^{2}-5x+6=0\\ \\to\\ x=2,\\ x=3$') },
            { text: say('Parabola azpian 2 eta 3 artean.', 'La parábola queda debajo entre 2 y 3.', 'القطع تحت المستقيم بين 2 و3.', 'The parabola is below the straight line between 2 and 3.'), math: same('$[2,3]$') }
        ],
        takeaway: say('$f(x)<g(x)$: f-ren grafikoa g-renaren azpian; mugak, ebaki-puntuak.', '$f(x)<g(x)$: la gráfica de f debajo de la de g; extremos, los cortes.', '$f(x)<g(x)$: منحنى f تحت منحنى g؛ والأطراف نقاط التقاطع.', '$f(x)<g(x)$: the graph of f is below the graph of g; the endpoints are the crossing points.'),
        figure: (language) => <GraphicInequalityFigure language={language} />
    },
    {
        id: 'inequality-systems',
        stage: 'quadratic-inequalities',
        title: say('Inekuazio-sistemak', 'Sistemas de inecuaciones', 'أنظمة المتراجحات', 'Systems of inequalities'),
        goal: say('Ezezagun bateko inekuazio-sistemak ebaztea ebazpen-tarteen ebakidura hartuz.', 'Resolver sistemas de inecuaciones con una incógnita tomando la intersección de los intervalos solución.', 'حل أنظمة متراجحات بمجهول واحد بأخذ تقاطع مجالات الحلول.', 'Solve systems of inequalities with one unknown by taking the intersection of the solution intervals.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'interval-ops', title: { eu: 'Tarteen bildura eta ebakidura', es: 'Unión e intersección de intervalos', en: 'Union and intersection of intervals', ar: 'اتحاد الفترات وتقاطعها' } }
        ],
        problem: say('Ebatzi sistema: $2x+4\\ge 0$ eta $5-x>1$.', 'Resuelve el sistema: $2x+4\\ge 0$ y $5-x>1$.', 'حل النظام: $2x+4\\ge 0$ و$5-x>1$.', 'Solve the system: $2x+4\\ge 0$ and $5-x>1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehena.', 'La primera.', 'الأولى.', 'The first one.'), math: same('$x\\ge -2$') },
            { text: say('Bigarrena.', 'La segunda.', 'الثانية.', 'The second one.'), math: same('$4>x$') },
            { text: say('Ebakidura.', 'La intersección.', 'التقاطع.', 'The intersection.'), math: same('$[-2,4)$') }
        ],
        takeaway: say('Bakoitza bere aldetik, eta gero zati komuna.', 'Cada una por separado, y luego la parte común.', 'كل واحدة على حدة، ثم الجزء المشترك.', 'Each one separately, and then the common part.'),
        figure: (language) => <IntervalIntersectionFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const equationsInequalitiesTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...equationsLessonTexts[topic.id as EquationsTopicId], ...equationsLessonChecks[topic.id as EquationsTopicId] }))

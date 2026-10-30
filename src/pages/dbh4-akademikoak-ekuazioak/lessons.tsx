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

export const equationsInequalitiesTopics: UnitTopic[] = [
    /* ---------- 1. Second-degree equations ---------- */
    {
        id: 'quadratic-formula',
        stage: 'quadratic',
        title: say('Bigarren mailako ekuazioak', 'Ecuaciones de segundo grado', 'معادلات الدرجة الثانية', 'Second-degree equations'),
        goal: say('Bigarren mailako ekuazio osoak eta osatugabeak ebaztea eta diskriminatzailearekin zenbat ebazpen dituzten jakitea.', 'Resolver ecuaciones de segundo grado completas e incompletas y saber con el discriminante cuántas soluciones tienen.', 'حل معادلات الدرجة الثانية التامة وغير التامة ومعرفة عدد حلولها بالمميّز.', 'Solve complete and incomplete quadratic equations, and use the discriminant to know how many solutions they have.'),
        explanation: say(
            '$ax^{2}+bx+c=0$ ekuazioaren ebazpenak $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$ dira. Diskriminatzaileak, $\\Delta=b^{2}-4ac$, zenbat diren esaten du: positiboa bada, bi; 0 bada, bat (bikoitza); negatiboa bada, bat ere ez. Osatugabeak errazago: $b=0$ bada, $2x^{2}-50=0$, $x^{2}=25$, $x=\\pm 5$; $c=0$ bada, faktore komuna: $7x^{2}+5x=x(7x+5)=0$, $x=0$ edo $x=-\\frac{5}{7}$. Adibidez, $10x^{2}-3x-1=0$: $\\Delta=9+40=49$, $x=\\frac{3\\pm 7}{20}$, beraz $\\frac{1}{2}$ eta $-\\frac{1}{5}$. Eta $3x^{2}+5x+11=0$ ekuazioak ez du ebazpenik: $\\Delta=25-132<0$.',
            'Las soluciones de $ax^{2}+bx+c=0$ son $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. El discriminante, $\\Delta=b^{2}-4ac$, dice cuántas hay: si es positivo, dos; si es 0, una (doble); si es negativo, ninguna. Las incompletas, más fácil: si $b=0$, $2x^{2}-50=0$, $x^{2}=25$, $x=\\pm 5$; si $c=0$, factor común: $7x^{2}+5x=x(7x+5)=0$, $x=0$ o $x=-\\frac{5}{7}$. Por ejemplo, $10x^{2}-3x-1=0$: $\\Delta=9+40=49$, $x=\\frac{3\\pm 7}{20}$, así que $\\frac{1}{2}$ y $-\\frac{1}{5}$. Y $3x^{2}+5x+11=0$ no tiene solución: $\\Delta=25-132<0$.',
            'حلول $ax^{2}+bx+c=0$ هي $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. والمميّز $\\Delta=b^{2}-4ac$ يخبر بعددها: إذا كان موجبًا فحلّان، وإذا كان 0 فحل واحد (مضاعف)، وإذا كان سالبًا فلا حل. وغير التامة أسهل: إذا كان $b=0$ فإن $2x^{2}-50=0$ و$x^{2}=25$ و$x=\\pm 5$؛ وإذا كان $c=0$ فالعامل المشترك: $7x^{2}+5x=x(7x+5)=0$، $x=0$ أو $x=-\\frac{5}{7}$. مثلًا $10x^{2}-3x-1=0$: $\\Delta=9+40=49$ و$x=\\frac{3\\pm 7}{20}$، أي $\\frac{1}{2}$ و$-\\frac{1}{5}$. أما $3x^{2}+5x+11=0$ فلا حل لها: $\\Delta=25-132<0$.', 'The solutions of $ax^{2}+bx+c=0$ are $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. The discriminant, $\\Delta=b^{2}-4ac$, tells you how many there are: if it is positive, two; if it is 0, one (a double root); if it is negative, none. Incomplete ones are easier: if $b=0$, $2x^{2}-50=0$, $x^{2}=25$, $x=\\pm 5$; if $c=0$, take out the common factor: $7x^{2}+5x=x(7x+5)=0$, $x=0$ or $x=-\\frac{5}{7}$. For example, $10x^{2}-3x-1=0$: $\\Delta=9+40=49$, $x=\\frac{3\\pm 7}{20}$, so $\\frac{1}{2}$ and $-\\frac{1}{5}$. And $3x^{2}+5x+11=0$ has no solution: $\\Delta=25-132<0$.'
        ),
        problem: say('Ebatzi $3x^{2}-4x-4=0$.', 'Resuelve $3x^{2}-4x-4=0$.', 'حل $3x^{2}-4x-4=0$.', 'Solve $3x^{2}-4x-4=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Diskriminatzailea.', 'El discriminante.', 'المميّز.', 'The discriminant.'), math: same('$\\Delta=16+48=64$') },
            { text: say('Formula.', 'La fórmula.', 'الصيغة.', 'The formula.'), math: same('$x=\\frac{4\\pm 8}{6}$') },
            { text: say('Bi ebazpen.', 'Dos soluciones.', 'حلّان.', 'Two solutions.'), math: same('$x=2,\\ x=-\\frac{2}{3}$') }
        ],
        example: same('$\\Delta=b^{2}-4ac$'),
        takeaway: say('$X=\\frac{-B\\pm\\sqrt{\\Delta}}{2A}$; $\\Delta<0$: ebazpenik ez.', '$X=\\frac{-B\\pm\\sqrt{\\Delta}}{2A}$; $\\Delta<0$: sin solución.', '$X=\\frac{-B\\pm\\sqrt{\\Delta}}{2A}$؛ $\\Delta<0$: لا حل.', '$X=\\frac{-B\\pm\\sqrt{\\Delta}}{2A}$; $\\Delta<0$: no solution.'),
        figure: (language) => <QuadraticFormulaFigure language={language} />
    },
    {
        id: 'roots-relations',
        stage: 'quadratic',
        title: say('Erroen batura eta biderkadura', 'Suma y producto de las raíces', 'مجموع الجذرين وجداؤهما', 'Sum and product of the roots'),
        goal: say('Erroen batura eta biderkadura koefizienteekin lotzea eta erroak jakinda ekuazioa idaztea.', 'Relacionar la suma y el producto de las raíces con los coeficientes y escribir la ecuación conociendo sus raíces.', 'ربط مجموع الجذرين وجدائهما بالمعاملات وكتابة المعادلة بمعرفة جذريها.', 'Relate the sum and product of the roots to the coefficients, and write the equation when you know its roots.'),
        explanation: say(
            '$ax^{2}+bx+c=0$ ekuazioaren erroak $x_1$ eta $x_2$ badira, $x_1+x_2=-\\frac{b}{a}$ eta $x_1\\cdot x_2=\\frac{c}{a}$, eta $ax^{2}+bx+c=a(x-x_1)(x-x_2)$. $x^{2}-7x+10=0$: erroak 2 eta 5 dira, $2+5=7$ eta $2\\cdot 5=10$. Alderantziz, S batura eta P biderkadura dituzten erroen ekuazioa $x^{2}-Sx+P=0$ da: 3 eta $-5$ erroak dituena, $S=-2$ eta $P=-15$, $x^{2}+2x-15=0$. Diskriminatzaileak ere balio du parametroak aurkitzeko: $x^{2}-6x+k=0$ ekuazioak erro bikoitza du $36-4k=0$ bada, hau da, $k=9$ denean.',
            'Si $x_1$ y $x_2$ son las raíces de $ax^{2}+bx+c=0$, entonces $x_1+x_2=-\\frac{b}{a}$ y $x_1\\cdot x_2=\\frac{c}{a}$, y $ax^{2}+bx+c=a(x-x_1)(x-x_2)$. $x^{2}-7x+10=0$: las raíces son 2 y 5, $2+5=7$ y $2\\cdot 5=10$. Al revés, la ecuación cuyas raíces suman S y multiplican P es $x^{2}-Sx+P=0$: la de raíces 3 y $-5$, con $S=-2$ y $P=-15$, es $x^{2}+2x-15=0$. El discriminante también sirve para hallar parámetros: $x^{2}-6x+k=0$ tiene una raíz doble si $36-4k=0$, es decir, para $k=9$.',
            'إذا كان $x_1$ و$x_2$ جذري $ax^{2}+bx+c=0$ فإن $x_1+x_2=-\\frac{b}{a}$ و$x_1\\cdot x_2=\\frac{c}{a}$، و$ax^{2}+bx+c=a(x-x_1)(x-x_2)$. $x^{2}-7x+10=0$: الجذران 2 و5، و$2+5=7$ و$2\\cdot 5=10$. وبالعكس، المعادلة التي مجموع جذريها S وجداؤهما P هي $x^{2}-Sx+P=0$: التي جذراها 3 و$-5$، حيث $S=-2$ و$P=-15$، هي $x^{2}+2x-15=0$. ويفيد المميّز أيضًا لإيجاد الوسائط: للمعادلة $x^{2}-6x+k=0$ جذر مضاعف إذا كان $36-4k=0$، أي عندما $k=9$.', 'If $x_1$ and $x_2$ are the roots of $ax^{2}+bx+c=0$, then $x_1+x_2=-\\frac{b}{a}$ and $x_1\\cdot x_2=\\frac{c}{a}$, and $ax^{2}+bx+c=a(x-x_1)(x-x_2)$. For $x^{2}-7x+10=0$: the roots are 2 and 5, $2+5=7$ and $2\\cdot 5=10$. The other way round, the equation whose roots add up to S and multiply to P is $x^{2}-Sx+P=0$: the one with roots 3 and $-5$, with $S=-2$ and $P=-15$, is $x^{2}+2x-15=0$. The discriminant can also help find parameters: $x^{2}-6x+k=0$ has a double root if $36-4k=0$, that is, for $k=9$.'
        ),
        problem: say('$x^{2}+bx-12=0$ ekuazioaren erro bat 3 da. Zein da bestea, eta zenbat da b?', 'Una raíz de $x^{2}+bx-12=0$ es 3. ¿Cuál es la otra, y cuánto vale b?', 'أحد جذري $x^{2}+bx-12=0$ هو 3. ما الجذر الآخر، وكم تساوي b؟', 'One root of $x^{2}+bx-12=0$ is 3. What is the other root, and what is the value of b?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura $\\frac{c}{a}=-12$.', 'Producto $\\frac{c}{a}=-12$.', 'الجداء $\\frac{c}{a}=-12$.', 'Product $\\frac{c}{a}=-12$.'), math: same('$3\\cdot x_2=-12\\ \\to\\ x_2=-4$') },
            { text: say('Batura $-b$ da.', 'La suma es $-b$.', 'المجموع هو $-b$.', 'The sum is $-b$.'), math: same('$3-4=-1\\ \\to\\ b=1$') }
        ],
        example: same('$x^{2}-Sx+P=0$'),
        takeaway: say('$X_1+X_2=-\\frac{B}{A}$, $X_1\\cdot X_2=\\frac{C}{A}$.', '$X_1+X_2=-\\frac{B}{A}$, $X_1\\cdot X_2=\\frac{C}{A}$.', '$X_1+X_2=-\\frac{B}{A}$، $X_1\\cdot X_2=\\frac{C}{A}$.', '$X_1+X_2=-\\frac{B}{A}$, $X_1\\cdot X_2=\\frac{C}{A}$.'),
        figure: (language) => <SumProductFigure language={language} />
    },
    {
        id: 'quadratic-problems',
        stage: 'quadratic',
        title: say('Bigarren mailako problemak', 'Problemas de segundo grado', 'مسائل الدرجة الثانية', 'Quadratic word problems'),
        goal: say('Problemak bigarren mailako ekuazio batekin ebaztea eta testuingurura egokitzen ez diren ebazpenak baztertzea.', 'Resolver problemas con una ecuación de segundo grado y descartar las soluciones que no encajan en el contexto.', 'حل مسائل بمعادلة من الدرجة الثانية واستبعاد الحلول التي لا تناسب السياق.', 'Solve problems using a quadratic equation, and rule out the solutions that do not fit the context.'),
        explanation: say(
            'Urratsak beti berberak dira: ezezaguna izendatu, ekuazioa idatzi, ebatzi eta ebazpenak egiaztatu. Bigarren mailakoak bi ebazpen eman ditzake, eta batzuetan bat ez da baliozkoa (luzera negatiboa, pertsona kopuru zatikia…). Triangelu angeluzuzen baten aldeak elkarren artean 3 cm-ra badaude, x, $x+3$ eta $x+6$: Pitagorasekin $(x+6)^{2}=x^{2}+(x+3)^{2}$, $x^{2}-6x-27=0$, $x=9$ edo $x=-3$; aldeak 9, 12 eta 15 cm. Bi zenbaki jarraien biderkadura 156 bada, $x(x+1)=156$, $x^{2}+x-156=0$, $x=12$ edo $x=-13$: 12 eta 13, edo $-13$ eta $-12$.',
            'Los pasos son siempre los mismos: nombrar la incógnita, escribir la ecuación, resolverla y comprobar las soluciones. Una de segundo grado puede dar dos soluciones, y a veces una no vale (una longitud negativa, un número de personas fraccionario…). Si los lados de un triángulo rectángulo se llevan 3 cm, miden x, $x+3$ y $x+6$: con Pitágoras, $(x+6)^{2}=x^{2}+(x+3)^{2}$, $x^{2}-6x-27=0$, $x=9$ o $x=-3$; los lados miden 9, 12 y 15 cm. Si el producto de dos números consecutivos es 156, $x(x+1)=156$, $x^{2}+x-156=0$, $x=12$ o $x=-13$: 12 y 13, o $-13$ y $-12$.',
            'الخطوات هي نفسها دائمًا: تسمية المجهول، وكتابة المعادلة، وحلها، والتحقق من الحلول. وقد تعطي معادلة الدرجة الثانية حلين، وأحيانًا لا يصلح أحدهما (طول سالب، أو عدد أشخاص كسري…). إذا كان الفرق بين أضلاع مثلث قائم 3 سم فهي x و$x+3$ و$x+6$: بفيثاغورس $(x+6)^{2}=x^{2}+(x+3)^{2}$ و$x^{2}-6x-27=0$، $x=9$ أو $x=-3$؛ فالأضلاع 9 و12 و15 سم. وإذا كان جداء عددين متتاليين 156 فإن $x(x+1)=156$ و$x^{2}+x-156=0$، $x=12$ أو $x=-13$: أي 12 و13، أو $-13$ و$-12$.', 'The steps are always the same: name the unknown, write the equation, solve it and check the solutions. A quadratic equation can give two solutions, and sometimes one of them does not work (a negative length, a fractional number of people…). If the sides of a right-angled triangle each differ by 3 cm, they measure x, $x+3$ and $x+6$: using Pythagoras\' theorem, $(x+6)^{2}=x^{2}+(x+3)^{2}$, $x^{2}-6x-27=0$, $x=9$ or $x=-3$; the sides measure 9, 12 and 15 cm. If the product of two consecutive numbers is 156, $x(x+1)=156$, $x^{2}+x-156=0$, $x=12$ or $x=-13$: 12 and 13, or $-13$ and $-12$.'
        ),
        problem: say('Laukizuzen baten oinarriak altuerak baino 4 cm gehiago ditu, eta azalera 60 cm² da. Zenbat neurtzen du altuerak?', 'La base de un rectángulo mide 4 cm más que la altura y su área es 60 cm². ¿Cuánto mide la altura?', 'قاعدة مستطيل أطول من ارتفاعه بـ4 سم ومساحته 60 سم². كم ارتفاعه؟', 'The base of a rectangle is 4 cm longer than its height, and its area is 60 cm². How long is the height?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ekuazioa.', 'La ecuación.', 'المعادلة.', 'The equation.'), math: same('$x(x+4)=60$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$x^{2}+4x-60=0\\ \\to\\ x=6,\\ x=-10$') },
            { text: say('$-10$ ez da baliozkoa: 6 cm.', '$-10$ no vale: 6 cm.', '$-10$ لا يصلح: 6 سم.', '$-10$ doesn\'t work: 6 cm.'), math: same('$6\\cdot 10=60$') }
        ],
        example: same('$x(x+1)=156$'),
        takeaway: say('Izendatu, idatzi, ebatzi eta egiaztatu: ebazpen guztiak ez dira baliozkoak.', 'Nombra, escribe, resuelve y comprueba: no todas las soluciones valen.', 'سمِّ واكتب وحلّ وتحقّق: ليست كل الحلول صالحة.', 'Name, write, solve and check: not every solution is valid.'),
        figure: (language) => <TriangleProblemFigure language={language} />
    },

    /* ---------- 2. Other polynomial equations ---------- */
    {
        id: 'biquadratic',
        stage: 'other',
        title: say('Ekuazio bikarratuak', 'Ecuaciones bicuadradas', 'المعادلات الثنائية التربيع', 'Biquadratic equations'),
        goal: say('$ax^{4}+bx^{2}+c=0$ ekuazioak $t=x^{2}$ aldaketarekin ebaztea.', 'Resolver ecuaciones $ax^{4}+bx^{2}+c=0$ con el cambio $t=x^{2}$.', 'حل المعادلات $ax^{4}+bx^{2}+c=0$ بالتعويض $t=x^{2}$.', 'Solve equations $ax^{4}+bx^{2}+c=0$ using the substitution $t=x^{2}$.'),
        explanation: say(
            'Ekuazio bikarratu batean x-ren berretzaileak 4 eta 2 bakarrik dira. $t=x^{2}$ aldaketarekin bigarren mailako ekuazio bihurtzen da: $x^{4}-9x^{2}+20=0$ ekuazioa $t^{2}-9t+20=0$ da, $t=5$ eta $t=4$; orduan $x=\\pm\\sqrt{5}$ eta $x=\\pm 2$, lau ebazpen. t negatiboa bada, ez dago x errealik: $4x^{4}+19x^{2}-5=0$ ekuazioan $t=\\frac{1}{4}$ edo $t=-5$, beraz $x=\\pm\\frac{1}{2}$ bakarrik. $x^{4}+9x^{2}+18=0$ ekuazioak ez du ebazpenik, bi t-ak negatiboak direlako. Gai askerik ez badago, faktore komuna: $3x^{4}-12x^{2}=3x^{2}(x^{2}-4)$, $x=0$, $x=\\pm 2$.',
            'En una ecuación bicuadrada los exponentes de x son solo 4 y 2. Con el cambio $t=x^{2}$ se convierte en una de segundo grado: $x^{4}-9x^{2}+20=0$ queda $t^{2}-9t+20=0$, $t=5$ y $t=4$; entonces $x=\\pm\\sqrt{5}$ y $x=\\pm 2$, cuatro soluciones. Si t es negativo, no hay x real: en $4x^{4}+19x^{2}-5=0$, $t=\\frac{1}{4}$ o $t=-5$, así que solo $x=\\pm\\frac{1}{2}$. $x^{4}+9x^{2}+18=0$ no tiene solución, porque las dos t son negativas. Si no hay término independiente, factor común: $3x^{4}-12x^{2}=3x^{2}(x^{2}-4)$, $x=0$, $x=\\pm 2$.',
            'في المعادلة الثنائية التربيع أسس x هي 4 و2 فقط. وبالتعويض $t=x^{2}$ تصير من الدرجة الثانية: $x^{4}-9x^{2}+20=0$ تصبح $t^{2}-9t+20=0$، $t=5$ و$t=4$؛ إذن $x=\\pm\\sqrt{5}$ و$x=\\pm 2$، أربعة حلول. وإذا كان t سالبًا فلا يوجد x حقيقي: في $4x^{4}+19x^{2}-5=0$ يكون $t=\\frac{1}{4}$ أو $t=-5$، فلا حل إلا $x=\\pm\\frac{1}{2}$. أما $x^{4}+9x^{2}+18=0$ فلا حل لها لأن قيمتي t سالبتان. وإذا لم يوجد حد ثابت فالعامل المشترك: $3x^{4}-12x^{2}=3x^{2}(x^{2}-4)$، $x=0$ و$x=\\pm 2$.', 'In a biquadratic equation the exponents of x are only 4 and 2. With the substitution $t=x^{2}$ it becomes a quadratic equation: $x^{4}-9x^{2}+20=0$ becomes $t^{2}-9t+20=0$, $t=5$ and $t=4$; then $x=\\pm\\sqrt{5}$ and $x=\\pm 2$, four solutions. If t is negative, there is no real x: in $4x^{4}+19x^{2}-5=0$, $t=\\frac{1}{4}$ or $t=-5$, so only $x=\\pm\\frac{1}{2}$. $x^{4}+9x^{2}+18=0$ has no solution, because both t values are negative. If there is no constant term, take out a common factor: $3x^{4}-12x^{2}=3x^{2}(x^{2}-4)$, $x=0$, $x=\\pm 2$.'
        ),
        problem: say('Ebatzi $x^{4}-13x^{2}+36=0$.', 'Resuelve $x^{4}-13x^{2}+36=0$.', 'حل $x^{4}-13x^{2}+36=0$.', 'Solve $x^{4}-13x^{2}+36=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$t=x^{2}$.', '$t=x^{2}$.', '$t=x^{2}$.', '$t=x^{2}$.'), math: same('$t^{2}-13t+36=0$') },
            { text: say('t-ren balioak.', 'Los valores de t.', 'قيم t.', 'The values of t.'), math: same('$t=\\frac{13\\pm 5}{2}=9,\\ 4$') },
            { text: say('Lau ebazpen.', 'Cuatro soluciones.', 'أربعة حلول.', 'Four solutions.'), math: same('$x=\\pm 3,\\ x=\\pm 2$') }
        ],
        example: same('$t=x^{2}$'),
        takeaway: say('$T=X^{2}$; $T$ negatiboa bada, ez dago $X$-rik.', '$T=X^{2}$; si $T$ es negativo, no hay $X$.', '$T=X^{2}$؛ إذا كان $T$ سالبًا فلا يوجد $X$.', '$T=X^{2}$; if $T$ is negative, there is no $X$.'),
        figure: (language) => <BiquadraticFigure language={language} />
    },
    {
        id: 'factored',
        stage: 'other',
        title: say('Faktorizatuz ebaztea', 'Resolver factorizando', 'الحل بالتحليل', 'Solving by factorising'),
        goal: say('Maila handiko ekuazioak faktorizatuz eta faktore bakoitza 0 eginez ebaztea.', 'Resolver ecuaciones de grado mayor factorizando e igualando a 0 cada factor.', 'حل المعادلات ذات الدرجة الأعلى بالتحليل ومساواة كل عامل بالصفر.', 'Solve higher-degree equations by factorising and setting each factor equal to 0.'),
        explanation: say(
            'Biderkadura bat 0 da faktoreren bat 0 bada. Beraz, $P(x)=0$ ebazteko, faktorizatu P eta berdindu faktore bakoitza 0: $(x+1)(x^{2}-4)=0$ ekuazioan $x=-1$, $x=2$ eta $x=-2$. Faktorizatzeko, polinomioen unitatean bezala: faktore komuna, identitateak eta Ruffini gai askearen zatitzaileekin. $x^{3}-7x-6=0$: $-1$ erroa da, zatidura $x^{2}-x-6=(x-3)(x+2)$, beraz $x=-1$, $x=3$, $x=-2$. n mailako ekuazio batek gehienez n ebazpen ditu. Inoiz ez zatitu x-z bi aldeak: $x^{3}=4x$ ekuazioan $x=0$ galduko zenuke; hobe $x(x^{2}-4)=0$.',
            'Un producto es 0 si algún factor es 0. Así que, para resolver $P(x)=0$, factoriza P e iguala a 0 cada factor: en $(x+1)(x^{2}-4)=0$, $x=-1$, $x=2$ y $x=-2$. Para factorizar, como en la unidad de polinomios: factor común, identidades y Ruffini con los divisores del término independiente. $x^{3}-7x-6=0$: $-1$ es raíz, el cociente es $x^{2}-x-6=(x-3)(x+2)$, así que $x=-1$, $x=3$, $x=-2$. Una ecuación de grado n tiene como mucho n soluciones. Nunca dividas los dos miembros entre x: en $x^{3}=4x$ perderías $x=0$; mejor $x(x^{2}-4)=0$.',
            'يكون الجداء 0 إذا كان أحد عوامله 0. لذلك لحل $P(x)=0$ حلّل P وساوِ كل عامل بالصفر: في $(x+1)(x^{2}-4)=0$ يكون $x=-1$ و$x=2$ و$x=-2$. وللتحليل كما في وحدة الحدوديات: العامل المشترك والمتطابقات وروفيني بقواسم الحد الثابت. $x^{3}-7x-6=0$: العدد $-1$ جذر، وخارج القسمة $x^{2}-x-6=(x-3)(x+2)$، إذن $x=-1$ و$x=3$ و$x=-2$. وللمعادلة من الدرجة n على الأكثر n حلًا. ولا تقسم الطرفين على x أبدًا: في $x^{3}=4x$ ستفقد $x=0$؛ والأفضل $x(x^{2}-4)=0$.', 'A product is 0 if any factor is 0. So, to solve $P(x)=0$, factorise P and set each factor equal to 0: in $(x+1)(x^{2}-4)=0$, $x=-1$, $x=2$ and $x=-2$. To factorise, use the methods from the polynomials unit: common factor, identities and Ruffini with the divisors of the constant term. $x^{3}-7x-6=0$: $-1$ is a root, the quotient is $x^{2}-x-6=(x-3)(x+2)$, so $x=-1$, $x=3$, $x=-2$. An equation of degree n has at most n solutions. Never divide both sides by x: in $x^{3}=4x$ you would lose $x=0$; it is better to write $x(x^{2}-4)=0$.'
        ),
        problem: say('Ebatzi $x^{3}-4x^{2}+x+6=0$.', 'Resuelve $x^{3}-4x^{2}+x+6=0$.', 'حل $x^{3}-4x^{2}+x+6=0$.', 'Solve $x^{3}-4x^{2}+x+6=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$-1$ probatu.', 'Prueba con $-1$.', 'جرّب $-1$.', 'Try $-1$.'), math: same('$-1-4-1+6=0$') },
            { text: say('Ruffiniz zatidura.', 'Cociente con Ruffini.', 'خارج القسمة بروفيني.', 'Find the quotient with Ruffini.'), math: same('$x^{2}-5x+6=(x-2)(x-3)$') },
            { text: say('Hiru ebazpen.', 'Tres soluciones.', 'ثلاثة حلول.', 'Three solutions.'), math: same('$x=-1,\\ x=2,\\ x=3$') }
        ],
        example: same('$A\\cdot B=0$'),
        takeaway: say('Faktorizatu eta berdindu faktore bakoitza 0; ez zatitu x-z.', 'Factoriza e iguala cada factor a 0; no dividas entre x.', 'حلّل وساوِ كل عامل بالصفر؛ ولا تقسم على x.', 'Factorise and set each factor equal to 0; do not divide by x.'),
        figure: (language) => <FactoredFigure language={language} />
    },
    {
        id: 'rational',
        stage: 'other',
        title: say('Ekuazio arrazionalak', 'Ecuaciones racionales', 'المعادلات الكسرية', 'Rational equations'),
        goal: say('Izendatzailean x duten ekuazioak m.k.t.-az biderkatuz ebaztea eta ebazpenak egiaztatzea.', 'Resolver ecuaciones con x en el denominador multiplicando por el m.c.m. y comprobar las soluciones.', 'حل المعادلات التي فيها x في المقام بالضرب في المضاعف المشترك الأصغر والتحقق من الحلول.', 'Solve equations with x in the denominator by multiplying by the LCM, and check the solutions.'),
        explanation: say(
            'Izendatzaileak kentzeko, ekuazioa haien m.k.t.-az biderkatzen da, gai bakoitza. $\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}$: bider $x(x-2)$, $x^{2}+2(x-2)=4$, $x^{2}+2x-8=0$, $x=2$ edo $x=-4$. Baina $x=2$ denean izendatzaile bat 0 da: ez da ebazpena. Beraz, $x=-4$ bakarrik. Beti egiaztatu ebazpenak hasierako ekuazioan, izendatzaileak 0 egiten dituztenak baztertzeko. Izendatzaileak faktorizatuta, m.k.t.-a errazago ikusten da: $\\frac{1}{x^{2}-1}$ eta $\\frac{1}{x+1}$ zatikien m.k.t.-a $(x+1)(x-1)$ da.',
            'Para quitar los denominadores se multiplica la ecuación por su m.c.m., término a término. $\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}$: por $x(x-2)$, $x^{2}+2(x-2)=4$, $x^{2}+2x-8=0$, $x=2$ o $x=-4$. Pero para $x=2$ un denominador es 0: no es solución. Así que solo $x=-4$. Comprueba siempre las soluciones en la ecuación inicial, para descartar las que anulan algún denominador. Con los denominadores factorizados, el m.c.m. se ve mejor: el de $\\frac{1}{x^{2}-1}$ y $\\frac{1}{x+1}$ es $(x+1)(x-1)$.',
            'لحذف المقامات نضرب المعادلة في مضاعفها المشترك الأصغر حدًّا حدًّا. $\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}$: في $x(x-2)$، $x^{2}+2(x-2)=4$، $x^{2}+2x-8=0$، $x=2$ أو $x=-4$. لكن عندما $x=2$ يكون أحد المقامات 0: فليس حلًا. إذن $x=-4$ فقط. تحقّق دائمًا من الحلول في المعادلة الأصلية لاستبعاد ما يعدم مقامًا. وبعد تحليل المقامات يظهر المضاعف المشترك الأصغر أوضح: لـ$\\frac{1}{x^{2}-1}$ و$\\frac{1}{x+1}$ هو $(x+1)(x-1)$.', 'To remove the denominators, multiply every term of the equation by their LCM. $\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}$: multiplying by $x(x-2)$ gives $x^{2}+2(x-2)=4$, $x^{2}+2x-8=0$, $x=2$ or $x=-4$. But for $x=2$ one denominator is 0: it is not a solution. So only $x=-4$. Always check the solutions in the original equation, to rule out any that make a denominator zero. When the denominators are factorised, the LCM is easier to see: that of $\\frac{1}{x^{2}-1}$ and $\\frac{1}{x+1}$ is $(x+1)(x-1)$.'
        ),
        problem: say('Ebatzi $\\frac{1}{x}+\\frac{1}{x+1}=\\frac{3}{2}$.', 'Resuelve $\\frac{1}{x}+\\frac{1}{x+1}=\\frac{3}{2}$.', 'حل $\\frac{1}{x}+\\frac{1}{x+1}=\\frac{3}{2}$.', 'Solve $\\frac{1}{x}+\\frac{1}{x+1}=\\frac{3}{2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bider $2x(x+1)$.', 'Por $2x(x+1)$.', 'في $2x(x+1)$.', 'Multiply by $2x(x+1)$.'), math: same('$2(x+1)+2x=3x(x+1)$') },
            { text: say('Ordenatu.', 'Ordena.', 'رتّب.', 'Rearrange.'), math: same('$3x^{2}-x-2=0$') },
            { text: say('Biak baliozkoak dira.', 'Las dos valen.', 'كلاهما صالح.', 'Both work.'), math: same('$x=1,\\ x=-\\frac{2}{3}$') }
        ],
        example: same('$x\\neq 0,\\ x\\neq 2$'),
        takeaway: say('Bider m.k.t. eta egiaztatu: izendatzailea 0 egiten duena ez da ebazpena.', 'Por el m.c.m. y comprueba: lo que anula un denominador no es solución.', 'في المضاعف المشترك ثم تحقّق: ما يعدم المقام ليس حلًا.', 'Use the LCM and check: anything that makes a denominator zero is not a solution.'),
        figure: (language) => <RationalEquationFigure language={language} />
    },

    /* ---------- 3. Radical, exponential and logarithmic equations ---------- */
    {
        id: 'radical',
        stage: 'exponential',
        title: say('Ekuazio irrazionalak', 'Ecuaciones irracionales', 'المعادلات الجذرية', 'Radical equations'),
        goal: say('Erro bat duten ekuazioak erroa bakartuz eta karratura jasoz ebaztea, ebazpen faltsuak baztertuz.', 'Resolver ecuaciones con raíces aislando la raíz y elevando al cuadrado, descartando las soluciones falsas.', 'حل المعادلات ذات الجذور بعزل الجذر والتربيع واستبعاد الحلول الزائفة.', 'Solve equations with square roots by isolating the root, squaring both sides, and ruling out false solutions.'),
        explanation: say(
            'Erroa alde batean bakartzen da eta bi aldeak karratura jasotzen dira. Karratura jasotzean ebazpen berriak ager daitezke ($3\\neq -3$ baina $9=9$), beraz egiaztapena ezinbestekoa da. $\\sqrt{4x+5}=x+2$: $4x+5=x^{2}+4x+4$, $x^{2}=1$, $x=\\pm 1$; biak baliozkoak ($\\sqrt{9}=3$ eta $\\sqrt{1}=1$). $x-1=\\sqrt{2x-3}$: $x^{2}-2x+1=2x-3$, $(x-2)^{2}=0$, $x=2$. Bi erro badaude, bakartu bat, karratura jaso, eta errepikatu. Gogoratu: $(a+b)^{2}$ ez da $a^{2}+b^{2}$.',
            'Se aísla la raíz en un miembro y se elevan los dos miembros al cuadrado. Al elevar al cuadrado pueden aparecer soluciones nuevas ($3\\neq -3$ pero $9=9$), así que la comprobación es imprescindible. $\\sqrt{4x+5}=x+2$: $4x+5=x^{2}+4x+4$, $x^{2}=1$, $x=\\pm 1$; las dos valen ($\\sqrt{9}=3$ y $\\sqrt{1}=1$). $x-1=\\sqrt{2x-3}$: $x^{2}-2x+1=2x-3$, $(x-2)^{2}=0$, $x=2$. Si hay dos raíces, aísla una, eleva al cuadrado y repite. Recuerda: $(a+b)^{2}$ no es $a^{2}+b^{2}$.',
            'نعزل الجذر في طرف ونربّع الطرفين. وعند التربيع قد تظهر حلول جديدة ($3\\neq -3$ لكن $9=9$)، لذلك التحقق ضروري. $\\sqrt{4x+5}=x+2$: $4x+5=x^{2}+4x+4$، $x^{2}=1$، $x=\\pm 1$؛ وكلاهما صالح ($\\sqrt{9}=3$ و$\\sqrt{1}=1$). $x-1=\\sqrt{2x-3}$: $x^{2}-2x+1=2x-3$، $(x-2)^{2}=0$، $x=2$. وإذا وُجد جذران فاعزل أحدهما وربّع وكرّر. تذكّر: $(a+b)^{2}$ ليست $a^{2}+b^{2}$.', 'Isolate the square root on one side and square both sides. Squaring can create new solutions ($3\\neq -3$ but $9=9$), so checking is essential. $\\sqrt{4x+5}=x+2$: $4x+5=x^{2}+4x+4$, $x^{2}=1$, $x=\\pm 1$; both work ($\\sqrt{9}=3$ and $\\sqrt{1}=1$). $x-1=\\sqrt{2x-3}$: $x^{2}-2x+1=2x-3$, $(x-2)^{2}=0$, $x=2$. If there are two roots, isolate one, square, and repeat. Remember: $(a+b)^{2}$ is not $a^{2}+b^{2}$.'
        ),
        problem: say('Ebatzi $\\sqrt{20-x}=x-8$.', 'Resuelve $\\sqrt{20-x}=x-8$.', 'حل $\\sqrt{20-x}=x-8$.', 'Solve $\\sqrt{20-x}=x-8$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Karratura jaso.', 'Eleva al cuadrado.', 'ربّع.', 'Square both sides.'), math: same('$20-x=x^{2}-16x+64$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$x^{2}-15x+44=0\\ \\to\\ 11,\\ 4$') },
            { text: say('Egiaztatu: 4 ez da baliozkoa.', 'Comprueba: 4 no vale.', 'تحقّق: 4 لا يصلح.', 'Check: 4 doesn\'t work.'), math: same('$\\sqrt{9}=3=11-8$') }
        ],
        example: same('$\\sqrt{x+2}=x$'),
        takeaway: say('Bakartu, karratura jaso eta beti egiaztatu.', 'Aísla, eleva al cuadrado y comprueba siempre.', 'اعزل وربّع وتحقّق دائمًا.', 'Isolate the root, square both sides, and always check.'),
        figure: (language) => <RadicalFigure language={language} />
    },
    {
        id: 'exponential',
        stage: 'exponential',
        title: say('Ekuazio esponentzialak', 'Ecuaciones exponenciales', 'المعادلات الأسية', 'Exponential equations'),
        goal: say('Ezezaguna berretzailean duten ekuazioak oinarri bera bilatuz, faktore komuna aterata edo logaritmoekin ebaztea.', 'Resolver ecuaciones con la incógnita en el exponente buscando la misma base, sacando factor común o con logaritmos.', 'حل المعادلات التي فيها المجهول في الأس بإيجاد الأساس نفسه أو بإخراج العامل المشترك أو باللوغاريتمات.', 'Solve equations with the unknown in the exponent by finding the same base, taking out a common factor, or using logarithms.'),
        explanation: say(
            'Bi aldeak oinarri bereko berretura gisa idatz badaitezke, berretzaileak berdintzen dira: $3^{x^{2}-5}=81=3^{4}$, $x^{2}-5=4$, $x=\\pm 3$; $2^{x+1}=\\frac{1}{8}=2^{-3}$, $x=-4$. Berretura bat baino gehiago batzen badira, atera faktore komuna: $2^{x}+2^{x+3}=36$ ekuazioan $2^{x+3}=8\\cdot 2^{x}$, beraz $9\\cdot 2^{x}=36$, $2^{x}=4$, $x=2$; $4^{x}+4^{x+2}=272$: $17\\cdot 4^{x}=272$, $4^{x}=16$, $x=2$. Oinarri berdinik ez badago, logaritmoak hartzen dira: $5^{x}=193$, $x=\\frac{\\log 193}{\\log 5}\\approx 3{,}27$.',
            'Si los dos miembros se pueden escribir como potencias de la misma base, se igualan los exponentes: $3^{x^{2}-5}=81=3^{4}$, $x^{2}-5=4$, $x=\\pm 3$; $2^{x+1}=\\frac{1}{8}=2^{-3}$, $x=-4$. Si se suman varias potencias, saca factor común: en $2^{x}+2^{x+3}=36$, $2^{x+3}=8\\cdot 2^{x}$, así que $9\\cdot 2^{x}=36$, $2^{x}=4$, $x=2$; $4^{x}+4^{x+2}=272$: $17\\cdot 4^{x}=272$, $4^{x}=16$, $x=2$. Si no hay una base común, se toman logaritmos: $5^{x}=193$, $x=\\frac{\\log 193}{\\log 5}\\approx 3{,}27$.',
            'إذا أمكن كتابة الطرفين قوتين للأساس نفسه نساوي الأسس: $3^{x^{2}-5}=81=3^{4}$، $x^{2}-5=4$، $x=\\pm 3$؛ $2^{x+1}=\\frac{1}{8}=2^{-3}$، $x=-4$. وإذا جُمعت عدة قوى فأخرج العامل المشترك: في $2^{x}+2^{x+3}=36$ يكون $2^{x+3}=8\\cdot 2^{x}$، إذن $9\\cdot 2^{x}=36$ و$2^{x}=4$ و$x=2$؛ $4^{x}+4^{x+2}=272$: $17\\cdot 4^{x}=272$، $4^{x}=16$، $x=2$. وإذا لم يوجد أساس مشترك نأخذ اللوغاريتمات: $5^{x}=193$، $x=\\frac{\\log 193}{\\log 5}\\approx 3{,}27$.', 'If both sides can be written as powers of the same base, set the exponents equal: $3^{x^{2}-5}=81=3^{4}$, $x^{2}-5=4$, $x=\\pm 3$; $2^{x+1}=\\frac{1}{8}=2^{-3}$, $x=-4$. If several powers are added together, take out a common factor: in $2^{x}+2^{x+3}=36$, $2^{x+3}=8\\cdot 2^{x}$, so $9\\cdot 2^{x}=36$, $2^{x}=4$, $x=2$; $4^{x}+4^{x+2}=272$: $17\\cdot 4^{x}=272$, $4^{x}=16$, $x=2$. If there is no common base, use logarithms: $5^{x}=193$, $x=\\frac{\\log 193}{\\log 5}\\approx 3{,}27$.'
        ),
        problem: say('Ebatzi $3^{x+1}+3^{x}=108$.', 'Resuelve $3^{x+1}+3^{x}=108$.', 'حل $3^{x+1}+3^{x}=108$.', 'Solve $3^{x+1}+3^{x}=108$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$3^{x+1}=3\\cdot 3^{x}$.', '$3^{x+1}=3\\cdot 3^{x}$.', '$3^{x+1}=3\\cdot 3^{x}$.', '$3^{x+1}=3\\cdot 3^{x}$.'), math: same('$4\\cdot 3^{x}=108$') },
            { text: say('Bakartu.', 'Aísla.', 'اعزل.', 'Isolate.'), math: same('$3^{x}=27=3^{3}$') },
            { text: say('Ebazpena.', 'La solución.', 'الحل.', 'The solution.'), math: same('$x=3$') }
        ],
        example: same('$2^{x}=2^{5}\\to x=5$'),
        takeaway: say('Oinarri bera → berretzaileak berdindu. Bestela, logaritmoak.', 'Misma base → iguala exponentes. Si no, logaritmos.', 'الأساس نفسه ← ساوِ الأسس. وإلا فاللوغاريتمات.', 'Same base → equate the exponents. If not, use logarithms.'),
        figure: (language) => <ExponentialFigure language={language} />
    },
    {
        id: 'logarithmic',
        stage: 'exponential',
        title: say('Ekuazio logaritmikoak', 'Ecuaciones logarítmicas', 'المعادلات اللوغاريتمية', 'Logarithmic equations'),
        goal: say('Logaritmoak dituzten ekuazioak definizioarekin eta propietateekin ebaztea eta ebazpenak egiaztatzea.', 'Resolver ecuaciones con logaritmos usando la definición y las propiedades, y comprobar las soluciones.', 'حل المعادلات اللوغاريتمية بالتعريف والخصائص والتحقق من الحلول.', 'Solve equations with logarithms using the definition and the properties, and check the solutions.'),
        explanation: say(
            'Logaritmo bakarra badago, definizioa: $\\log_a A=k$ bada, $A=a^{k}$. $\\log_2 (2x-1)=3$: $2x-1=8$, $x=\\frac{9}{2}$. $\\log (x-2)=2$: $x-2=100$, $x=102$. Logaritmo bat baino gehiago badaude, propietateekin bakarra bihurtu bi aldeetan, eta berdindu argumentuak: $\\log x+\\log (x-3)=1$ ekuazioan $\\log [x(x-3)]=\\log 10$, $x^{2}-3x-10=0$, $x=5$ edo $x=-2$. Baina $\\log (-2)$ ez dago: $x=5$ bakarrik. $2\\log x=\\log (5x-6)$: $x^{2}=5x-6$, $x=2$ eta $x=3$, biak baliozkoak. Argumentu guztiek positiboak izan behar dute.',
            'Si hay un solo logaritmo, la definición: si $\\log_a A=k$, entonces $A=a^{k}$. $\\log_2 (2x-1)=3$: $2x-1=8$, $x=\\frac{9}{2}$. $\\log (x-2)=2$: $x-2=100$, $x=102$. Si hay varios logaritmos, con las propiedades se deja uno solo en cada miembro y se igualan los argumentos: en $\\log x+\\log (x-3)=1$, $\\log [x(x-3)]=\\log 10$, $x^{2}-3x-10=0$, $x=5$ o $x=-2$. Pero $\\log (-2)$ no existe: solo $x=5$. $2\\log x=\\log (5x-6)$: $x^{2}=5x-6$, $x=2$ y $x=3$, las dos valen. Todos los argumentos tienen que ser positivos.',
            'إذا وُجد لوغاريتم واحد فالتعريف: إذا كان $\\log_a A=k$ فإن $A=a^{k}$. $\\log_2 (2x-1)=3$: $2x-1=8$، $x=\\frac{9}{2}$. $\\log (x-2)=2$: $x-2=100$، $x=102$. وإذا وُجدت عدة لوغاريتمات نترك بالخصائص لوغاريتمًا واحدًا في كل طرف ونساوي ما بداخلهما: في $\\log x+\\log (x-3)=1$ يكون $\\log [x(x-3)]=\\log 10$، $x^{2}-3x-10=0$، $x=5$ أو $x=-2$. لكن $\\log (-2)$ غير موجود: إذن $x=5$ فقط. $2\\log x=\\log (5x-6)$: $x^{2}=5x-6$، $x=2$ و$x=3$، وكلاهما صالح. يجب أن تكون كل ما بداخل اللوغاريتمات موجبة.', 'If there is a single logarithm, use the definition: if $\\log_a A=k$, then $A=a^{k}$. $\\log_2 (2x-1)=3$: $2x-1=8$, $x=\\frac{9}{2}$. $\\log (x-2)=2$: $x-2=100$, $x=102$. If there are several logarithms, use the properties to leave just one on each side and equate the arguments: in $\\log x+\\log (x-3)=1$, $\\log [x(x-3)]=\\log 10$, $x^{2}-3x-10=0$, $x=5$ or $x=-2$. But $\\log (-2)$ does not exist, so only $x=5$ is valid. $2\\log x=\\log (5x-6)$: $x^{2}=5x-6$, $x=2$ and $x=3$; both are valid. All the arguments must be positive.'
        ),
        problem: say('Ebatzi $\\log_3 (x+1)+\\log_3 (x-1)=1$.', 'Resuelve $\\log_3 (x+1)+\\log_3 (x-1)=1$.', 'حل $\\log_3 (x+1)+\\log_3 (x-1)=1$.', 'Solve $\\log_3 (x+1)+\\log_3 (x-1)=1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkaduraren logaritmoa.', 'Logaritmo del producto.', 'لوغاريتم الجداء.', 'The logarithm of a product.'), math: same('$(x+1)(x-1)=3^{1}$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$x^{2}=4\\ \\to\\ x=\\pm 2$') },
            { text: say('$-2$ ez da baliozkoa.', '$-2$ no vale.', '$-2$ لا يصلح.', '$-2$ does not work.'), math: same('$x=2$') }
        ],
        example: same('$\\log_2 A=3\\to A=8$'),
        takeaway: say('Logaritmo bakarra bi aldeetan; argumentuak positiboak.', 'Un solo logaritmo en cada miembro; argumentos positivos.', 'لوغاريتم واحد في كل طرف؛ وما بداخله موجب.', 'One logarithm on each side; positive arguments.'),
        figure: (language) => <LogEquationFigure language={language} />
    },

    /* ---------- 4. First-degree inequalities ---------- */
    {
        id: 'inequalities',
        stage: 'inequalities',
        title: say('Inekuazioak eta tarteak', 'Inecuaciones e intervalos', 'المتراجحات والمجالات', 'Inequalities and intervals'),
        goal: say('Inekuazio baten ebazpenak ezagutzea eta tarte gisa zenbaki-zuzenean adieraztea.', 'Reconocer las soluciones de una inecuación y expresarlas como intervalo en la recta numérica.', 'التعرّف على حلول متراجحة والتعبير عنها مجالًا على مستقيم الأعداد.', 'Recognise the solutions of an inequality and write them as an interval on the number line.'),
        explanation: say(
            'Inekuazio bat desberdintza bat da ($<$, $>$, $\\le$, $\\ge$) ezezagun batekin. Haren ebazpenak desberdintza egiazkoa egiten duten zenbakiak dira, eta normalean infinitu dira. $x^{2}-8x<12$: 0 ebazpena da ($0<12$), 2 ere bai ($4-16=-12<12$), baina 10 ez ($100-80=20$). Ebazpen-multzoak tarteekin idazten dira: $x\\ge -2$ da $[-2,+\\infty)$; $x<4$ da $(-\\infty,4)$; $-1\\le x<3$ da $[-1,3)$. Kortxeteak muturra sartzen dela adierazten du (puntu betea), eta parentesiak ez dela sartzen (puntu hutsa).',
            'Una inecuación es una desigualdad ($<$, $>$, $\\le$, $\\ge$) con una incógnita. Sus soluciones son los números que hacen cierta la desigualdad, y suelen ser infinitas. $x^{2}-8x<12$: 0 es solución ($0<12$), 2 también ($4-16=-12<12$), pero 10 no ($100-80=20$). El conjunto de soluciones se escribe con intervalos: $x\\ge -2$ es $[-2,+\\infty)$; $x<4$ es $(-\\infty,4)$; $-1\\le x<3$ es $[-1,3)$. El corchete indica que el extremo entra (punto lleno), y el paréntesis, que no entra (punto hueco).',
            'المتراجحة متباينة ($<$ أو $>$ أو $\\le$ أو $\\ge$) فيها مجهول. وحلولها الأعداد التي تجعل المتباينة صحيحة، وهي عادة لا نهائية. $x^{2}-8x<12$: العدد 0 حل ($0<12$)، و2 كذلك ($4-16=-12<12$)، أما 10 فلا ($100-80=20$). وتُكتب مجموعة الحلول بالمجالات: $x\\ge -2$ هي $[-2,+\\infty)$؛ و$x<4$ هي $(-\\infty,4)$؛ و$-1\\le x<3$ هي $[-1,3)$. يدل القوس المعقوف على أن الطرف داخل (نقطة ممتلئة)، والقوس العادي على أنه خارج (نقطة فارغة).', 'An inequality is a comparison ($<$, $>$, $\\le$, $\\ge$) that contains an unknown. Its solutions are the numbers that make the comparison true, and there are usually infinitely many. $x^{2}-8x<12$: 0 is a solution ($0<12$), 2 is too ($4-16=-12<12$), but 10 is not ($100-80=20$). The set of solutions is written as intervals: $x\\ge -2$ is $[-2,+\\infty)$; $x<4$ is $(-\\infty,4)$; $-1\\le x<3$ is $[-1,3)$. The square bracket means the end is included (filled dot), and the round bracket means it is not (open dot).'
        ),
        problem: say('$-5$, 0, 2 eta 10 zenbakietatik, zein dira $x^{2}-8x<12$ inekuazioaren ebazpenak?', 'De los números $-5$, 0, 2 y 10, ¿cuáles son soluciones de $x^{2}-8x<12$?', 'من الأعداد $-5$ و0 و2 و10، أيها حلول للمتراجحة $x^{2}-8x<12$؟', 'Which of the numbers $-5$, 0, 2 and 10 are solutions of $x^{2}-8x<12$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$-5$: ez.', '$-5$: no.', '$-5$: لا.', '$-5$: no.'), math: same('$25+40=65>12$') },
            { text: say('0 eta 2: bai.', '0 y 2: sí.', '0 و2: نعم.', '0 and 2: yes.'), math: same('$0<12,\\ \\ 4-16=-12<12$') },
            { text: say('10: ez.', '10: no.', '10: لا.', '10: no.'), math: same('$100-80=20>12$') }
        ],
        example: same('$x\\ge -2:\\ [-2,+\\infty)$'),
        takeaway: say('[ ]: muturra sartzen da; ( ): ez. ∞ beti parentesiarekin.', '[ ]: el extremo entra; ( ): no. ∞ siempre con paréntesis.', '[ ]: الطرف داخل؛ ( ): خارج. و∞ دائمًا بقوس عادي.', '[ ]: the end is included; ( ): it is not. ∞ always gets a round bracket.'),
        figure: (language) => <IntervalsFigure language={language} />
    },
    {
        id: 'linear-inequality',
        stage: 'inequalities',
        title: say('Lehen mailako inekuazioak ebaztea', 'Resolver inecuaciones de primer grado', 'حل متراجحات الدرجة الأولى', 'Solve first-degree inequalities'),
        goal: say('Lehen mailako inekuazioak ekuazioak bezala ebaztea, negatibo batez biderkatzean zentzua aldatuz.', 'Resolver inecuaciones de primer grado como las ecuaciones, cambiando el sentido al multiplicar por un negativo.', 'حل متراجحات الدرجة الأولى كالمعادلات مع قلب الاتجاه عند الضرب في عدد سالب.', 'Solve first-degree inequalities like equations, reversing the inequality sign when you multiply by a negative.'),
        explanation: say(
            'Ekuazio bat bezala ebazten da: parentesiak eta izendatzaileak kendu, gaiak aldatu eta bakandu. Arau bakarra desberdina da: bi aldeak zenbaki negatibo batez biderkatu edo zatitzen badira, desberdintzaren zentzua aldatzen da ($3<5$ baina $-3>-5$). $2x+4\\ge 0$: $x\\ge -2$, $[-2,+\\infty)$. $-2x+7>\\frac{x}{2}-3$: bider 2, $-4x+14>x-6$, $-5x>-20$, eta $-5$-ez zatitzean, $x<4$: $(-\\infty,4)$. Zentzua ez aldatzeko, gaiak beste aldera eraman daitezke: $20>5x$, $4>x$.',
            'Se resuelve como una ecuación: quitar paréntesis y denominadores, pasar términos y despejar. Solo hay una regla distinta: si se multiplican o dividen los dos miembros por un número negativo, cambia el sentido de la desigualdad ($3<5$ pero $-3>-5$). $2x+4\\ge 0$: $x\\ge -2$, $[-2,+\\infty)$. $-2x+7>\\frac{x}{2}-3$: por 2, $-4x+14>x-6$, $-5x>-20$, y al dividir entre $-5$, $x<4$: $(-\\infty,4)$. Para no cambiar el sentido se pueden pasar los términos al otro lado: $20>5x$, $4>x$.',
            'تُحل كالمعادلة: نزيل الأقواس والمقامات وننقل الحدود ونعزل المجهول. وهناك قاعدة واحدة مختلفة: إذا ضُرب الطرفان أو قُسما على عدد سالب انقلب اتجاه المتباينة ($3<5$ لكن $-3>-5$). $2x+4\\ge 0$: $x\\ge -2$، $[-2,+\\infty)$. $-2x+7>\\frac{x}{2}-3$: في 2، $-4x+14>x-6$، $-5x>-20$، وعند القسمة على $-5$ يصير $x<4$: $(-\\infty,4)$. ولتجنّب قلب الاتجاه يمكن نقل الحدود إلى الطرف الآخر: $20>5x$، $4>x$.', 'Solve it like an equation: remove brackets and denominators, move terms across, and solve for the unknown. There is only one different rule: if you multiply or divide both sides by a negative number, the inequality sign reverses ($3<5$ but $-3>-5$). $2x+4\\ge 0$: $x\\ge -2$, $[-2,+\\infty)$. $-2x+7>\\frac{x}{2}-3$: multiplying by 2, $-4x+14>x-6$, $-5x>-20$, and dividing by $-5$, $x<4$: $(-\\infty,4)$. To avoid reversing the sign, you can move the terms to the other side instead: $20>5x$, $4>x$.'
        ),
        problem: say('Ebatzi $\\frac{x-1}{2}-\\frac{x+3}{3}\\ge 1$.', 'Resuelve $\\frac{x-1}{2}-\\frac{x+3}{3}\\ge 1$.', 'حل $\\frac{x-1}{2}-\\frac{x+3}{3}\\ge 1$.', 'Solve $\\frac{x-1}{2}-\\frac{x+3}{3}\\ge 1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bider 6.', 'Por 6.', 'في 6.', 'Multiply by 6.'), math: same('$3(x-1)-2(x+3)\\ge 6$') },
            { text: say('Laburtu.', 'Reduce.', 'بسّط.', 'Simplify.'), math: same('$x-9\\ge 6$') },
            { text: say('Ebazpena.', 'La solución.', 'الحل.', 'The solution.'), math: same('$x\\ge 15:\\ [15,+\\infty)$') }
        ],
        example: same('$-2x>6\\to x<-3$'),
        takeaway: say('Ekuazio bat bezala, baina negatibo batez biderkatzean: zentzua aldatu.', 'Como una ecuación, pero al multiplicar por un negativo: cambia el sentido.', 'كالمعادلة، لكن عند الضرب في سالب: اقلب الاتجاه.', 'Like an equation, but when you multiply by a negative, the inequality sign reverses.'),
        figure: (language) => <FlipSignFigure language={language} />
    },
    {
        id: 'inequality-problems',
        stage: 'inequalities',
        title: say('Problemak inekuazioekin', 'Problemas con inecuaciones', 'مسائل بالمتراجحات', 'Problems with inequalities'),
        goal: say('«Gehienez», «gutxienez» edo «ez da iristen» bezalako enuntziatuak inekuazio gisa idaztea eta ebaztea.', 'Escribir y resolver como inecuación enunciados con «como mucho», «al menos» o «no llega a».', 'كتابة وحل عبارات مثل «على الأكثر» و«على الأقل» و«لا يصل إلى» متراجحاتٍ.', 'Write and solve, as inequalities, word problems that use ‘at most’, ‘at least’ or ‘less than’.'),
        explanation: say(
            'Hitzak itzuli: «gutxienez» ($\\ge$), «gehienez» edo «ez du gainditzen» ($\\le$), «ez da iristen» ($<$), «baino gehiago» ($>$). Ebatzi ondoren, begiratu ebazpenek zentzua duten: kopuruak osoak eta ez-negatiboak izan ohi dira. «Futbolera joan naizen aldien hirukoitza gehi 2 ez da 10era iristen»: $3x+2<10$, $x<\\frac{8}{3}$; beraz 0, 1 edo 2 aldiz. «Hirukoiztuta eta 20 € gehiago, gutxienez 110 € izango nituzke»: $3x+20\\ge 110$, $x\\ge 30$. Kontratu batean 20 € hilean eta 0,10 € minutuko, 35 € ez gainditzeko: $20+0{,}1x\\le 35$, $x\\le 150$ minutu.',
            'Traduce las palabras: «al menos» ($\\ge$), «como mucho» o «no supera» ($\\le$), «no llega a» ($<$), «más de» ($>$). Después de resolver, mira si las soluciones tienen sentido: las cantidades suelen ser enteras y no negativas. «El triple de las veces que he ido al fútbol más 2 no llega a 10»: $3x+2<10$, $x<\\frac{8}{3}$; así que 0, 1 o 2 veces. «Si mi dinero se triplicara y me dieran 20 €, tendría al menos 110 €»: $3x+20\\ge 110$, $x\\ge 30$. En una tarifa de 20 € al mes y 0,10 € por minuto, para no pasar de 35 €: $20+0{,}1x\\le 35$, $x\\le 150$ minutos.',
            'ترجم الكلمات: «على الأقل» ($\\ge$)، «على الأكثر» أو «لا يتجاوز» ($\\le$)، «لا يصل إلى» ($<$)، «أكثر من» ($>$). وبعد الحل انظر هل للحلول معنى: الكميات عادة صحيحة وغير سالبة. «ثلاثة أمثال عدد مرات ذهابي إلى الملعب زائد 2 لا يصل إلى 10»: $3x+2<10$، $x<\\frac{8}{3}$؛ أي 0 أو 1 أو 2 مرات. «لو تضاعف مالي ثلاث مرات وأُعطيت 20 € لكان عندي 110 € على الأقل»: $3x+20\\ge 110$، $x\\ge 30$. وفي عرض بـ20 € شهريًا و0,10 € للدقيقة، كي لا نتجاوز 35 €: $20+0{,}1x\\le 35$، $x\\le 150$ دقيقة.', 'Translate the words: ‘at least’ ($\\ge$), ‘at most’ or ‘does not exceed’ ($\\le$), ‘less than’ ($<$), ‘more than’ ($>$). After solving, check whether the solutions make sense: the quantities are usually whole numbers and not negative. ‘Three times the number of times I have been to football, plus 2, is less than 10’: $3x+2<10$, $x<\\frac{8}{3}$; so 0, 1 or 2 times. ‘If my money tripled and I were given €20, I would have at least €110’: $3x+20\\ge 110$, $x\\ge 30$. On a plan of €20 per month and €0.10 per minute, so as not to go over €35: $20+0{,}1x\\le 35$, $x\\le 150$ minutes.'
        ),
        problem: say('Ikasgela batean 28 ikasle daude. Txango baterako autobusak 400 € balio du, eta sarrera bakoitzak 6 €. Zenbat ordaindu behar du ikasle bakoitzak gutxienez, kostua estaltzeko? Biribildu euroetara.', 'En una clase hay 28 alumnos. Para una excursión, el autobús cuesta 400 € y cada entrada 6 €. ¿Cuánto debe pagar como mínimo cada alumno para cubrir el coste? Redondea a euros.', 'في صف 28 طالبًا. لرحلة يكلف الحافلة 400 € وكل تذكرة 6 €. كم يجب أن يدفع كل طالب على الأقل لتغطية التكلفة؟ قرّب إلى اليورو.', 'There are 28 students in a class. For a trip, the bus costs €400 and each ticket costs €6. What is the minimum amount each student must pay to cover the cost? Round to whole euros.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Inekuazioa.', 'La inecuación.', 'المتراجحة.', 'The inequality.'), math: same('$28x\\ge 400+28\\cdot 6$') },
            { text: say('Bakandu.', 'Despeja.', 'اعزل.', 'Solve for x.'), math: same('$x\\ge \\frac{568}{28}\\approx 20{,}29$') },
            { text: say('Euroetan, gutxienez 21 €.', 'En euros, al menos 21 €.', 'باليورو، 21 € على الأقل.', 'In euros, at least €21.'), math: same('$28\\cdot 21=588\\ge 568$') }
        ],
        example: same('$3x+2<10$'),
        takeaway: say('Gutxienez ≥, gehienez ≤; begiratu ebazpenek zentzua duten.', 'Al menos ≥, como mucho ≤; mira si las soluciones tienen sentido.', 'على الأقل ≥، على الأكثر ≤؛ وانظر هل للحلول معنى.', 'At least ≥, at most ≤; check whether the solutions make sense.'),
        figure: (language) => <ProblemStepsFigure language={language} />
    },

    /* ---------- 5. Second-degree inequalities and systems ---------- */
    {
        id: 'quadratic-inequality',
        stage: 'quadratic-inequalities',
        title: say('Bigarren mailako inekuazioak', 'Inecuaciones de segundo grado', 'متراجحات الدرجة الثانية', 'Second-degree inequalities'),
        goal: say('Bigarren mailako inekuazioak erroekin eta zeinuekin ebaztea.', 'Resolver inecuaciones de segundo grado con las raíces y los signos.', 'حل متراجحات الدرجة الثانية بالجذور والإشارات.', 'Solve second-degree inequalities using the roots and the signs.'),
        explanation: say(
            'Eraman dena alde batera: $ax^{2}+bx+c<0$ (edo $>$, $\\le$, $\\ge$). Kalkulatu erroak: zuzena zatitan banatzen dute, eta zati bakoitzean polinomioaren zeinua ez da aldatzen; nahikoa da zati bakoitzeko zenbaki bat probatzea. $a>0$ bada, parabola gora irekita dago: negatiboa erroen artean, positiboa kanpoan. $x^{2}-2x-3\\le 0$: erroak $-1$ eta 3, beraz $[-1,3]$. $x^{2}-2x-3>0$: $(-\\infty,-1)\\cup(3,+\\infty)$. Errorik ez badago, zeinua beti bera da: $x^{2}+1>0$ beti betetzen da, eta $x^{2}+1<0$ inoiz ez.',
            'Pasa todo a un miembro: $ax^{2}+bx+c<0$ (o $>$, $\\le$, $\\ge$). Calcula las raíces: parten la recta en trozos, y en cada trozo el signo del polinomio no cambia; basta probar un número de cada trozo. Si $a>0$, la parábola está abierta hacia arriba: negativa entre las raíces, positiva fuera. $x^{2}-2x-3\\le 0$: raíces $-1$ y 3, así que $[-1,3]$. $x^{2}-2x-3>0$: $(-\\infty,-1)\\cup(3,+\\infty)$. Si no hay raíces, el signo es siempre el mismo: $x^{2}+1>0$ se cumple siempre, y $x^{2}+1<0$ nunca.',
            'انقل كل شيء إلى طرف: $ax^{2}+bx+c<0$ (أو $>$ أو $\\le$ أو $\\ge$). احسب الجذور: تقسم المستقيم إلى أجزاء، وفي كل جزء لا تتغير إشارة الحدودية؛ ويكفي تجريب عدد من كل جزء. إذا كان $a>0$ فالقطع المكافئ مفتوح إلى الأعلى: سالب بين الجذرين وموجب خارجهما. $x^{2}-2x-3\\le 0$: الجذران $-1$ و3، إذن $[-1,3]$. $x^{2}-2x-3>0$: $(-\\infty,-1)\\cup(3,+\\infty)$. وإذا لم توجد جذور فالإشارة ثابتة: $x^{2}+1>0$ صحيحة دائمًا و$x^{2}+1<0$ أبدًا.', 'Move everything to one side: $ax^{2}+bx+c<0$ (or $>$, $\\le$, $\\ge$). Work out the roots: they split the number line into pieces, and within each piece the sign of the polynomial does not change, so it is enough to test one number from each piece. If $a>0$, the parabola opens upwards: negative between the roots, positive outside them. $x^{2}-2x-3\\le 0$: roots $-1$ and 3, so $[-1,3]$. $x^{2}-2x-3>0$: $(-\\infty,-1)\\cup(3,+\\infty)$. If there are no roots, the sign is always the same: $x^{2}+1>0$ is always true, and $x^{2}+1<0$ is never true.'
        ),
        problem: say('Ebatzi $x^{2}-x-6>0$.', 'Resuelve $x^{2}-x-6>0$.', 'حل $x^{2}-x-6>0$.', 'Solve $x^{2}-x-6>0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erroak.', 'Las raíces.', 'الجذور.', 'The roots.'), math: same('$x=\\frac{1\\pm 5}{2}=3,\\ -2$') },
            { text: say('Probatu 0: $-6<0$, erdian negatiboa.', 'Prueba 0: $-6<0$, negativo en medio.', 'جرّب 0: $-6<0$، سالب في الوسط.', 'Try 0: $-6<0$, negative in the middle.'), math: same('$+\\ \\ -\\ \\ +$') },
            { text: say('Kanpoko zatiak.', 'Los trozos de fuera.', 'الجزآن الخارجيان.', 'The outer pieces.'), math: same('$(-\\infty,-2)\\cup(3,+\\infty)$') }
        ],
        example: same('$x^{2}-4<0:\\ (-2,2)$'),
        takeaway: say('Erroak, zatiak eta zeinuak; $A>0$: erroen artean negatiboa.', 'Raíces, trozos y signos; $A>0$: negativo entre las raíces.', 'الجذور والأجزاء والإشارات؛ $A>0$: سالب بين الجذرين.', 'Roots, pieces and signs; $A>0$: negative between the roots.'),
        figure: (language) => <QuadraticSignFigure language={language} />
    },
    {
        id: 'graphic-inequality',
        stage: 'quadratic-inequalities',
        title: say('Inekuazioak grafikoki', 'Inecuaciones gráficamente', 'المتراجحات بيانيًا', 'Inequalities graphically'),
        goal: say('Inekuazio bat bi funtzioren grafikoak konparatuz ebaztea.', 'Resolver una inecuación comparando las gráficas de dos funciones.', 'حل متراجحة بمقارنة منحنيي دالتين.', 'Solve an inequality by comparing the graphs of two functions.'),
        explanation: say(
            '$f(x)<g(x)$ ebaztea f-ren grafikoa g-renaren azpian dagoen x-ak bilatzea da. Mugak ebaki-puntuak dira, $f(x)=g(x)$ ekuazioaren ebazpenak. $y=x^{2}-5x+4$ eta $y=x-1$: $x^{2}-5x+4=x-1$, $x^{2}-6x+5=0$, $x=1$ eta $x=5$; parabola zuzenaren azpian dago tartean, beraz $x^{2}-5x+4<x-1$ betetzen da $(1,5)$ tartean. $x^{2}-5x+4\\le -2$: parabola $y=-2$ zuzenaren azpian edo gainean, $x^{2}-5x+6\\le 0$, $[2,3]$. $3x>9$ ere grafikoki: $y=3x-9$ zuzena ardatzaren gainean dago $x>3$ denean.',
            'Resolver $f(x)<g(x)$ es buscar los x en los que la gráfica de f está por debajo de la de g. Los extremos son los puntos de corte, las soluciones de $f(x)=g(x)$. $y=x^{2}-5x+4$ e $y=x-1$: $x^{2}-5x+4=x-1$, $x^{2}-6x+5=0$, $x=1$ y $x=5$; entre ellas la parábola está por debajo de la recta, así que $x^{2}-5x+4<x-1$ se cumple en $(1,5)$. $x^{2}-5x+4\\le -2$: la parábola por debajo o sobre la recta $y=-2$, $x^{2}-5x+6\\le 0$, $[2,3]$. También $3x>9$ gráficamente: la recta $y=3x-9$ está por encima del eje para $x>3$.',
            'حل $f(x)<g(x)$ هو البحث عن قيم x التي يكون فيها منحنى f تحت منحنى g. والأطراف نقاط التقاطع، أي حلول $f(x)=g(x)$. $y=x^{2}-5x+4$ و$y=x-1$: $x^{2}-5x+4=x-1$، $x^{2}-6x+5=0$، $x=1$ و$x=5$؛ وبينهما يقع القطع المكافئ تحت المستقيم، إذن $x^{2}-5x+4<x-1$ صحيحة في $(1,5)$. $x^{2}-5x+4\\le -2$: القطع تحت المستقيم $y=-2$ أو عليه، $x^{2}-5x+6\\le 0$، $[2,3]$. وكذلك $3x>9$ بيانيًا: المستقيم $y=3x-9$ فوق المحور عندما $x>3$.', 'Solving $f(x)<g(x)$ means finding the x-values where the graph of f is below the graph of g. The endpoints are the crossing points, the solutions of $f(x)=g(x)$. $y=x^{2}-5x+4$ and $y=x-1$: $x^{2}-5x+4=x-1$, $x^{2}-6x+5=0$, $x=1$ and $x=5$; between them the parabola is below the straight line, so $x^{2}-5x+4<x-1$ holds on $(1,5)$. $x^{2}-5x+4\\le -2$: the parabola is below or on the straight line $y=-2$, $x^{2}-5x+6\\le 0$, $[2,3]$. Also, $3x>9$ graphically: the straight line $y=3x-9$ is above the x-axis for $x>3$.'
        ),
        problem: say('Ebatzi $x^{2}-5x+4\\le -2$.', 'Resuelve $x^{2}-5x+4\\le -2$.', 'حل $x^{2}-5x+4\\le -2$.', 'Solve $x^{2}-5x+4\\le -2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebaki-puntuak.', 'Puntos de corte.', 'نقاط التقاطع.', 'Crossing points.'), math: same('$x^{2}-5x+6=0\\ \\to\\ x=2,\\ x=3$') },
            { text: say('Parabola azpian 2 eta 3 artean.', 'La parábola queda debajo entre 2 y 3.', 'القطع تحت المستقيم بين 2 و3.', 'The parabola is below the straight line between 2 and 3.'), math: same('$[2,3]$') }
        ],
        example: same('$f(x)<g(x)$'),
        takeaway: say('$F<G$: f-ren grafikoa g-renaren azpian; mugak, ebaki-puntuak.', '$F<G$: la gráfica de f debajo de la de g; extremos, los cortes.', '$F<G$: منحنى f تحت منحنى g؛ والأطراف نقاط التقاطع.', '$F<G$: the graph of f is below the graph of g; the endpoints are the crossing points.'),
        figure: (language) => <GraphicInequalityFigure language={language} />
    },
    {
        id: 'inequality-systems',
        stage: 'quadratic-inequalities',
        title: say('Inekuazio-sistemak', 'Sistemas de inecuaciones', 'أنظمة المتراجحات', 'Systems of inequalities'),
        goal: say('Ezezagun bateko inekuazio-sistemak ebaztea ebazpen-tarteen ebakidura hartuz.', 'Resolver sistemas de inecuaciones con una incógnita tomando la intersección de los intervalos solución.', 'حل أنظمة متراجحات بمجهول واحد بأخذ تقاطع مجالات الحلول.', 'Solve systems of inequalities with one unknown by taking the intersection of the solution intervals.'),
        explanation: say(
            'Inekuazio bakoitza bere aldetik ebazten da, eta sistemaren ebazpena bi ebazpen-multzoek komunean dutena da (ebakidura). $3x-1>5$ eta $x+4\\le 10$: $x>2$ eta $x\\le 6$, beraz $(2,6]$. $2x+4\\ge 0$ eta $5-x>1$: $x\\ge -2$ eta $x<4$, $[-2,4)$. Zati komunik ez badago, sistemak ez du ebazpenik: $x>5$ eta $x<1$. Zuzen berean marraztea da modurik onena: goian bat, behean bestea, eta beherago zati komuna. Bigarren mailako inekuazio bat sistemaren barruan egon daiteke: $x^{2}-4\\le 0$ eta $x>0$: $(0,2]$.',
            'Cada inecuación se resuelve por separado, y la solución del sistema es lo que tienen en común los dos conjuntos de soluciones (la intersección). $3x-1>5$ y $x+4\\le 10$: $x>2$ y $x\\le 6$, así que $(2,6]$. $2x+4\\ge 0$ y $5-x>1$: $x\\ge -2$ y $x<4$, $[-2,4)$. Si no hay parte común, el sistema no tiene solución: $x>5$ y $x<1$. Lo mejor es dibujarlas en la misma recta: una arriba, la otra abajo, y más abajo la parte común. Dentro del sistema puede haber una inecuación de segundo grado: $x^{2}-4\\le 0$ y $x>0$: $(0,2]$.',
            'تُحل كل متراجحة على حدة، وحل النظام هو ما تشترك فيه مجموعتا الحلول (التقاطع). $3x-1>5$ و$x+4\\le 10$: $x>2$ و$x\\le 6$، إذن $(2,6]$. $2x+4\\ge 0$ و$5-x>1$: $x\\ge -2$ و$x<4$، $[-2,4)$. وإذا لم يوجد جزء مشترك فلا حل للنظام: $x>5$ و$x<1$. والأفضل رسمها على المستقيم نفسه: واحدة فوق والأخرى تحتها، وتحتهما الجزء المشترك. وقد يحوي النظام متراجحة من الدرجة الثانية: $x^{2}-4\\le 0$ و$x>0$: $(0,2]$.', 'Solve each inequality separately; the solution of the system is what the two solution sets have in common (their intersection). $3x-1>5$ and $x+4\\le 10$: $x>2$ and $x\\le 6$, so $(2,6]$. $2x+4\\ge 0$ and $5-x>1$: $x\\ge -2$ and $x<4$, so $[-2,4)$. If there is no common part, the system has no solution: $x>5$ and $x<1$. It helps to draw them on the same number line, one above the other, with the common part underneath. A system can also include a second-degree inequality: $x^{2}-4\\le 0$ and $x>0$: $(0,2]$.'
        ),
        problem: say('Ebatzi sistema: $2x+4\\ge 0$ eta $5-x>1$.', 'Resuelve el sistema: $2x+4\\ge 0$ y $5-x>1$.', 'حل النظام: $2x+4\\ge 0$ و$5-x>1$.', 'Solve the system: $2x+4\\ge 0$ and $5-x>1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehena.', 'La primera.', 'الأولى.', 'The first one.'), math: same('$x\\ge -2$') },
            { text: say('Bigarrena.', 'La segunda.', 'الثانية.', 'The second one.'), math: same('$4>x$') },
            { text: say('Ebakidura.', 'La intersección.', 'التقاطع.', 'The intersection.'), math: same('$[-2,4)$') }
        ],
        example: same('$(2,+\\infty)\\cap(-\\infty,6]$'),
        takeaway: say('Bakoitza bere aldetik, eta gero zati komuna.', 'Cada una por separado, y luego la parte común.', 'كل واحدة على حدة، ثم الجزء المشترك.', 'Each one separately, and then the common part.'),
        figure: (language) => <IntervalIntersectionFigure language={language} />
    }
]

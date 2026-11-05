import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { DenominatorsFigure, DiscriminantFigure, ProblemStepsFigure, ZeroProductFigure } from '../dbh2-ekuazioak-v2/figures'
import { AreaProblemFigure, EqualizationFigure, FactoredFigure, LinearSolutionsFigure, QuadraticFormulaFigure, RadicalFigure, ReductionFigure, SolutionCountFigure, SubstitutionFigure, SystemProblemFigure, SystemTypesFigure } from './figures'
import { equationsSystemsLessonChecks, type EquationsSystemsTopicId } from './lessonChecks'
import { equationsSystemsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Ekuazioak eta sistemak · 4. DBH aplikatuak — stages and lessons. Follows
   the class textbook (Santillana Aplicadas 4, unit 4 «Ecuaciones y
   sistemas»: first- and second-degree equations, systems of two linear
   equations and their methods, problems) and Anaya Aplicadas 4, units 6
   «Ecuaciones» (equations with brackets and denominators, complete and
   incomplete quadratics, factored and radical equations, problems with
   mixtures, ages and rectangles) and 7 «Sistemas de ecuaciones» (linear
   equations with two unknowns, the three kinds of systems seen as lines,
   substitution, equalisation and reduction, problems).
   ========================================================================== */

export type EquationsSystemsStageId = 'first-degree' | 'quadratic' | 'other' | 'systems' | 'methods'

export const equationsSystemsStages: UnitStage[] = [
    { id: 'first-degree', tone: 'blue', title: { eu: 'Lehen mailako ekuazioak', es: 'Ecuaciones de primer grado', en: 'First-degree equations', ar: 'معادلات الدرجة الأولى' } },
    { id: 'quadratic', tone: 'violet', title: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', en: 'Second-degree equations', ar: 'معادلات الدرجة الثانية' } },
    { id: 'other', tone: 'mustard', title: { eu: 'Beste ekuazio batzuk', es: 'Otras ecuaciones', en: 'Other equations', ar: 'معادلات أخرى' } },
    { id: 'systems', tone: 'coral', title: { eu: 'Ekuazio-sistemak', es: 'Sistemas de ecuaciones', en: 'Systems of equations', ar: 'أنظمة المعادلات' } },
    { id: 'methods', tone: 'green', title: { eu: 'Metodoak eta problemak', es: 'Métodos y problemas', en: 'Methods and problems', ar: 'الطرق والمسائل' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. First-degree equations ---------- */
    {
        id: 'brackets',
        stage: 'first-degree',
        needs: [{ unit: 'dbh4-aplikatuak/polinomios', topic: 'simplify', title: { eu: 'Ekuazioetarako prestatzea', es: 'Preparación para ecuaciones', en: 'Preparing for equations', ar: 'التحضير للمعادلات' } }],
        title: say('Parentesidun ekuazioak', 'Ecuaciones con paréntesis', 'معادلات بأقواس', 'Equations with brackets'),
        goal: say('Lehen mailako ekuazioak parentesiak kenduz ebaztea eta ebazpenik gabekoak eta identitateak ezagutzea.', 'Resolver ecuaciones de primer grado quitando paréntesis y reconocer las que no tienen solución y las identidades.', 'حل معادلات الدرجة الأولى بإزالة الأقواس والتعرّف على المعادلات التي لا حل لها وعلى المتطابقات.', 'Solve linear equations by removing brackets, and recognise the ones with no solution and the identities.'),
        problem: say('Ebatzi $4(2+3x)=10(x-1)+2(x+9)$.', 'Resuelve $4(2+3x)=10(x-1)+2(x+9)$.', 'حلّ $4(2+3x)=10(x-1)+2(x+9)$.', 'Solve $4(2+3x)=10(x-1)+2(x+9)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu parentesiak.', 'Quita paréntesis.', 'أزل الأقواس.', 'Remove the brackets.'), math: same('$8+12x=10x-10+2x+18$') },
            { text: say('Laburtu bi atalak.', 'Reduce los dos miembros.', 'بسّط الطرفين.', 'Simplify both sides.'), math: same('$12x+8=12x+8$') },
            { text: say('x desagertzen da eta $0=0$ geratzen da: identitatea, infinitu ebazpen.', 'La x desaparece y queda $0=0$: identidad, infinitas soluciones.', 'يختفي x ويبقى $0=0$: متطابقة، حلول لا نهاية لها.', 'The x cancels out and you are left with $0=0$: an identity, infinitely many solutions.'), math: same('$0=0$') }
        ],
        takeaway: say('Parentesiak kendu, x-ak atal batera, laburtu eta askatu.', 'Quita paréntesis, las x a un miembro, reduce y despeja.', 'أزل الأقواس، وx إلى طرف، وبسّط واعزل.', 'Remove the brackets, move the x terms to one side, simplify and solve.'),
        figure: (language) => <SolutionCountFigure language={language} />
    },
    {
        id: 'denominators',
        stage: 'first-degree',
        title: say('Izendatzailedun ekuazioak', 'Ecuaciones con denominadores', 'معادلات بمقامات', 'Equations with denominators'),
        goal: say('Izendatzaileak kentzea, gai guztiak izendatzaileen MKTz biderkatuz, eta ekuazioa ebaztea.', 'Quitar denominadores multiplicando todos los términos por el m.c.m. de los denominadores, y resolver la ecuación.', 'إزالة المقامات بضرب كل الحدود في المضاعف المشترك الأصغر للمقامات، وحل المعادلة.', 'Remove the denominators by multiplying all the terms by the LCM of the denominators, and solve the equation.'),
        problem: say('Ebatzi $\\frac{x}{2}-\\frac{x-1}{3}=\\frac{x+3}{6}$.', 'Resuelve $\\frac{x}{2}-\\frac{x-1}{3}=\\frac{x+3}{6}$.', 'حلّ $\\frac{x}{2}-\\frac{x-1}{3}=\\frac{x+3}{6}$.', 'Solve $\\frac{x}{2}-\\frac{x-1}{3}=\\frac{x+3}{6}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('MKT(2, 3, 6) = 6. Biderkatu gai guztiak.', 'm.c.m.(2, 3, 6) = 6. Multiplica todos los términos.', 'م.م.أ(2، 3، 6) = 6. اضرب كل الحدود.', 'LCM(2, 3, 6) = 6. Multiply all the terms.'), math: same('$3x-2(x-1)=x+3$') },
            { text: say('Kendu parentesia: minusak bi zeinuak aldatzen ditu.', 'Quita el paréntesis: el menos cambia los dos signos.', 'أزل القوس: الناقص يغيّر الإشارتين.', 'Remove the bracket: the minus sign changes both signs.'), math: same('$3x-2x+2=x+3$') },
            { text: say('x desagertzen da: ez dago ebazpenik.', 'La x desaparece: no hay solución.', 'يختفي x: لا حل.', 'The x cancels out: there is no solution.'), math: same('$2=3$') }
        ],
        takeaway: say('Biderkatu gai GUZTIAK MKTz; zenbakitzailea parentesi artean.', 'Multiplica TODOS los términos por el m.c.m.; el numerador, entre paréntesis.', 'اضرب كل الحدود في المضاعف؛ والبسط بين قوسين.', 'Multiply ALL the terms by the LCM; put the numerator in brackets.'),
        figure: (language) => <DenominatorsFigure language={language} />
    },
    {
        id: 'linear-problems',
        stage: 'first-degree',
        needs: [{ unit: 'dbh3/ecuaciones-sistemas', topic: 'equation-problems', title: { eu: 'Problemak ekuazioekin', es: 'Problemas con ecuaciones', en: 'Problems with equations', ar: 'مسائل بالمعادلات' } }],
        title: say('Lehen mailako problemak', 'Problemas de primer grado', 'مسائل من الدرجة الأولى', 'Problems with linear equations'),
        goal: say('Adin, diru eta nahasketa problemak ekuazio baten bidez planteatzea eta ebaztea.', 'Plantear y resolver con una ecuación problemas de edades, dinero y mezclas.', 'صياغة مسائل الأعمار والمال والخلائط بمعادلة وحلّها.', 'Set up and solve problems about ages, money and mixtures using an equation.'),
        problem: say('Adelaren aurrezkiak Beatrizenen bost aldiz dira. Adelak Beatrizi 800 € emanez gero, hirukoitza bakarrik izango lirateke. Zenbat ditu Beatrizek?', 'Los ahorros de Adela quintuplican los de su hermana Beatriz, pero si Adela le diera 800 €, solo serían el triple. ¿Cuánto tiene Beatriz?', 'مدخرات أديلا خمسة أضعاف مدخرات أختها بياتريث، ولو أعطتها أديلا 800 € لصارت ثلاثة أضعافها فقط. كم لدى بياتريث؟', 'Adela\'s savings are five times her sister Beatriz\'s. But if Adela gave Beatriz €800, Adela would only have three times as much as Beatriz. How much does Beatriz have?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Beatriz: x; Adela: $5x$. Transferentziaren ondoren:', 'Beatriz: x; Adela: $5x$. Tras la transferencia:', 'بياتريث: x؛ أديلا: $5x$. بعد التحويل:', 'Beatriz: x; Adela: $5x$. After the transfer:'), math: same('$5x-800=3(x+800)$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$2x=3200\\to x=1600$') },
            { text: say('Beatrizek 1600 € ditu eta Adelak 8000 €.', 'Beatriz tiene 1600 € y Adela 8000 €.', 'لدى بياتريث 1600 € ولدى أديلا 8000 €.', 'Beatriz has €1,600 and Adela has €8,000.'), math: same('$7200=3\\cdot 2400$') }
        ],
        takeaway: say('Ulertu, planteatu, ebatzi eta egiaztatu.', 'Comprende, plantea, resuelve y comprueba.', 'افهم وصُغ وحُلّ وتحقّق.', 'Understand, set up, solve and check.'),
        figure: (language) => <ProblemStepsFigure language={language} />
    },

    /* ---------- 2. Second-degree equations ---------- */
    {
        id: 'incomplete',
        stage: 'quadratic',
        needs: [{ unit: 'dbh4-aplikatuak/polinomios', topic: 'common-factor', title: { eu: 'Faktore komuna eta identitateak', es: 'Factor común e identidades', en: 'Common factor and algebraic identities', ar: 'العامل المشترك والمتطابقات' } }],
        title: say('Ekuazio osatugabeak', 'Ecuaciones incompletas', 'المعادلات الناقصة', 'Incomplete equations'),
        goal: say('$ax^{2}+c=0$ eta $ax^{2}+bx=0$ motako ekuazioak formularik gabe ebaztea.', 'Resolver las ecuaciones del tipo $ax^{2}+c=0$ y $ax^{2}+bx=0$ sin fórmula.', 'حل معادلات من النوع $ax^{2}+c=0$ و$ax^{2}+bx=0$ دون صيغة.', 'Solve equations of the form $ax^{2}+c=0$ and $ax^{2}+bx=0$ without using the formula.'),
        problem: say('Ebatzi $4x^{2}-9=0$ eta $2x^{2}+10x=0$.', 'Resuelve $4x^{2}-9=0$ y $2x^{2}+10x=0$.', 'حلّ $4x^{2}-9=0$ و$2x^{2}+10x=0$.', 'Solve $4x^{2}-9=0$ and $2x^{2}+10x=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu $x^{2}$ eta atera erroa.', 'Despeja $x^{2}$ y haz la raíz.', 'اعزل $x^{2}$ وخذ الجذر.', 'Solve for $x^{2}$ and take the square root.'), math: same('$x^{2}=\\frac{9}{4}\\to x=\\pm\\frac{3}{2}$') },
            { text: say('Atera $2x$ faktore komun gisa.', 'Saca $2x$ factor común.', 'أخرج $2x$ عاملًا مشتركًا.', 'Take $2x$ out as a common factor.'), math: same('$2x(x+5)=0$') },
            { text: say('Faktore bakoitza 0.', 'Cada factor, 0.', 'كل عامل 0.', 'Set each factor to 0.'), math: same('$x=0,\\ x=-5$') }
        ],
        takeaway: say('Ez zatitu x-z: x = 0 ebazpena galtzen da.', 'No dividas entre x: se pierde la solución x = 0.', 'لا تقسم على x: يضيع الحل x = 0.', 'Do not divide by x: you lose the solution x = 0.'),
        figure: (language) => <ZeroProductFigure language={language} />
    },
    {
        id: 'formula',
        stage: 'quadratic',
        needs: [{ unit: 'dbh3/ecuaciones-sistemas', topic: 'formula', title: { eu: 'Formula orokorra', es: 'La fórmula general', en: 'The quadratic formula', ar: 'الصيغة العامة' } }],
        title: say('Formula orokorra', 'La fórmula general', 'الصيغة العامة', 'The quadratic formula'),
        goal: say('Bigarren mailako ekuazio osoak $x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$ formularekin ebaztea.', 'Resolver ecuaciones de segundo grado completas con la fórmula $x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$.', 'حل معادلات الدرجة الثانية الكاملة بالصيغة $x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$.', 'Solve complete quadratic equations using the formula $x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$.'),
        problem: say('Ebatzi $6x^{2}+5x+1=0$.', 'Resuelve $6x^{2}+5x+1=0$.', 'حلّ $6x^{2}+5x+1=0$.', 'Solve $6x^{2}+5x+1=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('a = 6, b = 5, c = 1.', 'a = 6, b = 5, c = 1.', 'a = 6، b = 5، c = 1.', 'a = 6, b = 5, c = 1.'), math: same('$x=\\frac{-5\\pm\\sqrt{25-24}}{12}$') },
            { text: say('Erroa 1 da.', 'La raíz es 1.', 'الجذر 1.', 'The square root is 1.'), math: same('$x=\\frac{-5\\pm 1}{12}$') },
            { text: say('Bi ebazpenak.', 'Las dos soluciones.', 'الحلان.', 'The two solutions.'), math: same('$x_{1}=-\\frac{1}{3},\\ x_{2}=-\\frac{1}{2}$') }
        ],
        takeaway: say('Ordenatu, idatzi a, b eta c zeinuekin, eta aplikatu formula.', 'Ordena, escribe a, b y c con sus signos y aplica la fórmula.', 'رتّب واكتب a وb وc بإشاراتها وطبّق الصيغة.', 'Arrange it, write a, b and c with their signs, and apply the formula.'),
        figure: (language) => <QuadraticFormulaFigure language={language} />
    },
    {
        id: 'discriminant',
        stage: 'quadratic',
        title: say('Diskriminatzailea eta ekuazioak prestatzea', 'Discriminante y ecuaciones con operaciones', 'المميّز والمعادلات مع العمليات', 'Discriminant and equations with operations'),
        goal: say('Ebazpen kopurua $\\Delta=b^{2}-4ac$-rekin aurreikustea eta ekuazioak eragiketak eginez ordenatzea.', 'Prever cuántas soluciones hay con $\\Delta=b^{2}-4ac$ y ordenar ecuaciones que tienen operaciones.', 'توقّع عدد الحلول بـ$\\Delta=b^{2}-4ac$ وترتيب المعادلات التي فيها عمليات.', 'Predict how many solutions there are using $\\Delta=b^{2}-4ac$, and tidy up equations that have operations.'),
        problem: say('Eragiketak egin eta ebatzi: $x(x-5)+x^{2}=(3x-1)(x-1)$.', 'Opera y resuelve: $x(x-5)+x^{2}=(3x-1)(x-1)$.', 'أجرِ العمليات وحلّ: $x(x-5)+x^{2}=(3x-1)(x-1)$.', 'Simplify and solve: $x(x-5)+x^{2}=(3x-1)(x-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Garatu bi atalak.', 'Desarrolla los dos miembros.', 'انشر الطرفين.', 'Expand both sides.'), math: same('$2x^{2}-5x=3x^{2}-4x+1$') },
            { text: say('Dena atal batera.', 'Todo a un miembro.', 'كل شيء إلى طرف.', 'Move everything to one side.'), math: same('$x^{2}+x+1=0$') },
            { text: say('$\\Delta<0$: ez dago ebazpenik.', '$\\Delta<0$: no hay solución.', '$\\Delta<0$: لا حل.', '$\\Delta<0$: there is no solution.'), math: same('$\\Delta=1-4=-3$') }
        ],
        takeaway: say('Δ > 0: bi ebazpen. Δ = 0: bat. Δ < 0: bat ere ez.', 'Δ > 0: dos soluciones. Δ = 0: una. Δ < 0: ninguna.', 'Δ > 0: حلان. Δ = 0: حل. Δ < 0: لا حل.', 'Δ > 0: two solutions. Δ = 0: one. Δ < 0: none.'),
        figure: (language) => <DiscriminantFigure language={language} />
    },

    /* ---------- 3. Other equations ---------- */
    {
        id: 'factored',
        stage: 'other',
        needs: [{ unit: 'dbh4-aplikatuak/polinomios', topic: 'factorize', title: { eu: 'Ruffiniz faktorizatzea', es: 'Factorizar con Ruffini', en: 'Factorising with Ruffini', ar: 'التحليل بروفيني' } }],
        title: say('Ekuazio faktorizatuak', 'Ecuaciones factorizadas', 'المعادلات المحلَّلة', 'Factorised equations'),
        goal: say('Biderkadura bat zero den ekuazioak faktore bakoitza zero eginez ebaztea.', 'Resolver ecuaciones en las que un producto vale cero igualando a cero cada factor.', 'حل المعادلات التي يساوي فيها جداء صفرًا بجعل كل عامل صفرًا.', 'Solve equations in which a product equals zero by setting each factor to zero.'),
        problem: say('Ebatzi $(2x+1)(x^{2}+5x-24)=0$.', 'Resuelve $(2x+1)(x^{2}+5x-24)=0$.', 'حلّ $(2x+1)(x^{2}+5x-24)=0$.', 'Solve $(2x+1)(x^{2}+5x-24)=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen faktorea 0.', 'Primer factor, 0.', 'العامل الأول 0.', 'First factor = 0.'), math: same('$2x+1=0\\to x=-\\frac{1}{2}$') },
            { text: say('Bigarrena 0: formula.', 'El segundo, 0: fórmula.', 'الثاني 0: الصيغة.', 'The second one = 0: use the formula.'), math: same('$x=\\frac{-5\\pm 11}{2}$') },
            { text: say('Hiru ebazpen.', 'Tres soluciones.', 'ثلاثة حلول.', 'Three solutions.'), math: same('$x=-\\frac{1}{2},\\ x=3,\\ x=-8$') }
        ],
        takeaway: say('Biderkadura = 0 bada, faktore bakoitza 0 egin.', 'Si un producto = 0, iguala a 0 cada factor.', 'إذا كان الجداء = 0 فاجعل كل عامل 0.', 'If a product = 0, set each factor equal to 0.'),
        figure: (language) => <FactoredFigure language={language} />
    },
    {
        id: 'radical',
        stage: 'other',
        needs: [{ unit: 'dbh4-aplikatuak/polinomios', topic: 'identities', title: { eu: 'Identitate nabarmenak', es: 'Igualdades notables', en: 'Remarkable identities', ar: 'المتطابقات الشهيرة' } }],
        title: say('Ekuazio irrazionalak', 'Ecuaciones con radicales', 'المعادلات الجذرية', 'Equations with radicals'),
        goal: say('x erro karratu baten barruan duten ekuazioak ebaztea eta ebazpenak egiaztatzea.', 'Resolver ecuaciones con la x dentro de una raíz cuadrada y comprobar las soluciones.', 'حل المعادلات التي يكون فيها x تحت جذر تربيعي والتحقق من الحلول.', 'Solve equations with x inside a square root, and check the solutions.'),
        problem: say('Ebatzi $\\sqrt{x+1}+5=x$.', 'Resuelve $\\sqrt{x+1}+5=x$.', 'حلّ $\\sqrt{x+1}+5=x$.', 'Solve $\\sqrt{x+1}+5=x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Utzi erroa bakarrik eta jaso karratura.', 'Aísla la raíz y eleva al cuadrado.', 'اعزل الجذر وربّع.', 'Isolate the root and square both sides.'), math: same('$x+1=x^{2}-10x+25$') },
            { text: say('Ordenatu eta ebatzi.', 'Ordena y resuelve.', 'رتّب وحلّ.', 'Arrange and solve.'), math: same('$x^{2}-11x+24=0\\to x=8,\\ x=3$') },
            { text: say('Egiaztatu: x = 3 faltsua da ($2+5\\neq 3$). Ebazpena: $x=8$.', 'Comprueba: x = 3 es falsa ($2+5\\neq 3$). Solución: $x=8$.', 'تحقّق: x = 3 زائف ($2+5\\neq 3$). الحل: $x=8$.', 'Check: x = 3 is false ($2+5\\neq 3$). Solution: $x=8$.'), math: same('$\\sqrt{9}+5=8$') }
        ],
        takeaway: say('Erroa bakarrik utzi, karratura jaso eta egiaztatu beti.', 'Aísla la raíz, eleva al cuadrado y comprueba siempre.', 'اعزل الجذر وربّع وتحقّق دائمًا.', 'Isolate the root, square both sides, and always check.'),
        figure: (language) => <RadicalFigure language={language} />
    },
    {
        id: 'quadratic-problems',
        stage: 'other',
        title: say('Bigarren mailako problemak', 'Problemas de segundo grado', 'مسائل من الدرجة الثانية', 'Quadratic word problems'),
        goal: say('Bigarren mailako ekuazio batera daramaten problemak ebaztea eta zentzurik ez duten ebazpenak baztertzea.', 'Resolver problemas que llevan a una ecuación de segundo grado y descartar las soluciones que no tienen sentido.', 'حل المسائل التي تؤدي إلى معادلة من الدرجة الثانية واستبعاد الحلول التي لا معنى لها.', 'Solve problems that lead to a quadratic equation, and rule out the solutions that do not make sense.'),
        problem: say('Gela laukizuzen bat zabalera baino 3 m luzeagoa da eta haren azalera 40 m² da. Zenbat da zabalera?', 'Una sala rectangular es 3 m más larga que ancha y su área es 40 m². ¿Cuánto mide de ancho?', 'قاعة مستطيلة طولها يزيد على عرضها بـ3 م ومساحتها 40 م². كم عرضها؟', 'A rectangular room is 3 m longer than it is wide, and its area is 40 m². How wide is it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zabalera x, luzera $x+3$.', 'Ancho x, largo $x+3$.', 'العرض x والطول $x+3$.', 'Width x, length $x+3$.'), math: same('$x(x+3)=40$') },
            { text: say('Formula.', 'Fórmula.', 'الصيغة.', 'Formula'), math: same('$x=\\frac{-3\\pm 13}{2}$') },
            { text: say('$x=-8$ baztertu: zabalera 5 m da.', 'Se descarta $x=-8$: el ancho es 5 m.', 'نستبعد $x=-8$: العرض 5 م.', '$x=-8$ is ruled out: the width is 5 m.'), math: same('$5\\cdot 8=40$') }
        ],
        takeaway: say('Planteatu, ebatzi eta baztertu zentzurik gabeko ebazpenak.', 'Plantea, resuelve y descarta las soluciones sin sentido.', 'صُغ وحُلّ واستبعد الحلول التي لا معنى لها.', 'Set up, solve and rule out the solutions that do not make sense.'),
        figure: (language) => <AreaProblemFigure language={language} />
    },

    /* ---------- 4. Systems of equations ---------- */
    {
        id: 'two-unknowns',
        stage: 'systems',
        needs: [{ unit: 'dbh3/ecuaciones-sistemas', topic: 'pairs', title: { eu: 'Bi ezezaguneko ekuazioak', es: 'Ecuaciones con dos incógnitas', en: 'Equations in two unknowns', ar: 'معادلات بمجهولين' } }],
        title: say('Bi ezezaguneko ekuazioak', 'Ecuaciones con dos incógnitas', 'معادلات بمجهولين', 'Equations with two unknowns'),
        goal: say('$ax+by=c$ ekuazio baten ebazpenak aurkitzea eta zuzen baten puntu gisa irudikatzea.', 'Encontrar soluciones de una ecuación $ax+by=c$ y representarlas como puntos de una recta.', 'إيجاد حلول معادلة $ax+by=c$ وتمثيلها نقاطًا على مستقيم.', 'Find solutions of an equation $ax+by=c$ and show them as points on a straight line.'),
        problem: say('$2x+y=10$ ekuazioan, aurkitu y x = 3 denean, eta x y = 0 denean.', 'En la ecuación $2x+y=10$, halla y cuando x = 3, y x cuando y = 0.', 'في المعادلة $2x+y=10$ أوجد y عندما x = 3، وx عندما y = 0.', 'In the equation $2x+y=10$, find y when x = 3, and x when y = 0.'),
        stepsKind: 'steps',
        steps: [
            { text: say('x = 3 ordeztu.', 'Sustituye x = 3.', 'عوّض x = 3.', 'Substitute x = 3.'), math: same('$6+y=10\\to y=4$') },
            { text: say('y = 0 ordeztu.', 'Sustituye y = 0.', 'عوّض y = 0.', 'Substitute y = 0.'), math: same('$2x=10\\to x=5$') },
            { text: say('Bi ebazpen: $(3, 4)$ eta $(5, 0)$.', 'Dos soluciones: $(3, 4)$ y $(5, 0)$.', 'حلان: $(3, 4)$ و$(5, 0)$.', 'Two solutions: $(3, 4)$ and $(5, 0)$.'), math: same('$2\\cdot 3+4=10$') }
        ],
        takeaway: say('Ebazpenak bikoteak dira, eta zuzen bat osatzen dute.', 'Las soluciones son parejas y forman una recta.', 'الحلول أزواج وتشكّل مستقيمًا.', 'The solutions are pairs and form a straight line.'),
        figure: (language) => <LinearSolutionsFigure language={language} />
    },
    {
        id: 'graphic',
        stage: 'systems',
        needs: [{ unit: 'dbh3/ecuaciones-sistemas', topic: 'classify', title: { eu: 'Sistema motak', es: 'Tipos de sistemas', en: 'Types of systems', ar: 'أنواع الأنظمة' } }],
        title: say('Sistemak eta haien grafikoa', 'Sistemas y su gráfica', 'الأنظمة وتمثيلها البياني', 'Systems and their graphs'),
        goal: say('Sistema baten ebazpena bi zuzenen ebaki-puntua dela ulertzea eta sistema motak sailkatzea.', 'Entender que la solución de un sistema es el punto de corte de dos rectas y clasificar los tipos de sistemas.', 'فهم أن حل النظام نقطة تقاطع مستقيمين وتصنيف أنواع الأنظمة.', 'Understand that the solution of a system is the point where two straight lines intersect, and classify the types of system.'),
        problem: say('$(3, 1)$ bikotea $x+2y=5$ eta $2x-y=5$ sistemaren ebazpena al da?', '¿Es $(3, 1)$ solución del sistema $x+2y=5$, $2x-y=5$?', 'هل $(3, 1)$ حل للنظام $x+2y=5$ و$2x-y=5$؟', 'Is $(3, 1)$ a solution of the system $x+2y=5$, $2x-y=5$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen ekuazioa.', 'Primera ecuación.', 'المعادلة الأولى.', 'First equation.'), math: same('$3+2\\cdot 1=5$ ✓') },
            { text: say('Bigarrena.', 'Segunda.', 'الثانية.', 'Second equation.'), math: same('$2\\cdot 3-1=5$ ✓') },
            { text: say('Biak betetzen ditu: bai, ebazpena da; zuzenak $(3, 1)$ puntuan ebakitzen dira.', 'Cumple las dos: sí, es la solución; las rectas se cortan en $(3, 1)$.', 'تحقّق المعادلتين: نعم، هو الحل؛ يتقاطع المستقيمان في $(3, 1)$.', 'It satisfies both: yes, it is the solution; the straight lines intersect at $(3, 1)$.') }
        ],
        takeaway: say('Ebakitzen dira: bat. Paraleloak: bat ere ez. Berdinak: infinitu.', 'Se cortan: una. Paralelas: ninguna. Coinciden: infinitas.', 'متقاطعان: حل. متوازيان: لا حل. منطبقان: ما لا نهاية.', 'They intersect: one. Parallel: none. Coincide: infinitely many.'),
        figure: (language) => <SystemTypesFigure language={language} />
    },
    {
        id: 'substitution',
        stage: 'systems',
        title: say('Ordezkapen-metodoa', 'Método de sustitución', 'طريقة التعويض', 'Substitution method'),
        goal: say('Sistemak ezezagun bat askatuz eta beste ekuazioan ordeztuz ebaztea.', 'Resolver sistemas despejando una incógnita y sustituyéndola en la otra ecuación.', 'حل الأنظمة بعزل مجهول وتعويضه في المعادلة الأخرى.', 'Solve systems by solving for one unknown and substituting it into the other equation.'),
        problem: say('Ebatzi ordezkapenez: $x+3y=5$, $2x-y=3$.', 'Resuelve por sustitución: $x+3y=5$, $2x-y=3$.', 'حلّ بالتعويض: $x+3y=5$ و$2x-y=3$.', 'Solve by substitution: $x+3y=5$, $2x-y=3$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu x lehenengoan.', 'Despeja x en la primera.', 'اعزل x في الأولى.', 'Solve for x in the first equation.'), math: same('$x=5-3y$') },
            { text: say('Ordeztu bigarrenean.', 'Sustituye en la segunda.', 'عوّض في الثانية.', 'Substitute into the second.'), math: same('$2(5-3y)-y=3\\to y=1$') },
            { text: say('Kalkulatu x.', 'Calcula x.', 'احسب x.', 'Work out x.'), math: same('$x=5-3\\cdot 1=2$') }
        ],
        takeaway: say('Askatu, ordeztu parentesi artean, ebatzi eta kalkulatu bestea.', 'Despeja, sustituye entre paréntesis, resuelve y calcula la otra.', 'اعزل، وعوّض بين قوسين، وحُلّ واحسب الآخر.', 'Solve for one unknown, substitute in brackets, solve, and work out the other one.'),
        figure: (language) => <SubstitutionFigure language={language} />
    },

    /* ---------- 5. Methods and problems ---------- */
    {
        id: 'equalization',
        stage: 'methods',
        title: say('Berdinketa-metodoa', 'Método de igualación', 'طريقة المساواة', 'Equating method'),
        goal: say('Sistemak ezezagun bera bi ekuazioetan askatuz eta adierazpenak berdinduz ebaztea.', 'Resolver sistemas despejando la misma incógnita en las dos ecuaciones e igualando las expresiones.', 'حل الأنظمة بعزل المجهول نفسه في المعادلتين ومساواة العبارتين.', 'Solve systems by solving for the same unknown in both equations and equating the expressions.'),
        problem: say('Ebatzi berdinketaz: $y=2x+1$, $y=-x+7$.', 'Resuelve por igualación: $y=2x+1$, $y=-x+7$.', 'حلّ بالمساواة: $y=2x+1$ و$y=-x+7$.', 'Solve by comparison: $y=2x+1$, $y=-x+7$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set them equal.'), math: same('$2x+1=-x+7$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$3x=6\\to x=2$') },
            { text: say('Kalkulatu y.', 'Calcula y.', 'احسب y.', 'Work out y.'), math: same('$y=2\\cdot 2+1=5$') }
        ],
        takeaway: say('Askatu bera bietan, berdindu, ebatzi eta ordeztu.', 'Despeja la misma en las dos, iguala, resuelve y sustituye.', 'اعزل المجهول نفسه في المعادلتين وساوِ وحُلّ وعوّض.', 'Solve for the same unknown in both, equate, solve and substitute.'),
        figure: (language) => <EqualizationFigure language={language} />
    },
    {
        id: 'reduction',
        stage: 'methods',
        title: say('Laburketa-metodoa', 'Método de reducción', 'طريقة الحذف', 'Elimination method'),
        goal: say('Sistemak ekuazioak zenbaki batez biderkatuz eta batuz ezezagun bat desagerrarazita ebaztea.', 'Resolver sistemas multiplicando las ecuaciones por un número y sumándolas para que desaparezca una incógnita.', 'حل الأنظمة بضرب المعادلتين في عدد وجمعهما ليختفي مجهول.', 'Solve systems by multiplying the equations by a number and adding them so that one unknown disappears.'),
        problem: say('Ebatzi laburketaz: $2x+3y=8$, $3x-2y=-1$.', 'Resuelve por reducción: $2x+3y=8$, $3x-2y=-1$.', 'حلّ بالحذف: $2x+3y=8$ و$3x-2y=-1$.', 'Solve by elimination: $2x+3y=8$, $3x-2y=-1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu lehenengoa 2 zenbakiaz eta bigarrena 3 zenbakiaz.', 'Multiplica la primera por 2 y la segunda por 3.', 'اضرب الأولى في 2 والثانية في 3.', 'Multiply the first by 2 and the second by 3.'), math: same('$4x+6y=16,\\ 9x-6y=-3$') },
            { text: say('Batu: y desagertzen da.', 'Suma: la y desaparece.', 'اجمع: يختفي y.', 'Add: the y cancels out.'), math: same('$13x=13\\to x=1$') },
            { text: say('Ordeztu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$2+3y=8\\to y=2$') }
        ],
        takeaway: say('Koefizienteak aurkako bihurtu, batu, ebatzi eta ordeztu.', 'Haz opuestos los coeficientes, suma, resuelve y sustituye.', 'اجعل المعاملين متعاكسين واجمع وحُلّ وعوّض.', 'Make the coefficients opposites, add, solve and substitute.'),
        figure: (language) => <ReductionFigure language={language} />
    },
    {
        id: 'system-problems',
        stage: 'methods',
        title: say('Problemak sistemekin', 'Problemas con sistemas', 'مسائل بالأنظمة', 'Problems with systems'),
        goal: say('Bi ezezaguneko problemak sistema baten bidez planteatzea eta ebaztea.', 'Plantear y resolver con un sistema problemas con dos incógnitas.', 'صياغة مسائل بمجهولين بنظام وحلّها.', 'Set up and solve problems with two unknowns using a system.'),
        problem: say('Aparkaleku batean autoak eta motoak daude: 25 ibilgailu eta 80 gurpil. Zenbat auto daude?', 'En un aparcamiento hay coches y motos: 25 vehículos y 80 ruedas. ¿Cuántos coches hay?', 'في موقف سيارات وفيه سيارات ودراجات نارية: 25 مركبة و80 عجلة. كم سيارة؟', 'In a car park there are cars and motorbikes: 25 vehicles and 80 wheels. How many cars are there?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Autoak x, motoak y.', 'Coches x, motos y.', 'السيارات x والدراجات y.', 'Cars x, motorbikes y.'), math: same('$x+y=25,\\ 4x+2y=80$') },
            { text: say('Ordeztu $y=25-x$.', 'Sustituye $y=25-x$.', 'عوّض $y=25-x$.', 'Substitute $y=25-x$.'), math: same('$4x+50-2x=80\\to x=15$') },
            { text: say('15 auto eta 10 moto.', '15 coches y 10 motos.', '15 سيارة و10 دراجات.', '15 cars and 10 motorbikes.'), math: same('$60+20=80$') }
        ],
        takeaway: say('Bi ezezagun, bi baldintza, bi ekuazio.', 'Dos incógnitas, dos condiciones, dos ecuaciones.', 'مجهولان، شرطان، معادلتان.', 'Two unknowns, two conditions, two equations.'),
        figure: (language) => <SystemProblemFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const equationsSystemsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...equationsSystemsLessonTexts[topic.id as EquationsSystemsTopicId], ...equationsSystemsLessonChecks[topic.id as EquationsSystemsTopicId] }))

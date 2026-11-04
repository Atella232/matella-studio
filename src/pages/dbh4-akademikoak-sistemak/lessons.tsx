import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { EqualizationFigure, LinearSolutionsFigure, ReductionFigure, SubstitutionFigure, SystemProblemFigure, SystemTypesFigure } from '../dbh4-aplikatuak-ekuazioak/figures'
import {
    CoefficientsFigure,
    HalfPlaneFigure,
    HyperbolaFigure,
    LineCircleFigure,
    NonlinearProblemFigure,
    RegionFigure,
    RegionProblemFigure,
    SimplifyFirstFigure,
    SquaresReductionFigure
} from './figures'
import { systemsLessonChecks, type SystemsTopicId } from './lessonChecks'
import { systemsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Sistemak · 4. DBH akademikoak — stages and lessons, following Santillana
   4.º Académicas unit 5 (systems solved graphically and classified, the
   three methods, systems with brackets and denominators, non-linear
   systems with squares, products, fractions and roots, inequalities in
   two unknowns and their systems, and problems: coins, two numbers, x² −
   y²) and the systems part of Anaya 4.º Académicas unit 3 (x + 5y = 7,
   3x − 5y = −26, 22x + 17y = 49, x − y = 15 with xy = 100, x² + y² = 41
   with x² − y² = 9). It builds on the systems of 4. DBH aplikatuak and
   goes further: the coefficient test and parameters, non-linear systems,
   and half-planes and regions.
   ========================================================================== */

export type SystemsStageId = 'linear' | 'methods' | 'nonlinear' | 'half-planes' | 'problems'

export const systemsStages: UnitStage[] = [
    { id: 'linear', tone: 'blue', title: { eu: 'Sistema linealak', es: 'Sistemas lineales', en: 'Linear systems', ar: 'الأنظمة الخطية' } },
    { id: 'methods', tone: 'violet', title: { eu: 'Ebazteko metodoak', es: 'Métodos de resolución', en: 'Solution methods', ar: 'طرق الحل' } },
    { id: 'nonlinear', tone: 'mustard', title: { eu: 'Sistema ez-linealak', es: 'Sistemas no lineales', en: 'Non-linear systems', ar: 'الأنظمة غير الخطية' } },
    { id: 'half-planes', tone: 'coral', title: { eu: 'Bi ezezaguneko inekuazioak', es: 'Inecuaciones con dos incógnitas', en: 'Inequalities with two unknowns', ar: 'متراجحات بمجهولين' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Linear systems ---------- */
    {
        id: 'linear-equations',
        stage: 'linear',
        title: say('Bi ezezaguneko ekuazio linealak', 'Ecuaciones lineales con dos incógnitas', 'المعادلات الخطية بمجهولين', 'Linear equations with two unknowns'),
        goal: say('$ax+by=c$ ekuazio baten ebazpenak aurkitzea eta zuzen batean irudikatzea.', 'Encontrar soluciones de una ecuación $ax+by=c$ y representarlas en una recta.', 'إيجاد حلول معادلة $ax+by=c$ وتمثيلها بمستقيم.', 'Find solutions of an equation $ax+by=c$ and plot them on a straight line.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'pairs', title: { eu: 'Bi ezezaguneko ekuazioak', es: 'Ecuaciones con dos incógnitas', en: 'Equations in two unknowns', ar: 'معادلات بمجهولين' } }
        ],
        problem: say('k-ren zein baliotarako da $(2,k)$ bikotea $3x-2y=8$ ekuazioaren ebazpena?', '¿Para qué valor de k es $(2,k)$ solución de $3x-2y=8$?', 'لأي قيمة لـ k يكون $(2,k)$ حلًّا للمعادلة $3x-2y=8$؟', 'For what value of k is $(2,k)$ a solution of $3x-2y=8$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu $x=2$ eta $y=k$.', 'Sustituye $x=2$ e $y=k$.', 'عوّض $x=2$ و$y=k$.', 'Substitute $x=2$ and $y=k$.'), math: same('$6-2k=8$') },
            { text: say('Askatu k.', 'Despeja k.', 'اعزل k.', 'Solve for k.'), math: same('$-2k=2\\ \\to\\ k=-1$') }
        ],
        takeaway: say('$ax+by=c$: infinitu ebazpen, zuzen bat.', '$ax+by=c$: infinitas soluciones, una recta.', '$ax+by=c$: حلول لا نهاية لها، مستقيم.', '$ax+by=c$: infinitely many solutions, one straight line.'),
        figure: (language) => <LinearSolutionsFigure language={language} />
    },
    {
        id: 'graphic',
        stage: 'linear',
        title: say('Ebazpen grafikoa', 'Resolución gráfica', 'الحل البياني', 'Graphical solution'),
        goal: say('Sistema bat bi zuzen marraztuz ebaztea eta zenbat ebazpen dituen ikustea.', 'Resolver un sistema dibujando sus dos rectas y ver cuántas soluciones tiene.', 'حل نظام برسم مستقيميه ورؤية عدد حلوله.', 'Solve a system by drawing its two straight lines and seeing how many solutions it has.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'graphic', title: { eu: 'Ebazpen grafikoa', es: 'Resolución gráfica', en: 'Solving graphically', ar: 'الحل البياني' } }
        ],
        problem: say('Ebatzi grafikoki $2x+y=7$ eta $x-y=-1$. Zenbat da y?', 'Resuelve gráficamente $2x+y=7$ y $x-y=-1$. ¿Cuánto vale y?', 'حل بيانيًا $2x+y=7$ و$x-y=-1$. كم تساوي y؟', 'Solve graphically $2x+y=7$ and $x-y=-1$. What is y?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen zuzenaren bi puntu.', 'Dos puntos de la primera recta.', 'نقطتان من المستقيم الأول.', 'Two points on the first straight line.'), math: same('$(0,7),\\ (2,3)$') },
            { text: say('Bigarrenaren bi puntu.', 'Dos puntos de la segunda.', 'نقطتان من الثاني.', 'Two points on the second straight line.'), math: same('$(0,1),\\ (2,3)$') },
            { text: say('Ebaki-puntua.', 'El punto de corte.', 'نقطة التقاطع.', 'The meeting point.'), math: same('$(2,3)\\ \\to\\ y=3$') }
        ],
        takeaway: say('Ebazpena: bi zuzenen ebaki-puntua.', 'La solución: el punto de corte de las dos rectas.', 'الحل: نقطة تقاطع المستقيمين.', 'The solution: the point where the two straight lines meet.'),
        figure: (language) => <SystemTypesFigure language={language} />
    },
    {
        id: 'classify',
        stage: 'linear',
        title: say('Koefizienteekin sailkatzea', 'Clasificar con los coeficientes', 'التصنيف بالمعاملات', 'Classify using the coefficients'),
        goal: say('Sistema bat marraztu gabe sailkatzea eta parametro baten balioa aurkitzea.', 'Clasificar un sistema sin dibujarlo y hallar el valor de un parámetro.', 'تصنيف نظام دون رسمه وإيجاد قيمة وسيط.', 'Classify a system without drawing it and find the value of a parameter.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'classify', title: { eu: 'Sistema motak', es: 'Tipos de sistemas', en: 'Types of systems', ar: 'أنواع الأنظمة' } }
        ],
        problem: say('m-ren zein baliotarako du infinitu ebazpen $2x-3y=1$, $4x+my=2$ sistemak?', '¿Para qué valor de m tiene infinitas soluciones el sistema $2x-3y=1$, $4x+my=2$?', 'لأي قيمة لـ m يكون للنظام $2x-3y=1$ و$4x+my=2$ حلول لا نهاية لها؟', 'For what value of m does the system $2x-3y=1$, $4x+my=2$ have infinitely many solutions?'),
        stepsKind: 'steps',
        steps: [
            { text: say('a eta c-ren zatidurak.', 'Los cocientes de a y de c.', 'نسبتا a وc.', 'The ratios of a and c.'), math: same('$\\frac{2}{4}=\\frac{1}{2}$') },
            { text: say('b-rena ere berdina izan behar da.', 'El de b también tiene que ser igual.', 'ويجب أن تساويهما نسبة b.', 'The ratio of b must also be equal.'), math: same('$\\frac{-3}{m}=\\frac{1}{2}\\ \\to\\ m=-6$') }
        ],
        takeaway: say('$\\frac{a}{a\'}=\\frac{b}{b\'}$: paraleloak edo zuzen bera.', '$\\frac{a}{a\'}=\\frac{b}{b\'}$: paralelas o la misma recta.', '$\\frac{a}{a\'}=\\frac{b}{b\'}$: متوازيان أو مستقيم واحد.', '$\\frac{a}{a\'}=\\frac{b}{b\'}$: parallel lines or the same straight line.'),
        figure: (language) => <CoefficientsFigure language={language} />
    },

    /* ---------- 2. Methods ---------- */
    {
        id: 'substitution',
        stage: 'methods',
        title: say('Ordezkapen-metodoa', 'Método de sustitución', 'طريقة التعويض', 'Substitution method'),
        goal: say('Ezezagun bat ekuazio batean askatu eta bestean ordeztuz sistemak ebaztea.', 'Resolver sistemas despejando una incógnita en una ecuación y sustituyéndola en la otra.', 'حل الأنظمة بعزل مجهول في معادلة وتعويضه في الأخرى.', 'Solve systems by solving for one unknown in one equation and substituting it into the other.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'substitution', title: { eu: 'Ordezkapen metodoa', es: 'Método de sustitución', en: 'The substitution method', ar: 'طريقة التعويض' } }
        ],
        problem: say('Ebatzi ordezkapenez $x-2y=1$ eta $3x+y=17$.', 'Resuelve por sustitución $x-2y=1$ y $3x+y=17$.', 'حل بالتعويض $x-2y=1$ و$3x+y=17$.', 'Solve by substitution $x-2y=1$ and $3x+y=17$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu x lehenengoan.', 'Despeja x en la primera.', 'اعزل x في الأولى.', 'Solve for x in the first equation.'), math: same('$x=2y+1$') },
            { text: say('Ordeztu bigarrenean.', 'Sustituye en la segunda.', 'عوّض في الثانية.', 'Substitute into the second.'), math: same('$3(2y+1)+y=17\\ \\to\\ y=2$') },
            { text: say('Kalkulatu x.', 'Calcula x.', 'احسب x.', 'Work out x.'), math: same('$x=2\\cdot 2+1=5$') }
        ],
        takeaway: say('Askatu, ordeztu, ebatzi eta egiaztatu.', 'Despeja, sustituye, resuelve y comprueba.', 'اعزل وعوّض وحلّ وتحقّق.', 'Solve for one unknown, substitute, solve and check.'),
        figure: (language) => <SubstitutionFigure language={language} />
    },
    {
        id: 'equalization',
        stage: 'methods',
        title: say('Berdinketa-metodoa', 'Método de igualación', 'طريقة المساواة', 'Equating method'),
        goal: say('Ezezagun bera bi ekuazioetan askatu eta adierazpenak berdinduz sistemak ebaztea.', 'Resolver sistemas despejando la misma incógnita en las dos ecuaciones e igualando las expresiones.', 'حل الأنظمة بعزل المجهول نفسه في المعادلتين ومساواة العبارتين.', 'Solve systems by solving for the same unknown in both equations and setting the expressions equal.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'equalisation', title: { eu: 'Berdinketa metodoa', es: 'Método de igualación', en: 'The equalisation method', ar: 'طريقة المساواة' } }
        ],
        problem: say('Ebatzi berdinketaz $x=2y+1$ eta $x=7-y$.', 'Resuelve por igualación $x=2y+1$ y $x=7-y$.', 'حل بالمساواة $x=2y+1$ و$x=7-y$.', 'Solve by equating $x=2y+1$ and $x=7-y$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set them equal.'), math: same('$2y+1=7-y$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$3y=6\\ \\to\\ y=2$') },
            { text: say('Kalkulatu x.', 'Calcula x.', 'احسب x.', 'Work out x.'), math: same('$x=7-2=5$') }
        ],
        takeaway: say('Ezezagun bera bietan askatu eta berdindu.', 'Despeja la misma incógnita en las dos e iguala.', 'اعزل المجهول نفسه في الاثنتين وساوِ.', 'Solve both equations for the same unknown and set them equal.'),
        figure: (language) => <EqualizationFigure language={language} />
    },
    {
        id: 'reduction',
        stage: 'methods',
        title: say('Laburketa-metodoa', 'Método de reducción', 'طريقة الحذف', 'Elimination method'),
        goal: say('Ekuazioak zenbakiz biderkatu eta batuz ezezagun bat desagerraraztea.', 'Multiplicar las ecuaciones por números y sumarlas para eliminar una incógnita.', 'ضرب المعادلتين في أعداد وجمعهما لحذف مجهول.', 'Multiply the equations by numbers and add them to eliminate an unknown.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'elimination', title: { eu: 'Laburketa metodoa', es: 'Método de reducción', en: 'The elimination method', ar: 'طريقة الحذف' } }
        ],
        problem: say('Ebatzi laburketaz $2x+3y=12$ eta $5x-2y=11$.', 'Resuelve por reducción $2x+3y=12$ y $5x-2y=11$.', 'حل بالحذف $2x+3y=12$ و$5x-2y=11$.', 'Solve by elimination $2x+3y=12$ and $5x-2y=11$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehena bider 2, bigarrena bider 3.', 'La primera por 2, la segunda por 3.', 'الأولى في 2 والثانية في 3.', 'Multiply the first by 2 and the second by 3.'), math: same('$4x+6y=24,\\ \\ 15x-6y=33$') },
            { text: say('Batu.', 'Suma.', 'اجمع.', 'Add.'), math: same('$19x=57\\ \\to\\ x=3$') },
            { text: say('Kalkulatu y.', 'Calcula y.', 'احسب y.', 'Work out y.'), math: same('$6+3y=12\\ \\to\\ y=2$') }
        ],
        takeaway: say('Koefizienteak aurkakoak egin eta batu.', 'Haz opuestos los coeficientes y suma.', 'اجعل المعاملين متعاكسين واجمع.', 'Make the coefficients opposites and add.'),
        figure: (language) => <ReductionFigure language={language} />
    },
    {
        id: 'simplify-first',
        stage: 'methods',
        title: say('Parentesiak eta izendatzaileak', 'Paréntesis y denominadores', 'الأقواس والمقامات', 'Brackets and denominators'),
        goal: say('Ekuazioak $ax+by=c$ moduan idaztea sistema ebatzi aurretik.', 'Escribir las ecuaciones en la forma $ax+by=c$ antes de resolver el sistema.', 'كتابة المعادلتين على الصورة $ax+by=c$ قبل حل النظام.', 'Write the equations in the form $ax+by=c$ before solving the system.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'denominators', title: { eu: 'Izendatzaileak dituzten ekuazioak', es: 'Ecuaciones con denominadores', en: 'Equations with denominators', ar: 'معادلات بمقامات' } }
        ],
        problem: say('Ebatzi $\\frac{x}{2}+\\frac{y}{3}=4$ eta $2(x-y)=x-4$.', 'Resuelve $\\frac{x}{2}+\\frac{y}{3}=4$ y $2(x-y)=x-4$.', 'حل $\\frac{x}{2}+\\frac{y}{3}=4$ و$2(x-y)=x-4$.', 'Solve $\\frac{x}{2}+\\frac{y}{3}=4$ and $2(x-y)=x-4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehena bider 6.', 'La primera por 6.', 'الأولى في 6.', 'Multiply the first equation by 6.'), math: same('$3x+2y=24$') },
            { text: say('Bigarrena, parentesirik gabe.', 'La segunda, sin paréntesis.', 'الثانية دون أقواس.', 'The second one, without brackets.'), math: same('$x-2y=-4$') },
            { text: say('Batu.', 'Suma.', 'اجمع.', 'Add.'), math: same('$4x=20\\ \\to\\ x=5,\\ y=\\frac{9}{2}$') }
        ],
        takeaway: say('Lehenik $ax+by=c$, gero metodoa.', 'Primero $ax+by=c$, después el método.', 'أولًا $ax+by=c$، ثم الطريقة.', 'First write $ax+by=c$, then use the method.'),
        figure: (language) => <SimplifyFirstFigure language={language} />
    },

    /* ---------- 3. Non-linear systems ---------- */
    {
        id: 'line-curve',
        stage: 'nonlinear',
        title: say('Lehen mailakoa eta bigarren mailakoa', 'Una de primer grado y otra de segundo', 'معادلة من الدرجة الأولى وأخرى من الثانية', 'One linear and one quadratic'),
        goal: say('Ekuazio bat lineala eta bestea bigarren mailakoa duten sistemak ordezkapenez ebaztea.', 'Resolver por sustitución sistemas con una ecuación lineal y otra de segundo grado.', 'حل أنظمة فيها معادلة خطية وأخرى من الدرجة الثانية بالتعويض.', 'Solve, by substitution, systems with one linear equation and one quadratic equation.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'quadratic-formula', title: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', en: 'Second-degree equations', ar: 'معادلات الدرجة الثانية' } }
        ],
        problem: say('Ebatzi $y=x^{2}-1$ eta $y=x+1$. Zein da y-ren baliorik handiena?', 'Resuelve $y=x^{2}-1$ e $y=x+1$. ¿Cuál es el mayor valor de y?', 'حل $y=x^{2}-1$ و$y=x+1$. ما أكبر قيمة لـ y؟', 'Solve $y=x^{2}-1$ and $y=x+1$. What is the largest value of y?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set them equal.'), math: same('$x^{2}-1=x+1\\ \\to\\ x^{2}-x-2=0$') },
            { text: say('Bi x.', 'Dos x.', 'قيمتان لـ x.', 'Two x-values.'), math: same('$x=2,\\ x=-1$') },
            { text: say('Haien y-ak.', 'Sus y.', 'قيمتا y.', 'Their y-values.'), math: same('$(2,3),\\ (-1,0)\\ \\to\\ y=3$') }
        ],
        takeaway: say('Askatu linealean eta ordeztu: bi ebazpen gehienez.', 'Despeja en la lineal y sustituye: como mucho dos soluciones.', 'اعزل في الخطية وعوّض: حلّان على الأكثر.', 'Solve for one unknown in the linear equation and substitute: at most two solutions.'),
        figure: (language) => <LineCircleFigure language={language} />
    },
    {
        id: 'squares',
        stage: 'nonlinear',
        title: say('Karratuak laburketaz', 'Cuadrados por reducción', 'المربعات بالحذف', 'Squares by elimination'),
        goal: say('$x^{2}$ eta $y^{2}$ dituzten sistemak laburketaz ebaztea eta ebazpen guztiak idaztea.', 'Resolver por reducción sistemas con $x^{2}$ e $y^{2}$ y escribir todas las soluciones.', 'حل أنظمة فيها $x^{2}$ و$y^{2}$ بالحذف وكتابة كل الحلول.', 'Solve, by elimination, systems with $x^{2}$ and $y^{2}$, and write all the solutions.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'biquadratic', title: { eu: 'Ekuazio bikarratuak', es: 'Ecuaciones bicuadradas', en: 'Biquadratic equations', ar: 'المعادلات الثنائية التربيع' } }
        ],
        problem: say('Zenbat ebazpen ditu $x^{2}+y^{2}=13$, $x^{2}-y^{2}=5$ sistemak?', '¿Cuántas soluciones tiene el sistema $x^{2}+y^{2}=13$, $x^{2}-y^{2}=5$?', 'كم حلًّا للنظام $x^{2}+y^{2}=13$ و$x^{2}-y^{2}=5$؟', 'How many solutions does the system $x^{2}+y^{2}=13$, $x^{2}-y^{2}=5$ have?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu.', 'Suma.', 'اجمع.', 'Add.'), math: same('$2x^{2}=18\\ \\to\\ x=\\pm 3$') },
            { text: say('Kalkulatu y.', 'Calcula y.', 'احسب y.', 'Work out y.'), math: same('$9+y^{2}=13\\ \\to\\ y=\\pm 2$') },
            { text: say('Konbinatu zeinuak: lau.', 'Combina los signos: cuatro.', 'اجمع الإشارات: أربعة.', 'Combine the signs: four.'), math: same('$(\\pm 3,\\pm 2)$') }
        ],
        takeaway: say('$x^{2}=k$: $x=\\pm\\sqrt{k}$; zeinu guztiak konbinatu.', '$x^{2}=k$: $x=\\pm\\sqrt{k}$; combina todos los signos.', '$x^{2}=k$: $x=\\pm\\sqrt{k}$؛ اجمع كل الإشارات.', '$x^{2}=k$: $x=\\pm\\sqrt{k}$; combine all the signs.'),
        figure: (language) => <SquaresReductionFigure language={language} />
    },
    {
        id: 'check-solutions',
        stage: 'nonlinear',
        title: say('Biderkadurak, zatikiak eta erroak', 'Productos, fracciones y raíces', 'الجداءات والكسور والجذور', 'Products, fractions and roots'),
        goal: say('$xy$, zatikiak edo erroak dituzten sistemak ebaztea eta ebazpen faltsuak baztertzea.', 'Resolver sistemas con $xy$, fracciones o raíces y descartar las soluciones falsas.', 'حل أنظمة فيها $xy$ أو كسور أو جذور واستبعاد الحلول الزائفة.', 'Solve systems with $xy$, fractions or roots and reject the false solutions.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'rational', title: { eu: 'Ekuazio arrazionalak', es: 'Ecuaciones racionales', en: 'Rational equations', ar: 'المعادلات الكسرية' } },
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'radical', title: { eu: 'Ekuazio irrazionalak', es: 'Ecuaciones irracionales', en: 'Radical equations', ar: 'المعادلات الجذرية' } }
        ],
        problem: say('Ebatzi $x+y=5$ eta $xy=6$. Zein da x-ren baliorik handiena?', 'Resuelve $x+y=5$ y $xy=6$. ¿Cuál es el mayor valor de x?', 'حل $x+y=5$ و$xy=6$. ما أكبر قيمة لـ x؟', 'Solve $x+y=5$ and $xy=6$. What is the largest value of x?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu eta ordeztu.', 'Despeja y sustituye.', 'اعزل وعوّض.', 'Solve for one unknown and substitute.'), math: same('$y=5-x\\ \\to\\ x(5-x)=6$') },
            { text: say('Bigarren mailakoa.', 'La de segundo grado.', 'معادلة الدرجة الثانية.', 'The quadratic one.'), math: same('$x^{2}-5x+6=0\\ \\to\\ x=2,\\ x=3$') },
            { text: say('Ebazpenak.', 'Las soluciones.', 'الحلول.', 'The solutions.'), math: same('$(2,3),\\ (3,2)\\ \\to\\ x=3$') }
        ],
        takeaway: say('Erroak edo zatikiak: egiaztatu ebazpen bakoitza.', 'Raíces o fracciones: comprueba cada solución.', 'جذور أو كسور: تحقّق من كل حل.', 'With roots or fractions: check each solution.'),
        figure: (language) => <HyperbolaFigure language={language} />
    },

    /* ---------- 4. Inequalities in two unknowns ---------- */
    {
        id: 'half-plane',
        stage: 'half-planes',
        title: say('Bi ezezaguneko inekuazioak', 'Inecuaciones con dos incógnitas', 'المتراجحات بمجهولين', 'Inequalities with two unknowns'),
        goal: say('$ax+by\\le c$ moduko inekuazio baten ebazpena erdiplano gisa irudikatzea.', 'Representar la solución de una inecuación $ax+by\\le c$ como un semiplano.', 'تمثيل حل متراجحة $ax+by\\le c$ بنصف مستوى.', 'Show the solution of an inequality $ax+by\\le c$ as a half-plane.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'linear-inequality', title: { eu: 'Lehen mailako inekuazioak ebaztea', es: 'Resolver inecuaciones de primer grado', en: 'Solve first-degree inequalities', ar: 'حل متراجحات الدرجة الأولى' } }
        ],
        problem: say('$(3,-1)$ puntua $2x-3y>8$ inekuazioaren ebazpena al da?', '¿Es el punto $(3,-1)$ solución de $2x-3y>8$?', 'هل النقطة $(3,-1)$ حل للمتراجحة $2x-3y>8$؟', 'Is the point $(3,-1)$ a solution of $2x-3y>8$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$2\\cdot 3-3\\cdot(-1)=6+3=9$') },
            { text: say('Alderatu: bai, ebazpena da.', 'Compara: sí, es solución.', 'قارن: نعم، هي حل.', 'Compare: yes, it is a solution.'), math: same('$9>8$') }
        ],
        takeaway: say('Muga-zuzena eta proba-puntua: erdiplano bat.', 'Recta frontera y punto de prueba: un semiplano.', 'مستقيم حدّي ونقطة اختبار: نصف مستوى.', 'Boundary line and test point: one half-plane.'),
        figure: (language) => <HalfPlaneFigure language={language} />
    },
    {
        id: 'region',
        stage: 'half-planes',
        title: say('Bi ezezaguneko inekuazio-sistemak', 'Sistemas de inecuaciones con dos incógnitas', 'أنظمة المتراجحات بمجهولين', 'Systems of inequalities with two unknowns'),
        goal: say('Inekuazio-sistema baten ebazpena erdiplanoen zati komun gisa irudikatzea eta haren erpinak aurkitzea.', 'Representar la solución de un sistema de inecuaciones como la parte común de los semiplanos y hallar sus vértices.', 'تمثيل حل نظام متراجحات بالجزء المشترك بين أنصاف المستويات وإيجاد رؤوسه.', 'Show the solution of a system of inequalities as the region common to the half-planes, and find its vertices.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'inequality-systems', title: { eu: 'Inekuazio-sistemak', es: 'Sistemas de inecuaciones', en: 'Systems of inequalities', ar: 'أنظمة المتراجحات' } }
        ],
        problem: say('$x+y\\le 4$, $x\\ge 0$, $y\\ge 0$. Zenbat puntu ditu eskualdeak koordenatu osoekin?', '$x+y\\le 4$, $x\\ge 0$, $y\\ge 0$. ¿Cuántos puntos de coordenadas enteras tiene la región?', '$x+y\\le 4$ و$x\\ge 0$ و$y\\ge 0$. كم نقطة إحداثياتها صحيحة في المنطقة؟', '$x+y\\le 4$, $x\\ge 0$, $y\\ge 0$. How many points with integer coordinates does the region have?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Triangelua: $(0,0)$, $(4,0)$, $(0,4)$.', 'El triángulo: $(0,0)$, $(4,0)$, $(0,4)$.', 'المثلث: $(0,0)$ و$(4,0)$ و$(0,4)$.', 'The triangle: $(0,0)$, $(4,0)$, $(0,4)$.'), math: same('$x+y\\le 4$') },
            { text: say('Zutabeka zenbatu.', 'Cuenta por columnas.', 'عُدّ عمودًا عمودًا.', 'Count column by column.'), math: same('$5+4+3+2+1=15$') }
        ],
        takeaway: say('Sistemaren ebazpena: erdiplanoen zati komuna.', 'La solución del sistema: la parte común de los semiplanos.', 'حل النظام: الجزء المشترك بين أنصاف المستويات.', 'The solution of the system: the region common to the half-planes.'),
        figure: (language) => <RegionFigure language={language} />
    },

    /* ---------- 5. Problems ---------- */
    {
        id: 'linear-problems',
        stage: 'problems',
        title: say('Sistema linealen problemak', 'Problemas con sistemas lineales', 'مسائل بالأنظمة الخطية', 'Problems with linear systems'),
        goal: say('Bi ezezaguneko problemak sistema lineal batekin planteatu eta ebaztea.', 'Plantear y resolver problemas con dos incógnitas mediante un sistema lineal.', 'صياغة مسائل بمجهولين وحلها بنظام خطي.', 'Set up and solve problems with two unknowns using a linear system.'),
        needs: [
            { unit: 'dbh3/ecuaciones-sistemas', topic: 'system-problems', title: { eu: 'Problemak sistemekin', es: 'Problemas con sistemas', en: 'Problems with systems', ar: 'مسائل بالأنظمة' } }
        ],
        problem: say('Kontzertu baterako 120 sarrera saldu dira, batzuk 15 €-tan eta besteak 10 €-tan, guztira 1550 €. Zenbat saldu dira 15 €-tan?', 'Para un concierto se han vendido 120 entradas, unas a 15 € y otras a 10 €, por 1 550 € en total. ¿Cuántas se han vendido a 15 €?', 'بيعت لحفلة 120 تذكرة، بعضها بـ15 € والباقي بـ10 €، بمجموع 1550 €. كم تذكرة بيعت بـ15 €؟', 'For a concert, 120 tickets were sold, some at €15 and others at €10, making €1,550 in total. How many were sold at €15?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sistema.', 'El sistema.', 'النظام.', 'The system.'), math: same('$x+y=120,\\ \\ 15x+10y=1550$') },
            { text: say('Lehena bider 10 eta kendu.', 'La primera por 10 y resta.', 'الأولى في 10 ثم اطرح.', 'Multiply the first by 10 and subtract.'), math: same('$5x=350\\ \\to\\ x=70$') },
            { text: say('Egiaztatu.', 'Comprueba.', 'تحقّق.', 'Check it.'), math: same('$70\\cdot 15+50\\cdot 10=1550$') }
        ],
        takeaway: say('Izendatu, idatzi, ebatzi eta egiaztatu testuan.', 'Nombra, escribe, resuelve y comprueba en el enunciado.', 'سمِّ واكتب وحلّ وتحقّق في النص.', 'Name, write, solve and check in the problem.'),
        figure: (language) => <SystemProblemFigure language={language} />
    },
    {
        id: 'nonlinear-problems',
        stage: 'problems',
        title: say('Sistema ez-linealen problemak', 'Problemas con sistemas no lineales', 'مسائل بالأنظمة غير الخطية', 'Problems with non-linear systems'),
        goal: say('Azalerak, Pitagoras edo biderkadurak dituzten problemak sistema ez-lineal batekin ebaztea.', 'Resolver con un sistema no lineal problemas de áreas, de Pitágoras o de productos.', 'حل مسائل المساحات وفيثاغورس والجداءات بنظام غير خطي.', 'Solve problems about areas, Pythagoras\' theorem or products using a non-linear system.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'pythagoras', title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } }
        ],
        problem: say('Laukizuzen baten azalera 48 cm² da eta perimetroa 28 cm. Zenbat neurtzen du alderik luzeenak?', 'Un rectángulo tiene 48 cm² de área y 28 cm de perímetro. ¿Cuánto mide el lado mayor?', 'مستطيل مساحته 48 سم² ومحيطه 28 سم. كم طول ضلعه الأكبر؟', 'A rectangle has an area of 48 cm² and a perimeter of 28 cm. What is the length of the longer side?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sistema.', 'El sistema.', 'النظام.', 'The system.'), math: same('$x+y=14,\\ \\ xy=48$') },
            { text: say('Ordeztu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$x(14-x)=48\\ \\to\\ x^{2}-14x+48=0$') },
            { text: say('Aldeak.', 'Los lados.', 'الضلعان.', 'The sides.'), math: same('$x=8,\\ x=6\\ \\to\\ 8$ cm') }
        ],
        takeaway: say('Pitagoras eta azalerak: sistema ez-lineala.', 'Pitágoras y áreas: un sistema no lineal.', 'فيثاغورس والمساحات: نظام غير خطي.', 'Pythagoras and areas: a non-linear system.'),
        figure: (language) => <NonlinearProblemFigure language={language} />
    },
    {
        id: 'region-problems',
        stage: 'problems',
        title: say('Inekuazioekin problemak', 'Problemas con inecuaciones', 'مسائل بالمتراجحات', 'Problems with inequalities'),
        goal: say('Mugak dituzten egoerak bi ezezaguneko inekuazioekin adieraztea eta aukera posibleak aztertzea.', 'Expresar situaciones con límites mediante inecuaciones con dos incógnitas y estudiar las opciones posibles.', 'التعبير عن مواقف لها حدود بمتراجحات بمجهولين ودراسة الخيارات الممكنة.', 'Express situations with limits using inequalities with two unknowns, and explore the possible options.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'inequality-problems', title: { eu: 'Problemak inekuazioekin', es: 'Problemas con inecuaciones', en: 'Problems with inequalities', ar: 'مسائل بالمتراجحات' } }
        ],
        problem: say('Kamioi batek gehienez 10 tona eraman ditzake, 2 tonako kutxa handiak eta tona bateko kutxa txikiak. 3 kutxa handi badaramatza, gehienez zenbat txiki?', 'Un camión lleva como mucho 10 toneladas, en cajas grandes de 2 toneladas y pequeñas de 1 tonelada. Si lleva 3 grandes, ¿cuántas pequeñas como máximo?', 'تحمل شاحنة 10 أطنان على الأكثر في صناديق كبيرة وزنها طنّان وصغيرة وزنها طن. إذا حملت 3 كبيرة فكم صغيرة على الأكثر؟', 'A lorry can carry at most 10 tonnes, in large boxes of 2 tonnes and small boxes of 1 tonne. If it carries 3 large boxes, what is the greatest number of small boxes it can carry?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Inekuazioa.', 'La inecuación.', 'المتراجحة.', 'The inequality.'), math: same('$2x+y\\le 10$') },
            { text: say('Ordeztu $x=3$.', 'Sustituye $x=3$.', 'عوّض $x=3$.', 'Substitute $x=3$.'), math: same('$6+y\\le 10\\ \\to\\ y\\le 4$') }
        ],
        takeaway: say('Mugak: inekuazioak; kopuru osoak: eskualdeko puntu osoak.', 'Límites: inecuaciones; cantidades enteras: los puntos enteros de la región.', 'الحدود: متراجحات؛ الكميات الصحيحة: النقاط الصحيحة من المنطقة.', 'Limits: inequalities; whole quantities: the integer points of the region.'),
        figure: (language) => <RegionProblemFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const systemsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...systemsLessonTexts[topic.id as SystemsTopicId], ...systemsLessonChecks[topic.id as SystemsTopicId] }))

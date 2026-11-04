import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BalanceFigure } from '../dbh1-aljebra-v2/figures'
import { DenominatorsFigure, DiscriminantFigure, StepsFigure, ZeroProductFigure } from '../dbh2-ekuazioak-v2/figures'
import { AreaProblemFigure, EqualizationFigure, LinearSolutionsFigure, QuadraticFormulaFigure, ReductionFigure, SubstitutionFigure, SystemProblemFigure, SystemTypesFigure } from '../dbh4-aplikatuak-ekuazioak/figures'
import { AgesFigure } from './figures'
import { equations3LessonChecks, type Equations3TopicId } from './lessonChecks'
import { equations3LessonTexts } from './lessonTexts'
import { say, same } from './text'

/* ==========================================================================
   Ekuazioak eta sistemak · 3. DBH — stages and lessons, following
   Santillana 3.º ESO units 6 «Ecuaciones de primer y segundo grado» and 7
   «Sistemas de ecuaciones», and Anaya 3.º ESO units 6 and 7 (same names).
   Every number and context is original: the books only fix the scope and
   the order. Each lesson names its typical mistake.
   ========================================================================== */

export type Equations3StageId = 'linear' | 'quadratic' | 'systems' | 'methods' | 'problems'

export const equations3Stages: UnitStage[] = [
    { id: 'linear', tone: 'blue', title: { eu: 'Lehen mailakoak', es: 'Primer grado', en: 'First degree', ar: 'الدرجة الأولى' } },
    { id: 'quadratic', tone: 'violet', title: { eu: 'Bigarren mailakoak', es: 'Segundo grado', en: 'Second degree', ar: 'الدرجة الثانية' } },
    { id: 'systems', tone: 'mustard', title: { eu: 'Sistemak', es: 'Sistemas', en: 'Systems', ar: 'الأنظمة' } },
    { id: 'methods', tone: 'coral', title: { eu: 'Ebazteko metodoak', es: 'Métodos de resolución', en: 'Methods of solving', ar: 'طرق الحل' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. First degree ---------- */
    {
        id: 'equations',
        stage: 'linear',
        title: say('Ekuazioak eta identitateak', 'Ecuaciones e identidades', 'المعادلات والمتطابقات', 'Equations and identities'),
        goal: say('Ekuazio bat identitate batetik bereiztea eta ekuazio baliokideak lortzea.', 'Distinguir una ecuación de una identidad y obtener ecuaciones equivalentes.', 'التمييز بين المعادلة والمتطابقة والحصول على معادلات مكافئة.', 'Tell an equation from an identity and get equivalent equations.'),
        needs: [{ unit: 'dbh2/ekuazioak', topic: 'elements', title: { eu: 'Elementuak eta ekuazio baliokideak', es: 'Elementos y ecuaciones equivalentes', en: 'Parts of an equation and equivalent equations', ar: 'العناصر والمعادلات المتكافئة' } }],
        problem: same('$5x-4=3x+6$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu $3x$ bi ataletan.', 'Resta $3x$ en los dos miembros.', 'اطرح $3x$ من الطرفين.', 'Subtract $3x$ from both sides.'), math: same('$2x-4=6$') },
            { text: say('Batu 4 bi ataletan.', 'Suma 4 en los dos miembros.', 'أضف 4 إلى الطرفين.', 'Add 4 to both sides.'), math: same('$2x=10$') },
            { text: say('Zatitu bi atalak 2 zenbakiaz.', 'Divide los dos miembros entre 2.', 'اقسم الطرفين على 2.', 'Divide both sides by 2.'), math: same('$x=5$') },
            { text: say('Egiaztatu: bi atalek 21 balio dute.', 'Comprueba: los dos miembros valen 21.', 'تحقّق: قيمة كل طرف 21.', 'Check: both sides are worth 21.'), math: same('$5\\cdot 5-4=3\\cdot 5+6$') }
        ],
        takeaway: say('Bi ataletan gauza bera: $a=b\\Rightarrow a+c=b+c$.', 'Lo mismo en los dos miembros: $a=b\\Rightarrow a+c=b+c$.', 'الشيء نفسه في الطرفين: $a=b\\Rightarrow a+c=b+c$.', 'The same on both sides: $a=b\\Rightarrow a+c=b+c$.'),
        figure: (language) => <BalanceFigure language={language} />
    },
    {
        id: 'brackets',
        stage: 'linear',
        title: say('Parentesiak dituzten ekuazioak', 'Ecuaciones con paréntesis', 'معادلات بأقواس', 'Equations with brackets'),
        goal: say('Parentesiak kendu eta lehen mailako ekuazio bat ebaztea.', 'Quitar paréntesis y resolver una ecuación de primer grado.', 'إزالة الأقواس وحلّ معادلة من الدرجة الأولى.', 'Remove brackets and solve a first-degree equation.'),
        needs: [{ unit: 'dbh2/numeros-enteros', topic: 'brackets', title: { eu: 'Parentesidun batuketak eta kenketak', es: 'Sumas y restas con paréntesis', en: 'Additions and subtractions with brackets', ar: 'الجمع والطرح مع الأقواس' } }],
        problem: same('$3(x-2)-(x-4)=8$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu parentesiak.', 'Quita los paréntesis.', 'أزل الأقواس.', 'Remove the brackets.'), math: same('$3x-6-x+4=8$') },
            { text: say('Laburtu.', 'Reduce.', 'اختصر.', 'Collect like terms.'), math: same('$2x-2=8$') },
            { text: say('Igaro $-2$ beste atalera.', 'Pasa el $-2$ al otro miembro.', 'انقل $-2$ إلى الطرف الآخر.', 'Move the $-2$ to the other side.'), math: same('$2x=10$') },
            { text: say('Bakandu $x$.', 'Despeja $x$.', 'اعزل $x$.', 'Isolate $x$.'), math: same('$x=5$') }
        ],
        takeaway: say('$-(a-b)=-a+b$: zeinu guztiak aldatzen dira.', '$-(a-b)=-a+b$: cambian todos los signos.', '$-(a-b)=-a+b$: تتغيّر كل الإشارات.', '$-(a-b)=-a+b$: every sign changes.'),
        figure: (language) => <StepsFigure language={language} />
    },
    {
        id: 'denominators',
        stage: 'linear',
        title: say('Izendatzaileak dituzten ekuazioak', 'Ecuaciones con denominadores', 'معادلات بمقامات', 'Equations with denominators'),
        goal: say('Izendatzaileak kentzea m.k.t.-az biderkatuz.', 'Quitar denominadores multiplicando por el m.c.m.', 'إزالة المقامات بالضرب في المضاعف المشترك الأصغر.', 'Clear the denominators by multiplying by the LCM.'),
        needs: [{ unit: 'dbh2/divisibilidad', topic: 'lcm', title: { eu: 'Multiplo komunetako txikiena (MKT)', es: 'Mínimo común múltiplo (m.c.m.)', en: 'Least common multiple (LCM)', ar: 'المضاعف المشترك الأصغر (م.م.أ · MKT)' } }],
        problem: same('$\\frac{x}{2}-\\frac{x-1}{3}=2$'),
        stepsKind: 'steps',
        steps: [
            { text: say('m.k.t.$(2,3)=6$. Biderkatu gai guztiak 6 zenbakiaz.', 'm.c.m.$(2,3)=6$. Multiplica todos los términos por 6.', 'م.م.أ.$(2,3)=6$. اضرب كل الحدود في 6.', 'LCM$(2,3)=6$. Multiply every term by 6.'), math: same('$3x-2(x-1)=12$') },
            { text: say('Kendu parentesia.', 'Quita el paréntesis.', 'أزل القوس.', 'Remove the brackets.'), math: same('$3x-2x+2=12$') },
            { text: say('Bakandu $x$.', 'Despeja $x$.', 'اعزل $x$.', 'Isolate $x$.'), math: same('$x=10$') }
        ],
        takeaway: say('m.k.t.-az biderkatu GAI GUZTIAK: $\\frac{a}{b}\\cdot m$.', 'Multiplica por el m.c.m. TODOS los términos: $\\frac{a}{b}\\cdot m$.', 'اضرب كل الحدود في م.م.أ.: $\\frac{a}{b}\\cdot m$.', 'Multiply EVERY term by the LCM: $\\frac{a}{b}\\cdot m$.'),
        figure: (language) => <DenominatorsFigure language={language} />
    },
    /* ---------- 2. Second degree ---------- */
    {
        id: 'incomplete',
        stage: 'quadratic',
        title: say('Bigarren mailako ekuazio osatugabeak', 'Ecuaciones de segundo grado incompletas', 'معادلات الدرجة الثانية الناقصة', 'Incomplete quadratic equations'),
        goal: say('$ax^{2}+c=0$ eta $ax^{2}+bx=0$ ekuazioak formularik gabe ebaztea.', 'Resolver $ax^{2}+c=0$ y $ax^{2}+bx=0$ sin fórmula.', 'حلّ $ax^{2}+c=0$ و$ax^{2}+bx=0$ بلا صيغة.', 'Solve $ax^{2}+c=0$ and $ax^{2}+bx=0$ without the formula.'),
        needs: [{ unit: 'dbh3/polinomios', topic: 'common-factor', title: { eu: 'Faktore komuna atera', es: 'Sacar factor común', en: 'Taking out a common factor', ar: 'إخراج العامل المشترك' } }],
        problem: same('$3x^{2}-48=0$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bakandu $x^{2}$.', 'Despeja $x^{2}$.', 'اعزل $x^{2}$.', 'Isolate $x^{2}$.'), math: same('$x^{2}=48\\div 3=16$') },
            { text: say('Atera erroa, bi zeinuekin.', 'Saca la raíz, con los dos signos.', 'خذ الجذر بالإشارتين.', 'Take the root, with both signs.'), math: same('$x=4,\\ x=-4$') }
        ],
        takeaway: say('$x(ax+b)=0\\Rightarrow x=0$ edo $ax+b=0$.', '$x(ax+b)=0\\Rightarrow x=0$ o $ax+b=0$.', '$x(ax+b)=0\\Rightarrow x=0$ أو $ax+b=0$.', '$x(ax+b)=0\\Rightarrow x=0$ or $ax+b=0$.'),
        figure: (language) => <ZeroProductFigure language={language} />
    },
    {
        id: 'formula',
        stage: 'quadratic',
        title: say('Formula orokorra', 'La fórmula general', 'الصيغة العامة', 'The quadratic formula'),
        goal: say('Bigarren mailako ekuazio osoak formularekin ebaztea.', 'Resolver ecuaciones de segundo grado completas con la fórmula.', 'حلّ معادلات الدرجة الثانية التامة بالصيغة.', 'Solve complete quadratic equations with the formula.'),
        needs: [{ unit: 'dbh3/potencias-raices', topic: 'roots', title: { eu: 'Erro karratuak eta kuboak', es: 'Raíces cuadradas y cúbicas', en: 'Square and cube roots', ar: 'الجذور التربيعية والتكعيبية' } }],
        problem: same('$x^{2}-5x+6=0$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Irakurri koefizienteak.', 'Lee los coeficientes.', 'اقرأ المعاملات.', 'Read the coefficients.'), math: same('$a=1,\\ b=-5,\\ c=6$') },
            { text: say('Erro barrukoa.', 'Lo de dentro de la raíz.', 'ما تحت الجذر.', 'Under the root.'), math: same('$(-5)^{2}-4\\cdot 1\\cdot 6=1$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$x=\\frac{5\\pm 1}{2}$') },
            { text: say('Bi ebazpenak.', 'Las dos soluciones.', 'الحلّان.', 'The two solutions.'), math: same('$x=3,\\ x=2$') }
        ],
        takeaway: say('$x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$', '$x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$', '$x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$', '$x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$'),
        figure: (language) => <QuadraticFormulaFigure language={language} />
    },
    {
        id: 'discriminant',
        stage: 'quadratic',
        title: say('Diskriminatzailea', 'El discriminante', 'المميّز', 'The discriminant'),
        goal: say('Ebazpen kopurua ebatzi gabe jakitea.', 'Saber cuántas soluciones hay sin resolver.', 'معرفة عدد الحلول دون حلّ المعادلة.', 'Know how many solutions there are without solving.'),
        problem: say('Zenbat ebazpen ditu $x^{2}+4x+k=0$ ekuazioak $k=4$ denean?', '¿Cuántas soluciones tiene $x^{2}+4x+k=0$ si $k=4$?', 'كم حلًّا لـ $x^{2}+4x+k=0$ عندما $k=4$؟', 'How many solutions does $x^{2}+4x+k=0$ have when $k=4$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kalkulatu $\\Delta$.', 'Calcula $\\Delta$.', 'احسب $\\Delta$.', 'Work out $\\Delta$.'), math: same('$4^{2}-4\\cdot 1\\cdot 4=0$') },
            { text: say('$\\Delta=0$: ebazpen bakarra.', '$\\Delta=0$: una sola solución.', '$\\Delta=0$: حلّ واحد.', '$\\Delta=0$: a single solution.'), math: same('$x=\\frac{-4}{2}=-2$') }
        ],
        takeaway: say('$\\Delta=b^{2}-4ac$: $>0$ bi, $=0$ bat, $<0$ bat ere ez.', '$\\Delta=b^{2}-4ac$: $>0$ dos, $=0$ una, $<0$ ninguna.', '$\\Delta=b^{2}-4ac$: $>0$ حلّان، $=0$ حلّ، $<0$ لا حل.', '$\\Delta=b^{2}-4ac$: $>0$ two, $=0$ one, $<0$ none.'),
        figure: (language) => <DiscriminantFigure language={language} />
    },
    /* ---------- 3. Systems ---------- */
    {
        id: 'pairs',
        stage: 'systems',
        title: say('Bi ezezaguneko ekuazioak', 'Ecuaciones con dos incógnitas', 'معادلات بمجهولين', 'Equations in two unknowns'),
        goal: say('Ekuazio lineal baten ebazpenak bikoteak direla ulertzea eta sistema baten ebazpena egiaztatzea.', 'Entender que las soluciones de una ecuación lineal son parejas y comprobar la solución de un sistema.', 'فهم أن حلول المعادلة الخطية أزواج والتحقق من حل نظام.', 'Understand that the solutions of a linear equation are pairs and check the solution of a system.'),
        needs: [{ unit: 'dbh2/funciones', topic: 'coordinates', title: { eu: 'Koordenatuak eta koadranteak', es: 'Coordenadas y cuadrantes', en: 'Coordinates and quadrants', ar: 'الإحداثيات والأرباع' } }],
        problem: say('$(2,3)$ bikotea $x+y=5$, $3x-y=3$ sistemaren ebazpena al da?', '¿Es $(2,3)$ solución del sistema $x+y=5$, $3x-y=3$?', 'هل $(2,3)$ حلّ للنظام $x+y=5$، $3x-y=3$؟', 'Is $(2,3)$ a solution of the system $x+y=5$, $3x-y=3$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen ekuazioa.', 'Primera ecuación.', 'المعادلة الأولى.', 'First equation.'), math: same('$2+3=5$') },
            { text: say('Bigarrena.', 'Segunda.', 'الثانية.', 'Second.'), math: same('$3\\cdot 2-3=3$') },
            { text: say('Biak betetzen dira: bai, ebazpena da.', 'Se cumplen las dos: sí es solución.', 'تتحقق الاثنتان: نعم، هو حل.', 'Both hold: yes, it is the solution.') }
        ],
        takeaway: say('Sistemaren ebazpena: BI ekuazioak betetzen dituen $(x,y)$.', 'Solución del sistema: el $(x,y)$ que cumple LAS DOS.', 'حل النظام: الزوج $(x,y)$ الذي يحقق المعادلتين.', 'Solution of the system: the $(x,y)$ that satisfies BOTH.'),
        figure: (language) => <LinearSolutionsFigure language={language} />
    },
    {
        id: 'graphic',
        stage: 'systems',
        title: say('Ebazpen grafikoa', 'Resolución gráfica', 'الحل البياني', 'Solving graphically'),
        goal: say('Sistema bat bi zuzen marraztuz ebaztea.', 'Resolver un sistema dibujando dos rectas.', 'حلّ نظام برسم مستقيمين.', 'Solve a system by drawing two lines.'),
        needs: [{ unit: 'dbh2/funciones', topic: 'plot', title: { eu: 'Funtzio bat marraztu', es: 'Dibujar una función', en: 'Drawing a function', ar: 'رسم دالة' } }],
        problem: same('$y=x+1,\\ y=-x+5$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen zuzena: $x=0$ denean $y=1$; $x=2$ denean $y=3$.', 'Primera recta: si $x=0$, $y=1$; si $x=2$, $y=3$.', 'المستقيم الأول: إذا $x=0$ فإن $y=1$؛ إذا $x=2$ فإن $y=3$.', 'First line: if $x=0$, $y=1$; if $x=2$, $y=3$.'), math: same('$(0,1),\\ (2,3)$') },
            { text: say('Bigarrena: $x=0$ denean $y=5$; $x=2$ denean $y=3$.', 'Segunda: si $x=0$, $y=5$; si $x=2$, $y=3$.', 'الثاني: إذا $x=0$ فإن $y=5$؛ إذا $x=2$ فإن $y=3$.', 'Second: if $x=0$, $y=5$; if $x=2$, $y=3$.'), math: same('$(0,5),\\ (2,3)$') },
            { text: say('Puntu komuna: ebakidura.', 'El punto común: el corte.', 'النقطة المشتركة: التقاطع.', 'The common point: the crossing.'), math: same('$x=2,\\ y=3$') }
        ],
        takeaway: say('Ebazpena = bi zuzenen EBAKIDURA-PUNTUA.', 'Solución = PUNTO DE CORTE de las dos rectas.', 'الحل = نقطة تقاطع المستقيمين.', 'Solution = the CROSSING POINT of the two lines.'),
        figure: (language) => <LinearSolutionsFigure language={language} />
    },
    {
        id: 'classify',
        stage: 'systems',
        title: say('Sistema motak', 'Tipos de sistemas', 'أنواع الأنظمة', 'Types of systems'),
        goal: say('Sistema batek ebazpen bat, infinitu edo bat ere ez duen jakitea.', 'Saber si un sistema tiene una solución, infinitas o ninguna.', 'معرفة ما إذا كان للنظام حلّ واحد أو عدد لانهائي أو لا حل.', 'Know whether a system has one solution, infinitely many or none.'),
        needs: [{ unit: 'dbh3/proporcionalidad', topic: 'ratio', title: { eu: 'Arrazoia eta proportzioa', es: 'Razón y proporción', en: 'Ratio and proportion', ar: 'النسبة والتناسب' } }],
        problem: same('$2x-y=3,\\ 4x-2y=5$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konparatu koefizienteak.', 'Compara los coeficientes.', 'قارن المعاملات.', 'Compare the coefficients.'), math: same('$\\frac{4}{2}=\\frac{-2}{-1}=2$') },
            { text: say('Gai askeak: $5\\div 3$ ez da 2.', 'Términos independientes: $5\\div 3$ no es 2.', 'الحدود الثابتة: $5\\div 3$ ليس 2.', 'Constants: $5\\div 3$ is not 2.') },
            { text: say('Zuzen paraleloak: ebazpenik ez.', 'Rectas paralelas: no tiene solución.', 'مستقيمان متوازيان: لا حل.', 'Parallel lines: no solution.') }
        ],
        takeaway: say('Ebakitzen dira: bat. Paraleloak: bat ere ez. Berdinak: INFINITU.', 'Se cortan: una. Paralelas: ninguna. Iguales: INFINITAS.', 'متقاطعان: حلّ. متوازيان: لا حل. متطابقان: لانهائية.', 'Crossing: one. Parallel: none. The same: INFINITELY MANY.'),
        figure: (language) => <SystemTypesFigure language={language} />
    },
    /* ---------- 4. Methods ---------- */
    {
        id: 'substitution',
        stage: 'methods',
        title: say('Ordezkapen metodoa', 'Método de sustitución', 'طريقة التعويض', 'The substitution method'),
        goal: say('Ezezagun bat bakandu eta beste ekuazioan ordezkatzea.', 'Despejar una incógnita y sustituirla en la otra ecuación.', 'عزل مجهول وتعويضه في المعادلة الأخرى.', 'Isolate one unknown and substitute it in the other equation.'),
        problem: same('$x+2y=8,\\ 3x-y=3$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bakandu $x$ lehenengoan.', 'Despeja $x$ en la primera.', 'اعزل $x$ في الأولى.', 'Isolate $x$ in the first.'), math: same('$x=8-2y$') },
            { text: say('Ordezkatu bigarrenean.', 'Sustituye en la segunda.', 'عوّض في الثانية.', 'Substitute in the second.'), math: same('$3(8-2y)-y=3$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$24-7y=3\\ \\to\\ y=3$') },
            { text: say('Itzuli $x$ kalkulatzera.', 'Vuelve para calcular $x$.', 'ارجع لحساب $x$.', 'Go back for $x$.'), math: same('$x=8-2\\cdot 3=2$') }
        ],
        takeaway: say('Bakandu, ordezkatu (PARENTESIAREKIN), ebatzi, itzuli.', 'Despeja, sustituye (CON PARÉNTESIS), resuelve, vuelve.', 'اعزل، عوّض (بقوسين)، حلّ، ارجع.', 'Isolate, substitute (IN BRACKETS), solve, go back.'),
        figure: (language) => <SubstitutionFigure language={language} />
    },
    {
        id: 'equalisation',
        stage: 'methods',
        title: say('Berdinketa metodoa', 'Método de igualación', 'طريقة المساواة', 'The equalisation method'),
        goal: say('Ezezagun bera bi ekuazioetan bakandu eta berdintzea.', 'Despejar la misma incógnita en las dos ecuaciones e igualar.', 'عزل المجهول نفسه في المعادلتين ومساواتهما.', 'Isolate the same unknown in both equations and set them equal.'),
        problem: same('$y=2x+1,\\ y=-x+7$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu bi adierazpenak.', 'Iguala las dos expresiones.', 'ساوِ العبارتين.', 'Set the two expressions equal.'), math: same('$2x+1=-x+7$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$3x=6\\ \\to\\ x=2$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$y=2\\cdot 2+1=5$') }
        ],
        takeaway: say('$y=a$ eta $y=b\\Rightarrow a=b$', '$y=a$ e $y=b\\Rightarrow a=b$', '$y=a$ و$y=b\\Rightarrow a=b$', '$y=a$ and $y=b\\Rightarrow a=b$'),
        figure: (language) => <EqualizationFigure language={language} />
    },
    {
        id: 'elimination',
        stage: 'methods',
        title: say('Laburketa metodoa', 'Método de reducción', 'طريقة الحذف', 'The elimination method'),
        goal: say('Ekuazioak biderkatu eta batu, ezezagun bat desager dadin.', 'Multiplicar y sumar las ecuaciones para que desaparezca una incógnita.', 'ضرب المعادلتين وجمعهما ليختفي مجهول.', 'Multiply and add the equations so that one unknown disappears.'),
        problem: same('$2x+3y=12,\\ 5x-y=13$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu bigarrena 3 zenbakiaz.', 'Multiplica la segunda por 3.', 'اضرب الثانية في 3.', 'Multiply the second by 3.'), math: same('$15x-3y=39$') },
            { text: say('Batu lehenengoarekin: $y$ desagertzen da.', 'Súmala a la primera: desaparece $y$.', 'اجمعها مع الأولى: يختفي $y$.', 'Add it to the first: $y$ disappears.'), math: same('$17x=51\\ \\to\\ x=3$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$5\\cdot 3-y=13\\ \\to\\ y=2$') }
        ],
        takeaway: say('Koefiziente AURKAKOAK lortu eta batu: $3y+(-3y)=0$.', 'Consigue coeficientes OPUESTOS y suma: $3y+(-3y)=0$.', 'احصل على معاملين متعاكسين واجمع: $3y+(-3y)=0$.', 'Make the coefficients OPPOSITE and add: $3y+(-3y)=0$.'),
        figure: (language) => <ReductionFigure language={language} />
    },
    /* ---------- 5. Problems ---------- */
    {
        id: 'equation-problems',
        stage: 'problems',
        figureAfterSteps: true,
        title: say('Problemak ekuazioekin', 'Problemas con ecuaciones', 'مسائل بالمعادلات', 'Problems with equations'),
        goal: say('Problema bat ekuazio batekin planteatu eta ebaztea.', 'Plantear y resolver un problema con una ecuación.', 'صياغة مسألة بمعادلة وحلّها.', 'Set up and solve a problem with an equation.'),
        needs: [{ unit: 'dbh2/ekuazioak', topic: 'problem-steps', title: { eu: 'Buruketa bat ebazteko urratsak', es: 'Pasos para resolver un problema', en: 'Steps to solve a problem', ar: 'خطوات حل مسألة' } }],
        problem: say('Ama batek semeak baino 28 urte gehiago ditu. 4 urte barru, semearen hirukoitza izango du. Zenbat urte ditu semeak?', 'Una madre tiene 28 años más que su hijo. Dentro de 4 años tendrá el triple que él. ¿Cuántos años tiene el hijo?', 'عمر أمّ يزيد 28 سنة على عمر ابنها. بعد 4 سنوات يصير عمرها ثلاثة أمثال عمره. كم عمر الابن؟', 'A mother is 28 years older than her son. In 4 years she will be three times his age. How old is the son?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Semea: $x$. Ama: $x+28$.', 'Hijo: $x$. Madre: $x+28$.', 'الابن: $x$. الأم: $x+28$.', 'Son: $x$. Mother: $x+28$.') },
            { text: say('4 urte barru.', 'Dentro de 4 años.', 'بعد 4 سنوات.', 'In 4 years.'), math: same('$x+32=3(x+4)$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$x+32=3x+12\\ \\to\\ x=10$') },
            { text: say('Egiaztatu: 14 eta 42.', 'Comprueba: 14 y 42.', 'تحقّق: 14 و42.', 'Check: 14 and 42.'), math: same('$3\\cdot 14=42$') }
        ],
        takeaway: say('Erabaki $x$, idatzi dena $x$-rekin, planteatu, EGIAZTATU.', 'Decide $x$, escribe todo con $x$, plantea, COMPRUEBA.', 'حدّد $x$، اكتب الكل بـ$x$، صُغ، تحقّق.', 'Choose $x$, write everything with $x$, set up, CHECK.'),
        figure: (language) => <AgesFigure language={language} />
    },
    {
        id: 'quadratic-problems',
        stage: 'problems',
        title: say('Bigarren mailako problemak', 'Problemas de segundo grado', 'مسائل من الدرجة الثانية', 'Quadratic problems'),
        goal: say('Bigarren mailako ekuazio bat sortzen duten problemak ebaztea eta ebazpenak aztertzea.', 'Resolver problemas que llevan a una ecuación de segundo grado y estudiar las soluciones.', 'حلّ مسائل تؤدي إلى معادلة من الدرجة الثانية ودراسة الحلول.', 'Solve problems that lead to a quadratic equation and study the solutions.'),
        problem: say('Bi zenbaki jarraien biderkadura 132 da. Zeintzuk dira (positiboak)?', 'El producto de dos números consecutivos es 132. ¿Cuáles son (positivos)?', 'جداء عددين متتاليين 132. ما هما (موجبان)؟', 'The product of two consecutive numbers is 132. What are they (positive)?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Planteatu.', 'Plantea.', 'صُغ المعادلة.', 'Set up.'), math: same('$x(x+1)=132\\ \\to\\ x^{2}+x-132=0$') },
            { text: say('Formula.', 'Fórmula.', 'الصيغة.', 'Formula.'), math: same('$x=\\frac{-1\\pm 23}{2}$') },
            { text: say('$x=11$ edo $x=-12$. Positiboa: 11 eta 12.', '$x=11$ o $x=-12$. El positivo: 11 y 12.', '$x=11$ أو $x=-12$. الموجب: 11 و12.', '$x=11$ or $x=-12$. The positive one: 11 and 12.'), math: same('$11\\cdot 12=132$') }
        ],
        takeaway: say('Bi ebazpen? Aztertu biak: LUZERA BAT EZ DA NEGATIBOA.', '¿Dos soluciones? Estudia las dos: UNA LONGITUD NO ES NEGATIVA.', 'حلّان؟ ادرس الاثنين: الطول لا يكون سالبًا.', 'Two solutions? Study both: A LENGTH IS NEVER NEGATIVE.'),
        figure: (language) => <AreaProblemFigure language={language} />
    },
    {
        id: 'system-problems',
        stage: 'problems',
        title: say('Problemak sistemekin', 'Problemas con sistemas', 'مسائل بالأنظمة', 'Problems with systems'),
        goal: say('Bi ezezaguneko problema bat sistema batekin planteatu eta ebaztea.', 'Plantear y resolver un problema de dos incógnitas con un sistema.', 'صياغة مسألة بمجهولين بنظام وحلّها.', 'Set up and solve a two-unknown problem with a system.'),
        problem: say('Zinema batean 9 euroko eta 6 euroko 40 sarrera saldu dira, guztira 303 euro. Zenbat saldu dira 9 eurokoak?', 'En un cine se han vendido 40 entradas de 9 € y de 6 €, en total 303 €. ¿Cuántas de 9 € se han vendido?', 'بيعت في سينما 40 تذكرة بسعر 9 يورو و6 يورو، بمجموع 303 يورو. كم تذكرة بسعر 9 يورو بيعت؟', 'A cinema sold 40 tickets at €9 and €6, €303 in total. How many €9 tickets were sold?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x$: 9 eurokoak; $y$: 6 eurokoak.', '$x$: las de 9 €; $y$: las de 6 €.', '$x$: تذاكر 9 يورو؛ $y$: تذاكر 6 يورو.', '$x$: the €9 ones; $y$: the €6 ones.'), math: same('$x+y=40,\\ 9x+6y=303$') },
            { text: say('Bigarrenari lehena bider 6 kendu.', 'A la segunda réstale la primera por 6.', 'اطرح من الثانية الأولى مضروبة في 6.', 'Subtract the first times 6 from the second.'), math: same('$3x=63\\ \\to\\ x=21$') },
            { text: say('Beste aldagaia.', 'La otra incógnita.', 'المجهول الآخر.', 'The other unknown.'), math: same('$y=40-21=19$') },
            { text: say('Egiaztatu.', 'Comprueba.', 'تحقّق.', 'Check.'), math: same('$9\\cdot 21+6\\cdot 19=303$') }
        ],
        takeaway: say('Baldintza bakoitzeko EKUAZIO BAT; amaieran, egiaztatu biak.', 'UNA ECUACIÓN por condición; al final, comprueba las dos.', 'معادلة لكل شرط؛ وفي النهاية تحقّق من الاثنين.', 'ONE EQUATION per condition; at the end, check both.'),
        figure: (language) => <SystemProblemFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const equations3Topics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...equations3LessonTexts[topic.id as Equations3TopicId], ...equations3LessonChecks[topic.id as Equations3TopicId] }))

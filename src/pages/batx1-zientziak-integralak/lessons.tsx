import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { localizeNames, same, say } from '../batx1-zientziak-funtzioak/text'
import { AreaAxisFigure, AreaSignFigure, ArcsFigure, BarrowFigure, BetweenCurvesFigure, ChainBackFigure, ExpLogFigure, AdjustFigure, LogPatternFigure, PowerRuleFigure, PrimitiveFamilyFigure, PropertiesFigure, RectanglesFigure, ThroughPointFigure, TrigFigure } from './figures'
import { bachIntegralsLessonChecks, type BachIntegralsTopicId } from './lessonChecks'
import { bachIntegralsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Integralak · Batxilergoa 1 · Zientziak — stages and lessons. The scope
   follows unit 12 of Santillana 1.º Bachillerato Ciencias, the only one of
   the two books with integrals in this course (Anaya Matemáticas I has
   none; units 11 and 12 of its Matemáticas II were only a reference for
   the common part): antiderivatives, immediate and composite integrals
   (with the arctangent after completing a square), the definite integral
   — first as the limit of sums of rectangles, then with Barrow's rule —
   and areas. Integration by parts and partial fractions are 2.º. The
   derivatives come from Deribatuak; they are linked as «Review first».
   ========================================================================== */

export type BachIntegralsStageId = 'primitives' | 'immediate' | 'compound' | 'definite' | 'areas'

export const bachIntegralsStages: UnitStage[] = [
    { id: 'primitives', tone: 'blue', title: { eu: 'Jatorrizkoak', es: 'Primitivas', en: 'Antiderivatives', ar: 'الدوال الأصلية' } },
    { id: 'immediate', tone: 'violet', title: { eu: 'Integral berehalakoak', es: 'Integrales inmediatas', en: 'Basic integrals', ar: 'التكاملات المباشرة' } },
    { id: 'compound', tone: 'mustard', title: { eu: 'Integral konposatuak', es: 'Integrales compuestas', en: 'Composite integrals', ar: 'التكاملات المركّبة' } },
    { id: 'definite', tone: 'coral', title: { eu: 'Integral mugatua', es: 'La integral definida', en: 'The definite integral', ar: 'التكامل المحدد' } },
    { id: 'areas', tone: 'green', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' } }
]

const DERIVATIVES = 'batx1-zientziak/derivadas'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Antiderivatives ---------- */
    {
        id: 'primitive',
        stage: 'primitives',
        title: say('Funtzio baten jatorrizkoa', 'Primitiva de una función', 'الدالة الأصلية لدالة', 'Antiderivative of a function'),
        goal: say('Jatorrizko bat ezagutzea: $F$ funtzioa $f$ funtzioaren jatorrizkoa da $F\'=f$ bada, eta infinitu daude, konstante batean bereizten direnak.', 'Reconocer una primitiva: $F$ es primitiva de $f$ si $F\'=f$, y hay infinitas, que se diferencian en una constante.', 'التعرف على الدالة الأصلية: $F$ أصلية لـ $f$ إذا كان $F\'=f$، وهي كثيرة لا نهائيًّا تختلف بثابت.', 'Recognise an antiderivative: $F$ is an antiderivative of $f$ if $F\'=f$, and there are infinitely many, differing by a constant.'),
        needs: [
            { unit: DERIVATIVES, topic: 'powers', title: { eu: 'Berreturak eta erroak', es: 'Potencias y raíces', en: 'Powers and roots', ar: 'القوى والجذور' } },
            { unit: DERIVATIVES, topic: 'sum-constant', title: { eu: 'Batura eta konstante bat', es: 'Suma y constante', en: 'Sum and constant', ar: 'المجموع والثابت' } }
        ],
        problem: say('$F(x)=x^3+2x$ funtzioa $f(x)=3x^2+2$ funtzioaren jatorrizkoa al da? Badaude beste batzuk?', '¿Es $F(x)=x^3+2x$ una primitiva de $f(x)=3x^2+2$? ¿Hay otras?', 'هل $F(x)=x^3+2x$ دالة أصلية لـ $f(x)=3x^2+2$؟ وهل توجد غيرها؟', 'Is $F(x)=x^3+2x$ an antiderivative of $f(x)=3x^2+2$? Are there others?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deribatu $F$.', 'Deriva $F$.', 'اشتق $F$.', 'Differentiate $F$.'), math: same('$F\'(x)=3x^2+2=f(x)$') },
            { text: say('Bai: $F\'=f$.', 'Sí: $F\'=f$.', 'نعم: $F\'=f$.', 'Yes: $F\'=f$.') },
            { text: say('$x^3+2x+5$ eta $x^3+2x-1$ ere bai: konstante baten deribatua 0 da.', 'También $x^3+2x+5$ o $x^3+2x-1$: la derivada de una constante es 0.', 'وكذلك $x^3+2x+5$ و$x^3+2x-1$: مشتقة الثابت 0.', 'So are $x^3+2x+5$ and $x^3+2x-1$: the derivative of a constant is 0.'), math: same('$\\int(3x^2+2)\\,dx=x^3+2x+k$') }
        ],
        takeaway: say('$F$ funtzioa $f$ funtzioaren jatorrizkoa da $F\'=f$ bada. Jatorrizko guztiak $F(x)+k$ dira: $\\int f(x)\\,dx=F(x)+k$ idazten da, integral mugagabea.', '$F$ es una primitiva de $f$ si $F\'=f$. Todas las primitivas son $F(x)+k$: se escribe $\\int f(x)\\,dx=F(x)+k$, la integral indefinida.', '$F$ أصلية لـ $f$ إذا كان $F\'=f$. وكل الدوال الأصلية هي $F(x)+k$: نكتب $\\int f(x)\\,dx=F(x)+k$، وهو التكامل غير المحدد.', '$F$ is an antiderivative of $f$ if $F\'=f$. All the antiderivatives are $F(x)+k$: you write $\\int f(x)\\,dx=F(x)+k$, the indefinite integral.'),
        figure: (language) => <PrimitiveFamilyFigure language={language} />
    },
    {
        id: 'power-rule',
        stage: 'primitives',
        title: say('Berredura baten integrala', 'Integral de una potencia', 'تكامل القوة', 'Integral of a power'),
        goal: say('$x^n$ integratzea, berretzaileari 1 gehituta eta berretzaile berriaz zatituta; erroak eta berretzaile negatiboak ere bai.', 'Integrar $x^n$ sumando 1 al exponente y dividiendo entre el nuevo exponente; también raíces y potencias negativas.', 'تكامل $x^n$ بإضافة 1 إلى الأس والقسمة على الأس الجديد؛ وكذلك الجذور والقوى السالبة.', 'Integrate $x^n$ by adding 1 to the exponent and dividing by the new exponent; roots and negative powers too.'),
        needs: [
            { unit: DERIVATIVES, topic: 'powers', title: { eu: 'Berreturak eta erroak', es: 'Potencias y raíces', en: 'Powers and roots', ar: 'القوى والجذور' } }
        ],
        problem: say('Kalkulatu $\\int(4x^3-6x+5)\\,dx$.', 'Calcula $\\int(4x^3-6x+5)\\,dx$.', 'احسب $\\int(4x^3-6x+5)\\,dx$.', 'Work out $\\int(4x^3-6x+5)\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gaiz gai: lehen gaia.', 'Término a término: el primero.', 'حدًّا حدًّا: الأول.', 'Term by term: the first one.'), math: same('$\\int 4x^3\\,dx=4\\cdot\\frac{x^4}{4}=x^4$') },
            { text: say('Beste biak.', 'Los otros dos.', 'الحدّان الآخران.', 'The other two.'), math: same('$\\begin{aligned}&\\int 6x\\,dx=3x^2\\\\ &\\int 5\\,dx=5x\\end{aligned}$') },
            { text: say('Emaitza, konstantearekin.', 'El resultado, con la constante.', 'النتيجة مع الثابت.', 'The result, with the constant.'), math: same('$x^4-3x^2+5x+k$') }
        ],
        takeaway: say('$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+k$, $n\\ne -1$ bada. Erroak eta zatikiak berretura gisa idazten dira: $\\sqrt{x}=x^{\\frac{1}{2}}$ eta $\\frac{1}{x^2}=x^{-2}$.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+k$ si $n\\ne -1$. Raíces y fracciones se escriben como potencias: $\\sqrt{x}=x^{\\frac{1}{2}}$ y $\\frac{1}{x^2}=x^{-2}$.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+k$ إذا كان $n\\ne -1$. وتُكتب الجذور والكسور قوى: $\\sqrt{x}=x^{\\frac{1}{2}}$ و$\\frac{1}{x^2}=x^{-2}$.', '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+k$ if $n\\ne -1$. Roots and fractions are written as powers: $\\sqrt{x}=x^{\\frac{1}{2}}$ and $\\frac{1}{x^2}=x^{-2}$.'),
        figure: (language) => <PowerRuleFigure language={language} />
    },
    {
        id: 'through-point',
        stage: 'primitives',
        title: say('Puntu batetik pasatzen den jatorrizkoa', 'Primitiva que pasa por un punto', 'دالة أصلية تمر بنقطة', 'An antiderivative through a point'),
        goal: say('Jatorrizko guztien artean $F(a)=b$ betetzen duena aukeratzea: baldintzak $k$ konstantea finkatzen du.', 'Elegir, entre todas las primitivas, la que cumple $F(a)=b$: la condición fija la constante $k$.', 'اختيار الدالة الأصلية التي تحقق $F(a)=b$ من بين كل الأصليات: الشرط يحدد الثابت $k$.', 'Choose, among all the antiderivatives, the one with $F(a)=b$: the condition fixes the constant $k$.'),
        problem: say('Aurkitu $f(x)=2x+3$ funtzioaren jatorrizkoa, $(1,\\,6)$ puntutik pasatzen dena.', 'Halla la primitiva de $f(x)=2x+3$ que pasa por $(1,\\,6)$.', 'أوجد الدالة الأصلية لـ $f(x)=2x+3$ التي تمر بالنقطة $(1,\\,6)$.', 'Find the antiderivative of $f(x)=2x+3$ that goes through $(1,\\,6)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jatorrizkoen familia.', 'La familia de primitivas.', 'عائلة الدوال الأصلية.', 'The family of antiderivatives.'), math: same('$F(x)=x^2+3x+k$') },
            { text: say('Baldintza: $F(1)=6$.', 'La condición: $F(1)=6$.', 'الشرط: $F(1)=6$.', 'The condition: $F(1)=6$.'), math: same('$1+3+k=6\\ \\to\\ k=2$') },
            { text: say('Jatorrizkoa: $F(x)=x^2+3x+2$.', 'La primitiva: $F(x)=x^2+3x+2$.', 'الدالة الأصلية: $F(x)=x^2+3x+2$.', 'The antiderivative: $F(x)=x^2+3x+2$.') }
        ],
        takeaway: say('Lehenik $F(x)+k$ familia; gero puntuak $k$ konstantearen ekuazio bat ematen du. Familiako kurba bakar bat pasatzen da puntutik.', 'Primero la familia $F(x)+k$; después, el punto da una ecuación en $k$. Solo una curva de la familia pasa por él.', 'أولًا العائلة $F(x)+k$، ثم تعطي النقطة معادلة في $k$. منحنى واحد فقط من العائلة يمر بها.', 'First the family $F(x)+k$; then the point gives an equation in $k$. Only one curve of the family goes through it.'),
        figure: (language) => <ThroughPointFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Basic integrals ---------- */
    {
        id: 'exp-log',
        stage: 'immediate',
        title: say('Esponentzialak eta logaritmoak', 'Exponenciales y logaritmos', 'الدوال الأسية واللوغاريتمية', 'Exponentials and logarithms'),
        goal: say('$e^x$, $a^x$ eta $\\frac{1}{x}$ integratzea; azken hori berreturaren $n=-1$ kasua da, eta logaritmo bat ematen du.', 'Integrar $e^x$, $a^x$ y $\\frac{1}{x}$, el caso $n=-1$ de la potencia, que da un logaritmo.', 'تكامل $e^x$ و$a^x$ و$\\frac{1}{x}$، وهي حالة $n=-1$ من القوة وتعطي لوغاريتمًا.', 'Integrate $e^x$, $a^x$ and $\\frac{1}{x}$, the case $n=-1$ of the power, which gives a logarithm.'),
        needs: [
            { unit: DERIVATIVES, topic: 'exp-log', title: { eu: 'Esponentzialak eta logaritmoak', es: 'Exponenciales y logaritmos', en: 'Exponentials and logarithms', ar: 'الدوال الأسية واللوغاريتمية' } }
        ],
        problem: say('Kalkulatu $\\int\\left(e^x+\\frac{3}{x}\\right)dx$.', 'Calcula $\\int\\left(e^x+\\frac{3}{x}\\right)dx$.', 'احسب $\\int\\left(e^x+\\frac{3}{x}\\right)dx$.', 'Work out $\\int\\left(e^x+\\frac{3}{x}\\right)dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Esponentziala ez da aldatzen.', 'La exponencial no cambia.', 'الدالة الأسية لا تتغير.', 'The exponential does not change.'), math: same('$\\int e^x\\,dx=e^x$') },
            { text: say('$\\frac{1}{x}$ zatikiak logaritmoa ematen du.', 'La fracción $\\frac{1}{x}$ da el logaritmo.', 'الكسر $\\frac{1}{x}$ يعطي اللوغاريتم.', 'The fraction $\\frac{1}{x}$ gives the logarithm.'), math: same('$\\int\\frac{3}{x}\\,dx=3\\ln|x|$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$e^x+3\\ln|x|+k$') }
        ],
        takeaway: say('$\\int e^x\\,dx=e^x+k$, $\\int a^x\\,dx=\\frac{a^x}{\\ln a}+k$ eta $\\int\\frac{1}{x}\\,dx=\\ln|x|+k$: $-1$ berretzaileak ezin du berreturaren erregela erabili.', '$\\int e^x\\,dx=e^x+k$, $\\int a^x\\,dx=\\frac{a^x}{\\ln a}+k$ y $\\int\\frac{1}{x}\\,dx=\\ln|x|+k$: el exponente $-1$ no puede usar la regla de la potencia.', '$\\int e^x\\,dx=e^x+k$ و$\\int a^x\\,dx=\\frac{a^x}{\\ln a}+k$ و$\\int\\frac{1}{x}\\,dx=\\ln|x|+k$: الأس $-1$ لا يستعمل قاعدة القوة.', '$\\int e^x\\,dx=e^x+k$, $\\int a^x\\,dx=\\frac{a^x}{\\ln a}+k$ and $\\int\\frac{1}{x}\\,dx=\\ln|x|+k$: the exponent $-1$ cannot use the power rule.'),
        figure: (language) => <ExpLogFigure language={language} />
    },
    {
        id: 'trig',
        stage: 'immediate',
        title: say('Integral trigonometrikoak', 'Integrales trigonométricas', 'التكاملات المثلثية', 'Trigonometric integrals'),
        goal: say('Sinua, kosinua eta $1+\\tan^2 x$ integratzea, deribatuen taula alderantziz irakurrita.', 'Integrar seno, coseno y $1+\\tan^2 x$ leyendo al revés la tabla de derivadas.', 'تكامل الجيب وجيب التمام و$1+\\tan^2 x$ بقراءة جدول المشتقات بالعكس.', 'Integrate sine, cosine and $1+\\tan^2 x$ by reading the table of derivatives backwards.'),
        needs: [
            { unit: DERIVATIVES, topic: 'trig', title: { eu: 'Trigonometrikoak eta arkuak', es: 'Trigonométricas y arcos', en: 'Trigonometric and arc functions', ar: 'الدوال المثلثية ودوال القوس' } }
        ],
        problem: say('Kalkulatu $\\int(\\cos x-2\\sin x)\\,dx$.', 'Calcula $\\int(\\cos x-2\\sin x)\\,dx$.', 'احسب $\\int(\\cos x-2\\sin x)\\,dx$.', 'Work out $\\int(\\cos x-2\\sin x)\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kosinuaren jatorrizkoa sinua da.', 'La primitiva del coseno es el seno.', 'أصلية جيب التمام هي الجيب.', 'The antiderivative of cosine is sine.'), math: same('$\\int\\cos x\\,dx=\\sin x$') },
            { text: say('Sinuarena, minus kosinua.', 'La del seno, menos el coseno.', 'وأصلية الجيب هي سالب جيب التمام.', 'That of sine, minus cosine.'), math: same('$\\int 2\\sin x\\,dx=-2\\cos x$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$\\sin x+2\\cos x+k$') }
        ],
        takeaway: say('$\\int\\cos x\\,dx=\\sin x+k$, $\\int\\sin x\\,dx=-\\cos x+k$ eta $\\int(1+\\tan^2 x)\\,dx=\\tan x+k$. Minus zeinua sinuarekin doa.', '$\\int\\cos x\\,dx=\\sin x+k$, $\\int\\sin x\\,dx=-\\cos x+k$ y $\\int(1+\\tan^2 x)\\,dx=\\tan x+k$. El signo menos va con el seno.', '$\\int\\cos x\\,dx=\\sin x+k$ و$\\int\\sin x\\,dx=-\\cos x+k$ و$\\int(1+\\tan^2 x)\\,dx=\\tan x+k$. إشارة السالب تأتي مع الجيب.', '$\\int\\cos x\\,dx=\\sin x+k$, $\\int\\sin x\\,dx=-\\cos x+k$ and $\\int(1+\\tan^2 x)\\,dx=\\tan x+k$. The minus sign goes with sine.'),
        figure: (language) => <TrigFigure language={language} />
    },
    {
        id: 'arcs',
        stage: 'immediate',
        title: say('Arku tangentea eta arku sinua', 'Arcotangente y arcoseno', 'قوس الظل وقوس الجيب', 'Arctangent and arcsine'),
        goal: say('$\\frac{1}{1+x^2}$ eta $\\frac{1}{\\sqrt{1-x^2}}$ ezagutzea, eta karratua osatzea arku tangentera iristeko.', 'Reconocer $\\frac{1}{1+x^2}$ y $\\frac{1}{\\sqrt{1-x^2}}$, y completar el cuadrado para llegar a la arcotangente.', 'التعرف على $\\frac{1}{1+x^2}$ و$\\frac{1}{\\sqrt{1-x^2}}$، وإكمال المربع للوصول إلى قوس الظل.', 'Recognise $\\frac{1}{1+x^2}$ and $\\frac{1}{\\sqrt{1-x^2}}$, and complete the square to reach the arctangent.'),
        problem: say('Kalkulatu $\\int\\frac{dx}{x^2-4x+5}$.', 'Calcula $\\int\\frac{dx}{x^2-4x+5}$.', 'احسب $\\int\\frac{dx}{x^2-4x+5}$.', 'Work out $\\int\\frac{dx}{x^2-4x+5}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Osatu karratua.', 'Completa el cuadrado.', 'أكمل المربع.', 'Complete the square.'), math: same('$x^2-4x+5=(x-2)^2+1$') },
            { text: say('$x-2$ zenbakiaren arku tangentearen deribatua da.', 'Es la derivada de la arcotangente de $x-2$.', 'إنها مشتقة قوس ظل $x-2$.', 'It is the derivative of the arctangent of $x-2$.'), math: same('$\\int\\frac{dx}{(x-2)^2+1}=\\arctan(x-2)+k$') }
        ],
        takeaway: say('$\\int\\frac{dx}{1+x^2}=\\arctan x+k$ eta $\\int\\frac{dx}{\\sqrt{1-x^2}}=\\arcsin x+k$. Izendatzailea errorik gabeko 2. mailako polinomio bat bada, karratua osatzen da.', '$\\int\\frac{dx}{1+x^2}=\\arctan x+k$ y $\\int\\frac{dx}{\\sqrt{1-x^2}}=\\arcsin x+k$. Si el denominador es un polinomio de grado 2 sin raíces, se completa el cuadrado.', '$\\int\\frac{dx}{1+x^2}=\\arctan x+k$ و$\\int\\frac{dx}{\\sqrt{1-x^2}}=\\arcsin x+k$. وإذا كان المقام كثير حدود من الدرجة الثانية بلا جذور نكمل المربع.', '$\\int\\frac{dx}{1+x^2}=\\arctan x+k$ and $\\int\\frac{dx}{\\sqrt{1-x^2}}=\\arcsin x+k$. If the denominator is a quadratic with no roots, complete the square.'),
        figure: (language) => <ArcsFigure language={language} />
    },

    /* ---------- 3. Composite integrals ---------- */
    {
        id: 'chain-power',
        stage: 'compound',
        title: say('Berredura konposatuak', 'Potencias compuestas', 'القوى المركّبة', 'Composite powers'),
        goal: say('$u\'\\cdot u^n$ ezagutzea eta katearen erregela desegitea: $\\int u\'u^n\\,dx=\\frac{u^{n+1}}{n+1}+k$.', 'Reconocer $u\'\\cdot u^n$ y deshacer la regla de la cadena: $\\int u\'u^n\\,dx=\\frac{u^{n+1}}{n+1}+k$.', 'التعرف على $u\'\\cdot u^n$ وعكس قاعدة السلسلة: $\\int u\'u^n\\,dx=\\frac{u^{n+1}}{n+1}+k$.', 'Recognise $u\'\\cdot u^n$ and undo the chain rule: $\\int u\'u^n\\,dx=\\frac{u^{n+1}}{n+1}+k$.'),
        needs: [
            { unit: DERIVATIVES, topic: 'chain', title: { eu: 'Katearen erregela', es: 'La regla de la cadena', en: 'The chain rule', ar: 'قاعدة السلسلة' } }
        ],
        problem: say('Kalkulatu $\\int 2x(x^2+1)^3\\,dx$.', 'Calcula $\\int 2x(x^2+1)^3\\,dx$.', 'احسب $\\int 2x(x^2+1)^3\\,dx$.', 'Work out $\\int 2x(x^2+1)^3\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$u=x^2+1$ bada, $u\'=2x$: kanpoan dago.', 'Con $u=x^2+1$, es $u\'=2x$: está fuera.', 'مع $u=x^2+1$ يكون $u\'=2x$: إنها في الخارج.', 'With $u=x^2+1$, $u\'=2x$: it is outside.') },
            { text: say('Integratu $u$ aldagaia $x$ balitz bezala.', 'Integra como si $u$ fuera $x$.', 'كامِل كأن $u$ هي $x$.', 'Integrate as if $u$ were $x$.'), math: same('$\\int u\'u^3\\,dx=\\frac{u^4}{4}$') },
            { text: say('Ordezkatu $u$ berriro.', 'Vuelve a poner $u$.', 'أعد وضع $u$.', 'Put $u$ back.'), math: same('$\\frac{(x^2+1)^4}{4}+k$') }
        ],
        takeaway: say('Barruan $u$ funtzio bat badago eta kanpoan haren $u\'$ deribatua, $u$ aldagaia $x$ balitz bezala integratzen da: $\\int u\'u^n\\,dx=\\frac{u^{n+1}}{n+1}+k$.', 'Si dentro hay una función $u$ y fuera está su derivada $u\'$, se integra como si $u$ fuera $x$: $\\int u\'u^n\\,dx=\\frac{u^{n+1}}{n+1}+k$.', 'إذا كانت في الداخل دالة $u$ وفي الخارج مشتقتها $u\'$ نكامل كأن $u$ هي $x$: $\\int u\'u^n\\,dx=\\frac{u^{n+1}}{n+1}+k$.', 'If there is a function $u$ inside and its derivative $u\'$ outside, integrate as if $u$ were $x$: $\\int u\'u^n\\,dx=\\frac{u^{n+1}}{n+1}+k$.'),
        figure: (language) => <ChainBackFigure language={language} />
    },
    {
        id: 'chain-exp-log',
        stage: 'compound',
        title: say('Esponentzial eta logaritmo konposatuak', 'Exponencial y logaritmo compuestos', 'الأسية واللوغاريتم المركّبان', 'Composite exponentials and logarithms'),
        goal: say('$u\'e^u$ eta $\\frac{u\'}{u}$ integratzea: zenbakitzailea izendatzailearen deribatua da.', 'Integrar $u\'e^u$ y $\\frac{u\'}{u}$: el numerador es la derivada del denominador.', 'تكامل $u\'e^u$ و$\\frac{u\'}{u}$: البسط مشتقة المقام.', 'Integrate $u\'e^u$ and $\\frac{u\'}{u}$: the numerator is the derivative of the denominator.'),
        problem: say('Kalkulatu $\\int\\frac{2x+3}{x^2+3x}\\,dx$.', 'Calcula $\\int\\frac{2x+3}{x^2+3x}\\,dx$.', 'احسب $\\int\\frac{2x+3}{x^2+3x}\\,dx$.', 'Work out $\\int\\frac{2x+3}{x^2+3x}\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbakitzailea izendatzailearen deribatua da.', 'El numerador es la derivada del denominador.', 'البسط مشتقة المقام.', 'The numerator is the derivative of the denominator.'), math: same('$(x^2+3x)\'=2x+3$') },
            { text: say('$\\frac{u\'}{u}$ formakoa da.', 'Tiene la forma $\\frac{u\'}{u}$.', 'إنها من الشكل $\\frac{u\'}{u}$.', 'It has the form $\\frac{u\'}{u}$.'), math: same('$\\int\\frac{u\'}{u}\\,dx=\\ln|u|$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$\\ln|x^2+3x|+k$') }
        ],
        takeaway: say('$\\int u\'e^u\\,dx=e^u+k$ eta $\\int\\frac{u\'}{u}\\,dx=\\ln|u|+k$. Integratu aurretik, begiratu goian beheko adierazpenaren deribatua dagoen.', '$\\int u\'e^u\\,dx=e^u+k$ y $\\int\\frac{u\'}{u}\\,dx=\\ln|u|+k$. Antes de integrar, mira si arriba está la derivada de lo de abajo.', '$\\int u\'e^u\\,dx=e^u+k$ و$\\int\\frac{u\'}{u}\\,dx=\\ln|u|+k$. قبل التكامل انظر هل في الأعلى مشتقة ما في الأسفل.', '$\\int u\'e^u\\,dx=e^u+k$ and $\\int\\frac{u\'}{u}\\,dx=\\ln|u|+k$. Before integrating, see whether the top is the derivative of the bottom.'),
        figure: (language) => <LogPatternFigure language={language} />
    },
    {
        id: 'adjust',
        stage: 'compound',
        title: say('Konstanteak doitzea', 'Ajustar constantes', 'ضبط الثوابت', 'Adjusting constants'),
        goal: say('$u\'$ deribatuari zenbaki bat falta zaionean, harekin biderkatu eta zatitzea, integral berehalako baten forma izateko.', 'Cuando a $u\'$ le falta un número, multiplicar y dividir por él para tener la forma de una integral inmediata.', 'عندما ينقص $u\'$ عدد، نضرب فيه ونقسم عليه لنحصل على شكل تكامل مباشر.', 'When $u\'$ is missing a number, multiply and divide by it to get the form of a basic integral.'),
        problem: say('Kalkulatu $\\int x\\cos(x^2)\\,dx$.', 'Calcula $\\int x\\cos(x^2)\\,dx$.', 'احسب $\\int x\\cos(x^2)\\,dx$.', 'Work out $\\int x\\cos(x^2)\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$u=x^2$ bada, $u\'=2x$: 2 bat falta da.', 'Con $u=x^2$, $u\'=2x$: falta un 2.', 'مع $u=x^2$ يكون $u\'=2x$: ينقص 2.', 'With $u=x^2$, $u\'=2x$: a 2 is missing.') },
            { text: say('Biderkatu barruan 2 zenbakiaz eta zatitu kanpoan.', 'Multiplica por 2 dentro y divide fuera.', 'اضرب في 2 في الداخل واقسم في الخارج.', 'Multiply by 2 inside and divide outside.'), math: same('$\\begin{aligned}&\\int x\\cos(x^2)\\,dx\\\\ &=\\frac{1}{2}\\int 2x\\cos(x^2)\\,dx\\end{aligned}$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$\\frac{1}{2}\\sin(x^2)+k$') }
        ],
        takeaway: say('Zenbakiak bakarrik doitu daitezke, ez letrak: barruan biderkatu eta kanpoan zatitzen da zenbaki berberaz. Adibidez, $\\int e^{5x}\\,dx=\\frac{e^{5x}}{5}+k$.', 'Solo se pueden ajustar números, no letras: se multiplica dentro y se divide fuera por el mismo número. Por ejemplo, $\\int e^{5x}\\,dx=\\frac{e^{5x}}{5}+k$.', 'لا نضبط إلا الأعداد لا الحروف: نضرب في الداخل ونقسم في الخارج على العدد نفسه. مثلًا $\\int e^{5x}\\,dx=\\frac{e^{5x}}{5}+k$.', 'Only numbers can be adjusted, not letters: multiply inside and divide outside by the same number. For example, $\\int e^{5x}\\,dx=\\frac{e^{5x}}{5}+k$.'),
        figure: (language) => <AdjustFigure language={language} />
    },

    /* ---------- 4. The definite integral ---------- */
    {
        id: 'rectangles',
        stage: 'definite',
        title: say('Azalera laukizuzenekin', 'Área con rectángulos', 'المساحة بالمستطيلات', 'Area with rectangles'),
        goal: say('Kurba baten azpiko azalera laukizuzenekin hurbiltzea, eta haiek estutzean batura zenbaki batera hurbiltzen dela ikustea: integral mugatua.', 'Aproximar el área bajo una curva con rectángulos y ver que, al estrecharlos, la suma se acerca a un número: la integral definida.', 'تقريب المساحة تحت منحنى بمستطيلات، ورؤية أن المجموع يقترب من عدد عند تضييقها: التكامل المحدد.', 'Approximate the area under a curve with rectangles and see that, as they get narrower, the sum approaches a number: the definite integral.'),
        problem: say('Hurbildu $f(x)=x^2$ kurbaren azpiko azalera, 0 eta 2 artean, 0,5 oinarriko 4 laukizuzenekin (altuera eskuinean).', 'Aproxima el área bajo $f(x)=x^2$ entre 0 y 2 con 4 rectángulos de base 0,5 (altura a la derecha).', 'قرّب المساحة تحت $f(x)=x^2$ بين 0 و2 بأربعة مستطيلات قاعدة كل منها 0.5 (الارتفاع عند اليمين).', 'Approximate the area under $f(x)=x^2$ between 0 and 2 with 4 rectangles of base 0.5 (height on the right).'),
        stepsKind: 'steps',
        steps: [
            { text: say('Altuerak.', 'Las alturas.', 'الارتفاعات.', 'The heights.'), math: same('$\\begin{aligned}&f(0{,}5)=0{,}25\\quad f(1)=1\\\\ &f(1{,}5)=2{,}25\\quad f(2)=4\\end{aligned}$') },
            { text: say('Azaleren batura.', 'La suma de las áreas.', 'مجموع المساحات.', 'The sum of the areas.'), math: same('$\\begin{aligned}&0{,}5\\cdot(0{,}25+1+2{,}25+4)\\\\ &=0{,}5\\cdot 7{,}5=3{,}75\\end{aligned}$') },
            { text: say('Laukizuzen gehiagorekin, batura $\\frac{8}{3}\\approx 2{,}67$ baliora jaisten da: hori da integrala.', 'Con más rectángulos la suma baja hacia $\\frac{8}{3}\\approx 2{,}67$: esa es la integral.', 'ومع مستطيلات أكثر ينزل المجموع نحو $\\frac{8}{3}\\approx 2{,}67$: هذا هو التكامل.', 'With more rectangles the sum goes down towards $\\frac{8}{3}\\approx 2{,}67$: that is the integral.') }
        ],
        takeaway: say('$a$ eta $b$ arteko azalera $f$ kurbaren azpian laukizuzenen baturak hurbiltzen diren zenbakia da, laukizuzenak estutzean: $\\int_a^b f(x)\\,dx$ integral mugatua.', 'El área bajo $f$ entre $a$ y $b$ es el número al que se acercan las sumas de rectángulos cuando se estrechan: la integral definida $\\int_a^b f(x)\\,dx$.', 'المساحة تحت $f$ بين $a$ و$b$ هي العدد الذي تقترب منه مجاميع المستطيلات عند تضييقها: التكامل المحدد $\\int_a^b f(x)\\,dx$.', 'The area under $f$ between $a$ and $b$ is the number the sums of rectangles approach as they get narrower: the definite integral $\\int_a^b f(x)\\,dx$.'),
        figure: (language) => <RectanglesFigure language={language} />
    },
    {
        id: 'barrow',
        stage: 'definite',
        title: say('Barrow-ren erregela', 'Regla de Barrow', 'قاعدة بارو', 'Barrow\'s rule'),
        goal: say('Integral mugatu bat jatorrizko batekin kalkulatzea: $\\int_a^b f(x)\\,dx=F(b)-F(a)$.', 'Calcular una integral definida con una primitiva: $\\int_a^b f(x)\\,dx=F(b)-F(a)$.', 'حساب تكامل محدد بدالة أصلية: $\\int_a^b f(x)\\,dx=F(b)-F(a)$.', 'Work out a definite integral with an antiderivative: $\\int_a^b f(x)\\,dx=F(b)-F(a)$.'),
        problem: say('Kalkulatu $\\int_0^2 x^2\\,dx$.', 'Calcula $\\int_0^2 x^2\\,dx$.', 'احسب $\\int_0^2 x^2\\,dx$.', 'Work out $\\int_0^2 x^2\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jatorrizko bat.', 'Una primitiva.', 'دالة أصلية.', 'An antiderivative.'), math: same('$F(x)=\\frac{x^3}{3}$') },
            { text: say('Goiko muga ken behekoa.', 'Límite de arriba menos el de abajo.', 'الحد الأعلى ناقص الأدنى.', 'Top limit minus bottom limit.'), math: same('$\\left[\\frac{x^3}{3}\\right]_0^2=\\frac{8}{3}-0=\\frac{8}{3}$') },
            { text: say('Laukizuzenak hurbiltzen ziren zenbakia da.', 'Es el número al que se acercaban los rectángulos.', 'إنه العدد الذي كانت المستطيلات تقترب منه.', 'It is the number the rectangles were approaching.') }
        ],
        takeaway: say('$\\int_a^b f(x)\\,dx=[F(x)]_a^b=F(b)-F(a)$, edozein $F$ jatorrizkorekin: $k$ konstantea desagertu egiten da kentzean.', '$\\int_a^b f(x)\\,dx=[F(x)]_a^b=F(b)-F(a)$, con cualquier primitiva $F$: la constante $k$ se anula al restar.', '$\\int_a^b f(x)\\,dx=[F(x)]_a^b=F(b)-F(a)$ بأي دالة أصلية $F$: يختفي الثابت $k$ عند الطرح.', '$\\int_a^b f(x)\\,dx=[F(x)]_a^b=F(b)-F(a)$, with any antiderivative $F$: the constant $k$ cancels when subtracting.'),
        figure: (language) => <BarrowFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'properties',
        stage: 'definite',
        title: say('Integral mugatuaren propietateak', 'Propiedades de la integral definida', 'خصائص التكامل المحدد', 'Properties of the definite integral'),
        goal: say('Integral mugatuak baturak eta konstanteak banatzen dituela, mugak alderantzikatzean zeinua aldatzen duela eta tarteko puntu batean zatitu daitekeela erabiltzea.', 'Usar que la integral definida reparte sumas y constantes, cambia de signo al invertir los límites y se puede partir en un punto intermedio.', 'استعمال أن التكامل المحدد يوزّع المجاميع والثوابت، ويغيّر إشارته عند قلب الحدين، ويمكن تقسيمه عند نقطة وسطى.', 'Use that the definite integral splits sums and constants, changes sign when the limits are swapped and can be split at a point in between.'),
        problem: say('$\\int_0^3 f(x)\\,dx=5$ eta $\\int_3^7 f(x)\\,dx=2$ badira, kalkulatu $\\int_0^7 f(x)\\,dx$ eta $\\int_7^3 f(x)\\,dx$.', 'Si $\\int_0^3 f(x)\\,dx=5$ y $\\int_3^7 f(x)\\,dx=2$, calcula $\\int_0^7 f(x)\\,dx$ y $\\int_7^3 f(x)\\,dx$.', 'إذا كان $\\int_0^3 f(x)\\,dx=5$ و$\\int_3^7 f(x)\\,dx=2$ فاحسب $\\int_0^7 f(x)\\,dx$ و$\\int_7^3 f(x)\\,dx$.', 'If $\\int_0^3 f(x)\\,dx=5$ and $\\int_3^7 f(x)\\,dx=2$, work out $\\int_0^7 f(x)\\,dx$ and $\\int_7^3 f(x)\\,dx$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('3 puntuan zatitzen da.', 'Se parte en 3.', 'نقسم عند 3.', 'Split at 3.'), math: same('$\\int_0^7 f(x)\\,dx=5+2=7$') },
            { text: say('Mugak alderantziz: zeinua aldatzen da.', 'Límites al revés: cambia el signo.', 'الحدّان بالعكس: تتغير الإشارة.', 'Limits the other way round: the sign changes.'), math: same('$\\int_7^3 f(x)\\,dx=-2$') }
        ],
        takeaway: say('$\\int_a^c f(x)\\,dx=\\int_a^b f(x)\\,dx+\\int_b^c f(x)\\,dx$ eta $\\int_b^a f(x)\\,dx=-\\int_a^b f(x)\\,dx$. Gainera, baturak eta konstanteak integraletik atera daitezke.', '$\\int_a^c f(x)\\,dx=\\int_a^b f(x)\\,dx+\\int_b^c f(x)\\,dx$ y $\\int_b^a f(x)\\,dx=-\\int_a^b f(x)\\,dx$. Además, las sumas y las constantes salen de la integral.', '$\\int_a^c f(x)\\,dx=\\int_a^b f(x)\\,dx+\\int_b^c f(x)\\,dx$ و$\\int_b^a f(x)\\,dx=-\\int_a^b f(x)\\,dx$. كما تخرج المجاميع والثوابت من التكامل.', '$\\int_a^c f(x)\\,dx=\\int_a^b f(x)\\,dx+\\int_b^c f(x)\\,dx$ and $\\int_b^a f(x)\\,dx=-\\int_a^b f(x)\\,dx$. Also, sums and constants come out of the integral.'),
        figure: (language) => <PropertiesFigure language={language} />
    },

    /* ---------- 5. Areas ---------- */
    {
        id: 'area-axis',
        stage: 'areas',
        title: say('Kurba baten azpiko azalera', 'Área bajo una curva', 'المساحة تحت منحنى', 'Area under a curve'),
        goal: say('Kurba positibo baten, X ardatzaren eta bi zuzen bertikalen arteko azalera Barrow-ren erregelarekin kalkulatzea.', 'Calcular el área entre una curva positiva, el eje X y dos rectas verticales con la regla de Barrow.', 'حساب المساحة بين منحنى موجب ومحور X ومستقيمين رأسيين بقاعدة بارو.', 'Work out the area between a positive curve, the x-axis and two vertical lines with Barrow\'s rule.'),
        problem: say('Aurkitu $f(x)=4-x^2$ kurbaren eta X ardatzaren arteko azalera.', 'Halla el área entre $f(x)=4-x^2$ y el eje X.', 'أوجد المساحة بين $f(x)=4-x^2$ ومحور X.', 'Find the area between $f(x)=4-x^2$ and the x-axis.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ardatzarekiko ebaki-puntuak: $x=\\pm 2$.', 'Cortes con el eje: $x=\\pm 2$.', 'التقاطع مع المحور: $x=\\pm 2$.', 'Where it meets the axis: $x=\\pm 2$.'), math: same('$4-x^2=0$') },
            { text: say('Barrow-ren erregela.', 'La regla de Barrow.', 'قاعدة بارو.', 'Barrow\'s rule.'), math: same('$\\left[4x-\\frac{x^3}{3}\\right]_{-2}^{2}=\\frac{16}{3}+\\frac{16}{3}$') },
            { text: say('Azalera $\\frac{32}{3}$ u² da.', 'El área es $\\frac{32}{3}$ u².', 'المساحة $\\frac{32}{3}$ وحدة مربعة.', 'The area is $\\frac{32}{3}$ square units.') }
        ],
        takeaway: say('$[a,b]$ tartean $f\\ge 0$ bada, kurbaren eta X ardatzaren arteko azalera $\\int_a^b f(x)\\,dx$ da. Mugak ematen ez badituzte, ardatzarekiko ebaki-puntuak dira.', 'Si $f\\ge 0$ en $[a,b]$, el área entre la curva y el eje X es $\\int_a^b f(x)\\,dx$. Si no te dan los límites, son los cortes con el eje.', 'إذا كان $f\\ge 0$ في $[a,b]$ فالمساحة بين المنحنى ومحور X هي $\\int_a^b f(x)\\,dx$. وإذا لم يُعطَ الحدّان فهما نقطتا التقاطع مع المحور.', 'If $f\\ge 0$ on $[a,b]$, the area between the curve and the x-axis is $\\int_a^b f(x)\\,dx$. If the limits are not given, they are where the curve meets the axis.'),
        figure: (language) => <AreaAxisFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'area-sign',
        stage: 'areas',
        title: say('Ardatza mozten duten kurbak', 'Curvas que cortan el eje', 'منحنيات تقطع المحور', 'Curves that cross the axis'),
        goal: say('Kurba ardatzaren azpitik pasatzen denean azalera aurkitzea: ebaki-puntuetan zatitu eta balio absolutuak batu.', 'Hallar el área cuando la curva pasa por debajo del eje: partir en los cortes y sumar los valores absolutos.', 'إيجاد المساحة عندما يمر المنحنى تحت المحور: نقسم عند نقاط التقاطع ونجمع القيم المطلقة.', 'Find the area when the curve goes below the axis: split at the crossings and add the absolute values.'),
        problem: say('Aurkitu $f(x)=x^2-2x$ kurbaren eta X ardatzaren arteko azalera $[0,\\,3]$ tartean.', 'Halla el área entre $f(x)=x^2-2x$ y el eje X en $[0,\\,3]$.', 'أوجد المساحة بين $f(x)=x^2-2x$ ومحور X في $[0,\\,3]$.', 'Find the area between $f(x)=x^2-2x$ and the x-axis on $[0,\\,3]$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebakia $x=2$ puntuan: ardatzaren azpian $(0,\\,2)$ tartean, gainean $(2,\\,3)$ tartean.', 'Corte en $x=2$: debajo del eje en $(0,\\,2)$, encima en $(2,\\,3)$.', 'تقاطع عند $x=2$: تحت المحور في $(0,\\,2)$ وفوقه في $(2,\\,3)$.', 'A crossing at $x=2$: below the axis on $(0,\\,2)$, above on $(2,\\,3)$.') },
            { text: say('Bi integralak.', 'Las dos integrales.', 'التكاملان.', 'The two integrals.'), math: same('$\\begin{aligned}&\\int_0^2(x^2-2x)\\,dx=-\\frac{4}{3}\\\\ &\\int_2^3(x^2-2x)\\,dx=\\frac{4}{3}\\end{aligned}$') },
            { text: say('Azalera: $\\frac{4}{3}+\\frac{4}{3}=\\frac{8}{3}$ u². 0 eta 3 arteko integrala 0 da: hori ez da azalera.', 'Área: $\\frac{4}{3}+\\frac{4}{3}=\\frac{8}{3}$ u². La integral de 0 a 3 da 0: no es el área.', 'المساحة: $\\frac{4}{3}+\\frac{4}{3}=\\frac{8}{3}$ وحدة مربعة. والتكامل من 0 إلى 3 يساوي 0: ليس المساحة.', 'Area: $\\frac{4}{3}+\\frac{4}{3}=\\frac{8}{3}$ square units. The integral from 0 to 3 is 0: it is not the area.') }
        ],
        takeaway: say('Integralak negatibo gisa zenbatzen du ardatzaren azpian geratzen dena. Azalerarako, ebaki-puntuetan zatitzen da eta balio absolutuak batzen dira.', 'La integral cuenta en negativo lo que queda bajo el eje. Para el área, se parte en los cortes y se suman los valores absolutos.', 'يحسب التكامل ما تحت المحور بالسالب. وللمساحة نقسم عند نقاط التقاطع ونجمع القيم المطلقة.', 'The integral counts what is below the axis as negative. For the area, split at the crossings and add the absolute values.'),
        figure: (language) => <AreaSignFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'between-curves',
        stage: 'areas',
        title: say('Bi kurben arteko azalera', 'Área entre dos curvas', 'المساحة بين منحنيين', 'Area between two curves'),
        goal: say('Bi kurbaren artean itxitako azalera kalkulatzea: ebaki-puntuek mugak ematen dituzte, eta goikoa ken behekoa integratzen da.', 'Calcular el área encerrada entre dos curvas: los cortes dan los límites y se integra la de arriba menos la de abajo.', 'حساب المساحة المحصورة بين منحنيين: نقاط التقاطع تعطي الحدّين ونكامل الأعلى ناقص الأدنى.', 'Work out the area enclosed between two curves: the crossings give the limits and you integrate the top one minus the bottom one.'),
        problem: say('Aurkitu $f(x)=x^2$ eta $g(x)=2x$ kurben arteko azalera.', 'Halla el área entre $f(x)=x^2$ y $g(x)=2x$.', 'أوجد المساحة بين $f(x)=x^2$ و$g(x)=2x$.', 'Find the area between $f(x)=x^2$ and $g(x)=2x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ebaki-puntuak.', 'Los cortes.', 'نقاط التقاطع.', 'The crossings.'), math: same('$x^2=2x\\ \\to\\ x=0,\\ x=2$') },
            { text: say('Goian $2x$ dago.', 'Arriba está $2x$.', 'في الأعلى $2x$.', 'On top is $2x$.'), math: same('$\\int_0^2(2x-x^2)\\,dx=\\left[x^2-\\frac{x^3}{3}\\right]_0^2$') },
            { text: say('Azalera: $4-\\frac{8}{3}=\\frac{4}{3}$ u².', 'Área: $4-\\frac{8}{3}=\\frac{4}{3}$ u².', 'المساحة: $4-\\frac{8}{3}=\\frac{4}{3}$ وحدة مربعة.', 'Area: $4-\\frac{8}{3}=\\frac{4}{3}$ square units.') }
        ],
        takeaway: say('$a$ eta $b$ artean, bi kurben arteko azalera $\\int_a^b(f-g)\\,dx$ da, $f$ goikoa izanik. Barruan gurutzatzen badira, ebaki-puntuetan zatitzen da.', 'Entre $a$ y $b$, el área entre dos curvas es $\\int_a^b(f-g)\\,dx$, con $f$ la de arriba. Si se cruzan dentro, se parte en los cortes.', 'بين $a$ و$b$ المساحة بين منحنيين هي $\\int_a^b(f-g)\\,dx$ حيث $f$ الأعلى. وإذا تقاطعا في الداخل نقسم عند نقاط التقاطع.', 'Between $a$ and $b$, the area between two curves is $\\int_a^b(f-g)\\,dx$, with $f$ the top one. If they cross inside, split at the crossings.'),
        figure: (language) => <BetweenCurvesFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts), in each language's trigonometric names */
export const bachIntegralsTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...localizeNames(bachIntegralsLessonTexts[topic.id as BachIntegralsTopicId]),
    ...localizeNames(bachIntegralsLessonChecks[topic.id as BachIntegralsTopicId])
}))

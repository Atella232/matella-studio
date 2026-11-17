import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { same, say } from '../batx1-zientziak-funtzioak/text'
import { BracketsFigure, BranchesFigure, ConjugateFigure, ContinuousFigure, DegreesFigure, DiscontinuitiesFigure, FairTariffFigure, KZeroFigure, LongRunFigure, NumberEFigure, OneSidedFigure, ParameterFigure, ZeroZeroFigure } from './figures'
import { bach2gLimitsLessonChecks, type Bach2gLimitsTopicId } from './lessonChecks'
import { bach2gLimitsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 2 · Gizarte Zientziak —
   stages and lessons. The scope follows unit 5 of Santillana 2.º
   Bachillerato Ciencias Sociales and unit 5 of Anaya Matemáticas
   Aplicadas a las CCSS II, in their order: limits read on a graph,
   working with infinity, limits at ±∞ (degrees, the conjugate, 1^∞),
   limits at a point (one-sided, k/0, 0/0), continuity with parameters,
   and a last stage with the problems of economy and society both books
   end with (the long run, tariffs by brackets). Neither book has ε and δ,
   sin x / x, Bolzano or Weierstrass, so this unit leaves them out
   (owner, 2026-11-17); the asymptotes go to «Representación de
   funciones».
   ========================================================================== */

export type Bach2gLimitsStageId = 'graph' | 'infinity' | 'point' | 'continuity' | 'context'

export const bach2gLimitsStages: UnitStage[] = [
    { id: 'graph', tone: 'blue', title: { eu: 'Grafikoa eta infinitua', es: 'La gráfica y el infinito', en: 'The graph and infinity', ar: 'التمثيل البياني واللانهاية' } },
    { id: 'infinity', tone: 'violet', title: { eu: 'Limiteak infinituan', es: 'Límites en el infinito', en: 'Limits at infinity', ar: 'النهايات عند اللانهاية' } },
    { id: 'point', tone: 'mustard', title: { eu: 'Limiteak puntu batean', es: 'Límites en un punto', en: 'Limits at a point', ar: 'النهايات عند نقطة' } },
    { id: 'continuity', tone: 'coral', title: { eu: 'Jarraitutasuna', es: 'Continuidad', en: 'Continuity', ar: 'الاتصال' } },
    { id: 'context', tone: 'green', title: { eu: 'Ekonomian eta gizartean', es: 'En economía y sociedad', en: 'In economy and society', ar: 'في الاقتصاد والمجتمع' } }
]

const LIMITS1 = 'batx1-zientziak/limites-continuidad'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. The graph and infinity ---------- */
    {
        id: 'branches',
        stage: 'graph',
        title: say('Limiteak grafikoan', 'Límites en la gráfica', 'النهايات على التمثيل البياني', 'Limits on the graph'),
        goal: say('Funtzio baten grafikoan haren limiteak irakurtzea: $\\pm\\infty$ aldera eta puntu baten alde bakoitzean.', 'Leer en la gráfica de una función sus límites: hacia $\\pm\\infty$ y a cada lado de un punto.', 'قراءة نهايات دالة على تمثيلها البياني: نحو $\\pm\\infty$ وعلى جانبي نقطة.', 'Read the limits of a function on its graph: towards $\\pm\\infty$ and on each side of a point.'),
        needs: [
            { unit: LIMITS1, topic: 'idea', title: { eu: 'Limitearen ideia', es: 'La idea de límite', en: 'The idea of a limit', ar: 'فكرة النهاية' } },
            { unit: LIMITS1, topic: 'infinite', title: { eu: 'Limite infinituak', es: 'Límites infinitos', en: 'Infinite limits', ar: 'النهايات اللانهائية' } }
        ],
        problem: say('Irakurri $f(x)=\\frac{2x}{x-2}$ funtzioaren lau limiteak grafikoan: $-\\infty$ aldera, $+\\infty$ aldera eta 2 zenbakiaren alde bakoitzean.', 'Lee en la gráfica los cuatro límites de $f(x)=\\frac{2x}{x-2}$: hacia $-\\infty$, hacia $+\\infty$ y a cada lado de 2.', 'اقرأ على التمثيل البياني النهايات الأربع للدالة $f(x)=\\frac{2x}{x-2}$: نحو $-\\infty$ ونحو $+\\infty$ وعلى جانبي 2.', 'Read on the graph the four limits of $f(x)=\\frac{2x}{x-2}$: towards $-\\infty$, towards $+\\infty$ and on each side of 2.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerrerantz, kurba $y=2$ zuzenera hurbiltzen da.', 'Hacia la izquierda, la curva se pega a la recta $y=2$.', 'نحو اليسار يقترب المنحنى من المستقيم $y=2$.', 'To the left, the curve hugs the line $y=2$.'), math: same('$\\lim_{x\\to-\\infty}f(x)=2$') },
            { text: say('Eskuinerantz ere bai.', 'Hacia la derecha, también.', 'ونحو اليمين أيضًا.', 'To the right, too.'), math: same('$\\lim_{x\\to+\\infty}f(x)=2$') },
            { text: say('2 zenbakitik oso hurbil, ezkerrean behera doa mugarik gabe eta eskuinean gora.', 'Muy cerca de 2, por la izquierda baja sin fin y por la derecha sube.', 'قرب 2 جدًا ينزل بلا حد من اليسار ويصعد من اليمين.', 'Very close to 2, on the left it falls without end and on the right it rises.'), math: same('$\\lim_{x\\to 2^-}f(x)=-\\infty\\qquad\\lim_{x\\to 2^+}f(x)=+\\infty$') }
        ],
        takeaway: say('$\\lim_{x\\to\\pm\\infty}f(x)=L$: kurba $y=L$ zuzenera hurbiltzen da muturretan. $\\lim_{x\\to a^\\pm}f(x)=\\pm\\infty$: $x=a$ zuzenaren ondoan gora edo behera doa mugarik gabe. Alde bakoitza bere aldetik irakurtzen da.', '$\\lim_{x\\to\\pm\\infty}f(x)=L$: la curva se pega a la recta $y=L$ en los extremos. $\\lim_{x\\to a^\\pm}f(x)=\\pm\\infty$: junto a la recta $x=a$ sube o baja sin fin. Cada lado se lee por separado.', '$\\lim_{x\\to\\pm\\infty}f(x)=L$: يقترب المنحنى من المستقيم $y=L$ عند الطرفين. و$\\lim_{x\\to a^\\pm}f(x)=\\pm\\infty$: قرب المستقيم $x=a$ يصعد أو ينزل بلا حد. ويُقرأ كل جانب وحده.', '$\\lim_{x\\to\\pm\\infty}f(x)=L$: the curve hugs the line $y=L$ at the ends. $\\lim_{x\\to a^\\pm}f(x)=\\pm\\infty$: next to the line $x=a$ it rises or falls without end. Each side is read on its own.'),
        figure: (language) => <BranchesFigure language={language} />
    },
    {
        id: 'infinity-arithmetic',
        stage: 'graph',
        title: say('Infinituarekin eragiketak', 'Operar con el infinito', 'الحساب مع اللانهاية', 'Working with infinity'),
        goal: say('Bi funtzioren limiteak jakinda, haien batura, biderkadura eta zatiduraren limitea ematea, infinitua tartean dagoenean ere.', 'Sabiendo los límites de dos funciones, dar el de su suma, su producto y su cociente, también cuando hay infinitos.', 'معرفة نهاية المجموع والجداء وخارج القسمة لدالتين نعرف نهايتيهما، حتى مع اللانهاية.', 'Knowing the limits of two functions, give the limit of their sum, product and quotient, also when infinity is involved.'),
        needs: [
            { unit: LIMITS1, topic: 'substitute', title: { eu: 'Ordezkatu eta infinituekin kalkulatu', es: 'Sustituir y operar con infinitos', en: 'Substituting and working with infinity', ar: 'التعويض والحساب مع اللانهاية' } }
        ],
        problem: say('$x\\to+\\infty$ denean, $f(x)\\to+\\infty$ eta $g(x)\\to-3$. Zein da $f+g$, $f\\cdot g$, $\\frac{g}{f}$ eta $\\frac{f}{g}$ funtzioen limitea?', 'Cuando $x\\to+\\infty$, $f(x)\\to+\\infty$ y $g(x)\\to-3$. ¿Cuál es el límite de $f+g$, $f\\cdot g$, $\\frac{g}{f}$ y $\\frac{f}{g}$?', 'عندما $x\\to+\\infty$ يكون $f(x)\\to+\\infty$ و$g(x)\\to-3$. ما نهاية $f+g$ و$f\\cdot g$ و$\\frac{g}{f}$ و$\\frac{f}{g}$؟', 'As $x\\to+\\infty$, $f(x)\\to+\\infty$ and $g(x)\\to-3$. What is the limit of $f+g$, $f\\cdot g$, $\\frac{g}{f}$ and $\\frac{f}{g}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Infinituari zenbaki bat gehituz, infinitua geratzen da.', 'Infinito más un número sigue siendo infinito.', 'اللانهاية زائد عدد تبقى لانهاية.', 'Infinity plus a number is still infinity.'), math: same('$(+\\infty)+(-3)=+\\infty$') },
            { text: say('Biderkatzean, zeinuen araua.', 'Al multiplicar, la regla de los signos.', 'عند الضرب: قاعدة الإشارات.', 'When multiplying, the rule of signs.'), math: same('$(+\\infty)\\cdot(-3)=-\\infty$') },
            { text: say('Zenbaki bat zati infinitu, 0; infinitu zati zenbaki bat, infinitu, zeinuarekin.', 'Un número entre infinito da 0; infinito entre un número, infinito con su signo.', 'عدد على لانهاية يساوي 0؛ ولانهاية على عدد تساوي لانهاية بإشارتها.', 'A number over infinity gives 0; infinity over a number, infinity with its sign.'), math: same('$\\frac{-3}{+\\infty}=0\\qquad\\frac{+\\infty}{-3}=-\\infty$') }
        ],
        takeaway: say('$\\infty+k=\\infty$, $k\\cdot\\infty=\\pm\\infty$ ($k\\neq 0$), $\\frac{k}{\\infty}=0$ eta $\\frac{\\infty}{k}=\\pm\\infty$; zeinua zeinuen arauarekin. Arau hauek ez dute balio indeterminazioekin.', '$\\infty+k=\\infty$, $k\\cdot\\infty=\\pm\\infty$ (con $k\\neq 0$), $\\frac{k}{\\infty}=0$ y $\\frac{\\infty}{k}=\\pm\\infty$; el signo, con la regla de los signos. Estas reglas no sirven en las indeterminaciones.', '$\\infty+k=\\infty$ و$k\\cdot\\infty=\\pm\\infty$ (مع $k\\neq 0$) و$\\frac{k}{\\infty}=0$ و$\\frac{\\infty}{k}=\\pm\\infty$؛ والإشارة بقاعدة الإشارات. ولا تصلح هذه القواعد في حالات عدم التعيين.', '$\\infty+k=\\infty$, $k\\cdot\\infty=\\pm\\infty$ (with $k\\neq 0$), $\\frac{k}{\\infty}=0$ and $\\frac{\\infty}{k}=\\pm\\infty$; the sign by the rule of signs. These rules do not work for indeterminate forms.')
    },
    {
        id: 'indeterminate',
        stage: 'graph',
        title: say('Indeterminazioa ala ez?', '¿Indeterminación o no?', 'عدم تعيين أم لا؟', 'Indeterminate or not?'),
        goal: say('Zazpi indeterminazioak ezagutzea eta emaitza zuzenean ematen duten formetatik bereiztea.', 'Reconocer las siete indeterminaciones y distinguirlas de las formas que dan el resultado directamente.', 'التعرّف على حالات عدم التعيين السبع وتمييزها من الصور التي تعطي النتيجة مباشرة.', 'Recognise the seven indeterminate forms and tell them apart from the forms that give the result directly.'),
        problem: say('$x\\to 4$ denean, $f\\to+\\infty$, $g\\to+\\infty$, $h\\to 0$ eta $u\\to 1$. Zein dira indeterminazioak: $f-g$, $f\\cdot h$, $\\frac{f}{g}$, $u^{f}$ eta $f^{u}$?', 'Cuando $x\\to 4$, $f\\to+\\infty$, $g\\to+\\infty$, $h\\to 0$ y $u\\to 1$. ¿Cuáles son indeterminaciones: $f-g$, $f\\cdot h$, $\\frac{f}{g}$, $u^{f}$ y $f^{u}$?', 'عندما $x\\to 4$ يكون $f\\to+\\infty$ و$g\\to+\\infty$ و$h\\to 0$ و$u\\to 1$. أيها حالات عدم تعيين: $f-g$ و$f\\cdot h$ و$\\frac{f}{g}$ و$u^{f}$ و$f^{u}$؟', 'As $x\\to 4$, $f\\to+\\infty$, $g\\to+\\infty$, $h\\to 0$ and $u\\to 1$. Which are indeterminate: $f-g$, $f\\cdot h$, $\\frac{f}{g}$, $u^{f}$ and $f^{u}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru forma indeterminazioak dira.', 'Tres formas son indeterminaciones.', 'ثلاث صور حالات عدم تعيين.', 'Three forms are indeterminate.'), math: same('$\\infty-\\infty\\qquad 0\\cdot\\infty\\qquad\\frac{\\infty}{\\infty}$') },
            { text: say('$u^{f}$ forma $1^{\\infty}$ da: indeterminazioa ere bai.', '$u^{f}$ es $1^{\\infty}$: también indeterminación.', '$u^{f}$ صورتها $1^{\\infty}$: عدم تعيين أيضًا.', '$u^{f}$ is $1^{\\infty}$: indeterminate too.'), math: same('$1^{\\infty}$') },
            { text: say('$f^{u}$ forma $\\infty^{1}$ da: ez da indeterminazioa.', '$f^{u}$ es $\\infty^{1}$: no es indeterminación.', '$f^{u}$ صورتها $\\infty^{1}$: ليست عدم تعيين.', '$f^{u}$ is $\\infty^{1}$: not indeterminate.'), math: same('$(+\\infty)^{1}=+\\infty$') }
        ],
        takeaway: say('Zazpi indeterminazio daude: $\\infty-\\infty$, $0\\cdot\\infty$, $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $1^{\\infty}$, $\\infty^{0}$ eta $0^{0}$. Haietan emaitza edozein izan daiteke: eragiketak egin behar dira. Beste formek, $\\frac{k}{0}$ barne, emaitza ematen dute.', 'Hay siete indeterminaciones: $\\infty-\\infty$, $0\\cdot\\infty$, $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $1^{\\infty}$, $\\infty^{0}$ y $0^{0}$. En ellas el resultado puede ser cualquiera: hay que operar. Las demás formas, también $\\frac{k}{0}$, dan el resultado.', 'هناك سبع حالات عدم تعيين: $\\infty-\\infty$ و$0\\cdot\\infty$ و$\\frac{0}{0}$ و$\\frac{\\infty}{\\infty}$ و$1^{\\infty}$ و$\\infty^{0}$ و$0^{0}$. وفيها قد تكون النتيجة أي شيء: يجب الحساب. أما الصور الأخرى، ومنها $\\frac{k}{0}$، فتعطي النتيجة.', 'There are seven indeterminate forms: $\\infty-\\infty$, $0\\cdot\\infty$, $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $1^{\\infty}$, $\\infty^{0}$ and $0^{0}$. With them the result can be anything: you must work. The other forms, $\\frac{k}{0}$ included, give the result.')
    },

    /* ---------- 2. Limits at infinity ---------- */
    {
        id: 'degrees',
        stage: 'infinity',
        title: say('Maila handienak irabazten du', 'Gana el de mayor grado', 'تفوز الدرجة الأكبر', 'The highest degree wins'),
        goal: say('Polinomioen eta haien zatiduren limitea $\\pm\\infty$ aldera kalkulatzea, maila handieneko gaiari begira.', 'Calcular el límite en $\\pm\\infty$ de polinomios y cocientes de polinomios mirando el término de mayor grado.', 'حساب نهاية الحدوديات وخوارج قسمتها عند $\\pm\\infty$ بالنظر إلى الحد ذي الدرجة الأكبر.', 'Work out the limit at $\\pm\\infty$ of polynomials and quotients of polynomials by looking at the term of highest degree.'),
        needs: [
            { unit: LIMITS1, topic: 'degrees', title: { eu: 'Polinomioen zatidurak infinituan', es: 'Cocientes de polinomios en el infinito', en: 'Quotients of polynomials at infinity', ar: 'خوارج قسمة الحدوديات عند اللانهاية' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to+\\infty}\\frac{4x^2-3x}{2x^2+1}$ eta $\\lim_{x\\to-\\infty}(x^3-6x^2)$.', 'Calcula $\\lim_{x\\to+\\infty}\\frac{4x^2-3x}{2x^2+1}$ y $\\lim_{x\\to-\\infty}(x^3-6x^2)$.', 'احسب $\\lim_{x\\to+\\infty}\\frac{4x^2-3x}{2x^2+1}$ و$\\lim_{x\\to-\\infty}(x^3-6x^2)$.', 'Work out $\\lim_{x\\to+\\infty}\\frac{4x^2-3x}{2x^2+1}$ and $\\lim_{x\\to-\\infty}(x^3-6x^2)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatiduran $\\frac{\\infty}{\\infty}$ da. Maila bera goian eta behean: koefiziente nagusien zatidura.', 'El cociente da $\\frac{\\infty}{\\infty}$. Mismo grado arriba y abajo: el cociente de los coeficientes principales.', 'خارج القسمة يعطي $\\frac{\\infty}{\\infty}$. الدرجة نفسها في البسط والمقام: خارج قسمة المعاملين الرئيسيين.', 'The quotient gives $\\frac{\\infty}{\\infty}$. Same degree on top and below: the quotient of the leading coefficients.'), math: same('$\\frac{4x^2}{2x^2}=2$') },
            { text: say('Polinomioan $x^3$ gaiak agintzen du.', 'En el polinomio manda $x^3$.', 'في الحدودية يتحكم $x^3$.', 'In the polynomial $x^3$ rules.'), math: same('$x^3-6x^2=x^3\\left(1-\\frac{6}{x}\\right)$') },
            { text: say('$x\\to-\\infty$ denean, kubo bat negatiboa da.', 'Cuando $x\\to-\\infty$, un cubo es negativo.', 'عندما $x\\to-\\infty$ يكون المكعب سالبًا.', 'As $x\\to-\\infty$, a cube is negative.'), math: same('$(-\\infty)^3\\cdot 1=-\\infty$') }
        ],
        takeaway: say('$\\pm\\infty$ aldera, polinomio batean maila handieneko gaiak agintzen du. Zatidura batean: maila handiagoa goian, $\\pm\\infty$; behean, 0; bera, koefiziente nagusien zatidura. $x\\to-\\infty$ denean, kontuz zeinuarekin.', 'En $\\pm\\infty$, en un polinomio manda el término de mayor grado. En un cociente: más grado arriba, $\\pm\\infty$; abajo, 0; el mismo, el cociente de los coeficientes principales. Si $x\\to-\\infty$, cuidado con el signo.', 'عند $\\pm\\infty$ يتحكم في الحدودية الحد ذو الدرجة الأكبر. وفي خارج القسمة: درجة أكبر في البسط تعطي $\\pm\\infty$، وفي المقام 0، والدرجة نفسها خارج قسمة المعاملين الرئيسيين. وإذا كان $x\\to-\\infty$ فانتبه للإشارة.', 'At $\\pm\\infty$, in a polynomial the term of highest degree rules. In a quotient: higher degree on top, $\\pm\\infty$; below, 0; the same, the quotient of the leading coefficients. If $x\\to-\\infty$, mind the sign.'),
        figure: (language) => <DegreesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'conjugate',
        stage: 'infinity',
        title: say('Infinitu ken infinitu erroekin', 'Infinito menos infinito con raíces', 'لانهاية ناقص لانهاية مع الجذور', 'Infinity minus infinity with roots'),
        goal: say('Erro bat duen $\\infty-\\infty$ indeterminazioa konjokatuaz biderkatuz ebaztea, eta zatikiekin izendatzaile komuna erabiliz.', 'Resolver la indeterminación $\\infty-\\infty$ con una raíz multiplicando por el conjugado, y con fracciones usando un denominador común.', 'حل حالة عدم التعيين $\\infty-\\infty$ التي فيها جذر بالضرب في المرافق، ومع الكسور بتوحيد المقامات.', 'Resolve the indeterminate form $\\infty-\\infty$ with a root by multiplying by the conjugate, and with fractions by using a common denominator.'),
        needs: [
            { unit: LIMITS1, topic: 'infinity-minus', title: { eu: 'Infinitu ken infinitu', es: 'Infinito menos infinito', en: 'Infinity minus infinity', ar: 'لانهاية ناقص لانهاية' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+4x}-x\\right)$.', 'Calcula $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+4x}-x\\right)$.', 'احسب $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+4x}-x\\right)$.', 'Work out $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+4x}-x\\right)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\infty-\\infty$ da: biderkatu eta zatitu konjokatuaz.', 'Sale $\\infty-\\infty$: multiplica y divide por el conjugado.', 'تظهر $\\infty-\\infty$: اضرب واقسم على المرافق.', 'It gives $\\infty-\\infty$: multiply and divide by the conjugate.'), math: same('$\\frac{(x^2+4x)-x^2}{\\sqrt{x^2+4x}+x}=\\frac{4x}{\\sqrt{x^2+4x}+x}$') },
            { text: say('Orain $\\frac{\\infty}{\\infty}$ da: behean $\\sqrt{x^2}+x$ bezala hazten da, hau da, $2x$ bezala.', 'Ahora es $\\frac{\\infty}{\\infty}$: abajo crece como $\\sqrt{x^2}+x$, es decir, como $2x$.', 'صارت $\\frac{\\infty}{\\infty}$: المقام يكبر مثل $\\sqrt{x^2}+x$ أي مثل $2x$.', 'Now it is $\\frac{\\infty}{\\infty}$: the bottom grows like $\\sqrt{x^2}+x$, that is, like $2x$.') },
            { text: say('Maila bera: koefizienteen zatidura.', 'Mismo grado: el cociente de los coeficientes.', 'الدرجة نفسها: خارج قسمة المعاملين.', 'Same degree: the quotient of the coefficients.'), math: same('$\\frac{4x}{2x}=2$') }
        ],
        takeaway: say('$\\infty-\\infty$ zatidura bihurtzen da: erroekin, konjokatuaz biderkatuz eta zatituz ($(\\sqrt{A}-B)(\\sqrt{A}+B)=A-B^2$); zatikiekin, izendatzaile komunarekin. Gero, mailak alderatzen dira.', '$\\infty-\\infty$ se convierte en un cociente: con raíces, multiplicando y dividiendo por el conjugado ($(\\sqrt{A}-B)(\\sqrt{A}+B)=A-B^2$); con fracciones, con un denominador común. Después se comparan los grados.', 'تتحول $\\infty-\\infty$ إلى خارج قسمة: مع الجذور بالضرب والقسمة على المرافق ($(\\sqrt{A}-B)(\\sqrt{A}+B)=A-B^2$)، ومع الكسور بتوحيد المقامات. ثم نقارن الدرجات.', '$\\infty-\\infty$ becomes a quotient: with roots, by multiplying and dividing by the conjugate ($(\\sqrt{A}-B)(\\sqrt{A}+B)=A-B^2$); with fractions, with a common denominator. Then compare the degrees.'),
        figure: (language) => <ConjugateFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'number-e',
        stage: 'infinity',
        title: say('Bat infinitura berretuta eta e zenbakia', 'Uno elevado a infinito y el número e', 'واحد أس لانهاية والعدد e', 'One to the power of infinity and the number e'),
        goal: say('$1^{\\infty}$ indeterminazioa $e$ zenbakiaren formularekin ebaztea.', 'Resolver la indeterminación $1^{\\infty}$ con la fórmula del número $e$.', 'حل حالة عدم التعيين $1^{\\infty}$ بصيغة العدد $e$.', 'Resolve the indeterminate form $1^{\\infty}$ with the formula of the number $e$.'),
        needs: [
            { unit: LIMITS1, topic: 'e-limits', title: { eu: 'Bat infinitura berretuta eta e zenbakia', es: 'Uno elevado a infinito y el número e', en: 'One to the power of infinity and the number e', ar: 'واحد أس لانهاية والعدد e' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to+\\infty}\\left(1+\\frac{2}{x}\\right)^{3x}$.', 'Calcula $\\lim_{x\\to+\\infty}\\left(1+\\frac{2}{x}\\right)^{3x}$.', 'احسب $\\lim_{x\\to+\\infty}\\left(1+\\frac{2}{x}\\right)^{3x}$.', 'Work out $\\lim_{x\\to+\\infty}\\left(1+\\frac{2}{x}\\right)^{3x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarria 1 baliora doa eta berretzailea $+\\infty$ baliora: $1^{\\infty}$.', 'La base tiende a 1 y el exponente a $+\\infty$: $1^{\\infty}$.', 'الأساس يؤول إلى 1 والأس إلى $+\\infty$: $1^{\\infty}$.', 'The base tends to 1 and the exponent to $+\\infty$: $1^{\\infty}$.') },
            { text: say('Erabili formula: $e$ ber berretzailea bider (oinarria ken 1).', 'Usa la fórmula: $e$ elevado al exponente por (la base menos 1).', 'استعمل الصيغة: $e$ أس (الأس مضروبًا في الأساس ناقص 1).', 'Use the formula: $e$ to the exponent times (the base minus 1).'), math: same('$\\lim f^{g}=e^{\\lim g\\,(f-1)}$') },
            { text: say('Kalkulatu berretzailea.', 'Calcula el exponente.', 'احسب الأس.', 'Work out the exponent.'), math: same('$3x\\cdot\\frac{2}{x}=6\\ \\to\\ e^{6}$') }
        ],
        takeaway: say('$f\\to 1$ eta $g\\to\\infty$ badira, $\\lim f^{g}=e^{\\lim g\\,(f-1)}$. $1^{\\infty}$ ez da 1: berretzailea hain azkar hazten da, ezen oinarriko «apur bat gehiago» horrek $e^{a}$ ematen baitu.', 'Si $f\\to 1$ y $g\\to\\infty$, $\\lim f^{g}=e^{\\lim g\\,(f-1)}$. $1^{\\infty}$ no es 1: el exponente crece tan deprisa que el «poco más de 1» de la base da $e^{a}$.', 'إذا كان $f\\to 1$ و$g\\to\\infty$ فإن $\\lim f^{g}=e^{\\lim g\\,(f-1)}$. و$1^{\\infty}$ ليست 1: يكبر الأس بسرعة تجعل «الزيادة الصغيرة على 1» في الأساس تعطي $e^{a}$.', 'If $f\\to 1$ and $g\\to\\infty$, $\\lim f^{g}=e^{\\lim g\\,(f-1)}$. $1^{\\infty}$ is not 1: the exponent grows so fast that the «little more than 1» of the base gives $e^{a}$.'),
        figure: (language) => <NumberEFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. Limits at a point ---------- */
    {
        id: 'one-sided',
        stage: 'point',
        title: say('Ordezkatu eta alboko limiteak', 'Sustituir y límites laterales', 'التعويض والنهايتان الجانبيتان', 'Substituting and one-sided limits'),
        goal: say('Puntu bateko limitea ordezkatuz kalkulatzea eta, zatika definitutako funtzioetan, alde bakoitzeko limitea bere zatiarekin.', 'Calcular un límite en un punto sustituyendo y, en las funciones a trozos, el límite de cada lado con su trozo.', 'حساب النهاية عند نقطة بالتعويض، وفي الدوال متعددة الأجزاء حساب نهاية كل جانب بجزئه.', 'Work out a limit at a point by substituting and, in piecewise functions, the limit on each side with its own piece.'),
        needs: [
            { unit: LIMITS1, topic: 'one-sided', title: { eu: 'Alboko limiteak', es: 'Límites laterales', en: 'One-sided limits', ar: 'النهايتان الجانبيتان' } }
        ],
        problem: say('$f(x)=\\begin{cases}x^2+1 & x<2\\\\ 8-x & x\\ge 2\\end{cases}$. Badago $\\lim_{x\\to 2}f(x)$?', '$f(x)=\\begin{cases}x^2+1 & x<2\\\\ 8-x & x\\ge 2\\end{cases}$. ¿Existe $\\lim_{x\\to 2}f(x)$?', '$f(x)=\\begin{cases}x^2+1 & x<2\\\\ 8-x & x\\ge 2\\end{cases}$. هل توجد $\\lim_{x\\to 2}f(x)$؟', '$f(x)=\\begin{cases}x^2+1 & x<2\\\\ 8-x & x\\ge 2\\end{cases}$. Does $\\lim_{x\\to 2}f(x)$ exist?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerretik, $x<2$ zatia.', 'Por la izquierda, el trozo de $x<2$.', 'من اليسار جزء $x<2$.', 'From the left, the piece for $x<2$.'), math: same('$\\lim_{x\\to 2^-}(x^2+1)=4+1=5$') },
            { text: say('Eskuinetik, $x\\ge 2$ zatia.', 'Por la derecha, el trozo de $x\\ge 2$.', 'من اليمين جزء $x\\ge 2$.', 'From the right, the piece for $x\\ge 2$.'), math: same('$\\lim_{x\\to 2^+}(8-x)=8-2=6$') },
            { text: say('Alboko limiteak desberdinak dira: ez dago limiterik.', 'Los laterales son distintos: no existe el límite.', 'النهايتان الجانبيتان مختلفتان: لا توجد نهاية.', 'The one-sided limits differ: the limit does not exist.'), math: same('$5\\neq 6$') }
        ],
        takeaway: say('Funtzio ezagun batean (polinomioa, zatidura…), puntua ordezkatzen da. Zatika definitutako funtzio batean, aldaketa-puntuan alde bakoitzeko zatia erabiltzen da. Limitea badago alboko bi limiteak berdinak direnean bakarrik.', 'En una función conocida (polinomio, cociente…) se sustituye el punto. En una función a trozos, en el punto de cambio se usa el trozo de cada lado. El límite existe solo si los dos laterales coinciden.', 'في دالة معروفة (حدودية، خارج قسمة…) نعوّض النقطة. وفي الدالة متعددة الأجزاء نستعمل عند نقطة التغيّر جزء كل جانب. وتوجد النهاية فقط إذا تساوت النهايتان الجانبيتان.', 'In a familiar function (polynomial, quotient…) you substitute the point. In a piecewise function, at the point of change you use the piece on each side. The limit exists only if both one-sided limits are equal.'),
        figure: (language) => <OneSidedFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'k-zero',
        stage: 'point',
        title: say('Zenbaki bat zati zero: limite infinituak', 'Un número entre cero: límites infinitos', 'عدد على صفر: النهايات اللانهائية', 'A number over zero: infinite limits'),
        goal: say('Ordezkatzean $\\frac{k}{0}$ ateratzen denean, alde bakoitzeko zeinua aztertzea eta limite infinituak ematea.', 'Cuando al sustituir sale $\\frac{k}{0}$, estudiar el signo a cada lado y dar los límites infinitos.', 'عندما يظهر $\\frac{k}{0}$ بالتعويض، دراسة الإشارة على كل جانب وإعطاء النهايتين اللانهائيتين.', 'When substituting gives $\\frac{k}{0}$, study the sign on each side and give the infinite limits.'),
        needs: [
            { unit: LIMITS1, topic: 'infinite', title: { eu: 'Limite infinituak', es: 'Límites infinitos', en: 'Infinite limits', ar: 'النهايات اللانهائية' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to 3}\\frac{x+1}{x-3}$.', 'Calcula $\\lim_{x\\to 3}\\frac{x+1}{x-3}$.', 'احسب $\\lim_{x\\to 3}\\frac{x+1}{x-3}$.', 'Work out $\\lim_{x\\to 3}\\frac{x+1}{x-3}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatuz gero, $\\frac{4}{0}$: limitea infinitua da.', 'Al sustituir sale $\\frac{4}{0}$: el límite es infinito.', 'بالتعويض نجد $\\frac{4}{0}$: النهاية لانهائية.', 'Substituting gives $\\frac{4}{0}$: the limit is infinite.') },
            { text: say('3 baino apur bat gutxiagorekin, izendatzailea negatiboa da.', 'Con un poco menos de 3, el denominador es negativo.', 'بقيمة أقل قليلًا من 3 يكون المقام سالبًا.', 'With a little less than 3, the denominator is negative.'), math: same('$\\lim_{x\\to 3^-}\\frac{x+1}{x-3}=\\frac{4}{0^-}=-\\infty$') },
            { text: say('3 baino apur bat gehiagorekin, positiboa.', 'Con un poco más de 3, positivo.', 'بقيمة أكبر قليلًا من 3 يكون موجبًا.', 'With a little more than 3, positive.'), math: same('$\\lim_{x\\to 3^+}\\frac{x+1}{x-3}=\\frac{4}{0^+}=+\\infty$') }
        ],
        takeaway: say('$\\frac{k}{0}$ ($k\\neq 0$) ez da indeterminazioa: limitea $+\\infty$ edo $-\\infty$ da alde bakoitzean, zeinuaren arabera. Bi aldeetan zeinu bera ez badute, ez dago limiterik; hala ere, $x=a$ asintota bertikala da.', '$\\frac{k}{0}$ (con $k\\neq 0$) no es indeterminación: el límite es $+\\infty$ o $-\\infty$ a cada lado, según el signo. Si los dos lados no tienen el mismo signo, no existe el límite; aun así, $x=a$ es asíntota vertical.', '$\\frac{k}{0}$ (مع $k\\neq 0$) ليست عدم تعيين: النهاية $+\\infty$ أو $-\\infty$ على كل جانب حسب الإشارة. وإذا اختلفت الإشارة بين الجانبين فلا توجد نهاية؛ ومع ذلك يكون $x=a$ مقاربًا رأسيًا.', '$\\frac{k}{0}$ (with $k\\neq 0$) is not indeterminate: the limit is $+\\infty$ or $-\\infty$ on each side, depending on the sign. If the two sides do not have the same sign, the limit does not exist; even so, $x=a$ is a vertical asymptote.'),
        figure: (language) => <KZeroFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'zero-zero',
        stage: 'point',
        title: say('Zero zati zero: faktorizatu edo konjokatua', 'Cero entre cero: factorizar o conjugado', 'صفر على صفر: التحليل أو المرافق', 'Zero over zero: factorise or conjugate'),
        goal: say('$\\frac{0}{0}$ indeterminazioa ebaztea: polinomioak faktorizatuz eta, erroak badaude, konjokatuaz biderkatuz.', 'Resolver la indeterminación $\\frac{0}{0}$: factorizando los polinomios y, si hay raíces, multiplicando por el conjugado.', 'حل حالة عدم التعيين $\\frac{0}{0}$: بتحليل الحدوديات، وبالضرب في المرافق إذا وُجدت جذور.', 'Resolve the indeterminate form $\\frac{0}{0}$: by factorising the polynomials and, if there are roots, by multiplying by the conjugate.'),
        needs: [
            { unit: LIMITS1, topic: 'zero-zero', title: { eu: 'Zero zati zero: faktorizatu', es: 'Cero entre cero: factorizar', en: 'Zero over zero: factorising', ar: 'صفر على صفر: التحليل' } },
            { unit: LIMITS1, topic: 'roots', title: { eu: 'Erroak: konjokatuaz biderkatu', es: 'Raíces: multiplicar por el conjugado', en: 'Roots: multiplying by the conjugate', ar: 'الجذور: الضرب في المرافق' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to 1}\\frac{x^2+2x-3}{x^2-1}$.', 'Calcula $\\lim_{x\\to 1}\\frac{x^2+2x-3}{x^2-1}$.', 'احسب $\\lim_{x\\to 1}\\frac{x^2+2x-3}{x^2-1}$.', 'Work out $\\lim_{x\\to 1}\\frac{x^2+2x-3}{x^2-1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatuz gero, $\\frac{0}{0}$: biek $x=1$ erroa dute.', 'Al sustituir sale $\\frac{0}{0}$: los dos tienen la raíz $x=1$.', 'بالتعويض نجد $\\frac{0}{0}$: لكليهما الجذر $x=1$.', 'Substituting gives $\\frac{0}{0}$: both have the root $x=1$.'), math: same('$\\frac{1+2-3}{1-1}$') },
            { text: say('Faktorizatu eta sinplifikatu $x-1$.', 'Factoriza y simplifica $x-1$.', 'حلّل واختصر $x-1$.', 'Factorise and cancel $x-1$.'), math: same('$\\frac{(x-1)(x+3)}{(x-1)(x+1)}=\\frac{x+3}{x+1}$') },
            { text: say('Ordezkatu berriro.', 'Vuelve a sustituir.', 'عوّض من جديد.', 'Substitute again.'), math: same('$\\frac{1+3}{1+1}=2$') }
        ],
        takeaway: say('$\\frac{0}{0}$ bada, $a$ goiko eta beheko erroa da: biek $x-a$ faktorea dute. Faktorizatu (Ruffini edo bigarren mailako ekuazioa), sinplifikatu eta ordezkatu berriro. Erroak badaude, konjokatuaz biderkatu eta zatitu.', 'Si sale $\\frac{0}{0}$, $a$ es raíz de arriba y de abajo: los dos llevan el factor $x-a$. Factoriza (Ruffini o la ecuación de segundo grado), simplifica y vuelve a sustituir. Si hay raíces, multiplica y divide por el conjugado.', 'إذا ظهرت $\\frac{0}{0}$ فإن $a$ جذر للبسط وللمقام: في كليهما العامل $x-a$. حلّل (بروفيني أو معادلة الدرجة الثانية) واختصر وعوّض من جديد. وإذا وُجدت جذور فاضرب واقسم على المرافق.', 'If you get $\\frac{0}{0}$, $a$ is a root of the top and the bottom: both carry the factor $x-a$. Factorise (Ruffini or the quadratic equation), cancel and substitute again. If there are roots, multiply and divide by the conjugate.'),
        figure: (language) => <ZeroZeroFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. Continuity ---------- */
    {
        id: 'continuous',
        stage: 'continuity',
        title: say('Jarraitutasunaren hiru baldintzak', 'Las tres condiciones de la continuidad', 'شروط الاتصال الثلاثة', 'The three conditions for continuity'),
        goal: say('Funtzio bat puntu batean jarraitua den aztertzea hiru baldintzekin: $f(a)$ badago, limitea badago eta berdinak dira.', 'Estudiar si una función es continua en un punto con las tres condiciones: existe $f(a)$, existe el límite y coinciden.', 'دراسة اتصال دالة عند نقطة بالشروط الثلاثة: توجد $f(a)$، وتوجد النهاية، وتتساويان.', 'Study whether a function is continuous at a point with the three conditions: $f(a)$ exists, the limit exists and they are equal.'),
        needs: [
            { unit: LIMITS1, topic: 'continuous', title: { eu: 'Funtzio jarraitua puntu batean', es: 'Función continua en un punto', en: 'A function continuous at a point', ar: 'الدالة المتصلة عند نقطة' } }
        ],
        problem: say('Jarraitua al da $f(x)=\\begin{cases}2x+1 & x<1\\\\ x^2+2 & x\\ge 1\\end{cases}$ funtzioa $x=1$ puntuan?', '¿Es continua $f(x)=\\begin{cases}2x+1 & x<1\\\\ x^2+2 & x\\ge 1\\end{cases}$ en $x=1$?', 'هل $f(x)=\\begin{cases}2x+1 & x<1\\\\ x^2+2 & x\\ge 1\\end{cases}$ متصلة عند $x=1$؟', 'Is $f(x)=\\begin{cases}2x+1 & x<1\\\\ x^2+2 & x\\ge 1\\end{cases}$ continuous at $x=1$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f(1)$ berdintza daraman zatiarekin.', '$f(1)$ con el trozo que lleva el igual.', '$f(1)$ بالجزء الذي فيه المساواة.', '$f(1)$ with the piece carrying the equals sign.'), math: same('$f(1)=1^2+2=3$') },
            { text: say('Alboko limiteak.', 'Los límites laterales.', 'النهايتان الجانبيتان.', 'The one-sided limits.'), math: same('$\\lim_{x\\to 1^-}(2x+1)=3\\qquad\\lim_{x\\to 1^+}(x^2+2)=3$') },
            { text: say('Hirurak berdinak: jarraitua da $x=1$ puntuan.', 'Los tres coinciden: es continua en $x=1$.', 'الثلاثة متساوية: متصلة عند $x=1$.', 'All three agree: it is continuous at $x=1$.'), math: same('$f(1)=\\lim_{x\\to 1}f(x)=3$') }
        ],
        takeaway: say('$f$ jarraitua da $a$ puntuan baldin eta $f(a)$ badago, $\\lim_{x\\to a}f(x)$ badago eta berdinak badira. Polinomioak jarraituak dira beti; zatidurak, izendatzailea 0 ez den tokietan; zatika definitutakoak, aztertu aldaketa-puntuak.', '$f$ es continua en $a$ si existe $f(a)$, existe $\\lim_{x\\to a}f(x)$ y coinciden. Los polinomios son siempre continuos; los cocientes, donde no se anula el denominador; en las funciones a trozos, estudia los puntos de cambio.', 'تكون $f$ متصلة عند $a$ إذا وُجدت $f(a)$ ووُجدت $\\lim_{x\\to a}f(x)$ وتساوتا. الحدوديات متصلة دائمًا؛ وخوارج القسمة حيث لا ينعدم المقام؛ وفي الدوال متعددة الأجزاء ادرس نقاط التغيّر.', '$f$ is continuous at $a$ if $f(a)$ exists, $\\lim_{x\\to a}f(x)$ exists and they are equal. Polynomials are always continuous; quotients, wherever the denominator is not 0; in piecewise functions, study the points of change.'),
        figure: (language) => <ContinuousFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'discontinuities',
        stage: 'continuity',
        title: say('Etenune motak', 'Tipos de discontinuidad', 'أنواع الانقطاع', 'Kinds of discontinuity'),
        goal: say('Etenune bat sailkatzea: saihesgarria, jauzi finitukoa edo jauzi infinitukoa.', 'Clasificar una discontinuidad: evitable, de salto finito o de salto infinito.', 'تصنيف الانقطاع: قابل للإزالة، أو قفزة منتهية، أو قفزة لانهائية.', 'Classify a discontinuity: removable, finite jump or infinite jump.'),
        needs: [
            { unit: LIMITS1, topic: 'discontinuities', title: { eu: 'Etenune motak', es: 'Tipos de discontinuidad', en: 'Kinds of discontinuity', ar: 'أنواع الانقطاع' } }
        ],
        problem: say('Aztertu eta sailkatu funtzio honen etenuneak: $f(x)=\\frac{x^2-4}{x^2-2x}$', 'Estudia y clasifica las discontinuidades de esta función: $f(x)=\\frac{x^2-4}{x^2-2x}$', 'ادرس انقطاعات هذه الدالة وصنّفها: $f(x)=\\frac{x^2-4}{x^2-2x}$', 'Study and classify the discontinuities of this function: $f(x)=\\frac{x^2-4}{x^2-2x}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea 0 da $x=0$ eta $x=2$ puntuetan: han ez dago $f$.', 'El denominador se anula en $x=0$ y en $x=2$: ahí no existe $f$.', 'ينعدم المقام عند $x=0$ وعند $x=2$: هناك لا توجد $f$.', 'The denominator is 0 at $x=0$ and at $x=2$: $f$ does not exist there.'), math: same('$x^2-2x=x(x-2)$') },
            { text: say('$x=2$ puntuan $\\frac{0}{0}$ da: sinplifikatu. Limitea 2 da: saihesgarria.', 'En $x=2$ sale $\\frac{0}{0}$: simplifica. El límite es 2: evitable.', 'عند $x=2$ نجد $\\frac{0}{0}$: اختصر. النهاية 2: قابل للإزالة.', 'At $x=2$ it gives $\\frac{0}{0}$: cancel. The limit is 2: removable.'), math: same('$\\frac{(x-2)(x+2)}{x(x-2)}=\\frac{x+2}{x}\\ \\to\\ \\frac{2+2}{2}=2$') },
            { text: say('$x=0$ puntuan $\\frac{-4}{0}$ da: jauzi infinitua.', 'En $x=0$ sale $\\frac{-4}{0}$: salto infinito.', 'عند $x=0$ نجد $\\frac{-4}{0}$: قفزة لانهائية.', 'At $x=0$ it gives $\\frac{-4}{0}$: an infinite jump.'), math: same('$\\lim_{x\\to 0^-}f(x)=-\\infty\\qquad\\lim_{x\\to 0^+}f(x)=+\\infty$') }
        ],
        takeaway: say('Saihesgarria: limitea badago, baina $f(a)$ ez dago edo beste balio bat du. Jauzi finitukoa: alboko limiteak zenbakiak dira, baina desberdinak (jauzia haien kenketa da). Jauzi infinitukoa: alboko limiteren bat infinitua da.', 'Evitable: existe el límite, pero $f(a)$ no existe o vale otra cosa. De salto finito: los laterales son números, pero distintos (el salto es su diferencia). De salto infinito: algún lateral es infinito.', 'قابل للإزالة: توجد النهاية لكن $f(a)$ غير موجودة أو لها قيمة أخرى. قفزة منتهية: النهايتان الجانبيتان عددان مختلفان (والقفزة فرقهما). قفزة لانهائية: إحدى النهايتين لانهائية.', 'Removable: the limit exists, but $f(a)$ does not exist or has another value. Finite jump: the one-sided limits are numbers, but different (the jump is their difference). Infinite jump: some one-sided limit is infinite.'),
        figure: (language) => <DiscontinuitiesFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'parameter',
        stage: 'continuity',
        title: say('Parametrodun funtzio zatikatuak', 'Funciones a trozos con parámetros', 'دوال متعددة الأجزاء مع وسطاء', 'Piecewise functions with parameters'),
        goal: say('Parametro baten (edo biren) balioa aurkitzea, zatika definitutako funtzio bat jarraitua izan dadin.', 'Hallar el valor de un parámetro (o de dos) para que una función a trozos sea continua.', 'إيجاد قيمة وسيط (أو وسيطين) لتكون دالة متعددة الأجزاء متصلة.', 'Find the value of a parameter (or two) so that a piecewise function is continuous.'),
        needs: [
            { unit: LIMITS1, topic: 'continuous', title: { eu: 'Funtzio jarraitua puntu batean', es: 'Función continua en un punto', en: 'A function continuous at a point', ar: 'الدالة المتصلة عند نقطة' } }
        ],
        problem: say('Aurkitu $a$, funtzio hau $\\mathbb{R}$ osoan jarraitua izan dadin: $f(x)=\\begin{cases}x^2+a & x<2\\\\ 3x-1 & x\\ge 2\\end{cases}$', 'Halla $a$ para que esta función sea continua en $\\mathbb{R}$: $f(x)=\\begin{cases}x^2+a & x<2\\\\ 3x-1 & x\\ge 2\\end{cases}$', 'أوجد $a$ لتكون هذه الدالة متصلة على $\\mathbb{R}$: $f(x)=\\begin{cases}x^2+a & x<2\\\\ 3x-1 & x\\ge 2\\end{cases}$', 'Find $a$ so that this function is continuous on $\\mathbb{R}$: $f(x)=\\begin{cases}x^2+a & x<2\\\\ 3x-1 & x\\ge 2\\end{cases}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi zatiak polinomioak dira: $x=2$ puntua bakarrik aztertu behar da.', 'Los dos trozos son polinomios: solo hay que estudiar $x=2$.', 'الجزآن حدوديتان: لا ندرس إلا $x=2$.', 'Both pieces are polynomials: only $x=2$ needs studying.') },
            { text: say('Alboko limiteak eta $f(2)$.', 'Los laterales y $f(2)$.', 'النهايتان الجانبيتان و$f(2)$.', 'The one-sided limits and $f(2)$.'), math: same('$\\lim_{x\\to 2^-}(x^2+a)=4+a\\qquad f(2)=3\\cdot 2-1=5$') },
            { text: say('Berdindu eta ebatzi.', 'Iguala y resuelve.', 'ساوِ وحُلّ.', 'Set them equal and solve.'), math: same('$4+a=5\\ \\to\\ a=1$') }
        ],
        takeaway: say('Zati bakoitza jarraitua bada bere tartean, aldaketa-puntuak bakarrik aztertzen dira. Lotune bakoitzean alde bateko eta besteko balioak berdintzen dira: ekuazio bat lotune bakoitzeko. Bi parametro badaude, bi lotune eta bi ekuazioko sistema.', 'Si cada trozo es continuo en su intervalo, solo se estudian los puntos de cambio. En cada unión se igualan los valores de un lado y del otro: una ecuación por unión. Con dos parámetros, dos uniones y un sistema de dos ecuaciones.', 'إذا كان كل جزء متصلًا على فترته فلا ندرس إلا نقاط التغيّر. وعند كل نقطة التقاء نساوي قيمتي الجانبين: معادلة لكل نقطة التقاء. ومع وسيطين: نقطتا التقاء وجملة من معادلتين.', 'If each piece is continuous on its interval, only the points of change are studied. At each joint the values on one side and the other are set equal: one equation per joint. With two parameters, two joints and a system of two equations.'),
        figure: (language) => <ParameterFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. In economy and society ---------- */
    {
        id: 'long-run',
        stage: 'context',
        title: say('Epe luzera', 'A largo plazo', 'على المدى الطويل', 'In the long run'),
        goal: say('Eredu ekonomiko edo sozial baten (biztanleria, salmentak, batez besteko kostua) $t\\to+\\infty$ limitea kalkulatzea eta epe luzeko joera bezala interpretatzea.', 'Calcular el límite cuando $t\\to+\\infty$ de un modelo económico o social (población, ventas, coste medio) e interpretarlo como la tendencia a largo plazo.', 'حساب النهاية عندما $t\\to+\\infty$ لنموذج اقتصادي أو اجتماعي (السكان، المبيعات، متوسط التكلفة) وتفسيرها على أنها الاتجاه على المدى الطويل.', 'Work out the limit as $t\\to+\\infty$ of an economic or social model (population, sales, average cost) and read it as the long-run trend.'),
        problem: say('Herri baten biztanleria, milakatan, $P(t)=\\frac{20t+6}{t+2}$ da, $t$ urteetan. Zenbat biztanle ditu hasieran? Eta epe luzera?', 'La población de un pueblo, en miles, es $P(t)=\\frac{20t+6}{t+2}$, con $t$ en años. ¿Cuántos habitantes tiene al principio? ¿Y a largo plazo?', 'عدد سكان بلدة بالآلاف هو $P(t)=\\frac{20t+6}{t+2}$، حيث $t$ بالسنوات. كم ساكنًا في البداية؟ وعلى المدى الطويل؟', 'The population of a town, in thousands, is $P(t)=\\frac{20t+6}{t+2}$, with $t$ in years. How many inhabitants does it have at the start? And in the long run?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hasieran, $t=0$.', 'Al principio, $t=0$.', 'في البداية $t=0$.', 'At the start, $t=0$.'), math: same('$P(0)=\\frac{6}{2}=3$') },
            { text: say('Epe luzera, $t\\to+\\infty$: maila bera goian eta behean.', 'A largo plazo, $t\\to+\\infty$: mismo grado arriba y abajo.', 'على المدى الطويل $t\\to+\\infty$: الدرجة نفسها في البسط والمقام.', 'In the long run, $t\\to+\\infty$: same degree on top and below.'), math: same('$\\lim_{t\\to+\\infty}\\frac{20t+6}{t+2}=\\frac{20}{1}=20$') },
            { text: say('3000 biztanlerekin hasten da eta 20 000 biztanle ingurura hurbiltzen da, baina ez da inoiz iristen.', 'Empieza con 3000 habitantes y se acerca a 20 000, sin llegar nunca.', 'يبدأ بـ 3000 ساكن ويقترب من 20 000 دون أن يبلغه.', 'It starts with 3,000 inhabitants and gets close to 20,000, never reaching it.') }
        ],
        takeaway: say('Eredu batean, $t\\to+\\infty$ limitea epe luzera gertatzen dena da: zenbaki bat bada, magnitudea egonkortu egiten da; 0 bada, desagertzen doa; $+\\infty$ bada, mugarik gabe hazten da. Batez besteko kostua $\\frac{C(x)}{x}$ da.', 'En un modelo, el límite cuando $t\\to+\\infty$ es lo que pasa a largo plazo: si es un número, la magnitud se estabiliza; si es 0, se va apagando; si es $+\\infty$, crece sin límite. El coste medio es $\\frac{C(x)}{x}$.', 'في النموذج، النهاية عندما $t\\to+\\infty$ هي ما يحدث على المدى الطويل: إذا كانت عددًا فالمقدار يستقر؛ وإذا كانت 0 فإنه يتلاشى؛ وإذا كانت $+\\infty$ فإنه يكبر بلا حد. ومتوسط التكلفة هو $\\frac{C(x)}{x}$.', 'In a model, the limit as $t\\to+\\infty$ is what happens in the long run: if it is a number, the quantity levels off; if it is 0, it dies away; if it is $+\\infty$, it grows without limit. The average cost is $\\frac{C(x)}{x}$.'),
        figure: (language) => <LongRunFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'brackets',
        stage: 'context',
        title: say('Tarteka ordaintzen diren tarifak', 'Tarifas por tramos', 'التعريفات حسب الشرائح', 'Tariffs by brackets'),
        goal: say('Tarteka definitutako tarifa bat (ura, argia, aparkalekua) funtzio zatikatu gisa idaztea eta tarte-aldaketetan jauzirik dagoen aztertzea.', 'Escribir una tarifa por tramos (agua, luz, aparcamiento) como función a trozos y estudiar si salta en los cambios de tramo.', 'كتابة تعريفة حسب الشرائح (الماء، الكهرباء، الموقف) كدالة متعددة الأجزاء ودراسة القفزات عند تغيّر الشريحة.', 'Write a tariff by brackets (water, electricity, parking) as a piecewise function and study whether it jumps where the bracket changes.'),
        problem: say('Ur-tarifa bat $f(x)=\\begin{cases}2x & 0\\le x\\le 10\\\\ 1{,}5x+8 & x>10\\end{cases}$ eurokoa da, $x$ metro kubikotan. Jarraitua al da $x=10$ puntuan?', 'Una tarifa de agua es $f(x)=\\begin{cases}2x & 0\\le x\\le 10\\\\ 1{,}5x+8 & x>10\\end{cases}$ euros, con $x$ en metros cúbicos. ¿Es continua en $x=10$?', 'تعريفة ماء هي $f(x)=\\begin{cases}2x & 0\\le x\\le 10\\\\ 1{,}5x+8 & x>10\\end{cases}$ يورو، حيث $x$ بالأمتار المكعبة. هل هي متصلة عند $x=10$؟', 'A water tariff is $f(x)=\\begin{cases}2x & 0\\le x\\le 10\\\\ 1{,}5x+8 & x>10\\end{cases}$ euros, with $x$ in cubic metres. Is it continuous at $x=10$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('10 m³ ordaintzea.', 'Lo que se paga por 10 m³.', 'ما يُدفع مقابل 10 m³.', 'What 10 m³ costs.'), math: same('$f(10)=2\\cdot 10=20$') },
            { text: say('Eskuinetik, bigarren tartea.', 'Por la derecha, el segundo tramo.', 'من اليمين: الشريحة الثانية.', 'From the right, the second bracket.'), math: same('$\\lim_{x\\to 10^+}(1{,}5x+8)=15+8=23$') },
            { text: say('$20\\neq 23$: jauzi finitua. 10 m³ baino apur bat gehiago kontsumitzen duenak 3 euro gehiago ordaintzen ditu bat-batean.', '$20\\neq 23$: salto finito. Quien gasta un poco más de 10 m³ paga de golpe 3 € más.', '$20\\neq 23$: قفزة منتهية. من يستهلك أكثر قليلًا من 10 m³ يدفع فجأة 3 € أكثر.', '$20\\neq 23$: a finite jump. Whoever uses a little more than 10 m³ suddenly pays €3 more.'), math: same('$23-20=3$') }
        ],
        takeaway: say('Tarifa bat tarteka denean, tarte bakoitza zati bat da. Tarte-aldaketa batean alboko limiteak desberdinak badira, jauzi finitua dago: haien kenketa da tarte berrian sartzean bat-batean ordaintzen den gehigarria.', 'Cuando una tarifa va por tramos, cada tramo es un trozo. Si en un cambio de tramo los laterales son distintos, hay un salto finito: su diferencia es lo que se paga de más de golpe al entrar en el tramo nuevo.', 'عندما تكون التعريفة حسب الشرائح فكل شريحة جزء. وإذا اختلفت النهايتان الجانبيتان عند تغيّر الشريحة فهناك قفزة منتهية: فرقهما هو ما يُدفع زيادةً فجأة عند دخول الشريحة الجديدة.', 'When a tariff goes by brackets, each bracket is a piece. If at a change of bracket the one-sided limits differ, there is a finite jump: their difference is the extra paid all at once on entering the new bracket.'),
        figure: (language) => <BracketsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'fair-tariff',
        stage: 'context',
        title: say('Jauzirik gabeko tarifa', 'Una tarifa sin saltos', 'تعريفة بلا قفزات', 'A tariff with no jumps'),
        goal: say('Tarifa edo eredu zatikatu baten parametroa aurkitzea, jauzirik egon ez dadin, eta emaitza testuinguruan interpretatzea.', 'Hallar el parámetro de una tarifa o de un modelo a trozos para que no haya saltos, e interpretar el resultado en su contexto.', 'إيجاد وسيط تعريفة أو نموذج متعدد الأجزاء كي لا تكون هناك قفزات، وتفسير النتيجة في سياقها.', 'Find the parameter of a tariff or a piecewise model so that there are no jumps, and read the result in its context.'),
        problem: say('Ur-tarifa berria $f(x)=\\begin{cases}2x & 0\\le x\\le 10\\\\ 1{,}5x+b & x>10\\end{cases}$ eurokoa da. Zenbat izan behar du $b$ kuota finkoak, $x=10$ puntuan jauzirik egon ez dadin?', 'La nueva tarifa de agua es $f(x)=\\begin{cases}2x & 0\\le x\\le 10\\\\ 1{,}5x+b & x>10\\end{cases}$ euros. ¿Cuánto debe valer la cuota fija $b$ para que no haya salto en $x=10$?', 'تعريفة الماء الجديدة $f(x)=\\begin{cases}2x & 0\\le x\\le 10\\\\ 1{,}5x+b & x>10\\end{cases}$ يورو. كم يجب أن تكون الحصة الثابتة $b$ كي لا توجد قفزة عند $x=10$؟', 'The new water tariff is $f(x)=\\begin{cases}2x & 0\\le x\\le 10\\\\ 1{,}5x+b & x>10\\end{cases}$ euros. What must the fixed charge $b$ be so that there is no jump at $x=10$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerretik eta $f(10)$.', 'Por la izquierda y $f(10)$.', 'من اليسار و$f(10)$.', 'From the left and $f(10)$.'), math: same('$f(10)=2\\cdot 10=20$') },
            { text: say('Eskuinetik.', 'Por la derecha.', 'من اليمين.', 'From the right.'), math: same('$\\lim_{x\\to 10^+}(1{,}5x+b)=15+b$') },
            { text: say('Berdindu: $b=5$ euro. Orduan 10 m³ igarotzeak ez du bat-bateko igoerarik ekartzen.', 'Iguala: $b=5$ €. Entonces pasar de 10 m³ no trae ninguna subida de golpe.', 'ساوِ: $b=5$ €. عندئذ لا يجلب تجاوز 10 m³ أي زيادة مفاجئة.', 'Set them equal: $b=5$ euros. Then going past 10 m³ brings no sudden rise.'), math: same('$15+b=20\\ \\to\\ b=5$') }
        ],
        takeaway: say('Tarifa edo eredu bat jarraitua izateko, tarte-aldaketa bakoitzean alde bateko eta besteko balioak berdindu behar dira. Ekuazio horrek parametroa ematen du; testuinguruan, kuota finkoa, prezioa edo kopuru bat da.', 'Para que una tarifa o un modelo sea continuo, en cada cambio de tramo se igualan los valores de un lado y del otro. Esa ecuación da el parámetro; en el contexto, es una cuota fija, un precio o una cantidad.', 'كي تكون التعريفة أو النموذج متصلًا نساوي عند كل تغيّر في الشريحة قيمتي الجانبين. وتعطي تلك المعادلة الوسيط؛ وهو في السياق حصة ثابتة أو سعر أو كمية.', 'For a tariff or a model to be continuous, at each change of bracket the values on one side and the other are set equal. That equation gives the parameter; in context, it is a fixed charge, a price or an amount.'),
        figure: (language) => <FairTariffFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bach2gLimitsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bach2gLimitsLessonTexts[topic.id as Bach2gLimitsTopicId], ...bach2gLimitsLessonChecks[topic.id as Bach2gLimitsTopicId] }))

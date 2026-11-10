import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Integral mugatua · Batxilergoa 2 · Zientziak — the typical mistake and
   the «Check it» question of every lesson. Plain data (no JSX) so the tests
   can import it; lessons.tsx merges it into the topics. The questions use
   new numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake: F(a) − F(b), the
   signed integral given as an area, the lower sum always on the left, the
   base 1/n forgotten in a sum, the mean value not divided by b − a, the
   bottom limit subtracted in F′, g′ forgotten, Barrow over an asymptote,
   the old limits after t = g(x), uv not evaluated, |f| not split, one
   integral for a region of two strips, a negative solution kept, a minimum
   read as a maximum and π or the square forgotten in a volume. Every
   prompt carries two formulas, so that the shared test does not take a
   whole expression for a calculation.
   ========================================================================== */

export type Bach2DefiniteTopicId =
    | 'barrow-review' | 'areas-review'
    | 'lower-upper' | 'limit-sums' | 'mean-value'
    | 'area-function' | 'upper-limit' | 'barrow-conditions'
    | 'definite-change' | 'definite-parts' | 'piecewise'
    | 'three-curves' | 'parameter' | 'integral-extrema' | 'revolution'

export const bach2DefiniteLessonChecks: Record<Bach2DefiniteTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Review from 1.º ---------- */
    'barrow-review': {
        mistake: {
            wrong: same('$\\int_1^2 2x\\,dx=F(1)-F(2)=1-4=-3$'),
            right: say('Goiko muga ken behekoa da: $F(2)-F(1)=4-1=3$.', 'Es el de arriba menos el de abajo: $F(2)-F(1)=4-1=3$.', 'الأعلى ناقص الأدنى: $F(2)-F(1)=4-1=3$.', 'It is the top one minus the bottom one: $F(2)-F(1)=4-1=3$.')
        },
        check: {
            prompt: say('$\\int_0^3 f(x)\\,dx=5$ bada, zenbat da $\\int_3^0 f(x)\\,dx$?', 'Si $\\int_0^3 f(x)\\,dx=5$, ¿cuánto vale $\\int_3^0 f(x)\\,dx$?', 'إذا كان $\\int_0^3 f(x)\\,dx=5$ فكم يساوي $\\int_3^0 f(x)\\,dx$؟', 'If $\\int_0^3 f(x)\\,dx=5$, what is $\\int_3^0 f(x)\\,dx$?'),
            options: [same('$5$'), same('$-5$'), same('$\\frac{1}{5}$')],
            correctIndex: 1,
            explanation: say('Mugak alderantzikatzean, zeinua bakarrik aldatzen da: $-5$.', 'Al invertir los límites solo cambia el signo: $-5$.', 'عند قلب الحدّين تتغير الإشارة فقط: $-5$.', 'Swapping the limits only changes the sign: $-5$.')
        }
    },
    'areas-review': {
        mistake: {
            wrong: say('$\\int_{-1}^{1}x^3\\,dx=0$ denez, azalera 0 da.', 'Como $\\int_{-1}^{1}x^3\\,dx=0$, el área es 0.', 'بما أن $\\int_{-1}^{1}x^3\\,dx=0$ فالمساحة 0.', 'Since $\\int_{-1}^{1}x^3\\,dx=0$, the area is 0.'),
            right: say('$x^3$ kurbak ardatza mozten du 0 puntuan: azalera $2\\int_0^1 x^3\\,dx=\\frac{1}{2}$ da.', '$x^3$ corta el eje en 0: el área es $2\\int_0^1 x^3\\,dx=\\frac{1}{2}$.', 'يقطع $x^3$ المحور عند 0: المساحة $2\\int_0^1 x^3\\,dx=\\frac{1}{2}$.', '$x^3$ crosses the axis at 0: the area is $2\\int_0^1 x^3\\,dx=\\frac{1}{2}$.')
        },
        check: {
            prompt: say('Zein integralek ematen du $y=x^2$ eta $y=x$ kurben arteko azalera $[0,\\,1]$ tartean?', '¿Qué integral da el área entre $y=x^2$ e $y=x$ en $[0,\\,1]$?', 'أي تكامل يعطي المساحة بين $y=x^2$ و$y=x$ في $[0,\\,1]$؟', 'Which integral gives the area between $y=x^2$ and $y=x$ on $[0,\\,1]$?'),
            options: [same('$\\int_0^1(x^2-x)\\,dx$'), same('$\\int_0^1(x^2+x)\\,dx$'), same('$\\int_0^1(x-x^2)\\,dx$')],
            correctIndex: 2,
            explanation: say('$(0,\\,1)$ tartean $x>x^2$ da: goikoa $y=x$ da. Lehenak zenbaki negatibo bat ematen du.', 'En $(0,\\,1)$, $x>x^2$: arriba va $y=x$. La primera da un número negativo.', 'في $(0,\\,1)$ يكون $x>x^2$: الأعلى $y=x$. والأول يعطي عددًا سالبًا.', 'On $(0,\\,1)$, $x>x^2$: the top one is $y=x$. The first gives a negative number.')
        }
    },

    /* ---------- 2. Sums and mean value ---------- */
    'lower-upper': {
        mistake: {
            wrong: say('Behe-batura, beti ezkerreko altuerarekin: $s=\\sum f(x_{i-1})\\,\\Delta x_i$.', 'La suma inferior, siempre con la altura de la izquierda: $s=\\sum f(x_{i-1})\\,\\Delta x_i$.', 'المجموع الأدنى دائمًا بارتفاع اليسار: $s=\\sum f(x_{i-1})\\,\\Delta x_i$.', 'The lower sum, always with the height on the left: $s=\\sum f(x_{i-1})\\,\\Delta x_i$.'),
            right: say('$m_i$ minimoarekin doa: ezkerrean dago $f$ gorakorra bada bakarrik. Beherakorra bada, eskuinean; igo eta jaisten bada, barruan egon daiteke.', 'Va con el mínimo $m_i$: está a la izquierda solo si $f$ crece. Si decrece, a la derecha; si sube y baja, puede estar dentro.', 'يكون بأصغر قيمة $m_i$: وهي عند اليسار فقط إذا كانت $f$ متزايدة. وإذا كانت متناقصة فعند اليمين، وإذا صعدت ونزلت فقد تكون في الداخل.', 'It goes with the minimum $m_i$: it is on the left only if $f$ increases. If it decreases, on the right; if it goes up and down, it may be inside.')
        },
        check: {
            prompt: say('$f(x)=x^3$ funtzioarentzat $[0,\\,2]$ tartean, bi zati berdinekin, zenbat da $S$?', 'Para $f(x)=x^3$ en $[0,\\,2]$ con dos tramos iguales, ¿cuánto vale $S$?', 'لـ $f(x)=x^3$ في $[0,\\,2]$ بجزأين متساويين، كم يساوي $S$؟', 'For $f(x)=x^3$ on $[0,\\,2]$ with two equal pieces, what is $S$?'),
            options: [same('$S=9$'), same('$S=1$'), same('$S=4$')],
            correctIndex: 0,
            explanation: say('$x^3$ gorakorra da: $S$ eskuineko altuerekin, $1\\cdot 1+1\\cdot 8=9$. Behe-batura $s=1$ da, eta azalera zehatza, 4, bien artean dago.', 'Como $x^3$ crece, $S$ usa la derecha: $1\\cdot 1+1\\cdot 8=9$. La suma inferior es $s=1$, y el área exacta, 4, queda entre las dos.', 'لأن $x^3$ متزايدة يستعمل $S$ اليمين: $1\\cdot 1+1\\cdot 8=9$. والمجموع الأدنى $s=1$، والمساحة الدقيقة 4 بينهما.', 'Since $x^3$ increases, $S$ uses the right: $1\\cdot 1+1\\cdot 8=9$. The lower sum is $s=1$, and the exact area, 4, lies between the two.')
        }
    },
    'limit-sums': {
        mistake: {
            wrong: same('$S_n=\\sum_{i=1}^{n}\\frac{i^2}{n^2}$'),
            right: say('Laukizuzen bakoitza oinarria bider altuera da: $\\frac{1}{n}\\cdot\\frac{i^2}{n^2}$. Oinarririk gabe, batura infinitura doa.', 'Cada rectángulo es base por altura: $\\frac{1}{n}\\cdot\\frac{i^2}{n^2}$. Sin la base, la suma se va a infinito.', 'كل مستطيل قاعدة في ارتفاع: $\\frac{1}{n}\\cdot\\frac{i^2}{n^2}$. ومن دون القاعدة يذهب المجموع إلى اللانهاية.', 'Each rectangle is base times height: $\\frac{1}{n}\\cdot\\frac{i^2}{n^2}$. Without the base, the sum goes to infinity.')
        },
        check: {
            prompt: say('$\\int_0^1 3x^2\\,dx$ integralerako, $S_n=\\frac{(n+1)(2n+1)}{2n^2}$. Zein zenbakitara hurbiltzen da?', 'Para $\\int_0^1 3x^2\\,dx$, $S_n=\\frac{(n+1)(2n+1)}{2n^2}$. ¿A qué tiende?', 'لـ $\\int_0^1 3x^2\\,dx$ لدينا $S_n=\\frac{(n+1)(2n+1)}{2n^2}$. إلى أي عدد يقترب؟', 'For $\\int_0^1 3x^2\\,dx$, $S_n=\\frac{(n+1)(2n+1)}{2n^2}$. What does it tend to?'),
            options: [same('$1$'), same('$\\frac{1}{3}$'), same('$\\infty$')],
            correctIndex: 0,
            explanation: say('Goian eta behean $2n^2$ da nagusi: limitea 1 da, $\\int_0^1 3x^2\\,dx=1$ bezala.', 'Arriba y abajo manda $2n^2$: el límite es 1, igual que $\\int_0^1 3x^2\\,dx=1$.', 'في البسط والمقام يغلب $2n^2$: النهاية 1، مثل $\\int_0^1 3x^2\\,dx=1$.', 'Top and bottom are led by $2n^2$: the limit is 1, just like $\\int_0^1 3x^2\\,dx=1$.')
        }
    },
    'mean-value': {
        mistake: {
            wrong: say('$f(x)=x^3$ funtzioaren batez besteko balioa $[0,\\,2]$ tartean: $\\int_0^2 x^3\\,dx=4$.', 'El valor medio de $f(x)=x^3$ en $[0,\\,2]$: $\\int_0^2 x^3\\,dx=4$.', 'القيمة المتوسطة لـ $f(x)=x^3$ في $[0,\\,2]$: $\\int_0^2 x^3\\,dx=4$.', 'The mean value of $f(x)=x^3$ on $[0,\\,2]$: $\\int_0^2 x^3\\,dx=4$.'),
            right: say('Tartearen luzeraz zatitu behar da: $\\frac{4}{2}=2$.', 'Hay que dividir entre la longitud del intervalo: $\\frac{4}{2}=2$.', 'يجب القسمة على طول الفترة: $\\frac{4}{2}=2$.', 'You have to divide by the length of the interval: $\\frac{4}{2}=2$.')
        },
        check: {
            prompt: say('Zein da $f(x)=3x^2$ funtzioaren batez besteko balioa $[0,\\,2]$ tartean?', '¿Cuál es el valor medio de $f(x)=3x^2$ en $[0,\\,2]$?', 'ما القيمة المتوسطة لـ $f(x)=3x^2$ في $[0,\\,2]$؟', 'What is the mean value of $f(x)=3x^2$ on $[0,\\,2]$?'),
            options: [same('$8$'), same('$\\frac{2}{\\sqrt{3}}$'), same('$4$')],
            correctIndex: 2,
            explanation: say('$\\int_0^2 3x^2\\,dx=8$, eta $\\frac{8}{2}=4$. 8 integrala da, zatitu gabe; $\\frac{2}{\\sqrt{3}}$ zenbakia $c$ da.', '$\\int_0^2 3x^2\\,dx=8$ y $\\frac{8}{2}=4$. 8 es la integral sin dividir; $\\frac{2}{\\sqrt{3}}$ es $c$.', '$\\int_0^2 3x^2\\,dx=8$ و$\\frac{8}{2}=4$. العدد 8 هو التكامل دون قسمة، و$\\frac{2}{\\sqrt{3}}$ هو $c$.', '$\\int_0^2 3x^2\\,dx=8$ and $\\frac{8}{2}=4$. 8 is the integral without dividing; $\\frac{2}{\\sqrt{3}}$ is $c$.')
        }
    },

    /* ---------- 3. The fundamental theorem ---------- */
    'area-function': {
        mistake: {
            wrong: say('$F(x)=\\int_2^x t\\,dt$ bada, $F\'(x)=x-2$.', 'Si $F(x)=\\int_2^x t\\,dt$, $F\'(x)=x-2$.', 'إذا كانت $F(x)=\\int_2^x t\\,dt$ فإن $F\'(x)=x-2$.', 'If $F(x)=\\int_2^x t\\,dt$, $F\'(x)=x-2$.'),
            right: say('Beheko mugak ez du ezer kentzen deribatuan: $F\'(x)=x$. $F(2)=0$ betetzen du $F$ funtzioak, ez haren deribatuak.', 'El límite de abajo no resta nada en la derivada: $F\'(x)=x$. El que cumple $F(2)=0$ es $F$, no su derivada.', 'الحد الأدنى لا يطرح شيئًا في المشتقة: $F\'(x)=x$. والتي تحقق $F(2)=0$ هي $F$ لا مشتقتها.', 'The bottom limit subtracts nothing in the derivative: $F\'(x)=x$. What satisfies $F(2)=0$ is $F$, not its derivative.')
        },
        check: {
            prompt: say('$F(x)=\\int_0^x\\sqrt{t^2+1}\\,dt$ bada, zenbat da $F\'(x)$?', 'Si $F(x)=\\int_0^x\\sqrt{t^2+1}\\,dt$, ¿cuánto vale $F\'(x)$?', 'إذا كانت $F(x)=\\int_0^x\\sqrt{t^2+1}\\,dt$ فكم تساوي $F\'(x)$؟', 'If $F(x)=\\int_0^x\\sqrt{t^2+1}\\,dt$, what is $F\'(x)$?'),
            options: [same('$\\sqrt{x^2+1}$'), same('$\\frac{x}{\\sqrt{x^2+1}}$'), same('$\\sqrt{x^2+1}-1$')],
            correctIndex: 0,
            explanation: say('Barruko funtzioa da, $x$ jarrita $t$ letraren ordez. Bigarrena barruko funtzioaren deribatua da, eta hirugarrenak $f(0)$ kentzen du.', 'Es la función de dentro con $x$ en lugar de $t$. La segunda es la derivada de la de dentro, y la tercera resta $f(0)$.', 'إنها الدالة التي في الداخل مع $x$ بدل $t$. والثانية مشتقة الدالة التي في الداخل، والثالثة تطرح $f(0)$.', 'It is the function inside with $x$ instead of $t$. The second is the derivative of the one inside, and the third subtracts $f(0)$.')
        }
    },
    'upper-limit': {
        mistake: {
            wrong: same('$\\left(\\int_0^{x^2}e^t\\,dt\\right)\'=e^{x^2}$'),
            right: say('Mugaren deribatua falta da: $e^{x^2}\\cdot 2x$.', 'Falta la derivada del límite: $e^{x^2}\\cdot 2x$.', 'تنقص مشتقة الحد: $e^{x^2}\\cdot 2x$.', 'The derivative of the limit is missing: $e^{x^2}\\cdot 2x$.')
        },
        check: {
            prompt: say('$F(x)=\\int_1^{x^3}\\ln t\\,dt$ bada, zenbat da $F\'(x)$?', 'Si $F(x)=\\int_1^{x^3}\\ln t\\,dt$, ¿cuánto vale $F\'(x)$?', 'إذا كانت $F(x)=\\int_1^{x^3}\\ln t\\,dt$ فكم تساوي $F\'(x)$؟', 'If $F(x)=\\int_1^{x^3}\\ln t\\,dt$, what is $F\'(x)$?'),
            options: [same('$\\ln x^3$'), same('$\\ln x$'), same('$3x^2\\ln x^3$')],
            correctIndex: 2,
            explanation: say('$t=x^3$ jartzen da $\\ln t$ funtzioan, eta $3x^2$ adierazpenaz biderkatzen da. Lehenari $g\'$ falta zaio.', 'Se pone $t=x^3$ en $\\ln t$ y se multiplica por $3x^2$. A la primera le falta $g\'$.', 'نضع $t=x^3$ في $\\ln t$ ونضرب في $3x^2$. والأولى ينقصها $g\'$.', 'Put $t=x^3$ into $\\ln t$ and multiply by $3x^2$. The first one is missing $g\'$.')
        }
    },
    'barrow-conditions': {
        mistake: {
            wrong: same('$\\int_0^2\\frac{dx}{(x-1)^2}=\\left[-\\frac{1}{x-1}\\right]_0^2=-2$'),
            right: say('Asintota bat dago $x=1$ puntuan, $[0,\\,2]$ tartearen barruan: Barrow-k ez du balio. Funtzio positibo baten integrala ezin da negatiboa izan.', 'Hay una asíntota en $x=1$, dentro de $[0,\\,2]$: Barrow no vale. La integral de una función positiva no puede ser negativa.', 'يوجد مقارب عند $x=1$ داخل $[0,\\,2]$: لا تصح قاعدة بارو. وتكامل دالة موجبة لا يمكن أن يكون سالبًا.', 'There is an asymptote at $x=1$, inside $[0,\\,2]$: Barrow does not work. The integral of a positive function cannot be negative.')
        },
        check: {
            prompt: say('$f(x)=\\frac{1}{x-2}$ ez da jarraitua $x=2$ puntuan. Zein integraletan balio du Barrow-k?', '$f(x)=\\frac{1}{x-2}$ no es continua en $x=2$. ¿En qué integral vale Barrow?', '$f(x)=\\frac{1}{x-2}$ ليست متصلة عند $x=2$. في أي تكامل تصح قاعدة بارو؟', '$f(x)=\\frac{1}{x-2}$ is not continuous at $x=2$. In which integral does Barrow work?'),
            options: [same('$\\int_1^3 f(x)\\,dx$'), same('$\\int_3^5 f(x)\\,dx$'), same('$\\int_0^4 f(x)\\,dx$')],
            correctIndex: 1,
            explanation: say('$[3,\\,5]$ tarteak bakarrik uzten du $x=2$ kanpoan; beste biek barruan dute.', 'Solo $[3,\\,5]$ deja fuera $x=2$; los otros dos intervalos lo contienen.', 'وحدها $[3,\\,5]$ تترك $x=2$ خارجها؛ والفترتان الأخريان تحتويانه.', 'Only $[3,\\,5]$ leaves $x=2$ outside; the other two intervals contain it.')
        }
    },

    /* ---------- 4. Working out definite integrals ---------- */
    'definite-change': {
        mistake: {
            wrong: same('$\\int_1^2 2x\\sqrt{x^2-1}\\,dx=\\int_1^2\\sqrt{t}\\,dt$'),
            right: say('$t=x^2-1$ aldaketarekin, mugak $t=0$ eta $t=3$ dira: $\\int_0^3\\sqrt{t}\\,dt$.', 'Con $t=x^2-1$, los límites pasan a ser $t=0$ y $t=3$: $\\int_0^3\\sqrt{t}\\,dt$.', 'مع $t=x^2-1$ تصبح الحدود $t=0$ و$t=3$: $\\int_0^3\\sqrt{t}\\,dt$.', 'With $t=x^2-1$, the limits become $t=0$ and $t=3$: $\\int_0^3\\sqrt{t}\\,dt$.')
        },
        check: {
            prompt: say('$t=3x+1$ aldaketarekin, zein integral bihurtzen da $\\int_0^1\\sqrt{3x+1}\\,dx$?', 'Con $t=3x+1$, ¿en qué integral se convierte $\\int_0^1\\sqrt{3x+1}\\,dx$?', 'مع $t=3x+1$، إلى أي تكامل يتحول $\\int_0^1\\sqrt{3x+1}\\,dx$؟', 'With $t=3x+1$, which integral does $\\int_0^1\\sqrt{3x+1}\\,dx$ become?'),
            options: [same('$\\frac{1}{3}\\int_0^1\\sqrt{t}\\,dt$'), same('$\\frac{1}{3}\\int_1^4\\sqrt{t}\\,dt$'), same('$\\int_1^4\\sqrt{t}\\,dt$')],
            correctIndex: 1,
            explanation: say('$x=0$ denean $t=1$, eta $x=1$ denean $t=4$; gainera, $dx=\\frac{dt}{3}$. Lehenak muga zaharrak ditu, eta hirugarrenari $\\frac{1}{3}$ falta zaio.', 'Si $x=0$, $t=1$; si $x=1$, $t=4$; y $dx=\\frac{dt}{3}$. La primera tiene los límites viejos y a la tercera le falta $\\frac{1}{3}$.', 'إذا كان $x=0$ فإن $t=1$، وإذا كان $x=1$ فإن $t=4$، و$dx=\\frac{dt}{3}$. الأولى بالحدود القديمة والثالثة ينقصها $\\frac{1}{3}$.', 'If $x=0$, $t=1$; if $x=1$, $t=4$; and $dx=\\frac{dt}{3}$. The first has the old limits and the third is missing $\\frac{1}{3}$.')
        }
    },
    'definite-parts': {
        mistake: {
            wrong: same('$\\begin{aligned}&\\int_0^1 xe^{2x}\\,dx\\\\ &=\\frac{xe^{2x}}{2}-\\int_0^1\\frac{e^{2x}}{2}\\,dx\\end{aligned}$'),
            right: say('$uv$ zatia ere 0 eta 1 artean kalkulatzen da: $\\left[\\frac{xe^{2x}}{2}\\right]_0^1=\\frac{e^2}{2}$.', 'La parte $uv$ también va entre 0 y 1: $\\left[\\frac{xe^{2x}}{2}\\right]_0^1=\\frac{e^2}{2}$.', 'الجزء $uv$ أيضًا بين 0 و1: $\\left[\\frac{xe^{2x}}{2}\\right]_0^1=\\frac{e^2}{2}$.', 'The part $uv$ also goes between 0 and 1: $\\left[\\frac{xe^{2x}}{2}\\right]_0^1=\\frac{e^2}{2}$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int_0^{\\pi}x\\sin x\\,dx$, $u=x$ hartuta.', 'Calcula $\\int_0^{\\pi}x\\sin x\\,dx$ con $u=x$.', 'احسب $\\int_0^{\\pi}x\\sin x\\,dx$ مع $u=x$.', 'Work out $\\int_0^{\\pi}x\\sin x\\,dx$ with $u=x$.'),
            options: [same('$\\pi$'), same('$0$'), same('$-\\pi$')],
            correctIndex: 0,
            explanation: say('$\\left[-x\\cos x\\right]_0^{\\pi}=\\pi$, eta $\\int_0^{\\pi}\\cos x\\,dx=0$. $uv$ zatia ahaztuta, 0 ateratzen da.', '$\\left[-x\\cos x\\right]_0^{\\pi}=\\pi$ y $\\int_0^{\\pi}\\cos x\\,dx=0$. Olvidando $uv$ sale 0.', '$\\left[-x\\cos x\\right]_0^{\\pi}=\\pi$ و$\\int_0^{\\pi}\\cos x\\,dx=0$. وبنسيان $uv$ نحصل على 0.', '$\\left[-x\\cos x\\right]_0^{\\pi}=\\pi$ and $\\int_0^{\\pi}\\cos x\\,dx=0$. Forgetting $uv$ gives 0.')
        }
    },
    piecewise: {
        mistake: {
            wrong: same('$\\int_{-1}^{3}|x|\\,dx=\\left[\\frac{x^2}{2}\\right]_{-1}^{3}=4$'),
            right: say('$|x|$ funtzioak formula aldatzen du 0 puntuan: $\\frac{1}{2}+\\frac{9}{2}=5$.', '$|x|$ cambia de fórmula en 0: $\\frac{1}{2}+\\frac{9}{2}=5$.', 'تتغير صيغة $|x|$ عند 0: $\\frac{1}{2}+\\frac{9}{2}=5$.', '$|x|$ changes formula at 0: $\\frac{1}{2}+\\frac{9}{2}=5$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int_0^5|x-3|\\,dx$, $x=3$ puntuan zatituz.', 'Calcula $\\int_0^5|x-3|\\,dx$ partiendo en $x=3$.', 'احسب $\\int_0^5|x-3|\\,dx$ بالتقسيم عند $x=3$.', 'Work out $\\int_0^5|x-3|\\,dx$ by splitting at $x=3$.'),
            options: [same('$-\\frac{5}{2}$'), same('$\\frac{13}{2}$'), same('$\\frac{5}{2}$')],
            correctIndex: 1,
            explanation: say('$\\int_0^3(3-x)\\,dx=\\frac{9}{2}$ eta $\\int_3^5(x-3)\\,dx=2$: guztira, $\\frac{13}{2}$. Balio absoluturik gabe, $-\\frac{5}{2}$ ateratzen da.', '$\\int_0^3(3-x)\\,dx=\\frac{9}{2}$ y $\\int_3^5(x-3)\\,dx=2$: en total, $\\frac{13}{2}$. Sin el valor absoluto sale $-\\frac{5}{2}$.', '$\\int_0^3(3-x)\\,dx=\\frac{9}{2}$ و$\\int_3^5(x-3)\\,dx=2$: المجموع $\\frac{13}{2}$. ومن دون القيمة المطلقة نحصل على $-\\frac{5}{2}$.', '$\\int_0^3(3-x)\\,dx=\\frac{9}{2}$ and $\\int_3^5(x-3)\\,dx=2$: in all, $\\frac{13}{2}$. Without the absolute value you get $-\\frac{5}{2}$.')
        }
    },

    /* ---------- 5. Regions and problems ---------- */
    'three-curves': {
        mistake: {
            wrong: say('Integral bakarra: $\\int_0^2\\left((2-x)-x^2\\right)dx$.', 'Una sola integral: $\\int_0^2\\left((2-x)-x^2\\right)dx$.', 'تكامل واحد: $\\int_0^2\\left((2-x)-x^2\\right)dx$.', 'A single integral: $\\int_0^2\\left((2-x)-x^2\\right)dx$.'),
            right: say('Goiko ertza aldatu egiten da $x=1$ puntuan: bi zerrenda behar dira, $\\int_0^1 x^2\\,dx+\\int_1^2(2-x)\\,dx$.', 'El borde de arriba cambia en $x=1$: hacen falta dos tiras, $\\int_0^1 x^2\\,dx+\\int_1^2(2-x)\\,dx$.', 'يتغير الحد الأعلى عند $x=1$: نحتاج إلى شريحتين، $\\int_0^1 x^2\\,dx+\\int_1^2(2-x)\\,dx$.', 'The top edge changes at $x=1$: two strips are needed, $\\int_0^1 x^2\\,dx+\\int_1^2(2-x)\\,dx$.')
        },
        check: {
            prompt: say('Zein integralek ematen du $y=\\sqrt{x}$ kurbaren, $y=2-x$ zuzenaren eta X ardatzaren arteko azalera?', '¿Qué integral da el área entre $y=\\sqrt{x}$, $y=2-x$ y el eje X?', 'أي تكامل يعطي المساحة بين $y=\\sqrt{x}$ و$y=2-x$ ومحور X؟', 'Which integral gives the area between $y=\\sqrt{x}$, $y=2-x$ and the x-axis?'),
            options: [same('$\\int_0^2\\left(\\sqrt{x}-(2-x)\\right)dx$'), same('$\\int_0^1\\left((2-x)-\\sqrt{x}\\right)dx$'), same('$\\int_0^1\\sqrt{x}\\,dx+\\int_1^2(2-x)\\,dx$')],
            correctIndex: 2,
            explanation: say('Ebaki-puntuak: $x=0$, $x=1$ eta $x=2$. 1 arte $\\sqrt{x}$ da goian, eta X ardatza behean; gero, $2-x$.', 'Cortes: $x=0$, $x=1$ y $x=2$. Hasta 1, arriba va $\\sqrt{x}$ y abajo el eje X; después, $2-x$.', 'نقاط التقاطع: $x=0$ و$x=1$ و$x=2$. حتى 1 يكون $\\sqrt{x}$ في الأعلى ومحور X في الأسفل، ثم $2-x$.', 'Crossings: $x=0$, $x=1$ and $x=2$. Up to 1, the top is $\\sqrt{x}$ and the bottom is the x-axis; then $2-x$.')
        }
    },
    parameter: {
        mistake: {
            wrong: say('$\\int_0^b 2x\\,dx=b^2=16$; beraz, $b=\\pm 4$.', '$\\int_0^b 2x\\,dx=b^2=16$, así que $b=\\pm 4$.', '$\\int_0^b 2x\\,dx=b^2=16$، إذن $b=\\pm 4$.', '$\\int_0^b 2x\\,dx=b^2=16$, so $b=\\pm 4$.'),
            right: say('Enuntziatuak $b>0$ eskatzen badu, $b=4$ bakarrik da baliozkoa.', 'Si el enunciado pide $b>0$, solo vale $b=4$.', 'إذا طلب نص المسألة $b>0$ فلا يصح إلا $b=4$.', 'If the question asks for $b>0$, only $b=4$ works.')
        },
        check: {
            prompt: say('Zein $a$ zenbakitarako da $\\int_1^a\\frac{dx}{x}=2$?', '¿Para qué $a$ es $\\int_1^a\\frac{dx}{x}=2$?', 'لأي $a$ يكون $\\int_1^a\\frac{dx}{x}=2$؟', 'For which $a$ is $\\int_1^a\\frac{dx}{x}=2$?'),
            options: [same('$a=2$'), same('$a=e^2$'), same('$a=\\ln 2$')],
            correctIndex: 1,
            explanation: say('$\\ln a-\\ln 1=\\ln a=2$; beraz, $a=e^2$.', '$\\ln a-\\ln 1=\\ln a=2$, así que $a=e^2$.', '$\\ln a-\\ln 1=\\ln a=2$، إذن $a=e^2$.', '$\\ln a-\\ln 1=\\ln a=2$, so $a=e^2$.')
        }
    },
    'integral-extrema': {
        mistake: {
            wrong: say('$F(x)=\\int_0^x(t-1)\\,dt$: maximoa $x=1$ puntuan, $F\'(1)=0$ delako.', '$F(x)=\\int_0^x(t-1)\\,dt$: máximo en $x=1$, porque $F\'(1)=0$.', '$F(x)=\\int_0^x(t-1)\\,dt$: قيمة عظمى عند $x=1$ لأن $F\'(1)=0$.', '$F(x)=\\int_0^x(t-1)\\,dt$: a maximum at $x=1$, because $F\'(1)=0$.'),
            right: say('$F\'(x)=x-1$ deribatua $-$ izatetik $+$ izatera pasatzen da 1 puntuan: minimoa da.', '$F\'(x)=x-1$ pasa de $-$ a $+$ en 1: es un mínimo.', 'تنتقل $F\'(x)=x-1$ من $-$ إلى $+$ عند 1: إنها قيمة صغرى.', '$F\'(x)=x-1$ goes from $-$ to $+$ at 1: it is a minimum.')
        },
        check: {
            prompt: say('$F(x)=\\int_0^x t(t-3)\\,dt$ bada, non du $F$ funtzioak minimo bat?', 'Si $F(x)=\\int_0^x t(t-3)\\,dt$, ¿dónde tiene $F$ un mínimo?', 'إذا كانت $F(x)=\\int_0^x t(t-3)\\,dt$ فأين تكون لـ $F$ قيمة صغرى؟', 'If $F(x)=\\int_0^x t(t-3)\\,dt$, where does $F$ have a minimum?'),
            options: [same('$x=0$'), same('$x=\\frac{3}{2}$'), same('$x=3$')],
            correctIndex: 2,
            explanation: say('$F\'(x)=x(x-3)$ negatiboa da $(0,\\,3)$ tartean, eta positiboa ondoren: minimoa 3 puntuan. $x=0$ puntuan maximoa dago.', '$F\'(x)=x(x-3)$ es negativa en $(0,\\,3)$ y positiva después: mínimo en 3. En $x=0$ hay un máximo.', '$F\'(x)=x(x-3)$ سالبة في $(0,\\,3)$ وموجبة بعدها: قيمة صغرى عند 3. وعند $x=0$ قيمة عظمى.', '$F\'(x)=x(x-3)$ is negative on $(0,\\,3)$ and positive after: a minimum at 3. At $x=0$ there is a maximum.')
        }
    },
    revolution: {
        mistake: {
            wrong: say('$y=x$ biratuz, 0 eta 3 artean: $V=\\pi\\int_0^3 x\\,dx$.', 'Al girar $y=x$ entre 0 y 3: $V=\\pi\\int_0^3 x\\,dx$.', 'عند دوران $y=x$ بين 0 و3: $V=\\pi\\int_0^3 x\\,dx$.', 'Turning $y=x$ between 0 and 3: $V=\\pi\\int_0^3 x\\,dx$.'),
            right: say('Erradioaren karratua integratzen da: $V=\\pi\\int_0^3 x^2\\,dx=9\\pi$.', 'Se integra el cuadrado del radio: $V=\\pi\\int_0^3 x^2\\,dx=9\\pi$.', 'نكامل مربع نصف القطر: $V=\\pi\\int_0^3 x^2\\,dx=9\\pi$.', 'You integrate the square of the radius: $V=\\pi\\int_0^3 x^2\\,dx=9\\pi$.')
        },
        check: {
            prompt: say('Zenbat da bolumena, $y=x^2$ X ardatzaren inguruan biratzean $[0,\\,1]$ tartean?', '¿Cuánto vale el volumen al girar $y=x^2$ alrededor del eje X en $[0,\\,1]$?', 'كم يساوي الحجم عند دوران $y=x^2$ حول محور X في $[0,\\,1]$؟', 'What is the volume when $y=x^2$ is turned about the x-axis on $[0,\\,1]$?'),
            options: [same('$\\frac{\\pi}{5}$'), same('$\\frac{\\pi}{3}$'), same('$\\frac{1}{5}$')],
            correctIndex: 0,
            explanation: say('$V=\\pi\\int_0^1 x^4\\,dx=\\frac{\\pi}{5}$. $\\frac{\\pi}{3}$ zenbakiari karratua falta zaio, eta $\\frac{1}{5}$ zenbakiari $\\pi$.', '$V=\\pi\\int_0^1 x^4\\,dx=\\frac{\\pi}{5}$. A $\\frac{\\pi}{3}$ le falta el cuadrado y a $\\frac{1}{5}$, $\\pi$.', '$V=\\pi\\int_0^1 x^4\\,dx=\\frac{\\pi}{5}$. ينقص $\\frac{\\pi}{3}$ التربيع وينقص $\\frac{1}{5}$ العدد $\\pi$.', '$V=\\pi\\int_0^1 x^4\\,dx=\\frac{\\pi}{5}$. $\\frac{\\pi}{3}$ is missing the square and $\\frac{1}{5}$ is missing $\\pi$.')
        }
    }
}

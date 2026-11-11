import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Funtzioen adierazpena · Batxilergoa 2 · Zientziak — the typical mistake
   and the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical
   mistake: a polynomial going to +∞ on both sides, an asymptote at every
   zero of the denominator, a curve that never cuts its horizontal
   asymptote, even and odd swapped, one side for the whole curve, an
   asymptote at the edge of a root, the power beating the exponential,
   e^g reaching 0, ln defined at 0, the same oblique on both sides, a
   maximum of 2 for sin + cos, pieces drawn everywhere, |f(x)| taken for
   f(|x|), the extremum of f′ read as one of f, and data that fix a
   single curve.
   ========================================================================== */

export type Bach2SketchTopicId =
    | 'sketch-plan' | 'asymptotes-review' | 'rational-review'
    | 'symmetry-period' | 'asymptote-position' | 'domain-edges'
    | 'exp-products' | 'exp-special' | 'log-functions'
    | 'root-functions' | 'trig-functions' | 'piecewise-graphs'
    | 'absolute-graphs' | 'derivative-graph' | 'curve-from-data'

export const bach2SketchLessonChecks: Record<Bach2SketchTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Review of 1.º ---------- */
    'sketch-plan': {
        mistake: {
            wrong: say('Polinomio bat $+\\infty$ aldera doa bi aldeetatik.', 'Un polinomio va a $+\\infty$ por los dos lados.', 'تذهب الحدودية إلى $+\\infty$ من الجهتين.', 'A polynomial goes to $+\\infty$ on both sides.'),
            right: say('Mailaren eta gai nagusiaren zeinuaren araberakoa da. $x^3$ funtzioa $-\\infty$ aldera doa ezkerretik eta $+\\infty$ aldera eskuinetik; $-x^4$ funtzioa $-\\infty$ aldera doa bi aldeetatik.', 'Depende del grado y del signo del término principal. $x^3$ va a $-\\infty$ por la izquierda y a $+\\infty$ por la derecha; $-x^4$ va a $-\\infty$ por los dos lados.', 'يتعلق ذلك بالدرجة وبإشارة الحد الرئيسي. تذهب $x^3$ إلى $-\\infty$ من اليسار وإلى $+\\infty$ من اليمين، وتذهب $-x^4$ إلى $-\\infty$ من الجهتين.', 'It depends on the degree and on the sign of the leading term. $x^3$ goes to $-\\infty$ on the left and to $+\\infty$ on the right; $-x^4$ goes to $-\\infty$ on both sides.')
        },
        check: {
            prompt: say('Nora doa $f(x)=-x^3+5x$ funtzioa $x\\to+\\infty$ doanean?', '¿Hacia dónde va $f(x)=-x^3+5x$ cuando $x\\to+\\infty$?', 'إلى أين تذهب $f(x)=-x^3+5x$ عندما $x\\to+\\infty$؟', 'Where does $f(x)=-x^3+5x$ go as $x\\to+\\infty$?'),
            options: [same('$+\\infty$'), same('$-\\infty$'), same('$0$')],
            correctIndex: 1,
            explanation: say('Maila handieneko gaiak agintzen du, $-x^3$: $x\\to+\\infty$ doanean, $f\\to-\\infty$.', 'Manda el término de mayor grado, $-x^3$: cuando $x\\to+\\infty$, $f\\to-\\infty$.', 'يتحكم الحد الأعلى درجة $-x^3$: عندما $x\\to+\\infty$ يكون $f\\to-\\infty$.', 'The highest-degree term rules, $-x^3$: as $x\\to+\\infty$, $f\\to-\\infty$.')
        }
    },
    'asymptotes-review': {
        mistake: {
            wrong: say('Funtzio arrazional batek asintota bertikal bat du izendatzailearen zero bakoitzean.', 'Una racional tiene asíntota vertical en cada cero del denominador.', 'للدالة الكسرية مقارب رأسي عند كل صفر للمقام.', 'A rational function has a vertical asymptote at every zero of the denominator.'),
            right: say('Zenbakitzailea ere zero ez bada bakarrik. $\\frac{x^2-1}{x-1}=x+1$ adierazpenean izendatzailea zero da 1 puntuan, baina zulo bat dago, ez asintota bat.', 'Solo si el numerador no se anula también. En $\\frac{x^2-1}{x-1}=x+1$ el denominador se anula en 1, pero hay un agujero, no una asíntota.', 'فقط إذا لم ينعدم البسط أيضًا. في $\\frac{x^2-1}{x-1}=x+1$ ينعدم المقام عند 1، لكن توجد ثغرة لا مقارب.', 'Only if the numerator is not 0 too. In $\\frac{x^2-1}{x-1}=x+1$ the denominator is 0 at 1, but there is a hole, not an asymptote.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\frac{x^2+3}{x}$ funtzioaren asintota zeiharra, $x\\to\\pm\\infty$ doanean?', '¿Cuál es la asíntota oblicua de $f(x)=\\frac{x^2+3}{x}$ cuando $x\\to\\pm\\infty$?', 'ما المقارب المائل للدالة $f(x)=\\frac{x^2+3}{x}$ عندما $x\\to\\pm\\infty$؟', 'What is the oblique asymptote of $f(x)=\\frac{x^2+3}{x}$ as $x\\to\\pm\\infty$?'),
            options: [same('$y=x$'), same('$y=x+3$'), same('$y=3$')],
            correctIndex: 0,
            explanation: say('$\\frac{x^2+3}{x}=x+\\frac{3}{x}$ da, eta $\\frac{3}{x}\\to 0$: zeiharra $y=x$ da.', '$\\frac{x^2+3}{x}=x+\\frac{3}{x}$, y $\\frac{3}{x}\\to 0$: la oblicua es $y=x$.', '$\\frac{x^2+3}{x}=x+\\frac{3}{x}$، و$\\frac{3}{x}\\to 0$: المقارب المائل $y=x$.', '$\\frac{x^2+3}{x}=x+\\frac{3}{x}$, and $\\frac{3}{x}\\to 0$: the oblique asymptote is $y=x$.')
        }
    },
    'rational-review': {
        mistake: {
            wrong: say('Kurbak ez du inoiz bere asintota horizontala ebakitzen.', 'La curva nunca corta a su asíntota horizontal.', 'لا يقطع المنحنى مقاربه الأفقي أبدًا.', 'The curve never cuts its horizontal asymptote.'),
            right: say('Ebaki dezake: $\\frac{x}{x^2+1}$ funtzioak $y=0$ asintota du, eta $x=0$ puntuan ebakitzen du. Ezin duena da asintota bertikal bat ebaki.', 'Puede cortarla: $\\frac{x}{x^2+1}$ tiene asíntota $y=0$ y la corta en $x=0$. Lo que no puede es cortar una asíntota vertical.', 'يمكن أن يقطعه: للدالة $\\frac{x}{x^2+1}$ المقارب $y=0$ وتقطعه عند $x=0$. أما المقارب الرأسي فلا يمكن قطعه.', 'It can: $\\frac{x}{x^2+1}$ has the asymptote $y=0$ and cuts it at $x=0$. What it cannot cut is a vertical asymptote.')
        },
        check: {
            prompt: say('Zenbat adar ditu $f(x)=\\frac{1}{x^2-4}$ funtzioaren grafikoak, $x=\\pm 2$ asintota bertikalen artean?', '¿Cuántas ramas tiene la gráfica de $f(x)=\\frac{1}{x^2-4}$ entre sus asíntotas verticales $x=\\pm 2$?', 'كم فرعًا لرسم $f(x)=\\frac{1}{x^2-4}$ بين مقاربيه الرأسيين $x=\\pm 2$؟', 'How many branches does the graph of $f(x)=\\frac{1}{x^2-4}$ have between its vertical asymptotes $x=\\pm 2$?'),
            options: [same('$4$'), same('$2$'), same('$3$')],
            correctIndex: 2,
            explanation: say('$x=-2$ eta $x=2$ asintotek zuzena hiru zatitan banatzen dute: grafikoak hiru adar ditu.', 'Las asíntotas $x=-2$ y $x=2$ parten la recta en tres trozos: la gráfica tiene tres ramas.', 'يقسم المقاربان $x=-2$ و$x=2$ المستقيم إلى ثلاثة أجزاء: للرسم ثلاثة فروع.', 'The asymptotes $x=-2$ and $x=2$ split the line into three pieces: the graph has three branches.')
        }
    },

    /* ---------- 2. The study before differentiating ---------- */
    'symmetry-period': {
        mistake: {
            wrong: say('$f(-x)=-f(x)$ bada, $f$ bikoitia da.', 'Si $f(-x)=-f(x)$, $f$ es par.', 'إذا كان $f(-x)=-f(x)$ فإن $f$ زوجية.', 'If $f(-x)=-f(x)$, $f$ is even.'),
            right: say('Hori bakoitia da: jatorriarekiko simetrikoa. Bikoitia $f(-x)=f(x)$ da, $x^2$ edo $\\cos x$ bezala.', 'Eso es impar: simétrica respecto del origen. Par es $f(-x)=f(x)$, como $x^2$ o $\\cos x$.', 'هذه فردية: متناظرة بالنسبة إلى الأصل. والزوجية $f(-x)=f(x)$، مثل $x^2$ أو $\\cos x$.', 'That is odd: symmetric about the origin. Even is $f(-x)=f(x)$, like $x^2$ or $\\cos x$.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\sin 4x$ funtzioaren $T$ periodoa?', '¿Cuál es el periodo $T$ de $f(x)=\\sin 4x$?', 'ما الدور $T$ للدالة $f(x)=\\sin 4x$؟', 'What is the period $T$ of $f(x)=\\sin 4x$?'),
            options: [same('$2\\pi$'), same('$\\frac{\\pi}{2}$'), same('$4\\pi$')],
            correctIndex: 1,
            explanation: say('$\\sin 4(x+T)=\\sin(4x+4T)$ errepikatzen da $4T=2\\pi$ denean: $T=\\frac{\\pi}{2}$.', '$\\sin 4(x+T)=\\sin(4x+4T)$ se repite cuando $4T=2\\pi$: $T=\\frac{\\pi}{2}$.', 'تتكرر $\\sin 4(x+T)=\\sin(4x+4T)$ عندما $4T=2\\pi$: إذن $T=\\frac{\\pi}{2}$.', '$\\sin 4(x+T)=\\sin(4x+4T)$ repeats when $4T=2\\pi$: $T=\\frac{\\pi}{2}$.')
        }
    },
    'asymptote-position': {
        mistake: {
            wrong: say('Kurba beti doa bere asintotaren alde beretik.', 'La curva va siempre por el mismo lado de su asíntota.', 'يسير المنحنى دائمًا في الجهة نفسها من مقاربه.', 'The curve always runs on the same side of its asymptote.'),
            right: say('Alda daiteke: $x+\\frac{1}{x}$ funtzioa $y=x$ zuzenaren gainetik doa eskuinean eta azpitik ezkerrean.', 'Puede cambiar: $x+\\frac{1}{x}$ va por encima de $y=x$ por la derecha y por debajo por la izquierda.', 'قد تتغير: تسير $x+\\frac{1}{x}$ فوق $y=x$ من اليمين وتحته من اليسار.', 'It can change: $x+\\frac{1}{x}$ runs above $y=x$ on the right and below it on the left.')
        },
        check: {
            prompt: say('Non doa $f(x)=\\frac{1}{x^2}+1$ funtzioa $y=1$ zuzenarekiko, $x\\to\\pm\\infty$ doanean?', '¿Por dónde va $f(x)=\\frac{1}{x^2}+1$ respecto de $y=1$ cuando $x\\to\\pm\\infty$?', 'أين تسير $f(x)=\\frac{1}{x^2}+1$ بالنسبة إلى $y=1$ عندما $x\\to\\pm\\infty$؟', 'Where does $f(x)=\\frac{1}{x^2}+1$ run relative to $y=1$ as $x\\to\\pm\\infty$?'),
            options: [say('Gainetik bi aldeetan', 'Por encima a los dos lados', 'فوقه من الجهتين', 'Above on both sides'), say('Azpitik bi aldeetan', 'Por debajo a los dos lados', 'تحته من الجهتين', 'Below on both sides'), say('Gainetik ezkerrean eta azpitik eskuinean', 'Encima a la izquierda y debajo a la derecha', 'فوقه يسارًا وتحته يمينًا', 'Above on the left and below on the right')],
            correctIndex: 0,
            explanation: say('$f(x)-1=\\frac{1}{x^2}$ beti da positiboa: kurba gainetik doa bi aldeetan.', '$f(x)-1=\\frac{1}{x^2}$ es siempre positiva: la curva va por encima a los dos lados.', '$f(x)-1=\\frac{1}{x^2}$ موجبة دائمًا: يسير المنحنى فوقه من الجهتين.', '$f(x)-1=\\frac{1}{x^2}$ is always positive: the curve runs above on both sides.')
        }
    },
    'domain-edges': {
        mistake: {
            wrong: say('$\\sqrt{9-x^2}$ funtzioaren izate-eremuaren ertzetan asintota bertikalak daude.', 'En los bordes del dominio de $\\sqrt{9-x^2}$ hay asíntotas verticales.', 'عند حافتي مجال $\\sqrt{9-x^2}$ مقاربات رأسية.', 'At the edges of the domain of $\\sqrt{9-x^2}$ there are vertical asymptotes.'),
            right: say('Ez: funtzioak 0 balio du $x=\\pm 3$ puntuetan, ez du infinitura jotzen. Han kurba amaitu egiten da, zuzen ukitzaile bertikalarekin.', 'No: la función vale 0 en $x=\\pm 3$, no se va a infinito. Allí la curva termina con tangente vertical.', 'لا: قيمة الدالة 0 عند $x=\\pm 3$ ولا تذهب إلى اللانهاية. وهناك ينتهي المنحنى بمماس رأسي.', 'No: the function is 0 at $x=\\pm 3$; it does not go to infinity. There the curve ends with a vertical tangent.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\sqrt{x^2-1}$ funtzioaren izate-eremua $\\mathbb{R}$ multzoan?', '¿Cuál es el dominio de $f(x)=\\sqrt{x^2-1}$ en $\\mathbb{R}$?', 'ما مجال $f(x)=\\sqrt{x^2-1}$ في $\\mathbb{R}$؟', 'What is the domain of $f(x)=\\sqrt{x^2-1}$ in $\\mathbb{R}$?'),
            options: [same('$[-1,\\,1]$'), same('$(-\\infty,-1]\\cup[1,+\\infty)$'), same('$\\mathbb{R}$')],
            correctIndex: 1,
            explanation: say('$x^2-1\\ge 0$ da $|x|\\ge 1$ bada: $(-\\infty,-1]\\cup[1,+\\infty)$.', '$x^2-1\\ge 0$ si $|x|\\ge 1$: $(-\\infty,-1]\\cup[1,+\\infty)$.', '$x^2-1\\ge 0$ إذا كان $|x|\\ge 1$: أي $(-\\infty,-1]\\cup[1,+\\infty)$.', '$x^2-1\\ge 0$ if $|x|\\ge 1$: $(-\\infty,-1]\\cup[1,+\\infty)$.')
        }
    },

    /* ---------- 3. Exponential and logarithmic ---------- */
    'exp-products': {
        mistake: {
            wrong: say('$x\\to+\\infty$ doanean, $x^2e^{-x}\\to+\\infty$, $x^2$ hazi egiten delako.', 'Cuando $x\\to+\\infty$, $x^2e^{-x}\\to+\\infty$ porque $x^2$ crece.', 'عندما $x\\to+\\infty$ يكون $x^2e^{-x}\\to+\\infty$ لأن $x^2$ تكبر.', 'As $x\\to+\\infty$, $x^2e^{-x}\\to+\\infty$ because $x^2$ grows.'),
            right: say('Esponentziala edozein berretura baino azkarrago hazten da: $\\frac{x^2}{e^x}\\to 0$.', 'La exponencial crece más deprisa que cualquier potencia: $\\frac{x^2}{e^x}\\to 0$.', 'تكبر الدالة الأسية أسرع من أي قوة: $\\frac{x^2}{e^x}\\to 0$.', 'The exponential grows faster than any power: $\\frac{x^2}{e^x}\\to 0$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to+\\infty}x^3e^{-x}$? $\\infty\\cdot 0$ da.', '¿Cuánto vale $\\lim_{x\\to+\\infty}x^3e^{-x}$? Es $\\infty\\cdot 0$.', 'كم تساوي $\\lim_{x\\to+\\infty}x^3e^{-x}$؟ إنها $\\infty\\cdot 0$.', 'What is $\\lim_{x\\to+\\infty}x^3e^{-x}$? It is $\\infty\\cdot 0$.'),
            options: [same('$+\\infty$'), same('$1$'), same('$0$')],
            correctIndex: 2,
            explanation: say('$\\frac{x^3}{e^x}$: esponentzialak irabazten du; hiru aldiz L\'Hôpital eginez $\\frac{6}{e^x}\\to 0$.', '$\\frac{x^3}{e^x}$: la exponencial gana; tres veces L\'Hôpital da $\\frac{6}{e^x}\\to 0$.', '$\\frac{x^3}{e^x}$: تغلب الدالة الأسية؛ ولوبيتال ثلاث مرات يعطي $\\frac{6}{e^x}\\to 0$.', '$\\frac{x^3}{e^x}$: the exponential wins; L\'Hôpital three times gives $\\frac{6}{e^x}\\to 0$.')
        }
    },
    'exp-special': {
        mistake: {
            wrong: say('$e^{g(x)}$ esponentzialak 0 balio dezake.', 'Una exponencial $e^{g(x)}$ puede valer 0.', 'قد تساوي الدالة الأسية $e^{g(x)}$ صفرًا.', 'An exponential $e^{g(x)}$ can be 0.'),
            right: say('Inoiz ez: $e^{g(x)}>0$ beti. 0 baliora hurbil daiteke, $e^{-x^2}$ bezala $x\\to\\pm\\infty$ doanean, baina ez du lortzen.', 'Nunca: $e^{g(x)}>0$ siempre. Puede acercarse a 0, como $e^{-x^2}$ cuando $x\\to\\pm\\infty$, pero no lo alcanza.', 'أبدًا: $e^{g(x)}>0$ دائمًا. قد تقترب من 0 مثل $e^{-x^2}$ عندما $x\\to\\pm\\infty$ لكنها لا تبلغه.', 'Never: $e^{g(x)}>0$ always. It can approach 0, like $e^{-x^2}$ as $x\\to\\pm\\infty$, but it never reaches it.')
        },
        check: {
            prompt: say('Non du $f(x)=e^{-(x-2)^2}$ funtzioak maximoa $\\mathbb{R}$ multzoan?', '¿Dónde tiene $f(x)=e^{-(x-2)^2}$ su máximo en $\\mathbb{R}$?', 'أين تبلغ $f(x)=e^{-(x-2)^2}$ قيمتها العظمى على $\\mathbb{R}$؟', 'Where does $f(x)=e^{-(x-2)^2}$ have its maximum on $\\mathbb{R}$?'),
            options: [same('$(2,\\,1)$'), same('$(0,\\,1)$'), same('$(2,\\,0)$')],
            correctIndex: 0,
            explanation: say('Berretzailea, $-(x-2)^2$, handiena da $x=2$ puntuan, eta han $f(2)=e^0=1$.', 'El exponente $-(x-2)^2$ es máximo en $x=2$, y allí $f(2)=e^0=1$.', 'يكون الأس $-(x-2)^2$ أعظميًّا عند $x=2$، وهناك $f(2)=e^0=1$.', 'The exponent $-(x-2)^2$ is largest at $x=2$, and there $f(2)=e^0=1$.')
        }
    },
    'log-functions': {
        mistake: {
            wrong: say('$\\ln(x-1)$ funtzioaren izate-eremua $x\\ge 1$ da.', 'El dominio de $\\ln(x-1)$ es $x\\ge 1$.', 'مجال $\\ln(x-1)$ هو $x\\ge 1$.', 'The domain of $\\ln(x-1)$ is $x\\ge 1$.'),
            right: say('Barrukoak positiboa izan behar du, ezin du 0 izan: $x-1>0$, hau da, $x>1$. $x=1$ zuzena asintota bertikala da.', 'Lo de dentro tiene que ser positivo, no puede ser 0: $x-1>0$, es decir, $x>1$. En $x=1$ hay una asíntota vertical.', 'يجب أن يكون ما بالداخل موجبًا ولا يمكن أن يساوي 0: $x-1>0$، أي $x>1$. وعند $x=1$ مقارب رأسي.', 'The inside has to be positive; it cannot be 0: $x-1>0$, that is, $x>1$. At $x=1$ there is a vertical asymptote.')
        },
        check: {
            prompt: say('Zein $x$ baliotan du $f(x)=\\frac{\\ln x}{x^2}$ funtzioak maximoa $(0,\\,+\\infty)$ tartean?', '¿En qué $x$ tiene su máximo $f(x)=\\frac{\\ln x}{x^2}$ en $(0,\\,+\\infty)$?', 'عند أي $x$ تبلغ $f(x)=\\frac{\\ln x}{x^2}$ قيمتها العظمى على $(0,\\,+\\infty)$؟', 'At which $x$ does $f(x)=\\frac{\\ln x}{x^2}$ have its maximum on $(0,\\,+\\infty)$?'),
            options: [same('$\\sqrt{e}$'), same('$e$'), same('$1$')],
            correctIndex: 0,
            explanation: say('$f\'(x)=\\frac{1-2\\ln x}{x^3}=0$ eginez $\\ln x=\\frac{1}{2}$, hau da, $x=\\sqrt{e}$.', '$f\'(x)=\\frac{1-2\\ln x}{x^3}=0$ da $\\ln x=\\frac{1}{2}$, es decir, $x=\\sqrt{e}$.', '$f\'(x)=\\frac{1-2\\ln x}{x^3}=0$ يعطي $\\ln x=\\frac{1}{2}$، أي $x=\\sqrt{e}$.', '$f\'(x)=\\frac{1-2\\ln x}{x^3}=0$ gives $\\ln x=\\frac{1}{2}$, that is, $x=\\sqrt{e}$.')
        }
    },

    /* ---------- 4. Roots, trigonometric and piecewise ---------- */
    'root-functions': {
        mistake: {
            wrong: say('$\\sqrt{x^2-4}$ funtzioak $y=x$ zeiharra du bi aldeetatik.', '$\\sqrt{x^2-4}$ tiene la misma oblicua $y=x$ por los dos lados.', 'للدالة $\\sqrt{x^2-4}$ المقارب المائل نفسه $y=x$ من الجهتين.', '$\\sqrt{x^2-4}$ has the same oblique asymptote $y=x$ on both sides.'),
            right: say('Ezkerrean $x<0$ da, eta $\\sqrt{x^2}=|x|=-x$: zeiharra $y=-x$ da.', 'Por la izquierda $x<0$ y $\\sqrt{x^2}=|x|=-x$: la oblicua es $y=-x$.', 'من اليسار يكون $x<0$ و$\\sqrt{x^2}=|x|=-x$: المقارب المائل $y=-x$.', 'On the left $x<0$ and $\\sqrt{x^2}=|x|=-x$: the oblique asymptote is $y=-x$.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\sqrt{4x^2+1}$ funtzioaren zeiharraren malda, $x\\to-\\infty$ doanean?', '¿Cuál es la pendiente de la oblicua de $f(x)=\\sqrt{4x^2+1}$ cuando $x\\to-\\infty$?', 'ما ميل المقارب المائل للدالة $f(x)=\\sqrt{4x^2+1}$ عندما $x\\to-\\infty$؟', 'What is the slope of the oblique asymptote of $f(x)=\\sqrt{4x^2+1}$ as $x\\to-\\infty$?'),
            options: [same('$2$'), same('$-2$'), same('$4$')],
            correctIndex: 1,
            explanation: say('Infinituan $\\sqrt{4x^2+1}$ adierazpena $2|x|$ bezalakoa da, eta ezkerrean $|x|=-x$: malda $-2$ da.', 'En el infinito $\\sqrt{4x^2+1}$ se parece a $2|x|$, y por la izquierda $|x|=-x$: pendiente $-2$.', 'في اللانهاية تشبه $\\sqrt{4x^2+1}$ العبارة $2|x|$، ومن اليسار $|x|=-x$: الميل $-2$.', 'At infinity $\\sqrt{4x^2+1}$ looks like $2|x|$, and on the left $|x|=-x$: slope $-2$.')
        }
    },
    'trig-functions': {
        mistake: {
            wrong: say('$\\sin x+\\cos x$ funtzioaren maximoa 2 da.', 'El máximo de $\\sin x+\\cos x$ es 2.', 'القيمة العظمى للدالة $\\sin x+\\cos x$ هي 2.', 'The maximum of $\\sin x+\\cos x$ is 2.'),
            right: say('Biek ez dute 1 balio aldi berean: maximoa $\\sqrt{2}$ da, $x=\\frac{\\pi}{4}$ puntuan.', 'Las dos no valen 1 a la vez: el máximo es $\\sqrt{2}$, en $x=\\frac{\\pi}{4}$.', 'لا تساويان 1 في الوقت نفسه: القيمة العظمى $\\sqrt{2}$ عند $x=\\frac{\\pi}{4}$.', 'They are not both 1 at once: the maximum is $\\sqrt{2}$, at $x=\\frac{\\pi}{4}$.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\sin x-\\cos x$ funtzioaren maximoa $[0,\\,\\pi]$ tartean?', '¿Cuál es el máximo de $f(x)=\\sin x-\\cos x$ en $[0,\\,\\pi]$?', 'ما القيمة العظمى للدالة $f(x)=\\sin x-\\cos x$ على $[0,\\,\\pi]$؟', 'What is the maximum of $f(x)=\\sin x-\\cos x$ on $[0,\\,\\pi]$?'),
            options: [same('$2$'), same('$1$'), same('$\\sqrt{2}$')],
            correctIndex: 2,
            explanation: say('$f\'(x)=\\cos x+\\sin x=0$ da $x=\\frac{3\\pi}{4}$ puntuan, eta $f\\left(\\frac{3\\pi}{4}\\right)=\\sqrt{2}$.', '$f\'(x)=\\cos x+\\sin x=0$ en $x=\\frac{3\\pi}{4}$, y $f\\left(\\frac{3\\pi}{4}\\right)=\\sqrt{2}$.', '$f\'(x)=\\cos x+\\sin x=0$ عند $x=\\frac{3\\pi}{4}$، و$f\\left(\\frac{3\\pi}{4}\\right)=\\sqrt{2}$.', '$f\'(x)=\\cos x+\\sin x=0$ at $x=\\frac{3\\pi}{4}$, and $f\\left(\\frac{3\\pi}{4}\\right)=\\sqrt{2}$.')
        }
    },
    'piecewise-graphs': {
        mistake: {
            wrong: say('Zati bakoitza zuzen osoan marrazten da.', 'Cada trozo se dibuja en toda la recta.', 'يُرسم كل جزء على المستقيم كله.', 'Each piece is drawn on the whole line.'),
            right: say('Bere tartean bakarrik: $x^2+2x$ marrazten da $x<0$ denean, eta $\\ln(x+1)$ $x\\ge 0$ denean.', 'Solo en su intervalo: $x^2+2x$ se dibuja si $x<0$ y $\\ln(x+1)$ si $x\\ge 0$.', 'على فترته فقط: تُرسم $x^2+2x$ إذا كان $x<0$، و$\\ln(x+1)$ إذا كان $x\\ge 0$.', 'Only on its interval: $x^2+2x$ is drawn if $x<0$ and $\\ln(x+1)$ if $x\\ge 0$.')
        },
        check: {
            prompt: say('Zer dago $x=0$ puntuan, $f(x)=\\begin{cases}e^x & x<0\\\\ x+2 & x\\ge 0\\end{cases}$ funtzioan?', '¿Qué hay en $x=0$ en $f(x)=\\begin{cases}e^x & x<0\\\\ x+2 & x\\ge 0\\end{cases}$?', 'ماذا يوجد عند $x=0$ في $f(x)=\\begin{cases}e^x & x<0\\\\ x+2 & x\\ge 0\\end{cases}$؟', 'What is there at $x=0$ in $f(x)=\\begin{cases}e^x & x<0\\\\ x+2 & x\\ge 0\\end{cases}$?'),
            options: [say('Jauzi bat', 'Un salto', 'قفزة', 'A jump'), say('Punta bat', 'Un pico', 'زاوية', 'A corner'), say('Lotune leun bat', 'Una unión suave', 'التقاء أملس', 'A smooth join')],
            correctIndex: 0,
            explanation: say('Ezkerretik $e^0=1$ da, eta eskuinetik $0+2=2$: altuerak ez datoz bat, jauzi bat dago.', 'Por la izquierda $e^0=1$ y por la derecha $0+2=2$: las alturas no coinciden, hay un salto.', 'من اليسار $e^0=1$ ومن اليمين $0+2=2$: لا يتطابق الارتفاعان، توجد قفزة.', 'From the left $e^0=1$ and from the right $0+2=2$: the heights do not match, there is a jump.')
        }
    },

    /* ---------- 5. Absolute values and graphs the other way round ---------- */
    'absolute-graphs': {
        mistake: {
            wrong: say('$|f(x)|$ eta $f(|x|)$ grafiko bera dira.', '$|f(x)|$ y $f(|x|)$ son la misma gráfica.', '$|f(x)|$ و$f(|x|)$ الرسم نفسه.', '$|f(x)|$ and $f(|x|)$ are the same graph.'),
            right: say('Ez: $|f(x)|$ ez da inoiz negatiboa; $f(|x|)$ izan daiteke, baina bikoitia da. $f(x)=x-2$ izanik, $|x-2|\\ge 0$ da, baina $|x|-2$ adierazpenak $-2$ balio du 0 puntuan.', 'No: $|f(x)|$ nunca es negativa; $f(|x|)$ puede serlo, pero es par. Con $f(x)=x-2$: $|x-2|\\ge 0$, pero $|x|-2$ vale $-2$ en 0.', 'لا: لا تكون $|f(x)|$ سالبة أبدًا، وقد تكون $f(|x|)$ سالبة لكنها زوجية. مع $f(x)=x-2$: $|x-2|\\ge 0$، لكن $|x|-2$ تساوي $-2$ عند 0.', 'No: $|f(x)|$ is never negative; $f(|x|)$ can be, but it is even. With $f(x)=x-2$: $|x-2|\\ge 0$, but $|x|-2$ is $-2$ at 0.')
        },
        check: {
            prompt: say('Funtzio hauetako zein da bikoitia?', '¿Cuál de estas funciones es par?', 'أيّ هذه الدوال زوجية؟', 'Which of these functions is even?'),
            options: [same('$|x^3-1|$'), same('$|x|^3-1$'), same('$x^3-|x|$')],
            correctIndex: 1,
            explanation: say('$|x|^3-1$ funtzioan $x$ balio absolutuaren barruan dago: ezkerra eskuinaren kopia da. $|x^3-1|$ ez da negatiboa, baina ez da bikoitia.', 'En $|x|^3-1$ la $x$ está dentro del valor absoluto: la izquierda es copia de la derecha. $|x^3-1|$ no es negativa, pero no es par.', 'في $|x|^3-1$ يقع $x$ داخل القيمة المطلقة: اليسار نسخة من اليمين. أما $|x^3-1|$ فليست سالبة لكنها ليست زوجية.', 'In $|x|^3-1$ the $x$ is inside the absolute value: the left is a copy of the right. $|x^3-1|$ is not negative, but it is not even.')
        }
    },
    'derivative-graph': {
        mistake: {
            wrong: say('$f\'$ grafikoak maximo bat duen tokian, $f$ funtzioak maximo bat du.', 'Donde la gráfica de $f\'$ tiene un máximo, $f$ tiene un máximo.', 'حيث يكون لرسم $f\'$ قيمة عظمى تكون لـ $f$ قيمة عظمى.', 'Where the graph of $f\'$ has a maximum, $f$ has a maximum.'),
            right: say('Han $f$ funtzioak inflexio bat du. $f$ funtzioaren muturrak $f\'$ grafikoak ardatza zeinua aldatuz ebakitzen duen tokian daude.', 'Ahí $f$ tiene una inflexión. Los extremos de $f$ están donde $f\'$ corta el eje cambiando de signo.', 'هناك يكون لـ $f$ انعطاف. وتقع القيم القصوى لـ $f$ حيث يقطع رسم $f\'$ المحور مغيّرًا إشارته.', 'There $f$ has an inflection. The extrema of $f$ are where $f\'$ crosses the axis changing sign.')
        },
        check: {
            prompt: say('$f\'$ grafikoak ardatza ebakitzen du $x=3$ puntuan, negatibotik positibora pasatuz. Zer du $f$ funtzioak $x=3$ puntuan?', 'La gráfica de $f\'$ corta el eje en $x=3$ pasando de negativa a positiva. ¿Qué tiene $f$ en $x=3$?', 'يقطع رسم $f\'$ المحور عند $x=3$ منتقلًا من السالب إلى الموجب. ماذا لـ $f$ عند $x=3$؟', 'The graph of $f\'$ crosses the axis at $x=3$ going from negative to positive. What does $f$ have at $x=3$?'),
            options: [say('Maximo bat', 'Un máximo', 'قيمة عظمى', 'A maximum'), say('Inflexio bat', 'Una inflexión', 'انعطاف', 'An inflection'), say('Minimo bat', 'Un mínimo', 'قيمة صغرى', 'A minimum')],
            correctIndex: 2,
            explanation: say('$f$ funtzioa beherakorra da 3 baino lehen eta gorakorra gero: minimo bat.', '$f$ decrece antes de 3 y crece después: un mínimo.', 'تتناقص $f$ قبل 3 وتتزايد بعده: قيمة صغرى.', '$f$ decreases before 3 and increases after it: a minimum.')
        }
    },
    'curve-from-data': {
        mistake: {
            wrong: say('Datuek kurba bakar bat zehazten dute.', 'Los datos determinan una única curva.', 'تحدد المعطيات منحنى وحيدًا.', 'The data fix a single curve.'),
            right: say('Ez: kurba askok betetzen dituzte datu berak. Eskatzen dena da guztiak betetzen dituen bat: asintotak, puntuak eta geziak.', 'No: muchas curvas cumplen los mismos datos. Lo que se pide es una que los cumpla todos: asíntotas, puntos y flechas.', 'لا: كثير من المنحنيات تحقق المعطيات نفسها. والمطلوب منحنى يحققها كلها: المقاربات والنقاط والأسهم.', 'No: many curves meet the same data. What is asked for is one that meets them all: asymptotes, points and arrows.')
        },
        check: {
            prompt: say('Zer asintota ematen du $\\lim_{x\\to-3}f(x)=+\\infty$ datuak $f$ funtzioaren grafikoan?', '¿Qué asíntota da el dato $\\lim_{x\\to-3}f(x)=+\\infty$ en la gráfica de $f$?', 'أي مقارب يعطيه المعطى $\\lim_{x\\to-3}f(x)=+\\infty$ في رسم $f$؟', 'Which asymptote does the fact $\\lim_{x\\to-3}f(x)=+\\infty$ give in the graph of $f$?'),
            options: [same('$x=-3$'), same('$y=-3$'), same('$y=3$')],
            correctIndex: 0,
            explanation: say('$x\\to-3$ doanean funtzioak infinitura jotzen du: asintota bertikala, $x=-3$.', 'Cuando $x\\to-3$ la función se va a infinito: asíntota vertical $x=-3$.', 'عندما $x\\to-3$ تذهب الدالة إلى اللانهاية: مقارب رأسي $x=-3$.', 'As $x\\to-3$ the function goes to infinity: a vertical asymptote $x=-3$.')
        }
    }
}

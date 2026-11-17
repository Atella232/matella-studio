import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from './text.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 1 · Gizarte Zientziak — the
   typical mistake and the «Check it» question of every lesson. Plain data
   (no JSX) so the tests can import it. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake: growing always read as going
   to infinity, ∞/∞ = 1, (−x)² negative, 0/0 read as «no limit», f(a)
   taken as the limit, a curve that «never» cuts its asymptote.
   ========================================================================== */

export type SocLimitsTopicId =
    | 'long-run' | 'poly-exp' | 'degrees'
    | 'minus-infinity' | 'roots-infinity' | 'long-models'
    | 'one-sided' | 'infinite' | 'zero-zero'
    | 'continuous' | 'discontinuities' | 'parameter'
    | 'vertical-horizontal' | 'oblique' | 'branches'

export const socLimitsLessonChecks: Record<SocLimitsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Limits at infinity ---------- */
    'long-run': {
        mistake: {
            wrong: say('$f(x)=\\frac{5x}{x+1}$ beti hazten da; beraz, $+\\infty$ aldera doa.', '$f(x)=\\frac{5x}{x+1}$ crece siempre; por tanto, tiende a $+\\infty$.', '$f(x)=\\frac{5x}{x+1}$ تتزايد دائمًا؛ إذن تتجه إلى $+\\infty$.', '$f(x)=\\frac{5x}{x+1}$ always grows, so it tends to $+\\infty$.'),
            right: say('Beti haztea ez da infinitura iristea: gero eta motelago hazten da, eta 5 baliora hurbiltzen da.', 'Crecer siempre no es llegar a infinito: crece cada vez más despacio y se acerca a 5.', 'التزايد الدائم لا يعني بلوغ اللانهاية: تتزايد ببطء متزايد وتقترب من 5.', 'Always growing is not reaching infinity: it grows more and more slowly and approaches 5.')
        },
        check: {
            prompt: say('$f(10)=2{,}9$, $f(100)=2{,}99$ eta $f(1000)=2{,}999$ dira. Zenbat da, ziurrenik, $\\lim_{x\\to+\\infty}f(x)$?', 'Se sabe que $f(10)=2{,}9$, $f(100)=2{,}99$ y $f(1000)=2{,}999$. ¿Cuánto vale, seguramente, $\\lim_{x\\to+\\infty}f(x)$?', 'نعلم أن $f(10)=2{,}9$ و$f(100)=2{,}99$ و$f(1000)=2{,}999$. كم تساوي على الأرجح $\\lim_{x\\to+\\infty}f(x)$؟', 'We know that $f(10)=2{,}9$, $f(100)=2{,}99$ and $f(1000)=2{,}999$. What is $\\lim_{x\\to+\\infty}f(x)$, most likely?'),
            options: [same('$+\\infty$'), same('$3$'), same('$2{,}999$')],
            correctIndex: 1,
            explanation: say('Balioak gero eta hurbilago daude 3 zenbakitik, hura gainditu gabe.', 'Los valores se acercan cada vez más a 3, sin pasarlo.', 'تقترب القيم أكثر فأكثر من 3 دون أن تتجاوزه.', 'The values get closer and closer to 3, without passing it.')
        }
    },
    'poly-exp': {
        mistake: {
            wrong: say('$-100x$ handiagoa denez, $\\lim_{x\\to+\\infty}(x^2-100x)=-\\infty$.', 'Como $-100x$ es más grande, $\\lim_{x\\to+\\infty}(x^2-100x)=-\\infty$.', 'بما أن $-100x$ أكبر فإن $\\lim_{x\\to+\\infty}(x^2-100x)=-\\infty$.', 'Since $-100x$ is bigger, $\\lim_{x\\to+\\infty}(x^2-100x)=-\\infty$.'),
            right: say('Maila handieneko gaiak agintzen du, $x^2$ gaiak: limitea $+\\infty$ da. $x=1000$ denean, $900\\,000$ ateratzen da.', 'Manda el término de mayor grado, $x^2$: el límite es $+\\infty$. Con $x=1000$ ya sale $900\\,000$.', 'الحد ذو الدرجة الأكبر $x^2$ هو الذي يحكم: النهاية $+\\infty$. ومع $x=1000$ نجد $900\\,000$.', 'The highest-degree term, $x^2$, rules: the limit is $+\\infty$. With $x=1000$ you already get $900\\,000$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to+\\infty}5\\cdot 0{,}8^x$?', '¿Cuánto vale $\\lim_{x\\to+\\infty}5\\cdot 0{,}8^x$?', 'كم تساوي $\\lim_{x\\to+\\infty}5\\cdot 0{,}8^x$؟', 'What is $\\lim_{x\\to+\\infty}5\\cdot 0{,}8^x$?'),
            options: [same('$5$'), same('$0$'), same('$+\\infty$')],
            correctIndex: 1,
            explanation: say('$0<0{,}8<1$: $0{,}8^x\\to 0$, eta $5\\cdot 0=0$.', '$0<0{,}8<1$: $0{,}8^x\\to 0$, y $5\\cdot 0=0$.', '$0<0{,}8<1$: ‏$0{,}8^x\\to 0$، و$5\\cdot 0=0$.', '$0<0{,}8<1$: $0{,}8^x\\to 0$, and $5\\cdot 0=0$.')
        }
    },
    degrees: {
        mistake: {
            wrong: same('$\\lim_{x\\to+\\infty}\\frac{3x^2+x}{x^2-4}=\\frac{\\infty}{\\infty}=1$'),
            right: say('Indeterminazio batek ez du 1 balio: maila bera dutenez, limitea $\\frac{3}{1}=3$ da.', 'Una indeterminación no vale 1: con el mismo grado, el límite es $\\frac{3}{1}=3$.', 'حالة عدم التعيين لا تساوي 1: مع الدرجة نفسها تكون النهاية $\\frac{3}{1}=3$.', 'An indeterminate form is not 1: with the same degree, the limit is $\\frac{3}{1}=3$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to+\\infty}\\frac{4x^2-1}{2x^2+x}$?', '¿Cuánto vale $\\lim_{x\\to+\\infty}\\frac{4x^2-1}{2x^2+x}$?', 'كم تساوي $\\lim_{x\\to+\\infty}\\frac{4x^2-1}{2x^2+x}$؟', 'What is $\\lim_{x\\to+\\infty}\\frac{4x^2-1}{2x^2+x}$?'),
            options: [same('$1$'), same('$2$'), same('$0$')],
            correctIndex: 1,
            explanation: say('Maila bera: koefiziente nagusien zatidura, $\\frac{4}{2}=2$.', 'Mismo grado: el cociente de los coeficientes principales, $\\frac{4}{2}=2$.', 'الدرجة نفسها: خارج قسمة المعاملين الرئيسيين، $\\frac{4}{2}=2$.', 'Same degree: the quotient of the leading coefficients, $\\frac{4}{2}=2$.')
        }
    },

    /* ---------- 2. More cases at infinity ---------- */
    'minus-infinity': {
        mistake: {
            wrong: same('$\\lim_{x\\to-\\infty}x^2=-\\infty$'),
            right: say('Zenbaki negatibo baten karratua positiboa da: $(-100)^2=10\\,000$. Limitea $+\\infty$ da.', 'Un número negativo al cuadrado es positivo: $(-100)^2=10\\,000$. El límite es $+\\infty$.', 'مربع العدد السالب موجب: $(-100)^2=10\\,000$. النهاية $+\\infty$.', 'A negative number squared is positive: $(-100)^2=10\\,000$. The limit is $+\\infty$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to-\\infty}(1+3^x)$?', '¿Cuánto vale $\\lim_{x\\to-\\infty}(1+3^x)$?', 'كم تساوي $\\lim_{x\\to-\\infty}(1+3^x)$؟', 'What is $\\lim_{x\\to-\\infty}(1+3^x)$?'),
            options: [same('$1$'), same('$+\\infty$'), same('$0$')],
            correctIndex: 0,
            explanation: say('$x\\to-\\infty$ denean, $3^x\\to 0$: $1+0=1$ geratzen da.', 'Si $x\\to-\\infty$, $3^x\\to 0$: queda $1+0=1$.', 'إذا $x\\to-\\infty$ فإن $3^x\\to 0$: يبقى $1+0=1$.', 'If $x\\to-\\infty$, $3^x\\to 0$: you are left with $1+0=1$.')
        }
    },
    'roots-infinity': {
        mistake: {
            wrong: say('$\\sqrt{16x^2+1}$ adierazpenak $16x$ bezala jokatzen du.', '$\\sqrt{16x^2+1}$ se porta como $16x$.', '$\\sqrt{16x^2+1}$ تسلك سلوك $16x$.', '$\\sqrt{16x^2+1}$ behaves like $16x$.'),
            right: say('Erroak zenbakiari ere eragiten dio: $\\sqrt{16x^2}=4x$.', 'La raíz también afecta al número: $\\sqrt{16x^2}=4x$.', 'الجذر يؤثر في العدد أيضًا: $\\sqrt{16x^2}=4x$.', 'The root also acts on the number: $\\sqrt{16x^2}=4x$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to+\\infty}\\frac{\\sqrt{25x^2-x}}{x}$?', '¿Cuánto vale $\\lim_{x\\to+\\infty}\\frac{\\sqrt{25x^2-x}}{x}$?', 'كم تساوي $\\lim_{x\\to+\\infty}\\frac{\\sqrt{25x^2-x}}{x}$؟', 'What is $\\lim_{x\\to+\\infty}\\frac{\\sqrt{25x^2-x}}{x}$?'),
            options: [same('$25$'), same('$+\\infty$'), same('$5$')],
            correctIndex: 2,
            explanation: same('$\\sqrt{25x^2}=5x\\qquad\\frac{5x}{x}=5$')
        }
    },
    'long-models': {
        mistake: {
            wrong: say('$C(x)=2000+5x$ bada, epe luzera batez besteko kostua 2000 € da.', 'Con $C(x)=2000+5x$, el coste medio a la larga es 2000 €.', 'مع $C(x)=2000+5x$ تكون التكلفة المتوسطة على المدى البعيد 2000 €.', 'With $C(x)=2000+5x$, the average cost in the long run is €2,000.'),
            right: say('2000 euroak unitate guztien artean banatzen dira: $\\frac{2000}{x}\\to 0$, eta batez besteko kostua 5 € aldera doa.', 'Los 2000 € se reparten entre todas las unidades: $\\frac{2000}{x}\\to 0$ y el coste medio tiende a 5 €.', 'تتوزع 2000 € على كل الوحدات: $\\frac{2000}{x}\\to 0$ وتتجه التكلفة المتوسطة إلى 5 €.', 'The €2,000 is shared among all the units: $\\frac{2000}{x}\\to 0$ and the average cost tends to €5.')
        },
        check: {
            prompt: say('$x$ bizikleta egiteak $C(x)=30\\,000+120x$ euro balio du. Zein baliotara doa bizikleta bakoitzaren batez besteko kostua?', 'Fabricar $x$ bicicletas cuesta $C(x)=30\\,000+120x$ euros. ¿Hacia qué valor va el coste medio por bicicleta?', 'صنع $x$ دراجة يكلّف $C(x)=30\\,000+120x$ يورو. إلى أي قيمة تتجه التكلفة المتوسطة للدراجة؟', 'Making $x$ bicycles costs $C(x)=30\\,000+120x$ euros. What value does the average cost per bicycle tend to?'),
            options: [same('$30\\,000$'), same('$0$'), same('$120$')],
            correctIndex: 2,
            explanation: say('$\\frac{30\\,000}{x}\\to 0$: bizikleta bakoitzaren kostua geratzen da, 120 €.', '$\\frac{30\\,000}{x}\\to 0$: queda el coste de cada bicicleta, 120 €.', '$\\frac{30\\,000}{x}\\to 0$: تبقى تكلفة كل دراجة، 120 €.', '$\\frac{30\\,000}{x}\\to 0$: the cost of each bicycle is left, €120.')
        }
    },

    /* ---------- 3. Limits at a point ---------- */
    'one-sided': {
        mistake: {
            wrong: say('$f(2)=5$ denez, 2 puntuko limitea 5 da.', 'Como $f(2)=5$, el límite en 2 es 5.', 'بما أن $f(2)=5$ فالنهاية عند 2 هي 5.', 'Since $f(2)=5$, the limit at 2 is 5.'),
            right: say('Limiteak bi aldeak begiratzen ditu: ezkerretik funtzioa 3 baliora doa, eta beraz ez dago limiterik.', 'El límite mira los dos lados: por la izquierda la función va a 3, así que no hay límite.', 'تنظر النهاية إلى الجانبين: من اليسار تتجه الدالة إلى 3، إذن لا توجد نهاية.', 'The limit looks at both sides: from the left the function goes to 3, so there is no limit.')
        },
        check: {
            prompt: say('$g(x)=\\begin{cases}4-x & x<1\\\\ 2x+1 & x\\ge 1\\end{cases}$ izanik, badago $\\lim_{x\\to 1}g(x)$?', 'Sea $g(x)=\\begin{cases}4-x & x<1\\\\ 2x+1 & x\\ge 1\\end{cases}$. ¿Existe $\\lim_{x\\to 1}g(x)$?', 'لتكن $g(x)=\\begin{cases}4-x & x<1\\\\ 2x+1 & x\\ge 1\\end{cases}$. هل توجد $\\lim_{x\\to 1}g(x)$؟', 'Let $g(x)=\\begin{cases}4-x & x<1\\\\ 2x+1 & x\\ge 1\\end{cases}$. Does $\\lim_{x\\to 1}g(x)$ exist?'),
            options: [say('Ez: bi zati daude', 'No: hay dos trozos', 'لا: يوجد جزآن', 'No: there are two pieces'), say('Bai, 3 da', 'Sí, vale 3', 'نعم، تساوي 3', 'Yes, it is 3'), say('Bai, 2 da', 'Sí, vale 2', 'نعم، تساوي 2', 'Yes, it is 2')],
            correctIndex: 1,
            explanation: say('$4-1=3$ eta $2\\cdot 1+1=3$: alboko limiteak bat datoz.', '$4-1=3$ y $2\\cdot 1+1=3$: los laterales coinciden.', '$4-1=3$ و$2\\cdot 1+1=3$: النهايتان الجانبيتان متساويتان.', '$4-1=3$ and $2\\cdot 1+1=3$: the one-sided limits match.')
        }
    },
    infinite: {
        mistake: {
            wrong: same('$\\frac{6}{0}=0$'),
            right: say('Gero eta txikiagoa den zerbaitez zatitzean, gero eta handiagoa ateratzen da: $\\frac{6}{0{,}001}=6000$. Limitea $\\pm\\infty$ da.', 'Dividir entre algo cada vez más pequeño da algo cada vez más grande: $\\frac{6}{0{,}001}=6000$. El límite es $\\pm\\infty$.', 'القسمة على شيء يصغر أكثر فأكثر تعطي شيئًا يكبر أكثر فأكثر: $\\frac{6}{0{,}001}=6000$. النهاية $\\pm\\infty$.', 'Dividing by something smaller and smaller gives something bigger and bigger: $\\frac{6}{0{,}001}=6000$. The limit is $\\pm\\infty$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to 5^+}\\frac{-3}{x-5}$?', '¿Cuánto vale $\\lim_{x\\to 5^+}\\frac{-3}{x-5}$?', 'كم تساوي $\\lim_{x\\to 5^+}\\frac{-3}{x-5}$؟', 'What is $\\lim_{x\\to 5^+}\\frac{-3}{x-5}$?'),
            options: [same('$+\\infty$'), same('$0$'), same('$-\\infty$')],
            correctIndex: 2,
            explanation: say('$x>5$ denean, $x-5$ positiboa eta txikia da, eta zenbakitzailea negatiboa: $-\\infty$.', 'Si $x>5$, $x-5$ es positivo y pequeño, y el numerador es negativo: $-\\infty$.', 'إذا $x>5$ فإن $x-5$ موجب وصغير والبسط سالب: $-\\infty$.', 'If $x>5$, $x-5$ is positive and small, and the numerator is negative: $-\\infty$.')
        }
    },
    'zero-zero': {
        mistake: {
            wrong: say('$\\frac{0}{0}$: limitea ez dago.', '$\\frac{0}{0}$: el límite no existe.', '$\\frac{0}{0}$: النهاية غير موجودة.', '$\\frac{0}{0}$: the limit does not exist.'),
            right: say('$\\frac{0}{0}$ indeterminazio bat da: sinplifikatu faktore komuna, eta ordezkatu berriro.', '$\\frac{0}{0}$ es una indeterminación: simplifica el factor común y sustituye de nuevo.', '$\\frac{0}{0}$ حالة عدم تعيين: اختصر العامل المشترك ثم عوّض من جديد.', '$\\frac{0}{0}$ is an indeterminate form: cancel the common factor and substitute again.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to 4}\\frac{x^2-16}{x-4}$?', '¿Cuánto vale $\\lim_{x\\to 4}\\frac{x^2-16}{x-4}$?', 'كم تساوي $\\lim_{x\\to 4}\\frac{x^2-16}{x-4}$؟', 'What is $\\lim_{x\\to 4}\\frac{x^2-16}{x-4}$?'),
            options: [say('Ez dago', 'No existe', 'غير موجودة', 'It does not exist'), same('$8$'), same('$0$')],
            correctIndex: 1,
            explanation: same('$\\frac{(x-4)(x+4)}{x-4}=x+4\\ \\to\\ 8$')
        }
    },

    /* ---------- 4. Continuity ---------- */
    continuous: {
        mistake: {
            wrong: say('$f(a)$ badago, funtzioa jarraitua da $a$ puntuan.', 'Si existe $f(a)$, la función es continua en $a$.', 'إذا وُجدت $f(a)$ فالدالة متصلة عند $a$.', 'If $f(a)$ exists, the function is continuous at $a$.'),
            right: say('Gainera, limiteak egon behar du eta $f(a)$ balio: puntu solte bat ez da nahikoa.', 'Además, el límite tiene que existir y valer $f(a)$: un punto suelto no basta.', 'ويجب أيضًا أن توجد النهاية وتساوي $f(a)$: النقطة المنفردة لا تكفي.', 'The limit must also exist and equal $f(a)$: a single point is not enough.')
        },
        check: {
            prompt: say('$h(x)=\\begin{cases}x+4 & x<2\\\\ x^2 & x\\ge 2\\end{cases}$ izanik, jarraitua da 2 puntuan?', 'Sea $h(x)=\\begin{cases}x+4 & x<2\\\\ x^2 & x\\ge 2\\end{cases}$. ¿Es continua en 2?', 'لتكن $h(x)=\\begin{cases}x+4 & x<2\\\\ x^2 & x\\ge 2\\end{cases}$. هل هي متصلة عند 2؟', 'Let $h(x)=\\begin{cases}x+4 & x<2\\\\ x^2 & x\\ge 2\\end{cases}$. Is it continuous at 2?'),
            options: [say('Bai, $h(2)=4$ badagoelako', 'Sí, porque existe $h(2)=4$', 'نعم، لأن $h(2)=4$ موجودة', 'Yes, because $h(2)=4$ exists'), say('Ez: ezkerretik 6 baliora doa, eta $h(2)=4$', 'No: por la izquierda va a 6 y $h(2)=4$', 'لا: من اليسار تتجه إلى 6 و$h(2)=4$', 'No: from the left it goes to 6 and $h(2)=4$'), say('Bai, bi zatiak polinomioak direlako', 'Sí, porque los dos trozos son polinomios', 'نعم، لأن الجزأين حدوديتان', 'Yes, because both pieces are polynomials')],
            correctIndex: 1,
            explanation: say('$2+4=6$ eta $2^2=4$: ez datoz bat.', '$2+4=6$ y $2^2=4$: no coinciden.', '$2+4=6$ و$2^2=4$: لا تتساويان.', '$2+4=6$ and $2^2=4$: they do not match.')
        }
    },
    discontinuities: {
        mistake: {
            wrong: say('$f(a)$ ez badago, asintota bertikal bat dago.', 'Si $f(a)$ no existe, hay una asíntota vertical.', 'إذا لم توجد $f(a)$ فهناك مقارب رأسي.', 'If $f(a)$ does not exist, there is a vertical asymptote.'),
            right: say('Zulo bat besterik ez izan daiteke: $\\frac{x^2-1}{x-1}$ ez dago 1 puntuan, baina haren limitea 2 da.', 'Puede ser solo un agujero: $\\frac{x^2-1}{x-1}$ no existe en 1, pero su límite es 2.', 'قد يكون مجرد ثقب: $\\frac{x^2-1}{x-1}$ غير موجودة عند 1، لكن نهايتها 2.', 'It can be just a hole: $\\frac{x^2-1}{x-1}$ does not exist at 1, but its limit is 2.')
        },
        check: {
            prompt: say('$f(x)=\\begin{cases}2x & x<3\\\\ 7 & x\\ge 3\\end{cases}$. Zer etenune du $x=3$ puntuan?', 'Sea $f(x)=\\begin{cases}2x & x<3\\\\ 7 & x\\ge 3\\end{cases}$. ¿Qué discontinuidad tiene en $x=3$?', 'لتكن $f(x)=\\begin{cases}2x & x<3\\\\ 7 & x\\ge 3\\end{cases}$. ما نوع انقطاعها عند $x=3$؟', 'Let $f(x)=\\begin{cases}2x & x<3\\\\ 7 & x\\ge 3\\end{cases}$. What discontinuity does it have at $x=3$?'),
            options: [say('Gaindigarria', 'Evitable', 'قابل للإزالة', 'Removable'), say('Jauzi infinitua', 'Salto infinito', 'قفزة لانهائية', 'Infinite jump'), say('Jauzi finitua', 'Salto finito', 'قفزة منتهية', 'Finite jump')],
            correctIndex: 2,
            explanation: say('Ezkerretik 6 baliora doa, eta eskuinean 7 balio du: 1 unitateko jauzia.', 'Por la izquierda va a 6 y por la derecha vale 7: un salto de 1.', 'من اليسار تتجه إلى 6 ومن اليمين تساوي 7: قفزة قدرها 1.', 'From the left it goes to 6 and on the right it is 7: a jump of 1.')
        }
    },
    parameter: {
        mistake: {
            wrong: say('Nahikoa da zati bakoitza jarraitua izatea.', 'Basta con que cada trozo sea continuo.', 'يكفي أن يكون كل جزء متصلًا.', 'It is enough for each piece to be continuous.'),
            right: say('Zatiak jarraituak izan ohi dira; huts egiten duena lotura-puntua da: han bi zatiek balio bera eman behar dute.', 'Cada trozo suele ser continuo; lo que falla es el punto de unión: allí los dos trozos tienen que dar el mismo valor.', 'كل جزء متصل عادة؛ والمشكلة في نقطة الوصل: هناك يجب أن يعطي الجزآن القيمة نفسها.', 'Each piece is usually continuous; what fails is the joining point: there both pieces must give the same value.')
        },
        check: {
            prompt: say('Aurkitu $k$, $f(x)=\\begin{cases}3x & x<2\\\\ x+k & x\\ge 2\\end{cases}$ jarraitua izan dadin.', 'Halla $k$ para que $f(x)=\\begin{cases}3x & x<2\\\\ x+k & x\\ge 2\\end{cases}$ sea continua.', 'أوجد $k$ لتكون $f(x)=\\begin{cases}3x & x<2\\\\ x+k & x\\ge 2\\end{cases}$ متصلة.', 'Find $k$ so that $f(x)=\\begin{cases}3x & x<2\\\\ x+k & x\\ge 2\\end{cases}$ is continuous.'),
            options: [same('$6$'), same('$4$'), same('$-4$')],
            correctIndex: 1,
            explanation: same('$3\\cdot 2=6\\qquad 2+k=6\\ \\to\\ k=4$')
        }
    },

    /* ---------- 5. Asymptotes and branches ---------- */
    'vertical-horizontal': {
        mistake: {
            wrong: say('Kurba batek ez du inoiz bere asintota horizontala ebakitzen.', 'Una curva nunca corta a su asíntota horizontal.', 'المنحنى لا يقطع أبدًا مقاربه الأفقي.', 'A curve never cuts its horizontal asymptote.'),
            right: say('Erdiko zatian ebaki dezake: asintotak epe luzera gertatzen dena bakarrik esaten du. Adibidez, $\\frac{x}{x^2+1}$ funtzioak 0 balio du $x=0$ denean, eta haren asintota $y=0$ da.', 'Puede cortarla en la parte central: la asíntota solo habla de lo que pasa a la larga. Por ejemplo, $\\frac{x}{x^2+1}$ vale 0 en $x=0$ y su asíntota es $y=0$.', 'قد يقطعه في الجزء الأوسط: المقارب يخبر فقط بما يحدث على المدى البعيد. مثلًا $\\frac{x}{x^2+1}$ تساوي 0 عند $x=0$ ومقاربها $y=0$.', 'It can cut it in the middle part: the asymptote only tells what happens in the long run. For example, $\\frac{x}{x^2+1}$ is 0 at $x=0$ and its asymptote is $y=0$.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\frac{8x+1}{2x-6}$ funtzioaren asintota horizontala, $x\\to+\\infty$ denean?', '¿Cuál es la asíntota horizontal de $f(x)=\\frac{8x+1}{2x-6}$ cuando $x\\to+\\infty$?', 'ما المقارب الأفقي لـ $f(x)=\\frac{8x+1}{2x-6}$ عندما $x\\to+\\infty$؟', 'What is the horizontal asymptote of $f(x)=\\frac{8x+1}{2x-6}$ as $x\\to+\\infty$?'),
            options: [same('$y=4$'), same('$y=8$'), same('$x=3$')],
            correctIndex: 0,
            explanation: say('$\\frac{8}{2}=4$; $x=3$ bertikala da.', '$\\frac{8}{2}=4$; $x=3$ es la vertical.', '$\\frac{8}{2}=4$؛ و$x=3$ هو الرأسي.', '$\\frac{8}{2}=4$; $x=3$ is the vertical one.')
        }
    },
    oblique: {
        mistake: {
            wrong: say('Goian maila handiagoa duen funtzio orok asintota zeiharra du.', 'Toda función con más grado arriba tiene asíntota oblicua.', 'كل دالة درجة بسطها أكبر لها مقارب مائل.', 'Every function with a higher degree on top has an oblique asymptote.'),
            right: say('Goian maila bat gehiago dagoenean bakarrik; bi edo gehiago badira, adar parabolikoa dago.', 'Solo si arriba hay exactamente un grado más; con dos o más hay una rama parabólica.', 'فقط إذا زادت درجة البسط بواحد بالضبط؛ ومع اثنتين أو أكثر يوجد فرع مكافئ.', 'Only if the top has exactly one degree more; with two or more there is a parabolic branch.')
        },
        check: {
            prompt: say('$f(x)=\\frac{x^2+4x}{x+1}$ funtzioak asintota bertikala du $x=-1$ zuzenean. Zein da zeiharra?', '$f(x)=\\frac{x^2+4x}{x+1}$ tiene una asíntota vertical en $x=-1$. ¿Cuál es la oblicua?', 'للدالة $f(x)=\\frac{x^2+4x}{x+1}$ مقارب رأسي عند $x=-1$. فما المائل؟', '$f(x)=\\frac{x^2+4x}{x+1}$ has a vertical asymptote at $x=-1$. What is the oblique one?'),
            options: [same('$y=x+4$'), same('$y=x+3$'), same('$y=x$')],
            correctIndex: 1,
            explanation: same('$x^2+4x=(x+1)(x+3)-3$')
        }
    },
    branches: {
        mistake: {
            wrong: say('$\\frac{x^3}{x+2}$ funtzioak asintota zeiharra du.', '$\\frac{x^3}{x+2}$ tiene asíntota oblicua.', '$\\frac{x^3}{x+2}$ لها مقارب مائل.', '$\\frac{x^3}{x+2}$ has an oblique asymptote.'),
            right: say('Goian bi maila gehiago daude: zatidura 2 mailakoa da, eta adarra parabolikoa.', 'Arriba hay dos grados más: el cociente es de grado 2 y la rama es parabólica.', 'في البسط درجتان زائدتان: خارج القسمة من الدرجة 2 والفرع مكافئ.', 'The top has two degrees more: the quotient has degree 2 and the branch is parabolic.')
        },
        check: {
            prompt: say('Zer du $f(x)=\\frac{x^4}{x^2+1}$ funtzioak $x\\to+\\infty$ denean?', '¿Qué tiene $f(x)=\\frac{x^4}{x^2+1}$ cuando $x\\to+\\infty$?', 'ماذا لدى $f(x)=\\frac{x^4}{x^2+1}$ عندما $x\\to+\\infty$؟', 'What does $f(x)=\\frac{x^4}{x^2+1}$ have as $x\\to+\\infty$?'),
            options: [say('$y=1$ asintota horizontala', 'Asíntota horizontal $y=1$', 'مقارب أفقي $y=1$', 'Horizontal asymptote $y=1$'), say('Asintota zeiharra', 'Asíntota oblicua', 'مقارب مائل', 'Oblique asymptote'), say('Adar parabolikoa', 'Rama parabólica', 'فرع مكافئ', 'Parabolic branch')],
            correctIndex: 2,
            explanation: say('Goian bi maila gehiago: $x^2$ bezala jokatzen du.', 'Dos grados más arriba: se porta como $x^2$.', 'درجتان زائدتان في البسط: تسلك سلوك $x^2$.', 'Two degrees more on top: it behaves like $x^2$.')
        }
    }
}

import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Integralak · Batxilergoa 1 · Zientziak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests
   can import it; lessons.tsx merges it into the topics. The questions use
   new numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake: the constant k
   forgotten, xⁿ⁺¹ without dividing, k taken as the y of the point, eˣ
   treated as a power, the sign of ∫ sin x, 1/(1 + x²) read as u′/u, u′
   missing outside, adjusting with a letter, wide rectangles taken as
   better, F(a) − F(b), the integral of a product split, the limits not
   being the crossings, the parts below the axis cancelling and the bottom
   curve minus the top one. Every prompt carries two formulas, so that the
   shared test does not take a whole expression for a calculation.
   ========================================================================== */

export type BachIntegralsTopicId =
    | 'primitive' | 'power-rule' | 'through-point'
    | 'exp-log' | 'trig' | 'arcs'
    | 'chain-power' | 'chain-exp-log' | 'adjust'
    | 'rectangles' | 'barrow' | 'properties'
    | 'area-axis' | 'area-sign' | 'between-curves'

export const bachIntegralsLessonChecks: Record<BachIntegralsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Antiderivatives ---------- */
    primitive: {
        mistake: {
            wrong: say('$\\int 2x\\,dx=x^2$', '$\\int 2x\\,dx=x^2$', '$\\int 2x\\,dx=x^2$', '$\\int 2x\\,dx=x^2$'),
            right: say('$k$ konstantea falta da: $x^2+3$ funtzioaren deribatua ere $2x$ da. Hau da, $\\int 2x\\,dx=x^2+k$.', 'Falta la constante $k$: $x^2+3$ también tiene derivada $2x$. Es $\\int 2x\\,dx=x^2+k$.', 'ينقص الثابت $k$: مشتقة $x^2+3$ أيضًا $2x$. أي $\\int 2x\\,dx=x^2+k$.', 'The constant $k$ is missing: $x^2+3$ also has the derivative $2x$. It is $\\int 2x\\,dx=x^2+k$.')
        },
        check: {
            prompt: say('Zein da $f(x)=6x^2-1$ funtzioaren jatorrizko bat? Deribatu bakoitza: $f$ atera behar da.', '¿Cuál es una primitiva de $f(x)=6x^2-1$? Deriva cada una: tiene que salir $f$.', 'أيّ هذه دالة أصلية لـ $f(x)=6x^2-1$؟ اشتق كل واحدة: يجب أن تخرج $f$.', 'Which one is an antiderivative of $f(x)=6x^2-1$? Differentiate each one: you must get $f$.'),
            options: [same('$2x^3-x+4$'), same('$12x$'), same('$6x^3-x$')],
            correctIndex: 0,
            explanation: say('$(2x^3-x+4)\'=6x^2-1$. $12x$ funtzioa $f$ funtzioaren deribatua da, ez jatorrizkoa.', '$(2x^3-x+4)\'=6x^2-1$. $12x$ es la derivada de $f$, no su primitiva.', '$(2x^3-x+4)\'=6x^2-1$. و$12x$ مشتقة $f$ لا أصليتها.', '$(2x^3-x+4)\'=6x^2-1$. $12x$ is the derivative of $f$, not its antiderivative.')
        }
    },
    'power-rule': {
        mistake: {
            wrong: say('$\\int x^3\\,dx=x^4+k$', '$\\int x^3\\,dx=x^4+k$', '$\\int x^3\\,dx=x^4+k$', '$\\int x^3\\,dx=x^4+k$'),
            right: say('Berretzaile berriaz zatitu behar da: $x^4$ funtzioaren deribatua $4x^3$ da. Hau da, $\\int x^3\\,dx=\\frac{x^4}{4}+k$.', 'Hay que dividir entre el exponente nuevo: la derivada de $x^4$ es $4x^3$. Es $\\int x^3\\,dx=\\frac{x^4}{4}+k$.', 'يجب القسمة على الأس الجديد: مشتقة $x^4$ هي $4x^3$. أي $\\int x^3\\,dx=\\frac{x^4}{4}+k$.', 'You must divide by the new exponent: the derivative of $x^4$ is $4x^3$. It is $\\int x^3\\,dx=\\frac{x^4}{4}+k$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int(8x^3-2x)\\,dx$, eta deribatu emaitza $8x^3-2x$ ateratzen dela egiaztatzeko.', 'Calcula $\\int(8x^3-2x)\\,dx$ y deriva el resultado para comprobar que sale $8x^3-2x$.', 'احسب $\\int(8x^3-2x)\\,dx$ واشتق النتيجة لتتحقق من أنها تعطي $8x^3-2x$.', 'Work out $\\int(8x^3-2x)\\,dx$ and differentiate the result to check that you get $8x^3-2x$.'),
            options: [same('$8x^4-2x^2+k$'), same('$2x^4-x^2+k$'), same('$24x^2-2+k$')],
            correctIndex: 1,
            explanation: say('$8\\cdot\\frac{x^4}{4}=2x^4$ eta $2\\cdot\\frac{x^2}{2}=x^2$. Hirugarrena deribatua da.', '$8\\cdot\\frac{x^4}{4}=2x^4$ y $2\\cdot\\frac{x^2}{2}=x^2$. La tercera es la derivada.', '$8\\cdot\\frac{x^4}{4}=2x^4$ و$2\\cdot\\frac{x^2}{2}=x^2$. والثالثة هي المشتقة.', '$8\\cdot\\frac{x^4}{4}=2x^4$ and $2\\cdot\\frac{x^2}{2}=x^2$. The third one is the derivative.')
        }
    },
    'through-point': {
        mistake: {
            wrong: say('$(1,\\,5)$ puntutik pasatzeko, $k=5$ jartzen da.', 'Para que pase por $(1,\\,5)$ se pone $k=5$.', 'لكي تمر بالنقطة $(1,\\,5)$ نضع $k=5$.', 'For it to go through $(1,\\,5)$, you set $k=5$.'),
            right: say('Ordezkatu egin behar da: $F(1)+k=5$. $k$ konstantea 5 da $F(1)=0$ denean bakarrik.', 'Hay que sustituir: $F(1)+k=5$. La constante $k$ vale 5 solo si $F(1)=0$.', 'يجب التعويض: $F(1)+k=5$. ولا يساوي الثابت $k$ العدد 5 إلا إذا كان $F(1)=0$.', 'You must substitute: $F(1)+k=5$. The constant $k$ is 5 only if $F(1)=0$.')
        },
        check: {
            prompt: say('$f(x)=4x$ funtzioaren jatorrizkoa $F(x)=2x^2+k$ da. Zein $k$ behar da $(1,\\,7)$ puntutik pasatzeko?', 'Las primitivas de $f(x)=4x$ son $F(x)=2x^2+k$. ¿Qué $k$ hace falta para pasar por $(1,\\,7)$?', 'الدوال الأصلية لـ $f(x)=4x$ هي $F(x)=2x^2+k$. ما قيمة $k$ اللازمة لتمر بالنقطة $(1,\\,7)$؟', 'The antiderivatives of $f(x)=4x$ are $F(x)=2x^2+k$. What $k$ is needed to go through $(1,\\,7)$?'),
            options: [same('$k=7$'), same('$k=3$'), same('$k=5$')],
            correctIndex: 2,
            explanation: say('$F(1)=2+k=7$, beraz $k=5$. $k=3$ ateratzen da $f(1)$ erabiltzen bada $F(1)$ ordez.', '$F(1)=2+k=7$, así que $k=5$. Sale $k=3$ si se usa $f(1)$ en lugar de $F(1)$.', '$F(1)=2+k=7$ إذن $k=5$. ويخرج $k=3$ إذا استُعملت $f(1)$ بدل $F(1)$.', '$F(1)=2+k=7$, so $k=5$. You get $k=3$ if you use $f(1)$ instead of $F(1)$.')
        }
    },

    /* ---------- 2. Basic integrals ---------- */
    'exp-log': {
        mistake: {
            wrong: say('$\\int e^x\\,dx=\\frac{e^{x+1}}{x+1}+k$, berredura bat bezala.', '$\\int e^x\\,dx=\\frac{e^{x+1}}{x+1}+k$, como una potencia.', '$\\int e^x\\,dx=\\frac{e^{x+1}}{x+1}+k$ كأنها قوة.', '$\\int e^x\\,dx=\\frac{e^{x+1}}{x+1}+k$, as if it were a power.'),
            right: say('$e^x$ funtzioan aldagaia berretzailean dago: ez da $x$ aldagaiaren berredura. $\\int e^x\\,dx=e^x+k$.', 'En $e^x$ la variable está en el exponente: no es una potencia de $x$. $\\int e^x\\,dx=e^x+k$.', 'في $e^x$ يقع المتغير في الأس: ليست قوة لـ $x$. $\\int e^x\\,dx=e^x+k$.', 'In $e^x$ the variable is in the exponent: it is not a power of $x$. $\\int e^x\\,dx=e^x+k$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int\\left(\\frac{2}{x}+e^x\\right)dx$, $x>0$ denean.', 'Calcula $\\int\\left(\\frac{2}{x}+e^x\\right)dx$ para $x>0$.', 'احسب $\\int\\left(\\frac{2}{x}+e^x\\right)dx$ عندما $x>0$.', 'Work out $\\int\\left(\\frac{2}{x}+e^x\\right)dx$ for $x>0$.'),
            options: [same('$-\\frac{2}{x^2}+e^x+k$'), same('$2\\ln x+e^x+k$'), same('$2\\ln x+\\frac{e^{x+1}}{x+1}+k$')],
            correctIndex: 1,
            explanation: say('$(2\\ln x)\'=\\frac{2}{x}$ eta $(e^x)\'=e^x$. Lehenengoa deribatua da, ez integrala.', '$(2\\ln x)\'=\\frac{2}{x}$ y $(e^x)\'=e^x$. La primera es la derivada, no la integral.', '$(2\\ln x)\'=\\frac{2}{x}$ و$(e^x)\'=e^x$. والأولى هي المشتقة لا التكامل.', '$(2\\ln x)\'=\\frac{2}{x}$ and $(e^x)\'=e^x$. The first one is the derivative, not the integral.')
        }
    },
    trig: {
        mistake: {
            wrong: say('$\\int\\sin x\\,dx=\\cos x+k$', '$\\int\\sin x\\,dx=\\cos x+k$', '$\\int\\sin x\\,dx=\\cos x+k$', '$\\int\\sin x\\,dx=\\cos x+k$'),
            right: say('$\\cos x$ funtzioaren deribatua $-\\sin x$ da: minus zeinua behar da, $\\int\\sin x\\,dx=-\\cos x+k$.', 'La derivada de $\\cos x$ es $-\\sin x$: hace falta el menos, $\\int\\sin x\\,dx=-\\cos x+k$.', 'مشتقة $\\cos x$ هي $-\\sin x$: تلزم إشارة السالب، $\\int\\sin x\\,dx=-\\cos x+k$.', 'The derivative of $\\cos x$ is $-\\sin x$: the minus is needed, $\\int\\sin x\\,dx=-\\cos x+k$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int(4\\sin x+\\cos x)\\,dx$. Deribatzean $4\\sin x+\\cos x$ atera behar da.', 'Calcula $\\int(4\\sin x+\\cos x)\\,dx$. Al derivar tiene que salir $4\\sin x+\\cos x$.', 'احسب $\\int(4\\sin x+\\cos x)\\,dx$. عند الاشتقاق يجب أن يخرج $4\\sin x+\\cos x$.', 'Work out $\\int(4\\sin x+\\cos x)\\,dx$. Differentiating must give $4\\sin x+\\cos x$.'),
            options: [same('$-4\\cos x+\\sin x+k$'), same('$4\\cos x+\\sin x+k$'), same('$4\\cos x-\\sin x+k$')],
            correctIndex: 0,
            explanation: say('$(-4\\cos x)\'=4\\sin x$ eta $(\\sin x)\'=\\cos x$. Minusik gabe, zeinua kontrakoa da.', '$(-4\\cos x)\'=4\\sin x$ y $(\\sin x)\'=\\cos x$. Sin el menos, el signo es el contrario.', '$(-4\\cos x)\'=4\\sin x$ و$(\\sin x)\'=\\cos x$. ودون السالب تكون الإشارة معاكسة.', '$(-4\\cos x)\'=4\\sin x$ and $(\\sin x)\'=\\cos x$. Without the minus, the sign is the opposite.')
        }
    },
    arcs: {
        mistake: {
            wrong: say('$\\int\\frac{dx}{1+x^2}=\\ln(1+x^2)+k$', '$\\int\\frac{dx}{1+x^2}=\\ln(1+x^2)+k$', '$\\int\\frac{dx}{1+x^2}=\\ln(1+x^2)+k$', '$\\int\\frac{dx}{1+x^2}=\\ln(1+x^2)+k$'),
            right: say('Goian ez dago $1+x^2$ adierazpenaren deribatua, $2x$: $\\arctan x$ funtzioaren deribatua da. $\\int\\frac{dx}{1+x^2}=\\arctan x+k$.', 'Arriba no está la derivada de $1+x^2$, que es $2x$: es la derivada de $\\arctan x$. $\\int\\frac{dx}{1+x^2}=\\arctan x+k$.', 'ليست في الأعلى مشتقة $1+x^2$ وهي $2x$: إنها مشتقة $\\arctan x$. $\\int\\frac{dx}{1+x^2}=\\arctan x+k$.', 'The top is not the derivative of $1+x^2$, which is $2x$: it is the derivative of $\\arctan x$. $\\int\\frac{dx}{1+x^2}=\\arctan x+k$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int\\frac{dx}{x^2+2x+2}$, $x^2+2x$ adierazpenaren karratua osatuta.', 'Calcula $\\int\\frac{dx}{x^2+2x+2}$ completando el cuadrado de $x^2+2x$.', 'احسب $\\int\\frac{dx}{x^2+2x+2}$ بإكمال مربع $x^2+2x$.', 'Work out $\\int\\frac{dx}{x^2+2x+2}$ by completing the square of $x^2+2x$.'),
            options: [same('$\\ln(x^2+2x+2)+k$'), same('$\\arctan(x+2)+k$'), same('$\\arctan(x+1)+k$')],
            correctIndex: 2,
            explanation: say('$x^2+2x+2=(x+1)^2+1$, eta goian 1 dago, ez $2x+2$: arku tangentea da.', '$x^2+2x+2=(x+1)^2+1$, y arriba hay un 1, no $2x+2$: es una arcotangente.', '$x^2+2x+2=(x+1)^2+1$، وفي الأعلى 1 لا $2x+2$: إنه قوس ظل.', '$x^2+2x+2=(x+1)^2+1$, and the top is 1, not $2x+2$: it is an arctangent.')
        }
    },

    /* ---------- 3. Composite integrals ---------- */
    'chain-power': {
        mistake: {
            wrong: same('$\\begin{aligned}&\\int(x^2+1)^3\\,dx\\\\ &=\\frac{(x^2+1)^4}{4}+k\\end{aligned}$'),
            right: say('Kanpoan $u\'=2x$ falta da: $\\frac{(x^2+1)^4}{4}$ deribatzean $2x(x^2+1)^3$ ateratzen da, ez $(x^2+1)^3$.', 'Falta $u\'=2x$ fuera: al derivar $\\frac{(x^2+1)^4}{4}$ sale $2x(x^2+1)^3$, no $(x^2+1)^3$.', 'ينقص $u\'=2x$ في الخارج: عند اشتقاق $\\frac{(x^2+1)^4}{4}$ يخرج $2x(x^2+1)^3$ لا $(x^2+1)^3$.', '$u\'=2x$ is missing outside: differentiating $\\frac{(x^2+1)^4}{4}$ gives $2x(x^2+1)^3$, not $(x^2+1)^3$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int 3x^2(x^3+4)^5\\,dx$, $u=x^3+4$ hartuta.', 'Calcula $\\int 3x^2(x^3+4)^5\\,dx$ con $u=x^3+4$.', 'احسب $\\int 3x^2(x^3+4)^5\\,dx$ مع $u=x^3+4$.', 'Work out $\\int 3x^2(x^3+4)^5\\,dx$ with $u=x^3+4$.'),
            options: [same('$(x^3+4)^6+k$'), same('$\\frac{(x^3+4)^6}{6}+k$'), same('$\\frac{x^3(x^3+4)^6}{6}+k$')],
            correctIndex: 1,
            explanation: say('Kanpoan $u\'=3x^2$ dago, zehazki: $\\int u\'u^5\\,dx=\\frac{u^6}{6}+k$.', 'Fuera está justo $u\'=3x^2$: $\\int u\'u^5\\,dx=\\frac{u^6}{6}+k$.', 'في الخارج $u\'=3x^2$ تمامًا: $\\int u\'u^5\\,dx=\\frac{u^6}{6}+k$.', 'Exactly $u\'=3x^2$ is outside: $\\int u\'u^5\\,dx=\\frac{u^6}{6}+k$.')
        }
    },
    'chain-exp-log': {
        mistake: {
            wrong: say('$\\int e^{x^2}\\,dx=e^{x^2}+k$', '$\\int e^{x^2}\\,dx=e^{x^2}+k$', '$\\int e^{x^2}\\,dx=e^{x^2}+k$', '$\\int e^{x^2}\\,dx=e^{x^2}+k$'),
            right: say('$e^{x^2}$ deribatzean $2x\\,e^{x^2}$ ateratzen da: kanpoan $2x$ ez badago, ez da $u\'e^u$ forma.', 'Al derivar $e^{x^2}$ sale $2x\\,e^{x^2}$: sin el $2x$ fuera, no es la forma $u\'e^u$.', 'عند اشتقاق $e^{x^2}$ يخرج $2x\\,e^{x^2}$: دون $2x$ في الخارج ليست على الشكل $u\'e^u$.', 'Differentiating $e^{x^2}$ gives $2x\\,e^{x^2}$: without the $2x$ outside, it is not the form $u\'e^u$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int\\frac{3x^2}{x^3+1}\\,dx$. Zenbakitzailea $x^3+1$ adierazpenaren deribatua al da?', 'Calcula $\\int\\frac{3x^2}{x^3+1}\\,dx$. ¿Es el numerador la derivada de $x^3+1$?', 'احسب $\\int\\frac{3x^2}{x^3+1}\\,dx$. هل البسط مشتقة $x^3+1$؟', 'Work out $\\int\\frac{3x^2}{x^3+1}\\,dx$. Is the numerator the derivative of $x^3+1$?'),
            options: [same('$3x^2\\ln|x^3+1|+k$'), same('$\\frac{\\ln|x^3+1|}{3x^2}+k$'), same('$\\ln|x^3+1|+k$')],
            correctIndex: 2,
            explanation: say('Bai: $(x^3+1)\'=3x^2$. $\\frac{u\'}{u}$ forma da, eta jatorrizkoa $\\ln|u|$ da.', 'Sí: $(x^3+1)\'=3x^2$. Es la forma $\\frac{u\'}{u}$, y la primitiva es $\\ln|u|$.', 'نعم: $(x^3+1)\'=3x^2$. إنها على الشكل $\\frac{u\'}{u}$ والأصلية $\\ln|u|$.', 'Yes: $(x^3+1)\'=3x^2$. It is the form $\\frac{u\'}{u}$, and the antiderivative is $\\ln|u|$.')
        }
    },
    adjust: {
        mistake: {
            wrong: say('$\\int\\cos(x^2)\\,dx=\\frac{\\sin(x^2)}{2x}+k$, $2x$ doituta.', '$\\int\\cos(x^2)\\,dx=\\frac{\\sin(x^2)}{2x}+k$, ajustando el $2x$.', '$\\int\\cos(x^2)\\,dx=\\frac{\\sin(x^2)}{2x}+k$ بضبط $2x$.', '$\\int\\cos(x^2)\\,dx=\\frac{\\sin(x^2)}{2x}+k$, adjusting the $2x$.'),
            right: say('Zenbakiak bakarrik doitu daitezke, ez letrak: $\\frac{\\sin(x^2)}{2x}$ deribatzean ez da $\\cos(x^2)$ ateratzen. Integral hau ez da berehalakoa.', 'Solo se ajustan números, no letras: al derivar $\\frac{\\sin(x^2)}{2x}$ no sale $\\cos(x^2)$. Esta integral no es inmediata.', 'لا نضبط إلا الأعداد لا الحروف: اشتقاق $\\frac{\\sin(x^2)}{2x}$ لا يعطي $\\cos(x^2)$. وهذا التكامل ليس مباشرًا.', 'Only numbers can be adjusted, not letters: differentiating $\\frac{\\sin(x^2)}{2x}$ does not give $\\cos(x^2)$. This integral is not a basic one.')
        },
        check: {
            prompt: say('Kalkulatu $\\int e^{4x}\\,dx$, $u\'=4$ deribatuaren konstantea doituta.', 'Calcula $\\int e^{4x}\\,dx$ ajustando la constante de $u\'=4$.', 'احسب $\\int e^{4x}\\,dx$ بضبط ثابت $u\'=4$.', 'Work out $\\int e^{4x}\\,dx$ by adjusting the constant of $u\'=4$.'),
            options: [same('$\\frac{e^{4x}}{4}+k$'), same('$4e^{4x}+k$'), same('$e^{4x}+k$')],
            correctIndex: 0,
            explanation: say('$\\frac{1}{4}\\int 4e^{4x}\\,dx=\\frac{e^{4x}}{4}+k$. $4e^{4x}$ deribatua da.', '$\\frac{1}{4}\\int 4e^{4x}\\,dx=\\frac{e^{4x}}{4}+k$. $4e^{4x}$ es la derivada.', '$\\frac{1}{4}\\int 4e^{4x}\\,dx=\\frac{e^{4x}}{4}+k$. و$4e^{4x}$ هي المشتقة.', '$\\frac{1}{4}\\int 4e^{4x}\\,dx=\\frac{e^{4x}}{4}+k$. $4e^{4x}$ is the derivative.')
        }
    },

    /* ---------- 4. The definite integral ---------- */
    rectangles: {
        mistake: {
            wrong: say('Laukizuzen zabalagoekin, hurbilketa hobea da.', 'Con rectángulos más anchos la aproximación es mejor.', 'مع مستطيلات أعرض يكون التقريب أفضل.', 'With wider rectangles the approximation is better.'),
            right: say('Alderantziz: zenbat eta estuagoak, orduan eta gutxiago soberan edo falta, eta batura gehiago hurbiltzen da $\\int_a^b f(x)\\,dx$ integralera.', 'Al revés: cuanto más estrechos, menos sobra o falta, y la suma se acerca más a $\\int_a^b f(x)\\,dx$.', 'بالعكس: كلما ضاقت قلّ الزائد أو الناقص، واقترب المجموع أكثر من $\\int_a^b f(x)\\,dx$.', 'The other way round: the narrower they are, the less is left over or missing, and the sum gets closer to $\\int_a^b f(x)\\,dx$.')
        },
        check: {
            prompt: say('$f(x)=x+1$ zuzenaren azpian, 0 eta 2 artean, 1 oinarriko 2 laukizuzen jartzen dira, altuera eskuinean. Zenbat da batura? Gero, konparatu $\\int_0^2(x+1)\\,dx$ integralarekin.', 'Bajo $f(x)=x+1$, entre 0 y 2, se ponen 2 rectángulos de base 1 con la altura a la derecha. ¿Cuánto suman? Compáralo con $\\int_0^2(x+1)\\,dx$.', 'تحت $f(x)=x+1$ بين 0 و2 نضع مستطيلين قاعدة كل منهما 1 والارتفاع عند اليمين. كم مجموعهما؟ قارنه بـ $\\int_0^2(x+1)\\,dx$.', 'Under $f(x)=x+1$, between 0 and 2, you put 2 rectangles of base 1 with the height on the right. What do they add up to? Compare it with $\\int_0^2(x+1)\\,dx$.'),
            options: [same('$5$'), same('$3$'), same('$4$')],
            correctIndex: 0,
            explanation: say('$f(1)+f(2)=2+3=5$; integrala 4 da, eta laukizuzenak pasatu egiten dira. 3 ateratzen da altuera ezkerrean hartuta.', '$f(1)+f(2)=2+3=5$; la integral es 4, y los rectángulos se pasan. Con la altura a la izquierda sale 3.', '$f(1)+f(2)=2+3=5$؛ والتكامل 4 فالمستطيلات تزيد عليه. ومع الارتفاع عند اليسار يخرج 3.', '$f(1)+f(2)=2+3=5$; the integral is 4, and the rectangles overshoot. With the height on the left you get 3.')
        }
    },
    barrow: {
        mistake: {
            wrong: say('$\\int_1^3 f(x)\\,dx=F(1)-F(3)$', '$\\int_1^3 f(x)\\,dx=F(1)-F(3)$', '$\\int_1^3 f(x)\\,dx=F(1)-F(3)$', '$\\int_1^3 f(x)\\,dx=F(1)-F(3)$'),
            right: say('Goikoa ken behekoa da: $F(3)-F(1)$. Alderantziz eginda, zenbakia zeinuz aldatuta ateratzen da.', 'Es el de arriba menos el de abajo: $F(3)-F(1)$. Al revés sale el número cambiado de signo.', 'إنه الأعلى ناقص الأدنى: $F(3)-F(1)$. وبالعكس يخرج العدد بإشارة معاكسة.', 'It is the top one minus the bottom one: $F(3)-F(1)$. The other way round, the number comes out with the opposite sign.')
        },
        check: {
            prompt: say('Kalkulatu $\\int_1^2 3x^2\\,dx$, $x^3$ jatorrizkoarekin.', 'Calcula $\\int_1^2 3x^2\\,dx$ con la primitiva $x^3$.', 'احسب $\\int_1^2 3x^2\\,dx$ بالدالة الأصلية $x^3$.', 'Work out $\\int_1^2 3x^2\\,dx$ with the antiderivative $x^3$.'),
            options: [same('$9$'), same('$7$'), same('$-7$')],
            correctIndex: 1,
            explanation: say('$F(2)-F(1)=8-1=7$. $-7$ ateratzen da kenketa alderantziz eginda, eta 9 batuta.', '$F(2)-F(1)=8-1=7$. Sale $-7$ restando al revés, y 9 sumando.', '$F(2)-F(1)=8-1=7$. ويخرج $-7$ بالطرح المعكوس و9 بالجمع.', '$F(2)-F(1)=8-1=7$. Subtracting the other way gives $-7$, and adding gives 9.')
        }
    },
    properties: {
        mistake: {
            wrong: say('Biderkadura baten integrala integralen biderkadura da.', 'La integral de un producto es el producto de las integrales.', 'تكامل حاصل الضرب هو حاصل ضرب التكاملين.', 'The integral of a product is the product of the integrals.'),
            right: say('Baturak eta biderkatzen duten zenbakiak bakarrik banatzen dira: $\\int_0^1 x^2\\,dx=\\frac{1}{3}$, baina $\\int_0^1 x\\,dx\\cdot\\int_0^1 x\\,dx=\\frac{1}{4}$.', 'Solo se reparten las sumas y los números que multiplican: $\\int_0^1 x^2\\,dx=\\frac{1}{3}$, pero $\\int_0^1 x\\,dx\\cdot\\int_0^1 x\\,dx=\\frac{1}{4}$.', 'لا تتوزع إلا المجاميع والأعداد المضروبة: $\\int_0^1 x^2\\,dx=\\frac{1}{3}$ لكن $\\int_0^1 x\\,dx\\cdot\\int_0^1 x\\,dx=\\frac{1}{4}$.', 'Only sums and the numbers that multiply split: $\\int_0^1 x^2\\,dx=\\frac{1}{3}$, but $\\int_0^1 x\\,dx\\cdot\\int_0^1 x\\,dx=\\frac{1}{4}$.')
        },
        check: {
            prompt: say('$\\int_2^5 f(x)\\,dx=4$ eta $\\int_2^5 g(x)\\,dx=-1$ badira, zenbat da $\\int_2^5(2f(x)-g(x))\\,dx$?', 'Si $\\int_2^5 f(x)\\,dx=4$ y $\\int_2^5 g(x)\\,dx=-1$, ¿cuánto vale $\\int_2^5(2f(x)-g(x))\\,dx$?', 'إذا كان $\\int_2^5 f(x)\\,dx=4$ و$\\int_2^5 g(x)\\,dx=-1$ فكم يساوي $\\int_2^5(2f(x)-g(x))\\,dx$؟', 'If $\\int_2^5 f(x)\\,dx=4$ and $\\int_2^5 g(x)\\,dx=-1$, what is $\\int_2^5(2f(x)-g(x))\\,dx$?'),
            options: [same('$7$'), same('$5$'), same('$9$')],
            correctIndex: 2,
            explanation: say('$2\\cdot 4-(-1)=8+1=9$. Zeinua ahaztuta 7 ateratzen da, eta 2 ahaztuta 5.', '$2\\cdot 4-(-1)=8+1=9$. Olvidando el signo sale 7, y olvidando el 2, 5.', '$2\\cdot 4-(-1)=8+1=9$. وبنسيان الإشارة يخرج 7، وبنسيان العدد 2 يخرج 5.', '$2\\cdot 4-(-1)=8+1=9$. Forgetting the sign gives 7, and forgetting the 2 gives 5.')
        }
    },

    /* ---------- 5. Areas ---------- */
    'area-axis': {
        mistake: {
            wrong: say('$9-x^2$ kurbaren eta X ardatzaren arteko azalerarako, 0 eta 9 artean integratzen da.', 'Para el área entre $9-x^2$ y el eje X se integra de 0 a 9.', 'لحساب المساحة بين $9-x^2$ ومحور X نكامل من 0 إلى 9.', 'For the area between $9-x^2$ and the x-axis, you integrate from 0 to 9.'),
            right: say('Mugak ardatzarekiko ebaki-puntuak dira: $9-x^2=0$ eginda, $x=-3$ eta $x=3$.', 'Los límites son los cortes con el eje: $9-x^2=0$ da $x=-3$ y $x=3$.', 'الحدّان هما نقطتا التقاطع مع المحور: $9-x^2=0$ تعطي $x=-3$ و$x=3$.', 'The limits are where the curve meets the axis: $9-x^2=0$ gives $x=-3$ and $x=3$.')
        },
        check: {
            prompt: say('Aurkitu $f(x)=x^2+1$ kurbak, X ardatzak eta $x=0$ eta $x=3$ zuzenek mugatutako azalera.', 'Halla el área entre $f(x)=x^2+1$, el eje X y las rectas $x=0$ y $x=3$.', 'أوجد المساحة بين $f(x)=x^2+1$ ومحور X والمستقيمين $x=0$ و$x=3$.', 'Find the area between $f(x)=x^2+1$, the x-axis and the lines $x=0$ and $x=3$.'),
            options: [same('$30$'), same('$12$'), same('$9$')],
            correctIndex: 1,
            explanation: say('$\\left[\\frac{x^3}{3}+x\\right]_0^3=9+3=12$. 30 ateratzen da 3 zenbakiaz zatitu gabe, eta 9 $x$ gaia ahaztuta.', '$\\left[\\frac{x^3}{3}+x\\right]_0^3=9+3=12$. Sale 30 sin dividir entre 3, y 9 olvidando el término $x$.', '$\\left[\\frac{x^3}{3}+x\\right]_0^3=9+3=12$. ويخرج 30 دون القسمة على 3، و9 بنسيان الحد $x$.', '$\\left[\\frac{x^3}{3}+x\\right]_0^3=9+3=12$. You get 30 without dividing by 3, and 9 forgetting the term $x$.')
        }
    },
    'area-sign': {
        mistake: {
            wrong: say('$\\sin x$ kurbaren eta ardatzaren arteko azalera $[0,\\,2\\pi]$ tartean $\\int_0^{2\\pi}\\sin x\\,dx=0$ da.', 'El área entre $\\sin x$ y el eje en $[0,\\,2\\pi]$ es $\\int_0^{2\\pi}\\sin x\\,dx=0$.', 'المساحة بين $\\sin x$ والمحور في $[0,\\,2\\pi]$ هي $\\int_0^{2\\pi}\\sin x\\,dx=0$.', 'The area between $\\sin x$ and the axis on $[0,\\,2\\pi]$ is $\\int_0^{2\\pi}\\sin x\\,dx=0$.'),
            right: say('Beheko zatia negatiboan zenbatzen da: $\\pi$ puntuan zatitzen da, eta azalera $2+2=4$ da.', 'La parte de abajo cuenta en negativo: se parte en $\\pi$ y el área es $2+2=4$.', 'الجزء السفلي يُحسب بالسالب: نقسم عند $\\pi$ فتكون المساحة $2+2=4$.', 'The part below counts as negative: split at $\\pi$ and the area is $2+2=4$.')
        },
        check: {
            prompt: say('$f(x)=x-1$ zuzena ardatzaren azpian dago $x=1$ baino lehen. Zenbat da haren eta X ardatzaren arteko azalera $[0,\\,3]$ tartean?', '$f(x)=x-1$ está bajo el eje antes de $x=1$. ¿Cuánto mide el área entre ella y el eje X en $[0,\\,3]$?', '$f(x)=x-1$ تحت المحور قبل $x=1$. كم مساحة المنطقة بينها وبين محور X في $[0,\\,3]$؟', '$f(x)=x-1$ is below the axis before $x=1$. What is the area between it and the x-axis on $[0,\\,3]$?'),
            options: [same('$\\frac{5}{2}$'), same('$\\frac{3}{2}$'), same('$2$')],
            correctIndex: 0,
            explanation: say('Bi triangelu: azpian $\\frac{1}{2}$ eta gainean 2. Integrala $2-\\frac{1}{2}=\\frac{3}{2}$ da, baina azalera $\\frac{5}{2}$.', 'Dos triángulos: $\\frac{1}{2}$ debajo y 2 encima. La integral es $2-\\frac{1}{2}=\\frac{3}{2}$, pero el área es $\\frac{5}{2}$.', 'مثلثان: $\\frac{1}{2}$ تحت المحور و2 فوقه. التكامل $2-\\frac{1}{2}=\\frac{3}{2}$ لكن المساحة $\\frac{5}{2}$.', 'Two triangles: $\\frac{1}{2}$ below and 2 above. The integral is $2-\\frac{1}{2}=\\frac{3}{2}$, but the area is $\\frac{5}{2}$.')
        }
    },
    'between-curves': {
        mistake: {
            wrong: say('$y=x^2$ eta $y=x$ kurben arteko azalera $\\int_0^1(x^2-x)\\,dx=-\\frac{1}{6}$ da.', 'El área entre $y=x^2$ e $y=x$ es $\\int_0^1(x^2-x)\\,dx=-\\frac{1}{6}$.', 'المساحة بين $y=x^2$ و$y=x$ هي $\\int_0^1(x^2-x)\\,dx=-\\frac{1}{6}$.', 'The area between $y=x^2$ and $y=x$ is $\\int_0^1(x^2-x)\\,dx=-\\frac{1}{6}$.'),
            right: say('Goikoari behekoa kentzen zaio: $(0,\\,1)$ tartean goian $y=x$ dago, eta azalera $\\frac{1}{6}$ da.', 'Se resta la de abajo a la de arriba: en $(0,\\,1)$ arriba está $y=x$, y el área es $\\frac{1}{6}$.', 'نطرح الأدنى من الأعلى: في $(0,\\,1)$ يكون $y=x$ في الأعلى، والمساحة $\\frac{1}{6}$.', 'Subtract the bottom one from the top one: on $(0,\\,1)$, $y=x$ is on top, and the area is $\\frac{1}{6}$.')
        },
        check: {
            prompt: say('$y=x+2$ eta $y=x^2$ kurbak $x=-1$ eta $x=2$ puntuetan ebakitzen dira. Zenbat da haien arteko azalera?', '$y=x+2$ e $y=x^2$ se cortan en $x=-1$ y $x=2$. ¿Cuánto mide el área entre ellas?', 'يتقاطع $y=x+2$ و$y=x^2$ عند $x=-1$ و$x=2$. كم المساحة بينهما؟', '$y=x+2$ and $y=x^2$ meet at $x=-1$ and $x=2$. What is the area between them?'),
            options: [same('$-\\frac{9}{2}$'), same('$\\frac{9}{2}$'), same('$\\frac{10}{3}$')],
            correctIndex: 1,
            explanation: say('Goian $x+2$ dago: $\\int_{-1}^{2}(x+2-x^2)\\,dx=\\frac{9}{2}$. $-\\frac{9}{2}$ ateratzen da behekoa ken goikoa eginda.', 'Arriba está $x+2$: $\\int_{-1}^{2}(x+2-x^2)\\,dx=\\frac{9}{2}$. Sale $-\\frac{9}{2}$ restando la de arriba a la de abajo.', 'في الأعلى $x+2$: $\\int_{-1}^{2}(x+2-x^2)\\,dx=\\frac{9}{2}$. ويخرج $-\\frac{9}{2}$ بطرح الأعلى من الأدنى.', '$x+2$ is on top: $\\int_{-1}^{2}(x+2-x^2)\\,dx=\\frac{9}{2}$. You get $-\\frac{9}{2}$ subtracting the top one from the bottom one.')
        }
    }
}

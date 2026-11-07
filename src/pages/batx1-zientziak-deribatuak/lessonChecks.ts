import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuak · Batxilergoa 1 · Zientziak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests
   can import it; lessons.tsx merges it into the topics. The questions use
   new numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake: the average rate
   without dividing, 0/0 read as «no derivative», −f′ as the slope of the
   normal, «continuous, so differentiable», (f·g)′ = f′·g′, the quotient
   with the order swapped, the chain without the inside derivative,
   (eᵏˣ)′ = eᵏˣ, (cos x)′ = sin x and f′(x) instead of f′(a) in a tangent.
   ========================================================================== */

export type BachDerivativesTopicId =
    | 'average-rate' | 'derivative-point' | 'tangent'
    | 'one-sided-derivatives' | 'derivable-continuous' | 'piecewise-derivable'
    | 'definition' | 'powers' | 'sum-constant'
    | 'product' | 'quotient' | 'chain'
    | 'exp-log' | 'trig' | 'tangent-conditions'

export const bachDerivativesLessonChecks: Record<BachDerivativesTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. The rate of change ---------- */
    'average-rate': {
        mistake: {
            wrong: say('T.V.M. $f(b)-f(a)$ da.', 'La T.V.M. es $f(b)-f(a)$.', 'معدل التغير المتوسط هو $f(b)-f(a)$.', 'The average rate is $f(b)-f(a)$.'),
            right: say('$b-a$ kenduraz zatitu behar da, $x$ aldagaiak zenbat aldatzen den.', 'Hay que dividir entre $b-a$, lo que cambia $x$.', 'يجب القسمة على $b-a$، أي على تغير $x$.', 'You have to divide by $b-a$, the change in $x$.')
        },
        check: {
            prompt: say('Zein da $f(x)=x^2+1$ funtzioaren T.V.M. $[1,\\,3]$ tartean?', '¿Cuál es la T.V.M. de $f(x)=x^2+1$ en $[1,\\,3]$?', 'ما معدل التغير المتوسط لـ $f(x)=x^2+1$ في $[1,\\,3]$؟', 'What is the average rate of $f(x)=x^2+1$ on $[1,\\,3]$?'),
            options: [same('$4$'), same('$8$'), same('$2$')],
            correctIndex: 0,
            explanation: say('$f(3)=10$ eta $f(1)=2$: $\\frac{10-2}{3-1}=4$. 8 zenbakia zatitu gabe dago.', '$f(3)=10$ y $f(1)=2$: $\\frac{10-2}{3-1}=4$. El 8 está sin dividir.', '$f(3)=10$ و$f(1)=2$: $\\frac{10-2}{3-1}=4$. والعدد 8 دون قسمة.', '$f(3)=10$ and $f(1)=2$: $\\frac{10-2}{3-1}=4$. The 8 is not divided.')
        }
    },
    'derivative-point': {
        mistake: {
            wrong: say('$\\frac{0}{0}$ ateratzen da: deribatua ez dago.', 'Sale $\\frac{0}{0}$: la derivada no existe.', 'يظهر $\\frac{0}{0}$: المشتقة غير موجودة.', 'It gives $\\frac{0}{0}$: the derivative does not exist.'),
            right: say('Lehenik izendatzaileko $h$ sinplifikatzen da, eta gero $h\\to 0$ egiten da.', 'Primero se simplifica la $h$ del denominador, y después se hace $h\\to 0$.', 'نبسّط أولًا $h$ في المقام، ثم نجعل $h\\to 0$.', 'First you simplify the $h$ of the denominator, and then let $h\\to 0$.')
        },
        check: {
            prompt: say('$\\frac{f(2+h)-f(2)}{h}=4+h$ bada, zenbat da $f\'(2)$?', 'Si $\\frac{f(2+h)-f(2)}{h}=4+h$, ¿cuánto vale $f\'(2)$?', 'إذا كان $\\frac{f(2+h)-f(2)}{h}=4+h$ فكم تساوي $f\'(2)$؟', 'If $\\frac{f(2+h)-f(2)}{h}=4+h$, what is $f\'(2)$?'),
            options: [say('Ez dago', 'No existe', 'غير موجودة', 'It does not exist'), same('$4$'), same('$6$')],
            correctIndex: 1,
            explanation: say('$h\\to 0$ egitean, $4+h$ adierazpena 4 baliora doa.', 'Al hacer $h\\to 0$, $4+h$ tiende a 4.', 'عندما $h\\to 0$ تؤول $4+h$ إلى 4.', 'As $h\\to 0$, $4+h$ tends to 4.')
        }
    },
    tangent: {
        mistake: {
            wrong: say('Normalaren malda $-f\'(a)$ da.', 'La normal tiene pendiente $-f\'(a)$.', 'ميل العمودي $-f\'(a)$.', 'The normal has slope $-f\'(a)$.'),
            right: say('$-\\frac{1}{f\'(a)}$ da: bi malden biderkadurak $-1$ eman behar du.', 'Es $-\\frac{1}{f\'(a)}$: el producto de las dos pendientes tiene que dar $-1$.', 'إنه $-\\frac{1}{f\'(a)}$: يجب أن يساوي جداء الميلين $-1$.', 'It is $-\\frac{1}{f\'(a)}$: the product of the two slopes has to be $-1$.')
        },
        check: {
            prompt: say('$f\'(4)=5$ bada, zer malda du normalak $x=4$ puntuan?', 'Si $f\'(4)=5$, ¿qué pendiente tiene la normal en $x=4$?', 'إذا كانت $f\'(4)=5$ فما ميل العمودي عند $x=4$؟', 'If $f\'(4)=5$, what slope does the normal have at $x=4$?'),
            options: [same('$-5$'), same('$\\frac{1}{5}$'), same('$-\\frac{1}{5}$')],
            correctIndex: 2,
            explanation: say('Normala perpendikularra da: $-\\frac{1}{5}\\cdot 5=-1$.', 'La normal es perpendicular: $-\\frac{1}{5}\\cdot 5=-1$.', 'العمودي متعامد مع المماس: $-\\frac{1}{5}\\cdot 5=-1$.', 'The normal is at right angles: $-\\frac{1}{5}\\cdot 5=-1$.')
        }
    },

    /* ---------- 2. Differentiability ---------- */
    'one-sided-derivatives': {
        mistake: {
            wrong: say('$|x|$ funtzioaren deribatua 0 da $x=0$ puntuan.', '$|x|$ tiene derivada 0 en $x=0$.', 'مشتقة $|x|$ تساوي 0 عند $x=0$.', '$|x|$ has derivative 0 at $x=0$.'),
            right: say('Ezkerretik malda $-1$ da, eta eskuinetik 1: ez dago deribaturik 0 puntuan.', 'Por la izquierda la pendiente es $-1$ y por la derecha 1: no hay derivada en 0.', 'من اليسار الميل $-1$ ومن اليمين 1: لا توجد مشتقة عند 0.', 'From the left the slope is $-1$ and from the right 1: there is no derivative at 0.')
        },
        check: {
            prompt: say('$f$ jarraitua da 3 puntuan, $f\'(3^-)=2$ eta $f\'(3^+)=2$. Deribagarria al da 3 puntuan?', '$f$ es continua en 3, con $f\'(3^-)=2$ y $f\'(3^+)=2$. ¿Es derivable en 3?', '$f$ متصلة عند 3 مع $f\'(3^-)=2$ و$f\'(3^+)=2$. هل هي قابلة للاشتقاق عند 3؟', '$f$ is continuous at 3, with $f\'(3^-)=2$ and $f\'(3^+)=2$. Is it differentiable at 3?'),
            options: [say('Bai, $f\'(3)=2$', 'Sí, $f\'(3)=2$', 'نعم، $f\'(3)=2$', 'Yes, $f\'(3)=2$'), say('Ez, punta bat dago', 'No, hay un pico', 'لا، توجد زاوية', 'No, there is a corner'), say('Ezin da jakin', 'No se puede saber', 'لا يمكن معرفة ذلك', 'You cannot tell')],
            correctIndex: 0,
            explanation: say('Jarraitua da eta alboko deribatuak berdinak dira: deribagarria da, 2 maldarekin.', 'Es continua y las derivadas laterales coinciden: es derivable, con pendiente 2.', 'متصلة والمشتقتان الجانبيتان متساويتان: قابلة للاشتقاق بميل 2.', 'It is continuous and the one-sided derivatives are equal: it is differentiable, with slope 2.')
        }
    },
    'derivable-continuous': {
        mistake: {
            wrong: say('$f$ jarraitua bada $a$ puntuan, deribagarria da $a$ puntuan.', 'Si $f$ es continua en $a$, es derivable en $a$.', 'إذا كانت $f$ متصلة عند $a$ فهي قابلة للاشتقاق عند $a$.', 'If $f$ is continuous at $a$, it is differentiable at $a$.'),
            right: say('Alderantziz da: deribagarriak jarraitua dakar. $|x|$ jarraitua da 0 puntuan, eta punta bat du.', 'Es al revés: derivable implica continua. $|x|$ es continua en 0 y tiene un pico.', 'العكس هو الصحيح: القابلية للاشتقاق تقتضي الاتصال. $|x|$ متصلة عند 0 ولها زاوية.', 'It is the other way round: differentiable implies continuous. $|x|$ is continuous at 0 and has a corner.')
        },
        check: {
            prompt: say('$f$ funtzioak jauzi egiten du $x=5$ puntuan. Deribagarria izan daiteke $x=5$ puntuan?', '$f$ da un salto en $x=5$. ¿Puede ser derivable en $x=5$?', 'تقفز $f$ عند $x=5$. هل يمكن أن تكون قابلة للاشتقاق عند $x=5$؟', '$f$ jumps at $x=5$. Can it be differentiable at $x=5$?'),
            options: [say('Bai, zatiek malda bera badute', 'Sí, si los trozos tienen la misma pendiente', 'نعم، إذا كان للجزأين الميل نفسه', 'Yes, if the pieces have the same slope'), say('Ez: jarraitutasunik gabe ez dago deribaturik', 'No: sin continuidad no hay derivada', 'لا: دون اتصال لا توجد مشتقة', 'No: without continuity there is no derivative'), say('$f(5)=0$ bada bakarrik', 'Solo si $f(5)=0$', 'فقط إذا كانت $f(5)=0$', 'Only if $f(5)=0$')],
            correctIndex: 1,
            explanation: say('Funtzio deribagarri bat beti da jarraitua; jauziak jarraitutasuna hausten du.', 'Una función derivable siempre es continua; el salto rompe la continuidad.', 'الدالة القابلة للاشتقاق متصلة دائمًا؛ والقفزة تكسر الاتصال.', 'A differentiable function is always continuous; the jump breaks continuity.')
        }
    },
    'piecewise-derivable': {
        mistake: {
            wrong: say('Nahikoa da zatiak elkartzea.', 'Basta con que los trozos se unan.', 'يكفي أن يلتقي الجزآن.', 'It is enough for the pieces to meet.'),
            right: say('Malda berarekin ere iritsi behar dute; bestela, punta bat dago.', 'También tienen que llegar con la misma pendiente; si no, hay un pico.', 'يجب أيضًا أن يصلا بالميل نفسه، وإلا وُجدت زاوية.', 'They also have to arrive with the same slope; if not, there is a corner.')
        },
        check: {
            prompt: say('Funtzio honetan, zer $b$ baliok egiten du jarraitua? $f(x)=\\begin{cases}x^2 & x<3\\\\ 6x+b & x\\ge 3\\end{cases}$', 'En esta función, ¿qué $b$ la hace continua? $f(x)=\\begin{cases}x^2 & x<3\\\\ 6x+b & x\\ge 3\\end{cases}$', 'في هذه الدالة، أي $b$ يجعلها متصلة؟ $f(x)=\\begin{cases}x^2 & x<3\\\\ 6x+b & x\\ge 3\\end{cases}$', 'In this function, which $b$ makes it continuous? $f(x)=\\begin{cases}x^2 & x<3\\\\ 6x+b & x\\ge 3\\end{cases}$'),
            options: [same('$9$'), same('$-9$'), same('$3$')],
            correctIndex: 1,
            explanation: say('$9=18+b$, beraz $b=-9$. Gainera, maldak $2\\cdot 3=6$ eta 6 dira: deribagarria ere bada.', '$9=18+b$, así que $b=-9$. Además, las pendientes son $2\\cdot 3=6$ y 6: también es derivable.', '$9=18+b$، إذن $b=-9$. والميلان $2\\cdot 3=6$ و6: فهي قابلة للاشتقاق أيضًا.', '$9=18+b$, so $b=-9$. Also, the slopes are $2\\cdot 3=6$ and 6: it is differentiable too.')
        }
    },

    /* ---------- 3. The derivative function ---------- */
    definition: {
        mistake: {
            wrong: same('$f(x+h)=f(x)+h$'),
            right: say('Formulan $x$ aldagaiaren ordez $x+h$ jartzen da: $x^2$ funtzioan, $(x+h)^2=x^2+2xh+h^2$.', 'Hay que sustituir $x$ por $x+h$ en la fórmula: para $x^2$, $(x+h)^2=x^2+2xh+h^2$.', 'نعوّض $x$ بـ $x+h$ في الصيغة: في $x^2$ نجد $(x+h)^2=x^2+2xh+h^2$.', 'You replace $x$ by $x+h$ in the formula: for $x^2$, $(x+h)^2=x^2+2xh+h^2$.')
        },
        check: {
            prompt: say('$f(x)=x^2-x$ bada, zer da $f(x+h)$?', 'Si $f(x)=x^2-x$, ¿qué es $f(x+h)$?', 'إذا كانت $f(x)=x^2-x$ فما $f(x+h)$؟', 'If $f(x)=x^2-x$, what is $f(x+h)$?'),
            options: [same('$x^2-x+h$'), same('$(x+h)^2-(x+h)$'), same('$x^2+h^2-x$')],
            correctIndex: 1,
            explanation: say('$x$ bakoitzaren ordez $x+h$ jartzen da, parentesiekin.', 'Cada $x$ se cambia por $x+h$, con paréntesis.', 'تُستبدل كل $x$ بـ $x+h$ مع الأقواس.', 'Each $x$ is replaced by $x+h$, with brackets.')
        }
    },
    powers: {
        mistake: {
            wrong: same('$(x^{-2})\'=-2x^{-1}$'),
            right: say('Berretzaileari 1 kentzen zaio: $-2-1=-3$; beraz, $(x^{-2})\'=-2x^{-3}$.', 'Al exponente se le resta 1: $-2-1=-3$, así que $(x^{-2})\'=-2x^{-3}$.', 'نطرح 1 من الأس: $-2-1=-3$، إذن $(x^{-2})\'=-2x^{-3}$.', 'You subtract 1 from the exponent: $-2-1=-3$, so $(x^{-2})\'=-2x^{-3}$.')
        },
        check: {
            prompt: say('$f(x)=\\frac{1}{x}$ bada, zein da $f\'(x)$?', 'Si $f(x)=\\frac{1}{x}$, ¿cuál es $f\'(x)$?', 'إذا كانت $f(x)=\\frac{1}{x}$ فما $f\'(x)$؟', 'If $f(x)=\\frac{1}{x}$, what is $f\'(x)$?'),
            options: [same('$\\frac{1}{x^2}$'), same('$0$'), same('$-\\frac{1}{x^2}$')],
            correctIndex: 2,
            explanation: say('$x^{-1}$ deribatuz, $-1\\cdot x^{-2}=-\\frac{1}{x^2}$. Zenbakitzaileko 1 ez da konstante bakarti bat.', 'Derivando $x^{-1}$, $-1\\cdot x^{-2}=-\\frac{1}{x^2}$. El 1 de arriba no es una constante suelta.', 'باشتقاق $x^{-1}$ نجد $-1\\cdot x^{-2}=-\\frac{1}{x^2}$. والعدد 1 في البسط ليس ثابتًا منفردًا.', 'Differentiating $x^{-1}$, $-1\\cdot x^{-2}=-\\frac{1}{x^2}$. The 1 on top is not a constant on its own.')
        }
    },
    'sum-constant': {
        mistake: {
            wrong: same('$(x^2+7)\'=2x+7$'),
            right: say('Konstante baten deribatua 0 da: $(x^2+7)\'=2x$.', 'La derivada de una constante es 0: $(x^2+7)\'=2x$.', 'مشتقة الثابت 0: $(x^2+7)\'=2x$.', 'The derivative of a constant is 0: $(x^2+7)\'=2x$.')
        },
        check: {
            prompt: say('$f(x)=3x^2-4x+9$ bada, zenbat da $f\'(1)$?', 'Si $f(x)=3x^2-4x+9$, ¿cuánto vale $f\'(1)$?', 'إذا كانت $f(x)=3x^2-4x+9$ فكم تساوي $f\'(1)$؟', 'If $f(x)=3x^2-4x+9$, what is $f\'(1)$?'),
            options: [same('$11$'), same('$2$'), same('$8$')],
            correctIndex: 1,
            explanation: say('$f\'(x)=6x-4$; beraz, $f\'(1)=6-4=2$. 11 emaitzan 9 konstantea gehitu da.', '$f\'(x)=6x-4$, así que $f\'(1)=6-4=2$. En el 11 se ha sumado la constante 9.', '$f\'(x)=6x-4$، إذن $f\'(1)=6-4=2$. وفي 11 أُضيف الثابت 9.', '$f\'(x)=6x-4$, so $f\'(1)=6-4=2$. The 11 has the constant 9 added.')
        }
    },

    /* ---------- 4. Rules of differentiation ---------- */
    product: {
        mistake: {
            wrong: same('$(f\\cdot g)\'=f\'\\cdot g\'$'),
            right: say('Faktore bakoitza txandaka deribatzen da eta batu egiten da: $f\'\\cdot g+f\\cdot g\'$.', 'Se deriva cada factor por turno y se suma: $f\'\\cdot g+f\\cdot g\'$.', 'يُشتق كل عامل بالدور ثم نجمع: $f\'\\cdot g+f\\cdot g\'$.', 'Each factor is differentiated in turn and you add: $f\'\\cdot g+f\\cdot g\'$.')
        },
        check: {
            prompt: say('$f(x)=x^2(x-6)$ bada, zer da $f\'(x)$?', 'Si $f(x)=x^2(x-6)$, ¿qué es $f\'(x)$?', 'إذا كانت $f(x)=x^2(x-6)$ فما $f\'(x)$؟', 'If $f(x)=x^2(x-6)$, what is $f\'(x)$?'),
            options: [same('$2x(x-6)+x^2$'), same('$2x$'), same('$2x(x-6)$')],
            correctIndex: 0,
            explanation: say('$(x^2)\'=2x$ eta $(x-6)\'=1$; $2x$ emaitza deribatuak biderkatzetik dator.', '$(x^2)\'=2x$ y $(x-6)\'=1$; el $2x$ sale de multiplicar las derivadas.', '$(x^2)\'=2x$ و$(x-6)\'=1$؛ والنتيجة $2x$ تأتي من ضرب المشتقتين.', '$(x^2)\'=2x$ and $(x-6)\'=1$; the $2x$ comes from multiplying the derivatives.')
        }
    },
    quotient: {
        mistake: {
            wrong: same('$\\left(\\frac{f}{g}\\right)\'=\\frac{f\'}{g\'}$'),
            right: say('Deribatuak ez dira zatitzen: $\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$.', 'Las derivadas no se dividen: $\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$.', 'لا تُقسم المشتقات: $\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$.', 'The derivatives are not divided: $\\frac{f\'\\cdot g-f\\cdot g\'}{g^2}$.')
        },
        check: {
            prompt: say('$f(x)=\\frac{x}{x+1}$ bada, zer da $f\'(x)$?', 'Si $f(x)=\\frac{x}{x+1}$, ¿qué es $f\'(x)$?', 'إذا كانت $f(x)=\\frac{x}{x+1}$ فما $f\'(x)$؟', 'If $f(x)=\\frac{x}{x+1}$, what is $f\'(x)$?'),
            options: [same('$1$'), same('$\\frac{1}{(x+1)^2}$'), same('$\\frac{-1}{(x+1)^2}$')],
            correctIndex: 1,
            explanation: say('$\\frac{1\\cdot(x+1)-x\\cdot 1}{(x+1)^2}$: zenbakitzailea 1 da. Ordena aldatuz gero, $-1$ ateratzen da.', '$\\frac{1\\cdot(x+1)-x\\cdot 1}{(x+1)^2}$: el numerador vale 1. Con el orden cambiado sale $-1$.', '$\\frac{1\\cdot(x+1)-x\\cdot 1}{(x+1)^2}$: البسط يساوي 1. وبتغيير الترتيب يظهر $-1$.', '$\\frac{1\\cdot(x+1)-x\\cdot 1}{(x+1)^2}$: the numerator is 1. With the order swapped you get $-1$.')
        }
    },
    chain: {
        mistake: {
            wrong: same('$\\big((3x+1)^4\\big)\'=4(3x+1)^3$'),
            right: say('Barrukoaren deribatua falta da: $4(3x+1)^3\\cdot 3=12(3x+1)^3$.', 'Falta la derivada de dentro: $4(3x+1)^3\\cdot 3=12(3x+1)^3$.', 'تنقص مشتقة الداخلية: $4(3x+1)^3\\cdot 3=12(3x+1)^3$.', 'The derivative of the inside is missing: $4(3x+1)^3\\cdot 3=12(3x+1)^3$.')
        },
        check: {
            prompt: say('$f(x)=(2x-1)^3$ bada, zer da $f\'(x)$?', 'Si $f(x)=(2x-1)^3$, ¿qué es $f\'(x)$?', 'إذا كانت $f(x)=(2x-1)^3$ فما $f\'(x)$؟', 'If $f(x)=(2x-1)^3$, what is $f\'(x)$?'),
            options: [same('$3(2x-1)^2$'), same('$6x^2$'), same('$6(2x-1)^2$')],
            correctIndex: 2,
            explanation: say('$3(2x-1)^2\\cdot 2$: barrukoaren deribatua 2 da.', '$3(2x-1)^2\\cdot 2$: la derivada de dentro es 2.', '$3(2x-1)^2\\cdot 2$: مشتقة الداخلية 2.', '$3(2x-1)^2\\cdot 2$: the derivative of the inside is 2.')
        }
    },

    /* ---------- 5. Elementary functions ---------- */
    'exp-log': {
        mistake: {
            wrong: same('$(e^{5x})\'=e^{5x}$'),
            right: say('Berretzailearen deribatua falta da, 5: $(e^{5x})\'=5e^{5x}$.', 'Falta la derivada del exponente, 5: $(e^{5x})\'=5e^{5x}$.', 'تنقص مشتقة الأس، 5: $(e^{5x})\'=5e^{5x}$.', 'The derivative of the exponent, 5, is missing: $(e^{5x})\'=5e^{5x}$.')
        },
        check: {
            prompt: say('$f(x)=\\ln(3x)$ bada, zer da $f\'(x)$?', 'Si $f(x)=\\ln(3x)$, ¿qué es $f\'(x)$?', 'إذا كانت $f(x)=\\ln(3x)$ فما $f\'(x)$؟', 'If $f(x)=\\ln(3x)$, what is $f\'(x)$?'),
            options: [same('$\\frac{3}{x}$'), same('$\\frac{1}{x}$'), same('$\\frac{1}{3x}$')],
            correctIndex: 1,
            explanation: say('$\\frac{3}{3x}=\\frac{1}{x}$: barrukoaren deribatua zati barrukoa.', '$\\frac{3}{3x}=\\frac{1}{x}$: la derivada de dentro entre lo de dentro.', '$\\frac{3}{3x}=\\frac{1}{x}$: مشتقة الداخل على الداخل.', '$\\frac{3}{3x}=\\frac{1}{x}$: the derivative of the inside over the inside.')
        }
    },
    trig: {
        mistake: {
            wrong: same('$(\\cos x)\'=\\sin x$'),
            right: say('Minus zeinua darama: $(\\cos x)\'=-\\sin x$.', 'Lleva un signo menos: $(\\cos x)\'=-\\sin x$.', 'فيها إشارة سالب: $(\\cos x)\'=-\\sin x$.', 'It has a minus sign: $(\\cos x)\'=-\\sin x$.')
        },
        check: {
            prompt: say('$f(x)=\\sin(3x)$ bada, zer da $f\'(x)$?', 'Si $f(x)=\\sin(3x)$, ¿qué es $f\'(x)$?', 'إذا كانت $f(x)=\\sin(3x)$ فما $f\'(x)$؟', 'If $f(x)=\\sin(3x)$, what is $f\'(x)$?'),
            options: [same('$\\cos(3x)$'), same('$-3\\cos(3x)$'), same('$3\\cos(3x)$')],
            correctIndex: 2,
            explanation: say('Sinuaren deribatua kosinua da, eta kateak 3 dakar.', 'La derivada del seno es el coseno, y la cadena trae el 3.', 'مشتقة الجيب جيب التمام، والسلسلة تجلب 3.', 'The derivative of sine is cosine, and the chain brings the 3.')
        }
    },
    'tangent-conditions': {
        mistake: {
            wrong: same('$y-f(a)=f\'(x)(x-a)$'),
            right: say('Malda zenbaki bat da, $f\'(a)$: lehenik $x=a$ ordezkatzen da deribatuan.', 'La pendiente es un número, $f\'(a)$: primero se sustituye $x=a$ en la derivada.', 'الميل عدد، $f\'(a)$: نعوّض أولًا $x=a$ في المشتقة.', 'The slope is a number, $f\'(a)$: first you substitute $x=a$ in the derivative.')
        },
        check: {
            prompt: say('$f\'(x)=2x-6$ bada, zer $x$ baliotan da horizontala zuzen ukitzailea?', 'Si $f\'(x)=2x-6$, ¿en qué $x$ es horizontal la tangente?', 'إذا كانت $f\'(x)=2x-6$ فعند أي $x$ يكون المماس أفقيًّا؟', 'If $f\'(x)=2x-6$, at which $x$ is the tangent horizontal?'),
            options: [same('$x=-6$'), same('$x=3$'), same('$x=6$')],
            correctIndex: 1,
            explanation: say('Horizontala: $2x-6=0$, beraz $x=3$.', 'Horizontal: $2x-6=0$, así que $x=3$.', 'أفقي: $2x-6=0$، إذن $x=3$.', 'Horizontal: $2x-6=0$, so $x=3$.')
        }
    }
}

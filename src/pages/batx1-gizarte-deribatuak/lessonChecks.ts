import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from './text.ts'

/* ==========================================================================
   Deribatuak eta haien aplikazioak · Batxilergoa 1 · Gizarte Zientziak —
   the typical mistake and the «Check it» question of every lesson. Plain
   data (no JSX) so the tests can import it. The questions use new
   numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake: dividing by b
   instead of b − a, (x⁴)′ = 4x⁴, the product of the derivatives, the
   inside of the chain forgotten, f′ = 0 always taken as an extreme, the
   borders of an interval forgotten.
   ========================================================================== */

export type SocDerivTopicId =
    | 'average-rate' | 'derivative-point' | 'tangent'
    | 'derivative-function' | 'product-quotient' | 'chain-exp-log'
    | 'sign-intervals' | 'singular-points' | 'extreme-coefficients'
    | 'max-profit' | 'optimize' | 'interval-extremes'
    | 'polynomial-graph' | 'rational-graph' | 'derivative-graph'

export const socDerivLessonChecks: Record<SocDerivTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Rate of change ---------- */
    'average-rate': {
        mistake: {
            wrong: say('$[1,5]$ tarteko T.V.M. $\\frac{f(5)-f(1)}{5}$ da.', 'La T.V.M. en $[1,5]$ es $\\frac{f(5)-f(1)}{5}$.', 'معدل التغير المتوسط في $[1,5]$ هو $\\frac{f(5)-f(1)}{5}$.', 'The average rate on $[1,5]$ is $\\frac{f(5)-f(1)}{5}$.'),
            right: say('Tartearen luzeraz zatitzen da: $5-1=4$.', 'Se divide entre la longitud del intervalo: $5-1=4$.', 'نقسم على طول المجال: $5-1=4$.', 'You divide by the length of the interval: $5-1=4$.')
        },
        check: {
            prompt: say('Zein da $f(x)=x^2$ funtzioaren T.V.M. $[1,3]$ tartean?', '¿Cuál es la T.V.M. de $f(x)=x^2$ en $[1,3]$?', 'ما معدل التغير المتوسط لـ $f(x)=x^2$ في $[1,3]$؟', 'What is the average rate of $f(x)=x^2$ on $[1,3]$?'),
            options: [same('$4$'), same('$\\frac{8}{3}$'), same('$8$')],
            correctIndex: 0,
            explanation: same('$\\frac{9-1}{3-1}=4$')
        }
    },
    'derivative-point': {
        mistake: {
            wrong: say('$h=0$ jarrita, $\\frac{h^2+h}{h}$ adierazpenak $\\frac{0}{0}$ ematen du: ez dago deribaturik.', 'Con $h=0$, $\\frac{h^2+h}{h}$ da $\\frac{0}{0}$: no hay derivada.', 'مع $h=0$ تعطي $\\frac{h^2+h}{h}$ القيمة $\\frac{0}{0}$: لا توجد مشتقة.', 'With $h=0$, $\\frac{h^2+h}{h}$ gives $\\frac{0}{0}$: there is no derivative.'),
            right: say('Lehenik $h$ sinplifikatzen da, eta gero $h\\to 0$ egiten da.', 'Primero se simplifica $h$ y después se hace $h\\to 0$.', 'نختصر $h$ أولًا ثم نجعل $h\\to 0$.', 'First cancel $h$, then let $h\\to 0$.')
        },
        check: {
            prompt: say('Zenbat da $f\'(3)$, $f(x)=x^2$ bada?', '¿Cuánto vale $f\'(3)$ si $f(x)=x^2$?', 'كم تساوي $f\'(3)$ إذا كانت $f(x)=x^2$؟', 'What is $f\'(3)$ if $f(x)=x^2$?'),
            options: [same('$9$'), same('$6$'), same('$3$')],
            correctIndex: 1,
            explanation: same('$\\frac{(3+h)^2-9}{h}=6+h\\ \\to\\ 6$')
        }
    },
    tangent: {
        mistake: {
            wrong: same('$y=f\'(a)(x-a)$'),
            right: say('Puntua falta da: $y-f(a)=f\'(a)(x-a)$.', 'Falta el punto: $y-f(a)=f\'(a)(x-a)$.', 'تنقص النقطة: $y-f(a)=f\'(a)(x-a)$.', 'The point is missing: $y-f(a)=f\'(a)(x-a)$.')
        },
        check: {
            prompt: say('$f(3)=5$ eta $f\'(3)=2$ dira. Zein da $x=3$ puntuko zuzen ukitzailea?', 'Se sabe que $f(3)=5$ y $f\'(3)=2$. ¿Cuál es la tangente en $x=3$?', 'نعلم أن $f(3)=5$ و$f\'(3)=2$. ما المماس عند $x=3$؟', 'We know $f(3)=5$ and $f\'(3)=2$. What is the tangent at $x=3$?'),
            options: [same('$y=2x-1$'), same('$y=2x+5$'), same('$y=2(x-3)$')],
            correctIndex: 0,
            explanation: same('$y-5=2(x-3)\\ \\to\\ y=2x-1$')
        }
    },

    /* ---------- 2. Rules ---------- */
    'derivative-function': {
        mistake: {
            wrong: same('$(x^4)\'=4x^4$'),
            right: say('Berretzailea jaitsi eta bat kentzen zaio: $4x^3$.', 'El exponente baja y se le resta uno: $4x^3$.', 'ينزل الأس ونطرح منه واحدًا: $4x^3$.', 'The exponent comes down and loses one: $4x^3$.')
        },
        check: {
            prompt: say('Zein da $f\'(x)$, $f(x)=3x^4-2x$ bada?', '¿Cuál es $f\'(x)$ si $f(x)=3x^4-2x$?', 'ما $f\'(x)$ إذا كانت $f(x)=3x^4-2x$؟', 'What is $f\'(x)$ if $f(x)=3x^4-2x$?'),
            options: [same('$12x^3-2$'), same('$12x^4-2$'), same('$7x^3-2$')],
            correctIndex: 0,
            explanation: same('$3\\cdot 4x^3-2=12x^3-2$')
        }
    },
    'product-quotient': {
        mistake: {
            wrong: same('$(x^2\\cdot x^3)\'=2x\\cdot 3x^2$'),
            right: say('Erregelarekin: $2x\\cdot x^3+x^2\\cdot 3x^2=5x^4$, $(x^5)\'$ bezala.', 'Con la regla: $2x\\cdot x^3+x^2\\cdot 3x^2=5x^4$, como $(x^5)\'$.', 'بالقاعدة: $2x\\cdot x^3+x^2\\cdot 3x^2=5x^4$، مثل $(x^5)\'$.', 'With the rule: $2x\\cdot x^3+x^2\\cdot 3x^2=5x^4$, like $(x^5)\'$.')
        },
        check: {
            prompt: say('Zenbat da $g\'(0)$, $g(x)=\\frac{x+1}{x+2}$ bada?', '¿Cuánto vale $g\'(0)$ si $g(x)=\\frac{x+1}{x+2}$?', 'كم تساوي $g\'(0)$ إذا كانت $g(x)=\\frac{x+1}{x+2}$؟', 'What is $g\'(0)$ if $g(x)=\\frac{x+1}{x+2}$?'),
            options: [same('$\\frac{1}{4}$'), same('$1$'), same('$\\frac{1}{2}$')],
            correctIndex: 0,
            explanation: same('$g\'(x)=\\frac{(x+2)-(x+1)}{(x+2)^2}=\\frac{1}{(x+2)^2}$')
        }
    },
    'chain-exp-log': {
        mistake: {
            wrong: same('$(e^{3x})\'=e^{3x}$'),
            right: say('Barrukoaren deribatua falta da: $3e^{3x}$.', 'Falta la derivada de dentro: $3e^{3x}$.', 'تنقص مشتقة ما بالداخل: $3e^{3x}$.', 'The derivative of the inside is missing: $3e^{3x}$.')
        },
        check: {
            prompt: say('Zein da $f\'(x)$, $f(x)=\\ln(5x+2)$ bada?', '¿Cuál es $f\'(x)$ si $f(x)=\\ln(5x+2)$?', 'ما $f\'(x)$ إذا كانت $f(x)=\\ln(5x+2)$؟', 'What is $f\'(x)$ if $f(x)=\\ln(5x+2)$?'),
            options: [same('$\\frac{1}{5x+2}$'), same('$\\frac{5}{5x+2}$'), same('$5\\ln(5x+2)$')],
            correctIndex: 1,
            explanation: say('Barrukoaren deribatua 5 da: $\\frac{5}{5x+2}$.', 'La derivada de dentro es 5: $\\frac{5}{5x+2}$.', 'مشتقة ما بالداخل 5: $\\frac{5}{5x+2}$.', 'The derivative of the inside is 5: $\\frac{5}{5x+2}$.')
        }
    },

    /* ---------- 3. Growth and extremes ---------- */
    'sign-intervals': {
        mistake: {
            wrong: say('$f(-3)<0$ denez, funtzioa beherakorra da $x=-3$ puntuan.', 'Como $f(-3)<0$, la función decrece en $x=-3$.', 'بما أن $f(-3)<0$ فالدالة متناقصة عند $x=-3$.', 'Since $f(-3)<0$, the function decreases at $x=-3$.'),
            right: say('Hazkundea $f\'$ deribatuaren zeinuak ematen du, ez $f$ funtzioarenak: $f\'(-3)=15>0$, gorakorra da.', 'El crecimiento lo da el signo de $f\'$, no el de $f$: $f\'(-3)=15>0$, crece.', 'يحدد التزايدَ إشارةُ $f\'$ لا إشارة $f$: $f\'(-3)=15>0$، فهي متزايدة.', 'Growth is given by the sign of $f\'$, not of $f$: $f\'(-3)=15>0$, it grows.')
        },
        check: {
            prompt: say('Non da beherakorra $f(x)=x^2-6x$?', '¿Dónde decrece $f(x)=x^2-6x$?', 'أين تتناقص $f(x)=x^2-6x$؟', 'Where does $f(x)=x^2-6x$ decrease?'),
            options: [same('$(-\\infty,3)$'), same('$(3,+\\infty)$'), same('$(0,6)$')],
            correctIndex: 0,
            explanation: same('$f\'(x)=2x-6<0\\ \\to\\ x<3$')
        }
    },
    'singular-points': {
        mistake: {
            wrong: say('$f\'(a)=0$ denez, $a$ puntuan maximo bat edo minimo bat dago.', '$f\'(a)=0$, así que en $a$ hay un máximo o un mínimo.', '$f\'(a)=0$، إذن عند $a$ قيمة عظمى أو صغرى.', '$f\'(a)=0$, so there is a maximum or a minimum at $a$.'),
            right: say('$f\'$ deribatuaren zeinua begiratu behar da: $x^3$ funtzioan, $f\'(0)=0$ da eta ez dago muturrik.', 'Hay que mirar el signo de $f\'$: en $x^3$, $f\'(0)=0$ y no hay extremo.', 'يجب النظر إلى إشارة $f\'$: في $x^3$ يكون $f\'(0)=0$ ولا توجد قيمة قصوى.', 'You must look at the sign of $f\'$: in $x^3$, $f\'(0)=0$ and there is no extreme.')
        },
        check: {
            prompt: say('Zein $x$ baliotan du minimoa $f(x)=x^2-10x+4$ funtzioak?', '¿En qué $x$ tiene un mínimo $f(x)=x^2-10x+4$?', 'عند أي $x$ تكون لـ $f(x)=x^2-10x+4$ قيمة صغرى؟', 'At which $x$ does $f(x)=x^2-10x+4$ have a minimum?'),
            options: [same('$x=10$'), same('$x=5$'), same('$x=-5$')],
            correctIndex: 1,
            explanation: same('$2x-10=0\\ \\to\\ x=5$')
        }
    },
    'extreme-coefficients': {
        mistake: {
            wrong: say('$(3,-2)$ puntuan minimoa: $f(3)=0$.', 'Mínimo en $(3,-2)$: $f(3)=0$.', 'قيمة صغرى عند $(3,-2)$: $f(3)=0$.', 'Minimum at $(3,-2)$: $f(3)=0$.'),
            right: say('0 balio duena deribatua da, $f\'(3)=0$; $f(3)=-2$ altuera da.', 'Lo que vale 0 es la derivada, $f\'(3)=0$; $f(3)=-2$ es la altura.', 'الذي يساوي 0 هو المشتقة $f\'(3)=0$؛ و$f(3)=-2$ هو الارتفاع.', 'What is 0 is the derivative, $f\'(3)=0$; $f(3)=-2$ is the height.')
        },
        check: {
            prompt: say('Zer $a$ baliok ematen dio mutur bat $f(x)=x^2+ax$ funtzioari $x=4$ puntuan?', '¿Qué $a$ hace que $f(x)=x^2+ax$ tenga un extremo en $x=4$?', 'ما قيمة $a$ التي تجعل لـ $f(x)=x^2+ax$ قيمة قصوى عند $x=4$؟', 'Which $a$ gives $f(x)=x^2+ax$ an extreme at $x=4$?'),
            options: [same('$a=-8$'), same('$a=8$'), same('$a=-4$')],
            correctIndex: 0,
            explanation: same('$f\'(4)=8+a=0\\ \\to\\ a=-8$')
        }
    },

    /* ---------- 4. Optimisation ---------- */
    'max-profit': {
        mistake: {
            wrong: say('Mozkina maximoa da kostua minimoa den lekuan.', 'El beneficio es máximo donde el coste es mínimo.', 'يكون الربح أعظميًّا حيث تكون التكلفة أصغرية.', 'The profit is greatest where the cost is least.'),
            right: say('$B=I-C$ deribatu behar da: kosturik txikienak diru-sarrera gutxi eman dezake.', 'Hay que derivar $B=I-C$: el coste más bajo puede dar poco ingreso.', 'يجب اشتقاق $B=I-C$: قد تعطي أقل تكلفة إيرادًا قليلًا.', 'You must differentiate $B=I-C$: the lowest cost may bring little revenue.')
        },
        check: {
            prompt: say('$B(x)=-x^2+30x-50$ bada, zenbat unitatek ($x$) ematen dute mozkin maximoa?', 'Si $B(x)=-x^2+30x-50$, ¿cuántas unidades $x$ dan el beneficio máximo?', 'إذا كان $B(x)=-x^2+30x-50$، فكم وحدة $x$ تعطي الربح الأعظم؟', 'If $B(x)=-x^2+30x-50$, how many units $x$ give the greatest profit?'),
            options: [same('$30$'), same('$15$'), same('$175$')],
            correctIndex: 1,
            explanation: same('$-2x+30=0\\ \\to\\ x=15$')
        }
    },
    optimize: {
        mistake: {
            wrong: say('Bi aldagai daudenean, biak deribatzen dira aldi berean.', 'Con dos variables, se derivan las dos a la vez.', 'مع متغيرين نشتقهما معًا.', 'With two variables, you differentiate both at once.'),
            right: say('Lehenik baldintza erabiltzen da, aldagai bakarra uzteko.', 'Primero se usa la condición para dejar una sola variable.', 'نستعمل الشرط أولًا لإبقاء متغير واحد.', 'First use the condition to leave a single variable.')
        },
        check: {
            prompt: say('60 m hesirekin laukizuzen bat ixten da horma baten ondoan (hiru alde bakarrik). Zenbat neurtzen du hormaren paraleloak den aldeak, azalera maximoa izateko?', 'Con 60 m de valla se cerca un rectángulo junto a un muro (solo tres lados). ¿Cuánto mide el lado paralelo al muro para que el área sea máxima?', 'نسيّج مستطيلًا بجانب جدار بسياج طوله 60 م (ثلاثة أضلاع فقط). كم طول الضلع الموازي للجدار لتكون المساحة أعظمية؟', 'With 60 m of fence you close a rectangle next to a wall (three sides only). How long is the side parallel to the wall for the greatest area?'),
            options: [same('$30$'), same('$15$'), same('$20$')],
            correctIndex: 0,
            explanation: same('$A(y)=(60-2y)\\cdot y\\qquad 60-4y=0\\ \\to\\ y=15\\qquad 60-2\\cdot 15=30$')
        }
    },
    'interval-extremes': {
        mistake: {
            wrong: say('$f\'(x)=0$ den lekuak bakarrik begiratu behar dira.', 'Solo hay que mirar donde $f\'(x)=0$.', 'يكفي النظر حيث $f\'(x)=0$.', 'You only need to look where $f\'(x)=0$.'),
            right: say('Ertzak ere hautagaiak dira: maximoa haietako batean egon daiteke.', 'Los bordes también son candidatos: el máximo puede estar en uno.', 'الطرفان مرشحان أيضًا: قد تكون القيمة العظمى عند أحدهما.', 'The borders are candidates too: the maximum can be at one.')
        },
        check: {
            prompt: say('Zein da $f(x)=-x^2+2x$ funtzioaren maximoa $[0,4]$ tartean?', '¿Cuál es el máximo de $f(x)=-x^2+2x$ en $[0,4]$?', 'ما القيمة العظمى لـ $f(x)=-x^2+2x$ في $[0,4]$؟', 'What is the maximum of $f(x)=-x^2+2x$ on $[0,4]$?'),
            options: [same('$1$'), same('$0$'), same('$-8$')],
            correctIndex: 0,
            explanation: same('$f(0)=0\\qquad f(1)=1\\qquad f(4)=-8$')
        }
    },

    /* ---------- 5. Graphs ---------- */
    'polynomial-graph': {
        mistake: {
            wrong: say('$x^3-3x^2$ funtzioak minimoa du $x=0$ puntuan.', '$x^3-3x^2$ tiene un mínimo en $x=0$.', 'لـ $x^3-3x^2$ قيمة صغرى عند $x=0$.', '$x^3-3x^2$ has a minimum at $x=0$.'),
            right: say('$f\'$ deribatua $+$ izatetik $-$ izatera pasatzen da 0 puntuan: maximoa da.', '$f\'$ pasa de $+$ a $-$ en 0: es un máximo.', 'تنتقل $f\'$ من $+$ إلى $-$ عند 0: إنها قيمة عظمى.', '$f\'$ goes from $+$ to $-$ at 0: it is a maximum.')
        },
        check: {
            prompt: say('Zenbat mutur ditu $f(x)=x^3+3x$ funtzioak? Begiratu $f\'(x)$.', '¿Cuántos extremos tiene $f(x)=x^3+3x$? Mira $f\'(x)$.', 'كم قيمة قصوى لـ $f(x)=x^3+3x$؟ انظر إلى $f\'(x)$.', 'How many extremes does $f(x)=x^3+3x$ have? Look at $f\'(x)$.'),
            options: [same('$2$'), same('$0$'), same('$1$')],
            correctIndex: 1,
            explanation: say('$f\'(x)=3x^2+3>0$: beti gorakorra da.', '$f\'(x)=3x^2+3>0$: siempre crece.', '$f\'(x)=3x^2+3>0$: متزايدة دائمًا.', '$f\'(x)=3x^2+3>0$: it always grows.')
        }
    },
    'rational-graph': {
        mistake: {
            wrong: say('$f\'$ positiboa da $x=1$ zuzenaren bi aldeetan; beraz, $f$ gorakorra da $(0,2)$ tartean.', '$f\'$ es positiva a los dos lados de $x=1$, así que $f$ crece en $(0,2)$.', '$f\'$ موجبة على جانبي $x=1$، إذن $f$ متزايدة في $(0,2)$.', '$f\'$ is positive on both sides of $x=1$, so $f$ grows on $(0,2)$.'),
            right: say('$(0,1)$ eta $(1,2)$ tarteetan $f\'<0$ da: bi zatietan beherakorra, asintotak bereizita.', 'En $(0,1)$ y $(1,2)$, $f\'<0$: decrece en los dos tramos, separados por la asíntota.', 'في $(0,1)$ و$(1,2)$ تكون $f\'<0$: متناقصة في الجزأين اللذين يفصلهما المقارب.', 'On $(0,1)$ and $(1,2)$, $f\'<0$: it decreases on both parts, split by the asymptote.')
        },
        check: {
            prompt: say('Zer asintota zeihar du $f(x)=\\frac{x^2+2}{x}$ funtzioak, $x\\to\\pm\\infty$ denean?', '¿Qué asíntota oblicua tiene $f(x)=\\frac{x^2+2}{x}$ cuando $x\\to\\pm\\infty$?', 'ما المقارب المائل لـ $f(x)=\\frac{x^2+2}{x}$ عندما $x\\to\\pm\\infty$؟', 'What oblique asymptote does $f(x)=\\frac{x^2+2}{x}$ have as $x\\to\\pm\\infty$?'),
            options: [same('$y=x$'), same('$y=x+2$'), same('$y=2$')],
            correctIndex: 0,
            explanation: same('$\\frac{x^2+2}{x}=x+\\frac{2}{x}$')
        }
    },
    'derivative-graph': {
        mistake: {
            wrong: say('$f\'$ maximoa den lekuan, $f$ funtzioak maximo bat du.', 'Donde $f\'$ es máxima, $f$ tiene un máximo.', 'حيث تكون $f\'$ أعظمية تكون لـ $f$ قيمة عظمى.', 'Where $f\'$ is greatest, $f$ has a maximum.'),
            right: say('$f$ funtzioaren muturrak $f\'$ ardatza ebakitzen duen lekuan daude, ez $f\'$ maximoa den lekuan.', 'Los extremos de $f$ están donde $f\'$ corta el eje, no donde $f\'$ es máxima.', 'القيم القصوى لـ $f$ حيث تقطع $f\'$ المحور، لا حيث تكون $f\'$ أعظمية.', 'The extremes of $f$ are where $f\'$ cuts the axis, not where $f\'$ is greatest.')
        },
        check: {
            prompt: say('$f\'(x)=(x-2)(x+4)$ bada, zer du $f$ funtzioak $x=2$ puntuan?', 'Si $f\'(x)=(x-2)(x+4)$, ¿qué tiene $f$ en $x=2$?', 'إذا كانت $f\'(x)=(x-2)(x+4)$ فماذا لـ $f$ عند $x=2$؟', 'If $f\'(x)=(x-2)(x+4)$, what does $f$ have at $x=2$?'),
            options: [say('Maximo bat', 'Un máximo', 'قيمة عظمى', 'A maximum'), say('Minimo bat', 'Un mínimo', 'قيمة صغرى', 'A minimum'), say('Ez du muturrik', 'Ningún extremo', 'لا قيمة قصوى', 'No extreme')],
            correctIndex: 1,
            explanation: say('$x=2$ baino lehen $f\'<0$ da, eta gero $f\'>0$: minimoa.', 'Antes de $x=2$, $f\'<0$, y después, $f\'>0$: mínimo.', 'قبل $x=2$ تكون $f\'<0$ وبعدها $f\'>0$: قيمة صغرى.', 'Before $x=2$, $f\'<0$, and after, $f\'>0$: a minimum.')
        }
    }
}

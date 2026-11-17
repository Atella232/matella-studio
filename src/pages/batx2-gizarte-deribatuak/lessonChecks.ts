import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Gizarte Zientziak — the typical mistake and
   the «Check it» question of every lesson. One wrong answer of each
   question is the lesson's typical mistake: the rate without dividing,
   the units the wrong way round, h left in the limit, f'(a) as f(a), a
   corner taken as differentiable, (uv)' = u'v', the inside forgotten,
   (ln u)' = 1/u, the joint with one condition, the average cost taken
   for the marginal one.
   ========================================================================== */

export type Bach2gDerivativesTopicId =
    | 'average-rate' | 'rate-context' | 'instant'
    | 'definition' | 'tangent' | 'derivable'
    | 'powers' | 'product-quotient' | 'derivative-graph'
    | 'chain-power' | 'chain-exp' | 'chain-log'
    | 'higher' | 'smooth-join' | 'marginal'

export const bach2gDerivativesLessonChecks: Record<Bach2gDerivativesTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'average-rate': {
        mistake: {
            wrong: say('$f(x)=x^2$ funtzioaren T.V.M. $[1,3]$ tartean $f(3)-f(1)=8$ da.', 'La T.V.M. de $f(x)=x^2$ en $[1,3]$ es $f(3)-f(1)=8$.', 'معدل التغير المتوسط للدالة $f(x)=x^2$ في $[1,3]$ هو $f(3)-f(1)=8$.', 'The average rate of $f(x)=x^2$ on $[1,3]$ is $f(3)-f(1)=8$.'),
            right: say('Aldaketa tartearen luzeraz zatitu behar da: $\\frac{8}{3-1}=4$.', 'Hay que dividir el cambio entre la longitud del intervalo: $\\frac{8}{3-1}=4$.', 'يجب قسمة التغير على طول الفترة: $\\frac{8}{3-1}=4$.', 'The change must be divided by the length of the interval: $\\frac{8}{3-1}=4$.')
        },
        check: {
            prompt: say('Zein da $f(x)=2x^2$ funtzioaren T.V.M. $[0,5]$ tartean?', '¿Cuál es la T.V.M. de $f(x)=2x^2$ en $[0,5]$?', 'ما معدل التغير المتوسط للدالة $f(x)=2x^2$ في $[0,5]$؟', 'What is the average rate of $f(x)=2x^2$ on $[0,5]$?'),
            options: [same('$50$'), same('$10$'), same('$20$')],
            correctIndex: 1,
            explanation: same('$\\frac{50-0}{5-0}=10$')
        }
    },
    'rate-context': {
        mistake: {
            wrong: say('Kostua 100 eurotik 400 eurora igotzen bada 50 unitatetik 80 unitatera, T.V.M. $\\frac{30}{300}$ da.', 'Si el coste pasa de 100 € a 400 € al pasar de 50 a 80 unidades, la T.V.M. es $\\frac{30}{300}$.', 'إذا انتقلت التكلفة من 100 € إلى 400 € عند الانتقال من 50 إلى 80 وحدة، فمعدل التغير المتوسط $\\frac{30}{300}$.', 'If the cost goes from €100 to €400 as production goes from 50 to 80 units, the average rate is $\\frac{30}{300}$.'),
            right: say('Goian $f$ funtzioaren aldaketa eta behean $x$ aldagaiarena: $\\frac{300}{30}=10$ euro unitateko.', 'Arriba el cambio de $f$ y abajo el de $x$: $\\frac{300}{30}=10$ € por unidad.', 'في البسط تغير $f$ وفي المقام تغير $x$: ‏$\\frac{300}{30}=10$ € لكل وحدة.', 'On top the change of $f$ and below that of $x$: $\\frac{300}{30}=10$ euros per unit.')
        },
        check: {
            prompt: say('Herri batek 12 mila biztanle zituen, eta 4 urte geroago 10 mila. Zein da T.V.M.?', 'Un pueblo tenía 12 mil habitantes y, 4 años después, 10 mil. ¿Cuál es la T.V.M.?', 'كان في بلدة 12 ألف ساكن، وبعد 4 سنوات صار 10 آلاف. ما معدل التغير المتوسط؟', 'A town had 12 thousand inhabitants and, 4 years later, 10 thousand. What is the average rate?'),
            options: [say('$-0{,}5$ mila urtean', '$-0{,}5$ miles al año', '$-0{,}5$ ألف في السنة', '$-0{,}5$ thousand a year'), say('$-2$ mila urtean', '$-2$ miles al año', '$-2$ ألف في السنة', '$-2$ thousand a year'), say('$0{,}5$ mila urtean', '$0{,}5$ miles al año', '$0{,}5$ ألف في السنة', '$0{,}5$ thousand a year')],
            correctIndex: 0,
            explanation: same('$\\frac{10-12}{4}=-0{,}5$')
        }
    },
    instant: {
        mistake: {
            wrong: say('$[1,1+h]$ tartean T.V.M. $4+h$ bada, tasa unekoa $4+h$ da.', 'Si la T.V.M. en $[1,1+h]$ es $4+h$, la tasa instantánea es $4+h$.', 'إذا كان معدل التغير المتوسط في $[1,1+h]$ هو $4+h$ فالمعدل اللحظي $4+h$.', 'If the average rate on $[1,1+h]$ is $4+h$, the instantaneous rate is $4+h$.'),
            right: say('Limitea hartu behar da $h\\to 0$ denean: tasa unekoa 4 da.', 'Hay que tomar el límite cuando $h\\to 0$: la tasa instantánea es 4.', 'يجب أخذ النهاية عندما $h\\to 0$: المعدل اللحظي 4.', 'You must take the limit as $h\\to 0$: the instantaneous rate is 4.')
        },
        check: {
            prompt: say('$[2,2+h]$ tarteko T.V.M. $9-3h$ bada, zein da tasa unekoa $t=2$ puntuan?', 'Si la T.V.M. en $[2,2+h]$ es $9-3h$, ¿cuál es la tasa instantánea en $t=2$?', 'إذا كان معدل التغير المتوسط في $[2,2+h]$ هو $9-3h$ فما المعدل اللحظي عند $t=2$؟', 'If the average rate on $[2,2+h]$ is $9-3h$, what is the instantaneous rate at $t=2$?'),
            options: [same('$6$'), same('$9-3h$'), same('$9$')],
            correctIndex: 2,
            explanation: same('$\\lim_{h\\to 0}(9-3h)=9$')
        }
    },
    definition: {
        mistake: {
            wrong: say('$f(x)=x^2$ bada, $f\'(3)=f(3)=9$.', 'Si $f(x)=x^2$, $f\'(3)=f(3)=9$.', 'إذا كانت $f(x)=x^2$ فإن $f\'(3)=f(3)=9$.', 'If $f(x)=x^2$, $f\'(3)=f(3)=9$.'),
            right: say('$f\'(3)$ malda da, ez altuera: $\\frac{(3+h)^2-9}{h}=6+h\\to 6$.', '$f\'(3)$ es la pendiente, no la altura: $\\frac{(3+h)^2-9}{h}=6+h\\to 6$.', '$f\'(3)$ هي الميل لا الارتفاع: $\\frac{(3+h)^2-9}{h}=6+h\\to 6$.', '$f\'(3)$ is the slope, not the height: $\\frac{(3+h)^2-9}{h}=6+h\\to 6$.')
        },
        check: {
            prompt: say('$f(x)=x^2+4x$ bada, zenbat da $f\'(1)$?', 'Si $f(x)=x^2+4x$, ¿cuánto vale $f\'(1)$?', 'إذا كانت $f(x)=x^2+4x$ فكم تساوي $f\'(1)$؟', 'If $f(x)=x^2+4x$, what is $f\'(1)$?'),
            options: [same('$5$'), same('$6$'), same('$2$')],
            correctIndex: 1,
            explanation: same('$\\frac{(1+h)^2+4(1+h)-5}{h}=6+h\\ \\to\\ 6$')
        }
    },
    tangent: {
        mistake: {
            wrong: say('$f(x)=x^2$ kurbaren zuzen ukitzailea $x=2$ puntuan $y=2x$ da.', 'La tangente a $f(x)=x^2$ en $x=2$ es $y=2x$.', 'مماس $f(x)=x^2$ عند $x=2$ هو $y=2x$.', 'The tangent to $f(x)=x^2$ at $x=2$ is $y=2x$.'),
            right: say('Malda ez da $f\'(x)=2x$, $f\'(2)=4$ baizik: $y-4=4(x-2)$, hau da, $y=4x-4$.', 'La pendiente no es $f\'(x)=2x$, sino $f\'(2)=4$: $y-4=4(x-2)$, es decir, $y=4x-4$.', 'الميل ليس $f\'(x)=2x$ بل $f\'(2)=4$: ‏$y-4=4(x-2)$ أي $y=4x-4$.', 'The slope is not $f\'(x)=2x$ but $f\'(2)=4$: $y-4=4(x-2)$, that is, $y=4x-4$.')
        },
        check: {
            prompt: say('Zein da $f(x)=x^2+1$ kurbaren zuzen ukitzailea $x=1$ puntuan?', '¿Cuál es la tangente a $f(x)=x^2+1$ en $x=1$?', 'ما مماس $f(x)=x^2+1$ عند $x=1$؟', 'What is the tangent to $f(x)=x^2+1$ at $x=1$?'),
            options: [same('$y=2x+1$'), same('$y=2x$'), same('$y=x+1$')],
            correctIndex: 1,
            explanation: same("$f(1)=2\\qquad f'(1)=2\\qquad y-2=2(x-1)$")
        }
    },
    derivable: {
        mistake: {
            wrong: say('Funtzio bat jarraitua bada, deribagarria da.', 'Si una función es continua, es derivable.', 'إذا كانت الدالة متصلة فهي قابلة للاشتقاق.', 'If a function is continuous, it is differentiable.'),
            right: say('Ez beti: $|x|$ jarraitua da $x=0$ puntuan, baina punta bat du (maldak $-1$ eta 1).', 'No siempre: $|x|$ es continua en $x=0$, pero tiene un pico (pendientes $-1$ y 1).', 'ليس دائمًا: $|x|$ متصلة عند $x=0$ لكن لها زاوية (ميلان $-1$ و1).', 'Not always: $|x|$ is continuous at $x=0$, but has a corner (slopes $-1$ and 1).')
        },
        check: {
            prompt: say('Funtzio jarraitu batek $f\'(4^-)=5$ eta $f\'(4^+)=5$ ditu. Deribagarria al da $x=4$ puntuan?', 'Una función continua tiene $f\'(4^-)=5$ y $f\'(4^+)=5$. ¿Es derivable en $x=4$?', 'لدالة متصلة $f\'(4^-)=5$ و$f\'(4^+)=5$. هل هي قابلة للاشتقاق عند $x=4$؟', 'A continuous function has $f\'(4^-)=5$ and $f\'(4^+)=5$. Is it differentiable at $x=4$?'),
            options: [say('Ez, zatika delako', 'No, porque es a trozos', 'لا، لأنها متعددة الأجزاء', 'No, because it is piecewise'), say('Ez dakigu', 'No se sabe', 'لا يمكن معرفة ذلك', 'It cannot be known'), say('Bai, $f\'(4)=5$', 'Sí, $f\'(4)=5$', 'نعم، $f\'(4)=5$', 'Yes, $f\'(4)=5$')],
            correctIndex: 2,
            explanation: say('Jarraitua da eta alboko deribatuak berdinak: deribagarria.', 'Es continua y las laterales coinciden: derivable.', 'متصلة والمشتقتان الجانبيتان متساويتان: قابلة للاشتقاق.', 'It is continuous and the one-sided derivatives agree: differentiable.')
        }
    },
    powers: {
        mistake: {
            wrong: same("$\\left(\\frac{1}{x^3}\\right)'=\\frac{1}{3x^2}$"),
            right: say('Idatzi $x^{-3}$: deribatua $-3x^{-4}=-\\frac{3}{x^4}$ da.', 'Escribe $x^{-3}$: la derivada es $-3x^{-4}=-\\frac{3}{x^4}$.', 'اكتب $x^{-3}$: المشتقة $-3x^{-4}=-\\frac{3}{x^4}$.', 'Write $x^{-3}$: the derivative is $-3x^{-4}=-\\frac{3}{x^4}$.')
        },
        check: {
            prompt: say('Zein da $f(x)=2\\sqrt{x}$ funtzioaren deribatua?', '¿Cuál es la derivada de $f(x)=2\\sqrt{x}$?', 'ما مشتقة $f(x)=2\\sqrt{x}$؟', 'What is the derivative of $f(x)=2\\sqrt{x}$?'),
            options: [same('$\\frac{1}{\\sqrt{x}}$'), same('$\\frac{1}{2\\sqrt{x}}$'), same('$2\\sqrt{x}$')],
            correctIndex: 0,
            explanation: same('$2\\cdot\\frac{1}{2}x^{-\\frac{1}{2}}=\\frac{1}{\\sqrt{x}}$')
        }
    },
    'product-quotient': {
        mistake: {
            wrong: same("$\\left(x^2\\cdot x^3\\right)'=2x\\cdot 3x^2$"),
            right: say('Biderkaduraren deribatua ez da deribatuen biderkadura: $2x\\cdot x^3+x^2\\cdot 3x^2=5x^4$.', 'La derivada del producto no es el producto de las derivadas: $2x\\cdot x^3+x^2\\cdot 3x^2=5x^4$.', 'مشتقة الجداء ليست جداء المشتقتين: $2x\\cdot x^3+x^2\\cdot 3x^2=5x^4$.', 'The derivative of a product is not the product of the derivatives: $2x\\cdot x^3+x^2\\cdot 3x^2=5x^4$.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\frac{x}{x+2}$ funtzioaren deribatua?', '¿Cuál es la derivada de $f(x)=\\frac{x}{x+2}$?', 'ما مشتقة $f(x)=\\frac{x}{x+2}$؟', 'What is the derivative of $f(x)=\\frac{x}{x+2}$?'),
            options: [same('$\\frac{2}{(x+2)^2}$'), same('$1$'), same('$\\frac{-2}{(x+2)^2}$')],
            correctIndex: 0,
            explanation: same('$\\frac{1\\cdot(x+2)-x\\cdot 1}{(x+2)^2}=\\frac{2}{(x+2)^2}$')
        }
    },
    'derivative-graph': {
        mistake: {
            wrong: say('$f\'(x)<0$ bada, $f(x)$ negatiboa da.', 'Si $f\'(x)<0$, $f(x)$ es negativa.', 'إذا كانت $f\'(x)<0$ فإن $f(x)$ سالبة.', 'If $f\'(x)<0$, $f(x)$ is negative.'),
            right: say('$f\'<0$ bada, $f$ jaisten ari da, baina ardatzaren gainean egon daiteke (irabazi positiboak gutxitzen).', 'Si $f\'<0$, $f$ está bajando, pero puede estar por encima del eje (beneficios positivos que disminuyen).', 'إذا كانت $f\'<0$ فإن $f$ تتناقص لكنها قد تكون فوق المحور (أرباح موجبة تتناقص).', 'If $f\'<0$, $f$ is falling, but it can be above the axis (positive profits that are shrinking).')
        },
        check: {
            prompt: say('Irabazia $B(x)=-x^2+12x$ bada, zein $x$ baliotarako hazten da?', 'Si el beneficio es $B(x)=-x^2+12x$, ¿para qué $x$ crece?', 'إذا كان الربح $B(x)=-x^2+12x$ فلأي قيم $x$ يتزايد؟', 'If the profit is $B(x)=-x^2+12x$, for which $x$ does it grow?'),
            options: [same('$x>6$'), same('$x<12$'), same('$x<6$')],
            correctIndex: 2,
            explanation: same("$B'(x)=-2x+12>0\\ \\to\\ x<6$")
        }
    },
    'chain-power': {
        mistake: {
            wrong: same("$\\left((x^2+1)^3\\right)'=3(x^2+1)^2$"),
            right: say('Barrukoaren deribatua falta da: $3(x^2+1)^2\\cdot 2x=6x(x^2+1)^2$.', 'Falta la derivada de dentro: $3(x^2+1)^2\\cdot 2x=6x(x^2+1)^2$.', 'تنقص مشتقة الداخل: $3(x^2+1)^2\\cdot 2x=6x(x^2+1)^2$.', 'The derivative of the inside is missing: $3(x^2+1)^2\\cdot 2x=6x(x^2+1)^2$.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\sqrt{x^2+9}$ funtzioaren deribatua?', '¿Cuál es la derivada de $f(x)=\\sqrt{x^2+9}$?', 'ما مشتقة $f(x)=\\sqrt{x^2+9}$؟', 'What is the derivative of $f(x)=\\sqrt{x^2+9}$?'),
            options: [same('$\\frac{1}{2\\sqrt{x^2+9}}$'), same('$\\frac{x}{\\sqrt{x^2+9}}$'), same('$\\frac{2x}{\\sqrt{x^2+9}}$')],
            correctIndex: 1,
            explanation: same('$\\frac{2x}{2\\sqrt{x^2+9}}=\\frac{x}{\\sqrt{x^2+9}}$')
        }
    },
    'chain-exp': {
        mistake: {
            wrong: same("$\\left(e^{5x}\\right)'=e^{5x}$"),
            right: say('Barrukoaren deribatuaz biderkatu behar da: $\\left(e^{5x}\\right)\'=5e^{5x}$.', 'Hay que multiplicar por la derivada de dentro: $\\left(e^{5x}\\right)\'=5e^{5x}$.', 'يجب الضرب في مشتقة الداخل: $\\left(e^{5x}\\right)\'=5e^{5x}$.', 'You must multiply by the derivative of the inside: $\\left(e^{5x}\\right)\'=5e^{5x}$.')
        },
        check: {
            prompt: say('$P(t)=50e^{0{,}2t}$ bada, zenbat da $P\'(0)$?', 'Si $P(t)=50e^{0{,}2t}$, ¿cuánto vale $P\'(0)$?', 'إذا كانت $P(t)=50e^{0{,}2t}$ فكم تساوي $P\'(0)$؟', 'If $P(t)=50e^{0{,}2t}$, what is $P\'(0)$?'),
            options: [same('$50$'), same('$10$'), same('$0{,}2$')],
            correctIndex: 1,
            explanation: same("$P'(t)=10e^{0{,}2t}\\ \\to\\ P'(0)=10$")
        }
    },
    'chain-log': {
        mistake: {
            wrong: same("$\\left(\\ln(x^2+1)\\right)'=\\frac{1}{x^2+1}$"),
            right: say('Goian barrukoaren deribatua doa: $\\frac{2x}{x^2+1}$.', 'Arriba va la derivada de dentro: $\\frac{2x}{x^2+1}$.', 'في البسط مشتقة الداخل: $\\frac{2x}{x^2+1}$.', 'The derivative of the inside goes on top: $\\frac{2x}{x^2+1}$.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\ln(4x)$ funtzioaren deribatua?', '¿Cuál es la derivada de $f(x)=\\ln(4x)$?', 'ما مشتقة $f(x)=\\ln(4x)$؟', 'What is the derivative of $f(x)=\\ln(4x)$?'),
            options: [same('$\\frac{4}{x}$'), same('$\\frac{1}{4x}$'), same('$\\frac{1}{x}$')],
            correctIndex: 2,
            explanation: same('$\\frac{4}{4x}=\\frac{1}{x}$')
        }
    },
    higher: {
        mistake: {
            wrong: say('$f\'\'(x)$ lortzeko, $f\'(x)$ karratura berretzen da.', 'Para obtener $f\'\'(x)$, se eleva $f\'(x)$ al cuadrado.', 'للحصول على $f\'\'(x)$ نربّع $f\'(x)$.', 'To get $f\'\'(x)$, you square $f\'(x)$.'),
            right: say('$f\'\'$ deribatuaren deribatua da: $f\'(x)=3x^2$ bada, $f\'\'(x)=6x$.', '$f\'\'$ es la derivada de la derivada: si $f\'(x)=3x^2$, $f\'\'(x)=6x$.', '$f\'\'$ هي مشتقة المشتقة: إذا كانت $f\'(x)=3x^2$ فإن $f\'\'(x)=6x$.', '$f\'\'$ is the derivative of the derivative: if $f\'(x)=3x^2$, $f\'\'(x)=6x$.')
        },
        check: {
            prompt: say('$f(x)=x^3-5x^2$ bada, zenbat da $f\'\'(2)$?', 'Si $f(x)=x^3-5x^2$, ¿cuánto vale $f\'\'(2)$?', 'إذا كانت $f(x)=x^3-5x^2$ فكم تساوي $f\'\'(2)$؟', 'If $f(x)=x^3-5x^2$, what is $f\'\'(2)$?'),
            options: [same('$2$'), same('$-8$'), same('$-12$')],
            correctIndex: 0,
            explanation: same("$f''(x)=6x-10\\ \\to\\ f''(2)=2$")
        }
    },
    'smooth-join': {
        mistake: {
            wrong: say('Deribagarria izateko, nahikoa da bi zatiek balio bera izatea lotunean.', 'Para que sea derivable basta con que los dos trozos valgan lo mismo en la unión.', 'لتكون قابلة للاشتقاق يكفي أن يتساوى الجزآن عند الالتقاء.', 'For it to be differentiable, it is enough that both pieces give the same at the joint.'),
            right: say('Hori jarraitutasuna da. Malda bera ere behar da: bi baldintza, bi ekuazio.', 'Eso es la continuidad. También hace falta la misma pendiente: dos condiciones, dos ecuaciones.', 'هذا هو الاتصال. ويلزم أيضًا الميل نفسه: شرطان ومعادلتان.', 'That is continuity. The same slope is needed too: two conditions, two equations.')
        },
        check: {
            prompt: say('$f(x)=\\begin{cases}x^2 & x\\le 3\\\\ ax+b & x>3\\end{cases}$ deribagarria da. Zenbat da $a$?', '$f(x)=\\begin{cases}x^2 & x\\le 3\\\\ ax+b & x>3\\end{cases}$ es derivable. ¿Cuánto vale $a$?', '$f(x)=\\begin{cases}x^2 & x\\le 3\\\\ ax+b & x>3\\end{cases}$ قابلة للاشتقاق. كم تساوي $a$؟', '$f(x)=\\begin{cases}x^2 & x\\le 3\\\\ ax+b & x>3\\end{cases}$ is differentiable. What is $a$?'),
            options: [same('$9$'), same('$6$'), same('$3$')],
            correctIndex: 1,
            explanation: same('$2\\cdot 3=a\\ \\to\\ a=6$')
        }
    },
    marginal: {
        mistake: {
            wrong: say('Hurrengo unitatearen kostua batez besteko kostua da, $\\frac{C(x)}{x}$.', 'Lo que cuesta la unidad siguiente es el coste medio, $\\frac{C(x)}{x}$.', 'تكلفة الوحدة التالية هي متوسط التكلفة $\\frac{C(x)}{x}$.', 'What the next unit costs is the average cost, $\\frac{C(x)}{x}$.'),
            right: say('Batez bestekoak kostu finkoa ere banatzen du. Hurrengo unitatearena $C\'(x)$ da, gutxi gorabehera.', 'El medio también reparte el coste fijo. Lo de la unidad siguiente es $C\'(x)$, más o menos.', 'المتوسط يوزع التكلفة الثابتة أيضًا. أما تكلفة الوحدة التالية فهي تقريبًا $C\'(x)$.', 'The average also shares out the fixed cost. The next unit costs about $C\'(x)$.')
        },
        check: {
            prompt: say('$C(x)=x^2+5x+400$ euro bada, zenbat kostatzen da gutxi gorabehera 11. unitatea?', 'Si $C(x)=x^2+5x+400$ euros, ¿cuánto cuesta más o menos la unidad 11?', 'إذا كانت $C(x)=x^2+5x+400$ يورو، فكم تكلّف تقريبًا الوحدة 11؟', 'If $C(x)=x^2+5x+400$ euros, roughly what does unit 11 cost?'),
            options: [say('55 euro', '55 €', '55 €', '€55'), say('25 euro', '25 €', '25 €', '€25'), say('15 euro', '15 €', '15 €', '€15')],
            correctIndex: 1,
            explanation: same("$C'(x)=2x+5\\ \\to\\ C'(10)=25$")
        }
    }
}

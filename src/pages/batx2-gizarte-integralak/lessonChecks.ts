import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Integralak · Batxilergoa 2 · Gizarte Zientziak — the typical mistake and
   the «Check it» question of every lesson. One wrong answer of each
   question is the lesson's typical mistake: the + C forgotten, the
   exponent raised without dividing, 1/x integrated as a power, the inside
   derivative left in, (ln u)′ forgotten, C not worked out, the rectangles
   with the wrong width, Barrow the wrong way round, an area that comes
   out negative, the bottom curve on top, the fixed cost left out.
   ========================================================================== */

export type Bach2gIntegralsTopicId =
    | 'primitive' | 'powers' | 'exp-log'
    | 'power-chain' | 'log-exp-chain' | 'condition'
    | 'rectangles' | 'barrow' | 'properties'
    | 'area-axis' | 'area-sign' | 'between'
    | 'cost-from-marginal' | 'accumulated' | 'income-from-marginal'

export const bach2gIntegralsLessonChecks: Record<Bach2gIntegralsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    primitive: {
        mistake: {
            wrong: say('$\\int 2x\\,dx=x^2$, eta ez dago beste jatorrizkorik.', '$\\int 2x\\,dx=x^2$, y no hay otra primitiva.', '$\\int 2x\\,dx=x^2$ ولا توجد دالة أصلية أخرى.', '$\\int 2x\\,dx=x^2$, and there is no other antiderivative.'),
            right: say('$x^2+1$, $x^2-7$… guztiek $2x$ deribatua dute: $\\int 2x\\,dx=x^2+C$.', '$x^2+1$, $x^2-7$… todas tienen derivada $2x$: $\\int 2x\\,dx=x^2+C$.', '$x^2+1$ و$x^2-7$… كلها مشتقتها $2x$: $\\int 2x\\,dx=x^2+C$.', '$x^2+1$, $x^2-7$… all have derivative $2x$: $\\int 2x\\,dx=x^2+C$.')
        },
        check: {
            prompt: say('Zein da $f(x)=4x^3$ funtzioaren jatorrizko bat?', '¿Cuál es una primitiva de $f(x)=4x^3$?', 'ما دالة أصلية لـ $f(x)=4x^3$؟', 'Which is an antiderivative of $f(x)=4x^3$?'),
            options: [same('$12x^2$'), same('$x^4+3$'), same('$4x^4$')],
            correctIndex: 1,
            explanation: same("$(x^4+3)'=4x^3$")
        }
    },
    powers: {
        mistake: {
            wrong: say('$\\int x^4\\,dx=x^5+C$.', '$\\int x^4\\,dx=x^5+C$.', '$\\int x^4\\,dx=x^5+C$.', '$\\int x^4\\,dx=x^5+C$.'),
            right: say('Berretzaile berriaz zatitu behar da: $\\frac{x^5}{5}+C$.', 'Hay que dividir entre el nuevo exponente: $\\frac{x^5}{5}+C$.', 'يجب القسمة على الأس الجديد: $\\frac{x^5}{5}+C$.', 'You must divide by the new exponent: $\\frac{x^5}{5}+C$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int(8x^3-6x)\\,dx$.', 'Calcula $\\int(8x^3-6x)\\,dx$.', 'احسب $\\int(8x^3-6x)\\,dx$.', 'Work out $\\int(8x^3-6x)\\,dx$.'),
            options: [same('$24x^2-6+C$'), same('$8x^4-6x^2+C$'), same('$2x^4-3x^2+C$')],
            correctIndex: 2,
            explanation: same('$8\\cdot\\frac{x^4}{4}-6\\cdot\\frac{x^2}{2}=2x^4-3x^2$')
        }
    },
    'exp-log': {
        mistake: {
            wrong: say('$\\int\\frac{1}{x}\\,dx=\\frac{x^0}{0}$, berreturaren erregelarekin.', '$\\int\\frac{1}{x}\\,dx=\\frac{x^0}{0}$, con la regla de la potencia.', '$\\int\\frac{1}{x}\\,dx=\\frac{x^0}{0}$ بقاعدة القوة.', '$\\int\\frac{1}{x}\\,dx=\\frac{x^0}{0}$, with the power rule.'),
            right: say('$n=-1$ denean erregelak ez du balio: $\\int\\frac{1}{x}\\,dx=\\ln|x|+C$.', 'Con $n=-1$ la regla no vale: $\\int\\frac{1}{x}\\,dx=\\ln|x|+C$.', 'مع $n=-1$ لا تصلح القاعدة: $\\int\\frac{1}{x}\\,dx=\\ln|x|+C$.', 'For $n=-1$ the rule fails: $\\int\\frac{1}{x}\\,dx=\\ln|x|+C$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int\\left(2e^{x}+\\frac{1}{x}\\right)dx$.', 'Calcula $\\int\\left(2e^{x}+\\frac{1}{x}\\right)dx$.', 'احسب $\\int\\left(2e^{x}+\\frac{1}{x}\\right)dx$.', 'Work out $\\int\\left(2e^{x}+\\frac{1}{x}\\right)dx$.'),
            options: [same('$2e^{x}+\\ln|x|+C$'), same('$2e^{x}-\\frac{1}{x^2}+C$'), same('$2xe^{x}+\\ln|x|+C$')],
            correctIndex: 0,
            explanation: same('$\\int e^{x}\\,dx=e^{x}\\qquad \\int\\frac{1}{x}\\,dx=\\ln|x|$')
        }
    },
    'power-chain': {
        mistake: {
            wrong: say('$\\int 3x^2(x^3+1)^2\\,dx=3x^2\\cdot\\frac{(x^3+1)^3}{3}+C$.', '$\\int 3x^2(x^3+1)^2\\,dx=3x^2\\cdot\\frac{(x^3+1)^3}{3}+C$.', '$\\int 3x^2(x^3+1)^2\\,dx=3x^2\\cdot\\frac{(x^3+1)^3}{3}+C$.', '$\\int 3x^2(x^3+1)^2\\,dx=3x^2\\cdot\\frac{(x^3+1)^3}{3}+C$.'),
            right: say('$3x^2$ barrukoaren deribatua da: integratzean desagertzen da, $\\frac{(x^3+1)^3}{3}+C$.', '$3x^2$ es la derivada de dentro: al integrar desaparece, $\\frac{(x^3+1)^3}{3}+C$.', '$3x^2$ مشتقة الداخل: تختفي عند التكامل، $\\frac{(x^3+1)^3}{3}+C$.', '$3x^2$ is the inside derivative: it disappears when integrating, $\\frac{(x^3+1)^3}{3}+C$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int 2(2x+1)^4\\,dx$.', 'Calcula $\\int 2(2x+1)^4\\,dx$.', 'احسب $\\int 2(2x+1)^4\\,dx$.', 'Work out $\\int 2(2x+1)^4\\,dx$.'),
            options: [same('$\\frac{2(2x+1)^5}{5}+C$'), same('$\\frac{(2x+1)^5}{5}+C$'), same('$8(2x+1)^3+C$')],
            correctIndex: 1,
            explanation: same("$(2x+1)'=2\\ \\to\\ \\frac{(2x+1)^5}{5}$")
        }
    },
    'log-exp-chain': {
        mistake: {
            wrong: say('$\\int e^{5x}\\,dx=e^{5x}+C$.', '$\\int e^{5x}\\,dx=e^{5x}+C$.', '$\\int e^{5x}\\,dx=e^{5x}+C$.', '$\\int e^{5x}\\,dx=e^{5x}+C$.'),
            right: say('Berretzailearen deribatua 5 da eta falta da: $\\frac{1}{5}e^{5x}+C$.', 'La derivada del exponente es 5 y falta: $\\frac{1}{5}e^{5x}+C$.', 'مشتقة الأس 5 وهي ناقصة: $\\frac{1}{5}e^{5x}+C$.', 'The derivative of the exponent is 5 and it is missing: $\\frac{1}{5}e^{5x}+C$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int\\frac{3x^2}{x^3+2}\\,dx$.', 'Calcula $\\int\\frac{3x^2}{x^3+2}\\,dx$.', 'احسب $\\int\\frac{3x^2}{x^3+2}\\,dx$.', 'Work out $\\int\\frac{3x^2}{x^3+2}\\,dx$.'),
            options: [same('$\\frac{1}{x^3+2}+C$'), same('$3\\ln|x^3+2|+C$'), same('$\\ln|x^3+2|+C$')],
            correctIndex: 2,
            explanation: same("$(x^3+2)'=3x^2$")
        }
    },
    condition: {
        mistake: {
            wrong: say('$F\'(x)=4x$ eta $F(1)=5$ badira, $F(x)=2x^2+5$.', 'Si $F\'(x)=4x$ y $F(1)=5$, $F(x)=2x^2+5$.', 'إذا كانت $F\'(x)=4x$ و$F(1)=5$ فإن $F(x)=2x^2+5$.', 'If $F\'(x)=4x$ and $F(1)=5$, $F(x)=2x^2+5$.'),
            right: say('$C$ ebatzi behar da, ez kopiatu: $2+C=5$, $C=3$, beraz $F(x)=2x^2+3$.', 'Hay que despejar $C$, no copiarla: $2+C=5$, $C=3$, así que $F(x)=2x^2+3$.', 'يجب استخراج $C$ لا نسخها: $2+C=5$، $C=3$، إذن $F(x)=2x^2+3$.', 'You must solve for $C$, not copy it: $2+C=5$, $C=3$, so $F(x)=2x^2+3$.')
        },
        check: {
            prompt: say('$F\'(x)=3x^2$ eta $F(2)=10$. Zenbat da $C$?', '$F\'(x)=3x^2$ y $F(2)=10$. ¿Cuánto vale $C$?', '$F\'(x)=3x^2$ و$F(2)=10$. كم تساوي $C$؟', '$F\'(x)=3x^2$ and $F(2)=10$. What is $C$?'),
            options: [same('$10$'), same('$2$'), same('$-2$')],
            correctIndex: 1,
            explanation: same('$8+C=10\\ \\to\\ C=2$')
        }
    },
    rectangles: {
        mistake: {
            wrong: say('$[0,4]$ tartean 4 laukizuzenekin, zabalera bakoitza 4 da.', 'En $[0,4]$ con 4 rectángulos, cada anchura es 4.', 'على $[0,4]$ بأربعة مستطيلات، كل عرض يساوي 4.', 'On $[0,4]$ with 4 rectangles, each width is 4.'),
            right: say('Zabalera tartearen luzera zati laukizuzenen kopurua da: $\\frac{4}{4}=1$.', 'La anchura es la longitud del intervalo entre el número de rectángulos: $\\frac{4}{4}=1$.', 'العرض هو طول الفترة على عدد المستطيلات: $\\frac{4}{4}=1$.', 'The width is the length of the interval over the number of rectangles: $\\frac{4}{4}=1$.')
        },
        check: {
            prompt: say('Laukizuzenak gero eta estuagoak badira, nora hurbiltzen da haien batura?', 'Si los rectángulos son cada vez más estrechos, ¿a qué se acerca su suma?', 'إذا ضاقت المستطيلات أكثر فأكثر فإلامَ يقترب مجموعها؟', 'If the rectangles get narrower and narrower, what does their sum approach?'),
            options: [say('Zerora', 'A cero', 'إلى الصفر', 'Zero'), say('Infinitura', 'A infinito', 'إلى اللانهاية', 'Infinity'), say('Azalera zehatzera', 'Al área exacta', 'إلى المساحة الدقيقة', 'The exact area')],
            correctIndex: 2,
            explanation: say('Limitea integral mugatua da: azalera zehatza.', 'El límite es la integral definida: el área exacta.', 'النهاية هي التكامل المحدد: المساحة الدقيقة.', 'The limit is the definite integral: the exact area.')
        }
    },
    barrow: {
        mistake: {
            wrong: say('$\\int_1^2 2x\\,dx=F(1)-F(2)=1-4=-3$.', '$\\int_1^2 2x\\,dx=F(1)-F(2)=1-4=-3$.', '$\\int_1^2 2x\\,dx=F(1)-F(2)=1-4=-3$.', '$\\int_1^2 2x\\,dx=F(1)-F(2)=1-4=-3$.'),
            right: say('Goikoa ken behekoa: $F(2)-F(1)=4-1=3$.', 'Arriba menos abajo: $F(2)-F(1)=4-1=3$.', 'العلوي ناقص السفلي: $F(2)-F(1)=4-1=3$.', 'Top minus bottom: $F(2)-F(1)=4-1=3$.')
        },
        check: {
            prompt: say('Kalkulatu $\\int_0^3(x^2+1)\\,dx$.', 'Calcula $\\int_0^3(x^2+1)\\,dx$.', 'احسب $\\int_0^3(x^2+1)\\,dx$.', 'Work out $\\int_0^3(x^2+1)\\,dx$.'),
            options: [same('$12$'), same('$10$'), same('$9$')],
            correctIndex: 0,
            explanation: same('$\\left[\\frac{x^3}{3}+x\\right]_0^3=9+3=12$')
        }
    },
    properties: {
        mistake: {
            wrong: say('$\\int_1^3 f=4$ bada, $\\int_3^1 f=4$ ere bai.', 'Si $\\int_1^3 f=4$, también $\\int_3^1 f=4$.', 'إذا كان $\\int_1^3 f=4$ فإن $\\int_3^1 f=4$ أيضًا.', 'If $\\int_1^3 f=4$, then also $\\int_3^1 f=4$.'),
            right: say('Mugak trukatzean zeinua aldatzen da: $\\int_3^1 f=-4$.', 'Al cambiar los límites cambia el signo: $\\int_3^1 f=-4$.', 'عند تبديل الحدين تتغير الإشارة: $\\int_3^1 f=-4$.', 'Swapping the limits changes the sign: $\\int_3^1 f=-4$.')
        },
        check: {
            prompt: say('$\\int_0^6 f=10$ eta $\\int_0^2 f=4$. Zenbat da $\\int_2^6 f$?', '$\\int_0^6 f=10$ y $\\int_0^2 f=4$. ¿Cuánto vale $\\int_2^6 f$?', '$\\int_0^6 f=10$ و$\\int_0^2 f=4$. كم يساوي $\\int_2^6 f$؟', '$\\int_0^6 f=10$ and $\\int_0^2 f=4$. What is $\\int_2^6 f$?'),
            options: [same('$14$'), same('$6$'), same('$-6$')],
            correctIndex: 1,
            explanation: same('$10-4=6$')
        }
    },
    'area-axis': {
        mistake: {
            wrong: say('$y=x^2$ kurbaren azpiko azalera $[0,2]$ tartean $2^2=4$ da.', 'El área bajo $y=x^2$ en $[0,2]$ es $2^2=4$.', 'المساحة تحت $y=x^2$ على $[0,2]$ هي $2^2=4$.', 'The area under $y=x^2$ on $[0,2]$ is $2^2=4$.'),
            right: say('Integratu behar da: $\\left[\\frac{x^3}{3}\\right]_0^2=\\frac{8}{3}$.', 'Hay que integrar: $\\left[\\frac{x^3}{3}\\right]_0^2=\\frac{8}{3}$.', 'يجب التكامل: $\\left[\\frac{x^3}{3}\\right]_0^2=\\frac{8}{3}$.', 'You must integrate: $\\left[\\frac{x^3}{3}\\right]_0^2=\\frac{8}{3}$.')
        },
        check: {
            prompt: say('Zein da $y=2x+2$ zuzenaren azpiko azalera $[0,2]$ tartean?', '¿Cuál es el área bajo $y=2x+2$ en $[0,2]$?', 'ما المساحة تحت $y=2x+2$ على $[0,2]$؟', 'What is the area under $y=2x+2$ on $[0,2]$?'),
            options: [same('$6$'), same('$8$'), same('$4$')],
            correctIndex: 1,
            explanation: same('$\\left[x^2+2x\\right]_0^2=4+4=8$')
        }
    },
    'area-sign': {
        mistake: {
            wrong: say('$y=x$ zuzenaren eta ardatzaren arteko azalera $[-2,2]$ tartean $\\int_{-2}^2 x\\,dx=0$ da.', 'El área entre $y=x$ y el eje en $[-2,2]$ es $\\int_{-2}^2 x\\,dx=0$.', 'المساحة بين $y=x$ والمحور على $[-2,2]$ هي $\\int_{-2}^2 x\\,dx=0$.', 'The area between $y=x$ and the axis on $[-2,2]$ is $\\int_{-2}^2 x\\,dx=0$.'),
            right: say('Zatitu $x=0$ puntuan: $2+2=4$. Integrala 0 da, baina azalera ez.', 'Parte en $x=0$: $2+2=4$. La integral es 0, pero el área no.', 'قسّم عند $x=0$: $2+2=4$. التكامل 0 لكن المساحة ليست كذلك.', 'Split at $x=0$: $2+2=4$. The integral is 0, but the area is not.')
        },
        check: {
            prompt: say('$\\int_0^3 f=-5$ eta $f$ beti negatiboa da $[0,3]$ tartean. Zenbat da azalera?', '$\\int_0^3 f=-5$ y $f$ es siempre negativa en $[0,3]$. ¿Cuánto vale el área?', '$\\int_0^3 f=-5$ و$f$ سالبة دائمًا على $[0,3]$. كم تساوي المساحة؟', '$\\int_0^3 f=-5$ and $f$ is always negative on $[0,3]$. What is the area?'),
            options: [same('$-5$'), same('$5$'), same('$0$')],
            correctIndex: 1,
            explanation: same('$A=|-5|=5$')
        }
    },
    between: {
        mistake: {
            wrong: say('$y=x$ eta $y=x^2$ kurben arteko azalera $\\int_0^1(x^2-x)\\,dx=-\\frac{1}{6}$ da.', 'El área entre $y=x$ e $y=x^2$ es $\\int_0^1(x^2-x)\\,dx=-\\frac{1}{6}$.', 'المساحة بين $y=x$ و$y=x^2$ هي $\\int_0^1(x^2-x)\\,dx=-\\frac{1}{6}$.', 'The area between $y=x$ and $y=x^2$ is $\\int_0^1(x^2-x)\\,dx=-\\frac{1}{6}$.'),
            right: say('$(0,1)$ tartean $x$ goian dago: $\\int_0^1(x-x^2)\\,dx=\\frac{1}{6}$.', 'En $(0,1)$ está arriba $x$: $\\int_0^1(x-x^2)\\,dx=\\frac{1}{6}$.', 'في $(0,1)$ يكون $x$ في الأعلى: $\\int_0^1(x-x^2)\\,dx=\\frac{1}{6}$.', 'On $(0,1)$, $x$ is on top: $\\int_0^1(x-x^2)\\,dx=\\frac{1}{6}$.')
        },
        check: {
            prompt: say('Zein da $y=2x$ eta $y=x^2$ kurben arteko azalera? Mozten dira $x=0$ eta $x=2$ puntuetan.', '¿Cuál es el área entre $y=2x$ e $y=x^2$? Se cortan en $x=0$ y $x=2$.', 'ما المساحة بين $y=2x$ و$y=x^2$؟ يتقاطعان عند $x=0$ و$x=2$.', 'What is the area between $y=2x$ and $y=x^2$? They meet at $x=0$ and $x=2$.'),
            options: [same('$\\frac{4}{3}$'), same('$-\\frac{4}{3}$'), same('$4$')],
            correctIndex: 0,
            explanation: same('$\\left[x^2-\\frac{x^3}{3}\\right]_0^2=4-\\frac{8}{3}=\\frac{4}{3}$')
        }
    },
    'cost-from-marginal': {
        mistake: {
            wrong: say('$C\'(x)=4x+6$ eta kostu finkoa 300 bada, $C(x)=2x^2+6x$.', 'Si $C\'(x)=4x+6$ y el coste fijo es 300, $C(x)=2x^2+6x$.', 'إذا كانت $C\'(x)=4x+6$ والتكلفة الثابتة 300 فإن $C(x)=2x^2+6x$.', 'If $C\'(x)=4x+6$ and the fixed cost is 300, $C(x)=2x^2+6x$.'),
            right: say('Kostu finkoa ahaztu da: $C(x)=2x^2+6x+300$.', 'Se ha olvidado el coste fijo: $C(x)=2x^2+6x+300$.', 'نُسيت التكلفة الثابتة: $C(x)=2x^2+6x+300$.', 'The fixed cost has been forgotten: $C(x)=2x^2+6x+300$.')
        },
        check: {
            prompt: say('$C\'(x)=2x+5$ eta kostu finkoa 100 euro. Zenbat da $C(10)$?', '$C\'(x)=2x+5$ y el coste fijo es 100 €. ¿Cuánto vale $C(10)$?', '$C\'(x)=2x+5$ والتكلفة الثابتة 100 €. كم تساوي $C(10)$؟', '$C\'(x)=2x+5$ and the fixed cost is €100. What is $C(10)$?'),
            options: [same('$150$'), same('$25$'), same('$250$')],
            correctIndex: 2,
            explanation: same('$C(10)=100+50+100=250$')
        }
    },
    accumulated: {
        mistake: {
            wrong: say('$v(t)=2t$ erritmoarekin, 3 hilabetetan $v(3)=6$ saltzen dira.', 'Con el ritmo $v(t)=2t$, en 3 meses se venden $v(3)=6$.', 'بالوتيرة $v(t)=2t$ يُباع في 3 أشهر $v(3)=6$.', 'With the rate $v(t)=2t$, in 3 months $v(3)=6$ are sold.'),
            right: say('$v(3)$ erritmoa da 3. hilabetean; guztira $\\int_0^3 2t\\,dt=9$.', '$v(3)$ es el ritmo en el mes 3; en total, $\\int_0^3 2t\\,dt=9$.', '$v(3)$ هي الوتيرة في الشهر 3؛ والمجموع $\\int_0^3 2t\\,dt=9$.', '$v(3)$ is the rate in month 3; in total, $\\int_0^3 2t\\,dt=9$.')
        },
        check: {
            prompt: say('Ura $q(t)=4t+1$ metro kubiko orduko sartzen da. Zenbat sartzen da lehen 2 orduetan, $\\int_0^2 q(t)\\,dt$?', 'Entra agua a $q(t)=4t+1$ metros cúbicos por hora. ¿Cuánta entra en las 2 primeras horas, $\\int_0^2 q(t)\\,dt$?', 'يدخل الماء بمعدل $q(t)=4t+1$ متر مكعب في الساعة. كم يدخل في الساعتين الأوليين $\\int_0^2 q(t)\\,dt$؟', 'Water flows in at $q(t)=4t+1$ cubic metres an hour. How much flows in during the first 2 hours, $\\int_0^2 q(t)\\,dt$?'),
            options: [same('$9$'), same('$10$'), same('$5$')],
            correctIndex: 1,
            explanation: same('$\\left[2t^2+t\\right]_0^2=8+2=10$')
        }
    },
    'income-from-marginal': {
        mistake: {
            wrong: say('$I\'(x)=50-x$ bada, 20 unitatetik 30 unitatera $I\'(30)-I\'(20)=-10$ igotzen da.', 'Si $I\'(x)=50-x$, de 20 a 30 unidades sube $I\'(30)-I\'(20)=-10$.', 'إذا كانت $I\'(x)=50-x$ فمن 20 إلى 30 وحدة يرتفع $I\'(30)-I\'(20)=-10$.', 'If $I\'(x)=50-x$, from 20 to 30 units it rises $I\'(30)-I\'(20)=-10$.'),
            right: say('$I\'$ integratu behar da: $\\int_{20}^{30}(50-x)\\,dx=250$.', 'Hay que integrar $I\'$: $\\int_{20}^{30}(50-x)\\,dx=250$.', 'يجب تكامل $I\'$: $\\int_{20}^{30}(50-x)\\,dx=250$.', 'You must integrate $I\'$: $\\int_{20}^{30}(50-x)\\,dx=250$.')
        },
        check: {
            prompt: say('$I\'(x)=80-2x$ bada, zein dira 20 unitate saltzean diru-sarrera osoak?', 'Si $I\'(x)=80-2x$, ¿cuánto se ingresa en total al vender 20 unidades?', 'إذا كانت $I\'(x)=80-2x$ فما الإيراد الكلي عند بيع 20 وحدة؟', 'If $I\'(x)=80-2x$, what is the total income when selling 20 units?'),
            options: [same('$40$'), same('$1600$'), same('$1200$')],
            correctIndex: 2,
            explanation: same('$I(20)=1600-400=1200$')
        }
    }
}

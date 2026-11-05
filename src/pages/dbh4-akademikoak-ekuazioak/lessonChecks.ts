import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Ekuazioak eta inekuazioak · 4. DBH akademikoak — the typical mistake and
   the «Check it» question of every lesson. Plain data (no JSX) so the tests
   can import it; lessons.tsx merges it into the topics. When the question is
   an equation and the answers are «x = …», tests/lesson-checks.test.ts puts
   each value into the equation; logarithms it cannot read, so those answers
   are plain numbers.
   ========================================================================== */

export type EquationsTopicId = 'quadratic-formula' | 'roots-relations' | 'quadratic-problems' | 'biquadratic' | 'factored' | 'rational' | 'radical' | 'exponential' | 'logarithmic' | 'inequalities' | 'linear-inequality' | 'inequality-problems' | 'quadratic-inequality' | 'graphic-inequality' | 'inequality-systems'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const equationsLessonChecks: Record<EquationsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'quadratic-formula': {
        mistake: {
            wrong: say('$x^{2}-3x-10=0$ ekuazioan, $x=\\frac{-3\\pm 7}{2}$.', 'En $x^{2}-3x-10=0$, $x=\\frac{-3\\pm 7}{2}$.', 'في $x^{2}-3x-10=0$، $x=\\frac{-3\\pm 7}{2}$.', 'In $x^{2}-3x-10=0$, $x=\\frac{-3\\pm 7}{2}$.'),
            right: say('Formulan $-b$ doa: $b=-3$ denez, $x=\\frac{3\\pm 7}{2}$, hau da, 5 eta $-2$.', 'En la fórmula va $-b$: con $b=-3$, $x=\\frac{3\\pm 7}{2}$, así que 5 y $-2$.', 'في الصيغة $-b$: مع $b=-3$ يكون $x=\\frac{3\\pm 7}{2}$، أي 5 و$-2$.', 'The formula has $-b$: with $b=-3$, $x=\\frac{3\\pm 7}{2}$, so 5 and $-2$.')
        },
        check: {
            prompt: say('Zenbat ebazpen ditu $x^{2}+4x+5=0$ ekuazioak?', '¿Cuántas soluciones tiene $x^{2}+4x+5=0$?', 'كم حلًا للمعادلة $x^{2}+4x+5=0$؟', 'How many solutions does $x^{2}+4x+5=0$ have?'),
            options: [say('Bi', 'Dos', 'حلان', 'Two'), say('Bat', 'Una', 'حل واحد', 'One'), say('Bat ere ez', 'Ninguna', 'لا حل', 'None')],
            correctIndex: 2,
            explanation: say('$\\Delta=16-20=-4<0$: ez dago ebazpen errealik.', '$\\Delta=16-20=-4<0$: no hay soluciones reales.', '$\\Delta=16-20=-4<0$: لا توجد حلول حقيقية.', '$\\Delta=16-20=-4<0$: there are no real solutions.')
        }
    },
    'roots-relations': {
        mistake: {
            wrong: say('$x^{2}+5x+6=0$ ekuazioaren erroen batura 5 da.', 'Las raíces de $x^{2}+5x+6=0$ suman 5.', 'مجموع جذري $x^{2}+5x+6=0$ هو 5.', 'The roots of $x^{2}+5x+6=0$ add up to 5.'),
            right: say('Batura $-\\frac{b}{a}=-5$ da: erroak $-2$ eta $-3$ dira.', 'Suman $-\\frac{b}{a}=-5$: son $-2$ y $-3$.', 'مجموعهما $-\\frac{b}{a}=-5$: هما $-2$ و$-3$.', 'They add up to $-\\frac{b}{a}=-5$: they are $-2$ and $-3$.')
        },
        check: {
            prompt: say('Zenbat da $2x^{2}-8x+6=0$ ekuazioaren erroen biderkadura?', '¿Cuánto vale el producto de las raíces de $2x^{2}-8x+6=0$?', 'ما جداء جذري $2x^{2}-8x+6=0$؟', 'What is the product of the roots of $2x^{2}-8x+6=0$?'),
            options: [same('$3$'), same('$6$'), same('$4$')],
            correctIndex: 0,
            explanation: say('$\\frac{c}{a}=\\frac{6}{2}=3$ (erroak 1 eta 3 dira).', '$\\frac{c}{a}=\\frac{6}{2}=3$ (las raíces son 1 y 3).', '$\\frac{c}{a}=\\frac{6}{2}=3$ (الجذران 1 و3).', '$\\frac{c}{a}=\\frac{6}{2}=3$ (the roots are 1 and 3).')
        }
    },
    'quadratic-problems': {
        mistake: {
            wrong: say('Laukizuzen baten altuera $-5$ cm izan daiteke, ekuazioaren ebazpena delako.', 'La altura de un rectángulo puede ser $-5$ cm, porque es solución de la ecuación.', 'يمكن أن يكون ارتفاع مستطيل $-5$ سم لأنه حل للمعادلة.', 'The height of a rectangle can be $-5$ cm, because it solves the equation.'),
            right: say('Egiaztatu beti: luzera bat ezin da negatiboa izan, beraz ebazpen hori ez da baliozkoa.', 'Comprueba siempre: una longitud no puede ser negativa, así que esa solución no vale.', 'تحقّق دائمًا: الطول لا يكون سالبًا، فهذا الحل لا يصلح.', 'Always check: a length cannot be negative, so that solution does not work.')
        },
        check: {
            prompt: say('Zenbaki bat gehi haren karratua 30 da. Zein ekuaziok ebazten du?', 'Un número más su cuadrado da 30. ¿Qué ecuación lo resuelve?', 'عدد زائد مربعه يساوي 30. ما المعادلة التي تحل المسألة؟', 'A number plus its square is 30. Which equation solves it?'),
            options: [same('$(x+x)^{2}=30$'), same('$x+x^{2}=30$'), same('$2x=30$')],
            correctIndex: 1,
            explanation: say('Zenbakia $x$ da eta haren karratua $x^{2}$: $x+x^{2}=30$, eta $x=5$ edo $x=-6$.', 'El número es $x$ y su cuadrado, $x^{2}$: $x+x^{2}=30$, con $x=5$ o $x=-6$.', 'العدد $x$ ومربعه $x^{2}$: $x+x^{2}=30$، مع $x=5$ أو $x=-6$.', 'The number is $x$ and its square $x^{2}$: $x+x^{2}=30$, with $x=5$ or $x=-6$.')
        }
    },
    biquadratic: {
        mistake: {
            wrong: say('$x^{4}-5x^{2}+4=0$ ekuazioan, $t=4$ eta $t=1$, beraz ebazpenak 4 eta 1 dira.', 'En $x^{4}-5x^{2}+4=0$, $t=4$ y $t=1$, así que las soluciones son 4 y 1.', 'في $x^{4}-5x^{2}+4=0$ يكون $t=4$ و$t=1$، إذن الحلان 4 و1.', 'In $x^{4}-5x^{2}+4=0$, $t=4$ and $t=1$, so the solutions are 4 and 1.'),
            right: say('Aldaketa desegin behar da: $x^{2}=4$ eta $x^{2}=1$, beraz $x=\\pm 2$ eta $x=\\pm 1$.', 'Hay que deshacer el cambio: $x^{2}=4$ y $x^{2}=1$, así que $x=\\pm 2$ y $x=\\pm 1$.', 'يجب الرجوع عن التعويض: $x^{2}=4$ و$x^{2}=1$، إذن $x=\\pm 2$ و$x=\\pm 1$.', 'Undo the substitution: $x^{2}=4$ and $x^{2}=1$, so $x=\\pm 2$ and $x=\\pm 1$.')
        },
        check: {
            prompt: say('Ebatzi $x^{4}-81=0$.', 'Resuelve $x^{4}-81=0$.', 'حلّ $x^{4}-81=0$.', 'Solve $x^{4}-81=0$.'),
            options: [same('$x=\\pm 9$'), same('$x=\\pm 3$'), same('$x=3$')],
            correctIndex: 1,
            explanation: say('$t=x^{2}$: $t^{2}=81$, $t=9$ (eta $t=-9$ ez da baliozkoa). $x^{2}=9$, beraz $x=\\pm 3$.', '$t=x^{2}$: $t^{2}=81$, $t=9$ ($t=-9$ no vale). $x^{2}=9$, así que $x=\\pm 3$.', '$t=x^{2}$: $t^{2}=81$، $t=9$ ($t=-9$ لا يصلح). $x^{2}=9$، إذن $x=\\pm 3$.', '$t=x^{2}$: $t^{2}=81$, $t=9$ ($t=-9$ does not work). $x^{2}=9$, so $x=\\pm 3$.')
        }
    },
    factored: {
        mistake: {
            wrong: say('$x^{2}=5x$ ekuazioan, $x$ letraz zatitzen dut eta $x=5$ geratzen da.', 'En $x^{2}=5x$, divido entre $x$ y queda $x=5$.', 'في $x^{2}=5x$ أقسم على $x$ فيبقى $x=5$.', 'In $x^{2}=5x$, I divide by $x$ and get $x=5$.'),
            right: say('$x$ letraz zatitzean ebazpen bat galtzen da: $x(x-5)=0$, beraz $x=0$ eta $x=5$.', 'Al dividir entre $x$ se pierde una solución: $x(x-5)=0$, así que $x=0$ y $x=5$.', 'بالقسمة على $x$ نفقد حلًا: $x(x-5)=0$، إذن $x=0$ و$x=5$.', 'Dividing by $x$ loses a solution: $x(x-5)=0$, so $x=0$ and $x=5$.')
        },
        check: {
            prompt: say('Ebatzi $(x-4)(x^{2}-1)=0$.', 'Resuelve $(x-4)(x^{2}-1)=0$.', 'حلّ $(x-4)(x^{2}-1)=0$.', 'Solve $(x-4)(x^{2}-1)=0$.'),
            options: [same('$x=4,\\ x=1,\\ x=-1$'), same('$x=4,\\ x=1$'), same('$x=-4,\\ x=1,\\ x=-1$')],
            correctIndex: 0,
            explanation: say('Berdindu faktore bakoitza 0: $x-4=0$ eta $x^{2}=1$.', 'Iguala cada factor a 0: $x-4=0$ y $x^{2}=1$.', 'اجعل كل عامل صفرًا: $x-4=0$ و$x^{2}=1$.', 'Set each factor to 0: $x-4=0$ and $x^{2}=1$.')
        }
    },
    rational: {
        mistake: {
            wrong: say('$\\frac{x}{x-3}=\\frac{3}{x-3}$ ekuazioaren ebazpena $x=3$ da.', 'La solución de $\\frac{x}{x-3}=\\frac{3}{x-3}$ es $x=3$.', 'حل $\\frac{x}{x-3}=\\frac{3}{x-3}$ هو $x=3$.', 'The solution of $\\frac{x}{x-3}=\\frac{3}{x-3}$ is $x=3$.'),
            right: say('$x=3$ denean izendatzailea 0 da: ekuazioak ez du ebazpenik.', 'Con $x=3$ el denominador es 0: la ecuación no tiene solución.', 'عندما $x=3$ يكون المقام 0: لا حل للمعادلة.', 'With $x=3$ the denominator is 0: the equation has no solution.')
        },
        check: {
            prompt: say('Ebatzi $\\frac{6}{x}=x-1$.', 'Resuelve $\\frac{6}{x}=x-1$.', 'حلّ $\\frac{6}{x}=x-1$.', 'Solve $\\frac{6}{x}=x-1$.'),
            options: [same('$x=3$'), same('$x=-3,\\ x=2$'), same('$x=3,\\ x=-2$')],
            correctIndex: 2,
            explanation: say('Bider $x$: $6=x^{2}-x$, $x^{2}-x-6=0$. Biak dira baliozkoak: batek ere ez du $x$ anulatzen.', 'Por $x$: $6=x^{2}-x$, $x^{2}-x-6=0$. Las dos valen: ninguna anula $x$.', 'بالضرب في $x$: $6=x^{2}-x$، $x^{2}-x-6=0$. كلاهما يصلح: لا يجعل أيٌّ منهما $x$ صفرًا.', 'Times $x$: $6=x^{2}-x$, $x^{2}-x-6=0$. Both work: neither makes $x$ zero.')
        }
    },
    radical: {
        mistake: {
            wrong: say('$\\sqrt{x+5}=x-1$: karratura jaso eta $x+5=x^{2}+1$ geratzen da.', '$\\sqrt{x+5}=x-1$: elevo al cuadrado y queda $x+5=x^{2}+1$.', '$\\sqrt{x+5}=x-1$: أربّع فيبقى $x+5=x^{2}+1$.', '$\\sqrt{x+5}=x-1$: I square and get $x+5=x^{2}+1$.'),
            right: say('$x-1$ adierazpenaren karratua $x^{2}-2x+1$ da: biderkadura bikoitza falta da.', 'El cuadrado de $x-1$ es $x^{2}-2x+1$: falta el doble producto.', 'مربع $x-1$ هو $x^{2}-2x+1$: ينقص ضعف حاصل الضرب.', 'The square of $x-1$ is $x^{2}-2x+1$: twice the product is missing.')
        },
        check: {
            prompt: say('Ebatzi $\\sqrt{x}=x-6$.', 'Resuelve $\\sqrt{x}=x-6$.', 'حلّ $\\sqrt{x}=x-6$.', 'Solve $\\sqrt{x}=x-6$.'),
            options: [same('$x=9$'), same('$x=9,\\ x=4$'), same('$x=4$')],
            correctIndex: 0,
            explanation: say('$x=x^{2}-12x+36$ ekuazioak 9 eta 4 ematen ditu, baina $\\sqrt{4}=2\\neq -2$: 9 bakarrik.', '$x=x^{2}-12x+36$ da 9 y 4, pero $\\sqrt{4}=2\\neq -2$: solo 9.', '$x=x^{2}-12x+36$ تعطي 9 و4، لكن $\\sqrt{4}=2\\neq -2$: فقط 9.', '$x=x^{2}-12x+36$ gives 9 and 4, but $\\sqrt{4}=2\\neq -2$: only 9.')
        }
    },
    exponential: {
        mistake: {
            wrong: same('$2^{x}+2^{x}=2^{2x}$'),
            right: say('$a+a=2a$ bezala batzen da: $2^{x}+2^{x}=2\\cdot 2^{x}=2^{x+1}$.', 'Se suma como $a+a=2a$: $2^{x}+2^{x}=2\\cdot 2^{x}=2^{x+1}$.', 'تُجمع مثل $a+a=2a$: $2^{x}+2^{x}=2\\cdot 2^{x}=2^{x+1}$.', 'It adds like $a+a=2a$: $2^{x}+2^{x}=2\\cdot 2^{x}=2^{x+1}$.')
        },
        check: {
            prompt: say('Ebatzi $4^{x}=32$.', 'Resuelve $4^{x}=32$.', 'حلّ $4^{x}=32$.', 'Solve $4^{x}=32$.'),
            options: [same('$x=8$'), same('$x=\\frac{5}{2}$'), same('$x=3$')],
            correctIndex: 1,
            explanation: say('2 oinarria: $2^{2x}=2^{5}$, beraz $2x=5$.', 'Base 2: $2^{2x}=2^{5}$, así que $2x=5$.', 'الأساس 2: $2^{2x}=2^{5}$، إذن $2x=5$.', 'Base 2: $2^{2x}=2^{5}$, so $2x=5$.')
        }
    },
    logarithmic: {
        mistake: {
            wrong: same('$\\log(x+2)=\\log x+\\log 2$'),
            right: say('Batura baten logaritmoa ez da banatzen: $\\log x+\\log 2=\\log(2x)$.', 'El logaritmo de una suma no se separa: $\\log x+\\log 2=\\log(2x)$.', 'لوغاريتم المجموع لا يُفصل: $\\log x+\\log 2=\\log(2x)$.', 'The logarithm of a sum does not split: $\\log x+\\log 2=\\log(2x)$.')
        },
        check: {
            prompt: say('Ebatzi $\\log_3(x-1)=2$.', 'Resuelve $\\log_3(x-1)=2$.', 'حلّ $\\log_3(x-1)=2$.', 'Solve $\\log_3(x-1)=2$.'),
            options: [same('$7$'), same('$9$'), same('$10$')],
            correctIndex: 2,
            explanation: say('Definizioa: $x-1=3^{2}=9$, beraz $x=10$.', 'Definición: $x-1=3^{2}=9$, así que $x=10$.', 'التعريف: $x-1=3^{2}=9$، إذن $x=10$.', 'Definition: $x-1=3^{2}=9$, so $x=10$.')
        }
    },
    inequalities: {
        mistake: {
            wrong: say('$x\\le 5$ honela idazten da: $(-\\infty,5)$.', '$x\\le 5$ se escribe $(-\\infty,5)$.', 'تُكتب $x\\le 5$ هكذا: $(-\\infty,5)$.', '$x\\le 5$ is written $(-\\infty,5)$.'),
            right: say('5 sartzen da: $(-\\infty,5]$, kortxetearekin.', 'El 5 entra: $(-\\infty,5]$, con corchete.', 'العدد 5 داخل: $(-\\infty,5]$ بقوس معقوف.', '5 is in: $(-\\infty,5]$, with a square bracket.')
        },
        check: {
            prompt: say('Zer tarte da $-3<x\\le 2$?', '¿Qué intervalo es $-3<x\\le 2$?', 'ما المجال $-3<x\\le 2$؟', 'Which interval is $-3<x\\le 2$?'),
            options: [same('$(-3,2]$'), same('$[-3,2)$'), same('$(-3,2)$')],
            correctIndex: 0,
            explanation: say('$-3$ ez da sartzen (parentesia) eta 2 sartzen da (kortxetea).', '$-3$ no entra (paréntesis) y 2 sí (corchete).', '$-3$ غير داخل (قوس عادي) و2 داخل (قوس معقوف).', '$-3$ is not in (round bracket) and 2 is (square bracket).')
        }
    },
    'linear-inequality': {
        mistake: {
            wrong: same('$-2x>8\\ \\to\\ x>-4$'),
            right: say('$-2$ zenbakiaz zatitzean zentzua aldatzen da: $x<-4$.', 'Al dividir entre $-2$ cambia el sentido: $x<-4$.', 'عند القسمة على $-2$ ينقلب الاتجاه: $x<-4$.', 'Dividing by $-2$ changes the direction: $x<-4$.')
        },
        check: {
            prompt: say('Ebatzi $-4x\\ge 12$.', 'Resuelve $-4x\\ge 12$.', 'حلّ $-4x\\ge 12$.', 'Solve $-4x\\ge 12$.'),
            options: [same('$x\\ge -3$'), same('$x\\le -3$'), same('$x\\ge 3$')],
            correctIndex: 1,
            explanation: say('Zatitu $-4$ zenbakiaz eta aldatu zentzua: $x\\le -3$.', 'Divide entre $-4$ y cambia el sentido: $x\\le -3$.', 'اقسم على $-4$ واقلب الاتجاه: $x\\le -3$.', 'Divide by $-4$ and change the direction: $x\\le -3$.')
        }
    },
    'inequality-problems': {
        mistake: {
            wrong: say('«Gutxienez 18» honela idazten da: $x>18$.', '«Al menos 18» se escribe $x>18$.', '«على الأقل 18» تُكتب $x>18$.', '“At least 18” is written $x>18$.'),
            right: say('«Gutxienez» 18 zenbakia ere sartzen du: $x\\ge 18$.', '«Al menos» incluye el 18: $x\\ge 18$.', '«على الأقل» تشمل 18: $x\\ge 18$.', '“At least” includes 18: $x\\ge 18$.')
        },
        check: {
            prompt: say('Zenbaki baten hirukoitza gehi 5 ez da 26 baino handiagoa. Zein zenbaki arrunt dira baliozkoak?', 'El triple de un número más 5 no supera 26. ¿Qué números naturales valen?', 'ثلاثة أضعاف عدد زائد 5 لا يتجاوز 26. ما الأعداد الطبيعية التي تصلح؟', 'Three times a number plus 5 does not exceed 26. Which natural numbers work?'),
            options: [say('0 eta 7 artekoak', 'Del 0 al 7', 'من 0 إلى 7', 'From 0 to 7'), say('0 eta 6 artekoak', 'Del 0 al 6', 'من 0 إلى 6', 'From 0 to 6'), say('8 eta handiagoak', 'Del 8 en adelante', 'من 8 فما فوق', 'From 8 upwards')],
            correctIndex: 0,
            explanation: say('$3x+5\\le 26$, beraz $x\\le 7$: 7 zenbakia ere sartzen da.', '$3x+5\\le 26$, así que $x\\le 7$: el 7 también vale.', '$3x+5\\le 26$، إذن $x\\le 7$: والعدد 7 يصلح أيضًا.', '$3x+5\\le 26$, so $x\\le 7$: 7 works too.')
        }
    },
    'quadratic-inequality': {
        mistake: {
            wrong: say('$x^{2}-4<0$, beraz $x<\\pm 2$.', '$x^{2}-4<0$, así que $x<\\pm 2$.', '$x^{2}-4<0$، إذن $x<\\pm 2$.', '$x^{2}-4<0$, so $x<\\pm 2$.'),
            right: say('Erroak $\\pm 2$ dira, eta parabola negatiboa da haien artean: $(-2,2)$.', 'Las raíces son $\\pm 2$ y la parábola es negativa entre ellas: $(-2,2)$.', 'الجذران $\\pm 2$ والقطع المكافئ سالب بينهما: $(-2,2)$.', 'The roots are $\\pm 2$ and the parabola is negative between them: $(-2,2)$.')
        },
        check: {
            prompt: say('Ebatzi $x^{2}-5x+4<0$.', 'Resuelve $x^{2}-5x+4<0$.', 'حلّ $x^{2}-5x+4<0$.', 'Solve $x^{2}-5x+4<0$.'),
            options: [same('$(-\\infty,1)\\cup(4,+\\infty)$'), same('$[1,4]$'), same('$(1,4)$')],
            correctIndex: 2,
            explanation: say('Erroak 1 eta 4 dira; $a>0$ denez, negatiboa haien artean, muturrak kanpo.', 'Raíces 1 y 4; como $a>0$, es negativa entre ellas, sin los extremos.', 'الجذران 1 و4؛ ولأن $a>0$ فهي سالبة بينهما دون الطرفين.', 'Roots 1 and 4; since $a>0$, it is negative between them, without the endpoints.')
        }
    },
    'graphic-inequality': {
        mistake: {
            wrong: say('Grafikoek $x=1$ eta $x=5$ puntuetan mozten badute, $f(x)<g(x)$ betetzen da $x=1$ eta $x=5$ puntuetan.', 'Si las gráficas se cortan en $x=1$ y $x=5$, $f(x)<g(x)$ se cumple en $x=1$ y $x=5$.', 'إذا تقاطع المنحنيان عند $x=1$ و$x=5$ فإن $f(x)<g(x)$ يتحقق عند $x=1$ و$x=5$.', 'If the graphs cross at $x=1$ and $x=5$, $f(x)<g(x)$ holds at $x=1$ and $x=5$.'),
            right: say('Ebaki-puntuetan berdinak dira; $f(x)<g(x)$ betetzen da $f$ azpian dagoen tartean: $(1,5)$.', 'En los cortes son iguales; $f(x)<g(x)$ se cumple en el intervalo donde $f$ queda debajo: $(1,5)$.', 'عند نقطتي التقاطع يتساويان؛ و$f(x)<g(x)$ يتحقق في المجال الذي يكون فيه $f$ تحت: $(1,5)$.', 'At the crossing points they are equal; $f(x)<g(x)$ holds on the interval where $f$ is below: $(1,5)$.')
        },
        check: {
            prompt: say('$y=4$ zuzenak $y=x^{2}$ parabola $x=-2$ eta $x=2$ puntuetan mozten du. Non da $x^{2}>4$?', 'La recta $y=4$ corta a $y=x^{2}$ en $x=-2$ y $x=2$. ¿Dónde es $x^{2}>4$?', 'المستقيم $y=4$ يقطع $y=x^{2}$ عند $x=-2$ و$x=2$. أين يكون $x^{2}>4$؟', 'The line $y=4$ crosses $y=x^{2}$ at $x=-2$ and $x=2$. Where is $x^{2}>4$?'),
            options: [same('$(-\\infty,-2)\\cup(2,+\\infty)$'), same('$(-2,2)$'), same('$x>2$')],
            correctIndex: 0,
            explanation: say('Parabola zuzenaren gainetik dago bi ebaki-puntuetatik kanpo.', 'La parábola está por encima de la recta fuera de los dos cortes.', 'يقع القطع المكافئ فوق المستقيم خارج نقطتي التقاطع.', 'The parabola is above the line outside the two crossing points.')
        }
    },
    'inequality-systems': {
        mistake: {
            wrong: say('$x>1$ eta $x<5$ sistemaren ebazpena $(-\\infty,5)\\cup(1,+\\infty)$ da.', 'La solución de $x>1$ y $x<5$ es $(-\\infty,5)\\cup(1,+\\infty)$.', 'حل $x>1$ و$x<5$ هو $(-\\infty,5)\\cup(1,+\\infty)$.', 'The solution of $x>1$ and $x<5$ is $(-\\infty,5)\\cup(1,+\\infty)$.'),
            right: say('Sistema batean zati komuna hartzen da, ez bildura: $(1,5)$.', 'En un sistema se toma la parte común, no la unión: $(1,5)$.', 'في النظام نأخذ الجزء المشترك لا الاتحاد: $(1,5)$.', 'In a system you take the common part, not the union: $(1,5)$.')
        },
        check: {
            prompt: say('Ebatzi sistema: $x\\ge 0$ eta $x-2<1$.', 'Resuelve el sistema: $x\\ge 0$ y $x-2<1$.', 'حلّ النظام: $x\\ge 0$ و$x-2<1$.', 'Solve the system: $x\\ge 0$ and $x-2<1$.'),
            options: [same('$[0,+\\infty)$'), same('$[0,3)$'), same('$(0,3]$')],
            correctIndex: 1,
            explanation: say('$x\\ge 0$ eta $x<3$: zati komuna $[0,3)$ da.', '$x\\ge 0$ y $x<3$: la parte común es $[0,3)$.', '$x\\ge 0$ و$x<3$: الجزء المشترك هو $[0,3)$.', '$x\\ge 0$ and $x<3$: the common part is $[0,3)$.')
        }
    }
}

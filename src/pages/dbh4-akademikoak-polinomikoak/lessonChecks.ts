import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Funtzio polinomikoak eta arrazionalak · 4. DBH akademikoak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no JSX)
   so the tests can import it; lessons.tsx merges it into the topics.
   ========================================================================== */

export type PolynomialAkTopicId = 'line-kinds' | 'slope' | 'line-equation' | 'parabola-a' | 'vertex' | 'parabola-cuts' | 'vertex-form' | 'parabola-from' | 'line-parabola' | 'absolute-linear' | 'absolute-pieces' | 'absolute-quadratic' | 'inverse' | 'hyperbola-shift' | 'rational-form'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

const howMany = [say('Bat ere ez', 'Ninguno', 'لا شيء', 'None'), say('Bat', 'Uno', 'واحدة', 'One'), say('Bi', 'Dos', 'اثنتان', 'Two')]

export const polynomialAkLessonChecks: Record<PolynomialAkTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'line-kinds': {
        mistake: {
            wrong: say('$y=5-3x$ zuzenaren malda 5 da.', 'En $y=5-3x$ la pendiente es 5.', 'في $y=5-3x$ الميل هو 5.', 'In $y=5-3x$ the slope is 5.'),
            right: say('Malda $x$ letra biderkatzen duen zenbakia da: $m=-3$, eta $n=5$.', 'La pendiente es el número que multiplica a $x$: $m=-3$, y $n=5$.', 'الميل هو العدد الذي يضرب $x$: $m=-3$ و$n=5$.', 'The slope is the number multiplying $x$: $m=-3$, and $n=5$.')
        },
        check: {
            prompt: say('Zer motatako funtzioa da $y=-4x$?', '¿Qué tipo de función es $y=-4x$?', 'ما نوع الدالة $y=-4x$؟', 'What kind of function is $y=-4x$?'),
            options: [say('Proportzionaltasun zuzena', 'Proporcionalidad directa', 'تناسب طردي', 'Direct proportion'), say('Konstantea', 'Constante', 'ثابتة', 'Constant'), say('Lineala, $n=-4$ duena', 'Lineal con $n=-4$', 'خطية فيها $n=-4$', 'Linear with $n=-4$')],
            correctIndex: 0,
            explanation: say('$n=0$: zuzena jatorritik pasatzen da.', '$n=0$: la recta pasa por el origen.', '$n=0$: المستقيم يمر بالأصل.', '$n=0$: the line goes through the origin.')
        }
    },
    slope: {
        mistake: {
            wrong: say('$A(3,\\,0)$ eta $B(6,\\,9)$ puntuekin, $m=\\frac{9-0}{3-6}=-3$.', 'Con $A(3,\\,0)$ y $B(6,\\,9)$, $m=\\frac{9-0}{3-6}=-3$.', 'مع $A(3,\\,0)$ و$B(6,\\,9)$: $m=\\frac{9-0}{3-6}=-3$.', 'With $A(3,\\,0)$ and $B(6,\\,9)$, $m=\\frac{9-0}{3-6}=-3$.'),
            right: say('Ordena berean kendu behar da: $m=\\frac{9-0}{6-3}=3$.', 'Hay que restar en el mismo orden: $m=\\frac{9-0}{6-3}=3$.', 'يجب الطرح بالترتيب نفسه: $m=\\frac{9-0}{6-3}=3$.', 'Subtract in the same order: $m=\\frac{9-0}{6-3}=3$.')
        },
        check: {
            prompt: say('Zuzen batek $m=-\\frac{3}{4}$ malda du. Nolakoa da?', 'Una recta tiene pendiente $m=-\\frac{3}{4}$. ¿Cómo es?', 'مستقيم ميله $m=-\\frac{3}{4}$. كيف هو؟', 'A line has slope $m=-\\frac{3}{4}$. What is it like?'),
            options: [say('Gorakorra', 'Creciente', 'متزايد', 'Increasing'), say('Beherakorra', 'Decreciente', 'متناقص', 'Decreasing'), say('Konstantea', 'Constante', 'ثابت', 'Constant')],
            correctIndex: 1,
            explanation: say('$m<0$: 4 aurreratuta, 3 jaisten da.', '$m<0$: al avanzar 4, baja 3.', '$m<0$: عند التقدم 4 ينزل 3.', '$m<0$: moving 4 across, it drops 3.')
        }
    },
    'line-equation': {
        mistake: {
            wrong: say('2 maldako eta $(1,\\,5)$ puntutik pasatzen den zuzena $y=2x+5$ da.', 'La recta de pendiente 2 que pasa por $(1,\\,5)$ es $y=2x+5$.', 'المستقيم الذي ميله 2 ويمر بـ $(1,\\,5)$ هو $y=2x+5$.', 'The line with slope 2 through $(1,\\,5)$ is $y=2x+5$.'),
            right: say('5 ez da jatorriko ordenatua: $y-5=2(x-1)$, hau da, $y=2x+3$.', 'El 5 no es la ordenada en el origen: $y-5=2(x-1)$, es decir, $y=2x+3$.', 'العدد 5 ليس الجزء المقطوع: $y-5=2(x-1)$ أي $y=2x+3$.', '5 is not the y-intercept: $y-5=2(x-1)$, that is, $y=2x+3$.')
        },
        check: {
            prompt: say('Zein da $y=3x-2$ zuzenaren paraleloa, $(0,\\,4)$ puntutik pasatzen dena?', '¿Cuál es la paralela a $y=3x-2$ que pasa por $(0,\\,4)$?', 'ما المستقيم الموازي لـ $y=3x-2$ والمار بـ $(0,\\,4)$؟', 'Which line is parallel to $y=3x-2$ and goes through $(0,\\,4)$?'),
            options: [same('$y=3x+4$'), same('$y=-3x+4$'), same('$y=4x-2$')],
            correctIndex: 0,
            explanation: say('Malda bera, 3, eta jatorriko ordenatua 4.', 'Misma pendiente, 3, y ordenada en el origen 4.', 'الميل نفسه 3 والجزء المقطوع 4.', 'Same slope, 3, and y-intercept 4.')
        }
    },
    'parabola-a': {
        mistake: {
            wrong: say('$y=-3x^{2}$ parabola $y=x^{2}$ baino irekiagoa da, $-3<1$ delako.', '$y=-3x^{2}$ es más abierta que $y=x^{2}$, porque $-3<1$.', '$y=-3x^{2}$ أوسع من $y=x^{2}$ لأن $-3<1$.', '$y=-3x^{2}$ is wider than $y=x^{2}$, because $-3<1$.'),
            right: say('$|a|$ da kontuan hartzen dena: $|-3|=3>1$; beraz, itxiagoa da (eta beherantz irekia).', 'Lo que cuenta es $|a|$: $|-3|=3>1$, así que es más cerrada (y abierta hacia abajo).', 'المهم هو $|a|$: $|-3|=3>1$، إذن هو أضيق (ومفتوح إلى الأسفل).', 'What counts is $|a|$: $|-3|=3>1$, so it is narrower (and opens downwards).')
        },
        check: {
            prompt: say('Parabola hauetatik, zein da itxiena?', '¿Cuál de estas parábolas es la más cerrada?', 'أيّ هذه القطوع المكافئة أضيق؟', 'Which of these parabolas is the narrowest?'),
            options: [same('$y=\\frac{1}{3}x^{2}$'), same('$y=-5x^{2}$'), same('$y=2x^{2}$')],
            correctIndex: 1,
            explanation: say('$|-5|=5$ da $|a|$ handiena.', '$|-5|=5$ es el mayor $|a|$.', '$|-5|=5$ هو أكبر $|a|$.', '$|-5|=5$ is the largest $|a|$.')
        }
    },
    vertex: {
        mistake: {
            wrong: say('$y=x^{2}+6x$ parabolan, $x_v=\\frac{6}{2}=3$.', 'En $y=x^{2}+6x$, $x_v=\\frac{6}{2}=3$.', 'في $y=x^{2}+6x$: $x_v=\\frac{6}{2}=3$.', 'In $y=x^{2}+6x$, $x_v=\\frac{6}{2}=3$.'),
            right: say('Zeinua falta da: $x_v=\\frac{-b}{2a}=\\frac{-6}{2}=-3$.', 'Falta el signo: $x_v=\\frac{-b}{2a}=\\frac{-6}{2}=-3$.', 'نسيت الإشارة: $x_v=\\frac{-b}{2a}=\\frac{-6}{2}=-3$.', 'The sign is missing: $x_v=\\frac{-b}{2a}=\\frac{-6}{2}=-3$.')
        },
        check: {
            prompt: say('Zein da $y=-x^{2}+2x+3$ funtzioaren ibiltartea?', '¿Cuál es el recorrido de $y=-x^{2}+2x+3$?', 'ما مدى $y=-x^{2}+2x+3$؟', 'What is the range of $y=-x^{2}+2x+3$?'),
            options: [same('$(-\\infty,\\,4]$'), same('$[4,\\,+\\infty)$'), same('$(-\\infty,\\,1]$')],
            correctIndex: 0,
            explanation: say('$x_v=1$, $y_v=-1+2+3=4$ eta $a<0$: maximoa.', '$x_v=1$, $y_v=-1+2+3=4$ y $a<0$: máximo.', '$x_v=1$ و$y_v=-1+2+3=4$ و$a<0$: قيمة عظمى.', '$x_v=1$, $y_v=-1+2+3=4$ and $a<0$: a maximum.')
        }
    },
    'parabola-cuts': {
        mistake: {
            wrong: say('$\\Delta<0$ bada, parabolak ez du ardatzik mozten.', 'Si $\\Delta<0$, la parábola no corta a ningún eje.', 'إذا كان $\\Delta<0$ فالقطع المكافئ لا يقطع أي محور.', 'If $\\Delta<0$, the parabola cuts neither axis.'),
            right: say('Y ardatza beti mozten du, $(0,\\,c)$ puntuan; $\\Delta<0$ esan nahi du X ardatza ez duela mozten.', 'Al eje Y lo corta siempre, en $(0,\\,c)$; $\\Delta<0$ solo quiere decir que no corta al eje X.', 'يقطع محور Y دائمًا في $(0,\\,c)$؛ و$\\Delta<0$ تعني فقط أنه لا يقطع محور X.', 'It always cuts the Y axis, at $(0,\\,c)$; $\\Delta<0$ only means it does not cut the X axis.')
        },
        check: {
            prompt: say('Zenbat ebaki-puntu ditu $y=x^{2}+2x+5$ parabolak X ardatzarekin?', '¿Cuántos cortes con el eje X tiene $y=x^{2}+2x+5$?', 'كم نقطة تقاطع مع محور X لـ $y=x^{2}+2x+5$؟', 'How many X-axis intercepts does $y=x^{2}+2x+5$ have?'),
            options: howMany,
            correctIndex: 0,
            explanation: same('$\\Delta=4-20=-16$')
        }
    },
    'vertex-form': {
        mistake: {
            wrong: say('$y=(x+4)^{2}-1$ parabolaren erpina $(4,\\,-1)$ da.', 'El vértice de $y=(x+4)^{2}-1$ es $(4,\\,-1)$.', 'رأس $y=(x+4)^{2}-1$ هو $(4,\\,-1)$.', 'The vertex of $y=(x+4)^{2}-1$ is $(4,\\,-1)$.'),
            right: say('$x+4=x-(-4)$: erpina $(-4,\\,-1)$ da, ezkerrean.', '$x+4=x-(-4)$: el vértice es $(-4,\\,-1)$, a la izquierda.', '$x+4=x-(-4)$: الرأس $(-4,\\,-1)$ إلى اليسار.', '$x+4=x-(-4)$: the vertex is $(-4,\\,-1)$, on the left.')
        },
        check: {
            prompt: say('Zein da $y=2(x-5)^{2}+3$ parabolaren erpina?', '¿Cuál es el vértice de $y=2(x-5)^{2}+3$?', 'ما رأس $y=2(x-5)^{2}+3$؟', 'What is the vertex of $y=2(x-5)^{2}+3$?'),
            options: [same('$(5,\\,3)$'), same('$(-5,\\,3)$'), same('$(2,\\,3)$')],
            correctIndex: 0,
            explanation: say('$(p,\\,q)$ irakurtzen da: $p=5$ eta $q=3$.', 'Se lee $(p,\\,q)$: $p=5$ y $q=3$.', 'نقرأ $(p,\\,q)$: $p=5$ و$q=3$.', 'Read $(p,\\,q)$: $p=5$ and $q=3$.')
        }
    },
    'parabola-from': {
        mistake: {
            wrong: say('X ardatza 2 eta 5 puntuetan mozten badu, $y=a(x+2)(x+5)$.', 'Si corta al eje X en 2 y en 5, $y=a(x+2)(x+5)$.', 'إذا قطع محور X عند 2 و5 فإن $y=a(x+2)(x+5)$.', 'If it cuts the X axis at 2 and 5, $y=a(x+2)(x+5)$.'),
            right: say('Erroak kendu egiten dira: $y=a(x-2)(x-5)$.', 'Las raíces se restan: $y=a(x-2)(x-5)$.', 'الجذور تُطرح: $y=a(x-2)(x-5)$.', 'The roots are subtracted: $y=a(x-2)(x-5)$.')
        },
        check: {
            prompt: say('$(2,\\,1)$ erpineko parabola bat $(0,\\,5)$ puntutik pasatzen da. Zenbat da $a$?', 'Una parábola de vértice $(2,\\,1)$ pasa por $(0,\\,5)$. ¿Cuánto vale $a$?', 'قطع مكافئ رأسه $(2,\\,1)$ يمر بـ $(0,\\,5)$. ما قيمة $a$؟', 'A parabola with vertex $(2,\\,1)$ goes through $(0,\\,5)$. What is $a$?'),
            options: [same('$1$'), same('$2$'), same('$-1$')],
            correctIndex: 0,
            explanation: same('$5=a\\cdot 4+1\\ \\to\\ a=1$')
        }
    },
    'line-parabola': {
        mistake: {
            wrong: say('$y=x^{2}$ eta $y=x+2$ mozteko, ebazpenak ordenatuak dira: 2 eta $-1$.', 'Al cortar $y=x^{2}$ con $y=x+2$, las soluciones son las ordenadas: 2 y $-1$.', 'عند تقاطع $y=x^{2}$ مع $y=x+2$ تكون الحلول هي التراتيب: 2 و$-1$.', 'Meeting $y=x^{2}$ with $y=x+2$, the solutions are the y values: 2 and $-1$.'),
            right: say('$x^{2}=x+2$ ekuazioaren ebazpenak abszisak dira; ordenatuak zuzenetik ateratzen dira: $(2,\\,4)$ eta $(-1,\\,1)$.', 'Las soluciones de $x^{2}=x+2$ son las abscisas; las ordenadas salen de la recta: $(2,\\,4)$ y $(-1,\\,1)$.', 'حلول $x^{2}=x+2$ هي الفواصل، والتراتيب تُستخرج من المستقيم: $(2,\\,4)$ و$(-1,\\,1)$.', 'The solutions of $x^{2}=x+2$ are the x values; the y values come from the line: $(2,\\,4)$ and $(-1,\\,1)$.')
        },
        check: {
            prompt: say('Zenbat puntu komun dituzte $y=x^{2}+2$ eta $y=3x$ funtzioek?', '¿Cuántos puntos tienen en común $y=x^{2}+2$ e $y=3x$?', 'كم نقطة مشتركة بين $y=x^{2}+2$ و$y=3x$؟', 'How many points do $y=x^{2}+2$ and $y=3x$ have in common?'),
            options: howMany,
            correctIndex: 2,
            explanation: same('$x^{2}-3x+2=0,\\quad\\Delta=9-8=1$')
        }
    },
    'absolute-linear': {
        mistake: {
            wrong: say('$|x+2|=5$ ekuazioak ebazpen bakarra du: $x=3$.', '$|x+2|=5$ tiene una sola solución: $x=3$.', '$|x+2|=5$ لها حل واحد فقط: $x=3$.', '$|x+2|=5$ has only one solution: $x=3$.'),
            right: say('$x+2=-5$ ere bai, hau da, $x=-7$: bi zenbaki daude $-2$ zenbakitik 5 unitatera.', 'También $x+2=-5$, es decir, $x=-7$: hay dos números a 5 unidades del $-2$.', 'وأيضًا $x+2=-5$ أي $x=-7$: هناك عددان على بعد 5 وحدات من $-2$.', 'Also $x+2=-5$, that is, $x=-7$: two numbers are 5 units from $-2$.')
        },
        check: {
            prompt: say('Zenbat da $|3-8|$?', '¿Cuánto vale $|3-8|$?', 'ما قيمة $|3-8|$؟', 'What is $|3-8|$?'),
            options: [same('$5$'), same('$-5$'), same('$11$')],
            correctIndex: 0,
            explanation: say('$3-8=-5$, eta zeinurik gabe, 5.', '$3-8=-5$, y sin el signo, 5.', '$3-8=-5$، وبلا إشارة 5.', '$3-8=-5$, and without the sign, 5.')
        }
    },
    'absolute-pieces': {
        mistake: {
            wrong: say('$|x-5|=x-5$, $x$ guztietarako.', '$|x-5|=x-5$ para todas las $x$.', '$|x-5|=x-5$ لكل قيم $x$.', '$|x-5|=x-5$ for every $x$.'),
            right: say('$x\\ge 5$ denean bakarrik. $x<5$ denean, barrukoa negatiboa da eta $|x-5|=-x+5$.', 'Solo si $x\\ge 5$. Si $x<5$, lo de dentro es negativo y $|x-5|=-x+5$.', 'فقط إذا كان $x\\ge 5$. وإذا كان $x<5$ فما بالداخل سالب و$|x-5|=-x+5$.', 'Only if $x\\ge 5$. If $x<5$, what is inside is negative and $|x-5|=-x+5$.')
        },
        check: {
            prompt: say('$y=|2x-6|$ bada, zein formulak balio du $x<3$ denean?', 'Si $y=|2x-6|$, ¿qué fórmula vale para $x<3$?', 'إذا كانت $y=|2x-6|$ فأي صيغة تصلح عندما $x<3$؟', 'If $y=|2x-6|$, which formula holds for $x<3$?'),
            options: [same('$y=2x-6$'), same('$y=-2x+6$'), same('$y=2x+6$')],
            correctIndex: 1,
            explanation: say('$x=0$ denean, $2\\cdot 0-6=-6$: zeinua aldatzen da.', 'Con $x=0$, $2\\cdot 0-6=-6$: se cambia el signo.', 'مع $x=0$: $2\\cdot 0-6=-6$، فنغيّر الإشارة.', 'With $x=0$, $2\\cdot 0-6=-6$: change the sign.')
        }
    },
    'absolute-quadratic': {
        mistake: {
            wrong: say('$y=x^{2}-9$ parabolaren erpina $(0,\\,-9)$ da; beraz, $y=|x^{2}-9|$ funtzioak minimo bat du $(0,\\,-9)$ puntuan.', 'El vértice de $y=x^{2}-9$ es $(0,\\,-9)$, así que $y=|x^{2}-9|$ tiene un mínimo en $(0,\\,-9)$.', 'رأس $y=x^{2}-9$ هو $(0,\\,-9)$، إذن $y=|x^{2}-9|$ لها قيمة صغرى في $(0,\\,-9)$.', 'The vertex of $y=x^{2}-9$ is $(0,\\,-9)$, so $y=|x^{2}-9|$ has a minimum at $(0,\\,-9)$.'),
            right: say('Balio absolutua ez da inoiz negatiboa: erpina $(0,\\,9)$ puntura igotzen da eta maximo erlatiboa da; minimoak $(-3,\\,0)$ eta $(3,\\,0)$ dira.', 'El valor absoluto nunca es negativo: el vértice sube a $(0,\\,9)$ y es un máximo relativo; los mínimos son $(-3,\\,0)$ y $(3,\\,0)$.', 'القيمة المطلقة لا تكون سالبة أبدًا: يصعد الرأس إلى $(0,\\,9)$ ويصبح قيمة عظمى نسبية، والصغريان $(-3,\\,0)$ و$(3,\\,0)$.', 'The absolute value is never negative: the vertex goes up to $(0,\\,9)$ and is a local maximum; the minima are $(-3,\\,0)$ and $(3,\\,0)$.')
        },
        check: {
            prompt: say('Zenbat minimo ditu $y=|x^{2}-1|$ funtzioak?', '¿Cuántos mínimos tiene $y=|x^{2}-1|$?', 'كم قيمة صغرى لـ $y=|x^{2}-1|$؟', 'How many minima does $y=|x^{2}-1|$ have?'),
            options: [same('$1$'), same('$2$'), same('$0$')],
            correctIndex: 1,
            explanation: say('Ebaki-puntuak, $(-1,\\,0)$ eta $(1,\\,0)$; erpina $(0,\\,1)$ puntura igotzen da.', 'Los cortes $(-1,\\,0)$ y $(1,\\,0)$; el vértice sube a $(0,\\,1)$.', 'نقطتا التقاطع $(-1,\\,0)$ و$(1,\\,0)$؛ ويصعد الرأس إلى $(0,\\,1)$.', 'The intercepts $(-1,\\,0)$ and $(1,\\,0)$; the vertex goes up to $(0,\\,1)$.')
        }
    },
    inverse: {
        mistake: {
            wrong: say('$y=\\frac{k}{x}$ funtzioa $(3,\\,2)$ puntutik pasatzen bada, $k=\\frac{2}{3}$.', 'Si $y=\\frac{k}{x}$ pasa por $(3,\\,2)$, $k=\\frac{2}{3}$.', 'إذا مر $y=\\frac{k}{x}$ بـ $(3,\\,2)$ فإن $k=\\frac{2}{3}$.', 'If $y=\\frac{k}{x}$ goes through $(3,\\,2)$, $k=\\frac{2}{3}$.'),
            right: say('$k=x\\cdot y=3\\cdot 2=6$.', '$k=x\\cdot y=3\\cdot 2=6$.', '$k=x\\cdot y=3\\cdot 2=6$.', '$k=x\\cdot y=3\\cdot 2=6$.')
        },
        check: {
            prompt: say('Zein koadrantetan daude $y=\\frac{-5}{x}$ funtzioaren adarrak?', '¿En qué cuadrantes están las ramas de $y=\\frac{-5}{x}$?', 'في أي ربعين يقع فرعا $y=\\frac{-5}{x}$؟', 'In which quadrants are the branches of $y=\\frac{-5}{x}$?'),
            options: [say('I eta III', 'I y III', 'الأول والثالث', 'I and III'), say('II eta IV', 'II y IV', 'الثاني والرابع', 'II and IV'), say('I eta II', 'I y II', 'الأول والثاني', 'I and II')],
            correctIndex: 1,
            explanation: say('$k=-5<0$: II. eta IV. koadranteak.', '$k=-5<0$: cuadrantes II y IV.', '$k=-5<0$: الربعان الثاني والرابع.', '$k=-5<0$: quadrants II and IV.')
        }
    },
    'hyperbola-shift': {
        mistake: {
            wrong: say('$y=\\frac{3}{x+4}-1$ funtzioaren asintota bertikala $x=4$ da.', 'La asíntota vertical de $y=\\frac{3}{x+4}-1$ es $x=4$.', 'المقارب الرأسي لـ $y=\\frac{3}{x+4}-1$ هو $x=4$.', 'The vertical asymptote of $y=\\frac{3}{x+4}-1$ is $x=4$.'),
            right: say('Izendatzailea anulatzen den lekua da: $x+4=0$, $x=-4$. Horizontala $y=-1$ da.', 'Es donde se anula el denominador: $x+4=0$, $x=-4$. La horizontal es $y=-1$.', 'هو حيث ينعدم المقام: $x+4=0$، $x=-4$. والأفقي $y=-1$.', 'It is where the denominator is 0: $x+4=0$, $x=-4$. The horizontal one is $y=-1$.')
        },
        check: {
            prompt: say('Zein da $y=\\frac{2}{x-3}+5$ funtzioaren ibiltartea?', '¿Cuál es el recorrido de $y=\\frac{2}{x-3}+5$?', 'ما مدى $y=\\frac{2}{x-3}+5$؟', 'What is the range of $y=\\frac{2}{x-3}+5$?'),
            options: [same('$\\mathbb{R}-\\{5\\}$'), same('$\\mathbb{R}-\\{3\\}$'), same('$\\mathbb{R}-\\{-3\\}$')],
            correctIndex: 0,
            explanation: say('Asintota horizontala $y=5$ da.', 'La asíntota horizontal es $y=5$.', 'المقارب الأفقي $y=5$.', 'The horizontal asymptote is $y=5$.')
        }
    },
    'rational-form': {
        mistake: {
            wrong: say('$y=\\frac{4x+1}{2x-6}$ funtzioan, asintota horizontala $y=4$ da.', 'En $y=\\frac{4x+1}{2x-6}$, la asíntota horizontal es $y=4$.', 'في $y=\\frac{4x+1}{2x-6}$ المقارب الأفقي هو $y=4$.', 'In $y=\\frac{4x+1}{2x-6}$, the horizontal asymptote is $y=4$.'),
            right: say('$x$ letraren koefizienteen zatidura da: $y=\\frac{4}{2}=2$. Bertikala, $x=3$.', 'Es el cociente de los coeficientes de $x$: $y=\\frac{4}{2}=2$. La vertical, $x=3$.', 'هو خارج قسمة معاملي $x$: $y=\\frac{4}{2}=2$. والرأسي $x=3$.', 'It is the quotient of the coefficients of $x$: $y=\\frac{4}{2}=2$. The vertical one, $x=3$.')
        },
        check: {
            prompt: say('Zein $x$ balioan dago $y=\\frac{x+5}{x-2}$ funtzioaren asintota bertikala?', '¿En qué valor de $x$ está la asíntota vertical de $y=\\frac{x+5}{x-2}$?', 'عند أي قيمة لـ $x$ يقع المقارب الرأسي لـ $y=\\frac{x+5}{x-2}$؟', 'At which value of $x$ is the vertical asymptote of $y=\\frac{x+5}{x-2}$?'),
            options: [same('$2$'), same('$-5$'), same('$1$')],
            correctIndex: 0,
            explanation: say('Izendatzailea anulatzen da: $x-2=0$.', 'Se anula el denominador: $x-2=0$.', 'ينعدم المقام: $x-2=0$.', 'The denominator is 0: $x-2=0$.')
        }
    }
}

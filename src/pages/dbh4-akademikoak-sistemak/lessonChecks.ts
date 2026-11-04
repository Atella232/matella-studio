import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Sistemak · 4. DBH akademikoak — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import
   it; lessons.tsx merges it into the topics. A question with one equation
   and a point as answer is checked by tests/lesson-checks.test.ts (the
   right point satisfies it, no wrong one does).
   ========================================================================== */

export type SystemsTopicId = 'linear-equations' | 'graphic' | 'classify' | 'substitution' | 'equalization' | 'reduction' | 'simplify-first' | 'line-curve' | 'squares' | 'check-solutions' | 'half-plane' | 'region' | 'linear-problems' | 'nonlinear-problems' | 'region-problems'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const systemsLessonChecks: Record<SystemsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'linear-equations': {
        mistake: {
            wrong: say('$(1,3)$ bikotea $2x+y=7$ ekuazioaren ebazpena da: $2\\cdot 3+1=7$.', '$(1,3)$ es solución de $2x+y=7$: $2\\cdot 3+1=7$.', '$(1,3)$ حل لـ $2x+y=7$: $2\\cdot 3+1=7$.', '$(1,3)$ is a solution of $2x+y=7$: $2\\cdot 3+1=7$.'),
            right: say('$(1,3)$ bikotean $x=1$ eta $y=3$: $2\\cdot 1+3=5\\neq 7$. Lehena beti $x$ da.', 'En $(1,3)$, $x=1$ e $y=3$: $2\\cdot 1+3=5\\neq 7$. Primero va siempre la $x$.', 'في $(1,3)$ يكون $x=1$ و$y=3$: $2\\cdot 1+3=5\\neq 7$. الأول دائمًا هو $x$.', 'In $(1,3)$, $x=1$ and $y=3$: $2\\cdot 1+3=5\\neq 7$. The $x$ always comes first.')
        },
        check: {
            prompt: say('Puntu hauetatik, zein da $x+3y=9$ ekuazioaren ebazpena?', '¿Cuál de estos puntos es solución de $x+3y=9$?', 'أيّ هذه النقاط حل لـ $x+3y=9$؟', 'Which of these points is a solution of $x+3y=9$?'),
            options: [same('$(3,2)$'), same('$(2,3)$'), same('$(9,1)$')],
            correctIndex: 0,
            explanation: same('$3+3\\cdot 2=9$')
        }
    },
    graphic: {
        mistake: {
            wrong: say('Zuzenak paraleloak badira, sistemak infinitu ebazpen ditu.', 'Si las rectas son paralelas, el sistema tiene infinitas soluciones.', 'إذا كان المستقيمان متوازيين فللنظام حلول لا نهائية.', 'If the lines are parallel, the system has infinitely many solutions.'),
            right: say('Paraleloak ez dira inoiz mozten: ebazpenik ez. Infinitu, zuzen bera badira.', 'Las paralelas no se cortan nunca: ninguna solución. Infinitas, si son la misma recta.', 'المتوازيان لا يتقاطعان أبدًا: لا حل. وحلول لا نهائية إذا كانا المستقيم نفسه.', 'Parallel lines never cross: no solution. Infinitely many if they are the same line.')
        },
        check: {
            prompt: say('Bi zuzenak puntu batean mozten badira, zenbat ebazpen ditu sistemak?', 'Si las dos rectas se cortan en un punto, ¿cuántas soluciones tiene el sistema?', 'إذا تقاطع المستقيمان في نقطة، فكم حلًا للنظام؟', 'If the two lines cross at one point, how many solutions does the system have?'),
            options: [say('Bat ere ez', 'Ninguna', 'لا حل', 'None'), say('Bat', 'Una', 'حل واحد', 'One'), say('Infinitu', 'Infinitas', 'لا نهائية', 'Infinitely many')],
            correctIndex: 1,
            explanation: say('Ebaki-puntua da bi ekuazioak betetzen dituen bikote bakarra.', 'El punto de corte es la única pareja que cumple las dos ecuaciones.', 'نقطة التقاطع هي الزوج الوحيد الذي يحقق المعادلتين.', 'The crossing point is the only pair that satisfies both equations.')
        }
    },
    classify: {
        mistake: {
            wrong: say('$x+2y=3$ eta $2x+4y=6$ sistema bateraezina da, zuzenak paraleloak direlako.', '$x+2y=3$ y $2x+4y=6$ es incompatible, porque las rectas son paralelas.', '$x+2y=3$ و$2x+4y=6$ غير متوافق لأن المستقيمين متوازيان.', '$x+2y=3$ and $2x+4y=6$ is inconsistent, because the lines are parallel.'),
            right: say('$\\frac{3}{6}=\\frac{1}{2}$ ere bai: hiru zatidurak berdinak dira, zuzen bera da, bateragarri indeterminatua.', 'También $\\frac{3}{6}=\\frac{1}{2}$: los tres cocientes son iguales, es la misma recta, compatible indeterminado.', 'وأيضًا $\\frac{3}{6}=\\frac{1}{2}$: النسب الثلاث متساوية، فهو المستقيم نفسه، متوافق غير محدد.', 'Also $\\frac{3}{6}=\\frac{1}{2}$: all three ratios are equal, it is the same line, consistent and dependent.')
        },
        check: {
            prompt: say('Nolakoa da $2x+3y=4$, $4x+6y=1$ sistema?', '¿Cómo es el sistema $2x+3y=4$, $4x+6y=1$?', 'ما نوع النظام $2x+3y=4$، $4x+6y=1$؟', 'What kind of system is $2x+3y=4$, $4x+6y=1$?'),
            options: [say('Bateraezina', 'Incompatible', 'غير متوافق', 'Inconsistent'), say('Bateragarri determinatua', 'Compatible determinado', 'متوافق محدد', 'Consistent and independent'), say('Bateragarri indeterminatua', 'Compatible indeterminado', 'متوافق غير محدد', 'Consistent and dependent')],
            correctIndex: 0,
            explanation: say('$\\frac{2}{4}=\\frac{3}{6}$, baina $\\frac{4}{1}$ desberdina da: zuzen paraleloak.', '$\\frac{2}{4}=\\frac{3}{6}$, pero $\\frac{4}{1}$ es distinto: rectas paralelas.', '$\\frac{2}{4}=\\frac{3}{6}$ لكن $\\frac{4}{1}$ مختلفة: مستقيمان متوازيان.', '$\\frac{2}{4}=\\frac{3}{6}$, but $\\frac{4}{1}$ is different: parallel lines.')
        }
    },
    substitution: {
        mistake: {
            wrong: say('$x+3y=7$ ekuazioan $x=7+3y$ askatzen dut.', 'De $x+3y=7$ despejo $x=7+3y$.', 'من $x+3y=7$ أعزل $x=7+3y$.', 'From $x+3y=7$ I get $x=7+3y$.'),
            right: say('$3y$ beste atalera pasatzean zeinua aldatzen du: $x=7-3y$.', 'Al pasar $3y$ al otro miembro cambia de signo: $x=7-3y$.', 'عند نقل $3y$ إلى الطرف الآخر تتغيّر إشارته: $x=7-3y$.', 'Moving $3y$ to the other side changes its sign: $x=7-3y$.')
        },
        check: {
            prompt: say('$x-4y=2$ eta $2x+y=13$ sisteman, zein ekuazio ateratzen da lehenean $x$ askatu eta ordeztean?', 'En $x-4y=2$ y $2x+y=13$, ¿qué ecuación sale al despejar $x$ en la primera y sustituir?', 'في $x-4y=2$ و$2x+y=13$، ما المعادلة الناتجة عند عزل $x$ في الأولى والتعويض؟', 'In $x-4y=2$ and $2x+y=13$, which equation do you get by solving the first for $x$ and substituting?'),
            options: [same('$2(2+4y)+y=13$'), same('$2(2-4y)+y=13$'), same('$2+4y+y=13$')],
            correctIndex: 0,
            explanation: say('$x=2+4y$, eta bigarrenean bi aldiz agertzen da: $2(2+4y)+y=13$, $y=1$, $x=6$.', '$x=2+4y$, y en la segunda va multiplicado por 2: $2(2+4y)+y=13$, $y=1$, $x=6$.', '$x=2+4y$، ويُضرب في 2 في الثانية: $2(2+4y)+y=13$، $y=1$، $x=6$.', '$x=2+4y$, and in the second equation it is multiplied by 2: $2(2+4y)+y=13$, $y=1$, $x=6$.')
        }
    },
    equalization: {
        mistake: {
            wrong: say('$y=x+1$ eta $y=2x$ sisteman, $x+1=2x$, beraz ebazpena $x=1$ da.', 'De $y=x+1$ e $y=2x$ sale $x+1=2x$, así que la solución es $x=1$.', 'من $y=x+1$ و$y=2x$ نحصل على $x+1=2x$، إذن الحل $x=1$.', 'From $y=x+1$ and $y=2x$ you get $x+1=2x$, so the solution is $x=1$.'),
            right: say('Beste ezezaguna falta da: $y=2\\cdot 1=2$; ebazpena $(1,2)$ da.', 'Falta la otra incógnita: $y=2\\cdot 1=2$; la solución es $(1,2)$.', 'ينقص المجهول الآخر: $y=2\\cdot 1=2$؛ والحل $(1,2)$.', 'The other unknown is missing: $y=2\\cdot 1=2$; the solution is $(1,2)$.')
        },
        check: {
            prompt: say('$x=5-y$ eta $x=2y-1$ badira, zenbat da $y$?', 'Si $x=5-y$ y $x=2y-1$, ¿cuánto vale $y$?', 'إذا كان $x=5-y$ و$x=2y-1$، فكم يساوي $y$؟', 'If $x=5-y$ and $x=2y-1$, what is $y$?'),
            options: [same('$3$'), same('$\\frac{4}{3}$'), same('$2$')],
            correctIndex: 2,
            explanation: say('$5-y=2y-1$, $3y=6$, $y=2$ (eta $x=3$).', '$5-y=2y-1$, $3y=6$, $y=2$ (y $x=3$).', '$5-y=2y-1$، $3y=6$، $y=2$ (و$x=3$).', '$5-y=2y-1$, $3y=6$, $y=2$ (and $x=3$).')
        }
    },
    reduction: {
        mistake: {
            wrong: say('$x-y=3$ bider 2 eginda, $2x-y=6$ geratzen da.', 'Multiplico $x-y=3$ por 2 y queda $2x-y=6$.', 'أضرب $x-y=3$ في 2 فيبقى $2x-y=6$.', 'I multiply $x-y=3$ by 2 and get $2x-y=6$.'),
            right: say('Gai guztiak biderkatzen dira: $2x-2y=6$.', 'Se multiplican todos los términos: $2x-2y=6$.', 'تُضرب كل الحدود: $2x-2y=6$.', 'Every term is multiplied: $2x-2y=6$.')
        },
        check: {
            prompt: say('Zer zenbakiz biderkatzen duzu $x+3y=5$, $4x-y=7$ ekuazioarekin batzean $x$ ezabatzeko?', '¿Por qué número multiplicas $x+3y=5$ para eliminar $x$ al sumarla con $4x-y=7$?', 'في أيّ عدد تضرب $x+3y=5$ لحذف $x$ عند جمعها مع $4x-y=7$؟', 'What number do you multiply $x+3y=5$ by to eliminate $x$ when you add it to $4x-y=7$?'),
            options: [same('$-4$'), same('$4$'), same('$3$')],
            correctIndex: 0,
            explanation: say('$-4x-12y=-20$ eta $4x-y=7$: $x$ letraren koefizienteak aurkakoak dira.', '$-4x-12y=-20$ y $4x-y=7$: los coeficientes de $x$ son opuestos.', '$-4x-12y=-20$ و$4x-y=7$: معاملا $x$ متعاكسان.', '$-4x-12y=-20$ and $4x-y=7$: the coefficients of $x$ are opposite.')
        }
    },
    'simplify-first': {
        mistake: {
            wrong: say('$\\frac{x}{2}+y=3$ bider 2 eginda, $x+y=6$ geratzen da.', 'Multiplico $\\frac{x}{2}+y=3$ por 2 y queda $x+y=6$.', 'أضرب $\\frac{x}{2}+y=3$ في 2 فيبقى $x+y=6$.', 'I multiply $\\frac{x}{2}+y=3$ by 2 and get $x+y=6$.'),
            right: say('Gai guztiak biderkatzen dira, $y$ ere bai: $x+2y=6$.', 'Se multiplican todos los términos, también la $y$: $x+2y=6$.', 'تُضرب كل الحدود، و$y$ أيضًا: $x+2y=6$.', 'Every term is multiplied, $y$ too: $x+2y=6$.')
        },
        check: {
            prompt: say('Nola geratzen da $\\frac{x}{3}-\\frac{y}{2}=1$ izendatzailerik gabe?', '¿Cómo queda $\\frac{x}{3}-\\frac{y}{2}=1$ sin denominadores?', 'كيف تصبح $\\frac{x}{3}-\\frac{y}{2}=1$ دون مقامات؟', 'What does $\\frac{x}{3}-\\frac{y}{2}=1$ become without denominators?'),
            options: [same('$2x-3y=1$'), same('$2x-3y=6$'), same('$x-y=6$')],
            correctIndex: 1,
            explanation: say('Bider 6, m.k.t.: $2x-3y=6$; 1 zenbakia ere bider 6.', 'Por 6, el m.c.m.: $2x-3y=6$; también el 1 se multiplica por 6.', 'في 6، م.م.أ: $2x-3y=6$؛ والعدد 1 أيضًا يُضرب في 6.', 'Times 6, the LCM: $2x-3y=6$; the 1 is multiplied by 6 too.')
        }
    },
    'line-curve': {
        mistake: {
            wrong: say('$x^{2}+y^{2}=10$ eta $y=3x$ sisteman $x=\\pm 1$ ateratzen da; beraz ebazpenak 1 eta $-1$ dira.', 'En $x^{2}+y^{2}=10$ e $y=3x$ sale $x=\\pm 1$, así que las soluciones son 1 y $-1$.', 'في $x^{2}+y^{2}=10$ و$y=3x$ نجد $x=\\pm 1$، إذن الحلان 1 و$-1$.', 'In $x^{2}+y^{2}=10$ and $y=3x$ you get $x=\\pm 1$, so the solutions are 1 and $-1$.'),
            right: say('$x$ bakoitzak bere $y$ du: ebazpenak $(1,3)$ eta $(-1,-3)$ dira.', 'Cada $x$ da su $y$: las soluciones son $(1,3)$ y $(-1,-3)$.', 'كل $x$ يعطي $y$ الخاص به: الحلان $(1,3)$ و$(-1,-3)$.', 'Each $x$ gives its own $y$: the solutions are $(1,3)$ and $(-1,-3)$.')
        },
        check: {
            prompt: say('Zenbat ebazpen ditu $y=x^{2}$, $y=-1$ sistemak?', '¿Cuántas soluciones tiene el sistema $y=x^{2}$, $y=-1$?', 'كم حلًا للنظام $y=x^{2}$، $y=-1$؟', 'How many solutions does the system $y=x^{2}$, $y=-1$ have?'),
            options: [say('Bat ere ez', 'Ninguna', 'لا حل', 'None'), say('Bat', 'Una', 'حل واحد', 'One'), say('Bi', 'Dos', 'حلان', 'Two')],
            correctIndex: 0,
            explanation: say('$x^{2}=-1$ ezinezkoa da: zuzena parabolaren azpitik doa.', '$x^{2}=-1$ es imposible: la recta pasa por debajo de la parábola.', '$x^{2}=-1$ مستحيلة: المستقيم يمر تحت القطع المكافئ.', '$x^{2}=-1$ is impossible: the line passes below the parabola.')
        }
    },
    squares: {
        mistake: {
            wrong: say('$x^{2}=9$ eta $y^{2}=1$: ebazpena $(3,1)$ da.', '$x^{2}=9$ e $y^{2}=1$: la solución es $(3,1)$.', '$x^{2}=9$ و$y^{2}=1$: الحل $(3,1)$.', '$x^{2}=9$ and $y^{2}=1$: the solution is $(3,1)$.'),
            right: say('Karratu bakoitzak bi zeinu ematen ditu: $(3,1)$, $(3,-1)$, $(-3,1)$ eta $(-3,-1)$.', 'Cada cuadrado da dos signos: $(3,1)$, $(3,-1)$, $(-3,1)$ y $(-3,-1)$.', 'كل مربع يعطي إشارتين: $(3,1)$ و$(3,-1)$ و$(-3,1)$ و$(-3,-1)$.', 'Each square gives two signs: $(3,1)$, $(3,-1)$, $(-3,1)$ and $(-3,-1)$.')
        },
        check: {
            prompt: say('Zenbat ebazpen ditu $x^{2}+y^{2}=5$, $x^{2}-y^{2}=3$ sistemak?', '¿Cuántas soluciones tiene $x^{2}+y^{2}=5$, $x^{2}-y^{2}=3$?', 'كم حلًا للنظام $x^{2}+y^{2}=5$، $x^{2}-y^{2}=3$؟', 'How many solutions does $x^{2}+y^{2}=5$, $x^{2}-y^{2}=3$ have?'),
            options: [say('Bi', 'Dos', 'حلان', 'Two'), say('Lau', 'Cuatro', 'أربعة', 'Four'), say('Bat', 'Una', 'حل واحد', 'One')],
            correctIndex: 1,
            explanation: say('$2x^{2}=8$, $x=\\pm 2$, eta $y^{2}=1$, $y=\\pm 1$: lau konbinazio.', '$2x^{2}=8$, $x=\\pm 2$, e $y^{2}=1$, $y=\\pm 1$: cuatro combinaciones.', '$2x^{2}=8$، $x=\\pm 2$، و$y^{2}=1$، $y=\\pm 1$: أربعة تراكيب.', '$2x^{2}=8$, $x=\\pm 2$, and $y^{2}=1$, $y=\\pm 1$: four combinations.')
        }
    },
    'check-solutions': {
        mistake: {
            wrong: say('$\\sqrt{x}=y$ eta $x=y+2$ sisteman, $y=2$ eta $y=-1$ ateratzen dira, eta biak dira baliozkoak.', 'En $\\sqrt{x}=y$ y $x=y+2$ salen $y=2$ e $y=-1$, y las dos valen.', 'في $\\sqrt{x}=y$ و$x=y+2$ نجد $y=2$ و$y=-1$، وكلاهما يصلح.', 'In $\\sqrt{x}=y$ and $x=y+2$ you get $y=2$ and $y=-1$, and both work.'),
            right: say('Erro karratu bat ez da negatiboa: $y=-1$ ez da baliozkoa. $(4,2)$ bakarrik.', 'Una raíz cuadrada no es negativa: $y=-1$ no vale. Solo $(4,2)$.', 'الجذر التربيعي ليس سالبًا: $y=-1$ لا يصلح. فقط $(4,2)$.', 'A square root is never negative: $y=-1$ does not work. Only $(4,2)$.')
        },
        check: {
            prompt: say('Zein da $xy=12$, $x-y=1$ sistemaren ebazpena?', '¿Cuál es solución de $xy=12$, $x-y=1$?', 'ما حل النظام $xy=12$، $x-y=1$؟', 'Which is a solution of $xy=12$, $x-y=1$?'),
            options: [same('$(4,3)$'), same('$(3,4)$'), same('$(-4,-3)$')],
            correctIndex: 0,
            explanation: same('$4\\cdot 3=12$, $4-3=1$')
        }
    },
    'half-plane': {
        mistake: {
            wrong: say('$x+y<3$ inekuazioan, $x+y=3$ zuzeneko puntuak ebazpenak dira.', 'En $x+y<3$ los puntos de la recta $x+y=3$ son solución.', 'في $x+y<3$ نقاط المستقيم $x+y=3$ حلول.', 'In $x+y<3$ the points of the line $x+y=3$ are solutions.'),
            right: say('$<$ ikurrarekin zuzena ez da sartzen (lerro etena); $\\le$ ikurrarekin, bai.', 'Con $<$ la recta no entra (línea discontinua); con $\\le$, sí.', 'مع $<$ لا يدخل المستقيم (خط متقطع)، ومع $\\le$ يدخل.', 'With $<$ the line is not included (dashed line); with $\\le$, it is.')
        },
        check: {
            prompt: say('Zein puntu dago $y>2x+1$ inekuazioaren ebazpenean?', '¿Qué punto está en la solución de $y>2x+1$?', 'أيّ نقطة تقع في حل $y>2x+1$؟', 'Which point is in the solution of $y>2x+1$?'),
            options: [same('$(1,1)$'), same('$(2,4)$'), same('$(0,2)$')],
            correctIndex: 2,
            explanation: say('$(0,2)$: $2>1$ egia da. $(1,1)$: $1>3$ faltsua; $(2,4)$: $4>5$ faltsua.', '$(0,2)$: $2>1$ es cierto. $(1,1)$: $1>3$ es falso; $(2,4)$: $4>5$ es falso.', '$(0,2)$: $2>1$ صحيح. $(1,1)$: $1>3$ خطأ؛ $(2,4)$: $4>5$ خطأ.', '$(0,2)$: $2>1$ is true. $(1,1)$: $1>3$ is false; $(2,4)$: $4>5$ is false.')
        }
    },
    region: {
        mistake: {
            wrong: say('Sistemaren ebazpena erdiplanoen bildura da.', 'La solución del sistema es la unión de los semiplanos.', 'حل النظام هو اتحاد أنصاف المستوى.', 'The solution of the system is the union of the half-planes.'),
            right: say('Zati komuna da, ebakidura: aldi berean guztiak betetzen dituzten puntuak.', 'Es la parte común, la intersección: los puntos que cumplen todas a la vez.', 'إنه الجزء المشترك، أي التقاطع: النقاط التي تحقق كل المتراجحات معًا.', 'It is the common part, the intersection: the points that satisfy all of them at once.')
        },
        check: {
            prompt: say('$(2,3)$ puntua $y\\ge 1$, $x\\le 4$, $y\\le x$ eskualdean dago?', '¿Está $(2,3)$ en la región $y\\ge 1$, $x\\le 4$, $y\\le x$?', 'هل تقع $(2,3)$ في المنطقة $y\\ge 1$، $x\\le 4$، $y\\le x$؟', 'Is $(2,3)$ in the region $y\\ge 1$, $x\\le 4$, $y\\le x$?'),
            options: [say('Bai', 'Sí', 'نعم', 'Yes'), say('Ez: $3>2$', 'No: $3>2$', 'لا: $3>2$', 'No: $3>2$'), say('Ez: $2<4$', 'No: $2<4$', 'لا: $2<4$', 'No: $2<4$')],
            correctIndex: 1,
            explanation: say('$y\\le x$ betetzeko $3\\le 2$ behar da, eta hori faltsua da.', 'Para cumplir $y\\le x$ haría falta $3\\le 2$, que es falso.', 'لتحقيق $y\\le x$ يلزم $3\\le 2$، وهذا خطأ.', 'To satisfy $y\\le x$ you would need $3\\le 2$, which is false.')
        }
    },
    'linear-problems': {
        mistake: {
            wrong: say('$x$ oiloak eta $y$ untxiak badira, hankak $x+y=56$ dira.', 'Si $x$ son las gallinas e $y$ los conejos, las patas son $x+y=56$.', 'إذا كان $x$ الدجاج و$y$ الأرانب فالأرجل $x+y=56$.', 'If $x$ is the hens and $y$ the rabbits, the legs are $x+y=56$.'),
            right: say('Oiloek 2 hanka dituzte eta untxiek 4: $2x+4y=56$.', 'Las gallinas tienen 2 patas y los conejos 4: $2x+4y=56$.', 'للدجاجة رجلان وللأرنب 4: $2x+4y=56$.', 'Hens have 2 legs and rabbits 4: $2x+4y=56$.')
        },
        check: {
            prompt: say('Helduen sarrerak 8 € balio du eta haurrenak 5 €. 7 sarrera 44 € dira. Zein da sistema?', 'Una entrada de adulto cuesta 8 € y una de niño 5 €. Por 7 entradas se pagan 44 €. ¿Qué sistema es?', 'تذكرة الكبير بسعر 8 € وتذكرة الطفل 5 €. ثمن 7 تذاكر 44 €. ما النظام؟', 'An adult ticket costs €8 and a child ticket €5. 7 tickets cost €44. Which system is it?'),
            options: [same('$x+y=7,\\ 8x+5y=44$'), same('$x+y=44,\\ 8x+5y=7$'), same('$8x+5y=7\\cdot 44$')],
            correctIndex: 0,
            explanation: say('Sarrera kopurua: $x+y=7$. Dirua: $8x+5y=44$. Ebazpena: 3 heldu eta 4 haur.', 'Número de entradas: $x+y=7$. Dinero: $8x+5y=44$. Solución: 3 de adulto y 4 de niño.', 'عدد التذاكر: $x+y=7$. المال: $8x+5y=44$. الحل: 3 للكبار و4 للأطفال.', 'Number of tickets: $x+y=7$. Money: $8x+5y=44$. Solution: 3 adults and 4 children.')
        }
    },
    'nonlinear-problems': {
        mistake: {
            wrong: say('20 cm-ko perimetroa duen laukizuzenak $x+y=20$ betetzen du.', 'Un rectángulo de 20 cm de perímetro cumple $x+y=20$.', 'مستطيل محيطه 20 سم يحقق $x+y=20$.', 'A rectangle with a 20 cm perimeter satisfies $x+y=20$.'),
            right: say('Perimetroa $2x+2y=20$ da: $x+y=10$.', 'El perímetro es $2x+2y=20$: $x+y=10$.', 'المحيط $2x+2y=20$: $x+y=10$.', 'The perimeter is $2x+2y=20$: $x+y=10$.')
        },
        check: {
            prompt: say('Laukizuzen batek 24 cm² azalera eta 10 cm-ko diagonala ditu. Zein da sistema?', 'Un rectángulo tiene 24 cm² de área y 10 cm de diagonal. ¿Qué sistema es?', 'مستطيل مساحته 24 سم² وقطره 10 سم. ما النظام؟', 'A rectangle has an area of 24 cm² and a 10 cm diagonal. Which system is it?'),
            options: [same('$xy=24,\\ x+y=10$'), same('$xy=24,\\ x^{2}+y^{2}=100$'), same('$x+y=24,\\ x^{2}+y^{2}=10$')],
            correctIndex: 1,
            explanation: say('Azalera $xy$ da, eta diagonala Pitagorasekin: $x^{2}+y^{2}=10^{2}$. Aldeak 8 eta 6 cm.', 'El área es $xy$, y la diagonal, por Pitágoras: $x^{2}+y^{2}=10^{2}$. Los lados, 8 y 6 cm.', 'المساحة $xy$، والقطر بفيثاغورس: $x^{2}+y^{2}=10^{2}$. الضلعان 8 و6 سم.', 'The area is $xy$, and the diagonal by Pythagoras: $x^{2}+y^{2}=10^{2}$. The sides are 8 and 6 cm.')
        }
    },
    'region-problems': {
        mistake: {
            wrong: say('$3x+2y\\le 12$ inekuazioarekin $x=1{,}5$ ogitarteko eros ditzaket.', 'En $3x+2y\\le 12$ puedo comprar $x=1{,}5$ bocadillos.', 'في $3x+2y\\le 12$ يمكنني شراء $x=1{,}5$ شطيرة.', 'In $3x+2y\\le 12$ I can buy $x=1{,}5$ sandwiches.'),
            right: say('Ogitartekoak osorik zenbatzen dira: koordenatu osoko puntuak bakarrik dira baliozkoak.', 'Los bocadillos se cuentan enteros: solo valen los puntos de coordenadas enteras.', 'الشطائر تُعدّ كاملة: لا تصلح إلا النقاط ذات الإحداثيات الصحيحة.', 'Sandwiches come whole: only points with whole-number coordinates count.')
        },
        check: {
            prompt: say('12 €, 3 €-ko ogitartekoak eta 2 €-ko freskagarriak: 2 ogitarteko eta 3 freskagarri eros daitezke?', 'Con 12 €, bocadillos de 3 € y refrescos de 2 €: ¿se pueden comprar 2 bocadillos y 3 refrescos?', 'مع 12 €، وشطائر بسعر 3 € ومشروبات بسعر 2 €: هل يمكن شراء شطيرتين و3 مشروبات؟', 'With €12, €3 sandwiches and €2 drinks: can you buy 2 sandwiches and 3 drinks?'),
            options: [say('Bai, 12 € zehatz', 'Sí, justo 12 €', 'نعم، 12 € بالضبط', 'Yes, exactly €12'), say('Ez, 13 € dira', 'No, cuesta 13 €', 'لا، الثمن 13 €', 'No, it costs €13'), say('Ez, 15 € dira', 'No, cuesta 15 €', 'لا، الثمن 15 €', 'No, it costs €15')],
            correctIndex: 0,
            explanation: say('$3\\cdot 2+2\\cdot 3=12\\le 12$: $(2,3)$ puntua eskualdean dago, ertzean.', '$3\\cdot 2+2\\cdot 3=12\\le 12$: el punto $(2,3)$ está en la región, en el borde.', '$3\\cdot 2+2\\cdot 3=12\\le 12$: النقطة $(2,3)$ في المنطقة، على حدّها.', '$3\\cdot 2+2\\cdot 3=12\\le 12$: the point $(2,3)$ is in the region, on its edge.')
        }
    }
}

import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Ekuazioak eta sistemak · 4. DBH aplikatuak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. The questions use new
   numbers, never those of «Let's solve» or of the example, and one of their
   wrong answers is the lesson's typical mistake. tests/lesson-checks.test.ts
   solves the equations: every answer «x = …» has to satisfy them.
   ========================================================================== */

export type EquationsSystemsTopicId = 'brackets' | 'denominators' | 'linear-problems' | 'incomplete' | 'formula' | 'discriminant' | 'factored' | 'radical' | 'quadratic-problems' | 'two-unknowns' | 'graphic' | 'substitution' | 'equalization' | 'reduction' | 'system-problems'

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const equationsSystemsLessonChecks: Record<EquationsSystemsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. First-degree equations ---------- */
    brackets: {
        mistake: {
            wrong: same('$7-(x-3)=7-x-3$'),
            right: say('Minusak parentesiko zeinu guztiak aldatzen ditu: $7-(x-3)=7-x+3$.', 'El menos cambia todos los signos del paréntesis: $7-(x-3)=7-x+3$.', 'الناقص يغيّر كل إشارات القوس: $7-(x-3)=7-x+3$.', 'The minus changes every sign in the brackets: $7-(x-3)=7-x+3$.')
        },
        check: {
            prompt: say('Ebatzi $2(x-3)=x+1$.', 'Resuelve $2(x-3)=x+1$.', 'حلّ $2(x-3)=x+1$.', 'Solve $2(x-3)=x+1$.'),
            options: [same('$x=4$'), same('$x=7$'), same('$x=-5$')],
            correctIndex: 1,
            explanation: say('$2x-6=x+1$, beraz $x=7$. 2 zenbakiak parentesiko bi gaiak biderkatzen ditu.', '$2x-6=x+1$, así que $x=7$. El 2 multiplica los dos términos del paréntesis.', '$2x-6=x+1$، إذن $x=7$. العدد 2 يضرب حدّي القوس كليهما.', '$2x-6=x+1$, so $x=7$. The 2 multiplies both terms in the brackets.')
        }
    },
    denominators: {
        mistake: {
            wrong: say('$\\frac{x}{3}+1=\\frac{x}{2}$, bider 6: $2x+1=3x$.', '$\\frac{x}{3}+1=\\frac{x}{2}$, por 6: $2x+1=3x$.', '$\\frac{x}{3}+1=\\frac{x}{2}$، بالضرب في 6: $2x+1=3x$.', '$\\frac{x}{3}+1=\\frac{x}{2}$, times 6: $2x+1=3x$.'),
            right: say('1 zenbakia ere biderkatzen da: $2x+6=3x$, eta $x=6$.', 'El 1 también se multiplica: $2x+6=3x$, y $x=6$.', 'العدد 1 يُضرب أيضًا: $2x+6=3x$، و$x=6$.', 'The 1 is multiplied too: $2x+6=3x$, and $x=6$.')
        },
        check: {
            prompt: say('Ebatzi $\\frac{x}{2}+3=\\frac{x}{3}+5$.', 'Resuelve $\\frac{x}{2}+3=\\frac{x}{3}+5$.', 'حلّ $\\frac{x}{2}+3=\\frac{x}{3}+5$.', 'Solve $\\frac{x}{2}+3=\\frac{x}{3}+5$.'),
            options: [same('$x=12$'), same('$x=2$'), same('$x=-12$')],
            correctIndex: 0,
            explanation: say('Bider 6 gai guztiak: $3x+18=2x+30$, beraz $x=12$.', 'Por 6 todos los términos: $3x+18=2x+30$, así que $x=12$.', 'نضرب كل الحدود في 6: $3x+18=2x+30$، إذن $x=12$.', 'Times 6, every term: $3x+18=2x+30$, so $x=12$.')
        }
    },
    'linear-problems': {
        mistake: {
            wrong: say('5 urte barru: Martak $x+5$ eta Albertok $4x$.', 'Dentro de 5 años: Marta $x+5$ y Alberto $4x$.', 'بعد 5 سنوات: مارتا $x+5$ وألبرتو $4x$.', 'In 5 years: Marta $x+5$ and Alberto $4x$.'),
            right: say('Urteak biontzat pasatzen dira: Albertok $4x+5$ izango ditu.', 'Los años pasan para los dos: Alberto tendrá $4x+5$.', 'السنوات تمرّ على الاثنين: سيكون عمر ألبرتو $4x+5$.', 'The years go by for both of them: Alberto will be $4x+5$.')
        },
        check: {
            prompt: say('Hiru zenbaki jarraien batura 72 da. Zein da txikiena?', 'La suma de tres números consecutivos es 72. ¿Cuál es el menor?', 'مجموع ثلاثة أعداد متتالية 72. ما أصغرها؟', 'Three consecutive numbers add up to 72. What is the smallest?'),
            options: [same('$24$'), same('$22$'), same('$23$')],
            correctIndex: 2,
            explanation: say('$x+(x+1)+(x+2)=72$, $3x=69$ eta $x=23$: 23, 24 eta 25. 24 erdikoa da.', '$x+(x+1)+(x+2)=72$, $3x=69$ y $x=23$: 23, 24 y 25. El 24 es el del medio.', '$x+(x+1)+(x+2)=72$، و$3x=69$، و$x=23$: 23 و24 و25. أما 24 فهو الأوسط.', '$x+(x+1)+(x+2)=72$, $3x=69$ and $x=23$: 23, 24 and 25. 24 is the middle one.')
        }
    },
    /* ---------- 2. Quadratic equations ---------- */
    incomplete: {
        mistake: {
            wrong: say('$x^{2}=3x$; $x$ zenbakiaz zatituz, $x=3$.', '$x^{2}=3x$; divido entre $x$: $x=3$.', '$x^{2}=3x$؛ بالقسمة على $x$: $x=3$.', '$x^{2}=3x$; dividing by $x$: $x=3$.'),
            right: say('$x$ zenbakiaz zatitzean $x=0$ galtzen da: $x(x-3)=0$, $x=0$ edo $x=3$.', 'Al dividir entre $x$ se pierde $x=0$: $x(x-3)=0$, $x=0$ o $x=3$.', 'بالقسمة على $x$ نفقد $x=0$: $x(x-3)=0$، $x=0$ أو $x=3$.', 'Dividing by $x$ loses $x=0$: $x(x-3)=0$, $x=0$ or $x=3$.')
        },
        check: {
            prompt: say('Ebatzi $4x^{2}=12x$.', 'Resuelve $4x^{2}=12x$.', 'حلّ $4x^{2}=12x$.', 'Solve $4x^{2}=12x$.'),
            options: [same('$x=3$'), same('$x=0,\\ x=3$'), same('$x=0,\\ x=-3$')],
            correctIndex: 1,
            explanation: say('$4x^{2}-12x=0$, $4x(x-3)=0$: $x=0$ edo $x=3$.', '$4x^{2}-12x=0$, $4x(x-3)=0$: $x=0$ o $x=3$.', '$4x^{2}-12x=0$، $4x(x-3)=0$: $x=0$ أو $x=3$.', '$4x^{2}-12x=0$, $4x(x-3)=0$: $x=0$ or $x=3$.')
        }
    },
    formula: {
        mistake: {
            wrong: say('$x^{2}-6x+5=0$ ekuazioan: $\\frac{-6\\pm\\sqrt{36-20}}{2}$.', 'En $x^{2}-6x+5=0$: $\\frac{-6\\pm\\sqrt{36-20}}{2}$.', 'في $x^{2}-6x+5=0$: $\\frac{-6\\pm\\sqrt{36-20}}{2}$.', 'In $x^{2}-6x+5=0$: $\\frac{-6\\pm\\sqrt{36-20}}{2}$.'),
            right: say('$b=-6$ denez, $-b=6$: $\\frac{6\\pm\\sqrt{36-20}}{2}$; beraz, $x=5$ eta $x=1$.', 'Con $b=-6$, $-b=6$: $\\frac{6\\pm\\sqrt{36-20}}{2}$, y $x=5$, $x=1$.', 'مع $b=-6$ يكون $-b=6$: $\\frac{6\\pm\\sqrt{36-20}}{2}$، و$x=5$ و$x=1$.', 'With $b=-6$, $-b=6$: $\\frac{6\\pm\\sqrt{36-20}}{2}$, and $x=5$, $x=1$.')
        },
        check: {
            prompt: say('Ebatzi $x^{2}+x-12=0$.', 'Resuelve $x^{2}+x-12=0$.', 'حلّ $x^{2}+x-12=0$.', 'Solve $x^{2}+x-12=0$.'),
            options: [same('$x=-3,\\ x=4$'), same('$x=3,\\ x=4$'), same('$x=3,\\ x=-4$')],
            correctIndex: 2,
            explanation: say('$a=1$, $b=1$, $c=-12$: $x=\\frac{-1\\pm\\sqrt{1+48}}{2}=\\frac{-1\\pm 7}{2}$.', '$a=1$, $b=1$, $c=-12$: $x=\\frac{-1\\pm\\sqrt{1+48}}{2}=\\frac{-1\\pm 7}{2}$.', '$a=1$، $b=1$، $c=-12$: $x=\\frac{-1\\pm\\sqrt{1+48}}{2}=\\frac{-1\\pm 7}{2}$.', '$a=1$, $b=1$, $c=-12$: $x=\\frac{-1\\pm\\sqrt{1+48}}{2}=\\frac{-1\\pm 7}{2}$.')
        }
    },
    discriminant: {
        mistake: {
            wrong: say('$x^{2}+4x+5=0$: $\\Delta=16+20=36$, bi ebazpen.', '$x^{2}+4x+5=0$: $\\Delta=16+20=36$, dos soluciones.', '$x^{2}+4x+5=0$: $\\Delta=16+20=36$، حلان.', '$x^{2}+4x+5=0$: $\\Delta=16+20=36$, two solutions.'),
            right: say('$-4ac=-20$: $\\Delta=16-20=-4<0$, ez dago ebazpenik.', '$-4ac=-20$: $\\Delta=16-20=-4<0$, no hay solución.', '$-4ac=-20$: $\\Delta=16-20=-4<0$، لا حل.', '$-4ac=-20$: $\\Delta=16-20=-4<0$, there is no solution.')
        },
        check: {
            prompt: say('Zenbat ebazpen ditu $x^{2}-6x+10=0$ ekuazioak?', '¿Cuántas soluciones tiene $x^{2}-6x+10=0$?', 'كم حلًا للمعادلة $x^{2}-6x+10=0$؟', 'How many solutions does $x^{2}-6x+10=0$ have?'),
            options: [say('Bi', 'Dos', 'حلان', 'Two'), say('Bat', 'Una', 'حل واحد', 'One'), say('Bat ere ez', 'Ninguna', 'لا حل', 'None')],
            correctIndex: 2,
            explanation: say('$\\Delta=36-40=-4$: negatiboa da, eta ez dago erro errealik.', '$\\Delta=36-40=-4$: es negativo y no hay raíz real.', '$\\Delta=36-40=-4$: سالب ولا جذر حقيقي.', '$\\Delta=36-40=-4$: it is negative, and there is no real root.')
        }
    },
    /* ---------- 3. Other equations ---------- */
    factored: {
        mistake: {
            wrong: say('$(x-1)(x-2)=6$: $x-1=6$ edo $x-2=6$.', '$(x-1)(x-2)=6$: $x-1=6$ o $x-2=6$.', '$(x-1)(x-2)=6$: $x-1=6$ أو $x-2=6$.', '$(x-1)(x-2)=6$: $x-1=6$ or $x-2=6$.'),
            right: say('Biderkadura 0 denean bakarrik balio du. Garatu: $x^{2}-3x-4=0$, $x=4$ eta $x=-1$.', 'Solo vale con un producto igual a 0. Desarrolla: $x^{2}-3x-4=0$, $x=4$ y $x=-1$.', 'لا يصح إلا إذا كان الجداء 0. انشر: $x^{2}-3x-4=0$، $x=4$ و$x=-1$.', 'It only works when the product is 0. Expand: $x^{2}-3x-4=0$, $x=4$ and $x=-1$.')
        },
        check: {
            prompt: say('Ebatzi $x(x+6)(x-1)=0$.', 'Resuelve $x(x+6)(x-1)=0$.', 'حلّ $x(x+6)(x-1)=0$.', 'Solve $x(x+6)(x-1)=0$.'),
            options: [same('$x=-6,\\ x=1$'), same('$x=0,\\ x=-6,\\ x=1$'), same('$x=0,\\ x=6,\\ x=-1$')],
            correctIndex: 1,
            explanation: say('Hiru faktore, hiru ebazpen: $x=0$ ere bai, lehen faktorea $x$ delako.', 'Tres factores, tres soluciones: también $x=0$, porque el primer factor es $x$.', 'ثلاثة عوامل، ثلاثة حلول: و$x=0$ أيضًا لأن العامل الأول هو $x$.', 'Three factors, three solutions: $x=0$ as well, because the first factor is $x$.')
        }
    },
    radical: {
        mistake: {
            wrong: say('$\\sqrt{x}+2=x$: karratura jasoz, $x+4=x^{2}$.', '$\\sqrt{x}+2=x$: elevo al cuadrado, $x+4=x^{2}$.', '$\\sqrt{x}+2=x$: بالتربيع، $x+4=x^{2}$.', '$\\sqrt{x}+2=x$: squaring, $x+4=x^{2}$.'),
            right: say('Lehenik bakandu erroa: $\\sqrt{x}=x-2$. Gero, $x=(x-2)^{2}$.', 'Primero aísla la raíz: $\\sqrt{x}=x-2$. Después, $x=(x-2)^{2}$.', 'اعزل الجذر أولًا: $\\sqrt{x}=x-2$. ثم $x=(x-2)^{2}$.', 'First isolate the root: $\\sqrt{x}=x-2$. Then $x=(x-2)^{2}$.')
        },
        check: {
            prompt: say('Ebatzi $\\sqrt{x+6}=x$.', 'Resuelve $\\sqrt{x+6}=x$.', 'حلّ $\\sqrt{x+6}=x$.', 'Solve $\\sqrt{x+6}=x$.'),
            options: [same('$x=3,\\ x=-2$'), same('$x=-2$'), same('$x=3$')],
            correctIndex: 2,
            explanation: say('$x^{2}-x-6=0$ ekuazioak $3$ eta $-2$ ematen ditu, baina $\\sqrt{4}=2\\neq -2$: $x=3$ bakarrik.', '$x^{2}-x-6=0$ da $3$ y $-2$, pero $\\sqrt{4}=2\\neq -2$: solo $x=3$.', '$x^{2}-x-6=0$ تعطي $3$ و$-2$، لكن $\\sqrt{4}=2\\neq -2$: الحل $x=3$ فقط.', '$x^{2}-x-6=0$ gives $3$ and $-2$, but $\\sqrt{4}=2\\neq -2$: only $x=3$.')
        }
    },
    'quadratic-problems': {
        mistake: {
            wrong: say('Alde batek $x=-7$ cm neurtzen du.', 'Un lado mide $x=-7$ cm.', 'طول ضلع $x=-7$ سم.', 'One side is $x=-7$ cm.'),
            right: say('Luzera bat ezin da negatiboa izan: ebazpen hori baztertu egiten da.', 'Una longitud no puede ser negativa: esa solución se descarta.', 'لا يمكن أن يكون الطول سالبًا: يُستبعد ذلك الحل.', 'A length cannot be negative: that solution is discarded.')
        },
        check: {
            prompt: say('Laukizuzen bat zabala baino 4 cm luzeagoa da eta haren azalera 21 cm² da. Zenbat neurtzen du zabalerak?', 'Un rectángulo mide 4 cm más de largo que de ancho y su área es 21 cm². ¿Cuánto mide de ancho?', 'طول مستطيل يزيد على عرضه 4 سم ومساحته 21 سم². كم عرضه؟', 'A rectangle is 4 cm longer than it is wide and its area is 21 cm². How wide is it?'),
            options: [say('$3$ cm', '$3$ cm', '$3$ سم', '$3$ cm'), say('$-7$ cm', '$-7$ cm', '$-7$ سم', '$-7$ cm'), say('$7$ cm', '$7$ cm', '$7$ سم', '$7$ cm')],
            correctIndex: 0,
            explanation: say('$x(x+4)=21$ ekuazioak $3$ eta $-7$ ematen ditu; luzera bat ezin da negatiboa izan: 3 cm.', '$x(x+4)=21$ da $3$ y $-7$; una longitud no puede ser negativa: 3 cm.', '$x(x+4)=21$ تعطي $3$ و$-7$؛ لا يكون الطول سالبًا: 3 سم.', '$x(x+4)=21$ gives $3$ and $-7$; a length cannot be negative: 3 cm.')
        }
    },
    /* ---------- 4. Systems ---------- */
    'two-unknowns': {
        mistake: {
            wrong: say('$(3,\\,1)$ bikotea $2x+y=5$ ekuazioaren ebazpena da, $2\\cdot 1+3=5$ delako.', '$(3,\\,1)$ es solución de $2x+y=5$, porque $2\\cdot 1+3=5$.', '$(3,\\,1)$ حل لـ$2x+y=5$ لأن $2\\cdot 1+3=5$.', '$(3,\\,1)$ is a solution of $2x+y=5$, because $2\\cdot 1+3=5$.'),
            right: say('Lehen zenbakia $x$ da eta bigarrena $y$: $2\\cdot 3+1=7\\neq 5$; ez da ebazpena.', 'El primer número es $x$ y el segundo, $y$: $2\\cdot 3+1=7\\neq 5$, no es solución.', 'العدد الأول $x$ والثاني $y$: $2\\cdot 3+1=7\\neq 5$، ليس حلًا.', 'The first number is $x$ and the second is $y$: $2\\cdot 3+1=7\\neq 5$, it is not a solution.')
        },
        check: {
            prompt: say('Zein bikote da $x+2y=8$ ekuazioaren ebazpena?', '¿Qué pareja es solución de $x+2y=8$?', 'أيّ زوج حل لـ$x+2y=8$؟', 'Which pair is a solution of $x+2y=8$?'),
            options: [same('$(3,\\,2)$'), same('$(4,\\,1)$'), same('$(2,\\,3)$')],
            correctIndex: 2,
            explanation: say('$x=2$ eta $y=3$: $2+2\\cdot 3=8$. $(3,\\,2)$ bikotean zenbakiak trukatuta daude.', '$x=2$ e $y=3$: $2+2\\cdot 3=8$. En $(3,\\,2)$ los números están cambiados.', '$x=2$ و$y=3$: $2+2\\cdot 3=8$. وفي $(3,\\,2)$ العددان مقلوبان.', '$x=2$ and $y=3$: $2+2\\cdot 3=8$. In $(3,\\,2)$ the numbers are swapped.')
        }
    },
    graphic: {
        mistake: {
            wrong: say('$(1,\\,2)$ bikoteak $x+y=3$ betetzen du; beraz, $x+y=3$, $x-y=1$ sistemaren ebazpena da.', '$(1,\\,2)$ cumple $x+y=3$, así que es la solución del sistema $x+y=3$, $x-y=1$.', '$(1,\\,2)$ يحقق $x+y=3$، إذن هو حل النظام $x+y=3$، $x-y=1$.', '$(1,\\,2)$ satisfies $x+y=3$, so it is the solution of the system $x+y=3$, $x-y=1$.'),
            right: say('Biak bete behar ditu: $1-2=-1\\neq 1$. Ebazpena $(2,\\,1)$ da.', 'Tiene que cumplir las dos: $1-2=-1\\neq 1$. La solución es $(2,\\,1)$.', 'يجب أن يحقق المعادلتين: $1-2=-1\\neq 1$. الحل $(2,\\,1)$.', 'It has to satisfy both: $1-2=-1\\neq 1$. The solution is $(2,\\,1)$.')
        },
        check: {
            prompt: say('Nolako sistema da $x+y=2$, $2x+2y=6$?', '¿Qué tipo de sistema es $x+y=2$, $2x+2y=6$?', 'ما نوع النظام $x+y=2$، $2x+2y=6$؟', 'What kind of system is $x+y=2$, $2x+2y=6$?'),
            options: [
                say('Bateragarri determinatua', 'Compatible determinado', 'متوافق محدد', 'Consistent and independent'),
                say('Bateraezina', 'Incompatible', 'غير متوافق', 'Inconsistent'),
                say('Bateragarri indeterminatua', 'Compatible indeterminado', 'متوافق غير محدد', 'Consistent and dependent')
            ],
            correctIndex: 1,
            explanation: say('Bigarrena zati 2 eginda, $x+y=3$: zuzen paraleloak dira, ez dago ebazpenik.', 'La segunda, entre 2, es $x+y=3$: son rectas paralelas y no hay solución.', 'الثانية مقسومة على 2 هي $x+y=3$: مستقيمان متوازيان ولا حل.', 'The second, divided by 2, is $x+y=3$: the lines are parallel and there is no solution.')
        }
    },
    substitution: {
        mistake: {
            wrong: say('$2x-y=1$ ekuazioan $y=5-x$ ordeztuz: $2x-5-x=1$.', 'En $2x-y=1$ con $y=5-x$: $2x-5-x=1$.', 'في $2x-y=1$ مع $y=5-x$: $2x-5-x=1$.', 'In $2x-y=1$ with $y=5-x$: $2x-5-x=1$.'),
            right: say('$y$ parentesi artean doa: $2x-(5-x)=2x-5+x$.', 'La $y$ va entre paréntesis: $2x-(5-x)=2x-5+x$.', 'يوضع $y$ بين قوسين: $2x-(5-x)=2x-5+x$.', 'The $y$ goes in brackets: $2x-(5-x)=2x-5+x$.')
        },
        check: {
            prompt: say('$y=2x$, $x+y=9$ sisteman, zenbat da $x$?', 'En el sistema $y=2x$, $x+y=9$, ¿cuánto vale $x$?', 'في النظام $y=2x$، $x+y=9$، كم يساوي $x$؟', 'In the system $y=2x$, $x+y=9$, what is $x$?'),
            options: [same('$x=9$'), same('$x=3$'), same('$x=4{,}5$')],
            correctIndex: 1,
            explanation: say('Ordeztu $y=2x$: $x+2x=9$, $3x=9$ eta $x=3$; orduan $y=6$.', 'Sustituye $y=2x$: $x+2x=9$, $3x=9$ y $x=3$; entonces $y=6$.', 'عوّض $y=2x$: $x+2x=9$، $3x=9$ و$x=3$؛ إذن $y=6$.', 'Substitute $y=2x$: $x+2x=9$, $3x=9$ and $x=3$; then $y=6$.')
        }
    },
    /* ---------- 5. Methods ---------- */
    equalization: {
        mistake: {
            wrong: say('$x+y=8$ eta $y-x=2$ sistematik: $8-y=2+x$.', 'De $x+y=8$ e $y-x=2$: $8-y=2+x$.', 'من $x+y=8$ و$y-x=2$: $8-y=2+x$.', 'From $x+y=8$ and $y-x=2$: $8-y=2+x$.'),
            right: say('Ezezagun bera askatuta berdintzen da: $x=8-y$ eta $x=y-2$, beraz $8-y=y-2$.', 'Se iguala la misma incógnita despejada: $x=8-y$ y $x=y-2$, así que $8-y=y-2$.', 'نساوي المجهول نفسه بعد عزله: $x=8-y$ و$x=y-2$، إذن $8-y=y-2$.', 'You equate the same unknown after solving for it: $x=8-y$ and $x=y-2$, so $8-y=y-2$.')
        },
        check: {
            prompt: say('Ebatzi berdinketaz: $y=2x+3$ eta $y=4x-1$.', 'Resuelve por igualación: $y=2x+3$ e $y=4x-1$.', 'حلّ بطريقة المساواة: $y=2x+3$ و$y=4x-1$.', 'Solve by equating: $y=2x+3$ and $y=4x-1$.'),
            options: [
                say('$x=1$, $y=5$', '$x=1$, $y=5$', '$x=1$، $y=5$', '$x=1$, $y=5$'),
                say('$x=2$, $y=3$', '$x=2$, $y=3$', '$x=2$، $y=3$', '$x=2$, $y=3$'),
                say('$x=2$, $y=7$', '$x=2$, $y=7$', '$x=2$، $y=7$', '$x=2$, $y=7$')
            ],
            correctIndex: 2,
            explanation: say('$2x+3=4x-1$, beraz $x=2$, eta $y=2\\cdot 2+3=7$.', '$2x+3=4x-1$, así que $x=2$, e $y=2\\cdot 2+3=7$.', '$2x+3=4x-1$، إذن $x=2$، و$y=2\\cdot 2+3=7$.', '$2x+3=4x-1$, so $x=2$, and $y=2\\cdot 2+3=7$.')
        }
    },
    reduction: {
        mistake: {
            wrong: say('$x+2y=5$ bider 3: $3x+2y=15$.', 'Multiplico $x+2y=5$ por 3: $3x+2y=15$.', 'أضرب $x+2y=5$ في 3: $3x+2y=15$.', 'Multiplying $x+2y=5$ by 3: $3x+2y=15$.'),
            right: say('Gai GUZTIAK biderkatzen dira: $3x+6y=15$.', 'Se multiplican TODOS los términos: $3x+6y=15$.', 'نضرب كل الحدود: $3x+6y=15$.', 'ALL the terms are multiplied: $3x+6y=15$.')
        },
        check: {
            prompt: say('$2x+5y=1$ eta $3x-5y=14$ sisteman, zenbat da $x$?', 'En $2x+5y=1$ y $3x-5y=14$, ¿cuánto vale $x$?', 'في $2x+5y=1$ و$3x-5y=14$، كم يساوي $x$؟', 'In $2x+5y=1$ and $3x-5y=14$, what is $x$?'),
            options: [same('$x=3$'), same('$x=15$'), same('$x=5$')],
            correctIndex: 0,
            explanation: say('$y$ aldagaiaren koefizienteak aurkakoak dira; batu: $5x=15$, $x=3$.', 'Los coeficientes de $y$ son opuestos; suma: $5x=15$, $x=3$.', 'معاملا $y$ متعاكسان؛ اجمع: $5x=15$، $x=3$.', 'The coefficients of $y$ are opposites; add: $5x=15$, $x=3$.')
        }
    },
    'system-problems': {
        mistake: {
            wrong: say('20 buru eta 56 hanka: $x+y=56$, $2x+4y=20$.', '20 cabezas y 56 patas: $x+y=56$, $2x+4y=20$.', '20 رأسًا و56 رجلًا: $x+y=56$، $2x+4y=20$.', '20 heads and 56 legs: $x+y=56$, $2x+4y=20$.'),
            right: say('Baldintza bakoitza bere magnitudearekin: buruak $x+y=20$, hankak $2x+4y=56$.', 'Cada condición con su magnitud: cabezas $x+y=20$, patas $2x+4y=56$.', 'كل شرط بمقداره: الرؤوس $x+y=20$، والأرجل $2x+4y=56$.', 'Each condition with its own quantity: heads $x+y=20$, legs $2x+4y=56$.')
        },
        check: {
            prompt: say('Denda batean 30 bizikleta eta triziklo daude, 70 gurpilekin. Zenbat triziklo daude?', 'En una tienda hay 30 bicis y triciclos, con 70 ruedas. ¿Cuántos triciclos hay?', 'في متجر 30 دراجة ودراجة ثلاثية، فيها 70 عجلة. كم دراجة ثلاثية؟', 'A shop has 30 bikes and tricycles, with 70 wheels. How many tricycles are there?'),
            options: [same('$20$'), same('$10$'), same('$15$')],
            correctIndex: 1,
            explanation: say('$x+y=30$ eta $2x+3y=70$: lehena bider 2 eta kendu, $y=10$ triziklo (eta 20 bizikleta).', '$x+y=30$ y $2x+3y=70$: la primera por 2 y resta, $y=10$ triciclos (y 20 bicis).', '$x+y=30$ و$2x+3y=70$: الأولى في 2 ثم اطرح، $y=10$ دراجات ثلاثية (و20 دراجة).', '$x+y=30$ and $2x+3y=70$: the first times 2, then subtract, $y=10$ tricycles (and 20 bikes).')
        }
    }
}

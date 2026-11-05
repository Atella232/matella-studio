import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Ekuazio-sistemak · Batxilergoa 1 · Zientziak — the typical mistake and
   the «Check it» question of every lesson. Plain data (no JSX) so the tests
   can import it; lessons.tsx merges it into the topics. The questions use
   new numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake. Systems are asked
   inside \begin{cases}, so the automatic check of single equations leaves
   them alone; the tests of this unit check them instead.
   ========================================================================== */

export type BachSystemsTopicId =
    | 'linear-equations' | 'classify-systems' | 'equivalent-systems'
    | 'triangular-systems' | 'gauss-method' | 'augmented-matrix' | 'three-unknown-problems'
    | 'solutions-count' | 'parametric-solutions' | 'parameter-discussion'
    | 'nonlinear-substitution' | 'radical-log-systems' | 'exponential-systems' | 'nonlinear-problems'
    | 'half-plane-regions' | 'region-cases'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachSystemsLessonChecks: Record<BachSystemsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Linear systems ---------- */
    'linear-equations': {
        mistake: {
            wrong: say('$x=4$, $y=1$: sistemaren bi soluzio.', '$x=4$, $y=1$: dos soluciones del sistema.', '$x=4$ و$y=1$: حلّان للنظام.', '$x=4$, $y=1$: two solutions of the system.'),
            right: say('Soluzio bakarra da, $(4,1)$ bikotea: zenbaki bakoitza ezezagun baten balioa da.', 'Es una sola solución, el par $(4,1)$: cada número es el valor de una incógnita.', 'إنه حل واحد هو الزوج $(4,1)$: كل عدد قيمة مجهول.', 'It is one solution, the pair $(4,1)$: each number is the value of one unknown.')
        },
        check: {
            prompt: say('Hirukote hauetako zein da $x+y+z=4$ eta $x-y=2$ ekuazioen soluzioa?', '¿Cuál de estas ternas es solución de $x+y+z=4$ y $x-y=2$?', 'أي هذه الثلاثيات حل للمعادلتين $x+y+z=4$ و$x-y=2$؟', 'Which of these triples is a solution of $x+y+z=4$ and $x-y=2$?'),
            options: [same('$(3,1,0)$'), same('$(1,3,0)$'), same('$(4,2,0)$')],
            correctIndex: 0,
            explanation: say('$3+1+0=4$ eta $3-1=2$.', '$3+1+0=4$ y $3-1=2$.', '$3+1+0=4$ و$3-1=2$.', '$3+1+0=4$ and $3-1=2$.')
        }
    },
    'classify-systems': {
        mistake: {
            wrong: say('Kentzean $0x+0y=0$ ateratzen da: sistemak ez du soluziorik.', 'Al restar sale $0x+0y=0$: el sistema no tiene solución.', 'بالطرح نحصل على $0x+0y=0$: ليس للنظام حل.', 'Subtracting gives $0x+0y=0$: the system has no solution.'),
            right: say('$0x+0y=0$ beti betetzen da: ekuazioek gauza bera diote, eta infinitu soluzio daude.', '$0x+0y=0$ se cumple siempre: las ecuaciones dicen lo mismo y hay infinitas soluciones.', '$0x+0y=0$ تتحقق دائمًا: المعادلتان تقولان الشيء نفسه وللنظام ما لا نهاية من الحلول.', '$0x+0y=0$ always holds: the equations say the same thing and there are infinitely many solutions.')
        },
        check: {
            prompt: say('Zer motatakoa da $\\begin{cases}x-2y=1\\\\ 3x-6y=4\\end{cases}$?', '¿De qué tipo es $\\begin{cases}x-2y=1\\\\ 3x-6y=4\\end{cases}$?', 'ما نوع $\\begin{cases}x-2y=1\\\\ 3x-6y=4\\end{cases}$؟', 'What type is $\\begin{cases}x-2y=1\\\\ 3x-6y=4\\end{cases}$?'),
            options: [say('Bateragarri determinatua', 'Compatible determinado', 'متوافق محدد', 'Consistent and independent'), say('Bateraezina', 'Incompatible', 'غير متوافق', 'Inconsistent'), say('Bateragarri indeterminatua', 'Compatible indeterminado', 'متوافق غير محدد', 'Consistent and dependent')],
            correctIndex: 1,
            explanation: say('$\\frac{1}{3}=\\frac{-2}{-6}$, baina $\\frac{1}{4}\\neq\\frac{1}{3}$: zuzen paraleloak.', '$\\frac{1}{3}=\\frac{-2}{-6}$, pero $\\frac{1}{4}\\neq\\frac{1}{3}$: rectas paralelas.', '$\\frac{1}{3}=\\frac{-2}{-6}$ لكن $\\frac{1}{4}\\neq\\frac{1}{3}$: مستقيمان متوازيان.', '$\\frac{1}{3}=\\frac{-2}{-6}$, but $\\frac{1}{4}\\neq\\frac{1}{3}$: parallel lines.')
        }
    },
    'equivalent-systems': {
        mistake: {
            wrong: say('$E_2-2E_1$, ezkerrean bakarrik: $(2x+3y)-2(x+y)=13$', '$E_2-2E_1$ solo a la izquierda: $(2x+3y)-2(x+y)=13$', '$E_2-2E_1$ في اليسار فقط: $(2x+3y)-2(x+y)=13$', '$E_2-2E_1$ on the left only: $(2x+3y)-2(x+y)=13$'),
            right: say('Eskuinean ere kentzen da: $13-2\\cdot 5=3$, eta $y=3$ geratzen da.', 'También se resta a la derecha: $13-2\\cdot 5=3$, y queda $y=3$.', 'نطرح في اليمين أيضًا: $13-2\\cdot 5=3$ فيبقى $y=3$.', 'You subtract on the right too: $13-2\\cdot 5=3$, which leaves $y=3$.')
        },
        check: {
            prompt: say('Zein eragiketak bihurtzen du $\\begin{cases}x+y=4\\\\ 3x-y=8\\end{cases}$ bigarren ekuazioan $y$ ez duen sistema baliokide?', '¿Qué operación convierte $\\begin{cases}x+y=4\\\\ 3x-y=8\\end{cases}$ en un sistema equivalente sin $y$ en la segunda ecuación?', 'أي عملية تحوّل $\\begin{cases}x+y=4\\\\ 3x-y=8\\end{cases}$ إلى نظام مكافئ ليس في معادلته الثانية $y$؟', 'Which operation turns $\\begin{cases}x+y=4\\\\ 3x-y=8\\end{cases}$ into an equivalent system with no $y$ in the second equation?'),
            options: [same('$E_2-E_1$'), same('$0\\cdot E_2$'), same('$E_2+E_1$')],
            correctIndex: 2,
            explanation: say('$(3x-y)+(x+y)=8+4$, hau da, $4x=12$.', '$(3x-y)+(x+y)=8+4$, es decir, $4x=12$.', '$(3x-y)+(x+y)=8+4$، أي $4x=12$.', '$(3x-y)+(x+y)=8+4$, that is, $4x=12$.')
        }
    },

    /* ---------- 2. Gaussian elimination ---------- */
    'triangular-systems': {
        mistake: {
            wrong: say('$y-z=-1$ eta ${z}=3$: $y=-1-3=-4$', '$y-z=-1$ con ${z}=3$: $y=-1-3=-4$', '$y-z=-1$ مع ${z}=3$: $y=-1-3=-4$', '$y-z=-1$ with ${z}=3$: $y=-1-3=-4$'),
            right: say('$-z$ beste aldera pasatzean, zeinua aldatzen du: $y=-1+3=2$.', 'Al pasar $-z$ al otro lado cambia de signo: $y=-1+3=2$.', 'عند نقل $-z$ إلى الطرف الآخر تتغير إشارته: $y=-1+3=2$.', 'When $-z$ moves to the other side, its sign changes: $y=-1+3=2$.')
        },
        check: {
            prompt: say('Zenbat balio du $y$ ezezagunak $\\begin{cases}x+2y-z=5\\\\ y+3z=7\\\\ 5z=10\\end{cases}$ sisteman?', '¿Cuánto vale $y$ en $\\begin{cases}x+2y-z=5\\\\ y+3z=7\\\\ 5z=10\\end{cases}$?', 'كم قيمة $y$ في $\\begin{cases}x+2y-z=5\\\\ y+3z=7\\\\ 5z=10\\end{cases}$؟', 'What is $y$ in $\\begin{cases}x+2y-z=5\\\\ y+3z=7\\\\ 5z=10\\end{cases}$?'),
            options: [same('$13$'), same('$1$'), same('$2$')],
            correctIndex: 1,
            explanation: say('${z}=2$, eta $y=7-3\\cdot 2=1$.', '${z}=2$ y $y=7-3\\cdot 2=1$.', '${z}=2$ و$y=7-3\\cdot 2=1$.', '${z}=2$ and $y=7-3\\cdot 2=1$.')
        }
    },
    'gauss-method': {
        mistake: {
            wrong: say('$E_2-2E_1$ eragiketa $2x-y+z=3$ ekuazioan: $-3y-z=3$', '$E_2-2E_1$ en $2x-y+z=3$: $-3y-z=3$', '$E_2-2E_1$ في $2x-y+z=3$: $-3y-z=3$', '$E_2-2E_1$ on $2x-y+z=3$: $-3y-z=3$'),
            right: say('Eskuinean ere bai: $3-2\\cdot 6=-9$; beraz, $-3y-z=-9$.', 'También a la derecha: $3-2\\cdot 6=-9$, así que $-3y-z=-9$.', 'وفي اليمين أيضًا: $3-2\\cdot 6=-9$، إذن $-3y-z=-9$.', 'On the right too: $3-2\\cdot 6=-9$, so $-3y-z=-9$.')
        },
        check: {
            prompt: say('$\\begin{cases}x+2y-z=1\\\\ 3x+y+z=4\\end{cases}$ sisteman, zein eragiketak kentzen du $x$ bigarren ekuaziotik?', 'En $\\begin{cases}x+2y-z=1\\\\ 3x+y+z=4\\end{cases}$, ¿qué operación quita la $x$ de la segunda ecuación?', 'في $\\begin{cases}x+2y-z=1\\\\ 3x+y+z=4\\end{cases}$ أي عملية تحذف $x$ من المعادلة الثانية؟', 'In $\\begin{cases}x+2y-z=1\\\\ 3x+y+z=4\\end{cases}$, which operation removes the $x$ from the second equation?'),
            options: [same('$E_2-3E_1$'), same('$E_2+3E_1$'), same('$E_2-E_1$')],
            correctIndex: 0,
            explanation: say('$3x-3\\cdot x=0$, eta $-5y+4z=1$ geratzen da.', '$3x-3\\cdot x=0$, y queda $-5y+4z=1$.', '$3x-3\\cdot x=0$ ويبقى $-5y+4z=1$.', '$3x-3\\cdot x=0$, which leaves $-5y+4z=1$.')
        }
    },
    'augmented-matrix': {
        mistake: {
            wrong: say('$x+2z=3$ ekuazioaren errenkada: $(1\\ \\ 2\\mid 3)$', 'La fila de $x+2z=3$: $(1\\ \\ 2\\mid 3)$', 'صف المعادلة $x+2z=3$: $(1\\ \\ 2\\mid 3)$', 'The row of $x+2z=3$: $(1\\ \\ 2\\mid 3)$'),
            right: say('$y$ falta da: haren koefizientea 0 da, eta errenkada $(1\\ \\ 0\\ \\ 2\\mid 3)$ da.', 'Falta la $y$: su coeficiente es 0 y la fila es $(1\\ \\ 0\\ \\ 2\\mid 3)$.', 'المجهول $y$ غائب: معامله 0 والصف هو $(1\\ \\ 0\\ \\ 2\\mid 3)$.', 'The $y$ is missing: its coefficient is 0 and the row is $(1\\ \\ 0\\ \\ 2\\mid 3)$.')
        },
        check: {
            prompt: say('Zein sistema dagokio $\\left(\\begin{array}{cc|c}1&2&5\\\\ 0&3&6\\end{array}\\right)$ matrizeari?', '¿Qué sistema corresponde a $\\left(\\begin{array}{cc|c}1&2&5\\\\ 0&3&6\\end{array}\\right)$?', 'أي نظام يقابل المصفوفة $\\left(\\begin{array}{cc|c}1&2&5\\\\ 0&3&6\\end{array}\\right)$؟', 'Which system goes with $\\left(\\begin{array}{cc|c}1&2&5\\\\ 0&3&6\\end{array}\\right)$?'),
            options: [same('$\\begin{cases}x+2y=5\\\\ 3x=6\\end{cases}$'), same('$\\begin{cases}x+2y=5\\\\ 3y=6\\end{cases}$'), same('$\\begin{cases}x+2y+5=0\\\\ 3y+6=0\\end{cases}$')],
            correctIndex: 1,
            explanation: say('Bigarren errenkada $0x+3y=6$ da.', 'La segunda fila es $0x+3y=6$.', 'الصف الثاني هو $0x+3y=6$.', 'The second row is $0x+3y=6$.')
        }
    },
    'three-unknown-problems': {
        mistake: {
            wrong: say('«${z}$ ezezagunak $x$ ezezagunak baino 4 gehiago ditu» idatzita: $x=z+4$', '«${z}$ tiene 4 más que $x$» escrito $x=z+4$', '«${z}$ أكثر من $x$ بـ 4» مكتوبة $x=z+4$', '«${z}$ has 4 more than $x$» written $x=z+4$'),
            right: say('Alderantziz: ${z}$ ezezagunak gehiago badu, ${z}=x+4$.', 'Al revés: si ${z}$ tiene más, ${z}=x+4$.', 'العكس: إذا كان ${z}$ أكثر فإن ${z}=x+4$.', 'The other way round: if ${z}$ has more, ${z}=x+4$.')
        },
        check: {
            prompt: say('Hiru zenbakiren batura 12 da. Bigarrena lehenaren bikoitza da, eta hirugarrena lehenaren hirukoitza. Zein da lehena?', 'Tres números suman 12. El segundo es el doble del primero y el tercero, el triple del primero. ¿Cuál es el primero?', 'مجموع ثلاثة أعداد 12. الثاني ضعف الأول والثالث ثلاثة أمثال الأول. ما الأول؟', 'Three numbers add up to 12. The second is twice the first and the third is three times the first. What is the first?'),
            options: [same('$4$'), same('$6$'), same('$2$')],
            correctIndex: 2,
            explanation: say('$x+2x+3x=12$, beraz $x=2$.', '$x+2x+3x=12$, así que $x=2$.', '$x+2x+3x=12$، إذن $x=2$.', '$x+2x+3x=12$, so $x=2$.')
        }
    },

    /* ---------- 3. Analysing a system ---------- */
    'solutions-count': {
        mistake: {
            wrong: say('Azken errenkada $0z=0$ da: ez dago soluziorik.', 'La última fila es $0z=0$: no hay solución.', 'الصف الأخير هو $0z=0$: لا حل.', 'The last row is $0z=0$: there is no solution.'),
            right: say('$0z=0$ beti betetzen da: infinitu soluzio daude. Soluziorik gabe, $0z=5$ bezalako errenkada bat.', '$0z=0$ se cumple siempre: hay infinitas soluciones. Sin solución es una fila como $0z=5$.', '$0z=0$ تتحقق دائمًا: للنظام ما لا نهاية من الحلول. أما عدم وجود حل فصفّ مثل $0z=5$.', '$0z=0$ always holds: there are infinitely many solutions. No solution is a row such as $0z=5$.')
        },
        check: {
            prompt: say('Zenbat soluzio ditu azken errenkada $0x+0y+0z=4$ duen sistema mailakatu batek?', '¿Cuántas soluciones tiene un sistema escalonado cuya última fila es $0x+0y+0z=4$?', 'كم حلًّا لنظام درجي صفه الأخير $0x+0y+0z=4$؟', 'How many solutions does a triangular system with last row $0x+0y+0z=4$ have?'),
            options: [say('Bat', 'Una', 'حل واحد', 'One'), say('Infinitu', 'Infinitas', 'ما لا نهاية', 'Infinitely many'), say('Bat ere ez', 'Ninguna', 'لا حل', 'None')],
            correctIndex: 2,
            explanation: say('Ez dago $x$, $y$ eta ${z}$ baliorik $0$ zenbakiak $4$ balio dezan.', 'Ningún valor de $x$, $y$, ${z}$ hace que $0$ valga $4$.', 'لا توجد قيم لـ $x$ و$y$ و${z}$ تجعل $0$ يساوي $4$.', 'No values of $x$, $y$, ${z}$ make $0$ equal to $4$.')
        }
    },
    'parametric-solutions': {
        mistake: {
            wrong: say('Soluzioa: $(2,1,1)$', 'Solución: $(2,1,1)$', 'الحل: $(2,1,1)$', 'Solution: $(2,1,1)$'),
            right: say('Infinituetako bat baino ez da, $\\lambda=1$ duena. Denak eman behar dira: $(3-\\lambda,\\ 1,\\ \\lambda)$.', 'Es solo una de las infinitas, la de $\\lambda=1$. Hay que dar todas: $(3-\\lambda,\\ 1,\\ \\lambda)$.', 'إنه واحد فقط من الحلول اللانهائية، وهو الذي فيه $\\lambda=1$. يجب إعطاؤها كلها: $(3-\\lambda,\\ 1,\\ \\lambda)$.', 'It is only one of the infinitely many, the one with $\\lambda=1$. You must give them all: $(3-\\lambda,\\ 1,\\ \\lambda)$.')
        },
        check: {
            prompt: say('Hirukote hauetako zein da $(1+\\lambda,\\ 2\\lambda,\\ \\lambda)$ soluzio orokorraren soluzio bat?', '¿Cuál de estas ternas es una solución de $(1+\\lambda,\\ 2\\lambda,\\ \\lambda)$?', 'أي هذه الثلاثيات حل من الحل العام $(1+\\lambda,\\ 2\\lambda,\\ \\lambda)$؟', 'Which of these triples is one of the solutions $(1+\\lambda,\\ 2\\lambda,\\ \\lambda)$?'),
            options: [same('$(2,1,1)$'), same('$(3,4,2)$'), same('$(3,2,2)$')],
            correctIndex: 1,
            explanation: say('$\\lambda=2$ denean: $1+2=3$ eta $2\\cdot 2=4$.', 'Con $\\lambda=2$: $1+2=3$ y $2\\cdot 2=4$.', 'مع $\\lambda=2$: $1+2=3$ و$2\\cdot 2=4$.', 'With $\\lambda=2$: $1+2=3$ and $2\\cdot 2=4$.')
        }
    },
    'parameter-discussion': {
        mistake: {
            wrong: say('$(a-2)y=3$ ekuaziotik: $y=\\frac{3}{a-2}$, beti soluzio bat.', 'De $(a-2)y=3$: $y=\\frac{3}{a-2}$, siempre una solución.', 'من $(a-2)y=3$: $y=\\frac{3}{a-2}$، أي حل واحد دائمًا.', 'From $(a-2)y=3$: $y=\\frac{3}{a-2}$, always one solution.'),
            right: say('$a=2$ denean ezin da zatitu: $0y=3$ geratzen da, eta bateraezina da.', 'Con $a=2$ no se puede dividir: queda $0y=3$ y es incompatible.', 'مع $a=2$ لا يمكن القسمة: يبقى $0y=3$ والنظام غير متوافق.', 'With $a=2$ you cannot divide: you get $0y=3$, and it is inconsistent.')
        },
        check: {
            prompt: say('$a$ zenbakiaren zein baliotarako da bateraezina $\\begin{cases}x+y=1\\\\ 3x+ay=5\\end{cases}$?', '¿Para qué valor de $a$ es incompatible $\\begin{cases}x+y=1\\\\ 3x+ay=5\\end{cases}$?', 'لأي قيمة لـ $a$ يكون $\\begin{cases}x+y=1\\\\ 3x+ay=5\\end{cases}$ غير متوافق؟', 'For which value of $a$ is $\\begin{cases}x+y=1\\\\ 3x+ay=5\\end{cases}$ inconsistent?'),
            options: [same('$a=5$'), same('$a=1$'), same('$a=3$')],
            correctIndex: 2,
            explanation: say('$E_2-3E_1$ eragiketak $(a-3)y=2$ ematen du; $a=3$ denean, $0y=2$.', '$E_2-3E_1$ da $(a-3)y=2$; con $a=3$, $0y=2$.', 'تعطي $E_2-3E_1$ المعادلة $(a-3)y=2$؛ ومع $a=3$ يكون $0y=2$.', '$E_2-3E_1$ gives $(a-3)y=2$; with $a=3$, $0y=2$.')
        }
    },

    /* ---------- 4. Non-linear systems ---------- */
    'nonlinear-substitution': {
        mistake: {
            wrong: say('$x^3=9x$: $x$ ezezagunaz zatitu, eta $x^2=9$, $x=\\pm 3$.', '$x^3=9x$: divido entre $x$ y queda $x^2=9$, $x=\\pm 3$.', '$x^3=9x$: أقسم على $x$ فيبقى $x^2=9$ و$x=\\pm 3$.', '$x^3=9x$: I divide by $x$ and get $x^2=9$, $x=\\pm 3$.'),
            right: say('$x$ ezezagunaz zatitzean, $x=0$ galtzen da. Faktorizatu: $x(x^2-9)=0$, eta soluzioak $x=0$ eta $x=\\pm 3$ dira.', 'Al dividir entre $x$ se pierde $x=0$. Factoriza: $x(x^2-9)=0$, con $x=0$ y $x=\\pm 3$.', 'بالقسمة على $x$ يضيع $x=0$. حلّل: $x(x^2-9)=0$، والحلول $x=0$ و$x=\\pm 3$.', 'Dividing by $x$ loses $x=0$. Factorise: $x(x^2-9)=0$, with $x=0$ and $x=\\pm 3$.')
        },
        check: {
            prompt: say('Zenbat soluzio ditu $\\begin{cases}y=x^2\\\\ y=2x\\end{cases}$ sistemak?', '¿Cuántas soluciones tiene $\\begin{cases}y=x^2\\\\ y=2x\\end{cases}$?', 'كم حلًّا للنظام $\\begin{cases}y=x^2\\\\ y=2x\\end{cases}$؟', 'How many solutions does $\\begin{cases}y=x^2\\\\ y=2x\\end{cases}$ have?'),
            options: [same('$1$'), same('$2$'), same('$0$')],
            correctIndex: 1,
            explanation: say('$x^2-2x=0$ ekuazioak $x=0$ eta $x=2$ ematen ditu: $(0,0)$ eta $(2,4)$ puntuak.', '$x^2-2x=0$ da $x=0$ y $x=2$: los puntos $(0,0)$ y $(2,4)$.', 'تعطي $x^2-2x=0$ الحلين $x=0$ و$x=2$: النقطتان $(0,0)$ و$(2,4)$.', '$x^2-2x=0$ gives $x=0$ and $x=2$: the points $(0,0)$ and $(2,4)$.')
        }
    },
    'radical-log-systems': {
        mistake: {
            wrong: same('$\\log x+\\log y=\\log(x+y)$'),
            right: say('Logaritmoen batura biderkaduraren logaritmoa da: $\\log x+\\log y=\\log(xy)$.', 'La suma de logaritmos es el logaritmo del producto: $\\log x+\\log y=\\log(xy)$.', 'مجموع اللوغاريتمات لوغاريتم الجداء: $\\log x+\\log y=\\log(xy)$.', 'A sum of logarithms is the logarithm of the product: $\\log x+\\log y=\\log(xy)$.')
        },
        check: {
            prompt: say('$\\begin{cases}\\log x+\\log y=1\\\\ x-y=3\\end{cases}$ ebaztean, $(5,2)$ eta $(-2,-5)$ ateratzen dira. Zein da soluzioa?', 'Al resolver $\\begin{cases}\\log x+\\log y=1\\\\ x-y=3\\end{cases}$ salen $(5,2)$ y $(-2,-5)$. ¿Cuál es la solución?', 'عند حل $\\begin{cases}\\log x+\\log y=1\\\\ x-y=3\\end{cases}$ نحصل على $(5,2)$ و$(-2,-5)$. ما الحل؟', 'Solving $\\begin{cases}\\log x+\\log y=1\\\\ x-y=3\\end{cases}$ gives $(5,2)$ and $(-2,-5)$. Which is the solution?'),
            options: [same('$(5,2)$'), same('$(-2,-5)$'), say('Biak', 'Las dos', 'كلاهما', 'Both')],
            correctIndex: 0,
            explanation: say('$\\log(-2)$ ez dago; $(5,2)$ bikoteak $5\\cdot 2=10$ eta $5-2=3$ betetzen ditu.', '$\\log(-2)$ no existe; $(5,2)$ cumple $5\\cdot 2=10$ y $5-2=3$.', '$\\log(-2)$ غير موجود؛ و$(5,2)$ يحقق $5\\cdot 2=10$ و$5-2=3$.', '$\\log(-2)$ does not exist; $(5,2)$ satisfies $5\\cdot 2=10$ and $5-2=3$.')
        }
    },
    'exponential-systems': {
        mistake: {
            wrong: same('$2^x=-4\\ \\to\\ x=-2$'),
            right: say('$2^x$ beti da positiboa: $2^x=-4$ ekuazioak ez du soluziorik, eta $u$ balio hori baztertzen da.', '$2^x$ siempre es positivo: $2^x=-4$ no tiene solución y ese valor de $u$ se descarta.', '$2^x$ موجب دائمًا: ليس للمعادلة $2^x=-4$ حل، وتُستبعد قيمة $u$ هذه.', '$2^x$ is always positive: $2^x=-4$ has no solution, and that value of $u$ is thrown out.')
        },
        check: {
            prompt: say('$u=2^x$ eta $v=3^y$ eginda, $u=4$ eta $v=9$ ateratzen dira. Zenbat da $x+y$?', 'Con $u=2^x$ y $v=3^y$ sale $u=4$, $v=9$. ¿Cuánto vale $x+y$?', 'مع $u=2^x$ و$v=3^y$ نحصل على $u=4$ و$v=9$. كم يساوي $x+y$؟', 'With $u=2^x$ and $v=3^y$ you get $u=4$, $v=9$. What is $x+y$?'),
            options: [same('$13$'), same('$4$'), same('$5$')],
            correctIndex: 1,
            explanation: say('$2^x=4$ ekuazioak $x=2$ ematen du, eta $3^y=9$ ekuazioak $y=2$.', '$2^x=4$ da $x=2$ y $3^y=9$ da $y=2$.', 'تعطي $2^x=4$ القيمة $x=2$ وتعطي $3^y=9$ القيمة $y=2$.', '$2^x=4$ gives $x=2$ and $3^y=9$ gives $y=2$.')
        }
    },
    'nonlinear-problems': {
        mistake: {
            wrong: say('Laukizuzen baten aldeak: $x=-3$ eta $y=-4$ ere balio dute, $xy=12$ betetzen baitute.', 'Lados de un rectángulo: $x=-3$ e $y=-4$ también valen, porque cumplen $xy=12$.', 'ضلعا مستطيل: $x=-3$ و$y=-4$ يصلحان أيضًا لأنهما يحققان $xy=12$.', 'Sides of a rectangle: $x=-3$ and $y=-4$ work too, because they satisfy $xy=12$.'),
            right: say('Luzera bat ezin da negatiboa izan: sistemaren soluzio horiek ez dira problemarenak.', 'Una longitud no puede ser negativa: esas soluciones del sistema no son del problema.', 'لا يمكن أن يكون الطول سالبًا: تلك حلول للنظام وليست حلولًا للمسألة.', 'A length cannot be negative: those solutions of the system are not solutions of the problem.')
        },
        check: {
            prompt: say('Laukizuzen baten perimetroa 20 cm da, eta azalera 21 cm². Zenbat neurtzen du alde handienak?', 'Un rectángulo tiene 20 cm de perímetro y 21 cm² de área. ¿Cuánto mide el lado mayor?', 'مستطيل محيطه 20 سم ومساحته 21 سم². كم طول الضلع الأكبر؟', 'A rectangle has a perimeter of 20 cm and an area of 21 cm². How long is the longer side?'),
            options: [say('3 cm', '3 cm', '3 سم', '3 cm'), say('10 cm', '10 cm', '10 سم', '10 cm'), say('7 cm', '7 cm', '7 سم', '7 cm')],
            correctIndex: 2,
            explanation: say('$x+y=10$ eta $xy=21$: aldeek 3 cm eta 7 cm neurtzen dute.', '$x+y=10$ y $xy=21$: los lados miden 3 cm y 7 cm.', '$x+y=10$ و$xy=21$: طولا الضلعين 3 سم و7 سم.', '$x+y=10$ and $xy=21$: the sides are 3 cm and 7 cm long.')
        }
    },

    /* ---------- 5. Inequalities in two unknowns ---------- */
    'half-plane-regions': {
        mistake: {
            wrong: say('$(0,0)$ proba-puntua $x-2y\\le 0$ inekuazioan', 'Punto de prueba $(0,0)$ para $x-2y\\le 0$', 'نقطة الاختبار $(0,0)$ للمتراجحة $x-2y\\le 0$', 'Test point $(0,0)$ for $x-2y\\le 0$'),
            right: say('$(0,0)$ puntua $x-2y=0$ zuzenean dago: ez du ezer esaten. Probatu beste batekin, $(1,0)$ bezala.', '$(0,0)$ está en la recta $x-2y=0$: no dice nada. Prueba con otro, como $(1,0)$.', 'النقطة $(0,0)$ على المستقيم $x-2y=0$: لا تخبرنا بشيء. جرّب نقطة أخرى مثل $(1,0)$.', '$(0,0)$ is on the line $x-2y=0$: it tells you nothing. Try another one, such as $(1,0)$.')
        },
        check: {
            prompt: say('Zein puntuk betetzen du $\\begin{cases}x+y\\le 3\\\\ y>x\\end{cases}$?', '¿Qué punto cumple $\\begin{cases}x+y\\le 3\\\\ y>x\\end{cases}$?', 'أي نقطة تحقق $\\begin{cases}x+y\\le 3\\\\ y>x\\end{cases}$؟', 'Which point satisfies $\\begin{cases}x+y\\le 3\\\\ y>x\\end{cases}$?'),
            options: [same('$(2,0)$'), same('$(0,2)$'), same('$(1,1)$')],
            correctIndex: 1,
            explanation: say('$0+2\\le 3$ eta $2>0$.', '$0+2\\le 3$ y $2>0$.', '$0+2\\le 3$ و$2>0$.', '$0+2\\le 3$ and $2>0$.')
        }
    },
    'region-cases': {
        mistake: {
            wrong: say('$\\begin{cases}x+y\\le 1\\\\ x+y\\ge 3\\end{cases}$: soluzioa bi zuzenen arteko zerrenda da.', '$\\begin{cases}x+y\\le 1\\\\ x+y\\ge 3\\end{cases}$: la solución es la franja entre las dos rectas.', '$\\begin{cases}x+y\\le 1\\\\ x+y\\ge 3\\end{cases}$: الحل هو الشريط بين المستقيمين.', '$\\begin{cases}x+y\\le 1\\\\ x+y\\ge 3\\end{cases}$: the solution is the strip between the two lines.'),
            right: say('Batura bat ezin da aldi berean gehienez 1 eta gutxienez 3 izan: eskualdea hutsa da.', 'Una suma no puede ser a la vez como mucho 1 y al menos 3: la región es vacía.', 'لا يمكن لمجموع أن يكون في الوقت نفسه 1 على الأكثر و3 على الأقل: المنطقة خالية.', 'A sum cannot be at most 1 and at least 3 at the same time: the region is empty.')
        },
        check: {
            prompt: say('Nolakoa da $\\begin{cases}x\\ge 0\\\\ y\\ge 0\\\\ x+y\\le 4\\end{cases}$ eskualdea?', '¿Cómo es la región $\\begin{cases}x\\ge 0\\\\ y\\ge 0\\\\ x+y\\le 4\\end{cases}$?', 'كيف هي المنطقة $\\begin{cases}x\\ge 0\\\\ y\\ge 0\\\\ x+y\\le 4\\end{cases}$؟', 'What is the region $\\begin{cases}x\\ge 0\\\\ y\\ge 0\\\\ x+y\\le 4\\end{cases}$ like?'),
            options: [say('Itxia: triangelu bat', 'Cerrada: un triángulo', 'مغلقة: مثلث', 'Closed: a triangle'), say('Irekia', 'Abierta', 'مفتوحة', 'Open'), say('Hutsa', 'Vacía', 'خالية', 'Empty')],
            correctIndex: 0,
            explanation: say('Hiru zuzenek $(0,0)$, $(4,0)$ eta $(0,4)$ erpinak dituen triangelua inguratzen dute.', 'Las tres rectas encierran el triángulo de vértices $(0,0)$, $(4,0)$ y $(0,4)$.', 'تحيط المستقيمات الثلاثة بالمثلث ذي الرؤوس $(0,0)$ و$(4,0)$ و$(0,4)$.', 'The three lines close in the triangle with vertices $(0,0)$, $(4,0)$ and $(0,4)$.')
        }
    }
}

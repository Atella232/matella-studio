import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { SystemsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Sistemak · 4. DBH akademikoak — what each lesson tells: the new words
   (definitions), a short explanation, its cases, the example as an exercise
   («Another example»), the key words in four languages and, in three
   lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics. Each explanation keeps the system
   its drawing shows; the example uses numbers of its own.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const systemsLessonTexts: Record<SystemsTopicId, LessonTexts> = {
    /* ---------- 1. Linear systems ---------- */
    'linear-equations': {
        definitions: [
            {
                term: say('$ax+by=c$ ekuazioaren ebazpena', 'Solución de $ax+by=c$', 'حل $ax+by=c$', 'Solution of $ax+by=c$'),
                meaning: say('Ekuazioa betetzen duen $(x,y)$ zenbaki-bikotea.', 'Una pareja de números $(x,y)$ que cumple la ecuación.', 'زوج من الأعداد $(x,y)$ يحقق المعادلة.', 'A pair of numbers $(x,y)$ that satisfies the equation.')
            }
        ],
        vocabulary: [
            say('bikotea', 'pareja', 'زوج', 'pair'),
            say('zuzena', 'recta', 'مستقيم', 'line')
        ],
        explanation: say(
            'Bi ezezaguneko ekuazio lineal batek infinitu ebazpen ditu, eta planoan zuzen bat osatzen dute: $x+y=5$ ekuazioak $(0,5)$, $(1,4)$, $(2,3)$… ditu. Bikote bat ebazpena den jakiteko, ordeztu. Bat aurkitzeko, eman balio bat ezezagun bati eta askatu bestea. Zuzena marrazteko, bi ebazpen nahikoak dira.',
            'Una ecuación lineal con dos incógnitas tiene infinitas soluciones, que en el plano forman una recta: $x+y=5$ tiene $(0,5)$, $(1,4)$, $(2,3)$… Para saber si una pareja es solución, sustituye. Para encontrar una, da un valor a una incógnita y despeja la otra. Para dibujar la recta, bastan dos soluciones.',
            'للمعادلة الخطية بمجهولين حلول لا نهائية تشكّل مستقيمًا في المستوى: للمعادلة $x+y=5$ الحلول $(0,5)$ و$(1,4)$ و$(2,3)$… ولمعرفة هل زوج ما حل، عوّض. ولإيجاد حل أعطِ أحد المجهولين قيمة واعزل الآخر. ولرسم المستقيم يكفي حلان.',
            'A linear equation in two unknowns has infinitely many solutions, which form a line on the plane: $x+y=5$ has $(0,5)$, $(1,4)$, $(2,3)$… To see whether a pair is a solution, substitute. To find one, give one unknown a value and solve for the other. To draw the line, two solutions are enough.'
        ),
        examplePrompt: say('Aurkitu $3x-y=6$ ekuazioaren bi ebazpen, eta egiaztatu $(1,-2)$ ebazpena den.', 'Halla dos soluciones de $3x-y=6$ y comprueba si $(1,-2)$ lo es.', 'جد حلين لـ $3x-y=6$ وتحقّق هل $(1,-2)$ حل.', 'Find two solutions of $3x-y=6$ and check whether $(1,-2)$ is one.'),
        example: same('$\\begin{gathered}x=0\\ \\to\\ y=-6\\qquad x=2\\ \\to\\ y=0\\\\ 3\\cdot 1-(-2)=5\\neq 6\\end{gathered}$'),
        exampleAnswer: say('$(0,-6)$ eta $(2,0)$ ebazpenak dira; $(1,-2)$ ez.', '$(0,-6)$ y $(2,0)$ son soluciones; $(1,-2)$ no.', '$(0,-6)$ و$(2,0)$ حلان؛ أما $(1,-2)$ فلا.', '$(0,-6)$ and $(2,0)$ are solutions; $(1,-2)$ is not.')
    },
    graphic: {
        definitions: [
            {
                term: say('Ekuazio-sistema', 'Sistema de ecuaciones', 'نظام معادلات', 'System of equations'),
                meaning: say('Aldi berean bete behar diren bi ekuazio; haren ebazpena biak betetzen dituen bikotea da.', 'Dos ecuaciones que se tienen que cumplir a la vez; su solución es la pareja que cumple las dos.', 'معادلتان يجب أن تتحققا معًا؛ وحله الزوج الذي يحقق المعادلتين.', 'Two equations that must hold at the same time; its solution is the pair that satisfies both.')
            }
        ],
        vocabulary: [
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'crossing point'),
            say('paraleloak', 'paralelas', 'متوازيان', 'parallel')
        ],
        explanation: say(
            'Ebazpena bi zuzenen ebaki-puntua da: $x+y=4$ eta $x-y=2$ zuzenak $(3,1)$ puntuan mozten dira, $3+1=4$ eta $3-1=2$ direlako. Zuzenak nola dauden, sistemak ebazpen bat, bat ere ez edo infinitu ditu.',
            'La solución es el punto de corte de las dos rectas: $x+y=4$ y $x-y=2$ se cortan en $(3,1)$, porque $3+1=4$ y $3-1=2$. Según cómo estén las rectas, el sistema tiene una solución, ninguna o infinitas.',
            'الحل هو نقطة تقاطع المستقيمين: $x+y=4$ و$x-y=2$ يتقاطعان في $(3,1)$ لأن $3+1=4$ و$3-1=2$. وبحسب وضع المستقيمين يكون للنظام حل واحد أو لا حل أو حلول لا نهائية.',
            'The solution is the crossing point of the two lines: $x+y=4$ and $x-y=2$ cross at $(3,1)$, because $3+1=4$ and $3-1=2$. Depending on how the lines lie, the system has one solution, none or infinitely many.'
        ),
        cases: [
            { title: say('Bateragarri determinatua', 'Compatible determinado', 'متوافق محدد', 'Consistent and independent'), text: say('Zuzenak mozten dira: ebazpen bat.', 'Las rectas se cortan: una solución.', 'يتقاطع المستقيمان: حل واحد.', 'The lines cross: one solution.') },
            { title: say('Bateraezina', 'Incompatible', 'غير متوافق', 'Inconsistent'), text: say('Paraleloak dira: ebazpenik ez.', 'Son paralelas: ninguna solución.', 'متوازيان: لا حل.', 'They are parallel: no solution.') },
            { title: say('Bateragarri indeterminatua', 'Compatible indeterminado', 'متوافق غير محدد', 'Consistent and dependent'), text: say('Zuzen bera dira: infinitu ebazpen.', 'Son la misma recta: infinitas soluciones.', 'هما المستقيم نفسه: حلول لا نهائية.', 'They are the same line: infinitely many solutions.') }
        ],
        examplePrompt: say('Ebatzi grafikoki $y=2x-3$ eta $y=-x+3$.', 'Resuelve gráficamente $y=2x-3$ e $y=-x+3$.', 'حلّ بيانيًا $y=2x-3$ و$y=-x+3$.', 'Solve $y=2x-3$ and $y=-x+3$ graphically.'),
        example: same('$\\begin{gathered}y=2x-3\\ \\to\\ (0,-3),\\ (2,1)\\\\ y=-x+3\\ \\to\\ (0,3),\\ (2,1)\\end{gathered}$'),
        exampleAnswer: say('Bi zuzenak $(2,1)$ puntutik pasatzen dira: hori da ebazpena.', 'Las dos rectas pasan por $(2,1)$: es la solución.', 'يمر المستقيمان بالنقطة $(2,1)$: إنها الحل.', 'Both lines go through $(2,1)$: that is the solution.'),
        why: {
            text: say(
                'Zuzen bakoitzeko puntuak bere ekuazioaren ebazpenak dira. Bi ekuazioak aldi berean betetzen dituen puntuak bi zuzenetan egon behar du: haien ebaki-puntua. Paraleloak badira, ez dago halako punturik; zuzen bera badira, puntu guztiak dira.',
                'Los puntos de cada recta son las soluciones de su ecuación. El punto que cumple las dos ecuaciones a la vez tiene que estar en las dos rectas: su punto de corte. Si son paralelas, no hay ninguno; si son la misma recta, lo son todos.',
                'نقاط كل مستقيم هي حلول معادلته. والنقطة التي تحقق المعادلتين معًا يجب أن تقع على المستقيمين: أي نقطة تقاطعهما. فإن كانا متوازيين فلا توجد، وإن كانا المستقيم نفسه فكل النقاط حلول.',
                'The points of each line are the solutions of its equation. The point that satisfies both equations at once has to be on both lines: their crossing point. If they are parallel, there is none; if they are the same line, every point is one.'
            )
        }
    },
    classify: {
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('parametroa', 'parámetro', 'الوسيط', 'parameter')
        ],
        explanation: say(
            '$ax+by=c$, $a\'x+b\'y=c\'$ sisteman, konparatu koefizienteen zatidurak: horrela sailkatzen da ebatzi gabe, eta parametroak ere aurkitzen dira. Adibidez, $2x+y=7$ eta $x-y=2$ sistemak ebazpen bat du, eta $x+2y=3$ eta $2x+4y=5$ sistemak, bat ere ez.',
            'En el sistema $ax+by=c$, $a\'x+b\'y=c\'$, compara los cocientes de los coeficientes: así se clasifica sin resolver, y también se hallan parámetros. Por ejemplo, $2x+y=7$ y $x-y=2$ tienen una solución, y $x+2y=3$ y $2x+4y=5$, ninguna.',
            'في النظام $ax+by=c$، $a\'x+b\'y=c\'$ قارن نسب المعاملات: هكذا نصنّف دون حل، ونجد الوسطاء أيضًا. مثلًا للنظام $2x+y=7$ و$x-y=2$ حل واحد، وللنظام $x+2y=3$ و$2x+4y=5$ لا حل.',
            'In the system $ax+by=c$, $a\'x+b\'y=c\'$, compare the ratios of the coefficients: this classifies it without solving, and also finds parameters. For example, $2x+y=7$ and $x-y=2$ have one solution, and $x+2y=3$ and $2x+4y=5$, none.'
        ),
        cases: [
            { title: say('Bateragarri determinatua', 'Compatible determinado', 'متوافق محدد', 'Consistent and independent'), text: say('$x$ eta $y$ letren zatidurak desberdinak.', 'Los cocientes de $x$ y de $y$ son distintos.', 'نسبتا معاملي $x$ و$y$ مختلفتان.', 'The ratios for $x$ and for $y$ are different.'), math: same('$\\frac{a}{a\'}\\neq\\frac{b}{b\'}$') },
            { title: say('Bateraezina', 'Incompatible', 'غير متوافق', 'Inconsistent'), text: say('Bi horiek berdinak, baina gai askeena ez.', 'Esos dos son iguales, pero el de los términos independientes no.', 'هاتان متساويتان، لكن نسبة الحدين الثابتين لا.', 'Those two are equal, but the ratio of the constant terms is not.'), math: same('$\\frac{a}{a\'}=\\frac{b}{b\'}\\neq\\frac{c}{c\'}$') },
            { title: say('Bateragarri indeterminatua', 'Compatible indeterminado', 'متوافق غير محدد', 'Consistent and dependent'), text: say('Hiru zatidurak berdinak: ekuazio bat bestea bider zenbaki bat da.', 'Los tres cocientes son iguales: una ecuación es la otra por un número.', 'النسب الثلاث متساوية: إحدى المعادلتين هي الأخرى مضروبة في عدد.', 'All three ratios are equal: one equation is the other times a number.'), math: same('$\\frac{a}{a\'}=\\frac{b}{b\'}=\\frac{c}{c\'}$') }
        ],
        examplePrompt: say('Sailkatu $3x-2y=5$, $6x-4y=10$ sistema.', 'Clasifica el sistema $3x-2y=5$, $6x-4y=10$.', 'صنّف النظام $3x-2y=5$، $6x-4y=10$.', 'Classify the system $3x-2y=5$, $6x-4y=10$.'),
        example: same('$\\frac{3}{6}=\\frac{-2}{-4}=\\frac{5}{10}$'),
        exampleAnswer: say('Hiru zatidurek $\\frac{1}{2}$ balio dute: bateragarri indeterminatua, infinitu ebazpen.', 'Los tres cocientes valen $\\frac{1}{2}$: compatible indeterminado, infinitas soluciones.', 'النسب الثلاث تساوي $\\frac{1}{2}$: متوافق غير محدد، حلول لا نهائية.', 'All three ratios are $\\frac{1}{2}$: consistent and dependent, infinitely many solutions.')
    },

    /* ---------- 2. Methods ---------- */
    substitution: {
        vocabulary: [
            say('askatu', 'despejar', 'عزل', 'solve for'),
            say('ordeztu', 'sustituir', 'التعويض', 'substitute')
        ],
        explanation: say(
            'Askatu ezezagun bat ekuazio batean, ordeztu bestean, eta ezezagun bakarreko ekuazio bat geratzen da; haren balioarekin, kalkulatu bestea. Komeni da 1 edo $-1$ koefizientea duena askatzea, zatikirik ez izateko. Amaieran, egiaztatu ebazpena bi ekuazioetan.',
            'Despeja una incógnita en una ecuación, sustitúyela en la otra y queda una ecuación con una sola incógnita; con su valor, calcula la otra. Conviene despejar la que tiene coeficiente 1 o $-1$, para no tener fracciones. Al final, comprueba la solución en las dos ecuaciones.',
            'اعزل مجهولًا في إحدى المعادلتين وعوّضه في الأخرى، فتبقى معادلة بمجهول واحد؛ وبقيمته احسب الآخر. ويُستحسن عزل المجهول الذي معامله 1 أو $-1$ لتجنب الكسور. وفي النهاية تحقّق من الحل في المعادلتين.',
            'Solve one equation for one unknown, substitute it into the other, and you get an equation with a single unknown; with its value, work out the other. It is best to solve for the one with coefficient 1 or $-1$, to avoid fractions. At the end, check the solution in both equations.'
        ),
        examplePrompt: say('Ebatzi ordezkapenez $2x+y=1$ eta $3x-2y=12$.', 'Resuelve por sustitución $2x+y=1$ y $3x-2y=12$.', 'حلّ بالتعويض $2x+y=1$ و$3x-2y=12$.', 'Solve by substitution $2x+y=1$ and $3x-2y=12$.'),
        example: same('$\\begin{gathered}y=1-2x\\\\ 3x-2(1-2x)=12\\ \\to\\ x=2,\\ y=-3\\end{gathered}$'),
        exampleAnswer: say('Ebazpena $(2,-3)$ da: $4-3=1$ eta $6+6=12$.', 'La solución es $(2,-3)$: $4-3=1$ y $6+6=12$.', 'الحل $(2,-3)$: $4-3=1$ و$6+6=12$.', 'The solution is $(2,-3)$: $4-3=1$ and $6+6=12$.')
    },
    equalization: {
        vocabulary: [
            say('berdindu', 'igualar', 'المساواة', 'set equal'),
            say('askatu', 'despeja', 'اعزل', 'solve for')
        ],
        explanation: say(
            'Askatu ezezagun bera bi ekuazioetan eta berdindu: bi adierazpenek balio bera dute. Erosoa da sistema $y=\\dots$ eran badator: $y=2x-1$ eta $y=-x+5$ badira, $2x-1=-x+5$, $3x=6$, $x=2$ eta $y=3$. Grafikoki, bi zuzenek altuera bera duten tokia bilatzea da.',
            'Despeja la misma incógnita en las dos ecuaciones e iguala: las dos expresiones valen lo mismo. Es cómodo si el sistema ya viene como $y=\\dots$: si $y=2x-1$ e $y=-x+5$, $2x-1=-x+5$, $3x=6$, $x=2$ e $y=3$. Gráficamente, es buscar dónde las dos rectas tienen la misma altura.',
            'اعزل المجهول نفسه في المعادلتين وساوِ بينهما: للعبارتين القيمة نفسها. وهذا مريح إذا كان النظام على صورة $y=\\dots$: إذا كان $y=2x-1$ و$y=-x+5$ فإن $2x-1=-x+5$، $3x=6$، $x=2$ و$y=3$. وبيانيًا هو البحث عن المكان الذي يكون فيه للمستقيمين الارتفاع نفسه.',
            'Solve both equations for the same unknown and set them equal: both expressions have the same value. It is handy when the system already comes as $y=\\dots$: if $y=2x-1$ and $y=-x+5$, $2x-1=-x+5$, $3x=6$, $x=2$ and $y=3$. On a graph, it means finding where both lines have the same height.'
        ),
        examplePrompt: say('Ebatzi berdinketaz $y=3x-4$ eta $y=x+2$.', 'Resuelve por igualación $y=3x-4$ e $y=x+2$.', 'حلّ بالمساواة $y=3x-4$ و$y=x+2$.', 'Solve by comparison $y=3x-4$ and $y=x+2$.'),
        example: same('$3x-4=x+2\\ \\to\\ x=3,\\ y=5$'),
        exampleAnswer: say('Ebazpena $(3,5)$ da: $9-4=5$ eta $3+2=5$.', 'La solución es $(3,5)$: $9-4=5$ y $3+2=5$.', 'الحل $(3,5)$: $9-4=5$ و$3+2=5$.', 'The solution is $(3,5)$: $9-4=5$ and $3+2=5$.')
    },
    reduction: {
        vocabulary: [
            say('aurkakoak', 'opuestos', 'متعاكسان', 'opposite'),
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient')
        ],
        explanation: say(
            'Biderkatu ekuazio bat edo biak, ezezagun baten koefizienteak aurkakoak izan daitezen, eta batu: ezezagun hori desagertzen da. $3x-5y=-26$ eta $4x+10y=32$: lehena bider 2, $6x-10y=-52$, eta batzean, $10x=-20$, $x=-2$; gero, $y=4$. Koefizienteak berdinak badira, kendu.',
            'Multiplica una ecuación o las dos para que los coeficientes de una incógnita sean opuestos, y suma: esa incógnita desaparece. $3x-5y=-26$ y $4x+10y=32$: la primera por 2 da $6x-10y=-52$, y al sumar, $10x=-20$, $x=-2$; después, $y=4$. Si los coeficientes ya son iguales, resta.',
            'اضرب إحدى المعادلتين أو كلتيهما لكي يصبح معاملا أحد المجهولين متعاكسين، ثم اجمع: يختفي ذلك المجهول. $3x-5y=-26$ و$4x+10y=32$: الأولى في 2 تعطي $6x-10y=-52$، وبالجمع $10x=-20$، $x=-2$؛ ثم $y=4$. وإذا كان المعاملان متساويين فاطرح.',
            'Multiply one equation or both so that the coefficients of one unknown are opposite, and add: that unknown disappears. $3x-5y=-26$ and $4x+10y=32$: the first times 2 gives $6x-10y=-52$, and adding, $10x=-20$, $x=-2$; then $y=4$. If the coefficients are already equal, subtract.'
        ),
        examplePrompt: say('Ebatzi laburketaz $3x+4y=10$ eta $5x-2y=8$.', 'Resuelve por reducción $3x+4y=10$ y $5x-2y=8$.', 'حلّ بالحذف $3x+4y=10$ و$5x-2y=8$.', 'Solve by elimination $3x+4y=10$ and $5x-2y=8$.'),
        example: same('$\\begin{gathered}10x-4y=16\\\\ 13x=26\\ \\to\\ x=2,\\ y=1\\end{gathered}$'),
        exampleAnswer: say('Bigarrena bider 2: $y$ letraren koefizienteak, $4$ eta $-4$, ezabatzen dira. Ebazpena $(2,1)$.', 'La segunda por 2: los coeficientes de $y$, $4$ y $-4$, se anulan. Solución $(2,1)$.', 'الثانية في 2: يلغي معاملا $y$، $4$ و$-4$، بعضهما. الحل $(2,1)$.', 'The second times 2: the coefficients of $y$, $4$ and $-4$, cancel. Solution $(2,1)$.'),
        why: {
            text: say(
                '$A=B$ eta $C=D$ badira, $A+C=B+D$ ere bada: bi berdintza batuta beste berdintza bat ateratzen da, eta sistemaren ebazpenak hura ere betetzen du. Koefizienteak aurkakoak badira, batuketa horretan ezezagun bat desagertzen da.',
                'Si $A=B$ y $C=D$, también $A+C=B+D$: al sumar dos igualdades sale otra igualdad, y la solución del sistema también la cumple. Si los coeficientes son opuestos, en esa suma desaparece una incógnita.',
                'إذا كان $A=B$ و$C=D$ فإن $A+C=B+D$ أيضًا: بجمع مساواتين نحصل على مساواة أخرى، وحل النظام يحققها أيضًا. وإذا كان المعاملان متعاكسين يختفي في هذا الجمع أحد المجهولين.',
                'If $A=B$ and $C=D$, then also $A+C=B+D$: adding two equalities gives another equality, and the solution of the system satisfies it too. If the coefficients are opposite, one unknown disappears in that sum.'
            )
        }
    },
    'simplify-first': {
        vocabulary: [
            say('parentesiak', 'paréntesis', 'الأقواس', 'brackets'),
            say('izendatzaileak', 'denominadores', 'المقامات', 'denominators')
        ],
        explanation: say(
            'Ekuazioek parentesiak edo izendatzaileak badituzte, sinplifikatu lehenik $ax+by=c$ eraraino: kendu parentesiak, biderkatu izendatzaileen m.k.t.-az eta pasatu ezezagunak ezkerrera. Adibidez, $\\frac{x}{5}-\\frac{y}{4}=4$, bider 20, $4x-5y=80$ bihurtzen da. Gero, aplikatu nahi duzun metodoa.',
            'Si las ecuaciones tienen paréntesis o denominadores, simplifica primero hasta llegar a la forma $ax+by=c$: quita paréntesis, multiplica por el m.c.m. de los denominadores y pasa las incógnitas a la izquierda. Por ejemplo, $\\frac{x}{5}-\\frac{y}{4}=4$, por 20, queda $4x-5y=80$. Después, aplica el método que prefieras.',
            'إذا كانت في المعادلات أقواس أو مقامات فبسّطها أولًا حتى الصورة $ax+by=c$: احذف الأقواس، واضرب في م.م.أ للمقامات، وانقل المجهولين إلى اليسار. مثلًا $\\frac{x}{5}-\\frac{y}{4}=4$ مضروبة في 20 تصير $4x-5y=80$. ثم طبّق الطريقة التي تفضّلها.',
            'If the equations have brackets or denominators, simplify first until you reach the form $ax+by=c$: remove brackets, multiply by the LCM of the denominators and move the unknowns to the left. For example, $\\frac{x}{5}-\\frac{y}{4}=4$, times 20, becomes $4x-5y=80$. Then use whichever method you prefer.'
        ),
        examplePrompt: say('Ebatzi $\\frac{x}{2}+y=5$ eta $2(x-y)=x-2$.', 'Resuelve $\\frac{x}{2}+y=5$ y $2(x-y)=x-2$.', 'حلّ $\\frac{x}{2}+y=5$ و$2(x-y)=x-2$.', 'Solve $\\frac{x}{2}+y=5$ and $2(x-y)=x-2$.'),
        example: same('$\\begin{gathered}x+2y=10\\qquad x-2y=-2\\\\ 2x=8\\ \\to\\ x=4,\\ y=3\\end{gathered}$'),
        exampleAnswer: say('Ebazpena $(4,3)$ da: $2+3=5$ eta $2\\cdot 1=4-2$.', 'Solución $(4,3)$: $2+3=5$ y $2\\cdot 1=4-2$.', 'الحل $(4,3)$: $2+3=5$ و$2\\cdot 1=4-2$.', 'Solution $(4,3)$: $2+3=5$ and $2\\cdot 1=4-2$.')
    },

    /* ---------- 3. Non-linear systems ---------- */
    'line-curve': {
        definitions: [
            {
                term: say('Sistema ez-lineala', 'Sistema no lineal', 'نظام غير خطي', 'Non-linear system'),
                meaning: say('Ekuazioren batek $x^{2}$, $y^{2}$, $xy$, zatikiak edo erroak dituen sistema.', 'Un sistema con alguna ecuación que tiene $x^{2}$, $y^{2}$, $xy$, fracciones o raíces.', 'نظام فيه معادلة تحتوي على $x^{2}$ أو $y^{2}$ أو $xy$ أو كسور أو جذور.', 'A system where some equation has $x^{2}$, $y^{2}$, $xy$, fractions or roots.')
            }
        ],
        vocabulary: [
            say('zirkunferentzia', 'circunferencia', 'الدائرة', 'circle'),
            say('lineala', 'lineal', 'خطية', 'linear')
        ],
        explanation: say(
            'Ekuazio bat lineala bada, askatu ezezagun bat hartan eta ordeztu bestean: bigarren mailako ekuazio bat geratzen da, gehienez bi ebazpenekin. $x^{2}+y^{2}=25$ eta $x+y=7$: $y=7-x$ ordeztuta, $x^{2}-7x+12=0$, $x=3$ eta $x=4$ ebazpenekin; beraz, $(3,4)$ eta $(4,3)$: zirkunferentziaren eta zuzenaren ebaki-puntuak.',
            'Si una ecuación es lineal, despeja una incógnita en ella y sustitúyela en la otra: queda una ecuación de segundo grado, con dos soluciones como mucho. $x^{2}+y^{2}=25$ y $x+y=7$: con $y=7-x$ sale $x^{2}-7x+12=0$, con $x=3$ y $x=4$, así que $(3,4)$ y $(4,3)$: los cortes de la circunferencia y la recta.',
            'إذا كانت إحدى المعادلتين خطية فاعزل فيها مجهولًا وعوّضه في الأخرى: تبقى معادلة من الدرجة الثانية لها حلان على الأكثر. $x^{2}+y^{2}=25$ و$x+y=7$: مع $y=7-x$ نحصل على $x^{2}-7x+12=0$، فيها $x=3$ و$x=4$، إذن $(3,4)$ و$(4,3)$: نقطتا تقاطع الدائرة والمستقيم.',
            'If one equation is linear, solve it for one unknown and substitute into the other: you get a quadratic equation, with two solutions at most. $x^{2}+y^{2}=25$ and $x+y=7$: with $y=7-x$ you get $x^{2}-7x+12=0$, with $x=3$ and $x=4$, so $(3,4)$ and $(4,3)$: where the circle and the line cross.'
        ),
        examplePrompt: say('Ebatzi $y=x^{2}-3x$ eta $y=x-3$.', 'Resuelve $y=x^{2}-3x$ e $y=x-3$.', 'حلّ $y=x^{2}-3x$ و$y=x-3$.', 'Solve $y=x^{2}-3x$ and $y=x-3$.'),
        example: same('$\\begin{gathered}x^{2}-3x=x-3\\ \\to\\ x^{2}-4x+3=0\\\\ (1,-2)\\qquad(3,0)\\end{gathered}$'),
        exampleAnswer: say('Bi ebazpen: zuzenak parabola bi puntutan mozten du.', 'Dos soluciones: la recta corta a la parábola en dos puntos.', 'حلان: يقطع المستقيم القطع المكافئ في نقطتين.', 'Two solutions: the line crosses the parabola at two points.')
    },
    squares: {
        vocabulary: [
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('karratua', 'cuadrado', 'المربع', 'square')
        ],
        explanation: say(
            'Bi ekuazioek $x^{2}$ eta $y^{2}$ bakarrik badituzte, hartu ezezagun gisa eta erabili laburketa: $x^{2}+y^{2}=41$ eta $x^{2}-y^{2}=9$ batuta, $2x^{2}=50$, beraz $x=\\pm 5$, eta $y^{2}=16$, $y=\\pm 4$. Zeinu guztiak konbinatzen dira: lau ebazpen. Karratu negatibo bat ateratzen bada, ez dago ebazpen errealik.',
            'Si las dos ecuaciones solo tienen $x^{2}$ e $y^{2}$, trátalas como incógnitas y usa reducción: $x^{2}+y^{2}=41$ y $x^{2}-y^{2}=9$ suman $2x^{2}=50$, así que $x=\\pm 5$, e $y^{2}=16$, $y=\\pm 4$. Todos los signos se combinan: cuatro soluciones. Si sale un cuadrado negativo, no hay solución real.',
            'إذا لم يكن في المعادلتين إلا $x^{2}$ و$y^{2}$ فعاملهما مجهولين واستعمل الحذف: مجموع $x^{2}+y^{2}=41$ و$x^{2}-y^{2}=9$ هو $2x^{2}=50$، إذن $x=\\pm 5$، و$y^{2}=16$، $y=\\pm 4$. وتتوافق كل الإشارات: أربعة حلول. وإذا ظهر مربع سالب فلا حل حقيقي.',
            'If both equations only have $x^{2}$ and $y^{2}$, treat them as the unknowns and use elimination: $x^{2}+y^{2}=41$ and $x^{2}-y^{2}=9$ add to $2x^{2}=50$, so $x=\\pm 5$, and $y^{2}=16$, $y=\\pm 4$. All the signs combine: four solutions. If a square comes out negative, there is no real solution.'
        ),
        examplePrompt: say('Ebatzi $x^{2}+y^{2}=20$ eta $x^{2}-y^{2}=12$.', 'Resuelve $x^{2}+y^{2}=20$ y $x^{2}-y^{2}=12$.', 'حلّ $x^{2}+y^{2}=20$ و$x^{2}-y^{2}=12$.', 'Solve $x^{2}+y^{2}=20$ and $x^{2}-y^{2}=12$.'),
        example: same('$\\begin{gathered}2x^{2}=32\\ \\to\\ x=\\pm 4\\\\ y^{2}=20-16=4\\ \\to\\ y=\\pm 2\\end{gathered}$'),
        exampleAnswer: say('Lau ebazpen: $(4,2)$, $(4,-2)$, $(-4,2)$ eta $(-4,-2)$.', 'Cuatro soluciones: $(4,2)$, $(4,-2)$, $(-4,2)$ y $(-4,-2)$.', 'أربعة حلول: $(4,2)$ و$(4,-2)$ و$(-4,2)$ و$(-4,-2)$.', 'Four solutions: $(4,2)$, $(4,-2)$, $(-4,2)$ and $(-4,-2)$.')
    },
    'check-solutions': {
        vocabulary: [
            say('egiaztatu', 'comprueba', 'تحقّق', 'check'),
            say('ebazpen faltsuak', 'soluciones falsas', 'حلول زائفة', 'false solutions')
        ],
        explanation: say(
            'Metodoa bera da: askatu eta ordeztu. $xy=6$ eta $y=x-1$: $x(x-1)=6$, $x^{2}-x-6=0$, $x=3$ eta $x=-2$ ebazpenekin; beraz, $(3,2)$ eta $(-2,-3)$. Zatikiekin, baztertu izendatzaile bat anulatzen duten bikoteak; erroekin, karratura jasotzean ebazpen faltsuak ager daitezke: egiaztatu bakoitza.',
            'El método es el mismo: despeja y sustituye. $xy=6$ e $y=x-1$: $x(x-1)=6$, $x^{2}-x-6=0$, con $x=3$ y $x=-2$, así que las soluciones son $(3,2)$ y $(-2,-3)$. Con fracciones, descarta las parejas que anulan un denominador; con raíces, al elevar al cuadrado pueden aparecer soluciones falsas: comprueba cada una.',
            'الطريقة نفسها: اعزل وعوّض. $xy=6$ و$y=x-1$: $x(x-1)=6$، $x^{2}-x-6=0$، فيها $x=3$ و$x=-2$، إذن الحلان $(3,2)$ و$(-2,-3)$. مع الكسور استبعد الأزواج التي تجعل مقامًا صفرًا، ومع الجذور قد تظهر عند التربيع حلول زائفة: تحقّق من كل حل.',
            'The method is the same: solve and substitute. $xy=6$ and $y=x-1$: $x(x-1)=6$, $x^{2}-x-6=0$, with $x=3$ and $x=-2$, so the solutions are $(3,2)$ and $(-2,-3)$. With fractions, discard the pairs that make a denominator zero; with roots, squaring can bring in false solutions: check each one.'
        ),
        examplePrompt: say('Ebatzi $xy=-4$ eta $x+y=3$.', 'Resuelve $xy=-4$ y $x+y=3$.', 'حلّ $xy=-4$ و$x+y=3$.', 'Solve $xy=-4$ and $x+y=3$.'),
        example: same('$\\begin{gathered}x(3-x)=-4\\ \\to\\ x^{2}-3x-4=0\\\\ (4,-1)\\qquad(-1,4)\\end{gathered}$'),
        exampleAnswer: say('Egiaztatu: $4\\cdot(-1)=-4$ eta $4-1=3$.', 'Comprueba: $4\\cdot(-1)=-4$ y $4-1=3$.', 'تحقّق: $4\\cdot(-1)=-4$ و$4-1=3$.', 'Check: $4\\cdot(-1)=-4$ and $4-1=3$.')
    },

    /* ---------- 4. Inequalities in two unknowns ---------- */
    'half-plane': {
        definitions: [
            {
                term: say('Erdiplanoa', 'Semiplano', 'نصف المستوى', 'Half-plane'),
                meaning: say('Zuzen batek planoa banatzen duen bi zatietako bakoitza.', 'Cada una de las dos partes en que una recta divide el plano.', 'كل جزء من الجزأين اللذين يقسم إليهما مستقيمٌ المستوى.', 'Each of the two parts a line splits the plane into.')
            }
        ],
        vocabulary: [
            say('muga-zuzena', 'recta frontera', 'المستقيم الحدّي', 'boundary line'),
            say('proba-puntua', 'punto de prueba', 'نقطة الاختبار', 'test point')
        ],
        explanation: say(
            '$ax+by\\le c$ ebazteko: marraztu $ax+by=c$ muga-zuzena, aukeratu hartan ez dagoen proba-puntu bat, normalean $(0,0)$, eta begiratu inekuazioa betetzen duen. $2x+y\\le 4$ inekuazioan, $(0,0)$ puntuak $0\\le 4$ ematen du; beraz, ebazpena $(0,0)$ duen erdiplanoa da, zuzena barne.',
            'Para resolver $ax+by\\le c$: dibuja la recta frontera $ax+by=c$, elige un punto de prueba que no esté en ella, normalmente $(0,0)$, y mira si cumple la inecuación. En $2x+y\\le 4$, $(0,0)$ da $0\\le 4$, así que la solución es el semiplano que contiene $(0,0)$, con la recta incluida.',
            'لحل $ax+by\\le c$: ارسم المستقيم الحدّي $ax+by=c$، واختر نقطة اختبار ليست عليه، عادةً $(0,0)$، وانظر هل تحقق المتراجحة. في $2x+y\\le 4$ تعطي $(0,0)$ القيمة $0\\le 4$، إذن الحل نصف المستوى الذي يحوي $(0,0)$ مع المستقيم.',
            'To solve $ax+by\\le c$: draw the boundary line $ax+by=c$, pick a test point that is not on it, usually $(0,0)$, and see whether it satisfies the inequality. In $2x+y\\le 4$, $(0,0)$ gives $0\\le 4$, so the solution is the half-plane that contains $(0,0)$, line included.'
        ),
        examplePrompt: say('Zein erdiplano da $x-2y>2$ inekuazioaren ebazpena?', '¿Qué semiplano es la solución de $x-2y>2$?', 'ما نصف المستوى الذي هو حل $x-2y>2$؟', 'Which half-plane is the solution of $x-2y>2$?'),
        example: same('$\\begin{gathered}x-2y=2\\ \\to\\ (0,-1),\\ (2,0)\\\\ 0-2\\cdot 0=0\\end{gathered}$'),
        exampleAnswer: say('$0>2$ faltsua denez, $(0,0)$ ez duen erdiplanoa, zuzena kanpo (lerro etena).', 'Como $0>2$ es falso, el semiplano que no contiene $(0,0)$, sin la recta (línea discontinua).', 'لأن $0>2$ خطأ فالحل نصف المستوى الذي لا يحوي $(0,0)$، دون المستقيم (خط متقطع).', 'Since $0>2$ is false, the half-plane without $(0,0)$, line not included (dashed line).'),
        why: {
            text: say(
                'Zuzenaren alde batean $ax+by-c$ beti positiboa da, eta bestean beti negatiboa: alde batetik bestera pasatzeko, zuzena gurutzatu behar da, eta han 0 da. Horregatik, proba-puntu bakar batek esaten du erdiplano osoak betetzen duen ala ez.',
                'A un lado de la recta $ax+by-c$ es siempre positivo, y al otro, siempre negativo: para pasar de un lado al otro hay que cruzar la recta, y allí vale 0. Por eso, un solo punto de prueba dice si todo el semiplano cumple la inecuación.',
                'في جهة من المستقيم تكون $ax+by-c$ موجبة دائمًا وفي الجهة الأخرى سالبة دائمًا: للانتقال من جهة إلى أخرى يجب عبور المستقيم، وهناك قيمتها 0. لذلك تكفي نقطة اختبار واحدة لمعرفة هل يحقق نصف المستوى كله المتراجحة.',
                'On one side of the line $ax+by-c$ is always positive, and on the other always negative: to get from one side to the other you must cross the line, where it is 0. That is why one test point tells you whether the whole half-plane satisfies the inequality.'
            )
        }
    },
    region: {
        vocabulary: [
            say('eskualdea', 'región', 'المنطقة', 'region'),
            say('erpinak', 'vértices', 'الرؤوس', 'vertices')
        ],
        explanation: say(
            'Ebatzi inekuazio bakoitza bere erdiplanoarekin; sistemaren ebazpena zati komuna da, eskualde bat. $y\\ge 1$, $x\\le 4$ eta $y\\le x$ inekuazioek triangelu bat ematen dute. Haren erpinak muga-zuzenen ebaki-puntuak dira, binaka: $(1,1)$, $(4,1)$ eta $(4,4)$.',
            'Resuelve cada inecuación con su semiplano; la solución del sistema es la parte común, una región. $y\\ge 1$, $x\\le 4$ e $y\\le x$ dan un triángulo. Sus vértices son los cortes de las rectas frontera, de dos en dos: $(1,1)$, $(4,1)$ y $(4,4)$.',
            'حلّ كل متراجحة بنصف مستواها؛ وحل النظام هو الجزء المشترك، أي منطقة. $y\\ge 1$ و$x\\le 4$ و$y\\le x$ تعطي مثلثًا. ورؤوسه نقاط تقاطع المستقيمات الحدّية مثنى مثنى: $(1,1)$ و$(4,1)$ و$(4,4)$.',
            'Solve each inequality with its half-plane; the solution of the system is the common part, a region. $y\\ge 1$, $x\\le 4$ and $y\\le x$ give a triangle. Its vertices are where the boundary lines cross, two at a time: $(1,1)$, $(4,1)$ and $(4,4)$.'
        ),
        examplePrompt: say('Marraztu $x\\ge 0$, $y\\ge 0$, $x+y\\le 3$ eskualdea. Zein dira haren erpinak?', 'Dibuja la región $x\\ge 0$, $y\\ge 0$, $x+y\\le 3$. ¿Cuáles son sus vértices?', 'ارسم المنطقة $x\\ge 0$، $y\\ge 0$، $x+y\\le 3$. ما رؤوسها؟', 'Draw the region $x\\ge 0$, $y\\ge 0$, $x+y\\le 3$. What are its vertices?'),
        example: same('$(0,0)\\qquad(3,0)\\qquad(0,3)$'),
        exampleAnswer: say('Triangelu bat: $x+y=3$ zuzenak ardatzekin dituen ebaki-puntuak eta jatorria.', 'Un triángulo: los cortes de $x+y=3$ con los ejes y el origen.', 'مثلث: نقطتا تقاطع $x+y=3$ مع المحورين ونقطة الأصل.', 'A triangle: where $x+y=3$ crosses the axes, and the origin.')
    },

    /* ---------- 5. Problems ---------- */
    'linear-problems': {
        vocabulary: [
            say('enuntziatua', 'enunciado', 'نص المسألة', 'statement'),
            say('taula', 'tabla', 'جدول', 'table')
        ],
        explanation: say(
            'Izendatu bi ezezagunak, idatzi enuntziatuaren bi baldintzak ekuazio gisa, ebatzi eta egiaztatu enuntziatuan. Taula batek asko laguntzen du. 20 buru eta 56 hanka dituzten oiloak eta untxiak: $x+y=20$ eta $2x+4y=56$, beraz $y=8$ untxi eta $x=12$ oilo. Ebazpenek zentzua izan behar dute: osoak eta ez-negatiboak.',
            'Nombra las dos incógnitas, escribe las dos condiciones del enunciado como ecuaciones, resuelve y comprueba en el enunciado. Una tabla ayuda mucho. Gallinas y conejos con 20 cabezas y 56 patas: $x+y=20$ y $2x+4y=56$, así que $y=8$ conejos y $x=12$ gallinas. Las soluciones tienen que tener sentido: enteras y no negativas.',
            'سمِّ المجهولين، واكتب شرطي نص المسألة معادلتين، وحلّ، وتحقّق في النص. ويساعد الجدول كثيرًا. دجاج وأرانب لها 20 رأسًا و56 رجلًا: $x+y=20$ و$2x+4y=56$، إذن $y=8$ أرانب و$x=12$ دجاجة. ويجب أن يكون للحلول معنى: صحيحة وغير سالبة.',
            'Name the two unknowns, write the two conditions of the statement as equations, solve and check in the statement. A table helps a lot. Hens and rabbits with 20 heads and 56 legs: $x+y=20$ and $2x+4y=56$, so $y=8$ rabbits and $x=12$ hens. The solutions must make sense: whole and not negative.'
        ),
        examplePrompt: say('Aparkaleku batean 30 ibilgailu daude, autoak eta motorrak, 100 gurpilekin. Zenbat auto daude?', 'En un aparcamiento hay 30 vehículos entre coches y motos, con 100 ruedas. ¿Cuántos coches hay?', 'في موقف 30 مركبة بين سيارات ودراجات نارية، لها 100 عجلة. كم سيارة فيه؟', 'A car park has 30 vehicles, cars and motorbikes, with 100 wheels. How many cars are there?'),
        example: same('$\\begin{gathered}x+y=30\\qquad 4x+2y=100\\\\ 2x=40\\ \\to\\ x=20,\\ y=10\\end{gathered}$'),
        exampleAnswer: say('20 auto eta 10 motor: $80+20=100$ gurpil.', '20 coches y 10 motos: $80+20=100$ ruedas.', '20 سيارة و10 دراجات: $80+20=100$ عجلة.', '20 cars and 10 motorbikes: $80+20=100$ wheels.')
    },
    'nonlinear-problems': {
        vocabulary: [
            say('diagonala', 'diagonal', 'القطر', 'diagonal'),
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter')
        ],
        explanation: say(
            'Azalerek, Pitagorasen teoremak edo biderkadurek bigarren mailako ekuazioak ematen dituzte. 34 cm-ko perimetroa eta 13 cm-ko diagonala dituen laukizuzena: $x+y=17$ eta $x^{2}+y^{2}=169$; ordeztuta, $x^{2}-17x+60=0$, beraz aldeek 12 eta 5 cm neurtzen dute. Baztertu ebazpen negatiboak.',
            'Las áreas, el teorema de Pitágoras o los productos dan ecuaciones de segundo grado. Un rectángulo de 34 cm de perímetro y 13 cm de diagonal: $x+y=17$ y $x^{2}+y^{2}=169$; al sustituir, $x^{2}-17x+60=0$, así que los lados miden 12 y 5 cm. Descarta las soluciones negativas.',
            'المساحات ومبرهنة فيثاغورس والجداءات تعطي معادلات من الدرجة الثانية. مستطيل محيطه 34 سم وقطره 13 سم: $x+y=17$ و$x^{2}+y^{2}=169$؛ وبالتعويض $x^{2}-17x+60=0$، إذن طولا ضلعيه 12 و5 سم. استبعد الحلول السالبة.',
            'Areas, Pythagoras\' theorem or products give quadratic equations. A rectangle with a 34 cm perimeter and a 13 cm diagonal: $x+y=17$ and $x^{2}+y^{2}=169$; substituting, $x^{2}-17x+60=0$, so the sides are 12 and 5 cm. Discard negative solutions.'
        ),
        examplePrompt: say('Bi zenbakiren batura 11 da, eta haien karratuen batura, 61. Zein dira?', 'Dos números suman 11 y la suma de sus cuadrados es 61. ¿Cuáles son?', 'مجموع عددين 11 ومجموع مربعيهما 61. ما هما؟', 'Two numbers add up to 11 and the sum of their squares is 61. What are they?'),
        example: same('$\\begin{gathered}x^{2}+(11-x)^{2}=61\\\\ x^{2}-11x+30=0\\ \\to\\ x=5,\\ x=6\\end{gathered}$'),
        exampleAnswer: say('5 eta 6: $25+36=61$.', '5 y 6: $25+36=61$.', '5 و6: $25+36=61$.', '5 and 6: $25+36=61$.')
    },
    'region-problems': {
        vocabulary: [
            say('gehienez', 'como mucho', 'على الأكثر', 'at most'),
            say('osoak', 'enteras', 'صحيحة', 'whole')
        ],
        explanation: say(
            '«Gehienez», «gutxienez» edo «ez pasatu» esaten denean, inekuazioak agertzen dira. 12 € ogitarteko (3 €) eta freskagarrietarako (2 €): $3x+2y\\le 12$, $x\\ge 0$ eta $y\\ge 0$ baldintzekin. Eskualdea $(0,0)$, $(4,0)$ eta $(0,6)$ erpinak dituen triangelua da; kopuruak osoak direnez, haren puntu osoak bakarrik dira baliozkoak.',
            'Cuando se dice «como mucho», «al menos» o «no pasar de», aparecen inecuaciones. Con 12 € para bocadillos de 3 € y refrescos de 2 €: $3x+2y\\le 12$, con $x\\ge 0$ e $y\\ge 0$. La región es un triángulo de vértices $(0,0)$, $(4,0)$ y $(0,6)$; como las cantidades son enteras, solo valen sus puntos enteros.',
            'عندما يقال «على الأكثر» أو «على الأقل» أو «لا يتجاوز» تظهر المتراجحات. مع 12 € لشطائر بسعر 3 € ومشروبات بسعر 2 €: $3x+2y\\le 12$ مع $x\\ge 0$ و$y\\ge 0$. المنطقة مثلث رؤوسه $(0,0)$ و$(4,0)$ و$(0,6)$؛ ولأن الكميات صحيحة لا تصلح إلا نقاطها الصحيحة.',
            'When a problem says “at most”, “at least” or “not more than”, inequalities appear. With €12 for €3 sandwiches and €2 drinks: $3x+2y\\le 12$, with $x\\ge 0$ and $y\\ge 0$. The region is a triangle with vertices $(0,0)$, $(4,0)$ and $(0,6)$; as the amounts are whole numbers, only its whole-number points count.'
        ),
        examplePrompt: say('15 €-rekin 4 €-ko koadernoak eta 1 €-ko boligrafoak erosten ditut. 2 koaderno erosten baditut, gehienez zenbat boligrafo?', 'Con 15 € compro cuadernos de 4 € y bolígrafos de 1 €. Si compro 2 cuadernos, ¿cuántos bolígrafos como mucho?', 'بـ 15 € أشتري دفاتر بسعر 4 € وأقلامًا بسعر 1 €. إذا اشتريت دفترين، فكم قلمًا على الأكثر؟', 'With €15 I buy €4 notebooks and €1 pens. If I buy 2 notebooks, how many pens at most?'),
        example: same('$4\\cdot 2+y\\le 15\\ \\to\\ y\\le 7$'),
        exampleAnswer: say('Gehienez, 7 boligrafo.', 'Como mucho, 7 bolígrafos.', 'على الأكثر 7 أقلام.', 'At most, 7 pens.')
    }
}

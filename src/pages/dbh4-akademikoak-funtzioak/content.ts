import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from './text.ts'

/* ==========================================================================
   Funtzioak · 4. DBH akademikoak — diagnostic, guided practice, exercise
   bank and challenges, after Anaya 4.º Académicas unit 4 and Santillana
   4.º Académicas unit 9 (images and antiimages, domain and range, domains
   of fractions and roots, discontinuities, functions defined piecewise,
   intercepts, sign, symmetry, increasing and decreasing, the average rate
   of change and periodic functions). Every closed answer is a single
   number: an image, an end of an interval, a root, a parameter, a rate.
   ========================================================================== */

/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

export const functionsAkDiagnostic: DiagnosticQuestion[] = [
    {
        id: 5701,
        prompt: say('Zein erlazio EZ da funtzio bat?', '¿Qué relación NO es una función?', 'أي علاقة ليست دالة؟', 'Which relationship is NOT a function?'),
        options: [same('$y=x^{2}$'), same('$y^{2}=x$'), same('$y=2x+1$')],
        correctIndex: 1,
        explanation: say('$y^{2}=x$ erlazioan $x=4$ balioari $y=2$ eta $y=-2$ dagozkio.', 'En $y^{2}=x$, a $x=4$ le corresponden $y=2$ e $y=-2$.', 'في $y^{2}=x$ يقابل $x=4$ القيمتان $y=2$ و$y=-2$.', 'In $y^{2}=x$, $x=4$ gives $y=2$ and $y=-2$.'),
        topic: 'what-is'
    },
    {
        id: 5702,
        prompt: say('$f(x)=x^{2}-3x$ bada, $f(-2)$ hau da:', 'Si $f(x)=x^{2}-3x$, $f(-2)$ vale:', 'إذا كان $f(x)=x^{2}-3x$ فإن $f(-2)$ تساوي:', 'If $f(x)=x^{2}-3x$, $f(-2)$ is:'),
        options: [same('$10$'), same('$-2$'), same('$2$')],
        correctIndex: 0,
        explanation: same('$(-2)^{2}-3\\cdot(-2)=4+6=10$'),
        topic: 'images'
    },
    {
        id: 5703,
        prompt: say('$y=\\frac{3}{x-4}$ funtzioaren izate-eremua:', 'El dominio de $y=\\frac{3}{x-4}$ es:', 'مجال $y=\\frac{3}{x-4}$ هو:', 'The domain of $y=\\frac{3}{x-4}$ is:'),
        options: [same('$\\mathbb{R}$'), same('$\\mathbb{R}-\\{4\\}$'), same('$\\mathbb{R}-\\{-4\\}$')],
        correctIndex: 1,
        explanation: say('Izendatzailea 0 da $x=4$ denean.', 'El denominador se anula en $x=4$.', 'ينعدم المقام عند $x=4$.', 'The denominator becomes 0 when $x=4$.'),
        topic: 'rational-domain'
    },
    {
        id: 5704,
        prompt: say('$y=\\sqrt{x-3}$ funtzioaren izate-eremua:', 'El dominio de $y=\\sqrt{x-3}$ es:', 'مجال $y=\\sqrt{x-3}$ هو:', 'The domain of $y=\\sqrt{x-3}$ is:'),
        options: [same('$[3,\\,+\\infty)$'), same('$(3,\\,+\\infty)$'), same('$(-\\infty,\\,3]$')],
        correctIndex: 0,
        explanation: say('$x-3\\ge 0$, beraz $x\\ge 3$, 3 barne.', '$x-3\\ge 0$, así que $x\\ge 3$, con el 3 incluido.', '$x-3\\ge 0$، إذن $x\\ge 3$ مع 3.', '$x-3\\ge 0$, so $x\\ge 3$, with 3 included.'),
        topic: 'radical-domain'
    },
    {
        id: 5705,
        prompt: say('$y=\\frac{1}{x}$ funtzioak $x=0$ puntuan duen etenunea:', 'La discontinuidad de $y=\\frac{1}{x}$ en $x=0$ es:', 'انقطاع $y=\\frac{1}{x}$ عند $x=0$ هو:', 'The discontinuity of $y=\\frac{1}{x}$ at $x=0$ is:'),
        options: [say('saihesgarria', 'evitable', 'قابل للإزالة', 'removable'), say('jauzi finitukoa', 'de salto finito', 'قفزة منتهية', 'a finite jump'), say('jauzi infinitukoa', 'de salto infinito', 'قفزة لانهائية', 'an infinite jump')],
        correctIndex: 2,
        explanation: say('0ra hurbiltzean $y$ gero eta handiagoa da (balio absolutuan): adar infinitu bat.', 'Al acercarse a 0, $y$ se hace cada vez más grande (en valor absoluto): una rama infinita.', 'عند الاقتراب من 0 تكبر $y$ أكثر فأكثر (بالقيمة المطلقة): فرع لانهائي.', 'As you get close to 0, $y$ grows bigger and bigger (in absolute value): an infinite branch.'),
        topic: 'discontinuities'
    },
    {
        id: 5706,
        prompt: say('$y=x^{2}-5x+6$ funtzioak Y ardatza puntu honetan ebakitzen du:', '$y=x^{2}-5x+6$ corta al eje Y en:', 'تقطع $y=x^{2}-5x+6$ محور Y في:', '$y=x^{2}-5x+6$ crosses the y-axis at:'),
        options: [same('$(2,\\,0)$'), same('$(6,\\,0)$'), same('$(0,\\,6)$')],
        correctIndex: 2,
        explanation: say('$x=0$ jarrita, $y=6$.', 'Poniendo $x=0$, $y=6$.', 'بوضع $x=0$ يكون $y=6$.', 'Putting $x=0$ gives $y=6$.'),
        topic: 'intercepts'
    },
    {
        id: 5707,
        prompt: say('$f(x)=x^{4}-x^{2}$ funtzioa hau da:', 'La función $f(x)=x^{4}-x^{2}$ es:', 'الدالة $f(x)=x^{4}-x^{2}$:', 'The function $f(x)=x^{4}-x^{2}$ is:'),
        options: [say('bikoitia', 'par', 'زوجية', 'even'), say('bakoitia', 'impar', 'فردية', 'odd'), say('ez bata ez bestea', 'ni par ni impar', 'لا زوجية ولا فردية', 'neither even nor odd')],
        correctIndex: 0,
        explanation: say('Berretzaile bikoitiak bakarrik: $f(-x)=f(x)$.', 'Solo exponentes pares: $f(-x)=f(x)$.', 'أسس زوجية فقط: $f(-x)=f(x)$.', 'Only even exponents: $f(-x)=f(x)$.'),
        topic: 'symmetry'
    },
    {
        id: 5708,
        prompt: say('$f(x)=x^{2}$ funtzioaren T.V.M. $[1,\\,3]$ tartean:', 'La T.V.M. de $f(x)=x^{2}$ en $[1,\\,3]$ es:', 'معدل التغير المتوسط لـ $f(x)=x^{2}$ في $[1,\\,3]$ هو:', 'The average rate of change of $f(x)=x^{2}$ on $[1,\\,3]$ is:'),
        options: [same('$8$'), same('$4$'), same('$2$')],
        correctIndex: 1,
        explanation: same('$\\frac{9-1}{3-1}=4$'),
        topic: 'rate'
    }
]

export const functionsAkPractice: PracticeItem[] = [
    /* ---------- Functions and graphs ---------- */
    {
        id: 1, stage: 'concept',
        prompt: say('$f(x)=2x^{2}-3x+1$ izanik, kalkulatu $f(-2)$.', 'Siendo $f(x)=2x^{2}-3x+1$, calcula $f(-2)$.', 'إذا كان $f(x)=2x^{2}-3x+1$ فاحسب $f(-2)$.', 'Given $f(x)=2x^{2}-3x+1$, calculate $f(-2)$.'),
        expected: n(15),
        hint: say('Ordeztu $-2$ parentesi artean eta egin berretura lehenik.', 'Sustituye $-2$ entre paréntesis y haz primero la potencia.', 'عوّض $-2$ بين قوسين واحسب القوة أولًا.', 'Substitute $-2$ in brackets, and do the power first.'),
        explanation: same('$2\\cdot(-2)^{2}-3\\cdot(-2)+1=8+6+1=15$')
    },
    {
        id: 2, stage: 'concept',
        prompt: say('Plano inklinatu batean bola batek $e=0{,}1t^{2}$ metro egiten ditu $t$ segundotan. Zenbat segundo behar ditu 2,5 m egiteko?', 'En un plano inclinado una bola recorre $e=0{,}1t^{2}$ metros en $t$ segundos. ¿Cuántos segundos tarda en recorrer 2,5 m?', 'على مستوى مائل تقطع كرة $e=0{,}1t^{2}$ مترًا في $t$ ثانية. كم ثانية تحتاج لتقطع 2.5 م؟', 'On an inclined plane, a ball travels $e=0{,}1t^{2}$ metres in $t$ seconds. How many seconds does it take to travel 2.5 m?'),
        expected: n(5),
        hint: say('Ebatzi $0{,}1t^{2}=2{,}5$ eta baztertu soluzio negatiboa.', 'Resuelve $0{,}1t^{2}=2{,}5$ y descarta la solución negativa.', 'حُلّ $0{,}1t^{2}=2{,}5$ واستبعد الحل السالب.', 'Solve $0{,}1t^{2}=2{,}5$ and reject the negative solution.'),
        explanation: same('$t^{2}=\\frac{2{,}5}{0{,}1}=25\\ \\to\\ t=5$')
    },
    {
        id: 3, stage: 'concept',
        prompt: say('$f(x)=x^{2}-2x$ bada, zein $x$ positibok du 8 irudia?', 'Si $f(x)=x^{2}-2x$, ¿qué $x$ positiva tiene imagen 8?', 'إذا كان $f(x)=x^{2}-2x$ فما قيمة $x$ الموجبة التي صورتها 8؟', 'If $f(x)=x^{2}-2x$, which positive $x$ has an image of 8?'),
        expected: n(4),
        hint: say('Ebatzi $x^{2}-2x=8$.', 'Resuelve $x^{2}-2x=8$.', 'حُلّ $x^{2}-2x=8$.', 'Solve $x^{2}-2x=8$.'),
        explanation: same('$x^{2}-2x-8=0\\ \\to\\ x=4,\\ x=-2$')
    },
    {
        id: 4, stage: 'concept',
        prompt: say('$y=x^{2}+1$ funtzioaren izate-eremua $[-1,\\,2]$ da. Zein da haren ibiltartearen balio handiena?', 'La función $y=x^{2}+1$ tiene dominio $[-1,\\,2]$. ¿Cuál es el mayor valor de su recorrido?', 'مجال الدالة $y=x^{2}+1$ هو $[-1,\\,2]$. ما أكبر قيمة في مداها؟', 'The function $y=x^{2}+1$ has domain $[-1,\\,2]$. What is the largest value in its range?'),
        expected: n(5),
        hint: say('Kalkulatu muturretan eta erpinean ($x=0$).', 'Calcula en los extremos y en el vértice ($x=0$).', 'احسب عند الطرفين وعند الرأس ($x=0$).', 'Calculate at the ends and at the vertex ($x=0$).'),
        explanation: say('$f(-1)=2$, $f(0)=1$ eta $f(2)=5$: Rec $f=[1,\\,5]$.', '$f(-1)=2$, $f(0)=1$ y $f(2)=5$: Rec $f=[1,\\,5]$.', '$f(-1)=2$ و$f(0)=1$ و$f(2)=5$: Rec $f=[1,\\,5]$.', '$f(-1)=2$, $f(0)=1$ and $f(2)=5$: Range $f=[1,\\,5]$.')
    },
    /* ---------- Domain ---------- */
    {
        id: 5, stage: 'domain',
        prompt: say('Bi zenbaki ez daude $y=\\frac{x}{x^{2}-x-6}$ funtzioaren izate-eremuan. Zein da handiena?', 'Hay dos números que no están en el dominio de $y=\\frac{x}{x^{2}-x-6}$. ¿Cuál es el mayor?', 'هناك عددان ليسا في مجال $y=\\frac{x}{x^{2}-x-6}$. ما الأكبر؟', 'Two numbers are not in the domain of $y=\\frac{x}{x^{2}-x-6}$. Which is the larger one?'),
        expected: n(3),
        hint: say('Berdindu izendatzailea 0ri.', 'Iguala el denominador a 0.', 'ساوِ المقام بـ 0.', 'Set the denominator equal to 0.'),
        explanation: same('$x^{2}-x-6=0\\ \\to\\ x=3,\\ x=-2\\qquad \\mathbb{R}-\\{-2,\\,3\\}$')
    },
    {
        id: 6, stage: 'domain',
        prompt: say('Zein da $y=\\sqrt{12-3x}$ funtzioaren izate-eremuaren eskuineko muturra?', '¿Cuál es el extremo derecho del dominio de $y=\\sqrt{12-3x}$?', 'ما الطرف الأيمن لمجال $y=\\sqrt{12-3x}$؟', 'What is the right-hand end of the domain of $y=\\sqrt{12-3x}$?'),
        expected: n(4),
        hint: say('Errokizuna ≥ 0.', 'Radicando ≥ 0.', 'ما تحت الجذر ≥ 0.', 'Radicand ≥ 0.'),
        explanation: same('$12-3x\\ge 0\\ \\to\\ x\\le 4\\qquad (-\\infty,\\,4]$')
    },
    {
        id: 7, stage: 'domain',
        prompt: say('Zenbat zenbaki oso EZ daude $y=\\sqrt{x^{2}-16}$ funtzioaren izate-eremuan?', '¿Cuántos números enteros NO están en el dominio de $y=\\sqrt{x^{2}-16}$?', 'كم عددًا صحيحًا ليس في مجال $y=\\sqrt{x^{2}-16}$؟', 'How many integers are NOT in the domain of $y=\\sqrt{x^{2}-16}$?'),
        expected: n(7),
        hint: say('Erroak ±4 dira; errokizuna negatiboa da tartean.', 'Las raíces son ±4; el radicando es negativo entre ellas.', 'الجذران ±4؛ وما تحت الجذر سالب بينهما.', 'The roots are ±4; the radicand is negative between them.'),
        explanation: say('Dom $f=(-\\infty,\\,-4]\\cup[4,\\,+\\infty)$; kanpoan $-3,\\ldots,3$ geratzen dira: 7 zenbaki.', 'Dom $f=(-\\infty,\\,-4]\\cup[4,\\,+\\infty)$; quedan fuera $-3,\\ldots,3$: 7 números.', 'Dom $f=(-\\infty,\\,-4]\\cup[4,\\,+\\infty)$؛ تبقى خارجه $-3,\\ldots,3$: 7 أعداد.', 'Domain $f=(-\\infty,\\,-4]\\cup[4,\\,+\\infty)$; the numbers left out are $-3,\\ldots,3$: 7 numbers.')
    },
    {
        id: 8, stage: 'domain',
        prompt: say('Zein da $y=\\frac{1}{\\sqrt{2x-6}}$ funtzioaren izate-eremuko zenbaki oso txikiena?', '¿Cuál es el menor número entero del dominio de $y=\\frac{1}{\\sqrt{2x-6}}$?', 'ما أصغر عدد صحيح في مجال $y=\\frac{1}{\\sqrt{2x-6}}$؟', 'What is the smallest integer in the domain of $y=\\frac{1}{\\sqrt{2x-6}}$?'),
        expected: n(4),
        hint: say('Erroa izendatzailean: > hertsia.', 'Raíz en el denominador: > estricto.', 'الجذر في المقام: > تمامًا.', 'Square root in the denominator: strict inequality, >.'),
        explanation: say('$2x-6>0$, beraz $x>3$: Dom $f=(3,\\,+\\infty)$, eta lehen osoa 4 da.', '$2x-6>0$, así que $x>3$: Dom $f=(3,\\,+\\infty)$, y el primer entero es 4.', '$2x-6>0$، إذن $x>3$: Dom $f=(3,\\,+\\infty)$، وأول عدد صحيح هو 4.', '$2x-6>0$, so $x>3$: Domain $f=(3,\\,+\\infty)$, and the first integer is 4.')
    },
    /* ---------- Continuity and pieces ---------- */
    {
        id: 9, stage: 'continuity',
        prompt: say('$f(x)=\\frac{x^{2}-9}{x-3}$ funtzioak etenune saihesgarri bat du $x=3$ puntuan. Zein ordenatu du falta den puntuak?', '$f(x)=\\frac{x^{2}-9}{x-3}$ tiene una discontinuidad evitable en $x=3$. ¿Qué ordenada tiene el punto que falta?', 'للدالة $f(x)=\\frac{x^{2}-9}{x-3}$ انقطاع قابل للإزالة عند $x=3$. ما الإحداثي الصادي للنقطة الناقصة؟', '$f(x)=\\frac{x^{2}-9}{x-3}$ has a removable discontinuity at $x=3$. What is the y-coordinate of the missing point?'),
        expected: n(6),
        hint: say('Faktorizatu zenbakitzailea eta sinplifikatu.', 'Factoriza el numerador y simplifica.', 'حلّل البسط وبسّط.', 'Factorise the numerator and simplify.'),
        explanation: same('$\\frac{(x-3)(x+3)}{x-3}=x+3\\qquad 3+3=6$')
    },
    {
        id: 10, stage: 'continuity',
        prompt: say('$f(x)=x^{2}+1$ ($x\\le 1$) eta $f(x)=5-x$ ($x>1$) izanik, kalkulatu $f(-2)+f(4)$.', 'Si $f(x)=x^{2}+1$ ($x\\le 1$) y $f(x)=5-x$ ($x>1$), calcula $f(-2)+f(4)$.', 'إذا كان $f(x)=x^{2}+1$ ($x\\le 1$) و$f(x)=5-x$ ($x>1$) فاحسب $f(-2)+f(4)$.', 'If $f(x)=x^{2}+1$ ($x\\le 1$) and $f(x)=5-x$ ($x>1$), calculate $f(-2)+f(4)$.'),
        expected: n(6),
        hint: say('Lehenik begiratu zein zatitan dagoen x bakoitza.', 'Mira primero en qué trozo está cada x.', 'انظر أولًا في أي جزء تقع كل x.', 'First, check which piece each x is in.'),
        explanation: same('$f(-2)=(-2)^{2}+1=5\\qquad f(4)=5-4=1\\qquad 5+1=6$')
    },
    {
        id: 11, stage: 'continuity',
        prompt: say('Kalkulatu $k$, $f(x)=2x+k$ ($x<1$) eta $f(x)=x^{2}+3$ ($x\\ge 1$) jarraitua izan dadin.', 'Halla $k$ para que $f(x)=2x+k$ ($x<1$), $f(x)=x^{2}+3$ ($x\\ge 1$) sea continua.', 'أوجد $k$ لتكون $f(x)=2x+k$ ($x<1$)، $f(x)=x^{2}+3$ ($x\\ge 1$) متصلة.', 'Find $k$ so that the function $f(x)=2x+k$ ($x<1$), $f(x)=x^{2}+3$ ($x\\ge 1$) is continuous.'),
        expected: n(2),
        hint: say('Bi zatiek balio bera eman behar dute $x=1$ puntuan.', 'Los dos trozos deben dar lo mismo en $x=1$.', 'يجب أن يعطي الجزءان القيمة نفسها عند $x=1$.', 'The two pieces must give the same value at $x=1$.'),
        explanation: same('$2\\cdot 1+k=1^{2}+3\\ \\to\\ 2+k=4\\ \\to\\ k=2$')
    },
    {
        id: 12, stage: 'continuity',
        prompt: say('$f(x)=x+1$ ($x<2$) eta $f(x)=x^{2}$ ($x\\ge 2$). Zenbatekoa da jauzia $x=2$ puntuan?', '$f(x)=x+1$ ($x<2$) y $f(x)=x^{2}$ ($x\\ge 2$). ¿De cuánto es el salto en $x=2$?', '$f(x)=x+1$ ($x<2$) و$f(x)=x^{2}$ ($x\\ge 2$). ما مقدار القفزة عند $x=2$؟', '$f(x)=x+1$ ($x<2$) and $f(x)=x^{2}$ ($x\\ge 2$). How big is the jump at $x=2$?'),
        expected: n(1),
        hint: say('Kendu bi zatien balioak $x=2$ puntuan.', 'Resta los valores de los dos trozos en $x=2$.', 'اطرح قيمتي الجزأين عند $x=2$.', 'Subtract the values of the two pieces at $x=2$.'),
        explanation: same('$2^{2}-(2+1)=4-3=1$')
    },
    /* ---------- Intercepts, sign and symmetry ---------- */
    {
        id: 13, stage: 'features',
        prompt: say('Zein da $y=x^{3}-9x$ funtzioak X ardatzarekin duen ebaki-puntu positiboaren abszisa?', '¿Cuál es la abscisa del corte positivo de $y=x^{3}-9x$ con el eje X?', 'ما الإحداثي السيني لنقطة التقاطع الموجبة لـ $y=x^{3}-9x$ مع محور X؟', 'What is the positive x-intercept of $y=x^{3}-9x$?'),
        expected: n(3),
        hint: say('Atera $x$ faktore komun gisa.', 'Saca $x$ factor común.', 'أخرج $x$ عاملًا مشتركًا.', 'Take $x$ out as a common factor.'),
        explanation: same('$x(x^{2}-9)=x(x-3)(x+3)=0\\ \\to\\ x=0,\\ x=3,\\ x=-3$')
    },
    {
        id: 14, stage: 'features',
        prompt: say('Zenbat puntutan ebakitzen du $y=x^{4}-10x^{2}+9$ funtzioak X ardatza?', '¿En cuántos puntos corta al eje X la función $y=x^{4}-10x^{2}+9$?', 'في كم نقطة تقطع الدالة $y=x^{4}-10x^{2}+9$ محور X؟', 'At how many points does $y=x^{4}-10x^{2}+9$ cross the x-axis?'),
        expected: n(4),
        hint: say('Egin $t=x^{2}$.', 'Haz $t=x^{2}$.', 'ضع $t=x^{2}$.', 'Let $t=x^{2}$.'),
        explanation: say('$t^{2}-10t+9=0$, $t=1$ eta $t=9$; $x=\\pm 1$ eta $x=\\pm 3$: 4 ebaki-puntu.', '$t^{2}-10t+9=0$, $t=1$ y $t=9$; $x=\\pm 1$ y $x=\\pm 3$: 4 cortes.', '$t^{2}-10t+9=0$، $t=1$ و$t=9$؛ $x=\\pm 1$ و$x=\\pm 3$: 4 نقاط تقاطع.', '$t^{2}-10t+9=0$, $t=1$ and $t=9$; $x=\\pm 1$ and $x=\\pm 3$: 4 points.')
    },
    {
        id: 15, stage: 'features',
        prompt: say('$f(x)=x^{2}-6x+8$ negatiboa da tarte batean. Zein da tarte horren eskuineko muturra?', '$f(x)=x^{2}-6x+8$ es negativa en un intervalo. ¿Cuál es su extremo derecho?', 'الدالة $f(x)=x^{2}-6x+8$ سالبة في فترة. ما طرفها الأيمن؟', '$f(x)=x^{2}-6x+8$ is negative on an interval. What is its right-hand end?'),
        expected: n(4),
        hint: say('Kalkulatu erroak eta probatu tarteko zenbaki bat.', 'Calcula las raíces y prueba un número de en medio.', 'احسب الجذرين وجرّب عددًا بينهما.', 'Calculate the roots and test a number in between.'),
        explanation: same('$x^{2}-6x+8=0\\ \\to\\ x=2,\\ x=4\\qquad f(3)=9-18+8=-1<0\\qquad (2,\\,4)$')
    },
    {
        id: 16, stage: 'features',
        prompt: say('$f$ funtzioa bakoitia da eta $f(2)=-7$. Zenbat da $f(-2)$?', 'La función $f$ es impar y $f(2)=-7$. ¿Cuánto vale $f(-2)$?', 'الدالة $f$ فردية و$f(2)=-7$. كم تساوي $f(-2)$؟', 'The function $f$ is odd and $f(2)=-7$. What is $f(-2)$?'),
        expected: n(7),
        hint: same('$f(-x)=-f(x)$'),
        explanation: same('$f(-2)=-f(2)=-(-7)=7$')
    },
    /* ---------- Increasing, rate and period ---------- */
    {
        id: 17, stage: 'change',
        prompt: say('Zein da $y=-x^{2}+4x+1$ funtzioaren balio maximoa?', '¿Cuál es el valor máximo de $y=-x^{2}+4x+1$?', 'ما القيمة العظمى لـ $y=-x^{2}+4x+1$؟', 'What is the maximum value of $y=-x^{2}+4x+1$?'),
        expected: n(5),
        hint: say('Erpina: $x=-\\frac{b}{2a}$.', 'Vértice: $x=-\\frac{b}{2a}$.', 'الرأس: $x=-\\frac{b}{2a}$.', 'Vertex: $x=-\\frac{b}{2a}$.'),
        explanation: same('$x=\\frac{-4}{-2}=2\\qquad y=-4+8+1=5$')
    },
    {
        id: 18, stage: 'change',
        prompt: say('Kalkulatu $f(x)=x^{3}-2x$ funtzioaren T.V.M. $[0,\\,2]$ tartean.', 'Halla la T.V.M. de $f(x)=x^{3}-2x$ en $[0,\\,2]$.', 'أوجد معدل التغير المتوسط لـ $f(x)=x^{3}-2x$ في $[0,\\,2]$.', 'Find the average rate of change of $f(x)=x^{3}-2x$ on $[0,\\,2]$.'),
        expected: n(2),
        hint: same('$\\frac{f(2)-f(0)}{2-0}$'),
        explanation: same('$f(2)=8-4=4\\qquad f(0)=0\\qquad \\frac{4-0}{2-0}=2$')
    },
    {
        id: 19, stage: 'change',
        prompt: say('Gorantz jaurtitako harri baten altuera $e=40t-5t^{2}$ da (m, s). Zein da haren abiadura ertaina lehen 2 segundoetan, m/s-tan?', 'La altura de una piedra lanzada hacia arriba es $e=40t-5t^{2}$ (m, s). ¿Cuál es su velocidad media en los 2 primeros segundos, en m/s?', 'ارتفاع حجر مقذوف إلى أعلى هو $e=40t-5t^{2}$ (م، ث). ما سرعته المتوسطة في الثانيتين الأوليين بالمتر في الثانية؟', 'The height of a stone thrown upwards is $e=40t-5t^{2}$ (m, s). What is its average speed in the first 2 seconds, in m/s?'),
        expected: n(30),
        hint: say('T.V.M. $[0,\\,2]$ tartean.', 'La T.V.M. en $[0,\\,2]$.', 'المعدل في $[0,\\,2]$.', 'The average rate of change on $[0,\\,2]$.'),
        explanation: same('$e(2)=80-20=60\\qquad \\frac{60-0}{2-0}=30$')
    },
    {
        id: 20, stage: 'change',
        prompt: say('Funtzio baten periodoa 5 da eta $f(2)=3$. Zenbat da $f(37)$?', 'Una función tiene periodo 5 y $f(2)=3$. ¿Cuánto vale $f(37)$?', 'دور دالة 5 و$f(2)=3$. كم تساوي $f(37)$؟', 'A function has period 5 and $f(2)=3$. What is $f(37)$?'),
        expected: n(3),
        hint: say('Zatitu 37 zati 5: hondarra.', 'Divide 37 entre 5: el resto.', 'اقسم 37 على 5: الباقي.', 'Divide 37 by 5: the remainder.'),
        explanation: same('$37=7\\cdot 5+2\\ \\to\\ f(37)=f(2)=3$')
    }
]

export const functionsAkChallenges: ChallengeItem[] = [
    /* ---------- Functions and graphs ---------- */
    {
        id: 101, stage: 'concept', points: 10, context: 'starter',
        prompt: say('Taxi baten prezioa $P(x)=1{,}2x+3$ da (€, km). Zenbat km egin daitezke 15 €-rekin?', 'El precio de un taxi es $P(x)=1{,}2x+3$ (€, km). ¿Cuántos km se pueden hacer con 15 €?', 'سعر سيارة أجرة $P(x)=1{,}2x+3$ (€، كم). كم كيلومترًا يمكن قطعها بـ 15 €؟', 'The price of a taxi is $P(x)=1{,}2x+3$ (€, km). How many km can you travel for €15?'),
        expected: n(10),
        hint: say('Ebatzi $1{,}2x+3=15$.', 'Resuelve $1{,}2x+3=15$.', 'حُلّ $1{,}2x+3=15$.', 'Solve $1{,}2x+3=15$.'),
        explanation: same('$1{,}2x=12\\ \\to\\ x=\\frac{12}{1{,}2}=10$')
    },
    {
        id: 102, stage: 'concept', points: 20, context: 'advanced',
        prompt: say('$l$ metroko pendulu baten periodoa $T=2\\sqrt{l}$ segundo da. Zein luzera du 6 s-ko periodoa duen penduluak?', 'El periodo de un péndulo de $l$ metros es $T=2\\sqrt{l}$ segundos. ¿Qué longitud tiene un péndulo de periodo 6 s?', 'دور بندول طوله $l$ متر هو $T=2\\sqrt{l}$ ثانية. ما طول بندول دوره 6 ث؟', 'The period of a pendulum of length $l$ metres is $T=2\\sqrt{l}$ seconds. What length does a pendulum with a period of 6 s have?'),
        expected: n(9),
        hint: say('Askatu erroa eta ber bi egin.', 'Despeja la raíz y eleva al cuadrado.', 'اعزل الجذر وربّع.', 'Isolate the square root, then square both sides.'),
        explanation: same('$2\\sqrt{l}=6\\ \\to\\ \\sqrt{l}=3\\ \\to\\ l=9$')
    },
    {
        id: 103, stage: 'concept', points: 30, context: 'master',
        prompt: say('Zein da $f(x)=x^{2}-4x+7$ funtzioaren ibiltarteko balio txikiena?', '¿Cuál es el menor valor del recorrido de $f(x)=x^{2}-4x+7$?', 'ما أصغر قيمة في مدى $f(x)=x^{2}-4x+7$؟', 'What is the smallest value in the range of $f(x)=x^{2}-4x+7$?'),
        expected: n(3),
        hint: say('Parabola gorantz irekita dago: erpinean dago minimoa.', 'La parábola se abre hacia arriba: el mínimo está en el vértice.', 'القطع المكافئ مفتوح إلى أعلى: الصغرى عند الرأس.', 'The parabola opens upwards: the minimum is at the vertex.'),
        explanation: same('$x=\\frac{4}{2}=2\\qquad f(2)=4-8+7=3\\qquad \\text{Rec}\\,f=[3,\\,+\\infty)$')
    },
    /* ---------- Domain ---------- */
    {
        id: 104, stage: 'domain', points: 10, context: 'starter',
        prompt: say('Zein da $y=\\sqrt{2x+10}$ funtzioaren izate-eremuko balio txikiena?', '¿Cuál es el menor valor del dominio de $y=\\sqrt{2x+10}$?', 'ما أصغر قيمة في مجال $y=\\sqrt{2x+10}$؟', 'What is the smallest value in the domain of $y=\\sqrt{2x+10}$?'),
        expected: n(-5),
        hint: say('Errokizuna ≥ 0.', 'Radicando ≥ 0.', 'ما تحت الجذر ≥ 0.', 'Radicand ≥ 0.'),
        explanation: same('$2x+10\\ge 0\\ \\to\\ x\\ge -5\\qquad [-5,\\,+\\infty)$')
    },
    {
        id: 105, stage: 'domain', points: 20, context: 'advanced',
        prompt: say('100 × 70 cm-ko kartulina baten izkinetan $x$ cm-ko aldeko karratuak moztu eta kutxa bat egiten da. Zein da $V(x)$ bolumenaren izate-eremuaren eskuineko muturra?', 'En las esquinas de una cartulina de 100 × 70 cm se cortan cuadrados de lado $x$ cm y se hace una caja. ¿Cuál es el extremo derecho del dominio del volumen $V(x)$?', 'تُقص مربعات ضلعها $x$ سم من زوايا ورقة مقواة 100 × 70 سم وتُصنع علبة. ما الطرف الأيمن لمجال الحجم $V(x)$؟', 'Squares with sides of $x$ cm are cut from the corners of a 100 × 70 cm piece of card, and a box is made. What is the right-hand end of the domain of the volume $V(x)$?'),
        expected: n(35),
        hint: say('Alde guztiek positiboak izan behar dute.', 'Todos los lados tienen que ser positivos.', 'يجب أن تكون كل الأضلاع موجبة.', 'All the lengths must be positive.'),
        explanation: same('$x>0\\qquad 100-2x>0\\ \\to\\ x<50\\qquad 70-2x>0\\ \\to\\ x<35\\qquad (0,\\,35)$')
    },
    {
        id: 106, stage: 'domain', points: 30, context: 'master',
        prompt: say('Zenbat zenbaki oso daude $y=\\sqrt{-x^{2}+7x-10}$ funtzioaren izate-eremuan?', '¿Cuántos números enteros hay en el dominio de $y=\\sqrt{-x^{2}+7x-10}$?', 'كم عددًا صحيحًا في مجال $y=\\sqrt{-x^{2}+7x-10}$؟', 'How many integers are in the domain of $y=\\sqrt{-x^{2}+7x-10}$?'),
        expected: n(4),
        hint: say('Biderkatu $-1$-ez: desberdintzaren noranzkoa aldatzen da.', 'Multiplica por $-1$: cambia el sentido de la desigualdad.', 'اضرب في $-1$: يتغير اتجاه المتراجحة.', 'Multiply by $-1$: this reverses the inequality sign.'),
        explanation: say('$x^{2}-7x+10\\le 0$, erroak 2 eta 5: Dom $f=[2,\\,5]$, eta osoak 2, 3, 4 eta 5 dira: 4.', '$x^{2}-7x+10\\le 0$, raíces 2 y 5: Dom $f=[2,\\,5]$, y los enteros son 2, 3, 4 y 5: 4.', '$x^{2}-7x+10\\le 0$، والجذران 2 و5: Dom $f=[2,\\,5]$، والأعداد الصحيحة 2 و3 و4 و5: 4.', '$x^{2}-7x+10\\le 0$, roots 2 and 5: Domain $f=[2,\\,5]$, and the integers are 2, 3, 4 and 5: 4.')
    },
    /* ---------- Continuity and pieces ---------- */
    {
        id: 107, stage: 'continuity', points: 10, context: 'starter',
        prompt: say('Aparkaleku batek 2 € kobratzen ditu lehen orduagatik edo haren zatiagatik, eta 1,50 € hasitako ordu gehigarri bakoitzeko. Zenbat ordaintzen da 2 h 30 min-gatik?', 'Un aparcamiento cobra 2 € por la primera hora o fracción y 1,50 € por cada hora más empezada. ¿Cuánto se paga por 2 h 30 min?', 'يأخذ موقف سيارات 2 € عن الساعة الأولى أو جزء منها و1.50 € عن كل ساعة إضافية تبدأ. كم يُدفع عن ساعتين و30 دقيقة؟', 'A car park charges €2 for the first hour or part of an hour, and €1.50 for each extra hour started. How much do you pay for 2 h 30 min?'),
        expected: n(5),
        hint: say('Lehen ordua eta beste bi ordu hasita.', 'La primera hora y otras dos horas empezadas.', 'الساعة الأولى وساعتان أخريان بدأتا.', 'The first hour, and two more hours started.'),
        explanation: same('$2+2\\cdot 1{,}5=5$')
    },
    {
        id: 108, stage: 'continuity', points: 20, context: 'advanced',
        prompt: say('Zerga batean: lehen 10 000 €-ek ez dute ordaintzen, 10 000 €-tik 20 000 €-ra % 15 ordaintzen da eta 20 000 €-tik 30 000 €-ra % 25. Zenbat ordaintzen da 25 000 €-ko oinarri batengatik?', 'En un impuesto, los primeros 10 000 € no pagan, de 10 000 € a 20 000 € se paga el 15 % y de 20 000 € a 30 000 €, el 25 %. ¿Cuánto se paga por una base de 25 000 €?', 'في ضريبة: أول 10 000 € لا تُدفع عنها ضريبة، ومن 10 000 € إلى 20 000 € تُدفع 15 %، ومن 20 000 € إلى 30 000 € تُدفع 25 %. كم يُدفع عن قاعدة 25 000 €؟', 'In a tax, the first €10,000 are not taxed, from €10,000 to €20,000 you pay 15%, and from €20,000 to €30,000 you pay 25%. How much tax do you pay on a base of €25,000?'),
        expected: n(2750),
        hint: say('Tarte bakoitzak bere ehunekoa ordaintzen du.', 'Cada tramo paga su porcentaje.', 'كل شريحة تدفع نسبتها.', 'Each band is taxed at its own percentage.'),
        explanation: same('$0{,}15\\cdot 10\\,000+0{,}25\\cdot 5\\,000=1\\,500+1\\,250=2\\,750$')
    },
    {
        id: 109, stage: 'continuity', points: 30, context: 'master',
        prompt: say('Kalkulatu $a$, $f(x)=x^{2}+a$ ($x\\le 2$) eta $f(x)=ax-1$ ($x>2$) jarraitua izan dadin.', 'Halla $a$ para que $f(x)=x^{2}+a$ ($x\\le 2$), $f(x)=ax-1$ ($x>2$) sea continua.', 'أوجد $a$ لتكون $f(x)=x^{2}+a$ ($x\\le 2$)، $f(x)=ax-1$ ($x>2$) متصلة.', 'Find $a$ so that the function $f(x)=x^{2}+a$ ($x\\le 2$), $f(x)=ax-1$ ($x>2$) is continuous.'),
        expected: n(5),
        hint: say('Berdindu bi zatiak $x=2$ puntuan.', 'Iguala los dos trozos en $x=2$.', 'ساوِ الجزأين عند $x=2$.', 'Make the two pieces equal at $x=2$.'),
        explanation: same('$4+a=2a-1\\ \\to\\ a=5$')
    },
    /* ---------- Intercepts, sign and symmetry ---------- */
    {
        id: 110, stage: 'features', points: 10, context: 'starter',
        prompt: say('Zein ordenatutan ebakitzen du $y=(x-1)(x+2)(x-4)$ funtzioak Y ardatza?', '¿En qué ordenada corta al eje Y la función $y=(x-1)(x+2)(x-4)$?', 'عند أي إحداثي صادي تقطع الدالة $y=(x-1)(x+2)(x-4)$ محور Y؟', 'At what y-value does $y=(x-1)(x+2)(x-4)$ cross the y-axis?'),
        expected: n(8),
        hint: say('Jarri $x=0$.', 'Pon $x=0$.', 'ضع $x=0$.', 'Put $x=0$.'),
        explanation: same('$(0-1)(0+2)(0-4)=(-1)\\cdot 2\\cdot(-4)=8$')
    },
    {
        id: 111, stage: 'features', points: 20, context: 'advanced',
        prompt: say('$x=1$ da $y=x^{3}-2x^{2}-5x+6$ funtzioaren erro bat. Zein da X ardatzarekiko ebaki-puntu handienaren abszisa?', '$x=1$ es una raíz de $y=x^{3}-2x^{2}-5x+6$. ¿Cuál es la abscisa del mayor corte con el eje X?', '$x=1$ جذر لـ $y=x^{3}-2x^{2}-5x+6$. ما الإحداثي السيني لأكبر نقطة تقاطع مع محور X؟', '$x=1$ is a root of $y=x^{3}-2x^{2}-5x+6$. What is the largest x-intercept?'),
        expected: n(3),
        hint: say('Ruffini 1ekin eta gero bigarren mailako ekuazioa.', 'Ruffini con 1 y después la ecuación de segundo grado.', 'روفيني بالعدد 1 ثم معادلة من الدرجة الثانية.', 'Use Ruffini\'s rule with 1, then solve the quadratic equation.'),
        explanation: same('$(x-1)(x^{2}-x-6)=(x-1)(x-3)(x+2)\\ \\to\\ x=1,\\ x=3,\\ x=-2$')
    },
    {
        id: 112, stage: 'features', points: 30, context: 'master',
        prompt: say('Kalkulatu $k$, $f(x)=x^{3}+(k-2)x^{2}+x$ bakoitia izan dadin.', 'Halla $k$ para que $f(x)=x^{3}+(k-2)x^{2}+x$ sea impar.', 'أوجد $k$ لتكون $f(x)=x^{3}+(k-2)x^{2}+x$ فردية.', 'Find $k$ so that $f(x)=x^{3}+(k-2)x^{2}+x$ is odd.'),
        expected: n(2),
        hint: say('Bakoitia izateko berretzaile bikoitiko gaia desagertu behar da.', 'Para que sea impar tiene que desaparecer el término de exponente par.', 'لتكون فردية يجب أن يختفي الحد ذو الأس الزوجي.', 'For it to be odd, the term with an even exponent must disappear.'),
        explanation: same('$k-2=0\\ \\to\\ k=2\\qquad f(x)=x^{3}+x$')
    },
    /* ---------- Increasing, rate and period ---------- */
    {
        id: 113, stage: 'change', points: 10, context: 'starter',
        prompt: say('Auto batek 125 km egin ditu lehen orduan eta 350 km lehen lau orduetan. Zein izan da haren abiadura ertaina 1. eta 4. orduen artean, km/h-tan?', 'Un coche ha recorrido 125 km en la primera hora y 350 km en las cuatro primeras. ¿Cuál ha sido su velocidad media entre la hora 1 y la 4, en km/h?', 'قطعت سيارة 125 كم في الساعة الأولى و350 كم في الساعات الأربع الأولى. ما سرعتها المتوسطة بين الساعة 1 والساعة 4 بالكيلومتر في الساعة؟', 'A car has covered 125 km in the first hour and 350 km in the first four hours. What was its average speed between hour 1 and hour 4, in km/h?'),
        expected: n(75),
        hint: say('T.V.M. $[1,\\,4]$ tartean.', 'La T.V.M. en $[1,\\,4]$.', 'المعدل في $[1,\\,4]$.', 'The average rate of change on $[1,\\,4]$.'),
        explanation: same('$\\frac{350-125}{4-1}=\\frac{225}{3}=75$')
    },
    {
        id: 114, stage: 'change', points: 20, context: 'advanced',
        prompt: say('Funtzio periodiko batek 7ko periodoa du eta $x=-1$ asintota bertikala da. Zein da 40 baino handiagoa den lehen asintota?', 'Una función periódica tiene periodo 7 y $x=-1$ es una asíntota vertical. ¿Cuál es la primera asíntota mayor que 40?', 'دالة دورية دورها 7 و$x=-1$ خط تقارب رأسي. ما أول خط تقارب أكبر من 40؟', 'A periodic function has period 7, and $x=-1$ is a vertical asymptote. What is the first asymptote greater than 40?'),
        expected: n(41),
        hint: say('Asintotak $x=-1+7n$ dira.', 'Las asíntotas son $x=-1+7n$.', 'خطوط التقارب هي $x=-1+7n$.', 'The asymptotes are $x=-1+7n$.'),
        explanation: same('$-1+7\\cdot 6=41$')
    },
    {
        id: 115, stage: 'change', points: 30, context: 'master',
        prompt: say('20 m-ko perimetroa duen laukizuzen baten oinarria $x$ da, eta azalera $A(x)=x(10-x)$. Zein da azalera maximoa, m²-tan?', 'Un rectángulo de perímetro 20 m tiene base $x$ y área $A(x)=x(10-x)$. ¿Cuál es el área máxima, en m²?', 'مستطيل محيطه 20 م قاعدته $x$ ومساحته $A(x)=x(10-x)$. ما أكبر مساحة بالمتر المربع؟', 'A rectangle with a perimeter of 20 m has base $x$ and area $A(x)=x(10-x)$. What is the maximum area, in m²?'),
        expected: n(25),
        hint: say('$A(x)=-x^{2}+10x$ parabola bat da: maximoa erpinean.', '$A(x)=-x^{2}+10x$ es una parábola: el máximo está en el vértice.', '$A(x)=-x^{2}+10x$ قطع مكافئ: العظمى عند الرأس.', '$A(x)=-x^{2}+10x$ is a parabola: the maximum is at the vertex.'),
        explanation: same('$x=\\frac{-10}{-2}=5\\qquad 5\\cdot(10-5)=25$')
    }
]

export const functionsAkExerciseBank: ExerciseSection[] = [
    {
        id: 'concept',
        title: say('Funtzioak eta grafikoak', 'Funciones y gráficas', 'الدوال والرسوم', 'Functions and graphs'),
        items: [
            { id: 1, difficulty: 'easy', question: say('$f(x)=3x-5$ bada, kalkulatu $f(4)$.', 'Si $f(x)=3x-5$, calcula $f(4)$.', 'إذا كان $f(x)=3x-5$ فاحسب $f(4)$.', 'If $f(x)=3x-5$, calculate $f(4)$.'), solution: same('$3\\cdot 4-5=7$'), answer: { expected: n(7) } },
            { id: 2, difficulty: 'easy', question: say('$f(x)=x^{2}+1$ bada, kalkulatu $f(-3)$.', 'Si $f(x)=x^{2}+1$, calcula $f(-3)$.', 'إذا كان $f(x)=x^{2}+1$ فاحسب $f(-3)$.', 'If $f(x)=x^{2}+1$, calculate $f(-3)$.'), solution: same('$(-3)^{2}+1=10$'), answer: { expected: n(10) } },
            { id: 3, difficulty: 'easy', question: say('$(2,\\,7)$ puntua $y=x^{2}+3$ funtzioaren grafikoan dago?', '¿Está el punto $(2,\\,7)$ en la gráfica de $y=x^{2}+3$?', 'هل تقع النقطة $(2,\\,7)$ على رسم $y=x^{2}+3$؟', 'Is the point $(2,\\,7)$ on the graph of $y=x^{2}+3$?'), solution: say('Bai: $2^{2}+3=7$.', 'Sí: $2^{2}+3=7$.', 'نعم: $2^{2}+3=7$.', 'Yes: $2^{2}+3=7$.') },
            { id: 4, difficulty: 'medium', question: say('$f(x)=x^{2}-5x$ bada, zein $x$ positibok du 6 irudia?', 'Si $f(x)=x^{2}-5x$, ¿qué $x$ positiva tiene imagen 6?', 'إذا كان $f(x)=x^{2}-5x$ فما قيمة $x$ الموجبة التي صورتها 6؟', 'If $f(x)=x^{2}-5x$, which positive $x$ has an image of 6?'), solution: same('$x^{2}-5x-6=0\\ \\to\\ x=6,\\ x=-1$'), answer: { expected: n(6) } },
            { id: 5, difficulty: 'medium', question: say('Oinarriko erradioa 1 cm duen zilindro baten bolumena $V=\\pi h$ da. Zein altuera du bolumena 37,68 cm³ bada? Hartu $\\pi\\approx 3{,}14$.', 'El volumen de un cilindro de radio de la base 1 cm es $V=\\pi h$. ¿Qué altura tiene si su volumen es 37,68 cm³? Toma $\\pi\\approx 3{,}14$.', 'حجم أسطوانة نصف قطر قاعدتها 1 سم هو $V=\\pi h$. ما ارتفاعها إذا كان حجمها 37.68 سم³؟ خذ $\\pi\\approx 3{,}14$.', 'The volume of a cylinder with a base radius of 1 cm is $V=\\pi h$. What height does it have if its volume is 37.68 cm³? Take $\\pi\\approx 3{,}14$.'), solution: same('$h=\\frac{37{,}68}{3{,}14}=12$'), answer: { expected: n(12) } },
            { id: 6, difficulty: 'medium', question: say('$y=x^{2}$ funtzioaren izate-eremua $[-2,\\,3]$ da. Zein da ibiltartearen balio handiena?', 'La función $y=x^{2}$ tiene dominio $[-2,\\,3]$. ¿Cuál es el mayor valor de su recorrido?', 'مجال الدالة $y=x^{2}$ هو $[-2,\\,3]$. ما أكبر قيمة في مداها؟', 'The function $y=x^{2}$ has domain $[-2,\\,3]$. What is the largest value in its range?'), solution: say('$f(-2)=4$, $f(0)=0$ eta $f(3)=9$: Rec $f=[0,\\,9]$.', '$f(-2)=4$, $f(0)=0$ y $f(3)=9$: Rec $f=[0,\\,9]$.', '$f(-2)=4$ و$f(0)=0$ و$f(3)=9$: Rec $f=[0,\\,9]$.', '$f(-2)=4$, $f(0)=0$ and $f(3)=9$: Range $f=[0,\\,9]$.'), answer: { expected: n(9) } },
            { id: 7, difficulty: 'medium', question: say('$f(x)=\\frac{12}{x}$ bada, zein $x$-k du $-3$ irudia?', 'Si $f(x)=\\frac{12}{x}$, ¿qué $x$ tiene imagen $-3$?', 'إذا كان $f(x)=\\frac{12}{x}$ فما قيمة $x$ التي صورتها $-3$؟', 'If $f(x)=\\frac{12}{x}$, which $x$ has an image of $-3$?'), solution: same('$\\frac{12}{x}=-3\\ \\to\\ x=\\frac{12}{-3}=-4$'), answer: { expected: n(-4) } },
            { id: 8, difficulty: 'hard', question: say('Arrapala batetik erortzen den bola batek $e=10t^{2}$ cm egiten ditu $t$ segundotan. Zenbat segundo behar ditu 250 cm egiteko?', 'Una bola que cae por un raíl recorre $e=10t^{2}$ cm en $t$ segundos. ¿Cuántos segundos tarda en recorrer 250 cm?', 'تقطع كرة تنزلق على سكة $e=10t^{2}$ سم في $t$ ثانية. كم ثانية تحتاج لتقطع 250 سم؟', 'A ball rolling down a rail travels $e=10t^{2}$ cm in $t$ seconds. How many seconds does it take to travel 250 cm?'), solution: same('$10t^{2}=250\\ \\to\\ t^{2}=25\\ \\to\\ t=5$'), answer: { expected: n(5) } },
            { id: 9, difficulty: 'hard', question: say('Azaldu zergatik zirkunferentzia bat ez den funtzio baten grafikoa.', 'Explica por qué una circunferencia no es la gráfica de una función.', 'اشرح لماذا لا تكون الدائرة رسمًا لدالة.', 'Explain why a circle is not the graph of a function.'), solution: say('Zirkunferentziaren barrutik pasatzen den zuzen bertikal batek bi puntutan ebakitzen du: $x$ horri bi $y$ dagozkio.', 'Una recta vertical que pase por dentro de la circunferencia la corta en dos puntos: a esa $x$ le corresponden dos $y$.', 'أي مستقيم رأسي يمر داخل الدائرة يقطعها في نقطتين: يقابل $x$ تلك قيمتان لـ $y$.', 'A vertical line through the inside of the circle cuts it at two points: that $x$ corresponds to two $y$ values.') },
            { id: 10, difficulty: 'hard', question: say('$f(x)=\\frac{2x+1}{x-1}$ bada, zein $x$-k du 3 irudia?', 'Si $f(x)=\\frac{2x+1}{x-1}$, ¿qué $x$ tiene imagen 3?', 'إذا كان $f(x)=\\frac{2x+1}{x-1}$ فما قيمة $x$ التي صورتها 3؟', 'If $f(x)=\\frac{2x+1}{x-1}$, which $x$ has an image of 3?'), solution: same('$2x+1=3(x-1)\\ \\to\\ 2x+1=3x-3\\ \\to\\ x=4$'), answer: { expected: n(4) } }
        ]
    },
    {
        id: 'domain',
        title: say('Izate-eremua', 'Dominio de definición', 'مجال التعريف', 'Domain of definition'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Zein zenbaki ez dago $y=\\frac{5}{x+2}$ funtzioaren izate-eremuan?', '¿Qué número no está en el dominio de $y=\\frac{5}{x+2}$?', 'ما العدد الذي ليس في مجال $y=\\frac{5}{x+2}$؟', 'Which number is not in the domain of $y=\\frac{5}{x+2}$?'), solution: same('$x+2=0\\ \\to\\ x=-2\\qquad \\mathbb{R}-\\{-2\\}$'), answer: { expected: n(-2) } },
            { id: 12, difficulty: 'easy', question: say('Zein da $y=\\sqrt{x-6}$ funtzioaren izate-eremuko balio txikiena?', '¿Cuál es el menor valor del dominio de $y=\\sqrt{x-6}$?', 'ما أصغر قيمة في مجال $y=\\sqrt{x-6}$؟', 'What is the smallest value in the domain of $y=\\sqrt{x-6}$?'), solution: same('$x-6\\ge 0\\ \\to\\ x\\ge 6\\qquad [6,\\,+\\infty)$'), answer: { expected: n(6) } },
            { id: 13, difficulty: 'easy', question: say('Zein da $y=x^{3}-2x+1$ funtzioaren izate-eremua?', '¿Cuál es el dominio de $y=x^{3}-2x+1$?', 'ما مجال $y=x^{3}-2x+1$؟', 'What is the domain of $y=x^{3}-2x+1$?'), solution: say('Polinomio bat da: Dom $f=\\mathbb{R}$.', 'Es un polinomio: Dom $f=\\mathbb{R}$.', 'إنها كثير حدود: Dom $f=\\mathbb{R}$.', 'It is a polynomial: Domain $f=\\mathbb{R}$.') },
            { id: 14, difficulty: 'medium', question: say('Bi zenbaki ez daude $y=\\frac{1}{x^{2}-x}$ funtzioaren izate-eremuan. Zein da handiena?', 'Dos números no están en el dominio de $y=\\frac{1}{x^{2}-x}$. ¿Cuál es el mayor?', 'عددان ليسا في مجال $y=\\frac{1}{x^{2}-x}$. ما الأكبر؟', 'Two numbers are not in the domain of $y=\\frac{1}{x^{2}-x}$. Which is the larger one?'), solution: same('$x(x-1)=0\\ \\to\\ x=0,\\ x=1\\qquad \\mathbb{R}-\\{0,\\,1\\}$'), answer: { expected: n(1) } },
            { id: 15, difficulty: 'medium', question: say('Zein da $y=\\sqrt{3x-9}$ funtzioaren izate-eremuaren ezkerreko muturra?', '¿Cuál es el extremo izquierdo del dominio de $y=\\sqrt{3x-9}$?', 'ما الطرف الأيسر لمجال $y=\\sqrt{3x-9}$؟', 'What is the left-hand end of the domain of $y=\\sqrt{3x-9}$?'), solution: same('$3x-9\\ge 0\\ \\to\\ x\\ge 3\\qquad [3,\\,+\\infty)$'), answer: { expected: n(3) } },
            { id: 16, difficulty: 'medium', question: say('Zein da $y=\\sqrt{4-x^{2}}$ funtzioaren izate-eremuaren eskuineko muturra?', '¿Cuál es el extremo derecho del dominio de $y=\\sqrt{4-x^{2}}$?', 'ما الطرف الأيمن لمجال $y=\\sqrt{4-x^{2}}$؟', 'What is the right-hand end of the domain of $y=\\sqrt{4-x^{2}}$?'), solution: same('$4-x^{2}\\ge 0\\ \\to\\ (2-x)(2+x)\\ge 0\\qquad [-2,\\,2]$'), answer: { expected: n(2) } },
            { id: 17, difficulty: 'medium', question: say('Zein da $y=\\frac{x}{x^{2}+9}$ funtzioaren izate-eremua?', '¿Cuál es el dominio de $y=\\frac{x}{x^{2}+9}$?', 'ما مجال $y=\\frac{x}{x^{2}+9}$؟', 'What is the domain of $y=\\frac{x}{x^{2}+9}$?'), solution: say('$x^{2}+9$ beti da 9 edo gehiago, ez da inoiz anulatzen: Dom $f=\\mathbb{R}$.', '$x^{2}+9$ vale siempre 9 o más, nunca se anula: Dom $f=\\mathbb{R}$.', '$x^{2}+9$ قيمته دائمًا 9 أو أكثر ولا ينعدم أبدًا: Dom $f=\\mathbb{R}$.', '$x^{2}+9$ is always 9 or more, so it is never 0: Domain $f=\\mathbb{R}$.') },
            { id: 18, difficulty: 'hard', question: say('Zenbat zenbaki oso EZ daude $y=\\sqrt{x^{2}+x-6}$ funtzioaren izate-eremuan?', '¿Cuántos números enteros NO están en el dominio de $y=\\sqrt{x^{2}+x-6}$?', 'كم عددًا صحيحًا ليس في مجال $y=\\sqrt{x^{2}+x-6}$؟', 'How many integers are NOT in the domain of $y=\\sqrt{x^{2}+x-6}$?'), solution: say('$x^{2}+x-6=0$: $x=2$ eta $x=-3$. Dom $f=(-\\infty,\\,-3]\\cup[2,\\,+\\infty)$; kanpoan $-2$, $-1$, 0 eta 1: 4.', '$x^{2}+x-6=0$: $x=2$ y $x=-3$. Dom $f=(-\\infty,\\,-3]\\cup[2,\\,+\\infty)$; fuera quedan $-2$, $-1$, 0 y 1: 4.', '$x^{2}+x-6=0$: $x=2$ و$x=-3$. Dom $f=(-\\infty,\\,-3]\\cup[2,\\,+\\infty)$؛ وتبقى خارجه $-2$ و$-1$ و0 و1: 4.', '$x^{2}+x-6=0$: $x=2$ and $x=-3$. Domain $f=(-\\infty,\\,-3]\\cup[2,\\,+\\infty)$; the numbers left out are $-2$, $-1$, 0 and 1: 4.'), answer: { expected: n(4) } },
            { id: 19, difficulty: 'hard', question: say('Zein zenbaki positibo ez dago $y=\\frac{\\sqrt{x}}{x-4}$ funtzioaren izate-eremuan?', '¿Qué número positivo no está en el dominio de $y=\\frac{\\sqrt{x}}{x-4}$?', 'ما العدد الموجب الذي ليس في مجال $y=\\frac{\\sqrt{x}}{x-4}$؟', 'Which positive number is not in the domain of $y=\\frac{\\sqrt{x}}{x-4}$?'), solution: say('$x\\ge 0$ eta $x\\ne 4$: Dom $f=[0,\\,4)\\cup(4,\\,+\\infty)$.', '$x\\ge 0$ y $x\\ne 4$: Dom $f=[0,\\,4)\\cup(4,\\,+\\infty)$.', '$x\\ge 0$ و$x\\ne 4$: Dom $f=[0,\\,4)\\cup(4,\\,+\\infty)$.', '$x\\ge 0$ and $x\\ne 4$: Domain $f=[0,\\,4)\\cup(4,\\,+\\infty)$.'), answer: { expected: n(4) } },
            { id: 20, difficulty: 'hard', question: say('Zein da $y=\\frac{3}{\\sqrt{5-x}}$ funtzioaren izate-eremuaren eskuineko muturra (sartzen ez dena)?', '¿Cuál es el extremo derecho (no incluido) del dominio de $y=\\frac{3}{\\sqrt{5-x}}$?', 'ما الطرف الأيمن (غير المشمول) لمجال $y=\\frac{3}{\\sqrt{5-x}}$؟', 'What is the right-hand end (not included) of the domain of $y=\\frac{3}{\\sqrt{5-x}}$?'), solution: same('$5-x>0\\ \\to\\ x<5\\qquad (-\\infty,\\,5)$'), answer: { expected: n(5) } }
        ]
    },
    {
        id: 'continuity',
        title: say('Jarraitutasuna eta zatiak', 'Continuidad y trozos', 'الاتصال والأجزاء', 'Continuity and pieces'),
        items: [
            { id: 21, difficulty: 'easy', question: say('$f(x)=x+3$ ($x<0$) eta $f(x)=2x$ ($x\\ge 0$). Kalkulatu $f(-1)$.', '$f(x)=x+3$ ($x<0$) y $f(x)=2x$ ($x\\ge 0$). Calcula $f(-1)$.', '$f(x)=x+3$ ($x<0$) و$f(x)=2x$ ($x\\ge 0$). احسب $f(-1)$.', '$f(x)=x+3$ ($x<0$) and $f(x)=2x$ ($x\\ge 0$). Calculate $f(-1)$.'), solution: same('$-1+3=2$'), answer: { expected: n(2) } },
            { id: 22, difficulty: 'easy', question: say('Funtzio berarekin, kalkulatu $f(5)$.', 'Con la misma función, calcula $f(5)$.', 'بالدالة نفسها احسب $f(5)$.', 'Using the same function, calculate $f(5)$.'), solution: same('$2\\cdot 5=10$'), answer: { expected: n(10) } },
            { id: 23, difficulty: 'easy', question: say('Zein abszisatan du etenune bat $y=\\frac{2}{x-5}$ funtzioak?', '¿En qué abscisa tiene una discontinuidad $y=\\frac{2}{x-5}$?', 'عند أي إحداثي سيني يوجد انقطاع لـ $y=\\frac{2}{x-5}$؟', 'At what x-value does $y=\\frac{2}{x-5}$ have a discontinuity?'), solution: say('Izendatzailea $x=5$ puntuan anulatzen da: jauzi infinituko etenunea.', 'El denominador se anula en $x=5$: discontinuidad de salto infinito.', 'ينعدم المقام عند $x=5$: انقطاع بقفزة لانهائية.', 'The denominator is 0 at $x=5$: an infinite jump discontinuity.'), answer: { expected: n(5) } },
            { id: 24, difficulty: 'medium', question: say('$f(x)=x^{2}$ ($x<1$) eta $f(x)=4$ ($x\\ge 1$). Zenbatekoa da jauzia $x=1$ puntuan?', '$f(x)=x^{2}$ ($x<1$) y $f(x)=4$ ($x\\ge 1$). ¿De cuánto es el salto en $x=1$?', '$f(x)=x^{2}$ ($x<1$) و$f(x)=4$ ($x\\ge 1$). ما مقدار القفزة عند $x=1$؟', '$f(x)=x^{2}$ ($x<1$) and $f(x)=4$ ($x\\ge 1$). How big is the jump at $x=1$?'), solution: same('$4-1^{2}=3$'), answer: { expected: n(3) } },
            { id: 25, difficulty: 'medium', question: say('Kalkulatu $k$, $f(x)=3x+k$ ($x<2$) eta $f(x)=x+4$ ($x\\ge 2$) jarraitua izan dadin.', 'Halla $k$ para que $f(x)=3x+k$ ($x<2$), $f(x)=x+4$ ($x\\ge 2$) sea continua.', 'أوجد $k$ لتكون $f(x)=3x+k$ ($x<2$)، $f(x)=x+4$ ($x\\ge 2$) متصلة.', 'Find $k$ so that the function $f(x)=3x+k$ ($x<2$), $f(x)=x+4$ ($x\\ge 2$) is continuous.'), solution: same('$6+k=2+4\\ \\to\\ k=0$'), answer: { expected: n(0) } },
            { id: 26, difficulty: 'medium', question: say('Kalkulatu $f(-2)$, $f(x)=|x-3|$ bada.', 'Calcula $f(-2)$ si $f(x)=|x-3|$.', 'احسب $f(-2)$ إذا كان $f(x)=|x-3|$.', 'Calculate $f(-2)$ if $f(x)=|x-3|$.'), solution: say('$-2-3=-5$, eta haren balio absolutua 5 da.', '$-2-3=-5$, y su valor absoluto es 5.', '$-2-3=-5$، وقيمتها المطلقة 5.', '$-2-3=-5$, and its absolute value is 5.'), answer: { expected: n(5) } },
            { id: 27, difficulty: 'medium', question: say('$y=\\frac{x^{2}-4}{x+2}$ funtzioak zulo bat du $x=-2$ puntuan. Zein da haren ordenatua?', '$y=\\frac{x^{2}-4}{x+2}$ tiene un agujero en $x=-2$. ¿Cuál es su ordenada?', 'للدالة $y=\\frac{x^{2}-4}{x+2}$ ثقب عند $x=-2$. ما إحداثيه الصادي؟', '$y=\\frac{x^{2}-4}{x+2}$ has a hole at $x=-2$. What is the y-coordinate of the hole?'), solution: same('$\\frac{(x+2)(x-2)}{x+2}=x-2\\qquad -2-2=-4$'), answer: { expected: n(-4) } },
            { id: 28, difficulty: 'hard', question: say('Kalkulatu $k$, $f(x)=kx-1$ ($x\\le 3$) eta $f(x)=x^{2}-k$ ($x>3$) jarraitua izan dadin.', 'Halla $k$ para que $f(x)=kx-1$ ($x\\le 3$), $f(x)=x^{2}-k$ ($x>3$) sea continua.', 'أوجد $k$ لتكون $f(x)=kx-1$ ($x\\le 3$)، $f(x)=x^{2}-k$ ($x>3$) متصلة.', 'Find $k$ so that the function $f(x)=kx-1$ ($x\\le 3$), $f(x)=x^{2}-k$ ($x>3$) is continuous.'), solution: same('$3k-1=9-k\\ \\to\\ 4k=10\\ \\to\\ k=2{,}5$'), answer: { expected: v('2,5') } },
            { id: 29, difficulty: 'hard', question: say('Aparkaleku batek euro bat kobratzen du hasitako ordu erdi bakoitzeko. Zenbat ordaintzen da 2 h 10 min-gatik?', 'Un aparcamiento cobra 1 € por cada media hora empezada. ¿Cuánto se paga por 2 h 10 min?', 'يأخذ موقف سيارات 1 € عن كل نصف ساعة تبدأ. كم يُدفع عن ساعتين و10 دقائق؟', 'A car park charges €1 for each half hour started. How much do you pay for 2 h 10 min?'), solution: say('2 h 10 min-tan 5 ordu erdi hasten dira: $5\\cdot 1=5$ €.', 'En 2 h 10 min se empiezan 5 medias horas: $5\\cdot 1=5$ €.', 'في ساعتين و10 دقائق تبدأ 5 أنصاف ساعات: $5\\cdot 1=5$ €.', 'In 2 h 10 min, 5 half hours are started: €$5\\cdot 1=5$.'), answer: { expected: n(5) } },
            { id: 30, difficulty: 'hard', question: say('Zer etenune mota du $y=\\frac{1}{(x-2)^{2}}$ funtzioak $x=2$ puntuan? Azaldu.', '¿Qué tipo de discontinuidad tiene $y=\\frac{1}{(x-2)^{2}}$ en $x=2$? Explícalo.', 'ما نوع انقطاع $y=\\frac{1}{(x-2)^{2}}$ عند $x=2$؟ اشرح.', 'What type of discontinuity does $y=\\frac{1}{(x-2)^{2}}$ have at $x=2$? Explain it.'), solution: say('Jauzi infinitukoa: $x=1{,}99$ edo $x=2{,}01$ denean $y=10\\,000$, eta gero eta handiagoa 2ra hurbiltzean. $x=2$ asintota bertikala da.', 'De salto infinito: con $x=1{,}99$ o $x=2{,}01$, $y=10\\,000$, y cada vez mayor al acercarse a 2. $x=2$ es una asíntota vertical.', 'قفزة لانهائية: عند $x=1{,}99$ أو $x=2{,}01$ يكون $y=10\\,000$، ويكبر أكثر عند الاقتراب من 2. $x=2$ خط تقارب رأسي.', 'An infinite jump: with $x=1{,}99$ or $x=2{,}01$, $y=10\\,000$, and it gets bigger and bigger as you approach 2. $x=2$ is a vertical asymptote.') }
        ]
    },
    {
        id: 'features',
        title: say('Ebakidurak, zeinua, simetria', 'Cortes, signo, simetría', 'التقاطع والإشارة والتناظر', 'Intercepts, sign, symmetry'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Zein abszisatan ebakitzen du $y=2x-8$ funtzioak X ardatza?', '¿En qué abscisa corta al eje X la función $y=2x-8$?', 'عند أي إحداثي سيني تقطع $y=2x-8$ محور X؟', 'At what x-value does $y=2x-8$ cross the x-axis?'), solution: same('$2x-8=0\\ \\to\\ x=4$'), answer: { expected: n(4) } },
            { id: 32, difficulty: 'easy', question: say('Zein ordenatutan ebakitzen du $y=x^{2}-3x-10$ funtzioak Y ardatza?', '¿En qué ordenada corta al eje Y la función $y=x^{2}-3x-10$?', 'عند أي إحداثي صادي تقطع $y=x^{2}-3x-10$ محور Y؟', 'At what y-value does $y=x^{2}-3x-10$ cross the y-axis?'), solution: say('$x=0$ jarrita: $(0,\\,-10)$.', 'Poniendo $x=0$: $(0,\\,-10)$.', 'بوضع $x=0$: $(0,\\,-10)$.', 'Putting $x=0$ gives $(0,\\,-10)$.'), answer: { expected: n(-10) } },
            { id: 33, difficulty: 'easy', question: say('$f(x)=x^{2}+3$ bikoitia ala bakoitia da?', '¿Es $f(x)=x^{2}+3$ par o impar?', 'هل $f(x)=x^{2}+3$ زوجية أم فردية؟', 'Is $f(x)=x^{2}+3$ even or odd?'), solution: say('Bikoitia: $f(-x)=(-x)^{2}+3=x^{2}+3=f(x)$.', 'Par: $f(-x)=(-x)^{2}+3=x^{2}+3=f(x)$.', 'زوجية: $f(-x)=(-x)^{2}+3=x^{2}+3=f(x)$.', 'Even: $f(-x)=(-x)^{2}+3=x^{2}+3=f(x)$.') },
            { id: 34, difficulty: 'medium', question: say('Zein da $y=x^{3}-16x$ funtzioak X ardatzarekin duen ebaki positiboa?', '¿Cuál es el corte positivo de $y=x^{3}-16x$ con el eje X?', 'ما نقطة التقاطع الموجبة لـ $y=x^{3}-16x$ مع محور X؟', 'What is the positive x-intercept of $y=x^{3}-16x$?'), solution: same('$x(x-4)(x+4)=0\\ \\to\\ x=0,\\ x=4,\\ x=-4$'), answer: { expected: n(4) } },
            { id: 35, difficulty: 'medium', question: say('Zein da $y=x^{4}-13x^{2}+36$ funtzioak X ardatzarekin duen ebaki handiena?', '¿Cuál es el mayor corte de $y=x^{4}-13x^{2}+36$ con el eje X?', 'ما أكبر نقطة تقاطع لـ $y=x^{4}-13x^{2}+36$ مع محور X؟', 'What is the largest x-intercept of $y=x^{4}-13x^{2}+36$?'), solution: same('$t^{2}-13t+36=0\\ \\to\\ t=4,\\ t=9\\ \\to\\ x=\\pm 2,\\ x=\\pm 3$'), answer: { expected: n(3) } },
            { id: 36, difficulty: 'medium', question: say('Zein abszisatan ebakitzen du $y=\\frac{x-5}{x+1}$ funtzioak X ardatza?', '¿En qué abscisa corta al eje X la función $y=\\frac{x-5}{x+1}$?', 'عند أي إحداثي سيني تقطع $y=\\frac{x-5}{x+1}$ محور X؟', 'At what x-value does $y=\\frac{x-5}{x+1}$ cross the x-axis?'), solution: say('Zenbakitzailea 0: $x-5=0$, $x=5$, izate-eremuan dagoena.', 'Numerador 0: $x-5=0$, $x=5$, que está en el dominio.', 'البسط 0: $x-5=0$، $x=5$، وهي في المجال.', 'Numerator equal to 0: $x-5=0$, $x=5$, which is in the domain.'), answer: { expected: n(5) } },
            { id: 37, difficulty: 'medium', question: say('$f$ bakoitia da eta $f(3)=-4$. Zenbat da $f(-3)$?', '$f$ es impar y $f(3)=-4$. ¿Cuánto vale $f(-3)$?', '$f$ فردية و$f(3)=-4$. كم تساوي $f(-3)$؟', '$f$ is odd and $f(3)=-4$. What is $f(-3)$?'), solution: same('$f(-3)=-f(3)=-(-4)=4$'), answer: { expected: n(4) } },
            { id: 38, difficulty: 'hard', question: say('$f(x)=x^{2}-x-12$ negatiboa da tarte batean. Zenbatekoa da tarte horren luzera?', '$f(x)=x^{2}-x-12$ es negativa en un intervalo. ¿Cuánto mide ese intervalo?', 'الدالة $f(x)=x^{2}-x-12$ سالبة في فترة. ما طول هذه الفترة؟', '$f(x)=x^{2}-x-12$ is negative on an interval. How long is that interval?'), solution: same('$x^{2}-x-12=0\\ \\to\\ x=4,\\ x=-3\\qquad (-3,\\,4)\\qquad 4-(-3)=7$'), answer: { expected: n(7) } },
            { id: 39, difficulty: 'hard', question: say('Zenbat da $y=x^{3}-x^{2}-9x+9$ funtzioak X ardatzarekin dituen ebaki-puntuen abszisen batura?', '¿Cuánto suman las abscisas de los cortes de $y=x^{3}-x^{2}-9x+9$ con el eje X?', 'ما مجموع الإحداثيات السينية لنقاط تقاطع $y=x^{3}-x^{2}-9x+9$ مع محور X؟', 'What is the sum of the x-intercepts of $y=x^{3}-x^{2}-9x+9$?'), solution: same('$x^{2}(x-1)-9(x-1)=(x-1)(x-3)(x+3)\\qquad 1+3+(-3)=1$'), answer: { expected: n(1) } },
            { id: 40, difficulty: 'hard', question: say('Frogatu $f(x)=x^{3}+x^{2}$ ez dela ez bikoitia ez bakoitia.', 'Demuestra que $f(x)=x^{3}+x^{2}$ no es ni par ni impar.', 'برهن أن $f(x)=x^{3}+x^{2}$ ليست زوجية ولا فردية.', 'Show that $f(x)=x^{3}+x^{2}$ is neither even nor odd.'), solution: say('$f(1)=2$ eta $f(-1)=-1+1=0$: ez da $f(1)$ ezta $-f(1)$ ere.', '$f(1)=2$ y $f(-1)=-1+1=0$: no es $f(1)$ ni $-f(1)$.', '$f(1)=2$ و$f(-1)=-1+1=0$: ليست $f(1)$ ولا $-f(1)$.', '$f(1)=2$ and $f(-1)=-1+1=0$: it is neither $f(1)$ nor $-f(1)$.') }
        ]
    },
    {
        id: 'change',
        title: say('Hazkundea eta periodoa', 'Crecimiento y periodo', 'التزايد والدورية', 'Growth and period'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Kalkulatu $f(x)=3x+2$ funtzioaren T.V.M. $[1,\\,5]$ tartean.', 'Halla la T.V.M. de $f(x)=3x+2$ en $[1,\\,5]$.', 'أوجد معدل التغير المتوسط لـ $f(x)=3x+2$ في $[1,\\,5]$.', 'Find the average rate of change of $f(x)=3x+2$ on $[1,\\,5]$.'), solution: same('$\\frac{17-5}{5-1}=\\frac{12}{4}=3$'), answer: { expected: n(3) } },
            { id: 42, difficulty: 'easy', question: say('Funtzio baten periodoa 4 da eta $f(1)=2$. Zenbat da $f(21)$?', 'Una función tiene periodo 4 y $f(1)=2$. ¿Cuánto vale $f(21)$?', 'دور دالة 4 و$f(1)=2$. كم تساوي $f(21)$؟', 'A function has period 4 and $f(1)=2$. What is $f(21)$?'), solution: same('$21=5\\cdot 4+1\\ \\to\\ f(21)=f(1)=2$'), answer: { expected: n(2) } },
            { id: 43, difficulty: 'easy', question: say('Zein da $y=x^{2}-8x+3$ parabolaren erpinaren abszisa?', '¿Cuál es la abscisa del vértice de $y=x^{2}-8x+3$?', 'ما الإحداثي السيني لرأس $y=x^{2}-8x+3$؟', 'What is the x-coordinate of the vertex of $y=x^{2}-8x+3$?'), solution: same('$x=\\frac{8}{2}=4$'), answer: { expected: n(4) } },
            { id: 44, difficulty: 'medium', question: say('Zein da $y=-x^{2}+6x-5$ funtzioaren balio maximoa?', '¿Cuál es el valor máximo de $y=-x^{2}+6x-5$?', 'ما القيمة العظمى لـ $y=-x^{2}+6x-5$؟', 'What is the maximum value of $y=-x^{2}+6x-5$?'), solution: same('$x=\\frac{-6}{-2}=3\\qquad y=-9+18-5=4$'), answer: { expected: n(4) } },
            { id: 45, difficulty: 'medium', question: say('Kalkulatu $f(x)=x^{2}-4x+5$ funtzioaren T.V.M. $[0,\\,2]$ tartean.', 'Halla la T.V.M. de $f(x)=x^{2}-4x+5$ en $[0,\\,2]$.', 'أوجد معدل التغير المتوسط لـ $f(x)=x^{2}-4x+5$ في $[0,\\,2]$.', 'Find the average rate of change of $f(x)=x^{2}-4x+5$ on $[0,\\,2]$.'), solution: same('$\\frac{1-5}{2-0}=-2$'), answer: { expected: n(-2) } },
            { id: 46, difficulty: 'medium', question: say('Kalkulatu $f(x)=x^{3}$ funtzioaren T.V.M. $[-1,\\,2]$ tartean.', 'Halla la T.V.M. de $f(x)=x^{3}$ en $[-1,\\,2]$.', 'أوجد معدل التغير المتوسط لـ $f(x)=x^{3}$ في $[-1,\\,2]$.', 'Find the average rate of change of $f(x)=x^{3}$ on $[-1,\\,2]$.'), solution: same('$\\frac{8-(-1)}{2-(-1)}=\\frac{9}{3}=3$'), answer: { expected: n(3) } },
            { id: 47, difficulty: 'medium', question: say('Funtzio baten periodoa 3 da, eta $f(0)=1$, $f(1)=4$, $f(2)=2$. Zenbat da $f(50)$?', 'Una función tiene periodo 3, y $f(0)=1$, $f(1)=4$, $f(2)=2$. ¿Cuánto vale $f(50)$?', 'دور دالة 3، و$f(0)=1$ و$f(1)=4$ و$f(2)=2$. كم تساوي $f(50)$؟', 'A function has period 3, and $f(0)=1$, $f(1)=4$, $f(2)=2$. What is $f(50)$?'), solution: same('$50=16\\cdot 3+2\\ \\to\\ f(50)=f(2)=2$'), answer: { expected: n(2) } },
            { id: 48, difficulty: 'hard', question: say('Igerilari batek 1 500 m egin ditu 30 minututan, abiadura konstantean. Zein da haren abiadura ertaina, m/min-tan?', 'Un nadador ha recorrido 1 500 m en 30 minutos a ritmo constante. ¿Cuál es su velocidad media, en m/min?', 'قطع سبّاح 1 500 م في 30 دقيقة بسرعة ثابتة. ما سرعته المتوسطة بالمتر في الدقيقة؟', 'A swimmer has covered 1,500 m in 30 minutes at a steady pace. What is their average speed, in m/min?'), solution: same('$\\frac{1\\,500}{30}=50$'), answer: { expected: n(50) } },
            { id: 49, difficulty: 'hard', question: say('Harri baten altuera $e=40t-5t^{2}$ da (m, s). Zein segundotan iristen da altuera maximora?', 'La altura de una piedra es $e=40t-5t^{2}$ (m, s). ¿En qué segundo alcanza la altura máxima?', 'ارتفاع حجر $e=40t-5t^{2}$ (م، ث). في أي ثانية يبلغ أقصى ارتفاع؟', 'The height of a stone is $e=40t-5t^{2}$ (m, s). At which second does it reach its maximum height?'), solution: same('$t=\\frac{-40}{-10}=4\\qquad e(4)=160-80=80$'), answer: { expected: n(4) } },
            { id: 50, difficulty: 'hard', question: say('Substantzia baten erradioaktibitatea urtero erdira jaisten da. Zein baliotara jotzen du denborarekin?', 'La radiactividad de una sustancia se reduce a la mitad cada año. ¿A qué valor tiende con el tiempo?', 'ينقص النشاط الإشعاعي لمادة إلى النصف كل سنة. إلى أي قيمة يتجه مع الزمن؟', 'The radioactivity of a substance halves every year. What value does it approach over time?'), solution: say('Urtero erdia geratzen da: $1$, $\\frac{1}{2}$, $\\frac{1}{4}$, $\\frac{1}{8}$… gero eta txikiagoa; 0ra jotzen du.', 'Cada año queda la mitad: $1$, $\\frac{1}{2}$, $\\frac{1}{4}$, $\\frac{1}{8}$… cada vez menos; tiende a 0.', 'كل سنة يبقى النصف: $1$ و$\\frac{1}{2}$ و$\\frac{1}{4}$ و$\\frac{1}{8}$… أقل فأقل؛ يتجه إلى 0.', 'Each year half is left: $1$, $\\frac{1}{2}$, $\\frac{1}{4}$, $\\frac{1}{8}$… less and less each time; it tends to 0.'), answer: { expected: n(0) } }
        ]
    }
]

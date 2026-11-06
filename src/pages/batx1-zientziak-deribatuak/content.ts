import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuak · Batxilergoa 1 · Zientziak — diagnostic, guided practice,
   exercise bank and challenges, with the scope of unit 10 of Santillana
   1.º Bachillerato Ciencias and unit 12 of Anaya Matemáticas I (all the
   exercises and numbers are our own). Every closed answer is a single
   number: an average rate, a derivative at a point, the n of a tangent, a
   parameter, or the x where the tangent has a given slope. Monotony and
   extremes belong to the next unit: a horizontal tangent here is only
   f′(x) = 0.
   ========================================================================== */

const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

const derive = (formula: string) => say(`Deribatu $${formula}$.`, `Deriva $${formula}$.`, `اشتق $${formula}$.`, `Differentiate $${formula}$.`)
/** «If f(x) = …, work out f′(a)» */
const at = (formula: string, a: number) => say(`$f(x)=${formula}$ bada, kalkulatu $f'(${a})$.`, `Si $f(x)=${formula}$, calcula $f'(${a})$.`, `إذا كانت $f(x)=${formula}$ فاحسب $f'(${a})$.`, `If $f(x)=${formula}$, work out $f'(${a})$.`)
const rate = (formula: string, a: number, b: number) => say(`Kalkulatu $f(x)=${formula}$ funtzioaren T.V.M. $[${a},\\,${b}]$ tartean.`, `Halla la T.V.M. de $f(x)=${formula}$ en $[${a},\\,${b}]$.`, `أوجد معدل التغير المتوسط لـ $f(x)=${formula}$ في $[${a},\\,${b}]$.`, `Find the average rate of $f(x)=${formula}$ on $[${a},\\,${b}]$.`)

export const bachDerivativesDiagnostic: DiagnosticQuestion[] = [
    {
        id: 110001,
        prompt: say('Zer malda du $(1,\\,2)$ eta $(3,\\,8)$ puntuetatik pasatzen den zuzenak?', '¿Qué pendiente tiene la recta que pasa por $(1,\\,2)$ y $(3,\\,8)$?', 'ما ميل المستقيم المار بالنقطتين $(1,\\,2)$ و$(3,\\,8)$؟', 'What is the slope of the line through $(1,\\,2)$ and $(3,\\,8)$?'),
        options: [same('$3$'), same('$6$'), same('$\\frac{1}{3}$')],
        correctIndex: 0,
        explanation: same('$\\frac{8-2}{3-1}=\\frac{6}{2}=3$'),
        topic: 'average-rate'
    },
    {
        id: 110002,
        prompt: say('Kalkulatu $\\lim_{h\\to 0}\\frac{h^2+5h}{h}$.', 'Calcula $\\lim_{h\\to 0}\\frac{h^2+5h}{h}$.', 'احسب $\\lim_{h\\to 0}\\frac{h^2+5h}{h}$.', 'Work out $\\lim_{h\\to 0}\\frac{h^2+5h}{h}$.'),
        options: [same('$0$'), same('$5$'), say('Ez dago', 'No existe', 'غير موجودة', 'It does not exist')],
        correctIndex: 1,
        explanation: say('Sinplifikatu $h$: $\\frac{h(h+5)}{h}=h+5$, eta 5 baliora doa.', 'Simplifica la $h$: $\\frac{h(h+5)}{h}=h+5$, que tiende a 5.', 'بسّط $h$: $\\frac{h(h+5)}{h}=h+5$، وتؤول إلى 5.', 'Cancel the $h$: $\\frac{h(h+5)}{h}=h+5$, which tends to 5.'),
        topic: 'derivative-point'
    },
    {
        id: 110003,
        prompt: say('Zein zuzen pasatzen da $(2,\\,1)$ puntutik 3 maldarekin?', '¿Qué recta pasa por $(2,\\,1)$ con pendiente 3?', 'أي مستقيم يمر بالنقطة $(2,\\,1)$ بميل 3؟', 'Which line goes through $(2,\\,1)$ with slope 3?'),
        options: [same('$y=3x-5$'), same('$y=3x+1$'), same('$y=2x+3$')],
        correctIndex: 0,
        explanation: same('$y-1=3(x-2)\\ \\to\\ y=3x-5$'),
        topic: 'tangent'
    },
    {
        id: 110004,
        prompt: say('Zenbat da $|x-4|$, $x<4$ denean?', '¿Cuánto vale $|x-4|$ si $x<4$?', 'كم تساوي $|x-4|$ إذا كان $x<4$؟', 'What is $|x-4|$ if $x<4$?'),
        options: [same('$x-4$'), same('$4-x$'), same('$x+4$')],
        correctIndex: 1,
        explanation: say('$x<4$ denean, $x-4$ negatiboa da, eta zeinua aldatzen zaio.', 'Si $x<4$, $x-4$ es negativo y se le cambia el signo.', 'إذا كان $x<4$ فإن $x-4$ سالب فنغيّر إشارته.', 'If $x<4$, $x-4$ is negative and its sign is changed.'),
        topic: 'one-sided-derivatives'
    },
    {
        id: 110005,
        prompt: say('Jarraitua al da funtzio hau $x=1$ puntuan? $f(x)=\\begin{cases}2x & x<1\\\\ x+1 & x\\ge 1\\end{cases}$', '¿Es continua en $x=1$ esta función? $f(x)=\\begin{cases}2x & x<1\\\\ x+1 & x\\ge 1\\end{cases}$', 'هل هذه الدالة متصلة عند $x=1$؟ $f(x)=\\begin{cases}2x & x<1\\\\ x+1 & x\\ge 1\\end{cases}$', 'Is this function continuous at $x=1$? $f(x)=\\begin{cases}2x & x<1\\\\ x+1 & x\\ge 1\\end{cases}$'),
        options: [say('Bai', 'Sí', 'نعم', 'Yes'), say('Ez, jauzi egiten du 1 puntuan', 'No, salta en 1', 'لا، تقفز عند 1', 'No, it jumps at 1'), say('Eskuinetik bakarrik', 'Solo por la derecha', 'من اليمين فقط', 'Only from the right')],
        correctIndex: 0,
        explanation: say('$2\\cdot 1=2$ eta $1+1=2$: zatiak elkartzen dira.', '$2\\cdot 1=2$ y $1+1=2$: los trozos se unen.', '$2\\cdot 1=2$ و$1+1=2$: يلتقي الجزآن.', '$2\\cdot 1=2$ and $1+1=2$: the pieces meet.'),
        topic: 'derivable-continuous'
    },
    {
        id: 110006,
        prompt: say('Nola idazten da $\\frac{1}{x^3}$ berretura gisa?', '¿Cómo se escribe $\\frac{1}{x^3}$ como potencia?', 'كيف تُكتب $\\frac{1}{x^3}$ على صورة قوة؟', 'How is $\\frac{1}{x^3}$ written as a power?'),
        options: [same('$x^3$'), same('$x^{-3}$'), same('$x^{\\frac{1}{3}}$')],
        correctIndex: 1,
        explanation: say('Izendatzailean dagoen berretura bat berretzaile negatiboarekin igotzen da.', 'Una potencia en el denominador sube con el exponente negativo.', 'القوة في المقام تصعد إلى البسط بأس سالب.', 'A power in the denominator goes up with a negative exponent.'),
        topic: 'powers'
    },
    {
        id: 110007,
        prompt: say('$f(x)=x^2$ eta $g(x)=x+3$ badira, zer da $f(g(x))$?', 'Si $f(x)=x^2$ y $g(x)=x+3$, ¿qué es $f(g(x))$?', 'إذا كانت $f(x)=x^2$ و$g(x)=x+3$ فما $f(g(x))$؟', 'If $f(x)=x^2$ and $g(x)=x+3$, what is $f(g(x))$?'),
        options: [same('$x^2+3$'), same('$x^2(x+3)$'), same('$(x+3)^2$')],
        correctIndex: 2,
        explanation: say('Lehenik $g$ funtzioak eragiten du, eta haren emaitza ber bi egiten da.', 'Primero actúa $g$, y su resultado se eleva al cuadrado.', 'تعمل $g$ أولًا ثم تُربَّع نتيجتها.', 'First $g$ acts, and its result is squared.'),
        topic: 'chain'
    },
    {
        id: 110008,
        prompt: say('Zenbat da $\\ln e^4$?', '¿Cuánto vale $\\ln e^4$?', 'كم يساوي $\\ln e^4$؟', 'What is $\\ln e^4$?'),
        options: [same('$e^4$'), same('$1$'), same('$4$')],
        correctIndex: 2,
        explanation: say('$\\ln$ eta $e$ alderantzizkoak dira: berretzailea geratzen da.', '$\\ln$ y $e$ son inversas: queda el exponente.', '$\\ln$ و$e$ دالتان عكسيتان: يبقى الأس.', '$\\ln$ and $e$ are inverses: the exponent is left.'),
        topic: 'exp-log'
    }
]

export const bachDerivativesPractice: PracticeItem[] = [
    /* ---------- The rate of change ---------- */
    { id: 1, stage: 'rate', prompt: rate('x^2-3x', 1, 4), expected: n(2), hint: say('Kalkulatu $f(1)$ eta $f(4)$, eta zatitu 3 zenbakiaz.', 'Calcula $f(1)$ y $f(4)$ y divide entre 3.', 'احسب $f(1)$ و$f(4)$ واقسم على 3.', 'Work out $f(1)$ and $f(4)$ and divide by 3.'), explanation: same('$\\frac{4-(-2)}{4-1}=\\frac{6}{3}=2$') },
    { id: 2, stage: 'rate', prompt: say('Auto batek $s(t)=t^2+4t$ km egiten ditu $t$ ordutan. Zein da bere batez besteko abiadura $t=1$ eta $t=3$ artean, km/h-tan?', 'Un coche recorre $s(t)=t^2+4t$ km en $t$ horas. ¿Cuál es su velocidad media entre $t=1$ y $t=3$, en km/h?', 'تقطع سيارة $s(t)=t^2+4t$ كم في $t$ ساعة. ما سرعتها المتوسطة بين $t=1$ و$t=3$ بالكيلومتر في الساعة؟', 'A car travels $s(t)=t^2+4t$ km in $t$ hours. What is its average speed between $t=1$ and $t=3$, in km/h?'), expected: n(8), hint: say('Ibilbidea zati denbora.', 'Recorrido entre tiempo.', 'المسافة على الزمن.', 'Distance over time.'), explanation: same('$\\frac{21-5}{3-1}=\\frac{16}{2}=8$') },
    { id: 3, stage: 'rate', prompt: say('Kalkulatu $f\'(2)$ definizioaren bidez, $f(x)=3x^2$ bada.', 'Calcula $f\'(2)$ con la definición para $f(x)=3x^2$.', 'احسب $f\'(2)$ بالتعريف للدالة $f(x)=3x^2$.', 'Work out $f\'(2)$ from the definition for $f(x)=3x^2$.'), expected: n(12), hint: say('Garatu $3(2+h)^2-12$ eta sinplifikatu $h$.', 'Desarrolla $3(2+h)^2-12$ y simplifica la $h$.', 'انشر $3(2+h)^2-12$ وبسّط $h$.', 'Expand $3(2+h)^2-12$ and cancel the $h$.'), explanation: same('$\\frac{3(2+h)^2-12}{h}=12+3h\\ \\to\\ 12$') },
    { id: 4, stage: 'rate', prompt: say('$f(x)=x^2$ funtzioaren zuzen ukitzailea $x=3$ puntuan $y=6x+n$ da. Aurkitu $n$.', 'La tangente a $f(x)=x^2$ en $x=3$ es $y=6x+n$. Halla $n$.', 'مماس $f(x)=x^2$ عند $x=3$ هو $y=6x+n$. أوجد $n$.', 'The tangent to $f(x)=x^2$ at $x=3$ is $y=6x+n$. Find $n$.'), expected: n(-9), hint: say('Zuzenak $(3,\\,9)$ puntutik pasatu behar du.', 'La recta tiene que pasar por $(3,\\,9)$.', 'يجب أن يمر المستقيم بالنقطة $(3,\\,9)$.', 'The line has to go through $(3,\\,9)$.'), explanation: same('$y-9=6(x-3)\\ \\to\\ y=6x-9$') },
    /* ---------- Differentiability ---------- */
    { id: 5, stage: 'derivability', prompt: say('$f(x)=|x-5|$ bada, zenbat da $f\'(5^+)$?', 'Si $f(x)=|x-5|$, ¿cuánto vale $f\'(5^+)$?', 'إذا كانت $f(x)=|x-5|$ فكم تساوي $f\'(5^+)$؟', 'If $f(x)=|x-5|$, what is $f\'(5^+)$?'), expected: n(1), hint: say('Eskuinean $x>5$ da.', 'A la derecha $x>5$.', 'إلى اليمين $x>5$.', 'To the right $x>5$.'), explanation: say('$x>5$ denean, $f(x)=x-5$, eta haren malda 1 da.', 'Si $x>5$, $f(x)=x-5$, cuya pendiente es 1.', 'إذا كان $x>5$ فإن $f(x)=x-5$ وميلها 1.', 'If $x>5$, $f(x)=x-5$, whose slope is 1.') },
    { id: 6, stage: 'derivability', prompt: say('Aurkitu $k$, funtzio hau $x=2$ puntuan jarraitua izan dadin: $f(x)=\\begin{cases}x^2 & x<2\\\\ 4x+k & x\\ge 2\\end{cases}$', 'Halla $k$ para que esta función sea continua en $x=2$: $f(x)=\\begin{cases}x^2 & x<2\\\\ 4x+k & x\\ge 2\\end{cases}$', 'أوجد $k$ كي تكون هذه الدالة متصلة عند $x=2$: $f(x)=\\begin{cases}x^2 & x<2\\\\ 4x+k & x\\ge 2\\end{cases}$', 'Find $k$ so that this function is continuous at $x=2$: $f(x)=\\begin{cases}x^2 & x<2\\\\ 4x+k & x\\ge 2\\end{cases}$'), expected: n(-4), hint: say('Berdindu bi zatiak $x=2$ puntuan.', 'Iguala los dos trozos en $x=2$.', 'ساوِ الجزأين عند $x=2$.', 'Set the two pieces equal at $x=2$.'), explanation: same('$4=8+k\\ \\to\\ k=-4$') },
    { id: 7, stage: 'derivability', prompt: say('Funtzio hau jarraitua da $x=3$ puntuan. Zenbat da $f\'(3)$? $f(x)=\\begin{cases}x^2 & x<3\\\\ 6x-9 & x\\ge 3\\end{cases}$', 'Esta función es continua en $x=3$. ¿Cuánto vale $f\'(3)$? $f(x)=\\begin{cases}x^2 & x<3\\\\ 6x-9 & x\\ge 3\\end{cases}$', 'هذه الدالة متصلة عند $x=3$. كم تساوي $f\'(3)$؟ $f(x)=\\begin{cases}x^2 & x<3\\\\ 6x-9 & x\\ge 3\\end{cases}$', 'This function is continuous at $x=3$. What is $f\'(3)$? $f(x)=\\begin{cases}x^2 & x<3\\\\ 6x-9 & x\\ge 3\\end{cases}$'), expected: n(6), hint: say('Konparatu bi zatien maldak 3 puntuan.', 'Compara las pendientes de los dos trozos en 3.', 'قارن ميلي الجزأين عند 3.', 'Compare the slopes of the two pieces at 3.'), explanation: say('$2\\cdot 3=6$, eta $6x-9$ zuzenaren malda ere 6 da.', '$2\\cdot 3=6$, y la pendiente de $6x-9$ también es 6.', '$2\\cdot 3=6$، وميل $6x-9$ أيضًا 6.', '$2\\cdot 3=6$, and the slope of $6x-9$ is also 6.') },
    { id: 8, stage: 'derivability', prompt: say('Aurkitu $b$, funtzio hau $x=1$ puntuan deribagarria izan dadin: $f(x)=\\begin{cases}x^3 & x<1\\\\ bx-2 & x\\ge 1\\end{cases}$', 'Halla $b$ para que esta función sea derivable en $x=1$: $f(x)=\\begin{cases}x^3 & x<1\\\\ bx-2 & x\\ge 1\\end{cases}$', 'أوجد $b$ كي تكون هذه الدالة قابلة للاشتقاق عند $x=1$: $f(x)=\\begin{cases}x^3 & x<1\\\\ bx-2 & x\\ge 1\\end{cases}$', 'Find $b$ so that this function is differentiable at $x=1$: $f(x)=\\begin{cases}x^3 & x<1\\\\ bx-2 & x\\ge 1\\end{cases}$'), expected: n(3), hint: say('$x^3$ funtzioaren malda $3x^2$ da.', 'La pendiente de $x^3$ es $3x^2$.', 'ميل $x^3$ هو $3x^2$.', 'The slope of $x^3$ is $3x^2$.'), explanation: say('Maldak: $3\\cdot 1=b$. Jarraitutasuna: $1=b-2$. Biek $b=3$ ematen dute.', 'Pendientes: $3\\cdot 1=b$. Continuidad: $1=b-2$. Las dos dan $b=3$.', 'الميلان: $3\\cdot 1=b$. الاتصال: $1=b-2$. وكلاهما يعطي $b=3$.', 'Slopes: $3\\cdot 1=b$. Continuity: $1=b-2$. Both give $b=3$.') },
    /* ---------- The derivative function ---------- */
    { id: 9, stage: 'function', prompt: at('x^2-5x', 4), expected: n(3), hint: say('Lehenik $f\'(x)$, gero ordezkatu.', 'Primero $f\'(x)$, después sustituye.', 'أولًا $f\'(x)$ ثم عوّض.', 'First $f\'(x)$, then substitute.'), explanation: same('$f\'(x)=2x-5\\ \\to\\ f\'(4)=8-5=3$') },
    { id: 10, stage: 'function', prompt: at('\\sqrt{x}', 9), expected: f(1, 6), hint: say('$(\\sqrt{x})\'=\\frac{1}{2\\sqrt{x}}$', '$(\\sqrt{x})\'=\\frac{1}{2\\sqrt{x}}$', '$(\\sqrt{x})\'=\\frac{1}{2\\sqrt{x}}$', '$(\\sqrt{x})\'=\\frac{1}{2\\sqrt{x}}$'), explanation: same('$\\frac{1}{2\\sqrt{9}}=\\frac{1}{6}$') },
    { id: 11, stage: 'function', prompt: at('\\frac{4}{x}', 2), expected: n(-1), hint: say('Idatzi $4x^{-1}$.', 'Escribe $4x^{-1}$.', 'اكتب $4x^{-1}$.', 'Write $4x^{-1}$.'), explanation: same('$-\\frac{4}{x^2}\\ \\to\\ -\\frac{4}{4}=-1$') },
    { id: 12, stage: 'function', prompt: at('2x^5-3x^2+x-8', 1), expected: n(5), hint: say('Gaiz gai; konstantea desagertu egiten da.', 'Término a término; la constante desaparece.', 'حدًّا حدًّا؛ ويختفي الثابت.', 'Term by term; the constant disappears.'), explanation: same('$f\'(x)=10x^4-6x+1\\ \\to\\ f\'(1)=10-6+1=5$') },
    /* ---------- Rules ---------- */
    { id: 13, stage: 'rules', prompt: at('(x+2)(x^2-1)', 1), expected: n(6), hint: say('Biderkaduraren erregela: $f\'\\cdot g+f\\cdot g\'$.', 'Regla del producto: $f\'\\cdot g+f\\cdot g\'$.', 'قاعدة الجداء: $f\'\\cdot g+f\\cdot g\'$.', 'Product rule: $f\'\\cdot g+f\\cdot g\'$.'), explanation: same('$f\'(1)=(1-1)+(1+2)\\cdot 2=6$') },
    { id: 14, stage: 'rules', prompt: at('\\frac{x+1}{x-1}', 3), expected: f(-1, 2), hint: say('Zatiduraren erregela; ordena zaindu.', 'Regla del cociente; cuida el orden.', 'قاعدة خارج القسمة؛ انتبه إلى الترتيب.', 'Quotient rule; mind the order.'), explanation: same('$f\'(x)=\\frac{-2}{(x-1)^2}\\ \\to\\ f\'(3)=\\frac{-2}{4}=-\\frac{1}{2}$') },
    { id: 15, stage: 'rules', prompt: at('(3x-5)^4', 2), expected: n(12), hint: say('Katea: barrukoaren deribatua 3 da.', 'Cadena: la derivada de dentro es 3.', 'السلسلة: مشتقة الداخلية 3.', 'Chain: the derivative of the inside is 3.'), explanation: same('$f\'(2)=4\\cdot 1^{3}\\cdot 3=12$') },
    { id: 16, stage: 'rules', prompt: at('\\sqrt{x^2+9}', 4), expected: f(4, 5), hint: say('$(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$', '$(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$', '$(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$', '$(\\sqrt{u})\'=\\frac{u\'}{2\\sqrt{u}}$'), explanation: same('$f\'(4)=\\frac{4}{\\sqrt{16+9}}=\\frac{4}{5}$') },
    /* ---------- Elementary functions ---------- */
    { id: 17, stage: 'elementary', prompt: at('e^{2x}', 0), expected: n(2), hint: same('$(e^{u})\'=e^{u}\\cdot u\'$'), explanation: same('$f\'(x)=2e^{2x}\\ \\to\\ f\'(0)=2\\cdot 1=2$') },
    { id: 18, stage: 'elementary', prompt: at('\\ln(x^2+3)', 1), expected: f(1, 2), hint: same('$(\\ln u)\'=\\frac{u\'}{u}$'), explanation: same('$f\'(1)=\\frac{2}{1+3}=\\frac{1}{2}$') },
    { id: 19, stage: 'elementary', prompt: at('x\\sin x', 0), expected: n(0), hint: say('Biderkadura bat da.', 'Es un producto.', 'إنه جداء.', 'It is a product.'), explanation: same('$f\'(x)=\\sin x+x\\cos x\\ \\to\\ f\'(0)=0$') },
    { id: 20, stage: 'elementary', prompt: say('Zer $x$ baliotan da horizontala $f(x)=x^2-8x+3$ funtzioaren zuzen ukitzailea?', '¿En qué $x$ es horizontal la tangente a $f(x)=x^2-8x+3$?', 'عند أي $x$ يكون مماس $f(x)=x^2-8x+3$ أفقيًّا؟', 'At which $x$ is the tangent to $f(x)=x^2-8x+3$ horizontal?'), expected: n(4), hint: say('Zuzen ukitzaile horizontala: $f\'(x)=0$.', 'Tangente horizontal: $f\'(x)=0$.', 'مماس أفقي: $f\'(x)=0$.', 'Horizontal tangent: $f\'(x)=0$.'), explanation: same('$2x-8=0\\ \\to\\ x=4$') }
]

export const bachDerivativesChallenges: ChallengeItem[] = [
    { id: 101, stage: 'rate', points: 10, context: 'starter', prompt: say('$f(x)=x^2+kx$ funtzioaren T.V.M. $[0,\\,2]$ tartean 5 da. Aurkitu $k$.', 'La T.V.M. de $f(x)=x^2+kx$ en $[0,\\,2]$ es 5. Halla $k$.', 'معدل التغير المتوسط لـ $f(x)=x^2+kx$ في $[0,\\,2]$ يساوي 5. أوجد $k$.', 'The average rate of $f(x)=x^2+kx$ on $[0,\\,2]$ is 5. Find $k$.'), expected: n(3), hint: say('$f(0)=0$ eta $f(2)=4+2k$.', '$f(0)=0$ y $f(2)=4+2k$.', '$f(0)=0$ و$f(2)=4+2k$.', '$f(0)=0$ and $f(2)=4+2k$.'), explanation: same('$\\frac{4+2k}{2}=5\\ \\to\\ k=3$') },
    { id: 102, stage: 'rate', points: 20, context: 'advanced', prompt: say('Globo batek $s(t)=20t-t^2$ metroko altuera du $t$ segundotan. Zein da bere une bateko abiadura $t=4$ unean, m/s-tan?', 'Un globo está a $s(t)=20t-t^2$ metros de altura a los $t$ segundos. ¿Cuál es su velocidad instantánea en $t=4$, en m/s?', 'يكون منطاد على ارتفاع $s(t)=20t-t^2$ مترًا بعد $t$ ثانية. ما سرعته اللحظية عند $t=4$ بالمتر في الثانية؟', 'A balloon is $s(t)=20t-t^2$ metres high after $t$ seconds. What is its instantaneous speed at $t=4$, in m/s?'), expected: n(12), hint: say('Une bateko abiadura $s\'(4)$ da.', 'La velocidad instantánea es $s\'(4)$.', 'السرعة اللحظية هي $s\'(4)$.', 'The instantaneous speed is $s\'(4)$.'), explanation: same('$s\'(t)=20-2t\\ \\to\\ s\'(4)=20-8=12$') },
    { id: 103, stage: 'rate', points: 30, context: 'master', prompt: say('$f(x)=x^2+1$ funtzioaren zuzen ukitzaileak $x=a$ puntuan, $a>0$ izanik, jatorritik pasatzen da. Aurkitu $a$.', 'La tangente a $f(x)=x^2+1$ en $x=a$, con $a>0$, pasa por el origen. Halla $a$.', 'مماس $f(x)=x^2+1$ عند $x=a$ حيث $a>0$ يمر بالأصل. أوجد $a$.', 'The tangent to $f(x)=x^2+1$ at $x=a$, with $a>0$, goes through the origin. Find $a$.'), expected: n(1), hint: say('Zuzen ukitzailea: $y=2a(x-a)+a^2+1$. Jarri $x=0$ eta $y=0$.', 'La tangente: $y=2a(x-a)+a^2+1$. Pon $x=0$ e $y=0$.', 'المماس: $y=2a(x-a)+a^2+1$. ضع $x=0$ و$y=0$.', 'The tangent: $y=2a(x-a)+a^2+1$. Put $x=0$ and $y=0$.'), explanation: same('$0=-2a^2+a^2+1\\ \\to\\ a^2=1\\ \\to\\ a=1$') },
    { id: 104, stage: 'derivability', points: 10, context: 'starter', prompt: say('Aurkitu $m$, funtzio hau $x=2$ puntuan deribagarria izan dadin: $f(x)=\\begin{cases}x^2 & x<2\\\\ mx-4 & x\\ge 2\\end{cases}$', 'Halla $m$ para que esta función sea derivable en $x=2$: $f(x)=\\begin{cases}x^2 & x<2\\\\ mx-4 & x\\ge 2\\end{cases}$', 'أوجد $m$ كي تكون هذه الدالة قابلة للاشتقاق عند $x=2$: $f(x)=\\begin{cases}x^2 & x<2\\\\ mx-4 & x\\ge 2\\end{cases}$', 'Find $m$ so that this function is differentiable at $x=2$: $f(x)=\\begin{cases}x^2 & x<2\\\\ mx-4 & x\\ge 2\\end{cases}$'), expected: n(4), hint: say('Malda bera 2 puntuan, eta zatiak elkartuta.', 'Misma pendiente en 2, y los trozos unidos.', 'الميل نفسه عند 2 والجزآن ملتقيان.', 'The same slope at 2, and the pieces joined.'), explanation: say('Maldak: $2\\cdot 2=m$. Egiaztatu: $4=2\\cdot 4-4$.', 'Pendientes: $2\\cdot 2=m$. Comprueba: $4=2\\cdot 4-4$.', 'الميلان: $2\\cdot 2=m$. تحقق: $4=2\\cdot 4-4$.', 'Slopes: $2\\cdot 2=m$. Check: $4=2\\cdot 4-4$.') },
    { id: 105, stage: 'derivability', points: 20, context: 'advanced', prompt: say('Aurkitu $a$, funtzio hau $x=0$ puntuan deribagarria izan dadin: $f(x)=\\begin{cases}x^2+ax & x<0\\\\ 3x & x\\ge 0\\end{cases}$', 'Halla $a$ para que esta función sea derivable en $x=0$: $f(x)=\\begin{cases}x^2+ax & x<0\\\\ 3x & x\\ge 0\\end{cases}$', 'أوجد $a$ كي تكون هذه الدالة قابلة للاشتقاق عند $x=0$: $f(x)=\\begin{cases}x^2+ax & x<0\\\\ 3x & x\\ge 0\\end{cases}$', 'Find $a$ so that this function is differentiable at $x=0$: $f(x)=\\begin{cases}x^2+ax & x<0\\\\ 3x & x\\ge 0\\end{cases}$'), expected: n(3), hint: say('Bi zatiek 0 balio dute 0 puntuan; konparatu maldak.', 'Los dos trozos valen 0 en 0; compara las pendientes.', 'الجزآن يساويان 0 عند 0؛ قارن الميلين.', 'Both pieces are 0 at 0; compare the slopes.'), explanation: say('Ezkerreko malda $2\\cdot 0+a$ da, eta eskuinekoa 3: $a=3$.', 'La pendiente izquierda es $2\\cdot 0+a$ y la derecha 3: $a=3$.', 'الميل الأيسر $2\\cdot 0+a$ والأيمن 3: $a=3$.', 'The left slope is $2\\cdot 0+a$ and the right one 3: $a=3$.') },
    { id: 106, stage: 'derivability', points: 30, context: 'master', prompt: say('Funtzio hau $x=1$ puntuan deribagarria da. Aurkitu $b$. $f(x)=\\begin{cases}ax^2+b & x<1\\\\ 2x^3 & x\\ge 1\\end{cases}$', 'Esta función es derivable en $x=1$. Halla $b$. $f(x)=\\begin{cases}ax^2+b & x<1\\\\ 2x^3 & x\\ge 1\\end{cases}$', 'هذه الدالة قابلة للاشتقاق عند $x=1$. أوجد $b$. $f(x)=\\begin{cases}ax^2+b & x<1\\\\ 2x^3 & x\\ge 1\\end{cases}$', 'This function is differentiable at $x=1$. Find $b$. $f(x)=\\begin{cases}ax^2+b & x<1\\\\ 2x^3 & x\\ge 1\\end{cases}$'), expected: n(-1), hint: say('Lehenik maldetatik $a$, gero jarraitutasunetik $b$.', 'Primero $a$ con las pendientes, después $b$ con la continuidad.', 'أولًا $a$ من الميلين ثم $b$ من الاتصال.', 'First $a$ from the slopes, then $b$ from continuity.'), explanation: same('$2a=6\\ \\to\\ a=3\\qquad a+b=2\\ \\to\\ b=-1$') },
    { id: 107, stage: 'function', points: 10, context: 'starter', prompt: say('$f(x)=x^3-12x$ bada, zer $x>0$ baliotan betetzen da $f\'(x)=0$?', 'Si $f(x)=x^3-12x$, ¿en qué $x>0$ se cumple $f\'(x)=0$?', 'إذا كانت $f(x)=x^3-12x$ فعند أي $x>0$ يتحقق $f\'(x)=0$؟', 'If $f(x)=x^3-12x$, at which $x>0$ is $f\'(x)=0$?'), expected: n(2), hint: same('$f\'(x)=3x^2-12$'), explanation: same('$3x^2-12=0\\ \\to\\ x^2=4\\ \\to\\ x=2$') },
    { id: 108, stage: 'function', points: 20, context: 'advanced', prompt: at('\\frac{2}{\\sqrt{x}}', 4), expected: f(-1, 8), hint: say('Idatzi $2x^{-\\frac{1}{2}}$.', 'Escribe $2x^{-\\frac{1}{2}}$.', 'اكتب $2x^{-\\frac{1}{2}}$.', 'Write $2x^{-\\frac{1}{2}}$.'), explanation: same('$f\'(x)=-x^{-\\frac{3}{2}}\\ \\to\\ f\'(4)=-\\frac{1}{8}$') },
    { id: 109, stage: 'function', points: 30, context: 'master', prompt: say('$f(x)=ax^3+2x$ funtzioak $f\'(2)=26$ betetzen du. Aurkitu $a$.', '$f(x)=ax^3+2x$ cumple $f\'(2)=26$. Halla $a$.', 'تحقق $f(x)=ax^3+2x$ الشرط $f\'(2)=26$. أوجد $a$.', '$f(x)=ax^3+2x$ satisfies $f\'(2)=26$. Find $a$.'), expected: n(2), hint: same('$f\'(x)=3ax^2+2$'), explanation: same('$12a+2=26\\ \\to\\ a=2$') },
    { id: 110, stage: 'rules', points: 10, context: 'starter', prompt: at('x^2(x+3)', -1), expected: n(-3), hint: say('Biderkaduraren erregela.', 'Regla del producto.', 'قاعدة الجداء.', 'Product rule.'), explanation: same('$f\'(-1)=2(-1)(2)+1=-3$') },
    { id: 111, stage: 'rules', points: 20, context: 'advanced', prompt: at('\\frac{x^2}{x+1}', 1), expected: f(3, 4), hint: say('Zatiduraren erregela.', 'Regla del cociente.', 'قاعدة خارج القسمة.', 'Quotient rule.'), explanation: same('$f\'(1)=\\frac{2\\cdot 2-1}{4}=\\frac{3}{4}$') },
    { id: 112, stage: 'rules', points: 30, context: 'master', prompt: at('(x^2+1)^3', 1), expected: n(24), hint: say('Katea: barruan $x^2+1$.', 'Cadena: dentro $x^2+1$.', 'السلسلة: في الداخل $x^2+1$.', 'Chain: inside $x^2+1$.'), explanation: same('$f\'(1)=3\\cdot 2^{2}\\cdot 2=24$') },
    { id: 113, stage: 'elementary', points: 10, context: 'starter', prompt: at('e^{x^2-1}', 1), expected: n(2), hint: say('Berretzailearen deribatua $2x$ da.', 'La derivada del exponente es $2x$.', 'مشتقة الأس $2x$.', 'The derivative of the exponent is $2x$.'), explanation: same('$f\'(x)=2x\\,e^{x^2-1}\\ \\to\\ f\'(1)=2$') },
    { id: 114, stage: 'elementary', points: 20, context: 'advanced', prompt: at('\\arctan(2x)', 0), expected: n(2), hint: same('$(\\arctan u)\'=\\frac{u\'}{1+u^2}$'), explanation: same('$f\'(0)=\\frac{2}{1+0}=2$') },
    { id: 115, stage: 'elementary', points: 30, context: 'master', prompt: say('$f(x)=x^2+bx$ funtzioaren zuzen ukitzailea $x=1$ puntuan $y=5x$ zuzenaren paraleloa da. Aurkitu $b$.', 'La tangente a $f(x)=x^2+bx$ en $x=1$ es paralela a $y=5x$. Halla $b$.', 'مماس $f(x)=x^2+bx$ عند $x=1$ يوازي $y=5x$. أوجد $b$.', 'The tangent to $f(x)=x^2+bx$ at $x=1$ is parallel to $y=5x$. Find $b$.'), expected: n(3), hint: say('Paraleloa: $f\'(1)=5$.', 'Paralela: $f\'(1)=5$.', 'موازٍ: $f\'(1)=5$.', 'Parallel: $f\'(1)=5$.'), explanation: same('$f\'(1)=2+b=5\\ \\to\\ b=3$') }
]

export const bachDerivativesExerciseBank: ExerciseSection[] = [
    {
        id: 'rate',
        title: say('Aldakuntza-tasa', 'La tasa de variación', 'معدل التغير', 'The rate of change'),
        items: [
            { id: 1, difficulty: 'easy', question: rate('2x+7', 0, 5), solution: same('$\\frac{17-7}{5}=2$'), answer: { expected: n(2) } },
            { id: 2, difficulty: 'easy', question: rate('x^2', 2, 5), solution: same('$\\frac{25-4}{5-2}=7$'), answer: { expected: n(7) } },
            { id: 3, difficulty: 'easy', question: say('Txirrindulari batek $d(t)=12t$ km egiten ditu $t$ ordutan. Zein da bere batez besteko abiadura, km/h-tan?', 'Un ciclista recorre $d(t)=12t$ km en $t$ horas. ¿Cuál es su velocidad media, en km/h?', 'يقطع درّاج $d(t)=12t$ كم في $t$ ساعة. ما سرعته المتوسطة بالكيلومتر في الساعة؟', 'A cyclist travels $d(t)=12t$ km in $t$ hours. What is their average speed, in km/h?'), solution: say('Beti 12 km/h: zuzen baten T.V.M. bere malda da.', 'Siempre 12 km/h: la T.V.M. de una recta es su pendiente.', 'دائمًا 12 كم/س: معدل التغير المتوسط لمستقيم هو ميله.', 'Always 12 km/h: the average rate of a line is its slope.'), answer: { expected: n(12) } },
            { id: 4, difficulty: 'medium', question: say('Kalkulatu $f\'(1)$ definizioaren bidez, $f(x)=x^2+4x$ bada.', 'Calcula $f\'(1)$ con la definición para $f(x)=x^2+4x$.', 'احسب $f\'(1)$ بالتعريف للدالة $f(x)=x^2+4x$.', 'Work out $f\'(1)$ from the definition for $f(x)=x^2+4x$.'), solution: same('$\\frac{(1+h)^2+4(1+h)-5}{h}=6+h\\ \\to\\ 6$'), answer: { expected: n(6) } },
            { id: 5, difficulty: 'medium', question: say('Kalkulatu $f\'(2)$ definizioaren bidez, $f(x)=\\frac{1}{x}$ bada.', 'Calcula $f\'(2)$ con la definición para $f(x)=\\frac{1}{x}$.', 'احسب $f\'(2)$ بالتعريف للدالة $f(x)=\\frac{1}{x}$.', 'Work out $f\'(2)$ from the definition for $f(x)=\\frac{1}{x}$.'), solution: same('$\\frac{\\frac{1}{2+h}-\\frac{1}{2}}{h}=\\frac{-1}{2(2+h)}\\ \\to\\ -\\frac{1}{4}$'), answer: { expected: f(-1, 4) } },
            { id: 6, difficulty: 'medium', question: say('Idatzi $f(x)=x^2-1$ funtzioaren zuzen ukitzailea $x=2$ puntuan, $f\'(2)=4$ dela jakinda.', 'Escribe la tangente a $f(x)=x^2-1$ en $x=2$, sabiendo que $f\'(2)=4$.', 'اكتب مماس $f(x)=x^2-1$ عند $x=2$ علمًا أن $f\'(2)=4$.', 'Write the tangent to $f(x)=x^2-1$ at $x=2$, knowing that $f\'(2)=4$.'), solution: same('$y-3=4(x-2)\\ \\to\\ y=4x-5$') },
            { id: 7, difficulty: 'medium', question: say('Idatzi $f(x)=x^2$ funtzioaren normala $x=-1$ puntuan, $f\'(-1)=-2$ dela jakinda.', 'Escribe la normal a $f(x)=x^2$ en $x=-1$, sabiendo que $f\'(-1)=-2$.', 'اكتب العمودي على $f(x)=x^2$ عند $x=-1$ علمًا أن $f\'(-1)=-2$.', 'Write the normal to $f(x)=x^2$ at $x=-1$, knowing that $f\'(-1)=-2$.'), solution: say('Normalaren malda $\\frac{1}{2}$ da: $y-1=\\frac{1}{2}(x+1)$.', 'La normal tiene pendiente $\\frac{1}{2}$: $y-1=\\frac{1}{2}(x+1)$.', 'ميل العمودي $\\frac{1}{2}$: $y-1=\\frac{1}{2}(x+1)$.', 'The normal has slope $\\frac{1}{2}$: $y-1=\\frac{1}{2}(x+1)$.') },
            { id: 8, difficulty: 'medium', question: say('Pilota bat $s(t)=30t-5t^2$ metroko altueran dago. Zein da bere batez besteko abiadura $t=1$ eta $t=3$ artean, m/s-tan?', 'Una pelota está a $s(t)=30t-5t^2$ metros de altura. ¿Cuál es su velocidad media entre $t=1$ y $t=3$, en m/s?', 'كرة على ارتفاع $s(t)=30t-5t^2$ مترًا. ما سرعتها المتوسطة بين $t=1$ و$t=3$ بالمتر في الثانية؟', 'A ball is $s(t)=30t-5t^2$ metres high. What is its average speed between $t=1$ and $t=3$, in m/s?'), solution: same('$\\frac{45-25}{3-1}=10$'), answer: { expected: n(10) } },
            { id: 9, difficulty: 'hard', question: say('Definizioaren bidez, kalkulatu $s(t)=30t-5t^2$ mugimenduaren abiadura $t=2$ unean, m/s-tan.', 'Con la definición, halla la velocidad en $t=2$ del movimiento $s(t)=30t-5t^2$, en m/s.', 'بالتعريف، أوجد سرعة الحركة $s(t)=30t-5t^2$ عند $t=2$ بالمتر في الثانية.', 'From the definition, find the speed at $t=2$ of the motion $s(t)=30t-5t^2$, in m/s.'), solution: same('$\\frac{s(2+h)-s(2)}{h}=10-5h\\ \\to\\ 10$'), answer: { expected: n(10) } },
            { id: 10, difficulty: 'hard', question: say('$f(x)=x^2$ funtzioaren zuzen ukitzaileak $x=a$ puntuan 8 malda du. Aurkitu $a$ eta zuzen ukitzailea.', 'La tangente a $f(x)=x^2$ en $x=a$ tiene pendiente 8. Halla $a$ y la tangente.', 'مماس $f(x)=x^2$ عند $x=a$ ميله 8. أوجد $a$ والمماس.', 'The tangent to $f(x)=x^2$ at $x=a$ has slope 8. Find $a$ and the tangent.'), solution: same('$2a=8\\ \\to\\ a=4\\qquad y=8x-16$'), answer: { expected: n(4) } }
        ]
    },
    {
        id: 'derivability',
        title: say('Deribagarritasuna', 'Derivabilidad', 'قابلية الاشتقاق', 'Differentiability'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Deribagarria al da $f(x)=|x|$ funtzioa $x=0$ puntuan?', '¿Es derivable $f(x)=|x|$ en $x=0$?', 'هل $f(x)=|x|$ قابلة للاشتقاق عند $x=0$؟', 'Is $f(x)=|x|$ differentiable at $x=0$?'), solution: say('Ez: $f\'(0^-)=-1$ eta $f\'(0^+)=1$; punta bat dago.', 'No: $f\'(0^-)=-1$ y $f\'(0^+)=1$; hay un pico.', 'لا: $f\'(0^-)=-1$ و$f\'(0^+)=1$؛ توجد زاوية.', 'No: $f\'(0^-)=-1$ and $f\'(0^+)=1$; there is a corner.') },
            { id: 12, difficulty: 'easy', question: say('Kalkulatu $f(x)=|x+3|$ funtzioaren alboko deribatuak $x=-3$ puntuan.', 'Calcula las derivadas laterales de $f(x)=|x+3|$ en $x=-3$.', 'احسب المشتقتين الجانبيتين لـ $f(x)=|x+3|$ عند $x=-3$.', 'Work out the one-sided derivatives of $f(x)=|x+3|$ at $x=-3$.'), solution: say('$-1$ ezkerretik eta 1 eskuinetik.', '$-1$ por la izquierda y 1 por la derecha.', '$-1$ من اليسار و1 من اليمين.', '$-1$ from the left and 1 from the right.') },
            { id: 13, difficulty: 'easy', question: say('Funtzio batek jauzi bat du $x=2$ puntuan. Deribagarria izan daiteke han?', 'Una función tiene un salto en $x=2$. ¿Puede ser derivable ahí?', 'لدالة قفزة عند $x=2$. هل يمكن أن تكون قابلة للاشتقاق هناك؟', 'A function has a jump at $x=2$. Can it be differentiable there?'), solution: say('Ez: jarraitua ez bada, ez da deribagarria.', 'No: si no es continua, no es derivable.', 'لا: إذا لم تكن متصلة فليست قابلة للاشتقاق.', 'No: if it is not continuous, it is not differentiable.') },
            { id: 14, difficulty: 'medium', question: say('Deribagarria al da funtzio hau $x=1$ puntuan? $f(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}$', '¿Es derivable en $x=1$ esta función? $f(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}$', 'هل هذه الدالة قابلة للاشتقاق عند $x=1$؟ $f(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}$', 'Is this function differentiable at $x=1$? $f(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}$'), solution: say('Bai: $1=2-1$, eta maldak $2\\cdot 1=2$ eta 2 dira.', 'Sí: $1=2-1$, y las pendientes son $2\\cdot 1=2$ y 2.', 'نعم: $1=2-1$، والميلان $2\\cdot 1=2$ و2.', 'Yes: $1=2-1$, and the slopes are $2\\cdot 1=2$ and 2.') },
            { id: 15, difficulty: 'medium', question: say('Deribagarria al da funtzio hau $x=2$ puntuan? $f(x)=\\begin{cases}x^2 & x<2\\\\ x+2 & x\\ge 2\\end{cases}$', '¿Es derivable en $x=2$ esta función? $f(x)=\\begin{cases}x^2 & x<2\\\\ x+2 & x\\ge 2\\end{cases}$', 'هل هذه الدالة قابلة للاشتقاق عند $x=2$؟ $f(x)=\\begin{cases}x^2 & x<2\\\\ x+2 & x\\ge 2\\end{cases}$', 'Is this function differentiable at $x=2$? $f(x)=\\begin{cases}x^2 & x<2\\\\ x+2 & x\\ge 2\\end{cases}$'), solution: say('Jarraitua da, $4=2+2$, baina maldak 4 eta 1 dira: punta bat dago.', 'Es continua, $4=2+2$, pero las pendientes son 4 y 1: hay un pico.', 'متصلة، $4=2+2$، لكن الميلين 4 و1: توجد زاوية.', 'It is continuous, $4=2+2$, but the slopes are 4 and 1: there is a corner.') },
            { id: 16, difficulty: 'medium', question: say('Aurkitu $k$, funtzio hau $x=3$ puntuan jarraitua izan dadin: $f(x)=\\begin{cases}2x+k & x<3\\\\ x^2 & x\\ge 3\\end{cases}$', 'Halla $k$ para que esta función sea continua en $x=3$: $f(x)=\\begin{cases}2x+k & x<3\\\\ x^2 & x\\ge 3\\end{cases}$', 'أوجد $k$ كي تكون هذه الدالة متصلة عند $x=3$: $f(x)=\\begin{cases}2x+k & x<3\\\\ x^2 & x\\ge 3\\end{cases}$', 'Find $k$ so that this function is continuous at $x=3$: $f(x)=\\begin{cases}2x+k & x<3\\\\ x^2 & x\\ge 3\\end{cases}$'), solution: say('$6+k=9$, beraz $k=3$. Jarraitua da, baina ez deribagarria: maldak 2 eta 6.', '$6+k=9$, así que $k=3$. Es continua, pero no derivable: pendientes 2 y 6.', '$6+k=9$، إذن $k=3$. متصلة لكنها غير قابلة للاشتقاق: الميلان 2 و6.', '$6+k=9$, so $k=3$. It is continuous, but not differentiable: slopes 2 and 6.'), answer: { expected: n(3) } },
            { id: 17, difficulty: 'medium', question: say('Zein puntutan ez da deribagarria $f(x)=|2x-6|$?', '¿En qué punto no es derivable $f(x)=|2x-6|$?', 'عند أي نقطة لا تكون $f(x)=|2x-6|$ قابلة للاشتقاق؟', 'At which point is $f(x)=|2x-6|$ not differentiable?'), solution: say('$x=3$ puntuan, $2x-6=0$ denean: maldak $-2$ eta 2.', 'En $x=3$, donde $2x-6=0$: pendientes $-2$ y 2.', 'عند $x=3$ حيث $2x-6=0$: الميلان $-2$ و2.', 'At $x=3$, where $2x-6=0$: slopes $-2$ and 2.'), answer: { expected: n(3) } },
            { id: 18, difficulty: 'hard', question: say('Aurkitu $a$ eta $b$, funtzio hau $x=2$ puntuan deribagarria izan dadin: $f(x)=\\begin{cases}ax^2 & x<2\\\\ 8x+b & x\\ge 2\\end{cases}$', 'Halla $a$ y $b$ para que esta función sea derivable en $x=2$: $f(x)=\\begin{cases}ax^2 & x<2\\\\ 8x+b & x\\ge 2\\end{cases}$', 'أوجد $a$ و$b$ كي تكون هذه الدالة قابلة للاشتقاق عند $x=2$: $f(x)=\\begin{cases}ax^2 & x<2\\\\ 8x+b & x\\ge 2\\end{cases}$', 'Find $a$ and $b$ so that this function is differentiable at $x=2$: $f(x)=\\begin{cases}ax^2 & x<2\\\\ 8x+b & x\\ge 2\\end{cases}$'), solution: same('$4a=8\\ \\to\\ a=2\\qquad 8=16+b\\ \\to\\ b=-8$') },
            { id: 19, difficulty: 'hard', question: say('Aurkitu $m$ eta $n$, funtzio hau $x=0$ puntuan deribagarria izan dadin: $f(x)=\\begin{cases}x^3+x & x<0\\\\ mx+n & x\\ge 0\\end{cases}$', 'Halla $m$ y $n$ para que esta función sea derivable en $x=0$: $f(x)=\\begin{cases}x^3+x & x<0\\\\ mx+n & x\\ge 0\\end{cases}$', 'أوجد $m$ و$n$ كي تكون هذه الدالة قابلة للاشتقاق عند $x=0$: $f(x)=\\begin{cases}x^3+x & x<0\\\\ mx+n & x\\ge 0\\end{cases}$', 'Find $m$ and $n$ so that this function is differentiable at $x=0$: $f(x)=\\begin{cases}x^3+x & x<0\\\\ mx+n & x\\ge 0\\end{cases}$'), solution: say('$n=0$ eta $m=1$: zuzena $y=x$ zuzen ukitzailea da.', '$n=0$ y $m=1$: la recta es la tangente $y=x$.', '$n=0$ و$m=1$: المستقيم هو المماس $y=x$.', '$n=0$ and $m=1$: the line is the tangent $y=x$.') },
            { id: 20, difficulty: 'hard', question: say('Deribagarria al da $f(x)=x|x|$ funtzioa $x=0$ puntuan?', '¿Es derivable $f(x)=x|x|$ en $x=0$?', 'هل $f(x)=x|x|$ قابلة للاشتقاق عند $x=0$؟', 'Is $f(x)=x|x|$ differentiable at $x=0$?'), solution: say('Bai: ezkerrean $-x^2$ da eta eskuinean $x^2$, eta bi maldak 0 dira 0 puntuan.', 'Sí: es $-x^2$ a la izquierda y $x^2$ a la derecha, y las dos pendientes en 0 valen 0.', 'نعم: هي $-x^2$ إلى اليسار و$x^2$ إلى اليمين، والميلان عند 0 يساويان 0.', 'Yes: it is $-x^2$ on the left and $x^2$ on the right, and both slopes at 0 are 0.') }
        ]
    },
    {
        id: 'function',
        title: say('Funtzio deribatua', 'La función derivada', 'الدالة المشتقة', 'The derivative function'),
        items: [
            { id: 21, difficulty: 'easy', question: derive('f(x)=x^7'), solution: same('$f\'(x)=7x^6$') },
            { id: 22, difficulty: 'easy', question: derive('f(x)=5x^3-2x+4'), solution: same('$f\'(x)=15x^2-2$') },
            { id: 23, difficulty: 'easy', question: at('x^4', 2), solution: same('$f\'(2)=4\\cdot 2^{3}=32$'), answer: { expected: n(32) } },
            { id: 24, difficulty: 'medium', question: derive('f(x)=\\sqrt[3]{x}'), solution: same('$f\'(x)=\\frac{1}{3}x^{-\\frac{2}{3}}=\\frac{1}{3\\sqrt[3]{x^2}}$') },
            { id: 25, difficulty: 'medium', question: derive('f(x)=\\frac{3}{x^2}'), solution: same('$3x^{-2}\\ \\to\\ -6x^{-3}=-\\frac{6}{x^3}$') },
            { id: 26, difficulty: 'medium', question: at('\\sqrt{x}', 25), solution: same('$f\'(25)=\\frac{1}{2\\sqrt{25}}=\\frac{1}{10}$'), answer: { expected: f(1, 10) } },
            { id: 27, difficulty: 'medium', question: say('Kalkulatu $f\'(x)$ definizioaren bidez, $f(x)=4x^2$ bada.', 'Halla $f\'(x)$ con la definición para $f(x)=4x^2$.', 'أوجد $f\'(x)$ بالتعريف للدالة $f(x)=4x^2$.', 'Find $f\'(x)$ from the definition for $f(x)=4x^2$.'), solution: same('$\\frac{8xh+4h^2}{h}=8x+4h\\ \\to\\ 8x$') },
            { id: 28, difficulty: 'medium', question: say('Deribatu $f(x)=x^2\\sqrt{x}$, berretura bakar gisa idatzita.', 'Deriva $f(x)=x^2\\sqrt{x}$ escribiéndola como una sola potencia.', 'اشتق $f(x)=x^2\\sqrt{x}$ بكتابتها قوة واحدة.', 'Differentiate $f(x)=x^2\\sqrt{x}$ by writing it as a single power.'), solution: same('$x^{\\frac{5}{2}}\\ \\to\\ \\frac{5}{2}x^{\\frac{3}{2}}$') },
            { id: 29, difficulty: 'hard', question: say('Kalkulatu $f\'(1)$, $f(x)=\\frac{x^3+2x}{x}$ bada, lehenik sinplifikatuta.', 'Halla $f\'(1)$ para $f(x)=\\frac{x^3+2x}{x}$, simplificando antes.', 'أوجد $f\'(1)$ للدالة $f(x)=\\frac{x^3+2x}{x}$ بعد التبسيط.', 'Find $f\'(1)$ for $f(x)=\\frac{x^3+2x}{x}$, simplifying first.'), solution: same('$x^2+2\\ \\to\\ 2x\\ \\to\\ f\'(1)=2$'), answer: { expected: n(2) } },
            { id: 30, difficulty: 'hard', question: say('$f(x)=ax^2+bx$ funtzioak $f\'(0)=3$ eta $f\'(1)=7$ betetzen ditu. Aurkitu $a$.', '$f(x)=ax^2+bx$ cumple $f\'(0)=3$ y $f\'(1)=7$. Halla $a$.', 'تحقق $f(x)=ax^2+bx$ الشرطين $f\'(0)=3$ و$f\'(1)=7$. أوجد $a$.', '$f(x)=ax^2+bx$ satisfies $f\'(0)=3$ and $f\'(1)=7$. Find $a$.'), solution: same('$b=3\\qquad 2a+3=7\\ \\to\\ a=2$'), answer: { expected: n(2) } }
        ]
    },
    {
        id: 'rules',
        title: say('Deribazio-erregelak', 'Reglas de derivación', 'قواعد الاشتقاق', 'Rules of differentiation'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Deribatu $f(x)=x(x+5)$, biderkaduraren erregelarekin.', 'Deriva $f(x)=x(x+5)$ con la regla del producto.', 'اشتق $f(x)=x(x+5)$ بقاعدة الجداء.', 'Differentiate $f(x)=x(x+5)$ with the product rule.'), solution: same('$f\'(x)=1\\cdot(x+5)+x\\cdot 1=2x+5$') },
            { id: 32, difficulty: 'easy', question: derive('f(x)=\\frac{1}{x+2}'), solution: same('$f\'(x)=-\\frac{1}{(x+2)^2}$') },
            { id: 33, difficulty: 'easy', question: derive('f(x)=(x+4)^3'), solution: same('$f\'(x)=3(x+4)^2$') },
            { id: 34, difficulty: 'medium', question: derive('f(x)=(2x+1)(x^2-3)'), solution: same('$f\'(x)=2(x^2-3)+(2x+1)\\cdot 2x=6x^2+2x-6$') },
            { id: 35, difficulty: 'medium', question: derive('f(x)=\\frac{x-2}{x+3}'), solution: same('$f\'(x)=\\frac{(x+3)-(x-2)}{(x+3)^2}=\\frac{5}{(x+3)^2}$') },
            { id: 36, difficulty: 'medium', question: derive('f(x)=\\sqrt{x^2+5}'), solution: same('$f\'(x)=\\frac{2x}{2\\sqrt{x^2+5}}=\\frac{x}{\\sqrt{x^2+5}}$') },
            { id: 37, difficulty: 'medium', question: at('(x^2-3)^4', 2), solution: same('$f\'(2)=4\\cdot 1^{3}\\cdot 4=16$'), answer: { expected: n(16) } },
            { id: 38, difficulty: 'medium', question: at('\\frac{3x}{x^2+1}', 0), solution: same('$f\'(0)=\\frac{3\\cdot 1-0}{1}=3$'), answer: { expected: n(3) } },
            { id: 39, difficulty: 'hard', question: derive('f(x)=\\frac{(x+1)^2}{x}'), solution: same('$f\'(x)=\\frac{2(x+1)x-(x+1)^2}{x^2}=\\frac{x^2-1}{x^2}$') },
            { id: 40, difficulty: 'hard', question: at('x\\sqrt{2x+1}', 4), solution: same('$f\'(4)=\\sqrt{9}+\\frac{4}{3}=\\frac{13}{3}$'), answer: { expected: f(13, 3) } }
        ]
    },
    {
        id: 'elementary',
        title: say('Funtzio elementalak', 'Funciones elementales', 'الدوال الأساسية', 'Elementary functions'),
        items: [
            { id: 41, difficulty: 'easy', question: derive('f(x)=e^{4x}'), solution: same('$f\'(x)=4e^{4x}$') },
            { id: 42, difficulty: 'easy', question: derive('f(x)=\\ln(7x)'), solution: same('$f\'(x)=\\frac{7}{7x}=\\frac{1}{x}$') },
            { id: 43, difficulty: 'easy', question: derive('f(x)=\\cos(4x)'), solution: same('$f\'(x)=-4\\sin(4x)$') },
            { id: 44, difficulty: 'medium', question: derive('f(x)=2^x'), solution: same('$f\'(x)=2^x\\ln 2$') },
            { id: 45, difficulty: 'medium', question: derive('f(x)=x^2e^x'), solution: same('$f\'(x)=2xe^x+x^2e^x=(x^2+2x)e^x$') },
            { id: 46, difficulty: 'medium', question: derive('f(x)=\\tan(3x)'), solution: same('$f\'(x)=3\\left(1+\\tan^2(3x)\\right)$') },
            { id: 47, difficulty: 'medium', question: at('\\ln(x^2+x)', 1), solution: same('$f\'(x)=\\frac{2x+1}{x^2+x}\\ \\to\\ f\'(1)=\\frac{3}{2}$'), answer: { expected: f(3, 2) } },
            { id: 48, difficulty: 'medium', question: derive('f(x)=\\arcsin(x^2)'), solution: same('$f\'(x)=\\frac{2x}{\\sqrt{1-x^4}}$') },
            { id: 49, difficulty: 'hard', question: say('Idatzi $f(x)=e^x$ funtzioaren zuzen ukitzailea $x=0$ puntuan.', 'Halla la tangente a $f(x)=e^x$ en $x=0$.', 'أوجد مماس $f(x)=e^x$ عند $x=0$.', 'Find the tangent to $f(x)=e^x$ at $x=0$.'), solution: same('$f(0)=1\\qquad f\'(0)=1\\ \\to\\ y=x+1$') },
            { id: 50, difficulty: 'hard', question: say('Zer $x>0$ baliotan da $f(x)=x^3-3x$ funtzioaren zuzen ukitzailea $y=9x$ zuzenaren paraleloa?', '¿En qué $x>0$ la tangente a $f(x)=x^3-3x$ es paralela a $y=9x$?', 'عند أي $x>0$ يكون مماس $f(x)=x^3-3x$ موازيًا لـ $y=9x$؟', 'At which $x>0$ is the tangent to $f(x)=x^3-3x$ parallel to $y=9x$?'), solution: same('$3x^2-3=9\\ \\to\\ x^2=4\\ \\to\\ x=2$'), answer: { expected: n(2) } }
        ]
    }
]

import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Zientziak — diagnostic, guided practice,
   exercise bank and challenges, with the scope of unit 8 of Santillana
   2.º Bachillerato Ciencias and unit 8 of Anaya Matemáticas II (all the
   exercises and numbers are our own; the parameters for derivability and
   the coefficients from a tangent follow the style of the Basque EBAU).
   Every closed answer is a single number: a slope or a derivative at a
   point, a parameter (or a sum or product of two), how many corners or
   tangents there are, or the abscissa of a point.
   ========================================================================== */

const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

/** «f(x) = …. What is …?» */
const valueAt = (fn: string, ask: string) => say(`$${fn}$. Zenbat da $${ask}$?`, `$${fn}$. ¿Cuánto vale $${ask}$?`, `$${fn}$. كم تساوي $${ask}$؟`, `$${fn}$. What is $${ask}$?`)
/** «The function is differentiable at x = …: …. Work out …» */
const derivableAt = (ask: LocalizedText, formula: string, point: string) => say(`Funtzio hau deribagarria da $x=${point}$ puntuan: $${formula}$ ${ask.eu}`, `Esta función es derivable en $x=${point}$: $${formula}$ ${ask.es}`, `هذه الدالة قابلة للاشتقاق عند $x=${point}$: $${formula}$ ${ask.ar}`, `This function is differentiable at $x=${point}$: $${formula}$ ${ask.en}`)
const howMuch = (letter: string) => say(`Zenbat da $${letter}$?`, `¿Cuánto vale $${letter}$?`, `كم تساوي $${letter}$؟`, `What is $${letter}$?`)
const workOut = (expression: string) => say(`Kalkulatu $${expression}$.`, `Calcula $${expression}$.`, `احسب $${expression}$.`, `Work out $${expression}$.`)
/** «On the curve …, what is y′ at the point …?» */
const implicitSlope = (curve: string, point: string) => say(`$${curve}$ kurban, zenbat da $y'$ deribatua $${point}$ puntuan?`, `En la curva $${curve}$, ¿cuánto vale $y'$ en el punto $${point}$?`, `على المنحنى $${curve}$، كم تساوي $y'$ عند النقطة $${point}$؟`, `On the curve $${curve}$, what is $y'$ at the point $${point}$?`)
/** «f(x) = … has an inverse and f(a) = b. What is (f⁻¹)′(b)?» */
const inverseSlope = (fn: string, a: string, b: string) => say(`$f(x)=${fn}$ funtzioak alderantzizkoa du, eta $f(${a})=${b}$. Zenbat da $(f^{-1})'(${b})$?`, `$f(x)=${fn}$ tiene inversa y $f(${a})=${b}$. ¿Cuánto vale $(f^{-1})'(${b})$?`, `للدالة $f(x)=${fn}$ دالة عكسية و$f(${a})=${b}$. كم تساوي $(f^{-1})'(${b})$؟`, `$f(x)=${fn}$ has an inverse and $f(${a})=${b}$. What is $(f^{-1})'(${b})$?`)
const corners = (fn: string) => say(`Zenbat puntutan ez da deribagarria $f(x)=${fn}$?`, `¿En cuántos puntos no es derivable $f(x)=${fn}$?`, `في كم نقطة تكون $f(x)=${fn}$ غير قابلة للاشتقاق؟`, `At how many points is $f(x)=${fn}$ not differentiable?`)

export const bach2DerivativesDiagnostic: DiagnosticQuestion[] = [
    {
        id: 123001,
        prompt: say('Zein da $f(x)=x^2$ funtzioaren zuzen ukitzailearen malda $x=3$ puntuan?', '¿Cuál es la pendiente de la tangente a $f(x)=x^2$ en $x=3$?', 'ما ميل مماس $f(x)=x^2$ عند $x=3$؟', 'What is the slope of the tangent to $f(x)=x^2$ at $x=3$?'),
        options: [same('$6$'), same('$9$'), same('$3$')],
        correctIndex: 0,
        explanation: same('$f\'(x)=2x\\ \\to\\ f\'(3)=6$'),
        topic: 'review-tangent'
    },
    {
        id: 123002,
        prompt: say('Zein da $f(x)=e^{2x}$ funtzioaren deribatua?', '¿Cuál es la derivada de $f(x)=e^{2x}$?', 'ما مشتقة $f(x)=e^{2x}$؟', 'What is the derivative of $f(x)=e^{2x}$?'),
        options: [same('$e^{2x}$'), same('$2e^{2x}$'), same('$2x\\,e^{2x-1}$')],
        correctIndex: 1,
        explanation: say('Katea: $e^{2x}$ bider barrukoaren deribatua, 2.', 'Cadena: $e^{2x}$ por la derivada de dentro, 2.', 'السلسلة: $e^{2x}$ في مشتقة الداخلية 2.', 'Chain: $e^{2x}$ times the derivative of the inside, 2.'),
        topic: 'review-rules'
    },
    {
        id: 123003,
        prompt: say('Nolakoa da $f(x)=|x|$ funtzioa $x=0$ puntuan?', '¿Cómo es $f(x)=|x|$ en $x=0$?', 'كيف تكون $f(x)=|x|$ عند $x=0$؟', 'What is $f(x)=|x|$ like at $x=0$?'),
        options: [say('Jarraitua eta deribagarria', 'Continua y derivable', 'متصلة وقابلة للاشتقاق', 'Continuous and differentiable'), say('Ez da jarraitua', 'No es continua', 'ليست متصلة', 'Not continuous'), say('Jarraitua, baina ez deribagarria', 'Continua, pero no derivable', 'متصلة لكنها غير قابلة للاشتقاق', 'Continuous, but not differentiable')],
        correctIndex: 2,
        explanation: say('Ez du jauzirik, baina maldak $-1$ eta 1 dira: punta bat.', 'No salta, pero las pendientes son $-1$ y 1: un pico.', 'لا تقفز، لكن الميلين $-1$ و1: زاوية.', 'It does not jump, but the slopes are $-1$ and 1: a corner.'),
        topic: 'corners'
    },
    {
        id: 123004,
        prompt: say('$f(x)=\\begin{cases}x+k & x<1\\\\ 2x & x\\ge 1\\end{cases}$ jarraitua da 1 puntuan. Zenbat da $k$?', '$f(x)=\\begin{cases}x+k & x<1\\\\ 2x & x\\ge 1\\end{cases}$ es continua en 1. ¿Cuánto vale $k$?', '$f(x)=\\begin{cases}x+k & x<1\\\\ 2x & x\\ge 1\\end{cases}$ متصلة عند 1. كم تساوي $k$؟', '$f(x)=\\begin{cases}x+k & x<1\\\\ 2x & x\\ge 1\\end{cases}$ is continuous at 1. What is $k$?'),
        options: [same('$1$'), same('$2$'), same('$0$')],
        correctIndex: 0,
        explanation: same('$1+k=2\\ \\to\\ k=1$'),
        topic: 'parameters'
    },
    {
        id: 123005,
        prompt: say('Zein da $(x^2+1)^3$ adierazpenaren deribatua?', '¿Cuál es la derivada de $(x^2+1)^3$?', 'ما مشتقة $(x^2+1)^3$؟', 'What is the derivative of $(x^2+1)^3$?'),
        options: [same('$3(x^2+1)^2$'), same('$6x(x^2+1)^2$'), same('$3(2x)^2$')],
        correctIndex: 1,
        explanation: same('$3(x^2+1)^2\\cdot 2x=6x(x^2+1)^2$'),
        topic: 'three-layers'
    },
    {
        id: 123006,
        prompt: say('Zein da $\\sqrt{x}$ funtzioaren deribatua?', '¿Cuál es la derivada de $\\sqrt{x}$?', 'ما مشتقة $\\sqrt{x}$؟', 'What is the derivative of $\\sqrt{x}$?'),
        options: [same('$\\frac{1}{\\sqrt{x}}$'), same('$2\\sqrt{x}$'), same('$\\frac{1}{2\\sqrt{x}}$')],
        correctIndex: 2,
        explanation: same('$\\left(x^{\\frac{1}{2}}\\right)\'=\\frac{1}{2}x^{-\\frac{1}{2}}=\\frac{1}{2\\sqrt{x}}$'),
        topic: 'composite-table'
    },
    {
        id: 123007,
        prompt: say('Zein da $f(x)=2x+1$ funtzioaren alderantzizkoa?', '¿Cuál es la inversa de $f(x)=2x+1$?', 'ما الدالة العكسية للدالة $f(x)=2x+1$؟', 'What is the inverse of $f(x)=2x+1$?'),
        options: [same('$2x-1$'), same('$\\frac{x-1}{2}$'), same('$\\frac{1}{2x+1}$')],
        correctIndex: 1,
        explanation: say('Askatu $x$: $y=2x+1\\ \\to\\ x=\\frac{y-1}{2}$.', 'Despeja $x$: $y=2x+1\\ \\to\\ x=\\frac{y-1}{2}$.', 'استخرج $x$: $y=2x+1\\ \\to\\ x=\\frac{y-1}{2}$.', 'Solve for $x$: $y=2x+1\\ \\to\\ x=\\frac{y-1}{2}$.'),
        topic: 'inverse'
    },
    {
        id: 123008,
        prompt: say('$y=2x-1$ zuzena $(2,3)$ puntutik igarotzen al da?', '¿Pasa la recta $y=2x-1$ por el punto $(2,3)$?', 'هل يمر المستقيم $y=2x-1$ بالنقطة $(2,3)$؟', 'Does the line $y=2x-1$ pass through the point $(2,3)$?'),
        options: [say('Ez', 'No', 'لا', 'No'), say('Bai', 'Sí', 'نعم', 'Yes'), say('Ezin da jakin', 'No se puede saber', 'لا يمكن معرفة ذلك', 'It cannot be known')],
        correctIndex: 1,
        explanation: same('$2\\cdot 2-1=3$'),
        topic: 'exterior-point'
    }
]

export const bach2DerivativesPractice: PracticeItem[] = [
    /* ---------- Review of 1.º ---------- */
    { id: 1, stage: 'review', prompt: valueAt('f(x)=x^3-4x', "f'(2)"), expected: n(8), hint: same('$f\'(x)=3x^2-4$'), explanation: same('$f\'(2)=3\\cdot 4-4=8$') },
    { id: 2, stage: 'review', prompt: say('$f(x)=x^2+1$ funtzioaren normalak $x=1$ puntuan $m$ malda du. Zenbat da $m$?', 'La normal a $f(x)=x^2+1$ en $x=1$ tiene pendiente $m$. ¿Cuánto vale $m$?', 'ميل العمودي على $f(x)=x^2+1$ عند $x=1$ هو $m$. كم تساوي $m$؟', 'The normal to $f(x)=x^2+1$ at $x=1$ has slope $m$. What is $m$?'), expected: f(-1, 2), hint: say('Lehenik $f\'(1)$.', 'Primero $f\'(1)$.', 'أولًا $f\'(1)$.', 'First $f\'(1)$.'), explanation: same('$f\'(1)=2\\ \\to\\ m=-\\frac{1}{2}$') },
    { id: 3, stage: 'review', prompt: valueAt('f(x)=\\frac{x}{x+1}', "f'(1)"), expected: f(1, 4), hint: say('Zatiduraren erregela.', 'Regla del cociente.', 'قاعدة خارج القسمة.', 'The quotient rule.'), explanation: same('$\\begin{gathered}f\'(x)=\\frac{(x+1)-x}{(x+1)^2}=\\frac{1}{(x+1)^2}\\\\ f\'(1)=\\frac{1}{4}\\end{gathered}$') },
    { id: 4, stage: 'review', prompt: valueAt('f(x)=(2x+1)^3', "f'(1)"), expected: n(54), hint: say('Katea: bider 2.', 'Cadena: por 2.', 'السلسلة: في 2.', 'Chain: times 2.'), explanation: same('$f\'(1)=3\\cdot 3^2\\cdot 2=54$') },

    /* ---------- Differentiability ---------- */
    { id: 5, stage: 'derivability', prompt: valueAt('f(x)=|x-3|+x', "f'(3^+)"), expected: n(2), hint: say('Eskuinean, $|x-3|=x-3$.', 'A la derecha, $|x-3|=x-3$.', 'على اليمين $|x-3|=x-3$.', 'On the right, $|x-3|=x-3$.'), explanation: same('$f(x)=2x-3\\ \\to\\ f\'(3^+)=2$') },
    { id: 6, stage: 'derivability', prompt: derivableAt(howMuch('k'), 'f(x)=\\begin{cases}x^2+k & x<1\\\\ 2x & x\\ge 1\\end{cases}', '1'), expected: n(1), hint: say('Maldak berdinak dira beti; begiratu jarraitutasuna.', 'Las pendientes ya coinciden; mira la continuidad.', 'الميلان متساويان دائمًا؛ انظر إلى الاتصال.', 'The slopes already match; look at continuity.'), explanation: same('$\\begin{gathered}2\\cdot 1=2\\\\ 1+k=2\\ \\to\\ k=1\\end{gathered}$') },
    { id: 7, stage: 'derivability', prompt: derivableAt(howMuch('b'), 'f(x)=\\begin{cases}ax^2+b & x<1\\\\ \\ln x+2 & x\\ge 1\\end{cases}', '1'), expected: f(3, 2), hint: say('Maldak: $2a=1$.', 'Pendientes: $2a=1$.', 'الميلان: $2a=1$.', 'Slopes: $2a=1$.'), explanation: same('$\\begin{gathered}2a=1\\ \\to\\ a=\\frac{1}{2}\\\\ a+b=2\\ \\to\\ b=\\frac{3}{2}\\end{gathered}$') },
    { id: 8, stage: 'derivability', prompt: corners('|x^2-x|'), expected: n(2), hint: say('Non da zero $x^2-x$?', '¿Dónde se anula $x^2-x$?', 'أين تنعدم $x^2-x$؟', 'Where is $x^2-x$ zero?'), explanation: say('$x=0$ eta $x=1$ puntuetan, $-1$ eta 1 maldekin: 2 punta.', 'En $x=0$ y $x=1$, con pendientes $-1$ y 1: 2 picos.', 'عند $x=0$ و$x=1$ بميلين $-1$ و1: زاويتان، أي 2.', 'At $x=0$ and $x=1$, with slopes $-1$ and 1: 2 corners.') },

    /* ---------- The chain rule in depth ---------- */
    { id: 9, stage: 'chain', prompt: valueAt('f(x)=e^{\\sin(2x)}', "f'(0)"), expected: n(2), hint: say('Hiru faktore.', 'Tres factores.', 'ثلاثة عوامل.', 'Three factors.'), explanation: same('$f\'(0)=e^{0}\\cdot\\cos 0\\cdot 2=2$') },
    { id: 10, stage: 'chain', prompt: valueAt('f(x)=\\ln(x^2+3)', "f'(1)"), expected: f(1, 2), hint: same('$(\\ln u)\'=\\frac{u\'}{u}$'), explanation: same('$f\'(1)=\\frac{2\\cdot 1}{1+3}=\\frac{1}{2}$') },
    { id: 11, stage: 'chain', prompt: valueAt('f(x)=\\arctan(3x)', "f'(0)"), expected: n(3), hint: same('$(\\arctan u)\'=\\frac{u\'}{1+u^2}$'), explanation: same('$f\'(0)=\\frac{3}{1+0}=3$') },
    { id: 12, stage: 'chain', prompt: valueAt('f(x)=e^{-x}', 'f^{(5)}(0)'), expected: n(-1), hint: say('Deribatu bakoitzak $-1$ biderkatzen du.', 'Cada derivada multiplica por $-1$.', 'كل مشتقة تضرب في $-1$.', 'Each derivative multiplies by $-1$.'), explanation: same('$f^{(5)}(x)=(-1)^5e^{-x}\\ \\to\\ -1$') },

    /* ---------- Special derivatives ---------- */
    { id: 13, stage: 'special', prompt: inverseSlope('x^3+3x', '1', '4'), expected: f(1, 6), hint: same('$(f^{-1})\'(4)=\\frac{1}{f\'(1)}$'), explanation: same('$f\'(1)=3+3=6\\ \\to\\ \\frac{1}{6}$') },
    { id: 14, stage: 'special', prompt: implicitSlope('x^2+y^2=13', '(2,3)'), expected: f(-2, 3), hint: same('$2x+2y\\,y\'=0$'), explanation: same('$y\'=-\\frac{x}{y}=-\\frac{2}{3}$') },
    { id: 15, stage: 'special', prompt: implicitSlope('xy=6', '(2,3)'), expected: f(-3, 2), hint: say('Biderkadura: $y+x\\,y\'=0$.', 'Producto: $y+x\\,y\'=0$.', 'جداء: $y+x\\,y\'=0$.', 'Product: $y+x\\,y\'=0$.'), explanation: same('$y\'=-\\frac{y}{x}=-\\frac{3}{2}$') },
    { id: 16, stage: 'special', prompt: valueAt('f(x)=x^x', "f'(1)"), expected: n(1), hint: same('$f\'(x)=x^x(\\ln x+1)$'), explanation: same('$f\'(1)=1\\cdot(0+1)=1$') },

    /* ---------- Tangent problems ---------- */
    { id: 17, stage: 'tangents', prompt: say('$f(x)=x^2+bx$ funtzioaren zuzen ukitzaileak 7 malda du $x=2$ puntuan. Zenbat da $b$?', 'La tangente a $f(x)=x^2+bx$ en $x=2$ tiene pendiente 7. ¿Cuánto vale $b$?', 'ميل مماس $f(x)=x^2+bx$ عند $x=2$ يساوي 7. كم تساوي $b$؟', 'The tangent to $f(x)=x^2+bx$ at $x=2$ has slope 7. What is $b$?'), expected: n(3), hint: same('$f\'(2)=4+b$'), explanation: same('$4+b=7\\ \\to\\ b=3$') },
    { id: 18, stage: 'tangents', prompt: say('$f(x)=ax^2+bx$ funtzioaren zuzen ukitzailea $x=1$ puntuan $y=4x-1$ da. Zenbat da $a$?', 'La tangente a $f(x)=ax^2+bx$ en $x=1$ es $y=4x-1$. ¿Cuánto vale $a$?', 'مماس $f(x)=ax^2+bx$ عند $x=1$ هو $y=4x-1$. كم تساوي $a$؟', 'The tangent to $f(x)=ax^2+bx$ at $x=1$ is $y=4x-1$. What is $a$?'), expected: n(1), hint: say('$f(1)=3$ eta $f\'(1)=4$.', '$f(1)=3$ y $f\'(1)=4$.', '$f(1)=3$ و$f\'(1)=4$.', '$f(1)=3$ and $f\'(1)=4$.'), explanation: same('$\\begin{gathered}a+b=3\\qquad 2a+b=4\\\\ a=1\\end{gathered}$') },
    { id: 19, stage: 'tangents', prompt: say('$P(0,-4)$ puntutik $y=x^2$ parabolaren bi zuzen ukitzaile igarotzen dira. Zein da malda positiboa?', 'Por $P(0,-4)$ pasan dos tangentes a $y=x^2$. ¿Cuál es la pendiente positiva?', 'يمر بالنقطة $P(0,-4)$ مماسان للقطع $y=x^2$. ما الميل الموجب؟', 'Two tangents to $y=x^2$ pass through $P(0,-4)$. What is the positive slope?'), expected: n(4), hint: same('$y=2cx-c^2$'), explanation: same('$\\begin{gathered}-4=-c^2\\ \\to\\ c=\\pm 2\\\\ 2c=4\\end{gathered}$') },
    { id: 20, stage: 'tangents', prompt: say('Zein $k$ baliorako da $y=x+k$ zuzena $y=e^x$ kurbaren ukitzailea?', '¿Para qué $k$ es la recta $y=x+k$ tangente a $y=e^x$?', 'لأي قيمة $k$ يكون المستقيم $y=x+k$ مماسًّا للمنحنى $y=e^x$؟', 'For which $k$ is the line $y=x+k$ tangent to $y=e^x$?'), expected: n(1), hint: say('Malda bera: $e^c=1$.', 'Misma pendiente: $e^c=1$.', 'الميل نفسه: $e^c=1$.', 'Same slope: $e^c=1$.'), explanation: same('$\\begin{gathered}c=0\\\\ e^0=0+k\\ \\to\\ k=1\\end{gathered}$') }
]

export const bach2DerivativesChallenges: ChallengeItem[] = [
    { id: 101, stage: 'review', points: 10, context: 'starter', prompt: say('Zein da $f(x)=x^2-3x$ funtzioaren zuzen ukitzailearen jatorrizko ordenatua $x=2$ puntuan?', '¿Cuál es la ordenada en el origen de la tangente a $f(x)=x^2-3x$ en $x=2$?', 'ما الجزء المقطوع من محور الصادات لمماس $f(x)=x^2-3x$ عند $x=2$؟', 'What is the y-intercept of the tangent to $f(x)=x^2-3x$ at $x=2$?'), expected: n(-4), hint: say('$f(2)$ eta $f\'(2)$.', '$f(2)$ y $f\'(2)$.', '$f(2)$ و$f\'(2)$.', '$f(2)$ and $f\'(2)$.'), explanation: same('$\\begin{gathered}f(2)=-2\\qquad f\'(2)=1\\\\ y=x-4\\end{gathered}$') },
    { id: 102, stage: 'review', points: 20, context: 'advanced', prompt: valueAt('f(x)=\\frac{x^2}{x-1}', "f'(2)"), expected: n(0), hint: say('Zatiduraren erregela.', 'Regla del cociente.', 'قاعدة خارج القسمة.', 'The quotient rule.'), explanation: same('$\\begin{gathered}f\'(x)=\\frac{x^2-2x}{(x-1)^2}\\\\ f\'(2)=\\frac{4-4}{1}=0\\end{gathered}$') },
    { id: 103, stage: 'review', points: 30, context: 'master', prompt: say('$f(x)=\\sqrt{x}$ funtzioaren normalak $x=4$ puntuan $X$ ardatza ebakitzen du $x=k$ puntuan. Zenbat da $k$?', 'La normal a $f(x)=\\sqrt{x}$ en $x=4$ corta al eje $X$ en $x=k$. ¿Cuánto vale $k$?', 'يقطع العمودي على $f(x)=\\sqrt{x}$ عند $x=4$ محور السينات عند $x=k$. كم تساوي $k$؟', 'The normal to $f(x)=\\sqrt{x}$ at $x=4$ cuts the $x$-axis at $x=k$. What is $k$?'), expected: f(9, 2), hint: same('$f\'(4)=\\frac{1}{4}$'), explanation: same('$\\begin{gathered}y-2=-4(x-4)\\\\ y=0\\ \\to\\ x=4+\\frac{1}{2}=\\frac{9}{2}\\end{gathered}$') },
    { id: 104, stage: 'derivability', points: 10, context: 'starter', prompt: derivableAt(howMuch('k'), 'f(x)=\\begin{cases}x^2+kx & x<1\\\\ 3x-1 & x\\ge 1\\end{cases}', '1'), expected: n(1), hint: say('Berdindu balioak edo maldak.', 'Iguala los valores o las pendientes.', 'ساوِ القيم أو الميول.', 'Set the values or the slopes equal.'), explanation: same('$\\begin{gathered}1+k=2\\ \\to\\ k=1\\\\ 2+k=3\\end{gathered}$') },
    { id: 105, stage: 'derivability', points: 20, context: 'advanced', prompt: derivableAt(workOut('a+b'), 'f(x)=\\begin{cases}x^2+ax+b & x<0\\\\ e^{2x} & x\\ge 0\\end{cases}', '0'), expected: n(3), hint: say('$x=0$ puntuan: $b=e^0$ eta $a=2e^0$.', 'En $x=0$: $b=e^0$ y $a=2e^0$.', 'عند $x=0$: $b=e^0$ و$a=2e^0$.', 'At $x=0$: $b=e^0$ and $a=2e^0$.'), explanation: same('$\\begin{gathered}b=1\\qquad a=2\\\\ a+b=3\\end{gathered}$') },
    { id: 106, stage: 'derivability', points: 30, context: 'master', prompt: derivableAt(workOut('a\\cdot b'), 'f(x)=\\begin{cases}ax^3+b & x<1\\\\ \\frac{6}{x} & x\\ge 1\\end{cases}', '1'), expected: n(-16), hint: say('Maldak: $3a=-6$.', 'Pendientes: $3a=-6$.', 'الميلان: $3a=-6$.', 'Slopes: $3a=-6$.'), explanation: same('$\\begin{gathered}a=-2\\qquad a+b=6\\ \\to\\ b=8\\\\ -2\\cdot 8=-16\\end{gathered}$') },
    { id: 107, stage: 'chain', points: 10, context: 'starter', prompt: valueAt('f(x)=\\cos^2(x)', "f'\\left(\\frac{\\pi}{4}\\right)"), expected: n(-1), hint: same('$f\'(x)=-2\\cos x\\sin x$'), explanation: same('$-2\\cdot\\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{2}}{2}=-1$') },
    { id: 108, stage: 'chain', points: 20, context: 'advanced', prompt: valueAt('f(x)=\\arctan(e^x)', "f'(0)"), expected: f(1, 2), hint: same('$(\\arctan u)\'=\\frac{u\'}{1+u^2}$'), explanation: same('$f\'(0)=\\frac{e^0}{1+e^0}=\\frac{1}{2}$') },
    { id: 109, stage: 'chain', points: 30, context: 'master', prompt: valueAt('f(x)=\\frac{1}{1-x}', 'f^{(4)}(0)'), expected: n(24), hint: say('Kalkulatu lehen deribatuak eta bilatu patroia.', 'Calcula las primeras derivadas y busca el patrón.', 'احسب المشتقات الأولى وابحث عن النمط.', 'Work out the first derivatives and look for the pattern.'), explanation: same('$\\begin{gathered}f^{(n)}(x)=\\frac{n!}{(1-x)^{n+1}}\\\\ 4!=1\\cdot 2\\cdot 3\\cdot 4=24\\end{gathered}$') },
    { id: 110, stage: 'special', points: 10, context: 'starter', prompt: implicitSlope('x^2+4y^2=8', '(2,1)'), expected: f(-1, 2), hint: same('$2x+8y\\,y\'=0$'), explanation: same('$y\'=-\\frac{x}{4y}=-\\frac{2}{4}=-\\frac{1}{2}$') },
    { id: 111, stage: 'special', points: 20, context: 'advanced', prompt: inverseSlope('x^3+2x+1', '1', '4'), expected: f(1, 5), hint: same('$f\'(x)=3x^2+2$'), explanation: same('$f\'(1)=5\\ \\to\\ (f^{-1})\'(4)=\\frac{1}{5}$') },
    { id: 112, stage: 'special', points: 30, context: 'master', prompt: valueAt('f(x)=x^{\\ln x}', "f'(e)"), expected: n(2), hint: say('Logaritmoak: $\\ln f=(\\ln x)^2$.', 'Logaritmos: $\\ln f=(\\ln x)^2$.', 'اللوغاريتم: $\\ln f=(\\ln x)^2$.', 'Logarithms: $\\ln f=(\\ln x)^2$.'), explanation: same('$\\begin{gathered}\\frac{f\'}{f}=\\frac{2\\ln x}{x}\\\\ f\'(e)=e\\cdot\\frac{2}{e}=2\\end{gathered}$') },
    { id: 113, stage: 'tangents', points: 10, context: 'starter', prompt: say('$f(x)=x^3+ax$ funtzioaren zuzen ukitzailea $x=1$ puntuan $y=5x$ zuzenaren paraleloa da. Zenbat da $a$?', 'La tangente a $f(x)=x^3+ax$ en $x=1$ es paralela a $y=5x$. ¿Cuánto vale $a$?', 'مماس $f(x)=x^3+ax$ عند $x=1$ يوازي $y=5x$. كم تساوي $a$؟', 'The tangent to $f(x)=x^3+ax$ at $x=1$ is parallel to $y=5x$. What is $a$?'), expected: n(2), hint: same('$f\'(1)=3+a$'), explanation: same('$3+a=5\\ \\to\\ a=2$') },
    { id: 114, stage: 'tangents', points: 20, context: 'advanced', prompt: say('$f(x)=x^3$ funtzioaren zenbat zuzen ukitzaile igarotzen dira $(0,2)$ puntutik?', '¿Cuántas tangentes a $f(x)=x^3$ pasan por el punto $(0,2)$?', 'كم مماسًّا للدالة $f(x)=x^3$ يمر بالنقطة $(0,2)$؟', 'How many tangents to $f(x)=x^3$ pass through the point $(0,2)$?'), expected: n(1), hint: same('$y=3c^2x-2c^3$'), explanation: same('$\\begin{gathered}2=-2c^3\\ \\to\\ c=-1\\\\ y=3x+2\\end{gathered}$') },
    { id: 115, stage: 'tangents', points: 30, context: 'master', prompt: say('Aurkitu $a$, $y=ax^2$ parabola $y=4x-1$ zuzenaren ukitzailea izan dadin.', 'Halla $a$ para que la parábola $y=ax^2$ sea tangente a la recta $y=4x-1$.', 'أوجد $a$ ليكون القطع المكافئ $y=ax^2$ مماسًّا للمستقيم $y=4x-1$.', 'Find $a$ so that the parabola $y=ax^2$ is tangent to the line $y=4x-1$.'), expected: n(4), hint: same('$ac^2=4c-1\\qquad 2ac=4$'), explanation: same('$\\begin{gathered}ac=2\\ \\to\\ 2c=4c-1\\\\ c=\\frac{1}{2}\\ \\to\\ a=4\\end{gathered}$') }
]

export const bach2DerivativesExerciseBank: ExerciseSection[] = [
    {
        id: 'review',
        title: say('Batxilergoko 1. mailako errepasoa', 'Repaso de 1.º de Bachillerato', 'مراجعة السنة الأولى من البكالوريا', 'Review of 1st Bachillerato'),
        items: [
            { id: 1, difficulty: 'easy', question: valueAt('f(x)=3x^4-2x', "f'(1)"), solution: same('$f\'(x)=12x^3-2\\ \\to\\ 12-2=10$'), answer: { expected: n(10) } },
            { id: 2, difficulty: 'easy', question: say('Idatzi $f(x)=x^2$ funtzioaren zuzen ukitzailea $x=-1$ puntuan.', 'Escribe la tangente a $f(x)=x^2$ en $x=-1$.', 'اكتب مماس $f(x)=x^2$ عند $x=-1$.', 'Write the tangent to $f(x)=x^2$ at $x=-1$.'), solution: same('$\\begin{gathered}f(-1)=1\\qquad f\'(-1)=-2\\\\ y=-2x-1\\end{gathered}$') },
            { id: 3, difficulty: 'easy', question: valueAt('f(x)=\\frac{1}{x}', "f'(2)"), solution: same('$f\'(x)=-\\frac{1}{x^2}\\ \\to\\ -\\frac{1}{4}$'), answer: { expected: f(-1, 4) } },
            { id: 4, difficulty: 'medium', question: valueAt('f(x)=x\\ln x', "f'(e)"), solution: same('$f\'(x)=\\ln x+1\\ \\to\\ 1+1=2$'), answer: { expected: n(2) } },
            { id: 5, difficulty: 'medium', question: say('Idatzi $f(x)=x^3$ funtzioaren normala $x=1$ puntuan.', 'Escribe la normal a $f(x)=x^3$ en $x=1$.', 'اكتب العمودي على $f(x)=x^3$ عند $x=1$.', 'Write the normal to $f(x)=x^3$ at $x=1$.'), solution: same('$\\begin{gathered}f\'(1)=3\\ \\to\\ m=-\\frac{1}{3}\\\\ y-1=-\\frac{1}{3}(x-1)\\end{gathered}$') },
            { id: 6, difficulty: 'medium', question: valueAt('f(x)=\\frac{x+1}{x-1}', "f'(3)"), solution: same('$\\begin{gathered}f\'(x)=\\frac{-2}{(x-1)^2}\\\\ f\'(3)=\\frac{-2}{4}=-\\frac{1}{2}\\end{gathered}$'), answer: { expected: f(-1, 2) } },
            { id: 7, difficulty: 'medium', question: valueAt('f(x)=\\sin x\\cos x', "f'(0)"), solution: same('$f\'(x)=\\cos^2 x-\\sin^2 x\\ \\to\\ 1-0=1$'), answer: { expected: n(1) } },
            { id: 8, difficulty: 'hard', question: valueAt('f(x)=\\sqrt{x^2+9}', "f'(4)"), solution: same('$f\'(x)=\\frac{x}{\\sqrt{x^2+9}}\\ \\to\\ \\frac{4}{5}$'), answer: { expected: f(4, 5) } },
            { id: 9, difficulty: 'hard', question: say('Zein abzisatan da horizontala $f(x)=x^2-6x$ funtzioaren zuzen ukitzailea?', '¿En qué abscisa es horizontal la tangente a $f(x)=x^2-6x$?', 'عند أي فاصلة يكون مماس $f(x)=x^2-6x$ أفقيًّا؟', 'At which abscissa is the tangent to $f(x)=x^2-6x$ horizontal?'), solution: same('$2x-6=0\\ \\to\\ x=3$'), answer: { expected: n(3) } },
            { id: 10, difficulty: 'hard', question: valueAt('f(x)=e^x(x^2-2x)', "f'(0)"), solution: same('$\\begin{gathered}f\'(x)=e^x(x^2-2x)+e^x(2x-2)\\\\ f\'(0)=0-2=-2\\end{gathered}$'), answer: { expected: n(-2) } }
        ]
    },
    {
        id: 'derivability',
        title: say('Deribagarritasuna', 'Derivabilidad', 'قابلية الاشتقاق', 'Differentiability'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Deribagarria al da $f(x)=|x+1|$ funtzioa $x=-1$ puntuan?', '¿Es derivable $f(x)=|x+1|$ en $x=-1$?', 'هل $f(x)=|x+1|$ قابلة للاشتقاق عند $x=-1$؟', 'Is $f(x)=|x+1|$ differentiable at $x=-1$?'), solution: say('Ez: $f\'(-1^-)=-1$ eta $f\'(-1^+)=1$, punta bat dago.', 'No: $f\'(-1^-)=-1$ y $f\'(-1^+)=1$, hay un pico.', 'لا: $f\'(-1^-)=-1$ و$f\'(-1^+)=1$، توجد زاوية.', 'No: $f\'(-1^-)=-1$ and $f\'(-1^+)=1$, there is a corner.') },
            { id: 12, difficulty: 'easy', question: valueAt('f(x)=|x-2|', "f'(2^-)"), solution: same('$f(x)=2-x\\ \\to\\ f\'(2^-)=-1$'), answer: { expected: n(-1) } },
            { id: 13, difficulty: 'easy', question: say('Aurkitu $k$, $f(x)=\\begin{cases}x+k & x<2\\\\ x^2 & x\\ge 2\\end{cases}$ funtzioa $x=2$ puntuan jarraitua izan dadin.', 'Halla $k$ para que $f(x)=\\begin{cases}x+k & x<2\\\\ x^2 & x\\ge 2\\end{cases}$ sea continua en $x=2$.', 'أوجد $k$ لتكون $f(x)=\\begin{cases}x+k & x<2\\\\ x^2 & x\\ge 2\\end{cases}$ متصلة عند $x=2$.', 'Find $k$ so that $f(x)=\\begin{cases}x+k & x<2\\\\ x^2 & x\\ge 2\\end{cases}$ is continuous at $x=2$.'), solution: say('$2+k=4$, beraz $k=2$. Hala ere, ez da deribagarria: maldak 1 eta 4 dira.', '$2+k=4$, así que $k=2$. Aun así no es derivable: las pendientes son 1 y 4.', '$2+k=4$، إذن $k=2$. ومع ذلك ليست قابلة للاشتقاق: الميلان 1 و4.', '$2+k=4$, so $k=2$. Even so it is not differentiable: the slopes are 1 and 4.'), answer: { expected: n(2) } },
            { id: 14, difficulty: 'medium', question: say('Deribagarria al da $f(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}$ funtzioa $x=1$ puntuan?', '¿Es derivable $f(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}$ en $x=1$?', 'هل $f(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}$ قابلة للاشتقاق عند $x=1$؟', 'Is $f(x)=\\begin{cases}x^2 & x<1\\\\ 2x-1 & x\\ge 1\\end{cases}$ differentiable at $x=1$?'), solution: say('Bai: bi zatiek 1 balio dute eta bi maldak 2 dira; $f\'(1)=2$.', 'Sí: los dos trozos valen 1 y las dos pendientes son 2; $f\'(1)=2$.', 'نعم: قيمة الجزأين 1 والميلان 2؛ $f\'(1)=2$.', 'Yes: both pieces are worth 1 and both slopes are 2; $f\'(1)=2$.') },
            { id: 15, difficulty: 'medium', question: corners('|x^2-9|'), solution: say('$x=-3$ eta $x=3$ puntuetan, $-6$ eta 6 maldekin: 2 punta.', 'En $x=-3$ y $x=3$, con pendientes $\\mp 6$ y $\\pm 6$: 2 picos.', 'عند $x=-3$ و$x=3$: زاويتان، أي 2.', 'At $x=-3$ and $x=3$: 2 corners.'), answer: { expected: n(2) } },
            { id: 16, difficulty: 'medium', question: derivableAt(howMuch('a'), 'f(x)=\\begin{cases}ax^2+1 & x<1\\\\ 4x-1 & x\\ge 1\\end{cases}', '1'), solution: same('$\\begin{gathered}a+1=3\\ \\to\\ a=2\\\\ 2a=4\\end{gathered}$'), answer: { expected: n(2) } },
            { id: 17, difficulty: 'medium', question: valueAt('f(x)=x\\,|x-1|', "f'(1^+)-f'(1^-)"), solution: same('$\\begin{gathered}f\'(1^+)=2\\cdot 1-1=1\\\\ f\'(1^-)=1-2\\cdot 1=-1\\\\ 1-(-1)=2\\end{gathered}$'), answer: { expected: n(2) } },
            { id: 18, difficulty: 'hard', question: derivableAt(workOut('a\\cdot b'), 'f(x)=\\begin{cases}x^2+a & x\\le 2\\\\ bx-1 & x>2\\end{cases}', '2'), solution: same('$\\begin{gathered}b=4\\\\ 4+a=8-1\\ \\to\\ a=3\\\\ 3\\cdot 4=12\\end{gathered}$'), answer: { expected: n(12) } },
            { id: 19, difficulty: 'hard', question: derivableAt(workOut('a+b'), 'f(x)=\\begin{cases}a\\sin x+b & x<0\\\\ x^2+2x+1 & x\\ge 0\\end{cases}', '0'), solution: same('$\\begin{gathered}b=1\\qquad a\\cos 0=2\\\\ a+b=2+1=3\\end{gathered}$'), answer: { expected: n(3) } },
            { id: 20, difficulty: 'hard', question: say('Ba al dago $f(x)=\\begin{cases}ax & x<1\\\\ x^2+a & x\\ge 1\\end{cases}$ funtzioa $x=1$ puntuan deribagarria egiten duen $a$ baliorik?', '¿Hay algún $a$ que haga derivable en $x=1$ a $f(x)=\\begin{cases}ax & x<1\\\\ x^2+a & x\\ge 1\\end{cases}$?', 'هل توجد قيمة $a$ تجعل $f(x)=\\begin{cases}ax & x<1\\\\ x^2+a & x\\ge 1\\end{cases}$ قابلة للاشتقاق عند $x=1$؟', 'Is there an $a$ that makes $f(x)=\\begin{cases}ax & x<1\\\\ x^2+a & x\\ge 1\\end{cases}$ differentiable at $x=1$?'), solution: say('Ez: jarraitutasunak $a=1+a$ eskatzen du, eta hori ezinezkoa da.', 'No: la continuidad pide $a=1+a$, que es imposible.', 'لا: يشترط الاتصال $a=1+a$، وهذا مستحيل.', 'No: continuity needs $a=1+a$, which is impossible.') }
        ]
    },
    {
        id: 'chain',
        title: say('Katearen erregela sakonago', 'La regla de la cadena a fondo', 'قاعدة السلسلة بعمق', 'The chain rule in depth'),
        items: [
            { id: 21, difficulty: 'easy', question: valueAt('f(x)=(3x-1)^4', "f'(1)"), solution: same('$f\'(1)=4\\cdot 2^3\\cdot 3=96$'), answer: { expected: n(96) } },
            { id: 22, difficulty: 'easy', question: valueAt('f(x)=e^{5x}', "f'(0)"), solution: same('$f\'(x)=5e^{5x}\\ \\to\\ 5$'), answer: { expected: n(5) } },
            { id: 23, difficulty: 'easy', question: valueAt('f(x)=\\sin(4x)', "f'(0)"), solution: same('$f\'(x)=4\\cos(4x)\\ \\to\\ 4$'), answer: { expected: n(4) } },
            { id: 24, difficulty: 'medium', question: valueAt('f(x)=\\ln(\\sin x)', "f'\\left(\\frac{\\pi}{4}\\right)"), solution: same('$f\'(x)=\\frac{\\cos x}{\\sin x}\\ \\to\\ 1$'), answer: { expected: n(1) } },
            { id: 25, difficulty: 'medium', question: say('Deribatu $f(x)=\\cos^2(3x)$.', 'Deriva $f(x)=\\cos^2(3x)$.', 'اشتق $f(x)=\\cos^2(3x)$.', 'Differentiate $f(x)=\\cos^2(3x)$.'), solution: same('$\\begin{gathered}f\'(x)=2\\cos(3x)\\cdot(-\\sin(3x))\\cdot 3\\\\ =-6\\cos(3x)\\sin(3x)\\end{gathered}$') },
            { id: 26, difficulty: 'medium', question: valueAt('f(x)=\\arctan(x^2+x)', "f'(0)"), solution: same('$f\'(x)=\\frac{2x+1}{1+(x^2+x)^2}\\ \\to\\ 1$'), answer: { expected: n(1) } },
            { id: 27, difficulty: 'medium', question: say('Deribatu $f(x)=2^{x^2}$.', 'Deriva $f(x)=2^{x^2}$.', 'اشتق $f(x)=2^{x^2}$.', 'Differentiate $f(x)=2^{x^2}$.'), solution: same('$f\'(x)=2^{x^2}\\ln 2\\cdot 2x$') },
            { id: 28, difficulty: 'hard', question: valueAt('f(x)=\\sin x', 'f^{(21)}(0)'), solution: say('Lau deribatuz behin errepikatzen da: $21=4\\cdot 5+1$, beraz $f^{(21)}=\\cos x$ eta $\\cos 0=1$.', 'Se repite cada cuatro: $21=4\\cdot 5+1$, así que $f^{(21)}=\\cos x$ y $\\cos 0=1$.', 'يتكرر كل أربع: $21=4\\cdot 5+1$، إذن $f^{(21)}=\\cos x$ و$\\cos 0=1$.', 'It repeats every four: $21=4\\cdot 5+1$, so $f^{(21)}=\\cos x$ and $\\cos 0=1$.'), answer: { expected: n(1) } },
            { id: 29, difficulty: 'hard', question: say('Aurkitu $f^{(n)}(x)$, $f(x)=x\\,e^x$ bada.', 'Halla $f^{(n)}(x)$ si $f(x)=x\\,e^x$.', 'أوجد $f^{(n)}(x)$ إذا كانت $f(x)=x\\,e^x$.', 'Find $f^{(n)}(x)$ if $f(x)=x\\,e^x$.'), solution: same('$\\begin{gathered}f\'=(x+1)e^x\\qquad f\'\'=(x+2)e^x\\\\ f^{(n)}(x)=(x+n)e^x\\end{gathered}$') },
            { id: 30, difficulty: 'hard', question: valueAt('f(x)=\\frac{1}{2x+1}', "f''(0)"), solution: same('$\\begin{gathered}f\'=-2(2x+1)^{-2}\\\\ f\'\'=8(2x+1)^{-3}\\ \\to\\ 8\\end{gathered}$'), answer: { expected: n(8) } }
        ]
    },
    {
        id: 'special',
        title: say('Deribatu bereziak', 'Derivadas especiales', 'مشتقات خاصة', 'Special derivatives'),
        items: [
            { id: 31, difficulty: 'easy', question: implicitSlope('x^2+y^2=10', '(3,1)'), solution: same('$y\'=-\\frac{x}{y}=-\\frac{3}{1}=-3$'), answer: { expected: n(-3) } },
            { id: 32, difficulty: 'easy', question: inverseSlope('x^3+1', '1', '2'), solution: same('$f\'(1)=3\\ \\to\\ \\frac{1}{3}$'), answer: { expected: f(1, 3) } },
            { id: 33, difficulty: 'easy', question: say('Deribatu inplizituki $x^2-y^2=1$.', 'Deriva implícitamente $x^2-y^2=1$.', 'اشتق ضمنيًّا $x^2-y^2=1$.', 'Differentiate $x^2-y^2=1$ implicitly.'), solution: same('$2x-2y\\,y\'=0\\ \\to\\ y\'=\\frac{x}{y}$') },
            { id: 34, difficulty: 'medium', question: implicitSlope('x^2+xy+y^2=3', '(1,1)'), solution: same('$\\begin{gathered}y\'=-\\frac{2x+y}{x+2y}\\\\ =-\\frac{2+1}{1+2}=-1\\end{gathered}$'), answer: { expected: n(-1) } },
            { id: 35, difficulty: 'medium', question: say('Idatzi $x^2+y^2=25$ zirkunferentziaren zuzen ukitzailea $(4,-3)$ puntuan.', 'Escribe la tangente a $x^2+y^2=25$ en $(4,-3)$.', 'اكتب مماس $x^2+y^2=25$ عند $(4,-3)$.', 'Write the tangent to $x^2+y^2=25$ at $(4,-3)$.'), solution: same('$\\begin{gathered}y\'=-\\frac{4}{-3}=\\frac{4}{3}\\\\ y+3=\\frac{4}{3}(x-4)\\end{gathered}$') },
            { id: 36, difficulty: 'medium', question: say('Erabili alderantzizkoa $\\arcsin x$ funtzioaren deribatua aurkitzeko.', 'Usa la inversa para hallar la derivada de $\\arcsin x$.', 'استعمل الدالة العكسية لإيجاد مشتقة $\\arcsin x$.', 'Use the inverse to find the derivative of $\\arcsin x$.'), solution: same('$\\begin{gathered}x=\\sin y\\ \\to\\ 1=\\cos y\\cdot y\'\\\\ y\'=\\frac{1}{\\cos y}=\\frac{1}{\\sqrt{1-x^2}}\\end{gathered}$') },
            { id: 37, difficulty: 'medium', question: valueAt('f(x)=x^{\\frac{1}{x}}', "f'(1)"), solution: same('$\\begin{gathered}\\frac{f\'}{f}=\\frac{1-\\ln x}{x^2}\\\\ f\'(1)=1\\cdot\\frac{1-0}{1}=1\\end{gathered}$'), answer: { expected: n(1) } },
            { id: 38, difficulty: 'hard', question: implicitSlope('y^3+y=x', '(2,1)'), solution: same('$\\begin{gathered}3y^2\\,y\'+y\'=1\\\\ y\'=\\frac{1}{3+1}=\\frac{1}{4}\\end{gathered}$'), answer: { expected: f(1, 4) } },
            { id: 39, difficulty: 'hard', question: inverseSlope('e^x+x^3', '0', '1'), solution: same('$f\'(0)=e^0+0=1\\ \\to\\ \\frac{1}{1}=1$'), answer: { expected: n(1) } },
            { id: 40, difficulty: 'hard', question: valueAt('f(x)=x^{2x}', "f'(1)"), solution: same('$\\begin{gathered}\\frac{f\'}{f}=2\\ln x+2\\\\ f\'(1)=1\\cdot(0+2)=2\\end{gathered}$'), answer: { expected: n(2) } }
        ]
    },
    {
        id: 'tangents',
        title: say('Zuzen ukitzaileen problemak', 'Problemas de tangentes', 'مسائل المماسات', 'Tangent problems'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Zein abzisatan du $f(x)=x^2-4x$ funtzioak zuzen ukitzaile horizontala?', '¿En qué abscisa tiene $f(x)=x^2-4x$ tangente horizontal?', 'عند أي فاصلة يكون مماس $f(x)=x^2-4x$ أفقيًّا؟', 'At which abscissa does $f(x)=x^2-4x$ have a horizontal tangent?'), solution: same('$2x-4=0\\ \\to\\ x=2$'), answer: { expected: n(2) } },
            { id: 42, difficulty: 'easy', question: say('$f(x)=x^2+c$ funtzioaren zuzen ukitzailea $x=1$ puntuan jatorritik igarotzen da. Zenbat da $c$?', 'La tangente a $f(x)=x^2+c$ en $x=1$ pasa por el origen. ¿Cuánto vale $c$?', 'يمر مماس $f(x)=x^2+c$ عند $x=1$ بالأصل. كم تساوي $c$؟', 'The tangent to $f(x)=x^2+c$ at $x=1$ passes through the origin. What is $c$?'), solution: same('$\\begin{gathered}y=2(x-1)+1+c\\\\ 0=-2+1+c\\ \\to\\ c=1\\end{gathered}$'), answer: { expected: n(1) } },
            { id: 43, difficulty: 'easy', question: say('$x>0$ izanik, zein abzisatan du $f(x)=x^3$ funtzioaren zuzen ukitzaileak 12 malda?', 'Con $x>0$, ¿en qué abscisa tiene la tangente a $f(x)=x^3$ pendiente 12?', 'مع $x>0$، عند أي فاصلة يكون ميل مماس $f(x)=x^3$ مساويًا 12؟', 'With $x>0$, at which abscissa does the tangent to $f(x)=x^3$ have slope 12?'), solution: same('$3x^2=12\\ \\to\\ x=2$'), answer: { expected: n(2) } },
            { id: 44, difficulty: 'medium', question: say('$f(x)=x^2+ax+b$ funtzioaren zuzen ukitzailea $x=1$ puntuan $y=3x$ da. Kalkulatu $a+b$.', 'La tangente a $f(x)=x^2+ax+b$ en $x=1$ es $y=3x$. Calcula $a+b$.', 'مماس $f(x)=x^2+ax+b$ عند $x=1$ هو $y=3x$. احسب $a+b$.', 'The tangent to $f(x)=x^2+ax+b$ at $x=1$ is $y=3x$. Work out $a+b$.'), solution: same('$\\begin{gathered}1+a+b=3\\ \\to\\ a+b=2\\\\ 2+a=3\\ \\to\\ a=1\\end{gathered}$'), answer: { expected: n(2) } },
            { id: 45, difficulty: 'medium', question: say('Aurkitu $f(x)=x^2$ funtzioaren zuzen ukitzaileak, $(1,0)$ puntutik igarotzen direnak.', 'Halla las tangentes a $f(x)=x^2$ que pasan por $(1,0)$.', 'أوجد مماسات $f(x)=x^2$ التي تمر بالنقطة $(1,0)$.', 'Find the tangents to $f(x)=x^2$ that pass through $(1,0)$.'), solution: same('$\\begin{gathered}-c^2=2c(1-c)\\ \\to\\ c=0,\\ c=2\\\\ y=0\\qquad y=4x-4\\end{gathered}$') },
            { id: 46, difficulty: 'medium', question: say('$k>0$ izanik, aurkitu $k$, $y=kx$ zuzena $y=x^2+4$ kurbaren ukitzailea izan dadin.', 'Con $k>0$, halla $k$ para que $y=kx$ sea tangente a $y=x^2+4$.', 'مع $k>0$، أوجد $k$ ليكون $y=kx$ مماسًّا للمنحنى $y=x^2+4$.', 'With $k>0$, find $k$ so that $y=kx$ is tangent to $y=x^2+4$.'), solution: same('$\\begin{gathered}c^2+4=kc\\qquad 2c=k\\\\ c^2=4\\ \\to\\ c=2,\\ k=4\\end{gathered}$'), answer: { expected: n(4) } },
            { id: 47, difficulty: 'medium', question: say('$y=2x+b$ zuzena $y=x^2+1$ kurbaren ukitzailea da. Zenbat da $b$?', 'La recta $y=2x+b$ es tangente a $y=x^2+1$. ¿Cuánto vale $b$?', 'المستقيم $y=2x+b$ مماس للمنحنى $y=x^2+1$. كم تساوي $b$؟', 'The line $y=2x+b$ is tangent to $y=x^2+1$. What is $b$?'), solution: same('$\\begin{gathered}2c=2\\ \\to\\ c=1\\\\ 1+1=2+b\\ \\to\\ b=0\\end{gathered}$'), answer: { expected: n(0) } },
            { id: 48, difficulty: 'hard', question: say('$f(x)=ax^3+bx^2$ funtzioak zuzen ukitzaile horizontala du $(1,1)$ puntuan. Kalkulatu $a\\cdot b$.', '$f(x)=ax^3+bx^2$ tiene tangente horizontal en $(1,1)$. Calcula $a\\cdot b$.', 'للدالة $f(x)=ax^3+bx^2$ مماس أفقي عند $(1,1)$. احسب $a\\cdot b$.', '$f(x)=ax^3+bx^2$ has a horizontal tangent at $(1,1)$. Work out $a\\cdot b$.'), solution: same('$\\begin{gathered}a+b=1\\qquad 3a+2b=0\\\\ a=-2,\\ b=3\\ \\to\\ -2\\cdot 3=-6\\end{gathered}$'), answer: { expected: n(-6) } },
            { id: 49, difficulty: 'hard', question: say('Aurkitu $k$, $y=kx$ zuzena $y=\\ln x$ kurbaren ukitzailea izan dadin.', 'Halla $k$ para que la recta $y=kx$ sea tangente a $y=\\ln x$.', 'أوجد $k$ ليكون المستقيم $y=kx$ مماسًّا للمنحنى $y=\\ln x$.', 'Find $k$ so that the line $y=kx$ is tangent to $y=\\ln x$.'), solution: same('$\\begin{gathered}\\frac{1}{c}=k\\qquad\\ln c=kc=1\\\\ c=e\\ \\to\\ k=\\frac{1}{e}\\end{gathered}$') },
            { id: 50, difficulty: 'hard', question: say('Zein $a$ baliorako dira ukitzaileak $y=x^2$ eta $y=-x^2+4x+a$ parabolak?', '¿Para qué $a$ son tangentes $y=x^2$ e $y=-x^2+4x+a$?', 'لأي قيمة $a$ يتماسّ $y=x^2$ و$y=-x^2+4x+a$؟', 'For which $a$ are $y=x^2$ and $y=-x^2+4x+a$ tangent?'), solution: same('$\\begin{gathered}2c=-2c+4\\ \\to\\ c=1\\\\ 1=-1+4+a\\ \\to\\ a=-2\\end{gathered}$'), answer: { expected: n(-2) } }
        ]
    }
]

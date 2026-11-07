import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Integralak · Batxilergoa 1 · Zientziak — diagnostic, guided practice,
   exercise bank and challenges, with the scope of unit 12 of Santillana
   1.º Bachillerato Ciencias (all the exercises and numbers are our own).
   An indefinite integral has no single number for an answer, so the
   closed items ask for the constant k of an antiderivative through a
   point, a value F(b) of one, an exponent or a factor of a composite
   integral, a definite integral or an area. Whole antiderivatives go in
   the open items of the bank.
   ========================================================================== */

const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

/** «Work out …» with one formula */
const work = (latex: string) => say(`Kalkulatu $${latex}$.`, `Calcula $${latex}$.`, `احسب $${latex}$.`, `Work out $${latex}$.`)
/** «Find the area between the curve and the x-axis on [a, b]» */
const areaOn = (formula: string, interval: string) => say(
    `Aurkitu $f(x)=${formula}$ kurbaren eta X ardatzaren arteko azalera $${interval}$ tartean.`,
    `Halla el área entre $f(x)=${formula}$ y el eje X en $${interval}$.`,
    `أوجد المساحة بين $f(x)=${formula}$ ومحور X في $${interval}$.`,
    `Find the area between $f(x)=${formula}$ and the x-axis on $${interval}$.`
)
/** «Find the area bounded by the curve, the x-axis and the lines x = a and x = b» */
const areaBetweenLines = (formula: string, a: string, b: string) => say(
    `Aurkitu $f(x)=${formula}$ kurbak, X ardatzak eta $x=${a}$ eta $x=${b}$ zuzenek mugatutako azalera.`,
    `Halla el área entre $f(x)=${formula}$, el eje X y las rectas $x=${a}$ y $x=${b}$.`,
    `أوجد المساحة بين $f(x)=${formula}$ ومحور X والمستقيمين $x=${a}$ و$x=${b}$.`,
    `Find the area between $f(x)=${formula}$, the x-axis and the lines $x=${a}$ and $x=${b}$.`
)
/** «Find the area between the two curves» */
const areaCurves = (first: string, second: string) => say(
    `Aurkitu $y=${first}$ eta $y=${second}$ kurben arteko azalera.`,
    `Halla el área entre $y=${first}$ e $y=${second}$.`,
    `أوجد المساحة بين $y=${first}$ و$y=${second}$.`,
    `Find the area between $y=${first}$ and $y=${second}$.`
)

export const bachIntegralsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 112001,
        prompt: say('$F(x)=x^4$ bada, zer da $F\'(x)$?', 'Si $F(x)=x^4$, ¿qué es $F\'(x)$?', 'إذا كانت $F(x)=x^4$ فما $F\'(x)$؟', 'If $F(x)=x^4$, what is $F\'(x)$?'),
        options: [same('$4x^3$'), same('$x^3$'), same('$4x^4$')],
        correctIndex: 0,
        explanation: say('Berretzailea jaisten da, eta bat kentzen zaio.', 'El exponente baja y se le resta uno.', 'ينزل الأس ويُطرح منه واحد.', 'The exponent comes down and loses one.'),
        topic: 'primitive'
    },
    {
        id: 112002,
        prompt: say('Nola idazten da $\\sqrt{x}$ berretura gisa?', '¿Cómo se escribe $\\sqrt{x}$ como potencia?', 'كيف يُكتب $\\sqrt{x}$ على صورة قوة؟', 'How is $\\sqrt{x}$ written as a power?'),
        options: [same('$x^2$'), same('$x^{\\frac{1}{2}}$'), same('$x^{-\\frac{1}{2}}$')],
        correctIndex: 1,
        explanation: say('Erro karratua $\\frac{1}{2}$ berretzailea da.', 'La raíz cuadrada es el exponente $\\frac{1}{2}$.', 'الجذر التربيعي هو الأس $\\frac{1}{2}$.', 'The square root is the exponent $\\frac{1}{2}$.'),
        topic: 'power-rule'
    },
    {
        id: 112003,
        prompt: say('Zein da $\\ln x$ funtzioaren deribatua?', '¿Cuál es la derivada de $\\ln x$?', 'ما مشتقة $\\ln x$؟', 'What is the derivative of $\\ln x$?'),
        options: [same('$\\frac{1}{x}$'), same('$e^x$'), same('$\\ln x$')],
        correctIndex: 0,
        explanation: same('$(\\ln x)\'=\\frac{1}{x}$'),
        topic: 'exp-log'
    },
    {
        id: 112004,
        prompt: say('Zein da $\\sin x$ funtzioaren deribatua?', '¿Cuál es la derivada de $\\sin x$?', 'ما مشتقة $\\sin x$؟', 'What is the derivative of $\\sin x$?'),
        options: [same('$-\\cos x$'), same('$\\cos x$'), same('$-\\sin x$')],
        correctIndex: 1,
        explanation: say('$(\\sin x)\'=\\cos x$; minus zeinua kosinuaren deribatuan dago.', '$(\\sin x)\'=\\cos x$; el signo menos está en la derivada del coseno.', '$(\\sin x)\'=\\cos x$؛ وإشارة السالب في مشتقة جيب التمام.', '$(\\sin x)\'=\\cos x$; the minus sign is in the derivative of cosine.'),
        topic: 'trig'
    },
    {
        id: 112005,
        prompt: say('Osatu karratua: $x^2+4x+5$ adierazpena berdin…', 'Completa el cuadrado: $x^2+4x+5$ es igual a…', 'أكمل المربع: $x^2+4x+5$ يساوي…', 'Complete the square: $x^2+4x+5$ equals…'),
        options: [same('$(x+2)^2+1$'), same('$(x+4)^2+5$'), same('$(x+2)^2+5$')],
        correctIndex: 0,
        explanation: same('$(x+2)^2=x^2+4x+4$'),
        topic: 'arcs'
    },
    {
        id: 112006,
        prompt: say('$u=x^2+1$ bada, zer da $u\'$?', 'Si $u=x^2+1$, ¿qué es $u\'$?', 'إذا كان $u=x^2+1$ فما $u\'$؟', 'If $u=x^2+1$, what is $u\'$?'),
        options: [same('$x^2+1$'), same('$2x+1$'), same('$2x$')],
        correctIndex: 2,
        explanation: say('Konstante baten deribatua 0 da.', 'La derivada de una constante es 0.', 'مشتقة الثابت 0.', 'The derivative of a constant is 0.'),
        topic: 'chain-power'
    },
    {
        id: 112007,
        prompt: say('Zenbat da 4 oinarriko eta 6 altuerako triangelu baten azalera?', '¿Cuánto mide el área de un triángulo de base 4 y altura 6?', 'كم مساحة مثلث قاعدته 4 وارتفاعه 6؟', 'What is the area of a triangle with base 4 and height 6?'),
        options: [same('$24$'), same('$12$'), same('$10$')],
        correctIndex: 1,
        explanation: same('$\\frac{4\\cdot 6}{2}=12$'),
        topic: 'rectangles'
    },
    {
        id: 112008,
        prompt: say('Ebatzi $x^2=3x$.', 'Resuelve $x^2=3x$.', 'حلّ $x^2=3x$.', 'Solve $x^2=3x$.'),
        options: [same('$x=3$'), same('$x=0,\\ x=3$'), same('$x=\\pm\\sqrt{3}$')],
        correctIndex: 1,
        explanation: say('$x(x-3)=0$: ez ahaztu $x=0$.', '$x(x-3)=0$: no olvides $x=0$.', '$x(x-3)=0$: لا تنسَ $x=0$.', '$x(x-3)=0$: do not forget $x=0$.'),
        topic: 'between-curves'
    }
]

export const bachIntegralsPractice: PracticeItem[] = [
    /* ---------- Antiderivatives ---------- */
    { id: 1, stage: 'primitives', prompt: say('$f(x)=6x^2$ funtzioaren jatorrizkoak $F(x)=2x^3+k$ dira. Aurkitu $(1,\\,5)$ puntutik pasatzen denaren $k$.', 'Las primitivas de $f(x)=6x^2$ son $F(x)=2x^3+k$. Halla la $k$ de la que pasa por $(1,\\,5)$.', 'الدوال الأصلية لـ $f(x)=6x^2$ هي $F(x)=2x^3+k$. أوجد $k$ للتي تمر بالنقطة $(1,\\,5)$.', 'The antiderivatives of $f(x)=6x^2$ are $F(x)=2x^3+k$. Find the $k$ of the one through $(1,\\,5)$.'), expected: n(3), hint: same('$F(1)=5$'), explanation: same('$2+k=5\\ \\to\\ k=3$') },
    { id: 2, stage: 'primitives', prompt: say('$F$ funtzioa $f(x)=4x^3+2x$ funtzioaren jatorrizkoa da, eta $F(0)=0$. Kalkulatu $F(2)$.', '$F$ es la primitiva de $f(x)=4x^3+2x$ con $F(0)=0$. Calcula $F(2)$.', '$F$ الدالة الأصلية لـ $f(x)=4x^3+2x$ مع $F(0)=0$. احسب $F(2)$.', '$F$ is the antiderivative of $f(x)=4x^3+2x$ with $F(0)=0$. Work out $F(2)$.'), expected: n(20), hint: say('Gaiz gai, eta $k=0$.', 'Término a término, y $k=0$.', 'حدًّا حدًّا، و$k=0$.', 'Term by term, and $k=0$.'), explanation: same('$\\begin{aligned}&F(x)=x^4+x^2\\\\ &F(2)=16+4=20\\end{aligned}$') },
    { id: 3, stage: 'primitives', prompt: say('$F(x)=ax^3+5x$ funtzioa $f(x)=6x^2+5$ funtzioaren jatorrizkoa da. Aurkitu $a$.', '$F(x)=ax^3+5x$ es una primitiva de $f(x)=6x^2+5$. Halla $a$.', '$F(x)=ax^3+5x$ دالة أصلية لـ $f(x)=6x^2+5$. أوجد $a$.', '$F(x)=ax^3+5x$ is an antiderivative of $f(x)=6x^2+5$. Find $a$.'), expected: n(2), hint: say('Deribatu $F$, eta konparatu $f$ funtzioarekin.', 'Deriva $F$ y compárala con $f$.', 'اشتق $F$ وقارنها بـ $f$.', 'Differentiate $F$ and compare it with $f$.'), explanation: same('$\\begin{aligned}&F\'(x)=3ax^2+5\\\\ &=6x^2+5\\ \\to\\ a=2\\end{aligned}$') },
    { id: 4, stage: 'primitives', prompt: say('$f(x)=\\sqrt{x}$ funtzioaren jatorrizko batek $(4,\\,10)$ puntutik pasatzen du. Aurkitu haren $k$.', 'Una primitiva de $f(x)=\\sqrt{x}$ pasa por $(4,\\,10)$. Halla su $k$.', 'دالة أصلية لـ $f(x)=\\sqrt{x}$ تمر بالنقطة $(4,\\,10)$. أوجد $k$ لها.', 'An antiderivative of $f(x)=\\sqrt{x}$ goes through $(4,\\,10)$. Find its $k$.'), expected: f(14, 3), hint: same('$F(x)=\\frac{2}{3}x^{\\frac{3}{2}}+k$'), explanation: same('$\\begin{aligned}&\\frac{2}{3}\\cdot 8+k=10\\\\ &k=10-\\frac{16}{3}=\\frac{14}{3}\\end{aligned}$') },
    /* ---------- Basic integrals ---------- */
    { id: 5, stage: 'immediate', prompt: say('$F$ funtzioa $f(x)=\\frac{2}{x}$ funtzioaren jatorrizkoa da $x>0$ denean, eta $F(1)=3$. Kalkulatu $F(e)$.', '$F$ es una primitiva de $f(x)=\\frac{2}{x}$ para $x>0$ con $F(1)=3$. Calcula $F(e)$.', '$F$ دالة أصلية لـ $f(x)=\\frac{2}{x}$ عندما $x>0$ مع $F(1)=3$. احسب $F(e)$.', '$F$ is an antiderivative of $f(x)=\\frac{2}{x}$ for $x>0$ with $F(1)=3$. Work out $F(e)$.'), expected: n(5), hint: same('$\\ln 1=0\\qquad \\ln e=1$'), explanation: same('$\\begin{aligned}&F(x)=2\\ln x+3\\\\ &F(e)=2+3=5\\end{aligned}$') },
    { id: 6, stage: 'immediate', prompt: say('$F$ funtzioa $\\cos x$ funtzioaren jatorrizkoa da, eta $F(0)=4$. Kalkulatu $F\\left(\\frac{\\pi}{2}\\right)$.', '$F$ es una primitiva de $\\cos x$ con $F(0)=4$. Calcula $F\\left(\\frac{\\pi}{2}\\right)$.', '$F$ دالة أصلية لـ $\\cos x$ مع $F(0)=4$. احسب $F\\left(\\frac{\\pi}{2}\\right)$.', '$F$ is an antiderivative of $\\cos x$ with $F(0)=4$. Work out $F\\left(\\frac{\\pi}{2}\\right)$.'), expected: n(5), hint: same('$\\int\\cos x\\,dx=\\sin x+k$'), explanation: same('$\\begin{aligned}&F(x)=\\sin x+4\\\\ &F\\left(\\frac{\\pi}{2}\\right)=1+4=5\\end{aligned}$') },
    { id: 7, stage: 'immediate', prompt: say('$F$ funtzioa $1+\\tan^2 x$ funtzioaren jatorrizkoa da, eta $F(0)=2$. Kalkulatu $F\\left(\\frac{\\pi}{4}\\right)$.', '$F$ es una primitiva de $1+\\tan^2 x$ con $F(0)=2$. Calcula $F\\left(\\frac{\\pi}{4}\\right)$.', '$F$ دالة أصلية لـ $1+\\tan^2 x$ مع $F(0)=2$. احسب $F\\left(\\frac{\\pi}{4}\\right)$.', '$F$ is an antiderivative of $1+\\tan^2 x$ with $F(0)=2$. Work out $F\\left(\\frac{\\pi}{4}\\right)$.'), expected: n(3), hint: same('$\\tan\\frac{\\pi}{4}=1$'), explanation: same('$\\begin{aligned}&F(x)=\\tan x+2\\\\ &F\\left(\\frac{\\pi}{4}\\right)=1+2=3\\end{aligned}$') },
    { id: 8, stage: 'immediate', prompt: say('$\\int\\frac{dx}{x^2-10x+26}=\\arctan(x-p)+k$. Aurkitu $p$.', '$\\int\\frac{dx}{x^2-10x+26}=\\arctan(x-p)+k$. Halla $p$.', '$\\int\\frac{dx}{x^2-10x+26}=\\arctan(x-p)+k$. أوجد $p$.', '$\\int\\frac{dx}{x^2-10x+26}=\\arctan(x-p)+k$. Find $p$.'), expected: n(5), hint: say('Osatu $x^2-10x$ adierazpenaren karratua.', 'Completa el cuadrado de $x^2-10x$.', 'أكمل مربع $x^2-10x$.', 'Complete the square of $x^2-10x$.'), explanation: same('$\\begin{aligned}&x^2-10x+26\\\\ &=(x-5)^2+1\\end{aligned}$') },
    /* ---------- Composite integrals ---------- */
    { id: 9, stage: 'compound', prompt: say('$\\int 2x(x^2-3)^4\\,dx=\\frac{(x^2-3)^m}{m}+k$. Aurkitu $m$.', '$\\int 2x(x^2-3)^4\\,dx=\\frac{(x^2-3)^m}{m}+k$. Halla $m$.', '$\\int 2x(x^2-3)^4\\,dx=\\frac{(x^2-3)^m}{m}+k$. أوجد $m$.', '$\\int 2x(x^2-3)^4\\,dx=\\frac{(x^2-3)^m}{m}+k$. Find $m$.'), expected: n(5), hint: say('Kanpoan $u\'=2x$ dago: integratu $u^4$.', 'Fuera está $u\'=2x$: integra $u^4$.', 'في الخارج $u\'=2x$: كامِل $u^4$.', 'Outside there is $u\'=2x$: integrate $u^4$.'), explanation: same('$\\int u\'u^4\\,dx=\\frac{u^5}{5}+k,\\ m=5$') },
    { id: 10, stage: 'compound', prompt: say('$\\int\\frac{x}{x^2+4}\\,dx=a\\ln(x^2+4)+k$. Aurkitu $a$.', '$\\int\\frac{x}{x^2+4}\\,dx=a\\ln(x^2+4)+k$. Halla $a$.', '$\\int\\frac{x}{x^2+4}\\,dx=a\\ln(x^2+4)+k$. أوجد $a$.', '$\\int\\frac{x}{x^2+4}\\,dx=a\\ln(x^2+4)+k$. Find $a$.'), expected: f(1, 2), hint: say('$x^2+4$ adierazpenaren deribatua $2x$ da: 2 bat falta da.', 'La derivada de $x^2+4$ es $2x$: falta un 2.', 'مشتقة $x^2+4$ هي $2x$: ينقص 2.', 'The derivative of $x^2+4$ is $2x$: a 2 is missing.'), explanation: same('$\\begin{aligned}&\\frac{1}{2}\\int\\frac{2x}{x^2+4}\\,dx\\\\ &=\\frac{1}{2}\\ln(x^2+4)+k\\end{aligned}$') },
    { id: 11, stage: 'compound', prompt: say('$\\int e^{5x}\\,dx=a\\,e^{5x}+k$. Aurkitu $a$.', '$\\int e^{5x}\\,dx=a\\,e^{5x}+k$. Halla $a$.', '$\\int e^{5x}\\,dx=a\\,e^{5x}+k$. أوجد $a$.', '$\\int e^{5x}\\,dx=a\\,e^{5x}+k$. Find $a$.'), expected: f(1, 5), hint: say('$u=5x$ bada, $u\'=5$.', 'Con $u=5x$, $u\'=5$.', 'مع $u=5x$ يكون $u\'=5$.', 'With $u=5x$, $u\'=5$.'), explanation: same('$\\frac{1}{5}\\int 5e^{5x}\\,dx=\\frac{1}{5}e^{5x}+k$') },
    { id: 12, stage: 'compound', prompt: say('$F$ funtzioa $2x\\sqrt{x^2+9}$ funtzioaren jatorrizkoa da, $k=0$ izanik. Kalkulatu $F(4)$.', '$F$ es la primitiva de $2x\\sqrt{x^2+9}$ con $k=0$. Calcula $F(4)$.', '$F$ الدالة الأصلية لـ $2x\\sqrt{x^2+9}$ مع $k=0$. احسب $F(4)$.', '$F$ is the antiderivative of $2x\\sqrt{x^2+9}$ with $k=0$. Work out $F(4)$.'), expected: f(250, 3), hint: same('$\\int u\'u^{\\frac{1}{2}}\\,dx=\\frac{2}{3}u^{\\frac{3}{2}}$'), explanation: same('$\\begin{aligned}&F(x)=\\frac{2}{3}(x^2+9)^{\\frac{3}{2}}\\\\ &F(4)=\\frac{2}{3}\\cdot 125=\\frac{250}{3}\\end{aligned}$') },
    /* ---------- The definite integral ---------- */
    { id: 13, stage: 'definite', prompt: work('\\int_1^2(4x^3-1)\\,dx'), expected: n(14), hint: same('$F(x)=x^4-x$'), explanation: same('$\\left[x^4-x\\right]_1^2=14-0=14$') },
    { id: 14, stage: 'definite', prompt: say('Hurbildu $\\int_0^3 x^2\\,dx$, 1 oinarriko 3 laukizuzenekin eta altuera ezkerrean hartuta.', 'Aproxima $\\int_0^3 x^2\\,dx$ con 3 rectángulos de base 1 y la altura a la izquierda.', 'قرّب $\\int_0^3 x^2\\,dx$ بثلاثة مستطيلات قاعدة كل منها 1 والارتفاع عند اليسار.', 'Approximate $\\int_0^3 x^2\\,dx$ with 3 rectangles of base 1 and the height on the left.'), expected: n(5), hint: say('Altuerak: $f(0)$, $f(1)$ eta $f(2)$.', 'Las alturas: $f(0)$, $f(1)$ y $f(2)$.', 'الارتفاعات: $f(0)$ و$f(1)$ و$f(2)$.', 'The heights: $f(0)$, $f(1)$ and $f(2)$.'), explanation: same('$1\\cdot 0+1\\cdot 1+1\\cdot 4=5$') },
    { id: 15, stage: 'definite', prompt: work('\\int_0^{\\pi}\\sin x\\,dx'), expected: n(2), hint: same('$\\int\\sin x\\,dx=-\\cos x+k$'), explanation: same('$\\left[-\\cos x\\right]_0^{\\pi}=1-(-1)=2$') },
    { id: 16, stage: 'definite', prompt: say('$\\int_1^5 f(x)\\,dx=8$ eta $\\int_1^3 f(x)\\,dx=3$ badira, zenbat da $\\int_3^5 f(x)\\,dx$?', 'Si $\\int_1^5 f(x)\\,dx=8$ y $\\int_1^3 f(x)\\,dx=3$, ¿cuánto vale $\\int_3^5 f(x)\\,dx$?', 'إذا كان $\\int_1^5 f(x)\\,dx=8$ و$\\int_1^3 f(x)\\,dx=3$ فكم يساوي $\\int_3^5 f(x)\\,dx$؟', 'If $\\int_1^5 f(x)\\,dx=8$ and $\\int_1^3 f(x)\\,dx=3$, what is $\\int_3^5 f(x)\\,dx$?'), expected: n(5), hint: say('Zatitu $[1,\\,5]$ tartea 3 puntuan.', 'Parte $[1,\\,5]$ en 3.', 'قسّم $[1,\\,5]$ عند 3.', 'Split $[1,\\,5]$ at 3.'), explanation: same('$8-3=5$') },
    /* ---------- Areas ---------- */
    { id: 17, stage: 'areas', prompt: areaBetweenLines('e^x', '0', '\\ln 3'), expected: n(2), hint: same('$e^{\\ln 3}=3$'), explanation: same('$e^{\\ln 3}-e^0=3-1=2$') },
    { id: 18, stage: 'areas', prompt: areaOn('x^2-4', '[0,\\,3]'), expected: f(23, 3), hint: say('Kurbak ardatza $x=2$ puntuan mozten du.', 'La curva corta el eje en $x=2$.', 'يقطع المنحنى المحور عند $x=2$.', 'The curve crosses the axis at $x=2$.'), explanation: same('$\\begin{aligned}&\\left|\\int_0^2(x^2-4)\\,dx\\right|=\\frac{16}{3}\\\\ &\\int_2^3(x^2-4)\\,dx=\\frac{7}{3}\\\\ &\\frac{16}{3}+\\frac{7}{3}=\\frac{23}{3}\\end{aligned}$') },
    { id: 19, stage: 'areas', prompt: areaCurves('x^2', '4x'), expected: f(32, 3), hint: say('Ebaki-puntuak: $x^2=4x$.', 'Los cortes: $x^2=4x$.', 'نقاط التقاطع: $x^2=4x$.', 'The crossings: $x^2=4x$.'), explanation: same('$\\begin{aligned}&\\int_0^4(4x-x^2)\\,dx\\\\ &=32-\\frac{64}{3}=\\frac{32}{3}\\end{aligned}$') },
    { id: 20, stage: 'areas', prompt: say('Aurkitu $y=x^3$ eta $y=4x$ kurben arteko azalera, $x\\ge 0$ denean.', 'Halla el área entre $y=x^3$ e $y=4x$ para $x\\ge 0$.', 'أوجد المساحة بين $y=x^3$ و$y=4x$ عندما $x\\ge 0$.', 'Find the area between $y=x^3$ and $y=4x$ for $x\\ge 0$.'), expected: n(4), hint: say('$x^3=4x$ eginda, $x=0$ eta $x=2$.', '$x^3=4x$ da $x=0$ y $x=2$.', '$x^3=4x$ يعطي $x=0$ و$x=2$.', '$x^3=4x$ gives $x=0$ and $x=2$.'), explanation: same('$\\int_0^2(4x-x^3)\\,dx=8-4=4$') }
]

export const bachIntegralsChallenges: ChallengeItem[] = [
    { id: 101, stage: 'primitives', points: 10, context: 'starter', prompt: say('$F$ funtzioa $f(x)=3x^2$ funtzioaren edozein jatorrizko izanik, zenbat da $F(2)-F(0)$?', 'Para cualquier primitiva $F$ de $f(x)=3x^2$, ¿cuánto vale $F(2)-F(0)$?', 'لأي دالة أصلية $F$ لـ $f(x)=3x^2$، كم يساوي $F(2)-F(0)$؟', 'For any antiderivative $F$ of $f(x)=3x^2$, what is $F(2)-F(0)$?'), expected: n(8), hint: same('$F(x)=x^3+k$'), explanation: say('$(8+k)-(0+k)=8$: $k$ konstantea desagertu egiten da.', '$(8+k)-(0+k)=8$: la constante $k$ se va.', '$(8+k)-(0+k)=8$: يختفي الثابت $k$.', '$(8+k)-(0+k)=8$: the constant $k$ goes away.') },
    { id: 102, stage: 'primitives', points: 20, context: 'advanced', prompt: say('$f(x)=2x-4$ funtzioaren jatorrizko batek bere minimoa $(2,\\,1)$ puntuan du. Kalkulatu $F(0)$.', 'Una primitiva de $f(x)=2x-4$ tiene su mínimo en $(2,\\,1)$. Calcula $F(0)$.', 'دالة أصلية لـ $f(x)=2x-4$ قيمتها الصغرى عند $(2,\\,1)$. احسب $F(0)$.', 'An antiderivative of $f(x)=2x-4$ has its minimum at $(2,\\,1)$. Work out $F(0)$.'), expected: n(5), hint: same('$\\begin{aligned}&F(x)=x^2-4x+k\\\\ &F(2)=1\\end{aligned}$'), explanation: same('$\\begin{aligned}&4-8+k=1\\ \\to\\ k=5\\\\ &F(0)=5\\end{aligned}$') },
    { id: 103, stage: 'primitives', points: 30, context: 'master', prompt: say('$F$ funtzioaren grafikoak $(0,\\,1)$ puntutik pasatzen du, eta puntu bakoitzean haren malda $F\'(x)=6x^2-2x$ da. Kalkulatu $F(2)$.', 'La gráfica de $F$ pasa por $(0,\\,1)$ y su pendiente en cada punto es $F\'(x)=6x^2-2x$. Calcula $F(2)$.', 'يمر منحنى $F$ بالنقطة $(0,\\,1)$ وميله عند كل نقطة $F\'(x)=6x^2-2x$. احسب $F(2)$.', 'The graph of $F$ goes through $(0,\\,1)$ and its slope at each point is $F\'(x)=6x^2-2x$. Work out $F(2)$.'), expected: n(13), hint: say('Integratu malda, eta erabili puntua.', 'Integra la pendiente y usa el punto.', 'كامِل الميل واستعمل النقطة.', 'Integrate the slope and use the point.'), explanation: same('$\\begin{aligned}&F(x)=2x^3-x^2+1\\\\ &F(2)=16-4+1=13\\end{aligned}$') },
    { id: 104, stage: 'immediate', points: 10, context: 'starter', prompt: say('$F(x)=e^x+k$ funtzioak $F(0)=5$ betetzen du. Aurkitu $k$.', '$F(x)=e^x+k$ cumple $F(0)=5$. Halla $k$.', 'الدالة $F(x)=e^x+k$ تحقق $F(0)=5$. أوجد $k$.', '$F(x)=e^x+k$ satisfies $F(0)=5$. Find $k$.'), expected: n(4), hint: same('$e^0=1$'), explanation: same('$1+k=5\\ \\to\\ k=4$') },
    { id: 105, stage: 'immediate', points: 20, context: 'advanced', prompt: say('$F$ funtzioa $\\sin x+\\cos x$ funtzioaren jatorrizkoa da, eta $F(0)=5$. Aurkitu haren $k$.', '$F$ es una primitiva de $\\sin x+\\cos x$ con $F(0)=5$. Halla su $k$.', '$F$ دالة أصلية لـ $\\sin x+\\cos x$ مع $F(0)=5$. أوجد $k$ لها.', '$F$ is an antiderivative of $\\sin x+\\cos x$ with $F(0)=5$. Find its $k$.'), expected: n(6), hint: say('Kontuz sinuaren integralaren zeinuarekin.', 'Cuidado con el signo de la integral del seno.', 'انتبه لإشارة تكامل الجيب.', 'Watch the sign of the integral of sine.'), explanation: same('$\\begin{aligned}&F(x)=-\\cos x+\\sin x+k\\\\ &-1+0+k=5\\ \\to\\ k=6\\end{aligned}$') },
    { id: 106, stage: 'immediate', points: 30, context: 'master', prompt: say('$F$ funtzioa $\\frac{1}{x^2+4x+5}$ funtzioaren jatorrizkoa da, eta $F(-2)=3$. Aurkitu haren $k$.', '$F$ es una primitiva de $\\frac{1}{x^2+4x+5}$ con $F(-2)=3$. Halla su $k$.', '$F$ دالة أصلية لـ $\\frac{1}{x^2+4x+5}$ مع $F(-2)=3$. أوجد $k$ لها.', '$F$ is an antiderivative of $\\frac{1}{x^2+4x+5}$ with $F(-2)=3$. Find its $k$.'), expected: n(3), hint: same('$x^2+4x+5=(x+2)^2+1$'), explanation: same('$\\begin{aligned}&F(x)=\\arctan(x+2)+k\\\\ &\\arctan 0+k=3\\ \\to\\ k=3\\end{aligned}$') },
    { id: 107, stage: 'compound', points: 10, context: 'starter', prompt: say('$F$ funtzioa $2x\\,e^{x^2}$ funtzioaren jatorrizkoa da, eta $F(0)=3$. Aurkitu haren $k$.', '$F$ es una primitiva de $2x\\,e^{x^2}$ con $F(0)=3$. Halla su $k$.', '$F$ دالة أصلية لـ $2x\\,e^{x^2}$ مع $F(0)=3$. أوجد $k$ لها.', '$F$ is an antiderivative of $2x\\,e^{x^2}$ with $F(0)=3$. Find its $k$.'), expected: n(2), hint: same('$\\int u\'e^u\\,dx=e^u+k$'), explanation: same('$\\begin{aligned}&F(x)=e^{x^2}+k\\\\ &1+k=3\\ \\to\\ k=2\\end{aligned}$') },
    { id: 108, stage: 'compound', points: 20, context: 'advanced', prompt: say('$\\int x^2(x^3+1)^4\\,dx=a(x^3+1)^5+k$. Aurkitu $a$.', '$\\int x^2(x^3+1)^4\\,dx=a(x^3+1)^5+k$. Halla $a$.', '$\\int x^2(x^3+1)^4\\,dx=a(x^3+1)^5+k$. أوجد $a$.', '$\\int x^2(x^3+1)^4\\,dx=a(x^3+1)^5+k$. Find $a$.'), expected: f(1, 15), hint: say('$u\'=3x^2$: 3 bat falta da.', '$u\'=3x^2$: falta un 3.', '$u\'=3x^2$: ينقص 3.', '$u\'=3x^2$: a 3 is missing.'), explanation: same('$\\frac{1}{3}\\cdot\\frac{(x^3+1)^5}{5}+k,\\ a=\\frac{1}{15}$') },
    { id: 109, stage: 'compound', points: 30, context: 'master', prompt: say('$\\int\\frac{x+1}{x^2+2x+5}\\,dx=a\\ln(x^2+2x+5)+k$. Aurkitu $a$.', '$\\int\\frac{x+1}{x^2+2x+5}\\,dx=a\\ln(x^2+2x+5)+k$. Halla $a$.', '$\\int\\frac{x+1}{x^2+2x+5}\\,dx=a\\ln(x^2+2x+5)+k$. أوجد $a$.', '$\\int\\frac{x+1}{x^2+2x+5}\\,dx=a\\ln(x^2+2x+5)+k$. Find $a$.'), expected: f(1, 2), hint: say('Deribatu izendatzailea, eta konparatu zenbakitzailearekin.', 'Deriva el denominador y compáralo con el numerador.', 'اشتق المقام وقارنه بالبسط.', 'Differentiate the denominator and compare it with the numerator.'), explanation: same('$\\begin{aligned}&(x^2+2x+5)\'=2(x+1)\\\\ &\\to\\ a=\\frac{1}{2}\\end{aligned}$') },
    { id: 110, stage: 'definite', points: 10, context: 'starter', prompt: work('\\int_0^2(3x^2-2x)\\,dx'), expected: n(4), hint: same('$F(x)=x^3-x^2$'), explanation: same('$\\left[x^3-x^2\\right]_0^2=8-4=4$') },
    { id: 111, stage: 'definite', points: 20, context: 'advanced', prompt: work('\\int_0^1 2x(x^2+1)^3\\,dx'), expected: f(15, 4), hint: same('$F(x)=\\frac{(x^2+1)^4}{4}$'), explanation: same('$\\frac{2^4}{4}-\\frac{1^4}{4}=\\frac{16}{4}-\\frac{1}{4}=\\frac{15}{4}$') },
    { id: 112, stage: 'definite', points: 30, context: 'master', prompt: say('Aurkitu $a>0$ zenbakia, $\\int_0^a 2x\\,dx=9$ izan dadin.', 'Halla $a>0$ para que $\\int_0^a 2x\\,dx=9$.', 'أوجد $a>0$ بحيث يكون $\\int_0^a 2x\\,dx=9$.', 'Find $a>0$ so that $\\int_0^a 2x\\,dx=9$.'), expected: n(3), hint: say('Barrow-ren erregelak $a^2$ ematen du.', 'La regla de Barrow da $a^2$.', 'قاعدة بارو تعطي $a^2$.', 'Barrow\'s rule gives $a^2$.'), explanation: same('$\\left[x^2\\right]_0^a=a^2=9\\ \\to\\ a=3$') },
    { id: 113, stage: 'areas', points: 10, context: 'starter', prompt: say('Aurkitu $f(x)=2x$ zuzenak, X ardatzak eta $x=3$ zuzenak mugatutako azalera.', 'Halla el área entre $f(x)=2x$, el eje X y la recta $x=3$.', 'أوجد المساحة بين $f(x)=2x$ ومحور X والمستقيم $x=3$.', 'Find the area between $f(x)=2x$, the x-axis and the line $x=3$.'), expected: n(9), hint: say('Triangelu bat da.', 'Es un triángulo.', 'إنه مثلث.', 'It is a triangle.'), explanation: same('$\\int_0^3 2x\\,dx=\\frac{3\\cdot 6}{2}=9$') },
    { id: 114, stage: 'areas', points: 20, context: 'advanced', prompt: areaOn('x^3-x', '[-1,\\,1]'), expected: f(1, 2), hint: say('Integrala 0 da, baina azalera ez.', 'La integral da 0, pero el área no.', 'التكامل يعطي 0 لكن المساحة لا.', 'The integral is 0, but the area is not.'), explanation: same('$\\begin{aligned}&\\int_{-1}^{0}(x^3-x)\\,dx=\\frac{1}{4}\\\\ &\\left|\\int_0^1(x^3-x)\\,dx\\right|=\\frac{1}{4}\\\\ &\\frac{1}{4}+\\frac{1}{4}=\\frac{1}{2}\\end{aligned}$') },
    { id: 115, stage: 'areas', points: 30, context: 'master', prompt: areaCurves('6-x^2', 'x^2-2'), expected: f(64, 3), hint: say('Ebaki-puntuak: $2x^2=8$.', 'Los cortes: $2x^2=8$.', 'نقاط التقاطع: $2x^2=8$.', 'The crossings: $2x^2=8$.'), explanation: same('$\\begin{aligned}&\\int_{-2}^{2}(8-2x^2)\\,dx\\\\ &=\\frac{32}{3}+\\frac{32}{3}=\\frac{64}{3}\\end{aligned}$') }
]

export const bachIntegralsExerciseBank: ExerciseSection[] = [
    {
        id: 'primitives',
        title: say('Jatorrizkoak', 'Primitivas', 'الدوال الأصلية', 'Antiderivatives'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Egiaztatu $F(x)=x^4-3x$ funtzioa $f(x)=4x^3-3$ funtzioaren jatorrizkoa den.', 'Comprueba si $F(x)=x^4-3x$ es una primitiva de $f(x)=4x^3-3$.', 'تحقق هل $F(x)=x^4-3x$ دالة أصلية لـ $f(x)=4x^3-3$.', 'Check whether $F(x)=x^4-3x$ is an antiderivative of $f(x)=4x^3-3$.'), solution: say('Bai: $F\'(x)=4x^3-3$.', 'Sí: $F\'(x)=4x^3-3$.', 'نعم: $F\'(x)=4x^3-3$.', 'Yes: $F\'(x)=4x^3-3$.') },
            { id: 2, difficulty: 'easy', question: work('\\int(5x^4+2)\\,dx'), solution: same('$x^5+2x+k$') },
            { id: 3, difficulty: 'easy', question: work('\\int 7\\,dx'), solution: same('$7x+k$') },
            { id: 4, difficulty: 'medium', question: work('\\int(x^2-3x+2)\\,dx'), solution: same('$\\frac{x^3}{3}-\\frac{3x^2}{2}+2x+k$') },
            { id: 5, difficulty: 'medium', question: work('\\int\\sqrt[3]{x}\\,dx'), solution: same('$\\int x^{\\frac{1}{3}}\\,dx=\\frac{3}{4}x^{\\frac{4}{3}}+k$') },
            { id: 6, difficulty: 'medium', question: work('\\int\\frac{4}{x^3}\\,dx'), solution: same('$\\begin{aligned}&\\int 4x^{-3}\\,dx=-2x^{-2}+k\\\\ &=-\\frac{2}{x^2}+k\\end{aligned}$') },
            { id: 7, difficulty: 'medium', question: say('Kalkulatu $\\int(2x+1)^2\\,dx$, karratua garatuta.', 'Calcula $\\int(2x+1)^2\\,dx$ desarrollando el cuadrado.', 'احسب $\\int(2x+1)^2\\,dx$ بفك المربع.', 'Work out $\\int(2x+1)^2\\,dx$ by expanding the square.'), solution: same('$\\begin{aligned}&\\int(4x^2+4x+1)\\,dx\\\\ &=\\frac{4x^3}{3}+2x^2+x+k\\end{aligned}$') },
            { id: 8, difficulty: 'medium', question: say('Aurkitu $f(x)=3x^2-2$ funtzioaren jatorrizkoa, $(1,\\,4)$ puntutik pasatzen dena.', 'Halla la primitiva de $f(x)=3x^2-2$ que pasa por $(1,\\,4)$.', 'أوجد الدالة الأصلية لـ $f(x)=3x^2-2$ التي تمر بالنقطة $(1,\\,4)$.', 'Find the antiderivative of $f(x)=3x^2-2$ through $(1,\\,4)$.'), solution: same('$\\begin{aligned}&F(x)=x^3-2x+k\\\\ &1-2+k=4\\ \\to\\ k=5\\end{aligned}$') },
            { id: 9, difficulty: 'hard', question: say('$F\'(x)=6x$ da, eta $F$ funtzioaren zuzen ukitzailea $x=1$ puntuan $y=6x-1$ da. Aurkitu $F$.', '$F\'(x)=6x$ y la tangente a $F$ en $x=1$ es $y=6x-1$. Halla $F$.', '$F\'(x)=6x$ والمماس لـ $F$ عند $x=1$ هو $y=6x-1$. أوجد $F$.', '$F\'(x)=6x$ and the tangent to $F$ at $x=1$ is $y=6x-1$. Find $F$.'), solution: say('Ukitzaileak $(1,\\,5)$ puntutik pasatzen du: $3+k=5$, $k=2$ eta $F(x)=3x^2+2$.', 'La tangente pasa por $(1,\\,5)$: $3+k=5$, $k=2$ y $F(x)=3x^2+2$.', 'يمر المماس بالنقطة $(1,\\,5)$: $3+k=5$ و$k=2$ و$F(x)=3x^2+2$.', 'The tangent goes through $(1,\\,5)$: $3+k=5$, $k=2$ and $F(x)=3x^2+2$.') },
            { id: 10, difficulty: 'hard', question: say('$F\'\'(x)=6x$, $F\'(0)=1$ eta $F(0)=2$ badira, aurkitu $F$.', 'Si $F\'\'(x)=6x$, $F\'(0)=1$ y $F(0)=2$, halla $F$.', 'إذا كان $F\'\'(x)=6x$ و$F\'(0)=1$ و$F(0)=2$ فأوجد $F$.', 'If $F\'\'(x)=6x$, $F\'(0)=1$ and $F(0)=2$, find $F$.'), solution: say('Bi aldiz integratu: $F\'(x)=3x^2+1$ eta $F(x)=x^3+x+2$.', 'Se integra dos veces: $F\'(x)=3x^2+1$ y $F(x)=x^3+x+2$.', 'نكامل مرتين: $F\'(x)=3x^2+1$ و$F(x)=x^3+x+2$.', 'Integrate twice: $F\'(x)=3x^2+1$ and $F(x)=x^3+x+2$.') }
        ]
    },
    {
        id: 'immediate',
        title: say('Integral berehalakoak', 'Integrales inmediatas', 'التكاملات المباشرة', 'Basic integrals'),
        items: [
            { id: 11, difficulty: 'easy', question: work('\\int 3e^x\\,dx'), solution: same('$3e^x+k$') },
            { id: 12, difficulty: 'easy', question: work('\\int\\frac{5}{x}\\,dx'), solution: same('$5\\ln|x|+k$') },
            { id: 13, difficulty: 'easy', question: work('\\int 2\\cos x\\,dx'), solution: same('$2\\sin x+k$') },
            { id: 14, difficulty: 'medium', question: work('\\int 3^x\\,dx'), solution: same('$\\frac{3^x}{\\ln 3}+k$') },
            { id: 15, difficulty: 'medium', question: work('\\int\\left(e^x-\\frac{2}{x}+x\\right)dx'), solution: same('$e^x-2\\ln|x|+\\frac{x^2}{2}+k$') },
            { id: 16, difficulty: 'medium', question: work('\\int\\tan^2 x\\,dx'), solution: say('$\\tan^2 x=(1+\\tan^2 x)-1$ denez, $\\int\\tan^2 x\\,dx=\\tan x-x+k$.', 'Como $\\tan^2 x=(1+\\tan^2 x)-1$, $\\int\\tan^2 x\\,dx=\\tan x-x+k$.', 'بما أن $\\tan^2 x=(1+\\tan^2 x)-1$ فإن $\\int\\tan^2 x\\,dx=\\tan x-x+k$.', 'As $\\tan^2 x=(1+\\tan^2 x)-1$, $\\int\\tan^2 x\\,dx=\\tan x-x+k$.') },
            { id: 17, difficulty: 'medium', question: work('\\int\\frac{3}{1+x^2}\\,dx'), solution: same('$3\\arctan x+k$') },
            { id: 18, difficulty: 'medium', question: work('\\int\\frac{2}{\\sqrt{1-x^2}}\\,dx'), solution: same('$2\\arcsin x+k$') },
            { id: 19, difficulty: 'hard', question: work('\\int\\frac{dx}{x^2-2x+2}'), solution: say('$x^2-2x+2=(x-1)^2+1$, eta integrala $\\arctan(x-1)+k$ da.', '$x^2-2x+2=(x-1)^2+1$, y la integral es $\\arctan(x-1)+k$.', '$x^2-2x+2=(x-1)^2+1$، والتكامل $\\arctan(x-1)+k$.', '$x^2-2x+2=(x-1)^2+1$, and the integral is $\\arctan(x-1)+k$.') },
            { id: 20, difficulty: 'hard', question: work('\\int\\frac{x^2}{1+x^2}\\,dx'), solution: say('$\\frac{x^2}{1+x^2}=1-\\frac{1}{1+x^2}$ denez, integrala $x-\\arctan x+k$ da.', 'Como $\\frac{x^2}{1+x^2}=1-\\frac{1}{1+x^2}$, la integral es $x-\\arctan x+k$.', 'بما أن $\\frac{x^2}{1+x^2}=1-\\frac{1}{1+x^2}$ فالتكامل $x-\\arctan x+k$.', 'As $\\frac{x^2}{1+x^2}=1-\\frac{1}{1+x^2}$, the integral is $x-\\arctan x+k$.') }
        ]
    },
    {
        id: 'compound',
        title: say('Integral konposatuak', 'Integrales compuestas', 'التكاملات المركّبة', 'Composite integrals'),
        items: [
            { id: 21, difficulty: 'easy', question: work('\\int 2x(x^2-1)^5\\,dx'), solution: same('$\\frac{(x^2-1)^6}{6}+k$') },
            { id: 22, difficulty: 'easy', question: work('\\int 3e^{3x}\\,dx'), solution: same('$e^{3x}+k$') },
            { id: 23, difficulty: 'easy', question: work('\\int\\frac{2x}{x^2+7}\\,dx'), solution: same('$\\ln(x^2+7)+k$') },
            { id: 24, difficulty: 'medium', question: work('\\int e^{-2x}\\,dx'), solution: same('$-\\frac{1}{2}e^{-2x}+k$') },
            { id: 25, difficulty: 'medium', question: work('\\int\\cos(5x)\\,dx'), solution: same('$\\frac{1}{5}\\sin(5x)+k$') },
            { id: 26, difficulty: 'medium', question: work('\\int x(x^2+3)^4\\,dx'), solution: same('$\\begin{aligned}&\\frac{1}{2}\\int 2x(x^2+3)^4\\,dx\\\\ &=\\frac{(x^2+3)^5}{10}+k\\end{aligned}$') },
            { id: 27, difficulty: 'medium', question: work('\\int\\frac{x}{x^2+1}\\,dx'), solution: same('$\\frac{1}{2}\\ln(x^2+1)+k$') },
            { id: 28, difficulty: 'medium', question: work('\\int\\sqrt{2x+1}\\,dx'), solution: same('$\\begin{aligned}&\\frac{1}{2}\\int 2(2x+1)^{\\frac{1}{2}}\\,dx\\\\ &=\\frac{1}{3}(2x+1)^{\\frac{3}{2}}+k\\end{aligned}$') },
            { id: 29, difficulty: 'hard', question: work('\\int\\frac{\\ln x}{x}\\,dx'), solution: say('$u=\\ln x$ bada, $u\'=\\frac{1}{x}$: integrala $\\frac{(\\ln x)^2}{2}+k$ da.', 'Con $u=\\ln x$, $u\'=\\frac{1}{x}$: la integral es $\\frac{(\\ln x)^2}{2}+k$.', 'مع $u=\\ln x$ يكون $u\'=\\frac{1}{x}$: التكامل $\\frac{(\\ln x)^2}{2}+k$.', 'With $u=\\ln x$, $u\'=\\frac{1}{x}$: the integral is $\\frac{(\\ln x)^2}{2}+k$.') },
            { id: 30, difficulty: 'hard', question: work('\\int\\sin x\\cos^3 x\\,dx'), solution: say('$u=\\cos x$ bada, $u\'=-\\sin x$: integrala $-\\frac{\\cos^4 x}{4}+k$ da.', 'Con $u=\\cos x$, $u\'=-\\sin x$: la integral es $-\\frac{\\cos^4 x}{4}+k$.', 'مع $u=\\cos x$ يكون $u\'=-\\sin x$: التكامل $-\\frac{\\cos^4 x}{4}+k$.', 'With $u=\\cos x$, $u\'=-\\sin x$: the integral is $-\\frac{\\cos^4 x}{4}+k$.') }
        ]
    },
    {
        id: 'definite',
        title: say('Integral mugatua', 'La integral definida', 'التكامل المحدد', 'The definite integral'),
        items: [
            { id: 31, difficulty: 'easy', question: work('\\int_0^2 3x^2\\,dx'), solution: same('$\\left[x^3\\right]_0^2=8-0=8$'), answer: { expected: n(8) } },
            { id: 32, difficulty: 'easy', question: work('\\int_1^3 2\\,dx'), solution: same('$\\left[2x\\right]_1^3=6-2=4$'), answer: { expected: n(4) } },
            { id: 33, difficulty: 'easy', question: say('Hurbildu $\\int_0^2 x^3\\,dx$, 1 oinarriko 2 laukizuzenekin eta altuera eskuinean hartuta.', 'Aproxima $\\int_0^2 x^3\\,dx$ con 2 rectángulos de base 1 y la altura a la derecha.', 'قرّب $\\int_0^2 x^3\\,dx$ بمستطيلين قاعدة كل منهما 1 والارتفاع عند اليمين.', 'Approximate $\\int_0^2 x^3\\,dx$ with 2 rectangles of base 1 and the height on the right.'), solution: same('$1\\cdot 1+1\\cdot 8=9$'), answer: { expected: n(9) } },
            { id: 34, difficulty: 'medium', question: work('\\int_{-1}^{2}(x^2+1)\\,dx'), solution: same('$\\left[\\frac{x^3}{3}+x\\right]_{-1}^{2}=\\frac{14}{3}+\\frac{4}{3}=6$'), answer: { expected: n(6) } },
            { id: 35, difficulty: 'medium', question: work('\\int_1^{e^2}\\frac{1}{x}\\,dx'), solution: same('$\\left[\\ln x\\right]_1^{e^2}=2-0=2$'), answer: { expected: n(2) } },
            { id: 36, difficulty: 'medium', question: work('\\int_0^{\\frac{\\pi}{2}}\\cos x\\,dx'), solution: same('$\\left[\\sin x\\right]_0^{\\frac{\\pi}{2}}=1-0=1$'), answer: { expected: n(1) } },
            { id: 37, difficulty: 'medium', question: work('\\int_0^1 e^{2x}\\,dx'), solution: same('$\\left[\\frac{e^{2x}}{2}\\right]_0^1=\\frac{e^2-1}{2}$') },
            { id: 38, difficulty: 'medium', question: say('$\\int_0^4 f(x)\\,dx=10$ bada, kalkulatu $\\int_0^4(3f(x)+1)\\,dx$.', 'Si $\\int_0^4 f(x)\\,dx=10$, calcula $\\int_0^4(3f(x)+1)\\,dx$.', 'إذا كان $\\int_0^4 f(x)\\,dx=10$ فاحسب $\\int_0^4(3f(x)+1)\\,dx$.', 'If $\\int_0^4 f(x)\\,dx=10$, work out $\\int_0^4(3f(x)+1)\\,dx$.'), solution: same('$\\begin{aligned}&3\\cdot 10+\\int_0^4 1\\,dx\\\\ &=30+4=34\\end{aligned}$'), answer: { expected: n(34) } },
            { id: 39, difficulty: 'hard', question: say('Aurkitu $a>0$ zenbakia, $\\int_0^a(2x+1)\\,dx=6$ izan dadin.', 'Halla $a>0$ para que $\\int_0^a(2x+1)\\,dx=6$.', 'أوجد $a>0$ بحيث يكون $\\int_0^a(2x+1)\\,dx=6$.', 'Find $a>0$ so that $\\int_0^a(2x+1)\\,dx=6$.'), solution: same('$\\begin{aligned}&a^2+a=6\\\\ &a^2+a-6=0\\ \\to\\ a=2\\end{aligned}$'), answer: { expected: n(2) } },
            { id: 40, difficulty: 'hard', question: work('\\int_0^2|x-1|\\,dx'), solution: say('1 puntuan zatitzen da: $\\int_0^1(1-x)\\,dx+\\int_1^2(x-1)\\,dx=\\frac{1}{2}+\\frac{1}{2}=1$.', 'Se parte en 1: $\\int_0^1(1-x)\\,dx+\\int_1^2(x-1)\\,dx=\\frac{1}{2}+\\frac{1}{2}=1$.', 'نقسم عند 1: $\\int_0^1(1-x)\\,dx+\\int_1^2(x-1)\\,dx=\\frac{1}{2}+\\frac{1}{2}=1$.', 'Split at 1: $\\int_0^1(1-x)\\,dx+\\int_1^2(x-1)\\,dx=\\frac{1}{2}+\\frac{1}{2}=1$.'), answer: { expected: n(1) } }
        ]
    },
    {
        id: 'areas',
        title: say('Azalerak', 'Áreas', 'المساحات', 'Areas'),
        items: [
            { id: 41, difficulty: 'easy', question: areaBetweenLines('x^2', '0', '2'), solution: same('$\\left[\\frac{x^3}{3}\\right]_0^2=\\frac{8}{3}$'), answer: { expected: f(8, 3) } },
            { id: 42, difficulty: 'easy', question: areaBetweenLines('3', '1', '5'), solution: say('Laukizuzen bat da: $\\int_1^5 3\\,dx=3\\cdot 4=12$.', 'Es un rectángulo: $\\int_1^5 3\\,dx=3\\cdot 4=12$.', 'إنه مستطيل: $\\int_1^5 3\\,dx=3\\cdot 4=12$.', 'It is a rectangle: $\\int_1^5 3\\,dx=3\\cdot 4=12$.'), answer: { expected: n(12) } },
            { id: 43, difficulty: 'easy', question: say('Aurkitu $f(x)=1-x^2$ kurbaren eta X ardatzaren arteko azalera.', 'Halla el área entre $f(x)=1-x^2$ y el eje X.', 'أوجد المساحة بين $f(x)=1-x^2$ ومحور X.', 'Find the area between $f(x)=1-x^2$ and the x-axis.'), solution: same('$\\left[x-\\frac{x^3}{3}\\right]_{-1}^{1}=\\frac{2}{3}+\\frac{2}{3}=\\frac{4}{3}$'), answer: { expected: f(4, 3) } },
            { id: 44, difficulty: 'medium', question: areaOn('x^2-1', '[0,\\,2]'), solution: same('$\\begin{aligned}&\\left|\\int_0^1(x^2-1)\\,dx\\right|=\\frac{2}{3}\\\\ &\\int_1^2(x^2-1)\\,dx=\\frac{4}{3}\\\\ &\\frac{2}{3}+\\frac{4}{3}=2\\end{aligned}$'), answer: { expected: n(2) } },
            { id: 45, difficulty: 'medium', question: areaOn('\\cos x', '\\left[0,\\,\\frac{3\\pi}{2}\\right]'), solution: say('$\\frac{\\pi}{2}$ puntuan zatitzen da: $\\int_0^{\\frac{\\pi}{2}}\\cos x\\,dx=1$ eta $\\int_{\\frac{\\pi}{2}}^{\\frac{3\\pi}{2}}\\cos x\\,dx=-2$. Azalera $1+2=3$ da.', 'Se parte en $\\frac{\\pi}{2}$: $\\int_0^{\\frac{\\pi}{2}}\\cos x\\,dx=1$ y $\\int_{\\frac{\\pi}{2}}^{\\frac{3\\pi}{2}}\\cos x\\,dx=-2$. El área es $1+2=3$.', 'نقسم عند $\\frac{\\pi}{2}$: $\\int_0^{\\frac{\\pi}{2}}\\cos x\\,dx=1$ و$\\int_{\\frac{\\pi}{2}}^{\\frac{3\\pi}{2}}\\cos x\\,dx=-2$. والمساحة $1+2=3$.', 'Split at $\\frac{\\pi}{2}$: $\\int_0^{\\frac{\\pi}{2}}\\cos x\\,dx=1$ and $\\int_{\\frac{\\pi}{2}}^{\\frac{3\\pi}{2}}\\cos x\\,dx=-2$. The area is $1+2=3$.'), answer: { expected: n(3) } },
            { id: 46, difficulty: 'medium', question: areaCurves('2x^2', '2x'), solution: same('$\\begin{aligned}&\\int_0^1(2x-2x^2)\\,dx\\\\ &=1-\\frac{2}{3}=\\frac{1}{3}\\end{aligned}$'), answer: { expected: f(1, 3) } },
            { id: 47, difficulty: 'medium', question: areaCurves('4-x^2', 'x+2'), solution: same('$\\begin{aligned}&x^2+x-2=0\\\\ &x=-2,\\ x=1\\\\ &\\int_{-2}^{1}(2-x-x^2)\\,dx\\\\ &=\\frac{9}{2}\\end{aligned}$'), answer: { expected: f(9, 2) } },
            { id: 48, difficulty: 'medium', question: areaBetweenLines('e^x', '0', '1'), solution: same('$\\left[e^x\\right]_0^1=e-1$') },
            { id: 49, difficulty: 'hard', question: say('Aurkitu $f(x)=x^3-4x$ kurbaren eta X ardatzaren arteko azalera osoa.', 'Halla el área total entre $f(x)=x^3-4x$ y el eje X.', 'أوجد المساحة الكلية بين $f(x)=x^3-4x$ ومحور X.', 'Find the total area between $f(x)=x^3-4x$ and the x-axis.'), solution: same('$\\begin{aligned}&\\int_{-2}^{0}(x^3-4x)\\,dx=4\\\\ &\\left|\\int_0^2(x^3-4x)\\,dx\\right|=4\\\\ &4+4=8\\end{aligned}$'), answer: { expected: n(8) } },
            { id: 50, difficulty: 'hard', question: areaCurves('x^2-4x', '-x^2+2x'), solution: same('$\\begin{aligned}&2x^2-6x=0\\\\ &x=0,\\ x=3\\\\ &\\int_0^3(6x-2x^2)\\,dx\\\\ &=27-18=9\\end{aligned}$'), answer: { expected: n(9) } }
        ]
    }
]

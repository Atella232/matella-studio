import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Integralak · Batxilergoa 2 · Gizarte Zientziak — diagnostic, guided
   practice, exercise bank and challenges, with the scope of unit 9 of
   Santillana and Anaya 2.º Bachillerato CCSS (all the exercises, numbers
   and contexts are our own). Every closed answer is a single number: a
   value of an antiderivative, a constant, a definite integral, an area,
   a cost, what piles up over a period or a rise in income.
   ========================================================================== */

const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

/** «Work out ∫ …» */
const integrate = (latex: string) => say(`Kalkulatu $\\int ${latex}$.`, `Calcula $\\int ${latex}$.`, `احسب $\\int ${latex}$.`, `Work out $\\int ${latex}$.`)
/** «Work out ∫ₐᵇ …» */
const definite = (a: string, b: string, latex: string) => say(`Kalkulatu $\\int_{${a}}^{${b}} ${latex}$.`, `Calcula $\\int_{${a}}^{${b}} ${latex}$.`, `احسب $\\int_{${a}}^{${b}} ${latex}$.`, `Work out $\\int_{${a}}^{${b}} ${latex}$.`)
/** «The area under y = … on [a, b]» */
const areaUnder = (latex: string, a: string, b: string) => say(`Kalkulatu $y=${latex}$ kurbaren azpiko azalera $[${a},${b}]$ tartean.`, `Calcula el área bajo $y=${latex}$ en $[${a},${b}]$.`, `احسب المساحة تحت $y=${latex}$ على $[${a},${b}]$.`, `Work out the area under $y=${latex}$ on $[${a},${b}]$.`)
/** «The area between y = … and the X axis» */
const areaAxis = (latex: string, extra = '') => say(`Kalkulatu $y=${latex}$ kurbaren eta $X$ ardatzaren arteko azalera${extra ? `, $${extra}$ tartean` : ''}.`, `Calcula el área entre $y=${latex}$ y el eje $X$${extra ? ` en $${extra}$` : ''}.`, `احسب المساحة بين $y=${latex}$ ومحور $X$${extra ? ` على $${extra}$` : ''}.`, `Work out the area between $y=${latex}$ and the $X$ axis${extra ? ` on $${extra}$` : ''}.`)
/** «The area between two curves» */
const areaBetween = (top: string, bottom: string) => say(`Kalkulatu $y=${top}$ eta $y=${bottom}$ kurben arteko azalera.`, `Calcula el área entre $y=${top}$ e $y=${bottom}$.`, `احسب المساحة بين $y=${top}$ و$y=${bottom}$.`, `Work out the area between $y=${top}$ and $y=${bottom}$.`)

export const bach2gIntegralsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 149001,
        prompt: say('Zein da $x^3$ funtzioaren deribatua?', '¿Cuál es la derivada de $x^3$?', 'ما مشتقة $x^3$؟', 'What is the derivative of $x^3$?'),
        options: [same('$3x^2$'), same('$\\frac{x^4}{4}$'), same('$3x$')],
        correctIndex: 0,
        explanation: same("$(x^3)'=3x^2$"),
        topic: 'primitive'
    },
    {
        id: 149002,
        prompt: say('Zein funtzioren deribatua da $x^2$?', '¿De qué función es derivada $x^2$?', 'مشتقة أي دالة هي $x^2$؟', 'Which function has derivative $x^2$?'),
        options: [same('$2x$'), same('$\\frac{x^3}{3}$'), same('$x^3$')],
        correctIndex: 1,
        explanation: same("$\\left(\\frac{x^3}{3}\\right)'=x^2$"),
        topic: 'powers'
    },
    {
        id: 149003,
        prompt: say('Zein da $\\ln x$ funtzioaren deribatua?', '¿Cuál es la derivada de $\\ln x$?', 'ما مشتقة $\\ln x$؟', 'What is the derivative of $\\ln x$?'),
        options: [same('$e^{x}$'), same('$\\ln x$'), same('$\\frac{1}{x}$')],
        correctIndex: 2,
        explanation: same("$(\\ln x)'=\\frac{1}{x}$"),
        topic: 'exp-log'
    },
    {
        id: 149004,
        prompt: say('Zein da $(x^2+1)^3$ funtzioaren deribatua?', '¿Cuál es la derivada de $(x^2+1)^3$?', 'ما مشتقة $(x^2+1)^3$؟', 'What is the derivative of $(x^2+1)^3$?'),
        options: [same('$3(x^2+1)^2\\cdot 2x$'), same('$3(x^2+1)^2$'), same('$6x$')],
        correctIndex: 0,
        explanation: say('Katearen erregela: barrukoaren deribatuaz biderkatu.', 'Regla de la cadena: por la derivada de dentro.', 'قاعدة السلسلة: في مشتقة الداخل.', 'Chain rule: times the derivative of the inside.'),
        topic: 'power-chain'
    },
    {
        id: 149005,
        prompt: say('$F(x)=x^2$ bada, zenbat da $F(3)-F(1)$?', 'Si $F(x)=x^2$, ¿cuánto vale $F(3)-F(1)$?', 'إذا كانت $F(x)=x^2$ فكم تساوي $F(3)-F(1)$؟', 'If $F(x)=x^2$, what is $F(3)-F(1)$?'),
        options: [same('$10$'), same('$8$'), same('$4$')],
        correctIndex: 1,
        explanation: same('$9-1=8$'),
        topic: 'barrow'
    },
    {
        id: 149006,
        prompt: say('Zein da 4 oinarria eta 3 altuera dituen laukizuzen baten azalera?', '¿Cuál es el área de un rectángulo de base 4 y altura 3?', 'ما مساحة مستطيل قاعدته 4 وارتفاعه 3؟', 'What is the area of a rectangle with base 4 and height 3?'),
        options: [same('$7$'), same('$24$'), same('$12$')],
        correctIndex: 2,
        explanation: same('$4\\cdot 3=12$'),
        topic: 'rectangles'
    },
    {
        id: 149007,
        prompt: say('$f(x)<0$ bada $[a,b]$ tarte osoan, nolakoa da $\\int_a^b f(x)\\,dx$?', 'Si $f(x)<0$ en todo $[a,b]$, ¿cómo es $\\int_a^b f(x)\\,dx$?', 'إذا كانت $f(x)<0$ على $[a,b]$ كلها فكيف يكون $\\int_a^b f(x)\\,dx$؟', 'If $f(x)<0$ on all of $[a,b]$, what is $\\int_a^b f(x)\\,dx$ like?'),
        options: [say('Positiboa', 'Positiva', 'موجب', 'Positive'), say('Negatiboa', 'Negativa', 'سالب', 'Negative'), say('Zero', 'Cero', 'صفر', 'Zero')],
        correctIndex: 1,
        explanation: say('Ardatzaren azpiko zatiek negatibo zenbatzen dute.', 'Las partes bajo el eje cuentan en negativo.', 'الأجزاء تحت المحور تُحسب سالبة.', 'Parts below the axis count as negative.'),
        topic: 'area-sign'
    },
    {
        id: 149008,
        prompt: say('Zer esan nahi du $C\'(x)$ deribatuak, $C(x)$ kostua bada?', 'Si $C(x)$ es un coste, ¿qué significa $C\'(x)$?', 'إذا كانت $C(x)$ تكلفة فما معنى $C\'(x)$؟', 'If $C(x)$ is a cost, what does $C\'(x)$ mean?'),
        options: [say('Hurrengo unitatearen kostua, gutxi gorabehera', 'Lo que cuesta, más o menos, la unidad siguiente', 'تكلفة الوحدة التالية تقريبًا', 'Roughly what the next unit costs'), say('Batez besteko kostua', 'El coste medio', 'متوسط التكلفة', 'The average cost'), say('Kostu finkoa', 'El coste fijo', 'التكلفة الثابتة', 'The fixed cost')],
        correctIndex: 0,
        explanation: say('Deribatua hurrengo unitatearen kostua da.', 'La derivada es lo que cuesta la unidad siguiente.', 'المشتقة هي تكلفة الوحدة التالية.', 'The derivative is what the next unit costs.'),
        topic: 'cost-from-marginal'
    }
]

export const bach2gIntegralsPractice: PracticeItem[] = [
    /* ---------- Antiderivatives ---------- */
    { id: 1, stage: 'primitives', prompt: say('$F$ funtzioa $f(x)=6x^2$ funtzioaren jatorrizkoa da eta $F(0)=0$. Zenbat da $F(2)$?', '$F$ es la primitiva de $f(x)=6x^2$ con $F(0)=0$. ¿Cuánto vale $F(2)$?', '$F$ الدالة الأصلية لـ $f(x)=6x^2$ مع $F(0)=0$. كم تساوي $F(2)$؟', '$F$ is the antiderivative of $f(x)=6x^2$ with $F(0)=0$. What is $F(2)$?'), expected: n(16), hint: same('$F(x)=2x^3$'), explanation: same('$F(2)=2\\cdot 8=16$') },
    { id: 2, stage: 'primitives', prompt: say('$\\int ax^2\\,dx=4x^3+C$. Zenbat da $a$?', '$\\int ax^2\\,dx=4x^3+C$. ¿Cuánto vale $a$?', '$\\int ax^2\\,dx=4x^3+C$. كم تساوي $a$؟', '$\\int ax^2\\,dx=4x^3+C$. What is $a$?'), expected: n(12), hint: say('Deribatu $4x^3$.', 'Deriva $4x^3$.', 'اشتق $4x^3$.', 'Differentiate $4x^3$.'), explanation: same("$(4x^3)'=12x^2\\ \\to\\ a=12$") },
    { id: 3, stage: 'primitives', prompt: say('$F$ funtzioa $\\frac{1}{x}$ funtzioaren jatorrizkoa da eta $F(1)=0$. Zenbat da $F(e^2)$?', '$F$ es la primitiva de $\\frac{1}{x}$ con $F(1)=0$. ¿Cuánto vale $F(e^2)$?', '$F$ الدالة الأصلية لـ $\\frac{1}{x}$ مع $F(1)=0$. كم تساوي $F(e^2)$؟', '$F$ is the antiderivative of $\\frac{1}{x}$ with $F(1)=0$. What is $F(e^2)$?'), expected: n(2), hint: same('$F(x)=\\ln x$'), explanation: same('$\\ln e^2=2$') },
    { id: 4, stage: 'primitives', prompt: say('$F(x)=x^3+5x$ funtzioa $f$ funtzioaren jatorrizkoa da. Zenbat da $f(2)$?', '$F(x)=x^3+5x$ es una primitiva de $f$. ¿Cuánto vale $f(2)$?', '$F(x)=x^3+5x$ دالة أصلية لـ $f$. كم تساوي $f(2)$؟', '$F(x)=x^3+5x$ is an antiderivative of $f$. What is $f(2)$?'), expected: n(17), hint: same("$f=F'$"), explanation: same("$f(x)=3x^2+5\\ \\to\\ f(2)=12+5=17$") },
    /* ---------- Compound immediate integrals ---------- */
    { id: 5, stage: 'composite', prompt: say('$\\int 2x(x^2+3)^2\\,dx=\\frac{(x^2+3)^3}{k}+C$. Zenbat da $k$?', '$\\int 2x(x^2+3)^2\\,dx=\\frac{(x^2+3)^3}{k}+C$. ¿Cuánto vale $k$?', '$\\int 2x(x^2+3)^2\\,dx=\\frac{(x^2+3)^3}{k}+C$. كم تساوي $k$؟', '$\\int 2x(x^2+3)^2\\,dx=\\frac{(x^2+3)^3}{k}+C$. What is $k$?'), expected: n(3), hint: same("$(x^2+3)'=2x$"), explanation: same('$\\frac{u^3}{3}\\ \\to\\ k=3$') },
    { id: 6, stage: 'composite', prompt: say('$\\int\\frac{4x}{x^2+1}\\,dx=k\\ln(x^2+1)+C$. Zenbat da $k$?', '$\\int\\frac{4x}{x^2+1}\\,dx=k\\ln(x^2+1)+C$. ¿Cuánto vale $k$?', '$\\int\\frac{4x}{x^2+1}\\,dx=k\\ln(x^2+1)+C$. كم تساوي $k$؟', '$\\int\\frac{4x}{x^2+1}\\,dx=k\\ln(x^2+1)+C$. What is $k$?'), expected: n(2), hint: same('$4x=2\\cdot 2x$'), explanation: same('$2\\int\\frac{2x}{x^2+1}\\,dx\\ \\to\\ k=2$') },
    { id: 7, stage: 'composite', prompt: say('$F$ funtzioa $2e^{2x}$ funtzioaren jatorrizkoa da, $C=0$ izanik. Zenbat da $F(0)$?', '$F$ es la primitiva de $2e^{2x}$ con $C=0$. ¿Cuánto vale $F(0)$?', '$F$ الدالة الأصلية لـ $2e^{2x}$ مع $C=0$. كم تساوي $F(0)$؟', '$F$ is the antiderivative of $2e^{2x}$ with $C=0$. What is $F(0)$?'), expected: n(1), hint: same('$F(x)=e^{2x}$'), explanation: same('$e^{0}=1$') },
    { id: 8, stage: 'composite', prompt: say('$F\'(x)=4x-1$ eta $F(2)=9$. Zenbat da $C$?', '$F\'(x)=4x-1$ y $F(2)=9$. ¿Cuánto vale $C$?', '$F\'(x)=4x-1$ و$F(2)=9$. كم تساوي $C$؟', '$F\'(x)=4x-1$ and $F(2)=9$. What is $C$?'), expected: n(3), hint: same('$F(x)=2x^2-x+C$'), explanation: same('$8-2+C=9\\ \\to\\ C=3$') },
    /* ---------- The definite integral ---------- */
    { id: 9, stage: 'definite', prompt: definite('0', '2', '(3x^2+1)\\,dx'), expected: n(10), hint: same('$F(x)=x^3+x$'), explanation: same('$8+2=10$') },
    { id: 10, stage: 'definite', prompt: definite('1', '4', '2x\\,dx'), expected: n(15), hint: same('$F(x)=x^2$'), explanation: same('$16-1=15$') },
    { id: 11, stage: 'definite', prompt: say('$\\int_0^5 f=12$ eta $\\int_0^2 f=5$. Zenbat da $\\int_2^5 f$?', 'Si $\\int_0^5 f=12$ y $\\int_0^2 f=5$, ¿cuánto vale $\\int_2^5 f$?', 'إذا كان $\\int_0^5 f=12$ و$\\int_0^2 f=5$ فكم يساوي $\\int_2^5 f$؟', 'If $\\int_0^5 f=12$ and $\\int_0^2 f=5$, what is $\\int_2^5 f$?'), expected: n(7), hint: same('$\\int_0^5 f=\\int_0^2 f+\\int_2^5 f$'), explanation: same('$12-5=7$') },
    { id: 12, stage: 'definite', prompt: say('Hurbildu $\\int_0^2 x\\,dx$ eskuineko altuera duten 2 laukizuzenekin.', 'Aproxima $\\int_0^2 x\\,dx$ con 2 rectángulos de altura por la derecha.', 'قرّب $\\int_0^2 x\\,dx$ بمستطيلين بارتفاع الطرف الأيمن.', 'Approximate $\\int_0^2 x\\,dx$ with 2 rectangles of right-hand height.'), expected: n(3), hint: say('Zabalera 1; altuerak $f(1)$ eta $f(2)$.', 'Anchura 1; alturas $f(1)$ y $f(2)$.', 'العرض 1؛ والارتفاعان $f(1)$ و$f(2)$.', 'Width 1; heights $f(1)$ and $f(2)$.'), explanation: same('$1\\cdot(1+2)=3$') },
    /* ---------- Areas ---------- */
    { id: 13, stage: 'areas', prompt: areaUnder('3x^2', '0', '2'), expected: n(8), hint: same('$F(x)=x^3$'), explanation: same('$8-0=8$') },
    { id: 14, stage: 'areas', prompt: areaAxis('-x^2+6x'), expected: n(36), hint: same('$-x^2+6x=0\\ \\to\\ x=0,\\ x=6$'), explanation: same('$\\left[-\\frac{x^3}{3}+3x^2\\right]_0^6=-72+108=36$') },
    { id: 15, stage: 'areas', prompt: areaAxis('x^2-4', '[0,3]'), expected: f(23, 3), hint: say('Ardatza $x=2$ puntuan mozten du.', 'Corta al eje en $x=2$.', 'تقطع المحور عند $x=2$.', 'It cuts the axis at $x=2$.'), explanation: same('$\\begin{gathered}\\int_0^2=-\\frac{16}{3}\\qquad \\int_2^3=\\frac{7}{3}\\\\ \\frac{16}{3}+\\frac{7}{3}=\\frac{23}{3}\\end{gathered}$') },
    { id: 16, stage: 'areas', prompt: areaBetween('4x', 'x^2'), expected: f(32, 3), hint: same('$4x=x^2\\ \\to\\ x=0,\\ x=4$'), explanation: same('$\\left[2x^2-\\frac{x^3}{3}\\right]_0^4=32-\\frac{64}{3}=\\frac{32}{3}$') },
    /* ---------- In economics ---------- */
    { id: 17, stage: 'economy', prompt: say('$C\'(x)=6x+20$ euro eta kostu finkoa 500 euro. Zenbat da $C(10)$?', '$C\'(x)=6x+20$ euros y el coste fijo es 500 €. ¿Cuánto vale $C(10)$?', '$C\'(x)=6x+20$ يورو والتكلفة الثابتة 500 €. كم تساوي $C(10)$؟', '$C\'(x)=6x+20$ euros and the fixed cost is €500. What is $C(10)$?'), expected: n(1000), hint: same('$C(x)=3x^2+20x+500$'), explanation: same('$C(10)=300+200+500=1000$') },
    { id: 18, stage: 'economy', prompt: say('Salmentak $v(t)=4t+3$ mila dira hilean. Zenbat saltzen da lehen 5 hilabeteetan?', 'Las ventas son $v(t)=4t+3$ miles al mes. ¿Cuánto se vende en los 5 primeros meses?', 'المبيعات $v(t)=4t+3$ ألف في الشهر. كم يُباع في الأشهر الخمسة الأولى؟', 'Sales are $v(t)=4t+3$ thousand a month. How much is sold in the first 5 months?'), expected: n(65), hint: same('$\\int_0^5(4t+3)\\,dt$'), explanation: same('$\\left[2t^2+3t\\right]_0^5=50+15=65$') },
    { id: 19, stage: 'economy', prompt: say('$I\'(x)=120-4x$ euro. Zenbat igotzen dira diru-sarrerak 10 unitatetik 20 unitatera?', '$I\'(x)=120-4x$ euros. ¿Cuánto suben los ingresos de 10 a 20 unidades?', '$I\'(x)=120-4x$ يورو. كم يرتفع الإيراد من 10 إلى 20 وحدة؟', '$I\'(x)=120-4x$ euros. How much does the income rise from 10 to 20 units?'), expected: n(600), hint: same('$I(x)=120x-2x^2$'), explanation: same('$1600-1000=600$') },
    { id: 20, stage: 'economy', prompt: say('Herri bat $p(t)=3t^2$ mila biztanle hazten da urtean. Zenbat hazten da $t=1$ eta $t=3$ artean?', 'Un pueblo crece $p(t)=3t^2$ miles de habitantes al año. ¿Cuánto crece entre $t=1$ y $t=3$?', 'تنمو بلدة بمعدل $p(t)=3t^2$ ألف ساكن في السنة. كم تنمو بين $t=1$ و$t=3$؟', 'A town grows $p(t)=3t^2$ thousand inhabitants a year. How much does it grow between $t=1$ and $t=3$?'), expected: n(26), hint: same('$\\int_1^3 3t^2\\,dt$'), explanation: same('$27-1=26$') }
]

export const bach2gIntegralsChallenges: ChallengeItem[] = [
    { id: 101, stage: 'primitives', points: 10, context: 'starter', prompt: say('$F$ funtzioa $x^3-x$ funtzioaren jatorrizkoa da, $C=0$ izanik. Zenbat da $F(2)$?', '$F$ es la primitiva de $x^3-x$ con $C=0$. ¿Cuánto vale $F(2)$?', '$F$ الدالة الأصلية لـ $x^3-x$ مع $C=0$. كم تساوي $F(2)$؟', '$F$ is the antiderivative of $x^3-x$ with $C=0$. What is $F(2)$?'), expected: n(2), hint: same('$F(x)=\\frac{x^4}{4}-\\frac{x^2}{2}$'), explanation: same('$4-2=2$') },
    { id: 102, stage: 'primitives', points: 20, context: 'advanced', prompt: say('$\\int 2\\sqrt{x}\\,dx=kx^{3/2}+C$. Zenbat da $k$?', '$\\int 2\\sqrt{x}\\,dx=kx^{3/2}+C$. ¿Cuánto vale $k$?', '$\\int 2\\sqrt{x}\\,dx=kx^{3/2}+C$. كم تساوي $k$؟', '$\\int 2\\sqrt{x}\\,dx=kx^{3/2}+C$. What is $k$?'), expected: f(4, 3), hint: same('$\\sqrt{x}=x^{1/2}$'), explanation: same('$2\\cdot\\frac{2}{3}=\\frac{4}{3}$') },
    { id: 103, stage: 'primitives', points: 30, context: 'master', prompt: say('$F\'(x)=3x^2+2x$ eta $F(1)=4$. Zenbat da $F(2)$?', '$F\'(x)=3x^2+2x$ y $F(1)=4$. ¿Cuánto vale $F(2)$?', '$F\'(x)=3x^2+2x$ و$F(1)=4$. كم تساوي $F(2)$؟', '$F\'(x)=3x^2+2x$ and $F(1)=4$. What is $F(2)$?'), expected: n(14), hint: same('$F(x)=x^3+x^2+C$'), explanation: same('$\\begin{gathered}1+1+C=4\\ \\to\\ C=2\\\\ F(2)=8+4+2=14\\end{gathered}$') },
    { id: 104, stage: 'composite', points: 10, context: 'starter', prompt: say('$\\int 3(3x-1)^2\\,dx=\\frac{(3x-1)^3}{k}+C$. Zenbat da $k$?', '$\\int 3(3x-1)^2\\,dx=\\frac{(3x-1)^3}{k}+C$. ¿Cuánto vale $k$?', '$\\int 3(3x-1)^2\\,dx=\\frac{(3x-1)^3}{k}+C$. كم تساوي $k$؟', '$\\int 3(3x-1)^2\\,dx=\\frac{(3x-1)^3}{k}+C$. What is $k$?'), expected: n(3), hint: same("$(3x-1)'=3$"), explanation: same('$\\frac{u^3}{3}\\ \\to\\ k=3$') },
    { id: 105, stage: 'composite', points: 20, context: 'advanced', prompt: say('$\\int x(x^2+1)^3\\,dx=\\frac{(x^2+1)^4}{k}+C$. Zenbat da $k$?', '$\\int x(x^2+1)^3\\,dx=\\frac{(x^2+1)^4}{k}+C$. ¿Cuánto vale $k$?', '$\\int x(x^2+1)^3\\,dx=\\frac{(x^2+1)^4}{k}+C$. كم تساوي $k$؟', '$\\int x(x^2+1)^3\\,dx=\\frac{(x^2+1)^4}{k}+C$. What is $k$?'), expected: n(8), hint: same('$x=\\frac{1}{2}\\cdot 2x$'), explanation: same('$\\frac{1}{2}\\cdot\\frac{u^4}{4}=\\frac{u^4}{8}$') },
    { id: 106, stage: 'composite', points: 30, context: 'master', prompt: definite('0', '1', '4x(x^2+1)\\,dx'), expected: n(3), hint: same('$\\int 4x(x^2+1)\\,dx=(x^2+1)^2$'), explanation: same('$4-1=3$') },
    { id: 107, stage: 'definite', points: 10, context: 'starter', prompt: definite('-1', '2', '(2x+3)\\,dx'), expected: n(12), hint: same('$F(x)=x^2+3x$'), explanation: same('$10-(-2)=12$') },
    { id: 108, stage: 'definite', points: 20, context: 'advanced', prompt: definite('1', 'e', '\\frac{1}{x}\\,dx'), expected: n(1), hint: same('$F(x)=\\ln x$'), explanation: same('$\\ln e-\\ln 1=1-0=1$') },
    { id: 109, stage: 'definite', points: 30, context: 'master', prompt: say('$\\int_0^a 2x\\,dx=9$, $a>0$ izanik. Zenbat da $a$?', '$\\int_0^a 2x\\,dx=9$ con $a>0$. ¿Cuánto vale $a$?', '$\\int_0^a 2x\\,dx=9$ مع $a>0$. كم تساوي $a$؟', '$\\int_0^a 2x\\,dx=9$ with $a>0$. What is $a$?'), expected: n(3), hint: same('$a^2=9$'), explanation: same('$a^2=9\\ \\to\\ a=3$') },
    { id: 110, stage: 'areas', points: 10, context: 'starter', prompt: areaUnder('x^3', '0', '2'), expected: n(4), hint: same('$F(x)=\\frac{x^4}{4}$'), explanation: same('$\\frac{16}{4}=4$') },
    { id: 111, stage: 'areas', points: 20, context: 'advanced', prompt: areaAxis('x^3', '[-1,1]'), expected: f(1, 2), hint: say('Zatitu $x=0$ puntuan.', 'Parte en $x=0$.', 'قسّم عند $x=0$.', 'Split at $x=0$.'), explanation: same('$\\frac{1}{4}+\\frac{1}{4}=\\frac{1}{2}$') },
    { id: 112, stage: 'areas', points: 30, context: 'master', prompt: areaBetween('6-x^2', '2'), expected: f(32, 3), hint: same('$6-x^2=2\\ \\to\\ x=\\pm 2$'), explanation: same('$\\int_{-2}^2(4-x^2)\\,dx=\\frac{32}{3}$') },
    { id: 113, stage: 'economy', points: 10, context: 'starter', prompt: say('$C\'(x)=10$ euro eta kostu finkoa 200 euro. Zenbat da $C(50)$?', '$C\'(x)=10$ euros y el coste fijo es 200 €. ¿Cuánto vale $C(50)$?', '$C\'(x)=10$ يورو والتكلفة الثابتة 200 €. كم تساوي $C(50)$؟', '$C\'(x)=10$ euros and the fixed cost is €200. What is $C(50)$?'), expected: n(700), hint: same('$C(x)=10x+200$'), explanation: same('$500+200=700$') },
    { id: 114, stage: 'economy', points: 20, context: 'advanced', prompt: say('Salmentak $v(t)=6t^2$ mila dira hilean. Zenbat saltzen da $t=1$ eta $t=2$ artean?', 'Las ventas son $v(t)=6t^2$ miles al mes. ¿Cuánto se vende entre $t=1$ y $t=2$?', 'المبيعات $v(t)=6t^2$ ألف في الشهر. كم يُباع بين $t=1$ و$t=2$؟', 'Sales are $v(t)=6t^2$ thousand a month. How much is sold between $t=1$ and $t=2$?'), expected: n(14), hint: same('$\\int_1^2 6t^2\\,dt$'), explanation: same('$\\left[2t^3\\right]_1^2=16-2=14$') },
    { id: 115, stage: 'economy', points: 30, context: 'master', prompt: say('$I\'(x)=100-2x$ eta $I(0)=0$. Zein da diru-sarrera osoaren baliorik handiena?', '$I\'(x)=100-2x$ e $I(0)=0$. ¿Cuál es el mayor ingreso total?', '$I\'(x)=100-2x$ و$I(0)=0$. ما أكبر إيراد كلي؟', '$I\'(x)=100-2x$ and $I(0)=0$. What is the highest total income?'), expected: n(2500), hint: same("$I(x)=100x-x^2\\qquad I'(x)=0$"), explanation: same('$x=50\\ \\to\\ I(50)=5000-2500=2500$') }
]

export const bach2gIntegralsExerciseBank: ExerciseSection[] = [
    {
        id: 'primitives',
        title: say('Jatorrizkoak', 'Primitivas', 'الدوال الأصلية', 'Antiderivatives'),
        items: [
            { id: 1, difficulty: 'easy', question: integrate('5\\,dx'), solution: same('$5x+C$') },
            { id: 2, difficulty: 'easy', question: integrate('(x^2+x)\\,dx'), solution: same('$\\frac{x^3}{3}+\\frac{x^2}{2}+C$') },
            { id: 3, difficulty: 'easy', question: integrate('4x^3\\,dx'), solution: same('$x^4+C$') },
            { id: 4, difficulty: 'medium', question: integrate('\\frac{3}{x}\\,dx'), solution: same('$3\\ln|x|+C$') },
            { id: 5, difficulty: 'medium', question: integrate('\\sqrt{x}\\,dx'), solution: same('$\\frac{2}{3}x^{3/2}+C$') },
            { id: 6, difficulty: 'medium', question: integrate('(e^{x}-2x)\\,dx'), solution: same('$e^{x}-x^2+C$') },
            { id: 7, difficulty: 'medium', question: say('$F$ funtzioa $8x^3$ funtzioaren jatorrizkoa da eta $F(0)=0$. Zenbat da $F(1)$?', '$F$ es la primitiva de $8x^3$ con $F(0)=0$. ¿Cuánto vale $F(1)$?', '$F$ الدالة الأصلية لـ $8x^3$ مع $F(0)=0$. كم تساوي $F(1)$؟', '$F$ is the antiderivative of $8x^3$ with $F(0)=0$. What is $F(1)$?'), solution: same('$F(x)=2x^4\\ \\to\\ F(1)=2$'), answer: { expected: n(2) } },
            { id: 8, difficulty: 'hard', question: integrate('\\frac{1}{x^2}\\,dx'), solution: same('$\\int x^{-2}\\,dx=-\\frac{1}{x}+C$') },
            { id: 9, difficulty: 'hard', question: integrate('(x+1)^2\\,dx'), solution: same('$\\frac{x^3}{3}+x^2+x+C$') },
            { id: 10, difficulty: 'hard', question: say('$F$ funtzioa $\\frac{1}{x}$ funtzioaren jatorrizkoa da eta $F(1)=3$. Zenbat da $F(e)$?', '$F$ es la primitiva de $\\frac{1}{x}$ con $F(1)=3$. ¿Cuánto vale $F(e)$?', '$F$ الدالة الأصلية لـ $\\frac{1}{x}$ مع $F(1)=3$. كم تساوي $F(e)$؟', '$F$ is the antiderivative of $\\frac{1}{x}$ with $F(1)=3$. What is $F(e)$?'), solution: same('$F(x)=\\ln x+3\\ \\to\\ F(e)=1+3=4$'), answer: { expected: n(4) } }
        ]
    },
    {
        id: 'composite',
        title: say('Berehalako konposatuak', 'Inmediatas compuestas', 'التكاملات الفورية المركبة', 'Compound immediate integrals'),
        items: [
            { id: 11, difficulty: 'easy', question: integrate('2(2x+5)^3\\,dx'), solution: same('$\\frac{(2x+5)^4}{4}+C$') },
            { id: 12, difficulty: 'easy', question: integrate('3e^{3x}\\,dx'), solution: same('$e^{3x}+C$') },
            { id: 13, difficulty: 'easy', question: integrate('\\frac{2x}{x^2+7}\\,dx'), solution: same('$\\ln(x^2+7)+C$') },
            { id: 14, difficulty: 'medium', question: integrate('x(x^2-1)^4\\,dx'), solution: same('$\\frac{(x^2-1)^5}{10}+C$') },
            { id: 15, difficulty: 'medium', question: integrate('\\frac{1}{x+2}\\,dx'), solution: same('$\\ln|x+2|+C$') },
            { id: 16, difficulty: 'medium', question: integrate('2xe^{x^2}\\,dx'), solution: same('$e^{x^2}+C$') },
            { id: 17, difficulty: 'medium', question: say('$F\'(x)=2x+4$ eta $F(0)=1$. Zenbat da $F(1)$?', '$F\'(x)=2x+4$ y $F(0)=1$. ¿Cuánto vale $F(1)$?', '$F\'(x)=2x+4$ و$F(0)=1$. كم تساوي $F(1)$؟', '$F\'(x)=2x+4$ and $F(0)=1$. What is $F(1)$?'), solution: same('$F(x)=x^2+4x+1\\ \\to\\ F(1)=6$'), answer: { expected: n(6) } },
            { id: 18, difficulty: 'hard', question: integrate('e^{-2x}\\,dx'), solution: same('$-\\frac{1}{2}e^{-2x}+C$') },
            { id: 19, difficulty: 'hard', question: integrate('\\frac{x^2}{x^3+1}\\,dx'), solution: same('$\\frac{1}{3}\\ln|x^3+1|+C$') },
            { id: 20, difficulty: 'hard', question: say('$F\'(x)=6x^2-2$ eta $F(1)=5$. Zenbat da $F(2)$?', '$F\'(x)=6x^2-2$ y $F(1)=5$. ¿Cuánto vale $F(2)$?', '$F\'(x)=6x^2-2$ و$F(1)=5$. كم تساوي $F(2)$؟', '$F\'(x)=6x^2-2$ and $F(1)=5$. What is $F(2)$?'), solution: same('$\\begin{gathered}F(x)=2x^3-2x+C\\qquad C=5\\\\ F(2)=16-4+5=17\\end{gathered}$'), answer: { expected: n(17) } }
        ]
    },
    {
        id: 'definite',
        title: say('Integral mugatua', 'Integral definida', 'التكامل المحدد', 'The definite integral'),
        items: [
            { id: 21, difficulty: 'easy', question: definite('0', '3', '2x\\,dx'), solution: same('$9-0=9$'), answer: { expected: n(9) } },
            { id: 22, difficulty: 'easy', question: definite('1', '2', '3x^2\\,dx'), solution: same('$8-1=7$'), answer: { expected: n(7) } },
            { id: 23, difficulty: 'easy', question: definite('0', '1', '(x+1)\\,dx'), solution: same('$\\frac{1}{2}+1=\\frac{3}{2}$'), answer: { expected: f(3, 2) } },
            { id: 24, difficulty: 'medium', question: definite('0', '2', '(x^3-x)\\,dx'), solution: same('$\\left[\\frac{x^4}{4}-\\frac{x^2}{2}\\right]_0^2=4-2=2$'), answer: { expected: n(2) } },
            { id: 25, difficulty: 'medium', question: definite('0', '4', '\\sqrt{x}\\,dx'), solution: same('$\\left[\\frac{2}{3}x^{3/2}\\right]_0^4=\\frac{2}{3}\\cdot 8=\\frac{16}{3}$'), answer: { expected: f(16, 3) } },
            { id: 26, difficulty: 'medium', question: say('$\\int_0^3 f=6$ eta $\\int_3^5 f=-2$. Zenbat da $\\int_0^5 f$?', 'Si $\\int_0^3 f=6$ y $\\int_3^5 f=-2$, ¿cuánto vale $\\int_0^5 f$?', 'إذا كان $\\int_0^3 f=6$ و$\\int_3^5 f=-2$ فكم يساوي $\\int_0^5 f$؟', 'If $\\int_0^3 f=6$ and $\\int_3^5 f=-2$, what is $\\int_0^5 f$?'), solution: same('$6+(-2)=4$'), answer: { expected: n(4) } },
            { id: 27, difficulty: 'medium', question: definite('2', '2', '(x^5+7)\\,dx'), solution: say('Muga berdinak: 0.', 'Límites iguales: 0.', 'حدان متساويان: 0.', 'Equal limits: 0.'), answer: { expected: n(0) } },
            { id: 28, difficulty: 'hard', question: say('Hurbildu $\\int_0^4 x\\,dx$ ezkerreko altuera duten 4 laukizuzenekin.', 'Aproxima $\\int_0^4 x\\,dx$ con 4 rectángulos de altura por la izquierda.', 'قرّب $\\int_0^4 x\\,dx$ بأربعة مستطيلات بارتفاع الطرف الأيسر.', 'Approximate $\\int_0^4 x\\,dx$ with 4 rectangles of left-hand height.'), solution: same('$1\\cdot(0+1+2+3)=6\\qquad \\int_0^4 x\\,dx=8$'), answer: { expected: n(6) } },
            { id: 29, difficulty: 'hard', question: say('$\\int_0^k 3x^2\\,dx=27$. Zenbat da $k$?', '$\\int_0^k 3x^2\\,dx=27$. ¿Cuánto vale $k$?', '$\\int_0^k 3x^2\\,dx=27$. كم تساوي $k$؟', '$\\int_0^k 3x^2\\,dx=27$. What is $k$?'), solution: same('$k^3=27\\ \\to\\ k=3$'), answer: { expected: n(3) } },
            { id: 30, difficulty: 'hard', question: definite('0', '1', '2xe^{x^2}\\,dx'), solution: same('$\\left[e^{x^2}\\right]_0^1=e-1$') }
        ]
    },
    {
        id: 'areas',
        title: say('Azalerak', 'Áreas', 'المساحات', 'Areas'),
        items: [
            { id: 31, difficulty: 'easy', question: areaUnder('2x', '0', '4'), solution: same('$\\left[x^2\\right]_0^4=16$'), answer: { expected: n(16) } },
            { id: 32, difficulty: 'easy', question: areaUnder('x^2+1', '0', '3'), solution: same('$\\left[\\frac{x^3}{3}+x\\right]_0^3=9+3=12$'), answer: { expected: n(12) } },
            { id: 33, difficulty: 'easy', question: areaAxis('4-x^2'), solution: same('$\\int_{-2}^2(4-x^2)\\,dx=\\frac{32}{3}$'), answer: { expected: f(32, 3) } },
            { id: 34, difficulty: 'medium', question: areaAxis('x^2-2x'), solution: same('$\\int_0^2(x^2-2x)\\,dx=-\\frac{4}{3}\\ \\to\\ A=\\frac{4}{3}$'), answer: { expected: f(4, 3) } },
            { id: 35, difficulty: 'medium', question: areaAxis('x-2', '[0,4]'), solution: same('$\\left|\\int_0^2\\right|+\\int_2^4=2+2=4$'), answer: { expected: n(4) } },
            { id: 36, difficulty: 'medium', question: say('Kalkulatu $y=x^2$ eta $y=x^3$ kurben arteko azalera $[0,1]$ tartean.', 'Calcula el área entre $y=x^2$ e $y=x^3$ en $[0,1]$.', 'احسب المساحة بين $y=x^2$ و$y=x^3$ على $[0,1]$.', 'Work out the area between $y=x^2$ and $y=x^3$ on $[0,1]$.'), solution: same('$\\frac{1}{3}-\\frac{1}{4}=\\frac{1}{12}$'), answer: { expected: f(1, 12) } },
            { id: 37, difficulty: 'medium', question: areaBetween('x+2', 'x^2'), solution: same('$\\begin{gathered}x+2=x^2\\ \\to\\ x=-1,\\ x=2\\\\ \\int_{-1}^2(x+2-x^2)\\,dx=\\frac{10}{3}+\\frac{7}{6}=\\frac{9}{2}\\end{gathered}$'), answer: { expected: f(9, 2) } },
            { id: 38, difficulty: 'hard', question: areaAxis('x^3-x', '[-1,1]'), solution: same('$\\frac{1}{4}+\\frac{1}{4}=\\frac{1}{2}$'), answer: { expected: f(1, 2) } },
            { id: 39, difficulty: 'hard', question: areaUnder('\\frac{1}{x}', '1', 'e^2'), solution: same('$\\ln e^2-\\ln 1=2$'), answer: { expected: n(2) } },
            { id: 40, difficulty: 'hard', question: areaBetween('2x-x^2', 'x^2'), solution: same('$\\int_0^1(2x-2x^2)\\,dx=1-\\frac{2}{3}=\\frac{1}{3}$'), answer: { expected: f(1, 3) } }
        ]
    },
    {
        id: 'economy',
        title: say('Ekonomian', 'En economía', 'في الاقتصاد', 'In economics'),
        items: [
            { id: 41, difficulty: 'easy', question: say('$C\'(x)=4$ euro eta kostu finkoa 100 euro. Zenbat da $C(25)$?', '$C\'(x)=4$ euros y el coste fijo es 100 €. ¿Cuánto vale $C(25)$?', '$C\'(x)=4$ يورو والتكلفة الثابتة 100 €. كم تساوي $C(25)$؟', '$C\'(x)=4$ euros and the fixed cost is €100. What is $C(25)$?'), solution: same('$4\\cdot 25+100=200$'), answer: { expected: n(200) } },
            { id: 42, difficulty: 'easy', question: say('Denda batek 10 mila produktu saltzen ditu hilean, beti. Zenbat saltzen ditu 6 hilabetetan?', 'Una tienda vende siempre 10 mil productos al mes. ¿Cuántos vende en 6 meses?', 'يبيع متجر دائمًا 10 آلاف منتج في الشهر. كم يبيع في 6 أشهر؟', 'A shop always sells 10 thousand products a month. How many does it sell in 6 months?'), solution: same('$\\int_0^6 10\\,dt=60$'), answer: { expected: n(60) } },
            { id: 43, difficulty: 'easy', question: say('$C\'(x)=2x$ eta kostu finkoa 50 euro. Idatzi $C(x)$.', '$C\'(x)=2x$ y el coste fijo es 50 €. Escribe $C(x)$.', '$C\'(x)=2x$ والتكلفة الثابتة 50 €. اكتب $C(x)$.', '$C\'(x)=2x$ and the fixed cost is €50. Write $C(x)$.'), solution: same('$C(x)=x^2+50$') },
            { id: 44, difficulty: 'medium', question: say('$C\'(x)=0{,}4x+8$ eta kostu finkoa 300 euro. Zenbat da $C(50)$?', '$C\'(x)=0{,}4x+8$ y el coste fijo es 300 €. ¿Cuánto vale $C(50)$?', '$C\'(x)=0{,}4x+8$ والتكلفة الثابتة 300 €. كم تساوي $C(50)$؟', '$C\'(x)=0{,}4x+8$ and the fixed cost is €300. What is $C(50)$?'), solution: same('$\\begin{gathered}C(x)=0{,}2x^2+8x+300\\\\ C(50)=500+400+300=1200\\end{gathered}$'), answer: { expected: n(1200) } },
            { id: 45, difficulty: 'medium', question: say('Salmentak $v(t)=6t+1$ mila dira hilean. Zenbat saltzen da 2. hilabetetik 4. hilabetera?', 'Las ventas son $v(t)=6t+1$ miles al mes. ¿Cuánto se vende entre el mes 2 y el 4?', 'المبيعات $v(t)=6t+1$ ألف في الشهر. كم يُباع بين الشهر 2 والشهر 4؟', 'Sales are $v(t)=6t+1$ thousand a month. How much is sold between month 2 and month 4?'), solution: same('$\\left[3t^2+t\\right]_2^4=52-14=38$'), answer: { expected: n(38) } },
            { id: 46, difficulty: 'medium', question: say('$I\'(x)=200-4x$ eta $I(0)=0$. Idatzi $I(x)$.', '$I\'(x)=200-4x$ e $I(0)=0$. Escribe $I(x)$.', '$I\'(x)=200-4x$ و$I(0)=0$. اكتب $I(x)$.', '$I\'(x)=200-4x$ and $I(0)=0$. Write $I(x)$.'), solution: same('$I(x)=200x-2x^2$') },
            { id: 47, difficulty: 'medium', question: say('Aurreko ariketan, zenbat sartzen da 30 unitate saltzean?', 'En el ejercicio anterior, ¿cuánto se ingresa al vender 30 unidades?', 'في التمرين السابق، كم يدخل عند بيع 30 وحدة؟', 'In the previous exercise, how much comes in when selling 30 units?'), solution: same('$I(30)=6000-1800=4200$'), answer: { expected: n(4200) } },
            { id: 48, difficulty: 'hard', question: say('Hurrengo unitatearen irabazia $B\'(x)=60-2x$ da eta ezer ekoitzi gabe 500 euro galtzen dira: $B(0)=-500$. Zenbat da $B(20)$?', 'El beneficio de la unidad siguiente es $B\'(x)=60-2x$ y sin producir se pierden 500 €: $B(0)=-500$. ¿Cuánto vale $B(20)$?', 'ربح الوحدة التالية $B\'(x)=60-2x$ ودون إنتاج تُخسر 500 €: $B(0)=-500$. كم تساوي $B(20)$؟', 'The profit of the next unit is $B\'(x)=60-2x$ and with no production €500 is lost: $B(0)=-500$. What is $B(20)$?'), solution: same('$\\begin{gathered}B(x)=60x-x^2-500\\\\ B(20)=1200-400-500=300\\end{gathered}$'), answer: { expected: n(300) } },
            { id: 49, difficulty: 'hard', question: say('Herri bat $p(t)=0{,}3t^2$ mila biztanle hazten da urtean. Zenbat hazten da 10 urtetan?', 'Un pueblo crece $p(t)=0{,}3t^2$ miles de habitantes al año. ¿Cuánto crece en 10 años?', 'تنمو بلدة بمعدل $p(t)=0{,}3t^2$ ألف ساكن في السنة. كم تنمو في 10 سنوات؟', 'A town grows $p(t)=0{,}3t^2$ thousand inhabitants a year. How much does it grow in 10 years?'), solution: same('$\\left[0{,}1t^3\\right]_0^{10}=100$'), answer: { expected: n(100) } },
            { id: 50, difficulty: 'hard', question: say('48. ariketan, zenbat unitaterekin hasten da enpresa irabazten?', 'En el ejercicio 48, ¿con cuántas unidades empieza la empresa a ganar?', 'في التمرين 48، بكم وحدة تبدأ الشركة بالربح؟', 'In exercise 48, with how many units does the firm start to make a profit?'), solution: same('$\\begin{gathered}x^2-60x+500=0\\\\ x=10\\qquad x=50\\end{gathered}$'), answer: { expected: n(10) } }
        ]
    }
]

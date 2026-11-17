import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuak · Batxilergoa 2 · Gizarte Zientziak — diagnostic, guided
   practice, exercise bank and challenges, with the scope of unit 6 of
   Santillana and Anaya 2.º Bachillerato CCSS (all the exercises, numbers
   and contexts are our own). Every closed answer is a single number: an
   average rate, a derivative at a point, the n of a tangent y = mx + n, a
   parameter, or what the next unit costs or brings in.
   ========================================================================== */

const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

/** «f(x) = …. Work out f'(a).» */
const derivAt = (formula: string, a: string, name = 'f') => say(`$${name}(x)=${formula}$. Kalkulatu $${name}'(${a})$.`, `$${name}(x)=${formula}$. Calcula $${name}'(${a})$.`, `$${name}(x)=${formula}$. احسب $${name}'(${a})$.`, `$${name}(x)=${formula}$. Work out $${name}'(${a})$.`)
/** «The average rate of f on [a, b]» */
const rateOn = (formula: string, interval: string) => say(`Kalkulatu $f(x)=${formula}$ funtzioaren T.V.M. $${interval}$ tartean.`, `Calcula la T.V.M. de $f(x)=${formula}$ en $${interval}$.`, `احسب معدل التغير المتوسط للدالة $f(x)=${formula}$ في $${interval}$.`, `Work out the average rate of change of $f(x)=${formula}$ on $${interval}$.`)
/** «The tangent at x = a is y = mx + n. What is n?» */
const tangentN = (formula: string, a: string) => say(`$f(x)=${formula}$ kurbaren zuzen ukitzailea $x=${a}$ puntuan $y=mx+n$ da. Zenbat da $n$?`, `La tangente a $f(x)=${formula}$ en $x=${a}$ es $y=mx+n$. ¿Cuánto vale $n$?`, `مماس $f(x)=${formula}$ عند $x=${a}$ هو $y=mx+n$. كم تساوي $n$؟`, `The tangent to $f(x)=${formula}$ at $x=${a}$ is $y=mx+n$. What is $n$?`)
const differentiate = (formula: string) => say(`Deribatu $${formula}$.`, `Deriva $${formula}$.`, `اشتق $${formula}$.`, `Differentiate $${formula}$.`)

export const bach2gDerivativesDiagnostic: DiagnosticQuestion[] = [
    {
        id: 146001,
        prompt: say('Zein da $f(x)=x^2$ funtzioaren T.V.M. $[1,3]$ tartean?', '¿Cuál es la T.V.M. de $f(x)=x^2$ en $[1,3]$?', 'ما معدل التغير المتوسط للدالة $f(x)=x^2$ في $[1,3]$؟', 'What is the average rate of $f(x)=x^2$ on $[1,3]$?'),
        options: [same('$4$'), same('$8$'), same('$2$')],
        correctIndex: 0,
        explanation: same('$\\frac{9-1}{3-1}=4$'),
        topic: 'average-rate'
    },
    {
        id: 146002,
        prompt: say('Zer da $\\lim_{h\\to 0}\\frac{f(2+h)-f(2)}{h}$?', '¿Qué es $\\lim_{h\\to 0}\\frac{f(2+h)-f(2)}{h}$?', 'ما $\\lim_{h\\to 0}\\frac{f(2+h)-f(2)}{h}$؟', 'What is $\\lim_{h\\to 0}\\frac{f(2+h)-f(2)}{h}$?'),
        options: [same('$f(2)$'), same("$f'(2)$"), same('$0$')],
        correctIndex: 1,
        explanation: say('Deribatuaren definizioa da $x=2$ puntuan.', 'Es la definición de la derivada en $x=2$.', 'إنه تعريف المشتقة عند $x=2$.', 'It is the definition of the derivative at $x=2$.'),
        topic: 'definition'
    },
    {
        id: 146003,
        prompt: say('Zein da $x^4$ funtzioaren deribatua?', '¿Cuál es la derivada de $x^4$?', 'ما مشتقة $x^4$؟', 'What is the derivative of $x^4$?'),
        options: [same('$4x^3$'), same('$x^3$'), same('$4x^4$')],
        correctIndex: 0,
        explanation: same("$(x^4)'=4x^3$"),
        topic: 'powers'
    },
    {
        id: 146004,
        prompt: say('Zein da $f(x)=x^2$ kurbaren zuzen ukitzailearen malda $x=3$ puntuan?', '¿Cuál es la pendiente de la tangente a $f(x)=x^2$ en $x=3$?', 'ما ميل مماس $f(x)=x^2$ عند $x=3$؟', 'What is the slope of the tangent to $f(x)=x^2$ at $x=3$?'),
        options: [same('$9$'), same('$6$'), same('$3$')],
        correctIndex: 1,
        explanation: same("$f'(x)=2x\\ \\to\\ f'(3)=6$"),
        topic: 'tangent'
    },
    {
        id: 146005,
        prompt: say('Deribagarria al da $f(x)=|x|$ funtzioa $x=0$ puntuan?', '¿Es derivable $f(x)=|x|$ en $x=0$?', 'هل $f(x)=|x|$ قابلة للاشتقاق عند $x=0$؟', 'Is $f(x)=|x|$ differentiable at $x=0$?'),
        options: [say('Bai', 'Sí', 'نعم', 'Yes'), say('Ez: punta bat du', 'No: tiene un pico', 'لا: لها زاوية', 'No: it has a corner'), say('Ez: ez da jarraitua', 'No: no es continua', 'لا: ليست متصلة', 'No: it is not continuous')],
        correctIndex: 1,
        explanation: say('Jarraitua da, baina maldak $-1$ eta 1 dira.', 'Es continua, pero las pendientes son $-1$ y 1.', 'متصلة لكن الميلين $-1$ و1.', 'It is continuous, but the slopes are $-1$ and 1.'),
        topic: 'derivable'
    },
    {
        id: 146006,
        prompt: say('Zein da $e^{2x}$ funtzioaren deribatua?', '¿Cuál es la derivada de $e^{2x}$?', 'ما مشتقة $e^{2x}$؟', 'What is the derivative of $e^{2x}$?'),
        options: [same('$e^{2x}$'), same('$2e^{2x}$'), same('$2xe^{2x}$')],
        correctIndex: 1,
        explanation: same("$(e^{2x})'=e^{2x}\\cdot 2$"),
        topic: 'chain-exp'
    },
    {
        id: 146007,
        prompt: say('Zein da $\\ln x$ funtzioaren deribatua?', '¿Cuál es la derivada de $\\ln x$?', 'ما مشتقة $\\ln x$؟', 'What is the derivative of $\\ln x$?'),
        options: [same('$\\ln x$'), same('$x$'), same('$\\frac{1}{x}$')],
        correctIndex: 2,
        explanation: same("$(\\ln x)'=\\frac{1}{x}$"),
        topic: 'chain-log'
    },
    {
        id: 146008,
        prompt: say('$C(x)=x^2+10$ bada, zenbat da $C\'(5)$?', 'Si $C(x)=x^2+10$, ¿cuánto vale $C\'(5)$?', 'إذا كانت $C(x)=x^2+10$ فكم تساوي $C\'(5)$؟', 'If $C(x)=x^2+10$, what is $C\'(5)$?'),
        options: [same('$35$'), same('$5$'), same('$10$')],
        correctIndex: 2,
        explanation: same("$C'(x)=2x\\ \\to\\ C'(5)=10$"),
        topic: 'marginal'
    }
]

export const bach2gDerivativesPractice: PracticeItem[] = [
    /* ---------- Rate of change ---------- */
    { id: 1, stage: 'rate', prompt: rateOn('x^2+x', '[0,3]'), expected: n(4), hint: same('$\\frac{f(3)-f(0)}{3-0}$'), explanation: same('$\\frac{12-0}{3}=4$') },
    { id: 2, stage: 'rate', prompt: say('Salmentak, milakatan, $V(t)=t^2+2t$ dira ($t$ hilabetetan). Zein da T.V.M. $[1,4]$ tartean?', 'Las ventas, en miles, son $V(t)=t^2+2t$ ($t$ en meses). ¿Cuál es la T.V.M. en $[1,4]$?', 'المبيعات بالآلاف $V(t)=t^2+2t$ ($t$ بالأشهر). ما معدل التغير المتوسط في $[1,4]$؟', 'Sales, in thousands, are $V(t)=t^2+2t$ ($t$ in months). What is the average rate on $[1,4]$?'), expected: n(7), hint: same('$V(4)=24\\qquad V(1)=3$'), explanation: same('$\\frac{24-3}{4-1}=\\frac{21}{3}=7$') },
    { id: 3, stage: 'rate', prompt: say('$f(x)=2x^2$ bada, kalkulatu aldakuntza-tasa unekoa $x=1$ puntuan.', 'Si $f(x)=2x^2$, calcula la tasa de variación instantánea en $x=1$.', 'إذا كانت $f(x)=2x^2$ فاحسب معدل التغير اللحظي عند $x=1$.', 'If $f(x)=2x^2$, work out the instantaneous rate of change at $x=1$.'), expected: n(4), hint: say('T.V.M. $[1,1+h]$ tartean eta limitea.', 'La T.V.M. en $[1,1+h]$ y el límite.', 'معدل التغير المتوسط في $[1,1+h]$ ثم النهاية.', 'The average rate on $[1,1+h]$ and the limit.'), explanation: same('$\\frac{2(1+h)^2-2}{h}=4+2h\\ \\to\\ 4$') },
    { id: 4, stage: 'rate', prompt: say('Biztanleria $P(t)=50+3t^2$ da (milakatan). Zein da T.V.M. lehen bi urteetan?', 'La población es $P(t)=50+3t^2$ (miles). ¿Cuál es la T.V.M. en los dos primeros años?', 'السكان $P(t)=50+3t^2$ (بالآلاف). ما معدل التغير المتوسط في السنتين الأوليين؟', 'The population is $P(t)=50+3t^2$ (thousands). What is the average rate in the first two years?'), expected: n(6), hint: same('$[0,2]$'), explanation: same('$\\frac{62-50}{2-0}=6$') },
    /* ---------- The derivative at a point ---------- */
    { id: 5, stage: 'point', prompt: say('Kalkulatu $f\'(2)$ definizioaren bidez, $f(x)=x^2-3x$ bada.', 'Calcula $f\'(2)$ con la definición si $f(x)=x^2-3x$.', 'احسب $f\'(2)$ بالتعريف إذا كانت $f(x)=x^2-3x$.', 'Work out $f\'(2)$ from the definition if $f(x)=x^2-3x$.'), expected: n(1), hint: same('$f(2+h)-f(2)=h^2+h$'), explanation: same('$\\frac{h^2+h}{h}=h+1\\ \\to\\ 1$') },
    { id: 6, stage: 'point', prompt: tangentN('x^2', '1'), expected: n(-1), hint: same("$f(1)=1\\qquad f'(1)=2$"), explanation: same('$y-1=2(x-1)\\ \\to\\ y=2x-1$') },
    { id: 7, stage: 'point', prompt: say('Zein da $f(x)=x^3-x$ kurbaren zuzen ukitzailearen malda $x=2$ puntuan?', '¿Cuál es la pendiente de la tangente a $f(x)=x^3-x$ en $x=2$?', 'ما ميل مماس $f(x)=x^3-x$ عند $x=2$؟', 'What is the slope of the tangent to $f(x)=x^3-x$ at $x=2$?'), expected: n(11), hint: same("$f'(x)=3x^2-1$"), explanation: same("$f'(2)=12-1=11$") },
    { id: 8, stage: 'point', prompt: say('$f(x)=\\begin{cases}x^2 & x\\le 1\\\\ 4x-3 & x>1\\end{cases}$. Zenbat da $f\'(1^+)$?', '$f(x)=\\begin{cases}x^2 & x\\le 1\\\\ 4x-3 & x>1\\end{cases}$. ¿Cuánto vale $f\'(1^+)$?', '$f(x)=\\begin{cases}x^2 & x\\le 1\\\\ 4x-3 & x>1\\end{cases}$. كم تساوي $f\'(1^+)$؟', '$f(x)=\\begin{cases}x^2 & x\\le 1\\\\ 4x-3 & x>1\\end{cases}$. What is $f\'(1^+)$?'), expected: n(4), hint: say('Eskuineko zatiaren malda.', 'La pendiente del trozo de la derecha.', 'ميل الجزء الأيمن.', 'The slope of the right-hand piece.'), explanation: say('$f\'(1^-)=2$ eta $f\'(1^+)=4$: punta bat.', '$f\'(1^-)=2$ y $f\'(1^+)=4$: un pico.', '$f\'(1^-)=2$ و$f\'(1^+)=4$: زاوية.', '$f\'(1^-)=2$ and $f\'(1^+)=4$: a corner.') },
    /* ---------- Rules ---------- */
    { id: 9, stage: 'rules', prompt: derivAt('3x^4-2x+1', '1'), expected: n(10), hint: same("$f'(x)=12x^3-2$"), explanation: same("$f'(1)=12-2=10$") },
    { id: 10, stage: 'rules', prompt: derivAt('(x+1)(x^2-3)', '2'), expected: n(13), hint: say('Biderkaduraren erregela.', 'La regla del producto.', 'قاعدة الجداء.', 'The product rule.'), explanation: same("$\\begin{gathered}f'(x)=(x^2-3)+(x+1)\\cdot 2x\\\\ f'(2)=1+3\\cdot 4=13\\end{gathered}$") },
    { id: 11, stage: 'rules', prompt: derivAt('\\frac{x}{x+1}', '1'), expected: f(1, 4), hint: say('Zatiduraren erregela.', 'La regla del cociente.', 'قاعدة خارج القسمة.', 'The quotient rule.'), explanation: same("$f'(x)=\\frac{1}{(x+1)^2}\\ \\to\\ \\frac{1}{4}$") },
    { id: 12, stage: 'rules', prompt: derivAt('\\frac{4}{x}+\\sqrt{x}', '4'), expected: n(0), hint: same("$f'(x)=-\\frac{4}{x^2}+\\frac{1}{2\\sqrt{x}}$"), explanation: same('$-\\frac{4}{16}+\\frac{1}{4}=0$') },
    /* ---------- The chain rule ---------- */
    { id: 13, stage: 'chain', prompt: derivAt('(2x+1)^3', '1'), expected: n(54), hint: same("$f'(x)=3(2x+1)^2\\cdot 2$"), explanation: same("$f'(1)=3\\cdot 9\\cdot 2=54$") },
    { id: 14, stage: 'chain', prompt: derivAt('\\sqrt{x^2+16}', '3'), expected: f(3, 5), hint: same("$f'(x)=\\frac{x}{\\sqrt{x^2+16}}$"), explanation: same('$\\frac{3}{\\sqrt{25}}=\\frac{3}{5}$') },
    { id: 15, stage: 'chain', prompt: derivAt('e^{3x-6}', '2'), expected: n(3), hint: same("$f'(x)=3e^{3x-6}$"), explanation: same('$3e^{0}=3$') },
    { id: 16, stage: 'chain', prompt: derivAt('\\ln(x^2+1)', '1'), expected: n(1), hint: same("$f'(x)=\\frac{2x}{x^2+1}$"), explanation: same('$\\frac{2}{2}=1$') },
    /* ---------- In economy ---------- */
    { id: 17, stage: 'economy', prompt: say('$f(x)=x^3-2x^2$ bada, zenbat da $f\'\'(1)$?', 'Si $f(x)=x^3-2x^2$, ¿cuánto vale $f\'\'(1)$?', 'إذا كانت $f(x)=x^3-2x^2$ فكم تساوي $f\'\'(1)$؟', 'If $f(x)=x^3-2x^2$, what is $f\'\'(1)$?'), expected: n(2), hint: same("$f''(x)=6x-4$"), explanation: same("$f''(1)=6-4=2$") },
    { id: 18, stage: 'economy', prompt: say('$f(x)=\\begin{cases}x^2 & x\\le 2\\\\ ax+b & x>2\\end{cases}$ deribagarria da. Zenbat da $a$?', '$f(x)=\\begin{cases}x^2 & x\\le 2\\\\ ax+b & x>2\\end{cases}$ es derivable. ¿Cuánto vale $a$?', '$f(x)=\\begin{cases}x^2 & x\\le 2\\\\ ax+b & x>2\\end{cases}$ قابلة للاشتقاق. كم تساوي $a$؟', '$f(x)=\\begin{cases}x^2 & x\\le 2\\\\ ax+b & x>2\\end{cases}$ is differentiable. What is $a$?'), expected: n(4), hint: say('Malda bera lotunean.', 'La misma pendiente en la unión.', 'الميل نفسه عند الالتقاء.', 'The same slope at the joint.'), explanation: same('$2\\cdot 2=a\\ \\to\\ a=4$') },
    { id: 19, stage: 'economy', prompt: say('$C(x)=0{,}1x^2+20x+500$ euro. Zenbat kostatzen da gutxi gorabehera 51. unitatea?', '$C(x)=0{,}1x^2+20x+500$ euros. ¿Cuánto cuesta más o menos la unidad 51?', '$C(x)=0{,}1x^2+20x+500$ يورو. كم تكلّف تقريبًا الوحدة 51؟', '$C(x)=0{,}1x^2+20x+500$ euros. Roughly what does unit 51 cost?'), expected: n(30), hint: same("$C'(50)$"), explanation: same("$C'(x)=0{,}2x+20\\ \\to\\ C'(50)=30$") },
    { id: 20, stage: 'economy', prompt: say('Diru-sarrerak $I(x)=80x-x^2$ euro dira. Zenbat ekarriko du gutxi gorabehera 31. unitateak?', 'Los ingresos son $I(x)=80x-x^2$ euros. ¿Cuánto aportará más o menos la unidad 31?', 'الإيراد $I(x)=80x-x^2$ يورو. كم ستضيف الوحدة 31 تقريبًا؟', 'The income is $I(x)=80x-x^2$ euros. Roughly how much will unit 31 bring in?'), expected: n(20), hint: same("$I'(30)$"), explanation: same("$I'(x)=80-2x\\ \\to\\ I'(30)=20$") }
]

export const bach2gDerivativesChallenges: ChallengeItem[] = [
    { id: 101, stage: 'rate', points: 10, context: 'starter', prompt: rateOn('\\frac{1}{x}', '[1,4]'), expected: f(-1, 4), hint: same('$f(4)=\\frac{1}{4}\\qquad f(1)=1$'), explanation: same('$\\frac{\\frac{1}{4}-1}{3}=-\\frac{1}{4}$') },
    { id: 102, stage: 'rate', points: 20, context: 'advanced', prompt: rateOn('x^3', '[1,3]'), expected: n(13), hint: same('$\\frac{27-1}{3-1}$'), explanation: same('$\\frac{26}{2}=13$') },
    { id: 103, stage: 'rate', points: 30, context: 'master', prompt: say('$f(x)=x^2$ funtzioaren T.V.M. $[a,a+2]$ tartean 10 da. Zenbat da $a$?', 'La T.V.M. de $f(x)=x^2$ en $[a,a+2]$ es 10. ¿Cuánto vale $a$?', 'معدل التغير المتوسط للدالة $f(x)=x^2$ في $[a,a+2]$ يساوي 10. كم تساوي $a$؟', 'The average rate of $f(x)=x^2$ on $[a,a+2]$ is 10. What is $a$?'), expected: n(4), hint: same('$\\frac{(a+2)^2-a^2}{2}=2a+2$'), explanation: same('$2a+2=10\\ \\to\\ a=4$') },
    { id: 104, stage: 'point', points: 10, context: 'starter', prompt: say('Kalkulatu $f\'(3)$ definizioaren bidez, $f(x)=x^2+x$ bada.', 'Calcula $f\'(3)$ con la definición si $f(x)=x^2+x$.', 'احسب $f\'(3)$ بالتعريف إذا كانت $f(x)=x^2+x$.', 'Work out $f\'(3)$ from the definition if $f(x)=x^2+x$.'), expected: n(7), hint: same('$f(3+h)-f(3)=7h+h^2$'), explanation: same('$7+h\\ \\to\\ 7$') },
    { id: 105, stage: 'point', points: 20, context: 'advanced', prompt: tangentN('x^2-4x', '3'), expected: n(-9), hint: same("$f(3)=-3\\qquad f'(3)=2$"), explanation: same('$y+3=2(x-3)\\ \\to\\ y=2x-9$') },
    { id: 106, stage: 'point', points: 30, context: 'master', prompt: say('$f(x)=x^2+ax$ kurbaren zuzen ukitzaileak $x=1$ puntuan 5 malda du. Zenbat da $a$?', 'La tangente a $f(x)=x^2+ax$ en $x=1$ tiene pendiente 5. ¿Cuánto vale $a$?', 'لمماس $f(x)=x^2+ax$ عند $x=1$ ميل 5. كم تساوي $a$؟', 'The tangent to $f(x)=x^2+ax$ at $x=1$ has slope 5. What is $a$?'), expected: n(3), hint: same("$f'(1)=2+a$"), explanation: same('$2+a=5\\ \\to\\ a=3$') },
    { id: 107, stage: 'rules', points: 10, context: 'starter', prompt: derivAt('x^2(x-3)', '2'), expected: n(0), hint: same("$f'(x)=2x(x-3)+x^2$"), explanation: same("$f'(2)=-4+4=0$") },
    { id: 108, stage: 'rules', points: 20, context: 'advanced', prompt: derivAt('\\frac{x^2+1}{x-1}', '2'), expected: n(-1), hint: same("$f'(x)=\\frac{2x(x-1)-(x^2+1)}{(x-1)^2}$"), explanation: same('$\\frac{4-5}{1}=-1$') },
    { id: 109, stage: 'rules', points: 30, context: 'master', prompt: say('Batez besteko kostua $M(x)=\\frac{3x+200}{x}$ da. Zenbat da $M\'(10)$?', 'El coste medio es $M(x)=\\frac{3x+200}{x}$. ¿Cuánto vale $M\'(10)$?', 'متوسط التكلفة $M(x)=\\frac{3x+200}{x}$. كم تساوي $M\'(10)$؟', 'The average cost is $M(x)=\\frac{3x+200}{x}$. What is $M\'(10)$?'), expected: n(-2), hint: same('$M(x)=3+\\frac{200}{x}$'), explanation: same("$M'(x)=-\\frac{200}{x^2}\\ \\to\\ -\\frac{200}{100}=-2$") },
    { id: 110, stage: 'chain', points: 10, context: 'starter', prompt: derivAt('(x^2-3)^4', '2'), expected: n(16), hint: same("$f'(x)=4(x^2-3)^3\\cdot 2x$"), explanation: same("$f'(2)=4\\cdot 1\\cdot 4=16$") },
    { id: 111, stage: 'chain', points: 20, context: 'advanced', prompt: derivAt('e^{x^2-1}', '1'), expected: n(2), hint: same("$f'(x)=2xe^{x^2-1}$"), explanation: same('$2\\cdot e^{0}=2$') },
    { id: 112, stage: 'chain', points: 30, context: 'master', prompt: derivAt('\\ln\\frac{x+1}{x+4}', '0'), expected: f(3, 4), hint: same('$\\ln(x+1)-\\ln(x+4)$'), explanation: same("$f'(x)=\\frac{1}{x+1}-\\frac{1}{x+4}\\ \\to\\ 1-\\frac{1}{4}=\\frac{3}{4}$") },
    { id: 113, stage: 'economy', points: 10, context: 'starter', prompt: say('$f(x)=x^4$ bada, zenbat da $f\'\'(1)$?', 'Si $f(x)=x^4$, ¿cuánto vale $f\'\'(1)$?', 'إذا كانت $f(x)=x^4$ فكم تساوي $f\'\'(1)$؟', 'If $f(x)=x^4$, what is $f\'\'(1)$?'), expected: n(12), hint: same("$f''(x)=12x^2$"), explanation: same("$f''(1)=12$") },
    { id: 114, stage: 'economy', points: 20, context: 'advanced', prompt: say('$f(x)=\\begin{cases}ax^2 & x\\le 1\\\\ 4x+b & x>1\\end{cases}$ deribagarria da. Zenbat da $b$?', '$f(x)=\\begin{cases}ax^2 & x\\le 1\\\\ 4x+b & x>1\\end{cases}$ es derivable. ¿Cuánto vale $b$?', '$f(x)=\\begin{cases}ax^2 & x\\le 1\\\\ 4x+b & x>1\\end{cases}$ قابلة للاشتقاق. كم تساوي $b$؟', '$f(x)=\\begin{cases}ax^2 & x\\le 1\\\\ 4x+b & x>1\\end{cases}$ is differentiable. What is $b$?'), expected: n(-2), hint: say('Lehenik malda: $2a=4$.', 'Primero la pendiente: $2a=4$.', 'الميل أولًا: $2a=4$.', 'First the slope: $2a=4$.'), explanation: same('$\\begin{gathered}a=2\\\\ 2=4+b\\ \\to\\ b=-2\\end{gathered}$') },
    { id: 115, stage: 'economy', points: 30, context: 'master', prompt: say('$I(x)=50x$ eta $C(x)=x^2+10x+100$ euro. Zenbat irabazten da gutxi gorabehera 16. unitatearekin?', '$I(x)=50x$ y $C(x)=x^2+10x+100$ euros. ¿Cuánto se gana más o menos con la unidad 16?', '$I(x)=50x$ و$C(x)=x^2+10x+100$ يورو. كم يُربح تقريبًا من الوحدة 16؟', '$I(x)=50x$ and $C(x)=x^2+10x+100$ euros. Roughly how much is earned with unit 16?'), expected: n(10), hint: same("$B(x)=I(x)-C(x)\\qquad B'(15)$"), explanation: same("$B'(x)=40-2x\\ \\to\\ B'(15)=10$") }
]

export const bach2gDerivativesExerciseBank: ExerciseSection[] = [
    {
        id: 'rate',
        title: say('Aldakuntza-tasa', 'Tasa de variación', 'معدل التغير', 'Rate of change'),
        items: [
            { id: 1, difficulty: 'easy', question: rateOn('3x+2', '[1,5]'), solution: same('$\\frac{17-5}{4}=3$'), answer: { expected: n(3) } },
            { id: 2, difficulty: 'easy', question: rateOn('x^2', '[2,5]'), solution: same('$\\frac{25-4}{3}=7$'), answer: { expected: n(7) } },
            { id: 3, difficulty: 'easy', question: rateOn('10-x^2', '[0,2]'), solution: same('$\\frac{6-10}{2}=-2$'), answer: { expected: n(-2) } },
            { id: 4, difficulty: 'medium', question: say('Kostua $C(x)=200+4x$ euro da. Zein da T.V.M. 50 eta 100 unitate artean? Zer esan nahi du?', 'El coste es $C(x)=200+4x$ euros. ¿Cuál es la T.V.M. entre 50 y 100 unidades? ¿Qué significa?', 'التكلفة $C(x)=200+4x$ يورو. ما معدل التغير المتوسط بين 50 و100 وحدة؟ وما معناه؟', 'The cost is $C(x)=200+4x$ euros. What is the average rate between 50 and 100 units? What does it mean?'), solution: say('$\\frac{600-400}{50}=4$: unitate bakoitzak 4 euro gehiago.', '$\\frac{600-400}{50}=4$: cada unidad, 4 € más.', '$\\frac{600-400}{50}=4$: كل وحدة 4 € إضافية.', '$\\frac{600-400}{50}=4$: each unit, €4 more.'), answer: { expected: n(4) } },
            { id: 5, difficulty: 'medium', question: say('Salmentak $V(t)=20t-t^2$ dira (milakatan). Zein da T.V.M. $[8,12]$ tartean?', 'Las ventas son $V(t)=20t-t^2$ (miles). ¿Cuál es la T.V.M. en $[8,12]$?', 'المبيعات $V(t)=20t-t^2$ (بالآلاف). ما معدل التغير المتوسط في $[8,12]$؟', 'Sales are $V(t)=20t-t^2$ (thousands). What is the average rate on $[8,12]$?'), solution: say('$\\frac{96-96}{4}=0$: batez beste, ez dira aldatzen.', '$\\frac{96-96}{4}=0$: de media, no cambian.', '$\\frac{96-96}{4}=0$: في المتوسط لا تتغير.', '$\\frac{96-96}{4}=0$: on average, they do not change.'), answer: { expected: n(0) } },
            { id: 6, difficulty: 'medium', question: rateOn('\\sqrt{x}', '[4,9]'), solution: same('$\\frac{3-2}{5}=\\frac{1}{5}$'), answer: { expected: f(1, 5) } },
            { id: 7, difficulty: 'medium', question: say('$f(x)=x^2-x$ bada, kalkulatu T.V.M. $[2,2+h]$ tartean.', 'Si $f(x)=x^2-x$, calcula la T.V.M. en $[2,2+h]$.', 'إذا كانت $f(x)=x^2-x$ فاحسب معدل التغير المتوسط في $[2,2+h]$.', 'If $f(x)=x^2-x$, work out the average rate on $[2,2+h]$.'), solution: same('$\\frac{(2+h)^2-(2+h)-2}{h}=3+h$') },
            { id: 8, difficulty: 'hard', question: say('Aurreko ariketan, zein da aldakuntza-tasa unekoa $x=2$ puntuan?', 'En el ejercicio anterior, ¿cuál es la tasa instantánea en $x=2$?', 'في التمرين السابق، ما معدل التغير اللحظي عند $x=2$؟', 'In the previous exercise, what is the instantaneous rate at $x=2$?'), solution: same('$\\lim_{h\\to 0}(3+h)=3$'), answer: { expected: n(3) } },
            { id: 9, difficulty: 'hard', question: rateOn('2^x', '[0,3]'), solution: same('$\\frac{8-1}{3}=\\frac{7}{3}$'), answer: { expected: f(7, 3) } },
            { id: 10, difficulty: 'hard', question: say('$f(x)=x^2+bx$ funtzioaren T.V.M. $[0,2]$ tartean 5 da. Zenbat da $b$?', 'La T.V.M. de $f(x)=x^2+bx$ en $[0,2]$ es 5. ¿Cuánto vale $b$?', 'معدل التغير المتوسط للدالة $f(x)=x^2+bx$ في $[0,2]$ يساوي 5. كم تساوي $b$؟', 'The average rate of $f(x)=x^2+bx$ on $[0,2]$ is 5. What is $b$?'), solution: same('$\\frac{4+2b}{2}=2+b=5\\ \\to\\ b=3$'), answer: { expected: n(3) } }
        ]
    },
    {
        id: 'point',
        title: say('Deribatua puntu batean', 'Derivada en un punto', 'المشتقة عند نقطة', 'The derivative at a point'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Kalkulatu $f\'(1)$ definizioaren bidez, $f(x)=5x^2$ bada.', 'Calcula $f\'(1)$ con la definición si $f(x)=5x^2$.', 'احسب $f\'(1)$ بالتعريف إذا كانت $f(x)=5x^2$.', 'Work out $f\'(1)$ from the definition if $f(x)=5x^2$.'), solution: same('$\\frac{5(1+h)^2-5}{h}=10+5h\\ \\to\\ 10$'), answer: { expected: n(10) } },
            { id: 12, difficulty: 'easy', question: say('Zein da $f(x)=x^2+3$ kurbaren zuzen ukitzailearen malda $x=-2$ puntuan?', '¿Cuál es la pendiente de la tangente a $f(x)=x^2+3$ en $x=-2$?', 'ما ميل مماس $f(x)=x^2+3$ عند $x=-2$؟', 'What is the slope of the tangent to $f(x)=x^2+3$ at $x=-2$?'), solution: same("$f'(-2)=2\\cdot(-2)=-4$"), answer: { expected: n(-4) } },
            { id: 13, difficulty: 'easy', question: tangentN('x^2+3', '1'), solution: same('$y-4=2(x-1)\\ \\to\\ y=2x+2$'), answer: { expected: n(2) } },
            { id: 14, difficulty: 'medium', question: say('Idatzi $f(x)=x^3$ kurbaren zuzen ukitzailea $x=2$ puntuan.', 'Escribe la tangente a $f(x)=x^3$ en $x=2$.', 'اكتب مماس $f(x)=x^3$ عند $x=2$.', 'Write the tangent to $f(x)=x^3$ at $x=2$.'), solution: same("$f(2)=8\\qquad f'(2)=12\\qquad y=12x-16$") },
            { id: 15, difficulty: 'medium', question: say('Kalkulatu $f\'(4)$ definizioaren bidez, $f(x)=\\frac{1}{x}$ bada.', 'Calcula $f\'(4)$ con la definición si $f(x)=\\frac{1}{x}$.', 'احسب $f\'(4)$ بالتعريف إذا كانت $f(x)=\\frac{1}{x}$.', 'Work out $f\'(4)$ from the definition if $f(x)=\\frac{1}{x}$.'), solution: same('$\\frac{\\frac{1}{4+h}-\\frac{1}{4}}{h}=\\frac{-1}{4(4+h)}\\ \\to\\ -\\frac{1}{16}$'), answer: { expected: f(-1, 16) } },
            { id: 16, difficulty: 'medium', question: say('Deribagarria al da $f(x)=\\begin{cases}2x & x\\le 2\\\\ x^2 & x>2\\end{cases}$ funtzioa $x=2$ puntuan?', '¿Es derivable $f(x)=\\begin{cases}2x & x\\le 2\\\\ x^2 & x>2\\end{cases}$ en $x=2$?', 'هل $f(x)=\\begin{cases}2x & x\\le 2\\\\ x^2 & x>2\\end{cases}$ قابلة للاشتقاق عند $x=2$؟', 'Is $f(x)=\\begin{cases}2x & x\\le 2\\\\ x^2 & x>2\\end{cases}$ differentiable at $x=2$?'), solution: say('Jarraitua (4 eta 4), baina maldak 2 eta 4: ez.', 'Continua (4 y 4), pero las pendientes son 2 y 4: no.', 'متصلة (4 و4) لكن الميلين 2 و4: لا.', 'Continuous (4 and 4), but the slopes are 2 and 4: no.') },
            { id: 17, difficulty: 'medium', question: say('Deribagarria al da $f(x)=\\begin{cases}x+1 & x\\le 0\\\\ x^2 & x>0\\end{cases}$ funtzioa $x=0$ puntuan?', '¿Es derivable $f(x)=\\begin{cases}x+1 & x\\le 0\\\\ x^2 & x>0\\end{cases}$ en $x=0$?', 'هل $f(x)=\\begin{cases}x+1 & x\\le 0\\\\ x^2 & x>0\\end{cases}$ قابلة للاشتقاق عند $x=0$؟', 'Is $f(x)=\\begin{cases}x+1 & x\\le 0\\\\ x^2 & x>0\\end{cases}$ differentiable at $x=0$?'), solution: say('Ez: jauzi bat du (1 eta 0), ez da jarraitua ere.', 'No: tiene un salto (1 y 0), ni siquiera es continua.', 'لا: لها قفزة (1 و0) فهي ليست متصلة أصلًا.', 'No: it has a jump (1 and 0), it is not even continuous.') },
            { id: 18, difficulty: 'hard', question: tangentN('\\frac{4}{x}', '2'), solution: same("$\\begin{gathered}f(2)=2\\qquad f'(2)=-1\\\\ y=-x+4\\end{gathered}$"), answer: { expected: n(4) } },
            { id: 19, difficulty: 'hard', question: say('Zein puntutan du $f(x)=x^2-6x$ kurbak zuzen ukitzaile horizontala? Eman $x$.', '¿En qué punto tiene $f(x)=x^2-6x$ tangente horizontal? Da la $x$.', 'عند أي نقطة يكون لـ $f(x)=x^2-6x$ مماس أفقي؟ اكتب $x$.', 'At which point does $f(x)=x^2-6x$ have a horizontal tangent? Give $x$.'), solution: same("$f'(x)=2x-6=0\\ \\to\\ x=3$"), answer: { expected: n(3) } },
            { id: 20, difficulty: 'hard', question: say('Zein puntutan da $f(x)=x^2$ kurbaren zuzen ukitzailea $y=4x+1$ zuzenaren paraleloa? Eman $x$.', '¿En qué punto la tangente a $f(x)=x^2$ es paralela a $y=4x+1$? Da la $x$.', 'عند أي نقطة يكون مماس $f(x)=x^2$ موازيًا للمستقيم $y=4x+1$؟ اكتب $x$.', 'At which point is the tangent to $f(x)=x^2$ parallel to $y=4x+1$? Give $x$.'), solution: same("$f'(x)=2x=4\\ \\to\\ x=2$"), answer: { expected: n(2) } }
        ]
    },
    {
        id: 'rules',
        title: say('Deribatzeko erregelak', 'Reglas de derivación', 'قواعد الاشتقاق', 'Rules of differentiation'),
        items: [
            { id: 21, difficulty: 'easy', question: differentiate('f(x)=x^5-3x^2+7x'), solution: same("$f'(x)=5x^4-6x+7$") },
            { id: 22, difficulty: 'easy', question: derivAt('2x^3-x^2', '1'), solution: same("$f'(x)=6x^2-2x\\ \\to\\ f'(1)=4$"), answer: { expected: n(4) } },
            { id: 23, difficulty: 'easy', question: derivAt('6\\sqrt{x}', '9'), solution: same("$f'(x)=\\frac{3}{\\sqrt{x}}\\ \\to\\ \\frac{3}{3}=1$"), answer: { expected: n(1) } },
            { id: 24, difficulty: 'medium', question: differentiate('f(x)=\\frac{2}{x^3}'), solution: same("$f'(x)=-\\frac{6}{x^4}$") },
            { id: 25, difficulty: 'medium', question: derivAt('(2x-1)(x+3)', '1'), solution: same("$\\begin{gathered}f'(x)=2(x+3)+(2x-1)\\\\ f'(1)=8+1=9\\end{gathered}$"), answer: { expected: n(9) } },
            { id: 26, difficulty: 'medium', question: derivAt('\\frac{x+3}{x-1}', '3'), solution: same("$f'(x)=\\frac{-4}{(x-1)^2}\\ \\to\\ -\\frac{4}{4}=-1$"), answer: { expected: n(-1) } },
            { id: 27, difficulty: 'medium', question: derivAt('x^2e^x', '0'), solution: same("$f'(x)=2xe^x+x^2e^x\\ \\to\\ 0$"), answer: { expected: n(0) } },
            { id: 28, difficulty: 'hard', question: say('Batez besteko kostua $M(x)=\\frac{x^2+400}{x}$ da. Zein $x$ baliotarako da $M\'(x)=0$?', 'El coste medio es $M(x)=\\frac{x^2+400}{x}$. ¿Para qué $x$ es $M\'(x)=0$?', 'متوسط التكلفة $M(x)=\\frac{x^2+400}{x}$. لأي $x$ يكون $M\'(x)=0$؟', 'The average cost is $M(x)=\\frac{x^2+400}{x}$. For which $x$ is $M\'(x)=0$?'), solution: same("$M'(x)=1-\\frac{400}{x^2}=0\\ \\to\\ x=20$"), answer: { expected: n(20) } },
            { id: 29, difficulty: 'hard', question: derivAt('x\\ln x', '1'), solution: same("$f'(x)=\\ln x+1\\ \\to\\ 0+1=1$"), answer: { expected: n(1) } },
            { id: 30, difficulty: 'hard', question: say('$f(x)=x^3-3x$ bada, non da $f\'(x)$ negatiboa?', 'Si $f(x)=x^3-3x$, ¿dónde es negativa $f\'(x)$?', 'إذا كانت $f(x)=x^3-3x$ فأين تكون $f\'(x)$ سالبة؟', 'If $f(x)=x^3-3x$, where is $f\'(x)$ negative?'), solution: say('$f\'(x)=3x^2-3<0$, hau da, $-1<x<1$: hor $f$ jaisten da.', '$f\'(x)=3x^2-3<0$, es decir, $-1<x<1$: ahí $f$ baja.', '$f\'(x)=3x^2-3<0$ أي $-1<x<1$: هناك تتناقص $f$.', '$f\'(x)=3x^2-3<0$, that is, $-1<x<1$: there $f$ falls.') }
        ]
    },
    {
        id: 'chain',
        title: say('Katearen erregela', 'La regla de la cadena', 'قاعدة السلسلة', 'The chain rule'),
        items: [
            { id: 31, difficulty: 'easy', question: differentiate('f(x)=(3x+2)^5'), solution: same("$f'(x)=15(3x+2)^4$") },
            { id: 32, difficulty: 'easy', question: derivAt('e^{4x}', '0'), solution: same("$f'(x)=4e^{4x}\\ \\to\\ 4$"), answer: { expected: n(4) } },
            { id: 33, difficulty: 'easy', question: derivAt('\\ln(5x)', '2'), solution: same("$f'(x)=\\frac{1}{x}\\ \\to\\ \\frac{1}{2}$"), answer: { expected: f(1, 2) } },
            { id: 34, difficulty: 'medium', question: derivAt('\\sqrt{2x+7}', '1'), solution: same("$f'(x)=\\frac{1}{\\sqrt{2x+7}}\\ \\to\\ \\frac{1}{3}$"), answer: { expected: f(1, 3) } },
            { id: 35, difficulty: 'medium', question: derivAt('(x^2+x)^3', '1'), solution: same("$f'(x)=3(x^2+x)^2(2x+1)\\ \\to\\ 3\\cdot 4\\cdot 3=36$"), answer: { expected: n(36) } },
            { id: 36, difficulty: 'medium', question: derivAt('\\ln(x^2+2x)', '2'), solution: same("$f'(x)=\\frac{2x+2}{x^2+2x}\\ \\to\\ \\frac{6}{8}=\\frac{3}{4}$"), answer: { expected: f(3, 4) } },
            { id: 37, difficulty: 'medium', question: say('Kapital bat $K(t)=1000e^{0{,}05t}$ euro da. Zenbat da $K\'(0)$?', 'Un capital es $K(t)=1000e^{0{,}05t}$ euros. ¿Cuánto vale $K\'(0)$?', 'رأس مال $K(t)=1000e^{0{,}05t}$ يورو. كم تساوي $K\'(0)$؟', 'A capital is $K(t)=1000e^{0{,}05t}$ euros. What is $K\'(0)$?'), solution: same("$K'(t)=50e^{0{,}05t}\\ \\to\\ 50$"), answer: { expected: n(50) } },
            { id: 38, difficulty: 'hard', question: derivAt('2^{x^2}', '1', 'g'), solution: say('$g\'(x)=2^{x^2}\\ln 2\\cdot 2x$; $g\'(1)=4\\ln 2$.', '$g\'(x)=2^{x^2}\\ln 2\\cdot 2x$; $g\'(1)=4\\ln 2$.', '$g\'(x)=2^{x^2}\\ln 2\\cdot 2x$؛ ‏$g\'(1)=4\\ln 2$.', '$g\'(x)=2^{x^2}\\ln 2\\cdot 2x$; $g\'(1)=4\\ln 2$.') },
            { id: 39, difficulty: 'hard', question: derivAt('e^{-x}(x+2)', '0'), solution: same("$f'(x)=e^{-x}(1-x-2)\\ \\to\\ -1$"), answer: { expected: n(-1) } },
            { id: 40, difficulty: 'hard', question: derivAt('\\sqrt{(x^2+5)^3}', '2'), solution: same("$f'(x)=3x\\sqrt{x^2+5}\\ \\to\\ 6\\cdot 3=18$"), answer: { expected: n(18) } }
        ]
    },
    {
        id: 'economy',
        title: say('Ekonomian', 'En economía', 'في الاقتصاد', 'In economy'),
        items: [
            { id: 41, difficulty: 'easy', question: say('$f(x)=x^3+2x$ bada, zenbat da $f\'\'(2)$?', 'Si $f(x)=x^3+2x$, ¿cuánto vale $f\'\'(2)$?', 'إذا كانت $f(x)=x^3+2x$ فكم تساوي $f\'\'(2)$؟', 'If $f(x)=x^3+2x$, what is $f\'\'(2)$?'), solution: same("$f''(x)=6x\\ \\to\\ 12$"), answer: { expected: n(12) } },
            { id: 42, difficulty: 'easy', question: say('$C(x)=3x^2+5x$ euro. Zenbat da $C\'(10)$?', '$C(x)=3x^2+5x$ euros. ¿Cuánto vale $C\'(10)$?', '$C(x)=3x^2+5x$ يورو. كم تساوي $C\'(10)$؟', '$C(x)=3x^2+5x$ euros. What is $C\'(10)$?'), solution: same("$C'(x)=6x+5\\ \\to\\ 65$"), answer: { expected: n(65) } },
            { id: 43, difficulty: 'easy', question: say('Diru-sarrerak $I(x)=100x-0{,}5x^2$ dira. Zenbat da $I\'(40)$?', 'Los ingresos son $I(x)=100x-0{,}5x^2$. ¿Cuánto vale $I\'(40)$?', 'الإيراد $I(x)=100x-0{,}5x^2$. كم تساوي $I\'(40)$؟', 'The income is $I(x)=100x-0{,}5x^2$. What is $I\'(40)$?'), solution: same("$I'(x)=100-x\\ \\to\\ 60$"), answer: { expected: n(60) } },
            { id: 44, difficulty: 'medium', question: say('Aurkitu $a$ eta $b$, $f(x)=\\begin{cases}x^2-1 & x\\le 1\\\\ ax+b & x>1\\end{cases}$ deribagarria izan dadin. Eman $a+b$.', 'Halla $a$ y $b$ para que $f(x)=\\begin{cases}x^2-1 & x\\le 1\\\\ ax+b & x>1\\end{cases}$ sea derivable. Da $a+b$.', 'أوجد $a$ و$b$ لتكون $f(x)=\\begin{cases}x^2-1 & x\\le 1\\\\ ax+b & x>1\\end{cases}$ قابلة للاشتقاق. اكتب $a+b$.', 'Find $a$ and $b$ so that $f(x)=\\begin{cases}x^2-1 & x\\le 1\\\\ ax+b & x>1\\end{cases}$ is differentiable. Give $a+b$.'), solution: same('$\\begin{gathered}a=2\\\\ 0=a+b\\ \\to\\ b=-2\\\\ a+b=0\\end{gathered}$'), answer: { expected: n(0) } },
            { id: 45, difficulty: 'medium', question: say('$C(x)=0{,}02x^2+8x+300$ euro. Konparatu $C\'(100)$ eta $C(101)-C(100)$.', '$C(x)=0{,}02x^2+8x+300$ euros. Compara $C\'(100)$ con $C(101)-C(100)$.', '$C(x)=0{,}02x^2+8x+300$ يورو. قارن $C\'(100)$ بـ $C(101)-C(100)$.', '$C(x)=0{,}02x^2+8x+300$ euros. Compare $C\'(100)$ with $C(101)-C(100)$.'), solution: same("$\\begin{gathered}C'(100)=12\\\\ C(101)-C(100)=12{,}02\\end{gathered}$") },
            { id: 46, difficulty: 'medium', question: say('Salmentak $V(t)=-t^3+9t^2$ dira. Zein $t$ baliotan da $V\'\'(t)=0$?', 'Las ventas son $V(t)=-t^3+9t^2$. ¿En qué $t$ es $V\'\'(t)=0$?', 'المبيعات $V(t)=-t^3+9t^2$. عند أي $t$ يكون $V\'\'(t)=0$؟', 'Sales are $V(t)=-t^3+9t^2$. At which $t$ is $V\'\'(t)=0$?'), solution: say('$V\'\'(t)=-6t+18=0\\ \\to\\ t=3$: hortik aurrera hazkundea moteltzen da.', '$V\'\'(t)=-6t+18=0\\ \\to\\ t=3$: desde ahí el crecimiento se frena.', '$V\'\'(t)=-6t+18=0\\ \\to\\ t=3$: بعدها يتباطأ النمو.', '$V\'\'(t)=-6t+18=0\\ \\to\\ t=3$: from there growth slows down.'), answer: { expected: n(3) } },
            { id: 47, difficulty: 'medium', question: say('$I(x)=40x$ eta $C(x)=0{,}5x^2+4x$. Zenbat da $B\'(20)$?', '$I(x)=40x$ y $C(x)=0{,}5x^2+4x$. ¿Cuánto vale $B\'(20)$?', '$I(x)=40x$ و$C(x)=0{,}5x^2+4x$. كم تساوي $B\'(20)$؟', '$I(x)=40x$ and $C(x)=0{,}5x^2+4x$. What is $B\'(20)$?'), solution: same("$B'(x)=36-x\\ \\to\\ 16$"), answer: { expected: n(16) } },
            { id: 48, difficulty: 'hard', question: say('Aurreko ariketan, zein unitatetik aurrera ematen du galera unitate gehigarri bakoitzak? Eman $x$, $B\'(x)=0$ izateko.', 'En el ejercicio anterior, ¿a partir de qué unidad cada unidad extra da pérdidas? Da la $x$ con $B\'(x)=0$.', 'في التمرين السابق، ابتداءً من أي وحدة تسبب كل وحدة إضافية خسارة؟ اكتب $x$ حيث $B\'(x)=0$.', 'In the previous exercise, from which unit on does each extra unit lose money? Give the $x$ with $B\'(x)=0$.'), solution: same("$36-x=0\\ \\to\\ x=36$"), answer: { expected: n(36) } },
            { id: 49, difficulty: 'hard', question: say('$f(x)=\\begin{cases}ax^2+b & x\\le 2\\\\ 8x-4 & x>2\\end{cases}$ deribagarria da. Eman $b$.', '$f(x)=\\begin{cases}ax^2+b & x\\le 2\\\\ 8x-4 & x>2\\end{cases}$ es derivable. Da $b$.', '$f(x)=\\begin{cases}ax^2+b & x\\le 2\\\\ 8x-4 & x>2\\end{cases}$ قابلة للاشتقاق. اكتب $b$.', '$f(x)=\\begin{cases}ax^2+b & x\\le 2\\\\ 8x-4 & x>2\\end{cases}$ is differentiable. Give $b$.'), solution: same('$\\begin{gathered}4a=8\\ \\to\\ a=2\\\\ 8+b=12\\ \\to\\ b=4\\end{gathered}$'), answer: { expected: n(4) } },
            { id: 50, difficulty: 'hard', question: say('Biztanleria $P(t)=20e^{0{,}1t}$ da (milakatan). Zenbat da $\\frac{P\'(t)}{P(t)}$? Zer esan nahi du?', 'La población es $P(t)=20e^{0{,}1t}$ (miles). ¿Cuánto vale $\\frac{P\'(t)}{P(t)}$? ¿Qué significa?', 'السكان $P(t)=20e^{0{,}1t}$ (بالآلاف). كم تساوي $\\frac{P\'(t)}{P(t)}$؟ وما معناها؟', 'The population is $P(t)=20e^{0{,}1t}$ (thousands). What is $\\frac{P\'(t)}{P(t)}$? What does it mean?'), solution: say('$\\frac{2e^{0{,}1t}}{20e^{0{,}1t}}=0{,}1$: urtean % 10 hazten da beti.', '$\\frac{2e^{0{,}1t}}{20e^{0{,}1t}}=0{,}1$: crece siempre un 10 % al año.', '$\\frac{2e^{0{,}1t}}{20e^{0{,}1t}}=0{,}1$: ينمو دائمًا 10 % في السنة.', '$\\frac{2e^{0{,}1t}}{20e^{0{,}1t}}=0{,}1$: it always grows 10 % a year.'), answer: { expected: f(1, 10) } }
        ]
    }
]

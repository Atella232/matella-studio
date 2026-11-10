import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Integral mugagabeak · Batxilergoa 2 · Zientziak — diagnostic, guided
   practice, exercise bank and challenges, with the scope of unit 11 of
   Santillana and Anaya 2.º Bachillerato (all the exercises and numbers are
   our own). An indefinite integral has no single number for an answer, so
   the closed items ask for a coefficient of the result (the a of
   a·sin 4x, the A of a partial fraction, the remainder of a division, an
   exponent), the constant k fixed by a point, or a value f(b) once the
   conditions fix f. Whole antiderivatives go in the open items of the bank.
   ========================================================================== */

const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

/** «Work out …» with one formula */
const work = (latex: string) => say(`Kalkulatu $${latex}$.`, `Calcula $${latex}$.`, `احسب $${latex}$.`, `Work out $${latex}$.`)
/** «<equality>. Find <letter>.» */
const find = (latex: string, letter = 'a') => say(`$${latex}$. Aurkitu $${letter}$.`, `$${latex}$. Halla $${letter}$.`, `$${latex}$. أوجد $${letter}$.`, `$${latex}$. Find $${letter}$.`)
/** «Which method suits …? Work it out.» */
const method = (latex: string) => say(
    `Zein metodo komeni da $${latex}$ integralerako? Kalkulatu.`,
    `¿Qué método conviene para $${latex}$? Calcúlala.`,
    `أيّ طريقة تناسب $${latex}$؟ احسبه.`,
    `Which method suits $${latex}$? Work it out.`
)

export const bach2IndefiniteDiagnostic: DiagnosticQuestion[] = [
    {
        id: 126001,
        prompt: say('Zein da $\\frac{1}{x}$ funtzioaren jatorrizko bat?', '¿Cuál es una primitiva de $\\frac{1}{x}$?', 'ما الدالة الأصلية لـ $\\frac{1}{x}$؟', 'What is an antiderivative of $\\frac{1}{x}$?'),
        options: [same('$\\ln|x|$'), same('$-\\frac{1}{x^2}$'), same('$x\\ln x$')],
        correctIndex: 0,
        explanation: say('$\\ln|x|$ funtzioaren deribatua $\\frac{1}{x}$ da. $-\\frac{1}{x^2}$ funtzioa $\\frac{1}{x}$ funtzioaren deribatua da.', 'La derivada de $\\ln|x|$ es $\\frac{1}{x}$. $-\\frac{1}{x^2}$ es la derivada de $\\frac{1}{x}$.', 'مشتقة $\\ln|x|$ هي $\\frac{1}{x}$. و$-\\frac{1}{x^2}$ مشتقة $\\frac{1}{x}$.', 'The derivative of $\\ln|x|$ is $\\frac{1}{x}$. $-\\frac{1}{x^2}$ is the derivative of $\\frac{1}{x}$.'),
        topic: 'table'
    },
    {
        id: 126002,
        prompt: say('$u=x^2+1$ bada, zer da $u\'$?', 'Si $u=x^2+1$, ¿qué es $u\'$?', 'إذا كان $u=x^2+1$ فما $u\'$؟', 'If $u=x^2+1$, what is $u\'$?'),
        options: [same('$x^2$'), same('$2x$'), same('$2x+1$')],
        correctIndex: 1,
        explanation: say('Konstante baten deribatua 0 da: $(x^2+1)\'=2x$.', 'La derivada de una constante es 0: $(x^2+1)\'=2x$.', 'مشتقة الثابت 0: $(x^2+1)\'=2x$.', 'The derivative of a constant is 0: $(x^2+1)\'=2x$.'),
        topic: 'composed'
    },
    {
        id: 126003,
        prompt: say('Zein da $xe^x$ funtzioaren deribatua?', '¿Cuál es la derivada de $xe^x$?', 'ما مشتقة $xe^x$؟', 'What is the derivative of $xe^x$?'),
        options: [same('$e^x$'), same('$xe^x$'), same('$e^x+xe^x$')],
        correctIndex: 2,
        explanation: say('Biderkaduraren deribatua: $(uv)\'=u\'v+uv\'$, beraz $1\\cdot e^x+x\\cdot e^x$.', 'Derivada del producto: $(uv)\'=u\'v+uv\'$, así que $1\\cdot e^x+x\\cdot e^x$.', 'مشتقة الجداء: $(uv)\'=u\'v+uv\'$، إذن $1\\cdot e^x+x\\cdot e^x$.', 'The product rule: $(uv)\'=u\'v+uv\'$, so $1\\cdot e^x+x\\cdot e^x$.'),
        topic: 'by-parts'
    },
    {
        id: 126004,
        prompt: say('$x^2+1$ zati $x+1$ egitean, zein da hondarra?', 'Al dividir $x^2+1$ entre $x+1$, ¿cuál es el resto?', 'عند قسمة $x^2+1$ على $x+1$، ما الباقي؟', 'Dividing $x^2+1$ by $x+1$, what is the remainder?'),
        options: [same('$2$'), same('$0$'), same('$-2$')],
        correctIndex: 0,
        explanation: same('$x^2+1=(x+1)(x-1)+2$'),
        topic: 'division'
    },
    {
        id: 126005,
        prompt: say('Nola faktorizatzen da $x^2-5x+6$?', '¿Cómo se factoriza $x^2-5x+6$?', 'كيف يُحلَّل $x^2-5x+6$؟', 'How does $x^2-5x+6$ factorise?'),
        options: [same('$(x+2)(x+3)$'), same('$(x-2)(x-3)$'), same('$(x-1)(x-6)$')],
        correctIndex: 1,
        explanation: say('Erroak 2 eta 3 dira: batura 5 eta biderkadura 6.', 'Las raíces son 2 y 3: suman 5 y multiplican 6.', 'الجذران 2 و3: مجموعهما 5 وجداؤهما 6.', 'The roots are 2 and 3: they add up to 5 and multiply to 6.'),
        topic: 'simple-roots'
    },
    {
        id: 126006,
        prompt: say('Nola osatzen da $x^2+6x+10$ adierazpenaren karratua?', '¿Cómo se completa el cuadrado de $x^2+6x+10$?', 'كيف نكمل مربع $x^2+6x+10$؟', 'How do you complete the square of $x^2+6x+10$?'),
        options: [same('$(x+6)^2+10$'), same('$(x+3)^2+10$'), same('$(x+3)^2+1$')],
        correctIndex: 2,
        explanation: say('$(x+3)^2=x^2+6x+9$, eta 1 falta da.', '$(x+3)^2=x^2+6x+9$, y falta 1.', '$(x+3)^2=x^2+6x+9$، وينقص 1.', '$(x+3)^2=x^2+6x+9$, and 1 is missing.'),
        topic: 'no-roots'
    },
    {
        id: 126007,
        prompt: say('Zenbat da $\\sin^2 x+\\cos^2 x$, edozein $x$ izanik?', '¿A qué es igual $\\sin^2 x+\\cos^2 x$ para cualquier $x$?', 'كم يساوي $\\sin^2 x+\\cos^2 x$ لأي $x$؟', 'What is $\\sin^2 x+\\cos^2 x$ for any $x$?'),
        options: [same('$1$'), same('$0$'), same('$\\sin 2x$')],
        correctIndex: 0,
        explanation: say('Trigonometriaren oinarrizko berdintza da.', 'Es la identidad fundamental de la trigonometría.', 'إنها المتطابقة الأساسية في حساب المثلثات.', 'It is the fundamental identity of trigonometry.'),
        topic: 'trig-powers'
    },
    {
        id: 126008,
        prompt: say('$2x$ funtzioaren jatorrizkoak $x^2+k$ dira. Zein $k$ da $(1,\\,4)$ puntutik pasatzen denarena?', 'Las primitivas de $2x$ son $x^2+k$. ¿Qué $k$ tiene la que pasa por $(1,\\,4)$?', 'الدوال الأصلية لـ $2x$ هي $x^2+k$. ما $k$ للتي تمر بالنقطة $(1,\\,4)$؟', 'The antiderivatives of $2x$ are $x^2+k$. What $k$ has the one through $(1,\\,4)$?'),
        options: [same('$k=4$'), same('$k=3$'), same('$k=5$')],
        correctIndex: 1,
        explanation: same('$1+k=4\\ \\to\\ k=3$'),
        topic: 'conditions'
    }
]

export const bach2IndefinitePractice: PracticeItem[] = [
    /* ---------- Review ---------- */
    { id: 1, stage: 'review', prompt: find('\\int(3x^2+4x)\\,dx=x^3+ax^2+k'), expected: n(2), hint: say('Integratu $4x$.', 'Integra $4x$.', 'كامل $4x$.', 'Integrate $4x$.'), explanation: same('$\\int 4x\\,dx=4\\cdot\\frac{x^2}{2}=2x^2$') },
    { id: 2, stage: 'review', prompt: find('\\int\\cos(4x)\\,dx=a\\sin(4x)+k'), expected: f(1, 4), hint: say('$u=4x$ bada, $u\'=4$.', 'Con $u=4x$, $u\'=4$.', 'مع $u=4x$ يكون $u\'=4$.', 'With $u=4x$, $u\'=4$.'), explanation: same('$\\frac{1}{4}\\int 4\\cos(4x)\\,dx=\\frac{1}{4}\\sin(4x)+k$') },
    { id: 3, stage: 'review', prompt: find('\\int\\frac{dx}{4+x^2}=a\\arctan\\frac{x}{2}+k'), expected: f(1, 2), hint: say('Atera 4 faktore komun gisa.', 'Saca factor común 4.', 'أخرج 4 عاملًا مشتركًا.', 'Take 4 out as a common factor.'), explanation: say('$\\frac{1}{4}\\cdot 2\\arctan\\frac{x}{2}$, $u\'=\\frac{1}{2}$ delako; $a=\\frac{1}{2}$.', '$\\frac{1}{4}\\cdot 2\\arctan\\frac{x}{2}$, porque $u\'=\\frac{1}{2}$; $a=\\frac{1}{2}$.', '$\\frac{1}{4}\\cdot 2\\arctan\\frac{x}{2}$ لأن $u\'=\\frac{1}{2}$؛ $a=\\frac{1}{2}$.', '$\\frac{1}{4}\\cdot 2\\arctan\\frac{x}{2}$, because $u\'=\\frac{1}{2}$; $a=\\frac{1}{2}$.') },
    { id: 4, stage: 'review', prompt: say('$F$ funtzioa $f(x)=3x^2e^{x^3}$ funtzioaren jatorrizkoa da, eta $F(0)=5$. Aurkitu haren $k$.', '$F$ es una primitiva de $f(x)=3x^2e^{x^3}$ con $F(0)=5$. Halla su $k$.', '$F$ دالة أصلية لـ $f(x)=3x^2e^{x^3}$ مع $F(0)=5$. أوجد $k$ لها.', '$F$ is an antiderivative of $f(x)=3x^2e^{x^3}$ with $F(0)=5$. Find its $k$.'), expected: n(4), hint: same('$\\int u\'e^u\\,dx=e^u+k$'), explanation: same('$\\begin{aligned}&F(x)=e^{x^3}+k\\\\ &1+k=5\\ \\to\\ k=4\\end{aligned}$') },
    /* ---------- Integration by parts ---------- */
    { id: 5, stage: 'parts', prompt: find('\\int xe^{2x}\\,dx=\\frac{xe^{2x}}{2}+a\\,e^{2x}+k'), expected: f(-1, 4), hint: say('$u=x$ eta $v=\\frac{e^{2x}}{2}$.', '$u=x$ y $v=\\frac{e^{2x}}{2}$.', '$u=x$ و$v=\\frac{e^{2x}}{2}$.', '$u=x$ and $v=\\frac{e^{2x}}{2}$.'), explanation: same('$\\begin{aligned}&-\\int\\frac{e^{2x}}{2}\\,dx=-\\frac{e^{2x}}{4}\\\\ &a=-\\frac{1}{4}\\end{aligned}$') },
    { id: 6, stage: 'parts', prompt: find('\\int x\\sin x\\,dx=-x\\cos x+a\\sin x+k'), expected: n(1), hint: say('$v=-\\cos x$: kontuz zeinuarekin.', '$v=-\\cos x$: cuidado con el signo.', '$v=-\\cos x$: انتبه للإشارة.', '$v=-\\cos x$: careful with the sign.'), explanation: same('$\\begin{aligned}&-x\\cos x+\\int\\cos x\\,dx\\\\ &=-x\\cos x+\\sin x\\ \\to\\ a=1\\end{aligned}$') },
    { id: 7, stage: 'parts', prompt: say('$\\int\\ln x\\,dx=x\\ln x-x+k$. Aurkitu $(1,\\,0)$ puntutik pasatzen den jatorrizkoaren $k$.', '$\\int\\ln x\\,dx=x\\ln x-x+k$. Halla la $k$ de la primitiva que pasa por $(1,\\,0)$.', '$\\int\\ln x\\,dx=x\\ln x-x+k$. أوجد $k$ للدالة الأصلية التي تمر بالنقطة $(1,\\,0)$.', '$\\int\\ln x\\,dx=x\\ln x-x+k$. Find the $k$ of the antiderivative through $(1,\\,0)$.'), expected: n(1), hint: same('$\\ln 1=0$'), explanation: same('$1\\cdot 0-1+k=0\\ \\to\\ k=1$') },
    { id: 8, stage: 'parts', prompt: find('\\int x^2e^x\\,dx=e^x(x^2+ax+b)+k', 'b'), expected: n(2), hint: say('Bi aldiz zatika, $u=x^2$ eta gero $u=2x$.', 'Dos veces por partes, $u=x^2$ y después $u=2x$.', 'بالتجزئة مرتين: $u=x^2$ ثم $u=2x$.', 'By parts twice, $u=x^2$ and then $u=2x$.'), explanation: same('$\\begin{aligned}&x^2e^x-2xe^x+2e^x\\\\ &a=-2\\qquad b=2\\end{aligned}$') },
    /* ---------- Rational integrals ---------- */
    { id: 9, stage: 'rational', prompt: find('\\frac{x^2+1}{x-1}=x+1+\\frac{r}{x-1}', 'r'), expected: n(2), hint: say('Zatitu, edo egiaztatu $(x-1)(x+1)$.', 'Divide, o comprueba con $(x-1)(x+1)$.', 'اقسم، أو تحقق بـ $(x-1)(x+1)$.', 'Divide, or check with $(x-1)(x+1)$.'), explanation: same('$\\begin{aligned}&(x-1)(x+1)=x^2-1\\\\ &x^2+1=x^2-1+2\\ \\to\\ r=2\\end{aligned}$') },
    { id: 10, stage: 'rational', prompt: find('\\int\\frac{5}{(x-1)(x+4)}\\,dx=A\\ln|x-1|+B\\ln|x+4|+k', 'A'), expected: n(1), hint: same('$5=A(x+4)+B(x-1)$'), explanation: say('$x=1$ emanda: $5=5A$, beraz $A=1$.', 'Con $x=1$: $5=5A$, así que $A=1$.', 'مع $x=1$: $5=5A$، إذن $A=1$.', 'With $x=1$: $5=5A$, so $A=1$.') },
    { id: 11, stage: 'rational', prompt: find('\\int\\frac{3x+1}{(x+1)^2}\\,dx=3\\ln|x+1|+\\frac{b}{x+1}+k', 'b'), expected: n(2), hint: same('$3x+1=3(x+1)-2$'), explanation: same('$\\begin{aligned}&\\int\\frac{-2}{(x+1)^2}\\,dx=\\frac{2}{x+1}\\\\ &b=2\\end{aligned}$') },
    { id: 12, stage: 'rational', prompt: find('\\int\\frac{dx}{x^2+2x+2}=\\arctan(x+p)+k', 'p'), expected: n(1), hint: say('Osatu karratua.', 'Completa el cuadrado.', 'أكمل المربع.', 'Complete the square.'), explanation: same('$x^2+2x+2=(x+1)^2+1\\ \\to\\ p=1$') },
    /* ---------- Substitution ---------- */
    { id: 13, stage: 'substitution', prompt: say('$t=\\ln x$ hartuta, $\\int\\frac{(\\ln x)^2}{x}\\,dx=\\frac{(\\ln x)^m}{m}+k$. Aurkitu $m$.', 'Con $t=\\ln x$, $\\int\\frac{(\\ln x)^2}{x}\\,dx=\\frac{(\\ln x)^m}{m}+k$. Halla $m$.', 'مع $t=\\ln x$ يكون $\\int\\frac{(\\ln x)^2}{x}\\,dx=\\frac{(\\ln x)^m}{m}+k$. أوجد $m$.', 'With $t=\\ln x$, $\\int\\frac{(\\ln x)^2}{x}\\,dx=\\frac{(\\ln x)^m}{m}+k$. Find $m$.'), expected: n(3), hint: same('$dt=\\frac{1}{x}\\,dx$'), explanation: same('$\\int t^2\\,dt=\\frac{t^3}{3}\\ \\to\\ m=3$') },
    { id: 14, stage: 'substitution', prompt: say('$t=x^2+1$ hartuta, $\\int\\frac{x}{(x^2+1)^3}\\,dx=a(x^2+1)^{-2}+k$. Aurkitu $a$.', 'Con $t=x^2+1$, $\\int\\frac{x}{(x^2+1)^3}\\,dx=a(x^2+1)^{-2}+k$. Halla $a$.', 'مع $t=x^2+1$ يكون $\\int\\frac{x}{(x^2+1)^3}\\,dx=a(x^2+1)^{-2}+k$. أوجد $a$.', 'With $t=x^2+1$, $\\int\\frac{x}{(x^2+1)^3}\\,dx=a(x^2+1)^{-2}+k$. Find $a$.'), expected: f(-1, 4), hint: same('$x\\,dx=\\frac{dt}{2}$'), explanation: same('$\\begin{aligned}&\\frac{1}{2}\\int t^{-3}\\,dt=\\frac{1}{2}\\cdot\\frac{t^{-2}}{-2}\\\\ &a=-\\frac{1}{4}\\end{aligned}$') },
    { id: 15, stage: 'substitution', prompt: say('$t=\\sqrt{x}$ hartuta, $\\int\\frac{e^{\\sqrt{x}}}{\\sqrt{x}}\\,dx=a\\,e^{\\sqrt{x}}+k$. Aurkitu $a$.', 'Con $t=\\sqrt{x}$, $\\int\\frac{e^{\\sqrt{x}}}{\\sqrt{x}}\\,dx=a\\,e^{\\sqrt{x}}+k$. Halla $a$.', 'مع $t=\\sqrt{x}$ يكون $\\int\\frac{e^{\\sqrt{x}}}{\\sqrt{x}}\\,dx=a\\,e^{\\sqrt{x}}+k$. أوجد $a$.', 'With $t=\\sqrt{x}$, $\\int\\frac{e^{\\sqrt{x}}}{\\sqrt{x}}\\,dx=a\\,e^{\\sqrt{x}}+k$. Find $a$.'), expected: n(2), hint: same('$dt=\\frac{dx}{2\\sqrt{x}}$'), explanation: same('$\\int 2e^t\\,dt=2e^t\\ \\to\\ a=2$') },
    { id: 16, stage: 'substitution', prompt: find('\\int\\sin^3 x\\,dx=-\\cos x+a\\cos^3 x+k'), expected: f(1, 3), hint: same('$\\sin^2 x=1-\\cos^2 x\\qquad t=\\cos x$'), explanation: same('$\\begin{aligned}&-\\int(1-t^2)\\,dt=-t+\\frac{t^3}{3}\\\\ &a=\\frac{1}{3}\\end{aligned}$') },
    /* ---------- Method and conditions ---------- */
    { id: 17, stage: 'strategy', prompt: say('$f\'(x)=2x-3$ eta $f(2)=5$ badira, kalkulatu $f(0)$.', 'Si $f\'(x)=2x-3$ y $f(2)=5$, calcula $f(0)$.', 'إذا كان $f\'(x)=2x-3$ و$f(2)=5$ فاحسب $f(0)$.', 'If $f\'(x)=2x-3$ and $f(2)=5$, work out $f(0)$.'), expected: n(7), hint: same('$f(x)=x^2-3x+k$'), explanation: same('$\\begin{aligned}&4-6+k=5\\ \\to\\ k=7\\\\ &f(0)=7\\end{aligned}$') },
    { id: 18, stage: 'strategy', prompt: say('$f\'\'(x)=6$, $f\'(0)=2$ eta $f(0)=1$ badira, kalkulatu $f(1)$.', 'Si $f\'\'(x)=6$, $f\'(0)=2$ y $f(0)=1$, calcula $f(1)$.', 'إذا كان $f\'\'(x)=6$ و$f\'(0)=2$ و$f(0)=1$ فاحسب $f(1)$.', 'If $f\'\'(x)=6$, $f\'(0)=2$ and $f(0)=1$, work out $f(1)$.'), expected: n(6), hint: say('Integratu bi aldiz.', 'Integra dos veces.', 'كامل مرتين.', 'Integrate twice.'), explanation: same('$\\begin{aligned}&f(x)=3x^2+2x+1\\\\ &f(1)=3+2+1=6\\end{aligned}$') },
    { id: 19, stage: 'strategy', prompt: say('$x>0$ denean $f\'(x)=\\frac{1}{x}$ da, eta $f(1)=4$. Kalkulatu $f(e^2)$.', 'Para $x>0$ es $f\'(x)=\\frac{1}{x}$, y $f(1)=4$. Calcula $f(e^2)$.', 'عندما $x>0$ يكون $f\'(x)=\\frac{1}{x}$ و$f(1)=4$. احسب $f(e^2)$.', 'For $x>0$, $f\'(x)=\\frac{1}{x}$ and $f(1)=4$. Work out $f(e^2)$.'), expected: n(6), hint: same('$f(x)=\\ln x+k$'), explanation: same('$\\begin{aligned}&f(x)=\\ln x+4\\\\ &f(e^2)=2+4=6\\end{aligned}$') },
    { id: 20, stage: 'strategy', prompt: say('$f$ funtzioaren malda $f\'(x)=xe^x$ da, eta grafikoak $(0,\\,3)$ puntutik pasatzen du. Aurkitu $f(x)=e^x(x-1)+k$ funtzioaren $k$.', 'La pendiente de $f$ es $f\'(x)=xe^x$ y su gráfica pasa por $(0,\\,3)$. Halla la $k$ de $f(x)=e^x(x-1)+k$.', 'ميل $f$ هو $f\'(x)=xe^x$ ومنحناها يمر بالنقطة $(0,\\,3)$. أوجد $k$ في $f(x)=e^x(x-1)+k$.', 'The slope of $f$ is $f\'(x)=xe^x$ and its graph goes through $(0,\\,3)$. Find the $k$ of $f(x)=e^x(x-1)+k$.'), expected: n(4), hint: same('$e^0=1$'), explanation: same('$-1+k=3\\ \\to\\ k=4$') }
]

export const bach2IndefiniteChallenges: ChallengeItem[] = [
    { id: 101, stage: 'review', points: 10, context: 'starter', prompt: find('\\int(2x+1)^3\\,dx=\\frac{(2x+1)^4}{n}+k', 'n'), expected: n(8), hint: say('$u\'=2$ falta da.', 'Falta $u\'=2$.', 'ينقص $u\'=2$.', '$u\'=2$ is missing.'), explanation: same('$\\frac{1}{2}\\cdot\\frac{(2x+1)^4}{4}=\\frac{(2x+1)^4}{8}$') },
    { id: 102, stage: 'review', points: 20, context: 'advanced', prompt: find('\\int\\frac{x}{\\sqrt{1-x^4}}\\,dx=a\\arcsin(x^2)+k'), expected: f(1, 2), hint: say('$u=x^2$ bada, $u\'=2x$.', 'Con $u=x^2$, $u\'=2x$.', 'مع $u=x^2$ يكون $u\'=2x$.', 'With $u=x^2$, $u\'=2x$.'), explanation: same('$\\frac{1}{2}\\int\\frac{2x}{\\sqrt{1-(x^2)^2}}\\,dx\\ \\to\\ a=\\frac{1}{2}$') },
    { id: 103, stage: 'review', points: 30, context: 'master', prompt: find('\\int\\frac{\\cos x}{\\sin^3 x}\\,dx=a\\sin^{-2} x+k'), expected: f(-1, 2), hint: say('$u=\\sin x$ eta $u\'=\\cos x$.', '$u=\\sin x$ y $u\'=\\cos x$.', '$u=\\sin x$ و$u\'=\\cos x$.', '$u=\\sin x$ and $u\'=\\cos x$.'), explanation: same('$\\int u\'u^{-3}\\,dx=\\frac{u^{-2}}{-2}\\ \\to\\ a=-\\frac{1}{2}$') },
    { id: 104, stage: 'parts', points: 10, context: 'starter', prompt: find('\\int x\\cos x\\,dx=x\\sin x+a\\cos x+k'), expected: n(1), hint: say('$u=x$ eta $v=\\sin x$.', '$u=x$ y $v=\\sin x$.', '$u=x$ و$v=\\sin x$.', '$u=x$ and $v=\\sin x$.'), explanation: same('$-\\int\\sin x\\,dx=\\cos x\\ \\to\\ a=1$') },
    { id: 105, stage: 'parts', points: 20, context: 'advanced', prompt: find('\\int x\\ln x\\,dx=\\frac{x^2}{2}\\ln x+ax^2+k'), expected: f(-1, 4), hint: say('$u=\\ln x$ eta $dv=x\\,dx$.', '$u=\\ln x$ y $dv=x\\,dx$.', '$u=\\ln x$ و$dv=x\\,dx$.', '$u=\\ln x$ and $dv=x\\,dx$.'), explanation: same('$\\begin{aligned}&-\\int\\frac{x^2}{2}\\cdot\\frac{1}{x}\\,dx=-\\frac{x^2}{4}\\\\ &a=-\\frac{1}{4}\\end{aligned}$') },
    { id: 106, stage: 'parts', points: 30, context: 'master', prompt: find('\\int e^x\\sin x\\,dx=a\\,e^x(\\sin x-\\cos x)+k'), expected: f(1, 2), hint: say('Bi aldiz zatika, eta askatu $I$.', 'Dos veces por partes, y despeja $I$.', 'بالتجزئة مرتين، ثم أوجد $I$.', 'By parts twice, and solve for $I$.'), explanation: same('$\\begin{aligned}&2I=e^x(\\sin x-\\cos x)\\\\ &a=\\frac{1}{2}\\end{aligned}$') },
    { id: 107, stage: 'rational', points: 10, context: 'starter', prompt: find('\\int\\frac{2x}{x^2-1}\\,dx=a\\ln|x^2-1|+k'), expected: n(1), hint: say('Goian behekoaren deribatua dago.', 'Arriba está la derivada de abajo.', 'في الأعلى مشتقة الأسفل.', 'The top is the derivative of the bottom.'), explanation: same('$\\int\\frac{u\'}{u}\\,dx=\\ln|u|\\ \\to\\ a=1$') },
    { id: 108, stage: 'rational', points: 20, context: 'advanced', prompt: find('\\int\\frac{x+3}{x^2-x-2}\\,dx=A\\ln|x-2|+B\\ln|x+1|+k', 'A'), expected: f(5, 3), hint: same('$x^2-x-2=(x-2)(x+1)$'), explanation: same('$\\begin{aligned}&x+3=A(x+1)+B(x-2)\\\\ &x=2\\ \\to\\ 5=3A\\ \\to\\ A=\\frac{5}{3}\\end{aligned}$') },
    { id: 109, stage: 'rational', points: 30, context: 'master', prompt: find('\\int\\frac{x^3}{x^2+1}\\,dx=\\frac{x^2}{2}+a\\ln(x^2+1)+k'), expected: f(-1, 2), hint: say('Lehenik zatitu.', 'Primero divide.', 'اقسم أولًا.', 'Divide first.'), explanation: same('$\\begin{aligned}&\\frac{x^3}{x^2+1}=x-\\frac{x}{x^2+1}\\\\ &a=-\\frac{1}{2}\\end{aligned}$') },
    { id: 110, stage: 'substitution', points: 10, context: 'starter', prompt: say('$t=x^3+1$ hartuta, $\\int x^2\\sqrt{x^3+1}\\,dx=a\\sqrt{(x^3+1)^3}+k$. Aurkitu $a$.', 'Con $t=x^3+1$, $\\int x^2\\sqrt{x^3+1}\\,dx=a\\sqrt{(x^3+1)^3}+k$. Halla $a$.', 'مع $t=x^3+1$ يكون $\\int x^2\\sqrt{x^3+1}\\,dx=a\\sqrt{(x^3+1)^3}+k$. أوجد $a$.', 'With $t=x^3+1$, $\\int x^2\\sqrt{x^3+1}\\,dx=a\\sqrt{(x^3+1)^3}+k$. Find $a$.'), expected: f(2, 9), hint: same('$x^2\\,dx=\\frac{dt}{3}$'), explanation: same('$\\begin{aligned}&\\frac{1}{3}\\int t^{\\frac{1}{2}}\\,dt=\\frac{1}{3}\\cdot\\frac{2}{3}t^{\\frac{3}{2}}\\\\ &a=\\frac{2}{9}\\end{aligned}$') },
    { id: 111, stage: 'substitution', points: 20, context: 'advanced', prompt: find('\\int\\cos^3 x\\,dx=\\sin x+a\\sin^3 x+k'), expected: f(-1, 3), hint: same('$\\cos^2 x=1-\\sin^2 x\\qquad t=\\sin x$'), explanation: same('$\\begin{aligned}&\\int(1-t^2)\\,dt=t-\\frac{t^3}{3}\\\\ &a=-\\frac{1}{3}\\end{aligned}$') },
    { id: 112, stage: 'substitution', points: 30, context: 'master', prompt: say('$t=\\sqrt{x+1}$ hartuta, $\\int\\frac{x}{\\sqrt{x+1}}\\,dx=\\frac{2}{3}\\sqrt{(x+1)^3}+b\\sqrt{x+1}+k$. Aurkitu $b$.', 'Con $t=\\sqrt{x+1}$, $\\int\\frac{x}{\\sqrt{x+1}}\\,dx=\\frac{2}{3}\\sqrt{(x+1)^3}+b\\sqrt{x+1}+k$. Halla $b$.', 'مع $t=\\sqrt{x+1}$ يكون $\\int\\frac{x}{\\sqrt{x+1}}\\,dx=\\frac{2}{3}\\sqrt{(x+1)^3}+b\\sqrt{x+1}+k$. أوجد $b$.', 'With $t=\\sqrt{x+1}$, $\\int\\frac{x}{\\sqrt{x+1}}\\,dx=\\frac{2}{3}\\sqrt{(x+1)^3}+b\\sqrt{x+1}+k$. Find $b$.'), expected: n(-2), hint: same('$x=t^2-1\\qquad dx=2t\\,dt$'), explanation: same('$\\begin{aligned}&\\int(2t^2-2)\\,dt=\\frac{2t^3}{3}-2t\\\\ &b=-2\\end{aligned}$') },
    { id: 113, stage: 'strategy', points: 10, context: 'starter', prompt: say('$f\'(x)=4x^3$ eta $f(1)=3$ badira, kalkulatu $f(2)$.', 'Si $f\'(x)=4x^3$ y $f(1)=3$, calcula $f(2)$.', 'إذا كان $f\'(x)=4x^3$ و$f(1)=3$ فاحسب $f(2)$.', 'If $f\'(x)=4x^3$ and $f(1)=3$, work out $f(2)$.'), expected: n(18), hint: same('$f(x)=x^4+k$'), explanation: same('$\\begin{aligned}&1+k=3\\ \\to\\ k=2\\\\ &f(2)=16+2=18\\end{aligned}$') },
    { id: 114, stage: 'strategy', points: 20, context: 'advanced', prompt: say('$f\'\'(x)=12x^2$, $f\'(1)=5$ eta $f(1)=4$ badira, kalkulatu $f(0)$.', 'Si $f\'\'(x)=12x^2$, $f\'(1)=5$ y $f(1)=4$, calcula $f(0)$.', 'إذا كان $f\'\'(x)=12x^2$ و$f\'(1)=5$ و$f(1)=4$ فاحسب $f(0)$.', 'If $f\'\'(x)=12x^2$, $f\'(1)=5$ and $f(1)=4$, work out $f(0)$.'), expected: n(2), hint: same('$f\'(x)=4x^3+k_1$'), explanation: same('$\\begin{aligned}&k_1=1\\qquad f(x)=x^4+x+k_2\\\\ &2+k_2=4\\ \\to\\ f(0)=k_2=2\\end{aligned}$') },
    { id: 115, stage: 'strategy', points: 30, context: 'master', prompt: say('$f$ funtzioaren zuzen ukitzailea $x=0$ puntuan $y=2x+1$ da, eta $f\'\'(x)=6x$. Kalkulatu $f(1)$.', 'La tangente a $f$ en $x=0$ es $y=2x+1$, y $f\'\'(x)=6x$. Calcula $f(1)$.', 'المماس لـ $f$ عند $x=0$ هو $y=2x+1$، و$f\'\'(x)=6x$. احسب $f(1)$.', 'The tangent to $f$ at $x=0$ is $y=2x+1$, and $f\'\'(x)=6x$. Work out $f(1)$.'), expected: n(4), hint: say('Ukitzaileak $f\'(0)=2$ eta $f(0)=1$ ematen ditu.', 'La tangente da $f\'(0)=2$ y $f(0)=1$.', 'المماس يعطي $f\'(0)=2$ و$f(0)=1$.', 'The tangent gives $f\'(0)=2$ and $f(0)=1$.'), explanation: same('$\\begin{aligned}&f(x)=x^3+2x+1\\\\ &f(1)=1+2+1=4\\end{aligned}$') }
]

export const bach2IndefiniteExerciseBank: ExerciseSection[] = [
    {
        id: 'review',
        title: say('Berehalakoak eta konposatuak', 'Inmediatas y compuestas', 'المباشرة والمركّبة', 'Basic and composite'),
        items: [
            { id: 1, difficulty: 'easy', question: work('\\int(5x^4-6x+1)\\,dx'), solution: same('$x^5-3x^2+x+k$') },
            { id: 2, difficulty: 'easy', question: work('\\int\\left(\\frac{3}{x}+e^x\\right)dx'), solution: same('$3\\ln|x|+e^x+k$') },
            { id: 3, difficulty: 'easy', question: work('\\int(2\\cos x-\\sin x)\\,dx'), solution: same('$2\\sin x+\\cos x+k$') },
            { id: 4, difficulty: 'medium', question: work('\\int 3x^2(x^3-2)^5\\,dx'), solution: same('$\\frac{(x^3-2)^6}{6}+k$') },
            { id: 5, difficulty: 'medium', question: work('\\int xe^{x^2}\\,dx'), solution: same('$\\frac{1}{2}\\int 2xe^{x^2}\\,dx=\\frac{1}{2}e^{x^2}+k$') },
            { id: 6, difficulty: 'medium', question: work('\\int\\frac{\\cos x}{2+\\sin x}\\,dx'), solution: same('$\\ln(2+\\sin x)+k$') },
            { id: 7, difficulty: 'medium', question: work('\\int e^x\\cos(e^x)\\,dx'), solution: same('$\\sin(e^x)+k$') },
            { id: 8, difficulty: 'medium', question: work('\\int\\frac{dx}{1+16x^2}'), solution: same('$\\begin{aligned}&\\frac{1}{4}\\int\\frac{4}{1+(4x)^2}\\,dx\\\\ &=\\frac{1}{4}\\arctan(4x)+k\\end{aligned}$') },
            { id: 9, difficulty: 'hard', question: work('\\int\\frac{x}{1+x^4}\\,dx'), solution: same('$\\frac{1}{2}\\int\\frac{2x}{1+(x^2)^2}\\,dx=\\frac{1}{2}\\arctan(x^2)+k$') },
            { id: 10, difficulty: 'hard', question: work('\\int\\frac{dx}{\\sqrt{9-x^2}}'), solution: same('$\\int\\frac{\\frac{1}{3}\\,dx}{\\sqrt{1-\\left(\\frac{x}{3}\\right)^2}}=\\arcsin\\frac{x}{3}+k$') }
        ]
    },
    {
        id: 'parts',
        title: say('Zatikako integrazioa', 'Integración por partes', 'التكامل بالتجزئة', 'Integration by parts'),
        items: [
            { id: 11, difficulty: 'easy', question: work('\\int xe^{-x}\\,dx'), solution: same('$\\begin{aligned}&-xe^{-x}+\\int e^{-x}\\,dx\\\\ &=-e^{-x}(x+1)+k\\end{aligned}$') },
            { id: 12, difficulty: 'easy', question: work('\\int x\\sin(2x)\\,dx'), solution: same('$\\begin{aligned}&-\\frac{x\\cos(2x)}{2}+\\int\\frac{\\cos(2x)}{2}\\,dx\\\\ &=-\\frac{x\\cos(2x)}{2}+\\frac{\\sin(2x)}{4}+k\\end{aligned}$') },
            { id: 13, difficulty: 'medium', question: work('\\int x^2\\ln x\\,dx'), solution: same('$\\begin{aligned}&\\frac{x^3}{3}\\ln x-\\int\\frac{x^2}{3}\\,dx\\\\ &=\\frac{x^3}{3}\\ln x-\\frac{x^3}{9}+k\\end{aligned}$') },
            { id: 14, difficulty: 'medium', question: work('\\int\\ln(x+1)\\,dx'), solution: same('$\\begin{aligned}&x\\ln(x+1)-\\int\\frac{x}{x+1}\\,dx\\\\ &=(x+1)\\ln(x+1)-x+k\\end{aligned}$') },
            { id: 15, difficulty: 'medium', question: work('\\int\\arcsin x\\,dx'), solution: same('$\\begin{aligned}&x\\arcsin x-\\int\\frac{x}{\\sqrt{1-x^2}}\\,dx\\\\ &=x\\arcsin x+\\sqrt{1-x^2}+k\\end{aligned}$') },
            { id: 16, difficulty: 'medium', question: work('\\int x^2e^{2x}\\,dx'), solution: same('$e^{2x}\\left(\\frac{x^2}{2}-\\frac{x}{2}+\\frac{1}{4}\\right)+k$') },
            { id: 17, difficulty: 'hard', question: work('\\int x^2\\sin x\\,dx'), solution: same('$-x^2\\cos x+2x\\sin x+2\\cos x+k$') },
            { id: 18, difficulty: 'hard', question: work('\\int e^{2x}\\cos x\\,dx'), solution: same('$\\begin{aligned}&I=e^{2x}\\sin x+2e^{2x}\\cos x-4I\\\\ &I=\\frac{e^{2x}(\\sin x+2\\cos x)}{5}+k\\end{aligned}$') },
            { id: 19, difficulty: 'hard', question: work('\\int(\\ln x)^2\\,dx'), solution: same('$x(\\ln x)^2-2x\\ln x+2x+k$') },
            { id: 20, difficulty: 'hard', question: find('\\int xe^{3x}\\,dx=e^{3x}(ax+b)+k', 'b'), solution: same('$\\begin{aligned}&\\frac{xe^{3x}}{3}-\\frac{e^{3x}}{9}\\\\ &a=\\frac{1}{3}\\qquad b=-\\frac{1}{9}\\end{aligned}$'), answer: { expected: f(-1, 9) } }
        ]
    },
    {
        id: 'rational',
        title: say('Integral arrazionalak', 'Integrales racionales', 'التكاملات الكسرية', 'Rational integrals'),
        items: [
            { id: 21, difficulty: 'easy', question: work('\\int\\frac{x+2}{x}\\,dx'), solution: same('$\\int\\left(1+\\frac{2}{x}\\right)dx=x+2\\ln|x|+k$') },
            { id: 22, difficulty: 'easy', question: work('\\int\\frac{3}{x-2}\\,dx'), solution: same('$3\\ln|x-2|+k$') },
            { id: 23, difficulty: 'medium', question: work('\\int\\frac{x^2-2}{x+1}\\,dx'), solution: same('$\\begin{aligned}&\\int\\left(x-1-\\frac{1}{x+1}\\right)dx\\\\ &=\\frac{x^2}{2}-x-\\ln|x+1|+k\\end{aligned}$') },
            { id: 24, difficulty: 'medium', question: work('\\int\\frac{4}{x^2-4}\\,dx'), solution: same('$\\begin{aligned}&\\int\\left(\\frac{1}{x-2}-\\frac{1}{x+2}\\right)dx\\\\ &=\\ln|x-2|-\\ln|x+2|+k\\end{aligned}$') },
            { id: 25, difficulty: 'medium', question: work('\\int\\frac{3x-1}{x^2-x}\\,dx'), solution: same('$\\begin{aligned}&\\int\\left(\\frac{1}{x}+\\frac{2}{x-1}\\right)dx\\\\ &=\\ln|x|+2\\ln|x-1|+k\\end{aligned}$') },
            { id: 26, difficulty: 'medium', question: work('\\int\\frac{x+2}{(x-1)^2}\\,dx'), solution: same('$\\begin{aligned}&\\int\\left(\\frac{1}{x-1}+\\frac{3}{(x-1)^2}\\right)dx\\\\ &=\\ln|x-1|-\\frac{3}{x-1}+k\\end{aligned}$') },
            { id: 27, difficulty: 'medium', question: work('\\int\\frac{dx}{x^2+4x+8}'), solution: same('$\\int\\frac{dx}{(x+2)^2+4}=\\frac{1}{2}\\arctan\\frac{x+2}{2}+k$') },
            { id: 28, difficulty: 'hard', question: work('\\int\\frac{2x+3}{x^2+2x+2}\\,dx'), solution: same('$\\begin{aligned}&\\int\\frac{2x+2}{x^2+2x+2}\\,dx+\\int\\frac{dx}{(x+1)^2+1}\\\\ &=\\ln(x^2+2x+2)\\\\ &\\quad+\\arctan(x+1)+k\\end{aligned}$') },
            { id: 29, difficulty: 'hard', question: work('\\int\\frac{x^2+1}{x(x-1)^2}\\,dx'), solution: same('$\\begin{aligned}&\\int\\left(\\frac{1}{x}+\\frac{2}{(x-1)^2}\\right)dx\\\\ &=\\ln|x|-\\frac{2}{x-1}+k\\end{aligned}$') },
            { id: 30, difficulty: 'hard', question: work('\\int\\frac{x^3+x+1}{x^2+1}\\,dx'), solution: same('$\\begin{aligned}&\\int\\left(x+\\frac{1}{x^2+1}\\right)dx\\\\ &=\\frac{x^2}{2}+\\arctan x+k\\end{aligned}$') }
        ]
    },
    {
        id: 'substitution',
        title: say('Aldagai-aldaketa', 'Cambio de variable', 'تغيير المتغير', 'Substitution'),
        items: [
            { id: 31, difficulty: 'easy', question: work('\\int\\frac{\\ln x}{x}\\,dx'), solution: same('$t=\\ln x\\qquad\\int t\\,dt=\\frac{(\\ln x)^2}{2}+k$') },
            { id: 32, difficulty: 'easy', question: work('\\int\\cos x\\sin^4 x\\,dx'), solution: same('$t=\\sin x\\qquad\\int t^4\\,dt=\\frac{\\sin^5 x}{5}+k$') },
            { id: 33, difficulty: 'medium', question: work('\\int x\\sqrt{x^2+4}\\,dx'), solution: same('$\\begin{aligned}&t=x^2+4\\qquad\\frac{1}{2}\\int\\sqrt{t}\\,dt\\\\ &=\\frac{1}{3}\\sqrt{(x^2+4)^3}+k\\end{aligned}$') },
            { id: 34, difficulty: 'medium', question: work('\\int\\frac{e^x}{e^x+3}\\,dx'), solution: same('$t=e^x+3\\qquad\\ln(e^x+3)+k$') },
            { id: 35, difficulty: 'medium', question: work('\\int x\\sqrt{x-1}\\,dx'), solution: same('$\\begin{aligned}&t^2=x-1\\qquad\\int(2t^4+2t^2)\\,dt\\\\ &=\\frac{2}{5}\\sqrt{(x-1)^5}+\\frac{2}{3}\\sqrt{(x-1)^3}+k\\end{aligned}$') },
            { id: 36, difficulty: 'medium', question: work('\\int\\sin^5 x\\,dx'), solution: same('$\\begin{aligned}&t=\\cos x\\qquad-\\int(1-t^2)^2\\,dt\\\\ &=-\\cos x+\\frac{2}{3}\\cos^3 x-\\frac{\\cos^5 x}{5}+k\\end{aligned}$') },
            { id: 37, difficulty: 'medium', question: work('\\int\\frac{dx}{x\\ln x}'), solution: same('$t=\\ln x\\qquad\\int\\frac{dt}{t}=\\ln|\\ln x|+k$') },
            { id: 38, difficulty: 'hard', question: work('\\int\\sqrt{1-x^2}\\,dx'), solution: same('$\\begin{aligned}&x=\\sin t\\qquad\\int\\cos^2 t\\,dt\\\\ &=\\frac{\\arcsin x}{2}+\\frac{x\\sqrt{1-x^2}}{2}+k\\end{aligned}$') },
            { id: 39, difficulty: 'hard', question: work('\\int\\frac{dx}{e^x+e^{-x}}'), solution: same('$\\begin{aligned}&t=e^x\\qquad\\int\\frac{dt}{t^2+1}\\\\ &=\\arctan(e^x)+k\\end{aligned}$') },
            { id: 40, difficulty: 'hard', question: work('\\int\\frac{dx}{\\sqrt{x}(1+x)}'), solution: same('$\\begin{aligned}&t=\\sqrt{x}\\qquad\\int\\frac{2\\,dt}{1+t^2}\\\\ &=2\\arctan\\sqrt{x}+k\\end{aligned}$') }
        ]
    },
    {
        id: 'strategy',
        title: say('Metodoa eta baldintzak', 'Método y condiciones', 'الطريقة والشروط', 'Method and conditions'),
        items: [
            { id: 41, difficulty: 'easy', question: method('\\int x^2e^{x^3}\\,dx'), solution: say('Konposatua ($u=x^3$): $\\frac{1}{3}e^{x^3}+k$.', 'Compuesta ($u=x^3$): $\\frac{1}{3}e^{x^3}+k$.', 'مركّب ($u=x^3$): $\\frac{1}{3}e^{x^3}+k$.', 'Composite ($u=x^3$): $\\frac{1}{3}e^{x^3}+k$.') },
            { id: 42, difficulty: 'easy', question: method('\\int\\frac{x+1}{x^2+2x}\\,dx'), solution: say('Goian behekoaren deribatuaren erdia dago: $\\frac{1}{2}\\ln|x^2+2x|+k$.', 'Arriba está la mitad de la derivada de abajo: $\\frac{1}{2}\\ln|x^2+2x|+k$.', 'في الأعلى نصف مشتقة الأسفل: $\\frac{1}{2}\\ln|x^2+2x|+k$.', 'The top is half the derivative of the bottom: $\\frac{1}{2}\\ln|x^2+2x|+k$.') },
            { id: 43, difficulty: 'medium', question: method('\\int xe^{-2x}\\,dx'), solution: say('Zatika, $u=x$ hartuta: $-\\frac{xe^{-2x}}{2}-\\frac{e^{-2x}}{4}+k$.', 'Por partes, con $u=x$: $-\\frac{xe^{-2x}}{2}-\\frac{e^{-2x}}{4}+k$.', 'بالتجزئة مع $u=x$: $-\\frac{xe^{-2x}}{2}-\\frac{e^{-2x}}{4}+k$.', 'By parts, with $u=x$: $-\\frac{xe^{-2x}}{2}-\\frac{e^{-2x}}{4}+k$.') },
            { id: 44, difficulty: 'medium', question: say('Aurkitu $f$, $f\'(x)=3x^2-4$ eta $f(1)=2$ badira.', 'Halla $f$ si $f\'(x)=3x^2-4$ y $f(1)=2$.', 'أوجد $f$ إذا كان $f\'(x)=3x^2-4$ و$f(1)=2$.', 'Find $f$ if $f\'(x)=3x^2-4$ and $f(1)=2$.'), solution: same('$\\begin{aligned}&f(x)=x^3-4x+k\\\\ &-3+k=2\\ \\to\\ f(x)=x^3-4x+5\\end{aligned}$') },
            { id: 45, difficulty: 'medium', question: say('$f\'(x)=\\frac{1}{x+1}$ da, eta $f(0)=3$. Kalkulatu $f(e-1)$.', '$f\'(x)=\\frac{1}{x+1}$ y $f(0)=3$. Calcula $f(e-1)$.', '$f\'(x)=\\frac{1}{x+1}$ و$f(0)=3$. احسب $f(e-1)$.', '$f\'(x)=\\frac{1}{x+1}$ and $f(0)=3$. Work out $f(e-1)$.'), solution: same('$\\begin{aligned}&f(x)=\\ln|x+1|+3\\\\ &f(e-1)=\\ln e+3=4\\end{aligned}$'), answer: { expected: n(4) } },
            { id: 46, difficulty: 'medium', question: say('Aurkitu $f$, $f\'\'(x)=2$, $f\'(0)=-4$ eta $f(0)=1$ badira.', 'Halla $f$ si $f\'\'(x)=2$, $f\'(0)=-4$ y $f(0)=1$.', 'أوجد $f$ إذا كان $f\'\'(x)=2$ و$f\'(0)=-4$ و$f(0)=1$.', 'Find $f$ if $f\'\'(x)=2$, $f\'(0)=-4$ and $f(0)=1$.'), solution: same('$\\begin{aligned}&f\'(x)=2x-4\\\\ &f(x)=x^2-4x+1\\end{aligned}$') },
            { id: 47, difficulty: 'medium', question: say('Aurkitu $(0,\\,1)$ puntutik pasatzen den kurba, puntu bakoitzean $f\'(x)=\\cos x+e^x$ malda duena.', 'Halla la curva que pasa por $(0,\\,1)$ y cuya pendiente en cada punto es $f\'(x)=\\cos x+e^x$.', 'أوجد المنحنى الذي يمر بالنقطة $(0,\\,1)$ وميله عند كل نقطة $f\'(x)=\\cos x+e^x$.', 'Find the curve through $(0,\\,1)$ whose slope at each point is $f\'(x)=\\cos x+e^x$.'), solution: same('$\\begin{aligned}&f(x)=\\sin x+e^x+k\\\\ &1+k=1\\ \\to\\ f(x)=\\sin x+e^x\\end{aligned}$') },
            { id: 48, difficulty: 'hard', question: say('$f\'\'(x)=e^x$ da, eta $f$ funtzioaren zuzen ukitzailea $x=0$ puntuan $y=2x+3$ da. Aurkitu $f$.', '$f\'\'(x)=e^x$ y la tangente a $f$ en $x=0$ es $y=2x+3$. Halla $f$.', '$f\'\'(x)=e^x$ والمماس لـ $f$ عند $x=0$ هو $y=2x+3$. أوجد $f$.', '$f\'\'(x)=e^x$ and the tangent to $f$ at $x=0$ is $y=2x+3$. Find $f$.'), solution: same('$\\begin{aligned}&f\'(x)=e^x+1\\\\ &f(x)=e^x+x+2\\end{aligned}$') },
            { id: 49, difficulty: 'hard', question: say('Aurkitu $f(x)=\\frac{2}{x^2-1}$ funtzioaren jatorrizkoa, $(2,\\,0)$ puntutik pasatzen dena.', 'Halla la primitiva de $f(x)=\\frac{2}{x^2-1}$ que pasa por $(2,\\,0)$.', 'أوجد الدالة الأصلية لـ $f(x)=\\frac{2}{x^2-1}$ التي تمر بالنقطة $(2,\\,0)$.', 'Find the antiderivative of $f(x)=\\frac{2}{x^2-1}$ through $(2,\\,0)$.'), solution: same('$\\begin{aligned}&F(x)=\\ln|x-1|-\\ln|x+1|+k\\\\ &0-\\ln 3+k=0\\ \\to\\ k=\\ln 3\\end{aligned}$') },
            { id: 50, difficulty: 'hard', question: say('$f\'\'(x)=6x-6$ da, eta $f$ funtzioaren grafikoak ukitzaile horizontala du $(2,\\,-1)$ puntuan. Aurkitu $f$.', '$f\'\'(x)=6x-6$ y la gráfica de $f$ tiene tangente horizontal en $(2,\\,-1)$. Halla $f$.', '$f\'\'(x)=6x-6$ ولمنحنى $f$ مماس أفقي عند $(2,\\,-1)$. أوجد $f$.', '$f\'\'(x)=6x-6$ and the graph of $f$ has a horizontal tangent at $(2,\\,-1)$. Find $f$.'), solution: same('$\\begin{aligned}&f\'(x)=3x^2-6x\\qquad f\'(2)=0\\\\ &f(x)=x^3-3x^2+3\\end{aligned}$') }
        ]
    }
]

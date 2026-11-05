import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Ekuazioak eta inekuazioak · Batxilergoa 1 · Zientziak — diagnostic,
   guided practice, exercise bank and challenges, with the scope of unit 2
   of Santillana 1.º Bachillerato Ciencias and unit 3 of Anaya Matemáticas
   I (all the exercises and numbers are our own). Every closed answer is a
   single number: when an equation has several solutions the question asks
   for one of them, their sum or how many there are; for an inequality, an
   end or how many integers it holds.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

const HUNDREDTHS = say('Hurbildu ehunenetara.', 'Aproxima a las centésimas.', 'قرّب إلى الأجزاء من مئة.', 'Round to two decimal places.')
const AS_FRACTION = say('Eman zatiki gisa.', 'Dalo como fracción.', 'اكتبه كسرًا.', 'Give it as a fraction.')
/** A prompt followed by an instruction (rounding, fraction) */
const with_ = (prompt: LocalizedText, ...rules: LocalizedText[]): LocalizedText => ({
    eu: [prompt.eu, ...rules.map((rule) => rule.eu)].join(' '),
    es: [prompt.es, ...rules.map((rule) => rule.es)].join(' '),
    en: [prompt.en, ...rules.map((rule) => rule.en)].join(' '),
    ar: [prompt.ar, ...rules.map((rule) => rule.ar)].join(' ')
})
const solve = (formula: string) => say(`Ebatzi ${formula}.`, `Resuelve ${formula}.`, `حُلّ ${formula}.`, `Solve ${formula}.`)
/** «Solve …» and then what to give */
const solveGive = (formula: string, give: LocalizedText) => with_(solve(formula), give)
const LARGEST = say('Eman soluziorik handiena.', 'Da la mayor solución.', 'اكتب أكبر حل.', 'Give the largest solution.')
const POSITIVE = say('Eman soluzio positiboa.', 'Da la solución positiva.', 'اكتب الحل الموجب.', 'Give the positive solution.')
const NEGATIVE = say('Eman soluzio negatiboa.', 'Da la solución negativa.', 'اكتب الحل السالب.', 'Give the negative solution.')
const SUM = say('Eman soluzioen batura.', 'Da la suma de las soluciones.', 'اكتب مجموع الحلول.', 'Give the sum of the solutions.')
const HOW_MANY = say('Zenbat soluzio ditu?', '¿Cuántas soluciones tiene?', 'كم حلًّا لها؟', 'How many solutions does it have?')
/** «How many integers satisfy …?» */
const integers = (formula: string) => say(`Zenbat zenbaki osok betetzen dute ${formula}?`, `¿Cuántos números enteros cumplen ${formula}?`, `كم عددًا صحيحًا يحقق ${formula}؟`, `How many integers satisfy ${formula}?`)

export const bachEquationsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 7901,
        prompt: say('Polinomio baten koefizienteak osoak dira eta gai askea 6 da. Zein izan daitezke haren erro osoak?', 'Un polinomio tiene coeficientes enteros y término independiente 6. ¿Qué pueden ser sus raíces enteras?', 'حدودية معاملاتها صحيحة وحدها الثابت 6. ماذا يمكن أن تكون جذورها الصحيحة؟', 'A polynomial has integer coefficients and constant term 6. What can its integer roots be?'),
        options: [say('6 zenbakiaren zatitzaileak', 'Divisores de 6', 'قواسم 6', 'Divisors of 6'), say('6 zenbakiaren multiploak', 'Múltiplos de 6', 'مضاعفات 6', 'Multiples of 6'), say('Edozein zenbaki oso', 'Cualquier entero', 'أي عدد صحيح', 'Any integer')],
        correctIndex: 0,
        explanation: say('$a$ erroa bada, $a$ zenbakiak gai askea zatitzen du: $\\pm 1$, $\\pm 2$, $\\pm 3$ edo $\\pm 6$.', 'Si $a$ es raíz, $a$ divide al término independiente: $\\pm 1$, $\\pm 2$, $\\pm 3$ o $\\pm 6$.', 'إذا كان $a$ جذرًا فإن $a$ يقسم الحد الثابت: $\\pm 1$ أو $\\pm 2$ أو $\\pm 3$ أو $\\pm 6$.', 'If $a$ is a root, $a$ divides the constant term: $\\pm 1$, $\\pm 2$, $\\pm 3$ or $\\pm 6$.'),
        topic: 'ruffini-roots'
    },
    {
        id: 7902,
        prompt: say('Zein da $x^3-4x$ polinomioaren faktorizazioa?', '¿Cuál es la factorización de $x^3-4x$?', 'ما تحليل $x^3-4x$؟', 'What is the factorisation of $x^3-4x$?'),
        options: [same('$x(x^2+4)$'), same('$x(x-2)(x+2)$'), same('$(x-2)(x+2)$')],
        correctIndex: 1,
        explanation: same('$x^3-4x=x(x^2-4)=x(x-2)(x+2)$'),
        topic: 'factorize-high'
    },
    {
        id: 7903,
        prompt: say('Zenbat soluzio erreal ditu $x^4-16=0$ ekuazioak?', '¿Cuántas soluciones reales tiene $x^4-16=0$?', 'كم حلًّا حقيقيًّا للمعادلة $x^4-16=0$؟', 'How many real solutions does $x^4-16=0$ have?'),
        options: [same('$4$'), same('$1$'), same('$2$')],
        correctIndex: 2,
        explanation: say('$x^2=4$ ekuazioak $x=\\pm 2$ ematen du; $x^2=-4$ ekuazioak ez du soluziorik.', '$x^2=4$ da $x=\\pm 2$; $x^2=-4$ no tiene solución.', 'تعطي $x^2=4$ الحلين $x=\\pm 2$، وليس لـ $x^2=-4$ حل.', '$x^2=4$ gives $x=\\pm 2$; $x^2=-4$ has no solution.'),
        topic: 'change-variable'
    },
    {
        id: 7904,
        prompt: say('$\\frac{x^2}{x-1}=\\frac{1}{x-1}$ ebaztean, $x=\\pm 1$ ateratzen da. Zein da soluzioa?', 'Al resolver $\\frac{x^2}{x-1}=\\frac{1}{x-1}$ sale $x=\\pm 1$. ¿Cuál es la solución?', 'عند حل $\\frac{x^2}{x-1}=\\frac{1}{x-1}$ نحصل على $x=\\pm 1$. ما الحل؟', 'Solving $\\frac{x^2}{x-1}=\\frac{1}{x-1}$ gives $x=\\pm 1$. Which is the solution?'),
        options: [same('$x=-1$'), same('$x=1$'), say('Biak', 'Las dos', 'كلاهما', 'Both')],
        correctIndex: 0,
        explanation: say('$x=1$ balioak izendatzailea anulatzen du.', '$x=1$ anula el denominador.', '$x=1$ يعدم المقام.', '$x=1$ makes the denominator zero.'),
        topic: 'rational-equations'
    },
    {
        id: 7905,
        prompt: solve('$\\sqrt{x}=x-2$'),
        options: [same('$1$'), same('$4$'), say('1 eta 4', '1 y 4', '1 و4', '1 and 4')],
        correctIndex: 1,
        explanation: say('$x^2-5x+4=0$ ekuazioak 1 eta 4 ematen ditu; 1 zenbakiarekin, $1\\neq -1$.', 'Sale $x^2-5x+4=0$, con 1 y 4; con 1, $1\\neq -1$.', 'نحصل على $x^2-5x+4=0$ وحلّاها 1 و4؛ ومع 1 يكون $1\\neq -1$.', 'You get $x^2-5x+4=0$, with 1 and 4; with 1, $1\\neq -1$.'),
        topic: 'radical-equations'
    },
    {
        id: 7906,
        prompt: say('Zein dira $|x-1|=3$ ekuazioaren soluzioak?', '¿Cuáles son las soluciones de $|x-1|=3$?', 'ما حلول $|x-1|=3$؟', 'What are the solutions of $|x-1|=3$?'),
        options: [same('$4$'), same('$-2$'), say('$4$ eta $-2$', '$4$ y $-2$', '$4$ و$-2$', '$4$ and $-2$')],
        correctIndex: 2,
        explanation: same('$x-1=3\\ \\to\\ x=4\\qquad x-1=-3\\ \\to\\ x=-2$'),
        topic: 'absolute-equations'
    },
    {
        id: 7907,
        prompt: solve('$2^x=16$'),
        options: [same('$4$'), same('$8$'), same('$14$')],
        correctIndex: 0,
        explanation: same('$2^x=2^4\\ \\to\\ x=4$'),
        topic: 'exponential-equations'
    },
    {
        id: 7908,
        prompt: say('Zein da $(x-1)(x-3)<0$ inekuazioaren soluzioa?', '¿Cuál es la solución de $(x-1)(x-3)<0$?', 'ما حل $(x-1)(x-3)<0$؟', 'What is the solution of $(x-1)(x-3)<0$?'),
        options: [same('$(-\\infty,1)\\cup(3,+\\infty)$'), same('$(1,3)$'), same('$[1,3]$')],
        correctIndex: 1,
        explanation: say('Bi faktoreek zeinu desberdina dute 1 eta 3 artean.', 'Los dos factores tienen distinto signo entre 1 y 3.', 'للعاملين إشارتان مختلفتان بين 1 و3.', 'The two factors have different signs between 1 and 3.'),
        topic: 'polynomial-inequalities'
    }
]

export const bachEquationsPractice: PracticeItem[] = [
    /* ---------- Polynomials ---------- */
    { id: 1, stage: 'polynomials', prompt: say('Zenbat erro oso ditu $x^3-7x+6$ polinomioak?', '¿Cuántas raíces enteras tiene $x^3-7x+6$?', 'كم جذرًا صحيحًا للحدودية $x^3-7x+6$؟', 'How many integer roots does $x^3-7x+6$ have?'), expected: n(3), hint: say('Probatu 6 zenbakiaren zatitzaileak.', 'Prueba los divisores de 6.', 'جرّب قواسم 6.', 'Try the divisors of 6.'), explanation: same('$x^3-7x+6=(x-1)(x-2)(x+3)$') },
    { id: 2, stage: 'polynomials', prompt: say('Aurkitu $k$, $x=2$ izan dadin $x^3+kx^2-4$ polinomioaren erroa.', 'Halla $k$ para que $x=2$ sea raíz de $x^3+kx^2-4$.', 'أوجد $k$ ليكون $x=2$ جذرًا للحدودية $x^3+kx^2-4$.', 'Find $k$ so that $x=2$ is a root of $x^3+kx^2-4$.'), expected: n(-1), hint: say('Ordezkatu $x=2$ eta berdindu 0 zenbakiarekin.', 'Sustituye $x=2$ e iguala a 0.', 'عوّض $x=2$ وساوِ بـ 0.', 'Substitute $x=2$ and set it equal to 0.'), explanation: same('$8+4k-4=0\\ \\to\\ k=-1$') },
    { id: 3, stage: 'polynomials', prompt: with_(say('Sinplifikatu $\\frac{x^2-1}{x^2+2x+1}$, eta kalkulatu haren balioa $x=3$ denean.', 'Simplifica $\\frac{x^2-1}{x^2+2x+1}$ y calcula su valor en $x=3$.', 'بسّط $\\frac{x^2-1}{x^2+2x+1}$ واحسب قيمته عند $x=3$.', 'Simplify $\\frac{x^2-1}{x^2+2x+1}$ and work out its value at $x=3$.'), AS_FRACTION), expected: f(1, 2), hint: same('$x^2+2x+1=(x+1)^2$'), explanation: same('$\\frac{x-1}{x+1}\\ \\to\\ \\frac{3-1}{3+1}=\\frac{1}{2}$') },
    { id: 4, stage: 'polynomials', prompt: say('Zein da $x^4-3x^2+2$ zati $x+2$ zatiketaren hondarra?', '¿Cuál es el resto de dividir $x^4-3x^2+2$ entre $x+2$?', 'ما باقي قسمة $x^4-3x^2+2$ على $x+2$؟', 'What is the remainder when $x^4-3x^2+2$ is divided by $x+2$?'), expected: n(6), hint: say('Hondarraren teorema: kalkulatu $P(-2)$.', 'Teorema del resto: calcula $P(-2)$.', 'مبرهنة الباقي: احسب $P(-2)$.', 'Remainder theorem: work out $P(-2)$.'), explanation: same('$P(-2)=16-12+2=6$') },

    /* ---------- Polynomial and rational equations ---------- */
    { id: 5, stage: 'polynomial-equations', prompt: solveGive('$x^3-2x^2-3x=0$', POSITIVE), expected: n(3), hint: say('Atera $x$ faktore komun gisa.', 'Saca $x$ factor común.', 'أخرج $x$ عاملًا مشتركًا.', 'Take $x$ out as a common factor.'), explanation: same('$x(x-3)(x+1)=0$') },
    { id: 6, stage: 'polynomial-equations', prompt: solveGive('$x^4-13x^2+36=0$', LARGEST), expected: n(3), hint: say('Aldaketa: $t=x^2$.', 'Cambio: $t=x^2$.', 'التغيير: $t=x^2$.', 'Change: $t=x^2$.'), explanation: same('$t=4,\\ t=9\\ \\to\\ x=\\pm 2,\\ x=\\pm 3$') },
    { id: 7, stage: 'polynomial-equations', prompt: solveGive('$x^6+7x^3-8=0$', NEGATIVE), expected: n(-2), hint: say('Aldaketa: $t=x^3$.', 'Cambio: $t=x^3$.', 'التغيير: $t=x^3$.', 'Change: $t=x^3$.'), explanation: same('$t=1,\\ t=-8\\ \\to\\ x=1,\\ x=-2$') },
    { id: 8, stage: 'polynomial-equations', prompt: solve('$\\frac{3}{x-1}+\\frac{1}{x+1}=\\frac{2}{x^2-1}$'), expected: n(0), hint: say('Biderkatu $(x-1)(x+1)$ adierazpenaz.', 'Multiplica por $(x-1)(x+1)$.', 'اضرب في $(x-1)(x+1)$.', 'Multiply by $(x-1)(x+1)$.'), explanation: same('$3(x+1)+(x-1)=2\\ \\to\\ 4x=0$') },

    /* ---------- Radicals and absolute value ---------- */
    { id: 9, stage: 'radical-absolute', prompt: solve('$\\sqrt{x+2}=x$'), expected: n(2), hint: say('Jaso karratura, eta egiaztatu.', 'Eleva al cuadrado y comprueba.', 'ربّع ثم تحقق.', 'Square and check.'), explanation: say('$x^2-x-2=0$ ekuazioak 2 eta $-1$ ematen ditu; $\\sqrt{1}\\neq -1$, beraz $-1$ ez da soluzioa.', 'Sale $x^2-x-2=0$, con 2 y $-1$; como $\\sqrt{1}\\neq -1$, el $-1$ no vale.', 'نحصل على $x^2-x-2=0$ وحلّاها 2 و$-1$؛ وبما أن $\\sqrt{1}\\neq -1$ فإن $-1$ ليس حلًّا.', 'You get $x^2-x-2=0$, with 2 and $-1$; since $\\sqrt{1}\\neq -1$, $-1$ does not work.') },
    { id: 10, stage: 'radical-absolute', prompt: solve('$\\sqrt{x+9}-\\sqrt{x}=1$'), expected: n(16), hint: say('Isolatu $\\sqrt{x+9}$ eta jaso karratura.', 'Aísla $\\sqrt{x+9}$ y eleva al cuadrado.', 'اعزل $\\sqrt{x+9}$ وربّع.', 'Isolate $\\sqrt{x+9}$ and square.'), explanation: same('$\\begin{gathered}x+9=1+2\\sqrt{x}+x\\ \\to\\ \\sqrt{x}=4\\ \\to\\ x=16\\\\ \\sqrt{25}-\\sqrt{16}=1\\end{gathered}$') },
    { id: 11, stage: 'radical-absolute', prompt: with_(solveGive('$|3x-2|=7$', NEGATIVE), AS_FRACTION), expected: f(-5, 3), hint: say('Kasu negatiboa: $3x-2=-7$.', 'El caso negativo: $3x-2=-7$.', 'الحالة السالبة: $3x-2=-7$.', 'The negative case: $3x-2=-7$.'), explanation: same('$3x-2=-7\\ \\to\\ x=-\\frac{5}{3}$') },
    { id: 12, stage: 'radical-absolute', prompt: with_(say('Begiratu $|x-2|=|2x+1|$ ekuazioari.', 'Mira la ecuación $|x-2|=|2x+1|$.', 'انظر إلى المعادلة $|x-2|=|2x+1|$.', 'Look at the equation $|x-2|=|2x+1|$.'), HOW_MANY), expected: n(2), hint: same('$x-2=2x+1\\qquad x-2=-(2x+1)$'), explanation: say('$x-2=2x+1$ kasuak $x=-3$ ematen du, eta $x-2=-(2x+1)$ kasuak $x=\\frac{1}{3}$: 2 soluzio.', 'El caso $x-2=2x+1$ da $x=-3$, y $x-2=-(2x+1)$ da $x=\\frac{1}{3}$: 2 soluciones.', 'تعطي الحالة $x-2=2x+1$ الحل $x=-3$، وتعطي $x-2=-(2x+1)$ الحل $x=\\frac{1}{3}$: حلّان، أي 2.', 'The case $x-2=2x+1$ gives $x=-3$, and $x-2=-(2x+1)$ gives $x=\\frac{1}{3}$: 2 solutions.') },

    /* ---------- Exponential and logarithmic equations ---------- */
    { id: 13, stage: 'exp-log', prompt: solve('$3^{x-1}=27$'), expected: n(4), hint: same('$27=3^3$'), explanation: same('$3^{x-1}=3^3\\ \\to\\ x=4\\qquad 3^{4-1}=27$') },
    { id: 14, stage: 'exp-log', prompt: with_(solve('$2^x=10$'), HUNDREDTHS), expected: v('3,32'), hint: say('Hartu logaritmoak.', 'Toma logaritmos.', 'خذ اللوغاريتم.', 'Take logarithms.'), explanation: same('$x=\\frac{\\log 10}{\\log 2}\\approx 3{,}32$') },
    { id: 15, stage: 'exp-log', prompt: solveGive('$4^x-6\\cdot 2^x+8=0$', LARGEST), expected: n(2), hint: say('Aldaketa: $t=2^x$.', 'Cambio: $t=2^x$.', 'التغيير: $t=2^x$.', 'Change: $t=2^x$.'), explanation: same('$t=2,\\ t=4\\ \\to\\ x=1,\\ x=2$') },
    { id: 16, stage: 'exp-log', prompt: solve('$\\log(x+3)+\\log x=1$'), expected: n(2), hint: say('Batura biderkaduraren logaritmoa da, eta $1=\\log 10$.', 'La suma es el logaritmo del producto, y $1=\\log 10$.', 'المجموع لوغاريتم الجداء، و$1=\\log 10$.', 'The sum is the logarithm of the product, and $1=\\log 10$.'), explanation: say('$x^2+3x-10=0$ ekuazioak 2 eta $-5$ ematen ditu; $\\log(-5)$ ez dago.', 'Sale $x^2+3x-10=0$, con 2 y $-5$; $\\log(-5)$ no existe.', 'نحصل على $x^2+3x-10=0$ وحلّاها 2 و$-5$؛ و$\\log(-5)$ غير موجود.', 'You get $x^2+3x-10=0$, with 2 and $-5$; $\\log(-5)$ does not exist.') },

    /* ---------- Inequalities ---------- */
    { id: 17, stage: 'inequalities', prompt: integers('$x^2-5x+4<0$'), expected: n(2), hint: say('Faktorizatu eta begiratu zeinuari.', 'Factoriza y mira el signo.', 'حلّل وانظر إلى الإشارة.', 'Factorise and look at the sign.'), explanation: say('$(x-1)(x-4)<0$, hau da, $1<x<4$: 2 eta 3 zenbaki osoak.', '$(x-1)(x-4)<0$, es decir, $1<x<4$: los enteros 2 y 3.', '$(x-1)(x-4)<0$ أي $1<x<4$: العددان الصحيحان 2 و3.', '$(x-1)(x-4)<0$, that is, $1<x<4$: the integers 2 and 3.') },
    { id: 18, stage: 'inequalities', prompt: say('Zein da $\\frac{x+1}{x-5}<0$ betetzen duen zenbaki oso handiena?', '¿Cuál es el mayor número entero que cumple $\\frac{x+1}{x-5}<0$?', 'ما أكبر عدد صحيح يحقق $\\frac{x+1}{x-5}<0$؟', 'What is the largest integer that satisfies $\\frac{x+1}{x-5}<0$?'), expected: n(4), hint: say('5 zenbakiak izendatzailea anulatzen du: ez da sartzen.', 'El 5 anula el denominador: no entra.', 'العدد 5 يعدم المقام: لا يدخل.', '5 makes the denominator zero: it is not included.'), explanation: say('Soluzioa $(-1,5)$ da: zenbaki oso handiena 4 da.', 'La solución es $(-1,5)$: el mayor entero es 4.', 'الحل $(-1,5)$: أكبر عدد صحيح 4.', 'The solution is $(-1,5)$: the largest integer is 4.') },
    { id: 19, stage: 'inequalities', prompt: integers('$|x+1|\\le 3$'), expected: n(7), hint: same('$-3\\le x+1\\le 3$'), explanation: say('$-4\\le x\\le 2$: 7 zenbaki oso.', '$-4\\le x\\le 2$: 7 enteros.', '$-4\\le x\\le 2$: ‏7 أعداد صحيحة.', '$-4\\le x\\le 2$: 7 integers.') },
    { id: 20, stage: 'inequalities', prompt: say('$x^2\\le 9$ eta $2x-1>0$ sisteman, zein da $x$ zenbakiaren baliorik handiena?', 'En el sistema $x^2\\le 9$ y $2x-1>0$, ¿cuál es el mayor valor que puede tomar $x$?', 'في النظام $x^2\\le 9$ و$2x-1>0$، ما أكبر قيمة لـ $x$؟', 'In the system $x^2\\le 9$ and $2x-1>0$, what is the largest value $x$ can take?'), expected: n(3), hint: say('Ebatzi bakoitza, eta hartu zati komuna.', 'Resuelve cada una y quédate con la parte común.', 'حُلّ كل واحدة وخذ الجزء المشترك.', 'Solve each one and keep the common part.'), explanation: same('$-3\\le x\\le 3\\qquad x>\\frac{1}{2}$') }
]

export const bachEquationsChallenges: ChallengeItem[] = [
    { id: 101, stage: 'polynomials', points: 10, context: 'starter', prompt: say('Aurkitu $x^3-6x^2+11x-6$ polinomioaren erroen batura.', 'Halla la suma de las raíces de $x^3-6x^2+11x-6$.', 'أوجد مجموع جذور $x^3-6x^2+11x-6$.', 'Find the sum of the roots of $x^3-6x^2+11x-6$.'), expected: n(6), hint: say('Probatu $x=1$ Ruffinirekin.', 'Prueba $x=1$ con Ruffini.', 'جرّب $x=1$ بروفيني.', 'Try $x=1$ with Ruffini.'), explanation: same('$(x-1)(x-2)(x-3)\\ \\to\\ 1+2+3=6$') },
    { id: 102, stage: 'polynomials', points: 20, context: 'advanced', prompt: say('Aurkitu $a$, $x^3+ax^2+x+2$ zatigarria izan dadin $x+2$ binomioaz.', 'Halla $a$ para que $x^3+ax^2+x+2$ sea divisible entre $x+2$.', 'أوجد $a$ لتكون $x^3+ax^2+x+2$ قابلة للقسمة على $x+2$.', 'Find $a$ so that $x^3+ax^2+x+2$ is divisible by $x+2$.'), expected: n(2), hint: say('Hondarra $P(-2)$ da, eta 0 izan behar du.', 'El resto es $P(-2)$ y tiene que ser 0.', 'الباقي $P(-2)$ ويجب أن يساوي 0.', 'The remainder is $P(-2)$ and it must be 0.'), explanation: same('$-8+4a-2+2=0\\ \\to\\ a=2$') },
    { id: 103, stage: 'polynomials', points: 30, context: 'master', prompt: say('Faktorizatu $x^4-5x^2+4$. Zenbat lehen mailako faktore ditu?', 'Factoriza $x^4-5x^2+4$. ¿Cuántos factores de grado 1 tiene?', 'حلّل $x^4-5x^2+4$. كم عاملًا من الدرجة الأولى فيه؟', 'Factorise $x^4-5x^2+4$. How many degree-1 factors does it have?'), expected: n(4), hint: same('$x^4-5x^2+4=(x^2-1)(x^2-4)$'), explanation: say('$(x-1)(x+1)(x-2)(x+2)$: 4 faktore.', '$(x-1)(x+1)(x-2)(x+2)$: 4 factores.', '$(x-1)(x+1)(x-2)(x+2)$: ‏4 عوامل.', '$(x-1)(x+1)(x-2)(x+2)$: 4 factors.') },
    { id: 104, stage: 'polynomial-equations', points: 10, context: 'starter', prompt: with_(say('Begiratu $x^4+5x^2-36=0$ ekuazioari.', 'Mira la ecuación $x^4+5x^2-36=0$.', 'انظر إلى المعادلة $x^4+5x^2-36=0$.', 'Look at the equation $x^4+5x^2-36=0$.'), HOW_MANY), expected: n(2), hint: say('Aldaketa: $t=x^2$. $t$ negatiboak ez du balio.', 'Cambio: $t=x^2$. Un $t$ negativo no vale.', 'التغيير: $t=x^2$. ولا يصلح $t$ السالب.', 'Change: $t=x^2$. A negative $t$ does not work.'), explanation: say('$t=4$ eta $t=-9$; $t=4$ balioak bakarrik ematen du $x=\\pm 2$: 2 soluzio.', '$t=4$ y $t=-9$; solo $t=4$ da $x=\\pm 2$: 2 soluciones.', '$t=4$ و$t=-9$؛ ولا تعطي إلا $t=4$ الحلين $x=\\pm 2$: حلّان، أي 2.', '$t=4$ and $t=-9$; only $t=4$ gives $x=\\pm 2$: 2 solutions.') },
    { id: 105, stage: 'polynomial-equations', points: 20, context: 'advanced', prompt: solveGive('$x^3-x^2-9x+9=0$', SUM), expected: n(1), hint: say('Taldekatu: $x^2(x-1)-9(x-1)$.', 'Agrupa: $x^2(x-1)-9(x-1)$.', 'جمّع: $x^2(x-1)-9(x-1)$.', 'Group: $x^2(x-1)-9(x-1)$.'), explanation: same('$(x-1)(x-3)(x+3)=0\\ \\to\\ 1+3-3=1$') },
    { id: 106, stage: 'polynomial-equations', points: 30, context: 'master', prompt: solve('$\\frac{x+1}{x-1}-\\frac{x-1}{x+1}=\\frac{8}{x^2-1}$'), expected: n(2), hint: say('Biderkatu $x^2-1$ adierazpenaz, eta egiaztatu soluzioa.', 'Multiplica por $x^2-1$ y comprueba la solución.', 'اضرب في $x^2-1$ وتحقق من الحل.', 'Multiply by $x^2-1$ and check the solution.'), explanation: same('$(x+1)^2-(x-1)^2=8\\ \\to\\ 4x=8\\ \\to\\ x=2$') },
    { id: 107, stage: 'radical-absolute', points: 10, context: 'starter', prompt: solve('$\\sqrt{3x+1}=x-1$'), expected: n(5), hint: say('Jaso karratura, eta egiaztatu bi hautagaiak.', 'Eleva al cuadrado y comprueba las dos candidatas.', 'ربّع وتحقق من المرشحين.', 'Square and check both candidates.'), explanation: say('$x^2-5x=0$ ekuazioak 0 eta 5 ematen ditu; 0 zenbakiarekin, $\\sqrt{1}\\neq -1$; beraz, 5 bakarrik.', 'Sale $x^2-5x=0$, con 0 y 5; con 0, $\\sqrt{1}\\neq -1$, así que solo vale 5.', 'نحصل على $x^2-5x=0$ وحلّاها 0 و5؛ ومع 0 يكون $\\sqrt{1}\\neq -1$، إذن الحل 5 فقط.', 'You get $x^2-5x=0$, with 0 and 5; with 0, $\\sqrt{1}\\neq -1$, so only 5 works.') },
    { id: 108, stage: 'radical-absolute', points: 20, context: 'advanced', prompt: solve('$\\sqrt{x+4}+\\sqrt{x-1}=5$'), expected: n(5), hint: say('Isolatu erro bat eta jaso karratura birritan.', 'Aísla un radical y eleva al cuadrado dos veces.', 'اعزل جذرًا وربّع مرتين.', 'Isolate a radical and square twice.'), explanation: same('$\\begin{gathered}10\\sqrt{x-1}=20\\ \\to\\ x=5\\\\ \\sqrt{9}+\\sqrt{4}=5\\end{gathered}$') },
    { id: 109, stage: 'radical-absolute', points: 30, context: 'master', prompt: say('Aurkitu $|x^2-5|=4$ ekuazioaren soluzioen biderkadura.', 'Halla el producto de las soluciones de $|x^2-5|=4$.', 'أوجد جداء حلول $|x^2-5|=4$.', 'Find the product of the solutions of $|x^2-5|=4$.'), expected: n(9), hint: same('$x^2-5=4\\qquad x^2-5=-4$'), explanation: say('$x^2=9$ edo $x^2=1$: $x=\\pm 3$ eta $x=\\pm 1$; biderkadura 9 da.', '$x^2=9$ o $x^2=1$: $x=\\pm 3$ y $x=\\pm 1$; el producto es 9.', '$x^2=9$ أو $x^2=1$: ‏$x=\\pm 3$ و$x=\\pm 1$؛ والجداء 9.', '$x^2=9$ or $x^2=1$: $x=\\pm 3$ and $x=\\pm 1$; the product is 9.') },
    { id: 110, stage: 'exp-log', points: 10, context: 'starter', prompt: solve('$5^{2x-1}=125$'), expected: n(2), hint: same('$125=5^3$'), explanation: same('$5^{2x-1}=5^3\\ \\to\\ x=2\\qquad 5^{2\\cdot 2-1}=125$') },
    { id: 111, stage: 'exp-log', points: 20, context: 'advanced', prompt: solveGive('$9^x-10\\cdot 3^x+9=0$', SUM), expected: n(2), hint: say('Aldaketa: $t=3^x$.', 'Cambio: $t=3^x$.', 'التغيير: $t=3^x$.', 'Change: $t=3^x$.'), explanation: same('$t=1,\\ t=9\\ \\to\\ x=0,\\ x=2$') },
    { id: 112, stage: 'exp-log', points: 30, context: 'master', prompt: solve('$\\log(x+1)-\\log(x-1)=\\log 3$'), expected: n(2), hint: say('Kendura zatiduraren logaritmoa da.', 'La resta es el logaritmo del cociente.', 'الفرق لوغاريتم خارج القسمة.', 'The difference is the logarithm of the quotient.'), explanation: same('$\\frac{x+1}{x-1}=3\\ \\to\\ x+1=3x-3\\ \\to\\ x=2$') },
    { id: 113, stage: 'inequalities', points: 10, context: 'starter', prompt: integers('$x(x-6)\\le 0$'), expected: n(7), hint: say('Muturrak sartzen dira.', 'Los extremos entran.', 'الطرفان يدخلان.', 'The endpoints are included.'), explanation: say('$0\\le x\\le 6$: 7 zenbaki oso.', '$0\\le x\\le 6$: 7 enteros.', '$0\\le x\\le 6$: ‏7 أعداد صحيحة.', '$0\\le x\\le 6$: 7 integers.') },
    { id: 114, stage: 'inequalities', points: 20, context: 'advanced', prompt: say('Zein da $\\frac{2x-1}{x+3}\\ge 1$ betetzen duen zenbaki oso positibo txikiena?', '¿Cuál es el menor número entero positivo que cumple $\\frac{2x-1}{x+3}\\ge 1$?', 'ما أصغر عدد صحيح موجب يحقق $\\frac{2x-1}{x+3}\\ge 1$؟', 'What is the smallest positive integer that satisfies $\\frac{2x-1}{x+3}\\ge 1$?'), expected: n(4), hint: say('Eraman 1 ezkerrera: ez biderkatu izendatzaileaz.', 'Pasa el 1 a la izquierda: no multipliques por el denominador.', 'انقل 1 إلى اليسار: لا تضرب في المقام.', 'Move the 1 to the left: do not multiply by the denominator.'), explanation: say('$\\frac{x-4}{x+3}\\ge 0$: $(-\\infty,-3)\\cup[4,+\\infty)$; zenbaki oso positibo txikiena 4 da.', '$\\frac{x-4}{x+3}\\ge 0$: $(-\\infty,-3)\\cup[4,+\\infty)$; el menor entero positivo es 4.', '$\\frac{x-4}{x+3}\\ge 0$: ‏$(-\\infty,-3)\\cup[4,+\\infty)$؛ وأصغر عدد صحيح موجب 4.', '$\\frac{x-4}{x+3}\\ge 0$: $(-\\infty,-3)\\cup[4,+\\infty)$; the smallest positive integer is 4.') },
    { id: 115, stage: 'inequalities', points: 30, context: 'master', prompt: say('Tailer batek 30 € kobratzen ditu finko, gehi 15 € orduko; beste batek 50 € finko, gehi 10 € orduko. Zenbat ordutatik aurrera (ordu osoak) da merkeagoa bigarrena?', 'Un taller cobra 30 € fijos más 15 € por hora, y otro, 50 € fijos más 10 € por hora. ¿A partir de cuántas horas (enteras) sale más barato el segundo?', 'يأخذ ورشة 30 € ثابتة و15 € عن كل ساعة، وتأخذ أخرى 50 € ثابتة و10 € عن كل ساعة. ابتداءً من كم ساعة (عدد صحيح) تصبح الثانية أرخص؟', 'One workshop charges €30 fixed plus €15 an hour, another €50 fixed plus €10 an hour. From how many (whole) hours on is the second one cheaper?'), expected: n(5), hint: say('Planteatu: lehenengoa bigarrena baino garestiagoa.', 'Plantea: el primero cuesta más que el segundo.', 'اكتب: الأول أغلى من الثاني.', 'Set up: the first costs more than the second.'), explanation: say('$30+15h>50+10h$, hau da, $h>4$: 5 ordutik aurrera.', '$30+15h>50+10h$, es decir, $h>4$: desde 5 horas.', '$30+15h>50+10h$ أي $h>4$: ابتداءً من 5 ساعات.', '$30+15h>50+10h$, that is, $h>4$: from 5 hours on.') }
]

export const bachEquationsExerciseBank: ExerciseSection[] = [
    {
        id: 'polynomials',
        title: say('Polinomioak', 'Polinomios', 'الحدوديات', 'Polynomials'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Egiaztatu $x=-1$ zenbakia $x^3+2x^2-x-2$ polinomioaren erroa den.', 'Comprueba si $x=-1$ es raíz de $x^3+2x^2-x-2$.', 'تحقق هل $x=-1$ جذر للحدودية $x^3+2x^2-x-2$.', 'Check whether $x=-1$ is a root of $x^3+2x^2-x-2$.'), solution: say('Bai: $-1+2+1-2=0$.', 'Sí: $-1+2+1-2=0$.', 'نعم: $-1+2+1-2=0$.', 'Yes: $-1+2+1-2=0$.') },
            { id: 2, difficulty: 'easy', question: say('Aurkitu $x^3-x^2-4x+4$ polinomioaren erro osoak. Eman handiena.', 'Halla las raíces enteras de $x^3-x^2-4x+4$. Da la mayor.', 'أوجد الجذور الصحيحة للحدودية $x^3-x^2-4x+4$. اكتب أكبرها.', 'Find the integer roots of $x^3-x^2-4x+4$. Give the largest.'), solution: same('$x^3-x^2-4x+4=(x-1)(x-2)(x+2)$'), answer: { expected: n(2) } },
            { id: 3, difficulty: 'easy', question: say('Faktorizatu $x^3-9x$.', 'Factoriza $x^3-9x$.', 'حلّل $x^3-9x$.', 'Factorise $x^3-9x$.'), solution: same('$x^3-9x=x(x-3)(x+3)$') },
            { id: 4, difficulty: 'medium', question: say('Faktorizatu $2x^3-3x^2-11x+6$.', 'Factoriza $2x^3-3x^2-11x+6$.', 'حلّل $2x^3-3x^2-11x+6$.', 'Factorise $2x^3-3x^2-11x+6$.'), solution: say('$x=3$ erroa da: $(x-3)(2x^2+3x-2)=(x-3)(2x-1)(x+2)$.', '$x=3$ es raíz: $(x-3)(2x^2+3x-2)=(x-3)(2x-1)(x+2)$.', '$x=3$ جذر: $(x-3)(2x^2+3x-2)=(x-3)(2x-1)(x+2)$.', '$x=3$ is a root: $(x-3)(2x^2+3x-2)=(x-3)(2x-1)(x+2)$.') },
            { id: 5, difficulty: 'medium', question: say('Zenbat erro erreal ditu $x^3-1$ polinomioak?', '¿Cuántas raíces reales tiene $x^3-1$?', 'كم جذرًا حقيقيًّا للحدودية $x^3-1$؟', 'How many real roots does $x^3-1$ have?'), solution: say('$(x-1)(x^2+x+1)$, eta $x^2+x+1$ polinomioak ez du erro errealik: 1 erro.', '$(x-1)(x^2+x+1)$, y $x^2+x+1$ no tiene raíces reales: 1 raíz.', '$(x-1)(x^2+x+1)$، وليس لـ $x^2+x+1$ جذور حقيقية: جذر واحد، أي 1.', '$(x-1)(x^2+x+1)$, and $x^2+x+1$ has no real roots: 1 root.'), answer: { expected: n(1) } },
            { id: 6, difficulty: 'medium', question: say('Sinplifikatu $\\frac{x^3-x}{x^2+x}$.', 'Simplifica $\\frac{x^3-x}{x^2+x}$.', 'بسّط $\\frac{x^3-x}{x^2+x}$.', 'Simplify $\\frac{x^3-x}{x^2+x}$.'), solution: same('$\\frac{x(x-1)(x+1)}{x(x+1)}=x-1$') },
            { id: 7, difficulty: 'medium', question: say('Kalkulatu $\\frac{1}{x-1}-\\frac{1}{x+1}$.', 'Calcula $\\frac{1}{x-1}-\\frac{1}{x+1}$.', 'احسب $\\frac{1}{x-1}-\\frac{1}{x+1}$.', 'Work out $\\frac{1}{x-1}-\\frac{1}{x+1}$.'), solution: same('$\\frac{(x+1)-(x-1)}{x^2-1}=\\frac{2}{x^2-1}$') },
            { id: 8, difficulty: 'hard', question: say('Aurkitu $m$, $x^3-mx+4$ polinomioak $x=2$ erroa izan dezan.', 'Halla $m$ para que $x^3-mx+4$ tenga la raíz $x=2$.', 'أوجد $m$ لتكون $x=2$ جذرًا للحدودية $x^3-mx+4$.', 'Find $m$ so that $x^3-mx+4$ has the root $x=2$.'), solution: same('$8-2m+4=0\\ \\to\\ m=6$'), answer: { expected: n(6) } },
            { id: 9, difficulty: 'hard', question: say('Idatzi 1, 2 eta $-3$ erroak dituen hirugarren mailako polinomio bat.', 'Escribe un polinomio de grado 3 con raíces 1, 2 y $-3$.', 'اكتب حدودية من الدرجة الثالثة جذورها 1 و2 و$-3$.', 'Write a degree-3 polynomial with roots 1, 2 and $-3$.'), solution: same('$(x-1)(x-2)(x+3)=x^3-7x+6$') },
            { id: 10, difficulty: 'hard', question: say('Sinplifikatu $\\frac{x^2-4}{x^2-4x+4}$, eta kalkulatu haren balioa $x=4$ denean.', 'Simplifica $\\frac{x^2-4}{x^2-4x+4}$ y calcula su valor en $x=4$.', 'بسّط $\\frac{x^2-4}{x^2-4x+4}$ واحسب قيمته عند $x=4$.', 'Simplify $\\frac{x^2-4}{x^2-4x+4}$ and work out its value at $x=4$.'), solution: same('$\\frac{x+2}{x-2}\\ \\to\\ \\frac{4+2}{4-2}=3$'), answer: { expected: n(3) } }
        ]
    },
    {
        id: 'polynomial-equations',
        title: say('Ekuazio polinomikoak eta arrazionalak', 'Ecuaciones polinómicas y racionales', 'المعادلات الحدودية والكسرية', 'Polynomial and rational equations'),
        items: [
            { id: 11, difficulty: 'easy', question: solveGive('$x^3-16x=0$', POSITIVE), solution: same('$x(x-4)(x+4)=0$'), answer: { expected: n(4) } },
            { id: 12, difficulty: 'easy', question: with_(say('Begiratu $x^4-5x^2+4=0$ ekuazioari.', 'Mira la ecuación $x^4-5x^2+4=0$.', 'انظر إلى المعادلة $x^4-5x^2+4=0$.', 'Look at the equation $x^4-5x^2+4=0$.'), HOW_MANY), solution: same('$t=1,\\ t=4\\ \\to\\ x=\\pm 1,\\ x=\\pm 2$'), answer: { expected: n(4) } },
            { id: 13, difficulty: 'easy', question: solve('$\\frac{x}{2}+\\frac{2}{x}=2$'), solution: same('$x^2-4x+4=0\\ \\to\\ x=2$'), answer: { expected: n(2) } },
            { id: 14, difficulty: 'medium', question: solveGive('$x^3+x^2-4x-4=0$', SUM), solution: same('$(x+1)(x-2)(x+2)=0\\ \\to\\ -1+2-2=-1$'), answer: { expected: n(-1) } },
            { id: 15, difficulty: 'medium', question: solveGive('$x^6-9x^3+8=0$', LARGEST), solution: same('$t=1,\\ t=8\\ \\to\\ x=1,\\ x=2$'), answer: { expected: n(2) } },
            { id: 16, difficulty: 'medium', question: with_(say('Begiratu $x^4+3x^2+2=0$ ekuazioari.', 'Mira la ecuación $x^4+3x^2+2=0$.', 'انظر إلى المعادلة $x^4+3x^2+2=0$.', 'Look at the equation $x^4+3x^2+2=0$.'), HOW_MANY), solution: say('$t=-1$ eta $t=-2$, biak negatiboak: 0 soluzio.', '$t=-1$ y $t=-2$, los dos negativos: 0 soluciones.', '$t=-1$ و$t=-2$ كلاهما سالب: لا حلول، أي 0.', '$t=-1$ and $t=-2$, both negative: 0 solutions.'), answer: { expected: n(0) } },
            { id: 17, difficulty: 'medium', question: with_(solve('$\\frac{3}{x+1}+\\frac{1}{x-1}=\\frac{4}{x^2-1}$'), AS_FRACTION), solution: same('$3(x-1)+(x+1)=4\\ \\to\\ x=\\frac{3}{2}$'), answer: { expected: f(3, 2) } },
            { id: 18, difficulty: 'hard', question: solve('$\\frac{x}{x-2}=\\frac{2}{x-2}+3$'), solution: say('$x=2$ ateratzen da, baina izendatzailea anulatzen du: ez du soluziorik.', 'Sale $x=2$, pero anula el denominador: no tiene solución.', 'نحصل على $x=2$ لكنه يعدم المقام: ليس لها حل.', 'You get $x=2$, but it makes the denominator zero: no solution.') },
            { id: 19, difficulty: 'hard', question: solveGive('$x^4-x^3-7x^2+x+6=0$', LARGEST), solution: same('$(x-1)(x+1)(x-3)(x+2)=0$'), answer: { expected: n(3) } },
            { id: 20, difficulty: 'hard', question: say('Aurkitu $k$, $x^4-kx^2+9=0$ ekuazioak $x=1$ soluzioa izan dezan.', 'Halla $k$ para que $x^4-kx^2+9=0$ tenga la solución $x=1$.', 'أوجد $k$ ليكون $x=1$ حلًّا للمعادلة $x^4-kx^2+9=0$.', 'Find $k$ so that $x^4-kx^2+9=0$ has the solution $x=1$.'), solution: same('$1-k+9=0\\ \\to\\ k=10$'), answer: { expected: n(10) } }
        ]
    },
    {
        id: 'radical-absolute',
        title: say('Erroak eta balio absolutua', 'Radicales y valor absoluto', 'الجذور والقيمة المطلقة', 'Radicals and absolute value'),
        items: [
            { id: 21, difficulty: 'easy', question: solve('$\\sqrt{x-3}=4$'), solution: same('$x-3=16\\ \\to\\ x=19\\qquad\\sqrt{19-3}=4$'), answer: { expected: n(19) } },
            { id: 22, difficulty: 'easy', question: solveGive('$|x-5|=2$', LARGEST), solution: same('$x-5=2\\ \\to\\ x=7$'), answer: { expected: n(7) } },
            { id: 23, difficulty: 'easy', question: say('Ba al du soluziorik $\\sqrt{x}=-3$ ekuazioak?', '¿Tiene solución $\\sqrt{x}=-3$?', 'هل للمعادلة $\\sqrt{x}=-3$ حل؟', 'Does $\\sqrt{x}=-3$ have a solution?'), solution: say('Ez: erro karratu bat ez da inoiz negatiboa.', 'No: una raíz cuadrada nunca es negativa.', 'لا: الجذر التربيعي ليس سالبًا أبدًا.', 'No: a square root is never negative.') },
            { id: 24, difficulty: 'medium', question: solve('$\\sqrt{x+6}=x$'), solution: say('$x^2-x-6=0$ ekuazioak 3 eta $-2$ ematen ditu; $-2$ zenbakiarekin, $\\sqrt{4}\\neq -2$.', 'Sale $x^2-x-6=0$, con 3 y $-2$; con $-2$, $\\sqrt{4}\\neq -2$.', 'نحصل على $x^2-x-6=0$ وحلّاها 3 و$-2$؛ ومع $-2$ يكون $\\sqrt{4}\\neq -2$.', 'You get $x^2-x-6=0$, with 3 and $-2$; with $-2$, $\\sqrt{4}\\neq -2$.'), answer: { expected: n(3) } },
            { id: 25, difficulty: 'medium', question: solve('$2\\sqrt{x}=x-3$'), solution: say('$x^2-10x+9=0$ ekuazioak 1 eta 9 ematen ditu; 1 zenbakiarekin, $2\\neq -2$; beraz, 9 bakarrik.', 'Sale $x^2-10x+9=0$, con 1 y 9; con 1, $2\\neq -2$, así que solo vale 9.', 'نحصل على $x^2-10x+9=0$ وحلّاها 1 و9؛ ومع 1 يكون $2\\neq -2$، إذن الحل 9 فقط.', 'You get $x^2-10x+9=0$, with 1 and 9; with 1, $2\\neq -2$, so only 9 works.'), answer: { expected: n(9) } },
            { id: 26, difficulty: 'medium', question: solveGive('$|2x+1|=x+5$', SUM), solution: say('$x=4$ eta $x=-2$, eta biek betetzen dute: batura 2 da.', '$x=4$ y $x=-2$, y las dos cumplen: suman 2.', '$x=4$ و$x=-2$، وكلاهما يحقق المعادلة: المجموع 2.', '$x=4$ and $x=-2$, and both work: they add up to 2.'), answer: { expected: n(2) } },
            { id: 27, difficulty: 'medium', question: solve('$\\sqrt{x+7}+\\sqrt{x}=7$'), solution: same('$14\\sqrt{x}=42\\ \\to\\ \\sqrt{x}=3\\ \\to\\ x=9$'), answer: { expected: n(9) } },
            { id: 28, difficulty: 'hard', question: solveGive('$|x^2-4|=5$', POSITIVE), solution: say('$x^2-4=5$ ekuazioak $x=\\pm 3$ ematen du; $x^2-4=-5$ ekuazioak ez du soluziorik.', '$x^2-4=5$ da $x=\\pm 3$; $x^2-4=-5$ no tiene solución.', 'تعطي $x^2-4=5$ الحلين $x=\\pm 3$، وليس لـ $x^2-4=-5$ حل.', '$x^2-4=5$ gives $x=\\pm 3$; $x^2-4=-5$ has no solution.'), answer: { expected: n(3) } },
            { id: 29, difficulty: 'hard', question: solve('$\\sqrt{2x-1}=\\sqrt{x+3}$'), solution: same('$2x-1=x+3\\ \\to\\ x=4$'), answer: { expected: n(4) } },
            { id: 30, difficulty: 'hard', question: say('Azaldu zergatik ematen duen $\\sqrt{x+1}=-x$ ekuazioak soluzio faltsu bat karratura jasotzean.', 'Explica por qué $\\sqrt{x+1}=-x$ da una solución falsa al elevar al cuadrado.', 'اشرح لماذا تعطي $\\sqrt{x+1}=-x$ حلًّا زائفًا عند التربيع.', 'Explain why $\\sqrt{x+1}=-x$ gives a false solution when you square it.'), solution: say('Karratura jasotzean $-\\sqrt{x+1}=-x$ ere ebazten da: $x^2-x-1=0$ ekuazioak bi balio ematen ditu, eta negatiboak bakarrik balio du.', 'Al elevar al cuadrado también se resuelve $-\\sqrt{x+1}=-x$: $x^2-x-1=0$ da dos valores, y solo vale el negativo.', 'عند التربيع نحل أيضًا $-\\sqrt{x+1}=-x$: تعطي $x^2-x-1=0$ قيمتين ولا يصلح إلا السالبة.', 'Squaring also solves $-\\sqrt{x+1}=-x$: $x^2-x-1=0$ gives two values, and only the negative one works.') }
        ]
    },
    {
        id: 'exp-log',
        title: say('Esponentzialak eta logaritmikoak', 'Exponenciales y logarítmicas', 'الأسية واللوغاريتمية', 'Exponential and logarithmic'),
        items: [
            { id: 31, difficulty: 'easy', question: solve('$2^x=32$'), solution: same('$2^x=2^5\\ \\to\\ x=5$'), answer: { expected: n(5) } },
            { id: 32, difficulty: 'easy', question: solve('$\\log_3 x=4$'), solution: same('$x=3^4=81$'), answer: { expected: n(81) } },
            { id: 33, difficulty: 'easy', question: solve('$10^x=0{,}01$'), solution: same('$10^x=10^{-2}\\ \\to\\ x=-2$'), answer: { expected: n(-2) } },
            { id: 34, difficulty: 'medium', question: with_(solve('$3^x=20$'), HUNDREDTHS), solution: same('$x=\\frac{\\log 20}{\\log 3}\\approx 2{,}73$'), answer: { expected: v('2,73') } },
            { id: 35, difficulty: 'medium', question: solve('$2^{x+2}+2^x=40$'), solution: same('$\\begin{gathered}5\\cdot 2^x=40\\ \\to\\ x=3\\\\ 2^{5}+2^{3}=40\\end{gathered}$'), answer: { expected: n(3) } },
            { id: 36, difficulty: 'medium', question: solve('$4^x-3\\cdot 2^x-4=0$'), solution: same('$t=4,\\ t=-1\\ \\to\\ x=2$'), answer: { expected: n(2) } },
            { id: 37, difficulty: 'medium', question: solve('$\\log(2x)=\\log(x+5)$'), solution: same('$2x=x+5\\ \\to\\ x=5$'), answer: { expected: n(5) } },
            { id: 38, difficulty: 'hard', question: solve('$\\log x+\\log(x+9)=1$'), solution: say('$x^2+9x-10=0$ ekuazioak 1 eta $-10$ ematen ditu; $\\log(-10)$ ez dago.', 'Sale $x^2+9x-10=0$, con 1 y $-10$; $\\log(-10)$ no existe.', 'نحصل على $x^2+9x-10=0$ وحلّاها 1 و$-10$؛ و$\\log(-10)$ غير موجود.', 'You get $x^2+9x-10=0$, with 1 and $-10$; $\\log(-10)$ does not exist.'), answer: { expected: n(1) } },
            { id: 39, difficulty: 'hard', question: solve('$\\log_2(x-1)+\\log_2(x+1)=3$'), solution: say('$x^2-1=8$ ekuazioak $\\pm 3$ ematen du; $-3$ zenbakiarekin, $\\log_2(-4)$ ez dago.', 'Sale $x^2-1=8$, con $\\pm 3$; con $-3$, $\\log_2(-4)$ no existe.', 'نحصل على $x^2-1=8$ وحلّاها $\\pm 3$؛ ومع $-3$ فإن $\\log_2(-4)$ غير موجود.', 'You get $x^2-1=8$, with $\\pm 3$; with $-3$, $\\log_2(-4)$ does not exist.'), answer: { expected: n(3) } },
            { id: 40, difficulty: 'hard', question: solveGive('$25^x-6\\cdot 5^x+5=0$', LARGEST), solution: same('$t=1,\\ t=5\\ \\to\\ x=0,\\ x=1$'), answer: { expected: n(1) } }
        ]
    },
    {
        id: 'inequalities',
        title: say('Inekuazioak', 'Inecuaciones', 'المتراجحات', 'Inequalities'),
        items: [
            { id: 41, difficulty: 'easy', question: solve('$x^2-9<0$'), solution: same('$(-3,3)$') },
            { id: 42, difficulty: 'easy', question: integers('$|x|<3$'), solution: say('$-3<x<3$: 5 zenbaki oso.', '$-3<x<3$: 5 enteros.', '$-3<x<3$: ‏5 أعداد صحيحة.', '$-3<x<3$: 5 integers.'), answer: { expected: n(5) } },
            { id: 43, difficulty: 'easy', question: solve('$(x-2)(x+5)\\ge 0$'), solution: same('$(-\\infty,-5]\\cup[2,+\\infty)$') },
            { id: 44, difficulty: 'medium', question: solve('$x^3-x^2-6x<0$'), solution: same('$x(x-3)(x+2)<0\\ \\to\\ (-\\infty,-2)\\cup(0,3)$') },
            { id: 45, difficulty: 'medium', question: solve('$\\frac{x-3}{x+1}\\le 0$'), solution: same('$(-1,3]$') },
            { id: 46, difficulty: 'medium', question: integers('$|2x-3|\\le 5$'), solution: say('$-1\\le x\\le 4$: 6 zenbaki oso.', '$-1\\le x\\le 4$: 6 enteros.', '$-1\\le x\\le 4$: ‏6 أعداد صحيحة.', '$-1\\le x\\le 4$: 6 integers.'), answer: { expected: n(6) } },
            { id: 47, difficulty: 'medium', question: solve('$|x+2|>4$'), solution: same('$(-\\infty,-6)\\cup(2,+\\infty)$') },
            { id: 48, difficulty: 'hard', question: solve('$\\frac{x^2-4}{x}\\ge 0$'), solution: same('$[-2,0)\\cup[2,+\\infty)$') },
            { id: 49, difficulty: 'hard', question: say('Lorategi laukizuzen bat zabalera baino 10 m luzeagoa da, eta haren azalera ezin da 200 m² baino handiagoa izan. Zein da zabalerarik handiena, metrotan?', 'Un jardín rectangular tiene 10 m más de largo que de ancho, y su área no puede pasar de 200 m². ¿Cuál es el mayor ancho posible, en metros?', 'حديقة مستطيلة طولها يزيد على عرضها بـ 10 م، ولا يمكن أن تتجاوز مساحتها 200 م². ما أكبر عرض ممكن بالأمتار؟', 'A rectangular garden is 10 m longer than it is wide, and its area cannot go over 200 m². What is the largest possible width, in metres?'), solution: same('$(x+20)(x-10)\\le 0\\ \\to\\ x\\le 10$'), answer: { expected: n(10) } },
            { id: 50, difficulty: 'hard', question: say('Ebatzi $x^2-4x\\le 0$ eta $|x-3|<2$ inekuazioen sistema.', 'Resuelve el sistema $x^2-4x\\le 0$ y $|x-3|<2$.', 'حُلّ النظام $x^2-4x\\le 0$ و$|x-3|<2$.', 'Solve the system $x^2-4x\\le 0$ and $|x-3|<2$.'), solution: same('$[0,4]\\cap(1,5)=(1,4]$') }
        ]
    }
]

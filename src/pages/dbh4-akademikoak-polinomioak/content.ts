import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Polinomioak eta zatiki aljebraikoak · 4. DBH akademikoak — diagnostic,
   guided practice, exercise bank and challenges, after Santillana 4.º
   Académicas unit 3 ((3x³ + 2x − 4)(−2x + 5), (3x² − 5)³, the Ruffini
   table with 5m − 9, 18x³ + 6x² − 52x + 16) and Anaya 4.º Académicas
   unit 2 (x⁴ + 3x³ − 3x² + 3x − 4 divided by x ± 1, x ± 4, P(10) = 69 496,
   x = −3 as a root, 9x⁴ − 36x³ + 26x² + 4x − 3, the m.c.d. of x³ − 7x² + 10x
   and x³ − 5x², the two taps). Every closed answer is a single number: a
   degree, a coefficient, a remainder, a root, a parameter or a value.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}

/** «Formula. How much is a?» in the three languages */
const howMuch = (formula: string, letter = 'a') => say(`${formula}. Zenbat da $${letter}$?`, `${formula}. ¿Cuánto vale $${letter}$?`, `${formula}. كم تساوي $${letter}$؟`, `${formula}. What is the value of $${letter}$?`)
const calc = (formula: string) => say(`Kalkulatu ${formula}.`, `Calcula ${formula}.`, `احسب ${formula}.`, `Work out ${formula}.`)
const expand = (formula: string) => say(`Garatu ${formula}.`, `Desarrolla ${formula}.`, `انشر ${formula}.`, `Expand ${formula}.`)
const factorize = (formula: string) => say(`Faktorizatu ${formula}.`, `Factoriza ${formula}.`, `حلّل ${formula}.`, `Factorise ${formula}.`)
const simplify = (formula: string) => say(`Sinplifikatu ${formula}.`, `Simplifica ${formula}.`, `بسّط ${formula}.`, `Simplify ${formula}.`)
const remainderOf = (division: string) => say(`Zein da ${division} zatiketaren hondarra?`, `¿Cuál es el resto de ${division}?`, `ما باقي ${division}؟`, `What is the remainder of ${division}?`)
const valueAt = (formula: string, x: string) => say(`Kalkulatu ${formula} zatikiaren balioa x = ${x} denean.`, `Calcula el valor de ${formula} para x = ${x}.`, `احسب قيمة ${formula} عندما x = ${x}.`, `Work out the value of ${formula} for x = ${x}.`)

export const polynomialsFractionsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 5101,
        prompt: say('Zein da $(x^{3}+2)(x^{2}-x+4)$ biderkaduraren maila?', '¿Cuál es el grado del producto $(x^{3}+2)(x^{2}-x+4)$?', 'ما درجة الجداء $(x^{3}+2)(x^{2}-x+4)$؟', 'What is the degree of the product $(x^{3}+2)(x^{2}-x+4)$?'),
        options: [same('$5$'), same('$6$'), same('$3$')],
        correctIndex: 0,
        explanation: say('Mailak batzen dira: $3+2=5$.', 'Los grados se suman: $3+2=5$.', 'تُجمع الدرجتان: $3+2=5$.', 'The degrees add up: $3+2=5$.'),
        topic: 'polynomials'
    },
    {
        id: 5102,
        prompt: say('$(x-5)^{2}$ berdin…', '$(x-5)^{2}$ es igual a…', '$(x-5)^{2}$ تساوي…', '$(x-5)^{2}$ is equal to…'),
        options: [same('$x^{2}-25$'), same('$x^{2}-10x+25$'), same('$x^{2}+25$')],
        correctIndex: 1,
        explanation: say('Kendura baten karratua: $(x-5)^{2}=x^{2}-10x+25$.', 'Cuadrado de una diferencia: $(x-5)^{2}=x^{2}-10x+25$.', 'مربع الفرق: $(x-5)^{2}=x^{2}-10x+25$.', 'Square of a difference: $(x-5)^{2}=x^{2}-10x+25$.'),
        topic: 'identities'
    },
    {
        id: 5103,
        prompt: remainderOf('$(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x-1)$'),
        options: [same('$4$'), same('$-4$'), same('$0$')],
        correctIndex: 2,
        explanation: say('Ruffini 1ekin: 1, 4, 1, 4 eta hondarra $1+3-3+3-4=0$.', 'Ruffini con 1: 1, 4, 1, 4 y resto $1+3-3+3-4=0$.', 'روفيني بالعدد 1: 1 و4 و1 و4 والباقي $1+3-3+3-4=0$.', 'Ruffini with 1: 1, 4, 1, 4, and remainder $1+3-3+3-4=0$.'),
        topic: 'ruffini'
    },
    {
        id: 5104,
        prompt: say('$P(x)=x^{3}-2x+5$ bada, zein da $P(x)\\mathbin{:}(x+2)$ zatiketaren hondarra?', 'Si $P(x)=x^{3}-2x+5$, ¿cuál es el resto de $P(x)\\mathbin{:}(x+2)$?', 'إذا كان $P(x)=x^{3}-2x+5$ فما باقي $P(x)\\mathbin{:}(x+2)$؟', 'If $P(x)=x^{3}-2x+5$, what is the remainder of $P(x)\\mathbin{:}(x+2)$?'),
        options: [same('$1$'), same('$9$'), same('$-1$')],
        correctIndex: 0,
        explanation: say('Hondarra $P(-2)$ da: $-8+4+5=1$.', 'El resto es $P(-2)$: $-8+4+5=1$.', 'الباقي هو $P(-2)$: $-8+4+5=1$.', 'The remainder is $P(-2)$: $-8+4+5=1$.'),
        topic: 'remainder'
    },
    {
        id: 5105,
        prompt: say('Zein izan daiteke $x^{3}-2x^{2}+3x-6$ polinomioaren erro osoa?', '¿Cuál puede ser una raíz entera de $x^{3}-2x^{2}+3x-6$?', 'أيّها يمكن أن يكون جذرًا صحيحًا لـ$x^{3}-2x^{2}+3x-6$؟', 'What could be an integer root of $x^{3}-2x^{2}+3x-6$?'),
        options: [same('$4$'), same('$2$'), same('$5$')],
        correctIndex: 1,
        explanation: say('Erro osoak 6ren zatitzaileak dira; eta $8-8+6-6=0$, beraz 2 erroa da.', 'Las raíces enteras son divisores de 6; y $8-8+6-6=0$, así que 2 es raíz.', 'الجذور الصحيحة قواسم 6؛ و$8-8+6-6=0$، إذن 2 جذر.', 'The integer roots are divisors of 6; and $8-8+6-6=0$, so 2 is a root.'),
        topic: 'roots'
    },
    {
        id: 5106,
        prompt: say('$x^{2}-5x+6$ faktorizatuta…', '$x^{2}-5x+6$ factorizado es…', '$x^{2}-5x+6$ بعد التحليل…', '$x^{2}-5x+6$ factorised is…'),
        options: [same('$(x+2)(x+3)$'), same('$(x-1)(x-6)$'), same('$(x-2)(x-3)$')],
        correctIndex: 2,
        explanation: say('Erroak 2 eta 3 dira: $(x-2)(x-3)=x^{2}-5x+6$.', 'Sus raíces son 2 y 3: $(x-2)(x-3)=x^{2}-5x+6$.', 'جذراها 2 و3: $(x-2)(x-3)=x^{2}-5x+6$.', 'Its roots are 2 and 3: $(x-2)(x-3)=x^{2}-5x+6$.'),
        topic: 'factorize'
    },
    {
        id: 5107,
        prompt: simplify('$\\frac{x^{2}-1}{x+1}$'),
        options: [same('$x$'), same('$x-1$'), same('$x^{2}$')],
        correctIndex: 1,
        explanation: same('$\\frac{(x+1)(x-1)}{x+1}=x-1$'),
        topic: 'simplify'
    },
    {
        id: 5108,
        prompt: say('$\\frac{1}{x}+\\frac{1}{x+1}$ berdin…', '$\\frac{1}{x}+\\frac{1}{x+1}$ es igual a…', '$\\frac{1}{x}+\\frac{1}{x+1}$ تساوي…', '$\\frac{1}{x}+\\frac{1}{x+1}$ is equal to…'),
        options: [same('$\\frac{2x+1}{x(x+1)}$'), same('$\\frac{2}{2x+1}$'), same('$\\frac{2}{x(x+1)}$')],
        correctIndex: 0,
        explanation: say('Izendatzaile komuna $x(x+1)$: $\\frac{x+1+x}{x(x+1)}=\\frac{2x+1}{x(x+1)}$.', 'Denominador común $x(x+1)$: $\\frac{x+1+x}{x(x+1)}=\\frac{2x+1}{x(x+1)}$.', 'المقام المشترك $x(x+1)$: $\\frac{x+1+x}{x(x+1)}=\\frac{2x+1}{x(x+1)}$.', 'Common denominator $x(x+1)$: $\\frac{x+1+x}{x(x+1)}=\\frac{2x+1}{x(x+1)}$.'),
        topic: 'add-fractions'
    }
]

export const polynomialsFractionsPractice: PracticeItem[] = [
    /* ---------- Operations ---------- */
    { id: 1, stage: 'operations', prompt: say('Kalkulatu $(3x^{3}+2x-4)\\cdot(-2x+5)$. Zein da x-ren koefizientea?', 'Calcula $(3x^{3}+2x-4)\\cdot(-2x+5)$. ¿Cuál es el coeficiente de x?', 'احسب $(3x^{3}+2x-4)\\cdot(-2x+5)$. ما معامل x؟', 'Work out $(3x^{3}+2x-4)\\cdot(-2x+5)$. What is the coefficient of x?'), expected: n(18), hint: say('$2x\\cdot 5$ eta $-4\\cdot(-2x)$.', '$2x\\cdot 5$ y $-4\\cdot(-2x)$.', '$2x\\cdot 5$ و$-4\\cdot(-2x)$.', '$2x\\cdot 5$ and $-4\\cdot(-2x)$.'), explanation: same('$10x+8x=18x$') },
    { id: 2, stage: 'operations', prompt: say('Sinplifikatu $(3x-2)(3x+2)-(3x-2)^{2}$. Zein da x-ren koefizientea?', 'Simplifica $(3x-2)(3x+2)-(3x-2)^{2}$. ¿Cuál es el coeficiente de x?', 'بسّط $(3x-2)(3x+2)-(3x-2)^{2}$. ما معامل x؟', 'Simplify $(3x-2)(3x+2)-(3x-2)^{2}$. What is the coefficient of x?'), expected: n(12), hint: say('Batura bider kendura eta kendura baten karratua.', 'Suma por diferencia y cuadrado de una diferencia.', 'المجموع في الفرق ومربع الفرق.', 'Sum times difference, and square of a difference.'), explanation: same('$9x^{2}-4-(9x^{2}-12x+4)=12x-8$') },
    { id: 3, stage: 'operations', prompt: howMuch('$9x^{2}-30x+25=(3x-a)^{2}$'), expected: n(5), hint: say('$25=a^{2}$ eta $30x=2\\cdot 3x\\cdot a$.', '$25=a^{2}$ y $30x=2\\cdot 3x\\cdot a$.', '$25=a^{2}$ و$30x=2\\cdot 3x\\cdot a$.', '$25=a^{2}$ and $30x=2\\cdot 3x\\cdot a$.'), explanation: same('$(3x-5)^{2}=9x^{2}-30x+25$') },
    { id: 4, stage: 'operations', prompt: say('$(x-2)^{4}$ garatzean, zein da $x^{2}$-ren koefizientea?', 'Al desarrollar $(x-2)^{4}$, ¿cuál es el coeficiente de $x^{2}$?', 'عند نشر $(x-2)^{4}$ ما معامل $x^{2}$؟', 'When you expand $(x-2)^{4}$, what is the coefficient of $x^{2}$?'), expected: n(24), hint: say('4. errenkada: 1 4 6 4 1.', 'Fila 4: 1 4 6 4 1.', 'الصف 4: 1 4 6 4 1.', 'Row 4: 1 4 6 4 1.'), explanation: same('$6\\cdot(-2)^{2}=24$') },

    /* ---------- Division ---------- */
    { id: 5, stage: 'division', prompt: say('Zatitu $(6x^{3}-x^{2}+4x+5)\\mathbin{:}(2x+1)$. Zein da hondarra?', 'Divide $(6x^{3}-x^{2}+4x+5)\\mathbin{:}(2x+1)$. ¿Cuál es el resto?', 'اقسم $(6x^{3}-x^{2}+4x+5)\\mathbin{:}(2x+1)$. ما الباقي؟', 'Divide $(6x^{3}-x^{2}+4x+5)\\mathbin{:}(2x+1)$. What is the remainder?'), expected: n(2), hint: say('Zatiduraren lehen gaia: $6x^{3}\\mathbin{:}2x=3x^{2}$.', 'Primer término del cociente: $6x^{3}\\mathbin{:}2x=3x^{2}$.', 'أول حد في خارج القسمة: $6x^{3}\\mathbin{:}2x=3x^{2}$.', 'First term of the quotient: $6x^{3}\\mathbin{:}2x=3x^{2}$.'), explanation: same('$6x^{3}-x^{2}+4x+5=(2x+1)(3x^{2}-2x+3)+2$') },
    { id: 6, stage: 'division', prompt: say('Ruffiniz, $(2x^{4}-x^{3}+6x^{2}-3x+1)\\mathbin{:}(x+2)$. Zein da hondarra?', 'Con Ruffini, $(2x^{4}-x^{3}+6x^{2}-3x+1)\\mathbin{:}(x+2)$. ¿Cuál es el resto?', 'بروفيني، $(2x^{4}-x^{3}+6x^{2}-3x+1)\\mathbin{:}(x+2)$. ما الباقي؟', 'Using Ruffini, $(2x^{4}-x^{3}+6x^{2}-3x+1)\\mathbin{:}(x+2)$. What is the remainder?'), expected: n(71), hint: say('$a=-2$. Behe-errenkada: 2, $-5$, 16, $-35$…', '$a=-2$. Fila de abajo: 2, $-5$, 16, $-35$…', '$a=-2$. الصف السفلي: 2، $-5$، 16، $-35$…', '$a=-2$. Bottom row: 2, $-5$, 16, $-35$…'), explanation: same('$-35\\cdot(-2)+1=71$') },
    { id: 7, stage: 'division', prompt: say('$P(x)=3x^{3}-8x^{2}+3x$. Kalkulatu $P(-3)$ Ruffiniz.', '$P(x)=3x^{3}-8x^{2}+3x$. Calcula $P(-3)$ con Ruffini.', '$P(x)=3x^{3}-8x^{2}+3x$. احسب $P(-3)$ بروفيني.', '$P(x)=3x^{3}-8x^{2}+3x$. Work out $P(-3)$ using Ruffini.'), expected: n(-162), hint: say('Koefizienteak: 3, $-8$, 3, 0.', 'Coeficientes: 3, $-8$, 3, 0.', 'المعاملات: 3، $-8$، 3، 0.', 'Coefficients: 3, $-8$, 3, 0.'), explanation: same('$-81-72-9=-162$') },
    { id: 8, stage: 'division', prompt: say('$2x^{3}+7x^{2}+ax-3$ polinomioa $x+3$-z zatigarria da. Zenbat da a?', '$2x^{3}+7x^{2}+ax-3$ es divisible entre $x+3$. ¿Cuánto vale a?', '$2x^{3}+7x^{2}+ax-3$ تقبل القسمة على $x+3$. كم تساوي a؟', '$2x^{3}+7x^{2}+ax-3$ is divisible by $x+3$. What is a?'), expected: n(2), hint: say('Hondarrak 0 izan behar du: $P(-3)=0$.', 'El resto debe ser 0: $P(-3)=0$.', 'يجب أن يكون الباقي 0: $P(-3)=0$.', 'The remainder must be 0: $P(-3)=0$.'), explanation: same('$-54+63-3a-3=6-3a=0\\ \\to\\ a=2$') },

    /* ---------- Roots and factorisation ---------- */
    { id: 9, stage: 'factor', prompt: say('$x^{3}-2x^{2}-5x+6$ polinomioak hiru erro oso ditu. Zenbat dira guztira?', '$x^{3}-2x^{2}-5x+6$ tiene tres raíces enteras. ¿Cuánto suman?', 'للحدودية $x^{3}-2x^{2}-5x+6$ ثلاثة جذور صحيحة. ما مجموعها؟', '$x^{3}-2x^{2}-5x+6$ has three integer roots. What do they add up to?'), expected: n(2), hint: say('Probatu 1: $1-2-5+6=0$.', 'Prueba con 1: $1-2-5+6=0$.', 'جرّب 1: $1-2-5+6=0$.', 'Try 1: $1-2-5+6=0$.'), explanation: say('$(x-1)(x-3)(x+2)$: erroak 1, 3 eta $-2$; $1+3-2=2$.', '$(x-1)(x-3)(x+2)$: raíces 1, 3 y $-2$; $1+3-2=2$.', '$(x-1)(x-3)(x+2)$: الجذور 1 و3 و$-2$؛ $1+3-2=2$.', '$(x-1)(x-3)(x+2)$: roots 1, 3 and $-2$; $1+3-2=2$.') },
    { id: 10, stage: 'factor', prompt: howMuch('$6x^{2}-x-2=(2x+1)(3x-a)$'), expected: n(2), hint: say('Erroak $-\\frac{1}{2}$ eta $\\frac{2}{3}$ dira.', 'Las raíces son $-\\frac{1}{2}$ y $\\frac{2}{3}$.', 'الجذران $-\\frac{1}{2}$ و$\\frac{2}{3}$.', 'The roots are $-\\frac{1}{2}$ and $\\frac{2}{3}$.'), explanation: same('$(2x+1)(3x-2)=6x^{2}-x-2$') },
    { id: 11, stage: 'factor', prompt: howMuch('$x^{4}-20x^{2}+64=(x-2)(x+2)(x-4)(x+a)$'), expected: n(4), hint: say('Ruffini 2rekin eta $-2$rekin, edo $x^{2}$-ren bi erroak.', 'Ruffini con 2 y con $-2$, o las dos raíces en $x^{2}$.', 'روفيني بالعددين 2 و$-2$، أو الجذران بالنسبة إلى $x^{2}$.', 'Ruffini with 2 and with $-2$, or the two roots in $x^{2}$.'), explanation: same('$(x^{2}-4)(x^{2}-16)=x^{4}-20x^{2}+64$') },
    { id: 12, stage: 'factor', prompt: say('Zein da $x^{2}-1$ eta $x^{2}+2x+1$ polinomioen m.k.t.-aren maila?', '¿Cuál es el grado del m.c.m. de $x^{2}-1$ y $x^{2}+2x+1$?', 'ما درجة المضاعف المشترك الأصغر لـ$x^{2}-1$ و$x^{2}+2x+1$؟', 'What is the degree of the LCM of $x^{2}-1$ and $x^{2}+2x+1$?'), expected: n(3), hint: say('Faktorizatu biak.', 'Factoriza los dos.', 'حلّل الاثنتين.', 'Factorise both.'), explanation: say('$x^{2}-1=(x+1)(x-1)$ eta $x^{2}+2x+1=(x+1)^{2}$; m.k.t. $=(x+1)^{2}(x-1)$, 3. maila.', '$x^{2}-1=(x+1)(x-1)$ y $x^{2}+2x+1=(x+1)^{2}$; m.c.m. $=(x+1)^{2}(x-1)$, grado 3.', '$x^{2}-1=(x+1)(x-1)$ و$x^{2}+2x+1=(x+1)^{2}$؛ المضاعف $=(x+1)^{2}(x-1)$، الدرجة 3.', '$x^{2}-1=(x+1)(x-1)$ and $x^{2}+2x+1=(x+1)^{2}$; LCM $=(x+1)^{2}(x-1)$, degree 3.') },

    /* ---------- Algebraic fractions ---------- */
    { id: 13, stage: 'fractions', prompt: valueAt('$\\frac{x^{2}+1}{x-3}$', '5'), expected: n(13), hint: say('Ordeztu goian eta behean.', 'Sustituye arriba y abajo.', 'عوّض في البسط والمقام.', 'Substitute in the top and bottom.'), explanation: same('$\\frac{25+1}{5-3}=13$') },
    { id: 14, stage: 'fractions', prompt: say('x-ren zein balio positibotan ez dago $\\frac{x+4}{x^{2}-9}$?', '¿Para qué valor positivo de x no existe $\\frac{x+4}{x^{2}-9}$?', 'عند أي قيمة موجبة لـ x لا يكون $\\frac{x+4}{x^{2}-9}$ معرّفًا؟', 'For which positive value of x does $\\frac{x+4}{x^{2}-9}$ not exist?'), expected: n(3), hint: say('Izendatzailea 0.', 'Denominador igual a 0.', 'المقام يساوي 0.', 'Denominator equal to 0.'), explanation: same('$x^{2}-9=0\\ \\to\\ x=\\pm 3$') },
    { id: 15, stage: 'fractions', prompt: say('Sinplifikatu $\\frac{x^{2}-9}{x^{2}+6x+9}$ eta kalkulatu haren balioa x = 7 denean.', 'Simplifica $\\frac{x^{2}-9}{x^{2}+6x+9}$ y calcula su valor para x = 7.', 'بسّط $\\frac{x^{2}-9}{x^{2}+6x+9}$ واحسب قيمته عندما x = 7.', 'Simplify $\\frac{x^{2}-9}{x^{2}+6x+9}$ and work out its value for x = 7.'), expected: f(2, 5), hint: say('$\\frac{(x+3)(x-3)}{(x+3)^{2}}$', '$\\frac{(x+3)(x-3)}{(x+3)^{2}}$', '$\\frac{(x+3)(x-3)}{(x+3)^{2}}$', '$\\frac{(x+3)(x-3)}{(x+3)^{2}}$'), explanation: same('$\\frac{7-3}{7+3}=\\frac{4}{10}=\\frac{2}{5}$') },
    { id: 16, stage: 'fractions', prompt: howMuch('$\\frac{x+2}{x}=\\frac{x^{2}+bx+6}{x^{2}+3x}$', 'b'), expected: n(5), hint: say('Izendatzailea $x+3$-z biderkatu da.', 'El denominador se ha multiplicado por $x+3$.', 'ضُرب المقام في $x+3$.', 'The denominator has been multiplied by $x+3$.'), explanation: same('$(x+2)(x+3)=x^{2}+5x+6$') },

    /* ---------- Operations with fractions ---------- */
    { id: 17, stage: 'operate', prompt: howMuch('$\\frac{1}{x-1}-\\frac{1}{x+1}=\\frac{a}{x^{2}-1}$'), expected: n(2), hint: say('Izendatzaile komuna: $(x-1)(x+1)$.', 'Denominador común: $(x-1)(x+1)$.', 'المقام المشترك: $(x-1)(x+1)$.', 'Common denominator: $(x-1)(x+1)$.'), explanation: same('$\\frac{(x+1)-(x-1)}{x^{2}-1}=\\frac{2}{x^{2}-1}$') },
    { id: 18, stage: 'operate', prompt: say('Kalkulatu $\\frac{x^{2}-1}{x}\\cdot\\frac{x^{2}}{x+1}$ eta eman haren balioa x = 4 denean.', 'Calcula $\\frac{x^{2}-1}{x}\\cdot\\frac{x^{2}}{x+1}$ y da su valor para x = 4.', 'احسب $\\frac{x^{2}-1}{x}\\cdot\\frac{x^{2}}{x+1}$ وأعطِ قيمته عندما x = 4.', 'Work out $\\frac{x^{2}-1}{x}\\cdot\\frac{x^{2}}{x+1}$ and give its value for x = 4.'), expected: n(12), hint: say('Faktorizatu $x^{2}-1$ eta sinplifikatu.', 'Factoriza $x^{2}-1$ y simplifica.', 'حلّل $x^{2}-1$ وبسّط.', 'Factorise $x^{2}-1$ and simplify.'), explanation: same('$\\frac{(x+1)(x-1)x^{2}}{x(x+1)}=x(x-1)\\qquad 4\\cdot 3=12$') },
    { id: 19, stage: 'operate', prompt: howMuch('$\\frac{x+3}{x}\\mathbin{:}\\frac{x^{2}-9}{x^{2}}=\\frac{x}{x-a}$'), expected: n(3), hint: say('Bigarrenari buelta eman eta biderkatu.', 'Da la vuelta a la segunda y multiplica.', 'اقلب الثاني واضرب.', 'Flip the second fraction and multiply.'), explanation: same('$\\frac{(x+3)x^{2}}{x(x+3)(x-3)}=\\frac{x}{x-3}$') },
    { id: 20, stage: 'operate', prompt: say('Txorrota batek depositua 6 orduan betetzen du eta beste batek 3 orduan. Zenbat ordu behar dituzte biek batera?', 'Un grifo llena un depósito en 6 horas y otro en 3 horas. ¿Cuántas horas tardan los dos juntos?', 'يملأ صنبور خزانًا في 6 ساعات وآخر في 3 ساعات. كم ساعة يحتاجان معًا؟', 'One tap fills a tank in 6 hours and another in 3 hours. How many hours do the two of them take together?'), expected: n(2), hint: say('Ordu batean: $\\frac{1}{6}+\\frac{1}{3}$.', 'En una hora: $\\frac{1}{6}+\\frac{1}{3}$.', 'في ساعة: $\\frac{1}{6}+\\frac{1}{3}$.', 'In one hour: $\\frac{1}{6}+\\frac{1}{3}$.'), explanation: say('$\\frac{1}{6}+\\frac{1}{3}=\\frac{1}{2}$ ordu bakoitzean: 2 ordu.', '$\\frac{1}{6}+\\frac{1}{3}=\\frac{1}{2}$ cada hora: 2 horas.', '$\\frac{1}{6}+\\frac{1}{3}=\\frac{1}{2}$ في كل ساعة: ساعتان (2).', '$\\frac{1}{6}+\\frac{1}{3}=\\frac{1}{2}$ per hour, so 2 hours.') }
]

export const polynomialsFractionsChallenges: ChallengeItem[] = [
    { id: 101, stage: 'operations', points: 10, context: 'starter', prompt: say('Zein da $(x^{3}-2x+1)^{2}\\cdot(x^{2}+5)$ polinomioaren maila?', '¿Cuál es el grado de $(x^{3}-2x+1)^{2}\\cdot(x^{2}+5)$?', 'ما درجة $(x^{3}-2x+1)^{2}\\cdot(x^{2}+5)$؟', 'What is the degree of $(x^{3}-2x+1)^{2}\\cdot(x^{2}+5)$?'), expected: n(8), hint: say('Karratuak maila bikoizten du.', 'El cuadrado duplica el grado.', 'المربع يضاعف الدرجة.', 'Squaring doubles the degree.'), explanation: same('$2\\cdot 3+2=8$') },
    { id: 102, stage: 'operations', points: 20, context: 'advanced', prompt: say('$(x+2y)^{3}$ garatzean, zein da $xy^{2}$-ren koefizientea?', 'Al desarrollar $(x+2y)^{3}$, ¿cuál es el coeficiente de $xy^{2}$?', 'عند نشر $(x+2y)^{3}$ ما معامل $xy^{2}$؟', 'When you expand $(x+2y)^{3}$, what is the coefficient of $xy^{2}$?'), expected: n(12), hint: say('$3ab^{2}$, $a=x$ eta $b=2y$.', '$3ab^{2}$ con $a=x$ y $b=2y$.', '$3ab^{2}$ حيث $a=x$ و$b=2y$.', '$3ab^{2}$ with $a=x$ and $b=2y$.'), explanation: same('$3\\cdot x\\cdot(2y)^{2}=12xy^{2}$') },
    { id: 103, stage: 'operations', points: 30, context: 'master', prompt: howMuch('$27x^{6}-135x^{4}+225x^{2}-125=(3x^{2}-5)^{n}$', 'n'), expected: n(3), hint: say('$27x^{6}=(3x^{2})^{3}$ eta $125=5^{3}$.', '$27x^{6}=(3x^{2})^{3}$ y $125=5^{3}$.', '$27x^{6}=(3x^{2})^{3}$ و$125=5^{3}$.', '$27x^{6}=(3x^{2})^{3}$ and $125=5^{3}$.'), explanation: same('$(3x^{2}-5)^{3}=27x^{6}-135x^{4}+225x^{2}-125$') },
    { id: 104, stage: 'division', points: 10, context: 'starter', prompt: remainderOf('$(x^{3}+2x^{2}-x+4)\\mathbin{:}(x-2)$'), expected: n(18), hint: say('Hondarra $P(2)$ da.', 'El resto es $P(2)$.', 'الباقي هو $P(2)$.', 'The remainder is $P(2)$.'), explanation: same('$8+8-2+4=18$') },
    { id: 105, stage: 'division', points: 20, context: 'advanced', prompt: say('Zenbat izan behar du m-k $x^{3}-mx^{2}+5x-2$ polinomioa $x-2$-z zatigarria izateko?', '¿Cuánto debe valer m para que $x^{3}-mx^{2}+5x-2$ sea divisible entre $x-2$?', 'كم يجب أن تكون m لتقبل $x^{3}-mx^{2}+5x-2$ القسمة على $x-2$؟', 'What must m be so that $x^{3}-mx^{2}+5x-2$ is divisible by $x-2$?'), expected: n(4), hint: say('$P(2)=0$ izan behar du.', 'Tiene que ser $P(2)=0$.', 'يجب أن يكون $P(2)=0$.', 'It must be that $P(2)=0$.'), explanation: same('$8-4m+10-2=16-4m=0\\ \\to\\ m=4$') },
    { id: 106, stage: 'division', points: 30, context: 'master', prompt: say('$x^{3}+ax^{2}+bx-4$ polinomioa $x+1$-z zatitzean hondarra $-10$ da, eta $x-2$-z zatitzean 8. Zenbat da b?', 'Al dividir $x^{3}+ax^{2}+bx-4$ entre $x+1$ el resto es $-10$, y entre $x-2$, 8. ¿Cuánto vale b?', 'عند قسمة $x^{3}+ax^{2}+bx-4$ على $x+1$ يكون الباقي $-10$، وعلى $x-2$ يكون 8. كم تساوي b؟', 'When you divide $x^{3}+ax^{2}+bx-4$ by $x+1$ the remainder is $-10$, and by $x-2$ it is 8. What is b?'), expected: n(4), hint: say('$P(-1)=-10$ eta $P(2)=8$: bi ekuazio.', '$P(-1)=-10$ y $P(2)=8$: dos ecuaciones.', '$P(-1)=-10$ و$P(2)=8$: معادلتان.', '$P(-1)=-10$ and $P(2)=8$: two equations.'), explanation: same('$a-b=-5,\\ 2a+b=2\\ \\to\\ a=-1,\\ b=4$') },
    { id: 107, stage: 'factor', points: 10, context: 'starter', prompt: say('Zenbat erro oso desberdin ditu $x^{3}-7x^{2}+8x+16$ polinomioak?', '¿Cuántas raíces enteras distintas tiene $x^{3}-7x^{2}+8x+16$?', 'كم جذرًا صحيحًا مختلفًا للحدودية $x^{3}-7x^{2}+8x+16$؟', 'How many different integer roots does $x^{3}-7x^{2}+8x+16$ have?'), expected: n(2), hint: say('Probatu $-1$ eta 4.', 'Prueba con $-1$ y con 4.', 'جرّب $-1$ و4.', 'Try $-1$ and 4.'), explanation: say('$(x-4)^{2}(x+1)$: 4 (bikoitza) eta $-1$, 2 erro desberdin.', '$(x-4)^{2}(x+1)$: 4 (doble) y $-1$, 2 raíces distintas.', '$(x-4)^{2}(x+1)$: 4 (مضاعف) و$-1$، جذران (2) مختلفان.', '$(x-4)^{2}(x+1)$: 4 (double) and $-1$, 2 different roots.') },
    { id: 108, stage: 'factor', points: 20, context: 'advanced', prompt: howMuch('$18x^{3}+6x^{2}-52x+16=2(3x-1)(3x-4)(x+a)$'), expected: n(2), hint: say('Atera 2 eta bilatu erro oso bat: $-2$.', 'Saca el 2 y busca una raíz entera: $-2$.', 'أخرج 2 وابحث عن جذر صحيح: $-2$.', 'Factor out the 2 and look for an integer root: $-2$.'), explanation: same('$2(3x-1)(3x-4)(x+2)=18x^{3}+6x^{2}-52x+16$') },
    { id: 109, stage: 'factor', points: 30, context: 'master', prompt: say('Zein da $x^{4}-x^{2}$ eta $x^{3}+2x^{2}+x$ polinomioen m.k.t.-aren maila?', '¿Cuál es el grado del m.c.m. de $x^{4}-x^{2}$ y $x^{3}+2x^{2}+x$?', 'ما درجة المضاعف المشترك الأصغر لـ$x^{4}-x^{2}$ و$x^{3}+2x^{2}+x$؟', 'What is the degree of the LCM of $x^{4}-x^{2}$ and $x^{3}+2x^{2}+x$?'), expected: n(5), hint: say('$x^{2}(x+1)(x-1)$ eta $x(x+1)^{2}$.', '$x^{2}(x+1)(x-1)$ y $x(x+1)^{2}$.', '$x^{2}(x+1)(x-1)$ و$x(x+1)^{2}$.', '$x^{2}(x+1)(x-1)$ and $x(x+1)^{2}$.'), explanation: say('M.k.t. $=x^{2}(x+1)^{2}(x-1)$, maila $2+2+1=5$.', 'M.c.m. $=x^{2}(x+1)^{2}(x-1)$, grado $2+2+1=5$.', 'المضاعف $=x^{2}(x+1)^{2}(x-1)$، الدرجة $2+2+1=5$.', 'LCM $=x^{2}(x+1)^{2}(x-1)$, degree $2+2+1=5$.') },
    { id: 110, stage: 'fractions', points: 10, context: 'starter', prompt: valueAt('$\\frac{x^{2}-4}{x+1}$', '−3'), expected: f(-5, 2), hint: say('Negatiboa parentesi artean.', 'El negativo, entre paréntesis.', 'السالب بين قوسين.', 'Put the negative sign in brackets.'), explanation: same('$\\frac{9-4}{-3+1}=\\frac{5}{-2}=-\\frac{5}{2}$') },
    { id: 111, stage: 'fractions', points: 20, context: 'advanced', prompt: say('Sinplifikatu $\\frac{x^{3}-x}{x^{2}+x}$ eta kalkulatu haren balioa x = 10 denean.', 'Simplifica $\\frac{x^{3}-x}{x^{2}+x}$ y calcula su valor para x = 10.', 'بسّط $\\frac{x^{3}-x}{x^{2}+x}$ واحسب قيمته عندما x = 10.', 'Simplify $\\frac{x^{3}-x}{x^{2}+x}$ and work out its value for x = 10.'), expected: n(9), hint: say('Atera x goian eta behean.', 'Saca x arriba y abajo.', 'أخرج x من البسط والمقام.', 'Factor out x from the top and bottom.'), explanation: same('$\\frac{x(x+1)(x-1)}{x(x+1)}=x-1\\qquad 10-1=9$') },
    { id: 112, stage: 'fractions', points: 30, context: 'master', prompt: howMuch('$\\frac{x-1}{x+2}=\\frac{x^{2}+kx+3}{x^{2}-x-6}$', 'k'), expected: n(-4), hint: say('$x^{2}-x-6=(x+2)(x-3)$.', '$x^{2}-x-6=(x+2)(x-3)$.', '$x^{2}-x-6=(x+2)(x-3)$.', '$x^{2}-x-6=(x+2)(x-3)$.'), explanation: same('$(x-1)(x-3)=x^{2}-4x+3$') },
    { id: 113, stage: 'operate', points: 10, context: 'starter', prompt: howMuch('$\\frac{3}{x}-\\frac{1}{x^{2}}=\\frac{ax-1}{x^{2}}$'), expected: n(3), hint: say('Izendatzaile komuna: $x^{2}$.', 'Denominador común: $x^{2}$.', 'المقام المشترك: $x^{2}$.', 'Common denominator: $x^{2}$.'), explanation: same('$\\frac{3x}{x^{2}}-\\frac{1}{x^{2}}=\\frac{3x-1}{x^{2}}$') },
    { id: 114, stage: 'operate', points: 20, context: 'advanced', prompt: howMuch('$\\frac{2x+6}{x^{2}-1}\\cdot\\frac{x-1}{x+3}=\\frac{a}{x+1}$'), expected: n(2), hint: say('$2x+6=2(x+3)$ eta $x^{2}-1=(x+1)(x-1)$.', '$2x+6=2(x+3)$ y $x^{2}-1=(x+1)(x-1)$.', '$2x+6=2(x+3)$ و$x^{2}-1=(x+1)(x-1)$.', '$2x+6=2(x+3)$ and $x^{2}-1=(x+1)(x-1)$.'), explanation: same('$\\frac{2(x+3)(x-1)}{(x+1)(x-1)(x+3)}=\\frac{2}{x+1}$') },
    { id: 115, stage: 'operate', points: 30, context: 'master', prompt: say('Txorrota batek depositua x minututan betetzen du, eta beste batek bikoitza behar du. Idatzi biek minutu batean betetzen duten zatia; x = 18 bada, zenbat minutu behar dituzte batera?', 'Un grifo llena un depósito en x minutos y otro tarda el doble. Escribe la parte que llenan juntos en un minuto; si x = 18, ¿cuántos minutos tardan juntos?', 'يملأ صنبور خزانًا في x دقيقة ويحتاج آخر إلى ضعف ذلك. اكتب الجزء الذي يملآنه معًا في دقيقة؛ إذا كان x = 18 فكم دقيقة يحتاجان معًا؟', 'One tap fills a tank in x minutes and another takes twice as long. Write the part they fill together in one minute; if x = 18, how many minutes do they take together?'), expected: n(12), hint: say('$\\frac{1}{x}+\\frac{1}{2x}$', '$\\frac{1}{x}+\\frac{1}{2x}$', '$\\frac{1}{x}+\\frac{1}{2x}$', '$\\frac{1}{x}+\\frac{1}{2x}$'), explanation: same('$\\frac{1}{x}+\\frac{1}{2x}=\\frac{3}{2x}\\qquad \\frac{3}{36}=\\frac{1}{12}$') }
]

export const polynomialsFractionsExerciseBank: ExerciseSection[] = [
    {
        id: 'operations',
        title: say('Polinomioen eragiketak', 'Operaciones con polinomios', 'العمليات على الحدوديات', 'Operations with polynomials'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Zein da $5x^{2}+2x-4$ polinomioaren maila?', '¿Cuál es el grado de $5x^{2}+2x-4$?', 'ما درجة $5x^{2}+2x-4$؟', 'What is the degree of $5x^{2}+2x-4$?'), solution: say('Maila 2, koefiziente nagusia 5, gai askea $-4$.', 'Grado 2, coeficiente principal 5, término independiente $-4$.', 'الدرجة 2، المعامل الرئيسي 5، الحد الثابت $-4$.', 'Degree 2, leading coefficient 5, constant term $-4$.'), answer: { expected: n(2) } },
            { id: 2, difficulty: 'easy', question: say('$P(x)=x^{3}-2x^{2}+1$ bada, kalkulatu $P(-2)$.', 'Si $P(x)=x^{3}-2x^{2}+1$, calcula $P(-2)$.', 'إذا كان $P(x)=x^{3}-2x^{2}+1$ فاحسب $P(-2)$.', 'If $P(x)=x^{3}-2x^{2}+1$, work out $P(-2)$.'), solution: same('$-8-8+1=-15$'), answer: { expected: n(-15) } },
            { id: 3, difficulty: 'easy', question: calc('$(3x^{3}+2x-4)+(-2x+5)$'), solution: same('$3x^{3}+2x-4-2x+5=3x^{3}+1$') },
            { id: 4, difficulty: 'easy', question: expand('$(x+3y)^{2}$'), solution: same('$(x+3y)^{2}=x^{2}+6xy+9y^{2}$') },
            { id: 5, difficulty: 'medium', question: say('Garatu $(5x-1)^{2}$. Zein da x-ren koefizientea?', 'Desarrolla $(5x-1)^{2}$. ¿Cuál es el coeficiente de x?', 'انشر $(5x-1)^{2}$. ما معامل x؟', 'Expand $(5x-1)^{2}$. What is the coefficient of x?'), solution: same('$(5x-1)^{2}=25x^{2}-10x+1$'), answer: { expected: n(-10) } },
            { id: 6, difficulty: 'medium', question: say('Sinplifikatu $x^{2}+x(x-3)-(4x-6)$. Zein da gai askea?', 'Simplifica $x^{2}+x(x-3)-(4x-6)$. ¿Cuál es el término independiente?', 'بسّط $x^{2}+x(x-3)-(4x-6)$. ما الحد الثابت؟', 'Simplify $x^{2}+x(x-3)-(4x-6)$. What is the constant term?'), solution: same('$x^{2}+x(x-3)-(4x-6)=2x^{2}-7x+6$'), answer: { expected: n(6) } },
            { id: 7, difficulty: 'medium', question: say('Idatzi biderkadura gisa: $4x^{2}-16y^{2}$.', 'Escribe como producto: $4x^{2}-16y^{2}$.', 'اكتب جداءً: $4x^{2}-16y^{2}$.', 'Write as a product: $4x^{2}-16y^{2}$.'), solution: same('$4x^{2}-16y^{2}=(2x+4y)(2x-4y)$') },
            { id: 8, difficulty: 'medium', question: say('$(x+y)^{5}$ garatzean, zein da $x^{2}y^{3}$-ren koefizientea?', 'Al desarrollar $(x+y)^{5}$, ¿cuál es el coeficiente de $x^{2}y^{3}$?', 'عند نشر $(x+y)^{5}$ ما معامل $x^{2}y^{3}$؟', 'When you expand $(x+y)^{5}$, what is the coefficient of $x^{2}y^{3}$?'), solution: say('5. errenkada: 1 5 10 10 5 1, beraz $10x^{2}y^{3}$.', 'Fila 5: 1 5 10 10 5 1, así que $10x^{2}y^{3}$.', 'الصف 5: 1 5 10 10 5 1، إذن $10x^{2}y^{3}$.', 'Row 5: 1 5 10 10 5 1, so $10x^{2}y^{3}$.'), answer: { expected: n(10) } },
            { id: 9, difficulty: 'hard', question: say('Garatu $(x-1)^{5}$. Zein da $x^{2}$-ren koefizientea?', 'Desarrolla $(x-1)^{5}$. ¿Cuál es el coeficiente de $x^{2}$?', 'انشر $(x-1)^{5}$. ما معامل $x^{2}$؟', 'Expand $(x-1)^{5}$. What is the coefficient of $x^{2}$?'), solution: same('$(x-1)^{5}=x^{5}-5x^{4}+10x^{3}-10x^{2}+5x-1$'), answer: { expected: n(-10) } },
            { id: 10, difficulty: 'hard', question: howMuch('$x^{3}+6x^{2}+12x+8=(x+a)^{3}$'), solution: same('$(x+2)^{3}=x^{3}+6x^{2}+12x+8$'), answer: { expected: n(2) } }
        ]
    },
    {
        id: 'division',
        title: say('Zatiketa eta Ruffini', 'División y Ruffini', 'القسمة وروفيني', 'Division and Ruffini\'s rule'),
        items: [
            { id: 11, difficulty: 'easy', question: remainderOf('$(x^{3}+3x^{2}-4)\\mathbin{:}(x-1)$'), solution: say('$1+3-4=0$: zehatza da.', '$1+3-4=0$: es exacta.', '$1+3-4=0$: القسمة تامة.', '$1+3-4=0$: the division is exact.'), answer: { expected: n(0) } },
            { id: 12, difficulty: 'easy', question: remainderOf('$(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x-2)$'), solution: same('$16+24-12+6-4=30$'), answer: { expected: n(30) } },
            { id: 13, difficulty: 'easy', question: say('$P(5)=0$ bada, zer esan dezakezu $P(x)\\mathbin{:}(x-5)$ zatiketaz?', 'Si $P(5)=0$, ¿qué puedes decir de $P(x)\\mathbin{:}(x-5)$?', 'إذا كان $P(5)=0$ فماذا تقول عن $P(x)\\mathbin{:}(x-5)$؟', 'If $P(5)=0$, what can you say about $P(x)\\mathbin{:}(x-5)$?'), solution: say('Zehatza da: hondarra $P(5)=0$ da, eta $x-5$ faktorea da.', 'Es exacta: el resto es $P(5)=0$, y $x-5$ es un factor.', 'هي تامة: الباقي $P(5)=0$، و$x-5$ عامل.', 'The division is exact: the remainder is $P(5)=0$, and $x-5$ is a factor.') },
            { id: 14, difficulty: 'medium', question: say('Ruffiniz, $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x+4)$. Zein da zatiduraren gai askea?', 'Con Ruffini, $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x+4)$. ¿Cuál es el término independiente del cociente?', 'بروفيني، $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x+4)$. ما الحد الثابت لخارج القسمة؟', 'Using Ruffini, $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x+4)$. What is the constant term of the quotient?'), solution: same('$x^{4}+3x^{3}-3x^{2}+3x-4=(x+4)(x^{3}-x^{2}+x-1)$'), answer: { expected: n(-1) } },
            { id: 15, difficulty: 'medium', question: say('Zatitu $(x^{3}-2x^{2}+3)\\mathbin{:}(x^{2}+1)$. Zein da hondarraren gai askea?', 'Divide $(x^{3}-2x^{2}+3)\\mathbin{:}(x^{2}+1)$. ¿Cuál es el término independiente del resto?', 'اقسم $(x^{3}-2x^{2}+3)\\mathbin{:}(x^{2}+1)$. ما الحد الثابت للباقي؟', 'Divide $(x^{3}-2x^{2}+3)\\mathbin{:}(x^{2}+1)$. What is the constant term of the remainder?'), solution: same('$x^{3}-2x^{2}+3=(x^{2}+1)(x-2)-x+5$'), answer: { expected: n(5) } },
            { id: 16, difficulty: 'medium', question: say('$P(x)=7x^{4}-5x^{2}+2x-24$. Kalkulatu $P(10)$.', '$P(x)=7x^{4}-5x^{2}+2x-24$. Calcula $P(10)$.', '$P(x)=7x^{4}-5x^{2}+2x-24$. احسب $P(10)$.', '$P(x)=7x^{4}-5x^{2}+2x-24$. Work out $P(10)$.'), solution: same('$70\\,000-500+20-24=69\\,496$'), answer: { expected: n(69496) } },
            { id: 17, difficulty: 'medium', question: say('$(4x^{3}+12x^{2}+5x-6)\\mathbin{:}(2x-1)$ zatiketaren zatidura $2x^{2}+7x+c$ da. Zenbat da c?', 'El cociente de $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}(2x-1)$ es $2x^{2}+7x+c$. ¿Cuánto vale c?', 'خارج قسمة $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}(2x-1)$ هو $2x^{2}+7x+c$. كم تساوي c؟', 'The quotient of $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}(2x-1)$ is $2x^{2}+7x+c$. What is c?'), solution: same('$(2x-1)(2x^{2}+7x+6)=4x^{3}+12x^{2}+5x-6$'), answer: { expected: n(6) } },
            { id: 18, difficulty: 'hard', question: say('Zenbat izan behar du k-k $(x^{4}-kx^{2}+5)\\mathbin{:}(x-2)$ zatiketaren hondarra 1 izateko?', '¿Cuánto debe valer k para que el resto de $(x^{4}-kx^{2}+5)\\mathbin{:}(x-2)$ sea 1?', 'كم يجب أن تكون k ليكون باقي $(x^{4}-kx^{2}+5)\\mathbin{:}(x-2)$ هو 1؟', 'What must k be so that the remainder of $(x^{4}-kx^{2}+5)\\mathbin{:}(x-2)$ is 1?'), solution: same('$16-4k+5=1\\ \\to\\ k=5$'), answer: { expected: n(5) } },
            { id: 19, difficulty: 'hard', question: say('Zenbat izan behar du a-k $x^{3}+ax^{2}-x-2$ polinomioa $x+1$-z zatigarria izateko?', '¿Cuánto debe valer a para que $x^{3}+ax^{2}-x-2$ sea divisible entre $x+1$?', 'كم يجب أن تكون a لتقبل $x^{3}+ax^{2}-x-2$ القسمة على $x+1$؟', 'What must a be so that $x^{3}+ax^{2}-x-2$ is divisible by $x+1$?'), solution: same('$-1+a+1-2=a-2=0\\ \\to\\ a=2$'), answer: { expected: n(2) } },
            { id: 20, difficulty: 'hard', question: say('$(x^{3}-3x^{2}+bx+4)\\mathbin{:}(x-3)$ zatiketaren hondarra $-8$ da. Zenbat da b?', 'El resto de $(x^{3}-3x^{2}+bx+4)\\mathbin{:}(x-3)$ es $-8$. ¿Cuánto vale b?', 'باقي $(x^{3}-3x^{2}+bx+4)\\mathbin{:}(x-3)$ هو $-8$. كم تساوي b؟', 'The remainder of $(x^{3}-3x^{2}+bx+4)\\mathbin{:}(x-3)$ is $-8$. What is b?'), solution: same('$27-27+3b+4=-8\\ \\to\\ b=-4$'), answer: { expected: n(-4) } }
        ]
    },
    {
        id: 'factor',
        title: say('Erroak eta faktorizazioa', 'Raíces y factorización', 'الجذور والتحليل', 'Roots and factorisation'),
        items: [
            { id: 21, difficulty: 'easy', question: say('$x=-3$ al da $x^{2}-x-12$ polinomioaren erroa?', '¿Es $x=-3$ raíz de $x^{2}-x-12$?', 'هل $x=-3$ جذر لـ$x^{2}-x-12$؟', 'Is $x=-3$ a root of $x^{2}-x-12$?'), solution: say('Bai: $9+3-12=0$.', 'Sí: $9+3-12=0$.', 'نعم: $9+3-12=0$.', 'Yes: $9+3-12=0$.') },
            { id: 22, difficulty: 'easy', question: say('Zenbat erro oso posible ditu $x^{3}+3x^{2}+x+3$ polinomioak?', '¿Cuántas posibles raíces enteras tiene $x^{3}+3x^{2}+x+3$?', 'كم جذرًا صحيحًا ممكنًا لـ$x^{3}+3x^{2}+x+3$؟', 'How many possible integer roots does $x^{3}+3x^{2}+x+3$ have?'), solution: say('3ren zatitzaileak, 4 hautagai: $\\pm 1,\\ \\pm 3$.', 'Los divisores de 3, 4 candidatos: $\\pm 1,\\ \\pm 3$.', 'قواسم 3، أي 4 مرشحين: $\\pm 1,\\ \\pm 3$.', 'The divisors of 3 give 4 candidates: $\\pm 1,\\ \\pm 3$.'), answer: { expected: n(4) } },
            { id: 23, difficulty: 'easy', question: factorize('$3x^{2}+5x$'), solution: same('$3x^{2}+5x=x(3x+5)$') },
            { id: 24, difficulty: 'medium', question: factorize('$x^{3}-7x-6$'), solution: same('$x^{3}-7x-6=(x+1)(x+2)(x-3)$') },
            { id: 25, difficulty: 'medium', question: factorize('$x^{4}+6x^{3}+13x^{2}+12x+4$'), solution: same('$x^{4}+6x^{3}+13x^{2}+12x+4=(x+1)^{2}(x+2)^{2}$') },
            { id: 26, difficulty: 'medium', question: say('Faktorizatu $3x^{5}-48x$. Zenbat lehen mailako faktore ditu?', 'Factoriza $3x^{5}-48x$. ¿Cuántos factores de grado 1 tiene?', 'حلّل $3x^{5}-48x$. كم عاملًا من الدرجة الأولى فيه؟', 'Factorise $3x^{5}-48x$. How many factors of degree 1 does it have?'), solution: say('$3x^{5}-48x=3x(x^{2}+4)(x+2)(x-2)$: 3 faktore (x, $x+2$, $x-2$).', '$3x^{5}-48x=3x(x^{2}+4)(x+2)(x-2)$: 3 factores (x, $x+2$, $x-2$).', '$3x^{5}-48x=3x(x^{2}+4)(x+2)(x-2)$: 3 عوامل (x و$x+2$ و$x-2$).', '$3x^{5}-48x=3x(x^{2}+4)(x+2)(x-2)$: 3 factors (x, $x+2$, $x-2$).'), answer: { expected: n(3) } },
            { id: 27, difficulty: 'medium', question: say('Zein da $2x^{3}+11x^{2}+12x$ polinomioaren erro txikiena?', '¿Cuál es la menor raíz de $2x^{3}+11x^{2}+12x$?', 'ما أصغر جذر لـ$2x^{3}+11x^{2}+12x$؟', 'What is the smallest root of $2x^{3}+11x^{2}+12x$?'), solution: say('$2x^{3}+11x^{2}+12x=x(2x+3)(x+4)$: erroak 0, $-\\frac{3}{2}$ eta $-4$.', '$2x^{3}+11x^{2}+12x=x(2x+3)(x+4)$: raíces 0, $-\\frac{3}{2}$ y $-4$.', '$2x^{3}+11x^{2}+12x=x(2x+3)(x+4)$: الجذور 0 و$-\\frac{3}{2}$ و$-4$.', '$2x^{3}+11x^{2}+12x=x(2x+3)(x+4)$: roots 0, $-\\frac{3}{2}$ and $-4$.'), answer: { expected: n(-4) } },
            { id: 28, difficulty: 'hard', question: factorize('$9x^{4}-36x^{3}+26x^{2}+4x-3$'), solution: same('$9x^{4}-36x^{3}+26x^{2}+4x-3=(x-1)(x-3)(3x+1)(3x-1)$') },
            { id: 29, difficulty: 'hard', question: say('Kalkulatu $x^{3}-7x^{2}+10x$ eta $x^{3}-5x^{2}$ polinomioen z.k.h. eta m.k.t. Zein da m.k.t.-aren maila?', 'Calcula el m.c.d. y el m.c.m. de $x^{3}-7x^{2}+10x$ y $x^{3}-5x^{2}$. ¿Cuál es el grado del m.c.m.?', 'احسب القاسم المشترك الأكبر والمضاعف المشترك الأصغر لـ$x^{3}-7x^{2}+10x$ و$x^{3}-5x^{2}$. ما درجة المضاعف؟', 'Work out the GCD and the LCM of $x^{3}-7x^{2}+10x$ and $x^{3}-5x^{2}$. What is the degree of the LCM?'), solution: say('$x(x-2)(x-5)$ eta $x^{2}(x-5)$: z.k.h. $=x(x-5)$, m.k.t. $=x^{2}(x-2)(x-5)$, 4. maila.', '$x(x-2)(x-5)$ y $x^{2}(x-5)$: m.c.d. $=x(x-5)$, m.c.m. $=x^{2}(x-2)(x-5)$, grado 4.', '$x(x-2)(x-5)$ و$x^{2}(x-5)$: القاسم $=x(x-5)$، المضاعف $=x^{2}(x-2)(x-5)$، الدرجة 4.', '$x(x-2)(x-5)$ and $x^{2}(x-5)$: GCD $=x(x-5)$, LCM $=x^{2}(x-2)(x-5)$, degree 4.'), answer: { expected: n(4) } },
            { id: 30, difficulty: 'hard', question: say('Asmatu 3. mailako polinomio bat, erroak 2, $-1$ eta 0 eta koefiziente nagusia 2 dituena. Zein da x-ren koefizientea?', 'Inventa un polinomio de grado 3 con raíces 2, $-1$ y 0 y coeficiente principal 2. ¿Cuál es el coeficiente de x?', 'كوّن حدودية من الدرجة 3 جذورها 2 و$-1$ و0 ومعاملها الرئيسي 2. ما معامل x؟', 'Make up a polynomial of degree 3 with roots 2, $-1$ and 0 and leading coefficient 2. What is the coefficient of x?'), solution: same('$2x(x-2)(x+1)=2x^{3}-2x^{2}-4x$'), answer: { expected: n(-4) } }
        ]
    },
    {
        id: 'fractions',
        title: say('Zatiki aljebraikoak', 'Fracciones algebraicas', 'الكسور الجبرية', 'Algebraic fractions'),
        items: [
            { id: 31, difficulty: 'easy', question: say('$\\frac{x+1}{2}$ zatiki aljebraikoa al da?', '¿Es $\\frac{x+1}{2}$ una fracción algebraica?', 'هل $\\frac{x+1}{2}$ كسر جبري؟', 'Is $\\frac{x+1}{2}$ an algebraic fraction?'), solution: say('Ez: izendatzaileak ez du letrarik; $\\frac{1}{2}x+\\frac{1}{2}$ polinomioa da.', 'No: el denominador no tiene letra; es el polinomio $\\frac{1}{2}x+\\frac{1}{2}$.', 'لا: لا حرف في المقام؛ إنه الحدودية $\\frac{1}{2}x+\\frac{1}{2}$.', 'No: its denominator has no letter, so it is a polynomial: $\\frac{1}{2}x+\\frac{1}{2}$.') },
            { id: 32, difficulty: 'easy', question: valueAt('$\\frac{2x-1}{x+3}$', '2'), solution: same('$\\frac{4-1}{2+3}=\\frac{3}{5}$'), answer: { expected: f(3, 5) } },
            { id: 33, difficulty: 'easy', question: say('x-ren zein baliotan ez dago $\\frac{5}{x-4}$?', '¿Para qué valor de x no existe $\\frac{5}{x-4}$?', 'عند أي قيمة لـ x لا يكون $\\frac{5}{x-4}$ معرّفًا؟', 'For which value of x does $\\frac{5}{x-4}$ not exist?'), solution: same('$x-4=0\\ \\to\\ x=4$'), answer: { expected: n(4) } },
            { id: 34, difficulty: 'medium', question: simplify('$\\frac{x^{2}+5x}{x^{2}-25}$'), solution: same('$\\frac{x(x+5)}{(x+5)(x-5)}=\\frac{x}{x-5}$') },
            { id: 35, difficulty: 'medium', question: say('Sinplifikatu $\\frac{x^{2}-6x+9}{2x-6}$ eta kalkulatu haren balioa x = 11 denean.', 'Simplifica $\\frac{x^{2}-6x+9}{2x-6}$ y calcula su valor para x = 11.', 'بسّط $\\frac{x^{2}-6x+9}{2x-6}$ واحسب قيمته عندما x = 11.', 'Simplify $\\frac{x^{2}-6x+9}{2x-6}$ and work out its value for x = 11.'), solution: same('$\\frac{(x-3)^{2}}{2(x-3)}=\\frac{x-3}{2}\\qquad \\frac{11-3}{2}=4$'), answer: { expected: n(4) } },
            { id: 36, difficulty: 'medium', question: say('Baliokideak dira $\\frac{x}{x+1}$ eta $\\frac{x^{2}-x}{x^{2}-1}$?', '¿Son equivalentes $\\frac{x}{x+1}$ y $\\frac{x^{2}-x}{x^{2}-1}$?', 'هل $\\frac{x}{x+1}$ و$\\frac{x^{2}-x}{x^{2}-1}$ متكافئان؟', 'Are $\\frac{x}{x+1}$ and $\\frac{x^{2}-x}{x^{2}-1}$ equivalent?'), solution: say('Bai: $x(x^{2}-1)=(x+1)(x^{2}-x)$.', 'Sí: $x(x^{2}-1)=(x+1)(x^{2}-x)$.', 'نعم: $x(x^{2}-1)=(x+1)(x^{2}-x)$.', 'Yes: $x(x^{2}-1)=(x+1)(x^{2}-x)$.') },
            { id: 37, difficulty: 'medium', question: say('Osatu: $\\frac{3}{x-1}=\\frac{\\ldots}{x^{2}-1}$.', 'Completa: $\\frac{3}{x-1}=\\frac{\\ldots}{x^{2}-1}$.', 'أكمل: $\\frac{3}{x-1}=\\frac{\\ldots}{x^{2}-1}$.', 'Complete: $\\frac{3}{x-1}=\\frac{\\ldots}{x^{2}-1}$.'), solution: same('$\\frac{3(x+1)}{x^{2}-1}=\\frac{3x+3}{x^{2}-1}$') },
            { id: 38, difficulty: 'hard', question: simplify('$\\frac{x^{3}-x^{2}-x+1}{x^{2}-1}$'), solution: same('$\\frac{(x-1)^{2}(x+1)}{(x+1)(x-1)}=x-1$') },
            { id: 39, difficulty: 'hard', question: say('Sinplifikatu $\\frac{x^{3}-7x-6}{x^{2}-2x-3}$ eta kalkulatu haren balioa x = 5 denean.', 'Simplifica $\\frac{x^{3}-7x-6}{x^{2}-2x-3}$ y calcula su valor para x = 5.', 'بسّط $\\frac{x^{3}-7x-6}{x^{2}-2x-3}$ واحسب قيمته عندما x = 5.', 'Simplify $\\frac{x^{3}-7x-6}{x^{2}-2x-3}$ and work out its value for x = 5.'), solution: same('$\\frac{(x+1)(x+2)(x-3)}{(x-3)(x+1)}=x+2\\qquad 5+2=7$'), answer: { expected: n(7) } },
            { id: 40, difficulty: 'hard', question: say('x-ren zenbat baliotan ez dago $\\frac{x}{x^{3}-4x}$?', '¿En cuántos valores de x no existe $\\frac{x}{x^{3}-4x}$?', 'في كم قيمة لـ x لا يكون $\\frac{x}{x^{3}-4x}$ معرّفًا؟', 'For how many values of x does $\\frac{x}{x^{3}-4x}$ not exist?'), solution: say('$x^{3}-4x=x(x+2)(x-2)$: 0, 2 eta $-2$, 3 balio.', '$x^{3}-4x=x(x+2)(x-2)$: 0, 2 y $-2$, 3 valores.', '$x^{3}-4x=x(x+2)(x-2)$: 0 و2 و$-2$، أي 3 قيم.', '$x^{3}-4x=x(x+2)(x-2)$: 0, 2 and $-2$, 3 values.'), answer: { expected: n(3) } }
        ]
    },
    {
        id: 'operate',
        title: say('Eragiketak zatikiekin', 'Operaciones con fracciones', 'العمليات على الكسور', 'Operations with fractions'),
        items: [
            { id: 41, difficulty: 'easy', question: calc('$\\frac{2x}{x+1}+\\frac{3}{x+1}$'), solution: same('$\\frac{2x}{x+1}+\\frac{3}{x+1}=\\frac{2x+3}{x+1}$') },
            { id: 42, difficulty: 'easy', question: calc('$\\frac{x}{3}+\\frac{x}{2}$'), solution: same('$\\frac{2x+3x}{6}=\\frac{5x}{6}$') },
            { id: 43, difficulty: 'easy', question: calc('$\\frac{x}{2}\\cdot\\frac{4}{x^{2}}$'), solution: same('$\\frac{4x}{2x^{2}}=\\frac{2}{x}$') },
            { id: 44, difficulty: 'medium', question: calc('$\\frac{2}{x}+\\frac{1}{x+1}$'), solution: same('$\\frac{2(x+1)+x}{x(x+1)}=\\frac{3x+2}{x(x+1)}$') },
            { id: 45, difficulty: 'medium', question: calc('$\\frac{1}{x^{2}-1}+\\frac{1}{x-1}$'), solution: same('$\\frac{1+(x+1)}{x^{2}-1}=\\frac{x+2}{x^{2}-1}$') },
            { id: 46, difficulty: 'medium', question: calc('$\\frac{x+1}{x}-\\frac{x-1}{x+2}$'), solution: same('$\\frac{(x+1)(x+2)-x(x-1)}{x(x+2)}=\\frac{4x+2}{x(x+2)}$') },
            { id: 47, difficulty: 'medium', question: calc('$\\frac{3}{x+2}\\cdot(x^{2}-4)$'), solution: same('$\\frac{3(x+2)(x-2)}{x+2}=3(x-2)$') },
            { id: 48, difficulty: 'hard', question: calc('$\\left(1+\\frac{1}{x}\\right)\\mathbin{:}\\frac{x+1}{x^{2}}$'), solution: same('$\\frac{x+1}{x}\\cdot\\frac{x^{2}}{x+1}=x$') },
            { id: 49, difficulty: 'hard', question: say('Txorrota batek depositua x minututan betetzen du, eta beste batek 3 minutu gutxiago behar ditu. Idatzi biek minutu batean betetzen duten zatia eta kalkulatu x = 15 denean.', 'Un grifo tarda x minutos en llenar un depósito y otro tarda 3 minutos menos. Expresa la parte que llenan juntos en un minuto y calcúlala para x = 15.', 'يحتاج صنبور إلى x دقيقة لملء خزان ويحتاج آخر إلى 3 دقائق أقل. عبّر عن الجزء الذي يملآنه معًا في دقيقة واحسبه عندما x = 15.', 'One tap takes x minutes to fill a tank and another takes 3 minutes less. Write the part they fill together in one minute, and work it out for x = 15.'), solution: same('$\\frac{1}{x}+\\frac{1}{x-3}=\\frac{2x-3}{x(x-3)}\\qquad \\frac{27}{180}=\\frac{3}{20}$'), answer: { expected: f(3, 20) } },
            { id: 50, difficulty: 'hard', question: say('Auto batek 60 km egiten ditu v abiaduran eta itzulian $v+20$ abiaduran. Idatzi denbora osoa eta kalkulatu ordutan v = 60 denean.', 'Un coche recorre 60 km a velocidad v y vuelve a velocidad $v+20$. Escribe el tiempo total y calcúlalo en horas para v = 60.', 'تقطع سيارة 60 كم بسرعة v وتعود بسرعة $v+20$. اكتب الزمن الكلي واحسبه بالساعات عندما v = 60.', 'A car travels 60 km at speed v and comes back at speed $v+20$. Write the total time and work it out in hours for v = 60.'), solution: same('$\\frac{60}{v}+\\frac{60}{v+20}=\\frac{120v+1200}{v(v+20)}\\qquad 1+\\frac{60}{80}=1{,}75$'), answer: { expected: v('1,75') } }
        ]
    }
]

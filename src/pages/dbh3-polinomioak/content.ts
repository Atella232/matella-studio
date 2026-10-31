import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Polinomioak · 3. DBH — diagnostic, guided practice, exercise bank and
   challenges, after Santillana 3.º ESO unit 5 and Anaya 3.º ESO unit 5
   (the books fix the scope and the order; every number here is original).
   A polynomial is not a number, so closed questions ask for one number of
   the result: a coefficient, a value, a remainder, a root or a degree.
   ========================================================================== */

/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

/** «Formula. How much is a?» */
const howMuch = (formula: string, letter: string) => say(`${formula}. Zenbat da $${letter}$?`, `${formula}. ¿Cuánto vale $${letter}$?`, `${formula}. كم يساوي $${letter}$؟`, `${formula}. What is $${letter}$?`)
/** The coefficient of a power of x in a result */
const coefficient = (formula: string, power: string): LocalizedText => {
    const term = power === '0' ? null : power === '1' ? 'x' : `x^{${power}}`
    return term === null
        ? say(`Garatu ${formula}. Zein da gai askea?`, `Desarrolla ${formula}. ¿Cuál es el término independiente?`, `انشر ${formula}. ما الحد الثابت؟`, `Expand ${formula}. What is the constant term?`)
        : say(`Garatu ${formula}. Zein da $${term}$ gaiaren koefizientea?`, `Desarrolla ${formula}. ¿Cuál es el coeficiente de $${term}$?`, `انشر ${formula}. ما معامل $${term}$؟`, `Expand ${formula}. What is the coefficient of $${term}$?`)
}
const remainder = (formula: string) => say(`Zein da ${formula} zatiketaren hondarra?`, `¿Cuál es el resto de ${formula}?`, `ما باقي ${formula}؟`, `What is the remainder of ${formula}?`)

export const polynomialsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 6601,
        prompt: say('«Zenbaki baten bikoitza gehi 3, guztia karratura». Nola idazten da?', '«El doble de un número más 3, todo al cuadrado». ¿Cómo se escribe?', '«ضعف عدد زائد 3، والكل مربع». كيف تُكتب؟', '«Twice a number plus 3, all squared». How is it written?'),
        options: [same('$(2x+3)^{2}$'), same('$2x+3^{2}$'), same('$2(x+3)^{2}$')],
        correctIndex: 0,
        explanation: say('«Guztia» parentesi bat da: lehenik $2x+3$, eta gero karratura.', '«Todo» es un paréntesis: primero $2x+3$ y después al cuadrado.', '«الكل» قوس: أولًا $2x+3$ ثم التربيع.', '«All» means brackets: first $2x+3$, then squared.'),
        topic: 'expressions'
    },
    {
        id: 6602,
        prompt: say('Zenbat da $3x^{2}\\cdot 4x^{3}$?', '¿Cuánto es $3x^{2}\\cdot 4x^{3}$?', 'كم يساوي $3x^{2}\\cdot 4x^{3}$؟', 'What is $3x^{2}\\cdot 4x^{3}$?'),
        options: [same('$7x^{5}$'), same('$12x^{5}$'), same('$12x^{6}$')],
        correctIndex: 1,
        explanation: say('Koefizienteak biderkatu eta berretzaileak batu: $3\\cdot 4=12$ eta $2+3=5$.', 'Coeficientes se multiplican y exponentes se suman: $3\\cdot 4=12$ y $2+3=5$.', 'نضرب المعاملات ونجمع الأسس: $3\\cdot 4=12$ و$2+3=5$.', 'Multiply the coefficients and add the exponents: $3\\cdot 4=12$ and $2+3=5$.'),
        topic: 'monomials'
    },
    {
        id: 6603,
        prompt: say('$P(x)=x^{2}-2x$. Zenbat da $P(-3)$?', '$P(x)=x^{2}-2x$. ¿Cuánto vale $P(-3)$?', '$P(x)=x^{2}-2x$. كم يساوي $P(-3)$؟', '$P(x)=x^{2}-2x$. What is $P(-3)$?'),
        options: [same('$3$'), same('$-15$'), same('$15$')],
        correctIndex: 2,
        explanation: say('$(-3)^{2}-2\\cdot(-3)=9+6=15$. Negatiboa parentesi artean.', '$(-3)^{2}-2\\cdot(-3)=9+6=15$. El negativo, entre paréntesis.', '$(-3)^{2}-2\\cdot(-3)=9+6=15$. السالب بين قوسين.', '$(-3)^{2}-2\\cdot(-3)=9+6=15$. The negative number goes in brackets.'),
        topic: 'value'
    },
    {
        id: 6604,
        prompt: say('Zenbat da $(5x^{2}+x)-(2x^{2}-3x)$?', '¿Cuánto es $(5x^{2}+x)-(2x^{2}-3x)$?', 'كم يساوي $(5x^{2}+x)-(2x^{2}-3x)$؟', 'What is $(5x^{2}+x)-(2x^{2}-3x)$?'),
        options: [same('$3x^{2}-2x$'), same('$3x^{2}+4x$'), same('$7x^{2}+4x$')],
        correctIndex: 1,
        explanation: say('Kenketak bi zeinuak aldatzen ditu: $5x^{2}+x-2x^{2}+3x=3x^{2}+4x$.', 'La resta cambia los dos signos: $5x^{2}+x-2x^{2}+3x=3x^{2}+4x$.', 'الطرح يغيّر الإشارتين: $5x^{2}+x-2x^{2}+3x=3x^{2}+4x$.', 'Subtraction changes both signs: $5x^{2}+x-2x^{2}+3x=3x^{2}+4x$.'),
        topic: 'add-sub'
    },
    {
        id: 6605,
        prompt: say('Zenbat da $(x+4)^{2}$?', '¿Cuánto es $(x+4)^{2}$?', 'كم يساوي $(x+4)^{2}$؟', 'What is $(x+4)^{2}$?'),
        options: [same('$x^{2}+16$'), same('$x^{2}+8x+16$'), same('$x^{2}+4x+16$')],
        correctIndex: 1,
        explanation: say('$x^{2}+2\\cdot x\\cdot 4+16$: erdiko gaia bikoitza da.', '$x^{2}+2\\cdot x\\cdot 4+16$: el término del medio es el doble.', '$x^{2}+2\\cdot x\\cdot 4+16$: الحد الأوسط هو الضعف.', '$x^{2}+2\\cdot x\\cdot 4+16$: the middle term is twice the product.'),
        topic: 'square-sum'
    },
    {
        id: 6606,
        prompt: say('Zenbat da $(x+5)(x-5)$?', '¿Cuánto es $(x+5)(x-5)$?', 'كم يساوي $(x+5)(x-5)$؟', 'What is $(x+5)(x-5)$?'),
        options: [same('$x^{2}+25$'), same('$x^{2}-10x-25$'), same('$x^{2}-25$')],
        correctIndex: 2,
        explanation: say('Batura bider kendura: karratuen kendura, $x^{2}-25$.', 'Suma por diferencia: diferencia de cuadrados, $x^{2}-25$.', 'مجموع في فرق: فرق مربعين $x^{2}-25$.', 'Sum times difference: a difference of squares, $x^{2}-25$.'),
        topic: 'sum-diff'
    },
    {
        id: 6607,
        prompt: say('Zein da $(x^{2}+3x-1):(x-2)$ zatiketaren hondarra?', '¿Cuál es el resto de $(x^{2}+3x-1):(x-2)$?', 'ما باقي $(x^{2}+3x-1):(x-2)$؟', 'What is the remainder of $(x^{2}+3x-1):(x-2)$?'),
        options: [same('$9$'), same('$-3$'), same('$1$')],
        correctIndex: 0,
        explanation: say('Hondarraren teorema: $P(2)=4+6-1=9$. $-3$ hori $P(-2)$ da.', 'Teorema del resto: $P(2)=4+6-1=9$. El $-3$ es $P(-2)$.', 'مبرهنة الباقي: $P(2)=4+6-1=9$. و$-3$ هو $P(-2)$.', 'Remainder theorem: $P(2)=4+6-1=9$. The $-3$ is $P(-2)$.'),
        topic: 'remainder'
    },
    {
        id: 6608,
        prompt: say('Nola faktorizatzen da $x^{2}-9$?', '¿Cómo se factoriza $x^{2}-9$?', 'كيف يُحلّل $x^{2}-9$؟', 'How is $x^{2}-9$ factorised?'),
        options: [same('$(x-3)^{2}$'), same('$(x+3)(x-3)$'), same('$(x-9)(x+1)$')],
        correctIndex: 1,
        explanation: say('Karratuen kendura: $x^{2}-3^{2}=(x+3)(x-3)$.', 'Diferencia de cuadrados: $x^{2}-3^{2}=(x+3)(x-3)$.', 'فرق مربعين: $x^{2}-3^{2}=(x+3)(x-3)$.', 'A difference of squares: $x^{2}-3^{2}=(x+3)(x-3)$.'),
        topic: 'factor-identities'
    }
]

export const polynomialsPractice: PracticeItem[] = [
    /* ---------- Algebraic language ---------- */
    { id: 1, stage: 'algebra', prompt: howMuch('$a^{2}\\cdot a^{3}\\cdot a=a^{n}$', 'n'), expected: n(6), hint: say('$a=a^{1}$: batu berretzaileak.', '$a=a^{1}$: suma los exponentes.', '$a=a^{1}$: اجمع الأسس.', '$a=a^{1}$: add the exponents.'), explanation: same('$2+3+1=6$') },
    { id: 2, stage: 'algebra', prompt: coefficient('$3x^{2}-5x+2x^{2}+x$', '2'), expected: n(5), hint: say('Batu $x^{2}$ gaiak bakarrik.', 'Suma solo los términos en $x^{2}$.', 'اجمع حدود $x^{2}$ فقط.', 'Add only the $x^{2}$ terms.'), explanation: same('$3x^{2}+2x^{2}=5x^{2}$') },
    { id: 3, stage: 'algebra', prompt: howMuch('$P(x)=2x^{2}-3x+1$', 'P(2)'), expected: n(3), hint: say('Ordezkatu $x=2$.', 'Sustituye $x=2$.', 'عوّض $x=2$.', 'Substitute $x=2$.'), explanation: same('$2\\cdot 4-3\\cdot 2+1=3$') },
    { id: 4, stage: 'algebra', prompt: say('Zein da $4x^{3}y-2x^{2}+7$ polinomioaren maila?', '¿Cuál es el grado de $4x^{3}y-2x^{2}+7$?', 'ما درجة $4x^{3}y-2x^{2}+7$؟', 'What is the degree of $4x^{3}y-2x^{2}+7$?'), expected: n(4), hint: say('Monomio batean, letren berretzaileak batu.', 'En un monomio se suman los exponentes de las letras.', 'في وحيد الحد نجمع أسس الحروف.', 'In a monomial, add the exponents of the letters.'), explanation: say('$4x^{3}y$ monomioaren maila: $3+1=4$.', 'Grado de $4x^{3}y$: $3+1=4$.', 'درجة $4x^{3}y$: $3+1=4$.', 'Degree of $4x^{3}y$: $3+1=4$.') },

    /* ---------- Operations ---------- */
    { id: 5, stage: 'operations', prompt: coefficient('$(2x^{2}+3x-1)+(x^{2}-5x+4)$', '1'), expected: n(-2), hint: say('Batu $x$ gaiak.', 'Suma los términos en $x$.', 'اجمع حدود $x$.', 'Add the $x$ terms.'), explanation: same('$3x-5x=-2x$') },
    { id: 6, stage: 'operations', prompt: coefficient('$(x+4)(x-2)$', '0'), expected: n(-8), hint: say('Gai askea: azkenak bider azkena.', 'Término independiente: último por último.', 'الحد الثابت: الأخير في الأخير.', 'Constant term: last times last.'), explanation: same('$4\\cdot(-2)=-8$') },
    { id: 7, stage: 'operations', prompt: coefficient('$(x-3)(2x+5)$', '1'), expected: n(-1), hint: say('Lau biderkadura: $x$ gaiak bi dira.', 'Cuatro productos: hay dos términos en $x$.', 'أربعة حواصل: هناك حدّان في $x$.', 'Four products: there are two $x$ terms.'), explanation: same('$2x^{2}+5x-6x-15=2x^{2}-x-15$') },
    { id: 8, stage: 'operations', prompt: remainder('$(x^{2}+7x+12):(x+2)$'), expected: n(2), hint: say('Zatitu edo erabili hondarraren teorema.', 'Divide o usa el teorema del resto.', 'اقسم أو استعمل مبرهنة الباقي.', 'Divide, or use the remainder theorem.'), explanation: same('$x^{2}+7x+12=(x+2)(x+5)+2$') },

    /* ---------- Special products ---------- */
    { id: 9, stage: 'identities', prompt: coefficient('$(x+6)^{2}$', '1'), expected: n(12), hint: say('Bikoitza bider lehenengoa bider bigarrena.', 'El doble del primero por el segundo.', 'ضعف الأول في الثاني.', 'Twice the first times the second.'), explanation: same('$2\\cdot 6=12$') },
    { id: 10, stage: 'identities', prompt: coefficient('$(3x-2)^{2}$', '1'), expected: n(-12), hint: say('Kendura: erdiko gaia negatiboa.', 'Diferencia: el término del medio es negativo.', 'فرق: الحد الأوسط سالب.', 'Difference: the middle term is negative.'), explanation: same('$-2\\cdot 3\\cdot 2=-12$') },
    { id: 11, stage: 'identities', prompt: say('Kalkulatu $31\\cdot 29$ batura bider kendura erabiliz.', 'Calcula $31\\cdot 29$ con suma por diferencia.', 'احسب $31\\cdot 29$ باستعمال مجموع في فرق.', 'Work out $31\\cdot 29$ using sum times difference.'), expected: n(899), hint: say('$31=30+1$ eta $29=30-1$.', '$31=30+1$ y $29=30-1$.', '$31=30+1$ و$29=30-1$.', '$31=30+1$ and $29=30-1$.'), explanation: same('$(30+1)(30-1)=900-1=899$') },
    { id: 12, stage: 'identities', prompt: coefficient('$(2x+5)(2x-5)$', '0'), expected: n(-25), hint: say('Karratuen kendura.', 'Diferencia de cuadrados.', 'فرق مربعين.', 'Difference of squares.'), explanation: same('$4x^{2}-25$') },

    /* ---------- Ruffini and roots ---------- */
    { id: 13, stage: 'ruffini', prompt: remainder('$(x^{3}-2x^{2}+3x-4):(x-2)$'), expected: n(2), hint: say('Kalkulatu $P(2)$.', 'Calcula $P(2)$.', 'احسب $P(2)$.', 'Work out $P(2)$.'), explanation: same('$8-8+6-4=2$') },
    { id: 14, stage: 'ruffini', prompt: remainder('$(2x^{3}+x^{2}-5):(x+1)$'), expected: n(-6), hint: say('$x+1$ bada, $a=-1$.', 'Si es $x+1$, $a=-1$.', 'إذا كان $x+1$ فإن $a=-1$.', 'If it is $x+1$, $a=-1$.'), explanation: same('$P(-1)=-2+1-5=-6$') },
    { id: 15, stage: 'ruffini', prompt: say('$x^{2}+kx+6$ polinomioak $x=2$ erroa du. Zenbat da $k$?', 'El polinomio $x^{2}+kx+6$ tiene la raíz $x=2$. ¿Cuánto vale $k$?', 'لكثير الحدود $x^{2}+kx+6$ الجذر $x=2$. كم يساوي $k$؟', 'The polynomial $x^{2}+kx+6$ has the root $x=2$. What is $k$?'), expected: n(-5), hint: say('$P(2)=0$.', '$P(2)=0$.', '$P(2)=0$.', '$P(2)=0$.'), explanation: same('$4+2k+6=0\\ \\to\\ k=-5$') },
    { id: 16, stage: 'ruffini', prompt: say('Zein da $x^{2}-x-12$ polinomioaren erro positiboa?', '¿Cuál es la raíz positiva de $x^{2}-x-12$?', 'ما الجذر الموجب لـ $x^{2}-x-12$؟', 'What is the positive root of $x^{2}-x-12$?'), expected: n(4), hint: say('Probatu 12 zenbakiaren zatitzaileak.', 'Prueba los divisores de 12.', 'جرّب قواسم 12.', 'Try the divisors of 12.'), explanation: same('$16-4-12=0$') },

    /* ---------- Factorisation ---------- */
    { id: 17, stage: 'factor', prompt: howMuch('$15x^{3}+10x^{2}=a\\,x^{2}(3x+2)$', 'a'), expected: n(5), hint: say('15 eta 10 zenbakien z.k.h.', 'El m.c.d. de 15 y 10.', 'ق.م.أ للعددين 15 و10.', 'The HCF of 15 and 10.'), explanation: same('$15x^{3}+10x^{2}=5x^{2}(3x+2)$') },
    { id: 18, stage: 'factor', prompt: howMuch('$x^{2}-49=(x+a)(x-a)$', 'a'), expected: n(7), hint: say('$49$ karratu bat da.', '$49$ es un cuadrado.', '$49$ مربع.', '$49$ is a square.'), explanation: same('$49=7^{2}$') },
    { id: 19, stage: 'factor', prompt: howMuch('$x^{2}+8x+16=(x+a)^{2}$', 'a'), expected: n(4), hint: say('$16=a^{2}$ eta $8=2a$.', '$16=a^{2}$ y $8=2a$.', '$16=a^{2}$ و$8=2a$.', '$16=a^{2}$ and $8=2a$.'), explanation: same('$(x+4)^{2}=x^{2}+8x+16$') },
    { id: 20, stage: 'factor', prompt: say('Sinplifikatu $\\frac{x^{2}-9}{x+3}$ eta kalkulatu haren balioa $x=10$ denean.', 'Simplifica $\\frac{x^{2}-9}{x+3}$ y calcula su valor para $x=10$.', 'بسّط $\\frac{x^{2}-9}{x+3}$ واحسب قيمته عندما $x=10$.', 'Simplify $\\frac{x^{2}-9}{x+3}$ and work out its value when $x=10$.'), expected: n(7), hint: say('$x^{2}-9=(x+3)(x-3)$.', '$x^{2}-9=(x+3)(x-3)$.', '$x^{2}-9=(x+3)(x-3)$.', '$x^{2}-9=(x+3)(x-3)$.'), explanation: same('$\\frac{(x+3)(x-3)}{x+3}=x-3\\ \\to\\ 10-3=7$') }
]

export const polynomialsChallenges: ChallengeItem[] = [
    { id: 101, stage: 'algebra', points: 10, context: 'starter', prompt: say('Laukizuzen batek $x$ eta $x+3$ aldeak ditu. Perimetroa $4x+6$ da. Zenbat da $x=5$ denean?', 'Un rectángulo tiene lados $x$ y $x+3$. Su perímetro es $4x+6$. ¿Cuánto vale para $x=5$?', 'لمستطيل ضلعان $x$ و$x+3$. محيطه $4x+6$. كم يساوي عندما $x=5$؟', 'A rectangle has sides $x$ and $x+3$. Its perimeter is $4x+6$. What is it when $x=5$?'), expected: n(26), hint: say('Ordezkatu $x=5$.', 'Sustituye $x=5$.', 'عوّض $x=5$.', 'Substitute $x=5$.'), explanation: same('$4\\cdot 5+6=26$') },
    { id: 102, stage: 'algebra', points: 20, context: 'advanced', prompt: coefficient('$2x(3x-1)-3x(2x+4)$', '1'), expected: n(-14), hint: say('Garatu bi biderketak eta laburtu.', 'Desarrolla los dos productos y reduce.', 'انشر الحاصلين واختصر.', 'Expand both products and collect like terms.'), explanation: same('$6x^{2}-2x-6x^{2}-12x=-14x$') },
    { id: 103, stage: 'algebra', points: 30, context: 'master', prompt: say('$P(x)=x^{3}-4x+k$ eta $P(2)=5$. Zenbat da $k$?', '$P(x)=x^{3}-4x+k$ y $P(2)=5$. ¿Cuánto vale $k$?', '$P(x)=x^{3}-4x+k$ و$P(2)=5$. كم يساوي $k$؟', '$P(x)=x^{3}-4x+k$ and $P(2)=5$. What is $k$?'), expected: n(5), hint: say('Ordezkatu eta berdindu bost zenbakiari.', 'Sustituye e iguala a 5.', 'عوّض وساوِ بـ 5.', 'Substitute and set it equal to 5.'), explanation: same('$8-8+k=5\\ \\to\\ k=5$') },
    { id: 104, stage: 'operations', points: 10, context: 'starter', prompt: coefficient('$(x+2)(x^{2}-x+3)$', '1'), expected: n(1), hint: say('$x$ gaiak: $3x$ eta $-2x$.', 'Términos en $x$: $3x$ y $-2x$.', 'حدود $x$: $3x$ و$-2x$.', 'The $x$ terms: $3x$ and $-2x$.'), explanation: same('$x^{3}-x^{2}+3x+2x^{2}-2x+6=x^{3}+x^{2}+x+6\\quad 3-2=1$') },
    { id: 105, stage: 'operations', points: 20, context: 'advanced', prompt: say('$(x^{3}+2x^{2}-x+4):(x^{2}+1)$. Zein da zatiduraren gai askea?', '$(x^{3}+2x^{2}-x+4):(x^{2}+1)$. ¿Cuál es el término independiente del cociente?', '$(x^{3}+2x^{2}-x+4):(x^{2}+1)$. ما الحد الثابت في الخارج؟', '$(x^{3}+2x^{2}-x+4):(x^{2}+1)$. What is the constant term of the quotient?'), expected: n(2), hint: say('Lehenengo urratsa: $x^{3}:x^{2}=x$.', 'Primer paso: $x^{3}:x^{2}=x$.', 'الخطوة الأولى: $x^{3}:x^{2}=x$.', 'First step: $x^{3}:x^{2}=x$.'), explanation: same('$C=x+2,\\ R=-2x+2$') },
    { id: 106, stage: 'operations', points: 30, context: 'master', prompt: say('Laukizuzen batek $2x+3$ eta $x-1$ aldeak ditu. Haren azalera $ax^{2}+bx+c$ da. Zenbat da $b$?', 'Un rectángulo tiene lados $2x+3$ y $x-1$. Su área es $ax^{2}+bx+c$. ¿Cuánto vale $b$?', 'لمستطيل ضلعان $2x+3$ و$x-1$. مساحته $ax^{2}+bx+c$. كم يساوي $b$؟', 'A rectangle has sides $2x+3$ and $x-1$. Its area is $ax^{2}+bx+c$. What is $b$?'), expected: n(1), hint: say('Garatu $(2x+3)(x-1)$.', 'Desarrolla $(2x+3)(x-1)$.', 'انشر $(2x+3)(x-1)$.', 'Expand $(2x+3)(x-1)$.'), explanation: same('$2x^{2}-2x+3x-3=2x^{2}+x-3\\quad -2+3=1$') },
    { id: 107, stage: 'identities', points: 10, context: 'starter', prompt: say('Kalkulatu $101^{2}$ identitate bat erabiliz.', 'Calcula $101^{2}$ usando una identidad.', 'احسب $101^{2}$ باستعمال متطابقة.', 'Work out $101^{2}$ using a special product.'), expected: n(10201), hint: say('$101=100+1$.', '$101=100+1$.', '$101=100+1$.', '$101=100+1$.'), explanation: same('$(100+1)^{2}=10\\,000+200+1=10\\,201$') },
    { id: 108, stage: 'identities', points: 20, context: 'advanced', prompt: howMuch('$(x+a)^{2}=x^{2}+14x+49$', 'a'), expected: n(7), hint: say('$2a=14$.', '$2a=14$.', '$2a=14$.', '$2a=14$.'), explanation: same('$2\\cdot 7=14\\quad 7^{2}=49$') },
    { id: 109, stage: 'identities', points: 30, context: 'master', prompt: coefficient('$(x+3)^{2}-(x-3)^{2}$', '1'), expected: n(12), hint: say('Bi karratuak garatu eta kendu.', 'Desarrolla los dos cuadrados y resta.', 'انشر المربعين واطرح.', 'Expand both squares and subtract.'), explanation: same('$(x^{2}+6x+9)-(x^{2}-6x+9)=12x$') },
    { id: 110, stage: 'ruffini', points: 10, context: 'starter', prompt: remainder('$(x^{4}-1):(x+1)$'), expected: n(0), hint: say('$P(-1)$.', '$P(-1)$.', '$P(-1)$.', '$P(-1)$.'), explanation: same('$(-1)^{4}-1=0$') },
    { id: 111, stage: 'ruffini', points: 20, context: 'advanced', prompt: say('$x^{3}+kx^{2}-4$ zatigarria da $x-2$ binomioaz. Zenbat da $k$?', '$x^{3}+kx^{2}-4$ es divisible entre $x-2$. ¿Cuánto vale $k$?', '$x^{3}+kx^{2}-4$ يقبل القسمة على $x-2$. كم يساوي $k$؟', '$x^{3}+kx^{2}-4$ is divisible by $x-2$. What is $k$?'), expected: n(-1), hint: say('$P(2)=0$.', '$P(2)=0$.', '$P(2)=0$.', '$P(2)=0$.'), explanation: same('$8+4k-4=0\\ \\to\\ k=-1$') },
    { id: 112, stage: 'ruffini', points: 30, context: 'master', prompt: say('Zein da $x^{3}-2x^{2}-5x+6$ polinomioaren erro handiena?', '¿Cuál es la mayor raíz de $x^{3}-2x^{2}-5x+6$?', 'ما أكبر جذر لـ $x^{3}-2x^{2}-5x+6$؟', 'What is the largest root of $x^{3}-2x^{2}-5x+6$?'), expected: n(3), hint: say('Probatu 6 zenbakiaren zatitzaileak.', 'Prueba los divisores de 6.', 'جرّب قواسم 6.', 'Try the divisors of 6.'), explanation: same('$P(1)=0\\quad P(-2)=0\\quad P(3)=27-18-15+6=0$') },
    { id: 113, stage: 'factor', points: 10, context: 'starter', prompt: howMuch('$6x^{2}-9x=3x(ax-3)$', 'a'), expected: n(2), hint: say('$6x^{2}:3x$.', '$6x^{2}:3x$.', '$6x^{2}:3x$.', '$6x^{2}:3x$.'), explanation: same('$6x^{2}-9x=3x(2x-3)$') },
    { id: 114, stage: 'factor', points: 20, context: 'advanced', prompt: say('$x^{2}-7x+12=(x-a)(x-b)$ eta $a<b$. Zenbat da $b$?', '$x^{2}-7x+12=(x-a)(x-b)$ con $a<b$. ¿Cuánto vale $b$?', '$x^{2}-7x+12=(x-a)(x-b)$ مع $a<b$. كم يساوي $b$؟', '$x^{2}-7x+12=(x-a)(x-b)$ with $a<b$. What is $b$?'), expected: n(4), hint: say('Erroak: biderkadura 12, batura 7.', 'Raíces: producto 12, suma 7.', 'الجذران: حاصل ضربهما 12 ومجموعهما 7.', 'Roots: product 12, sum 7.'), explanation: same('$(x-3)(x-4)=x^{2}-7x+12$') },
    { id: 115, stage: 'factor', points: 30, context: 'master', prompt: say('Sinplifikatu $\\frac{x^{2}-4x+4}{x^{2}-4}$ eta kalkulatu haren balioa $x=6$ denean.', 'Simplifica $\\frac{x^{2}-4x+4}{x^{2}-4}$ y calcula su valor para $x=6$.', 'بسّط $\\frac{x^{2}-4x+4}{x^{2}-4}$ واحسب قيمته عندما $x=6$.', 'Simplify $\\frac{x^{2}-4x+4}{x^{2}-4}$ and work out its value when $x=6$.'), expected: v('0,5'), hint: say('Goian $(x-2)^{2}$, behean $(x+2)(x-2)$.', 'Arriba $(x-2)^{2}$, abajo $(x+2)(x-2)$.', 'في الأعلى $(x-2)^{2}$ وفي الأسفل $(x+2)(x-2)$.', 'On top $(x-2)^{2}$, at the bottom $(x+2)(x-2)$.'), explanation: same('$\\frac{x-2}{x+2}\\ \\to\\ \\frac{4}{8}=0{,}5$') }
]

export const polynomialsExerciseBank: ExerciseSection[] = [
    {
        id: 'algebra',
        title: say('Hizkuntza aljebraikoa', 'Lenguaje algebraico', 'اللغة الجبرية', 'Algebraic language'),
        items: [
            { id: 1, difficulty: 'easy', question: say('«$x$ zenbakiaren hirukoitza ken 4». Zenbat da $x=6$ denean?', '«El triple de $x$ menos 4». ¿Cuánto vale si $x=6$?', '«ثلاثة أمثال $x$ ناقص 4». كم تساوي عندما $x=6$؟', '«Three times $x$ minus 4». What is it when $x=6$?'), solution: same('$3\\cdot 6-4=14$'), answer: { expected: n(14) } },
            { id: 2, difficulty: 'easy', question: say('Zein da $5x^{4}-3x^{2}+1$ polinomioaren maila?', '¿Cuál es el grado de $5x^{4}-3x^{2}+1$?', 'ما درجة $5x^{4}-3x^{2}+1$؟', 'What is the degree of $5x^{4}-3x^{2}+1$?'), solution: say('Berretzaile handiena 4 da.', 'El mayor exponente es 4.', 'أكبر أس هو 4.', 'The highest exponent is 4.'), answer: { expected: n(4) } },
            { id: 3, difficulty: 'easy', question: howMuch('$P(x)=3x-7$', 'P(5)'), solution: same('$3\\cdot 5-7=8$'), answer: { expected: n(8) } },
            { id: 4, difficulty: 'easy', question: say('Zein da $-2x^{3}\\cdot 5x^{2}$ biderkaduraren koefizientea?', '¿Cuál es el coeficiente de $-2x^{3}\\cdot 5x^{2}$?', 'ما معامل $-2x^{3}\\cdot 5x^{2}$؟', 'What is the coefficient of $-2x^{3}\\cdot 5x^{2}$?'), solution: same('$-2\\cdot 5=-10$'), answer: { expected: n(-10) } },
            { id: 5, difficulty: 'medium', question: coefficient('$4x^{2}-6x+x^{2}+2x-3$', '1'), solution: same('$-6x+2x=-4x$'), answer: { expected: n(-4) } },
            { id: 6, difficulty: 'medium', question: howMuch('$P(x)=x^{2}+x-2$', 'P(-3)'), solution: same('$9-3-2=4$'), answer: { expected: n(4) } },
            { id: 7, difficulty: 'medium', question: say('$12x^{5}:4x^{2}=a\\,x^{3}$. Zenbat da $a$?', '$12x^{5}:4x^{2}=a\\,x^{3}$. ¿Cuánto vale $a$?', '$12x^{5}:4x^{2}=a\\,x^{3}$. كم يساوي $a$؟', '$12x^{5}:4x^{2}=a\\,x^{3}$. What is $a$?'), solution: same('$12\\mathbin{:}4=3$'), answer: { expected: n(3) } },
            { id: 8, difficulty: 'medium', question: say('Hiru zenbaki jarraien batura $x+(x+1)+(x+2)$ da. Zenbat da $x=10$ denean?', 'La suma de tres números consecutivos es $x+(x+1)+(x+2)$. ¿Cuánto vale si $x=10$?', 'مجموع ثلاثة أعداد متتالية $x+(x+1)+(x+2)$. كم يساوي عندما $x=10$؟', 'The sum of three consecutive numbers is $x+(x+1)+(x+2)$. What is it when $x=10$?'), solution: same('$3\\cdot 10+3=33$'), answer: { expected: n(33) } },
            { id: 9, difficulty: 'hard', question: say('$P(x)=ax^{2}+3x-1$ eta $P(2)=13$. Zenbat da $a$?', '$P(x)=ax^{2}+3x-1$ y $P(2)=13$. ¿Cuánto vale $a$?', '$P(x)=ax^{2}+3x-1$ و$P(2)=13$. كم يساوي $a$؟', '$P(x)=ax^{2}+3x-1$ and $P(2)=13$. What is $a$?'), solution: same('$4a+6-1=13\\ \\to\\ a=2$'), answer: { expected: n(2) } },
            { id: 10, difficulty: 'hard', question: say('Zein da $(x^{3}+1)(x^{2}-2x)$ biderkaduraren maila?', '¿Cuál es el grado del producto $(x^{3}+1)(x^{2}-2x)$?', 'ما درجة الحاصل $(x^{3}+1)(x^{2}-2x)$؟', 'What is the degree of the product $(x^{3}+1)(x^{2}-2x)$?'), solution: say('Mailak batu egiten dira: $3+2=5$.', 'Los grados se suman: $3+2=5$.', 'تُجمع الدرجات: $3+2=5$.', 'The degrees add: $3+2=5$.'), answer: { expected: n(5) } }
        ]
    },
    {
        id: 'operations',
        title: say('Eragiketak', 'Operaciones', 'العمليات', 'Operations'),
        items: [
            { id: 11, difficulty: 'easy', question: coefficient('$(3x^{2}-x+2)+(x^{2}+4x-5)$', '2'), solution: same('$3x^{2}+x^{2}=4x^{2}$'), answer: { expected: n(4) } },
            { id: 12, difficulty: 'easy', question: coefficient('$(5x^{2}+2)-(2x^{2}-3)$', '0'), solution: same('$2+3=5$'), answer: { expected: n(5) } },
            { id: 13, difficulty: 'easy', question: coefficient('$2x(x^{2}-3x+4)$', '2'), solution: same('$2x^{3}-6x^{2}+8x$'), answer: { expected: n(-6) } },
            { id: 14, difficulty: 'easy', question: coefficient('$(x+1)(x+6)$', '1'), solution: same('$x^{2}+6x+x+6=x^{2}+7x+6$'), answer: { expected: n(7) } },
            { id: 15, difficulty: 'medium', question: coefficient('$(2x-3)(x+4)$', '0'), solution: same('$-3\\cdot 4=-12$'), answer: { expected: n(-12) } },
            { id: 16, difficulty: 'medium', question: coefficient('$(x^{2}+x-1)(x-2)$', '1'), solution: same('$x^{3}-2x^{2}+x^{2}-2x-x+2=x^{3}-x^{2}-3x+2$'), answer: { expected: n(-3) } },
            { id: 17, difficulty: 'medium', question: remainder('$(x^{2}-5x+8):(x-2)$'), solution: same('$4-10+8=2$'), answer: { expected: n(2) } },
            { id: 18, difficulty: 'medium', question: say('$(6x^{3}-4x^{2}):(2x)$. Zein da $x$ gaiaren koefizientea?', '$(6x^{3}-4x^{2}):(2x)$. ¿Cuál es el coeficiente de $x$?', '$(6x^{3}-4x^{2}):(2x)$. ما معامل $x$؟', '$(6x^{3}-4x^{2}):(2x)$. What is the coefficient of $x$?'), solution: same('$3x^{2}-2x$'), answer: { expected: n(-2) } },
            { id: 19, difficulty: 'hard', question: say('$(x^{3}-1):(x-1)$. Zenbat da zatiduraren koefizienteen batura?', '$(x^{3}-1):(x-1)$. ¿Cuánto suman los coeficientes del cociente?', '$(x^{3}-1):(x-1)$. كم مجموع معاملات الخارج؟', '$(x^{3}-1):(x-1)$. What do the coefficients of the quotient add up to?'), solution: same('$C=x^{2}+x+1\\ \\to\\ 1+1+1=3$'), answer: { expected: n(3) } },
            { id: 20, difficulty: 'hard', question: say('$(2x^{3}+3x^{2}-x+5):(x^{2}+x)$. Zein da hondarraren gai askea?', '$(2x^{3}+3x^{2}-x+5):(x^{2}+x)$. ¿Cuál es el término independiente del resto?', '$(2x^{3}+3x^{2}-x+5):(x^{2}+x)$. ما الحد الثابت في الباقي؟', '$(2x^{3}+3x^{2}-x+5):(x^{2}+x)$. What is the constant term of the remainder?'), solution: same('$C=2x+1,\\ R=-2x+5$'), answer: { expected: n(5) } }
        ]
    },
    {
        id: 'identities',
        title: say('Identitate nabarmenak', 'Identidades notables', 'المتطابقات الشهيرة', 'Special products'),
        items: [
            { id: 21, difficulty: 'easy', question: coefficient('$(x+3)^{2}$', '1'), solution: same('$x^{2}+6x+9$'), answer: { expected: n(6) } },
            { id: 22, difficulty: 'easy', question: coefficient('$(x-7)^{2}$', '0'), solution: same('$x^{2}-14x+49$'), answer: { expected: n(49) } },
            { id: 23, difficulty: 'easy', question: coefficient('$(x+8)(x-8)$', '0'), solution: same('$x^{2}-64$'), answer: { expected: n(-64) } },
            { id: 24, difficulty: 'easy', question: say('Kalkulatu $51^{2}$ identitate batekin.', 'Calcula $51^{2}$ con una identidad.', 'احسب $51^{2}$ بمتطابقة.', 'Work out $51^{2}$ with a special product.'), solution: same('$(50+1)^{2}=2500+100+1=2601$'), answer: { expected: n(2601) } },
            { id: 25, difficulty: 'medium', question: coefficient('$(2x+3)^{2}$', '1'), solution: same('$4x^{2}+12x+9$'), answer: { expected: n(12) } },
            { id: 26, difficulty: 'medium', question: coefficient('$(5x-1)^{2}$', '2'), solution: same('$25x^{2}-10x+1$'), answer: { expected: n(25) } },
            { id: 27, difficulty: 'medium', question: say('Kalkulatu $48\\cdot 52$ identitate batekin.', 'Calcula $48\\cdot 52$ con una identidad.', 'احسب $48\\cdot 52$ بمتطابقة.', 'Work out $48\\cdot 52$ with a special product.'), solution: same('$(50-2)(50+2)=2500-4=2496$'), answer: { expected: n(2496) } },
            { id: 28, difficulty: 'medium', question: howMuch('$(x+a)^{2}=x^{2}+18x+81$', 'a'), solution: same('$2\\cdot 9=18\\quad 9^{2}=81$'), answer: { expected: n(9) } },
            { id: 29, difficulty: 'hard', question: coefficient('$(x+2)^{2}-(x+2)(x-2)$', '1'), solution: same('$(x^{2}+4x+4)-(x^{2}-4)=4x+8$'), answer: { expected: n(4) } },
            { id: 30, difficulty: 'hard', question: say('$a+b=7$ eta $ab=10$. Zenbat da $a^{2}+b^{2}$?', '$a+b=7$ y $ab=10$. ¿Cuánto vale $a^{2}+b^{2}$?', '$a+b=7$ و$ab=10$. كم يساوي $a^{2}+b^{2}$؟', '$a+b=7$ and $ab=10$. What is $a^{2}+b^{2}$?'), solution: same('$(a+b)^{2}-2ab=49-20=29$'), answer: { expected: n(29) } }
        ]
    },
    {
        id: 'ruffini',
        title: say('Ruffini eta erroak', 'Ruffini y raíces', 'روفيني والجذور', 'Ruffini and roots'),
        items: [
            { id: 31, difficulty: 'easy', question: remainder('$(x^{2}+4x+1):(x-1)$'), solution: same('$P(1)=1+4+1=6$'), answer: { expected: n(6) } },
            { id: 32, difficulty: 'easy', question: remainder('$(x^{3}-8):(x-2)$'), solution: same('$P(2)=8-8=0$'), answer: { expected: n(0) } },
            { id: 33, difficulty: 'easy', question: howMuch('$P(x)=x^{2}-6x+9$', 'P(3)'), solution: same('$9-18+9=0$'), answer: { expected: n(0) } },
            { id: 34, difficulty: 'easy', question: say('$(x^{2}+5x+6):(x+2)$ Ruffinirekin. Zein da zatiduraren gai askea?', '$(x^{2}+5x+6):(x+2)$ con Ruffini. ¿Cuál es el término independiente del cociente?', '$(x^{2}+5x+6):(x+2)$ بروفيني. ما الحد الثابت في الخارج؟', '$(x^{2}+5x+6):(x+2)$ with Ruffini. What is the constant term of the quotient?'), solution: same('$C=x+3,\\ R=0$'), answer: { expected: n(3) } },
            { id: 35, difficulty: 'medium', question: remainder('$(2x^{3}-x+3):(x+2)$'), solution: same('$P(-2)=-16+2+3=-11$'), answer: { expected: n(-11) } },
            { id: 36, difficulty: 'medium', question: say('$(x^{3}+2x^{2}-5x-6):(x-2)$ Ruffinirekin. Zein da zatiduraren $x$ gaiaren koefizientea?', '$(x^{3}+2x^{2}-5x-6):(x-2)$ con Ruffini. ¿Cuál es el coeficiente de $x$ en el cociente?', '$(x^{3}+2x^{2}-5x-6):(x-2)$ بروفيني. ما معامل $x$ في الخارج؟', '$(x^{3}+2x^{2}-5x-6):(x-2)$ with Ruffini. What is the coefficient of $x$ in the quotient?'), solution: same('$C=x^{2}+4x+3,\\ R=0$'), answer: { expected: n(4) } },
            { id: 37, difficulty: 'medium', question: say('Zenbat erro oso ditu $x^{2}-5x+6$ polinomioak?', '¿Cuántas raíces enteras tiene $x^{2}-5x+6$?', 'كم جذرًا صحيحًا لـ $x^{2}-5x+6$؟', 'How many whole-number roots does $x^{2}-5x+6$ have?'), solution: same('$P(2)=0\\quad P(3)=0$'), answer: { expected: n(2) } },
            { id: 38, difficulty: 'medium', question: say('$x^{2}+kx-10$ polinomioak $x=5$ erroa du. Zenbat da $k$?', '$x^{2}+kx-10$ tiene la raíz $x=5$. ¿Cuánto vale $k$?', 'لـ $x^{2}+kx-10$ الجذر $x=5$. كم يساوي $k$؟', '$x^{2}+kx-10$ has the root $x=5$. What is $k$?'), solution: same('$25+5k-10=0\\ \\to\\ k=-3$'), answer: { expected: n(-3) } },
            { id: 39, difficulty: 'hard', question: say('Zenbat da $x^{3}-6x^{2}+11x-6$ polinomioaren erroen batura?', '¿Cuánto suman las raíces de $x^{3}-6x^{2}+11x-6$?', 'كم مجموع جذور $x^{3}-6x^{2}+11x-6$؟', 'What do the roots of $x^{3}-6x^{2}+11x-6$ add up to?'), solution: same('$P(1)=P(2)=P(3)=0\\ \\to\\ 1+2+3=6$'), answer: { expected: n(6) } },
            { id: 40, difficulty: 'hard', question: say('$(x^{3}-3x+k):(x+2)$ zatiketaren hondarra 4 da. Zenbat da $k$?', 'El resto de $(x^{3}-3x+k):(x+2)$ es 4. ¿Cuánto vale $k$?', 'باقي $(x^{3}-3x+k):(x+2)$ يساوي 4. كم يساوي $k$؟', 'The remainder of $(x^{3}-3x+k):(x+2)$ is 4. What is $k$?'), solution: same('$-8+6+k=4\\ \\to\\ k=6$'), answer: { expected: n(6) } }
        ]
    },
    {
        id: 'factor',
        title: say('Faktorizazioa', 'Factorización', 'التحليل', 'Factorisation'),
        items: [
            { id: 41, difficulty: 'easy', question: howMuch('$7x^{2}+14x=7x(x+a)$', 'a'), solution: same('$14x\\mathbin{:}7x=2$'), answer: { expected: n(2) } },
            { id: 42, difficulty: 'easy', question: howMuch('$x^{2}-36=(x+a)(x-a)$', 'a'), solution: same('$36=6^{2}$'), answer: { expected: n(6) } },
            { id: 43, difficulty: 'easy', question: howMuch('$x^{2}+10x+25=(x+a)^{2}$', 'a'), solution: same('$(x+5)^{2}=x^{2}+10x+25$'), answer: { expected: n(5) } },
            { id: 44, difficulty: 'easy', question: howMuch('$x^{2}-4x+4=(x-a)^{2}$', 'a'), solution: same('$(x-2)^{2}=x^{2}-4x+4$'), answer: { expected: n(2) } },
            { id: 45, difficulty: 'medium', question: howMuch('$3x^{2}-12=3(x+a)(x-a)$', 'a'), solution: same('$3(x^{2}-4)=3(x+2)(x-2)$'), answer: { expected: n(2) } },
            { id: 46, difficulty: 'medium', question: say('$x^{2}+7x+10=(x+a)(x+b)$ eta $a<b$. Zenbat da $b$?', '$x^{2}+7x+10=(x+a)(x+b)$ con $a<b$. ¿Cuánto vale $b$?', '$x^{2}+7x+10=(x+a)(x+b)$ مع $a<b$. كم يساوي $b$؟', '$x^{2}+7x+10=(x+a)(x+b)$ with $a<b$. What is $b$?'), solution: same('$(x+2)(x+5)=x^{2}+7x+10$'), answer: { expected: n(5) } },
            { id: 47, difficulty: 'medium', question: say('Zenbat erro ditu $x^{3}-x$ polinomioak?', '¿Cuántas raíces tiene $x^{3}-x$?', 'كم جذرًا لـ $x^{3}-x$؟', 'How many roots does $x^{3}-x$ have?'), solution: say('$x(x+1)(x-1)$: erroak $0$, $-1$ eta $1$; guztira $3$.', '$x(x+1)(x-1)$: raíces $0$, $-1$ y $1$; en total $3$.', '$x(x+1)(x-1)$: الجذور $0$ و$-1$ و$1$؛ أي $3$.', '$x(x+1)(x-1)$: roots $0$, $-1$ and $1$; $3$ in total.'), answer: { expected: n(3) } },
            { id: 48, difficulty: 'medium', question: say('Sinplifikatu $\\frac{x^{2}+3x}{x}$ eta kalkulatu haren balioa $x=4$ denean.', 'Simplifica $\\frac{x^{2}+3x}{x}$ y calcula su valor para $x=4$.', 'بسّط $\\frac{x^{2}+3x}{x}$ واحسب قيمته عندما $x=4$.', 'Simplify $\\frac{x^{2}+3x}{x}$ and work out its value when $x=4$.'), solution: same('$\\frac{x(x+3)}{x}=x+3\\ \\to\\ 4+3=7$'), answer: { expected: n(7) } },
            { id: 49, difficulty: 'hard', question: say('Sinplifikatu $\\frac{x^{2}-1}{x^{2}+2x+1}$ eta kalkulatu haren balioa $x=3$ denean.', 'Simplifica $\\frac{x^{2}-1}{x^{2}+2x+1}$ y calcula su valor para $x=3$.', 'بسّط $\\frac{x^{2}-1}{x^{2}+2x+1}$ واحسب قيمته عندما $x=3$.', 'Simplify $\\frac{x^{2}-1}{x^{2}+2x+1}$ and work out its value when $x=3$.'), solution: same('$\\frac{(x+1)(x-1)}{(x+1)^{2}}=\\frac{x-1}{x+1}\\ \\to\\ \\frac{2}{4}=0{,}5$'), answer: { expected: v('0,5') } },
            { id: 50, difficulty: 'hard', question: say('$x^{3}-4x^{2}+4x$ faktorizatu. Zein da erro bikoitza?', 'Factoriza $x^{3}-4x^{2}+4x$. ¿Cuál es la raíz doble?', 'حلّل $x^{3}-4x^{2}+4x$. ما الجذر المضاعف؟', 'Factorise $x^{3}-4x^{2}+4x$. What is the double root?'), solution: same('$x(x^{2}-4x+4)=x(x-2)^{2}$'), answer: { expected: n(2) } }
        ]
    }
]

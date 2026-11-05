import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Polinomioak · 4. DBH aplikatuak — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new polynomials,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. A question that asks for a
   number about a polynomial gives the polynomial and the divisor in two
   formulas, so the test does not take the polynomial for the calculation.
   Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type PolynomialsTopicId = 'monomials' | 'polynomial-value' | 'language' | 'add-subtract' | 'multiply' | 'identities' | 'long-division' | 'ruffini' | 'remainder' | 'roots' | 'common-factor' | 'factorize' | 'algebraic-fractions' | 'simplify' | 'problems'

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const polynomialsLessonChecks: Record<PolynomialsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Monomials and polynomials ---------- */
    monomials: {
        mistake: {
            wrong: same('$3x^{2}+2x^{3}=5x^{5}$'),
            right: say('Ez dira antzekoak: batuketa horrela uzten da, $3x^{2}+2x^{3}$. Biderkatzean bakarrik batzen dira berretzaileak.', 'No son semejantes: la suma se deja así, $3x^{2}+2x^{3}$. Solo al multiplicar se suman los exponentes.', 'ليسا متشابهين: يبقى المجموع كما هو، $3x^{2}+2x^{3}$. ولا نجمع الأسس إلا عند الضرب.', 'They are not like terms: the sum stays as it is, $3x^{2}+2x^{3}$. Exponents are only added when multiplying.')
        },
        check: {
            prompt: say('Kalkulatu $(-4x^{3})\\cdot(3x^{2})$.', 'Calcula $(-4x^{3})\\cdot(3x^{2})$.', 'احسب $(-4x^{3})\\cdot(3x^{2})$.', 'Calculate $(-4x^{3})\\cdot(3x^{2})$.'),
            options: [same('$-12x^{5}$'), same('$-12x^{6}$'), same('$-x^{5}$')],
            correctIndex: 0,
            explanation: say('Koefizienteak biderkatu ($-4\\cdot 3=-12$) eta berretzaileak batu ($3+2=5$).', 'Multiplica los coeficientes ($-4\\cdot 3=-12$) y suma los exponentes ($3+2=5$).', 'اضرب المعاملين ($-4\\cdot 3=-12$) واجمع الأسين ($3+2=5$).', 'Multiply the coefficients ($-4\\cdot 3=-12$) and add the exponents ($3+2=5$).')
        }
    },
    'polynomial-value': {
        mistake: {
            wrong: say('$P(x)=x^{2}+3x$ bada, $P(-4)=-4^{2}-12=-28$.', 'Si $P(x)=x^{2}+3x$, $P(-4)=-4^{2}-12=-28$.', 'إذا كان $P(x)=x^{2}+3x$ فإن $P(-4)=-4^{2}-12=-28$.', 'If $P(x)=x^{2}+3x$, $P(-4)=-4^{2}-12=-28$.'),
            right: say('Negatiboa parentesi artean doa: $(-4)^{2}+3\\cdot(-4)=16-12=4$.', 'El negativo va entre paréntesis: $(-4)^{2}+3\\cdot(-4)=16-12=4$.', 'العدد السالب يوضع بين قوسين: $(-4)^{2}+3\\cdot(-4)=16-12=4$.', 'The negative number goes in brackets: $(-4)^{2}+3\\cdot(-4)=16-12=4$.')
        },
        check: {
            prompt: say('$P(x)=2x^{2}-x+3$ bada, zenbat da $P(-1)$?', 'Si $P(x)=2x^{2}-x+3$, ¿cuánto vale $P(-1)$?', 'إذا كان $P(x)=2x^{2}-x+3$ فكم يساوي $P(-1)$؟', 'If $P(x)=2x^{2}-x+3$, what is $P(-1)$?'),
            options: [same('$4$'), same('$2$'), same('$6$')],
            correctIndex: 2,
            explanation: say('$2\\cdot(-1)^{2}-(-1)+3=2+1+3=6$. $-x$ gaia $+1$ bihurtzen da.', '$2\\cdot(-1)^{2}-(-1)+3=2+1+3=6$. El término $-x$ se convierte en $+1$.', '$2\\cdot(-1)^{2}-(-1)+3=2+1+3=6$. الحد $-x$ يصير $+1$.', '$2\\cdot(-1)^{2}-(-1)+3=2+1+3=6$. The term $-x$ becomes $+1$.')
        }
    },
    language: {
        mistake: {
            wrong: say('Zenbaki baten bikoitza gehi 5: $2(x+5)$.', 'El doble de un número más 5: $2(x+5)$.', 'ضعف عدد زائد 5: $2(x+5)$.', 'Twice a number plus 5: $2(x+5)$.'),
            right: say('Lehenik bikoitza, eta gero batu: $2x+5$. $2(x+5)$ batuketaren bikoitza da.', 'Primero el doble y después se suma: $2x+5$. $2(x+5)$ es el doble de la suma.', 'الضعف أولًا ثم نجمع: $2x+5$. أما $2(x+5)$ فهو ضعف المجموع.', 'First double it, then add: $2x+5$. $2(x+5)$ is twice the sum.')
        },
        check: {
            prompt: say('Nola idazten da «zenbaki bat ken haren erdia»?', '¿Cómo se escribe «un número menos su mitad»?', 'كيف نكتب «عدد ناقص نصفه»؟', 'How do you write “a number minus half of it”?'),
            options: [same('$\\frac{x-x}{2}$'), same('$\\frac{x}{2}-x$'), same('$x-\\frac{x}{2}$')],
            correctIndex: 2,
            explanation: say('Zenbakia $x$ da eta haren erdia $\\frac{x}{2}$; lehenengoari bigarrena kentzen zaio.', 'El número es $x$ y su mitad, $\\frac{x}{2}$; al primero se le resta la segunda.', 'العدد $x$ ونصفه $\\frac{x}{2}$؛ نطرح الثاني من الأول.', 'The number is $x$ and half of it is $\\frac{x}{2}$; take the second from the first.')
        }
    },
    /* ---------- 2. Operations ---------- */
    'add-subtract': {
        mistake: {
            wrong: same('$(5x^{2}+3x)-(2x^{2}-x)=3x^{2}+2x$'),
            right: say('Minusak parentesiko zeinu guztiak aldatzen ditu: $5x^{2}+3x-2x^{2}+x=3x^{2}+4x$.', 'El menos cambia todos los signos del paréntesis: $5x^{2}+3x-2x^{2}+x=3x^{2}+4x$.', 'الناقص يغيّر كل إشارات القوس: $5x^{2}+3x-2x^{2}+x=3x^{2}+4x$.', 'The minus changes every sign in the brackets: $5x^{2}+3x-2x^{2}+x=3x^{2}+4x$.')
        },
        check: {
            prompt: say('Kalkulatu $(4x^{2}-3x+1)-(x^{2}-2x+5)$.', 'Calcula $(4x^{2}-3x+1)-(x^{2}-2x+5)$.', 'احسب $(4x^{2}-3x+1)-(x^{2}-2x+5)$.', 'Calculate $(4x^{2}-3x+1)-(x^{2}-2x+5)$.'),
            options: [same('$3x^{2}-5x+6$'), same('$3x^{2}-x-4$'), same('$3x^{2}-x+6$')],
            correctIndex: 1,
            explanation: say('Minusaren atzean hiru zeinuak aldatzen dira: $4x^{2}-3x+1-x^{2}+2x-5=3x^{2}-x-4$.', 'Tras el menos cambian los tres signos: $4x^{2}-3x+1-x^{2}+2x-5=3x^{2}-x-4$.', 'بعد الناقص تتغيّر الإشارات الثلاث: $4x^{2}-3x+1-x^{2}+2x-5=3x^{2}-x-4$.', 'After the minus, all three signs change: $4x^{2}-3x+1-x^{2}+2x-5=3x^{2}-x-4$.')
        }
    },
    multiply: {
        mistake: {
            wrong: same('$(x+4)(x-2)=x^{2}-8$'),
            right: say('Biderkadura gurutzatuak falta dira: $(x+4)(x-2)=x^{2}-2x+4x-8=x^{2}+2x-8$.', 'Faltan los productos cruzados: $(x+4)(x-2)=x^{2}-2x+4x-8=x^{2}+2x-8$.', 'ينقص الجداءان المتقاطعان: $(x+4)(x-2)=x^{2}-2x+4x-8=x^{2}+2x-8$.', 'The cross products are missing: $(x+4)(x-2)=x^{2}-2x+4x-8=x^{2}+2x-8$.')
        },
        check: {
            prompt: say('Kalkulatu $(x+5)(x-3)$.', 'Calcula $(x+5)(x-3)$.', 'احسب $(x+5)(x-3)$.', 'Calculate $(x+5)(x-3)$.'),
            options: [same('$x^{2}-15$'), same('$x^{2}+2x-15$'), same('$x^{2}+8x-15$')],
            correctIndex: 1,
            explanation: say('Lau biderkadura: $x^{2}-3x+5x-15=x^{2}+2x-15$.', 'Cuatro productos: $x^{2}-3x+5x-15=x^{2}+2x-15$.', 'أربعة جداءات: $x^{2}-3x+5x-15=x^{2}+2x-15$.', 'Four products: $x^{2}-3x+5x-15=x^{2}+2x-15$.')
        }
    },
    identities: {
        mistake: {
            wrong: same('$(x+3)^{2}=x^{2}+9$'),
            right: say('Biderkaduraren bikoitza falta da: $(x+3)^{2}=x^{2}+6x+9$.', 'Falta el doble del producto: $(x+3)^{2}=x^{2}+6x+9$.', 'ينقص ضعف الجداء: $(x+3)^{2}=x^{2}+6x+9$.', 'Twice the product is missing: $(x+3)^{2}=x^{2}+6x+9$.')
        },
        check: {
            prompt: say('Garatu $(x-5)^{2}$.', 'Desarrolla $(x-5)^{2}$.', 'انشر $(x-5)^{2}$.', 'Expand $(x-5)^{2}$.'),
            options: [same('$x^{2}-10x+25$'), same('$x^{2}+25$'), same('$x^{2}-10x-25$')],
            correctIndex: 0,
            explanation: say('Lehenengoaren karratua, ken biderkaduraren bikoitza, gehi bigarrenaren karratua: $x^{2}-10x+25$.', 'Cuadrado del primero, menos el doble del producto, más el cuadrado del segundo: $x^{2}-10x+25$.', 'مربع الأول ناقص ضعف الجداء زائد مربع الثاني: $x^{2}-10x+25$.', 'The first squared, minus twice the product, plus the second squared: $x^{2}-10x+25$.')
        }
    },
    /* ---------- 3. Division ---------- */
    'long-division': {
        mistake: {
            wrong: say('$(x^{2}+5x+2)\\div(x+2)$ zatiketan, $x(x+2)=x^{2}+2x$ egin ondoren, $7x+2$ geratzen da.', 'En $(x^{2}+5x+2)\\div(x+2)$, tras $x(x+2)=x^{2}+2x$ queda $7x+2$.', 'في $(x^{2}+5x+2)\\div(x+2)$، بعد $x(x+2)=x^{2}+2x$ يبقى $7x+2$.', 'In $(x^{2}+5x+2)\\div(x+2)$, after $x(x+2)=x^{2}+2x$ you are left with $7x+2$.'),
            right: say('Kendu egin behar da: $5x-2x=3x$, eta $3x+2$ geratzen da.', 'Hay que restar: $5x-2x=3x$, y queda $3x+2$.', 'يجب الطرح: $5x-2x=3x$، فيبقى $3x+2$.', 'You have to subtract: $5x-2x=3x$, which leaves $3x+2$.')
        },
        check: {
            prompt: say('Noiz bukatzen da polinomioen zatiketa bat?', '¿Cuándo se termina una división de polinomios?', 'متى تنتهي قسمة الحدوديات؟', 'When does a polynomial division end?'),
            options: [
                say('Hondarra 0 denean', 'Cuando el resto es 0', 'عندما يكون الباقي 0', 'When the remainder is 0'),
                say('Zatidurak 1 maila duenean', 'Cuando el cociente tiene grado 1', 'عندما تكون درجة خارج القسمة 1', 'When the quotient has degree 1'),
                say('Hondarraren maila zatitzailearena baino txikiagoa denean', 'Cuando el resto tiene grado menor que el divisor', 'عندما تصير درجة الباقي أصغر من درجة المقسوم عليه', 'When the remainder has a lower degree than the divisor')
            ],
            correctIndex: 2,
            explanation: say('Hondarra 0 ez bada ere, ezin da jarraitu haren maila zatitzailearena baino txikiagoa denean: zatiketa ez da zehatza.', 'Aunque el resto no sea 0, no se puede seguir cuando su grado es menor que el del divisor: la división no es exacta.', 'حتى لو لم يكن الباقي 0، لا يمكن المتابعة حين تصير درجته أصغر من درجة المقسوم عليه: القسمة غير تامة.', 'Even if the remainder is not 0, you cannot go on once its degree is lower than the divisor’s: the division is not exact.')
        }
    },
    ruffini: {
        mistake: {
            wrong: say('$x+3$ zenbakiaz zatitzeko, $a=3$ jartzen da.', 'Para dividir entre $x+3$ se pone $a=3$.', 'للقسمة على $x+3$ نضع $a=3$.', 'To divide by $x+3$, you put $a=3$.'),
            right: same('$x+3=x-(-3)$: $a=-3$.')
        },
        check: {
            prompt: say('Ruffinirekin, zein da $x^{2}+3x-5$ polinomioa $x-2$ binomioaz zatitzean geratzen den hondarra?', 'Con Ruffini, ¿cuál es el resto de dividir $x^{2}+3x-5$ entre $x-2$?', 'بقاعدة روفيني، ما باقي قسمة $x^{2}+3x-5$ على $x-2$؟', 'With Ruffini, what is the remainder when $x^{2}+3x-5$ is divided by $x-2$?'),
            options: [same('$-7$'), same('$5$'), same('$1$')],
            correctIndex: 1,
            explanation: say('$a=2$: 1 jaitsi; $1\\cdot 2+3=5$; $5\\cdot 2-5=5$. $a=-2$ erabiliz $-7$ ateratzen da, eta hori okerra da.', '$a=2$: baja el 1; $1\\cdot 2+3=5$; $5\\cdot 2-5=5$. Con $a=-2$ saldría $-7$, que está mal.', '$a=2$: أنزل 1؛ $1\\cdot 2+3=5$؛ $5\\cdot 2-5=5$. ومع $a=-2$ يخرج $-7$، وهو خطأ.', '$a=2$: bring down the 1; $1\\cdot 2+3=5$; $5\\cdot 2-5=5$. With $a=-2$ you would get $-7$, which is wrong.')
        }
    },
    remainder: {
        mistake: {
            wrong: say('$P(x)\\div(x+2)$ zatiketaren hondarra $P(2)$ da.', 'El resto de $P(x)\\div(x+2)$ es $P(2)$.', 'باقي $P(x)\\div(x+2)$ هو $P(2)$.', 'The remainder of $P(x)\\div(x+2)$ is $P(2)$.'),
            right: say('$x+2=x-(-2)$: hondarra $P(-2)$ da.', '$x+2=x-(-2)$: el resto es $P(-2)$.', '$x+2=x-(-2)$: الباقي هو $P(-2)$.', '$x+2=x-(-2)$: the remainder is $P(-2)$.')
        },
        check: {
            prompt: say('$P(5)=0$ bada, zer dakigu $P(x)\\div(x-5)$ zatiketaz?', 'Si $P(5)=0$, ¿qué se sabe de $P(x)\\div(x-5)$?', 'إذا كان $P(5)=0$ فماذا نعرف عن $P(x)\\div(x-5)$؟', 'If $P(5)=0$, what do we know about $P(x)\\div(x-5)$?'),
            options: [
                say('Zehatza dela', 'Que es exacta', 'أنها تامة', 'That it is exact'),
                say('Hondarra 5 dela', 'Que el resto es 5', 'أن الباقي 5', 'That the remainder is 5'),
                say('Zatidura 0 dela', 'Que el cociente es 0', 'أن خارج القسمة 0', 'That the quotient is 0')
            ],
            correctIndex: 0,
            explanation: say('Hondarra $P(5)$ da, hau da, 0: zatiketa zehatza da eta $x-5$ faktore bat da.', 'El resto es $P(5)$, o sea 0: la división es exacta y $x-5$ es un factor.', 'الباقي هو $P(5)$ أي 0: القسمة تامة و$x-5$ عامل.', 'The remainder is $P(5)$, that is 0: the division is exact and $x-5$ is a factor.')
        }
    },
    /* ---------- 4. Factorising ---------- */
    roots: {
        mistake: {
            wrong: say('$(x-3)(x+1)$ polinomioaren erroak $-3$ eta 1 dira.', 'Las raíces de $(x-3)(x+1)$ son $-3$ y 1.', 'جذرا $(x-3)(x+1)$ هما $-3$ و1.', 'The roots of $(x-3)(x+1)$ are $-3$ and 1.'),
            right: say('Faktore bakoitza aurkako zenbakiarekin anulatzen da: $x-3=0$ da $x=3$ denean. Erroak 3 eta $-1$ dira.', 'Cada factor se anula con el número contrario: $x-3=0$ si $x=3$. Las raíces son 3 y $-1$.', 'كل عامل ينعدم بالعدد المعاكس: $x-3=0$ إذا كان $x=3$. الجذران 3 و$-1$.', 'Each factor is zero at the opposite number: $x-3=0$ when $x=3$. The roots are 3 and $-1$.')
        },
        check: {
            prompt: say('Zein dira $(x+2)(x-5)$ polinomioaren erroak?', '¿Cuáles son las raíces de $(x+2)(x-5)$?', 'ما جذرا $(x+2)(x-5)$؟', 'What are the roots of $(x+2)(x-5)$?'),
            options: [
                say('$2$ eta $-5$', '$2$ y $-5$', '$2$ و$-5$', '$2$ and $-5$'),
                say('$2$ eta $5$', '$2$ y $5$', '$2$ و$5$', '$2$ and $5$'),
                say('$-2$ eta $5$', '$-2$ y $5$', '$-2$ و$5$', '$-2$ and $5$')
            ],
            correctIndex: 2,
            explanation: say('$x+2=0$ da $x=-2$ denean, eta $x-5=0$ $x=5$ denean.', '$x+2=0$ si $x=-2$, y $x-5=0$ si $x=5$.', '$x+2=0$ إذا كان $x=-2$، و$x-5=0$ إذا كان $x=5$.', '$x+2=0$ when $x=-2$, and $x-5=0$ when $x=5$.')
        }
    },
    'common-factor': {
        mistake: {
            wrong: say('$4x^{2}-8x=4(x^{2}-2x)$, eta kitto.', '$4x^{2}-8x=4(x^{2}-2x)$, y ya está.', '$4x^{2}-8x=4(x^{2}-2x)$، وانتهى.', '$4x^{2}-8x=4(x^{2}-2x)$, and that is it.'),
            right: say('$x$ komuna falta da: $4x^{2}-8x=4x(x-2)$. Atera ZKH eta letra komun guztiak.', 'Falta la $x$ común: $4x^{2}-8x=4x(x-2)$. Saca el m.c.d. y todas las letras comunes.', 'ينقص $x$ المشترك: $4x^{2}-8x=4x(x-2)$. أخرج ق.م.أ وكل الحروف المشتركة.', 'The common $x$ is missing: $4x^{2}-8x=4x(x-2)$. Take out the GCD and all the common letters.')
        },
        check: {
            prompt: say('Deskonposatu $x^{2}-10x+25$.', 'Descompón $x^{2}-10x+25$.', 'حلّل $x^{2}-10x+25$.', 'Factorise $x^{2}-10x+25$.'),
            options: [same('$(x+5)(x-5)$'), same('$(x-5)^{2}$'), same('$(x+5)^{2}$')],
            correctIndex: 1,
            explanation: say('Muturrak karratuak dira ($x^{2}$ eta $5^{2}$) eta erdikoa haien biderkaduraren bikoitza, minus zeinuarekin: kendura baten karratua.', 'Los extremos son cuadrados ($x^{2}$ y $5^{2}$) y el del medio, el doble de su producto con signo menos: cuadrado de una diferencia.', 'الطرفان مربعان ($x^{2}$ و$5^{2}$) والأوسط ضعف جدائهما بإشارة ناقص: مربع فرق.', 'The ends are squares ($x^{2}$ and $5^{2}$) and the middle is twice their product with a minus sign: the square of a difference.')
        }
    },
    factorize: {
        mistake: {
            wrong: say('2 erroa denez, $x+2$ faktore bat da.', 'Como 2 es raíz, $x+2$ es un factor.', 'بما أن 2 جذر، فإن $x+2$ عامل.', 'Since 2 is a root, $x+2$ is a factor.'),
            right: say('$a$ erroa bada, faktorea $x-a$ da: 2 erroarekin, $x-2$.', 'Si $a$ es raíz, el factor es $x-a$: con la raíz 2, $x-2$.', 'إذا كان $a$ جذرًا فالعامل $x-a$: مع الجذر 2 يكون $x-2$.', 'If $a$ is a root, the factor is $x-a$: with the root 2, $x-2$.')
        },
        check: {
            prompt: say('Faktorizatu $x^{3}-x^{2}-4x+4$.', 'Factoriza $x^{3}-x^{2}-4x+4$.', 'حلّل $x^{3}-x^{2}-4x+4$.', 'Factorise $x^{3}-x^{2}-4x+4$.'),
            options: [same('$(x+1)(x-2)(x+2)$'), same('$(x-1)(x-2)^{2}$'), same('$(x-1)(x-2)(x+2)$')],
            correctIndex: 2,
            explanation: say('1 erroa da ($1-1-4+4=0$); zatidura $x^{2}-4=(x-2)(x+2)$ da.', '1 es raíz ($1-1-4+4=0$); el cociente es $x^{2}-4=(x-2)(x+2)$.', '1 جذر ($1-1-4+4=0$)؛ وخارج القسمة $x^{2}-4=(x-2)(x+2)$.', '1 is a root ($1-1-4+4=0$); the quotient is $x^{2}-4=(x-2)(x+2)$.')
        }
    },
    /* ---------- 5. Algebraic expressions ---------- */
    'algebraic-fractions': {
        mistake: {
            wrong: same('$\\frac{x+5}{5}=x$'),
            right: say('Goiko 5 zenbakia batugaia da, ez faktorea: $\\frac{x+5}{5}$ ezin da horrela sinplifikatu. Faktoreak bakarrik ezabatzen dira.', 'El 5 de arriba es un sumando, no un factor: $\\frac{x+5}{5}$ no se simplifica así. Solo se eliminan factores.', 'العدد 5 في الأعلى حدّ مجموع لا عامل: لا يُبسَّط $\\frac{x+5}{5}$ هكذا. لا نحذف إلا العوامل.', 'The 5 on top is a term being added, not a factor: $\\frac{x+5}{5}$ cannot be simplified like that. Only factors cancel.')
        },
        check: {
            prompt: say('Sinplifikatu $\\frac{x^{2}+4x}{x^{2}}$.', 'Simplifica $\\frac{x^{2}+4x}{x^{2}}$.', 'بسّط $\\frac{x^{2}+4x}{x^{2}}$.', 'Simplify $\\frac{x^{2}+4x}{x^{2}}$.'),
            options: [same('$1+4x$'), same('$\\frac{x+4}{x}$'), same('$x+4$')],
            correctIndex: 1,
            explanation: say('Faktorizatu zenbakitzailea: $\\frac{x(x+4)}{x\\cdot x}=\\frac{x+4}{x}$. Ezin da $x^{2}$ ezabatu, batugaia delako.', 'Factoriza el numerador: $\\frac{x(x+4)}{x\\cdot x}=\\frac{x+4}{x}$. El $x^{2}$ no se puede tachar: es un sumando.', 'حلّل البسط: $\\frac{x(x+4)}{x\\cdot x}=\\frac{x+4}{x}$. لا يُحذف $x^{2}$ لأنه حد مجموع.', 'Factorise the numerator: $\\frac{x(x+4)}{x\\cdot x}=\\frac{x+4}{x}$. You cannot cross out $x^{2}$: it is being added.')
        }
    },
    simplify: {
        mistake: {
            wrong: same('$-(x-2)^{2}=-x^{2}-4x+4$'),
            right: say('Minusak karratu osoari eragiten dio: $-(x^{2}-4x+4)=-x^{2}+4x-4$.', 'El menos afecta a todo el cuadrado: $-(x^{2}-4x+4)=-x^{2}+4x-4$.', 'الناقص يؤثر في المربع كله: $-(x^{2}-4x+4)=-x^{2}+4x-4$.', 'The minus affects the whole square: $-(x^{2}-4x+4)=-x^{2}+4x-4$.')
        },
        check: {
            prompt: say('Sinplifikatu $3(x-2)-(x+4)$.', 'Simplifica $3(x-2)-(x+4)$.', 'بسّط $3(x-2)-(x+4)$.', 'Simplify $3(x-2)-(x+4)$.'),
            options: [same('$2x-2$'), same('$4x-2$'), same('$2x-10$')],
            correctIndex: 2,
            explanation: say('$3x-6-x-4=2x-10$: minusak $+4$ zenbakia ere aldatzen du.', '$3x-6-x-4=2x-10$: el menos también cambia el $+4$.', '$3x-6-x-4=2x-10$: الناقص يغيّر $+4$ أيضًا.', '$3x-6-x-4=2x-10$: the minus also changes the $+4$.')
        }
    },
    problems: {
        mistake: {
            wrong: say('Alde batek $x$ neurtzen badu eta perimetroa 40 bada, beste aldeak $40-x$ neurtzen du.', 'Si un lado mide $x$ y el perímetro es 40, el otro lado mide $40-x$.', 'إذا كان طول ضلع $x$ والمحيط 40، فطول الضلع الآخر $40-x$.', 'If one side is $x$ and the perimeter is 40, the other side is $40-x$.'),
            right: say('Bi aldeek perimetroaren erdia batzen dute: besteak $20-x$ neurtzen du.', 'Los dos lados suman la mitad del perímetro: el otro mide $20-x$.', 'مجموع الضلعين نصف المحيط: الآخر طوله $20-x$.', 'The two sides add up to half the perimeter: the other is $20-x$.')
        },
        check: {
            prompt: say('Laukizuzen baten alde batek $x$ cm neurtzen du, eta besteak $x+4$ cm. Zein da azalera?', 'Un lado de un rectángulo mide $x$ cm y el otro, $x+4$ cm. ¿Cuál es su área?', 'ضلع مستطيل طوله $x$ سم والآخر $x+4$ سم. ما مساحته؟', 'One side of a rectangle is $x$ cm and the other is $x+4$ cm. What is its area?'),
            options: [same('$2x+4$'), same('$x^{2}+4x$'), same('$4x+8$')],
            correctIndex: 1,
            explanation: say('Azalera bi aldeen biderkadura da: $x(x+4)=x^{2}+4x$. $4x+8$ perimetroa da.', 'El área es el producto de los dos lados: $x(x+4)=x^{2}+4x$. $4x+8$ es el perímetro.', 'المساحة جداء الضلعين: $x(x+4)=x^{2}+4x$. أما $4x+8$ فهو المحيط.', 'The area is the product of the two sides: $x(x+4)=x^{2}+4x$. $4x+8$ is the perimeter.')
        }
    }
}

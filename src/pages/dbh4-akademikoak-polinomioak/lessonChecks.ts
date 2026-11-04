import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Polinomioak eta zatiki aljebraikoak · 4. DBH akademikoak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no JSX)
   so the tests can import it; lessons.tsx merges it into the topics. When a
   question asks about an expression without working it out (its degree, its
   remainder), it gives two formulas, so the test does not take it for a
   calculation.
   ========================================================================== */

export type PolynomialsTopicId = 'polynomials' | 'identities' | 'binomial' | 'long-division' | 'ruffini' | 'remainder' | 'roots' | 'factorize' | 'gcd-lcm' | 'algebraic-fractions' | 'simplify' | 'equivalent' | 'add-fractions' | 'multiply-fractions' | 'combined'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const polynomialsLessonChecks: Record<PolynomialsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    polynomials: {
        mistake: {
            wrong: same('$(3x^{2}+x)-(x^{2}-4x)=2x^{2}-3x$'),
            right: say('Minus zeinuak kentzailearen gai guztiak aldatzen ditu: $3x^{2}+x-x^{2}+4x=2x^{2}+5x$.', 'El signo menos cambia todos los términos del sustraendo: $3x^{2}+x-x^{2}+4x=2x^{2}+5x$.', 'إشارة الطرح تغيّر كل حدود المطروح: $3x^{2}+x-x^{2}+4x=2x^{2}+5x$.', 'The minus sign changes every term being subtracted: $3x^{2}+x-x^{2}+4x=2x^{2}+5x$.')
        },
        check: {
            prompt: say('Kalkulatu $(5x^{2}-2x)-(3x^{2}-6x)$.', 'Calcula $(5x^{2}-2x)-(3x^{2}-6x)$.', 'احسب $(5x^{2}-2x)-(3x^{2}-6x)$.', 'Work out $(5x^{2}-2x)-(3x^{2}-6x)$.'),
            options: [same('$2x^{2}+4x$'), same('$2x^{2}-8x$'), same('$2x^{2}-4x$')],
            correctIndex: 0,
            explanation: same('$5x^{2}-2x-3x^{2}+6x=2x^{2}+4x$')
        }
    },
    identities: {
        mistake: {
            wrong: same('$(x+4)^{2}=x^{2}+16$'),
            right: say('Biderkadura bikoitza falta da: $(x+4)^{2}=x^{2}+8x+16$.', 'Falta el doble producto: $(x+4)^{2}=x^{2}+8x+16$.', 'ينقص ضعف حاصل الضرب: $(x+4)^{2}=x^{2}+8x+16$.', 'Twice the product is missing: $(x+4)^{2}=x^{2}+8x+16$.')
        },
        check: {
            prompt: say('Garatu $(3x-2)^{2}$.', 'Desarrolla $(3x-2)^{2}$.', 'انشر $(3x-2)^{2}$.', 'Expand $(3x-2)^{2}$.'),
            options: [same('$9x^{2}+4$'), same('$9x^{2}-12x+4$'), same('$9x^{2}-6x+4$')],
            correctIndex: 1,
            explanation: say('Biderkadura bikoitza: $2\\cdot 3x\\cdot 2=12x$, − zeinuarekin.', 'El doble producto: $2\\cdot 3x\\cdot 2=12x$, con signo −.', 'ضعف حاصل الضرب: $2\\cdot 3x\\cdot 2=12x$ بإشارة −.', 'Twice the product: $2\\cdot 3x\\cdot 2=12x$, with a minus sign.')
        }
    },
    binomial: {
        mistake: {
            wrong: same('$(x+1)^{4}=x^{4}+4x^{3}+4x^{2}+4x+1$'),
            right: say('4. errenkada 1 4 6 4 1 da: $(x+1)^{4}=x^{4}+4x^{3}+6x^{2}+4x+1$.', 'La fila 4 es 1 4 6 4 1: $(x+1)^{4}=x^{4}+4x^{3}+6x^{2}+4x+1$.', 'الصف 4 هو 1 4 6 4 1: $(x+1)^{4}=x^{4}+4x^{3}+6x^{2}+4x+1$.', 'Row 4 is 1 4 6 4 1: $(x+1)^{4}=x^{4}+4x^{3}+6x^{2}+4x+1$.')
        },
        check: {
            prompt: say('Zein da $x^{2}$ gaiaren koefizientea $(x+2)^{4}$ garapenean?', '¿Cuál es el coeficiente de $x^{2}$ en $(x+2)^{4}$?', 'ما معامل $x^{2}$ في $(x+2)^{4}$؟', 'What is the coefficient of $x^{2}$ in $(x+2)^{4}$?'),
            options: [same('$6$'), same('$12$'), same('$24$')],
            correctIndex: 2,
            explanation: say('4. errenkadako 6 zenbakia, bider $2^{2}=4$: $6\\cdot 4=24$.', 'El 6 de la fila 4, por $2^{2}=4$: $6\\cdot 4=24$.', 'العدد 6 من الصف 4 مضروبًا في $2^{2}=4$: $6\\cdot 4=24$.', 'The 6 of row 4, times $2^{2}=4$: $6\\cdot 4=24$.')
        }
    },
    'long-division': {
        mistake: {
            wrong: say('$(2x^{2}+x-5)\\div(x+1)$ zatitzean, $2x^{2}+2x$ kentzen dut eta $3x-5$ geratzen da.', 'Al dividir $(2x^{2}+x-5)\\div(x+1)$, resto $2x^{2}+2x$ y queda $3x-5$.', 'عند قسمة $(2x^{2}+x-5)\\div(x+1)$ أطرح $2x^{2}+2x$ فيبقى $3x-5$.', 'Dividing $(2x^{2}+x-5)\\div(x+1)$, I subtract $2x^{2}+2x$ and get $3x-5$.'),
            right: say('Kentzean bi zeinuak aldatzen dira: $x-2x=-x$, eta $-x-5$ geratzen da. Amaieran, zatidura $2x-1$ eta hondarra $-4$.', 'Al restar cambian los dos signos: $x-2x=-x$, y queda $-x-5$. Al final, cociente $2x-1$ y resto $-4$.', 'عند الطرح تتغيّر الإشارتان: $x-2x=-x$، فيبقى $-x-5$. وفي النهاية خارج القسمة $2x-1$ والباقي $-4$.', 'Subtracting changes both signs: $x-2x=-x$, leaving $-x-5$. In the end, quotient $2x-1$ and remainder $-4$.')
        },
        check: {
            prompt: say('Zer maila du zatidurak $6x^{5}-x+2$ zati $2x^{2}+1$ egitean?', '¿Qué grado tiene el cociente al dividir $6x^{5}-x+2$ entre $2x^{2}+1$?', 'ما درجة خارج القسمة عند قسمة $6x^{5}-x+2$ على $2x^{2}+1$؟', 'What degree does the quotient have when you divide $6x^{5}-x+2$ by $2x^{2}+1$?'),
            options: [same('$3$'), same('$7$'), same('$2$')],
            correctIndex: 0,
            explanation: say('Zatikizunaren maila ken zatitzailearena: $5-2=3$.', 'El grado del dividendo menos el del divisor: $5-2=3$.', 'درجة المقسوم ناقص درجة المقسوم عليه: $5-2=3$.', 'The degree of the dividend minus that of the divisor: $5-2=3$.')
        }
    },
    ruffini: {
        mistake: {
            wrong: say('$x+3$ binomioaz zatitzeko, $a=3$ erabiltzen dut Ruffinin.', 'Para dividir entre $x+3$, uso $a=3$ en Ruffini.', 'للقسمة على $x+3$ أستعمل $a=3$ في روفيني.', 'To divide by $x+3$, I use $a=3$ in Ruffini.'),
            right: say('$x+3=x-(-3)$: $a=-3$ erabili behar da.', '$x+3=x-(-3)$: hay que usar $a=-3$.', '$x+3=x-(-3)$: يجب استعمال $a=-3$.', '$x+3=x-(-3)$: you must use $a=-3$.')
        },
        check: {
            prompt: say('Ruffinirekin, zein da hondarra $x^{3}+2x^{2}-4$ zati $x-1$ egitean?', 'Con Ruffini, ¿cuál es el resto al dividir $x^{3}+2x^{2}-4$ entre $x-1$?', 'بطريقة روفيني، ما الباقي عند قسمة $x^{3}+2x^{2}-4$ على $x-1$؟', 'With Ruffini, what is the remainder when you divide $x^{3}+2x^{2}-4$ by $x-1$?'),
            options: [same('$-3$'), same('$-1$'), same('$1$')],
            correctIndex: 1,
            explanation: say('Koefizienteak $1,\\ 2,\\ 0,\\ -4$ eta $a=1$: $1,\\ 3,\\ 3$, eta hondarra $3-4=-1$.', 'Coeficientes $1,\\ 2,\\ 0,\\ -4$ y $a=1$: $1,\\ 3,\\ 3$, y el resto $3-4=-1$.', 'المعاملات $1,\\ 2,\\ 0,\\ -4$ و$a=1$: $1,\\ 3,\\ 3$، والباقي $3-4=-1$.', 'Coefficients $1,\\ 2,\\ 0,\\ -4$ and $a=1$: $1,\\ 3,\\ 3$, and the remainder $3-4=-1$.')
        }
    },
    remainder: {
        mistake: {
            wrong: say('$P(x)\\div(x+2)$ zatiketaren hondarra $P(2)$ da.', 'El resto de $P(x)\\div(x+2)$ es $P(2)$.', 'باقي $P(x)\\div(x+2)$ هو $P(2)$.', 'The remainder of $P(x)\\div(x+2)$ is $P(2)$.'),
            right: say('$x+2=x-(-2)$: hondarra $P(-2)$ da.', '$x+2=x-(-2)$: el resto es $P(-2)$.', '$x+2=x-(-2)$: الباقي هو $P(-2)$.', '$x+2=x-(-2)$: the remainder is $P(-2)$.')
        },
        check: {
            prompt: say('Zatitu gabe, zein da hondarra $x^{4}-3x+1$ zati $x+1$ egitean?', 'Sin dividir, ¿cuál es el resto al dividir $x^{4}-3x+1$ entre $x+1$?', 'دون قسمة، ما الباقي عند قسمة $x^{4}-3x+1$ على $x+1$؟', 'Without dividing, what is the remainder when you divide $x^{4}-3x+1$ by $x+1$?'),
            options: [same('$5$'), same('$-1$'), same('$3$')],
            correctIndex: 0,
            explanation: same('$P(-1)=1+3+1=5$')
        }
    },
    roots: {
        mistake: {
            wrong: say('$x^{2}+x-6$ polinomioaren erro osoak 1 zenbakiaren zatitzaileen artean bilatzen dira, lehen koefizientea delako.', 'Las raíces enteras de $x^{2}+x-6$ se buscan entre los divisores de 1, el primer coeficiente.', 'نبحث عن الجذور الصحيحة لـ $x^{2}+x-6$ بين قواسم 1، المعامل الأول.', 'The whole-number roots of $x^{2}+x-6$ are looked for among the divisors of 1, the first coefficient.'),
            right: say('Gai askearen zatitzaileen artean bilatzen dira, $-6$: 2 eta $-3$ dira.', 'Se buscan entre los divisores del término independiente, $-6$: son 2 y $-3$.', 'نبحث عنها بين قواسم الحد الثابت $-6$: وهي 2 و$-3$.', 'They are looked for among the divisors of the constant term, $-6$: they are 2 and $-3$.')
        },
        check: {
            prompt: say('Zenbaki hauetatik, zein da $P(x)=x^{3}+4x^{2}-5$ polinomioaren erroa?', '¿Cuál de estos números es raíz de $P(x)=x^{3}+4x^{2}-5$?', 'أيّ هذه الأعداد جذر لـ $P(x)=x^{3}+4x^{2}-5$؟', 'Which of these numbers is a root of $P(x)=x^{3}+4x^{2}-5$?'),
            options: [same('$4$'), same('$-4$'), same('$1$')],
            correctIndex: 2,
            explanation: say('1 zenbakia $-5$ zenbakiaren zatitzailea da, eta $P(1)=1+4-5=0$.', '1 es divisor de $-5$, y $P(1)=1+4-5=0$.', '1 قاسم لـ $-5$، و$P(1)=1+4-5=0$.', '1 divides $-5$, and $P(1)=1+4-5=0$.')
        }
    },
    factorize: {
        mistake: {
            wrong: same('$2x^{2}-10x+12=(x-2)(x-3)$'),
            right: say('Koefiziente nagusia falta da: $2x^{2}-10x+12=2(x-2)(x-3)$.', 'Falta el coeficiente principal: $2x^{2}-10x+12=2(x-2)(x-3)$.', 'ينقص المعامل الرئيسي: $2x^{2}-10x+12=2(x-2)(x-3)$.', 'The leading coefficient is missing: $2x^{2}-10x+12=2(x-2)(x-3)$.')
        },
        check: {
            prompt: say('Faktorizatu $x^{3}-9x$.', 'Factoriza $x^{3}-9x$.', 'حلّل $x^{3}-9x$.', 'Factorise $x^{3}-9x$.'),
            options: [same('$x(x-3)^{2}$'), same('$x(x+3)(x-3)$'), same('$(x-3)(x+3)$')],
            correctIndex: 1,
            explanation: say('Faktore komuna $x$, eta gero batura bider kenketa: $x(x^{2}-9)=x(x+3)(x-3)$.', 'Factor común $x$ y después suma por diferencia: $x(x^{2}-9)=x(x+3)(x-3)$.', 'العامل المشترك $x$ ثم مجموع في فرق: $x(x^{2}-9)=x(x+3)(x-3)$.', 'Common factor $x$, then sum times difference: $x(x^{2}-9)=x(x+3)(x-3)$.')
        }
    },
    'gcd-lcm': {
        mistake: {
            wrong: say('$(x-1)^{2}$ eta $(x-1)(x+2)$ polinomioen m.k.t. $(x-1)^{3}(x+2)$ da.', 'El m.c.m. de $(x-1)^{2}$ y $(x-1)(x+2)$ es $(x-1)^{3}(x+2)$.', 'م.م.أ لـ $(x-1)^{2}$ و$(x-1)(x+2)$ هو $(x-1)^{3}(x+2)$.', 'The LCM of $(x-1)^{2}$ and $(x-1)(x+2)$ is $(x-1)^{3}(x+2)$.'),
            right: say('Faktore bakoitza behin, berretzaile handienarekin: $(x-1)^{2}(x+2)$.', 'Cada factor, una sola vez y con el mayor exponente: $(x-1)^{2}(x+2)$.', 'كل عامل مرة واحدة بأكبر أس: $(x-1)^{2}(x+2)$.', 'Each factor once, with the highest exponent: $(x-1)^{2}(x+2)$.')
        },
        check: {
            prompt: say('Zein da $x^{2}(x+1)$ eta $x(x+1)^{3}$ polinomioen z.k.h.?', '¿Cuál es el m.c.d. de $x^{2}(x+1)$ y $x(x+1)^{3}$?', 'ما ق.م.أ لـ $x^{2}(x+1)$ و$x(x+1)^{3}$؟', 'What is the GCD of $x^{2}(x+1)$ and $x(x+1)^{3}$?'),
            options: [same('$x(x+1)$'), same('$x^{2}(x+1)^{3}$'), same('$x^{3}(x+1)^{4}$')],
            correctIndex: 0,
            explanation: say('Faktore komunak, berretzaile txikienarekin: $x$ eta $x+1$.', 'Los factores comunes con el menor exponente: $x$ y $x+1$.', 'العوامل المشتركة بأصغر أس: $x$ و$x+1$.', 'The common factors with the lowest exponent: $x$ and $x+1$.')
        }
    },
    'algebraic-fractions': {
        mistake: {
            wrong: say('$\\frac{x-3}{x+3}$ ez dago $x=3$ puntuan.', '$\\frac{x-3}{x+3}$ no existe en $x=3$.', '$\\frac{x-3}{x+3}$ غير موجود عند $x=3$.', '$\\frac{x-3}{x+3}$ does not exist at $x=3$.'),
            right: say('Izendatzailea bakarrik hartzen da kontuan: ez dago $x=-3$ puntuan. $x=3$ denean 0 balio du.', 'Solo cuenta el denominador: no existe en $x=-3$. En $x=3$ vale 0.', 'المقام وحده يهم: غير موجود عند $x=-3$. وعند $x=3$ قيمته 0.', 'Only the denominator counts: it does not exist at $x=-3$. At $x=3$ it is worth 0.')
        },
        check: {
            prompt: say('Non ez dago $\\frac{x+1}{x^{2}-9}$?', '¿Dónde no existe $\\frac{x+1}{x^{2}-9}$?', 'أين لا يوجد $\\frac{x+1}{x^{2}-9}$؟', 'Where does $\\frac{x+1}{x^{2}-9}$ not exist?'),
            options: [
                say('$x=\\pm 3$ puntuetan', 'En $x=\\pm 3$', 'عند $x=\\pm 3$', 'At $x=\\pm 3$'),
                say('$x=-1$ puntuan', 'En $x=-1$', 'عند $x=-1$', 'At $x=-1$'),
                say('$x=9$ puntuan', 'En $x=9$', 'عند $x=9$', 'At $x=9$')
            ],
            correctIndex: 0,
            explanation: say('$x^{2}-9=0$ da $x=3$ eta $x=-3$ direnean.', '$x^{2}-9=0$ para $x=3$ y $x=-3$.', '$x^{2}-9=0$ عندما $x=3$ و$x=-3$.', '$x^{2}-9=0$ for $x=3$ and $x=-3$.')
        }
    },
    simplify: {
        mistake: {
            wrong: same('$\\frac{x+6}{x+2}=\\frac{6}{2}=3$'),
            right: say('$x$ batugaia da, ez faktorea: $\\frac{x+6}{x+2}$ ezin da sinplifikatu.', '$x$ es un sumando, no un factor: $\\frac{x+6}{x+2}$ no se puede simplificar.', '$x$ حد مجموع لا عامل: لا يمكن تبسيط $\\frac{x+6}{x+2}$.', '$x$ is a term that is added, not a factor: $\\frac{x+6}{x+2}$ cannot be simplified.')
        },
        check: {
            prompt: say('Sinplifikatu $\\frac{x^{2}+2x}{x^{2}-4}$.', 'Simplifica $\\frac{x^{2}+2x}{x^{2}-4}$.', 'بسّط $\\frac{x^{2}+2x}{x^{2}-4}$.', 'Simplify $\\frac{x^{2}+2x}{x^{2}-4}$.'),
            options: [same('$-\\frac{x}{2}$'), same('$\\frac{x}{x+2}$'), same('$\\frac{x}{x-2}$')],
            correctIndex: 2,
            explanation: same('$\\frac{x(x+2)}{(x+2)(x-2)}=\\frac{x}{x-2}$')
        }
    },
    equivalent: {
        mistake: {
            wrong: say('$\\frac{x}{3}$ eta $\\frac{x+1}{4}$ baliokideak dira: goian eta behean 1 batu da.', '$\\frac{x}{3}$ y $\\frac{x+1}{4}$ son equivalentes: se ha sumado 1 arriba y abajo.', '$\\frac{x}{3}$ و$\\frac{x+1}{4}$ متكافئان: أضفنا 1 إلى البسط والمقام.', '$\\frac{x}{3}$ and $\\frac{x+1}{4}$ are equivalent: 1 was added to the top and bottom.'),
            right: say('Batuz ez dira baliokideak lortzen; goian eta behean gauza berberaz biderkatu behar da: $\\frac{x}{3}=\\frac{4x}{12}$.', 'Sumando no salen fracciones equivalentes; hay que multiplicar arriba y abajo por lo mismo: $\\frac{x}{3}=\\frac{4x}{12}$.', 'الجمع لا يعطي كسورًا متكافئة؛ يجب ضرب البسط والمقام في الشيء نفسه: $\\frac{x}{3}=\\frac{4x}{12}$.', 'Adding does not give equivalent fractions; you must multiply top and bottom by the same thing: $\\frac{x}{3}=\\frac{4x}{12}$.')
        },
        check: {
            prompt: say('Zein zatiki da $\\frac{2}{x-1}$ zatikiaren baliokidea?', '¿Qué fracción es equivalente a $\\frac{2}{x-1}$?', 'أيّ كسر يكافئ $\\frac{2}{x-1}$؟', 'Which fraction is equivalent to $\\frac{2}{x-1}$?'),
            options: [same('$\\frac{3}{x}$'), same('$\\frac{2x+2}{x^{2}-1}$'), same('$\\frac{4}{x-2}$')],
            correctIndex: 1,
            explanation: say('Goian eta behean $x+1$ binomioaz biderkatu da: $\\frac{2(x+1)}{(x-1)(x+1)}$.', 'Se ha multiplicado arriba y abajo por $x+1$: $\\frac{2(x+1)}{(x-1)(x+1)}$.', 'ضُرب البسط والمقام في $x+1$: $\\frac{2(x+1)}{(x-1)(x+1)}$.', 'The top and bottom were multiplied by $x+1$: $\\frac{2(x+1)}{(x-1)(x+1)}$.')
        }
    },
    'add-fractions': {
        mistake: {
            wrong: same('$\\frac{1}{x}+\\frac{1}{x+2}=\\frac{2}{2x+2}$'),
            right: say('Izendatzaileak ez dira batzen: $\\frac{(x+2)+x}{x(x+2)}=\\frac{2x+2}{x(x+2)}$.', 'Los denominadores no se suman: $\\frac{(x+2)+x}{x(x+2)}=\\frac{2x+2}{x(x+2)}$.', 'المقامات لا تُجمع: $\\frac{(x+2)+x}{x(x+2)}=\\frac{2x+2}{x(x+2)}$.', 'Denominators are not added: $\\frac{(x+2)+x}{x(x+2)}=\\frac{2x+2}{x(x+2)}$.')
        },
        check: {
            prompt: say('Kalkulatu $\\frac{x}{x+3}+\\frac{1}{x}$.', 'Calcula $\\frac{x}{x+3}+\\frac{1}{x}$.', 'احسب $\\frac{x}{x+3}+\\frac{1}{x}$.', 'Work out $\\frac{x}{x+3}+\\frac{1}{x}$.'),
            options: [same('$\\frac{x^{2}+x+3}{x(x+3)}$'), same('$\\frac{x+1}{2x+3}$'), same('$\\frac{x^{2}+1}{x(x+3)}$')],
            correctIndex: 0,
            explanation: same('$\\frac{x\\cdot x+(x+3)}{x(x+3)}=\\frac{x^{2}+x+3}{x(x+3)}$')
        }
    },
    'multiply-fractions': {
        mistake: {
            wrong: same('$\\frac{x}{2}\\div\\frac{x}{4}=\\frac{x^{2}}{8}$'),
            right: say('Zatitzean bigarrenari buelta ematen zaio: $\\frac{x}{2}\\cdot\\frac{4}{x}=2$.', 'Al dividir se da la vuelta a la segunda: $\\frac{x}{2}\\cdot\\frac{4}{x}=2$.', 'عند القسمة نقلب الكسر الثاني: $\\frac{x}{2}\\cdot\\frac{4}{x}=2$.', 'When dividing, turn the second one upside down: $\\frac{x}{2}\\cdot\\frac{4}{x}=2$.')
        },
        check: {
            prompt: say('Kalkulatu $\\frac{x}{x+1}\\cdot\\frac{x+1}{x^{2}}$.', 'Calcula $\\frac{x}{x+1}\\cdot\\frac{x+1}{x^{2}}$.', 'احسب $\\frac{x}{x+1}\\cdot\\frac{x+1}{x^{2}}$.', 'Work out $\\frac{x}{x+1}\\cdot\\frac{x+1}{x^{2}}$.'),
            options: [same('$x$'), same('$\\frac{1}{x}$'), same('$\\frac{x+1}{x}$')],
            correctIndex: 1,
            explanation: say('$x+1$ eta $x$ bat kentzen dira: $\\frac{x(x+1)}{(x+1)x^{2}}=\\frac{1}{x}$.', 'Se eliminan $x+1$ y una $x$: $\\frac{x(x+1)}{(x+1)x^{2}}=\\frac{1}{x}$.', 'يُحذف $x+1$ و$x$ واحدة: $\\frac{x(x+1)}{(x+1)x^{2}}=\\frac{1}{x}$.', '$x+1$ and one $x$ cancel: $\\frac{x(x+1)}{(x+1)x^{2}}=\\frac{1}{x}$.')
        }
    },
    combined: {
        mistake: {
            wrong: same('$\\frac{1}{x}+\\frac{1}{x}\\cdot x=\\frac{2}{x}\\cdot x=2$'),
            right: say('Lehenik biderkadura: $\\frac{1}{x}+\\frac{1}{x}\\cdot x=\\frac{1}{x}+1=\\frac{1+x}{x}$.', 'Primero el producto: $\\frac{1}{x}+\\frac{1}{x}\\cdot x=\\frac{1}{x}+1=\\frac{1+x}{x}$.', 'الضرب أولًا: $\\frac{1}{x}+\\frac{1}{x}\\cdot x=\\frac{1}{x}+1=\\frac{1+x}{x}$.', 'The product first: $\\frac{1}{x}+\\frac{1}{x}\\cdot x=\\frac{1}{x}+1=\\frac{1+x}{x}$.')
        },
        check: {
            prompt: say('Txorrota batek biltegi bat $x$ ordutan betetzen du, eta beste batek $2x$ ordutan. Zer zati betetzen dute batera ordubetean?', 'Un grifo llena un depósito en $x$ horas y otro en $2x$ horas. ¿Qué parte llenan juntos en una hora?', 'صنبور يملأ خزانًا في $x$ ساعة وآخر في $2x$ ساعة. ما الجزء الذي يملآنه معًا في ساعة؟', 'One tap fills a tank in $x$ hours and another in $2x$ hours. What part do they fill together in one hour?'),
            options: [same('$\\frac{3}{2x}$'), same('$\\frac{2}{3x}$'), same('$\\frac{1}{3x}$')],
            correctIndex: 0,
            explanation: same('$\\frac{1}{x}+\\frac{1}{2x}=\\frac{2+1}{2x}=\\frac{3}{2x}$')
        }
    }
}

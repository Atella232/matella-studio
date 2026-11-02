import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Aljebra · 2. DBH — the typical mistake and the «Check it» question of
   every lesson. Plain data (no JSX) so the tests can import it; lessons.tsx
   merges it into the topics. The questions use new numbers, never those of
   «Let's solve» or of the example, and one of their wrong answers is the
   lesson's typical mistake.
   ========================================================================== */

export type AlgebraTopicId = 'language' | 'value' | 'monomial' | 'add-monomials' | 'multiply-monomials' | 'polynomial' | 'add-polynomials' | 'multiply-monomial' | 'multiply-polynomials' | 'square-sum' | 'square-difference' | 'sum-difference' | 'common-factor' | 'factor-identities' | 'mental'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value })

export const algebraLessonChecks: Record<AlgebraTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    language: {
        mistake: {
            wrong: say('5, 8, 11, 14… segida: gai bakoitzak 3 batzen du; beraz, $a_{n}=n+3$.', 'Serie 5, 8, 11, 14…: cada término suma 3, así que $a_{n}=n+3$.', 'المتتالية 5، 8، 11، 14…: كل حد يزيد 3، إذن $a_{n}=n+3$.', 'Sequence 5, 8, 11, 14…: each term adds 3, so $a_{n}=n+3$.'),
            right: say('Aldi bakoitzean 3 batzeak $3n$ ematen du: $a_{n}=3n+2$. Egiaztatu: $a_{1}=3\\cdot 1+2=5$.', 'Sumar 3 cada vez da $3n$: $a_{n}=3n+2$. Comprueba: $a_{1}=3\\cdot 1+2=5$.', 'إضافة 3 في كل مرة تعطي $3n$: $a_{n}=3n+2$. تحقّق: $a_{1}=3\\cdot 1+2=5$.', 'Adding 3 each time gives $3n$: $a_{n}=3n+2$. Check: $a_{1}=3\\cdot 1+2=5$.')
        },
        check: {
            prompt: say('Segida: 4, 9, 14, 19, … Zein da haren gai orokorra?', 'Serie: 4, 9, 14, 19, … ¿Cuál es su término general?', 'المتتالية: 4، 9، 14، 19، … ما حدّها العام؟', 'Sequence: 4, 9, 14, 19, … What is its general term?'),
            options: [same('$a_{n}=n+5$'), same('$a_{n}=5n-1$'), same('$a_{n}=5n+4$')],
            correctIndex: 1,
            explanation: say('Gai bakoitzak 5 batzen du: $5n$ agertzen da. $5\\cdot 1=5$ eta lehen gaia 4 denez, $a_{n}=5n-1$.', 'Cada término suma 5: aparece $5n$. Como $5\\cdot 1=5$ y el primero es 4, $a_{n}=5n-1$.', 'كل حد يزيد 5: يظهر $5n$. وبما أن $5\\cdot 1=5$ والحد الأول 4، فإن $a_{n}=5n-1$.', 'Each term adds 5: $5n$ appears. Since $5\\cdot 1=5$ and the first term is 4, $a_{n}=5n-1$.')
        }
    },
    value: {
        mistake: {
            wrong: say('$3x^{2}$, $x=-2$ denean: $3\\cdot -2^{2}=-12$.', '$3x^{2}$ para $x=-2$: $3\\cdot -2^{2}=-12$.', '$3x^{2}$ عندما $x=-2$: $3\\cdot -2^{2}=-12$.', '$3x^{2}$ for $x=-2$: $3\\cdot -2^{2}=-12$.'),
            right: say('Jarri negatiboa parentesi artean: $3\\cdot(-2)^{2}=3\\cdot 4=12$.', 'Pon el negativo entre paréntesis: $3\\cdot(-2)^{2}=3\\cdot 4=12$.', 'ضع العدد السالب بين قوسين: $3\\cdot(-2)^{2}=3\\cdot 4=12$.', 'Put the negative number in brackets: $3\\cdot(-2)^{2}=3\\cdot 4=12$.')
        },
        check: {
            prompt: say('Kalkulatu $2x^{2}-5x$ adierazpenaren balioa, $x=-1$ denean.', 'Calcula el valor de $2x^{2}-5x$ para $x=-1$.', 'احسب قيمة $2x^{2}-5x$ عندما $x=-1$.', 'Work out the value of $2x^{2}-5x$ for $x=-1$.'),
            options: [same('$7$'), same('$3$'), same('$-7$')],
            correctIndex: 0,
            explanation: say('$2\\cdot(-1)^{2}-5\\cdot(-1)=2\\cdot 1+5=7$. Parentesirik gabe, $-1^{2}$ zenbakiak $-1$ emango luke, eta 3 aterako litzateke.', '$2\\cdot(-1)^{2}-5\\cdot(-1)=2\\cdot 1+5=7$. Sin paréntesis, $-1^{2}$ daría $-1$ y saldría 3.', '$2\\cdot(-1)^{2}-5\\cdot(-1)=2\\cdot 1+5=7$. ولو كتبنا $-1^{2}$ بلا أقواس لأعطت $-1$ وكانت النتيجة 3.', '$2\\cdot(-1)^{2}-5\\cdot(-1)=2\\cdot 1+5=7$. Without brackets, $-1^{2}$ would give $-1$ and the answer would be 3.')
        }
    },
    monomial: {
        mistake: {
            wrong: say('$4x^{3}y$ monomioaren maila 3 da.', 'El grado de $4x^{3}y$ es 3.', 'درجة $4x^{3}y$ هي 3.', 'The degree of $4x^{3}y$ is 3.'),
            right: say('Maila letra guztien berretzaileen batura da: $y$ letrak 1 du; beraz, $3+1=4$.', 'El grado es la suma de los exponentes de todas las letras: $y$ lleva un 1, así que $3+1=4$.', 'الدرجة هي مجموع أسس كل الحروف: أس $y$ هو 1، إذن $3+1=4$.', 'The degree is the sum of the exponents of all the letters: $y$ has a 1, so $3+1=4$.')
        },
        check: {
            prompt: say('Zein da $-6a^{2}b^{3}c$ monomioaren maila?', '¿Cuál es el grado de $-6a^{2}b^{3}c$?', 'ما درجة $-6a^{2}b^{3}c$؟', 'What is the degree of $-6a^{2}b^{3}c$?'),
            options: [same('$3$'), same('$-6$'), same('$6$')],
            correctIndex: 2,
            explanation: say('Letren berretzaileak batzen dira: $2+3+1=6$. $-6$ koefizientea da, eta 3 berretzailerik handiena.', 'Se suman los exponentes de las letras: $2+3+1=6$. El $-6$ es el coeficiente y el 3, solo el mayor exponente.', 'نجمع أسس الحروف: $2+3+1=6$. أما $-6$ فهو المعامل، و3 أكبر أس فقط.', 'Add the exponents of the letters: $2+3+1=6$. $-6$ is the coefficient and 3 is only the biggest exponent.')
        }
    },
    'add-monomials': {
        mistake: {
            wrong: same('$3a+2b=5ab$'),
            right: say('$3a$ eta $2b$ ez dira antzekoak: batuketa adierazita geratzen da, $3a+2b$.', '$3a$ y $2b$ no son semejantes: la suma queda indicada, $3a+2b$.', '$3a$ و$2b$ غير متشابهين: يبقى الجمع مكتوبًا هكذا $3a+2b$.', '$3a$ and $2b$ are not like terms: the sum stays as it is, $3a+2b$.')
        },
        check: {
            prompt: say('Laburtu $4x^{2}+3x-x^{2}+2x$.', 'Reduce $4x^{2}+3x-x^{2}+2x$.', 'بسّط $4x^{2}+3x-x^{2}+2x$.', 'Simplify $4x^{2}+3x-x^{2}+2x$.'),
            options: [same('$8x^{3}$'), same('$3x^{2}+5x$'), same('$5x^{2}+5x$')],
            correctIndex: 1,
            explanation: say('Antzekoak bakarrik batzen dira: $4x^{2}-x^{2}=3x^{2}$ eta $3x+2x=5x$. Gainerakoa adierazita geratzen da.', 'Se suman solo los semejantes: $4x^{2}-x^{2}=3x^{2}$ y $3x+2x=5x$. Lo demás queda indicado.', 'نجمع المتشابهة فقط: $4x^{2}-x^{2}=3x^{2}$ و$3x+2x=5x$. ويبقى الباقي مكتوبًا.', 'Only like terms are added: $4x^{2}-x^{2}=3x^{2}$ and $3x+2x=5x$. The rest stays as it is.')
        }
    },
    'multiply-monomials': {
        mistake: {
            wrong: same('$x^{2}\\cdot x^{4}=x^{8}$'),
            right: say('Biderkatzean berretzaileak batzen dira: $x^{2}\\cdot x^{4}=x^{6}$.', 'Al multiplicar se suman los exponentes: $x^{2}\\cdot x^{4}=x^{6}$.', 'عند الضرب نجمع الأسس: $x^{2}\\cdot x^{4}=x^{6}$.', 'When multiplying, the exponents are added: $x^{2}\\cdot x^{4}=x^{6}$.')
        },
        check: {
            prompt: say('Kalkulatu $(-3a^{2}b)\\cdot(5ab^{2})$.', 'Calcula $(-3a^{2}b)\\cdot(5ab^{2})$.', 'احسب $(-3a^{2}b)\\cdot(5ab^{2})$.', 'Calculate $(-3a^{2}b)\\cdot(5ab^{2})$.'),
            options: [same('$-15a^{3}b^{3}$'), same('$-15a^{2}b^{2}$'), same('$2a^{3}b^{3}$')],
            correctIndex: 0,
            explanation: say('Koefizienteak: $(-3)\\cdot 5=-15$. Letra bereko berretzaileak batuta: $a^{2+1}b^{1+2}=a^{3}b^{3}$.', 'Coeficientes: $(-3)\\cdot 5=-15$. Exponentes de la misma letra, sumados: $a^{2+1}b^{1+2}=a^{3}b^{3}$.', 'المعاملات: $(-3)\\cdot 5=-15$. وأسس الحرف نفسه تُجمع: $a^{2+1}b^{1+2}=a^{3}b^{3}$.', 'Coefficients: $(-3)\\cdot 5=-15$. Exponents of the same letter, added: $a^{2+1}b^{1+2}=a^{3}b^{3}$.')
        }
    },
    polynomial: {
        mistake: {
            wrong: say('$P(x)=5x+x^{4}-2$ polinomioaren maila 1 da, lehen gaia $5x$ delako.', 'El grado de $P(x)=5x+x^{4}-2$ es 1, porque el primer término es $5x$.', 'درجة $P(x)=5x+x^{4}-2$ هي 1 لأن الحد الأول هو $5x$.', 'The degree of $P(x)=5x+x^{4}-2$ is 1, because the first term is $5x$.'),
            right: say('Maila gaien mailarik handiena da, edozein tokitan egonda ere: $x^{4}$ → 4 maila.', 'El grado es el mayor grado de sus términos, estén donde estén: $x^{4}$ → grado 4.', 'الدرجة هي أكبر درجة بين الحدود أينما كانت: $x^{4}$ ← الدرجة 4.', 'The degree is the highest degree of its terms, wherever they are: $x^{4}$ → degree 4.')
        },
        check: {
            prompt: say('$P(x)=x^{2}-3x+5$ bada, zenbat da $P(-2)$?', 'Si $P(x)=x^{2}-3x+5$, ¿cuánto vale $P(-2)$?', 'إذا كانت $P(x)=x^{2}-3x+5$، فكم تساوي $P(-2)$؟', 'If $P(x)=x^{2}-3x+5$, what is $P(-2)$?'),
            options: [same('$3$'), same('$7$'), same('$15$')],
            correctIndex: 2,
            explanation: say('$P(-2)=(-2)^{2}-3\\cdot(-2)+5=4+6+5=15$. Negatiboa parentesi artean doa beti.', '$P(-2)=(-2)^{2}-3\\cdot(-2)+5=4+6+5=15$. El negativo va siempre entre paréntesis.', '$P(-2)=(-2)^{2}-3\\cdot(-2)+5=4+6+5=15$. العدد السالب يوضع دائمًا بين قوسين.', '$P(-2)=(-2)^{2}-3\\cdot(-2)+5=4+6+5=15$. The negative number always goes in brackets.')
        }
    },
    'add-polynomials': {
        mistake: {
            wrong: same('$(3x^{2}+x)-(x^{2}-4x+2)=2x^{2}-3x+2$'),
            right: say('Minus baten atzeko parentesia kentzean, zeinu guztiak aldatzen dira: $3x^{2}+x-x^{2}+4x-2=2x^{2}+5x-2$.', 'Al quitar el paréntesis tras un menos cambian todos los signos: $3x^{2}+x-x^{2}+4x-2=2x^{2}+5x-2$.', 'عند حذف القوس بعد إشارة ناقص تتغيّر كل الإشارات: $3x^{2}+x-x^{2}+4x-2=2x^{2}+5x-2$.', 'When you remove brackets after a minus, every sign changes: $3x^{2}+x-x^{2}+4x-2=2x^{2}+5x-2$.')
        },
        check: {
            prompt: say('Kalkulatu $(4x^{2}-x+3)-(x^{2}-2x-1)$.', 'Calcula $(4x^{2}-x+3)-(x^{2}-2x-1)$.', 'احسب $(4x^{2}-x+3)-(x^{2}-2x-1)$.', 'Calculate $(4x^{2}-x+3)-(x^{2}-2x-1)$.'),
            options: [same('$3x^{2}+x+4$'), same('$3x^{2}-3x+2$'), same('$5x^{2}-3x+2$')],
            correctIndex: 0,
            explanation: say('Bigarrenaren zeinu guztiak aldatzen dira: $4x^{2}-x+3-x^{2}+2x+1=3x^{2}+x+4$.', 'Cambian todos los signos del segundo: $4x^{2}-x+3-x^{2}+2x+1=3x^{2}+x+4$.', 'تتغيّر كل إشارات الثاني: $4x^{2}-x+3-x^{2}+2x+1=3x^{2}+x+4$.', 'Every sign of the second one changes: $4x^{2}-x+3-x^{2}+2x+1=3x^{2}+x+4$.')
        }
    },
    'multiply-monomial': {
        mistake: {
            wrong: same('$-3x(2x^{2}-x+5)=-6x^{3}-x+5$'),
            right: say('Monomioak gai guztiak biderkatzen ditu: $-3x(2x^{2}-x+5)=-6x^{3}+3x^{2}-15x$.', 'El monomio multiplica a todos los términos: $-3x(2x^{2}-x+5)=-6x^{3}+3x^{2}-15x$.', 'وحيد الحد يضرب كل الحدود: $-3x(2x^{2}-x+5)=-6x^{3}+3x^{2}-15x$.', 'The monomial multiplies every term: $-3x(2x^{2}-x+5)=-6x^{3}+3x^{2}-15x$.')
        },
        check: {
            prompt: say('Kalkulatu $2x\\cdot(x^{2}-4x+3)$.', 'Calcula $2x\\cdot(x^{2}-4x+3)$.', 'احسب $2x\\cdot(x^{2}-4x+3)$.', 'Calculate $2x\\cdot(x^{2}-4x+3)$.'),
            options: [same('$2x^{3}-4x+3$'), same('$2x^{3}-8x^{2}+6x$'), same('$2x^{3}-8x^{2}+6$')],
            correctIndex: 1,
            explanation: say('$2x$ monomioak hiru gaiak biderkatzen ditu: $2x\\cdot x^{2}=2x^{3}$, $2x\\cdot(-4x)=-8x^{2}$ eta $2x\\cdot 3=6x$.', '$2x$ multiplica a los tres términos: $2x\\cdot x^{2}=2x^{3}$, $2x\\cdot(-4x)=-8x^{2}$ y $2x\\cdot 3=6x$.', '$2x$ يضرب الحدود الثلاثة: $2x\\cdot x^{2}=2x^{3}$ و$2x\\cdot(-4x)=-8x^{2}$ و$2x\\cdot 3=6x$.', '$2x$ multiplies all three terms: $2x\\cdot x^{2}=2x^{3}$, $2x\\cdot(-4x)=-8x^{2}$ and $2x\\cdot 3=6x$.')
        }
    },
    'multiply-polynomials': {
        mistake: {
            wrong: same('$(x+3)(x+5)=x^{2}+15$'),
            right: say('Erdiko biderketak falta dira: $(x+3)(x+5)=x^{2}+5x+3x+15=x^{2}+8x+15$.', 'Faltan los productos del medio: $(x+3)(x+5)=x^{2}+5x+3x+15=x^{2}+8x+15$.', 'تنقص عمليات الضرب في الوسط: $(x+3)(x+5)=x^{2}+5x+3x+15=x^{2}+8x+15$.', 'The middle products are missing: $(x+3)(x+5)=x^{2}+5x+3x+15=x^{2}+8x+15$.')
        },
        check: {
            prompt: say('Kalkulatu $(x-2)(x+6)$.', 'Calcula $(x-2)(x+6)$.', 'احسب $(x-2)(x+6)$.', 'Calculate $(x-2)(x+6)$.'),
            options: [same('$x^{2}-12$'), same('$x^{2}-4x-12$'), same('$x^{2}+4x-12$')],
            correctIndex: 2,
            explanation: say('4 biderketa: $x^{2}+6x-2x-12=x^{2}+4x-12$.', '4 productos: $x^{2}+6x-2x-12=x^{2}+4x-12$.', '4 عمليات ضرب: $x^{2}+6x-2x-12=x^{2}+4x-12$.', '4 products: $x^{2}+6x-2x-12=x^{2}+4x-12$.')
        }
    },
    'square-sum': {
        mistake: {
            wrong: same('$(x+4)^{2}=x^{2}+16$'),
            right: say('Biderkaduraren bikoitza falta da: $(x+4)^{2}=x^{2}+8x+16$.', 'Falta el doble del producto: $(x+4)^{2}=x^{2}+8x+16$.', 'ينقص ضعف الجداء: $(x+4)^{2}=x^{2}+8x+16$.', 'Twice the product is missing: $(x+4)^{2}=x^{2}+8x+16$.')
        },
        check: {
            prompt: say('Garatu $(2x+5)^{2}$.', 'Desarrolla $(2x+5)^{2}$.', 'انشر $(2x+5)^{2}$.', 'Expand $(2x+5)^{2}$.'),
            options: [same('$4x^{2}+20x+25$'), same('$4x^{2}+25$'), same('$2x^{2}+10x+25$')],
            correctIndex: 0,
            explanation: say('$(2x)^{2}=4x^{2}$, $2\\cdot 2x\\cdot 5=20x$ eta $5^{2}=25$.', '$(2x)^{2}=4x^{2}$, $2\\cdot 2x\\cdot 5=20x$ y $5^{2}=25$.', '$(2x)^{2}=4x^{2}$ و$2\\cdot 2x\\cdot 5=20x$ و$5^{2}=25$.', '$(2x)^{2}=4x^{2}$, $2\\cdot 2x\\cdot 5=20x$ and $5^{2}=25$.')
        }
    },
    'square-difference': {
        mistake: {
            wrong: same('$(x-6)^{2}=x^{2}-12x-36$'),
            right: say('Azken gaia karratu bat da, eta beti positiboa: $(x-6)^{2}=x^{2}-12x+36$.', 'El último término es un cuadrado y siempre es positivo: $(x-6)^{2}=x^{2}-12x+36$.', 'الحد الأخير مربع، فهو موجب دائمًا: $(x-6)^{2}=x^{2}-12x+36$.', 'The last term is a square, so it is always positive: $(x-6)^{2}=x^{2}-12x+36$.')
        },
        check: {
            prompt: say('Garatu $(3x-1)^{2}$.', 'Desarrolla $(3x-1)^{2}$.', 'انشر $(3x-1)^{2}$.', 'Expand $(3x-1)^{2}$.'),
            options: [same('$9x^{2}-6x-1$'), same('$9x^{2}-6x+1$'), same('$9x^{2}+1$')],
            correctIndex: 1,
            explanation: say('$(3x)^{2}=9x^{2}$, $-2\\cdot 3x\\cdot 1=-6x$ eta $1^{2}=1$, positiboa. Erdikoa bakarrik da negatiboa.', '$(3x)^{2}=9x^{2}$, $-2\\cdot 3x\\cdot 1=-6x$ y $1^{2}=1$, positivo. Solo el del medio es negativo.', '$(3x)^{2}=9x^{2}$ و$-2\\cdot 3x\\cdot 1=-6x$ و$1^{2}=1$ موجب. الأوسط وحده سالب.', '$(3x)^{2}=9x^{2}$, $-2\\cdot 3x\\cdot 1=-6x$ and $1^{2}=1$, positive. Only the middle one is negative.')
        }
    },
    'sum-difference': {
        mistake: {
            wrong: same('$(x+7)(x-7)=x^{2}+49$'),
            right: say('Erdiko gaiak ezabatu egiten dira, eta kendura bat geratzen da: $(x+7)(x-7)=x^{2}-49$.', 'Los términos del medio se anulan y queda una diferencia: $(x+7)(x-7)=x^{2}-49$.', 'يُلغى الحدّان الأوسطان ويبقى فرق: $(x+7)(x-7)=x^{2}-49$.', 'The middle terms cancel out and a difference is left: $(x+7)(x-7)=x^{2}-49$.')
        },
        check: {
            prompt: say('Kalkulatu $(5x+2)(5x-2)$.', 'Calcula $(5x+2)(5x-2)$.', 'احسب $(5x+2)(5x-2)$.', 'Calculate $(5x+2)(5x-2)$.'),
            options: [same('$25x^{2}+4$'), same('$5x^{2}-4$'), same('$25x^{2}-4$')],
            correctIndex: 2,
            explanation: say('Karratuen kendura: $(5x)^{2}-2^{2}=25x^{2}-4$. Koefizientea ere karratura jasotzen da.', 'Diferencia de cuadrados: $(5x)^{2}-2^{2}=25x^{2}-4$. El coeficiente también se eleva al cuadrado.', 'فرق مربعين: $(5x)^{2}-2^{2}=25x^{2}-4$. والمعامل يُربَّع أيضًا.', 'Difference of squares: $(5x)^{2}-2^{2}=25x^{2}-4$. The coefficient is squared too.')
        }
    },
    'common-factor': {
        mistake: {
            wrong: same('$6x^{2}+3x=3x(2x)$'),
            right: say('$3x$ gaitik $3x$ ateratzean 1 geratzen da: $6x^{2}+3x=3x(2x+1)$. Egiaztatu biderkatuz.', 'Al sacar $3x$ del término $3x$ queda 1: $6x^{2}+3x=3x(2x+1)$. Comprueba multiplicando.', 'عند إخراج $3x$ من الحد $3x$ يبقى 1: $6x^{2}+3x=3x(2x+1)$. تحقّق بالضرب.', 'Taking $3x$ out of the term $3x$ leaves 1: $6x^{2}+3x=3x(2x+1)$. Check by multiplying.')
        },
        check: {
            prompt: say('Atera faktore komuna: $10x^{3}-15x^{2}$.', 'Saca factor común: $10x^{3}-15x^{2}$.', 'أخرج العامل المشترك: $10x^{3}-15x^{2}$.', 'Take out the common factor: $10x^{3}-15x^{2}$.'),
            options: [same('$5x^{2}(2x-3)$'), same('$5x(2x^{2}-3)$'), same('$10x^{2}(x-15)$')],
            correctIndex: 0,
            explanation: say('10 eta 15 zenbakien ZKH 5 da, eta letra komuna, berretzaile txikienarekin, $x^{2}$. Egiaztatu: $5x^{2}\\cdot 2x-5x^{2}\\cdot 3=10x^{3}-15x^{2}$.', 'El m.c.d. de 10 y 15 es 5, y la letra común con el menor exponente, $x^{2}$. Comprueba: $5x^{2}\\cdot 2x-5x^{2}\\cdot 3=10x^{3}-15x^{2}$.', 'القاسم المشترك الأكبر للعددين 10 و15 هو 5، والحرف المشترك بأصغر أس هو $x^{2}$. تحقّق: $5x^{2}\\cdot 2x-5x^{2}\\cdot 3=10x^{3}-15x^{2}$.', 'The GCD of 10 and 15 is 5, and the common letter with the smallest exponent is $x^{2}$. Check: $5x^{2}\\cdot 2x-5x^{2}\\cdot 3=10x^{3}-15x^{2}$.')
        }
    },
    'factor-identities': {
        mistake: {
            wrong: same('$x^{2}-9=(x-3)^{2}$'),
            right: say('Karratuen kendura bat da, ez karratu bat: $x^{2}-9=(x+3)(x-3)$. Egiaztatu: $(x-3)^{2}=x^{2}-6x+9$.', 'Es una diferencia de cuadrados, no un cuadrado: $x^{2}-9=(x+3)(x-3)$. Comprueba: $(x-3)^{2}=x^{2}-6x+9$.', 'إنه فرق مربعين لا مربع: $x^{2}-9=(x+3)(x-3)$. تحقّق: $(x-3)^{2}=x^{2}-6x+9$.', 'It is a difference of squares, not a square: $x^{2}-9=(x+3)(x-3)$. Check: $(x-3)^{2}=x^{2}-6x+9$.')
        },
        check: {
            prompt: say('Idatzi biderkadura gisa: $x^{2}-10x+25$.', 'Escribe como producto: $x^{2}-10x+25$.', 'اكتب على شكل جداء: $x^{2}-10x+25$.', 'Write as a product: $x^{2}-10x+25$.'),
            options: [same('$(x+5)(x-5)$'), same('$(x-25)^{2}$'), same('$(x-5)^{2}$')],
            correctIndex: 2,
            explanation: say('Bi karratu, $x^{2}$ eta $25=5^{2}$, eta erdikoa $2\\cdot x\\cdot 5=10x$ da, minusarekin: $(x-5)^{2}$.', 'Dos cuadrados, $x^{2}$ y $25=5^{2}$, y el del medio es $2\\cdot x\\cdot 5=10x$, con menos: $(x-5)^{2}$.', 'مربعان $x^{2}$ و$25=5^{2}$، والأوسط $2\\cdot x\\cdot 5=10x$ بإشارة ناقص: $(x-5)^{2}$.', 'Two squares, $x^{2}$ and $25=5^{2}$, and the middle one is $2\\cdot x\\cdot 5=10x$, with a minus: $(x-5)^{2}$.')
        }
    },
    mental: {
        mistake: {
            wrong: same('$51^{2}=50^{2}+1^{2}=2501$'),
            right: say('Biderkaduraren bikoitza falta da: $51^{2}=2500+100+1=2601$.', 'Falta el doble del producto: $51^{2}=2500+100+1=2601$.', 'ينقص ضعف الجداء: $51^{2}=2500+100+1=2601$.', 'Twice the product is missing: $51^{2}=2500+100+1=2601$.')
        },
        check: {
            prompt: say('Kalkulatu buruz $201\\cdot 199$.', 'Calcula de cabeza $201\\cdot 199$.', 'احسب ذهنيًا $201\\cdot 199$.', 'Work out $201\\cdot 199$ in your head.'),
            options: [same('$40\\,000$'), same('$39\\,999$'), same('$40\\,001$')],
            correctIndex: 1,
            explanation: say('Batura bider kendura: $(200+1)(200-1)=200^{2}-1^{2}=40\\,000-1=39\\,999$.', 'Suma por diferencia: $(200+1)(200-1)=200^{2}-1^{2}=40\\,000-1=39\\,999$.', 'مجموع في فرق: $(200+1)(200-1)=200^{2}-1^{2}=40\\,000-1=39\\,999$.', 'Sum times difference: $(200+1)(200-1)=200^{2}-1^{2}=40\\,000-1=39\\,999$.')
        }
    }
}

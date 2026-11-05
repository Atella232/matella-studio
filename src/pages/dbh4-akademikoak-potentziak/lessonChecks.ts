import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Berreturak, erroak eta logaritmoak · 4. DBH akademikoak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no JSX)
   so the tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the example,
   and one of their wrong answers is the lesson's typical mistake.
   ========================================================================== */

export type PowersTopicId = 'integer-powers' | 'power-rules' | 'scientific' | 'roots' | 'fractional' | 'equivalent' | 'extract' | 'add-radicals' | 'multiply-radicals' | 'rationalize-square' | 'rationalize-index' | 'conjugate' | 'log-definition' | 'log-properties' | 'change-base'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const powersLessonChecks: Record<PowersTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'integer-powers': {
        mistake: {
            wrong: say('$3^{-2}=-9$', '$3^{-2}=-9$', '$3^{-2}=-9$', '$3^{-2}=-9$'),
            right: say('Berretzaile negatiboak ez du zeinua aldatzen, alderantzizkoa ematen du: $3^{-2}=\\frac{1}{9}$.', 'El exponente negativo no cambia el signo, da el inverso: $3^{-2}=\\frac{1}{9}$.', 'الأس السالب لا يغيّر الإشارة بل يعطي المقلوب: $3^{-2}=\\frac{1}{9}$.', 'A negative exponent does not change the sign, it gives the reciprocal: $3^{-2}=\\frac{1}{9}$.')
        },
        check: {
            prompt: say('Zenbat da $(-2)^{-4}$?', '¿Cuánto vale $(-2)^{-4}$?', 'كم يساوي $(-2)^{-4}$؟', 'What is $(-2)^{-4}$?'),
            options: [same('$\\frac{1}{16}$'), same('$-\\frac{1}{16}$'), same('$-16$')],
            correctIndex: 0,
            explanation: say('Berretzaile bikoitia: positiboa. Negatiboa: alderantzizkoa. $(-2)^{-4}=\\frac{1}{(-2)^{4}}=\\frac{1}{16}$.', 'Exponente par: positivo. Negativo: el inverso. $(-2)^{-4}=\\frac{1}{(-2)^{4}}=\\frac{1}{16}$.', 'أس زوجي: موجب. وسالب: المقلوب. $(-2)^{-4}=\\frac{1}{(-2)^{4}}=\\frac{1}{16}$.', 'Even exponent: positive. Negative: the reciprocal. $(-2)^{-4}=\\frac{1}{(-2)^{4}}=\\frac{1}{16}$.')
        }
    },
    'power-rules': {
        mistake: {
            wrong: say('$5^{2}\\cdot 5^{3}=5^{6}$', '$5^{2}\\cdot 5^{3}=5^{6}$', '$5^{2}\\cdot 5^{3}=5^{6}$', '$5^{2}\\cdot 5^{3}=5^{6}$'),
            right: say('Biderkatzean berretzaileak batzen dira: $5^{2}\\cdot 5^{3}=5^{5}$. Berreturaren berreturan biderkatzen dira: $(5^{2})^{3}=5^{6}$.', 'Al multiplicar se suman los exponentes: $5^{2}\\cdot 5^{3}=5^{5}$. Se multiplican en la potencia de potencia: $(5^{2})^{3}=5^{6}$.', 'عند الضرب تُجمع الأسس: $5^{2}\\cdot 5^{3}=5^{5}$. وتُضرب في قوة القوة: $(5^{2})^{3}=5^{6}$.', 'When multiplying, add the exponents: $5^{2}\\cdot 5^{3}=5^{5}$. You multiply them in a power of a power: $(5^{2})^{3}=5^{6}$.')
        },
        check: {
            prompt: say('Zenbat da $\\frac{3^{5}\\cdot 3^{-2}}{3^{4}}$?', '¿Cuánto vale $\\frac{3^{5}\\cdot 3^{-2}}{3^{4}}$?', 'كم يساوي $\\frac{3^{5}\\cdot 3^{-2}}{3^{4}}$؟', 'What is $\\frac{3^{5}\\cdot 3^{-2}}{3^{4}}$?'),
            options: [same('$3^{-14}$'), same('$\\frac{1}{3}$'), same('$3$')],
            correctIndex: 1,
            explanation: same('$3^{5-2-4}=3^{-1}=\\frac{1}{3}$')
        }
    },
    scientific: {
        mistake: {
            wrong: say('$2\\cdot 10^{3}+5\\cdot 10^{3}=7\\cdot 10^{6}$', '$2\\cdot 10^{3}+5\\cdot 10^{3}=7\\cdot 10^{6}$', '$2\\cdot 10^{3}+5\\cdot 10^{3}=7\\cdot 10^{6}$', '$2\\cdot 10^{3}+5\\cdot 10^{3}=7\\cdot 10^{6}$'),
            right: say('Batzean ez dira berretzaileak batzen: $2\\cdot 10^{3}+5\\cdot 10^{3}=7\\cdot 10^{3}$.', 'Al sumar no se suman los exponentes: $2\\cdot 10^{3}+5\\cdot 10^{3}=7\\cdot 10^{3}$.', 'عند الجمع لا تُجمع الأسس: $2\\cdot 10^{3}+5\\cdot 10^{3}=7\\cdot 10^{3}$.', 'When adding, the exponents are not added: $2\\cdot 10^{3}+5\\cdot 10^{3}=7\\cdot 10^{3}$.')
        },
        check: {
            prompt: say('Zenbat da $(5\\cdot 10^{-3})\\cdot(6\\cdot 10^{8})$?', '¿Cuánto es $(5\\cdot 10^{-3})\\cdot(6\\cdot 10^{8})$?', 'كم يساوي $(5\\cdot 10^{-3})\\cdot(6\\cdot 10^{8})$؟', 'What is $(5\\cdot 10^{-3})\\cdot(6\\cdot 10^{8})$?'),
            options: [same('$3\\cdot 10^{5}$'), same('$3\\cdot 10^{-24}$'), same('$3\\cdot 10^{6}$')],
            correctIndex: 2,
            explanation: say('$5\\cdot 6=30$ eta $10^{-3+8}=10^{5}$: $30\\cdot 10^{5}=3\\cdot 10^{6}$.', '$5\\cdot 6=30$ y $10^{-3+8}=10^{5}$: $30\\cdot 10^{5}=3\\cdot 10^{6}$.', '$5\\cdot 6=30$ و$10^{-3+8}=10^{5}$: $30\\cdot 10^{5}=3\\cdot 10^{6}$.', '$5\\cdot 6=30$ and $10^{-3+8}=10^{5}$: $30\\cdot 10^{5}=3\\cdot 10^{6}$.')
        }
    },
    roots: {
        mistake: {
            wrong: say('$\\sqrt{-49}=-7$', '$\\sqrt{-49}=-7$', '$\\sqrt{-49}=-7$', '$\\sqrt{-49}=-7$'),
            right: say('$(-7)^{2}=49$, ez $-49$: indize bikoitiarekin eta errokizun negatiboarekin ez dago erro errealik.', '$(-7)^{2}=49$, no $-49$: con índice par y radicando negativo no hay raíz real.', '$(-7)^{2}=49$ وليس $-49$: مع دليل زوجي وما تحت الجذر سالب لا يوجد جذر حقيقي.', '$(-7)^{2}=49$, not $-49$: with an even index and a negative radicand there is no real root.')
        },
        check: {
            prompt: say('Zenbat erro erreal ditu $\\sqrt[3]{-27}$ erroak?', '¿Cuántas raíces reales tiene $\\sqrt[3]{-27}$?', 'كم جذرًا حقيقيًا لـ $\\sqrt[3]{-27}$؟', 'How many real roots does $\\sqrt[3]{-27}$ have?'),
            options: [
                say('Bat: $-3$', 'Una: $-3$', 'واحد: $-3$', 'One: $-3$'),
                say('Bi: $\\pm 3$', 'Dos: $\\pm 3$', 'اثنان: $\\pm 3$', 'Two: $\\pm 3$'),
                say('Bat ere ez', 'Ninguna', 'لا شيء', 'None')
            ],
            correctIndex: 0,
            explanation: say('Indize bakoitia: erro bakarra, errokizunaren zeinuarekin. $(-3)^{3}=-27$.', 'Índice impar: una sola raíz, con el signo del radicando. $(-3)^{3}=-27$.', 'دليل فردي: جذر واحد له إشارة ما تحت الجذر. $(-3)^{3}=-27$.', 'Odd index: only one root, with the sign of the radicand. $(-3)^{3}=-27$.')
        }
    },
    fractional: {
        mistake: {
            wrong: say('$25^{\\frac{1}{2}}=\\frac{25}{2}$', '$25^{\\frac{1}{2}}=\\frac{25}{2}$', '$25^{\\frac{1}{2}}=\\frac{25}{2}$', '$25^{\\frac{1}{2}}=\\frac{25}{2}$'),
            right: say('$\\frac{1}{2}$ berretzailea erro karratu bat da: $25^{\\frac{1}{2}}=\\sqrt{25}=5$.', 'El exponente $\\frac{1}{2}$ es una raíz cuadrada: $25^{\\frac{1}{2}}=\\sqrt{25}=5$.', 'الأس $\\frac{1}{2}$ جذر تربيعي: $25^{\\frac{1}{2}}=\\sqrt{25}=5$.', 'The exponent $\\frac{1}{2}$ is a square root: $25^{\\frac{1}{2}}=\\sqrt{25}=5$.')
        },
        check: {
            prompt: say('Zenbat da $32^{\\frac{3}{5}}$?', '¿Cuánto vale $32^{\\frac{3}{5}}$?', 'كم يساوي $32^{\\frac{3}{5}}$؟', 'What is $32^{\\frac{3}{5}}$?'),
            options: [same('$\\frac{96}{5}$'), same('$8$'), same('$6$')],
            correctIndex: 1,
            explanation: same('$32^{\\frac{3}{5}}=(\\sqrt[5]{32})^{3}=2^{3}=8$')
        }
    },
    equivalent: {
        mistake: {
            wrong: say('$\\sqrt{5}$ eta $\\sqrt[3]{11}$ konparatzeko: $11>5$, beraz $\\sqrt[3]{11}$ da handiagoa.', 'Para comparar $\\sqrt{5}$ y $\\sqrt[3]{11}$: como $11>5$, es mayor $\\sqrt[3]{11}$.', 'لمقارنة $\\sqrt{5}$ و$\\sqrt[3]{11}$: بما أن $11>5$ فإن $\\sqrt[3]{11}$ أكبر.', 'To compare $\\sqrt{5}$ and $\\sqrt[3]{11}$: since $11>5$, $\\sqrt[3]{11}$ is greater.'),
            right: say('Lehenik indize komuna, 6: $\\sqrt[6]{125}$ eta $\\sqrt[6]{121}$; beraz $\\sqrt{5}>\\sqrt[3]{11}$.', 'Primero índice común, 6: $\\sqrt[6]{125}$ y $\\sqrt[6]{121}$, así que $\\sqrt{5}>\\sqrt[3]{11}$.', 'أولًا الدليل المشترك 6: $\\sqrt[6]{125}$ و$\\sqrt[6]{121}$، إذن $\\sqrt{5}>\\sqrt[3]{11}$.', 'First a common index, 6: $\\sqrt[6]{125}$ and $\\sqrt[6]{121}$, so $\\sqrt{5}>\\sqrt[3]{11}$.')
        },
        check: {
            prompt: say('Zein erradikal da $\\sqrt[4]{7^{2}}$ erradikalaren baliokidea?', '¿Qué radical es equivalente a $\\sqrt[4]{7^{2}}$?', 'أيّ جذر يكافئ $\\sqrt[4]{7^{2}}$؟', 'Which radical is equivalent to $\\sqrt[4]{7^{2}}$?'),
            options: [same('$\\sqrt{7^{2}}$'), same('$\\sqrt[4]{7}$'), same('$\\sqrt{7}$')],
            correctIndex: 2,
            explanation: say('Zatitu indizea eta berretzailea 2 zenbakiaz: $\\sqrt[4]{7^{2}}=\\sqrt{7}$.', 'Divide el índice y el exponente entre 2: $\\sqrt[4]{7^{2}}=\\sqrt{7}$.', 'اقسم الدليل والأس على 2: $\\sqrt[4]{7^{2}}=\\sqrt{7}$.', 'Divide the index and the exponent by 2: $\\sqrt[4]{7^{2}}=\\sqrt{7}$.')
        }
    },
    extract: {
        mistake: {
            wrong: say('$\\sqrt{50}=25\\sqrt{2}$', '$\\sqrt{50}=25\\sqrt{2}$', '$\\sqrt{50}=25\\sqrt{2}$', '$\\sqrt{50}=25\\sqrt{2}$'),
            right: say('$50=5^{2}\\cdot 2$: oinarria ateratzen da, $5$, ez $5^{2}$: $\\sqrt{50}=5\\sqrt{2}$.', '$50=5^{2}\\cdot 2$: sale la base, $5$, no $5^{2}$: $\\sqrt{50}=5\\sqrt{2}$.', '$50=5^{2}\\cdot 2$: يخرج الأساس $5$ لا $5^{2}$: $\\sqrt{50}=5\\sqrt{2}$.', '$50=5^{2}\\cdot 2$: the base comes out, $5$, not $5^{2}$: $\\sqrt{50}=5\\sqrt{2}$.')
        },
        check: {
            prompt: say('Nola geratzen da $\\sqrt{48}$ sinplifikatuta?', '¿Cómo queda $\\sqrt{48}$ simplificada?', 'كيف يصبح $\\sqrt{48}$ بعد التبسيط؟', 'What is $\\sqrt{48}$ simplified?'),
            options: [same('$16\\sqrt{3}$'), same('$4\\sqrt{3}$'), same('$3\\sqrt{4}$')],
            correctIndex: 1,
            explanation: say('$48=4^{2}\\cdot 3$: 4 ateratzen da, $\\sqrt{48}=4\\sqrt{3}$.', '$48=4^{2}\\cdot 3$: sale el 4, $\\sqrt{48}=4\\sqrt{3}$.', '$48=4^{2}\\cdot 3$: يخرج 4، $\\sqrt{48}=4\\sqrt{3}$.', '$48=4^{2}\\cdot 3$: the 4 comes out, $\\sqrt{48}=4\\sqrt{3}$.')
        }
    },
    'add-radicals': {
        mistake: {
            wrong: say('$\\sqrt{9}+\\sqrt{16}=\\sqrt{25}=5$', '$\\sqrt{9}+\\sqrt{16}=\\sqrt{25}=5$', '$\\sqrt{9}+\\sqrt{16}=\\sqrt{25}=5$', '$\\sqrt{9}+\\sqrt{16}=\\sqrt{25}=5$'),
            right: say('Erroak ez dira errokizunak batuz batzen: $\\sqrt{9}+\\sqrt{16}=3+4=7$.', 'Las raíces no se suman sumando los radicandos: $\\sqrt{9}+\\sqrt{16}=3+4=7$.', 'لا تُجمع الجذور بجمع ما تحتها: $\\sqrt{9}+\\sqrt{16}=3+4=7$.', 'Roots are not added by adding the radicands: $\\sqrt{9}+\\sqrt{16}=3+4=7$.')
        },
        check: {
            prompt: say('Zenbat da $\\sqrt{8}+\\sqrt{32}$?', '¿Cuánto es $\\sqrt{8}+\\sqrt{32}$?', 'كم يساوي $\\sqrt{8}+\\sqrt{32}$؟', 'What is $\\sqrt{8}+\\sqrt{32}$?'),
            options: [same('$\\sqrt{40}$'), same('$6\\sqrt{2}$'), same('$4\\sqrt{2}$')],
            correctIndex: 1,
            explanation: same('$\\sqrt{8}+\\sqrt{32}=2\\sqrt{2}+4\\sqrt{2}=6\\sqrt{2}$')
        }
    },
    'multiply-radicals': {
        mistake: {
            wrong: say('$\\sqrt{2}\\cdot\\sqrt[3]{5}=\\sqrt[3]{10}$', '$\\sqrt{2}\\cdot\\sqrt[3]{5}=\\sqrt[3]{10}$', '$\\sqrt{2}\\cdot\\sqrt[3]{5}=\\sqrt[3]{10}$', '$\\sqrt{2}\\cdot\\sqrt[3]{5}=\\sqrt[3]{10}$'),
            right: say('Lehenik indize komuna, 6: $\\sqrt[6]{2^{3}}\\cdot\\sqrt[6]{5^{2}}=\\sqrt[6]{200}$.', 'Primero índice común, 6: $\\sqrt[6]{2^{3}}\\cdot\\sqrt[6]{5^{2}}=\\sqrt[6]{200}$.', 'أولًا الدليل المشترك 6: $\\sqrt[6]{2^{3}}\\cdot\\sqrt[6]{5^{2}}=\\sqrt[6]{200}$.', 'First a common index, 6: $\\sqrt[6]{2^{3}}\\cdot\\sqrt[6]{5^{2}}=\\sqrt[6]{200}$.')
        },
        check: {
            prompt: say('Zenbat da $\\sqrt[3]{\\sqrt{64}}$?', '¿Cuánto vale $\\sqrt[3]{\\sqrt{64}}$?', 'كم يساوي $\\sqrt[3]{\\sqrt{64}}$؟', 'What is $\\sqrt[3]{\\sqrt{64}}$?'),
            options: [same('$\\sqrt[5]{64}$'), same('$8$'), same('$2$')],
            correctIndex: 2,
            explanation: say('Indizeak biderkatzen dira: $\\sqrt[3]{\\sqrt{64}}=\\sqrt[6]{64}=2$, $2^{6}=64$ delako.', 'Se multiplican los índices: $\\sqrt[3]{\\sqrt{64}}=\\sqrt[6]{64}=2$, porque $2^{6}=64$.', 'تُضرب الأدلة: $\\sqrt[3]{\\sqrt{64}}=\\sqrt[6]{64}=2$ لأن $2^{6}=64$.', 'The indices are multiplied: $\\sqrt[3]{\\sqrt{64}}=\\sqrt[6]{64}=2$, because $2^{6}=64$.')
        }
    },
    'rationalize-square': {
        mistake: {
            wrong: say('$\\frac{4}{\\sqrt{2}}=\\frac{4\\sqrt{2}}{\\sqrt{2}}$', '$\\frac{4}{\\sqrt{2}}=\\frac{4\\sqrt{2}}{\\sqrt{2}}$', '$\\frac{4}{\\sqrt{2}}=\\frac{4\\sqrt{2}}{\\sqrt{2}}$', '$\\frac{4}{\\sqrt{2}}=\\frac{4\\sqrt{2}}{\\sqrt{2}}$'),
            right: say('Goian eta behean biderkatu behar da: $\\frac{4\\sqrt{2}}{\\sqrt{2}\\cdot\\sqrt{2}}=\\frac{4\\sqrt{2}}{2}=2\\sqrt{2}$.', 'Hay que multiplicar arriba y abajo: $\\frac{4\\sqrt{2}}{\\sqrt{2}\\cdot\\sqrt{2}}=\\frac{4\\sqrt{2}}{2}=2\\sqrt{2}$.', 'يجب الضرب في البسط والمقام: $\\frac{4\\sqrt{2}}{\\sqrt{2}\\cdot\\sqrt{2}}=\\frac{4\\sqrt{2}}{2}=2\\sqrt{2}$.', 'You must multiply top and bottom: $\\frac{4\\sqrt{2}}{\\sqrt{2}\\cdot\\sqrt{2}}=\\frac{4\\sqrt{2}}{2}=2\\sqrt{2}$.')
        },
        check: {
            prompt: say('Nola geratzen da $\\frac{14}{\\sqrt{7}}$ arrazionalizatuta?', '¿Cómo queda $\\frac{14}{\\sqrt{7}}$ racionalizada?', 'كيف يصبح $\\frac{14}{\\sqrt{7}}$ بعد إنطاق مقامه؟', 'What is $\\frac{14}{\\sqrt{7}}$ rationalised?'),
            options: [same('$2\\sqrt{7}$'), same('$\\frac{14\\sqrt{7}}{49}$'), same('$14\\sqrt{7}$')],
            correctIndex: 0,
            explanation: same('$\\frac{14\\sqrt{7}}{\\sqrt{7}\\cdot\\sqrt{7}}=\\frac{14\\sqrt{7}}{7}=2\\sqrt{7}$')
        }
    },
    'rationalize-index': {
        mistake: {
            wrong: say('$\\frac{1}{\\sqrt[3]{5}}=\\frac{\\sqrt[3]{5}}{5}$', '$\\frac{1}{\\sqrt[3]{5}}=\\frac{\\sqrt[3]{5}}{5}$', '$\\frac{1}{\\sqrt[3]{5}}=\\frac{\\sqrt[3]{5}}{5}$', '$\\frac{1}{\\sqrt[3]{5}}=\\frac{\\sqrt[3]{5}}{5}$'),
            right: say('$\\sqrt[3]{5}\\cdot\\sqrt[3]{5}=\\sqrt[3]{25}$, ez 5: $\\sqrt[3]{5^{2}}$ erroaz biderkatu behar da, eta $\\frac{\\sqrt[3]{25}}{5}$ geratzen da.', '$\\sqrt[3]{5}\\cdot\\sqrt[3]{5}=\\sqrt[3]{25}$, no 5: hay que multiplicar por $\\sqrt[3]{5^{2}}$, y queda $\\frac{\\sqrt[3]{25}}{5}$.', '$\\sqrt[3]{5}\\cdot\\sqrt[3]{5}=\\sqrt[3]{25}$ وليس 5: يجب الضرب في $\\sqrt[3]{5^{2}}$، فيصبح $\\frac{\\sqrt[3]{25}}{5}$.', '$\\sqrt[3]{5}\\cdot\\sqrt[3]{5}=\\sqrt[3]{25}$, not 5: you must multiply by $\\sqrt[3]{5^{2}}$, which gives $\\frac{\\sqrt[3]{25}}{5}$.')
        },
        check: {
            prompt: say('Zerez biderkatu behar dira goia eta behea $\\frac{1}{\\sqrt[5]{2^{3}}}$ arrazionalizatzeko?', '¿Por qué factor hay que multiplicar arriba y abajo para racionalizar $\\frac{1}{\\sqrt[5]{2^{3}}}$?', 'في أيّ عدد نضرب لإنطاق مقام $\\frac{1}{\\sqrt[5]{2^{3}}}$؟', 'What do you multiply by to rationalise $\\frac{1}{\\sqrt[5]{2^{3}}}$?'),
            options: [same('$\\sqrt[5]{2^{3}}$'), same('$\\sqrt[5]{2^{2}}$'), same('$\\sqrt[5]{2}$')],
            correctIndex: 1,
            explanation: say('$3+2=5$: $\\sqrt[5]{2^{3}}\\cdot\\sqrt[5]{2^{2}}=\\sqrt[5]{2^{5}}=2$.', '$3+2=5$: $\\sqrt[5]{2^{3}}\\cdot\\sqrt[5]{2^{2}}=\\sqrt[5]{2^{5}}=2$.', '$3+2=5$: $\\sqrt[5]{2^{3}}\\cdot\\sqrt[5]{2^{2}}=\\sqrt[5]{2^{5}}=2$.', '$3+2=5$: $\\sqrt[5]{2^{3}}\\cdot\\sqrt[5]{2^{2}}=\\sqrt[5]{2^{5}}=2$.')
        }
    },
    conjugate: {
        mistake: {
            wrong: say('$\\frac{1}{\\sqrt{5}-2}$ arrazionalizatzeko, $\\sqrt{5}$ erroaz biderkatzen dut.', 'Para racionalizar $\\frac{1}{\\sqrt{5}-2}$, multiplico por $\\sqrt{5}$.', 'لإنطاق مقام $\\frac{1}{\\sqrt{5}-2}$ أضرب في $\\sqrt{5}$.', 'To rationalise $\\frac{1}{\\sqrt{5}-2}$, I multiply by $\\sqrt{5}$.'),
            right: say('$\\sqrt{5}$ erroarekin erroa ez da joaten: $(\\sqrt{5}-2)\\sqrt{5}=5-2\\sqrt{5}$. Biderkatu $\\sqrt{5}+2$ konjokatuaz: izendatzailea $5-4=1$ da.', 'Con $\\sqrt{5}$ la raíz no se va: $(\\sqrt{5}-2)\\sqrt{5}=5-2\\sqrt{5}$. Multiplica por el conjugado $\\sqrt{5}+2$: el denominador queda $5-4=1$.', 'مع $\\sqrt{5}$ لا يختفي الجذر: $(\\sqrt{5}-2)\\sqrt{5}=5-2\\sqrt{5}$. اضرب في المرافق $\\sqrt{5}+2$: فيصير المقام $5-4=1$.', 'With $\\sqrt{5}$ the root does not go away: $(\\sqrt{5}-2)\\sqrt{5}=5-2\\sqrt{5}$. Multiply by the conjugate $\\sqrt{5}+2$: the denominator becomes $5-4=1$.')
        },
        check: {
            prompt: say('$\\frac{3}{4-\\sqrt{2}}$ arrazionalizatu nahi da. Zerez biderkatzen da $4-\\sqrt{2}$ izendatzailea?', 'Se quiere racionalizar $\\frac{3}{4-\\sqrt{2}}$. ¿Por qué factor se multiplica el denominador $4-\\sqrt{2}$?', 'نريد إنطاق مقام $\\frac{3}{4-\\sqrt{2}}$. في أيّ عدد نضرب المقام $4-\\sqrt{2}$؟', 'You want to rationalise $\\frac{3}{4-\\sqrt{2}}$. What do you multiply the denominator $4-\\sqrt{2}$ by?'),
            options: [same('$4+\\sqrt{2}$'), same('$\\sqrt{2}$'), same('$4-\\sqrt{2}$')],
            correctIndex: 0,
            explanation: say('$(4-\\sqrt{2})(4+\\sqrt{2})=16-2=14$: errorik gabe.', '$(4-\\sqrt{2})(4+\\sqrt{2})=16-2=14$: sin raíces.', '$(4-\\sqrt{2})(4+\\sqrt{2})=16-2=14$: دون جذور.', '$(4-\\sqrt{2})(4+\\sqrt{2})=16-2=14$: no roots.')
        }
    },
    'log-definition': {
        mistake: {
            wrong: say('$\\log_2 16=8$, $16\\div 2=8$ delako.', '$\\log_2 16=8$, porque $16\\div 2=8$.', '$\\log_2 16=8$ لأن $16\\div 2=8$.', '$\\log_2 16=8$, because $16\\div 2=8$.'),
            right: say('Logaritmoa berretzaile bat da: $2^{4}=16$, beraz $\\log_2 16=4$.', 'El logaritmo es un exponente: $2^{4}=16$, así que $\\log_2 16=4$.', 'اللوغاريتم أس: $2^{4}=16$، إذن $\\log_2 16=4$.', 'The logarithm is an exponent: $2^{4}=16$, so $\\log_2 16=4$.')
        },
        check: {
            prompt: say('Zenbat da $\\log_5 \\frac{1}{25}$?', '¿Cuánto vale $\\log_5 \\frac{1}{25}$?', 'كم يساوي $\\log_5 \\frac{1}{25}$؟', 'What is $\\log_5 \\frac{1}{25}$?'),
            options: [same('$2$'), same('$\\frac{1}{5}$'), same('$-2$')],
            correctIndex: 2,
            explanation: say('$5^{-2}=\\frac{1}{25}$, beraz berretzailea $-2$ da.', '$5^{-2}=\\frac{1}{25}$, así que el exponente es $-2$.', '$5^{-2}=\\frac{1}{25}$، إذن الأس $-2$.', '$5^{-2}=\\frac{1}{25}$, so the exponent is $-2$.')
        }
    },
    'log-properties': {
        mistake: {
            wrong: say('$\\log(10+90)=\\log 10+\\log 90$', '$\\log(10+90)=\\log 10+\\log 90$', '$\\log(10+90)=\\log 10+\\log 90$', '$\\log(10+90)=\\log 10+\\log 90$'),
            right: say('Logaritmoen batura biderkaduraren logaritmoa da, ez baturarena: $\\log(10+90)=\\log 100=2$.', 'La suma de logaritmos es el logaritmo del producto, no de la suma: $\\log(10+90)=\\log 100=2$.', 'مجموع اللوغاريتمات هو لوغاريتم الضرب لا الجمع: $\\log(10+90)=\\log 100=2$.', 'A sum of logarithms is the logarithm of the product, not of the sum: $\\log(10+90)=\\log 100=2$.')
        },
        check: {
            prompt: say('Zenbat da $\\log_3 18-\\log_3 2$?', '¿Cuánto vale $\\log_3 18-\\log_3 2$?', 'كم يساوي $\\log_3 18-\\log_3 2$؟', 'What is $\\log_3 18-\\log_3 2$?'),
            options: [same('$\\log_3 16$'), same('$2$'), same('$9$')],
            correctIndex: 1,
            explanation: same('$\\log_3\\frac{18}{2}=\\log_3 9=2$')
        }
    },
    'change-base': {
        mistake: {
            wrong: say('$\\log_3 20=\\frac{\\log 3}{\\log 20}$', '$\\log_3 20=\\frac{\\log 3}{\\log 20}$', '$\\log_3 20=\\frac{\\log 3}{\\log 20}$', '$\\log_3 20=\\frac{\\log 3}{\\log 20}$'),
            right: say('Goian zenbakia doa, eta behean oinarria: $\\log_3 20=\\frac{\\log 20}{\\log 3}\\approx 2{,}73$.', 'Arriba va el número, y abajo la base: $\\log_3 20=\\frac{\\log 20}{\\log 3}\\approx 2{,}73$.', 'في البسط العدد وفي المقام الأساس: $\\log_3 20=\\frac{\\log 20}{\\log 3}\\approx 2{,}73$.', 'The number goes on top, and the base underneath: $\\log_3 20=\\frac{\\log 20}{\\log 3}\\approx 2{,}73$.')
        },
        check: {
            prompt: say('Zein bi zenbaki osoren artean dago $\\log_2 50$?', '¿Entre qué dos enteros está $\\log_2 50$?', 'بين أيّ عددين صحيحين يقع $\\log_2 50$؟', 'Between which two whole numbers does $\\log_2 50$ lie?'),
            options: [
                say('5 eta 6 artean', 'Entre 5 y 6', 'بين 5 و6', 'Between 5 and 6'),
                say('2 eta 3 artean', 'Entre 2 y 3', 'بين 2 و3', 'Between 2 and 3'),
                say('25 eta 26 artean', 'Entre 25 y 26', 'بين 25 و26', 'Between 25 and 26')
            ],
            correctIndex: 0,
            explanation: say('$2^{5}=32<50<64=2^{6}$, beraz 5 eta 6 artean dago.', '$2^{5}=32<50<64=2^{6}$, así que está entre 5 y 6.', '$2^{5}=32<50<64=2^{6}$، إذن يقع بين 5 و6.', '$2^{5}=32<50<64=2^{6}$, so it lies between 5 and 6.')
        }
    }
}

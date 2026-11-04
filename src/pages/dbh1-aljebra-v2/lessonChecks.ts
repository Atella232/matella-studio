import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Aljebraren hastapenak · 1. DBH — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. A question that names a letter
   writes two formulas (or none), so the test does not compare a lone
   letter with the answer.
   ========================================================================== */

export type AlgebraIntroTopicId = 'letters' | 'translate' | 'value' | 'monomial' | 'like-terms' | 'polynomial' | 'add-monomials' | 'multiply-monomials' | 'brackets' | 'equation' | 'trial' | 'transpose' | 'solve' | 'problems'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const algebraIntroLessonChecks: Record<AlgebraIntroTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Algebraic language ---------- */
    letters: {
        mistake: {
            wrong: say('«Zenbaki baten hirukoitza» $x+3$ idazten da.', '«El triple de un número» se escribe $x+3$.', '«ثلاثة أضعاف عدد» تُكتب $x+3$.', '«Three times a number» is written $x+3$.'),
            right: say('Hirukoitza 3 zenbakiaz biderkatzea da: $3x$. $x+3$ «zenbaki bat gehi 3» da.', 'Triple es multiplicar por 3: $3x$. $x+3$ es «un número más 3».', 'ثلاثة الأضعاف ضرب في 3: $3x$. أما $x+3$ فهي «عدد زائد 3».', 'Three times means multiplying by 3: $3x$. $x+3$ is «a number plus 3».')
        },
        check: {
            prompt: say('Nola idazten da «zenbaki baten erdia»?', '¿Cómo se escribe «la mitad de un número»?', 'كيف يُكتب «نصف عدد»؟', 'How do you write «half of a number»?'),
            options: [same('$\\frac{x}{2}$'), same('$2x$'), same('$x-2$')],
            correctIndex: 0,
            explanation: say('Erdia 2 zenbakiarekin zatitzea da: $\\frac{x}{2}$. $2x$ bikoitza da.', 'La mitad es dividir entre 2: $\\frac{x}{2}$. $2x$ es el doble.', 'النصف هو القسمة على 2: $\\frac{x}{2}$. أما $2x$ فهو الضعف.', 'Half is dividing by 2: $\\frac{x}{2}$. $2x$ is double.')
        }
    },
    translate: {
        mistake: {
            wrong: say('«Zenbaki baten bikoitza gehi 3» eta «zenbaki baten eta 3 zenbakiaren baturaren bikoitza» berdin idazten dira: $2x+3$.', '«El doble de un número más 3» y «el doble de la suma de un número y 3» se escriben igual: $2x+3$.', '«ضعف عدد زائد 3» و«ضعف مجموع عدد و3» تُكتبان بالطريقة نفسها: $2x+3$.', '«Double a number plus 3» and «double the sum of a number and 3» are written the same: $2x+3$.'),
            right: say('Ez: lehena $2x+3$ da, eta bigarrena, $2(x+3)$.', 'No: el primero es $2x+3$ y el segundo, $2(x+3)$.', 'لا: الأولى $2x+3$ والثانية $2(x+3)$.', 'No: the first is $2x+3$ and the second, $2(x+3)$.')
        },
        check: {
            prompt: say('Zure adinari $x$ deitzen badiogu, zein izango da zure adina $6$ urte barru?', 'Si llamamos $x$ a tu edad, ¿cuál será tu edad dentro de $6$ años?', 'إذا رمزنا إلى عمرك بـ$x$، فكم يكون عمرك بعد $6$ سنوات؟', 'If we call your age $x$, what will your age be in $6$ years?'),
            options: [same('$x+6$'), same('$6x$'), same('$x-6$')],
            correctIndex: 0,
            explanation: say('Urte barru gehiago izango dituzu: 6 batzen dira. $x-6$ duela 6 urteko adina da.', 'Dentro de unos años tendrás más: se suman 6. $x-6$ es tu edad hace 6 años.', 'بعد سنوات يزيد عمرك: نجمع 6. أما $x-6$ فعمرك قبل 6 سنوات.', 'In a few years you will be older: add 6. $x-6$ is your age 6 years ago.')
        }
    },
    value: {
        mistake: {
            wrong: say('$x=-2$ denean, $x^{2}=-2^{2}=-4$.', 'Para $x=-2$, $x^{2}=-2^{2}=-4$.', 'عندما $x=-2$ يكون $x^{2}=-2^{2}=-4$.', 'For $x=-2$, $x^{2}=-2^{2}=-4$.'),
            right: say('Negatiboak parentesi artean ordezten dira: $(-2)^{2}=4$.', 'Los negativos se sustituyen entre paréntesis: $(-2)^{2}=4$.', 'نعوّض الأعداد السالبة بين قوسين: $(-2)^{2}=4$.', 'Negatives are substituted in brackets: $(-2)^{2}=4$.')
        },
        check: {
            prompt: say('Zenbat balio du $5a-2$ adierazpenak $a=3$ denean?', '¿Cuánto vale $5a-2$ para $a=3$?', 'كم تساوي $5a-2$ عندما $a=3$؟', 'What is $5a-2$ when $a=3$?'),
            options: [same('$13$'), same('$51$'), same('$9$')],
            correctIndex: 0,
            explanation: say('$5\\cdot 3-2=15-2=13$. $5a$ adierazpena «5 bider $a$» da, ez 53.', '$5\\cdot 3-2=15-2=13$. $5a$ es «5 por $a$», no 53.', '$5\\cdot 3-2=15-2=13$. و$5a$ تعني «5 في $a$» لا 53.', '$5\\cdot 3-2=15-2=13$. $5a$ means «5 times $a$», not 53.')
        }
    },

    /* ---------- 2. Monomials and polynomials ---------- */
    monomial: {
        mistake: {
            wrong: say('$5x^{3}y$ monomioaren maila 3 da.', 'El grado de $5x^{3}y$ es 3.', 'درجة $5x^{3}y$ هي 3.', 'The degree of $5x^{3}y$ is 3.'),
            right: say('Letra guztien berretzaileak batzen dira: $3+1=4$.', 'Se suman los exponentes de todas las letras: $3+1=4$.', 'نجمع أسس كل الحروف: $3+1=4$.', 'Add the exponents of all the letters: $3+1=4$.')
        },
        check: {
            prompt: say('Zein monomiok du 4 maila?', '¿Qué monomio tiene grado 4?', 'أيّ وحيد حد درجته 4؟', 'Which monomial has degree 4?'),
            options: [same('$3x^{4}y$'), same('$4xy$'), same('$2x^{2}y^{2}$')],
            correctIndex: 2,
            explanation: say('$2+2=4$. $4xy$ monomioaren maila 2 da (4 koefizientea da), eta $3x^{4}y$ monomioarena, 5.', '$2+2=4$. El grado de $4xy$ es 2 (el 4 es el coeficiente), y el de $3x^{4}y$, 5.', '$2+2=4$. درجة $4xy$ هي 2 (العدد 4 معامل)، ودرجة $3x^{4}y$ هي 5.', '$2+2=4$. The degree of $4xy$ is 2 (the 4 is the coefficient), and that of $3x^{4}y$ is 5.')
        }
    },
    'like-terms': {
        mistake: {
            wrong: say('$3x$ eta $3x^{2}$ antzekoak dira, koefiziente bera dutelako.', '$3x$ y $3x^{2}$ son semejantes, porque tienen el mismo coeficiente.', '$3x$ و$3x^{2}$ متشابهان لأن لهما المعامل نفسه.', '$3x$ and $3x^{2}$ are like terms, because they have the same coefficient.'),
            right: say('Koefizientea ez da kontuan hartzen: zati literalak, $x$ eta $x^{2}$, desberdinak dira.', 'El coeficiente no cuenta: las partes literales, $x$ y $x^{2}$, son distintas.', 'المعامل لا يهم: الجزءان الحرفيان $x$ و$x^{2}$ مختلفان.', 'The coefficient does not matter: the letter parts, $x$ and $x^{2}$, are different.')
        },
        check: {
            prompt: say('Zein bikote da monomio antzekoena?', '¿Qué pareja es de monomios semejantes?', 'أيّ زوج من وحيدات الحد متشابه؟', 'Which pair is made of like terms?'),
            options: [same('$3ab,\\ 3a^{2}b$'), same('$2a^{2}b,\\ 7a^{2}b$'), same('$4x^{2},\\ 4y^{2}$')],
            correctIndex: 1,
            explanation: say('Zati literal bera, $a^{2}b$, dute. Besteetan letrak edo berretzaileak aldatzen dira.', 'Tienen la misma parte literal, $a^{2}b$. En las otras cambian las letras o los exponentes.', 'لهما الجزء الحرفي نفسه $a^{2}b$. وفي الأخرى تتغير الحروف أو الأسس.', 'They have the same letter part, $a^{2}b$. In the others the letters or the exponents change.')
        }
    },
    polynomial: {
        mistake: {
            wrong: say('$x^{2}+x^{3}$ polinomioaren maila 2 da, lehen gaiarena delako.', 'El grado de $x^{2}+x^{3}$ es 2, porque es el del primer término.', 'درجة $x^{2}+x^{3}$ هي 2 لأنها درجة الحد الأول.', 'The degree of $x^{2}+x^{3}$ is 2, because it is that of the first term.'),
            right: say('Mailarik handiena da, lehenengo ez egon arren: 3 maila.', 'Es el mayor de los grados, aunque no esté el primero: grado 3.', 'هي أكبر الدرجات وإن لم يكن حدها الأول: الدرجة 3.', 'It is the biggest degree, even if it is not first: degree 3.')
        },
        check: {
            prompt: say('Zein polinomiok du 3 maila?', '¿Qué polinomio tiene grado 3?', 'أيّ كثير حدود درجته 3؟', 'Which polynomial has degree 3?'),
            options: [same('$x^{3}y+1$'), same('$4x^{2}+3$'), same('$2x^{3}-x$')],
            correctIndex: 2,
            explanation: say('$2x^{3}-x$ polinomioaren gai handiena $2x^{3}$ da: 3 maila. $x^{3}y$ gaiaren maila 4 da.', 'En $2x^{3}-x$ el término mayor es $2x^{3}$: grado 3. El grado de $x^{3}y$ es 4.', 'في $2x^{3}-x$ الحد الأكبر $2x^{3}$: الدرجة 3. أما درجة $x^{3}y$ فهي 4.', 'In $2x^{3}-x$ the biggest term is $2x^{3}$: degree 3. The degree of $x^{3}y$ is 4.')
        }
    },

    /* ---------- 3. Operations ---------- */
    'add-monomials': {
        mistake: {
            wrong: say('$3x+2y=5xy$', '$3x+2y=5xy$', '$3x+2y=5xy$', '$3x+2y=5xy$'),
            right: say('Ez dira antzekoak: adierazita uzten da, $3x+2y$.', 'No son semejantes: se deja indicado, $3x+2y$.', 'ليسا متشابهين: نتركه كما هو، $3x+2y$.', 'They are not like terms: leave it as it is, $3x+2y$.')
        },
        check: {
            prompt: say('Laburtu $4x^{2}+3x-x^{2}+2x$.', 'Reduce $4x^{2}+3x-x^{2}+2x$.', 'اختصر $4x^{2}+3x-x^{2}+2x$.', 'Simplify $4x^{2}+3x-x^{2}+2x$.'),
            options: [same('$8x^{3}$'), same('$3x^{2}+5x$'), same('$4x^{2}+5x$')],
            correctIndex: 1,
            explanation: say('$4x^{2}-x^{2}=3x^{2}$ eta $3x+2x=5x$; ez dira gehiago batzen.', '$4x^{2}-x^{2}=3x^{2}$ y $3x+2x=5x$; no se pueden sumar más.', '$4x^{2}-x^{2}=3x^{2}$ و$3x+2x=5x$؛ ولا يمكن جمعهما أكثر.', '$4x^{2}-x^{2}=3x^{2}$ and $3x+2x=5x$; they cannot be added any further.')
        }
    },
    'multiply-monomials': {
        mistake: {
            wrong: say('$x^{3}\\cdot x^{2}=x^{6}$', '$x^{3}\\cdot x^{2}=x^{6}$', '$x^{3}\\cdot x^{2}=x^{6}$', '$x^{3}\\cdot x^{2}=x^{6}$'),
            right: say('Biderkatzean berretzaileak batzen dira: $x^{3}\\cdot x^{2}=x^{5}$.', 'Al multiplicar se suman los exponentes: $x^{3}\\cdot x^{2}=x^{5}$.', 'عند الضرب نجمع الأسس: $x^{3}\\cdot x^{2}=x^{5}$.', 'When multiplying, add the exponents: $x^{3}\\cdot x^{2}=x^{5}$.')
        },
        check: {
            prompt: say('Zenbat da $2a^{3}\\cdot 5a$?', '¿Cuánto es $2a^{3}\\cdot 5a$?', 'كم يساوي $2a^{3}\\cdot 5a$؟', 'What is $2a^{3}\\cdot 5a$?'),
            options: [same('$10a^{4}$'), same('$10a^{3}$'), same('$7a^{4}$')],
            correctIndex: 0,
            explanation: say('$2\\cdot 5=10$ eta $3+1=4$: $10a^{4}$.', '$2\\cdot 5=10$ y $3+1=4$: $10a^{4}$.', '$2\\cdot 5=10$ و$3+1=4$: $10a^{4}$.', '$2\\cdot 5=10$ and $3+1=4$: $10a^{4}$.')
        }
    },
    brackets: {
        mistake: {
            wrong: say('$4(x+2)=4x+2$', '$4(x+2)=4x+2$', '$4(x+2)=4x+2$', '$4(x+2)=4x+2$'),
            right: say('4 zenbakiak gai guztiak biderkatzen ditu: $4(x+2)=4x+8$.', 'El 4 multiplica a todos los términos: $4(x+2)=4x+8$.', 'العدد 4 يضرب كل الحدود: $4(x+2)=4x+8$.', 'The 4 multiplies every term: $4(x+2)=4x+8$.')
        },
        check: {
            prompt: say('Kendu parentesia: $-3(x-2)$.', 'Quita el paréntesis: $-3(x-2)$.', 'احذف القوس: $-3(x-2)$.', 'Remove the bracket: $-3(x-2)$.'),
            options: [same('$-3x-6$'), same('$-3x+6$'), same('$-3x-2$')],
            correctIndex: 1,
            explanation: say('$-3\\cdot x=-3x$ eta $-3\\cdot(-2)=+6$.', '$-3\\cdot x=-3x$ y $-3\\cdot(-2)=+6$.', '$-3\\cdot x=-3x$ و$-3\\cdot(-2)=+6$.', '$-3\\cdot x=-3x$ and $-3\\cdot(-2)=+6$.')
        }
    },

    /* ---------- 4. Equations ---------- */
    equation: {
        mistake: {
            wrong: say('$x+5=9$ identitate bat da: $x$ edozein izan daiteke.', '$x+5=9$ es una identidad: la $x$ puede ser cualquiera.', '$x+5=9$ متطابقة: يمكن أن يكون $x$ أي عدد.', '$x+5=9$ is an identity: $x$ can be anything.'),
            right: say('$x=4$ denean bakarrik betetzen da: ekuazio bat da. Identitate bat, $2x+x=3x$ bezala, edozein $x$ zenbakirekin betetzen da.', 'Solo se cumple con $x=4$: es una ecuación. Una identidad, como $2x+x=3x$, sirve para cualquier $x$.', 'لا تتحقق إلا عندما $x=4$: إنها معادلة. أما المتطابقة، مثل $2x+x=3x$، فتصح لأي $x$.', 'It only holds for $x=4$: it is an equation. An identity, like $2x+x=3x$, works for any $x$.')
        },
        check: {
            prompt: say('Zein da identitate bat?', '¿Cuál es una identidad?', 'أيّها متطابقة؟', 'Which one is an identity?'),
            options: [same('$3x+x=4x$'), same('$3x+1=4$'), same('$x\\cdot x=2x$')],
            correctIndex: 0,
            explanation: say('$3x+x=4x$ edozein $x$ zenbakirekin betetzen da. $3x+1=4$ ekuazioa $x=1$ denean bakarrik betetzen da, eta $x\\cdot x$ adierazpena $x^{2}$ da.', '$3x+x=4x$ se cumple con cualquier $x$. $3x+1=4$, solo con $x=1$, y $x\\cdot x$ es $x^{2}$.', '$3x+x=4x$ تصح لأي $x$. أما $3x+1=4$ فلا تصح إلا عندما $x=1$، و$x\\cdot x$ تساوي $x^{2}$.', '$3x+x=4x$ holds for any $x$. $3x+1=4$ only for $x=1$, and $x\\cdot x$ is $x^{2}$.')
        }
    },
    trial: {
        mistake: {
            wrong: say('$3x=12$ ekuazioan, 12 − 3 = 9 denez, $x=9$.', 'En $3x=12$, como 12 − 3 = 9, $x=9$.', 'في $3x=12$، بما أن 12 − 3 = 9 فإن $x=9$.', 'In $3x=12$, since 12 − 3 = 9, $x=9$.'),
            right: say('$3x$ «3 bider $x$» da: $3\\cdot 4=12$; beraz, $x=4$.', '$3x$ es «3 por $x$»: $3\\cdot 4=12$, así que $x=4$.', '$3x$ تعني «3 في $x$»: $3\\cdot 4=12$، إذن $x=4$.', '$3x$ means «3 times $x$»: $3\\cdot 4=12$, so $x=4$.')
        },
        check: {
            prompt: say('Zein balio betetzen du $x+8=15$?', '¿Qué valor cumple $x+8=15$?', 'أيّ قيمة تحقق $x+8=15$؟', 'Which value satisfies $x+8=15$?'),
            options: [same('$x=7$'), same('$x=23$'), same('$x=8$')],
            correctIndex: 0,
            explanation: say('$7+8=15$: bi atalek gauza bera ematen dute.', '$7+8=15$: los dos miembros dan lo mismo.', '$7+8=15$: يعطي الطرفان القيمة نفسها.', '$7+8=15$: both sides give the same.')
        }
    },
    transpose: {
        mistake: {
            wrong: say('$x+6=10$ ekuazioan, 6 zenbakia beste atalera batzen pasatzen da: $x=16$.', 'En $x+6=10$, el 6 pasa al otro lado sumando: $x=16$.', 'في $x+6=10$ ينتقل 6 إلى الطرف الآخر مجموعًا: $x=16$.', 'In $x+6=10$, the 6 moves to the other side adding: $x=16$.'),
            right: say('Batzen dagoena kentzen pasatzen da: $x=10-6=4$.', 'Lo que suma pasa restando: $x=10-6=4$.', 'ما يُجمع ينتقل مطروحًا: $x=10-6=4$.', 'What is added moves across subtracting: $x=10-6=4$.')
        },
        check: {
            prompt: say('Askatu $x$: $\\frac{x}{3}=5$.', 'Despeja la $x$ en $\\frac{x}{3}=5$.', 'اعزل $x$ في $\\frac{x}{3}=5$.', 'Solve for $x$ in $\\frac{x}{3}=5$.'),
            options: [same('$x=2$'), same('$x=15$'), same('$x=\\frac{5}{3}$')],
            correctIndex: 1,
            explanation: say('Zatitzen duen 3 zenbakia biderkatzen pasatzen da: $x=5\\cdot 3=15$.', 'El 3 que divide pasa multiplicando: $x=5\\cdot 3=15$.', 'العدد 3 الذي يقسم ينتقل ضاربًا: $x=5\\cdot 3=15$.', 'The 3 that divides moves across multiplying: $x=5\\cdot 3=15$.')
        }
    },
    solve: {
        mistake: {
            wrong: say('$3x+2=x+8\\ \\to\\ 3x+x=8+2$', '$3x+2=x+8\\ \\to\\ 3x+x=8+2$', '$3x+2=x+8\\ \\to\\ 3x+x=8+2$', '$3x+2=x+8\\ \\to\\ 3x+x=8+2$'),
            right: say('Beste atalera pasatzean, $x$ zeinuz aldatzen da, eta 2 ere bai: $3x-x=8-2$, eta $x=3$.', 'Al pasar al otro miembro, la $x$ cambia de signo, y el 2 también: $3x-x=8-2$, y $x=3$.', 'عند الانتقال إلى الطرف الآخر تتغير إشارة $x$ وإشارة 2 أيضًا: $3x-x=8-2$، و$x=3$.', 'Moving to the other side, the $x$ changes sign, and so does the 2: $3x-x=8-2$, and $x=3$.')
        },
        check: {
            prompt: say('Ebatzi $5x-3=2x+9$.', 'Resuelve $5x-3=2x+9$.', 'حلّ $5x-3=2x+9$.', 'Solve $5x-3=2x+9$.'),
            options: [same('$x=2$'), same('$x=12$'), same('$x=4$')],
            correctIndex: 2,
            explanation: say('$5x-2x=9+3$, $3x=12$ eta $x=4$. Egiaztapena: $5\\cdot 4-3=17$ eta $2\\cdot 4+9=17$.', '$5x-2x=9+3$, $3x=12$ y $x=4$. Comprobación: $5\\cdot 4-3=17$ y $2\\cdot 4+9=17$.', '$5x-2x=9+3$، و$3x=12$، و$x=4$. التحقق: $5\\cdot 4-3=17$ و$2\\cdot 4+9=17$.', '$5x-2x=9+3$, $3x=12$ and $x=4$. Check: $5\\cdot 4-3=17$ and $2\\cdot 4+9=17$.')
        }
    },
    problems: {
        mistake: {
            wrong: say('«Zenbaki bat gehi haren bikoitza 18 da»: $x+2=18$.', '«Un número más su doble es 18»: $x+2=18$.', '«عدد زائد ضعفه يساوي 18»: $x+2=18$.', '«A number plus double the number is 18»: $x+2=18$.'),
            right: say('Haren bikoitza $2x$ da: $x+2x=18$, eta zenbakia 6 da.', 'Su doble es $2x$: $x+2x=18$, y el número es 6.', 'ضعفه هو $2x$: $x+2x=18$، والعدد 6.', 'Double the number is $2x$: $x+2x=18$, and the number is 6.')
        },
        check: {
            prompt: say('Zenbaki baten eta haren erdiaren batura 21 da. Zein ekuaziok esaten du?', 'La suma de un número y su mitad es 21. ¿Qué ecuación lo dice?', 'مجموع عدد ونصفه يساوي 21. أيّ معادلة تعبّر عن ذلك؟', 'A number plus half of it is 21. Which equation says so?'),
            options: [same('$x+\\frac{x}{2}=21$'), same('$x+2=21$'), same('$\\frac{x+2}{2}=21$')],
            correctIndex: 0,
            explanation: say('Zenbakia $x$ da, eta haren erdia $\\frac{x}{2}$: batura 21. Ebatzita, $x=14$.', 'El número es $x$ y su mitad, $\\frac{x}{2}$: la suma, 21. Resuelta, $x=14$.', 'العدد $x$ ونصفه $\\frac{x}{2}$: مجموعهما 21. وبالحل $x=14$.', 'The number is $x$ and half of it, $\\frac{x}{2}$: the sum, 21. Solved, $x=14$.')
        }
    }
}

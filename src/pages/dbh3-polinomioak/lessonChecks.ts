import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Polinomioak · 3. DBH — the typical mistake and the «Check it» question
   of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The mistakes are the ones the
   lessons already had; the questions use new numbers, never those of
   «Let's solve» or of the example, and one of their wrong answers is the
   lesson's typical mistake. Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type PolynomialsTopicId = 'expressions' | 'monomials' | 'value' | 'add-sub' | 'product' | 'division' | 'square-sum' | 'square-diff' | 'sum-diff' | 'ruffini' | 'remainder' | 'roots' | 'common-factor' | 'factor-identities' | 'algebraic-fractions'

export const polynomialsLessonChecks: Record<PolynomialsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    expressions: {
        mistake: {
            wrong: say('«$x$ gehi 3, guztia bider 2» = $x+3\\cdot 2$.', '«$x$ más 3, todo por 2» = $x+3\\cdot 2$.', '«$x$ زائد 3، والكل في 2» = $x+3\\cdot 2$.', '«$x$ plus 3, all times 2» = $x+3\\cdot 2$.'),
            right: say('«Guztia» parentesi bat da: $2(x+3)$. Parentesirik gabe 3 bakarrik biderkatzen da.', '«Todo» es un paréntesis: $2(x+3)$. Sin paréntesis solo se multiplica el 3.', '«الكل» يعني قوسًا: $2(x+3)$. وبلا قوس لا يُضرب إلا 3.', '«All» means brackets: $2(x+3)$. Without them only the 3 is multiplied.')
        },
        check: {
            prompt: say('Zein adierazpen da «zenbaki baten karratua ken 4, dena bider 3»?', '¿Qué expresión es «el cuadrado de un número menos 4, todo por 3»?', 'أي عبارة هي «مربع عدد ناقص 4، والكل في 3»؟', 'Which expression is «the square of a number minus 4, all times 3»?'),
            options: [same('$3(x^{2}-4)$'), same('$3x^{2}-4$'), same('$(3x-4)^{2}$')],
            correctIndex: 0,
            explanation: say('«Dena» parentesi bat da: $x^{2}-4$ osoa biderkatzen da 3 zenbakiaz.', '«Todo» es un paréntesis: se multiplica por 3 todo $x^{2}-4$.', '«الكل» يعني قوسين: نضرب $x^{2}-4$ كله في 3.', '«All» means brackets: the whole of $x^{2}-4$ is multiplied by 3.')
        }
    },
    monomials: {
        mistake: {
            wrong: say('$2x+3x^{2}=5x^{3}$', '$2x+3x^{2}=5x^{3}$', '$2x+3x^{2}=5x^{3}$', '$2x+3x^{2}=5x^{3}$'),
            right: say('$2x$ eta $3x^{2}$ ez dira antzekoak: ezin dira batu. $3x^{2}+2x$ geratzen da.', '$2x$ y $3x^{2}$ no son semejantes: no se suman. Se queda $3x^{2}+2x$.', '$2x$ و$3x^{2}$ غير متشابهين: لا يُجمعان. يبقى $3x^{2}+2x$.', '$2x$ and $3x^{2}$ are not like terms: they cannot be added. It stays $3x^{2}+2x$.')
        },
        check: {
            prompt: say('Zenbat da $3x+2x^{2}$?', '¿Cuánto es $3x+2x^{2}$?', 'كم يساوي $3x+2x^{2}$؟', 'What is $3x+2x^{2}$?'),
            options: [same('$5x^{3}$'), same('$5x^{2}$'), same('$2x^{2}+3x$')],
            correctIndex: 2,
            explanation: say('$3x$ eta $2x^{2}$ ez dira antzekoak: ezin dira batu. Ordenatu bakarrik egiten da.', '$3x$ y $2x^{2}$ no son semejantes: no se pueden sumar. Solo se ordena.', '$3x$ و$2x^{2}$ غير متشابهين: لا يُجمعان. نرتبهما فقط.', '$3x$ and $2x^{2}$ are not like terms: they cannot be added. You only put them in order.')
        }
    },
    value: {
        mistake: {
            wrong: say('$P(x)=x^{2}-3x+4$ bada, $P(-1)=-1^{2}-3\\cdot -1+4=0$.', 'Si $P(x)=x^{2}-3x+4$, $P(-1)=-1^{2}-3\\cdot -1+4=0$.', 'إذا كان $P(x)=x^{2}-3x+4$ فإن $P(-1)=-1^{2}-3\\cdot -1+4=0$.', 'If $P(x)=x^{2}-3x+4$, then $P(-1)=-1^{2}-3\\cdot -1+4=0$.'),
            right: say('Parentesirik gabe, $-1^{2}=-1$ da, eta hori ez da $(-1)^{2}=1$. Zuzena: $P(-1)=8$.', 'Sin paréntesis, $-1^{2}=-1$, que no es $(-1)^{2}=1$. Lo correcto: $P(-1)=8$.', 'بلا أقواس $-1^{2}=-1$ وهذا ليس $(-1)^{2}=1$. الصحيح: $P(-1)=8$.', 'Without brackets, $-1^{2}=-1$, which is not $(-1)^{2}=1$. Correct: $P(-1)=8$.')
        },
        check: {
            prompt: say('$P(x)=x^{2}+2x$ bada, zenbat balio du $P(-3)$?', 'Si $P(x)=x^{2}+2x$, ¿cuánto vale $P(-3)$?', 'إذا كان $P(x)=x^{2}+2x$ فكم يساوي $P(-3)$؟', 'If $P(x)=x^{2}+2x$, what is $P(-3)$?'),
            options: [same('$3$'), same('$-15$'), same('$15$')],
            correctIndex: 0,
            explanation: say('Parentesiekin: $(-3)^{2}+2\\cdot(-3)=9-6=3$. $-15$ ateratzen da $-3^{2}$ idatziz gero.', 'Con paréntesis: $(-3)^{2}+2\\cdot(-3)=9-6=3$. $-15$ sale al escribir $-3^{2}$.', 'مع الأقواس: $(-3)^{2}+2\\cdot(-3)=9-6=3$. أما $-15$ فينتج عن كتابة $-3^{2}$.', 'With brackets: $(-3)^{2}+2\\cdot(-3)=9-6=3$. $-15$ comes from writing $-3^{2}$.')
        }
    },
    'add-sub': {
        mistake: {
            wrong: say('$(3x^{2}-2x+5)-(x^{2}+4x-1)=2x^{2}+2x+4$', '$(3x^{2}-2x+5)-(x^{2}+4x-1)=2x^{2}+2x+4$', '$(3x^{2}-2x+5)-(x^{2}+4x-1)=2x^{2}+2x+4$', '$(3x^{2}-2x+5)-(x^{2}+4x-1)=2x^{2}+2x+4$'),
            right: say('Lehen gaiaren zeinua bakarrik aldatu da. Kenketak gai guztiei eragiten die: $2x^{2}-6x+6$.', 'Solo se cambió el signo del primer término. La resta afecta a todos: $2x^{2}-6x+6$.', 'غُيّرت إشارة الحد الأول فقط. الطرح يؤثر في كل الحدود: $2x^{2}-6x+6$.', 'Only the sign of the first term was changed. Subtraction affects every term: $2x^{2}-6x+6$.')
        },
        check: {
            prompt: say('Zenbat da $(4x^{2}+3x)-(x^{2}-2x)$?', '¿Cuánto es $(4x^{2}+3x)-(x^{2}-2x)$?', 'كم يساوي $(4x^{2}+3x)-(x^{2}-2x)$؟', 'What is $(4x^{2}+3x)-(x^{2}-2x)$?'),
            options: [same('$3x^{2}+x$'), same('$3x^{2}+5x$'), same('$5x^{2}+x$')],
            correctIndex: 1,
            explanation: say('Zeinu guztiak aldatu: $4x^{2}+3x-x^{2}+2x=3x^{2}+5x$.', 'Cambia todos los signos: $4x^{2}+3x-x^{2}+2x=3x^{2}+5x$.', 'غيّر كل الإشارات: $4x^{2}+3x-x^{2}+2x=3x^{2}+5x$.', 'Change all the signs: $4x^{2}+3x-x^{2}+2x=3x^{2}+5x$.')
        }
    },
    product: {
        mistake: {
            wrong: say('$(x+3)(x+2)=x^{2}+6$', '$(x+3)(x+2)=x^{2}+6$', '$(x+3)(x+2)=x^{2}+6$', '$(x+3)(x+2)=x^{2}+6$'),
            right: say('Lehenengoak lehenengoarekin eta azkenak azkenarekin bakarrik biderkatu dira. Lau biderkadura daude: $x^{2}+2x+3x+6$.', 'Solo se multiplicaron primero con primero y último con último. Son cuatro productos: $x^{2}+2x+3x+6$.', 'ضُرب الأول في الأول والأخير في الأخير فقط. هناك أربعة حواصل: $x^{2}+2x+3x+6$.', 'Only first times first and last times last were multiplied. There are four products: $x^{2}+2x+3x+6$.')
        },
        check: {
            prompt: say('Zenbat da $(x+5)(x-1)$?', '¿Cuánto es $(x+5)(x-1)$?', 'كم يساوي $(x+5)(x-1)$؟', 'What is $(x+5)(x-1)$?'),
            options: [same('$x^{2}-5$'), same('$x^{2}+6x-5$'), same('$x^{2}+4x-5$')],
            correctIndex: 2,
            explanation: say('Lau biderkadura: $x^{2}-x+5x-5=x^{2}+4x-5$.', 'Cuatro productos: $x^{2}-x+5x-5=x^{2}+4x-5$.', 'أربعة حواصل ضرب: $x^{2}-x+5x-5=x^{2}+4x-5$.', 'Four products: $x^{2}-x+5x-5=x^{2}+4x-5$.')
        }
    },
    division: {
        mistake: {
            wrong: say('$(x^{3}+1):(x+1)$ zatitzean, $x^{3}+1$ zuzenean idatzi da, $x^{2}$ eta $x$ gaien hutsunerik gabe.', 'Al dividir $(x^{3}+1):(x+1)$ se escribió $x^{3}+1$ tal cual, sin huecos para $x^{2}$ y $x$.', 'عند قسمة $(x^{3}+1):(x+1)$ كُتب $x^{3}+1$ كما هو دون فراغ لـ $x^{2}$ و$x$.', 'When dividing $(x^{3}+1):(x+1)$, $x^{3}+1$ was written as it is, with no gaps for $x^{2}$ and $x$.'),
            right: say('Bete falta diren mailak zeroz: $x^{3}+0x^{2}+0x+1$. Bestela zutabeak nahasten dira.', 'Rellena con ceros los grados que faltan: $x^{3}+0x^{2}+0x+1$. Si no, se mezclan las columnas.', 'املأ الدرجات الناقصة بالأصفار: $x^{3}+0x^{2}+0x+1$. وإلا اختلطت الأعمدة.', 'Fill the missing degrees with zeros: $x^{3}+0x^{2}+0x+1$. Otherwise the columns get mixed up.')
        },
        check: {
            prompt: say('$P(x)$ zatitzean $x-2$ zatitzaileaz, zatidura $x+3$ da eta hondarra 4. Zein da $P(x)$?', 'Al dividir $P(x)$ entre $x-2$, el cociente es $x+3$ y el resto, 4. ¿Cuál es $P(x)$?', 'عند قسمة $P(x)$ على $x-2$ يكون خارج القسمة $x+3$ والباقي 4. ما $P(x)$؟', 'Dividing $P(x)$ by $x-2$ gives quotient $x+3$ and remainder 4. What is $P(x)$?'),
            options: [same('$x^{2}+x-6$'), same('$x^{2}+x-2$'), same('$x^{2}+5x-2$')],
            correctIndex: 1,
            explanation: say('$P(x)=(x-2)(x+3)+4=x^{2}+x-6+4=x^{2}+x-2$. Hondarra batu behar da.', '$P(x)=(x-2)(x+3)+4=x^{2}+x-6+4=x^{2}+x-2$. El resto hay que sumarlo.', '$P(x)=(x-2)(x+3)+4=x^{2}+x-6+4=x^{2}+x-2$. يجب إضافة الباقي.', '$P(x)=(x-2)(x+3)+4=x^{2}+x-6+4=x^{2}+x-2$. The remainder has to be added.')
        }
    },
    'square-sum': {
        mistake: {
            wrong: say('$(x+5)^{2}=x^{2}+25$', '$(x+5)^{2}=x^{2}+25$', '$(x+5)^{2}=x^{2}+25$', '$(x+5)^{2}=x^{2}+25$'),
            right: say('Bi laukizuzenak falta dira: $2\\cdot x\\cdot 5=10x$. $(x+5)^{2}=x^{2}+10x+25$.', 'Faltan los dos rectángulos: $2\\cdot x\\cdot 5=10x$. $(x+5)^{2}=x^{2}+10x+25$.', 'ينقص المستطيلان: $2\\cdot x\\cdot 5=10x$. $(x+5)^{2}=x^{2}+10x+25$.', 'The two rectangles are missing: $2\\cdot x\\cdot 5=10x$. $(x+5)^{2}=x^{2}+10x+25$.')
        },
        check: {
            prompt: say('Zenbat da $(x+6)^{2}$?', '¿Cuánto es $(x+6)^{2}$?', 'كم يساوي $(x+6)^{2}$؟', 'What is $(x+6)^{2}$?'),
            options: [same('$x^{2}+36$'), same('$x^{2}+12x+36$'), same('$x^{2}+6x+36$')],
            correctIndex: 1,
            explanation: say('Erdiko gaia bikoitza da: $2\\cdot x\\cdot 6=12x$.', 'El del medio es el doble: $2\\cdot x\\cdot 6=12x$.', 'الحد الأوسط هو الضعف: $2\\cdot x\\cdot 6=12x$.', 'The middle term is twice: $2\\cdot x\\cdot 6=12x$.')
        }
    },
    'square-diff': {
        mistake: {
            wrong: say('$(x-4)^{2}=x^{2}-8x-16$', '$(x-4)^{2}=x^{2}-8x-16$', '$(x-4)^{2}=x^{2}-8x-16$', '$(x-4)^{2}=x^{2}-8x-16$'),
            right: say('Azkena karratu bat da: $(-4)^{2}=16$, positiboa. $x^{2}-8x+16$.', 'El último es un cuadrado: $(-4)^{2}=16$, positivo. $x^{2}-8x+16$.', 'الأخير مربع: $(-4)^{2}=16$ موجب. $x^{2}-8x+16$.', 'The last term is a square: $(-4)^{2}=16$, positive. $x^{2}-8x+16$.')
        },
        check: {
            prompt: say('Zenbat da $(x-7)^{2}$?', '¿Cuánto es $(x-7)^{2}$?', 'كم يساوي $(x-7)^{2}$؟', 'What is $(x-7)^{2}$?'),
            options: [same('$x^{2}-14x+49$'), same('$x^{2}-14x-49$'), same('$x^{2}-49$')],
            correctIndex: 0,
            explanation: say('Azkena karratu bat da, $(-7)^{2}=49$, positiboa; erdikoa $-2\\cdot x\\cdot 7=-14x$.', 'El último es un cuadrado, $(-7)^{2}=49$, positivo; el del medio, $-2\\cdot x\\cdot 7=-14x$.', 'الأخير مربع $(-7)^{2}=49$ موجب، والأوسط $-2\\cdot x\\cdot 7=-14x$.', 'The last is a square, $(-7)^{2}=49$, positive; the middle one, $-2\\cdot x\\cdot 7=-14x$.')
        }
    },
    'sum-diff': {
        mistake: {
            wrong: say('$(x+3)(x-3)=x^{2}+9$', '$(x+3)(x-3)=x^{2}+9$', '$(x+3)(x-3)=x^{2}+9$', '$(x+3)(x-3)=x^{2}+9$'),
            right: say('Azkena $3\\cdot(-3)=-9$ da. Karratuen kendura: $x^{2}-9$.', 'El último es $3\\cdot(-3)=-9$. Diferencia de cuadrados: $x^{2}-9$.', 'الأخير $3\\cdot(-3)=-9$. فرق مربعين: $x^{2}-9$.', 'The last term is $3\\cdot(-3)=-9$. Difference of squares: $x^{2}-9$.')
        },
        check: {
            prompt: say('Zenbat da $(x+8)(x-8)$?', '¿Cuánto es $(x+8)(x-8)$?', 'كم يساوي $(x+8)(x-8)$؟', 'What is $(x+8)(x-8)$?'),
            options: [same('$x^{2}+64$'), same('$x^{2}-64$'), same('$x^{2}-16x-64$')],
            correctIndex: 1,
            explanation: say('Erdiko gaiak ezeztatu egiten dira, eta azkena $8\\cdot(-8)=-64$ da.', 'Los del medio se anulan, y el último es $8\\cdot(-8)=-64$.', 'الحدان الأوسطان يلغي أحدهما الآخر، والأخير $8\\cdot(-8)=-64$.', 'The middle terms cancel, and the last is $8\\cdot(-8)=-64$.')
        }
    },
    ruffini: {
        mistake: {
            wrong: say('$(x^{2}+2x-3):(x+3)$ zatitzeko, $a=3$ jarri da taulan.', 'Para dividir $(x^{2}+2x-3):(x+3)$ se puso $a=3$ en la tabla.', 'للقسمة $(x^{2}+2x-3):(x+3)$ وُضع $a=3$ في الجدول.', 'To divide $(x^{2}+2x-3):(x+3)$, $a=3$ was put in the table.'),
            right: say('$x+3=x-(-3)$, beraz $a=-3$. Horrela hondarra 0 da.', '$x+3=x-(-3)$, así que $a=-3$. Así el resto es 0.', '$x+3=x-(-3)$ إذن $a=-3$. وبذلك الباقي 0.', '$x+3=x-(-3)$, so $a=-3$. Then the remainder is 0.')
        },
        check: {
            prompt: say('Zein zenbaki jartzen da Ruffiniren taularen ezkerrean $x^{2}+2x-15$ zatitzeko $x+5$ zatitzaileaz?', '¿Qué número va a la izquierda de la tabla de Ruffini para dividir $x^{2}+2x-15$ entre $x+5$?', 'أي عدد نضع على يسار جدول روفيني لقسمة $x^{2}+2x-15$ على $x+5$؟', 'Which number goes on the left of Ruffini’s table to divide $x^{2}+2x-15$ by $x+5$?'),
            options: [same('$5$'), same('$-5$'), same('$-15$')],
            correctIndex: 1,
            explanation: say('$x+5=x-(-5)$; beraz, $a=-5$, eta hondarra 0 da.', '$x+5=x-(-5)$, así que $a=-5$, y el resto sale 0.', '$x+5=x-(-5)$، إذن $a=-5$، والباقي 0.', '$x+5=x-(-5)$, so $a=-5$, and the remainder is 0.')
        }
    },
    remainder: {
        mistake: {
            wrong: say('$x^{3}-2x+4$ zati $x+1$: hondarra $P(1)=3$.', '$x^{3}-2x+4$ entre $x+1$: el resto es $P(1)=3$.', '$x^{3}-2x+4$ على $x+1$: الباقي $P(1)=3$.', '$x^{3}-2x+4$ divided by $x+1$: the remainder is $P(1)=3$.'),
            right: say('$x+1$ zatitzailearekin $a=-1$ da: hondarra $P(-1)=5$.', 'Con el divisor $x+1$, $a=-1$: el resto es $P(-1)=5$.', 'مع المقسوم عليه $x+1$ يكون $a=-1$: الباقي $P(-1)=5$.', 'With the divisor $x+1$, $a=-1$: the remainder is $P(-1)=5$.')
        },
        check: {
            prompt: say('Zein da $x^{2}+4x$ zatitzean $x+2$ zatitzaileaz ateratzen den hondarra?', '¿Cuál es el resto de dividir $x^{2}+4x$ entre $x+2$?', 'ما باقي قسمة $x^{2}+4x$ على $x+2$؟', 'What is the remainder when $x^{2}+4x$ is divided by $x+2$?'),
            options: [same('$12$'), same('$-4$'), same('$0$')],
            correctIndex: 1,
            explanation: say('$x+2$ zatitzailearekin, $a=-2$: $P(-2)=4-8=-4$. 12 $P(2)$ da.', 'Con el divisor $x+2$, $a=-2$: $P(-2)=4-8=-4$. 12 es $P(2)$.', 'مع المقسوم عليه $x+2$ يكون $a=-2$: ‏$P(-2)=4-8=-4$. أما 12 فهو $P(2)$.', 'With the divisor $x+2$, $a=-2$: $P(-2)=4-8=-4$. 12 is $P(2)$.')
        }
    },
    roots: {
        mistake: {
            wrong: say('$x^{2}-x-6$ polinomioaren erroak bilatzeko, 1, 2, 3 eta 6 bakarrik probatu dira.', 'Para buscar las raíces de $x^{2}-x-6$ solo se probaron 1, 2, 3 y 6.', 'للبحث عن جذور $x^{2}-x-6$ جُرّبت 1 و2 و3 و6 فقط.', 'To find the roots of $x^{2}-x-6$, only 1, 2, 3 and 6 were tried.'),
            right: say('Zatitzaile negatiboak ere probatu behar dira: $P(-2)=0$, beraz $-2$ ere erroa da.', 'También hay que probar los negativos: $P(-2)=0$, así que $-2$ también es raíz.', 'يجب تجربة القواسم السالبة أيضًا: $P(-2)=0$ إذن $-2$ جذر أيضًا.', 'You must try the negative divisors too: $P(-2)=0$, so $-2$ is also a root.')
        },
        check: {
            prompt: say('Zein dira $x^{2}-2x-8$ polinomioaren erro osoak?', '¿Cuáles son las raíces enteras de $x^{2}-2x-8$?', 'ما الجذور الصحيحة لـ $x^{2}-2x-8$؟', 'What are the integer roots of $x^{2}-2x-8$?'),
            options: [say('$4$ eta $-2$', '$4$ y $-2$', '$4$ و$-2$', '$4$ and $-2$'), say('$4$ bakarrik', 'Solo $4$', '$4$ فقط', 'Only $4$'), say('$2$ eta $-4$', '$2$ y $-4$', '$2$ و$-4$', '$2$ and $-4$')],
            correctIndex: 0,
            explanation: say('$P(4)=16-8-8=0$ eta $P(-2)=4+4-8=0$. Negatiboak ere probatu behar dira.', '$P(4)=16-8-8=0$ y $P(-2)=4+4-8=0$. Hay que probar también los negativos.', '$P(4)=16-8-8=0$ و$P(-2)=4+4-8=0$. يجب تجريب السالبة أيضًا.', '$P(4)=16-8-8=0$ and $P(-2)=4+4-8=0$. The negatives must be tried too.')
        }
    },
    'common-factor': {
        mistake: {
            wrong: say('$4x^{2}+2x=2x(2x)$', '$4x^{2}+2x=2x(2x)$', '$4x^{2}+2x=2x(2x)$', '$4x^{2}+2x=2x(2x)$'),
            right: say('$2x$ zati $2x$ bat da, ez ezer: $4x^{2}+2x=2x(2x+1)$.', '$2x$ entre $2x$ es 1, no nada: $4x^{2}+2x=2x(2x+1)$.', '$2x$ على $2x$ يساوي 1 لا لا شيء: $4x^{2}+2x=2x(2x+1)$.', '$2x$ divided by $2x$ is 1, not nothing: $4x^{2}+2x=2x(2x+1)$.')
        },
        check: {
            prompt: say('Atera faktore komuna $6x^{2}+3x$ adierazpenean.', 'Saca factor común en $6x^{2}+3x$.', 'أخرج العامل المشترك في $6x^{2}+3x$.', 'Take out the common factor in $6x^{2}+3x$.'),
            options: [same('$3x(2x)$'), same('$3x(2x+1)$'), same('$3x(2x+3)$')],
            correctIndex: 1,
            explanation: say('$6x^{2}\\div 3x=2x$ eta $3x\\div 3x=1$: $3x(2x+1)$. Egiaztatu biderkatuz.', '$6x^{2}\\div 3x=2x$ y $3x\\div 3x=1$: $3x(2x+1)$. Compruébalo multiplicando.', '$6x^{2}\\div 3x=2x$ و$3x\\div 3x=1$: ‏$3x(2x+1)$. تحقق بالضرب.', '$6x^{2}\\div 3x=2x$ and $3x\\div 3x=1$: $3x(2x+1)$. Check by multiplying.')
        }
    },
    'factor-identities': {
        mistake: {
            wrong: say('$x^{2}-5x+6$ polinomioaren erroak 2 eta 3 dira, beraz $(x+2)(x+3)$.', 'Las raíces de $x^{2}-5x+6$ son 2 y 3, así que $(x+2)(x+3)$.', 'جذرا $x^{2}-5x+6$ هما 2 و3، إذن $(x+2)(x+3)$.', 'The roots of $x^{2}-5x+6$ are 2 and 3, so $(x+2)(x+3)$.'),
            right: say('$a$ erroa bada, faktorea $x-a$ da: $(x-2)(x-3)$. Egiaztatu: $x=2$ jarrita zero.', 'Si $a$ es raíz, el factor es $x-a$: $(x-2)(x-3)$. Comprueba: con $x=2$ da cero.', 'إذا كان $a$ جذرًا فالعامل $x-a$: $(x-2)(x-3)$. تحقق: مع $x=2$ يعطي صفرًا.', 'If $a$ is a root, the factor is $x-a$: $(x-2)(x-3)$. Check: with $x=2$ it gives zero.')
        },
        check: {
            prompt: say('$x^{2}+x-20$ polinomioaren erroak 4 eta $-5$ dira. Nola faktorizatzen da?', 'Las raíces de $x^{2}+x-20$ son 4 y $-5$. ¿Cómo se factoriza?', 'جذرا $x^{2}+x-20$ هما 4 و$-5$. كيف يُحلَّل؟', 'The roots of $x^{2}+x-20$ are 4 and $-5$. How is it factorised?'),
            options: [same('$(x+4)(x-5)$'), same('$(x-4)(x+5)$'), same('$(x-4)(x-5)$')],
            correctIndex: 1,
            explanation: say('$a$ erroa bada, faktorea $x-a$ da: $(x-4)(x-(-5))=(x-4)(x+5)$.', 'Si $a$ es raíz, el factor es $x-a$: $(x-4)(x-(-5))=(x-4)(x+5)$.', 'إذا كان $a$ جذرًا فالعامل $x-a$: ‏$(x-4)(x-(-5))=(x-4)(x+5)$.', 'If $a$ is a root, the factor is $x-a$: $(x-4)(x-(-5))=(x-4)(x+5)$.')
        }
    },
    'algebraic-fractions': {
        mistake: {
            wrong: say('$\\frac{x+5}{x}=5$, $x$ ezabatuta.', '$\\frac{x+5}{x}=5$, tachando la $x$.', '$\\frac{x+5}{x}=5$ بشطب $x$.', '$\\frac{x+5}{x}=5$, cancelling the $x$.'),
            right: say('Goian $x$ batugai bat da, ez faktore bat: ezin da ezabatu. $\\frac{x+5}{x}$ ezin da sinplifikatu.', 'Arriba la $x$ es un sumando, no un factor: no se puede tachar. $\\frac{x+5}{x}$ no se simplifica.', '$x$ في البسط حدّ مجموع لا عامل: لا يُشطب. و$\\frac{x+5}{x}$ لا يُبسّط.', 'On top the $x$ is a term being added, not a factor: it cannot be cancelled. $\\frac{x+5}{x}$ does not simplify.')
        },
        check: {
            prompt: say('Nola geratzen da $\\frac{x^{2}+3x}{x}$ sinplifikatuta?', '¿Cómo queda $\\frac{x^{2}+3x}{x}$ simplificada?', 'كيف يصبح $\\frac{x^{2}+3x}{x}$ بعد التبسيط؟', 'What is $\\frac{x^{2}+3x}{x}$ simplified?'),
            options: [same('$x^{2}+3$'), same('$x+3$'), same('$3x$')],
            correctIndex: 1,
            explanation: say('Faktorizatu lehenik: $\\frac{x(x+3)}{x}=x+3$. $x$ ezin da $3x$ batugaitik bakarrik ezabatu.', 'Factoriza primero: $\\frac{x(x+3)}{x}=x+3$. No se puede tachar la $x$ solo del sumando $3x$.', 'حلّل أولًا: $\\frac{x(x+3)}{x}=x+3$. ولا يجوز شطب $x$ من الحد $3x$ وحده.', 'Factorise first: $\\frac{x(x+3)}{x}=x+3$. You cannot cross out the $x$ from the term $3x$ alone.')
        }
    }
}

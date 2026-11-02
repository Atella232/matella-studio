import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Ekuazioak · 2. DBH — the typical mistake and the «Check it» question of
   every lesson. Plain data (no JSX) so the tests can import it; lessons.tsx
   merges it into the topics. The questions use new numbers, never those of
   «Let's solve» or of the example, and one of their wrong answers is the
   lesson's typical mistake.
   ========================================================================== */

export type EquationTopicId = 'meaning' | 'elements' | 'simple' | 'brackets' | 'special' | 'denominators' | 'lcm' | 'mixed' | 'problem-steps' | 'problems-ages' | 'problems-geometry' | 'quadratic' | 'incomplete' | 'formula'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const equationLessonChecks: Record<EquationTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    meaning: {
        mistake: {
            wrong: say('$3(x-1)=3x-3$ ebazpen bakarreko ekuazio bat da.', '$3(x-1)=3x-3$ es una ecuación con una sola solución.', '$3(x-1)=3x-3$ معادلة لها حل واحد فقط.', '$3(x-1)=3x-3$ is an equation with a single solution.'),
            right: say('x-ren edozein baliotarako betetzen da: identitate bat da. Probatu $x=0$ eta $x=5$ balioekin: bi atalek beti ematen dute gauza bera.', 'Se cumple para cualquier valor de x: es una identidad. Prueba con $x=0$ y con $x=5$: los dos miembros dan siempre lo mismo.', 'تتحقق لأي قيمة لـx: إنها متطابقة. جرّب $x=0$ و$x=5$: يعطي الطرفان دائمًا الشيء نفسه.', 'It holds for any value of x: it is an identity. Try $x=0$ and $x=5$: both sides always give the same.')
        },
        check: {
            prompt: say('Berdintza hauetatik, zein da identitate bat?', '¿Cuál de estas igualdades es una identidad?', 'أيّ هذه المساواة متطابقة؟', 'Which of these equalities is an identity?'),
            options: [same('$2x+1=7$'), same('$x+x=x^{2}$'), same('$4(x+2)=4x+8$')],
            correctIndex: 2,
            explanation: say('$4(x+2)=4x+8$ edozein x-rentzat betetzen da. $2x+1=7$ berdintza $x=3$ denean bakarrik, eta $x+x=2x$ da, ez $x^{2}$.', '$4(x+2)=4x+8$ se cumple para cualquier x. $2x+1=7$, solo para $x=3$, y $x+x=2x$, no $x^{2}$.', '$4(x+2)=4x+8$ تتحقق لأي x. أما $2x+1=7$ فعند $x=3$ فقط، و$x+x=2x$ لا $x^{2}$.', '$4(x+2)=4x+8$ holds for any x. $2x+1=7$ only for $x=3$, and $x+x=2x$, not $x^{2}$.')
        }
    },
    elements: {
        mistake: {
            wrong: same('$2x=10\\ \\to\\ x=10-2=8$'),
            right: say('2 zenbakiak x biderkatzen du: bi atalak 2 zenbakiaz zatitzen dira, $x=10\\mathbin{:}2=5$.', 'El 2 multiplica a x: se dividen los dos miembros entre 2, $x=10\\mathbin{:}2=5$.', 'العدد 2 يضرب x: نقسم الطرفين على 2، $x=10\\mathbin{:}2=5$.', 'The 2 multiplies x: divide both sides by 2, $x=10\\mathbin{:}2=5$.')
        },
        check: {
            prompt: say('Zein ekuazio da $x-4=6$ ekuazioaren baliokidea?', '¿Qué ecuación es equivalente a $x-4=6$?', 'أيّ معادلة تكافئ $x-4=6$؟', 'Which equation is equivalent to $x-4=6$?'),
            options: [same('$2x-8=12$'), same('$x=2$'), same('$2x-4=12$')],
            correctIndex: 0,
            explanation: say('$x-4=6$ ekuazioaren ebazpena $x=10$ da. Bi atalak (gai guztiak) 2 zenbakiaz biderkatuz: $2x-8=12$, eta horrek ere $x=10$ ematen du.', '$x-4=6$ tiene solución $x=10$. Multiplicando los dos miembros (todos los términos) por 2: $2x-8=12$, que también da $x=10$.', 'حل $x-4=6$ هو $x=10$. وبضرب الطرفين (كل الحدود) في 2: $2x-8=12$، وحلها أيضًا $x=10$.', '$x-4=6$ has the solution $x=10$. Multiplying both sides (every term) by 2: $2x-8=12$, which also gives $x=10$.')
        }
    },
    simple: {
        mistake: {
            wrong: same('$4x+3=x+9\\ \\to\\ 4x+x=9+3$'),
            right: say('Atalez aldatzean, zeinua aldatzen da: $4x-x=9-3$, $3x=6$ eta $x=2$.', 'Al cambiar de miembro, cambia el signo: $4x-x=9-3$, $3x=6$ y $x=2$.', 'عند تغيير الطرف تتغيّر الإشارة: $4x-x=9-3$، و$3x=6$، و$x=2$.', 'When a term changes side, its sign changes: $4x-x=9-3$, $3x=6$ and $x=2$.')
        },
        check: {
            prompt: say('Ebatzi $7x-5=3x+11$.', 'Resuelve $7x-5=3x+11$.', 'حلّ $7x-5=3x+11$.', 'Solve $7x-5=3x+11$.'),
            options: [same('$x=0{,}6$'), same('$x=4$'), same('$x=16$')],
            correctIndex: 1,
            explanation: say('$7x-3x=11+5$, $4x=16$ eta $x=4$. Egiaztatu: $7\\cdot 4-5=23=3\\cdot 4+11$.', '$7x-3x=11+5$, $4x=16$ y $x=4$. Comprueba: $7\\cdot 4-5=23=3\\cdot 4+11$.', '$7x-3x=11+5$، و$4x=16$، و$x=4$. تحقّق: $7\\cdot 4-5=23=3\\cdot 4+11$.', '$7x-3x=11+5$, $4x=16$ and $x=4$. Check: $7\\cdot 4-5=23=3\\cdot 4+11$.')
        }
    },
    brackets: {
        mistake: {
            wrong: same('$5-(x-3)=4\\ \\to\\ 5-x-3=4$'),
            right: say('Minusaren atzean zeinu guztiak aldatzen dira: $5-x+3=4$; beraz, $x=4$.', 'Tras el menos cambian todos los signos: $5-x+3=4$, así que $x=4$.', 'بعد الناقص تتغيّر كل الإشارات: $5-x+3=4$، إذن $x=4$.', 'After the minus every sign changes: $5-x+3=4$, so $x=4$.')
        },
        check: {
            prompt: say('Ebatzi $2(x+1)-(x-5)=10$.', 'Resuelve $2(x+1)-(x-5)=10$.', 'حلّ $2(x+1)-(x-5)=10$.', 'Solve $2(x+1)-(x-5)=10$.'),
            options: [same('$x=13$'), same('$x=4$'), same('$x=3$')],
            correctIndex: 2,
            explanation: say('$2x+2-x+5=10$, beraz $x+7=10$ eta $x=3$. $-(x-5)$ adierazpenean bi zeinuak aldatzen dira: $-x+5$.', '$2x+2-x+5=10$, así que $x+7=10$ y $x=3$. En $-(x-5)$ cambian los dos signos: $-x+5$.', '$2x+2-x+5=10$، إذن $x+7=10$ و$x=3$. في $-(x-5)$ تتغيّر الإشارتان: $-x+5$.', '$2x+2-x+5=10$, so $x+7=10$ and $x=3$. In $-(x-5)$ both signs change: $-x+5$.')
        }
    },
    special: {
        mistake: {
            wrong: same('$3x+2=3x+5\\ \\to\\ 0x=3\\ \\to\\ x=3$'),
            right: say('Ezein zenbaki bider 0 ez da 3: ekuazioak ez du ebazpenik.', 'Ningún número por 0 da 3: la ecuación no tiene solución.', 'لا يوجد عدد إذا ضُرب في 0 أعطى 3: ليس للمعادلة حل.', 'No number times 0 gives 3: the equation has no solution.')
        },
        check: {
            prompt: say('Zenbat ebazpen ditu $2x+7=2x+1$ ekuazioak?', '¿Cuántas soluciones tiene $2x+7=2x+1$?', 'كم حلًا للمعادلة $2x+7=2x+1$؟', 'How many solutions does $2x+7=2x+1$ have?'),
            options: [
                say('Bat ere ez', 'Ninguna', 'لا حل لها', 'None'),
                say('Bat: $x=-6$', 'Una: $x=-6$', 'حل واحد: $x=-6$', 'One: $x=-6$'),
                say('Infinitu', 'Infinitas', 'عدد لا نهائي من الحلول', 'Infinitely many')
            ],
            correctIndex: 0,
            explanation: say('$2x$ pasatzean $0x=-6$ geratzen da, eta ezein zenbaki bider 0 ez da $-6$: ez du ebazpenik.', 'Al pasar $2x$ queda $0x=-6$, y ningún número por 0 da $-6$: no tiene solución.', 'عند نقل $2x$ يبقى $0x=-6$، ولا يوجد عدد إذا ضُرب في 0 أعطى $-6$: ليس لها حل.', 'Moving $2x$ leaves $0x=-6$, and no number times 0 gives $-6$: there is no solution.')
        }
    },
    denominators: {
        mistake: {
            wrong: same('$\\frac{x}{4}+3=5\\ \\to\\ x+3=20$'),
            right: say('Gai guztiak biderkatu behar dira 4 zenbakiaz, baita 3 ere: $x+12=20$; beraz, $x=8$.', 'Hay que multiplicar todos los términos por 4, también el 3: $x+12=20$, así que $x=8$.', 'يجب ضرب كل الحدود في 4، والعدد 3 أيضًا: $x+12=20$، إذن $x=8$.', 'Every term must be multiplied by 4, the 3 as well: $x+12=20$, so $x=8$.')
        },
        check: {
            prompt: say('Ebatzi $\\frac{x}{5}-1=3$.', 'Resuelve $\\frac{x}{5}-1=3$.', 'حلّ $\\frac{x}{5}-1=3$.', 'Solve $\\frac{x}{5}-1=3$.'),
            options: [same('$x=16$'), same('$x=20$'), same('$x=10$')],
            correctIndex: 1,
            explanation: say('Gai guztiak bider 5: $x-5=15$, eta $x=20$. 16 ateratzen da 1 zenbakia biderkatzea ahazten bada.', 'Todos los términos por 5: $x-5=15$, y $x=20$. El 16 sale si se olvida multiplicar el 1.', 'كل الحدود في 5: $x-5=15$، و$x=20$. أما 16 فتأتي إذا نسينا ضرب العدد 1.', 'Every term times 5: $x-5=15$, and $x=20$. 16 comes from forgetting to multiply the 1.')
        }
    },
    lcm: {
        mistake: {
            wrong: same('$\\frac{x}{4}+\\frac{x}{6}=5\\ \\to\\ x+x=60$'),
            right: say('Zatiki bakoitzean, MKT zati izendatzailea: $12\\mathbin{:}4=3$ eta $12\\mathbin{:}6=2$. $3x+2x=60$ geratzen da, eta $x=12$.', 'En cada fracción, m.c.m. entre denominador: $12\\mathbin{:}4=3$ y $12\\mathbin{:}6=2$. Queda $3x+2x=60$, y $x=12$.', 'في كل كسر نقسم م.م.أ على المقام: $12\\mathbin{:}4=3$ و$12\\mathbin{:}6=2$. فيبقى $3x+2x=60$، و$x=12$.', 'In each fraction, LCM divided by the denominator: $12\\mathbin{:}4=3$ and $12\\mathbin{:}6=2$. That leaves $3x+2x=60$, and $x=12$.')
        },
        check: {
            prompt: say('Ebatzi $\\frac{x}{2}-\\frac{x}{5}=3$.', 'Resuelve $\\frac{x}{2}-\\frac{x}{5}=3$.', 'حلّ $\\frac{x}{2}-\\frac{x}{5}=3$.', 'Solve $\\frac{x}{2}-\\frac{x}{5}=3$.'),
            options: [same('$x=1$'), same('$x=30$'), same('$x=10$')],
            correctIndex: 2,
            explanation: say('2 eta 5 zenbakien MKT 10 da: $5x-2x=30$, $3x=30$ eta $x=10$. 3 zenbakia ere bider 10.', 'El m.c.m. de 2 y 5 es 10: $5x-2x=30$, $3x=30$ y $x=10$. El 3 también va por 10.', 'م.م.أ للعددين 2 و5 هو 10: $5x-2x=30$، و$3x=30$، و$x=10$. والعدد 3 يُضرب في 10 أيضًا.', 'The LCM of 2 and 5 is 10: $5x-2x=30$, $3x=30$ and $x=10$. The 3 is multiplied by 10 as well.')
        }
    },
    mixed: {
        mistake: {
            wrong: same('$\\frac{x}{2}-\\frac{x-4}{3}=2\\ \\to\\ 3x-2x-8=12$'),
            right: say('$x-4$ zenbakitzailea parentesi artean doa: $3x-2(x-4)=12$, hau da, $3x-2x+8=12$, eta $x=4$.', 'El numerador $x-4$ va entre paréntesis: $3x-2(x-4)=12$, es decir, $3x-2x+8=12$, y $x=4$.', 'البسط $x-4$ يوضع بين قوسين: $3x-2(x-4)=12$، أي $3x-2x+8=12$، و$x=4$.', 'The numerator $x-4$ goes in brackets: $3x-2(x-4)=12$, that is $3x-2x+8=12$, and $x=4$.')
        },
        check: {
            prompt: say('Ebatzi $\\frac{x+2}{3}-\\frac{x-1}{2}=1$.', 'Resuelve $\\frac{x+2}{3}-\\frac{x-1}{2}=1$.', 'حلّ $\\frac{x+2}{3}-\\frac{x-1}{2}=1$.', 'Solve $\\frac{x+2}{3}-\\frac{x-1}{2}=1$.'),
            options: [same('$x=1$'), same('$x=-5$'), same('$x=7$')],
            correctIndex: 0,
            explanation: say('MKT = 6: $2(x+2)-3(x-1)=6$, $2x+4-3x+3=6$; beraz, $x=1$. $-3(x-1)$ adierazpenean bi zeinuak aldatzen dira.', 'm.c.m. = 6: $2(x+2)-3(x-1)=6$, $2x+4-3x+3=6$, así que $x=1$. En $-3(x-1)$ cambian los dos signos.', 'م.م.أ = 6: $2(x+2)-3(x-1)=6$، و$2x+4-3x+3=6$، إذن $x=1$. في $-3(x-1)$ تتغيّر الإشارتان.', 'LCM = 6: $2(x+2)-3(x-1)=6$, $2x+4-3x+3=6$, so $x=1$. In $-3(x-1)$ both signs change.')
        }
    },
    'problem-steps': {
        mistake: {
            wrong: say('Zenbaki bat pentsatu dut, 7 batu diot eta emaitza 2 zenbakiaz biderkatu: 30 atera da. Planteatzen dut: $x+7\\cdot 2=30$.', 'Pienso un número, le sumo 7 y multiplico el resultado por 2: sale 30. Planteo $x+7\\cdot 2=30$.', 'فكّرتُ في عدد وأضفت إليه 7 ثم ضربت الناتج في 2 فحصلت على 30. أكتب: $x+7\\cdot 2=30$.', 'I think of a number, add 7 and multiply the result by 2: I get 30. I write $x+7\\cdot 2=30$.'),
            right: say('Lehenik batu egiten da, eta gero biderkatu: $2(x+7)=30$; beraz, $x=8$. Egiaztatu enuntziatuan: $8+7=15$ eta $15\\cdot 2=30$.', 'Primero se suma y luego se multiplica: $2(x+7)=30$, así que $x=8$. Comprueba en el enunciado: $8+7=15$ y $15\\cdot 2=30$.', 'نجمع أولًا ثم نضرب: $2(x+7)=30$، إذن $x=8$. تحقّق في نص المسألة: $8+7=15$ و$15\\cdot 2=30$.', 'First you add, then you multiply: $2(x+7)=30$, so $x=8$. Check it in the problem: $8+7=15$ and $15\\cdot 2=30$.')
        },
        check: {
            prompt: say('Zenbaki baten hirukoitza ken 4 = 20. Zein ekuaziok esaten du hori?', 'El triple de un número menos 4 es igual a 20. ¿Qué ecuación lo dice?', 'ثلاثة أضعاف عدد ناقص 4 يساوي 20. أيّ معادلة تعبّر عن ذلك؟', 'Three times a number minus 4 equals 20. Which equation says this?'),
            options: [same('$3(x-4)=20$'), same('$3x-4=20$'), same('$3+x-4=20$')],
            correctIndex: 1,
            explanation: say('Lehenik hirukoitza, $3x$, eta gero ken 4: $3x-4=20$; beraz, $x=8$. Parentesiarekin, biderkatu aurretik kenduko litzateke.', 'Primero el triple, $3x$, y después menos 4: $3x-4=20$, así que $x=8$. Con el paréntesis se restaría antes de multiplicar.', 'أولًا ثلاثة الأضعاف $3x$ ثم ناقص 4: $3x-4=20$، إذن $x=8$. ومع القوسين نطرح قبل أن نضرب.', 'First three times the number, $3x$, then minus 4: $3x-4=20$, so $x=8$. With the brackets you would subtract before multiplying.')
        }
    },
    'problems-ages': {
        mistake: {
            wrong: say('Alaba batek x urte ditu eta haren amak $3x$. Hemendik 10 urtera: $x+10$ eta $3x$.', 'Una hija tiene x años y su madre, $3x$. Dentro de 10 años: $x+10$ y $3x$.', 'عمر بنت x سنة وعمر أمها $3x$. بعد 10 سنوات: $x+10$ و$3x$.', 'A daughter is x years old and her mother is $3x$. In 10 years: $x+10$ and $3x$.'),
            right: say('Urteak bientzat pasatzen dira: hemendik 10 urtera, $x+10$ eta $3x+10$.', 'Los años pasan para las dos: dentro de 10 años, $x+10$ y $3x+10$.', 'السنوات تمر على الاثنتين: بعد 10 سنوات $x+10$ و$3x+10$.', 'The years go by for both: in 10 years, $x+10$ and $3x+10$.')
        },
        check: {
            prompt: say('Ama batek 40 urte ditu eta haren semeak 10. Zenbat urte barru izango ditu amak semearen adinaren bikoitza?', 'Una madre tiene 40 años y su hijo, 10. ¿Dentro de cuántos años tendrá la madre el doble de la edad del hijo?', 'عمر أم 40 سنة وعمر ابنها 10 سنوات. بعد كم سنة يصبح عمر الأم ضعف عمر الابن؟', 'A mother is 40 and her son is 10. In how many years will the mother be twice as old as her son?'),
            options: [same('$10$'), same('$15$'), same('$20$')],
            correctIndex: 2,
            explanation: say('x urte barru: $40+x=2(10+x)$; beraz, $x=20$. Egiaztatu: 60 eta 30 urte. 10 ateratzen da urteak semeari bakarrik gehituz gero.', 'Dentro de x años: $40+x=2(10+x)$, así que $x=20$. Comprueba: 60 y 30 años. El 10 sale si los años se suman solo al hijo.', 'بعد x سنة: $40+x=2(10+x)$، إذن $x=20$. تحقّق: 60 و30 سنة. أما 10 فتأتي إذا أضفنا السنوات إلى الابن وحده.', 'In x years: $40+x=2(10+x)$, so $x=20$. Check: 60 and 30. 10 comes from adding the years to the son only.')
        }
    },
    'problems-geometry': {
        mistake: {
            wrong: say('Laukizuzen baten zabalera x da eta luzera $x+4$; perimetroa 28 m da: $x+(x+4)=28$.', 'Un rectángulo de ancho x y largo $x+4$ tiene 28 m de perímetro: $x+(x+4)=28$.', 'مستطيل عرضه x وطوله $x+4$ ومحيطه 28 م: $x+(x+4)=28$.', 'A rectangle x wide and $x+4$ long has a perimeter of 28 m: $x+(x+4)=28$.'),
            right: say('Perimetroak lau alde ditu: $2x+2(x+4)=28$; beraz, zabalera 5 m da.', 'El perímetro tiene cuatro lados: $2x+2(x+4)=28$, así que el ancho mide 5 m.', 'للمحيط أربعة أضلاع: $2x+2(x+4)=28$، إذن العرض 5 م.', 'The perimeter has four sides: $2x+2(x+4)=28$, so the width is 5 m.')
        },
        check: {
            prompt: say('Hiru zenbaki jarraituren batura 72 da. Zein da txikiena?', 'La suma de tres números consecutivos es 72. ¿Cuál es el menor?', 'مجموع ثلاثة أعداد متتالية 72. ما أصغرها؟', 'Three consecutive numbers add up to 72. Which is the smallest?'),
            options: [same('$23$'), same('$24$'), same('$22$')],
            correctIndex: 0,
            explanation: say('$x+(x+1)+(x+2)=72$; beraz, $3x+3=72$ eta $x=23$: zenbakiak 23, 24 eta 25 dira. 24 erdikoa da.', '$x+(x+1)+(x+2)=72$, así que $3x+3=72$ y $x=23$: los números son 23, 24 y 25. El 24 es el del medio.', '$x+(x+1)+(x+2)=72$، إذن $3x+3=72$ و$x=23$: الأعداد 23 و24 و25. و24 هو الأوسط.', '$x+(x+1)+(x+2)=72$, so $3x+3=72$ and $x=23$: the numbers are 23, 24 and 25. 24 is the middle one.')
        }
    },
    quadratic: {
        mistake: {
            wrong: say('$3x-x^{2}+4=0$ ekuazioan: $a=3$, $b=-1$, $c=4$.', 'En $3x-x^{2}+4=0$: $a=3$, $b=-1$, $c=4$.', 'في $3x-x^{2}+4=0$: $a=3$ و$b=-1$ و$c=4$.', 'In $3x-x^{2}+4=0$: $a=3$, $b=-1$, $c=4$.'),
            right: say('Lehenik ordenatu: $-x^{2}+3x+4=0$. Orduan $a=-1$, $b=3$ eta $c=4$.', 'Primero ordena: $-x^{2}+3x+4=0$. Entonces $a=-1$, $b=3$ y $c=4$.', 'رتّب أولًا: $-x^{2}+3x+4=0$. عندئذ $a=-1$ و$b=3$ و$c=4$.', 'First put it in order: $-x^{2}+3x+4=0$. Then $a=-1$, $b=3$ and $c=4$.')
        },
        check: {
            prompt: say('Nola geratzen da $2x^{2}=5x-3$ forma orokorrean?', '¿Cómo queda $2x^{2}=5x-3$ en forma general?', 'كيف تُكتب $2x^{2}=5x-3$ بالصيغة العامة؟', 'What is $2x^{2}=5x-3$ in general form?'),
            options: [same('$2x^{2}+5x-3=0$'), same('$2x^{2}-5x+3=0$'), same('$2x^{2}-5x-3=0$')],
            correctIndex: 1,
            explanation: say('$5x$ eta $-3$ ezkerrera pasatzean, biek zeinua aldatzen dute: $2x^{2}-5x+3=0$.', 'Al pasar $5x$ y $-3$ a la izquierda, los dos cambian de signo: $2x^{2}-5x+3=0$.', 'عند نقل $5x$ و$-3$ إلى اليسار تتغيّر إشارتاهما: $2x^{2}-5x+3=0$.', 'Moving $5x$ and $-3$ to the left, both change sign: $2x^{2}-5x+3=0$.')
        }
    },
    incomplete: {
        mistake: {
            wrong: same('$x^{2}=6x\\ \\to\\ x=6$'),
            right: say('x-z zatitzean $x=0$ galtzen da. Atera faktore komuna: $x(x-6)=0$; beraz, $x=0$ eta $x=6$.', 'Al dividir entre x se pierde $x=0$. Saca factor común: $x(x-6)=0$, así que $x=0$ y $x=6$.', 'عند القسمة على x يضيع الحل $x=0$. أخرج العامل المشترك: $x(x-6)=0$، إذن $x=0$ و$x=6$.', 'Dividing by x loses $x=0$. Take out the common factor: $x(x-6)=0$, so $x=0$ and $x=6$.')
        },
        check: {
            prompt: say('Ebatzi $3x^{2}-27=0$.', 'Resuelve $3x^{2}-27=0$.', 'حلّ $3x^{2}-27=0$.', 'Solve $3x^{2}-27=0$.'),
            options: [same('$x=3$'), same('$x=9$'), same('$x=\\pm 3$')],
            correctIndex: 2,
            explanation: say('$x^{2}=27\\mathbin{:}3=9$, eta erro karratuak bi ebazpen aurkako ematen ditu: $x=3$ eta $x=-3$.', '$x^{2}=27\\mathbin{:}3=9$, y la raíz cuadrada da dos soluciones opuestas: $x=3$ y $x=-3$.', '$x^{2}=27\\mathbin{:}3=9$، والجذر التربيعي يعطي حلّين متعاكسين: $x=3$ و$x=-3$.', '$x^{2}=27\\mathbin{:}3=9$, and the square root gives two opposite solutions: $x=3$ and $x=-3$.')
        }
    },
    formula: {
        mistake: {
            wrong: say('$x^{2}+4x+3=0$ ekuazioan: $x=\\frac{4\\pm\\sqrt{16-12}}{2}$.', 'En $x^{2}+4x+3=0$: $x=\\frac{4\\pm\\sqrt{16-12}}{2}$.', 'في $x^{2}+4x+3=0$: $x=\\frac{4\\pm\\sqrt{16-12}}{2}$.', 'In $x^{2}+4x+3=0$: $x=\\frac{4\\pm\\sqrt{16-12}}{2}$.'),
            right: say('Formulan $-b$ doa: $x=\\frac{-4\\pm 2}{2}$; beraz, $x=-1$ eta $x=-3$.', 'En la fórmula va $-b$: $x=\\frac{-4\\pm 2}{2}$, así que $x=-1$ y $x=-3$.', 'في القانون نضع $-b$: $x=\\frac{-4\\pm 2}{2}$، إذن $x=-1$ و$x=-3$.', 'The formula has $-b$: $x=\\frac{-4\\pm 2}{2}$, so $x=-1$ and $x=-3$.')
        },
        check: {
            prompt: say('Ebatzi $x^{2}-7x+10=0$.', 'Resuelve $x^{2}-7x+10=0$.', 'حلّ $x^{2}-7x+10=0$.', 'Solve $x^{2}-7x+10=0$.'),
            options: [same('$x=5,\\ x=2$'), same('$x=-2,\\ x=-5$'), same('$x=7,\\ x=10$')],
            correctIndex: 0,
            explanation: say('$\\Delta=(-7)^{2}-4\\cdot 1\\cdot 10=9$. $-b=7$ denez: $x=\\frac{7\\pm 3}{2}$; beraz, $x=5$ eta $x=2$.', '$\\Delta=(-7)^{2}-4\\cdot 1\\cdot 10=9$. Con $-b=7$: $x=\\frac{7\\pm 3}{2}$, así que $x=5$ y $x=2$.', '$\\Delta=(-7)^{2}-4\\cdot 1\\cdot 10=9$. ومع $-b=7$: $x=\\frac{7\\pm 3}{2}$، إذن $x=5$ و$x=2$.', '$\\Delta=(-7)^{2}-4\\cdot 1\\cdot 10=9$. With $-b=7$: $x=\\frac{7\\pm 3}{2}$, so $x=5$ and $x=2$.')
        }
    }
}

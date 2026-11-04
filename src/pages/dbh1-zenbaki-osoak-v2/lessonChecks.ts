import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki osoak · 1. DBH — the typical mistake and the «Check it» question
   of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. The opposite is named in the
   words (Aur, Op), never inside $…$: the formulas are the same in every
   language.
   ========================================================================== */

export type IntegerIntroTopicId = 'negatives' | 'integer-set' | 'number-line' | 'compare' | 'order' | 'absolute' | 'opposite' | 'compare-absolute' | 'add-same' | 'add-different' | 'subtract' | 'brackets' | 'multiply' | 'divide'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const integerIntroLessonChecks: Record<IntegerIntroTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Meaning ---------- */
    negatives: {
        mistake: {
            wrong: say('40 euroko zorra $+40$ idazten da.', 'Una deuda de 40 € se escribe $+40$.', 'الدَّين بقيمة 40 يورو يُكتب $+40$.', 'A debt of €40 is written $+40$.'),
            right: say('Zor izatea zerotik behera egotea da: zorra $-40$ euro da.', 'Deber es estar por debajo de cero: la deuda es $-40$ €.', 'أن تكون مدينًا يعني أن تكون تحت الصفر: الدَّين هو $-40$ يورو.', 'Owing is being below zero: the debt is $-40$.')
        },
        check: {
            prompt: say('Egoera hauetatik, zein idazten da zenbaki negatibo batekin?', '¿Qué situación se escribe con un número negativo?', 'أيّ موقف يُكتب بعدد سالب؟', 'Which situation is written with a negative number?'),
            options: [
                say('20 euro irabaztea', 'Ganar 20 €', 'ربح 20 يورو', 'Winning €20'),
                say('3 solairu igotzea', 'Subir 3 plantas', 'الصعود 3 طوابق', 'Going up 3 floors'),
                say('Bigarren sotora jaistea', 'Bajar al segundo sótano', 'النزول إلى الطابق الثاني تحت الأرض', 'Going down to the second basement')
            ],
            correctIndex: 2,
            explanation: say('Sotoa beheko solairuaren azpian dago: $-2$.', 'El sótano está por debajo de la planta baja: $-2$.', 'الطابق تحت الأرض أسفل الطابق الأرضي: $-2$.', 'The basement is below the ground floor: $-2$.')
        }
    },
    'integer-set': {
        mistake: {
            wrong: say('0 zenbaki positiboa da.', 'El 0 es un número positivo.', 'الصفر عدد موجب.', '0 is a positive number.'),
            right: say('0 ez da ez positiboa ez negatiboa: positiboak eta negatiboak bereizten ditu.', 'El 0 no es ni positivo ni negativo: separa los positivos de los negativos.', 'الصفر ليس موجبًا ولا سالبًا: إنه يفصل الموجبة عن السالبة.', '0 is neither positive nor negative: it separates the positives from the negatives.')
        },
        check: {
            prompt: say('Zein zerrendak ditu zenbaki oso positiboak bakarrik?', '¿Qué lista tiene solo enteros positivos?', 'أيّ قائمة فيها أعداد صحيحة موجبة فقط؟', 'Which list has only positive integers?'),
            options: [same('$+3,\\ 0,\\ +8$'), same('$+1,\\ +6,\\ +9$'), same('$-2,\\ +4,\\ +7$')],
            correctIndex: 1,
            explanation: say('0 ez da positiboa, eta $-2$ negatiboa da.', 'El 0 no es positivo y $-2$ es negativo.', 'الصفر ليس موجبًا و$-2$ سالب.', '0 is not positive and $-2$ is negative.')
        }
    },

    /* ---------- 2. The number line ---------- */
    'number-line': {
        mistake: {
            wrong: say('Zuzenean, $-6$ zenbakia $-2$ baino eskuinerago dago, 6 handiagoa delako 2 baino.', 'En la recta, $-6$ está más a la derecha que $-2$, porque 6 es mayor que 2.', 'على المستقيم يقع $-6$ يمين $-2$ لأن 6 أكبر من 2.', 'On the line, $-6$ is further right than $-2$, because 6 is bigger than 2.'),
            right: say('Negatiboak 0 zenbakiaren ezkerrean daude: zenbat eta urrunago, orduan eta ezkerrerago. $-6$ zenbakia $-2$ zenbakiaren ezkerrean dago.', 'Los negativos van a la izquierda del 0: cuanto más lejos, más a la izquierda. $-6$ está a la izquierda de $-2$.', 'السالبة على يسار الصفر: كلما ابتعدت صارت أكثر يسارًا. إذن $-6$ يقع يسار $-2$.', 'Negatives go to the left of 0: the further away, the further left. $-6$ is to the left of $-2$.')
        },
        check: {
            prompt: say('Zein zenbaki dago ezkerren zuzenean?', '¿Qué número está más a la izquierda en la recta?', 'أيّ عدد يقع أبعد إلى اليسار على المستقيم؟', 'Which number is furthest left on the line?'),
            options: [same('$-1$'), same('$-7$'), same('$+2$')],
            correctIndex: 1,
            explanation: say('$-7$ da 0 zenbakitik urrunen dagoen negatiboa.', '$-7$ es el negativo más alejado del 0.', '$-7$ هو العدد السالب الأبعد عن الصفر.', '$-7$ is the negative furthest from 0.')
        }
    },
    compare: {
        mistake: {
            wrong: say('$-8>-3$, 8 handiagoa delako 3 baino.', '$-8>-3$, porque 8 es mayor que 3.', '$-8>-3$ لأن 8 أكبر من 3.', '$-8>-3$, because 8 is bigger than 3.'),
            right: say('Negatiboetan, 0 zenbakitik hurbilago dagoena da handiagoa: $-3>-8$.', 'Entre negativos es mayor el que está más cerca del 0: $-3>-8$.', 'بين الأعداد السالبة يكون الأكبر هو الأقرب إلى الصفر: $-3>-8$.', 'Between negatives, the one closer to 0 is bigger: $-3>-8$.')
        },
        check: {
            prompt: say('Zein konparazio da zuzena?', '¿Qué comparación es correcta?', 'أيّ مقارنة صحيحة؟', 'Which comparison is right?'),
            options: [same('$-5>-1$'), same('$-10<-12$'), same('$-4>-9$')],
            correctIndex: 2,
            explanation: say('$-4$ zenbakia $-9$ baino eskuinerago dago: handiagoa da.', '$-4$ está más a la derecha que $-9$: es mayor.', '$-4$ يقع يمين $-9$: إذن هو الأكبر.', '$-4$ is further right than $-9$: it is bigger.')
        }
    },
    order: {
        mistake: {
            wrong: say('Txikienetik handienera: $-1,\\ -4,\\ -10$.', 'De menor a mayor: $-1,\\ -4,\\ -10$.', 'من الأصغر إلى الأكبر: $-1,\\ -4,\\ -10$.', 'From smallest to largest: $-1,\\ -4,\\ -10$.'),
            right: say('Negatiboetan, 0 zenbakitik urrunen dagoena da txikiena: $-10<-4<-1$.', 'Entre negativos, el más alejado del 0 es el menor: $-10<-4<-1$.', 'بين السالبة يكون الأبعد عن الصفر هو الأصغر: $-10<-4<-1$.', 'Between negatives, the one furthest from 0 is the smallest: $-10<-4<-1$.')
        },
        check: {
            prompt: say('Zein zerrenda dago ordenatuta txikienetik handienera?', '¿Qué lista está ordenada de menor a mayor?', 'أيّ قائمة مرتبة من الأصغر إلى الأكبر؟', 'Which list is in order from smallest to largest?'),
            options: [same('$-3,\\ -8,\\ 0,\\ +6$'), same('$-8,\\ -3,\\ 0,\\ +6$'), same('$0,\\ -3,\\ -8,\\ +6$')],
            correctIndex: 1,
            explanation: say('Lehenik negatiboak, urrunenetik hasita: $-8<-3$; gero 0, eta azkenik $+6$.', 'Primero los negativos, del más lejano: $-8<-3$; luego el 0 y al final $+6$.', 'أولًا السالبة بدءًا بالأبعد: $-8<-3$؛ ثم الصفر، وأخيرًا $+6$.', 'First the negatives, starting with the furthest: $-8<-3$; then 0 and finally $+6$.')
        }
    },

    /* ---------- 3. Absolute value and opposite ---------- */
    absolute: {
        mistake: {
            wrong: say('$\\lvert -8\\rvert =-8$, zenbakia negatiboa delako.', '$\\lvert -8\\rvert =-8$, porque el número es negativo.', '$\\lvert -8\\rvert =-8$ لأن العدد سالب.', '$\\lvert -8\\rvert =-8$, because the number is negative.'),
            right: say('Balio absolutua distantzia bat da, eta ez da inoiz negatiboa: $\\lvert -8\\rvert =8$.', 'El valor absoluto es una distancia y nunca es negativo: $\\lvert -8\\rvert =8$.', 'القيمة المطلقة مسافة، فهي ليست سالبة أبدًا: $\\lvert -8\\rvert =8$.', 'The absolute value is a distance, so it is never negative: $\\lvert -8\\rvert =8$.')
        },
        check: {
            prompt: say('Zenbat da $\\lvert -6\\rvert +\\lvert +4\\rvert$?', '¿Cuánto vale $\\lvert -6\\rvert +\\lvert +4\\rvert$?', 'كم يساوي $\\lvert -6\\rvert +\\lvert +4\\rvert$؟', 'What is $\\lvert -6\\rvert +\\lvert +4\\rvert$?'),
            options: [same('$10$'), same('$-2$'), same('$2$')],
            correctIndex: 0,
            explanation: say('Bi distantzia dira: $6+4=10$.', 'Son dos distancias: $6+4=10$.', 'هما مسافتان: $6+4=10$.', 'They are two distances: $6+4=10$.')
        }
    },
    opposite: {
        mistake: {
            wrong: say('$-9$ zenbakiaren aurkakoa $-9$ da, balio absolutu bera duelako.', 'El opuesto de $-9$ es $-9$, porque tiene el mismo valor absoluto.', 'معاكس $-9$ هو $-9$ لأن له القيمة المطلقة نفسها.', 'The opposite of $-9$ is $-9$, because it has the same absolute value.'),
            right: say('Aurkakoek balio absolutu bera dute, baina zeinua aldatuta: $-9$ zenbakiaren aurkakoa $+9$ da.', 'Los opuestos tienen el mismo valor absoluto, pero el signo cambiado: el opuesto de $-9$ es $+9$.', 'للمتعاكسين القيمة المطلقة نفسها لكن الإشارة معكوسة: معاكس $-9$ هو $+9$.', 'Opposites have the same absolute value but the sign changed: the opposite of $-9$ is $+9$.')
        },
        check: {
            prompt: say('Zein da $+15$ zenbakiaren aurkakoa?', '¿Cuál es el opuesto de $+15$?', 'ما معاكس $+15$؟', 'What is the opposite of $+15$?'),
            options: [same('$+15$'), same('$-15$'), same('$0$')],
            correctIndex: 1,
            explanation: say('Zeinua aldatzen da: $-15$. Biak zerotik 15 unitatera daude.', 'Se cambia el signo: $-15$. Los dos están a 15 unidades del cero.', 'نغيّر الإشارة: $-15$. كلاهما على بعد 15 وحدة من الصفر.', 'Change the sign: $-15$. Both are 15 units from zero.')
        }
    },
    'compare-absolute': {
        mistake: {
            wrong: say('$-15>-5$, $\\lvert -15\\rvert >\\lvert -5\\rvert$ delako.', '$-15>-5$, porque $\\lvert -15\\rvert >\\lvert -5\\rvert$.', '$-15>-5$ لأن $\\lvert -15\\rvert >\\lvert -5\\rvert$.', '$-15>-5$, because $\\lvert -15\\rvert >\\lvert -5\\rvert$.'),
            right: say('Negatiboetan, balio absolutu txikiena duena da handiena: $-5>-15$.', 'Entre negativos es mayor el de menor valor absoluto: $-5>-15$.', 'بين السالبة يكون الأكبر صاحب القيمة المطلقة الأصغر: $-5>-15$.', 'Between negatives, the one with the smaller absolute value is bigger: $-5>-15$.')
        },
        check: {
            prompt: say('Zein da handiagoa, $-17$ ala $-23$?', '¿Qué número es mayor, $-17$ o $-23$?', 'أيّ العددين أكبر: $-17$ أم $-23$؟', 'Which number is bigger, $-17$ or $-23$?'),
            options: [same('$-17$'), same('$-23$'), say('Berdinak dira', 'Son iguales', 'متساويان', 'They are equal')],
            correctIndex: 0,
            explanation: say('Biak negatiboak dira: $\\lvert -17\\rvert <\\lvert -23\\rvert$, beraz $-17>-23$.', 'Los dos son negativos: $\\lvert -17\\rvert <\\lvert -23\\rvert$, así que $-17>-23$.', 'كلاهما سالب: $\\lvert -17\\rvert <\\lvert -23\\rvert$، إذن $-17>-23$.', 'Both are negative: $\\lvert -17\\rvert <\\lvert -23\\rvert$, so $-17>-23$.')
        }
    },

    /* ---------- 4. Adding and subtracting ---------- */
    'add-same': {
        mistake: {
            wrong: say('$(-6)+(-3)=+9$', '$(-6)+(-3)=+9$', '$(-6)+(-3)=+9$', '$(-6)+(-3)=+9$'),
            right: say('Zeinu bera: batu eta zeinua mantendu: $(-6)+(-3)=-9$.', 'Mismo signo: se suman y se queda el signo: $(-6)+(-3)=-9$.', 'الإشارة نفسها: نجمع وتبقى الإشارة: $(-6)+(-3)=-9$.', 'Same sign: add them and keep the sign: $(-6)+(-3)=-9$.')
        },
        check: {
            prompt: say('Zenbat da $(-8)+(-5)$?', '¿Cuánto es $(-8)+(-5)$?', 'كم يساوي $(-8)+(-5)$؟', 'What is $(-8)+(-5)$?'),
            options: [same('$-3$'), same('$+13$'), same('$-13$')],
            correctIndex: 2,
            explanation: say('$8+5=13$, eta zeinua −: 8 euro eta 5 euro zor badituzu, 13 euro zor dituzu.', '$8+5=13$ y signo −: si debes 8 € y 5 €, debes 13 €.', '$8+5=13$ والإشارة −: إذا كنت مدينًا بـ8 يورو و5 يورو فأنت مدين بـ13 يورو.', '$8+5=13$ and sign −: if you owe €8 and €5, you owe €13.')
        }
    },
    'add-different': {
        mistake: {
            wrong: say('$(+3)+(-8)=+5$', '$(+3)+(-8)=+5$', '$(+3)+(-8)=+5$', '$(+3)+(-8)=+5$'),
            right: say('Balio absolutu handiena duenak irabazten du, $-8$ zenbakiak: $(+3)+(-8)=-5$.', 'Gana el que tiene mayor valor absoluto, el $-8$: $(+3)+(-8)=-5$.', 'يغلب صاحب القيمة المطلقة الأكبر، أي $-8$: $(+3)+(-8)=-5$.', 'The one with the bigger absolute value wins, the $-8$: $(+3)+(-8)=-5$.')
        },
        check: {
            prompt: say('Zenbat da $(-9)+(+4)$?', '¿Cuánto es $(-9)+(+4)$?', 'كم يساوي $(-9)+(+4)$؟', 'What is $(-9)+(+4)$?'),
            options: [same('$-5$'), same('$+5$'), same('$-13$')],
            correctIndex: 0,
            explanation: say('$9-4=5$, eta $-9$ zenbakiak irabazten du: $-5$.', '$9-4=5$, y gana el $-9$: $-5$.', '$9-4=5$، ويغلب $-9$: النتيجة $-5$.', '$9-4=5$, and the $-9$ wins: $-5$.')
        }
    },
    subtract: {
        mistake: {
            wrong: say('$(+4)-(-6)=-2$', '$(+4)-(-6)=-2$', '$(+4)-(-6)=-2$', '$(+4)-(-6)=-2$'),
            right: say('$-6$ kentzea $+6$ batzea da: $(+4)-(-6)=(+4)+(+6)=+10$.', 'Restar $-6$ es sumar $+6$: $(+4)-(-6)=(+4)+(+6)=+10$.', 'طرح $-6$ هو جمع $+6$: $(+4)-(-6)=(+4)+(+6)=+10$.', 'Subtracting $-6$ is adding $+6$: $(+4)-(-6)=(+4)+(+6)=+10$.')
        },
        check: {
            prompt: say('Zenbat da $(-3)-(+5)$?', '¿Cuánto es $(-3)-(+5)$?', 'كم يساوي $(-3)-(+5)$؟', 'What is $(-3)-(+5)$?'),
            options: [same('$+2$'), same('$-8$'), same('$-2$')],
            correctIndex: 1,
            explanation: say('Aurkakoa batu: $(-3)+(-5)=-8$.', 'Suma el opuesto: $(-3)+(-5)=-8$.', 'اجمع المعاكس: $(-3)+(-5)=-8$.', 'Add the opposite: $(-3)+(-5)=-8$.')
        }
    },
    brackets: {
        mistake: {
            wrong: say('$9-(2-7)=9-2-7=0$', '$9-(2-7)=9-2-7=0$', '$9-(2-7)=9-2-7=0$', '$9-(2-7)=9-2-7=0$'),
            right: say('Aurrean − badago, barruko zeinu guztiak aldatzen dira: $9-(2-7)=9-2+7=14$.', 'Con − delante cambian todos los signos: $9-(2-7)=9-2+7=14$.', 'إذا سبقت الإشارة − القوس تتغير كل الإشارات: $9-(2-7)=9-2+7=14$.', 'With − in front, every sign changes: $9-(2-7)=9-2+7=14$.')
        },
        check: {
            prompt: say('Zenbat da $5-(8-3)$?', '¿Cuánto es $5-(8-3)$?', 'كم يساوي $5-(8-3)$؟', 'What is $5-(8-3)$?'),
            options: [same('$0$'), same('$10$'), same('$-6$')],
            correctIndex: 0,
            explanation: say('Zeinuak aldatuta: $5-8+3=0$.', 'Cambiando los signos: $5-8+3=0$.', 'بتغيير الإشارات: $5-8+3=0$.', 'Changing the signs: $5-8+3=0$.')
        }
    },

    /* ---------- 5. Multiplying and dividing ---------- */
    multiply: {
        mistake: {
            wrong: say('$(-3)\\cdot(-4)=-12$, biak negatiboak direlako.', '$(-3)\\cdot(-4)=-12$, porque los dos son negativos.', '$(-3)\\cdot(-4)=-12$ لأن العددين سالبان.', '$(-3)\\cdot(-4)=-12$, because both are negative.'),
            right: say('Zeinu berak + ematen du: $(-3)\\cdot(-4)=+12$.', 'Mismo signo da +: $(-3)\\cdot(-4)=+12$.', 'الإشارة نفسها تعطي +: $(-3)\\cdot(-4)=+12$.', 'The same sign gives +: $(-3)\\cdot(-4)=+12$.')
        },
        check: {
            prompt: say('Zenbat da $(-5)\\cdot(+8)$?', '¿Cuánto es $(-5)\\cdot(+8)$?', 'كم يساوي $(-5)\\cdot(+8)$؟', 'What is $(-5)\\cdot(+8)$?'),
            options: [same('$+40$'), same('$-40$'), same('$+3$')],
            correctIndex: 1,
            explanation: say('$5\\cdot 8=40$, eta zeinu desberdinak: −.', '$5\\cdot 8=40$, y signos distintos: −.', '$5\\cdot 8=40$، والإشارتان مختلفتان: −.', '$5\\cdot 8=40$, and different signs: −.')
        }
    },
    divide: {
        mistake: {
            wrong: say('$(-24)\\mathbin{:}(-6)=-4$', '$(-24)\\mathbin{:}(-6)=-4$', '$(-24)\\mathbin{:}(-6)=-4$', '$(-24)\\mathbin{:}(-6)=-4$'),
            right: say('Zeinu berak + ematen du zatitzean ere: $(-24)\\mathbin{:}(-6)=+4$.', 'Mismo signo da +, también al dividir: $(-24)\\mathbin{:}(-6)=+4$.', 'الإشارة نفسها تعطي + في القسمة أيضًا: $(-24)\\mathbin{:}(-6)=+4$.', 'The same sign gives +, when dividing too: $(-24)\\mathbin{:}(-6)=+4$.')
        },
        check: {
            prompt: say('Zenbat da $(+56)\\mathbin{:}(-8)$?', '¿Cuánto es $(+56)\\mathbin{:}(-8)$?', 'كم يساوي $(+56)\\mathbin{:}(-8)$؟', 'What is $(+56)\\mathbin{:}(-8)$?'),
            options: [same('$-7$'), same('$+7$'), same('$-48$')],
            correctIndex: 0,
            explanation: say('$56\\mathbin{:}8=7$, eta zeinu desberdinak: $-7$.', '$56\\mathbin{:}8=7$, y signos distintos: $-7$.', '$56\\mathbin{:}8=7$، والإشارتان مختلفتان: $-7$.', '$56\\mathbin{:}8=7$, and different signs: $-7$.')
        }
    }
}

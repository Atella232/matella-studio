import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki osoak · 2. DBH — the typical mistake and the «Check it» question
   of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake.
   ========================================================================== */

export type IntegerTopicId = 'negatives' | 'integer-set' | 'absolute' | 'opposite' | 'compare' | 'order' | 'add' | 'subtract' | 'shorthand' | 'brackets' | 'multiply-divide' | 'combined'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value })

export const integerLessonChecks: Record<IntegerTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    negatives: {
        mistake: {
            wrong: say('25 euroko zorra $+25$ idazten da.', 'Una deuda de 25 € se escribe $+25$.', 'الدَّين بقيمة 25 يورو يُكتب $+25$.', 'A debt of €25 is written $+25$.'),
            right: say('Zor izatea zerotik behera egotea da: zorra $-25$ euro da.', 'Deber es estar por debajo de cero: la deuda es $-25$ €.', 'أن تكون مدينًا يعني أن تكون تحت الصفر: الدَّين هو $-25$ يورو.', 'Owing is being below zero: the debt is $-25$.')
        },
        check: {
            prompt: say('Egoera hauetatik, zein idazten da zenbaki negatibo batekin?', '¿Cuál de estas situaciones se escribe con un número negativo?', 'أيّ هذه المواقف يُكتب بعدد سالب؟', 'Which of these situations is written with a negative number?'),
            options: [
                say('15 euro irabaztea', 'Ganar 15 €', 'ربح 15 يورو', 'Winning €15'),
                say('4 solairu igotzea', 'Subir 4 plantas', 'الصعود 4 طوابق', 'Going up 4 floors'),
                say('20 metroko sakonerara jaistea', 'Bajar a 20 m de profundidad', 'النزول إلى عمق 20 مترًا', 'Diving down to a depth of 20 m')
            ],
            correctIndex: 2,
            explanation: say('Sakonera batera jaistea itsas mailaren azpira joatea da: $-20$ m.', 'Bajar a una profundidad es ir por debajo del nivel del mar: $-20$ m.', 'النزول إلى عمق يعني النزول تحت مستوى سطح البحر: $-20$ م.', 'Going down to a depth is going below sea level: $-20$ m.')
        }
    },
    'integer-set': {
        mistake: {
            wrong: say('0 zenbaki positiboa da.', 'El 0 es un número positivo.', 'الصفر عدد موجب.', '0 is a positive number.'),
            right: say('0 ez da ez positiboa ez negatiboa: zuzenaren erdigunea da.', 'El 0 no es ni positivo ni negativo: es el centro de la recta.', 'الصفر ليس موجبًا ولا سالبًا: إنه مركز خط الأعداد.', '0 is neither positive nor negative: it is the centre of the number line.')
        },
        check: {
            prompt: say('Zein zerrendak ditu zenbaki oso negatiboak bakarrik?', '¿Qué lista tiene solo enteros negativos?', 'أيّ قائمة فيها أعداد صحيحة سالبة فقط؟', 'Which list has only negative integers?'),
            options: [same('$-4,\\ -1,\\ 0$'), same('$-7,\\ -2,\\ -1$'), same('$-3,\\ +2,\\ -5$')],
            correctIndex: 1,
            explanation: say('0 ez da negatiboa, eta $+2$ positiboa da: $-7,\\ -2,\\ -1$ bakarrik geratzen da.', 'El 0 no es negativo y $+2$ es positivo: solo queda $-7,\\ -2,\\ -1$.', 'الصفر ليس سالبًا و$+2$ موجب: تبقى $-7,\\ -2,\\ -1$ فقط.', '0 is not negative and $+2$ is positive: only $-7,\\ -2,\\ -1$ is left.')
        }
    },
    absolute: {
        mistake: {
            wrong: say('$\\lvert -5\\rvert =-5$, zenbakia negatiboa delako.', '$\\lvert -5\\rvert =-5$, porque el número es negativo.', '$\\lvert -5\\rvert =-5$ لأن العدد سالب.', '$\\lvert -5\\rvert =-5$, because the number is negative.'),
            right: say('Balio absolutua distantzia bat da, eta ez da inoiz negatiboa: $\\lvert -5\\rvert =5$.', 'El valor absoluto es una distancia y nunca es negativo: $\\lvert -5\\rvert =5$.', 'القيمة المطلقة مسافة، فهي ليست سالبة أبدًا: $\\lvert -5\\rvert =5$.', 'The absolute value is a distance, so it is never negative: $\\lvert -5\\rvert =5$.')
        },
        check: {
            prompt: say('Zenbat da $\\lvert -7\\rvert +\\lvert +3\\rvert$?', '¿Cuánto vale $\\lvert -7\\rvert +\\lvert +3\\rvert$?', 'كم يساوي $\\lvert -7\\rvert +\\lvert +3\\rvert$؟', 'What is $\\lvert -7\\rvert +\\lvert +3\\rvert$?'),
            options: [same('$10$'), same('$-4$'), same('$4$')],
            correctIndex: 0,
            explanation: say('Bi distantzia dira: $7+3=10$.', 'Son dos distancias: $7+3=10$.', 'هما مسافتان: $7+3=10$.', 'They are two distances: $7+3=10$.')
        }
    },
    opposite: {
        mistake: {
            wrong: say('$-6$ zenbakiaren aurkakoa $-6$ da, balio absolutu bera duelako.', 'El opuesto de $-6$ es $-6$, porque tiene el mismo valor absoluto.', 'معاكس $-6$ هو $-6$ لأن له القيمة المطلقة نفسها.', 'The opposite of $-6$ is $-6$, because it has the same absolute value.'),
            right: say('Aurkakoek balio absolutu bera dute, baina zeinua aldatuta: $-6$ zenbakiaren aurkakoa $+6$ da.', 'Los opuestos tienen el mismo valor absoluto, pero el signo cambiado: el opuesto de $-6$ es $+6$.', 'للعددين المتعاكسين القيمة المطلقة نفسها لكن الإشارة معكوسة: معاكس $-6$ هو $+6$.', 'Opposites have the same absolute value but the sign changed: the opposite of $-6$ is $+6$.')
        },
        check: {
            prompt: say('Zein zenbaki batu behar zaio $-8$ zenbakiari 0 lortzeko?', '¿Qué número hay que sumar a $-8$ para obtener 0?', 'أيّ عدد نجمعه مع $-8$ لنحصل على 0؟', 'Which number do you add to $-8$ to get 0?'),
            options: [same('$-8$'), same('$+8$'), same('$0$')],
            correctIndex: 1,
            explanation: say('Haren aurkakoa: $(-8)+(+8)=0$.', 'Su opuesto: $(-8)+(+8)=0$.', 'معاكسه: $(-8)+(+8)=0$.', 'Its opposite: $(-8)+(+8)=0$.')
        }
    },
    compare: {
        mistake: {
            wrong: say('$-8>-3$, 8 handiagoa delako 3 baino.', '$-8>-3$, porque 8 es mayor que 3.', '$-8>-3$ لأن 8 أكبر من 3.', '$-8>-3$, because 8 is greater than 3.'),
            right: say('Negatiboetan, zerotik hurbilago dagoena da handiena: $-3>-8$.', 'Entre negativos es mayor el que está más cerca del cero: $-3>-8$.', 'بين الأعداد السالبة يكون الأقرب إلى الصفر هو الأكبر: $-3>-8$.', 'Between negatives, the one closer to zero is the greater: $-3>-8$.')
        },
        check: {
            prompt: say('Zein da zenbaki hauetatik handiena?', '¿Cuál es el mayor de estos números?', 'ما أكبر هذه الأعداد؟', 'Which of these numbers is the greatest?'),
            options: [same('$-12$'), same('$-20$'), same('$-5$')],
            correctIndex: 2,
            explanation: say('$-5$ da zerotik hurbilen dagoena: $-5>-12>-20$.', '$-5$ es el que está más cerca del cero: $-5>-12>-20$.', '$-5$ هو الأقرب إلى الصفر: $-5>-12>-20$.', '$-5$ is the closest to zero: $-5>-12>-20$.')
        }
    },
    order: {
        mistake: {
            wrong: say('Txikienetik handienera: $-2<-5<-9$.', 'De menor a mayor: $-2<-5<-9$.', 'تصاعديًا: $-2<-5<-9$.', 'From smallest to largest: $-2<-5<-9$.'),
            right: say('Negatiboetan, zerotik urrunen dagoena da txikiena: $-9<-5<-2$.', 'Entre negativos, el más lejano al cero es el menor: $-9<-5<-2$.', 'بين الأعداد السالبة يكون الأبعد عن الصفر هو الأصغر: $-9<-5<-2$.', 'Between negatives, the one furthest from zero is the smallest: $-9<-5<-2$.')
        },
        check: {
            prompt: say('Ordenatu txikienetik handienera: $+1,\\ -4,\\ 0,\\ -1$.', 'Ordena de menor a mayor: $+1,\\ -4,\\ 0,\\ -1$.', 'رتّب تصاعديًا: $+1,\\ -4,\\ 0,\\ -1$.', 'Put in order from smallest to largest: $+1,\\ -4,\\ 0,\\ -1$.'),
            options: [same('$-4<-1<0<+1$'), same('$-1<-4<0<+1$'), same('$+1<0<-1<-4$')],
            correctIndex: 0,
            explanation: say('Lehenik negatiboak, zerotik urrunenetik hurbilenera; gero zeroa eta positiboak.', 'Primero los negativos, del más lejano al cero al más cercano; luego el cero y los positivos.', 'أولًا السالبة من الأبعد عن الصفر إلى الأقرب؛ ثم الصفر والموجبة.', 'First the negatives, from the furthest from zero to the closest; then zero and the positives.')
        }
    },
    add: {
        mistake: {
            wrong: say('$(-7)+(+3)=-10$: 7 eta 3 batzen dira.', '$(-7)+(+3)=-10$: se suman 7 y 3.', '$(-7)+(+3)=-10$: نجمع 7 و3.', '$(-7)+(+3)=-10$: you add 7 and 3.'),
            right: say('Zeinu desberdinekin, balio absolutuak kendu eta handienaren zeinua jarri: $(-7)+(+3)=-4$.', 'Con signos distintos se restan los valores absolutos y se pone el signo del mayor: $(-7)+(+3)=-4$.', 'عند اختلاف الإشارتين نطرح القيمتين المطلقتين ونضع إشارة الأكبر: $(-7)+(+3)=-4$.', 'With different signs, subtract the absolute values and use the sign of the larger one: $(-7)+(+3)=-4$.')
        },
        check: {
            prompt: say('Kalkulatu $(-9)+(+4)$.', 'Calcula $(-9)+(+4)$.', 'احسب $(-9)+(+4)$.', 'Work out $(-9)+(+4)$.'),
            options: [same('$-13$'), same('$+5$'), same('$-5$')],
            correctIndex: 2,
            explanation: say('Zeinu desberdinak: $9-4=5$, eta $-9$ zenbakiaren zeinua: $-5$.', 'Signos distintos: $9-4=5$, con el signo de $-9$: $-5$.', 'إشارتان مختلفتان: $9-4=5$ مع إشارة $-9$: $-5$.', 'Different signs: $9-4=5$, with the sign of $-9$: $-5$.')
        }
    },
    subtract: {
        mistake: {
            wrong: say('$(+2)-(-6)=-4$, $2-6$ balitz bezala.', '$(+2)-(-6)=-4$, como si fuera $2-6$.', '$(+2)-(-6)=-4$ كأنها $2-6$.', '$(+2)-(-6)=-4$, as if it were $2-6$.'),
            right: say('Kentzea aurkakoa batzea da: $(+2)-(-6)=(+2)+(+6)=+8$.', 'Restar es sumar el opuesto: $(+2)-(-6)=(+2)+(+6)=+8$.', 'الطرح هو جمع المعاكس: $(+2)-(-6)=(+2)+(+6)=+8$.', 'Subtracting is adding the opposite: $(+2)-(-6)=(+2)+(+6)=+8$.')
        },
        check: {
            prompt: say('Kalkulatu $(-3)-(-8)$.', 'Calcula $(-3)-(-8)$.', 'احسب $(-3)-(-8)$.', 'Work out $(-3)-(-8)$.'),
            options: [same('$+5$'), same('$-11$'), same('$-5$')],
            correctIndex: 0,
            explanation: say('$-8$ zenbakiaren aurkakoa batzen da: $(-3)+(+8)=+5$.', 'Se suma el opuesto de $-8$: $(-3)+(+8)=+5$.', 'نجمع معاكس $-8$: $(-3)+(+8)=+5$.', 'Add the opposite of $-8$: $(-3)+(+8)=+5$.')
        }
    },
    shorthand: {
        mistake: {
            wrong: same('$(+5)-(-2)=5-2$'),
            right: say('Aurretik − duen parentesia kentzean, aurkakoaren zeinua idazten da: $(+5)-(-2)=5+2$.', 'Al quitar un paréntesis precedido de −, se escribe el signo del opuesto: $(+5)-(-2)=5+2$.', 'عند حذف قوس تسبقه − نكتب إشارة المعاكس: $(+5)-(-2)=5+2$.', 'When you remove a bracket with − in front, write the sign of the opposite: $(+5)-(-2)=5+2$.')
        },
        check: {
            prompt: say('Nola idazten da parentesirik gabe $(-4)-(+6)+(-1)$?', '¿Cómo se escribe sin paréntesis $(-4)-(+6)+(-1)$?', 'كيف تُكتب دون أقواس $(-4)-(+6)+(-1)$؟', 'How do you write $(-4)-(+6)+(-1)$ without brackets?'),
            options: [same('$-4+6-1$'), same('$-4-6+1$'), same('$-4-6-1$')],
            correctIndex: 2,
            explanation: say('Aurretik − duenez, $+6$ zenbakia $-6$ bihurtzen da; aurretik + duenez, $-1$ bere horretan geratzen da.', 'Precedido de −, $+6$ pasa a $-6$; precedido de +, $-1$ se queda igual.', 'القوس الذي تسبقه − يحوّل $+6$ إلى $-6$، والقوس الذي تسبقه + يُبقي $-1$ كما هو.', 'With − in front, $+6$ becomes $-6$; with + in front, $-1$ stays as it is.')
        }
    },
    brackets: {
        mistake: {
            wrong: same('$8-(3-5)=8-3-5=0$'),
            right: say('Parentesiaren aurrean − badago, barruko zeinu guztiak aldatzen dira: $8-(3-5)=8-3+5=10$.', 'Un − delante del paréntesis cambia todos los signos de dentro: $8-(3-5)=8-3+5=10$.', 'إذا سبقت القوسَ إشارة − تتغيّر كل الإشارات داخله: $8-(3-5)=8-3+5=10$.', 'A − in front of the bracket changes all the signs inside: $8-(3-5)=8-3+5=10$.')
        },
        check: {
            prompt: say('Kalkulatu $10-(4-7+2)$.', 'Calcula $10-(4-7+2)$.', 'احسب $10-(4-7+2)$.', 'Work out $10-(4-7+2)$.'),
            options: [same('$1$'), same('$11$'), same('$15$')],
            correctIndex: 1,
            explanation: say('Barruan $4-7+2=-1$ da, eta $10-(-1)=11$.', 'Dentro da $4-7+2=-1$, y $10-(-1)=11$.', 'في الداخل $4-7+2=-1$، و$10-(-1)=11$.', 'Inside, $4-7+2=-1$, and $10-(-1)=11$.')
        }
    },
    'multiply-divide': {
        mistake: {
            wrong: say('$(-4)\\cdot(-5)=-20$, biak negatiboak direlako.', '$(-4)\\cdot(-5)=-20$, porque los dos son negativos.', '$(-4)\\cdot(-5)=-20$ لأن العددين سالبان.', '$(-4)\\cdot(-5)=-20$, because both are negative.'),
            right: say('Zeinu bera → +: $(-4)\\cdot(-5)=+20$.', 'Mismo signo → +: $(-4)\\cdot(-5)=+20$.', 'الإشارة نفسها ← +: $(-4)\\cdot(-5)=+20$.', 'Same sign → +: $(-4)\\cdot(-5)=+20$.')
        },
        check: {
            prompt: say('Kalkulatu $(-24)\\mathbin{:}(+6)$.', 'Calcula $(-24)\\mathbin{:}(+6)$.', 'احسب $(-24)\\mathbin{:}(+6)$.', 'Work out $(-24)\\mathbin{:}(+6)$.'),
            options: [same('$+4$'), same('$-4$'), same('$-18$')],
            correctIndex: 1,
            explanation: say('$24\\mathbin{:}6=4$, eta zeinuak desberdinak dira: $-4$.', '$24\\mathbin{:}6=4$, y los signos son distintos: $-4$.', '$24\\mathbin{:}6=4$، والإشارتان مختلفتان: $-4$.', '$24\\mathbin{:}6=4$, and the signs are different: $-4$.')
        }
    },
    combined: {
        mistake: {
            wrong: same('$3+2\\cdot(-4)=5\\cdot(-4)=-20$'),
            right: say('Lehenik biderketa, gero batuketa: $3+2\\cdot(-4)=3-8=-5$.', 'Primero el producto, después la suma: $3+2\\cdot(-4)=3-8=-5$.', 'الضرب أولًا ثم الجمع: $3+2\\cdot(-4)=3-8=-5$.', 'First the product, then the addition: $3+2\\cdot(-4)=3-8=-5$.')
        },
        check: {
            prompt: say('Kalkulatu $-6+(-12)\\mathbin{:}(+3)$.', 'Calcula $-6+(-12)\\mathbin{:}(+3)$.', 'احسب $-6+(-12)\\mathbin{:}(+3)$.', 'Work out $-6+(-12)\\mathbin{:}(+3)$.'),
            options: [same('$-10$'), same('$-6$'), same('$-2$')],
            correctIndex: 0,
            explanation: say('Lehenik zatiketa: $(-12)\\mathbin{:}(+3)=-4$; gero $-6+(-4)=-10$.', 'Primero la división: $(-12)\\mathbin{:}(+3)=-4$; luego $-6+(-4)=-10$.', 'القسمة أولًا: $(-12)\\mathbin{:}(+3)=-4$؛ ثم $-6+(-4)=-10$.', 'First the division: $(-12)\\mathbin{:}(+3)=-4$; then $-6+(-4)=-10$.')
        }
    }
}

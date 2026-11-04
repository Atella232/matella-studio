import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Berreturak eta erroak · 3. DBH — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import
   it; lessons.tsx merges it into the topics. The questions use new
   numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake. Arabic writes the
   decimal point. Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type PowersTopicId = 'power-sign' | 'negative-zero' | 'power-rules' | 'sci-write' | 'sci-compare' | 'sci-ops' | 'roots' | 'extract' | 'introduce' | 'radical-ops' | 'irrational' | 'real-line' | 'intervals' | 'rounding' | 'errors'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const powersLessonChecks: Record<PowersTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'power-sign': {
        mistake: {
            wrong: same('$-5^{2}=25$'),
            right: say('Parentesirik gabe, berretzaileak 5 zenbakiari bakarrik eragiten dio: $-5^{2}=-25$. Parentesiekin, $(-5)^{2}=25$.', 'Sin paréntesis, el exponente solo afecta al 5: $-5^{2}=-25$. Con paréntesis, $(-5)^{2}=25$.', 'دون أقواس لا يؤثر الأس إلا في 5: $-5^{2}=-25$. ومع الأقواس $(-5)^{2}=25$.', 'Without brackets, the exponent only affects the 5: $-5^{2}=-25$. With brackets, $(-5)^{2}=25$.')
        },
        check: {
            prompt: say('Zenbat balio du $-2^{4}$ adierazpenak?', '¿Cuánto vale $-2^{4}$?', 'كم يساوي $-2^{4}$؟', 'What is the value of $-2^{4}$?'),
            options: [same('$16$'), same('$-16$'), same('$-8$')],
            correctIndex: 1,
            explanation: say('Berretzaileak 2 zenbakiari bakarrik eragiten dio: $2^{4}=16$, eta aurreko minus zeinua mantentzen da.', 'El exponente solo afecta al 2: $2^{4}=16$, y el signo menos de delante se queda.', 'لا يؤثر الأس إلا في 2: $2^{4}=16$، وتبقى إشارة الناقص التي أمامه.', 'The exponent only affects the 2: $2^{4}=16$, and the minus sign in front stays.')
        }
    },
    'negative-zero': {
        mistake: {
            wrong: same('$4^{-2}=-16$'),
            right: say('Berretzaile negatiboak alderantzizkoa ematen du, ez zenbaki negatibo bat: $4^{-2}=\\frac{1}{16}$.', 'Un exponente negativo da el inverso, no un número negativo: $4^{-2}=\\frac{1}{16}$.', 'الأس السالب يعطي المقلوب لا عددًا سالبًا: $4^{-2}=\\frac{1}{16}$.', 'A negative exponent gives the reciprocal, not a negative number: $4^{-2}=\\frac{1}{16}$.')
        },
        check: {
            prompt: say('Zenbat balio du $3^{-2}$ adierazpenak?', '¿Cuánto vale $3^{-2}$?', 'كم يساوي $3^{-2}$؟', 'What is the value of $3^{-2}$?'),
            options: [same('$\\frac{1}{9}$'), same('$-9$'), same('$-6$')],
            correctIndex: 0,
            explanation: same('$3^{-2}=\\frac{1}{3^{2}}=\\frac{1}{9}$')
        }
    },
    'power-rules': {
        mistake: {
            wrong: same('$2^{3}\\cdot 2^{4}=2^{12}$'),
            right: say('Oinarri bereko berreturak biderkatzean berretzaileak batu egiten dira: $2^{3}\\cdot 2^{4}=2^{7}$.', 'Al multiplicar potencias de la misma base, los exponentes se suman: $2^{3}\\cdot 2^{4}=2^{7}$.', 'عند ضرب قوى لها الأساس نفسه نجمع الأسس: $2^{3}\\cdot 2^{4}=2^{7}$.', 'When multiplying powers with the same base, add the exponents: $2^{3}\\cdot 2^{4}=2^{7}$.')
        },
        check: {
            prompt: say('Zenbat da $7^{2}\\cdot 7^{3}$?', '¿Cuánto es $7^{2}\\cdot 7^{3}$?', 'كم يساوي $7^{2}\\cdot 7^{3}$؟', 'What is $7^{2}\\cdot 7^{3}$?'),
            options: [same('$7^{6}$'), same('$49^{5}$'), same('$7^{5}$')],
            correctIndex: 2,
            explanation: say('Oinarri bera: berretzaileak batu, $2+3=5$.', 'Misma base: se suman los exponentes, $2+3=5$.', 'الأساس نفسه: نجمع الأسين، $2+3=5$.', 'Same base: add the exponents, $2+3=5$.')
        }
    },
    'sci-write': {
        mistake: {
            wrong: same('$34\\,000=34\\cdot 10^{3}$'),
            right: say('Komaren aurrean zifra bakarra egon daiteke, 1 eta 9 artekoa: $34\\,000=3{,}4\\cdot 10^{4}$.', 'Delante de la coma solo puede haber una cifra, del 1 al 9: $34\\,000=3{,}4\\cdot 10^{4}$.', 'لا يكون أمام الفاصلة إلا رقم واحد من 1 إلى 9: $34\\,000=3{,}4\\cdot 10^{4}$.', 'Only one digit, from 1 to 9, can go before the decimal point: $34\\,000=3{,}4\\cdot 10^{4}$.')
        },
        check: {
            prompt: say('Nola idazten da $0{,}0035$ idazkera zientifikoan?', '¿Cómo se escribe $0{,}0035$ en notación científica?', 'كيف يُكتب $0{,}0035$ بالترميز العلمي؟', 'How do you write $0{,}0035$ in scientific notation?'),
            options: [same('$3{,}5\\cdot 10^{-3}$'), same('$35\\cdot 10^{-4}$'), same('$3{,}5\\cdot 10^{3}$')],
            correctIndex: 0,
            explanation: say('Komak 3 jauzi egiten ditu eskuinera: berretzailea $-3$ da, eta aurrean zifra bakarra dago.', 'La coma salta 3 lugares a la derecha: el exponente es $-3$, y delante queda una sola cifra.', 'تقفز الفاصلة 3 منازل إلى اليمين: الأس $-3$، ويبقى في الأمام رقم واحد.', 'The decimal point jumps 3 places to the right: the exponent is $-3$, and one digit stays in front.')
        }
    },
    'sci-compare': {
        mistake: {
            wrong: say('$9\\cdot 10^{-5}>2\\cdot 10^{-3}$, $9>2$ delako.', '$9\\cdot 10^{-5}>2\\cdot 10^{-3}$, porque $9>2$.', '$9\\cdot 10^{-5}>2\\cdot 10^{-3}$ لأن $9>2$.', '$9\\cdot 10^{-5}>2\\cdot 10^{-3}$, because $9>2$.'),
            right: say('Lehenik berretzaileak: $-3>-5$; beraz, $2\\cdot 10^{-3}$ da handiagoa.', 'Primero los exponentes: $-3>-5$, así que $2\\cdot 10^{-3}$ es mayor.', 'الأسس أولًا: $-3>-5$، إذن $2\\cdot 10^{-3}$ هو الأكبر.', 'Exponents first: $-3>-5$, so $2\\cdot 10^{-3}$ is greater.')
        },
        check: {
            prompt: say('Zein da handiena?', '¿Cuál es el mayor?', 'أيها الأكبر؟', 'Which is the greatest?'),
            options: [same('$7\\cdot 10^{-6}$'), same('$2{,}5\\cdot 10^{-4}$'), same('$9\\cdot 10^{-5}$')],
            correctIndex: 1,
            explanation: say('Berretzaile handiena $-4$ da, zerotik hurbilen dagoena.', 'El mayor exponente es $-4$, el más cercano a cero.', 'أكبر أس هو $-4$، الأقرب إلى الصفر.', 'The greatest exponent is $-4$, the closest to zero.')
        }
    },
    'sci-ops': {
        mistake: {
            wrong: same('$4\\cdot 10^{3}+5\\cdot 10^{2}=9\\cdot 10^{5}$'),
            right: say('Batzeko berretzaile bera behar da: $4\\cdot 10^{3}+0{,}5\\cdot 10^{3}=4{,}5\\cdot 10^{3}$.', 'Para sumar hace falta el mismo exponente: $4\\cdot 10^{3}+0{,}5\\cdot 10^{3}=4{,}5\\cdot 10^{3}$.', 'للجمع نحتاج إلى الأس نفسه: $4\\cdot 10^{3}+0{,}5\\cdot 10^{3}=4{,}5\\cdot 10^{3}$.', 'To add, you need the same exponent: $4\\cdot 10^{3}+0{,}5\\cdot 10^{3}=4{,}5\\cdot 10^{3}$.')
        },
        check: {
            prompt: say('Zenbat da $(4\\cdot 10^{6})\\cdot(5\\cdot 10^{-2})$?', '¿Cuánto es $(4\\cdot 10^{6})\\cdot(5\\cdot 10^{-2})$?', 'كم يساوي $(4\\cdot 10^{6})\\cdot(5\\cdot 10^{-2})$؟', 'What is $(4\\cdot 10^{6})\\cdot(5\\cdot 10^{-2})$?'),
            options: [same('$20\\cdot 10^{-12}$'), same('$2\\cdot 10^{5}$'), same('$9\\cdot 10^{4}$')],
            correctIndex: 1,
            explanation: say('$4\\cdot 5=20$ eta $6+(-2)=4$: $20\\cdot 10^{4}$, egokituta $2\\cdot 10^{5}$.', '$4\\cdot 5=20$ y $6+(-2)=4$: $20\\cdot 10^{4}$, que ajustado es $2\\cdot 10^{5}$.', '$4\\cdot 5=20$ و$6+(-2)=4$: $20\\cdot 10^{4}$، وبعد الضبط $2\\cdot 10^{5}$.', '$4\\cdot 5=20$ and $6+(-2)=4$: $20\\cdot 10^{4}$, which adjusted is $2\\cdot 10^{5}$.')
        }
    },
    roots: {
        mistake: {
            wrong: same('$\\sqrt{-9}=-3$'),
            right: say('$(-3)^{2}=9$, ez $-9$: ez dago karratuan $-9$ ematen duen zenbakirik. Erro kubikoa bai: $\\sqrt[3]{-27}=-3$.', '$(-3)^{2}=9$, no $-9$: ningún número al cuadrado da $-9$. La raíz cúbica sí: $\\sqrt[3]{-27}=-3$.', '$(-3)^{2}=9$ وليس $-9$: لا يوجد عدد مربعه $-9$. أما الجذر التكعيبي فموجود: $\\sqrt[3]{-27}=-3$.', '$(-3)^{2}=9$, not $-9$: no number squared gives $-9$. The cube root does exist: $\\sqrt[3]{-27}=-3$.')
        },
        check: {
            prompt: say('Zenbat balio du $\\sqrt{-16}$ erroak?', '¿Cuánto vale $\\sqrt{-16}$?', 'كم يساوي $\\sqrt{-16}$؟', 'What is $\\sqrt{-16}$?'),
            options: [same('$-4$'), same('$4$'), say('Ez da existitzen', 'No existe', 'غير موجود', 'It does not exist')],
            correctIndex: 2,
            explanation: say('Indize bikoitiko erroa: $4^{2}=16$ eta $(-4)^{2}=16$; ez dago karratuan $-16$ ematen duen zenbakirik.', 'Raíz de índice par: $4^{2}=16$ y $(-4)^{2}=16$; ningún número al cuadrado da $-16$.', 'جذر دليله زوجي: $4^{2}=16$ و$(-4)^{2}=16$؛ لا يوجد عدد مربعه $-16$.', 'An even-index root: $4^{2}=16$ and $(-4)^{2}=16$; no number squared gives $-16$.')
        }
    },
    extract: {
        mistake: {
            wrong: same('$\\sqrt{3^{4}\\cdot 2}=3^{4}\\sqrt{2}$'),
            right: say('Berretzailearen erdia ateratzen da: $\\sqrt{3^{4}\\cdot 2}=3^{2}\\sqrt{2}=9\\sqrt{2}$.', 'Sale la mitad del exponente: $\\sqrt{3^{4}\\cdot 2}=3^{2}\\sqrt{2}=9\\sqrt{2}$.', 'يخرج نصف الأس: $\\sqrt{3^{4}\\cdot 2}=3^{2}\\sqrt{2}=9\\sqrt{2}$.', 'Half the exponent comes out: $\\sqrt{3^{4}\\cdot 2}=3^{2}\\sqrt{2}=9\\sqrt{2}$.')
        },
        check: {
            prompt: say('Nola geratzen da $\\sqrt{75}$ sinplifikatuta?', '¿Cómo queda $\\sqrt{75}$ simplificada?', 'كيف يصبح $\\sqrt{75}$ بعد التبسيط؟', 'What is $\\sqrt{75}$ simplified?'),
            options: [same('$25\\sqrt{3}$'), same('$5\\sqrt{3}$'), same('$3\\sqrt{5}$')],
            correctIndex: 1,
            explanation: say('$75=3\\cdot 5^{2}$: 5 ateratzen da, eta 3 barruan geratzen da.', '$75=3\\cdot 5^{2}$: sale el 5, y el 3 se queda dentro.', '$75=3\\cdot 5^{2}$: يخرج 5 ويبقى 3 في الداخل.', '$75=3\\cdot 5^{2}$: the 5 comes out and the 3 stays inside.')
        }
    },
    introduce: {
        mistake: {
            wrong: same('$3\\sqrt{2}=\\sqrt{6}$'),
            right: say('Faktorea karratuan sartzen da: $3\\sqrt{2}=\\sqrt{3^{2}\\cdot 2}=\\sqrt{18}$.', 'El factor entra al cuadrado: $3\\sqrt{2}=\\sqrt{3^{2}\\cdot 2}=\\sqrt{18}$.', 'يدخل العامل مربعًا: $3\\sqrt{2}=\\sqrt{3^{2}\\cdot 2}=\\sqrt{18}$.', 'The factor goes in squared: $3\\sqrt{2}=\\sqrt{3^{2}\\cdot 2}=\\sqrt{18}$.')
        },
        check: {
            prompt: say('Zein erro da $2\\sqrt{5}$ adierazpenaren berdina?', '¿Qué raíz es igual a $2\\sqrt{5}$?', 'أي جذر يساوي $2\\sqrt{5}$؟', 'Which root is equal to $2\\sqrt{5}$?'),
            options: [same('$\\sqrt{20}$'), same('$\\sqrt{10}$'), same('$\\sqrt{25}$')],
            correctIndex: 0,
            explanation: same('$2\\sqrt{5}=\\sqrt{2^{2}\\cdot 5}=\\sqrt{20}$')
        }
    },
    'radical-ops': {
        mistake: {
            wrong: same('$\\sqrt{9}+\\sqrt{16}=\\sqrt{25}$'),
            right: say('Erroak ez dira errokizunak batuz batzen: $\\sqrt{9}+\\sqrt{16}=3+4=7$, eta $\\sqrt{25}=5$.', 'Las raíces no se suman sumando los radicandos: $\\sqrt{9}+\\sqrt{16}=3+4=7$, y $\\sqrt{25}=5$.', 'لا تُجمع الجذور بجمع ما تحتها: $\\sqrt{9}+\\sqrt{16}=3+4=7$، و$\\sqrt{25}=5$.', 'Roots are not added by adding the radicands: $\\sqrt{9}+\\sqrt{16}=3+4=7$, and $\\sqrt{25}=5$.')
        },
        check: {
            prompt: say('Zenbat da $\\sqrt{12}+\\sqrt{48}$?', '¿Cuánto es $\\sqrt{12}+\\sqrt{48}$?', 'كم يساوي $\\sqrt{12}+\\sqrt{48}$؟', 'What is $\\sqrt{12}+\\sqrt{48}$?'),
            options: [same('$\\sqrt{60}$'), same('$6\\sqrt{6}$'), same('$6\\sqrt{3}$')],
            correctIndex: 2,
            explanation: say('Atera faktoreak: $2\\sqrt{3}+4\\sqrt{3}=6\\sqrt{3}$.', 'Saca factores: $2\\sqrt{3}+4\\sqrt{3}=6\\sqrt{3}$.', 'أخرج العوامل: $2\\sqrt{3}+4\\sqrt{3}=6\\sqrt{3}$.', 'Take factors out: $2\\sqrt{3}+4\\sqrt{3}=6\\sqrt{3}$.')
        }
    },
    irrational: {
        mistake: {
            wrong: say('$3{,}14$ irrazionala da, $\\pi$ delako.', '$3{,}14$ es irracional, porque es $\\pi$.', '$3{,}14$ غير نسبي لأنه $\\pi$.', '$3{,}14$ is irrational, because it is $\\pi$.'),
            right: say('$3{,}14=\\frac{314}{100}$ arrazionala da: $\\pi$ zenbakiaren hurbilketa bat baino ez da, eta zenbaki hori bai dela irrazionala.', '$3{,}14=\\frac{314}{100}$ es racional: solo es una aproximación de $\\pi$, que sí es irracional.', '$3{,}14=\\frac{314}{100}$ نسبي: إنه مجرد تقريب للعدد $\\pi$ الذي هو غير نسبي.', '$3{,}14=\\frac{314}{100}$ is rational: it is only an approximation of $\\pi$, which is irrational.')
        },
        check: {
            prompt: say('Zenbaki hauetatik zein da irrazionala?', '¿Cuál de estos números es irracional?', 'أي هذه الأعداد غير نسبي؟', 'Which of these numbers is irrational?'),
            options: [same('$\\sqrt{36}$'), same('$0{,}\\overline{12}$'), same('$\\sqrt{12}$')],
            correctIndex: 2,
            explanation: say('12 ez da karratu perfektua; $\\sqrt{36}=6$ eta $0{,}\\overline{12}$ periodikoa arrazionalak dira.', '12 no es un cuadrado perfecto; $\\sqrt{36}=6$ y el periódico $0{,}\\overline{12}$ son racionales.', '12 ليس مربعًا كاملًا؛ أما $\\sqrt{36}=6$ والدوري $0{,}\\overline{12}$ فنسبيان.', '12 is not a perfect square; $\\sqrt{36}=6$ and the recurring $0{,}\\overline{12}$ are rational.')
        }
    },
    'real-line': {
        mistake: {
            wrong: say('$\\sqrt{2}$ ezin da zehatz kokatu zuzenean, infinitu hamartar dituelako.', '$\\sqrt{2}$ no se puede situar con exactitud en la recta, porque tiene infinitos decimales.', 'لا يمكن وضع $\\sqrt{2}$ بدقة على المستقيم لأن له منازل عشرية لا نهائية.', '$\\sqrt{2}$ cannot be placed exactly on the line, because it has infinitely many decimals.'),
            right: say('Pitagorasekin bai: 1 aldeko karratu baten diagonala da, eta konpasak zuzenera eramaten du.', 'Con Pitágoras sí: es la diagonal de un cuadrado de lado 1, y el compás la lleva a la recta.', 'بنظرية فيثاغورس يمكن ذلك: إنه قطر مربع طول ضلعه 1، وينقله الفرجار إلى المستقيم.', 'With Pythagoras it can: it is the diagonal of a square with side 1, and the compasses carry it to the line.')
        },
        check: {
            prompt: say('Zein triangelu zuzenek du $\\sqrt{13}$ hipotenusa?', '¿Qué triángulo rectángulo tiene por hipotenusa $\\sqrt{13}$?', 'أي مثلث قائم وتره $\\sqrt{13}$؟', 'Which right triangle has hypotenuse $\\sqrt{13}$?'),
            options: [say('$3$ eta $4$ katetoak dituena', 'El de catetos $3$ y $4$', 'الذي ضلعاه القائمان $3$ و$4$', 'The one with legs $3$ and $4$'), say('$2$ eta $3$ katetoak dituena', 'El de catetos $2$ y $3$', 'الذي ضلعاه القائمان $2$ و$3$', 'The one with legs $2$ and $3$'), say('Bat ere ez: ezin da zehatz kokatu', 'Ninguno: no se puede situar con exactitud', 'لا يوجد: لا يمكن وضعه بدقة', 'None: it cannot be placed exactly')],
            correctIndex: 1,
            explanation: say('$2^{2}+3^{2}=4+9=13$; beraz, hipotenusak $\\sqrt{13}$ neurtzen du.', '$2^{2}+3^{2}=4+9=13$, así que la hipotenusa mide $\\sqrt{13}$.', '$2^{2}+3^{2}=4+9=13$، إذن طول الوتر $\\sqrt{13}$.', '$2^{2}+3^{2}=4+9=13$, so the hypotenuse measures $\\sqrt{13}$.')
        }
    },
    intervals: {
        mistake: {
            wrong: say('$[2,5)$ tartean 5 sartzen da.', 'El 5 está en $[2,5)$.', 'العدد 5 داخل $[2,5)$.', '5 is in $[2,5)$.'),
            right: say('Parentesiak muturra kanpoan uzten du: $[2,5)$ hau da: $2\\le x<5$.', 'El paréntesis deja fuera el extremo: $[2,5)$ es $2\\le x<5$.', 'القوس يُخرج الطرف: $[2,5)$ تعني $2\\le x<5$.', 'The round bracket leaves the endpoint out: $[2,5)$ means $2\\le x<5$.')
        },
        check: {
            prompt: say('Zein desberdintza da $(-5,\\,1]$?', '¿Qué desigualdad es $(-5,\\,1]$?', 'أي متباينة تمثلها $(-5,\\,1]$؟', 'Which inequality is $(-5,\\,1]$?'),
            options: [same('$-5<x\\le 1$'), same('$-5\\le x<1$'), same('$-5\\le x\\le 1$')],
            correctIndex: 0,
            explanation: say('Parentesia: $-5$ ez da sartzen. Kakoa: 1 sartzen da.', 'Paréntesis: el $-5$ no entra. Corchete: el 1 sí entra.', 'القوس: لا يدخل $-5$. والمعقوف: يدخل 1.', 'Round bracket: $-5$ is out. Square bracket: 1 is in.')
        }
    },
    rounding: {
        mistake: {
            wrong: say('$4{,}67$ hamarrenetara biribilduta $4{,}6$ da.', '$4{,}67$ redondeado a las décimas es $4{,}6$.', '$4{,}67$ مقرّبًا إلى الأجزاء من عشرة يساوي $4{,}6$.', '$4{,}67$ rounded to tenths is $4{,}6$.'),
            right: say('Kendutako lehen zifra 7 da, 5 edo handiagoa: 1 gehitzen da, $4{,}7$. $4{,}6$ trunkatzea da.', 'La primera cifra suprimida es un 7, que es 5 o más: se suma 1, $4{,}7$. $4{,}6$ es truncar.', 'أول رقم محذوف هو 7، وهو 5 أو أكثر: نضيف 1، $4{,}7$. أما $4{,}6$ فهو البتر.', 'The first digit dropped is a 7, which is 5 or more: add 1, $4{,}7$. $4{,}6$ is truncating.')
        },
        check: {
            prompt: say('Biribildu $5{,}2961$ ehunenetara.', 'Redondea $5{,}2961$ a las centésimas.', 'قرّب $5{,}2961$ إلى الأجزاء من مئة.', 'Round $5{,}2961$ to hundredths.'),
            options: [same('$5{,}29$'), same('$5{,}30$'), same('$5{,}20$')],
            correctIndex: 1,
            explanation: say('Kendutako lehen zifra 6 da: 1 gehitu 9 zifrari, eta $5{,}29$ zenbakia $5{,}30$ bihurtzen da.', 'La primera cifra suprimida es un 6: se suma 1 al 9, y $5{,}29$ pasa a $5{,}30$.', 'أول رقم محذوف هو 6: نضيف 1 إلى 9، فيصير $5{,}29$ هو $5{,}30$.', 'The first digit dropped is a 6: add 1 to the 9, and $5{,}29$ becomes $5{,}30$.')
        }
    },
    errors: {
        mistake: {
            wrong: same('$E_{a}=12-12{,}5=-0{,}5$'),
            right: say('Errore absolutua distantzia bat da, eta ez da inoiz negatiboa: $E_{a}=|12-12{,}5|=0{,}5$.', 'El error absoluto es una distancia y nunca es negativo: $E_{a}=|12-12{,}5|=0{,}5$.', 'الخطأ المطلق مسافة، فهو ليس سالبًا أبدًا: $E_{a}=|12-12{,}5|=0{,}5$.', 'The absolute error is a distance, so it is never negative: $E_{a}=|12-12{,}5|=0{,}5$.')
        },
        check: {
            prompt: say('Balio zehatza 20 da, eta 19 hartzen da. Zein da errore erlatiboa?', 'El valor exacto es 20 y se toma 19. ¿Cuál es el error relativo?', 'القيمة الدقيقة 20 ونأخذ 19. ما الخطأ النسبي؟', 'The exact value is 20 and you take 19. What is the relative error?'),
            options: [same('$1$'), same('$0{,}05$'), same('$0{,}053$')],
            correctIndex: 1,
            explanation: say('$E_{a}=1$, eta balio zehatzaz zatitzen da: $\\frac{1}{20}=0{,}05$. $0{,}053$ ateratzen da 19 zenbakiaz zatituz gero.', '$E_{a}=1$, y se divide entre el valor exacto: $\\frac{1}{20}=0{,}05$. $0{,}053$ sale al dividir entre 19.', '$E_{a}=1$، ونقسم على القيمة الدقيقة: $\\frac{1}{20}=0{,}05$. أما $0{,}053$ فينتج عن القسمة على 19.', '$E_{a}=1$, and you divide by the exact value: $\\frac{1}{20}=0{,}05$. $0{,}053$ comes from dividing by 19.')
        }
    }
}

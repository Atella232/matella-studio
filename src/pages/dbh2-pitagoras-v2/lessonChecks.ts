import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Pitagorasen teorema · 2. DBH — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. Where the explanation already
   names a mistake (root by parts, adding for a leg, the whole base), the
   box shows that one. The questions give the data in words, not the
   formula, so they do not tell how to solve them.
   ========================================================================== */

export type PythagorasTopicId = 'squares' | 'formula' | 'triples' | 'hypotenuse' | 'leg' | 'classify' | 'triangle-height' | 'diagonals' | 'trapezoid' | 'apothem' | 'chord' | 'tangent' | 'box' | 'grid' | 'problems'

/** As in lessons.tsx, the Arabic formulas get a decimal point */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const pythagorasLessonChecks: Record<PythagorasTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    squares: {
        mistake: {
            wrong: say('Hipotenusaren gaineko karratuak 50 cm² ditu, eta kateto batekoak 14 cm². Besteak: $50+14=64$ cm².', 'El cuadrado de la hipotenusa mide 50 cm² y el de un cateto, 14 cm². El otro: $50+14=64$ cm².', 'مربع الوتر 50 سم² ومربع أحد الضلعين القائمين 14 سم². الآخر: $50+14=64$ سم².', 'The square on the hypotenuse is 50 cm² and the one on a leg is 14 cm². The other: $50+14=64$ cm².'),
            right: say('Falta dena txiki bat da: kendu egiten da. $50-14=36$ cm².', 'El que falta es uno pequeño: se resta. $50-14=36$ cm².', 'المربع الناقص صغير: نطرح. $50-14=36$ سم².', 'The missing one is a small one: subtract. $50-14=36$ cm².')
        },
        check: {
            prompt: say('Katetoen gaineko karratuek 20 cm² eta 29 cm² dituzte. Zenbat cm² ditu hipotenusaren gainekoak?', 'Los cuadrados sobre los catetos miden 20 cm² y 29 cm². ¿Cuántos cm² mide el de la hipotenusa?', 'المربعان على الضلعين القائمين 20 سم² و29 سم². كم سم² مساحة المربع على الوتر؟', 'The squares on the legs measure 20 cm² and 29 cm². How many cm² is the one on the hypotenuse?'),
            options: [same('$9$'), same('$49$'), same('$7$')],
            correctIndex: 1,
            explanation: say('Hipotenusarena handia da: batu, $20+29=49$ cm². 7 cm karratu horren aldea litzateke, ez haren azalera.', 'El de la hipotenusa es el grande: suma, $20+29=49$ cm². 7 cm sería el lado de ese cuadrado, no su área.', 'مربع الوتر هو الكبير: نجمع $20+29=49$ سم². أما 7 سم فهو ضلع هذا المربع لا مساحته.', 'The one on the hypotenuse is the big one: add, $20+29=49$ cm². 7 cm would be the side of that square, not its area.')
        }
    },
    formula: {
        mistake: {
            wrong: say('$b$ eta $c$ katetoak eta $a$ hipotenusa dituen triangeluan: $b^{2}=a^{2}+c^{2}$.', 'En el triángulo de catetos $b$ y $c$ e hipotenusa $a$: $b^{2}=a^{2}+c^{2}$.', 'في المثلث الذي ضلعاه القائمان $b$ و$c$ ووتره $a$: $b^{2}=a^{2}+c^{2}$.', 'In the triangle with legs $b$ and $c$ and hypotenuse $a$: $b^{2}=a^{2}+c^{2}$.'),
            right: say('Hipotenusaren karratua bakarrik geratzen da: $a^{2}=b^{2}+c^{2}$. Katetoarentzat kendu egiten da: $b^{2}=a^{2}-c^{2}$.', 'El cuadrado de la hipotenusa queda solo: $a^{2}=b^{2}+c^{2}$. Para un cateto se resta: $b^{2}=a^{2}-c^{2}$.', 'مربع الوتر يبقى وحده: $a^{2}=b^{2}+c^{2}$. ولضلع قائم نطرح: $b^{2}=a^{2}-c^{2}$.', 'The square of the hypotenuse stays on its own: $a^{2}=b^{2}+c^{2}$. For a leg you subtract: $b^{2}=a^{2}-c^{2}$.')
        },
        check: {
            prompt: say('$MNP$ triangeluan, angelu zuzena $N$ erpinean dago. Zein berdintza dago ondo?', 'En el triángulo $MNP$ el ángulo recto está en $N$. ¿Qué igualdad es correcta?', 'في المثلث $MNP$ الزاوية القائمة عند الرأس $N$. أيّ مساواة صحيحة؟', 'In triangle $MNP$ the right angle is at $N$. Which equality is correct?'),
            options: [same('$MP^{2}=MN^{2}+NP^{2}$'), same('$MN^{2}=MP^{2}+NP^{2}$'), same('$NP^{2}=MN^{2}+MP^{2}$')],
            correctIndex: 0,
            explanation: say('Hipotenusa $N$ erpinaren aurrean dagoen aldea da, $MP$: haren karratua bakarrik geratzen da.', 'La hipotenusa es el lado opuesto a $N$, $MP$: su cuadrado queda solo.', 'الوتر هو الضلع المقابل للرأس $N$، أي $MP$: مربعه يبقى وحده.', 'The hypotenuse is the side opposite $N$, $MP$: its square stays on its own.')
        }
    },
    triples: {
        mistake: {
            wrong: say('2, 3 eta 5 hirukote pitagorikoa da, $2+3=5$ delako.', '2, 3 y 5 es una terna pitagórica, porque $2+3=5$.', '2 و3 و5 ثلاثية فيثاغورية لأن $2+3=5$.', '2, 3 and 5 is a Pythagorean triple, because $2+3=5$.'),
            right: say('Karratuak batzen dira: $2^{2}+3^{2}=13$ eta $5^{2}=25$. Ez da hirukote pitagorikoa.', 'Se suman los cuadrados: $2^{2}+3^{2}=13$ y $5^{2}=25$. No es una terna.', 'نجمع المربعات: $2^{2}+3^{2}=13$ و$5^{2}=25$. ليست ثلاثية فيثاغورية.', 'You add the squares: $2^{2}+3^{2}=13$ and $5^{2}=25$. It is not a triple.')
        },
        check: {
            prompt: say('Hauetatik, zein da hirukote pitagorikoa?', '¿Cuál de estas es una terna pitagórica?', 'أيّ هذه ثلاثية فيثاغورية؟', 'Which of these is a Pythagorean triple?'),
            options: [same('$4,\\ 5,\\ 9$'), same('$6,\\ 7,\\ 9$'), same('$9,\\ 40,\\ 41$')],
            correctIndex: 2,
            explanation: say('$9^{2}+40^{2}=81+1600=1681=41^{2}$. 4, 5, 9 hirukotean batura bakarrik betetzen da, ez karratuena.', '$9^{2}+40^{2}=81+1600=1681=41^{2}$. En 4, 5, 9 solo coincide la suma, no los cuadrados.', '$9^{2}+40^{2}=81+1600=1681=41^{2}$. في 4، 5، 9 يتطابق المجموع فقط لا المربعات.', '$9^{2}+40^{2}=81+1600=1681=41^{2}$. In 4, 5, 9 only the sum matches, not the squares.')
        }
    },
    hypotenuse: {
        mistake: {
            wrong: same('$\\sqrt{5^{2}+12^{2}}=5+12=17$'),
            right: say('Erroa amaieran, ez zatika: $\\sqrt{25+144}=\\sqrt{169}=13$.', 'La raíz al final, no por partes: $\\sqrt{25+144}=\\sqrt{169}=13$.', 'الجذر في النهاية لا لكل حد: $\\sqrt{25+144}=\\sqrt{169}=13$.', 'Take the root at the end, not part by part: $\\sqrt{25+144}=\\sqrt{169}=13$.')
        },
        check: {
            prompt: say('Triangelu angeluzuzen baten katetoak 9 cm eta 12 cm dira. Zenbat zentimetro ditu hipotenusak?', 'Los catetos de un triángulo rectángulo miden 9 cm y 12 cm. ¿Cuántos centímetros mide la hipotenusa?', 'الضلعان القائمان في مثلث قائم 9 سم و12 سم. كم سنتيمترًا طول الوتر؟', 'The legs of a right-angled triangle measure 9 cm and 12 cm. How many centimetres is the hypotenuse?'),
            options: [same('$15$'), same('$21$'), same('$\\approx 7{,}9$')],
            correctIndex: 0,
            explanation: say('$\\sqrt{9^{2}+12^{2}}=\\sqrt{81+144}=\\sqrt{225}=15$ cm. 21 erroa zatika ateratzean ateratzen da, eta hipotenusa ezin da katetoen batura bezain luzea izan.', '$\\sqrt{9^{2}+12^{2}}=\\sqrt{81+144}=\\sqrt{225}=15$ cm. El 21 sale sacando la raíz por partes, y la hipotenusa no puede ser tan larga como la suma de los catetos.', '$\\sqrt{9^{2}+12^{2}}=\\sqrt{81+144}=\\sqrt{225}=15$ سم. أما 21 فتأتي من أخذ الجذر لكل حد، ولا يمكن أن يكون الوتر بطول مجموع الضلعين.', '$\\sqrt{9^{2}+12^{2}}=\\sqrt{81+144}=\\sqrt{225}=15$ cm. 21 comes from taking the root part by part, and the hypotenuse cannot be as long as the two legs together.')
        }
    },
    leg: {
        mistake: {
            wrong: say('Hipotenusa 17 eta katetoa 8: beste katetoa $\\sqrt{17^{2}+8^{2}}\\approx 18{,}8$ da.', 'Hipotenusa 17 y cateto 8: el otro cateto es $\\sqrt{17^{2}+8^{2}}\\approx 18{,}8$.', 'الوتر 17 والضلع القائم 8: الضلع الآخر $\\sqrt{17^{2}+8^{2}}\\approx 18{,}8$.', 'Hypotenuse 17 and leg 8: the other leg is $\\sqrt{17^{2}+8^{2}}\\approx 18{,}8$.'),
            right: say('Katetoarentzat kendu egiten da: $\\sqrt{289-64}=\\sqrt{225}=15$. Katetoa ez da inoiz hipotenusa baino handiagoa.', 'Para un cateto se resta: $\\sqrt{289-64}=\\sqrt{225}=15$. Un cateto nunca es mayor que la hipotenusa.', 'للضلع القائم نطرح: $\\sqrt{289-64}=\\sqrt{225}=15$. الضلع القائم لا يكون أبدًا أطول من الوتر.', 'For a leg you subtract: $\\sqrt{289-64}=\\sqrt{225}=15$. A leg is never longer than the hypotenuse.')
        },
        check: {
            prompt: say('Hipotenusa 26 m da eta kateto bat 10 m. Zenbat metro ditu beste katetoak?', 'La hipotenusa mide 26 m y un cateto 10 m. ¿Cuántos metros mide el otro cateto?', 'الوتر 26 م وأحد الضلعين القائمين 10 م. كم مترًا طول الضلع الآخر؟', 'The hypotenuse is 26 m and one leg is 10 m. How many metres is the other leg?'),
            options: [same('$\\approx 27{,}9$'), same('$24$'), same('$16$')],
            correctIndex: 1,
            explanation: say('$\\sqrt{26^{2}-10^{2}}=\\sqrt{676-100}=\\sqrt{576}=24$ m. Batuz gero, 27,9 m aterako litzateke, hipotenusa baino gehiago.', '$\\sqrt{26^{2}-10^{2}}=\\sqrt{676-100}=\\sqrt{576}=24$ m. Sumando saldría 27,9 m, más que la hipotenusa.', '$\\sqrt{26^{2}-10^{2}}=\\sqrt{676-100}=\\sqrt{576}=24$ م. ولو جمعنا لخرج 27.9 م، أطول من الوتر.', '$\\sqrt{26^{2}-10^{2}}=\\sqrt{676-100}=\\sqrt{576}=24$ m. Adding would give 27.9 m, longer than the hypotenuse.')
        }
    },
    classify: {
        mistake: {
            wrong: say('5, 12 eta 14 aldeak: $12^{2}=144<5^{2}+14^{2}=221$; beraz, angelu-zorrotza da.', 'Lados 5, 12 y 14: $12^{2}=144<5^{2}+14^{2}=221$, así que es acutángulo.', 'الأضلاع 5 و12 و14: $12^{2}=144<5^{2}+14^{2}=221$، إذن هو حاد الزوايا.', 'Sides 5, 12 and 14: $12^{2}=144<5^{2}+14^{2}=221$, so it is acute.'),
            right: say('Alde handiena hartu behar da, 14: $14^{2}=196>5^{2}+12^{2}=169$. Angelu-kamutsa da.', 'Hay que tomar el lado mayor, 14: $14^{2}=196>5^{2}+12^{2}=169$. Es obtusángulo.', 'يجب أخذ الضلع الأكبر 14: $14^{2}=196>5^{2}+12^{2}=169$. إنه منفرج الزاوية.', 'You must take the longest side, 14: $14^{2}=196>5^{2}+12^{2}=169$. It is obtuse.')
        },
        check: {
            prompt: say('Nolakoa da 8, 10 eta 12 aldeak dituen triangelua?', '¿Cómo es el triángulo de lados 8, 10 y 12?', 'ما نوع المثلث الذي أضلاعه 8 و10 و12؟', 'What kind of triangle has sides 8, 10 and 12?'),
            options: [
                say('Angeluzuzena', 'Rectángulo', 'قائم الزاوية', 'Right-angled'),
                say('Angelu-kamutsa', 'Obtusángulo', 'منفرج الزاوية', 'Obtuse'),
                say('Angelu-zorrotza', 'Acutángulo', 'حاد الزوايا', 'Acute')
            ],
            correctIndex: 2,
            explanation: say('Alde handiena 12 da: $12^{2}=144<8^{2}+10^{2}=164$. Txikiagoa: angelu-zorrotza.', 'El lado mayor es 12: $12^{2}=144<8^{2}+10^{2}=164$. Menor: acutángulo.', 'الضلع الأكبر 12: $12^{2}=144<8^{2}+10^{2}=164$. أصغر: حاد الزوايا.', 'The longest side is 12: $12^{2}=144<8^{2}+10^{2}=164$. Smaller: acute.')
        }
    },
    'triangle-height': {
        mistake: {
            wrong: say('10, 10 eta 12 aldeko isoszelea: $h=\\sqrt{10^{2}-12^{2}}$.', 'Isósceles de lados 10, 10 y 12: $h=\\sqrt{10^{2}-12^{2}}$.', 'متساوي الساقين أضلاعه 10 و10 و12: $h=\\sqrt{10^{2}-12^{2}}$.', 'Isosceles with sides 10, 10 and 12: $h=\\sqrt{10^{2}-12^{2}}$.'),
            right: say('Altuerak oinarria erdibitzen du: katetoa oinarri-erdia da, 6. $h=\\sqrt{100-36}=8$.', 'La altura parte la base: el cateto es la media base, 6. $h=\\sqrt{100-36}=8$.', 'الارتفاع ينصّف القاعدة: الضلع القائم هو نصف القاعدة 6. $h=\\sqrt{100-36}=8$.', 'The height splits the base: the leg is half the base, 6. $h=\\sqrt{100-36}=8$.')
        },
        check: {
            prompt: say('Triangelu isoszele baten alde berdinak 17 cm dira eta oinarria 16 cm. Zenbat zentimetro ditu altuerak?', 'Un triángulo isósceles tiene los lados iguales de 17 cm y la base de 16 cm. ¿Cuántos centímetros mide la altura?', 'مثلث متساوي الساقين ضلعاه المتساويان 17 سم وقاعدته 16 سم. كم سنتيمترًا ارتفاعه؟', 'An isosceles triangle has equal sides of 17 cm and a base of 16 cm. How many centimetres is the height?'),
            options: [same('$\\approx 5{,}7$'), same('$15$'), same('$\\approx 18{,}8$')],
            correctIndex: 1,
            explanation: say('Oinarri-erdia: $16\\mathbin{:}2=8$. $h=\\sqrt{17^{2}-8^{2}}=\\sqrt{225}=15$ cm. 5,7 oinarri osoa erabiliz ateratzen da.', 'Media base: $16\\mathbin{:}2=8$. $h=\\sqrt{17^{2}-8^{2}}=\\sqrt{225}=15$ cm. El 5,7 sale usando la base entera.', 'نصف القاعدة: $16\\mathbin{:}2=8$. $h=\\sqrt{17^{2}-8^{2}}=\\sqrt{225}=15$ سم. أما 5.7 فتأتي من استعمال القاعدة كاملة.', 'Half the base: $16\\mathbin{:}2=8$. $h=\\sqrt{17^{2}-8^{2}}=\\sqrt{225}=15$ cm. 5.7 comes from using the whole base.')
        }
    },
    diagonals: {
        mistake: {
            wrong: say('16 eta 12 diagonaleko erronboa: aldea $=\\sqrt{16^{2}+12^{2}}=20$.', 'Rombo de diagonales 16 y 12: lado $=\\sqrt{16^{2}+12^{2}}=20$.', 'معيّن قطراه 16 و12: الضلع $=\\sqrt{16^{2}+12^{2}}=20$.', 'Rhombus with diagonals 16 and 12: side $=\\sqrt{16^{2}+12^{2}}=20$.'),
            right: say('Katetoak diagonal-erdiak dira, 8 eta 6: aldea $=\\sqrt{64+36}=10$.', 'Los catetos son las semidiagonales, 8 y 6: lado $=\\sqrt{64+36}=10$.', 'الضلعان القائمان هما نصفا القطرين 8 و6: الضلع $=\\sqrt{64+36}=10$.', 'The legs are the half-diagonals, 8 and 6: side $=\\sqrt{64+36}=10$.')
        },
        check: {
            prompt: say('Erronbo baten diagonalak 30 cm eta 16 cm dira. Zenbat zentimetro ditu aldeak?', 'Las diagonales de un rombo miden 30 cm y 16 cm. ¿Cuántos centímetros mide el lado?', 'قطرا معيّن 30 سم و16 سم. كم سنتيمترًا طول ضلعه؟', 'The diagonals of a rhombus measure 30 cm and 16 cm. How many centimetres is the side?'),
            options: [same('$17$'), same('$34$'), same('$23$')],
            correctIndex: 0,
            explanation: say('Diagonal-erdiak: 15 eta 8. $\\sqrt{15^{2}+8^{2}}=\\sqrt{289}=17$ cm. 34 diagonal osoekin ateratzen da.', 'Semidiagonales: 15 y 8. $\\sqrt{15^{2}+8^{2}}=\\sqrt{289}=17$ cm. El 34 sale con las diagonales enteras.', 'نصفا القطرين: 15 و8. $\\sqrt{15^{2}+8^{2}}=\\sqrt{289}=17$ سم. أما 34 فتأتي من القطرين كاملين.', 'Half-diagonals: 15 and 8. $\\sqrt{15^{2}+8^{2}}=\\sqrt{289}=17$ cm. 34 comes from the whole diagonals.')
        }
    },
    trapezoid: {
        mistake: {
            wrong: say('8 eta 20 oinarriko eta 10 aldeko trapezio isoszelea: $h=\\sqrt{10^{2}-12^{2}}$.', 'Trapecio isósceles de bases 8 y 20 y lado 10: $h=\\sqrt{10^{2}-12^{2}}$.', 'شبه منحرف متساوي الساقين قاعدتاه 8 و20 وساقه 10: $h=\\sqrt{10^{2}-12^{2}}$.', 'Isosceles trapezium with bases 8 and 20 and side 10: $h=\\sqrt{10^{2}-12^{2}}$.'),
            right: say('Isoszelean, oinarrien kendura bi aldeetara banatzen da: $(20-8)\\mathbin{:}2=6$, eta $h=\\sqrt{100-36}=8$.', 'En el isósceles la diferencia se reparte a los dos lados: $(20-8)\\mathbin{:}2=6$, y $h=\\sqrt{100-36}=8$.', 'في المتساوي الساقين يتوزّع الفرق على الجانبين: $(20-8)\\mathbin{:}2=6$، و$h=\\sqrt{100-36}=8$.', 'In the isosceles one the difference is split between both sides: $(20-8)\\mathbin{:}2=6$, and $h=\\sqrt{100-36}=8$.')
        },
        check: {
            prompt: say('Trapezio angeluzuzen baten oinarriak 9 m eta 21 m dira, eta alde zeiharra 13 m. Zenbat metro ditu altuerak?', 'Un trapecio rectángulo tiene bases de 9 m y 21 m, y el lado oblicuo mide 13 m. ¿Cuántos metros mide la altura?', 'شبه منحرف قائم قاعدتاه 9 م و21 م، وضلعه المائل 13 م. كم مترًا ارتفاعه؟', 'A right trapezium has bases of 9 m and 21 m, and its slanted side is 13 m. How many metres is the height?'),
            options: [same('$\\approx 11{,}5$'), same('$\\approx 17{,}7$'), same('$5$')],
            correctIndex: 2,
            explanation: say('Trapezio angeluzuzenean, oinarri-zatia oinarrien kendura osoa da: $21-9=12$. $h=\\sqrt{13^{2}-12^{2}}=5$ m. 11,5 kendura erdibituz ateratzen da, isoszelean bezala.', 'En el trapecio rectángulo el trozo de base es la diferencia entera: $21-9=12$. $h=\\sqrt{13^{2}-12^{2}}=5$ m. El 11,5 sale partiendo la diferencia, como en el isósceles.', 'في شبه المنحرف القائم جزء القاعدة هو الفرق كله: $21-9=12$. $h=\\sqrt{13^{2}-12^{2}}=5$ م. أما 11.5 فتأتي من قسمة الفرق كما في المتساوي الساقين.', 'In a right trapezium the piece of base is the whole difference: $21-9=12$. $h=\\sqrt{13^{2}-12^{2}}=5$ m. 11.5 comes from halving the difference, as in the isosceles one.')
        }
    },
    apothem: {
        mistake: {
            wrong: say('12 cm-ko aldeko hexagono erregularra: $ap=\\sqrt{12^{2}+6^{2}}$.', 'Hexágono regular de 12 cm de lado: $ap=\\sqrt{12^{2}+6^{2}}$.', 'سداسي منتظم ضلعه 12 سم: $ap=\\sqrt{12^{2}+6^{2}}$.', 'Regular hexagon with 12 cm sides: $ap=\\sqrt{12^{2}+6^{2}}$.'),
            right: say('Erradioa hipotenusa da: kendu egiten da. Hexagonoan erradioa 12 da; beraz, $ap=\\sqrt{144-36}\\approx 10{,}4$ cm.', 'El radio es la hipotenusa: se resta. En el hexágono el radio es 12, así que $ap=\\sqrt{144-36}\\approx 10{,}4$ cm.', 'نصف القطر هو الوتر: نطرح. في السداسي نصف القطر 12، إذن $ap=\\sqrt{144-36}\\approx 10{,}4$ سم.', 'The radius is the hypotenuse: subtract. In the hexagon the radius is 12, so $ap=\\sqrt{144-36}\\approx 10{,}4$ cm.')
        },
        check: {
            prompt: say('Hexagono erregular baten aldea 8 cm da. Zenbat zentimetro ditu apotemak?', 'Un hexágono regular tiene 8 cm de lado. ¿Cuántos centímetros mide su apotema?', 'سداسي منتظم ضلعه 8 سم. كم سنتيمترًا عامده؟', 'A regular hexagon has 8 cm sides. How many centimetres is its apothem?'),
            options: [same('$\\approx 8{,}9$'), same('$\\approx 6{,}9$'), same('$4$')],
            correctIndex: 1,
            explanation: say('Hexagonoan, erradioa = aldea = 8. Alde-erdia: 4. $ap=\\sqrt{8^{2}-4^{2}}=\\sqrt{48}\\approx 6{,}9$ cm. Apotema erradioa baino laburragoa da.', 'En el hexágono, radio = lado = 8. Medio lado: 4. $ap=\\sqrt{8^{2}-4^{2}}=\\sqrt{48}\\approx 6{,}9$ cm. La apotema es más corta que el radio.', 'في السداسي نصف القطر = الضلع = 8. نصف الضلع: 4. $ap=\\sqrt{8^{2}-4^{2}}=\\sqrt{48}\\approx 6{,}9$ سم. والعامد أقصر من نصف القطر.', 'In the hexagon, radius = side = 8. Half the side: 4. $ap=\\sqrt{8^{2}-4^{2}}=\\sqrt{48}\\approx 6{,}9$ cm. The apothem is shorter than the radius.')
        }
    },
    chord: {
        mistake: {
            wrong: say('Erradioa 13 eta distantzia 5: kordak $\\sqrt{13^{2}-5^{2}}=12$ ditu.', 'Radio 13 y distancia 5: la cuerda mide $\\sqrt{13^{2}-5^{2}}=12$.', 'نصف القطر 13 والبعد 5: طول الوتر $\\sqrt{13^{2}-5^{2}}=12$.', 'Radius 13 and distance 5: the chord is $\\sqrt{13^{2}-5^{2}}=12$.'),
            right: say('Hori korda-erdia da: korda osoak $2\\cdot 12=24$ ditu.', 'Eso es media cuerda: la cuerda entera mide $2\\cdot 12=24$.', 'هذا نصف الوتر: الوتر كله $2\\cdot 12=24$.', 'That is half the chord: the whole chord is $2\\cdot 12=24$.')
        },
        check: {
            prompt: say('25 cm-ko erradioko zirkunferentzia batean, korda bat zentrotik 7 cm-ra dago. Zenbat zentimetro ditu kordak?', 'En una circunferencia de 25 cm de radio, una cuerda está a 7 cm del centro. ¿Cuántos centímetros mide la cuerda?', 'في دائرة نصف قطرها 25 سم، يبعد وتر 7 سم عن المركز. كم سنتيمترًا طول الوتر؟', 'In a circle with a 25 cm radius, a chord is 7 cm from the centre. How many centimetres is the chord?'),
            options: [same('$48$'), same('$24$'), same('$\\approx 26$')],
            correctIndex: 0,
            explanation: say('Korda-erdia: $\\sqrt{25^{2}-7^{2}}=\\sqrt{576}=24$. Korda osoa: $2\\cdot 24=48$ cm.', 'Media cuerda: $\\sqrt{25^{2}-7^{2}}=\\sqrt{576}=24$. La cuerda entera: $2\\cdot 24=48$ cm.', 'نصف الوتر: $\\sqrt{25^{2}-7^{2}}=\\sqrt{576}=24$. والوتر كله: $2\\cdot 24=48$ سم.', 'Half the chord: $\\sqrt{25^{2}-7^{2}}=\\sqrt{576}=24$. The whole chord: $2\\cdot 24=48$ cm.')
        }
    },
    tangent: {
        mistake: {
            wrong: say('Erradioa 6 eta $OP=10$ distantzia: $PT=\\sqrt{10^{2}+6^{2}}$.', 'Radio 6 y distancia $OP=10$: $PT=\\sqrt{10^{2}+6^{2}}$.', 'نصف القطر 6 والبعد $OP=10$: $PT=\\sqrt{10^{2}+6^{2}}$.', 'Radius 6 and distance $OP=10$: $PT=\\sqrt{10^{2}+6^{2}}$.'),
            right: say('Angelu zuzena $T$ puntuan dago: hipotenusa $OP$ da. $PT=\\sqrt{100-36}=8$.', 'El ángulo recto está en $T$: la hipotenusa es $OP$. $PT=\\sqrt{100-36}=8$.', 'الزاوية القائمة عند $T$: الوتر هو $OP$. $PT=\\sqrt{100-36}=8$.', 'The right angle is at $T$: the hypotenuse is $OP$. $PT=\\sqrt{100-36}=8$.')
        },
        check: {
            prompt: say('Erradioa 9 cm da eta $PT$ zuzenki ukitzailea 12 cm. Zentrotik zenbat zentimetrora dago $P$?', 'El radio mide 9 cm y el segmento tangente $PT$, 12 cm. ¿A cuántos centímetros del centro está $P$?', 'نصف القطر 9 سم والقطعة المماسة $PT$ طولها 12 سم. على بعد كم سنتيمترًا من المركز تقع $P$؟', 'The radius is 9 cm and the tangent segment $PT$ is 12 cm. How many centimetres from the centre is $P$?'),
            options: [same('$\\approx 7{,}9$'), same('$21$'), same('$15$')],
            correctIndex: 2,
            explanation: say('Angelu zuzena $T$ puntuan dago; beraz, $OP$ hipotenusa da: $\\sqrt{9^{2}+12^{2}}=15$ cm.', 'El ángulo recto está en $T$, así que $OP$ es la hipotenusa: $\\sqrt{9^{2}+12^{2}}=15$ cm.', 'الزاوية القائمة عند $T$، إذن $OP$ هو الوتر: $\\sqrt{9^{2}+12^{2}}=15$ سم.', 'The right angle is at $T$, so $OP$ is the hypotenuse: $\\sqrt{9^{2}+12^{2}}=15$ cm.')
        }
    },
    box: {
        mistake: {
            wrong: say('2, 3 eta 6 dm-ko kutxa: diagonala $\\sqrt{2^{2}+3^{2}}\\approx 3{,}6$ dm da.', 'Caja de 2, 3 y 6 dm: la diagonal es $\\sqrt{2^{2}+3^{2}}\\approx 3{,}6$ dm.', 'صندوق أبعاده 2 و3 و6 دسم: القطر $\\sqrt{2^{2}+3^{2}}\\approx 3{,}6$ دسم.', 'A box of 2, 3 and 6 dm: the diagonal is $\\sqrt{2^{2}+3^{2}}\\approx 3{,}6$ dm.'),
            right: say('Hori oinarriaren diagonala da. Altuera falta da: $D=\\sqrt{4+9+36}=7$ dm.', 'Esa es la diagonal de la base. Falta la altura: $D=\\sqrt{4+9+36}=7$ dm.', 'هذا قطر القاعدة. ينقص الارتفاع: $D=\\sqrt{4+9+36}=7$ دسم.', 'That is the diagonal of the base. The height is missing: $D=\\sqrt{4+9+36}=7$ dm.')
        },
        check: {
            prompt: say('Ortoedro baten neurriak 2 cm, 10 cm eta 11 cm dira. Zenbat zentimetro ditu diagonalak?', 'Un ortoedro mide 2 cm, 10 cm y 11 cm. ¿Cuántos centímetros mide su diagonal?', 'متوازي مستطيلات أبعاده 2 سم و10 سم و11 سم. كم سنتيمترًا طول قطره؟', 'A cuboid measures 2 cm, 10 cm and 11 cm. How many centimetres is its diagonal?'),
            options: [same('$\\approx 10{,}2$'), same('$15$'), same('$23$')],
            correctIndex: 1,
            explanation: say('$D=\\sqrt{2^{2}+10^{2}+11^{2}}=\\sqrt{225}=15$ cm: bi aldiz Pitagoras. 10,2 oinarriko diagonala da.', '$D=\\sqrt{2^{2}+10^{2}+11^{2}}=\\sqrt{225}=15$ cm: dos veces Pitágoras. El 10,2 es la diagonal de una base.', '$D=\\sqrt{2^{2}+10^{2}+11^{2}}=\\sqrt{225}=15$ سم: فيثاغورس مرتين. أما 10.2 فهو قطر قاعدة.', '$D=\\sqrt{2^{2}+10^{2}+11^{2}}=\\sqrt{225}=15$ cm: Pythagoras twice. 10.2 is the diagonal of a base.')
        }
    },
    grid: {
        mistake: {
            wrong: say('$A(2,3)$ puntutik $B(5,7)$ puntura: $\\sqrt{5^{2}+7^{2}}$.', 'Distancia de $A(2,3)$ a $B(5,7)$: $\\sqrt{5^{2}+7^{2}}$.', 'المسافة من $A(2,3)$ إلى $B(5,7)$: $\\sqrt{5^{2}+7^{2}}$.', 'Distance from $A(2,3)$ to $B(5,7)$: $\\sqrt{5^{2}+7^{2}}$.'),
            right: say('Katetoak zenbatzen diren laukiak dira: $5-2=3$ eta $7-3=4$. Distantzia $\\sqrt{9+16}=5$ da.', 'Los catetos son los cuadros que se cuentan: $5-2=3$ y $7-3=4$. La distancia es $\\sqrt{9+16}=5$.', 'الضلعان القائمان هما المربعات التي نعدّها: $5-2=3$ و$7-3=4$. المسافة $\\sqrt{9+16}=5$.', 'The legs are the squares you count: $5-2=3$ and $7-3=4$. The distance is $\\sqrt{9+16}=5$.')
        },
        check: {
            prompt: say('Zer distantzia dago $A(1,2)$ eta $B(9,8)$ puntuen artean?', '¿Qué distancia hay entre $A(1,2)$ y $B(9,8)$?', 'ما المسافة بين $A(1,2)$ و$B(9,8)$؟', 'What is the distance between $A(1,2)$ and $B(9,8)$?'),
            options: [same('$10$'), same('$14$'), same('$\\approx 12{,}0$')],
            correctIndex: 0,
            explanation: say('8 lauki horizontalean ($9-1$) eta 6 bertikalean ($8-2$): $\\sqrt{8^{2}+6^{2}}=10$.', '8 cuadros en horizontal ($9-1$) y 6 en vertical ($8-2$): $\\sqrt{8^{2}+6^{2}}=10$.', '8 مربعات أفقيًا ($9-1$) و6 عموديًا ($8-2$): $\\sqrt{8^{2}+6^{2}}=10$.', '8 squares across ($9-1$) and 6 up ($8-2$): $\\sqrt{8^{2}+6^{2}}=10$.')
        }
    },
    problems: {
        mistake: {
            wrong: say('5 m-ko eskailera baten oina hormatik 3 m-ra dago. Altuera: $\\sqrt{5^{2}+3^{2}}\\approx 5{,}8$ m.', 'Una escalera de 5 m tiene el pie a 3 m de la pared. Altura: $\\sqrt{5^{2}+3^{2}}\\approx 5{,}8$ m.', 'سلّم طوله 5 م وقاعدته على بعد 3 م من الجدار. الارتفاع: $\\sqrt{5^{2}+3^{2}}\\approx 5{,}8$ م.', 'A 5 m ladder has its foot 3 m from the wall. Height: $\\sqrt{5^{2}+3^{2}}\\approx 5{,}8$ m.'),
            right: say('Eskailera hipotenusa da: kendu egiten da. $\\sqrt{25-9}=4$ m. Eskailera baino altuera handiagoak ez du zentzurik.', 'La escalera es la hipotenusa: se resta. $\\sqrt{25-9}=4$ m. Una altura mayor que la escalera no tiene sentido.', 'السلّم هو الوتر: نطرح. $\\sqrt{25-9}=4$ م. ولا معنى لارتفاع أطول من السلّم.', 'The ladder is the hypotenuse: subtract. $\\sqrt{25-9}=4$ m. A height longer than the ladder makes no sense.')
        },
        check: {
            prompt: say('12 m-ko masta bat kable batekin lotuta dago, mastaren oinetik 5 m-ra lurrean. Zenbat metro ditu kableak?', 'Un mástil de 12 m se sujeta con un cable atado al suelo a 5 m de su base. ¿Cuántos metros mide el cable?', 'سارية طولها 12 م مثبّتة بكابل مربوط بالأرض على بعد 5 م من قاعدتها. كم مترًا طول الكابل؟', 'A 12 m mast is held by a cable tied to the ground 5 m from its base. How many metres is the cable?'),
            options: [same('$\\approx 10{,}9$'), same('$17$'), same('$13$')],
            correctIndex: 2,
            explanation: say('Angelu zuzena mastaren eta lurraren artean dago: kablea hipotenusa da. $\\sqrt{12^{2}+5^{2}}=13$ m.', 'El ángulo recto está entre el mástil y el suelo: el cable es la hipotenusa. $\\sqrt{12^{2}+5^{2}}=13$ m.', 'الزاوية القائمة بين السارية والأرض: الكابل هو الوتر. $\\sqrt{12^{2}+5^{2}}=13$ م.', 'The right angle is between the mast and the ground: the cable is the hypotenuse. $\\sqrt{12^{2}+5^{2}}=13$ m.')
        }
    }
}

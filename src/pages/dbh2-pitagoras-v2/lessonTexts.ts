import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { PythagorasTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Pitagorasen teorema · 2. DBH — what each lesson tells: the new words
   (definitions), a short explanation, its cases as cards and the example as
   an exercise («Another example»). Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. The explanation keeps
   the numbers its drawing shows (3-4-5, 13-13-10, the 10 cm hexagon…); the
   example uses numbers of its own, never those of «Let's solve» or of the
   «Check it» question. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

/** As in lessons.tsx, the Arabic formulas get a decimal point */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const pythagorasLessonTexts: Record<PythagorasTopicId, LessonTexts> = {
    /* ---------- 1. The theorem ---------- */
    squares: {
        vocabulary: [
            say('triangelu angeluzuzena', 'triángulo rectángulo', 'المثلث القائم الزاوية', 'right-angled triangle'),
            say('karratua', 'cuadrado', 'المربع', 'square'),
            say('azalera', 'área', 'المساحة', 'area')
        ],
        definitions: [
            {
                term: say('Katetoak', 'Catetos', 'الضلعان القائمان', 'Legs'),
                meaning: say('Angelu zuzena osatzen duten bi aldeak.', 'Los dos lados que forman el ángulo recto.', 'الضلعان اللذان يكوّنان الزاوية القائمة.', 'The two sides that form the right angle.')
            },
            {
                term: say('Hipotenusa', 'Hipotenusa', 'الوتر', 'Hypotenuse'),
                meaning: say('Angelu zuzenaren aurrean dagoen aldea; alde handiena da.', 'El lado opuesto al ángulo recto; es el lado mayor.', 'الضلع المقابل للزاوية القائمة، وهو أكبر الأضلاع.', 'The side opposite the right angle; it is the longest side.')
            }
        ],
        explanation: say(
            'Eraiki karratu bat triangelu angeluzuzen baten alde bakoitzaren gainean. 3, 4 eta 5 aldeko triangeluan, karratu txikiek 9 eta 16 lauki dituzte, eta handiak 25: $9+16=25$. Beti gertatzen da: hipotenusaren karratua katetoen karratuen batura da.',
            'Construye un cuadrado sobre cada lado de un triángulo rectángulo. En el de lados 3, 4 y 5, los cuadrados pequeños tienen 9 y 16 cuadraditos, y el grande 25: $9+16=25$. Pasa siempre: el cuadrado de la hipotenusa es la suma de los cuadrados de los catetos.',
            'أنشئ مربعًا على كل ضلع من أضلاع مثلث قائم. في المثلث الذي أضلاعه 3 و4 و5، في المربعين الصغيرين 9 و16 مربعًا صغيرًا، وفي الكبير 25: $9+16=25$. ويحدث هذا دائمًا: مربع الوتر يساوي مجموع مربعي الضلعين القائمين.',
            'Build a square on each side of a right-angled triangle. In the one with sides 3, 4 and 5, the small squares have 9 and 16 unit squares, and the big one has 25: $9+16=25$. It always happens: the square on the hypotenuse is the sum of the squares on the legs.'
        ),
        examplePrompt: say(
            'Hipotenusaren karratuak 81 cm² ditu, eta kateto batenak 25 cm². Zenbat ditu beste katetoaren karratuak?',
            'El cuadrado de la hipotenusa mide 81 cm² y el de un cateto, 25 cm². ¿Cuánto mide el cuadrado del otro cateto?',
            'مساحة مربع الوتر 81 سم² ومساحة مربع أحد الضلعين القائمين 25 سم². كم مساحة مربع الضلع القائم الآخر؟',
            'The square on the hypotenuse measures 81 cm² and the one on a leg, 25 cm². What does the square on the other leg measure?'
        ),
        example: same('$81-25=56$'),
        exampleAnswer: say('Beste karratuak 56 cm² ditu: txiki bat falta zen, eta kendu egiten da.', 'El otro cuadrado mide 56 cm²: faltaba uno pequeño, así que se resta.', 'مساحة المربع الآخر 56 سم²: كان الناقص صغيرًا فنطرح.', 'The other square measures 56 cm²: a small one was missing, so you subtract.')
    },
    formula: {
        vocabulary: [
            say('katetoak', 'catetos', 'الضلعان القائمان', 'legs'),
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse')
        ],
        definitions: [
            {
                term: say('Pitagorasen teorema', 'Teorema de Pitágoras', 'نظرية فيثاغورس', 'Pythagoras\' theorem'),
                meaning: say(
                    'Triangelu angeluzuzen orotan, $a$ hipotenusa eta $b$ eta $c$ katetoak badira: $a^{2}=b^{2}+c^{2}$.',
                    'En todo triángulo rectángulo, si $a$ es la hipotenusa y $b$ y $c$ los catetos: $a^{2}=b^{2}+c^{2}$.',
                    'في كل مثلث قائم، إذا كان $a$ الوتر و$b$ و$c$ الضلعين القائمين: $a^{2}=b^{2}+c^{2}$.',
                    'In every right-angled triangle, if $a$ is the hypotenuse and $b$ and $c$ are the legs: $a^{2}=b^{2}+c^{2}$.'
                )
            }
        ],
        explanation: say(
            'Formula horretatik beste bi ateratzen dira katetoetarako: $b^{2}=a^{2}-c^{2}$ eta $c^{2}=a^{2}-b^{2}$. Letrak alda daitezke: garrantzitsua da zein den hipotenusa jakitea, haren karratua beti bakarrik geratzen baita. Eta triangelu angeluzuzenetan bakarrik balio du: 5 aldeko aldeberdin batean, $5^{2}\\neq 5^{2}+5^{2}$.',
            'De esa fórmula salen otras dos para los catetos: $b^{2}=a^{2}-c^{2}$ y $c^{2}=a^{2}-b^{2}$. Las letras pueden cambiar: lo importante es saber cuál es la hipotenusa, porque su cuadrado queda siempre solo. Y solo vale en triángulos rectángulos: en un equilátero de lado 5, $5^{2}\\neq 5^{2}+5^{2}$.',
            'ومن هذه الصيغة تُستخرج صيغتان للضلعين القائمين: $b^{2}=a^{2}-c^{2}$ و$c^{2}=a^{2}-b^{2}$. قد تتغير الحروف، والمهم معرفة الوتر، لأن مربعه يبقى وحده دائمًا. ولا تصح النظرية إلا في المثلثات القائمة: ففي مثلث متساوي الأضلاع طول ضلعه 5، $5^{2}\\neq 5^{2}+5^{2}$.',
            'Two more formulas for the legs come from it: $b^{2}=a^{2}-c^{2}$ and $c^{2}=a^{2}-b^{2}$. The letters can change: what matters is knowing which side is the hypotenuse, because its square always stays alone. And it only works in right-angled triangles: in an equilateral triangle with side 5, $5^{2}\\neq 5^{2}+5^{2}$.'
        ),
        examplePrompt: say(
            '$DEF$ triangeluan angelu zuzena $F$ erpinean dago. Idatzi teorema eta $DF$ katetoaren formula.',
            'En el triángulo $DEF$ el ángulo recto está en $F$. Escribe el teorema y la fórmula del cateto $DF$.',
            'في المثلث $DEF$ الزاوية القائمة عند $F$. اكتب النظرية وصيغة الضلع القائم $DF$.',
            'In triangle $DEF$ the right angle is at $F$. Write the theorem and the formula for the leg $DF$.'
        ),
        example: same('$\\begin{gathered}DE^{2}=DF^{2}+EF^{2}\\\\DF^{2}=DE^{2}-EF^{2}\\end{gathered}$'),
        exampleAnswer: say('Hipotenusa $DE$ da, $F$ erpinaren aurrean dagoen aldea.', 'La hipotenusa es $DE$, el lado opuesto a $F$.', 'الوتر هو $DE$، الضلع المقابل لـ$F$.', 'The hypotenuse is $DE$, the side opposite $F$.')
    },
    triples: {
        vocabulary: [
            say('biderkatu', 'multiplicar', 'الضرب', 'multiply'),
            say('handiena', 'mayor', 'الأكبر', 'largest')
        ],
        definitions: [
            {
                term: say('Hirukote pitagorikoa', 'Terna pitagórica', 'الثلاثية الفيثاغورية', 'Pythagorean triple'),
                meaning: say(
                    '$a^{2}=b^{2}+c^{2}$ betetzen duten hiru zenbaki oso: haiekin triangelu angeluzuzen bat eraikitzen da, kalkulu zehatzekin.',
                    'Tres números enteros que cumplen $a^{2}=b^{2}+c^{2}$: con ellos se construye un triángulo rectángulo de cuentas exactas.',
                    'ثلاثة أعداد صحيحة تحقق $a^{2}=b^{2}+c^{2}$: بها يُنشأ مثلث قائم حساباته دقيقة.',
                    'Three whole numbers that satisfy $a^{2}=b^{2}+c^{2}$: with them you build a right-angled triangle whose calculations come out exact.'
                )
            }
        ],
        why: {
            text: say(
                '3, 4 eta 5 zenbakiek $3^{2}+4^{2}=5^{2}$ betetzen badute, hiru aldeak 2 zenbakiaz biderkatzean karratu bakoitza 4 zenbakiaz biderkatzen da, eta berdintzak bere horretan jarraitzen du: $6^{2}+8^{2}=10^{2}$. Triangelu bera da, baina handiagoa.',
                'Si 3, 4 y 5 cumplen $3^{2}+4^{2}=5^{2}$, al multiplicar los tres lados por 2 cada cuadrado se multiplica por 4, y la igualdad sigue en pie: $6^{2}+8^{2}=10^{2}$. Es el mismo triángulo, pero más grande.',
                'إذا حققت 3 و4 و5 المساواة $3^{2}+4^{2}=5^{2}$ فإن ضرب الأضلاع الثلاثة في 2 يضرب كل مربع في 4، وتبقى المساواة صحيحة: $6^{2}+8^{2}=10^{2}$. إنه المثلث نفسه لكنه أكبر.',
                'If 3, 4 and 5 satisfy $3^{2}+4^{2}=5^{2}$, multiplying the three sides by 2 multiplies each square by 4, and the equality still holds: $6^{2}+8^{2}=10^{2}$. It is the same triangle, only bigger.'
            ),
            math: same('$6^{2}+8^{2}=36+64=100=10^{2}$')
        },
        explanation: say(
            'Hiru zenbaki hirukote bat diren jakiteko, batu bi txikienen karratuak eta konparatu handienaren karratuarekin. Ezagunenak: 3, 4, 5 eta 5, 12, 13. Hirukote bat zenbaki batez biderkatuta, beste bat ateratzen da: 3, 4, 5 bider 2, 6, 8, 10 da.',
            'Para comprobar si tres números son una terna, suma los cuadrados de los dos menores y compara con el cuadrado del mayor. Las más conocidas: 3, 4, 5 y 5, 12, 13. Multiplicando una terna por un número sale otra: 3, 4, 5 por 2 es 6, 8, 10.',
            'لتعرف هل ثلاثة أعداد ثلاثية فيثاغورية، اجمع مربعي العددين الأصغرين وقارن بمربع الأكبر. أشهرها: 3، 4، 5 و5، 12، 13. وإذا ضربت ثلاثية في عدد نتجت أخرى: 3، 4، 5 في 2 تعطي 6، 8، 10.',
            'To check whether three numbers are a triple, add the squares of the two smaller ones and compare with the square of the largest. The best-known ones: 3, 4, 5 and 5, 12, 13. Multiplying a triple by a number gives another: 3, 4, 5 times 2 gives 6, 8, 10.'
        ),
        examplePrompt: say('20, 21 eta 29 hirukote pitagorikoa da?', '¿Es 20, 21 y 29 una terna pitagórica?', 'هل 20 و21 و29 ثلاثية فيثاغورية؟', 'Are 20, 21 and 29 a Pythagorean triple?'),
        example: same('$\\begin{aligned}20^{2}+21^{2}&=400+441\\\\&=841=29^{2}\\end{aligned}$'),
        exampleAnswer: say('Bai: bi txikienen karratuen batura handienaren karratua da.', 'Sí: la suma de los cuadrados de los menores es el cuadrado del mayor.', 'نعم: مجموع مربعي الأصغرين يساوي مربع الأكبر.', 'Yes: the sum of the squares of the smaller two is the square of the largest.')
    },

    /* ---------- 2. Finding a side ---------- */
    hypotenuse: {
        vocabulary: [
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root'),
            say('katetoak', 'catetos', 'الضلعان القائمان', 'legs')
        ],
        why: {
            text: say(
                '$a^{2}=b^{2}+c^{2}$ denez, hipotenusaren karratua kateto bakoitzarena baino handiagoa da, eta, beraz, hipotenusa da alderik luzeena. Eta bi katetoen batura baino txikiagoa da, bi punturen arteko bide zuzena laburrena delako.',
                'Como $a^{2}=b^{2}+c^{2}$, el cuadrado de la hipotenusa es mayor que el de cada cateto, así que la hipotenusa es el lado más largo. Y es menor que la suma de los dos catetos, porque el camino recto entre dos puntos es el más corto.',
                'بما أن $a^{2}=b^{2}+c^{2}$ فإن مربع الوتر أكبر من مربع كل ضلع قائم، لذلك الوتر هو أطول الأضلاع. وهو أصغر من مجموع الضلعين القائمين، لأن الطريق المستقيم بين نقطتين هو الأقصر.',
                'Since $a^{2}=b^{2}+c^{2}$, the square of the hypotenuse is bigger than that of each leg, so the hypotenuse is the longest side. And it is shorter than the two legs together, because the straight path between two points is the shortest.'
            ),
            math: same('$\\begin{gathered}5^{2}=3^{2}+4^{2}\\\\4<5<3+4\\end{gathered}$')
        },
        explanation: say(
            'Bi katetoekin, hipotenusa hiru urratsetan ateratzen da: jaso katetoak karratura, batu, eta atera erroa: $a=\\sqrt{b^{2}+c^{2}}$. Hipotenusak katetorik handiena baino handiagoa izan behar du, eta bien batura baino txikiagoa.',
            'Con los dos catetos, la hipotenusa sale en tres pasos: eleva los catetos al cuadrado, súmalos y saca la raíz: $a=\\sqrt{b^{2}+c^{2}}$. La hipotenusa tiene que salir mayor que el cateto mayor y menor que la suma de los dos.',
            'بمعرفة الضلعين القائمين يُحسب الوتر في ثلاث خطوات: ربّع الضلعين، واجمعهما، وخذ الجذر: $a=\\sqrt{b^{2}+c^{2}}$. ويجب أن يكون الوتر أكبر من أكبر الضلعين القائمين وأصغر من مجموعهما.',
            'With both legs, the hypotenuse takes three steps: square the legs, add them and take the root: $a=\\sqrt{b^{2}+c^{2}}$. The hypotenuse must come out longer than the longer leg and shorter than the sum of the two.'
        ),
        cases: [
            {
                title: say('Zehatza', 'Exacta', 'دقيقة', 'Exact'),
                text: say('Batura karratu perfektua bada, erroa zehatza da.', 'Si la suma es un cuadrado perfecto, la raíz es exacta.', 'إذا كان المجموع مربعًا كاملًا كان الجذر دقيقًا.', 'If the sum is a perfect square, the root is exact.'),
                math: same('$\\sqrt{6^{2}+8^{2}}=\\sqrt{100}=10$')
            },
            {
                title: say('Hurbildua', 'Aproximada', 'تقريبية', 'Approximate'),
                text: say('Ez bada, erroa kalkulagailuarekin biribiltzen da.', 'Si no lo es, se redondea con la calculadora.', 'وإلا قُرّب الجذر بالآلة الحاسبة.', 'If it is not, round the root with a calculator.'),
                math: same('$\\sqrt{3^{2}+5^{2}}=\\sqrt{34}\\approx 5{,}83$')
            }
        ],
        examplePrompt: say(
            'Triangelu angeluzuzen baten katetoak 16 cm eta 30 cm dira. Zenbat da hipotenusa?',
            'Los catetos de un triángulo rectángulo miden 16 cm y 30 cm. ¿Cuánto mide la hipotenusa?',
            'طولا الضلعين القائمين في مثلث قائم 16 سم و30 سم. كم طول الوتر؟',
            'The legs of a right-angled triangle measure 16 cm and 30 cm. How long is the hypotenuse?'
        ),
        example: same('$\\begin{aligned}\\sqrt{16^{2}+30^{2}}&=\\sqrt{256+900}\\\\&=\\sqrt{1156}=34\\end{aligned}$'),
        exampleAnswer: say('Hipotenusa 34 cm da: 30 baino handiagoa eta 46 baino txikiagoa.', 'La hipotenusa mide 34 cm: más que 30 y menos que 46.', 'طول الوتر 34 سم: أكبر من 30 وأصغر من 46.', 'The hypotenuse is 34 cm: more than 30 and less than 46.')
    },
    leg: {
        vocabulary: [
            say('kenketa', 'resta', 'الطرح', 'subtraction'),
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root')
        ],
        why: {
            text: say(
                'Teoremaren formula bera da, askatuta: $a^{2}=b^{2}+c^{2}$ bada, bi ataletan $c^{2}$ kenduta $b^{2}=a^{2}-c^{2}$ geratzen da. Horregatik, kateto baterako kendu egiten da: hipotenusaren karratuari beste katetoaren karratua kentzen zaio.',
                'Es la misma fórmula del teorema, despejada: si $a^{2}=b^{2}+c^{2}$, restando $c^{2}$ en los dos miembros queda $b^{2}=a^{2}-c^{2}$. Por eso, para un cateto se resta: al cuadrado de la hipotenusa se le quita el cuadrado del otro cateto.',
                'إنها صيغة النظرية نفسها بعد العزل: إذا كان $a^{2}=b^{2}+c^{2}$ فبطرح $c^{2}$ من الطرفين نحصل على $b^{2}=a^{2}-c^{2}$. لذلك نطرح لحساب ضلع قائم: نأخذ من مربع الوتر مربع الضلع القائم الآخر.',
                'It is the theorem\'s formula, rearranged: if $a^{2}=b^{2}+c^{2}$, subtracting $c^{2}$ on both sides leaves $b^{2}=a^{2}-c^{2}$. That is why you subtract for a leg: you take the square of the other leg away from the square of the hypotenuse.'
            ),
            math: same('$10^{2}-6^{2}=100-36=64=8^{2}$')
        },
        explanation: say(
            'Hipotenusarekin eta kateto batekin, beste katetoa kenketa batekin ateratzen da: $b=\\sqrt{a^{2}-c^{2}}$. Hipotenusaren karratuari katetoarena kentzen zaio, eta azkenik erroa ateratzen da. 13 hipotenusarekin eta 5 katetoarekin, $\\sqrt{169-25}=\\sqrt{144}=12$. Katetoa beti da hipotenusa baino txikiagoa.',
            'Con la hipotenusa y un cateto, el otro cateto sale con una resta: $b=\\sqrt{a^{2}-c^{2}}$. Al cuadrado de la hipotenusa se le resta el del cateto, y al final se saca la raíz. Con hipotenusa 13 y cateto 5, $\\sqrt{169-25}=\\sqrt{144}=12$. Un cateto siempre es menor que la hipotenusa.',
            'بمعرفة الوتر وضلع قائم يُستخرج الضلع الآخر بالطرح: $b=\\sqrt{a^{2}-c^{2}}$. يُطرح مربع الضلع القائم من مربع الوتر، ثم يؤخذ الجذر. مع الوتر 13 والضلع 5: $\\sqrt{169-25}=\\sqrt{144}=12$. والضلع القائم أصغر من الوتر دائمًا.',
            'With the hypotenuse and one leg, the other leg comes from a subtraction: $b=\\sqrt{a^{2}-c^{2}}$. Subtract the square of the leg from the square of the hypotenuse, then take the root. With hypotenuse 13 and leg 5, $\\sqrt{169-25}=\\sqrt{144}=12$. A leg is always shorter than the hypotenuse.'
        ),
        examplePrompt: say(
            'Hipotenusa 41 m da, eta kateto bat 9 m. Zenbat da beste katetoa?',
            'La hipotenusa mide 41 m y un cateto, 9 m. ¿Cuánto mide el otro cateto?',
            'طول الوتر 41 م وطول أحد الضلعين القائمين 9 م. كم طول الضلع الآخر؟',
            'The hypotenuse measures 41 m and one leg 9 m. How long is the other leg?'
        ),
        example: same('$\\begin{aligned}\\sqrt{41^{2}-9^{2}}&=\\sqrt{1681-81}\\\\&=\\sqrt{1600}=40\\end{aligned}$'),
        exampleAnswer: say('Beste katetoa 40 m da, hipotenusa baino txikiagoa.', 'El otro cateto mide 40 m, menos que la hipotenusa.', 'طول الضلع الآخر 40 م، أصغر من الوتر.', 'The other leg is 40 m, shorter than the hypotenuse.')
    },
    classify: {
        vocabulary: [
            say('angelu zuzena', 'ángulo recto', 'الزاوية القائمة', 'right angle'),
            say('alde handiena', 'lado mayor', 'الضلع الأكبر', 'longest side'),
            say('aurkako angelua', 'ángulo opuesto', 'الزاوية المقابلة', 'opposite angle')
        ],
        explanation: say(
            'Teoremak alderantziz ere balio du. Izan bedi $a$ alde handiena: konparatu haren karratua beste bien karratuen baturarekin. Emaitzak esaten du nolakoa den alde handienaren aurreko angelua.',
            'El teorema también sirve al revés. Sea $a$ el lado mayor: compara su cuadrado con la suma de los cuadrados de los otros dos. El resultado dice cómo es el ángulo opuesto al lado mayor.',
            'تصح النظرية بالعكس أيضًا. ليكن $a$ الضلع الأكبر: قارن مربعه بمجموع مربعي الضلعين الآخرين. والنتيجة تخبرنا عن الزاوية المقابلة للضلع الأكبر.',
            'The theorem also works in reverse. Let $a$ be the longest side: compare its square with the sum of the squares of the other two. The result tells you what the angle opposite the longest side is like.'
        ),
        cases: [
            {
                title: say('Angeluzuzena', 'Rectángulo', 'قائم الزاوية', 'Right-angled'),
                text: say('Berdinak badira, angelua zuzena da.', 'Si son iguales, el ángulo es recto.', 'إذا تساويا كانت الزاوية قائمة.', 'If they are equal, the angle is a right angle.'),
                math: same('$a^{2}=b^{2}+c^{2}$')
            },
            {
                title: say('Angelu-zorrotza', 'Acutángulo', 'حاد الزوايا', 'Acute-angled'),
                text: say('Alde handiena «laburregia» bada, angelua zorrotza da.', 'Si el lado mayor es «demasiado corto», el ángulo es agudo.', 'إذا كان الضلع الأكبر «أقصر من اللازم» كانت الزاوية حادة.', 'If the longest side is “too short”, the angle is acute.'),
                math: same('$a^{2}<b^{2}+c^{2}$')
            },
            {
                title: say('Angelu-kamutsa', 'Obtusángulo', 'منفرج الزاوية', 'Obtuse-angled'),
                text: say('«Luzeegia» bada, angelua irekitzen da: kamutsa da.', 'Si es «demasiado largo», el ángulo se abre: es obtuso.', 'وإذا كان «أطول من اللازم» انفرجت الزاوية.', 'If it is “too long”, the angle opens up: it is obtuse.'),
                math: same('$a^{2}>b^{2}+c^{2}$')
            }
        ],
        examplePrompt: say(
            'Sailkatu 6 cm, 14 cm eta 17 cm-ko aldeak dituen triangelua.',
            'Clasifica el triángulo de lados 6 cm, 14 cm y 17 cm.',
            'صنّف المثلث الذي أطوال أضلاعه 6 سم و14 سم و17 سم.',
            'Classify the triangle with sides 6 cm, 14 cm and 17 cm.'
        ),
        example: same('$6^{2}+14^{2}=232<289=17^{2}$'),
        exampleAnswer: say('Alde handienaren karratua handiagoa da: angelu-kamutsa da.', 'El cuadrado del lado mayor es mayor: es obtusángulo.', 'مربع الضلع الأكبر أكبر: المثلث منفرج الزاوية.', 'The square of the longest side is bigger: it is obtuse-angled.')
    },

    /* ---------- 3. Plane figures ---------- */
    'triangle-height': {
        vocabulary: [
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('oinarria', 'base', 'القاعدة', 'base'),
            say('triangelu isoszelea', 'triángulo isósceles', 'المثلث المتساوي الساقين', 'isosceles triangle'),
            say('triangelu aldeberdina', 'triángulo equilátero', 'المثلث المتساوي الأضلاع', 'equilateral triangle')
        ],
        explanation: say(
            'Triangelu isoszele batean, alde desberdinaren gaineko altuerak oinarria erdibitzen du eta bi triangelu angeluzuzen sortzen ditu. Bakoitzean, alde berdina hipotenusa da, eta oinarri-erdia eta altuera katetoak: $h=\\sqrt{l^{2}-\\left(\\frac{b}{2}\\right)^{2}}$.',
            'En un triángulo isósceles, la altura sobre el lado desigual parte la base por la mitad y forma dos triángulos rectángulos. En cada uno, el lado igual es la hipotenusa, y la media base y la altura son los catetos: $h=\\sqrt{l^{2}-\\left(\\frac{b}{2}\\right)^{2}}$.',
            'في المثلث المتساوي الساقين ينصّف الارتفاعُ النازل على الضلع المختلف القاعدةَ، ويكوّن مثلثين قائمين. في كل منهما الضلع المساوي هو الوتر، ونصف القاعدة والارتفاع هما الضلعان القائمان: $h=\\sqrt{l^{2}-\\left(\\frac{b}{2}\\right)^{2}}$.',
            'In an isosceles triangle, the height drawn to the unequal side cuts the base in half and forms two right-angled triangles. In each one, the equal side is the hypotenuse, and half the base and the height are the legs: $h=\\sqrt{l^{2}-\\left(\\frac{b}{2}\\right)^{2}}$.'
        ),
        cases: [
            {
                title: say('Isoszelea', 'Isósceles', 'متساوي الساقين', 'Isosceles'),
                text: say('13, 13 eta 10 aldeekin, oinarri-erdia 5 da.', 'Con lados 13, 13 y 10, la media base es 5.', 'مع الأضلاع 13 و13 و10 يكون نصف القاعدة 5.', 'With sides 13, 13 and 10, half the base is 5.'),
                math: same('$h=\\sqrt{13^{2}-5^{2}}=12$')
            },
            {
                title: say('Aldeberdina', 'Equilátero', 'متساوي الأضلاع', 'Equilateral'),
                text: say('Gauza bera, aldearen erdiarekin: 40 cm-ko aldearekin, 20 cm.', 'Igual, con la mitad del lado: con lado 40 cm, 20 cm.', 'وكذلك بنصف الضلع: مع ضلع 40 سم يكون 20 سم.', 'The same, with half the side: with a 40 cm side, 20 cm.'),
                math: same('$h=\\sqrt{40^{2}-20^{2}}\\approx 34{,}64$')
            }
        ],
        examplePrompt: say(
            'Triangelu isoszele baten alde berdinak 25 cm dira, eta oinarria 14 cm. Kalkulatu altuera.',
            'Un triángulo isósceles tiene los lados iguales de 25 cm y la base de 14 cm. Calcula su altura.',
            'في مثلث متساوي الساقين طول كل من الضلعين المتساويين 25 سم وطول القاعدة 14 سم. احسب ارتفاعه.',
            'An isosceles triangle has equal sides of 25 cm and a base of 14 cm. Work out its height.'
        ),
        example: same('$\\begin{aligned}h&=\\sqrt{25^{2}-7^{2}}=\\sqrt{625-49}\\\\&=\\sqrt{576}=24\\end{aligned}$'),
        exampleAnswer: say('Altuera 24 cm da. Kontuz: oinarri-erdia, 7, ez 14.', 'La altura mide 24 cm. Ojo: la media base, 7, no 14.', 'الارتفاع 24 سم. انتبه: نصف القاعدة 7 لا 14.', 'The height is 24 cm. Careful: half the base, 7, not 14.')
    },
    diagonals: {
        vocabulary: [
            say('diagonala', 'diagonal', 'القطر', 'diagonal'),
            say('erronboa', 'rombo', 'المعيّن', 'rhombus'),
            say('laukizuzena', 'rectángulo', 'المستطيل', 'rectangle')
        ],
        definitions: [
            {
                term: say('Diagonal-erdiak', 'Semidiagonales', 'نصفا القطرين', 'Half-diagonals'),
                meaning: say(
                    'Diagonalen erdiak. Erronboan, diagonalak perpendikularrak dira eta elkar erdibitzen dute.',
                    'Las mitades de las diagonales. En el rombo, las diagonales son perpendiculares y se cortan en su punto medio.',
                    'نصفا كل من القطرين. في المعيّن يتعامد القطران وينصّف كل منهما الآخر.',
                    'The halves of the diagonals. In a rhombus, the diagonals are perpendicular and cut each other in half.'
                )
            }
        ],
        explanation: say(
            'Diagonalak laukizuzena bi triangelu angeluzuzenetan banatzen du, eta bi diagonalek erronboa lautan. Irudi bakoitzean, bilatu zein den hipotenusa.',
            'La diagonal parte un rectángulo en dos triángulos rectángulos, y las dos diagonales parten un rombo en cuatro. En cada figura, busca cuál es la hipotenusa.',
            'يقسم القطرُ المستطيلَ إلى مثلثين قائمين، ويقسم القطران المعيّنَ إلى أربعة. ابحث في كل شكل عن الوتر.',
            'The diagonal splits a rectangle into two right-angled triangles, and the two diagonals split a rhombus into four. In each shape, look for the hypotenuse.'
        ),
        cases: [
            {
                title: say('Laukizuzena', 'Rectángulo', 'المستطيل', 'Rectangle'),
                text: say('Diagonala hipotenusa da; aldeak, katetoak.', 'La diagonal es la hipotenusa; los lados, los catetos.', 'القطر هو الوتر، والضلعان هما الضلعان القائمان.', 'The diagonal is the hypotenuse; the sides are the legs.'),
                math: same('$d=\\sqrt{12^{2}+5^{2}}=13$')
            },
            {
                title: say('Erronboa', 'Rombo', 'المعيّن', 'Rhombus'),
                text: say('Aldea hipotenusa da; diagonal-erdiak, katetoak.', 'El lado es la hipotenusa; las semidiagonales, los catetos.', 'الضلع هو الوتر، ونصفا القطرين هما الضلعان القائمان.', 'The side is the hypotenuse; the half-diagonals are the legs.'),
                math: same('$l=\\sqrt{12^{2}+5^{2}}=13$')
            }
        ],
        examplePrompt: say(
            'Pantaila laukizuzen batek 48 cm ditu zabaleran eta 20 cm altueran. Zenbat da diagonala?',
            'Una pantalla rectangular mide 48 cm de ancho y 20 cm de alto. ¿Cuánto mide su diagonal?',
            'شاشة مستطيلة عرضها 48 سم وارتفاعها 20 سم. كم طول قطرها؟',
            'A rectangular screen is 48 cm wide and 20 cm high. How long is its diagonal?'
        ),
        example: same('$\\begin{aligned}d&=\\sqrt{48^{2}+20^{2}}=\\sqrt{2304+400}\\\\&=\\sqrt{2704}=52\\end{aligned}$'),
        exampleAnswer: say('Diagonala 52 cm da.', 'La diagonal mide 52 cm.', 'طول القطر 52 سم.', 'The diagonal is 52 cm.')
    },
    trapezoid: {
        vocabulary: [
            say('alde zeiharra', 'lado oblicuo', 'الضلع المائل', 'slanted side'),
            say('oinarri handia', 'base mayor', 'القاعدة الكبرى', 'longer base')
        ],
        explanation: say(
            'Oinarri txikiaren erpin batetik altuera marrazten baduzu, triangelu angeluzuzen bat ateratzen da: alde zeiharra hipotenusa da, altuera kateto bat, eta beste katetoa oinarri handiaren zati bat. Zati hori trapezio motaren araberakoa da.',
            'Si trazas la altura desde un vértice de la base menor, sale un triángulo rectángulo: el lado oblicuo es la hipotenusa, la altura es un cateto y el otro cateto es un trozo de la base mayor. Ese trozo depende del tipo de trapecio.',
            'إذا رسمت الارتفاع من رأس القاعدة الصغرى نتج مثلث قائم: الضلع المائل هو الوتر، والارتفاع ضلع قائم، والضلع القائم الآخر جزء من القاعدة الكبرى. ويتوقف هذا الجزء على نوع شبه المنحرف.',
            'If you draw the height from a vertex of the shorter base, you get a right-angled triangle: the slanted side is the hypotenuse, the height is one leg and the other leg is a piece of the longer base. That piece depends on the kind of trapezium.'
        ),
        cases: [
            {
                title: say('Trapezio angeluzuzena', 'Trapecio rectángulo', 'شبه المنحرف القائم', 'Right-angled trapezium'),
                text: say('Zatia oinarrien kendura da. 13 eta 19 oinarriekin, eta 10 alde zeiharrarekin:', 'El trozo es la diferencia de las bases. Con bases 13 y 19 y lado oblicuo 10:', 'الجزء هو فرق القاعدتين. مع القاعدتين 13 و19 والضلع المائل 10:', 'The piece is the difference between the bases. With bases 13 and 19 and a slanted side of 10:'),
                math: same('$19-13=6\\qquad h=\\sqrt{10^{2}-6^{2}}=8$')
            },
            {
                title: say('Trapezio isoszelea', 'Trapecio isósceles', 'شبه المنحرف المتساوي الساقين', 'Isosceles trapezium'),
                text: say('Kendura bi aldeetan banatzen da. 10 eta 22 oinarriekin:', 'La diferencia se reparte a los dos lados. Con bases 10 y 22:', 'يتوزع الفرق على الجانبين. مع القاعدتين 10 و22:', 'The difference is shared between the two sides. With bases 10 and 22:'),
                math: same('$(22-10)\\mathbin{:}2=6$')
            }
        ],
        examplePrompt: say(
            'Trapezio angeluzuzen baten oinarriak 4 m eta 16 m dira, eta altuera 5 m. Zenbat da alde zeiharra?',
            'Un trapecio rectángulo tiene bases de 4 m y 16 m y una altura de 5 m. ¿Cuánto mide el lado oblicuo?',
            'شبه منحرف قائم قاعدتاه 4 م و16 م وارتفاعه 5 م. كم طول ضلعه المائل؟',
            'A right-angled trapezium has bases of 4 m and 16 m and a height of 5 m. How long is the slanted side?'
        ),
        example: same('$\\begin{gathered}16-4=12\\\\\\sqrt{12^{2}+5^{2}}=\\sqrt{169}=13\\end{gathered}$'),
        exampleAnswer: say('Alde zeiharra 13 m da.', 'El lado oblicuo mide 13 m.', 'طول الضلع المائل 13 م.', 'The slanted side is 13 m.')
    },

    /* ---------- 4. The circle and regular polygons ---------- */
    apothem: {
        vocabulary: [
            say('poligono erregularra', 'polígono regular', 'المضلع المنتظم', 'regular polygon'),
            say('hexagonoa', 'hexágono', 'السداسي', 'hexagon')
        ],
        definitions: [
            {
                term: say('Apotema', 'Apotema', 'العامد', 'Apothem'),
                meaning: say(
                    'Poligono erregular baten zentrotik alde baten erdiko puntura doan zuzenkia, aldearekiko perpendikularra.',
                    'El segmento que va del centro de un polígono regular al punto medio de un lado, perpendicular a él.',
                    'القطعة الواصلة من مركز مضلع منتظم إلى منتصف أحد أضلاعه، وهي عمودية عليه.',
                    'The segment from the centre of a regular polygon to the midpoint of a side, at right angles to it.'
                )
            },
            {
                term: say('Erradioa', 'Radio', 'نصف القطر', 'Radius'),
                meaning: say('Zentrotik erpin batera doan zuzenkia.', 'El segmento que va del centro a un vértice.', 'القطعة الواصلة من المركز إلى أحد الرؤوس.', 'The segment from the centre to a vertex.')
            }
        ],
        explanation: say(
            'Erradioak, apotemak eta alde-erdiak triangelu angeluzuzen bat osatzen dute, eta erradioa hipotenusa da: $ap=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. Hexagono erregularrean erradioa eta aldea berdinak dira: 10 cm-ko aldearekin, $ap=\\sqrt{100-25}\\approx 8{,}66$ cm. Apotemarekin azalera ateratzen da: $A=\\frac{P\\cdot ap}{2}$.',
            'El radio, la apotema y medio lado forman un triángulo rectángulo, y el radio es la hipotenusa: $ap=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. En el hexágono regular el radio mide lo mismo que el lado: con lado 10 cm, $ap=\\sqrt{100-25}\\approx 8{,}66$ cm. Con la apotema sale el área: $A=\\frac{P\\cdot ap}{2}$.',
            'نصف القطر والعامد ونصف الضلع تكوّن مثلثًا قائمًا، ونصف القطر هو الوتر: $ap=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. وفي المسدس المنتظم نصف القطر يساوي الضلع: مع ضلع 10 سم، $ap=\\sqrt{100-25}\\approx 8{,}66$ سم. وبالعامد تُحسب المساحة: $A=\\frac{P\\cdot ap}{2}$.',
            'The radius, the apothem and half a side form a right-angled triangle, and the radius is the hypotenuse: $ap=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. In a regular hexagon the radius is as long as the side: with a 10 cm side, $ap=\\sqrt{100-25}\\approx 8{,}66$ cm. The apothem gives the area: $A=\\frac{P\\cdot ap}{2}$.'
        ),
        examplePrompt: say(
            'Hexagono erregular baten aldea 6 cm da. Kalkulatu apotema hamarrenetara.',
            'Un hexágono regular tiene 6 cm de lado. Calcula su apotema a las décimas.',
            'مسدس منتظم طول ضلعه 6 سم. احسب عامده مقرّبًا إلى الأعشار.',
            'A regular hexagon has 6 cm sides. Work out its apothem to one decimal place.'
        ),
        example: same('$ap=\\sqrt{6^{2}-3^{2}}=\\sqrt{27}\\approx 5{,}2$'),
        exampleAnswer: say('Apotema 5,2 cm ingurukoa da.', 'La apotema mide unos 5,2 cm.', 'طول العامد نحو 5.2 سم.', 'The apothem is about 5.2 cm.')
    },
    chord: {
        vocabulary: [
            say('zentroa', 'centro', 'المركز', 'centre'),
            say('perpendikularra', 'perpendicular', 'العمودي', 'perpendicular'),
            say('erradioa', 'radio', 'نصف القطر', 'radius')
        ],
        definitions: [
            {
                term: say('Korda', 'Cuerda', 'وتر الدائرة', 'Chord'),
                meaning: say('Zirkunferentziaren bi puntu lotzen dituen zuzenkia.', 'El segmento que une dos puntos de la circunferencia.', 'القطعة الواصلة بين نقطتين من الدائرة.', 'The segment that joins two points of a circle.')
            }
        ],
        explanation: say(
            'Zentrotik marraztutako perpendikularrak korda erdibitzen du. Erradioak, zentrorako distantziak eta korda-erdiak triangelu angeluzuzen bat osatzen dute, eta erradioa hipotenusa da: $r^{2}=d^{2}+\\left(\\frac{k}{2}\\right)^{2}$. 10 cm-ko erradioarekin eta 6 cm-ko distantziarekin, korda-erdia 8 cm da, eta korda 16 cm.',
            'La perpendicular desde el centro parte la cuerda por la mitad. El radio, la distancia al centro y media cuerda forman un triángulo rectángulo, y el radio es la hipotenusa: $r^{2}=d^{2}+\\left(\\frac{k}{2}\\right)^{2}$. Con radio 10 cm y distancia 6 cm, media cuerda mide 8 cm y la cuerda, 16 cm.',
            'العمود النازل من المركز ينصّف وتر الدائرة. ويكوّن نصف القطر والبعد عن المركز ونصف الوتر مثلثًا قائمًا، ونصف القطر هو وتر هذا المثلث: $r^{2}=d^{2}+\\left(\\frac{k}{2}\\right)^{2}$. مع نصف قطر 10 سم وبعد 6 سم، نصف الوتر 8 سم والوتر كله 16 سم.',
            'The perpendicular from the centre cuts the chord in half. The radius, the distance to the centre and half the chord form a right-angled triangle, and the radius is the hypotenuse: $r^{2}=d^{2}+\\left(\\frac{k}{2}\\right)^{2}$. With a 10 cm radius and a 6 cm distance, half the chord is 8 cm and the chord, 16 cm.'
        ),
        examplePrompt: say(
            '17 cm-ko erradioko zirkunferentzia batean, korda batek 30 cm ditu. Zer distantziara dago zentrotik?',
            'En una circunferencia de 17 cm de radio, una cuerda mide 30 cm. ¿A qué distancia está del centro?',
            'في دائرة نصف قطرها 17 سم وتر طوله 30 سم. كم يبعد عن المركز؟',
            'In a circle with a 17 cm radius, a chord measures 30 cm. How far is it from the centre?'
        ),
        example: same('$\\begin{aligned}d&=\\sqrt{17^{2}-15^{2}}=\\sqrt{289-225}\\\\&=\\sqrt{64}=8\\end{aligned}$'),
        exampleAnswer: say('Korda zentrotik 8 cm-ra dago. Kontuz: korda-erdia, 15, ez 30.', 'La cuerda está a 8 cm del centro. Ojo: media cuerda, 15, no 30.', 'يبعد الوتر 8 سم عن المركز. انتبه: نصف الوتر 15 لا 30.', 'The chord is 8 cm from the centre. Careful: half the chord, 15, not 30.')
    },
    tangent: {
        vocabulary: [
            say('ukipen-puntua', 'punto de tangencia', 'نقطة التماس', 'point of tangency'),
            say('kanpoko puntua', 'punto exterior', 'نقطة خارجية', 'outside point')
        ],
        definitions: [
            {
                term: say('Zuzen ukitzailea', 'Recta tangente', 'المماس', 'Tangent line'),
                meaning: say('Zirkunferentzia puntu bakar batean ukitzen duen zuzena: ukitze-puntuan.', 'La recta que toca la circunferencia en un solo punto, el punto de tangencia.', 'المستقيم الذي يمس الدائرة في نقطة واحدة هي نقطة التماس.', 'The line that touches the circle at a single point, the point of tangency.')
            }
        ],
        explanation: say(
            'Ukitzailea erradioarekiko perpendikularra da $T$ ukitze-puntuan. Horregatik, kanpoko $P$ puntu batetik, $OTP$ triangeluak angelu zuzena du $T$ erpinean, eta haren hipotenusa $OP$ da, zentrotik puntura dagoen distantzia: $OP^{2}=r^{2}+PT^{2}$.',
            'La tangente es perpendicular al radio en el punto de tangencia $T$. Por eso, desde un punto exterior $P$, el triángulo $OTP$ es rectángulo en $T$, y su hipotenusa es $OP$, la distancia del centro al punto: $OP^{2}=r^{2}+PT^{2}$.',
            'المماس عمودي على نصف القطر عند نقطة التماس $T$. لذلك إذا انطلقنا من نقطة خارجية $P$ كان المثلث $OTP$ قائمًا عند $T$، ووتره $OP$، أي بعد المركز عن النقطة: $OP^{2}=r^{2}+PT^{2}$.',
            'The tangent is perpendicular to the radius at the point of tangency $T$. So, from an external point $P$, triangle $OTP$ has a right angle at $T$, and its hypotenuse is $OP$, the distance from the centre to the point: $OP^{2}=r^{2}+PT^{2}$.'
        ),
        examplePrompt: say(
            '$P$ puntua 17 cm-ra dago 8 cm-ko erradioko zirkunferentzia baten zentrotik. Zenbat da $PT$ zuzenki ukitzailea?',
            'Un punto $P$ está a 17 cm del centro de una circunferencia de 8 cm de radio. ¿Cuánto mide el segmento tangente $PT$?',
            'النقطة $P$ تبعد 17 سم عن مركز دائرة نصف قطرها 8 سم. كم طول قطعة المماس $PT$؟',
            'A point $P$ is 17 cm from the centre of a circle with an 8 cm radius. How long is the tangent segment $PT$?'
        ),
        example: same('$\\begin{aligned}PT&=\\sqrt{17^{2}-8^{2}}=\\sqrt{289-64}\\\\&=\\sqrt{225}=15\\end{aligned}$'),
        exampleAnswer: say('$PT$ zuzenkia 15 cm da: $OP$ hipotenusa denez, kendu egiten da.', 'El segmento $PT$ mide 15 cm: como $OP$ es la hipotenusa, se resta.', 'طول القطعة $PT$ هو 15 سم: وبما أن $OP$ هو الوتر فإننا نطرح.', 'The segment $PT$ is 15 cm: since $OP$ is the hypotenuse, you subtract.')
    },

    /* ---------- 5. In space and in real life ---------- */
    box: {
        vocabulary: [
            say('ortoedroa', 'ortoedro', 'متوازي المستطيلات', 'cuboid'),
            say('kuboa', 'cubo', 'المكعب', 'cube'),
            say('oinarriaren diagonala', 'diagonal de la base', 'قطر القاعدة', 'diagonal of the base')
        ],
        definitions: [
            {
                term: say('Ortoedroaren diagonala', 'Diagonal del ortoedro', 'قطر متوازي المستطيلات', 'Space diagonal'),
                meaning: say('Erpin bat aurkako erpinarekin lotzen duen zuzenkia, gorputzaren barrutik.', 'El segmento que une un vértice con el opuesto, por dentro del cuerpo.', 'القطعة التي تصل رأسًا بالرأس المقابل له مرورًا بداخل المجسم.', 'The segment that joins a vertex to the opposite one, through the inside of the solid.')
            }
        ],
        explanation: say(
            'Pitagoras bi aldiz aplikatzen da. Lehenik, oinarriaren diagonala: $d=\\sqrt{a^{2}+b^{2}}$. Gero, $d$ eta $c$ altuera katetoak dira, eta ortoedroaren diagonala hipotenusa. Bi urratsak batera: $D=\\sqrt{a^{2}+b^{2}+c^{2}}$.',
            'Se aplica Pitágoras dos veces. Primero, la diagonal de la base: $d=\\sqrt{a^{2}+b^{2}}$. Después, $d$ y la altura $c$ son los catetos, y la diagonal del ortoedro es la hipotenusa. Los dos pasos juntos: $D=\\sqrt{a^{2}+b^{2}+c^{2}}$.',
            'تُطبّق فيثاغورس مرتين. أولًا قطر القاعدة: $d=\\sqrt{a^{2}+b^{2}}$. ثم يكون $d$ والارتفاع $c$ ضلعين قائمين، وقطر متوازي المستطيلات هو الوتر. والخطوتان معًا: $D=\\sqrt{a^{2}+b^{2}+c^{2}}$.',
            'Pythagoras is applied twice. First, the diagonal of the base: $d=\\sqrt{a^{2}+b^{2}}$. Then $d$ and the height $c$ are the legs, and the space diagonal is the hypotenuse. Both steps together: $D=\\sqrt{a^{2}+b^{2}+c^{2}}$.'
        ),
        cases: [
            {
                title: say('Ortoedroa', 'Ortoedro', 'متوازي المستطيلات', 'Cuboid'),
                text: say('3, 4 eta 12 cm-ko ertzekin, oinarriak 5 ematen du, eta diagonalak 13.', 'Con aristas de 3, 4 y 12 cm, la base da 5 y la diagonal, 13.', 'مع أحرف 3 و4 و12 سم يعطي قطر القاعدة 5 والقطر الكبير 13.', 'With edges of 3, 4 and 12 cm, the base gives 5 and the diagonal 13.'),
                math: same('$\\sqrt{3^{2}+4^{2}+12^{2}}=\\sqrt{169}=13$')
            },
            {
                title: say('Zilindroa', 'Cilindro', 'الأسطوانة', 'Cylinder'),
                text: say('Katetoak diametroa eta altuera dira: 8 cm-ko erradioarekin eta 63 cm-ko altuerarekin:', 'Los catetos son el diámetro y la altura: con radio 8 cm y altura 63 cm:', 'الضلعان القائمان هما القطر والارتفاع: مع نصف قطر 8 سم وارتفاع 63 سم:', 'The legs are the diameter and the height: with an 8 cm radius and a 63 cm height:'),
                math: same('$\\sqrt{16^{2}+63^{2}}=65$')
            }
        ],
        examplePrompt: say(
            'Kaxa batek 6 dm, 8 dm eta 24 dm ditu. 25 dm-ko barra bat sartzen da barruan?',
            'Una caja mide 6 dm, 8 dm y 24 dm. ¿Cabe dentro una barra de 25 dm?',
            'صندوق أبعاده 6 دسم و8 دسم و24 دسم. هل يدخل فيه قضيب طوله 25 دسم؟',
            'A box measures 6 dm, 8 dm and 24 dm. Does a 25 dm rod fit inside?'
        ),
        example: same('$\\begin{aligned}D&=\\sqrt{6^{2}+8^{2}+24^{2}}\\\\&=\\sqrt{676}=26\\end{aligned}$'),
        exampleAnswer: say('Diagonala 26 dm da: bai, sartzen da.', 'La diagonal mide 26 dm: sí, cabe.', 'طول القطر 26 دسم: نعم، يدخل.', 'The diagonal is 26 dm: yes, it fits.')
    },
    grid: {
        vocabulary: [
            say('sarea', 'cuadrícula', 'الشبكة', 'grid'),
            say('zuzenkia', 'segmento', 'القطعة', 'segment'),
            say('horizontala', 'horizontal', 'أفقي', 'horizontal')
        ],
        explanation: say(
            'Sare batean, bi puntu lotzen dituen zuzenkia triangelu angeluzuzen baten hipotenusa da. Katetoak horizontalean eta bertikalean zenbatzen diren laukiak dira: $\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. $A(1,1)$ puntutik $B(7,9)$ puntura 6 lauki daude horizontalean eta 8 bertikalean: $\\sqrt{36+64}=10$.',
            'En una cuadrícula, el segmento que une dos puntos es la hipotenusa de un triángulo rectángulo. Los catetos son los cuadros que se cuentan en horizontal y en vertical: $\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. De $A(1,1)$ a $B(7,9)$ hay 6 cuadros en horizontal y 8 en vertical: $\\sqrt{36+64}=10$.',
            'على الشبكة تكون القطعة الواصلة بين نقطتين وترَ مثلث قائم، وضلعاه القائمان هما عدد المربعات أفقيًا وعموديًا: $\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. من $A(1,1)$ إلى $B(7,9)$ هناك 6 مربعات أفقيًا و8 عموديًا: $\\sqrt{36+64}=10$.',
            'On a grid, the segment joining two points is the hypotenuse of a right-angled triangle. The legs are the squares you count across and up or down: $\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. From $A(1,1)$ to $B(7,9)$ there are 6 squares across and 8 up: $\\sqrt{36+64}=10$.'
        ),
        examplePrompt: say(
            'Mendizale bat 8 km ibiltzen da ekialdera, eta gero 15 km iparraldera. Zer distantziara dago abiapuntutik, lerro zuzenean?',
            'Una excursionista camina 8 km hacia el este y luego 15 km hacia el norte. ¿A qué distancia en línea recta está del punto de partida?',
            'تمشي متنزهة 8 كم شرقًا ثم 15 كم شمالًا. كم تبعد عن نقطة الانطلاق في خط مستقيم؟',
            'A hiker walks 8 km east and then 15 km north. How far is the hiker from the starting point, in a straight line?'
        ),
        example: same('$\\begin{aligned}\\sqrt{8^{2}+15^{2}}&=\\sqrt{64+225}\\\\&=\\sqrt{289}=17\\end{aligned}$'),
        exampleAnswer: say('Abiapuntutik 17 km-ra dago.', 'Está a 17 km del punto de partida.', 'تبعد 17 كم عن نقطة الانطلاق.', 'The hiker is 17 km from the starting point.')
    },
    problems: {
        vocabulary: [
            say('angelu zuzena', 'ángulo recto', 'الزاوية القائمة', 'right angle'),
            say('itzala', 'sombra', 'الظل', 'shadow')
        ],
        explanation: say(
            'Problema askotan triangelu angeluzuzen bat dago ezkutatuta: horma eta lurra, poste bat eta haren itzala, masta baten kablea. Kalkulatu aurretik, bilatu angelu zuzena eta erabaki zein den hipotenusa: angelu zuzenaren aurreko aldea, luzeena.',
            'En muchos problemas hay un triángulo rectángulo escondido: la pared y el suelo, un poste y su sombra, el cable de un mástil. Antes de calcular, busca el ángulo recto y decide cuál es la hipotenusa: el lado frente al ángulo recto, el más largo.',
            'في كثير من المسائل يختبئ مثلث قائم: الجدار والأرض، عمود وظله، كابل سارية. قبل الحساب ابحث عن الزاوية القائمة وحدّد الوتر: الضلع المقابل للزاوية القائمة، وهو الأطول.',
            'In many problems there is a hidden right-angled triangle: the wall and the ground, a pole and its shadow, the cable of a mast. Before calculating, find the right angle and decide which side is the hypotenuse: the one opposite the right angle, the longest.'
        ),
        examplePrompt: say(
            '8 m-ko poste batek 6 m-ko itzala ematen du. Zer distantzia dago postearen goialdetik itzalaren muturrera?',
            'Un poste de 8 m da una sombra de 6 m. ¿Qué distancia hay de lo alto del poste al extremo de la sombra?',
            'عمود طوله 8 م يلقي ظلًا طوله 6 م. ما المسافة من أعلى العمود إلى طرف الظل؟',
            'An 8 m pole casts a 6 m shadow. How far is it from the top of the pole to the end of the shadow?'
        ),
        example: same('$\\sqrt{8^{2}+6^{2}}=\\sqrt{100}=10$'),
        exampleAnswer: say('10 m daude: hipotenusa da, postea eta itzala baino luzeagoa.', 'Hay 10 m: es la hipotenusa, más larga que el poste y que la sombra.', 'المسافة 10 م: إنها الوتر، أطول من العمود ومن الظل.', 'It is 10 m: the hypotenuse, longer than both the pole and the shadow.')
    }
}

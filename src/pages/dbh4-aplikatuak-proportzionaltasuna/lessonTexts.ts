import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { ProportionDbh4ApTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Proportzionaltasuna · 4. DBH aplikatuak — the explanation of each lesson,
   short, then split into cases (one card each), and its typical mistake.
   The mistakes are the ones the race, the detective and the bank already
   use (months taken as years, percentages added, the average of the
   prices…). Examples that challenges call «the one in the lesson» stay
   here: the 24 000 fans, the 448,80 € principal, the 1000 € at 10 %, the
   coffee and the gold, the 240 km and the taps of 5 h and 7 h. Tests in
   tests/proportzionaltasuna-dbh4ap-lessons.test.ts.
   ========================================================================== */

/** In Basque and Spanish a number never breaks from its sign: 3,60 €, 25 %, % 25, and $r$ % after a formula */
const glue = (text: string) => text.split(/(\$[^$]*\$)/).map((part) => (part.startsWith('$') ? part : part.replace(/(\d) ([€%])/g, '$1\u00a0$2').replace(/% (?=\d)|% $/g, '%\u00a0').replace(/^ ([€%])/, '\u00a0$1'))).join('')
/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu: glue(eu), es: glue(es), en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const proportionDbh4ApLessonTexts: Record<ProportionDbh4ApTopicId, LessonTexts> = {
    /* ---------- 1. Simple proportionality ---------- */
    relations: {
        explanation: say(
            'Bi magnitude proportzionalak diren jakiteko, egin balio-taula bat eta begiratu zer gertatzen zaion bati bestea bikoizten denean. Hiru kasu daude.',
            'Para saber si dos magnitudes son proporcionales, haz una tabla de valores y mira qué le pasa a una cuando la otra se dobla. Hay tres casos.',
            'لمعرفة ما إذا كان مقداران متناسبين، اصنع جدول قيم وانظر ماذا يحدث لأحدهما حين يتضاعف الآخر. هناك ثلاث حالات.',
            'To find out whether two quantities are proportional, make a table of values and see what happens to one when the other doubles. There are three cases.'
        ),
        cases: [
            {
                title: say('Zuzena', 'Directa', 'طردي', 'Direct'),
                text: say('Bata bikoiztean, bestea ere bikoizten da. Zatidura konstantea da.', 'Al doblar una, la otra también se dobla. El cociente es constante.', 'إذا تضاعف أحدهما تضاعف الآخر. حاصل القسمة ثابت.', 'When one doubles, so does the other. The quotient is constant.'),
                math: same('$\\frac{b}{a}=k$')
            },
            {
                title: say('Alderantzizkoa', 'Inversa', 'عكسي', 'Inverse'),
                text: say('Bata bikoiztean, bestea erdira jaisten da. Biderkadura konstantea da.', 'Al doblar una, la otra se queda en la mitad. El producto es constante.', 'إذا تضاعف أحدهما صار الآخر نصفه. حاصل الضرب ثابت.', 'When one doubles, the other halves. The product is constant.'),
                math: same('$a\\cdot b=k$')
            },
            {
                title: say('Bat ere ez', 'Ninguna', 'لا هذا ولا ذاك', 'Neither'),
                text: say(
                    'Biak hazten dira, baina ez proportzio berean. Auto batek 7 l erabiltzen ditu 100 km-tan 90 km/h-ra, eta 12 l 120 km/h-ra.',
                    'Las dos crecen, pero no en la misma proporción. Un coche gasta 7 l cada 100 km a 90 km/h, y 12 l a 120 km/h.',
                    'يكبران معًا لكن ليس بالنسبة نفسها. تستهلك سيارة 7 ل لكل 100 كم بسرعة 90 كم/س، و12 ل بسرعة 120 كم/س.',
                    'Both grow, but not in the same proportion. A car uses 7 l per 100 km at 90 km/h, and 12 l at 120 km/h.'
                ),
                math: same('$\\frac{120}{90}\\cdot 7\\approx 9{,}3\\neq 12$')
            }
        ],
        vocabulary: [
            say('magnitudea', 'magnitud', 'مقدار', 'quantity'),
            say('balio-taula', 'tabla de valores', 'جدول قيم', 'table of values'),
            say('zatidura', 'cociente', 'حاصل القسمة', 'quotient')
        ],
        examplePrompt: say('150 km-ko bidaia batean, nolakoak dira abiadura eta denbora: 2 h 75 km/h-ra, 3 h 50 km/h-ra?', 'En un viaje de 150 km, ¿cómo son la velocidad y el tiempo: 2 h a 75 km/h, 3 h a 50 km/h?', 'في رحلة طولها 150 كم، ما العلاقة بين السرعة والزمن: ساعتان بسرعة 75 كم/س، و3 ساعات بسرعة 50 كم/س؟', 'On a 150 km trip, how are the speed and the time related: 2 h at 75 km/h, 3 h at 50 km/h?'),
        example: same('$75\\cdot 2=50\\cdot 3=150$'),
        exampleAnswer: say('Biderkadura konstantea da: alderantziz proportzionalak dira.', 'El producto es constante: son inversamente proporcionales.', 'حاصل الضرب ثابت: هما متناسبان عكسيًا.', 'The product is constant: they are inversely proportional.')
    },
    'direct-rule': {
        explanation: say(
            'Hiruko erregela zuzenean, bi magnitudeak zenbaki berarekin biderkatzen dira. Proportzio batekin edo unitatera laburtuz ebazten da, bi kantitateak unitate berean daudela beti.',
            'En la regla de tres directa, las dos magnitudes se multiplican por el mismo número. Se resuelve con una proporción o reduciendo a la unidad, siempre con las cantidades en la misma unidad.',
            'في قاعدة الثلاثة الطردية يُضرب المقداران في العدد نفسه. تُحلّ بتناسب أو بالإرجاع إلى الوحدة، مع وضع الكميات دائمًا بالوحدة نفسها.',
            'In the direct rule of three, both quantities are multiplied by the same number. You solve it with a proportion or with the unitary method, always with the amounts in the same unit.'
        ),
        cases: [
            {
                title: say('Proportzioarekin', 'Con la proporción', 'بالتناسب', 'With a proportion'),
                text: say(
                    'Bi errenkada, magnitude bakoitza bere zutabean. 0,75 l oliok 3,60 € balio badu, litro batek:',
                    'Dos filas, cada magnitud en su columna. Si 0,75 l de aceite cuestan 3,60 €, un litro:',
                    'صفّان، وكل مقدار في عموده. إذا كان ثمن 0.75 ل من الزيت 3.60 €، فثمن اللتر:',
                    'Two rows, each quantity in its own column. If 0.75 l of oil costs €3.60, one litre costs:'
                ),
                math: same('$x=\\frac{3{,}60\\cdot 1}{0{,}75}=4{,}80$')
            },
            {
                title: say('Unitatera laburtuz', 'Reduciendo a la unidad', 'بالإرجاع إلى الوحدة', 'Unitary method'),
                text: say(
                    'Lehenik unitate baten balioa, gero eskatzen dena. 5,5 m kablek 4,51 € balio dute: metro batek, $4{,}51\\mathbin{:}5{,}5=0{,}82$ €. Eta 8,35 m:',
                    'Primero el valor de una unidad, luego lo que se pide. 5,5 m de cable cuestan 4,51 €: un metro, $4{,}51\\mathbin{:}5{,}5=0{,}82$ €. Y 8,35 m:',
                    'أولًا قيمة الوحدة الواحدة، ثم المطلوب. ثمن 5.5 م من السلك 4.51 €: المتر الواحد $4{,}51\\mathbin{:}5{,}5=0{,}82$ €. و8.35 م:',
                    'First the value of one unit, then what you are asked for. 5.5 m of cable cost €4.51: one metre costs €$4{,}51\\mathbin{:}5{,}5=0{,}82$. And 8.35 m:'
                ),
                math: same('$0{,}82\\cdot 8{,}35\\approx 6{,}85$')
            },
            {
                title: say('Unitate berean', 'En la misma unidad', 'بالوحدة نفسها', 'In the same unit'),
                text: say(
                    'Kalkulatu aurretik, dena unitate berera: 8 m eta 35 cm = 8,35 m.',
                    'Antes de calcular, pasa todo a la misma unidad: 8 m y 35 cm son 8,35 m.',
                    'قبل الحساب حوّل كل شيء إلى الوحدة نفسها: 8 م و35 سم = 8.35 م.',
                    'Before you calculate, put everything in the same unit: 8 m and 35 cm is 8.35 m.'
                )
            }
        ],
        vocabulary: [
            say('hiruko erregela', 'regla de tres', 'قاعدة الثلاثة', 'rule of three'),
            say('proportzioa', 'proporción', 'التناسب', 'proportion'),
            say('unitatea', 'unidad', 'الوحدة', 'unit')
        ],
        examplePrompt: say('4 kg laranjak $6{,}20$ € balio badute, zenbat balio dute 10 kg?', 'Si 4 kg de naranjas cuestan $6{,}20$ €, ¿cuánto cuestan 10 kg?', 'إذا كان ثمن 4 كغ من البرتقال $6{,}20$ €، فكم ثمن 10 كغ؟', 'If 4 kg of oranges cost €$6{,}20$, how much do 10 kg cost?'),
        example: same('$x=\\frac{6{,}20\\cdot 10}{4}=15{,}50$'),
        exampleAnswer: say('Kilo gehiago, euro gehiago: $15{,}50$ €.', 'Más kilos, más euros: $15{,}50$ €.', 'كيلوغرامات أكثر، يوروهات أكثر: $15{,}50$ €.', 'More kilos, more euros: €$15{,}50$.')
    },
    'inverse-rule': {
        explanation: say(
            'Hiruko erregela alderantzizkoan, magnitude bat zenbaki batez biderkatzen bada, bestea zenbaki horrekin zatitzen da: errenkada bakoitzaren biderkadura ez da aldatzen.',
            'En la regla de tres inversa, si una magnitud se multiplica por un número, la otra se divide entre él: el producto de cada fila no cambia.',
            'في قاعدة الثلاثة العكسية، إذا ضُرب أحد المقدارين في عدد قُسم الآخر عليه: حاصل ضرب كل صف لا يتغير.',
            'In the inverse rule of three, if one quantity is multiplied by a number, the other is divided by it: the product of each row does not change.'
        ),
        cases: [
            {
                title: say('Formula', 'La fórmula', 'الصيغة', 'The formula'),
                text: say('Bi errenkadetan biderkadura bera: $a\\cdot b=c\\cdot x$.', 'El mismo producto en las dos filas: $a\\cdot b=c\\cdot x$.', 'حاصل الضرب نفسه في الصفّين: $a\\cdot b=c\\cdot x$.', 'The same product in both rows: $a\\cdot b=c\\cdot x$.'),
                math: same('$x=\\frac{a\\cdot b}{c}$')
            },
            {
                title: say('Biderkadura zer den', 'Qué es el producto', 'معنى حاصل الضرب', 'What the product means'),
                text: say(
                    'Bazka 35 behirentzat 60 egunez: guztira, 2100 «behi-egun». 20 behirekin:',
                    'Pasto para 35 vacas durante 60 días: 2100 «vacas-día» en total. Con 20 vacas:',
                    'علف يكفي 35 بقرة مدة 60 يومًا: 2100 «بقرة-يوم» في المجموع. مع 20 بقرة:',
                    'Grass for 35 cows for 60 days: 2,100 “cow-days” in all. With 20 cows:'
                ),
                math: same('$\\frac{35\\cdot 60}{20}=105$')
            },
            {
                title: say('Non agertzen den', 'Dónde aparece', 'أين تظهر', 'Where it appears'),
                text: say(
                    'Ibilbide bereko abiadura eta denbora, lan bereko langileak eta egunak, eguneko gastua eta aurrezkiek irauten duten egunak.',
                    'La velocidad y el tiempo de un mismo trayecto, los obreros y los días de una misma obra, el gasto diario y los días que duran los ahorros.',
                    'السرعة والزمن في المسار نفسه، والعمال والأيام في العمل نفسه، والإنفاق اليومي والأيام التي تكفيها المدخرات.',
                    'Speed and time on the same route, workers and days on the same job, daily spending and the days the savings last.'
                )
            }
        ],
        vocabulary: [
            say('alderantzizkoa', 'inversa', 'عكسية', 'inverse'),
            say('biderkadura', 'producto', 'حاصل الضرب', 'product'),
            say('errenkada', 'fila', 'صف', 'row')
        ],
        examplePrompt: say('4 txorrotak biltegi bat 9 ordutan betetzen dute. Zenbat behar dute 6 txorrota berdinek?', '4 grifos llenan un depósito en 9 horas. ¿Cuánto tardan 6 grifos iguales?', '4 صنابير تملأ خزانًا في 9 ساعات. كم تحتاج 6 صنابير مماثلة؟', '4 taps fill a tank in 9 hours. How long do 6 identical taps take?'),
        example: same('$x=\\frac{4\\cdot 9}{6}=6$'),
        exampleAnswer: say('Txorrota gehiago, ordu gutxiago: 6 ordu.', 'Más grifos, menos horas: 6 horas.', 'صنابير أكثر، ساعات أقل: 6 ساعات.', 'More taps, fewer hours: 6 hours.')
    },

    /* ---------- 2. Compound proportionality and shares ---------- */
    compound: {
        explanation: say(
            'Bi magnitude baino gehiago daudenean, konparatu ezezaguna bakoitzarekin bereiz, besteak aldatuko ez balira bezala, eta biderkatu zatiki guztiez.',
            'Con más de dos magnitudes, compara la incógnita con cada una por separado, como si las demás no cambiaran, y multiplica por todas las fracciones.',
            'إذا كان هناك أكثر من مقدارين، قارن المجهول بكل مقدار وحده كأن الباقي لا يتغير، ثم اضرب في كل الكسور.',
            'With more than two quantities, compare the unknown with each one separately, as if the others did not change, and multiply by all the fractions.'
        ),
        cases: [
            {
                title: say('Zuzena: berria/zaharra', 'Directa: nuevo/viejo', 'طردي: الجديد/القديم', 'Direct: new/old'),
                text: say(
                    'Gehiago → gehiago. 2 bizikleta 3 orduz: 11,10 €. 3 bizikleta 5 orduz, biak zuzenak:',
                    'Más → más. 2 bicis 3 horas: 11,10 €. 3 bicis 5 horas, las dos directas:',
                    'أكثر ← أكثر. دراجتان 3 ساعات: 11.10 €. 3 دراجات 5 ساعات، والاثنتان طرديتان:',
                    'More → more. 2 bikes for 3 hours: €11.10. 3 bikes for 5 hours, both direct:'
                ),
                math: same('$11{,}10\\cdot\\frac{3}{2}\\cdot\\frac{5}{3}=27{,}75$')
            },
            {
                title: say('Alderantzizkoa: zaharra/berria', 'Inversa: viejo/nuevo', 'عكسي: القديم/الجديد', 'Inverse: old/new'),
                text: say(
                    'Gehiago → gutxiago. 3 margolarik, egunean 8 ordu, 10 egun behar dituzte. 5 margolarik, egunean 6 ordu, biak alderantzizkoak:',
                    'Más → menos. 3 pintores, 8 horas al día, tardan 10 días. 5 pintores, 6 horas al día, las dos inversas:',
                    'أكثر ← أقل. 3 دهّانين، 8 ساعات يوميًا، يحتاجون 10 أيام. 5 دهّانين، 6 ساعات يوميًا، والاثنتان عكسيتان:',
                    'More → less. 3 painters, 8 hours a day, take 10 days. 5 painters, 6 hours a day, both inverse:'
                ),
                math: same('$10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$')
            }
        ],
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('zatikiak', 'fracciones', 'الكسور', 'fractions'),
            say('zuzena', 'directa', 'طردي', 'direct')
        ],
        examplePrompt: say('6 makinak 900 pieza egiten dituzte 5 ordutan. Zenbat pieza egiten dituzte 4 makinak 8 ordutan?', '6 máquinas fabrican 900 piezas en 5 horas. ¿Cuántas piezas fabrican 4 máquinas en 8 horas?', '6 آلات تصنع 900 قطعة في 5 ساعات. كم قطعة تصنع 4 آلات في 8 ساعات؟', '6 machines make 900 parts in 5 hours. How many parts do 4 machines make in 8 hours?'),
        example: same('$900\\cdot\\frac{4}{6}\\cdot\\frac{8}{5}=960$'),
        exampleAnswer: say('Biak zuzenak dira (makina gutxiago → pieza gutxiago; ordu gehiago → pieza gehiago): 960 pieza.', 'Las dos son directas (menos máquinas → menos piezas; más horas → más piezas): 960 piezas.', 'كلاهما طردي (آلات أقل ← قطع أقل؛ ساعات أكثر ← قطع أكثر): 960 قطعة.', 'Both are direct (fewer machines → fewer parts; more hours → more parts): 960 parts.')
    },
    'direct-share': {
        explanation: say(
            'Banaketa zuzenean, zenbaki handiagoari zati handiagoa. Lehenik zati baten balioa; gero, zati bakoitza.',
            'En un reparto directamente proporcional, a número mayor, parte mayor. Primero el valor de una parte; después, cada parte.',
            'في التوزيع الطردي، للعدد الأكبر الجزء الأكبر. أولًا قيمة الجزء الواحد، ثم كل جزء.',
            'In a direct share, the larger number gets the larger share. First the value of one part, then each share.'
        ),
        cases: [
            {
                title: say('Zati baten balioa', 'El valor de una parte', 'قيمة الجزء الواحد', 'The value of one part'),
                text: say(
                    'Batu zenbakiak eta zatitu kantitatea batura horrekin. Argiaren faktura: 62,40 €; egunak: 60, 40 eta 20.',
                    'Suma los números y divide la cantidad entre esa suma. Factura de la luz de 62,40 € entre 60, 40 y 20 días:',
                    'اجمع الأعداد واقسم الكمية على المجموع. فاتورة كهرباء 62.40 € بين 60 و40 و20 يومًا:',
                    'Add the numbers and divide the amount by that sum. A €62.40 electricity bill for 60, 40 and 20 days:'
                ),
                math: same('$62{,}40\\mathbin{:}(60+40+20)=0{,}52$')
            },
            {
                title: say('Zati bakoitza', 'Cada parte', 'كل جزء', 'Each share'),
                text: say(
                    'Biderkatu zenbaki bakoitza zati baten balioaz. Amaieran, egiaztatu zatien batura kantitate osoa dela.',
                    'Multiplica cada número por el valor de una parte. Al final, comprueba que las partes suman la cantidad total.',
                    'اضرب كل عدد في قيمة الجزء الواحد. وفي النهاية تحقّق أن مجموع الأجزاء يساوي الكمية كلها.',
                    'Multiply each number by the value of one part. At the end, check that the shares add up to the whole amount.'
                ),
                math: same('$31{,}20+20{,}80+10{,}40=62{,}40$')
            }
        ],
        vocabulary: [
            say('banaketa zuzena', 'reparto directo', 'التوزيع الطردي', 'direct share'),
            say('zati bakoitza', 'cada parte', 'كل جزء', 'each share'),
            say('zatiaren balioa', 'valor de una parte', 'قيمة الجزء', 'value of one part')
        ],
        examplePrompt: say('Banatu 450 € hiru lagunen artean, egindako 2, 3 eta 4 lan-orduen arabera.', 'Reparte 450 € entre tres amigos en proporción a sus 2, 3 y 4 horas de trabajo.', 'وزّع 450 € على ثلاثة أصدقاء بنسبة ساعات عملهم 2 و3 و4.', 'Share €450 among three friends in proportion to their 2, 3 and 4 hours of work.'),
        example: same('$\\begin{gathered}450\\div(2+3+4)=50\\\\ 100,\\ 150,\\ 200\\end{gathered}$'),
        exampleAnswer: say('100 €, 150 € eta 200 €; batuta, 450 €.', '100 €, 150 € y 200 €, que suman 450 €.', '100 € و150 € و200 €، ومجموعها 450 €.', '€100, €150 and €200, which add up to €450.')
    },
    'inverse-share': {
        explanation: say(
            'Zenbaki batzuekiko alderantziz banatzea haien alderantzizkoekiko zuzenki banatzea da: zenbaki handienari zati txikiena tokatzen zaio.',
            'Repartir inversamente a unos números es repartir directamente a sus inversos: al número mayor le toca la parte menor.',
            'التوزيع العكسي على أعداد هو التوزيع الطردي على مقلوباتها: العدد الأكبر يأخذ الجزء الأصغر.',
            'Sharing inversely in proportion to some numbers means sharing directly in proportion to their reciprocals: the largest number gets the smallest share.'
        ),
        cases: [
            {
                title: say('Alderantzizkoekin', 'Con los inversos', 'بالمقلوبات', 'With the reciprocals'),
                text: say(
                    'Banatu 22\u00a0000 € alderantziz; zenbakiak: 1, 2 eta 3. Alderantzizkoen batura $\\frac{11}{6}$ da. Zatiak: 12\u00a0000 €, 6000 € eta 4000 €.',
                    'Repartir 22\u00a0000 € inversamente a 1, 2 y 3: la suma de los inversos es $\\frac{11}{6}$. Las partes son 12\u00a0000 €, 6000 € y 4000 €.',
                    'توزيع 22\u00a0000 € عكسيًا على 1 و2 و3: مجموع المقلوبات $\\frac{11}{6}$. الأجزاء 12\u00a0000 € و6000 € و4000 €.',
                    'Share €22,000 inversely in proportion to 1, 2 and 3: the reciprocals add up to $\\frac{11}{6}$. The shares are €12,000, €6,000 and €4,000.'
                ),
                math: same('$22\\,000\\mathbin{:}\\frac{11}{6}=12\\,000$')
            },
            {
                title: say('Izendatzaile berarekin', 'Con el mismo denominador', 'بالمقام نفسه', 'With a common denominator'),
                text: say(
                    '$\\frac{6}{6}$, $\\frac{3}{6}$ eta $\\frac{2}{6}$: banatu zuzenki; zenbakiak: 6, 3 eta 2.',
                    '$\\frac{6}{6}$, $\\frac{3}{6}$ y $\\frac{2}{6}$: reparte directamente a 6, 3 y 2.',
                    '$\\frac{6}{6}$ و$\\frac{3}{6}$ و$\\frac{2}{6}$: وزّع طرديًا على 6 و3 و2.',
                    '$\\frac{6}{6}$, $\\frac{3}{6}$ and $\\frac{2}{6}$: share directly in proportion to 6, 3 and 2.'
                ),
                math: same('$22\\,000\\mathbin{:}11=2000$')
            }
        ],
        vocabulary: [
            say('alderantzizkoak', 'inversos', 'مقلوبات', 'reciprocals'),
            say('izendatzaile bera', 'mismo denominador', 'المقام نفسه', 'common denominator'),
            say('banaketa', 'reparto', 'التوزيع', 'share')
        ],
        why: {
            text: say(
                'Zenbaki handienari gutxien tokatzen zaio; beraz, zenbakia handitzean txikitzen den zerbaiten arabera banatzen da: haren alderantzizkoa. 1, 2 eta 3 zenbakien alderantzizkoak 1, $\\frac{1}{2}$ eta $\\frac{1}{3}$ dira: 3 zenbakiari zatirik txikiena.',
                'Al número mayor le toca menos, así que se reparte según algo que baje cuando el número sube: su inverso. Los inversos de 1, 2 y 3 son 1, $\\frac{1}{2}$ y $\\frac{1}{3}$: al 3 le toca la parte menor.',
                'العدد الأكبر يأخذ أقل، لذلك نوزّع حسب شيء يصغر حين يكبر العدد: مقلوبه. مقلوبات 1 و2 و3 هي 1 و$\\frac{1}{2}$ و$\\frac{1}{3}$: فيأخذ 3 الجزء الأصغر.',
                'The largest number gets the least, so you share by something that goes down when the number goes up: its reciprocal. The reciprocals of 1, 2 and 3 are 1, $\\frac{1}{2}$ and $\\frac{1}{3}$: 3 gets the smallest share.'
            )
        },
        examplePrompt: say('Banatu 260 € 2, 3 eta 4 zenbakiekiko alderantziz proportzionalki.', 'Reparte 260 € en partes inversamente proporcionales a 2, 3 y 4.', 'وزّع 260 € توزيعًا عكسيًا على 2 و3 و4.', 'Share €260 in inverse proportion to 2, 3 and 4.'),
        example: same('$\\frac{6}{12},\\ \\frac{4}{12},\\ \\frac{3}{12}\\ \\to\\ 260\\div 13=20$'),
        exampleAnswer: say('Zuzenean 6, 4 eta 3 zenbakiekiko: 120 €, 80 € eta 60 €. 4 zenbakiari zatirik txikiena.', 'Directamente a 6, 4 y 3: 120 €, 80 € y 60 €. Al 4 le toca la parte menor.', 'طرديًا على 6 و4 و3: 120 € و80 € و60 €. ويأخذ 4 الجزء الأصغر.', 'Directly in proportion to 6, 4 and 3: €120, €80 and €60. 4 gets the smallest share.')
    },

    /* ---------- 3. Percentages ---------- */
    'percent-calc': {
        explanation: say(
            'Ehunekoa hamartar gisa idazten da (% 32 = 0,32; % 2,5 = 0,025), eta dena formula honetatik ateratzen da: zatia = osoa · hamartarra. Falta denaren arabera, hiru kasu daude.',
            'El porcentaje se escribe como decimal (32 % = 0,32; 2,5 % = 0,025) y todo sale de parte = total · decimal. Según lo que falte, hay tres casos.',
            'تُكتب النسبة المئوية عددًا عشريًا (32٪ = 0.32، و2.5٪ = 0.025)، وكل شيء يخرج من: الجزء = الكل · العشري. وحسب الناقص هناك ثلاث حالات.',
            'A percentage is written as a decimal (32% = 0.32; 2.5% = 0.025), and everything comes from part = whole · decimal. Depending on what is missing, there are three cases.'
        ),
        cases: [
            {
                title: say('Zatia', 'La parte', 'الجزء', 'The part'),
                text: say('Osoa bider hamartarra: % 32, osoa 500 bada.', 'Total por decimal: el 32 % de 500.', 'الكل في العشري: 32٪ من 500.', 'Whole times decimal: 32% of 500.'),
                math: same('$500\\cdot 0{,}32=160$')
            },
            {
                title: say('Osoa', 'El total', 'الكل', 'The whole'),
                text: say(
                    'Zatia zati hamartarra: 24\u00a0000 zale estadioaren edukieraren % 80 dira.',
                    'Parte entre decimal: 24\u00a0000 aficionados son el 80 % de la capacidad del estadio.',
                    'الجزء على العشري: 24\u00a0000 مشجع هم 80٪ من سعة الملعب.',
                    'Part divided by decimal: 24,000 fans are 80% of the stadium\'s capacity.'
                ),
                math: same('$24\\,000\\mathbin{:}0{,}8=30\\,000$')
            },
            {
                title: say('Ehunekoa', 'El porcentaje', 'النسبة', 'The percentage'),
                text: say(
                    'Zatia zati osoa, bider 100. Elenak 5000 € zituen, eta 750 € gastatu ditu:',
                    'Parte entre total, por 100. Elena ha gastado 750 € de 5000 €:',
                    'الجزء على الكل، في 100. أنفقت إيلينا 750 € من 5000 €:',
                    'Part divided by whole, times 100. Elena has spent €750 of €5,000:'
                ),
                math: same('$750\\mathbin{:}5000\\cdot 100=15$')
            }
        ],
        vocabulary: [
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage'),
            say('hamartarra', 'decimal', 'العشري', 'decimal'),
            say('zatia', 'parte', 'الجزء', 'part')
        ],
        examplePrompt: say('25 ikasleko gela batean, 7 ikaslek betaurrekoak dituzte. Zer ehuneko da?', 'En una clase de 25 alumnos, 7 llevan gafas. ¿Qué porcentaje es?', 'في صف فيه 25 تلميذًا، 7 منهم يلبسون نظارات. ما النسبة المئوية؟', 'In a class of 25 students, 7 wear glasses. What percentage is that?'),
        example: same('$7\\div 25\\cdot 100=28$'),
        exampleAnswer: say('Zatia zati osoa, bider 100: % 28.', 'Parte entre total, por 100: el 28 %.', 'الجزء على الكل في 100: 28٪.', 'Part divided by whole, times 100: 28%.')
    },
    index: {
        explanation: say(
            'Amaierakoa = hasierakoa · indizea. Indizeak aldaketa zenbaki bakar batean biltzen du, eta aurrera joateko, atzera egiteko edo ehunekoa aurkitzeko balio du.',
            'Final = inicial · índice. El índice resume el cambio en un solo número, y sirve para ir hacia delante, hacia atrás o para hallar el porcentaje.',
            'النهائي = الأصلي · المؤشر. يلخّص المؤشر التغيّر في عدد واحد، ويُستعمل للتقدّم أو للرجوع أو لإيجاد النسبة.',
            'Final = original · multiplier. The multiplier sums up the change in a single number, and it works forwards, backwards or to find the percentage.'
        ),
        cases: [
            {
                title: say('Igoera eta jaitsiera', 'Subida y bajada', 'زيادة ونقصان', 'Increase and decrease'),
                text: say(
                    '% $p$ igotzean, $1+\\frac{p}{100}$ (BEZa, % 21 → 1,21). % $p$ jaistean, $1-\\frac{p}{100}$ (beherapena, % 30 → 0,70).',
                    'Subir un $p$ %: $1+\\frac{p}{100}$ (IVA del 21 % → 1,21). Bajar un $p$ %: $1-\\frac{p}{100}$ (rebaja del 30 % → 0,70).',
                    'زيادة $p$٪: $1+\\frac{p}{100}$ (ضريبة 21٪ ← 1.21). نقصان $p$٪: $1-\\frac{p}{100}$ (تخفيض 30٪ ← 0.70).',
                    'Increase by $p$%: $1+\\frac{p}{100}$ (21% VAT → 1.21). Decrease by $p$%: $1-\\frac{p}{100}$ (30% off → 0.70).'
                )
            },
            {
                title: say('Atzera', 'Hacia atrás', 'إلى الوراء', 'Backwards'),
                text: say(
                    'Indizeaz zatitzen da. Iturginaren faktura: 143,99 €, BEZa barne (% 21). BEZik gabe:',
                    'Se divide entre el índice. La factura del fontanero es de 143,99 € con el 21 % de IVA. Sin IVA:',
                    'نقسم على المؤشر. فاتورة السبّاك 143.99 € مع ضريبة 21٪. ودون الضريبة:',
                    'Divide by the multiplier. The plumber\'s bill is €143.99 including 21% VAT. Without VAT:'
                ),
                math: same('$143{,}99\\mathbin{:}1{,}21=119$')
            },
            {
                title: say('Ehunekoa aurkitzeko', 'Hallar el porcentaje', 'إيجاد النسبة', 'Finding the percentage'),
                text: say(
                    'Amaierakoa zati hasierakoa. Asegurua 520 € zen, eta orain 442 € da; beherapena % 15 da.',
                    'Final entre inicial. El seguro baja de 520 € a 442 €: una rebaja del 15 %.',
                    'النهائي على الأصلي. ينخفض التأمين من 520 € إلى 442 €: أي تخفيض 15٪.',
                    'Final divided by original. The insurance goes down from €520 to €442: a 15% cut.'
                ),
                math: same('$442\\mathbin{:}520=0{,}85$')
            }
        ],
        definitions: [
            {
                term: say('Aldakuntza-indizea', 'Índice de variación', 'مؤشر التغيّر', 'Multiplier'),
                meaning: say('Hasierako kantitatea zenbakiz biderkatu behar den, amaierakoa lortzeko.', 'El número por el que se multiplica la cantidad inicial para obtener la final.', 'العدد الذي نضرب فيه الكمية الأصلية لنحصل على النهائية.', 'The number you multiply the original amount by to get the final one.')
            }
        ],
        vocabulary: [
            say('igoera', 'subida', 'زيادة', 'increase'),
            say('atzera', 'hacia atrás', 'إلى الوراء', 'backwards'),
            say('ehunekoa', 'porcentaje', 'النسبة', 'percentage')
        ],
        examplePrompt: say('80 euroko beroki bat % 12 garestitu da. Zenbat balio du orain?', 'Un abrigo de 80 € sube un 12 %. ¿Cuánto cuesta ahora?', 'معطف ثمنه 80 € ارتفع سعره 12٪. كم ثمنه الآن؟', 'An €80 coat goes up 12%. How much does it cost now?'),
        example: same('$80\\cdot 1{,}12=89{,}60$'),
        exampleAnswer: say('Igoera baten indizea $1{,}12$ da: $89{,}60$ €.', 'El índice de la subida es $1{,}12$: $89{,}60$ €.', 'مؤشر الزيادة $1{,}12$: $89{,}60$ €.', 'The multiplier for the increase is $1{,}12$: €$89{,}60$.')
    },
    chained: {
        explanation: say(
            'Aldaketa bakoitza aurrekoaren ondoren geratzen denari aplikatzen zaio; beraz, indize osoa indizeen biderkadura da: $I_T=I_1\\cdot I_2\\cdots$.',
            'Cada cambio se aplica a lo que queda tras el anterior, así que el índice total es el producto de los índices: $I_T=I_1\\cdot I_2\\cdots$.',
            'يُطبَّق كل تغيّر على ما بقي بعد التغيّر السابق، فالمؤشر الكلي هو حاصل ضرب المؤشرات: $I_T=I_1\\cdot I_2\\cdots$.',
            'Each change is applied to what is left after the one before, so the total multiplier is the product of the multipliers: $I_T=I_1\\cdot I_2\\cdots$.'
        ),
        cases: [
            {
                title: say('Bi igoera', 'Dos subidas', 'زيادتان', 'Two increases'),
                text: say(
                    'Herri batek 25\u00a0000 biztanle ditu; % 18 hazten da, eta gero % 25:',
                    'Un pueblo de 25\u00a0000 habitantes crece un 18 % y luego un 25 %:',
                    'بلدة فيها 25\u00a0000 نسمة تنمو 18٪ ثم 25٪:',
                    'A town of 25,000 people grows by 18% and then by 25%:'
                ),
                math: same('$25\\,000\\cdot 1{,}18\\cdot 1{,}25=36\\,875$')
            },
            {
                title: say('Urrats asko', 'Varios pasos', 'عدة خطوات', 'Several steps'),
                text: say(
                    'Fruta nekazaritik kontsumitzailera: % 25 igo, % 60 igo, bikoiztu, eta % 50 igo. Prezioa 6 aldiz handiagoa da.',
                    'La fruta del agricultor al consumidor: sube un 25 %, un 60 %, se dobla y sube un 50 %. El precio se multiplica por 6.',
                    'الفاكهة من المزارع إلى المستهلك: تزيد 25٪ ثم 60٪، تتضاعف، ثم تزيد 50٪. يُضرب السعر في 6.',
                    'Fruit from farmer to shopper: up 25%, up 60%, doubled and up 50%. The price is multiplied by 6.'
                ),
                math: same('$1{,}25\\cdot 1{,}6\\cdot 2\\cdot 1{,}5=6$')
            },
            {
                title: say('Igo eta jaitsi', 'Subir y bajar', 'زيادة ثم نقصان', 'Up and down'),
                text: say(
                    'Ehuneko bereko igoera eta jaitsiera ez dira deuseztatzen: % 20 igo eta % 20 jaitsiz gero, % 4 gutxiago.',
                    'Una subida y una bajada del mismo porcentaje no se anulan: subir un 20 % y bajar un 20 % deja un 4 % menos.',
                    'الزيادة والنقصان بالنسبة نفسها لا يلغي أحدهما الآخر: زيادة 20٪ ثم نقصان 20٪ تترك 4٪ أقل.',
                    'A rise and a fall of the same percentage do not cancel out: up 20% and down 20% leaves 4% less.'
                ),
                math: same('$1{,}2\\cdot 0{,}8=0{,}96$')
            }
        ],
        vocabulary: [
            say('indize osoa', 'índice total', 'المؤشر الكلي', 'total multiplier'),
            say('biderkadura', 'producto', 'حاصل ضرب', 'product'),
            say('igoera', 'subida', 'زيادة', 'increase')
        ],
        why: {
            text: say(
                'Bigarren ehunekoa jada aldatutako prezioaren gainean kalkulatzen da. 100 € % 10 igotzen dira: 110 €. 110 euroren % 10 jaistea 11 € kentzea da, ez 10 €: 99 € geratzen dira.',
                'El segundo porcentaje se calcula sobre el precio ya cambiado. 100 € suben un 10 %: 110 €. Bajar un 10 % de 110 € es quitar 11 €, no 10 €: quedan 99 €.',
                'تُحسب النسبة الثانية من السعر بعد تغيّره. 100 € تزيد 10٪: 110 €. وإنقاص 10٪ من 110 € هو طرح 11 € لا 10 €: يبقى 99 €.',
                'The second percentage is worked out on the price that has already changed. €100 goes up 10%: €110. Taking 10% off €110 is taking €11 off, not €10: €99 is left.'
            ),
            math: same('$100\\cdot 1{,}1\\cdot 0{,}9=99$')
        },
        examplePrompt: say('200 euroko prezio bat % 10 jaitsi da, eta gero % 30 igo. Zein da azken prezioa?', 'Un precio de 200 € baja un 10 % y después sube un 30 %. ¿Cuál es el precio final?', 'سعر 200 € انخفض 10٪ ثم ارتفع 30٪. ما السعر النهائي؟', 'A €200 price falls 10% and then rises 30%. What is the final price?'),
        example: same('$200\\cdot 0{,}9\\cdot 1{,}3=234$'),
        exampleAnswer: say('Indize osoa $0{,}9\\cdot 1{,}3=1{,}17$ da: 234 €, % 17 gehiago.', 'El índice total es $0{,}9\\cdot 1{,}3=1{,}17$: 234 €, un 17 % más.', 'المؤشر الكلي $0{,}9\\cdot 1{,}3=1{,}17$: 234 €، أي أكثر بـ 17٪.', 'The total multiplier is $0{,}9\\cdot 1{,}3=1{,}17$: €234, 17% more.')
    },

    /* ---------- 4. Simple and compound interest ---------- */
    'simple-interest': {
        explanation: say(
            'Interes bakunean urte bakoitzak interes bera ematen du, hasierako kapitalaren % $r$. Tasa urtekoa da; beraz, zatitzailea denboraren unitatearen araberakoa da.',
            'En el interés simple cada año da el mismo interés, el $r$ % del capital inicial. El tipo es anual, así que el divisor depende de la unidad del tiempo.',
            'في الفائدة البسيطة تعطي كل سنة الفائدة نفسها، $r$٪ من رأس المال الأصلي. السعر سنوي، لذلك يتعلق المقسوم عليه بوحدة المدة.',
            'With simple interest, every year gives the same interest: $r$% of the starting principal. The rate is per year, so the divisor depends on the unit of time.'
        ),
        cases: [
            {
                title: say('Urtetan', 'En años', 'بالسنوات', 'In years'),
                text: say('Zatitzailea 100 da.', 'Se divide entre 100.', 'نقسم على 100.', 'Divide by 100.'),
                math: same('$I=\\frac{C\\cdot r\\cdot t}{100}$')
            },
            {
                title: say('Hilabetetan', 'En meses', 'بالأشهر', 'In months'),
                text: say(
                    'Hilabete bat urtearen $\\frac{1}{12}$ da: zatitzailea $100\\cdot 12=1200$ da. Kapitala 1000 €, tasa % 4, 4 hilabete:',
                    'Un mes es $\\frac{1}{12}$ de año: se divide entre $100\\cdot 12=1200$. 1000 € al 4 % durante 4 meses:',
                    'الشهر $\\frac{1}{12}$ من السنة: نقسم على $100\\cdot 12=1200$. 1000 € بنسبة 4٪ مدة 4 أشهر:',
                    'A month is $\\frac{1}{12}$ of a year: divide by $100\\cdot 12=1200$. €1,000 at 4% for 4 months:'
                ),
                math: same('$\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$')
            },
            {
                title: say('Egunetan', 'En días', 'بالأيام', 'In days'),
                text: say('Urte komertzialak 360 egun ditu: zatitzailea $100\\cdot 360=36\\,000$ da.', 'El año comercial tiene 360 días: se divide entre $100\\cdot 360=36\\,000$.', 'السنة التجارية 360 يومًا: نقسم على $100\\cdot 360=36\\,000$.', 'A commercial year has 360 days: divide by $100\\cdot 360=36\\,000$.'),
                math: same('$I=\\frac{C\\cdot r\\cdot t}{36\\,000}$')
            },
            {
                title: say('Beste datu bat', 'Despejar otro dato', 'إيجاد معطى آخر', 'Finding another value'),
                text: say(
                    'Interesa 448,80 € da, tasa % 3,2 eta denbora 9 hilabete. Zer kapitalek sortzen du?',
                    '¿Qué capital produce 448,80 € al 3,2 % en 9 meses?',
                    'أي رأس مال يُنتج 448.80 € بنسبة 3.2٪ في 9 أشهر؟',
                    'What principal earns €448.80 at 3.2% in 9 months?'
                ),
                math: same('$C=\\frac{448{,}80\\cdot 1200}{3{,}2\\cdot 9}=18\\,700$')
            }
        ],
        vocabulary: [
            say('kapitala', 'capital', 'رأس المال', 'principal'),
            say('tasa', 'tipo', 'السعر', 'rate'),
            say('interes bakuna', 'interés simple', 'الفائدة البسيطة', 'simple interest')
        ],
        examplePrompt: say('Zenbat interes ematen dute 2500 eurok, % 4 interesarekin, 3 urtez?', '¿Qué interés producen 2500 € al 4 % durante 3 años?', 'ما الفائدة التي تنتجها 2500 € بسعر 4٪ مدة 3 سنوات؟', 'What interest do €2,500 earn at 4% over 3 years?'),
        example: same('$I=\\frac{2500\\cdot 4\\cdot 3}{100}=300$'),
        exampleAnswer: say('Urtetan, 100 zenbakiaz zatitzen da: 300 €.', 'En años se divide entre 100: 300 €.', 'بالسنوات نقسم على 100: 300 €.', 'In years, divide by 100: €300.')
    },
    'compound-interest': {
        explanation: say(
            'Interes konposatuan, urte bakoitzeko interesa kapitalari gehitzen zaio, eta hurrengo urtean hark ere interesa sortzen du. Urtero kapitala $1+\\frac{r}{100}$ indizeaz biderkatzen da.',
            'En el interés compuesto, el interés de cada año se suma al capital y, al año siguiente, también produce interés. Cada año el capital se multiplica por el índice $1+\\frac{r}{100}$.',
            'في الفائدة المركّبة تُضاف فائدة كل سنة إلى رأس المال، وفي السنة التالية تُنتج هي أيضًا فائدة. كل سنة يُضرب رأس المال في المؤشر $1+\\frac{r}{100}$.',
            'With compound interest, each year\'s interest is added to the principal and, the next year, it earns interest too. Each year the principal is multiplied by the multiplier $1+\\frac{r}{100}$.'
        ),
        cases: [
            {
                title: say('Bakuna eta konposatua', 'Simple frente a compuesto', 'البسيطة والمركّبة', 'Simple versus compound'),
                text: say(
                    'Kapitala 1000 €, tasa % 10: bakunean 1100, 1200, 1300; konposatuan 1100, 1210, 1331.',
                    '1000 € al 10 %: en simple, 1100, 1200, 1300; en compuesto, 1100, 1210, 1331.',
                    '1000 € بنسبة 10٪: في البسيطة 1100، 1200، 1300؛ وفي المركّبة 1100، 1210، 1331.',
                    '€1,000 at 10%: simple interest gives 1,100, 1,200, 1,300; compound gives 1,100, 1,210, 1,331.'
                ),
                math: same('$1000\\cdot 1{,}1^{3}=1331$')
            },
            {
                title: say('Formula', 'La fórmula', 'الصيغة', 'The formula'),
                text: say(
                    '$t$ urtetan, $t$ aldiz indizea. Kapitala 5600 €, tasa % 3,8, 10 urte:',
                    'En $t$ años, $t$ veces el índice. 5600 € al 3,8 % durante 10 años:',
                    'في $t$ سنوات نضرب في المؤشر $t$ مرات. 5600 € بنسبة 3.8٪ مدة 10 سنوات:',
                    'In $t$ years, the multiplier $t$ times. €5,600 at 3.8% for 10 years:'
                ),
                math: same('$5600\\cdot 1{,}038^{10}\\approx 8131{,}33$')
            },
            {
                title: say('Atzera', 'Hacia atrás', 'إلى الوراء', 'Backwards'),
                text: say(
                    'Hasierako kapitala aurkitzeko, zatitu indizeaz, urteak berretzaile direla.',
                    'Para hallar el capital inicial, se divide entre el índice elevado a los años.',
                    'لإيجاد رأس المال الأصلي نقسم على المؤشر مرفوعًا إلى عدد السنوات.',
                    'To find the starting principal, divide by the multiplier raised to the number of years.'
                ),
                math: same('$C=C_f\\mathbin{:}\\left(1+\\frac{r}{100}\\right)^{t}$')
            }
        ],
        vocabulary: [
            say('interes konposatua', 'interés compuesto', 'الفائدة المركّبة', 'compound interest'),
            say('kapitala', 'capital', 'رأس المال', 'principal'),
            say('indizea', 'índice', 'المؤشر', 'multiplier')
        ],
        why: {
            text: say(
                '% 10 gehitzea $1{,}1$ zenbakiaz biderkatzea da: $1000+100=1000\\cdot 1{,}1$. Hurrengo urtean gauza bera egiten da kapital berriarekin; beraz, urte bakoitzak $\\cdot 1{,}1$ bat gehiago dakar: 3 urtetan, $1{,}1^{3}$.',
                'Sumar el 10 % es multiplicar por $1{,}1$: $1000+100=1000\\cdot 1{,}1$. Al año siguiente se repite con el capital nuevo, así que cada año añade otro $\\cdot 1{,}1$: en 3 años, $1{,}1^{3}$.',
                'إضافة 10٪ هي الضرب في $1{,}1$: $1000+100=1000\\cdot 1{,}1$. وفي السنة التالية يتكرر ذلك مع رأس المال الجديد، فكل سنة تضيف $\\cdot 1{,}1$ أخرى: في 3 سنوات $1{,}1^{3}$.',
                'Adding 10% is multiplying by $1{,}1$: $1000+100=1000\\cdot 1{,}1$. The next year it happens again with the new principal, so each year adds another $\\cdot 1{,}1$: in 3 years, $1{,}1^{3}$.'
            ),
            math: same('$\\begin{aligned}1000\\cdot 1{,}1\\cdot 1{,}1\\cdot 1{,}1&=1000\\cdot 1{,}1^{3}\\\\ &=1331\\end{aligned}$')
        },
        examplePrompt: say('2000 € jartzen dira, % 4 interes konposatuarekin, 2 urtez. Zenbat diru egongo da?', 'Se colocan 2000 € al 4 % de interés compuesto durante 2 años. ¿Cuánto dinero habrá?', 'تُودَع 2000 € بفائدة مركّبة 4٪ مدة سنتين. كم سيكون المال؟', '€2,000 is invested at 4% compound interest for 2 years. How much money will there be?'),
        example: same('$2000\\cdot 1{,}04^{2}=2163{,}20$'),
        exampleAnswer: say('$2163{,}20$ €; interes bakunarekin, 2160 € izango lirateke.', '$2163{,}20$ €; con interés simple serían 2160 €.', '$2163{,}20$ €؛ وبالفائدة البسيطة تكون 2160 €.', '€$2163{,}20$; with simple interest it would be €2,160.')
    },
    periods: {
        explanation: say(
            'Bankuak interesak urtean $k$ aldiz gehitzen baditu, aldi bakoitzean urteko tasaren $k$-garren zatia aplikatzen du, eta $t$ urtetan $k\\cdot t$ aldi daude.',
            'Si el banco suma los intereses $k$ veces al año, en cada periodo aplica la $k$-ésima parte del tipo anual, y en $t$ años hay $k\\cdot t$ periodos.',
            'إذا أضاف المصرف الفوائد $k$ مرات في السنة، يطبّق في كل فترة الجزء $k$ من السعر السنوي، وفي $t$ سنوات توجد $k\\cdot t$ فترة.',
            'If the bank adds the interest $k$ times a year, in each period it applies one $k$th of the annual rate, and in $t$ years there are $k\\cdot t$ periods.'
        ),
        cases: [
            {
                title: say('Formula', 'La fórmula', 'الصيغة', 'The formula'),
                text: say(
                    'Hilekoa $k=12$, hiruhilekoa $k=4$, lauhilekoa $k=3$, seihilekoa $k=2$.',
                    'Mensual $k=12$, trimestral $k=4$, cuatrimestral $k=3$, semestral $k=2$.',
                    'شهريًا $k=12$، كل ثلاثة أشهر $k=4$، كل أربعة أشهر $k=3$، كل ستة أشهر $k=2$.',
                    'Monthly $k=12$, quarterly $k=4$, every four months $k=3$, half-yearly $k=2$.'
                ),
                math: same('$C_f=C\\cdot\\left(1+\\frac{r}{100\\cdot k}\\right)^{k\\cdot t}$')
            },
            {
                title: say('Urtekoa', 'Anual', 'سنويًا', 'Once a year'),
                text: say('Kapitala 24\u00a0000 €, tasa % 4,8, 5 urte:', '24\u00a0000 € al 4,8 % durante 5 años:', '24\u00a0000 € بنسبة 4.8٪ مدة 5 سنوات:', '€24,000 at 4.8% for 5 years:'),
                math: same('$24\\,000\\cdot 1{,}048^{5}\\approx 30\\,340{,}15$')
            },
            {
                title: say('Hilekoa', 'Mensual', 'شهريًا', 'Monthly'),
                text: say(
                    '% 0,4 hilero, 60 hilabetez: apur bat gehiago, baina alde txikia.',
                    'Un 0,4 % cada mes durante 60 meses: algo más, pero la diferencia es pequeña.',
                    '0.4٪ كل شهر مدة 60 شهرًا: أكثر قليلًا، لكن الفرق صغير.',
                    '0.4% every month for 60 months: a little more, but the difference is small.'
                ),
                math: same('$24\\,000\\cdot 1{,}004^{60}\\approx 30\\,495{,}38$')
            }
        ],
        definitions: [
            {
                term: say('Kapitalizazio-aldia', 'Periodo de capitalización', 'فترة الرسملة', 'Compounding period'),
                meaning: say('Bankuak interesak kapitalari gehitzen dizkion denbora-tartea: urtea, seihilekoa, hiruhilekoa, hilabetea…', 'Cada cuánto tiempo suma el banco los intereses al capital: año, semestre, trimestre, mes…', 'المدة التي يضيف بعدها المصرف الفوائد إلى رأس المال: سنة أو نصف سنة أو ربع سنة أو شهر…', 'How often the bank adds the interest to the principal: every year, half-year, quarter, month…')
            }
        ],
        vocabulary: [
            say('urteko tasa', 'tipo anual', 'السعر السنوي', 'annual rate'),
            say('hilekoa', 'mensual', 'شهريًا', 'monthly'),
            say('seihilekoa', 'semestre', 'نصف سنة', 'half-year')
        ],
        examplePrompt: say('5000 €, % 8 interesarekin, 3 urtez, interesak seihilekoan gehituta. Zenbat diru egongo da?', '5000 € al 8 % durante 3 años, con intereses semestrales. ¿Cuánto dinero habrá?', '5000 € بسعر 8٪ مدة 3 سنوات مع فوائد نصف سنوية. كم سيكون المال؟', '€5,000 at 8% for 3 years, with interest added every half-year. How much money will there be?'),
        example: same('$5000\\cdot 1{,}04^{6}\\approx 6326{,}60$'),
        exampleAnswer: say('Seihileko bakoitzean % 4, eta 6 seihileko: $6326{,}60$ €.', 'Cada semestre, un 4 %, y son 6 semestres: $6326{,}60$ €.', 'كل نصف سنة 4٪، وهناك 6 أنصاف سنة: $6326{,}60$ €.', 'Each half-year, 4%, and there are 6 half-years: €$6326{,}60$.')
    },

    /* ---------- 5. Other arithmetic problems ---------- */
    mixtures: {
        explanation: say(
            'Nahasketa batean kostuak eta kantitateak batzen dira, ez prezioak: prezio ertaina = kostu osoa : kantitate osoa.',
            'En una mezcla se suman los costes y las cantidades, no los precios: precio medio = coste total : cantidad total.',
            'في الخليط نجمع الكلف والكميات لا الأسعار: السعر المتوسط = الكلفة الكلية : الكمية الكلية.',
            'In a mixture you add up the costs and the amounts, not the prices: average price = total cost ÷ total amount.'
        ),
        cases: [
            {
                title: say('Kafea', 'El café', 'القهوة', 'The coffee'),
                text: say(
                    '12 kg kafe, 12,40 €/kg; eta 8 kg, 7,40 €/kg. Guztira, 208 € eta 20 kg:',
                    '12 kg de café a 12,40 €/kg y 8 kg a 7,40 €/kg: 208 € en 20 kg.',
                    '12 كغ من القهوة بسعر 12.40 €/كغ و8 كغ بسعر 7.40 €/كغ: 208 € في 20 كغ.',
                    '12 kg of coffee at €12.40/kg and 8 kg at €7.40/kg: €208 for 20 kg.'
                ),
                math: same('$208\\mathbin{:}20=10{,}40$')
            },
            {
                title: say('Aleazioak', 'Aleaciones', 'السبائك', 'Alloys'),
                text: say(
                    'Legea metal preziatuaren pisua zati pisu osoa da. 2 kg urre, lege 0,85; eta 1,5 kg, lege 0,9:',
                    'La ley es el peso del metal precioso entre el peso total. 2 kg de oro de ley 0,85 y 1,5 kg de ley 0,9:',
                    'العيار هو وزن المعدن الثمين على الوزن الكلي. 2 كغ من الذهب بعيار 0.85 و1.5 كغ بعيار 0.9:',
                    'The fineness is the weight of precious metal divided by the total weight. 2 kg of gold of fineness 0.85 and 1.5 kg of fineness 0.9:'
                ),
                math: same('$\\frac{1{,}7+1{,}35}{3{,}5}\\approx 0{,}87$')
            },
            {
                title: say('Ura gehitzean', 'Al añadir agua', 'عند إضافة الماء', 'Adding water'),
                text: say(
                    'Ura doan da: kostua ez da aldatzen eta kantitatea handitzen da; beraz, prezio ertaina jaisten da.',
                    'El agua es gratis: el coste no cambia y la cantidad crece, así que el precio medio baja.',
                    'الماء مجاني: الكلفة لا تتغير والكمية تزيد، فينخفض السعر المتوسط.',
                    'Water is free: the cost stays the same and the amount grows, so the average price goes down.'
                )
            }
        ],
        definitions: [
            {
                term: say('Aleazio baten legea', 'Ley de una aleación', 'عيار السبيكة', 'Purity of an alloy'),
                meaning: say('Metal preziatuaren pisua zati pisu osoa: 0,85 legeak esan nahi du pisuaren % 85 urrea dela.', 'El peso del metal precioso entre el peso total: ley 0,85 quiere decir que el 85 % del peso es oro.', 'وزن المعدن الثمين على الوزن الكلي: العيار 0.85 يعني أن 85٪ من الوزن ذهب.', 'The weight of the precious metal divided by the total weight: purity 0.85 means 85% of the weight is gold.')
            }
        ],
        vocabulary: [
            say('nahasketa', 'mezcla', 'الخليط', 'mixture'),
            say('prezio ertaina', 'precio medio', 'السعر المتوسط', 'average price'),
            say('kostu osoa', 'coste total', 'الكلفة الكلية', 'total cost')
        ],
        examplePrompt: say('Kiloko $1{,}20$ euroko 30 kg irin eta kiloko 2 euroko 10 kg nahasten dira. Zenbat balio du kiloak?', 'Se mezclan 30 kg de harina a $1{,}20$ €/kg con 10 kg a 2 €/kg. ¿A cuánto sale el kilo?', 'نخلط 30 كغ من الطحين بسعر $1{,}20$ €/كغ مع 10 كغ بسعر 2 €/كغ. كم ثمن الكيلوغرام؟', '30 kg of flour at €$1{,}20$/kg are mixed with 10 kg at €2/kg. How much is a kilo?'),
        example: same('$\\frac{30\\cdot 1{,}20+10\\cdot 2}{40}=1{,}40$'),
        exampleAnswer: say('$1{,}40$ €/kg: gehien dagoen irinaren preziotik hurbilago.', '$1{,}40$ €/kg: más cerca del precio de la harina de la que hay más.', '$1{,}40$ €/كغ: أقرب إلى سعر الطحين الأكثر كمية.', '€$1{,}40$/kg: closer to the price of the flour there is more of.')
    },
    motion: {
        explanation: say(
            'Bi mugikari batera mugitzen badira, haien arteko distantzia elkartzeko abiaduran aldatzen da. Denbora = distantzia : elkartzeko abiadura.',
            'Si dos móviles se mueven a la vez, la distancia entre ellos cambia a la velocidad de acercamiento. Tiempo = distancia : velocidad de acercamiento.',
            'إذا تحرك جسمان معًا تتغير المسافة بينهما بسرعة الاقتراب. الزمن = المسافة : سرعة الاقتراب.',
            'If two vehicles move at the same time, the gap between them changes at the closing speed. Time = distance ÷ closing speed.'
        ),
        cases: [
            {
                title: say('Elkarrengana', 'Al encuentro', 'تلاقٍ', 'Towards each other'),
                text: say(
                    'Abiadurak batzen dira. A eta B 240 km-ra daude; kamioi bat A-tik, 70 km/h-ra, eta auto bat B-tik, 110 km/h-ra. Noiz elkartzen dira?',
                    'Las velocidades se suman. A y B distan 240 km; sale un camión de A a 70 km/h y un coche de B a 110 km/h. ¿Cuándo se cruzan?',
                    'تُجمع السرعتان. بين A وB مسافة 240 كم؛ تنطلق شاحنة من A بسرعة 70 كم/س وسيارة من B بسرعة 110 كم/س. متى تلتقيان؟',
                    'The speeds add up. A and B are 240 km apart; a lorry leaves A at 70 km/h and a car leaves B at 110 km/h. When do they meet?'
                ),
                math: same('$240\\mathbin{:}(70+110)=\\frac{4}{3}$')
            },
            {
                title: say('Atzetik', 'Persecución', 'مطاردة', 'A chase'),
                text: say(
                    'Abiadurak kentzen dira. Auto bat, 120 km/h-ra, kamioi baten atzetik doa; kamioia 90 km/h-ra doa, 75 km aurrerago:',
                    'Las velocidades se restan. Un coche a 120 km/h sigue a un camión a 90 km/h que va 75 km por delante:',
                    'تُطرح السرعتان. سيارة بسرعة 120 كم/س تلاحق شاحنة بسرعة 90 كم/س تتقدمها 75 كم:',
                    'The speeds are subtracted. A car at 120 km/h chases a lorry at 90 km/h that is 75 km ahead:'
                ),
                math: same('$75\\mathbin{:}(120-90)=2{,}5$')
            },
            {
                title: say('Unitateak', 'Las unidades', 'الوحدات', 'Units'),
                text: say(
                    'km/h erabiliz, denbora ordutan ateratzen da: 12 min = 0,2 h, eta $\\frac{4}{3}$ h = 1 h 20 min.',
                    'Con km/h, el tiempo sale en horas: 12 min = 0,2 h, y $\\frac{4}{3}$ h = 1 h 20 min.',
                    'مع كم/س يخرج الزمن بالساعات: 12 د = 0.2 س، و$\\frac{4}{3}$ س = 1 س 20 د.',
                    'With km/h, the time comes out in hours: 12 min = 0.2 h, and $\\frac{4}{3}$ h = 1 h 20 min.'
                )
            }
        ],
        vocabulary: [
            say('abiadura', 'velocidad', 'السرعة', 'speed'),
            say('elkartzeko abiadura', 'velocidad de acercamiento', 'سرعة الاقتراب', 'closing speed'),
            say('distantzia', 'distancia', 'المسافة', 'distance')
        ],
        why: {
            text: say(
                'Ordu bakoitzean, kamioia 70 km hurbiltzen da autora eta autoa 110 km kamioira: haien arteko distantzia 180 km gutxitzen da. Atzetik doanean, aurrekoak ihes egiten du: aldea bakarrik murrizten da.',
                'En cada hora, el camión se acerca 70 km al coche y el coche 110 km al camión: la distancia entre ellos baja 180 km. En una persecución, el de delante se escapa: solo se recorta la diferencia.',
                'في كل ساعة تقترب الشاحنة 70 كم من السيارة والسيارة 110 كم من الشاحنة: تنقص المسافة بينهما 180 كم. وفي المطاردة يبتعد الذي في الأمام: لا يُقلَّص إلا الفرق.',
                'Each hour, the lorry gets 70 km closer to the car and the car 110 km closer to the lorry: the distance between them drops by 180 km. In a chase, the one in front gets away: only the difference is closed.'
            ),
            math: same('$240\\div 180=\\frac{4}{3}$')
        },
        examplePrompt: say('Bi hiri 300 km-ra daude. Aldi berean irteten dira tren bat 80 km/h-ra eta beste bat 120 km/h-ra, bata bestearengana. Noiz gurutzatzen dira?', 'Dos ciudades están a 300 km. Salen a la vez un tren a 80 km/h y otro a 120 km/h, uno hacia el otro. ¿Cuándo se cruzan?', 'مدينتان المسافة بينهما 300 كم. ينطلق في الوقت نفسه قطار بسرعة 80 كم/س وآخر بسرعة 120 كم/س، كل منهما نحو الآخر. متى يلتقيان؟', 'Two cities are 300 km apart. A train at 80 km/h and another at 120 km/h set off at the same time towards each other. When do they meet?'),
        example: same('$300\\div(80+120)=1{,}5$'),
        exampleAnswer: say('Elkarrengana doaz: abiadurak batzen dira. Ordu eta erdi.', 'Van al encuentro: las velocidades se suman. Hora y media.', 'يتلاقيان: تُجمع السرعتان. ساعة ونصف.', 'They move towards each other: the speeds add up. An hour and a half.')
    },
    taps: {
        explanation: say(
            'Txorrota batek biltegia 5 ordutan betetzen badu, ordu batean $\\frac{1}{5}$ betetzen du. Txorrota batzuekin, ordu bateko zatiak batzen dira; denbora osoa batura horren alderantzizkoa da.',
            'Si un grifo llena un depósito en 5 horas, en una hora llena $\\frac{1}{5}$. Con varios grifos se suman las partes de una hora; el tiempo total es el inverso de esa suma.',
            'إذا ملأ صنبور خزانًا في 5 ساعات فإنه يملأ $\\frac{1}{5}$ في ساعة. ومع عدة صنابير نجمع أجزاء الساعة، والزمن الكلي مقلوب هذا المجموع.',
            'If a tap fills a tank in 5 hours, in one hour it fills $\\frac{1}{5}$. With several taps you add the parts of an hour; the total time is the reciprocal of that sum.'
        ),
        cases: [
            {
                title: say('Bi txorrota', 'Dos grifos', 'صنبوران', 'Two taps'),
                text: say(
                    'A: 5 h; B: 7 h. Biek batera orduko $\\frac{12}{35}$ betetzen dute, eta $\\frac{35}{12}$ h behar dituzte, hau da, 2 h 55 min.',
                    'A en 5 h y B en 7 h: juntos llenan $\\frac{12}{35}$ cada hora, y tardan $\\frac{35}{12}$ h, es decir, 2 h 55 min.',
                    'A في 5 س وB في 7 س: معًا يملآن $\\frac{12}{35}$ كل ساعة، ويحتاجان $\\frac{35}{12}$ س، أي 2 س 55 د.',
                    'A in 5 h and B in 7 h: together they fill $\\frac{12}{35}$ an hour, so they take $\\frac{35}{12}$ h, that is 2 h 55 min.'
                ),
                math: same('$\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$')
            },
            {
                title: say('Hustubidearekin', 'Con desagüe', 'مع مصرف', 'With a drain'),
                text: say(
                    'Hustubideak kendu egiten du. Ur hotza: 6 min; beroa: 10 min; hustubidea: 3 min. Bainuontzia ez da inoiz betetzen.',
                    'El desagüe resta. Fría, 6 min; caliente, 10 min; desagüe, 3 min: la bañera no se llena nunca.',
                    'المصرف يطرح. البارد 6 د، والساخن 10 د، والمصرف 3 د: لا يمتلئ الحوض أبدًا.',
                    'The drain subtracts. Cold 6 min, hot 10 min and drain 3 min: the bath never fills.'
                ),
                math: same('$\\frac{1}{6}+\\frac{1}{10}-\\frac{1}{3}<0$')
            },
            {
                title: say('Atzera', 'Hacia atrás', 'إلى الوراء', 'Backwards'),
                text: say(
                    'Biek batera, 2 h; lehenak bakarrik, 3 h. Bigarrenak bakarrik 6 h behar ditu:',
                    'Los dos juntos, 2 h; el primero solo, 3 h. El segundo solo tarda 6 h:',
                    'معًا ساعتان، والأول وحده 3 س. والثاني وحده يحتاج 6 س:',
                    'Both together, 2 h; the first on its own, 3 h. The second on its own takes 6 h:'
                ),
                math: same('$\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}$')
            }
        ],
        vocabulary: [
            say('txorrota', 'grifo', 'صنبور', 'tap'),
            say('hustubidea', 'desagüe', 'مصرف', 'drain'),
            say('alderantzizkoa', 'inverso', 'مقلوب', 'reciprocal')
        ],
        examplePrompt: say('Margolari batek 6 egunean margotzen du etxe bat, eta beste batek 3 egunean. Zenbat behar dute biek batera?', 'Un pintor tarda 6 días en pintar una casa y otro, 3 días. ¿Cuánto tardan juntos?', 'يدهن رسام بيتًا في 6 أيام ويدهنه آخر في 3 أيام. كم يحتاجان معًا؟', 'One painter takes 6 days to paint a house and another takes 3 days. How long do they take together?'),
        example: same('$\\frac{1}{6}+\\frac{1}{3}=\\frac{1}{2}$'),
        exampleAnswer: say('Egun batean etxearen erdia: 2 egun.', 'En un día, media casa: 2 días.', 'في يوم واحد نصف البيت: يومان.', 'Half the house in one day: 2 days.')
    }
}

import type { LessonMistake, LessonStep, LocalizedText } from '../../features/unit-v2/types.ts'

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

export interface LessonTexts {
    explanation: LocalizedText
    cases: LessonStep[]
    mistake: LessonMistake
}

/** In Basque and Spanish a number never breaks from its sign: 3,60 €, 25 %, % 25, and $r$ % after a formula */
const glue = (text: string) => text.split(/(\$[^$]*\$)/).map((part) => (part.startsWith('$') ? part : part.replace(/(\d) ([€%])/g, '$1\u00a0$2').replace(/% (?=\d)|% $/g, '%\u00a0').replace(/^ ([€%])/, '\u00a0$1'))).join('')
/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu: glue(eu), es: glue(es), en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const proportionDbh4ApLessonTexts: Record<string, LessonTexts> = {
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
        mistake: {
            wrong: say(
                'Abiadura igotzean kontsumoa ere igotzen da; beraz, zuzenki proportzionalak dira.',
                'Al subir la velocidad sube el consumo, así que son directamente proporcionales.',
                'إذا زادت السرعة زاد الاستهلاك، إذن هما متناسبان طرديًا.',
                'When the speed goes up, the fuel use goes up, so they are directly proportional.'
            ),
            right: say(
                'Batera haztea ez da nahikoa: zatidurak berdina izan beharko luke, eta $\\frac{7}{90}\\neq\\frac{12}{120}$.',
                'Crecer a la vez no basta: el cociente tendría que ser el mismo, y $\\frac{7}{90}\\neq\\frac{12}{120}$.',
                'لا يكفي أن يزيدا معًا: يجب أن يكون حاصل القسمة نفسه، و$\\frac{7}{90}\\neq\\frac{12}{120}$.',
                'Growing together is not enough: the quotient would have to be the same, and $\\frac{7}{90}\\neq\\frac{12}{120}$.'
            )
        }
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
        mistake: {
            wrong: say(
                '0,75 l oliok 3,60 € balio badu, litro batek $3{,}60\\cdot 0{,}75=2{,}70$ € balio du.',
                'Si 0,75 l cuestan 3,60 €, un litro cuesta $3{,}60\\cdot 0{,}75=2{,}70$ €.',
                'إذا كان ثمن 0.75 ل هو 3.60 €، فثمن اللتر $3{,}60\\cdot 0{,}75=2{,}70$ €.',
                'If 0.75 l costs €3.60, one litre costs €$3{,}60\\cdot 0{,}75=2{,}70$.'
            ),
            right: say(
                'Litro bat 0,75 l baino gehiago da; beraz, garestiagoa izan behar du: $3{,}60\\mathbin{:}0{,}75=4{,}80$ €.',
                'Un litro es más que 0,75 l, así que tiene que costar más: $3{,}60\\mathbin{:}0{,}75=4{,}80$ €.',
                'اللتر أكثر من 0.75 ل، فيجب أن يكون ثمنه أكبر: $3{,}60\\mathbin{:}0{,}75=4{,}80$ €.',
                'One litre is more than 0.75 l, so it must cost more: €$3{,}60\\mathbin{:}0{,}75=4{,}80$.'
            )
        }
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
                    'Grass for 35 cows for 60 days: 2100 “cow-days” in all. With 20 cows:'
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
        mistake: {
            wrong: say(
                '35 behiren ordez 20 behirekin, bazkak $\\frac{60\\cdot 20}{35}\\approx 34$ egun irauten du.',
                'Con 20 vacas en lugar de 35, el pasto dura $\\frac{60\\cdot 20}{35}\\approx 34$ días.',
                'مع 20 بقرة بدل 35 يكفي العلف $\\frac{60\\cdot 20}{35}\\approx 34$ يومًا.',
                'With 20 cows instead of 35, the grass lasts $\\frac{60\\cdot 20}{35}\\approx 34$ days.'
            ),
            right: say(
                'Behi gutxiago → egun gehiago: alderantzizkoa da, eta biderkadura ez da aldatzen: $\\frac{35\\cdot 60}{20}=105$ egun.',
                'Menos vacas → más días: es inversa, y el producto no cambia: $\\frac{35\\cdot 60}{20}=105$ días.',
                'بقر أقل ← أيام أكثر: التناسب عكسي، وحاصل الضرب لا يتغير: $\\frac{35\\cdot 60}{20}=105$ يومًا.',
                'Fewer cows → more days: it is inverse, and the product does not change: $\\frac{35\\cdot 60}{20}=105$ days.'
            )
        }
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
        mistake: {
            wrong: say(
                '3 margolariren ordez 5 margolarirekin: $10\\cdot\\frac{3}{5}=6$ egun.',
                'Con 5 pintores en vez de 3: $10\\cdot\\frac{3}{5}=6$ días.',
                'مع 5 دهّانين بدل 3: $10\\cdot\\frac{3}{5}=6$ أيام.',
                'With 5 painters instead of 3: $10\\cdot\\frac{3}{5}=6$ days.'
            ),
            right: say(
                'Eguneko orduak ere aldatzen dira, eta aldaketa bakoitzak bere zatikia du: $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$ egun.',
                'También cambian las horas al día, y cada cambio pone su fracción: $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$ días.',
                'تتغير أيضًا الساعات اليومية، ولكل تغيّر كسره: $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$ أيام.',
                'The hours a day change too, and each change brings its own fraction: $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$ days.'
            )
        }
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
        mistake: {
            wrong: say(
                'Ameliak 60 egun daramatza etxean, eta $62{,}40\\mathbin{:}120=0{,}52$ € ordaintzen ditu.',
                'Amelia lleva 60 días en el piso y paga $62{,}40\\mathbin{:}120=0{,}52$ €.',
                'أمضت أميليا 60 يومًا في الشقة وتدفع $62{,}40\\mathbin{:}120=0{,}52$ €.',
                'Amelia has lived in the flat for 60 days and pays €$62{,}40\\mathbin{:}120=0{,}52$.'
            ),
            right: say(
                'Hori egun baten balioa da, eta Ameliak 60 egun daramatza: $60\\cdot 0{,}52=31{,}20$ €.',
                'Eso es lo que vale un día, y Amelia lleva 60: $60\\cdot 0{,}52=31{,}20$ €.',
                'هذه قيمة يوم واحد، وأميليا أمضت 60 يومًا: $60\\cdot 0{,}52=31{,}20$ €.',
                'That is what one day is worth, and Amelia has been there for 60 days: €$60\\cdot 0{,}52=31{,}20$.'
            )
        }
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
                    'Banatu 660 alderantziz; zenbakiak: 1, 2 eta 3. Alderantzizkoen batura $\\frac{11}{6}$ da. Zatiak: 360, 180 eta 120.',
                    'Repartir 660 inversamente a 1, 2 y 3: la suma de los inversos es $\\frac{11}{6}$. Las partes son 360, 180 y 120.',
                    'توزيع 660 عكسيًا على 1 و2 و3: مجموع المقلوبات $\\frac{11}{6}$. الأجزاء 360 و180 و120.',
                    'Share 660 inversely in proportion to 1, 2 and 3: the reciprocals add up to $\\frac{11}{6}$. The shares are 360, 180 and 120.'
                ),
                math: same('$660\\mathbin{:}\\frac{11}{6}=360$')
            },
            {
                title: say('Izendatzaile berarekin', 'Con el mismo denominador', 'بالمقام نفسه', 'With a common denominator'),
                text: say(
                    '$\\frac{6}{6}$, $\\frac{3}{6}$ eta $\\frac{2}{6}$: banatu zuzenki; zenbakiak: 6, 3 eta 2.',
                    '$\\frac{6}{6}$, $\\frac{3}{6}$ y $\\frac{2}{6}$: reparte directamente a 6, 3 y 2.',
                    '$\\frac{6}{6}$ و$\\frac{3}{6}$ و$\\frac{2}{6}$: وزّع طرديًا على 6 و3 و2.',
                    '$\\frac{6}{6}$, $\\frac{3}{6}$ and $\\frac{2}{6}$: share directly in proportion to 6, 3 and 2.'
                ),
                math: same('$660\\mathbin{:}11=60$')
            }
        ],
        mistake: {
            wrong: say(
                'Banatu 660 alderantziz; zenbakiak: 1, 2 eta 3. $660\\mathbin{:}6=110$, eta zatiak: 110, 220 eta 330.',
                'Repartir 660 inversamente a 1, 2 y 3: $660\\mathbin{:}6=110$, y las partes son 110, 220 y 330.',
                'توزيع 660 عكسيًا على 1 و2 و3: $660\\mathbin{:}6=110$، والأجزاء 110 و220 و330.',
                'Share 660 inversely in proportion to 1, 2 and 3: $660\\mathbin{:}6=110$, so the shares are 110, 220 and 330.'
            ),
            right: say(
                'Hori banaketa zuzena da: 3 zenbakiari zati handiena. Alderantzizkoan, alderantziz: 360, 180 eta 120.',
                'Ese es el reparto directo: al 3 le toca la parte mayor. En el inverso es al revés: 360, 180 y 120.',
                'هذا هو التوزيع الطردي: العدد 3 يأخذ الجزء الأكبر. وفي العكسي العكس: 360 و180 و120.',
                'That is the direct share: 3 gets the largest share. In the inverse share it is the other way round: 360, 180 and 120.'
            )
        }
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
                    'الجزء على العشري: 24000 مشجع هم 80٪ من سعة الملعب.',
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
                    'Part divided by whole, times 100. Elena has spent €750 of €5000:'
                ),
                math: same('$750\\mathbin{:}5000\\cdot 100=15$')
            }
        ],
        mistake: {
            wrong: say(
                '24\u00a0000 zale osoaren % 80 dira: $24\\,000\\cdot 0{,}8=19\\,200$.',
                '24\u00a0000 aficionados son el 80 % del total: $24\\,000\\cdot 0{,}8=19\\,200$.',
                '24000 مشجع هم 80٪ من الكل: $24\\,000\\cdot 0{,}8=19\\,200$.',
                '24,000 fans are 80% of the whole: $24\\,000\\cdot 0{,}8=19\\,200$.'
            ),
            right: say(
                'Osoak bere % 80 baino handiagoa izan behar du: zatitu egiten da, $24\\,000\\mathbin{:}0{,}8=30\\,000$.',
                'El total tiene que ser mayor que su 80 %: se divide, $24\\,000\\mathbin{:}0{,}8=30\\,000$.',
                'يجب أن يكون الكل أكبر من 80٪ منه: نقسم، $24\\,000\\mathbin{:}0{,}8=30\\,000$.',
                'The whole must be bigger than 80% of it: you divide, $24\\,000\\mathbin{:}0{,}8=30\\,000$.'
            )
        }
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
                    '% $p$ igotzean, $1+\\frac{p}{100}$ (BEZa, % 21 → 1,21). % $p$ jaistean, $1-\\frac{p}{100}$ (beherapena, % 25 → 0,75).',
                    'Subir un $p$ %: $1+\\frac{p}{100}$ (IVA del 21 % → 1,21). Bajar un $p$ %: $1-\\frac{p}{100}$ (rebaja del 25 % → 0,75).',
                    'زيادة $p$٪: $1+\\frac{p}{100}$ (ضريبة 21٪ ← 1.21). نقصان $p$٪: $1-\\frac{p}{100}$ (تخفيض 25٪ ← 0.75).',
                    'Increase by $p$%: $1+\\frac{p}{100}$ (21% VAT → 1.21). Decrease by $p$%: $1-\\frac{p}{100}$ (25% off → 0.75).'
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
        mistake: {
            wrong: say(
                '% 21 BEZa kentzeko, % 21 jaisten da: $143{,}99\\cdot 0{,}79\\approx 113{,}75$ €.',
                'Para quitar el IVA del 21 %, se rebaja un 21 %: $143{,}99\\cdot 0{,}79\\approx 113{,}75$ €.',
                'لإزالة ضريبة 21٪ نخفّض 21٪: $143{,}99\\cdot 0{,}79\\approx 113{,}75$ €.',
                'To take off 21% VAT, you take off 21%: €$143{,}99\\cdot 0{,}79\\approx 113{,}75$.'
            ),
            right: say(
                '% 21 hori BEZik gabeko prezioari aplikatu zitzaion, ez faktura osoari: zatitu egiten da, $143{,}99\\mathbin{:}1{,}21=119$ €.',
                'El 21 % se calculó sobre el precio sin IVA, no sobre la factura: se divide, $143{,}99\\mathbin{:}1{,}21=119$ €.',
                'حُسبت الـ21٪ على السعر دون ضريبة لا على الفاتورة: نقسم، $143{,}99\\mathbin{:}1{,}21=119$ €.',
                'The 21% was worked out on the price without VAT, not on the bill: you divide, €$143{,}99\\mathbin{:}1{,}21=119$.'
            )
        }
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
                    'بلدة فيها 25000 نسمة تنمو 18٪ ثم 25٪:',
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
        mistake: {
            wrong: say(
                'Saltzaile batek % 40 igo, eta gero % 40 jaisten du: $40-40=0$, prezioa berdin geratzen da.',
                'Un comerciante sube un 40 % y luego rebaja un 40 %: $40-40=0$, el precio queda igual.',
                'يرفع تاجر السعر 40٪ ثم يخفّضه 40٪: $40-40=0$، فيبقى السعر كما هو.',
                'A shopkeeper puts prices up by 40% and then down by 40%: $40-40=0$, so the price stays the same.'
            ),
            right: say(
                'Beherapena igotako prezioari aplikatzen zaio: $1{,}4\\cdot 0{,}6=0{,}84$, hasieran baino % 16 gutxiago.',
                'La rebaja se aplica al precio ya subido: $1{,}4\\cdot 0{,}6=0{,}84$, un 16 % menos que al principio.',
                'يُطبَّق التخفيض على السعر بعد رفعه: $1{,}4\\cdot 0{,}6=0{,}84$، أي أقل بـ16٪ من البداية.',
                'The cut is applied to the raised price: $1{,}4\\cdot 0{,}6=0{,}84$, 16% less than at the start.'
            )
        }
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
                    'A month is $\\frac{1}{12}$ of a year: divide by $100\\cdot 12=1200$. €1000 at 4% for 4 months:'
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
        mistake: {
            wrong: say(
                'Kapitala 1000 €, tasa % 4, 4 hilabete: $\\frac{1000\\cdot 4\\cdot 4}{100}=160$ €.',
                '1000 € al 4 % durante 4 meses: $\\frac{1000\\cdot 4\\cdot 4}{100}=160$ €.',
                '1000 € بنسبة 4٪ مدة 4 أشهر: $\\frac{1000\\cdot 4\\cdot 4}{100}=160$ €.',
                '€1000 at 4% for 4 months: €$\\frac{1000\\cdot 4\\cdot 4}{100}=160$.'
            ),
            right: say(
                'Horrela hilabeteak urte balira bezala hartzen dira, eta 12 aldiz gehiago ateratzen da. Hilabeteekin, zatitzailea 1200 da: $\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$ €.',
                'Así se toman los meses como si fueran años, y sale 12 veces más. Con meses se divide entre 1200: $\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$ €.',
                'هكذا تُحسب الأشهر كأنها سنوات، فيخرج 12 ضعفًا. بالأشهر نقسم على 1200: $\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$ €.',
                'That treats the months as years, and gives 12 times as much. With months, divide by 1200: €$\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$.'
            )
        }
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
                    '€1000 at 10%: simple interest gives 1100, 1200, 1300; compound gives 1100, 1210, 1331.'
                ),
                math: same('$1000\\cdot 1{,}1^{3}=1331$')
            },
            {
                title: say('Formula', 'La fórmula', 'الصيغة', 'The formula'),
                text: say(
                    '$t$ urtetan, $t$ aldiz indizea. Kapitala 5600 €, tasa % 3,8, 10 urte:',
                    'En $t$ años, $t$ veces el índice. 5600 € al 3,8 % durante 10 años:',
                    'في $t$ سنوات نضرب في المؤشر $t$ مرات. 5600 € بنسبة 3.8٪ مدة 10 سنوات:',
                    'In $t$ years, the multiplier $t$ times. €5600 at 3.8% for 10 years:'
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
        mistake: {
            wrong: say(
                'Kapitala 1000 €, tasa % 10, 3 urte, interes konposatuan: $1000+3\\cdot 100=1300$ €.',
                '1000 € al 10 % durante 3 años, a interés compuesto: $1000+3\\cdot 100=1300$ €.',
                '1000 € بنسبة 10٪ مدة 3 سنوات بفائدة مركّبة: $1000+3\\cdot 100=1300$ €.',
                '€1000 at 10% for 3 years with compound interest: €$1000+3\\cdot 100=1300$.'
            ),
            right: say(
                'Hori interes bakuna da. Konposatuan, urtero indizeaz biderkatzen da: $1000\\cdot 1{,}1^{3}=1331$ €.',
                'Eso es interés simple. En compuesto, cada año se multiplica por el índice: $1000\\cdot 1{,}1^{3}=1331$ €.',
                'هذه فائدة بسيطة. في المركّبة نضرب كل سنة في المؤشر: $1000\\cdot 1{,}1^{3}=1331$ €.',
                'That is simple interest. With compound interest, you multiply by the multiplier each year: €$1000\\cdot 1{,}1^{3}=1331$.'
            )
        }
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
                text: say('Kapitala 24\u00a0000 €, tasa % 4,8, 5 urte:', '24\u00a0000 € al 4,8 % durante 5 años:', '24000 € بنسبة 4.8٪ مدة 5 سنوات:', '€24,000 at 4.8% for 5 years:'),
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
        mistake: {
            wrong: say(
                'Hilekoa, tasa % 4,8: hilabete bakoitzean % 4,8, $24\\,000\\cdot 1{,}048^{60}$.',
                'Mensual al 4,8 %: cada mes un 4,8 %, $24\\,000\\cdot 1{,}048^{60}$.',
                'شهريًا بنسبة 4.8٪: كل شهر 4.8٪، $24\\,000\\cdot 1{,}048^{60}$.',
                'Monthly at 4.8%: 4.8% every month, $24\\,000\\cdot 1{,}048^{60}$.'
            ),
            right: say(
                '% 4,8 hori urtekoa da: hilero, % $4{,}8\\mathbin{:}12=0{,}4$, eta indizea $1{,}004$ da.',
                'El 4,8 % es anual: cada mes, $4{,}8\\mathbin{:}12=0{,}4$ %, y el índice es $1{,}004$.',
                'الـ4.8٪ سنوية: كل شهر $4{,}8\\mathbin{:}12=0{,}4$٪، والمؤشر $1{,}004$.',
                'The 4.8% is per year: each month, $4{,}8\\mathbin{:}12=0{,}4$%, so the multiplier is $1{,}004$.'
            )
        }
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
        mistake: {
            wrong: say(
                'Kafearen prezio ertaina $\\frac{12{,}40+7{,}40}{2}=9{,}90$ €/kg da.',
                'El precio medio del café es $\\frac{12{,}40+7{,}40}{2}=9{,}90$ €/kg.',
                'السعر المتوسط للقهوة $\\frac{12{,}40+7{,}40}{2}=9{,}90$ €/كغ.',
                'The average price of the coffee is €$\\frac{12{,}40+7{,}40}{2}=9{,}90$/kg.'
            ),
            right: say(
                'Garestiaren kilo gehiago daude: kostu osoa zatitzen da kilo guztien artean, $208\\mathbin{:}20=10{,}40$ €/kg.',
                'Hay más kilos del caro: se divide el coste total entre todos los kilos, $208\\mathbin{:}20=10{,}40$ €/kg.',
                'الكيلوغرامات من الغالي أكثر: نقسم الكلفة الكلية على كل الكيلوغرامات، $208\\mathbin{:}20=10{,}40$ €/كغ.',
                'There are more kilos of the dearer one: divide the total cost by all the kilos, €$208\\mathbin{:}20=10{,}40$/kg.'
            )
        }
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
                    'Abiadurak batzen dira. A eta B 240 km-ra daude; kamioi bat A-tik, 70 km/h-ra, eta auto bat B-tik, 110 km/h-ra. Ordubete eta 20 minutu geroago elkartzen dira:',
                    'Las velocidades se suman. A y B distan 240 km; sale un camión de A a 70 km/h y un coche de B a 110 km/h. Se cruzan al cabo de 1 h 20 min:',
                    'تُجمع السرعتان. بين A وB مسافة 240 كم؛ تنطلق شاحنة من A بسرعة 70 كم/س وسيارة من B بسرعة 110 كم/س. تلتقيان بعد ساعة و20 دقيقة:',
                    'The speeds add up. A and B are 240 km apart; a lorry leaves A at 70 km/h and a car leaves B at 110 km/h. They meet after 1 h 20 min:'
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
        mistake: {
            wrong: say(
                'Elkarrengana, kamioia 70 km/h-ra eta autoa 110 km/h-ra: $240\\mathbin{:}(110-70)=6$ h.',
                'Al encuentro, el camión a 70 km/h y el coche a 110 km/h: $240\\mathbin{:}(110-70)=6$ h.',
                'في التلاقي، الشاحنة بسرعة 70 كم/س والسيارة بسرعة 110 كم/س: $240\\mathbin{:}(110-70)=6$ س.',
                'Towards each other, the lorry at 70 km/h and the car at 110 km/h: $240\\mathbin{:}(110-70)=6$ h.'
            ),
            right: say(
                'Elkarrengana badoaz, $70+110=180$ km/h-ra hurbiltzen dira: $240\\mathbin{:}180=\\frac{4}{3}$ h.',
                'Si van uno hacia el otro, se acercan a $70+110=180$ km/h: $240\\mathbin{:}180=\\frac{4}{3}$ h.',
                'إذا اتجه كل منهما نحو الآخر يقتربان بسرعة $70+110=180$ كم/س: $240\\mathbin{:}180=\\frac{4}{3}$ س.',
                'If they head towards each other, they close in at $70+110=180$ km/h: $240\\mathbin{:}180=\\frac{4}{3}$ h.'
            )
        }
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
                    'Hustubideak kendu egiten du. Ur hotza: 8 min; beroa: 12 min; hustubidea: 4 min. Bainuontzia ez da inoiz betetzen.',
                    'El desagüe resta. Fría, 8 min; caliente, 12 min; desagüe, 4 min: la bañera no se llena nunca.',
                    'المصرف يطرح. البارد 8 د، والساخن 12 د، والمصرف 4 د: لا يمتلئ الحوض أبدًا.',
                    'The drain subtracts. Cold 8 min, hot 12 min and drain 4 min: the bath never fills.'
                ),
                math: same('$\\frac{1}{8}+\\frac{1}{12}-\\frac{1}{4}<0$')
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
        mistake: {
            wrong: say(
                'A: 5 h; B: 7 h. Biek batera $5+7=12$ h behar dituzte.',
                'A en 5 h y B en 7 h: los dos juntos tardan $5+7=12$ h.',
                'A في 5 س وB في 7 س: معًا يحتاجان $5+7=12$ س.',
                'A in 5 h and B in 7 h: together they take $5+7=12$ h.'
            ),
            right: say(
                'Batera, bakoitzak bakarrik baino gutxiago behar dute. Ordu bateko zatiak batzen dira: $\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$, eta denbora $\\frac{35}{12}$ h da.',
                'Juntos tardan menos que cada uno solo. Se suman las partes de una hora: $\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$, y el tiempo es $\\frac{35}{12}$ h.',
                'معًا يحتاجان أقل من كل واحد وحده. نجمع أجزاء الساعة: $\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$، والزمن $\\frac{35}{12}$ س.',
                'Together they take less time than either on its own. Add the parts of an hour: $\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$, so the time is $\\frac{35}{12}$ h.'
            )
        }
    }
}

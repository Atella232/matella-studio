import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { ProportionTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Proportzionaltasuna · 2. DBH — what each lesson tells: the new words
   (definitions), a short explanation and the example as an exercise
   («Another example»). Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The explanation keeps the numbers
   its drawing shows (the bricklayers, the feed, 180 shared among 2, 5 and
   8, the apartment); the worked examples that used to be in the middle of
   the explanation (the sprinklers, the skirt, the jacket) are now the
   example. Percentages as in the lessons: «% 12», «12 %», «12%», «12٪»,
   with a non-breaking space; English prices «€7.50».
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

/** As in lessons.tsx, the Arabic formulas get a decimal point */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const proportionLessonTexts: Record<ProportionTopicId, LessonTexts> = {
    /* ---------- 1. Simple proportion ---------- */
    'proportion-review': {
        vocabulary: [
            say('laugarren proportzionala', 'cuarto proporcional', 'الرابع المتناسب', 'fourth proportional'),
            say('biderkadura gurutzatuak', 'productos cruzados', 'الضرب التبادلي', 'cross-multiplying'),
            say('magnitudea', 'magnitud', 'المقدار', 'kind of quantity')
        ],
        definitions: [
            {
                term: say('Arrazoia', 'Razón', 'النسبة', 'Ratio'),
                meaning: say('Bi kantitateren zatidura, $\\frac{a}{b}$.', 'El cociente de dos cantidades, $\\frac{a}{b}$.', 'حاصل قسمة كميتين $\\frac{a}{b}$.', 'The quotient of two quantities, $\\frac{a}{b}$.')
            },
            {
                term: say('Proportzioa', 'Proporción', 'التناسب', 'Proportion'),
                meaning: say(
                    'Bi arrazoiren berdintasuna, $\\frac{a}{b}=\\frac{c}{d}$. Muturren biderkadura erdikoena da: $a\\cdot d=b\\cdot c$.',
                    'La igualdad de dos razones, $\\frac{a}{b}=\\frac{c}{d}$. El producto de extremos es igual al de medios: $a\\cdot d=b\\cdot c$.',
                    'تساوي نسبتين $\\frac{a}{b}=\\frac{c}{d}$. وحاصل ضرب الطرفين يساوي حاصل ضرب الوسطين: $a\\cdot d=b\\cdot c$.',
                    'The equality of two ratios, $\\frac{a}{b}=\\frac{c}{d}$. The product of the extremes equals that of the means: $a\\cdot d=b\\cdot c$.'
                )
            }
        ],
        why: {
            text: say(
                '$\\frac{a}{b}=\\frac{c}{d}$ bada, idatzi bi arrazoiak izendatzaile berarekin, $b\\cdot d$: $\\frac{a\\cdot d}{b\\cdot d}$ eta $\\frac{b\\cdot c}{b\\cdot d}$ geratzen dira. Berdinak direnez, zenbakitzaileak ere bai: $a\\cdot d=b\\cdot c$.',
                'Si $\\frac{a}{b}=\\frac{c}{d}$, escribe las dos razones con el mismo denominador, $b\\cdot d$: quedan $\\frac{a\\cdot d}{b\\cdot d}$ y $\\frac{b\\cdot c}{b\\cdot d}$. Como son iguales, sus numeradores también: $a\\cdot d=b\\cdot c$.',
                'إذا كان $\\frac{a}{b}=\\frac{c}{d}$ فاكتب النسبتين بالمقام نفسه $b\\cdot d$: نحصل على $\\frac{a\\cdot d}{b\\cdot d}$ و$\\frac{b\\cdot c}{b\\cdot d}$. وبما أنهما متساويتان فالبسطان متساويان أيضًا: $a\\cdot d=b\\cdot c$.',
                'If $\\frac{a}{b}=\\frac{c}{d}$, write both ratios with the same denominator, $b\\cdot d$: you get $\\frac{a\\cdot d}{b\\cdot d}$ and $\\frac{b\\cdot c}{b\\cdot d}$. As they are equal, so are their numerators: $a\\cdot d=b\\cdot c$.'
            ),
            math: same('$\\begin{gathered}\\frac{2}{3}=\\frac{4}{6}\\\\2\\cdot 6=3\\cdot 4=12\\end{gathered}$')
        },
        explanation: say(
            'Proportzio baten hiru gai ezagutzen badira, laugarrena kalkula daiteke, laugarren proportzionala, biderkadura gurutzatuekin. Magnitude bereko kantitateen arteko arrazoiak ez du unitaterik; magnitude desberdinen artekoak, bai: 120 km 2 orduan $60$ km/h dira.',
            'Si se conocen tres términos de una proporción, se calcula el cuarto, el cuarto proporcional, con los productos cruzados. Una razón entre cantidades de la misma magnitud no lleva unidades; entre magnitudes distintas, sí: 120 km en 2 horas son $60$ km/h.',
            'إذا عُرفت ثلاثة حدود من تناسب حُسب الرابع، أي الرابع المتناسب، بالضرب التبادلي. والنسبة بين كميتين من المقدار نفسه بلا وحدة، أما بين مقدارين مختلفين فلها وحدة: 120 كم في ساعتين تساوي $60$ كم/س.',
            'If three terms of a proportion are known, you can work out the fourth, the fourth proportional, by cross-multiplying. A ratio between quantities of the same kind has no units; between different kinds it does: 120 km in 2 hours is $60$ km/h.'
        ),
        examplePrompt: say('Kalkulatu $x$ proportzio honetan: $\\frac{6}{x}=\\frac{9}{15}$.', 'Calcula $x$ en la proporción $\\frac{6}{x}=\\frac{9}{15}$.', 'احسب $x$ في التناسب $\\frac{6}{x}=\\frac{9}{15}$.', 'Work out $x$ in the proportion $\\frac{6}{x}=\\frac{9}{15}$.'),
        example: same('$\\begin{gathered}9\\cdot x=6\\cdot 15=90\\\\x=90\\mathbin{:}9=10\\end{gathered}$'),
        exampleAnswer: say('$x=10$. Egiaztatu: $\\frac{6}{10}=\\frac{9}{15}=0{,}6$.', '$x=10$. Comprueba: $\\frac{6}{10}=\\frac{9}{15}=0{,}6$.', '$x=10$. تحقّق: $\\frac{6}{10}=\\frac{9}{15}=0{,}6$.', '$x=10$. Check: $\\frac{6}{10}=\\frac{9}{15}=0{,}6$.')
    },
    'direct-review': {
        vocabulary: [
            say('unitatera laburtu', 'reducir a la unidad', 'الإرجاع إلى الوحدة', 'unitary method'),
            say('hiruko erregela zuzena', 'regla de tres directa', 'قاعدة الثلاثة الطردية', 'direct rule of three')
        ],
        definitions: [
            {
                term: say('Zuzenki proportzionalak', 'Directamente proporcionales', 'متناسبان طرديًا', 'Directly proportional'),
                meaning: say(
                    'Bi magnitude, bat zenbaki batez biderkatzean bestea ere zenbaki berarekin biderkatzen bada. Haien zatidura konstantea da: proportzionaltasun-konstantea.',
                    'Dos magnitudes en las que, al multiplicar una por un número, la otra queda multiplicada por el mismo número. Su cociente es constante: la constante de proporcionalidad.',
                    'مقداران إذا ضُرب أحدهما في عدد ضُرب الآخر في العدد نفسه. وحاصل قسمتهما ثابت: ثابت التناسب.',
                    'Two quantities where multiplying one by a number multiplies the other by the same number. Their quotient is constant: the constant of proportionality.'
                )
            }
        ],
        explanation: say(
            'Problemak bi eratara ebazten dira: unitatera laburtuz (lehenik unitate baten balioa, gero eskatzen dena) edo hiruko erregela zuzenarekin, $\\frac{a}{b}=\\frac{c}{x}$. Kontuz: bat handitzean bestea handitzea ez da nahikoa; proportzio berean handitu behar du.',
            'Los problemas se resuelven de dos maneras: reduciendo a la unidad (primero el valor de 1, luego lo que se pide) o con la regla de tres directa, $\\frac{a}{b}=\\frac{c}{x}$. Cuidado: no basta con que al crecer una crezca la otra; tiene que crecer en la misma proporción.',
            'تُحل المسائل بطريقتين: الإرجاع إلى الوحدة (قيمة الواحد أولًا ثم المطلوب) أو قاعدة الثلاثة الطردية $\\frac{a}{b}=\\frac{c}{x}$. انتبه: لا يكفي أن يزيد أحدهما حين يزيد الآخر؛ يجب أن يزيد بالنسبة نفسها.',
            'Problems are solved in two ways: by the unitary method (first the value of 1, then what is asked) or with the direct rule of three, $\\frac{a}{b}=\\frac{c}{x}$. Be careful: it is not enough for one to grow when the other does; it has to grow in the same proportion.'
        ),
        examplePrompt: say('5 koadernok 7,50 € balio dute. Zenbat balio dute 8 koadernok?', '5 cuadernos cuestan 7,50 €. ¿Cuánto cuestan 8 cuadernos?', 'ثمن 5 دفاتر 7.50 €. كم ثمن 8 دفاتر؟', '5 notebooks cost €7.50. How much do 8 notebooks cost?'),
        example: same('$\\begin{gathered}7{,}50\\mathbin{:}5=1{,}50\\\\1{,}50\\cdot 8=12\\end{gathered}$'),
        exampleAnswer: say('8 koadernok 12 € balio dute.', '8 cuadernos cuestan 12 €.', 'ثمن 8 دفاتر 12 €.', '8 notebooks cost €12.')
    },
    'inverse-review': {
        vocabulary: [
            say('abiadura', 'velocidad', 'السرعة', 'speed'),
            say('hiruko erregela alderantzizkoa', 'regla de tres inversa', 'قاعدة الثلاثة العكسية', 'inverse rule of three')
        ],
        definitions: [
            {
                term: say('Alderantziz proportzionalak', 'Inversamente proporcionales', 'متناسبان عكسيًا', 'Inversely proportional'),
                meaning: say(
                    'Bi magnitude, bat zenbaki batez biderkatzean bestea zenbaki horrekin zatitzen bada: bikoitza → erdia. Haien biderkadura konstantea da.',
                    'Dos magnitudes en las que, al multiplicar una por un número, la otra queda dividida por ese número: doble → mitad. Su producto es constante.',
                    'مقداران إذا ضُرب أحدهما في عدد قُسم الآخر على ذلك العدد: الضعف ← النصف. وحاصل ضربهما ثابت.',
                    'Two quantities where multiplying one by a number divides the other by that number: double → half. Their product is constant.'
                )
            }
        ],
        explanation: say(
            'Adibidez, abiadura eta denbora ibilbide berean: abiadura handiagoarekin, denbora gutxiago, eta abiadura bider denbora distantzia da, beti bera. Hiruko erregela alderantzizkoan, lerro bakoitzeko biderkadurak berdintzen dira: $a\\cdot b=c\\cdot x$.',
            'Por ejemplo, la velocidad y el tiempo en un mismo trayecto: a más velocidad, menos tiempo, y la velocidad por el tiempo es la distancia, siempre la misma. En la regla de tres inversa se igualan los productos de cada fila: $a\\cdot b=c\\cdot x$.',
            'مثلًا السرعة والزمن في المسار نفسه: كلما زادت السرعة قلّ الزمن، والسرعة في الزمن هي المسافة، وهي نفسها دائمًا. وفي قاعدة الثلاثة العكسية نساوي حاصلي ضرب السطرين: $a\\cdot b=c\\cdot x$.',
            'For example, speed and time on the same journey: more speed, less time, and speed times time is the distance, always the same. In the inverse rule of three, the products of each row are set equal: $a\\cdot b=c\\cdot x$.'
        ),
        examplePrompt: say(
            'Berdinak diren 6 iturrirekin, ur-biltegi bat 10 orduan betetzen da. Zenbat ordu behar dira 4 iturrirekin?',
            'Con 6 grifos iguales, un depósito se llena en 10 horas. ¿Cuánto tarda con 4 grifos?',
            'بستة صنابير متماثلة يمتلئ خزان في 10 ساعات. كم يستغرق بأربعة صنابير؟',
            'With 6 identical taps, a tank fills in 10 hours. How long does it take with 4 taps?'
        ),
        example: same('$\\begin{gathered}6\\cdot 10=4\\cdot x=60\\\\x=60\\mathbin{:}4=15\\end{gathered}$'),
        exampleAnswer: say('Iturri gutxiagorekin, denbora gehiago: 15 ordu.', 'Con menos grifos, más tiempo: 15 horas.', 'بصنابير أقل زمن أطول: 15 ساعة.', 'Fewer taps, more time: 15 hours.')
    },

    /* ---------- 2. Compound proportion ---------- */
    'compound-direct': {
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('magnitudea', 'magnitud', 'المقدار', 'quantity')
        ],
        definitions: [
            {
                term: say('Proportzionaltasun konposatua', 'Proporcionalidad compuesta', 'التناسب المركّب', 'Compound proportion'),
                meaning: say('Hiru magnitude edo gehiago erlazionatzen dituena.', 'La que relaciona tres o más magnitudes.', 'التناسب الذي يربط ثلاثة مقادير أو أكثر.', 'One that links three or more quantities.')
            }
        ],
        explanation: say(
            'Konparatu ezezagunaren magnitudea beste bakoitzarekin, banan-banan, besteak aldatzen ez direla pentsatuz. Irudian, ordu gehiago → m² gehiago (zuzena) eta egun gehiago → m² gehiago (zuzena): 600 bider bi zatidurak, berria/zaharra, $600\\cdot\\frac{8}{10}\\cdot\\frac{15}{18}=400$ m².',
            'Compara la magnitud de la incógnita con cada una de las otras, de una en una, imaginando que las demás no cambian. En el dibujo, más horas → más m² (directa) y más días → más m² (directa): 600 por los dos cocientes nuevo/viejo, $600\\cdot\\frac{8}{10}\\cdot\\frac{15}{18}=400$ m².',
            'قارن مقدار المجهول بكل مقدار آخر على حدة، وتخيّل أن الباقي لا يتغير. في الرسم: ساعات أكثر ← م² أكثر (طردي)، وأيام أكثر ← م² أكثر (طردي): 600 في الكسرين الجديد/القديم، $600\\cdot\\frac{8}{10}\\cdot\\frac{15}{18}=400$ م².',
            'Compare the unknown quantity with each of the others, one at a time, imagining the rest do not change. In the drawing, more hours → more m² (direct) and more days → more m² (direct): 600 times the two new/old quotients, $600\\cdot\\frac{8}{10}\\cdot\\frac{15}{18}=400$ m².'
        ),
        examplePrompt: say(
            '4 margolarik 120 m² margotzen dituzte 3 egunetan. Zenbat m² margotzen dituzte 6 margolarik 5 egunetan?',
            '4 pintores pintan 120 m² en 3 días. ¿Cuántos m² pintan 6 pintores en 5 días?',
            'يدهن 4 دهّانين 120 م² في 3 أيام. كم م² يدهن 6 دهّانين في 5 أيام؟',
            '4 painters paint 120 m² in 3 days. How many m² do 6 painters paint in 5 days?'
        ),
        example: same('$120\\cdot\\frac{6}{4}\\cdot\\frac{5}{3}=300$'),
        exampleAnswer: say('300 m² margotzen dituzte: bi erlazioak zuzenak dira, berria/zaharra.', 'Pintan 300 m²: las dos relaciones son directas, nuevo/viejo.', 'يدهنون 300 م²: العلاقتان طرديتان، الجديد/القديم.', 'They paint 300 m²: both relationships are direct, new/old.')
    },
    'compound-mixed': {
        vocabulary: [
            say('erlazio alderantzizkoa', 'relación inversa', 'علاقة عكسية', 'inverse relationship'),
            say('erlazio zuzena', 'relación directa', 'علاقة طردية', 'direct relationship')
        ],
        explanation: say(
            'Erlazio bat alderantzizkoa denean, haren zatidura buruz behera jartzen da: zaharra/berria. Irudian, pentsu gehiago → egun gehiago (zuzena, $\\frac{840}{294}$) eta behi gutxiago → egun gehiago (alderantzizkoa, $\\frac{15}{10}$): $7\\cdot\\frac{840}{294}\\cdot\\frac{15}{10}=30$ egun. Galdetu beti: besteak berdin badaude, hau handitzean, ezezaguna handitu ala txikitu egiten da?',
            'Cuando una relación es inversa, su cociente se pone al revés: viejo/nuevo. En el dibujo, más pienso → más días (directa, $\\frac{840}{294}$) y menos vacas → más días (inversa, $\\frac{15}{10}$): $7\\cdot\\frac{840}{294}\\cdot\\frac{15}{10}=30$ días. Pregunta siempre: si lo demás no cambia, al crecer esta, ¿la incógnita crece o decrece?',
            'إذا كانت العلاقة عكسية نقلب كسرها: القديم/الجديد. في الرسم: علف أكثر ← أيام أكثر (طردي، $\\frac{840}{294}$)، وأبقار أقل ← أيام أكثر (عكسي، $\\frac{15}{10}$): $7\\cdot\\frac{840}{294}\\cdot\\frac{15}{10}=30$ يومًا. واسأل دائمًا: إذا بقي الباقي ثابتًا، فحين يزيد هذا هل يزيد المجهول أم ينقص؟',
            'When a relationship is inverse, its quotient is flipped: old/new. In the drawing, more feed → more days (direct, $\\frac{840}{294}$) and fewer cows → more days (inverse, $\\frac{15}{10}$): $7\\cdot\\frac{840}{294}\\cdot\\frac{15}{10}=30$ days. Always ask: if the rest stays the same, when this one grows, does the unknown grow or shrink?'
        ),
        examplePrompt: say(
            '60 km errepide egiteko, 3 makinak 10 egun behar dituzte. Zenbat egun beharko dituzte 5 makinak 90 km egiteko?',
            'Para hacer 60 km de carretera, 3 máquinas tardan 10 días. ¿Cuántos días tardarán 5 máquinas en hacer 90 km?',
            'لشقّ 60 كم من الطريق تحتاج 3 آلات إلى 10 أيام. كم يومًا تحتاج 5 آلات لشقّ 90 كم؟',
            'To build 60 km of road, 3 machines take 10 days. How many days will 5 machines take to build 90 km?'
        ),
        example: same('$10\\cdot\\frac{90}{60}\\cdot\\frac{3}{5}=9$'),
        exampleAnswer: say(
            '9 egun: km gehiago, egun gehiago (zuzena); makina gehiago, egun gutxiago (alderantzizkoa).',
            '9 días: más kilómetros, más días (directa); más máquinas, menos días (inversa).',
            '9 أيام: كيلومترات أكثر ← أيام أكثر (طردي)؛ آلات أكثر ← أيام أقل (عكسي).',
            '9 days: more kilometres, more days (direct); more machines, fewer days (inverse).'
        )
    },
    'compound-unit': {
        vocabulary: [
            say('unitatera laburtu', 'reducir a la unidad', 'الإرجاع إلى الوحدة', 'unitary method'),
            say('urratsa', 'paso', 'خطوة', 'step')
        ],
        explanation: say(
            'Formula bat gogoratu beharrean, aldatu magnitude bat aldi bakoitzean eta utzi besteak finko: urrats bakoitza proportzionaltasun soil bat da. Erosoena unitatera jaistea izan ohi da (langile bat, egun bat), eta gero eskatzen denera igotzea.',
            'En lugar de recordar una fórmula, cambia una magnitud cada vez y deja fijas las demás: cada paso es una proporcionalidad simple. Lo más cómodo suele ser bajar a la unidad (un trabajador, un día) y después subir a lo que se pide.',
            'بدل حفظ صيغة غيّر مقدارًا واحدًا في كل مرة وثبّت الباقي: كل خطوة تناسب بسيط. والأسهل عادةً النزول إلى الوحدة (عامل واحد، يوم واحد) ثم الصعود إلى المطلوب.',
            'Instead of remembering a formula, change one quantity at a time and keep the rest fixed: each step is a simple proportion. The easiest way is usually to go down to one (one worker, one day) and then up to what is asked.'
        ),
        examplePrompt: say(
            '1,5 l/s-ko hiru aspertsorek ur-biltegi bat 8 orduan husten dute. Zenbat behar dute 0,9 l/s-ko lau aspertsorek?',
            'Tres aspersores de 1,5 l/s vacían un depósito en 8 horas. ¿Cuánto tardan cuatro aspersores de 0,9 l/s?',
            'ثلاث رشّاشات تدفق كل منها 1.5 ل/ث تفرغ خزانًا في 8 ساعات. كم تستغرق أربع رشّاشات تدفق كل منها 0.9 ل/ث؟',
            'Three sprinklers of 1.5 l/s empty a tank in 8 hours. How long do four sprinklers of 0.9 l/s take?'
        ),
        example: same('$\\begin{gathered}3\\cdot 1{,}5=4{,}5\\qquad 4\\cdot 0{,}9=3{,}6\\\\4{,}5\\cdot 8=36\\\\36\\mathbin{:}3{,}6=10\\end{gathered}$'),
        exampleAnswer: say('10 ordu. Lehenik talde bakoitzaren emari osoa; ur-biltegiko ura ez da aldatzen.', 'Tardan 10 horas. Primero el caudal total de cada grupo; el agua del depósito no cambia.', 'تستغرق 10 ساعات. أولًا التدفق الكلي لكل مجموعة؛ وماء الخزان لا يتغير.', 'They take 10 hours. First the total flow of each group; the water in the tank does not change.')
    },

    /* ---------- 3. Sharing ---------- */
    'direct-share': {
        vocabulary: [
            say('zati bakoitzaren balioa', 'valor de cada parte', 'قيمة كل جزء', 'value of each part'),
            say('batura', 'suma', 'المجموع', 'sum')
        ],
        definitions: [
            {
                term: say('Banaketa zuzenki proportzionala', 'Reparto directamente proporcional', 'التوزيع الطردي', 'Direct proportion share'),
                meaning: say('Kantitate bat banatzea, zenbaki handiagoari zati handiagoa egokitzeko moduan.', 'Repartir una cantidad de modo que al número mayor le toque la parte mayor.', 'توزيع كمية بحيث يأخذ العدد الأكبر الجزء الأكبر.', 'Sharing out an amount so that the bigger number gets the bigger part.')
            }
        ],
        why: {
            text: say(
                '2, 5 eta 8 zenbakiekiko proportzioan banatzea $2+5+8=15$ zati berdin egitea da, eta bati 2 ematea, besteari 5 eta azkenari 8. Horregatik zatitzen da baturarekin: horrela jakiten da zati bakoitzak zenbat balio duen.',
                'Repartir en proporción a 2, 5 y 8 es hacer $2+5+8=15$ partes iguales y dar 2 a uno, 5 a otro y 8 al último. Por eso se divide entre la suma: así se sabe cuánto vale cada parte.',
                'التوزيع بنسبة 2 و5 و8 يعني تقسيم الكمية إلى $2+5+8=15$ جزءًا متساويًا، وإعطاء الأول 2 والثاني 5 والأخير 8. لذلك نقسم على المجموع: فنعرف قيمة كل جزء.',
                'Sharing in proportion to 2, 5 and 8 means making $2+5+8=15$ equal parts and giving 2 to one, 5 to another and 8 to the last. That is why you divide by the sum: it tells you what each part is worth.'
            ),
            math: same('$\\begin{gathered}180\\mathbin{:}15=12\\\\2\\cdot 12+5\\cdot 12+8\\cdot 12=180\\end{gathered}$')
        },
        explanation: say(
            'Batu zenbakiak, zatitu kantitatea batura horren artean (zati bakoitzaren balioa, $p$) eta biderkatu zenbaki bakoitza $p$ balioarekin. Irudian, 180 banatzen da 2, 5 eta 8 zenbakien artean: $180\\mathbin{:}15=12$, eta zatiak 24, 60 eta 96 dira. Egiaztatu 180 ematen dutela.',
            'Suma los números, divide la cantidad entre esa suma (el valor de cada parte, $p$) y multiplica cada número por $p$. En el dibujo, 180 entre 2, 5 y 8: $180\\mathbin{:}15=12$, y las partes son 24, 60 y 96. Comprueba que suman 180.',
            'اجمع الأعداد، واقسم الكمية على المجموع (قيمة الجزء الواحد $p$)، ثم اضرب كل عدد في $p$. في الرسم توزيع 180 على 2 و5 و8: $180\\mathbin{:}15=12$، والأجزاء 24 و60 و96. تحقّق أن مجموعها 180.',
            'Add the numbers, divide the amount by that sum (the value of each part, $p$) and multiply each number by $p$. In the drawing, 180 among 2, 5 and 8: $180\\mathbin{:}15=12$, and the parts are 24, 60 and 96. Check that they add up to 180.'
        ),
        examplePrompt: say(
            'Banatu 550 zati zuzenki proportzionaletan, 4, 5 eta 2 zenbakiekiko.',
            'Reparte 550 en partes directamente proporcionales a 4, 5 y 2.',
            'وزّع 550 طرديًا على 4 و5 و2.',
            'Share 550 into parts in direct proportion to 4, 5 and 2.'
        ),
        example: same('$\\begin{gathered}550\\mathbin{:}(4+5+2)=50\\\\200,\\ 250,\\ 100\\end{gathered}$'),
        exampleAnswer: say('Zatiak 200, 250 eta 100 dira: 5 zenbakiari handiena.', 'Las partes son 200, 250 y 100: al 5, la mayor.', 'الأجزاء 200 و250 و100: والأكبر للعدد 5.', 'The parts are 200, 250 and 100: the biggest goes to 5.')
    },
    'share-problems': {
        vocabulary: [
            say('izendatzaile bera', 'mismo denominador', 'المقام نفسه', 'same denominator'),
            say('zenbakitzaileak', 'numeradores', 'البسوط', 'numerators')
        ],
        explanation: say(
            'Problemetan, zenbakiak sarritan egunak, orduak edo jarritako dirua dira: irudian, 1200 € 20 egunetan banatuta, 60 € egun bakoitzeko. Zenbakiak zatikiak direnean, idatzi izendatzaile berarekin eta banatu zenbakitzaileen arabera.',
            'En los problemas, los números suelen ser días, horas o el dinero puesto: en el dibujo, 1200 € entre 20 días son 60 € por día. Cuando los números son fracciones, escríbelas con el mismo denominador y reparte según los numeradores.',
            'في المسائل تكون الأعداد غالبًا أيامًا أو ساعات أو مالًا مدفوعًا: في الرسم 1200 € على 20 يومًا تعطي 60 € لليوم. وإذا كانت الأعداد كسورًا فاكتبها بالمقام نفسه ووزّع حسب البسوط.',
            'In problems, the numbers are often days, hours or the money put in: in the drawing, €1,200 over 20 days is €60 a day. When the numbers are fractions, write them with the same denominator and share according to the numerators.'
        ),
        examplePrompt: say(
            'Hiru lagunek furgoneta bat alokatu dute 240 €-an: batek 2 egunez erabili du, beste batek 3 egunez eta besteak 5 egunez. Zenbat ordaintzen du bakoitzak?',
            'Tres amigos alquilan una furgoneta por 240 €: uno la usa 2 días, otro 3 y otro 5. ¿Cuánto paga cada uno?',
            'استأجر ثلاثة أصدقاء شاحنة صغيرة بـ240 €: استعملها الأول يومين والثاني 3 أيام والثالث 5 أيام. كم يدفع كل واحد؟',
            'Three friends rent a van for €240: one uses it for 2 days, another for 3 and another for 5. How much does each pay?'
        ),
        example: same('$\\begin{gathered}240\\mathbin{:}(2+3+5)=24\\\\48,\\ 72,\\ 120\\end{gathered}$'),
        exampleAnswer: say('48 €, 72 € eta 120 € ordaintzen dituzte.', 'Pagan 48 €, 72 € y 120 €.', 'يدفعون 48 € و72 € و120 €.', 'They pay €48, €72 and €120.')
    },
    'inverse-share': {
        vocabulary: [
            say('alderantzizkoak', 'inversos', 'المقلوبات', 'reciprocals'),
            say('izendatzaile bera', 'mismo denominador', 'المقام نفسه', 'same denominator')
        ],
        definitions: [
            {
                term: say('Banaketa alderantziz proportzionala', 'Reparto inversamente proporcional', 'التوزيع العكسي', 'Inverse proportion share'),
                meaning: say('Kantitate bat banatzea, zenbaki handiagoari zati txikiagoa egokitzeko moduan.', 'Repartir una cantidad de modo que al número mayor le toque la parte menor.', 'توزيع كمية بحيث يأخذ العدد الأكبر الجزء الأصغر.', 'Sharing out an amount so that the bigger number gets the smaller part.')
            }
        ],
        explanation: say(
            'Zenbaki batzuekiko alderantziz banatzea haien alderantzizkoekiko zuzenki banatzea da: 2, 3 eta 5 zenbakiekiko alderantziz = $\\frac{1}{2}$, $\\frac{1}{3}$ eta $\\frac{1}{5}$ zatikiekiko zuzenki. Izendatzaile berarekin, $\\frac{15}{30},\\frac{10}{30},\\frac{6}{30}$: 15, 10 eta 6 zenbakien arabera banatzen da.',
            'Repartir de forma inversa a unos números es repartir de forma directa a sus inversos: inversamente a 2, 3 y 5 = directamente a $\\frac{1}{2}$, $\\frac{1}{3}$ y $\\frac{1}{5}$. Con el mismo denominador, $\\frac{15}{30},\\frac{10}{30},\\frac{6}{30}$: se reparte según 15, 10 y 6.',
            'التوزيع عكسيًا على أعداد هو التوزيع طرديًا على مقلوباتها: عكسيًا على 2 و3 و5 = طرديًا على $\\frac{1}{2}$ و$\\frac{1}{3}$ و$\\frac{1}{5}$. وبالمقام نفسه $\\frac{15}{30},\\frac{10}{30},\\frac{6}{30}$: نوزّع حسب 15 و10 و6.',
            'Sharing in inverse proportion to some numbers is sharing in direct proportion to their inverses: inversely to 2, 3 and 5 = directly to $\\frac{1}{2}$, $\\frac{1}{3}$ and $\\frac{1}{5}$. With the same denominator, $\\frac{15}{30},\\frac{10}{30},\\frac{6}{30}$: share according to 15, 10 and 6.'
        ),
        examplePrompt: say(
            'Banatu 260 zati alderantziz proportzionaletan, 2, 3 eta 4 zenbakiekiko.',
            'Reparte 260 en partes inversamente proporcionales a 2, 3 y 4.',
            'وزّع 260 عكسيًا على 2 و3 و4.',
            'Share 260 into parts in inverse proportion to 2, 3 and 4.'
        ),
        example: same('$\\begin{gathered}\\frac{1}{2},\\ \\frac{1}{3},\\ \\frac{1}{4}=\\frac{6}{12},\\ \\frac{4}{12},\\ \\frac{3}{12}\\\\260\\mathbin{:}(6+4+3)=20\\\\120,\\ 80,\\ 60\\end{gathered}$'),
        exampleAnswer: say('Zatiak 120, 80 eta 60 dira: 2 zenbakiari handiena.', 'Las partes son 120, 80 y 60: al 2, la mayor.', 'الأجزاء 120 و80 و60: والأكبر للعدد 2.', 'The parts are 120, 80 and 60: the biggest goes to 2.')
    },

    /* ---------- 4. Percentages ---------- */
    'percent-forms': {
        vocabulary: [
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage'),
            say('zenbaki hamartarra', 'decimal', 'العدد العشري', 'decimal')
        ],
        explanation: say(
            'Ehuneko bat 100 izendatzailea duen zatikia da, eta hamartar gisa idatz daiteke: % 12 $\\frac{12}{100}=0{,}12$ da. Kantitate baten ehunekoa kalkulatzeko, biderkatu hamartarrarekin: 750 zenbakiaren % 12 $750\\cdot 0{,}12=90$ da. 100 baino handiagoa bada, hamartarra 1 baino handiagoa da: % 150 $1{,}5$ da.',
            'Un porcentaje es una fracción de denominador 100, y se puede escribir como decimal: el 12 % es $\\frac{12}{100}=0{,}12$. Para calcular el porcentaje de una cantidad, multiplica por el decimal: el 12 % de 750 es $750\\cdot 0{,}12=90$. Si pasa de 100, el decimal es mayor que 1: el 150 % es $1{,}5$.',
            'النسبة المئوية كسر مقامه 100 ويمكن كتابتها عددًا عشريًا: 12٪ هي $\\frac{12}{100}=0{,}12$. ولحساب نسبة من كمية اضرب في العدد العشري: 12٪ من 750 هي $750\\cdot 0{,}12=90$. وإذا زادت النسبة على 100 كان العدد العشري أكبر من 1: 150٪ هي $1{,}5$.',
            'A percentage is a fraction with denominator 100, and it can be written as a decimal: 12% is $\\frac{12}{100}=0{,}12$. To work out a percentage of an amount, multiply by the decimal: 12% of 750 is $750\\cdot 0{,}12=90$. Above 100, the decimal is greater than 1: 150% is $1{,}5$.'
        ),
        examplePrompt: say(
            'Kalkulatu 80 zenbakiaren % 35 eta 400 zenbakiaren % 2,5.',
            'Calcula el 35 % de 80 y el 2,5 % de 400.',
            'احسب 35٪ من 80، و2.5٪ من 400.',
            'Work out 35% of 80 and 2.5% of 400.'
        ),
        example: same('$\\begin{gathered}80\\cdot 0{,}35=28\\\\400\\cdot 0{,}025=10\\end{gathered}$'),
        exampleAnswer: say('28 eta 10. Kontuz: % 2,5 $0{,}025$ da.', '28 y 10. Ojo: el 2,5 % es $0{,}025$.', '28 و10. انتبه: 2.5٪ هي $0{,}025$.', '28 and 10. Careful: 2.5% is $0{,}025$.')
    },
    'percent-total': {
        vocabulary: [
            say('osoa', 'total', 'الكل', 'total'),
            say('zatia', 'parte', 'الجزء', 'part')
        ],
        explanation: say(
            'Batzuetan zatia eta ehunekoa ezagutzen dira, eta osoa falta da. Demagun $x$ kantitatearen % 12 42 dela: $x\\cdot 0{,}12=42$; beraz, $x=42\\mathbin{:}0{,}12=350$, zatia zati hamartarra. Egiaztatu beti: 350 zenbakiaren % 12 42 da.',
            'A veces se conocen la parte y el porcentaje, y falta el total. Si el 12 % de $x$ es 42, $x\\cdot 0{,}12=42$; así que $x=42\\mathbin{:}0{,}12=350$, la parte entre el decimal. Comprueba siempre: el 12 % de 350 es 42.',
            'أحيانًا نعرف الجزء والنسبة ويبقى الكل مجهولًا. إذا كانت 12٪ من $x$ تساوي 42 فإن $x\\cdot 0{,}12=42$، إذن $x=42\\mathbin{:}0{,}12=350$: الجزء على العدد العشري. وتحقّق دائمًا: 12٪ من 350 تساوي 42.',
            'Sometimes the part and the percentage are known, and the total is missing. If 12% of $x$ is 42, $x\\cdot 0{,}12=42$; so $x=42\\mathbin{:}0{,}12=350$, the part divided by the decimal. Always check: 12% of 350 is 42.'
        ),
        examplePrompt: say(
            'Liburutegi batean 45 liburu daude maileguan, guztien % 9. Zenbat liburu daude?',
            'En una biblioteca hay 45 libros prestados, el 9 % del total. ¿Cuántos libros hay?',
            'في مكتبة 45 كتابًا معارًا، أي 9٪ من المجموع. كم كتابًا في المكتبة؟',
            'A library has 45 books on loan, 9% of the total. How many books are there?'
        ),
        example: same('$x=45\\mathbin{:}0{,}09=500$'),
        exampleAnswer: say('500 liburu daude. Egiaztatu: 500 liburuen % 9, 45 dira.', 'Hay 500 libros. Comprueba: el 9 % de 500 es 45.', 'في المكتبة 500 كتاب. تحقّق: 9٪ من 500 تساوي 45.', 'There are 500 books. Check: 9% of 500 is 45.')
    },
    'percent-which': {
        vocabulary: [
            say('aldakuntzaren ehunekoa', 'porcentaje de variación', 'نسبة التغير', 'percentage change'),
            say('hasierako kantitatea', 'cantidad inicial', 'الكمية الأصلية', 'initial amount')
        ],
        explanation: say(
            'Ehunekoa = zatia : osoa · 100. Kantitate bat aldatzen denean, aldakuntza-ehunekoa aldaketa zati hasierakoa da, bider 100: salmentak 2500 izatetik 2800 izatera igotzen badira, $300\\mathbin{:}2500\\cdot 100=12$, % 12 igo dira. Beti hasierakoarekiko!',
            'Porcentaje = parte : total · 100. Cuando una cantidad cambia, el porcentaje de variación es el cambio entre la cantidad inicial, por 100: si las ventas pasan de 2500 a 2800, $300\\mathbin{:}2500\\cdot 100=12$, han subido un 12 %. ¡Siempre respecto de la inicial!',
            'النسبة = الجزء : الكل · 100. وإذا تغيّرت كمية فنسبة التغيّر هي التغيّر مقسومًا على الكمية الأصلية، في 100: إذا ارتفعت المبيعات من 2500 إلى 2800 فإن $300\\mathbin{:}2500\\cdot 100=12$، أي ارتفعت 12٪. دائمًا بالنسبة إلى الأصلية!',
            'Percentage = part : total · 100. When an amount changes, the percentage change is the change divided by the initial amount, times 100: if sales go from 2,500 to 2,800, $300\\mathbin{:}2500\\cdot 100=12$, they have gone up by 12%. Always compared with the initial amount!'
        ),
        examplePrompt: say(
            'Abonamendu batek 32 € balio zuen, eta orain 36 €. Zer ehuneko igo da?',
            'Un abono costaba 32 € y ahora cuesta 36 €. ¿Qué porcentaje ha subido?',
            'كان ثمن اشتراك 32 € وأصبح 36 €. بأي نسبة ارتفع؟',
            'A season ticket cost €32 and now costs €36. By what percentage has it gone up?'
        ),
        example: same('$4\\mathbin{:}32\\cdot 100=12{,}5$'),
        exampleAnswer: say('% 12,5 igo da: 4 € gehiago, 32 euroen gainean.', 'Ha subido un 12,5 %: 4 € más sobre 32 €.', 'ارتفع 12.5٪: 4 € زيادة على 32 €.', 'It has gone up by 12.5%: €4 more on €32.')
    },
    index: {
        vocabulary: [
            say('igoera', 'subida', 'الزيادة', 'increase'),
            say('beherapena', 'rebaja', 'التخفيض', 'decrease'),
            say('azken kantitatea', 'cantidad final', 'الكمية النهائية', 'final amount')
        ],
        definitions: [
            {
                term: say('Aldakuntza-indizea', 'Índice de variación', 'مؤشر التغيّر', 'Multiplier'),
                meaning: say(
                    'Hasierako kantitatea biderkatzen duen zenbakia: $1+\\frac{p}{100}$, % $p$ igotzean; $1-\\frac{p}{100}$, % $p$ jaistean.',
                    'El número por el que se multiplica la cantidad inicial: $1+\\frac{p}{100}$ al subir un $p$ %; $1-\\frac{p}{100}$ al bajar un $p$ %.',
                    'العدد الذي تُضرب فيه الكمية الأصلية: $1+\\frac{p}{100}$ عند الزيادة بنسبة $p$٪، و$1-\\frac{p}{100}$ عند الإنقاص بنسبة $p$٪.',
                    'The number the initial amount is multiplied by: $1+\\frac{p}{100}$ for an increase of $p$%; $1-\\frac{p}{100}$ for a decrease of $p$%.'
                )
            }
        ],
        why: {
            text: say(
                '% 12 igotzea zegoen guztiarekin geratzea (% 100) eta % 12 gehitzea da: guztira % 112, hamartar gisa $1{,}12$. Horregatik indizeaz biderkatzen da, eta % 15 beheratzean, $0{,}85$ zenbakiaz.',
                'Subir un 12 % es quedarse con todo lo que había (el 100 %) y añadir el 12 %: en total, el 112 %, que como decimal es $1{,}12$. Por eso se multiplica por el índice; y en una rebaja del 15 %, por $0{,}85$.',
                'الزيادة بنسبة 12٪ تعني أن نحتفظ بكل ما كان (100٪) ونضيف 12٪: المجموع 112٪، أي $1{,}12$ عددًا عشريًا. لذلك نضرب في المؤشر، وفي تخفيض بنسبة 15٪ نضرب في $0{,}85$.',
                'Going up by 12% means keeping all you had (100%) and adding 12%: 112% in total, which as a decimal is $1{,}12$. That is why you multiply by the multiplier; and for a 15% decrease, by $0{,}85$.'
            ),
            math: same('$\\begin{aligned}750+750\\cdot 0{,}12&=750\\cdot 1{,}12\\\\&=840\\end{aligned}$')
        },
        explanation: say(
            'Amaierakoa = hasierakoa · indizea; beraz, hasierakoa = amaierakoa : indizea. % 12 igo → $\\cdot 1{,}12$; % 15 merkatu → $\\cdot 0{,}85$. Kontuz: hasierakoa lortzeko ez zaio amaierakoari ehunekoa gehitzen edo kentzen; indizearekin zatitzen da.',
            'Final = inicial · índice, así que inicial = final : índice. Sube un 12 % → $\\cdot 1{,}12$; rebaja del 15 % → $\\cdot 0{,}85$. Cuidado: para volver a la inicial no se suma ni se resta el porcentaje a la final; se divide entre el índice.',
            'النهائية = الأصلية · المؤشر، إذن الأصلية = النهائية : المؤشر. زيادة 12٪ ← $\\cdot 1{,}12$؛ تخفيض 15٪ ← $\\cdot 0{,}85$. انتبه: للعودة إلى الأصلية لا نضيف النسبة إلى النهائية ولا نطرحها؛ بل نقسم على المؤشر.',
            'Final = initial · multiplier, so initial = final : multiplier. Up 12% → $\\cdot 1{,}12$; a 15% reduction → $\\cdot 0{,}85$. Careful: to get back to the initial amount you do not add or subtract the percentage; you divide by the multiplier.'
        ),
        examplePrompt: say(
            '% 15 merkatutako gona batek 36,55 € balio du. Zenbat balio zuen lehen?',
            'Una falda rebajada un 15 % cuesta 36,55 €. ¿Cuánto costaba antes?',
            'تنورة مخفّضة 15٪ ثمنها 36.55 €. كم كان ثمنها من قبل؟',
            'A skirt reduced by 15% costs €36.55. How much did it cost before?'
        ),
        example: same('$36{,}55\\mathbin{:}0{,}85=43$'),
        exampleAnswer: say('43 € balio zuen. Merkealdiaren indizea $0{,}85$ da.', 'Costaba 43 €. El índice de la rebaja es $0{,}85$.', 'كان ثمنها 43 €. ومؤشر التخفيض $0{,}85$.', 'It cost €43. The multiplier of the reduction is $0{,}85$.')
    },
    chained: {
        vocabulary: [
            say('aldaketa', 'cambio', 'التغير', 'change'),
            say('indizeak', 'índices', 'المؤشرات', 'multipliers')
        ],
        explanation: say(
            'Bi aldaketa jarraian egiten direnean, bigarrena lehenaren ondoren geratzen den kantitateari aplikatzen zaio. Horregatik indizeak biderkatzen dira, ez ehunekoak batzen. % 10 igo eta gero % 10 jaitsi: $1{,}1\\cdot 0{,}9=0{,}99$, % 1 galtzen da!',
            'Cuando se hacen dos cambios seguidos, el segundo se aplica a la cantidad que queda tras el primero. Por eso se multiplican los índices, no se suman los porcentajes. Subir un 10 % y luego bajar un 10 %: $1{,}1\\cdot 0{,}9=0{,}99$, ¡se pierde un 1 %!',
            'عند إجراء تغيّرين متتاليين يُطبَّق الثاني على الكمية الناتجة عن الأول. لذلك نضرب المؤشرات ولا نجمع النسب. زيادة 10٪ ثم تخفيض 10٪: $1{,}1\\cdot 0{,}9=0{,}99$، أي خسارة 1٪!',
            'When two changes are made one after the other, the second is applied to the amount left after the first. That is why the multipliers are multiplied, not the percentages added. Up 10% and then down 10%: $1{,}1\\cdot 0{,}9=0{,}99$, you lose 1%!'
        ),
        examplePrompt: say(
            '150 €-ko beroki bat % 40 merkatzen da, eta gero % 30 garestitzen. Zenbat balio du orain?',
            'Un abrigo de 150 € baja un 40 % y después sube un 30 %. ¿Cuánto cuesta ahora?',
            'معطف ثمنه 150 € انخفض 40٪ ثم ارتفع 30٪. كم ثمنه الآن؟',
            'A €150 coat goes down by 40% and then up by 30%. How much does it cost now?'
        ),
        example: same('$150\\cdot 0{,}6\\cdot 1{,}3=117$'),
        exampleAnswer: say(
            '117 € balio du: indize osoa $0{,}78$ da, % 22 merkeago, ez % 10.',
            'Cuesta 117 €: el índice total es $0{,}78$, un 22 % más barato, no un 10 %.',
            'ثمنه 117 €: المؤشر الكلي $0{,}78$، أي أرخص بـ22٪ لا بـ10٪.',
            'It costs €117: the total multiplier is $0{,}78$, 22% cheaper, not 10%.'
        )
    },
    interest: {
        vocabulary: [
            say('interesa', 'interés', 'الفائدة', 'interest'),
            say('mailegua', 'préstamo', 'القرض', 'loan'),
            say('urtea', 'año', 'السنة', 'year')
        ],
        definitions: [
            {
                term: say('Kapitala', 'Capital', 'رأس المال', 'Capital'),
                meaning: say('$C$: bankuan uzten den edo maileguan hartzen den dirua.', '$C$: el dinero que se deja en el banco o que se pide prestado.', '$C$: المال الذي نودعه في المصرف أو نقترضه.', '$C$: the money left in the bank or borrowed.')
            },
            {
                term: say('Interes-tasa', 'Tipo de interés', 'سعر الفائدة', 'Interest rate'),
                meaning: say('$r$: bankuak urtero ordaintzen duen ehunekoa.', '$r$: el porcentaje que paga el banco cada año.', '$r$: النسبة التي يدفعها المصرف كل سنة.', '$r$: the percentage the bank pays each year.')
            }
        ],
        why: {
            text: say(
                'Urte bakoitzean interesa kapitalaren % $r$ da, $\\frac{C\\cdot r}{100}$, eta ez da aldatzen, beti hasierako kapitalaren gainean kalkulatzen delako. $t$ urtetan $t$ aldiz errepikatzen da: horregatik biderkatzen da $t$ letraz.',
                'Cada año el interés es el $r$ % del capital, $\\frac{C\\cdot r}{100}$, y no cambia, porque siempre se calcula sobre el capital inicial. En $t$ años se repite $t$ veces: por eso se multiplica por $t$.',
                'في كل سنة تكون الفائدة $r$٪ من رأس المال، أي $\\frac{C\\cdot r}{100}$، ولا تتغير لأنها تُحسب دائمًا على رأس المال الأصلي. وفي $t$ سنوات تتكرر $t$ مرات: لذلك نضرب في $t$.',
                'Each year the interest is $r$% of the capital, $\\frac{C\\cdot r}{100}$, and it does not change, because it is always worked out on the initial capital. Over $t$ years it is repeated $t$ times: that is why you multiply by $t$.'
            ),
            math: same('$\\frac{800\\cdot 5}{100}\\cdot 3=40\\cdot 3=120$')
        },
        explanation: say(
            'Interes bakunean, urte bakoitzeko interesa beti bera da, hasierako kapitalaren % $r$; beraz, $t$ urtetan $I=\\frac{C\\cdot r\\cdot t}{100}$, eta amaieran $C+I$ dago. Mailegu batean berdin, baina interesa guk ordaintzen dugu.',
            'En el interés simple, el interés de cada año es siempre el mismo, el $r$ % del capital inicial; así que en $t$ años, $I=\\frac{C\\cdot r\\cdot t}{100}$, y al final se tiene $C+I$. En un préstamo es igual, pero el interés lo pagamos nosotros.',
            'في الفائدة البسيطة تكون فائدة كل سنة هي نفسها، $r$٪ من رأس المال الأصلي؛ إذن في $t$ سنوات $I=\\frac{C\\cdot r\\cdot t}{100}$، ويصبح لدينا في النهاية $C+I$. وفي القرض الأمر نفسه، لكننا نحن من يدفع الفائدة.',
            'With simple interest, the interest each year is always the same, $r$% of the initial capital; so in $t$ years, $I=\\frac{C\\cdot r\\cdot t}{100}$, and at the end you have $C+I$. With a loan it is the same, but we pay the interest.'
        ),
        examplePrompt: say(
            '8000 € uzten dira bankuan 3 urtez, eta interes-tasa % 5 da. Zenbat diru dago amaieran?',
            'Se dejan 8000 € al 5 % durante 3 años. ¿Cuánto dinero hay al final?',
            'أُودع 8000 € بفائدة 5٪ مدة 3 سنوات. كم يصبح المال في النهاية؟',
            '€8,000 is left at 5% for 3 years. How much money is there at the end?'
        ),
        example: same('$\\begin{gathered}I=\\frac{8000\\cdot 5\\cdot 3}{100}=1200\\\\8000+1200=9200\\end{gathered}$'),
        exampleAnswer: say('Amaieran 9200 € daude.', 'Al final hay 9200 €.', 'يصبح المال في النهاية 9200 €.', 'At the end there is €9,200.')
    }
}

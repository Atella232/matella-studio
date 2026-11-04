import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'
import type { Proportion3TopicId } from './lessonChecks.ts'

/* ==========================================================================
   Proportzionaltasuna · 3. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, its cases, the example as an exercise («Another example»)
   and, in four lessons, «Why does it work?». Plain data so the tests can
   import it; lessons.tsx merges it into the topics. The explanations use
   the numbers of their drawings (the gears 12 · 30 = 24 · 15, y = 2x and
   x · y = 12, 180 shared among 2, 5 and 8, the prizes for places 1, 2 and 3,
   8000 € at 5 %), never the numbers of «Let's solve»; the example uses
   numbers of its own. No text command inside the formulas (the unit test
   forbids it): «new/old» goes in the words. Tests in
   tests/lesson-texts.test.ts.
   ========================================================================== */

export const proportion3LessonTexts: Record<Proportion3TopicId, LessonTexts> = {
    ratio: {
        definitions: [
            {
                term: say('Proportzioa', 'Proporción', 'التناسب', 'Proportion'),
                meaning: say('Bi arrazoiren berdintza, $\\frac{a}{b}=\\frac{c}{d}$: $a$ eta $d$ muturrak dira, eta $b$ eta $c$ erdikoak.', 'La igualdad de dos razones, $\\frac{a}{b}=\\frac{c}{d}$: $a$ y $d$ son los extremos, y $b$ y $c$, los medios.', 'تساوي نسبتين $\\frac{a}{b}=\\frac{c}{d}$: العددان $a$ و$d$ هما الطرفان، و$b$ و$c$ هما الوسطان.', 'Two equal ratios, $\\frac{a}{b}=\\frac{c}{d}$: $a$ and $d$ are the extremes, and $b$ and $c$ the means.')
            }
        ],
        vocabulary: [
            say('zatidura', 'cociente', 'حاصل القسمة', 'quotient'),
            say('muturrak', 'extremos', 'الطرفان', 'extremes'),
            say('erdikoak', 'medios', 'الوسطان', 'means')
        ],
        explanation: say(
            '$a$ eta $b$ kopuruen arrazoia haien zatidura da, $\\frac{a}{b}$: zenbat aldiz sartzen den bata bestean. 12 neska eta 16 mutil badaude, arrazoia $\\frac{12}{16}=0{,}75$ da. Proportzio guztietan, muturren biderkadura erdikoen biderkaduraren berdina da: $a\\cdot d=b\\cdot c$.',
            'La razón entre dos cantidades $a$ y $b$ es su cociente, $\\frac{a}{b}$: cuántas veces cabe una en la otra. Si hay 12 chicas y 16 chicos, la razón es $\\frac{12}{16}=0{,}75$. En toda proporción, el producto de los extremos es igual al de los medios: $a\\cdot d=b\\cdot c$.',
            'النسبة بين كميتين $a$ و$b$ هي حاصل قسمتهما $\\frac{a}{b}$: كم مرة تتسع إحداهما في الأخرى. إذا كان هناك 12 بنتًا و16 ولدًا فالنسبة $\\frac{12}{16}=0{,}75$. وفي كل تناسب يساوي حاصل ضرب الطرفين حاصل ضرب الوسطين: $a\\cdot d=b\\cdot c$.',
            'The ratio of two quantities $a$ and $b$ is their quotient, $\\frac{a}{b}$: how many times one fits into the other. With 12 girls and 16 boys, the ratio is $\\frac{12}{16}=0{,}75$. In every proportion, the product of the extremes equals that of the means: $a\\cdot d=b\\cdot c$.'
        ),
        examplePrompt: say('Errezeta batean 250 g irin daude 100 g azukre bakoitzeko. Proportzionala da 750 g irin eta 300 g azukre erabiltzea?', 'Una receta lleva 250 g de harina por cada 100 g de azúcar. ¿Es proporcional usar 750 g de harina y 300 g de azúcar?', 'في وصفة 250 غ من الطحين لكل 100 غ من السكر. هل استعمال 750 غ من الطحين و300 غ من السكر متناسب؟', 'A recipe uses 250 g of flour for every 100 g of sugar. Is it proportional to use 750 g of flour and 300 g of sugar?'),
        example: same('$\\frac{250}{100}=\\frac{750}{300}\\ \\to\\ 250\\cdot 300=100\\cdot 750=75\\,000$'),
        exampleAnswer: say('Bai: bi arrazoiek $2{,}5$ balio dute.', 'Sí: las dos razones valen $2{,}5$.', 'نعم: النسبتان تساويان $2{,}5$.', 'Yes: both ratios are $2{,}5$.')
    },
    proportion: {
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('propietate nagusia', 'propiedad fundamental', 'الخاصية الأساسية', 'fundamental property'),
            say('diagonala', 'diagonal', 'القطر', 'diagonal')
        ],
        explanation: say(
            'Proportzio baten hiru gai ezagutzen badira, ezezaguna propietate nagusitik ateratzen da, $a\\cdot d=b\\cdot c$: biderkatu diagonal berean dauden biak eta zatitu hirugarrenaz.',
            'Si se conocen tres términos de una proporción, la incógnita sale de la propiedad fundamental, $a\\cdot d=b\\cdot c$: multiplica los dos que están en la misma diagonal y divide entre el tercero.',
            'إذا عُرفت ثلاثة حدود من تناسب فالمجهول يخرج من الخاصية الأساسية $a\\cdot d=b\\cdot c$: اضرب الحدين اللذين على القطر نفسه واقسم على الحد الثالث.',
            'If three terms of a proportion are known, the unknown comes from the fundamental property, $a\\cdot d=b\\cdot c$: multiply the two on the same diagonal and divide by the third.'
        ),
        cases: [
            { title: say('Laugarren proportzionala', 'Cuarta proporcional', 'الرابع المتناسب', 'Fourth proportional'), text: say('Hiru gai desberdin ezagunak.', 'Tres términos distintos conocidos.', 'ثلاثة حدود مختلفة معلومة.', 'Three different known terms.'), math: same('$\\frac{4}{10}=\\frac{6}{x}\\ \\to\\ x=\\frac{10\\cdot 6}{4}=15$') },
            { title: say('Erdiko proportzionala', 'Media proporcional', 'الوسط المتناسب', 'Mean proportional'), text: say('Bi erdikoak ezezagunak eta berdinak.', 'Los dos medios desconocidos e iguales.', 'الوسطان مجهولان ومتساويان.', 'The two means are unknown and equal.'), math: same('$\\frac{4}{x}=\\frac{x}{9}\\ \\to\\ x^{2}=36,\\ x=6$') }
        ],
        examplePrompt: say('Aurkitu 2 eta 32 zenbakien erdiko proportzionala.', 'Halla la media proporcional entre 2 y 32.', 'جد الوسط المتناسب بين 2 و32.', 'Find the mean proportional between 2 and 32.'),
        example: same('$\\frac{2}{x}=\\frac{x}{32}\\ \\to\\ x^{2}=64\\ \\to\\ x=8$'),
        exampleAnswer: say('$x=8$, $2\\cdot 32=64=8^{2}$ delako.', '$x=8$, porque $2\\cdot 32=64=8^{2}$.', '$x=8$، لأن $2\\cdot 32=64=8^{2}$.', '$x=8$, because $2\\cdot 32=64=8^{2}$.')
    },
    scale: {
        definitions: [
            {
                term: say('Eskala', 'Escala', 'المقياس', 'Scale'),
                meaning: say('Planoko neurriaren eta neurri errealaren arteko arrazoia: $1\\mathbin{:}50\\,000$ eskalan, planoko 1 cm errealitateko 50 000 cm dira.', 'La razón entre una medida del plano y la real: en $1\\mathbin{:}50\\,000$, 1 cm del plano son 50 000 cm reales.', 'النسبة بين قياس على المخطط والقياس الحقيقي: في $1\\mathbin{:}50\\,000$ يساوي 1 سم على المخطط 50 000 سم في الواقع.', 'The ratio of a length on the plan to the real one: at $1\\mathbin{:}50\\,000$, 1 cm on the plan is 50,000 cm in reality.')
            }
        ],
        vocabulary: [
            say('mapa', 'mapa', 'الخريطة', 'map'),
            say('distantzia erreala', 'distancia real', 'المسافة الحقيقية', 'real distance'),
            say('unitateak', 'unidades', 'الوحدات', 'units')
        ],
        explanation: say(
            'Mapako distantzia eta distantzia erreala zuzenki proportzionalak dira: errealera joateko eskalaren zenbakiaz biderkatzen da, eta mapara itzultzeko zatitu. $1\\mathbin{:}50\\,000$ eskalan, mapako 1 cm 500 m dira. Amaieran, pasatu cm m edo km unitateetara.',
            'La distancia en el mapa y la real son directamente proporcionales: para ir a la real se multiplica por el número de la escala, y para volver al mapa se divide. En $1\\mathbin{:}50\\,000$, 1 cm del mapa son 500 m. Al final, pasa los cm a m o km.',
            'المسافة على الخريطة والمسافة الحقيقية متناسبتان طرديًا: للانتقال إلى الحقيقية نضرب في عدد المقياس، وللرجوع إلى الخريطة نقسم. في $1\\mathbin{:}50\\,000$ يساوي 1 سم على الخريطة 500 م. وفي النهاية حوّل السنتيمترات إلى أمتار أو كيلومترات لتتفق الوحدات.',
            'The distance on the map and the real distance are directly proportional: to get the real one, multiply by the scale number, and to go back to the map, divide. At $1\\mathbin{:}50\\,000$, 1 cm on the map is 500 m. At the end, change the cm into m or km units.'
        ),
        examplePrompt: say('$1\\mathbin{:}250$ eskalako plano batean, gela batek 1,6 cm-ko zabalera du. Zenbat neurtzen du benetan?', 'En un plano a escala $1\\mathbin{:}250$, una habitación mide 1,6 cm de ancho. ¿Cuánto mide en realidad?', 'في مخطط بمقياس $1\\mathbin{:}250$ عرض غرفة 1.6 سم. كم عرضها في الواقع؟', 'On a plan at scale $1\\mathbin{:}250$, a room is 1.6 cm wide. How wide is it really?'),
        example: same('$1{,}6\\cdot 250=400$'),
        exampleAnswer: say('400 cm, hau da, 4 m.', '400 cm, es decir, 4 m.', '400 سم، أي 4 م.', '400 cm, that is, 4 m.')
    },
    direct: {
        vocabulary: [
            say('magnitudeak', 'magnitudes', 'المقداران', 'quantities'),
            say('konstantea', 'constante', 'ثابت', 'constant'),
            say('unitatea', 'unidad', 'الوحدة', 'unit')
        ],
        explanation: say(
            'Bi magnitude zuzenki proportzionalak dira batetik bestera beti zenbaki beraz, $k$ proportzionaltasun-konstanteaz, biderkatzen denean: bata bikoiztean, bestea ere bai. Zatidura konstantea da, $\\frac{b}{a}=k$. Bi modutan ebazten da:',
            'Dos magnitudes son directamente proporcionales si de una a otra se multiplica siempre por el mismo número, $k$, la constante de proporcionalidad: si una se dobla, la otra también. El cociente es constante, $\\frac{b}{a}=k$. Se resuelve de dos maneras:',
            'يكون المقداران متناسبين طرديًا إذا ضربنا دائمًا في العدد نفسه $k$، وهو ثابت التناسب، للانتقال من أحدهما إلى الآخر: إذا تضاعف أحدهما تضاعف الآخر. حاصل القسمة ثابت $\\frac{b}{a}=k$. وتُحل المسألة بطريقتين:',
            'Two quantities are directly proportional if you always multiply by the same number, $k$, the constant of proportionality, to go from one to the other: if one doubles, so does the other. The quotient is constant, $\\frac{b}{a}=k$. It can be solved in two ways:'
        ),
        cases: [
            { title: say('Unitatera laburtuz', 'Reducción a la unidad', 'الإرجاع إلى الوحدة', 'Unitary method'), text: say('Lehenik unitate baten balioa, gero eskatutakoa.', 'Primero el valor de una unidad y luego el que se pide.', 'أولًا قيمة الوحدة ثم المطلوب.', 'First the value of one unit, then the one asked for.'), math: same('$\\frac{9{,}60}{8}=1{,}20\\ \\to\\ 1{,}20\\cdot 5=6$') },
            { title: say('Hiruko erregela', 'Regla de tres', 'قاعدة الثلاثة', 'Rule of three'), text: say('Proportzioa eta gurutzean biderkatu.', 'La proporción y multiplicar en cruz.', 'التناسب والضرب التبادلي.', 'The proportion and cross-multiplying.'), math: same('$\\frac{8}{5}=\\frac{9{,}60}{x}\\ \\to\\ x=\\frac{5\\cdot 9{,}60}{8}=6$') }
        ],
        examplePrompt: say('14 kaxatan 168 liburu sartzen dira. Zenbat liburu sartzen dira 9 kaxatan?', 'En 14 cajas caben 168 libros. ¿Cuántos caben en 9 cajas?', 'تتسع 14 علبة لـ 168 كتابًا. كم كتابًا تتسع 9 علب؟', '14 boxes hold 168 books. How many books do 9 boxes hold?'),
        example: same('$168\\div 14=12\\ \\to\\ 12\\cdot 9=108$'),
        exampleAnswer: say('108 liburu: kaxa bakoitzean 12.', '108 libros: 12 en cada caja.', '108 كتب: 12 في كل علبة.', '108 books: 12 in each box.')
    },
    inverse: {
        vocabulary: [
            say('biderkadura', 'producto', 'حاصل الضرب', 'product'),
            say('lan osoa', 'trabajo total', 'العمل الكلي', 'total work'),
            say('gurpil hortzdunak', 'ruedas dentadas', 'العجلات المسننة', 'gear wheels')
        ],
        explanation: say(
            'Bi magnitude alderantziz proportzionalak dira bata zenbaki batez biderkatzean bestea zenbaki horretaz zatitzen denean: langile bikoitzek denbora erdia behar dute. Biderkadura konstantea da, $a\\cdot b=k$: kalkulatu lehenik biderkadura hori (lan osoa) eta zatitu balio berriaz. Gurpil hortzdunetan ere bai: $12\\cdot 30=24\\cdot 15$.',
            'Dos magnitudes son inversamente proporcionales si, al multiplicar una por un número, la otra queda dividida entre él: el doble de obreros tarda la mitad. El producto es constante, $a\\cdot b=k$: calcula primero ese producto (el trabajo total) y divide entre el valor nuevo. Las ruedas dentadas también: $12\\cdot 30=24\\cdot 15$.',
            'يكون المقداران متناسبين عكسيًا إذا ضربنا أحدهما في عدد فانقسم الآخر عليه: ضعف العمال يحتاج إلى نصف الوقت. حاصل الضرب ثابت $a\\cdot b=k$: احسب أولًا هذا الحاصل (العمل الكلي) ثم اقسمه على القيمة الجديدة. والعجلات المسننة كذلك: $12\\cdot 30=24\\cdot 15$.',
            'Two quantities are inversely proportional if, when one is multiplied by a number, the other is divided by it: twice the workers take half the time. The product is constant, $a\\cdot b=k$: first work out that product (the total work) and divide by the new value. Gear wheels too: $12\\cdot 30=24\\cdot 15$.'
        ),
        examplePrompt: say('Minutuko 12 L ematen dituen txorrota batekin, depositu bat 45 minututan betetzen da. Zenbat behar du minutuko 20 L ematen dituen batekin?', 'Con un grifo de 12 L por minuto, un depósito se llena en 45 minutos. ¿Cuánto tarda con uno de 20 L por minuto?', 'بصنبور يصب 12 لترًا في الدقيقة يمتلئ خزان في 45 دقيقة. كم يستغرق بصنبور يصب 20 لترًا في الدقيقة؟', 'With a tap pouring 12 L a minute, a tank fills in 45 minutes. How long does it take with one pouring 20 L a minute?'),
        example: same('$12\\cdot 45=540\\ \\to\\ 540\\div 20=27$'),
        exampleAnswer: say('27 minutu: emari handiagoa, denbora gutxiago.', '27 minutos: más caudal, menos tiempo.', '27 دقيقة: تدفق أكبر، وقت أقل.', '27 minutes: more flow, less time.')
    },
    graphs: {
        definitions: [
            {
                term: say('Hiperbola', 'Hipérbola', 'القطع الزائد', 'Hyperbola'),
                meaning: say('Alderantzizko erlazio baten kurba: bi ardatzetara hurbiltzen da, inoiz ukitu gabe.', 'La curva de una relación inversa: se acerca a los dos ejes sin tocarlos nunca.', 'منحنى العلاقة العكسية: يقترب من المحورين دون أن يلمسهما أبدًا.', 'The curve of an inverse relation: it gets closer to both axes without ever touching them.')
            }
        ],
        vocabulary: [
            say('taula', 'tabla', 'الجدول', 'table'),
            say('jatorria', 'origen', 'الأصل', 'origin'),
            say('zatidura', 'cociente', 'حاصل القسمة', 'quotient')
        ],
        explanation: say(
            'Taula batean, kalkulatu balio bikote bakoitzaren zatidura eta biderkadura. Grafikoan ere ikusten da: $y=2x$ zuzena jatorritik pasatzen den zuzen bat da, eta $x\\cdot y=12$ alderantzizkoa hiperbola bat.',
            'En una tabla, calcula el cociente y el producto de cada pareja de valores. En la gráfica también se ve: la directa $y=2x$ es una recta que pasa por el origen, y la inversa $x\\cdot y=12$, una hipérbola.',
            'في الجدول احسب حاصل القسمة وحاصل الضرب لكل زوج من القيم. ويظهر ذلك في الرسم أيضًا: الطردي $y=2x$ مستقيم يمر بالأصل، والعكسي $x\\cdot y=12$ قطع زائد.',
            'In a table, work out the quotient and the product of each pair of values. The graph shows it too: the direct $y=2x$ is a line through the origin, and the inverse $x\\cdot y=12$ is a hyperbola.'
        ),
        cases: [
            { title: say('Zuzena', 'Directa', 'طردي', 'Direct'), text: say('Zatidura konstantea; jatorritik pasatzen den zuzena.', 'Cociente constante; recta por el origen.', 'حاصل قسمة ثابت؛ مستقيم يمر بالأصل.', 'Constant quotient; a line through the origin.'), math: same('$\\frac{y}{x}=k$') },
            { title: say('Alderantzizkoa', 'Inversa', 'عكسي', 'Inverse'), text: say('Biderkadura konstantea; hiperbola.', 'Producto constante; hipérbola.', 'حاصل ضرب ثابت؛ قطع زائد.', 'Constant product; a hyperbola.'), math: same('$x\\cdot y=k$') },
            { title: say('Bat ere ez', 'Ninguna', 'لا هذا ولا ذاك', 'Neither'), text: say('Zatidura eta biderkadura aldatzen dira. Taxi baten prezioa: 3 € hasieran eta 1 € km bakoitzeko.', 'Cambian el cociente y el producto. El precio de un taxi: 3 € de bajada y 1 € por km.', 'يتغير حاصل القسمة وحاصل الضرب. أجرة سيارة الأجرة: 3 € في البداية و1 € لكل كم.', 'Both the quotient and the product change. A taxi fare: €3 to start and €1 per km.'), math: same('$\\frac{4}{1}\\neq\\frac{5}{2}$') }
        ],
        examplePrompt: say('Taula: $x$: 1, 4, 10; $y$: 3, 12, 30. Zer erlazio da?', 'Tabla: $x$: 1, 4, 10; $y$: 3, 12, 30. ¿Qué relación es?', 'جدول: $x$: 1، 4، 10؛ $y$: 3، 12، 30. ما نوع العلاقة؟', 'Table: $x$: 1, 4, 10; $y$: 3, 12, 30. What relation is it?'),
        example: same('$\\frac{3}{1}=\\frac{12}{4}=\\frac{30}{10}=3$'),
        exampleAnswer: say('Zuzena, $k=3$ izanik: haren grafikoa $y=3x$ zuzena da.', 'Directa, con $k=3$: su gráfica es la recta $y=3x$.', 'طردي مع $k=3$: رسمه المستقيم $y=3x$.', 'Direct, with $k=3$: its graph is the line $y=3x$.')
    },
    compound: {
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('zatikia', 'fracción', 'الكسر', 'fraction'),
            say('finko', 'fijas', 'ثابتة', 'fixed')
        ],
        explanation: say(
            'Hiru magnitude edo gehiago daude. Konparatu bakoitza ezezagunarekin, besteak finko utzita: zuzena bada, haren zatikia berria/zaharra da; alderantzizkoa bada, zaharra/berria. Ezezaguna haren balio zaharra bider zatiki guztiak da.',
            'Intervienen tres o más magnitudes. Compara cada una con la incógnita, dejando fijas las demás: si es directa, su fracción es nuevo/viejo; si es inversa, viejo/nuevo. La incógnita es su valor viejo por todas las fracciones.',
            'تدخل ثلاثة مقادير أو أكثر. قارن كل مقدار بالمجهول وتبقى البقية ثابتة: إذا كان طرديًا فكسره الجديد/القديم، وإذا كان عكسيًا فالقديم/الجديد. والمجهول قيمته القديمة مضروبة في كل الكسور.',
            'Three or more quantities take part. Compare each one with the unknown, keeping the others fixed: if it is direct, its fraction is new/old; if it is inverse, old/new. The unknown is its old value times all the fractions.'
        ),
        examplePrompt: say('3 txorrotak 2 depositu 6 orduan betetzen dituzte. Zenbat behar dute 4 txorrotak 5 depositu betetzeko?', '3 grifos llenan 2 depósitos en 6 horas. ¿Cuánto tardan 4 grifos en llenar 5 depósitos?', 'تملأ 3 صنابير خزانين في 6 ساعات. كم تستغرق 4 صنابير لملء 5 خزانات؟', '3 taps fill 2 tanks in 6 hours. How long do 4 taps take to fill 5 tanks?'),
        example: same('$6\\cdot\\frac{3}{4}\\cdot\\frac{5}{2}=11{,}25$'),
        exampleAnswer: say('11,25 ordu, hau da, 11 h 15 min. Txorrotak: alderantzizkoa, $\\frac{3}{4}$; deposituak: zuzena, $\\frac{5}{2}$.', '11,25 horas, es decir, 11 h 15 min. Grifos: inversa, $\\frac{3}{4}$; depósitos: directa, $\\frac{5}{2}$.', '11.25 ساعة، أي 11 س 15 د. الصنابير: عكسي $\\frac{3}{4}$؛ الخزانات: طردي $\\frac{5}{2}$.', '11.25 hours, that is, 11 h 15 min. Taps: inverse, $\\frac{3}{4}$; tanks: direct, $\\frac{5}{2}$.'),
        why: {
            text: say(
                'Magnitude bat aldatzen da aldi bakoitzean. Makinekin: 5 makinaren ordez 4, denbora gehiago, $8\\cdot\\frac{5}{4}=10$ h; eta 400 piezaren ordez 600, $10\\cdot\\frac{600}{400}=15$ h. Bi pausoak biderketa bakarrean.',
                'Se cambia una magnitud cada vez. Con las máquinas: con 4 en vez de 5 se tarda más, $8\\cdot\\frac{5}{4}=10$ h; y con 600 piezas en vez de 400, $10\\cdot\\frac{600}{400}=15$ h. Los dos pasos, en una sola multiplicación.',
                'نغيّر مقدارًا واحدًا في كل مرة. مع الآلات: بـ 4 بدل 5 نستغرق وقتًا أطول $8\\cdot\\frac{5}{4}=10$ س، وبـ 600 قطعة بدل 400، $10\\cdot\\frac{600}{400}=15$ س. والخطوتان في ضرب واحد.',
                'Change one quantity at a time. With the machines: with 4 instead of 5 it takes longer, $8\\cdot\\frac{5}{4}=10$ h; and with 600 pieces instead of 400, $10\\cdot\\frac{600}{400}=15$ h. Both steps in a single multiplication.'
            ),
            math: same('$8\\cdot\\frac{5}{4}=10\\qquad 10\\cdot\\frac{600}{400}=15$')
        }
    },
    'direct-share': {
        vocabulary: [
            say('batura', 'suma', 'المجموع', 'sum'),
            say('zati bat', 'una parte', 'الجزء الواحد', 'one part'),
            say('kopurua', 'cantidad', 'الكمية', 'amount')
        ],
        explanation: say(
            'Banaketa zuzenean, zenbaki handiagoari zati handiagoa dagokio. Batu zenbakiak, zatitu kopurua batura horretaz (zati baten balioa) eta biderkatu bakoitzaren zenbakiaz: 180 banatzean 2, 5 eta 8 zenbakiekiko, zati batek $180\\div 15=12$ balio du.',
            'En un reparto directo, al número mayor le toca la parte mayor. Suma los números, divide la cantidad entre esa suma (el valor de una parte) y multiplica por el número de cada uno: al repartir 180 entre 2, 5 y 8, una parte vale $180\\div 15=12$.',
            'في التوزيع الطردي ينال العدد الأكبر الحصة الأكبر. اجمع الأعداد، واقسم الكمية على هذا المجموع (قيمة الجزء الواحد)، ثم اضرب في عدد كل واحد: عند توزيع 180 على 2 و5 و8 تكون قيمة الجزء الواحد $180\\div 15=12$.',
            'In a direct share, the bigger number gets the bigger part. Add the numbers, divide the amount by that sum (the value of one part) and multiply by each one’s number: sharing 180 among 2, 5 and 8, one part is worth $180\\div 15=12$.'
        ),
        examplePrompt: say('6, 9 eta 15 urteko hiru anaiek 600 € banatzen dituzte adinaren arabera. Zenbat dagokio bakoitzari?', 'Tres hermanos de 6, 9 y 15 años se reparten 600 € según su edad. ¿Cuánto le toca a cada uno?', 'يتقاسم ثلاثة إخوة أعمارهم 6 و9 و15 سنة مبلغ 600 € حسب أعمارهم. كم ينال كل واحد؟', 'Three siblings aged 6, 9 and 15 share €600 according to their ages. How much does each get?'),
        example: same('$600\\div 30=20\\ \\to\\ 120,\\ 180,\\ 300$'),
        exampleAnswer: say('120 €, 180 € eta 300 €: $120+180+300=600$.', '120 €, 180 € y 300 €: $120+180+300=600$.', '120 € و180 € و300 €: $120+180+300=600$.', '€120, €180 and €300: $120+180+300=600$.')
    },
    'inverse-share': {
        vocabulary: [
            say('banaketa', 'reparto', 'التوزيع', 'share'),
            say('alderantzizkoak', 'inversos', 'المقلوبات', 'reciprocals'),
            say('postua', 'puesto', 'المرتبة', 'place')
        ],
        explanation: say(
            'Banaketa alderantzizkoan, zenbaki handiagoari zati txikiagoa dagokio. Banatu zuzenki alderantzizkoekiko; zatikirik ez erabiltzeko, biderkatu horiek izendatzaileen m.k.t. zenbakiaz. 1., 2. eta 3. postuetarako: $1,\\ \\frac{1}{2},\\ \\frac{1}{3}\\ \\to\\ 6,\\ 3,\\ 2$.',
            'En un reparto inverso, al número mayor le toca la parte menor. Reparte de forma directa a los inversos; para no usar fracciones, multiplícalos por el m.c.m. de los denominadores. Para los puestos 1, 2 y 3: $1,\\ \\frac{1}{2},\\ \\frac{1}{3}\\ \\to\\ 6,\\ 3,\\ 2$.',
            'في التوزيع العكسي ينال العدد الأكبر الحصة الأصغر. وزّع توزيعًا طرديًا على المقلوبات، ولتجنّب الكسور اضربها في المضاعف المشترك الأصغر للمقامات. للمرتبة 1 و2 و3: $1,\\ \\frac{1}{2},\\ \\frac{1}{3}\\ \\to\\ 6,\\ 3,\\ 2$.',
            'In an inverse share, the bigger number gets the smaller part. Share directly among the reciprocals; to avoid fractions, multiply them by the LCM of the denominators. For places 1, 2 and 3: $1,\\ \\frac{1}{2},\\ \\frac{1}{3}\\ \\to\\ 6,\\ 3,\\ 2$.'
        ),
        examplePrompt: say('Banatu 150 € bi ikasleren artean, haien hutsegiteekiko alderantziz proportzionalean: 3 eta 2 hutsegite.', 'Reparte 150 € entre dos alumnos de forma inversamente proporcional a sus faltas, 3 y 2.', 'وزّع 150 € على تلميذين توزيعًا عكسيًا حسب أخطائهما، 3 و2.', 'Share €150 between two students in inverse proportion to their mistakes, 3 and 2.'),
        example: same('$\\frac{1}{3},\\ \\frac{1}{2}\\ \\to\\ 2,\\ 3\\qquad 150\\div 5=30$'),
        exampleAnswer: say('3 hutsegite dituenak 60 €, eta 2 dituenak 90 €.', '60 € para quien tiene 3 faltas y 90 € para quien tiene 2.', '60 € لصاحب الأخطاء الثلاثة و90 € لصاحب الخطأين.', '€60 for the one with 3 mistakes and €90 for the one with 2.')
    },
    'percent-index': {
        definitions: [
            {
                term: say('Aldakuntza-indizea', 'Índice de variación', 'مؤشر التغير', 'Index of change'),
                meaning: say('Amaierako kopurua lortzeko hasierakoa biderkatzen duen zenbakia.', 'El número por el que se multiplica la cantidad inicial para obtener la final.', 'العدد الذي نضرب فيه الكمية الأصلية للحصول على النهائية.', 'The number you multiply the original amount by to get the final one.')
            }
        ],
        vocabulary: [
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage'),
            say('hasierakoa', 'inicial', 'الأصلية', 'original'),
            say('amaierakoa', 'final', 'النهائية', 'final')
        ],
        explanation: say(
            'Ehuneko bat izendatzailea 100 duen arrazoia da: % 15 $\\frac{15}{100}=0{,}15$ da. Amaierako kopurua hasierakoa bider aldakuntza-indizea da: $1+\\frac{r}{100}$, % $r$ igotzen bada, eta $1-\\frac{r}{100}$, jaisten bada.',
            'Un porcentaje es una razón con denominador 100: el 15 % es $\\frac{15}{100}=0{,}15$. La cantidad final es la inicial por el índice de variación: $1+\\frac{r}{100}$ si aumenta un $r$ %, y $1-\\frac{r}{100}$ si disminuye.',
            'النسبة المئوية نسبة مقامها 100: ‏15٪ هي $\\frac{15}{100}=0{,}15$. والكمية النهائية هي الأصلية مضروبة في مؤشر التغير: $1+\\frac{r}{100}$ إذا زادت بنسبة $r$٪، و$1-\\frac{r}{100}$ إذا نقصت.',
            'A percentage is a ratio with denominator 100: 15% is $\\frac{15}{100}=0{,}15$. The final amount is the original times the index of change: $1+\\frac{r}{100}$ if it goes up by $r$%, and $1-\\frac{r}{100}$ if it goes down.'
        ),
        cases: [
            { title: say('Igoera', 'Aumento', 'زيادة', 'Increase'), text: say('% 12 igo: indizea 1,12.', 'Subir un 12 %: índice 1,12.', 'زيادة 12٪: المؤشر 1.12.', 'Up 12%: index 1.12.'), math: same('$250\\cdot 1{,}12=280$') },
            { title: say('Jaitsiera', 'Disminución', 'نقصان', 'Decrease'), text: say('% 30 jaitsi: indizea 0,7.', 'Bajar un 30 %: índice 0,7.', 'تخفيض 30٪: المؤشر 0.7.', 'Down 30%: index 0.7.'), math: same('$80\\cdot 0{,}7=56$') },
            { title: say('Hasierakoa', 'La inicial', 'الأصلية', 'The original'), text: say('Zatitu amaierakoa indizeaz.', 'Divide la final entre el índice.', 'اقسم النهائية على المؤشر.', 'Divide the final amount by the index.'), math: same('$56\\mathbin{:}0{,}7=80$') }
        ],
        examplePrompt: say('Herri batek 3500 biztanle zituen, eta % 8 galdu ditu. Zenbat ditu orain?', 'Un pueblo tenía 3500 habitantes y ha perdido un 8 %. ¿Cuántos tiene ahora?', 'كان في قرية 3500 نسمة وفقدت 8٪ منهم. كم نسمة فيها الآن؟', 'A village had 3,500 inhabitants and has lost 8%. How many does it have now?'),
        example: same('$3500\\cdot 0{,}92=3220$'),
        exampleAnswer: say('3220 biztanle: % 8 jaisteko indizea $1-0{,}08=0{,}92$ da.', '3220 habitantes: el índice de una bajada del 8 % es $1-0{,}08=0{,}92$.', '3220 نسمة: مؤشر النقصان بنسبة 8٪ هو $1-0{,}08=0{,}92$.', '3,220 inhabitants: the index for a drop of 8% is $1-0{,}08=0{,}92$.'),
        why: {
            text: say(
                '% 12 igotzea % 100 mantendu eta % 12 gehitzea da: guztira % 112, hau da, $\\frac{112}{100}=1{,}12$. % 15 jaisteak % 85 uzten du: $0{,}85$.',
                'Subir un 12 % es quedarse con el 100 % y añadir el 12 %: en total, el 112 %, que es $\\frac{112}{100}=1{,}12$. Bajar un 15 % deja el 85 %: $0{,}85$.',
                'الزيادة 12٪ تعني أن نحتفظ بـ 100٪ ونضيف 12٪: المجموع 112٪ أي $\\frac{112}{100}=1{,}12$. والنقصان 15٪ يترك 85٪: $0{,}85$.',
                'Going up 12% means keeping the 100% and adding 12%: 112% in all, which is $\\frac{112}{100}=1{,}12$. Going down 15% leaves 85%: $0{,}85$.'
            ),
            math: same('$100+12=112\\ \\to\\ \\frac{112}{100}=1{,}12$')
        }
    },
    chained: {
        vocabulary: [
            say('indize osoa', 'índice total', 'المؤشر الكلي', 'overall index'),
            say('ehunekoa', 'porcentaje', 'نسبة مئوية', 'percentage'),
            say('igoera', 'aumento', 'زيادة', 'increase')
        ],
        explanation: say(
            'Ehuneko bat bestearen atzetik aplikatzean, bigarrena geratu den kopuruari aplikatzen zaio, ez hasierakoari. Indizeak biderkatzen dira: % 10 igo eta jaistean, $1{,}1\\cdot 0{,}9=0{,}99$, % 1 gutxiago. Indize osoa 1 baino handiagoa bada, igoera dago; txikiagoa bada, jaitsiera.',
            'Cuando se aplica un porcentaje detrás de otro, el segundo se aplica a la cantidad que quedó, no a la inicial. Se multiplican los índices: subir y bajar un 10 % da $1{,}1\\cdot 0{,}9=0{,}99$, un 1 % menos. Si el índice total es mayor que 1, hay aumento; si es menor, disminución.',
            'عند تطبيق نسبة مئوية بعد أخرى تُطبَّق الثانية على الكمية التي بقيت لا على الأصلية. فنضرب المؤشرات: الزيادة ثم النقصان 10٪ تعطي $1{,}1\\cdot 0{,}9=0{,}99$، أي أقل بـ 1٪. وإذا كان المؤشر الكلي أكبر من 1 فهناك زيادة، وإذا كان أصغر فنقصان.',
            'When one percentage is applied after another, the second is applied to what was left, not to the original. Multiply the indices: up and down 10% gives $1{,}1\\cdot 0{,}9=0{,}99$, 1% less. If the overall index is greater than 1, there is an increase; if less, a decrease.'
        ),
        examplePrompt: say('1500 €-ko soldata bat % 4 igo da urte batean eta % 5 hurrengoan. Zenbatekoa da orain?', 'Un sueldo de 1500 € sube un 4 % un año y un 5 % el siguiente. ¿Cuánto es ahora?', 'راتب قدره 1500 € ارتفع 4٪ في سنة و5٪ في التالية. كم صار الآن؟', 'A salary of €1,500 goes up 4% one year and 5% the next. How much is it now?'),
        example: same('$1500\\cdot 1{,}04\\cdot 1{,}05=1638$'),
        exampleAnswer: say('1638 €: guztira % 9,2 igo da, ez % 9.', '1638 €: un aumento total del 9,2 %, no del 9 %.', '1638 €: زيادة كلية قدرها 9.2٪ لا 9٪.', '€1,638: an overall increase of 9.2%, not 9%.')
    },
    interest: {
        definitions: [
            {
                term: say('Interes-tasa', 'Rédito', 'سعر الفائدة', 'Interest rate'),
                meaning: say('Bankuak kapitalagatik urtero ordaintzen duen ehunekoa.', 'El porcentaje que paga el banco cada año por el capital.', 'النسبة المئوية التي يدفعها المصرف كل سنة على رأس المال.', 'The percentage the bank pays each year on the capital.')
            }
        ],
        vocabulary: [
            say('kapitala', 'capital', 'رأس المال', 'capital'),
            say('interesa', 'interés', 'الفائدة', 'interest'),
            say('hilabeteak', 'meses', 'الأشهر', 'months')
        ],
        explanation: say(
            'Interes bakunean, bankuak urtero ehuneko bera ordaintzen du, $r$ interes-tasa, $C$ kapital beraren gainean: 8000 € % 5 interesarekin, urtero 400 €. $t$ urtetan, $I=\\frac{C\\cdot r\\cdot t}{100}$, $t$ urtetan neurtuta: 6 hilabete 0,5 urte dira. Amaieran $C+I$ dago.',
            'En el interés simple, el banco paga cada año el mismo porcentaje, el rédito $r$, del mismo capital $C$: con 8000 € al 5 %, 400 € cada año. En $t$ años, $I=\\frac{C\\cdot r\\cdot t}{100}$, con $t$ en años: 6 meses son 0,5 años. Al final se tiene $C+I$.',
            'في الفائدة البسيطة يدفع المصرف كل سنة النسبة نفسها، سعر الفائدة $r$، على رأس المال نفسه $C$: بـ 8000 € بنسبة 5٪ يدفع 400 € كل سنة. وفي $t$ سنة $I=\\frac{C\\cdot r\\cdot t}{100}$، والزمن $t$ بالسنوات: 6 أشهر تساوي 0.5 سنة. وفي النهاية يصير المال $C+I$.',
            'With simple interest, the bank pays the same percentage each year, the interest rate $r$, on the same capital $C$: €8,000 at 5% earns €400 a year. In $t$ years, $I=\\frac{C\\cdot r\\cdot t}{100}$, with $t$ in years: 6 months are 0.5 years. At the end you have $C+I$.'
        ),
        examplePrompt: say('Zenbat interes ematen dute 3000 €-k % 2 interesarekin 18 hilabetez?', '¿Qué interés dan 3000 € al 2 % durante 18 meses?', 'كم فائدة يعطي مبلغ 3000 € بنسبة 2٪ لمدة 18 شهرًا؟', 'What interest does €3,000 earn at 2% for 18 months?'),
        example: same('$\\frac{3000\\cdot 2\\cdot 1{,}5}{100}=90$'),
        exampleAnswer: say('90 €: 18 hilabete 1,5 urte dira.', '90 €: 18 meses son 1,5 años.', '90 €: ‏18 شهرًا تساوي 1.5 سنة.', '€90: 18 months are 1.5 years.')
    },
    mixtures: {
        definitions: [
            {
                term: say('Batez besteko haztatua', 'Media ponderada', 'المتوسط المرجّح', 'Weighted mean'),
                meaning: say('Balio bakoitzetik zenbat dagoen kontuan hartzen duen batez bestekoa: prezio bakoitzak kiloak adina aldiz balio du.', 'La media que tiene en cuenta cuánto hay de cada valor: cada precio cuenta tantas veces como kilos tiene.', 'متوسط يراعي مقدار كل قيمة: كل سعر يُحسب بعدد كيلوغراماته.', 'A mean that takes into account how much there is of each value: each price counts as many times as its kilos.')
            }
        ],
        vocabulary: [
            say('osagaia', 'ingrediente', 'المكوّن', 'ingredient'),
            say('nahasketa', 'mezcla', 'الخليط', 'mixture'),
            say('prezioa', 'precio', 'السعر', 'price')
        ],
        explanation: say(
            'Nahasketaren kilo baten prezioa ez da bi prezioen batez bestekoa: bakoitzetik zenbat dagoen araberakoa da. Kalkulatu osagai bakoitzaren balioa (kiloak · prezioa), batu, eta zatitu kilo guztiez. Beti bi prezioen artean geratzen da, gehien dagoenaren preziotik hurbilago.',
            'El precio de un kilo de mezcla no es la media de los dos precios: depende de cuánto hay de cada uno. Calcula el valor de cada ingrediente (kilos · precio), súmalos y divide entre los kilos totales. Siempre queda entre los dos precios, más cerca del que más hay.',
            'سعر كيلوغرام الخليط ليس متوسط السعرين: يتوقف على كمية كل منهما. احسب قيمة كل مكوّن (الكيلوغرامات · السعر)، واجمعها، واقسم على الكيلوغرامات كلها. ويقع دائمًا بين السعرين، أقرب إلى سعر المكوّن الأكثر.',
            'The price of a kilo of the mixture is not the mean of the two prices: it depends on how much there is of each. Work out the value of each ingredient (kilos · price), add them and divide by the total kilos. It always lies between the two prices, closer to the one there is more of.'
        ),
        examplePrompt: say('0,80 €/kg-ko 30 kg pentsu nahasten dira 1,20 €/kg-ko 10 kg-rekin. Zenbat balio du kilo batek?', 'Se mezclan 30 kg de pienso de 0,80 €/kg con 10 kg de 1,20 €/kg. ¿Cuánto vale un kilo?', 'نخلط 30 كغ من العلف بسعر 0.80 € للكيلوغرام مع 10 كغ بسعر 1.20 €. كم ثمن الكيلوغرام؟', '30 kg of feed at €0.80/kg is mixed with 10 kg at €1.20/kg. How much is a kilo worth?'),
        example: same('$\\frac{30\\cdot 0{,}80+10\\cdot 1{,}20}{40}=\\frac{36}{40}=0{,}90$'),
        exampleAnswer: say('0,90 €/kg, 0,80 € prezioetik hurbilago, pentsu merke gehiago dagoelako.', '0,90 €/kg, más cerca de 0,80 €, porque hay más pienso barato.', '0.90 € للكيلوغرام، أقرب إلى 0.80 € لأن العلف الرخيص أكثر.', '€0.90/kg, closer to €0.80, because there is more of the cheap feed.'),
        why: {
            text: say(
                'Kiloz kilo ordaintzea da: 8 €-ko 12 kg eta 13 €-ko 8 kg 200 € dira, 10 €-ko 20 kg bezala. Horregatik balio du prezio bakoitzak kiloak adina aldiz.',
                'Es pagar kilo a kilo: 12 kg a 8 € y 8 kg a 13 € cuestan 200 €, lo mismo que 20 kg a 10 €. Por eso cada precio cuenta tantas veces como kilos tiene.',
                'إنه دفع كيلوغرامًا بعد كيلوغرام: 12 كغ بـ 8 € و8 كغ بـ 13 € تكلّف 200 €، مثل 20 كغ بـ 10 €. لذلك يُحسب كل سعر بعدد كيلوغراماته.',
                'It is paying kilo by kilo: 12 kg at €8 and 8 kg at €13 cost €200, the same as 20 kg at €10. That is why each price counts as many times as its kilos.'
            ),
            math: same('$12\\cdot 8+8\\cdot 13=200=20\\cdot 10$')
        }
    },
    motion: {
        vocabulary: [
            say('abiadura', 'velocidad', 'السرعة', 'speed'),
            say('distantzia', 'distancia', 'المسافة', 'distance'),
            say('denbora', 'tiempo', 'الزمن', 'time')
        ],
        explanation: say(
            'Abiadura konstantean, $d=v\\cdot t$. Bi mugikari hurbiltzen edo atzetik doazenean, haien arteko distantzia orduro haien abiaduren batura edo kendura aldatzen da. Non elkartzen diren jakiteko, biderkatu denbora horietako baten abiaduraz.',
            'A velocidad constante, $d=v\\cdot t$. Cuando dos móviles se acercan o se persiguen, la distancia entre ellos cambia cada hora la suma o la diferencia de sus velocidades. Para saber dónde se juntan, multiplica el tiempo por la velocidad de uno.',
            'بسرعة ثابتة $d=v\\cdot t$. وعندما يتقارب متحركان أو يلحق أحدهما بالآخر تتغير المسافة بينهما كل ساعة بمجموع سرعتيهما أو بفرقهما. ولمعرفة مكان اللقاء اضرب الزمن في سرعة أحدهما.',
            'At constant speed, $d=v\\cdot t$. When two moving objects approach or chase each other, the distance between them changes each hour by the sum or the difference of their speeds. To know where they meet, multiply the time by one of the speeds.'
        ),
        cases: [
            { title: say('Elkarrengana', 'Al encuentro', 'متقابلان', 'Towards each other'), text: say('Abiadurak batu.', 'Se suman las velocidades.', 'تُجمع السرعتان.', 'Add the speeds.'), math: same('$t=\\frac{d}{v_{1}+v_{2}}$') },
            { title: say('Atzetik', 'Alcance', 'اللحاق', 'Catching up'), text: say('Abiadurak kendu.', 'Se restan las velocidades.', 'تُطرح السرعتان.', 'Subtract the speeds.'), math: same('$t=\\frac{d}{v_{1}-v_{2}}$') }
        ],
        examplePrompt: say('Txirrindulari bat 18 km/h-an abiatzen da, eta 2 ordu geroago moto bat atzetik, 54 km/h-an. Zenbat behar du harrapatzeko?', 'Un ciclista sale a 18 km/h y, 2 horas después, sale detrás una moto a 54 km/h. ¿Cuánto tarda en alcanzarlo?', 'ينطلق درّاج بسرعة 18 كم/س، وبعد ساعتين تنطلق خلفه دراجة نارية بسرعة 54 كم/س. كم تستغرق للحاق به؟', 'A cyclist sets off at 18 km/h and, 2 hours later, a motorbike sets off after them at 54 km/h. How long does it take to catch up?'),
        example: same('$\\frac{36}{54-18}=1$'),
        exampleAnswer: say('Ordu bat: 36 km aurrea darama, eta motoa orduro 36 km hurbiltzen da.', '1 hora: le lleva 36 km de ventaja, y la moto se acerca 36 km cada hora.', 'ساعة واحدة: يسبقها بـ 36 كم، وتقترب الدراجة النارية 36 كم كل ساعة.', '1 hour: the cyclist is 36 km ahead, and the motorbike gets 36 km closer each hour.'),
        why: {
            text: say(
                'Ordu batean, batek 70 km egiten ditu eta besteak 110 km, bata bestearengana: biek batera 180 km laburtu dute distantzia. Horregatik, elkarrengana doazenean, bi abiadurak batera kontatzen dira.',
                'En una hora, uno recorre 70 km y el otro 110 km hacia él: entre los dos han acortado la distancia 180 km. Por eso, al ir al encuentro, cuentan las dos velocidades juntas.',
                'في ساعة يقطع أحدهما 70 كم والآخر 110 كم نحوه: معًا قصّرا المسافة 180 كم. لذلك عندما يتجهان أحدهما نحو الآخر تُحسب السرعتان معًا.',
                'In one hour, one covers 70 km and the other 110 km towards it: together they have cut the distance by 180 km. That is why, when they head towards each other, both speeds count together.'
            ),
            math: same('$70+110=180$')
        }
    },
    work: {
        vocabulary: [
            say('txorrota', 'grifo', 'الصنبور', 'tap'),
            say('hustubidea', 'desagüe', 'المصرف', 'drain'),
            say('depositua', 'depósito', 'الخزان', 'tank')
        ],
        explanation: say(
            'Txorrota batek depositu bat 3 orduan betetzen badu, ordu batean $\\frac{1}{3}$ betetzen du. Bi txorrota batera daudenean, ordu bateko zatiak batzen dira: $\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$; beraz, 2 ordu behar dituzte. Hustubide batek kendu egiten du: haren zatia kentzen da. Biak batera beti behar da azkarrenak bakarrik baino gutxiago.',
            'Si un grifo llena un depósito en 3 horas, en una hora llena $\\frac{1}{3}$. Con dos grifos juntos se suman las partes de una hora: $\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$, así que tardan 2 horas. Un desagüe quita: su parte se resta. Juntos siempre se tarda menos que el más rápido solo.',
            'إذا ملأ صنبور خزانًا في 3 ساعات فإنه يملأ في ساعة $\\frac{1}{3}$. ومع صنبورين معًا تُجمع أجزاء الساعة: $\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$، فيحتاجان إلى ساعتين. والمصرف يُنقص: يُطرح جزؤه. ومعًا نحتاج دائمًا إلى وقت أقل من الأسرع وحده.',
            'If a tap fills a tank in 3 hours, in one hour it fills $\\frac{1}{3}$. With two taps together, add the parts of one hour: $\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$, so they take 2 hours. A drain takes away: its part is subtracted. Together it always takes less than the faster one alone.'
        ),
        examplePrompt: say('Txorrota batek igerileku bat 6 orduan betetzen du, eta hustubide batek 10 orduan husten du. Biak irekita, zenbat behar du betetzeko?', 'Un grifo llena una piscina en 6 horas y un desagüe la vacía en 10. Con los dos abiertos, ¿cuánto tarda en llenarse?', 'يملأ صنبور مسبحًا في 6 ساعات ويفرغه مصرف في 10 ساعات. إذا فُتحا معًا فكم يستغرق امتلاؤه؟', 'A tap fills a pool in 6 hours and a drain empties it in 10. With both open, how long does it take to fill?'),
        example: same('$\\frac{1}{6}-\\frac{1}{10}=\\frac{1}{15}\\ \\to\\ 15$'),
        exampleAnswer: say('15 ordu: hustubidearen zatia kendu egiten da.', '15 horas: la parte del desagüe se resta.', '15 ساعة: يُطرح جزء المصرف.', '15 hours: the drain’s part is subtracted.')
    }
}

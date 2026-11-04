import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import { notation } from '../dbh2-zatigarritasuna/notation.ts'
import type { FractionsIntroTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zatikiak · 1. DBH — what each lesson tells: the new words (definitions),
   the key words in four languages (vocabulary), a short explanation, the
   example as an exercise («Another example», or «Example» in the lessons of
   facts) and, in three lessons, «Why does it work?». Plain data so the tests
   can import it; lessons.tsx merges it into the topics. The explanation
   keeps the numbers that its drawing shows (the cheese box, the sponge cake,
   3/4 as a division, 11/8 on the line, 3/4 = 6/8 = 9/12, 6/15 = 2/5, 2/7 +
   3/7, the area of 2/3 · 3/4); the drawings that solve «Let's solve» wait
   after the steps. m.c.d. / m.c.m. go through notation() in the formulas
   and each language names them its own way in the words. The example uses
   numbers of its own, never those of «Let's solve», of «Check it» or of the
   typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const fractionsIntroLessonTexts: Record<FractionsIntroTopicId, LessonTexts> = {
    /* ---------- 1. Meaning ---------- */
    what: {
        vocabulary: [
            say('zatiki-marra', 'raya de fracción', 'خط الكسر', 'fraction bar'),
            say('zati berdinak', 'partes iguales', 'أجزاء متساوية', 'equal parts'),
            say('erdia', 'mitad', 'النصف', 'half')
        ],
        definitions: [
            {
                term: say('Zenbakitzailea eta izendatzailea', 'Numerador y denominador', 'البسط والمقام', 'Numerator and denominator'),
                meaning: say('$\\frac{a}{b}$ zatikian, $b$ izendatzaileak esaten du osoa zenbat zati berdinetan banatzen den, eta $a$ zenbakitzaileak zenbat hartzen diren.', 'En $\\frac{a}{b}$, el denominador $b$ dice en cuántas partes iguales se divide el total, y el numerador $a$, cuántas se toman.', 'في $\\frac{a}{b}$ يدل المقام $b$ على عدد الأجزاء المتساوية للكل، ويدل البسط $a$ على عدد الأجزاء المأخوذة.', 'In $\\frac{a}{b}$, the denominator $b$ says into how many equal parts the whole is split, and the numerator $a$ how many are taken.')
            }
        ],
        explanation: say(
            'Juanek 8 zatiko gazta-kutxa bat ireki du, eta 3 jan ditu: kutxaren $\\frac{3}{8}$ jan ditu, «zortzitik hiru». Zatiki batek bi gai ditu, zatiki-marrak bereizita. Egunero erabiltzen ditugu: erdia, herena, bi bosten…',
            'Juan abre una caja de quesitos de 8 porciones y se come 3: se ha comido $\\frac{3}{8}$ de la caja, «tres octavos». Una fracción tiene dos términos separados por la raya de fracción. Las usamos a diario: la mitad, un tercio, dos quintos…',
            'فتح خوان علبة جبن فيها 8 قطع وأكل 3: أكل $\\frac{3}{8}$ من العلبة، «ثلاثة أثمان». للكسر حدّان يفصل بينهما خط الكسر. ونستعمل الكسور كل يوم: النصف والثلث وخُمسان…',
            'Juan opens a box of 8 cheese portions and eats 3: he has eaten $\\frac{3}{8}$ of the box, «three eighths». A fraction has two terms separated by the fraction bar. We use them every day: a half, a third, two fifths…'
        ),
        examplePrompt: say('Pizza bat 10 zati berdinetan moztu da, eta 7 geratzen dira. Zein zatiki geratzen da? Eta zein jan da?', 'Una pizza se corta en 10 trozos iguales y quedan 7. ¿Qué fracción queda? ¿Y cuál se ha comido?', 'قُطعت بيتزا إلى 10 قطع متساوية وبقيت 7. ما الكسر الباقي؟ وما الكسر الذي أُكل؟', 'A pizza is cut into 10 equal slices and 7 are left. What fraction is left? And what fraction has been eaten?'),
        example: same('$\\frac{7}{10}\\qquad\\frac{3}{10}$'),
        exampleAnswer: say('$\\frac{7}{10}$ geratzen da, «hamarretik zazpi»; $\\frac{3}{10}$ jan da.', 'Quedan $\\frac{7}{10}$, «siete décimos»; se han comido $\\frac{3}{10}$.', 'بقي $\\frac{7}{10}$، «سبعة أعشار»؛ وأُكل $\\frac{3}{10}$.', '$\\frac{7}{10}$ is left, «seven tenths»; $\\frac{3}{10}$ has been eaten.')
    },
    represent: {
        vocabulary: [
            say('margotu', 'colorear', 'لوّن', 'colour'),
            say('irudia', 'figura', 'الشكل', 'shape'),
            say('zati berdinak', 'partes iguales', 'أجزاء متساوية', 'equal parts')
        ],
        explanation: say(
            'Mariak 6 zati berdinetan moztutako bizkotxo baten 2 zati jan ditu: $\\frac{2}{6}$. Zatiki bat marrazteko, banatu irudi bat izendatzaileak adina zati berdinetan, eta margotu zenbakitzaileak adina. Irudia alda daiteke, marrazkian bezala.',
            'María se ha comido 2 trozos de un bizcocho cortado en 6 partes iguales: $\\frac{2}{6}$. Para dibujar una fracción, divide una figura en tantas partes iguales como dice el denominador y colorea tantas como dice el numerador. La figura puede cambiar, como en el dibujo.',
            'أكلت ماريا قطعتين من كعكة مقطّعة إلى 6 أجزاء متساوية: $\\frac{2}{6}$. لرسم كسر قسّم شكلًا إلى أجزاء متساوية بعدد المقام، ولوّن منها بعدد البسط. ويمكن أن يتغير الشكل، كما في الرسم.',
            'María has eaten 2 pieces of a sponge cake cut into 6 equal parts: $\\frac{2}{6}$. To draw a fraction, split a shape into as many equal parts as the denominator says and colour as many as the numerator says. The shape can change, as in the drawing.'
        ),
        examplePrompt: say('Zirkulu bat 5 zati berdinetan banatuta dago, eta 4 daude margotuta. Zein zatiki dago margotuta? Eta zuri?', 'Un círculo está dividido en 5 partes iguales y hay 4 coloreadas. ¿Qué fracción está coloreada? ¿Y en blanco?', 'دائرة مقسومة إلى 5 أجزاء متساوية، منها 4 ملوّنة. ما الكسر الملوّن؟ وما الكسر الأبيض؟', 'A circle is split into 5 equal parts and 4 are coloured. What fraction is coloured? And white?'),
        example: same('$\\frac{4}{5}\\qquad\\frac{1}{5}$'),
        exampleAnswer: say('Zati guztiek izendatzailea ematen dute, 5; margotuek, zenbakitzailea, 4.', 'Todas las partes dan el denominador, 5; las coloreadas, el numerador, 4.', 'كل الأجزاء تعطي المقام 5، والملوّنة تعطي البسط 4.', 'All the parts give the denominator, 5; the coloured ones, the numerator, 4.')
    },
    division: {
        vocabulary: [
            say('zatiketa', 'división', 'القسمة', 'division'),
            say('hamartarra', 'decimal', 'عشري', 'decimal'),
            say('banatu', 'repartir', 'وزّع', 'share')
        ],
        explanation: say(
            'Zatiki-marrak zatiketa ere esan nahi du: $\\frac{3}{4}=3\\mathbin{:}4$. 3 pizza 4 lagunen artean banatzen badira, bakoitzari $\\frac{3}{4}$ dagokio, hau da, $0{,}75$ pizza. Horrela, zatiki bakoitza zenbaki bat da, eta zuzenean koka daiteke.',
            'La raya de fracción también significa división: $\\frac{3}{4}=3\\mathbin{:}4$. Si se reparten 3 pizzas entre 4 personas, a cada una le tocan $\\frac{3}{4}$, es decir, $0{,}75$ pizzas. Así, cada fracción es un número y se puede situar en la recta.',
            'خط الكسر يعني القسمة أيضًا: $\\frac{3}{4}=3\\mathbin{:}4$. إذا وُزّعت 3 بيتزات على 4 أشخاص كان لكل واحد $\\frac{3}{4}$، أي $0{,}75$ بيتزا. وهكذا كل كسر عدد يمكن وضعه على المستقيم.',
            'The fraction bar also means division: $\\frac{3}{4}=3\\mathbin{:}4$. If 3 pizzas are shared among 4 people, each one gets $\\frac{3}{4}$, that is, $0{,}75$ of a pizza. So each fraction is a number and can be placed on the line.'
        ),
        examplePrompt: say('7 litro zuku 4 pitxer berdinetan banatzen dira. Zenbat zuku dago pitxer bakoitzean?', 'Se reparten 7 litros de zumo en 4 jarras iguales. ¿Cuánto zumo hay en cada jarra?', 'نوزّع 7 لترات من العصير على 4 أباريق متساوية. كم عصيرًا في كل إبريق؟', '7 litres of juice are shared among 4 equal jugs. How much juice is in each jug?'),
        example: same('$\\frac{7}{4}=7\\mathbin{:}4=1{,}75$'),
        exampleAnswer: say('Pitxer bakoitzean litro baten $\\frac{7}{4}$ dago, hau da, $1{,}75$ litro: litro bat baino gehiago.', 'En cada jarra hay $\\frac{7}{4}$ de litro, es decir, $1{,}75$ litros: más de un litro.', 'في كل إبريق $\\frac{7}{4}$ لتر، أي $1{,}75$ لتر: أكثر من لتر.', 'Each jug holds $\\frac{7}{4}$ of a litre, that is, $1{,}75$ litres: more than one litre.')
    },

    /* ---------- 2. Kinds of fractions ---------- */
    types: {
        vocabulary: [
            say('unitatea', 'unidad', 'الوحدة', 'whole'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        definitions: [
            {
                term: say('Zatiki propioa eta inpropioa', 'Fracción propia e impropia', 'الكسر الفعلي وغير الفعلي', 'Proper and improper fraction'),
                meaning: say('Propioa: zenbakitzailea izendatzailea baino txikiagoa, 1 baino gutxiago. Inpropioa: zenbakitzailea handiagoa, 1 baino gehiago.', 'Propia: numerador menor que el denominador, vale menos que 1. Impropia: numerador mayor, vale más que 1.', 'الفعلي: بسطه أصغر من مقامه وقيمته أقل من 1. غير الفعلي: بسطه أكبر وقيمته أكثر من 1.', 'Proper: numerator smaller than the denominator, worth less than 1. Improper: numerator bigger, worth more than 1.')
            }
        ],
        explanation: say(
            'Zenbakitzailea eta izendatzailea konparatuz, zatikiak unitatea osatzen duen jakiten dugu. Juanek 8 zatitik 3 jaten baditu, kutxa bat baino gutxiago jaten du; 8 jaten baditu, kutxa osoa; eta kutxa bat eta beste baten 3 zati, $\\frac{11}{8}$: kutxa bat baino gehiago.',
            'Comparando el numerador con el denominador se sabe si la fracción completa la unidad. Si Juan come 3 porciones de 8, come menos de una caja; si come 8, la caja entera; y si come una caja y 3 porciones de otra, $\\frac{11}{8}$: más de una.',
            'بمقارنة البسط بالمقام نعرف هل يكمل الكسر الوحدة. إذا أكل خوان 3 قطع من 8 فقد أكل أقل من علبة؛ وإذا أكل 8 فالعلبة كلها؛ وإذا أكل علبة و3 قطع من أخرى فذلك $\\frac{11}{8}$: أكثر من علبة.',
            'Comparing the numerator with the denominator tells you whether the fraction makes a whole. If Juan eats 3 portions out of 8, he eats less than a box; if he eats 8, the whole box; and if he eats a box and 3 portions of another, $\\frac{11}{8}$: more than one.'
        ),
        examplePrompt: say('Sailkatu $\\frac{9}{4}$, $\\frac{5}{6}$ eta $\\frac{7}{7}$.', 'Clasifica $\\frac{9}{4}$, $\\frac{5}{6}$ y $\\frac{7}{7}$.', 'صنّف $\\frac{9}{4}$ و$\\frac{5}{6}$ و$\\frac{7}{7}$.', 'Classify $\\frac{9}{4}$, $\\frac{5}{6}$ and $\\frac{7}{7}$.'),
        example: same('$\\frac{5}{6}<1\\qquad\\frac{7}{7}=1\\qquad\\frac{9}{4}>1$'),
        exampleAnswer: say('$\\frac{5}{6}$ propioa da, $\\frac{7}{7}$ zatikiak 1 balio du, eta $\\frac{9}{4}$ inpropioa da.', '$\\frac{5}{6}$ es propia, $\\frac{7}{7}$ vale 1 y $\\frac{9}{4}$ es impropia.', '$\\frac{5}{6}$ كسر فعلي، و$\\frac{7}{7}$ يساوي 1، و$\\frac{9}{4}$ غير فعلي.', '$\\frac{5}{6}$ is proper, $\\frac{7}{7}$ is worth 1 and $\\frac{9}{4}$ is improper.')
    },
    mixed: {
        vocabulary: [
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('unitate osoak', 'unidades completas', 'وحدات كاملة', 'whole units')
        ],
        definitions: [
            {
                term: say('Zenbaki mistoa', 'Número mixto', 'العدد الكسري', 'Mixed number'),
                meaning: say('Zenbaki natural bat eta zatiki propio bat batera: $1\\frac{3}{8}=1+\\frac{3}{8}$.', 'Un número natural y una fracción propia juntos: $1\\frac{3}{8}=1+\\frac{3}{8}$.', 'عدد طبيعي وكسر فعلي معًا: $1\\frac{3}{8}=1+\\frac{3}{8}$.', 'A natural number and a proper fraction together: $1\\frac{3}{8}=1+\\frac{3}{8}$.')
            }
        ],
        explanation: say(
            'Zatiki inpropio batek unitate osoak ditu: $\\frac{11}{8}$ kutxa oso bat da eta $\\frac{3}{8}$ gehiago, $1\\frac{3}{8}$. Unitateak ateratzeko, zatitu zenbakitzailea izendatzailearekin: zatidura unitate osoak dira, eta hondarra, soberan dagoen zatiaren zenbakitzailea.',
            'Una fracción impropia contiene unidades completas: $\\frac{11}{8}$ es una caja entera y $\\frac{3}{8}$ más, $1\\frac{3}{8}$. Para sacar las unidades, divide el numerador entre el denominador: el cociente son las unidades completas y el resto, el numerador de la parte que sobra.',
            'الكسر غير الفعلي يحوي وحدات كاملة: $\\frac{11}{8}$ علبة كاملة و$\\frac{3}{8}$ أخرى، أي $1\\frac{3}{8}$. ولإخراج الوحدات اقسم البسط على المقام: خارج القسمة هو الوحدات الكاملة، والباقي هو بسط الجزء الزائد.',
            'An improper fraction contains whole units: $\\frac{11}{8}$ is a whole box and $\\frac{3}{8}$ more, $1\\frac{3}{8}$. To find the units, divide the numerator by the denominator: the quotient is the whole units and the remainder, the numerator of the part left over.'
        ),
        examplePrompt: say('Idatzi $\\frac{23}{6}$ zenbaki misto gisa, eta $4\\frac{2}{3}$ zatiki gisa.', 'Escribe $\\frac{23}{6}$ como número mixto y $4\\frac{2}{3}$ como fracción.', 'اكتب $\\frac{23}{6}$ عددًا كسريًا، و$4\\frac{2}{3}$ كسرًا.', 'Write $\\frac{23}{6}$ as a mixed number and $4\\frac{2}{3}$ as a fraction.'),
        example: same('$\\begin{gathered}\\frac{23}{6}=3\\frac{5}{6}\\\\4\\frac{2}{3}=\\frac{14}{3}\\end{gathered}$'),
        exampleAnswer: say('$23=6\\cdot 3+5$: 3 unitate eta $\\frac{5}{6}$. Alderantziz, $4\\cdot 3+2=14$ heren.', '$23=6\\cdot 3+5$: 3 unidades y $\\frac{5}{6}$. Al revés, $4\\cdot 3+2=14$ tercios.', '$23=6\\cdot 3+5$: 3 وحدات و$\\frac{5}{6}$. وبالعكس، $4\\cdot 3+2=14$ ثلثًا.', '$23=6\\cdot 3+5$: 3 units and $\\frac{5}{6}$. The other way, $4\\cdot 3+2=14$ thirds.')
    },
    line: {
        vocabulary: [
            say('zuzena', 'recta', 'المستقيم', 'line'),
            say('unitatea', 'unidad', 'الوحدة', 'unit'),
            say('aurrera egin', 'avanzar', 'تقدّم', 'move along')
        ],
        explanation: say(
            'Zatikiak zenbakiak direnez, zuzenean kokatzen dira, unitateen artean distantzia bera dagoela. Propioak 0 eta 1 artean daude; unitatearen berdinak, 1 puntuan; eta inpropioak, 1 puntutik aurrera.',
            'Como las fracciones son números, se sitúan en la recta, con la misma distancia entre las unidades. Las propias están entre 0 y 1; las iguales a la unidad, en el 1; y las impropias, después del 1.',
            'لأن الكسور أعداد فهي توضع على المستقيم، مع المسافة نفسها بين الوحدات. الكسور الفعلية بين 0 و1؛ والمساوية للوحدة عند 1؛ وغير الفعلية بعد 1.',
            'Since fractions are numbers, they go on the line, with the same distance between the units. Proper ones are between 0 and 1; those equal to one whole, at 1; and improper ones, after 1.'
        ),
        examplePrompt: say('Kokatu $\\frac{7}{4}$ zuzenean: zein zenbaki osoren artean dago?', 'Sitúa $\\frac{7}{4}$ en la recta: ¿entre qué números enteros está?', 'ضع $\\frac{7}{4}$ على المستقيم: بين أيّ عددين صحيحين يقع؟', 'Place $\\frac{7}{4}$ on the line: between which whole numbers is it?'),
        example: same('$1<\\frac{7}{4}<2$'),
        exampleAnswer: say('Unitate bakoitza 4 zatitan; 0 puntutik 7 zati egiten dira aurrera: unitate oso bat eta hiru laurden gehiago.', 'Cada unidad en 4 partes; desde el 0 se avanzan 7: una unidad entera y tres cuartos más.', 'كل وحدة 4 أجزاء؛ ومن الصفر نتقدّم 7 أجزاء: وحدة كاملة وثلاثة أرباع أخرى.', 'Each unit in 4 parts; from 0 you move along 7: one whole unit and three quarters more.')
    },

    /* ---------- 3. Equivalence ---------- */
    equivalent: {
        vocabulary: [
            say('biderkadura gurutzatuak', 'productos cruzados', 'الضرب التبادلي', 'cross products'),
            say('balio bera', 'mismo valor', 'القيمة نفسها', 'same value')
        ],
        definitions: [
            {
                term: say('Zatiki baliokideak', 'Fracciones equivalentes', 'الكسور المتكافئة', 'Equivalent fractions'),
                meaning: say('Balio bera dutenak: kantitate bera adierazten dute.', 'Las que tienen el mismo valor: representan la misma cantidad.', 'الكسور التي لها القيمة نفسها: تمثّل الكمية نفسها.', 'Fractions with the same value: they show the same amount.')
            }
        ],
        explanation: say(
            'Marrazkiak erakusten du $\\frac{3}{4}$, $\\frac{6}{8}$ eta $\\frac{9}{12}$ zatikiek gauza bera hartzen dutela. Bi zatiki baliokideak diren jakiteko, errazena biderkadura gurutzatuak dira: berdinak badira, baliokideak dira.',
            'El dibujo muestra que $\\frac{3}{4}$, $\\frac{6}{8}$ y $\\frac{9}{12}$ ocupan lo mismo. Para comprobar si dos fracciones son equivalentes, lo más sencillo son los productos cruzados: si salen iguales, lo son.',
            'يبيّن الرسم أن $\\frac{3}{4}$ و$\\frac{6}{8}$ و$\\frac{9}{12}$ تشغل المساحة نفسها. وللتحقق من أن كسرين متكافئان فأسهل طريقة هي الضرب التبادلي: إذا تساوى الناتجان فهما متكافئان.',
            'The drawing shows that $\\frac{3}{4}$, $\\frac{6}{8}$ and $\\frac{9}{12}$ cover the same amount. To check whether two fractions are equivalent, the easiest way is cross products: if they come out equal, they are.'
        ),
        examplePrompt: say('$\\frac{4}{6}$ eta $\\frac{10}{15}$ baliokideak dira? Eta $\\frac{3}{7}$ eta $\\frac{9}{14}$?', '¿Son equivalentes $\\frac{4}{6}$ y $\\frac{10}{15}$? ¿Y $\\frac{3}{7}$ y $\\frac{9}{14}$?', 'هل $\\frac{4}{6}$ و$\\frac{10}{15}$ متكافئان؟ وماذا عن $\\frac{3}{7}$ و$\\frac{9}{14}$؟', 'Are $\\frac{4}{6}$ and $\\frac{10}{15}$ equivalent? And $\\frac{3}{7}$ and $\\frac{9}{14}$?'),
        example: same('$\\begin{gathered}4\\cdot 15=6\\cdot 10=60\\\\3\\cdot 14=42\\neq 7\\cdot 9=63\\end{gathered}$'),
        exampleAnswer: say('Lehen bikotea baliokidea da; bigarrena, ez.', 'La primera pareja sí es equivalente; la segunda, no.', 'الزوج الأول متكافئ، والثاني ليس كذلك.', 'The first pair is equivalent; the second is not.')
    },
    'amplify-simplify': {
        vocabulary: [
            say('zatiki laburtezina', 'fracción irreducible', 'الكسر غير القابل للاختزال', 'simplest form'),
            say('gaiak', 'términos', 'الحدّين', 'terms')
        ],
        definitions: [
            {
                term: say('Handitu eta sinplifikatu', 'Amplificar y simplificar', 'التوسيع والاختزال', 'Scale up and simplify'),
                meaning: say('Bi gaiak zenbaki berarekin biderkatzea (handitu) edo zatitzea (sinplifikatu). Ateratzen den zatikia baliokidea da.', 'Multiplicar (amplificar) o dividir (simplificar) los dos términos por el mismo número. La fracción que sale es equivalente.', 'ضرب الحدّين في العدد نفسه (التوسيع) أو قسمتهما عليه (الاختزال). والكسر الناتج مكافئ.', 'Multiplying (scaling up) or dividing (simplifying) both terms by the same number. The fraction you get is equivalent.')
            }
        ],
        explanation: say(
            'Marrazkian, $\\frac{6}{15}$ eta $\\frac{2}{5}$ zatikiek gauza bera hartzen dute: goian eta behean 3 zenbakiarekin zatitu da. Gehiago sinplifikatu ezin denean, zatikia laburtezina da. Behin batean iristeko, zatitu bi gaiak haien ZKHrekin.',
            'En el dibujo, $\\frac{6}{15}$ y $\\frac{2}{5}$ ocupan lo mismo: se ha dividido arriba y abajo entre 3. Cuando ya no se puede simplificar más, la fracción es irreducible. Para llegar de una vez, divide los dos términos entre su m.c.d.',
            'في الرسم يشغل $\\frac{6}{15}$ و$\\frac{2}{5}$ المساحة نفسها: قسمنا البسط والمقام على 3. وحين لا يمكن الاختزال أكثر يكون الكسر غير قابل للاختزال. وللوصول إليه دفعة واحدة اقسم الحدّين على ق.م.أ لهما.',
            'In the drawing, $\\frac{6}{15}$ and $\\frac{2}{5}$ cover the same amount: the top and the bottom have been divided by 3. When it cannot be simplified any more, the fraction is in its simplest form. To get there at once, divide both terms by their GCD.'
        ),
        examplePrompt: say('Sinplifikatu $\\frac{24}{36}$ zatiki laburtezina lortu arte.', 'Simplifica $\\frac{24}{36}$ hasta la fracción irreducible.', 'اختزل $\\frac{24}{36}$ حتى تصل إلى كسر غير قابل للاختزال.', 'Simplify $\\frac{24}{36}$ to its simplest form.'),
        example: notation('$\\begin{gathered}@GCD(24,36)=12\\\\\\frac{24}{36}=\\frac{24\\mathbin{:}12}{36\\mathbin{:}12}=\\frac{2}{3}\\end{gathered}$'),
        exampleAnswer: say('ZKHrekin, 12 zenbakiarekin, zatituta behin batean iristen da: $\\frac{2}{3}$ ezin da gehiago sinplifikatu.', 'Dividiendo entre el m.c.d., 12, se llega de una vez: $\\frac{2}{3}$ ya no se puede simplificar.', 'بالقسمة على ق.م.أ، أي 12، نصل دفعة واحدة: $\\frac{2}{3}$ لا يمكن اختزاله أكثر.', 'Dividing by the GCD, 12, gets you there at once: $\\frac{2}{3}$ cannot be simplified any more.'),
        why: {
            text: say(
                'Zati bakoitza hiru zatitan mozten baduzu, hiru aldiz zati gehiago daude (izendatzailea × 3), eta hiru aldiz gehiago hartzen dituzu (zenbakitzailea × 3): kantitatea bera da. Sinplifikatzea gauza bera da, alderantziz.',
                'Si cortas cada trozo en 3, hay el triple de trozos (denominador × 3) y tomas el triple (numerador × 3): la cantidad es la misma. Simplificar es lo mismo, al revés.',
                'إذا قطعت كل جزء إلى 3 أجزاء صار عدد الأجزاء ثلاثة أضعاف (المقام × 3)، وأخذت ثلاثة أضعاف (البسط × 3): الكمية نفسها. والاختزال هو العكس.',
                'If you cut every piece into 3, there are three times as many pieces (denominator × 3) and you take three times as many (numerator × 3): the amount is the same. Simplifying is the same thing backwards.'
            ),
            math: same('$\\frac{2}{5}=\\frac{2\\cdot 3}{5\\cdot 3}=\\frac{6}{15}$')
        }
    },
    compare: {
        vocabulary: [
            say('izendatzaile komuna', 'denominador común', 'المقام المشترك', 'common denominator'),
            say('zenbakitzaileak', 'numeradores', 'البسوط', 'numerators')
        ],
        explanation: say(
            'Bi kasu errazak dira, eta beste guztietan bilatu izendatzaile bereko zatiki baliokideak (izendatzaileen MKT) eta konparatu zenbakitzaileak:',
            'Hay dos casos sencillos, y en los demás busca fracciones equivalentes con el mismo denominador (el m.c.m. de los denominadores) y compara los numeradores:',
            'هناك حالتان سهلتان، وفي غيرهما ابحث عن كسور مكافئة لها المقام نفسه (م.م.أ للمقامات) وقارن البسوط:',
            'There are two easy cases, and for the rest look for equivalent fractions with the same denominator (the LCM of the denominators) and compare the numerators:'
        ),
        cases: [
            { title: say('Izendatzaile bera', 'Mismo denominador', 'المقام نفسه', 'Same denominator'), text: say('Zenbakitzaile handiena duena da handiena.', 'Es mayor la de mayor numerador.', 'الأكبر صاحب البسط الأكبر.', 'The one with the bigger numerator is bigger.'), math: same('$\\frac{5}{9}>\\frac{2}{9}$') },
            { title: say('Zenbakitzaile bera', 'Mismo numerador', 'البسط نفسه', 'Same numerator'), text: say('Izendatzaile txikiena duena da handiena: zatiak handiagoak dira.', 'Es mayor la de menor denominador: sus trozos son más grandes.', 'الأكبر صاحب المقام الأصغر: أجزاؤه أكبر.', 'The one with the smaller denominator is bigger: its pieces are bigger.'), math: same('$\\frac{3}{4}>\\frac{3}{7}$') }
        ],
        examplePrompt: say('Ordenatu txikienetik handienera: $\\frac{5}{6}$, $\\frac{3}{4}$ eta $\\frac{7}{12}$.', 'Ordena de menor a mayor: $\\frac{5}{6}$, $\\frac{3}{4}$ y $\\frac{7}{12}$.', 'رتّب من الأصغر إلى الأكبر: $\\frac{5}{6}$ و$\\frac{3}{4}$ و$\\frac{7}{12}$.', 'Order from smallest to biggest: $\\frac{5}{6}$, $\\frac{3}{4}$ and $\\frac{7}{12}$.'),
        example: same('$\\begin{gathered}\\frac{5}{6}=\\frac{10}{12}\\quad\\frac{3}{4}=\\frac{9}{12}\\\\\\frac{7}{12}<\\frac{3}{4}<\\frac{5}{6}\\end{gathered}$'),
        exampleAnswer: say('12 izendatzailearekin, zenbakitzaileak konparatzen dira: $7<9<10$.', 'Con denominador 12 se comparan los numeradores: $7<9<10$.', 'بالمقام 12 نقارن البسوط: $7<9<10$.', 'With denominator 12, compare the numerators: $7<9<10$.')
    },

    /* ---------- 4. Operations ---------- */
    'add-same': {
        vocabulary: [
            say('zenbakitzaileak', 'numeradores', 'البسوط', 'numerators'),
            say('sinplifikatu', 'simplificar', 'الاختزال', 'simplify')
        ],
        explanation: say(
            'Izendatzaile bera dutenean, zatikiak mota bereko zatiak dira, marrazkian bezala: zazpirenak zazpirenekin. Zenbakitzaileak batu edo kendu egiten dira, eta izendatzaile bera uzten da. Azkenik, sinplifikatu, ahal bada.',
            'Con el mismo denominador, las fracciones son partes del mismo tipo, como en el dibujo: séptimos con séptimos. Se suman o se restan los numeradores y se deja el mismo denominador. Al final, se simplifica si se puede.',
            'حين يكون المقام واحدًا تكون الكسور أجزاء من النوع نفسه، كما في الرسم: أسباع مع أسباع. نجمع البسوط أو نطرحها ونترك المقام نفسه. وفي النهاية نقوم بالاختزال إن أمكن.',
            'With the same denominator, the fractions are parts of the same kind, as in the drawing: sevenths with sevenths. Add or subtract the numerators and keep the same denominator. At the end, simplify if you can.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{11}{12}-\\frac{5}{12}$.', 'Calcula $\\frac{11}{12}-\\frac{5}{12}$.', 'احسب $\\frac{11}{12}-\\frac{5}{12}$.', 'Work out $\\frac{11}{12}-\\frac{5}{12}$.'),
        example: same('$\\frac{11}{12}-\\frac{5}{12}=\\frac{6}{12}=\\frac{1}{2}$'),
        exampleAnswer: say('Zenbakitzaileak kentzen dira, $11-5=6$, eta sinplifikatu egiten da.', 'Se restan los numeradores, $11-5=6$, y se simplifica.', 'نطرح البسطين، $11-5=6$، ثم نختزل.', 'Subtract the numerators, $11-5=6$, and simplify.'),
        why: {
            text: say(
                'Izendatzaileak zati mota esaten du, ez zenbat dauden. Zazpiren bat gehi zazpiren bat bi zazpiren dira, sagar bat gehi sagar bat bi sagar diren bezala: zatiak zenbatzen dira, eta haien izena ez da aldatzen.',
                'El denominador dice el tipo de trozo, no cuántos hay. Un séptimo más un séptimo son dos séptimos, igual que una manzana más una manzana son dos manzanas: se cuentan los trozos y su nombre no cambia.',
                'المقام يدل على نوع الجزء لا على عدده. سُبع زائد سُبع يساوي سُبعين، كما أن تفاحة زائد تفاحة تساوي تفاحتين: نعدّ الأجزاء ولا يتغير اسمها.',
                'The denominator says what kind of piece it is, not how many there are. One seventh plus one seventh is two sevenths, just as one apple plus one apple is two apples: you count the pieces and their name does not change.'
            ),
            math: same('$\\frac{1}{7}+\\frac{1}{7}=\\frac{2}{7}$')
        }
    },
    'add-different': {
        vocabulary: [
            say('erdiak', 'medios', 'الأنصاف', 'halves'),
            say('zatiki baliokideak', 'fracciones equivalentes', 'كسور مكافئة', 'equivalent fractions')
        ],
        definitions: [
            {
                term: say('Izendatzaile komuna', 'Común denominador', 'المقام المشترك', 'Common denominator'),
                meaning: say('Zatiki guztientzat izendatzaile bera; txikiena izendatzaileen MKT da.', 'Un mismo denominador para todas las fracciones; el más pequeño es el m.c.m. de los denominadores.', 'مقام واحد لكل الكسور؛ وأصغره هو م.م.أ للمقامات.', 'One denominator for all the fractions; the smallest is the LCM of the denominators.')
            }
        ],
        explanation: say(
            'Erdiak eta herenak ezin dira zuzenean batu: mota desberdineko zatiak dira. Lehenik izendatzaile komunera eramaten dira, izendatzaileen MKTra, zatiki baliokideekin. Gero zenbakitzaileak batu edo kentzen dira, izendatzaile berarekin bezala.',
            'Medios y tercios no se suman directamente: son partes de distinto tipo. Primero se reducen a común denominador, el m.c.m. de los denominadores, con fracciones equivalentes. Después se suman o restan los numeradores, como con el mismo denominador.',
            'لا تُجمع الأنصاف والأثلاث مباشرة: إنها أجزاء من نوعين مختلفين. أولًا نوحّد المقامات، م.م.أ للمقامات، بكسور مكافئة. ثم نجمع البسوط أو نطرحها كما مع المقام الواحد.',
            'Halves and thirds cannot be added directly: they are different kinds of parts. First bring them to a common denominator, the LCM of the denominators, with equivalent fractions. Then add or subtract the numerators, as with the same denominator.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{5}{6}-\\frac{3}{8}$.', 'Calcula $\\frac{5}{6}-\\frac{3}{8}$.', 'احسب $\\frac{5}{6}-\\frac{3}{8}$.', 'Work out $\\frac{5}{6}-\\frac{3}{8}$.'),
        example: same('$\\begin{aligned}\\frac{5}{6}-\\frac{3}{8}&=\\frac{20}{24}-\\frac{9}{24}\\\\&=\\frac{11}{24}\\end{aligned}$'),
        exampleAnswer: say('6 eta 8 zenbakien MKT 24 da: $\\frac{5}{6}=\\frac{20}{24}$ eta $\\frac{3}{8}=\\frac{9}{24}$.', 'El m.c.m. de 6 y 8 es 24: $\\frac{5}{6}=\\frac{20}{24}$ y $\\frac{3}{8}=\\frac{9}{24}$.', 'م.م.أ للعددين 6 و8 هو 24: $\\frac{5}{6}=\\frac{20}{24}$ و$\\frac{3}{8}=\\frac{9}{24}$.', 'The LCM of 6 and 8 is 24: $\\frac{5}{6}=\\frac{20}{24}$ and $\\frac{3}{8}=\\frac{9}{24}$.')
    },
    multiply: {
        vocabulary: [
            say('azalera', 'área', 'المساحة', 'area'),
            say('zenbakitzaileak', 'numeradores', 'البسوط', 'numerators'),
            say('izendatzaileak', 'denominadores', 'المقامات', 'denominators')
        ],
        explanation: say(
            'Zatikiak biderkatzeko, zenbakitzaileak elkarren artean biderkatzen dira, eta izendatzaileak elkarren artean; ez da izendatzaile komunik behar. Marrazkiko azalerak erakusten du: $\\frac{2}{3}$ bider $\\frac{3}{4}$ 12 laukietatik 6 dira. Zenbaki batek zenbakitzailea bakarrik biderkatzen du.',
            'Para multiplicar fracciones, se multiplican los numeradores entre sí y los denominadores entre sí; no hace falta común denominador. El área del dibujo lo muestra: $\\frac{2}{3}$ de $\\frac{3}{4}$ son 6 de las 12 casillas. Un número multiplica solo al numerador.',
            'لضرب الكسور نضرب البسوط بعضها في بعض والمقامات بعضها في بعض، ولا نحتاج إلى مقام مشترك. وتبيّن ذلك مساحة الرسم: $\\frac{2}{3}$ من $\\frac{3}{4}$ هي 6 من 12 خانة. والعدد يضرب البسط فقط.',
            'To multiply fractions, multiply the numerators together and the denominators together; no common denominator is needed. The area in the drawing shows it: $\\frac{2}{3}$ of $\\frac{3}{4}$ is 6 of the 12 squares. A whole number only multiplies the numerator.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{4}{5}\\cdot\\frac{10}{3}$ eta $6\\cdot\\frac{2}{9}$.', 'Calcula $\\frac{4}{5}\\cdot\\frac{10}{3}$ y $6\\cdot\\frac{2}{9}$.', 'احسب $\\frac{4}{5}\\cdot\\frac{10}{3}$ و$6\\cdot\\frac{2}{9}$.', 'Work out $\\frac{4}{5}\\cdot\\frac{10}{3}$ and $6\\cdot\\frac{2}{9}$.'),
        example: same('$\\begin{gathered}\\frac{4}{5}\\cdot\\frac{10}{3}=\\frac{40}{15}=\\frac{8}{3}\\\\6\\cdot\\frac{2}{9}=\\frac{12}{9}=\\frac{4}{3}\\end{gathered}$'),
        exampleAnswer: say('Goikoak goikoekin eta behekoak behekoekin; azkenik, sinplifikatu.', 'Arriba con arriba y abajo con abajo; al final, se simplifica.', 'البسط مع البسط والمقام مع المقام؛ وفي النهاية نختزل.', 'Top with top and bottom with bottom; at the end, simplify.')
    },
    divide: {
        vocabulary: [
            say('gurutzean', 'en cruz', 'بالتقاطع', 'cross over'),
            say('zenbakitzaile berria', 'nuevo numerador', 'البسط الجديد', 'new numerator')
        ],
        definitions: [
            {
                term: say('Zatiki alderantzizkoa', 'Fracción inversa', 'الكسر المقلوب', 'Reciprocal'),
                meaning: say('Zenbakitzailea eta izendatzailea trukatuta ateratzen dena: $\\frac{3}{5}$ zatikiaren alderantzizkoa $\\frac{5}{3}$ da.', 'La que sale al intercambiar numerador y denominador: la inversa de $\\frac{3}{5}$ es $\\frac{5}{3}$.', 'ما ينتج عن تبديل البسط والمقام: مقلوب $\\frac{3}{5}$ هو $\\frac{5}{3}$.', 'What you get by swapping numerator and denominator: the reciprocal of $\\frac{3}{5}$ is $\\frac{5}{3}$.')
            }
        ],
        explanation: say(
            'Bi zatiki zatitzeko, gurutzean biderkatzen da: lehenengoaren zenbakitzailea bider bigarrenaren izendatzailea da zenbakitzaile berria, eta lehenengoaren izendatzailea bider bigarrenaren zenbakitzailea, izendatzaile berria. Alderantzizkoaz biderkatzea bezala da.',
            'Para dividir dos fracciones se multiplica en cruz: el numerador de la primera por el denominador de la segunda da el nuevo numerador, y el denominador de la primera por el numerador de la segunda, el nuevo denominador. Es lo mismo que multiplicar por la inversa.',
            'لقسمة كسرين نضرب بالتقاطع: بسط الأول في مقام الثاني يعطي البسط الجديد، ومقام الأول في بسط الثاني يعطي المقام الجديد. وهذا مثل الضرب في الكسر المقلوب.',
            'To divide two fractions, cross over: the numerator of the first times the denominator of the second gives the new numerator, and the denominator of the first times the numerator of the second, the new denominator. It is the same as multiplying by the reciprocal.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{5}{6}\\mathbin{:}\\frac{2}{3}$ eta $\\frac{8}{9}\\mathbin{:}4$.', 'Calcula $\\frac{5}{6}\\mathbin{:}\\frac{2}{3}$ y $\\frac{8}{9}\\mathbin{:}4$.', 'احسب $\\frac{5}{6}\\mathbin{:}\\frac{2}{3}$ و$\\frac{8}{9}\\mathbin{:}4$.', 'Work out $\\frac{5}{6}\\mathbin{:}\\frac{2}{3}$ and $\\frac{8}{9}\\mathbin{:}4$.'),
        example: same('$\\begin{gathered}\\frac{5}{6}\\mathbin{:}\\frac{2}{3}=\\frac{15}{12}=\\frac{5}{4}\\\\\\frac{8}{9}\\mathbin{:}4=\\frac{8}{36}=\\frac{2}{9}\\end{gathered}$'),
        exampleAnswer: say('Gurutzean: $5\\cdot 3=15$ eta $6\\cdot 2=12$. Zenbaki batekin zatitzean, izendatzailea biderkatzen da.', 'En cruz: $5\\cdot 3=15$ y $6\\cdot 2=12$. Entre un número, se multiplica el denominador.', 'بالتقاطع: $5\\cdot 3=15$ و$6\\cdot 2=12$. وعند القسمة على عدد نضرب المقام.', 'Crossing over: $5\\cdot 3=15$ and $6\\cdot 2=12$. Dividing by a whole number multiplies the denominator.'),
        why: {
            text: say(
                'Zatitzea zenbat aldiz sartzen den galdetzea da. Unitate batean zortzi zortziren sartzen dira; beraz, $\\frac{3}{4}$ zatikian 8 zenbakiaren $\\frac{3}{4}$ sartzen dira, 6. Horregatik, zortziren batekin zatitzea 8 zenbakiaz biderkatzea da.',
                'Dividir es preguntar cuántas veces cabe. En una unidad caben ocho octavos, así que en $\\frac{3}{4}$ caben $\\frac{3}{4}$ de 8, que son 6. Por eso dividir entre un octavo es multiplicar por 8.',
                'القسمة سؤال: كم مرة يتسع؟ في الوحدة ثمانية أثمان، إذن في $\\frac{3}{4}$ يتسع $\\frac{3}{4}$ من 8، أي 6. لذلك القسمة على ثُمن هي الضرب في 8.',
                'Dividing asks how many times one thing fits into another. Eight eighths fit into one whole, so $\\frac{3}{4}$ of 8 fit into $\\frac{3}{4}$, which is 6. That is why dividing by one eighth is multiplying by 8.'
            ),
            math: same('$\\frac{3}{4}\\cdot 8=\\frac{24}{4}=6$')
        }
    },

    /* ---------- 5. Problems ---------- */
    'fraction-of': {
        vocabulary: [
            say('kantitatea', 'cantidad', 'الكمية', 'amount'),
            say('zati bat', 'una parte', 'جزء واحد', 'one part')
        ],
        explanation: say(
            'Zatiki batek kantitate baten gainean jarduten du: kantitate baten zatiki bat kalkulatzeko, zatitu kantitatea izendatzailearekin (zati batek balio duena) eta biderkatu zenbakitzailearekin. Ordenak ez du axola, baina lehenik zatitzea errazagoa izan ohi da.',
            'Una fracción actúa sobre una cantidad: para calcular una fracción de una cantidad, divide la cantidad entre el denominador (lo que vale una parte) y multiplica por el numerador. El orden no importa, pero dividir primero suele ser más fácil.',
            'يؤثّر الكسر في كمية: لحساب كسر من كمية اقسم الكمية على المقام (قيمة جزء واحد) واضرب في البسط. الترتيب لا يهم، لكن القسمة أولًا أسهل عادة.',
            'A fraction acts on an amount: to work out a fraction of an amount, divide the amount by the denominator (what one part is worth) and multiply by the numerator. The order does not matter, but dividing first is usually easier.'
        ),
        examplePrompt: say('28 ikasleko gela batean, $\\frac{3}{4}$ autobusez joaten dira. Zenbat dira?', 'En una clase de 28 alumnos, $\\frac{3}{4}$ van en autobús. ¿Cuántos son?', 'في صف فيه 28 طالبًا يذهب $\\frac{3}{4}$ منهم بالحافلة. كم عددهم؟', 'In a class of 28 pupils, $\\frac{3}{4}$ go by bus. How many is that?'),
        example: same('$28\\mathbin{:}4\\cdot 3=7\\cdot 3=21$'),
        exampleAnswer: say('21 ikasle joaten dira autobusez.', 'Van 21 alumnos en autobús.', 'يذهب 21 طالبًا بالحافلة.', '21 pupils go by bus.')
    },
    problems: {
        vocabulary: [
            say('osoa', 'total', 'الكل', 'whole'),
            say('geratzen dena', 'lo que queda', 'الباقي', 'what is left'),
            say('unitatea', 'unidad', 'الوحدة', 'one whole')
        ],
        explanation: say(
            'Buruketa askotan zati bat erabiltzen da, eta geratzen dena galdetzen da. Osoa unitatea da ($\\frac{5}{5}$, $\\frac{8}{8}$…): geratzen den zatia unitatea ken erabilitakoa da. Gero, aplikatu zatiki hori kantitateari, eta amaitu esaldi batez eta unitateekin.',
            'En muchos problemas se usa una parte y se pregunta por lo que queda. El total es la unidad ($\\frac{5}{5}$, $\\frac{8}{8}$…): la parte que queda es la unidad menos lo usado. Después, aplica esa fracción a la cantidad y termina con una frase y unidades.',
            'في كثير من المسائل نستعمل جزءًا ونسأل عن الباقي. الكل هو الوحدة ($\\frac{5}{5}$، $\\frac{8}{8}$…): والجزء الباقي هو الوحدة ناقص ما استُعمل. ثم طبّق هذا الكسر على الكمية وأنهِ الحل بجملة مع الوحدات.',
            'In many problems a part is used and you are asked what is left. The whole is one unit ($\\frac{5}{5}$, $\\frac{8}{8}$…): the part left is one whole minus what was used. Then apply that fraction to the amount and finish with a sentence and units.'
        ),
        examplePrompt: say('60 litroko depositu bat beteta dago, eta $\\frac{3}{10}$ gastatzen dira. Zenbat litro geratzen dira?', 'Un depósito de 60 litros está lleno y se gastan $\\frac{3}{10}$. ¿Cuántos litros quedan?', 'خزان سعته 60 لترًا ممتلئ، واستُهلك $\\frac{3}{10}$ منه. كم لترًا بقي؟', 'A full 60-litre tank uses up $\\frac{3}{10}$ of its water. How many litres are left?'),
        example: same('$\\begin{gathered}1-\\frac{3}{10}=\\frac{7}{10}\\\\60\\mathbin{:}10\\cdot 7=42\\end{gathered}$'),
        exampleAnswer: say('42 litro geratzen dira deposituan.', 'Quedan 42 litros en el depósito.', 'بقي في الخزان 42 لترًا.', 'There are 42 litres left in the tank.')
    }
}

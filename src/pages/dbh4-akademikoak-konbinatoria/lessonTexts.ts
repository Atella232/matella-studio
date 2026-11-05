import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { CombinatoricsAkTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Konbinatoria · 4. DBH akademikoak — what each lesson tells: a short
   explanation, the example as an exercise («Another example»), the key
   words in four languages and, in three lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. The models are written V, VR, P and C in every language, as the
   unit does.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const combinatoricsAkLessonTexts: Record<CombinatoricsAkTopicId, LessonTexts> = {
    /* ---------- 1. Counting ---------- */
    tree: {
        vocabulary: [
            say('zuhaitz-diagrama', 'diagrama de árbol', 'مخطط الشجرة', 'tree diagram'),
            say('adarra', 'rama', 'فرع', 'branch')
        ],
        explanation: say(
            'Konbinatoriak kasuak banan-banan idatzi gabe zenbatzen ditu. Zuhaitz-diagrama batean, lehen erabakiaren aukera bakoitzetik adar bat ateratzen da, eta adar bakoitzaren amaieratik, hurrengoaren aukerak. Azken adar bakoitza emaitza bat da. Zuhaitza irregularra izan daiteke; adar guztiak berdin irekitzen badira, nahikoa da biderkatzea.',
            'La combinatoria cuenta sin escribir los casos uno a uno. En un diagrama de árbol, de cada opción de la primera decisión sale una rama, y del final de cada rama, las opciones de la siguiente. Cada rama final es un resultado. El árbol puede ser irregular; si todas las ramas se abren igual, basta con multiplicar.',
            'التحليل التوافقي يعدّ دون كتابة الحالات واحدة واحدة. في مخطط الشجرة يخرج من كل خيار للقرار الأول فرع، ومن نهاية كل فرع خيارات القرار التالي. وكل فرع نهائي نتيجة. وقد تكون الشجرة غير منتظمة؛ وإذا تفرعت كل الفروع بالتساوي يكفي الضرب.',
            'Combinatorics counts without writing the cases one by one. In a tree diagram, each option of the first decision gives a branch, and from the end of each branch come the options of the next one. Each final branch is an outcome. The tree can be irregular; if every branch splits the same way, multiplying is enough.'
        ),
        examplePrompt: say('Kamiseta bat gorria, urdina edo berdea izan daiteke, eta S, M, L edo XL neurrikoa. Zenbat kamiseta desberdin daude?', 'Una camiseta puede ser roja, azul o verde, y de talla S, M, L o XL. ¿Cuántas camisetas distintas hay?', 'قميص قد يكون أحمر أو أزرق أو أخضر، بمقاس S أو M أو L أو XL. كم قميصًا مختلفًا يوجد؟', 'A T-shirt can be red, blue or green, in size S, M, L or XL. How many different T-shirts are there?'),
        example: same('$3\\cdot 4=12$'),
        exampleAnswer: say('3 adar, eta bakoitzetik 4: 12 mutur.', '3 ramas, y de cada una 4: 12 extremos.', '3 فروع، ومن كل منها 4: 12 نهاية.', '3 branches, and 4 from each: 12 ends.')
    },
    product: {
        vocabulary: [
            say('biderkaduraren erregela', 'principio del producto', 'مبدأ الضرب', 'product rule'),
            say('aukera', 'opción', 'خيار', 'option')
        ],
        explanation: say(
            'Lehen erabakiak $m$ aukera baditu eta, haietako bakoitzarekin, bigarrenak $n$, biak batera $m\\cdot n$ eratara har daitezke: biderkaduraren erregela da, eta erabaki gehiagotarako ere balio du. Erabakiak «eta» hitzarekin lotzen direnean biderkatzen da; «edo» hitzarekin lotzen direnean (bata edo bestea), batu egiten da.',
            'Si la primera decisión tiene $m$ opciones y, con cada una, la segunda tiene $n$, juntas se pueden tomar de $m\\cdot n$ formas: es el principio del producto, y vale para más decisiones. Se multiplica cuando las decisiones se unen con «y»; cuando se unen con «o» (una u otra), se suma.',
            'إذا كان للقرار الأول $m$ خيارًا ولكل منها للقرار الثاني $n$ فيمكن اتخاذهما معًا بـ $m\\cdot n$ طريقة: إنه مبدأ الضرب، ويصلح لقرارات أكثر. نضرب عندما ترتبط القرارات بـ «و»، ونجمع عندما ترتبط بـ «أو» (هذا أو ذاك).',
            'If the first decision has $m$ options and, with each, the second has $n$, together they can be made in $m\\cdot n$ ways: that is the product rule, and it works for more decisions. Multiply when the decisions are joined with «and»; when they are joined with «or» (one or the other), add.'
        ),
        examplePrompt: say('Pasahitz batek 26 letretako bat du, eta gero bi zifra. Zenbat pasahitz daude?', 'Una contraseña tiene una letra de 26 y después dos cifras. ¿Cuántas contraseñas hay?', 'كلمة سر فيها حرف من 26 ثم رقمان. كم كلمة سر ممكنة؟', 'A password has one of 26 letters and then two digits. How many passwords are there?'),
        example: same('$26\\cdot 10\\cdot 10=2600$'),
        exampleAnswer: say('Letra eta zifra eta zifra: biderkatu egiten da.', 'Letra y cifra y cifra: se multiplica.', 'حرف ورقم ورقم: نضرب.', 'Letter and digit and digit: multiply.')
    },
    factorial: {
        vocabulary: [
            say('faktoriala', 'factorial', 'مضروب', 'factorial'),
            say('zatidura', 'cociente', 'خارج قسمة', 'quotient')
        ],
        explanation: say(
            '$n$ zenbakiaren faktoriala, $n!$, $n$ zenbakitik 1 zenbakira arteko guztien biderkadura da: $n!=n\\cdot(n-1)\\cdots 2\\cdot 1$, eta hitzarmenez $0!=1$. Oso azkar hazten da; beraz, faktorialen zatidura bat sinplifikatu egiten da kalkulatu aurretik: $n!=n\\cdot(n-1)!$ denez, $\\frac{9!}{7!}=9\\cdot 8$.',
            'El factorial de $n$, $n!$, es el producto de todos los números desde $n$ hasta 1: $n!=n\\cdot(n-1)\\cdots 2\\cdot 1$, y por convenio $0!=1$. Crece muy deprisa, así que un cociente de factoriales se simplifica antes de calcular: como $n!=n\\cdot(n-1)!$, $\\frac{9!}{7!}=9\\cdot 8$.',
            'مضروب $n$ أي $n!$ هو جداء كل الأعداد من $n$ إلى 1: $n!=n\\cdot(n-1)\\cdots 2\\cdot 1$، واصطلاحًا $0!=1$. وهو يكبر بسرعة كبيرة، لذلك نختزل خارج قسمة المضاريب قبل الحساب: بما أن $n!=n\\cdot(n-1)!$ فإن $\\frac{9!}{7!}=9\\cdot 8$.',
            'The factorial of $n$, $n!$, is the product of all the numbers from $n$ down to 1: $n!=n\\cdot(n-1)\\cdots 2\\cdot 1$, and by agreement $0!=1$. It grows very fast, so a quotient of factorials is simplified before working it out: since $n!=n\\cdot(n-1)!$, $\\frac{9!}{7!}=9\\cdot 8$.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{12!}{10!}$ eta $\\frac{6!}{4!\\cdot 2!}$.', 'Calcula $\\frac{12!}{10!}$ y $\\frac{6!}{4!\\cdot 2!}$.', 'احسب $\\frac{12!}{10!}$ و$\\frac{6!}{4!\\cdot 2!}$.', 'Work out $\\frac{12!}{10!}$ and $\\frac{6!}{4!\\cdot 2!}$.'),
        example: same('$\\begin{gathered}\\frac{12!}{10!}=12\\cdot 11=132\\\\ \\frac{6!}{4!\\cdot 2!}=\\frac{6\\cdot 5}{2}=15\\end{gathered}$'),
        exampleAnswer: say('Faktorial komunak ezabatzen dira biderkatu aurretik.', 'Se tachan los factoriales comunes antes de multiplicar.', 'نحذف المضاريب المشتركة قبل الضرب.', 'Cross out the common factorials before multiplying.')
    },

    /* ---------- 2. Variations ---------- */
    'with-repetition': {
        vocabulary: [
            say('errepikapenezko aldakuntzak', 'variaciones con repetición', 'التراتيب مع التكرار', 'arrangements with repetition'),
            say('laukia', 'casilla', 'خانة', 'slot')
        ],
        explanation: say(
            '$k$ lauki bete behar badira, bakoitza $n$ elementutako batekin, ordenak axola badu eta errepika badaiteke, lauki bakoitzak $n$ aukera ditu: $\\text{VR}_{n,k}=n^{k}$. Oinarria aukera kopurua da, $n$, eta berretzailea, lauki kopurua, $k$. Hemen $k$ handiagoa izan daiteke $n$ baino.',
            'Si hay que llenar $k$ casillas, cada una con uno de $n$ elementos, importa el orden y se puede repetir, cada casilla tiene $n$ opciones: $\\text{VR}_{n,k}=n^{k}$. La base es el número de opciones, $n$, y el exponente, el número de casillas, $k$. Aquí $k$ puede ser mayor que $n$.',
            'إذا وجب ملء $k$ خانة كل منها بعنصر من $n$ عنصرًا، وكان الترتيب مهمًا والتكرار مسموحًا، فلكل خانة $n$ خيارًا: $\\text{VR}_{n,k}=n^{k}$. الأساس عدد الخيارات $n$ والأس عدد الخانات $k$. وهنا يمكن أن يكون $k$ أكبر من $n$.',
            'If you must fill $k$ slots, each with one of $n$ elements, the order matters and repeats are allowed, each slot has $n$ options: $\\text{VR}_{n,k}=n^{k}$. The base is the number of options, $n$, and the exponent, the number of slots, $k$. Here $k$ can be bigger than $n$.'
        ),
        examplePrompt: say('Zenbat hiru marrako bandera egin daitezke 7 kolorerekin, kolorea errepika badaiteke?', '¿Cuántas banderas de tres franjas se pueden hacer con 7 colores, si se puede repetir color?', 'كم علمًا من ثلاثة أشرطة يمكن صنعه بـ 7 ألوان إذا جاز تكرار اللون؟', 'How many three-stripe flags can be made with 7 colours, if a colour can be repeated?'),
        example: same('$\\text{VR}_{7,3}=7^{3}=343$'),
        exampleAnswer: say('3 marra (laukiak) eta 7 kolore (aukerak): $7\\cdot 7\\cdot 7$.', '3 franjas (casillas) y 7 colores (opciones): $7\\cdot 7\\cdot 7$.', '3 أشرطة (خانات) و7 ألوان (خيارات): $7\\cdot 7\\cdot 7$.', '3 stripes (slots) and 7 colours (options): $7\\cdot 7\\cdot 7$.')
    },
    variations: {
        vocabulary: [
            say('aldakuntzak', 'variaciones', 'التراتيب', 'arrangements'),
            say('faktorea', 'factor', 'عامل', 'factor')
        ],
        explanation: say(
            'Ordenak axola badu baina elementu bakoitza behin bakarrik erabiltzen bada, lehen laukiak $n$ aukera ditu, bigarrenak $n-1$, eta horrela $k$ faktore arte: $\\text{V}_{n,k}=n\\cdot(n-1)\\cdots(n-k+1)=\\frac{n!}{(n-k)!}$. Hasi $n$ zenbakian eta biderkatu beherantz $k$ faktore. $k$ ezin da $n$ baino handiagoa izan.',
            'Si importa el orden pero cada elemento solo se usa una vez, la primera casilla tiene $n$ opciones, la segunda $n-1$, y así hasta $k$ factores: $\\text{V}_{n,k}=n\\cdot(n-1)\\cdots(n-k+1)=\\frac{n!}{(n-k)!}$. Empieza en $n$ y multiplica hacia abajo $k$ factores. $k$ no puede ser mayor que $n$.',
            'إذا كان الترتيب مهمًا وكل عنصر يُستعمل مرة واحدة فقط، فللخانة الأولى $n$ خيارًا وللثانية $n-1$، وهكذا حتى $k$ عاملًا: $\\text{V}_{n,k}=n\\cdot(n-1)\\cdots(n-k+1)=\\frac{n!}{(n-k)!}$. ابدأ من $n$ واضرب نزولًا $k$ عاملًا. ولا يمكن أن يكون $k$ أكبر من $n$.',
            'If the order matters but each element is used only once, the first slot has $n$ options, the second $n-1$, and so on for $k$ factors: $\\text{V}_{n,k}=n\\cdot(n-1)\\cdots(n-k+1)=\\frac{n!}{(n-k)!}$. Start at $n$ and multiply downwards $k$ factors. $k$ cannot be bigger than $n$.'
        ),
        examplePrompt: say('12 bazkideko klub batek lehendakaria, idazkaria eta diruzaina aukeratzen ditu. Zenbat eratara?', 'Un club de 12 socios elige presidente, secretario y tesorero. ¿De cuántas formas?', 'ناد من 12 عضوًا يختار رئيسًا وأمينًا للسر وأمينًا للصندوق. بكم طريقة؟', 'A club of 12 members chooses a chair, a secretary and a treasurer. In how many ways?'),
        example: same('$\\text{V}_{12,3}=12\\cdot 11\\cdot 10=1320$'),
        exampleAnswer: say('Karguak desberdinak dira (ordenak axola du) eta inork ez ditu bi.', 'Los cargos son distintos (importa el orden) y nadie tiene dos.', 'المناصب مختلفة (الترتيب مهم) ولا يشغل أحد منصبين.', 'The posts are different (order matters) and nobody holds two.')
    },
    conditions: {
        vocabulary: [
            say('baldintza', 'condición', 'شرط', 'condition'),
            say('zifra', 'cifra', 'الرقم', 'digit')
        ],
        explanation: say(
            'Lauki guztiek aukera kopuru bera ez badute, bakoitzarenak zenbatu eta biderkatu egiten dira, baldintza gehien dituen laukitik hasita. Zenbakietan, 0 zifra ezin da lehena izan. Zenbakiak bikoitia izan behar badu, hasi azken zifratik. Baldintza batek kasuak banatzen baditu, zenbatu kasu bakoitza eta batu.',
            'Si las casillas no tienen todas las mismas opciones, se cuentan las de cada una y se multiplican, empezando por la casilla con más condiciones. En los números, el 0 no puede ser la primera cifra. Si el número tiene que ser par, empieza por la última cifra. Si una condición parte en casos, cuenta cada caso y suma.',
            'إذا لم يكن للخانات العدد نفسه من الخيارات نعدّ خيارات كل خانة ونضربها، بدءًا بالخانة الأكثر شروطًا. وفي الأعداد لا يمكن أن يكون الرقم 0 أولًا. وإذا وجب أن يكون العدد زوجيًا فابدأ بالرقم الأخير. وإذا قسّم شرط إلى حالات فعدّ كل حالة واجمع.',
            'If the slots do not all have the same number of options, count each one\'s and multiply, starting with the slot that has the most conditions. In numbers, 0 cannot be the first digit. If the number must be even, start with the last digit. If a condition splits into cases, count each case and add.'
        ),
        examplePrompt: say('Zenbat hiru zifrako zenbaki bakoiti daude, zifrak errepika badaitezke?', '¿Cuántos números de tres cifras son impares, si se pueden repetir cifras?', 'كم عددًا فرديًا من ثلاثة أرقام يوجد إذا جاز تكرار الأرقام؟', 'How many three-digit numbers are odd, if digits can be repeated?'),
        example: same('$9\\cdot 10\\cdot 5=450$'),
        exampleAnswer: say('Azken zifra: 1, 3, 5, 7 edo 9; lehena: 1 eta 9 artean; erdikoa, edozein.', 'Última cifra: 1, 3, 5, 7 o 9; primera: del 1 al 9; la del medio, cualquiera.', 'الرقم الأخير: 1 أو 3 أو 5 أو 7 أو 9؛ والأول من 1 إلى 9؛ والأوسط أي رقم.', 'Last digit: 1, 3, 5, 7 or 9; first: 1 to 9; the middle one, any.')
    },

    /* ---------- 3. Permutations ---------- */
    permutations: {
        vocabulary: [
            say('permutazioak', 'permutaciones', 'التباديل', 'permutations'),
            say('ordena', 'orden', 'الترتيب', 'order')
        ],
        explanation: say(
            'Permutazioak elementu guztiak, errepikatu gabe, ordenatzeko erak dira: $k=n$ duten aldakuntzak. Lehen tokirako $n$ aukera daude, bigarrenerako $n-1$… eta azkenerako 1: $\\text{P}_n=n!$. Letra desberdineko hitz baten anagramak permutazioak dira. Mahai biribil batean, birak ez dira kontatzen: $(n-1)!$.',
            'Las permutaciones son las formas de ordenar todos los elementos, sin repetir: variaciones con $k=n$. Para el primer lugar hay $n$ opciones, para el segundo $n-1$… y para el último 1: $\\text{P}_n=n!$. Los anagramas de una palabra con letras distintas son permutaciones. En una mesa redonda, los giros no cuentan: $(n-1)!$.',
            'التباديل هي طرق ترتيب كل العناصر دون تكرار: تراتيب فيها $k=n$. للمكان الأول $n$ خيارًا وللثاني $n-1$… وللأخير 1: $\\text{P}_n=n!$. وترتيبات أحرف كلمة أحرفها مختلفة تباديل. وحول طاولة مستديرة لا تُحسب الدورات: $(n-1)!$.',
            'Permutations are the ways of putting all the elements in order, without repeats: arrangements with $k=n$. For the first place there are $n$ options, for the second $n-1$… and for the last 1: $\\text{P}_n=n!$. The anagrams of a word with different letters are permutations. Around a round table, rotations do not count: $(n-1)!$.'
        ),
        examplePrompt: say('Zenbat eratara eser daitezke 5 pertsona mahai biribil baten inguruan?', '¿De cuántas formas se pueden sentar 5 personas alrededor de una mesa redonda?', 'بكم طريقة يمكن أن يجلس 5 أشخاص حول طاولة مستديرة؟', 'In how many ways can 5 people sit around a round table?'),
        example: same('$(5-1)!=4!=24$'),
        exampleAnswer: say('Pertsona bat finkatzen da, eta beste 4 ordenatzen dira.', 'Se fija a una persona y se ordenan las otras 4.', 'نثبّت شخصًا ونرتّب الأربعة الآخرين.', 'Fix one person and arrange the other 4.')
    },
    restricted: {
        vocabulary: [
            say('blokea', 'bloque', 'كتلة', 'block'),
            say('aurkakoa', 'contrario', 'العكس', 'opposite')
        ],
        explanation: say(
            'Bi elementuk batera joan behar badute, bloke bat bezala hartzen dira: $n-1$ «elementu» ordenatzen dira, $(n-1)!$, eta gero blokea barrutik, $2!$. Batek toki finkoa badu, besteak bakarrik ordenatzen dira. Bi ezin badira batera joan, errazagoa da aurkakoa zenbatzea: guztiak ken batera doazenak.',
            'Si dos elementos tienen que ir juntos, se tratan como un bloque: se ordenan $n-1$ «elementos», $(n-1)!$, y luego el bloque por dentro, $2!$. Si uno tiene un lugar fijo, solo se ordenan los otros. Si dos no pueden ir juntos, es más fácil contar el contrario: todos menos los que van juntos.',
            'إذا وجب أن يكون عنصران معًا نعاملهما ككتلة: نرتّب $n-1$ «عنصرًا»، $(n-1)!$، ثم الكتلة من الداخل $2!$. وإذا كان لعنصر مكان ثابت نرتّب الباقي فقط. وإذا لم يجز أن يكون عنصران معًا فالأسهل عدّ العكس: الكل ناقص الحالات التي يكونان فيها معًا.',
            'If two elements must go together, treat them as a block: arrange $n-1$ «elements», $(n-1)!$, and then the block inside, $2!$. If one has a fixed place, only the others are arranged. If two cannot go together, it is easier to count the opposite: all minus those where they are together.'
        ),
        examplePrompt: say('6 liburu apal batean: zenbat eratara, horietako bi ezin badira elkarren ondoan joan?', '6 libros en una estantería: ¿de cuántas formas, si dos de ellos no pueden ir juntos?', '6 كتب على رف: بكم طريقة إذا لم يجز أن يتجاور اثنان منها؟', '6 books on a shelf: in how many ways, if two of them cannot be side by side?'),
        example: same('$6!-2\\cdot 5!=720-240=480$'),
        exampleAnswer: say('Batera, $2\\cdot 5!=240$ eratara joango lirateke; guztietatik kentzen dira.', 'Juntos irían de $2\\cdot 5!=240$ formas; se restan del total.', 'متجاورين يكونان بـ $2\\cdot 5!=240$ طريقة؛ نطرحها من الكل.', 'Together they would go in $2\\cdot 5!=240$ ways; subtract those from the total.')
    },
    repeated: {
        vocabulary: [
            say('errepikapenezko permutazioak', 'permutaciones con repetición', 'التباديل مع التكرار', 'permutations with repetition'),
            say('faktoriala', 'factorial', 'مضروب', 'factorial')
        ],
        explanation: say(
            'Elementu batzuk berdinak badira, haiek trukatzeak ez du ordena berririk ematen. Horregatik, $n!$ zatitzen da berdinen talde bakoitzaren faktorialaz: a, a, b letrekin $\\frac{3!}{2!}=3$ ordena daude. Errepikapenezko permutazioak dira: letra errepikatuko anagramak, zifra errepikatuak edo txanpon baten aurpegiak eta gurutzeak.',
            'Si algunos elementos son iguales, intercambiarlos no da un orden nuevo. Por eso se divide $n!$ entre el factorial de cada grupo de iguales: con a, a, b hay $\\frac{3!}{2!}=3$ órdenes. Son las permutaciones con repetición: anagramas con letras repetidas, cifras repetidas o caras y cruces de una moneda.',
            'إذا كانت بعض العناصر متساوية فتبديلها لا يعطي ترتيبًا جديدًا. لذلك نقسم $n!$ على مضروب كل مجموعة من المتساويات: مع a وa وb توجد $\\frac{3!}{2!}=3$ ترتيبات. إنها التباديل مع التكرار: كلمات بأحرف مكررة، أو أرقام مكررة، أو وجها قطعة نقدية.',
            'If some elements are equal, swapping them does not give a new order. So divide $n!$ by the factorial of each group of equal ones: with a, a, b there are $\\frac{3!}{2!}=3$ orders. These are permutations with repetition: anagrams with repeated letters, repeated digits or heads and tails of a coin.'
        ),
        examplePrompt: say('Zenbat anagrama ditu CASA hitzak?', '¿Cuántos anagramas tiene la palabra CASA?', 'كم ترتيبًا لأحرف الكلمة CASA؟', 'How many anagrams does the word CASA have?'),
        example: same('$\\frac{4!}{2!}=12$'),
        exampleAnswer: say('Bi A berdinak: $4!=24$ ordenak bi aldiz zenbatzen dira.', 'Dos A iguales: las $4!=24$ ordenaciones cuentan cada palabra dos veces.', 'حرفا A متساويان: الترتيبات $4!=24$ تعدّ كل كلمة مرتين.', 'Two equal As: the $4!=24$ orders count each word twice.')
    },

    /* ---------- 4. Combinations ---------- */
    combinations: {
        vocabulary: [
            say('konbinazioak', 'combinaciones', 'التوافيق', 'combinations'),
            say('taldea', 'grupo', 'مجموعة', 'group')
        ],
        explanation: say(
            'Konbinazioetan $n$ elementutik $k$ aukeratzen dira, errepikatu gabe eta ordenak axola gabe: talde bat, ez zerrenda bat. Aldakuntzek talde bakoitza $k!$ aldiz zenbatzen dute; beraz, $\\text{C}_{n,k}=\\frac{\\text{V}_{n,k}}{k!}=\\frac{n!}{k!\\,(n-k)!}$. Galdera nagusia: talde bera bi ordenatan, gauza bera da? Hala bada, konbinazioak.',
            'En las combinaciones se eligen $k$ elementos de $n$, sin repetir y sin que importe el orden: un grupo, no una lista. Las variaciones cuentan cada grupo $k!$ veces, así que $\\text{C}_{n,k}=\\frac{\\text{V}_{n,k}}{k!}=\\frac{n!}{k!\\,(n-k)!}$. La pregunta clave: el mismo grupo en dos órdenes, ¿es lo mismo? Si lo es, combinaciones.',
            'في التوافيق نختار $k$ عنصرًا من $n$ دون تكرار ودون أهمية للترتيب: مجموعة لا قائمة. والتراتيب تعدّ كل مجموعة $k!$ مرة، لذلك $\\text{C}_{n,k}=\\frac{\\text{V}_{n,k}}{k!}=\\frac{n!}{k!\\,(n-k)!}$. والسؤال الأساسي: هل المجموعة نفسها بترتيبين شيء واحد؟ إن كانت كذلك فهي توافيق.',
            'In combinations you choose $k$ elements out of $n$, without repeats and without the order mattering: a group, not a list. Arrangements count each group $k!$ times, so $\\text{C}_{n,k}=\\frac{\\text{V}_{n,k}}{k!}=\\frac{n!}{k!\\,(n-k)!}$. The key question: is the same group in two orders the same thing? If so, combinations.'
        ),
        examplePrompt: say('5 lagunek eskua ematen badiote elkarri, bikote bakoitzak behin, zenbat esku-emate daude?', 'Si 5 amigos se dan la mano, cada pareja una vez, ¿cuántos apretones hay?', 'إذا تصافح 5 أصدقاء، كل اثنين مرة واحدة، فكم مصافحة؟', 'If 5 friends shake hands, each pair once, how many handshakes are there?'),
        example: same('$\\text{C}_{5,2}=\\frac{5\\cdot 4}{2}=10$'),
        exampleAnswer: say('Ana eta Luis Luis eta Ana bezala da: ordenarik gabe.', 'Ana con Luis es lo mismo que Luis con Ana: sin orden.', 'مصافحة أحمد لعلي هي نفسها مصافحة علي لأحمد: لا ترتيب.', 'Ana with Luis is the same as Luis with Ana: no order.'),
        why: {
            text: say(
                '$k$ elementuko talde bakoitza $k!$ eratara ordena daiteke, eta aldakuntzek zerrenda horiek guztiak zenbatzen dituzte. Horrela, A, B, C hiru diskorekin, aldakuntzek ABC, ACB, BAC, BCA, CAB eta CBA zenbatzen dituzte: sei zerrenda, talde bakar bat. Horregatik zatitzen da $k!$ zenbakiaz.',
                'Cada grupo de $k$ elementos se puede ordenar de $k!$ formas, y las variaciones cuentan todas esas listas. Así, con tres discos A, B, C, las variaciones cuentan ABC, ACB, BAC, BCA, CAB y CBA: seis listas, un solo grupo. Por eso se divide entre $k!$.',
                'كل مجموعة من $k$ عنصرًا يمكن ترتيبها بـ $k!$ طريقة، والتراتيب تعدّ كل تلك القوائم. فمع ثلاثة أقراص A وB وC تعدّ التراتيب ABC وACB وBAC وBCA وCAB وCBA: ست قوائم ومجموعة واحدة. لذلك نقسم على $k!$.',
                'Each group of $k$ elements can be put in order in $k!$ ways, and arrangements count all those lists. So, with three discs A, B, C, arrangements count ABC, ACB, BAC, BCA, CAB and CBA: six lists, one group. That is why you divide by $k!$.'
            )
        }
    },
    binomial: {
        vocabulary: [
            say('zenbaki konbinatorioa', 'número combinatorio', 'العدد التوافقي', 'binomial coefficient'),
            say('simetria', 'simetría', 'التناظر', 'symmetry')
        ],
        explanation: say(
            '$\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$ zenbaki konbinatorioa «$n$ gain $k$» irakurtzen da, eta $\\text{C}_{n,k}$ da. $\\binom{n}{0}=\\binom{n}{n}=1$ eta $\\binom{n}{1}=n$ betetzen ditu, baita simetria ere, $\\binom{n}{k}=\\binom{n}{n-k}$: $k$ aukeratzea beste $n-k$ uztea da. Gainera, $\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$.',
            'El número combinatorio $\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$ se lee «$n$ sobre $k$» y es $\\text{C}_{n,k}$. Cumple $\\binom{n}{0}=\\binom{n}{n}=1$, $\\binom{n}{1}=n$ y la simetría, $\\binom{n}{k}=\\binom{n}{n-k}$: elegir $k$ es dejar los otros $n-k$. Además, $\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$.',
            'العدد التوافقي $\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$ يُقرأ «$n$ فوق $k$» ويساوي $\\text{C}_{n,k}$. ويحقق $\\binom{n}{0}=\\binom{n}{n}=1$ و$\\binom{n}{1}=n$ والتناظر $\\binom{n}{k}=\\binom{n}{n-k}$: اختيار $k$ هو ترك $n-k$ الأخرى. وكذلك $\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$.',
            'The binomial coefficient $\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$ is read «$n$ choose $k$» and equals $\\text{C}_{n,k}$. It satisfies $\\binom{n}{0}=\\binom{n}{n}=1$, $\\binom{n}{1}=n$ and the symmetry, $\\binom{n}{k}=\\binom{n}{n-k}$: choosing $k$ is leaving the other $n-k$. Also, $\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$.'
        ),
        examplePrompt: say('Kalkulatu $\\binom{15}{13}$ eta $\\binom{6}{2}+\\binom{6}{3}$.', 'Calcula $\\binom{15}{13}$ y $\\binom{6}{2}+\\binom{6}{3}$.', 'احسب $\\binom{15}{13}$ و$\\binom{6}{2}+\\binom{6}{3}$.', 'Work out $\\binom{15}{13}$ and $\\binom{6}{2}+\\binom{6}{3}$.'),
        example: same('$\\begin{gathered}\\binom{15}{13}=\\binom{15}{2}=\\frac{15\\cdot 14}{2}=105\\\\ \\binom{6}{2}+\\binom{6}{3}=\\binom{7}{3}=35\\end{gathered}$'),
        exampleAnswer: say('Simetria: 15 elementutik 13 aukeratzea 2 uztea da. Eta triangeluaren araua: $15+20=35$.', 'Simetría: elegir 13 de 15 es dejar 2. Y la regla del triángulo: $15+20=35$.', 'التناظر: اختيار 13 من 15 هو ترك 2. وقاعدة المثلث: $15+20=35$.', 'Symmetry: choosing 13 of 15 is leaving 2. And the triangle rule: $15+20=35$.')
    },
    pascal: {
        vocabulary: [
            say('Tartagliaren triangelua', 'triángulo de Tartaglia', 'مثلث تارتاليا', 'Pascal\'s triangle'),
            say('errenkada', 'fila', 'الصف', 'row')
        ],
        explanation: say(
            'Tartagliaren triangeluan, errenkada bakoitza 1 zenbakiarekin hasi eta bukatzen da, eta barneko zenbaki bakoitza gaineko bien batura da. $n$ errenkada, 0 zenbakitik hasita, $\\binom{n}{0},\\ \\binom{n}{1},\\ \\ldots,\\ \\binom{n}{n}$ da. Simetrikoa da, eta $n$ errenkadaren batura $2^{n}$ da. Haren zenbakiak $(a+b)^{n}$ garapenaren koefizienteak dira.',
            'En el triángulo de Tartaglia cada fila empieza y acaba en 1, y cada número interior es la suma de los dos de encima. La fila $n$, contando desde 0, es $\\binom{n}{0},\\ \\binom{n}{1},\\ \\ldots,\\ \\binom{n}{n}$. Es simétrico, y la suma de la fila $n$ es $2^{n}$. Sus números son los coeficientes del desarrollo de $(a+b)^{n}$.',
            'في مثلث تارتاليا يبدأ كل صف وينتهي بـ 1، وكل عدد داخلي مجموع العددين فوقه. والصف $n$ بالعد من 0 هو $\\binom{n}{0},\\ \\binom{n}{1},\\ \\ldots,\\ \\binom{n}{n}$. وهو متناظر، ومجموع الصف $n$ هو $2^{n}$. وأعداده معاملات نشر $(a+b)^{n}$.',
            'In Pascal\'s triangle each row starts and ends with 1, and each inner number is the sum of the two above. Row $n$, counting from 0, is $\\binom{n}{0},\\ \\binom{n}{1},\\ \\ldots,\\ \\binom{n}{n}$. It is symmetric, and the sum of row $n$ is $2^{n}$. Its numbers are the coefficients of the expansion of $(a+b)^{n}$.'
        ),
        examplePrompt: say('Idatzi triangeluaren 4. errenkada eta egiaztatu $2^{4}$ ematen duela.', 'Escribe la fila 4 del triángulo y comprueba que suma $2^{4}$.', 'اكتب الصف 4 من المثلث وتحقّق من أن مجموعه $2^{4}$.', 'Write row 4 of the triangle and check that it adds up to $2^{4}$.'),
        example: same('$1+4+6+4+1=16=2^{4}$'),
        exampleAnswer: say('4 elementuko multzo batek 16 azpimultzo ditu: elementu bakoitza sartzen da edo ez.', 'Un conjunto de 4 elementos tiene 16 subconjuntos: cada elemento entra o no.', 'مجموعة من 4 عناصر لها 16 مجموعة جزئية: كل عنصر يدخل أو لا.', 'A set of 4 elements has 16 subsets: each element is in or out.'),
        why: {
            text: say(
                '$n+1$ elementutik $k+1$ aukeratzeko, begiratu haietako bati: sartzen da (eta beste $n$ elementuetatik $k$ falta dira) edo ez da sartzen (eta $k+1$ falta dira). Horregatik $\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$: zenbaki bakoitza gaineko bien batura da.',
                'Para elegir $k+1$ de $n+1$ elementos, fíjate en uno de ellos: o entra (y faltan $k$ de los otros $n$) o no entra (y faltan $k+1$). Por eso $\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$: cada número es la suma de los dos de encima.',
                'لاختيار $k+1$ من $n+1$ عنصرًا انظر إلى أحدها: إما أن يدخل (ويبقى $k$ من الـ $n$ الأخرى) وإما ألا يدخل (ويبقى $k+1$). لذلك $\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$: كل عدد مجموع العددين فوقه.',
                'To choose $k+1$ out of $n+1$ elements, look at one of them: either it is in (and $k$ of the other $n$ are left to choose) or it is out (and $k+1$ are left). That is why $\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$: each number is the sum of the two above.'
            )
        }
    },

    /* ---------- 5. Problems ---------- */
    'which-model': {
        vocabulary: [
            say('ordena', 'orden', 'الترتيب', 'order'),
            say('errepikapena', 'repetición', 'التكرار', 'repetition')
        ],
        explanation: say(
            'Lehenik galdetu: ordenak axola du? Talde bera bi ordenatan desberdina bada (zerrendak, zenbakiak, karguak), axola du; berdina bada (batzordeak, nahasteak), ez. Gero: elementuak errepika daitezke? Ordenarekin eta errepikapenarekin, $\\text{VR}$; ordenarekin eta errepikapenik gabe, $\\text{V}$ ($\\text{P}$, denak ordenatzen badira); ordenarik gabe, $\\text{C}$.',
            'Primero pregunta: ¿importa el orden? Si el mismo grupo en dos órdenes es distinto (listas, números, cargos), importa; si es igual (comisiones, mezclas), no. Después: ¿se pueden repetir los elementos? Con orden y con repetición, $\\text{VR}$; con orden y sin repetición, $\\text{V}$ ($\\text{P}$ si se ordenan todos); sin orden, $\\text{C}$.',
            'اسأل أولًا: هل الترتيب مهم؟ إذا كانت المجموعة نفسها بترتيبين مختلفة (قوائم، أعداد، مناصب) فهو مهم؛ وإذا كانت هي نفسها (لجان، خلطات) فلا. ثم: هل يجوز تكرار العناصر؟ مع الترتيب والتكرار $\\text{VR}$؛ ومع الترتيب دون تكرار $\\text{V}$ ($\\text{P}$ إذا رُتّبت كلها)؛ ودون ترتيب $\\text{C}$.',
            'First ask: does the order matter? If the same group in two orders is different (lists, numbers, posts), it matters; if it is the same (committees, mixtures), it does not. Then: can the elements repeat? With order and with repetition, $\\text{VR}$; with order and without repetition, $\\text{V}$ ($\\text{P}$ if all are arranged); without order, $\\text{C}$.'
        ),
        examplePrompt: say('Zein eredu da bakoitza? 3 zifrako zenbakiak 1, 2, 3, 4 zifrekin errepikatuz; 8 korrikalariren podiuma; 6 zaporetatik 2.', '¿Qué modelo es cada uno? Números de 3 cifras con 1, 2, 3, 4 repitiendo; el podio de 8 corredores; 2 sabores de 6.', 'ما النموذج في كل حالة؟ أعداد من 3 أرقام بالأرقام 1 و2 و3 و4 مع التكرار؛ منصة تتويج 8 عدائين؛ نكهتان من 6.', 'Which model is each? 3-digit numbers with 1, 2, 3, 4, repeating; the podium of 8 runners; 2 flavours out of 6.'),
        example: same('$\\begin{gathered}\\text{VR}_{4,3}=64\\qquad\\text{V}_{8,3}=336\\\\ \\text{C}_{6,2}=15\\end{gathered}$'),
        exampleAnswer: say('Zifrak errepikatzen dira (VR), podiumak ordena du (V) eta zaporeek ez (C).', 'Las cifras se repiten (VR), el podio tiene orden (V) y los sabores no (C).', 'الأرقام تتكرر (VR)، والمنصة لها ترتيب (V)، والنكهات لا (C).', 'The digits repeat (VR), the podium has an order (V) and the flavours do not (C).')
    },
    geometry: {
        vocabulary: [
            say('diagonala', 'diagonal', 'القطر', 'diagonal'),
            say('bidea', 'camino', 'المسار', 'path')
        ],
        explanation: say(
            'Lauki-sare batean, eskuinera eta gora doan bide bakoitza urrats-zerrenda bat da: eskuinera $d$ urrats eta gora $a$ badira, bidea aukeratzea zein diren gorakoak aukeratzea da, $\\binom{d+a}{a}$. Lerrokatu gabeko $n$ puntuk $\\binom{n}{2}$ zuzen ematen dituzte, eta $n$ aldeko poligono batek $\\binom{n}{2}-n=\\frac{n(n-3)}{2}$ diagonal ditu.',
            'En una cuadrícula, cada camino hacia la derecha y hacia arriba es una lista de pasos: con $d$ pasos a la derecha y $a$ hacia arriba, elegir el camino es elegir cuáles son hacia arriba, $\\binom{d+a}{a}$. Con $n$ puntos sin tres alineados hay $\\binom{n}{2}$ rectas, y un polígono de $n$ lados tiene $\\binom{n}{2}-n=\\frac{n(n-3)}{2}$ diagonales.',
            'في شبكة مربعات كل مسار نحو اليمين ونحو الأعلى قائمة خطوات: مع $d$ خطوة إلى اليمين و$a$ إلى الأعلى، اختيار المسار هو اختيار أيها إلى الأعلى، $\\binom{d+a}{a}$. ومع $n$ نقطة لا تقع ثلاث منها على استقامة يوجد $\\binom{n}{2}$ مستقيمًا، وللمضلع ذي $n$ ضلعًا $\\binom{n}{2}-n=\\frac{n(n-3)}{2}$ قطرًا.',
            'On a grid, each path going right and up is a list of steps: with $d$ steps right and $a$ up, choosing the path is choosing which ones go up, $\\binom{d+a}{a}$. With $n$ points, no three in line, there are $\\binom{n}{2}$ lines, and a polygon with $n$ sides has $\\binom{n}{2}-n=\\frac{n(n-3)}{2}$ diagonals.'
        ),
        examplePrompt: say('Zenbat diagonal ditu hexagono batek?', '¿Cuántas diagonales tiene un hexágono?', 'كم قطرًا للسداسي؟', 'How many diagonals does a hexagon have?'),
        example: same('$\\binom{6}{2}-6=15-6=9$'),
        exampleAnswer: say('15 erpin-bikoteetatik 6 aldeak dira: $\\frac{6\\cdot 3}{2}=9$.', 'De las 15 parejas de vértices, 6 son lados: $\\frac{6\\cdot 3}{2}=9$.', 'من بين 15 زوجًا من الرؤوس 6 أضلاع: $\\frac{6\\cdot 3}{2}=9$.', 'Of the 15 pairs of vertices, 6 are sides: $\\frac{6\\cdot 3}{2}=9$.')
    },
    committees: {
        vocabulary: [
            say('batzordea', 'comisión', 'لجنة', 'committee'),
            say('gutxienez', 'al menos', 'على الأقل', 'at least')
        ],
        explanation: say(
            'Problema askotan hainbat aukeraketa egiten dira batera, eta biderkaduraren erregelaz biderkatzen dira. Baldintza batek kasuak banatzen baditu («gutxienez bi»), zenbatu kasu bakoitza eta batu. Batzuetan errazagoa da aurkakoa: «gutxienez bat» guztiak ken «bat ere ez» da. Kargu desberdinak badaude, haietan ordenak axola du.',
            'En muchos problemas se hacen varias elecciones a la vez, y se multiplican por el principio del producto. Si una condición parte en casos («al menos dos»), cuenta cada caso y suma. A veces es más fácil el contrario: «al menos uno» es todos menos «ninguno». Si hay cargos distintos, en ellos importa el orden.',
            'في مسائل كثيرة تُجرى عدة اختيارات معًا وتُضرب بمبدأ الضرب. وإذا قسّم شرط إلى حالات («اثنان على الأقل») فعدّ كل حالة واجمع. وأحيانًا يكون العكس أسهل: «واحد على الأقل» هو الكل ناقص «لا أحد». وإذا وُجدت مناصب مختلفة فالترتيب فيها مهم.',
            'In many problems several choices are made at once, and they are multiplied by the product rule. If a condition splits into cases («at least two»), count each case and add. Sometimes the opposite is easier: «at least one» is all minus «none». If there are different posts, order matters in them.'
        ),
        examplePrompt: say('6 mutil eta 3 neskaren artean, 3 kideko batzorde bat aukeratzen da, gutxienez neska batekin. Zenbat eratara?', 'De 6 chicos y 3 chicas se elige una comisión de 3 con al menos una chica. ¿De cuántas formas?', 'من 6 فتيان و3 فتيات تُختار لجنة من 3 فيها فتاة على الأقل. بكم طريقة؟', 'From 6 boys and 3 girls, a committee of 3 with at least one girl is chosen. In how many ways?'),
        example: same('$\\binom{9}{3}-\\binom{6}{3}=84-20=64$'),
        exampleAnswer: say('Batzorde guztiak ken neskarik ez dutenak.', 'Todas las comisiones menos las que no tienen ninguna chica.', 'كل اللجان ناقص التي ليس فيها أي فتاة.', 'All committees minus those with no girl.'),
        why: {
            text: say(
                'Batzorde bakoitzak ez du neskarik edo gutxienez bat du: ez dago beste aukerarik. Horregatik, gutxienez bat dutenak guztiak dira, neskarik ez dutenak kenduta. «Bat ere ez» kasu bakarra da; «gutxienez bat», hiru.',
                'Cada comisión tiene o ninguna chica o al menos una: no hay otra posibilidad. Por eso, las que tienen al menos una son todas menos las que no tienen ninguna. Contar «ninguna» es un solo caso; «al menos una», tres.',
                'كل لجنة إما ليس فيها فتاة وإما فيها فتاة على الأقل: لا احتمال آخر. لذلك اللجان التي فيها فتاة على الأقل هي الكل ناقص التي ليس فيها أي فتاة. وعدّ «لا أحد» حالة واحدة، و«واحدة على الأقل» ثلاث حالات.',
                'Each committee has either no girl or at least one: there is no other possibility. So those with at least one are all of them minus those with none. Counting «none» is one case; «at least one», three.'
            )
        }
    }
}

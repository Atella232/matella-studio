import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { AlgebraIntroTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Aljebraren hastapenak · 1. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, the example as an exercise («Another example», or «Example»
   in the lessons of facts) and, in three lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. The explanation keeps the numbers that its drawing shows (the
   perimeter 2a + 2b, the machine 2x + 1, −4x²y, the tiles, 2(x + 3), the
   balance). Algebra always goes inside $…$, never glued to a Basque word.
   Every equality with letters on both sides of the example is an identity
   (tests/lesson-texts.test.ts tries two sets of numbers): the equations to
   solve stay in the statement, and the worked example keeps one side
   without letters (2x − x = 10 − 6). The example uses numbers of its own,
   never those of «Let's solve», of «Check it» or of the typical mistake.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const algebraIntroLessonTexts: Record<AlgebraIntroTopicId, LessonTexts> = {
    /* ---------- 1. Algebraic language ---------- */
    letters: {
        vocabulary: [
            say('letra', 'letra', 'الحرف', 'letter'),
            say('ohiko hizkuntza', 'lenguaje usual', 'اللغة العادية', 'everyday language'),
            say('hirukoitza', 'triple', 'ثلاثة أضعاف', 'three times')
        ],
        definitions: [
            {
                term: say('Hizkuntza aljebraikoa', 'Lenguaje algebraico', 'اللغة الجبرية', 'Algebraic language'),
                meaning: say('Eragiketen bidez lotutako letrak eta zenbakiak erabiltzen dituena.', 'El que usa letras y números unidos por operaciones.', 'اللغة التي تستعمل حروفًا وأعدادًا تربط بينها عمليات.', 'The one that uses letters and numbers joined by operations.')
            }
        ],
        explanation: say(
            'Hiru hizkuntza erabiltzen ditugu: ohikoa («bi gehi lau sei da»), zenbakizkoa ($2+4=6$) eta aljebraikoa. Zenbaki bat ezagutzen ez dugunean, edo edozein izan daitekeenean, letra batez izendatzen dugu: $x$, $y$, $a$… Zenbaki baten eta letra baten artean ez da biderketa-ikurra idazten: $3x$.',
            'Usamos tres lenguajes: el usual («dos más cuatro es seis»), el numérico ($2+4=6$) y el algebraico. Cuando no conocemos un número, o puede ser cualquiera, lo llamamos con una letra: $x$, $y$, $a$… Entre un número y una letra no se escribe el signo de multiplicar: $3x$.',
            'نستعمل ثلاث لغات: العادية («اثنان زائد أربعة يساوي ستة»)، والعددية ($2+4=6$)، والجبرية. وحين لا نعرف عددًا، أو يمكن أن يكون أي عدد، نسمّيه بحرف: $x$، $y$، $a$… ولا نكتب إشارة الضرب بين عدد وحرف: $3x$.',
            'We use three languages: everyday language («two plus four is six»), number language ($2+4=6$) and algebraic language. When we do not know a number, or it can be any number, we call it by a letter: $x$, $y$, $a$… Between a number and a letter the multiplication sign is not written: $3x$.'
        ),
        examplePrompt: say('Idatzi hizkuntza aljebraikoan: «zenbaki baten bikoitza», «zenbaki bat gehi 7» eta «zenbaki baten laurdena».', 'Escribe en lenguaje algebraico: «el doble de un número», «un número más 7» y «la cuarta parte de un número».', 'اكتب باللغة الجبرية: «ضعف عدد»، «عدد زائد 7»، «ربع عدد».', 'Write in algebraic language: «double a number», «a number plus 7» and «a quarter of a number».'),
        example: same('$2x\\qquad x+7\\qquad \\frac{x}{4}$'),
        exampleAnswer: say('Zenbaki ezezagunari $x$ deitzen zaio.', 'Al número desconocido se le llama $x$.', 'نسمّي العدد المجهول $x$.', 'The unknown number is called $x$.')
    },
    translate: {
        vocabulary: [
            say('formula', 'fórmula', 'الصيغة', 'formula'),
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter'),
            say('bikoitza', 'doble', 'الضعف', 'double')
        ],
        definitions: [
            {
                term: say('Adierazpen aljebraikoa', 'Expresión algebraica', 'العبارة الجبرية', 'Algebraic expression'),
                meaning: say('Eragiketa-ikurrez (+, −, ·, :, berreturak) lotutako zenbakiak eta letrak.', 'Números y letras unidos por signos de operaciones (+, −, ·, :, potencias).', 'أعداد وحروف تربط بينها إشارات العمليات (+، −، ·، :، القوى).', 'Numbers and letters joined by operation signs (+, −, ·, :, powers).')
            }
        ],
        explanation: say(
            'Esaldi bat itzultzeko, erabaki zer den ezezaguna ($x$), eta idatzi eragiketak ordenan. Formulak ere adierazpen aljebraikoak dira: marrazkiko laukizuzenaren perimetroa $2a+2b$ da, aldeek neurtzen dutena neurtzen dutela.',
            'Para traducir una frase, decide qué es lo desconocido ($x$) y escribe las operaciones en orden. Las fórmulas también son expresiones algebraicas: el perímetro del rectángulo del dibujo es $2a+2b$, midan lo que midan sus lados.',
            'لترجمة جملة حدّد المجهول ($x$) واكتب العمليات بالترتيب. والصيغ أيضًا عبارات جبرية: محيط المستطيل في الرسم هو $2a+2b$، مهما كان طول ضلعيه.',
            'To translate a sentence, decide what is unknown ($x$) and write the operations in order. Formulas are algebraic expressions too: the perimeter of the rectangle in the drawing is $2a+2b$, whatever its sides measure.'
        ),
        examplePrompt: say('Itzuli: «zenbaki baten karratua ken 1» eta «zenbaki baten eta 4 zenbakiaren baturaren bikoitza».', 'Traduce: «el cuadrado de un número menos 1» y «el doble de la suma de un número y 4».', 'ترجم: «مربع عدد ناقص 1» و«ضعف مجموع عدد و4».', 'Translate: «the square of a number minus 1» and «double the sum of a number and 4».'),
        example: same('$x^{2}-1\\qquad 2(x+4)$'),
        exampleAnswer: say('Bigarrenean, parentesia: lehenik batuketa, gero bikoitza.', 'En la segunda, el paréntesis: primero la suma, después el doble.', 'في الثانية القوس: أولًا الجمع ثم الضعف.', 'In the second, the bracket: first the sum, then the doubling.')
    },
    value: {
        vocabulary: [
            say('ordeztu', 'sustituir', 'عوّض', 'substitute'),
            say('hierarkia', 'jerarquía', 'الأولوية', 'order of operations'),
            say('makina', 'máquina', 'الآلة', 'machine')
        ],
        definitions: [
            {
                term: say('Zenbakizko balioa', 'Valor numérico', 'القيمة العددية', 'Numerical value'),
                meaning: say('Letrak zenbakiekin ordeztu eta eragiketak eginda ateratzen den zenbakia.', 'El número que sale al sustituir las letras por números y hacer las operaciones.', 'العدد الناتج عن تعويض الحروف بأعداد وإجراء العمليات.', 'The number you get by substituting numbers for the letters and doing the operations.')
            }
        ],
        explanation: say(
            'Zenbakizko balioa kalkulatzeko, ordeztu letra bakoitza bere balioarekin eta egin eragiketak hierarkia errespetatuz: berreturak, biderketak eta zatiketak, eta batuketak eta kenketak. Marrazkiko makinak $2x+1$ egiten du: 5 sartzen bada, 11 ateratzen da. Negatiboak parentesi artean ordezten dira.',
            'Para calcular el valor numérico, sustituye cada letra por su valor y opera respetando la jerarquía: potencias, multiplicaciones y divisiones, y sumas y restas. La máquina del dibujo hace $2x+1$: si entra 5, sale 11. Los negativos se sustituyen entre paréntesis.',
            'لحساب القيمة العددية عوّض كل حرف بقيمته واحسب مع احترام الأولوية: القوى، ثم الضرب والقسمة، ثم الجمع والطرح. آلة الرسم تحسب $2x+1$: إذا دخل 5 خرج 11. ونعوّض الأعداد السالبة بين قوسين.',
            'To work out the numerical value, substitute each letter with its value and calculate following the order of operations: powers, multiplications and divisions, and additions and subtractions. The machine in the drawing does $2x+1$: if 5 goes in, 11 comes out. Negatives are substituted in brackets.'
        ),
        examplePrompt: say('Aurkitu $x^{2}-2x$ adierazpenaren balioa $x=-3$ denean.', 'Halla el valor de $x^{2}-2x$ para $x=-3$.', 'أوجد قيمة $x^{2}-2x$ عندما $x=-3$.', 'Find the value of $x^{2}-2x$ when $x=-3$.'),
        example: same('$(-3)^{2}-2\\cdot(-3)=9+6=15$'),
        exampleAnswer: say('Zenbakizko balioa 15 da. $-3$ parentesi artean doa.', 'El valor numérico es 15. El $-3$ va entre paréntesis.', 'القيمة العددية 15. والعدد $-3$ بين قوسين.', 'The numerical value is 15. The $-3$ goes in brackets.')
    },

    /* ---------- 2. Monomials and polynomials ---------- */
    monomial: {
        vocabulary: [
            say('biderkadura', 'producto', 'حاصل الضرب', 'product'),
            say('berretzaileak', 'exponentes', 'الأسس', 'exponents'),
            say('letrak', 'letras', 'الحروف', 'letters')
        ],
        definitions: [
            {
                term: say('Koefizientea eta zati literala', 'Coeficiente y parte literal', 'المعامل والجزء الحرفي', 'Coefficient and letter part'),
                meaning: say('Monomio batean, zenbakia koefizientea da, eta letrak, berretzaileekin, zati literala.', 'En un monomio, el número es el coeficiente, y las letras con sus exponentes, la parte literal.', 'في وحيد الحد العدد هو المعامل، والحروف بأسسها هي الجزء الحرفي.', 'In a monomial, the number is the coefficient, and the letters with their exponents, the letter part.')
            },
            {
                term: say('Maila', 'Grado', 'الدرجة', 'Degree'),
                meaning: say('Letren berretzaileen batura.', 'La suma de los exponentes de las letras.', 'مجموع أسس الحروف.', 'The sum of the exponents of the letters.')
            }
        ],
        explanation: say(
            'Monomioa zenbakien eta letren biderkadura da, marrazkiko $-4x^{2}y$ bezala: koefizientea $-4$, zati literala $x^{2}y$ eta maila $2+1=3$. 1 koefizientea eta 1 berretzailea ez dira idazten ($x$, ez $1x^{1}$), ezta biderketa-ikurra ere.',
            'Un monomio es un producto de números y letras, como $-4x^{2}y$ en el dibujo: coeficiente $-4$, parte literal $x^{2}y$ y grado $2+1=3$. El coeficiente 1 y el exponente 1 no se escriben ($x$, no $1x^{1}$), ni el signo de multiplicar.',
            'وحيد الحد حاصل ضرب أعداد وحروف، مثل $-4x^{2}y$ في الرسم: المعامل $-4$، والجزء الحرفي $x^{2}y$، والدرجة $2+1=3$. ولا نكتب المعامل 1 ولا الأسّ 1 ($x$ لا $1x^{1}$)، ولا إشارة الضرب.',
            'A monomial is a product of numbers and letters, like $-4x^{2}y$ in the drawing: coefficient $-4$, letter part $x^{2}y$ and degree $2+1=3$. A coefficient of 1 and an exponent of 1 are not written ($x$, not $1x^{1}$), nor is the multiplication sign.'
        ),
        examplePrompt: say('Esan $7a^{3}b^{2}$ monomioaren koefizientea, zati literala eta maila.', 'Di el coeficiente, la parte literal y el grado de $7a^{3}b^{2}$.', 'اذكر المعامل والجزء الحرفي والدرجة في $7a^{3}b^{2}$.', 'Give the coefficient, the letter part and the degree of $7a^{3}b^{2}$.'),
        example: same('$7a^{3}b^{2}$'),
        exampleAnswer: say('Koefizientea 7, zati literala $a^{3}b^{2}$ eta maila $3+2=5$.', 'Coeficiente 7, parte literal $a^{3}b^{2}$ y grado $3+2=5$.', 'المعامل 7، والجزء الحرفي $a^{3}b^{2}$، والدرجة $3+2=5$.', 'Coefficient 7, letter part $a^{3}b^{2}$ and degree $3+2=5$.')
    },
    'like-terms': {
        vocabulary: [
            say('zati literala', 'parte literal', 'الجزء الحرفي', 'letter part'),
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('berretzaileak', 'exponentes', 'الأسس', 'exponents')
        ],
        definitions: [
            {
                term: say('Monomio antzekoak', 'Monomios semejantes', 'وحيدات الحد المتشابهة', 'Like terms'),
                meaning: say('Zati literal bera dutenak: letra berak, berretzaile berekin.', 'Los que tienen la misma parte literal: las mismas letras con los mismos exponentes.', 'التي لها الجزء الحرفي نفسه: الحروف نفسها بالأسس نفسها.', 'Monomials with the same letter part: the same letters with the same exponents.')
            }
        ],
        explanation: say(
            'Bi monomio antzekoak diren jakiteko, begiratu letrei eta haien berretzaileei bakarrik: koefizientea ez da kontuan hartzen. $2x$ eta $-3x$ antzekoak dira; $4x^{2}y$ eta $2xy^{2}$, ez: letra berak dituzte, baina berretzaile desberdinekin.',
            'Para saber si dos monomios son semejantes, mira solo las letras y sus exponentes: el coeficiente no cuenta. $2x$ y $-3x$ son semejantes; $4x^{2}y$ y $2xy^{2}$, no: tienen las mismas letras, pero con exponentes distintos.',
            'لمعرفة هل وحيدا الحد متشابهان انظر إلى الحروف وأسسها فقط: المعامل لا يهم. $2x$ و$-3x$ متشابهان؛ أما $4x^{2}y$ و$2xy^{2}$ فلا: لهما الحروف نفسها لكن بأسس مختلفة.',
            'To know whether two monomials are like terms, look only at the letters and their exponents: the coefficient does not count. $2x$ and $-3x$ are like terms; $4x^{2}y$ and $2xy^{2}$ are not: they have the same letters, but with different exponents.'
        ),
        examplePrompt: say('Zein dira $6ab^{2}$ monomioaren antzekoak: $-ab^{2}$, $6a^{2}b$, $\\frac{1}{2}ab^{2}$?', '¿Cuáles son semejantes a $6ab^{2}$: $-ab^{2}$, $6a^{2}b$, $\\frac{1}{2}ab^{2}$?', 'أيّها يشابه $6ab^{2}$: $-ab^{2}$، $6a^{2}b$، $\\frac{1}{2}ab^{2}$؟', 'Which are like terms of $6ab^{2}$: $-ab^{2}$, $6a^{2}b$, $\\frac{1}{2}ab^{2}$?'),
        example: same('$6ab^{2},\\ -ab^{2},\\ \\frac{1}{2}ab^{2}$'),
        exampleAnswer: say('$-ab^{2}$ eta $\\frac{1}{2}ab^{2}$: zati literal bera. $6a^{2}b$ ez: berretzaileak aldatuta daude.', '$-ab^{2}$ y $\\frac{1}{2}ab^{2}$: misma parte literal. $6a^{2}b$ no: los exponentes están cambiados.', '$-ab^{2}$ و$\\frac{1}{2}ab^{2}$: الجزء الحرفي نفسه. أما $6a^{2}b$ فلا: الأسس مبدّلة.', '$-ab^{2}$ and $\\frac{1}{2}ab^{2}$: the same letter part. $6a^{2}b$ is not: the exponents are swapped.')
    },
    polynomial: {
        vocabulary: [
            say('gaia', 'término', 'الحد', 'term'),
            say('maila', 'grado', 'الدرجة', 'degree')
        ],
        definitions: [
            {
                term: say('Polinomioa', 'Polinomio', 'كثير الحدود', 'Polynomial'),
                meaning: say('Antzekoak ez diren monomioen batura edo kenketa; bakoitza gai bat da.', 'Una suma o resta de monomios no semejantes; cada uno es un término.', 'مجموع أو فرق وحيدات حد غير متشابهة؛ كل منها حد.', 'A sum or difference of monomials that are not like terms; each one is a term.')
            },
            {
                term: say('Gai askea', 'Término independiente', 'الحد الثابت', 'Constant term'),
                meaning: say('Letrarik gabeko gaia.', 'El término sin letras.', 'الحد الذي لا حروف فيه.', 'The term without letters.')
            }
        ],
        explanation: say(
            'Polinomio baten maila mailarik handieneko gaiaren maila da. Aztertzeko, idatzi haren gaiak bere zeinuarekin, bilatu gai askea eta konparatu mailak.',
            'El grado de un polinomio es el grado de su término de mayor grado. Para estudiarlo, escribe sus términos con su signo, busca el término independiente y compara los grados.',
            'درجة كثير الحدود هي درجة حده الأعلى درجة. ولدراسته اكتب حدوده بإشاراتها، وابحث عن الحد الثابت، وقارن الدرجات.',
            'The degree of a polynomial is the degree of its highest-degree term. To study it, write its terms with their signs, find the constant term and compare the degrees.'
        ),
        examplePrompt: say('Aztertu $2y^{4}-y^{2}+6$ polinomioa.', 'Estudia el polinomio $2y^{4}-y^{2}+6$.', 'ادرس كثير الحدود $2y^{4}-y^{2}+6$.', 'Study the polynomial $2y^{4}-y^{2}+6$.'),
        example: same('$2y^{4},\\ -y^{2},\\ 6$'),
        exampleAnswer: say('Hiru gai; gai askea 6; 4 maila.', 'Tres términos; término independiente 6; grado 4.', 'ثلاثة حدود؛ الحد الثابت 6؛ الدرجة 4.', 'Three terms; constant term 6; degree 4.')
    },

    /* ---------- 3. Operations ---------- */
    'add-monomials': {
        vocabulary: [
            say('laburtu', 'reducir', 'اختصر', 'simplify'),
            say('taldekatu', 'agrupar', 'اجمع', 'group'),
            say('fitxak', 'fichas', 'البطاقات', 'tiles')
        ],
        explanation: say(
            'Monomio antzekoak bakarrik batu edo kendu daitezke: koefizienteak batzen dira, eta zati literala uzten da. Antzekoak ez badira, adierazita uzten da. Laburtzeko, taldekatu antzekoak, marrazkiko fitxak bezala: $3x+2+2x+1=5x+3$.',
            'Solo se suman o restan monomios semejantes: se suman los coeficientes y se deja la parte literal. Si no son semejantes, se deja indicado. Para reducir, agrupa los semejantes, como las fichas del dibujo: $3x+2+2x+1=5x+3$.',
            'لا نجمع ولا نطرح إلا وحيدات الحد المتشابهة: نجمع المعاملات ونترك الجزء الحرفي. وإذا لم تكن متشابهة نتركها كما هي. وللاختصار اجمع المتشابهة، مثل بطاقات الرسم: $3x+2+2x+1=5x+3$.',
            'You can only add or subtract like terms: add the coefficients and keep the letter part. If they are not alike, leave it as it is. To simplify, group the like terms, like the tiles in the drawing: $3x+2+2x+1=5x+3$.'
        ),
        examplePrompt: say('Laburtu $7a-2b+3a+5b-a$.', 'Reduce $7a-2b+3a+5b-a$.', 'اختصر $7a-2b+3a+5b-a$.', 'Simplify $7a-2b+3a+5b-a$.'),
        example: same('$\\begin{aligned}&(7a+3a-a)+(-2b+5b)\\\\&=9a+3b\\end{aligned}$'),
        exampleAnswer: say('$a$ gaiak $a$ gaiekin eta $b$ gaiak $b$ gaiekin: $9a$ eta $3b$ ezin dira batu.', 'Las $a$ con las $a$ y las $b$ con las $b$: $9a$ y $3b$ no se pueden sumar.', '$a$ مع $a$ و$b$ مع $b$: ولا يمكن جمع $9a$ و$3b$.', 'The $a$ terms with the $a$ terms and the $b$ terms with the $b$ terms: $9a$ and $3b$ cannot be added.'),
        why: {
            text: say(
                '3 sagar gehi 2 sagar 5 sagar dira, baina 3 sagar gehi 2 udare ez dira 5 ezer: $3x+2y$ horrela geratzen da. Letrak gauza mota esaten du, eta koefizienteak, zenbat dauden.',
                '3 manzanas más 2 manzanas son 5 manzanas, pero 3 manzanas más 2 peras no son 5 de nada: $3x+2y$ se queda así. La letra dice el tipo de cosa, y el coeficiente, cuántas hay.',
                '3 تفاحات زائد تفاحتين تساوي 5 تفاحات، لكن 3 تفاحات زائد إجاصتين ليست 5 من شيء: تبقى $3x+2y$ كما هي. الحرف يدل على نوع الشيء، والمعامل على عدده.',
                '3 apples plus 2 apples are 5 apples, but 3 apples plus 2 pears are not 5 of anything: $3x+2y$ stays as it is. The letter tells you the kind of thing, and the coefficient how many there are.'
            ),
            math: same('$3x+2x=5x$')
        }
    },
    'multiply-monomials': {
        vocabulary: [
            say('berretzaileak', 'exponentes', 'الأسس', 'exponents'),
            say('koefizienteak', 'coeficientes', 'المعاملات', 'coefficients'),
            say('zeinuen araua', 'regla de los signos', 'قاعدة الإشارات', 'sign rule')
        ],
        explanation: say(
            'Bi monomioren biderkadura beste monomio bat da: koefizienteak biderkatzen dira, eta letra bakoitzaren berretzaileak batu. Zatitzean, koefizienteak zatitzen dira eta berretzaileak kendu. Ez ahaztu zeinuen araua.',
            'El producto de dos monomios es otro monomio: se multiplican los coeficientes y se suman los exponentes de cada letra. Al dividir, se dividen los coeficientes y se restan los exponentes. No olvides la regla de los signos.',
            'حاصل ضرب وحيدَي حد وحيد حد آخر: نضرب المعاملات ونجمع أسس كل حرف. وعند القسمة نقسم المعاملات ونطرح الأسس. ولا تنسَ قاعدة الإشارات.',
            'The product of two monomials is another monomial: multiply the coefficients and add the exponents of each letter. To divide, divide the coefficients and subtract the exponents. Do not forget the sign rule.'
        ),
        examplePrompt: say('Kalkulatu $(-3x^{2})\\cdot 4x^{3}$ eta $15a^{4}\\mathbin{:}(5a)$.', 'Calcula $(-3x^{2})\\cdot 4x^{3}$ y $15a^{4}\\mathbin{:}(5a)$.', 'احسب $(-3x^{2})\\cdot 4x^{3}$ و$15a^{4}\\mathbin{:}(5a)$.', 'Work out $(-3x^{2})\\cdot 4x^{3}$ and $15a^{4}\\mathbin{:}(5a)$.'),
        example: same('$\\begin{gathered}(-3x^{2})\\cdot 4x^{3}=-12x^{5}\\\\15a^{4}\\mathbin{:}(5a)=3a^{3}\\end{gathered}$'),
        exampleAnswer: say('Zeinu desberdinak: −. Berretzaileak: $2+3=5$ eta $4-1=3$.', 'Signos distintos: −. Exponentes: $2+3=5$ y $4-1=3$.', 'إشارتان مختلفتان: −. الأسس: $2+3=5$ و$4-1=3$.', 'Different signs: −. Exponents: $2+3=5$ and $4-1=3$.')
    },
    brackets: {
        vocabulary: [
            say('banatze-propietatea', 'propiedad distributiva', 'خاصية التوزيع', 'distributive property'),
            say('gaiak', 'términos', 'الحدود', 'terms'),
            say('zeinuak', 'signos', 'الإشارات', 'signs')
        ],
        explanation: say(
            'Parentesi baten aurrean zenbaki bat badago, barruko gaiak biderkatzen ditu, guztiak: banatze-propietatea da, marrazkiko laukizuzenean bezala, $2(x+3)=2x+6$. Aurrean minus zeinua badago, barruko zeinu guztiak aldatzen dira. Gero, laburtu.',
            'Si delante de un paréntesis hay un número, multiplica a todos los términos de dentro: es la propiedad distributiva, como en el rectángulo del dibujo, $2(x+3)=2x+6$. Si delante hay un signo menos, cambian todos los signos de dentro. Después, reduce.',
            'إذا سبق القوسَ عددٌ فإنه يضرب كل الحدود داخله: هذه خاصية التوزيع، كما في مستطيل الرسم، $2(x+3)=2x+6$. وإذا سبقته إشارة ناقص تتغير كل الإشارات داخله. ثم اختصر.',
            'If there is a number in front of a bracket, it multiplies every term inside: that is the distributive property, as in the rectangle in the drawing, $2(x+3)=2x+6$. If there is a minus sign in front, every sign inside changes. Then simplify.'
        ),
        examplePrompt: say('Kendu parentesiak eta laburtu: $5(2x-1)-(x+4)$.', 'Quita los paréntesis y reduce: $5(2x-1)-(x+4)$.', 'احذف الأقواس واختصر: $5(2x-1)-(x+4)$.', 'Remove the brackets and simplify: $5(2x-1)-(x+4)$.'),
        example: same('$\\begin{aligned}&5(2x-1)-(x+4)\\\\&=10x-5-x-4\\\\&=9x-9\\end{aligned}$'),
        exampleAnswer: say('5 zenbakia bi gaietara iristen da, eta minusak bi zeinuak aldatzen ditu.', 'El 5 llega a los dos términos, y el menos cambia los dos signos.', 'العدد 5 يصل إلى الحدّين، والناقص يغيّر الإشارتين.', 'The 5 reaches both terms, and the minus changes both signs.'),
        why: {
            text: say(
                '$2(x+3)$ hau da: $(x+3)+(x+3)$. Bi $x$ eta bi hiru daude: $2x+6$. Horregatik iristen da kanpoko zenbakia barruko gai guztietara.',
                '$2(x+3)$ es $(x+3)+(x+3)$. Hay dos $x$ y dos treses: $2x+6$. Por eso el número de fuera llega a todos los términos de dentro.',
                '$2(x+3)$ تعني $(x+3)+(x+3)$. فيها $x$ مرتين و3 مرتين: $2x+6$. لذلك يصل العدد الخارجي إلى كل الحدود داخل القوس.',
                '$2(x+3)$ is $(x+3)+(x+3)$. There are two $x$ and two threes: $2x+6$. That is why the number outside reaches every term inside.'
            ),
            math: same('$\\begin{aligned}2(x+3)&=(x+3)+(x+3)\\\\&=2x+6\\end{aligned}$')
        }
    },

    /* ---------- 4. Equations ---------- */
    equation: {
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('soluzioa', 'solución', 'الحل', 'solution'),
            say('atala', 'miembro', 'الطرف', 'side')
        ],
        definitions: [
            {
                term: say('Identitatea', 'Identidad', 'المتطابقة', 'Identity'),
                meaning: say('Letren edozein baliorekin betetzen den berdintza aljebraikoa: $x+x=2x$.', 'Igualdad algebraica que se cumple para cualquier valor de las letras: $x+x=2x$.', 'مساواة جبرية تتحقق لأي قيمة للحروف: $x+x=2x$.', 'An algebraic equality that holds for any value of the letters: $x+x=2x$.')
            },
            {
                term: say('Ekuazioa', 'Ecuación', 'المعادلة', 'Equation'),
                meaning: say('Balio batzuekin bakarrik betetzen den berdintza aljebraikoa.', 'Igualdad algebraica que solo se cumple para algunos valores.', 'مساواة جبرية لا تتحقق إلا لبعض القيم.', 'An algebraic equality that holds only for some values.')
            }
        ],
        explanation: say(
            'Berdintza batek bi adierazpen lotzen ditu = ikurrarekin. Letrak baditu, identitatea edo ekuazioa izan daiteke. Ekuazio bateko letra ezezaguna da, eta hura betetzen duen balioa, soluzioa: $x+2=8$ ekuazioa $x=6$ denean bakarrik betetzen da.',
            'Una igualdad une dos expresiones con el signo =. Si tiene letras, puede ser una identidad o una ecuación. La letra de una ecuación es la incógnita, y el valor que la cumple, la solución: $x+2=8$ solo se cumple con $x=6$.',
            'المساواة تربط عبارتين بالإشارة =. وإذا كان فيها حروف فقد تكون متطابقة أو معادلة. وحرف المعادلة هو المجهول، والقيمة التي تحققها هي الحل: $x+2=8$ لا تتحقق إلا عندما $x=6$.',
            'An equality joins two expressions with the = sign. If it has letters, it can be an identity or an equation. The letter in an equation is the unknown, and the value that makes it true, the solution: $x+2=8$ only holds when $x=6$.'
        ),
        examplePrompt: say('$x=3$ da $5x-4=11$ ekuazioaren soluzioa? Eta $2x+1=8$ ekuazioarena?', '¿Es $x=3$ solución de $5x-4=11$? ¿Y de $2x+1=8$?', 'هل $x=3$ حل للمعادلة $5x-4=11$؟ وللمعادلة $2x+1=8$؟', 'Is $x=3$ a solution of $5x-4=11$? And of $2x+1=8$?'),
        example: same('$\\begin{gathered}5\\cdot 3-4=11\\\\2\\cdot 3+1=7\\neq 8\\end{gathered}$'),
        exampleAnswer: say('Lehenengoan bai: bi atalek 11 ematen dute. Bigarrenean, ez.', 'En la primera sí: los dos miembros dan 11. En la segunda, no.', 'في الأولى نعم: يعطي الطرفان 11. وفي الثانية لا.', 'In the first, yes: both sides give 11. In the second, no.')
    },
    trial: {
        vocabulary: [
            say('probatu', 'probar', 'جرّب', 'try'),
            say('buruz', 'de cabeza', 'ذهنيًا', 'in your head'),
            say('atala', 'miembro', 'الطرف', 'side')
        ],
        explanation: say(
            'Ekuazio erraz asko buruz ebazten dira: $5+x=7$ ekuazioan, zenbat batu behar zaio 5 zenbakiari 7 emateko? Bestela, probatu balioak: atal bat handiegia bada, probatu txikiago bat; txikiegia bada, handiago bat.',
            'Muchas ecuaciones sencillas se resuelven de cabeza: en $5+x=7$, ¿cuánto hay que sumar a 5 para que dé 7? Si no, prueba valores: si un miembro se pasa, prueba uno menor; si se queda corto, uno mayor.',
            'كثير من المعادلات السهلة تُحل ذهنيًا: في $5+x=7$، كم نضيف إلى 5 ليصبح 7؟ وإلا فجرّب قيمًا: إذا زاد أحد الطرفين فجرّب قيمة أصغر؛ وإذا نقص فجرّب أكبر.',
            'Many simple equations can be solved in your head: in $5+x=7$, how much do you add to 5 to get 7? If not, try values: if one side is too big, try a smaller one; if it falls short, a bigger one.'
        ),
        examplePrompt: say('Ebatzi probatuz: $4x-1=19$.', 'Resuelve por tanteo: $4x-1=19$.', 'حلّ بالتجريب: $4x-1=19$.', 'Solve by trial: $4x-1=19$.'),
        example: same('$\\begin{gathered}4\\cdot 4-1=15\\\\4\\cdot 6-1=23\\\\4\\cdot 5-1=19\\end{gathered}$'),
        exampleAnswer: say('4 zenbakiarekin txikiegia da, eta 6 zenbakiarekin handiegia: soluzioa $x=5$ da.', 'Con 4 se queda corto y con 6 se pasa: la solución es $x=5$.', 'مع 4 ينقص ومع 6 يزيد: الحل $x=5$.', 'With 4 it falls short and with 6 it is too big: the solution is $x=5$.')
    },
    transpose: {
        vocabulary: [
            say('balantza', 'balanza', 'الميزان', 'balance'),
            say('atala', 'miembro', 'الطرف', 'side'),
            say('kontrako eragiketa', 'operación contraria', 'العملية المعاكسة', 'opposite operation')
        ],
        definitions: [
            {
                term: say('Askatu', 'Despejar', 'عزل المجهول', 'Solve for x'),
                meaning: say('Ezezaguna atal batean bakarrik uztea.', 'Dejar la incógnita sola en un miembro.', 'ترك المجهول وحده في أحد الطرفين.', 'Leaving the unknown on its own on one side.')
            }
        ],
        explanation: say(
            'Ekuazio bat orekan dagoen balantza bat bezalakoa da: bi plateretan gauza bera egiten bada, orekan jarraitzen du. Horregatik, gai bat beste atalera pasatzen da kontrako eragiketa eginez: batzen dagoena kentzen, eta biderkatzen dagoena zatitzen.',
            'Una ecuación es como una balanza en equilibrio: si se hace lo mismo en los dos platos, sigue equilibrada. Por eso un término pasa al otro miembro haciendo la operación contraria: sumando pasa restando, y multiplicando pasa dividiendo.',
            'المعادلة مثل ميزان متوازن: إذا فعلنا الشيء نفسه في الكفتين يبقى متوازنًا. لذلك ينتقل الحد إلى الطرف الآخر بالعملية المعاكسة: ما يُجمع ينتقل مطروحًا، وما يَضرب ينتقل قاسمًا.',
            'An equation is like a balance in equilibrium: if you do the same thing on both pans, it stays balanced. That is why a term moves to the other side doing the opposite operation: adding becomes subtracting, and multiplying becomes dividing.'
        ),
        examplePrompt: say('Askatu $x$: $x-9=4$ eta $5x=35$.', 'Despeja la $x$: $x-9=4$ y $5x=35$.', 'اعزل $x$: $x-9=4$ و$5x=35$.', 'Solve for $x$: $x-9=4$ and $5x=35$.'),
        example: same('$\\begin{gathered}x=4+9=13\\\\x=35\\mathbin{:}5=7\\end{gathered}$'),
        exampleAnswer: say('$-9$ batzen pasatzen da, eta biderkatzen duen 5 zenbakia zatitzen.', 'El $-9$ pasa sumando y el 5 que multiplica pasa dividiendo.', 'ينتقل $-9$ مجموعًا، وينتقل 5 الذي يضرب قاسمًا.', 'The $-9$ moves across adding and the 5 that multiplies moves across dividing.'),
        why: {
            text: say(
                '$+2$ beste atalera pasatzea balantzaren bi plateretatik 2 kentzea da: $x+2-2=8-2$. Ezkerrean $x$ geratzen da, eta eskuinean $8-2$: 2 zenbakiak kentzen «salto» egin duela dirudi.',
                'Pasar el $+2$ al otro lado es quitar 2 de los dos platos de la balanza: $x+2-2=8-2$. A la izquierda queda $x$ y a la derecha, $8-2$: parece que el 2 ha «saltado» restando.',
                'نقل $+2$ إلى الطرف الآخر يعني رفع 2 من كفتي الميزان: $x+2-2=8-2$. فيبقى $x$ في اليسار و$8-2$ في اليمين: كأن 2 «قفز» مطروحًا.',
                'Moving the $+2$ to the other side is taking 2 off both pans of the balance: $x+2-2=8-2$. On the left $x$ is left, and on the right $8-2$: it looks as if the 2 has «jumped» across subtracting.'
            ),
            math: same('$x+2-2=8-2$')
        }
    },
    solve: {
        vocabulary: [
            say('askatu', 'despejar', 'اعزل', 'solve for'),
            say('laburtu', 'reducir', 'اختصر', 'simplify'),
            say('egiaztatu', 'comprobar', 'تحقّق', 'check')
        ],
        explanation: say(
            'Ekuazio luzeago bat ebazteko, jarraitu urrats hauek ordenan: kendu parentesiak; pasatu $x$ duten gaiak atal batera eta zenbakiak bestera; laburtu; askatu $x$; eta egiaztatu soluzioa hasierako ekuazioan.',
            'Para resolver una ecuación más larga, sigue estos pasos en orden: quita los paréntesis; pasa los términos con $x$ a un miembro y los números al otro; reduce; despeja la $x$ y comprueba la solución en la ecuación inicial.',
            'لحل معادلة أطول اتبع هذه الخطوات بالترتيب: احذف الأقواس؛ انقل الحدود التي فيها $x$ إلى طرف والأعداد إلى الطرف الآخر؛ اختصر؛ اعزل $x$؛ وتحقّق من الحل في المعادلة الأصلية.',
            'To solve a longer equation, follow these steps in order: remove the brackets; move the terms with $x$ to one side and the numbers to the other; simplify; solve for $x$ and check the solution in the original equation.'
        ),
        examplePrompt: say('Ebatzi $2(x+3)=x+10$.', 'Resuelve $2(x+3)=x+10$.', 'حلّ $2(x+3)=x+10$.', 'Solve $2(x+3)=x+10$.'),
        example: same('$\\begin{gathered}2x-x=10-6\\\\x=4\\end{gathered}$'),
        exampleAnswer: say('Parentesia: $2(x+3)=2x+6$. Egiaztapena: $2\\cdot 7=14$ eta $4+10=14$.', 'Paréntesis: $2(x+3)=2x+6$. Comprobación: $2\\cdot 7=14$ y $4+10=14$.', 'القوس: $2(x+3)=2x+6$. التحقق: $2\\cdot 7=14$ و$4+10=14$.', 'Bracket: $2(x+3)=2x+6$. Check: $2\\cdot 7=14$ and $4+10=14$.')
    },
    problems: {
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('enuntziatua', 'enunciado', 'نص المسألة', 'statement'),
            say('ekuazioa', 'ecuación', 'المعادلة', 'equation')
        ],
        explanation: say(
            'Ekuazio batek buruketak ebazteko balio du, lau urratsetan: erabaki zein den ezezaguna ($x$); itzuli enuntziatua ekuazio batera; ebatzi; eta egiaztatu emaitzak zentzua duela, esaldi batez erantzun aurretik.',
            'Una ecuación sirve para resolver problemas, en cuatro pasos: decide cuál es la incógnita ($x$); traduce el enunciado a una ecuación; resuélvela; y comprueba que el resultado tiene sentido antes de responder con una frase.',
            'المعادلة أداة لحل المسائل، في أربع خطوات: حدّد المجهول ($x$)؛ ترجم نص المسألة إلى معادلة؛ حلّها؛ ثم تحقّق من أن النتيجة معقولة قبل أن تجيب بجملة.',
            'An equation helps you solve problems, in four steps: decide what the unknown is ($x$); translate the statement into an equation; solve it; and check the result makes sense before answering with a sentence.'
        ),
        examplePrompt: say('Anak bere anaiak baino 4 urte gehiago ditu, eta biek batera 30 urte dituzte. Zenbat urte ditu bakoitzak?', 'Ana tiene 4 años más que su hermano, y entre los dos suman 30. ¿Cuántos años tiene cada uno?', 'عمر آنا يزيد 4 سنوات على عمر أخيها، ومجموع عمريهما 30. كم عمر كل منهما؟', 'Ana is 4 years older than her brother, and together they add up to 30. How old is each of them?'),
        example: same('$\\begin{gathered}x+(x+4)=30\\\\2x=26\\ \\to\\ x=13\\end{gathered}$'),
        exampleAnswer: say('Anaiak 13 urte ditu, eta Anak 17: $13+17=30$.', 'El hermano tiene 13 años y Ana, 17: $13+17=30$.', 'عمر الأخ 13 سنة وعمر آنا 17: $13+17=30$.', 'Her brother is 13 and Ana is 17: $13+17=30$.')
    }
}

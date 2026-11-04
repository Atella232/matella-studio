import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { PolynomialsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Polinomioak eta zatiki aljebraikoak · 4. DBH akademikoak — what each
   lesson tells: the new words (definitions), a short explanation, its
   cases, the example as an exercise («Another example»), the key words in
   four languages and, in three lessons, «Why does it work?». Plain data so
   the tests can import it; lessons.tsx merges it into the topics. The
   examples are identities (tests/lesson-texts.test.ts tries them with two
   sets of numbers), with numbers of their own.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const polynomialsLessonTexts: Record<PolynomialsTopicId, LessonTexts> = {
    /* ---------- 1. Operations ---------- */
    polynomials: {
        definitions: [
            {
                term: say('Polinomioa', 'Polinomio', 'كثير الحدود', 'Polynomial'),
                meaning: say('Antzekoak ez diren monomioen batura. Bere maila bere gaien mailarik handiena da.', 'Una suma de monomios no semejantes. Su grado es el mayor grado de sus términos.', 'مجموع أحاديات حد غير متشابهة. ودرجته أكبر درجة بين حدوده.', 'A sum of unlike monomials. Its degree is the highest degree of its terms.')
            },
            {
                term: say('Zenbakizko balioa', 'Valor numérico', 'القيمة العددية', 'Value'),
                meaning: say('$x$ letraren ordez zenbaki bat jartzean polinomioak duen balioa: $P(x)=x^{3}-2x^{2}+1$ bada, $P(1)=0$.', 'Lo que vale el polinomio al poner un número en lugar de $x$: si $P(x)=x^{3}-2x^{2}+1$, $P(1)=0$.', 'قيمة كثير الحدود عند وضع عدد مكان $x$: إذا كان $P(x)=x^{3}-2x^{2}+1$ فإن $P(1)=0$.', 'What the polynomial is worth when a number replaces $x$: if $P(x)=x^{3}-2x^{2}+1$, $P(1)=0$.')
            }
        ],
        vocabulary: [
            say('monomioa', 'monomio', 'أحادي الحد', 'monomial'),
            say('maila', 'grado', 'الدرجة', 'degree')
        ],
        explanation: say(
            'Polinomioak batzeko, maila bereko gaiak elkartzen dira; kentzeko, kentzailearen zeinu guztiak aldatzen dira. Biderkatzeko, baten gai bakoitza bestearen gai guztiekin, $(x+2)(x+3)=x^{2}+5x+6$ azaleran bezala. Biderkaduraren maila mailen batura da.',
            'Para sumar polinomios, se juntan los términos del mismo grado; para restar, se cambian todos los signos del sustraendo. Para multiplicar, cada término de uno por todos los del otro, como en el área $(x+2)(x+3)=x^{2}+5x+6$. El grado del producto es la suma de los grados.',
            'لجمع كثيرات الحدود نجمع الحدود ذات الدرجة نفسها، وللطرح نغيّر كل إشارات المطروح. وللضرب نضرب كل حد من الأول في كل حدود الثاني، كما في المساحة $(x+2)(x+3)=x^{2}+5x+6$. ودرجة الناتج مجموع الدرجتين.',
            'To add polynomials, group the terms of the same degree; to subtract, change all the signs of the one being subtracted. To multiply, multiply each term of one by every term of the other, as in the area $(x+2)(x+3)=x^{2}+5x+6$. The degree of the product is the sum of the degrees.'
        ),
        examplePrompt: say('Kalkulatu $(2x-1)(x^{2}+3)$, eta haren balioa $x=2$ denean.', 'Calcula $(2x-1)(x^{2}+3)$ y su valor para $x=2$.', 'احسب $(2x-1)(x^{2}+3)$ وقيمته عندما $x=2$.', 'Work out $(2x-1)(x^{2}+3)$ and its value when $x=2$.'),
        example: same('$\\begin{gathered}(2x-1)(x^{2}+3)=2x^{3}-x^{2}+6x-3\\\\ 2\\cdot 8-4+12-3=21\\end{gathered}$'),
        exampleAnswer: say('3 mailakoa da, eta 21 balio du $x=2$ denean.', 'Tiene grado 3 y vale 21 para $x=2$.', 'درجته 3 وقيمته 21 عندما $x=2$.', 'It has degree 3 and is worth 21 when $x=2$.')
    },
    identities: {
        vocabulary: [
            say('karratua', 'cuadrado', 'المربع', 'square'),
            say('biderkadura bikoitza', 'doble producto', 'ضعف حاصل الضرب', 'twice the product')
        ],
        explanation: say(
            'Ezkerretik eskuinera irakurrita, berdintza nabarmenek gaiz gai biderkatu gabe garatzen dute; alderantziz irakurrita, faktorizatzeko balio dute: $9x^{2}-30x+25=(3x-5)^{2}$. $a$ eta $b$ edozein adierazpen izan daitezke: $(x+3y)^{2}=x^{2}+6xy+9y^{2}$.',
            'Leídas de izquierda a derecha, las igualdades notables desarrollan sin multiplicar término a término; leídas al revés, sirven para factorizar: $9x^{2}-30x+25=(3x-5)^{2}$. $a$ y $b$ pueden ser cualquier expresión: $(x+3y)^{2}=x^{2}+6xy+9y^{2}$.',
            'تُقرأ المتطابقات الشهيرة من اليسار إلى اليمين فتنشر دون ضرب حد بحد، وتُقرأ بالعكس فتساعد على التحليل: $9x^{2}-30x+25=(3x-5)^{2}$. ويمكن أن يكون $a$ و$b$ أي عبارة: $(x+3y)^{2}=x^{2}+6xy+9y^{2}$.',
            'Read from left to right, special products expand without multiplying term by term; read backwards, they help you factorise: $9x^{2}-30x+25=(3x-5)^{2}$. $a$ and $b$ can be any expression: $(x+3y)^{2}=x^{2}+6xy+9y^{2}$.'
        ),
        cases: [
            { title: say('Batura baten karratua', 'Cuadrado de una suma', 'مربع مجموع', 'Square of a sum'), text: say('Biderkadura bikoitza + zeinuarekin.', 'El doble producto va con +.', 'ضعف حاصل الضرب بإشارة +.', 'Twice the product, with +.'), math: same('$(a+b)^{2}=a^{2}+2ab+b^{2}$') },
            { title: say('Kenketa baten karratua', 'Cuadrado de una diferencia', 'مربع فرق', 'Square of a difference'), text: say('Biderkadura bikoitza − zeinuarekin.', 'El doble producto va con −.', 'ضعف حاصل الضرب بإشارة −.', 'Twice the product, with −.'), math: same('$(a-b)^{2}=a^{2}-2ab+b^{2}$') },
            { title: say('Batura bider kenketa', 'Suma por diferencia', 'مجموع في فرق', 'Sum times difference'), text: say('Karratuen kenketa ematen du.', 'Da una diferencia de cuadrados.', 'يعطي فرق مربعين.', 'It gives a difference of squares.'), math: same('$(a+b)(a-b)=a^{2}-b^{2}$') },
            { title: say('Batura baten kuboa', 'Cubo de una suma', 'مكعب مجموع', 'Cube of a sum'), text: say('Koefizienteak: 1, 3, 3, 1.', 'Coeficientes: 1, 3, 3, 1.', 'المعاملات: 1، 3، 3، 1.', 'Coefficients: 1, 3, 3, 1.'), math: same('$(a+b)^{3}=a^{3}+3a^{2}b+3ab^{2}+b^{3}$') }
        ],
        examplePrompt: say('Garatu $(4x+3)^{2}$ eta $(x-5)(x+5)$.', 'Desarrolla $(4x+3)^{2}$ y $(x-5)(x+5)$.', 'انشر $(4x+3)^{2}$ و$(x-5)(x+5)$.', 'Expand $(4x+3)^{2}$ and $(x-5)(x+5)$.'),
        example: same('$\\begin{gathered}(4x+3)^{2}=16x^{2}+24x+9\\\\ (x-5)(x+5)=x^{2}-25\\end{gathered}$'),
        exampleAnswer: say('Biderkadura bikoitza: $2\\cdot 4x\\cdot 3=24x$.', 'El doble producto: $2\\cdot 4x\\cdot 3=24x$.', 'ضعف حاصل الضرب: $2\\cdot 4x\\cdot 3=24x$.', 'Twice the product: $2\\cdot 4x\\cdot 3=24x$.'),
        why: {
            text: say(
                '$a+b$ aldeko karratu bat lau zatitan banatzen da: $a^{2}$ karratu bat, $b^{2}$ beste bat eta $ab$ bi laukizuzen. Horregatik daude bi $ab$. Biderkatuz gauza bera ateratzen da: $(a+b)(a+b)=a^{2}+ab+ba+b^{2}$.',
                'Un cuadrado de lado $a+b$ se parte en cuatro trozos: un cuadrado $a^{2}$, otro $b^{2}$ y dos rectángulos $ab$. Por eso hay dos $ab$. Multiplicando sale lo mismo: $(a+b)(a+b)=a^{2}+ab+ba+b^{2}$.',
                'المربع الذي ضلعه $a+b$ ينقسم إلى أربعة أجزاء: مربع $a^{2}$ وآخر $b^{2}$ ومستطيلان $ab$. لذلك يوجد $ab$ مرتين. وبالضرب نحصل على الشيء نفسه: $(a+b)(a+b)=a^{2}+ab+ba+b^{2}$.',
                'A square with side $a+b$ splits into four pieces: a square $a^{2}$, another $b^{2}$ and two rectangles $ab$. That is why there are two $ab$. Multiplying gives the same: $(a+b)(a+b)=a^{2}+ab+ba+b^{2}$.'
            )
        }
    },
    binomial: {
        definitions: [
            {
                term: say('Tartagliaren triangelua', 'Triángulo de Tartaglia', 'مثلث تارتاليا', 'Tartaglia\'s triangle'),
                meaning: say('Zenbakizko triangelua: errenkada bakoitza 1 zenbakiarekin hasi eta amaitzen da, eta zenbaki bakoitza goiko bien batura da.', 'Un triángulo de números: cada fila empieza y acaba en 1, y cada número es la suma de los dos que tiene encima.', 'مثلث من الأعداد: يبدأ كل صف وينتهي بالعدد 1، وكل عدد مجموع العددين فوقه.', 'A triangle of numbers: each row starts and ends with 1, and each number is the sum of the two above it.')
            }
        ],
        vocabulary: [
            say('errenkada', 'fila', 'الصف', 'row'),
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient')
        ],
        explanation: say(
            '$n$ errenkadak $(a+b)^{n}$ adierazpenaren koefizienteak ematen ditu; $a$ letraren berretzailea $n$ zenbakitik 0 zenbakira jaisten da, eta $b$ letrarena 0 zenbakitik $n$ zenbakira igotzen: $(a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}$. Kenketa batean zeinuak txandakatzen dira. $b$ zenbaki bat bada, haren berreturak ere biderkatu.',
            'La fila $n$ da los coeficientes de $(a+b)^{n}$; el exponente de $a$ baja de $n$ a 0 y el de $b$ sube de 0 a $n$: $(a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}$. En una diferencia, los signos se alternan. Si $b$ es un número, multiplica también sus potencias.',
            'الصف $n$ يعطي معاملات $(a+b)^{n}$؛ وأس $a$ ينزل من $n$ إلى 0 وأس $b$ يصعد من 0 إلى $n$: $(a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}$. وفي الفرق تتناوب الإشارات. وإذا كان $b$ عددًا فاضرب قواه أيضًا.',
            'Row $n$ gives the coefficients of $(a+b)^{n}$; the exponent of $a$ goes down from $n$ to 0 and that of $b$ goes up from 0 to $n$: $(a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}$. In a difference, the signs alternate. If $b$ is a number, multiply its powers in too.'
        ),
        examplePrompt: say('Garatu $(x-2)^{3}$, 1 3 3 1 errenkadarekin.', 'Desarrolla $(x-2)^{3}$ con la fila 1 3 3 1.', 'انشر $(x-2)^{3}$ بالصف 1 3 3 1.', 'Expand $(x-2)^{3}$ using the row 1 3 3 1.'),
        example: same('$(x-2)^{3}=x^{3}-6x^{2}+12x-8$'),
        exampleAnswer: say('Zeinuak txandakatzen dira, eta 2 zenbakiaren berreturak biderkatzen dira: $3\\cdot 2=6$, $3\\cdot 4=12$, $2^{3}=8$.', 'Los signos se alternan y se multiplican las potencias de 2: $3\\cdot 2=6$, $3\\cdot 4=12$, $2^{3}=8$.', 'تتناوب الإشارات وتُضرب قوى 2: $3\\cdot 2=6$، $3\\cdot 4=12$، $2^{3}=8$.', 'The signs alternate and the powers of 2 are multiplied in: $3\\cdot 2=6$, $3\\cdot 4=12$, $2^{3}=8$.')
    },

    /* ---------- 2. Division and Ruffini ---------- */
    'long-division': {
        vocabulary: [
            say('zatikizuna', 'dividendo', 'المقسوم', 'dividend'),
            say('zatitzailea', 'divisor', 'المقسوم عليه', 'divisor'),
            say('hondarra', 'resto', 'الباقي', 'remainder')
        ],
        explanation: say(
            'Zatitu zatikizunaren lehen gaia zatitzailearen lehenaz, biderkatu zatitzailea emaitzaz eta kendu; jarraitu hondarraren maila zatitzailearena baino txikiagoa izan arte. Beti betetzen da $D=d\\cdot c+r$. Hondarra 0 bada, zatiketa zehatza da, eta $d$ zenbakia $D$ polinomioaren zatitzailea da.',
            'Divide el primer término del dividendo entre el primero del divisor, multiplica el divisor por el resultado y réstalo; sigue hasta que el resto tenga menor grado que el divisor. Siempre se cumple $D=d\\cdot c+r$. Si el resto es 0, la división es exacta y $d$ es divisor de $D$.',
            'اقسم الحد الأول من المقسوم على الحد الأول من المقسوم عليه، واضرب المقسوم عليه في الناتج واطرحه؛ واستمر حتى تصبح درجة الباقي أصغر من درجة المقسوم عليه. ودائمًا $D=d\\cdot c+r$. وإذا كان الباقي 0 فالقسمة تامة و$d$ قاسم لـ$D$.',
            'Divide the first term of the dividend by the first term of the divisor, multiply the divisor by the result and subtract; carry on until the remainder has a lower degree than the divisor. It always holds that $D=d\\cdot c+r$. If the remainder is 0, the division is exact and $d$ is a divisor of $D$.'
        ),
        examplePrompt: say('Zatitu $(x^{3}-2x^{2}+4)\\div(x-3)$.', 'Divide $(x^{3}-2x^{2}+4)\\div(x-3)$.', 'اقسم $(x^{3}-2x^{2}+4)\\div(x-3)$.', 'Divide $(x^{3}-2x^{2}+4)\\div(x-3)$.'),
        example: same('$x^{3}-2x^{2}+4=(x-3)(x^{2}+x+3)+13$'),
        exampleAnswer: say('Zatidura $x^{2}+x+3$ eta hondarra 13: ez da zehatza.', 'Cociente $x^{2}+x+3$ y resto 13: no es exacta.', 'خارج القسمة $x^{2}+x+3$ والباقي 13: ليست تامة.', 'Quotient $x^{2}+x+3$ and remainder 13: it is not exact.')
    },
    ruffini: {
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('hondarra', 'resto', 'الباقي', 'remainder')
        ],
        explanation: say(
            'Zatitzailea $x-a$ bada, koefizienteekin bakarrik zatitzen da: idatzi guztiak, 0 bat maila bat falta denean, eta $a$ ezkerrean. Jaitsi lehena, biderkatu $a$ zenbakiaz eta batu hurrengoari, eta errepikatu. Azken zenbakia hondarra da; besteak, zatiduraren koefizienteak, maila bat gutxiagokoa. Zatitzailea $x+4$ bada, $a=-4$.',
            'Si el divisor es $x-a$, se divide solo con los coeficientes: escríbelos todos, con 0 donde falte un grado, y $a$ a la izquierda. Baja el primero, multiplícalo por $a$ y súmalo al siguiente, y repite. El último número es el resto; los demás, los coeficientes del cociente, que tiene un grado menos. Si el divisor es $x+4$, $a=-4$.',
            'إذا كان المقسوم عليه $x-a$ نقسم بالمعاملات وحدها: اكتبها كلها، مع 0 حيث تنقص درجة، و$a$ على اليسار. أنزل الأول واضربه في $a$ واجمعه مع التالي، وكرّر. آخر عدد هو الباقي، والبقية معاملات خارج القسمة، ودرجته أقل بواحد. وإذا كان المقسوم عليه $x+4$ فإن $a=-4$.',
            'If the divisor is $x-a$, you divide using only the coefficients: write them all, with 0 where a degree is missing, and $a$ on the left. Bring down the first, multiply it by $a$, add it to the next one, and repeat. The last number is the remainder; the others are the coefficients of the quotient, one degree lower. If the divisor is $x+4$, $a=-4$.'
        ),
        examplePrompt: say('Zatitu Ruffinirekin $(2x^{3}-5x+7)\\div(x-2)$.', 'Divide con Ruffini $(2x^{3}-5x+7)\\div(x-2)$.', 'اقسم بطريقة روفيني $(2x^{3}-5x+7)\\div(x-2)$.', 'Divide with Ruffini $(2x^{3}-5x+7)\\div(x-2)$.'),
        example: same('$2x^{3}-5x+7=(x-2)(2x^{2}+4x+3)+13$'),
        exampleAnswer: say('Koefizienteak: $2,\\ 0,\\ -5,\\ 7$ (falta den $x^{2}$ gaiaren 0 barne). Zatidura $2x^{2}+4x+3$ eta hondarra 13.', 'Coeficientes: $2,\\ 0,\\ -5,\\ 7$ (con el 0 del $x^{2}$ que falta). Cociente $2x^{2}+4x+3$ y resto 13.', 'المعاملات: $2,\\ 0,\\ -5,\\ 7$ (مع 0 مكان $x^{2}$ الناقص). خارج القسمة $2x^{2}+4x+3$ والباقي 13.', 'Coefficients: $2,\\ 0,\\ -5,\\ 7$ (with the 0 for the missing $x^{2}$). Quotient $2x^{2}+4x+3$ and remainder 13.')
    },
    remainder: {
        definitions: [
            {
                term: say('Hondarraren teorema', 'Teorema del resto', 'مبرهنة الباقي', 'Remainder theorem'),
                meaning: say('$P(x)$ polinomioa $x-a$ binomioaz zatitzean, hondarra $P(a)$ da.', 'El resto de dividir $P(x)$ entre $x-a$ es $P(a)$.', 'باقي قسمة $P(x)$ على $x-a$ هو $P(a)$.', 'The remainder of dividing $P(x)$ by $x-a$ is $P(a)$.')
            }
        ],
        vocabulary: [
            say('parametroa', 'parámetro', 'الوسيط', 'parameter'),
            say('zatigarria', 'divisible', 'قابل للقسمة', 'divisible')
        ],
        explanation: say(
            'Horrela, $P(a)$ kalkulatzeko Ruffini erabil daiteke, erosoagoa baita zenbaki handiekin. Polinomioak parametro bat badu, $m$ bezalako letra bat, hondarra haren araberakoa da: berdindu hondarra problemak eskatzen duenari, eta askatu. $x-a$ binomioaz zatigarria izateko, hondarrak 0 izan behar du.',
            'Así, para calcular $P(a)$ se puede usar Ruffini, que es más cómodo con números grandes. Si el polinomio tiene un parámetro, una letra como $m$, el resto depende de ella: iguala el resto a lo que pide el problema y despeja. Para que sea divisible entre $x-a$, el resto tiene que ser 0.',
            'وهكذا يمكن استعمال روفيني لحساب $P(a)$، وهو أسهل مع الأعداد الكبيرة. وإذا كان في كثير الحدود وسيط، أي حرف مثل $m$، فالباقي يتعلق به: ساوِ الباقي بما تطلبه المسألة واعزل الوسيط. ولكي يكون قابلًا للقسمة على $x-a$ يجب أن يكون الباقي 0.',
            'So Ruffini can be used to work out $P(a)$, which is easier with large numbers. If the polynomial has a parameter, a letter such as $m$, the remainder depends on it: set the remainder equal to what the problem asks and solve. For it to be divisible by $x-a$, the remainder must be 0.'
        ),
        examplePrompt: say('Aurkitu $k$, $x^{3}-kx+6$ polinomioa $x-2$ binomioaz zatigarria izan dadin.', 'Halla $k$ para que $x^{3}-kx+6$ sea divisible entre $x-2$.', 'جد $k$ لكي يكون $x^{3}-kx+6$ قابلًا للقسمة على $x-2$.', 'Find $k$ so that $x^{3}-kx+6$ is divisible by $x-2$.'),
        example: same('$8-2k+6=0\\ \\to\\ k=7$'),
        exampleAnswer: say('$k=7$ bada, $P(2)$ hondarra 0 da.', 'Con $k=7$, el resto $P(2)$ es 0.', 'عندما $k=7$ يكون الباقي $P(2)$ صفرًا.', 'With $k=7$, the remainder $P(2)$ is 0.'),
        why: {
            text: say(
                'Zatitzean, $P(x)=(x-a)\\cdot c(x)+r$, eta hondarra zenbaki bat da, zatitzaileak 1 maila duelako. Jarri $x=a$: lehen batugaia ezabatu egiten da, $a-a=0$ delako, eta $P(a)=r$ geratzen da.',
                'Al dividir, $P(x)=(x-a)\\cdot c(x)+r$, y el resto es un número porque el divisor tiene grado 1. Pon $x=a$: el primer sumando se anula, porque $a-a=0$, y queda $P(a)=r$.',
                'عند القسمة $P(x)=(x-a)\\cdot c(x)+r$، والباقي عدد لأن درجة المقسوم عليه 1. ضع $x=a$: يختفي الحد الأول لأن $a-a=0$، فيبقى $P(a)=r$.',
                'When dividing, $P(x)=(x-a)\\cdot c(x)+r$, and the remainder is a number because the divisor has degree 1. Put $x=a$: the first term vanishes, because $a-a=0$, and you are left with $P(a)=r$.'
            )
        }
    },

    /* ---------- 3. Roots and factorisation ---------- */
    roots: {
        definitions: [
            {
                term: say('Polinomio baten erroa', 'Raíz de un polinomio', 'جذر كثير الحدود', 'Root of a polynomial'),
                meaning: say('$a$ zenbaki bat, $P(a)=0$ betetzen duena; orduan $x-a$ binomioa $P(x)$ polinomioaren faktorea da.', 'Un número $a$ con $P(a)=0$; entonces $x-a$ es un factor de $P(x)$.', 'عدد $a$ بحيث $P(a)=0$؛ عندئذ $x-a$ عامل من عوامل $P(x)$.', 'A number $a$ with $P(a)=0$; then $x-a$ is a factor of $P(x)$.')
            }
        ],
        vocabulary: [
            say('gai askea', 'término independiente', 'الحد الثابت', 'constant term'),
            say('zatitzailea', 'divisor', 'قاسم', 'divisor')
        ],
        explanation: say(
            'Koefiziente osoko polinomio baten erro osoak gai askearen zatitzaileak dira: $x^{3}-6x^{2}+11x-6$ polinomioarenak $\\pm 1$, $\\pm 2$, $\\pm 3$ eta $\\pm 6$ artean bilatzen dira, eta 1, 2 eta 3 dira. Grafikoan, X ardatza mozten duten puntuak dira. $n$ mailako polinomio batek $n$ erro ditu gehienez.',
            'Las raíces enteras de un polinomio de coeficientes enteros son divisores del término independiente: las de $x^{3}-6x^{2}+11x-6$ se buscan entre $\\pm 1$, $\\pm 2$, $\\pm 3$ y $\\pm 6$, y son 1, 2 y 3. En la gráfica, son los puntos donde corta al eje X. Un polinomio de grado $n$ tiene como mucho $n$ raíces.',
            'الجذور الصحيحة لكثير حدود معاملاته صحيحة هي قواسم الحد الثابت: جذور $x^{3}-6x^{2}+11x-6$ نبحث عنها بين $\\pm 1$ و$\\pm 2$ و$\\pm 3$ و$\\pm 6$، وهي 1 و2 و3. وفي المنحنى هي النقاط التي يقطع فيها المحور X. ولكثير حدود من الدرجة $n$ على الأكثر $n$ جذرًا.',
            'The whole-number roots of a polynomial with whole-number coefficients are divisors of the constant term: those of $x^{3}-6x^{2}+11x-6$ are looked for among $\\pm 1$, $\\pm 2$, $\\pm 3$ and $\\pm 6$, and they are 1, 2 and 3. On the graph, they are the points where it crosses the X axis. A polynomial of degree $n$ has at most $n$ roots.'
        ),
        examplePrompt: say('Idatzi 3 mailako polinomio bat, erroak 2, $-1$ eta 4 dituena.', 'Escribe un polinomio de grado 3 con raíces 2, $-1$ y 4.', 'اكتب كثير حدود من الدرجة 3 جذوره 2 و$-1$ و4.', 'Write a polynomial of degree 3 with roots 2, $-1$ and 4.'),
        example: same('$(x-2)(x+1)(x-4)=x^{3}-5x^{2}+2x+8$'),
        exampleAnswer: say('$a$ erro bakoitzak $x-a$ faktore bat ematen du.', 'Cada raíz $a$ da un factor $x-a$.', 'كل جذر $a$ يعطي عاملًا $x-a$.', 'Each root $a$ gives a factor $x-a$.'),
        why: {
            text: say(
                '$P(a)=0$ bada, hondarraren teoremaren arabera $P(x)$ polinomioa $x-a$ binomioaz zatitzean hondarra 0 da. Zatiketa zehatza da, beraz $P(x)=(x-a)\\cdot c(x)$: $x-a$ faktorea da. Eta gai askea faktoreen gai askeen biderkadura denez, $a$ haren zatitzailea da.',
                'Si $P(a)=0$, por el teorema del resto, al dividir $P(x)$ entre $x-a$ el resto es 0. La división es exacta, así que $P(x)=(x-a)\\cdot c(x)$: $x-a$ es un factor. Y como el término independiente es el producto de los de los factores, $a$ es divisor suyo.',
                'إذا كان $P(a)=0$ فبحسب مبرهنة الباقي يكون باقي قسمة $P(x)$ على $x-a$ صفرًا. فالقسمة تامة، إذن $P(x)=(x-a)\\cdot c(x)$: و$x-a$ عامل. ولأن الحد الثابت هو حاصل ضرب الحدود الثابتة للعوامل فإن $a$ قاسم له.',
                'If $P(a)=0$, by the remainder theorem, dividing $P(x)$ by $x-a$ leaves remainder 0. The division is exact, so $P(x)=(x-a)\\cdot c(x)$: $x-a$ is a factor. And since the constant term is the product of those of the factors, $a$ divides it.'
            )
        }
    },
    factorize: {
        vocabulary: [
            say('faktore komuna', 'factor común', 'العامل المشترك', 'common factor'),
            say('koefiziente nagusia', 'coeficiente principal', 'المعامل الرئيسي', 'leading coefficient')
        ],
        explanation: say(
            'Ordena: lehenik, faktore komuna; gero, berdintza nabarmenak; ondoren, Ruffini erro osoekin; eta 2 mailako zatidura bat geratzen bada, haren ekuazioa ebatzi. Horrela, $x^{4}+2x^{3}-23x^{2}-60x=x(x-5)(x+3)(x+4)$. Erroak zatikiak badira, ez ahaztu koefiziente nagusia: $3x^{2}+2x-8=(3x-4)(x+2)$.',
            'El orden: primero, factor común; después, igualdades notables; luego, Ruffini con las raíces enteras; y si queda un cociente de grado 2, se resuelve su ecuación. Así, $x^{4}+2x^{3}-23x^{2}-60x=x(x-5)(x+3)(x+4)$. Si las raíces son fracciones, no olvides el coeficiente principal: $3x^{2}+2x-8=(3x-4)(x+2)$.',
            'الترتيب: أولًا العامل المشترك، ثم المتطابقات الشهيرة، ثم روفيني بالجذور الصحيحة، وإذا بقي خارج قسمة من الدرجة 2 نحل معادلته. وهكذا $x^{4}+2x^{3}-23x^{2}-60x=x(x-5)(x+3)(x+4)$. وإذا كانت الجذور كسورًا فلا تنسَ المعامل الرئيسي: $3x^{2}+2x-8=(3x-4)(x+2)$.',
            'The order: first, a common factor; then special products; next, Ruffini with the whole-number roots; and if a quotient of degree 2 is left, solve its equation. So $x^{4}+2x^{3}-23x^{2}-60x=x(x-5)(x+3)(x+4)$. If the roots are fractions, do not forget the leading coefficient: $3x^{2}+2x-8=(3x-4)(x+2)$.'
        ),
        examplePrompt: say('Faktorizatu $2x^{3}-8x$ eta $x^{3}-3x^{2}-4x+12$.', 'Factoriza $2x^{3}-8x$ y $x^{3}-3x^{2}-4x+12$.', 'حلّل $2x^{3}-8x$ و$x^{3}-3x^{2}-4x+12$.', 'Factorise $2x^{3}-8x$ and $x^{3}-3x^{2}-4x+12$.'),
        example: same('$\\begin{gathered}2x^{3}-8x=2x(x+2)(x-2)\\\\ x^{3}-3x^{2}-4x+12=(x-3)(x-2)(x+2)\\end{gathered}$'),
        exampleAnswer: say('Bigarrenean 3 erroa da, eta $x^{2}-4$ zatidura batura bider kenketa da.', 'En la segunda, 3 es raíz y el cociente $x^{2}-4$ es suma por diferencia.', 'في الثاني 3 جذر، وخارج القسمة $x^{2}-4$ مجموع في فرق.', 'In the second one, 3 is a root and the quotient $x^{2}-4$ is a sum times a difference.')
    },
    'gcd-lcm': {
        definitions: [
            {
                term: say('Polinomio laburtezina', 'Polinomio irreducible', 'كثير حدود غير قابل للتحليل', 'Irreducible polynomial'),
                meaning: say('Maila txikiagoko faktoreetan deskonposatu ezin dena: $x-3$, $x^{2}+1$.', 'El que no se puede descomponer en factores de grado menor: $x-3$, $x^{2}+1$.', 'ما لا يمكن تحليله إلى عوامل درجتها أصغر: $x-3$، $x^{2}+1$.', 'One that cannot be broken into factors of lower degree: $x-3$, $x^{2}+1$.')
            }
        ],
        vocabulary: [
            say('faktore komunak', 'factores comunes', 'العوامل المشتركة', 'common factors'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        explanation: say(
            'Zenbakiekin bezala, lehenik faktorizatzen da. Z.k.h.-ak faktore komunak ditu, berretzaile txikienarekin, eta m.k.t.-ak, komunak eta ez-komunak, handienarekin: $P=x(x-2)(x-5)$ eta $Q=x^{2}(x-5)$ badira, z.k.h. $x(x-5)$ da eta m.k.t., $x^{2}(x-2)(x-5)$. $Q$ polinomioak $P$ zatitzen du zatiketa zehatza bada.',
            'Como con los números, primero se factoriza. El m.c.d. lleva los factores comunes con el menor exponente, y el m.c.m., los comunes y no comunes con el mayor: si $P=x(x-2)(x-5)$ y $Q=x^{2}(x-5)$, el m.c.d. es $x(x-5)$, y el m.c.m., $x^{2}(x-2)(x-5)$. $Q$ divide a $P$ si la división es exacta.',
            'كما في الأعداد نحلّل أولًا. القاسم المشترك الأكبر فيه العوامل المشتركة بأصغر أس، والمضاعف المشترك الأصغر فيه المشتركة وغير المشتركة بأكبر أس: إذا كان $P=x(x-2)(x-5)$ و$Q=x^{2}(x-5)$ فإن ق.م.أ هو $x(x-5)$ وم.م.أ هو $x^{2}(x-2)(x-5)$. ويقسم $Q$ كثيرَ الحدود $P$ إذا كانت القسمة تامة.',
            'As with numbers, factorise first. The GCD has the common factors with the lowest exponent, and the LCM, the common and non-common ones with the highest: if $P=x(x-2)(x-5)$ and $Q=x^{2}(x-5)$, the GCD is $x(x-5)$ and the LCM, $x^{2}(x-2)(x-5)$. $Q$ divides $P$ if the division is exact.'
        ),
        examplePrompt: say('Aurkitu $x^{2}-3x$ eta $x^{2}-9$ polinomioen z.k.h. eta m.k.t.', 'Halla el m.c.d. y el m.c.m. de $x^{2}-3x$ y $x^{2}-9$.', 'جد ق.م.أ وم.م.أ لـ $x^{2}-3x$ و$x^{2}-9$.', 'Find the GCD and the LCM of $x^{2}-3x$ and $x^{2}-9$.'),
        example: same('$x^{2}-3x=x(x-3)\\qquad x^{2}-9=(x+3)(x-3)$'),
        exampleAnswer: say('Z.k.h.: $x-3$. M.k.t.: $x(x-3)(x+3)$.', 'M.c.d.: $x-3$. M.c.m.: $x(x-3)(x+3)$.', 'ق.م.أ: $x-3$. م.م.أ: $x(x-3)(x+3)$.', 'GCD: $x-3$. LCM: $x(x-3)(x+3)$.')
    },

    /* ---------- 4. Algebraic fractions ---------- */
    'algebraic-fractions': {
        definitions: [
            {
                term: say('Zatiki aljebraikoa', 'Fracción algebraica', 'الكسر الجبري', 'Algebraic fraction'),
                meaning: say('Bi polinomioren $\\frac{P(x)}{Q(x)}$ zatidura, izendatzaileak letra duela.', 'Un cociente $\\frac{P(x)}{Q(x)}$ de dos polinomios en el que el denominador tiene letra.', 'خارج قسمة $\\frac{P(x)}{Q(x)}$ لكثيري حدود يحتوي مقامه على حرف.', 'A quotient $\\frac{P(x)}{Q(x)}$ of two polynomials where the denominator has a letter.')
            }
        ],
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zenbakizko balioa', 'valor numérico', 'القيمة العددية', 'value')
        ],
        explanation: say(
            'Haren zenbakizko balioa $x$ letraren ordez zenbaki bat jarrita kalkulatzen da: $\\frac{x+1}{x^{2}-4}$ zatikiak $\\frac{4}{5}$ balio du $x=3$ denean. Izendatzailea anulatzen duten balioetan ez du baliorik: $x^{2}-4=0$ da $x=2$ eta $x=-2$ direnean, eta bi horiek kanpoan geratzen dira. $\\frac{x+1}{2}$ ez da zatiki aljebraikoa, polinomio bat baizik.',
            'Su valor numérico se calcula poniendo un número en lugar de $x$: $\\frac{x+1}{x^{2}-4}$ vale $\\frac{4}{5}$ para $x=3$. En los valores que anulan el denominador no tiene valor: como $x^{2}-4=0$ para $x=2$ y $x=-2$, esos dos quedan fuera. $\\frac{x+1}{2}$ no es una fracción algebraica, sino un polinomio.',
            'تُحسب قيمته العددية بوضع عدد مكان $x$: $\\frac{x+1}{x^{2}-4}$ قيمته $\\frac{4}{5}$ عندما $x=3$. ولا قيمة له عند الأعداد التي تجعل المقام صفرًا: بما أن $x^{2}-4=0$ عندما $x=2$ و$x=-2$ فهذان العددان مستبعدان. أما $\\frac{x+1}{2}$ فليس كسرًا جبريًا بل كثير حدود.',
            'Its value is found by putting a number in place of $x$: $\\frac{x+1}{x^{2}-4}$ is worth $\\frac{4}{5}$ when $x=3$. It has no value where the denominator is zero: since $x^{2}-4=0$ for $x=2$ and $x=-2$, those two are left out. $\\frac{x+1}{2}$ is not an algebraic fraction but a polynomial.'
        ),
        examplePrompt: say('Non ez dago $\\frac{3x}{x^{2}-5x}$? Zenbat balio du $x=2$ denean?', '¿Dónde no existe $\\frac{3x}{x^{2}-5x}$? ¿Cuánto vale para $x=2$?', 'أين لا يوجد $\\frac{3x}{x^{2}-5x}$؟ وكم قيمته عندما $x=2$؟', 'Where does $\\frac{3x}{x^{2}-5x}$ not exist? What is it worth when $x=2$?'),
        example: same('$\\begin{gathered}x^{2}-5x=x(x-5)=0\\ \\to\\ x=0,\\ x=5\\\\ \\frac{3\\cdot 2}{4-10}=-1\\end{gathered}$'),
        exampleAnswer: say('Ez dago $x=0$ eta $x=5$ puntuetan; $x=2$ denean, $-1$ balio du.', 'No existe en $x=0$ ni en $x=5$; para $x=2$ vale $-1$.', 'غير موجود عند $x=0$ و$x=5$؛ وعندما $x=2$ قيمته $-1$.', 'It does not exist at $x=0$ or $x=5$; when $x=2$ it is worth $-1$.')
    },
    simplify: {
        vocabulary: [
            say('faktoreak', 'factores', 'العوامل', 'factors'),
            say('batugaiak', 'sumandos', 'الحدود', 'terms')
        ],
        explanation: say(
            'Sinplifikatzeko, faktorizatu zenbakitzailea eta izendatzailea, eta kendu faktore komunak: $\\frac{x^{3}+5x^{2}}{x^{2}+5x}=\\frac{x^{2}(x+5)}{x(x+5)}=x$. Faktoreak bakarrik kentzen dira, inoiz ez batugaiak: $\\frac{x+3}{x+5}$ ez da $\\frac{3}{5}$. Jatorrizko izendatzailea anulatzen zuten balioak kanpoan jarraitzen dute.',
            'Para simplificar, factoriza el numerador y el denominador y elimina los factores comunes: $\\frac{x^{3}+5x^{2}}{x^{2}+5x}=\\frac{x^{2}(x+5)}{x(x+5)}=x$. Solo se eliminan factores, nunca sumandos: $\\frac{x+3}{x+5}$ no es $\\frac{3}{5}$. Los valores que anulaban el denominador original siguen fuera.',
            'للتبسيط حلّل البسط والمقام واحذف العوامل المشتركة: $\\frac{x^{3}+5x^{2}}{x^{2}+5x}=\\frac{x^{2}(x+5)}{x(x+5)}=x$. لا تُحذف إلا العوامل، لا الحدود المجموعة أبدًا: $\\frac{x+3}{x+5}$ لا يساوي $\\frac{3}{5}$. والقيم التي كانت تجعل المقام الأصلي صفرًا تبقى مستبعدة.',
            'To simplify, factorise the numerator and the denominator and cancel the common factors: $\\frac{x^{3}+5x^{2}}{x^{2}+5x}=\\frac{x^{2}(x+5)}{x(x+5)}=x$. Only factors cancel, never terms that are added: $\\frac{x+3}{x+5}$ is not $\\frac{3}{5}$. The values that made the original denominator zero are still left out.'
        ),
        examplePrompt: say('Sinplifikatu $\\frac{x^{2}-16}{x^{2}-8x+16}$.', 'Simplifica $\\frac{x^{2}-16}{x^{2}-8x+16}$.', 'بسّط $\\frac{x^{2}-16}{x^{2}-8x+16}$.', 'Simplify $\\frac{x^{2}-16}{x^{2}-8x+16}$.'),
        example: same('$\\frac{(x+4)(x-4)}{(x-4)^{2}}=\\frac{x+4}{x-4}$'),
        exampleAnswer: say('Zenbakitzailea batura bider kenketa da, eta izendatzailea, kenketa baten karratua.', 'El numerador es una suma por diferencia, y el denominador, el cuadrado de una diferencia.', 'البسط مجموع في فرق، والمقام مربع فرق.', 'The numerator is a sum times a difference, and the denominator is the square of a difference.')
    },
    equivalent: {
        vocabulary: [
            say('biderkadura gurutzatuak', 'productos cruzados', 'الضرب التبادلي', 'cross products'),
            say('baliokideak', 'equivalentes', 'متكافئان', 'equivalent')
        ],
        explanation: say(
            '$\\frac{P}{Q}$ eta $\\frac{R}{S}$ baliokideak dira $P\\cdot S=Q\\cdot R$ bada, zenbakizko zatikien biderkadura gurutzatuekin bezala: $\\frac{x}{x+1}$ eta $\\frac{x^{2}-x}{x^{2}-1}$ baliokideak dira, bi biderkadurek $x^{3}-x$ ematen dutelako. Zatiki baliokide bat lortzeko, biderkatu zenbakitzailea eta izendatzailea polinomio berberaz.',
            '$\\frac{P}{Q}$ y $\\frac{R}{S}$ son equivalentes si $P\\cdot S=Q\\cdot R$, como con los productos cruzados de las fracciones numéricas: $\\frac{x}{x+1}$ y $\\frac{x^{2}-x}{x^{2}-1}$ lo son, porque los dos productos dan $x^{3}-x$. Para obtener una fracción equivalente, multiplica el numerador y el denominador por el mismo polinomio.',
            '$\\frac{P}{Q}$ و$\\frac{R}{S}$ متكافئان إذا كان $P\\cdot S=Q\\cdot R$، كما في الضرب التبادلي للكسور العددية: $\\frac{x}{x+1}$ و$\\frac{x^{2}-x}{x^{2}-1}$ متكافئان لأن حاصلي الضرب يعطيان $x^{3}-x$. وللحصول على كسر مكافئ اضرب البسط والمقام في كثير الحدود نفسه.',
            '$\\frac{P}{Q}$ and $\\frac{R}{S}$ are equivalent if $P\\cdot S=Q\\cdot R$, as with the cross products of number fractions: $\\frac{x}{x+1}$ and $\\frac{x^{2}-x}{x^{2}-1}$ are equivalent, because both products give $x^{3}-x$. To get an equivalent fraction, multiply the numerator and the denominator by the same polynomial.'
        ),
        examplePrompt: say('Osatu: $\\frac{x+2}{x}=\\frac{\\ldots}{x^{2}+3x}$.', 'Completa: $\\frac{x+2}{x}=\\frac{\\ldots}{x^{2}+3x}$.', 'أكمل: $\\frac{x+2}{x}=\\frac{\\ldots}{x^{2}+3x}$.', 'Fill in: $\\frac{x+2}{x}=\\frac{\\ldots}{x^{2}+3x}$.'),
        example: same('$\\begin{aligned}\\frac{x+2}{x}&=\\frac{(x+2)(x+3)}{x(x+3)}\\\\&=\\frac{x^{2}+5x+6}{x^{2}+3x}\\end{aligned}$'),
        exampleAnswer: say('$x+3$ binomioaz biderkatu da: hutsunea $x^{2}+5x+6$ da.', 'Se ha multiplicado por $x+3$: el hueco es $x^{2}+5x+6$.', 'ضُرب في $x+3$: والفراغ هو $x^{2}+5x+6$.', 'It was multiplied by $x+3$: the gap is $x^{2}+5x+6$.')
    },

    /* ---------- 5. Operations with algebraic fractions ---------- */
    'add-fractions': {
        vocabulary: [
            say('izendatzaile komuna', 'denominador común', 'المقام المشترك', 'common denominator'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator')
        ],
        explanation: say(
            'Izendatzaile bera badute, zenbakitzaileak batzen edo kentzen dira. Bestela, izendatzaile komuna izendatzaile faktorizatuen m.k.t. da, eta zenbakitzaile bakoitza falta zaionaz biderkatzen da: $\\frac{2}{x}+\\frac{1}{x+1}=\\frac{2(x+1)+x}{x(x+1)}=\\frac{3x+2}{x(x+1)}$. Kentzean, jarri parentesia kentzen den zenbakitzaileari.',
            'Con el mismo denominador, se suman o restan los numeradores. Si no, el denominador común es el m.c.m. de los denominadores factorizados, y cada numerador se multiplica por lo que le falta: $\\frac{2}{x}+\\frac{1}{x+1}=\\frac{2(x+1)+x}{x(x+1)}=\\frac{3x+2}{x(x+1)}$. Al restar, pon paréntesis al numerador que se resta.',
            'مع المقام نفسه نجمع البسطين أو نطرحهما. وإلا فالمقام المشترك هو م.م.أ للمقامات بعد تحليلها، ويُضرب كل بسط فيما ينقصه: $\\frac{2}{x}+\\frac{1}{x+1}=\\frac{2(x+1)+x}{x(x+1)}=\\frac{3x+2}{x(x+1)}$. وعند الطرح ضع البسط المطروح بين قوسين.',
            'With the same denominator, add or subtract the numerators. If not, the common denominator is the LCM of the factorised denominators, and each numerator is multiplied by what it is missing: $\\frac{2}{x}+\\frac{1}{x+1}=\\frac{2(x+1)+x}{x(x+1)}=\\frac{3x+2}{x(x+1)}$. When subtracting, put brackets around the numerator being subtracted.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{3}{x+1}-\\frac{2}{x}$.', 'Calcula $\\frac{3}{x+1}-\\frac{2}{x}$.', 'احسب $\\frac{3}{x+1}-\\frac{2}{x}$.', 'Work out $\\frac{3}{x+1}-\\frac{2}{x}$.'),
        example: same('$\\frac{3x-2(x+1)}{x(x+1)}=\\frac{x-2}{x(x+1)}$'),
        exampleAnswer: say('M.k.t. $=x(x+1)$; parentesiak $2(x+1)$ adierazpenaren bi zeinuak aldatzen ditu.', 'M.c.m. $=x(x+1)$; el paréntesis cambia los dos signos de $2(x+1)$.', 'م.م.أ $=x(x+1)$؛ والقوسان يغيّران إشارتي $2(x+1)$.', 'LCM $=x(x+1)$; the brackets change both signs of $2(x+1)$.')
    },
    'multiply-fractions': {
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Biderkatzeko, zenbakitzaileak elkarren artean eta izendatzaileak elkarren artean; zatitzeko, bigarren zatikiari buelta eman eta biderkatu. Faktorizatu garatu aurretik, faktore komunak kentzeko: $\\frac{x^{2}-1}{x}\\cdot\\frac{x^{2}}{x+1}=\\frac{(x+1)(x-1)x^{2}}{x(x+1)}=x(x-1)$.',
            'Para multiplicar, numeradores entre sí y denominadores entre sí; para dividir, se da la vuelta a la segunda fracción y se multiplica. Factoriza antes de desarrollar, para eliminar factores comunes: $\\frac{x^{2}-1}{x}\\cdot\\frac{x^{2}}{x+1}=\\frac{(x+1)(x-1)x^{2}}{x(x+1)}=x(x-1)$.',
            'للضرب نضرب البسطين معًا والمقامين معًا، وللقسمة نقلب الكسر الثاني ونضرب. حلّل قبل النشر لتحذف العوامل المشتركة: $\\frac{x^{2}-1}{x}\\cdot\\frac{x^{2}}{x+1}=\\frac{(x+1)(x-1)x^{2}}{x(x+1)}=x(x-1)$.',
            'To multiply, multiply the numerators together and the denominators together; to divide, turn the second fraction upside down and multiply. Factorise before expanding, to cancel common factors: $\\frac{x^{2}-1}{x}\\cdot\\frac{x^{2}}{x+1}=\\frac{(x+1)(x-1)x^{2}}{x(x+1)}=x(x-1)$.'
        ),
        cases: [
            { title: say('Biderkadura', 'Producto', 'الضرب', 'Product'), text: say('Goikoa bider goikoa, behekoa bider behekoa.', 'Arriba por arriba y abajo por abajo.', 'البسط في البسط والمقام في المقام.', 'Top times top and bottom times bottom.'), math: same('$\\frac{P}{Q}\\cdot\\frac{R}{S}=\\frac{P\\cdot R}{Q\\cdot S}$') },
            { title: say('Zatidura', 'Cociente', 'القسمة', 'Quotient'), text: say('Bigarrenari buelta ematen zaio.', 'Se da la vuelta a la segunda.', 'نقلب الكسر الثاني.', 'Turn the second one upside down.'), math: same('$\\frac{P}{Q}\\div\\frac{R}{S}=\\frac{P\\cdot S}{Q\\cdot R}$') }
        ],
        examplePrompt: say('Kalkulatu $\\frac{x+2}{3x}\\div\\frac{x^{2}-4}{6}$.', 'Calcula $\\frac{x+2}{3x}\\div\\frac{x^{2}-4}{6}$.', 'احسب $\\frac{x+2}{3x}\\div\\frac{x^{2}-4}{6}$.', 'Work out $\\frac{x+2}{3x}\\div\\frac{x^{2}-4}{6}$.'),
        example: same('$\\frac{6(x+2)}{3x(x+2)(x-2)}=\\frac{2}{x(x-2)}$'),
        exampleAnswer: say('$x+2$ kentzen da, eta 6 zati 3 berdin 2.', 'Se elimina $x+2$, y 6 entre 3 da 2.', 'يُحذف $x+2$، و6 على 3 يساوي 2.', '$x+2$ cancels, and 6 divided by 3 is 2.')
    },
    combined: {
        vocabulary: [
            say('parentesia', 'paréntesis', 'الأقواس', 'brackets'),
            say('txorrota', 'grifo', 'صنبور', 'tap')
        ],
        explanation: say(
            'Ordena zenbakiena bera da: parentesiak, gero biderkadurak eta zatidurak, eta azkenik batuketak eta kenketak. Zatiki aljebraikoak problemetan agertzen dira: txorrota batek biltegi bat $x$ minututan betetzen badu, minutu batean $\\frac{1}{x}$ betetzen du; beste batek 3 minutu gutxiago behar baditu, biek batera $\\frac{1}{x}+\\frac{1}{x-3}=\\frac{2x-3}{x(x-3)}$ betetzen dute minutuko.',
            'El orden es el de los números: paréntesis, después productos y cocientes, y por último sumas y restas. Las fracciones algebraicas aparecen en problemas: si un grifo llena un depósito en $x$ minutos, en un minuto llena $\\frac{1}{x}$; si otro tarda 3 minutos menos, juntos llenan $\\frac{1}{x}+\\frac{1}{x-3}=\\frac{2x-3}{x(x-3)}$ por minuto.',
            'الترتيب هو ترتيب الأعداد: الأقواس، ثم الضرب والقسمة، وأخيرًا الجمع والطرح. وتظهر الكسور الجبرية في المسائل: إذا ملأ صنبور خزانًا في $x$ دقيقة فإنه يملأ في الدقيقة $\\frac{1}{x}$؛ وإذا احتاج صنبور آخر 3 دقائق أقل فإنهما معًا يملآن $\\frac{1}{x}+\\frac{1}{x-3}=\\frac{2x-3}{x(x-3)}$ في الدقيقة.',
            'The order is the same as with numbers: brackets, then products and quotients, and finally sums and differences. Algebraic fractions turn up in problems: if a tap fills a tank in $x$ minutes, in one minute it fills $\\frac{1}{x}$; if another takes 3 minutes less, together they fill $\\frac{1}{x}+\\frac{1}{x-3}=\\frac{2x-3}{x(x-3)}$ per minute.'
        ),
        examplePrompt: say('Kalkulatu $\\left(1-\\frac{2}{x}\\right)\\div\\frac{x-2}{x^{2}}$.', 'Calcula $\\left(1-\\frac{2}{x}\\right)\\div\\frac{x-2}{x^{2}}$.', 'احسب $\\left(1-\\frac{2}{x}\\right)\\div\\frac{x-2}{x^{2}}$.', 'Work out $\\left(1-\\frac{2}{x}\\right)\\div\\frac{x-2}{x^{2}}$.'),
        example: same('$\\frac{x-2}{x}\\cdot\\frac{x^{2}}{x-2}=x$'),
        exampleAnswer: say('Lehenik parentesia, gero zatiketa: $x$ geratzen da.', 'Primero el paréntesis, después la división: queda $x$.', 'الأقواس أولًا ثم القسمة: يبقى $x$.', 'First the brackets, then the division: $x$ is left.')
    }
}

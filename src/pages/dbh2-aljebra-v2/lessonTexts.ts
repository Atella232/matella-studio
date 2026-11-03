import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { AlgebraTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Aljebra · 2. DBH — what each lesson tells: the new words (definitions),
   a short explanation and the example as an exercise («Another example»,
   or «Example» in the lessons of facts). Plain data so the tests can import
   it; lessons.tsx merges it into the topics. The example uses expressions
   of its own, never those of «Let's solve», of «Check it» or of the typical
   mistake; the test checks that its equalities with letters are identities
   (they hold for any value). m.c.d. / ZKH / GCD stay in the words.
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const algebraLessonTexts: Record<AlgebraTopicId, LessonTexts> = {
    /* ---------- 1. Algebraic language ---------- */
    language: {
        definitions: [
            {
                term: say('Hizkuntza aljebraikoa', 'Lenguaje algebraico', 'اللغة الجبرية', 'Algebraic language'),
                meaning: say('Zenbakiak eta letrak erabiltzen dituena: letra batek ezagutzen ez dugun edo aldatzen den zenbaki bat adierazten du.', 'El que usa números y letras: una letra representa un número que no conocemos o que cambia.', 'لغة تستعمل الأعداد والحروف: يمثّل الحرف عددًا لا نعرفه أو يتغيّر.', 'A language with numbers and letters: a letter stands for a number we do not know or that changes.')
            },
            {
                term: say('Gai orokorra', 'Término general', 'الحد العام', 'General term'),
                meaning: say('Segida baten $n$ gaiaren formula, $a_{n}$: harekin edozein gai kalkula daiteke.', 'La fórmula del término $n$ de una serie, $a_{n}$: con ella se calcula cualquier término.', 'صيغة الحد رقم $n$ في متتالية، $a_{n}$: وبها يُحسب أي حد.', 'The formula for term $n$ of a sequence, $a_{n}$: with it you can work out any term.')
            }
        ],
        explanation: say(
            'Letrekin propietateak idazten dira ($a\\cdot b=b\\cdot a$), formulak ($A=b\\cdot h$) eta segida baten gai orokorra. Hura aurkitzeko, begiratu gai bakoitza zenbat handitzen den: 3 gehitzen badu, $3n$ agertuko da.',
            'Con letras se escriben propiedades ($a\\cdot b=b\\cdot a$), fórmulas ($A=b\\cdot h$) y el término general de una serie. Para hallarlo, mira cuánto aumenta cada término: si suma 3, aparecerá $3n$.',
            'بالحروف نكتب الخصائص ($a\\cdot b=b\\cdot a$) والصيغ ($A=b\\cdot h$) والحد العام لمتتالية. ولإيجاده انظر بكم يزيد كل حد: إذا زاد 3 ظهر $3n$.',
            'Letters are used to write properties ($a\\cdot b=b\\cdot a$), formulas ($A=b\\cdot h$) and the general term of a sequence. To find it, see how much each term goes up by: if it adds 3, $3n$ will appear.'
        ),
        examplePrompt: say('Segida: 7, 11, 15, 19, … Idatzi gai orokorra eta kalkulatu 10. gaia.', 'Serie: 7, 11, 15, 19, … Escribe el término general y calcula el término 10.', 'المتتالية: 7، 11، 15، 19، … اكتب الحد العام واحسب الحد العاشر.', 'Sequence: 7, 11, 15, 19, … Write the general term and work out term 10.'),
        example: same('$\\begin{gathered}a_{n}=4n+3\\\\a_{10}=4\\cdot 10+3=43\\end{gathered}$'),
        exampleAnswer: say('Gai bakoitzak 4 gehitzen du. Egiaztatu: $a_{1}=4\\cdot 1+3=7$.', 'Cada término suma 4. Comprueba: $a_{1}=4\\cdot 1+3=7$.', 'كل حد يزيد 4. تحقّق: $a_{1}=4\\cdot 1+3=7$.', 'Each term adds 4. Check: $a_{1}=4\\cdot 1+3=7$.')
    },
    value: {
        definitions: [
            {
                term: say('Zenbakizko balioa', 'Valor numérico', 'القيمة العددية', 'Numerical value'),
                meaning: say('Letrak zenbakiez ordeztu eta eragiketak egitean ateratzen den emaitza.', 'El resultado de sustituir las letras por números y hacer las operaciones.', 'الناتج بعد تعويض الحروف بأعداد وإجراء العمليات.', 'The result of replacing the letters with numbers and doing the operations.')
            }
        ],
        explanation: say(
            'Kontuz negatiboekin: jarri parentesi artean eta errespetatu hierarkia: lehenik berreturak, gero biderketak, eta azkenik batuketak eta kenketak.',
            'Cuidado con los negativos: ponlos entre paréntesis y respeta la jerarquía: primero las potencias, luego los productos y al final las sumas y restas.',
            'انتبه للأعداد السالبة: ضعها بين قوسين واحترم أولوية العمليات: القوى أولًا ثم الضرب وأخيرًا الجمع والطرح.',
            'Be careful with negatives: put them in brackets and follow the order of operations: powers first, then products, and sums and differences last.'
        ),
        examplePrompt: say('Kalkulatu $x^{2}-3xy$ adierazpenaren balioa, $x=-2$ eta $y=4$ direnean.', 'Calcula el valor de $x^{2}-3xy$ para $x=-2$ e $y=4$.', 'احسب قيمة $x^{2}-3xy$ عندما $x=-2$ و$y=4$.', 'Work out the value of $x^{2}-3xy$ for $x=-2$ and $y=4$.'),
        example: same('$(-2)^{2}-3\\cdot(-2)\\cdot 4=4+24=28$'),
        exampleAnswer: say('Balioa 28 da: parentesiekin, $(-2)^{2}=4$.', 'El valor es 28: con los paréntesis, $(-2)^{2}=4$.', 'القيمة 28: مع الأقواس $(-2)^{2}=4$.', 'The value is 28: with the brackets, $(-2)^{2}=4$.')
    },
    monomial: {
        definitions: [
            {
                term: say('Monomioa', 'Monomio', 'وحيد الحد', 'Monomial'),
                meaning: say('Zenbaki baten (koefizientea) eta letren (zati literala) biderkadura.', 'El producto de un número (el coeficiente) por letras (la parte literal).', 'جداء عدد (المعامل) في حروف (الجزء الحرفي).', 'The product of a number (the coefficient) and letters (the literal part).')
            },
            {
                term: say('Monomio baten maila', 'Grado de un monomio', 'درجة وحيد الحد', 'Degree of a monomial'),
                meaning: say('Haren letren berretzaileen batura.', 'La suma de los exponentes de sus letras.', 'مجموع أسس حروفه.', 'The sum of the exponents of its letters.')
            },
            {
                term: say('Monomio antzekoak', 'Monomios semejantes', 'وحيدات الحد المتشابهة', 'Like monomials'),
                meaning: say('Zati literal bera dutenak; aurkakoak dira, gainera, koefizienteak aurkakoak badituzte.', 'Los que tienen la misma parte literal; son opuestos si además sus coeficientes son opuestos.', 'التي لها الجزء الحرفي نفسه، وتكون متعاكسة إذا كانت معاملاتها أيضًا متعاكسة.', 'Those with the same literal part; they are opposites if their coefficients are opposite too.')
            }
        ],
        explanation: say(
            'Begiratu berretzailerik gabeko letrei: 1 bat dute ($x=x^{1}$) eta mailarako kontatzen dira. Letrarik gabeko zenbaki bat 0 mailako monomioa da.',
            'Fíjate en las letras sin exponente: llevan un 1 ($x=x^{1}$) y cuentan para el grado. Un número sin letras es un monomio de grado 0.',
            'انتبه للحروف دون أس: أسها 1 ($x=x^{1}$) وتُحسب في الدرجة. والعدد دون حروف وحيد حد من الدرجة 0.',
            'Watch out for letters with no exponent: they have a 1 ($x=x^{1}$) and count for the degree. A number with no letters is a monomial of degree 0.'
        ),
        examplePrompt: say('Esan $-\\frac{2}{3}ab^{3}$ monomioaren koefizientea, zati literala eta maila.', 'Di el coeficiente, la parte literal y el grado de $-\\frac{2}{3}ab^{3}$.', 'بيّن معامل $-\\frac{2}{3}ab^{3}$ وجزأه الحرفي ودرجته.', 'Give the coefficient, the literal part and the degree of $-\\frac{2}{3}ab^{3}$.'),
        example: same('$1+3=4$'),
        exampleAnswer: say('Koefizientea $-\\frac{2}{3}$, zati literala $ab^{3}$ eta maila 4.', 'Coeficiente $-\\frac{2}{3}$, parte literal $ab^{3}$ y grado 4.', 'المعامل $-\\frac{2}{3}$، والجزء الحرفي $ab^{3}$، والدرجة 4.', 'Coefficient $-\\frac{2}{3}$, literal part $ab^{3}$ and degree 4.')
    },
    'add-monomials': {
        explanation: say(
            'Monomio antzekoak bakarrik batu edo ken daitezke: koefizienteak batu edo kentzen dira, eta zati literala berdin geratzen da. Antzekoak ez badira, eragiketa adierazita geratzen da. Adierazpen bat laburtzeko, elkartu gai antzekoak.',
            'Solo se pueden sumar o restar monomios semejantes: se suman o restan los coeficientes y la parte literal se queda igual. Si no son semejantes, la operación queda indicada. Para reducir una expresión, agrupa los términos semejantes.',
            'لا نجمع أو نطرح إلا وحيدات الحد المتشابهة: نجمع المعاملات أو نطرحها ويبقى الجزء الحرفي كما هو. وإذا لم تكن متشابهة تبقى العملية مكتوبة. ولتبسيط عبارة اجمع الحدود المتشابهة.',
            'Only like monomials can be added or subtracted: add or subtract the coefficients and keep the literal part. If they are not alike, the operation is left as it is. To simplify an expression, group the like terms.'
        ),
        examplePrompt: say('Laburtu $7ab-2a+3ab+5a-4$.', 'Reduce $7ab-2a+3ab+5a-4$.', 'بسّط $7ab-2a+3ab+5a-4$.', 'Simplify $7ab-2a+3ab+5a-4$.'),
        example: same('$\\begin{aligned}&7ab+3ab-2a+5a-4\\\\&=10ab+3a-4\\end{aligned}$'),
        exampleAnswer: say('$ab$ eta $a$ ez dira antzekoak: emaitzak hiru gai ditu.', '$ab$ y $a$ no son semejantes: el resultado tiene tres términos.', '$ab$ و$a$ غير متشابهين: للنتيجة ثلاثة حدود.', '$ab$ and $a$ are not alike: the result has three terms.')
    },
    'multiply-monomials': {
        explanation: say(
            'Monomioak biderkatzeko, biderkatu koefizienteak eta batu letra berdinen berretzaileak ($x^{2}\\cdot x^{3}=x^{5}$). Zatitzeko, zatitu koefizienteak eta kendu berretzaileak ($x^{5}\\mathbin{:}x^{2}=x^{3}$). Ez dute zertan antzekoak izan.',
            'Para multiplicar monomios, multiplica los coeficientes y suma los exponentes de las letras iguales ($x^{2}\\cdot x^{3}=x^{5}$). Para dividir, divide los coeficientes y resta los exponentes ($x^{5}\\mathbin{:}x^{2}=x^{3}$). No hace falta que sean semejantes.',
            'لضرب وحيدات الحد اضرب المعاملات واجمع أسس الحروف المتماثلة ($x^{2}\\cdot x^{3}=x^{5}$). وللقسمة اقسم المعاملات واطرح الأسس ($x^{5}\\mathbin{:}x^{2}=x^{3}$). ولا يلزم أن تكون متشابهة.',
            'To multiply monomials, multiply the coefficients and add the exponents of the same letters ($x^{2}\\cdot x^{3}=x^{5}$). To divide, divide the coefficients and subtract the exponents ($x^{5}\\mathbin{:}x^{2}=x^{3}$). They do not need to be alike.'
        ),
        examplePrompt: say('Kalkulatu $(-2x^{2}y)\\cdot(6xy^{3})$ eta $(18a^{4}b)\\mathbin{:}(-3a)$.', 'Calcula $(-2x^{2}y)\\cdot(6xy^{3})$ y $(18a^{4}b)\\mathbin{:}(-3a)$.', 'احسب $(-2x^{2}y)\\cdot(6xy^{3})$ و$(18a^{4}b)\\mathbin{:}(-3a)$.', 'Work out $(-2x^{2}y)\\cdot(6xy^{3})$ and $(18a^{4}b)\\mathbin{:}(-3a)$.'),
        example: same('$\\begin{gathered}(-2x^{2}y)\\cdot(6xy^{3})=-12x^{3}y^{4}\\\\(18a^{4}b)\\mathbin{:}(-3a)=-6a^{3}b\\end{gathered}$'),
        exampleAnswer: say('Biderkatzean berretzaileak batu egiten dira; zatitzean, kendu.', 'Al multiplicar se suman los exponentes; al dividir, se restan.', 'عند الضرب نجمع الأسس، وعند القسمة نطرحها.', 'When multiplying you add the exponents; when dividing, you subtract them.')
    },

    /* ---------- 2. Polynomials ---------- */
    polynomial: {
        definitions: [
            {
                term: say('Polinomioa', 'Polinomio', 'الحدودية', 'Polynomial'),
                meaning: say('Antzekoak ez diren monomioen batura; bakoitza gai bat da. Haren maila gaien mailarik handiena da.', 'Una suma de monomios no semejantes; cada uno es un término. Su grado es el mayor grado de sus términos.', 'مجموع وحيدات حد غير متشابهة، وكل منها حد. ودرجتها أكبر درجات حدودها.', 'A sum of unlike monomials; each one is a term. Its degree is the highest degree of its terms.')
            },
            {
                term: say('Gai askea', 'Término independiente', 'الحد الثابت', 'Constant term'),
                meaning: say('Letrarik gabeko gaia. $P(0)$ balioa da.', 'El término sin letra. Es el valor de $P(0)$.', 'الحد الخالي من الحرف، وهو قيمة $P(0)$.', 'The term with no letter. It is the value of $P(0)$.')
            }
        ],
        explanation: say(
            '$P(a)$ idazten da polinomioaren balioa $x=a$ denean. Polinomio aurkakoa, $-P(x)$, gai guztien zeinua aldatuz lortzen da.',
            'Se escribe $P(a)$ para el valor del polinomio cuando $x=a$. El polinomio opuesto, $-P(x)$, se obtiene cambiando el signo de todos los términos.',
            'نكتب $P(a)$ لقيمة الحدودية عندما $x=a$. والحدودية المعاكسة $-P(x)$ نحصل عليها بتغيير إشارة كل الحدود.',
            '$P(a)$ is the value of the polynomial when $x=a$. The opposite polynomial, $-P(x)$, comes from changing the sign of every term.'
        ),
        examplePrompt: say('$Q(x)=2x^{3}-x+4$ bada, kalkulatu $Q(-2)$ eta $Q(0)$.', 'Si $Q(x)=2x^{3}-x+4$, calcula $Q(-2)$ y $Q(0)$.', 'إذا كانت $Q(x)=2x^{3}-x+4$ فاحسب $Q(-2)$ و$Q(0)$.', 'If $Q(x)=2x^{3}-x+4$, work out $Q(-2)$ and $Q(0)$.'),
        example: same('$\\begin{gathered}Q(-2)=2\\cdot(-8)+2+4=-10\\\\Q(0)=4\\end{gathered}$'),
        exampleAnswer: say('$Q(0)=4$ gai askea da.', '$Q(0)=4$ es el término independiente.', '$Q(0)=4$ هو الحد الثابت.', '$Q(0)=4$ is the constant term.')
    },
    'add-polynomials': {
        explanation: say(
            'Polinomioak batzeko, batu gai antzekoak. Kentzeko, batu lehenengoari bigarrenaren aurkakoa: aurrean minus bat duen parentesia kentzean, barruko gai guztiek zeinua aldatzen dute. Lagungarria da bata bestearen azpian idaztea, mailaka.',
            'Para sumar polinomios, suma los términos semejantes. Para restar, suma al primero el opuesto del segundo: al quitar un paréntesis con un menos delante, cambian de signo todos los términos de dentro. Ayuda escribirlos uno debajo del otro, por grados.',
            'لجمع الحدوديات اجمع الحدود المتشابهة. وللطرح أضف إلى الأولى معاكسة الثانية: عند حذف قوس مسبوق بناقص تتغيّر إشارة كل الحدود داخله. ويساعد أن تكتبهما إحداهما تحت الأخرى حسب الدرجات.',
            'To add polynomials, add the like terms. To subtract, add the opposite of the second to the first: when you remove a bracket with a minus in front, every term inside changes sign. It helps to write them one under the other, by degree.'
        ),
        examplePrompt: say('Kalkulatu $(2x^{3}+x-5)-(x^{3}-3x^{2}+x-2)$.', 'Calcula $(2x^{3}+x-5)-(x^{3}-3x^{2}+x-2)$.', 'احسب $(2x^{3}+x-5)-(x^{3}-3x^{2}+x-2)$.', 'Work out $(2x^{3}+x-5)-(x^{3}-3x^{2}+x-2)$.'),
        example: same('$\\begin{aligned}&2x^{3}+x-5-x^{3}+3x^{2}-x+2\\\\&=x^{3}+3x^{2}-3\\end{aligned}$'),
        exampleAnswer: say('$x$ duen gaia desagertu egiten da: $x-x=0$.', 'El término en $x$ desaparece: $x-x=0$.', 'يختفي حد $x$: $x-x=0$.', 'The $x$ term disappears: $x-x=0$.')
    },
    'multiply-monomial': {
        explanation: say(
            'Polinomio bat monomio batez biderkatzeko, aplikatu banaketa-propietatea: monomioak gai bakoitza biderkatzen du. Polinomio bat monomio batez zatitzeko, zatitu gai bakoitza monomioaz.',
            'Para multiplicar un polinomio por un monomio, aplica la propiedad distributiva: el monomio multiplica a cada término. Para dividir un polinomio entre un monomio, divide cada término entre el monomio.',
            'لضرب حدودية في وحيد حد طبّق خاصية التوزيع: يضرب وحيد الحد كل حد. ولقسمة حدودية على وحيد حد اقسم كل حد عليه.',
            'To multiply a polynomial by a monomial, use the distributive property: the monomial multiplies each term. To divide a polynomial by a monomial, divide each term by the monomial.'
        ),
        examplePrompt: say('Kalkulatu $-4x(3x^{2}-2x+1)$ eta $(15x^{4}-6x^{2})\\mathbin{:}(3x^{2})$.', 'Calcula $-4x(3x^{2}-2x+1)$ y $(15x^{4}-6x^{2})\\mathbin{:}(3x^{2})$.', 'احسب $-4x(3x^{2}-2x+1)$ و$(15x^{4}-6x^{2})\\mathbin{:}(3x^{2})$.', 'Work out $-4x(3x^{2}-2x+1)$ and $(15x^{4}-6x^{2})\\mathbin{:}(3x^{2})$.'),
        example: same('$\\begin{aligned}&-4x(3x^{2}-2x+1)\\\\&=-12x^{3}+8x^{2}-4x\\\\&(15x^{4}-6x^{2})\\mathbin{:}(3x^{2})\\\\&=5x^{2}-2\\end{aligned}$'),
        exampleAnswer: say('Monomioak gai guztiak biderkatzen (edo zatitzen) ditu.', 'El monomio multiplica (o divide) a todos los términos.', 'يضرب وحيد الحد (أو يقسم) كل الحدود.', 'The monomial multiplies (or divides) every term.')
    },
    'multiply-polynomials': {
        explanation: say(
            'Bi polinomio biderkatzeko, biderkatu lehenengoaren gai bakoitza bigarrenaren gai guztiez, eta laburtu antzekoak. Bi binomioren biderkadura laukizuzen baten azalera gisa ikus daiteke: lau zatien batura.',
            'Para multiplicar dos polinomios, multiplica cada término del primero por todos los del segundo y reduce los semejantes. El producto de dos binomios se puede ver como el área de un rectángulo: la suma de cuatro partes.',
            'لضرب حدوديتين اضرب كل حد من الأولى في كل حدود الثانية وبسّط المتشابهة. ويمكن رؤية جداء ثنائيتين كمساحة مستطيل: مجموع أربعة أجزاء.',
            'To multiply two polynomials, multiply each term of the first by every term of the second and simplify the like terms. The product of two binomials can be seen as the area of a rectangle: the sum of four parts.'
        ),
        examplePrompt: say('Kalkulatu $(3x+2)(x-4)$.', 'Calcula $(3x+2)(x-4)$.', 'احسب $(3x+2)(x-4)$.', 'Work out $(3x+2)(x-4)$.'),
        example: same('$\\begin{aligned}&(3x+2)(x-4)\\\\&=3x^{2}-12x+2x-8\\\\&=3x^{2}-10x-8\\end{aligned}$'),
        exampleAnswer: say('Lau biderkadura, eta $-12x+2x=-10x$.', 'Cuatro productos, y $-12x+2x=-10x$.', 'أربعة جداءات، و$-12x+2x=-10x$.', 'Four products, and $-12x+2x=-10x$.')
    },

    /* ---------- 3. Special products ---------- */
    'square-sum': {
        explanation: say(
            'Batura baten karratua lehenaren karratua da, gehi lehenaren eta bigarrenaren biderkaduraren bikoitza, gehi bigarrenaren karratua: $(a+b)^{2}=a^{2}+2ab+b^{2}$. Ez ahaztu $2ab$: $(a+b)^{2}$ ez da $a^{2}+b^{2}$.',
            'El cuadrado de una suma es el cuadrado del primero, más el doble del primero por el segundo, más el cuadrado del segundo: $(a+b)^{2}=a^{2}+2ab+b^{2}$. No olvides $2ab$: $(a+b)^{2}$ no es $a^{2}+b^{2}$.',
            'مربع مجموع هو مربع الأول زائد ضعف جداء الأول في الثاني زائد مربع الثاني: $(a+b)^{2}=a^{2}+2ab+b^{2}$. لا تنسَ $2ab$: فـ$(a+b)^{2}$ ليست $a^{2}+b^{2}$.',
            'The square of a sum is the square of the first, plus twice the first times the second, plus the square of the second: $(a+b)^{2}=a^{2}+2ab+b^{2}$. Do not forget $2ab$: $(a+b)^{2}$ is not $a^{2}+b^{2}$.'
        ),
        examplePrompt: say('Garatu $(x+7)^{2}$ eta $(4a+1)^{2}$.', 'Desarrolla $(x+7)^{2}$ y $(4a+1)^{2}$.', 'انشر $(x+7)^{2}$ و$(4a+1)^{2}$.', 'Expand $(x+7)^{2}$ and $(4a+1)^{2}$.'),
        example: same('$\\begin{gathered}(x+7)^{2}=x^{2}+14x+49\\\\(4a+1)^{2}=16a^{2}+8a+1\\end{gathered}$'),
        exampleAnswer: say('Erdiko gaia biderkaduraren bikoitza da: $2\\cdot x\\cdot 7=14x$.', 'El término del medio es el doble del producto: $2\\cdot x\\cdot 7=14x$.', 'الحد الأوسط ضعف الجداء: $2\\cdot x\\cdot 7=14x$.', 'The middle term is twice the product: $2\\cdot x\\cdot 7=14x$.')
    },
    'square-difference': {
        explanation: say(
            'Kendura baten karratua lehenaren karratua da, ken biderkaduraren bikoitza, gehi bigarrenaren karratua: $(a-b)^{2}=a^{2}-2ab+b^{2}$. Erdiko gaia bakarrik da negatiboa: azkena karratu bat da.',
            'El cuadrado de una diferencia es el cuadrado del primero, menos el doble del producto, más el cuadrado del segundo: $(a-b)^{2}=a^{2}-2ab+b^{2}$. Solo el término del medio es negativo: el último es un cuadrado.',
            'مربع فرق هو مربع الأول ناقص ضعف الجداء زائد مربع الثاني: $(a-b)^{2}=a^{2}-2ab+b^{2}$. والحد الأوسط وحده سالب: فالأخير مربع.',
            'The square of a difference is the square of the first, minus twice the product, plus the square of the second: $(a-b)^{2}=a^{2}-2ab+b^{2}$. Only the middle term is negative: the last one is a square.'
        ),
        examplePrompt: say('Garatu $(x-9)^{2}$ eta $(5x-2)^{2}$.', 'Desarrolla $(x-9)^{2}$ y $(5x-2)^{2}$.', 'انشر $(x-9)^{2}$ و$(5x-2)^{2}$.', 'Expand $(x-9)^{2}$ and $(5x-2)^{2}$.'),
        example: same('$\\begin{gathered}(x-9)^{2}=x^{2}-18x+81\\\\(5x-2)^{2}=25x^{2}-20x+4\\end{gathered}$'),
        exampleAnswer: say('Azken gaia, 81 edo 4, beti da positiboa.', 'El último término, 81 o 4, siempre es positivo.', 'الحد الأخير، 81 أو 4، موجب دائمًا.', 'The last term, 81 or 4, is always positive.')
    },
    'sum-difference': {
        explanation: say(
            'Batura bat bider kendura bat karratuen kendura da: $(a+b)(a-b)=a^{2}-b^{2}$, erdiko gaiak, $+ab$ eta $-ab$, ezabatu egiten direlako. Kalkulu mentalerako ere balio du.',
            'Una suma por una diferencia es una diferencia de cuadrados: $(a+b)(a-b)=a^{2}-b^{2}$, porque los términos del medio, $+ab$ y $-ab$, se anulan. También sirve para el cálculo mental.',
            'مجموع في فرق يساوي فرق مربعين: $(a+b)(a-b)=a^{2}-b^{2}$، لأن الحدين الأوسطين $+ab$ و$-ab$ يلغي أحدهما الآخر. ويفيد أيضًا في الحساب الذهني.',
            'A sum times a difference is a difference of squares: $(a+b)(a-b)=a^{2}-b^{2}$, because the middle terms, $+ab$ and $-ab$, cancel out. It also helps with mental arithmetic.'
        ),
        examplePrompt: say('Kalkulatu $(3a+4)(3a-4)$ eta $53\\cdot 47$.', 'Calcula $(3a+4)(3a-4)$ y $53\\cdot 47$.', 'احسب $(3a+4)(3a-4)$ و$53\\cdot 47$.', 'Work out $(3a+4)(3a-4)$ and $53\\cdot 47$.'),
        example: same('$\\begin{gathered}(3a+4)(3a-4)=9a^{2}-16\\\\53\\cdot 47=50^{2}-3^{2}=2491\\end{gathered}$'),
        exampleAnswer: say('$53\\cdot 47=(50+3)(50-3)$.', '$53\\cdot 47=(50+3)(50-3)$.', '$53\\cdot 47=(50+3)(50-3)$.', '$53\\cdot 47=(50+3)(50-3)$.')
    },

    /* ---------- 4. Factorising ---------- */
    'common-factor': {
        definitions: [
            {
                term: say('Faktore komuna ateratzea', 'Sacar factor común', 'إخراج العامل المشترك', 'Taking out a common factor'),
                meaning: say('Banaketa-propietatea alderantziz aplikatzea: gai guztietan dagoena parentesitik kanpora idazten da.', 'Aplicar la propiedad distributiva al revés: lo que está en todos los términos se escribe fuera del paréntesis.', 'تطبيق خاصية التوزيع بالعكس: ما يوجد في كل الحدود يُكتب خارج القوس.', 'Using the distributive property backwards: whatever is in every term is written outside the brackets.')
            }
        ],
        explanation: say(
            'Hartu koefizienteen ZKH eta gai guztietan dauden letrak, berretzaile txikienarekin. Parentesi barruan gai bakoitza zati faktore komuna geratzen da. Egiaztatu biderkatuz.',
            'Toma el m.c.d. de los coeficientes y las letras que están en todos los términos, con el menor exponente. Dentro del paréntesis queda cada término dividido entre el factor común. Comprueba multiplicando.',
            'خذ ق.م.أ للمعاملات والحروف الموجودة في كل الحدود بأصغر أس. وداخل القوس يبقى كل حد مقسومًا على العامل المشترك. وتحقّق بالضرب.',
            'Take the GCD of the coefficients and the letters that are in every term, with the smallest exponent. Inside the brackets goes each term divided by the common factor. Check by multiplying.'
        ),
        examplePrompt: say('Atera faktore komuna: $12a^{3}b-8a^{2}b^{2}+4a^{2}b$.', 'Saca factor común: $12a^{3}b-8a^{2}b^{2}+4a^{2}b$.', 'أخرج العامل المشترك: $12a^{3}b-8a^{2}b^{2}+4a^{2}b$.', 'Take out the common factor: $12a^{3}b-8a^{2}b^{2}+4a^{2}b$.'),
        example: same('$\\begin{aligned}&12a^{3}b-8a^{2}b^{2}+4a^{2}b\\\\&=4a^{2}b(3a-2b+1)\\end{aligned}$'),
        exampleAnswer: say('Azken gaian 1 geratzen da, gai osoa faktore komuna baita.', 'En el último término queda 1, porque es todo el factor común.', 'يبقى 1 في الحد الأخير لأنه العامل المشترك كله.', 'The last term leaves 1, because it is the whole common factor.')
    },
    'factor-identities': {
        explanation: say(
            'Biderkadura nabarmenak alderantziz irakur daitezke. Hiru gai badaude, bi karratuak dira eta erdikoa haien oinarrien biderkaduraren bikoitza, batura edo kendura baten karratua da. Karratuen kendura bat bada, batura bider kendura da.',
            'Los productos notables se pueden leer al revés. Si hay tres términos, dos son cuadrados y el del medio es el doble del producto de sus bases, es el cuadrado de una suma o de una diferencia. Si es una diferencia de cuadrados, es una suma por diferencia.',
            'يمكن قراءة المتطابقات الشهيرة بالعكس. إذا كانت هناك ثلاثة حدود، اثنان منها مربعان والأوسط ضعف جداء أساسيهما، فهي مربع مجموع أو فرق. وإذا كانت فرق مربعين فهي مجموع في فرق.',
            'Special products can be read backwards. If there are three terms, two are squares and the middle one is twice the product of their bases, it is the square of a sum or of a difference. If it is a difference of squares, it is a sum times a difference.'
        ),
        examplePrompt: say('Idatzi biderkadura gisa: $x^{2}+12x+36$ eta $49-a^{2}$.', 'Escribe como producto: $x^{2}+12x+36$ y $49-a^{2}$.', 'اكتب في صورة جداء: $x^{2}+12x+36$ و$49-a^{2}$.', 'Write as a product: $x^{2}+12x+36$ and $49-a^{2}$.'),
        example: same('$\\begin{gathered}x^{2}+12x+36=(x+6)^{2}\\\\49-a^{2}=(7+a)(7-a)\\end{gathered}$'),
        exampleAnswer: say('Erdiko gaiak, $2\\cdot x\\cdot 6=12x$, lehena baieztatzen du.', 'El del medio, $2\\cdot x\\cdot 6=12x$, confirma el primero.', 'الحد الأوسط $2\\cdot x\\cdot 6=12x$ يؤكد الأول.', 'The middle term, $2\\cdot x\\cdot 6=12x$, confirms the first.')
    },
    mental: {
        explanation: say(
            'Biderkadura nabarmenekin eta faktore komunarekin, kalkulu luze asko buruz egiten dira: bilatu zenbaki biribil bat gertu, edo errepikatzen den faktore bat.',
            'Con los productos notables y el factor común, muchos cálculos largos se hacen de cabeza: busca un número redondo cerca o un factor que se repita.',
            'بالمتطابقات الشهيرة والعامل المشترك تُجرى حسابات طويلة كثيرة ذهنيًا: ابحث عن عدد مستدير قريب أو عن عامل يتكرر.',
            'With special products and common factors, many long calculations can be done in your head: look for a round number nearby or a factor that repeats.'
        ),
        examplePrompt: say('Kalkulatu buruz $29^{2}$ eta $25\\cdot 17+25\\cdot 23$.', 'Calcula de cabeza $29^{2}$ y $25\\cdot 17+25\\cdot 23$.', 'احسب ذهنيًا $29^{2}$ و$25\\cdot 17+25\\cdot 23$.', 'Work out in your head $29^{2}$ and $25\\cdot 17+25\\cdot 23$.'),
        example: same('$\\begin{gathered}29^{2}=900-60+1=841\\\\25\\cdot 17+25\\cdot 23=25\\cdot 40=1000\\end{gathered}$'),
        exampleAnswer: say('$29=30-1$, eta 25 errepikatu egiten da: faktore komuna.', '$29=30-1$, y el 25 se repite: factor común.', '$29=30-1$، والعدد 25 يتكرر: عامل مشترك.', '$29=30-1$, and 25 repeats: a common factor.')
    }
}

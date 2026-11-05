import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { PolynomialsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Polinomioak · 4. DBH aplikatuak — what each lesson tells: the new words
   (definitions), a short explanation, its cases and the example as an
   exercise («Another example»), with the key words in four languages and,
   in four lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics. The explanations keep what
   their drawings show (the long division by x + 6, Ruffini by x − 5,
   M(4) = 20, the roots 1, 2 and 3, the rectangle of 200 m…). The examples
   are identities: tests/lesson-texts.test.ts tries them with numbers.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const polynomialsLessonTexts: Record<PolynomialsTopicId, LessonTexts> = {
    /* ---------- 1. Monomials and polynomials ---------- */
    monomials: {
        definitions: [
            {
                term: say('Monomioa', 'Monomio', 'وحيد الحد', 'Monomial'),
                meaning: say('Zenbaki bat (koefizientea) bider letra batzuk (zati literala). Haren maila letren berretzaileen batura da.', 'Un número (el coeficiente) por unas letras (la parte literal). Su grado es la suma de los exponentes de las letras.', 'عدد (المعامل) في حروف (الجزء الحرفي). ودرجته مجموع أسس الحروف.', 'A number (the coefficient) times some letters (the literal part). Its degree is the sum of the exponents of the letters.')
            },
            {
                term: say('Monomio antzekoak', 'Monomios semejantes', 'وحيدات حد متشابهة', 'Like terms'),
                meaning: say('Zati literal bera dutenak, $7x^{2}$ eta $-3x^{2}$ bezala.', 'Los que tienen la misma parte literal, como $7x^{2}$ y $-3x^{2}$.', 'التي لها الجزء الحرفي نفسه، مثل $7x^{2}$ و$-3x^{2}$.', 'Monomials with the same literal part, like $7x^{2}$ and $-3x^{2}$.')
            }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('maila', 'grado', 'الدرجة', 'degree'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        explanation: say(
            '$4xy^{2}t$ monomioaren maila $1+2+1=4$ da. Antzekoak bakarrik batu edo kendu daitezke; biderkatzean eta zatitzean, koefizienteekin eta letra bakoitzaren berretzaileekin egiten da eragiketa.',
            'El grado de $4xy^{2}t$ es $1+2+1=4$. Solo se pueden sumar o restar los semejantes; al multiplicar y al dividir se opera con los coeficientes y con los exponentes de cada letra.',
            'درجة $4xy^{2}t$ هي $1+2+1=4$. لا نجمع ولا نطرح إلا المتشابهة؛ وعند الضرب والقسمة نحسب بالمعاملات وبأسس كل حرف.',
            'The degree of $4xy^{2}t$ is $1+2+1=4$. Only like terms can be added or subtracted; when multiplying and dividing, you work with the coefficients and with the exponents of each letter.'
        ),
        cases: [
            { title: say('Batu eta kendu', 'Sumar y restar', 'الجمع والطرح', 'Add and subtract'), text: say('Antzekoak bakarrik: koefizienteak batzen dira. $x+x^{3}$ ezin da laburtu.', 'Solo semejantes: se suman los coeficientes. $x+x^{3}$ no se puede reducir.', 'المتشابهة فقط: نجمع المعاملات. ولا يُختصر $x+x^{3}$.', 'Only like terms: add the coefficients. $x+x^{3}$ cannot be simplified.'), math: same('$7x^{2}-3x^{2}+x^{2}=5x^{2}$') },
            { title: say('Biderkatu', 'Multiplicar', 'الضرب', 'Multiply'), text: say('Koefizienteak biderkatzen dira, eta letra bereko berretzaileak batu.', 'Se multiplican los coeficientes y se suman los exponentes de la misma letra.', 'نضرب المعاملات ونجمع أسس الحرف نفسه.', 'Multiply the coefficients and add the exponents of the same letter.'), math: same('$(3x^{2})\\cdot(5xy)=15x^{3}y$') },
            { title: say('Zatitu', 'Dividir', 'القسمة', 'Divide'), text: say('Koefizienteak zatitzen dira eta berretzaileak kendu.', 'Se dividen los coeficientes y se restan los exponentes.', 'نقسم المعاملات ونطرح الأسس.', 'Divide the coefficients and subtract the exponents.'), math: same('$(12x^{5})\\div(4x^{2})=3x^{3}$') }
        ],
        examplePrompt: say('Laburtu $4x^{3}-x^{3}+2x$ eta kalkulatu $(-6x^{2}y)\\cdot(2xy^{3})$.', 'Reduce $4x^{3}-x^{3}+2x$ y calcula $(-6x^{2}y)\\cdot(2xy^{3})$.', 'اختصر $4x^{3}-x^{3}+2x$ واحسب $(-6x^{2}y)\\cdot(2xy^{3})$.', 'Simplify $4x^{3}-x^{3}+2x$ and calculate $(-6x^{2}y)\\cdot(2xy^{3})$.'),
        example: same('$\\begin{gathered}4x^{3}-x^{3}+2x=3x^{3}+2x\\\\ (-6x^{2}y)\\cdot(2xy^{3})=-12x^{3}y^{4}\\end{gathered}$'),
        exampleAnswer: say('$3x^{3}$ eta $2x$ ez dira antzekoak: ezin dira elkartu.', '$3x^{3}$ y $2x$ no son semejantes: no se pueden juntar.', '$3x^{3}$ و$2x$ ليسا متشابهين: لا يُجمعان.', '$3x^{3}$ and $2x$ are not like terms: they cannot be put together.')
    },
    'polynomial-value': {
        definitions: [
            {
                term: say('Polinomioa', 'Polinomio', 'الحدودية', 'Polynomial'),
                meaning: say('Antzekoak ez diren monomioen batura; monomio bakoitza gai bat da.', 'Una suma de monomios no semejantes; cada monomio es un término.', 'مجموع وحيدات حد غير متشابهة؛ وكل منها حدّ.', 'A sum of monomials that are not like terms; each monomial is a term.')
            },
            {
                term: say('Gai askea', 'Término independiente', 'الحد الثابت', 'Constant term'),
                meaning: say('Letrarik ez duen gaia.', 'El término que no tiene letra.', 'الحد الذي لا حرف فيه.', 'The term with no letter.')
            }
        ],
        vocabulary: [
            say('gaia', 'término', 'حدّ', 'term'),
            say('maila', 'grado', 'الدرجة', 'degree'),
            say('zenbakizko balioa', 'valor numérico', 'القيمة العددية', 'value')
        ],
        explanation: say(
            'Polinomio baten maila haren gaien mailarik handiena da: $P(x)=x^{5}-6x^{2}+3x+1$ polinomioaren maila 5 da eta gai askea 1. $P(a)$ zenbakizko balioa $x$ letraren ordez $a$ jarrita lortzen da; negatiboak parentesi artean, eta lehenik berreturak.',
            'El grado de un polinomio es el mayor grado de sus términos: $P(x)=x^{5}-6x^{2}+3x+1$ tiene grado 5 y término independiente 1. El valor numérico $P(a)$ se obtiene poniendo $a$ en lugar de $x$; los negativos, entre paréntesis, y primero las potencias.',
            'درجة الحدودية أكبر درجات حدودها: درجة $P(x)=x^{5}-6x^{2}+3x+1$ هي 5 وحدّها الثابت 1. والقيمة العددية $P(a)$ نحصل عليها بوضع $a$ مكان $x$؛ والأعداد السالبة بين قوسين، والقوى أولًا.',
            'The degree of a polynomial is the highest degree of its terms: $P(x)=x^{5}-6x^{2}+3x+1$ has degree 5 and constant term 1. The value $P(a)$ is found by putting $a$ in place of $x$; negative numbers go in brackets, and powers come first.'
        ),
        examplePrompt: say('$Q(x)=x^{3}-2x+5$ bada, kalkulatu $Q(2)$ eta $Q(-2)$.', 'Si $Q(x)=x^{3}-2x+5$, calcula $Q(2)$ y $Q(-2)$.', 'إذا كان $Q(x)=x^{3}-2x+5$ فاحسب $Q(2)$ و$Q(-2)$.', 'If $Q(x)=x^{3}-2x+5$, calculate $Q(2)$ and $Q(-2)$.'),
        example: same('$\\begin{gathered}Q(2)=8-4+5=9\\\\ Q(-2)=-8+4+5=1\\end{gathered}$'),
        exampleAnswer: say('Negatiboa parentesi artean: $(-2)^{3}=-8$.', 'Con el negativo entre paréntesis: $(-2)^{3}=-8$.', 'مع السالب بين قوسين: $(-2)^{3}=-8$.', 'With the negative in brackets: $(-2)^{3}=-8$.')
    },
    language: {
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('jarraiak', 'consecutivos', 'متتاليان', 'consecutive'),
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter')
        ],
        explanation: say(
            'Letra batek edozein zenbaki adierazten du, eta harekin enuntziatuak itzultzen dira: zenbaki bat gehi haren kuboa, $x+x^{3}$; bi zenbaki natural jarraiak, $n$ eta $n+1$. Ehunekoak indizeekin: % 12 igotzea $1{,}12x$ da. Geometrian, $a$ eta $b$ aldeko laukizuzenaren perimetroa $2a+2b$ da.',
            'Una letra representa cualquier número, y con ella se traducen enunciados: un número más su cubo, $x+x^{3}$; dos naturales consecutivos, $n$ y $n+1$. Los porcentajes, con índices: subir un 12 % es $1{,}12x$. En geometría, el perímetro de un rectángulo de lados $a$ y $b$ es $2a+2b$.',
            'يمثّل الحرف أي عدد، وبه نترجم العبارات: عدد زائد مكعّبه $x+x^{3}$؛ وعددان طبيعيان متتاليان $n$ و$n+1$. والنسب بالمؤشرات: زيادة 12٪ هي $1{,}12x$. وفي الهندسة محيط مستطيل ضلعاه $a$ و$b$ هو $2a+2b$.',
            'A letter stands for any number, and with it you translate statements: a number plus its cube, $x+x^{3}$; two consecutive natural numbers, $n$ and $n+1$. Percentages, with multipliers: going up 12% is $1{,}12x$. In geometry, the perimeter of a rectangle with sides $a$ and $b$ is $2a+2b$.'
        ),
        examplePrompt: say('Bi zenbakiren kendura 20 da eta txikiena $x$ da. Adierazi handiena eta haien biderkadura.', 'La diferencia de dos números es 20 y el menor es $x$. Expresa el mayor y su producto.', 'الفرق بين عددين 20 وأصغرهما $x$. عبّر عن الأكبر وعن جدائهما.', 'The difference between two numbers is 20 and the smaller one is $x$. Write the larger one and their product.'),
        example: same('$\\begin{gathered}x+20\\\\ x(x+20)=x^{2}+20x\\end{gathered}$'),
        exampleAnswer: say('Handiena $x+20$ da eta biderkadura, $x^{2}+20x$.', 'El mayor es $x+20$ y el producto, $x^{2}+20x$.', 'الأكبر $x+20$ والجداء $x^{2}+20x$.', 'The larger one is $x+20$ and the product is $x^{2}+20x$.')
    },
    /* ---------- 2. Operations ---------- */
    'add-subtract': {
        vocabulary: [
            say('antzekoak', 'semejantes', 'المتشابهة', 'like terms'),
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('zutabea', 'columna', 'عمود', 'column')
        ],
        explanation: say(
            'Polinomioak batzeko, maila bereko gaiak batzen dira. Kentzeko, kenkizunaren gai guztien zeinua aldatzen da eta batu egiten da. Laguntzen du bata bestearen azpian idazteak, maila bakoitza bere zutabean eta hutsune bat falta den gaiaren tokian.',
            'Para sumar polinomios se suman los términos del mismo grado. Para restar, se cambia el signo de todos los términos del sustraendo y se suma. Ayuda escribirlos uno debajo del otro, cada grado en su columna y un hueco donde falte un término.',
            'لجمع الحدوديات نجمع الحدود ذات الدرجة نفسها. وللطرح نغيّر إشارة كل حدود المطروح ثم نجمع. ويساعد أن نكتبها واحدة تحت الأخرى، كل درجة في عمودها، مع فراغ مكان الحد الناقص.',
            'To add polynomials, add the terms of the same degree. To subtract, change the sign of every term of the one being subtracted and add. It helps to write them one under the other, each degree in its column and a gap where a term is missing.'
        ),
        cases: [
            { title: say('Batu', 'Sumar', 'الجمع', 'Add'), text: say('Fitxekin bezala: $x$ gaiak alde batetik eta zenbakiak bestetik.', 'Como con las fichas: las $x$ por un lado y los números por otro.', 'كما بالبطاقات: حدود $x$ معًا والأعداد معًا.', 'As with the tiles: the $x$ terms together and the numbers together.'), math: same('$(3x+2)+(2x+1)=5x+3$') },
            { title: say('Kendu', 'Restar', 'الطرح', 'Subtract'), text: say('Minusaren atzean, parentesiko zeinu guztiak aldatzen dira.', 'Tras un menos, cambian todos los signos del paréntesis.', 'بعد الناقص تتغيّر كل إشارات القوس.', 'After a minus, every sign in the brackets changes.'), math: same('$\\begin{aligned}(3x+2)-(2x+1)&=3x+2-2x-1\\\\ &=x+1\\end{aligned}$') }
        ],
        examplePrompt: say('$P=x^{3}-4x+2$ eta $Q=2x^{2}+4x-7$ badira, kalkulatu $P-Q$.', 'Si $P=x^{3}-4x+2$ y $Q=2x^{2}+4x-7$, calcula $P-Q$.', 'إذا كان $P=x^{3}-4x+2$ و$Q=2x^{2}+4x-7$ فاحسب $P-Q$.', 'If $P=x^{3}-4x+2$ and $Q=2x^{2}+4x-7$, calculate $P-Q$.'),
        example: same('$\\begin{aligned}&(x^{3}-4x+2)-(2x^{2}+4x-7)\\\\ &=x^{3}-2x^{2}-8x+9\\end{aligned}$'),
        exampleAnswer: say('Minusaren atzean $Q$ polinomioaren hiru zeinuak aldatzen dira.', 'Tras el menos cambian los tres signos de $Q$.', 'بعد الناقص تتغيّر إشارات $Q$ الثلاث.', 'After the minus, all three signs of $Q$ change.')
    },
    multiply: {
        vocabulary: [
            say('banatze-propietatea', 'propiedad distributiva', 'خاصية التوزيع', 'distributive property'),
            say('antzekoak', 'semejantes', 'المتشابهة', 'like terms'),
            say('azalera', 'área', 'مساحة', 'area')
        ],
        explanation: say(
            'Monomio bat polinomio batez biderkatzeko, gai bakoitzaz biderkatzen da (banatze-propietatea). Bi polinomio biderkatzeko, lehenengoaren gai bakoitza bigarrenaren gai guztiez biderkatzen da, eta gero antzekoak elkartzen dira. Emaitzaren maila mailen batura da.',
            'Para multiplicar un monomio por un polinomio, se multiplica por cada término (propiedad distributiva). Para multiplicar dos polinomios, cada término del primero se multiplica por todos los del segundo y después se agrupan los semejantes. El grado del resultado es la suma de los grados.',
            'لضرب وحيد حد في حدودية نضربه في كل حد (خاصية التوزيع). ولضرب حدوديتين نضرب كل حد من الأولى في كل حدود الثانية ثم نجمع المتشابهة. ودرجة الناتج مجموع الدرجتين.',
            'To multiply a monomial by a polynomial, multiply it by each term (distributive property). To multiply two polynomials, multiply each term of the first by every term of the second and then group the like terms. The degree of the result is the sum of the degrees.'
        ),
        cases: [
            { title: say('Monomioa bider polinomioa', 'Monomio por polinomio', 'وحيد حد في حدودية', 'Monomial times polynomial'), text: say('Gai bakoitzaz.', 'Por cada término.', 'في كل حد.', 'By each term.'), math: same('$2x\\cdot(3x^{2}-4)=6x^{3}-8x$') },
            { title: say('Azalera gisa', 'Como un área', 'مساحةً', 'As an area'), text: say('Marrazkian bezala: lau biderkadura, lau laukizuzen.', 'Como en el dibujo: cuatro productos, cuatro rectángulos.', 'كما في الرسم: أربعة جداءات، أربعة مستطيلات.', 'As in the drawing: four products, four rectangles.'), math: same('$(x+2)(x+3)=x^{2}+5x+6$') }
        ],
        examplePrompt: say('Kalkulatu $(2x-3)(x^{2}+x-1)$.', 'Calcula $(2x-3)(x^{2}+x-1)$.', 'احسب $(2x-3)(x^{2}+x-1)$.', 'Calculate $(2x-3)(x^{2}+x-1)$.'),
        example: same('$\\begin{aligned}&(2x-3)(x^{2}+x-1)\\\\ &=2x^{3}-x^{2}-5x+3\\end{aligned}$'),
        exampleAnswer: say('Sei biderkadura (2 bider 3) elkartu aurretik; maila 3 da.', 'Seis productos (2 por 3) antes de agrupar; el grado es 3.', 'ستة جداءات (2 في 3) قبل الجمع؛ والدرجة 3.', 'Six products (2 times 3) before grouping; the degree is 3.')
    },
    identities: {
        vocabulary: [
            say('karratua', 'cuadrado', 'مربع', 'square'),
            say('biderkaduraren bikoitza', 'doble del producto', 'ضعف الجداء', 'twice the product'),
            say('faktorizatu', 'factorizar', 'التحليل', 'factorise')
        ],
        explanation: say(
            'Hiru biderkadura hain ohikoak dira, ezen buruz ikasten baitira. Alderantziz ere erabiltzen dira, faktorizatzeko: $x^{2}-9=(x+3)(x-3)$.',
            'Tres productos son tan frecuentes que se aprenden de memoria. También se usan al revés, para factorizar: $x^{2}-9=(x+3)(x-3)$.',
            'ثلاثة جداءات شائعة جدًا تُحفظ عن ظهر قلب. وتُستعمل أيضًا بالعكس للتحليل: $x^{2}-9=(x+3)(x-3)$.',
            'Three products are so common that you learn them by heart. They are also used the other way round, to factorise: $x^{2}-9=(x+3)(x-3)$.'
        ),
        cases: [
            { title: say('Batura baten karratua', 'Cuadrado de una suma', 'مربع المجموع', 'Square of a sum'), text: say('Lehenengoaren karratua, gehi biderkaduraren bikoitza, gehi bigarrenaren karratua.', 'El cuadrado del primero, más el doble del producto, más el cuadrado del segundo.', 'مربع الأول زائد ضعف الجداء زائد مربع الثاني.', 'The first squared, plus twice the product, plus the second squared.'), math: same('$(a+b)^{2}=a^{2}+2ab+b^{2}$') },
            { title: say('Kendura baten karratua', 'Cuadrado de una diferencia', 'مربع الفرق', 'Square of a difference'), text: say('Berdin, baina biderkaduraren bikoitza kentzen da.', 'Igual, pero el doble del producto resta.', 'كذلك، لكن ضعف الجداء يُطرح.', 'The same, but twice the product is subtracted.'), math: same('$(a-b)^{2}=a^{2}-2ab+b^{2}$') },
            { title: say('Batura bider kendura', 'Suma por diferencia', 'المجموع في الفرق', 'Sum times difference'), text: say('Karratuen kendura.', 'Diferencia de cuadrados.', 'فرق مربعين.', 'A difference of squares.'), math: same('$(a+b)(a-b)=a^{2}-b^{2}$') }
        ],
        why: {
            text: say(
                'Marrazkian, $a+b$ aldeko karratua lau zatitan banatzen da: $a^{2}$ karratu bat, $b^{2}$ beste bat eta $ab$ bi laukizuzen. Horregatik $(a+b)^{2}$ ez da $a^{2}+b^{2}$: bi laukizuzenak falta dira, $2ab$.',
                'En el dibujo, el cuadrado de lado $a+b$ se parte en cuatro trozos: un cuadrado $a^{2}$, otro $b^{2}$ y dos rectángulos $ab$. Por eso $(a+b)^{2}$ no es $a^{2}+b^{2}$: faltan los dos rectángulos, $2ab$.',
                'في الرسم ينقسم المربع الذي ضلعه $a+b$ إلى أربع قطع: مربع $a^{2}$ وآخر $b^{2}$ ومستطيلان $ab$. لذلك $(a+b)^{2}$ ليس $a^{2}+b^{2}$: ينقص المستطيلان $2ab$.',
                'In the drawing, the square with side $a+b$ splits into four pieces: a square $a^{2}$, another $b^{2}$ and two rectangles $ab$. That is why $(a+b)^{2}$ is not $a^{2}+b^{2}$: the two rectangles, $2ab$, are missing.'
            ),
            math: same('$(3+2)^{2}=25=9+12+4$')
        },
        examplePrompt: say('Garatu $(2x+5)^{2}$ eta $(x-4)(x+4)$.', 'Desarrolla $(2x+5)^{2}$ y $(x-4)(x+4)$.', 'انشر $(2x+5)^{2}$ و$(x-4)(x+4)$.', 'Expand $(2x+5)^{2}$ and $(x-4)(x+4)$.'),
        example: same('$\\begin{gathered}(2x+5)^{2}=4x^{2}+20x+25\\\\ (x-4)(x+4)=x^{2}-16\\end{gathered}$'),
        exampleAnswer: say('Biderkaduraren bikoitza: $2\\cdot 2x\\cdot 5=20x$.', 'El doble del producto: $2\\cdot 2x\\cdot 5=20x$.', 'ضعف الجداء: $2\\cdot 2x\\cdot 5=20x$.', 'Twice the product: $2\\cdot 2x\\cdot 5=20x$.')
    },
    /* ---------- 3. Division ---------- */
    'long-division': {
        vocabulary: [
            say('zatikizuna', 'dividendo', 'المقسوم', 'dividend'),
            say('zatitzailea', 'divisor', 'المقسوم عليه', 'divisor'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('hondarra', 'resto', 'الباقي', 'remainder')
        ],
        explanation: say(
            'Zenbakiekin bezala: zatitu zatikizunaren lehen gaia zatitzailearen lehenengoaz, biderkatu zatitzailea emaitzaz, kendu, eta jarraitu hondarraren maila zatitzailearena baino txikiagoa izan arte. Zatikizunean gai bat falta bada, utzi haren hutsunea.',
            'Como con números: divide el primer término del dividendo entre el primero del divisor, multiplica el divisor por el resultado, réstalo y sigue hasta que el resto tenga grado menor que el divisor. Si en el dividendo falta un término, deja su hueco.',
            'كما في الأعداد: اقسم أول حد في المقسوم على أول حد في المقسوم عليه، واضرب المقسوم عليه في الناتج، واطرحه، وتابع حتى تصير درجة الباقي أصغر من درجة المقسوم عليه. وإذا نقص حد في المقسوم فاترك مكانه فارغًا.',
            'As with numbers: divide the first term of the dividend by the first term of the divisor, multiply the divisor by the result, subtract and carry on until the remainder has a lower degree than the divisor. If a term is missing in the dividend, leave a gap.'
        ),
        cases: [
            { title: say('Marrazkiko zatiketa', 'La división del dibujo', 'قسمة الرسم', 'The division in the drawing'), text: say('$(3x^{2}-11x+5)\\div(x+6)$: zatidura $3x-29$ eta hondarra 179.', '$(3x^{2}-11x+5)\\div(x+6)$: cociente $3x-29$ y resto 179.', '$(3x^{2}-11x+5)\\div(x+6)$: خارج القسمة $3x-29$ والباقي 179.', '$(3x^{2}-11x+5)\\div(x+6)$: quotient $3x-29$ and remainder 179.') },
            { title: say('Egiaztatu', 'Comprueba', 'تحقّق', 'Check'), text: say('Zatikizuna = zatitzailea · zatidura + hondarra.', 'Dividendo = divisor · cociente + resto.', 'المقسوم = المقسوم عليه · خارج القسمة + الباقي.', 'Dividend = divisor · quotient + remainder.'), math: same('$3x^{2}-11x+5=(x+6)(3x-29)+179$') }
        ],
        examplePrompt: say('Zatitu $(2x^{2}+7x+1)\\div(x+3)$.', 'Divide $(2x^{2}+7x+1)\\div(x+3)$.', 'اقسم $(2x^{2}+7x+1)\\div(x+3)$.', 'Divide $(2x^{2}+7x+1)\\div(x+3)$.'),
        example: same('$2x^{2}+7x+1=(x+3)(2x+1)-2$'),
        exampleAnswer: say('Zatidura $2x+1$ da eta hondarra $-2$.', 'Cociente $2x+1$ y resto $-2$.', 'خارج القسمة $2x+1$ والباقي $-2$.', 'Quotient $2x+1$ and remainder $-2$.')
    },
    ruffini: {
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('hondarra', 'resto', 'الباقي', 'remainder')
        ],
        explanation: say(
            'Zatitzailea $x-a$ motakoa denean, zatiketa koefizienteekin bakarrik egiten da: idatzi guztiak (0 falta den gaiaren tokian) eta $a$ ezkerrean. Azken zenbakia hondarra da, eta besteak, zatiduraren koefizienteak, maila bat gutxiagorekin. Kontuz: zatitzailea $x+3$ bada, $a=-3$.',
            'Si el divisor es $x-a$, la división se hace solo con los coeficientes: escríbelos todos (0 donde falte un término) y $a$ a la izquierda. El último número es el resto, y los demás, los coeficientes del cociente, de un grado menos. Cuidado: si el divisor es $x+3$, $a=-3$.',
            'إذا كان المقسوم عليه $x-a$ نقسم بالمعاملات فقط: اكتبها كلها (0 مكان الحد الناقص) و$a$ على اليسار. آخر عدد هو الباقي، والبقية معاملات خارج القسمة بدرجة أقل بواحد. انتبه: إذا كان المقسوم عليه $x+3$ فإن $a=-3$.',
            'If the divisor is $x-a$, the division is done with the coefficients only: write them all (0 where a term is missing) and $a$ on the left. The last number is the remainder, and the others are the coefficients of the quotient, one degree lower. Careful: if the divisor is $x+3$, $a=-3$.'
        ),
        cases: [
            { title: say('Jaitsi', 'Baja', 'أنزل', 'Bring down'), text: say('Lehen koefizientea dagoen bezala jaisten da.', 'El primer coeficiente baja tal cual.', 'ينزل المعامل الأول كما هو.', 'The first coefficient comes down as it is.') },
            { title: say('Biderkatu eta batu', 'Multiplica y suma', 'اضرب واجمع', 'Multiply and add'), text: say('Bider $a$, hurrengoaren azpian, eta batu. Marrazkian, $x-5$ zatitzailearekin:', 'Por $a$, bajo el siguiente, y suma. En el dibujo, con $x-5$:', 'في $a$، تحت التالي، ثم اجمع. في الرسم مع $x-5$:', 'Times $a$, under the next one, and add. In the drawing, with $x-5$:'), math: same('$1\\cdot 5-7=-2$') }
        ],
        examplePrompt: say('Ruffinirekin: $(x^{3}-4x^{2}+x+6)\\div(x-2)$.', 'Con Ruffini: $(x^{3}-4x^{2}+x+6)\\div(x-2)$.', 'بقاعدة روفيني: $(x^{3}-4x^{2}+x+6)\\div(x-2)$.', 'With Ruffini: $(x^{3}-4x^{2}+x+6)\\div(x-2)$.'),
        example: same('$\\begin{gathered}1\\cdot 2-4=-2\\qquad -2\\cdot 2+1=-3\\\\ -3\\cdot 2+6=0\\end{gathered}$'),
        exampleAnswer: say('Zatidura $x^{2}-2x-3$ eta hondarra 0: zatiketa zehatza da.', 'Cociente $x^{2}-2x-3$ y resto 0: la división es exacta.', 'خارج القسمة $x^{2}-2x-3$ والباقي 0: القسمة تامة.', 'Quotient $x^{2}-2x-3$ and remainder 0: the division is exact.')
    },
    remainder: {
        vocabulary: [
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('zenbakizko balioa', 'valor numérico', 'القيمة العددية', 'value'),
            say('zehatza', 'exacta', 'تامة', 'exact')
        ],
        explanation: say(
            '$P(x)$ polinomioa $x-a$ binomioaz zatitzean geratzen den hondarra polinomioaren balioa da $x=a$ denean: $P(a)$. Horrela, hondarra zatitu gabe jakiten da, eta alderantziz: $P(7)=54$ bada, $x-7$ binomioaz zatitzean hondarra 54 da.',
            'El resto de dividir $P(x)$ entre $x-a$ es el valor del polinomio para $x=a$: $P(a)$. Así se sabe el resto sin dividir, y al revés: si $P(7)=54$, el resto de dividir entre $x-7$ es 54.',
            'باقي قسمة $P(x)$ على $x-a$ هو قيمة الحدودية عندما $x=a$: أي $P(a)$. هكذا نعرف الباقي دون قسمة، وبالعكس: إذا كان $P(7)=54$ فباقي القسمة على $x-7$ هو 54.',
            'The remainder when $P(x)$ is divided by $x-a$ is the value of the polynomial at $x=a$: $P(a)$. So you know the remainder without dividing, and the other way round: if $P(7)=54$, the remainder when dividing by $x-7$ is 54.'
        ),
        why: {
            text: say(
                'Zatitzean, $P(x)=(x-a)\\cdot C(x)+R$. $x$ letraren ordez $a$ jartzen bada, $(a-a)$ parentesia 0 da eta biderkadura desagertu egiten da: $P(a)=R$ geratzen da. Marrazkian, $M(4)=20$, Ruffinik ematen duen hondarra.',
                'Al dividir, $P(x)=(x-a)\\cdot C(x)+R$. Si se pone $a$ en lugar de $x$, el paréntesis $(a-a)$ vale 0 y el producto desaparece: queda $P(a)=R$. En el dibujo, $M(4)=20$, el resto que da Ruffini.',
                'عند القسمة $P(x)=(x-a)\\cdot C(x)+R$. وإذا وضعنا $a$ مكان $x$ صار القوس $(a-a)$ صفرًا واختفى الجداء: يبقى $P(a)=R$. في الرسم $M(4)=20$، وهو الباقي الذي يعطيه روفيني.',
                'When you divide, $P(x)=(x-a)\\cdot C(x)+R$. If you put $a$ in place of $x$, the bracket $(a-a)$ is 0 and the product disappears: $P(a)=R$ is left. In the drawing, $M(4)=20$, the remainder Ruffini gives.'
            ),
            math: same('$\\begin{aligned}P(a)&=(a-a)\\cdot C(a)+R\\\\ &=0+R=R\\end{aligned}$')
        },
        examplePrompt: say('Zein da $(x^{3}+2x-1)\\div(x-3)$ zatiketaren hondarra?', '¿Cuál es el resto de $(x^{3}+2x-1)\\div(x-3)$?', 'ما باقي $(x^{3}+2x-1)\\div(x-3)$؟', 'What is the remainder of $(x^{3}+2x-1)\\div(x-3)$?'),
        example: same('$P(3)=27+6-1=32$'),
        exampleAnswer: say('Hondarra 32 da, zatiketa egin gabe.', 'El resto es 32, sin hacer la división.', 'الباقي 32 دون إجراء القسمة.', 'The remainder is 32, without doing the division.')
    },
    /* ---------- 4. Factorising ---------- */
    roots: {
        definitions: [
            {
                term: say('Polinomio baten erroa', 'Raíz de un polinomio', 'جذر الحدودية', 'Root of a polynomial'),
                meaning: say('$a$ zenbaki bat, $P(a)=0$ betetzen duena. Orduan $x-a$ faktore bat da, eta $x-a$ binomioaz zatitzea zehatza da.', 'Un número $a$ con $P(a)=0$. Entonces $x-a$ es un factor y la división entre $x-a$ es exacta.', 'عدد $a$ يحقق $P(a)=0$. عندئذ يكون $x-a$ عاملًا وتكون القسمة على $x-a$ تامة.', 'A number $a$ with $P(a)=0$. Then $x-a$ is a factor and dividing by $x-a$ is exact.')
            }
        ],
        vocabulary: [
            say('zatitzaileak', 'divisores', 'قواسم', 'divisors'),
            say('faktorea', 'factor', 'عامل', 'factor'),
            say('gai askea', 'término independiente', 'الحد الثابت', 'constant term')
        ],
        explanation: say(
            'Koefiziente osoko polinomio baten erro osoak gai askearen zatitzaileak dira: $x^{3}-6x^{2}+11x-6$ polinomioarenak $\\pm 1$, $\\pm 2$, $\\pm 3$ eta $\\pm 6$ zenbakien artean daude, eta Ruffinirekin edo $P(a)$ kalkulatuz probatzen dira. Gai askerik ez badago, $x=0$ erroa da.',
            'Las raíces enteras de un polinomio de coeficientes enteros son divisores del término independiente: las de $x^{3}-6x^{2}+11x-6$ están entre $\\pm 1$, $\\pm 2$, $\\pm 3$ y $\\pm 6$, y se prueban con Ruffini o calculando $P(a)$. Si no hay término independiente, $x=0$ es raíz.',
            'الجذور الصحيحة لحدودية معاملاتها صحيحة هي قواسم الحد الثابت: جذور $x^{3}-6x^{2}+11x-6$ بين $\\pm 1$ و$\\pm 2$ و$\\pm 3$ و$\\pm 6$، ونجرّبها بروفيني أو بحساب $P(a)$. وإذا لم يوجد حد ثابت فإن $x=0$ جذر.',
            'The whole-number roots of a polynomial with whole coefficients are divisors of the constant term: those of $x^{3}-6x^{2}+11x-6$ are among $\\pm 1$, $\\pm 2$, $\\pm 3$ and $\\pm 6$, and you try them with Ruffini or by working out $P(a)$. If there is no constant term, $x=0$ is a root.'
        ),
        why: {
            text: say(
                '$a$ erroa bada, $P(x)=(x-a)\\cdot C(x)$. Biderkadura horren gai askea $-a$ bider $C(x)$ polinomioaren gai askea da: horregatik zatitzen du $a$ zenbakiak. Marrazkian:',
                'Si $a$ es raíz, $P(x)=(x-a)\\cdot C(x)$. El término independiente de ese producto es $-a$ por el término independiente de $C(x)$: por eso $a$ lo divide. En el dibujo:',
                'إذا كان $a$ جذرًا فإن $P(x)=(x-a)\\cdot C(x)$. والحد الثابت لهذا الجداء هو $-a$ في الحد الثابت لـ$C(x)$: لذلك يقسمه $a$. في الرسم:',
                'If $a$ is a root, $P(x)=(x-a)\\cdot C(x)$. The constant term of that product is $-a$ times the constant term of $C(x)$: that is why $a$ divides it. In the drawing:'
            ),
            math: same('$\\begin{gathered}(x-1)(x-2)(x-3)\\\\ (-1)\\cdot(-2)\\cdot(-3)=-6\\end{gathered}$')
        },
        examplePrompt: say('2 erroa al da $x^{3}-3x^{2}+4$ polinomioarena?', '¿Es 2 raíz de $x^{3}-3x^{2}+4$?', 'هل 2 جذر لـ$x^{3}-3x^{2}+4$؟', 'Is 2 a root of $x^{3}-3x^{2}+4$?'),
        example: same('$P(2)=8-12+4=0$'),
        exampleAnswer: say('Bai: $P(2)=0$; beraz, $x-2$ faktore bat da.', 'Sí: $P(2)=0$, así que $x-2$ es un factor.', 'نعم: $P(2)=0$، إذن $x-2$ عامل.', 'Yes: $P(2)=0$, so $x-2$ is a factor.')
    },
    'common-factor': {
        vocabulary: [
            say('faktorizatu', 'factorizar', 'التحليل', 'factorise'),
            say('faktore komuna', 'factor común', 'العامل المشترك', 'common factor'),
            say('biderkadura', 'producto', 'جداء', 'product')
        ],
        explanation: say(
            'Faktorizatzea polinomioa biderkadura gisa idaztea da. Lehenik, beti, faktore komuna ateratzen da: koefizienteen ZKH eta letra komunak berretzaile txikienarekin. Gero, begiratu parentesia identitate nabarmen bat den.',
            'Factorizar es escribir un polinomio como un producto. Primero, siempre, se saca factor común: el m.c.d. de los coeficientes y las letras comunes con el menor exponente. Después, mira si el paréntesis es una igualdad notable.',
            'التحليل هو كتابة الحدودية جداءً. أولًا دائمًا نُخرج العامل المشترك: ق.م.أ للمعاملات والحروف المشتركة بأصغر أس. ثم انظر هل ما بين القوسين متطابقة شهيرة.',
            'Factorising is writing a polynomial as a product. First, always, take out the common factor: the GCD of the coefficients and the common letters with the lowest exponent. Then see whether the bracket is an algebraic identity.'
        ),
        cases: [
            { title: say('Faktore komuna', 'Factor común', 'العامل المشترك', 'Common factor'), text: say('Marrazkian bezala.', 'Como en el dibujo.', 'كما في الرسم.', 'As in the drawing.'), math: same('$3x+6=3(x+2)$') },
            { title: say('Karratuen kendura', 'Diferencia de cuadrados', 'فرق مربعين', 'Difference of squares'), text: say('Faktore komunaren ondoren, batura bider kendura.', 'Tras el factor común, suma por diferencia.', 'بعد العامل المشترك، المجموع في الفرق.', 'After the common factor, sum times difference.'), math: same('$3x^{4}-12x^{2}=3x^{2}(x+2)(x-2)$') },
            { title: say('Karratu perfektua', 'Cuadrado perfecto', 'مربع كامل', 'Perfect square'), text: say('Muturrak karratuak dira, eta erdikoa haien oinarrien biderkaduraren bikoitza.', 'Los extremos son cuadrados y el del medio, el doble del producto de sus bases.', 'الطرفان مربعان والأوسط ضعف جداء أساسيهما.', 'The ends are squares and the middle is twice the product of their bases.'), math: same('$x^{3}+6x^{2}+9x=x(x+3)^{2}$') }
        ],
        examplePrompt: say('Deskonposatu $5x^{3}-20x$.', 'Descompón $5x^{3}-20x$.', 'حلّل $5x^{3}-20x$.', 'Factorise $5x^{3}-20x$.'),
        example: same('$\\begin{aligned}5x^{3}-20x&=5x(x^{2}-4)\\\\ &=5x(x+2)(x-2)\\end{aligned}$'),
        exampleAnswer: say('$5x$ faktore komuna, eta gero batura bider kendura.', 'Factor común $5x$ y después suma por diferencia.', 'العامل المشترك $5x$ ثم المجموع في الفرق.', 'Common factor $5x$ and then sum times difference.')
    },
    factorize: {
        vocabulary: [
            say('erroa', 'raíz', 'الجذر', 'root'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient'),
            say('faktorea', 'factor', 'العامل', 'factor')
        ],
        explanation: say(
            'Faktore komuna atera ondoren, bilatu erro oso bat gai askearen zatitzaileen artean eta zatitu Ruffinirekin. Hondarra 0 bada, $x-a$ faktorea duzu, eta zatidurarekin jarraitzen da. 2 mailako zatidura batek errorik ez badu, ezin da gehiago deskonposatu. Egiaztatu biderkatuz.',
            'Tras sacar factor común, busca una raíz entera entre los divisores del término independiente y divide con Ruffini. Si el resto es 0, ya tienes el factor $x-a$, y se sigue con el cociente. Si un cociente de grado 2 no tiene raíces, no se descompone más. Comprueba multiplicando.',
            'بعد إخراج العامل المشترك ابحث عن جذر صحيح بين قواسم الحد الثابت واقسم بروفيني. إذا كان الباقي 0 فقد حصلت على العامل $x-a$، وتتابع مع خارج القسمة. وإذا لم يكن لخارج قسمة من الدرجة 2 جذور فلا يُحلَّل أكثر. تحقّق بالضرب.',
            'After taking out the common factor, look for a whole-number root among the divisors of the constant term and divide with Ruffini. If the remainder is 0, you have the factor $x-a$, and you carry on with the quotient. If a quotient of degree 2 has no roots, it cannot be broken down further. Check by multiplying.'
        ),
        cases: [
            { title: say('Bukaeraraino', 'Hasta el final', 'حتى النهاية', 'All the way'), text: say('Marrazkiko polinomioa: 1, 2 eta 3 erroak.', 'El polinomio del dibujo: raíces 1, 2 y 3.', 'حدودية الرسم: الجذور 1 و2 و3.', 'The polynomial in the drawing: roots 1, 2 and 3.'), math: same('$x^{3}-6x^{2}+11x-6=(x-1)(x-2)(x-3)$') },
            { title: say('Erro errepikatua', 'Raíz repetida', 'جذر مكرر', 'Repeated root'), text: say('Erro bat behin baino gehiagotan ager daiteke.', 'Una raíz puede salir más de una vez.', 'قد يتكرر الجذر أكثر من مرة.', 'A root can come up more than once.'), math: same('$x^{3}+3x^{2}+3x+1=(x+1)^{3}$') },
            { title: say('Errorik gabe', 'Sin más raíces', 'دون جذور أخرى', 'No more roots'), text: say('$x^{2}+x+1$ zatidurak ez du errorik: hor gelditzen da.', 'El cociente $x^{2}+x+1$ no tiene raíces: se queda así.', 'خارج القسمة $x^{2}+x+1$ لا جذور له: يبقى كما هو.', 'The quotient $x^{2}+x+1$ has no roots: it stays as it is.'), math: same('$x^{3}-x^{2}-x-2=(x-2)(x^{2}+x+1)$') }
        ],
        examplePrompt: say('Faktorizatu $x^{3}-7x+6$.', 'Factoriza $x^{3}-7x+6$.', 'حلّل $x^{3}-7x+6$.', 'Factorise $x^{3}-7x+6$.'),
        example: same('$\\begin{aligned}&x^{3}-7x+6\\\\ &=(x-1)(x^{2}+x-6)\\\\ &=(x-1)(x-2)(x+3)\\end{aligned}$'),
        exampleAnswer: say('1 erroa da; $x^{2}+x-6$ zatiduraren erroak 2 eta $-3$ dira.', '1 es raíz; el cociente $x^{2}+x-6$ tiene raíces 2 y $-3$.', '1 جذر؛ وجذرا خارج القسمة $x^{2}+x-6$ هما 2 و$-3$.', '1 is a root; the quotient $x^{2}+x-6$ has roots 2 and $-3$.')
    },
    /* ---------- 5. Algebraic expressions ---------- */
    'algebraic-fractions': {
        definitions: [
            {
                term: say('Zatiki aljebraikoa', 'Fracción algebraica', 'الكسر الجبري', 'Algebraic fraction'),
                meaning: say('Bi polinomioren zatidura, $\\frac{x+1}{x^{2}}$ bezala.', 'El cociente de dos polinomios, como $\\frac{x+1}{x^{2}}$.', 'خارج قسمة حدوديتين، مثل $\\frac{x+1}{x^{2}}$.', 'The quotient of two polynomials, like $\\frac{x+1}{x^{2}}$.')
            }
        ],
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('sinplifikatu', 'simplificar', 'بسّط', 'simplify')
        ],
        explanation: say(
            'Sinplifikatzeko, faktorizatu zenbakitzailea eta izendatzailea eta ezabatu faktore komunak: $\\frac{x^{3}+5x^{2}}{x^{2}+5x}=\\frac{x^{2}(x+5)}{x(x+5)}=x$. Batugaiak ez dira inoiz ezabatzen, faktoreak bakarrik. Batzeko, izendatzaile komun bat bilatzen da, zenbakiekin bezala.',
            'Para simplificar, factoriza el numerador y el denominador y elimina los factores comunes: $\\frac{x^{3}+5x^{2}}{x^{2}+5x}=\\frac{x^{2}(x+5)}{x(x+5)}=x$. Nunca se eliminan sumandos, solo factores. Para sumar, se busca un denominador común, como con números.',
            'للتبسيط حلّل البسط والمقام واحذف العوامل المشتركة: $\\frac{x^{3}+5x^{2}}{x^{2}+5x}=\\frac{x^{2}(x+5)}{x(x+5)}=x$. لا نحذف أبدًا حدود المجموع، بل العوامل فقط. وللجمع نبحث عن مقام مشترك كما في الأعداد.',
            'To simplify, factorise the numerator and the denominator and cancel the common factors: $\\frac{x^{3}+5x^{2}}{x^{2}+5x}=\\frac{x^{2}(x+5)}{x(x+5)}=x$. Terms being added never cancel, only factors. To add, look for a common denominator, as with numbers.'
        ),
        why: {
            text: say(
                'Probatu zenbakiekin, $x=2$ denean: $\\frac{x+5}{5}$ zatikiak $\\frac{7}{5}$ ematen du, ez 2. Aldiz, $\\frac{2\\cdot 5}{5}=2$: faktore bat bai, ken daiteke.',
                'Prueba con números, para $x=2$: $\\frac{x+5}{5}$ da $\\frac{7}{5}$, no 2. En cambio, $\\frac{2\\cdot 5}{5}=2$: un factor sí se puede quitar.',
                'جرّب بالأعداد عندما $x=2$: $\\frac{x+5}{5}$ يساوي $\\frac{7}{5}$ لا 2. أما $\\frac{2\\cdot 5}{5}=2$: فالعامل يمكن حذفه.',
                'Try it with numbers, for $x=2$: $\\frac{x+5}{5}$ gives $\\frac{7}{5}$, not 2. But $\\frac{2\\cdot 5}{5}=2$: a factor can be taken away.'
            ),
            math: same('$\\frac{2+5}{5}=\\frac{7}{5}\\qquad \\frac{2\\cdot 5}{5}=2$')
        },
        examplePrompt: say('Sinplifikatu $\\frac{x^{2}-9}{2x+6}$.', 'Simplifica $\\frac{x^{2}-9}{2x+6}$.', 'بسّط $\\frac{x^{2}-9}{2x+6}$.', 'Simplify $\\frac{x^{2}-9}{2x+6}$.'),
        example: same('$\\frac{x^{2}-9}{2x+6}=\\frac{(x+3)(x-3)}{2(x+3)}=\\frac{x-3}{2}$'),
        exampleAnswer: say('$x+3$ faktorea ezabatzen da, goian eta behean baitago.', 'Se elimina el factor $x+3$, que está arriba y abajo.', 'نحذف العامل $x+3$ الموجود في الأعلى والأسفل.', 'The factor $x+3$ cancels: it is on top and at the bottom.')
    },
    simplify: {
        vocabulary: [
            say('parentesiak', 'paréntesis', 'الأقواس', 'brackets'),
            say('m.k.t.', 'm.c.m.', 'المضاعف المشترك الأصغر', 'LCM'),
            say('antzekoak', 'semejantes', 'المتشابهة', 'like terms')
        ],
        explanation: say(
            'Ekuazio bat ebatzi aurretik, bi aldeak sinplifikatzen dira: parentesiak kendu (minus baten atzean zeinuak aldatuz), identitateak garatu eta antzekoak elkartu. Izendatzaileak badaude, dena haien m.k.t. zenbakiaz biderkatzen da, gaiz gai.',
            'Antes de resolver una ecuación se simplifican sus dos miembros: se quitan paréntesis (cambiando signos tras un menos), se desarrollan las identidades y se agrupan semejantes. Si hay denominadores, se multiplica todo por su m.c.m., término a término.',
            'قبل حل المعادلة نبسّط طرفيها: نزيل الأقواس (مع تغيير الإشارات بعد الناقص)، وننشر المتطابقات، ونجمع المتشابهة. وإذا وُجدت مقامات نضرب كل شيء في المضاعف المشترك الأصغر لها، حدًّا حدًّا.',
            'Before solving an equation, you simplify both sides: remove brackets (changing signs after a minus), expand the identities and group like terms. If there are denominators, multiply everything by their LCM, term by term.'
        ),
        cases: [
            { title: say('Parentesiak eta identitateak', 'Paréntesis e identidades', 'الأقواس والمتطابقات', 'Brackets and identities'), text: say('Marrazkikoa bezala.', 'Como el del dibujo.', 'كالذي في الرسم.', 'Like the one in the drawing.'), math: same('$(x-1)(x+1)+(x-2)^{2}-3=2x^{2}-4x$') },
            { title: say('Izendatzaileak', 'Denominadores', 'المقامات', 'Denominators'), text: say('Gai bakoitza bider m.k.t.; zatiki baten aurreko minusak zenbakitzaile osoari eragiten dio.', 'Cada término por el m.c.m.; un menos delante de una fracción afecta a todo el numerador.', 'كل حد في المضاعف المشترك الأصغر؛ والناقص أمام كسر يؤثر في البسط كله.', 'Each term times the LCM; a minus in front of a fraction affects the whole numerator.'), math: same('$4\\cdot\\left(\\frac{x}{2}-\\frac{x+3}{4}\\right)=2x-(x+3)=x-3$') }
        ],
        examplePrompt: say('Sinplifikatu $2(x+3)-(x-1)^{2}$.', 'Simplifica $2(x+3)-(x-1)^{2}$.', 'بسّط $2(x+3)-(x-1)^{2}$.', 'Simplify $2(x+3)-(x-1)^{2}$.'),
        example: same('$\\begin{aligned}&2(x+3)-(x-1)^{2}\\\\ &=2x+6-x^{2}+2x-1\\\\ &=-x^{2}+4x+5\\end{aligned}$'),
        exampleAnswer: say('Minusak karratuaren hiru zeinuak aldatzen ditu: $-(x^{2}-2x+1)$.', 'El menos cambia los tres signos del cuadrado: $-(x^{2}-2x+1)$.', 'الناقص يغيّر إشارات المربع الثلاث: $-(x^{2}-2x+1)$.', 'The minus changes all three signs of the square: $-(x^{2}-2x+1)$.')
    },
    problems: {
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('adierazpena', 'expresión', 'العبارة', 'expression'),
            say('zenbakizko balioa', 'valor numérico', 'القيمة العددية', 'value')
        ],
        explanation: say(
            'Problema askotan magnitude bat beste baten funtzioan adierazten da. Urratsak: ezezagunari izena eman, adierazpena idatzi, sinplifikatu eta, behar bada, haren zenbakizko balioa kalkulatu.',
            'En muchos problemas una magnitud se expresa en función de otra. Los pasos: nombrar la incógnita, escribir la expresión, simplificarla y, si hace falta, calcular su valor numérico.',
            'في مسائل كثيرة نعبّر عن مقدار بدلالة آخر. الخطوات: تسمية المجهول، وكتابة العبارة، وتبسيطها، وحساب قيمتها العددية عند الحاجة.',
            'In many problems one quantity is written in terms of another. The steps: name the unknown, write the expression, simplify it and, if needed, work out its value.'
        ),
        cases: [
            { title: say('Laukizuzena', 'Rectángulo', 'مستطيل', 'Rectangle'), text: say('200 m-ko perimetroa: alde bat $x$ bada, bestea $100-x$ da.', 'Perímetro de 200 m: si un lado mide $x$, el otro mide $100-x$.', 'محيطه 200 م: إذا كان أحد الضلعين $x$ فالآخر $100-x$.', 'Perimeter 200 m: if one side is $x$, the other is $100-x$.'), math: same('$A=x(100-x)=100x-x^{2}$') },
            { title: say('Triangelu angeluzuzena', 'Triángulo rectángulo', 'مثلث قائم', 'Right-angled triangle'), text: say('$x$ eta $x+5$ katetoak: hipotenusaren karratua.', 'Catetos $x$ y $x+5$: el cuadrado de la hipotenusa.', 'الضلعان القائمان $x$ و$x+5$: مربع الوتر.', 'Legs $x$ and $x+5$: the square of the hypotenuse.'), math: same('$x^{2}+(x+5)^{2}=2x^{2}+10x+25$') }
        ],
        examplePrompt: say('Zenbaki bat beste bat, $x$, baino 3 unitate handiagoa da. Adierazi haien biderkadura eta kalkulatu $x=7$ denean.', 'Un número es 3 unidades mayor que otro, $x$. Expresa su producto y calcúlalo para $x=7$.', 'عدد أكبر من عدد آخر $x$ بثلاث وحدات. عبّر عن جدائهما واحسبه عندما $x=7$.', 'One number is 3 more than another, $x$. Write their product and work it out for $x=7$.'),
        example: same('$\\begin{gathered}x(x+3)=x^{2}+3x\\\\ 49+21=70\\end{gathered}$'),
        exampleAnswer: say('$x=7$ denean, biderkadura 70 da ($7\\cdot 10$).', 'Para $x=7$, el producto es 70 ($7\\cdot 10$).', 'عندما $x=7$ يكون الجداء 70 ($7\\cdot 10$).', 'For $x=7$, the product is 70 ($7\\cdot 10$).')
    }
}

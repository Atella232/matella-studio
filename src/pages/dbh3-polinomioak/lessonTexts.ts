import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'
import type { PolynomialsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Polinomioak · 3. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, its cases, the example as an exercise («Another example»)
   and, in three lessons, «Why does it work?» (counting factors, the corner
   taken away twice, x = a in the division). Plain data so the tests can
   import it; lessons.tsx merges it into the topics. The explanations use
   the numbers of their drawings ((x + 2)(x + 3), 3x + 6 = 3(x + 2) and
   x³ − 6x² + 11x − 6 with roots 1, 2 and 3); the example uses numbers of its
   own, and every equality of letters in it is an identity (the test tries
   two sets of numbers). No text command inside the formulas (the unit test
   forbids it). Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const polynomialsLessonTexts: Record<PolynomialsTopicId, LessonTexts> = {
    expressions: {
        definitions: [
            {
                term: say('Adierazpen aljebraikoa', 'Expresión algebraica', 'العبارة الجبرية', 'Algebraic expression'),
                meaning: say('Eragiketekin lotutako zenbakiak eta letrak; letra ezagutzen ez den edo aldatzen den kopuru bat da.', 'Números y letras unidos con operaciones; la letra es una cantidad que no se conoce o que cambia.', 'أعداد وحروف تربطها عمليات؛ والحرف كمية مجهولة أو متغيرة.', 'Numbers and letters joined by operations; the letter is an amount you do not know or that changes.')
            }
        ],
        vocabulary: [
            say('letra', 'letra', 'الحرف', 'letter'),
            say('parentesia', 'paréntesis', 'القوسان', 'brackets'),
            say('hirukoitza', 'triple', 'ثلاثة أمثال', 'three times')
        ],
        explanation: say(
            'Letrak ezagutzen ez dugun edo aldatzen den kopuru bat adierazten du. «Zenbaki baten hirukoitza gehi 5» $3x+5$ da, eta «bi zenbaki jarraien batura», $x+(x+1)$. Ordena garrantzitsua da: «$x$ bider 2, gehi 3» $2x+3$ da, baina «$x$ gehi 3, dena bider 2», $2(x+3)$.',
            'La letra representa una cantidad que no conocemos o que cambia. «El triple de un número más 5» es $3x+5$, y «la suma de dos números consecutivos», $x+(x+1)$. El orden importa: «$x$ por 2, más 3» es $2x+3$, pero «$x$ más 3, todo por 2» es $2(x+3)$.',
            'يمثّل الحرف كمية لا نعرفها أو تتغيّر. «ثلاثة أمثال عدد زائد 5» هي $3x+5$، و«مجموع عددين متتاليين» $x+(x+1)$. والترتيب مهم: «$x$ في 2 زائد 3» هي $2x+3$، لكن «$x$ زائد 3، والكل في 2» هي $2(x+3)$ بالقوسين.',
            'The letter stands for an amount we do not know or that changes. «Three times a number plus 5» is $3x+5$, and «the sum of two consecutive numbers», $x+(x+1)$. Order matters: «$x$ times 2, plus 3» is $2x+3$, but «$x$ plus 3, all times 2» is $2(x+3)$, with brackets.'
        ),
        examplePrompt: say('Idatzi: «zenbaki baten erdia, gehi zenbaki horren bikoitza».', 'Escribe: «la mitad de un número, más el doble de ese número».', 'اكتب: «نصف عدد زائد ضعف هذا العدد».', 'Write: «half a number, plus twice that number».'),
        example: same('$\\frac{x}{2}+2x=\\frac{5x}{2}$'),
        exampleAnswer: say('$\\frac{x}{2}+2x$, eta laburtuta $\\frac{5x}{2}$.', '$\\frac{x}{2}+2x$, que se reduce a $\\frac{5x}{2}$.', '$\\frac{x}{2}+2x$، وبعد الاختصار $\\frac{5x}{2}$.', '$\\frac{x}{2}+2x$, which reduces to $\\frac{5x}{2}$.')
    },
    monomials: {
        definitions: [
            {
                term: say('Monomioa', 'Monomio', 'وحيد الحد', 'Monomial'),
                meaning: say('Zenbaki bat bider letren berreturak: $-5x^{2}y$ monomioan, $-5$ koefizientea da eta $x^{2}y$ zati literala.', 'Un número por potencias de letras: en $-5x^{2}y$, $-5$ es el coeficiente y $x^{2}y$, la parte literal.', 'عدد مضروب في قوى حروف: في $-5x^{2}y$ يكون $-5$ المعامل و$x^{2}y$ الجزء الحرفي.', 'A number times powers of letters: in $-5x^{2}y$, $-5$ is the coefficient and $x^{2}y$ the literal part.')
            },
            {
                term: say('Monomio antzekoak', 'Monomios semejantes', 'وحيدات الحد المتشابهة', 'Like terms'),
                meaning: say('Zati literal bera dutenak: $3x^{2}$ eta $-7x^{2}$.', 'Los que tienen la misma parte literal: $3x^{2}$ y $-7x^{2}$.', 'التي لها الجزء الحرفي نفسه: $3x^{2}$ و$-7x^{2}$.', 'Monomials with the same literal part: $3x^{2}$ and $-7x^{2}$.')
            }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('maila', 'grado', 'الدرجة', 'degree'),
            say('berretzaileak', 'exponentes', 'الأسس', 'exponents')
        ],
        explanation: say(
            'Monomio baten maila haren letren berretzaileen batura da: $-5x^{2}y$ monomioaren maila $2+1=3$ da. Eragiketak egiteko, bi arau daude:',
            'El grado de un monomio es la suma de los exponentes de sus letras: $-5x^{2}y$ tiene grado $2+1=3$. Para operar hay dos reglas:',
            'درجة وحيد الحد مجموع أسس حروفه: درجة $-5x^{2}y$ هي $2+1=3$. وللعمليات قاعدتان:',
            'The degree of a monomial is the sum of the exponents of its letters: $-5x^{2}y$ has degree $2+1=3$. There are two rules for working with them:'
        ),
        cases: [
            { title: say('Batu', 'Sumar', 'الجمع', 'Adding'), text: say('Antzekoak bakarrik; zati literala ez da aldatzen.', 'Solo semejantes; la parte literal no cambia.', 'المتشابهة فقط؛ الجزء الحرفي لا يتغيّر.', 'Like terms only; the literal part does not change.'), math: same('$5x+2x=7x$') },
            { title: say('Biderkatu', 'Multiplicar', 'الضرب', 'Multiplying'), text: say('Edozein bi monomio; berretzaileak batu.', 'Cualquier par; se suman los exponentes.', 'أي وحيدي حد؛ نجمع الأسس.', 'Any two; add the exponents.'), math: same('$5x\\cdot 2x=10x^{2}$') }
        ],
        examplePrompt: say('Laburtu $7a^{2}b-2ab+3a^{2}b$ eta biderkatu $(-2a)\\cdot 4a^{3}b$.', 'Reduce $7a^{2}b-2ab+3a^{2}b$ y multiplica $(-2a)\\cdot 4a^{3}b$.', 'اختصر $7a^{2}b-2ab+3a^{2}b$ واضرب $(-2a)\\cdot 4a^{3}b$.', 'Reduce $7a^{2}b-2ab+3a^{2}b$ and multiply $(-2a)\\cdot 4a^{3}b$.'),
        example: same('$7a^{2}b+3a^{2}b-2ab=10a^{2}b-2ab\\qquad(-2a)\\cdot 4a^{3}b=-8a^{4}b$'),
        exampleAnswer: say('$10a^{2}b-2ab$ eta $-8a^{4}b$: $a^{2}b$ eta $ab$ ez dira antzekoak.', '$10a^{2}b-2ab$ y $-8a^{4}b$: $a^{2}b$ y $ab$ no son semejantes.', '$10a^{2}b-2ab$ و$-8a^{4}b$: ‏$a^{2}b$ و$ab$ غير متشابهين.', '$10a^{2}b-2ab$ and $-8a^{4}b$: $a^{2}b$ and $ab$ are not like terms.'),
        why: {
            text: say(
                '$x^{2}\\cdot x^{3}$ hau da: $(x\\cdot x)\\cdot(x\\cdot x\\cdot x)$, bost $x$ biderkatuta. Faktoreak zenbatzea da: horregatik batzen dira berretzaileak. Batzean, ordea, $x^{2}+x^{3}$ ez da laburtzen.',
                '$x^{2}\\cdot x^{3}$ es $(x\\cdot x)\\cdot(x\\cdot x\\cdot x)$: cinco $x$ multiplicadas. Es contar factores: por eso se suman los exponentes. Al sumar, en cambio, $x^{2}+x^{3}$ no se reduce.',
                '$x^{2}\\cdot x^{3}$ هو $(x\\cdot x)\\cdot(x\\cdot x\\cdot x)$: خمسة عوامل كلها $x$. إنه عدّ للعوامل، ولذلك نجمع الأسس. أما عند الجمع فإن $x^{2}+x^{3}$ لا يُختصر.',
                '$x^{2}\\cdot x^{3}$ is $(x\\cdot x)\\cdot(x\\cdot x\\cdot x)$: five $x$ multiplied. It is counting factors: that is why the exponents are added. When adding, though, $x^{2}+x^{3}$ does not reduce.'
            ),
            math: same('$x^{2}\\cdot x^{3}=x^{5}$')
        }
    },
    value: {
        definitions: [
            {
                term: say('Polinomioa', 'Polinomio', 'كثير الحدود', 'Polynomial'),
                meaning: say('Monomioen batura. Haren maila monomio handienarena da, eta letrarik gabeko gaia gai askea da.', 'Una suma de monomios. Su grado es el del mayor monomio, y el término sin letra es el término independiente.', 'مجموع وحيدات حد. درجته درجة أكبرها، والحد الذي لا حرف فيه هو الحد الثابت.', 'A sum of monomials. Its degree is that of the biggest one, and the term with no letter is the constant term.')
            },
            {
                term: say('Zenbakizko balioa', 'Valor numérico', 'القيمة العددية', 'Value'),
                meaning: say('$P(a)$: $x$ letraren ordez $a$ jartzean ateratzen dena.', '$P(a)$: lo que sale al poner $a$ en lugar de $x$.', '$P(a)$: ما نحصل عليه عند وضع $a$ مكان $x$.', '$P(a)$: what you get by putting $a$ in place of $x$.')
            }
        ],
        vocabulary: [
            say('gai askea', 'término independiente', 'الحد الثابت', 'constant term'),
            say('parentesiak', 'paréntesis', 'الأقواس', 'brackets'),
            say('ordezkatu', 'sustituir', 'عوّض', 'substitute')
        ],
        explanation: say(
            '$P(x)=2x^{3}-5x+1$ polinomioan, maila 3 da eta gai askea 1. $P(a)$ kalkulatzeko, ordezkatu $x$ letra $a$ zenbakiaz; negatiboa bada, jarri parentesi artean: $P(-2)=2(-2)^{3}-5(-2)+1=-5$.',
            'En $P(x)=2x^{3}-5x+1$ el grado es 3 y el término independiente, 1. Para calcular $P(a)$, sustituye $x$ por $a$; si es negativo, ponlo entre paréntesis: $P(-2)=2(-2)^{3}-5(-2)+1=-5$.',
            'في $P(x)=2x^{3}-5x+1$ الدرجة 3 والحد الثابت 1. ولحساب $P(a)$ عوّض $x$ بالعدد $a$، وإذا كان سالبًا فضعه بين قوسين: $P(-2)=2(-2)^{3}-5(-2)+1=-5$.',
            'In $P(x)=2x^{3}-5x+1$ the degree is 3 and the constant term is 1. To work out $P(a)$, substitute $a$ for $x$; if it is negative, put it in brackets: $P(-2)=2(-2)^{3}-5(-2)+1=-5$.'
        ),
        examplePrompt: say('$Q(x)=x^{3}-4x^{2}+2$ bada, kalkulatu $Q(3)$ eta $Q(-1)$.', 'Si $Q(x)=x^{3}-4x^{2}+2$, calcula $Q(3)$ y $Q(-1)$.', 'إذا كان $Q(x)=x^{3}-4x^{2}+2$ فاحسب $Q(3)$ و$Q(-1)$.', 'If $Q(x)=x^{3}-4x^{2}+2$, work out $Q(3)$ and $Q(-1)$.'),
        example: same('$Q(3)=27-36+2=-7\\qquad Q(-1)=-1-4+2=-3$'),
        exampleAnswer: say('$Q(3)=-7$ eta $Q(-1)=-3$; $(-1)^{3}=-1$ eta $(-1)^{2}=1$ dira.', '$Q(3)=-7$ y $Q(-1)=-3$; $(-1)^{3}=-1$ y $(-1)^{2}=1$.', '$Q(3)=-7$ و$Q(-1)=-3$؛ ‏$(-1)^{3}=-1$ و$(-1)^{2}=1$.', '$Q(3)=-7$ and $Q(-1)=-3$; $(-1)^{3}=-1$ and $(-1)^{2}=1$.')
    },
    'add-sub': {
        vocabulary: [
            say('maila bereko gaiak', 'términos del mismo grado', 'الحدود من الدرجة نفسها', 'terms of the same degree'),
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('zutabeak', 'columnas', 'الأعمدة', 'columns')
        ],
        explanation: say(
            'Batzeko, maila bereko gaiak batzen dira. Kentzeko, aldatu kentzen den polinomioaren gai guztien zeinua eta batu: $P-Q=P+(-Q)$. Lagungarria da bata bestearen azpian idaztea, mailen zutabeetan, eta hutsune bat uztea maila bat falta bada.',
            'Para sumar, se suman los términos del mismo grado. Para restar, cambia el signo de todos los términos del polinomio que se resta y suma: $P-Q=P+(-Q)$. Ayuda escribirlos uno debajo del otro, por columnas de grado, dejando hueco si falta alguno.',
            'للجمع نجمع الحدود من الدرجة نفسها. وللطرح غيّر إشارة كل حدود كثير الحدود المطروح ثم اجمع: $P-Q=P+(-Q)$. ويساعد أن نكتبهما أحدهما تحت الآخر في أعمدة حسب الدرجة، مع ترك فراغ إذا نقصت درجة.',
            'To add, add the terms of the same degree. To subtract, change the sign of every term of the polynomial being subtracted and add: $P-Q=P+(-Q)$. It helps to write one under the other, in columns by degree, leaving a gap if a degree is missing.'
        ),
        examplePrompt: say('Kalkulatu $(5x^{3}-x+2)-(2x^{3}+3x^{2}-x)$.', 'Calcula $(5x^{3}-x+2)-(2x^{3}+3x^{2}-x)$.', 'احسب $(5x^{3}-x+2)-(2x^{3}+3x^{2}-x)$.', 'Work out $(5x^{3}-x+2)-(2x^{3}+3x^{2}-x)$.'),
        example: same('$5x^{3}-x+2-2x^{3}-3x^{2}+x=3x^{3}-3x^{2}+2$'),
        exampleAnswer: say('$3x^{3}-3x^{2}+2$: $x$ gaiak ezeztatu egiten dira.', '$3x^{3}-3x^{2}+2$: los términos en $x$ se anulan.', '$3x^{3}-3x^{2}+2$: حدّا $x$ يلغي أحدهما الآخر.', '$3x^{3}-3x^{2}+2$: the $x$ terms cancel out.')
    },
    product: {
        definitions: [
            {
                term: say('Banatze-propietatea', 'Propiedad distributiva', 'خاصية التوزيع', 'Distributive property'),
                meaning: say('$a\\cdot(b+c)=a\\cdot b+a\\cdot c$: biderkagaiak batugai bakoitza biderkatzen du.', '$a\\cdot(b+c)=a\\cdot b+a\\cdot c$: el factor multiplica a cada sumando.', '$a\\cdot(b+c)=a\\cdot b+a\\cdot c$: يضرب العامل كل حد في المجموع.', '$a\\cdot(b+c)=a\\cdot b+a\\cdot c$: the factor multiplies each term.')
            }
        ],
        vocabulary: [
            say('binomioa', 'binomio', 'ثنائي الحد', 'binomial'),
            say('azalera', 'área', 'المساحة', 'area'),
            say('antzekoak', 'semejantes', 'المتشابهة', 'like terms')
        ],
        explanation: say(
            'Lehenengoaren gai bakoitza bigarrenaren gai guztiez biderkatzen da, eta gero antzekoak laburtzen dira. Laukizuzen baten azalera bezala da: $(x+2)(x+3)$ lau zatitan banatzen da, $x^{2}$, $3x$, $2x$ eta $6$. Bi binomiok lau biderkadura ematen dituzte.',
            'Se multiplica cada término del primero por todos los del segundo y se reducen los semejantes. Es como el área de un rectángulo: $(x+2)(x+3)$ se divide en cuatro trozos, $x^{2}$, $3x$, $2x$ y $6$. Dos binomios dan cuatro productos.',
            'نضرب كل حد من الأول في كل حدود الثاني ثم نختصر المتشابهة. إنه كمساحة مستطيل: ينقسم $(x+2)(x+3)$ إلى أربع قطع $x^{2}$ و$3x$ و$2x$ و$6$. وثنائيا حد يعطيان أربعة حواصل ضرب.',
            'Multiply each term of the first by every term of the second and collect like terms. It is like the area of a rectangle: $(x+2)(x+3)$ splits into four pieces, $x^{2}$, $3x$, $2x$ and $6$. Two binomials give four products.'
        ),
        examplePrompt: say('Kalkulatu $(x-4)(2x+5)$.', 'Calcula $(x-4)(2x+5)$.', 'احسب $(x-4)(2x+5)$.', 'Work out $(x-4)(2x+5)$.'),
        example: same('$(x-4)(2x+5)=2x^{2}+5x-8x-20=2x^{2}-3x-20$'),
        exampleAnswer: say('$2x^{2}-3x-20$: lau biderkadura, eta gero bi antzeko batzen dira.', '$2x^{2}-3x-20$: cuatro productos, y después se juntan los dos semejantes.', '$2x^{2}-3x-20$: أربعة حواصل ضرب، ثم نجمع الحدين المتشابهين.', '$2x^{2}-3x-20$: four products, then the two like terms are collected.')
    },
    division: {
        vocabulary: [
            say('zatikizuna', 'dividendo', 'المقسوم', 'dividend'),
            say('zatitzailea', 'divisor', 'المقسوم عليه', 'divisor'),
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient')
        ],
        explanation: say(
            'Zenbakiekin bezala zatitzen da: zatikizunaren lehen gaia zatitzailearen lehenaz zatitu, zatitzailea emaitzaz biderkatu eta kendu; errepikatu hondarraren maila zatitzailearena baino txikiagoa izan arte. Amaieran, $P(x)=Q(x)\\cdot C(x)+R(x)$. Hondarra 0 bada, zatiketa zehatza da.',
            'Se divide como con números: el primer término del dividendo entre el primero del divisor, se multiplica el divisor por ese resultado y se resta; se repite hasta que el resto tenga menor grado que el divisor. Al final, $P(x)=Q(x)\\cdot C(x)+R(x)$. Si el resto es 0, la división es exacta.',
            'نقسم كما في الأعداد: الحد الأول من المقسوم على الأول من المقسوم عليه، ثم نضرب المقسوم عليه في الناتج ونطرح، ونكرر حتى تصير درجة الباقي أصغر من درجة المقسوم عليه. وفي النهاية $P(x)=Q(x)\\cdot C(x)+R(x)$. وإذا كان الباقي 0 فالقسمة تامة.',
            'Divide as with numbers: the first term of the dividend by the first of the divisor, multiply the divisor by that result and subtract; repeat until the remainder has a lower degree than the divisor. At the end, $P(x)=Q(x)\\cdot C(x)+R(x)$. If the remainder is 0, the division is exact.'
        ),
        examplePrompt: say('Zatitu $(2x^{2}-x-4)\\div(x-1)$.', 'Divide $(2x^{2}-x-4)\\div(x-1)$.', 'اقسم $(2x^{2}-x-4)\\div(x-1)$.', 'Divide $(2x^{2}-x-4)\\div(x-1)$.'),
        example: same('$2x^{2}-x-4=(x-1)(2x+1)-3$'),
        exampleAnswer: say('Zatidura $2x+1$ da eta hondarra $-3$.', 'Cociente $2x+1$ y resto $-3$.', 'خارج القسمة $2x+1$ والباقي $-3$.', 'Quotient $2x+1$ and remainder $-3$.')
    },
    'square-sum': {
        vocabulary: [
            say('karratua', 'cuadrado', 'المربع', 'square'),
            say('laukizuzenak', 'rectángulos', 'المستطيلان', 'rectangles'),
            say('bikoitza', 'doble', 'الضعف', 'twice')
        ],
        explanation: say(
            '$a+b$ aldeko karratu bat lau zatitan banatzen da: $a^{2}$, $b^{2}$ eta $ab$ azalerako bi laukizuzen. Horregatik $(a+b)^{2}=a^{2}+2ab+b^{2}$: lehenengoaren karratua, gehi lehenengoaren eta bigarrenaren biderkaduraren bikoitza, gehi bigarrenaren karratua.',
            'Un cuadrado de lado $a+b$ se divide en cuatro trozos: $a^{2}$, $b^{2}$ y dos rectángulos de área $ab$. Por eso $(a+b)^{2}=a^{2}+2ab+b^{2}$: el cuadrado del primero, más el doble del primero por el segundo, más el cuadrado del segundo.',
            'ينقسم مربع ضلعه $a+b$ إلى أربع قطع: $a^{2}$ و$b^{2}$ ومستطيلان مساحة كل منهما $ab$. لذلك $(a+b)^{2}=a^{2}+2ab+b^{2}$: مربع الأول زائد ضعف الأول في الثاني زائد مربع الثاني.',
            'A square of side $a+b$ splits into four pieces: $a^{2}$, $b^{2}$ and two rectangles of area $ab$. That is why $(a+b)^{2}=a^{2}+2ab+b^{2}$: the first squared, plus twice the first times the second, plus the second squared.'
        ),
        examplePrompt: say('Garatu $(2x+7)^{2}$.', 'Desarrolla $(2x+7)^{2}$.', 'انشر $(2x+7)^{2}$.', 'Expand $(2x+7)^{2}$.'),
        example: same('$(2x+7)^{2}=4x^{2}+28x+49$'),
        exampleAnswer: say('$4x^{2}+28x+49$: erdiko gaia $2\\cdot 2x\\cdot 7=28x$ da.', '$4x^{2}+28x+49$: el del medio es $2\\cdot 2x\\cdot 7=28x$.', '$4x^{2}+28x+49$: الحد الأوسط $2\\cdot 2x\\cdot 7=28x$.', '$4x^{2}+28x+49$: the middle term is $2\\cdot 2x\\cdot 7=28x$.')
    },
    'square-diff': {
        vocabulary: [
            say('kendura', 'diferencia', 'الفرق', 'difference'),
            say('erdiko gaia', 'término del medio', 'الحد الأوسط', 'middle term'),
            say('zeinuak', 'signos', 'الإشارات', 'signs')
        ],
        explanation: say(
            'Batura batena bezala, hiru gai ditu, baina erdikoa negatiboa da: $(a-b)^{2}=a^{2}-2ab+b^{2}$. Azkena beti positiboa da, $(-b)^{2}=b^{2}$ delako. Zeinuak $+$, $-$, $+$ dira.',
            'Como el de una suma, tiene tres términos, pero el del medio es negativo: $(a-b)^{2}=a^{2}-2ab+b^{2}$. El último siempre es positivo, porque $(-b)^{2}=b^{2}$. Los signos son $+$, $-$, $+$.',
            'له ثلاثة حدود كمربع المجموع، لكن الحد الأوسط سالب: $(a-b)^{2}=a^{2}-2ab+b^{2}$. والأخير موجب دائمًا لأن $(-b)^{2}=b^{2}$. والإشارات $+$ و$-$ و$+$.',
            'Like the square of a sum, it has three terms, but the middle one is negative: $(a-b)^{2}=a^{2}-2ab+b^{2}$. The last one is always positive, because $(-b)^{2}=b^{2}$. The signs are $+$, $-$, $+$.'
        ),
        examplePrompt: say('Garatu $(3x-1)^{2}$.', 'Desarrolla $(3x-1)^{2}$.', 'انشر $(3x-1)^{2}$.', 'Expand $(3x-1)^{2}$.'),
        example: same('$(3x-1)^{2}=9x^{2}-6x+1$'),
        exampleAnswer: say('$9x^{2}-6x+1$: zeinuak $+$, $-$, $+$.', '$9x^{2}-6x+1$: signos $+$, $-$, $+$.', '$9x^{2}-6x+1$: الإشارات $+$ و$-$ و$+$.', '$9x^{2}-6x+1$: signs $+$, $-$, $+$.'),
        why: {
            text: say(
                'Marrazkian, $a^{2}$ karratu handiari $ab$ azalerako bi laukizuzen kentzen zaizkio; baina horrela izkinako $b^{2}$ karratutxoa bi aldiz kendu da, eta behin itzuli behar da.',
                'En el dibujo, al cuadrado grande $a^{2}$ se le quitan dos rectángulos de área $ab$; pero así el cuadradito $b^{2}$ de la esquina se ha quitado dos veces, y hay que devolverlo una vez.',
                'في الرسم ننزع من المربع الكبير $a^{2}$ مستطيلين مساحة كل منهما $ab$، لكن هكذا ننزع المربع الصغير $b^{2}$ في الزاوية مرتين، فيجب أن نعيده مرة.',
                'In the drawing, the big square $a^{2}$ loses two rectangles of area $ab$; but that takes the little corner square $b^{2}$ away twice, so it has to be given back once.'
            ),
            math: same('$(10-1)^{2}=100-20+1=81$')
        }
    },
    'sum-diff': {
        vocabulary: [
            say('karratuen kendura', 'diferencia de cuadrados', 'فرق مربعين', 'difference of squares'),
            say('kalkulu mentala', 'cálculo mental', 'الحساب الذهني', 'mental arithmetic'),
            say('ezeztatu', 'anular', 'يلغي', 'cancel out')
        ],
        explanation: say(
            'Batura bat kendura beraz biderkatzean, erdiko gaiak, $+ab$ eta $-ab$, ezeztatu egiten dira: $(a+b)(a-b)=a^{2}-b^{2}$, karratuen kendura bat. Kalkulu mentalerako balio du, $21\\cdot 19=400-1=399$, eta alderantziz faktorizatzeko.',
            'Al multiplicar una suma por la misma diferencia, los términos del medio, $+ab$ y $-ab$, se anulan: $(a+b)(a-b)=a^{2}-b^{2}$, una diferencia de cuadrados. Sirve para el cálculo mental, $21\\cdot 19=400-1=399$, y al revés para factorizar.',
            'عند ضرب مجموع في الفرق نفسه يلغي الحدان الأوسطان $+ab$ و$-ab$ أحدهما الآخر: $(a+b)(a-b)=a^{2}-b^{2}$، فرق مربعين. ويفيد في الحساب الذهني $21\\cdot 19=400-1=399$، وبالعكس في التحليل.',
            'When a sum is multiplied by the same difference, the middle terms, $+ab$ and $-ab$, cancel out: $(a+b)(a-b)=a^{2}-b^{2}$, a difference of squares. It helps with mental arithmetic, $21\\cdot 19=400-1=399$, and the other way round to factorise.'
        ),
        examplePrompt: say('Kalkulatu $(5x+2)(5x-2)$ eta, buruz, $32\\cdot 28$.', 'Calcula $(5x+2)(5x-2)$ y, de cabeza, $32\\cdot 28$.', 'احسب $(5x+2)(5x-2)$، واحسب ذهنيًا $32\\cdot 28$.', 'Work out $(5x+2)(5x-2)$ and, in your head, $32\\cdot 28$.'),
        example: same('$(5x+2)(5x-2)=25x^{2}-4\\qquad 32\\cdot 28=30^{2}-2^{2}=896$'),
        exampleAnswer: say('$25x^{2}-4$ eta 896: $32\\cdot 28=(30+2)(30-2)$.', '$25x^{2}-4$ y 896: $32\\cdot 28=(30+2)(30-2)$.', '$25x^{2}-4$ و896: ‏$32\\cdot 28=(30+2)(30-2)$.', '$25x^{2}-4$ and 896: $32\\cdot 28=(30+2)(30-2)$.')
    },
    ruffini: {
        vocabulary: [
            say('koefizienteak', 'coeficientes', 'المعاملات', 'coefficients'),
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('zutabea', 'columna', 'العمود', 'column')
        ],
        explanation: say(
            'Zatitzailea $x-a$ bada, zatiketa koefizienteekin laburtzen da: idatzi zatikizunaren guztiak, zeroak barne, eta $a$ ezkerrean. Jaitsi lehena eta errepikatu: biderkatu $a$ zenbakiaz, idatzi hurrengo zutabean eta batu. Azken zenbakia hondarra da.',
            'Si el divisor es $x-a$, la división se acorta con los coeficientes: se escriben todos los del dividendo, con los ceros, y $a$ a la izquierda. Se baja el primero y se repite: multiplicar por $a$, escribir en la columna siguiente y sumar. El último número es el resto.',
            'إذا كان المقسوم عليه $x-a$ تختصر القسمة بالمعاملات: نكتب كل معاملات المقسوم مع الأصفار، و$a$ على اليسار. ننزل الأول ونكرر: نضرب في $a$، ونكتب في العمود التالي ونجمع. والعدد الأخير هو الباقي.',
            'If the divisor is $x-a$, the division gets shorter with the coefficients: write all those of the dividend, zeros included, and $a$ on the left. Bring down the first and repeat: multiply by $a$, write it in the next column and add. The last number is the remainder.'
        ),
        examplePrompt: say('Zatitu Ruffinirekin $(x^{3}-4x+1)\\div(x-3)$.', 'Divide con Ruffini $(x^{3}-4x+1)\\div(x-3)$.', 'اقسم بطريقة روفيني $(x^{3}-4x+1)\\div(x-3)$.', 'Divide with Ruffini’s rule $(x^{3}-4x+1)\\div(x-3)$.'),
        example: same('$x^{3}-4x+1=(x-3)(x^{2}+3x+5)+16$'),
        exampleAnswer: say('Zatidura $x^{2}+3x+5$ eta hondarra 16. Koefizienteak, 0 zenbakiarekin: $1,\\ 0,\\ -4,\\ 1$.', 'Cociente $x^{2}+3x+5$ y resto 16. Los coeficientes, con el 0: $1,\\ 0,\\ -4,\\ 1$.', 'خارج القسمة $x^{2}+3x+5$ والباقي 16. والمعاملات مع الصفر: $1,\\ 0,\\ -4,\\ 1$.', 'Quotient $x^{2}+3x+5$ and remainder 16. The coefficients, with the 0: $1,\\ 0,\\ -4,\\ 1$.')
    },
    remainder: {
        vocabulary: [
            say('hondarra', 'resto', 'الباقي', 'remainder'),
            say('zatitzailea', 'divisor', 'المقسوم عليه', 'divisor'),
            say('faktorea', 'factor', 'عامل', 'factor')
        ],
        explanation: say(
            '$P(x)$ zatitzean $x-a$ zatitzaileaz, hondarra $P(a)$ da: ez dago zatitu beharrik, nahikoa da zenbakizko balioa kalkulatzea. $P(a)=0$ bada, zatiketa zehatza da eta $x-a$ polinomioaren faktore bat da. $x+1$ zatitzailearekin, $a=-1$.',
            'Al dividir $P(x)$ entre $x-a$, el resto es $P(a)$: no hace falta dividir, basta con calcular el valor numérico. Si $P(a)=0$, la división es exacta y $x-a$ es un factor del polinomio. Con el divisor $x+1$, $a=-1$.',
            'عند قسمة $P(x)$ على $x-a$ يكون الباقي $P(a)$: لا حاجة للقسمة، يكفي حساب القيمة العددية. وإذا كان $P(a)=0$ فالقسمة تامة و$x-a$ عامل من عوامل كثير الحدود. ومع المقسوم عليه $x+1$ يكون $a=-1$.',
            'When $P(x)$ is divided by $x-a$, the remainder is $P(a)$: no need to divide, just work out the value. If $P(a)=0$, the division is exact and $x-a$ is a factor of the polynomial. With the divisor $x+1$, $a=-1$.'
        ),
        examplePrompt: say('Aurkitu $(x^{4}-3x^{2}+2)\\div(x-2)$ zatiketaren hondarra, zatitu gabe.', 'Halla el resto de $(x^{4}-3x^{2}+2)\\div(x-2)$ sin dividir.', 'جد باقي $(x^{4}-3x^{2}+2)\\div(x-2)$ دون قسمة.', 'Find the remainder of $(x^{4}-3x^{2}+2)\\div(x-2)$ without dividing.'),
        example: same('$P(2)=2^{4}-3\\cdot 2^{2}+2=16-12+2=6$'),
        exampleAnswer: say('Hondarra 6 da: $a=2$ eta $P(2)=6$.', 'El resto es 6: $a=2$ y $P(2)=6$.', 'الباقي 6: ‏$a=2$ و$P(2)=6$.', 'The remainder is 6: $a=2$ and $P(2)=6$.'),
        why: {
            text: say(
                '$P(x)=(x-a)\\cdot C(x)+R$ delako. $x=a$ jartzean, lehen batugaiak $(a-a)\\cdot C(a)=0$ balio du, eta $P(a)=R$ geratzen da.',
                'Porque $P(x)=(x-a)\\cdot C(x)+R$. Si se pone $x=a$, el primer sumando vale $(a-a)\\cdot C(a)=0$, y queda $P(a)=R$.',
                'لأن $P(x)=(x-a)\\cdot C(x)+R$. وإذا وضعنا $x=a$ يصير الحد الأول $(a-a)\\cdot C(a)=0$ ويبقى $P(a)=R$.',
                'Because $P(x)=(x-a)\\cdot C(x)+R$. Putting $x=a$, the first term is $(a-a)\\cdot C(a)=0$, and $P(a)=R$ is left.'
            ),
            math: same('$P(x)=(x-2)(x+1)+3\\ \\to\\ P(2)=0+3=3$')
        }
    },
    roots: {
        definitions: [
            {
                term: say('Polinomio baten erroa', 'Raíz de un polinomio', 'جذر كثير الحدود', 'Root of a polynomial'),
                meaning: say('$a$ zenbaki bat, $P(a)=0$ betetzen duena.', 'Un número $a$ con $P(a)=0$.', 'عدد $a$ يحقق $P(a)=0$.', 'A number $a$ with $P(a)=0$.')
            }
        ],
        vocabulary: [
            say('gai askea', 'término independiente', 'الحد الثابت', 'constant term'),
            say('zatitzaileak', 'divisores', 'القواسم', 'divisors'),
            say('negatiboak', 'negativos', 'السالبة', 'negative')
        ],
        explanation: say(
            'Polinomioak koefiziente osoak baditu, haren erro osoak gai askearen zatitzaileak dira, positiboak eta negatiboak. $x^{3}-6x^{2}+11x-6$ polinomioan $\\pm 1,\\pm 2,\\pm 3,\\pm 6$ probatzen dira, eta 1, 2 eta 3 ateratzen dira. Gai askea 0 bada, $x=0$ erroa da.',
            'Si el polinomio tiene coeficientes enteros, sus raíces enteras son divisores del término independiente, positivos y negativos. En $x^{3}-6x^{2}+11x-6$ se prueban $\\pm 1,\\pm 2,\\pm 3,\\pm 6$, y salen 1, 2 y 3. Si el término independiente es 0, $x=0$ es raíz.',
            'إذا كانت معاملات كثير الحدود صحيحة فجذوره الصحيحة من قواسم الحد الثابت، الموجبة والسالبة. في $x^{3}-6x^{2}+11x-6$ نجرب $\\pm 1,\\pm 2,\\pm 3,\\pm 6$ فنجد 1 و2 و3. وإذا كان الحد الثابت 0 فإن $x=0$ جذر.',
            'If the polynomial has integer coefficients, its integer roots are divisors of the constant term, positive and negative. In $x^{3}-6x^{2}+11x-6$ you try $\\pm 1,\\pm 2,\\pm 3,\\pm 6$, and get 1, 2 and 3. If the constant term is 0, $x=0$ is a root.'
        ),
        examplePrompt: say('Bilatu $x^{2}+x-12$ polinomioaren erro osoak.', 'Busca las raíces enteras de $x^{2}+x-12$.', 'ابحث عن الجذور الصحيحة لـ $x^{2}+x-12$.', 'Find the integer roots of $x^{2}+x-12$.'),
        example: same('$P(3)=9+3-12=0\\qquad P(-4)=16-4-12=0$'),
        exampleAnswer: say('Erroak 3 eta $-4$ dira, biak 12 zenbakiaren zatitzaileak.', 'Las raíces son 3 y $-4$, los dos divisores de 12.', 'الجذران 3 و$-4$، وكلاهما من قواسم 12.', 'The roots are 3 and $-4$, both divisors of 12.')
    },
    'common-factor': {
        vocabulary: [
            say('faktore komuna', 'factor común', 'العامل المشترك', 'common factor'),
            say('berretzaile txikiena', 'menor exponente', 'أصغر أس', 'lowest power'),
            say('egiaztatu', 'comprobar', 'تحقق', 'check')
        ],
        explanation: say(
            'Gai guztiek zenbaki edo letra bat partekatzen badute, kanpora ateratzen da: koefizienteen z.k.h. eta letra bakoitza bere berretzaile txikienarekin. Barruan, gai bakoitza zati ateratakoa geratzen da: $3x+6=3(x+2)$. Egiaztatzeko, biderkatu berriro.',
            'Si todos los términos comparten un número o una letra, se saca fuera: el m.c.d. de los coeficientes y cada letra con su menor exponente. Dentro queda cada término dividido entre lo que se ha sacado: $3x+6=3(x+2)$. Para comprobarlo, vuelve a multiplicar.',
            'إذا اشتركت كل الحدود في عدد أو حرف فإننا نخرجه: القاسم المشترك الأكبر للمعاملات وكل حرف بأصغر أس. وفي الداخل يبقى كل حد مقسومًا على ما أخرجناه: $3x+6=3(x+2)$. وللتحقق اضرب من جديد.',
            'If every term shares a number or a letter, take it out: the GCD of the coefficients and each letter with its lowest power. Inside, each term is left divided by what was taken out: $3x+6=3(x+2)$. To check it, multiply back.'
        ),
        examplePrompt: say('Atera faktore komuna $10x^{3}-15x^{2}+5x$ polinomioan.', 'Saca factor común en $10x^{3}-15x^{2}+5x$.', 'أخرج العامل المشترك في $10x^{3}-15x^{2}+5x$.', 'Take out the common factor in $10x^{3}-15x^{2}+5x$.'),
        example: same('$10x^{3}-15x^{2}+5x=5x(2x^{2}-3x+1)$'),
        exampleAnswer: say('$5x(2x^{2}-3x+1)$: $5x$ zati $5x$ 1 da, ez zero.', '$5x(2x^{2}-3x+1)$: $5x$ entre $5x$ es 1, no cero.', '$5x(2x^{2}-3x+1)$: ‏$5x$ على $5x$ يساوي 1 لا صفرًا.', '$5x(2x^{2}-3x+1)$: $5x$ divided by $5x$ is 1, not zero.')
    },
    'factor-identities': {
        vocabulary: [
            say('faktorizatu', 'factorizar', 'التحليل', 'factorise'),
            say('identitatea', 'identidad', 'المتطابقة', 'identity'),
            say('erroak', 'raíces', 'الجذور', 'roots')
        ],
        explanation: say(
            'Faktorizatzea polinomioa biderkadura gisa idaztea da. Ordena on bat: lehenik, faktore komuna; gero, begiratu identitate bat den; bestela, bilatu erroak: $a$ erroa bada, $x-a$ faktore bat da. Horrela, $x^{3}-6x^{2}+11x-6=(x-1)(x-2)(x-3)$.',
            'Factorizar es escribir el polinomio como un producto. Un buen orden: primero, factor común; después, mira si es una identidad; si no, busca las raíces: si $a$ es raíz, $x-a$ es un factor. Así, $x^{3}-6x^{2}+11x-6=(x-1)(x-2)(x-3)$.',
            'التحليل هو كتابة كثير الحدود حاصلَ ضرب. والترتيب الجيد: أولًا العامل المشترك، ثم انظر هل هو متطابقة، وإلا فابحث عن الجذور: إذا كان $a$ جذرًا فإن $x-a$ عامل. وهكذا $x^{3}-6x^{2}+11x-6=(x-1)(x-2)(x-3)$.',
            'To factorise is to write the polynomial as a product. A good order: first, the common factor; then, see whether it is an identity; if not, look for the roots: if $a$ is a root, $x-a$ is a factor. So $x^{3}-6x^{2}+11x-6=(x-1)(x-2)(x-3)$.'
        ),
        cases: [
            { title: say('Karratuen kendura', 'Diferencia de cuadrados', 'فرق مربعين', 'Difference of squares'), text: say('Bi karratu, kenketa.', 'Dos cuadrados restando.', 'مربعان مطروحان.', 'Two squares, subtracted.'), math: same('$x^{2}-16=(x+4)(x-4)$') },
            { title: say('Trinomio karratua', 'Trinomio cuadrado', 'ثلاثي مربع', 'Perfect square'), text: say('Muturrak karratuak, erdikoa bikoitza.', 'Extremos cuadrados, el del medio el doble.', 'الطرفان مربعان والأوسط الضعف.', 'The ends are squares, the middle is twice.'), math: same('$x^{2}-10x+25=(x-5)^{2}$') },
            { title: say('Erroekin', 'Con raíces', 'بالجذور', 'With roots'), text: say('$a$ erroa → $x-a$ faktorea.', 'Raíz $a$ → factor $x-a$.', 'الجذر $a$ ← العامل $x-a$.', 'Root $a$ → factor $x-a$.'), math: same('$x^{2}-x-6=(x-3)(x+2)$') }
        ],
        examplePrompt: say('Faktorizatu $3x^{2}-12$.', 'Factoriza $3x^{2}-12$.', 'حلّل $3x^{2}-12$.', 'Factorise $3x^{2}-12$.'),
        example: same('$3x^{2}-12=3(x^{2}-4)=3(x+2)(x-2)$'),
        exampleAnswer: say('$3(x+2)(x-2)$: lehenik faktore komuna, gero karratuen kendura.', '$3(x+2)(x-2)$: primero el factor común y después la diferencia de cuadrados.', '$3(x+2)(x-2)$: أولًا العامل المشترك ثم فرق مربعين.', '$3(x+2)(x-2)$: first the common factor, then the difference of squares.')
    },
    'algebraic-fractions': {
        definitions: [
            {
                term: say('Zatiki aljebraikoa', 'Fracción algebraica', 'الكسر الجبري', 'Algebraic fraction'),
                meaning: say('Bi polinomioren zatidura, $\\frac{x+1}{x-3}$ bezala.', 'Un cociente de dos polinomios, como $\\frac{x+1}{x-3}$.', 'حاصل قسمة كثيري حدود، مثل $\\frac{x+1}{x-3}$.', 'A quotient of two polynomials, like $\\frac{x+1}{x-3}$.')
            }
        ],
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('faktoreak', 'factores', 'العوامل', 'factors')
        ],
        explanation: say(
            'Zenbakizko zatikietan bezala, faktore komunak bakarrik ezabatzen dira, inoiz ez batugaiak. Lehenik faktorizatu zenbakitzailea eta izendatzailea, eta gero ezabatu bietan dagoena: $\\frac{x^{2}-4}{x^{2}+2x}=\\frac{(x+2)(x-2)}{x(x+2)}=\\frac{x-2}{x}$. Izendatzaileak ezin du 0 balio.',
            'Como en las fracciones numéricas, solo se tachan factores comunes, nunca sumandos. Primero factoriza el numerador y el denominador, y después tacha lo que está en los dos: $\\frac{x^{2}-4}{x^{2}+2x}=\\frac{(x+2)(x-2)}{x(x+2)}=\\frac{x-2}{x}$. El denominador no puede valer 0.',
            'كما في الكسور العددية لا نشطب إلا العوامل المشتركة، لا الحدود المجموعة أبدًا. حلّل أولًا البسط والمقام، ثم اشطب ما يوجد في الاثنين: $\\frac{x^{2}-4}{x^{2}+2x}=\\frac{(x+2)(x-2)}{x(x+2)}=\\frac{x-2}{x}$. ولا يجوز أن يساوي المقام 0.',
            'As with number fractions, only common factors are crossed out, never terms that are added. First factorise the numerator and the denominator, then cross out what is in both: $\\frac{x^{2}-4}{x^{2}+2x}=\\frac{(x+2)(x-2)}{x(x+2)}=\\frac{x-2}{x}$. The denominator cannot be 0.'
        ),
        examplePrompt: say('Sinplifikatu $\\frac{x^{2}-9}{2x+6}$.', 'Simplifica $\\frac{x^{2}-9}{2x+6}$.', 'بسّط $\\frac{x^{2}-9}{2x+6}$.', 'Simplify $\\frac{x^{2}-9}{2x+6}$.'),
        example: same('$\\frac{x^{2}-9}{2x+6}=\\frac{(x+3)(x-3)}{2(x+3)}=\\frac{x-3}{2}$'),
        exampleAnswer: say('$\\frac{x-3}{2}$: $x+3$ faktorea ezabatu da.', '$\\frac{x-3}{2}$: se ha tachado el factor $x+3$.', '$\\frac{x-3}{2}$: شطبنا العامل $x+3$.', '$\\frac{x-3}{2}$: the factor $x+3$ has been crossed out.')
    }
}

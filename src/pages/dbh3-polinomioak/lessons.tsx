import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { CommonFactorFigure, PatternFigure, PolynomialFigure, ProductAreaFigure, SquareDifferenceFigure, SquareSumFigure, SumDifferenceFigure } from '../dbh2-aljebra-v2/figures'
import { FactorizeFigure, LongDivisionFigure, RemainderFigure, RootsFigure, RuffiniFigure, SimplifyFigure } from '../dbh4-aplikatuak-polinomioak/figures'
import { say, same } from './text'

/* ==========================================================================
   Polinomioak · 3. DBH — stages and lessons, following Santillana 3.º ESO
   unit 5 «Polinomios» (monomials, polynomials and their value, operations,
   division, roots and factorisation) and Anaya 3.º ESO unit 5 «El lenguaje
   algebraico» (algebraic language, identities, Ruffini's rule, algebraic
   fractions). Every number and context is original: the books only fix the
   scope and the order. Each lesson names its typical mistake.
   ========================================================================== */

export type PolynomialsStageId = 'algebra' | 'operations' | 'identities' | 'ruffini' | 'factor'

export const polynomialsStages: UnitStage[] = [
    { id: 'algebra', tone: 'blue', title: { eu: 'Hizkuntza aljebraikoa', es: 'Lenguaje algebraico', en: 'Algebraic language', ar: 'اللغة الجبرية' } },
    { id: 'operations', tone: 'violet', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' } },
    { id: 'identities', tone: 'mustard', title: { eu: 'Identitate nabarmenak', es: 'Identidades notables', en: 'Special products', ar: 'المتطابقات الشهيرة' } },
    { id: 'ruffini', tone: 'coral', title: { eu: 'Ruffini eta erroak', es: 'Ruffini y raíces', en: 'Ruffini and roots', ar: 'روفيني والجذور' } },
    { id: 'factor', tone: 'green', title: { eu: 'Faktorizazioa', es: 'Factorización', en: 'Factorisation', ar: 'التحليل' } }
]

export const polynomialsTopics: UnitTopic[] = [
    /* ---------- 1. Algebraic language ---------- */
    {
        id: 'expressions',
        stage: 'algebra',
        title: say('Adierazpen aljebraikoak', 'Expresiones algebraicas', 'العبارات الجبرية', 'Algebraic expressions'),
        goal: say('Hitzez emandako esaldiak letrekin idaztea eta alderantziz.', 'Pasar frases del lenguaje común a expresiones con letras, y al revés.', 'تحويل جمل من اللغة العادية إلى عبارات بالحروف والعكس.', 'Turn everyday sentences into expressions with letters, and the other way round.'),
        explanation: say(
            'Adierazpen aljebraiko batek zenbakiak eta letrak lotzen ditu eragiketekin. Letrak ezagutzen ez dugun edo aldatzen den kopuru bat adierazten du. «Zenbaki baten hirukoitza gehi 5» $3x+5$ da; «bi zenbaki jarraien batura» $x+(x+1)$; «zenbaki baten karratua ken haren erdia» $x^{2}-\\frac{x}{2}$. Ordena garrantzitsua da: «$x$ bider 2, gero 3 gehitu» $2x+3$ da, baina «$x$ gehi 3, eta guztia bider 2» $2(x+3)$.',
            'Una expresión algebraica une números y letras con operaciones. La letra representa una cantidad que no conocemos o que cambia. «El triple de un número más 5» es $3x+5$; «la suma de dos números consecutivos», $x+(x+1)$; «el cuadrado de un número menos su mitad», $x^{2}-\\frac{x}{2}$. El orden importa: «$x$ por 2 y luego sumar 3» es $2x+3$, pero «$x$ más 3, y todo por 2» es $2(x+3)$.',
            'العبارة الجبرية تربط الأعداد والحروف بالعمليات. ويمثّل الحرف كمية لا نعرفها أو تتغيّر. «ثلاثة أمثال عدد زائد 5» هي $3x+5$، و«مجموع عددين متتاليين» $x+(x+1)$، و«مربع عدد ناقص نصفه» $x^{2}-\\frac{x}{2}$. والترتيب مهم: «$x$ في 2 ثم نضيف 3» هي $2x+3$، لكن «$x$ زائد 3 والكل في 2» هي $2(x+3)$.',
            'An algebraic expression joins numbers and letters with operations. The letter stands for a quantity we do not know or that changes. «Three times a number plus 5» is $3x+5$; «the sum of two consecutive numbers» is $x+(x+1)$; «the square of a number minus its half» is $x^{2}-\\frac{x}{2}$. Order matters: «$x$ times 2, then add 3» is $2x+3$, but «$x$ plus 3, all times 2» is $2(x+3)$.'
        ),
        problem: say('Idatzi: «zenbaki baten bikoitza ken 7, guztia karratura».', 'Escribe: «el doble de un número menos 7, todo al cuadrado».', 'اكتب: «ضعف عدد ناقص 7، والكل مربع».', 'Write: «twice a number minus 7, all squared».'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbakia: $x$. Bikoitza:', 'El número: $x$. El doble:', 'العدد: $x$. ضعفه:', 'The number: $x$. Twice it:'), math: same('$2x$') },
            { text: say('Ken 7:', 'Menos 7:', 'ناقص 7:', 'Minus 7:'), math: same('$2x-7$') },
            { text: say('Guztia karratura: parentesia behar da.', 'Todo al cuadrado: hace falta el paréntesis.', 'الكل مربع: يلزم القوس.', 'All squared: you need brackets.'), math: same('$(2x-7)^{2}$') }
        ],
        example: same('$x+(x+1)+(x+2)=3x+3$'),
        mistake: {
            wrong: say('«$x$ gehi 3, guztia bider 2» = $x+3\\cdot 2$.', '«$x$ más 3, todo por 2» = $x+3\\cdot 2$.', '«$x$ زائد 3، والكل في 2» = $x+3\\cdot 2$.', '«$x$ plus 3, all times 2» = $x+3\\cdot 2$.'),
            right: say('«Guztia» parentesi bat da: $2(x+3)$. Parentesirik gabe 3 bakarrik biderkatzen da.', '«Todo» es un paréntesis: $2(x+3)$. Sin paréntesis solo se multiplica el 3.', '«الكل» يعني قوسًا: $2(x+3)$. وبلا قوس لا يُضرب إلا 3.', '«All» means brackets: $2(x+3)$. Without them only the 3 is multiplied.')
        },
        takeaway: say('«Guztia» = parentesiak: $2(X+3)\\neq 2X+3$.', '«Todo» = paréntesis: $2(X+3)\\neq 2X+3$.', '«الكل» = أقواس: $2(X+3)\\neq 2X+3$.', '«All» = brackets: $2(X+3)\\neq 2X+3$.'),
        figure: (language) => <PatternFigure language={language} />
    },
    {
        id: 'monomials',
        stage: 'algebra',
        title: say('Monomioak', 'Monomios', 'وحيدات الحد', 'Monomials'),
        goal: say('Monomio baten koefizientea, zati literala eta maila ezagutzea, eta monomioekin eragiketak egitea.', 'Reconocer el coeficiente, la parte literal y el grado de un monomio, y operar con monomios.', 'التعرّف على معامل وحيد الحد وجزئه الحرفي ودرجته، وإجراء العمليات عليه.', 'Recognise the coefficient, the literal part and the degree of a monomial, and operate with monomials.'),
        explanation: say(
            'Monomio bat zenbaki bat bider letren berreturak da: $-5x^{2}y$ monomioan, $-5$ koefizientea da, $x^{2}y$ zati literala eta maila $2+1=3$. Bi monomio antzekoak dira zati literal bera badute: $3x^{2}$ eta $-7x^{2}$. Antzekoak bakarrik batu edo ken daitezke, koefizienteak batuz: $3x^{2}-7x^{2}=-4x^{2}$. Biderkatzean, koefizienteak biderkatzen dira eta letra bereko berretzaileak batu: $2x^{3}\\cdot 4x^{2}=8x^{5}$.',
            'Un monomio es un número por potencias de letras: en $-5x^{2}y$, $-5$ es el coeficiente, $x^{2}y$ la parte literal y el grado es $2+1=3$. Dos monomios son semejantes si tienen la misma parte literal: $3x^{2}$ y $-7x^{2}$. Solo se pueden sumar o restar los semejantes, sumando los coeficientes: $3x^{2}-7x^{2}=-4x^{2}$. Al multiplicar, se multiplican los coeficientes y se suman los exponentes de la misma letra: $2x^{3}\\cdot 4x^{2}=8x^{5}$.',
            'وحيد الحد عدد مضروب في قوى حروف: في $-5x^{2}y$ يكون $-5$ المعامل و$x^{2}y$ الجزء الحرفي والدرجة $2+1=3$. ويتشابه وحيدا حد إذا كان لهما الجزء الحرفي نفسه: $3x^{2}$ و$-7x^{2}$. ولا تُجمع أو تُطرح إلا المتشابهة بجمع المعاملات: $3x^{2}-7x^{2}=-4x^{2}$. وعند الضرب نضرب المعاملات ونجمع أسس الحرف نفسه: $2x^{3}\\cdot 4x^{2}=8x^{5}$.',
            'A monomial is a number times powers of letters: in $-5x^{2}y$, $-5$ is the coefficient, $x^{2}y$ the literal part and the degree is $2+1=3$. Two monomials are like terms if they have the same literal part: $3x^{2}$ and $-7x^{2}$. Only like terms can be added or subtracted, by adding the coefficients: $3x^{2}-7x^{2}=-4x^{2}$. When multiplying, multiply the coefficients and add the exponents of the same letter: $2x^{3}\\cdot 4x^{2}=8x^{5}$.'
        ),
        cases: [
            { title: say('Batu', 'Sumar', 'الجمع', 'Adding'), text: say('Antzekoak bakarrik; zati literala ez da aldatzen.', 'Solo semejantes; la parte literal no cambia.', 'المتشابهة فقط؛ الجزء الحرفي لا يتغيّر.', 'Like terms only; the literal part does not change.'), math: same('$5x+2x=7x$') },
            { title: say('Biderkatu', 'Multiplicar', 'الضرب', 'Multiplying'), text: say('Edozein bi monomio; berretzaileak batu.', 'Cualquier par; se suman los exponentes.', 'أي وحيدي حد؛ نجمع الأسس.', 'Any two; add the exponents.'), math: same('$5x\\cdot 2x=10x^{2}$') }
        ],
        problem: same('$4x^{2}-x+6x^{2}+3x$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Elkartu antzekoak.', 'Agrupa los semejantes.', 'اجمع المتشابهة.', 'Group the like terms.'), math: same('$(4x^{2}+6x^{2})+(-x+3x)$') },
            { text: say('Batu koefizienteak.', 'Suma los coeficientes.', 'اجمع المعاملات.', 'Add the coefficients.'), math: same('$10x^{2}+2x$') },
            { text: say('Ezin da gehiago laburtu: $x^{2}$ eta $x$ ez dira antzekoak.', 'No se puede reducir más: $x^{2}$ y $x$ no son semejantes.', 'لا يمكن الاختصار أكثر: $x^{2}$ و$x$ غير متشابهين.', 'It cannot be reduced further: $x^{2}$ and $x$ are not like terms.') }
        ],
        example: same('$-3a^{2}b\\cdot 2ab=-6a^{3}b^{2}$'),
        mistake: {
            wrong: say('$2x+3x^{2}=5x^{3}$', '$2x+3x^{2}=5x^{3}$', '$2x+3x^{2}=5x^{3}$', '$2x+3x^{2}=5x^{3}$'),
            right: say('$2x$ eta $3x^{2}$ ez dira antzekoak: ezin dira batu. $3x^{2}+2x$ geratzen da.', '$2x$ y $3x^{2}$ no son semejantes: no se suman. Se queda $3x^{2}+2x$.', '$2x$ و$3x^{2}$ غير متشابهين: لا يُجمعان. يبقى $3x^{2}+2x$.', '$2x$ and $3x^{2}$ are not like terms: they cannot be added. It stays $3x^{2}+2x$.')
        },
        takeaway: say('Batu: antzekoak bakarrik. Biderkatu: $X^{M}\\cdot X^{N}=X^{M+N}$.', 'Sumar: solo semejantes. Multiplicar: $X^{M}\\cdot X^{N}=X^{M+N}$.', 'الجمع: المتشابهة فقط. الضرب: $X^{M}\\cdot X^{N}=X^{M+N}$.', 'Adding: like terms only. Multiplying: $X^{M}\\cdot X^{N}=X^{M+N}$.'),
        figure: (language) => <PolynomialFigure language={language} />
    },
    {
        id: 'value',
        stage: 'algebra',
        title: say('Polinomioak eta zenbakizko balioa', 'Polinomios y valor numérico', 'كثيرات الحدود والقيمة العددية', 'Polynomials and their value'),
        goal: say('Polinomio baten maila eta gaiak ezagutzea, eta haren zenbakizko balioa kalkulatzea.', 'Reconocer el grado y los términos de un polinomio, y calcular su valor numérico.', 'التعرّف على درجة كثير حدود وحدوده، وحساب قيمته العددية.', 'Recognise the degree and the terms of a polynomial, and work out its value for a number.'),
        explanation: say(
            'Polinomio bat monomioen batura da: $P(x)=2x^{3}-5x+1$. Haren maila monomio handienaren maila da (hemen 3), eta 1 gai askea da. $P(a)$ zenbakizko balioa da, $x$ letraren ordez $a$ jarrita lortzen dena. Kontuz zenbaki negatiboekin: jarri parentesi artean. $P(-2)=2(-2)^{3}-5(-2)+1=-16+10+1=-5$.',
            'Un polinomio es una suma de monomios: $P(x)=2x^{3}-5x+1$. Su grado es el del monomio de mayor grado (aquí 3), y el 1 es el término independiente. El valor numérico $P(a)$ es lo que sale al poner $a$ en lugar de $x$. Cuidado con los negativos: van entre paréntesis. $P(-2)=2(-2)^{3}-5(-2)+1=-16+10+1=-5$.',
            'كثير الحدود مجموع وحيدات حد: $P(x)=2x^{3}-5x+1$. ودرجته درجة أكبر وحيد حد فيه (هنا 3)، و1 هو الحد الثابت. والقيمة العددية $P(a)$ هي الناتج عند وضع $a$ مكان $x$. وانتبه للأعداد السالبة: توضع بين قوسين. $P(-2)=2(-2)^{3}-5(-2)+1=-16+10+1=-5$.',
            'A polynomial is a sum of monomials: $P(x)=2x^{3}-5x+1$. Its degree is that of the monomial with the highest degree (here 3), and 1 is the constant term. The value $P(a)$ is what you get when you put $a$ in place of $x$. Careful with negative numbers: put them in brackets. $P(-2)=2(-2)^{3}-5(-2)+1=-16+10+1=-5$.'
        ),
        problem: say('$P(x)=x^{2}-3x+4$. Kalkulatu $P(-1)$.', '$P(x)=x^{2}-3x+4$. Calcula $P(-1)$.', '$P(x)=x^{2}-3x+4$. احسب $P(-1)$.', '$P(x)=x^{2}-3x+4$. Work out $P(-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatu, parentesiekin.', 'Sustituye, con paréntesis.', 'عوّض بالأقواس.', 'Substitute, with brackets.'), math: same('$P(-1)=(-1)^{2}-3\\cdot(-1)+4$') },
            { text: say('Berreturak eta biderketak.', 'Potencias y productos.', 'القوى والضرب.', 'Powers and products.'), math: same('$1+3+4$') },
            { text: say('Batu.', 'Suma.', 'اجمع.', 'Add.'), math: same('$P(-1)=8$') }
        ],
        example: same('$Q(x)=3x^{2}-x\\ \\to\\ Q(2)=12-2=10$'),
        mistake: {
            wrong: say('$P(x)=x^{2}-3x+4$ bada, $P(-1)=-1^{2}-3\\cdot -1+4=0$.', 'Si $P(x)=x^{2}-3x+4$, $P(-1)=-1^{2}-3\\cdot -1+4=0$.', 'إذا كان $P(x)=x^{2}-3x+4$ فإن $P(-1)=-1^{2}-3\\cdot -1+4=0$.', 'If $P(x)=x^{2}-3x+4$, then $P(-1)=-1^{2}-3\\cdot -1+4=0$.'),
            right: say('Parentesirik gabe, $-1^{2}=-1$ da, eta hori ez da $(-1)^{2}=1$. Zuzena: $P(-1)=8$.', 'Sin paréntesis, $-1^{2}=-1$, que no es $(-1)^{2}=1$. Lo correcto: $P(-1)=8$.', 'بلا أقواس $-1^{2}=-1$ وهذا ليس $(-1)^{2}=1$. الصحيح: $P(-1)=8$.', 'Without brackets, $-1^{2}=-1$, which is not $(-1)^{2}=1$. Correct: $P(-1)=8$.')
        },
        takeaway: say('$P(A)$: jarri $A$ parentesi artean $X$ letraren ordez.', '$P(A)$: pon $A$ entre paréntesis en lugar de $X$.', '$P(A)$: ضع $A$ بين قوسين مكان $X$.', '$P(A)$: put $A$ in brackets in place of $X$.'),
        figure: (language) => <RemainderFigure language={language} />
    },

    /* ---------- 2. Operations ---------- */
    {
        id: 'add-sub',
        stage: 'operations',
        title: say('Polinomioak batu eta kendu', 'Suma y resta de polinomios', 'جمع كثيرات الحدود وطرحها', 'Adding and subtracting polynomials'),
        goal: say('Polinomioak batzea eta kentzea, antzeko gaiak elkartuz eta kenketaren zeinuak ondo aldatuz.', 'Sumar y restar polinomios agrupando términos semejantes y cambiando bien los signos en la resta.', 'جمع كثيرات الحدود وطرحها بجمع الحدود المتشابهة وتغيير الإشارات جيدًا في الطرح.', 'Add and subtract polynomials by grouping like terms and changing the signs correctly when subtracting.'),
        explanation: say(
            'Bi polinomio batzeko, batu maila bereko gaiak. Kentzeko, kendu behar den polinomioaren gai guztien zeinua aldatu eta gero batu: $P-Q=P+(-Q)$. Lagungarria da polinomioak bata bestearen azpian idaztea, maila bereko gaiak zutabe berean, eta falta den maila baterako hutsune bat uztea.',
            'Para sumar dos polinomios se suman los términos del mismo grado. Para restar, se cambia el signo de todos los términos del polinomio que se resta y después se suma: $P-Q=P+(-Q)$. Ayuda escribirlos uno debajo del otro, con los términos del mismo grado en la misma columna, dejando hueco si falta algún grado.',
            'لجمع كثيري حدود نجمع الحدود من الدرجة نفسها. وللطرح نغيّر إشارة كل حدود كثير الحدود المطروح ثم نجمع: $P-Q=P+(-Q)$. ويساعد أن نكتب أحدهما تحت الآخر والحدود من الدرجة نفسها في العمود نفسه، مع ترك فراغ إذا نقصت درجة.',
            'To add two polynomials, add the terms of the same degree. To subtract, change the sign of every term of the polynomial being subtracted and then add: $P-Q=P+(-Q)$. It helps to write them one under the other, with terms of the same degree in the same column, leaving a gap if a degree is missing.'
        ),
        problem: same('$(3x^{2}-2x+5)-(x^{2}+4x-1)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldatu kentzen denaren zeinu guztiak.', 'Cambia todos los signos del que se resta.', 'غيّر كل إشارات المطروح.', 'Change all the signs of the one being subtracted.'), math: same('$3x^{2}-2x+5-x^{2}-4x+1$') },
            { text: say('Elkartu antzekoak.', 'Agrupa semejantes.', 'اجمع المتشابهة.', 'Group like terms.'), math: same('$(3-1)x^{2}+(-2-4)x+(5+1)$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$2x^{2}-6x+6$') }
        ],
        example: same('$(x^{3}+2x)+(4x^{2}-2x)=x^{3}+4x^{2}$'),
        mistake: {
            wrong: say('$(3x^{2}-2x+5)-(x^{2}+4x-1)=2x^{2}+2x+4$', '$(3x^{2}-2x+5)-(x^{2}+4x-1)=2x^{2}+2x+4$', '$(3x^{2}-2x+5)-(x^{2}+4x-1)=2x^{2}+2x+4$', '$(3x^{2}-2x+5)-(x^{2}+4x-1)=2x^{2}+2x+4$'),
            right: say('Lehen gaiaren zeinua bakarrik aldatu da. Kenketak gai guztiei eragiten die: $2x^{2}-6x+6$.', 'Solo se cambió el signo del primer término. La resta afecta a todos: $2x^{2}-6x+6$.', 'غُيّرت إشارة الحد الأول فقط. الطرح يؤثر في كل الحدود: $2x^{2}-6x+6$.', 'Only the sign of the first term was changed. Subtraction affects every term: $2x^{2}-6x+6$.')
        },
        takeaway: say('Kendu = aldatu zeinu GUZTIAK eta batu: $P-Q=P+(-Q)$.', 'Restar = cambiar TODOS los signos y sumar: $P-Q=P+(-Q)$.', 'الطرح = تغيير كل الإشارات ثم الجمع: $P-Q=P+(-Q)$.', 'Subtracting = change ALL the signs and add: $P-Q=P+(-Q)$.'),
        figure: (language) => <PolynomialFigure language={language} />
    },
    {
        id: 'product',
        stage: 'operations',
        title: say('Polinomioak biderkatu', 'Producto de polinomios', 'ضرب كثيرات الحدود', 'Multiplying polynomials'),
        goal: say('Polinomioak biderkatzea, gai bakoitza beste polinomioaren gai guztiez biderkatuz.', 'Multiplicar polinomios multiplicando cada término por todos los del otro.', 'ضرب كثيرات الحدود بضرب كل حد في كل حدود الآخر.', 'Multiply polynomials by multiplying each term by every term of the other.'),
        explanation: say(
            'Bi polinomio biderkatzeko, lehenengoaren gai bakoitza bigarrenaren gai guztiez biderkatzen da (banatze-propietatea), eta gero antzekoak laburtzen dira. Laukizuzen baten azalera bezala ikus daiteke: $(x+3)(x+2)$ laukizuzena lau zatitan banatzen da, $x^{2}$, $2x$, $3x$ eta $6$. Bi gaiko bi polinomiok lau biderkadura ematen dituzte, nahiz eta gero batzuk batu.',
            'Para multiplicar dos polinomios se multiplica cada término del primero por todos los del segundo (propiedad distributiva) y después se reducen los semejantes. Se puede ver como el área de un rectángulo: el de $(x+3)(x+2)$ se divide en cuatro trozos, $x^{2}$, $2x$, $3x$ y $6$. Dos binomios dan cuatro productos, aunque luego algunos se sumen.',
            'لضرب كثيري حدود نضرب كل حد من الأول في كل حدود الثاني (خاصية التوزيع) ثم نختصر المتشابهة. ويمكن رؤيته كمساحة مستطيل: مستطيل $(x+3)(x+2)$ ينقسم إلى أربع قطع $x^{2}$ و$2x$ و$3x$ و$6$. وثنائيا حد يعطيان أربعة حواصل ضرب وإن جُمع بعضها لاحقًا.',
            'To multiply two polynomials, multiply each term of the first by every term of the second (the distributive property) and then collect like terms. You can see it as the area of a rectangle: the one for $(x+3)(x+2)$ splits into four pieces, $x^{2}$, $2x$, $3x$ and $6$. Two binomials give four products, even if some are added afterwards.'
        ),
        problem: same('$(2x-1)(x^{2}+3x-4)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('$2x$ bider gai guztiak.', '$2x$ por todos los términos.', '$2x$ في كل الحدود.', '$2x$ times every term.'), math: same('$2x^{3}+6x^{2}-8x$') },
            { text: say('$-1$ bider gai guztiak.', '$-1$ por todos los términos.', '$-1$ في كل الحدود.', '$-1$ times every term.'), math: same('$-x^{2}-3x+4$') },
            { text: say('Batu antzekoak.', 'Suma los semejantes.', 'اجمع المتشابهة.', 'Add like terms.'), math: same('$2x^{3}+5x^{2}-11x+4$') }
        ],
        example: same('$(x+3)(x+2)=x^{2}+5x+6$'),
        mistake: {
            wrong: say('$(x+3)(x+2)=x^{2}+6$', '$(x+3)(x+2)=x^{2}+6$', '$(x+3)(x+2)=x^{2}+6$', '$(x+3)(x+2)=x^{2}+6$'),
            right: say('Lehenengoak lehenengoarekin eta azkenak azkenarekin bakarrik biderkatu dira. Lau biderkadura daude: $x^{2}+2x+3x+6$.', 'Solo se multiplicaron primero con primero y último con último. Son cuatro productos: $x^{2}+2x+3x+6$.', 'ضُرب الأول في الأول والأخير في الأخير فقط. هناك أربعة حواصل: $x^{2}+2x+3x+6$.', 'Only first times first and last times last were multiplied. There are four products: $x^{2}+2x+3x+6$.')
        },
        takeaway: say('Gai bakoitza bider GAI GUZTIAK: bi binomiok 4 biderkadura.', 'Cada término por TODOS: dos binomios, 4 productos.', 'كل حد في كل الحدود: ثنائيا حد يعطيان 4 حواصل.', 'Each term times ALL of them: two binomials, 4 products.'),
        figure: (language) => <ProductAreaFigure language={language} />
    },
    {
        id: 'division',
        stage: 'operations',
        title: say('Polinomioak zatitu', 'División de polinomios', 'قسمة كثيرات الحدود', 'Dividing polynomials'),
        goal: say('Polinomio bat beste batez zatitzea eta zatidura eta hondarra lortzea.', 'Dividir un polinomio entre otro y obtener el cociente y el resto.', 'قسمة كثير حدود على آخر والحصول على خارج القسمة والباقي.', 'Divide one polynomial by another and find the quotient and the remainder.'),
        explanation: say(
            'Zenbakiekin bezala zatitzen da: zatikizunaren lehen gaia zatitu zatitzailearen lehen gaiaz, biderkatu zatitzaile osoa emaitza horrekin eta kendu. Errepikatu hondarraren maila zatitzailearena baino txikiagoa izan arte. Amaieran, $P(x)=Q(x)\\cdot C(x)+R(x)$. Hondarra 0 bada, zatiketa zehatza da eta $Q$ zatitzaile bat da. Falta diren mailak zeroz bete behar dira zatikizunean.',
            'Se divide como con números: el primer término del dividendo entre el primero del divisor, se multiplica todo el divisor por ese resultado y se resta. Se repite hasta que el resto tenga grado menor que el divisor. Al final, $P(x)=Q(x)\\cdot C(x)+R(x)$. Si el resto es 0, la división es exacta y $Q$ es un divisor. En el dividendo hay que rellenar con ceros los grados que falten.',
            'نقسم كما في الأعداد: الحد الأول من المقسوم على الحد الأول من المقسوم عليه، ثم نضرب المقسوم عليه كله في الناتج ونطرح. ونكرر حتى تصير درجة الباقي أصغر من درجة المقسوم عليه. وفي النهاية $P(x)=Q(x)\\cdot C(x)+R(x)$. إذا كان الباقي 0 فالقسمة تامة و$Q$ قاسم. ويجب ملء الدرجات الناقصة في المقسوم بالأصفار.',
            'You divide as with numbers: the first term of the dividend by the first term of the divisor, multiply the whole divisor by that result and subtract. Repeat until the remainder has a lower degree than the divisor. At the end, $P(x)=Q(x)\\cdot C(x)+R(x)$. If the remainder is 0, the division is exact and $Q$ is a divisor. In the dividend, fill any missing degrees with zeros.'
        ),
        problem: same('$(x^{2}+5x+7):(x+2)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x^{2}$ zati $x$: $x$. Biderkatu eta kendu.', '$x^{2}$ entre $x$: $x$. Multiplica y resta.', '$x^{2}$ على $x$: $x$. اضرب واطرح.', '$x^{2}$ divided by $x$: $x$. Multiply and subtract.'), math: same('$x^{2}+5x+7-(x^{2}+2x)=3x+7$') },
            { text: say('$3x$ zati $x$: $3$. Biderkatu eta kendu.', '$3x$ entre $x$: $3$. Multiplica y resta.', '$3x$ على $x$: $3$. اضرب واطرح.', '$3x$ divided by $x$: $3$. Multiply and subtract.'), math: same('$3x+7-(3x+6)=1$') },
            { text: say('Zatidura eta hondarra.', 'Cociente y resto.', 'الخارج والباقي.', 'Quotient and remainder.'), math: same('$C=x+3,\\ R=1$') }
        ],
        example: same('$x^{2}+5x+7=(x+2)(x+3)+1$'),
        mistake: {
            wrong: say('$(x^{3}+1):(x+1)$ zatitzean, $x^{3}+1$ zuzenean idatzi da, $x^{2}$ eta $x$ gaien hutsunerik gabe.', 'Al dividir $(x^{3}+1):(x+1)$ se escribió $x^{3}+1$ tal cual, sin huecos para $x^{2}$ y $x$.', 'عند قسمة $(x^{3}+1):(x+1)$ كُتب $x^{3}+1$ كما هو دون فراغ لـ $x^{2}$ و$x$.', 'When dividing $(x^{3}+1):(x+1)$, $x^{3}+1$ was written as it is, with no gaps for $x^{2}$ and $x$.'),
            right: say('Bete falta diren mailak zeroz: $x^{3}+0x^{2}+0x+1$. Bestela zutabeak nahasten dira.', 'Rellena con ceros los grados que faltan: $x^{3}+0x^{2}+0x+1$. Si no, se mezclan las columnas.', 'املأ الدرجات الناقصة بالأصفار: $x^{3}+0x^{2}+0x+1$. وإلا اختلطت الأعمدة.', 'Fill the missing degrees with zeros: $x^{3}+0x^{2}+0x+1$. Otherwise the columns get mixed up.')
        },
        takeaway: say('$P=Q\\cdot C+R$, $R$ zatitzailea baino maila txikiagokoa.', '$P=Q\\cdot C+R$, con $R$ de grado menor que el divisor.', '$P=Q\\cdot C+R$ ودرجة $R$ أصغر من درجة المقسوم عليه.', '$P=Q\\cdot C+R$, with $R$ of lower degree than the divisor.'),
        figure: (language) => <LongDivisionFigure language={language} />
    },

    /* ---------- 3. Special products ---------- */
    {
        id: 'square-sum',
        stage: 'identities',
        title: say('Batura baten karratua', 'Cuadrado de una suma', 'مربع مجموع', 'The square of a sum'),
        goal: say('$(a+b)^{2}=a^{2}+2ab+b^{2}$ erabiltzea biderketa egin gabe.', 'Usar $(a+b)^{2}=a^{2}+2ab+b^{2}$ sin hacer el producto.', 'استعمال $(a+b)^{2}=a^{2}+2ab+b^{2}$ دون إجراء الضرب.', 'Use $(a+b)^{2}=a^{2}+2ab+b^{2}$ without doing the multiplication.'),
        explanation: say(
            'Aldea $a+b$ duen karratu bat lau zatitan banatzen da: $a^{2}$ karratua, $b^{2}$ karratua eta $ab$ azalerako bi laukizuzen. Horregatik $(a+b)^{2}=a^{2}+2ab+b^{2}$: lehenengoaren karratua, gehi lehenengoaren eta bigarrenaren biderkaduraren bikoitza, gehi bigarrenaren karratua. Identitate hau buruz jakiteak denbora aurrezten du: $(x+5)^{2}=x^{2}+10x+25$.',
            'Un cuadrado de lado $a+b$ se divide en cuatro trozos: el cuadrado $a^{2}$, el cuadrado $b^{2}$ y dos rectángulos de área $ab$. Por eso $(a+b)^{2}=a^{2}+2ab+b^{2}$: el cuadrado del primero, más el doble del primero por el segundo, más el cuadrado del segundo. Saberla de memoria ahorra tiempo: $(x+5)^{2}=x^{2}+10x+25$.',
            'ينقسم مربع ضلعه $a+b$ إلى أربع قطع: المربع $a^{2}$ والمربع $b^{2}$ ومستطيلان مساحة كل منهما $ab$. لذلك $(a+b)^{2}=a^{2}+2ab+b^{2}$: مربع الأول زائد ضعف حاصل ضرب الأول في الثاني زائد مربع الثاني. وحفظها يوفّر الوقت: $(x+5)^{2}=x^{2}+10x+25$.',
            'A square with side $a+b$ splits into four pieces: the square $a^{2}$, the square $b^{2}$ and two rectangles of area $ab$. That is why $(a+b)^{2}=a^{2}+2ab+b^{2}$: the square of the first, plus twice the first times the second, plus the square of the second. Knowing it by heart saves time: $(x+5)^{2}=x^{2}+10x+25$.'
        ),
        problem: same('$(3x+2)^{2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoaren karratua.', 'El cuadrado del primero.', 'مربع الأول.', 'The square of the first.'), math: same('$(3x)^{2}=9x^{2}$') },
            { text: say('Bikoitza bider lehenengoa bider bigarrena.', 'El doble del primero por el segundo.', 'ضعف الأول في الثاني.', 'Twice the first times the second.'), math: same('$2\\cdot 3x\\cdot 2=12x$') },
            { text: say('Bigarrenaren karratua, eta batu.', 'El cuadrado del segundo, y suma.', 'مربع الثاني ثم اجمع.', 'The square of the second, and add.'), math: same('$9x^{2}+12x+4$') }
        ],
        example: same('$(x+5)^{2}=x^{2}+10x+25$'),
        mistake: {
            wrong: say('$(x+5)^{2}=x^{2}+25$', '$(x+5)^{2}=x^{2}+25$', '$(x+5)^{2}=x^{2}+25$', '$(x+5)^{2}=x^{2}+25$'),
            right: say('Bi laukizuzenak falta dira: $2\\cdot x\\cdot 5=10x$. $(x+5)^{2}=x^{2}+10x+25$.', 'Faltan los dos rectángulos: $2\\cdot x\\cdot 5=10x$. $(x+5)^{2}=x^{2}+10x+25$.', 'ينقص المستطيلان: $2\\cdot x\\cdot 5=10x$. $(x+5)^{2}=x^{2}+10x+25$.', 'The two rectangles are missing: $2\\cdot x\\cdot 5=10x$. $(x+5)^{2}=x^{2}+10x+25$.')
        },
        takeaway: say('$(A+B)^{2}=A^{2}+2AB+B^{2}$, ez $A^{2}+B^{2}$.', '$(A+B)^{2}=A^{2}+2AB+B^{2}$, no $A^{2}+B^{2}$.', '$(A+B)^{2}=A^{2}+2AB+B^{2}$ لا $A^{2}+B^{2}$.', '$(A+B)^{2}=A^{2}+2AB+B^{2}$, not $A^{2}+B^{2}$.'),
        figure: (language) => <SquareSumFigure language={language} />
    },
    {
        id: 'square-diff',
        stage: 'identities',
        title: say('Kendura baten karratua', 'Cuadrado de una diferencia', 'مربع فرق', 'The square of a difference'),
        goal: say('$(a-b)^{2}=a^{2}-2ab+b^{2}$ erabiltzea, zeinuak ondo jarriz.', 'Usar $(a-b)^{2}=a^{2}-2ab+b^{2}$ poniendo bien los signos.', 'استعمال $(a-b)^{2}=a^{2}-2ab+b^{2}$ مع ضبط الإشارات.', 'Use $(a-b)^{2}=a^{2}-2ab+b^{2}$ with the signs right.'),
        explanation: say(
            'Kendura baten karratuak batura batenak bezala hiru gai ditu, baina erdikoa negatiboa da: $(a-b)^{2}=a^{2}-2ab+b^{2}$. Azkena beti positiboa da, $(-b)^{2}=b^{2}$ delako. Hiru gai horiek hiru zeinu dituzte: $+$, $-$, $+$. Adibidez, $(x-4)^{2}=x^{2}-8x+16$.',
            'El cuadrado de una diferencia tiene tres términos, como el de una suma, pero el del medio es negativo: $(a-b)^{2}=a^{2}-2ab+b^{2}$. El último siempre es positivo, porque $(-b)^{2}=b^{2}$. Los signos son $+$, $-$, $+$. Por ejemplo, $(x-4)^{2}=x^{2}-8x+16$.',
            'لمربع الفرق ثلاثة حدود كمربع المجموع، لكن الحد الأوسط سالب: $(a-b)^{2}=a^{2}-2ab+b^{2}$. والأخير موجب دائمًا لأن $(-b)^{2}=b^{2}$. والإشارات $+$ ثم $-$ ثم $+$. مثلًا $(x-4)^{2}=x^{2}-8x+16$.',
            'The square of a difference has three terms, like that of a sum, but the middle one is negative: $(a-b)^{2}=a^{2}-2ab+b^{2}$. The last one is always positive, because $(-b)^{2}=b^{2}$. The signs are $+$, $-$, $+$. For example, $(x-4)^{2}=x^{2}-8x+16$.'
        ),
        problem: same('$(2x-5)^{2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoaren karratua.', 'El cuadrado del primero.', 'مربع الأول.', 'The square of the first.'), math: same('$4x^{2}$') },
            { text: say('Ken bikoitza bider biak.', 'Menos el doble por los dos.', 'ناقص ضعف حاصل ضربهما.', 'Minus twice the two.'), math: same('$-2\\cdot 2x\\cdot 5=-20x$') },
            { text: say('Gehi bigarrenaren karratua.', 'Más el cuadrado del segundo.', 'زائد مربع الثاني.', 'Plus the square of the second.'), math: same('$4x^{2}-20x+25$') }
        ],
        example: same('$(x-4)^{2}=x^{2}-8x+16$'),
        mistake: {
            wrong: say('$(x-4)^{2}=x^{2}-8x-16$', '$(x-4)^{2}=x^{2}-8x-16$', '$(x-4)^{2}=x^{2}-8x-16$', '$(x-4)^{2}=x^{2}-8x-16$'),
            right: say('Azkena karratu bat da: $(-4)^{2}=16$, positiboa. $x^{2}-8x+16$.', 'El último es un cuadrado: $(-4)^{2}=16$, positivo. $x^{2}-8x+16$.', 'الأخير مربع: $(-4)^{2}=16$ موجب. $x^{2}-8x+16$.', 'The last term is a square: $(-4)^{2}=16$, positive. $x^{2}-8x+16$.')
        },
        takeaway: say('$(A-B)^{2}=A^{2}-2AB+B^{2}$: zeinuak $+\\ -\\ +$.', '$(A-B)^{2}=A^{2}-2AB+B^{2}$: signos $+\\ -\\ +$.', '$(A-B)^{2}=A^{2}-2AB+B^{2}$: الإشارات $+\\ -\\ +$.', '$(A-B)^{2}=A^{2}-2AB+B^{2}$: signs $+\\ -\\ +$.'),
        figure: (language) => <SquareDifferenceFigure language={language} />
    },
    {
        id: 'sum-diff',
        stage: 'identities',
        title: say('Batura bider kendura', 'Suma por diferencia', 'مجموع في فرق', 'Sum times difference'),
        goal: say('$(a+b)(a-b)=a^{2}-b^{2}$ erabiltzea, kalkuluak errazteko ere.', 'Usar $(a+b)(a-b)=a^{2}-b^{2}$, también para hacer cálculos más fáciles.', 'استعمال $(a+b)(a-b)=a^{2}-b^{2}$ وكذلك لتسهيل الحساب.', 'Use $(a+b)(a-b)=a^{2}-b^{2}$, also to make calculations easier.'),
        explanation: say(
            'Batura bat bider kendura bera biderkatzean, erdiko bi gaiak, $+ab$ eta $-ab$, ezeztatu egiten dira: $(a+b)(a-b)=a^{2}-ab+ab-b^{2}=a^{2}-b^{2}$. Karratuen kendura geratzen da. Kalkulu mentalean ere balio du: $21\\cdot 19=(20+1)(20-1)=400-1=399$. Alderantziz ere erabiltzen da faktorizatzeko: $x^{2}-9=(x+3)(x-3)$.',
            'Al multiplicar una suma por la misma diferencia, los dos términos del medio, $+ab$ y $-ab$, se anulan: $(a+b)(a-b)=a^{2}-ab+ab-b^{2}=a^{2}-b^{2}$. Queda una diferencia de cuadrados. Sirve también para el cálculo mental: $21\\cdot 19=(20+1)(20-1)=400-1=399$. Y al revés, para factorizar: $x^{2}-9=(x+3)(x-3)$.',
            'عند ضرب مجموع في الفرق نفسه يلغي الحدان الأوسطان $+ab$ و$-ab$ أحدهما الآخر: $(a+b)(a-b)=a^{2}-ab+ab-b^{2}=a^{2}-b^{2}$. ويبقى فرق مربعين. وينفع في الحساب الذهني: $21\\cdot 19=(20+1)(20-1)=400-1=399$. وبالعكس للتحليل: $x^{2}-9=(x+3)(x-3)$.',
            'When you multiply a sum by the same difference, the two middle terms, $+ab$ and $-ab$, cancel out: $(a+b)(a-b)=a^{2}-ab+ab-b^{2}=a^{2}-b^{2}$. A difference of two squares is left. It also helps with mental arithmetic: $21\\cdot 19=(20+1)(20-1)=400-1=399$. And the other way round, to factorise: $x^{2}-9=(x+3)(x-3)$.'
        ),
        problem: same('$(3x+4)(3x-4)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batura bider kendura: karratuen kendura.', 'Suma por diferencia: diferencia de cuadrados.', 'مجموع في فرق: فرق مربعين.', 'Sum times difference: difference of squares.'), math: same('$(3x)^{2}-4^{2}$') },
            { text: say('Karratuak.', 'Los cuadrados.', 'المربعان.', 'The squares.'), math: same('$9x^{2}-16$') },
            { text: say('Erdiko gaiak ezeztatu dira.', 'Los términos del medio se anularon.', 'ألغى الحدان الأوسطان أحدهما الآخر.', 'The middle terms cancelled out.') }
        ],
        example: same('$21\\cdot 19=20^{2}-1^{2}=399$'),
        mistake: {
            wrong: say('$(x+3)(x-3)=x^{2}+9$', '$(x+3)(x-3)=x^{2}+9$', '$(x+3)(x-3)=x^{2}+9$', '$(x+3)(x-3)=x^{2}+9$'),
            right: say('Azkena $3\\cdot(-3)=-9$ da. Karratuen kendura: $x^{2}-9$.', 'El último es $3\\cdot(-3)=-9$. Diferencia de cuadrados: $x^{2}-9$.', 'الأخير $3\\cdot(-3)=-9$. فرق مربعين: $x^{2}-9$.', 'The last term is $3\\cdot(-3)=-9$. Difference of squares: $x^{2}-9$.')
        },
        takeaway: say('$(A+B)(A-B)=A^{2}-B^{2}$', '$(A+B)(A-B)=A^{2}-B^{2}$', '$(A+B)(A-B)=A^{2}-B^{2}$', '$(A+B)(A-B)=A^{2}-B^{2}$'),
        figure: (language) => <SumDifferenceFigure language={language} />
    },

    /* ---------- 4. Ruffini and roots ---------- */
    {
        id: 'ruffini',
        stage: 'ruffini',
        title: say('Ruffiniren erregela', 'Regla de Ruffini', 'قاعدة روفيني', 'Ruffini\'s rule'),
        goal: say('$x-a$ motako polinomio batez zatitzea Ruffiniren taularekin.', 'Dividir entre un polinomio de la forma $x-a$ con la tabla de Ruffini.', 'القسمة على كثير حدود من الشكل $x-a$ بجدول روفيني.', 'Divide by a polynomial of the form $x-a$ with Ruffini\'s table.'),
        explanation: say(
            'Zatitzailea $x-a$ denean, zatiketa laburtu egin daiteke koefizienteekin bakarrik lan eginez. Idatzi zatikizunaren koefiziente guztiak (zeroak barne), eta ezkerrean $a$. Jaitsi lehen koefizientea; gero errepikatu: biderkatu $a$ zenbakiaz, idatzi hurrengo zutabean eta batu. Azken zenbakia hondarra da, eta aurrekoak zatiduraren koefizienteak (maila bat txikiagoa). Kontuz: $x+3$ zatitzeko, $a=-3$.',
            'Cuando el divisor es $x-a$, la división se acorta trabajando solo con los coeficientes. Se escriben todos los coeficientes del dividendo (con los ceros) y $a$ a la izquierda. Se baja el primer coeficiente y se repite: multiplicar por $a$, escribir en la columna siguiente y sumar. El último número es el resto, y los anteriores, los coeficientes del cociente (un grado menos). Cuidado: para dividir entre $x+3$, $a=-3$.',
            'عندما يكون المقسوم عليه $x-a$ تختصر القسمة بالعمل بالمعاملات فقط. نكتب كل معاملات المقسوم (مع الأصفار) و$a$ إلى اليسار. ننزل المعامل الأول ثم نكرر: نضرب في $a$ ونكتب في العمود التالي ونجمع. آخر عدد هو الباقي، وما قبله معاملات الخارج (بدرجة أقل بواحد). انتبه: للقسمة على $x+3$ يكون $a=-3$.',
            'When the divisor is $x-a$, the division can be shortened by working with the coefficients only. Write all the coefficients of the dividend (including zeros) and $a$ on the left. Bring down the first coefficient, then repeat: multiply by $a$, write it in the next column and add. The last number is the remainder, and the ones before it are the coefficients of the quotient (one degree lower). Careful: to divide by $x+3$, $a=-3$.'
        ),
        problem: same('$(2x^{3}-3x^{2}+0x+5):(x-2)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Koefizienteak eta $a=2$. Jaitsi 2.', 'Coeficientes y $a=2$. Baja el 2.', 'المعاملات و$a=2$. أنزل 2.', 'Coefficients and $a=2$. Bring down the 2.'), math: same('$2\\quad -3\\quad 0\\quad 5$') },
            { text: say('Biderkatu eta batu, behin eta berriz.', 'Multiplica y suma, una y otra vez.', 'اضرب واجمع مرة بعد مرة.', 'Multiply and add, again and again.'), math: same('$2\\cdot 2-3=1\\quad 1\\cdot 2+0=2\\quad 2\\cdot 2+5=9$') },
            { text: say('Zatidura eta hondarra.', 'Cociente y resto.', 'الخارج والباقي.', 'Quotient and remainder.'), math: same('$C=2x^{2}+x+2,\\ R=9$') }
        ],
        example: same('$(x^{2}-5x+6):(x-3)\\ \\to\\ C=x-2,\\ R=0$'),
        mistake: {
            wrong: say('$(x^{2}+2x-3):(x+3)$ zatitzeko, $a=3$ jarri da taulan.', 'Para dividir $(x^{2}+2x-3):(x+3)$ se puso $a=3$ en la tabla.', 'للقسمة $(x^{2}+2x-3):(x+3)$ وُضع $a=3$ في الجدول.', 'To divide $(x^{2}+2x-3):(x+3)$, $a=3$ was put in the table.'),
            right: say('$x+3=x-(-3)$, beraz $a=-3$. Horrela hondarra 0 da.', '$x+3=x-(-3)$, así que $a=-3$. Así el resto es 0.', '$x+3=x-(-3)$ إذن $a=-3$. وبذلك الباقي 0.', '$x+3=x-(-3)$, so $a=-3$. Then the remainder is 0.')
        },
        takeaway: say('$X-A$ zatitzailea: taulan $A$. $X+3$ bada, $A=-3$.', 'Divisor $X-A$: en la tabla, $A$. Si es $X+3$, $A=-3$.', 'المقسوم عليه $X-A$: في الجدول $A$. وإذا كان $X+3$ فإن $A=-3$.', 'Divisor $X-A$: $A$ in the table. If it is $X+3$, $A=-3$.'),
        figure: (language) => <RuffiniFigure language={language} />
    },
    {
        id: 'remainder',
        stage: 'ruffini',
        title: say('Hondarraren teorema', 'Teorema del resto', 'مبرهنة الباقي', 'The remainder theorem'),
        goal: say('$P(x)$ zati $x-a$ egitean hondarra $P(a)$ dela erabiltzea.', 'Usar que el resto de dividir $P(x)$ entre $x-a$ es $P(a)$.', 'استعمال أن باقي قسمة $P(x)$ على $x-a$ هو $P(a)$.', 'Use the fact that the remainder of dividing $P(x)$ by $x-a$ is $P(a)$.'),
        explanation: say(
            '$P(x)=(x-a)\\cdot C(x)+R$ bada eta $x=a$ ordezkatzen bada, $(a-a)\\cdot C(a)=0$ da, eta $P(a)=R$ geratzen da. Beraz, ez dago zatitu beharrik hondarra jakiteko: nahikoa da zenbakizko balioa kalkulatzea. Alderantziz ere: Ruffiniren azken zenbakiak $P(a)$ ematen du. $P(a)=0$ bada, zatiketa zehatza da eta $x-a$ polinomioaren faktore bat da.',
            'Si $P(x)=(x-a)\\cdot C(x)+R$ y se sustituye $x=a$, queda $(a-a)\\cdot C(a)=0$, y por tanto $P(a)=R$. Así que no hace falta dividir para saber el resto: basta con calcular el valor numérico. Y al revés: el último número de Ruffini da $P(a)$. Si $P(a)=0$, la división es exacta y $x-a$ es un factor del polinomio.',
            'إذا كان $P(x)=(x-a)\\cdot C(x)+R$ وعوّضنا $x=a$ يصير $(a-a)\\cdot C(a)=0$ ويبقى $P(a)=R$. إذن لا حاجة للقسمة لمعرفة الباقي: يكفي حساب القيمة العددية. وبالعكس: آخر عدد في روفيني يعطي $P(a)$. وإذا كان $P(a)=0$ فالقسمة تامة و$x-a$ عامل من عوامل كثير الحدود.',
            'If $P(x)=(x-a)\\cdot C(x)+R$ and you substitute $x=a$, you get $(a-a)\\cdot C(a)=0$, so $P(a)=R$. So you do not need to divide to find the remainder: working out the value is enough. And the other way round: the last number in Ruffini\'s table gives $P(a)$. If $P(a)=0$, the division is exact and $x-a$ is a factor of the polynomial.'
        ),
        problem: say('Zein da $x^{3}-2x+4$ zati $x+1$ egitean geratzen den hondarra?', '¿Cuál es el resto de dividir $x^{3}-2x+4$ entre $x+1$?', 'ما باقي قسمة $x^{3}-2x+4$ على $x+1$؟', 'What is the remainder when $x^{3}-2x+4$ is divided by $x+1$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x+1=x-(-1)$: $a=-1$.', '$x+1=x-(-1)$: $a=-1$.', '$x+1=x-(-1)$: $a=-1$.', '$x+1=x-(-1)$: $a=-1$.') },
            { text: say('Kalkulatu $P(-1)$.', 'Calcula $P(-1)$.', 'احسب $P(-1)$.', 'Work out $P(-1)$.'), math: same('$(-1)^{3}-2\\cdot(-1)+4$') },
            { text: say('Hondarra.', 'El resto.', 'الباقي.', 'The remainder.'), math: same('$-1+2+4=5$') }
        ],
        example: same('$P(x)=x^{2}-4\\ \\to\\ P(2)=0$'),
        mistake: {
            wrong: say('$x^{3}-2x+4$ zati $x+1$: hondarra $P(1)=3$.', '$x^{3}-2x+4$ entre $x+1$: el resto es $P(1)=3$.', '$x^{3}-2x+4$ على $x+1$: الباقي $P(1)=3$.', '$x^{3}-2x+4$ divided by $x+1$: the remainder is $P(1)=3$.'),
            right: say('$x+1$ zatitzailearekin $a=-1$ da: hondarra $P(-1)=5$.', 'Con el divisor $x+1$, $a=-1$: el resto es $P(-1)=5$.', 'مع المقسوم عليه $x+1$ يكون $a=-1$: الباقي $P(-1)=5$.', 'With the divisor $x+1$, $a=-1$: the remainder is $P(-1)=5$.')
        },
        takeaway: say('$P(X):(X-A)$ eragiketaren hondarra $=P(A)$.', 'Resto de $P(X):(X-A)$ $=P(A)$.', 'باقي $P(X):(X-A)$ $=P(A)$.', 'Remainder of $P(X):(X-A)$ $=P(A)$.'),
        figure: (language) => <RemainderFigure language={language} />
    },
    {
        id: 'roots',
        stage: 'ruffini',
        title: say('Polinomio baten erroak', 'Raíces de un polinomio', 'جذور كثير حدود', 'Roots of a polynomial'),
        goal: say('Polinomio baten erro osoak gai askearen zatitzaileen artean bilatzea.', 'Buscar las raíces enteras de un polinomio entre los divisores del término independiente.', 'البحث عن الجذور الصحيحة لكثير حدود بين قواسم الحد الثابت.', 'Look for the whole-number roots of a polynomial among the divisors of the constant term.'),
        explanation: say(
            '$a$ zenbakia $P(x)$ polinomioaren erroa da $P(a)=0$ bada. Koefiziente osoak dituen polinomio batean, erro osoak gai askearen zatitzaileak dira (positiboak eta negatiboak). Adibidez, $x^{2}-x-6$ polinomioan, gai askea $-6$ da, eta probatu behar dira $\\pm 1,\\pm 2,\\pm 3,\\pm 6$. $P(3)=0$ eta $P(-2)=0$: horiek dira erroak. Gai askea 0 bada, $x=0$ erroa da.',
            'Un número $a$ es raíz de $P(x)$ si $P(a)=0$. En un polinomio de coeficientes enteros, las raíces enteras son divisores del término independiente (positivos y negativos). Por ejemplo, en $x^{2}-x-6$ el término independiente es $-6$, y se prueban $\\pm 1,\\pm 2,\\pm 3,\\pm 6$. $P(3)=0$ y $P(-2)=0$: esas son las raíces. Si el término independiente es 0, $x=0$ es raíz.',
            'العدد $a$ جذر لـ $P(x)$ إذا كان $P(a)=0$. وفي كثير حدود معاملاته صحيحة تكون الجذور الصحيحة من قواسم الحد الثابت (الموجبة والسالبة). مثلًا في $x^{2}-x-6$ الحد الثابت $-6$ ونجرب $\\pm 1,\\pm 2,\\pm 3,\\pm 6$. ‏$P(3)=0$ و$P(-2)=0$: هذان هما الجذران. وإذا كان الحد الثابت 0 فإن $x=0$ جذر.',
            'A number $a$ is a root of $P(x)$ if $P(a)=0$. In a polynomial with whole-number coefficients, the whole-number roots are divisors of the constant term (positive and negative). For example, in $x^{2}-x-6$ the constant term is $-6$, so you try $\\pm 1,\\pm 2,\\pm 3,\\pm 6$. $P(3)=0$ and $P(-2)=0$: those are the roots. If the constant term is 0, $x=0$ is a root.'
        ),
        problem: same('$P(x)=x^{3}-7x+6$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hautagaiak: 6 zenbakiaren zatitzaileak.', 'Candidatos: divisores de 6.', 'المرشحون: قواسم 6.', 'Candidates: the divisors of 6.'), math: same('$\\pm 1,\\ \\pm 2,\\ \\pm 3,\\ \\pm 6$') },
            { text: say('Probatu.', 'Prueba.', 'جرّب.', 'Try them.'), math: same('$P(1)=0\\quad P(2)=0\\quad P(-3)=0$') },
            { text: say('Hiru erroak: 1, 2 eta −3.', 'Las tres raíces: 1, 2 y −3.', 'الجذور الثلاثة: 1 و2 و−3.', 'The three roots: 1, 2 and −3.') }
        ],
        example: same('$x^{2}-9:\\ x=3,\\ x=-3$'),
        mistake: {
            wrong: say('$x^{2}-x-6$ polinomioaren erroak bilatzeko, 1, 2, 3 eta 6 bakarrik probatu dira.', 'Para buscar las raíces de $x^{2}-x-6$ solo se probaron 1, 2, 3 y 6.', 'للبحث عن جذور $x^{2}-x-6$ جُرّبت 1 و2 و3 و6 فقط.', 'To find the roots of $x^{2}-x-6$, only 1, 2, 3 and 6 were tried.'),
            right: say('Zatitzaile negatiboak ere probatu behar dira: $P(-2)=0$, beraz $-2$ ere erroa da.', 'También hay que probar los negativos: $P(-2)=0$, así que $-2$ también es raíz.', 'يجب تجربة القواسم السالبة أيضًا: $P(-2)=0$ إذن $-2$ جذر أيضًا.', 'You must try the negative divisors too: $P(-2)=0$, so $-2$ is also a root.')
        },
        takeaway: say('Erroa: $P(A)=0$. Hautagaiak: gai askearen zatitzaileak, $\\pm$.', 'Raíz: $P(A)=0$. Candidatos: divisores del término independiente, con $\\pm$.', 'الجذر: $P(A)=0$. المرشحون: قواسم الحد الثابت مع $\\pm$.', 'Root: $P(A)=0$. Candidates: divisors of the constant term, with $\\pm$.'),
        figure: (language) => <RootsFigure language={language} />
    },

    /* ---------- 5. Factorisation ---------- */
    {
        id: 'common-factor',
        stage: 'factor',
        title: say('Faktore komuna atera', 'Sacar factor común', 'إخراج العامل المشترك', 'Taking out a common factor'),
        goal: say('Gai guztietan dagoen faktorea atera eta polinomioa biderkadura gisa idaztea.', 'Sacar el factor que está en todos los términos y escribir el polinomio como un producto.', 'إخراج العامل الموجود في كل الحدود وكتابة كثير الحدود حاصلَ ضرب.', 'Take out the factor that is in every term and write the polynomial as a product.'),
        explanation: say(
            'Gai guztiek zenbaki edo letra bat partekatzen badute, kanpora atera daiteke: $6x^{3}+9x^{2}=3x^{2}(2x+3)$. Atera koefizienteen z.k.h. eta letra bakoitzaren berretzaile txikiena. Barruan, gai bakoitza zati ateratakoa geratzen da. Egiaztatzeko, biderkatu berriro. Gai bat faktorearen berdina bada, barruan $1$ geratzen da, ez zero: $5x+5=5(x+1)$.',
            'Si todos los términos comparten un número o una letra, se puede sacar fuera: $6x^{3}+9x^{2}=3x^{2}(2x+3)$. Se saca el m.c.d. de los coeficientes y cada letra con su menor exponente. Dentro queda cada término entre lo que se ha sacado. Para comprobarlo, se vuelve a multiplicar. Si un término es igual al factor, dentro queda un $1$, no un cero: $5x+5=5(x+1)$.',
            'إذا اشتركت كل الحدود في عدد أو حرف يمكن إخراجه: $6x^{3}+9x^{2}=3x^{2}(2x+3)$. نخرج القاسم المشترك الأكبر للمعاملات وكل حرف بأصغر أس. ويبقى داخل القوس كل حد مقسومًا على ما أخرجناه. وللتحقق نضرب من جديد. وإذا ساوى حدٌّ العاملَ يبقى في الداخل $1$ لا صفر: $5x+5=5(x+1)$.',
            'If all the terms share a number or a letter, it can be taken outside: $6x^{3}+9x^{2}=3x^{2}(2x+3)$. Take out the HCF of the coefficients and each letter with its smallest exponent. Inside, each term divided by what you took out is left. To check, multiply again. If a term equals the factor, a $1$ is left inside, not a zero: $5x+5=5(x+1)$.'
        ),
        problem: same('$12x^{4}-8x^{3}+4x^{2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Koefizienteen z.k.h.: 4. Letra: $x^{2}$.', 'm.c.d. de los coeficientes: 4. Letra: $x^{2}$.', 'ق.م.أ للمعاملات: 4. الحرف: $x^{2}$.', 'HCF of the coefficients: 4. Letter: $x^{2}$.'), math: same('$4x^{2}$') },
            { text: say('Zatitu gai bakoitza.', 'Divide cada término.', 'اقسم كل حد.', 'Divide each term.'), math: same('$3x^{2},\\ -2x,\\ 1$') },
            { text: say('Idatzi biderkadura gisa.', 'Escríbelo como producto.', 'اكتبه حاصلَ ضرب.', 'Write it as a product.'), math: same('$4x^{2}(3x^{2}-2x+1)$') }
        ],
        example: same('$5x+5=5(x+1)$'),
        mistake: {
            wrong: say('$4x^{2}+2x=2x(2x)$', '$4x^{2}+2x=2x(2x)$', '$4x^{2}+2x=2x(2x)$', '$4x^{2}+2x=2x(2x)$'),
            right: say('$2x$ zati $2x$ bat da, ez ezer: $4x^{2}+2x=2x(2x+1)$.', '$2x$ entre $2x$ es 1, no nada: $4x^{2}+2x=2x(2x+1)$.', '$2x$ على $2x$ يساوي 1 لا لا شيء: $4x^{2}+2x=2x(2x+1)$.', '$2x$ divided by $2x$ is 1, not nothing: $4x^{2}+2x=2x(2x+1)$.')
        },
        takeaway: say('Atera z.k.h. eta berretzaile txikiena; barruan, gai bakoitza zati hori. $5X+5=5(X+1)$.', 'Saca el m.c.d. y el menor exponente; dentro, cada término entre eso. $5X+5=5(X+1)$.', 'أخرج ق.م.أ وأصغر أس؛ وفي الداخل كل حد مقسوم عليه. $5X+5=5(X+1)$.', 'Take out the HCF and the smallest exponent; inside, each term divided by it. $5X+5=5(X+1)$.'),
        figure: (language) => <CommonFactorFigure language={language} />
    },
    {
        id: 'factor-identities',
        stage: 'factor',
        title: say('Faktorizatu identitateekin eta erroekin', 'Factorizar con identidades y raíces', 'التحليل بالمتطابقات والجذور', 'Factorising with special products and roots'),
        goal: say('Polinomioak faktorizatzea identitate nabarmenak eta erroak erabiliz.', 'Factorizar polinomios usando las identidades notables y las raíces.', 'تحليل كثيرات الحدود باستعمال المتطابقات الشهيرة والجذور.', 'Factorise polynomials using special products and roots.'),
        explanation: say(
            'Faktorizatzea polinomioa faktore sinpleen biderkadura gisa idaztea da. Ordena on bat: lehenik atera faktore komuna; gero begiratu identitate bat den ($x^{2}-25=(x+5)(x-5)$, $x^{2}+6x+9=(x+3)^{2}$); bestela, bilatu erroak: $a$ erroa bada, $x-a$ faktore bat da. $x^{2}+5x+6$ polinomioaren erroak $-2$ eta $-3$ dira, beraz $x^{2}+5x+6=(x+2)(x+3)$.',
            'Factorizar es escribir el polinomio como producto de factores sencillos. Un buen orden: primero se saca factor común; después se mira si es una identidad ($x^{2}-25=(x+5)(x-5)$, $x^{2}+6x+9=(x+3)^{2}$); si no, se buscan las raíces: si $a$ es raíz, $x-a$ es un factor. Las raíces de $x^{2}+5x+6$ son $-2$ y $-3$, así que $x^{2}+5x+6=(x+2)(x+3)$.',
            'التحليل هو كتابة كثير الحدود حاصلَ ضرب عوامل بسيطة. والترتيب الجيد: أولًا نخرج العامل المشترك، ثم ننظر هل هو متطابقة ($x^{2}-25=(x+5)(x-5)$ و$x^{2}+6x+9=(x+3)^{2}$)، وإلا نبحث عن الجذور: إذا كان $a$ جذرًا فإن $x-a$ عامل. جذرا $x^{2}+5x+6$ هما $-2$ و$-3$، إذن $x^{2}+5x+6=(x+2)(x+3)$.',
            'Factorising means writing the polynomial as a product of simple factors. A good order: first take out a common factor; then see whether it is a special product ($x^{2}-25=(x+5)(x-5)$, $x^{2}+6x+9=(x+3)^{2}$); if not, look for the roots: if $a$ is a root, $x-a$ is a factor. The roots of $x^{2}+5x+6$ are $-2$ and $-3$, so $x^{2}+5x+6=(x+2)(x+3)$.'
        ),
        cases: [
            { title: say('Karratuen kendura', 'Diferencia de cuadrados', 'فرق مربعين', 'Difference of squares'), text: say('Bi karratu, kenketa.', 'Dos cuadrados restando.', 'مربعان مطروحان.', 'Two squares, subtracted.'), math: same('$x^{2}-16=(x+4)(x-4)$') },
            { title: say('Trinomio karratua', 'Trinomio cuadrado', 'ثلاثي مربع', 'Perfect square'), text: say('Muturrak karratuak, erdikoa bikoitza.', 'Extremos cuadrados, el del medio el doble.', 'الطرفان مربعان والأوسط الضعف.', 'The ends are squares, the middle is twice.'), math: same('$x^{2}-10x+25=(x-5)^{2}$') },
            { title: say('Erroekin', 'Con raíces', 'بالجذور', 'With roots'), text: say('$a$ erroa → $x-a$ faktorea.', 'Raíz $a$ → factor $x-a$.', 'الجذر $a$ ← العامل $x-a$.', 'Root $a$ → factor $x-a$.'), math: same('$x^{2}-x-6=(x-3)(x+2)$') }
        ],
        problem: same('$2x^{3}-18x$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktore komuna.', 'Factor común.', 'العامل المشترك.', 'Common factor.'), math: same('$2x(x^{2}-9)$') },
            { text: say('Karratuen kendura.', 'Diferencia de cuadrados.', 'فرق مربعين.', 'Difference of squares.'), math: same('$x^{2}-9=(x+3)(x-3)$') },
            { text: say('Guztia batera.', 'Todo junto.', 'الكل معًا.', 'All together.'), math: same('$2x(x+3)(x-3)$') }
        ],
        example: same('$x^{2}+6x+9=(x+3)^{2}$'),
        mistake: {
            wrong: say('$x^{2}-5x+6$ polinomioaren erroak 2 eta 3 dira, beraz $(x+2)(x+3)$.', 'Las raíces de $x^{2}-5x+6$ son 2 y 3, así que $(x+2)(x+3)$.', 'جذرا $x^{2}-5x+6$ هما 2 و3، إذن $(x+2)(x+3)$.', 'The roots of $x^{2}-5x+6$ are 2 and 3, so $(x+2)(x+3)$.'),
            right: say('$a$ erroa bada, faktorea $x-a$ da: $(x-2)(x-3)$. Egiaztatu: $x=2$ jarrita zero.', 'Si $a$ es raíz, el factor es $x-a$: $(x-2)(x-3)$. Comprueba: con $x=2$ da cero.', 'إذا كان $a$ جذرًا فالعامل $x-a$: $(x-2)(x-3)$. تحقق: مع $x=2$ يعطي صفرًا.', 'If $a$ is a root, the factor is $x-a$: $(x-2)(x-3)$. Check: with $x=2$ it gives zero.')
        },
        takeaway: say('Ordena: faktore komuna, identitateak, erroak. $A$ erroa → $(X-A)$.', 'Orden: factor común, identidades, raíces. Raíz $A$ → $(X-A)$.', 'الترتيب: العامل المشترك ثم المتطابقات ثم الجذور. الجذر $A$ ← $(X-A)$.', 'Order: common factor, special products, roots. Root $A$ → $(X-A)$.'),
        figure: (language) => <FactorizeFigure language={language} />
    },
    {
        id: 'algebraic-fractions',
        stage: 'factor',
        title: say('Zatiki aljebraikoak sinplifikatu', 'Simplificar fracciones algebraicas', 'تبسيط الكسور الجبرية', 'Simplifying algebraic fractions'),
        goal: say('Zatiki aljebraikoak sinplifikatzea, zenbakitzailea eta izendatzailea faktorizatuz.', 'Simplificar fracciones algebraicas factorizando el numerador y el denominador.', 'تبسيط الكسور الجبرية بتحليل البسط والمقام.', 'Simplify algebraic fractions by factorising the numerator and the denominator.'),
        explanation: say(
            'Zatiki aljebraiko bat bi polinomioren zatidura da. Zenbakizko zatikiekin bezala, faktore komunak bakarrik ezaba daitezke, ez batugaiak. Lehenik faktorizatu zenbakitzailea eta izendatzailea, eta gero ezabatu bietan dauden faktoreak: $\\frac{x^{2}-4}{x^{2}+2x}=\\frac{(x+2)(x-2)}{x(x+2)}=\\frac{x-2}{x}$. Gogoratu izendatzailea ezin dela 0 izan.',
            'Una fracción algebraica es un cociente de dos polinomios. Como en las fracciones numéricas, solo se pueden tachar factores comunes, no sumandos. Primero se factorizan el numerador y el denominador, y después se tachan los factores que están en los dos: $\\frac{x^{2}-4}{x^{2}+2x}=\\frac{(x+2)(x-2)}{x(x+2)}=\\frac{x-2}{x}$. Recuerda que el denominador no puede valer 0.',
            'الكسر الجبري حاصل قسمة كثيري حدود. وكما في الكسور العددية لا يُشطب إلا العوامل المشتركة لا الحدود المجموعة. نحلّل أولًا البسط والمقام ثم نشطب العوامل الموجودة فيهما: $\\frac{x^{2}-4}{x^{2}+2x}=\\frac{(x+2)(x-2)}{x(x+2)}=\\frac{x-2}{x}$. وتذكّر أن المقام لا يساوي 0.',
            'An algebraic fraction is a quotient of two polynomials. As with number fractions, you can only cancel common factors, not terms being added. First factorise the numerator and the denominator, then cancel the factors that are in both: $\\frac{x^{2}-4}{x^{2}+2x}=\\frac{(x+2)(x-2)}{x(x+2)}=\\frac{x-2}{x}$. Remember that the denominator cannot be 0.'
        ),
        problem: same('$\\frac{3x+6}{x^{2}-4}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu zenbakitzailea.', 'Factoriza el numerador.', 'حلّل البسط.', 'Factorise the numerator.'), math: same('$3x+6=3(x+2)$') },
            { text: say('Faktorizatu izendatzailea.', 'Factoriza el denominador.', 'حلّل المقام.', 'Factorise the denominator.'), math: same('$x^{2}-4=(x+2)(x-2)$') },
            { text: say('Ezabatu $x+2$.', 'Tacha $x+2$.', 'اشطب $x+2$.', 'Cancel $x+2$.'), math: same('$\\frac{3}{x-2}$') }
        ],
        example: same('$\\frac{x^{2}+x}{x}=x+1$'),
        mistake: {
            wrong: say('$\\frac{x+5}{x}=5$, $x$ ezabatuta.', '$\\frac{x+5}{x}=5$, tachando la $x$.', '$\\frac{x+5}{x}=5$ بشطب $x$.', '$\\frac{x+5}{x}=5$, cancelling the $x$.'),
            right: say('Goian $x$ batugai bat da, ez faktore bat: ezin da ezabatu. $\\frac{x+5}{x}$ ezin da sinplifikatu.', 'Arriba la $x$ es un sumando, no un factor: no se puede tachar. $\\frac{x+5}{x}$ no se simplifica.', '$x$ في البسط حدّ مجموع لا عامل: لا يُشطب. و$\\frac{x+5}{x}$ لا يُبسّط.', 'On top the $x$ is a term being added, not a factor: it cannot be cancelled. $\\frac{x+5}{x}$ does not simplify.')
        },
        takeaway: say('Lehenik faktorizatu; gero ezabatu FAKTOREAK bakarrik, inoiz ez batugaiak.', 'Primero factoriza; después tacha solo FACTORES, nunca sumandos.', 'حلّل أولًا ثم اشطب العوامل فقط، لا الحدود المجموعة أبدًا.', 'Factorise first; then cancel FACTORS only, never terms being added.'),
        figure: (language) => <SimplifyFigure language={language} />
    }
]

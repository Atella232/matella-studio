import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { CommonFactorFigure, PatternFigure, PolynomialFigure, ProductAreaFigure, SquareDifferenceFigure, SquareSumFigure, SumDifferenceFigure } from '../dbh2-aljebra-v2/figures'
import { FactorizeFigure, LongDivisionFigure, RemainderFigure, RootsFigure, RuffiniFigure, SimplifyFigure } from '../dbh4-aplikatuak-polinomioak/figures'
import { polynomialsLessonChecks, type PolynomialsTopicId } from './lessonChecks'
import { polynomialsLessonTexts } from './lessonTexts'
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

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Algebraic language ---------- */
    {
        id: 'expressions',
        stage: 'algebra',
        title: say('Adierazpen aljebraikoak', 'Expresiones algebraicas', 'العبارات الجبرية', 'Algebraic expressions'),
        goal: say('Hitzez emandako esaldiak letrekin idaztea eta alderantziz.', 'Pasar frases del lenguaje común a expresiones con letras, y al revés.', 'تحويل جمل من اللغة العادية إلى عبارات بالحروف والعكس.', 'Turn everyday sentences into expressions with letters, and the other way round.'),
        needs: [{ unit: 'dbh2/algebra', topic: 'language', title: { eu: 'Hizkuntza aljebraikoa eta segidak', es: 'Lenguaje algebraico y series', en: 'Algebraic language and sequences', ar: 'اللغة الجبرية والمتتاليات' } }],
        problem: say('Idatzi: «zenbaki baten bikoitza ken 7, guztia karratura».', 'Escribe: «el doble de un número menos 7, todo al cuadrado».', 'اكتب: «ضعف عدد ناقص 7، والكل مربع».', 'Write: «twice a number minus 7, all squared».'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbakia: $x$. Bikoitza:', 'El número: $x$. El doble:', 'العدد: $x$. ضعفه:', 'The number: $x$. Twice it:'), math: same('$2x$') },
            { text: say('Ken 7:', 'Menos 7:', 'ناقص 7:', 'Minus 7:'), math: same('$2x-7$') },
            { text: say('Guztia karratura: parentesia behar da.', 'Todo al cuadrado: hace falta el paréntesis.', 'الكل مربع: يلزم القوس.', 'All squared: you need brackets.'), math: same('$(2x-7)^{2}$') }
        ],
        takeaway: say('«Guztia» = parentesiak: $2(x+3)\\neq 2x+3$.', '«Todo» = paréntesis: $2(x+3)\\neq 2x+3$.', '«الكل» = أقواس: $2(x+3)\\neq 2x+3$.', '«All» = brackets: $2(x+3)\\neq 2x+3$.'),
        figure: (language) => <PatternFigure language={language} />
    },
    {
        id: 'monomials',
        stage: 'algebra',
        title: say('Monomioak', 'Monomios', 'وحيدات الحد', 'Monomials'),
        goal: say('Monomio baten koefizientea, zati literala eta maila ezagutzea, eta monomioekin eragiketak egitea.', 'Reconocer el coeficiente, la parte literal y el grado de un monomio, y operar con monomios.', 'التعرّف على معامل وحيد الحد وجزئه الحرفي ودرجته، وإجراء العمليات عليه.', 'Recognise the coefficient, the literal part and the degree of a monomial, and operate with monomials.'),
        needs: [{ unit: 'dbh3/potencias-raices', topic: 'power-rules', title: { eu: 'Berreturen propietateak', es: 'Propiedades de las potencias', en: 'Properties of powers', ar: 'خصائص القوى' } }],
        problem: same('$4x^{2}-x+6x^{2}+3x$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Elkartu antzekoak.', 'Agrupa los semejantes.', 'اجمع المتشابهة.', 'Group the like terms.'), math: same('$(4x^{2}+6x^{2})+(-x+3x)$') },
            { text: say('Batu koefizienteak.', 'Suma los coeficientes.', 'اجمع المعاملات.', 'Add the coefficients.'), math: same('$10x^{2}+2x$') },
            { text: say('Ezin da gehiago laburtu: $x^{2}$ eta $x$ ez dira antzekoak.', 'No se puede reducir más: $x^{2}$ y $x$ no son semejantes.', 'لا يمكن الاختصار أكثر: $x^{2}$ و$x$ غير متشابهين.', 'It cannot be reduced further: $x^{2}$ and $x$ are not like terms.') }
        ],
        takeaway: say('Batu: antzekoak bakarrik. Biderkatu: $x^{m}\\cdot x^{n}=x^{m+n}$.', 'Sumar: solo semejantes. Multiplicar: $x^{m}\\cdot x^{n}=x^{m+n}$.', 'الجمع: المتشابهة فقط. الضرب: $x^{m}\\cdot x^{n}=x^{m+n}$.', 'Adding: like terms only. Multiplying: $x^{m}\\cdot x^{n}=x^{m+n}$.'),
        figure: (language) => <PolynomialFigure language={language} />
    },
    {
        id: 'value',
        stage: 'algebra',
        title: say('Polinomioak eta zenbakizko balioa', 'Polinomios y valor numérico', 'كثيرات الحدود والقيمة العددية', 'Polynomials and their value'),
        goal: say('Polinomio baten maila eta gaiak ezagutzea, eta haren zenbakizko balioa kalkulatzea.', 'Reconocer el grado y los términos de un polinomio, y calcular su valor numérico.', 'التعرّف على درجة كثير حدود وحدوده، وحساب قيمته العددية.', 'Recognise the degree and the terms of a polynomial, and work out its value for a number.'),
        needs: [{ unit: 'dbh3/potencias-raices', topic: 'power-sign', title: { eu: 'Berretura eta zeinua', es: 'Potencia y signo', en: 'Power and sign', ar: 'القوة والإشارة' } }],
        problem: say('$P(x)=x^{2}-3x+4$. Kalkulatu $P(-1)$.', '$P(x)=x^{2}-3x+4$. Calcula $P(-1)$.', '$P(x)=x^{2}-3x+4$. احسب $P(-1)$.', '$P(x)=x^{2}-3x+4$. Work out $P(-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatu, parentesiekin.', 'Sustituye, con paréntesis.', 'عوّض بالأقواس.', 'Substitute, with brackets.'), math: same('$P(-1)=(-1)^{2}-3\\cdot(-1)+4$') },
            { text: say('Berreturak eta biderketak.', 'Potencias y productos.', 'القوى والضرب.', 'Powers and products.'), math: same('$1+3+4$') },
            { text: say('Batu.', 'Suma.', 'اجمع.', 'Add.'), math: same('$P(-1)=8$') }
        ],
        takeaway: say('$P(a)$: jarri $a$ parentesi artean $x$ letraren ordez.', '$P(a)$: pon $a$ entre paréntesis en lugar de $x$.', '$P(a)$: ضع $a$ بين قوسين مكان $x$.', '$P(a)$: put $a$ in brackets in place of $x$.'),
        figure: (language) => <RemainderFigure language={language} />
    },

    /* ---------- 2. Operations ---------- */
    {
        id: 'add-sub',
        stage: 'operations',
        title: say('Polinomioak batu eta kendu', 'Suma y resta de polinomios', 'جمع كثيرات الحدود وطرحها', 'Adding and subtracting polynomials'),
        goal: say('Polinomioak batzea eta kentzea, antzeko gaiak elkartuz eta kenketaren zeinuak ondo aldatuz.', 'Sumar y restar polinomios agrupando términos semejantes y cambiando bien los signos en la resta.', 'جمع كثيرات الحدود وطرحها بجمع الحدود المتشابهة وتغيير الإشارات جيدًا في الطرح.', 'Add and subtract polynomials by grouping like terms and changing the signs correctly when subtracting.'),
        problem: same('$(3x^{2}-2x+5)$ $-\\ (x^{2}+4x-1)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldatu kentzen denaren zeinu guztiak.', 'Cambia todos los signos del que se resta.', 'غيّر كل إشارات المطروح.', 'Change all the signs of the one being subtracted.'), math: same('$3x^{2}-2x+5-x^{2}-4x+1$') },
            { text: say('Elkartu antzekoak.', 'Agrupa semejantes.', 'اجمع المتشابهة.', 'Group like terms.'), math: same('$(3-1)x^{2}+(-2-4)x+(5+1)$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$2x^{2}-6x+6$') }
        ],
        takeaway: say('Kendu = aldatu zeinu GUZTIAK eta batu: $P-Q=P+(-Q)$.', 'Restar = cambiar TODOS los signos y sumar: $P-Q=P+(-Q)$.', 'الطرح = تغيير كل الإشارات ثم الجمع: $P-Q=P+(-Q)$.', 'Subtracting = change ALL the signs and add: $P-Q=P+(-Q)$.'),
        figure: (language) => <PolynomialFigure language={language} />
    },
    {
        id: 'product',
        stage: 'operations',
        title: say('Polinomioak biderkatu', 'Producto de polinomios', 'ضرب كثيرات الحدود', 'Multiplying polynomials'),
        goal: say('Polinomioak biderkatzea, gai bakoitza beste polinomioaren gai guztiez biderkatuz.', 'Multiplicar polinomios multiplicando cada término por todos los del otro.', 'ضرب كثيرات الحدود بضرب كل حد في كل حدود الآخر.', 'Multiply polynomials by multiplying each term by every term of the other.'),
        problem: same('$(2x-1)(x^{2}+3x-4)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('$2x$ bider gai guztiak.', '$2x$ por todos los términos.', '$2x$ في كل الحدود.', '$2x$ times every term.'), math: same('$2x^{3}+6x^{2}-8x$') },
            { text: say('$-1$ bider gai guztiak.', '$-1$ por todos los términos.', '$-1$ في كل الحدود.', '$-1$ times every term.'), math: same('$-x^{2}-3x+4$') },
            { text: say('Batu antzekoak.', 'Suma los semejantes.', 'اجمع المتشابهة.', 'Add like terms.'), math: same('$2x^{3}+5x^{2}-11x+4$') }
        ],
        takeaway: say('Gai bakoitza bider GAI GUZTIAK: bi binomiok 4 biderkadura.', 'Cada término por TODOS: dos binomios, 4 productos.', 'كل حد في كل الحدود: ثنائيا حد يعطيان 4 حواصل.', 'Each term times ALL of them: two binomials, 4 products.'),
        figure: (language) => <ProductAreaFigure language={language} />
    },
    {
        id: 'division',
        stage: 'operations',
        title: say('Polinomioak zatitu', 'División de polinomios', 'قسمة كثيرات الحدود', 'Dividing polynomials'),
        goal: say('Polinomio bat beste batez zatitzea eta zatidura eta hondarra lortzea.', 'Dividir un polinomio entre otro y obtener el cociente y el resto.', 'قسمة كثير حدود على آخر والحصول على خارج القسمة والباقي.', 'Divide one polynomial by another and find the quotient and the remainder.'),
        problem: same('$(x^{2}+5x+7):(x+2)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x^{2}$ zati $x$: $x$. Biderkatu eta kendu.', '$x^{2}$ entre $x$: $x$. Multiplica y resta.', '$x^{2}$ على $x$: $x$. اضرب واطرح.', '$x^{2}$ divided by $x$: $x$. Multiply and subtract.'), math: same('$\\begin{aligned}&x^{2}+5x+7-(x^{2}+2x)\\\\&=3x+7\\end{aligned}$') },
            { text: say('$3x$ zati $x$: $3$. Biderkatu eta kendu.', '$3x$ entre $x$: $3$. Multiplica y resta.', '$3x$ على $x$: $3$. اضرب واطرح.', '$3x$ divided by $x$: $3$. Multiply and subtract.'), math: same('$3x+7-(3x+6)=1$') },
            { text: say('Zatidura eta hondarra.', 'Cociente y resto.', 'الخارج والباقي.', 'Quotient and remainder.'), math: same('$C=x+3,\\ R=1$') }
        ],
        takeaway: say('$P=Q\\cdot C+R$, $R$ zatitzailea baino maila txikiagokoa.', '$P=Q\\cdot C+R$, con $R$ de grado menor que el divisor.', '$P=Q\\cdot C+R$ ودرجة $R$ أصغر من درجة المقسوم عليه.', '$P=Q\\cdot C+R$, with $R$ of lower degree than the divisor.'),
        figure: (language) => <LongDivisionFigure language={language} />
    },

    /* ---------- 3. Special products ---------- */
    {
        id: 'square-sum',
        stage: 'identities',
        title: say('Batura baten karratua', 'Cuadrado de una suma', 'مربع مجموع', 'The square of a sum'),
        goal: say('$(a+b)^{2}=a^{2}+2ab+b^{2}$ erabiltzea biderketa egin gabe.', 'Usar $(a+b)^{2}=a^{2}+2ab+b^{2}$ sin hacer el producto.', 'استعمال $(a+b)^{2}=a^{2}+2ab+b^{2}$ دون إجراء الضرب.', 'Use $(a+b)^{2}=a^{2}+2ab+b^{2}$ without doing the multiplication.'),
        problem: same('$(3x+2)^{2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoaren karratua.', 'El cuadrado del primero.', 'مربع الأول.', 'The square of the first.'), math: same('$(3x)^{2}=9x^{2}$') },
            { text: say('Bikoitza bider lehenengoa bider bigarrena.', 'El doble del primero por el segundo.', 'ضعف الأول في الثاني.', 'Twice the first times the second.'), math: same('$2\\cdot 3x\\cdot 2=12x$') },
            { text: say('Bigarrenaren karratua, eta batu.', 'El cuadrado del segundo, y suma.', 'مربع الثاني ثم اجمع.', 'The square of the second, and add.'), math: same('$9x^{2}+12x+4$') }
        ],
        takeaway: say('$(a+b)^{2}=a^{2}+2ab+b^{2}$, ez $a^{2}+b^{2}$.', '$(a+b)^{2}=a^{2}+2ab+b^{2}$, no $a^{2}+b^{2}$.', '$(a+b)^{2}=a^{2}+2ab+b^{2}$ لا $a^{2}+b^{2}$.', '$(a+b)^{2}=a^{2}+2ab+b^{2}$, not $a^{2}+b^{2}$.'),
        figure: (language) => <SquareSumFigure language={language} />
    },
    {
        id: 'square-diff',
        stage: 'identities',
        title: say('Kendura baten karratua', 'Cuadrado de una diferencia', 'مربع فرق', 'The square of a difference'),
        goal: say('$(a-b)^{2}=a^{2}-2ab+b^{2}$ erabiltzea, zeinuak ondo jarriz.', 'Usar $(a-b)^{2}=a^{2}-2ab+b^{2}$ poniendo bien los signos.', 'استعمال $(a-b)^{2}=a^{2}-2ab+b^{2}$ مع ضبط الإشارات.', 'Use $(a-b)^{2}=a^{2}-2ab+b^{2}$ with the signs right.'),
        problem: same('$(2x-5)^{2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoaren karratua.', 'El cuadrado del primero.', 'مربع الأول.', 'The square of the first.'), math: same('$4x^{2}$') },
            { text: say('Ken bikoitza bider biak.', 'Menos el doble por los dos.', 'ناقص ضعف حاصل ضربهما.', 'Minus twice the two.'), math: same('$-2\\cdot 2x\\cdot 5=-20x$') },
            { text: say('Gehi bigarrenaren karratua.', 'Más el cuadrado del segundo.', 'زائد مربع الثاني.', 'Plus the square of the second.'), math: same('$4x^{2}-20x+25$') }
        ],
        takeaway: say('$(a-b)^{2}=a^{2}-2ab+b^{2}$: zeinuak $+\\ -\\ +$.', '$(a-b)^{2}=a^{2}-2ab+b^{2}$: signos $+\\ -\\ +$.', '$(a-b)^{2}=a^{2}-2ab+b^{2}$: الإشارات $+\\ -\\ +$.', '$(a-b)^{2}=a^{2}-2ab+b^{2}$: signs $+\\ -\\ +$.'),
        figure: (language) => <SquareDifferenceFigure language={language} />
    },
    {
        id: 'sum-diff',
        stage: 'identities',
        title: say('Batura bider kendura', 'Suma por diferencia', 'مجموع في فرق', 'Sum times difference'),
        goal: say('$(a+b)(a-b)=a^{2}-b^{2}$ erabiltzea, kalkuluak errazteko ere.', 'Usar $(a+b)(a-b)=a^{2}-b^{2}$, también para hacer cálculos más fáciles.', 'استعمال $(a+b)(a-b)=a^{2}-b^{2}$ وكذلك لتسهيل الحساب.', 'Use $(a+b)(a-b)=a^{2}-b^{2}$, also to make calculations easier.'),
        problem: same('$(3x+4)(3x-4)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batura bider kendura: karratuen kendura.', 'Suma por diferencia: diferencia de cuadrados.', 'مجموع في فرق: فرق مربعين.', 'Sum times difference: difference of squares.'), math: same('$(3x)^{2}-4^{2}$') },
            { text: say('Karratuak.', 'Los cuadrados.', 'المربعان.', 'The squares.'), math: same('$9x^{2}-16$') },
            { text: say('Erdiko gaiak ezeztatu dira.', 'Los términos del medio se anularon.', 'ألغى الحدان الأوسطان أحدهما الآخر.', 'The middle terms cancelled out.') }
        ],
        takeaway: say('$(a+b)(a-b)=a^{2}-b^{2}$', '$(a+b)(a-b)=a^{2}-b^{2}$', '$(a+b)(a-b)=a^{2}-b^{2}$', '$(a+b)(a-b)=a^{2}-b^{2}$'),
        figure: (language) => <SumDifferenceFigure language={language} />
    },

    /* ---------- 4. Ruffini and roots ---------- */
    {
        id: 'ruffini',
        stage: 'ruffini',
        title: say('Ruffiniren erregela', 'Regla de Ruffini', 'قاعدة روفيني', 'Ruffini\'s rule'),
        goal: say('$x-a$ motako polinomio batez zatitzea Ruffiniren taularekin.', 'Dividir entre un polinomio de la forma $x-a$ con la tabla de Ruffini.', 'القسمة على كثير حدود من الشكل $x-a$ بجدول روفيني.', 'Divide by a polynomial of the form $x-a$ with Ruffini\'s table.'),
        problem: same('$(2x^{3}-3x^{2}+0x+5)$ $\\div\\ (x-2)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Koefizienteak eta $a=2$. Jaitsi 2.', 'Coeficientes y $a=2$. Baja el 2.', 'المعاملات و$a=2$. أنزل 2.', 'Coefficients and $a=2$. Bring down the 2.'), math: same('$2\\quad -3\\quad 0\\quad 5$') },
            { text: say('Biderkatu eta batu, behin eta berriz.', 'Multiplica y suma, una y otra vez.', 'اضرب واجمع مرة بعد مرة.', 'Multiply and add, again and again.'), math: same('$\\begin{gathered}2\\cdot 2-3=1\\\\ 1\\cdot 2+0=2\\\\ 2\\cdot 2+5=9\\end{gathered}$') },
            { text: say('Zatidura eta hondarra.', 'Cociente y resto.', 'الخارج والباقي.', 'Quotient and remainder.'), math: same('$C=2x^{2}+x+2,\\ R=9$') }
        ],
        takeaway: say('$x-a$ zatitzailea: taulan $a$. $x+3$ bada, $a=-3$.', 'Divisor $x-a$: en la tabla, $a$. Si es $x+3$, $a=-3$.', 'المقسوم عليه $x-a$: في الجدول $a$. وإذا كان $x+3$ فإن $a=-3$.', 'Divisor $x-a$: $a$ in the table. If it is $x+3$, $a=-3$.'),
        figure: (language) => <RuffiniFigure language={language} />
    },
    {
        id: 'remainder',
        stage: 'ruffini',
        title: say('Hondarraren teorema', 'Teorema del resto', 'مبرهنة الباقي', 'The remainder theorem'),
        goal: say('$P(x)$ zati $x-a$ egitean hondarra $P(a)$ dela erabiltzea.', 'Usar que el resto de dividir $P(x)$ entre $x-a$ es $P(a)$.', 'استعمال أن باقي قسمة $P(x)$ على $x-a$ هو $P(a)$.', 'Use the fact that the remainder of dividing $P(x)$ by $x-a$ is $P(a)$.'),
        problem: say('Zein da $x^{3}-2x+4$ zati $x+1$ egitean geratzen den hondarra?', '¿Cuál es el resto de dividir $x^{3}-2x+4$ entre $x+1$?', 'ما باقي قسمة $x^{3}-2x+4$ على $x+1$؟', 'What is the remainder when $x^{3}-2x+4$ is divided by $x+1$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x+1=x-(-1)$: $a=-1$.', '$x+1=x-(-1)$: $a=-1$.', '$x+1=x-(-1)$: $a=-1$.', '$x+1=x-(-1)$: $a=-1$.') },
            { text: say('Kalkulatu $P(-1)$.', 'Calcula $P(-1)$.', 'احسب $P(-1)$.', 'Work out $P(-1)$.'), math: same('$(-1)^{3}-2\\cdot(-1)+4$') },
            { text: say('Hondarra.', 'El resto.', 'الباقي.', 'The remainder.'), math: same('$-1+2+4=5$') }
        ],
        takeaway: say('$P(x):(x-a)$ eragiketaren hondarra $=P(a)$.', 'Resto de $P(x):(x-a)$ $=P(a)$.', 'باقي $P(x):(x-a)$ $=P(a)$.', 'Remainder of $P(x):(x-a)$ $=P(a)$.'),
        figure: (language) => <RemainderFigure language={language} />
    },
    {
        id: 'roots',
        stage: 'ruffini',
        title: say('Polinomio baten erroak', 'Raíces de un polinomio', 'جذور كثير حدود', 'Roots of a polynomial'),
        goal: say('Polinomio baten erro osoak gai askearen zatitzaileen artean bilatzea.', 'Buscar las raíces enteras de un polinomio entre los divisores del término independiente.', 'البحث عن الجذور الصحيحة لكثير حدود بين قواسم الحد الثابت.', 'Look for the whole-number roots of a polynomial among the divisors of the constant term.'),
        needs: [{ unit: 'dbh2/divisibilidad', topic: 'divisors', title: { eu: 'Zenbaki baten zatitzaileak', es: 'Los divisores de un número', en: 'The divisors of a number', ar: 'قواسم عدد' } }],
        problem: same('$P(x)=x^{3}-7x+6$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hautagaiak: 6 zenbakiaren zatitzaileak.', 'Candidatos: divisores de 6.', 'المرشحون: قواسم 6.', 'Candidates: the divisors of 6.'), math: same('$\\pm 1,\\ \\pm 2,\\ \\pm 3,\\ \\pm 6$') },
            { text: say('Probatu.', 'Prueba.', 'جرّب.', 'Try them.'), math: same('$\\begin{gathered}P(1)=0\\\\ P(2)=0\\\\ P(-3)=0\\end{gathered}$') },
            { text: say('Hiru erroak: 1, 2 eta −3.', 'Las tres raíces: 1, 2 y −3.', 'الجذور الثلاثة: 1 و2 و−3.', 'The three roots: 1, 2 and −3.') }
        ],
        takeaway: say('Erroa: $P(a)=0$. Hautagaiak: gai askearen zatitzaileak, $\\pm$.', 'Raíz: $P(a)=0$. Candidatos: divisores del término independiente, con $\\pm$.', 'الجذر: $P(a)=0$. المرشحون: قواسم الحد الثابت مع $\\pm$.', 'Root: $P(a)=0$. Candidates: divisors of the constant term, with $\\pm$.'),
        figure: (language) => <RootsFigure language={language} />
    },

    /* ---------- 5. Factorisation ---------- */
    {
        id: 'common-factor',
        stage: 'factor',
        title: say('Faktore komuna atera', 'Sacar factor común', 'إخراج العامل المشترك', 'Taking out a common factor'),
        goal: say('Gai guztietan dagoen faktorea atera eta polinomioa biderkadura gisa idaztea.', 'Sacar el factor que está en todos los términos y escribir el polinomio como un producto.', 'إخراج العامل الموجود في كل الحدود وكتابة كثير الحدود حاصلَ ضرب.', 'Take out the factor that is in every term and write the polynomial as a product.'),
        needs: [{ unit: 'dbh2/divisibilidad', topic: 'gcd', title: { eu: 'Zatitzaile komunetako handiena (ZKH)', es: 'Máximo común divisor (m.c.d.)', en: 'Greatest common divisor (GCD)', ar: 'القاسم المشترك الأكبر (ق.م.أ · ZKH)' } }],
        problem: same('$12x^{4}-8x^{3}+4x^{2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Koefizienteen z.k.h.: 4. Letra: $x^{2}$.', 'm.c.d. de los coeficientes: 4. Letra: $x^{2}$.', 'ق.م.أ للمعاملات: 4. الحرف: $x^{2}$.', 'HCF of the coefficients: 4. Letter: $x^{2}$.'), math: same('$4x^{2}$') },
            { text: say('Zatitu gai bakoitza.', 'Divide cada término.', 'اقسم كل حد.', 'Divide each term.'), math: same('$3x^{2},\\ -2x,\\ 1$') },
            { text: say('Idatzi biderkadura gisa.', 'Escríbelo como producto.', 'اكتبه حاصلَ ضرب.', 'Write it as a product.'), math: same('$4x^{2}(3x^{2}-2x+1)$') }
        ],
        takeaway: say('Atera z.k.h. eta berretzaile txikiena; barruan, gai bakoitza zati hori. $5x+5=5(x+1)$.', 'Saca el m.c.d. y el menor exponente; dentro, cada término entre eso. $5x+5=5(x+1)$.', 'أخرج ق.م.أ وأصغر أس؛ وفي الداخل كل حد مقسوم عليه. $5x+5=5(x+1)$.', 'Take out the HCF and the smallest exponent; inside, each term divided by it. $5x+5=5(x+1)$.'),
        figure: (language) => <CommonFactorFigure language={language} />
    },
    {
        id: 'factor-identities',
        stage: 'factor',
        title: say('Faktorizatu identitateekin eta erroekin', 'Factorizar con identidades y raíces', 'التحليل بالمتطابقات والجذور', 'Factorising with special products and roots'),
        goal: say('Polinomioak faktorizatzea identitate nabarmenak eta erroak erabiliz.', 'Factorizar polinomios usando las identidades notables y las raíces.', 'تحليل كثيرات الحدود باستعمال المتطابقات الشهيرة والجذور.', 'Factorise polynomials using special products and roots.'),
        problem: same('$2x^{3}-18x$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktore komuna.', 'Factor común.', 'العامل المشترك.', 'Common factor.'), math: same('$2x(x^{2}-9)$') },
            { text: say('Karratuen kendura.', 'Diferencia de cuadrados.', 'فرق مربعين.', 'Difference of squares.'), math: same('$x^{2}-9=(x+3)(x-3)$') },
            { text: say('Guztia batera.', 'Todo junto.', 'الكل معًا.', 'All together.'), math: same('$2x(x+3)(x-3)$') }
        ],
        takeaway: say('Ordena: faktore komuna, identitateak, erroak. $a$ erroa → $(x-a)$.', 'Orden: factor común, identidades, raíces. Raíz $a$ → $(x-a)$.', 'الترتيب: العامل المشترك ثم المتطابقات ثم الجذور. الجذر $a$ ← $(x-a)$.', 'Order: common factor, special products, roots. Root $a$ → $(x-a)$.'),
        figure: (language) => <FactorizeFigure language={language} />
    },
    {
        id: 'algebraic-fractions',
        stage: 'factor',
        title: say('Zatiki aljebraikoak sinplifikatu', 'Simplificar fracciones algebraicas', 'تبسيط الكسور الجبرية', 'Simplifying algebraic fractions'),
        goal: say('Zatiki aljebraikoak sinplifikatzea, zenbakitzailea eta izendatzailea faktorizatuz.', 'Simplificar fracciones algebraicas factorizando el numerador y el denominador.', 'تبسيط الكسور الجبرية بتحليل البسط والمقام.', 'Simplify algebraic fractions by factorising the numerator and the denominator.'),
        needs: [{ unit: 'dbh3/numeros-racionales', topic: 'simplify', title: { eu: 'Anplifikatu, sinplifikatu eta zatiki laburtezina', es: 'Amplificar, simplificar y fracción irreducible', en: 'Amplifying, simplifying and the simplest form', ar: 'التوسيع والاختزال والكسر غير القابل للاختزال' } }],
        problem: same('$\\frac{3x+6}{x^{2}-4}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu zenbakitzailea.', 'Factoriza el numerador.', 'حلّل البسط.', 'Factorise the numerator.'), math: same('$3x+6=3(x+2)$') },
            { text: say('Faktorizatu izendatzailea.', 'Factoriza el denominador.', 'حلّل المقام.', 'Factorise the denominator.'), math: same('$x^{2}-4=(x+2)(x-2)$') },
            { text: say('Ezabatu $x+2$.', 'Tacha $x+2$.', 'اشطب $x+2$.', 'Cancel $x+2$.'), math: same('$\\frac{3}{x-2}$') }
        ],
        takeaway: say('Lehenik faktorizatu; gero ezabatu FAKTOREAK bakarrik, inoiz ez batugaiak.', 'Primero factoriza; después tacha solo FACTORES, nunca sumandos.', 'حلّل أولًا ثم اشطب العوامل فقط، لا الحدود المجموعة أبدًا.', 'Factorise first; then cancel FACTORS only, never terms being added.'),
        figure: (language) => <SimplifyFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const polynomialsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...polynomialsLessonTexts[topic.id as PolynomialsTopicId], ...polynomialsLessonChecks[topic.id as PolynomialsTopicId] }))

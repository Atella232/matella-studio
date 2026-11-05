import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { ProductAreaFigure, SquareSumFigure } from '../dbh2-aljebra-v2/figures'
import { AlgebraicFractionFigure, LongDivisionFigure, RootsFigure, RuffiniFigure } from '../dbh4-aplikatuak-polinomioak/figures'
import {
    CommonDenominatorFigure,
    DomainFigure,
    EquivalentFractionsFigure,
    FactorStrategyFigure,
    FractionProductFigure,
    GcdLcmFigure,
    ParameterFigure,
    TapsFigure,
    TartagliaFigure
} from './figures'
import { polynomialsLessonChecks, type PolynomialsTopicId } from './lessonChecks'
import { polynomialsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Polinomioak eta zatiki aljebraikoak · 4. DBH akademikoak — stages and
   lessons, following Santillana 4.º Académicas unit 3 (operations, the
   notable identities and Tartaglia's triangle, division, Ruffini, the
   remainder theorem, roots and factorisation, algebraic fractions and
   their operations) and Anaya 4.º Académicas unit 2 (Ruffini to find
   P(a), integer roots among the divisors, factorising step by step,
   divisibility, m.c.d. and m.c.m. of polynomials, equivalent fractions,
   common denominators and problems with taps). It goes further than the
   4. DBH aplikatuak polynomials unit: the binomial, parameters, rational
   roots through the quadratic formula, m.c.d./m.c.m. and the four
   operations with algebraic fractions.
   ========================================================================== */

export type PolynomialsFractionsStageId = 'operations' | 'division' | 'factor' | 'fractions' | 'operate'

export const polynomialsFractionsStages: UnitStage[] = [
    { id: 'operations', tone: 'blue', title: { eu: 'Polinomioen eragiketak', es: 'Operaciones con polinomios', en: 'Operations with polynomials', ar: 'العمليات على الحدوديات' } },
    { id: 'division', tone: 'violet', title: { eu: 'Zatiketa eta Ruffini', es: 'División y Ruffini', en: 'Division and Ruffini\'s rule', ar: 'القسمة وروفيني' } },
    { id: 'factor', tone: 'mustard', title: { eu: 'Erroak eta faktorizazioa', es: 'Raíces y factorización', en: 'Roots and factorisation', ar: 'الجذور والتحليل' } },
    { id: 'fractions', tone: 'coral', title: { eu: 'Zatiki aljebraikoak', es: 'Fracciones algebraicas', en: 'Algebraic fractions', ar: 'الكسور الجبرية' } },
    { id: 'operate', tone: 'green', title: { eu: 'Eragiketak zatikiekin', es: 'Operaciones con fracciones', en: 'Operations with fractions', ar: 'العمليات على الكسور' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Operations ---------- */
    {
        id: 'polynomials',
        stage: 'operations',
        title: say('Polinomioak eta haien eragiketak', 'Polinomios y sus operaciones', 'الحدوديات وعملياتها', 'Polynomials and their operations'),
        goal: say('Polinomio baten maila, gai askea eta zenbakizko balioa ezagutzea, eta polinomioak batu, kendu eta biderkatzea.', 'Reconocer el grado, el término independiente y el valor numérico de un polinomio, y sumar, restar y multiplicar polinomios.', 'التعرّف على درجة الحدودية وحدّها الثابت وقيمتها العددية، وجمع الحدوديات وطرحها وضربها.', 'Recognise the degree, the constant term and the numerical value of a polynomial, and add, subtract and multiply polynomials.'),
        needs: [
            { unit: 'dbh3/polinomios', topic: 'value', title: { eu: 'Polinomioak eta zenbakizko balioa', es: 'Polinomios y valor numérico', en: 'Polynomials and their value', ar: 'كثيرات الحدود والقيمة العددية' } },
            { unit: 'dbh3/polinomios', topic: 'product', title: { eu: 'Polinomioak biderkatu', es: 'Producto de polinomios', en: 'Multiplying polynomials', ar: 'ضرب كثيرات الحدود' } }
        ],
        problem: say('Kalkulatu $3x(2x+5)-x^{2}(x-1)+5$ eta esan haren maila.', 'Calcula $3x(2x+5)-x^{2}(x-1)+5$ y di su grado.', 'احسب $3x(2x+5)-x^{2}(x-1)+5$ واذكر درجتها.', 'Calculate $3x(2x+5)-x^{2}(x-1)+5$ and say its degree.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$6x^{2}+15x-x^{3}+x^{2}+5$') },
            { text: say('Ordenatu eta batu antzekoak: 3. maila.', 'Ordena y agrupa: grado 3.', 'رتّب واجمع: الدرجة 3.', 'Order and group: degree 3.'), math: same('$-x^{3}+7x^{2}+15x+5$') }
        ],
        takeaway: say('Biderkatzean, gai bakoitza gai guztiez; maila: mailen batura.', 'Al multiplicar, cada término por todos; grado: suma de grados.', 'في الضرب كل حد في كل الحدود؛ الدرجة: مجموع الدرجتين.', 'When multiplying, multiply each term by all the others; degree: the sum of the degrees.'),
        figure: (language) => <ProductAreaFigure language={language} />
    },
    {
        id: 'identities',
        stage: 'operations',
        title: say('Identitate nabarmenak', 'Igualdades notables', 'المتطابقات الشهيرة', 'Remarkable identities'),
        goal: say('Batura eta kendura baten karratua eta kuboa eta batura bider kendura garatzea, eta atzera erabiltzea.', 'Desarrollar el cuadrado y el cubo de una suma y de una diferencia y la suma por diferencia, y usarlos al revés.', 'نشر مربع ومكعب المجموع والفرق والمجموع في الفرق، واستعمالها بالعكس.', 'Expand the square and the cube of a sum and of a difference, the sum times difference, and use them backwards.'),
        needs: [
            { unit: 'dbh3/polinomios', topic: 'square-sum', title: { eu: 'Batura baten karratua', es: 'Cuadrado de una suma', en: 'The square of a sum', ar: 'مربع مجموع' } },
            { unit: 'dbh3/polinomios', topic: 'sum-diff', title: { eu: 'Batura bider kendura', es: 'Suma por diferencia', en: 'Sum times difference', ar: 'مجموع في فرق' } }
        ],
        problem: say('Garatu $(2x-1)^{3}$.', 'Desarrolla $(2x-1)^{3}$.', 'انشر $(2x-1)^{3}$.', 'Expand $(2x-1)^{3}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a=2x$, $b=1$.', '$a=2x$, $b=1$.', '$a=2x$، $b=1$.', '$a=2x$, $b=1$.'), math: same('$(2x)^{3}-3(2x)^{2}+3\\cdot 2x-1$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$8x^{3}-12x^{2}+6x-1$') }
        ],
        takeaway: say('$(a\\pm b)^{2}=a^{2}\\pm 2ab+b^{2}$; $(a+b)(a-b)=a^{2}-b^{2}$.', '$(a\\pm b)^{2}=a^{2}\\pm 2ab+b^{2}$; $(a+b)(a-b)=a^{2}-b^{2}$.', '$(a\\pm b)^{2}=a^{2}\\pm 2ab+b^{2}$؛ $(a+b)(a-b)=a^{2}-b^{2}$.', '$(a\\pm b)^{2}=a^{2}\\pm 2ab+b^{2}$; $(a+b)(a-b)=a^{2}-b^{2}$.'),
        figure: (language) => <SquareSumFigure language={language} />
    },
    {
        id: 'binomial',
        stage: 'operations',
        title: say('Tartagliaren triangelua', 'El triángulo de Tartaglia', 'مثلث تارتاليا', 'Tartaglia\'s triangle'),
        goal: say('$(a+b)^{n}$ garatzea Tartagliaren triangeluko koefizienteekin.', 'Desarrollar $(a+b)^{n}$ con los coeficientes del triángulo de Tartaglia.', 'نشر $(a+b)^{n}$ بمعاملات مثلث تارتاليا.', 'Expand $(a+b)^{n}$ using the coefficients of Tartaglia\'s triangle.'),
        problem: say('$(x+3)^{5}$ garatzean, zein da $x^{3}$ gaiaren koefizientea?', 'Al desarrollar $(x+3)^{5}$, ¿cuál es el coeficiente de $x^{3}$?', 'عند نشر $(x+3)^{5}$ ما معامل $x^{3}$؟', 'When expanding $(x+3)^{5}$, what is the coefficient of $x^{3}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('5. errenkada: 1 5 10 10 5 1.', 'Fila 5: 1 5 10 10 5 1.', 'الصف 5: 1 5 10 10 5 1.', 'Row 5: 1 5 10 10 5 1.'), math: same('$10\\,x^{3}\\cdot 3^{2}$') },
            { text: say('Koefizientea.', 'El coeficiente.', 'المعامل.', 'The coefficient.'), math: same('$10\\cdot 9=90$') }
        ],
        takeaway: say('n. errenkada = $(a+b)^{n}$-ren koefizienteak.', 'Fila n = coeficientes de $(a+b)^{n}$.', 'الصف n = معاملات $(a+b)^{n}$.', 'Row n = coefficients of $(a+b)^{n}$.'),
        figure: (language) => <TartagliaFigure language={language} />
    },

    /* ---------- 2. Division and Ruffini ---------- */
    {
        id: 'long-division',
        stage: 'division',
        title: say('Polinomioen zatiketa', 'División de polinomios', 'قسمة الحدوديات', 'Polynomial division'),
        goal: say('Bi polinomio zatitzea, eta zatiketa zehatza ala osoa den esatea.', 'Dividir dos polinomios y decir si la división es exacta o entera.', 'قسمة حدوديتين وتحديد ما إذا كانت القسمة تامة أو غير تامة.', 'Divide two polynomials and say whether the division is exact or has a remainder.'),
        needs: [
            { unit: 'dbh3/polinomios', topic: 'division', title: { eu: 'Polinomioak zatitu', es: 'División de polinomios', en: 'Dividing polynomials', ar: 'قسمة كثيرات الحدود' } }
        ],
        problem: say('Zatitu $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}(2x+3)$.', 'Divide $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}(2x+3)$.', 'اقسم $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}(2x+3)$.', 'Divide $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}(2x+3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$4x^{3}\\mathbin{:}2x=2x^{2}$; kendu $4x^{3}+6x^{2}$.', '$4x^{3}\\mathbin{:}2x=2x^{2}$; resta $4x^{3}+6x^{2}$.', '$4x^{3}\\mathbin{:}2x=2x^{2}$؛ اطرح $4x^{3}+6x^{2}$.', '$4x^{3}\\mathbin{:}2x=2x^{2}$; subtract $4x^{3}+6x^{2}$.'), math: same('$6x^{2}+5x-6$') },
            { text: say('$6x^{2}\\mathbin{:}2x=3x$; kendu $6x^{2}+9x$.', '$6x^{2}\\mathbin{:}2x=3x$; resta $6x^{2}+9x$.', '$6x^{2}\\mathbin{:}2x=3x$؛ اطرح $6x^{2}+9x$.', '$6x^{2}\\mathbin{:}2x=3x$; subtract $6x^{2}+9x$.'), math: same('$-4x-6$') },
            { text: say('$-2$; hondarra 0: zehatza.', '$-2$; resto 0: exacta.', '$-2$؛ الباقي 0: تامة.', '$-2$; remainder 0: exact.'), math: same('$c(x)=2x^{2}+3x-2$') }
        ],
        takeaway: say('$D=d\\cdot c+r$, hondarraren maila zatitzailearena baino txikiagoa.', '$D=d\\cdot c+r$, con el grado del resto menor que el del divisor.', '$D=d\\cdot c+r$، ودرجة الباقي أصغر من درجة المقسوم عليه.', '$D=d\\cdot c+r$, with the degree of the remainder less than that of the divisor.'),
        figure: (language) => <LongDivisionFigure language={language} />
    },
    {
        id: 'ruffini',
        stage: 'division',
        title: say('Ruffiniren erregela', 'La regla de Ruffini', 'قاعدة روفيني', 'Ruffini\'s rule'),
        goal: say('Polinomio bat $x-a$ binomioaz Ruffiniz zatitzea, a osoa edo zatikia izanda ere.', 'Dividir un polinomio entre $x-a$ con Ruffini, aunque a sea entero o fraccionario.', 'قسمة حدودية على $x-a$ بروفيني، سواء كان a صحيحًا أو كسريًا.', 'Divide a polynomial by $x-a$ using Ruffini\'s rule, even when a is an integer or a fraction.'),
        needs: [
            { unit: 'dbh3/polinomios', topic: 'ruffini', title: { eu: 'Ruffiniren erregela', es: 'Regla de Ruffini', en: 'Ruffini\'s rule', ar: 'قاعدة روفيني' } }
        ],
        problem: say('Ruffiniz: $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x+1)$.', 'Con Ruffini: $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x+1)$.', 'بروفيني: $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x+1)$.', 'Using Ruffini: $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x+1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a=-1$. Jaitsi 1.', '$a=-1$. Baja el 1.', '$a=-1$. أنزل 1.', '$a=-1$. Bring down the 1.'), math: same('$1\\cdot(-1)+3=2$') },
            { text: say('Jarraitu.', 'Sigue.', 'تابع.', 'Continue.'), math: same('$2\\cdot(-1)-3=-5$') },
            { text: say('$-5\\cdot(-1)+3=8$; hondarra:', '$-5\\cdot(-1)+3=8$; el resto:', '$-5\\cdot(-1)+3=8$؛ الباقي:', '$-5\\cdot(-1)+3=8$; the remainder:'), math: same('$8\\cdot(-1)-4=-12$') }
        ],
        takeaway: say('Jaitsi, bider a, batu. Azkena hondarra da.', 'Baja, multiplica por a, suma. El último es el resto.', 'أنزل، اضرب في a، اجمع. الأخير هو الباقي.', 'Bring down, multiply by a, add. The last one is the remainder.'),
        figure: (language) => <RuffiniFigure language={language} />
    },
    {
        id: 'remainder',
        stage: 'division',
        figureAfterSteps: true,
        title: say('Hondarraren teorema eta parametroak', 'Teorema del resto y parámetros', 'مبرهنة الباقي والوسائط', 'Remainder theorem and parameters'),
        goal: say('$P(a)$ Ruffiniz kalkulatzea eta hondarraren teorema erabiltzea parametro baten balioa aurkitzeko.', 'Calcular $P(a)$ con Ruffini y usar el teorema del resto para hallar el valor de un parámetro.', 'حساب $P(a)$ بروفيني واستعمال مبرهنة الباقي لإيجاد قيمة وسيط.', 'Calculate $P(a)$ with Ruffini and use the remainder theorem to find the value of a parameter.'),
        needs: [
            { unit: 'dbh3/polinomios', topic: 'remainder', title: { eu: 'Hondarraren teorema', es: 'Teorema del resto', en: 'The remainder theorem', ar: 'مبرهنة الباقي' } }
        ],
        problem: say('$P(x)=7x^{3}-5mx-2$. Zenbat izan behar du m-k $P(x)\\mathbin{:}(x+1)$ zatiketaren hondarra $-4$ izateko?', '$P(x)=7x^{3}-5mx-2$. ¿Cuánto debe valer m para que el resto de $P(x)\\mathbin{:}(x+1)$ sea $-4$?', '$P(x)=7x^{3}-5mx-2$. كم يجب أن تكون m ليكون باقي $P(x)\\mathbin{:}(x+1)$ هو $-4$؟', '$P(x)=7x^{3}-5mx-2$. What must m be so that the remainder of $P(x)\\mathbin{:}(x+1)$ is $-4$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hondarra $P(-1)$ da.', 'El resto es $P(-1)$.', 'الباقي هو $P(-1)$.', 'The remainder is $P(-1)$.'), math: same('$-7+5m-2=5m-9$') },
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set them equal.'), math: same('$5m-9=-4\\ \\to\\ m=1$') }
        ],
        takeaway: say('Hondarra $=P(a)$. Parametroa: berdindu eta askatu.', 'Resto $=P(a)$. Parámetro: iguala y despeja.', 'الباقي $=P(a)$. الوسيط: ساوِ واستخرج.', 'Remainder $=P(a)$. Parameter: set it equal and solve for it.'),
        figure: (language) => <ParameterFigure language={language} />
    },

    /* ---------- 3. Roots and factorisation ---------- */
    {
        id: 'roots',
        stage: 'factor',
        title: say('Polinomio baten erroak', 'Raíces de un polinomio', 'جذور الحدودية', 'Roots of a polynomial'),
        goal: say('Erro osoak gai askearen zatitzaileen artean bilatzea eta erroak dituzten polinomioak asmatzea.', 'Buscar las raíces enteras entre los divisores del término independiente e inventar polinomios con raíces dadas.', 'البحث عن الجذور الصحيحة بين قواسم الحد الثابت وتكوين حدوديات لها جذور معطاة.', 'Look for the integer roots among the divisors of the constant term, and make up polynomials with given roots.'),
        needs: [
            { unit: 'dbh3/polinomios', topic: 'roots', title: { eu: 'Polinomio baten erroak', es: 'Raíces de un polinomio', en: 'Roots of a polynomial', ar: 'جذور كثير حدود' } }
        ],
        problem: say('$x^{3}+3x^{2}+x+3$ polinomioaren erro osoak 3 zenbakiaren zatitzaileen artean daude. Zein da erroa?', 'Las raíces enteras de $x^{3}+3x^{2}+x+3$ están entre los divisores de 3. ¿Cuál es la raíz?', 'الجذور الصحيحة لـ$x^{3}+3x^{2}+x+3$ بين قواسم 3. ما الجذر؟', 'The integer roots of $x^{3}+3x^{2}+x+3$ are among the divisors of 3. Which one is the root?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hautagaiak.', 'Candidatos.', 'المرشحون.', 'Candidates.'), math: same('$\\pm 1,\\ \\pm 3$') },
            { text: say('$x=-3$ probatu.', 'Prueba $x=-3$.', 'جرّب $x=-3$.', 'Try $x=-3$.'), math: same('$-27+27-3+3=0$') },
            { text: say('Zatidura $x^{2}+1$: ez du erro gehiago.', 'Cociente $x^{2}+1$: no hay más raíces.', 'خارج القسمة $x^{2}+1$: لا جذور أخرى.', 'Quotient $x^{2}+1$: there are no more roots.'), math: same('$(x+3)(x^{2}+1)$') }
        ],
        takeaway: say('Erro osoak: gai askearen zatitzaileak. $P(a)=0$ ⟺ $x-a$ faktorea.', 'Raíces enteras: divisores del término independiente. $P(a)=0$ ⟺ $x-a$ es factor.', 'الجذور الصحيحة: قواسم الحد الثابت. $P(a)=0$ ⟺ $x-a$ عامل.', 'Integer roots: divisors of the constant term. $P(a)=0$ ⟺ $x-a$ is a factor.'),
        figure: (language) => <RootsFigure language={language} />
    },
    {
        id: 'factorize',
        stage: 'factor',
        title: say('Polinomioak faktorizatzea', 'Factorizar polinomios', 'تحليل الحدوديات', 'Factorising polynomials'),
        goal: say('Polinomio bat faktore irreduziblez osatutako biderkadura gisa idaztea, urratsen ordena jarraituz.', 'Escribir un polinomio como producto de factores irreducibles siguiendo un orden de pasos.', 'كتابة الحدودية جداءً لعوامل غير قابلة للتحليل باتباع ترتيب الخطوات.', 'Write a polynomial as a product of irreducible factors, following a set order of steps.'),
        needs: [
            { unit: 'dbh3/polinomios', topic: 'common-factor', title: { eu: 'Faktore komuna atera', es: 'Sacar factor común', en: 'Taking out a common factor', ar: 'إخراج العامل المشترك' } },
            { unit: 'dbh3/polinomios', topic: 'factor-identities', title: { eu: 'Faktorizatu identitateekin eta erroekin', es: 'Factorizar con identidades y raíces', en: 'Factorising with special products and roots', ar: 'التحليل بالمتطابقات والجذور' } }
        ],
        problem: say('Faktorizatu $x^{3}-x^{2}-14x+24$.', 'Factoriza $x^{3}-x^{2}-14x+24$.', 'حلّل $x^{3}-x^{2}-14x+24$.', 'Factorise $x^{3}-x^{2}-14x+24$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('2 erroa da.', '2 es raíz.', '2 جذر.', '2 is a root.'), math: same('$8-4-28+24=0$') },
            { text: say('Ruffiniz zatidura.', 'Cociente con Ruffini.', 'خارج القسمة بروفيني.', 'Find the quotient with Ruffini.'), math: same('$x^{2}+x-12$') },
            { text: say('Haren erroak 3 eta $-4$.', 'Sus raíces son 3 y $-4$.', 'جذراه 3 و$-4$.', 'Its roots are 3 and $-4$.'), math: same('$(x-2)(x-3)(x+4)$') }
        ],
        takeaway: say('Faktore komuna → identitateak → Ruffini → 2. mailako ekuazioa.', 'Factor común → identidades → Ruffini → ecuación de 2.º grado.', 'العامل المشترك ← المتطابقات ← روفيني ← معادلة الدرجة الثانية.', 'Common factor → special identities → Ruffini → quadratic equation.'),
        figure: (language) => <FactorStrategyFigure language={language} />
    },
    {
        id: 'gcd-lcm',
        stage: 'factor',
        title: say('Zatigarritasuna, z.k.h. eta m.k.t.', 'Divisibilidad, m.c.d. y m.c.m.', 'قابلية القسمة والقاسم والمضاعف المشترك', 'Divisibility, GCD and LCM'),
        goal: say('Polinomio batek beste bat zatitzen duen erabakitzea eta bi polinomioren z.k.h. eta m.k.t. kalkulatzea.', 'Decidir si un polinomio divide a otro y calcular el m.c.d. y el m.c.m. de dos polinomios.', 'تحديد ما إذا كانت حدودية تقسم أخرى وحساب القاسم المشترك الأكبر والمضاعف المشترك الأصغر لحدوديتين.', 'Decide whether one polynomial divides another, and calculate the GCD and LCM of two polynomials.'),
        problem: say('Kalkulatu $P=x^{2}-4$ eta $Q=x^{2}+4x+4$ polinomioen z.k.h. eta m.k.t.', 'Calcula el m.c.d. y el m.c.m. de $P=x^{2}-4$ y $Q=x^{2}+4x+4$.', 'احسب القاسم المشترك الأكبر والمضاعف المشترك الأصغر لـ$P=x^{2}-4$ و$Q=x^{2}+4x+4$.', 'Calculate the GCD and LCM of $P=x^{2}-4$ and $Q=x^{2}+4x+4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu.', 'Factoriza.', 'حلّل.', 'Factorise.'), math: same('$\\begin{gathered}P=(x+2)(x-2)\\\\ Q=(x+2)^{2}\\end{gathered}$') },
            { text: say('Z.k.h.: komunak, txikiena.', 'M.c.d.: comunes, el menor.', 'القاسم: المشتركة بالأصغر.', 'GCD: common factors, the smallest.'), math: same('$x+2$') },
            { text: say('M.k.t.: denak, handiena.', 'M.c.m.: todos, el mayor.', 'المضاعف: الكل بالأكبر.', 'LCM: all factors, the largest.'), math: same('$(x+2)^{2}(x-2)$') }
        ],
        takeaway: say('Z.K.H.: komunak, txikiena. M.K.T.: denak, handiena.', 'M.C.D.: comunes, el menor. M.C.M.: todos, el mayor.', 'القاسم: المشتركة بالأصغر. المضاعف: الكل بالأكبر.', 'GCD: common factors, the smallest. LCM: all factors, the largest.'),
        figure: (language) => <GcdLcmFigure language={language} />
    },

    /* ---------- 4. Algebraic fractions ---------- */
    {
        id: 'algebraic-fractions',
        stage: 'fractions',
        title: say('Zatiki aljebraikoak', 'Fracciones algebraicas', 'الكسور الجبرية', 'Algebraic fractions'),
        goal: say('Zatiki aljebraikoak ezagutzea, haien zenbakizko balioa kalkulatzea eta zein baliotan ez dauden jakitea.', 'Reconocer fracciones algebraicas, calcular su valor numérico y saber en qué valores no existen.', 'التعرّف على الكسور الجبرية وحساب قيمتها العددية ومعرفة القيم التي لا تكون معرّفة عندها.', 'Recognise algebraic fractions, calculate their numerical value and know for which values they do not exist.'),
        problem: say('Kalkulatu $\\frac{x^{2}-1}{2x+1}$ zatikiaren balioa x = −2 denean.', 'Calcula el valor de $\\frac{x^{2}-1}{2x+1}$ para x = −2.', 'احسب قيمة $\\frac{x^{2}-1}{2x+1}$ عندما x = −2.', 'Calculate the value of $\\frac{x^{2}-1}{2x+1}$ for x = −2.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$\\frac{(-2)^{2}-1}{2\\cdot(-2)+1}=\\frac{3}{-3}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$\\frac{3}{-3}=-1$') }
        ],
        takeaway: say('$\\frac{P}{Q}$: ez dago $Q=0$ den tokian.', '$\\frac{P}{Q}$: no existe donde $Q=0$.', '$\\frac{P}{Q}$: غير معرّف حيث $Q=0$.', '$\\frac{P}{Q}$: it does not exist where $Q=0$.'),
        figure: (language) => <DomainFigure language={language} />
    },
    {
        id: 'simplify',
        stage: 'fractions',
        title: say('Zatiki aljebraikoak sinplifikatzea', 'Simplificar fracciones algebraicas', 'تبسيط الكسور الجبرية', 'Simplifying algebraic fractions'),
        goal: say('Zenbakitzailea eta izendatzailea faktorizatzea eta faktore komunak ezabatzea.', 'Factorizar numerador y denominador y eliminar los factores comunes.', 'تحليل البسط والمقام وحذف العوامل المشتركة.', 'Factorise the numerator and denominator and cancel the common factors.'),
        needs: [
            { unit: 'dbh3/polinomios', topic: 'algebraic-fractions', title: { eu: 'Zatiki aljebraikoak sinplifikatu', es: 'Simplificar fracciones algebraicas', en: 'Simplifying algebraic fractions', ar: 'تبسيط الكسور الجبرية' } }
        ],
        problem: say('Sinplifikatu $\\frac{x^{2}-5x+6}{x^{2}-4}$.', 'Simplifica $\\frac{x^{2}-5x+6}{x^{2}-4}$.', 'بسّط $\\frac{x^{2}-5x+6}{x^{2}-4}$.', 'Simplify $\\frac{x^{2}-5x+6}{x^{2}-4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbakitzailea: erroak 2 eta 3.', 'Numerador: raíces 2 y 3.', 'البسط: الجذران 2 و3.', 'Numerator: roots 2 and 3.'), math: same('$(x-2)(x-3)$') },
            { text: say('Izendatzailea.', 'Denominador.', 'المقام.', 'Denominator.'), math: same('$(x+2)(x-2)$') },
            { text: say('Ezabatu $x-2$.', 'Elimina $x-2$.', 'احذف $x-2$.', 'Cancel $x-2$.'), math: same('$\\frac{x-3}{x+2}$') }
        ],
        takeaway: say('Faktorizatu, gero ezabatu: faktoreak bai, batugaiak ez.', 'Factoriza y elimina: factores sí, sumandos no.', 'حلّل ثم احذف: العوامل نعم، الحدود المجموعة لا.', 'Factorise and cancel: factors yes, added terms no.'),
        figure: (language) => <AlgebraicFractionFigure language={language} />
    },
    {
        id: 'equivalent',
        stage: 'fractions',
        title: say('Zatiki baliokideak', 'Fracciones equivalentes', 'الكسور المتكافئة', 'Equivalent fractions'),
        goal: say('Bi zatiki aljebraiko baliokideak diren egiaztatzea eta zatiki baliokide bat osatzea.', 'Comprobar si dos fracciones algebraicas son equivalentes y completar una fracción equivalente.', 'التحقق من تكافؤ كسرين جبريين وإكمال كسر مكافئ.', 'Check whether two algebraic fractions are equivalent, and complete an equivalent fraction.'),
        problem: say('Baliokideak dira $\\frac{x-2}{x+3}$ eta $\\frac{x^{2}-4}{x^{2}+5x+6}$?', '¿Son equivalentes $\\frac{x-2}{x+3}$ y $\\frac{x^{2}-4}{x^{2}+5x+6}$?', 'هل $\\frac{x-2}{x+3}$ و$\\frac{x^{2}-4}{x^{2}+5x+6}$ متكافئان؟', 'Are $\\frac{x-2}{x+3}$ and $\\frac{x^{2}-4}{x^{2}+5x+6}$ equivalent?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu bigarrena.', 'Factoriza la segunda.', 'حلّل الثاني.', 'Factorise the second one.'), math: same('$\\frac{(x+2)(x-2)}{(x+2)(x+3)}$') },
            { text: say('Sinplifikatu: bai, baliokideak dira.', 'Simplifica: sí, son equivalentes.', 'بسّط: نعم، متكافئان.', 'Simplify: yes, they are equivalent.'), math: same('$\\frac{x-2}{x+3}$') }
        ],
        takeaway: say('Baliokideak: $P\\cdot S=Q\\cdot R$.', 'Equivalentes: $P\\cdot S=Q\\cdot R$.', 'متكافئان: $P\\cdot S=Q\\cdot R$.', 'Equivalent: $P\\cdot S=Q\\cdot R$.'),
        figure: (language) => <EquivalentFractionsFigure language={language} />
    },

    /* ---------- 5. Operations with algebraic fractions ---------- */
    {
        id: 'add-fractions',
        stage: 'operate',
        title: say('Batuketa eta kenketa', 'Suma y resta', 'الجمع والطرح', 'Addition and subtraction'),
        goal: say('Zatiki aljebraikoak izendatzaile komunera eramatea eta batu edo kentzea.', 'Reducir fracciones algebraicas a común denominador y sumarlas o restarlas.', 'توحيد مقامات الكسور الجبرية وجمعها أو طرحها.', 'Reduce algebraic fractions to a common denominator, and add or subtract them.'),
        needs: [
            { unit: 'dbh3/numeros-racionales', topic: 'add-sub', title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', en: 'Addition and subtraction', ar: 'الجمع والطرح' } }
        ],
        problem: say('Kalkulatu $\\frac{x}{x-2}-\\frac{2}{x}$.', 'Calcula $\\frac{x}{x-2}-\\frac{2}{x}$.', 'احسب $\\frac{x}{x-2}-\\frac{2}{x}$.', 'Calculate $\\frac{x}{x-2}-\\frac{2}{x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('M.k.t. $=x(x-2)$.', 'M.c.m. $=x(x-2)$.', 'المضاعف $=x(x-2)$.', 'LCM $=x(x-2)$.'), math: same('$\\frac{x\\cdot x-2(x-2)}{x(x-2)}$') },
            { text: say('Zenbakitzailea garatu.', 'Desarrolla el numerador.', 'انشر البسط.', 'Expand the numerator.'), math: same('$\\frac{x^{2}-2x+4}{x(x-2)}$') }
        ],
        takeaway: say('Izendatzaile komuna = m.k.t.; kentzean, parentesia.', 'Denominador común = m.c.m.; al restar, paréntesis.', 'المقام المشترك = المضاعف المشترك الأصغر؛ وعند الطرح قوس.', 'Common denominator = LCM; when subtracting, use brackets.'),
        figure: (language) => <CommonDenominatorFigure language={language} />
    },
    {
        id: 'multiply-fractions',
        stage: 'operate',
        title: say('Biderkadura eta zatidura', 'Producto y cociente', 'الضرب والقسمة', 'Product and quotient'),
        goal: say('Zatiki aljebraikoak biderkatu eta zatitzea, eta emaitza sinplifikatzea.', 'Multiplicar y dividir fracciones algebraicas y simplificar el resultado.', 'ضرب الكسور الجبرية وقسمتها وتبسيط الناتج.', 'Multiply and divide algebraic fractions, and simplify the result.'),
        problem: say('Kalkulatu eta sinplifikatu $\\frac{2x+4}{x-3}\\mathbin{:}\\frac{x^{2}-4}{x^{2}-9}$.', 'Calcula y simplifica $\\frac{2x+4}{x-3}\\mathbin{:}\\frac{x^{2}-4}{x^{2}-9}$.', 'احسب وبسّط $\\frac{2x+4}{x-3}\\mathbin{:}\\frac{x^{2}-4}{x^{2}-9}$.', 'Calculate and simplify $\\frac{2x+4}{x-3}\\mathbin{:}\\frac{x^{2}-4}{x^{2}-9}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Buelta eman eta faktorizatu.', 'Da la vuelta y factoriza.', 'اقلب وحلّل.', 'Flip the second fraction and factorise.'), math: same('$\\frac{2(x+2)(x+3)(x-3)}{(x-3)(x+2)(x-2)}$') },
            { text: say('Ezabatu faktore komunak.', 'Elimina los factores comunes.', 'احذف العوامل المشتركة.', 'Cancel the common factors.'), math: same('$\\frac{2(x+3)}{x-2}$') }
        ],
        takeaway: say('Biderkatu: goikoak eta behekoak. Zatitu: bigarrenari buelta. Lehenik faktorizatu.', 'Multiplicar: arriba por arriba y abajo por abajo. Dividir: la vuelta a la segunda. Primero factoriza.', 'الضرب: بسط في بسط ومقام في مقام. القسمة: اقلب الثاني. حلّل أولًا.', 'Multiply: top by top and bottom by bottom. Divide: flip the second one. Factorise first.'),
        figure: (language) => <FractionProductFigure language={language} />
    },
    {
        id: 'combined',
        stage: 'operate',
        title: say('Eragiketa konbinatuak eta problemak', 'Operaciones combinadas y problemas', 'العمليات المركّبة والمسائل', 'Combined operations and problems'),
        goal: say('Zatiki aljebraikoekin eragiketa konbinatuak egitea eta problemak zatiki aljebraikoekin adieraztea.', 'Hacer operaciones combinadas con fracciones algebraicas y expresar problemas con ellas.', 'إجراء عمليات مركّبة على الكسور الجبرية والتعبير بها عن المسائل.', 'Do combined operations with algebraic fractions, and express problems using them.'),
        problem: say('Kalkulatu $\\left(\\frac{x}{x-1}-1\\right)\\cdot(x^{2}-1)$.', 'Calcula $\\left(\\frac{x}{x-1}-1\\right)\\cdot(x^{2}-1)$.', 'احسب $\\left(\\frac{x}{x-1}-1\\right)\\cdot(x^{2}-1)$.', 'Calculate $\\left(\\frac{x}{x-1}-1\\right)\\cdot(x^{2}-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Parentesia.', 'El paréntesis.', 'القوس.', 'The brackets.'), math: same('$\\frac{x-(x-1)}{x-1}=\\frac{1}{x-1}$') },
            { text: say('Biderkatu eta sinplifikatu.', 'Multiplica y simplifica.', 'اضرب وبسّط.', 'Multiply and simplify.'), math: same('$\\frac{(x+1)(x-1)}{x-1}=x+1$') }
        ],
        takeaway: say('Ordena: parentesiak, biderketak eta zatiketak, batuketak.', 'Orden: paréntesis, productos y cocientes, sumas.', 'الترتيب: الأقواس، الضرب والقسمة، الجمع.', 'Order: brackets, products and quotients, then sums.'),
        figure: (language) => <TapsFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const polynomialsFractionsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...polynomialsLessonTexts[topic.id as PolynomialsTopicId], ...polynomialsLessonChecks[topic.id as PolynomialsTopicId] }))

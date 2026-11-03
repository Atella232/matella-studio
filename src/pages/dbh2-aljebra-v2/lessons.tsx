import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { MachineFigure, MonomialFigure, TilesFigure } from '../dbh1-aljebra-v2/figures'
import { CommonFactorFigure, PatternFigure, PolynomialFigure, ProductAreaFigure, SquareDifferenceFigure, SquareSumFigure, SumDifferenceFigure } from './figures'
import { algebraLessonChecks, type AlgebraTopicId } from './lessonChecks'
import { algebraLessonTexts } from './lessonTexts'

/* ==========================================================================
   Aljebra · 2. DBH — stages and lessons
   Sequence follows the class textbook (Santillana 2.º ESO unit 5,
   "Expresiones algebraicas") with Anaya 2.º ESO unit 6: algebraic language
   and general terms, numerical value, monomials and their operations,
   polynomials and their operations, notable products and taking out a
   common factor. Letters in italics as usual; products written with ·.
   ========================================================================== */

export type AlgebraStageId = 'language' | 'monomials' | 'polynomials' | 'products' | 'factor'

export const algebraStages: UnitStage[] = [
    { id: 'language', tone: 'blue', title: { eu: 'Hizkuntza aljebraikoa', es: 'Lenguaje algebraico', en: 'Algebraic language', ar: 'اللغة الجبرية' } },
    { id: 'monomials', tone: 'violet', title: { eu: 'Monomioak', es: 'Monomios', en: 'Monomials', ar: 'وحيدات الحد' } },
    { id: 'polynomials', tone: 'mustard', title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'الحدوديات' } },
    { id: 'products', tone: 'coral', title: { eu: 'Biderkadura nabarmenak', es: 'Productos notables', en: 'Special products', ar: 'المتطابقات الشهيرة' } },
    { id: 'factor', tone: 'green', title: { eu: 'Faktore komuna eta faktorizazioa', es: 'Factor común y factorización', en: 'Common factor and factorisation', ar: 'العامل المشترك والتحليل' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'language',
        stage: 'language',
        figureAfterSteps: true,
        title: { eu: 'Hizkuntza aljebraikoa eta segidak', es: 'Lenguaje algebraico y series', en: 'Algebraic language and sequences', ar: 'اللغة الجبرية والمتتاليات' },
        goal: {
            eu: 'Esaldiak adierazpen aljebraiko bihurtzea eta segida baten gai orokorra idaztea.',
            es: 'Traducir enunciados a expresiones algebraicas y escribir el término general de una serie.',
            en: 'Translate statements into algebraic expressions and write the nth term of a sequence.',
            ar: 'ترجمة العبارات إلى عبارات جبرية وكتابة الحد العام لمتتالية.'
        },
        problem: { eu: 'Segida: 1, 4, 7, 10, … Idatzi gai orokorra eta kalkulatu 20. gaia.', es: 'Serie: 1, 4, 7, 10, … Escribe el término general y calcula el término 20.', en: 'Sequence: 1, 4, 7, 10, … Write the nth term and calculate the 20th term.', ar: 'المتتالية: 1، 4، 7، 10، … اكتب الحد العام واحسب الحد العشرين.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Gai bakoitza aurrekoa gehi 3 da: 3n agertuko da.', es: 'Cada término es el anterior más 3: aparecerá 3n.', en: 'Each term is the previous one plus 3: 3n will appear.', ar: 'كل حد هو السابق زائد 3: سيظهر 3n.' }, math: '$3\\cdot 1=3,\\ 3\\cdot 2=6,\\ 3\\cdot 3=9$' },
            { text: { eu: '3n-ri 2 kendu behar zaio segidako zenbakiak lortzeko.', es: 'A 3n hay que quitarle 2 para obtener los números de la serie.', en: 'To get the numbers in the sequence, subtract 2 from 3n.', ar: 'يجب طرح 2 من 3n للحصول على أعداد المتتالية.' }, math: '$a_{n}=3n-2$' },
            { text: { eu: 'Ordeztu n = 20.', es: 'Sustituye n = 20.', en: 'Substitute n = 20.', ar: 'عوّض n = 20.' }, math: '$a_{20}=3\\cdot 20-2=58$' }
        ],
        takeaway: {
            eu: 'Gai orokorrarekin, segidaren edozein gai kalkula daiteke.',
            es: 'Con el término general se puede calcular cualquier término de la serie.',
            en: 'With the nth term you can calculate any term of the sequence.',
            ar: 'بالحد العام نحسب أي حد من المتتالية.'
        },
        figure: (language) => <PatternFigure language={language} />
    },
    {
        id: 'value',
        stage: 'language',
        needs: [{ unit: 'dbh2/numeros-enteros', topic: 'combined', title: { eu: 'Eragiketa konbinatuak eta kako zuzenak', es: 'Operaciones combinadas y corchetes', en: 'Combined operations and square brackets', ar: 'العمليات المركبة والأقواس المعقوفة' } }],
        title: { eu: 'Zenbakizko balioa', es: 'Valor numérico', en: 'Numerical value', ar: 'القيمة العددية' },
        goal: {
            eu: 'Adierazpen aljebraiko baten zenbakizko balioa kalkulatzea, zenbaki negatiboekin ere.',
            es: 'Calcular el valor numérico de una expresión algebraica, también con números negativos.',
            en: 'Calculate the numerical value of an algebraic expression, including with negative numbers.',
            ar: 'حساب القيمة العددية لعبارة جبرية، حتى مع الأعداد السالبة.'
        },
        problem: { eu: 'Kalkulatu $-4x^{2}+3x$ balioa $x=-3$ denean.', es: 'Calcula el valor de $-4x^{2}+3x$ para $x=-3$.', en: 'Calculate the value of $-4x^{2}+3x$ for $x=-3$.', ar: 'احسب قيمة $-4x^{2}+3x$ عندما $x=-3$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Ordeztu, parentesiekin.', es: 'Sustituye, con paréntesis.', en: 'Substitute, using brackets.', ar: 'عوّض مع الأقواس.' }, math: '$-4\\cdot(-3)^{2}+3\\cdot(-3)$' },
            { text: { eu: 'Lehenik berretura.', es: 'Primero la potencia.', en: 'First the power.', ar: 'القوة أولًا.' }, math: '$-4\\cdot 9-9$' },
            { text: { eu: 'Biderketa eta kenketa.', es: 'Producto y resta.', en: 'Multiplication and subtraction.', ar: 'الضرب ثم الطرح.' }, math: '$-36-9=-45$' }
        ],
        takeaway: {
            eu: '$(-3)^{2}=9$, baina $-3^{2}=-9$: parentesiak garrantzitsuak dira.',
            es: '$(-3)^{2}=9$, pero $-3^{2}=-9$: los paréntesis importan.',
            en: '$(-3)^{2}=9$, but $-3^{2}=-9$: the brackets matter.',
            ar: '$(-3)^{2}=9$ لكن $-3^{2}=-9$: الأقواس مهمة.'
        },
        figure: (language) => <MachineFigure language={language} />
    },
    {
        id: 'monomial',
        stage: 'monomials',
        title: { eu: 'Monomioak', es: 'Monomios', en: 'Monomials', ar: 'وحيدات الحد' },
        goal: {
            eu: 'Monomio baten koefizientea, zati literala eta maila ezagutzea; antzekoak eta aurkakoak bereiztea.',
            es: 'Reconocer el coeficiente, la parte literal y el grado de un monomio; distinguir semejantes y opuestos.',
            en: 'Recognise the coefficient, the literal part and the degree of a monomial, and tell apart like and opposite monomials.',
            ar: 'معرفة معامل وحيد الحد وجزئه الحرفي ودرجته؛ وتمييز المتشابهة والمتعاكسة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Adibidea', es: 'Ejemplo', en: 'Example', ar: 'مثال' }, text: { eu: 'Koefizientea −5, zati literala $x^{2}yz$, maila 4.', es: 'Coeficiente −5, parte literal $x^{2}yz$, grado 4.', en: 'Coefficient −5, literal part $x^{2}yz$, degree 4.', ar: 'المعامل −5، الجزء الحرفي $x^{2}yz$، الدرجة 4.' }, math: '$-5x^{2}yz\\ \\to\\ 2+1+1=4$' },
            { title: { eu: 'Antzekoak', es: 'Semejantes', en: 'Like terms', ar: 'متشابهة' }, text: { eu: 'Zati literal bera.', es: 'Misma parte literal.', en: 'Same literal part.', ar: 'الجزء الحرفي نفسه.' }, math: '$3ab^{2},\\ -2ab^{2}$' },
            { title: { eu: 'Aurkakoak', es: 'Opuestos', en: 'Opposites', ar: 'متعاكسة' }, text: { eu: 'Antzekoak eta koefiziente aurkakoak: batuta 0.', es: 'Semejantes y con coeficientes opuestos: suman 0.', en: 'Like terms with opposite coefficients: they add up to 0.', ar: 'متشابهة بمعاملات متعاكسة: مجموعها 0.' }, math: '$7xy^{3},\\ -7xy^{3}$' }
        ],
        takeaway: {
            eu: 'Letrarik gabeko zenbaki bat 0 mailako monomioa da.',
            es: 'Un número sin letras es un monomio de grado 0.',
            en: 'A number without letters is a monomial of degree 0.',
            ar: 'العدد الخالي من الحروف وحيد حد من الدرجة 0.'
        },
        figure: (language) => <MonomialFigure language={language} />
    },
    {
        id: 'add-monomials',
        stage: 'monomials',
        title: { eu: 'Monomioen batuketa eta kenketa', es: 'Suma y resta de monomios', en: 'Adding and subtracting monomials', ar: 'جمع وحيدات الحد وطرحها' },
        goal: {
            eu: 'Monomio antzekoak batu eta kentzea eta adierazpenak laburtzea.',
            es: 'Sumar y restar monomios semejantes y reducir expresiones.',
            en: 'Add and subtract like monomials and simplify expressions.',
            ar: 'جمع وحيدات الحد المتشابهة وطرحها وتبسيط العبارات.'
        },
        problem: { eu: 'Laburtu: $5x^{2}+3x-4x^{2}-2x+1$.', es: 'Reduce: $5x^{2}+3x-4x^{2}-2x+1$.', en: 'Simplify: $5x^{2}+3x-4x^{2}-2x+1$.', ar: 'بسّط: $5x^{2}+3x-4x^{2}-2x+1$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Elkartu $x^{2}$-dun gaiak.', es: 'Agrupa los términos en $x^{2}$.', en: 'Group the terms in $x^{2}$.', ar: 'اجمع حدود $x^{2}$.' }, math: '$5x^{2}-4x^{2}=x^{2}$' },
            { text: { eu: 'Elkartu $x$-dun gaiak.', es: 'Agrupa los términos en $x$.', en: 'Group the terms in $x$.', ar: 'اجمع حدود $x$.' }, math: '$3x-2x=x$' },
            { text: { eu: 'Gai askea bere horretan geratzen da.', es: 'El término independiente se queda igual.', en: 'The constant term stays the same.', ar: 'يبقى الحد الثابت كما هو.' }, math: '$x^{2}+x+1$' }
        ],
        takeaway: {
            eu: '$x^{2}+x$ ez da $2x^{3}$: antzekoak ez direnak ez dira batzen.',
            es: '$x^{2}+x$ no es $2x^{3}$: lo que no es semejante no se suma.',
            en: '$x^{2}+x$ is not $2x^{3}$: unlike terms are not added together.',
            ar: '$x^{2}+x$ ليست $2x^{3}$: غير المتشابه لا يُجمع.'
        },
        figure: (language) => <TilesFigure language={language} />
    },
    {
        id: 'multiply-monomials',
        stage: 'monomials',
        title: { eu: 'Monomioen biderketa eta zatiketa', es: 'Producto y cociente de monomios', en: 'Multiplying and dividing monomials', ar: 'ضرب وحيدات الحد وقسمتها' },
        goal: {
            eu: 'Monomioak biderkatu eta zatitzea, berreturen propietateak erabiliz.',
            es: 'Multiplicar y dividir monomios usando las propiedades de las potencias.',
            en: 'Multiply and divide monomials using the properties of powers.',
            ar: 'ضرب وحيدات الحد وقسمتها باستعمال خصائص القوى.'
        },
        problem: { eu: 'Kalkulatu: $(4x^{3}y)\\cdot(-2xy)$ eta $(12x^{5})\\mathbin{:}(3x^{2})$.', es: 'Calcula: $(4x^{3}y)\\cdot(-2xy)$ y $(12x^{5})\\mathbin{:}(3x^{2})$.', en: 'Calculate: $(4x^{3}y)\\cdot(-2xy)$ and $(12x^{5})\\mathbin{:}(3x^{2})$.', ar: 'احسب: $(4x^{3}y)\\cdot(-2xy)$ و$(12x^{5})\\mathbin{:}(3x^{2})$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Koefizienteak: $4\\cdot(-2)=-8$. Berretzaileak batu.', es: 'Coeficientes: $4\\cdot(-2)=-8$. Suma los exponentes.', en: 'Coefficients: $4\\cdot(-2)=-8$. Add the exponents.', ar: 'المعاملات: $4\\cdot(-2)=-8$. اجمع الأسس.' }, math: '$-8x^{4}y^{2}$' },
            { text: { eu: 'Zatiketa: $12\\mathbin{:}3=4$, eta berretzaileak kendu.', es: 'División: $12\\mathbin{:}3=4$, y resta los exponentes.', en: 'Division: $12\\mathbin{:}3=4$, and subtract the exponents.', ar: 'القسمة: $12\\mathbin{:}3=4$ واطرح الأسس.' }, math: '$4x^{3}$' }
        ],
        takeaway: {
            eu: 'Biderkatzean berretzaileak batu; zatitzean, kendu.',
            es: 'Al multiplicar se suman los exponentes; al dividir, se restan.',
            en: 'When multiplying, add the exponents; when dividing, subtract them.',
            ar: 'عند الضرب نجمع الأسس، وعند القسمة نطرحها.'
        }
    },
    {
        id: 'polynomial',
        stage: 'polynomials',
        title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'الحدوديات' },
        goal: {
            eu: 'Polinomio baten maila, gai askea, zenbakizko balioa eta aurkakoa kalkulatzea.',
            es: 'Calcular el grado, el término independiente, el valor numérico y el opuesto de un polinomio.',
            en: 'Calculate the degree, the constant term, the numerical value and the opposite of a polynomial.',
            ar: 'حساب درجة الحدودية وحدّها الثابت وقيمتها العددية ومعاكستها.'
        },
        problem: { eu: '$P(x)=x^{3}-x^{2}+3x-1$. Kalkulatu P(2) eta idatzi −P(x).', es: '$P(x)=x^{3}-x^{2}+3x-1$. Calcula P(2) y escribe −P(x).', en: '$P(x)=x^{3}-x^{2}+3x-1$. Calculate P(2) and write −P(x).', ar: '$P(x)=x^{3}-x^{2}+3x-1$. احسب P(2) واكتب −P(x).' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Maila 3 da, eta gai askea −1.', es: 'El grado es 3 y el término independiente, −1.', en: 'The degree is 3 and the constant term is −1.', ar: 'الدرجة 3 والحد الثابت −1.' } },
            { text: { eu: 'Ordeztu x = 2.', es: 'Sustituye x = 2.', en: 'Substitute x = 2.', ar: 'عوّض x = 2.' }, math: '$P(2)=8-4+6-1=9$' },
            { text: { eu: 'Aldatu zeinu guztiak.', es: 'Cambia todos los signos.', en: 'Change all the signs.', ar: 'غيّر كل الإشارات.' }, math: '$-P(x)=-x^{3}+x^{2}-3x+1$' }
        ],
        takeaway: {
            eu: 'P(0) beti gai askea da.',
            es: 'P(0) es siempre el término independiente.',
            en: 'P(0) is always the constant term.',
            ar: 'P(0) هي دائمًا الحد الثابت.'
        },
        figure: (language) => <PolynomialFigure language={language} />
    },
    {
        id: 'add-polynomials',
        stage: 'polynomials',
        needs: [{ unit: 'dbh2/numeros-enteros', topic: 'brackets', title: { eu: 'Parentesidun batuketak eta kenketak', es: 'Sumas y restas con paréntesis', en: 'Additions and subtractions with brackets', ar: 'الجمع والطرح مع الأقواس' } }],
        title: { eu: 'Polinomioen batuketa eta kenketa', es: 'Suma y resta de polinomios', en: 'Adding and subtracting polynomials', ar: 'جمع الحدوديات وطرحها' },
        goal: {
            eu: 'Polinomioak batu eta kentzea, parentesiak ondo kenduz.',
            es: 'Sumar y restar polinomios quitando bien los paréntesis.',
            en: 'Add and subtract polynomials, removing the brackets correctly.',
            ar: 'جمع الحدوديات وطرحها مع حذف الأقواس بشكل صحيح.'
        },
        problem: { eu: 'Kalkulatu $(5x^{2}-2x-3)-(4x^{2}+3x-1)$.', es: 'Calcula $(5x^{2}-2x-3)-(4x^{2}+3x-1)$.', en: 'Calculate $(5x^{2}-2x-3)-(4x^{2}+3x-1)$.', ar: 'احسب $(5x^{2}-2x-3)-(4x^{2}+3x-1)$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Kendu parentesiak: bigarrenean zeinu guztiak aldatzen dira.', es: 'Quita los paréntesis: en el segundo cambian todos los signos.', en: 'Remove the brackets: in the second one, all the signs change.', ar: 'احذف الأقواس: تتغيّر كل الإشارات في الثاني.' }, math: '$5x^{2}-2x-3-4x^{2}-3x+1$' },
            { text: { eu: 'Elkartu antzekoak.', es: 'Agrupa los semejantes.', en: 'Group the like terms.', ar: 'اجمع المتشابهة.' }, math: '$x^{2}-5x-2$' }
        ],
        takeaway: {
            eu: 'Minus baten atzeko parentesia: zeinu guztiak aldatu, ez lehenengoa bakarrik.',
            es: 'Paréntesis tras un menos: cambian todos los signos, no solo el primero.',
            en: 'A bracket after a minus: all the signs change, not only the first one.',
            ar: 'قوس بعد ناقص: تتغيّر كل الإشارات لا الأولى فقط.'
        }
    },
    {
        id: 'multiply-monomial',
        stage: 'polynomials',
        title: { eu: 'Polinomioa bider monomioa eta zati monomioa', es: 'Polinomio por monomio y entre monomio', en: 'Multiplying and dividing a polynomial by a monomial', ar: 'حدودية في وحيد حد وعلى وحيد حد' },
        goal: {
            eu: 'Polinomio bat monomio batez biderkatu eta zatitzea.',
            es: 'Multiplicar y dividir un polinomio por un monomio.',
            en: 'Multiply and divide a polynomial by a monomial.',
            ar: 'ضرب حدودية في وحيد حد وقسمتها عليه.'
        },
        problem: { eu: 'Kalkulatu $3x^{2}\\cdot(2x^{2}-x+4)$ eta $(10x^{3}-4x^{2}+6x)\\mathbin{:}2x$.', es: 'Calcula $3x^{2}\\cdot(2x^{2}-x+4)$ y $(10x^{3}-4x^{2}+6x)\\mathbin{:}2x$.', en: 'Calculate $3x^{2}\\cdot(2x^{2}-x+4)$ and $(10x^{3}-4x^{2}+6x)\\mathbin{:}2x$.', ar: 'احسب $3x^{2}\\cdot(2x^{2}-x+4)$ و$(10x^{3}-4x^{2}+6x)\\mathbin{:}2x$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu gai bakoitza $3x^{2}$-z.', es: 'Multiplica cada término por $3x^{2}$.', en: 'Multiply each term by $3x^{2}$.', ar: 'اضرب كل حد في $3x^{2}$.' }, math: '$6x^{4}-3x^{3}+12x^{2}$' },
            { text: { eu: 'Zatitu gai bakoitza $2x$-z.', es: 'Divide cada término entre $2x$.', en: 'Divide each term by $2x$.', ar: 'اقسم كل حد على $2x$.' }, math: '$5x^{2}-2x+3$' }
        ],
        takeaway: {
            eu: 'Monomioak gai GUZTIAK biderkatzen ditu.',
            es: 'El monomio multiplica a TODOS los términos.',
            en: 'The monomial multiplies ALL the terms.',
            ar: 'وحيد الحد يضرب كل الحدود.'
        }
    },
    {
        id: 'multiply-polynomials',
        stage: 'polynomials',
        title: { eu: 'Polinomioen biderketa', es: 'Producto de polinomios', en: 'Multiplying polynomials', ar: 'ضرب الحدوديات' },
        goal: {
            eu: 'Bi polinomio biderkatzea eta emaitza laburtzea.',
            es: 'Multiplicar dos polinomios y reducir el resultado.',
            en: 'Multiply two polynomials and simplify the result.',
            ar: 'ضرب حدوديتين وتبسيط الناتج.'
        },
        problem: { eu: 'Kalkulatu $(2x-7)\\cdot(3x-4)$.', es: 'Calcula $(2x-7)\\cdot(3x-4)$.', en: 'Calculate $(2x-7)\\cdot(3x-4)$.', ar: 'احسب $(2x-7)\\cdot(3x-4)$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu $2x$ bigarren parentesi osoaz.', es: 'Multiplica $2x$ por todo el segundo paréntesis.', en: 'Multiply $2x$ by the whole second bracket.', ar: 'اضرب $2x$ في القوس الثاني كله.' }, math: '$6x^{2}-8x$' },
            { text: { eu: 'Biderkatu −7 bigarren parentesi osoaz.', es: 'Multiplica −7 por todo el segundo paréntesis.', en: 'Multiply −7 by the whole second bracket.', ar: 'اضرب −7 في القوس الثاني كله.' }, math: '$-21x+28$' },
            { text: { eu: 'Batu eta laburtu.', es: 'Suma y reduce.', en: 'Add and simplify.', ar: 'اجمع وبسّط.' }, math: '$6x^{2}-29x+28$' }
        ],
        takeaway: {
            eu: '2 gai bider 2 gai: 4 biderketa, gero laburtu.',
            es: '2 términos por 2 términos: 4 productos, y luego reduce.',
            en: '2 terms by 2 terms: 4 products, and then simplify.',
            ar: 'حدّان في حدّين: 4 عمليات ضرب ثم التبسيط.'
        },
        figure: (language) => <ProductAreaFigure language={language} />
    },
    {
        id: 'square-sum',
        stage: 'products',
        title: { eu: 'Batura baten karratua', es: 'Cuadrado de una suma', en: 'Square of a sum', ar: 'مربع مجموع' },
        goal: {
            eu: '$(a+b)^{2}$ garatzea biderketa osoa egin gabe.',
            es: 'Desarrollar $(a+b)^{2}$ sin hacer toda la multiplicación.',
            en: 'Expand $(a+b)^{2}$ without doing the whole multiplication.',
            ar: 'نشر $(a+b)^{2}$ دون إجراء الضرب كاملًا.'
        },
        problem: { eu: 'Garatu $(3x+2)^{2}$.', es: 'Desarrolla $(3x+2)^{2}$.', en: 'Expand $(3x+2)^{2}$.', ar: 'انشر $(3x+2)^{2}$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Lehenaren karratua.', es: 'Cuadrado del primero.', en: 'Square of the first.', ar: 'مربع الأول.' }, math: '$(3x)^{2}=9x^{2}$' },
            { text: { eu: 'Biderkaduraren bikoitza.', es: 'Doble del producto.', en: 'Twice the product.', ar: 'ضعف الجداء.' }, math: '$2\\cdot 3x\\cdot 2=12x$' },
            { text: { eu: 'Bigarrenaren karratua, eta batu.', es: 'Cuadrado del segundo, y suma.', en: 'Square of the second, and add.', ar: 'مربع الثاني ثم اجمع.' }, math: '$9x^{2}+12x+4$' }
        ],
        takeaway: {
            eu: 'Lehenaren karratua + bikoitza bider biderkadura + bigarrenaren karratua.',
            es: 'Cuadrado del primero + doble del producto + cuadrado del segundo.',
            en: 'Square of the first + twice the product + square of the second.',
            ar: 'مربع الأول + ضعف الجداء + مربع الثاني.'
        },
        figure: (language) => <SquareSumFigure language={language} />
    },
    {
        id: 'square-difference',
        stage: 'products',
        title: { eu: 'Kendura baten karratua', es: 'Cuadrado de una diferencia', en: 'Square of a difference', ar: 'مربع فرق' },
        goal: {
            eu: '$(a-b)^{2}$ garatzea.',
            es: 'Desarrollar $(a-b)^{2}$.',
            en: 'Expand $(a-b)^{2}$.',
            ar: 'نشر $(a-b)^{2}$.'
        },
        problem: { eu: 'Garatu $(2x-5)^{2}$.', es: 'Desarrolla $(2x-5)^{2}$.', en: 'Expand $(2x-5)^{2}$.', ar: 'انشر $(2x-5)^{2}$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Lehenaren karratua.', es: 'Cuadrado del primero.', en: 'Square of the first.', ar: 'مربع الأول.' }, math: '$(2x)^{2}=4x^{2}$' },
            { text: { eu: 'Biderkaduraren bikoitza, minus zeinuarekin.', es: 'Doble del producto, con signo menos.', en: 'Twice the product, with a minus sign.', ar: 'ضعف الجداء بإشارة ناقص.' }, math: '$-2\\cdot 2x\\cdot 5=-20x$' },
            { text: { eu: 'Bigarrenaren karratua, positiboa.', es: 'Cuadrado del segundo, positivo.', en: 'Square of the second, positive.', ar: 'مربع الثاني موجبًا.' }, math: '$4x^{2}-20x+25$' }
        ],
        takeaway: {
            eu: 'Erdiko gaia bakarrik da negatiboa.',
            es: 'Solo el término del medio es negativo.',
            en: 'Only the middle term is negative.',
            ar: 'الحد الأوسط وحده سالب.'
        },
        figure: (language) => <SquareDifferenceFigure language={language} />
    },
    {
        id: 'sum-difference',
        stage: 'products',
        title: { eu: 'Batura bider kendura', es: 'Suma por diferencia', en: 'Sum times difference', ar: 'مجموع في فرق' },
        goal: {
            eu: '$(a+b)(a-b)$ azkar kalkulatzea eta kalkulu mentalean erabiltzea.',
            es: 'Calcular rápido $(a+b)(a-b)$ y usarlo en cálculo mental.',
            en: 'Calculate $(a+b)(a-b)$ quickly and use it for mental calculation.',
            ar: 'حساب $(a+b)(a-b)$ بسرعة واستعماله في الحساب الذهني.'
        },
        problem: { eu: 'Kalkulatu $(2x+3)(2x-3)$ eta $102\\cdot 98$.', es: 'Calcula $(2x+3)(2x-3)$ y $102\\cdot 98$.', en: 'Calculate $(2x+3)(2x-3)$ and $102\\cdot 98$.', ar: 'احسب $(2x+3)(2x-3)$ و$102\\cdot 98$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Lehenaren karratua ken bigarrenaren karratua.', es: 'Cuadrado del primero menos cuadrado del segundo.', en: 'Square of the first minus square of the second.', ar: 'مربع الأول ناقص مربع الثاني.' }, math: '$4x^{2}-9$' },
            { text: { eu: 'Zenbakiekin berdin.', es: 'Con números, igual.', en: 'The same with numbers.', ar: 'ومع الأعداد كذلك.' }, math: '$100^{2}-2^{2}=10\\,000-4=9996$' }
        ],
        takeaway: {
            eu: 'Batura bider kendura = karratuen kendura.',
            es: 'Suma por diferencia = diferencia de cuadrados.',
            en: 'Sum times difference = difference of squares.',
            ar: 'مجموع في فرق = فرق مربعين.'
        },
        figure: (language) => <SumDifferenceFigure language={language} />
    },
    {
        id: 'common-factor',
        stage: 'factor',
        needs: [{ unit: 'dbh2/divisibilidad', topic: 'gcd', title: { eu: 'Zatitzaile komunetako handiena (ZKH)', es: 'Máximo común divisor (m.c.d.)', en: 'Greatest common divisor (GCD)', ar: 'القاسم المشترك الأكبر (ق.م.أ · ZKH)' } }],
        title: { eu: 'Faktore komuna ateratzea', es: 'Sacar factor común', en: 'Taking out a common factor', ar: 'إخراج العامل المشترك' },
        goal: {
            eu: 'Polinomio baten faktore komunik handiena ateratzea.',
            es: 'Sacar el mayor factor común de un polinomio.',
            en: 'Take out the greatest common factor of a polynomial.',
            ar: 'إخراج أكبر عامل مشترك من حدودية.'
        },
        problem: { eu: 'Atera faktore komuna: $6x^{3}-9x^{2}+3x$.', es: 'Saca factor común: $6x^{3}-9x^{2}+3x$.', en: 'Take out the common factor: $6x^{3}-9x^{2}+3x$.', ar: 'أخرج العامل المشترك: $6x^{3}-9x^{2}+3x$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Koefizienteen ZKH: 6, 9 eta 3 → 3.', es: 'm.c.d. de los coeficientes: 6, 9 y 3 → 3.', en: 'GCD of the coefficients: 6, 9 and 3 → 3.', ar: 'ق.م.أ للمعاملات: 6 و9 و3 ← 3.' } },
            { text: { eu: 'Letra komuna, berretzaile txikienarekin: $x$.', es: 'Letra común con el menor exponente: $x$.', en: 'Common letter with the smallest exponent: $x$.', ar: 'الحرف المشترك بأصغر أس: $x$.' } },
            { text: { eu: 'Zatitu gai bakoitza $3x$-z.', es: 'Divide cada término entre $3x$.', en: 'Divide each term by $3x$.', ar: 'اقسم كل حد على $3x$.' }, math: '$3x\\cdot(2x^{2}-3x+1)$' }
        ],
        takeaway: {
            eu: 'Egiaztatu: biderkatu berriro eta hasierako polinomioa lortu behar duzu.',
            es: 'Comprueba: vuelve a multiplicar y debes obtener el polinomio inicial.',
            en: 'Check: multiply it out again and you should get the original polynomial.',
            ar: 'تحقّق: اضرب من جديد فيجب أن تحصل على الحدودية الأصلية.'
        },
        figure: (language) => <CommonFactorFigure language={language} />
    },
    {
        id: 'factor-identities',
        stage: 'factor',
        title: { eu: 'Biderkadura nabarmenak ezagutzea', es: 'Reconocer productos notables', en: 'Recognise special products', ar: 'التعرّف إلى المتطابقات الشهيرة' },
        goal: {
            eu: 'Polinomio bat karratu edo batura bider kendura gisa idaztea.',
            es: 'Escribir un polinomio como un cuadrado o como suma por diferencia.',
            en: 'Write a polynomial as a square or as a sum times difference.',
            ar: 'كتابة حدودية على شكل مربع أو مجموع في فرق.'
        },
        problem: { eu: 'Idatzi biderkadura gisa: $9x^{2}-6x+1$ eta $16x^{2}-25$.', es: 'Escribe como producto: $9x^{2}-6x+1$ y $16x^{2}-25$.', en: 'Write as a product: $9x^{2}-6x+1$ and $16x^{2}-25$.', ar: 'اكتب في صورة جداء: $9x^{2}-6x+1$ و$16x^{2}-25$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Karratuak: $9x^{2}=(3x)^{2}$ eta $1=1^{2}$. Erdikoa: $2\\cdot 3x\\cdot 1=6x$, minusarekin.', es: 'Cuadrados: $9x^{2}=(3x)^{2}$ y $1=1^{2}$. El del medio: $2\\cdot 3x\\cdot 1=6x$, con menos.', en: 'Squares: $9x^{2}=(3x)^{2}$ and $1=1^{2}$. The middle one: $2\\cdot 3x\\cdot 1=6x$, with a minus sign.', ar: 'المربعان: $9x^{2}=(3x)^{2}$ و$1=1^{2}$. الأوسط: $2\\cdot 3x\\cdot 1=6x$ بإشارة ناقص.' }, math: '$(3x-1)^{2}$' },
            { text: { eu: 'Bi karraturen kendura: $(4x)^{2}-5^{2}$.', es: 'Diferencia de dos cuadrados: $(4x)^{2}-5^{2}$.', en: 'Difference of two squares: $(4x)^{2}-5^{2}$.', ar: 'فرق مربعين: $(4x)^{2}-5^{2}$.' }, math: '$(4x+5)(4x-5)$' }
        ],
        takeaway: {
            eu: 'Egiaztatu erdiko gaia: bikoitza bider oinarriak.',
            es: 'Comprueba el término del medio: el doble por las bases.',
            en: 'Check the middle term: twice the product of the bases.',
            ar: 'تحقّق من الحد الأوسط: الضعف في الأساسين.'
        }
    },
    {
        id: 'mental',
        stage: 'factor',
        title: { eu: 'Kalkulu mentala eta sinplifikazioa', es: 'Cálculo mental y simplificación', en: 'Mental calculation and simplification', ar: 'الحساب الذهني والتبسيط' },
        goal: {
            eu: 'Biderkadura nabarmenak eta faktore komuna erabiltzea kalkuluak errazteko.',
            es: 'Usar los productos notables y el factor común para facilitar cálculos.',
            en: 'Use special products and common factors to make calculations easier.',
            ar: 'استعمال المتطابقات الشهيرة والعامل المشترك لتسهيل الحسابات.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Karratuen kendura', es: 'Diferencia de cuadrados', en: 'Difference of squares', ar: 'فرق مربعين' }, text: { eu: 'Bi zenbaki jarraituren karratuen kendura haien batura da.', es: 'La diferencia de cuadrados de dos números seguidos es su suma.', en: 'The difference of the squares of two consecutive numbers is their sum.', ar: 'فرق مربعَي عددين متتاليين يساوي مجموعهما.' }, math: '$312^{2}-311^{2}=623$' },
            { title: { eu: 'Batura baten karratua', es: 'Cuadrado de una suma', en: 'Square of a sum', ar: 'مربع مجموع' }, text: { eu: '101 = 100 + 1.', es: '101 = 100 + 1.', en: '101 = 100 + 1.', ar: '101 = 100 + 1.' }, math: '$101^{2}=10\\,000+200+1=10\\,201$' },
            { title: { eu: 'Faktore komuna', es: 'Factor común', en: 'Common factor', ar: 'العامل المشترك' }, text: { eu: 'Gai biek dute 37.', es: 'Los dos términos tienen 37.', en: 'Both terms have 37 in them.', ar: 'في الحدين 37.' }, math: '$37\\cdot 13+37\\cdot 87=3700$' }
        ],
        takeaway: {
            eu: 'Aljebrak zenbakiekin ere laguntzen du.',
            es: 'El álgebra también ayuda con los números.',
            en: 'Algebra also helps with numbers.',
            ar: 'الجبر يساعد مع الأعداد أيضًا.'
        }
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const algebraTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...algebraLessonTexts[topic.id as AlgebraTopicId], ...algebraLessonChecks[topic.id as AlgebraTopicId] }))

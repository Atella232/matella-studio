import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { MonomialFigure, PerimeterFigure, TilesFigure } from '../dbh1-aljebra-v2/figures'
import { CommonFactorFigure, PolynomialFigure, ProductAreaFigure, SquareSumFigure } from '../dbh2-aljebra-v2/figures'
import { AlgebraicFractionFigure, FactorizeFigure, LongDivisionFigure, RectangleProblemFigure, RemainderFigure, RootsFigure, RuffiniFigure, SimplifyFigure } from './figures'
import { polynomialsLessonChecks, type PolynomialsTopicId } from './lessonChecks'
import { polynomialsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Polinomioak · 4. DBH aplikatuak — stages and lessons. Follows the class
   textbook (Santillana Aplicadas 4, unit 3 «Polinomios»: monomials and
   their operations, the value of a polynomial, adding, multiplying and
   dividing, Ruffini, the notable identities, roots and factorisation) and
   Anaya Aplicadas 4, unit 5 «Expresiones algebraicas» (algebraic language,
   the remainder theorem, integer roots among the divisors of the constant
   term, algebraic fractions and getting expressions ready for equations).
   The first two stages review 2. DBH with fourth-year exercises; division,
   Ruffini, roots and factorisation are new.
   ========================================================================== */

export type PolynomialsStageId = 'monomials' | 'operations' | 'division' | 'factor' | 'expressions'

export const polynomialsStages: UnitStage[] = [
    { id: 'monomials', tone: 'blue', title: { eu: 'Monomioak eta polinomioak', es: 'Monomios y polinomios', en: 'Monomials and polynomials', ar: 'وحيدات الحد والحدوديات' } },
    { id: 'operations', tone: 'violet', title: { eu: 'Eragiketak eta identitateak', es: 'Operaciones e identidades', en: 'Operations and identities', ar: 'العمليات والمتطابقات' } },
    { id: 'division', tone: 'mustard', title: { eu: 'Zatiketa eta Ruffini', es: 'División y Ruffini', en: 'Division and Ruffini\'s rule', ar: 'القسمة وروفيني' } },
    { id: 'factor', tone: 'coral', title: { eu: 'Erroak eta faktorizazioa', es: 'Raíces y factorización', en: 'Roots and factorisation', ar: 'الجذور والتحليل' } },
    { id: 'expressions', tone: 'green', title: { eu: 'Adierazpen aljebraikoak', es: 'Expresiones algebraicas', en: 'Algebraic expressions', ar: 'العبارات الجبرية' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Monomials and polynomials ---------- */
    {
        id: 'monomials',
        stage: 'monomials',
        needs: [{ unit: 'dbh3/polinomios', topic: 'monomials', title: { eu: 'Monomioak', es: 'Monomios', en: 'Monomials', ar: 'وحيدات الحد' } }],
        title: say('Monomioak eta haien eragiketak', 'Monomios y sus operaciones', 'وحيدات الحد وعملياتها', 'Monomials and their operations'),
        goal: say('Monomio baten koefizientea, zati literala eta maila ezagutzea, eta monomioak batu, biderkatu eta zatitzea.', 'Reconocer el coeficiente, la parte literal y el grado de un monomio, y sumar, multiplicar y dividir monomios.', 'التعرّف على معامل وحيد الحد وجزئه الحرفي ودرجته، وجمع وحيدات الحد وضربها وقسمتها.', 'Recognise the coefficient, the literal part and the degree of a monomial, and add, multiply and divide monomials.'),
        problem: say('$A=5x^{2}$, $B=4x$ eta $C=-2x^{2}$ badira, kalkulatu $(A\\cdot B)\\mathbin{:}C$.', 'Si $A=5x^{2}$, $B=4x$ y $C=-2x^{2}$, calcula $(A\\cdot B)\\mathbin{:}C$.', 'إذا كان $A=5x^{2}$ و$B=4x$ و$C=-2x^{2}$، فاحسب $(A\\cdot B)\\mathbin{:}C$.', 'If $A=5x^{2}$, $B=4x$ and $C=-2x^{2}$, work out $(A\\cdot B)\\mathbin{:}C$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura.', 'El producto.', 'الجداء.', 'The product.'), math: same('$5x^{2}\\cdot 4x=20x^{3}$') },
            { text: say('Zatidura: koefizienteak zatitu, berretzaileak kendu.', 'El cociente: divide coeficientes, resta exponentes.', 'القسمة: اقسم المعاملات واطرح الأسس.', 'The quotient: divide the coefficients, subtract the exponents.'), math: same('$20x^{3}\\mathbin{:}(-2x^{2})=-10x$') }
        ],
        takeaway: say('Batu: antzekoak bakarrik. Biderkatu: berretzaileak batu. Zatitu: kendu.', 'Sumar: solo semejantes. Multiplicar: se suman exponentes. Dividir: se restan.', 'الجمع: المتشابهة فقط. الضرب: تُجمع الأسس. القسمة: تُطرح.', 'Adding: only like terms. Multiplying: add the exponents. Dividing: subtract them.'),
        figure: (language) => <MonomialFigure language={language} />
    },
    {
        id: 'polynomial-value',
        stage: 'monomials',
        needs: [{ unit: 'dbh3/polinomios', topic: 'value', title: { eu: 'Polinomioak eta zenbakizko balioa', es: 'Polinomios y valor numérico', en: 'Polynomials and their value', ar: 'كثيرات الحدود والقيمة العددية' } }],
        title: say('Polinomioak eta zenbakizko balioa', 'Polinomios y valor numérico', 'الحدوديات والقيمة العددية', 'Polynomials and numerical value'),
        goal: say('Polinomio baten maila eta gai askea ezagutzea eta $P(a)$ zenbakizko balioa kalkulatzea.', 'Reconocer el grado y el término independiente de un polinomio y calcular su valor numérico $P(a)$.', 'التعرّف على درجة الحدودية وحدّها الثابت وحساب قيمتها العددية $P(a)$.', 'Recognise the degree and the constant term of a polynomial, and work out its numerical value $P(a)$.'),
        problem: say('$P(x)=2x^{3}-7x^{2}-17x+10$ bada, kalkulatu $P(-3)$.', 'Si $P(x)=2x^{3}-7x^{2}-17x+10$, calcula $P(-3)$.', 'إذا كان $P(x)=2x^{3}-7x^{2}-17x+10$ فاحسب $P(-3)$.', 'If $P(x)=2x^{3}-7x^{2}-17x+10$, work out $P(-3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu, parentesiekin.', 'Sustituye, con paréntesis.', 'عوّض مع الأقواس.', 'Substitute, using brackets.'), math: same('$2\\cdot(-27)-7\\cdot 9-17\\cdot(-3)+10$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$-54-63+51+10=-56$') }
        ],
        takeaway: say('$P(a)$: ordeztu x, negatiboak parentesi artean, lehenik berreturak.', '$P(a)$: sustituye x, negativos entre paréntesis, primero las potencias.', '$P(a)$: عوّض x، والسالب بين قوسين، والقوى أولًا.', '$P(a)$: substitute x, put negatives in brackets, do the powers first.'),
        figure: (language) => <PolynomialFigure language={language} />
    },
    {
        id: 'language',
        stage: 'monomials',
        needs: [{ unit: 'dbh3/polinomios', topic: 'expressions', title: { eu: 'Adierazpen aljebraikoak', es: 'Expresiones algebraicas', en: 'Algebraic expressions', ar: 'العبارات الجبرية' } }],
        title: say('Hizkuntza aljebraikoa', 'Lenguaje algebraico', 'اللغة الجبرية', 'Algebraic language'),
        goal: say('Enuntziatuak, perimetroak, azalerak eta bolumenak polinomio gisa adieraztea.', 'Expresar enunciados, perímetros, áreas y volúmenes mediante polinomios.', 'التعبير عن العبارات والمحيطات والمساحات والأحجام بحدوديات.', 'Express word problems, perimeters, areas and volumes using polynomials.'),
        problem: say('Albertoren aitak 28 urte gehiago ditu. Alberto x urtekoa bada, adierazi bien adinen batura eta kalkulatu x = 12 denean.', 'El padre de Alberto tiene 28 años más que él. Si Alberto tiene x años, expresa la suma de sus edades y calcúlala para x = 12.', 'يكبر والد ألبرتو ابنه بـ28 سنة. إذا كان عمر ألبرتو x فعبّر عن مجموع عمريهما واحسبه عندما x = 12.', 'Alberto\'s father is 28 years older than Alberto. If Alberto is x years old, write an expression for the sum of their ages and work it out for x = 12.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aitaren adina.', 'La edad del padre.', 'عمر الأب.', 'The father\'s age.'), math: same('$x+28$') },
            { text: say('Batura.', 'La suma.', 'المجموع.', 'The sum.'), math: same('$x+(x+28)=2x+28$') },
            { text: say('x = 12.', 'x = 12.', 'x = 12.', 'x = 12.'), math: same('$2\\cdot 12+28=52$') }
        ],
        takeaway: say('Izendatu ezezaguna letraz eta idatzi beste guztia harekin.', 'Llama con una letra a la incógnita y escribe todo lo demás con ella.', 'سمِّ المجهول بحرف واكتب كل الباقي به.', 'Use a letter for the unknown and write everything else using it.'),
        figure: (language) => <PerimeterFigure language={language} />
    },

    /* ---------- 2. Operations and identities ---------- */
    {
        id: 'add-subtract',
        stage: 'operations',
        title: say('Polinomioen batuketa eta kenketa', 'Suma y resta de polinomios', 'جمع الحدوديات وطرحها', 'Adding and subtracting polynomials'),
        goal: say('Polinomioak batu eta kentzea, parentesiak kenduz eta antzeko gaiak batuz.', 'Sumar y restar polinomios quitando paréntesis y agrupando términos semejantes.', 'جمع الحدوديات وطرحها بإزالة الأقواس وجمع الحدود المتشابهة.', 'Add and subtract polynomials by removing brackets and grouping like terms.'),
        problem: say('Kendu parentesiak eta laburtu: $(7x^{2}-9x+1)-(x^{3}-5x^{2}-4)+(x^{3}-4x^{2})$.', 'Quita paréntesis y reduce: $(7x^{2}-9x+1)-(x^{3}-5x^{2}-4)+(x^{3}-4x^{2})$.', 'أزل الأقواس وبسّط: $(7x^{2}-9x+1)-(x^{3}-5x^{2}-4)+(x^{3}-4x^{2})$.', 'Remove the brackets and simplify: $(7x^{2}-9x+1)-(x^{3}-5x^{2}-4)+(x^{3}-4x^{2})$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Minusaren atzean zeinuak aldatu.', 'Tras el menos cambian los signos.', 'بعد الناقص تتغيّر الإشارات.', 'After the minus sign, the signs change.'), math: same('$7x^{2}-9x+1-x^{3}+5x^{2}+4+x^{3}-4x^{2}$') },
            { text: say('Antzekoak batu.', 'Agrupa semejantes.', 'اجمع المتشابهة.', 'Group the like terms.'), math: same('$8x^{2}-9x+5$') }
        ],
        takeaway: say('Minus baten atzean, parentesiko zeinu guztiak aldatu.', 'Tras un menos, cambia todos los signos del paréntesis.', 'بعد الناقص غيّر كل إشارات القوس.', 'After a minus sign, change all the signs inside the brackets.'),
        figure: (language) => <TilesFigure language={language} />
    },
    {
        id: 'multiply',
        stage: 'operations',
        title: say('Polinomioen biderketa', 'Multiplicación de polinomios', 'ضرب الحدوديات', 'Multiplying polynomials'),
        goal: say('Monomio bat polinomio batez eta bi polinomio elkarren artean biderkatzea.', 'Multiplicar un monomio por un polinomio y dos polinomios entre sí.', 'ضرب وحيد حد في حدودية وضرب حدوديتين.', 'Multiply a monomial by a polynomial, and two polynomials together.'),
        problem: say('Kalkulatu $(x^{2}-4x+1)\\cdot(-5x+2)$.', 'Calcula $(x^{2}-4x+1)\\cdot(-5x+2)$.', 'احسب $(x^{2}-4x+1)\\cdot(-5x+2)$.', 'Work out $(x^{2}-4x+1)\\cdot(-5x+2)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bider $-5x$.', 'Por $-5x$.', 'في $-5x$.', 'By $-5x$.'), math: same('$-5x^{3}+20x^{2}-5x$') },
            { text: say('Bider 2.', 'Por 2.', 'في 2.', 'By 2.'), math: same('$2x^{2}-8x+2$') },
            { text: say('Batu antzekoak.', 'Suma los semejantes.', 'اجمع المتشابهة.', 'Add the like terms.'), math: same('$-5x^{3}+22x^{2}-13x+2$') }
        ],
        takeaway: say('Gai bakoitza gai guztiez; gero antzekoak batu.', 'Cada término por todos; luego agrupa semejantes.', 'كل حد في كل الحدود؛ ثم اجمع المتشابهة.', 'Each term times every term; then group the like terms.'),
        figure: (language) => <ProductAreaFigure language={language} />
    },
    {
        id: 'identities',
        stage: 'operations',
        title: say('Identitate nabarmenak', 'Igualdades notables', 'المتطابقات الشهيرة', 'Remarkable identities'),
        goal: say('Batura baten eta kendura baten karratua eta batura bider kendura zuzenean garatzea.', 'Desarrollar directamente el cuadrado de una suma y de una diferencia y la suma por diferencia.', 'نشر مربع المجموع ومربع الفرق والمجموع في الفرق مباشرة.', 'Expand directly the square of a sum, the square of a difference and the sum times the difference.'),
        problem: say('Garatu $(-4x-1)^{2}$.', 'Desarrolla $(-4x-1)^{2}$.', 'انشر $(-4x-1)^{2}$.', 'Expand $(-4x-1)^{2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenengoaren karratua.', 'Cuadrado del primero.', 'مربع الأول.', 'Square of the first.'), math: same('$(-4x)^{2}=16x^{2}$') },
            { text: say('Bikoitza bider biderkadura.', 'Doble del producto.', 'ضعف الجداء.', 'Twice the product.'), math: same('$2\\cdot(-4x)\\cdot(-1)=8x$') },
            { text: say('Bigarrenaren karratua.', 'Cuadrado del segundo.', 'مربع الثاني.', 'Square of the second.'), math: same('$(-1)^{2}=1$') }
        ],
        takeaway: say('$(a\\pm b)^{2}=a^{2}\\pm 2ab+b^{2}$; $(a+b)(a-b)=a^{2}-b^{2}$.', '$(a\\pm b)^{2}=a^{2}\\pm 2ab+b^{2}$; $(a+b)(a-b)=a^{2}-b^{2}$.', '$(a\\pm b)^{2}=a^{2}\\pm 2ab+b^{2}$؛ $(a+b)(a-b)=a^{2}-b^{2}$.', '$(a\\pm b)^{2}=a^{2}\\pm 2ab+b^{2}$; $(a+b)(a-b)=a^{2}-b^{2}$.'),
        figure: (language) => <SquareSumFigure language={language} />
    },

    /* ---------- 3. Division and Ruffini ---------- */
    {
        id: 'long-division',
        stage: 'division',
        needs: [{ unit: 'dbh3/polinomios', topic: 'division', title: { eu: 'Polinomioak zatitu', es: 'División de polinomios', en: 'Dividing polynomials', ar: 'قسمة كثيرات الحدود' } }],
        title: say('Polinomioen zatiketa', 'División de polinomios', 'قسمة الحدوديات', 'Polynomial division'),
        goal: say('Bi polinomio zatitzea eta emaitza $D=d\\cdot c+r$ moduan egiaztatzea.', 'Dividir dos polinomios y comprobar el resultado como $D=d\\cdot c+r$.', 'قسمة حدوديتين والتحقق من الناتج بالشكل $D=d\\cdot c+r$.', 'Divide two polynomials and check the result with $D=d\\cdot c+r$.'),
        problem: say('Zatitu $(6x^{3}+2x^{2}+18x+3)\\mathbin{:}(3x+1)$.', 'Divide $(6x^{3}+2x^{2}+18x+3)\\mathbin{:}(3x+1)$.', 'اقسم $(6x^{3}+2x^{2}+18x+3)\\mathbin{:}(3x+1)$.', 'Divide $(6x^{3}+2x^{2}+18x+3)\\mathbin{:}(3x+1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen gaia.', 'Primer término.', 'الحد الأول.', 'First term.'), math: same('$6x^{3}\\mathbin{:}3x=2x^{2}$') },
            { text: say('Kendu $2x^{2}(3x+1)$: $18x+3$ geratzen da.', 'Resta $2x^{2}(3x+1)$: queda $18x+3$.', 'اطرح $2x^{2}(3x+1)$: يبقى $18x+3$.', 'Subtract $2x^{2}(3x+1)$: this leaves $18x+3$.'), math: same('$18x\\mathbin{:}3x=6$') },
            { text: say('Hondarra.', 'El resto.', 'الباقي.', 'The remainder.'), math: same('$18x+3-(18x+6)=-3$') }
        ],
        takeaway: say('Zatikizuna = zatitzailea · zatidura + hondarra.', 'Dividendo = divisor · cociente + resto.', 'المقسوم = المقسوم عليه · خارج القسمة + الباقي.', 'Dividend = divisor · quotient + remainder.'),
        figure: (language) => <LongDivisionFigure language={language} />
    },
    {
        id: 'ruffini',
        stage: 'division',
        title: say('Ruffiniren erregela', 'La regla de Ruffini', 'قاعدة روفيني', 'Ruffini\'s rule'),
        goal: say('Polinomio bat $(x-a)$ binomioaz Ruffiniren erregelaz zatitzea.', 'Dividir un polinomio entre $(x-a)$ con la regla de Ruffini.', 'قسمة حدودية على $(x-a)$ بقاعدة روفيني.', 'Divide a polynomial by $(x-a)$ using Ruffini\'s rule.'),
        problem: say('Ruffiniz: $(2x^{3}+7x^{2}+2x+4)\\mathbin{:}(x+3)$.', 'Con Ruffini: $(2x^{3}+7x^{2}+2x+4)\\mathbin{:}(x+3)$.', 'بروفيني: $(2x^{3}+7x^{2}+2x+4)\\mathbin{:}(x+3)$.', 'Using Ruffini: $(2x^{3}+7x^{2}+2x+4)\\mathbin{:}(x+3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a=-3$. Jaitsi 2.', '$a=-3$. Baja el 2.', '$a=-3$. أنزل 2.', '$a=-3$. Bring down the 2.'), math: same('$2\\cdot(-3)+7=1$') },
            { text: say('Jarraitu.', 'Sigue.', 'تابع.', 'Continue.'), math: same('$1\\cdot(-3)+2=-1$') },
            { text: say('Hondarra: 7. Zatidura $2x^{2}+x-1$.', 'Resto: 7. Cociente $2x^{2}+x-1$.', 'الباقي: 7. خارج القسمة $2x^{2}+x-1$.', 'Remainder: 7. Quotient $2x^{2}+x-1$.'), math: same('$-1\\cdot(-3)+4=7$') }
        ],
        takeaway: say('Jaitsi, bider a, batu. Azkena hondarra da.', 'Baja, multiplica por a, suma. El último es el resto.', 'أنزل، اضرب في a، اجمع. الأخير هو الباقي.', 'Bring down, multiply by a, add. The last one is the remainder.'),
        figure: (language) => <RuffiniFigure language={language} />
    },
    {
        id: 'remainder',
        stage: 'division',
        title: say('Hondarraren teorema', 'El teorema del resto', 'مبرهنة الباقي', 'The remainder theorem'),
        goal: say('$P(x)\\mathbin{:}(x-a)$ zatiketaren hondarra $P(a)$ dela erabiltzea, eta $P(a)$ Ruffiniz kalkulatzea.', 'Usar que el resto de $P(x)\\mathbin{:}(x-a)$ es $P(a)$, y calcular $P(a)$ con Ruffini.', 'استعمال أن باقي $P(x)\\mathbin{:}(x-a)$ هو $P(a)$، وحساب $P(a)$ بروفيني.', 'Use the fact that the remainder of $P(x)\\mathbin{:}(x-a)$ is $P(a)$, and work out $P(a)$ using Ruffini.'),
        problem: say('$P(x)=3x^{3}-5x^{2}-9x+3$. Zein da $P(x)\\mathbin{:}(x+1)$ zatiketaren hondarra?', '$P(x)=3x^{3}-5x^{2}-9x+3$. ¿Cuál es el resto de $P(x)\\mathbin{:}(x+1)$?', '$P(x)=3x^{3}-5x^{2}-9x+3$. ما باقي $P(x)\\mathbin{:}(x+1)$؟', '$P(x)=3x^{3}-5x^{2}-9x+3$. What is the remainder of $P(x)\\mathbin{:}(x+1)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x+1=x-(-1)$: kalkulatu $P(-1)$.', '$x+1=x-(-1)$: calcula $P(-1)$.', '$x+1=x-(-1)$: احسب $P(-1)$.', '$x+1=x-(-1)$: work out $P(-1)$.'), math: same('$3\\cdot(-1)-5\\cdot 1-9\\cdot(-1)+3$') },
            { text: say('Hondarra 4.', 'El resto es 4.', 'الباقي 4.', 'The remainder is 4.'), math: same('$-3-5+9+3=4$') }
        ],
        takeaway: say('$P(x)\\mathbin{:}(x-a)$ zatiketaren hondarra $=P(a)$.', 'Resto de $P(x)\\mathbin{:}(x-a)$ $=P(a)$.', 'باقي $P(x)\\mathbin{:}(x-a)$ $=P(a)$.', 'Remainder of $P(x)\\mathbin{:}(x-a)$ $=P(a)$.'),
        figure: (language) => <RemainderFigure language={language} />
    },

    /* ---------- 4. Roots and factorisation ---------- */
    {
        id: 'roots',
        stage: 'factor',
        title: say('Polinomio baten erroak', 'Raíces de un polinomio', 'جذور الحدودية', 'Roots of a polynomial'),
        goal: say('Zenbaki bat polinomio baten erroa den egiaztatzea eta erro osoak gai askearen zatitzaileen artean bilatzea.', 'Comprobar si un número es raíz de un polinomio y buscar las raíces enteras entre los divisores del término independiente.', 'التحقق من أن عددًا جذر لحدودية والبحث عن الجذور الصحيحة بين قواسم الحد الثابت.', 'Check whether a number is a root of a polynomial, and look for the integer roots among the divisors of the constant term.'),
        problem: say('$x^{3}+2x^{2}-8x$ polinomioak hiru erro oso ditu. Zein da handiena?', 'El polinomio $x^{3}+2x^{2}-8x$ tiene tres raíces enteras. ¿Cuál es la mayor?', 'للحدودية $x^{3}+2x^{2}-8x$ ثلاثة جذور صحيحة. ما أكبرها؟', 'The polynomial $x^{3}+2x^{2}-8x$ has three integer roots. Which is the largest?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktore komuna: x = 0 erroa.', 'Factor común: x = 0 es raíz.', 'العامل المشترك: x = 0 جذر.', 'Common factor: x = 0 is a root.'), math: same('$x(x^{2}+2x-8)$') },
            { text: say('Probatu 2.', 'Prueba con 2.', 'جرّب 2.', 'Try 2.'), math: same('$4+4-8=0$') },
            { text: say('Erroak: 0, 2 eta $-4$.', 'Raíces: 0, 2 y $-4$.', 'الجذور: 0 و2 و$-4$.', 'Roots: 0, 2 and $-4$.'), math: same('$x(x-2)(x+4)$') }
        ],
        takeaway: say('$P(a)=0$ bada, $a$ erroa da eta $x-a$ faktorea.', 'Si $P(a)=0$, $a$ es raíz y $x-a$ es factor.', 'إذا كان $P(a)=0$ فإن $a$ جذر و$x-a$ عامل.', 'If $P(a)=0$, $a$ is a root and $x-a$ is a factor.'),
        figure: (language) => <RootsFigure language={language} />
    },
    {
        id: 'common-factor',
        stage: 'factor',
        title: say('Faktore komuna eta identitateak', 'Factor común e identidades', 'العامل المشترك والمتطابقات', 'Common factor and algebraic identities'),
        goal: say('Polinomioak faktore komuna aterata eta identitate nabarmenak atzera erabiliz deskonposatzea.', 'Descomponer polinomios sacando factor común y usando las igualdades notables al revés.', 'تحليل الحدوديات بإخراج العامل المشترك واستعمال المتطابقات بالعكس.', 'Factorise polynomials by taking out a common factor and using the algebraic identities in reverse.'),
        problem: say('Deskonposatu $2x^{4}-12x^{3}+18x^{2}$.', 'Descompón $2x^{4}-12x^{3}+18x^{2}$.', 'حلّل $2x^{4}-12x^{3}+18x^{2}$.', 'Factorise $2x^{4}-12x^{3}+18x^{2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktore komuna.', 'Factor común.', 'العامل المشترك.', 'Common factor.'), math: same('$2x^{2}(x^{2}-6x+9)$') },
            { text: say('Kendura baten karratua.', 'Cuadrado de una diferencia.', 'مربع فرق.', 'Square of a difference.'), math: same('$2x^{2}(x-3)^{2}$') }
        ],
        takeaway: say('Lehenik faktore komuna; gero identitateak.', 'Primero el factor común; luego las identidades.', 'العامل المشترك أولًا ثم المتطابقات.', 'First the common factor; then the algebraic identities.'),
        figure: (language) => <CommonFactorFigure language={language} />
    },
    {
        id: 'factorize',
        stage: 'factor',
        needs: [{ unit: 'dbh3/ecuaciones-sistemas', topic: 'formula', title: { eu: 'Formula orokorra', es: 'La fórmula general', en: 'The quadratic formula', ar: 'الصيغة العامة' } }],
        title: say('Ruffiniz faktorizatzea', 'Factorizar con Ruffini', 'التحليل بروفيني', 'Factorising with Ruffini'),
        goal: say('Polinomio bat ahalik eta faktore gehienetan deskonposatzea, Ruffini behin eta berriz erabiliz.', 'Descomponer un polinomio en el mayor número posible de factores aplicando Ruffini varias veces.', 'تحليل حدودية إلى أكبر عدد ممكن من العوامل بتطبيق روفيني مرارًا.', 'Factorise a polynomial into as many factors as possible by applying Ruffini several times.'),
        problem: say('Faktorizatu $x^{3}+7x^{2}+14x+8$.', 'Factoriza $x^{3}+7x^{2}+14x+8$.', 'حلّل $x^{3}+7x^{2}+14x+8$.', 'Factorise $x^{3}+7x^{2}+14x+8$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$-1$ erroa da.', '$-1$ es raíz.', '$-1$ جذر.', '$-1$ is a root.'), math: same('$-1+7-14+8=0$') },
            { text: say('Ruffiniz zatidura.', 'Cociente con Ruffini.', 'خارج القسمة بروفيني.', 'Find the quotient with Ruffini.'), math: same('$x^{2}+6x+8$') },
            { text: say('Haren erroak $-2$ eta $-4$.', 'Sus raíces son $-2$ y $-4$.', 'جذراه $-2$ و$-4$.', 'Its roots are $-2$ and $-4$.'), math: same('$(x+1)(x+2)(x+4)$') }
        ],
        takeaway: say('Faktore komuna, identitateak, eta gero Ruffini hondarra 0 den bitartean.', 'Factor común, identidades y luego Ruffini mientras el resto sea 0.', 'العامل المشترك والمتطابقات ثم روفيني ما دام الباقي 0.', 'Common factor, algebraic identities, then Ruffini for as long as the remainder is 0.'),
        figure: (language) => <FactorizeFigure language={language} />
    },

    /* ---------- 5. Algebraic expressions ---------- */
    {
        id: 'algebraic-fractions',
        stage: 'expressions',
        needs: [{ unit: 'dbh3/numeros-racionales', topic: 'simplify', title: { eu: 'Anplifikatu, sinplifikatu eta zatiki laburtezina', es: 'Amplificar, simplificar y fracción irreducible', en: 'Amplifying, simplifying and the simplest form', ar: 'التوسيع والاختزال والكسر غير القابل للاختزال' } }],
        title: say('Zatiki aljebraikoak', 'Fracciones algebraicas', 'الكسور الجبرية', 'Algebraic fractions'),
        goal: say('Zatiki aljebraikoak sinplifikatzea eta batzea, faktorizatuz eta izendatzaile komuna bilatuz.', 'Simplificar y sumar fracciones algebraicas factorizando y buscando denominador común.', 'تبسيط الكسور الجبرية وجمعها بالتحليل وإيجاد مقام مشترك.', 'Simplify and add algebraic fractions by factorising and finding a common denominator.'),
        problem: say('Sinplifikatu $\\frac{3x^{2}-24x+48}{3x^{2}-12x}$.', 'Simplifica $\\frac{3x^{2}-24x+48}{3x^{2}-12x}$.', 'بسّط $\\frac{3x^{2}-24x+48}{3x^{2}-12x}$.', 'Simplify $\\frac{3x^{2}-24x+48}{3x^{2}-12x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbakitzailea.', 'Numerador.', 'البسط.', 'Numerator.'), math: same('$3(x^{2}-8x+16)=3(x-4)^{2}$') },
            { text: say('Izendatzailea.', 'Denominador.', 'المقام.', 'Denominator.'), math: same('$3x(x-4)$') },
            { text: say('Ezabatu $3(x-4)$.', 'Elimina $3(x-4)$.', 'احذف $3(x-4)$.', 'Cancel $3(x-4)$.'), math: same('$\\frac{x-4}{x}$') }
        ],
        takeaway: say('Faktorizatu, gero sinplifikatu: faktoreak bai, gaiak ez.', 'Factoriza y luego simplifica: factores sí, sumandos no.', 'حلّل ثم بسّط: العوامل نعم، الحدود المجموعة لا.', 'Factorise, then simplify: you can cancel factors, not terms.'),
        figure: (language) => <AlgebraicFractionFigure language={language} />
    },
    {
        id: 'simplify',
        stage: 'expressions',
        title: say('Ekuazioetarako prestatzea', 'Preparación para ecuaciones', 'التحضير للمعادلات', 'Preparing for equations'),
        goal: say('Adierazpenak parentesiak kenduz, identitateak garatuz eta izendatzaileak kenduz sinplifikatzea.', 'Simplificar expresiones quitando paréntesis, desarrollando identidades y quitando denominadores.', 'تبسيط العبارات بإزالة الأقواس ونشر المتطابقات وحذف المقامات.', 'Simplify expressions by removing brackets, expanding the algebraic identities and clearing denominators.'),
        problem: say('Sinplifikatu $(x+1)^{2}-2x(x+2)+14$.', 'Simplifica $(x+1)^{2}-2x(x+2)+14$.', 'بسّط $(x+1)^{2}-2x(x+2)+14$.', 'Simplify $(x+1)^{2}-2x(x+2)+14$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Garatu.', 'Desarrolla.', 'انشر.', 'Expand.'), math: same('$x^{2}+2x+1-2x^{2}-4x+14$') },
            { text: say('Antzekoak batu.', 'Agrupa semejantes.', 'اجمع المتشابهة.', 'Group the like terms.'), math: same('$-x^{2}-2x+15$') }
        ],
        takeaway: say('Parentesiak, identitateak, MKT, eta antzekoak batu.', 'Paréntesis, identidades, m.c.m. y agrupar semejantes.', 'الأقواس والمتطابقات والمضاعف المشترك ثم جمع المتشابهة.', 'Brackets, algebraic identities, LCM and grouping like terms.'),
        figure: (language) => <SimplifyFigure language={language} />
    },
    {
        id: 'problems',
        stage: 'expressions',
        needs: [{ unit: 'dbh3/geometria-plana', topic: 'pythagoras', title: { eu: 'Pitagorasen teorema', es: 'El teorema de Pitágoras', en: 'Pythagoras\' theorem', ar: 'مبرهنة فيثاغورس' } }],
        title: say('Problemak adierazpen aljebraikoekin', 'Problemas con expresiones algebraicas', 'مسائل بالعبارات الجبرية', 'Problems with algebraic expressions'),
        goal: say('Problema geometrikoak eta zenbakizkoak polinomio baten bidez adieraztea eta haren balioa kalkulatzea.', 'Expresar problemas geométricos y numéricos mediante un polinomio y calcular su valor.', 'التعبير عن مسائل هندسية وعددية بحدودية وحساب قيمتها.', 'Express geometric and numerical problems using a polynomial and work out its value.'),
        problem: say('Laukizuzen baten luzera eta zabalera 11 dm dira guztira. Adierazi azalera x zabaleraren funtzioan eta kalkulatu x = 4 denean.', 'El largo y el ancho de un rectángulo suman 11 dm. Expresa el área en función del ancho x y calcúlala para x = 4.', 'مجموع طول مستطيل وعرضه 11 دسم. عبّر عن المساحة بدلالة العرض x واحسبها عندما x = 4.', 'The length and the width of a rectangle add up to 11 dm. Write the area in terms of the width x and work it out for x = 4.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Luzera.', 'El largo.', 'الطول.', 'The length.'), math: same('$11-x$') },
            { text: say('Azalera.', 'El área.', 'المساحة.', 'The area.'), math: same('$x(11-x)=11x-x^{2}$') },
            { text: say('x = 4: 28 dm².', 'x = 4: 28 dm².', 'x = 4: 28 دسم².', 'x = 4: 28 dm².'), math: same('$44-16=28$') }
        ],
        takeaway: say('Izendatu, idatzi, sinplifikatu eta kalkulatu.', 'Nombra, escribe, simplifica y calcula.', 'سمِّ واكتب وبسّط واحسب.', 'Name, write, simplify and work out.'),
        figure: (language) => <RectangleProblemFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const polynomialsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...polynomialsLessonTexts[topic.id as PolynomialsTopicId], ...polynomialsLessonChecks[topic.id as PolynomialsTopicId] }))

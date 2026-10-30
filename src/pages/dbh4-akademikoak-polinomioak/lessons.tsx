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

export const polynomialsFractionsTopics: UnitTopic[] = [
    /* ---------- 1. Operations ---------- */
    {
        id: 'polynomials',
        stage: 'operations',
        title: say('Polinomioak eta haien eragiketak', 'Polinomios y sus operaciones', 'الحدوديات وعملياتها', 'Polynomials and their operations'),
        goal: say('Polinomio baten maila, gai askea eta zenbakizko balioa ezagutzea, eta polinomioak batu, kendu eta biderkatzea.', 'Reconocer el grado, el término independiente y el valor numérico de un polinomio, y sumar, restar y multiplicar polinomios.', 'التعرّف على درجة الحدودية وحدّها الثابت وقيمتها العددية، وجمع الحدوديات وطرحها وضربها.', 'Recognise the degree, the constant term and the numerical value of a polynomial, and add, subtract and multiply polynomials.'),
        explanation: say(
            'Polinomio bat antzekoak ez diren monomioen batura da. Maila gaien mailarik handiena da, koefiziente nagusia maila handieneko gaiarena, eta gai askea letrarik gabekoa: $5x^{2}+2x-4$ polinomioaren maila 2 da, koefiziente nagusia 5 eta gai askea $-4$. Zenbakizko balioa x-ren ordez zenbaki bat jarrita lortzen da: $P(x)=x^{3}-2x^{2}+1$ bada, $P(1)=1-2+1=0$. Batzeko, maila bereko gaiak batzen dira; kentzeko, kenkizunaren zeinu guztiak aldatzen dira. Biderkatzeko, gai bakoitza beste polinomioaren gai guztiez: $(3x^{3}+2x-4)(-2x+5)=-6x^{4}+15x^{3}-4x^{2}+18x-20$. Biderkaduraren maila mailen batura da.',
            'Un polinomio es una suma de monomios no semejantes. Su grado es el mayor grado de sus términos, el coeficiente principal es el del término de mayor grado y el término independiente, el que no tiene letra: $5x^{2}+2x-4$ tiene grado 2, coeficiente principal 5 y término independiente $-4$. El valor numérico se obtiene poniendo un número en lugar de x: si $P(x)=x^{3}-2x^{2}+1$, $P(1)=1-2+1=0$. Para sumar se suman los términos del mismo grado; para restar se cambian todos los signos del sustraendo. Para multiplicar, cada término por todos los del otro polinomio: $(3x^{3}+2x-4)(-2x+5)=-6x^{4}+15x^{3}-4x^{2}+18x-20$. El grado del producto es la suma de los grados.',
            'الحدودية مجموع وحيدات حد غير متشابهة. درجتها أكبر درجات حدودها، والمعامل الرئيسي معامل الحد الأعلى درجة، والحد الثابت هو الذي لا حرف فيه: درجة $5x^{2}+2x-4$ هي 2 ومعاملها الرئيسي 5 وحدّها الثابت $-4$. والقيمة العددية نحصل عليها بوضع عدد مكان x: إذا كان $P(x)=x^{3}-2x^{2}+1$ فإن $P(1)=1-2+1=0$. وللجمع نجمع الحدود ذات الدرجة نفسها، وللطرح نغيّر كل إشارات المطروح. وللضرب نضرب كل حد في كل حدود الحدودية الأخرى: $(3x^{3}+2x-4)(-2x+5)=-6x^{4}+15x^{3}-4x^{2}+18x-20$. ودرجة الجداء مجموع الدرجتين.', 'A polynomial is a sum of unlike monomials. Its degree is the highest degree of its terms, the leading coefficient is the coefficient of the highest-degree term, and the constant term is the one with no letter: $5x^{2}+2x-4$ has degree 2, leading coefficient 5 and constant term $-4$. The numerical value is found by putting a number in place of x: if $P(x)=x^{3}-2x^{2}+1$, $P(1)=1-2+1=0$. To add, add the terms of the same degree; to subtract, change all the signs of the polynomial being subtracted. To multiply, multiply each term by all the terms of the other polynomial: $(3x^{3}+2x-4)(-2x+5)=-6x^{4}+15x^{3}-4x^{2}+18x-20$. The degree of the product is the sum of the degrees.'
        ),
        problem: say('Kalkulatu $3x(2x+5)-x^{2}(x-1)+5$ eta esan haren maila.', 'Calcula $3x(2x+5)-x^{2}(x-1)+5$ y di su grado.', 'احسب $3x(2x+5)-x^{2}(x-1)+5$ واذكر درجتها.', 'Calculate $3x(2x+5)-x^{2}(x-1)+5$ and say its degree.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$6x^{2}+15x-x^{3}+x^{2}+5$') },
            { text: say('Ordenatu eta batu antzekoak: 3. maila.', 'Ordena y agrupa: grado 3.', 'رتّب واجمع: الدرجة 3.', 'Order and group: degree 3.'), math: same('$-x^{3}+7x^{2}+15x+5$') }
        ],
        example: same('$(x+2)(x+3)=x^{2}+5x+6$'),
        takeaway: say('Biderkatzean, gai bakoitza gai guztiez; maila: mailen batura.', 'Al multiplicar, cada término por todos; grado: suma de grados.', 'في الضرب كل حد في كل الحدود؛ الدرجة: مجموع الدرجتين.', 'When multiplying, multiply each term by all the others; degree: the sum of the degrees.'),
        figure: (language) => <ProductAreaFigure language={language} />
    },
    {
        id: 'identities',
        stage: 'operations',
        title: say('Identitate nabarmenak', 'Igualdades notables', 'المتطابقات الشهيرة', 'Remarkable identities'),
        goal: say('Batura eta kendura baten karratua eta kuboa eta batura bider kendura garatzea, eta atzera erabiltzea.', 'Desarrollar el cuadrado y el cubo de una suma y de una diferencia y la suma por diferencia, y usarlos al revés.', 'نشر مربع ومكعب المجموع والفرق والمجموع في الفرق، واستعمالها بالعكس.', 'Expand the square and the cube of a sum and of a difference, the sum times difference, and use them backwards.'),
        explanation: say(
            'Batura baten karratua: $(a+b)^{2}=a^{2}+2ab+b^{2}$. Kendura baten karratua: $(a-b)^{2}=a^{2}-2ab+b^{2}$. Batura bider kendura: $(a+b)(a-b)=a^{2}-b^{2}$. Eta kuboak: $(a+b)^{3}=a^{3}+3a^{2}b+3ab^{2}+b^{3}$, $(a-b)^{3}=a^{3}-3a^{2}b+3ab^{2}-b^{3}$. a eta b edozein adierazpen izan daitezke: $(x+3y)^{2}=x^{2}+6xy+9y^{2}$; $(3x+2)(3x-2)=9x^{2}-4$; $(x+2y)^{3}=x^{3}+6x^{2}y+12xy^{2}+8y^{3}$. Atzera irakurrita, faktorizatzeko balio dute: $4x^{2}-16y^{2}=(2x+4y)(2x-4y)$ eta $9x^{2}-30x+25=(3x-5)^{2}$.',
            'Cuadrado de una suma: $(a+b)^{2}=a^{2}+2ab+b^{2}$. Cuadrado de una diferencia: $(a-b)^{2}=a^{2}-2ab+b^{2}$. Suma por diferencia: $(a+b)(a-b)=a^{2}-b^{2}$. Y los cubos: $(a+b)^{3}=a^{3}+3a^{2}b+3ab^{2}+b^{3}$, $(a-b)^{3}=a^{3}-3a^{2}b+3ab^{2}-b^{3}$. a y b pueden ser cualquier expresión: $(x+3y)^{2}=x^{2}+6xy+9y^{2}$; $(3x+2)(3x-2)=9x^{2}-4$; $(x+2y)^{3}=x^{3}+6x^{2}y+12xy^{2}+8y^{3}$. Leídas al revés sirven para factorizar: $4x^{2}-16y^{2}=(2x+4y)(2x-4y)$ y $9x^{2}-30x+25=(3x-5)^{2}$.',
            'مربع المجموع: $(a+b)^{2}=a^{2}+2ab+b^{2}$. مربع الفرق: $(a-b)^{2}=a^{2}-2ab+b^{2}$. المجموع في الفرق: $(a+b)(a-b)=a^{2}-b^{2}$. والمكعبات: $(a+b)^{3}=a^{3}+3a^{2}b+3ab^{2}+b^{3}$ و$(a-b)^{3}=a^{3}-3a^{2}b+3ab^{2}-b^{3}$. ويمكن أن يكون a وb أي عبارة: $(x+3y)^{2}=x^{2}+6xy+9y^{2}$؛ $(3x+2)(3x-2)=9x^{2}-4$؛ $(x+2y)^{3}=x^{3}+6x^{2}y+12xy^{2}+8y^{3}$. وبقراءتها بالعكس تفيد في التحليل: $4x^{2}-16y^{2}=(2x+4y)(2x-4y)$ و$9x^{2}-30x+25=(3x-5)^{2}$.', 'Square of a sum: $(a+b)^{2}=a^{2}+2ab+b^{2}$. Square of a difference: $(a-b)^{2}=a^{2}-2ab+b^{2}$. Sum times difference: $(a+b)(a-b)=a^{2}-b^{2}$. And the cubes: $(a+b)^{3}=a^{3}+3a^{2}b+3ab^{2}+b^{3}$, $(a-b)^{3}=a^{3}-3a^{2}b+3ab^{2}-b^{3}$. a and b can be any expression: $(x+3y)^{2}=x^{2}+6xy+9y^{2}$; $(3x+2)(3x-2)=9x^{2}-4$; $(x+2y)^{3}=x^{3}+6x^{2}y+12xy^{2}+8y^{3}$. Read backwards, they help you factorise: $4x^{2}-16y^{2}=(2x+4y)(2x-4y)$ and $9x^{2}-30x+25=(3x-5)^{2}$.'
        ),
        problem: say('Garatu $(2x-1)^{3}$.', 'Desarrolla $(2x-1)^{3}$.', 'انشر $(2x-1)^{3}$.', 'Expand $(2x-1)^{3}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a=2x$, $b=1$.', '$a=2x$, $b=1$.', '$a=2x$، $b=1$.', '$a=2x$, $b=1$.'), math: same('$(2x)^{3}-3(2x)^{2}+3\\cdot 2x-1$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$8x^{3}-12x^{2}+6x-1$') }
        ],
        example: same('$(3x+2)(3x-2)=9x^{2}-4$'),
        takeaway: say('$(A\\pm B)^{2}=A^{2}\\pm 2AB+B^{2}$; $(A+B)(A-B)=A^{2}-B^{2}$.', '$(A\\pm B)^{2}=A^{2}\\pm 2AB+B^{2}$; $(A+B)(A-B)=A^{2}-B^{2}$.', '$(A\\pm B)^{2}=A^{2}\\pm 2AB+B^{2}$؛ $(A+B)(A-B)=A^{2}-B^{2}$.', '$(A\\pm B)^{2}=A^{2}\\pm 2AB+B^{2}$; $(A+B)(A-B)=A^{2}-B^{2}$.'),
        figure: (language) => <SquareSumFigure language={language} />
    },
    {
        id: 'binomial',
        stage: 'operations',
        title: say('Tartagliaren triangelua', 'El triángulo de Tartaglia', 'مثلث تارتاليا', 'Tartaglia\'s triangle'),
        goal: say('$(a+b)^{n}$ garatzea Tartagliaren triangeluko koefizienteekin.', 'Desarrollar $(a+b)^{n}$ con los coeficientes del triángulo de Tartaglia.', 'نشر $(a+b)^{n}$ بمعاملات مثلث تارتاليا.', 'Expand $(a+b)^{n}$ using the coefficients of Tartaglia\'s triangle.'),
        explanation: say(
            'Tartagliaren triangeluan, errenkada bakoitza 1ekin hasi eta bukatzen da, eta beste zenbaki bakoitza goiko bien batura da: 1; 1 1; 1 2 1; 1 3 3 1; 1 4 6 4 1… n. errenkadak $(a+b)^{n}$ garapenaren koefizienteak ematen ditu. a-ren berretzailea n-tik 0ra jaisten da eta b-rena 0tik n-ra igotzen da: $(a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}$. Kendura batean zeinuak txandakatzen dira: $(x-2)^{4}=x^{4}-8x^{3}+24x^{2}-32x+16$, gai bakoitzean 2ren berretura ere biderkatzen delako. Koefizienteen batura $2^{n}$ da.',
            'En el triángulo de Tartaglia cada fila empieza y acaba en 1, y cada número es la suma de los dos que tiene encima: 1; 1 1; 1 2 1; 1 3 3 1; 1 4 6 4 1… La fila n da los coeficientes del desarrollo de $(a+b)^{n}$. El exponente de a baja de n a 0 y el de b sube de 0 a n: $(a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}$. En una diferencia los signos se alternan: $(x-2)^{4}=x^{4}-8x^{3}+24x^{2}-32x+16$, porque en cada término se multiplica también una potencia de 2. La suma de los coeficientes de la fila n es $2^{n}$.',
            'في مثلث تارتاليا يبدأ كل صف وينتهي بالعدد 1، وكل عدد آخر مجموع العددين فوقه: 1؛ 1 1؛ 1 2 1؛ 1 3 3 1؛ 1 4 6 4 1… والصف n يعطي معاملات نشر $(a+b)^{n}$. أس a ينقص من n إلى 0 وأس b يزيد من 0 إلى n: $(a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}$. وفي الفرق تتناوب الإشارات: $(x-2)^{4}=x^{4}-8x^{3}+24x^{2}-32x+16$، لأننا نضرب في كل حد قوة للعدد 2 أيضًا. ومجموع معاملات الصف n هو $2^{n}$.', 'In Tartaglia\'s triangle each row starts and ends with 1, and each number is the sum of the two above it: 1; 1 1; 1 2 1; 1 3 3 1; 1 4 6 4 1… Row n gives the coefficients of the expansion of $(a+b)^{n}$. The exponent of a goes down from n to 0, and the exponent of b goes up from 0 to n: $(a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}$. In a difference, the signs alternate: $(x-2)^{4}=x^{4}-8x^{3}+24x^{2}-32x+16$, because each term also multiplies a power of 2. The sum of the coefficients in row n is $2^{n}$.'
        ),
        problem: say('$(x+3)^{5}$ garatzean, zein da $x^{3}$-ren koefizientea?', 'Al desarrollar $(x+3)^{5}$, ¿cuál es el coeficiente de $x^{3}$?', 'عند نشر $(x+3)^{5}$ ما معامل $x^{3}$؟', 'When expanding $(x+3)^{5}$, what is the coefficient of $x^{3}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('5. errenkada: 1 5 10 10 5 1.', 'Fila 5: 1 5 10 10 5 1.', 'الصف 5: 1 5 10 10 5 1.', 'Row 5: 1 5 10 10 5 1.'), math: same('$10\\,x^{3}\\cdot 3^{2}$') },
            { text: say('Koefizientea.', 'El coeficiente.', 'المعامل.', 'The coefficient.'), math: same('$10\\cdot 9=90$') }
        ],
        example: same('$(a+b)^{3}\\to 1\\ 3\\ 3\\ 1$'),
        takeaway: say('n. errenkada = $(A+B)^{N}$-ren koefizienteak.', 'Fila n = coeficientes de $(A+B)^{N}$.', 'الصف n = معاملات $(A+B)^{N}$.', 'Row n = coefficients of $(A+B)^{N}$.'),
        figure: (language) => <TartagliaFigure language={language} />
    },

    /* ---------- 2. Division and Ruffini ---------- */
    {
        id: 'long-division',
        stage: 'division',
        title: say('Polinomioen zatiketa', 'División de polinomios', 'قسمة الحدوديات', 'Polynomial division'),
        goal: say('Bi polinomio zatitzea, eta zatiketa zehatza ala osoa den esatea.', 'Dividir dos polinomios y decir si la división es exacta o entera.', 'قسمة حدوديتين وتحديد ما إذا كانت القسمة تامة أو غير تامة.', 'Divide two polynomials and say whether the division is exact or has a remainder.'),
        explanation: say(
            'Zatikizunaren lehen gaia zatitzailearen lehen gaiaz zatitzen da (zatiduraren lehen gaia), zatitzailea harekin biderkatu eta zatikizunari kendu; eta jarraitu hondarraren maila zatitzailearena baino txikiagoa izan arte. Beti betetzen da $D(x)=d(x)\\cdot c(x)+r(x)$, eta zatiduraren maila zatikizunarena ken zatitzailearena da. Hondarra 0 bada, zatiketa zehatza da eta $d(x)$ zatikizunaren zatitzailea da. $(x^{4}-3x^{2}+2)\\mathbin{:}(x^{2}-1)$ zehatza da: $x^{4}-3x^{2}+2=(x^{2}-1)(x^{2}-2)$. Zatikizunean gai bat falta bada, utzi haren tokia.',
            'Se divide el primer término del dividendo entre el primero del divisor (primer término del cociente), se multiplica el divisor por él y se resta al dividendo; y se sigue hasta que el resto tenga grado menor que el divisor. Siempre se cumple $D(x)=d(x)\\cdot c(x)+r(x)$, y el grado del cociente es el del dividendo menos el del divisor. Si el resto es 0, la división es exacta y $d(x)$ es divisor del dividendo. $(x^{4}-3x^{2}+2)\\mathbin{:}(x^{2}-1)$ es exacta: $x^{4}-3x^{2}+2=(x^{2}-1)(x^{2}-2)$. Si en el dividendo falta un término, deja su hueco.',
            'نقسم أول حد في المقسوم على أول حد في المقسوم عليه (أول حد في خارج القسمة)، ونضرب المقسوم عليه فيه ونطرحه من المقسوم، ونتابع حتى تصير درجة الباقي أصغر من درجة المقسوم عليه. ويتحقق دائمًا $D(x)=d(x)\\cdot c(x)+r(x)$، ودرجة خارج القسمة هي درجة المقسوم ناقص درجة المقسوم عليه. وإذا كان الباقي 0 فالقسمة تامة و$d(x)$ قاسم للمقسوم. القسمة $(x^{4}-3x^{2}+2)\\mathbin{:}(x^{2}-1)$ تامة: $x^{4}-3x^{2}+2=(x^{2}-1)(x^{2}-2)$. وإذا نقص حد في المقسوم فاترك مكانه.', 'Divide the first term of the dividend by the first term of the divisor (this is the first term of the quotient), multiply the divisor by it and subtract the result from the dividend; keep going until the remainder has a lower degree than the divisor. It always holds that $D(x)=d(x)\\cdot c(x)+r(x)$, and the degree of the quotient is the degree of the dividend minus the degree of the divisor. If the remainder is 0, the division is exact and $d(x)$ is a divisor of the dividend. $(x^{4}-3x^{2}+2)\\mathbin{:}(x^{2}-1)$ is exact: $x^{4}-3x^{2}+2=(x^{2}-1)(x^{2}-2)$. If a term is missing from the dividend, leave a gap for it.'
        ),
        problem: say('Zatitu $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}(2x+3)$.', 'Divide $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}(2x+3)$.', 'اقسم $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}(2x+3)$.', 'Divide $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}(2x+3)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$4x^{3}\\mathbin{:}2x=2x^{2}$; kendu $4x^{3}+6x^{2}$.', '$4x^{3}\\mathbin{:}2x=2x^{2}$; resta $4x^{3}+6x^{2}$.', '$4x^{3}\\mathbin{:}2x=2x^{2}$؛ اطرح $4x^{3}+6x^{2}$.', '$4x^{3}\\mathbin{:}2x=2x^{2}$; subtract $4x^{3}+6x^{2}$.'), math: same('$6x^{2}+5x-6$') },
            { text: say('$6x^{2}\\mathbin{:}2x=3x$; kendu $6x^{2}+9x$.', '$6x^{2}\\mathbin{:}2x=3x$; resta $6x^{2}+9x$.', '$6x^{2}\\mathbin{:}2x=3x$؛ اطرح $6x^{2}+9x$.', '$6x^{2}\\mathbin{:}2x=3x$; subtract $6x^{2}+9x$.'), math: same('$-4x-6$') },
            { text: say('$-2$; hondarra 0: zehatza.', '$-2$; resto 0: exacta.', '$-2$؛ الباقي 0: تامة.', '$-2$; remainder 0: exact.'), math: same('$c(x)=2x^{2}+3x-2$') }
        ],
        example: same('$D=d\\cdot c+r$'),
        takeaway: say('$D=D\\cdot C+R$, hondarraren maila zatitzailearena baino txikiagoa.', '$D=D\\cdot C+R$, con el grado del resto menor que el del divisor.', '$D=D\\cdot C+R$، ودرجة الباقي أصغر من درجة المقسوم عليه.', '$D=D\\cdot C+R$, with the degree of the remainder less than that of the divisor.'),
        figure: (language) => <LongDivisionFigure language={language} />
    },
    {
        id: 'ruffini',
        stage: 'division',
        title: say('Ruffiniren erregela', 'La regla de Ruffini', 'قاعدة روفيني', 'Ruffini\'s rule'),
        goal: say('Polinomio bat $x-a$ binomioaz Ruffiniz zatitzea, a osoa edo zatikia izanda ere.', 'Dividir un polinomio entre $x-a$ con Ruffini, aunque a sea entero o fraccionario.', 'قسمة حدودية على $x-a$ بروفيني، سواء كان a صحيحًا أو كسريًا.', 'Divide a polynomial by $x-a$ using Ruffini\'s rule, even when a is an integer or a fraction.'),
        explanation: say(
            'Zatitzailea $x-a$ denean, koefizienteekin bakarrik egiten da: idatzi zatikizunaren koefiziente guztiak (0 falta direnetan) eta ezkerrean a; jaitsi lehena, bider a, hurrengoarekin batu, eta errepikatu. Azkena hondarra da; besteak, zatiduraren koefizienteak. $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x-1)$: 1, 4, 1, 4 eta hondarra 0, beraz zatidura $x^{3}+4x^{2}+x+4$ eta zatiketa zehatza. $x+4$ bada, $a=-4$. a zatikia ere izan daiteke: $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}\\left(x-\\frac{1}{2}\\right)$ zatiketak 4, 14, 12 eta hondarra 0 ematen ditu. $2x-1$-z zatitzeko, $x-\\frac{1}{2}$-z zatitu eta zatidura 2z zatitu.',
            'Cuando el divisor es $x-a$, se divide solo con los coeficientes: escribe todos los coeficientes del dividendo (0 donde falte) y a la izquierda a; baja el primero, multiplica por a, suma con el siguiente, y repite. El último es el resto; los demás, los coeficientes del cociente. $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x-1)$: 1, 4, 1, 4 y resto 0, así que el cociente es $x^{3}+4x^{2}+x+4$ y la división es exacta. Si es $x+4$, $a=-4$. a también puede ser una fracción: $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}\\left(x-\\frac{1}{2}\\right)$ da 4, 14, 12 y resto 0. Para dividir entre $2x-1$ se divide entre $x-\\frac{1}{2}$ y el cociente se divide entre 2.',
            'عندما يكون المقسوم عليه $x-a$ نقسم بالمعاملات فقط: اكتب كل معاملات المقسوم (0 مكان الناقص) وa على اليسار؛ أنزل الأول واضربه في a واجمعه مع التالي وكرّر. الأخير هو الباقي، والباقي معاملات خارج القسمة. $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x-1)$: 1 و4 و1 و4 والباقي 0، فخارج القسمة $x^{3}+4x^{2}+x+4$ والقسمة تامة. وإذا كان $x+4$ فإن $a=-4$. ويمكن أن يكون a كسرًا: $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}\\left(x-\\frac{1}{2}\\right)$ تعطي 4 و14 و12 والباقي 0. وللقسمة على $2x-1$ نقسم على $x-\\frac{1}{2}$ ثم نقسم خارج القسمة على 2.', 'When the divisor is $x-a$, you divide using only the coefficients: write all the coefficients of the dividend (0 where one is missing) and a on the left; bring down the first one, multiply by a, add the next one, and repeat. The last one is the remainder; the others are the coefficients of the quotient. $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x-1)$: 1, 4, 1, 4 and remainder 0, so the quotient is $x^{3}+4x^{2}+x+4$ and the division is exact. If it is $x+4$, then $a=-4$. a can also be a fraction: $(4x^{3}+12x^{2}+5x-6)\\mathbin{:}\\left(x-\\frac{1}{2}\\right)$ gives 4, 14, 12 and remainder 0. To divide by $2x-1$, divide by $x-\\frac{1}{2}$ and then divide the quotient by 2.'
        ),
        problem: say('Ruffiniz: $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x+1)$.', 'Con Ruffini: $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x+1)$.', 'بروفيني: $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x+1)$.', 'Using Ruffini: $(x^{4}+3x^{3}-3x^{2}+3x-4)\\mathbin{:}(x+1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a=-1$. Jaitsi 1.', '$a=-1$. Baja el 1.', '$a=-1$. أنزل 1.', '$a=-1$. Bring down the 1.'), math: same('$1\\cdot(-1)+3=2$') },
            { text: say('Jarraitu.', 'Sigue.', 'تابع.', 'Continue.'), math: same('$2\\cdot(-1)-3=-5$') },
            { text: say('$-5\\cdot(-1)+3=8$; hondarra:', '$-5\\cdot(-1)+3=8$; el resto:', '$-5\\cdot(-1)+3=8$؛ الباقي:', '$-5\\cdot(-1)+3=8$; the remainder:'), math: same('$8\\cdot(-1)-4=-12$') }
        ],
        example: same('$x+4\\ \\to\\ a=-4$'),
        takeaway: say('Jaitsi, bider a, batu. Azkena hondarra da.', 'Baja, multiplica por a, suma. El último es el resto.', 'أنزل، اضرب في a، اجمع. الأخير هو الباقي.', 'Bring down, multiply by a, add. The last one is the remainder.'),
        figure: (language) => <RuffiniFigure language={language} />
    },
    {
        id: 'remainder',
        stage: 'division',
        title: say('Hondarraren teorema eta parametroak', 'Teorema del resto y parámetros', 'مبرهنة الباقي والوسائط', 'Remainder theorem and parameters'),
        goal: say('$P(a)$ Ruffiniz kalkulatzea eta hondarraren teorema erabiltzea parametro baten balioa aurkitzeko.', 'Calcular $P(a)$ con Ruffini y usar el teorema del resto para hallar el valor de un parámetro.', 'حساب $P(a)$ بروفيني واستعمال مبرهنة الباقي لإيجاد قيمة وسيط.', 'Calculate $P(a)$ with Ruffini and use the remainder theorem to find the value of a parameter.'),
        explanation: say(
            '$P(x)\\mathbin{:}(x-a)$ zatiketaren hondarra $P(a)$ da. Beraz, $P(a)$ kalkulatzeko Ruffini erabil daiteke, eta hori erosoagoa da zenbaki handiekin: $P(x)=7x^{4}-5x^{2}+2x-24$ bada, Ruffinik 2rekin 72 ematen du, beraz $P(2)=72$. Polinomioak letra bat (parametro bat) badu, hondarra parametroaren mende dago, eta baldintza bat betetzeko balioa aurki daiteke. $P(x)=x^{3}+x^{2}-ax+5$ eta $P(-3)=-1$ badira: $-27+9+3a+5=-1$, beraz $3a=12$ eta $a=4$. $(x-a)$-z zatigarria izateko, hondarrak 0 izan behar du.',
            'El resto de $P(x)\\mathbin{:}(x-a)$ es $P(a)$. Así que para calcular $P(a)$ se puede usar Ruffini, que es más cómodo con números grandes: si $P(x)=7x^{4}-5x^{2}+2x-24$, Ruffini con 2 da 72, así que $P(2)=72$. Si el polinomio tiene una letra (un parámetro), el resto depende de ella, y se puede hallar el valor que cumple una condición. Si $P(x)=x^{3}+x^{2}-ax+5$ y $P(-3)=-1$: $-27+9+3a+5=-1$, así que $3a=12$ y $a=4$. Para que sea divisible entre $(x-a)$, el resto tiene que ser 0.',
            'باقي $P(x)\\mathbin{:}(x-a)$ هو $P(a)$. لذا يمكن حساب $P(a)$ بروفيني، وهو أسهل مع الأعداد الكبيرة: إذا كان $P(x)=7x^{4}-5x^{2}+2x-24$ فروفيني بالعدد 2 يعطي 72، إذن $P(2)=72$. وإذا كان في الحدودية حرف (وسيط) فالباقي يتعلق به، ويمكن إيجاد القيمة التي تحقق شرطًا. إذا كان $P(x)=x^{3}+x^{2}-ax+5$ و$P(-3)=-1$: $-27+9+3a+5=-1$، إذن $3a=12$ و$a=4$. ولكي تقبل القسمة على $(x-a)$ يجب أن يكون الباقي 0.', 'The remainder of $P(x)\\mathbin{:}(x-a)$ is $P(a)$. So to calculate $P(a)$ you can use Ruffini, which is more convenient with large numbers: if $P(x)=7x^{4}-5x^{2}+2x-24$, Ruffini with 2 gives 72, so $P(2)=72$. If the polynomial has a letter (a parameter), the remainder depends on it, and you can find the value that meets a condition. If $P(x)=x^{3}+x^{2}-ax+5$ and $P(-3)=-1$: $-27+9+3a+5=-1$, so $3a=12$ and $a=4$. For it to be divisible by $(x-a)$, the remainder must be 0.'
        ),
        problem: say('$P(x)=7x^{3}-5mx-2$. Zenbat izan behar du m-k $P(x)\\mathbin{:}(x+1)$ zatiketaren hondarra $-4$ izateko?', '$P(x)=7x^{3}-5mx-2$. ¿Cuánto debe valer m para que el resto de $P(x)\\mathbin{:}(x+1)$ sea $-4$?', '$P(x)=7x^{3}-5mx-2$. كم يجب أن تكون m ليكون باقي $P(x)\\mathbin{:}(x+1)$ هو $-4$؟', '$P(x)=7x^{3}-5mx-2$. What must m be so that the remainder of $P(x)\\mathbin{:}(x+1)$ is $-4$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hondarra $P(-1)$ da.', 'El resto es $P(-1)$.', 'الباقي هو $P(-1)$.', 'The remainder is $P(-1)$.'), math: same('$-7+5m-2=5m-9$') },
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.', 'Set them equal.'), math: same('$5m-9=-4\\ \\to\\ m=1$') }
        ],
        example: same('$R=P(a)$'),
        takeaway: say('Hondarra $=P(A)$. Parametroa: berdindu eta askatu.', 'Resto $=P(A)$. Parámetro: iguala y despeja.', 'الباقي $=P(A)$. الوسيط: ساوِ واستخرج.', 'Remainder $=P(A)$. Parameter: set it equal and solve for it.'),
        figure: (language) => <ParameterFigure language={language} />
    },

    /* ---------- 3. Roots and factorisation ---------- */
    {
        id: 'roots',
        stage: 'factor',
        title: say('Polinomio baten erroak', 'Raíces de un polinomio', 'جذور الحدودية', 'Roots of a polynomial'),
        goal: say('Erro osoak gai askearen zatitzaileen artean bilatzea eta erroak dituzten polinomioak asmatzea.', 'Buscar las raíces enteras entre los divisores del término independiente e inventar polinomios con raíces dadas.', 'البحث عن الجذور الصحيحة بين قواسم الحد الثابت وتكوين حدوديات لها جذور معطاة.', 'Look for the integer roots among the divisors of the constant term, and make up polynomials with given roots.'),
        explanation: say(
            'a erroa da $P(a)=0$ bada; orduan $x-a$ faktorea da. Koefiziente osoko polinomio baten erro osoak gai askearen zatitzaileak dira: $x^{2}-x-12$ polinomioarenak $\\pm 1,\\pm 2,\\pm 3,\\pm 4,\\pm 6,\\pm 12$ artean daude, eta 4 eta $-3$ dira. $x^{4}+2x^{2}-x+8$ polinomioak ezin du $-3$ erroa izan, 8 ez delako 3ren multiploa. n mailako polinomio batek gehienez n erro ditu, eta maila bakoitiko batek gutxienez bat. Alderantziz, erroak jakinda polinomioa asma daiteke: 3, $-2$ eta $-1$ erroak dituena $(x-3)(x+2)(x+1)=x^{3}-7x-6$ da. $(x^{2}+1)^{2}$-k ez du errorik.',
            'a es raíz si $P(a)=0$; entonces $x-a$ es un factor. Las raíces enteras de un polinomio de coeficientes enteros son divisores del término independiente: las de $x^{2}-x-12$ están entre $\\pm 1,\\pm 2,\\pm 3,\\pm 4,\\pm 6,\\pm 12$, y son 4 y $-3$. $x^{4}+2x^{2}-x+8$ no puede tener la raíz $-3$, porque 8 no es múltiplo de 3. Un polinomio de grado n tiene como mucho n raíces, y uno de grado impar, al menos una. Al revés, conociendo las raíces se puede inventar el polinomio: el de raíces 3, $-2$ y $-1$ es $(x-3)(x+2)(x+1)=x^{3}-7x-6$. $(x^{2}+1)^{2}$ no tiene raíces.',
            'يكون a جذرًا إذا كان $P(a)=0$؛ وعندئذ يكون $x-a$ عاملًا. والجذور الصحيحة لحدودية معاملاتها صحيحة قواسم للحد الثابت: جذور $x^{2}-x-12$ بين $\\pm 1,\\pm 2,\\pm 3,\\pm 4,\\pm 6,\\pm 12$، وهي 4 و$-3$. ولا يمكن أن يكون $-3$ جذرًا لـ$x^{4}+2x^{2}-x+8$ لأن 8 ليس مضاعفًا لـ3. وللحدودية من الدرجة n على الأكثر n جذرًا، وللحدودية ذات الدرجة الفردية جذر واحد على الأقل. وبالعكس، بمعرفة الجذور نكوّن الحدودية: التي جذورها 3 و$-2$ و$-1$ هي $(x-3)(x+2)(x+1)=x^{3}-7x-6$. أما $(x^{2}+1)^{2}$ فلا جذور لها.', 'a is a root if $P(a)=0$; then $x-a$ is a factor. The integer roots of a polynomial with integer coefficients are divisors of the constant term: those of $x^{2}-x-12$ are among $\\pm 1,\\pm 2,\\pm 3,\\pm 4,\\pm 6,\\pm 12$, and they are 4 and $-3$. $x^{4}+2x^{2}-x+8$ cannot have the root $-3$, because 8 is not a multiple of 3. A polynomial of degree n has at most n roots, and one of odd degree has at least one. The other way round, if you know the roots you can make up the polynomial: the one with roots 3, $-2$ and $-1$ is $(x-3)(x+2)(x+1)=x^{3}-7x-6$. $(x^{2}+1)^{2}$ has no roots.'
        ),
        problem: say('$x^{3}+3x^{2}+x+3$ polinomioaren erro osoak 3ren zatitzaileen artean daude. Zein da erroa?', 'Las raíces enteras de $x^{3}+3x^{2}+x+3$ están entre los divisores de 3. ¿Cuál es la raíz?', 'الجذور الصحيحة لـ$x^{3}+3x^{2}+x+3$ بين قواسم 3. ما الجذر؟', 'The integer roots of $x^{3}+3x^{2}+x+3$ are among the divisors of 3. Which one is the root?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hautagaiak.', 'Candidatos.', 'المرشحون.', 'Candidates.'), math: same('$\\pm 1,\\ \\pm 3$') },
            { text: say('$x=-3$ probatu.', 'Prueba $x=-3$.', 'جرّب $x=-3$.', 'Try $x=-3$.'), math: same('$-27+27-3+3=0$') },
            { text: say('Zatidura $x^{2}+1$: ez du erro gehiago.', 'Cociente $x^{2}+1$: no hay más raíces.', 'خارج القسمة $x^{2}+1$: لا جذور أخرى.', 'Quotient $x^{2}+1$: there are no more roots.'), math: same('$(x+3)(x^{2}+1)$') }
        ],
        example: same('$P(a)=0$'),
        takeaway: say('Erro osoak: gai askearen zatitzaileak. $P(A)=0$ ⟺ $X-A$ faktorea.', 'Raíces enteras: divisores del término independiente. $P(A)=0$ ⟺ $X-A$ es factor.', 'الجذور الصحيحة: قواسم الحد الثابت. $P(A)=0$ ⟺ $X-A$ عامل.', 'Integer roots: divisors of the constant term. $P(A)=0$ ⟺ $X-A$ is a factor.'),
        figure: (language) => <RootsFigure language={language} />
    },
    {
        id: 'factorize',
        stage: 'factor',
        title: say('Polinomioak faktorizatzea', 'Factorizar polinomios', 'تحليل الحدوديات', 'Factorising polynomials'),
        goal: say('Polinomio bat faktore irreduziblez osatutako biderkadura gisa idaztea, urratsen ordena jarraituz.', 'Escribir un polinomio como producto de factores irreducibles siguiendo un orden de pasos.', 'كتابة الحدودية جداءً لعوامل غير قابلة للتحليل باتباع ترتيب الخطوات.', 'Write a polynomial as a product of irreducible factors, following a set order of steps.'),
        explanation: say(
            'Ordena: lehenik faktore komuna; gero identitate nabarmenak; gero Ruffini erro osoekin; eta 2. mailako zatidura bat geratzen bada, haren ekuazioa ebatzi. $3x^{5}-48x=3x(x^{4}-16)=3x(x^{2}+4)(x+2)(x-2)$. $x^{4}+2x^{3}-23x^{2}-60x=x(x-5)(x+3)(x+4)$. Erroak zatikiak izan daitezke: $3x^{2}+2x-8=0$ ekuazioaren erroak $\\frac{4}{3}$ eta $-2$ dira, beraz $3x^{2}+2x-8=3\\left(x-\\frac{4}{3}\\right)(x+2)=(3x-4)(x+2)$. Koefiziente nagusia ez ahaztu! Erro bikoitzak berretura gisa: $x^{3}-7x^{2}+8x+16=(x-4)^{2}(x+1)$. $x^{2}+4$ bezalako faktoreak, erro errealik gabeak, irreduzibleak dira.',
            'El orden: primero, factor común; después, igualdades notables; luego, Ruffini con las raíces enteras; y si queda un cociente de grado 2, se resuelve su ecuación. $3x^{5}-48x=3x(x^{4}-16)=3x(x^{2}+4)(x+2)(x-2)$. $x^{4}+2x^{3}-23x^{2}-60x=x(x-5)(x+3)(x+4)$. Las raíces pueden ser fracciones: $3x^{2}+2x-8=0$ tiene raíces $\\frac{4}{3}$ y $-2$, así que $3x^{2}+2x-8=3\\left(x-\\frac{4}{3}\\right)(x+2)=(3x-4)(x+2)$. ¡No olvides el coeficiente principal! Las raíces dobles, como potencia: $x^{3}-7x^{2}+8x+16=(x-4)^{2}(x+1)$. Factores como $x^{2}+4$, sin raíces reales, son irreducibles.',
            'الترتيب: أولًا العامل المشترك، ثم المتطابقات الشهيرة، ثم روفيني بالجذور الصحيحة، وإذا بقي خارج قسمة من الدرجة الثانية نحل معادلته. $3x^{5}-48x=3x(x^{4}-16)=3x(x^{2}+4)(x+2)(x-2)$. $x^{4}+2x^{3}-23x^{2}-60x=x(x-5)(x+3)(x+4)$. وقد تكون الجذور كسورًا: جذرا $3x^{2}+2x-8=0$ هما $\\frac{4}{3}$ و$-2$، إذن $3x^{2}+2x-8=3\\left(x-\\frac{4}{3}\\right)(x+2)=(3x-4)(x+2)$. لا تنسَ المعامل الرئيسي! والجذور المضاعفة على شكل قوة: $x^{3}-7x^{2}+8x+16=(x-4)^{2}(x+1)$. والعوامل مثل $x^{2}+4$ التي لا جذور حقيقية لها غير قابلة للتحليل.', 'The order: first, common factor; then, special identities; then, Ruffini with the integer roots; and if a quotient of degree 2 is left, solve its equation. $3x^{5}-48x=3x(x^{4}-16)=3x(x^{2}+4)(x+2)(x-2)$. $x^{4}+2x^{3}-23x^{2}-60x=x(x-5)(x+3)(x+4)$. The roots can be fractions: $3x^{2}+2x-8=0$ has roots $\\frac{4}{3}$ and $-2$, so $3x^{2}+2x-8=3\\left(x-\\frac{4}{3}\\right)(x+2)=(3x-4)(x+2)$. Don\'t forget the leading coefficient! Double roots appear as a power: $x^{3}-7x^{2}+8x+16=(x-4)^{2}(x+1)$. Factors such as $x^{2}+4$, with no real roots, are irreducible.'
        ),
        problem: say('Faktorizatu $x^{3}-x^{2}-14x+24$.', 'Factoriza $x^{3}-x^{2}-14x+24$.', 'حلّل $x^{3}-x^{2}-14x+24$.', 'Factorise $x^{3}-x^{2}-14x+24$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('2 erroa da.', '2 es raíz.', '2 جذر.', '2 is a root.'), math: same('$8-4-28+24=0$') },
            { text: say('Ruffiniz zatidura.', 'Cociente con Ruffini.', 'خارج القسمة بروفيني.', 'Find the quotient with Ruffini.'), math: same('$x^{2}+x-12$') },
            { text: say('Haren erroak 3 eta $-4$.', 'Sus raíces son 3 y $-4$.', 'جذراه 3 و$-4$.', 'Its roots are 3 and $-4$.'), math: same('$(x-2)(x-3)(x+4)$') }
        ],
        example: same('$3x^{2}+2x-8=(3x-4)(x+2)$'),
        takeaway: say('Faktore komuna → identitateak → Ruffini → 2. mailako ekuazioa.', 'Factor común → identidades → Ruffini → ecuación de 2.º grado.', 'العامل المشترك ← المتطابقات ← روفيني ← معادلة الدرجة الثانية.', 'Common factor → special identities → Ruffini → quadratic equation.'),
        figure: (language) => <FactorStrategyFigure language={language} />
    },
    {
        id: 'gcd-lcm',
        stage: 'factor',
        title: say('Zatigarritasuna, z.k.h. eta m.k.t.', 'Divisibilidad, m.c.d. y m.c.m.', 'قابلية القسمة والقاسم والمضاعف المشترك', 'Divisibility, GCD and LCM'),
        goal: say('Polinomio batek beste bat zatitzen duen erabakitzea eta bi polinomioren z.k.h. eta m.k.t. kalkulatzea.', 'Decidir si un polinomio divide a otro y calcular el m.c.d. y el m.c.m. de dos polinomios.', 'تحديد ما إذا كانت حدودية تقسم أخرى وحساب القاسم المشترك الأكبر والمضاعف المشترك الأصغر لحدوديتين.', 'Decide whether one polynomial divides another, and calculate the GCD and LCM of two polynomials.'),
        explanation: say(
            '$Q(x)$-k $P(x)$ zatitzen du zatiketa zehatza bada; faktorizatuta begi-bistan dago: $P=x^{3}-7x^{2}=x^{2}(x-7)$ eta $Q=x^{2}-7x=x(x-7)$ badira, Q-k P zatitzen du. Polinomio irreduzible bat ezin da maila txikiagoko faktoreetan deskonposatu: $x-3$, $x^{2}+1$, $3x^{2}-5x+3$ (ez du erro errealik). Zenbakiekin bezala, faktorizatu eta: z.k.h. = faktore komunak berretzaile txikienarekin; m.k.t. = faktore komun eta ez-komun guztiak berretzaile handienarekin. $P=x(x-2)(x-5)$ eta $Q=x^{2}(x-5)$: z.k.h. $=x(x-5)$, m.k.t. $=x^{2}(x-2)(x-5)$. Zatiki aljebraikoak izendatzaile komunera eramateko erabiltzen da m.k.t.-a.',
            '$Q(x)$ divide a $P(x)$ si la división es exacta; factorizados se ve a simple vista: si $P=x^{3}-7x^{2}=x^{2}(x-7)$ y $Q=x^{2}-7x=x(x-7)$, Q divide a P. Un polinomio irreducible no se puede descomponer en factores de grado menor: $x-3$, $x^{2}+1$, $3x^{2}-5x+3$ (no tiene raíces reales). Como con los números, se factoriza y: m.c.d. = factores comunes con el menor exponente; m.c.m. = factores comunes y no comunes con el mayor exponente. $P=x(x-2)(x-5)$ y $Q=x^{2}(x-5)$: m.c.d. $=x(x-5)$, m.c.m. $=x^{2}(x-2)(x-5)$. El m.c.m. se usa para llevar fracciones algebraicas a denominador común.',
            'تقسم $Q(x)$ الحدوديةَ $P(x)$ إذا كانت القسمة تامة؛ وبعد التحليل يظهر ذلك مباشرة: إذا كان $P=x^{3}-7x^{2}=x^{2}(x-7)$ و$Q=x^{2}-7x=x(x-7)$ فإن Q تقسم P. والحدودية غير القابلة للتحليل لا تُكتب جداءً لعوامل أقل درجة: $x-3$ و$x^{2}+1$ و$3x^{2}-5x+3$ (لا جذور حقيقية لها). وكما في الأعداد نحلّل ثم: القاسم المشترك الأكبر = العوامل المشتركة بأصغر أس؛ والمضاعف المشترك الأصغر = العوامل المشتركة وغير المشتركة بأكبر أس. $P=x(x-2)(x-5)$ و$Q=x^{2}(x-5)$: القاسم $=x(x-5)$ والمضاعف $=x^{2}(x-2)(x-5)$. ويُستعمل المضاعف المشترك الأصغر لتوحيد مقامات الكسور الجبرية.', '$Q(x)$ divides $P(x)$ if the division is exact. Once factorised, you can see it at a glance: if $P=x^{3}-7x^{2}=x^{2}(x-7)$ and $Q=x^{2}-7x=x(x-7)$, Q divides P. An irreducible polynomial cannot be broken down into factors of lower degree: $x-3$, $x^{2}+1$, $3x^{2}-5x+3$ (it has no real roots). As with numbers, you factorise and then: GCD = common factors with the smallest exponent; LCM = common and non-common factors with the largest exponent. $P=x(x-2)(x-5)$ and $Q=x^{2}(x-5)$: GCD $=x(x-5)$, LCM $=x^{2}(x-2)(x-5)$. The LCM is used to put algebraic fractions over a common denominator.'
        ),
        problem: say('Kalkulatu $P=x^{2}-4$ eta $Q=x^{2}+4x+4$ polinomioen z.k.h. eta m.k.t.', 'Calcula el m.c.d. y el m.c.m. de $P=x^{2}-4$ y $Q=x^{2}+4x+4$.', 'احسب القاسم المشترك الأكبر والمضاعف المشترك الأصغر لـ$P=x^{2}-4$ و$Q=x^{2}+4x+4$.', 'Calculate the GCD and LCM of $P=x^{2}-4$ and $Q=x^{2}+4x+4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu.', 'Factoriza.', 'حلّل.', 'Factorise.'), math: same('$P=(x+2)(x-2)\\quad Q=(x+2)^{2}$') },
            { text: say('Z.k.h.: komunak, txikiena.', 'M.c.d.: comunes, el menor.', 'القاسم: المشتركة بالأصغر.', 'GCD: common factors, the smallest.'), math: same('$x+2$') },
            { text: say('M.k.t.: denak, handiena.', 'M.c.m.: todos, el mayor.', 'المضاعف: الكل بالأكبر.', 'LCM: all factors, the largest.'), math: same('$(x+2)^{2}(x-2)$') }
        ],
        example: same('$x^{2}-7x\\mid x^{3}-7x^{2}$'),
        takeaway: say('Z.K.H.: komunak, txikiena. M.K.T.: denak, handiena.', 'M.C.D.: comunes, el menor. M.C.M.: todos, el mayor.', 'القاسم: المشتركة بالأصغر. المضاعف: الكل بالأكبر.', 'GCD: common factors, the smallest. LCM: all factors, the largest.'),
        figure: (language) => <GcdLcmFigure language={language} />
    },

    /* ---------- 4. Algebraic fractions ---------- */
    {
        id: 'algebraic-fractions',
        stage: 'fractions',
        title: say('Zatiki aljebraikoak', 'Fracciones algebraicas', 'الكسور الجبرية', 'Algebraic fractions'),
        goal: say('Zatiki aljebraikoak ezagutzea, haien zenbakizko balioa kalkulatzea eta zein baliotan ez dauden jakitea.', 'Reconocer fracciones algebraicas, calcular su valor numérico y saber en qué valores no existen.', 'التعرّف على الكسور الجبرية وحساب قيمتها العددية ومعرفة القيم التي لا تكون معرّفة عندها.', 'Recognise algebraic fractions, calculate their numerical value and know for which values they do not exist.'),
        explanation: say(
            'Zatiki aljebraiko bat $\\frac{P(x)}{Q(x)}$ zatidura da, P eta Q polinomioak izanik eta Q-k letra duela: $\\frac{2}{x+1}$ eta $\\frac{-2x+5}{3x}$ zatiki aljebraikoak dira; $\\frac{x+1}{2}$, berriz, polinomio bat da ($\\frac{1}{2}x+\\frac{1}{2}$). Zenbakizko balioa x-ren ordez zenbaki bat jarrita kalkulatzen da: $\\frac{x+1}{x^{2}-4}$ zatikiak x = 3 denean $\\frac{4}{5}$ balio du. Izendatzailea 0 egiten duten balioetan ez du baliorik: $x^{2}-4=0$, beraz $x=2$ eta $x=-2$ kanpoan geratzen dira. Zenbakitzailea 0 bada (eta izendatzailea ez), zatikiak 0 balio du: $x=-1$ denean.',
            'Una fracción algebraica es un cociente $\\frac{P(x)}{Q(x)}$ de dos polinomios en el que Q tiene letra: $\\frac{2}{x+1}$ y $\\frac{-2x+5}{3x}$ son fracciones algebraicas; $\\frac{x+1}{2}$, en cambio, es un polinomio ($\\frac{1}{2}x+\\frac{1}{2}$). El valor numérico se calcula poniendo un número en lugar de x: $\\frac{x+1}{x^{2}-4}$ vale $\\frac{4}{5}$ para x = 3. En los valores que anulan el denominador no tiene valor: $x^{2}-4=0$, así que quedan fuera $x=2$ y $x=-2$. Si se anula el numerador (y no el denominador), la fracción vale 0: para $x=-1$.',
            'الكسر الجبري خارج قسمة $\\frac{P(x)}{Q(x)}$ لحدوديتين يحتوي فيه Q على حرف: $\\frac{2}{x+1}$ و$\\frac{-2x+5}{3x}$ كسران جبريان؛ أما $\\frac{x+1}{2}$ فحدودية ($\\frac{1}{2}x+\\frac{1}{2}$). والقيمة العددية نحسبها بوضع عدد مكان x: قيمة $\\frac{x+1}{x^{2}-4}$ عندما x = 3 هي $\\frac{4}{5}$. وعند القيم التي تعدم المقام لا قيمة له: $x^{2}-4=0$، إذن تُستبعد $x=2$ و$x=-2$. وإذا انعدم البسط (دون المقام) فقيمة الكسر 0: عندما $x=-1$.', 'An algebraic fraction is a quotient $\\frac{P(x)}{Q(x)}$ of two polynomials in which Q contains a letter: $\\frac{2}{x+1}$ and $\\frac{-2x+5}{3x}$ are algebraic fractions; $\\frac{x+1}{2}$, on the other hand, is a polynomial ($\\frac{1}{2}x+\\frac{1}{2}$). The numerical value is found by putting a number in place of x: $\\frac{x+1}{x^{2}-4}$ equals $\\frac{4}{5}$ for x = 3. For the values that make the denominator 0, it has no value: $x^{2}-4=0$, so $x=2$ and $x=-2$ are excluded. If the numerator is 0 (and the denominator is not), the fraction equals 0: for $x=-1$.'
        ),
        problem: say('Kalkulatu $\\frac{x^{2}-1}{2x+1}$ zatikiaren balioa x = −2 denean.', 'Calcula el valor de $\\frac{x^{2}-1}{2x+1}$ para x = −2.', 'احسب قيمة $\\frac{x^{2}-1}{2x+1}$ عندما x = −2.', 'Calculate the value of $\\frac{x^{2}-1}{2x+1}$ for x = −2.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$\\frac{(-2)^{2}-1}{2\\cdot(-2)+1}=\\frac{3}{-3}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$\\frac{3}{-3}=-1$') }
        ],
        example: same('$x^{2}-4\\neq 0$'),
        takeaway: say('$\\frac{P}{Q}$: ez dago $Q=0$ den tokian.', '$\\frac{P}{Q}$: no existe donde $Q=0$.', '$\\frac{P}{Q}$: غير معرّف حيث $Q=0$.', '$\\frac{P}{Q}$: it does not exist where $Q=0$.'),
        figure: (language) => <DomainFigure language={language} />
    },
    {
        id: 'simplify',
        stage: 'fractions',
        title: say('Zatiki aljebraikoak sinplifikatzea', 'Simplificar fracciones algebraicas', 'تبسيط الكسور الجبرية', 'Simplifying algebraic fractions'),
        goal: say('Zenbakitzailea eta izendatzailea faktorizatzea eta faktore komunak ezabatzea.', 'Factorizar numerador y denominador y eliminar los factores comunes.', 'تحليل البسط والمقام وحذف العوامل المشتركة.', 'Factorise the numerator and denominator and cancel the common factors.'),
        explanation: say(
            'Zatiki bat sinplifikatzeko, zenbakitzailea eta izendatzailea faktorizatzen dira eta faktore komunak ezabatzen dira (bietan z.k.h.-az zatitzea da). $\\frac{x^{2}-9}{x^{2}+6x+9}=\\frac{(x+3)(x-3)}{(x+3)^{2}}=\\frac{x-3}{x+3}$. $\\frac{x^{3}-x}{x^{2}+x}=\\frac{x(x+1)(x-1)}{x(x+1)}=x-1$. Faktoreak bakarrik ezabatzen dira, inoiz ez batugaiak: $\\frac{x+3}{x+5}$ ez da $\\frac{3}{5}$. Sinplifikatu ondoren zatikia beste baten baliokidea da, baina jatorrizkoan kanpoan zeuden balioak (izendatzailea 0) kanpoan jarraitzen dute. Egiaztatzeko, eman x-ri balio bat: x = 2 denean, $\\frac{8-2}{4+2}=1=2-1$.',
            'Para simplificar una fracción se factorizan numerador y denominador y se eliminan los factores comunes (es dividir ambos entre su m.c.d.). $\\frac{x^{2}-9}{x^{2}+6x+9}=\\frac{(x+3)(x-3)}{(x+3)^{2}}=\\frac{x-3}{x+3}$. $\\frac{x^{3}-x}{x^{2}+x}=\\frac{x(x+1)(x-1)}{x(x+1)}=x-1$. Solo se eliminan factores, nunca sumandos: $\\frac{x+3}{x+5}$ no es $\\frac{3}{5}$. Tras simplificar, la fracción es equivalente a la original, aunque los valores que anulaban el denominador original siguen fuera. Para comprobarlo, da un valor a x: para x = 2, $\\frac{8-2}{4+2}=1=2-1$.',
            'لتبسيط كسر نحلّل البسط والمقام ونحذف العوامل المشتركة (أي نقسمهما على قاسمهما المشترك الأكبر). $\\frac{x^{2}-9}{x^{2}+6x+9}=\\frac{(x+3)(x-3)}{(x+3)^{2}}=\\frac{x-3}{x+3}$. $\\frac{x^{3}-x}{x^{2}+x}=\\frac{x(x+1)(x-1)}{x(x+1)}=x-1$. ولا نحذف إلا العوامل، لا الحدود المجموعة أبدًا: $\\frac{x+3}{x+5}$ ليست $\\frac{3}{5}$. وبعد التبسيط يكون الكسر مكافئًا للأصلي، لكن القيم التي كانت تعدم المقام الأصلي تبقى مستبعدة. وللتحقق أعطِ x قيمة: عندما x = 2 يكون $\\frac{8-2}{4+2}=1=2-1$.', 'To simplify a fraction, factorise the numerator and denominator and cancel the common factors (this means dividing both by their GCD). $\\frac{x^{2}-9}{x^{2}+6x+9}=\\frac{(x+3)(x-3)}{(x+3)^{2}}=\\frac{x-3}{x+3}$. $\\frac{x^{3}-x}{x^{2}+x}=\\frac{x(x+1)(x-1)}{x(x+1)}=x-1$. Only factors can be cancelled, never terms that are added: $\\frac{x+3}{x+5}$ is not $\\frac{3}{5}$. After simplifying, the fraction is equivalent to the original, although the values that made the original denominator 0 are still excluded. To check it, give x a value: for x = 2, $\\frac{8-2}{4+2}=1=2-1$.'
        ),
        problem: say('Sinplifikatu $\\frac{x^{2}-5x+6}{x^{2}-4}$.', 'Simplifica $\\frac{x^{2}-5x+6}{x^{2}-4}$.', 'بسّط $\\frac{x^{2}-5x+6}{x^{2}-4}$.', 'Simplify $\\frac{x^{2}-5x+6}{x^{2}-4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbakitzailea: erroak 2 eta 3.', 'Numerador: raíces 2 y 3.', 'البسط: الجذران 2 و3.', 'Numerator: roots 2 and 3.'), math: same('$(x-2)(x-3)$') },
            { text: say('Izendatzailea.', 'Denominador.', 'المقام.', 'Denominator.'), math: same('$(x+2)(x-2)$') },
            { text: say('Ezabatu $x-2$.', 'Elimina $x-2$.', 'احذف $x-2$.', 'Cancel $x-2$.'), math: same('$\\frac{x-3}{x+2}$') }
        ],
        example: same('$\\frac{x^{2}-1}{x+1}=x-1$'),
        takeaway: say('Faktorizatu, gero ezabatu: faktoreak bai, batugaiak ez.', 'Factoriza y elimina: factores sí, sumandos no.', 'حلّل ثم احذف: العوامل نعم، الحدود المجموعة لا.', 'Factorise and cancel: factors yes, added terms no.'),
        figure: (language) => <AlgebraicFractionFigure language={language} />
    },
    {
        id: 'equivalent',
        stage: 'fractions',
        title: say('Zatiki baliokideak', 'Fracciones equivalentes', 'الكسور المتكافئة', 'Equivalent fractions'),
        goal: say('Bi zatiki aljebraiko baliokideak diren egiaztatzea eta zatiki baliokide bat osatzea.', 'Comprobar si dos fracciones algebraicas son equivalentes y completar una fracción equivalente.', 'التحقق من تكافؤ كسرين جبريين وإكمال كسر مكافئ.', 'Check whether two algebraic fractions are equivalent, and complete an equivalent fraction.'),
        explanation: say(
            '$\\frac{P}{Q}$ eta $\\frac{R}{S}$ baliokideak dira $P\\cdot S=Q\\cdot R$ bada (biderkadura gurutzatuak). $\\frac{x}{x+1}$ eta $\\frac{x^{2}-x}{x^{2}-1}$: $x(x^{2}-1)=x^{3}-x$ eta $(x+1)(x^{2}-x)=x^{3}-x$, beraz baliokideak dira. Beste modu bat: bata sinplifikatu eta bestea lortzen den ikusi. Zatiki baliokide bat lortzeko, zenbakitzailea eta izendatzailea polinomio berberaz biderkatzen dira: $\\frac{3}{x-1}=\\frac{3(x+1)}{x^{2}-1}$. Hutsune bat osatzeko, begiratu zer biderkatu den: $\\frac{x+2}{x}=\\frac{\\ldots}{x^{2}}$ bada, izendatzailea x-z biderkatu da, beraz zenbakitzailea $x^{2}+2x$ da.',
            '$\\frac{P}{Q}$ y $\\frac{R}{S}$ son equivalentes si $P\\cdot S=Q\\cdot R$ (productos cruzados). $\\frac{x}{x+1}$ y $\\frac{x^{2}-x}{x^{2}-1}$: $x(x^{2}-1)=x^{3}-x$ y $(x+1)(x^{2}-x)=x^{3}-x$, así que son equivalentes. Otra forma: simplificar una y ver si sale la otra. Para obtener una fracción equivalente se multiplican numerador y denominador por el mismo polinomio: $\\frac{3}{x-1}=\\frac{3(x+1)}{x^{2}-1}$. Para completar un hueco, mira por qué se ha multiplicado: si $\\frac{x+2}{x}=\\frac{\\ldots}{x^{2}}$, el denominador se ha multiplicado por x, así que el numerador es $x^{2}+2x$.',
            'يكون $\\frac{P}{Q}$ و$\\frac{R}{S}$ متكافئين إذا كان $P\\cdot S=Q\\cdot R$ (الجداءان التقاطعيان). $\\frac{x}{x+1}$ و$\\frac{x^{2}-x}{x^{2}-1}$: $x(x^{2}-1)=x^{3}-x$ و$(x+1)(x^{2}-x)=x^{3}-x$، إذن هما متكافئان. وطريقة أخرى: نبسّط أحدهما ونرى هل نحصل على الآخر. وللحصول على كسر مكافئ نضرب البسط والمقام في الحدودية نفسها: $\\frac{3}{x-1}=\\frac{3(x+1)}{x^{2}-1}$. ولإكمال فراغ انظر في أي شيء ضُرب: إذا كان $\\frac{x+2}{x}=\\frac{\\ldots}{x^{2}}$ فقد ضُرب المقام في x، إذن البسط $x^{2}+2x$.', '$\\frac{P}{Q}$ and $\\frac{R}{S}$ are equivalent if $P\\cdot S=Q\\cdot R$ (cross products). $\\frac{x}{x+1}$ and $\\frac{x^{2}-x}{x^{2}-1}$: $x(x^{2}-1)=x^{3}-x$ and $(x+1)(x^{2}-x)=x^{3}-x$, so they are equivalent. Another way: simplify one and see if you get the other. To get an equivalent fraction, multiply the numerator and the denominator by the same polynomial: $\\frac{3}{x-1}=\\frac{3(x+1)}{x^{2}-1}$. To fill in a gap, look at what was multiplied: if $\\frac{x+2}{x}=\\frac{\\ldots}{x^{2}}$, the denominator was multiplied by x, so the numerator is $x^{2}+2x$.'
        ),
        problem: say('Baliokideak dira $\\frac{x-2}{x+3}$ eta $\\frac{x^{2}-4}{x^{2}+5x+6}$?', '¿Son equivalentes $\\frac{x-2}{x+3}$ y $\\frac{x^{2}-4}{x^{2}+5x+6}$?', 'هل $\\frac{x-2}{x+3}$ و$\\frac{x^{2}-4}{x^{2}+5x+6}$ متكافئان؟', 'Are $\\frac{x-2}{x+3}$ and $\\frac{x^{2}-4}{x^{2}+5x+6}$ equivalent?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu bigarrena.', 'Factoriza la segunda.', 'حلّل الثاني.', 'Factorise the second one.'), math: same('$\\frac{(x+2)(x-2)}{(x+2)(x+3)}$') },
            { text: say('Sinplifikatu: bai, baliokideak dira.', 'Simplifica: sí, son equivalentes.', 'بسّط: نعم، متكافئان.', 'Simplify: yes, they are equivalent.'), math: same('$\\frac{x-2}{x+3}$') }
        ],
        example: same('$\\frac{3}{x-1}=\\frac{3(x+1)}{x^{2}-1}$'),
        takeaway: say('Baliokideak: $P\\cdot S=Q\\cdot R$.', 'Equivalentes: $P\\cdot S=Q\\cdot R$.', 'متكافئان: $P\\cdot S=Q\\cdot R$.', 'Equivalent: $P\\cdot S=Q\\cdot R$.'),
        figure: (language) => <EquivalentFractionsFigure language={language} />
    },

    /* ---------- 5. Operations with algebraic fractions ---------- */
    {
        id: 'add-fractions',
        stage: 'operate',
        title: say('Batuketa eta kenketa', 'Suma y resta', 'الجمع والطرح', 'Addition and subtraction'),
        goal: say('Zatiki aljebraikoak izendatzaile komunera eramatea eta batu edo kentzea.', 'Reducir fracciones algebraicas a común denominador y sumarlas o restarlas.', 'توحيد مقامات الكسور الجبرية وجمعها أو طرحها.', 'Reduce algebraic fractions to a common denominator, and add or subtract them.'),
        explanation: say(
            'Izendatzaile bera badute, zenbakitzaileak batu edo kentzen dira: $\\frac{2x}{x+1}+\\frac{3}{x+1}=\\frac{2x+3}{x+1}$. Bestela, izendatzaile komuna m.k.t.-a da: izendatzaileak faktorizatu, m.k.t.-a kalkulatu, eta zenbakitzaile bakoitza falta zaionaz biderkatu. $\\frac{2}{x}+\\frac{1}{x+1}=\\frac{2(x+1)+x}{x(x+1)}=\\frac{3x+2}{x(x+1)}$. Kentzean, parentesia jarri kenkizunari: $\\frac{1}{x-1}-\\frac{1}{x+1}=\\frac{(x+1)-(x-1)}{(x-1)(x+1)}=\\frac{2}{x^{2}-1}$. Izendatzaileek faktore komunak badituzte, ez biderkatu dena: $\\frac{1}{x^{2}-1}+\\frac{1}{x-1}$ zatikien m.k.t.-a $x^{2}-1$ da.',
            'Si tienen el mismo denominador, se suman o restan los numeradores: $\\frac{2x}{x+1}+\\frac{3}{x+1}=\\frac{2x+3}{x+1}$. Si no, el denominador común es el m.c.m.: factoriza los denominadores, calcula su m.c.m. y multiplica cada numerador por lo que le falta. $\\frac{2}{x}+\\frac{1}{x+1}=\\frac{2(x+1)+x}{x(x+1)}=\\frac{3x+2}{x(x+1)}$. Al restar, pon paréntesis al sustraendo: $\\frac{1}{x-1}-\\frac{1}{x+1}=\\frac{(x+1)-(x-1)}{(x-1)(x+1)}=\\frac{2}{x^{2}-1}$. Si los denominadores tienen factores comunes, no lo multipliques todo: el m.c.m. de $\\frac{1}{x^{2}-1}+\\frac{1}{x-1}$ es $x^{2}-1$.',
            'إذا كان لها المقام نفسه نجمع البسوط أو نطرحها: $\\frac{2x}{x+1}+\\frac{3}{x+1}=\\frac{2x+3}{x+1}$. وإلا فالمقام المشترك هو المضاعف المشترك الأصغر: حلّل المقامات واحسب مضاعفها المشترك الأصغر واضرب كل بسط فيما ينقصه. $\\frac{2}{x}+\\frac{1}{x+1}=\\frac{2(x+1)+x}{x(x+1)}=\\frac{3x+2}{x(x+1)}$. وعند الطرح ضع المطروح بين قوسين: $\\frac{1}{x-1}-\\frac{1}{x+1}=\\frac{(x+1)-(x-1)}{(x-1)(x+1)}=\\frac{2}{x^{2}-1}$. وإذا كان للمقامات عوامل مشتركة فلا تضرب كل شيء: المضاعف المشترك الأصغر لـ$\\frac{1}{x^{2}-1}+\\frac{1}{x-1}$ هو $x^{2}-1$.', 'If they have the same denominator, add or subtract the numerators: $\\frac{2x}{x+1}+\\frac{3}{x+1}=\\frac{2x+3}{x+1}$. If not, the common denominator is the LCM: factorise the denominators, calculate their LCM and multiply each numerator by what its denominator is missing. $\\frac{2}{x}+\\frac{1}{x+1}=\\frac{2(x+1)+x}{x(x+1)}=\\frac{3x+2}{x(x+1)}$. When subtracting, put brackets around the term being subtracted: $\\frac{1}{x-1}-\\frac{1}{x+1}=\\frac{(x+1)-(x-1)}{(x-1)(x+1)}=\\frac{2}{x^{2}-1}$. If the denominators have common factors, don\'t multiply everything: the LCM of $\\frac{1}{x^{2}-1}+\\frac{1}{x-1}$ is $x^{2}-1$.'
        ),
        problem: say('Kalkulatu $\\frac{x}{x-2}-\\frac{2}{x}$.', 'Calcula $\\frac{x}{x-2}-\\frac{2}{x}$.', 'احسب $\\frac{x}{x-2}-\\frac{2}{x}$.', 'Calculate $\\frac{x}{x-2}-\\frac{2}{x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('M.k.t. $=x(x-2)$.', 'M.c.m. $=x(x-2)$.', 'المضاعف $=x(x-2)$.', 'LCM $=x(x-2)$.'), math: same('$\\frac{x\\cdot x-2(x-2)}{x(x-2)}$') },
            { text: say('Zenbakitzailea garatu.', 'Desarrolla el numerador.', 'انشر البسط.', 'Expand the numerator.'), math: same('$\\frac{x^{2}-2x+4}{x(x-2)}$') }
        ],
        example: same('$\\frac{2}{x}+\\frac{1}{x}=\\frac{3}{x}$'),
        takeaway: say('Izendatzaile komuna = m.k.t.; kentzean, parentesia.', 'Denominador común = m.c.m.; al restar, paréntesis.', 'المقام المشترك = المضاعف المشترك الأصغر؛ وعند الطرح قوس.', 'Common denominator = LCM; when subtracting, use brackets.'),
        figure: (language) => <CommonDenominatorFigure language={language} />
    },
    {
        id: 'multiply-fractions',
        stage: 'operate',
        title: say('Biderkadura eta zatidura', 'Producto y cociente', 'الضرب والقسمة', 'Product and quotient'),
        goal: say('Zatiki aljebraikoak biderkatu eta zatitzea, eta emaitza sinplifikatzea.', 'Multiplicar y dividir fracciones algebraicas y simplificar el resultado.', 'ضرب الكسور الجبرية وقسمتها وتبسيط الناتج.', 'Multiply and divide algebraic fractions, and simplify the result.'),
        explanation: say(
            'Biderkatzeko, zenbakitzaileak elkarren artean eta izendatzaileak elkarren artean: $\\frac{P}{Q}\\cdot\\frac{R}{S}=\\frac{P\\cdot R}{Q\\cdot S}$. Zatitzeko, bigarrenari buelta eman eta biderkatu: $\\frac{P}{Q}\\mathbin{:}\\frac{R}{S}=\\frac{P\\cdot S}{Q\\cdot R}$. Komeni da garatu aurretik faktorizatzea, faktore komunak ezabatzeko: $\\frac{x^{2}-1}{x}\\cdot\\frac{x^{2}}{x+1}=\\frac{(x+1)(x-1)x^{2}}{x(x+1)}=x(x-1)$. $\\frac{x+3}{x}\\mathbin{:}\\frac{x^{2}-9}{x^{2}}=\\frac{(x+3)x^{2}}{x(x+3)(x-3)}=\\frac{x}{x-3}$. Zatiki bat polinomio batez biderkatzean, polinomioak zenbakitzailea biderkatzen du: $\\frac{3}{x+2}\\cdot(x^{2}-4)=3(x-2)$.',
            'Para multiplicar, numeradores entre sí y denominadores entre sí: $\\frac{P}{Q}\\cdot\\frac{R}{S}=\\frac{P\\cdot R}{Q\\cdot S}$. Para dividir, se da la vuelta a la segunda y se multiplica: $\\frac{P}{Q}\\mathbin{:}\\frac{R}{S}=\\frac{P\\cdot S}{Q\\cdot R}$. Conviene factorizar antes de desarrollar, para eliminar factores comunes: $\\frac{x^{2}-1}{x}\\cdot\\frac{x^{2}}{x+1}=\\frac{(x+1)(x-1)x^{2}}{x(x+1)}=x(x-1)$. $\\frac{x+3}{x}\\mathbin{:}\\frac{x^{2}-9}{x^{2}}=\\frac{(x+3)x^{2}}{x(x+3)(x-3)}=\\frac{x}{x-3}$. Al multiplicar una fracción por un polinomio, este multiplica al numerador: $\\frac{3}{x+2}\\cdot(x^{2}-4)=3(x-2)$.',
            'للضرب نضرب البسوط معًا والمقامات معًا: $\\frac{P}{Q}\\cdot\\frac{R}{S}=\\frac{P\\cdot R}{Q\\cdot S}$. وللقسمة نقلب الثاني ونضرب: $\\frac{P}{Q}\\mathbin{:}\\frac{R}{S}=\\frac{P\\cdot S}{Q\\cdot R}$. ومن الأفضل التحليل قبل النشر لحذف العوامل المشتركة: $\\frac{x^{2}-1}{x}\\cdot\\frac{x^{2}}{x+1}=\\frac{(x+1)(x-1)x^{2}}{x(x+1)}=x(x-1)$. $\\frac{x+3}{x}\\mathbin{:}\\frac{x^{2}-9}{x^{2}}=\\frac{(x+3)x^{2}}{x(x+3)(x-3)}=\\frac{x}{x-3}$. وعند ضرب كسر في حدودية تضرب الحدوديةُ البسطَ: $\\frac{3}{x+2}\\cdot(x^{2}-4)=3(x-2)$.', 'To multiply, multiply the numerators together and the denominators together: $\\frac{P}{Q}\\cdot\\frac{R}{S}=\\frac{P\\cdot R}{Q\\cdot S}$. To divide, flip the second fraction and multiply: $\\frac{P}{Q}\\mathbin{:}\\frac{R}{S}=\\frac{P\\cdot S}{Q\\cdot R}$. It is best to factorise before expanding, so that you can cancel common factors: $\\frac{x^{2}-1}{x}\\cdot\\frac{x^{2}}{x+1}=\\frac{(x+1)(x-1)x^{2}}{x(x+1)}=x(x-1)$. $\\frac{x+3}{x}\\mathbin{:}\\frac{x^{2}-9}{x^{2}}=\\frac{(x+3)x^{2}}{x(x+3)(x-3)}=\\frac{x}{x-3}$. When you multiply a fraction by a polynomial, the polynomial multiplies the numerator: $\\frac{3}{x+2}\\cdot(x^{2}-4)=3(x-2)$.'
        ),
        problem: say('Kalkulatu eta sinplifikatu $\\frac{2x+4}{x-3}\\mathbin{:}\\frac{x^{2}-4}{x^{2}-9}$.', 'Calcula y simplifica $\\frac{2x+4}{x-3}\\mathbin{:}\\frac{x^{2}-4}{x^{2}-9}$.', 'احسب وبسّط $\\frac{2x+4}{x-3}\\mathbin{:}\\frac{x^{2}-4}{x^{2}-9}$.', 'Calculate and simplify $\\frac{2x+4}{x-3}\\mathbin{:}\\frac{x^{2}-4}{x^{2}-9}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Buelta eman eta faktorizatu.', 'Da la vuelta y factoriza.', 'اقلب وحلّل.', 'Flip the second fraction and factorise.'), math: same('$\\frac{2(x+2)(x+3)(x-3)}{(x-3)(x+2)(x-2)}$') },
            { text: say('Ezabatu faktore komunak.', 'Elimina los factores comunes.', 'احذف العوامل المشتركة.', 'Cancel the common factors.'), math: same('$\\frac{2(x+3)}{x-2}$') }
        ],
        example: same('$\\frac{x}{2}\\cdot\\frac{4}{x^{2}}=\\frac{2}{x}$'),
        takeaway: say('Biderkatu: goikoak eta behekoak. Zatitu: bigarrenari buelta. Lehenik faktorizatu.', 'Multiplicar: arriba por arriba y abajo por abajo. Dividir: la vuelta a la segunda. Primero factoriza.', 'الضرب: بسط في بسط ومقام في مقام. القسمة: اقلب الثاني. حلّل أولًا.', 'Multiply: top by top and bottom by bottom. Divide: flip the second one. Factorise first.'),
        figure: (language) => <FractionProductFigure language={language} />
    },
    {
        id: 'combined',
        stage: 'operate',
        title: say('Eragiketa konbinatuak eta problemak', 'Operaciones combinadas y problemas', 'العمليات المركّبة والمسائل', 'Combined operations and problems'),
        goal: say('Zatiki aljebraikoekin eragiketa konbinatuak egitea eta problemak zatiki aljebraikoekin adieraztea.', 'Hacer operaciones combinadas con fracciones algebraicas y expresar problemas con ellas.', 'إجراء عمليات مركّبة على الكسور الجبرية والتعبير بها عن المسائل.', 'Do combined operations with algebraic fractions, and express problems using them.'),
        explanation: say(
            'Eragiketen ordena zenbakiekin bezalakoa da: lehenik parentesiak, gero biderketak eta zatiketak, eta azkenik batuketak eta kenketak. $\\left(1+\\frac{1}{x}\\right)\\mathbin{:}\\frac{x+1}{x^{2}}=\\frac{x+1}{x}\\cdot\\frac{x^{2}}{x+1}=x$. Problema askotan zatikiak agertzen dira: txorrota batek depositua x minututan betetzen badu, minutu batean $\\frac{1}{x}$ betetzen du; beste batek 3 minutu gutxiago behar baditu, biek batera $\\frac{1}{x}+\\frac{1}{x-3}=\\frac{2x-3}{x(x-3)}$ betetzen dute minutuko. x = 6 denean, $\\frac{9}{18}=\\frac{1}{2}$: 2 minututan betetzen dute. Abiadurekin ere bai: 60 km v abiaduran, $\\frac{60}{v}$ ordu.',
            'El orden de las operaciones es el de los números: primero los paréntesis, luego productos y cocientes, y por último sumas y restas. $\\left(1+\\frac{1}{x}\\right)\\mathbin{:}\\frac{x+1}{x^{2}}=\\frac{x+1}{x}\\cdot\\frac{x^{2}}{x+1}=x$. En muchos problemas aparecen fracciones: si un grifo llena un depósito en x minutos, en un minuto llena $\\frac{1}{x}$; si otro tarda 3 minutos menos, entre los dos llenan $\\frac{1}{x}+\\frac{1}{x-3}=\\frac{2x-3}{x(x-3)}$ por minuto. Para x = 6, $\\frac{9}{18}=\\frac{1}{2}$: lo llenan en 2 minutos. También con velocidades: 60 km a velocidad v son $\\frac{60}{v}$ horas.',
            'ترتيب العمليات كما في الأعداد: الأقواس أولًا ثم الضرب والقسمة ثم الجمع والطرح. $\\left(1+\\frac{1}{x}\\right)\\mathbin{:}\\frac{x+1}{x^{2}}=\\frac{x+1}{x}\\cdot\\frac{x^{2}}{x+1}=x$. وفي مسائل كثيرة تظهر الكسور: إذا ملأ صنبور خزانًا في x دقيقة فإنه يملأ في دقيقة $\\frac{1}{x}$؛ وإذا احتاج صنبور آخر إلى 3 دقائق أقل فهما معًا يملآن $\\frac{1}{x}+\\frac{1}{x-3}=\\frac{2x-3}{x(x-3)}$ في الدقيقة. وعندما x = 6 يكون $\\frac{9}{18}=\\frac{1}{2}$: يملآنه في دقيقتين. وكذلك مع السرعات: 60 كم بسرعة v تستغرق $\\frac{60}{v}$ ساعة.', 'The order of operations is the same as for numbers: brackets first, then products and quotients, and last of all sums and differences. $\\left(1+\\frac{1}{x}\\right)\\mathbin{:}\\frac{x+1}{x^{2}}=\\frac{x+1}{x}\\cdot\\frac{x^{2}}{x+1}=x$. Many problems involve fractions: if one tap fills a tank in x minutes, in one minute it fills $\\frac{1}{x}$; if the other takes 3 minutes less, the two together fill $\\frac{1}{x}+\\frac{1}{x-3}=\\frac{2x-3}{x(x-3)}$ per minute. For x = 6, $\\frac{9}{18}=\\frac{1}{2}$: they fill it in 2 minutes. The same applies to speeds: 60 km at speed v takes $\\frac{60}{v}$ hours.'
        ),
        problem: say('Kalkulatu $\\left(\\frac{x}{x-1}-1\\right)\\cdot(x^{2}-1)$.', 'Calcula $\\left(\\frac{x}{x-1}-1\\right)\\cdot(x^{2}-1)$.', 'احسب $\\left(\\frac{x}{x-1}-1\\right)\\cdot(x^{2}-1)$.', 'Calculate $\\left(\\frac{x}{x-1}-1\\right)\\cdot(x^{2}-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Parentesia.', 'El paréntesis.', 'القوس.', 'The brackets.'), math: same('$\\frac{x-(x-1)}{x-1}=\\frac{1}{x-1}$') },
            { text: say('Biderkatu eta sinplifikatu.', 'Multiplica y simplifica.', 'اضرب وبسّط.', 'Multiply and simplify.'), math: same('$\\frac{(x+1)(x-1)}{x-1}=x+1$') }
        ],
        example: same('$\\frac{1}{x}+\\frac{1}{x-3}$'),
        takeaway: say('Ordena: parentesiak, biderketak eta zatiketak, batuketak.', 'Orden: paréntesis, productos y cocientes, sumas.', 'الترتيب: الأقواس، الضرب والقسمة، الجمع.', 'Order: brackets, products and quotients, then sums.'),
        figure: (language) => <TapsFigure language={language} />
    }
]

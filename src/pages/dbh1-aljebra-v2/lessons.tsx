import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BalanceFigure, DistributiveFigure, MachineFigure, MonomialFigure, PerimeterFigure, TilesFigure } from './figures'
import { algebraIntroLessonChecks, type AlgebraIntroTopicId } from './lessonChecks'
import { algebraIntroLessonTexts } from './lessonTexts'

/* ==========================================================================
   Aljebra · 1. DBH — stages and lessons
   Sequence follows the class textbook (Santillana 1.º ESO, unit 6,
   curricular adaptation): usual, numerical and algebraic language,
   algebraic expressions and their numerical value, monomials (coefficient,
   literal part, degree, like terms), polynomials, operations with
   monomials, equality, identity and equation, solving by trial and by
   transposing, and problems. Anaya unit 10 adds the balance and the
   combined techniques. Multiplication is written with ·, division with :.
   ========================================================================== */

export type AlgebraIntroStageId = 'language' | 'monomials' | 'operations' | 'equations' | 'problems'

export const algebraIntroStages: UnitStage[] = [
    { id: 'language', tone: 'blue', title: { eu: 'Hizkuntza aljebraikoa', es: 'Lenguaje algebraico', en: 'Algebraic language', ar: 'اللغة الجبرية' } },
    { id: 'monomials', tone: 'violet', title: { eu: 'Monomioak eta polinomioak', es: 'Monomios y polinomios', en: 'Monomials and polynomials', ar: 'وحيدات الحد والحدوديات' } },
    { id: 'operations', tone: 'mustard', title: { eu: 'Monomioekin eragiketak', es: 'Operaciones con monomios', en: 'Operations with monomials', ar: 'العمليات على وحيدات الحد' } },
    { id: 'equations', tone: 'coral', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' } },
    { id: 'problems', tone: 'green', title: { eu: 'Buruketak ekuazioekin', es: 'Problemas con ecuaciones', en: 'Problems with equations', ar: 'مسائل بالمعادلات' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'letters',
        stage: 'language',
        title: { eu: 'Zenbakien ordez letrak', es: 'Letras en lugar de números', en: 'Letters instead of numbers', ar: 'حروف بدل الأعداد' },
        goal: {
            eu: 'Ohiko hizkuntza, zenbakizko hizkuntza eta hizkuntza aljebraikoa bereiztea.',
            es: 'Distinguir el lenguaje usual, el numérico y el algebraico.',
            en: 'Distinguish everyday, numerical and algebraic language.',
            ar: 'التمييز بين اللغة المعتادة واللغة العددية واللغة الجبرية.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Ohikoa → zenbakizkoa', es: 'Usual → numérico', en: 'Everyday → numerical', ar: 'المعتادة ← العددية' }, text: { eu: '«Hamabiren erdia sei da».', es: '«La mitad de doce es seis».', en: '“Half of twelve is six”.', ar: '«نصف اثني عشر ستة».' }, math: '$12\\mathbin{:}2=6$' },
            { title: { eu: 'Ohikoa → aljebraikoa', es: 'Usual → algebraico', en: 'Everyday → algebraic', ar: 'المعتادة ← الجبرية' }, text: { eu: '«Zenbaki baten hirukoitza»: zenbakia ez dakigunez, x deitzen diogu.', es: '«El triple de un número»: como no sabemos el número, lo llamamos x.', en: '“Three times a number”: as we don\'t know the number, we call it x.', ar: '«ثلاثة أضعاف عدد»: لأننا لا نعرف العدد نسمّيه x.' }, math: '$3\\cdot x=3x$' },
            { title: { eu: 'Biderketa-ikurra', es: 'El signo de multiplicar', en: 'The multiplication sign', ar: 'علامة الضرب' }, text: { eu: 'Zenbaki baten eta letra baten artean ez da idazten: $3\\cdot x$ = $3x$.', es: 'Entre un número y una letra no se escribe: $3\\cdot x$ = $3x$.', en: 'The multiplication sign is not written between a number and a letter: $3\\cdot x$ = $3x$.', ar: 'لا تُكتب بين عدد وحرف: $3\\cdot x$ = $3x$.' } }
        ],
        takeaway: {
            eu: 'Letra batek edozein zenbaki adieraz dezake.',
            es: 'Una letra puede representar cualquier número.',
            en: 'A letter can stand for any number.',
            ar: 'يمكن للحرف أن يمثّل أي عدد.'
        }
    },
    {
        id: 'translate',
        stage: 'language',
        title: { eu: 'Adierazpen aljebraikoak', es: 'Expresiones algebraicas', en: 'Algebraic expressions', ar: 'العبارات الجبرية' },
        goal: {
            eu: 'Esaldiak eta formulak adierazpen aljebraiko gisa idaztea.',
            es: 'Escribir frases y fórmulas como expresiones algebraicas.',
            en: 'Write sentences and formulas as algebraic expressions.',
            ar: 'كتابة الجمل والصيغ عبارات جبرية.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Bikoitza, hirukoitza', es: 'Doble, triple', en: 'Double, triple', ar: 'الضعف، ثلاثة الأضعاف' }, text: { eu: 'Zenbaki baten bikoitza, hirukoitza.', es: 'El doble, el triple de un número.', en: 'Twice and three times a number.', ar: 'ضعف عدد، ثلاثة أضعافه.' }, math: '$2x\\qquad 3x$' },
            { title: { eu: 'Erdia, karratua', es: 'Mitad, cuadrado', en: 'Half, square', ar: 'النصف، المربع' }, text: { eu: 'Zenbaki baten erdia eta karratua.', es: 'La mitad y el cuadrado de un número.', en: 'Half and the square of a number.', ar: 'نصف عدد ومربعه.' }, math: '$\\frac{x}{2}\\qquad x^{2}$' },
            { title: { eu: 'Gehitu, gutxitu', es: 'Aumentado, disminuido', en: 'Increased, decreased', ar: 'زائد، ناقص' }, text: { eu: 'Zenbaki bat gehi 5, ken 3.', es: 'Un número aumentado en 5, disminuido en 3.', en: 'A number increased by 5, decreased by 3.', ar: 'عدد زائد 5، ناقص 3.' }, math: '$x+5\\qquad x-3$' },
            { title: { eu: 'Adina', es: 'La edad', en: 'Age', ar: 'العمر' }, text: { eu: 'Zure adina x bada: duela 4 urte eta 4 urte barru.', es: 'Si tu edad es x: hace 4 años y dentro de 4 años.', en: 'If your age is x: 4 years ago and in 4 years\' time.', ar: 'إذا كان عمرك x: قبل 4 سنوات وبعد 4 سنوات.' }, math: '$x-4\\qquad x+4$' }
        ],
        takeaway: {
            eu: 'Irakurri poliki: «bikoitza gehi 3» ($2x+3$) ez da «batuketaren bikoitza» ($2(x+3)$).',
            es: 'Lee despacio: «el doble más 3» ($2x+3$) no es «el doble de la suma» ($2(x+3)$).',
            en: 'Read carefully: “twice plus 3” ($2x+3$) is not “twice the sum” ($2(x+3)$).',
            ar: 'اقرأ ببطء: «الضعف زائد 3» ($2x+3$) ليس «ضعف المجموع» ($2(x+3)$).'
        },
        figure: (language) => <PerimeterFigure language={language} />
    },
    {
        id: 'value',
        stage: 'language',
        title: { eu: 'Zenbakizko balioa', es: 'Valor numérico', en: 'Numerical value', ar: 'القيمة العددية' },
        goal: {
            eu: 'Adierazpen aljebraiko baten zenbakizko balioa kalkulatzea.',
            es: 'Calcular el valor numérico de una expresión algebraica.',
            en: 'Work out the numerical value of an algebraic expression.',
            ar: 'حساب القيمة العددية لعبارة جبرية.'
        },
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'hierarchy', title: { eu: 'Eragiketen hierarkia', es: 'La jerarquía de las operaciones', en: 'Order of operations', ar: 'أولوية العمليات' } }],
        problem: { eu: 'Kalkulatu $3x-5$ adierazpenaren balioa $x=2$ denean.', es: 'Halla el valor de $3x-5$ para $x=2$.', en: 'Work out the value of $3x-5$ when $x=2$.', ar: 'احسب قيمة $3x-5$ عندما $x=2$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Ordeztu x 2 zenbakiaz.', es: 'Sustituye la x por 2.', en: 'Substitute 2 for x.', ar: 'عوّض x بـ 2.' }, math: '$3\\cdot 2-5$' },
            { text: { eu: 'Lehenik biderketa.', es: 'Primero la multiplicación.', en: 'First the multiplication.', ar: 'الضرب أولًا.' }, math: '$6-5$' },
            { text: { eu: 'Gero kenketa.', es: 'Después la resta.', en: 'Then the subtraction.', ar: 'ثم الطرح.' }, math: '$3\\cdot 2-5=1$' }
        ],
        takeaway: {
            eu: 'Ordeztu, parentesiak jarri behar badira jarri, eta kalkulatu ordenan.',
            es: 'Sustituye, pon paréntesis si hacen falta y calcula en orden.',
            en: 'Substitute, add brackets if needed and calculate in order.',
            ar: 'عوّض، وضع أقواسًا عند الحاجة، واحسب بالترتيب.'
        },
        figure: (language) => <MachineFigure language={language} />
    },
    {
        id: 'monomial',
        stage: 'monomials',
        title: { eu: 'Monomioak', es: 'Monomios', en: 'Monomials', ar: 'وحيدات الحد' },
        goal: {
            eu: 'Monomio baten koefizientea, zati literala eta maila identifikatzea.',
            es: 'Identificar el coeficiente, la parte literal y el grado de un monomio.',
            en: 'Identify the coefficient, the literal part and the degree of a monomial.',
            ar: 'تحديد معامل وحيد الحد وجزئه الحرفي ودرجته.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Koefizientea', es: 'Coeficiente', en: 'Coefficient', ar: 'المعامل' }, text: { eu: 'Zenbakia, zeinuarekin: $-5ab$-n, −5.', es: 'El número, con su signo: en $-5ab$, −5.', en: 'The number, with its sign: in $-5ab$, −5.', ar: 'العدد بإشارته: في $-5ab$ هو −5.' } },
            { title: { eu: 'Zati literala', es: 'Parte literal', en: 'Literal part', ar: 'الجزء الحرفي' }, text: { eu: 'Letrak eta haien berretzaileak: $-5ab$-n, $ab$.', es: 'Las letras y sus exponentes: en $-5ab$, $ab$.', en: 'The letters and their exponents: in $-5ab$, $ab$.', ar: 'الحروف وأسسها: في $-5ab$ هو $ab$.' } },
            { title: { eu: 'Maila', es: 'Grado', en: 'Degree', ar: 'الدرجة' }, text: { eu: 'Berretzaileen batura: $-4x^{2}y$-ren maila 3 da.', es: 'Suma de los exponentes: el grado de $-4x^{2}y$ es 3.', en: 'Sum of the exponents: the degree of $-4x^{2}y$ is 3.', ar: 'مجموع الأسس: درجة $-4x^{2}y$ هي 3.' }, math: '$2+1=3$' }
        ],
        takeaway: {
            eu: 'Monomioa = koefizientea · zati literala.',
            es: 'Monomio = coeficiente · parte literal.',
            en: 'Monomial = coefficient · literal part.',
            ar: 'وحيد الحد = المعامل · الجزء الحرفي.'
        },
        figure: (language) => <MonomialFigure language={language} />
    },
    {
        id: 'like-terms',
        stage: 'monomials',
        title: { eu: 'Monomio antzekoak', es: 'Monomios semejantes', en: 'Like monomials', ar: 'وحيدات الحد المتشابهة' },
        goal: {
            eu: 'Bi monomio antzekoak diren erabakitzea.',
            es: 'Decidir si dos monomios son semejantes.',
            en: 'Decide whether two monomials are like monomials.',
            ar: 'تحديد ما إذا كان وحيدا حد متشابهين.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Antzekoak', es: 'Semejantes', en: 'Like terms', ar: 'متشابهة' }, text: { eu: 'Zati literal bera.', es: 'Misma parte literal.', en: 'Same literal part.', ar: 'الجزء الحرفي نفسه.' }, math: '$2x,\\ 3x,\\ -x$' },
            { title: { eu: 'Ez antzekoak', es: 'No semejantes', en: 'Not like terms', ar: 'غير متشابهة' }, text: { eu: 'Letra edo berretzaile desberdinak.', es: 'Letras o exponentes distintos.', en: 'Different letters or exponents.', ar: 'حروف أو أسس مختلفة.' }, math: '$x^{2}y,\\ xy^{2}$' }
        ],
        takeaway: {
            eu: 'Begiratu letrei eta berretzaileei; koefizientea ez da kontuan hartzen.',
            es: 'Mira las letras y los exponentes; el coeficiente no cuenta.',
            en: 'Look at the letters and the exponents; the coefficient does not count.',
            ar: 'انظر إلى الحروف والأسس؛ المعامل لا يهم.'
        }
    },
    {
        id: 'polynomial',
        stage: 'monomials',
        title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'الحدوديات' },
        goal: {
            eu: 'Polinomio baten gaiak, gai askea eta maila identifikatzea.',
            es: 'Identificar los términos, el término independiente y el grado de un polinomio.',
            en: 'Identify the terms, the constant term and the degree of a polynomial.',
            ar: 'تحديد حدود الحدودية وحدّها الثابت ودرجتها.'
        },
        problem: { eu: 'Aztertu $3x^{3}+5x-4$ polinomioa.', es: 'Estudia el polinomio $3x^{3}+5x-4$.', en: 'Study the polynomial $3x^{3}+5x-4$.', ar: 'ادرس الحدودية $3x^{3}+5x-4$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Gaiak: batugai bakoitza, bere zeinuarekin.', es: 'Términos: cada sumando, con su signo.', en: 'Terms: each part of the sum, with its sign.', ar: 'الحدود: كل حد بإشارته.' }, math: '$3x^{3},\\ 5x,\\ -4$' },
            { text: { eu: 'Gai askea: letrarik gabea.', es: 'Término independiente: el que no tiene letras.', en: 'Constant term: the one with no letters.', ar: 'الحد الثابت: الخالي من الحروف.' }, math: '$-4$' },
            { text: { eu: 'Maila: gai bakoitzaren mailatik handiena.', es: 'Grado: el mayor de los grados de sus términos.', en: 'Degree: the highest of the degrees of its terms.', ar: 'الدرجة: أكبر درجات حدودها.' }, math: '$3$' }
        ],
        takeaway: {
            eu: 'Polinomioaren maila = gai handienaren maila.',
            es: 'Grado del polinomio = grado del término mayor.',
            en: 'Degree of the polynomial = degree of the highest-degree term.',
            ar: 'درجة الحدودية = درجة الحد الأكبر.'
        }
    },
    {
        id: 'add-monomials',
        stage: 'operations',
        title: { eu: 'Monomioen batuketa eta kenketa', es: 'Suma y resta de monomios', en: 'Adding and subtracting monomials', ar: 'جمع وحيدات الحد وطرحها' },
        goal: {
            eu: 'Monomio antzekoak batzea eta kentzea eta adierazpenak laburtzea.',
            es: 'Sumar y restar monomios semejantes y reducir expresiones.',
            en: 'Add and subtract like terms and simplify expressions.',
            ar: 'جمع وحيدات الحد المتشابهة وطرحها وتبسيط العبارات.'
        },
        problem: { eu: 'Laburtu $x^{2}+4x+5x^{2}+x$.', es: 'Reduce $x^{2}+4x+5x^{2}+x$.', en: 'Simplify $x^{2}+4x+5x^{2}+x$.', ar: 'بسّط $x^{2}+4x+5x^{2}+x$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Bildu gai antzekoak.', es: 'Agrupa los términos semejantes.', en: 'Group the like terms.', ar: 'اجمع الحدود المتشابهة.' }, math: '$(x^{2}+5x^{2})+(4x+x)$' },
            { text: { eu: 'Batu koefizienteak: 1 + 5 eta 4 + 1.', es: 'Suma los coeficientes: 1 + 5 y 4 + 1.', en: 'Add the coefficients: 1 + 5 and 4 + 1.', ar: 'اجمع المعاملات: 1 + 5 و4 + 1.' }, math: '$6x^{2}+5x$' },
            { title: { eu: 'Kontuz', es: 'Cuidado', en: 'Be careful', ar: 'انتبه' }, text: { eu: '$6x^{2}$ eta $5x$ ez dira antzekoak: ezin dira gehiago batu.', es: '$6x^{2}$ y $5x$ no son semejantes: no se pueden sumar más.', en: '$6x^{2}$ and $5x$ are not like terms: they cannot be added any further.', ar: '$6x^{2}$ و$5x$ غير متشابهين: لا يمكن جمعهما أكثر.' } }
        ],
        takeaway: {
            eu: 'Batu koefizienteak; zati literala ez da aldatzen.',
            es: 'Suma los coeficientes; la parte literal no cambia.',
            en: 'Add the coefficients; the literal part does not change.',
            ar: 'اجمع المعاملات؛ الجزء الحرفي لا يتغيّر.'
        },
        figure: (language) => <TilesFigure language={language} />
    },
    {
        id: 'multiply-monomials',
        stage: 'operations',
        title: { eu: 'Monomioen biderketa eta zatiketa', es: 'Multiplicación y división de monomios', en: 'Multiplication and division of monomials', ar: 'ضرب وحيدات الحد وقسمتها' },
        goal: {
            eu: 'Monomioak biderkatzea eta zatitzea.',
            es: 'Multiplicar y dividir monomios.',
            en: 'Multiply and divide monomials.',
            ar: 'ضرب وحيدات الحد وقسمتها.'
        },
        needs: [
            { unit: 'dbh1/zenbaki-naturalak', topic: 'powers', title: { eu: 'Berreturak', es: 'Las potencias', en: 'Powers', ar: 'القوى' } },
            { unit: 'dbh1/numeros-enteros', topic: 'multiply', title: { eu: 'Zenbaki osoen biderketa', es: 'Multiplicación de enteros', en: 'Multiplying integers', ar: 'ضرب الأعداد الصحيحة' } }
        ],
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Biderketa', es: 'Multiplicación', en: 'Multiplication', ar: 'الضرب' }, text: { eu: 'Koefizienteak biderkatu eta berretzaileak batu.', es: 'Multiplica los coeficientes y suma los exponentes.', en: 'Multiply the coefficients and add the exponents.', ar: 'اضرب المعاملات واجمع الأسس.' }, math: '$2x\\cdot 3x^{2}=6x^{3}$' },
            { title: { eu: 'Zeinuak', es: 'Signos', en: 'Signs', ar: 'الإشارات' }, text: { eu: 'Zeinuen araua: $-\\cdot +=-$.', es: 'Regla de los signos: $-\\cdot +=-$.', en: 'Rule of signs: $-\\cdot +=-$.', ar: 'قاعدة الإشارات: $-\\cdot +=-$.' }, math: '$\\begin{gathered}-4x^{2}\\cdot 5x^{3}\\\\=-20x^{5}\\end{gathered}$' },
            { title: { eu: 'Zatiketa', es: 'División', en: 'Division', ar: 'القسمة' }, text: { eu: 'Koefizienteak zatitu eta berretzaileak kendu.', es: 'Divide los coeficientes y resta los exponentes.', en: 'Divide the coefficients and subtract the exponents.', ar: 'اقسم المعاملات واطرح الأسس.' }, math: '$8x^{2}\\mathbin{:}2x=4x$' }
        ],
        takeaway: {
            eu: 'Biderkatzean berretzaileak batu; zatitzean, kendu.',
            es: 'Al multiplicar, se suman los exponentes; al dividir, se restan.',
            en: 'When multiplying, add the exponents; when dividing, subtract them.',
            ar: 'عند الضرب نجمع الأسس، وعند القسمة نطرحها.'
        }
    },
    {
        id: 'brackets',
        stage: 'operations',
        title: { eu: 'Parentesiak kentzea', es: 'Quitar paréntesis', en: 'Removing brackets', ar: 'حذف الأقواس' },
        goal: {
            eu: 'Banatze-propietatea erabiliz parentesiak kentzea eta laburtzea.',
            es: 'Quitar paréntesis con la propiedad distributiva y reducir.',
            en: 'Remove brackets using the distributive property and simplify.',
            ar: 'حذف الأقواس بخاصية التوزيع ثم التبسيط.'
        },
        needs: [
            { unit: 'dbh1/zenbaki-naturalak', topic: 'multiply', title: { eu: 'Biderketa eta haren propietateak', es: 'La multiplicación y sus propiedades', en: 'Multiplication and its properties', ar: 'الضرب وخصائصه' } },
            { unit: 'dbh1/numeros-enteros', topic: 'brackets', title: { eu: 'Parentesiak kentzea', es: 'Quitar paréntesis', en: 'Removing brackets', ar: 'حذف الأقواس' } }
        ],
        problem: { eu: 'Kendu parentesiak eta laburtu: $3(x^{2}+x)+5x$.', es: 'Quita los paréntesis y reduce: $3(x^{2}+x)+5x$.', en: 'Remove the brackets and simplify: $3(x^{2}+x)+5x$.', ar: 'احذف الأقواس وبسّط: $3(x^{2}+x)+5x$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu 3 barruko gai bakoitzaz.', es: 'Multiplica el 3 por cada término de dentro.', en: 'Multiply the 3 by each term inside.', ar: 'اضرب 3 في كل حد داخل القوس.' }, math: '$3x^{2}+3x+5x$' },
            { text: { eu: 'Laburtu gai antzekoak.', es: 'Reduce los términos semejantes.', en: 'Simplify the like terms.', ar: 'بسّط الحدود المتشابهة.' }, math: '$3x^{2}+8x$' }
        ],
        takeaway: {
            eu: 'Aurreko zenbakia gai guztietara iristen da, ez lehenengora bakarrik.',
            es: 'El número de delante llega a todos los términos, no solo al primero.',
            en: 'The number in front applies to all the terms, not just the first one.',
            ar: 'العدد الذي في الأمام يصل إلى كل الحدود لا إلى الأول فقط.'
        },
        figure: (language) => <DistributiveFigure language={language} />
    },
    {
        id: 'equation',
        stage: 'equations',
        title: { eu: 'Berdintzak, identitateak eta ekuazioak', es: 'Igualdades, identidades y ecuaciones', en: 'Equalities, identities and equations', ar: 'المساويات والمتطابقات والمعادلات' },
        goal: {
            eu: 'Ekuazio bat identitatetik bereiztea eta haren atalak ezagutzea.',
            es: 'Distinguir una ecuación de una identidad y conocer sus partes.',
            en: 'Distinguish an equation from an identity and know its parts.',
            ar: 'تمييز المعادلة من المتطابقة ومعرفة أجزائها.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Atalak', es: 'Miembros', en: 'Sides', ar: 'الطرفان' }, text: { eu: '= ikurraren ezkerrean lehen atala dago, eta eskuinean bigarrena.', es: 'A la izquierda del = está el primer miembro y a la derecha, el segundo.', en: 'On the left of the = is the first side, and on the right, the second.', ar: 'على يسار = الطرف الأول وعلى يمينه الطرف الثاني.' }, math: '$2x+1=7$' },
            { title: { eu: 'Gaiak', es: 'Términos', en: 'Terms', ar: 'الحدود' }, text: { eu: 'Atal bakoitzeko batugaiak: $2x$, $1$ eta $7$.', es: 'Los sumandos de cada miembro: $2x$, $1$ y $7$.', en: 'The terms on each side: $2x$, $1$ and $7$.', ar: 'حدود كل طرف: $2x$ و$1$ و$7$.' } },
            { title: { eu: 'Egiaztatu', es: 'Comprobar', en: 'Check', ar: 'التحقق' }, text: { eu: 'Ebazpena ordezkatuta, bi atalek balio bera ematen dute.', es: 'Al sustituir la solución, los dos miembros dan lo mismo.', en: 'When you substitute the solution, both sides give the same result.', ar: 'عند تعويض الحل يعطي الطرفان القيمة نفسها.' }, math: '$\\begin{gathered}x=3\\\\2\\cdot 3+1=7\\end{gathered}$' }
        ],
        takeaway: {
            eu: 'Identitatea: beti egia. Ekuazioa: balio batzuetarako bakarrik.',
            es: 'Identidad: siempre verdadera. Ecuación: solo para algunos valores.',
            en: 'Identity: always true. Equation: only for some values.',
            ar: 'المتطابقة: صحيحة دائمًا. المعادلة: لبعض القيم فقط.'
        }
    },
    {
        id: 'trial',
        stage: 'equations',
        title: { eu: 'Ekuazioak probatuz ebaztea', es: 'Resolver ecuaciones por tanteo', en: 'Solving equations by trial and error', ar: 'حل المعادلات بالتجربة' },
        goal: {
            eu: 'Ekuazio errazak buruz eta probatuz ebaztea.',
            es: 'Resolver ecuaciones sencillas mentalmente y por tanteo.',
            en: 'Solve simple equations in your head and by trial and error.',
            ar: 'حل معادلات بسيطة ذهنيًا وبالتجربة.'
        },
        problem: { eu: 'Ebatzi probatuz: $2x+3=11$.', es: 'Resuelve por tanteo: $2x+3=11$.', en: 'Solve by trial and error: $2x+3=11$.', ar: 'حلّ بالتجربة: $2x+3=11$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Probatu $x=3$: gutxiegi.', es: 'Prueba $x=3$: se queda corto.', en: 'Try $x=3$: it falls short.', ar: 'جرّب $x=3$: أقل من اللازم.' }, math: '$2\\cdot 3+3=9$' },
            { text: { eu: 'Probatu $x=5$: gehiegi.', es: 'Prueba $x=5$: se pasa.', en: 'Try $x=5$: it goes over.', ar: 'جرّب $x=5$: أكثر من اللازم.' }, math: '$2\\cdot 5+3=13$' },
            { text: { eu: 'Probatu $x=4$: zehatz-mehatz.', es: 'Prueba $x=4$: exacto.', en: 'Try $x=4$: exactly right.', ar: 'جرّب $x=4$: تمامًا.' }, math: '$2\\cdot 4+3=11$' }
        ],
        takeaway: {
            eu: 'Probatu, alderatu eta zuzendu: handiegia ala txikiegia?',
            es: 'Prueba, compara y corrige: ¿se pasa o se queda corto?',
            en: 'Try, compare and correct: does it go over or fall short?',
            ar: 'جرّب وقارن وصحّح: هل زاد أم نقص؟'
        }
    },
    {
        id: 'transpose',
        stage: 'equations',
        title: { eu: 'Gaiak atalez aldatzea', es: 'Transposición de términos', en: 'Moving terms between sides', ar: 'نقل الحدود' },
        goal: {
            eu: 'Ekuazio errazak ebaztea gaiak atal batetik bestera pasatuz.',
            es: 'Resolver ecuaciones sencillas pasando términos de un miembro a otro.',
            en: 'Solve simple equations by moving terms from one side to the other.',
            ar: 'حل معادلات بسيطة بنقل الحدود من طرف إلى آخر.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Batzen → kentzen', es: 'Sumando → restando', en: 'Adding → subtracting', ar: 'مجموع ← مطروح' }, text: { eu: '+2 bigarren atalera kentzen pasatzen da.', es: 'El +2 pasa al segundo miembro restando.', en: 'The +2 moves to the second side as a subtraction.', ar: 'ينتقل +2 إلى الطرف الثاني مطروحًا.' }, math: '$\\begin{gathered}x+2=8\\\\x=8-2=6\\end{gathered}$' },
            { title: { eu: 'Kentzen → batzen', es: 'Restando → sumando', en: 'Subtracting → adding', ar: 'مطروح ← مجموع' }, text: { eu: '−7 batzen pasatzen da.', es: 'El −7 pasa sumando.', en: 'The −7 moves to the other side as an addition.', ar: 'ينتقل −7 مجموعًا.' }, math: '$\\begin{gathered}x-7=3\\\\x=3+7=10\\end{gathered}$' },
            { title: { eu: 'Biderkatzen → zatitzen', es: 'Multiplicando → dividiendo', en: 'Multiplying → dividing', ar: 'ضارب ← قاسم' }, text: { eu: 'x-ren aurreko 4 zenbakia zatitzen pasatzen da.', es: 'El 4 que multiplica a la x pasa dividiendo.', en: 'The 4 that multiplies the x moves to the other side as a division.', ar: 'ينتقل 4 الذي يضرب x قاسمًا.' }, math: '$\\begin{gathered}4x=20\\\\x=20\\mathbin{:}4=5\\end{gathered}$' },
            { title: { eu: 'Zatitzen → biderkatzen', es: 'Dividiendo → multiplicando', en: 'Dividing → multiplying', ar: 'قاسم ← ضارب' }, text: { eu: 'x zatitzen duen 2 zenbakia biderkatzen pasatzen da.', es: 'El 2 que divide a la x pasa multiplicando.', en: 'The 2 that divides the x moves to the other side as a multiplication.', ar: 'ينتقل 2 الذي يقسم x ضاربًا.' }, math: '$\\begin{gathered}\\frac{x}{2}=6\\\\x=6\\cdot 2=12\\end{gathered}$' }
        ],
        takeaway: {
            eu: 'Atalez aldatzean, gaiak kontrako eragiketa egiten du.',
            es: 'Al cambiar de miembro, el término hace la operación contraria.',
            en: 'When a term changes side, it does the opposite operation.',
            ar: 'عند تغيير الطرف يقوم الحد بالعملية العكسية.'
        },
        figure: (language) => <BalanceFigure language={language} />
    },
    {
        id: 'solve',
        stage: 'equations',
        title: { eu: 'Lehen mailako ekuazioak ebaztea', es: 'Resolver ecuaciones de primer grado', en: 'Solving first-degree equations', ar: 'حل معادلات الدرجة الأولى' },
        goal: {
            eu: 'Bi ataletan x duten ekuazioak eta parentesidun ekuazioak ebaztea.',
            es: 'Resolver ecuaciones con x en los dos miembros y con paréntesis.',
            en: 'Solve equations with x on both sides and with brackets.',
            ar: 'حل معادلات فيها x في الطرفين ومعادلات بأقواس.'
        },
        problem: { eu: 'Ebatzi $4x-7=3-x$.', es: 'Resuelve $4x-7=3-x$.', en: 'Solve $4x-7=3-x$.', ar: 'حلّ $4x-7=3-x$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'x-ak ezkerrera (−x batzen pasatzen da) eta zenbakiak eskuinera (−7 batzen).', es: 'Las x a la izquierda (−x pasa sumando) y los números a la derecha (−7 pasa sumando).', en: 'The x terms on the left (−x moves over as an addition) and the numbers on the right (−7 moves over as an addition).', ar: 'الـ x إلى اليسار (ينتقل −x مجموعًا) والأعداد إلى اليمين (ينتقل −7 مجموعًا).' }, math: '$4x+x=3+7$' },
            { text: { eu: 'Laburtu.', es: 'Reduce.', en: 'Simplify.', ar: 'بسّط.' }, math: '$5x=10$' },
            { text: { eu: 'Askatu x: 5 zenbakia zatitzen pasatzen da.', es: 'Despeja la x: el 5 pasa dividiendo.', en: 'Solve for x: the 5 moves over as a division.', ar: 'اعزل x: ينتقل 5 قاسمًا.' }, math: '$x=10\\mathbin{:}5=2$' },
            { text: { eu: 'Egiaztatu: bi atalek 1 ematen dute.', es: 'Comprueba: los dos miembros dan 1.', en: 'Check: both sides give 1.', ar: 'تحقّق: يعطي الطرفان 1.' }, math: '$4\\cdot 2-7=3-2$' }
        ],
        takeaway: {
            eu: 'Parentesiak → bildu → laburtu → askatu → egiaztatu.',
            es: 'Paréntesis → agrupar → reducir → despejar → comprobar.',
            en: 'Brackets → group → simplify → solve for x → check.',
            ar: 'الأقواس ← التجميع ← التبسيط ← العزل ← التحقق.'
        }
    },
    {
        id: 'problems',
        stage: 'problems',
        title: { eu: 'Buruketak ekuazioekin', es: 'Problemas con ecuaciones', en: 'Problems with equations', ar: 'مسائل بالمعادلات' },
        goal: {
            eu: 'Buruketa bat ekuazio batekin planteatzea eta ebaztea.',
            es: 'Plantear y resolver un problema con una ecuación.',
            en: 'Set up and solve a problem with an equation.',
            ar: 'صياغة مسألة بمعادلة وحلها.'
        },
        problem: { eu: 'Zenbaki baten hirukoitza gehi 5 eta 26 da. Zein da zenbakia?', es: 'El triple de un número más 5 es 26. ¿Qué número es?', en: 'Three times a number plus 5 is 26. What is the number?', ar: 'ثلاثة أضعاف عدد زائد 5 تساوي 26. ما العدد؟' },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'Ezezaguna', es: 'Incógnita', en: 'Unknown', ar: 'المجهول' }, text: { eu: 'x = zenbakia.', es: 'x = el número.', en: 'x = the number.', ar: 'x = العدد.' } },
            { title: { eu: 'Ekuazioa', es: 'Ecuación', en: 'Equation', ar: 'المعادلة' }, text: { eu: 'Hirukoitza gehi 5 berdin 26.', es: 'El triple más 5 es igual a 26.', en: 'Three times it plus 5 equals 26.', ar: 'ثلاثة الأضعاف زائد 5 يساوي 26.' }, math: '$3x+5=26$' },
            { title: { eu: 'Ebatzi', es: 'Resuelve', en: 'Solve', ar: 'حلّ' }, text: { eu: '5 zenbakia kentzen pasatu eta gero 3 zenbakia zatitzen.', es: 'Pasa el 5 restando y después el 3 dividiendo.', en: 'Move the 5 over as a subtraction, then the 3 as a division.', ar: 'انقل 5 مطروحًا ثم 3 قاسمًا.' }, math: '$3x=21\\ \\to\\ x=7$' },
            { title: { eu: 'Egiaztatu eta erantzun', es: 'Comprueba y responde', en: 'Check and answer', ar: 'تحقّق وأجب' }, text: { eu: 'Zenbakia 7 da.', es: 'El número es 7.', en: 'The number is 7.', ar: 'العدد هو 7.' }, math: '$3\\cdot 7+5=26$' }
        ],
        takeaway: {
            eu: 'Ezezaguna → ekuazioa → ebatzi → egiaztatu eta erantzun.',
            es: 'Incógnita → ecuación → resolver → comprobar y responder.',
            en: 'Unknown → equation → solve → check and answer.',
            ar: 'المجهول ← المعادلة ← الحل ← التحقق والجواب.'
        }
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const algebraIntroTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...algebraIntroLessonTexts[topic.id as AlgebraIntroTopicId], ...algebraIntroLessonChecks[topic.id as AlgebraIntroTopicId] }))

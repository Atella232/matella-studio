import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { MachineFigure, MonomialFigure, TilesFigure } from '../dbh1-aljebra-v2/figures'
import { CommonFactorFigure, PatternFigure, PolynomialFigure, ProductAreaFigure, SquareDifferenceFigure, SquareSumFigure, SumDifferenceFigure } from './figures'

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
    { id: 'language', tone: 'blue', title: { eu: 'Hizkuntza aljebraikoa', es: 'Lenguaje algebraico', ar: 'اللغة الجبرية' } },
    { id: 'monomials', tone: 'violet', title: { eu: 'Monomioak', es: 'Monomios', ar: 'وحيدات الحد' } },
    { id: 'polynomials', tone: 'mustard', title: { eu: 'Polinomioak', es: 'Polinomios', ar: 'الحدوديات' } },
    { id: 'products', tone: 'coral', title: { eu: 'Biderkadura nabarmenak', es: 'Productos notables', ar: 'المتطابقات الشهيرة' } },
    { id: 'factor', tone: 'green', title: { eu: 'Faktore komuna eta faktorizazioa', es: 'Factor común y factorización', ar: 'العامل المشترك والتحليل' } }
]

export const algebraTopics: UnitTopic[] = [
    {
        id: 'language',
        stage: 'language',
        title: { eu: 'Hizkuntza aljebraikoa eta segidak', es: 'Lenguaje algebraico y series', ar: 'اللغة الجبرية والمتتاليات' },
        goal: {
            eu: 'Esaldiak adierazpen aljebraiko bihurtzea eta segida baten gai orokorra idaztea.',
            es: 'Traducir enunciados a expresiones algebraicas y escribir el término general de una serie.',
            ar: 'ترجمة العبارات إلى عبارات جبرية وكتابة الحد العام لمتتالية.'
        },
        explanation: {
            eu: 'Hizkuntza aljebraikoak zenbakiak eta letrak erabiltzen ditu: letrak ezagutzen ez dugun edo aldatzen den zenbaki bat adierazten du. Horrela propietateak idatz daitezke ($a\\cdot b=b\\cdot a$), formulak ($A=b\\cdot h$) edo segida baten gai orokorra: n. gaia n-ren menpe idazten da, eta horrela edozein gai kalkula daiteke.',
            es: 'El lenguaje algebraico usa números y letras: una letra representa un número que no conocemos o que cambia. Así se escriben propiedades ($a\\cdot b=b\\cdot a$), fórmulas ($A=b\\cdot h$) o el término general de una serie: el término n-ésimo se escribe en función de n y así se puede calcular cualquier término.',
            ar: 'تستعمل اللغة الجبرية الأعداد والحروف: يمثّل الحرف عددًا لا نعرفه أو يتغيّر. هكذا نكتب الخصائص ($a\\cdot b=b\\cdot a$) والصيغ ($A=b\\cdot h$) أو الحد العام لمتتالية: يُكتب الحد رقم n بدلالة n فنستطيع حساب أي حد.'
        },
        problem: { eu: 'Segida: 1, 4, 7, 10, … Idatzi gai orokorra eta kalkulatu 20. gaia.', es: 'Serie: 1, 4, 7, 10, … Escribe el término general y calcula el término 20.', ar: 'المتتالية: 1، 4، 7، 10، … اكتب الحد العام واحسب الحد العشرين.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Gai bakoitza aurrekoa gehi 3 da: 3n agertuko da.', es: 'Cada término es el anterior más 3: aparecerá 3n.', ar: 'كل حد هو السابق زائد 3: سيظهر 3n.' }, math: '$3\\cdot 1=3,\\ 3\\cdot 2=6,\\ 3\\cdot 3=9$' },
            { text: { eu: '3n-ri 2 kendu behar zaio segidako zenbakiak lortzeko.', es: 'A 3n hay que quitarle 2 para obtener los números de la serie.', ar: 'يجب طرح 2 من 3n للحصول على أعداد المتتالية.' }, math: '$a_{n}=3n-2$' },
            { text: { eu: 'Ordeztu n = 20.', es: 'Sustituye n = 20.', ar: 'عوّض n = 20.' }, math: '$a_{20}=3\\cdot 20-2=58$' }
        ],
        example: '$x+2,\\ \\ 3(x+2),\\ \\ x+25$',
        takeaway: {
            eu: 'Gai orokorrarekin, segidaren edozein gai kalkula daiteke.',
            es: 'Con el término general se puede calcular cualquier término de la serie.',
            ar: 'بالحد العام نحسب أي حد من المتتالية.'
        },
        figure: (language) => <PatternFigure language={language} />
    },
    {
        id: 'value',
        stage: 'language',
        title: { eu: 'Zenbakizko balioa', es: 'Valor numérico', ar: 'القيمة العددية' },
        goal: {
            eu: 'Adierazpen aljebraiko baten zenbakizko balioa kalkulatzea, zenbaki negatiboekin ere.',
            es: 'Calcular el valor numérico de una expresión algebraica, también con números negativos.',
            ar: 'حساب القيمة العددية لعبارة جبرية، حتى مع الأعداد السالبة.'
        },
        explanation: {
            eu: 'Zenbakizko balioa letrak zenbakiez ordeztu eta eragiketak egitean lortzen den emaitza da. Kontuz zenbaki negatiboekin: jarri parentesi artean, eta gogoratu eragiketen hierarkia (lehenik berreturak, gero biderketak, azkenik batuketak).',
            es: 'El valor numérico es el resultado de sustituir las letras por números y hacer las operaciones. Cuidado con los negativos: ponlos entre paréntesis y recuerda la jerarquía (primero potencias, luego productos, al final sumas).',
            ar: 'القيمة العددية هي الناتج بعد تعويض الحروف بأعداد وإجراء العمليات. انتبه للأعداد السالبة: ضعها بين قوسين وتذكّر أولوية العمليات (القوى ثم الضرب ثم الجمع).'
        },
        problem: { eu: 'Kalkulatu $-4x^{2}+3x$ balioa $x=-3$ denean.', es: 'Calcula el valor de $-4x^{2}+3x$ para $x=-3$.', ar: 'احسب قيمة $-4x^{2}+3x$ عندما $x=-3$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Ordeztu, parentesiekin.', es: 'Sustituye, con paréntesis.', ar: 'عوّض مع الأقواس.' }, math: '$-4\\cdot(-3)^{2}+3\\cdot(-3)$' },
            { text: { eu: 'Lehenik berretura.', es: 'Primero la potencia.', ar: 'القوة أولًا.' }, math: '$-4\\cdot 9-9$' },
            { text: { eu: 'Biderketa eta kenketa.', es: 'Producto y resta.', ar: 'الضرب ثم الطرح.' }, math: '$-36-9=-45$' }
        ],
        example: '$-2xy\\ (x=3,\\ y=-5)\\ \\to\\ 30$',
        takeaway: {
            eu: '$(-3)^{2}=9$, baina $-3^{2}=-9$: parentesiak garrantzitsuak dira.',
            es: '$(-3)^{2}=9$, pero $-3^{2}=-9$: los paréntesis importan.',
            ar: '$(-3)^{2}=9$ لكن $-3^{2}=-9$: الأقواس مهمة.'
        },
        figure: (language) => <MachineFigure language={language} />
    },
    {
        id: 'monomial',
        stage: 'monomials',
        title: { eu: 'Monomioak', es: 'Monomios', ar: 'وحيدات الحد' },
        goal: {
            eu: 'Monomio baten koefizientea, zati literala eta maila ezagutzea; antzekoak eta aurkakoak bereiztea.',
            es: 'Reconocer el coeficiente, la parte literal y el grado de un monomio; distinguir semejantes y opuestos.',
            ar: 'معرفة معامل وحيد الحد وجزئه الحرفي ودرجته؛ وتمييز المتشابهة والمتعاكسة.'
        },
        explanation: {
            eu: 'Monomioa zenbaki baten eta letra batzuen biderkadura da. Zenbakia koefizientea da, eta letrak (berretzaileekin) zati literala. Maila letren berretzaileen batura da. Bi monomio antzekoak dira zati literal bera badute; aurkakoak dira, gainera, koefiziente aurkakoak badituzte.',
            es: 'Un monomio es el producto de un número por letras. El número es el coeficiente y las letras (con sus exponentes), la parte literal. El grado es la suma de los exponentes de las letras. Dos monomios son semejantes si tienen la misma parte literal, y opuestos si además sus coeficientes son opuestos.',
            ar: 'وحيد الحد هو جداء عدد في حروف. العدد هو المعامل، والحروف (بأسسها) هي الجزء الحرفي. والدرجة مجموع أسس الحروف. ويكون وحيدا حد متشابهين إذا كان لهما الجزء الحرفي نفسه، ومتعاكسين إذا كان معاملاهما أيضًا متعاكسين.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Adibidea', es: 'Ejemplo', ar: 'مثال' }, text: { eu: 'Koefizientea −5, zati literala $x^{2}yz$, maila 4.', es: 'Coeficiente −5, parte literal $x^{2}yz$, grado 4.', ar: 'المعامل −5، الجزء الحرفي $x^{2}yz$، الدرجة 4.' }, math: '$-5x^{2}yz\\ \\to\\ 2+1+1=4$' },
            { title: { eu: 'Antzekoak', es: 'Semejantes', ar: 'متشابهة' }, text: { eu: 'Zati literal bera.', es: 'Misma parte literal.', ar: 'الجزء الحرفي نفسه.' }, math: '$3ab^{2},\\ -2ab^{2}$' },
            { title: { eu: 'Aurkakoak', es: 'Opuestos', ar: 'متعاكسة' }, text: { eu: 'Antzekoak eta koefiziente aurkakoak: batuta 0.', es: 'Semejantes y con coeficientes opuestos: suman 0.', ar: 'متشابهة بمعاملات متعاكسة: مجموعها 0.' }, math: '$7xy^{3},\\ -7xy^{3}$' }
        ],
        example: { eu: '$abc\\ \\to\\ \\text{maila}\\ 3$', es: '$abc\\ \\to\\ \\text{grado}\\ 3$', ar: '$abc\\ \\to\\ 3$' },
        takeaway: {
            eu: 'Letrarik gabeko zenbaki bat 0 mailako monomioa da.',
            es: 'Un número sin letras es un monomio de grado 0.',
            ar: 'العدد الخالي من الحروف وحيد حد من الدرجة 0.'
        },
        figure: (language) => <MonomialFigure language={language} />
    },
    {
        id: 'add-monomials',
        stage: 'monomials',
        title: { eu: 'Monomioen batuketa eta kenketa', es: 'Suma y resta de monomios', ar: 'جمع وحيدات الحد وطرحها' },
        goal: {
            eu: 'Monomio antzekoak batu eta kentzea eta adierazpenak laburtzea.',
            es: 'Sumar y restar monomios semejantes y reducir expresiones.',
            ar: 'جمع وحيدات الحد المتشابهة وطرحها وتبسيط العبارات.'
        },
        explanation: {
            eu: 'Monomio antzekoak bakarrik batu edo ken daitezke: koefizienteak batu edo kendu, eta zati literal bera utzi. Antzekoak ez badira, eragiketa adierazita geratzen da. Adierazpen bat laburtzeko, elkartu antzeko gai guztiak.',
            es: 'Solo se pueden sumar o restar monomios semejantes: se suman o restan los coeficientes y se deja la misma parte literal. Si no son semejantes, la operación queda indicada. Para reducir una expresión, agrupa todos los términos semejantes.',
            ar: 'لا نجمع أو نطرح إلا وحيدات الحد المتشابهة: نجمع المعاملات أو نطرحها ونُبقي الجزء الحرفي نفسه. وإذا لم تكن متشابهة تبقى العملية مكتوبة. ولتبسيط عبارة نجمع كل الحدود المتشابهة.'
        },
        problem: { eu: 'Laburtu: $5x^{2}+3x-4x^{2}-2x+1$.', es: 'Reduce: $5x^{2}+3x-4x^{2}-2x+1$.', ar: 'بسّط: $5x^{2}+3x-4x^{2}-2x+1$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Elkartu $x^{2}$-dun gaiak.', es: 'Agrupa los términos en $x^{2}$.', ar: 'اجمع حدود $x^{2}$.' }, math: '$5x^{2}-4x^{2}=x^{2}$' },
            { text: { eu: 'Elkartu $x$-dun gaiak.', es: 'Agrupa los términos en $x$.', ar: 'اجمع حدود $x$.' }, math: '$3x-2x=x$' },
            { text: { eu: 'Gai askea bere horretan geratzen da.', es: 'El término independiente se queda igual.', ar: 'يبقى الحد الثابت كما هو.' }, math: '$x^{2}+x+1$' }
        ],
        example: '$4a+2a-7+5=6a-2$',
        takeaway: {
            eu: '$x^{2}+x$ ez da $2x^{3}$: antzekoak ez direnak ez dira batzen.',
            es: '$x^{2}+x$ no es $2x^{3}$: lo que no es semejante no se suma.',
            ar: '$x^{2}+x$ ليست $2x^{3}$: غير المتشابه لا يُجمع.'
        },
        figure: (language) => <TilesFigure language={language} />
    },
    {
        id: 'multiply-monomials',
        stage: 'monomials',
        title: { eu: 'Monomioen biderketa eta zatiketa', es: 'Producto y cociente de monomios', ar: 'ضرب وحيدات الحد وقسمتها' },
        goal: {
            eu: 'Monomioak biderkatu eta zatitzea, berreturen propietateak erabiliz.',
            es: 'Multiplicar y dividir monomios usando las propiedades de las potencias.',
            ar: 'ضرب وحيدات الحد وقسمتها باستعمال خصائص القوى.'
        },
        explanation: {
            eu: 'Monomioak biderkatzeko, koefizienteak biderkatu eta oinarri bereko letren berretzaileak batu ($x^{2}\\cdot x^{3}=x^{5}$). Zatitzeko, koefizienteak zatitu eta berretzaileak kendu ($x^{5}\\mathbin{:}x^{2}=x^{3}$). Antzekoak izan behar ez dute.',
            es: 'Para multiplicar monomios, se multiplican los coeficientes y se suman los exponentes de las letras iguales ($x^{2}\\cdot x^{3}=x^{5}$). Para dividir, se dividen los coeficientes y se restan los exponentes ($x^{5}\\mathbin{:}x^{2}=x^{3}$). No hace falta que sean semejantes.',
            ar: 'لضرب وحيدات الحد نضرب المعاملات ونجمع أسس الحروف المتماثلة ($x^{2}\\cdot x^{3}=x^{5}$). وللقسمة نقسم المعاملات ونطرح الأسس ($x^{5}\\mathbin{:}x^{2}=x^{3}$). ولا يلزم أن تكون متشابهة.'
        },
        problem: { eu: 'Kalkulatu: $(4x^{3}y)\\cdot(-2xy)$ eta $(12x^{5})\\mathbin{:}(3x^{2})$.', es: 'Calcula: $(4x^{3}y)\\cdot(-2xy)$ y $(12x^{5})\\mathbin{:}(3x^{2})$.', ar: 'احسب: $(4x^{3}y)\\cdot(-2xy)$ و$(12x^{5})\\mathbin{:}(3x^{2})$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Koefizienteak: $4\\cdot(-2)=-8$. Berretzaileak batu.', es: 'Coeficientes: $4\\cdot(-2)=-8$. Suma los exponentes.', ar: 'المعاملات: $4\\cdot(-2)=-8$. اجمع الأسس.' }, math: '$-8x^{4}y^{2}$' },
            { text: { eu: 'Zatiketa: $12\\mathbin{:}3=4$, eta berretzaileak kendu.', es: 'División: $12\\mathbin{:}3=4$, y resta los exponentes.', ar: 'القسمة: $12\\mathbin{:}3=4$ واطرح الأسس.' }, math: '$4x^{3}$' }
        ],
        example: '$3a^{2}\\cdot 5a^{3}=15a^{5}$',
        takeaway: {
            eu: 'Biderkatzean berretzaileak batu; zatitzean, kendu.',
            es: 'Al multiplicar se suman los exponentes; al dividir, se restan.',
            ar: 'عند الضرب نجمع الأسس، وعند القسمة نطرحها.'
        }
    },
    {
        id: 'polynomial',
        stage: 'polynomials',
        title: { eu: 'Polinomioak', es: 'Polinomios', ar: 'الحدوديات' },
        goal: {
            eu: 'Polinomio baten maila, gai askea, zenbakizko balioa eta aurkakoa kalkulatzea.',
            es: 'Calcular el grado, el término independiente, el valor numérico y el opuesto de un polinomio.',
            ar: 'حساب درجة الحدودية وحدّها الثابت وقيمتها العددية ومعاكستها.'
        },
        explanation: {
            eu: 'Polinomioa antzekoak ez diren monomioen batura da; monomio bakoitza gai bat da. Maila gaien mailarik handiena da, eta gai askea letrarik gabea. P(a) idazten da polinomioaren balioa x = a denean. Polinomio aurkakoa, −P(x), gai guztien zeinua aldatuz lortzen da.',
            es: 'Un polinomio es una suma de monomios no semejantes; cada monomio es un término. El grado es el mayor grado de sus términos y el término independiente, el que no tiene letra. Se escribe P(a) para el valor del polinomio cuando x = a. El polinomio opuesto, −P(x), se obtiene cambiando el signo de todos los términos.',
            ar: 'الحدودية مجموع وحيدات حد غير متشابهة، وكل منها حدّ. الدرجة أكبر درجات حدودها، والحد الثابت هو الخالي من الحرف. ونكتب P(a) لقيمة الحدودية عندما x = a. والحدودية المعاكسة −P(x) نحصل عليها بتغيير إشارة كل الحدود.'
        },
        problem: { eu: '$P(x)=x^{3}-x^{2}+3x-1$. Kalkulatu P(2) eta idatzi −P(x).', es: '$P(x)=x^{3}-x^{2}+3x-1$. Calcula P(2) y escribe −P(x).', ar: '$P(x)=x^{3}-x^{2}+3x-1$. احسب P(2) واكتب −P(x).' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Maila 3 da, eta gai askea −1.', es: 'El grado es 3 y el término independiente, −1.', ar: 'الدرجة 3 والحد الثابت −1.' } },
            { text: { eu: 'Ordeztu x = 2.', es: 'Sustituye x = 2.', ar: 'عوّض x = 2.' }, math: '$P(2)=8-4+6-1=9$' },
            { text: { eu: 'Aldatu zeinu guztiak.', es: 'Cambia todos los signos.', ar: 'غيّر كل الإشارات.' }, math: '$-P(x)=-x^{3}+x^{2}-3x+1$' }
        ],
        example: '$P(-1)=-1-1-3-1=-6$',
        takeaway: {
            eu: 'P(0) beti gai askea da.',
            es: 'P(0) es siempre el término independiente.',
            ar: 'P(0) هي دائمًا الحد الثابت.'
        },
        figure: (language) => <PolynomialFigure language={language} />
    },
    {
        id: 'add-polynomials',
        stage: 'polynomials',
        title: { eu: 'Polinomioen batuketa eta kenketa', es: 'Suma y resta de polinomios', ar: 'جمع الحدوديات وطرحها' },
        goal: {
            eu: 'Polinomioak batu eta kentzea, parentesiak ondo kenduz.',
            es: 'Sumar y restar polinomios quitando bien los paréntesis.',
            ar: 'جمع الحدوديات وطرحها مع حذف الأقواس بشكل صحيح.'
        },
        explanation: {
            eu: 'Bi polinomio batzeko, gai antzekoak batzen dira. Kentzeko, lehenengoari bigarrenaren aurkakoa batzen zaio: minus zeinuaren atzeko parentesia kentzean, barruko gai guztien zeinua aldatzen da. Lagungarria da polinomioak bata bestearen azpian idaztea, maila bereko gaiak zutabe berean.',
            es: 'Para sumar dos polinomios se suman los términos semejantes. Para restar, se suma al primero el opuesto del segundo: al quitar un paréntesis precedido de un signo menos, cambian de signo todos los términos de dentro. Ayuda escribirlos uno debajo del otro, con los términos del mismo grado en la misma columna.',
            ar: 'لجمع حدوديتين نجمع الحدود المتشابهة. وللطرح نضيف إلى الأولى معاكسة الثانية: عند حذف قوس مسبوق بإشارة ناقص تتغيّر إشارات كل الحدود داخله. ويساعد أن نكتبهما إحداهما تحت الأخرى، والحدود من الدرجة نفسها في العمود نفسه.'
        },
        problem: { eu: 'Kalkulatu $(5x^{2}-2x-3)-(4x^{2}+3x-1)$.', es: 'Calcula $(5x^{2}-2x-3)-(4x^{2}+3x-1)$.', ar: 'احسب $(5x^{2}-2x-3)-(4x^{2}+3x-1)$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Kendu parentesiak: bigarrenean zeinu guztiak aldatzen dira.', es: 'Quita los paréntesis: en el segundo cambian todos los signos.', ar: 'احذف الأقواس: تتغيّر كل الإشارات في الثاني.' }, math: '$5x^{2}-2x-3-4x^{2}-3x+1$' },
            { text: { eu: 'Elkartu antzekoak.', es: 'Agrupa los semejantes.', ar: 'اجمع المتشابهة.' }, math: '$x^{2}-5x-2$' }
        ],
        example: '$(3x^{2}-5x+2)+(x^{2}-2x+1)=4x^{2}-7x+3$',
        takeaway: {
            eu: 'Minus baten atzeko parentesia: zeinu guztiak aldatu, ez lehenengoa bakarrik.',
            es: 'Paréntesis tras un menos: cambian todos los signos, no solo el primero.',
            ar: 'قوس بعد ناقص: تتغيّر كل الإشارات لا الأولى فقط.'
        }
    },
    {
        id: 'multiply-monomial',
        stage: 'polynomials',
        title: { eu: 'Polinomioa bider monomioa eta zati monomioa', es: 'Polinomio por monomio y entre monomio', ar: 'حدودية في وحيد حد وعلى وحيد حد' },
        goal: {
            eu: 'Polinomio bat monomio batez biderkatu eta zatitzea.',
            es: 'Multiplicar y dividir un polinomio por un monomio.',
            ar: 'ضرب حدودية في وحيد حد وقسمتها عليه.'
        },
        explanation: {
            eu: 'Polinomio bat monomio batez biderkatzeko, banaketa-propietatea aplikatzen da: monomioak polinomioaren gai bakoitza biderkatzen du. Polinomio bat monomio batez zatitzeko, gai bakoitza monomioaz zatitzen da.',
            es: 'Para multiplicar un polinomio por un monomio se aplica la propiedad distributiva: el monomio multiplica a cada término del polinomio. Para dividir un polinomio entre un monomio, se divide cada término entre el monomio.',
            ar: 'لضرب حدودية في وحيد حد نطبّق خاصية التوزيع: يضرب وحيد الحد كل حد من الحدودية. ولقسمة حدودية على وحيد حد نقسم كل حد عليه.'
        },
        problem: { eu: 'Kalkulatu $3x^{2}\\cdot(2x^{2}-x+4)$ eta $(10x^{3}-4x^{2}+6x)\\mathbin{:}2x$.', es: 'Calcula $3x^{2}\\cdot(2x^{2}-x+4)$ y $(10x^{3}-4x^{2}+6x)\\mathbin{:}2x$.', ar: 'احسب $3x^{2}\\cdot(2x^{2}-x+4)$ و$(10x^{3}-4x^{2}+6x)\\mathbin{:}2x$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu gai bakoitza $3x^{2}$-z.', es: 'Multiplica cada término por $3x^{2}$.', ar: 'اضرب كل حد في $3x^{2}$.' }, math: '$6x^{4}-3x^{3}+12x^{2}$' },
            { text: { eu: 'Zatitu gai bakoitza $2x$-z.', es: 'Divide cada término entre $2x$.', ar: 'اقسم كل حد على $2x$.' }, math: '$5x^{2}-2x+3$' }
        ],
        example: '$-2(x^{2}-3x+1)=-2x^{2}+6x-2$',
        takeaway: {
            eu: 'Monomioak gai GUZTIAK biderkatzen ditu.',
            es: 'El monomio multiplica a TODOS los términos.',
            ar: 'وحيد الحد يضرب كل الحدود.'
        }
    },
    {
        id: 'multiply-polynomials',
        stage: 'polynomials',
        title: { eu: 'Polinomioen biderketa', es: 'Producto de polinomios', ar: 'ضرب الحدوديات' },
        goal: {
            eu: 'Bi polinomio biderkatzea eta emaitza laburtzea.',
            es: 'Multiplicar dos polinomios y reducir el resultado.',
            ar: 'ضرب حدوديتين وتبسيط الناتج.'
        },
        explanation: {
            eu: 'Bi polinomio biderkatzeko, lehenengoaren gai bakoitza bigarrenaren gai guztiez biderkatzen da, eta gero antzeko gaiak laburtzen dira. Bi binomioren biderketa laukizuzen baten azalera gisa ikus daiteke: lau zatien batura.',
            es: 'Para multiplicar dos polinomios se multiplica cada término del primero por todos los del segundo y después se reducen los términos semejantes. El producto de dos binomios se puede ver como el área de un rectángulo: la suma de cuatro partes.',
            ar: 'لضرب حدوديتين نضرب كل حد من الأولى في كل حدود الثانية ثم نبسّط الحدود المتشابهة. ويمكن رؤية جداء ثنائيتين كمساحة مستطيل: مجموع أربعة أجزاء.'
        },
        problem: { eu: 'Kalkulatu $(2x-7)\\cdot(3x-4)$.', es: 'Calcula $(2x-7)\\cdot(3x-4)$.', ar: 'احسب $(2x-7)\\cdot(3x-4)$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu $2x$ bigarren parentesi osoaz.', es: 'Multiplica $2x$ por todo el segundo paréntesis.', ar: 'اضرب $2x$ في القوس الثاني كله.' }, math: '$6x^{2}-8x$' },
            { text: { eu: 'Biderkatu −7 bigarren parentesi osoaz.', es: 'Multiplica −7 por todo el segundo paréntesis.', ar: 'اضرب −7 في القوس الثاني كله.' }, math: '$-21x+28$' },
            { text: { eu: 'Batu eta laburtu.', es: 'Suma y reduce.', ar: 'اجمع وبسّط.' }, math: '$6x^{2}-29x+28$' }
        ],
        example: '$(x+1)(x-2)=x^{2}-x-2$',
        takeaway: {
            eu: '2 gai bider 2 gai: 4 biderketa, gero laburtu.',
            es: '2 términos por 2 términos: 4 productos, y luego reduce.',
            ar: 'حدّان في حدّين: 4 عمليات ضرب ثم التبسيط.'
        },
        figure: (language) => <ProductAreaFigure language={language} />
    },
    {
        id: 'square-sum',
        stage: 'products',
        title: { eu: 'Batura baten karratua', es: 'Cuadrado de una suma', ar: 'مربع مجموع' },
        goal: {
            eu: '$(a+b)^{2}$ garatzea biderketa osoa egin gabe.',
            es: 'Desarrollar $(a+b)^{2}$ sin hacer toda la multiplicación.',
            ar: 'نشر $(a+b)^{2}$ دون إجراء الضرب كاملًا.'
        },
        explanation: {
            eu: 'Batura baten karratua lehenaren karratua gehi lehenaren eta bigarrenaren biderkaduraren bikoitza gehi bigarrenaren karratua da: $(a+b)^{2}=a^{2}+2ab+b^{2}$. Akats ohikoena $2ab$ ahaztea da: $(a+b)^{2}$ ez da $a^{2}+b^{2}$.',
            es: 'El cuadrado de una suma es el cuadrado del primero más el doble del primero por el segundo más el cuadrado del segundo: $(a+b)^{2}=a^{2}+2ab+b^{2}$. El error más común es olvidar $2ab$: $(a+b)^{2}$ no es $a^{2}+b^{2}$.',
            ar: 'مربع مجموع يساوي مربع الأول زائد ضعف جداء الأول في الثاني زائد مربع الثاني: $(a+b)^{2}=a^{2}+2ab+b^{2}$. والخطأ الأشيع نسيان $2ab$: فـ$(a+b)^{2}$ ليست $a^{2}+b^{2}$.'
        },
        problem: { eu: 'Garatu $(3x+2)^{2}$.', es: 'Desarrolla $(3x+2)^{2}$.', ar: 'انشر $(3x+2)^{2}$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Lehenaren karratua.', es: 'Cuadrado del primero.', ar: 'مربع الأول.' }, math: '$(3x)^{2}=9x^{2}$' },
            { text: { eu: 'Biderkaduraren bikoitza.', es: 'Doble del producto.', ar: 'ضعف الجداء.' }, math: '$2\\cdot 3x\\cdot 2=12x$' },
            { text: { eu: 'Bigarrenaren karratua, eta batu.', es: 'Cuadrado del segundo, y suma.', ar: 'مربع الثاني ثم اجمع.' }, math: '$9x^{2}+12x+4$' }
        ],
        example: '$(x+5)^{2}=x^{2}+10x+25$',
        takeaway: {
            eu: 'Lehenaren karratua + bikoitza bider biderkadura + bigarrenaren karratua.',
            es: 'Cuadrado del primero + doble del producto + cuadrado del segundo.',
            ar: 'مربع الأول + ضعف الجداء + مربع الثاني.'
        },
        figure: (language) => <SquareSumFigure language={language} />
    },
    {
        id: 'square-difference',
        stage: 'products',
        title: { eu: 'Kendura baten karratua', es: 'Cuadrado de una diferencia', ar: 'مربع فرق' },
        goal: {
            eu: '$(a-b)^{2}$ garatzea.',
            es: 'Desarrollar $(a-b)^{2}$.',
            ar: 'نشر $(a-b)^{2}$.'
        },
        explanation: {
            eu: 'Kendura baten karratua lehenaren karratua ken biderkaduraren bikoitza gehi bigarrenaren karratua da: $(a-b)^{2}=a^{2}-2ab+b^{2}$. Azken gaia beti positiboa da, karratu bat delako.',
            es: 'El cuadrado de una diferencia es el cuadrado del primero menos el doble del producto más el cuadrado del segundo: $(a-b)^{2}=a^{2}-2ab+b^{2}$. El último término siempre es positivo, porque es un cuadrado.',
            ar: 'مربع فرق يساوي مربع الأول ناقص ضعف الجداء زائد مربع الثاني: $(a-b)^{2}=a^{2}-2ab+b^{2}$. والحد الأخير موجب دائمًا لأنه مربع.'
        },
        problem: { eu: 'Garatu $(2x-5)^{2}$.', es: 'Desarrolla $(2x-5)^{2}$.', ar: 'انشر $(2x-5)^{2}$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Lehenaren karratua.', es: 'Cuadrado del primero.', ar: 'مربع الأول.' }, math: '$(2x)^{2}=4x^{2}$' },
            { text: { eu: 'Biderkaduraren bikoitza, minus zeinuarekin.', es: 'Doble del producto, con signo menos.', ar: 'ضعف الجداء بإشارة ناقص.' }, math: '$-2\\cdot 2x\\cdot 5=-20x$' },
            { text: { eu: 'Bigarrenaren karratua, positiboa.', es: 'Cuadrado del segundo, positivo.', ar: 'مربع الثاني موجبًا.' }, math: '$4x^{2}-20x+25$' }
        ],
        example: '$(x-3)^{2}=x^{2}-6x+9$',
        takeaway: {
            eu: 'Erdiko gaia bakarrik da negatiboa.',
            es: 'Solo el término del medio es negativo.',
            ar: 'الحد الأوسط وحده سالب.'
        },
        figure: (language) => <SquareDifferenceFigure language={language} />
    },
    {
        id: 'sum-difference',
        stage: 'products',
        title: { eu: 'Batura bider kendura', es: 'Suma por diferencia', ar: 'مجموع في فرق' },
        goal: {
            eu: '$(a+b)(a-b)$ azkar kalkulatzea eta kalkulu mentalean erabiltzea.',
            es: 'Calcular rápido $(a+b)(a-b)$ y usarlo en cálculo mental.',
            ar: 'حساب $(a+b)(a-b)$ بسرعة واستعماله في الحساب الذهني.'
        },
        explanation: {
            eu: 'Batura bat bider kendura bat karratuen kendura da: $(a+b)(a-b)=a^{2}-b^{2}$. Erdiko gaiak ($+ab$ eta $-ab$) ezabatu egiten dira. Kalkulu mentalerako ere balio du: $102\\cdot 98=(100+2)(100-2)$.',
            es: 'Una suma por una diferencia es la diferencia de cuadrados: $(a+b)(a-b)=a^{2}-b^{2}$. Los términos del medio ($+ab$ y $-ab$) se anulan. También sirve para el cálculo mental: $102\\cdot 98=(100+2)(100-2)$.',
            ar: 'مجموع في فرق يساوي فرق المربعين: $(a+b)(a-b)=a^{2}-b^{2}$. يلغي الحدان الأوسطان ($+ab$ و$-ab$) أحدهما الآخر. ويفيد أيضًا في الحساب الذهني: $102\\cdot 98=(100+2)(100-2)$.'
        },
        problem: { eu: 'Kalkulatu $(2x+3)(2x-3)$ eta $102\\cdot 98$.', es: 'Calcula $(2x+3)(2x-3)$ y $102\\cdot 98$.', ar: 'احسب $(2x+3)(2x-3)$ و$102\\cdot 98$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Lehenaren karratua ken bigarrenaren karratua.', es: 'Cuadrado del primero menos cuadrado del segundo.', ar: 'مربع الأول ناقص مربع الثاني.' }, math: '$4x^{2}-9$' },
            { text: { eu: 'Zenbakiekin berdin.', es: 'Con números, igual.', ar: 'ومع الأعداد كذلك.' }, math: '$100^{2}-2^{2}=10\\,000-4=9\\,996$' }
        ],
        example: '$(x+4)(x-4)=x^{2}-16$',
        takeaway: {
            eu: 'Batura bider kendura = karratuen kendura.',
            es: 'Suma por diferencia = diferencia de cuadrados.',
            ar: 'مجموع في فرق = فرق مربعين.'
        },
        figure: (language) => <SumDifferenceFigure language={language} />
    },
    {
        id: 'common-factor',
        stage: 'factor',
        title: { eu: 'Faktore komuna ateratzea', es: 'Sacar factor común', ar: 'إخراج العامل المشترك' },
        goal: {
            eu: 'Polinomio baten faktore komunik handiena ateratzea.',
            es: 'Sacar el mayor factor común de un polinomio.',
            ar: 'إخراج أكبر عامل مشترك من حدودية.'
        },
        explanation: {
            eu: 'Faktore komuna ateratzea banaketa-propietatea alderantziz aplikatzea da: gai guztietan dagoena parentesitik kanpora idazten da. Koefizienteen ZKH hartzen da, eta gai guztietan dauden letrak berretzaile txikienarekin. Parentesi barruan, gai bakoitza zati faktore komuna geratzen da.',
            es: 'Sacar factor común es aplicar la propiedad distributiva al revés: lo que está en todos los términos se escribe fuera del paréntesis. Se toma el m.c.d. de los coeficientes y las letras que están en todos los términos con el menor exponente. Dentro del paréntesis queda cada término dividido entre el factor común.',
            ar: 'إخراج العامل المشترك هو تطبيق خاصية التوزيع بالعكس: ما يوجد في كل الحدود يُكتب خارج القوس. نأخذ ق.م.أ للمعاملات والحروف الموجودة في كل الحدود بأصغر أس. وداخل القوس يبقى كل حد مقسومًا على العامل المشترك.'
        },
        problem: { eu: 'Atera faktore komuna: $6x^{3}-9x^{2}+3x$.', es: 'Saca factor común: $6x^{3}-9x^{2}+3x$.', ar: 'أخرج العامل المشترك: $6x^{3}-9x^{2}+3x$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Koefizienteen ZKH: 6, 9 eta 3 → 3.', es: 'm.c.d. de los coeficientes: 6, 9 y 3 → 3.', ar: 'ق.م.أ للمعاملات: 6 و9 و3 ← 3.' } },
            { text: { eu: 'Letra komuna, berretzaile txikienarekin: $x$.', es: 'Letra común con el menor exponente: $x$.', ar: 'الحرف المشترك بأصغر أس: $x$.' } },
            { text: { eu: 'Zatitu gai bakoitza $3x$-z.', es: 'Divide cada término entre $3x$.', ar: 'اقسم كل حد على $3x$.' }, math: '$3x\\cdot(2x^{2}-3x+1)$' }
        ],
        example: '$4x^{2}+8x=4x(x+2)$',
        takeaway: {
            eu: 'Egiaztatu: biderkatu berriro eta hasierako polinomioa lortu behar duzu.',
            es: 'Comprueba: vuelve a multiplicar y debes obtener el polinomio inicial.',
            ar: 'تحقّق: اضرب من جديد فيجب أن تحصل على الحدودية الأصلية.'
        },
        figure: (language) => <CommonFactorFigure language={language} />
    },
    {
        id: 'factor-identities',
        stage: 'factor',
        title: { eu: 'Biderkadura nabarmenak ezagutzea', es: 'Reconocer productos notables', ar: 'التعرّف إلى المتطابقات الشهيرة' },
        goal: {
            eu: 'Polinomio bat karratu edo batura bider kendura gisa idaztea.',
            es: 'Escribir un polinomio como un cuadrado o como suma por diferencia.',
            ar: 'كتابة حدودية على شكل مربع أو مجموع في فرق.'
        },
        explanation: {
            eu: 'Biderkadura nabarmenak alderantziz irakur daitezke. Hiru gai baditu, bi karratu eta erdiko gaia haien oinarrien biderkaduraren bikoitza bada, batura edo kendura baten karratua da. Bi karraturen kendura bada, batura bider kendura da: $a^{2}-b^{2}=(a+b)(a-b)$.',
            es: 'Los productos notables se pueden leer al revés. Si tiene tres términos, dos son cuadrados y el del medio es el doble del producto de sus bases, es el cuadrado de una suma o de una diferencia. Si es una diferencia de dos cuadrados, es una suma por diferencia: $a^{2}-b^{2}=(a+b)(a-b)$.',
            ar: 'يمكن قراءة المتطابقات الشهيرة بالعكس. إذا كان للحدودية ثلاثة حدود، اثنان منها مربعان والأوسط ضعف جداء أساسيهما، فهي مربع مجموع أو فرق. وإذا كانت فرق مربعين فهي مجموع في فرق: $a^{2}-b^{2}=(a+b)(a-b)$.'
        },
        problem: { eu: 'Idatzi biderkadura gisa: $9x^{2}-6x+1$ eta $16x^{2}-25$.', es: 'Escribe como producto: $9x^{2}-6x+1$ y $16x^{2}-25$.', ar: 'اكتب في صورة جداء: $9x^{2}-6x+1$ و$16x^{2}-25$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Karratuak: $9x^{2}=(3x)^{2}$ eta $1=1^{2}$. Erdikoa: $2\\cdot 3x\\cdot 1=6x$, minusarekin.', es: 'Cuadrados: $9x^{2}=(3x)^{2}$ y $1=1^{2}$. El del medio: $2\\cdot 3x\\cdot 1=6x$, con menos.', ar: 'المربعان: $9x^{2}=(3x)^{2}$ و$1=1^{2}$. الأوسط: $2\\cdot 3x\\cdot 1=6x$ بإشارة ناقص.' }, math: '$(3x-1)^{2}$' },
            { text: { eu: 'Bi karraturen kendura: $(4x)^{2}-5^{2}$.', es: 'Diferencia de dos cuadrados: $(4x)^{2}-5^{2}$.', ar: 'فرق مربعين: $(4x)^{2}-5^{2}$.' }, math: '$(4x+5)(4x-5)$' }
        ],
        example: '$x^{2}+8x+16=(x+4)^{2}$',
        takeaway: {
            eu: 'Egiaztatu erdiko gaia: bikoitza bider oinarriak.',
            es: 'Comprueba el término del medio: el doble por las bases.',
            ar: 'تحقّق من الحد الأوسط: الضعف في الأساسين.'
        }
    },
    {
        id: 'mental',
        stage: 'factor',
        title: { eu: 'Kalkulu mentala eta sinplifikazioa', es: 'Cálculo mental y simplificación', ar: 'الحساب الذهني والتبسيط' },
        goal: {
            eu: 'Biderkadura nabarmenak eta faktore komuna erabiltzea kalkuluak errazteko.',
            es: 'Usar los productos notables y el factor común para facilitar cálculos.',
            ar: 'استعمال المتطابقات الشهيرة والعامل المشترك لتسهيل الحسابات.'
        },
        explanation: {
            eu: 'Biderkadura nabarmenekin kalkulu luzeak buruz egin daitezke: $100^{2}-99^{2}=(100+99)(100-99)=199$. Faktore komunarekin, berriz, adierazpenak sinplifika daitezke eta balioak azkarrago kalkulatu: $37\\cdot 13+37\\cdot 87=37\\cdot 100$.',
            es: 'Con los productos notables se hacen de cabeza cálculos largos: $100^{2}-99^{2}=(100+99)(100-99)=199$. Con el factor común, se simplifican expresiones y se calculan valores más rápido: $37\\cdot 13+37\\cdot 87=37\\cdot 100$.',
            ar: 'بالمتطابقات الشهيرة نجري حسابات طويلة ذهنيًا: $100^{2}-99^{2}=(100+99)(100-99)=199$. وبالعامل المشترك نبسّط العبارات ونحسب القيم أسرع: $37\\cdot 13+37\\cdot 87=37\\cdot 100$.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Karratuen kendura', es: 'Diferencia de cuadrados', ar: 'فرق مربعين' }, text: { eu: 'Bi zenbaki jarraituren karratuen kendura haien batura da.', es: 'La diferencia de cuadrados de dos números seguidos es su suma.', ar: 'فرق مربعَي عددين متتاليين يساوي مجموعهما.' }, math: '$312^{2}-311^{2}=623$' },
            { title: { eu: 'Batura baten karratua', es: 'Cuadrado de una suma', ar: 'مربع مجموع' }, text: { eu: '101 = 100 + 1.', es: '101 = 100 + 1.', ar: '101 = 100 + 1.' }, math: '$101^{2}=10\\,000+200+1=10\\,201$' },
            { title: { eu: 'Faktore komuna', es: 'Factor común', ar: 'العامل المشترك' }, text: { eu: 'Gai biek dute 37.', es: 'Los dos términos tienen 37.', ar: 'في الحدين 37.' }, math: '$37\\cdot 13+37\\cdot 87=3\\,700$' }
        ],
        example: '$99^{2}=10\\,000-200+1=9\\,801$',
        takeaway: {
            eu: 'Aljebrak zenbakiekin ere laguntzen du.',
            es: 'El álgebra también ayuda con los números.',
            ar: 'الجبر يساعد مع الأعداد أيضًا.'
        }
    }
]

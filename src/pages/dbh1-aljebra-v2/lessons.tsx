import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BalanceFigure, DistributiveFigure, MachineFigure, MonomialFigure, PerimeterFigure, TilesFigure } from './figures'

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
    { id: 'language', tone: 'blue', title: { eu: 'Hizkuntza aljebraikoa', es: 'Lenguaje algebraico', ar: 'اللغة الجبرية' } },
    { id: 'monomials', tone: 'violet', title: { eu: 'Monomioak eta polinomioak', es: 'Monomios y polinomios', ar: 'وحيدات الحد والحدوديات' } },
    { id: 'operations', tone: 'mustard', title: { eu: 'Monomioekin eragiketak', es: 'Operaciones con monomios', ar: 'العمليات على وحيدات الحد' } },
    { id: 'equations', tone: 'coral', title: { eu: 'Ekuazioak', es: 'Ecuaciones', ar: 'المعادلات' } },
    { id: 'problems', tone: 'green', title: { eu: 'Buruketak ekuazioekin', es: 'Problemas con ecuaciones', ar: 'مسائل بالمعادلات' } }
]

export const algebraIntroTopics: UnitTopic[] = [
    {
        id: 'letters',
        stage: 'language',
        title: { eu: 'Zenbakien ordez letrak', es: 'Letras en lugar de números', ar: 'حروف بدل الأعداد' },
        goal: {
            eu: 'Ohiko hizkuntza, zenbakizko hizkuntza eta hizkuntza aljebraikoa bereiztea.',
            es: 'Distinguir el lenguaje usual, el numérico y el algebraico.',
            ar: 'التمييز بين اللغة المعتادة واللغة العددية واللغة الجبرية.'
        },
        explanation: {
            eu: 'Egunero ohiko hizkuntza erabiltzen dugu: «bi gehi lau sei da». Zenbakiekin eta eragiketa-ikurrekin idazten badugu, zenbakizko hizkuntza da: $2+4=6$. Zenbaki bat ezagutzen ez dugunean edo edozein zenbaki izan daitekeenean, letra bat erabiltzen dugu (x, y, a, b…): hori da hizkuntza aljebraikoa, eta letrak eta zenbakiak lotzen dituen matematikaren atala aljebra da.',
            es: 'Cada día usamos el lenguaje usual: «dos más cuatro es seis». Si lo escribimos con números y signos, es lenguaje numérico: $2+4=6$. Cuando no conocemos un número o puede ser cualquiera, usamos una letra (x, y, a, b…): eso es el lenguaje algebraico, y la parte de las matemáticas que relaciona letras y números es el álgebra.',
            ar: 'نستعمل كل يوم اللغة المعتادة: «اثنان زائد أربعة تساوي ستة». وإذا كتبناها بالأعداد والرموز فهي لغة عددية: $2+4=6$. وعندما لا نعرف عددًا أو يمكن أن يكون أي عدد نستعمل حرفًا (x, y, a, b…): هذه هي اللغة الجبرية، والجزء من الرياضيات الذي يربط الحروف بالأعداد هو الجبر.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Ohikoa → zenbakizkoa', es: 'Usual → numérico', ar: 'المعتادة ← العددية' }, text: { eu: '«Hamabiren erdia sei da».', es: '«La mitad de doce es seis».', ar: '«نصف اثني عشر ستة».' }, math: '$12\\mathbin{:}2=6$' },
            { title: { eu: 'Ohikoa → aljebraikoa', es: 'Usual → algebraico', ar: 'المعتادة ← الجبرية' }, text: { eu: '«Zenbaki baten hirukoitza»: zenbakia ez dakigunez, x deitzen diogu.', es: '«El triple de un número»: como no sabemos el número, lo llamamos x.', ar: '«ثلاثة أضعاف عدد»: لأننا لا نعرف العدد نسمّيه x.' }, math: '$3\\cdot x=3x$' },
            { title: { eu: 'Biderketa-ikurra', es: 'El signo de multiplicar', ar: 'علامة الضرب' }, text: { eu: 'Zenbaki baten eta letra baten artean ez da idazten: $3\\cdot x$ = $3x$.', es: 'Entre un número y una letra no se escribe: $3\\cdot x$ = $3x$.', ar: 'لا تُكتب بين عدد وحرف: $3\\cdot x$ = $3x$.' } }
        ],
        example: '$x+4\\qquad 2x\\qquad \\frac{x}{2}\\qquad x^{2}$',
        takeaway: {
            eu: 'Letra batek edozein zenbaki adieraz dezake.',
            es: 'Una letra puede representar cualquier número.',
            ar: 'يمكن للحرف أن يمثّل أي عدد.'
        }
    },
    {
        id: 'translate',
        stage: 'language',
        title: { eu: 'Adierazpen aljebraikoak', es: 'Expresiones algebraicas', ar: 'العبارات الجبرية' },
        goal: {
            eu: 'Esaldiak eta formulak adierazpen aljebraiko gisa idaztea.',
            es: 'Escribir frases y fórmulas como expresiones algebraicas.',
            ar: 'كتابة الجمل والصيغ عبارات جبرية.'
        },
        explanation: {
            eu: 'Adierazpen aljebraikoa zenbakiak eta letrak eragiketa-ikurrekin (+, −, ·, :, berreturak) lotzen dituen multzoa da. Esaldi bat itzultzeko, erabaki zer den ezezaguna (x) eta idatzi eragiketak ordenan. Formulak ere adierazpen aljebraikoak dira: laukizuzen baten perimetroa $2a+2b$ da, edozein izanik ere aldeak.',
            es: 'Una expresión algebraica es un conjunto de números y letras unidos por signos de operaciones (+, −, ·, :, potencias). Para traducir una frase, decide qué es lo desconocido (x) y escribe las operaciones en orden. Las fórmulas también son expresiones algebraicas: el perímetro de un rectángulo es $2a+2b$, midan lo que midan sus lados.',
            ar: 'العبارة الجبرية مجموعة من الأعداد والحروف تربطها علامات العمليات (+، −، ·، :، القوى). لترجمة جملة حدّد المجهول (x) واكتب العمليات بالترتيب. والصيغ أيضًا عبارات جبرية: محيط المستطيل $2a+2b$ مهما كان طول ضلعيه.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Bikoitza, hirukoitza', es: 'Doble, triple', ar: 'الضعف، ثلاثة الأضعاف' }, text: { eu: 'Zenbaki baten bikoitza, hirukoitza.', es: 'El doble, el triple de un número.', ar: 'ضعف عدد، ثلاثة أضعافه.' }, math: '$2x\\qquad 3x$' },
            { title: { eu: 'Erdia, karratua', es: 'Mitad, cuadrado', ar: 'النصف، المربع' }, text: { eu: 'Zenbaki baten erdia eta karratua.', es: 'La mitad y el cuadrado de un número.', ar: 'نصف عدد ومربعه.' }, math: '$\\frac{x}{2}\\qquad x^{2}$' },
            { title: { eu: 'Gehitu, gutxitu', es: 'Aumentado, disminuido', ar: 'زائد، ناقص' }, text: { eu: 'Zenbaki bat gehi 5, ken 3.', es: 'Un número aumentado en 5, disminuido en 3.', ar: 'عدد زائد 5، ناقص 3.' }, math: '$x+5\\qquad x-3$' },
            { title: { eu: 'Adina', es: 'La edad', ar: 'العمر' }, text: { eu: 'Zure adina x bada: duela 4 urte eta 4 urte barru.', es: 'Si tu edad es x: hace 4 años y dentro de 4 años.', ar: 'إذا كان عمرك x: قبل 4 سنوات وبعد 4 سنوات.' }, math: '$x-4\\qquad x+4$' }
        ],
        example: '$2\\cdot(x+y)\\qquad x^{2}+4$',
        takeaway: {
            eu: 'Irakurri poliki: «bikoitza gehi 3» ($2x+3$) ez da «batuketaren bikoitza» ($2(x+3)$).',
            es: 'Lee despacio: «el doble más 3» ($2x+3$) no es «el doble de la suma» ($2(x+3)$).',
            ar: 'اقرأ ببطء: «الضعف زائد 3» ($2x+3$) ليس «ضعف المجموع» ($2(x+3)$).'
        },
        figure: (language) => <PerimeterFigure language={language} />
    },
    {
        id: 'value',
        stage: 'language',
        title: { eu: 'Zenbakizko balioa', es: 'Valor numérico', ar: 'القيمة العددية' },
        goal: {
            eu: 'Adierazpen aljebraiko baten zenbakizko balioa kalkulatzea.',
            es: 'Calcular el valor numérico de una expresión algebraica.',
            ar: 'حساب القيمة العددية لعبارة جبرية.'
        },
        explanation: {
            eu: 'Adierazpen baten zenbakizko balioa letrak zenbakiez ordezkatu eta eragiketak egitean lortzen den zenbakia da. Letra bakoitzak balio bat hartzen du, eta eragiketen hierarkia errespetatu behar da: lehenik berreturak, gero biderketak eta zatiketak, eta azkenik batuketak eta kenketak. Zenbaki negatiboak parentesi artean ordezkatzen dira.',
            es: 'El valor numérico de una expresión es el número que se obtiene al sustituir las letras por números y hacer las operaciones. Cada letra toma un valor y hay que respetar la jerarquía: primero las potencias, después las multiplicaciones y divisiones y, por último, sumas y restas. Los números negativos se sustituyen entre paréntesis.',
            ar: 'القيمة العددية لعبارة هي العدد الذي نحصل عليه عند تعويض الحروف بأعداد وإجراء العمليات. يأخذ كل حرف قيمة، ويجب احترام أولوية العمليات: القوى أولًا، ثم الضرب والقسمة، وأخيرًا الجمع والطرح. وتُعوَّض الأعداد السالبة بين قوسين.'
        },
        problem: { eu: 'Kalkulatu $3x-5$ adierazpenaren balioa $x=2$ denean.', es: 'Halla el valor de $3x-5$ para $x=2$.', ar: 'احسب قيمة $3x-5$ عندما $x=2$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Ordeztu x 2z.', es: 'Sustituye la x por 2.', ar: 'عوّض x بـ 2.' }, math: '$3\\cdot 2-5$' },
            { text: { eu: 'Lehenik biderketa.', es: 'Primero la multiplicación.', ar: 'الضرب أولًا.' }, math: '$6-5$' },
            { text: { eu: 'Gero kenketa.', es: 'Después la resta.', ar: 'ثم الطرح.' }, math: '$3\\cdot 2-5=1$' }
        ],
        example: '$x=-1:\\quad 3\\cdot(-1)-5=-8$',
        takeaway: {
            eu: 'Ordeztu, parentesiak jarri behar badira jarri, eta kalkulatu ordenan.',
            es: 'Sustituye, pon paréntesis si hacen falta y calcula en orden.',
            ar: 'عوّض، وضع أقواسًا عند الحاجة، واحسب بالترتيب.'
        },
        figure: (language) => <MachineFigure language={language} />
    },
    {
        id: 'monomial',
        stage: 'monomials',
        title: { eu: 'Monomioak', es: 'Monomios', ar: 'وحيدات الحد' },
        goal: {
            eu: 'Monomio baten koefizientea, zati literala eta maila identifikatzea.',
            es: 'Identificar el coeficiente, la parte literal y el grado de un monomio.',
            ar: 'تحديد معامل وحيد الحد وجزئه الحرفي ودرجته.'
        },
        explanation: {
            eu: 'Monomioa adierazpen aljebraikorik errazena da: zenbakien eta letren biderkadura. Zenbakia koefizientea da, eta letrak (berretzaileekin) zati literala. Maila zati literaleko letren berretzaileen batura da. Idazteko arauak: 1 koefizientea ez da idazten ($x$, ez $1x$), 1 berretzailea ere ez, eta biderketa-ikurra ez da jartzen ($2ab$).',
            es: 'Un monomio es la expresión algebraica más sencilla: un producto de números y letras. El número es el coeficiente y las letras (con sus exponentes), la parte literal. El grado es la suma de los exponentes de las letras. Reglas de escritura: el coeficiente 1 no se pone ($x$, no $1x$), el exponente 1 tampoco, y no se escribe el signo de multiplicar ($2ab$).',
            ar: 'وحيد الحد أبسط عبارة جبرية: حاصل ضرب أعداد وحروف. العدد هو المعامل، والحروف (بأسسها) هي الجزء الحرفي. والدرجة مجموع أسس الحروف. قواعد الكتابة: المعامل 1 لا يُكتب ($x$ لا $1x$)، ولا الأس 1، ولا علامة الضرب ($2ab$).'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Koefizientea', es: 'Coeficiente', ar: 'المعامل' }, text: { eu: 'Zenbakia, zeinuarekin: $-5ab$-n, −5.', es: 'El número, con su signo: en $-5ab$, −5.', ar: 'العدد بإشارته: في $-5ab$ هو −5.' } },
            { title: { eu: 'Zati literala', es: 'Parte literal', ar: 'الجزء الحرفي' }, text: { eu: 'Letrak eta haien berretzaileak: $-5ab$-n, $ab$.', es: 'Las letras y sus exponentes: en $-5ab$, $ab$.', ar: 'الحروف وأسسها: في $-5ab$ هو $ab$.' } },
            { title: { eu: 'Maila', es: 'Grado', ar: 'الدرجة' }, text: { eu: 'Berretzaileen batura: $-4x^{2}y$-ren maila 3 da.', es: 'Suma de los exponentes: el grado de $-4x^{2}y$ es 3.', ar: 'مجموع الأسس: درجة $-4x^{2}y$ هي 3.' }, math: '$2+1=3$' }
        ],
        example: '$2x\\ (1)\\qquad -5ab\\ (2)\\qquad 3x^{3}\\ (3)$',
        takeaway: {
            eu: 'Monomioa = koefizientea · zati literala.',
            es: 'Monomio = coeficiente · parte literal.',
            ar: 'وحيد الحد = المعامل · الجزء الحرفي.'
        },
        figure: (language) => <MonomialFigure language={language} />
    },
    {
        id: 'like-terms',
        stage: 'monomials',
        title: { eu: 'Monomio antzekoak', es: 'Monomios semejantes', ar: 'وحيدات الحد المتشابهة' },
        goal: {
            eu: 'Bi monomio antzekoak diren erabakitzea.',
            es: 'Decidir si dos monomios son semejantes.',
            ar: 'تحديد ما إذا كان وحيدا حد متشابهين.'
        },
        explanation: {
            eu: 'Bi monomio edo gehiago antzekoak dira zati literal bera dutenean: letra berak, berretzaile berekin. Koefizienteak desberdinak izan daitezke. Adibidez, $2x$ eta $3x$ antzekoak dira; $4x^{2}y$ eta $2xy^{2}$ ez, letrak berak izan arren berretzaileak desberdinak direlako.',
            es: 'Dos o más monomios son semejantes cuando tienen la misma parte literal: las mismas letras con los mismos exponentes. Los coeficientes pueden ser distintos. Por ejemplo, $2x$ y $3x$ son semejantes; $4x^{2}y$ y $2xy^{2}$ no, porque aunque tienen las mismas letras los exponentes son distintos.',
            ar: 'يكون وحيدا حد أو أكثر متشابهة عندما يكون لها الجزء الحرفي نفسه: الحروف نفسها بالأسس نفسها. ويمكن أن تختلف المعاملات. مثلًا $2x$ و$3x$ متشابهان، أما $4x^{2}y$ و$2xy^{2}$ فلا، لأن الأسس مختلفة رغم تشابه الحروف.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Antzekoak', es: 'Semejantes', ar: 'متشابهة' }, text: { eu: 'Zati literal bera.', es: 'Misma parte literal.', ar: 'الجزء الحرفي نفسه.' }, math: '$2x,\\ 3x,\\ -x$' },
            { title: { eu: 'Ez antzekoak', es: 'No semejantes', ar: 'غير متشابهة' }, text: { eu: 'Letra edo berretzaile desberdinak.', es: 'Letras o exponentes distintos.', ar: 'حروف أو أسس مختلفة.' }, math: '$x^{2}y,\\ xy^{2}$' }
        ],
        example: '$-2a^{2}b,\\ 5a^{2}b,\\ a^{2}b$',
        takeaway: {
            eu: 'Begiratu letrei eta berretzaileei; koefizientea ez da kontuan hartzen.',
            es: 'Mira las letras y los exponentes; el coeficiente no cuenta.',
            ar: 'انظر إلى الحروف والأسس؛ المعامل لا يهم.'
        }
    },
    {
        id: 'polynomial',
        stage: 'monomials',
        title: { eu: 'Polinomioak', es: 'Polinomios', ar: 'الحدوديات' },
        goal: {
            eu: 'Polinomio baten gaiak, gai askea eta maila identifikatzea.',
            es: 'Identificar los términos, el término independiente y el grado de un polinomio.',
            ar: 'تحديد حدود الحدودية وحدّها الثابت ودرجتها.'
        },
        explanation: {
            eu: 'Polinomioa antzekoak ez diren monomioen batura edo kenketa da. Batugai bakoitzari gaia esaten zaio. Letrarik gabeko gaia gai askea da. Polinomioaren maila maila handieneko gaiaren maila da.',
            es: 'Un polinomio es una suma o resta de monomios no semejantes. Cada sumando se llama término. El término sin letras es el término independiente. El grado del polinomio es el grado de su término de mayor grado.',
            ar: 'الحدودية مجموع أو فرق وحيدات حد غير متشابهة. يسمّى كل منها حدًّا. والحد الخالي من الحروف هو الحد الثابت. ودرجة الحدودية هي درجة أعلى حدودها درجة.'
        },
        problem: { eu: 'Aztertu $3x^{3}+5x-4$ polinomioa.', es: 'Estudia el polinomio $3x^{3}+5x-4$.', ar: 'ادرس الحدودية $3x^{3}+5x-4$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Gaiak: batugai bakoitza, bere zeinuarekin.', es: 'Términos: cada sumando, con su signo.', ar: 'الحدود: كل حد بإشارته.' }, math: '$3x^{3},\\ 5x,\\ -4$' },
            { text: { eu: 'Gai askea: letrarik gabea.', es: 'Término independiente: el que no tiene letras.', ar: 'الحد الثابت: الخالي من الحروف.' }, math: '$-4$' },
            { text: { eu: 'Maila: gai bakoitzaren mailatik handiena.', es: 'Grado: el mayor de los grados de sus términos.', ar: 'الدرجة: أكبر درجات حدودها.' }, math: '$3$' }
        ],
        example: '$-2ab+4b\\ \\to\\ 2$',
        takeaway: {
            eu: 'Polinomioaren maila = gai handienaren maila.',
            es: 'Grado del polinomio = grado del término mayor.',
            ar: 'درجة الحدودية = درجة الحد الأكبر.'
        }
    },
    {
        id: 'add-monomials',
        stage: 'operations',
        title: { eu: 'Monomioen batuketa eta kenketa', es: 'Suma y resta de monomios', ar: 'جمع وحيدات الحد وطرحها' },
        goal: {
            eu: 'Monomio antzekoak batzea eta kentzea eta adierazpenak laburtzea.',
            es: 'Sumar y restar monomios semejantes y reducir expresiones.',
            ar: 'جمع وحيدات الحد المتشابهة وطرحها وتبسيط العبارات.'
        },
        explanation: {
            eu: 'Monomio antzekoak bakarrik batu edo ken daitezke: koefizienteak batu edo kentzen dira eta zati literal bera uzten da. Antzekoak ez badira, eragiketa adierazita geratzen da. Adierazpen bat laburtzeko, bildu gai antzekoak taldeka: x-ak x-ekin, x²-ak x²-ekin eta zenbakiak zenbakiekin.',
            es: 'Solo se pueden sumar o restar monomios semejantes: se suman o restan los coeficientes y se deja la misma parte literal. Si no son semejantes, la operación se deja indicada. Para reducir una expresión, agrupa los términos semejantes: las x con las x, las x² con las x² y los números con los números.',
            ar: 'لا يمكن جمع أو طرح إلا وحيدات الحد المتشابهة: نجمع المعاملات أو نطرحها ونُبقي الجزء الحرفي. وإذا لم تكن متشابهة تبقى العملية مكتوبة. ولتبسيط عبارة اجمع الحدود المتشابهة: x مع x، وx² مع x²، والأعداد مع الأعداد.'
        },
        problem: { eu: 'Laburtu $x^{2}+4x+5x^{2}+x$.', es: 'Reduce $x^{2}+4x+5x^{2}+x$.', ar: 'بسّط $x^{2}+4x+5x^{2}+x$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Bildu gai antzekoak.', es: 'Agrupa los términos semejantes.', ar: 'اجمع الحدود المتشابهة.' }, math: '$(x^{2}+5x^{2})+(4x+x)$' },
            { text: { eu: 'Batu koefizienteak: 1 + 5 eta 4 + 1.', es: 'Suma los coeficientes: 1 + 5 y 4 + 1.', ar: 'اجمع المعاملات: 1 + 5 و4 + 1.' }, math: '$6x^{2}+5x$' },
            { title: { eu: 'Kontuz', es: 'Cuidado', ar: 'انتبه' }, text: { eu: '$6x^{2}$ eta $5x$ ez dira antzekoak: ezin dira gehiago batu.', es: '$6x^{2}$ y $5x$ no son semejantes: no se pueden sumar más.', ar: '$6x^{2}$ و$5x$ غير متشابهين: لا يمكن جمعهما أكثر.' } }
        ],
        example: '$5ab+3ab-2ab=6ab\\qquad 3p+2q$',
        takeaway: {
            eu: 'Batu koefizienteak; zati literala ez da aldatzen.',
            es: 'Suma los coeficientes; la parte literal no cambia.',
            ar: 'اجمع المعاملات؛ الجزء الحرفي لا يتغيّر.'
        },
        figure: (language) => <TilesFigure language={language} />
    },
    {
        id: 'multiply-monomials',
        stage: 'operations',
        title: { eu: 'Monomioen biderketa eta zatiketa', es: 'Multiplicación y división de monomios', ar: 'ضرب وحيدات الحد وقسمتها' },
        goal: {
            eu: 'Monomioak biderkatzea eta zatitzea.',
            es: 'Multiplicar y dividir monomios.',
            ar: 'ضرب وحيدات الحد وقسمتها.'
        },
        explanation: {
            eu: 'Bi monomioren biderkadura beste monomio bat da: koefizientea koefizienteen biderkadura da, eta zati literala zati literalen biderkadura. Oinarri bereko berreturak biderkatzean berretzaileak batzen dira. Zatitzean, koefizienteak zatitzen dira eta berretzaileak kentzen. Gogoratu zeinuen araua.',
            es: 'El producto de dos monomios es otro monomio: el coeficiente es el producto de los coeficientes y la parte literal, el producto de las partes literales. Al multiplicar potencias de la misma base se suman los exponentes. Al dividir, se dividen los coeficientes y se restan los exponentes. Recuerda la regla de los signos.',
            ar: 'حاصل ضرب وحيدي حد وحيد حد آخر: معامله حاصل ضرب المعاملين، وجزؤه الحرفي حاصل ضرب الجزأين الحرفيين. وعند ضرب قوى لها الأساس نفسه نجمع الأسس. وعند القسمة نقسم المعاملات ونطرح الأسس. وتذكّر قاعدة الإشارات.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Biderketa', es: 'Multiplicación', ar: 'الضرب' }, text: { eu: 'Koefizienteak biderkatu eta berretzaileak batu.', es: 'Multiplica los coeficientes y suma los exponentes.', ar: 'اضرب المعاملات واجمع الأسس.' }, math: '$2x\\cdot 3x^{2}=6x^{3}$' },
            { title: { eu: 'Zeinuak', es: 'Signos', ar: 'الإشارات' }, text: { eu: 'Zeinuen araua: $-\\cdot +=-$.', es: 'Regla de los signos: $-\\cdot +=-$.', ar: 'قاعدة الإشارات: $-\\cdot +=-$.' }, math: '$\\begin{gathered}-4x^{2}\\cdot 5x^{3}\\\\=-20x^{5}\\end{gathered}$' },
            { title: { eu: 'Zatiketa', es: 'División', ar: 'القسمة' }, text: { eu: 'Koefizienteak zatitu eta berretzaileak kendu.', es: 'Divide los coeficientes y resta los exponentes.', ar: 'اقسم المعاملات واطرح الأسس.' }, math: '$8x^{2}\\mathbin{:}2x=4x$' }
        ],
        example: '$3a\\cdot 2a=6a^{2}\\qquad 12x^{5}\\mathbin{:}3x^{5}=4$',
        takeaway: {
            eu: 'Biderkatzean berretzaileak batu; zatitzean, kendu.',
            es: 'Al multiplicar, se suman los exponentes; al dividir, se restan.',
            ar: 'عند الضرب نجمع الأسس، وعند القسمة نطرحها.'
        }
    },
    {
        id: 'brackets',
        stage: 'operations',
        title: { eu: 'Parentesiak kentzea', es: 'Quitar paréntesis', ar: 'حذف الأقواس' },
        goal: {
            eu: 'Banatze-propietatea erabiliz parentesiak kentzea eta laburtzea.',
            es: 'Quitar paréntesis con la propiedad distributiva y reducir.',
            ar: 'حذف الأقواس بخاصية التوزيع ثم التبسيط.'
        },
        explanation: {
            eu: 'Parentesiaren aurrean zenbaki bat badago, barruko gai guztiak biderkatzen ditu: banatze-propietatea da. Gero, laburtu gai antzekoak. Parentesiaren aurrean minus bat badago, barruko gai guztien zeinuak aldatzen dira.',
            es: 'Si delante de un paréntesis hay un número, multiplica a todos los términos de dentro: es la propiedad distributiva. Después, reduce los términos semejantes. Si delante del paréntesis hay un signo menos, cambian los signos de todos los términos de dentro.',
            ar: 'إذا كان أمام القوس عدد فإنه يضرب كل الحدود داخله: إنها خاصية التوزيع. ثم نبسّط الحدود المتشابهة. وإذا كانت أمام القوس علامة ناقص تتغيّر إشارات كل الحدود داخله.'
        },
        problem: { eu: 'Kendu parentesiak eta laburtu: $3(x^{2}+x)+5x$.', es: 'Quita los paréntesis y reduce: $3(x^{2}+x)+5x$.', ar: 'احذف الأقواس وبسّط: $3(x^{2}+x)+5x$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu 3 barruko gai bakoitzaz.', es: 'Multiplica el 3 por cada término de dentro.', ar: 'اضرب 3 في كل حد داخل القوس.' }, math: '$3x^{2}+3x+5x$' },
            { text: { eu: 'Laburtu gai antzekoak.', es: 'Reduce los términos semejantes.', ar: 'بسّط الحدود المتشابهة.' }, math: '$3x^{2}+8x$' }
        ],
        example: '$\\begin{gathered}2(2x-3)=4x-6\\\\-4(x^{2}-x)=-4x^{2}+4x\\end{gathered}$',
        takeaway: {
            eu: 'Aurreko zenbakia gai guztietara iristen da, ez lehenengora bakarrik.',
            es: 'El número de delante llega a todos los términos, no solo al primero.',
            ar: 'العدد الذي في الأمام يصل إلى كل الحدود لا إلى الأول فقط.'
        },
        figure: (language) => <DistributiveFigure language={language} />
    },
    {
        id: 'equation',
        stage: 'equations',
        title: { eu: 'Berdintzak, identitateak eta ekuazioak', es: 'Igualdades, identidades y ecuaciones', ar: 'المساويات والمتطابقات والمعادلات' },
        goal: {
            eu: 'Ekuazio bat identitatetik bereiztea eta haren atalak ezagutzea.',
            es: 'Distinguir una ecuación de una identidad y conocer sus partes.',
            ar: 'تمييز المعادلة من المتطابقة ومعرفة أجزائها.'
        },
        explanation: {
            eu: 'Berdintza bi adierazpen berdin (=) ikurraz lotzen dituena da: zenbakizkoa ($5+2=7$) edo aljebraikoa ($10+x=13$). Identitatea letren edozein baliotarako betetzen den berdintza aljebraikoa da ($x+x=2x$). Ekuazioa, berriz, letraren balio batzuetarako bakarrik betetzen da: $x+2=8$ $x=6$ denean bakarrik. Letra ezezaguna da, eta betetzen duen balioa, ebazpena.',
            es: 'Una igualdad une dos expresiones con el signo =: numérica ($5+2=7$) o algebraica ($10+x=13$). Una identidad es una igualdad algebraica que se cumple para cualquier valor de las letras ($x+x=2x$). Una ecuación, en cambio, solo se cumple para algunos valores: $x+2=8$ solo cuando $x=6$. La letra es la incógnita y el valor que la cumple, la solución.',
            ar: 'المساواة تربط عبارتين بالعلامة =: عددية ($5+2=7$) أو جبرية ($10+x=13$). والمتطابقة مساواة جبرية تتحقق لأي قيمة للحروف ($x+x=2x$). أما المعادلة فلا تتحقق إلا لبعض القيم: $x+2=8$ فقط عندما $x=6$. والحرف هو المجهول، والقيمة التي تحققها هي الحل.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Atalak', es: 'Miembros', ar: 'الطرفان' }, text: { eu: '= ikurraren ezkerrean lehen atala dago, eta eskuinean bigarrena.', es: 'A la izquierda del = está el primer miembro y a la derecha, el segundo.', ar: 'على يسار = الطرف الأول وعلى يمينه الطرف الثاني.' }, math: '$2x+1=7$' },
            { title: { eu: 'Gaiak', es: 'Términos', ar: 'الحدود' }, text: { eu: 'Atal bakoitzeko batugaiak: $2x$, $1$ eta $7$.', es: 'Los sumandos de cada miembro: $2x$, $1$ y $7$.', ar: 'حدود كل طرف: $2x$ و$1$ و$7$.' } },
            { title: { eu: 'Egiaztatu', es: 'Comprobar', ar: 'التحقق' }, text: { eu: 'Ebazpena ordezkatuta, bi atalek balio bera ematen dute.', es: 'Al sustituir la solución, los dos miembros dan lo mismo.', ar: 'عند تعويض الحل يعطي الطرفان القيمة نفسها.' }, math: '$\\begin{gathered}x=3\\\\2\\cdot 3+1=7\\end{gathered}$' }
        ],
        example: { eu: '$\\begin{gathered}x+x=2x\\ \\text{(identitatea)}\\\\x+2=8\\ \\text{(ekuazioa)}\\end{gathered}$', es: '$\\begin{gathered}x+x=2x\\ \\text{(identidad)}\\\\x+2=8\\ \\text{(ecuación)}\\end{gathered}$', ar: '$x+x=2x\\qquad x+2=8$' },
        takeaway: {
            eu: 'Identitatea: beti egia. Ekuazioa: balio batzuetarako bakarrik.',
            es: 'Identidad: siempre verdadera. Ecuación: solo para algunos valores.',
            ar: 'المتطابقة: صحيحة دائمًا. المعادلة: لبعض القيم فقط.'
        }
    },
    {
        id: 'trial',
        stage: 'equations',
        title: { eu: 'Ekuazioak probatuz ebaztea', es: 'Resolver ecuaciones por tanteo', ar: 'حل المعادلات بالتجربة' },
        goal: {
            eu: 'Ekuazio errazak buruz eta probatuz ebaztea.',
            es: 'Resolver ecuaciones sencillas mentalmente y por tanteo.',
            ar: 'حل معادلات بسيطة ذهنيًا وبالتجربة.'
        },
        explanation: {
            eu: 'Ekuazio erraz asko buruz ebatz daitezke: $5+x=7$ ekuazioan galdetu «zenbat batu behar zaio 5i 7 lortzeko?». Bestela, probatu balioak eta begiratu bi atalak berdinak diren. Balio batekin atal bat handiegia bada, probatu txikiago bat, eta alderantziz.',
            es: 'Muchas ecuaciones sencillas se resuelven mentalmente: en $5+x=7$ pregúntate «¿cuánto hay que sumar a 5 para obtener 7?». Si no, prueba valores y mira si los dos miembros son iguales. Si con un valor un miembro se pasa, prueba uno menor, y al revés.',
            ar: 'تُحل معادلات بسيطة كثيرة ذهنيًا: في $5+x=7$ اسأل نفسك «كم نضيف إلى 5 لنحصل على 7؟». وإلا فجرّب قيمًا وانظر هل يتساوى الطرفان. وإذا زاد أحد الطرفين بقيمة ما فجرّب قيمة أصغر، وبالعكس.'
        },
        problem: { eu: 'Ebatzi probatuz: $2x+3=11$.', es: 'Resuelve por tanteo: $2x+3=11$.', ar: 'حلّ بالتجربة: $2x+3=11$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Probatu $x=3$: gutxiegi.', es: 'Prueba $x=3$: se queda corto.', ar: 'جرّب $x=3$: أقل من اللازم.' }, math: '$2\\cdot 3+3=9$' },
            { text: { eu: 'Probatu $x=5$: gehiegi.', es: 'Prueba $x=5$: se pasa.', ar: 'جرّب $x=5$: أكثر من اللازم.' }, math: '$2\\cdot 5+3=13$' },
            { text: { eu: 'Probatu $x=4$: zehatz-mehatz.', es: 'Prueba $x=4$: exacto.', ar: 'جرّب $x=4$: تمامًا.' }, math: '$2\\cdot 4+3=11$' }
        ],
        example: '$11-x=6\\ \\to\\ x=5$',
        takeaway: {
            eu: 'Probatu, alderatu eta zuzendu: handiegia ala txikiegia?',
            es: 'Prueba, compara y corrige: ¿se pasa o se queda corto?',
            ar: 'جرّب وقارن وصحّح: هل زاد أم نقص؟'
        }
    },
    {
        id: 'transpose',
        stage: 'equations',
        title: { eu: 'Gaiak atalez aldatzea', es: 'Transposición de términos', ar: 'نقل الحدود' },
        goal: {
            eu: 'Ekuazio errazak ebaztea gaiak atal batetik bestera pasatuz.',
            es: 'Resolver ecuaciones sencillas pasando términos de un miembro a otro.',
            ar: 'حل معادلات بسيطة بنقل الحدود من طرف إلى آخر.'
        },
        explanation: {
            eu: 'Ekuazioa balantza orekatu bat bezalakoa da: bi aldeetan gauza bera egiten bada, orekan jarraitzen du. Horregatik, gai bat atal batetik bestera pasa daiteke: batzen ari dena kentzen pasatzen da, eta kentzen ari dena batzen. Biderkatzen ari dena zatitzen pasatzen da, eta zatitzen ari dena biderkatzen. Helburua x bakarrik uztea da: x askatzea.',
            es: 'Una ecuación es como una balanza en equilibrio: si se hace lo mismo en los dos platos, sigue equilibrada. Por eso un término puede pasar de un miembro al otro: lo que está sumando pasa restando, y lo que resta, sumando. Lo que multiplica pasa dividiendo, y lo que divide, multiplicando. El objetivo es dejar la x sola: despejarla.',
            ar: 'المعادلة كميزان متوازن: إذا فعلنا الشيء نفسه في الكفتين يبقى متوازنًا. لذلك يمكن نقل حد من طرف إلى آخر: ما يُجمع ينتقل مطروحًا، وما يُطرح ينتقل مجموعًا. وما يَضرب ينتقل قاسمًا، وما يَقسم ينتقل ضاربًا. والهدف إبقاء x وحده: عزله.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Batzen → kentzen', es: 'Sumando → restando', ar: 'مجموع ← مطروح' }, text: { eu: '+2 bigarren atalera kentzen pasatzen da.', es: 'El +2 pasa al segundo miembro restando.', ar: 'ينتقل +2 إلى الطرف الثاني مطروحًا.' }, math: '$\\begin{gathered}x+2=8\\\\x=8-2=6\\end{gathered}$' },
            { title: { eu: 'Kentzen → batzen', es: 'Restando → sumando', ar: 'مطروح ← مجموع' }, text: { eu: '−7 batzen pasatzen da.', es: 'El −7 pasa sumando.', ar: 'ينتقل −7 مجموعًا.' }, math: '$\\begin{gathered}x-7=3\\\\x=3+7=10\\end{gathered}$' },
            { title: { eu: 'Biderkatzen → zatitzen', es: 'Multiplicando → dividiendo', ar: 'ضارب ← قاسم' }, text: { eu: 'x-ren aurreko 4a zatitzen pasatzen da.', es: 'El 4 que multiplica a la x pasa dividiendo.', ar: 'ينتقل 4 الذي يضرب x قاسمًا.' }, math: '$\\begin{gathered}4x=20\\\\x=20\\mathbin{:}4=5\\end{gathered}$' },
            { title: { eu: 'Zatitzen → biderkatzen', es: 'Dividiendo → multiplicando', ar: 'قاسم ← ضارب' }, text: { eu: 'x zatitzen duen 2a biderkatzen pasatzen da.', es: 'El 2 que divide a la x pasa multiplicando.', ar: 'ينتقل 2 الذي يقسم x ضاربًا.' }, math: '$\\begin{gathered}\\frac{x}{2}=6\\\\x=6\\cdot 2=12\\end{gathered}$' }
        ],
        example: '$3x=12\\ \\to\\ x=4$',
        takeaway: {
            eu: 'Atalez aldatzean, gaiak kontrako eragiketa egiten du.',
            es: 'Al cambiar de miembro, el término hace la operación contraria.',
            ar: 'عند تغيير الطرف يقوم الحد بالعملية العكسية.'
        },
        figure: (language) => <BalanceFigure language={language} />
    },
    {
        id: 'solve',
        stage: 'equations',
        title: { eu: 'Lehen mailako ekuazioak ebaztea', es: 'Resolver ecuaciones de primer grado', ar: 'حل معادلات الدرجة الأولى' },
        goal: {
            eu: 'Bi ataletan x duten ekuazioak eta parentesidun ekuazioak ebaztea.',
            es: 'Resolver ecuaciones con x en los dos miembros y con paréntesis.',
            ar: 'حل معادلات فيها x في الطرفين ومعادلات بأقواس.'
        },
        explanation: {
            eu: 'Ekuazio luzeago bat ebazteko, urrats hauek jarraitzen dira ordenan: kendu parentesiak, bildu x duten gaiak atal batean eta zenbakiak bestean, laburtu, askatu x eta egiaztatu ebazpena hasierako ekuazioan.',
            es: 'Para resolver una ecuación más larga se siguen estos pasos en orden: quita los paréntesis, agrupa los términos con x en un miembro y los números en el otro, reduce, despeja la x y comprueba la solución en la ecuación inicial.',
            ar: 'لحل معادلة أطول نتبع هذه الخطوات بالترتيب: احذف الأقواس، واجمع الحدود التي فيها x في طرف والأعداد في الآخر، وبسّط، واعزل x، وتحقق من الحل في المعادلة الأصلية.'
        },
        problem: { eu: 'Ebatzi $4x-7=3-x$.', es: 'Resuelve $4x-7=3-x$.', ar: 'حلّ $4x-7=3-x$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'x-ak ezkerrera (−x batzen pasatzen da) eta zenbakiak eskuinera (−7 batzen).', es: 'Las x a la izquierda (−x pasa sumando) y los números a la derecha (−7 pasa sumando).', ar: 'الـ x إلى اليسار (ينتقل −x مجموعًا) والأعداد إلى اليمين (ينتقل −7 مجموعًا).' }, math: '$4x+x=3+7$' },
            { text: { eu: 'Laburtu.', es: 'Reduce.', ar: 'بسّط.' }, math: '$5x=10$' },
            { text: { eu: 'Askatu x: 5a zatitzen pasatzen da.', es: 'Despeja la x: el 5 pasa dividiendo.', ar: 'اعزل x: ينتقل 5 قاسمًا.' }, math: '$x=10\\mathbin{:}5=2$' },
            { text: { eu: 'Egiaztatu: bi atalek −1 ematen dute.', es: 'Comprueba: los dos miembros dan −1.', ar: 'تحقّق: يعطي الطرفان −1.' }, math: '$4\\cdot 2-7=3-2$' }
        ],
        example: '$\\begin{gathered}3(x-3)=x+1\\\\3x-9=x+1\\ \\to\\ x=5\\end{gathered}$',
        takeaway: {
            eu: 'Parentesiak → bildu → laburtu → askatu → egiaztatu.',
            es: 'Paréntesis → agrupar → reducir → despejar → comprobar.',
            ar: 'الأقواس ← التجميع ← التبسيط ← العزل ← التحقق.'
        }
    },
    {
        id: 'problems',
        stage: 'problems',
        title: { eu: 'Buruketak ekuazioekin', es: 'Problemas con ecuaciones', ar: 'مسائل بالمعادلات' },
        goal: {
            eu: 'Buruketa bat ekuazio batekin planteatzea eta ebaztea.',
            es: 'Plantear y resolver un problema con una ecuación.',
            ar: 'صياغة مسألة بمعادلة وحلها.'
        },
        explanation: {
            eu: 'Ekuazio bat buruketa bat ebazteko tresna da. Lau urrats: 1) irakurri eta erabaki zer den ezezaguna (x); 2) itzuli enuntziatua ekuazio batera; 3) ebatzi ekuazioa; 4) egiaztatu emaitzak zentzua duela eta erantzun esaldi batez.',
            es: 'Una ecuación es una herramienta para resolver problemas. Cuatro pasos: 1) lee y decide cuál es la incógnita (x); 2) traduce el enunciado a una ecuación; 3) resuelve la ecuación; 4) comprueba que el resultado tiene sentido y responde con una frase.',
            ar: 'المعادلة أداة لحل المسائل. أربع خطوات: 1) اقرأ وحدّد المجهول (x)؛ 2) ترجم نص المسألة إلى معادلة؛ 3) حلّ المعادلة؛ 4) تحقّق من أن النتيجة معقولة وأجب بجملة.'
        },
        problem: { eu: 'Zenbaki baten hirukoitza gehi 5 eta 26 da. Zein da zenbakia?', es: 'El triple de un número más 5 es 26. ¿Qué número es?', ar: 'ثلاثة أضعاف عدد زائد 5 تساوي 26. ما العدد؟' },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'Ezezaguna', es: 'Incógnita', ar: 'المجهول' }, text: { eu: 'x = zenbakia.', es: 'x = el número.', ar: 'x = العدد.' } },
            { title: { eu: 'Ekuazioa', es: 'Ecuación', ar: 'المعادلة' }, text: { eu: 'Hirukoitza gehi 5 berdin 26.', es: 'El triple más 5 es igual a 26.', ar: 'ثلاثة الأضعاف زائد 5 يساوي 26.' }, math: '$3x+5=26$' },
            { title: { eu: 'Ebatzi', es: 'Resuelve', ar: 'حلّ' }, text: { eu: '5a kentzen pasatu eta gero 3a zatitzen.', es: 'Pasa el 5 restando y después el 3 dividiendo.', ar: 'انقل 5 مطروحًا ثم 3 قاسمًا.' }, math: '$3x=21\\ \\to\\ x=7$' },
            { title: { eu: 'Egiaztatu eta erantzun', es: 'Comprueba y responde', ar: 'تحقّق وأجب' }, text: { eu: 'Zenbakia 7 da.', es: 'El número es 7.', ar: 'العدد هو 7.' }, math: '$3\\cdot 7+5=26$' }
        ],
        example: '$x+(x+1)=25\\ \\to\\ x=12$',
        takeaway: {
            eu: 'Ezezaguna → ekuazioa → ebatzi → egiaztatu eta erantzun.',
            es: 'Incógnita → ecuación → resolver → comprobar y responder.',
            ar: 'المجهول ← المعادلة ← الحل ← التحقق والجواب.'
        }
    }
]

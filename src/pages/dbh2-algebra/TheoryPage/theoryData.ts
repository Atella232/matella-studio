import type { LocalizedText } from '../content'

export type TheoryTabId = 'lenguaje' | 'monomios' | 'opmonomios' | 'polinomios' | 'oppolinomios' | 'notables' | 'factor'

export interface TabMeta {
    id: TheoryTabId
    icon: string
    label: LocalizedText
}

export interface TableRow {
    cells: LocalizedText[]
}

export interface FactorExample {
    title: LocalizedText
    lines: LocalizedText[]
}

export interface TheoryInfoCell {
    value: string
    label: LocalizedText
    tone?: 'purple' | 'blue' | 'cyan'
    math?: boolean
}

export interface TheoryExampleBox {
    tone: 'purple' | 'blue' | 'cyan' | 'green' | 'red'
    label: LocalizedText
    text?: LocalizedText
    lines?: LocalizedText[]
}

export interface TheoryCardData {
    icon: string
    tone: 'purple' | 'blue' | 'cyan' | 'green' | 'red'
    title: LocalizedText
    body?: LocalizedText
    infoCells?: TheoryInfoCell[]
    formula?: {
        tone: 'purple' | 'blue' | 'cyan' | 'green' | 'red'
        label?: LocalizedText
        text: LocalizedText
        large?: boolean
    }
    mutedLine?: LocalizedText
    example?: TheoryExampleBox
    examples?: TheoryExampleBox[]
    steps?: LocalizedText[]
    simple?: boolean
}

export interface TheoryWideBlockData {
    title: LocalizedText
    description: LocalizedText
}

export interface NotableCardData {
    tone: 'purple' | 'blue' | 'cyan'
    title: LocalizedText
    formula: string
    example: string
}

export const theoryUiLabels = {
    headerTitle: { eu: 'Aljebraren Teoria', es: 'Teoria de Algebra', ar: 'نظرية الجبر' },
    headerSubtitle: {
        eu: 'Gai bakoitza osorik: definizioak, adibideak, taulak eta egitura bisualak.',
        es: 'Cada tema completo: definiciones, ejemplos, tablas y estructuras visuales.',
        ar: 'كل موضوع كامل: تعريفات وأمثلة وجداول وبنى بصرية.'
    },
    example: { eu: 'Adibidea', es: 'Ejemplo', ar: 'مثال' },
    examples: { eu: 'Adibideak', es: 'Ejemplos', ar: 'أمثلة' },
    realExample: { eu: 'Bizitza errealeko adibidea', es: 'Ejemplo de la vida real', ar: 'مثال من الحياة' },
    noteImportant: { eu: 'Ohar garrantzitsua', es: 'Nota importante', ar: 'ملاحظة مهمة' },
    formGeneral: { eu: 'Forma orokorra', es: 'Forma general', ar: 'الصيغة العامة' },
    process: { eu: 'Prozesua', es: 'Proceso', ar: 'العملية' },
    principle: { eu: 'Printzipioa', es: 'Principio', ar: 'المبدأ' },
    rule: { eu: 'Araua', es: 'Regla', ar: 'القاعدة' },
    memorize: { eu: 'Gogoratzeko trikimailua', es: 'Truco para memorizar', ar: 'حيلة للتذكر' },
    anotherExample: { eu: 'Beste adibide bat', es: 'Otro ejemplo', ar: 'مثال آخر' },
    statement: { eu: 'Esaldia', es: 'Enunciado', ar: 'العبارة' },
    expression: { eu: 'Adierazpen aljebraikoa', es: 'Expresion algebraica', ar: 'التعبير الجبري' },
    monomial: { eu: 'Monomioa', es: 'Monomio', ar: 'الحد الأحادي' },
    coefficient: { eu: 'Koefizientea', es: 'Coeficiente', ar: 'المعامل' },
    literalPart: { eu: 'Zati literala', es: 'Parte literal', ar: 'الجزء الحرفي' },
    degree: { eu: 'Gradua', es: 'Grado', ar: 'الدرجة' },
    operation: { eu: 'Eragiketa', es: 'Operacion', ar: 'العملية' },
    condition: { eu: 'Baldintza', es: 'Condicion', ar: 'الشرط' },
    coefficients: { eu: 'Koefizienteak', es: 'Coeficientes', ar: 'المعاملات' },
    exponents: { eu: 'Berretzaileak', es: 'Exponentes', ar: 'الأسس' }
} satisfies Record<string, LocalizedText>

export const theorySectionTitles = {
    completeExamplesTable: { eu: 'Adibide osoen taula', es: 'Tabla de ejemplos completos', ar: 'جدول امثلة كاملة' },
    monomialOperationsSummary: { eu: 'Eragiketen laburpena', es: 'Resumen de operaciones', ar: 'ملخص العمليات' },
    factorStepExamples: { eu: 'Urratsez urratseko adibideak', es: 'Ejemplos paso a paso', ar: 'امثلة خطوة خطوة' }
} satisfies Record<string, LocalizedText>

export const theoryTabs: TabMeta[] = [
    { id: 'lenguaje', icon: '🔤', label: { eu: 'Hizkuntza', es: 'Lenguaje', ar: 'اللغة' } },
    { id: 'monomios', icon: '🔷', label: { eu: 'Monomioak', es: 'Monomios', ar: 'الحدود' } },
    { id: 'opmonomios', icon: '⚡', label: { eu: 'Eragiketak', es: 'Operaciones', ar: 'العمليات' } },
    { id: 'polinomios', icon: '📈', label: { eu: 'Polinomioak', es: 'Polinomios', ar: 'المتعددات' } },
    { id: 'oppolinomios', icon: '🧮', label: { eu: 'Eragiketak Poly', es: 'Operaciones Poly', ar: 'عمليات Poly' } },
    { id: 'notables', icon: '⭐', label: { eu: 'Nabarmenak', es: 'Notables', ar: 'النظائر' } },
    { id: 'factor', icon: '🔑', label: { eu: 'Faktorea', es: 'Factor', ar: 'العامل' } }
]

export const languageCards: TheoryCardData[] = [
    {
        icon: '🔤',
        tone: 'purple',
        title: { eu: 'Zer da aljebra?', es: 'Que es el algebra?', ar: 'ما هو الجبر؟' },
        body: {
            eu: 'Aljebra matematiken adarra da, eta letrak erabiltzen ditu kantitate ezezagun edo aldakorrak adierazteko. Harremanak modu orokorrean idazteko balio du.',
            es: 'El algebra es una rama de las matematicas que usa letras para representar cantidades desconocidas o variables. Nos permite expresar relaciones de forma general.',
            ar: 'الجبر فرع من الرياضيات يستخدم الحروف لتمثيل الكميات المجهولة او المتغيرة، ويسمح بكتابة العلاقات بشكل عام.'
        },
        example: {
            tone: 'purple',
            label: theoryUiLabels.realExample,
            text: {
                eu: 'Langile batek $x$ euroko oinarrizko soldata eta aparteko ordu bakoitzeko $16n$ kobratzen badu, guztira: $$S = x + 16n$$',
                es: 'Si una persona cobra un sueldo base de $x$ euros y $16n$ euros por horas extra, su salario total es: $$S = x + 16n$$',
                ar: 'اذا كان الشخص يتقاضى راتبا اساسيا قدره $x$ يورو و $16n$ يورو عن الساعات الاضافية، فان راتبه الكلي هو: $$S = x + 16n$$'
            }
        }
    },
    {
        icon: '📊',
        tone: 'blue',
        title: { eu: 'Aldagaiak eta konstanteak', es: 'Variables y constantes', ar: 'المتغيرات والثوابت' },
        body: {
            eu: 'Aldagaia balio desberdinak har ditzakeen letra da; konstantea, aldiz, zenbaki finkoa da.',
            es: 'Una variable es una letra que puede tomar distintos valores; una constante es un numero fijo.',
            ar: 'المتغير حرف يمكنه اخذ قيم مختلفة، اما الثابت فهو عدد ثابت.'
        },
        infoCells: [
            {
                value: 'x, y, a',
                label: { eu: 'Aldagaiak', es: 'Variables', ar: 'المتغيرات' }
            },
            {
                value: '$3, -7, \\pi$',
                label: { eu: 'Konstanteak', es: 'Constantes', ar: 'الثوابت' },
                math: true
            }
        ],
        example: {
            tone: 'blue',
            label: theoryUiLabels.noteImportant,
            text: {
                eu: 'Aldagaiek balio desberdinak har ditzakete; konstanteek, ez.',
                es: 'Las variables pueden tomar distintos valores; las constantes, no.',
                ar: 'المتغيرات يمكن ان تاخذ قيما مختلفة، اما الثوابت فلا.'
            }
        }
    }
]

export const languageTranslationBlock: TheoryWideBlockData = {
    title: { eu: 'Hizkuntza aljebraikora itzultzea', es: 'Traducir al lenguaje algebraico', ar: 'الترجمة الى اللغة الجبرية' },
    description: {
        eu: 'Aljebraren trebetasun garrantzitsuenetako bat hizkuntza arruntetik adierazpen aljebraikora pasatzea da.',
        es: 'Una de las habilidades mas importantes del algebra es pasar del lenguaje natural a expresiones algebraicas.',
        ar: 'من اهم مهارات الجبر تحويل اللغة العادية الى تعبيرات جبرية.'
    }
}

export const languageRows: TableRow[] = [
    { cells: [{ eu: 'Zenbaki baten hirukoitza', es: 'El triple de un numero', ar: 'ثلاثة اضعاف عدد' }, { eu: '$3x$', es: '$3x$', ar: '$3x$' }] },
    { cells: [{ eu: 'Zenbaki baten karratua', es: 'El cuadrado de un numero', ar: 'مربع عدد' }, { eu: '$x^2$', es: '$x^2$', ar: '$x^2$' }] },
    { cells: [{ eu: 'Zenbaki baten erdia gehi bost', es: 'La mitad de un numero mas cinco', ar: 'نصف عدد زائد خمسة' }, { eu: '$x/2 + 5$', es: '$x/2 + 5$', ar: '$x/2 + 5$' }] },
    { cells: [{ eu: 'Hurrengo zenbakia', es: 'El numero siguiente', ar: 'العدد التالي' }, { eu: '$x+1$', es: '$x+1$', ar: '$x+1$' }] }
]

export const monomialRows: TableRow[] = [
    { cells: [{ eu: '$5x^2yz$', es: '$5x^2yz$', ar: '$5x^2yz$' }, { eu: '$5$', es: '$5$', ar: '$5$' }, { eu: '$x^2yz$', es: '$x^2yz$', ar: '$x^2yz$' }, { eu: '$2+1+1=4$', es: '$2+1+1=4$', ar: '$2+1+1=4$' }] },
    { cells: [{ eu: '$-3ab^2c^3$', es: '$-3ab^2c^3$', ar: '$-3ab^2c^3$' }, { eu: '$-3$', es: '$-3$', ar: '$-3$' }, { eu: '$ab^2c^3$', es: '$ab^2c^3$', ar: '$ab^2c^3$' }, { eu: '$1+2+3=6$', es: '$1+2+3=6$', ar: '$1+2+3=6$' }] },
    { cells: [{ eu: '$-5m^4$', es: '$-5m^4$', ar: '$-5m^4$' }, { eu: '$-5$', es: '$-5$', ar: '$-5$' }, { eu: '$m^4$', es: '$m^4$', ar: '$m^4$' }, { eu: '$4$', es: '$4$', ar: '$4$' }] },
    { cells: [{ eu: '$2xy^2$', es: '$2xy^2$', ar: '$2xy^2$' }, { eu: '$2$', es: '$2$', ar: '$2$' }, { eu: '$xy^2$', es: '$xy^2$', ar: '$xy^2$' }, { eu: '$1+2=3$', es: '$1+2=3$', ar: '$1+2=3$' }] },
    { cells: [{ eu: '$6n^4$', es: '$6n^4$', ar: '$6n^4$' }, { eu: '$6$', es: '$6$', ar: '$6$' }, { eu: '$n^4$', es: '$n^4$', ar: '$n^4$' }, { eu: '$4$', es: '$4$', ar: '$4$' }] },
    { cells: [{ eu: '$-2$', es: '$-2$', ar: '$-2$' }, { eu: '$-2$', es: '$-2$', ar: '$-2$' }, { eu: '-', es: '-', ar: '-' }, { eu: '$0$', es: '$0$', ar: '$0$' }] },
    { cells: [{ eu: '$abc$', es: '$abc$', ar: '$abc$' }, { eu: '$1$', es: '$1$', ar: '$1$' }, { eu: '$abc$', es: '$abc$', ar: '$abc$' }, { eu: '$1+1+1=3$', es: '$1+1+1=3$', ar: '$1+1+1=3$' }] }
]

export const monomialIntroCards: TheoryCardData[] = [
    {
        icon: '🔷',
        tone: 'purple',
        title: { eu: 'Zer da monomio bat?', es: 'Que es un monomio?', ar: 'ما هو الحد الاحادي؟' },
        body: {
            eu: 'Monomioa termino bakar batez osatutako adierazpen aljebraikoa da: zenbakien eta aldagaien biderkadura berretzaile positiboekin.',
            es: 'Un monomio es una expresion algebraica formada por un solo termino: producto de numeros y variables con exponentes positivos.',
            ar: 'الحد الاحادي تعبير جبري مكون من حد واحد: حاصل ضرب اعداد ومتغيرات باسس موجبة.'
        },
        formula: {
            tone: 'purple',
            label: theoryUiLabels.formGeneral,
            text: {
                eu: '$$a \\cdot x^m \\cdot y^n \\cdot z^p \\cdots$$',
                es: '$$a \\cdot x^m \\cdot y^n \\cdot z^p \\cdots$$',
                ar: '$$a \\cdot x^m \\cdot y^n \\cdot z^p \\cdots$$'
            }
        },
        mutedLine: {
            eu: 'Adibideak: $5x^2y$, $-3ab^2c^3$, $7n^4$, $-2$',
            es: 'Ejemplos: $5x^2y$, $-3ab^2c^3$, $7n^4$, $-2$',
            ar: 'امثلة: $5x^2y$, $-3ab^2c^3$, $7n^4$, $-2$'
        }
    },
    {
        icon: '🧩',
        tone: 'blue',
        title: { eu: 'Monomio baten atalak', es: 'Partes de un monomio', ar: 'اجزاء الحد الاحادي' },
        formula: {
            tone: 'blue',
            large: true,
            text: {
                eu: '$$\\underbrace{5}_{\\text{koef.}} \\cdot \\underbrace{x^2yz}_{\\text{zati literala}}$$',
                es: '$$\\underbrace{5}_{\\text{coef.}} \\cdot \\underbrace{x^2yz}_{\\text{parte literal}}$$',
                ar: '$$\\underbrace{5}_{\\text{المعامل}} \\cdot \\underbrace{x^2yz}_{\\text{الجزء الحرفي}}$$'
            }
        },
        infoCells: [
            { value: '5', tone: 'purple', label: theoryUiLabels.coefficient },
            { value: '$x^2yz$', tone: 'blue', label: theoryUiLabels.literalPart, math: true },
            { value: '4', tone: 'cyan', label: { eu: 'Gradua (2+1+1)', es: 'Grado (2+1+1)', ar: 'الدرجة (2+1+1)' } }
        ]
    }
]

export const monomialRelationCards: TheoryCardData[] = [
    {
        icon: '🤝',
        tone: 'green',
        title: { eu: 'Monomio antzekoak', es: 'Monomios semejantes', ar: 'حدود متشابهة' },
        body: {
            eu: 'Bi monomio antzekoak dira zati literala berdina badute, hau da, aldagai eta berretzaile berberak.',
            es: 'Dos monomios son semejantes si tienen exactamente la misma parte literal.',
            ar: 'يكون حدان متشابهين اذا كان لهما نفس الجزء الحرفي تماما.'
        },
        examples: [
            {
                tone: 'purple',
                label: { eu: 'Antzekoak dira', es: 'Son semejantes', ar: 'متشابهان' },
                text: {
                    eu: '$3x^2$ eta $-7x^2$ → $x^2$ zati literala bera',
                    es: '$3x^2$ y $-7x^2$ → misma parte literal $x^2$',
                    ar: '$3x^2$ و $-7x^2$ → نفس الجزء الحرفي $x^2$'
                }
            },
            {
                tone: 'blue',
                label: { eu: 'Ez dira antzekoak', es: 'No son semejantes', ar: 'ليسا متشابهين' },
                lines: [
                    {
                        eu: '$3x^2$ eta $-7x^3$ → berretzaile desberdina',
                        es: '$3x^2$ y $-7x^3$ → distinto exponente',
                        ar: '$3x^2$ و $-7x^3$ → اس مختلف'
                    },
                    {
                        eu: '$5xy$ eta $5x^2y$ → zati literala desberdina',
                        es: '$5xy$ y $5x^2y$ → parte literal distinta',
                        ar: '$5xy$ و $5x^2y$ → جزء حرفي مختلف'
                    }
                ]
            }
        ]
    },
    {
        icon: '🔄',
        tone: 'red',
        title: { eu: 'Monomio aurkakoa', es: 'Monomio opuesto', ar: 'الحد المعاكس' },
        body: {
            eu: 'Monomio aurkakoa koefizientearen zeinua aldatuta lortzen da. Beti dira antzekoak.',
            es: 'El monomio opuesto se obtiene cambiando el signo del coeficiente. Siempre son semejantes.',
            ar: 'يتم الحصول على الحد المعاكس بتغيير اشارة المعامل. وهما دائما متشابهان.'
        },
        formula: {
            tone: 'purple',
            label: { eu: 'Formula', es: 'Formula', ar: 'الصيغة' },
            text: {
                eu: '$$\\text{aurkakoa}(ax^n) = -ax^n$$',
                es: '$$\\text{opuesto}(ax^n) = -ax^n$$',
                ar: '$$\\text{المعاكس}(ax^n) = -ax^n$$'
            }
        },
        example: {
            tone: 'purple',
            label: theoryUiLabels.examples,
            text: {
                eu: 'Aurkakoa: $4x^2y \\to -4x^2y$ eta $-3ab^2 \\to 3ab^2$',
                es: 'Opuesto: $4x^2y \\to -4x^2y$ y $-3ab^2 \\to 3ab^2$',
                ar: 'المعاكس: $4x^2y \\to -4x^2y$ و $-3ab^2 \\to 3ab^2$'
            }
        }
    }
]

export const opMonomialRows: TableRow[] = [
    { cells: [{ eu: 'Batuketa / kenketa', es: 'Suma / resta', ar: 'الجمع / الطرح' }, { eu: 'Monomio antzekoak', es: 'Monomios semejantes', ar: 'حدود متشابهة' }, { eu: 'Batu edo kendu', es: 'Se suman o restan', ar: 'نجمع او نطرح' }, { eu: 'Mantendu', es: 'Se conserva', ar: 'يبقى كما هو' }, { eu: '$3x^2+5x^2=8x^2$', es: '$3x^2+5x^2=8x^2$', ar: '$3x^2+5x^2=8x^2$' }] },
    { cells: [{ eu: 'Biderketa', es: 'Multiplicacion', ar: 'الضرب' }, { eu: 'Beti', es: 'Siempre', ar: 'دائما' }, { eu: 'Biderkatu', es: 'Se multiplican', ar: 'نضرب' }, { eu: 'Batu', es: 'Se suman', ar: 'نجمع' }, { eu: '$2x^2\\cdot3x^3=6x^5$', es: '$2x^2\\cdot3x^3=6x^5$', ar: '$2x^2\\cdot3x^3=6x^5$' }] },
    { cells: [{ eu: 'Zatiketa', es: 'Division', ar: 'القسمة' }, { eu: 'Zatitzailea 0 ez', es: 'Divisor distinto de 0', ar: 'المقسوم عليه لا يساوي 0' }, { eu: 'Zatitu', es: 'Se dividen', ar: 'نقسم' }, { eu: 'Kendu', es: 'Se restan', ar: 'نطرح' }, { eu: '$12x^5\\div4x^2=3x^3$', es: '$12x^5\\div4x^2=3x^3$', ar: '$12x^5\\div4x^2=3x^3$' }] }
]

export const opMonomialCards: TheoryCardData[] = [
    {
        icon: '➕',
        tone: 'purple',
        title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta de monomios', ar: 'جمع وطرح الحدود الاحادية' },
        body: {
            eu: 'Monomio antzekoak bakarrik batu edo kendu daitezke. Koefizienteak eragiten dira eta zati literala mantentzen da.',
            es: 'Solo se pueden sumar o restar monomios semejantes. Se operan los coeficientes y se conserva la parte literal.',
            ar: 'لا يمكن جمع او طرح الا الحدود المتشابهة. نعمل على المعاملات ونحافظ على الجزء الحرفي.'
        },
        formula: {
            tone: 'purple',
            label: theoryUiLabels.rule,
            text: { eu: '$$ax^n + bx^n = (a+b)x^n$$', es: '$$ax^n + bx^n = (a+b)x^n$$', ar: '$$ax^n + bx^n = (a+b)x^n$$' }
        },
        example: {
            tone: 'purple',
            label: theoryUiLabels.examples,
            lines: [
                { eu: '$3x^2 + 5x^2 = 8x^2$', es: '$3x^2 + 5x^2 = 8x^2$', ar: '$3x^2 + 5x^2 = 8x^2$' },
                { eu: '$7ab - 3ab = 4ab$', es: '$7ab - 3ab = 4ab$', ar: '$7ab - 3ab = 4ab$' },
                { eu: '$3x^2 + 2y$ → ezin da sinplifikatu', es: '$3x^2 + 2y$ → no se puede reducir', ar: '$3x^2 + 2y$ → لا يمكن تبسيطه' }
            ]
        }
    },
    {
        icon: '✖️',
        tone: 'blue',
        title: { eu: 'Monomioen biderketa', es: 'Multiplicacion de monomios', ar: 'ضرب الحدود الاحادية' },
        body: {
            eu: 'Beti biderka daitezke. Koefizienteak biderkatu eta aldagai berdinen berretzaileak batu egiten dira.',
            es: 'Siempre se pueden multiplicar. Se multiplican los coeficientes y se suman los exponentes de las mismas variables.',
            ar: 'يمكن ضربها دائما. نضرب المعاملات ونجمع اسس المتغيرات المتشابهة.'
        },
        formula: {
            tone: 'blue',
            label: theoryUiLabels.rule,
            text: { eu: '$$ax^m \\cdot bx^n = (a \\cdot b)x^{m+n}$$', es: '$$ax^m \\cdot bx^n = (a \\cdot b)x^{m+n}$$', ar: '$$ax^m \\cdot bx^n = (a \\cdot b)x^{m+n}$$' }
        },
        example: {
            tone: 'blue',
            label: theoryUiLabels.examples,
            lines: [
                { eu: '$3x^2 \\cdot 4x^3 = 12x^5$', es: '$3x^2 \\cdot 4x^3 = 12x^5$', ar: '$3x^2 \\cdot 4x^3 = 12x^5$' },
                { eu: '$2ab \\cdot 3a^2b = 6a^3b^2$', es: '$2ab \\cdot 3a^2b = 6a^3b^2$', ar: '$2ab \\cdot 3a^2b = 6a^3b^2$' },
                { eu: '$(-2x)(5x^3) = -10x^4$', es: '$(-2x)(5x^3) = -10x^4$', ar: '$(-2x)(5x^3) = -10x^4$' }
            ]
        }
    },
    {
        icon: '➗',
        tone: 'cyan',
        title: { eu: 'Monomioen zatiketa', es: 'Division de monomios', ar: 'قسمة الحدود الاحادية' },
        body: {
            eu: 'Koefizienteak zatitu eta aldagai berdinen berretzaileak kendu egiten dira.',
            es: 'Se dividen los coeficientes y se restan los exponentes de las mismas variables.',
            ar: 'نقسم المعاملات ونطرح اسس المتغيرات المتشابهة.'
        },
        formula: {
            tone: 'cyan',
            label: theoryUiLabels.rule,
            text: { eu: '$$ax^m \\div bx^n = \\frac{a}{b}x^{m-n}$$', es: '$$ax^m \\div bx^n = \\frac{a}{b}x^{m-n}$$', ar: '$$ax^m \\div bx^n = \\frac{a}{b}x^{m-n}$$' }
        },
        example: {
            tone: 'cyan',
            label: theoryUiLabels.examples,
            lines: [
                { eu: '$12x^5 \\div 4x^2 = 3x^3$', es: '$12x^5 \\div 4x^2 = 3x^3$', ar: '$12x^5 \\div 4x^2 = 3x^3$' },
                { eu: '$15a^3b^2 \\div 5ab = 3a^2b$', es: '$15a^3b^2 \\div 5ab = 3a^2b$', ar: '$15a^3b^2 \\div 5ab = 3a^2b$' },
                { eu: '$-8x^4 \\div 2x^4 = -4$', es: '$-8x^4 \\div 2x^4 = -4$', ar: '$-8x^4 \\div 2x^4 = -4$' }
            ]
        }
    }
]

export const polynomialCards: TheoryCardData[] = [
    {
        icon: '📈',
        tone: 'purple',
        title: { eu: 'Zer da polinomio bat?', es: 'Que es un polinomio?', ar: 'ما هي كثيرة الحدود؟' },
        body: {
            eu: 'Polinomioa monomioen batura edo kenketa da. Monomio bakoitza termino bat da.',
            es: 'Un polinomio es una suma o resta de monomios. Cada monomio es un termino del polinomio.',
            ar: 'كثيرة الحدود هي مجموع او فرق حدود احادية، وكل حد احادي يمثل حدا داخلها.'
        },
        formula: {
            tone: 'purple',
            label: theoryUiLabels.formGeneral,
            text: {
                eu: '$$P(x)=a_nx^n+a_{n-1}x^{n-1}+\\cdots+a_1x+a_0$$',
                es: '$$P(x)=a_nx^n+a_{n-1}x^{n-1}+\\cdots+a_1x+a_0$$',
                ar: '$$P(x)=a_nx^n+a_{n-1}x^{n-1}+\\cdots+a_1x+a_0$$'
            }
        },
        example: {
            tone: 'purple',
            label: theoryUiLabels.example,
            text: { eu: '$P(x)=3x^4-5x^2+2x-7$', es: '$P(x)=3x^4-5x^2+2x-7$', ar: '$P(x)=3x^4-5x^2+2x-7$' }
        }
    },
    {
        icon: '🏆',
        tone: 'blue',
        title: { eu: 'Gradua eta termino independentea', es: 'Grado y termino independiente', ar: 'الدرجة والحد المستقل' },
        body: {
            eu: 'Gradua agertzen den berretzailerik handiena da. Termino independentea aldagairik ez duen terminoa da.',
            es: 'El grado es el mayor exponente que aparece. El termino independiente es el termino sin variables.',
            ar: 'الدرجة هي اكبر اس يظهر. والحد المستقل هو الحد الذي لا يحتوي على متغيرات.'
        },
        example: {
            tone: 'blue',
            label: theoryUiLabels.example,
            lines: [
                { eu: '$P(x)=11x^3-5x^2-3x+7$', es: '$P(x)=11x^3-5x^2-3x+7$', ar: '$P(x)=11x^3-5x^2-3x+7$' },
                { eu: 'Gradua: 3 · 4 termino · Termino independentea: 7', es: 'Grado: 3 · 4 terminos · Termino independiente: 7', ar: 'الدرجة: 3 · 4 حدود · الحد المستقل: 7' }
            ]
        }
    },
    {
        icon: '🔢',
        tone: 'cyan',
        title: { eu: 'Balio numerikoa', es: 'Valor numerico', ar: 'القيمة العددية' },
        body: {
            eu: 'Balio numerikoa lortzeko, aldagaiaren ordez zenbaki konkretu bat jartzen da eta kalkulua egiten da.',
            es: 'El valor numerico se obtiene sustituyendo la variable por un numero concreto.',
            ar: 'تحسب القيمة العددية بتعويض المتغير بعدد محدد.'
        },
        formula: {
            tone: 'cyan',
            label: theoryUiLabels.process,
            text: {
                eu: 'Si $P(x)=x^2-3x+1$: $$P(2)=4-6+1=-1$$ $$P(-1)=1+3+1=5$$',
                es: 'Si $P(x)=x^2-3x+1$: $$P(2)=4-6+1=-1$$ $$P(-1)=1+3+1=5$$',
                ar: 'اذا كانت $P(x)=x^2-3x+1$: $$P(2)=4-6+1=-1$$ $$P(-1)=1+3+1=5$$'
            }
        }
    },
    {
        icon: '🔄',
        tone: 'red',
        title: { eu: 'Polinomio aurkakoa', es: 'Polinomio opuesto', ar: 'كثيرة الحدود المعاكسة' },
        body: {
            eu: 'Polinomio aurkakoa termino guztien zeinua aldatuz lortzen da, hau da, -1ez biderkatuz.',
            es: 'El polinomio opuesto se obtiene cambiando el signo de todos sus terminos.',
            ar: 'تحصل كثيرة الحدود المعاكسة بتغيير اشارة جميع حدودها.'
        },
        formula: {
            tone: 'purple',
            label: theoryUiLabels.example,
            text: {
                eu: 'Si $P(x)=3x^3-5x+2$: $$-P(x)=-3x^3+5x-2$$',
                es: 'Si $P(x)=3x^3-5x+2$: $$-P(x)=-3x^3+5x-2$$',
                ar: 'اذا كانت $P(x)=3x^3-5x+2$: $$-P(x)=-3x^3+5x-2$$'
            }
        }
    }
]

export const opPolynomialCards: TheoryCardData[] = [
    {
        icon: '➕',
        tone: 'purple',
        title: { eu: 'Polinomioen batura', es: 'Suma de polinomios', ar: 'جمع كثيرات الحدود' },
        body: { eu: 'Batzeko, termino antzekoak elkartu egiten dira.', es: 'Para sumar, se agrupan y suman los terminos semejantes.', ar: 'للجمع، يتم تجميع الحدود المتشابهة.' },
        formula: { tone: 'purple', label: theoryUiLabels.example, text: { eu: '$P=x^3-4x^2+2x$ $Q=3x^3-2x^2+1$ $$P+Q=4x^3-6x^2+2x+1$$', es: '$P=x^3-4x^2+2x$ $Q=3x^3-2x^2+1$ $$P+Q=4x^3-6x^2+2x+1$$', ar: '$P=x^3-4x^2+2x$ $Q=3x^3-2x^2+1$ $$P+Q=4x^3-6x^2+2x+1$$' } }
    },
    {
        icon: '➖',
        tone: 'red',
        title: { eu: 'Polinomioen kenketa', es: 'Resta de polinomios', ar: 'طرح كثيرات الحدود' },
        body: { eu: 'Kenketan, kendugaiaren zeinuak aldatzen dira eta gero batu egiten da.', es: 'En la resta, se cambian los signos del sustraendo y luego se suma.', ar: 'في الطرح نغير اشارات المطروح ثم نجمع.' },
        formula: { tone: 'purple', label: theoryUiLabels.example, text: { eu: '$P-Q=P+(-Q)$ $$(x^3-4x^2+2x)-(-2x^2+3x^3)=-2x^3-2x^2+2x$$', es: '$P-Q=P+(-Q)$ $$(x^3-4x^2+2x)-(-2x^2+3x^3)=-2x^3-2x^2+2x$$', ar: '$P-Q=P+(-Q)$ $$(x^3-4x^2+2x)-(-2x^2+3x^3)=-2x^3-2x^2+2x$$' } }
    },
    {
        icon: '✖️',
        tone: 'blue',
        title: { eu: 'Monomio batez biderkatzea', es: 'Multiplicacion por monomio', ar: 'الضرب في حد احادي' },
        body: { eu: 'Banaketa-propietatea aplikatzen da: monomioak polinomioko termino guztiak biderkatzen ditu.', es: 'Se aplica la distributiva: el monomio multiplica cada termino del polinomio.', ar: 'تطبق خاصية التوزيع: الحد الاحادي يضرب كل حدود كثيرة الحدود.' },
        formula: { tone: 'blue', label: theoryUiLabels.example, text: { eu: '$$3x^2(2x^2-x+4)=6x^4-3x^3+12x^2$$', es: '$$3x^2(2x^2-x+4)=6x^4-3x^3+12x^2$$', ar: '$$3x^2(2x^2-x+4)=6x^4-3x^3+12x^2$$' } }
    },
    {
        icon: '🔗',
        tone: 'cyan',
        title: { eu: 'Bi polinomioren biderketa', es: 'Multiplicacion de polinomios', ar: 'ضرب كثيرتي حدود' },
        body: { eu: 'Lehen polinomioko termino bakoitza bigarreneko guztiekin biderkatzen da eta gero antzekoak sinplifikatzen dira.', es: 'Cada termino del primero multiplica a todos los del segundo y luego se reducen semejantes.', ar: 'يضرب كل حد من الاول في كل حدود الثاني ثم تبسط الحدود المتشابهة.' },
        formula: { tone: 'cyan', label: theoryUiLabels.example, text: { eu: '$$(x+1)(x-2)=x(x-2)+1(x-2)=x^2-2x+x-2=x^2-x-2$$', es: '$$(x+1)(x-2)=x(x-2)+1(x-2)=x^2-2x+x-2=x^2-x-2$$', ar: '$$(x+1)(x-2)=x(x-2)+1(x-2)=x^2-2x+x-2=x^2-x-2$$' } }
    }
]

export const opPolynomialDivisionBlock = {
    title: { eu: 'Polinomioa monomio batez zatitzea', es: 'Division de polinomio entre monomio', ar: 'قسمة كثيرة حدود على حد احادي' },
    description: {
        eu: 'Polinomioko termino bakoitza monomio berarekin zatitzen da.',
        es: 'Se divide cada termino del polinomio entre el mismo monomio.',
        ar: 'يقسم كل حد من كثيرة الحدود على نفس الحد الاحادي.'
    },
    formula: '$$\\frac{10x^5+8x^3-6x^2+12x}{2x}=5x^4+4x^2-3x+6$$'
}

export const factorSteps: LocalizedText[] = [
    { eu: 'Begiratu termino guztiek zer zenbaki edo aldagai partekatzen duten.', es: 'Observa que numero o variable comparten todos los terminos.', ar: 'ابحث عما تشترك فيه جميع الحدود من اعداد او متغيرات.' },
    { eu: 'Atera koefizienteen zatitzaile komun handiena eta aldagai komunak berretzailerik txikienarekin.', es: 'Saca el maximo factor numerico comun y las variables comunes con el menor exponente.', ar: 'استخرج العامل العددي المشترك الاكبر والمتغيرات المشتركة باصغر اس.' },
    { eu: 'Zatitu termino bakoitza faktore komun horrekin.', es: 'Divide cada termino entre ese factor comun.', ar: 'اقسم كل حد على ذلك العامل المشترك.' },
    { eu: 'Idatzi emaitza faktorea parentesiaren aurrean eta zatidurak parentesi barruan.', es: 'Escribe el resultado poniendo el factor fuera del parentesis y los cocientes dentro.', ar: 'اكتب النتيجة بوضع العامل خارج القوس والحدود الناتجة داخله.' }
]

export const factorCards: TheoryCardData[] = [
    {
        icon: '🔑',
        tone: 'purple',
        title: { eu: 'Zer da faktore komuna?', es: 'Que es el factor comun?', ar: 'ما هو العامل المشترك؟' },
        body: {
            eu: 'Faktore komuna ateratzea banaketa-propietatearen alderantzizkoa da: termino guztiek partekatzen duten zatia kanpora ateratzen da.',
            es: 'Extraer factor comun es lo contrario de la distributiva: sacamos fuera la parte que divide a todos los terminos.',
            ar: 'استخراج العامل المشترك هو العملية العكسية للتوزيع: نخرج الجزء الذي يقسم جميع الحدود.'
        },
        formula: {
            tone: 'purple',
            label: theoryUiLabels.principle,
            text: { eu: '$$ax + ay + az = a(x+y+z)$$', es: '$$ax + ay + az = a(x+y+z)$$', ar: '$$ax + ay + az = a(x+y+z)$$' }
        }
    },
    {
        icon: '📋',
        tone: 'blue',
        title: { eu: 'Nola atera faktore komuna', es: 'Como extraer el factor comun', ar: 'كيف نستخرج العامل المشترك' },
        steps: factorSteps
    }
]

export const factorExamples: FactorExample[] = [
    { title: { eu: 'Adibidea 1: zenbakizko faktore komuna', es: 'Ejemplo 1: factor numerico comun', ar: 'مثال 1: عامل عددي مشترك' }, lines: [{ eu: '$6x+9$', es: '$6x+9$', ar: '$6x+9$' }, { eu: 'Faktore komuna: $3$', es: 'Factor comun: $3$', ar: 'العامل المشترك: $3$' }, { eu: '$6x+9 = 3(2x+3)$', es: '$6x+9 = 3(2x+3)$', ar: '$6x+9 = 3(2x+3)$' }] },
    { title: { eu: 'Adibidea 2: hizki eta zenbakiak', es: 'Ejemplo 2: numeros y letras', ar: 'مثال 2: اعداد ومتغيرات' }, lines: [{ eu: '$4x^2+8x$', es: '$4x^2+8x$', ar: '$4x^2+8x$' }, { eu: 'Faktore komuna: $4x$', es: 'Factor comun: $4x$', ar: 'العامل المشترك: $4x$' }, { eu: '$4x^2+8x = 4x(x+2)$', es: '$4x^2+8x = 4x(x+2)$', ar: '$4x^2+8x = 4x(x+2)$' }] },
    { title: { eu: 'Adibidea 3: hiru termino', es: 'Ejemplo 3: tres terminos', ar: 'مثال 3: ثلاثة حدود' }, lines: [{ eu: '$5x^2+10xy+15x$', es: '$5x^2+10xy+15x$', ar: '$5x^2+10xy+15x$' }, { eu: 'Faktore komuna: $5x$', es: 'Factor comun: $5x$', ar: 'العامل المشترك: $5x$' }, { eu: '$5x^2+10xy+15x = 5x(x+2y+3)$', es: '$5x^2+10xy+15x = 5x(x+2y+3)$', ar: '$5x^2+10xy+15x = 5x(x+2y+3)$' }] }
]

export const notableCards: NotableCardData[] = [
    {
        tone: 'purple',
        title: { eu: 'Baturaren karratua', es: 'Cuadrado de una suma', ar: 'مربع مجموع' },
        formula: '$$(a+b)^2 = a^2 + 2ab + b^2$$',
        example: '$$(x+3)^2 = x^2 + 6x + 9$$'
    },
    {
        tone: 'blue',
        title: { eu: 'Kenketaren karratua', es: 'Cuadrado de una resta', ar: 'مربع فرق' },
        formula: '$$(a-b)^2 = a^2 - 2ab + b^2$$',
        example: '$$(2x-5)^2 = 4x^2 - 20x + 25$$'
    },
    {
        tone: 'cyan',
        title: { eu: 'Batura bider diferentzia', es: 'Suma por diferencia', ar: 'مجموع في فرق' },
        formula: '$$(a+b)(a-b)=a^2-b^2$$',
        example: '$$(x+4)(x-4)=x^2-16$$'
    }
]

export const notableGeoBlock = {
    title: { eu: 'Demostrazio geometrikoa: $(a+b)^2$', es: 'Demostracion geometrica de $(a+b)^2$', ar: 'برهان هندسي لـ $(a+b)^2$' },
    description: {
        eu: 'Alde $(a+b)$ duen karratua lau zatitan bana daiteke: $a^2$, bi $ab$ laukizuzen eta $b^2$.',
        es: 'Un cuadrado de lado $(a+b)$ se puede dividir en cuatro partes: un cuadrado $a^2$, dos rectangulos $ab$ y un cuadrado $b^2$.',
        ar: 'يمكن تقسيم مربع ضلعه $(a+b)$ الى اربعة اجزاء: مربع $a^2$ ومستطيلين $ab$ ومربع $b^2$.'
    },
    formula: '$$(a+b)^2 = a^2 + ab + ab + b^2 = a^2 + 2ab + b^2$$',
    memorize: {
        eu: 'Lehenaren karratua + 2 · lehena · bigarrena + bigarrenaren karratua',
        es: 'Cuadrado del primero + 2 · primero · segundo + cuadrado del segundo',
        ar: 'مربع الاول + 2 · الاول · الثاني + مربع الثاني'
    }
}

export const notableMentalBlock = {
    title: { eu: 'Aplikazio praktikoa: kalkulu mentala', es: 'Aplicacion practica: calculo mental', ar: 'تطبيق عملي: حساب ذهني' },
    description: {
        eu: 'Produktu nabarmenak oso erabilgarriak dira kalkulu zailak buruz egiteko.',
        es: 'Los productos notables permiten calcular mentalmente productos dificiles.',
        ar: 'تساعد المتطابقات الشهيرة على اجراء حسابات ذهنية صعبة بسرعة.'
    },
    label: { eu: 'Batura × diferentzia', es: 'Suma × diferencia', ar: 'مجموع × فرق' },
    formula: '$$99 \\times 101 = (100-1)(100+1) = 100^2 - 1^2 = 9999$$',
    anotherExample: {
        eu: '$312 \\times 311$ bezalako kalkuluetan, $(a+b)(a-b)$ egitura antzemateak asko laguntzen du.',
        es: 'En calculos como $312 \\times 311$, reconocer la estructura $(a+b)(a-b)$ ayuda mucho.',
        ar: 'في حسابات مثل $312 \\times 311$، يساعد التعرف على البنية $(a+b)(a-b)$ كثيرا.'
    }
}

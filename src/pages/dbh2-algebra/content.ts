import {
    normalizeUnitLanguage,
    pickLocalizedText,
    type LocalizedText,
    type UnitLanguage
} from '../../features/units/unitTypes'

export type { LocalizedText } from '../../features/units/unitTypes'
export type AlgebraLang = UnitLanguage

export interface TheoryBlock {
    heading: LocalizedText
    paragraphs: LocalizedText[]
    bullets?: LocalizedText[]
    formula?: string
    examples?: LocalizedText[]
    note?: LocalizedText
}

export interface TheorySectionData {
    id: string
    title: LocalizedText
    icon: string
    color: string
    blocks: TheoryBlock[]
}

export interface MissionData {
    id: number
    difficulty: 'hasiberria' | 'aurreratua' | 'maisu'
    title: LocalizedText
    description: LocalizedText
    hint: LocalizedText
    success: LocalizedText
    error: LocalizedText
    answer: string[]
    points: number
}

export interface QuizQuestion {
    category: 'monomios' | 'polinomios' | 'mixed'
    question: LocalizedText
    options: LocalizedText[]
    answer: number
}

export const algebraHome = {
    title: {
        eu: 'Aljebra DBH 2',
        es: 'Álgebra 2º ESO',
        ar: 'الجبر 2 DBH'
    },
    subtitle: {
        eu: 'Ikasi hizkuntza aljebraikoa zentzuz',
        es: 'Aprende lenguaje algebraico con sentido',
        ar: 'تعلّم اللغة الجبرية بفهم'
    },
    description: {
        eu: 'Algebra 2 DBH proiektuko eduki osoa Matellaren markan berrantolatuta: teoria txarteletan, laborategi interaktiboa, erronkak eta joku azkarrak.',
        es: 'Todo el contenido del proyecto Algebra 2 DBH, reorganizado dentro de la marca Matella: teoría en tarjetas, laboratorio interactivo, retos y juegos rápidos.',
        ar: 'كل محتوى مشروع Algebra 2 DBH معاد تنظيمه داخل هوية Matella: نظرية ببطاقات، مختبر تفاعلي، تحديات وألعاب سريعة.'
    },
    featureTheory: {
        eu: 'Hizkuntza aljebraikoa, monomioak, polinomioak, produktu nabarmenak eta faktore komuna txartel bidez landuta.',
        es: 'Lenguaje algebraico, monomios, polinomios, productos notables y factor común trabajados con tarjetas expandibles.',
        ar: 'اللغة الجبرية والحدود الأحادية وكثيرات الحدود والمتطابقات الشهيرة والعامل المشترك في بطاقات قابلة للتوسيع.'
    },
    featureLab: {
        eu: 'Balio numerikoaren kalkulagailua, monomioen analizatzailea, produktu nabarmenen bisorea eta faktore komunaren laguntzailea.',
        es: 'Calculadora de valor numérico, analizador de monomios, visor de productos notables y asistente de factor común.',
        ar: 'حاسبة القيمة العددية، محلل الحدود الأحادية، عارض المتطابقات الشهيرة ومساعد العامل المشترك.'
    },
    featureMissions: {
        eu: 'Ariketak eta egoera gidatuak hiru mailatan antolatuta, pausoz pauso pentsatzeko.',
        es: 'Ejercicios y situaciones guiadas organizadas en tres niveles para pensar paso a paso.',
        ar: 'تمارين ومواقف موجهة منظمة في ثلاثة مستويات للتفكير خطوة خطوة.'
    },
    featureGames: {
        eu: 'Quiz dinamikoak eta partida azkarrak, ikasitakoa modu arinean sendotzeko.',
        es: 'Quizzes dinámicos y partidas rápidas para afianzar lo aprendido de forma ligera.',
        ar: 'اختبارات ديناميكية وجولات سريعة لترسيخ ما تم تعلمه بطريقة خفيفة.'
    }
}

export const algebraTheorySections: TheorySectionData[] = [
    {
        id: 'lenguaje',
        title: {
            eu: 'Hizkuntza aljebraikoa',
            es: 'Lenguaje algebraico',
            ar: 'اللغة الجبرية'
        },
        icon: '🔤',
        color: '#6366f1',
        blocks: [
            {
                heading: {
                    eu: 'Zer da aljebra?',
                    es: '¿Qué es el álgebra?',
                    ar: 'ما هو الجبر؟'
                },
                paragraphs: [
                    {
                        eu: 'Aljebra matematiken adarra da, eta letrak erabiltzen ditu ezezagunak edo alda daitezkeen kantitateak adierazteko.',
                        es: 'El álgebra es la rama de las matemáticas que usa letras para representar cantidades desconocidas o variables.',
                        ar: 'الجبر هو فرع الرياضيات الذي يستخدم الحروف لتمثيل كميات مجهولة أو متغيرة.'
                    },
                    {
                        eu: 'Horrela, egoera errealak modu orokorrean modelizatu ditzakegu eta arau orokorrak idatzi.',
                        es: 'Gracias a eso podemos modelizar situaciones reales de forma general y escribir reglas generales.',
                        ar: 'وبذلك نستطيع نمذجة المواقف الواقعية بشكل عام وكتابة قواعد عامة.'
                    }
                ],
                examples: [
                    {
                        eu: 'Langile batek $$x$$ euroko oinarrizko soldata eta aparteko ordu bakoitzeko $$16n$$ kobratzen badu, guztira $$S = x + 16n$$ izango du.',
                        es: 'Si una persona cobra un sueldo base de $$x$$ euros y $$16n$$ euros por horas extra, su salario total es $$S = x + 16n$$.',
                        ar: 'إذا كان الشخص يتقاضى راتباً أساسياً قدره $$x$$ يورو و $$16n$$ يورو عن الساعات الإضافية، فإن راتبه الكلي هو $$S = x + 16n$$.'
                    }
                ]
            },
            {
                heading: {
                    eu: 'Aldagaiak eta konstanteak',
                    es: 'Variables y constantes',
                    ar: 'المتغيرات والثوابت'
                },
                paragraphs: [
                    {
                        eu: 'Aldagaia balio desberdinak har ditzakeen letra da; konstantea, aldiz, zenbaki finkoa da.',
                        es: 'Una variable es una letra que puede tomar distintos valores; una constante es un número fijo.',
                        ar: 'المتغير حرف يمكنه أخذ قيم مختلفة، أما الثابت فهو عدد ثابت.'
                    }
                ],
                bullets: [
                    {
                        eu: 'Aldagai arruntak: $$x, y, a, b$$',
                        es: 'Variables típicas: $$x, y, a, b$$',
                        ar: 'متغيرات شائعة: $$x, y, a, b$$'
                    },
                    {
                        eu: 'Konstante arruntak: $$3, -7, \\pi$$',
                        es: 'Constantes típicas: $$3, -7, \\\\pi$$',
                        ar: 'ثوابت شائعة: $$3, -7, \\\\pi$$'
                    }
                ],
                note: {
                    eu: 'Aljebran trebetasun garrantzitsuena hizkuntza arrunta adierazpen aljebraikora pasatzea da.',
                    es: 'Una de las habilidades clave en álgebra es traducir el lenguaje cotidiano a expresiones algebraicas.',
                    ar: 'من أهم مهارات الجبر ترجمة اللغة اليومية إلى تعبيرات جبرية.'
                }
            },
            {
                heading: {
                    eu: 'Itzulpen tipikoak',
                    es: 'Traducciones típicas',
                    ar: 'ترجمات شائعة'
                },
                paragraphs: [
                    {
                        eu: 'Esaldi arruntak adierazpen bihurtzeak gero problemak planteatzeko bidea errazten du.',
                        es: 'Convertir frases habituales en expresiones facilita después el planteamiento de problemas.',
                        ar: 'تحويل العبارات المعتادة إلى تعبيرات يسهل لاحقاً صياغة المسائل.'
                    }
                ],
                bullets: [
                    {
                        eu: 'Zenbaki baten hirukoitza -> $$3x$$',
                        es: 'El triple de un número -> $$3x$$',
                        ar: 'ثلاثة أمثال عدد -> $$3x$$'
                    },
                    {
                        eu: 'Zenbaki baten karratua -> $$x^2$$',
                        es: 'El cuadrado de un número -> $$x^2$$',
                        ar: 'مربع عدد -> $$x^2$$'
                    },
                    {
                        eu: 'Zenbaki baten erdia gehi bost -> $$x/2 + 5$$',
                        es: 'La mitad de un número más cinco -> $$x/2 + 5$$',
                        ar: 'نصف عدد زائد خمسة -> $$x/2 + 5$$'
                    }
                ]
            }
        ]
    },
    {
        id: 'monomios',
        title: {
            eu: 'Monomioak',
            es: 'Monomios',
            ar: 'الحدود الأحادية'
        },
        icon: '🔷',
        color: '#06b6d4',
        blocks: [
            {
                heading: {
                    eu: 'Monomio baten definizioa',
                    es: 'Definición de monomio',
                    ar: 'تعريف الحد الأحادي'
                },
                paragraphs: [
                    {
                        eu: 'Monomioa termino bakarreko adierazpen aljebraikoa da: zenbaki eta letren biderkadura, berretzaile oso positiboekin.',
                        es: 'Un monomio es una expresión algebraica de un solo término: producto de números y letras con exponentes enteros positivos.',
                        ar: 'الحد الأحادي هو تعبير جبري ذو حد واحد: حاصل ضرب أعداد وحروف بأسس صحيحة موجبة.'
                    }
                ],
                formula: '$$5x^2y,\\ -3ab^2c^3,\\ 7n^4,\\ -2$$'
            }
        ]
    },
    {
        id: 'opmonomios',
        title: {
            eu: 'Monomioen eragiketak',
            es: 'Operaciones con monomios',
            ar: 'عمليات الحدود الأحادية'
        },
        icon: '⚡',
        color: '#10b981',
        blocks: [
            {
                heading: {
                    eu: 'Batuketa eta kenketa',
                    es: 'Suma y resta',
                    ar: 'الجمع والطرح'
                },
                paragraphs: [
                    {
                        eu: 'Monomio antzekoekin bakarrik batu edo kendu daiteke: koefizienteak eragiten dira eta zati literala mantentzen da.',
                        es: 'Solo se pueden sumar o restar monomios semejantes: se operan los coeficientes y se conserva la parte literal.',
                        ar: 'لا يمكن جمع أو طرح إلا الحدود المتشابهة: نعمل على المعاملات ونحافظ على الجزء الحرفي.'
                    }
                ],
                formula: '$$3x^2 + 5x^2 = 8x^2$$'
            }
        ]
    },
    {
        id: 'polinomios',
        title: {
            eu: 'Polinomioak',
            es: 'Polinomios',
            ar: 'كثيرات الحدود'
        },
        icon: '📈',
        color: '#f472b6',
        blocks: [
            {
                heading: {
                    eu: 'Zer da polinomio bat?',
                    es: '¿Qué es un polinomio?',
                    ar: 'ما هي كثيرة الحدود؟'
                },
                paragraphs: [
                    {
                        eu: 'Polinomioa monomioen batura da. Monomio bakoitza termino bat da polinomioaren barruan.',
                        es: 'Un polinomio es una suma de monomios. Cada monomio es un término del polinomio.',
                        ar: 'كثيرة الحدود هي مجموع حدود أحادية، وكل حد أحادي يمثل حدّاً داخل كثيرة الحدود.'
                    }
                ],
                formula: '$$P(x) = 3x^4 - 5x^2 + 2x - 7$$'
            },
            {
                heading: {
                    eu: 'Gradua, termino independentea eta balio numerikoa',
                    es: 'Grado, término independiente y valor numérico',
                    ar: 'الدرجة والحد المستقل والقيمة العددية'
                },
                paragraphs: [
                    {
                        eu: 'Polinomioaren gradua berretzailerik handiena da; termino independentea aldagairik gabeko terminoari deritzo.',
                        es: 'El grado del polinomio es el mayor exponente; el término independiente es el término sin variable.',
                        ar: 'درجة كثيرة الحدود هي أكبر أس، والحد المستقل هو الحد الذي لا يحتوي على متغير.'
                    },
                    {
                        eu: 'Balio numerikoa aldagaiari zenbaki bat emanez kalkulatzen da.',
                        es: 'El valor numérico se calcula sustituyendo la variable por un número.',
                        ar: 'تُحسب القيمة العددية بتعويض المتغير بعدد.'
                    }
                ],
                examples: [
                    {
                        eu: '$$P(x)=x^2-3x+1$$ eta $$x=4$$ bada, $$P(4)=16-12+1=5$$.',
                        es: 'Si $$P(x)=x^2-3x+1$$ y $$x=4$$, entonces $$P(4)=16-12+1=5$$.',
                        ar: 'إذا كانت $$P(x)=x^2-3x+1$$ و $$x=4$$ فإن $$P(4)=16-12+1=5$$.'
                    }
                ]
            },
            {
                heading: {
                    eu: 'Polinomio aurkakoa',
                    es: 'Polinomio opuesto',
                    ar: 'كثيرة الحدود المعاكسة'
                },
                paragraphs: [
                    {
                        eu: 'Polinomio aurkakoa termino guztien zeinua aldatuz lortzen da.',
                        es: 'El polinomio opuesto se obtiene cambiando el signo de todos los términos.',
                        ar: 'تُحصل كثيرة الحدود المعاكسة بتغيير إشارة جميع الحدود.'
                    }
                ],
                formula: '$$P(x)=3x^3-5x+2 \\Rightarrow -P(x)=-3x^3+5x-2$$'
            }
        ]
    },
    {
        id: 'oppolinomios',
        title: {
            eu: 'Polinomioen eragiketak',
            es: 'Operaciones con polinomios',
            ar: 'عمليات كثيرات الحدود'
        },
        icon: '🔢',
        color: '#f59e0b',
        blocks: [
            {
                heading: {
                    eu: 'Batuketa eta kenketa',
                    es: 'Suma y resta',
                    ar: 'الجمع والطرح'
                },
                paragraphs: [
                    {
                        eu: 'Polinomioak batzeko edo kentzeko, termino antzekoak elkartu behar dira.',
                        es: 'Para sumar o restar polinomios hay que agrupar términos semejantes.',
                        ar: 'لجمع أو طرح كثيرات الحدود يجب تجميع الحدود المتشابهة.'
                    }
                ],
                examples: [
                    {
                        eu: '$$(x^3 - 4x^2 + 2x) + (2x^3 + x^2 - x) = 3x^3 - 3x^2 + x$$',
                        es: '$$(x^3 - 4x^2 + 2x) + (2x^3 + x^2 - x) = 3x^3 - 3x^2 + x$$',
                        ar: '$$(x^3 - 4x^2 + 2x) + (2x^3 + x^2 - x) = 3x^3 - 3x^2 + x$$'
                    }
                ]
            },
            {
                heading: {
                    eu: 'Monomioz eta polinomioz biderkatzea',
                    es: 'Multiplicación por monomio y por polinomio',
                    ar: 'الضرب في حد أحادي وفي كثيرة حدود'
                },
                paragraphs: [
                    {
                        eu: 'Banaketa-propietatea aplikatzen da: monomio batek termino guztiak biderkatzen ditu; bi polinomiotan, lehenengoko termino bakoitza bigarreneko guztiekin.',
                        es: 'Se aplica la distributiva: un monomio multiplica todos los términos; con dos polinomios, cada término del primero multiplica a todos los del segundo.',
                        ar: 'نطبق خاصية التوزيع: الحد الأحادي يضرب جميع الحدود، ومع كثيرتي حدود يضرب كل حد من الأولى جميع حدود الثانية.'
                    }
                ],
                examples: [
                    {
                        eu: '$$3x^2(2x^2-x+4)=6x^4-3x^3+12x^2$$',
                        es: '$$3x^2(2x^2-x+4)=6x^4-3x^3+12x^2$$',
                        ar: '$$3x^2(2x^2-x+4)=6x^4-3x^3+12x^2$$'
                    },
                    {
                        eu: '$$(x+1)(x-2)=x^2-x-2$$',
                        es: '$$(x+1)(x-2)=x^2-x-2$$',
                        ar: '$$(x+1)(x-2)=x^2-x-2$$'
                    }
                ]
            },
            {
                heading: {
                    eu: 'Monomio baten arteko zatiketa',
                    es: 'División entre un monomio',
                    ar: 'القسمة على حد أحادي'
                },
                paragraphs: [
                    {
                        eu: 'Polinomioko termino bakoitza monomio berekin zatitzen da.',
                        es: 'Se divide cada término del polinomio entre el mismo monomio.',
                        ar: 'يُقسم كل حد من كثيرة الحدود على نفس الحد الأحادي.'
                    }
                ],
                formula: '$$(6x^3 - 3x^2 + 12x) : 3x = 2x^2 - x + 4$$'
            }
        ]
    },
    {
        id: 'notables',
        title: {
            eu: 'Produktu nabarmenak',
            es: 'Productos notables',
            ar: 'المتطابقات الشهيرة'
        },
        icon: '⭐',
        color: '#8b5cf6',
        blocks: [
            {
                heading: {
                    eu: 'Hiru identitate nagusiak',
                    es: 'Tres identidades básicas',
                    ar: 'ثلاث هويات أساسية'
                },
                paragraphs: [
                    {
                        eu: 'Produktu nabarmenek biderketak azkartzen dituzte eta kalkulu mentala errazten dute.',
                        es: 'Los productos notables agilizan multiplicaciones y facilitan el cálculo mental.',
                        ar: 'تسرّع المتطابقات الشهيرة عمليات الضرب وتسهّل الحساب الذهني.'
                    }
                ],
                bullets: [
                    { eu: '$$(a+b)^2 = a^2 + 2ab + b^2$$', es: '$$(a+b)^2 = a^2 + 2ab + b^2$$', ar: '$$(a+b)^2 = a^2 + 2ab + b^2$$' },
                    { eu: '$$(a-b)^2 = a^2 - 2ab + b^2$$', es: '$$(a-b)^2 = a^2 - 2ab + b^2$$', ar: '$$(a-b)^2 = a^2 - 2ab + b^2$$' },
                    { eu: '$$(a+b)(a-b)=a^2-b^2$$', es: '$$(a+b)(a-b)=a^2-b^2$$', ar: '$$(a+b)(a-b)=a^2-b^2$$' }
                ]
            },
            {
                heading: {
                    eu: 'Geometria bidezko interpretazioa',
                    es: 'Interpretación geométrica',
                    ar: 'تفسير هندسي'
                },
                paragraphs: [
                    {
                        eu: '$$(a+b)^2$$ karratu handia lau zatitan bana daiteke: $$a^2$$, bi $$ab$$ laukizuzen eta $$b^2$$.',
                        es: 'El cuadrado grande de lado $$(a+b)$$ se puede dividir en $$a^2$$, dos rectángulos $$ab$$ y $$b^2$$.',
                        ar: 'يمكن تقسيم المربع الكبير ذي الضلع $$(a+b)$$ إلى $$a^2$$ ومستطيلين $$ab$$ و $$b^2$$.'
                    }
                ],
                note: {
                    eu: 'Oroitzeko trikimailua: lehenaren karratua, bikoitza bider produktua, eta bigarrenaren karratua.',
                    es: 'Truco para recordar: cuadrado del primero, doble producto y cuadrado del segundo.',
                    ar: 'حيلة للحفظ: مربع الأول، ضعف حاصل الضرب، ومربع الثاني.'
                }
            }
        ]
    },
    {
        id: 'factor',
        title: {
            eu: 'Faktore komuna',
            es: 'Factor común',
            ar: 'العامل المشترك'
        },
        icon: '🔑',
        color: '#ec4899',
        blocks: [
            {
                heading: {
                    eu: 'Zer da faktore komuna?',
                    es: '¿Qué es el factor común?',
                    ar: 'ما هو العامل المشترك؟'
                },
                paragraphs: [
                    {
                        eu: 'Banaketa-propietatearen alderantzizko prozesua da: termino guztietan agertzen den zatia kanpora ateratzen dugu.',
                        es: 'Es el proceso inverso de la distributiva: sacamos fuera la parte que aparece en todos los términos.',
                        ar: 'هو العملية العكسية للتوزيع: نُخرج إلى الخارج الجزء الذي يظهر في جميع الحدود.'
                    }
                ],
                formula: '$$ax + ay = a(x+y)$$'
            },
            {
                heading: {
                    eu: 'Nola ateratzen da',
                    es: 'Cómo se extrae',
                    ar: 'كيف يُستخرج'
                },
                paragraphs: [
                    {
                        eu: 'Pausoz pauso eginez, komuna den zatia identifikatu eta parentesi barruan geratzen dena berridazten dugu.',
                        es: 'Si lo hacemos paso a paso, identificamos la parte comun y reescribimos dentro del parentesis lo que queda.',
                        ar: 'إذا فعلنا ذلك خطوة خطوة، نحدد الجزء المشترك ونعيد كتابة ما يبقى داخل القوس.'
                    }
                ],
                bullets: [
                    { eu: 'Bilatu koefiziente guztien zati komun handiena.', es: 'Busca el máximo factor común numérico.', ar: 'ابحث عن أكبر عامل مشترك عددي.' },
                    { eu: 'Hartu aldagai komunak berretzailerik txikienarekin.', es: 'Toma las variables comunes con el menor exponente.', ar: 'خذ المتغيرات المشتركة بأصغر أس.' },
                    { eu: 'Zatitu termino bakoitza faktore horrekin.', es: 'Divide cada término entre ese factor.', ar: 'اقسم كل حد على ذلك العامل.' }
                ],
                examples: [
                    { eu: '$$6x + 9 = 3(2x + 3)$$', es: '$$6x + 9 = 3(2x + 3)$$', ar: '$$6x + 9 = 3(2x + 3)$$' },
                    { eu: '$$4x^2 + 8x = 4x(x + 2)$$', es: '$$4x^2 + 8x = 4x(x + 2)$$', ar: '$$4x^2 + 8x = 4x(x + 2)$$' },
                    { eu: '$$5x^2 + 10xy + 15x = 5x(x + 2y + 3)$$', es: '$$5x^2 + 10xy + 15x = 5x(x + 2y + 3)$$', ar: '$$5x^2 + 10xy + 15x = 5x(x + 2y + 3)$$' }
                ]
            }
        ]
    }
]

export const algebraMissions: MissionData[] = [
    {
        id: 1,
        difficulty: 'hasiberria',
        title: { eu: 'Esaldi bat itzuli', es: 'Traduce una frase', ar: 'ترجم عبارة' },
        description: { eu: '“Zenbaki baten hirukoitza gehi 5” nola idatziko zenuke aljebran?', es: '¿Cómo escribirías en álgebra “el triple de un número más 5”?', ar: 'كيف تكتب جبرياً “ثلاثة أمثال عدد زائد 5”؟' },
        hint: { eu: 'Zenbakia $$x$$ dela hartu.', es: 'Toma el número como $$x$$.', ar: 'اعتبر العدد $$x$$.' },
        success: { eu: 'Bikain! $$3x+5$$ da.', es: 'Muy bien. La expresión es $$3x+5$$.', ar: 'أحسنت. التعبير هو $$3x+5$$.' },
        error: { eu: 'Saiatu berriz: lehen hirukoitza, gero +5.', es: 'Inténtalo otra vez: primero el triple y después +5.', ar: 'حاول من جديد: أولاً الثلاثة أمثال ثم +5.' },
        answer: ['3x+5', '5+3x'],
        points: 10
    },
    {
        id: 2,
        difficulty: 'hasiberria',
        title: { eu: 'Monomioaren gradua', es: 'Grado de un monomio', ar: 'درجة حد أحادي' },
        description: { eu: 'Zein da $$5x^2yz$$ monomioaren gradua?', es: '¿Cuál es el grado del monomio $$5x^2yz$$?', ar: 'ما درجة الحد الأحادي $$5x^2yz$$؟' },
        hint: { eu: 'Berretzaile guztiak batu.', es: 'Suma todos los exponentes.', ar: 'اجمع جميع الأسس.' },
        success: { eu: 'Zuzen! $$2+1+1=4$$.', es: 'Correcto. $$2+1+1=4$$.', ar: 'صحيح. $$2+1+1=4$$.' },
        error: { eu: 'Kontuz: koefizientea ez da graduan sartzen.', es: 'Ojo: el coeficiente no cuenta para el grado.', ar: 'انتبه: المعامل لا يدخل في الدرجة.' },
        answer: ['4'],
        points: 10
    },
    {
        id: 3,
        difficulty: 'hasiberria',
        title: { eu: 'Antzeko terminoak', es: 'Términos semejantes', ar: 'حدود متشابهة' },
        description: { eu: 'Sinplifikatu: $$3x^2 + 5x^2$$', es: 'Simplifica: $$3x^2 + 5x^2$$', ar: 'بسّط: $$3x^2 + 5x^2$$' },
        hint: { eu: 'Koefizienteak batu eta $$x^2$$ mantendu.', es: 'Suma coeficientes y conserva $$x^2$$.', ar: 'اجمع المعاملات واحتفظ بـ $$x^2$$.' },
        success: { eu: 'Oso ondo, emaitza $$8x^2$$ da.', es: 'Muy bien, el resultado es $$8x^2$$.', ar: 'جيد جداً، النتيجة هي $$8x^2$$.' },
        error: { eu: 'Ez ahaztu zati literala berdina dela.', es: 'No olvides que la parte literal se mantiene igual.', ar: 'لا تنس أن الجزء الحرفي يبقى كما هو.' },
        answer: ['8x^2', '8x2'],
        points: 10
    },
    {
        id: 4,
        difficulty: 'aurreratua',
        title: { eu: 'Polinomioaren gradua', es: 'Grado de un polinomio', ar: 'درجة كثيرة حدود' },
        description: { eu: 'Zein da $$2x^4 - 3x^2 + x - 5$$ polinomioaren gradua?', es: '¿Cuál es el grado del polinomio $$2x^4 - 3x^2 + x - 5$$?', ar: 'ما درجة كثيرة الحدود $$2x^4 - 3x^2 + x - 5$$؟' },
        hint: { eu: 'Begiratu berretzailerik handiena.', es: 'Mira el mayor exponente.', ar: 'انظر إلى أكبر أس.' },
        success: { eu: 'Bai, gradua 4 da.', es: 'Sí, el grado es 4.', ar: 'نعم، الدرجة هي 4.' },
        error: { eu: 'Gradua ez da termino kopurua.', es: 'El grado no es el número de términos.', ar: 'الدرجة ليست عدد الحدود.' },
        answer: ['4'],
        points: 20
    },
    {
        id: 5,
        difficulty: 'aurreratua',
        title: { eu: 'Balio numerikoa', es: 'Valor numérico', ar: 'القيمة العددية' },
        description: { eu: 'Kalkulatu $$P(3)$$, baldin eta $$P(x)=x^2-2x+1$$.', es: 'Calcula $$P(3)$$ si $$P(x)=x^2-2x+1$$.', ar: 'احسب $$P(3)$$ إذا كانت $$P(x)=x^2-2x+1$$.' },
        hint: { eu: 'Ordezkatu $$x$$-ren lekuan 3.', es: 'Sustituye $$x$$ por 3.', ar: 'عوّض $$x$$ بـ 3.' },
        success: { eu: 'Emaitza 4 da.', es: 'El resultado es 4.', ar: 'النتيجة هي 4.' },
        error: { eu: 'Lehenik $$3^2$$ kalkulatu, gero -6 eta +1.', es: 'Primero calcula $$3^2$$, luego -6 y +1.', ar: 'احسب أولاً $$3^2$$ ثم -6 ثم +1.' },
        answer: ['4'],
        points: 20
    },
    {
        id: 6,
        difficulty: 'aurreratua',
        title: { eu: 'Produktu nabarmena', es: 'Producto notable', ar: 'متطابقة شهيرة' },
        description: { eu: 'Garatu $$ (x+3)^2 $$', es: 'Desarrolla $$ (x+3)^2 $$', ar: 'انشر $$ (x+3)^2 $$' },
        hint: { eu: 'Lehenaren karratua, bikoitza bider produktua eta bigarrenaren karratua.', es: 'Cuadrado del primero, doble producto y cuadrado del segundo.', ar: 'مربع الأول، ضعف حاصل الضرب، ومربع الثاني.' },
        success: { eu: 'Bikain: $$x^2+6x+9$$.', es: 'Perfecto: $$x^2+6x+9$$.', ar: 'ممتاز: $$x^2+6x+9$$.' },
        error: { eu: 'Tarteko terminoa $$2·x·3$$ da.', es: 'El término central es $$2·x·3$$.', ar: 'الحد الأوسط هو $$2·x·3$$.' },
        answer: ['x^2+6x+9', 'x2+6x+9'],
        points: 20
    },
    {
        id: 7,
        difficulty: 'maisu',
        title: { eu: 'Faktore komuna 1', es: 'Factor común 1', ar: 'عامل مشترك 1' },
        description: { eu: 'Atera faktore komuna: $$4x^2 + 8x$$', es: 'Saca factor común: $$4x^2 + 8x$$', ar: 'استخرج العامل المشترك: $$4x^2 + 8x$$' },
        hint: { eu: 'Zenbakizkoa 4 da, eta letra komuna $$x$$.', es: 'El factor numérico es 4 y la letra común es $$x$$.', ar: 'العامل العددي هو 4 والحرف المشترك هو $$x$$.' },
        success: { eu: 'Zuzen: $$4x(x+2)$$.', es: 'Correcto: $$4x(x+2)$$.', ar: 'صحيح: $$4x(x+2)$$.' },
        error: { eu: 'Parentesi barruko lehen terminoa $$x$$ da.', es: 'El primer término dentro del paréntesis es $$x$$.', ar: 'الحد الأول داخل القوس هو $$x$$.' },
        answer: ['4x(x+2)', '4x*(x+2)'],
        points: 30
    },
    {
        id: 8,
        difficulty: 'maisu',
        title: { eu: 'Faktore komuna 2', es: 'Factor común 2', ar: 'عامل مشترك 2' },
        description: { eu: 'Atera faktore komuna: $$5x^2 + 10xy + 15x$$', es: 'Saca factor común: $$5x^2 + 10xy + 15x$$', ar: 'استخرج العامل المشترك: $$5x^2 + 10xy + 15x$$' },
        hint: { eu: 'Komuna $$5x$$ da.', es: 'El factor común es $$5x$$.', ar: 'العامل المشترك هو $$5x$$.' },
        success: { eu: 'Primeran: $$5x(x+2y+3)$$.', es: 'Muy bien: $$5x(x+2y+3)$$.', ar: 'جيد جداً: $$5x(x+2y+3)$$.' },
        error: { eu: 'Zatitu termino bakoitza $$5x$$ bidez.', es: 'Divide cada término entre $$5x$$.', ar: 'اقسم كل حد على $$5x$$.' },
        answer: ['5x(x+2y+3)', '5x*(x+2y+3)'],
        points: 30
    },
    {
        id: 9,
        difficulty: 'maisu',
        title: { eu: 'Biderketa polinomikoa', es: 'Multiplicación de polinomios', ar: 'ضرب كثيرات الحدود' },
        description: { eu: 'Garatu $$ (x+1)(x-2) $$', es: 'Desarrolla $$ (x+1)(x-2) $$', ar: 'انشر $$ (x+1)(x-2) $$' },
        hint: { eu: 'Lehenengo polinomioko termino bakoitza bigarreneko guztiekin biderkatu.', es: 'Multiplica cada término del primero por todos los del segundo.', ar: 'اضرب كل حد من الأولى في جميع حدود الثانية.' },
        success: { eu: 'Bai: $$x^2-x-2$$.', es: 'Exacto: $$x^2-x-2$$.', ar: 'صحيح: $$x^2-x-2$$.' },
        error: { eu: '$$x·(-2)=-2x$$ eta $$1·x=x$$ gogoratu.', es: 'Recuerda que $$x·(-2)=-2x$$ y $$1·x=x$$.', ar: 'تذكر أن $$x·(-2)=-2x$$ و $$1·x=x$$.' },
        answer: ['x^2-x-2', 'x2-x-2'],
        points: 40
    }
]

export const algebraQuizQuestions: QuizQuestion[] = [
    {
        category: 'monomios',
        question: { eu: 'Zein da $$5x^2yz$$ monomioaren gradua?', es: '¿Cuál es el grado del monomio $$5x^2yz$$?', ar: 'ما درجة الحد الأحادي $$5x^2yz$$؟' },
        options: [{ eu: '2', es: '2', ar: '2' }, { eu: '3', es: '3', ar: '3' }, { eu: '4', es: '4', ar: '4' }, { eu: '5', es: '5', ar: '5' }],
        answer: 2
    },
    {
        category: 'monomios',
        question: { eu: 'Sinplifikatu $$3x^2+5x^2$$', es: 'Simplifica $$3x^2+5x^2$$', ar: 'بسّط $$3x^2+5x^2$$' },
        options: [{ eu: '$$8x^2$$', es: '$$8x^2$$', ar: '$$8x^2$$' }, { eu: '$$8x^4$$', es: '$$8x^4$$', ar: '$$8x^4$$' }, { eu: '$$15x^2$$', es: '$$15x^2$$', ar: '$$15x^2$$' }, { eu: '$$15x^4$$', es: '$$15x^4$$', ar: '$$15x^4$$' }],
        answer: 0
    },
    {
        category: 'monomios',
        question: { eu: 'Kalkulatu $$3x^2 · 4x^3$$', es: 'Calcula $$3x^2 · 4x^3$$', ar: 'احسب $$3x^2 · 4x^3$$' },
        options: [{ eu: '$$7x^5$$', es: '$$7x^5$$', ar: '$$7x^5$$' }, { eu: '$$12x^5$$', es: '$$12x^5$$', ar: '$$12x^5$$' }, { eu: '$$12x^6$$', es: '$$12x^6$$', ar: '$$12x^6$$' }, { eu: '$$7x^6$$', es: '$$7x^6$$', ar: '$$7x^6$$' }],
        answer: 1
    },
    {
        category: 'polinomios',
        question: { eu: 'Zein da $$2x^4-3x^2+x-5$$ polinomioaren gradua?', es: '¿Cuál es el grado de $$2x^4-3x^2+x-5$$?', ar: 'ما درجة $$2x^4-3x^2+x-5$$؟' },
        options: [{ eu: '2', es: '2', ar: '2' }, { eu: '3', es: '3', ar: '3' }, { eu: '4', es: '4', ar: '4' }, { eu: '5', es: '5', ar: '5' }],
        answer: 2
    },
    {
        category: 'polinomios',
        question: { eu: 'Kalkulatu $$P(3)$$, $$P(x)=x^2-2x+1$$ bada.', es: 'Calcula $$P(3)$$ si $$P(x)=x^2-2x+1$$.', ar: 'احسب $$P(3)$$ إذا كانت $$P(x)=x^2-2x+1$$.' },
        options: [{ eu: '2', es: '2', ar: '2' }, { eu: '4', es: '4', ar: '4' }, { eu: '6', es: '6', ar: '6' }, { eu: '9', es: '9', ar: '9' }],
        answer: 1
    },
    {
        category: 'mixed',
        question: { eu: 'Garatu $$(x+3)^2$$', es: 'Desarrolla $$(x+3)^2$$', ar: 'انشر $$(x+3)^2$$' },
        options: [{ eu: '$$x^2+3x+9$$', es: '$$x^2+3x+9$$', ar: '$$x^2+3x+9$$' }, { eu: '$$x^2+6x+9$$', es: '$$x^2+6x+9$$', ar: '$$x^2+6x+9$$' }, { eu: '$$x^2+9$$', es: '$$x^2+9$$', ar: '$$x^2+9$$' }, { eu: '$$x^2+6x+6$$', es: '$$x^2+6x+6$$', ar: '$$x^2+6x+6$$' }],
        answer: 1
    },
    {
        category: 'mixed',
        question: { eu: 'Atera faktore komuna: $$4x^2+8x$$', es: 'Saca factor común: $$4x^2+8x$$', ar: 'استخرج العامل المشترك: $$4x^2+8x$$' },
        options: [{ eu: '$$4(x^2+2x)$$', es: '$$4(x^2+2x)$$', ar: '$$4(x^2+2x)$$' }, { eu: '$$4x(x+2)$$', es: '$$4x(x+2)$$', ar: '$$4x(x+2)$$' }, { eu: '$$8x(x+1)$$', es: '$$8x(x+1)$$', ar: '$$8x(x+1)$$' }, { eu: '$$(4x)^2+2$$', es: '$$(4x)^2+2$$', ar: '$$(4x)^2+2$$' }],
        answer: 1
    },
    {
        category: 'mixed',
        question: { eu: 'Kalkulatu $$(a+b)(a-b)$$', es: 'Calcula $$(a+b)(a-b)$$', ar: 'احسب $$(a+b)(a-b)$$' },
        options: [{ eu: '$$a^2+b^2$$', es: '$$a^2+b^2$$', ar: '$$a^2+b^2$$' }, { eu: '$$a^2-2ab+b^2$$', es: '$$a^2-2ab+b^2$$', ar: '$$a^2-2ab+b^2$$' }, { eu: '$$a^2-b^2$$', es: '$$a^2-b^2$$', ar: '$$a^2-b^2$$' }, { eu: '$$a^2+2ab-b^2$$', es: '$$a^2+2ab-b^2$$', ar: '$$a^2+2ab-b^2$$' }],
        answer: 2
    }
]

export function normalizeAlgebraLang(lang?: string): AlgebraLang {
    return normalizeUnitLanguage(lang)
}

export function pickText(lang: AlgebraLang, text: LocalizedText) {
    return pickLocalizedText(lang, text)
}

export function pickIcon(icon: string) {
    return icon
}

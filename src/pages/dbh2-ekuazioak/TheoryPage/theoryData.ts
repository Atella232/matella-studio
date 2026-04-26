import type { LocalizedText } from '../content'

export type TheoryTabId = 'esanahia' | 'elementuak' | 'balantza' | 'lehen-maila' | 'parentesiak' | 'problemak' | 'bigarren-maila'
export type Tone = 'purple' | 'blue' | 'cyan' | 'green' | 'red'

export interface TheoryTab {
    id: TheoryTabId
    icon: string
    label: LocalizedText
}

export interface TheoryCard {
    icon: string
    tone: Tone
    title: LocalizedText
    body: LocalizedText
    formula?: LocalizedText
    note?: LocalizedText
    examples?: LocalizedText[]
    steps?: LocalizedText[]
}

export interface TableRow {
    cells: LocalizedText[]
}

export interface TheorySection {
    id: TheoryTabId
    cards: TheoryCard[]
    table?: {
        title: LocalizedText
        headers: LocalizedText[]
        rows: TableRow[]
    }
}

export const theoryLabels = {
    title: { eu: 'Ekuazioen Teoria', es: 'Teoría de Ecuaciones', ar: 'نظرية المعادلات' },
    subtitle: {
        eu: 'Ezezaguna askatzeko teknikak, problemak planteatzeko pausoak eta bigarren mailako oinarriak.',
        es: 'Técnicas para despejar incógnitas, plantear problemas y entender el segundo grado básico.',
        ar: 'تقنيات لعزل المجهول وصياغة المسائل وفهم أساسيات الدرجة الثانية.'
    },
    example: { eu: 'Adibidea', es: 'Ejemplo', ar: 'مثال' },
    examples: { eu: 'Adibideak', es: 'Ejemplos', ar: 'أمثلة' },
    steps: { eu: 'Pausoak', es: 'Pasos', ar: 'الخطوات' },
    note: { eu: 'Kontuan hartu', es: 'Ten en cuenta', ar: 'انتبه' }
} satisfies Record<string, LocalizedText>

export const theoryTabs: TheoryTab[] = [
    { id: 'esanahia', icon: '=', label: { eu: 'Esanahia', es: 'Significado', ar: 'المعنى' } },
    { id: 'elementuak', icon: 'E', label: { eu: 'Elementuak', es: 'Elementos', ar: 'العناصر' } },
    { id: 'balantza', icon: '=', label: { eu: 'Balantza', es: 'Balanza', ar: 'الميزان' } },
    { id: 'lehen-maila', icon: 'x', label: { eu: 'Lehen maila', es: 'Primer grado', ar: 'الدرجة الأولى' } },
    { id: 'parentesiak', icon: '()', label: { eu: 'Parentesiak', es: 'Paréntesis', ar: 'الأقواس' } },
    { id: 'problemak', icon: '?', label: { eu: 'Problemak', es: 'Problemas', ar: 'المسائل' } },
    { id: 'bigarren-maila', icon: 'x²', label: { eu: 'Bigarren maila', es: 'Segundo grado', ar: 'الدرجة الثانية' } }
]

export const theorySections: Record<TheoryTabId, TheorySection> = {
    esanahia: {
        id: 'esanahia',
        cards: [
            {
                icon: '=',
                tone: 'purple',
                title: { eu: 'Zer da ekuazio bat?', es: '¿Qué es una ecuación?', ar: 'ما هي المعادلة؟' },
                body: {
                    eu: 'Ekuazio bat berdintasun bat da, eta normalean balio ezezagun bat dauka. Helburua ezezagunaren balioa aurkitzea da.',
                    es: 'Una ecuación es una igualdad que normalmente contiene un valor desconocido. El objetivo es encontrar ese valor.',
                    ar: 'المعادلة مساواة تحتوي غالباً على قيمة مجهولة. الهدف هو إيجاد قيمة هذا المجهول.'
                },
                formula: { eu: '$$2x+3=11$$', es: '$$2x+3=11$$', ar: '$$2x+3=11$$' },
                note: {
                    eu: '$x=4$ jarrita, $2\\cdot4+3=11$ betetzen da; beraz, 4 soluzioa da.',
                    es: 'Al poner $x=4$, se cumple $2\\cdot4+3=11$; por eso 4 es solución.',
                    ar: 'عند وضع $x=4$ نحصل على $2\\cdot4+3=11$؛ لذلك 4 حل.'
                }
            },
            {
                icon: '?',
                tone: 'blue',
                title: { eu: 'Soluzioa egiaztatzea', es: 'Comprobar una solución', ar: 'التحقق من الحل' },
                body: {
                    eu: 'Balio bat soluzioa den jakiteko, ezezagunaren lekuan jarri eta bi aldeek balio bera duten ikusten dugu.',
                    es: 'Para saber si un valor es solución, lo sustituimos por la incógnita y miramos si ambos lados valen lo mismo.',
                    ar: 'لمعرفة إن كانت قيمة ما حلاً، نعوض بها مكان المجهول ونرى هل الطرفان متساويان.'
                },
                examples: [
                    { eu: '$x=3$ ez da soluzioa $2x+3=11$ ekuazioan, $2\\cdot3+3=9$.', es: '$x=3$ no es solución de $2x+3=11$, porque $2\\cdot3+3=9$.', ar: '$x=3$ ليس حلاً لـ $2x+3=11$ لأن $2\\cdot3+3=9$.' },
                    { eu: '$x=4$ bai da soluzioa.', es: '$x=4$ sí es solución.', ar: '$x=4$ هو حل.' }
                ]
            }
        ]
    },
    elementuak: {
        id: 'elementuak',
        cards: [
            {
                icon: 'E',
                tone: 'cyan',
                title: { eu: 'Kideak, terminoak eta ezezaguna', es: 'Miembros, términos e incógnita', ar: 'الأطراف والحدود والمجهول' },
                body: {
                    eu: 'Berdin zeinuaren alde bakoitza kide bat da. Batugai bakoitza termino bat da, eta ezezaguna bilatu nahi dugun letra da.',
                    es: 'Cada lado del signo igual es un miembro. Cada sumando es un término, y la incógnita es la letra que queremos encontrar.',
                    ar: 'كل جهة من إشارة المساواة تسمى طرفاً. كل جزء مجموع يسمى حداً، والمجهول هو الحرف الذي نبحث عنه.'
                },
                formula: { eu: '$$3x-5=10+x$$', es: '$$3x-5=10+x$$', ar: '$$3x-5=10+x$$' }
            },
            {
                icon: '📏',
                tone: 'green',
                title: { eu: 'Gradua', es: 'Grado', ar: 'الدرجة' },
                body: {
                    eu: 'Ekuazio baten gradua ezezagunak duen berretzailerik handiena da, ekuazioa sinplifikatu ondoren.',
                    es: 'El grado de una ecuación es el mayor exponente de la incógnita después de simplificarla.',
                    ar: 'درجة المعادلة هي أكبر أس للمجهول بعد تبسيطها.'
                },
                examples: [
                    { eu: '$5x-2=13$ lehen mailakoa da.', es: '$5x-2=13$ es de primer grado.', ar: '$5x-2=13$ من الدرجة الأولى.' },
                    { eu: '$x^2-9=0$ bigarren mailakoa da.', es: '$x^2-9=0$ es de segundo grado.', ar: '$x^2-9=0$ من الدرجة الثانية.' }
                ]
            }
        ],
        table: {
            title: { eu: 'Elementuen taula', es: 'Tabla de elementos', ar: 'جدول العناصر' },
            headers: [
                { eu: 'Ekuazioa', es: 'Ecuación', ar: 'المعادلة' },
                { eu: 'Ezezaguna', es: 'Incógnita', ar: 'المجهول' },
                { eu: 'Gradua', es: 'Grado', ar: 'الدرجة' },
                { eu: 'Soluzioa', es: 'Solución', ar: 'الحل' }
            ],
            rows: [
                { cells: [{ eu: '$x+6=10$', es: '$x+6=10$', ar: '$x+6=10$' }, { eu: '$x$', es: '$x$', ar: '$x$' }, { eu: '1', es: '1', ar: '1' }, { eu: '$x=4$', es: '$x=4$', ar: '$x=4$' }] },
                { cells: [{ eu: '$3x=21$', es: '$3x=21$', ar: '$3x=21$' }, { eu: '$x$', es: '$x$', ar: '$x$' }, { eu: '1', es: '1', ar: '1' }, { eu: '$x=7$', es: '$x=7$', ar: '$x=7$' }] },
                { cells: [{ eu: '$x^2=25$', es: '$x^2=25$', ar: '$x^2=25$' }, { eu: '$x$', es: '$x$', ar: '$x$' }, { eu: '2', es: '2', ar: '2' }, { eu: '$x=5$ edo $x=-5$', es: '$x=5$ o $x=-5$', ar: '$x=5$ أو $x=-5$' }] }
            ]
        }
    },
    balantza: {
        id: 'balantza',
        cards: [
            {
                icon: '=',
                tone: 'purple',
                title: { eu: 'Balantzaren printzipioa', es: 'Principio de la balanza', ar: 'مبدأ الميزان' },
                body: {
                    eu: 'Ekuazio batean alde batean egiten dugun eragiketa bera beste aldean ere egin behar dugu. Horrela oreka mantentzen da.',
                    es: 'En una ecuación, la operación que hacemos en un lado debe hacerse también en el otro. Así se mantiene el equilibrio.',
                    ar: 'في المعادلة، العملية التي نجريها في طرف يجب إجراؤها في الطرف الآخر أيضاً. هكذا نحافظ على التوازن.'
                },
                examples: [
                    { eu: '$x+5=12 \\Rightarrow x+5-5=12-5 \\Rightarrow x=7$', es: '$x+5=12 \\Rightarrow x+5-5=12-5 \\Rightarrow x=7$', ar: '$x+5=12 \\Rightarrow x+5-5=12-5 \\Rightarrow x=7$' }
                ]
            },
            {
                icon: '<>',
                tone: 'blue',
                title: { eu: 'Ekuazio baliokideak', es: 'Ecuaciones equivalentes', ar: 'معادلات متكافئة' },
                body: {
                    eu: 'Bi ekuazio baliokideak dira soluzio berak badituzte. Ebatzi bitartean ekuazio baliokideak sortzen ditugu.',
                    es: 'Dos ecuaciones son equivalentes si tienen las mismas soluciones. Al resolver vamos creando ecuaciones equivalentes.',
                    ar: 'تكون معادلتان متكافئتين إذا كان لهما الحلول نفسها. أثناء الحل ننشئ معادلات متكافئة.'
                },
                examples: [
                    { eu: '$2x+4=12$, $2x=8$ eta $x=4$ baliokideak dira.', es: '$2x+4=12$, $2x=8$ y $x=4$ son equivalentes.', ar: '$2x+4=12$ و $2x=8$ و $x=4$ متكافئة.' }
                ]
            }
        ]
    },
    'lehen-maila': {
        id: 'lehen-maila',
        cards: [
            {
                icon: 'x',
                tone: 'green',
                title: { eu: 'Lehen mailako ekuazio sinpleak', es: 'Ecuaciones simples de primer grado', ar: 'معادلات الدرجة الأولى البسيطة' },
                body: {
                    eu: 'Lehen mailako ekuazioetan ezezaguna lehen berreturan agertzen da. Helburua $x$ bakarrik uztea da.',
                    es: 'En las ecuaciones de primer grado la incógnita aparece elevada a uno. El objetivo es dejar $x$ sola.',
                    ar: 'في معادلات الدرجة الأولى يظهر المجهول بأس واحد. الهدف هو ترك $x$ وحدها.'
                },
                formula: { eu: '$$ax+b=c$$', es: '$$ax+b=c$$', ar: '$$ax+b=c$$' },
                steps: [
                    { eu: 'Zenbaki solteak beste aldera pasa.', es: 'Pasa los números sueltos al otro lado.', ar: 'انقل الأعداد المنفردة إلى الطرف الآخر.' },
                    { eu: 'Koefizientearekin zatitu.', es: 'Divide entre el coeficiente.', ar: 'اقسم على المعامل.' },
                    { eu: 'Egiaztatu ordezkapenarekin.', es: 'Comprueba sustituyendo.', ar: 'تحقق بالتعويض.' }
                ]
            },
            {
                icon: '()',
                tone: 'cyan',
                title: { eu: 'Adibide gidatua', es: 'Ejemplo guiado', ar: 'مثال موجه' },
                body: { eu: '$5x-3=22$ ekuazioa ebatziko dugu.', es: 'Vamos a resolver $5x-3=22$.', ar: 'سنحل المعادلة $5x-3=22$.' },
                examples: [
                    { eu: '$5x-3=22 \\Rightarrow 5x=25 \\Rightarrow x=5$', es: '$5x-3=22 \\Rightarrow 5x=25 \\Rightarrow x=5$', ar: '$5x-3=22 \\Rightarrow 5x=25 \\Rightarrow x=5$' }
                ]
            }
        ]
    },
    parentesiak: {
        id: 'parentesiak',
        cards: [
            {
                icon: '()',
                tone: 'red',
                title: { eu: 'Parentesiak dituzten ekuazioak', es: 'Ecuaciones con paréntesis', ar: 'معادلات فيها أقواس' },
                body: {
                    eu: 'Parentesiak badaude, banaketa-propietatea erabili edo lehenengo zatitu daiteke, egitura errazagoa bada.',
                    es: 'Si hay paréntesis, se usa la distributiva o se divide primero si la estructura lo permite.',
                    ar: 'إذا وجدت أقواس نستعمل خاصية التوزيع أو نقسم أولاً إذا كان ذلك أسهل.'
                },
                examples: [
                    { eu: '$3(x-2)=12 \\Rightarrow x-2=4 \\Rightarrow x=6$', es: '$3(x-2)=12 \\Rightarrow x-2=4 \\Rightarrow x=6$', ar: '$3(x-2)=12 \\Rightarrow x-2=4 \\Rightarrow x=6$' },
                    { eu: '$2(x+5)=3x+4 \\Rightarrow 2x+10=3x+4 \\Rightarrow x=6$', es: '$2(x+5)=3x+4 \\Rightarrow 2x+10=3x+4 \\Rightarrow x=6$', ar: '$2(x+5)=3x+4 \\Rightarrow 2x+10=3x+4 \\Rightarrow x=6$' }
                ]
            },
            {
                icon: '⅓',
                tone: 'blue',
                title: { eu: 'Izendatzaileak dituzten ekuazioak', es: 'Ecuaciones con denominadores', ar: 'معادلات فيها مقامات' },
                body: {
                    eu: 'Izendatzaileak kentzeko, alde guztiak izendatzaileen MKTarekin biderkatzen dira.',
                    es: 'Para quitar denominadores, se multiplican todos los términos por el m.c.m. de los denominadores.',
                    ar: 'لإزالة المقامات نضرب كل الحدود في المضاعف المشترك الأصغر للمقامات.'
                },
                examples: [
                    { eu: '$\\frac{x}{3}+2=7 \\Rightarrow \\frac{x}{3}=5 \\Rightarrow x=15$', es: '$\\frac{x}{3}+2=7 \\Rightarrow \\frac{x}{3}=5 \\Rightarrow x=15$', ar: '$\\frac{x}{3}+2=7 \\Rightarrow \\frac{x}{3}=5 \\Rightarrow x=15$' }
                ]
            }
        ]
    },
    problemak: {
        id: 'problemak',
        cards: [
            {
                icon: '?',
                tone: 'green',
                title: { eu: 'Problemak planteatzeko metodoa', es: 'Método para plantear problemas', ar: 'طريقة صياغة المسائل' },
                body: {
                    eu: 'Testua ekuazio bihurtu aurretik, ezezaguna aukeratu eta datuen arteko erlazioa argi idatzi behar da.',
                    es: 'Antes de convertir el texto en ecuación, hay que elegir la incógnita y escribir claramente la relación entre los datos.',
                    ar: 'قبل تحويل النص إلى معادلة، نختار المجهول ونكتب العلاقة بين المعطيات بوضوح.'
                },
                steps: [
                    { eu: 'Aukeratu ezezaguna: zer galdetzen da?', es: 'Elige la incógnita: ¿qué se pregunta?', ar: 'اختر المجهول: ما المطلوب؟' },
                    { eu: 'Itzuli datuak adierazpenetara.', es: 'Traduce los datos a expresiones.', ar: 'حوّل المعطيات إلى تعبيرات.' },
                    { eu: 'Idatzi ekuazioa eta ebatzi.', es: 'Escribe la ecuación y resuelve.', ar: 'اكتب المعادلة وحلها.' },
                    { eu: 'Erantzuna testuinguruan eman.', es: 'Da la respuesta en el contexto.', ar: 'أعط الجواب في سياقه.' }
                ]
            },
            {
                icon: 'P',
                tone: 'purple',
                title: { eu: 'Erosketa baten adibidea', es: 'Ejemplo de compra', ar: 'مثال شراء' },
                body: {
                    eu: 'Kamiseta batek zapi batek baino 14 euro gehiago balio du, eta biek 50 euro balio dute.',
                    es: 'Una camiseta cuesta 14 euros más que un pañuelo, y los dos cuestan 50 euros.',
                    ar: 'قميص ثمنه أكبر من منديل بـ 14 يورو، وكلاهما يساوي 50 يورو.'
                },
                examples: [
                    { eu: 'Zapia: $x$; kamiseta: $x+14$; $x+x+14=50 \\Rightarrow x=18$.', es: 'Pañuelo: $x$; camiseta: $x+14$; $x+x+14=50 \\Rightarrow x=18$.', ar: 'المنديل: $x$؛ القميص: $x+14$؛ $x+x+14=50 \\Rightarrow x=18$.' }
                ],
                note: { eu: 'Zapia 18 euro eta kamiseta 32 euro.', es: 'El pañuelo cuesta 18 euros y la camiseta 32 euros.', ar: 'المنديل 18 يورو والقميص 32 يورو.' }
            }
        ]
    },
    'bigarren-maila': {
        id: 'bigarren-maila',
        cards: [
            {
                icon: '²',
                tone: 'purple',
                title: { eu: 'Forma orokorra', es: 'Forma general', ar: 'الصيغة العامة' },
                body: {
                    eu: 'Bigarren mailako ekuazioetan $x^2$ agertzen da. Forma orokorrean dena alde batera eramaten da.',
                    es: 'En las ecuaciones de segundo grado aparece $x^2$. En la forma general se lleva todo a un lado.',
                    ar: 'في معادلات الدرجة الثانية يظهر $x^2$. في الصيغة العامة ننقل كل شيء إلى طرف واحد.'
                },
                formula: { eu: '$$ax^2+bx+c=0 \\quad (a\\ne0)$$', es: '$$ax^2+bx+c=0 \\quad (a\\ne0)$$', ar: '$$ax^2+bx+c=0 \\quad (a\\ne0)$$' }
            },
            {
                icon: '√',
                tone: 'blue',
                title: { eu: 'Formula eta diskriminatzailea', es: 'Fórmula y discriminante', ar: 'القانون والمميز' },
                body: {
                    eu: 'Formula orokorrak soluzioak ematen ditu. Diskriminatzaileak zenbat soluzio erreal dauden esaten du.',
                    es: 'La fórmula general da las soluciones. El discriminante indica cuántas soluciones reales hay.',
                    ar: 'القانون العام يعطي الحلول. المميز يحدد عدد الحلول الحقيقية.'
                },
                formula: { eu: '$$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a},\\quad \\Delta=b^2-4ac$$', es: '$$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a},\\quad \\Delta=b^2-4ac$$', ar: '$$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a},\\quad \\Delta=b^2-4ac$$' },
                examples: [
                    { eu: '$\\Delta>0$: bi soluzio erreal.', es: '$\\Delta>0$: dos soluciones reales.', ar: '$\\Delta>0$: حلان حقيقيان.' },
                    { eu: '$\\Delta=0$: soluzio erreal bikoitza.', es: '$\\Delta=0$: una solución real doble.', ar: '$\\Delta=0$: حل حقيقي مزدوج.' },
                    { eu: '$\\Delta<0$: ez dago soluzio errealik.', es: '$\\Delta<0$: no hay soluciones reales.', ar: '$\\Delta<0$: لا توجد حلول حقيقية.' }
                ]
            }
        ]
    }
}

import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { notation } from './notation'
import { CoincidenceFigure, DivisorRectanglesFigure, FactorLadderFigure, MultiplesFigure, SieveFigure, VennFigure } from './figures'

/* ==========================================================================
   Zatigarritasuna · 2. DBH — stages and lessons
   Sequence follows the class textbook (Santillana, unit 1, pages 14–19):
   multiples and divisors, divisibility rules, primes and factorization,
   ZKH and MKT, and problems. The rule for 7 and the four steps to solve
   problems come from the class handouts. Notation: M(a), Zat(a) / Div(a),
   ZKH / m.c.d. and MKT / m.c.m.
   ========================================================================== */

export type DivisibilityStageId = 'multiples' | 'criteria' | 'primes' | 'gcd-lcm' | 'problems'

export const divisibilityStages: UnitStage[] = [
    { id: 'multiples', tone: 'blue', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', ar: 'المضاعفات والقواسم' } },
    { id: 'criteria', tone: 'violet', title: { eu: 'Zatigarritasun irizpideak', es: 'Criterios de divisibilidad', ar: 'قواعد قابلية القسمة' } },
    { id: 'primes', tone: 'mustard', title: { eu: 'Zenbaki lehenak eta faktorizazioa', es: 'Números primos y factorización', ar: 'الأعداد الأولية والتحليل' } },
    { id: 'gcd-lcm', tone: 'coral', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', ar: 'ق.م.أ و م.م.أ' } },
    { id: 'problems', tone: 'green', title: { eu: 'Buruketak', es: 'Problemas', ar: 'المسائل' } }
]

export const divisibilityTopics: UnitTopic[] = [
    {
        id: 'relation',
        stage: 'multiples',
        title: { eu: 'Zatigarritasun erlazioa', es: 'La relación de divisibilidad', ar: 'علاقة قابلية القسمة' },
        goal: {
            eu: 'Zatiketa zehatz batean multiploa eta zatitzailea bereiztea.',
            es: 'Reconocer el múltiplo y el divisor en una división exacta.',
            ar: 'التمييز بين المضاعف والقاسم في قسمة تامة.'
        },
        explanation: {
            eu: 'Bi zenbakiren arteko zatiketaren hondarra 0 denean, zatiketa zehatza da eta zenbakien artean zatigarritasun erlazioa dago. Erlazio bera bi modutara esan daiteke: a zenbakia b-ren multiploa da, edo b zenbakia a-ren zatitzailea da. Hondarra 0 ez bada, ez dago erlaziorik.',
            es: 'Cuando el resto de la división entre dos números es 0, la división es exacta y entre los números hay una relación de divisibilidad. La misma relación se puede decir de dos formas: a es múltiplo de b, o b es divisor de a. Si el resto no es 0, no hay relación.',
            ar: 'عندما يكون باقي قسمة عدد على آخر 0 تكون القسمة تامة، وتوجد بين العددين علاقة قابلية القسمة. ويمكن التعبير عن هذه العلاقة بطريقتين: a مضاعف لـ b، أو b قاسم لـ a. وإذا لم يكن الباقي 0 فلا توجد علاقة.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Zatiketa zehatza', es: 'División exacta', ar: 'قسمة تامة' },
                text: { eu: '24 : 6 = 4 eta hondarra 0 da. Beraz, 24 6ren multiploa da, eta 6 24ren zatitzailea.', es: '24 : 6 = 4 y el resto es 0. Por tanto, 24 es múltiplo de 6 y 6 es divisor de 24.', ar: '24 : 6 = 4 والباقي 0. إذن 24 مضاعف لـ 6، و6 قاسم لـ 24.' },
                math: '$24=6\\cdot 4$'
            },
            {
                title: { eu: 'Zatiketa ez-zehatza', es: 'División no exacta', ar: 'قسمة غير تامة' },
                text: { eu: '25 : 6 = 4 eta hondarra 1 da. 25 ez da 6ren multiploa, eta 6 ez da 25en zatitzailea.', es: '25 : 6 = 4 y el resto es 1. 25 no es múltiplo de 6 y 6 no es divisor de 25.', ar: '25 : 6 = 4 والباقي 1. العدد 25 ليس مضاعفًا لـ 6، و6 ليس قاسمًا لـ 25.' },
                math: '$25=6\\cdot 4+1$'
            },
            {
                title: { eu: 'Hitz berdinak', es: 'Expresiones equivalentes', ar: 'عبارات متكافئة' },
                text: { eu: '«a b-ren multiploa da», «b a-ren zatitzailea da» eta «a b-rekin zatigarria da» gauza bera esateko hiru modu dira.', es: '«a es múltiplo de b», «b es divisor de a» y «a es divisible por b» son tres formas de decir lo mismo.', ar: '«a مضاعف لـ b» و«b قاسم لـ a» و«a يقبل القسمة على b» ثلاث طرق لقول الشيء نفسه.' }
            }
        ],
        example: '$\\begin{array}{r|l}24&6\\\\\\hline 0&4\\end{array}\\qquad\\begin{array}{r|l}25&6\\\\\\hline 1&4\\end{array}$',
        takeaway: {
            eu: 'Hondarra 0 → zatigarritasun erlazioa dago.',
            es: 'Resto 0 → hay relación de divisibilidad.',
            ar: 'الباقي 0 ← توجد علاقة قابلية القسمة.'
        }
    },
    {
        id: 'multiples',
        stage: 'multiples',
        title: { eu: 'Zenbaki baten multiploak', es: 'Los múltiplos de un número', ar: 'مضاعفات عدد' },
        goal: {
            eu: 'Zenbaki baten multiploak kalkulatzea eta multiplo komunak aurkitzea.',
            es: 'Calcular los múltiplos de un número y encontrar múltiplos comunes.',
            ar: 'حساب مضاعفات عدد وإيجاد المضاعفات المشتركة.'
        },
        explanation: {
            eu: 'Zenbaki baten multiploak lortzeko, zenbaki hori 1, 2, 3, 4… zenbaki naturalekin biderkatzen da. Multiploen multzoa M(a) idazten da, eta infinitua da: ez du amaierarik. Bi zenbakiren multiplo komunak bi zerrendetan agertzen direnak dira.',
            es: 'Para obtener los múltiplos de un número, se multiplica por los números naturales 1, 2, 3, 4… El conjunto de múltiplos se escribe M(a) y es infinito: no se acaba nunca. Los múltiplos comunes de dos números son los que aparecen en las dos listas.',
            ar: 'للحصول على مضاعفات عدد نضربه في الأعداد الطبيعية 1، 2، 3، 4… وتُكتب مجموعة المضاعفات M(a) وهي غير منتهية. والمضاعفات المشتركة لعددين هي التي تظهر في القائمتين.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Nola kalkulatu', es: 'Cómo se calculan', ar: 'كيف نحسبها' },
                text: { eu: 'Biderkatu 1ez, 2z, 3z… Lehen multiploa zenbakia bera da.', es: 'Multiplica por 1, 2, 3… El primer múltiplo es el propio número.', ar: 'اضرب في 1، 2، 3… وأول مضاعف هو العدد نفسه.' },
                math: '$\\mathrm{M}(4)=\\{4,\\ 8,\\ 12,\\ 16,\\ 20,\\ \\dots\\}$'
            },
            {
                title: { eu: 'Infinituak dira', es: 'Son infinitos', ar: 'غير منتهية' },
                text: { eu: 'Beti egin daiteke beste biderketa bat; horregatik, multiploen zerrenda ez da inoiz amaitzen.', es: 'Siempre se puede hacer otra multiplicación; por eso la lista de múltiplos nunca termina.', ar: 'يمكن دائمًا إجراء ضرب آخر؛ لذلك لا تنتهي قائمة المضاعفات أبدًا.' }
            },
            {
                title: { eu: 'Multiplo komunak', es: 'Múltiplos comunes', ar: 'المضاعفات المشتركة' },
                text: { eu: '4ren eta 6ren multiplo komunak: 12, 24, 36… Txikiena 12 da.', es: 'Múltiplos comunes de 4 y 6: 12, 24, 36… El menor es 12.', ar: 'المضاعفات المشتركة لـ 4 و6: 12، 24، 36… وأصغرها 12.' },
                math: '$\\mathrm{M}(6)=\\{6,\\ 12,\\ 18,\\ 24,\\ \\dots\\}$'
            }
        ],
        example: '$\\mathrm{M}(3)=\\{3,\\ 6,\\ 9,\\ 12,\\ 15,\\ 18,\\ \\dots\\}$',
        takeaway: {
            eu: 'Multiploak = biderketak. Infinituak dira, eta txikiena zenbakia bera da.',
            es: 'Múltiplos = multiplicaciones. Son infinitos y el menor es el propio número.',
            ar: 'المضاعفات = عمليات ضرب. هي غير منتهية وأصغرها العدد نفسه.'
        },
        figure: (language) => <MultiplesFigure step={3} max={24} language={language} />
    },
    {
        id: 'divisors',
        stage: 'multiples',
        title: { eu: 'Zenbaki baten zatitzaileak', es: 'Los divisores de un número', ar: 'قواسم عدد' },
        goal: {
            eu: 'Zenbaki baten zatitzaile guztiak modu ordenatuan aurkitzea.',
            es: 'Encontrar de forma ordenada todos los divisores de un número.',
            ar: 'إيجاد جميع قواسم عدد بطريقة منظمة.'
        },
        explanation: {
            eu: 'Zenbaki baten zatitzaileak zenbaki hori zehazki zatitzen duten zenbakiak dira. Zat(a) idazten da, eta multzo finitua da: txikiena 1 da eta handiena zenbakia bera. Denak aurkitzeko, zatitu 1ez, 2z, 3z… eta idatzi zatitzaileak bikoteka; bikoteak errepikatzen hasten direnean, amaitu duzu.',
            es: 'Los divisores de un número son los números que lo dividen de forma exacta. Se escribe Div(a) y es un conjunto finito: el menor es 1 y el mayor, el propio número. Para encontrarlos todos, divide entre 1, 2, 3… y anota los divisores por parejas; cuando las parejas empiezan a repetirse, has terminado.',
            ar: 'قواسم عدد هي الأعداد التي تقسمه قسمة تامة. وتُكتب مجموعتها Zat(a) وهي منتهية: أصغرها 1 وأكبرها العدد نفسه. لإيجادها كلها اقسم على 1، 2، 3… واكتب القواسم أزواجًا؛ وعندما تبدأ الأزواج بالتكرار تكون قد انتهيت.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zatitu 1ez eta idatzi bikotea.', es: 'Divide entre 1 y anota la pareja.', ar: 'اقسم على 1 واكتب الزوج.' }, math: '$36=1\\cdot 36$' },
            { text: { eu: 'Jarraitu 2, 3, 4… zatiketa zehatzak bilatuz.', es: 'Sigue con 2, 3, 4… buscando divisiones exactas.', ar: 'تابع مع 2، 3، 4… باحثًا عن القسمة التامة.' }, math: '$36=2\\cdot 18=3\\cdot 12=4\\cdot 9$' },
            { text: { eu: 'Gelditu bikoteko bi zenbakiak elkartzen direnean.', es: 'Para cuando los dos números de la pareja se encuentran.', ar: 'توقّف عندما يلتقي عددا الزوج.' }, math: '$36=6\\cdot 6$' },
            { text: { eu: 'Idatzi guztiak txikienetik handienera.', es: 'Escríbelos todos de menor a mayor.', ar: 'اكتبها كلها من الأصغر إلى الأكبر.' }, math: notation('$@DIV(36)=\\{1,2,3,4,6,9,12,18,36\\}$') }
        ],
        example: notation('$@DIV(12)=\\{1,\\ 2,\\ 3,\\ 4,\\ 6,\\ 12\\}$'),
        takeaway: {
            eu: 'Zatitzaileak bikoteka datoz. 1 eta zenbakia bera beti dira zatitzaileak.',
            es: 'Los divisores vienen por parejas. 1 y el propio número siempre son divisores.',
            ar: 'القواسم تأتي أزواجًا. العدد 1 والعدد نفسه قاسمان دائمًا.'
        },
        figure: (language) => <DivisorRectanglesFigure n={12} language={language} />
    },
    {
        id: 'criteria-digit',
        stage: 'criteria',
        title: { eu: 'Azken zifra: 2, 5 eta 10', es: 'La última cifra: 2, 5 y 10', ar: 'الرقم الأخير: 2 و5 و10' },
        goal: {
            eu: 'Zatiketa egin gabe jakitea zenbaki bat 2rekin, 5ekin edo 10ekin zatigarria den.',
            es: 'Saber sin dividir si un número es divisible por 2, 5 o 10.',
            ar: 'معرفة ما إذا كان العدد يقبل القسمة على 2 أو 5 أو 10 دون إجراء القسمة.'
        },
        explanation: {
            eu: 'Zatigarritasun irizpideek zatiketa egin gabe esaten digute zenbaki bat beste batekin zatigarria den. 2, 5 eta 10en kasuan, nahikoa da azken zifrari begiratzea.',
            es: 'Los criterios de divisibilidad nos dicen, sin hacer la división, si un número es divisible por otro. Para 2, 5 y 10 basta con mirar la última cifra.',
            ar: 'تخبرنا قواعد قابلية القسمة، دون إجراء القسمة، هل يقبل عدد القسمة على آخر. وبالنسبة إلى 2 و5 و10 يكفي النظر إلى الرقم الأخير.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: '2rekin', es: 'Por 2', ar: 'على 2' }, text: { eu: 'Azken zifra bikoitia bada: 0, 2, 4, 6 edo 8.', es: 'Si la última cifra es par: 0, 2, 4, 6 u 8.', ar: 'إذا كان الرقم الأخير زوجيًا: 0 أو 2 أو 4 أو 6 أو 8.' }, math: '$3\\,232\\ \\checkmark\\qquad 3\\,235\\ \\times$' },
            { title: { eu: '5ekin', es: 'Por 5', ar: 'على 5' }, text: { eu: 'Azken zifra 0 edo 5 bada.', es: 'Si la última cifra es 0 o 5.', ar: 'إذا كان الرقم الأخير 0 أو 5.' }, math: '$3\\,235\\ \\checkmark\\qquad 3\\,232\\ \\times$' },
            { title: { eu: '10ekin', es: 'Por 10', ar: 'على 10' }, text: { eu: 'Azken zifra 0 bada. 10ekin zatigarria dena 2rekin eta 5ekin ere bada.', es: 'Si la última cifra es 0. Lo que es divisible por 10 también lo es por 2 y por 5.', ar: 'إذا كان الرقم الأخير 0. وما يقبل القسمة على 10 يقبلها على 2 و5 أيضًا.' }, math: '$3\\,230\\ \\checkmark\\qquad 3\\,232\\ \\times$' }
        ],
        example: '$370\\mathbin{:}\\ \\text{2 } \\checkmark\\quad \\text{5 } \\checkmark\\quad \\text{10 } \\checkmark$',
        takeaway: {
            eu: '2, 5 eta 10: begiratu azken zifrari bakarrik.',
            es: '2, 5 y 10: mira solo la última cifra.',
            ar: '2 و5 و10: انظر إلى الرقم الأخير فقط.'
        }
    },
    {
        id: 'criteria-sum',
        stage: 'criteria',
        title: { eu: 'Zifren batura: 3 eta 9', es: 'La suma de las cifras: 3 y 9', ar: 'مجموع الأرقام: 3 و9' },
        goal: {
            eu: '3 eta 9ren irizpideak zifren baturarekin aplikatzea.',
            es: 'Aplicar los criterios del 3 y del 9 con la suma de las cifras.',
            ar: 'تطبيق قاعدتي 3 و9 باستعمال مجموع الأرقام.'
        },
        explanation: {
            eu: '3 eta 9ren kasuan ez da nahikoa azken zifra: zifra guztiak batu behar dira. Batura handia bada, haren zifrak berriro batu daitezke.',
            es: 'Para 3 y 9 no basta con la última cifra: hay que sumar todas las cifras. Si la suma es grande, se pueden volver a sumar sus cifras.',
            ar: 'بالنسبة إلى 3 و9 لا يكفي الرقم الأخير: يجب جمع كل الأرقام. وإذا كان المجموع كبيرًا يمكن جمع أرقامه من جديد.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: '3rekin', es: 'Por 3', ar: 'على 3' }, text: { eu: 'Zifren batura 3ren multiploa bada: 3, 6, 9, 12, 15…', es: 'Si la suma de sus cifras es múltiplo de 3: 3, 6, 9, 12, 15…', ar: 'إذا كان مجموع أرقامه مضاعفًا لـ 3: 3، 6، 9، 12، 15…' }, math: '$3\\,234\\mathbin{:}\\ 3+2+3+4=12\\ \\checkmark$' },
            { title: { eu: '9rekin', es: 'Por 9', ar: 'على 9' }, text: { eu: 'Zifren batura 9ren multiploa bada: 9, 18, 27…', es: 'Si la suma de sus cifras es múltiplo de 9: 9, 18, 27…', ar: 'إذا كان مجموع أرقامه مضاعفًا لـ 9: 9، 18، 27…' }, math: '$5\\,013\\mathbin{:}\\ 5+0+1+3=9\\ \\checkmark$' },
            { title: { eu: '6rekin', es: 'Por 6', ar: 'على 6' }, text: { eu: 'Irizpideak konbina daitezke: 6rekin zatigarria da 2rekin eta 3rekin zatigarria bada.', es: 'Los criterios se pueden combinar: es divisible por 6 si lo es por 2 y por 3.', ar: 'يمكن الجمع بين القواعد: يقبل القسمة على 6 إذا قبلها على 2 و3 معًا.' }, math: '$282\\mathbin{:}\\ \\text{2 } \\checkmark\\ \\ 2+8+2=12\\ \\checkmark$' }
        ],
        example: '$\\begin{gathered}147\\mathbin{:}\\ 1+4+7=12\\\\\\text{3 } \\checkmark\\quad \\text{9 } \\times\\end{gathered}$',
        takeaway: {
            eu: '3 eta 9: batu zifrak. 9rekin zatigarria dena 3rekin ere bada.',
            es: '3 y 9: suma las cifras. Lo que es divisible por 9 también lo es por 3.',
            ar: '3 و9: اجمع الأرقام. وما يقبل القسمة على 9 يقبلها على 3 أيضًا.'
        }
    },
    {
        id: 'criteria-11-7',
        stage: 'criteria',
        title: { eu: '11 eta 7ren irizpideak', es: 'Los criterios del 11 y del 7', ar: 'قاعدتا 11 و7' },
        goal: {
            eu: '11 eta 7ren irizpideak urratsez urrats aplikatzea.',
            es: 'Aplicar paso a paso los criterios del 11 y del 7.',
            ar: 'تطبيق قاعدتي 11 و7 خطوة بخطوة.'
        },
        explanation: {
            eu: '11 eta 7ren irizpideak luzeagoak dira, baina zenbaki handiekin ere balio dute. 11rentzat, zifrak posizioka bereizten dira; 7rentzat, azken zifra kentzen da eta haren bikoitza kentzen zaio geratzen den zenbakiari.',
            es: 'Los criterios del 11 y del 7 son más largos, pero sirven también con números grandes. Para el 11, las cifras se separan según su posición; para el 7, se quita la última cifra y se resta su doble al número que queda.',
            ar: 'قاعدتا 11 و7 أطول، لكنهما تصلحان للأعداد الكبيرة أيضًا. في قاعدة 11 تُفصل الأرقام حسب مواقعها؛ وفي قاعدة 7 يُحذف الرقم الأخير ويُطرح ضعفه من العدد الباقي.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: '11rekin', es: 'Por 11', ar: 'على 11' },
                text: { eu: 'Batu posizio bikoitietako zifrak eta posizio bakoitietakoak. Kendu bi baturak: emaitza 0 edo 11ren multiploa bada, zatigarria da.', es: 'Suma las cifras de lugar par y las de lugar impar. Resta las dos sumas: si da 0 o un múltiplo de 11, es divisible.', ar: 'اجمع الأرقام في المواقع الزوجية والأرقام في المواقع الفردية، ثم اطرح المجموعين: إذا كان الناتج 0 أو مضاعفًا لـ 11 فالعدد يقبل القسمة.' },
                math: '$3\\,234\\mathbin{:}\\ (2+4)-(3+3)=0\\ \\checkmark$'
            },
            {
                title: { eu: '7rekin', es: 'Por 7', ar: 'على 7' },
                text: { eu: 'Kendu unitateen zifra eta kendu haren bikoitza geratzen den zenbakiari. Emaitza 0 edo 7ren multiploa bada, zatigarria da. Handia bada, errepikatu.', es: 'Quita la cifra de las unidades y resta su doble al número que queda. Si da 0 o un múltiplo de 7, es divisible. Si es grande, repite.', ar: 'احذف رقم الآحاد واطرح ضعفه من العدد الباقي. إذا كان الناتج 0 أو مضاعفًا لـ 7 فالعدد يقبل القسمة. وإن كان كبيرًا فكرّر.' },
                math: '$3\\,234\\mathbin{:}\\ 323-8=315;\\ 31-10=21\\ \\checkmark$'
            }
        ],
        example: '$\\begin{gathered}3\\,238\\mathbin{:}\\ (8+2)-(3+3)=4\\\\\\text{11 } \\times\\end{gathered}$',
        takeaway: {
            eu: '11: posizio bikoitiak − bakoitiak. 7: kendu azken zifraren bikoitza.',
            es: '11: lugares pares − impares. 7: resta el doble de la última cifra.',
            ar: '11: المواقع الزوجية − الفردية. 7: اطرح ضعف الرقم الأخير.'
        }
    },
    {
        id: 'primes',
        stage: 'primes',
        title: { eu: 'Zenbaki lehenak eta konposatuak', es: 'Números primos y compuestos', ar: 'الأعداد الأولية والمؤلفة' },
        goal: {
            eu: 'Zenbaki bat lehena ala konposatua den erabakitzea.',
            es: 'Decidir si un número es primo o compuesto.',
            ar: 'تحديد ما إذا كان العدد أوليًا أم مؤلفًا.'
        },
        explanation: {
            eu: 'Zenbaki lehenak bi zatitzaile baino ez dituzte: 1 eta zenbakia bera. Zenbaki konposatuek bi zatitzaile baino gehiago dituzte. 1 zenbakiak zatitzaile bakarra du; beraz, ez da ez lehena ez konposatua. Eratostenesen baheak 100 arteko lehenak aurkitzen laguntzen du.',
            es: 'Los números primos solo tienen dos divisores: 1 y el propio número. Los números compuestos tienen más de dos divisores. El 1 solo tiene un divisor, así que no es ni primo ni compuesto. La criba de Eratóstenes ayuda a encontrar los primos hasta 100.',
            ar: 'للأعداد الأولية قاسمان فقط: 1 والعدد نفسه. وللأعداد المؤلفة أكثر من قاسمين. أما العدد 1 فله قاسم واحد، فهو ليس أوليًا ولا مؤلفًا. ويساعد غربال إراتوستينس على إيجاد الأعداد الأولية حتى 100.'
        },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'Eratostenesen bahea', es: 'Criba de Eratóstenes', ar: 'غربال إراتوستينس' }, text: { eu: 'Ratatu 1. Utzi 2 eta ratatu haren multiplo guztiak.', es: 'Tacha el 1. Deja el 2 y tacha todos sus múltiplos.', ar: 'اشطب 1. أبقِ 2 واشطب كل مضاعفاته.' } },
            { text: { eu: 'Hurrengo ratatu gabea (3) lehena da: ratatu haren multiploak.', es: 'El siguiente sin tachar (3) es primo: tacha sus múltiplos.', ar: 'العدد التالي غير المشطوب (3) أولي: اشطب مضاعفاته.' } },
            { text: { eu: 'Errepikatu 5ekin, 7rekin… Ratatu gabe geratzen direnak lehenak dira.', es: 'Repite con 5, 7… Los que quedan sin tachar son primos.', ar: 'كرّر مع 5، 7… والأعداد التي تبقى غير مشطوبة أولية.' }, math: '$2,3,5,7,11,13,17,19,23,29,\\dots$' }
        ],
        example: notation('$\\begin{gathered}@DIV(31)=\\{1,31\\}\\\\@DIV(32)=\\{1,2,4,8,16,32\\}\\end{gathered}$'),
        takeaway: {
            eu: 'Lehena: bi zatitzaile bakarrik. 2 da lehen bikoiti bakarra.',
            es: 'Primo: solo dos divisores. El 2 es el único primo par.',
            ar: 'الأولي: له قاسمان فقط. والعدد 2 هو العدد الأولي الزوجي الوحيد.'
        },
        figure: (language) => <SieveFigure language={language} />
    },
    {
        id: 'factorization',
        stage: 'primes',
        title: { eu: 'Biderkagai lehenetan deskonposatzea', es: 'Descomposición en factores primos', ar: 'التحليل إلى عوامل أولية' },
        goal: {
            eu: 'Zenbaki bat zenbaki lehenen biderkadura gisa idaztea, berreturak erabiliz.',
            es: 'Escribir un número como producto de números primos, usando potencias.',
            ar: 'كتابة عدد في صورة حاصل ضرب أعداد أولية باستعمال القوى.'
        },
        explanation: {
            eu: 'Zenbaki konposatu oro zenbaki lehenen biderkadura gisa idatz daiteke, eta modu bakarra dago. Horretarako, zatitu zenbakia lehen txikienaz (zatigarritasun irizpideak erabiliz), gero zatidura, eta horrela 1 lortu arte. Biderkagai errepikatuak berretura gisa idazten dira.',
            es: 'Todo número compuesto se puede escribir como producto de números primos, y de una única forma. Para ello, divide el número entre el menor primo posible (usando los criterios de divisibilidad), después el cociente, y así hasta llegar a 1. Los factores repetidos se escriben como potencias.',
            ar: 'يمكن كتابة كل عدد مؤلف في صورة حاصل ضرب أعداد أولية، وبطريقة واحدة فقط. لذلك اقسم العدد على أصغر عدد أولي ممكن (باستعمال قواعد قابلية القسمة)، ثم اقسم الناتج، وهكذا حتى تصل إلى 1. وتُكتب العوامل المكررة في صورة قوى.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Idatzi zenbakia marra bertikal baten ezkerrean.', es: 'Escribe el número a la izquierda de una raya vertical.', ar: 'اكتب العدد على يسار خط عمودي.' } },
            { text: { eu: 'Zatitu ahal den lehen txikienaz eta idatzi eskuinean; zatidura azpian.', es: 'Divide entre el menor primo posible y escríbelo a la derecha; el cociente, debajo.', ar: 'اقسم على أصغر عدد أولي ممكن واكتبه على اليمين، والناتج تحته.' }, math: '$360\\mathbin{:}2=180$' },
            { text: { eu: 'Jarraitu 1 lortu arte.', es: 'Sigue hasta llegar a 1.', ar: 'تابع حتى تصل إلى 1.' } },
            { text: { eu: 'Bildu eskuineko lehenak berreturetan.', es: 'Agrupa los primos de la derecha en potencias.', ar: 'اجمع الأعداد الأولية التي على اليمين في صورة قوى.' }, math: '$360=2^{3}\\cdot 3^{2}\\cdot 5$' }
        ],
        example: '$60=2^{2}\\cdot 3\\cdot 5\\qquad 72=2^{3}\\cdot 3^{2}$',
        takeaway: {
            eu: 'Biderkagai guztiak lehenak izan behar dira: 60 = 3 · 4 · 5 ez dago ondo, 4 ez delako lehena.',
            es: 'Todos los factores deben ser primos: 60 = 3 · 4 · 5 no está bien, porque 4 no es primo.',
            ar: 'يجب أن تكون كل العوامل أولية: ‏60 = 3 · 4 · 5 غير صحيح لأن 4 ليس أوليًا.'
        },
        figure: (language) => <FactorLadderFigure n={360} language={language} />
    },
    {
        id: 'gcd',
        stage: 'gcd-lcm',
        title: { eu: 'Zatitzaile komunetako handiena (ZKH)', es: 'Máximo común divisor (m.c.d.)', ar: 'القاسم المشترك الأكبر (ق.م.أ · ZKH)' },
        goal: {
            eu: 'ZKH zerrendekin eta faktorizazioarekin kalkulatzea.',
            es: 'Calcular el m.c.d. con listas y por factorización.',
            ar: 'حساب ق.م.أ بالقوائم وبالتحليل إلى عوامل.'
        },
        explanation: {
            eu: 'Bi zenbaki edo gehiagoren ZKH denen zatitzaile komunetatik handiena da. Zenbaki txikiekin, idatzi zatitzaileen zerrendak eta hartu komunetatik handiena. Zenbaki handiekin, deskonposatu biderkagai lehenetan eta biderkatu biderkagai komunak berretzaile txikienarekin.',
            es: 'El m.c.d. de dos o más números es el mayor de sus divisores comunes. Con números pequeños, escribe las listas de divisores y toma el mayor de los comunes. Con números grandes, descompón en factores primos y multiplica los factores comunes con el menor exponente.',
            ar: 'ق.م.أ لعددين أو أكثر هو أكبر قواسمهما المشتركة. مع الأعداد الصغيرة اكتب قوائم القواسم وخذ أكبر المشترك منها. ومع الأعداد الكبيرة حلّل إلى عوامل أولية واضرب العوامل المشتركة بأصغر أس.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Deskonposatu zenbaki bakoitza.', es: 'Descompón cada número.', ar: 'حلّل كل عدد.' }, math: '$24=2^{3}\\cdot 3\\qquad 36=2^{2}\\cdot 3^{2}$' },
            { text: { eu: 'Hartu biderkagai komunak bakarrik.', es: 'Toma solo los factores comunes.', ar: 'خذ العوامل المشتركة فقط.' }, math: '$2,\\ 3$' },
            { text: { eu: 'Bakoitza berretzaile txikienarekin, eta biderkatu.', es: 'Cada uno con su menor exponente, y multiplica.', ar: 'كل عامل بأصغر أس ثم اضرب.' }, math: notation('$@GCD(24,36)=2^{2}\\cdot 3=12$') }
        ],
        example: notation('$\\begin{gathered}@DIV(12)\\cap @DIV(18)=\\{1,2,3,6\\}\\\\@GCD(12,18)=6\\end{gathered}$'),
        takeaway: {
            eu: 'ZKH: komunak, berretzaile txikienarekin. Ezin da zenbakirik txikiena baino handiagoa izan.',
            es: 'm.c.d.: comunes, con el menor exponente. Nunca es mayor que el menor de los números.',
            ar: 'ق.م.أ: المشتركة بأصغر أس. ولا يكون أبدًا أكبر من أصغر الأعداد.'
        },
        figure: (language) => <VennFigure language={language} />
    },
    {
        id: 'lcm',
        stage: 'gcd-lcm',
        title: { eu: 'Multiplo komunetako txikiena (MKT)', es: 'Mínimo común múltiplo (m.c.m.)', ar: 'المضاعف المشترك الأصغر (م.م.أ · MKT)' },
        goal: {
            eu: 'MKT kalkulatzea eta ZKHrekin ez nahastea.',
            es: 'Calcular el m.c.m. y no confundirlo con el m.c.d.',
            ar: 'حساب م.م.أ وعدم الخلط بينه وبين ق.م.أ.'
        },
        explanation: {
            eu: 'Bi zenbaki edo gehiagoren MKT denen multiplo komunetatik txikiena da (0 kontatu gabe). Zenbaki txikiekin, idatzi multiploen zerrendak. Zenbaki handiekin, deskonposatu eta biderkatu biderkagai komunak eta ez-komunak, bakoitza berretzaile handienarekin. Bi zenbakiren ZKH 1 bada, elkarren arteko lehenak dira, eta haien MKT biderkadura da.',
            es: 'El m.c.m. de dos o más números es el menor de sus múltiplos comunes (sin contar el 0). Con números pequeños, escribe las listas de múltiplos. Con números grandes, descompón y multiplica los factores comunes y no comunes, cada uno con su mayor exponente. Si el m.c.d. de dos números es 1, son primos entre sí y su m.c.m. es su producto.',
            ar: 'م.م.أ لعددين أو أكثر هو أصغر مضاعفاتهما المشتركة (دون احتساب 0). مع الأعداد الصغيرة اكتب قوائم المضاعفات. ومع الأعداد الكبيرة حلّل واضرب العوامل المشتركة وغير المشتركة، كل منها بأكبر أس. وإذا كان ق.م.أ لعددين يساوي 1 فهما أوليان فيما بينهما، ويكون م.م.أ حاصل ضربهما.'
        },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Deskonposatu zenbaki bakoitza.', es: 'Descompón cada número.', ar: 'حلّل كل عدد.' }, math: '$24=2^{3}\\cdot 3\\qquad 36=2^{2}\\cdot 3^{2}$' },
            { text: { eu: 'Hartu biderkagai guztiak, komunak eta ez-komunak.', es: 'Toma todos los factores, comunes y no comunes.', ar: 'خذ كل العوامل، المشتركة وغير المشتركة.' }, math: '$2,\\ 3$' },
            { text: { eu: 'Bakoitza berretzaile handienarekin, eta biderkatu.', es: 'Cada uno con su mayor exponente, y multiplica.', ar: 'كل عامل بأكبر أس ثم اضرب.' }, math: notation('$@LCM(24,36)=2^{3}\\cdot 3^{2}=72$') }
        ],
        example: notation('$\\begin{gathered}@GCD(8,15)=1\\\\@LCM(8,15)=8\\cdot 15=120\\end{gathered}$'),
        takeaway: {
            eu: 'MKT: guztiak, berretzaile handienarekin. Ezin da zenbakirik handiena baino txikiagoa izan.',
            es: 'm.c.m.: todos, con el mayor exponente. Nunca es menor que el mayor de los números.',
            ar: 'م.م.أ: كل العوامل بأكبر أس. ولا يكون أبدًا أصغر من أكبر الأعداد.'
        }
    },
    {
        id: 'which',
        stage: 'problems',
        title: { eu: 'ZKH ala MKT?', es: '¿m.c.d. o m.c.m.?', ar: 'ق.م.أ أم م.م.أ؟' },
        goal: {
            eu: 'Buruketa batean ZKH edo MKT behar den erabakitzea.',
            es: 'Decidir si un problema necesita el m.c.d. o el m.c.m.',
            ar: 'تحديد ما إذا كانت المسألة تحتاج ق.م.أ أم م.م.أ.'
        },
        explanation: {
            eu: 'Buruketa bat ebazten hasi aurretik, galdetu zeure buruari: kopuru batzuk zati berdinetan banatu behar ditut (zatitzaileak), ala zerbait berriro batera noiz gertatuko den bilatzen ari naiz (multiploak)? Galderako hitzek ere laguntzen dute.',
            es: 'Antes de empezar un problema, pregúntate: ¿tengo que repartir unas cantidades en partes iguales (divisores) o busco cuándo algo volverá a coincidir (múltiplos)? Las palabras de la pregunta también ayudan.',
            ar: 'قبل أن تبدأ حل المسألة اسأل نفسك: هل عليّ تقسيم كميات إلى أجزاء متساوية (قواسم)، أم أبحث عن متى سيتكرر حدث ما معًا (مضاعفات)؟ وكلمات السؤال تساعد أيضًا.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'ZKH', es: 'm.c.d.', ar: 'ق.م.أ' }, text: { eu: 'Banatu, zatitu, taldekatu, soberakinik gabe… eta zati edo talde handiena: lepokoak, lauzak, kutxak, sortak.', es: 'Repartir, dividir, agrupar, sin que sobre… y el trozo o grupo más grande: collares, baldosas, cajas, lotes.', ar: 'نوزّع، نقسم، نجمع، دون أن يبقى شيء… وأكبر جزء أو مجموعة: عقود، بلاط، صناديق، رزم.' }, math: notation('$9,\\ 12,\\ 15\\ \\Rightarrow\\ @GCD=3$') },
            { title: { eu: 'MKT', es: 'm.c.m.', ar: 'م.م.أ' }, text: { eu: 'Berriro batera, aldi berean, lehen aldiz bat etorri… eta denbora edo luzera txikiena: autobusak, argiak, ibilbideak.', es: 'Volver a coincidir, a la vez, por primera vez… y el menor tiempo o longitud: autobuses, luces, recorridos.', ar: 'يلتقيان مجددًا، في الوقت نفسه، لأول مرة… وأقل زمن أو طول: حافلات، أضواء، مسارات.' }, math: notation('$4,\\ 6\\ \\Rightarrow\\ @LCM=12$') }
        ],
        example: notation('$\\begin{gathered}@GCD(9,12,15)=3\\\\@LCM(4,6)=12\\end{gathered}$'),
        takeaway: {
            eu: 'ZKHren emaitza datuak baino txikiagoa da; MKTrena, handiagoa.',
            es: 'El resultado del m.c.d. es menor que los datos; el del m.c.m., mayor.',
            ar: 'ناتج ق.م.أ أصغر من المعطيات، وناتج م.م.أ أكبر منها.'
        },
        figure: (language) => <CoincidenceFigure language={language} />
    },
    {
        id: 'method',
        stage: 'problems',
        title: { eu: 'Buruketak lau urratsetan', es: 'Problemas en cuatro pasos', ar: 'المسائل في أربع خطوات' },
        goal: {
            eu: 'ZKH eta MKTko buruketak ordenan ebaztea eta emaitza esaldi batez ematea.',
            es: 'Resolver con orden los problemas de m.c.d. y m.c.m. y dar el resultado con una frase.',
            ar: 'حل مسائل ق.م.أ وم.م.أ بترتيب وإعطاء النتيجة في جملة.'
        },
        explanation: {
            eu: 'Klasean ikasitako lau urratsak jarraitu. Adibidea: 4 mm-ko 9 bola gorri, 6 mm-ko 12 bola berde eta 8 mm-ko 15 bola urdin ditugu, eta kolore bakarreko lepokoak egin nahi ditugu, denak bola kopuru berarekin.',
            es: 'Sigue los cuatro pasos de clase. Ejemplo: tenemos 9 bolas rojas de 4 mm, 12 verdes de 6 mm y 15 azules de 8 mm, y queremos hacer collares de un solo color, todos con el mismo número de bolas.',
            ar: 'اتبع الخطوات الأربع التي تعلّمتها في القسم. مثال: لدينا 9 كرات حمراء قطرها 4 مم، و12 خضراء قطرها 6 مم، و15 زرقاء قطرها 8 مم، ونريد صنع عقود بلون واحد، كلها بعدد الكرات نفسه.'
        },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'ZKH ala MKT?', es: '¿m.c.d. o m.c.m.?', ar: 'ق.م.أ أم م.م.أ؟' }, text: { eu: 'Bolak lepokoetan banatzen ditugu, soberakinik gabe: 9, 12 eta 15en zatitzaile komuna behar dugu → ZKH.', es: 'Repartimos bolas en collares, sin que sobren: necesitamos un divisor común de 9, 12 y 15 → m.c.d.', ar: 'نوزّع الكرات على عقود دون أن يبقى شيء: نحتاج قاسمًا مشتركًا لـ 9 و12 و15 ← ق.م.أ.' } },
            { title: { eu: 'Faktorizatu', es: 'Factoriza', ar: 'حلّل' }, text: { eu: 'Deskonposatu datuak biderkagai lehenetan.', es: 'Descompón los datos en factores primos.', ar: 'حلّل المعطيات إلى عوامل أولية.' }, math: '$9=3^{2}\\quad 12=2^{2}\\cdot 3\\quad 15=3\\cdot 5$' },
            { title: { eu: 'Kalkulatu', es: 'Calcula', ar: 'احسب' }, text: { eu: 'Komunean 3 dute, berretzaile txikienarekin.', es: 'Tienen en común el 3, con el menor exponente.', ar: 'العامل المشترك هو 3 بأصغر أس.' }, math: notation('$@GCD(9,12,15)=3$') },
            { title: { eu: 'Interpretatu', es: 'Interpreta', ar: 'فسّر' }, text: { eu: 'Eman emaitza esaldi gisa, unitateekin: lepoko bakoitzak 3 bola izango ditu (3 gorri, 4 berde eta 5 urdin lepoko).', es: 'Da el resultado como una frase, con unidades: cada collar tendrá 3 bolas (3 collares rojos, 4 verdes y 5 azules).', ar: 'اكتب النتيجة في جملة مع الوحدات: سيكون في كل عقد 3 كرات (3 عقود حمراء و4 خضراء و5 زرقاء).' } }
        ],
        example: notation('$@LCM(4,6,8)=2^{3}\\cdot 3=24\\ \\text{mm}$'),
        takeaway: {
            eu: 'Ez amaitu zenbaki batekin: erantzun galderari esaldi batez eta unitateekin.',
            es: 'No termines con un número suelto: responde a la pregunta con una frase y con unidades.',
            ar: 'لا تنهِ الحل بعدد وحده: أجب عن السؤال بجملة مع الوحدات.'
        }
    }
]

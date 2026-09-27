import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { CoincidenceFigure, DivisorRectanglesFigure, FactorLadderFigure, MultiplesFigure, SieveFigure, VennFigure } from '../dbh2-zatigarritasuna/figures'
import { notation } from '../dbh2-zatigarritasuna/notation'
import { BagsFigure, DivisorTableFigure, PoolCalendarFigure } from './figures'

/* ==========================================================================
   Zatigarritasuna · 1. DBH — stages and lessons
   Sequence follows the class textbook (Santillana 1.º ESO, unit 2,
   curricular adaptation): multiples and divisors through exact divisions
   and everyday groupings, the rules for 2, 3, 5 and 10, primes and
   composites, factorization and the divisor table, common divisors and
   multiples with m.c.d. and m.c.m., and problems. Anaya unit 3 adds the
   rule for 9 and the sieve. It is the first contact with divisibility:
   small numbers and lists before factorizations; the 2. DBH unit goes
   further (rules for 7 and 11, three numbers, bigger problems).
   Notation as in 2. DBH: Zat / ZKH / MKT in Basque, Div / m.c.d. / m.c.m.
   in Spanish.
   ========================================================================== */

export type DivisibilityIntroStageId = 'multiples' | 'criteria' | 'primes' | 'gcd-lcm' | 'problems'

export const divisibilityIntroStages: UnitStage[] = [
    { id: 'multiples', tone: 'blue', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', ar: 'المضاعفات والقواسم' } },
    { id: 'criteria', tone: 'violet', title: { eu: 'Zatigarritasun irizpideak', es: 'Criterios de divisibilidad', ar: 'قواعد قابلية القسمة' } },
    { id: 'primes', tone: 'mustard', title: { eu: 'Lehenak eta deskonposizioa', es: 'Primos y descomposición', ar: 'الأعداد الأولية والتحليل' } },
    { id: 'gcd-lcm', tone: 'coral', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', ar: 'ق.م.أ و م.م.أ' } },
    { id: 'problems', tone: 'green', title: { eu: 'Buruketak', es: 'Problemas', ar: 'المسائل' } }
]

export const divisibilityIntroTopics: UnitTopic[] = [
    {
        id: 'relation',
        stage: 'multiples',
        title: { eu: 'Zatiketa zehatza: multiploa eta zatitzailea', es: 'División exacta: múltiplo y divisor', ar: 'القسمة التامة: المضاعف والقاسم' },
        goal: {
            eu: 'Zatiketa zehatz batean zein den multiploa eta zein zatitzailea jakitea.',
            es: 'Saber, en una división exacta, cuál es el múltiplo y cuál el divisor.',
            ar: 'معرفة المضاعف والقاسم في قسمة تامة.'
        },
        explanation: {
            eu: '18 arkatz poltsetan gorde nahi ditugu, poltsa guztietan kopuru bera eta bat ere soberan utzi gabe. 3 poltsatan bai (6 bakoitzean), baina 4 poltsatan ez: 2 soberan geratzen dira. Zatiketaren hondarra 0 denean, zatiketa zehatza da, eta bi zenbakien artean zatigarritasun erlazioa dago: zenbaki handia txikiaren multiploa da, eta txikia handiaren zatitzailea.',
            es: 'Queremos guardar 18 lápices en bolsas, con la misma cantidad en cada una y sin que sobre ninguno. En 3 bolsas se puede (6 en cada una), pero en 4 no: sobran 2. Cuando el resto de la división es 0, la división es exacta y entre los dos números hay una relación de divisibilidad: el número mayor es múltiplo del menor, y el menor es divisor del mayor.',
            ar: 'نريد وضع 18 قلمًا في أكياس، في كل كيس العدد نفسه ودون أن يبقى أي قلم. يمكن ذلك في 3 أكياس (6 في كل كيس)، ولا يمكن في 4 أكياس: يبقى قلمان. عندما يكون باقي القسمة 0 تكون القسمة تامة، وتوجد بين العددين علاقة قابلية القسمة: العدد الأكبر مضاعف للأصغر، والأصغر قاسم للأكبر.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Zatiketa zehatza', es: 'División exacta', ar: 'قسمة تامة' },
                text: { eu: '18 : 3 = 6 eta hondarra 0 da. Beraz, 18 3ren multiploa da, eta 3 18ren zatitzailea.', es: '18 : 3 = 6 y el resto es 0. Por tanto, 18 es múltiplo de 3 y 3 es divisor de 18.', ar: '18 : 3 = 6 والباقي 0. إذن 18 مضاعف لـ 3، و3 قاسم لـ 18.' },
                math: '$18=3\\cdot 6$'
            },
            {
                title: { eu: 'Zatiketa ez-zehatza', es: 'División no exacta', ar: 'قسمة غير تامة' },
                text: { eu: '18 : 4 = 4 eta hondarra 2 da. 18 ez da 4ren multiploa, eta 4 ez da 18ren zatitzailea.', es: '18 : 4 = 4 y el resto es 2. 18 no es múltiplo de 4 y 4 no es divisor de 18.', ar: '18 : 4 = 4 والباقي 2. العدد 18 ليس مضاعفًا لـ 4، و4 ليس قاسمًا لـ 18.' },
                math: '$18=4\\cdot 4+2$'
            },
            {
                title: { eu: 'Bi aldeetatik', es: 'Por los dos lados', ar: 'من الجهتين' },
                text: { eu: '48 : 8 = 6 bada, 48 : 6 = 8 ere bada. Beraz, 48 8ren eta 6ren multiploa da, eta 8 eta 6 48ren zatitzaileak dira.', es: 'Si 48 : 8 = 6, también 48 : 6 = 8. Así que 48 es múltiplo de 8 y de 6, y 8 y 6 son divisores de 48.', ar: 'إذا كان 48 : 8 = 6 فإن 48 : 6 = 8 أيضًا. إذن 48 مضاعف لـ 8 ولـ 6، و8 و6 قاسمان لـ 48.' },
                math: '$48=8\\cdot 6$'
            },
            {
                title: { eu: 'Hitz berdinak', es: 'Expresiones equivalentes', ar: 'عبارات متكافئة' },
                text: { eu: '«18 3ren multiploa da», «3 18ren zatitzailea da» eta «18 3rekin zatigarria da» gauza bera esateko hiru modu dira.', es: '«18 es múltiplo de 3», «3 es divisor de 18» y «18 es divisible por 3» son tres formas de decir lo mismo.', ar: '«18 مضاعف لـ 3» و«3 قاسم لـ 18» و«18 يقبل القسمة على 3» ثلاث طرق لقول الشيء نفسه.' }
            }
        ],
        example: '$\\begin{array}{r|l}18&3\\\\\\hline 0&6\\end{array}\\qquad\\begin{array}{r|l}18&4\\\\\\hline 2&4\\end{array}$',
        takeaway: {
            eu: 'Hondarra 0 → handia txikiaren multiploa da, eta txikia handiaren zatitzailea.',
            es: 'Resto 0 → el mayor es múltiplo del menor, y el menor es divisor del mayor.',
            ar: 'الباقي 0 ← الأكبر مضاعف للأصغر، والأصغر قاسم للأكبر.'
        },
        figure: (language) => <BagsFigure language={language} />
    },
    {
        id: 'multiples',
        stage: 'multiples',
        title: { eu: 'Zenbaki baten multiploak', es: 'Los múltiplos de un número', ar: 'مضاعفات عدد' },
        goal: {
            eu: 'Zenbaki baten multiploak kalkulatzea eta bi zenbakiren artean dauden multiploak aurkitzea.',
            es: 'Calcular los múltiplos de un número y encontrar los que hay entre dos números.',
            ar: 'حساب مضاعفات عدد وإيجاد المضاعفات الواقعة بين عددين.'
        },
        explanation: {
            eu: 'Denda batean tenis-pilotak 3ko poteetan saltzen dituzte: 3, 6, 9, 12… pilota eros daitezke. Horiek dira 3ren multiploak. Zenbaki baten multiploak lortzeko, zenbaki hori 1, 2, 3, 4… zenbaki naturalekin biderkatzen da. Multiploak infinituak dira: zerrendak ez du amaierarik. 0 ere multiploa da ($3\\cdot 0=0$), baina zerrendetan 1ez biderkatzen hasten gara.',
            es: 'En una tienda venden las pelotas de tenis en botes de 3: se pueden comprar 3, 6, 9, 12… pelotas. Esos son los múltiplos de 3. Para obtener los múltiplos de un número, se multiplica por los números naturales 1, 2, 3, 4… Los múltiplos son infinitos: la lista no se acaba nunca. El 0 también es múltiplo ($3\\cdot 0=0$), pero en las listas empezamos multiplicando por 1.',
            ar: 'في متجر تُباع كرات التنس في علب من 3: يمكن شراء 3، 6، 9، 12… كرة. هذه هي مضاعفات 3. للحصول على مضاعفات عدد نضربه في الأعداد الطبيعية 1، 2، 3، 4… والمضاعفات غير منتهية: لا تنتهي القائمة أبدًا. والصفر أيضًا مضاعف ($3\\cdot 0=0$)، لكننا نبدأ القوائم بالضرب في 1.'
        },
        problem: { eu: 'Idatzi 30 eta 90 artean dauden 7ren multiploak.', es: 'Escribe los múltiplos de 7 que hay entre 30 y 90.', ar: 'اكتب مضاعفات 7 الواقعة بين 30 و90.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Bilatu 30 gainditzen duen lehen biderketa.', es: 'Busca la primera multiplicación que pasa de 30.', ar: 'ابحث عن أول ناتج ضرب يتجاوز 30.' }, math: '$7\\cdot 4=28\\qquad 7\\cdot 5=35$' },
            { text: { eu: 'Batu 7 behin eta berriz.', es: 'Suma 7 una y otra vez.', ar: 'أضف 7 مرة بعد مرة.' }, math: '$35,\\ 42,\\ 49,\\ 56,\\ 63,\\ 70,\\ 77,\\ 84$' },
            { text: { eu: 'Gelditu 90 gainditu aurretik.', es: 'Para antes de pasar de 90.', ar: 'توقّف قبل تجاوز 90.' }, math: '$7\\cdot 13=91>90$' }
        ],
        example: '$\\mathrm{M}(3)=\\{3,\\ 6,\\ 9,\\ 12,\\ 15,\\ 18,\\ \\dots\\}$',
        takeaway: {
            eu: 'Multiploak = biderketak (edo jauzi berdinak). Infinituak dira, eta lehen multiploa zenbakia bera da.',
            es: 'Múltiplos = multiplicaciones (o saltos iguales). Son infinitos y el primero es el propio número.',
            ar: 'المضاعفات = عمليات ضرب (أو قفزات متساوية). هي غير منتهية وأولها العدد نفسه.'
        },
        figure: (language) => <MultiplesFigure step={3} max={24} language={language} />
    },
    {
        id: 'divisors',
        stage: 'multiples',
        title: { eu: 'Zenbaki baten zatitzaileak', es: 'Los divisores de un número', ar: 'قواسم عدد' },
        goal: {
            eu: 'Zenbaki baten zatitzaile guztiak zatiketak eginez aurkitzea.',
            es: 'Encontrar todos los divisores de un número haciendo divisiones.',
            ar: 'إيجاد جميع قواسم عدد بإجراء القسمات.'
        },
        explanation: {
            eu: 'Zenbaki baten zatitzaileak zenbaki hori zehazki zatitzen duten zenbakiak dira. Denak aurkitzeko, zatitu 1ez, 2z, 3z… eta gorde hondarra 0 ematen duten zatitzaileak. Zatitzaileak bikoteka datoz ($18=2\\cdot 9$ bada, 2 eta 9 biak dira zatitzaileak); bikoteak errepikatzen hasten direnean, amaitu duzu. Zatitzaileak ez dira infinituak: txikiena 1 da eta handiena zenbakia bera.',
            es: 'Los divisores de un número son los números que lo dividen de forma exacta. Para encontrarlos todos, divide entre 1, 2, 3… y quédate con los que dan resto 0. Los divisores vienen por parejas (si $18=2\\cdot 9$, 2 y 9 son divisores); cuando las parejas empiezan a repetirse, has terminado. Los divisores no son infinitos: el menor es 1 y el mayor, el propio número.',
            ar: 'قواسم عدد هي الأعداد التي تقسمه قسمة تامة. لإيجادها كلها اقسم على 1، 2، 3… واحتفظ بالتي تعطي باقيًا 0. والقواسم تأتي أزواجًا (إذا كان $18=2\\cdot 9$ فإن 2 و9 قاسمان)؛ وعندما تبدأ الأزواج بالتكرار تكون قد انتهيت. والقواسم ليست غير منتهية: أصغرها 1 وأكبرها العدد نفسه.'
        },
        problem: { eu: 'Gelan 24 ikasle daude. Zenbat modutan egin daitezke talde berdinak, inor soberan utzi gabe?', es: 'En clase hay 24 alumnos. ¿De cuántas maneras se pueden formar grupos iguales sin que sobre nadie?', ar: 'في الصف 24 تلميذًا. بكم طريقة يمكن تكوين مجموعات متساوية دون أن يبقى أحد؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zatitu 1ez, 2z, 3z, 4z… eta idatzi bikoteak.', es: 'Divide entre 1, 2, 3, 4… y escribe las parejas.', ar: 'اقسم على 1، 2، 3، 4… واكتب الأزواج.' }, math: '$24=1\\cdot 24=2\\cdot 12=3\\cdot 8=4\\cdot 6$' },
            { text: { eu: '5ez ez da zehatza. 6z hasita bikoteak errepikatzen dira: gelditu.', es: 'Entre 5 no es exacta. A partir de 6 las parejas se repiten: para.', ar: 'القسمة على 5 ليست تامة. ومن 6 فصاعدًا تتكرر الأزواج: توقّف.' }, math: '$24=5\\cdot 4+4\\qquad 24=6\\cdot 4$' },
            { text: { eu: 'Idatzi zatitzaile guztiak txikienetik handienera.', es: 'Escribe todos los divisores de menor a mayor.', ar: 'اكتب كل القواسم من الأصغر إلى الأكبر.' }, math: notation('$@DIV(24)=\\{1,2,3,4,6,8,12,24\\}$') },
            { text: { eu: 'Erantzun: 8 modutan, adibidez 4 taldetan 6 ikasle edo 6 taldetan 4.', es: 'Respuesta: de 8 maneras, por ejemplo 4 grupos de 6 o 6 grupos de 4.', ar: 'الجواب: بـ 8 طرق، مثل 4 مجموعات من 6 أو 6 مجموعات من 4.' } }
        ],
        example: notation('$@DIV(18)=\\{1,\\ 2,\\ 3,\\ 6,\\ 9,\\ 18\\}$'),
        takeaway: {
            eu: 'Zatitzaileak bikoteka datoz. 1 eta zenbakia bera beti dira zatitzaileak.',
            es: 'Los divisores vienen por parejas. 1 y el propio número siempre son divisores.',
            ar: 'القواسم تأتي أزواجًا. العدد 1 والعدد نفسه قاسمان دائمًا.'
        },
        figure: (language) => <DivisorRectanglesFigure n={18} language={language} />
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
            eu: 'Atleta batek 2 metroko jauziak egiten ditu: 0, 2, 4, 6, 8, 10, 12… Lertsun batek 5ekoak: 0, 5, 10, 15, 20… Kanguru batek 10ekoak: 0, 10, 20, 30… Begiratu azken zifrari: beti errepikatzen da. Horregatik, zatigarritasun irizpideek, zatiketa egin gabe, esaten digute zenbaki bat 2rekin, 5ekin edo 10ekin zatigarria den.',
            es: 'Un atleta avanza a saltos de 2 metros: 0, 2, 4, 6, 8, 10, 12… Una garza, de 5 en 5: 0, 5, 10, 15, 20… Un canguro, de 10 en 10: 0, 10, 20, 30… Fíjate en la última cifra: siempre se repite. Por eso los criterios de divisibilidad nos dicen, sin hacer la división, si un número es divisible por 2, 5 o 10.',
            ar: 'يتقدم عدّاء بقفزات من مترين: 0، 2، 4، 6، 8، 10، 12… ومالك الحزين من 5 إلى 5: 0، 5، 10، 15، 20… والكنغر من 10 إلى 10: 0، 10، 20، 30… لاحظ الرقم الأخير: إنه يتكرر دائمًا. لذلك تخبرنا قواعد قابلية القسمة، دون إجراء القسمة، هل يقبل العدد القسمة على 2 أو 5 أو 10.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: '2rekin', es: 'Por 2', ar: 'على 2' }, text: { eu: 'Azken zifra 0, 2, 4, 6 edo 8 bada (zenbaki bikoitiak).', es: 'Si acaba en 0, 2, 4, 6 u 8 (números pares).', ar: 'إذا انتهى بـ 0 أو 2 أو 4 أو 6 أو 8 (الأعداد الزوجية).' }, math: '$84\\ \\checkmark\\qquad 35\\ \\times$' },
            { title: { eu: '5ekin', es: 'Por 5', ar: 'على 5' }, text: { eu: 'Azken zifra 0 edo 5 bada.', es: 'Si acaba en 0 o en 5.', ar: 'إذا انتهى بـ 0 أو 5.' }, math: '$35\\ \\checkmark\\qquad 84\\ \\times$' },
            { title: { eu: '10ekin', es: 'Por 10', ar: 'على 10' }, text: { eu: 'Azken zifra 0 bada. 10ekin zatigarria dena 2rekin eta 5ekin ere bada.', es: 'Si acaba en 0. Lo que es divisible por 10 también lo es por 2 y por 5.', ar: 'إذا انتهى بـ 0. وما يقبل القسمة على 10 يقبلها على 2 و5 أيضًا.' }, math: '$150\\ \\checkmark\\qquad 155\\ \\times$' }
        ],
        example: '$480\\mathbin{:}\\ \\text{2 } \\checkmark\\quad \\text{5 } \\checkmark\\quad \\text{10 } \\checkmark$',
        takeaway: {
            eu: '2, 5 eta 10: begiratu azken zifrari bakarrik.',
            es: '2, 5 y 10: mira solo la última cifra.',
            ar: '2 و5 و10: انظر إلى الرقم الأخير فقط.'
        },
        figure: (language) => <MultiplesFigure step={2} max={24} language={language} />
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
            eu: 'Igel batek 3 metroko jauziak egiten ditu: 3, 6, 9, 12, 15, 18, 21… Azken zifra ez da errepikatzen, baina bai beste gauza bat: zifren batura (1 + 2 = 3, 1 + 5 = 6, 2 + 1 = 3) beti da 3ren multiploa. 3 eta 9ren kasuan, beraz, zifra guztiak batu behar dira. Batura handia bada, haren zifrak berriro batu daitezke.',
            es: 'Una rana avanza a saltos de 3 metros: 3, 6, 9, 12, 15, 18, 21… La última cifra no se repite, pero hay otra cosa que sí: la suma de las cifras (1 + 2 = 3, 1 + 5 = 6, 2 + 1 = 3) siempre es múltiplo de 3. Para el 3 y el 9, por tanto, hay que sumar todas las cifras. Si la suma es grande, se pueden volver a sumar sus cifras.',
            ar: 'تتقدم ضفدعة بقفزات من 3 أمتار: 3، 6، 9، 12، 15، 18، 21… لا يتكرر الرقم الأخير، لكن شيئًا آخر يتكرر: مجموع الأرقام (1 + 2 = 3، 1 + 5 = 6، 2 + 1 = 3) مضاعف لـ 3 دائمًا. إذن في حالتي 3 و9 يجب جمع كل الأرقام. وإذا كان المجموع كبيرًا يمكن جمع أرقامه من جديد.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: '3rekin', es: 'Por 3', ar: 'على 3' }, text: { eu: 'Zifren batura 3ren multiploa bada: 3, 6, 9, 12, 15…', es: 'Si la suma de sus cifras es múltiplo de 3: 3, 6, 9, 12, 15…', ar: 'إذا كان مجموع أرقامه مضاعفًا لـ 3: 3، 6، 9، 12، 15…' }, math: '$\\begin{gathered}471\\\\4+7+1=12\\ \\checkmark\\end{gathered}$' },
            { title: { eu: '9rekin', es: 'Por 9', ar: 'على 9' }, text: { eu: 'Zifren batura 9ren multiploa bada: 9, 18, 27…', es: 'Si la suma de sus cifras es múltiplo de 9: 9, 18, 27…', ar: 'إذا كان مجموع أرقامه مضاعفًا لـ 9: 9، 18، 27…' }, math: '$\\begin{gathered}576\\\\5+7+6=18\\ \\checkmark\\end{gathered}$' },
            { title: { eu: 'Irizpideak batera', es: 'Criterios juntos', ar: 'القواعد معًا' }, text: { eu: 'Zenbaki bat 2rekin eta 3rekin zatigarria bada, 6rekin ere bada.', es: 'Si un número es divisible por 2 y por 3, también lo es por 6.', ar: 'إذا قبل العدد القسمة على 2 وعلى 3 فإنه يقبلها على 6 أيضًا.' }, math: '$\\begin{gathered}108\\\\\\text{2 } \\checkmark\\quad \\text{3 } \\checkmark\\quad \\text{6 } \\checkmark\\end{gathered}$' }
        ],
        example: '$\\begin{gathered}5{.}027\\mathbin{:}\\ 5+0+2+7=14\\\\\\text{3 } \\times\\quad \\text{9 } \\times\\end{gathered}$',
        takeaway: {
            eu: '3 eta 9: batu zifrak. 9rekin zatigarria dena 3rekin ere bada.',
            es: '3 y 9: suma las cifras. Lo que es divisible por 9 también lo es por 3.',
            ar: '3 و9: اجمع الأرقام. وما يقبل القسمة على 9 يقبلها على 3 أيضًا.'
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
            eu: 'Saskibaloi talde bateko 5 jokalariek talde berdinak egin nahi dituzte entrenatzeko: 1eko edo 5eko taldeak baino ezin dituzte egin. 5ek bi zatitzaile baino ez ditu, 1 eta bera: zenbaki lehena da. Aldiz, 8 liburu 1eko, 2ko, 4ko edo 8ko taldeetan jar daitezke: 8k bi zatitzaile baino gehiago ditu, eta zenbaki konposatua da. 1 zenbakiak zatitzaile bakarra du, eta ez da ez lehena ez konposatua.',
            es: 'Los 5 jugadores de un equipo de baloncesto quieren formar grupos iguales para entrenar: solo pueden hacer grupos de 1 o de 5. El 5 solo tiene dos divisores, 1 y él mismo: es un número primo. En cambio, 8 libros se pueden colocar en grupos de 1, 2, 4 u 8: el 8 tiene más de dos divisores y es un número compuesto. El 1 solo tiene un divisor y no es ni primo ni compuesto.',
            ar: 'يريد لاعبو فريق كرة سلة الخمسة تكوين مجموعات متساوية للتدريب: لا يمكنهم إلا مجموعات من 1 أو من 5. للعدد 5 قاسمان فقط، 1 ونفسه: إنه عدد أولي. أما 8 كتب فيمكن وضعها في مجموعات من 1 أو 2 أو 4 أو 8: للعدد 8 أكثر من قاسمين، فهو عدد مؤلف. وللعدد 1 قاسم واحد فقط، فهو ليس أوليًا ولا مؤلفًا.'
        },
        problem: { eu: 'Bilatu 50 baino txikiagoak diren zenbaki lehen guztiak.', es: 'Busca todos los números primos menores que 50.', ar: 'ابحث عن كل الأعداد الأولية الأصغر من 50.' },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'Eratostenesen bahea', es: 'Criba de Eratóstenes', ar: 'غربال إراتوستينس' }, text: { eu: 'Ratatu 1. Utzi 2 eta ratatu haren multiplo guztiak.', es: 'Tacha el 1. Deja el 2 y tacha todos sus múltiplos.', ar: 'اشطب 1. أبقِ 2 واشطب كل مضاعفاته.' } },
            { text: { eu: 'Hurrengo ratatu gabea (3) lehena da: ratatu haren multiploak.', es: 'El siguiente sin tachar (3) es primo: tacha sus múltiplos.', ar: 'العدد التالي غير المشطوب (3) أولي: اشطب مضاعفاته.' } },
            { text: { eu: 'Errepikatu 5ekin eta 7rekin. Ratatu gabe geratzen direnak lehenak dira.', es: 'Repite con 5 y 7. Los que quedan sin tachar son primos.', ar: 'كرّر مع 5 و7. والأعداد التي تبقى غير مشطوبة أولية.' }, math: '$\\begin{gathered}2,3,5,7,11,13,17,19\\\\23,29,31,37,41,43,47\\end{gathered}$' }
        ],
        example: {
            eu: '$\\begin{gathered}\\mathrm{Zat}(7)=\\{1,7\\}\\quad \\text{lehena}\\\\\\mathrm{Zat}(8)=\\{1,2,4,8\\}\\quad \\text{konposatua}\\end{gathered}$',
            es: '$\\begin{gathered}\\mathrm{Div}(7)=\\{1,7\\}\\quad \\text{primo}\\\\\\mathrm{Div}(8)=\\{1,2,4,8\\}\\quad \\text{compuesto}\\end{gathered}$',
            ar: '$\\begin{gathered}\\mathrm{Zat}(7)=\\{1,7\\}\\\\\\mathrm{Zat}(8)=\\{1,2,4,8\\}\\end{gathered}$'
        },
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
            eu: 'Zenbaki konposatu oro zenbaki lehenen biderkadura gisa idatz daiteke. Horretarako, idatzi zenbakia marra bertikal baten ezkerrean eta zatitu ahal den lehen txikienaz (2, 3, 5, 7…), zatigarritasun irizpideak erabiliz. Idatzi zatidura azpian eta jarraitu 1 lortu arte. Biderkagai errepikatuak berretura gisa idazten dira.',
            es: 'Todo número compuesto se puede escribir como producto de números primos. Para ello, escribe el número a la izquierda de una raya vertical y divídelo entre el menor primo posible (2, 3, 5, 7…), usando los criterios de divisibilidad. Escribe el cociente debajo y sigue hasta llegar a 1. Los factores repetidos se escriben como potencias.',
            ar: 'يمكن كتابة كل عدد مؤلف في صورة حاصل ضرب أعداد أولية. لذلك اكتب العدد على يسار خط عمودي واقسمه على أصغر عدد أولي ممكن (2، 3، 5، 7…) مستعملًا قواعد قابلية القسمة. اكتب الناتج تحته وتابع حتى تصل إلى 1. وتُكتب العوامل المكررة في صورة قوى.'
        },
        problem: { eu: 'Deskonposatu 36 biderkagai lehenetan.', es: 'Descompón 36 en factores primos.', ar: 'حلّل 36 إلى عوامل أولية.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: '36 bikoitia da: zatitu 2z.', es: '36 es par: divide entre 2.', ar: '36 زوجي: اقسم على 2.' }, math: '$36\\mathbin{:}2=18$' },
            { text: { eu: '18 ere bikoitia da: zatitu berriro 2z.', es: '18 también es par: divide otra vez entre 2.', ar: '18 زوجي أيضًا: اقسم مرة أخرى على 2.' }, math: '$18\\mathbin{:}2=9$' },
            { text: { eu: '9 ez da bikoitia, baina 3rekin zatigarria da.', es: '9 no es par, pero es divisible por 3.', ar: '9 ليس زوجيًا، لكنه يقبل القسمة على 3.' }, math: '$9\\mathbin{:}3=3\\qquad 3\\mathbin{:}3=1$' },
            { text: { eu: 'Bildu eskuineko lehenak berreturetan.', es: 'Agrupa los primos de la derecha en potencias.', ar: 'اجمع الأعداد الأولية التي على اليمين في صورة قوى.' }, math: '$36=2\\cdot 2\\cdot 3\\cdot 3=2^{2}\\cdot 3^{2}$' }
        ],
        example: '$45=3^{2}\\cdot 5\\qquad 60=2^{2}\\cdot 3\\cdot 5$',
        takeaway: {
            eu: 'Biderkagai guztiak lehenak izan behar dira: 36 = 4 · 9 ez da deskonposizioa, 4 eta 9 ez direlako lehenak.',
            es: 'Todos los factores deben ser primos: 36 = 4 · 9 no es la descomposición, porque 4 y 9 no son primos.',
            ar: 'يجب أن تكون كل العوامل أولية: ‏36 = 4 · 9 ليس تحليلًا لأن 4 و9 ليسا أوليين.'
        },
        figure: (language) => <FactorLadderFigure n={36} language={language} />
    },
    {
        id: 'divisor-table',
        stage: 'primes',
        title: { eu: 'Zatitzaileak deskonposiziotik', es: 'Los divisores a partir de la descomposición', ar: 'القواسم انطلاقًا من التحليل' },
        goal: {
            eu: 'Zenbaki baten zatitzaile guztiak taula batekin lortzea, haren deskonposiziotik abiatuta.',
            es: 'Obtener todos los divisores de un número con una tabla, a partir de su descomposición.',
            ar: 'الحصول على كل قواسم عدد بجدول انطلاقًا من تحليله.'
        },
        explanation: {
            eu: 'Zenbakia handia denean, zatiketa asko egin behar dira zatitzaile guztiak aurkitzeko. Modu laburragoa dago: deskonposatu zenbakia eta konbinatu haren biderkagai lehenak taula batean. Lehen errenkadan 1 eta lehen biderkagaiaren berreturak jartzen dira; hurrengo errenkadetan, lehen errenkada bigarren biderkagaiaren berreturekin biderkatzen da.',
            es: 'Cuando el número es grande, hay que hacer muchas divisiones para encontrar todos sus divisores. Hay una forma más corta: descompón el número y combina sus factores primos en una tabla. En la primera fila van el 1 y las potencias del primer factor; en las filas siguientes, la primera fila se multiplica por las potencias del segundo factor.',
            ar: 'عندما يكون العدد كبيرًا يلزم إجراء قسمات كثيرة لإيجاد كل قواسمه. وهناك طريقة أقصر: حلّل العدد واجمع عوامله الأولية في جدول. في الصف الأول نضع 1 وقوى العامل الأول، وفي الصفوف التالية نضرب الصف الأول في قوى العامل الثاني.'
        },
        problem: { eu: 'Aurkitu 36ren zatitzaile guztiak haren deskonposiziotik: 36 = 2² · 3².', es: 'Encuentra todos los divisores de 36 a partir de su descomposición: 36 = 2² · 3².', ar: 'أوجد كل قواسم 36 انطلاقًا من تحليله: ‏36 = 2² · 3².' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Lehen errenkada: 1 eta 2ren berreturak, 2² arte.', es: 'Primera fila: el 1 y las potencias de 2, hasta 2².', ar: 'الصف الأول: 1 وقوى 2 حتى 2².' }, math: '$1\\quad 2\\quad 4$' },
            { text: { eu: 'Bigarren errenkada: lehena bider 3.', es: 'Segunda fila: la primera por 3.', ar: 'الصف الثاني: الأول مضروبًا في 3.' }, math: '$3\\quad 6\\quad 12$' },
            { text: { eu: 'Hirugarren errenkada: lehena bider 3² = 9.', es: 'Tercera fila: la primera por 3² = 9.', ar: 'الصف الثالث: الأول مضروبًا في 3² = 9.' }, math: '$9\\quad 18\\quad 36$' },
            { text: { eu: 'Ordenatu taulako zenbaki guztiak.', es: 'Ordena todos los números de la tabla.', ar: 'رتّب كل أعداد الجدول.' }, math: notation('$@DIV(36)=\\{1,2,3,4,6,9,12,18,36\\}$') }
        ],
        example: notation('$\\begin{gathered}45=3^{2}\\cdot 5\\\\@DIV(45)=\\{1,3,5,9,15,45\\}\\end{gathered}$'),
        takeaway: {
            eu: 'Taulak ez du zatitzailerik ahazten: 36 = 2² · 3² bada, 3 · 3 = 9 zatitzaile ditu.',
            es: 'La tabla no olvida ningún divisor: si 36 = 2² · 3², tiene 3 · 3 = 9 divisores.',
            ar: 'الجدول لا ينسى أي قاسم: إذا كان 36 = 2² · 3² فله 3 · 3 = 9 قواسم.'
        },
        figure: (language) => <DivisorTableFigure n={36} language={language} />
    },
    {
        id: 'gcd',
        stage: 'gcd-lcm',
        title: { eu: 'Zatitzaile komunak eta ZKH', es: 'Divisores comunes y m.c.d.', ar: 'القواسم المشتركة وق.م.أ' },
        goal: {
            eu: 'Bi zenbakiren zatitzaile komunak aurkitzea eta haien artean handiena (ZKH) kalkulatzea.',
            es: 'Encontrar los divisores comunes de dos números y calcular el mayor de ellos (m.c.d.).',
            ar: 'إيجاد القواسم المشتركة لعددين وحساب أكبرها (ق.م.أ).'
        },
        explanation: {
            eu: 'Jonek 12 lokomotora ditu eta Peiok 18 hegazkin. Talde berdinak egin nahi dituzte, jostailu kopuru berarekin talde guztietan. Talde horiek 12ren eta 18ren zatitzaile komunak dira: 1, 2, 3 eta 6. Handiena, 6, zatitzaile komunetako handiena da: ZKH. Zenbaki handiagoekin, deskonposatu biderkagai lehenetan eta biderkatu biderkagai komunak berretzaile txikienarekin.',
            es: 'Juan tiene 12 locomotoras y Pedro 18 aviones. Quieren hacer grupos con el mismo número de juguetes en todos. Esos grupos son los divisores comunes de 12 y 18: 1, 2, 3 y 6. El mayor, 6, es el máximo común divisor: m.c.d. Con números más grandes, descompón en factores primos y multiplica los factores comunes con el menor exponente.',
            ar: 'لدى خوان 12 قاطرة ولدى بيدرو 18 طائرة. يريدان تكوين مجموعات فيها العدد نفسه من الألعاب. هذه المجموعات هي القواسم المشتركة للعددين 12 و18: 1 و2 و3 و6. وأكبرها، 6، هو القاسم المشترك الأكبر: ق.م.أ. ومع الأعداد الأكبر حلّل إلى عوامل أولية واضرب العوامل المشتركة بأصغر أس.'
        },
        problem: { eu: 'Kalkulatu 12ren eta 18ren ZKH.', es: 'Calcula el m.c.d. de 12 y 18.', ar: 'احسب ق.م.أ للعددين 12 و18.' },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'Zerrendekin', es: 'Con listas', ar: 'بالقوائم' }, text: { eu: 'Idatzi bi zenbakien zatitzaileak.', es: 'Escribe los divisores de los dos números.', ar: 'اكتب قواسم العددين.' }, math: notation('$\\begin{gathered}@DIV(12)=\\{\\mathbf{1},\\mathbf{2},\\mathbf{3},4,\\mathbf{6},12\\}\\\\@DIV(18)=\\{\\mathbf{1},\\mathbf{2},\\mathbf{3},\\mathbf{6},9,18\\}\\end{gathered}$') },
            { text: { eu: 'Komunetatik handiena hartu.', es: 'Toma el mayor de los comunes.', ar: 'خذ أكبر القواسم المشتركة.' }, math: notation('$@GCD(12,18)=6$') },
            { title: { eu: 'Deskonposizioarekin', es: 'Con la descomposición', ar: 'بالتحليل' }, text: { eu: 'Deskonposatu eta hartu komunak, berretzaile txikienarekin.', es: 'Descompón y toma los comunes, con el menor exponente.', ar: 'حلّل وخذ المشتركة بأصغر أس.' }, math: notation('$\\begin{gathered}12=2^{2}\\cdot 3\\quad 18=2\\cdot 3^{2}\\\\@GCD(12,18)=2\\cdot 3=6\\end{gathered}$') }
        ],
        example: notation('$\\begin{gathered}@DIV(9)\\cap @DIV(12)=\\{1,3\\}\\\\@GCD(9,12)=3\\end{gathered}$'),
        takeaway: {
            eu: 'ZKH: zatitzaile komunetako handiena. Ezin da zenbakirik txikiena baino handiagoa izan.',
            es: 'm.c.d.: el mayor de los divisores comunes. Nunca es mayor que el menor de los números.',
            ar: 'ق.م.أ: أكبر القواسم المشتركة. ولا يكون أبدًا أكبر من أصغر العددين.'
        },
        figure: (language) => <VennFigure language={language} />
    },
    {
        id: 'lcm',
        stage: 'gcd-lcm',
        title: { eu: 'Multiplo komunak eta MKT', es: 'Múltiplos comunes y m.c.m.', ar: 'المضاعفات المشتركة وم.م.أ' },
        goal: {
            eu: 'Bi zenbakiren multiplo komunak aurkitzea eta haien artean txikiena (MKT) kalkulatzea.',
            es: 'Encontrar los múltiplos comunes de dos números y calcular el menor de ellos (m.c.m.).',
            ar: 'إيجاد المضاعفات المشتركة لعددين وحساب أصغرها (م.م.أ).'
        },
        explanation: {
            eu: 'Ana igerilekura 2 egunean behin joaten da, eta Eva 3 egunean behin. Biak batera 6., 12., 18.… egunetan joaten dira: 2ren eta 3ren multiplo komunak dira. Txikiena, 6, multiplo komunetako txikiena da: MKT. Zenbaki handiagoekin, deskonposatu eta biderkatu biderkagai komunak eta ez-komunak, bakoitza berretzaile handienarekin.',
            es: 'Ana va a nadar al polideportivo cada 2 días y Eva cada 3. Coinciden los días 6, 12, 18…: son los múltiplos comunes de 2 y 3. El menor, 6, es el mínimo común múltiplo: m.c.m. Con números más grandes, descompón y multiplica los factores comunes y no comunes, cada uno con su mayor exponente.',
            ar: 'تذهب آنا إلى المسبح كل يومين وإيفا كل 3 أيام. تلتقيان في الأيام 6 و12 و18…: هذه هي المضاعفات المشتركة للعددين 2 و3. وأصغرها، 6، هو المضاعف المشترك الأصغر: م.م.أ. ومع الأعداد الأكبر حلّل واضرب العوامل المشتركة وغير المشتركة، كلًّا منها بأكبر أس.'
        },
        problem: { eu: 'Kalkulatu 4ren eta 6ren MKT.', es: 'Calcula el m.c.m. de 4 y 6.', ar: 'احسب م.م.أ للعددين 4 و6.' },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'Zerrendekin', es: 'Con listas', ar: 'بالقوائم' }, text: { eu: 'Idatzi bi zenbakien lehen multiploak.', es: 'Escribe los primeros múltiplos de los dos números.', ar: 'اكتب المضاعفات الأولى للعددين.' }, math: '$\\begin{gathered}\\mathrm{M}(4)=\\{4,8,\\mathbf{12},16,20,\\mathbf{24}\\}\\\\\\mathrm{M}(6)=\\{6,\\mathbf{12},18,\\mathbf{24}\\}\\end{gathered}$' },
            { text: { eu: 'Komunetatik txikiena hartu.', es: 'Toma el menor de los comunes.', ar: 'خذ أصغر المضاعفات المشتركة.' }, math: notation('$@LCM(4,6)=12$') },
            { title: { eu: 'Deskonposizioarekin', es: 'Con la descomposición', ar: 'بالتحليل' }, text: { eu: 'Deskonposatu eta hartu guztiak, berretzaile handienarekin.', es: 'Descompón y toma todos, con el mayor exponente.', ar: 'حلّل وخذ كل العوامل بأكبر أس.' }, math: notation('$\\begin{gathered}4=2^{2}\\quad 6=2\\cdot 3\\\\@LCM(4,6)=2^{2}\\cdot 3=12\\end{gathered}$') }
        ],
        example: notation('$\\begin{gathered}\\mathrm{M}(5)\\cap\\mathrm{M}(10)=\\{10,20,30,\\dots\\}\\\\@LCM(5,10)=10\\end{gathered}$'),
        takeaway: {
            eu: 'MKT: multiplo komunetako txikiena. Ezin da zenbakirik handiena baino txikiagoa izan.',
            es: 'm.c.m.: el menor de los múltiplos comunes. Nunca es menor que el mayor de los números.',
            ar: 'م.م.أ: أصغر المضاعفات المشتركة. ولا يكون أبدًا أصغر من أكبر العددين.'
        },
        figure: (language) => <PoolCalendarFigure language={language} />
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
            eu: 'Buruketa bat ebazten hasi aurretik, galdetu zeure buruari: kopuru batzuk zati edo talde berdinetan banatu behar ditut (zatitzaileak → ZKH), ala zerbait berriro batera noiz gertatuko den bilatzen ari naiz (multiploak → MKT)? Galderako hitzek ere laguntzen dute.',
            es: 'Antes de empezar un problema, pregúntate: ¿tengo que repartir unas cantidades en partes o grupos iguales (divisores → m.c.d.) o busco cuándo algo volverá a coincidir (múltiplos → m.c.m.)? Las palabras de la pregunta también ayudan.',
            ar: 'قبل أن تبدأ حل المسألة اسأل نفسك: هل عليّ تقسيم كميات إلى أجزاء أو مجموعات متساوية (قواسم ← ق.م.أ)، أم أبحث عن متى سيتكرر حدث ما معًا (مضاعفات ← م.م.أ)؟ وكلمات السؤال تساعد أيضًا.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'ZKH', es: 'm.c.d.', ar: 'ق.م.أ' }, text: { eu: 'Banatu, taldekatu, poltsetan edo kutxetan sartu, soberan utzi gabe… ahalik eta talde handienak.', es: 'Repartir, agrupar, meter en bolsas o cajas, sin que sobre nada… los grupos más grandes posibles.', ar: 'نوزّع، نجمع، نضع في أكياس أو صناديق، دون أن يبقى شيء… أكبر مجموعات ممكنة.' }, math: notation('$\\begin{gathered}12,\\ 18\\\\@GCD=6\\end{gathered}$') },
            { title: { eu: 'MKT', es: 'm.c.m.', ar: 'م.م.أ' }, text: { eu: 'Berriro batera, aldi berean, lehen aldiz bat etorri… autobusak, itsasontziak, igerilekuko egunak.', es: 'Volver a coincidir, a la vez, por primera vez… autobuses, barcos, días de piscina.', ar: 'يلتقيان مجددًا، في الوقت نفسه، لأول مرة… حافلات، سفن، أيام المسبح.' }, math: notation('$\\begin{gathered}4,\\ 6\\\\@LCM=12\\end{gathered}$') }
        ],
        example: notation('$\\begin{gathered}@GCD(12,18)=6\\\\@LCM(4,6)=12\\end{gathered}$'),
        takeaway: {
            eu: 'ZKHren emaitza datuak baino txikiagoa da (edo berdina); MKTrena, handiagoa (edo berdina).',
            es: 'El resultado del m.c.d. es menor que los datos (o igual); el del m.c.m., mayor (o igual).',
            ar: 'ناتج ق.م.أ أصغر من المعطيات (أو يساويها)، وناتج م.م.أ أكبر منها (أو يساويها).'
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
            eu: 'Jarraitu lau urrats hauek: erabaki ZKH ala MKT behar den, deskonposatu (edo idatzi zerrendak), kalkulatu eta eman emaitza esaldi batez, unitateekin. Behean ZKHko buruketa bat dago ebatzita. Amaierako adibidean, hiru itsasontzi portutik irteten dira 4, 5 eta 7 egunean behin, eta berriro noiz egingo duten bat bilatzen da: MKT bat.',
            es: 'Sigue estos cuatro pasos: decide si hace falta el m.c.d. o el m.c.m., descompón (o escribe las listas), calcula y da el resultado con una frase y con unidades. Abajo tienes resuelto un problema de m.c.d. En el ejemplo final, tres barcos salen del puerto cada 4, 5 y 7 días, y se busca cuándo vuelven a coincidir: un m.c.m.',
            ar: 'اتبع هذه الخطوات الأربع: قرّر هل تحتاج إلى ق.م.أ أم م.م.أ، ثم حلّل (أو اكتب القوائم)، ثم احسب، ثم أعطِ النتيجة في جملة مع الوحدات. في الأسفل مسألة محلولة عن ق.م.أ. وفي المثال الأخير تغادر ثلاث سفن الميناء كل 4 و5 و7 أيام، ونبحث عن موعد التقائها مجددًا: وهذا م.م.أ.'
        },
        problem: { eu: '24 gozoki marrubizko eta 36 limoizko ditugu. Poltsak egin nahi ditugu zaporeak nahastu gabe, poltsa guztietan gozoki kopuru bera jarriz, ahalik eta handienak eta bat ere soberan utzi gabe. Zenbat gozoki sartuko dira poltsa bakoitzean?', es: 'Tenemos 24 caramelos de fresa y 36 de limón. Queremos hacer bolsas sin mezclar sabores, con el mismo número de caramelos en todas, lo más grandes posible y sin que sobre ninguno. ¿Cuántos caramelos irán en cada bolsa?', ar: 'لدينا 24 حلوى بالفراولة و36 بالليمون. نريد صنع أكياس دون خلط النكهات، في كلها العدد نفسه من الحلوى، أكبر ما يمكن، ودون أن تبقى أي حلوى. كم حلوى ستكون في كل كيس؟' },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'ZKH ala MKT?', es: '¿m.c.d. o m.c.m.?', ar: 'ق.م.أ أم م.م.أ؟' }, text: { eu: 'Gozokiak poltsetan banatzen ditugu, soberan utzi gabe: 24ren eta 36ren zatitzaile komuna behar dugu, ahalik eta handiena → ZKH.', es: 'Repartimos caramelos en bolsas, sin que sobren: necesitamos un divisor común de 24 y 36, el mayor posible → m.c.d.', ar: 'نوزّع الحلوى على أكياس دون أن يبقى شيء: نحتاج أكبر قاسم مشترك للعددين 24 و36 ← ق.م.أ.' } },
            { title: { eu: 'Deskonposatu', es: 'Descompón', ar: 'حلّل' }, text: { eu: 'Deskonposatu datuak biderkagai lehenetan.', es: 'Descompón los datos en factores primos.', ar: 'حلّل المعطيات إلى عوامل أولية.' }, math: '$24=2^{3}\\cdot 3\\qquad 36=2^{2}\\cdot 3^{2}$' },
            { title: { eu: 'Kalkulatu', es: 'Calcula', ar: 'احسب' }, text: { eu: 'Biderkagai komunak, berretzaile txikienarekin.', es: 'Factores comunes, con el menor exponente.', ar: 'العوامل المشتركة بأصغر أس.' }, math: notation('$@GCD(24,36)=2^{2}\\cdot 3=12$') },
            { title: { eu: 'Erantzun', es: 'Responde', ar: 'أجب' }, text: { eu: 'Poltsa bakoitzean 12 gozoki sartuko dira: 2 poltsa marrubizkoak eta 3 limoizkoak.', es: 'En cada bolsa irán 12 caramelos: 2 bolsas de fresa y 3 de limón.', ar: 'سيكون في كل كيس 12 حلوى: كيسان بالفراولة و3 أكياس بالليمون.' } }
        ],
        example: {
            eu: '$\\begin{gathered}\\mathrm{MKT}(4,5,7)=2^{2}\\cdot 5\\cdot 7\\\\=140\\ \\text{egun}\\end{gathered}$',
            es: '$\\begin{gathered}\\text{m.c.m.}(4,5,7)=2^{2}\\cdot 5\\cdot 7\\\\=140\\ \\text{días}\\end{gathered}$',
            ar: '$\\mathrm{MKT}(4,5,7)=2^{2}\\cdot 5\\cdot 7=140$'
        },
        takeaway: {
            eu: 'Ez amaitu zenbaki batekin: erantzun galderari esaldi batez eta unitateekin.',
            es: 'No termines con un número suelto: responde a la pregunta con una frase y con unidades.',
            ar: 'لا تنهِ الحل بعدد وحده: أجب عن السؤال بجملة مع الوحدات.'
        }
    }
]

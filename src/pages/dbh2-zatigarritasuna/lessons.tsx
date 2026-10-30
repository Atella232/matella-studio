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
    { id: 'multiples', tone: 'blue', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', en: 'Multiples and divisors', ar: 'المضاعفات والقواسم' } },
    { id: 'criteria', tone: 'violet', title: { eu: 'Zatigarritasun irizpideak', es: 'Criterios de divisibilidad', en: 'Divisibility rules', ar: 'قواعد قابلية القسمة' } },
    { id: 'primes', tone: 'mustard', title: { eu: 'Zenbaki lehenak eta faktorizazioa', es: 'Números primos y factorización', en: 'Prime numbers and factorisation', ar: 'الأعداد الأولية والتحليل' } },
    { id: 'gcd-lcm', tone: 'coral', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', en: 'GCD and LCM', ar: 'ق.م.أ و م.م.أ' } },
    { id: 'problems', tone: 'green', title: { eu: 'Buruketak', es: 'Problemas', en: 'Problems', ar: 'المسائل' } }
]

export const divisibilityTopics: UnitTopic[] = [
    {
        id: 'relation',
        stage: 'multiples',
        title: { eu: 'Zatigarritasun erlazioa', es: 'La relación de divisibilidad', en: 'The divisibility relation', ar: 'علاقة قابلية القسمة' },
        goal: {
            eu: 'Zatiketa zehatz batean multiploa eta zatitzailea bereiztea.',
            es: 'Reconocer el múltiplo y el divisor en una división exacta.',
            en: 'Recognise the multiple and the divisor in an exact division.',
            ar: 'التمييز بين المضاعف والقاسم في قسمة تامة.'
        },
        explanation: {
            eu: 'Bi zenbakiren arteko zatiketaren hondarra 0 denean, zatiketa zehatza da eta zenbakien artean zatigarritasun erlazioa dago. Erlazio bera bi modutara esan daiteke: a zenbakia b-ren multiploa da, edo b zenbakia a-ren zatitzailea da. Hondarra 0 ez bada, ez dago erlaziorik.',
            es: 'Cuando el resto de la división entre dos números es 0, la división es exacta y entre los números hay una relación de divisibilidad. La misma relación se puede decir de dos formas: a es múltiplo de b, o b es divisor de a. Si el resto no es 0, no hay relación.',
            en: 'When the remainder of dividing two numbers is 0, the division is exact and there is a divisibility relation between the numbers. The same relation can be stated in two ways: a is a multiple of b, or b is a divisor of a. If the remainder is not 0, there is no relation.',
            ar: 'عندما يكون باقي قسمة عدد على آخر 0 تكون القسمة تامة، وتوجد بين العددين علاقة قابلية القسمة. ويمكن التعبير عن هذه العلاقة بطريقتين: a مضاعف لـ b، أو b قاسم لـ a. وإذا لم يكن الباقي 0 فلا توجد علاقة.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Zatiketa zehatza', es: 'División exacta', en: 'Exact division', ar: 'قسمة تامة' },
                text: { eu: '24 : 6 = 4 eta hondarra 0 da. Beraz, 24 6ren multiploa da, eta 6 24ren zatitzailea.', es: '24 : 6 = 4 y el resto es 0. Por tanto, 24 es múltiplo de 6 y 6 es divisor de 24.', en: '24 : 6 = 4 and the remainder is 0. So 24 is a multiple of 6 and 6 is a divisor of 24.', ar: '24 : 6 = 4 والباقي 0. إذن 24 مضاعف لـ 6، و6 قاسم لـ 24.' },
                math: '$24=6\\cdot 4$'
            },
            {
                title: { eu: 'Zatiketa ez-zehatza', es: 'División no exacta', en: 'Non-exact division', ar: 'قسمة غير تامة' },
                text: { eu: '25 : 6 = 4 eta hondarra 1 da. 25 ez da 6ren multiploa, eta 6 ez da 25en zatitzailea.', es: '25 : 6 = 4 y el resto es 1. 25 no es múltiplo de 6 y 6 no es divisor de 25.', en: '25 : 6 = 4 and the remainder is 1. 25 is not a multiple of 6, and 6 is not a divisor of 25.', ar: '25 : 6 = 4 والباقي 1. العدد 25 ليس مضاعفًا لـ 6، و6 ليس قاسمًا لـ 25.' },
                math: '$25=6\\cdot 4+1$'
            },
            {
                title: { eu: 'Hitz berdinak', es: 'Expresiones equivalentes', en: 'Equivalent expressions', ar: 'عبارات متكافئة' },
                text: { eu: '«a b-ren multiploa da», «b a-ren zatitzailea da» eta «a b-rekin zatigarria da» gauza bera esateko hiru modu dira.', es: '«a es múltiplo de b», «b es divisor de a» y «a es divisible por b» son tres formas de decir lo mismo.', en: '“a is a multiple of b”, “b is a divisor of a” and “a is divisible by b” are three ways of saying the same thing.', ar: '«a مضاعف لـ b» و«b قاسم لـ a» و«a يقبل القسمة على b» ثلاث طرق لقول الشيء نفسه.' }
            }
        ],
        example: '$\\begin{array}{r|l}24&6\\\\\\hline 0&4\\end{array}\\qquad\\begin{array}{r|l}25&6\\\\\\hline 1&4\\end{array}$',
        takeaway: {
            eu: 'Hondarra 0 → zatigarritasun erlazioa dago.',
            es: 'Resto 0 → hay relación de divisibilidad.',
            en: 'Remainder 0 → there is a divisibility relation.',
            ar: 'الباقي 0 ← توجد علاقة قابلية القسمة.'
        }
    },
    {
        id: 'multiples',
        stage: 'multiples',
        title: { eu: 'Zenbaki baten multiploak', es: 'Los múltiplos de un número', en: 'The multiples of a number', ar: 'مضاعفات عدد' },
        goal: {
            eu: 'Zenbaki baten multiploak kalkulatzea eta multiplo komunak aurkitzea.',
            es: 'Calcular los múltiplos de un número y encontrar múltiplos comunes.',
            en: 'Work out the multiples of a number and find common multiples.',
            ar: 'حساب مضاعفات عدد وإيجاد المضاعفات المشتركة.'
        },
        explanation: {
            eu: 'Zenbaki baten multiploak lortzeko, zenbaki hori 1, 2, 3, 4… zenbaki naturalekin biderkatzen da. Multiploen multzoa M(a) idazten da, eta infinitua da: ez du amaierarik. 0 ere zenbaki guztien multiploa da ($a\\cdot 0=0$), baina zerrendetan multiplo positiboak idazten ditugu. Bi zenbakiren multiplo komunak bi zerrendetan agertzen direnak dira.',
            es: 'Para obtener los múltiplos de un número, se multiplica por los números naturales 1, 2, 3, 4… El conjunto de múltiplos se escribe M(a) y es infinito: no se acaba nunca. El 0 también es múltiplo de todos los números ($a\\cdot 0=0$), pero en las listas escribimos los múltiplos positivos. Los múltiplos comunes de dos números son los que aparecen en las dos listas.',
            en: 'To find the multiples of a number, multiply it by the natural numbers 1, 2, 3, 4… The set of multiples is written M(a) and it is infinite: it never ends. 0 is also a multiple of every number ($a\\cdot 0=0$), but in the lists we write the positive multiples. The common multiples of two numbers are the ones that appear in both lists.',
            ar: 'للحصول على مضاعفات عدد نضربه في الأعداد الطبيعية 1، 2، 3، 4… وتُكتب مجموعة المضاعفات M(a) وهي غير منتهية. والصفر أيضًا مضاعف لكل الأعداد ($a\\cdot 0=0$)، لكننا نكتب في القوائم المضاعفات الموجبة. والمضاعفات المشتركة لعددين هي التي تظهر في القائمتين.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Nola kalkulatu', es: 'Cómo se calculan', en: 'How they are worked out', ar: 'كيف نحسبها' },
                text: { eu: 'Biderkatu 1ez, 2z, 3z… Multiplo positiboetan, lehena zenbakia bera da.', es: 'Multiplica por 1, 2, 3… De los múltiplos positivos, el primero es el propio número.', en: 'Multiply by 1, 2, 3… The first positive multiple is the number itself.', ar: 'اضرب في 1، 2، 3… وأول مضاعف موجب هو العدد نفسه.' },
                math: '$\\mathrm{M}(4)=\\{4,\\ 8,\\ 12,\\ 16,\\ 20,\\ \\dots\\}$'
            },
            {
                title: { eu: 'Infinituak dira', es: 'Son infinitos', en: 'They are infinite.', ar: 'غير منتهية' },
                text: { eu: 'Beti egin daiteke beste biderketa bat; horregatik, multiploen zerrenda ez da inoiz amaitzen.', es: 'Siempre se puede hacer otra multiplicación; por eso la lista de múltiplos nunca termina.', en: 'You can always do one more multiplication, so the list of multiples never ends.', ar: 'يمكن دائمًا إجراء ضرب آخر؛ لذلك لا تنتهي قائمة المضاعفات أبدًا.' }
            },
            {
                title: { eu: 'Multiplo komunak', es: 'Múltiplos comunes', en: 'Common multiples', ar: 'المضاعفات المشتركة' },
                text: { eu: '4ren eta 6ren multiplo komunak: 12, 24, 36… Txikiena 12 da.', es: 'Múltiplos comunes de 4 y 6: 12, 24, 36… El menor es 12.', en: 'Common multiples of 4 and 6: 12, 24, 36… The smallest is 12.', ar: 'المضاعفات المشتركة لـ 4 و6: 12، 24، 36… وأصغرها 12.' },
                math: '$\\mathrm{M}(6)=\\{6,\\ 12,\\ 18,\\ 24,\\ \\dots\\}$'
            }
        ],
        example: '$\\mathrm{M}(3)=\\{3,\\ 6,\\ 9,\\ 12,\\ 15,\\ 18,\\ \\dots\\}$',
        takeaway: {
            eu: 'Multiploak = biderketak. Infinituak dira, eta multiplo positibo txikiena zenbakia bera da.',
            es: 'Múltiplos = multiplicaciones. Son infinitos y el menor múltiplo positivo es el propio número.',
            en: 'Multiples = multiplications. They are infinite, and the smallest positive multiple is the number itself.',
            ar: 'المضاعفات = عمليات ضرب. هي غير منتهية وأصغر مضاعف موجب هو العدد نفسه.'
        },
        figure: (language) => <MultiplesFigure step={3} max={24} language={language} />
    },
    {
        id: 'divisors',
        stage: 'multiples',
        title: { eu: 'Zenbaki baten zatitzaileak', es: 'Los divisores de un número', en: 'The divisors of a number', ar: 'قواسم عدد' },
        goal: {
            eu: 'Zenbaki baten zatitzaile guztiak modu ordenatuan aurkitzea.',
            es: 'Encontrar de forma ordenada todos los divisores de un número.',
            en: 'Find all the divisors of a number in an orderly way.',
            ar: 'إيجاد جميع قواسم عدد بطريقة منظمة.'
        },
        explanation: {
            eu: 'Zenbaki baten zatitzaileak zenbaki hori zehazki zatitzen duten zenbakiak dira. Zat(a) idazten da, eta multzo finitua da: txikiena 1 da eta handiena zenbakia bera. Denak aurkitzeko, zatitu 1ez, 2z, 3z… eta idatzi zatitzaileak bikoteka; bikoteak errepikatzen hasten direnean, amaitu duzu.',
            es: 'Los divisores de un número son los números que lo dividen de forma exacta. Se escribe Div(a) y es un conjunto finito: el menor es 1 y el mayor, el propio número. Para encontrarlos todos, divide entre 1, 2, 3… y anota los divisores por parejas; cuando las parejas empiezan a repetirse, has terminado.',
            en: 'The divisors of a number are the numbers that divide it exactly. It is written Div(a) and is a finite set: the smallest is 1 and the largest is the number itself. To find them all, divide by 1, 2, 3… and write the divisors in pairs; when the pairs start to repeat, you have finished.',
            ar: 'قواسم عدد هي الأعداد التي تقسمه قسمة تامة. وتُكتب مجموعتها Zat(a) وهي منتهية: أصغرها 1 وأكبرها العدد نفسه. لإيجادها كلها اقسم على 1، 2، 3… واكتب القواسم أزواجًا؛ وعندما تبدأ الأزواج بالتكرار تكون قد انتهيت.'
        },
        problem: { eu: 'Aurkitu 36ren zatitzaile guztiak.', es: 'Encuentra todos los divisores de 36.', en: 'Find all the divisors of 36.', ar: 'أوجد جميع قواسم 36.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zatitu 1ez eta idatzi bikotea.', es: 'Divide entre 1 y anota la pareja.', en: 'Divide by 1 and write down the pair.', ar: 'اقسم على 1 واكتب الزوج.' }, math: '$36=1\\cdot 36$' },
            { text: { eu: 'Jarraitu 2, 3, 4… zatiketa zehatzak bilatuz.', es: 'Sigue con 2, 3, 4… buscando divisiones exactas.', en: 'Continue with 2, 3, 4… looking for exact divisions.', ar: 'تابع مع 2، 3، 4… باحثًا عن القسمة التامة.' }, math: '$36=2\\cdot 18=3\\cdot 12=4\\cdot 9$' },
            { text: { eu: 'Gelditu bikoteko bi zenbakiak elkartzen direnean.', es: 'Para cuando los dos números de la pareja se encuentran.', en: 'Stop when the two numbers of the pair meet.', ar: 'توقّف عندما يلتقي عددا الزوج.' }, math: '$36=6\\cdot 6$' },
            { text: { eu: 'Idatzi guztiak txikienetik handienera.', es: 'Escríbelos todos de menor a mayor.', en: 'Write them all from smallest to largest.', ar: 'اكتبها كلها من الأصغر إلى الأكبر.' }, math: notation('$@DIV(36)=\\{1,2,3,4,6,9,12,18,36\\}$') }
        ],
        example: notation('$@DIV(12)=\\{1,\\ 2,\\ 3,\\ 4,\\ 6,\\ 12\\}$'),
        takeaway: {
            eu: 'Zatitzaileak bikoteka datoz. 1 eta zenbakia bera beti dira zatitzaileak.',
            es: 'Los divisores vienen por parejas. 1 y el propio número siempre son divisores.',
            en: 'Divisors come in pairs. 1 and the number itself are always divisors.',
            ar: 'القواسم تأتي أزواجًا. العدد 1 والعدد نفسه قاسمان دائمًا.'
        },
        figure: (language) => <DivisorRectanglesFigure n={12} language={language} />
    },
    {
        id: 'criteria-digit',
        stage: 'criteria',
        title: { eu: 'Azken zifra: 2, 5 eta 10', es: 'La última cifra: 2, 5 y 10', en: 'The last digit: 2, 5 and 10', ar: 'الرقم الأخير: 2 و5 و10' },
        goal: {
            eu: 'Zatiketa egin gabe jakitea zenbaki bat 2rekin, 5ekin edo 10ekin zatigarria den.',
            es: 'Saber sin dividir si un número es divisible por 2, 5 o 10.',
            en: 'Knowing without dividing whether a number is divisible by 2, 5 or 10.',
            ar: 'معرفة ما إذا كان العدد يقبل القسمة على 2 أو 5 أو 10 دون إجراء القسمة.'
        },
        explanation: {
            eu: 'Zatigarritasun irizpideek zatiketa egin gabe esaten digute zenbaki bat beste batekin zatigarria den. 2, 5 eta 10en kasuan, nahikoa da azken zifrari begiratzea.',
            es: 'Los criterios de divisibilidad nos dicen, sin hacer la división, si un número es divisible por otro. Para 2, 5 y 10 basta con mirar la última cifra.',
            en: 'Divisibility rules tell us, without doing the division, whether one number is divisible by another. For 2, 5 and 10, you only need to look at the last digit.',
            ar: 'تخبرنا قواعد قابلية القسمة، دون إجراء القسمة، هل يقبل عدد القسمة على آخر. وبالنسبة إلى 2 و5 و10 يكفي النظر إلى الرقم الأخير.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: '2rekin', es: 'Por 2', en: 'By 2', ar: 'على 2' }, text: { eu: 'Azken zifra bikoitia bada: 0, 2, 4, 6 edo 8.', es: 'Si la última cifra es par: 0, 2, 4, 6 u 8.', en: 'If the last digit is even: 0, 2, 4, 6 or 8.', ar: 'إذا كان الرقم الأخير زوجيًا: 0 أو 2 أو 4 أو 6 أو 8.' }, math: '$3\\,232\\ \\checkmark\\qquad 3\\,235\\ \\times$' },
            { title: { eu: '5ekin', es: 'Por 5', en: 'By 5', ar: 'على 5' }, text: { eu: 'Azken zifra 0 edo 5 bada.', es: 'Si la última cifra es 0 o 5.', en: 'If the last digit is 0 or 5.', ar: 'إذا كان الرقم الأخير 0 أو 5.' }, math: '$3\\,235\\ \\checkmark\\qquad 3\\,232\\ \\times$' },
            { title: { eu: '10ekin', es: 'Por 10', en: 'By 10', ar: 'على 10' }, text: { eu: 'Azken zifra 0 bada. 10ekin zatigarria dena 2rekin eta 5ekin ere bada.', es: 'Si la última cifra es 0. Lo que es divisible por 10 también lo es por 2 y por 5.', en: 'If the last digit is 0. Anything divisible by 10 is also divisible by 2 and by 5.', ar: 'إذا كان الرقم الأخير 0. وما يقبل القسمة على 10 يقبلها على 2 و5 أيضًا.' }, math: '$3\\,230\\ \\checkmark\\qquad 3\\,232\\ \\times$' }
        ],
        example: '$370\\mathbin{:}\\ \\text{2 } \\checkmark\\quad \\text{5 } \\checkmark\\quad \\text{10 } \\checkmark$',
        takeaway: {
            eu: '2, 5 eta 10: begiratu azken zifrari bakarrik.',
            es: '2, 5 y 10: mira solo la última cifra.',
            en: '2, 5 and 10: look only at the last digit.',
            ar: '2 و5 و10: انظر إلى الرقم الأخير فقط.'
        }
    },
    {
        id: 'criteria-sum',
        stage: 'criteria',
        title: { eu: 'Zifren batura: 3 eta 9', es: 'La suma de las cifras: 3 y 9', en: 'The sum of the digits: 3 and 9', ar: 'مجموع الأرقام: 3 و9' },
        goal: {
            eu: '3 eta 9ren irizpideak zifren baturarekin aplikatzea.',
            es: 'Aplicar los criterios del 3 y del 9 con la suma de las cifras.',
            en: 'Apply the rules for 3 and 9 using the sum of the digits.',
            ar: 'تطبيق قاعدتي 3 و9 باستعمال مجموع الأرقام.'
        },
        explanation: {
            eu: '3 eta 9ren kasuan ez da nahikoa azken zifra: zifra guztiak batu behar dira. Batura handia bada, haren zifrak berriro batu daitezke.',
            es: 'Para 3 y 9 no basta con la última cifra: hay que sumar todas las cifras. Si la suma es grande, se pueden volver a sumar sus cifras.',
            en: 'For 3 and 9, the last digit is not enough: you have to add all the digits. If the sum is big, you can add its digits again.',
            ar: 'بالنسبة إلى 3 و9 لا يكفي الرقم الأخير: يجب جمع كل الأرقام. وإذا كان المجموع كبيرًا يمكن جمع أرقامه من جديد.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: '3rekin', es: 'Por 3', en: 'By 3', ar: 'على 3' }, text: { eu: 'Zifren batura 3ren multiploa bada: 3, 6, 9, 12, 15…', es: 'Si la suma de sus cifras es múltiplo de 3: 3, 6, 9, 12, 15…', en: 'If the sum of its digits is a multiple of 3: 3, 6, 9, 12, 15…', ar: 'إذا كان مجموع أرقامه مضاعفًا لـ 3: 3، 6، 9، 12، 15…' }, math: '$3\\,234\\mathbin{:}\\ 3+2+3+4=12\\ \\checkmark$' },
            { title: { eu: '9rekin', es: 'Por 9', en: 'By 9', ar: 'على 9' }, text: { eu: 'Zifren batura 9ren multiploa bada: 9, 18, 27…', es: 'Si la suma de sus cifras es múltiplo de 9: 9, 18, 27…', en: 'If the sum of its digits is a multiple of 9: 9, 18, 27…', ar: 'إذا كان مجموع أرقامه مضاعفًا لـ 9: 9، 18، 27…' }, math: '$5\\,013\\mathbin{:}\\ 5+0+1+3=9\\ \\checkmark$' },
            { title: { eu: '6rekin', es: 'Por 6', en: 'By 6', ar: 'على 6' }, text: { eu: 'Irizpideak konbina daitezke: 6rekin zatigarria da 2rekin eta 3rekin zatigarria bada.', es: 'Los criterios se pueden combinar: es divisible por 6 si lo es por 2 y por 3.', en: 'Rules can be combined: it is divisible by 6 if it is divisible by 2 and by 3.', ar: 'يمكن الجمع بين القواعد: يقبل القسمة على 6 إذا قبلها على 2 و3 معًا.' }, math: '$282\\mathbin{:}\\ \\text{2 } \\checkmark\\ \\ 2+8+2=12\\ \\checkmark$' }
        ],
        example: '$\\begin{gathered}147\\mathbin{:}\\ 1+4+7=12\\\\\\text{3 } \\checkmark\\quad \\text{9 } \\times\\end{gathered}$',
        takeaway: {
            eu: '3 eta 9: batu zifrak. 9rekin zatigarria dena 3rekin ere bada.',
            es: '3 y 9: suma las cifras. Lo que es divisible por 9 también lo es por 3.',
            en: '3 and 9: add the digits. Anything divisible by 9 is also divisible by 3.',
            ar: '3 و9: اجمع الأرقام. وما يقبل القسمة على 9 يقبلها على 3 أيضًا.'
        }
    },
    {
        id: 'criteria-11-7',
        stage: 'criteria',
        title: { eu: '11 eta 7ren irizpideak', es: 'Los criterios del 11 y del 7', en: 'The rules for 11 and 7', ar: 'قاعدتا 11 و7' },
        goal: {
            eu: '11 eta 7ren irizpideak urratsez urrats aplikatzea.',
            es: 'Aplicar paso a paso los criterios del 11 y del 7.',
            en: 'Apply the rules for 11 and 7 step by step.',
            ar: 'تطبيق قاعدتي 11 و7 خطوة بخطوة.'
        },
        explanation: {
            eu: '11 eta 7ren irizpideak luzeagoak dira, baina zenbaki handiekin ere balio dute. 11rentzat, zifrak posizioka bereizten dira; 7rentzat, azken zifra kentzen da eta haren bikoitza kentzen zaio geratzen den zenbakiari.',
            es: 'Los criterios del 11 y del 7 son más largos, pero sirven también con números grandes. Para el 11, las cifras se separan según su posición; para el 7, se quita la última cifra y se resta su doble al número que queda.',
            en: 'The rules for 11 and 7 are longer, but they also work with big numbers. For 11, the digits are separated by position; for 7, you remove the last digit and subtract its double from the number that is left.',
            ar: 'قاعدتا 11 و7 أطول، لكنهما تصلحان للأعداد الكبيرة أيضًا. في قاعدة 11 تُفصل الأرقام حسب مواقعها؛ وفي قاعدة 7 يُحذف الرقم الأخير ويُطرح ضعفه من العدد الباقي.'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: '11rekin', es: 'Por 11', en: 'By 11', ar: 'على 11' },
                text: { eu: 'Batu posizio bikoitietako zifrak eta posizio bakoitietakoak. Kendu bi baturak: emaitza 0 edo 11ren multiploa bada, zatigarria da.', es: 'Suma las cifras de lugar par y las de lugar impar. Resta las dos sumas: si da 0 o un múltiplo de 11, es divisible.', en: 'Add the digits in even places and the digits in odd places. Subtract the two sums: if the result is 0 or a multiple of 11, it is divisible.', ar: 'اجمع الأرقام في المواقع الزوجية والأرقام في المواقع الفردية، ثم اطرح المجموعين: إذا كان الناتج 0 أو مضاعفًا لـ 11 فالعدد يقبل القسمة.' },
                math: '$3\\,234\\mathbin{:}\\ (2+4)-(3+3)=0\\ \\checkmark$'
            },
            {
                title: { eu: '7rekin', es: 'Por 7', en: 'By 7', ar: 'على 7' },
                text: { eu: 'Kendu unitateen zifra eta kendu haren bikoitza geratzen den zenbakiari. Emaitza 0 edo 7ren multiploa bada, zatigarria da. Handia bada, errepikatu.', es: 'Quita la cifra de las unidades y resta su doble al número que queda. Si da 0 o un múltiplo de 7, es divisible. Si es grande, repite.', en: 'Remove the units digit and subtract its double from the number that is left. If the result is 0 or a multiple of 7, it is divisible. If it is big, repeat.', ar: 'احذف رقم الآحاد واطرح ضعفه من العدد الباقي. إذا كان الناتج 0 أو مضاعفًا لـ 7 فالعدد يقبل القسمة. وإن كان كبيرًا فكرّر.' },
                math: '$3\\,234\\mathbin{:}\\ 323-8=315;\\ 31-10=21\\ \\checkmark$'
            }
        ],
        example: '$\\begin{gathered}3\\,238\\mathbin{:}\\ (8+2)-(3+3)=4\\\\\\text{11 } \\times\\end{gathered}$',
        takeaway: {
            eu: '11: posizio bikoitiak − bakoitiak. 7: kendu azken zifraren bikoitza.',
            es: '11: lugares pares − impares. 7: resta el doble de la última cifra.',
            en: '11: even places − odd places. 7: subtract twice the last digit.',
            ar: '11: المواقع الزوجية − الفردية. 7: اطرح ضعف الرقم الأخير.'
        }
    },
    {
        id: 'primes',
        stage: 'primes',
        title: { eu: 'Zenbaki lehenak eta konposatuak', es: 'Números primos y compuestos', en: 'Prime and composite numbers', ar: 'الأعداد الأولية والمؤلفة' },
        goal: {
            eu: 'Zenbaki bat lehena ala konposatua den erabakitzea.',
            es: 'Decidir si un número es primo o compuesto.',
            en: 'Deciding whether a number is prime or composite.',
            ar: 'تحديد ما إذا كان العدد أوليًا أم مؤلفًا.'
        },
        explanation: {
            eu: 'Zenbaki lehenak bi zatitzaile baino ez dituzte: 1 eta zenbakia bera. Zenbaki konposatuek bi zatitzaile baino gehiago dituzte. 1 zenbakiak zatitzaile bakarra du; beraz, ez da ez lehena ez konposatua. Eratostenesen baheak 100 arteko lehenak aurkitzen laguntzen du.',
            es: 'Los números primos solo tienen dos divisores: 1 y el propio número. Los números compuestos tienen más de dos divisores. El 1 solo tiene un divisor, así que no es ni primo ni compuesto. La criba de Eratóstenes ayuda a encontrar los primos hasta 100.',
            en: 'Prime numbers have only two divisors: 1 and the number itself. Composite numbers have more than two divisors. 1 has only one divisor, so it is neither prime nor composite. The Sieve of Eratosthenes helps you find the primes up to 100.',
            ar: 'للأعداد الأولية قاسمان فقط: 1 والعدد نفسه. وللأعداد المؤلفة أكثر من قاسمين. أما العدد 1 فله قاسم واحد، فهو ليس أوليًا ولا مؤلفًا. ويساعد غربال إراتوستينس على إيجاد الأعداد الأولية حتى 100.'
        },
        problem: { eu: 'Bilatu 50 baino txikiagoak diren zenbaki lehen guztiak.', es: 'Busca todos los números primos menores que 50.', en: 'Find all the prime numbers less than 50.', ar: 'ابحث عن كل الأعداد الأولية الأصغر من 50.' },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'Eratostenesen bahea', es: 'Criba de Eratóstenes', en: 'Sieve of Eratosthenes', ar: 'غربال إراتوستينس' }, text: { eu: 'Ratatu 1. Utzi 2 eta ratatu haren multiplo guztiak.', es: 'Tacha el 1. Deja el 2 y tacha todos sus múltiplos.', en: 'Cross out 1. Leave 2 and cross out all its multiples.', ar: 'اشطب 1. أبقِ 2 واشطب كل مضاعفاته.' } },
            { text: { eu: 'Hurrengo ratatu gabea (3) lehena da: ratatu haren multiploak.', es: 'El siguiente sin tachar (3) es primo: tacha sus múltiplos.', en: 'The next uncrossed number (3) is prime: cross out its multiples.', ar: 'العدد التالي غير المشطوب (3) أولي: اشطب مضاعفاته.' } },
            { text: { eu: 'Errepikatu 5ekin, 7rekin… Ratatu gabe geratzen direnak lehenak dira.', es: 'Repite con 5, 7… Los que quedan sin tachar son primos.', en: 'Repeat with 5, 7… The ones left uncrossed are primes.', ar: 'كرّر مع 5، 7… والأعداد التي تبقى غير مشطوبة أولية.' }, math: '$2,3,5,7,11,13,17,19,23,29,\\dots$' }
        ],
        example: notation('$\\begin{gathered}@DIV(31)=\\{1,31\\}\\\\@DIV(32)=\\{1,2,4,8,16,32\\}\\end{gathered}$'),
        takeaway: {
            eu: 'Lehena: bi zatitzaile bakarrik. 2 da lehen bikoiti bakarra.',
            es: 'Primo: solo dos divisores. El 2 es el único primo par.',
            en: 'Prime: only two divisors. 2 is the only even prime.',
            ar: 'الأولي: له قاسمان فقط. والعدد 2 هو العدد الأولي الزوجي الوحيد.'
        },
        figure: (language) => <SieveFigure language={language} />
    },
    {
        id: 'factorization',
        stage: 'primes',
        title: { eu: 'Biderkagai lehenetan deskonposatzea', es: 'Descomposición en factores primos', en: 'Prime factorisation', ar: 'التحليل إلى عوامل أولية' },
        goal: {
            eu: 'Zenbaki bat zenbaki lehenen biderkadura gisa idaztea, berreturak erabiliz.',
            es: 'Escribir un número como producto de números primos, usando potencias.',
            en: 'Write a number as a product of prime numbers, using powers.',
            ar: 'كتابة عدد في صورة حاصل ضرب أعداد أولية باستعمال القوى.'
        },
        explanation: {
            eu: 'Zenbaki konposatu oro zenbaki lehenen biderkadura gisa idatz daiteke, eta modu bakarra dago. Horretarako, zatitu zenbakia lehen txikienaz (zatigarritasun irizpideak erabiliz), gero zatidura, eta horrela 1 lortu arte. Biderkagai errepikatuak berretura gisa idazten dira.',
            es: 'Todo número compuesto se puede escribir como producto de números primos, y de una única forma. Para ello, divide el número entre el menor primo posible (usando los criterios de divisibilidad), después el cociente, y así hasta llegar a 1. Los factores repetidos se escriben como potencias.',
            en: 'Every composite number can be written as a product of prime numbers, and there is only one way to do it. To do this, divide the number by the smallest possible prime (using the divisibility rules), then divide the quotient, and so on until you reach 1. Repeated factors are written as powers.',
            ar: 'يمكن كتابة كل عدد مؤلف في صورة حاصل ضرب أعداد أولية، وبطريقة واحدة فقط. لذلك اقسم العدد على أصغر عدد أولي ممكن (باستعمال قواعد قابلية القسمة)، ثم اقسم الناتج، وهكذا حتى تصل إلى 1. وتُكتب العوامل المكررة في صورة قوى.'
        },
        problem: { eu: 'Deskonposatu 360 biderkagai lehenetan.', es: 'Descompón 360 en factores primos.', en: 'Factorise 360 into prime factors.', ar: 'حلّل 360 إلى عوامل أولية.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Idatzi zenbakia marra bertikal baten ezkerrean.', es: 'Escribe el número a la izquierda de una raya vertical.', en: 'Write the number to the left of a vertical line.', ar: 'اكتب العدد على يسار خط عمودي.' } },
            { text: { eu: 'Zatitu ahal den lehen txikienaz eta idatzi eskuinean; zatidura azpian.', es: 'Divide entre el menor primo posible y escríbelo a la derecha; el cociente, debajo.', en: 'Divide by the smallest possible prime and write it on the right; write the quotient underneath.', ar: 'اقسم على أصغر عدد أولي ممكن واكتبه على اليمين، والناتج تحته.' }, math: '$360\\mathbin{:}2=180$' },
            { text: { eu: 'Jarraitu 1 lortu arte.', es: 'Sigue hasta llegar a 1.', en: 'Keep going until you reach 1.', ar: 'تابع حتى تصل إلى 1.' } },
            { text: { eu: 'Bildu eskuineko lehenak berreturetan.', es: 'Agrupa los primos de la derecha en potencias.', en: 'Group the primes on the right into powers.', ar: 'اجمع الأعداد الأولية التي على اليمين في صورة قوى.' }, math: '$360=2^{3}\\cdot 3^{2}\\cdot 5$' }
        ],
        example: '$60=2^{2}\\cdot 3\\cdot 5\\qquad 72=2^{3}\\cdot 3^{2}$',
        takeaway: {
            eu: 'Biderkagai guztiak lehenak izan behar dira: 60 = 3 · 4 · 5 ez dago ondo, 4 ez delako lehena.',
            es: 'Todos los factores deben ser primos: 60 = 3 · 4 · 5 no está bien, porque 4 no es primo.',
            en: 'All the factors must be prime: 60 = 3 · 4 · 5 is not correct, because 4 is not prime.',
            ar: 'يجب أن تكون كل العوامل أولية: ‏60 = 3 · 4 · 5 غير صحيح لأن 4 ليس أوليًا.'
        },
        figure: (language) => <FactorLadderFigure n={360} language={language} />
    },
    {
        id: 'gcd',
        stage: 'gcd-lcm',
        title: { eu: 'Zatitzaile komunetako handiena (ZKH)', es: 'Máximo común divisor (m.c.d.)', en: 'Greatest common divisor (GCD)', ar: 'القاسم المشترك الأكبر (ق.م.أ · ZKH)' },
        goal: {
            eu: 'ZKH zerrendekin eta faktorizazioarekin kalkulatzea.',
            es: 'Calcular el m.c.d. con listas y por factorización.',
            en: 'Work out the GCD using lists and by factorisation.',
            ar: 'حساب ق.م.أ بالقوائم وبالتحليل إلى عوامل.'
        },
        explanation: {
            eu: 'Bi zenbaki edo gehiagoren ZKH denen zatitzaile komunetatik handiena da. Zenbaki txikiekin, idatzi zatitzaileen zerrendak eta hartu komunetatik handiena. Zenbaki handiekin, deskonposatu biderkagai lehenetan eta biderkatu biderkagai komunak berretzaile txikienarekin.',
            es: 'El m.c.d. de dos o más números es el mayor de sus divisores comunes. Con números pequeños, escribe las listas de divisores y toma el mayor de los comunes. Con números grandes, descompón en factores primos y multiplica los factores comunes con el menor exponente.',
            en: 'The GCD of two or more numbers is the largest of their common divisors. With small numbers, write the lists of divisors and take the largest of the common ones. With big numbers, factorise into prime factors and multiply the common factors, each with its smallest exponent.',
            ar: 'ق.م.أ لعددين أو أكثر هو أكبر قواسمهما المشتركة. مع الأعداد الصغيرة اكتب قوائم القواسم وخذ أكبر المشترك منها. ومع الأعداد الكبيرة حلّل إلى عوامل أولية واضرب العوامل المشتركة بأصغر أس.'
        },
        problem: { eu: 'Kalkulatu 24ren eta 36ren ZKH.', es: 'Calcula el m.c.d. de 24 y 36.', en: 'Calculate the GCD of 24 and 36.', ar: 'احسب ق.م.أ للعددين 24 و36.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Deskonposatu zenbaki bakoitza.', es: 'Descompón cada número.', en: 'Factorise each number.', ar: 'حلّل كل عدد.' }, math: '$24=2^{3}\\cdot 3\\qquad 36=2^{2}\\cdot 3^{2}$' },
            { text: { eu: 'Hartu biderkagai komunak bakarrik.', es: 'Toma solo los factores comunes.', en: 'Take only the common factors.', ar: 'خذ العوامل المشتركة فقط.' }, math: '$2,\\ 3$' },
            { text: { eu: 'Bakoitza berretzaile txikienarekin, eta biderkatu.', es: 'Cada uno con su menor exponente, y multiplica.', en: 'Each one with its smallest exponent, and multiply.', ar: 'كل عامل بأصغر أس ثم اضرب.' }, math: notation('$@GCD(24,36)=2^{2}\\cdot 3=12$') }
        ],
        example: notation('$\\begin{gathered}@DIV(12)\\cap @DIV(18)=\\{1,2,3,6\\}\\\\@GCD(12,18)=6\\end{gathered}$'),
        takeaway: {
            eu: 'ZKH: komunak, berretzaile txikienarekin. Ezin da zenbakirik txikiena baino handiagoa izan.',
            es: 'm.c.d.: comunes, con el menor exponente. Nunca es mayor que el menor de los números.',
            en: 'GCD: common factors, with the smallest exponent. It is never greater than the smaller of the numbers.',
            ar: 'ق.م.أ: المشتركة بأصغر أس. ولا يكون أبدًا أكبر من أصغر الأعداد.'
        },
        figure: (language) => <VennFigure language={language} />
    },
    {
        id: 'lcm',
        stage: 'gcd-lcm',
        title: { eu: 'Multiplo komunetako txikiena (MKT)', es: 'Mínimo común múltiplo (m.c.m.)', en: 'Least common multiple (LCM)', ar: 'المضاعف المشترك الأصغر (م.م.أ · MKT)' },
        goal: {
            eu: 'MKT kalkulatzea eta ZKHrekin ez nahastea.',
            es: 'Calcular el m.c.m. y no confundirlo con el m.c.d.',
            en: 'Work out the LCM and don\'t confuse it with the GCD.',
            ar: 'حساب م.م.أ وعدم الخلط بينه وبين ق.م.أ.'
        },
        explanation: {
            eu: 'Bi zenbaki edo gehiagoren MKT denen multiplo komunetatik txikiena da (0 kontatu gabe). Zenbaki txikiekin, idatzi multiploen zerrendak. Zenbaki handiekin, deskonposatu eta biderkatu biderkagai komunak eta ez-komunak, bakoitza berretzaile handienarekin. Bi zenbakiren ZKH 1 bada, elkarren arteko lehenak dira, eta haien MKT biderkadura da.',
            es: 'El m.c.m. de dos o más números es el menor de sus múltiplos comunes (sin contar el 0). Con números pequeños, escribe las listas de múltiplos. Con números grandes, descompón y multiplica los factores comunes y no comunes, cada uno con su mayor exponente. Si el m.c.d. de dos números es 1, son primos entre sí y su m.c.m. es su producto.',
            en: 'The LCM of two or more numbers is the smallest of their common multiples (not counting 0). With small numbers, write the lists of multiples. With big numbers, factorise and multiply the common and non-common factors, each with its largest exponent. If the GCD of two numbers is 1, they are coprime and their LCM is their product.',
            ar: 'م.م.أ لعددين أو أكثر هو أصغر مضاعفاتهما المشتركة (دون احتساب 0). مع الأعداد الصغيرة اكتب قوائم المضاعفات. ومع الأعداد الكبيرة حلّل واضرب العوامل المشتركة وغير المشتركة، كل منها بأكبر أس. وإذا كان ق.م.أ لعددين يساوي 1 فهما أوليان فيما بينهما، ويكون م.م.أ حاصل ضربهما.'
        },
        problem: { eu: 'Kalkulatu 24ren eta 36ren MKT.', es: 'Calcula el m.c.m. de 24 y 36.', en: 'Calculate the LCM of 24 and 36.', ar: 'احسب م.م.أ للعددين 24 و36.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Deskonposatu zenbaki bakoitza.', es: 'Descompón cada número.', en: 'Factorise each number.', ar: 'حلّل كل عدد.' }, math: '$24=2^{3}\\cdot 3\\qquad 36=2^{2}\\cdot 3^{2}$' },
            { text: { eu: 'Hartu biderkagai guztiak, komunak eta ez-komunak.', es: 'Toma todos los factores, comunes y no comunes.', en: 'Take all the factors, common and non-common.', ar: 'خذ كل العوامل، المشتركة وغير المشتركة.' }, math: '$2,\\ 3$' },
            { text: { eu: 'Bakoitza berretzaile handienarekin, eta biderkatu.', es: 'Cada uno con su mayor exponente, y multiplica.', en: 'Each one with its highest exponent, and multiply.', ar: 'كل عامل بأكبر أس ثم اضرب.' }, math: notation('$@LCM(24,36)=2^{3}\\cdot 3^{2}=72$') }
        ],
        example: notation('$\\begin{gathered}@GCD(8,15)=1\\\\@LCM(8,15)=8\\cdot 15=120\\end{gathered}$'),
        takeaway: {
            eu: 'MKT: guztiak, berretzaile handienarekin. Ezin da zenbakirik handiena baino txikiagoa izan.',
            es: 'm.c.m.: todos, con el mayor exponente. Nunca es menor que el mayor de los números.',
            en: 'LCM: all of them, with the highest exponent. It is never smaller than the largest of the numbers.',
            ar: 'م.م.أ: كل العوامل بأكبر أس. ولا يكون أبدًا أصغر من أكبر الأعداد.'
        }
    },
    {
        id: 'which',
        stage: 'problems',
        title: { eu: 'ZKH ala MKT?', es: '¿m.c.d. o m.c.m.?', en: 'GCD or LCM?', ar: 'ق.م.أ أم م.م.أ؟' },
        goal: {
            eu: 'Buruketa batean ZKH edo MKT behar den erabakitzea.',
            es: 'Decidir si un problema necesita el m.c.d. o el m.c.m.',
            en: 'Deciding whether a problem needs the GCD or the LCM.',
            ar: 'تحديد ما إذا كانت المسألة تحتاج ق.م.أ أم م.م.أ.'
        },
        explanation: {
            eu: 'Buruketa bat ebazten hasi aurretik, galdetu zeure buruari: kopuru batzuk zati berdinetan banatu behar ditut (zatitzaileak), ala zerbait berriro batera noiz gertatuko den bilatzen ari naiz (multiploak)? Galderako hitzek ere laguntzen dute.',
            es: 'Antes de empezar un problema, pregúntate: ¿tengo que repartir unas cantidades en partes iguales (divisores) o busco cuándo algo volverá a coincidir (múltiplos)? Las palabras de la pregunta también ayudan.',
            en: 'Before you start a problem, ask yourself: do I have to share some quantities into equal parts (divisors), or am I looking for when something will coincide again (multiples)? The words in the question also help.',
            ar: 'قبل أن تبدأ حل المسألة اسأل نفسك: هل عليّ تقسيم كميات إلى أجزاء متساوية (قواسم)، أم أبحث عن متى سيتكرر حدث ما معًا (مضاعفات)؟ وكلمات السؤال تساعد أيضًا.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'ZKH', es: 'm.c.d.', en: 'GCD', ar: 'ق.م.أ' }, text: { eu: 'Banatu, zatitu, taldekatu, soberakinik gabe… eta zati edo talde handiena: lepokoak, lauzak, kutxak, sortak.', es: 'Repartir, dividir, agrupar, sin que sobre… y el trozo o grupo más grande: collares, baldosas, cajas, lotes.', en: 'Share, divide, group, with nothing left over… and the largest piece or group: necklaces, tiles, boxes, bundles.', ar: 'نوزّع، نقسم، نجمع، دون أن يبقى شيء… وأكبر جزء أو مجموعة: عقود، بلاط، صناديق، رزم.' }, math: notation('$9,\\ 12,\\ 15\\ \\Rightarrow\\ @GCD=3$') },
            { title: { eu: 'MKT', es: 'm.c.m.', en: 'LCM', ar: 'م.م.أ' }, text: { eu: 'Berriro batera, aldi berean, lehen aldiz bat etorri… eta denbora edo luzera txikiena: autobusak, argiak, ibilbideak.', es: 'Volver a coincidir, a la vez, por primera vez… y el menor tiempo o longitud: autobuses, luces, recorridos.', en: 'Come together again, at the same time, for the first time… and the shortest time or length: buses, lights, routes.', ar: 'يلتقيان مجددًا، في الوقت نفسه، لأول مرة… وأقل زمن أو طول: حافلات، أضواء، مسارات.' }, math: notation('$4,\\ 6\\ \\Rightarrow\\ @LCM=12$') }
        ],
        example: notation('$\\begin{gathered}@GCD(9,12,15)=3\\\\@LCM(4,6)=12\\end{gathered}$'),
        takeaway: {
            eu: 'ZKHren emaitza datuak baino txikiagoa da; MKTrena, handiagoa.',
            es: 'El resultado del m.c.d. es menor que los datos; el del m.c.m., mayor.',
            en: 'The GCD result is smaller than the data; the LCM result is larger.',
            ar: 'ناتج ق.م.أ أصغر من المعطيات، وناتج م.م.أ أكبر منها.'
        },
        figure: (language) => <CoincidenceFigure language={language} />
    },
    {
        id: 'method',
        stage: 'problems',
        title: { eu: 'Buruketak lau urratsetan', es: 'Problemas en cuatro pasos', en: 'Problems in four steps', ar: 'المسائل في أربع خطوات' },
        goal: {
            eu: 'ZKH eta MKTko buruketak ordenan ebaztea eta emaitza esaldi batez ematea.',
            es: 'Resolver con orden los problemas de m.c.d. y m.c.m. y dar el resultado con una frase.',
            en: 'Solve GCD and LCM problems in order, and give the result in a sentence.',
            ar: 'حل مسائل ق.م.أ وم.م.أ بترتيب وإعطاء النتيجة في جملة.'
        },
        explanation: {
            eu: 'Klasean ikasitako lau urratsak jarraitu: erabaki ZKH ala MKT behar den, faktorizatu, kalkulatu eta interpretatu emaitza. Behean ZKHko buruketa bat dago ebatzita. Amaierako adibidean, bolek 4, 6 eta 8 mm dituzte, eta kolore bakoitzeko ilarak bat egiten duten luzera txikiena bilatzen da: MKT bat.',
            es: 'Sigue los cuatro pasos de clase: decide si hace falta el m.c.d. o el m.c.m., factoriza, calcula e interpreta el resultado. Abajo tienes resuelto un problema de m.c.d. En el ejemplo final, las bolas miden 4, 6 y 8 mm y se busca la menor longitud en la que coinciden hileras de cada color: un m.c.m.',
            en: 'Follow the four steps from class: decide whether you need the GCD or the LCM, factorise, calculate and interpret the result. Below you have a solved GCD problem. In the final example, the beads measure 4, 6 and 8 mm, and we look for the shortest length at which the rows of each colour match up: an LCM.',
            ar: 'اتبع الخطوات الأربع التي تعلّمتها في القسم: قرّر هل تحتاج إلى ق.م.أ أم م.م.أ، ثم حلّل، ثم احسب، ثم فسّر النتيجة. في الأسفل مسألة محلولة عن ق.م.أ. وفي المثال الأخير أقطار الكرات 4 و6 و8 مم، ونبحث عن أصغر طول تتطابق فيه صفوف كل لون: وهذا م.م.أ.'
        },
        problem: { eu: '9 bola gorri, 12 berde eta 15 urdin ditugu. Kolore bakarreko lepokoak egin nahi ditugu, denak bola kopuru berarekin, ahalik eta luzeenak eta bolarik soberan utzi gabe. Zenbat bola izango ditu lepoko bakoitzak?', es: 'Tenemos 9 bolas rojas, 12 verdes y 15 azules. Queremos hacer collares de un solo color, todos con el mismo número de bolas, lo más largos posible y sin que sobre ninguna. ¿Cuántas bolas tendrá cada collar?', en: 'We have 9 red beads, 12 green and 15 blue. We want to make necklaces of a single colour, all with the same number of beads, as long as possible and with none left over. How many beads will each necklace have?', ar: 'لدينا 9 كرات حمراء و12 خضراء و15 زرقاء. نريد صنع عقود بلون واحد، كلها بعدد الكرات نفسه، وأطول ما يمكن، دون أن تبقى أي كرة. كم كرة سيكون في كل عقد؟' },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'ZKH ala MKT?', es: '¿m.c.d. o m.c.m.?', en: 'GCD or LCM?', ar: 'ق.م.أ أم م.م.أ؟' }, text: { eu: 'Bolak lepokoetan banatzen ditugu, soberakinik gabe: 9, 12 eta 15en zatitzaile komuna behar dugu → ZKH.', es: 'Repartimos bolas en collares, sin que sobren: necesitamos un divisor común de 9, 12 y 15 → m.c.d.', en: 'We share beads into necklaces, with none left over: we need a common divisor of 9, 12 and 15 → GCD.', ar: 'نوزّع الكرات على عقود دون أن يبقى شيء: نحتاج قاسمًا مشتركًا لـ 9 و12 و15 ← ق.م.أ.' } },
            { title: { eu: 'Faktorizatu', es: 'Factoriza', en: 'Factorise', ar: 'حلّل' }, text: { eu: 'Deskonposatu datuak biderkagai lehenetan.', es: 'Descompón los datos en factores primos.', en: 'Factorise the data into prime factors.', ar: 'حلّل المعطيات إلى عوامل أولية.' }, math: '$9=3^{2}\\quad 12=2^{2}\\cdot 3\\quad 15=3\\cdot 5$' },
            { title: { eu: 'Kalkulatu', es: 'Calcula', en: 'Calculate', ar: 'احسب' }, text: { eu: 'Komunean 3 dute, berretzaile txikienarekin.', es: 'Tienen en común el 3, con el menor exponente.', en: 'They have 3 in common, with the smallest exponent.', ar: 'العامل المشترك هو 3 بأصغر أس.' }, math: notation('$@GCD(9,12,15)=3$') },
            { title: { eu: 'Interpretatu', es: 'Interpreta', en: 'Interpret', ar: 'فسّر' }, text: { eu: 'Eman emaitza esaldi gisa, unitateekin: lepoko bakoitzak 3 bola izango ditu (3 gorri, 4 berde eta 5 urdin lepoko).', es: 'Da el resultado como una frase, con unidades: cada collar tendrá 3 bolas (3 collares rojos, 4 verdes y 5 azules).', en: 'Give the result as a sentence, with units: each necklace will have 3 beads (3 red, 4 green and 5 blue necklaces).', ar: 'اكتب النتيجة في جملة مع الوحدات: سيكون في كل عقد 3 كرات (3 عقود حمراء و4 خضراء و5 زرقاء).' } }
        ],
        example: notation('$@LCM(4,6,8)=2^{3}\\cdot 3=24\\ \\text{mm}$'),
        takeaway: {
            eu: 'Ez amaitu zenbaki batekin: erantzun galderari esaldi batez eta unitateekin.',
            es: 'No termines con un número suelto: responde a la pregunta con una frase y con unidades.',
            en: 'Don\'t finish with a bare number: answer the question with a sentence and units.',
            ar: 'لا تنهِ الحل بعدد وحده: أجب عن السؤال بجملة مع الوحدات.'
        }
    }
]

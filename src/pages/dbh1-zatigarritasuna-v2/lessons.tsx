import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { CoincidenceFigure, DivisorRectanglesFigure, FactorLadderFigure, MultiplesFigure, SieveFigure, VennFigure } from '../dbh2-zatigarritasuna/figures'
import { notation } from '../dbh2-zatigarritasuna/notation'
import { BagsFigure, DivisorTableFigure, PoolCalendarFigure } from './figures'
import { divisibilityIntroLessonChecks, type DivisibilityIntroTopicId } from './lessonChecks'
import { divisibilityIntroLessonTexts } from './lessonTexts'

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
    { id: 'multiples', tone: 'blue', title: { eu: 'Multiploak eta zatitzaileak', es: 'Múltiplos y divisores', en: 'Multiples and divisors', ar: 'المضاعفات والقواسم' } },
    { id: 'criteria', tone: 'violet', title: { eu: 'Zatigarritasun irizpideak', es: 'Criterios de divisibilidad', en: 'Divisibility rules', ar: 'قواعد قابلية القسمة' } },
    { id: 'primes', tone: 'mustard', title: { eu: 'Lehenak eta deskonposizioa', es: 'Primos y descomposición', en: 'Primes and factorisation', ar: 'الأعداد الأولية والتحليل' } },
    { id: 'gcd-lcm', tone: 'coral', title: { eu: 'ZKH eta MKT', es: 'm.c.d. y m.c.m.', en: 'GCD and LCM', ar: 'ق.م.أ و م.م.أ' } },
    { id: 'problems', tone: 'green', title: { eu: 'Buruketak', es: 'Problemas', en: 'Problems', ar: 'المسائل' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'relation',
        stage: 'multiples',
        title: { eu: 'Zatiketa zehatza: multiploa eta zatitzailea', es: 'División exacta: múltiplo y divisor', en: 'Exact division: multiple and divisor', ar: 'القسمة التامة: المضاعف والقاسم' },
        goal: {
            eu: 'Zatiketa zehatz batean zein den multiploa eta zein zatitzailea jakitea.',
            es: 'Saber, en una división exacta, cuál es el múltiplo y cuál el divisor.',
            en: 'Knowing, in an exact division, which is the multiple and which is the divisor.',
            ar: 'معرفة المضاعف والقاسم في قسمة تامة.'
        },
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'divide', title: { eu: 'Zatiketa', es: 'La división', en: 'Division', ar: 'القسمة' } }],
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Zatiketa zehatza', es: 'División exacta', en: 'Exact division', ar: 'قسمة تامة' },
                text: { eu: '18 : 3 = 6 eta hondarra 0 da. Beraz, 18 zenbakia 3 zenbakiaren multiploa da, eta 3 zenbakia 18 zenbakiaren zatitzailea.', es: '18 : 3 = 6 y el resto es 0. Por tanto, 18 es múltiplo de 3 y 3 es divisor de 18.', en: '18 : 3 = 6 and the remainder is 0. So 18 is a multiple of 3, and 3 is a divisor of 18.', ar: '18 : 3 = 6 والباقي 0. إذن 18 مضاعف لـ 3، و3 قاسم لـ 18.' },
                math: '$18=3\\cdot 6$'
            },
            {
                title: { eu: 'Zatiketa ez-zehatza', es: 'División no exacta', en: 'Non-exact division', ar: 'قسمة غير تامة' },
                text: { eu: '18 : 4 = 4 eta hondarra 2 da. 18 zenbakia ez da 4 zenbakiaren multiploa, eta 4 zenbakia ez da 18 zenbakiaren zatitzailea.', es: '18 : 4 = 4 y el resto es 2. 18 no es múltiplo de 4 y 4 no es divisor de 18.', en: '18 : 4 = 4 and the remainder is 2. 18 is not a multiple of 4, and 4 is not a divisor of 18.', ar: '18 : 4 = 4 والباقي 2. العدد 18 ليس مضاعفًا لـ 4، و4 ليس قاسمًا لـ 18.' },
                math: '$18=4\\cdot 4+2$'
            },
            {
                title: { eu: 'Bi aldeetatik', es: 'Por los dos lados', en: 'From both sides', ar: 'من الجهتين' },
                text: { eu: '48 : 8 = 6 bada, 48 : 6 = 8 ere bada. Beraz, 48 zenbakia 8 eta 6 zenbakien multiploa da, eta 8 eta 6 zenbakiak 48 zenbakiaren zatitzaileak dira.', es: 'Si 48 : 8 = 6, también 48 : 6 = 8. Así que 48 es múltiplo de 8 y de 6, y 8 y 6 son divisores de 48.', en: 'If 48 : 8 = 6, then 48 : 6 = 8 too. So 48 is a multiple of 8 and of 6, and 8 and 6 are divisors of 48.', ar: 'إذا كان 48 : 8 = 6 فإن 48 : 6 = 8 أيضًا. إذن 48 مضاعف لـ 8 ولـ 6، و8 و6 قاسمان لـ 48.' },
                math: '$48=8\\cdot 6$'
            },
            {
                title: { eu: 'Hitz berdinak', es: 'Expresiones equivalentes', en: 'Equivalent expressions', ar: 'عبارات متكافئة' },
                text: { eu: '«18 zenbakia 3 zenbakiaren multiploa da», «3 zenbakia 18 zenbakiaren zatitzailea da» eta «18 zenbakia 3 zenbakiarekin zatigarria da» gauza bera esateko hiru modu dira.', es: '«18 es múltiplo de 3», «3 es divisor de 18» y «18 es divisible por 3» son tres formas de decir lo mismo.', en: '“18 is a multiple of 3”, “3 is a divisor of 18” and “18 is divisible by 3” are three ways of saying the same thing.', ar: '«18 مضاعف لـ 3» و«3 قاسم لـ 18» و«18 يقبل القسمة على 3» ثلاث طرق لقول الشيء نفسه.' }
            }
        ],
        takeaway: {
            eu: 'Hondarra 0 → handia txikiaren multiploa da, eta txikia handiaren zatitzailea.',
            es: 'Resto 0 → el mayor es múltiplo del menor, y el menor es divisor del mayor.',
            en: 'Remainder 0 → the greater is a multiple of the smaller, and the smaller is a divisor of the greater.',
            ar: 'الباقي 0 ← الأكبر مضاعف للأصغر، والأصغر قاسم للأكبر.'
        },
        figure: (language) => <BagsFigure language={language} />
    },
    {
        id: 'multiples',
        stage: 'multiples',
        title: { eu: 'Zenbaki baten multiploak', es: 'Los múltiplos de un número', en: 'The multiples of a number', ar: 'مضاعفات عدد' },
        goal: {
            eu: 'Zenbaki baten multiploak kalkulatzea eta bi zenbakiren artean dauden multiploak aurkitzea.',
            es: 'Calcular los múltiplos de un número y encontrar los que hay entre dos números.',
            en: 'Work out the multiples of a number, and find the ones between two numbers.',
            ar: 'حساب مضاعفات عدد وإيجاد المضاعفات الواقعة بين عددين.'
        },
        problem: { eu: 'Idatzi 30 eta 90 artean dauden 7 zenbakiaren multiploak.', es: 'Escribe los múltiplos de 7 que hay entre 30 y 90.', en: 'Write the multiples of 7 between 30 and 90.', ar: 'اكتب مضاعفات 7 الواقعة بين 30 و90.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Bilatu 30 gainditzen duen lehen biderketa.', es: 'Busca la primera multiplicación que pasa de 30.', en: 'Find the first multiplication that goes past 30.', ar: 'ابحث عن أول ناتج ضرب يتجاوز 30.' }, math: '$7\\cdot 4=28\\qquad 7\\cdot 5=35$' },
            { text: { eu: 'Batu 7 behin eta berriz.', es: 'Suma 7 una y otra vez.', en: 'Add 7 again and again.', ar: 'أضف 7 مرة بعد مرة.' }, math: '$35,\\ 42,\\ 49,\\ 56,\\ 63,\\ 70,\\ 77,\\ 84$' },
            { text: { eu: 'Gelditu 90 gainditu aurretik.', es: 'Para antes de pasar de 90.', en: 'Stop before you go past 90.', ar: 'توقّف قبل تجاوز 90.' }, math: '$7\\cdot 13=91>90$' }
        ],
        takeaway: {
            eu: 'Multiploak = biderketak (edo jauzi berdinak). Infinituak dira, eta lehen multiploa zenbakia bera da.',
            es: 'Múltiplos = multiplicaciones (o saltos iguales). Son infinitos y el primero es el propio número.',
            en: 'Multiples = multiplications (or equal jumps). They are infinite, and the first one is the number itself.',
            ar: 'المضاعفات = عمليات ضرب (أو قفزات متساوية). هي غير منتهية وأولها العدد نفسه.'
        },
        figure: (language) => <MultiplesFigure step={3} max={24} language={language} />
    },
    {
        id: 'divisors',
        stage: 'multiples',
        title: { eu: 'Zenbaki baten zatitzaileak', es: 'Los divisores de un número', en: 'The divisors of a number', ar: 'قواسم عدد' },
        goal: {
            eu: 'Zenbaki baten zatitzaile guztiak zatiketak eginez aurkitzea.',
            es: 'Encontrar todos los divisores de un número haciendo divisiones.',
            en: 'Find all the divisors of a number by dividing.',
            ar: 'إيجاد جميع قواسم عدد بإجراء القسمات.'
        },
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'divide', title: { eu: 'Zatiketa', es: 'La división', en: 'Division', ar: 'القسمة' } }],
        problem: { eu: 'Gelan 24 ikasle daude. Zenbat modutan egin daitezke talde berdinak, inor soberan utzi gabe?', es: 'En clase hay 24 alumnos. ¿De cuántas maneras se pueden formar grupos iguales sin que sobre nadie?', en: 'There are 24 students in class. In how many ways can equal groups be made with nobody left over?', ar: 'في الصف 24 تلميذًا. بكم طريقة يمكن تكوين مجموعات متساوية دون أن يبقى أحد؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zatitu 1, 2, 3, 4… zenbakiekin eta idatzi bikoteak.', es: 'Divide entre 1, 2, 3, 4… y escribe las parejas.', en: 'Divide by 1, 2, 3, 4… and write down the pairs.', ar: 'اقسم على 1، 2، 3، 4… واكتب الأزواج.' }, math: '$24=1\\cdot 24=2\\cdot 12=3\\cdot 8=4\\cdot 6$' },
            { text: { eu: '5 zenbakiaz zatitzean ez da zehatza. 6 zenbakitik aurrera bikoteak errepikatzen dira: gelditu.', es: 'Entre 5 no es exacta. A partir de 6 las parejas se repiten: para.', en: 'Dividing by 5 is not exact. From 6 onwards the pairs repeat: stop.', ar: 'القسمة على 5 ليست تامة. ومن 6 فصاعدًا تتكرر الأزواج: توقّف.' }, math: '$24=5\\cdot 4+4\\qquad 24=6\\cdot 4$' },
            { text: { eu: 'Idatzi zatitzaile guztiak txikienetik handienera.', es: 'Escribe todos los divisores de menor a mayor.', en: 'Write all the divisors from smallest to largest.', ar: 'اكتب كل القواسم من الأصغر إلى الأكبر.' }, math: notation('$@DIV(24)=\\{1,2,3,4,6,8,12,24\\}$') },
            { text: { eu: 'Erantzun: 8 modutan, adibidez 4 taldetan 6 ikasle edo 6 taldetan 4.', es: 'Respuesta: de 8 maneras, por ejemplo 4 grupos de 6 o 6 grupos de 4.', en: 'Answer: in 8 ways, for example 4 groups of 6 or 6 groups of 4.', ar: 'الجواب: بـ 8 طرق، مثل 4 مجموعات من 6 أو 6 مجموعات من 4.' } }
        ],
        takeaway: {
            eu: 'Zatitzaileak bikoteka datoz. 1 eta zenbakia bera beti dira zatitzaileak.',
            es: 'Los divisores vienen por parejas. 1 y el propio número siempre son divisores.',
            en: 'Divisors come in pairs. 1 and the number itself are always divisors.',
            ar: 'القواسم تأتي أزواجًا. العدد 1 والعدد نفسه قاسمان دائمًا.'
        },
        figure: (language) => <DivisorRectanglesFigure n={18} language={language} />
    },
    {
        id: 'criteria-digit',
        stage: 'criteria',
        title: { eu: 'Azken zifra: 2, 5 eta 10', es: 'La última cifra: 2, 5 y 10', en: 'The last digit: 2, 5 and 10', ar: 'الرقم الأخير: 2 و5 و10' },
        goal: {
            eu: 'Zatiketa egin gabe jakitea zenbaki bat 2, 5 edo 10 zenbakiarekin zatigarria den.',
            es: 'Saber sin dividir si un número es divisible por 2, 5 o 10.',
            en: 'Knowing without dividing whether a number is divisible by 2, 5 or 10.',
            ar: 'معرفة ما إذا كان العدد يقبل القسمة على 2 أو 5 أو 10 دون إجراء القسمة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: '2 zenbakiarekin', es: 'Por 2', en: 'By 2', ar: 'على 2' }, text: { eu: 'Azken zifra 0, 2, 4, 6 edo 8 bada (zenbaki bikoitiak).', es: 'Si acaba en 0, 2, 4, 6 u 8 (números pares).', en: 'If it ends in 0, 2, 4, 6 or 8 (even numbers).', ar: 'إذا انتهى بـ 0 أو 2 أو 4 أو 6 أو 8 (الأعداد الزوجية).' }, math: '$84\\ \\checkmark\\qquad 35\\ \\times$' },
            { title: { eu: '5 zenbakiarekin', es: 'Por 5', en: 'By 5', ar: 'على 5' }, text: { eu: 'Azken zifra 0 edo 5 bada.', es: 'Si acaba en 0 o en 5.', en: 'If it ends in 0 or 5.', ar: 'إذا انتهى بـ 0 أو 5.' }, math: '$35\\ \\checkmark\\qquad 84\\ \\times$' },
            { title: { eu: '10 zenbakiarekin', es: 'Por 10', en: 'By 10', ar: 'على 10' }, text: { eu: 'Azken zifra 0 bada. 10 zenbakiarekin zatigarria dena 2 eta 5 zenbakiekin ere bada.', es: 'Si acaba en 0. Lo que es divisible por 10 también lo es por 2 y por 5.', en: 'If it ends in 0. Anything divisible by 10 is also divisible by 2 and by 5.', ar: 'إذا انتهى بـ 0. وما يقبل القسمة على 10 يقبلها على 2 و5 أيضًا.' }, math: '$150\\ \\checkmark\\qquad 155\\ \\times$' }
        ],
        takeaway: {
            eu: '2, 5 eta 10: begiratu azken zifrari bakarrik.',
            es: '2, 5 y 10: mira solo la última cifra.',
            en: '2, 5 and 10: look only at the last digit.',
            ar: '2 و5 و10: انظر إلى الرقم الأخير فقط.'
        },
        figure: (language) => <MultiplesFigure step={2} max={24} language={language} />
    },
    {
        id: 'criteria-sum',
        stage: 'criteria',
        title: { eu: 'Zifren batura: 3 eta 9', es: 'La suma de las cifras: 3 y 9', en: 'The sum of the digits: 3 and 9', ar: 'مجموع الأرقام: 3 و9' },
        goal: {
            eu: '3 eta 9 zenbakien irizpideak zifren baturarekin aplikatzea.',
            es: 'Aplicar los criterios del 3 y del 9 con la suma de las cifras.',
            en: 'Apply the rules for 3 and 9 using the sum of the digits.',
            ar: 'تطبيق قاعدتي 3 و9 باستعمال مجموع الأرقام.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: '3 zenbakiarekin', es: 'Por 3', en: 'By 3', ar: 'على 3' }, text: { eu: 'Zifren batura 3 zenbakiaren multiploa bada: 3, 6, 9, 12, 15…', es: 'Si la suma de sus cifras es múltiplo de 3: 3, 6, 9, 12, 15…', en: 'If the sum of its digits is a multiple of 3: 3, 6, 9, 12, 15…', ar: 'إذا كان مجموع أرقامه مضاعفًا لـ 3: 3، 6، 9، 12، 15…' }, math: '$\\begin{gathered}471\\\\4+7+1=12\\ \\checkmark\\end{gathered}$' },
            { title: { eu: '9 zenbakiarekin', es: 'Por 9', en: 'By 9', ar: 'على 9' }, text: { eu: 'Zifren batura 9 zenbakiaren multiploa bada: 9, 18, 27…', es: 'Si la suma de sus cifras es múltiplo de 9: 9, 18, 27…', en: 'If the sum of its digits is a multiple of 9: 9, 18, 27…', ar: 'إذا كان مجموع أرقامه مضاعفًا لـ 9: 9، 18، 27…' }, math: '$\\begin{gathered}576\\\\5+7+6=18\\ \\checkmark\\end{gathered}$' },
            { title: { eu: 'Irizpideak batera', es: 'Criterios juntos', en: 'Combining the rules', ar: 'القواعد معًا' }, text: { eu: 'Zenbaki bat 2 eta 3 zenbakiekin zatigarria bada, 6 zenbakiarekin ere bada.', es: 'Si un número es divisible por 2 y por 3, también lo es por 6.', en: 'If a number is divisible by 2 and by 3, it is also divisible by 6.', ar: 'إذا قبل العدد القسمة على 2 وعلى 3 فإنه يقبلها على 6 أيضًا.' }, math: '$\\begin{gathered}108\\\\\\text{2 } \\checkmark\\quad \\text{3 } \\checkmark\\quad \\text{6 } \\checkmark\\end{gathered}$' }
        ],
        takeaway: {
            eu: '3 eta 9: batu zifrak. 9 zenbakiarekin zatigarria dena 3 zenbakiarekin ere bada.',
            es: '3 y 9: suma las cifras. Lo que es divisible por 9 también lo es por 3.',
            en: '3 and 9: add the digits. Anything divisible by 9 is also divisible by 3.',
            ar: '3 و9: اجمع الأرقام. وما يقبل القسمة على 9 يقبلها على 3 أيضًا.'
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
        problem: { eu: 'Bilatu 50 baino txikiagoak diren zenbaki lehen guztiak.', es: 'Busca todos los números primos menores que 50.', en: 'Find all the prime numbers less than 50.', ar: 'ابحث عن كل الأعداد الأولية الأصغر من 50.' },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'Eratostenesen bahea', es: 'Criba de Eratóstenes', en: 'Sieve of Eratosthenes', ar: 'غربال إراتوستينس' }, text: { eu: 'Ratatu 1. Utzi 2 eta ratatu haren multiplo guztiak.', es: 'Tacha el 1. Deja el 2 y tacha todos sus múltiplos.', en: 'Cross out 1. Leave 2 and cross out all its multiples.', ar: 'اشطب 1. أبقِ 2 واشطب كل مضاعفاته.' } },
            { text: { eu: 'Hurrengo ratatu gabea (3) lehena da: ratatu haren multiploak.', es: 'El siguiente sin tachar (3) es primo: tacha sus múltiplos.', en: 'The next uncrossed number (3) is prime: cross out its multiples.', ar: 'العدد التالي غير المشطوب (3) أولي: اشطب مضاعفاته.' } },
            { text: { eu: 'Errepikatu 5 eta 7 zenbakiekin. Ratatu gabe geratzen direnak lehenak dira.', es: 'Repite con 5 y 7. Los que quedan sin tachar son primos.', en: 'Repeat with 5 and 7. The numbers left uncrossed are prime.', ar: 'كرّر مع 5 و7. والأعداد التي تبقى غير مشطوبة أولية.' }, math: '$\\begin{gathered}2,3,5,7,11,13,17,19\\\\23,29,31,37,41,43,47\\end{gathered}$' }
        ],
        takeaway: {
            eu: 'Lehena: bi zatitzaile bakarrik. 2 da lehen bikoiti bakarra.',
            es: 'Primo: solo dos divisores. El 2 es el único primo par.',
            en: 'Prime: only two divisors. 2 is the only even prime.',
            ar: 'الأولي: له قاسمان فقط. والعدد 2 هو العدد الأولي الزوجي الوحيد.'
        },
        figureAfterSteps: true,
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
        needs: [{ unit: 'dbh1/zenbaki-naturalak', topic: 'powers', title: { eu: 'Berreturak', es: 'Las potencias', en: 'Powers', ar: 'القوى' } }],
        problem: { eu: 'Deskonposatu 36 biderkagai lehenetan.', es: 'Descompón 36 en factores primos.', en: 'Factorise 36 into prime factors.', ar: 'حلّل 36 إلى عوامل أولية.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: '36 bikoitia da: zatitu 2 zenbakiaz.', es: '36 es par: divide entre 2.', en: '36 is even: divide by 2.', ar: '36 زوجي: اقسم على 2.' }, math: '$36\\mathbin{:}2=18$' },
            { text: { eu: '18 ere bikoitia da: zatitu berriro 2 zenbakiaz.', es: '18 también es par: divide otra vez entre 2.', en: '18 is also even: divide by 2 again.', ar: '18 زوجي أيضًا: اقسم مرة أخرى على 2.' }, math: '$18\\mathbin{:}2=9$' },
            { text: { eu: '9 ez da bikoitia, baina 3 zenbakiarekin zatigarria da.', es: '9 no es par, pero es divisible por 3.', en: '9 is not even, but it is divisible by 3.', ar: '9 ليس زوجيًا، لكنه يقبل القسمة على 3.' }, math: '$9\\mathbin{:}3=3\\qquad 3\\mathbin{:}3=1$' },
            { text: { eu: 'Bildu eskuineko lehenak berreturetan.', es: 'Agrupa los primos de la derecha en potencias.', en: 'Group the primes on the right into powers.', ar: 'اجمع الأعداد الأولية التي على اليمين في صورة قوى.' }, math: '$36=2\\cdot 2\\cdot 3\\cdot 3=2^{2}\\cdot 3^{2}$' }
        ],
        takeaway: {
            eu: 'Biderkagai guztiak lehenak izan behar dira: 36 = 4 · 9 ez da deskonposizioa, 4 eta 9 ez direlako lehenak.',
            es: 'Todos los factores deben ser primos: 36 = 4 · 9 no es la descomposición, porque 4 y 9 no son primos.',
            en: 'All the factors must be prime: 36 = 4 · 9 is not the factorisation, because 4 and 9 are not prime.',
            ar: 'يجب أن تكون كل العوامل أولية: ‏36 = 4 · 9 ليس تحليلًا لأن 4 و9 ليسا أوليين.'
        },
        figureAfterSteps: true,
        figure: (language) => <FactorLadderFigure n={36} language={language} />
    },
    {
        id: 'divisor-table',
        stage: 'primes',
        title: { eu: 'Zatitzaileak deskonposiziotik', es: 'Los divisores a partir de la descomposición', en: 'Divisors from the factorisation', ar: 'القواسم انطلاقًا من التحليل' },
        goal: {
            eu: 'Zenbaki baten zatitzaile guztiak taula batekin lortzea, haren deskonposiziotik abiatuta.',
            es: 'Obtener todos los divisores de un número con una tabla, a partir de su descomposición.',
            en: 'Find all the divisors of a number using a table, starting from its factorisation.',
            ar: 'الحصول على كل قواسم عدد بجدول انطلاقًا من تحليله.'
        },
        problem: { eu: 'Aurkitu 36 zenbakiaren zatitzaile guztiak haren deskonposiziotik: 36 = 2² · 3².', es: 'Encuentra todos los divisores de 36 a partir de su descomposición: 36 = 2² · 3².', en: 'Find all the divisors of 36 from its factorisation: 36 = 2² · 3².', ar: 'أوجد كل قواسم 36 انطلاقًا من تحليله: ‏36 = 2² · 3².' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Lehen errenkada: 1 eta 2 zenbakiaren berreturak, 2² arte.', es: 'Primera fila: el 1 y las potencias de 2, hasta 2².', en: 'First row: 1 and the powers of 2, up to 2².', ar: 'الصف الأول: 1 وقوى 2 حتى 2².' }, math: '$1\\quad 2\\quad 4$' },
            { text: { eu: 'Bigarren errenkada: lehena bider 3.', es: 'Segunda fila: la primera por 3.', en: 'Second row: the first one times 3.', ar: 'الصف الثاني: الأول مضروبًا في 3.' }, math: '$3\\quad 6\\quad 12$' },
            { text: { eu: 'Hirugarren errenkada: lehena bider 3² = 9.', es: 'Tercera fila: la primera por 3² = 9.', en: 'Third row: the first one times 3² = 9.', ar: 'الصف الثالث: الأول مضروبًا في 3² = 9.' }, math: '$9\\quad 18\\quad 36$' },
            { text: { eu: 'Ordenatu taulako zenbaki guztiak.', es: 'Ordena todos los números de la tabla.', en: 'Put all the numbers in the table in order.', ar: 'رتّب كل أعداد الجدول.' }, math: notation('$@DIV(36)=\\{1,2,3,4,6,9,12,18,36\\}$') }
        ],
        takeaway: {
            eu: 'Taulak ez du zatitzailerik ahazten: 36 = 2² · 3² bada, 3 · 3 = 9 zatitzaile ditu.',
            es: 'La tabla no olvida ningún divisor: si 36 = 2² · 3², tiene 3 · 3 = 9 divisores.',
            en: 'The table doesn\'t miss any divisor: if 36 = 2² · 3², it has 3 · 3 = 9 divisors.',
            ar: 'الجدول لا ينسى أي قاسم: إذا كان 36 = 2² · 3² فله 3 · 3 = 9 قواسم.'
        },
        figureAfterSteps: true,
        figure: (language) => <DivisorTableFigure n={36} language={language} />
    },
    {
        id: 'gcd',
        stage: 'gcd-lcm',
        title: { eu: 'Zatitzaile komunak eta ZKH', es: 'Divisores comunes y m.c.d.', en: 'Common divisors and GCD', ar: 'القواسم المشتركة وق.م.أ' },
        goal: {
            eu: 'Bi zenbakiren zatitzaile komunak aurkitzea eta haien artean handiena (ZKH) kalkulatzea.',
            es: 'Encontrar los divisores comunes de dos números y calcular el mayor de ellos (m.c.d.).',
            en: 'Find the common divisors of two numbers and work out the greatest of them (GCD).',
            ar: 'إيجاد القواسم المشتركة لعددين وحساب أكبرها (ق.م.أ).'
        },
        problem: { eu: 'Kalkulatu 12 eta 18 zenbakien ZKH.', es: 'Calcula el m.c.d. de 12 y 18.', en: 'Calculate the GCD of 12 and 18.', ar: 'احسب ق.م.أ للعددين 12 و18.' },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'Zerrendekin', es: 'Con listas', en: 'Using lists', ar: 'بالقوائم' }, text: { eu: 'Idatzi bi zenbakien zatitzaileak.', es: 'Escribe los divisores de los dos números.', en: 'Write the divisors of both numbers.', ar: 'اكتب قواسم العددين.' }, math: notation('$\\begin{gathered}@DIV(12)=\\{\\mathbf{1},\\mathbf{2},\\mathbf{3},4,\\mathbf{6},12\\}\\\\@DIV(18)=\\{\\mathbf{1},\\mathbf{2},\\mathbf{3},\\mathbf{6},9,18\\}\\end{gathered}$') },
            { text: { eu: 'Komunetatik handiena hartu.', es: 'Toma el mayor de los comunes.', en: 'Take the largest of the common ones.', ar: 'خذ أكبر القواسم المشتركة.' }, math: notation('$@GCD(12,18)=6$') },
            { title: { eu: 'Deskonposizioarekin', es: 'Con la descomposición', en: 'Using the factorisation', ar: 'بالتحليل' }, text: { eu: 'Deskonposatu eta hartu komunak, berretzaile txikienarekin.', es: 'Descompón y toma los comunes, con el menor exponente.', en: 'Factorise and take the common factors, with the smallest exponent.', ar: 'حلّل وخذ المشتركة بأصغر أس.' }, math: notation('$\\begin{gathered}12=2^{2}\\cdot 3\\quad 18=2\\cdot 3^{2}\\\\@GCD(12,18)=2\\cdot 3=6\\end{gathered}$') }
        ],
        takeaway: {
            eu: 'ZKH: zatitzaile komunetako handiena. Ezin da zenbakirik txikiena baino handiagoa izan.',
            es: 'm.c.d.: el mayor de los divisores comunes. Nunca es mayor que el menor de los números.',
            en: 'GCD: the greatest of the common divisors. It is never greater than the smaller of the numbers.',
            ar: 'ق.م.أ: أكبر القواسم المشتركة. ولا يكون أبدًا أكبر من أصغر العددين.'
        },
        figureAfterSteps: true,
        figure: (language) => <VennFigure language={language} />
    },
    {
        id: 'lcm',
        stage: 'gcd-lcm',
        title: { eu: 'Multiplo komunak eta MKT', es: 'Múltiplos comunes y m.c.m.', en: 'Common multiples and LCM', ar: 'المضاعفات المشتركة وم.م.أ' },
        goal: {
            eu: 'Bi zenbakiren multiplo komunak aurkitzea eta haien artean txikiena (MKT) kalkulatzea.',
            es: 'Encontrar los múltiplos comunes de dos números y calcular el menor de ellos (m.c.m.).',
            en: 'Find the common multiples of two numbers and work out the smallest of them (LCM).',
            ar: 'إيجاد المضاعفات المشتركة لعددين وحساب أصغرها (م.م.أ).'
        },
        problem: { eu: 'Kalkulatu 4 eta 6 zenbakien MKT.', es: 'Calcula el m.c.m. de 4 y 6.', en: 'Calculate the LCM of 4 and 6.', ar: 'احسب م.م.أ للعددين 4 و6.' },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'Zerrendekin', es: 'Con listas', en: 'Using lists', ar: 'بالقوائم' }, text: { eu: 'Idatzi bi zenbakien lehen multiploak.', es: 'Escribe los primeros múltiplos de los dos números.', en: 'Write the first multiples of both numbers.', ar: 'اكتب المضاعفات الأولى للعددين.' }, math: '$\\begin{gathered}\\mathrm{M}(4)=\\{4,8,\\mathbf{12},16,20,\\mathbf{24}\\}\\\\\\mathrm{M}(6)=\\{6,\\mathbf{12},18,\\mathbf{24}\\}\\end{gathered}$' },
            { text: { eu: 'Komunetatik txikiena hartu.', es: 'Toma el menor de los comunes.', en: 'Take the smallest of the common ones.', ar: 'خذ أصغر المضاعفات المشتركة.' }, math: notation('$@LCM(4,6)=12$') },
            { title: { eu: 'Deskonposizioarekin', es: 'Con la descomposición', en: 'Using the factorisation', ar: 'بالتحليل' }, text: { eu: 'Deskonposatu eta hartu guztiak, berretzaile handienarekin.', es: 'Descompón y toma todos, con el mayor exponente.', en: 'Factorise and take them all, with the highest exponent.', ar: 'حلّل وخذ كل العوامل بأكبر أس.' }, math: notation('$\\begin{gathered}4=2^{2}\\quad 6=2\\cdot 3\\\\@LCM(4,6)=2^{2}\\cdot 3=12\\end{gathered}$') }
        ],
        takeaway: {
            eu: 'MKT: multiplo komunetako txikiena. Ezin da zenbakirik handiena baino txikiagoa izan.',
            es: 'm.c.m.: el menor de los múltiplos comunes. Nunca es menor que el mayor de los números.',
            en: 'LCM: the smallest of the common multiples. It is never smaller than the greater of the numbers.',
            ar: 'م.م.أ: أصغر المضاعفات المشتركة. ولا يكون أبدًا أصغر من أكبر العددين.'
        },
        figure: (language) => <PoolCalendarFigure language={language} />
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
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'ZKH', es: 'm.c.d.', en: 'GCD', ar: 'ق.م.أ' }, text: { eu: 'Banatu, taldekatu, poltsetan edo kutxetan sartu, soberan utzi gabe… ahalik eta talde handienak.', es: 'Repartir, agrupar, meter en bolsas o cajas, sin que sobre nada… los grupos más grandes posibles.', en: 'Sharing out, grouping, putting into bags or boxes, with nothing left over… the largest possible groups.', ar: 'نوزّع، نجمع، نضع في أكياس أو صناديق، دون أن يبقى شيء… أكبر مجموعات ممكنة.' }, math: notation('$\\begin{gathered}12,\\ 18\\\\@GCD=6\\end{gathered}$') },
            { title: { eu: 'MKT', es: 'm.c.m.', en: 'LCM', ar: 'م.م.أ' }, text: { eu: 'Berriro batera, aldi berean, lehen aldiz bat etorri… autobusak, itsasontziak, igerilekuko egunak.', es: 'Volver a coincidir, a la vez, por primera vez… autobuses, barcos, días de piscina.', en: 'Coinciding again, at the same time, for the first time… buses, boats, pool days.', ar: 'يلتقيان مجددًا، في الوقت نفسه، لأول مرة… حافلات، سفن، أيام المسبح.' }, math: notation('$\\begin{gathered}4,\\ 6\\\\@LCM=12\\end{gathered}$') }
        ],
        takeaway: {
            eu: 'ZKHren emaitza datuak baino txikiagoa da (edo berdina); MKTrena, handiagoa (edo berdina).',
            es: 'El resultado del m.c.d. es menor que los datos (o igual); el del m.c.m., mayor (o igual).',
            en: 'The GCD result is smaller than the data (or equal); the LCM result is greater (or equal).',
            ar: 'ناتج ق.م.أ أصغر من المعطيات (أو يساويها)، وناتج م.م.أ أكبر منها (أو يساويها).'
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
        problem: { eu: '24 gozoki marrubizko eta 36 limoizko ditugu. Poltsak egin nahi ditugu zaporeak nahastu gabe, poltsa guztietan gozoki kopuru bera jarriz, ahalik eta handienak eta bat ere soberan utzi gabe. Zenbat gozoki sartuko dira poltsa bakoitzean?', es: 'Tenemos 24 caramelos de fresa y 36 de limón. Queremos hacer bolsas sin mezclar sabores, con el mismo número de caramelos en todas, lo más grandes posible y sin que sobre ninguno. ¿Cuántos caramelos irán en cada bolsa?', en: 'We have 24 strawberry sweets and 36 lemon sweets. We want to make bags without mixing flavours, with the same number of sweets in every bag, as big as possible and with none left over. How many sweets will go in each bag?', ar: 'لدينا 24 حلوى بالفراولة و36 بالليمون. نريد صنع أكياس دون خلط النكهات، في كلها العدد نفسه من الحلوى، أكبر ما يمكن، ودون أن تبقى أي حلوى. كم حلوى ستكون في كل كيس؟' },
        stepsKind: 'steps',
        steps: [
            { title: { eu: 'ZKH ala MKT?', es: '¿m.c.d. o m.c.m.?', en: 'GCD or LCM?', ar: 'ق.م.أ أم م.م.أ؟' }, text: { eu: 'Gozokiak poltsetan banatzen ditugu, soberan utzi gabe: 24 eta 36 zenbakien zatitzaile komuna behar dugu, ahalik eta handiena → ZKH.', es: 'Repartimos caramelos en bolsas, sin que sobren: necesitamos un divisor común de 24 y 36, el mayor posible → m.c.d.', en: 'We share the sweets into bags, with none left over: we need a common divisor of 24 and 36, the largest possible → GCD.', ar: 'نوزّع الحلوى على أكياس دون أن يبقى شيء: نحتاج أكبر قاسم مشترك للعددين 24 و36 ← ق.م.أ.' } },
            { title: { eu: 'Deskonposatu', es: 'Descompón', en: 'Factorise', ar: 'حلّل' }, text: { eu: 'Deskonposatu datuak biderkagai lehenetan.', es: 'Descompón los datos en factores primos.', en: 'Factorise the data into prime factors.', ar: 'حلّل المعطيات إلى عوامل أولية.' }, math: '$24=2^{3}\\cdot 3\\qquad 36=2^{2}\\cdot 3^{2}$' },
            { title: { eu: 'Kalkulatu', es: 'Calcula', en: 'Calculate', ar: 'احسب' }, text: { eu: 'Biderkagai komunak, berretzaile txikienarekin.', es: 'Factores comunes, con el menor exponente.', en: 'Common factors, with the smallest exponent.', ar: 'العوامل المشتركة بأصغر أس.' }, math: notation('$@GCD(24,36)=2^{2}\\cdot 3=12$') },
            { title: { eu: 'Erantzun', es: 'Responde', en: 'Answer', ar: 'أجب' }, text: { eu: 'Poltsa bakoitzean 12 gozoki sartuko dira: 2 poltsa marrubizkoak eta 3 limoizkoak.', es: 'En cada bolsa irán 12 caramelos: 2 bolsas de fresa y 3 de limón.', en: 'Each bag will hold 12 sweets: 2 strawberry bags and 3 lemon bags.', ar: 'سيكون في كل كيس 12 حلوى: كيسان بالفراولة و3 أكياس بالليمون.' } }
        ],
        takeaway: {
            eu: 'Ez amaitu zenbaki batekin: erantzun galderari esaldi batez eta unitateekin.',
            es: 'No termines con un número suelto: responde a la pregunta con una frase y con unidades.',
            en: 'Don\'t finish with a bare number: answer the question with a sentence and units.',
            ar: 'لا تنهِ الحل بعدد وحده: أجب عن السؤال بجملة مع الوحدات.'
        }
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const divisibilityIntroTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...divisibilityIntroLessonTexts[topic.id as DivisibilityIntroTopicId], ...divisibilityIntroLessonChecks[topic.id as DivisibilityIntroTopicId] }))

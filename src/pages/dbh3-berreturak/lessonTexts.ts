import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { PowersTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Berreturak eta erroak · 3. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, its cases, the example as an exercise («Another example»)
   and, in four lessons, «Why does it work?». Plain data so the tests can
   import it; lessons.tsx merges it into the topics. The explanation keeps
   the numbers its drawing shows (83 400 000 and 0,00052, √72, √18 + √50,
   6,27 ≈ 6,3, the 0,125 m piece); the example uses numbers of its own,
   never those of «Let's solve», of «Check it» or of the typical mistake.
   Arabic writes the decimal point. No text command in the formulas (the
   unit test forbids it). Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const powersLessonTexts: Record<PowersTopicId, LessonTexts> = {
    /* ---------- 1. Powers ---------- */
    'power-sign': {
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('parentesiak', 'paréntesis', 'الأقواس', 'brackets'),
            say('faktoreak', 'factores', 'العوامل', 'factors')
        ],
        explanation: say(
            'Berretura faktore berdinen biderketa bat da: $a^{n}=a\\cdot a\\cdots a$, $n$ faktorerekin; $a$ oinarria da eta $n$ berretzailea. Oinarria negatiboa bada, zeinua berretzailearen araberakoa da. Kontuz parentesiekin: $-3^{4}=-81$ adierazpenean, berretzaileak ez dio aurreko zeinuari eragiten.',
            'Una potencia es un producto de factores iguales: $a^{n}=a\\cdot a\\cdots a$, con $n$ factores; $a$ es la base y $n$, el exponente. Si la base es negativa, el signo depende del exponente. Ojo con los paréntesis: en $-3^{4}=-81$ el exponente no afecta al signo de delante.',
            'القوة ضرب عوامل متساوية: $a^{n}=a\\cdot a\\cdots a$ بعدد $n$ من العوامل؛ $a$ هو الأساس و$n$ هو الأس. وإذا كان الأساس سالبًا فالإشارة تتعلق بالأس. انتبه إلى الأقواس: في $-3^{4}=-81$ لا يؤثر الأس في الإشارة التي أمامه.',
            'A power is a product of equal factors: $a^{n}=a\\cdot a\\cdots a$, with $n$ factors; $a$ is the base and $n$ the exponent. If the base is negative, the sign depends on the exponent. Mind the brackets: in $-3^{4}=-81$ the exponent does not touch the sign in front.'
        ),
        cases: [
            {
                title: say('Berretzaile bikoitia', 'Exponente par', 'أس زوجي', 'Even exponent'),
                text: say('Emaitza positiboa da.', 'El resultado es positivo.', 'النتيجة موجبة.', 'The result is positive.'),
                math: same('$(-3)^{4}=81$')
            },
            {
                title: say('Berretzaile bakoitia', 'Exponente impar', 'أس فردي', 'Odd exponent'),
                text: say('Emaitza negatiboa da.', 'El resultado es negativo.', 'النتيجة سالبة.', 'The result is negative.'),
                math: same('$(-3)^{3}=-27$')
            }
        ],
        examplePrompt: say('Kalkulatu $(-10)^{3}$ eta $(-10)^{4}$.', 'Calcula $(-10)^{3}$ y $(-10)^{4}$.', 'احسب $(-10)^{3}$ و$(-10)^{4}$.', 'Work out $(-10)^{3}$ and $(-10)^{4}$.'),
        example: same('$(-10)^{3}=-1000\\qquad(-10)^{4}=10\\,000$'),
        exampleAnswer: say('Berretzaile bakoitia, negatiboa; bikoitia, positiboa.', 'Exponente impar, negativo; par, positivo.', 'أس فردي: سالب؛ أس زوجي: موجب.', 'Odd exponent, negative; even, positive.')
    },
    'negative-zero': {
        definitions: [
            {
                term: say('Zenbaki baten alderantzizkoa', 'Inverso de un número', 'مقلوب العدد', 'Reciprocal of a number'),
                meaning: say('Zenbakiaz biderkatuta 1 ematen duena: 2 zenbakiaren alderantzizkoa $\\frac{1}{2}$ da.', 'El número que, multiplicado por él, da 1: el inverso de 2 es $\\frac{1}{2}$.', 'العدد الذي إذا ضُرب فيه أعطى 1: مقلوب 2 هو $\\frac{1}{2}$.', 'The number that gives 1 when multiplied by it: the reciprocal of 2 is $\\frac{1}{2}$.')
            }
        ],
        vocabulary: [
            say('berretzaile negatiboa', 'exponente negativo', 'الأس السالب', 'negative exponent'),
            say('zatikia', 'fracción', 'الكسر', 'fraction'),
            say('oinarria', 'base', 'الأساس', 'base')
        ],
        explanation: say(
            '0 ez den edozein oinarrirekin $a^{0}=1$ da, eta berretzaile negatiboak alderantzizkoa adierazten du: $a^{-n}=\\frac{1}{a^{n}}$, adibidez $2^{-2}=\\frac{1}{4}$. Zatiki bati buelta ematen zaio, eta berretzailea positibo bihurtzen da. Berretzaile negatiboak ez du emaitza negatiboa ematen.',
            'Con cualquier base distinta de 0, $a^{0}=1$, y un exponente negativo indica el inverso: $a^{-n}=\\frac{1}{a^{n}}$, como $2^{-2}=\\frac{1}{4}$. A una fracción se le da la vuelta y el exponente pasa a positivo. Un exponente negativo no da un resultado negativo.',
            'لأي أساس غير الصفر يكون $a^{0}=1$، ويدل الأس السالب على المقلوب: $a^{-n}=\\frac{1}{a^{n}}$، مثل $2^{-2}=\\frac{1}{4}$. والكسر نقلبه فيصير الأس موجبًا. والأس السالب لا يعطي نتيجة سالبة.',
            'With any base other than 0, $a^{0}=1$, and a negative exponent means the reciprocal: $a^{-n}=\\frac{1}{a^{n}}$, like $2^{-2}=\\frac{1}{4}$. A fraction is turned upside down and the exponent becomes positive. A negative exponent does not give a negative result.'
        ),
        examplePrompt: say('Kalkulatu $\\left(\\frac{3}{5}\\right)^{-2}$ eta $7^{0}$.', 'Calcula $\\left(\\frac{3}{5}\\right)^{-2}$ y $7^{0}$.', 'احسب $\\left(\\frac{3}{5}\\right)^{-2}$ و$7^{0}$.', 'Work out $\\left(\\frac{3}{5}\\right)^{-2}$ and $7^{0}$.'),
        example: same('$\\left(\\frac{3}{5}\\right)^{-2}=\\left(\\frac{5}{3}\\right)^{2}=\\frac{25}{9}\\qquad 7^{0}=1$'),
        exampleAnswer: say('$\\frac{25}{9}$ eta 1: zatikiari buelta eman zaio, eta berretzaile zeroak 1 ematen du.', '$\\frac{25}{9}$ y 1: a la fracción se le da la vuelta, y el exponente cero da 1.', '$\\frac{25}{9}$ و1: قلبنا الكسر، والأس صفر يعطي 1.', '$\\frac{25}{9}$ and 1: the fraction is turned upside down, and the exponent zero gives 1.'),
        why: {
            text: say(
                'Berreturen eskaileran, maila bat jaistean oinarriaz zatitzen da: $2^{2}=4$, $2^{1}=2$. Jaisten jarraituz, $2^{0}=2\\div 2=1$ eta $2^{-1}=1\\div 2=\\frac{1}{2}$.',
                'En la escalera de potencias, al bajar un escalón se divide entre la base: $2^{2}=4$, $2^{1}=2$. Si se sigue bajando, $2^{0}=2\\div 2=1$ y $2^{-1}=1\\div 2=\\frac{1}{2}$.',
                'في سُلّم القوى نقسم على الأساس كلما نزلنا درجة: $2^{2}=4$ و$2^{1}=2$. وإذا تابعنا النزول، $2^{0}=2\\div 2=1$ و$2^{-1}=1\\div 2=\\frac{1}{2}$.',
                'On the staircase of powers, going down one step divides by the base: $2^{2}=4$, $2^{1}=2$. Going on down, $2^{0}=2\\div 2=1$ and $2^{-1}=1\\div 2=\\frac{1}{2}$.'
            ),
            math: same('$2^{1}\\div 2=2^{0}=1\\qquad 2^{0}\\div 2=2^{-1}=\\frac{1}{2}$')
        }
    },
    'power-rules': {
        vocabulary: [
            say('oinarri bera', 'misma base', 'الأساس نفسه', 'same base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('biderkatu', 'multiplicar', 'الضرب', 'multiply')
        ],
        explanation: say(
            'Oinarri bereko berreturekin hiru arau daude. Berretzaile bera badute, oinarriak biderkatu edo zatitu daitezke: $a^{n}\\cdot b^{n}=(a\\cdot b)^{n}$. Ez erabili batuketekin: $(a+b)^{2}$ ez da $a^{2}+b^{2}$.',
            'Con potencias de la misma base hay tres reglas. Si tienen el mismo exponente, se pueden multiplicar o dividir las bases: $a^{n}\\cdot b^{n}=(a\\cdot b)^{n}$. No las uses con sumas: $(a+b)^{2}$ no es $a^{2}+b^{2}$.',
            'مع القوى ذات الأساس نفسه ثلاث قواعد. وإذا كان لها الأس نفسه يمكن ضرب الأساسات أو قسمتها: $a^{n}\\cdot b^{n}=(a\\cdot b)^{n}$. لا تستعملها مع الجمع: $(a+b)^{2}$ ليس $a^{2}+b^{2}$.',
            'With powers of the same base there are three rules. If they have the same exponent, the bases can be multiplied or divided: $a^{n}\\cdot b^{n}=(a\\cdot b)^{n}$. Do not use them with sums: $(a+b)^{2}$ is not $a^{2}+b^{2}$.'
        ),
        cases: [
            {
                title: say('Biderkadura', 'Producto', 'الضرب', 'Product'),
                text: say('Berretzaileak batu egiten dira.', 'Se suman los exponentes.', 'نجمع الأسس.', 'Add the exponents.'),
                math: same('$a^{m}\\cdot a^{n}=a^{m+n}$')
            },
            {
                title: say('Zatidura', 'Cociente', 'القسمة', 'Quotient'),
                text: say('Berretzaileak kendu egiten dira.', 'Se restan los exponentes.', 'نطرح الأسس.', 'Subtract the exponents.'),
                math: same('$a^{m}\\div a^{n}=a^{m-n}$')
            },
            {
                title: say('Berreturaren berretura', 'Potencia de potencia', 'قوة القوة', 'Power of a power'),
                text: say('Berretzaileak biderkatu egiten dira.', 'Se multiplican los exponentes.', 'نضرب الأسس.', 'Multiply the exponents.'),
                math: same('$(a^{m})^{n}=a^{m\\cdot n}$')
            }
        ],
        examplePrompt: say('Sinplifikatu $\\frac{2^{7}\\cdot 2^{-3}}{(2^{2})^{3}}$.', 'Simplifica $\\frac{2^{7}\\cdot 2^{-3}}{(2^{2})^{3}}$.', 'بسّط $\\frac{2^{7}\\cdot 2^{-3}}{(2^{2})^{3}}$.', 'Simplify $\\frac{2^{7}\\cdot 2^{-3}}{(2^{2})^{3}}$.'),
        example: same('$\\frac{2^{7-3}}{2^{6}}=2^{4-6}=2^{-2}=\\frac{1}{4}$'),
        exampleAnswer: say('$\\frac{1}{4}$: goian batu, behean biderkatu eta, zatitzean, kendu.', '$\\frac{1}{4}$: arriba se suma, abajo se multiplica y, al dividir, se resta.', '$\\frac{1}{4}$: في الأعلى نجمع، وفي الأسفل نضرب، وعند القسمة نطرح.', '$\\frac{1}{4}$: add on top, multiply below and, when dividing, subtract.'),
        why: {
            text: say(
                '$2^{3}\\cdot 2^{2}$ hau da: $(2\\cdot 2\\cdot 2)\\cdot(2\\cdot 2)$, bost bi biderkatuta. Faktoreak zenbatzea da: horregatik batzen dira berretzaileak.',
                '$2^{3}\\cdot 2^{2}$ es $(2\\cdot 2\\cdot 2)\\cdot(2\\cdot 2)$: cinco doses multiplicados. Es contar factores: por eso se suman los exponentes.',
                '$2^{3}\\cdot 2^{2}$ هو $(2\\cdot 2\\cdot 2)\\cdot(2\\cdot 2)$: خمسة عوامل كلها 2. إنه عدّ للعوامل، ولذلك نجمع الأسس.',
                '$2^{3}\\cdot 2^{2}$ is $(2\\cdot 2\\cdot 2)\\cdot(2\\cdot 2)$: five 2s multiplied. It is counting factors: that is why the exponents are added.'
            ),
            math: same('$2^{3}\\cdot 2^{2}=2^{5}=32$')
        }
    },

    /* ---------- 2. Scientific notation ---------- */
    'sci-write': {
        definitions: [
            {
                term: say('Idazkera zientifikoa', 'Notación científica', 'الترميز العلمي', 'Scientific notation'),
                meaning: say('Zenbaki bat $a\\cdot 10^{n}$ gisa idaztea, $1\\le a<10$ eta $n$ osoa izanik.', 'Escribir un número como $a\\cdot 10^{n}$, con $1\\le a<10$ y $n$ entero.', 'كتابة العدد على صورة $a\\cdot 10^{n}$ حيث $1\\le a<10$ و$n$ عدد صحيح.', 'Writing a number as $a\\cdot 10^{n}$, with $1\\le a<10$ and $n$ an integer.')
            }
        ],
        vocabulary: [
            say('koma', 'coma', 'الفاصلة', 'decimal point'),
            say('jauziak', 'saltos', 'القفزات', 'jumps'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        explanation: say(
            'Zenbaki handietan komak ezkerrera egiten du jauzi eta berretzailea positiboa da: $83\\,400\\,000=8{,}34\\cdot 10^{7}$. Txikietan eskuinera egiten du jauzi eta negatiboa da: $0{,}00052=5{,}2\\cdot 10^{-4}$. Berretzaileak jauziak zenbatzen ditu.',
            'En los números grandes la coma salta a la izquierda y el exponente es positivo: $83\\,400\\,000=8{,}34\\cdot 10^{7}$. En los pequeños salta a la derecha y es negativo: $0{,}00052=5{,}2\\cdot 10^{-4}$. El exponente cuenta los saltos.',
            'في الأعداد الكبيرة تقفز الفاصلة إلى اليسار ويكون الأس موجبًا: $83\\,400\\,000=8{,}34\\cdot 10^{7}$. وفي الصغيرة تقفز إلى اليمين ويكون سالبًا: $0{,}00052=5{,}2\\cdot 10^{-4}$. والأس يعدّ القفزات.',
            'In big numbers the decimal point jumps to the left and the exponent is positive: $83\\,400\\,000=8{,}34\\cdot 10^{7}$. In small ones it jumps to the right and it is negative: $0{,}00052=5{,}2\\cdot 10^{-4}$. The exponent counts the jumps.'
        ),
        examplePrompt: say('Idatzi idazkera zientifikoan Lurretik Eguzkirako distantzia, $150\\,000\\,000$ km, eta $0{,}0009$.', 'Escribe en notación científica la distancia de la Tierra al Sol, $150\\,000\\,000$ km, y $0{,}0009$.', 'اكتب بالترميز العلمي المسافة بين الأرض والشمس، $150\\,000\\,000$ كم، و$0{,}0009$.', 'Write in scientific notation the distance from the Earth to the Sun, $150\\,000\\,000$ km, and $0{,}0009$.'),
        example: same('$150\\,000\\,000=1{,}5\\cdot 10^{8}\\qquad 0{,}0009=9\\cdot 10^{-4}$'),
        exampleAnswer: say('$1{,}5\\cdot 10^{8}$ km (8 jauzi ezkerrera) eta $9\\cdot 10^{-4}$ (4 jauzi eskuinera).', '$1{,}5\\cdot 10^{8}$ km (8 saltos a la izquierda) y $9\\cdot 10^{-4}$ (4 saltos a la derecha).', '$1{,}5\\cdot 10^{8}$ كم (8 قفزات إلى اليسار) و$9\\cdot 10^{-4}$ (4 قفزات إلى اليمين).', '$1{,}5\\cdot 10^{8}$ km (8 jumps to the left) and $9\\cdot 10^{-4}$ (4 jumps to the right).'),
        why: {
            text: say(
                '10 zenbakiaz biderkatzean koma leku bat mugitzen da eskuinera. $8{,}34\\cdot 10^{7}$ hau da: $8{,}34$ zazpi aldiz 10 zenbakiaz biderkatuta; koma zazpi jauzi egiten ditu.',
                'Multiplicar por 10 mueve la coma un lugar a la derecha. $8{,}34\\cdot 10^{7}$ es $8{,}34$ multiplicado siete veces por 10: la coma da siete saltos.',
                'الضرب في 10 ينقل الفاصلة منزلة واحدة إلى اليمين. و$8{,}34\\cdot 10^{7}$ هو $8{,}34$ مضروبًا في 10 سبع مرات: تقفز الفاصلة سبع قفزات.',
                'Multiplying by 10 moves the decimal point one place to the right. $8{,}34\\cdot 10^{7}$ is $8{,}34$ multiplied by 10 seven times: the point makes seven jumps.'
            ),
            math: same('$8{,}34\\cdot 10^{7}=83\\,400\\,000$')
        }
    },
    'sci-compare': {
        definitions: [
            {
                term: say('Magnitude-ordena', 'Orden de magnitud', 'رتبة المقدار', 'Order of magnitude'),
                meaning: say('Idazkera zientifikoan idatzitako zenbaki baten 10 zenbakiaren berretura: haren gutxi gorabeherako tamaina.', 'La potencia de 10 de un número escrito en notación científica: su tamaño aproximado.', 'قوة 10 في عدد مكتوب بالترميز العلمي: حجمه التقريبي.', 'The power of 10 of a number written in scientific notation: its rough size.')
            }
        ],
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('konparatu', 'comparar', 'قارن', 'compare'),
            say('hidrogeno-atomoa', 'átomo de hidrógeno', 'ذرة الهيدروجين', 'hydrogen atom')
        ],
        explanation: say(
            'Idazkera zientifikoan zenbakiak konparatzeko, begiratu lehenik berretzaileei. Hidrogeno-atomo batek $10^{-10}$ m inguru neurtzen du eta Lurrak $10^{7}$ m inguru: 17 magnitude-ordena daude haien artean.',
            'Para comparar números en notación científica, mira primero los exponentes. Un átomo de hidrógeno mide unos $10^{-10}$ m y la Tierra, unos $10^{7}$ m: los separan 17 órdenes de magnitud.',
            'لمقارنة أعداد بالترميز العلمي انظر أولًا إلى الأسس. يبلغ طول ذرة الهيدروجين نحو $10^{-10}$ م والأرض نحو $10^{7}$ م: يفصل بينهما 17 رتبة مقدار.',
            'To compare numbers in scientific notation, look at the exponents first. A hydrogen atom measures about $10^{-10}$ m and the Earth about $10^{7}$ m: 17 orders of magnitude apart.'
        ),
        cases: [
            {
                title: say('Berretzaile desberdinak', 'Exponentes distintos', 'أسس مختلفة', 'Different exponents'),
                text: say('Handiena berretzaile handiena duena da; negatiboetan ere bai, zerotik hurbilago dagoena.', 'Es mayor el de mayor exponente, también con negativos: el más cercano a cero.', 'الأكبر صاحب الأس الأكبر، ومع الأسس السالبة كذلك: الأقرب إلى الصفر.', 'The one with the greater exponent is greater, with negatives too: the one closer to zero.'),
                math: same('$2\\cdot 10^{6}>9\\cdot 10^{5}\\qquad 5\\cdot 10^{-3}>5\\cdot 10^{-6}$')
            },
            {
                title: say('Berretzaile bera', 'Mismo exponente', 'الأس نفسه', 'Same exponent'),
                text: say('Aurreko zenbakiak konparatzen dira.', 'Se comparan los números de delante.', 'نقارن الأعداد التي في الأمام.', 'Compare the numbers in front.'),
                math: same('$3{,}1\\cdot 10^{4}<3{,}8\\cdot 10^{4}$')
            }
        ],
        examplePrompt: say('Zer da handiagoa: elefante baten masa, $6\\cdot 10^{3}$ kg, ala bale batena, $1{,}5\\cdot 10^{5}$ kg?', '¿Qué es mayor, la masa de un elefante, $6\\cdot 10^{3}$ kg, o la de una ballena, $1{,}5\\cdot 10^{5}$ kg?', 'أيهما أكبر: كتلة فيل $6\\cdot 10^{3}$ كغ أم كتلة حوت $1{,}5\\cdot 10^{5}$ كغ؟', 'Which is greater, the mass of an elephant, $6\\cdot 10^{3}$ kg, or that of a whale, $1{,}5\\cdot 10^{5}$ kg?'),
        example: same('$1{,}5\\cdot 10^{5}>6\\cdot 10^{3}$'),
        exampleAnswer: say('Balearena: haren berretzailea, 5, 3 baino handiagoa da. 25 aldiz gehiago pisatzen du.', 'La de la ballena: su exponente, 5, es mayor que 3. Pesa 25 veces más.', 'كتلة الحوت: أسه 5 أكبر من 3. وهو أثقل بـ 25 مرة.', 'The whale’s: its exponent, 5, is greater than 3. It weighs 25 times as much.')
    },
    'sci-ops': {
        vocabulary: [
            say('egokitu', 'ajustar', 'نضبط', 'adjust'),
            say('berretzaile bera', 'mismo exponente', 'الأس نفسه', 'same exponent'),
            say('zenbakia', 'número', 'العدد', 'number')
        ],
        explanation: say(
            'Eragiketak egin ondoren, aurreko zenbakia 10 edo handiagoa bada, edo 1 baino txikiagoa, egokitu egiten da: $20\\cdot 10^{5}=2\\cdot 10^{6}$.',
            'Después de operar, si el número de delante queda en 10 o más, o por debajo de 1, se ajusta: $20\\cdot 10^{5}=2\\cdot 10^{6}$.',
            'بعد إجراء العملية، إذا صار العدد الذي في الأمام 10 أو أكثر أو أقل من 1 فإننا نضبطه: $20\\cdot 10^{5}=2\\cdot 10^{6}$.',
            'After working it out, if the number in front is 10 or more, or less than 1, adjust it: $20\\cdot 10^{5}=2\\cdot 10^{6}$.'
        ),
        cases: [
            {
                title: say('Biderkatu eta zatitu', 'Multiplicar y dividir', 'الضرب والقسمة', 'Multiply and divide'),
                text: say('Zenbakiak biderkatu edo zatitu, eta berretzaileak batu edo kendu.', 'Se multiplican o dividen los números y se suman o restan los exponentes.', 'نضرب العددين أو نقسمهما، ونجمع الأسين أو نطرحهما.', 'Multiply or divide the numbers and add or subtract the exponents.'),
                math: same('$(5\\cdot 10^{3})\\cdot(4\\cdot 10^{2})=20\\cdot 10^{5}$')
            },
            {
                title: say('Batu eta kendu', 'Sumar y restar', 'الجمع والطرح', 'Add and subtract'),
                text: say('Berretzaile bera behar da: eraman bat bestearen berretzailera.', 'Hace falta el mismo exponente: pasa uno al exponente del otro.', 'نحتاج إلى الأس نفسه: نحوّل أحدهما إلى أس الآخر.', 'You need the same exponent: rewrite one with the other’s exponent.'),
                math: same('$\\begin{aligned}&3{,}2\\cdot 10^{4}+8\\cdot 10^{3}\\\\&=3{,}2\\cdot 10^{4}+0{,}8\\cdot 10^{4}=4\\cdot 10^{4}\\end{aligned}$')
            }
        ],
        examplePrompt: say('Kalkulatu $(7\\cdot 10^{-3})\\cdot(3\\cdot 10^{8})$.', 'Calcula $(7\\cdot 10^{-3})\\cdot(3\\cdot 10^{8})$.', 'احسب $(7\\cdot 10^{-3})\\cdot(3\\cdot 10^{8})$.', 'Work out $(7\\cdot 10^{-3})\\cdot(3\\cdot 10^{8})$.'),
        example: same('$21\\cdot 10^{-3+8}=21\\cdot 10^{5}=2{,}1\\cdot 10^{6}$'),
        exampleAnswer: say('$2{,}1\\cdot 10^{6}$: 21 zenbakia 10 baino handiagoa denez, koma leku bat mugitzen da eta berretzailea bat igotzen da.', '$2{,}1\\cdot 10^{6}$: como 21 es mayor que 10, la coma salta un lugar y el exponente sube uno.', '$2{,}1\\cdot 10^{6}$: لأن 21 أكبر من 10 تقفز الفاصلة منزلة ويزيد الأس واحدًا.', '$2{,}1\\cdot 10^{6}$: since 21 is greater than 10, the point jumps one place and the exponent goes up by one.')
    },

    /* ---------- 3. Roots and radicals ---------- */
    roots: {
        definitions: [
            {
                term: say('Errokizuna', 'Radicando', 'ما تحت الجذر', 'Radicand'),
                meaning: say('Erroaren barruko zenbakia: $\\sqrt{25}$ erroan, 25.', 'El número de dentro de la raíz: en $\\sqrt{25}$, el 25.', 'العدد الذي داخل الجذر: في $\\sqrt{25}$ هو 25.', 'The number inside the root: in $\\sqrt{25}$, the 25.')
            },
            {
                term: say('Indizea', 'Índice', 'الدليل', 'Index'),
                meaning: say('Zein erro den esaten duen zenbaki txikia: $\\sqrt[3]{8}$ erroan, 3. Idazten ez bada, 2 da.', 'El número pequeño que dice qué raíz es: en $\\sqrt[3]{8}$, el 3. Si no se escribe, es 2.', 'العدد الصغير الذي يبيّن نوع الجذر: في $\\sqrt[3]{8}$ هو 3، وإذا لم يُكتب فهو 2.', 'The small number that says which root it is: in $\\sqrt[3]{8}$, the 3. If it is not written, it is 2.')
            }
        ],
        vocabulary: [
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root'),
            say('erro kubikoa', 'raíz cúbica', 'الجذر التكعيبي', 'cube root'),
            say('karratu perfektua', 'cuadrado perfecto', 'مربع كامل', 'perfect square')
        ],
        explanation: say(
            'Erroa berreturaren alderantzizko eragiketa da: $\\sqrt{25}=5$, $5^{2}=25$ delako, eta $\\sqrt[3]{8}=2$, $2^{3}=8$ delako. Errokizuna karratu perfektua ez bada, erro karratua ez da zehatza: $\\sqrt{7}=2{,}6457\\ldots$',
            'La raíz es la operación inversa de la potencia: $\\sqrt{25}=5$ porque $5^{2}=25$, y $\\sqrt[3]{8}=2$ porque $2^{3}=8$. Si el radicando no es un cuadrado perfecto, la raíz cuadrada no es exacta: $\\sqrt{7}=2{,}6457\\ldots$',
            'الجذر عملية عكسية للقوة: $\\sqrt{25}=5$ لأن $5^{2}=25$، و$\\sqrt[3]{8}=2$ لأن $2^{3}=8$. وإذا لم يكن ما تحت الجذر مربعًا كاملًا فالجذر التربيعي غير تام: $\\sqrt{7}=2{,}6457\\ldots$',
            'A root is the inverse of a power: $\\sqrt{25}=5$ because $5^{2}=25$, and $\\sqrt[3]{8}=2$ because $2^{3}=8$. If the radicand is not a perfect square, the square root is not exact: $\\sqrt{7}=2{,}6457\\ldots$'
        ),
        cases: [
            {
                title: say('Indize bikoitia', 'Índice par', 'دليل زوجي', 'Even index'),
                text: say('Errokizuna negatiboa bada, ez dago errorik; bestela, erroa positiboa da.', 'Si el radicando es negativo, no existe; si no, la raíz es positiva.', 'إذا كان ما تحت الجذر سالبًا فلا يوجد جذر، وإلا فالجذر موجب.', 'If the radicand is negative, it does not exist; otherwise the root is positive.'),
                math: same('$\\sqrt{25}=5$')
            },
            {
                title: say('Indize bakoitia', 'Índice impar', 'دليل فردي', 'Odd index'),
                text: say('Beti dago, eta errokizunaren zeinua du.', 'Siempre existe y tiene el signo del radicando.', 'موجود دائمًا وله إشارة ما تحت الجذر.', 'It always exists and has the sign of the radicand.'),
                math: same('$\\sqrt[3]{-8}=-2$')
            }
        ],
        examplePrompt: say('Kalkulatu $\\sqrt{225}$ eta $\\sqrt[3]{-64}$.', 'Calcula $\\sqrt{225}$ y $\\sqrt[3]{-64}$.', 'احسب $\\sqrt{225}$ و$\\sqrt[3]{-64}$.', 'Work out $\\sqrt{225}$ and $\\sqrt[3]{-64}$.'),
        example: same('$\\sqrt{225}=15\\qquad\\sqrt[3]{-64}=-4$'),
        exampleAnswer: say('$15^{2}=225$ eta $(-4)^{3}=-64$ direlako.', 'Porque $15^{2}=225$ y $(-4)^{3}=-64$.', 'لأن $15^{2}=225$ و$(-4)^{3}=-64$.', 'Because $15^{2}=225$ and $(-4)^{3}=-64$.')
    },
    extract: {
        vocabulary: [
            say('faktore lehenak', 'factores primos', 'العوامل الأولية', 'prime factors'),
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand'),
            say('karratu perfektua', 'cuadrado perfecto', 'مربع كامل', 'perfect square')
        ],
        explanation: say(
            'Deskonposatu errokizuna faktore lehenetan: karratu bakoitza erroitik ateratzen da, berretzailearen erdiarekin. $\\sqrt{72}=\\sqrt{2^{2}\\cdot 3^{2}\\cdot 2}=2\\cdot 3\\cdot\\sqrt{2}=6\\sqrt{2}$. Barruan geratzen denak ez du karratu perfekturik izan behar.',
            'Descompón el radicando en factores primos: cada cuadrado sale de la raíz con la mitad del exponente. $\\sqrt{72}=\\sqrt{2^{2}\\cdot 3^{2}\\cdot 2}=2\\cdot 3\\cdot\\sqrt{2}=6\\sqrt{2}$. Lo que queda dentro no puede tener ningún cuadrado perfecto.',
            'حلّل ما تحت الجذر إلى عوامل أولية: كل مربع يخرج من الجذر بنصف أسه. $\\sqrt{72}=\\sqrt{2^{2}\\cdot 3^{2}\\cdot 2}=2\\cdot 3\\cdot\\sqrt{2}=6\\sqrt{2}$. وما يبقى في الداخل لا يجوز أن يحتوي على أي مربع كامل.',
            'Break the radicand into prime factors: each square comes out of the root with half its exponent. $\\sqrt{72}=\\sqrt{2^{2}\\cdot 3^{2}\\cdot 2}=2\\cdot 3\\cdot\\sqrt{2}=6\\sqrt{2}$. What stays inside cannot have any perfect square.'
        ),
        examplePrompt: say('Sinplifikatu $\\sqrt{98}$.', 'Simplifica $\\sqrt{98}$.', 'بسّط $\\sqrt{98}$.', 'Simplify $\\sqrt{98}$.'),
        example: same('$\\sqrt{98}=\\sqrt{2\\cdot 7^{2}}=7\\sqrt{2}$'),
        exampleAnswer: say('$7\\sqrt{2}$: 7 ateratzen da, karratuan dagoelako; 2 barruan geratzen da.', '$7\\sqrt{2}$: el 7 sale porque está al cuadrado; el 2 se queda dentro.', '$7\\sqrt{2}$: يخرج 7 لأنه مربع، ويبقى 2 في الداخل.', '$7\\sqrt{2}$: the 7 comes out because it is squared; the 2 stays inside.'),
        why: {
            text: say(
                '$\\sqrt{a\\cdot b}=\\sqrt{a}\\cdot\\sqrt{b}$ eta $\\sqrt{3^{2}}=3$ direlako: karratuan dagoen faktorea osorik ateratzen da, eta bikoterik gabekoa barruan geratzen da.',
                'Porque $\\sqrt{a\\cdot b}=\\sqrt{a}\\cdot\\sqrt{b}$ y $\\sqrt{3^{2}}=3$: un factor al cuadrado sale entero, y el que no tiene pareja se queda dentro.',
                'لأن $\\sqrt{a\\cdot b}=\\sqrt{a}\\cdot\\sqrt{b}$ و$\\sqrt{3^{2}}=3$: العامل المربع يخرج كاملًا، والعامل الذي لا زوج له يبقى في الداخل.',
                'Because $\\sqrt{a\\cdot b}=\\sqrt{a}\\cdot\\sqrt{b}$ and $\\sqrt{3^{2}}=3$: a squared factor comes out whole, and one without a pair stays inside.'
            ),
            math: same('$\\sqrt{18}=\\sqrt{9}\\cdot\\sqrt{2}=3\\sqrt{2}$')
        }
    },
    introduce: {
        vocabulary: [
            say('karratua', 'cuadrado', 'مربع', 'square'),
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand'),
            say('konparatu', 'comparar', 'المقارنة', 'compare')
        ],
        explanation: say(
            'Faktoreak ateratzearen alderantzizkoa da: aurreko zenbakia karratuan sartzen da eta errokizunarekin biderkatzen da, $3\\sqrt{5}=\\sqrt{3^{2}\\cdot 5}=\\sqrt{45}$. Konparatzeko balio du: $2\\sqrt{7}=\\sqrt{28}$ eta $3\\sqrt{3}=\\sqrt{27}$; beraz, $2\\sqrt{7}$ da handiagoa.',
            'Es lo contrario de sacar factores: el número de delante entra al cuadrado y multiplica al radicando, $3\\sqrt{5}=\\sqrt{3^{2}\\cdot 5}=\\sqrt{45}$. Sirve para comparar: $2\\sqrt{7}=\\sqrt{28}$ y $3\\sqrt{3}=\\sqrt{27}$, así que $2\\sqrt{7}$ es mayor.',
            'إنه عكس إخراج العوامل: يدخل العدد الذي في الأمام مربعًا ويضرب ما تحت الجذر، $3\\sqrt{5}=\\sqrt{3^{2}\\cdot 5}=\\sqrt{45}$. ويفيد في المقارنة: $2\\sqrt{7}=\\sqrt{28}$ و$3\\sqrt{3}=\\sqrt{27}$، إذن $2\\sqrt{7}$ أكبر.',
            'It is the opposite of taking factors out: the number in front goes in squared and multiplies the radicand, $3\\sqrt{5}=\\sqrt{3^{2}\\cdot 5}=\\sqrt{45}$. It helps to compare: $2\\sqrt{7}=\\sqrt{28}$ and $3\\sqrt{3}=\\sqrt{27}$, so $2\\sqrt{7}$ is greater.'
        ),
        examplePrompt: say('Sartu faktoreak erroan eta konparatu $3\\sqrt{6}$ eta $5\\sqrt{2}$.', 'Mete los factores en la raíz y compara $3\\sqrt{6}$ y $5\\sqrt{2}$.', 'أدخل العاملين في الجذر وقارن $3\\sqrt{6}$ و$5\\sqrt{2}$.', 'Put the factors inside the root and compare $3\\sqrt{6}$ and $5\\sqrt{2}$.'),
        example: same('$3\\sqrt{6}=\\sqrt{54}\\qquad 5\\sqrt{2}=\\sqrt{50}$'),
        exampleAnswer: say('$\\sqrt{54}>\\sqrt{50}$; beraz, $3\\sqrt{6}>5\\sqrt{2}$.', '$\\sqrt{54}>\\sqrt{50}$, así que $3\\sqrt{6}>5\\sqrt{2}$.', '$\\sqrt{54}>\\sqrt{50}$، إذن $3\\sqrt{6}>5\\sqrt{2}$.', '$\\sqrt{54}>\\sqrt{50}$, so $3\\sqrt{6}>5\\sqrt{2}$.')
    },
    'radical-ops': {
        definitions: [
            {
                term: say('Erradikal antzekoak', 'Radicales semejantes', 'الجذور المتشابهة', 'Like radicals'),
                meaning: say('Indize bera eta errokizun bera dituztenak: $5\\sqrt{3}$ eta $-2\\sqrt{3}$.', 'Los que tienen el mismo índice y el mismo radicando: $5\\sqrt{3}$ y $-2\\sqrt{3}$.', 'الجذور التي لها الدليل نفسه وما تحت الجذر نفسه: $5\\sqrt{3}$ و$-2\\sqrt{3}$.', 'Radicals with the same index and the same radicand: $5\\sqrt{3}$ and $-2\\sqrt{3}$.')
            }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand'),
            say('faktoreak atera', 'sacar factores', 'إخراج العوامل', 'take factors out')
        ],
        explanation: say(
            'Eragin aurretik, atera faktoreak erro bakoitzetik: horrela agertzen dira erradikal antzekoak. Erroak ez dira errokizunak batuz batzen.',
            'Antes de operar, saca factores de cada raíz: así aparecen los radicales semejantes. Las raíces no se suman sumando los radicandos.',
            'قبل إجراء العمليات أخرج العوامل من كل جذر: هكذا تظهر الجذور المتشابهة. ولا تُجمع الجذور بجمع ما تحتها.',
            'Before working, take factors out of each root: that is how like radicals appear. Roots are not added by adding the radicands.'
        ),
        cases: [
            {
                title: say('Batu eta kendu', 'Sumar y restar', 'الجمع والطرح', 'Add and subtract'),
                text: say('Antzekoak bakarrik: koefizienteekin eragiten da.', 'Solo los semejantes: se opera con los coeficientes.', 'المتشابهة فقط: نجري العملية على المعاملات.', 'Only like radicals: work with the coefficients.'),
                math: same('$\\begin{aligned}&\\sqrt{18}+\\sqrt{50}-2\\sqrt{8}\\\\&=3\\sqrt{2}+5\\sqrt{2}-4\\sqrt{2}=4\\sqrt{2}\\end{aligned}$')
            },
            {
                title: say('Biderkatu eta zatitu', 'Multiplicar y dividir', 'الضرب والقسمة', 'Multiply and divide'),
                text: say('Indize berarekin, errokizunak biderkatu edo zatitzen dira.', 'Con el mismo índice, se multiplican o dividen los radicandos.', 'مع الدليل نفسه نضرب ما تحت الجذرين أو نقسمه.', 'With the same index, multiply or divide the radicands.'),
                math: same('$\\sqrt{2}\\cdot\\sqrt{18}=\\sqrt{36}=6$')
            }
        ],
        examplePrompt: say('Kalkulatu $\\sqrt{20}+\\sqrt{45}$ eta $\\sqrt{3}\\cdot\\sqrt{27}$.', 'Calcula $\\sqrt{20}+\\sqrt{45}$ y $\\sqrt{3}\\cdot\\sqrt{27}$.', 'احسب $\\sqrt{20}+\\sqrt{45}$ و$\\sqrt{3}\\cdot\\sqrt{27}$.', 'Work out $\\sqrt{20}+\\sqrt{45}$ and $\\sqrt{3}\\cdot\\sqrt{27}$.'),
        example: same('$2\\sqrt{5}+3\\sqrt{5}=5\\sqrt{5}\\qquad\\sqrt{3}\\cdot\\sqrt{27}=\\sqrt{81}=9$'),
        exampleAnswer: say('$5\\sqrt{5}$ eta 9: lehenengoan faktoreak atera dira, eta bigarrenean errokizunak biderkatu.', '$5\\sqrt{5}$ y 9: en la primera se sacan factores, y en la segunda se multiplican los radicandos.', '$5\\sqrt{5}$ و9: في الأولى أخرجنا العوامل، وفي الثانية ضربنا ما تحت الجذرين.', '$5\\sqrt{5}$ and 9: in the first, factors are taken out; in the second, the radicands are multiplied.')
    },

    /* ---------- 4. The real numbers ---------- */
    irrational: {
        definitions: [
            {
                term: say('Zenbaki irrazionala', 'Número irracional', 'العدد غير النسبي', 'Irrational number'),
                meaning: say('Periodorik gabeko infinitu zifra hamartar dituen zenbakia: ezin da zatiki gisa idatzi.', 'Un número con infinitas cifras decimales sin periodo: no se puede escribir como fracción.', 'عدد له أرقام عشرية لا نهائية بلا دور: لا يمكن كتابته كسرًا.', 'A number with infinitely many decimal digits and no repeating part: it cannot be written as a fraction.')
            },
            {
                term: say('Zenbaki errealak', 'Números reales', 'الأعداد الحقيقية', 'Real numbers'),
                meaning: say('Arrazionalak eta irrazionalak batera; haien multzoa $\\mathbb{R}$ da.', 'Los racionales y los irracionales juntos; su conjunto es $\\mathbb{R}$.', 'الأعداد النسبية وغير النسبية معًا، ومجموعتها $\\mathbb{R}$.', 'The rationals and the irrationals together; their set is $\\mathbb{R}$.')
            }
        ],
        vocabulary: [
            say('zenbaki arrazionala', 'número racional', 'العدد النسبي', 'rational number'),
            say('karratu perfektua', 'cuadrado perfecto', 'مربع كامل', 'perfect square'),
            say('periodikoa', 'periódico', 'دوري', 'recurring')
        ],
        explanation: say(
            'Arrazionalak zatiki gisa idatz daitezke, eta haien hamartarra zehatza edo periodikoa da: $\\frac{3}{4}=0{,}75$, $\\frac{1}{3}=0{,}\\overline{3}$. Irrazionalek periodorik gabeko infinitu zifra dituzte: $\\sqrt{2}=1{,}41421\\ldots$ eta $\\pi=3{,}14159\\ldots$ Karratu perfektuen erroak arrazionalak dira; gainerakoak, irrazionalak.',
            'Los racionales se pueden escribir como fracción y su decimal es exacto o periódico: $\\frac{3}{4}=0{,}75$, $\\frac{1}{3}=0{,}\\overline{3}$. Los irracionales tienen infinitas cifras sin periodo: $\\sqrt{2}=1{,}41421\\ldots$ y $\\pi=3{,}14159\\ldots$ Las raíces de cuadrados perfectos son racionales; las demás, irracionales.',
            'الأعداد النسبية يمكن كتابتها كسرًا، وعشريها منتهٍ أو دوري: $\\frac{3}{4}=0{,}75$ و$\\frac{1}{3}=0{,}\\overline{3}$. أما غير النسبية فلها أرقام لا نهائية بلا دور: $\\sqrt{2}=1{,}41421\\ldots$ و$\\pi=3{,}14159\\ldots$ وجذور المربعات الكاملة نسبية، والبقية غير نسبية.',
            'Rational numbers can be written as a fraction and their decimal is terminating or recurring: $\\frac{3}{4}=0{,}75$, $\\frac{1}{3}=0{,}\\overline{3}$. Irrational numbers have infinitely many digits with no repeating part: $\\sqrt{2}=1{,}41421\\ldots$ and $\\pi=3{,}14159\\ldots$ Roots of perfect squares are rational; the others, irrational.'
        ),
        examplePrompt: say('Arrazionalak ala irrazionalak dira $\\sqrt{64}$, $\\sqrt{20}$ eta $1{,}\\overline{2}$?', '¿Son racionales o irracionales $\\sqrt{64}$, $\\sqrt{20}$ y $1{,}\\overline{2}$?', 'هل $\\sqrt{64}$ و$\\sqrt{20}$ و$1{,}\\overline{2}$ نسبية أم غير نسبية؟', 'Are $\\sqrt{64}$, $\\sqrt{20}$ and $1{,}\\overline{2}$ rational or irrational?'),
        example: same('$\\sqrt{64}=8\\qquad\\sqrt{20}=4{,}472\\ldots\\qquad 1{,}\\overline{2}=\\frac{11}{9}$'),
        exampleAnswer: say('Arrazionalak: $\\sqrt{64}$ eta $1{,}\\overline{2}$. Irrazionala: $\\sqrt{20}$, 20 ez delako karratu perfektua.', 'Racionales: $\\sqrt{64}$ y $1{,}\\overline{2}$. Irracional: $\\sqrt{20}$, porque 20 no es un cuadrado perfecto.', 'نسبيان: $\\sqrt{64}$ و$1{,}\\overline{2}$. وغير نسبي: $\\sqrt{20}$ لأن 20 ليس مربعًا كاملًا.', 'Rational: $\\sqrt{64}$ and $1{,}\\overline{2}$. Irrational: $\\sqrt{20}$, because 20 is not a perfect square.')
    },
    'real-line': {
        vocabulary: [
            say('diagonala', 'diagonal', 'القطر', 'diagonal'),
            say('konpasa', 'compás', 'الفرجار', 'compasses'),
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse')
        ],
        explanation: say(
            'Zenbaki erreal bakoitza zuzeneko puntu bat da. Irrazional bat zehatz kokatzeko, Pitagorasen teorema erabiltzen da: 1 aldeko karratu baten diagonalak $\\sqrt{2}$ neurtzen du, eta konpasak luzera hori zuzenera eramaten du. 1 eta $\\sqrt{2}$ katetoekin, hipotenusak $\\sqrt{3}$ neurtzen du.',
            'Cada número real es un punto de la recta. Un irracional se sitúa con exactitud con el teorema de Pitágoras: la diagonal de un cuadrado de lado 1 mide $\\sqrt{2}$, y el compás lleva esa longitud a la recta. Con catetos 1 y $\\sqrt{2}$, la hipotenusa mide $\\sqrt{3}$.',
            'كل عدد حقيقي نقطة على المستقيم. ونضع العدد غير النسبي بدقة بنظرية فيثاغورس: قطر مربع طول ضلعه 1 يساوي $\\sqrt{2}$، وينقل الفرجار هذا الطول إلى المستقيم. ومع ضلعين قائمين 1 و$\\sqrt{2}$ يساوي الوتر $\\sqrt{3}$.',
            'Each real number is a point on the line. An irrational number is placed exactly with Pythagoras’ theorem: the diagonal of a square with side 1 measures $\\sqrt{2}$, and the compasses carry that length to the line. With legs 1 and $\\sqrt{2}$, the hypotenuse measures $\\sqrt{3}$.'
        ),
        examplePrompt: say('Nola eraikitzen da $\\sqrt{10}$ zuzenean?', '¿Cómo se construye $\\sqrt{10}$ en la recta?', 'كيف نمثّل $\\sqrt{10}$ على المستقيم؟', 'How do you construct $\\sqrt{10}$ on the line?'),
        example: same('$\\sqrt{10}=\\sqrt{3^{2}+1^{2}}\\approx 3{,}16$'),
        exampleAnswer: say('3 eta 1 katetoak dituen triangelu zuzen batekin: haren hipotenusak $\\sqrt{10}$ neurtzen du, eta konpasak zuzenera eramaten du.', 'Con un triángulo rectángulo de catetos 3 y 1: su hipotenusa mide $\\sqrt{10}$, y el compás la lleva a la recta.', 'بمثلث قائم ضلعاه القائمان 3 و1: وتره يساوي $\\sqrt{10}$، وينقله الفرجار إلى المستقيم.', 'With a right triangle with legs 3 and 1: its hypotenuse measures $\\sqrt{10}$, and the compasses carry it to the line.')
    },
    intervals: {
        definitions: [
            {
                term: say('Tartea', 'Intervalo', 'الفترة', 'Interval'),
                meaning: say('Bi zenbakiren, muturren, artean dauden zenbaki errealak.', 'Los números reales que hay entre dos números, sus extremos.', 'الأعداد الحقيقية الواقعة بين عددين هما طرفاها.', 'The real numbers between two numbers, its endpoints.')
            }
        ],
        vocabulary: [
            say('muturrak', 'extremos', 'الطرفان', 'endpoints'),
            say('kakoak', 'corchetes', 'المعقوفان', 'square brackets'),
            say('luzera', 'longitud', 'الطول', 'length')
        ],
        explanation: say(
            'Tarte bat bere muturrekin idazten da, kakoen edo parentesien artean, eta zuzenean marrazten da. Haren luzera $b-a$ da, baina barruan infinitu zenbaki daude.',
            'Un intervalo se escribe con sus extremos entre corchetes o paréntesis, y se dibuja en la recta. Su longitud es $b-a$, pero dentro hay infinitos números.',
            'تُكتب الفترة بطرفيها بين معقوفين أو قوسين، وتُرسم على المستقيم. وطولها $b-a$، لكن في داخلها عدد لا نهائي من الأعداد.',
            'An interval is written with its endpoints in square or round brackets, and drawn on the line. Its length is $b-a$, but there are infinitely many numbers inside.'
        ),
        cases: [
            {
                title: say('Itxia', 'Cerrado', 'مغلقة', 'Closed'),
                text: say('Muturrak sartzen dira: puntu beteak.', 'Los extremos entran: puntos llenos.', 'يدخل الطرفان: نقاط ممتلئة.', 'The endpoints are in: filled dots.'),
                math: same('$[a,b]$')
            },
            {
                title: say('Irekia', 'Abierto', 'مفتوحة', 'Open'),
                text: say('Muturrak ez dira sartzen: puntu hutsak.', 'Los extremos no entran: puntos vacíos.', 'لا يدخل الطرفان: نقاط فارغة.', 'The endpoints are out: empty dots.'),
                math: same('$(a,b)$')
            },
            {
                title: say('Erdi-irekia', 'Semiabierto', 'نصف مفتوحة', 'Half-open'),
                text: say('Mutur bakarra sartzen da.', 'Solo entra un extremo.', 'يدخل طرف واحد فقط.', 'Only one endpoint is in.'),
                math: same('$[2,5)=\\{x\\mid 2\\le x<5\\}$')
            }
        ],
        examplePrompt: say('Idatzi tarte gisa $-4\\le x<6$ betetzen duten zenbakiak, eta kalkulatu haren luzera.', 'Escribe como intervalo los números con $-4\\le x<6$ y calcula su longitud.', 'اكتب على صورة فترة الأعداد التي تحقق $-4\\le x<6$ واحسب طولها.', 'Write the numbers with $-4\\le x<6$ as an interval and work out its length.'),
        example: same('$[-4,\\,6)\\qquad 6-(-4)=10$'),
        exampleAnswer: say('Erdi-irekia: $-4$ sartzen da eta 6 ez. Luzera 10 da.', 'Semiabierto: el $-4$ entra y el 6 no. Su longitud es 10.', 'نصف مفتوحة: يدخل $-4$ ولا يدخل 6. وطولها 10.', 'Half-open: $-4$ is in and 6 is not. Its length is 10.')
    },

    /* ---------- 5. Approximations ---------- */
    rounding: {
        vocabulary: [
            say('zifra', 'cifra', 'رقم', 'digit'),
            say('hamarrenak', 'décimas', 'الأجزاء من عشرة', 'tenths'),
            say('hurbildu', 'aproximar', 'تقريب', 'approximate')
        ],
        explanation: say(
            'Zenbaki infinituak edo oso luzeak hurbildu egiten dira. Kontuz zifren katearekin: $1{,}999$ hamarrenetara biribilduta $2{,}0$ da, eta trunkatuta, $1{,}9$.',
            'Los números infinitos o muy largos se aproximan. Ojo con las cifras que se arrastran: $1{,}999$ redondeado a las décimas es $2{,}0$, y truncado, $1{,}9$.',
            'الأعداد اللانهائية أو الطويلة جدًا تُقرَّب. وانتبه إلى الأرقام التي تتأثر معًا: $1{,}999$ مقرّبًا إلى الأجزاء من عشرة يساوي $2{,}0$، ومبتورًا $1{,}9$.',
            'Infinite or very long numbers are approximated. Watch the digits that carry over: $1{,}999$ rounded to tenths is $2{,}0$, and truncated, $1{,}9$.'
        ),
        cases: [
            {
                title: say('Trunkatu', 'Truncar', 'البتر', 'Truncate'),
                text: say('Soberan dauden zifrak moztu egiten dira, besterik gabe.', 'Se cortan sin más las cifras que sobran.', 'نقطع الأرقام الزائدة فقط.', 'Just cut off the extra digits.'),
                math: same('$6{,}27\\to 6{,}2$')
            },
            {
                title: say('Biribildu', 'Redondear', 'التقريب', 'Round'),
                text: say('Kendutako lehen zifra 5 edo handiagoa bada, 1 gehitzen zaio geratzen den azkenari.', 'Si la primera cifra suprimida es 5 o mayor, se suma 1 a la última que queda.', 'إذا كان أول رقم محذوف 5 أو أكبر نضيف 1 إلى آخر رقم يبقى.', 'If the first digit dropped is 5 or more, add 1 to the last one kept.'),
                math: same('$6{,}27\\to 6{,}3$')
            }
        ],
        examplePrompt: say('Hurbildu $\\frac{2}{3}=0{,}6666\\ldots$ ehunenetara, trunkatuz eta biribilduz.', 'Aproxima $\\frac{2}{3}=0{,}6666\\ldots$ a las centésimas, truncando y redondeando.', 'قرّب $\\frac{2}{3}=0{,}6666\\ldots$ إلى الأجزاء من مئة بالبتر وبالتقريب.', 'Approximate $\\frac{2}{3}=0{,}6666\\ldots$ to hundredths, truncating and rounding.'),
        example: same('$\\frac{2}{3}\\approx 0{,}67$'),
        exampleAnswer: say('Trunkatuta, $0{,}66$; biribilduta, $0{,}67$, kendutako lehen zifra 6 delako.', 'Truncando, $0{,}66$; redondeando, $0{,}67$, porque la primera cifra suprimida es un 6.', 'بالبتر $0{,}66$، وبالتقريب $0{,}67$ لأن أول رقم محذوف هو 6.', 'Truncating, $0{,}66$; rounding, $0{,}67$, because the first digit dropped is a 6.')
    },
    errors: {
        definitions: [
            {
                term: say('Errore absolutua', 'Error absoluto', 'الخطأ المطلق', 'Absolute error'),
                meaning: say('Balio zehatzaren ($V$) eta hurbilketaren ($A$) arteko distantzia: $E_{a}=|V-A|$.', 'La distancia entre el valor exacto $V$ y la aproximación $A$: $E_{a}=|V-A|$.', 'المسافة بين القيمة الدقيقة $V$ والتقريب $A$: $E_{a}=|V-A|$.', 'The distance between the exact value $V$ and the approximation $A$: $E_{a}=|V-A|$.')
            },
            {
                term: say('Errore erlatiboa', 'Error relativo', 'الخطأ النسبي', 'Relative error'),
                meaning: say('Errore absolutua balio zehatzaz zatituta: $E_{r}=\\frac{E_{a}}{V}$.', 'El error absoluto dividido entre el valor exacto: $E_{r}=\\frac{E_{a}}{V}$.', 'الخطأ المطلق مقسومًا على القيمة الدقيقة: $E_{r}=\\frac{E_{a}}{V}$.', 'The absolute error divided by the exact value: $E_{r}=\\frac{E_{a}}{V}$.')
            }
        ],
        vocabulary: [
            say('balio zehatza', 'valor exacto', 'القيمة الدقيقة', 'exact value'),
            say('hurbilketa', 'aproximación', 'التقريب', 'approximation'),
            say('ehunekoa', 'porcentaje', 'نسبة مئوية', 'percentage')
        ],
        explanation: say(
            'Errore erlatiboak esaten du errorea zenbat den neurtzen denaren aldean, eta ehuneko gisa ere eman daiteke. Zati batek $0{,}125$ m neurtzen badu eta $0{,}12$ m hartzen bada, $E_{a}=0{,}005$ m eta $E_{r}=\\frac{0{,}005}{0{,}125}=0{,}04$, hau da, % 4.',
            'El error relativo dice cuánto pesa el error frente a lo que se mide, y se puede dar en porcentaje. Si un trozo mide $0{,}125$ m y se toma $0{,}12$ m, $E_{a}=0{,}005$ m y $E_{r}=\\frac{0{,}005}{0{,}125}=0{,}04$, un 4 %.',
            'يبيّن الخطأ النسبي وزن الخطأ مقارنة بما نقيسه، ويمكن إعطاؤه نسبة مئوية. إذا كان طول قطعة $0{,}125$ م وأخذنا $0{,}12$ م فإن $E_{a}=0{,}005$ م و$E_{r}=\\frac{0{,}005}{0{,}125}=0{,}04$، أي 4٪.',
            'The relative error tells how much the error weighs against what is measured, and it can be given as a percentage. If a piece measures $0{,}125$ m and you take $0{,}12$ m, $E_{a}=0{,}005$ m and $E_{r}=\\frac{0{,}005}{0{,}125}=0{,}04$, that is 4%.'
        ),
        examplePrompt: say('$\\frac{1}{3}$ zatikiaren ordez $0{,}33$ hartzen da. Kalkulatu errore absolutua eta erlatiboa.', 'Se aproxima $\\frac{1}{3}$ por $0{,}33$. Calcula el error absoluto y el relativo.', 'نقرّب $\\frac{1}{3}$ بالعدد $0{,}33$. احسب الخطأ المطلق والنسبي.', '$\\frac{1}{3}$ is approximated by $0{,}33$. Work out the absolute and relative errors.'),
        example: same('$E_{a}=\\frac{1}{3}-0{,}33=\\frac{1}{300}\\qquad E_{r}=\\frac{1}{300}\\div\\frac{1}{3}=0{,}01$'),
        exampleAnswer: say('Errore erlatiboa $0{,}01$ da, hau da, % 1.', 'Un error relativo de $0{,}01$, es decir, del 1 %.', 'خطأ نسبي قدره $0{,}01$، أي 1٪.', 'A relative error of $0{,}01$, that is, 1%.')
    }
}

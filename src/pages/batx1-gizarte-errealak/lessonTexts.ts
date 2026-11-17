import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { GizRealsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zenbaki errealak · Batxilergoa 1 · Gizarte Zientziak — what the five
   lessons of its own tell: definitions, a short explanation, the example
   as an exercise («Another example») and the key words in four languages.
   The other eleven lessons come from 1.º Ciencias with their own texts.
   The example uses numbers of its own, never those of «Let's solve», of
   «Check it» or of the typical mistake. Arabic writes the decimal point.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const gizRealsLessonTexts: Record<GizRealsTopicId, LessonTexts> = {
    'number-kinds': {
        definitions: [
            {
                term: say('Zenbaki arrazionala', 'Número racional', 'العدد النسبي', 'Rational number'),
                meaning: say('Zatiki gisa idatz daitekeena: bere hamartarra zehatza edo periodikoa da.', 'El que se puede escribir como fracción: su decimal es exacto o periódico.', 'العدد الذي يُكتب على صورة كسر: صورته العشرية منتهية أو دورية.', 'One that can be written as a fraction: its decimal ends or recurs.')
            },
            {
                term: say('Zenbaki erreala', 'Número real', 'العدد الحقيقي', 'Real number'),
                meaning: say('Edozein arrazional edo irrazional: zuzeneko puntu bakoitza zenbaki erreal bat da.', 'Cualquier racional o irracional: cada punto de la recta es un número real.', 'أي عدد نسبي أو غير نسبي: كل نقطة على المستقيم عدد حقيقي.', 'Any rational or irrational number: each point of the line is a real number.')
            }
        ],
        vocabulary: [
            say('arrunta', 'natural', 'طبيعي', 'natural'),
            say('osoa', 'entero', 'صحيح', 'integer'),
            say('irrazionala', 'irracional', 'غير نسبي', 'irrational')
        ],
        explanation: say(
            'Zenbaki-multzoak bata bestearen barruan daude: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$; beraz, zenbaki arrunt bat osoa, arrazionala eta erreala ere bada. Sailkatzeko, lehenik sinplifikatu: $\\sqrt{36}=6$ arrunta da. Zatikiak eta hamartar zehatzak edo periodikoak arrazionalak dira; $\\sqrt{7}$ eta $\\pi$, irrazionalak. Eta $\\sqrt{-9}$ ez da erreala: karratura berretuta ez dago zenbaki negatiborik ematen duenik.',
            'Los conjuntos de números van encajados: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$, así que un natural es también entero, racional y real. Para clasificar, simplifica primero: $\\sqrt{36}=6$ es natural. Las fracciones y los decimales exactos o periódicos son racionales; $\\sqrt{7}$ y $\\pi$ son irracionales. Y $\\sqrt{-9}$ no es real: ningún número al cuadrado da negativo.',
            'مجموعات الأعداد متداخلة: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$، فالعدد الطبيعي صحيح ونسبي وحقيقي أيضًا. للتصنيف بسّط أولًا: $\\sqrt{36}=6$ عدد طبيعي. الكسور والأعداد العشرية المنتهية أو الدورية نسبية، أما $\\sqrt{7}$ و$\\pi$ فغير نسبيين. و$\\sqrt{-9}$ ليس حقيقيًا: لا يوجد عدد مربعه سالب.',
            'The sets of numbers fit inside each other: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$, so a natural number is also an integer, rational and real. To classify, simplify first: $\\sqrt{36}=6$ is natural. Fractions and decimals that end or recur are rational; $\\sqrt{7}$ and $\\pi$ are irrational. And $\\sqrt{-9}$ is not real: no number squared is negative.'
        ),
        examplePrompt: say('Zein multzotakoa da zenbaki bakoitza: $-\\frac{12}{4}$, $0{,}75$, $\\sqrt{50}$ eta $\\sqrt{0{,}49}$?', '¿A qué conjuntos pertenece cada número: $-\\frac{12}{4}$, $0{,}75$, $\\sqrt{50}$ y $\\sqrt{0{,}49}$?', 'إلى أيّ المجموعات ينتمي كل عدد: $-\\frac{12}{4}$ و$0{,}75$ و$\\sqrt{50}$ و$\\sqrt{0{,}49}$؟', 'Which sets does each number belong to: $-\\frac{12}{4}$, $0{,}75$, $\\sqrt{50}$ and $\\sqrt{0{,}49}$?'),
        example: same('$\\begin{gathered}-\\frac{12}{4}=-3\\qquad 0{,}75=\\frac{3}{4}\\\\ \\sqrt{0{,}49}=0{,}7\\qquad \\sqrt{50}=5\\sqrt{2}\\end{gathered}$'),
        exampleAnswer: say('$-3$ zenbaki osoa da; $0{,}75$ eta $0{,}7$ arrazionalak; $5\\sqrt{2}$ irrazionala. Lauak errealak dira.', '$-3$ es entero; $0{,}75$ y $0{,}7$ son racionales; $5\\sqrt{2}$ es irracional. Los cuatro son reales.', '$-3$ عدد صحيح، و$0{,}75$ و$0{,}7$ نسبيان، و$5\\sqrt{2}$ غير نسبي. والأربعة حقيقية.', '$-3$ is an integer; $0{,}75$ and $0{,}7$ are rational; $5\\sqrt{2}$ is irrational. All four are real.')
    },
    'set-language': {
        definitions: [
            {
                term: say('Erreferentzia-multzoa', 'Conjunto de referencia', 'المجموعة المرجعية', 'Reference set'),
                meaning: say('Zenbakiak hartzen diren multzoa ($\\mathbb{N}$, $\\mathbb{Z}$ edo $\\mathbb{R}$), barraren aurretik idatzia.', 'El conjunto del que se toman los números ($\\mathbb{N}$, $\\mathbb{Z}$ o $\\mathbb{R}$), escrito antes de la barra.', 'المجموعة التي تؤخذ منها الأعداد ($\\mathbb{N}$ أو $\\mathbb{Z}$ أو $\\mathbb{R}$)، وتُكتب قبل الخط العمودي.', 'The set the numbers are taken from ($\\mathbb{N}$, $\\mathbb{Z}$ or $\\mathbb{R}$), written before the bar.')
            }
        ],
        vocabulary: [
            say('elementua', 'elemento', 'العنصر', 'element'),
            say('tartea', 'intervalo', 'الفترة', 'interval'),
            say('irrazionala', 'irracional', 'غير نسبي', 'irrational')
        ],
        explanation: say(
            'Multzoen hizkuntzak lerro batean esaten du hitzekin esaldi bat behar duena. $\\{x\\in\\mathbb{Z}\\mid x\\ge -4\\}$ irakurtzen da: «$-4$ baino handiagoak edo berdinak diren zenbaki osoak». $\\mid$ barrak «non» esan nahi du. Erreferentzia $\\mathbb{N}$ edo $\\mathbb{Z}$ bada, elementuak zenba daitezke; $\\mathbb{R}$ bada, infinitu zenbakiko tartea da. $\\mathbb{R}-\\mathbb{Q}$ zenbaki irrazionalak dira.',
            'El lenguaje de los conjuntos dice en una línea lo que en palabras ocupa una frase. $\\{x\\in\\mathbb{Z}\\mid x\\ge -4\\}$ se lee «los enteros mayores o iguales que $-4$». La barra $\\mid$ significa «tales que». Si la referencia es $\\mathbb{N}$ o $\\mathbb{Z}$, los elementos se pueden contar; si es $\\mathbb{R}$, es un intervalo con infinitos números. $\\mathbb{R}-\\mathbb{Q}$ son los irracionales.',
            'لغة المجموعات تقول في سطر واحد ما يحتاج إلى جملة بالكلمات. تُقرأ $\\{x\\in\\mathbb{Z}\\mid x\\ge -4\\}$ «الأعداد الصحيحة الأكبر من $-4$ أو المساوية له». والخط $\\mid$ يعني «بحيث». إذا كانت المرجعية $\\mathbb{N}$ أو $\\mathbb{Z}$ أمكن عدّ العناصر، وإذا كانت $\\mathbb{R}$ فهي فترة فيها أعداد لا نهائية. و$\\mathbb{R}-\\mathbb{Q}$ هي الأعداد غير النسبية.',
            'The language of sets says in one line what takes a sentence in words. $\\{x\\in\\mathbb{Z}\\mid x\\ge -4\\}$ reads «the integers greater than or equal to $-4$». The bar $\\mid$ means «such that». If the reference is $\\mathbb{N}$ or $\\mathbb{Z}$, the elements can be counted; if it is $\\mathbb{R}$, it is an interval with infinitely many numbers. $\\mathbb{R}-\\mathbb{Q}$ are the irrational numbers.'
        ),
        examplePrompt: say('Idatzi hitzekin $\\{x\\in\\mathbb{N}\\mid 10\\le x<17\\}$, eta esan zenbat elementu dituen.', 'Escribe con palabras $\\{x\\in\\mathbb{N}\\mid 10\\le x<17\\}$ y di cuántos elementos tiene.', 'اكتب بالكلمات $\\{x\\in\\mathbb{N}\\mid 10\\le x<17\\}$ وقل كم عنصرًا فيها.', 'Write $\\{x\\in\\mathbb{N}\\mid 10\\le x<17\\}$ in words and say how many elements it has.'),
        example: same('$\\{10,11,12,13,14,15,16\\}$'),
        exampleAnswer: say('10 baino handiagoak edo berdinak eta 17 baino txikiagoak diren zenbaki arruntak: zazpi elementu.', 'Los naturales mayores o iguales que 10 y menores que 17: siete elementos.', 'الأعداد الطبيعية الأكبر من 10 أو المساوية له والأصغر من 17: سبعة عناصر.', 'The natural numbers greater than or equal to 10 and less than 17: seven elements.')
    },
    'radical-power': {
        definitions: [
            {
                term: say('Berretzaile zatikia', 'Exponente fraccionario', 'الأس الكسري', 'Fractional exponent'),
                meaning: say('$a^{\\frac{m}{n}}$ berretura: $n$ indizeko erroa, $a^{m}$ zenbakiarena.', 'La potencia $a^{\\frac{m}{n}}$: la raíz de índice $n$ de $a^{m}$.', 'القوة $a^{\\frac{m}{n}}$: الجذر ذو الدليل $n$ للعدد $a^{m}$.', 'The power $a^{\\frac{m}{n}}$: the root with index $n$ of $a^{m}$.')
            }
        ],
        vocabulary: [
            say('indizea', 'índice', 'الدليل', 'index'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('berretura', 'potencia', 'القوة', 'power')
        ],
        explanation: say(
            'Erro bat berretzaile zatikiko berretura bat da: $\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$. Horrela, berreturen arau ezagunak erabil daitezke. Sinplifikatzeko, berretzailea sinplifikatzen da: $\\sqrt[6]{a^{4}}=a^{\\frac{4}{6}}=a^{\\frac{2}{3}}$. Indize desberdineko erroak biderkatzeko, berretzaileak batzen dira, eta emaitza berriro erro gisa idatz daiteke.',
            'Una raíz es una potencia de exponente fraccionario: $\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$. Así se pueden usar las reglas de las potencias que ya conoces. Para simplificar, se simplifica el exponente: $\\sqrt[6]{a^{4}}=a^{\\frac{4}{6}}=a^{\\frac{2}{3}}$. Para multiplicar raíces de distinto índice, se suman los exponentes, y el resultado se vuelve a escribir como raíz.',
            'الجذر قوة ذات أس كسري: $\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$. وبذلك نستعمل قواعد القوى التي نعرفها. للتبسيط نبسّط الأس: $\\sqrt[6]{a^{4}}=a^{\\frac{4}{6}}=a^{\\frac{2}{3}}$. ولضرب جذور مختلفة الدليل نجمع الأسس، ثم نكتب النتيجة جذرًا من جديد.',
            'A root is a power with a fractional exponent: $\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$. That way you can use the rules of powers you already know. To simplify, simplify the exponent: $\\sqrt[6]{a^{4}}=a^{\\frac{4}{6}}=a^{\\frac{2}{3}}$. To multiply roots with different indexes, add the exponents, and write the result as a root again.'
        ),
        examplePrompt: say('Sinplifikatu $\\sqrt[10]{y^{6}}$, berretura gisa idatzita.', 'Simplifica $\\sqrt[10]{y^{6}}$ pasándolo a potencia.', 'بسّط $\\sqrt[10]{y^{6}}$ بكتابته على صورة قوة.', 'Simplify $\\sqrt[10]{y^{6}}$ by writing it as a power.'),
        example: same('$\\sqrt[10]{y^{6}}=y^{\\frac{6}{10}}=y^{\\frac{3}{5}}=\\sqrt[5]{y^{3}}$'),
        exampleAnswer: say('$\\sqrt[5]{y^{3}}$, $\\frac{6}{10}=\\frac{3}{5}$ delako.', '$\\sqrt[5]{y^{3}}$, porque $\\frac{6}{10}=\\frac{3}{5}$.', '$\\sqrt[5]{y^{3}}$، لأن $\\frac{6}{10}=\\frac{3}{5}$.', '$\\sqrt[5]{y^{3}}$, because $\\frac{6}{10}=\\frac{3}{5}$.')
    },
    'log-integer': {
        definitions: [
            {
                term: say('Zati osoa', 'Parte entera', 'الجزء الصحيح', 'Whole-number part'),
                meaning: say('Zenbakia gainditzen ez duen zenbaki oso handiena: $4{,}7$ zenbakiarena 4 da, eta $-1{,}3$ zenbakiarena, $-2$.', 'El mayor entero que no supera al número: la de $4{,}7$ es 4 y la de $-1{,}3$, $-2$.', 'أكبر عدد صحيح لا يتجاوز العدد: الجزء الصحيح من $4{,}7$ هو 4، ومن $-1{,}3$ هو $-2$.', 'The greatest integer that is not above the number: for $4{,}7$ it is 4, and for $-1{,}3$, $-2$.')
            }
        ],
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('zifra', 'cifra', 'الأرقام', 'digit'),
            say('kalkulagailua', 'calculadora', 'الآلة الحاسبة', 'calculator')
        ],
        explanation: say(
            'Kalkulagailurik gabe jakin daiteke logaritmo bat zein bi zenbaki osoren artean dagoen: nahikoa da zenbakia inguratzen duten oinarriaren berreturak bilatzea. $10^{5}\\le 345\\,000<10^{6}$ denez, $\\log 345\\,000=5{,}5\\ldots$: haren zati osoa, 5, zifra kopurua ken bat da. Balio zehatza, kalkulagailuarekin eta oinarri-aldaketarekin: $\\log_a N=\\frac{\\log N}{\\log a}$.',
            'Sin calculadora se sabe entre qué dos enteros está un logaritmo: basta buscar las potencias de la base que rodean al número. Como $10^{5}\\le 345\\,000<10^{6}$, $\\log 345\\,000=5{,}5\\ldots$: su parte entera, 5, es el número de cifras menos uno. El valor exacto, con la calculadora y el cambio de base: $\\log_a N=\\frac{\\log N}{\\log a}$.',
            'من دون آلة حاسبة نعرف بين أيّ عددين صحيحين يقع اللوغاريتم: يكفي أن نبحث عن قوى الأساس التي تحيط بالعدد. بما أن $10^{5}\\le 345\\,000<10^{6}$ فإن $\\log 345\\,000=5{,}5\\ldots$: وجزؤه الصحيح 5 هو عدد الأرقام ناقص واحد. والقيمة الدقيقة بالآلة الحاسبة وتغيير الأساس: $\\log_a N=\\frac{\\log N}{\\log a}$.',
            'Without a calculator you can tell which two integers a logarithm lies between: just find the powers of the base around the number. As $10^{5}\\le 345\\,000<10^{6}$, $\\log 345\\,000=5{,}5\\ldots$: its whole-number part, 5, is the number of digits minus one. The exact value comes from the calculator and the change of base: $\\log_a N=\\frac{\\log N}{\\log a}$.'
        ),
        examplePrompt: say('Zein bi zenbaki osoren artean dago $\\log 0{,}003$? Eta $\\log_5 700$?', '¿Entre qué dos enteros está $\\log 0{,}003$? ¿Y $\\log_5 700$?', 'بين أيّ عددين صحيحين يقع $\\log 0{,}003$؟ و$\\log_5 700$؟', 'Which two integers is $\\log 0{,}003$ between? And $\\log_5 700$?'),
        example: same('$\\begin{gathered}10^{-3}<0{,}003<10^{-2}\\\\ 5^{4}=625<700<3125=5^{5}\\end{gathered}$'),
        exampleAnswer: say('$\\log 0{,}003$ zenbakia $-3$ eta $-2$ artean dago; $\\log_5 700$, 4 eta 5 artean.', '$\\log 0{,}003$ está entre $-3$ y $-2$; $\\log_5 700$, entre 4 y 5.', '$\\log 0{,}003$ بين $-3$ و$-2$، و$\\log_5 700$ بين 4 و5.', '$\\log 0{,}003$ is between $-3$ and $-2$; $\\log_5 700$, between 4 and 5.'),
        why: {
            text: say(
                'Zergatik da zati osoa zifra kopurua ken bat? Sei zifrako zenbaki bat $10^{5}$ zenbakiaren, sei zifrako lehenengoaren, eta $10^{6}$ zenbakiaren, zazpi zifrako lehenengoaren, artean dago. Beraz, haren logaritmoa 5 eta 6 artean dago.',
                '¿Por qué la parte entera es el número de cifras menos uno? Un número de seis cifras está entre $10^{5}$, el primero de seis cifras, y $10^{6}$, el primero de siete. Así que su logaritmo está entre 5 y 6.',
                'لماذا الجزء الصحيح هو عدد الأرقام ناقص واحد؟ العدد ذو الستة أرقام يقع بين $10^{5}$، أول عدد من ستة أرقام، و$10^{6}$، أول عدد من سبعة أرقام. إذن لوغاريتمه بين 5 و6.',
                'Why is the whole-number part the number of digits minus one? A six-digit number lies between $10^{5}$, the first one with six digits, and $10^{6}$, the first with seven. So its logarithm is between 5 and 6.'
            )
        }
    },
    'big-numbers': {
        definitions: [
            {
                term: say('Mantisa', 'Mantisa', 'الجزء العشري', 'Mantissa'),
                meaning: say('$a$ zenbakia, $a\\cdot 10^{n}$ idazkeran, $1\\le a<10$ izanik.', 'El número $a$ de $a\\cdot 10^{n}$, con $1\\le a<10$.', 'العدد $a$ في $a\\cdot 10^{n}$، حيث $1\\le a<10$.', 'The number $a$ in $a\\cdot 10^{n}$, with $1\\le a<10$.')
            }
        ],
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('koma', 'coma', 'الفاصلة', 'decimal point'),
            say('aurrekontua', 'presupuesto', 'الميزانية', 'budget')
        ],
        explanation: say(
            'Ekonomiako zifrak izugarri handiak edo txikiak dira: $25\\,000\\,000\\,000$ euroko aurrekontua $2{,}5\\cdot 10^{10}$ idazten da. Lehen zatia, mantisa, 1 eta 10 artean dago; berretzaileak koma zenbat leku mugitu den esaten du. Konparatzeko, lehenik berretzailea: $9\\cdot 10^{7}<1{,}2\\cdot 10^{8}$. Koma ezkerrera badoa, berretzailea igo egiten da.',
            'Las cifras de la economía son enormes o diminutas: un presupuesto de $25\\,000\\,000\\,000$ euros se escribe $2{,}5\\cdot 10^{10}$. La primera parte, la mantisa, va de 1 a 10; el exponente dice cuántos lugares se ha movido la coma. Para comparar, primero el exponente: $9\\cdot 10^{7}<1{,}2\\cdot 10^{8}$. Si la coma va a la izquierda, el exponente sube.',
            'أرقام الاقتصاد ضخمة جدًا أو صغيرة جدًا: ميزانية قدرها $25\\,000\\,000\\,000$ يورو تُكتب $2{,}5\\cdot 10^{10}$. الجزء الأول، أي الجزء العشري، بين 1 و10، والأس يقول كم منزلة تحركت الفاصلة. للمقارنة ننظر إلى الأس أولًا: $9\\cdot 10^{7}<1{,}2\\cdot 10^{8}$. وإذا تحركت الفاصلة إلى اليسار زاد الأس.',
            'Figures in economics are huge or tiny: a budget of $25\\,000\\,000\\,000$ euros is written $2{,}5\\cdot 10^{10}$. The first part, the mantissa, goes from 1 to 10; the exponent says how many places the decimal point has moved. To compare, look at the exponent first: $9\\cdot 10^{7}<1{,}2\\cdot 10^{8}$. If the decimal point moves to the left, the exponent goes up.'
        ),
        examplePrompt: say('Ordenatu txikienetik handienera: $47\\cdot 10^{8}$, $3{,}9\\cdot 10^{9}$ eta $0{,}6\\cdot 10^{10}$.', 'Ordena de menor a mayor: $47\\cdot 10^{8}$, $3{,}9\\cdot 10^{9}$ y $0{,}6\\cdot 10^{10}$.', 'رتّب من الأصغر إلى الأكبر: $47\\cdot 10^{8}$ و$3{,}9\\cdot 10^{9}$ و$0{,}6\\cdot 10^{10}$.', 'Order from smallest to largest: $47\\cdot 10^{8}$, $3{,}9\\cdot 10^{9}$ and $0{,}6\\cdot 10^{10}$.'),
        example: same('$\\begin{gathered}47\\cdot 10^{8}=4{,}7\\cdot 10^{9}\\qquad 0{,}6\\cdot 10^{10}=6\\cdot 10^{9}\\\\ 3{,}9\\cdot 10^{9}<4{,}7\\cdot 10^{9}<6\\cdot 10^{9}\\end{gathered}$'),
        exampleAnswer: say('$3{,}9\\cdot 10^{9}<47\\cdot 10^{8}<0{,}6\\cdot 10^{10}$: berretzaile berarekin idatzita, mantisak konparatzen dira.', '$3{,}9\\cdot 10^{9}<47\\cdot 10^{8}<0{,}6\\cdot 10^{10}$: escritos con el mismo exponente, se comparan las mantisas.', '$3{,}9\\cdot 10^{9}<47\\cdot 10^{8}<0{,}6\\cdot 10^{10}$: بعد كتابتها بالأس نفسه نقارن الأجزاء العشرية.', '$3{,}9\\cdot 10^{9}<47\\cdot 10^{8}<0{,}6\\cdot 10^{10}$: written with the same exponent, compare the mantissas.')
    }
}

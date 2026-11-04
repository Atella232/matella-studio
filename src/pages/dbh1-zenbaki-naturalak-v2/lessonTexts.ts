import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { NaturalsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zenbaki naturalak · 1. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, the example as an exercise («Another example», or «Example»
   in the lessons of facts) and, in a few lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. Large numbers go inside $…$ (15\,728), so they read well in
   Arabic too. Rounding a whole number is written with an arrow
   (38\,592 → 38\,600). The example uses numbers of its own, never those of
   «Let's solve», of «Check it» or of the typical mistake.
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const naturalsLessonTexts: Record<NaturalsTopicId, LessonTexts> = {
    /* ---------- 1. The decimal system ---------- */
    'place-value': {
        vocabulary: [
            say('unitateak', 'unidades', 'الآحاد', 'units'),
            say('hamarrekoak', 'decenas', 'العشرات', 'tens'),
            say('ehunekoak', 'centenas', 'المئات', 'hundreds'),
            say('zifra', 'cifra', 'الرقم', 'digit')
        ],
        definitions: [
            {
                term: say('Sistema posizionala', 'Sistema posicional', 'النظام الموضعي', 'Place-value system'),
                meaning: say('Zifra baten balioa zenbakian duen tokiaren araberakoa da.', 'El valor de una cifra depende del lugar que ocupa en el número.', 'قيمة الرقم تتعلق بالمنزلة التي يشغلها في العدد.', 'The value of a digit depends on the place it takes in the number.')
            }
        ],
        explanation: say(
            'Zenbaki naturalak (0, 1, 2, 3…) zenbatzeko erabiltzen dira. Gure sistema hamartarra da: ordena bateko 10 unitatek hurrengo ordenako 1 osatzen dute. Eta posizionala da: $8\\,706\\,265$ zenbakian, 7 zifrak $700\\,000$ balio du, ehun milakoen tokian dagoelako.',
            'Los números naturales (0, 1, 2, 3…) sirven para contar. Nuestro sistema es decimal: 10 unidades de un orden forman 1 del orden siguiente. Y es posicional: en $8\\,706\\,265$, el 7 vale $700\\,000$, porque está en las centenas de millar.',
            'الأعداد الطبيعية (0، 1، 2، 3…) تُستعمل للعدّ. نظامنا عشري: 10 وحدات من منزلة تكوّن 1 من المنزلة التالية. وهو موضعي: في $8\\,706\\,265$ قيمة الرقم 7 هي $700\\,000$، لأنه في منزلة مئات الآلاف.',
            'Natural numbers (0, 1, 2, 3…) are used for counting. Our system is decimal: 10 units of one place make 1 of the next place. And it is positional: in $8\\,706\\,265$, the 7 is worth $700\\,000$, because it is in the hundred thousands place.'
        ),
        examplePrompt: say('Deskonposatu $60\\,409$ zenbakia, zifra bakoitzaren balioaren arabera.', 'Descompón $60\\,409$ según el valor de sus cifras.', 'فكّك العدد $60\\,409$ حسب قيم أرقامه.', 'Write $60\\,409$ as the sum of the values of its digits.'),
        example: same('$60\\,409=60\\,000+400+9$'),
        exampleAnswer: say('Zeroek ez dute ezer batzen, baina tokia gordetzen dute: haiek gabe, 6 zifrak ez luke $60\\,000$ balioko.', 'Los ceros no suman nada, pero guardan el sitio: sin ellos, el 6 no valdría $60\\,000$.', 'الأصفار لا تضيف شيئًا لكنها تحفظ المنازل: من دونها لا تكون قيمة الرقم 6 هي $60\\,000$.', 'The zeros add nothing, but they keep the places: without them, the 6 would not be worth $60\\,000$.')
    },
    'big-numbers': {
        vocabulary: [
            say('milioia', 'millón', 'مليون', 'million'),
            say('bilioia', 'billón', 'تريليون', 'trillion'),
            say('taldea', 'grupo', 'مجموعة', 'group')
        ],
        explanation: say(
            'Zenbaki handi bat irakurtzeko, banatu zifrak hiruko taldetan, eskuinetik hasita: unitateak, milakoak, milioiak… Gero irakurri talde bakoitza bere izenarekin. Horrela, $15\\,350\\,000\\,000$ «hamabost mila hirurehun eta berrogeita hamar milioi» irakurtzen da.',
            'Para leer un número grande, separa sus cifras en grupos de tres desde la derecha: unidades, millares, millones… y lee cada grupo con su nombre. Así, $15\\,350\\,000\\,000$ se lee «quince mil trescientos cincuenta millones».',
            'لقراءة عدد كبير قسّم أرقامه إلى مجموعات من ثلاثة بدءًا من اليمين: آحاد، آلاف، ملايين… ثم اقرأ كل مجموعة باسمها. وهكذا يُقرأ $15\\,350\\,000\\,000$ «خمسة عشر مليارًا وثلاثمائة وخمسون مليونًا».',
            'To read a large number, split its digits into groups of three from the right: units, thousands, millions… and read each group with its name. So $15\\,350\\,000\\,000$ is read «fifteen billion three hundred and fifty million».'
        ),
        examplePrompt: say('Idatzi zifrekin: «lau mila eta seiehun milioi».', 'Escribe con cifras: «cuatro mil seiscientos millones».', 'اكتب بالأرقام: «أربعة مليارات وستمائة مليون».', 'Write in digits: «four billion six hundred million».'),
        example: same('$4\\,600\\,000\\,000$'),
        exampleAnswer: say('Seiehun milioiak milioien taldean doaz, eta lau zifra mila milioien taldean.', 'Los seiscientos millones van en el grupo de los millones, y el cuatro, en el de los miles de millones.', 'الستمائة مليون في مجموعة الملايين، والأربعة في مجموعة المليارات.', 'The six hundred million go in the millions group, and the four in the billions group.')
    },
    order: {
        vocabulary: [
            say('zuzen zenbakiduna', 'recta numérica', 'المستقيم العددي', 'number line'),
            say('handiagoa', 'mayor', 'أكبر', 'bigger'),
            say('saltoa', 'salto', 'قفزة', 'jump')
        ],
        definitions: [
            {
                term: say('$>$ eta $<$ ikurrak', 'Los signos $>$ y $<$', 'الرمزان $>$ و$<$', 'The signs $>$ and $<$'),
                meaning: say('$a>b$: «$a$ handiagoa da $b$ baino». $a<b$: «$a$ txikiagoa da $b$ baino». Irekiera handienari begira dago.', '$a>b$: «$a$ es mayor que $b$». $a<b$: «$a$ es menor que $b$». La abertura mira al mayor.', '$a>b$: «$a$ أكبر من $b$». $a<b$: «$a$ أصغر من $b$». الفتحة نحو العدد الأكبر.', '$a>b$: «$a$ is bigger than $b$». $a<b$: «$a$ is smaller than $b$». The open side faces the bigger one.')
            }
        ],
        explanation: say(
            'Bi zenbaki konparatzeko, begiratu lehenik zenbat zifra dituzten: gehiago dituena handiagoa da. Zifra kopuru bera badute, konparatu ezkerretik eskuinera, lehen zifra desberdina aurkitu arte. Zuzenean, handiena eskuinerago dago.',
            'Para comparar dos números, mira primero cuántas cifras tienen: el que tiene más es mayor. Si tienen las mismas, compara de izquierda a derecha hasta la primera cifra distinta. En la recta, el mayor está más a la derecha.',
            'لمقارنة عددين انظر أولًا إلى عدد أرقامهما: الذي أرقامه أكثر هو الأكبر. وإذا تساوى عدد الأرقام فقارن من اليسار إلى اليمين حتى أول رقم مختلف. وعلى المستقيم يكون الأكبر إلى اليمين أكثر.',
            'To compare two numbers, first look at how many digits they have: the one with more digits is bigger. If they have the same number, compare from left to right until the first different digit. On the line, the bigger one is further to the right.'
        ),
        examplePrompt: say('Ordenatu txikienetik handienera: $40\\,312$, $9875$, $40\\,231$, $41\\,002$.', 'Ordena de menor a mayor: $40\\,312$, $9875$, $40\\,231$, $41\\,002$.', 'رتّب من الأصغر إلى الأكبر: $40\\,312$، $9875$، $40\\,231$، $41\\,002$.', 'Order from smallest to biggest: $40\\,312$, $9875$, $40\\,231$, $41\\,002$.'),
        example: same('$9875<40\\,231<40\\,312<41\\,002$'),
        exampleAnswer: say('$9875$ da txikiena: zifra bat gutxiago du. Besteetan, ezkerreko lehen zifra desberdinak erabakitzen du.', '$9875$ es el menor: tiene una cifra menos. En los demás, decide la primera cifra distinta por la izquierda.', '$9875$ هو الأصغر: فيه رقم أقل. وفي الأعداد الأخرى يحسم أول رقم مختلف من اليسار.', '$9875$ is the smallest: it has one digit fewer. For the others, the first different digit from the left decides.')
    },
    roman: {
        vocabulary: [
            say('ikurra', 'símbolo', 'الرمز', 'symbol'),
            say('batu', 'sumar', 'الجمع', 'add'),
            say('kendu', 'restar', 'الطرح', 'subtract')
        ],
        definitions: [
            {
                term: say('Sistema batukorra', 'Sistema aditivo', 'النظام الجمعي', 'Additive system'),
                meaning: say('Ikur bakoitzak beti balio bera du, dagoen tokian dagoela, eta zenbakia haren balioak batuz (edo kenduz) lortzen da.', 'Cada símbolo vale siempre lo mismo, esté donde esté, y el número se obtiene sumando (o restando) sus valores.', 'لكل رمز القيمة نفسها دائمًا أينما كان، والعدد مجموع قيم رموزه (أو فرقها).', 'Each symbol is always worth the same, wherever it is, and the number is the sum (or difference) of their values.')
            }
        ],
        explanation: say(
            'Erromatarren sistema batukorra da. Zazpi ikur erabiltzen ditu (I, V, X, L, C, D eta M), eta haien balioak batu edo kendu egiten dira. Gure sisteman, aldiz, zifra batek balio desberdina du posizioaren arabera.',
            'El sistema romano es aditivo. Usa siete símbolos (I, V, X, L, C, D y M) y sus valores se suman o se restan. En el nuestro, en cambio, una cifra vale distinto según su posición.',
            'النظام الروماني نظام جمعي. يستعمل سبعة رموز (I وV وX وL وC وD وM)، ونجمع قيمها أو نطرحها. أما في نظامنا فتتغير قيمة الرقم حسب موقعه.',
            'The Roman system is additive. It uses seven symbols (I, V, X, L, C, D and M) and their values are added or subtracted. In ours, on the other hand, a digit is worth something different depending on its position.'
        ),
        examplePrompt: say('Idatzi $1494$ urtea erromatar zenbakiekin.', 'Escribe el año $1494$ en números romanos.', 'اكتب السنة $1494$ بالأرقام الرومانية.', 'Write the year $1494$ in Roman numerals.'),
        example: same('$\\begin{aligned}&\\mathrm{MCDXCIV}\\\\&=1000+400+90+4\\\\&=1494\\end{aligned}$'),
        exampleAnswer: say('CD da $500-100$, XC da $100-10$ eta IV da $5-1$: hiru kenketa.', 'CD es $500-100$, XC es $100-10$ e IV es $5-1$: tres restas.', 'CD تعني $500-100$، وXC تعني $100-10$، وIV تعني $5-1$: ثلاث عمليات طرح.', 'CD is $500-100$, XC is $100-10$ and IV is $5-1$: three subtractions.')
    },

    /* ---------- 2. Rounding and estimation ---------- */
    rounding: {
        vocabulary: [
            say('zifra', 'cifra', 'الرقم', 'digit'),
            say('zeroak', 'ceros', 'الأصفار', 'zeros'),
            say('milakoak', 'millares', 'الآلاف', 'thousands')
        ],
        definitions: [
            {
                term: say('Biribildu', 'Redondear', 'التقريب', 'Round'),
                meaning: say('Zenbaki bat ordena bateko zenbaki «biribil» hurbilenarekin ordeztea: hamarrekoak, ehunekoak, milakoak…', 'Cambiar un número por el número «redondo» más cercano de un orden: decenas, centenas, millares…', 'استبدال العدد بأقرب عدد «مدوَّر» من منزلة ما: العشرات أو المئات أو الآلاف…', 'Replacing a number with the nearest «round» number of a place: tens, hundreds, thousands…')
            }
        ],
        explanation: say(
            'Biribiltzeko, begiratu biribildu nahi duzun zifraren ondoan, eskuinean, dagoen zifrari. Haren arabera bi kasu daude, eta gero eskuineko zifra guztiak zero bihurtzen dira:',
            'Para redondear, mira la cifra que está justo a la derecha de la que vas a redondear. Según esa cifra hay dos casos, y después todas las cifras de la derecha pasan a ser ceros:',
            'للتقريب انظر إلى الرقم الذي يقع مباشرة على يمين الرقم الذي تريد تقريبه. وحسب هذا الرقم توجد حالتان، ثم تتحول كل الأرقام التي على اليمين إلى أصفار:',
            'To round, look at the digit right next to the one you are rounding, on its right. Depending on that digit there are two cases, and then every digit on the right becomes a zero:'
        ),
        cases: [
            { title: say('5 eta 9 artean: gora', 'De 5 a 9: hacia arriba', 'من 5 إلى 9: نرفع', 'From 5 to 9: round up'), text: say('Biribiltzen duzun zifrari 1 gehitzen zaio.', 'La cifra que redondeas sube 1.', 'نضيف 1 إلى الرقم الذي نقرّبه.', 'The digit you are rounding goes up by 1.'), math: same('$3670\\to 3700$') },
            { title: say('0 eta 4 artean: berdin', 'De 0 a 4: se queda igual', 'من 0 إلى 4: يبقى كما هو', 'From 0 to 4: it stays the same'), text: say('Biribiltzen duzun zifra ez da aldatzen.', 'La cifra que redondeas no cambia.', 'الرقم الذي نقرّبه لا يتغير.', 'The digit you are rounding does not change.'), math: same('$3640\\to 3600$') }
        ],
        examplePrompt: say('Biribildu $38\\,592$ ehunekoetara eta milakoetara.', 'Redondea $38\\,592$ a las centenas y a los millares.', 'قرّب $38\\,592$ إلى المئات وإلى الآلاف.', 'Round $38\\,592$ to the nearest hundred and to the nearest thousand.'),
        example: same('$\\begin{gathered}38\\,592\\to 38\\,600\\\\38\\,592\\to 39\\,000\\end{gathered}$'),
        exampleAnswer: say('Ehunekoetara: eskuineko 9 zifrak 5 zifra igotzen du. Milakoetara: 5 zifrak 8 zifra igotzen du.', 'A las centenas: el 9 de la derecha hace subir el 5. A los millares: el 5 hace subir el 8.', 'إلى المئات: الرقم 9 على اليمين يرفع الرقم 5. وإلى الآلاف: الرقم 5 يرفع الرقم 8.', 'To the nearest hundred: the 9 on the right makes the 5 go up. To the nearest thousand: the 5 makes the 8 go up.'),
        why: {
            text: say(
                '$14\\,823$ milakoetara biribiltzean, aukerak $14\\,000$ eta $15\\,000$ dira, eta erdiko puntua $14\\,500$ da. Ehunekoetako zifra 5 edo handiagoa bada, erdia gainditu duzu (edo erdian zaude), eta $15\\,000$ zenbakitik hurbilago zaude: horregatik igotzen da.',
                'Al redondear $14\\,823$ a los millares, los candidatos son $14\\,000$ y $15\\,000$, y el punto medio es $14\\,500$. Si la cifra de las centenas es 5 o más, has llegado a la mitad o la has pasado, y estás más cerca de $15\\,000$: por eso se sube.',
                'عند تقريب $14\\,823$ إلى الآلاف يكون الخياران $14\\,000$ و$15\\,000$، ونقطة المنتصف $14\\,500$. إذا كان رقم المئات 5 أو أكثر فقد بلغت المنتصف أو تجاوزته، وصرت أقرب إلى $15\\,000$: لذلك نرفع.',
                'When rounding $14\\,823$ to the nearest thousand, the choices are $14\\,000$ and $15\\,000$, and the halfway point is $14\\,500$. If the hundreds digit is 5 or more, you have reached or passed halfway, so you are closer to $15\\,000$: that is why you round up.'
            ),
            math: same('$14\\,500<14\\,823<15\\,000$')
        }
    },
    estimation: {
        vocabulary: [
            say('biribildu', 'redondear', 'قرّب', 'round'),
            say('buruz', 'de cabeza', 'ذهنيًا', 'in your head'),
            say('zentzuzkoa', 'razonable', 'معقولة', 'reasonable')
        ],
        definitions: [
            {
                term: say('Estimatu', 'Estimar', 'التقدير', 'Estimate'),
                meaning: say('Emaitza gutxi gorabeherako bat buruz kalkulatzea, zenbakiak biribilduta.', 'Calcular de cabeza un resultado aproximado, con los números redondeados.', 'حساب نتيجة تقريبية ذهنيًا بعد تقريب الأعداد.', 'Working out an approximate result in your head, with the numbers rounded.')
            }
        ],
        explanation: say(
            'Estimazio batek bi gauzatarako balio du: erantzun azkar bat emateko, zehaztasun handirik behar ez denean, eta kalkulu zehatz baten emaitza zentzuzkoa den egiaztatzeko.',
            'Una estimación sirve para dos cosas: dar una respuesta rápida cuando no hace falta mucha precisión y comprobar si el resultado de un cálculo exacto es razonable.',
            'للتقدير فائدتان: إعطاء جواب سريع حين لا نحتاج إلى دقة كبيرة، والتحقق من أن نتيجة الحساب الدقيق معقولة.',
            'An estimate is useful for two things: giving a quick answer when you do not need much precision, and checking whether the result of an exact calculation is reasonable.'
        ),
        examplePrompt: say('Liburu batek 19 euro balio du, eta klaserako 28 erosi behar dira. Gutxi gorabehera, zenbat ordainduko da?', 'Un libro cuesta 19 € y hay que comprar 28 para la clase. ¿Cuánto se pagará, más o menos?', 'ثمن الكتاب 19 يورو، ونحتاج إلى شراء 28 كتابًا للصف. كم سندفع تقريبًا؟', 'A book costs €19 and the class needs 28 of them. Roughly how much will it cost?'),
        example: same('$\\begin{gathered}19\\to 20\\qquad 28\\to 30\\\\20\\cdot 30=600\\end{gathered}$'),
        exampleAnswer: say('600 euro inguru. Kalkulu zehatza, $19\\cdot 28=532$, gertu dago: zentzuzkoa da.', 'Unos 600 €. El cálculo exacto, $19\\cdot 28=532$, está cerca: es razonable.', 'حوالي 600 يورو. والحساب الدقيق، $19\\cdot 28=532$، قريب منه: النتيجة معقولة.', 'About €600. The exact calculation, $19\\cdot 28=532$, is close: it is reasonable.')
    },

    /* ---------- 3. Basic operations ---------- */
    'add-subtract': {
        vocabulary: [
            say('egiaztatu', 'comprobar', 'التحقق', 'check'),
            say('alderantzizkoak', 'inversas', 'عكسيتان', 'inverse'),
            say('trukatze-propietatea', 'propiedad conmutativa', 'خاصية التبديل', 'commutative property')
        ],
        definitions: [
            {
                term: say('Batugaiak eta batura', 'Sumandos y suma', 'الحدود والمجموع', 'Addends and sum'),
                meaning: say('Batugaiak batzen diren zenbakiak dira; emaitza batura edo guztizkoa da.', 'Los sumandos son los números que se suman; el resultado es la suma o total.', 'الحدود هي الأعداد التي نجمعها؛ والنتيجة هي المجموع.', 'The addends are the numbers you add; the result is the sum or total.')
            },
            {
                term: say('Kenkizuna, kentzailea, kendura', 'Minuendo, sustraendo, diferencia', 'المطروح منه، المطروح، الفرق', 'Minuend, subtrahend, difference'),
                meaning: say('$a-b=c$ kenketan, $a$ kenkizuna da, $b$ kentzailea eta $c$ kendura.', 'En $a-b=c$, $a$ es el minuendo, $b$ el sustraendo y $c$ la diferencia.', 'في $a-b=c$: $a$ المطروح منه، و$b$ المطروح، و$c$ الفرق.', 'In $a-b=c$, $a$ is the minuend, $b$ the subtrahend and $c$ the difference.')
            }
        ],
        explanation: say(
            'Batuketa eta kenketa alderantzizko eragiketak dira: batak besteak egiten duena desegiten du. Horregatik, kenketa bat egiaztatzeko, batu kentzailea eta kendura: kenkizuna atera behar da.',
            'La suma y la resta son operaciones inversas: una deshace lo que hace la otra. Por eso, para comprobar una resta, suma el sustraendo y la diferencia: tiene que salir el minuendo.',
            'الجمع والطرح عمليتان عكسيتان: كل واحدة تُبطل ما تفعله الأخرى. لذلك للتحقق من الطرح اجمع المطروح والفرق: يجب أن تحصل على المطروح منه.',
            'Addition and subtraction are inverse operations: one undoes what the other does. That is why, to check a subtraction, you add the subtrahend and the difference: you must get the minuend.'
        ),
        examplePrompt: say('Kalkulatu $7203-2856$, eta egiaztatu batuketa batekin.', 'Calcula $7203-2856$ y compruébalo con una suma.', 'احسب $7203-2856$ وتحقّق من النتيجة بعملية جمع.', 'Work out $7203-2856$ and check it with an addition.'),
        example: same('$\\begin{gathered}7203-2856=4347\\\\2856+4347=7203\\end{gathered}$'),
        exampleAnswer: say('Kendura $4347$ da: kentzaileari batuta, kenkizuna ematen du.', 'La diferencia es $4347$: sumada al sustraendo, da el minuendo.', 'الفرق $4347$: إذا جمعناه مع المطروح نحصل على المطروح منه.', 'The difference is $4347$: added to the subtrahend, it gives the minuend.')
    },
    multiply: {
        vocabulary: [
            say('trukatze-propietatea', 'propiedad conmutativa', 'خاصية التبديل', 'commutative property'),
            say('elkartze-propietatea', 'propiedad asociativa', 'خاصية التجميع', 'associative property'),
            say('banatze-propietatea', 'propiedad distributiva', 'خاصية التوزيع', 'distributive property')
        ],
        definitions: [
            {
                term: say('Biderkagaiak eta biderkadura', 'Factores y producto', 'العوامل وحاصل الضرب', 'Factors and product'),
                meaning: say('Biderkatzen diren zenbakiak biderkagaiak dira; emaitza biderkadura da.', 'Los números que se multiplican son los factores; el resultado es el producto.', 'الأعداد التي نضربها هي العوامل، والنتيجة هي حاصل الضرب.', 'The numbers you multiply are the factors; the result is the product.')
            }
        ],
        explanation: say(
            'Biderkatzea zenbaki bat hainbat aldiz batzea da: $4\\cdot 5=4+4+4+4+4$. Hiru propietatek laguntzen dute buruz kalkulatzen: trukatzeak, elkartzeak eta banatzeak, marrazkian bezala, $6\\cdot(8+2)=6\\cdot 8+6\\cdot 2$.',
            'Multiplicar es sumar un número varias veces: $4\\cdot 5=4+4+4+4+4$. Tres propiedades ayudan a calcular de cabeza: la conmutativa, la asociativa y la distributiva, como en el dibujo, $6\\cdot(8+2)=6\\cdot 8+6\\cdot 2$.',
            'الضرب جمع العدد نفسه عدة مرات: $4\\cdot 5=4+4+4+4+4$. وتساعد ثلاث خصائص على الحساب الذهني: التبديل والتجميع والتوزيع، كما في الرسم، $6\\cdot(8+2)=6\\cdot 8+6\\cdot 2$.',
            'Multiplying is adding a number several times: $4\\cdot 5=4+4+4+4+4$. Three properties help you work things out in your head: the commutative, the associative and the distributive one, as in the drawing, $6\\cdot(8+2)=6\\cdot 8+6\\cdot 2$.'
        ),
        examplePrompt: say('Kalkulatu buruz $35\\cdot 11$ eta $35\\cdot 9$.', 'Calcula de cabeza $35\\cdot 11$ y $35\\cdot 9$.', 'احسب ذهنيًا $35\\cdot 11$ و$35\\cdot 9$.', 'Work out $35\\cdot 11$ and $35\\cdot 9$ in your head.'),
        example: same('$\\begin{gathered}35\\cdot 11=350+35=385\\\\35\\cdot 9=350-35=315\\end{gathered}$'),
        exampleAnswer: say('11 zenbakiaz: 10 zenbakiaz biderkatu eta zenbakia batu. 9 zenbakiaz: 10 zenbakiaz biderkatu eta zenbakia kendu.', 'Por 11: por 10 y se suma el número. Por 9: por 10 y se resta el número.', 'في 11: نضرب في 10 ونضيف العدد. في 9: نضرب في 10 ونطرح العدد.', 'Times 11: times 10 and add the number. Times 9: times 10 and subtract the number.')
    },
    divide: {
        vocabulary: [
            say('banatu', 'repartir', 'التوزيع', 'share'),
            say('zatiketa zehatza', 'división exacta', 'قسمة تامة', 'exact division'),
            say('oinarrizko propietatea', 'propiedad fundamental', 'الخاصية الأساسية', 'fundamental property')
        ],
        definitions: [
            {
                term: say('Zatikizuna, zatitzailea, zatidura, hondarra', 'Dividendo, divisor, cociente y resto', 'المقسوم، المقسوم عليه، خارج القسمة، الباقي', 'Dividend, divisor, quotient, remainder'),
                meaning: say('Zatikizuna ($D$) zatitzailearen ($d$) artean banatzen da; zati bakoitzari zatidura ($c$) dagokio, eta hondarra ($r$) soberan geratzen da.', 'Se reparte el dividendo ($D$) entre el divisor ($d$); a cada parte le toca el cociente ($c$) y sobra el resto ($r$).', 'نوزّع المقسوم ($D$) على المقسوم عليه ($d$)؛ فيكون لكل جزء خارج القسمة ($c$) ويبقى الباقي ($r$).', 'The dividend ($D$) is shared by the divisor ($d$); each part gets the quotient ($c$) and the remainder ($r$) is left over.')
            }
        ],
        explanation: say(
            'Zatitzea zati berdinetan banatzea da. Marrazkian, 17 fitxa bosteko taldeetan: 3 talde ateratzen dira, eta 2 fitxa soberan geratzen dira. Zatiketa guztietan $D=d\\cdot c+r$ betetzen da, eta hondarra beti da zatitzailea baino txikiagoa.',
            'Dividir es repartir en partes iguales. En el dibujo, 17 fichas en grupos de 5: salen 3 grupos y sobran 2. En toda división se cumple $D=d\\cdot c+r$, y el resto siempre es menor que el divisor.',
            'القسمة توزيع على أجزاء متساوية. في الرسم 17 قطعة في مجموعات من 5: نحصل على 3 مجموعات ويبقى 2. وفي كل قسمة يتحقق $D=d\\cdot c+r$، ويكون الباقي دائمًا أصغر من المقسوم عليه.',
            'Dividing is sharing into equal parts. In the drawing, 17 counters in groups of 5: you get 3 groups and 2 are left over. Every division satisfies $D=d\\cdot c+r$, and the remainder is always smaller than the divisor.'
        ),
        examplePrompt: say('Banatu 158 kromo 12 lagunen artean. Zenbat dagozkio bakoitzari, eta zenbat geratzen dira?', 'Reparte 158 cromos entre 12 amigos. ¿Cuántos le tocan a cada uno y cuántos sobran?', 'وزّع 158 بطاقة على 12 صديقًا. كم بطاقة لكل واحد؟ وكم يبقى؟', 'Share 158 stickers among 12 friends. How many does each one get and how many are left over?'),
        example: same('$\\begin{array}{r|l}158&12\\\\\\hline 2&13\\end{array}\\qquad 158=12\\cdot 13+2$'),
        exampleAnswer: say('Bakoitzari 13 kromo dagozkio, eta 2 geratzen dira. Hondarra, 2, zatitzailea baino txikiagoa da.', 'A cada amigo le tocan 13 cromos y sobran 2. El resto, 2, es menor que el divisor, 12.', 'لكل صديق 13 بطاقة ويبقى 2. والباقي 2 أصغر من المقسوم عليه 12.', 'Each friend gets 13 stickers and 2 are left over. The remainder, 2, is smaller than the divisor, 12.'),
        why: {
            text: say(
                '17 fitxa bosteko taldeetan banatzen badituzu, bosteko 3 talde egiten dituzu, hau da, $5\\cdot 3=15$ fitxa, eta 2 soberan geratzen dira. Banatutakoa eta soberan geratzen dena elkartuz, fitxa guztiak berreskuratzen dituzu.',
                'Si repartes 17 fichas en grupos de 5, haces 3 grupos de 5, que son $5\\cdot 3=15$ fichas, y sobran 2. Juntando lo repartido y lo que sobra, recuperas todas las fichas.',
                'إذا وزّعت 17 قطعة في مجموعات من 5، تصنع 3 مجموعات من 5، أي $5\\cdot 3=15$ قطعة، ويبقى 2. وإذا جمعت ما وزّعته وما بقي استعدت كل القطع.',
                'If you share 17 counters in groups of 5, you make 3 groups of 5, that is $5\\cdot 3=15$ counters, and 2 are left over. Putting together what you shared and what is left over gives you all the counters back.'
            ),
            math: same('$17=5\\cdot 3+2$')
        }
    },

    /* ---------- 4. Order of operations and word problems ---------- */
    hierarchy: {
        vocabulary: [
            say('hierarkia', 'jerarquía', 'الأولوية', 'order of operations'),
            say('parentesiak', 'paréntesis', 'الأقواس', 'brackets'),
            say('ezkerretik eskuinera', 'de izquierda a derecha', 'من اليسار إلى اليمين', 'from left to right')
        ],
        explanation: say(
            'Hainbat eragiketa daudenean, ordena bat jarraitu behar da, «semaforoarena»: gorria, parentesiak; horia, biderketak eta zatiketak, agertzen diren ordenan; eta berdea, azkenik, batuketak eta kenketak, ezkerretik eskuinera. Horrela, $20-(3+5)\\cdot 2+12\\mathbin{:}4=7$.',
            'Con varias operaciones hay que seguir un orden, el del «semáforo»: rojo, los paréntesis; amarillo, multiplicaciones y divisiones, en el orden en que aparecen; y verde, al final, sumas y restas, de izquierda a derecha. Así, $20-(3+5)\\cdot 2+12\\mathbin{:}4=7$.',
            'حين توجد عدة عمليات نتبع ترتيبًا هو ترتيب «إشارة المرور»: الأحمر للأقواس؛ والأصفر للضرب والقسمة حسب ترتيب ظهورهما؛ والأخضر في النهاية للجمع والطرح من اليسار إلى اليمين. وهكذا $20-(3+5)\\cdot 2+12\\mathbin{:}4=7$.',
            'With several operations you follow an order, the «traffic light»: red, the brackets; yellow, multiplications and divisions, in the order they appear; and green, at the end, additions and subtractions, from left to right. So $20-(3+5)\\cdot 2+12\\mathbin{:}4=7$.'
        ),
        examplePrompt: say('Kalkulatu $36-4\\cdot(9-2)+18\\mathbin{:}3$.', 'Calcula $36-4\\cdot(9-2)+18\\mathbin{:}3$.', 'احسب $36-4\\cdot(9-2)+18\\mathbin{:}3$.', 'Work out $36-4\\cdot(9-2)+18\\mathbin{:}3$.'),
        example: same('$\\begin{aligned}&36-4\\cdot(9-2)+18\\mathbin{:}3\\\\&=36-28+6=14\\end{aligned}$'),
        exampleAnswer: say('Gorria: $9-2=7$. Horia: $4\\cdot 7=28$ eta $18\\mathbin{:}3=6$. Berdea: $36-28+6=14$.', 'Rojo: $9-2=7$. Amarillo: $4\\cdot 7=28$ y $18\\mathbin{:}3=6$. Verde: $36-28+6=14$.', 'الأحمر: $9-2=7$. الأصفر: $4\\cdot 7=28$ و$18\\mathbin{:}3=6$. الأخضر: $36-28+6=14$.', 'Red: $9-2=7$. Yellow: $4\\cdot 7=28$ and $18\\mathbin{:}3=6$. Green: $36-28+6=14$.')
    },
    brackets: {
        vocabulary: [
            say('parentesia', 'paréntesis', 'القوس', 'bracket'),
            say('barrutik kanpora', 'de dentro hacia fuera', 'من الداخل إلى الخارج', 'from the inside out')
        ],
        definitions: [
            {
                term: say('Kako zuzenak', 'Corchetes', 'الأقواس المعقوفة', 'Square brackets'),
                meaning: say('[ ] ikurrak: parentesi bat beste baten barruan dagoenean, kanpokoa horrela idazten da.', 'Los signos [ ]: cuando hay un paréntesis dentro de otro, el de fuera se escribe así.', 'الرمزان [ ]: حين يكون قوس داخل قوس آخر يُكتب القوس الخارجي هكذا.', 'The signs [ ]: when there is a bracket inside another, the outer one is written like this.')
            }
        ],
        explanation: say(
            'Parentesiek eragiketen ordena aldatzen dute: barrukoa egiten da lehenik, eta zenbaki berekin emaitza beste bat izan daiteke. Parentesi bat beste baten barruan badago, kanpokoa kako zuzenekin idazten da, eta barrutik kanpora ebazten da.',
            'Los paréntesis cambian el orden de las operaciones: lo de dentro va primero, y con los mismos números el resultado puede ser otro. Si hay un paréntesis dentro de otro, el de fuera se escribe con corchetes y se resuelve de dentro hacia fuera.',
            'تغيّر الأقواس ترتيب العمليات: ما بداخلها يُحسب أولًا، وبالأعداد نفسها قد تتغير النتيجة. وإذا كان قوس داخل قوس آخر يُكتب الخارجي بأقواس معقوفة ونحل من الداخل إلى الخارج.',
            'Brackets change the order of operations: what is inside goes first, and with the same numbers the result can be different. If there is a bracket inside another, the outer one is written with square brackets and you work from the inside out.'
        ),
        cases: [
            { title: say('Parentesirik gabe', 'Sin paréntesis', 'دون أقواس', 'Without brackets'), text: say('Biderketa lehenik.', 'Primero la multiplicación.', 'الضرب أولًا.', 'Multiplication first.'), math: same('$2+3\\cdot 4=14$') },
            { title: say('Parentesiekin', 'Con paréntesis', 'مع الأقواس', 'With brackets'), text: say('Barrukoa lehenik.', 'Primero lo de dentro.', 'ما داخل القوس أولًا.', 'What is inside first.'), math: same('$(2+3)\\cdot 4=20$') }
        ],
        examplePrompt: say('Kalkulatu $40-[6+2\\cdot(11-7)]$.', 'Calcula $40-[6+2\\cdot(11-7)]$.', 'احسب $40-[6+2\\cdot(11-7)]$.', 'Work out $40-[6+2\\cdot(11-7)]$.'),
        example: same('$\\begin{aligned}&40-[6+2\\cdot(11-7)]\\\\&=40-[6+8]=40-14=26\\end{aligned}$'),
        exampleAnswer: say('Lehenik parentesia, $11-7=4$; gero kako zuzenak, $6+8=14$; eta azkenik kenketa.', 'Primero el paréntesis, $11-7=4$; después el corchete, $6+8=14$; y al final la resta.', 'أولًا القوس، $11-7=4$؛ ثم القوس المعقوف، $6+8=14$؛ وفي النهاية الطرح.', 'First the bracket, $11-7=4$; then the square brackets, $6+8=14$; and finally the subtraction.')
    },
    problems: {
        vocabulary: [
            say('datuak', 'datos', 'المعطيات', 'data'),
            say('prozedura', 'procedimiento', 'الطريقة', 'procedure'),
            say('erantzuna', 'respuesta', 'الجواب', 'answer')
        ],
        explanation: say(
            'Problema bat ebazteko, klasean hiru urrats erabiltzen ditugu. Datuak: atera behar diren zenbakiak eta hitz gakoak bakarrik. Prozedura: idatzi eragiketa, ahal bada eragiketa konbinatu bakar batean. Erantzuna: erantzun esaldi oso batekin eta unitateekin.',
            'Para resolver un problema, en clase usamos tres pasos. Datos: saca solo los números y las palabras clave necesarias. Procedimiento: escribe la operación, si puedes en una sola operación combinada. Respuesta: contesta con una frase completa y con unidades.',
            'لحل مسألة نستعمل في الصف ثلاث خطوات. المعطيات: استخرج الأعداد والكلمات المفتاحية اللازمة فقط. الطريقة: اكتب العملية، وإن أمكن في عملية مركّبة واحدة. الجواب: أجب بجملة كاملة مع الوحدات.',
            'To solve a problem, in class we use three steps. Data: pull out only the numbers and key words you need. Procedure: write the calculation, in a single combined operation if you can. Answer: reply with a full sentence and with units.'
        ),
        examplePrompt: say('Txango batek 18 euro balio du ikasleko, eta 25 ikasleko 3 talde doaz. Zenbat ordaintzen da guztira?', 'Una excursión cuesta 18 € por alumno y van 3 grupos de 25 alumnos. ¿Cuánto se paga en total?', 'تكلّف الرحلة 18 يورو لكل طالب، ويذهب 3 أفواج في كل فوج 25 طالبًا. كم يُدفع في المجموع؟', 'A trip costs €18 per pupil and 3 groups of 25 pupils go. How much is paid in total?'),
        example: same('$18\\cdot(3\\cdot 25)=18\\cdot 75=1350$'),
        exampleAnswer: say('Erantzuna: guztira 1350 euro ordaintzen dira.', 'Respuesta: en total se pagan 1350 €.', 'الجواب: يُدفع 1350 يورو في المجموع.', 'Answer: €1,350 is paid in total.')
    },

    /* ---------- 5. Powers ---------- */
    powers: {
        vocabulary: [
            say('berretura', 'potencia', 'القوة', 'power'),
            say('karratua', 'cuadrado', 'المربع', 'square'),
            say('kuboa', 'cubo', 'المكعب', 'cube')
        ],
        definitions: [
            {
                term: say('Oinarria eta berretzailea', 'Base y exponente', 'الأساس والأسّ', 'Base and exponent'),
                meaning: say('$a^{n}$ berreturan, $a$ oinarria errepikatzen den faktorea da, eta $n$ berretzaileak zenbat aldiz esaten du.', 'En $a^{n}$, la base $a$ es el factor que se repite y el exponente $n$ dice cuántas veces.', 'في $a^{n}$ الأساس $a$ هو العامل الذي يتكرر، والأسّ $n$ يدل على عدد المرات.', 'In $a^{n}$, the base $a$ is the factor that repeats and the exponent $n$ says how many times.')
            }
        ],
        explanation: say(
            'Berretura faktore berdinen biderketa labur idazteko modu bat da: $4^{3}$ «lau hiru berretura» irakurtzen da. 2 berretzailearekin «karratua» esaten da, eta 3 berretzailearekin «kuboa», marrazkiko $3^{2}=9$ eta $3^{3}=27$ bezala.',
            'Una potencia es una forma corta de escribir una multiplicación de factores iguales: $4^{3}$ se lee «cuatro elevado a tres». Con exponente 2 se dice «al cuadrado» y con 3, «al cubo», como $3^{2}=9$ y $3^{3}=27$ en el dibujo.',
            'القوة طريقة مختصرة لكتابة ضرب عوامل متساوية: تُقرأ $4^{3}$ «أربعة أُس ثلاثة». ومع الأسّ 2 نقول «مربع» ومع 3 «مكعب»، كما في $3^{2}=9$ و$3^{3}=27$ في الرسم.',
            'A power is a short way of writing a multiplication of equal factors: $4^{3}$ is read «four to the power of three». With exponent 2 we say «squared» and with 3, «cubed», like $3^{2}=9$ and $3^{3}=27$ in the drawing.'
        ),
        examplePrompt: say('Idatzi berretura gisa eta kalkulatu: $5\\cdot 5\\cdot 5\\cdot 5$.', 'Escribe como potencia y calcula: $5\\cdot 5\\cdot 5\\cdot 5$.', 'اكتب على شكل قوة واحسب: $5\\cdot 5\\cdot 5\\cdot 5$.', 'Write as a power and work it out: $5\\cdot 5\\cdot 5\\cdot 5$.'),
        example: same('$5\\cdot 5\\cdot 5\\cdot 5=5^{4}=625$'),
        exampleAnswer: say('Oinarria 5 da eta berretzailea 4: 5 lau aldiz biderkatzen da.', 'Base 5 y exponente 4: el 5 se multiplica cuatro veces.', 'الأساس 5 والأسّ 4: نضرب 5 أربع مرات.', 'Base 5 and exponent 4: the 5 is multiplied four times.'),
        why: {
            text: say(
                'Berretzaile bakoitzak faktoreak zenbatzen ditu: $2^{3}$ hiru bi dira, eta $2^{2}$ bi bi. Biderkatzean, bi guztiak lerro batean jartzen dituzu, eta bost zenbatzen dituzu: horregatik batzen dira berretzaileak.',
                'Cada exponente cuenta factores: $2^{3}$ son tres doses y $2^{2}$, dos doses. Al multiplicarlos, pones todos los doses en fila y cuentas cinco: por eso se suman los exponentes.',
                'كل أسّ يعدّ العوامل: $2^{3}$ ثلاث مرات 2، و$2^{2}$ مرتان. وعند الضرب نضع كل العوامل 2 في صف واحد فنعدّ خمسة: لذلك نجمع الأسس.',
                'Each exponent counts factors: $2^{3}$ is three twos and $2^{2}$ is two twos. When you multiply them, you line up all the twos and count five: that is why the exponents are added.'
            ),
            math: same('$\\begin{aligned}2^{3}\\cdot 2^{2}&=(2\\cdot 2\\cdot 2)\\cdot(2\\cdot 2)\\\\&=2^{5}\\end{aligned}$')
        }
    },
    'powers-of-ten': {
        vocabulary: [
            say('berretzailea', 'exponente', 'الأسّ', 'exponent'),
            say('zeroak', 'ceros', 'الأصفار', 'zeros'),
            say('milioia', 'millón', 'مليون', 'million')
        ],
        explanation: say(
            '10 oinarriko berretura bat 1 eta berretzaileak adina zero da: $10^{6}=1\\,000\\,000$. Zenbaki handiak labur idazteko balio du, adibidez $4\\,000\\,000=4\\cdot 10^{6}$.',
            'Una potencia de base 10 es un 1 seguido de tantos ceros como dice el exponente: $10^{6}=1\\,000\\,000$. Sirve para escribir números grandes de forma corta, como $4\\,000\\,000=4\\cdot 10^{6}$.',
            'قوة العدد 10 هي 1 متبوعًا بعدد من الأصفار يساوي الأسّ: $10^{6}=1\\,000\\,000$. وتفيد في كتابة الأعداد الكبيرة باختصار، مثل $4\\,000\\,000=4\\cdot 10^{6}$.',
            'A power of 10 is a 1 followed by as many zeros as the exponent says: $10^{6}=1\\,000\\,000$. It is useful for writing large numbers in short form, like $4\\,000\\,000=4\\cdot 10^{6}$.'
        ),
        examplePrompt: say('Idatzi labur $9\\,000\\,000$, eta deskonposatu $5060$ 10 zenbakiaren berreturekin.', 'Escribe de forma corta $9\\,000\\,000$ y descompón $5060$ con potencias de 10.', 'اكتب $9\\,000\\,000$ باختصار، وفكّك $5060$ بقوى العدد 10.', 'Write $9\\,000\\,000$ in short form and break $5060$ down with powers of 10.'),
        example: same('$\\begin{gathered}9\\,000\\,000=9\\cdot 10^{6}\\\\5060=5\\cdot 10^{3}+6\\cdot 10\\end{gathered}$'),
        exampleAnswer: say('Sei zero: 6 berretzailea. $5060$ zenbakian, 6 zifra hamarrekoetan dago: $6\\cdot 10$.', 'Seis ceros: exponente 6. En $5060$, el 6 está en las decenas: $6\\cdot 10$.', 'ستة أصفار: الأسّ 6. وفي $5060$ يقع الرقم 6 في منزلة العشرات: $6\\cdot 10$.', 'Six zeros: exponent 6. In $5060$, the 6 is in the tens place: $6\\cdot 10$.'),
        why: {
            text: say(
                '10 zenbakiaz biderkatzean, zero bat gehitzen da eskuinean. $10^{3}$ hau da: $10\\cdot 10\\cdot 10$. 1 zenbakitik hasi, eta hiru aldiz gehitzen duzu zero bat: 10, 100, 1000.',
                'Multiplicar por 10 añade un cero a la derecha. $10^{3}$ es $10\\cdot 10\\cdot 10$: empiezas en 1 y añades un cero tres veces: 10, 100, 1000.',
                'الضرب في 10 يضيف صفرًا على اليمين. و$10^{3}$ هو $10\\cdot 10\\cdot 10$: تبدأ من 1 وتضيف صفرًا ثلاث مرات: 10، 100، 1000.',
                'Multiplying by 10 adds a zero on the right. $10^{3}$ is $10\\cdot 10\\cdot 10$: you start at 1 and add a zero three times: 10, 100, 1,000.'
            ),
            math: same('$10^{3}=10\\cdot 10\\cdot 10=1000$')
        }
    }
}

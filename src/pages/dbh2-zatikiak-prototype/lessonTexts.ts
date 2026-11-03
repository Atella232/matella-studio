import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { TheoryTopicId } from './content.ts'

/* ==========================================================================
   Zatikiak · 2. DBH — what each lesson tells: the new words (definitions),
   a short explanation and the example as an exercise («Another example», or
   «Example» in the lessons of facts, which have no «Let's solve»). Plain
   data so the tests can import it; lessons.ts merges it into theoryTopics.
   The example uses fractions of its own, never those of «Let's solve», of
   «Check it» or of the typical mistake. Words that change with the language
   (m.c.d. / ZKH / GCD, percentages «%35», «35 %», «35%», «35٪») stay out of
   the formulas. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

/** The Arabic formulas get a decimal point */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const fractionLessonTexts: Record<TheoryTopicId, LessonTexts> = {
    /* ---------- 1. Meaning ---------- */
    meaning: {
        vocabulary: [
            say('zati berdinak', 'partes iguales', 'أجزاء متساوية', 'equal parts'),
            say('zatiketa', 'división', 'القسمة', 'division')
        ],
        definitions: [
            {
                term: say('Izendatzailea', 'Denominador', 'المقام', 'Denominator'),
                meaning: say('Beheko zenbakia: unitatea zenbat zati berdinetan banatzen den.', 'El número de abajo: en cuántas partes iguales se divide la unidad.', 'العدد في الأسفل: عدد الأجزاء المتساوية التي تُقسم إليها الوحدة.', 'The bottom number: how many equal parts the whole is divided into.')
            },
            {
                term: say('Zenbakitzailea', 'Numerador', 'البسط', 'Numerator'),
                meaning: say('Goiko zenbakia: zati horietatik zenbat hartzen diren.', 'El número de arriba: cuántas de esas partes se toman.', 'العدد في الأعلى: عدد الأجزاء المأخوذة منها.', 'The top number: how many of those parts are taken.')
            }
        ],
        explanation: say(
            'Zatiki bera hiru modutara irakur daiteke: osoaren zati gisa, zatiketa baten emaitza gisa eta zenbaki-zuzeneko puntu bat gisa.',
            'La misma fracción se puede leer de tres maneras: como parte de un todo, como el resultado de una división y como un punto de la recta numérica.',
            'يمكن قراءة الكسر نفسه بثلاث طرق: جزءًا من كل، وناتجَ قسمة، ونقطةً على خط الأعداد.',
            'The same fraction can be read in three ways: as part of a whole, as the result of a division and as a point on the number line.'
        ),
        examplePrompt: say(
            '5 pizza berdin 8 lagunen artean banatzen dira. Pizzaren zer zati jaten du bakoitzak? Zer zenbaki da?',
            'Se reparten 5 pizzas iguales entre 8 amigos. ¿Qué parte de pizza come cada uno? ¿Qué número es?',
            'تُوزَّع 5 بيتزا متماثلة على 8 أصدقاء. ما الجزء الذي يأكله كل واحد؟ وأي عدد هو؟',
            '5 identical pizzas are shared among 8 friends. What part of a pizza does each one eat? What number is it?'
        ),
        example: same('$\\frac{5}{8}=5\\div 8=0{,}625$'),
        exampleAnswer: say('Bakoitzak pizzaren $\\frac{5}{8}$ jaten du: 0 eta 1 arteko zenbaki bat.', 'Cada uno come $\\frac{5}{8}$ de pizza: un número entre 0 y 1.', 'يأكل كل واحد $\\frac{5}{8}$ من البيتزا: عدد بين 0 و1.', 'Each one eats $\\frac{5}{8}$ of a pizza: a number between 0 and 1.')
    },
    representation: {
        vocabulary: [
            say('zenbaki osoa', 'número entero', 'العدد الصحيح', 'whole number'),
            say('hondarra', 'resto', 'الباقي', 'remainder')
        ],
        definitions: [
            {
                term: say('Zatiki propioa', 'Fracción propia', 'الكسر الحقيقي', 'Proper fraction'),
                meaning: say('Zenbakitzailea izendatzailea baino txikiagoa da: 1 baino gutxiago balio du.', 'El numerador es menor que el denominador: vale menos que 1.', 'بسطه أصغر من مقامه: قيمته أقل من 1.', 'The numerator is smaller than the denominator: it is worth less than 1.')
            },
            {
                term: say('Zatiki inpropioa', 'Fracción impropia', 'الكسر غير الحقيقي', 'Improper fraction'),
                meaning: say('Zenbakitzailea izendatzailea baino handiagoa da: 1 baino gehiago balio du, eta zenbaki misto gisa idatz daiteke.', 'El numerador es mayor que el denominador: vale más que 1 y se puede escribir como número mixto.', 'بسطه أكبر من مقامه: قيمته أكثر من 1، ويمكن كتابته عددًا كسريًا.', 'The numerator is bigger than the denominator: it is worth more than 1 and can be written as a mixed number.')
            },
            {
                term: say('Zenbaki mistoa', 'Número mixto', 'العدد الكسري', 'Mixed number'),
                meaning: say('Zenbaki oso bat gehi zatiki propio bat, $2\\frac{1}{4}$ bezala.', 'Un entero más una fracción propia, como $2\\frac{1}{4}$.', 'عدد صحيح مع كسر حقيقي، مثل $2\\frac{1}{4}$.', 'A whole number plus a proper fraction, like $2\\frac{1}{4}$.')
            }
        ],
        explanation: say(
            'Zenbakitzailearen eta izendatzailearen arteko zatiketa osoak unitate osoak (zatidura) eta soberan geratzen dena (hondarra) ematen ditu; hondarra geratzen den zatiaren zenbakitzailea da. Izendatzailea ez da aldatzen.',
            'La división entera del numerador entre el denominador da las unidades completas (el cociente) y lo que sobra (el resto), que es el numerador de la parte que queda. El denominador no cambia.',
            'تعطي القسمة الصحيحة للبسط على المقام الوحدات الكاملة (الناتج) وما يتبقى (الباقي)، وهو بسط الجزء المتبقي. والمقام لا يتغير.',
            'The whole-number division of the numerator by the denominator gives the whole units (the quotient) and what is left (the remainder), which is the numerator of the part left over. The denominator does not change.'
        ),
        examplePrompt: say('Idatzi $\\frac{31}{7}$ zenbaki misto gisa eta hamartar hurbildu gisa.', 'Escribe $\\frac{31}{7}$ como número mixto y como decimal aproximado.', 'اكتب $\\frac{31}{7}$ عددًا كسريًا وعددًا عشريًا تقريبيًا.', 'Write $\\frac{31}{7}$ as a mixed number and as an approximate decimal.'),
        example: same('$\\begin{gathered}31=7\\cdot 4+3\\\\\\frac{31}{7}=4\\frac{3}{7}\\approx 4{,}43\\end{gathered}$'),
        exampleAnswer: say('$4\\frac{3}{7}$: 4 unitate oso, eta $\\frac{3}{7}$ soberan.', '$4\\frac{3}{7}$: 4 unidades completas y sobran $\\frac{3}{7}$.', '$4\\frac{3}{7}$: أربع وحدات كاملة ويتبقى $\\frac{3}{7}$.', '$4\\frac{3}{7}$: 4 whole units and $\\frac{3}{7}$ left over.')
    },
    equivalence: {
        vocabulary: [
            say('biderkatu', 'multiplicar', 'اضرب', 'multiply'),
            say('zatitu', 'dividir', 'اقسم', 'divide'),
            say('biderkadura gurutzatuak', 'productos cruzados', 'الضرب التبادلي', 'cross products')
        ],
        definitions: [
            {
                term: say('Zatiki baliokideak', 'Fracciones equivalentes', 'الكسور المتكافئة', 'Equivalent fractions'),
                meaning: say('Kantitate bera adierazten duten zatikiak, zenbaki desberdinekin idatzita egon arren.', 'Las que representan la misma cantidad, aunque se escriban con números distintos.', 'كسور تمثّل الكمية نفسها وإن كُتبت بأعداد مختلفة.', 'Fractions that stand for the same amount, even though they are written with different numbers.')
            }
        ],
        why: {
            text: say(
                'Zati bakoitza 2 zatitan banatzen baduzu, zati kopurua bikoiztu egiten da, baina bakoitza erdia da: kantitatea ez da aldatzen. Horregatik, zenbakitzailea eta izendatzailea zenbaki berarekin biderkatuta zatiki baliokide bat lortzen da.',
                'Si partes cada trozo en 2, tienes el doble de trozos, pero cada uno es la mitad de grande: la cantidad no cambia. Por eso, multiplicar el numerador y el denominador por el mismo número da una fracción equivalente.',
                'إذا قسمت كل قطعة إلى قسمين صار عدد القطع ضعفين، لكن كل قطعة صارت نصف ما كانت: الكمية لا تتغير. لذلك فإن ضرب البسط والمقام في العدد نفسه يعطي كسرًا مكافئًا.',
                'If you cut each piece in 2, you get twice as many pieces, but each one is half the size: the amount does not change. That is why multiplying the numerator and the denominator by the same number gives an equivalent fraction.'
            ),
            math: same('$\\frac{2}{3}=\\frac{2\\cdot 2}{3\\cdot 2}=\\frac{4}{6}$')
        },
        explanation: say(
            'Zenbakitzailea eta izendatzailea zero ez den zenbaki berarekin biderkatuz (anplifikatu) edo zatituz (sinplifikatu) lortzen dira. Bi zatiki baliokideak diren jakiteko, alderatu biderkadura gurutzatuak.',
            'Se obtienen multiplicando (amplificar) o dividiendo (simplificar) el numerador y el denominador por el mismo número distinto de cero. Para saber si dos fracciones son equivalentes, compara los productos cruzados.',
            'نحصل عليها بضرب البسط والمقام في العدد نفسه غير الصفري (التوسيع) أو بقسمتهما عليه (التبسيط). ولمعرفة هل الكسران متكافئان قارن حاصلَي الضرب التبادلي.',
            'You get them by multiplying (scaling up) or dividing (simplifying) the numerator and the denominator by the same non-zero number. To find out whether two fractions are equivalent, compare the cross products.'
        ),
        examplePrompt: say('$\\frac{6}{14}$ eta $\\frac{9}{21}$ baliokideak dira?', '¿Son equivalentes $\\frac{6}{14}$ y $\\frac{9}{21}$?', 'هل $\\frac{6}{14}$ و$\\frac{9}{21}$ متكافئان؟', 'Are $\\frac{6}{14}$ and $\\frac{9}{21}$ equivalent?'),
        example: same('$6\\cdot 21=14\\cdot 9=126$'),
        exampleAnswer: say('Bai: biderkadura gurutzatuak berdinak dira. Biek $\\frac{3}{7}$ balio dute.', 'Sí: los productos cruzados son iguales. Las dos valen $\\frac{3}{7}$.', 'نعم: حاصلا الضرب التبادلي متساويان. وكلاهما يساوي $\\frac{3}{7}$.', 'Yes: the cross products are equal. Both are worth $\\frac{3}{7}$.')
    },
    simplification: {
        vocabulary: [
            say('sinplifikatu', 'simplificar', 'بسّط', 'simplify'),
            say('zatitzaile komuna', 'divisor común', 'القاسم المشترك', 'common divisor')
        ],
        definitions: [
            {
                term: say('Zatiki laburtezina', 'Fracción irreducible', 'الكسر غير القابل للاختزال', 'Fraction in simplest form'),
                meaning: say('Gehiago sinplifikatu ezin dena: zenbakitzaileak eta izendatzaileak 1 baino ez dute zatitzaile komun.', 'La que no se puede simplificar más: numerador y denominador solo tienen el 1 como divisor común.', 'الكسر الذي لا يمكن تبسيطه أكثر: ليس للبسط والمقام قاسم مشترك سوى 1.', 'One that cannot be simplified any further: the numerator and the denominator only have 1 as a common divisor.')
            }
        ],
        explanation: say(
            'Pixkanaka sinplifika daiteke, zatitzaile komun txikiekin zatituz (2, 3, 5…), edo urrats bakarrean, bi gaiak haien ZKH balioarekin zatituz. Zatikia negatiboa bada, zeinua aurrean edo zenbakitzailean idazten da.',
            'Se puede simplificar poco a poco, dividiendo entre divisores comunes pequeños (2, 3, 5…), o en un solo paso, dividiendo los dos términos entre su m.c.d. Si la fracción es negativa, el signo se escribe delante o en el numerador.',
            'يمكن التبسيط تدريجيًا بالقسمة على قواسم مشتركة صغيرة (2، 3، 5…) أو في خطوة واحدة بقسمة الحدّين على قاسمهما المشترك الأكبر. وإذا كان الكسر سالبًا تُكتب الإشارة أمامه أو في البسط.',
            'You can simplify bit by bit, dividing by small common divisors (2, 3, 5…), or in one step, dividing both terms by their GCD. If the fraction is negative, the sign goes in front or on the numerator.'
        ),
        examplePrompt: say('Sinplifikatu $\\frac{60}{84}$ zatiki laburtezina lortu arte.', 'Simplifica $\\frac{60}{84}$ hasta la fracción irreducible.', 'بسّط $\\frac{60}{84}$ حتى تصل إلى كسر غير قابل للاختزال.', 'Simplify $\\frac{60}{84}$ to its simplest form.'),
        example: same('$\\frac{60}{84}=\\frac{30}{42}=\\frac{10}{14}=\\frac{5}{7}$'),
        exampleAnswer: say('$\\frac{5}{7}$. ZKH balioarekin, 12, urrats bakarrean iristen da.', '$\\frac{5}{7}$. Dividiendo entre el m.c.d., 12, se llega en un solo paso.', '$\\frac{5}{7}$. وبالقسمة على القاسم المشترك الأكبر 12 نصل في خطوة واحدة.', '$\\frac{5}{7}$. Dividing by the GCD, 12, you get there in one step.')
    },
    ordering: {
        vocabulary: [
            say('izendatzaile komuna', 'denominador común', 'المقام المشترك', 'common denominator'),
            say('handiagoa', 'mayor', 'أكبر', 'greater'),
            say('txikiagoa', 'menor', 'أصغر', 'smaller')
        ],
        explanation: say(
            'Begiratu lehenik zeinuari: zatiki negatibo oro edozein positibo baino txikiagoa da. Izendatzaile berarekin, zenbakitzaile handiena duena da handiena. Desberdinak badira, bihurtu izendatzaile komunera edo alderatu biderkadura gurutzatuak. Negatiboen artean, zerotik hurbilen dagoena da handiena.',
            'Mira primero el signo: toda fracción negativa es menor que cualquier positiva. Con el mismo denominador, es mayor la de mayor numerador. Si son distintos, pásalas a denominador común o compara los productos cruzados. Entre negativas, es mayor la más cercana a 0.',
            'انظر أولًا إلى الإشارة: كل كسر سالب أصغر من أي كسر موجب. ومع المقام نفسه يكون الأكبر صاحب البسط الأكبر. وإذا اختلفت المقامات فحوّلها إلى مقام مشترك أو قارن حاصلَي الضرب التبادلي. وبين السالبة يكون الأكبر الأقرب إلى 0.',
            'First look at the sign: every negative fraction is smaller than any positive one. With the same denominator, the one with the bigger numerator is greater. If they are different, change them to a common denominator or compare the cross products. Between negatives, the one closer to 0 is greater.'
        ),
        examplePrompt: say(
            'Ordenatu txikienetik handienera: $\\frac{3}{4}$, $-\\frac{1}{2}$, $\\frac{2}{3}$ eta $\\frac{7}{12}$.',
            'Ordena de menor a mayor: $\\frac{3}{4}$, $-\\frac{1}{2}$, $\\frac{2}{3}$ y $\\frac{7}{12}$.',
            'رتّب من الأصغر إلى الأكبر: $\\frac{3}{4}$ و$-\\frac{1}{2}$ و$\\frac{2}{3}$ و$\\frac{7}{12}$.',
            'Order from smallest to largest: $\\frac{3}{4}$, $-\\frac{1}{2}$, $\\frac{2}{3}$ and $\\frac{7}{12}$.'
        ),
        example: same('$-\\frac{1}{2}<\\frac{7}{12}<\\frac{2}{3}<\\frac{3}{4}$'),
        exampleAnswer: say('12 izendatzailearekin: $\\frac{9}{12}$, $\\frac{8}{12}$ eta $\\frac{7}{12}$; negatiboa doa lehenik.', 'Con denominador 12: $\\frac{9}{12}$, $\\frac{8}{12}$ y $\\frac{7}{12}$; la negativa va primero.', 'بالمقام 12: $\\frac{9}{12}$ و$\\frac{8}{12}$ و$\\frac{7}{12}$؛ والسالب أولًا.', 'With denominator 12: $\\frac{9}{12}$, $\\frac{8}{12}$ and $\\frac{7}{12}$; the negative one comes first.')
    },

    /* ---------- 2. Operations ---------- */
    'add-subtract': {
        vocabulary: [
            say('izendatzaile komuna', 'denominador común', 'المقام المشترك', 'common denominator'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator')
        ],
        why: {
            text: say(
                'Tamaina bereko zatiak bakarrik zenba daitezke batera, metroak eta zentimetroak batzen ez diren bezala. Herenak eta laurdenak hamabirenetara aldatzen dira, bietan sartzen baitira, eta orduan bai, zenbakitzaileak batzen dira.',
                'Solo se pueden contar juntos trozos del mismo tamaño, igual que no se suman metros con centímetros. Tercios y cuartos se cambian a doceavos, que caben en los dos, y entonces sí se suman los numeradores.',
                'لا نعدّ معًا إلا قطعًا من الحجم نفسه، كما لا نجمع الأمتار مع السنتيمترات. فالأثلاث والأرباع نحوّلها إلى أجزاء من اثني عشر تصلح للاثنين معًا، وعندها نجمع البسوط.',
                'You can only count pieces of the same size together, just as you do not add metres to centimetres. Thirds and quarters are changed into twelfths, which fit both, and then you can add the numerators.'
            ),
            math: same('$\\frac{1}{3}+\\frac{1}{4}=\\frac{4}{12}+\\frac{3}{12}=\\frac{7}{12}$')
        },
        explanation: say(
            'Mota bereko zatiak bakarrik batu daitezke. Izendatzaile berarekin, zenbakitzaileak batu edo kentzen dira eta izendatzailea mantentzen da. Desberdinak badira, lehenik izendatzaile komuneko zatiki baliokideak bilatzen dira: txikiena izendatzaileen MKT da.',
            'Solo se pueden sumar trozos del mismo tipo. Con el mismo denominador, se suman o restan los numeradores y el denominador se mantiene. Si son distintos, primero se buscan fracciones equivalentes con un denominador común: el más pequeño es el m.c.m. de los denominadores.',
            'لا تُجمع إلا أجزاء من النوع نفسه. ومع المقام نفسه نجمع البسوط أو نطرحها ونُبقي المقام. وإذا اختلفت نبحث أولًا عن كسور مكافئة بمقام مشترك، وأصغره المضاعف المشترك الأصغر للمقامات.',
            'You can only add pieces of the same kind. With the same denominator, add or subtract the numerators and keep the denominator. If they are different, first find equivalent fractions with a common denominator: the smallest one is the LCM of the denominators.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{2}{3}+\\frac{3}{10}$.', 'Calcula $\\frac{2}{3}+\\frac{3}{10}$.', 'احسب $\\frac{2}{3}+\\frac{3}{10}$.', 'Work out $\\frac{2}{3}+\\frac{3}{10}$.'),
        example: same('$\\frac{2}{3}+\\frac{3}{10}=\\frac{20}{30}+\\frac{9}{30}=\\frac{29}{30}$'),
        exampleAnswer: say('Izendatzaile komuna 30 da, 3 eta 10 zenbakien MKT.', 'El denominador común es 30, el m.c.m. de 3 y 10.', 'المقام المشترك 30، وهو المضاعف المشترك الأصغر لـ3 و10.', 'The common denominator is 30, the LCM of 3 and 10.')
    },
    'multiply-divide': {
        vocabulary: [
            say('zeinuen erregela', 'regla de los signos', 'قاعدة الإشارات', 'rule of signs'),
            say('zatitu', 'dividir', 'القسمة', 'divide')
        ],
        definitions: [
            {
                term: say('Zatiki baten alderantzizkoa', 'Inversa de una fracción', 'مقلوب الكسر', 'Reciprocal'),
                meaning: say('Gaiak trukatuta ateratzen dena: $\\frac{a}{b}$ zatikiarena $\\frac{b}{a}$ da. Biderkatuta 1 ematen dute.', 'La que sale al intercambiar sus términos: la de $\\frac{a}{b}$ es $\\frac{b}{a}$. Su producto es 1.', 'الكسر الناتج عن تبديل الحدّين: مقلوب $\\frac{a}{b}$ هو $\\frac{b}{a}$. وحاصل ضربهما 1.', 'What you get by swapping the terms: the reciprocal of $\\frac{a}{b}$ is $\\frac{b}{a}$. Their product is 1.')
            }
        ],
        why: {
            text: say(
                'Zatitzea zenbaki bat beste batean zenbat aldiz sartzen den galdetzea da. Unitate bakoitzean bi erdi sartzen dira; beraz, 3 unitatetan 6 sartzen dira: $\\frac{1}{2}$ zatikiaz zatitzea 2 zenbakiaz biderkatzea da, haren alderantzizkoaz.',
                'Dividir es preguntar cuántas veces cabe un número en otro. En cada unidad caben dos medios, así que en 3 caben 6: dividir entre $\\frac{1}{2}$ da lo mismo que multiplicar por 2, su inversa.',
                'القسمة سؤال: كم مرة يدخل عدد في عدد آخر؟ في كل وحدة نصفان، إذن في 3 وحدات 6 أنصاف: القسمة على $\\frac{1}{2}$ تعطي ما يعطيه الضرب في 2، أي في مقلوبه.',
                'Dividing asks how many times one number fits into another. Two halves fit into each whole, so 6 halves fit into 3: dividing by $\\frac{1}{2}$ gives the same as multiplying by 2, its reciprocal.'
            ),
            math: same('$3\\div\\frac{1}{2}=3\\cdot 2=6$')
        },
        explanation: say(
            'Biderkatzeko ez da izendatzaile komunik behar: zenbakitzailea bider zenbakitzailea eta izendatzailea bider izendatzailea. Zatiki batez zatitzea haren alderantzizkoaz biderkatzea da. Zeinuen erregela zenbaki osoena bera da.',
            'Para multiplicar no hace falta denominador común: numerador por numerador y denominador por denominador. Dividir entre una fracción es multiplicar por su inversa. La regla de los signos es la misma que con los enteros.',
            'لا نحتاج في الضرب إلى مقام مشترك: البسط في البسط والمقام في المقام. والقسمة على كسر هي الضرب في مقلوبه. وقاعدة الإشارات هي نفسها في الأعداد الصحيحة.',
            'To multiply you do not need a common denominator: numerator times numerator and denominator times denominator. Dividing by a fraction is multiplying by its reciprocal. The rule of signs is the same as for integers.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{9}{10}\\div\\left(-\\frac{3}{5}\\right)$.', 'Calcula $\\frac{9}{10}\\div\\left(-\\frac{3}{5}\\right)$.', 'احسب $\\frac{9}{10}\\div\\left(-\\frac{3}{5}\\right)$.', 'Work out $\\frac{9}{10}\\div\\left(-\\frac{3}{5}\\right)$.'),
        example: same('$\\begin{aligned}\\frac{9}{10}\\div\\left(-\\frac{3}{5}\\right)&=\\frac{9}{10}\\cdot\\left(-\\frac{5}{3}\\right)\\\\&=-\\frac{3}{2}\\end{aligned}$'),
        exampleAnswer: say('$-\\frac{3}{2}$: bigarrena alderantzikatzen da, eta zeinu desberdinekin emaitza negatiboa da.', '$-\\frac{3}{2}$: se invierte la segunda y, con signos distintos, el resultado es negativo.', '$-\\frac{3}{2}$: نقلب الثاني، ومع إشارتين مختلفتين تكون النتيجة سالبة.', '$-\\frac{3}{2}$: flip the second one, and with different signs the result is negative.')
    },
    combined: {
        vocabulary: [
            say('parentesia', 'paréntesis', 'الأقواس', 'brackets'),
            say('ordena', 'orden', 'الترتيب', 'order')
        ],
        explanation: say(
            'Zatikiekin, eragiketek zenbaki osoekin duten ordena bera dute: parentesiak, berreturak, biderketak eta zatiketak, eta azkenik batuketak eta kenketak. Maila berekoak, ezkerretik eskuinera. Idatzi urrats bakoitza lerro batean.',
            'Con fracciones, las operaciones siguen el mismo orden que con los enteros: paréntesis, potencias, multiplicaciones y divisiones, y por último sumas y restas. Las del mismo nivel, de izquierda a derecha. Escribe cada paso en una línea.',
            'تتبع العمليات على الكسور الترتيب نفسه كما في الأعداد الصحيحة: الأقواس، ثم القوى، ثم الضرب والقسمة، وأخيرًا الجمع والطرح. وما كان من المستوى نفسه فمن اليسار إلى اليمين. اكتب كل خطوة في سطر.',
            'With fractions, operations follow the same order as with integers: brackets, powers, multiplication and division, and finally addition and subtraction. Those of the same level, from left to right. Write each step on its own line.'
        ),
        examplePrompt: say('Kalkulatu $\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{9}$.', 'Calcula $\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{9}$.', 'احسب $\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{9}$.', 'Work out $\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{9}$.'),
        example: same('$\\begin{aligned}\\frac{1}{2}+\\frac{3}{4}\\cdot\\frac{2}{9}&=\\frac{1}{2}+\\frac{1}{6}\\\\&=\\frac{4}{6}=\\frac{2}{3}\\end{aligned}$'),
        exampleAnswer: say('$\\frac{2}{3}$. Lehenik biderketa, gero batuketa.', '$\\frac{2}{3}$. Primero el producto, después la suma.', '$\\frac{2}{3}$. الضرب أولًا ثم الجمع.', '$\\frac{2}{3}$. First the product, then the sum.')
    },
    powers: {
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        why: {
            text: say(
                'Berretura bat biderketa errepikatua da, eta zatikiak zenbakitzailea bider zenbakitzailea eta izendatzailea bider izendatzailea biderkatzen dira. Horregatik, berretzailea bi gaiei aplikatzen zaie.',
                'Una potencia es una multiplicación repetida, y las fracciones se multiplican numerador por numerador y denominador por denominador. Por eso el exponente se aplica a los dos términos.',
                'القوة ضرب متكرر، والكسور تُضرب البسط في البسط والمقام في المقام. لذلك يُطبَّق الأس على الحدّين معًا.',
                'A power is a repeated multiplication, and fractions are multiplied numerator by numerator and denominator by denominator. That is why the exponent applies to both terms.'
            ),
            math: same('$\\left(\\frac{2}{3}\\right)^{2}=\\frac{2}{3}\\cdot\\frac{2}{3}=\\frac{2^{2}}{3^{2}}=\\frac{4}{9}$')
        },
        explanation: say(
            'Zatiki baten berretura zatikia bere buruarekin hainbat aldiz biderkatzea da; horregatik, zenbakitzailea eta izendatzailea berretzen dira. Oinarria negatiboa bada, berretzaile bikoitiak emaitza positiboa ematen du, eta bakoitiak negatiboa. Parentesiek esaten dute zeinua oinarriaren parte den.',
            'Una potencia de una fracción es multiplicarla por sí misma varias veces; por eso se elevan el numerador y el denominador. Si la base es negativa, un exponente par da resultado positivo, y uno impar, negativo. Los paréntesis dicen si el signo forma parte de la base.',
            'قوة الكسر هي ضربه في نفسه عدة مرات، ولذلك نرفع البسط والمقام. وإذا كان الأساس سالبًا أعطى الأس الزوجي نتيجة موجبة والفردي سالبة. وتبيّن الأقواس هل الإشارة جزء من الأساس.',
            'A power of a fraction means multiplying it by itself several times; that is why both the numerator and the denominator are raised. If the base is negative, an even exponent gives a positive result and an odd one a negative result. The brackets show whether the sign is part of the base.'
        ),
        examplePrompt: say('Kalkulatu $\\left(-\\frac{2}{5}\\right)^{3}$ eta $\\left(\\frac{3}{2}\\right)^{2}$.', 'Calcula $\\left(-\\frac{2}{5}\\right)^{3}$ y $\\left(\\frac{3}{2}\\right)^{2}$.', 'احسب $\\left(-\\frac{2}{5}\\right)^{3}$ و$\\left(\\frac{3}{2}\\right)^{2}$.', 'Work out $\\left(-\\frac{2}{5}\\right)^{3}$ and $\\left(\\frac{3}{2}\\right)^{2}$.'),
        example: same('$\\begin{gathered}\\left(-\\frac{2}{5}\\right)^{3}=-\\frac{8}{125}\\\\\\left(\\frac{3}{2}\\right)^{2}=\\frac{9}{4}\\end{gathered}$'),
        exampleAnswer: say('Berretzaile bakoitia: zeinua geratu egiten da. 1 baino handiagoa den zatikia handitu egiten da berretzean.', 'Exponente impar: el signo se queda. Una fracción mayor que 1 crece al elevarla.', 'الأس فردي: تبقى الإشارة. والكسر الأكبر من 1 يكبر عند رفعه إلى قوة.', 'Odd exponent: the sign stays. A fraction greater than 1 grows when you raise it.')
    },

    /* ---------- 3. Problems ---------- */
    'fraction-of': {
        vocabulary: [
            say('kantitatea', 'cantidad', 'الكمية', 'quantity'),
            say('osoa', 'total', 'الكل', 'whole')
        ],
        explanation: say(
            'Kantitate baten zatikia kalkulatzeko, zatitu kantitatea izendatzailearekin eta biderkatu zenbakitzailearekin: zatikiaz biderkatzea da. Zatia ezaguna bada eta osoa bilatzen bada, aurkitu zati baten balioa eta biderkatu izendatzailearekin.',
            'Para calcular una fracción de una cantidad, divide la cantidad entre el denominador y multiplica por el numerador: es multiplicar por la fracción. Si se conoce la parte y se busca el total, halla el valor de una parte y multiplícalo por el denominador.',
            'لحساب كسر من كمية اقسم الكمية على المقام واضرب في البسط: إنه الضرب في الكسر. وإذا عُرف الجزء وطُلب الكل فأوجد قيمة جزء واحد واضربها في المقام.',
            'To work out a fraction of an amount, divide the amount by the denominator and multiply by the numerator: it is multiplying by the fraction. If you know the part and want the total, find the value of one part and multiply it by the denominator.'
        ),
        examplePrompt: say(
            'Klase bateko 36 ikasleetatik, $\\frac{5}{9}$ autobusez joaten dira ikastetxera. Zenbat dira? Zenbat ez dira autobusez joaten?',
            'De los 36 alumnos de una clase, $\\frac{5}{9}$ van al instituto en autobús. ¿Cuántos son? ¿Cuántos no van en autobús?',
            'من بين 36 تلميذًا في قسم يذهب $\\frac{5}{9}$ إلى المدرسة بالحافلة. كم عددهم؟ وكم لا يذهبون بالحافلة؟',
            'Of the 36 students in a class, $\\frac{5}{9}$ go to school by bus. How many is that? How many do not go by bus?'
        ),
        example: same('$\\begin{gathered}36\\div 9\\cdot 5=20\\\\36-20=16\\end{gathered}$'),
        exampleAnswer: say('20 autobusez joaten dira eta 16 ez, hau da, klasearen $\\frac{4}{9}$.', 'Van 20 en autobús y 16 no, es decir, $\\frac{4}{9}$ de la clase.', 'يذهب 20 بالحافلة ولا يذهب 16، أي $\\frac{4}{9}$ من القسم.', '20 go by bus and 16 do not, that is, $\\frac{4}{9}$ of the class.')
    },
    percentages: {
        vocabulary: [
            say('zenbaki hamartarra', 'número decimal', 'العدد العشري', 'decimal'),
            say('hamartar periodikoa', 'decimal periódico', 'العدد العشري الدوري', 'recurring decimal'),
            say('hurbilketa', 'aproximación', 'القيمة التقريبية', 'approximation')
        ],
        definitions: [
            {
                term: say('Ehunekoa', 'Porcentaje', 'النسبة المئوية', 'Percentage'),
                meaning: say('100 izendatzailea duen zatikia: %35 ehuneko 35 da.', 'Una fracción de denominador 100: el 35 % son 35 de cada 100.', 'كسر مقامه 100: ‏35٪ تعني 35 من كل 100.', 'A fraction with denominator 100: 35% means 35 out of every 100.')
            }
        ],
        explanation: say(
            'Zatiki bat, hamartar bat eta ehuneko bat balio beraren hiru idazkera izan daitezke. Zatikia hamartar bihurtzeko, zatitu zenbakitzailea izendatzailearekin; hamartarretik ehunekora, biderkatu 100 zenbakiarekin. Zatiketa amaitzen ez bada, hamartarra periodikoa da, eta biribiltzean hurbilketa bat idazten da.',
            'Una fracción, un decimal y un porcentaje pueden ser tres formas del mismo valor. Para pasar una fracción a decimal, divide el numerador entre el denominador; del decimal al porcentaje, multiplica por 100. Si la división no termina, el decimal es periódico: al redondear se escribe una aproximación.',
            'يمكن أن يكون الكسر والعدد العشري والنسبة المئوية ثلاث كتابات للقيمة نفسها. لتحويل كسر إلى عدد عشري اقسم البسط على المقام، ومن العشري إلى النسبة المئوية اضرب في 100. وإذا لم تنتهِ القسمة فالعدد العشري دوري، وعند التقريب نكتب قيمة تقريبية.',
            'A fraction, a decimal and a percentage can be three ways of writing the same value. To turn a fraction into a decimal, divide the numerator by the denominator; from the decimal to the percentage, multiply by 100. If the division does not end, the decimal is recurring, and when you round it you write an approximation.'
        ),
        examplePrompt: say('Idatzi $\\frac{7}{20}$ hamartar gisa eta ehuneko gisa.', 'Escribe $\\frac{7}{20}$ como decimal y como porcentaje.', 'اكتب $\\frac{7}{20}$ عددًا عشريًا ونسبة مئوية.', 'Write $\\frac{7}{20}$ as a decimal and as a percentage.'),
        example: same('$\\frac{7}{20}=7\\div 20=0{,}35$'),
        exampleAnswer: say('$0{,}35\\cdot 100=35$: %35 da.', '$0{,}35\\cdot 100=35$: es el 35 %.', '$0{,}35\\cdot 100=35$: أي 35٪.', '$0{,}35\\cdot 100=35$: it is 35%.')
    },
    proportionality: {
        vocabulary: [
            say('magnitudea', 'magnitud', 'الكمية', 'quantity'),
            say('zuzenki proportzionalak', 'directamente proporcionales', 'متناسبتان طرديًا', 'directly proportional'),
            say('deskontua', 'descuento', 'التخفيض', 'discount')
        ],
        explanation: say(
            'Bi magnitude zuzenki proportzionalak dira, bat zenbaki batez biderkatzean bestea ere zenbaki berarekin biderkatzen bada; haien zatidura konstantea da. Unitatera laburtuz edo proportzio bat planteatuz ebazten da. Ehuneko bat aplikatzea proportzionaltasun-kasu bat da.',
            'Dos magnitudes son directamente proporcionales si, al multiplicar una por un número, la otra queda multiplicada por el mismo número; su cociente es constante. Se resuelve reduciendo a la unidad o planteando una proporción. Aplicar un porcentaje es un caso de proporcionalidad.',
            'تكون كميتان متناسبتين طرديًا إذا ضُربت إحداهما في عدد فضُربت الأخرى في العدد نفسه، وحاصل قسمتهما ثابت. وتُحل بالرجوع إلى الوحدة أو بكتابة تناسب. وتطبيق نسبة مئوية حالة من حالات التناسب.',
            'Two quantities are directly proportional if, when one is multiplied by a number, the other is multiplied by the same number; their quotient is constant. You solve it by reducing to one unit or by setting up a proportion. Applying a percentage is a case of proportion.'
        ),
        examplePrompt: say(
            '45 €-ko prezio bati %20 deskontatzen zaio. Zenbat euro dira?',
            'A un precio de 45 € se le aplica un descuento del 20 %. ¿Cuántos euros se descuentan?',
            'سعر 45 € عليه تخفيض 20٪. كم يورو يُخصم؟',
            'A 20% discount is applied to a price of €45. How many euros are taken off?'
        ),
        example: same('$\\frac{20}{100}\\cdot 45=9$'),
        exampleAnswer: say('9 € deskontatzen dira: 36 € ordaintzen dira.', 'Se descuentan 9 €: se pagan 36 €.', 'يُخصم 9 €: فيُدفع 36 €.', '€9 is taken off: you pay €36.')
    }
}

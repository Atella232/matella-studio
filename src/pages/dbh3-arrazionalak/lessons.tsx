import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AddFigure, AreaFigure, EquivalenceFigure, FractionOfFigure, MeaningFigure, OrderFigure, SimplifyFigure } from '../dbh2-zatikiak-prototype/figures'
import { DecimalKindsFigure, ExactFractionFigure, FractionOpsFigure, PeriodicFractionFigure } from '../dbh4-aplikatuak-errealak/figures'
import { OrderDensityFigure } from '../dbh4-akademikoak-errealak/figures'
import { RemainingFigure, ThalesLineFigure, WholeFigure } from './figures'

/* ==========================================================================
   Zenbaki arrazionalak · 3. DBH — stages and lessons. Sequence follows the
   class textbook (Santillana 3.º ESO unit 1, "Números racionales"):
   fractions and equivalence, simplifying, comparing and the number line,
   operations and their order, decimal expressions and the generating
   fraction, and problems. Many figures are shared with the fractions unit
   of 2. DBH and the real numbers units of 4. DBH.
   ========================================================================== */

export type RationalsStageId = 'fractions' | 'order' | 'operations' | 'decimals' | 'problems'

export const rationalsStages: UnitStage[] = [
    { id: 'fractions', tone: 'blue', title: { eu: 'Zatikiak eta baliokidetasuna', es: 'Fracciones y equivalencia', ar: 'الكسور والتكافؤ' } },
    { id: 'order', tone: 'violet', title: { eu: 'Ordena eta zuzena', es: 'Orden y recta', ar: 'الترتيب والمستقيم' } },
    { id: 'operations', tone: 'mustard', title: { eu: 'Eragiketak', es: 'Operaciones', ar: 'العمليات' } },
    { id: 'decimals', tone: 'coral', title: { eu: 'Hamartarrak eta zatiki sortzailea', es: 'Decimales y fracción generatriz', ar: 'العشريات والكسر المولّد' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problemak', es: 'Problemas', ar: 'المسائل' } }
]

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const rationalsTopics: UnitTopic[] = [
    {
        id: 'rational-meaning',
        stage: 'fractions',
        title: say('Zatikiak eta zenbaki arrazionalak', 'Fracciones y números racionales', 'الكسور والأعداد النسبية'),
        goal: say('Zatiki batek zer adierazten duen ulertzea eta zenbaki arrazionalak ezagutzea.', 'Entender qué expresa una fracción y reconocer los números racionales.', 'فهم ما يعبّر عنه الكسر والتعرف على الأعداد النسبية.'),
        explanation: say(
            'Zatiki bat $\\frac{a}{b}$ da, $a$ eta $b$ zenbaki osoak eta $b\\neq 0$ izanik. Hiru irakurketa ditu: oso baten zatiak (4 zatitan banatu eta 3 hartu), zatiketa bat ($3:4=0{,}75$) eta zuzeneko zenbaki bat. Zatiki batek zeinu negatiboa izan dezake: $\\frac{-3}{4}=\\frac{3}{-4}=-\\frac{3}{4}$. Zenbaki osoak ere zatikiak dira: $-2=\\frac{-10}{5}$. Zatiki gisa idatz daitezkeen zenbaki guztiek zenbaki arrazionalen multzoa osatzen dute, $\\mathbb{Q}$.',
            'Una fracción es $\\frac{a}{b}$, con $a$ y $b$ números enteros y $b\\neq 0$. Tiene tres lecturas: partes de un todo (dividir en 4 partes y tomar 3), una división ($3:4=0{,}75$) y un número de la recta. Una fracción puede ser negativa: $\\frac{-3}{4}=\\frac{3}{-4}=-\\frac{3}{4}$. Los números enteros también son fracciones: $-2=\\frac{-10}{5}$. Todos los números que se pueden escribir como fracción forman el conjunto de los números racionales, $\\mathbb{Q}$.',
            'الكسر هو $\\frac{a}{b}$ حيث $a$ و$b$ عددان صحيحان و$b\\neq 0$. وله ثلاث قراءات: أجزاء من كل (التقسيم إلى 4 أجزاء وأخذ 3)، وقسمة ($3:4=0{,}75$)، وعدد على المستقيم. ويمكن أن يكون الكسر سالبًا: $\\frac{-3}{4}=\\frac{3}{-4}=-\\frac{3}{4}$. والأعداد الصحيحة كسور أيضًا: $-2=\\frac{-10}{5}$. وكل الأعداد التي يمكن كتابتها كسرًا تكوّن مجموعة الأعداد النسبية $\\mathbb{Q}$.'
        ),
        stepsKind: 'facts',
        steps: [
            { text: say('Zatiki baten zeinua: zeinu bereko gaiak → positiboa; desberdinak → negatiboa.', 'El signo de una fracción: términos del mismo signo → positiva; de distinto signo → negativa.', 'إشارة الكسر: حدّان بالإشارة نفسها ← موجب؛ مختلفان ← سالب.'), math: same('$\\frac{-6}{-5}=\\frac{6}{5}\\qquad\\frac{-6}{5}=-\\frac{6}{5}$') },
            { text: say('Zenbaki osoa: izendatzailea 1, edo beste edozein.', 'Un entero: denominador 1, o cualquier otro.', 'العدد الصحيح: المقام 1 أو أي مقام آخر.'), math: same('$-2=\\frac{-2}{1}=\\frac{-10}{5}$') },
            { text: say('Zatiki inpropioa: zenbakitzailea handiagoa; zenbaki misto gisa idatz daiteke.', 'Fracción impropia: numerador mayor; se puede escribir como número mixto.', 'الكسر غير الحقيقي: البسط أكبر؛ ويمكن كتابته عددًا كسريًا.'), math: same('$\\frac{17}{5}=3+\\frac{2}{5}$') }
        ],
        example: same('$\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\qquad 0{,}75=\\frac{3}{4}\\in\\mathbb{Q}$'),
        takeaway: say('Zenbaki arrazionala: zatiki gisa idatz daitekeena, positiboa edo negatiboa.', 'Número racional: el que se puede escribir como fracción, positivo o negativo.', 'العدد النسبي: ما يمكن كتابته كسرًا، موجبًا أو سالبًا.'),
        figure: (language) => <MeaningFigure language={language} />
    },
    {
        id: 'equivalent',
        stage: 'fractions',
        title: say('Zatiki baliokideak', 'Fracciones equivalentes', 'الكسور المتكافئة'),
        goal: say('Bi zatiki baliokideak diren jakitea eta gai ezezagun bat kalkulatzea.', 'Saber si dos fracciones son equivalentes y calcular un término desconocido.', 'معرفة ما إذا كان كسران متكافئين وحساب حد مجهول.'),
        explanation: say(
            'Bi zatiki baliokideak dira balio bera dutenean. $\\frac{a}{b}$ eta $\\frac{c}{d}$ baliokideak dira gurutzeko biderkadurak berdinak badira: $a\\cdot d=b\\cdot c$. Horrek gai ezezagun bat kalkulatzeko balio du: $\\frac{18}{11}=\\frac{72}{x}$ bada, $18\\cdot x=11\\cdot 72$ eta $x=\\frac{11\\cdot 72}{18}=44$. Zatiki baliokideak lortzeko, biderkatu edo zatitu bi gaiak zenbaki beraz.',
            'Dos fracciones son equivalentes cuando tienen el mismo valor. $\\frac{a}{b}$ y $\\frac{c}{d}$ son equivalentes si sus productos cruzados son iguales: $a\\cdot d=b\\cdot c$. Esto sirve para calcular un término desconocido: si $\\frac{18}{11}=\\frac{72}{x}$, entonces $18\\cdot x=11\\cdot 72$ y $x=\\frac{11\\cdot 72}{18}=44$. Para obtener fracciones equivalentes, multiplica o divide los dos términos por el mismo número.',
            'يتكافأ كسران إذا كانت لهما القيمة نفسها. ويكون $\\frac{a}{b}$ و$\\frac{c}{d}$ متكافئين إذا تساوى حاصلا الضرب التبادلي: $a\\cdot d=b\\cdot c$. وهذا يفيد في حساب حد مجهول: إذا كان $\\frac{18}{11}=\\frac{72}{x}$ فإن $18\\cdot x=11\\cdot 72$ و$x=\\frac{11\\cdot 72}{18}=44$. وللحصول على كسور متكافئة اضرب الحدين في العدد نفسه أو اقسمهما عليه.'
        ),
        problem: say('$\\frac{-6}{5}$ eta $\\frac{-18}{15}$ baliokideak dira?', '¿Son equivalentes $\\frac{-6}{5}$ y $\\frac{-18}{15}$?', 'هل $\\frac{-6}{5}$ و$\\frac{-18}{15}$ متكافئان؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen gurutzeko biderkadura.', 'Primer producto cruzado.', 'حاصل الضرب التبادلي الأول.'), math: same('$-6\\cdot 15=-90$') },
            { text: say('Bigarrena.', 'El segundo.', 'الثاني.'), math: same('$5\\cdot(-18)=-90$') },
            { text: say('Berdinak dira: baliokideak.', 'Son iguales: son equivalentes.', 'متساويان: الكسران متكافئان.'), math: same('$\\frac{-6}{5}=\\frac{-18}{15}$') }
        ],
        example: same('$\\frac{x}{24}=\\frac{5}{6}\\ \\to\\ x=\\frac{5\\cdot 24}{6}=20$'),
        takeaway: say('Baliokideak ⇔ gurutzeko biderkadurak berdinak.', 'Equivalentes ⇔ productos cruzados iguales.', 'متكافئان ⇔ حاصلا الضرب التبادلي متساويان.'),
        figure: (language) => <EquivalenceFigure language={language} />
    },
    {
        id: 'simplify',
        stage: 'fractions',
        title: say('Anplifikatu, sinplifikatu eta zatiki laburtezina', 'Amplificar, simplificar y fracción irreducible', 'التوسيع والاختزال والكسر غير القابل للاختزال'),
        goal: say('Zatiki baten zatiki laburtezina aurkitzea, z.k.h. erabiliz.', 'Hallar la fracción irreducible de una fracción usando el m.c.d.', 'إيجاد الكسر غير القابل للاختزال باستعمال القاسم المشترك الأكبر.'),
        explanation: say(
            'Anplifikatzea bi gaiak zenbaki beraz biderkatzea da; sinplifikatzea, zatitzaile komun batez zatitzea. Zatiki laburtezina gehiago sinplifika ezin dena da: bere gaien z.k.h. 1 da. Pauso bakarrean lortzeko, zatitu bi gaiak z.k.h.-z: $\\frac{84}{126}$, z.k.h.(84, 126) = 42, beraz $\\frac{2}{3}$. Kontuz: gai bat lehena izateak ez du esan nahi laburtezina denik: $\\frac{7}{14}=\\frac{1}{2}$.',
            'Amplificar es multiplicar los dos términos por el mismo número; simplificar, dividirlos entre un divisor común. La fracción irreducible es la que ya no se puede simplificar: el m.c.d. de sus términos es 1. Para obtenerla en un solo paso, divide los dos términos entre su m.c.d.: $\\frac{84}{126}$, m.c.d.(84, 126) = 42, así que $\\frac{2}{3}$. Cuidado: que un término sea primo no asegura que sea irreducible: $\\frac{7}{14}=\\frac{1}{2}$.',
            'التوسيع هو ضرب الحدين في العدد نفسه؛ والاختزال قسمتهما على قاسم مشترك. والكسر غير القابل للاختزال هو الذي لا يمكن اختزاله أكثر: القاسم المشترك الأكبر لحديه 1. وللحصول عليه بخطوة واحدة اقسم الحدين على قاسمهما المشترك الأكبر: $\\frac{84}{126}$، ق.م.أ.(84، 126) = 42، إذن $\\frac{2}{3}$. انتبه: كون أحد الحدين أوليًا لا يضمن أن الكسر غير قابل للاختزال: $\\frac{7}{14}=\\frac{1}{2}$.'
        ),
        problem: say('Lortu $\\frac{105}{126}$ zatikiaren zatiki laburtezina.', 'Obtén la fracción irreducible de $\\frac{105}{126}$.', 'جد الكسر غير القابل للاختزال لـ $\\frac{105}{126}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deskonposatu.', 'Descompón.', 'حلّل.'), math: same('$105=3\\cdot 5\\cdot 7\\qquad 126=2\\cdot 3^{2}\\cdot 7$') },
            { text: say('Faktore komunak, berretzaile txikienarekin.', 'Factores comunes con el menor exponente.', 'العوامل المشتركة بأصغر أس.'), math: same('$3\\cdot 7=21$') },
            { text: say('Zatitu bi gaiak 21ez.', 'Divide los dos términos entre 21.', 'اقسم الحدين على 21.'), math: same('$\\frac{105:21}{126:21}=\\frac{5}{6}$') }
        ],
        example: same('$\\frac{-120}{165}=\\frac{-8}{11}\\qquad\\frac{242}{726}=\\frac{1}{3}$'),
        takeaway: say('Zatitu z.k.h.-z: zatiki laburtezina pauso bakarrean.', 'Divide entre el m.c.d.: la fracción irreducible en un paso.', 'اقسم على ق.م.أ.: الكسر غير القابل للاختزال بخطوة واحدة.'),
        figure: (language) => <SimplifyFigure language={language} />
    },
    {
        id: 'compare',
        stage: 'order',
        title: say('Zatikiak konparatu eta ordenatu', 'Comparar y ordenar fracciones', 'مقارنة الكسور وترتيبها'),
        goal: say('Zatikiak, negatiboak barne, izendatzaile komunaren bidez ordenatzea.', 'Ordenar fracciones, también negativas, reduciéndolas a común denominador.', 'ترتيب الكسور، والسالبة منها، بتوحيد المقامات.'),
        explanation: say(
            'Zatikiak konparatzeko, jarri izendatzaile bera (izendatzaileen m.k.t.) eta konparatu zenbakitzaileak. Zenbakitzaile bera badute, txikiena izendatzaile handiena duena da. Negatiboetan dena alderantziz da: zero baino txikiagoak dira, eta balio absolutu handiena dutenak txikienak dira: $-\\frac{21}{6}<-\\frac{10}{4}$. Bi zatiki konparatzeko, gurutzeko biderkadurak ere erabil daitezke, izendatzaileak positiboak direnean.',
            'Para comparar fracciones, ponlas con el mismo denominador (el m.c.m. de los denominadores) y compara los numeradores. Si tienen el mismo numerador, es menor la de mayor denominador. En las negativas todo se invierte: son menores que cero, y la de mayor valor absoluto es la menor: $-\\frac{21}{6}<-\\frac{10}{4}$. Para comparar dos fracciones también sirven los productos cruzados, con denominadores positivos.',
            'لمقارنة الكسور وحّد المقامات (المضاعف المشترك الأصغر) وقارن البسوط. وإذا تساوت البسوط فالأصغر هو صاحب المقام الأكبر. وفي السالبة ينعكس كل شيء: هي أصغر من الصفر، وصاحب القيمة المطلقة الأكبر هو الأصغر: $-\\frac{21}{6}<-\\frac{10}{4}$. وتصلح لمقارنة كسرين الضربات التبادلية أيضًا إذا كانت المقامات موجبة.'
        ),
        problem: say('Ordenatu txikienetik handienera: $\\frac{2}{7}$, $\\frac{1}{6}$ eta $\\frac{3}{5}$.', 'Ordena de menor a mayor: $\\frac{2}{7}$, $\\frac{1}{6}$ y $\\frac{3}{5}$.', 'رتّب من الأصغر إلى الأكبر: $\\frac{2}{7}$ و$\\frac{1}{6}$ و$\\frac{3}{5}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('m.k.t.(7, 6, 5) = 210.', 'm.c.m.(7, 6, 5) = 210.', 'م.م.أ.(7، 6، 5) = 210.'), math: same('$\\frac{2}{7}=\\frac{60}{210}\\qquad\\frac{1}{6}=\\frac{35}{210}\\qquad\\frac{3}{5}=\\frac{126}{210}$') },
            { text: say('Konparatu zenbakitzaileak.', 'Compara los numeradores.', 'قارن البسوط.'), math: same('$35<60<126$') },
            { text: say('Ordena.', 'El orden.', 'الترتيب.'), math: same('$\\frac{1}{6}<\\frac{2}{7}<\\frac{3}{5}$') }
        ],
        example: same('$-\\frac{21}{6}<-\\frac{10}{4}<-\\frac{15}{9}<\\frac{1}{3}<\\frac{7}{9}<\\frac{4}{5}$'),
        takeaway: say('Izendatzaile bera jarri eta konparatu zenbakitzaileak; negatiboetan, alderantziz.', 'Pon el mismo denominador y compara numeradores; en los negativos, al revés.', 'وحّد المقام وقارن البسوط؛ وفي السالبة بالعكس.'),
        figure: (language) => <OrderFigure language={language} />
    },
    {
        id: 'line',
        stage: 'order',
        title: say('Zatikiak zuzenean', 'Fracciones en la recta', 'الكسور على المستقيم'),
        goal: say('Zatiki bat, negatiboa izan arren, zuzenean zehatz kokatzea.', 'Situar exactamente una fracción, también negativa, en la recta.', 'وضع كسر، ولو كان سالبًا، بدقة على المستقيم.'),
        explanation: say(
            'Zatiki inpropio bat kokatzeko, idatzi zati oso gisa gehi zatiki propio bat: $\\frac{17}{6}=2+\\frac{5}{6}$, beraz 2 eta 3 artean dago. Zatitu tarte hori izendatzaileak adina zati berdinetan (6) eta hartu zenbakitzaileak adina (5). Zatiketa zehatza egiteko, Talesen teorema erabiltzen da: zuzen zeihar batean 6 zati berdin markatu, azken marka 3rekin lotu eta paraleloak marraztu. Negatiboak 0ren ezkerrean daude: $-\\frac{12}{5}=-2-\\frac{2}{5}$, −2 eta −3 artean.',
            'Para situar una fracción impropia, escríbela como parte entera más una fracción propia: $\\frac{17}{6}=2+\\frac{5}{6}$, así que está entre 2 y 3. Divide ese tramo en tantas partes iguales como indica el denominador (6) y toma tantas como indica el numerador (5). Para dividir con exactitud se usa el teorema de Tales: marca 6 partes iguales en una recta oblicua, une la última marca con el 3 y traza paralelas. Las negativas quedan a la izquierda del 0: $-\\frac{12}{5}=-2-\\frac{2}{5}$, entre −2 y −3.',
            'لوضع كسر غير حقيقي اكتبه جزءًا صحيحًا مع كسر حقيقي: $\\frac{17}{6}=2+\\frac{5}{6}$ فهو بين 2 و3. قسّم هذا المجال أجزاء متساوية بعدد المقام (6) وخذ منها بعدد البسط (5). وللتقسيم بدقة نستعمل مبرهنة طاليس: علّم 6 أجزاء متساوية على مستقيم مائل، وصِل العلامة الأخيرة بالعدد 3، وارسم مستقيمات موازية. والسالبة تقع يسار الصفر: $-\\frac{12}{5}=-2-\\frac{2}{5}$ بين −2 و−3.'
        ),
        problem: say('Kokatu $\\frac{25}{8}$ zuzenean.', 'Sitúa $\\frac{25}{8}$ en la recta.', 'ضع $\\frac{25}{8}$ على المستقيم.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati osoa: 25 : 8 = 3, hondarra 1.', 'Parte entera: 25 : 8 = 3, resto 1.', 'الجزء الصحيح: 25 : 8 = 3 والباقي 1.'), math: same('$\\frac{25}{8}=3+\\frac{1}{8}$') },
            { text: say('3 eta 4 artean, 8 zatitan banatuta.', 'Entre 3 y 4, dividido en 8 partes.', 'بين 3 و4 مقسومًا إلى 8 أجزاء.'), math: same('$3<\\frac{25}{8}<4$') },
            { text: say('Hartu lehen zatia.', 'Toma la primera parte.', 'خذ الجزء الأول.'), math: same('$\\frac{25}{8}=3{,}125$') }
        ],
        example: same('$\\frac{14}{5}=2+\\frac{4}{5}\\qquad -\\frac{7}{4}=-1-\\frac{3}{4}$'),
        takeaway: say('Zati osoa lehenik, gero zatitu tartea izendatzaileak adina zatitan.', 'Primero la parte entera; después divide el tramo en tantas partes como el denominador.', 'الجزء الصحيح أولًا، ثم قسّم المجال أجزاء بعدد المقام.'),
        figure: (language) => <ThalesLineFigure language={language} />
    },
    {
        id: 'between',
        stage: 'order',
        title: say('Bi zatikiren arteko zatikiak', 'Fracciones entre dos fracciones', 'كسور بين كسرين'),
        goal: say('Bi zatikiren artean beste bat aurkitzea: arrazionalen dentsitatea.', 'Encontrar una fracción entre otras dos: la densidad de los racionales.', 'إيجاد كسر بين كسرين: كثافة الأعداد النسبية.'),
        explanation: say(
            'Bi zatiki desberdinen artean beti dago beste zatiki bat. Modurik errazena erdiko puntua da: batu eta zatitu 2z, $\\frac{1}{2}\\left(\\frac{a}{b}+\\frac{c}{d}\\right)$. Beste modu bat: jarri izendatzaile bera eta, tartean zenbakitzailerik ez badago, anplifikatu biak (adibidez 10ez) hutsunea irekitzeko. Prozesua amaigabe errepika daitekeenez, bi zatikiren artean infinitu zatiki daude.',
            'Entre dos fracciones distintas siempre hay otra fracción. La forma más sencilla es el punto medio: suma y divide entre 2, $\\frac{1}{2}\\left(\\frac{a}{b}+\\frac{c}{d}\\right)$. Otra forma: ponlas con el mismo denominador y, si no hay ningún numerador en medio, amplifica las dos (por ejemplo, por 10) para abrir hueco. Como el proceso se puede repetir sin fin, entre dos fracciones hay infinitas fracciones.',
            'بين كسرين مختلفين يوجد دائمًا كسر آخر. وأبسط طريقة نقطة المنتصف: اجمع واقسم على 2، $\\frac{1}{2}\\left(\\frac{a}{b}+\\frac{c}{d}\\right)$. وطريقة أخرى: وحّد المقامين، فإذا لم يكن بينهما بسط فوسّع الكسرين (مثلًا في 10) لفتح فراغ. ولأن العملية تتكرر بلا نهاية ففي ما بين كسرين كسور لا نهائية.'
        ),
        problem: say('Aurkitu $\\frac{4}{5}$ eta $\\frac{7}{8}$ arteko zatiki bat.', 'Encuentra una fracción entre $\\frac{4}{5}$ y $\\frac{7}{8}$.', 'جد كسرًا بين $\\frac{4}{5}$ و$\\frac{7}{8}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu.', 'Suma.', 'اجمع.'), math: same('$\\frac{4}{5}+\\frac{7}{8}=\\frac{32+35}{40}=\\frac{67}{40}$') },
            { text: say('Zatitu 2z.', 'Divide entre 2.', 'اقسم على 2.'), math: same('$\\frac{67}{40}:2=\\frac{67}{80}$') },
            { text: say('Egiaztatu.', 'Comprueba.', 'تحقق.'), math: same('$\\frac{64}{80}<\\frac{67}{80}<\\frac{70}{80}$') }
        ],
        example: same('$\\frac{7}{6}<\\frac{15}{12}<\\frac{8}{6}$'),
        takeaway: say('Erdiko puntua: batu eta zatitu 2z. Beti dago beste bat.', 'El punto medio: suma y divide entre 2. Siempre hay otra.', 'نقطة المنتصف: اجمع واقسم على 2. يوجد دائمًا كسر آخر.'),
        figure: (language) => <OrderDensityFigure language={language} />
    },
    {
        id: 'add-sub',
        stage: 'operations',
        title: say('Batuketa eta kenketa', 'Suma y resta', 'الجمع والطرح'),
        goal: say('Zatikiak eta zenbaki osoak batu eta kentzea, zeinuak zainduz.', 'Sumar y restar fracciones y enteros cuidando los signos.', 'جمع الكسور والأعداد الصحيحة وطرحها مع مراعاة الإشارات.'),
        explanation: say(
            'Izendatzaile bera badute, batu edo kendu zenbakitzaileak eta utzi izendatzailea. Bestela, bihurtu izendatzaile komuneko zatiki baliokide (m.k.t.) eta gero eragin. Zenbaki oso bat zatiki gisa idazten da: $3=\\frac{3}{1}$. Zeinuak zenbaki osoekin bezala: $\\frac{5}{9}+\\frac{3}{10}-3=\\frac{50+27-270}{90}=-\\frac{193}{90}$. Amaitzeko, sinplifikatu.',
            'Si tienen el mismo denominador, se suman o restan los numeradores y se deja el denominador. Si no, se pasan a fracciones equivalentes con denominador común (el m.c.m.) y después se opera. Un entero se escribe como fracción: $3=\\frac{3}{1}$. Los signos, como con los enteros: $\\frac{5}{9}+\\frac{3}{10}-3=\\frac{50+27-270}{90}=-\\frac{193}{90}$. Al final, simplifica.',
            'إذا كان المقام واحدًا نجمع البسوط أو نطرحها ونترك المقام. وإلا نحوّل إلى كسور مكافئة بمقام مشترك (م.م.أ.) ثم نجري العملية. ويُكتب العدد الصحيح كسرًا: $3=\\frac{3}{1}$. والإشارات كما في الأعداد الصحيحة: $\\frac{5}{9}+\\frac{3}{10}-3=\\frac{50+27-270}{90}=-\\frac{193}{90}$. وفي النهاية بسّط.'
        ),
        problem: same('$\\frac{25}{6}-\\frac{11}{8}+\\frac{1}{3}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('m.k.t.(6, 8, 3) = 24.', 'm.c.m.(6, 8, 3) = 24.', 'م.م.أ.(6، 8، 3) = 24.'), math: same('$\\frac{100}{24}-\\frac{33}{24}+\\frac{8}{24}$') },
            { text: say('Eragin zenbakitzaileekin.', 'Opera los numeradores.', 'أجرِ العمليات على البسوط.'), math: same('$\\frac{100-33+8}{24}=\\frac{75}{24}$') },
            { text: say('Sinplifikatu 3z.', 'Simplifica entre 3.', 'اختزل على 3.'), math: same('$\\frac{75}{24}=\\frac{25}{8}$') }
        ],
        example: same('$-5-\\frac{1}{9}+\\frac{1}{12}=\\frac{-180-4+3}{36}=-\\frac{181}{36}$'),
        takeaway: say('Izendatzaile komuna lehenik; gero zenbakitzaileekin eragin.', 'Primero el denominador común; después opera los numeradores.', 'المقام المشترك أولًا ثم العمليات على البسوط.'),
        figure: (language) => <AddFigure language={language} />
    },
    {
        id: 'mul-div',
        stage: 'operations',
        title: say('Biderketa eta zatiketa', 'Multiplicación y división', 'الضرب والقسمة'),
        goal: say('Zatikiak biderkatu eta zatitzea, sinplifikatuz eta zeinuak zainduz.', 'Multiplicar y dividir fracciones simplificando y cuidando los signos.', 'ضرب الكسور وقسمتها مع الاختزال ومراعاة الإشارات.'),
        explanation: say(
            'Biderkatzeko, zenbakitzaileak elkarren artean eta izendatzaileak elkarren artean: $\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{a\\cdot c}{b\\cdot d}$. Zatitzeko, gurutzean biderkatu: $\\frac{a}{b}:\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$, hau da, biderkatu bigarrenaren alderantzizkoaz. Zeinuak zenbaki osoetan bezala: berdinak → +, desberdinak → −. Komeni da biderkatu aurretik sinplifikatzea, zenbaki txikiagoekin lan egiteko.',
            'Para multiplicar, numeradores entre sí y denominadores entre sí: $\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{a\\cdot c}{b\\cdot d}$. Para dividir, se multiplica en cruz: $\\frac{a}{b}:\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$, es decir, por el inverso de la segunda. Los signos, como en los enteros: iguales → +, distintos → −. Conviene simplificar antes de multiplicar, para trabajar con números más pequeños.',
            'للضرب نضرب البسطين معًا والمقامين معًا: $\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{a\\cdot c}{b\\cdot d}$. وللقسمة نضرب تبادليًا: $\\frac{a}{b}:\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$ أي في مقلوب الثاني. والإشارات كما في الأعداد الصحيحة: متشابهة ← + ومختلفة ← −. ويحسن الاختزال قبل الضرب للعمل بأعداد أصغر.'
        ),
        problem: same('$\\frac{9}{12}\\cdot\\frac{4}{21}\\cdot\\frac{7}{33}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi zatiki bakarrean.', 'Escríbelo en una sola fracción.', 'اكتبه كسرًا واحدًا.'), math: same('$\\frac{9\\cdot 4\\cdot 7}{12\\cdot 21\\cdot 33}$') },
            { text: say('Sinplifikatu faktoreak: 9 eta 33 (3), 4 eta 12 (4), 7 eta 21 (7).', 'Simplifica factores: 9 y 33 (3), 4 y 12 (4), 7 y 21 (7).', 'اختزل العوامل: 9 و33 (3)، 4 و12 (4)، 7 و21 (7).'), math: same('$\\frac{3\\cdot 1\\cdot 1}{3\\cdot 3\\cdot 11}$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.'), math: same('$\\frac{1}{33}$') }
        ],
        example: same('$\\frac{-4}{5}\\cdot\\frac{20}{8}=-2\\qquad\\frac{9}{10}:\\frac{8}{14}=\\frac{63}{40}$'),
        takeaway: say('Biderkatu zuzenean; zatitzeko, gurutzean. Sinplifikatu lehenik.', 'Multiplica en línea; para dividir, en cruz. Simplifica antes.', 'اضرب مباشرة؛ وللقسمة تبادليًا. اختزل أولًا.'),
        figure: (language) => <AreaFigure language={language} />
    },
    {
        id: 'combined',
        stage: 'operations',
        title: say('Eragiketa konbinatuak', 'Operaciones combinadas', 'العمليات المركبة'),
        goal: say('Eragiketa konbinatuak hierarkia errespetatuz ebaztea.', 'Resolver operaciones combinadas respetando la jerarquía.', 'حل العمليات المركبة مع احترام الأولويات.'),
        explanation: say(
            'Eragiketa konbinatuetan ordena hau da: lehenik parentesiak (barrukoenetik hasita), gero biderketak eta zatiketak, eta azkenik batuketak eta kenketak. Maila bereko eragiketak ezkerretik eskuinera egiten dira. Parentesien lekuak emaitza aldatzen du: $\\frac{3}{2}-\\frac{4}{5}\\cdot\\frac{5}{6}=\\frac{5}{6}$, baina $\\left(\\frac{3}{2}-\\frac{4}{5}\\right)\\cdot\\frac{5}{6}=\\frac{7}{12}$.',
            'En las operaciones combinadas el orden es: primero los paréntesis (empezando por los de dentro), después multiplicaciones y divisiones y, por último, sumas y restas. Las operaciones del mismo nivel se hacen de izquierda a derecha. La posición de los paréntesis cambia el resultado: $\\frac{3}{2}-\\frac{4}{5}\\cdot\\frac{5}{6}=\\frac{5}{6}$, pero $\\left(\\frac{3}{2}-\\frac{4}{5}\\right)\\cdot\\frac{5}{6}=\\frac{7}{12}$.',
            'في العمليات المركبة الترتيب هو: الأقواس أولًا (بدءًا بالداخلية)، ثم الضرب والقسمة، وأخيرًا الجمع والطرح. وتُجرى العمليات من المستوى نفسه من اليسار إلى اليمين. ومكان الأقواس يغيّر النتيجة: $\\frac{3}{2}-\\frac{4}{5}\\cdot\\frac{5}{6}=\\frac{5}{6}$ لكن $\\left(\\frac{3}{2}-\\frac{4}{5}\\right)\\cdot\\frac{5}{6}=\\frac{7}{12}$.'
        ),
        problem: same('$\\frac{5}{3}:\\left(\\frac{1}{9}+\\frac{1}{6}\\right)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Parentesia: m.k.t. = 18.', 'El paréntesis: m.c.m. = 18.', 'القوس: م.م.أ. = 18.'), math: same('$\\frac{1}{9}+\\frac{1}{6}=\\frac{2+3}{18}=\\frac{5}{18}$') },
            { text: say('Zatiketa: gurutzean.', 'La división: en cruz.', 'القسمة: تبادليًا.'), math: same('$\\frac{5}{3}:\\frac{5}{18}=\\frac{5\\cdot 18}{3\\cdot 5}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.'), math: same('$\\frac{90}{15}=6$') }
        ],
        example: same('$\\frac{11}{6}-\\left(\\frac{1}{4}+\\frac{1}{6}\\right)\\cdot 6=\\frac{11}{6}-\\frac{5}{2}=-\\frac{2}{3}$'),
        takeaway: say('Parentesiak → biderketak eta zatiketak → batuketak eta kenketak.', 'Paréntesis → multiplicaciones y divisiones → sumas y restas.', 'الأقواس ← الضرب والقسمة ← الجمع والطرح.'),
        figure: (language) => <FractionOpsFigure language={language} />
    },
    {
        id: 'decimal-kinds',
        stage: 'decimals',
        title: say('Zatikiak eta zenbaki hamartarrak', 'Fracciones y números decimales', 'الكسور والأعداد العشرية'),
        goal: say('Zatiki batek ematen duen hamartar mota sailkatzea, zatiketa egin gabe.', 'Clasificar el decimal que da una fracción sin hacer la división.', 'تصنيف العشري الذي يعطيه كسر دون إجراء القسمة.'),
        explanation: say(
            'Zatiki bat hamartar bihurtzeko, zatitu zenbakitzailea izendatzaileaz. Hiru aukera daude: zehatza (hamartar kopuru mugatua), periodiko hutsa (periodoa komaren ondoren hasten da) edo periodiko mistoa (aurreperiodoa eta gero periodoa). Zatiketa egin gabe ere jakin daiteke: sinplifikatu eta deskonposatu izendatzailea. 2 eta 5 bakarrik baditu, zehatza; ez 2 ez 5, hutsa; 2 edo 5 eta beste faktore bat, mistoa. Hamartar zehatz eta periodiko guztiak arrazionalak dira; infinitu zifra periodorik gabe dituztenak ($1{,}121122111222\\ldots$) ez.',
            'Para pasar una fracción a decimal, divide el numerador entre el denominador. Hay tres posibilidades: exacto (número finito de decimales), periódico puro (el periodo empieza justo después de la coma) o periódico mixto (anteperiodo y después periodo). También se puede saber sin dividir: simplifica y descompón el denominador. Si solo tiene 2 y 5, es exacto; si no tiene ni 2 ni 5, puro; si tiene 2 o 5 y otro factor, mixto. Todos los decimales exactos y periódicos son racionales; los que tienen infinitas cifras sin periodo ($1{,}121122111222\\ldots$), no.',
            'لتحويل كسر إلى عشري اقسم البسط على المقام. وهناك ثلاثة احتمالات: منتهٍ (عدد منتهٍ من المنازل)، أو دوري بحت (يبدأ الدور بعد الفاصلة مباشرة)، أو دوري مختلط (جزء غير دوري ثم الدور). ويمكن معرفة ذلك دون قسمة: اختزل الكسر وحلّل المقام. إذا لم يكن فيه إلا 2 و5 فهو منتهٍ، وإذا لم يكن فيه 2 ولا 5 فدوري بحت، وإذا كان فيه 2 أو 5 مع عامل آخر فدوري مختلط. وكل العشريات المنتهية والدورية نسبية؛ أما ذات المنازل اللانهائية بلا دور ($1{,}121122111222\\ldots$) فلا.'
        ),
        problem: say('Sailkatu, zatitu gabe: $\\frac{18}{300}$, $\\frac{7}{210}$ eta $\\frac{9}{40}$.', 'Clasifica sin dividir: $\\frac{18}{300}$, $\\frac{7}{210}$ y $\\frac{9}{40}$.', 'صنّف دون قسمة: $\\frac{18}{300}$ و$\\frac{7}{210}$ و$\\frac{9}{40}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sinplifikatu eta deskonposatu.', 'Simplifica y descompón.', 'اختزل وحلّل.'), math: same('$\\frac{18}{300}=\\frac{3}{50}=\\frac{3}{2\\cdot 5^{2}}$') },
            { text: say('2 eta 5 bakarrik: zehatza. Hurrengoa: 3 ere badu: periodikoa.', 'Solo 2 y 5: exacto. El siguiente tiene también un 3: periódico.', 'فقط 2 و5: منتهٍ. والتالي فيه 3 أيضًا: دوري.'), math: same('$\\frac{7}{210}=\\frac{1}{30}=\\frac{1}{2\\cdot 3\\cdot 5}$') },
            { text: say('$40=2^{3}\\cdot 5$: zehatza.', '$40=2^{3}\\cdot 5$: exacto.', '$40=2^{3}\\cdot 5$: منتهٍ.'), math: same('$\\frac{9}{40}=0{,}225$') }
        ],
        example: same('$\\frac{13}{6}=2{,}1\\overline{6}\\qquad\\frac{4}{99}=0{,}\\overline{04}\\qquad\\frac{73}{8}=9{,}125$'),
        takeaway: say('Izendatzaile laburtezinean 2 eta 5 bakarrik → zehatza; bestela, periodikoa.', 'Denominador irreducible con solo 2 y 5 → exacto; si no, periódico.', 'مقام غير قابل للاختزال فيه 2 و5 فقط ← منتهٍ؛ وإلا فدوري.'),
        figure: (language) => <DecimalKindsFigure language={language} />
    },
    {
        id: 'exact-generatrix',
        stage: 'decimals',
        title: say('Hamartar zehatz baten zatikia', 'La fracción de un decimal exacto', 'كسر العشري المنتهي'),
        goal: say('Hamartar zehatz baten zatiki sortzailea lortzea.', 'Obtener la fracción generatriz de un decimal exacto.', 'إيجاد الكسر المولّد لعشري منتهٍ.'),
        explanation: say(
            'Hamartar zehatz baten zatiki sortzailea: zenbakitzailean, komarik gabeko zenbakia; izendatzailean, 1 eta hamartar adina zero. Gero, sinplifikatu. Adibidez, $3{,}2=\\frac{32}{10}=\\frac{16}{5}$ eta $0{,}0016=\\frac{16}{10\\,000}=\\frac{1}{625}$. Zero ezkerrean dauden zifrak ez dira zenbakitzailean idazten, baina bai zenbatzen dira hamartar gisa.',
            'La fracción generatriz de un decimal exacto tiene como numerador el número sin la coma, y como denominador un 1 seguido de tantos ceros como decimales. Después, simplifica. Por ejemplo, $3{,}2=\\frac{32}{10}=\\frac{16}{5}$ y $0{,}0016=\\frac{16}{10\\,000}=\\frac{1}{625}$. Los ceros de la izquierda no se escriben en el numerador, pero sí cuentan como decimales.',
            'الكسر المولّد لعشري منتهٍ: بسطه العدد دون فاصلة، ومقامه 1 تتبعه أصفار بعدد المنازل العشرية. ثم بسّط. مثلًا $3{,}2=\\frac{32}{10}=\\frac{16}{5}$ و$0{,}0016=\\frac{16}{10\\,000}=\\frac{1}{625}$. الأصفار على اليسار لا تُكتب في البسط لكنها تُعدّ منازل عشرية.'
        ),
        problem: say('Idatzi $35{,}47$ eta $0{,}375$ zatiki gisa.', 'Escribe $35{,}47$ y $0{,}375$ como fracción.', 'اكتب $35{,}47$ و$0{,}375$ كسرين.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi hamartar → 100.', 'Dos decimales → 100.', 'منزلتان ← 100.'), math: same('$35{,}47=\\frac{3547}{100}$') },
            { text: say('Hiru hamartar → 1000.', 'Tres decimales → 1000.', 'ثلاث منازل ← 1000.'), math: same('$0{,}375=\\frac{375}{1000}$') },
            { text: say('Sinplifikatu 125ez.', 'Simplifica entre 125.', 'اختزل على 125.'), math: same('$\\frac{375}{1000}=\\frac{3}{8}$') }
        ],
        example: same('$-3{,}65=-\\frac{365}{100}=-\\frac{73}{20}$'),
        takeaway: say('Komarik gabeko zenbakia zati 1 eta hamartar adina zero.', 'El número sin coma entre un 1 y tantos ceros como decimales.', 'العدد دون فاصلة على 1 وأصفار بعدد المنازل.'),
        figure: (language) => <ExactFractionFigure language={language} />
    },
    {
        id: 'periodic-generatrix',
        stage: 'decimals',
        title: say('Hamartar periodiko baten zatikia', 'La fracción de un decimal periódico', 'كسر العشري الدوري'),
        goal: say('Hamartar periodiko huts edo misto baten zatiki sortzailea lortzea.', 'Obtener la fracción generatriz de un decimal periódico puro o mixto.', 'إيجاد الكسر المولّد لعشري دوري بحت أو مختلط.'),
        explanation: say(
            'Zenbakitzailea: zenbaki osoa (koma eta periodoaren marka gabe) ken periodoaren aurreko zatia. Izendatzailea: 9 bat periodoko zifra bakoitzeko eta, gero, 0 bat aurreperiodoko zifra bakoitzeko. Periodiko hutsetan ez dago zerorik: $13{,}\\overline{46}=\\frac{1346-13}{99}=\\frac{1333}{99}$. Periodiko mistoetan bai: $3{,}4\\overline{5}=\\frac{345-34}{90}=\\frac{311}{90}$. Sinplifikatu amaieran.',
            'Numerador: el número entero (sin coma ni marca de periodo) menos la parte anterior al periodo. Denominador: un 9 por cada cifra del periodo seguido de un 0 por cada cifra del anteperiodo. En los periódicos puros no hay ceros: $13{,}\\overline{46}=\\frac{1346-13}{99}=\\frac{1333}{99}$. En los mixtos sí: $3{,}4\\overline{5}=\\frac{345-34}{90}=\\frac{311}{90}$. Al final, simplifica.',
            'البسط: العدد كاملًا (دون فاصلة ولا علامة دور) ناقص الجزء الذي قبل الدور. والمقام: 9 لكل رقم في الدور تتبعها 0 لكل رقم في الجزء غير الدوري. وفي الدوري البحت لا أصفار: $13{,}\\overline{46}=\\frac{1346-13}{99}=\\frac{1333}{99}$. وفي المختلط توجد: $3{,}4\\overline{5}=\\frac{345-34}{90}=\\frac{311}{90}$. وفي النهاية بسّط.'
        ),
        problem: say('Idatzi $0{,}12\\overline{58}$ zatiki gisa.', 'Escribe $0{,}12\\overline{58}$ como fracción.', 'اكتب $0{,}12\\overline{58}$ كسرًا.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbakitzailea.', 'Numerador.', 'البسط.'), math: same('$1258-12=1246$') },
            { text: say('Periodoa 2 zifra (99), aurreperiodoa 2 zifra (00).', 'Periodo de 2 cifras (99), anteperiodo de 2 (00).', 'دور من رقمين (99) وجزء غير دوري من رقمين (00).'), math: same('$\\frac{1246}{9900}$') },
            { text: say('Sinplifikatu 2z.', 'Simplifica entre 2.', 'اختزل على 2.'), math: same('$\\frac{1246}{9900}=\\frac{623}{4950}$') }
        ],
        example: same('$0{,}\\overline{08}=\\frac{8}{99}\\qquad 0{,}00\\overline{7}=\\frac{7}{900}$'),
        takeaway: say('Guztia ken periodoaren aurrekoa; 9ak periodoarentzat, 0ak aurreperiodoarentzat.', 'Todo menos lo anterior al periodo; nueves por el periodo, ceros por el anteperiodo.', 'الكل ناقص ما قبل الدور؛ تسعات للدور وأصفار لما قبله.'),
        figure: (language) => <PeriodicFractionFigure language={language} />
    },
    {
        id: 'fraction-of',
        stage: 'problems',
        title: say('Kantitate baten zatikia', 'Fracción de una cantidad', 'كسر من كمية'),
        goal: say('Kantitate baten zatikia eta zatiki baten zatikia kalkulatzea.', 'Calcular la fracción de una cantidad y la fracción de una fracción.', 'حساب كسر من كمية وكسر من كسر.'),
        explanation: say(
            'Kantitate baten $\\frac{a}{b}$ kalkulatzeko, zatitu kantitatea $b$-z eta biderkatu $a$-z: $\\frac{3}{8}\\cdot 120=45$. Zatiki baten zatikia biderketa bat da: $\\frac{2}{3}$-ren $\\frac{3}{4}$ $\\frac{3}{4}\\cdot\\frac{2}{3}=\\frac{1}{2}$ da. Eguneroko egoeretan asko erabiltzen da: ura, energia, dirua…: $\\frac{3}{7}\\cdot 15\\approx 6{,}43$ m³.',
            'Para calcular $\\frac{a}{b}$ de una cantidad, divide la cantidad entre $b$ y multiplica por $a$: $\\frac{3}{8}\\cdot 120=45$. La fracción de una fracción es un producto: $\\frac{3}{4}$ de $\\frac{2}{3}$ es $\\frac{3}{4}\\cdot\\frac{2}{3}=\\frac{1}{2}$. Se usa mucho en situaciones cotidianas: agua, energía, dinero…: $\\frac{3}{7}\\cdot 15\\approx 6{,}43$ m³.',
            'لحساب $\\frac{a}{b}$ من كمية اقسم الكمية على $b$ واضرب في $a$: $\\frac{3}{8}\\cdot 120=45$. وكسر من كسر حاصل ضرب: $\\frac{3}{4}$ من $\\frac{2}{3}$ هو $\\frac{3}{4}\\cdot\\frac{2}{3}=\\frac{1}{2}$. ويُستعمل كثيرًا في الحياة اليومية: الماء والطاقة والمال…: $\\frac{3}{7}\\cdot 15\\approx 6{,}43$ م³.'
        ),
        problem: say('Etxe batek 9600 kWh kontsumitzen ditu urtean, eta horren $\\frac{3}{5}$ berokuntzan. Zenbat kWh?', 'Una casa consume 9600 kWh al año, y $\\frac{3}{5}$ en calefacción. ¿Cuántos kWh?', 'يستهلك بيت 9600 ك.و.س في السنة، و$\\frac{3}{5}$ منها للتدفئة. كم ك.و.س؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu 5ez.', 'Divide entre 5.', 'اقسم على 5.'), math: same('$9600:5=1920$') },
            { text: say('Biderkatu 3z.', 'Multiplica por 3.', 'اضرب في 3.'), math: same('$1920\\cdot 3=5760$') }
        ],
        example: same('$\\frac{2}{5}\\cdot\\frac{5}{6}\\cdot 60=\\frac{1}{3}\\cdot 60=20$'),
        takeaway: say('"-ren" zatikia → biderkatu.', 'La fracción "de" → multiplica.', 'الكسر "من" ← اضرب.'),
        figure: (language) => <FractionOfFigure language={language} />
    },
    {
        id: 'remaining',
        stage: 'problems',
        title: say('Geratzen den zatia', 'La parte que queda', 'الجزء الباقي'),
        goal: say('Zatiki jarraituak dituzten problemak ebaztea: gainerakoaren zatikia.', 'Resolver problemas de fracciones sucesivas: la fracción de lo que queda.', 'حل مسائل الكسور المتتالية: كسر الباقي.'),
        explanation: say(
            'Problema askotan, lehen zatia kendu ondoren, bigarren zatikia gainerakoaren gainean kalkulatzen da. Lehenik, kalkulatu geratzen den zatia: $1-\\frac{3}{8}=\\frac{5}{8}$. Gero, "gainerakoaren $\\frac{2}{5}$" $\\frac{2}{5}\\cdot\\frac{5}{8}=\\frac{1}{4}$ da osoarekiko. Azkenik, kendu biak osoari: $1-\\frac{3}{8}-\\frac{1}{4}=\\frac{3}{8}$. Ez batu zuzenean $\\frac{3}{8}+\\frac{2}{5}$: zatikiak ez daude oso beraren gainean.',
            'En muchos problemas, después de quitar una primera parte, la segunda fracción se calcula sobre lo que queda. Primero, calcula la parte que queda: $1-\\frac{3}{8}=\\frac{5}{8}$. Después, "$\\frac{2}{5}$ de lo que queda" es $\\frac{2}{5}\\cdot\\frac{5}{8}=\\frac{1}{4}$ del total. Por último, resta las dos del total: $1-\\frac{3}{8}-\\frac{1}{4}=\\frac{3}{8}$. No sumes directamente $\\frac{3}{8}+\\frac{2}{5}$: las fracciones no son del mismo total.',
            'في مسائل كثيرة، بعد إزالة جزء أول، يُحسب الكسر الثاني من الباقي. أولًا احسب الجزء الباقي: $1-\\frac{3}{8}=\\frac{5}{8}$. ثم "$\\frac{2}{5}$ من الباقي" هو $\\frac{2}{5}\\cdot\\frac{5}{8}=\\frac{1}{4}$ من الكل. وأخيرًا اطرحهما من الكل: $1-\\frac{3}{8}-\\frac{1}{4}=\\frac{3}{8}$. لا تجمع مباشرة $\\frac{3}{8}+\\frac{2}{5}$: فالكسران ليسا من الكل نفسه.'
        ),
        problem: say('Soldataren $\\frac{1}{3}$ alokairuan gastatzen da eta gainerakoaren $\\frac{1}{4}$ janarian. 1800 € badira, zenbat geratzen da?', 'Se gasta $\\frac{1}{3}$ del sueldo en el alquiler y $\\frac{1}{4}$ de lo que queda en comida. Si son 1800 €, ¿cuánto queda?', 'يُنفَق $\\frac{1}{3}$ من الراتب على الإيجار و$\\frac{1}{4}$ من الباقي على الطعام. إذا كان الراتب 1800 € فكم يبقى؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alokairuaren ondoren geratzen dena.', 'Lo que queda tras el alquiler.', 'الباقي بعد الإيجار.'), math: same('$1-\\frac{1}{3}=\\frac{2}{3}$') },
            { text: say('Janaria, osoarekiko.', 'La comida, respecto al total.', 'الطعام بالنسبة إلى الكل.'), math: same('$\\frac{1}{4}\\cdot\\frac{2}{3}=\\frac{1}{6}$') },
            { text: say('Geratzen dena.', 'Lo que queda.', 'الباقي.'), math: same('$1-\\frac{1}{3}-\\frac{1}{6}=\\frac{1}{2}\\ \\to\\ \\frac{1}{2}\\cdot 1800=900$') }
        ],
        example: same('$\\frac{2}{3}\\cdot\\frac{3}{4}=\\frac{1}{2}$'),
        takeaway: say('"Gainerakoaren" zatikia: biderkatu geratzen den zatiaz.', 'La fracción "de lo que queda": multiplica por la parte que queda.', 'كسر "من الباقي": اضرب في الجزء الباقي.'),
        figure: (language) => <RemainingFigure language={language} />
    },
    {
        id: 'whole-from-part',
        stage: 'problems',
        title: say('Osoa zati batetik', 'El total a partir de una parte', 'الكل انطلاقًا من جزء'),
        goal: say('Zati bat eta haren zatikia ezagututa, osoa kalkulatzea.', 'Calcular el total conociendo una parte y su fracción.', 'حساب الكل بمعرفة جزء وكسره.'),
        explanation: say(
            'Osoaren $\\frac{a}{b}$ kantitate jakin bat bada, zatitu kantitate hori $a$-z zati bat (osoaren $\\frac{1}{b}$) lortzeko, eta biderkatu $b$-z: osoaren $\\frac{3}{8}$ 45 badira, $\\frac{1}{8}$ 15 da eta osoa $15\\cdot 8=120$. Ekuazio gisa: $\\frac{3}{8}\\cdot x=45$, beraz $x=45:\\frac{3}{8}=\\frac{45\\cdot 8}{3}=120$. Zatiki jarraituekin, kalkulatu lehenik zatiki osoa.',
            'Si los $\\frac{a}{b}$ del total son una cantidad, divide esa cantidad entre $a$ para tener una parte ($\\frac{1}{b}$ del total) y multiplica por $b$: si los $\\frac{3}{8}$ son 45, $\\frac{1}{8}$ es 15 y el total, $15\\cdot 8=120$. Como ecuación: $\\frac{3}{8}\\cdot x=45$, así que $x=45:\\frac{3}{8}=\\frac{45\\cdot 8}{3}=120$. Con fracciones sucesivas, calcula primero la fracción total.',
            'إذا كان $\\frac{a}{b}$ من الكل كمية معينة فاقسم هذه الكمية على $a$ لتحصل على جزء ($\\frac{1}{b}$ من الكل) ثم اضرب في $b$: إذا كان $\\frac{3}{8}$ يساوي 45 فإن $\\frac{1}{8}$ يساوي 15 والكل $15\\cdot 8=120$. وكمعادلة: $\\frac{3}{8}\\cdot x=45$ إذن $x=45:\\frac{3}{8}=\\frac{45\\cdot 8}{3}=120$. ومع الكسور المتتالية احسب الكسر الكلي أولًا.'
        ),
        problem: say('Ur-depositu baten $\\frac{2}{7}$ hustu da eta 35 L geratzen dira. Zenbat litro sartzen dira depositu osoan?', 'Se ha vaciado $\\frac{2}{7}$ de un depósito y quedan 35 L. ¿Cuántos litros caben en el depósito?', 'أُفرغ $\\frac{2}{7}$ من خزان وبقي 35 لترًا. كم لترًا يتسع الخزان؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Geratzen den zatia.', 'La parte que queda.', 'الجزء الباقي.'), math: same('$1-\\frac{2}{7}=\\frac{5}{7}$') },
            { text: say('Zazpiren bat.', 'Un séptimo.', 'سُبع واحد.'), math: same('$35:5=7$') },
            { text: say('Osoa.', 'El total.', 'الكل.'), math: same('$7\\cdot 7=49$') }
        ],
        example: same('$\\frac{3}{8}\\cdot x=45\\ \\to\\ x=\\frac{45\\cdot 8}{3}=120$'),
        takeaway: say('Zatitu zenbakitzaileaz, biderkatu izendatzaileaz.', 'Divide entre el numerador, multiplica por el denominador.', 'اقسم على البسط واضرب في المقام.'),
        figure: (language) => <WholeFigure language={language} />
    }
]

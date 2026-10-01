import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    DecimalKindsFigure,
    ErrorsFigure,
    ExactFractionFigure,
    FractionAmountFigure,
    FractionOpsFigure,
    IntervalsFigure,
    IrrationalFigure,
    NumberSetsFigure,
    PeriodicFractionFigure,
    PowersFigure,
    RadicalOpsFigure,
    RealLineFigure,
    RootsFigure,
    RoundingFigure,
    ScientificFigure,
    ScientificOpsFigure,
    SimplifyFigure
} from './figures'

/* ==========================================================================
   Zenbaki errealak · 4. DBH (matematika aplikatuak) — stages and lessons.
   Sequence follows the class textbook (Santillana 4.º ESO Aplicadas unit 1,
   "Números racionales e irracionales": fractions, decimals, irrationals,
   approximations and errors, powers, scientific notation, the real line and
   intervals) with Anaya 4.º ESO Aplicadas unit 3 ("Números reales": roots
   and radicals, which complete the real numbers of the course).
   ========================================================================== */

export type RealsStageId = 'rational' | 'decimals' | 'reals' | 'approx' | 'radicals'

export const realsStages: UnitStage[] = [
    { id: 'rational', tone: 'blue', title: { eu: 'Zenbaki arrazionalak', es: 'Números racionales', ar: 'الأعداد النسبية' } },
    { id: 'decimals', tone: 'violet', title: { eu: 'Hamartarrak eta zatikiak', es: 'Decimales y fracciones', ar: 'الأعداد العشرية والكسور' } },
    { id: 'reals', tone: 'mustard', title: { eu: 'Irrazionalak eta zuzen erreala', es: 'Irracionales y recta real', ar: 'غير النسبية والمستقيم الحقيقي' } },
    { id: 'approx', tone: 'coral', title: { eu: 'Hurbilketak eta idazkera zientifikoa', es: 'Aproximaciones y notación científica', ar: 'التقريب والترميز العلمي' } },
    { id: 'radicals', tone: 'green', title: { eu: 'Erroak eta erradikalak', es: 'Raíces y radicales', ar: 'الجذور والجذريات' } }
]

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const realsTopics: UnitTopic[] = [
    {
        id: 'fraction-amount',
        stage: 'rational',
        title: say('Zatikiak: kantitate baten zatikia eta konparazioa', 'Fracciones: fracción de una cantidad y comparación', 'الكسور: كسر من كمية والمقارنة'),
        goal: say('Kantitate baten zatikia kalkulatzea eta zatikiak izendatzaile komuna erabiliz konparatzea.', 'Calcular la fracción de una cantidad y comparar fracciones con un denominador común.', 'حساب كسر من كمية ومقارنة الكسور بمقام مشترك.'),
        explanation: say(
            'Zenbaki arrazionala bi zenbaki osoren zatidura gisa idatz daitekeena da: $\\frac{a}{b}$, $b\\neq 0$ izanik. Kantitate baten $\\frac{a}{b}$ kalkulatzeko, zatitu kantitatea $b$-z eta biderkatu $a$-z. Bi zatiki konparatzeko, bihurtu izendatzaile bereko zatiki baliokide (izendatzaileen m.k.t. erabiliz) eta konparatu zenbakitzaileak.',
            'Un número racional es el que se puede escribir como cociente de dos enteros: $\\frac{a}{b}$, con $b\\neq 0$. Para calcular $\\frac{a}{b}$ de una cantidad, divide la cantidad entre $b$ y multiplica por $a$. Para comparar dos fracciones, conviértelas en fracciones equivalentes con el mismo denominador (el m.c.m. de los denominadores) y compara los numeradores.',
            'العدد النسبي هو الذي يمكن كتابته على صورة خارج قسمة عددين صحيحين: $\\frac{a}{b}$ حيث $b\\neq 0$. لحساب $\\frac{a}{b}$ من كمية اقسم الكمية على $b$ واضرب في $a$. ولمقارنة كسرين حوّلهما إلى كسرين مكافئين بالمقام نفسه (المضاعف المشترك الأصغر للمقامات) وقارن البسطين.'
        ),
        problem: say('Arturok 80 ateren $\\frac{2}{5}$ margotu ditu eta Celiak $\\frac{1}{2}$. Zenbat ate geratzen dira?', 'Arturo ha pintado $\\frac{2}{5}$ de 80 puertas y Celia $\\frac{1}{2}$. ¿Cuántas puertas quedan?', 'دهن أرتورو $\\frac{2}{5}$ من 80 بابًا ودهنت سيليا $\\frac{1}{2}$. كم بابًا بقي؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Arturo: zatitu 5ez eta biderkatu 2z.', 'Arturo: divide entre 5 y multiplica por 2.', 'أرتورو: اقسم على 5 واضرب في 2.'), math: '$\\frac{2}{5}\\cdot 80=\\frac{160}{5}=32$' },
            { text: say('Celia: 80ren erdia.', 'Celia: la mitad de 80.', 'سيليا: نصف 80.'), math: '$\\frac{1}{2}\\cdot 80=40$' },
            { text: say('Kendu biak guztiari.', 'Resta las dos cantidades del total.', 'اطرح الكميتين من المجموع.'), math: '$80-(32+40)=8$' }
        ],
        example: '$\\frac{8}{5}=\\frac{56}{35}>\\frac{15}{35}=\\frac{3}{7}$',
        takeaway: say('Kantitate baten zatikia: zatitu izendatzaileaz eta biderkatu zenbakitzaileaz.', 'Fracción de una cantidad: divide entre el denominador y multiplica por el numerador.', 'كسر من كمية: اقسم على المقام واضرب في البسط.'),
        figure: (language) => <FractionAmountFigure language={language} />
    },
    {
        id: 'fraction-ops',
        stage: 'rational',
        title: say('Eragiketak zatikiekin', 'Operaciones con fracciones', 'العمليات على الكسور'),
        goal: say('Zatikiekin batu, kendu, biderkatu eta zatitzea, eragiketen hierarkia errespetatuz.', 'Sumar, restar, multiplicar y dividir fracciones respetando la jerarquía de las operaciones.', 'جمع الكسور وطرحها وضربها وقسمتها مع احترام أولويات العمليات.'),
        explanation: say(
            'Batzeko eta kentzeko, izendatzaile komuna behar da. Biderkatzeko, zenbakitzaileak elkarren artean eta izendatzaileak elkarren artean biderkatzen dira; zatitzeko, gurutzean biderkatzen da: $\\frac{a}{b}:\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$. Eragiketa konbinatuetan, ordena hau da: parentesiak, berreturak, biderketak eta zatiketak, eta azkenik batuketak eta kenketak. Sinplifikatu emaitza.',
            'Para sumar y restar hace falta un denominador común. Para multiplicar, se multiplican los numeradores entre sí y los denominadores entre sí; para dividir, se multiplica en cruz: $\\frac{a}{b}:\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$. En las operaciones combinadas el orden es: paréntesis, potencias, multiplicaciones y divisiones y, por último, sumas y restas. Simplifica el resultado.',
            'للجمع والطرح نحتاج إلى مقام مشترك. وللضرب نضرب البسطين معًا والمقامين معًا؛ وللقسمة نضرب ضربًا تبادليًا: $\\frac{a}{b}:\\frac{c}{d}=\\frac{a\\cdot d}{b\\cdot c}$. وفي العمليات المركبة الترتيب: الأقواس ثم القوى ثم الضرب والقسمة وأخيرًا الجمع والطرح. بسّط النتيجة.'
        ),
        problem: same('$\\frac{2}{7}\\cdot\\left(\\frac{1}{4}-\\frac{3}{5}\\right)+1$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Parentesia lehenik: izendatzaile komuna 20.', 'Primero el paréntesis: denominador común 20.', 'القوس أولًا: المقام المشترك 20.'), math: '$\\frac{1}{4}-\\frac{3}{5}=\\frac{5-12}{20}=-\\frac{7}{20}$' },
            { text: say('Gero biderketa, eta sinplifikatu.', 'Después la multiplicación, y simplifica.', 'ثم الضرب وبسّط.'), math: '$\\frac{2}{7}\\cdot\\left(-\\frac{7}{20}\\right)=-\\frac{14}{140}=-\\frac{1}{10}$' },
            { text: say('Azkenik batuketa.', 'Por último la suma.', 'وأخيرًا الجمع.'), math: '$-\\frac{1}{10}+1=\\frac{9}{10}$' }
        ],
        example: '$\\frac{3}{4}:\\frac{9}{8}=\\frac{3\\cdot 8}{4\\cdot 9}=\\frac{24}{36}=\\frac{2}{3}$',
        takeaway: say('Parentesiak → berreturak → biderketak eta zatiketak → batuketak eta kenketak.', 'Paréntesis → potencias → multiplicaciones y divisiones → sumas y restas.', 'الأقواس ← القوى ← الضرب والقسمة ← الجمع والطرح.'),
        figure: (language) => <FractionOpsFigure language={language} />
    },
    {
        id: 'powers',
        stage: 'rational',
        title: say('Berretzaile osoko berreturak', 'Potencias de exponente entero', 'القوى ذات الأس الصحيح'),
        goal: say('Berretzaile negatiboko berreturak kalkulatzea eta berreturen propietateak zatikiekin erabiltzea.', 'Calcular potencias de exponente negativo y usar las propiedades de las potencias con fracciones.', 'حساب القوى ذات الأس السالب واستعمال خواص القوى مع الكسور.'),
        explanation: say(
            'Zatiki baten berretura kalkulatzeko, zenbakitzailea eta izendatzailea berretzen dira: $\\left(\\frac{a}{b}\\right)^{n}=\\frac{a^{n}}{b^{n}}$. Edozein zenbakiren (0 izan ezik) berretzaile 0ko berretura 1 da. Berretzaile negatiboak alderantzizkoa adierazten du: $a^{-n}=\\frac{1}{a^{n}}$ eta $\\left(\\frac{a}{b}\\right)^{-n}=\\left(\\frac{b}{a}\\right)^{n}$. Oinarri bereko berreturak biderkatzean berretzaileak batzen dira, zatitzean kendu, eta berretura baten berreturan biderkatu.',
            'Para elevar una fracción se elevan el numerador y el denominador: $\\left(\\frac{a}{b}\\right)^{n}=\\frac{a^{n}}{b^{n}}$. Cualquier número (salvo 0) elevado a 0 da 1. Un exponente negativo indica el inverso: $a^{-n}=\\frac{1}{a^{n}}$ y $\\left(\\frac{a}{b}\\right)^{-n}=\\left(\\frac{b}{a}\\right)^{n}$. Al multiplicar potencias de la misma base se suman los exponentes, al dividirlas se restan y en la potencia de una potencia se multiplican.',
            'لرفع كسر إلى قوة نرفع البسط والمقام: $\\left(\\frac{a}{b}\\right)^{n}=\\frac{a^{n}}{b^{n}}$. وأي عدد (عدا 0) مرفوع إلى 0 يساوي 1. والأس السالب يدل على المقلوب: $a^{-n}=\\frac{1}{a^{n}}$ و$\\left(\\frac{a}{b}\\right)^{-n}=\\left(\\frac{b}{a}\\right)^{n}$. وعند ضرب قوى لها الأساس نفسه نجمع الأسس، وعند قسمتها نطرحها، وفي قوة القوة نضربها.'
        ),
        problem: same('$\\left(\\frac{3}{2}\\right)^{-5}\\qquad \\left(-\\frac{5}{6}\\right)^{3}\\cdot\\left(-\\frac{5}{6}\\right)^{-2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berretzaile negatiboa: hartu alderantzizkoa.', 'Exponente negativo: toma el inverso.', 'الأس السالب: خذ المقلوب.'), math: '$\\left(\\frac{3}{2}\\right)^{-5}=\\left(\\frac{2}{3}\\right)^{5}=\\frac{32}{243}$' },
            { text: say('Oinarri bera: batu berretzaileak.', 'Misma base: suma los exponentes.', 'الأساس نفسه: اجمع الأسس.'), math: '$\\left(-\\frac{5}{6}\\right)^{3+(-2)}=\\left(-\\frac{5}{6}\\right)^{1}$' },
            { text: say('Berretzailea 1 da: oinarria bera.', 'El exponente es 1: la propia base.', 'الأس 1: الأساس نفسه.'), math: '$=-\\frac{5}{6}$' }
        ],
        example: '$\\left(\\frac{1}{5}\\right)^{-1}=5\\qquad \\left(-\\frac{8}{3}\\right)^{0}=1$',
        takeaway: say('Berretzaile negatiboa: zatikia buelta eman eta berretzailea positibo bihurtu.', 'Exponente negativo: da la vuelta a la fracción y el exponente pasa a positivo.', 'الأس السالب: اقلب الكسر ويصبح الأس موجبًا.'),
        figure: (language) => <PowersFigure language={language} />
    },
    {
        id: 'decimal-kinds',
        stage: 'decimals',
        title: say('Zatikitik hamartarrera', 'De fracción a decimal', 'من الكسر إلى العدد العشري'),
        goal: say('Zatiki baten adierazpen hamartarra lortzea eta zehatza, periodiko hutsa ala mistoa den esatea.', 'Obtener la expresión decimal de una fracción y decir si es exacta, periódica pura o mixta.', 'إيجاد الصورة العشرية لكسر وتحديد ما إذا كانت منتهية أو دورية بحتة أو مختلطة.'),
        explanation: say(
            'Zenbakitzailea izendatzaileaz zatitzean, hiru gauza gerta daitezke. Hondarra 0 bada, hamartar zehatza da ($\\frac{9}{5}=1{,}8$). Bestela, hondar bat errepikatzen da eta zifra batzuk behin eta berriz agertzen dira: periodoa. Periodoa komaren ondoren berehala hasten bada, periodiko hutsa da ($\\frac{2}{3}=0{,}\\overline{6}$); aurretik zifra batzuk badaude (aurreperiodoa), periodiko mistoa ($\\frac{11}{6}=1{,}8\\overline{3}$). Zatiki laburtezinaren izendatzaileak esaten du aurretik: 2 eta 5 bakarrik → zehatza; ez 2, ez 5 → hutsa; biak → mistoa.',
            'Al dividir el numerador entre el denominador pueden pasar tres cosas. Si el resto llega a 0, es un decimal exacto ($\\frac{9}{5}=1{,}8$). Si no, un resto se repite y unas cifras aparecen una y otra vez: el periodo. Si el periodo empieza justo después de la coma, es periódico puro ($\\frac{2}{3}=0{,}\\overline{6}$); si antes hay otras cifras (el anteperiodo), periódico mixto ($\\frac{11}{6}=1{,}8\\overline{3}$). El denominador de la fracción irreducible lo anuncia: solo 2 y 5 → exacto; ni 2 ni 5 → puro; de los dos tipos → mixto.',
            'عند قسمة البسط على المقام قد يحدث أحد ثلاثة أمور. إذا وصل الباقي إلى 0 فالعدد عشري منتهٍ ($\\frac{9}{5}=1{,}8$). وإلا تكرر باقٍ وظهرت أرقام مرة بعد مرة: إنها الدور. إذا بدأ الدور بعد الفاصلة مباشرة فهو دوري بحت ($\\frac{2}{3}=0{,}\\overline{6}$)؛ وإذا سبقته أرقام أخرى (ما قبل الدور) فهو دوري مختلط ($\\frac{11}{6}=1{,}8\\overline{3}$). ومقام الكسر غير القابل للاختزال يخبرنا مسبقًا: 2 و5 فقط ← منتهٍ؛ لا 2 ولا 5 ← بحت؛ من النوعين ← مختلط.'
        ),
        problem: say('Idatzi $\\frac{11}{6}$ hamartar gisa eta esan zer motatakoa den.', 'Escribe $\\frac{11}{6}$ como decimal y di de qué tipo es.', 'اكتب $\\frac{11}{6}$ عددًا عشريًا وقل ما نوعه.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu 11 : 6. Hondarrak: 5, 2, 2… 2 errepikatzen da.', 'Divide 11 : 6. Restos: 5, 2, 2… se repite el 2.', 'اقسم 11 : 6. البواقي: 5، 2، 2… يتكرر 2.'), math: same('$11:6=1{,}8333\\ldots$') },
            { text: say('8 behin agertzen da (aurreperiodoa) eta 3 errepikatzen da (periodoa).', 'El 8 aparece una vez (anteperiodo) y el 3 se repite (periodo).', 'يظهر 8 مرة واحدة (ما قبل الدور) ويتكرر 3 (الدور).'), math: same('$1{,}8\\overline{3}$') },
            { text: say('Izendatzailea $6=2\\cdot 3$: 2 eta beste faktore bat → mistoa.', 'Denominador $6=2\\cdot 3$: un 2 y otro factor → mixto.', 'المقام $6=2\\cdot 3$: 2 وعامل آخر ← مختلط.'), math: say('$\\to$ periodiko mistoa', '$\\to$ periódico mixto', '$\\to$ دوري مختلط') }
        ],
        example: same('$\\frac{8}{11}=0{,}\\overline{72}\\qquad \\frac{9}{5}=1{,}8$'),
        takeaway: say('Hondarra 0: zehatza. Hondar bat errepikatzen bada: periodikoa.', 'Resto 0: exacto. Si un resto se repite: periódico.', 'الباقي 0: منتهٍ. إذا تكرر باقٍ: دوري.'),
        figure: (language) => <DecimalKindsFigure language={language} />
    },
    {
        id: 'exact-to-fraction',
        stage: 'decimals',
        title: say('Hamartar zehatz baten zatikia', 'Fracción de un decimal exacto', 'كسر عدد عشري منتهٍ'),
        goal: say('Hamartar zehatz bat zatiki hamartar gisa idaztea eta sinplifikatzea.', 'Escribir un decimal exacto como fracción decimal y simplificarla.', 'كتابة عدد عشري منتهٍ على صورة كسر عشري وتبسيطه.'),
        explanation: say(
            'Hamartar zehatz bat zatiki bihurtzeko, zenbakitzailean koma gabeko zenbakia idazten da, eta izendatzailean 1 bat eta hamartar adina zero. Adibidez, $0{,}245$-ek hiru hamartar ditu: $\\frac{245}{1000}$. Gero, zatikia sinplifikatzen da zenbakitzailea eta izendatzailea z.k.h.-z zatituz.',
            'Para pasar un decimal exacto a fracción, se escribe en el numerador el número sin la coma y en el denominador un 1 seguido de tantos ceros como decimales tiene. Por ejemplo, $0{,}245$ tiene tres decimales: $\\frac{245}{1000}$. Después se simplifica dividiendo numerador y denominador entre su m.c.d.',
            'لتحويل عدد عشري منتهٍ إلى كسر نكتب في البسط العدد دون الفاصلة، وفي المقام 1 متبوعًا بأصفار بعدد المنازل العشرية. فمثلًا للعدد $0{,}245$ ثلاث منازل عشرية: $\\frac{245}{1000}$. ثم نبسّط بقسمة البسط والمقام على القاسم المشترك الأكبر.'
        ),
        problem: say('Idatzi $0{,}0016$ eta $76{,}94$ zatiki laburtezin gisa.', 'Escribe $0{,}0016$ y $76{,}94$ como fracciones irreducibles.', 'اكتب $0{,}0016$ و$76{,}94$ كسرين غير قابلين للاختزال.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$0{,}0016$: lau hamartar → 10 000.', '$0{,}0016$: cuatro decimales → 10 000.', '$0{,}0016$: أربع منازل ← 10 000.'), math: '$\\frac{16}{10\\,000}=\\frac{1}{625}$' },
            { text: say('$76{,}94$: bi hamartar → 100.', '$76{,}94$: dos decimales → 100.', '$76{,}94$: منزلتان ← 100.'), math: '$\\frac{7694}{100}$' },
            { text: say('Sinplifikatu 2z.', 'Simplifica entre 2.', 'بسّط على 2.'), math: '$=\\frac{3847}{50}$' }
        ],
        example: same('$3{,}2=\\frac{32}{10}=\\frac{16}{5}$'),
        takeaway: say('Hamartar adina zero izendatzailean, eta gero sinplifikatu.', 'Tantos ceros en el denominador como decimales, y después simplifica.', 'أصفار في المقام بعدد المنازل العشرية ثم بسّط.'),
        figure: (language) => <ExactFractionFigure language={language} />
    },
    {
        id: 'periodic-to-fraction',
        stage: 'decimals',
        title: say('Hamartar periodikoen zatiki sortzailea', 'Fracción generatriz de los decimales periódicos', 'الكسر المولّد للأعداد العشرية الدورية'),
        goal: say('Hamartar periodiko huts eta misto baten zatiki sortzailea aurkitzea.', 'Hallar la fracción generatriz de un decimal periódico puro o mixto.', 'إيجاد الكسر المولّد لعدد عشري دوري بحت أو مختلط.'),
        explanation: say(
            'Hamartar periodiko bat ere zatiki bat da: bere zatiki sortzailea. Zenbakitzailea: zifra guztiak (periodoa behin) ken periodoaren aurreko zifrak. Izendatzailea: 9 bat periodoko zifra bakoitzeko, eta ondoren 0 bat aurreperiodoko zifra bakoitzeko. Adibidez, $1{,}8\\overline{3}$: $\\frac{183-18}{90}=\\frac{165}{90}=\\frac{11}{6}$. Periodiko hutsean ez dago zerorik: $0{,}\\overline{6}=\\frac{6}{9}=\\frac{2}{3}$.',
            'Un decimal periódico también es una fracción: su fracción generatriz. Numerador: todas las cifras (el periodo una vez) menos las cifras anteriores al periodo. Denominador: un 9 por cada cifra del periodo seguido de un 0 por cada cifra del anteperiodo. Por ejemplo, $1{,}8\\overline{3}$: $\\frac{183-18}{90}=\\frac{165}{90}=\\frac{11}{6}$. En un periódico puro no hay ceros: $0{,}\\overline{6}=\\frac{6}{9}=\\frac{2}{3}$.',
            'العدد العشري الدوري كسر أيضًا: كسره المولّد. البسط: كل الأرقام (الدور مرة واحدة) ناقص الأرقام التي قبل الدور. المقام: 9 لكل رقم في الدور يليها 0 لكل رقم قبل الدور. فمثلًا $1{,}8\\overline{3}$: $\\frac{183-18}{90}=\\frac{165}{90}=\\frac{11}{6}$. وفي الدوري البحت لا توجد أصفار: $0{,}\\overline{6}=\\frac{6}{9}=\\frac{2}{3}$.'
        ),
        problem: say('Aurkitu $4{,}\\overline{2}$ eta $3{,}7\\overline{5}$ hamartarren zatiki sortzaileak.', 'Halla la fracción generatriz de $4{,}\\overline{2}$ y de $3{,}7\\overline{5}$.', 'أوجد الكسر المولّد لكل من $4{,}\\overline{2}$ و$3{,}7\\overline{5}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$4{,}\\overline{2}$: periodoa zifra bat → 9; aurreperiodorik ez.', '$4{,}\\overline{2}$: periodo de una cifra → 9; sin anteperiodo.', '$4{,}\\overline{2}$: دور من رقم واحد ← 9؛ دون ما قبل الدور.'), math: '$\\frac{42-4}{9}=\\frac{38}{9}$' },
            { text: say('$3{,}7\\overline{5}$: periodoa (5) → 9; aurreperiodoa (7) → 0.', '$3{,}7\\overline{5}$: periodo (5) → 9; anteperiodo (7) → 0.', '$3{,}7\\overline{5}$: الدور (5) ← 9؛ ما قبله (7) ← 0.'), math: '$\\frac{375-37}{90}=\\frac{338}{90}$' },
            { text: say('Sinplifikatu eta egiaztatu zatituz.', 'Simplifica y comprueba dividiendo.', 'بسّط وتحقق بالقسمة.'), math: same('$\\frac{338}{90}=\\frac{169}{45}=3{,}7555\\ldots$') }
        ],
        example: same('$0{,}\\overline{15}=\\frac{15}{99}=\\frac{5}{33}$'),
        takeaway: say('Periodoko zifra bakoitzeko 9 bat, aurreperiodoko bakoitzeko 0 bat.', 'Un 9 por cada cifra del periodo y un 0 por cada cifra del anteperiodo.', '9 لكل رقم في الدور و0 لكل رقم قبله.'),
        figure: (language) => <PeriodicFractionFigure language={language} />
    },
    {
        id: 'irrational',
        stage: 'reals',
        title: say('Zenbaki irrazionalak', 'Números irracionales', 'الأعداد غير النسبية'),
        goal: say('Zenbaki irrazionalak ezagutzea eta arrazionaletatik bereiztea.', 'Reconocer los números irracionales y distinguirlos de los racionales.', 'التعرف على الأعداد غير النسبية وتمييزها من النسبية.'),
        explanation: say(
            'Badira zatiki gisa idatz ezin diren zenbakiak: zenbaki irrazionalak. Haien adierazpen hamartarrak zifra hamartar infinitu ditu eta ez du periodorik. Adibideak: $\\sqrt{2}=1{,}41421\\ldots$ (1 aldeko karratuaren diagonala), $\\pi=3{,}14159\\ldots$ eta karratu perfektua ez den zenbaki natural baten erro karratu oro ($\\sqrt{3}$, $\\sqrt{21}$…). Irrazional bat zenbaki arrazional (ez zero) batez biderkatuta edo batuta, irrazionala da: $3\\pi$, $1-\\sqrt{2}$.',
            'Hay números que no se pueden escribir como fracción: los números irracionales. Su expresión decimal tiene infinitas cifras decimales y no tiene periodo. Ejemplos: $\\sqrt{2}=1{,}41421\\ldots$ (la diagonal de un cuadrado de lado 1), $\\pi=3{,}14159\\ldots$ y la raíz cuadrada de todo número natural que no sea cuadrado perfecto ($\\sqrt{3}$, $\\sqrt{21}$…). Un irracional sumado o multiplicado por un racional (distinto de cero) sigue siendo irracional: $3\\pi$, $1-\\sqrt{2}$.',
            'هناك أعداد لا يمكن كتابتها على صورة كسر: الأعداد غير النسبية. صورتها العشرية فيها عدد لا نهائي من الأرقام العشرية ولا دور لها. أمثلة: $\\sqrt{2}=1{,}41421\\ldots$ (قطر مربع ضلعه 1) و$\\pi=3{,}14159\\ldots$ والجذر التربيعي لكل عدد طبيعي ليس مربعًا كاملًا ($\\sqrt{3}$ و$\\sqrt{21}$…). وإذا جمعنا عددًا غير نسبي مع عدد نسبي أو ضربناه في عدد نسبي غير الصفر بقي غير نسبي: $3\\pi$ و$1-\\sqrt{2}$.'
        ),
        problem: say('Arrazionalak ala irrazionalak? $\\sqrt{16}$, $0{,}151515\\ldots$, $2{,}449489743\\ldots$, $\\sqrt{21}$', '¿Racionales o irracionales? $\\sqrt{16}$, $0{,}151515\\ldots$, $2{,}449489743\\ldots$, $\\sqrt{21}$', 'نسبية أم غير نسبية؟ $\\sqrt{16}$ و$0{,}151515\\ldots$ و$2{,}449489743\\ldots$ و$\\sqrt{21}$'),
        stepsKind: 'facts',
        steps: [
            { title: say('Arrazionalak', 'Racionales', 'نسبية'), text: say('$\\sqrt{16}=4$ zenbaki osoa da; $0{,}1515\\ldots$ periodikoa da.', '$\\sqrt{16}=4$ es entero; $0{,}1515\\ldots$ es periódico.', '$\\sqrt{16}=4$ عدد صحيح و$0{,}1515\\ldots$ دوري.'), math: same('$0{,}\\overline{15}=\\frac{15}{99}$') },
            { title: say('Irrazionalak', 'Irracionales', 'غير نسبية'), text: say('$2{,}4494\\ldots$-k ez du periodorik; 21 ez da karratu perfektua.', '$2{,}4494\\ldots$ no tiene periodo; 21 no es cuadrado perfecto.', '$2{,}4494\\ldots$ لا دور له و21 ليس مربعًا كاملًا.'), math: same('$\\sqrt{21}=4{,}5825\\ldots$') },
            { title: say('Kontuz', 'Cuidado', 'انتبه'), text: say('Hamartar infinitu guztiak ez dira irrazionalak: periodikoak arrazionalak dira.', 'No todos los decimales infinitos son irracionales: los periódicos son racionales.', 'ليست كل الأعداد العشرية غير المنتهية غير نسبية: الدورية نسبية.') }
        ],
        example: '$\\sqrt{2},\\ \\pi,\\ 3\\pi,\\ 1-\\sqrt{2}\\ \\notin\\mathbb{Q}$',
        takeaway: say('Irrazionala: hamartar infinituak eta periodorik gabe; ezin da zatiki gisa idatzi.', 'Irracional: infinitos decimales sin periodo; no se puede escribir como fracción.', 'غير النسبي: منازل عشرية لا نهائية بلا دور؛ لا يُكتب كسرًا.'),
        figure: (language) => <IrrationalFigure language={language} />
    },
    {
        id: 'number-sets',
        stage: 'reals',
        title: say('Zenbaki-multzoak: N, Z, Q eta R', 'Conjuntos numéricos: N, Z, Q y R', 'المجموعات العددية: N وZ وQ وR'),
        goal: say('Zenbaki bat dagokion multzo guztietan sailkatzea.', 'Clasificar un número en todos los conjuntos a los que pertenece.', 'تصنيف عدد في كل المجموعات التي ينتمي إليها.'),
        explanation: say(
            'Naturalak ($\\mathbb{N}$: 0, 1, 2…) osoen barruan daude ($\\mathbb{Z}$: naturalak eta haien aurkakoak), eta osoak arrazionalen barruan ($\\mathbb{Q}$: zatiki gisa idatz daitezkeen guztiak, hamartar zehatzak eta periodikoak barne). Arrazionalak eta irrazionalak ($\\mathbb{I}$) batera zenbaki errealak dira ($\\mathbb{R}$). Beraz, zenbaki bat multzo batean baino gehiagotan egon daiteke: 5 naturala, osoa, arrazionala eta erreala da.',
            'Los naturales ($\\mathbb{N}$: 0, 1, 2…) están dentro de los enteros ($\\mathbb{Z}$: los naturales y sus opuestos), y los enteros dentro de los racionales ($\\mathbb{Q}$: todos los que se pueden escribir como fracción, incluidos los decimales exactos y periódicos). Los racionales y los irracionales ($\\mathbb{I}$) juntos forman los números reales ($\\mathbb{R}$). Por eso un número puede estar en varios conjuntos: 5 es natural, entero, racional y real.',
            'الأعداد الطبيعية ($\\mathbb{N}$: 0، 1، 2…) داخل الأعداد الصحيحة ($\\mathbb{Z}$: الطبيعية ومعاكساتها)، والصحيحة داخل النسبية ($\\mathbb{Q}$: كل ما يمكن كتابته كسرًا، ومنها العشرية المنتهية والدورية). والنسبية وغير النسبية ($\\mathbb{I}$) معًا تكوّن الأعداد الحقيقية ($\\mathbb{R}$). لذلك قد ينتمي عدد إلى عدة مجموعات: 5 طبيعي وصحيح ونسبي وحقيقي.'
        ),
        problem: say('Sailkatu: $-4$, $\\frac{13}{6}$, $\\sqrt{5}$, $2{,}\\overline{7}$, $1+\\sqrt{3}$, $152$, $\\pi$.', 'Clasifica: $-4$, $\\frac{13}{6}$, $\\sqrt{5}$, $2{,}\\overline{7}$, $1+\\sqrt{3}$, $152$, $\\pi$.', 'صنّف: $-4$ و$\\frac{13}{6}$ و$\\sqrt{5}$ و$2{,}\\overline{7}$ و$1+\\sqrt{3}$ و$152$ و$\\pi$.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Naturalak eta osoak', 'Naturales y enteros', 'طبيعية وصحيحة'), text: say('152 naturala da (eta osoa). −4 osoa da, baina ez naturala.', '152 es natural (y entero). −4 es entero, pero no natural.', '152 طبيعي (وصحيح). و−4 صحيح لكنه ليس طبيعيًا.'), math: '$152\\in\\mathbb{N}\\qquad -4\\in\\mathbb{Z}$' },
            { title: say('Arrazionalak (ez osoak)', 'Racionales (no enteros)', 'نسبية (غير صحيحة)'), text: say('Zatikiak eta hamartar periodikoak.', 'Fracciones y decimales periódicos.', 'الكسور والأعداد العشرية الدورية.'), math: same('$\\frac{13}{6},\\ 2{,}\\overline{7}=\\frac{25}{9}$') },
            { title: say('Irrazionalak', 'Irracionales', 'غير نسبية'), text: say('Periodorik gabeko hamartar infinituak.', 'Decimales infinitos sin periodo.', 'عشرية لا نهائية بلا دور.'), math: '$\\sqrt{5},\\ 1+\\sqrt{3},\\ \\pi$' }
        ],
        example: '$\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$',
        takeaway: say('Arrazionalak + irrazionalak = errealak. Zenbaki bat multzo batean baino gehiagotan egon daiteke.', 'Racionales + irracionales = reales. Un número puede estar en varios conjuntos.', 'النسبية + غير النسبية = الحقيقية. وقد ينتمي العدد إلى عدة مجموعات.'),
        figure: (language) => <NumberSetsFigure language={language} />
    },
    {
        id: 'real-line',
        stage: 'reals',
        title: say('Zenbakiak zuzen errealean', 'Los números en la recta real', 'الأعداد على المستقيم الحقيقي'),
        goal: say('Zatikiak, hamartarrak eta $\\sqrt{n}$ motako erroak zuzen errealean adieraztea eta ordenatzea.', 'Representar y ordenar en la recta real fracciones, decimales y raíces del tipo $\\sqrt{n}$.', 'تمثيل الكسور والأعداد العشرية والجذور من النوع $\\sqrt{n}$ على المستقيم الحقيقي وترتيبها.'),
        explanation: say(
            'Zenbaki erreal bakoitzari zuzeneko puntu bat dagokio, eta puntu bakoitzari zenbaki erreal bat: horregatik deitzen zaio zuzen erreala. Zatiki bat adierazteko, idatzi zati osoa gehi zatiki propioa ($\\frac{8}{3}=2+\\frac{2}{3}$) eta zatitu dagokion unitatea zati berdinetan. Hamartar bat kokatzeko, zatitu tartea hamarnetan, gero ehunenetan… $\\sqrt{2}$ bezalako erroak Pitagorasen teoremarekin marrazten dira: 1 eta 1 katetoak dituen triangeluaren hipotenusa $\\sqrt{2}$ da, eta konpasarekin zuzenera eramaten da.',
            'A cada número real le corresponde un punto de la recta y a cada punto un número real: por eso se llama recta real. Para representar una fracción, escríbela como parte entera más fracción propia ($\\frac{8}{3}=2+\\frac{2}{3}$) y divide la unidad correspondiente en partes iguales. Para situar un decimal, divide el tramo en décimas, después en centésimas… Las raíces como $\\sqrt{2}$ se dibujan con el teorema de Pitágoras: la hipotenusa del triángulo de catetos 1 y 1 mide $\\sqrt{2}$, y con el compás se lleva a la recta.',
            'لكل عدد حقيقي نقطة على المستقيم ولكل نقطة عدد حقيقي، ولذلك يسمى المستقيم الحقيقي. لتمثيل كسر اكتبه جزءًا صحيحًا زائد كسر حقيقي ($\\frac{8}{3}=2+\\frac{2}{3}$) وقسّم الوحدة المناسبة إلى أجزاء متساوية. ولتحديد موضع عدد عشري قسّم الفترة إلى أعشار ثم إلى أجزاء من مئة… أما الجذور مثل $\\sqrt{2}$ فتُرسم بنظرية فيثاغورس: وتر المثلث الذي ضلعاه القائمان 1 و1 طوله $\\sqrt{2}$، وبالفرجار ننقله إلى المستقيم.'
        ),
        problem: say('Ordenatu txikienetik handienera: $\\sqrt{3}$, $\\frac{7}{4}$, $-\\frac{1}{2}$, $1{,}7$.', 'Ordena de menor a mayor: $\\sqrt{3}$, $\\frac{7}{4}$, $-\\frac{1}{2}$, $1{,}7$.', 'رتّب من الأصغر إلى الأكبر: $\\sqrt{3}$ و$\\frac{7}{4}$ و$-\\frac{1}{2}$ و$1{,}7$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi denak hamartar gisa.', 'Escríbelos todos como decimales.', 'اكتبها كلها أعدادًا عشرية.'), math: same('$\\sqrt{3}=1{,}732\\ldots\\quad \\frac{7}{4}=1{,}75\\quad -\\frac{1}{2}=-0{,}5$') },
            { text: say('Negatiboa da txikiena.', 'El negativo es el menor.', 'السالب هو الأصغر.'), math: same('$-0{,}5<1{,}7$') },
            { text: say('Konparatu hamarrenak eta ehunenak.', 'Compara décimas y centésimas.', 'قارن الأعشار والأجزاء من مئة.'), math: same('$-\\frac{1}{2}<1{,}7<\\sqrt{3}<\\frac{7}{4}$') }
        ],
        example: say('$\\sqrt{5}=\\sqrt{2^{2}+1^{2}}$: 2 eta 1 katetoak', '$\\sqrt{5}=\\sqrt{2^{2}+1^{2}}$: catetos 2 y 1', '$\\sqrt{5}=\\sqrt{2^{2}+1^{2}}$: ضلعان قائمان 2 و1'),
        takeaway: say('Zuzen errealean ez dago hutsunerik: zenbaki erreal bakoitza puntu bat da.', 'En la recta real no hay huecos: cada número real es un punto.', 'لا فراغات في المستقيم الحقيقي: كل عدد حقيقي نقطة.'),
        figure: (language) => <RealLineFigure language={language} />
    },
    {
        id: 'intervals',
        stage: 'reals',
        title: say('Tarteak eta zuzenerdiak', 'Intervalos y semirrectas', 'الفترات وأنصاف المستقيمات'),
        goal: say('Zuzen errealeko zatiak tarte, desberdintza eta irudi gisa adieraztea.', 'Expresar tramos de la recta real como intervalo, desigualdad y dibujo.', 'التعبير عن أجزاء المستقيم الحقيقي بفترة ومتباينة ورسم.'),
        explanation: say(
            'Tarte batek bi zenbakiren arteko zenbaki erreal guztiak hartzen ditu. Kortxeteak $[\\ ]$ esan nahi du muturra barne dagoela (puntu betea), eta parentesiak $(\\ )$, kanpo dagoela (puntu hutsa). Itxia: $[a,\\,b]$, $a\\le x\\le b$. Irekia: $(a,\\,b)$, $a<x<b$. Erdi-irekiak: $[a,\\,b)$ eta $(a,\\,b]$. Zuzenerdiek mutur bakarra dute: $(a,\\,+\\infty)$ $x>a$ da eta $(-\\infty,\\,b]$ $x\\le b$. Infinitua ez da zenbaki bat: beti parentesiarekin.',
            'Un intervalo recoge todos los números reales comprendidos entre dos números. El corchete $[\\ ]$ indica que el extremo está incluido (punto lleno) y el paréntesis $(\\ )$, que no lo está (punto vacío). Cerrado: $[a,\\,b]$, $a\\le x\\le b$. Abierto: $(a,\\,b)$, $a<x<b$. Semiabiertos: $[a,\\,b)$ y $(a,\\,b]$. Las semirrectas tienen un solo extremo: $(a,\\,+\\infty)$ es $x>a$ y $(-\\infty,\\,b]$ es $x\\le b$. El infinito no es un número: siempre con paréntesis.',
            'تجمع الفترة كل الأعداد الحقيقية الواقعة بين عددين. القوس المعقوف $[\\ ]$ يعني أن الطرف داخل (نقطة ممتلئة)، والقوس العادي $(\\ )$ يعني أنه خارج (نقطة فارغة). مغلقة: $[a,\\,b]$ أي $a\\le x\\le b$. مفتوحة: $(a,\\,b)$ أي $a<x<b$. نصف مفتوحة: $[a,\\,b)$ و$(a,\\,b]$. ولأنصاف المستقيمات طرف واحد: $(a,\\,+\\infty)$ هي $x>a$ و$(-\\infty,\\,b]$ هي $x\\le b$. واللانهاية ليست عددًا: دائمًا بقوس عادي.'
        ),
        problem: say('Idatzi tarte gisa: a) 5 eta 6 artean, biak barne; b) 7 baino handiagoak; c) −5 edo txikiagoak.', 'Escribe como intervalo: a) entre 5 y 6, ambos incluidos; b) mayores que 7; c) menores o iguales que −5.', 'اكتب على صورة فترة: أ) بين 5 و6 وكلاهما داخل؛ ب) أكبر من 7؛ ج) أصغر من أو تساوي −5.'),
        stepsKind: 'facts',
        steps: [
            { title: say('a) Biak barne', 'a) Ambos incluidos', 'أ) كلاهما داخل'), text: say('Kortxeteak bi aldeetan.', 'Corchetes en los dos lados.', 'قوسان معقوفان من الجهتين.'), math: '$[5,\\,6]\\qquad 5\\le x\\le 6$' },
            { title: say('b) 7 baino handiagoak', 'b) Mayores que 7', 'ب) أكبر من 7'), text: say('7 ez dago barne; ez dago amaierarik eskuinean.', 'El 7 no está incluido y no hay final por la derecha.', '7 ليس داخلًا ولا نهاية من اليمين.'), math: '$(7,\\,+\\infty)\\qquad x>7$' },
            { title: say('c) −5 edo txikiagoak', 'c) Menores o iguales que −5', 'ج) أصغر من أو تساوي −5'), text: say('−5 barne dago.', 'El −5 está incluido.', '−5 داخل.'), math: '$(-\\infty,\\,-5]\\qquad x\\le -5$' }
        ],
        example: '$\\{x\\ /\\ 3\\le x<5\\}=[3,\\,5)$',
        takeaway: say('[ edo ] → barne (●). ( edo ) → kanpo (○). ∞ → beti parentesia.', '[ o ] → incluido (●). ( o ) → excluido (○). ∞ → siempre paréntesis.', '[ أو ] ← داخل (●). ( أو ) ← خارج (○). ∞ ← دائمًا قوس عادي.'),
        figure: (language) => <IntervalsFigure language={language} />
    },
    {
        id: 'rounding',
        stage: 'approx',
        title: say('Trunkatzea eta biribiltzea', 'Truncamiento y redondeo', 'البتر والتقريب'),
        goal: say('Zenbaki baten hurbilketa bat lortzea trunkatuz eta biribilduz, ordena jakin batera.', 'Obtener una aproximación de un número truncando y redondeando a un orden dado.', 'الحصول على تقريب لعدد بالبتر والتقريب إلى مرتبة معينة.'),
        explanation: say(
            'Hurbilketa bat zenbaki baten ordez erabiltzen den balio hurbil bat da. Trunkatzean, ordena jakin batetik aurrerako zifrak kendu egiten dira: $82{,}745\\to 82{,}74$. Biribiltzean, hurbilen dagoen zenbakia aukeratzen da: kentzen den lehen zifra 5 edo handiagoa bada, aurrekoari 1 gehitzen zaio; bestela, trunkatzea bezala geratzen da: $82{,}745\\to 82{,}75$, $1{,}234\\to 1{,}23$. Biribiltzeak trunkatzeak baino errore txikiagoa ematen du beti edo berdina.',
            'Una aproximación es un valor cercano que se usa en lugar de un número. Al truncar se suprimen las cifras a partir de un orden: $82{,}745\\to 82{,}74$. Al redondear se elige el número más cercano: si la primera cifra suprimida es 5 o mayor, se suma 1 a la anterior; si no, queda como al truncar: $82{,}745\\to 82{,}75$, $1{,}234\\to 1{,}23$. El redondeo da siempre un error menor o igual que el truncamiento.',
            'التقريب قيمة قريبة نستعملها بدلًا من العدد. عند البتر نحذف الأرقام ابتداءً من مرتبة معينة: $82{,}745\\to 82{,}74$. وعند التقريب نختار العدد الأقرب: إذا كان أول رقم محذوف 5 أو أكثر نضيف 1 إلى الرقم السابق؛ وإلا يبقى كما في البتر: $82{,}745\\to 82{,}75$ و$1{,}234\\to 1{,}23$. والتقريب يعطي دائمًا خطأً أصغر من البتر أو مساويًا له.'
        ),
        problem: say('Trunkatu eta biribildu ehunenetara: $3{,}555$ eta $9{,}007$.', 'Trunca y redondea a las centésimas: $3{,}555$ y $9{,}007$.', 'ابتر وقرّب إلى الأجزاء من مئة: $3{,}555$ و$9{,}007$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Trunkatu: moztu ehunenen ondoren.', 'Truncar: corta después de las centésimas.', 'البتر: اقطع بعد الأجزاء من مئة.'), math: same('$3{,}555\\to 3{,}55\\qquad 9{,}007\\to 9{,}00$') },
            { text: say('Biribildu $3{,}555$: kentzen den zifra 5 da → gehitu 1.', 'Redondear $3{,}555$: la cifra suprimida es 5 → suma 1.', 'قرّب $3{,}555$: الرقم المحذوف 5 ← أضف 1.'), math: same('$3{,}555\\to 3{,}56$') },
            { text: say('Biribildu $9{,}007$: kentzen den zifra 7 da → gehitu 1.', 'Redondear $9{,}007$: la cifra suprimida es 7 → suma 1.', 'قرّب $9{,}007$: الرقم المحذوف 7 ← أضف 1.'), math: same('$9{,}007\\to 9{,}01$') }
        ],
        example: same('$\\pi\\approx 3{,}14\\qquad \\sqrt{2}\\approx 1{,}414$'),
        takeaway: say('Trunkatu: moztu. Biribildu: 5etik aurrera, gora.', 'Truncar: cortar. Redondear: de 5 en adelante, hacia arriba.', 'البتر: القطع. التقريب: من 5 فما فوق إلى الأعلى.'),
        figure: (language) => <RoundingFigure language={language} />
    },
    {
        id: 'errors',
        stage: 'approx',
        title: say('Errore absolutua eta erlatiboa', 'Error absoluto y error relativo', 'الخطأ المطلق والخطأ النسبي'),
        goal: say('Hurbilketa baten errore absolutua eta erlatiboa kalkulatzea eta konparatzea.', 'Calcular y comparar el error absoluto y el error relativo de una aproximación.', 'حساب الخطأ المطلق والنسبي لتقريب ومقارنتهما.'),
        explanation: say(
            'Errore absolutua balio errealaren eta hurbilketaren arteko diferentzia da, balio absolutuan: $E_a=|\\text{erreala}-\\text{hurbilketa}|$. Unitate berean ematen da. Errore erlatiboa errore absolutua zati balio erreala da: $E_r=\\frac{E_a}{\\text{erreala}}$; ez du unitaterik eta ehunekotan ere eman daiteke. Errore erlatiboak esaten du zein hurbilketa den hobea: 1 cm-ko errorea handia da arkatz batean, baina txikia etxe batean.',
            'El error absoluto es la diferencia, en valor absoluto, entre el valor real y la aproximación: $E_a=|\\text{real}-\\text{aproximación}|$. Se da en las mismas unidades. El error relativo es el error absoluto dividido entre el valor real: $E_r=\\frac{E_a}{\\text{real}}$; no tiene unidades y se puede dar en porcentaje. El error relativo dice qué aproximación es mejor: 1 cm de error es mucho en un lápiz, pero poco en una casa.',
            'الخطأ المطلق هو الفرق بالقيمة المطلقة بين القيمة الحقيقية والتقريب: $E_a$. ويُعطى بالوحدات نفسها. والخطأ النسبي هو الخطأ المطلق مقسومًا على القيمة الحقيقية: $E_r$؛ وليس له وحدة ويمكن إعطاؤه نسبةً مئوية. والخطأ النسبي يبيّن أي التقريبين أفضل: خطأ 1 سم كبير في قلم لكنه صغير في بيت.'
        ),
        problem: say('Julia 10 ml hartu ditu, benetan $\\frac{125}{11}$ ml hartu behar zituenean. Kalkulatu erroreak.', 'Julia ha tomado 10 ml cuando en realidad debía tomar $\\frac{125}{11}$ ml. Calcula los errores.', 'أخذت خوليا 10 مل بينما كان عليها أن تأخذ $\\frac{125}{11}$ مل. احسب الخطأين.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Balio erreala hamartar gisa.', 'El valor real como decimal.', 'القيمة الحقيقية عددًا عشريًا.'), math: same('$\\frac{125}{11}=11{,}\\overline{36}\\approx 11{,}36$') },
            { text: say('Errore absolutua.', 'Error absoluto.', 'الخطأ المطلق.'), math: same('$E_a=|11{,}36-10|=1{,}36\\ \\text{ml}$') },
            { text: say('Errore erlatiboa: zatitu balio errealaz.', 'Error relativo: divide entre el valor real.', 'الخطأ النسبي: اقسم على القيمة الحقيقية.'), math: same('$E_r=\\frac{1{,}36}{11{,}36}\\approx 0{,}12\\to 12\\,\\%$') }
        ],
        example: same('$\\sqrt{2}\\approx 1{,}4:\\ E_a=0{,}0142\\ldots$'),
        takeaway: say('$E_a$: zenbat huts egin den. $E_r$: zein garrantzitsua den hutsegite hori.', '$E_a$: cuánto nos equivocamos. $E_r$: qué importancia tiene ese error.', '$E_a$: مقدار الخطأ. $E_r$: أهمية ذلك الخطأ.'),
        figure: (language) => <ErrorsFigure language={language} />
    },
    {
        id: 'scientific',
        stage: 'approx',
        title: say('Idazkera zientifikoa', 'Notación científica', 'الترميز العلمي'),
        goal: say('Zenbaki oso handiak eta oso txikiak idazkera zientifikoan idaztea eta irakurtzea.', 'Escribir y leer en notación científica números muy grandes y muy pequeños.', 'كتابة الأعداد الكبيرة جدًا والصغيرة جدًا بالترميز العلمي وقراءتها.'),
        explanation: say(
            'Zenbaki bat idazkera zientifikoan $a\\cdot 10^{n}$ moduan idazten da: $a$ zenbaki hamartar bat da, komaren aurretik zero ez den zifra bakarra duena ($1\\le a<10$), eta $n$ zenbaki osoa. Zenbaki handietan koma ezkerrera mugitzen da eta $n$ positiboa da: $83\\,400\\,000=8{,}34\\cdot 10^{7}$. Zenbaki txikietan koma eskuinera mugitzen da eta $n$ negatiboa da: $0{,}00052=5{,}2\\cdot 10^{-4}$. Berretzaileak komaren jauzi kopurua esaten du.',
            'Un número en notación científica se escribe $a\\cdot 10^{n}$: $a$ es un decimal con una sola cifra distinta de cero delante de la coma ($1\\le a<10$) y $n$ es un número entero. En los números grandes la coma se desplaza a la izquierda y $n$ es positivo: $83\\,400\\,000=8{,}34\\cdot 10^{7}$. En los pequeños la coma se desplaza a la derecha y $n$ es negativo: $0{,}00052=5{,}2\\cdot 10^{-4}$. El exponente cuenta los saltos de la coma.',
            'يُكتب العدد بالترميز العلمي على الصورة $a\\cdot 10^{n}$ حيث $a$ عدد عشري قبل فاصلته رقم واحد غير الصفر ($1\\le a<10$) و$n$ عدد صحيح. في الأعداد الكبيرة تنتقل الفاصلة إلى اليسار و$n$ موجب: $83\\,400\\,000=8{,}34\\cdot 10^{7}$. وفي الصغيرة تنتقل إلى اليمين و$n$ سالب: $0{,}00052=5{,}2\\cdot 10^{-4}$. والأس يعدّ قفزات الفاصلة.'
        ),
        problem: say('Idatzi idazkera zientifikoan: $51\\,270\\,000\\,000\\,000$ eta $0{,}0000000001846$.', 'Escribe en notación científica: $51\\,270\\,000\\,000\\,000$ y $0{,}0000000001846$.', 'اكتب بالترميز العلمي: $51\\,270\\,000\\,000\\,000$ و$0{,}0000000001846$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Koma 5aren ondoren jarri: 13 jauzi ezkerrera.', 'Pon la coma detrás del 5: 13 saltos a la izquierda.', 'ضع الفاصلة بعد 5: 13 قفزة إلى اليسار.'), math: same('$5{,}127\\cdot 10^{13}$') },
            { text: say('Bigarrenean, koma 1aren ondoren: 10 jauzi eskuinera.', 'En el segundo, la coma detrás del 1: 10 saltos a la derecha.', 'في الثاني الفاصلة بعد 1: 10 قفزات إلى اليمين.'), math: same('$1{,}846\\cdot 10^{-10}$') },
            { text: say('Egiaztatu: $a$-k zifra bakarra du komaren aurretik.', 'Comprueba: $a$ tiene una sola cifra delante de la coma.', 'تحقق: لـ $a$ رقم واحد قبل الفاصلة.'), math: same('$1\\le 5{,}127<10$') }
        ],
        example: same('$4{,}8\\cdot 10^{12}=4\\,800\\,000\\,000\\,000$'),
        takeaway: say('Handia → $n$ positiboa. Txikia (0 eta 1 artean) → $n$ negatiboa.', 'Grande → $n$ positivo. Pequeño (entre 0 y 1) → $n$ negativo.', 'كبير ← $n$ موجب. صغير (بين 0 و1) ← $n$ سالب.'),
        figure: (language) => <ScientificFigure language={language} />
    },
    {
        id: 'scientific-ops',
        stage: 'approx',
        title: say('Eragiketak idazkera zientifikoan', 'Operaciones en notación científica', 'العمليات بالترميز العلمي'),
        goal: say('Idazkera zientifikoan dauden zenbakiak biderkatzea eta zatitzea, emaitza egokituz.', 'Multiplicar y dividir números en notación científica ajustando el resultado.', 'ضرب الأعداد المكتوبة بالترميز العلمي وقسمتها مع ضبط النتيجة.'),
        explanation: say(
            'Biderkatzeko, zenbaki hamartarrak elkarren artean biderkatzen dira eta 10en berreturak elkarren artean (berretzaileak batuz). Zatitzeko, hamartarrak zatitzen dira eta berretzaileak kentzen. Azkenean, emaitzak idazkera zientifikoan egon behar du: $a$ 10 edo handiagoa bada, koma ezkerrera mugitu eta berretzaileari 1 gehitu; 1 baino txikiagoa bada, eskuinera eta 1 kendu. Adibidez, $25{,}2\\cdot 10^{5}=2{,}52\\cdot 10^{6}$.',
            'Para multiplicar, se multiplican los decimales entre sí y las potencias de 10 entre sí (sumando los exponentes). Para dividir, se dividen los decimales y se restan los exponentes. Al final el resultado debe quedar en notación científica: si $a$ es 10 o más, se desplaza la coma a la izquierda y se suma 1 al exponente; si es menor que 1, a la derecha y se resta 1. Por ejemplo, $25{,}2\\cdot 10^{5}=2{,}52\\cdot 10^{6}$.',
            'للضرب نضرب العددين العشريين معًا وقوتي 10 معًا (بجمع الأسس). وللقسمة نقسم العددين العشريين ونطرح الأسس. وفي النهاية يجب أن تكون النتيجة بالترميز العلمي: إذا كان $a$ يساوي 10 أو أكثر ننقل الفاصلة إلى اليسار ونضيف 1 إلى الأس؛ وإذا كان أصغر من 1 ننقلها إلى اليمين ونطرح 1. مثلًا $25{,}2\\cdot 10^{5}=2{,}52\\cdot 10^{6}$.'
        ),
        problem: same('$(1{,}59\\cdot 10^{17}):(4{,}97\\cdot 10^{13})$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu hamartarrak (biribilduta).', 'Divide los decimales (redondeando).', 'اقسم العددين العشريين (مع التقريب).'), math: same('$1{,}59:4{,}97\\approx 0{,}32$') },
            { text: say('Kendu berretzaileak.', 'Resta los exponentes.', 'اطرح الأسس.'), math: '$10^{17-13}=10^{4}$' },
            { text: say('Egokitu: 0,32 < 1 → koma eskuinera eta berretzaileari 1 kendu.', 'Ajusta: 0,32 < 1 → coma a la derecha y resta 1 al exponente.', 'اضبط: 0.32 < 1 ← الفاصلة إلى اليمين واطرح 1 من الأس.'), math: same('$0{,}32\\cdot 10^{4}=3{,}2\\cdot 10^{3}$') }
        ],
        example: same('$(4\\cdot 10^{-7})\\cdot(6{,}3\\cdot 10^{12})=2{,}52\\cdot 10^{6}$'),
        takeaway: say('Biderkatu → berretzaileak batu. Zatitu → kendu. Azkenean, $1\\le a<10$.', 'Multiplicar → sumar exponentes. Dividir → restar. Al final, $1\\le a<10$.', 'الضرب ← جمع الأسس. القسمة ← طرحها. وفي النهاية $1\\le a<10$.'),
        figure: (language) => <ScientificOpsFigure language={language} />
    },
    {
        id: 'roots',
        stage: 'radicals',
        title: say('Erroak eta berretzaile zatikiak', 'Raíces y exponentes fraccionarios', 'الجذور والأسس الكسرية'),
        goal: say('Erroak kalkulatzea eta erradikalak berretzaile zatikidun berretura gisa idaztea.', 'Calcular raíces y escribir radicales como potencias de exponente fraccionario.', 'حساب الجذور وكتابة الجذريات على صورة قوى ذات أس كسري.'),
        explanation: say(
            '$a$ zenbaki baten $n$ indizeko erroa, $\\sqrt[n]{a}$, $n$ berretzailera jasota $a$ ematen duen zenbakia da: $\\sqrt[3]{8}=2$, $2^{3}=8$ delako. Indizea bikoitia bada, errokizun negatiboek ez dute erro errealik ($\\sqrt{-4}$ ez da existitzen $\\mathbb{R}$-n); bakoitia bada, bai: $\\sqrt[5]{-32}=-2$. Erro bat berretura gisa idatz daiteke: $\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$ (izendatzailea indizea da eta zenbakitzailea berretzailea).',
            'La raíz de índice $n$ de un número $a$, $\\sqrt[n]{a}$, es el número que elevado a $n$ da $a$: $\\sqrt[3]{8}=2$ porque $2^{3}=8$. Si el índice es par, los radicandos negativos no tienen raíz real ($\\sqrt{-4}$ no existe en $\\mathbb{R}$); si es impar, sí: $\\sqrt[5]{-32}=-2$. Una raíz se puede escribir como potencia: $\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$ (el denominador es el índice y el numerador el exponente).',
            'الجذر ذو الدليل $n$ للعدد $a$، $\\sqrt[n]{a}$، هو العدد الذي إذا رُفع إلى $n$ أعطى $a$: $\\sqrt[3]{8}=2$ لأن $2^{3}=8$. إذا كان الدليل زوجيًا فلا جذر حقيقي للأعداد السالبة ($\\sqrt{-4}$ غير موجود في $\\mathbb{R}$)، وإذا كان فرديًا فنعم: $\\sqrt[5]{-32}=-2$. ويمكن كتابة الجذر قوةً: $\\sqrt[n]{a^{m}}=a^{\\frac{m}{n}}$ (المقام هو الدليل والبسط هو الأس).'
        ),
        problem: same('$8^{\\frac{2}{3}}\\qquad 64^{\\frac{5}{6}}\\qquad \\sqrt[4]{625}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi oinarria berretura gisa: $8=2^{3}$.', 'Escribe la base como potencia: $8=2^{3}$.', 'اكتب الأساس قوةً: $8=2^{3}$.'), math: '$8^{\\frac{2}{3}}=(2^{3})^{\\frac{2}{3}}=2^{2}=4$' },
            { text: say('Gauza bera $64=2^{6}$ rekin.', 'Lo mismo con $64=2^{6}$.', 'الشيء نفسه مع $64=2^{6}$.'), math: '$64^{\\frac{5}{6}}=(2^{6})^{\\frac{5}{6}}=2^{5}=32$' },
            { text: say('$625=5^{4}$.', '$625=5^{4}$.', '$625=5^{4}$.'), math: '$\\sqrt[4]{625}=\\sqrt[4]{5^{4}}=5$' }
        ],
        example: '$\\sqrt[5]{x^{2}}=x^{\\frac{2}{5}}\\qquad 4^{\\frac{1}{2}}=2$',
        takeaway: say('$a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$: behekoa indizea, goikoa berretzailea.', '$a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$: el de abajo es el índice; el de arriba, el exponente.', '$a^{\\frac{m}{n}}=\\sqrt[n]{a^{m}}$: السفلي هو الدليل والعلوي هو الأس.'),
        figure: (language) => <RootsFigure language={language} />
    },
    {
        id: 'radical-simplify',
        stage: 'radicals',
        title: say('Erradikalak sinplifikatu eta faktoreak atera', 'Simplificar radicales y extraer factores', 'تبسيط الجذريات وإخراج العوامل'),
        goal: say('Erradikal bat sinplifikatzea eta errotik faktoreak ateratzea.', 'Simplificar un radical y extraer factores de la raíz.', 'تبسيط جذري وإخراج عوامل من الجذر.'),
        explanation: say(
            'Errokizuna faktore lehenetan deskonposatzen da. Erro karratu batean, faktore bikote bakoitza ($a^{2}$) errotik ateratzen da $a$ gisa: $\\sqrt{72}=\\sqrt{2^{2}\\cdot 3^{2}\\cdot 2}=2\\cdot 3\\sqrt{2}=6\\sqrt{2}$. $n$ indizeko erroan, $n$ faktore berdinen talde bakoitza ateratzen da. Erradikal bat sinplifikatzeko, indizea eta errokizunaren berretzailea zenbaki berberaz zatitzen dira: $\\sqrt[6]{8}=\\sqrt[6]{2^{3}}=\\sqrt{2}$.',
            'Se descompone el radicando en factores primos. En una raíz cuadrada, cada pareja de factores ($a^{2}$) sale de la raíz como $a$: $\\sqrt{72}=\\sqrt{2^{2}\\cdot 3^{2}\\cdot 2}=2\\cdot 3\\sqrt{2}=6\\sqrt{2}$. En una raíz de índice $n$, sale cada grupo de $n$ factores iguales. Para simplificar un radical se dividen el índice y el exponente del radicando entre el mismo número: $\\sqrt[6]{8}=\\sqrt[6]{2^{3}}=\\sqrt{2}$.',
            'نحلّل ما تحت الجذر إلى عوامل أولية. في الجذر التربيعي يخرج كل زوج من العوامل ($a^{2}$) على صورة $a$: $\\sqrt{72}=\\sqrt{2^{2}\\cdot 3^{2}\\cdot 2}=2\\cdot 3\\sqrt{2}=6\\sqrt{2}$. وفي الجذر ذي الدليل $n$ تخرج كل مجموعة من $n$ عوامل متساوية. ولتبسيط جذري نقسم الدليل وأس ما تحت الجذر على العدد نفسه: $\\sqrt[6]{8}=\\sqrt[6]{2^{3}}=\\sqrt{2}$.'
        ),
        problem: same('$\\sqrt{200}\\qquad \\sqrt{300}\\qquad \\sqrt[3]{16}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('$200=2^{2}\\cdot 5^{2}\\cdot 2$: bi bikote ateratzen dira.', '$200=2^{2}\\cdot 5^{2}\\cdot 2$: salen dos parejas.', '$200=2^{2}\\cdot 5^{2}\\cdot 2$: يخرج زوجان.'), math: '$\\sqrt{200}=2\\cdot 5\\sqrt{2}=10\\sqrt{2}$' },
            { text: say('$300=2^{2}\\cdot 5^{2}\\cdot 3$.', '$300=2^{2}\\cdot 5^{2}\\cdot 3$.', '$300=2^{2}\\cdot 5^{2}\\cdot 3$.'), math: '$\\sqrt{300}=10\\sqrt{3}$' },
            { text: say('Erro kubikoan, hiruko taldeak: $16=2^{3}\\cdot 2$.', 'En la raíz cúbica, grupos de tres: $16=2^{3}\\cdot 2$.', 'في الجذر التكعيبي مجموعات من ثلاثة: $16=2^{3}\\cdot 2$.'), math: '$\\sqrt[3]{16}=2\\sqrt[3]{2}$' }
        ],
        example: '$\\sqrt{28}=2\\sqrt{7}\\qquad \\sqrt[4]{9}=\\sqrt{3}$',
        takeaway: say('Deskonposatu, egin $n$-ko taldeak eta atera talde bakoitzetik faktore bat.', 'Descompón, haz grupos de $n$ y saca un factor por cada grupo.', 'حلّل وكوّن مجموعات من $n$ وأخرج عاملًا من كل مجموعة.'),
        figure: (language) => <SimplifyFigure language={language} />
    },
    {
        id: 'radical-ops',
        stage: 'radicals',
        title: say('Eragiketak erradikalekin', 'Operaciones con radicales', 'العمليات على الجذريات'),
        goal: say('Erradikalak biderkatzea, zatitzea eta batzea, eta izendatzaileko erroa kentzea.', 'Multiplicar, dividir y sumar radicales, y suprimir la raíz del denominador.', 'ضرب الجذريات وقسمتها وجمعها وإزالة الجذر من المقام.'),
        explanation: say(
            'Indize bereko erradikalak biderkatu eta zatitu egiten dira errokizunak biderkatuz edo zatituz: $\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{a\\cdot b}$. Batu eta kendu, berriz, erradikal antzekoak bakarrik (indize eta errokizun berdinak): koefizienteak batzen dira, $3\\sqrt{2}+5\\sqrt{2}=8\\sqrt{2}$. Horretarako, askotan faktoreak atera behar dira lehenik. Izendatzailean erro karratu bat badago, zenbakitzailea eta izendatzailea erro horrekin biderkatzen dira (arrazionalizatu): $\\frac{2}{\\sqrt{3}}=\\frac{2\\sqrt{3}}{3}$.',
            'Los radicales del mismo índice se multiplican y dividen multiplicando o dividiendo los radicandos: $\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{a\\cdot b}$. En cambio, solo se suman y restan los radicales semejantes (mismo índice y mismo radicando): se suman los coeficientes, $3\\sqrt{2}+5\\sqrt{2}=8\\sqrt{2}$. Para ello, muchas veces hay que extraer factores primero. Si en el denominador hay una raíz cuadrada, se multiplican numerador y denominador por esa raíz (racionalizar): $\\frac{2}{\\sqrt{3}}=\\frac{2\\sqrt{3}}{3}$.',
            'الجذريات ذات الدليل نفسه تُضرب وتُقسم بضرب ما تحت الجذر أو قسمته: $\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{a\\cdot b}$. أما الجمع والطرح فلا يكونان إلا للجذريات المتشابهة (الدليل نفسه وما تحت الجذر نفسه): نجمع المعاملات $3\\sqrt{2}+5\\sqrt{2}=8\\sqrt{2}$. ولذلك نحتاج غالبًا إلى إخراج العوامل أولًا. وإذا كان في المقام جذر تربيعي نضرب البسط والمقام في ذلك الجذر (إنطاق المقام): $\\frac{2}{\\sqrt{3}}=\\frac{2\\sqrt{3}}{3}$.'
        ),
        problem: same('$\\sqrt{20}+\\sqrt{45}-\\sqrt{80}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Atera faktoreak erradikal bakoitzetik.', 'Extrae factores de cada radical.', 'أخرج العوامل من كل جذري.'), math: '$\\sqrt{20}=2\\sqrt{5}\\quad \\sqrt{45}=3\\sqrt{5}\\quad \\sqrt{80}=4\\sqrt{5}$' },
            { text: say('Orain antzekoak dira: batu koefizienteak.', 'Ahora son semejantes: suma los coeficientes.', 'الآن هي متشابهة: اجمع المعاملات.'), math: '$(2+3-4)\\sqrt{5}$' },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.'), math: '$=\\sqrt{5}$' }
        ],
        example: '$\\sqrt{2}\\cdot\\sqrt{3}\\cdot\\sqrt{6}=\\sqrt{36}=6\\qquad \\frac{6}{\\sqrt{2}}=3\\sqrt{2}$',
        takeaway: say('Biderkatu: errokizunak elkartu. Batu: antzekoak soilik. Izendatzailean erroa: arrazionalizatu.', 'Multiplicar: juntar radicandos. Sumar: solo semejantes. Raíz en el denominador: racionalizar.', 'الضرب: اجمع ما تحت الجذور. الجمع: للمتشابهة فقط. جذر في المقام: أنطِق المقام.'),
        figure: (language) => <RadicalOpsFigure language={language} />
    }
]

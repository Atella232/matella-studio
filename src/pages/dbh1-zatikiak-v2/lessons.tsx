import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AddFigure, AreaFigure, EquivalenceFigure, FractionOfFigure, MeaningFigure, MixedFigure } from '../dbh2-zatikiak-prototype/figures'
import { notation } from '../dbh2-zatigarritasuna/notation'
import { CheeseFigure, DivideFigure, PlaceOnLineFigure, SameDenominatorFigure, ShapesFigure, SimplifyBarsFigure, StickersFigure, TypesLineFigure } from './figures'

/* ==========================================================================
   Zatikiak · 1. DBH — stages and lessons
   Sequence follows the class textbook (Santillana 1.º ESO, unit 3,
   curricular adaptation): what a fraction is and how it is read and drawn,
   the fraction as a division, proper and improper fractions, mixed numbers
   and the number line, equivalent fractions (cross products, amplifying
   and simplifying), comparing, and the four operations. Anaya units 7 and
   8 add the fraction of a quantity and the problems. It is the first
   contact with fractions: no negative fractions, powers or percentages,
   which the 2. DBH unit covers.
   ========================================================================== */

export type FractionsIntroStageId = 'meaning' | 'types' | 'equivalence' | 'operations' | 'problems'

/** The same formula in every language, with a decimal point instead of the comma in Arabic */
const dec = (latex: string): LocalizedText => ({ eu: latex, es: latex, ar: latex.replace(/\{,\}/g, '.') })

export const fractionsIntroStages: UnitStage[] = [
    { id: 'meaning', tone: 'blue', title: { eu: 'Zer da zatiki bat?', es: '¿Qué es una fracción?', ar: 'ما الكسر؟' } },
    { id: 'types', tone: 'violet', title: { eu: 'Zatiki motak eta zuzena', es: 'Tipos de fracciones y la recta', ar: 'أنواع الكسور والمستقيم' } },
    { id: 'equivalence', tone: 'mustard', title: { eu: 'Baliokideak eta alderaketa', es: 'Equivalentes y comparación', ar: 'التكافؤ والمقارنة' } },
    { id: 'operations', tone: 'coral', title: { eu: 'Eragiketak', es: 'Operaciones', ar: 'العمليات' } },
    { id: 'problems', tone: 'green', title: { eu: 'Zatikiak eta buruketak', es: 'Fracciones y problemas', ar: 'الكسور والمسائل' } }
]

export const fractionsIntroTopics: UnitTopic[] = [
    {
        id: 'what',
        stage: 'meaning',
        title: { eu: 'Zatikiak: zenbakitzailea eta izendatzailea', es: 'La fracción: numerador y denominador', ar: 'الكسر: البسط والمقام' },
        goal: {
            eu: 'Zatiki baten gaiak ezagutzea eta zatikiak irakurtzen eta idazten jakitea.',
            es: 'Reconocer los términos de una fracción y saber leer y escribir fracciones.',
            ar: 'التعرّف إلى حدّي الكسر ومعرفة قراءة الكسور وكتابتها.'
        },
        explanation: {
            eu: 'Jonek 8 zatiko gazta-kutxa bat ireki eta 3 jan ditu. Kutxaren $\\frac{3}{8}$ jan du: «hiru zortziren». Zatiki batek bi gai ditu, zatiki-marraz bereizita. Izendatzaileak (behean) adierazten du osoa zenbat zati berdinetan banatzen den; zenbakitzaileak (goian), zenbat zati hartzen diren. Eguneroko bizitzan ere erabiltzen ditugu: erdia, heren bat, laurden bat, bi bosten…',
            es: 'Juan abre una caja de quesitos de 8 porciones y se come 3. Se ha comido $\\frac{3}{8}$ de la caja: «tres octavos». Una fracción tiene dos términos separados por la raya de fracción. El denominador (abajo) indica en cuántas partes iguales se divide el total; el numerador (arriba), cuántas partes se toman. También las usamos a diario: la mitad, un tercio, la cuarta parte, dos quintos…',
            ar: 'فتح خوان علبة جبن من 8 قطع وأكل 3. أكل $\\frac{3}{8}$ العلبة: «ثلاثة أثمان». للكسر حدّان يفصل بينهما خط الكسر. يبيّن المقام (في الأسفل) عدد الأجزاء المتساوية التي يُقسم إليها الكل، ويبيّن البسط (في الأعلى) عدد الأجزاء المأخوذة. ونستعمل الكسور يوميًا: النصف والثلث والربع وخُمسان…'
        },
        stepsKind: 'facts',
        steps: [
            {
                title: { eu: 'Nola irakurri', es: 'Cómo se leen', ar: 'كيف تُقرأ' },
                text: { eu: 'Lehenik zenbakitzailea, gero izendatzailea -ren atzizkiarekin: bi heren, hiru laurden, bost zortziren. $\\frac{1}{2}$ erdia da.', es: 'Primero el numerador y después el denominador: medios, tercios, cuartos, quintos… décimos; a partir de 11, con -avo: onceavos, doceavos…', ar: 'نقرأ البسط ثم المقام: نصف، ثلث، ربع، خُمس… وبعد العشرة نقول: جزء من أحد عشر…' },
                math: '$\\frac{3}{7}\\qquad\\frac{6}{9}\\qquad\\frac{8}{11}$'
            },
            {
                title: { eu: 'Zati berdinak', es: 'Partes iguales', ar: 'أجزاء متساوية' },
                text: { eu: 'Izendatzaileak zati berdinak eskatzen ditu: tamaina desberdineko 4 zati ez dira laurdenak.', es: 'El denominador exige partes iguales: 4 trozos de distinto tamaño no son cuartos.', ar: 'المقام يشترط أجزاء متساوية: 4 قطع مختلفة الحجم ليست أرباعًا.' }
            },
            {
                title: { eu: 'Zatiki-marra', es: 'La raya de fracción', ar: 'خط الكسر' },
                text: { eu: 'Marrak «zati», «-ren» edo «zatiketa» esan nahi du.', es: 'La raya significa «parte de», «entre» o «división».', ar: 'يعني الخط «جزء من» أو «على» أو «قسمة».' }
            }
        ],
        example: '$\\frac{1}{2}\\qquad\\frac{1}{3}\\qquad\\frac{1}{4}\\qquad\\frac{3}{8}$',
        takeaway: {
            eu: 'Izendatzailea: zenbat zati berdin guztira. Zenbakitzailea: zenbat hartzen diren.',
            es: 'Denominador: cuántas partes iguales hay. Numerador: cuántas se toman.',
            ar: 'المقام: كم جزءًا متساويًا. البسط: كم جزءًا نأخذ.'
        },
        figure: (language) => <CheeseFigure language={language} />
    },
    {
        id: 'represent',
        stage: 'meaning',
        title: { eu: 'Zatikiak marraztea', es: 'Representar fracciones', ar: 'تمثيل الكسور' },
        goal: {
            eu: 'Zatiki bat irudi batean marraztea eta irudi bateko zatikia idaztea.',
            es: 'Dibujar una fracción en una figura y escribir la fracción de una figura.',
            ar: 'رسم كسر في شكل وكتابة الكسر الذي يمثّله شكل.'
        },
        explanation: {
            eu: 'Mariak 6 zati berdinetan moztutako bizkotxo baten 2 zati jan ditu: $\\frac{2}{6}$. Zatiki bat marrazteko, aukeratu irudi bat (zirkulua, laukizuzena, karratua…), zatitu izendatzaileak adina zati berdinetan eta koloreztatu zenbakitzaileak adina. Alderantziz, irudi batean: zati guztiak zenbatu izendatzailea lortzeko, eta koloreztatuak zenbakitzailea lortzeko.',
            es: 'María se ha comido 2 trozos de un bizcocho cortado en 6 partes iguales: $\\frac{2}{6}$. Para dibujar una fracción, elige una figura (círculo, rectángulo, cuadrado…), divídela en tantas partes iguales como indica el denominador y colorea tantas como indica el numerador. Al revés, en una figura: cuenta todas las partes para el denominador y las coloreadas para el numerador.',
            ar: 'أكلت ماريا قطعتين من كعكة مقطّعة إلى 6 أجزاء متساوية: $\\frac{2}{6}$. لرسم كسر اختر شكلًا (دائرة، مستطيل، مربع…)، وقسّمه إلى أجزاء متساوية بعدد المقام، ولوّن منها بعدد البسط. وبالعكس، في شكل ما: عُدّ كل الأجزاء لتحصل على المقام، والملوّنة لتحصل على البسط.'
        },
        problem: { eu: 'Marraztu $\\frac{3}{4}$ laukizuzen batean.', es: 'Dibuja $\\frac{3}{4}$ en un rectángulo.', ar: 'ارسم $\\frac{3}{4}$ في مستطيل.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Marraztu laukizuzen bat: osoa da.', es: 'Dibuja un rectángulo: es el total.', ar: 'ارسم مستطيلًا: إنه الكل.' } },
            { text: { eu: 'Zatitu 4 zati berdinetan (izendatzailea).', es: 'Divídelo en 4 partes iguales (denominador).', ar: 'قسّمه إلى 4 أجزاء متساوية (المقام).' } },
            { text: { eu: 'Koloreztatu 3 zati (zenbakitzailea).', es: 'Colorea 3 partes (numerador).', ar: 'لوّن 3 أجزاء (البسط).' }, math: '$\\frac{3}{4}$' }
        ],
        example: '$\\frac{2}{6}\\qquad\\frac{5}{8}\\qquad\\frac{1}{3}$',
        takeaway: {
            eu: 'Irudia aldatu daiteke; zatiak berdinak izan behar dira beti.',
            es: 'La figura puede cambiar; las partes siempre tienen que ser iguales.',
            ar: 'قد يتغيّر الشكل، لكن يجب أن تكون الأجزاء متساوية دائمًا.'
        },
        figure: (language) => <ShapesFigure language={language} />
    },
    {
        id: 'division',
        stage: 'meaning',
        title: { eu: 'Zatikia zatiketa gisa', es: 'La fracción como división', ar: 'الكسر قسمةً' },
        goal: {
            eu: 'Zatiki baten balioa zatiketa eginez kalkulatzea.',
            es: 'Calcular el valor de una fracción haciendo la división.',
            ar: 'حساب قيمة الكسر بإجراء القسمة.'
        },
        explanation: {
            eu: 'Zatiki-marrak zatiketa ere esan nahi du: $\\frac{3}{4}=3\\mathbin{:}4$. Zatiketa eginda, zatikiaren balioa lortzen da, askotan zenbaki hamartar bat. Adibidez, 3 pizza 4 lagunen artean banatzen badira, bakoitzak $\\frac{3}{4}$ jaten du, hau da, 0,75 pizza. Hala, zatiki bakoitza zenbaki bat da, eta zenbaki-zuzenean kokatu daiteke.',
            es: 'La raya de fracción también significa división: $\\frac{3}{4}=3\\mathbin{:}4$. Al hacer la división se obtiene el valor de la fracción, muchas veces un número decimal. Por ejemplo, si se reparten 3 pizzas entre 4 personas, cada una come $\\frac{3}{4}$, es decir, 0,75 pizzas. Así, cada fracción es un número y se puede situar en la recta.',
            ar: 'يعني خط الكسر أيضًا القسمة: $\\frac{3}{4}=3\\mathbin{:}4$. وبإجراء القسمة نحصل على قيمة الكسر، وغالبًا ما تكون عددًا عشريًا. مثلًا، إذا وُزّعت 3 بيتزا على 4 أشخاص يأكل كل واحد $\\frac{3}{4}$، أي 0.75 بيتزا. وهكذا فكل كسر عدد يمكن وضعه على خط الأعداد.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Gazta-kutxa', es: 'Los quesitos', ar: 'علبة الجبن' }, text: { eu: 'Jonek kutxaren $\\frac{3}{8}$ jan du.', es: 'Juan se ha comido $\\frac{3}{8}$ de la caja.', ar: 'أكل خوان $\\frac{3}{8}$ العلبة.' }, math: dec('$\\begin{gathered}\\frac{3}{8}=3\\mathbin{:}8\\\\=0{,}375\\end{gathered}$') },
            { title: { eu: 'Zatiki bera, balio bera', es: 'Misma fracción, mismo valor', ar: 'الكسر نفسه والقيمة نفسها' }, text: { eu: 'Zatiketak erakusten du zatikia 1 baino txikiagoa, berdina edo handiagoa den.', es: 'La división muestra si la fracción es menor, igual o mayor que 1.', ar: 'تُظهر القسمة هل الكسر أصغر من 1 أم يساويه أم أكبر منه.' }, math: dec('$\\begin{gathered}\\frac{15}{8}=15\\mathbin{:}8\\\\=1{,}875\\end{gathered}$') }
        ],
        example: dec('$\\frac{9}{15}=9\\mathbin{:}15=0{,}6$'),
        takeaway: {
            eu: 'Zatikia = zenbakitzailea : izendatzailea.',
            es: 'Fracción = numerador : denominador.',
            ar: 'الكسر = البسط : المقام.'
        },
        figure: (language) => <MeaningFigure language={language} />
    },
    {
        id: 'types',
        stage: 'types',
        title: { eu: 'Zatiki propioak eta inpropioak', es: 'Fracciones propias e impropias', ar: 'الكسور الحقيقية وغير الحقيقية' },
        goal: {
            eu: 'Zatiki bat 1 baino txikiagoa, berdina edo handiagoa den bereiztea.',
            es: 'Distinguir si una fracción es menor, igual o mayor que 1.',
            ar: 'التمييز هل الكسر أصغر من 1 أم يساويه أم أكبر منه.'
        },
        explanation: {
            eu: 'Zenbakitzailea eta izendatzailea alderatuz dakigu zatikiak unitatea osatzen duen ala ez. Jonek 8tik 3 zati jaten baditu, kutxa bat baino gutxiago jan du; 8 zati jaten baditu, kutxa osoa; eta kutxa bat eta beste baten 3 zati jaten baditu, $\\frac{11}{8}$: kutxa bat baino gehiago.',
            es: 'Comparando numerador y denominador sabemos si la fracción completa la unidad o no. Si Juan come 3 porciones de 8, ha comido menos de una caja; si come 8, la caja entera; y si come una caja y 3 porciones de otra, $\\frac{11}{8}$: más de una caja.',
            ar: 'بمقارنة البسط والمقام نعرف هل يُكمل الكسر الوحدة أم لا. إذا أكل خوان 3 قطع من 8 فقد أكل أقل من علبة، وإذا أكل 8 فالعلبة كاملة، وإذا أكل علبة و3 قطع من أخرى فهو $\\frac{11}{8}$: أكثر من علبة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Propioa', es: 'Propia', ar: 'حقيقي' }, text: { eu: 'Zenbakitzailea < izendatzailea: 1 baino gutxiago balio du.', es: 'Numerador < denominador: vale menos que 1.', ar: 'البسط < المقام: قيمته أقل من 1.' }, math: '$\\frac{3}{8}<1$' },
            { title: { eu: 'Unitatea', es: 'Igual a la unidad', ar: 'يساوي الواحد' }, text: { eu: 'Zenbakitzailea = izendatzailea: 1 balio du.', es: 'Numerador = denominador: vale 1.', ar: 'البسط = المقام: قيمته 1.' }, math: '$\\frac{8}{8}=1$' },
            { title: { eu: 'Inpropioa', es: 'Impropia', ar: 'غير حقيقي' }, text: { eu: 'Zenbakitzailea > izendatzailea: 1 baino gehiago balio du.', es: 'Numerador > denominador: vale más que 1.', ar: 'البسط > المقام: قيمته أكثر من 1.' }, math: '$\\frac{11}{8}>1$' }
        ],
        example: '$\\frac{4}{7}<1\\qquad\\frac{6}{6}=1\\qquad\\frac{9}{5}>1$',
        takeaway: {
            eu: 'Begiratu goian ala behean dagoen zenbaki handiena.',
            es: 'Mira si el número mayor está arriba o abajo.',
            ar: 'انظر: هل العدد الأكبر في الأعلى أم في الأسفل؟'
        },
        figure: (language) => <TypesLineFigure language={language} />
    },
    {
        id: 'mixed',
        stage: 'types',
        title: { eu: 'Zenbaki mistoak', es: 'Números mixtos', ar: 'الأعداد الكسرية' },
        goal: {
            eu: 'Zatiki inpropio bat zenbaki misto gisa idaztea eta alderantziz.',
            es: 'Escribir una fracción impropia como número mixto y al revés.',
            ar: 'كتابة كسر غير حقيقي عددًا كسريًا وبالعكس.'
        },
        explanation: {
            eu: 'Zatiki inpropio batek unitate osoak ditu. Zenbaki misto gisa idazten da: zenbaki oso bat gehi zatiki propio bat. Adibidez, $\\frac{11}{8}$ kutxa oso bat eta $\\frac{3}{8}$ dira: $1\\frac{3}{8}$. Unitateak kalkulatzeko, zatitu zenbakitzailea izendatzaileaz: zatidura unitate osoak dira, eta hondarra soberan geratzen den zatiaren zenbakitzailea.',
            es: 'Una fracción impropia contiene unidades completas. Se escribe como número mixto: un número natural más una fracción propia. Por ejemplo, $\\frac{11}{8}$ son una caja entera y $\\frac{3}{8}$: $1\\frac{3}{8}$. Para calcular las unidades, divide el numerador entre el denominador: el cociente son las unidades completas y el resto, el numerador de la parte que sobra.',
            ar: 'يحتوي الكسر غير الحقيقي على وحدات كاملة، ويُكتب عددًا كسريًا: عدد طبيعي مع كسر حقيقي. مثلًا $\\frac{11}{8}$ علبة كاملة و$\\frac{3}{8}$: أي $1\\frac{3}{8}$. لحساب الوحدات اقسم البسط على المقام: الناتج هو الوحدات الكاملة، والباقي هو بسط الجزء المتبقي.'
        },
        problem: { eu: 'Idatzi $\\frac{17}{5}$ zenbaki misto gisa.', es: 'Escribe $\\frac{17}{5}$ como número mixto.', ar: 'اكتب $\\frac{17}{5}$ عددًا كسريًا.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zatitu zenbakitzailea izendatzaileaz.', es: 'Divide el numerador entre el denominador.', ar: 'اقسم البسط على المقام.' }, math: '$17=5\\cdot 3+2$' },
            { text: { eu: 'Zatidura (3) unitate osoak dira; hondarra (2), zenbakitzaile berria.', es: 'El cociente (3) son las unidades; el resto (2), el nuevo numerador.', ar: 'الناتج (3) هو الوحدات، والباقي (2) هو البسط الجديد.' }, math: '$\\frac{17}{5}=3\\frac{2}{5}$' },
            { text: { eu: 'Itzultzeko: biderkatu unitateak izendatzaileaz eta batu zenbakitzailea.', es: 'Para volver: multiplica las unidades por el denominador y suma el numerador.', ar: 'للعودة: اضرب الوحدات في المقام وأضف البسط.' }, math: '$3\\frac{2}{5}=\\frac{3\\cdot 5+2}{5}=\\frac{17}{5}$' }
        ],
        example: '$\\frac{15}{4}=3\\frac{3}{4}\\qquad 2\\frac{1}{3}=\\frac{7}{3}$',
        takeaway: {
            eu: 'Zatidura = unitateak; hondarra = soberan geratzen diren zatiak.',
            es: 'Cociente = unidades; resto = partes que sobran.',
            ar: 'الناتج = الوحدات؛ الباقي = الأجزاء المتبقية.'
        },
        figure: (language) => <MixedFigure language={language} />
    },
    {
        id: 'line',
        stage: 'types',
        title: { eu: 'Zatikiak zenbaki-zuzenean', es: 'Fracciones en la recta', ar: 'الكسور على المستقيم' },
        goal: {
            eu: 'Zatiki bat zenbaki-zuzenean kokatzea.',
            es: 'Situar una fracción en la recta numérica.',
            ar: 'وضع كسر على خط الأعداد.'
        },
        explanation: {
            eu: 'Zatikiak zenbakiak direnez, zenbaki-zuzenean kokatzen dira. Unitateen arteko distantzia beti berdina izan behar da. Zatiki propioak 0 eta 1 artean daude; unitatea balio dutenak, 1ean; eta inpropioak, 1etik aurrera.',
            es: 'Como las fracciones son números, se sitúan en la recta. La distancia entre las unidades siempre tiene que ser la misma. Las fracciones propias están entre 0 y 1; las iguales a la unidad, en el 1; y las impropias, a partir del 1.',
            ar: 'بما أن الكسور أعداد فهي توضع على خط الأعداد. ويجب أن تكون المسافة بين الوحدات متساوية دائمًا. الكسور الحقيقية بين 0 و1، والتي تساوي الواحد عند 1، وغير الحقيقية بعد 1.'
        },
        problem: { eu: 'Kokatu $\\frac{5}{3}$ zenbaki-zuzenean.', es: 'Sitúa $\\frac{5}{3}$ en la recta.', ar: 'ضع $\\frac{5}{3}$ على خط الأعداد.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Marraztu zuzena eta markatu unitateak: 0, 1, 2…', es: 'Dibuja la recta y marca las unidades: 0, 1, 2…', ar: 'ارسم المستقيم وعلّم الوحدات: 0، 1، 2…' } },
            { text: { eu: 'Zatitu unitate bakoitza izendatzaileak adina zatitan: 3.', es: 'Divide cada unidad en tantas partes como el denominador: 3.', ar: 'قسّم كل وحدة إلى أجزاء بعدد المقام: 3.' } },
            { text: { eu: 'Zerotik hasita, aurreratu zenbakitzaileak adina zati: 5.', es: 'Desde el cero, avanza tantas partes como el numerador: 5.', ar: 'انطلاقًا من الصفر تقدّم أجزاءً بعدد البسط: 5.' }, math: '$1<\\frac{5}{3}<2$' }
        ],
        example: '$0<\\frac{2}{3}<1<\\frac{5}{3}<2$',
        takeaway: {
            eu: 'Izendatzailea: unitatea zenbat zatitan. Zenbakitzailea: zenbat zati aurrera.',
            es: 'Denominador: en cuántas partes la unidad. Numerador: cuántas partes avanzar.',
            ar: 'المقام: كم جزءًا في الوحدة. البسط: كم جزءًا نتقدّم.'
        },
        figure: (language) => <PlaceOnLineFigure language={language} />
    },
    {
        id: 'equivalent',
        stage: 'equivalence',
        title: { eu: 'Zatiki baliokideak', es: 'Fracciones equivalentes', ar: 'الكسور المتكافئة' },
        goal: {
            eu: 'Bi zatiki baliokideak diren egiaztatzea biderkadura gurutzatuekin.',
            es: 'Comprobar si dos fracciones son equivalentes con los productos cruzados.',
            ar: 'التحقق من تكافؤ كسرين بالضرب التبادلي.'
        },
        explanation: {
            eu: 'Bi zatiki baliokideak dira balio bera dutenean: kopuru bera adierazten dute. Adibidez, $\\frac{2}{5}$ eta $\\frac{6}{15}$ baliokideak dira: $2\\mathbin{:}5=0{,}4$ eta $6\\mathbin{:}15=0{,}4$. Egiaztatzeko modurik errazena biderkadura gurutzatuak dira: bi biderkadurak berdinak badira, zatikiak baliokideak dira.',
            es: 'Dos fracciones son equivalentes cuando tienen el mismo valor: representan la misma cantidad. Por ejemplo, $\\frac{2}{5}$ y $\\frac{6}{15}$ son equivalentes: $2\\mathbin{:}5=0{,}4$ y $6\\mathbin{:}15=0{,}4$. La forma más sencilla de comprobarlo son los productos cruzados: si los dos productos son iguales, las fracciones son equivalentes.',
            ar: 'يكون الكسران متكافئين عندما تكون لهما القيمة نفسها: يمثّلان الكمية نفسها. مثلًا $\\frac{2}{5}$ و$\\frac{6}{15}$ متكافئان: $2\\mathbin{:}5=0.4$ و$6\\mathbin{:}15=0.4$. وأسهل طريقة للتحقق الضرب التبادلي: إذا تساوى الناتجان فالكسران متكافئان.'
        },
        problem: { eu: 'Baliokideak al dira $\\frac{2}{5}$ eta $\\frac{6}{15}$?', es: '¿Son equivalentes $\\frac{2}{5}$ y $\\frac{6}{15}$?', ar: 'هل $\\frac{2}{5}$ و$\\frac{6}{15}$ متكافئان؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu lehenengoaren zenbakitzailea bigarrenaren izendatzaileaz.', es: 'Multiplica el numerador de la primera por el denominador de la segunda.', ar: 'اضرب بسط الأول في مقام الثاني.' }, math: '$2\\cdot 15=30$' },
            { text: { eu: 'Biderkatu lehenengoaren izendatzailea bigarrenaren zenbakitzaileaz.', es: 'Multiplica el denominador de la primera por el numerador de la segunda.', ar: 'اضرب مقام الأول في بسط الثاني.' }, math: '$5\\cdot 6=30$' },
            { text: { eu: 'Berdinak dira: baliokideak.', es: 'Son iguales: equivalentes.', ar: 'متساويان: الكسران متكافئان.' }, math: '$\\frac{2}{5}=\\frac{6}{15}$' }
        ],
        example: '$\\frac{3}{4}=\\frac{6}{8}=\\frac{9}{12}$',
        takeaway: {
            eu: 'Biderkadura gurutzatuak berdinak → zatiki baliokideak.',
            es: 'Productos cruzados iguales → fracciones equivalentes.',
            ar: 'الضرب التبادلي متساوٍ ← الكسران متكافئان.'
        },
        figure: (language) => <EquivalenceFigure language={language} />
    },
    {
        id: 'amplify-simplify',
        stage: 'equivalence',
        title: { eu: 'Anplifikatu eta sinplifikatu', es: 'Amplificar y simplificar', ar: 'التوسيع والتبسيط' },
        goal: {
            eu: 'Zatiki baliokideak lortzea eta zatiki bat laburtezina izan arte sinplifikatzea.',
            es: 'Obtener fracciones equivalentes y simplificar una fracción hasta la irreducible.',
            ar: 'الحصول على كسور متكافئة وتبسيط كسر حتى أبسط صورة.'
        },
        explanation: {
            eu: 'Zenbakitzailea eta izendatzailea zenbaki berberaz biderkatzen edo zatitzen badira, zatiki baliokide bat lortzen da. Biderkatzeari anplifikatu esaten zaio; zatitzeari, sinplifikatu. Gehiago sinplifikatu ezin denean, zatikia laburtezina da. Laburtezina zuzenean lortzeko, zatitu bi gaiak haien ZKHz.',
            es: 'Si se multiplican o se dividen el numerador y el denominador por un mismo número, se obtiene una fracción equivalente. Multiplicar se llama amplificar; dividir, simplificar. Cuando ya no se puede simplificar más, la fracción es irreducible. Para llegar a la irreducible de una vez, divide los dos términos entre su m.c.d.',
            ar: 'إذا ضُرب البسط والمقام في العدد نفسه أو قُسما عليه نحصل على كسر مكافئ. يسمّى الضرب توسيعًا والقسمة تبسيطًا. وعندما لا يمكن التبسيط أكثر يكون الكسر في أبسط صورة. وللوصول إليها مباشرة اقسم الحدّين على القاسم المشترك الأكبر لهما.'
        },
        problem: { eu: 'Sinplifikatu $\\frac{30}{40}$.', es: 'Simplifica $\\frac{30}{40}$.', ar: 'بسّط $\\frac{30}{40}$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biak 10ez zatitu daitezke (0z amaitzen dira).', es: 'Los dos se pueden dividir entre 10 (acaban en 0).', ar: 'يمكن قسمة الاثنين على 10 (ينتهيان بـ 0).' }, math: '$\\frac{30}{40}=\\frac{30\\mathbin{:}10}{40\\mathbin{:}10}=\\frac{3}{4}$' },
            { text: { eu: '3k eta 4k ez dute zatitzaile komunik (1 izan ezik): laburtezina da.', es: '3 y 4 no tienen divisores comunes (salvo el 1): es irreducible.', ar: 'لا قاسم مشتركًا لـ 3 و4 (غير 1): الكسر في أبسط صورة.' }, math: notation('$@GCD(30,40)=10$') },
            { title: { eu: 'Anplifikatu', es: 'Amplificar', ar: 'التوسيع' }, text: { eu: 'Alderantziz, biderkatuz zatiki baliokide gehiago lortzen dira.', es: 'Al revés, multiplicando se obtienen más fracciones equivalentes.', ar: 'وبالعكس، بالضرب نحصل على كسور متكافئة أخرى.' }, math: '$\\frac{3}{4}=\\frac{3\\cdot 5}{4\\cdot 5}=\\frac{15}{20}$' }
        ],
        example: '$\\frac{6}{15}=\\frac{6\\mathbin{:}3}{15\\mathbin{:}3}=\\frac{2}{5}$',
        takeaway: {
            eu: 'Bi gaiei eragiketa bera; bestela zatikia aldatzen da.',
            es: 'La misma operación a los dos términos; si no, la fracción cambia.',
            ar: 'العملية نفسها على الحدّين؛ وإلا تغيّر الكسر.'
        },
        figure: (language) => <SimplifyBarsFigure language={language} />
    },
    {
        id: 'compare',
        stage: 'equivalence',
        title: { eu: 'Zatikiak alderatu eta ordenatu', es: 'Comparar y ordenar fracciones', ar: 'مقارنة الكسور وترتيبها' },
        goal: {
            eu: 'Zatikiak izendatzaile komunera eramanez alderatzea eta ordenatzea.',
            es: 'Comparar y ordenar fracciones pasándolas a común denominador.',
            ar: 'مقارنة الكسور وترتيبها بتوحيد المقامات.'
        },
        explanation: {
            eu: 'Jorgek bere kromoen $\\frac{2}{3}$ itsatsi ditu, Aracelik erdia eta Lucasek $\\frac{3}{4}$. Nork itsatsi ditu gehien? Izendatzaile bera badute, zenbakitzaile handiena duena da handiena. Izendatzaileak desberdinak badira, bilatu zatiki baliokideak izendatzaile berarekin (izendatzaileen MKT) eta alderatu zenbakitzaileak.',
            es: 'Jorge ha pegado $\\frac{2}{3}$ de sus cromos, Araceli la mitad y Lucas $\\frac{3}{4}$. ¿Quién ha pegado más? Si tienen el mismo denominador, es mayor la de mayor numerador. Si los denominadores son distintos, busca fracciones equivalentes con el mismo denominador (el m.c.m. de los denominadores) y compara los numeradores.',
            ar: 'ألصق خورخي $\\frac{2}{3}$ صوره، وأراسيلي النصف، ولوكاس $\\frac{3}{4}$. من ألصق أكثر؟ إذا كان المقام نفسه فالأكبر صاحب البسط الأكبر. وإذا اختلفت المقامات فابحث عن كسور مكافئة بالمقام نفسه (المضاعف المشترك الأصغر للمقامات) وقارن البسوط.'
        },
        problem: { eu: 'Ordenatu handienetik txikienera: $\\frac{2}{3}$, $\\frac{1}{2}$ eta $\\frac{3}{4}$.', es: 'Ordena de mayor a menor: $\\frac{2}{3}$, $\\frac{1}{2}$ y $\\frac{3}{4}$.', ar: 'رتّب من الأكبر إلى الأصغر: $\\frac{2}{3}$ و$\\frac{1}{2}$ و$\\frac{3}{4}$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Izendatzaile komuna: 3, 2 eta 4ren MKT.', es: 'Denominador común: el m.c.m. de 3, 2 y 4.', ar: 'المقام المشترك: م.م.أ للأعداد 3 و2 و4.' }, math: notation('$@LCM(3,2,4)=12$') },
            { text: { eu: 'Idatzi zatiki baliokideak 12 izendatzailearekin.', es: 'Escribe las fracciones equivalentes con denominador 12.', ar: 'اكتب الكسور المكافئة بالمقام 12.' }, math: '$\\frac{2}{3}=\\frac{8}{12}\\quad\\frac{1}{2}=\\frac{6}{12}\\quad\\frac{3}{4}=\\frac{9}{12}$' },
            { text: { eu: 'Alderatu zenbakitzaileak.', es: 'Compara los numeradores.', ar: 'قارن البسوط.' }, math: '$\\frac{3}{4}>\\frac{2}{3}>\\frac{1}{2}$' }
        ],
        example: '$\\frac{5}{7}>\\frac{3}{7}\\qquad\\frac{3}{5}>\\frac{3}{8}$',
        takeaway: {
            eu: 'Izendatzaile bera → zenbakitzaile handiena. Zenbakitzaile bera → izendatzaile txikiena.',
            es: 'Mismo denominador → el de mayor numerador. Mismo numerador → el de menor denominador.',
            ar: 'المقام نفسه ← صاحب البسط الأكبر. البسط نفسه ← صاحب المقام الأصغر.'
        },
        figure: (language) => <StickersFigure language={language} />
    },
    {
        id: 'add-same',
        stage: 'operations',
        title: { eu: 'Izendatzaile bereko batuketak eta kenketak', es: 'Sumas y restas con igual denominador', ar: 'الجمع والطرح بالمقام نفسه' },
        goal: {
            eu: 'Izendatzaile bera duten zatikiak batzea eta kentzea.',
            es: 'Sumar y restar fracciones con el mismo denominador.',
            ar: 'جمع كسور لها المقام نفسه وطرحها.'
        },
        explanation: {
            eu: 'Zatiki guztiek izendatzaile bera dutenean, zati mota bereko zatiak dira (zazpirenak zazpirenekin, adibidez). Batu edo kendu zenbakitzaileak, eta izendatzaile bera utzi. Amaieran, sinplifikatu ahal bada.',
            es: 'Cuando todas las fracciones tienen el mismo denominador, son partes del mismo tipo (séptimos con séptimos, por ejemplo). Se suman o se restan los numeradores y se deja el mismo denominador. Al final, se simplifica si se puede.',
            ar: 'عندما يكون للكسور المقام نفسه فهي أجزاء من النوع نفسه (أسباع مع أسباع مثلًا). نجمع البسوط أو نطرحها ونُبقي المقام نفسه. وفي النهاية نبسّط إن أمكن.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Batuketa', es: 'Suma', ar: 'الجمع' }, text: { eu: 'Batu zenbakitzaileak.', es: 'Suma los numeradores.', ar: 'اجمع البسوط.' }, math: '$\\begin{gathered}\\frac{2}{7}+\\frac{3}{7}\\\\=\\frac{2+3}{7}=\\frac{5}{7}\\end{gathered}$' },
            { title: { eu: 'Kenketa', es: 'Resta', ar: 'الطرح' }, text: { eu: 'Kendu zenbakitzaileak.', es: 'Resta los numeradores.', ar: 'اطرح البسوط.' }, math: '$\\begin{gathered}\\frac{7}{9}-\\frac{4}{9}\\\\=\\frac{3}{9}=\\frac{1}{3}\\end{gathered}$' },
            { title: { eu: 'Kontuz', es: 'Cuidado', ar: 'انتبه' }, text: { eu: 'Izendatzaileak ez dira batzen: $\\frac{2}{7}+\\frac{3}{7}$ ez da $\\frac{5}{14}$.', es: 'Los denominadores no se suman: $\\frac{2}{7}+\\frac{3}{7}$ no es $\\frac{5}{14}$.', ar: 'لا نجمع المقامات: $\\frac{2}{7}+\\frac{3}{7}$ ليس $\\frac{5}{14}$.' } }
        ],
        example: '$\\frac{1}{5}+\\frac{2}{5}+\\frac{4}{5}=\\frac{7}{5}$',
        takeaway: {
            eu: 'Izendatzaile bera: zenbakitzaileekin bakarrik egiten da eragiketa.',
            es: 'Mismo denominador: solo se opera con los numeradores.',
            ar: 'المقام نفسه: نُجري العملية على البسوط فقط.'
        },
        figure: (language) => <SameDenominatorFigure language={language} />
    },
    {
        id: 'add-different',
        stage: 'operations',
        title: { eu: 'Izendatzaile desberdineko batuketak eta kenketak', es: 'Sumas y restas con distinto denominador', ar: 'الجمع والطرح بمقامات مختلفة' },
        goal: {
            eu: 'Izendatzaile desberdineko zatikiak izendatzaile komunera eramanez batzea eta kentzea.',
            es: 'Sumar y restar fracciones de distinto denominador reduciéndolas a común denominador.',
            ar: 'جمع كسور بمقامات مختلفة وطرحها بتوحيد المقامات.'
        },
        explanation: {
            eu: 'Erdiak eta herenak ezin dira zuzenean batu: zati mota desberdinak dira. Lehenik, zatikiak izendatzaile komunera eramaten dira: izendatzaileen MKT izendatzaile berria da, eta zenbakitzaile bakoitza zatiki baliokidea lortzeko behar den zenbakiaz biderkatzen da. Gero, izendatzaile bereko zatikiak bezala batu edo kendu.',
            es: 'Medios y tercios no se pueden sumar directamente: son partes de distinto tipo. Primero se reducen a común denominador: el m.c.m. de los denominadores es el nuevo denominador, y cada numerador se multiplica por lo necesario para obtener la fracción equivalente. Después, se suman o restan como las de igual denominador.',
            ar: 'لا يمكن جمع الأنصاف مع الأثلاث مباشرة: فهي أجزاء من أنواع مختلفة. أولًا نوحّد المقامات: المضاعف المشترك الأصغر للمقامات هو المقام الجديد، ونضرب كل بسط في العدد اللازم للحصول على الكسر المكافئ. ثم نجمع أو نطرح كما في الكسور ذات المقام نفسه.'
        },
        problem: { eu: 'Kalkulatu $\\frac{1}{2}+\\frac{1}{3}$.', es: 'Calcula $\\frac{1}{2}+\\frac{1}{3}$.', ar: 'احسب $\\frac{1}{2}+\\frac{1}{3}$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Izendatzaile komuna: izendatzaileen MKT.', es: 'Denominador común: el m.c.m. de los denominadores.', ar: 'المقام المشترك: م.م.أ للمقامات.' }, math: notation('$@LCM(2,3)=6$') },
            { text: { eu: 'Idatzi zatiki baliokideak 6 izendatzailearekin.', es: 'Escribe las fracciones equivalentes con denominador 6.', ar: 'اكتب الكسور المكافئة بالمقام 6.' }, math: '$\\frac{1}{2}=\\frac{3}{6}\\qquad\\frac{1}{3}=\\frac{2}{6}$' },
            { text: { eu: 'Batu zenbakitzaileak.', es: 'Suma los numeradores.', ar: 'اجمع البسوط.' }, math: '$\\frac{3}{6}+\\frac{2}{6}=\\frac{5}{6}$' }
        ],
        example: '$\\frac{3}{4}-\\frac{1}{6}=\\frac{9}{12}-\\frac{2}{12}=\\frac{7}{12}$',
        takeaway: {
            eu: 'Lehenik izendatzaile bera; gero zenbakitzaileak.',
            es: 'Primero el mismo denominador; después, los numeradores.',
            ar: 'أولًا المقام نفسه، ثم البسوط.'
        },
        figure: (language) => <AddFigure language={language} />
    },
    {
        id: 'multiply',
        stage: 'operations',
        title: { eu: 'Zatikien biderketa', es: 'Multiplicación de fracciones', ar: 'ضرب الكسور' },
        goal: {
            eu: 'Zenbaki bat zatiki batez eta bi zatiki elkarren artean biderkatzea.',
            es: 'Multiplicar un número por una fracción y dos fracciones entre sí.',
            ar: 'ضرب عدد في كسر وضرب كسرين.'
        },
        explanation: {
            eu: 'Bi zatiki biderkatzeko, zenbakitzaileak elkarren artean biderkatzen dira, eta izendatzaileak elkarren artean. Zenbaki oso bat zatiki batez biderkatzeko, zenbakitzailea bakarrik biderkatzen da, zenbakia $\\frac{n}{1}$ baita. Ez da izendatzaile komunik behar. Amaieran, sinplifikatu.',
            es: 'Para multiplicar dos fracciones, se multiplican los numeradores entre sí y los denominadores entre sí. Para multiplicar un número por una fracción, solo se multiplica el numerador, porque el número es $\\frac{n}{1}$. No hace falta común denominador. Al final, simplifica.',
            ar: 'لضرب كسرين نضرب البسطين معًا والمقامين معًا. ولضرب عدد في كسر نضرب البسط فقط، لأن العدد هو $\\frac{n}{1}$. ولا نحتاج إلى مقام مشترك. وفي النهاية نبسّط.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Bi zatiki', es: 'Dos fracciones', ar: 'كسران' }, text: { eu: 'Zenbakitzaileak bider zenbakitzaileak, izendatzaileak bider izendatzaileak.', es: 'Numeradores por numeradores, denominadores por denominadores.', ar: 'البسط في البسط والمقام في المقام.' }, math: '$\\begin{gathered}\\frac{2}{3}\\cdot\\frac{3}{4}=\\frac{2\\cdot 3}{3\\cdot 4}\\\\=\\frac{6}{12}=\\frac{1}{2}\\end{gathered}$' },
            { title: { eu: 'Zenbaki bat bider zatiki bat', es: 'Un número por una fracción', ar: 'عدد في كسر' }, text: { eu: 'Zenbakiak zenbakitzailea biderkatzen du.', es: 'El número multiplica al numerador.', ar: 'العدد يضرب البسط.' }, math: '$4\\cdot\\frac{2}{5}=\\frac{8}{5}$' }
        ],
        example: '$\\frac{3}{5}\\cdot\\frac{10}{9}=\\frac{30}{45}=\\frac{2}{3}$',
        takeaway: {
            eu: 'Biderketan zuzen-zuzenean: goikoak goikoekin, behekoak behekoekin.',
            es: 'En la multiplicación, en línea: arriba con arriba, abajo con abajo.',
            ar: 'في الضرب نضرب مباشرة: الأعلى في الأعلى والأسفل في الأسفل.'
        },
        figure: (language) => <AreaFigure language={language} />
    },
    {
        id: 'divide',
        stage: 'operations',
        title: { eu: 'Zatikien zatiketa', es: 'División de fracciones', ar: 'قسمة الكسور' },
        goal: {
            eu: 'Bi zatiki zatitzea biderkadura gurutzatuekin.',
            es: 'Dividir dos fracciones con los productos cruzados.',
            ar: 'قسمة كسرين بالضرب التبادلي.'
        },
        explanation: {
            eu: 'Bi zatiki zatitzeko, gurutzean biderkatzen da: lehenengoaren zenbakitzailea bider bigarrenaren izendatzailea da zenbakitzaile berria, eta lehenengoaren izendatzailea bider bigarrenaren zenbakitzailea, izendatzaile berria. Beste modu batean esanda: lehenengoa bider bigarrenaren alderantzizkoa. Zatiki bat zenbaki batez zatitzeko, izendatzailea biderkatzen da.',
            es: 'Para dividir dos fracciones se multiplica en cruz: el numerador de la primera por el denominador de la segunda es el nuevo numerador, y el denominador de la primera por el numerador de la segunda, el nuevo denominador. Dicho de otra forma: la primera por la inversa de la segunda. Para dividir una fracción entre un número, se multiplica el denominador.',
            ar: 'لقسمة كسرين نضرب تبادليًا: بسط الأول في مقام الثاني هو البسط الجديد، ومقام الأول في بسط الثاني هو المقام الجديد. وبعبارة أخرى: الأول في مقلوب الثاني. ولقسمة كسر على عدد نضرب المقام فيه.'
        },
        problem: { eu: 'Kalkulatu $\\frac{3}{4}\\mathbin{:}\\frac{1}{8}$.', es: 'Calcula $\\frac{3}{4}\\mathbin{:}\\frac{1}{8}$.', ar: 'احسب $\\frac{3}{4}\\mathbin{:}\\frac{1}{8}$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zenbakitzaile berria: 3 · 8.', es: 'Nuevo numerador: 3 · 8.', ar: 'البسط الجديد: 3 · 8.' }, math: '$3\\cdot 8=24$' },
            { text: { eu: 'Izendatzaile berria: 4 · 1.', es: 'Nuevo denominador: 4 · 1.', ar: 'المقام الجديد: 4 · 1.' }, math: '$4\\cdot 1=4$' },
            { text: { eu: 'Sinplifikatu: 3/4-n sei zortziren sartzen dira.', es: 'Simplifica: en 3/4 caben seis octavos.', ar: 'بسّط: في 3/4 ستة أثمان.' }, math: '$\\frac{24}{4}=6$' }
        ],
        example: '$\\frac{2}{5}\\mathbin{:}\\frac{3}{7}=\\frac{14}{15}\\qquad\\frac{4}{9}\\mathbin{:}2=\\frac{4}{18}=\\frac{2}{9}$',
        takeaway: {
            eu: 'Zatiketan gurutzean; biderketan zuzenean.',
            es: 'En la división, en cruz; en la multiplicación, en línea.',
            ar: 'في القسمة تبادليًا، وفي الضرب مباشرة.'
        },
        figure: (language) => <DivideFigure language={language} />
    },
    {
        id: 'fraction-of',
        stage: 'problems',
        title: { eu: 'Kopuru baten zatikia', es: 'Fracción de una cantidad', ar: 'كسر من كمية' },
        goal: {
            eu: 'Kopuru baten zatiki bat kalkulatzea.',
            es: 'Calcular la fracción de una cantidad.',
            ar: 'حساب كسر من كمية.'
        },
        explanation: {
            eu: 'Zatiki batek kopuru baten gainean eragiten du: 120 euroren $\\frac{3}{8}$ kalkulatzeko, zatitu 120 8 zatitan (zati bakoitza 15) eta hartu horietako 3: 45 €. Laburrago: biderkatu kopurua zenbakitzaileaz eta zatitu izendatzaileaz. Ordena ez da garrantzitsua, baina lehenik zatitzea errazagoa izaten da.',
            es: 'Una fracción actúa sobre una cantidad: para calcular $\\frac{3}{8}$ de 120 euros, divide 120 en 8 partes (cada una 15) y toma 3: 45 €. Más corto: multiplica la cantidad por el numerador y divide entre el denominador. El orden no importa, pero dividir primero suele ser más fácil.',
            ar: 'يعمل الكسر على كمية: لحساب $\\frac{3}{8}$ من 120 يورو، اقسم 120 إلى 8 أجزاء (كل جزء 15) وخذ 3: ‏45 €. وباختصار: اضرب الكمية في البسط واقسم على المقام. الترتيب لا يهم، لكن القسمة أولًا أسهل عادة.'
        },
        problem: { eu: 'Kalkulatu 120ren $\\frac{3}{8}$.', es: 'Calcula $\\frac{3}{8}$ de 120.', ar: 'احسب $\\frac{3}{8}$ من 120.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zatitu kopurua izendatzaileaz: zati baten balioa.', es: 'Divide la cantidad entre el denominador: lo que vale una parte.', ar: 'اقسم الكمية على المقام: قيمة الجزء الواحد.' }, math: '$120\\mathbin{:}8=15$' },
            { text: { eu: 'Biderkatu zenbakitzaileaz.', es: 'Multiplica por el numerador.', ar: 'اضرب في البسط.' }, math: '$15\\cdot 3=45$' }
        ],
        example: { eu: '$30\\ \\text{-ren}\\ \\frac{2}{5}=30\\mathbin{:}5\\cdot 2=12$', es: '$\\frac{2}{5}\\ \\text{de}\\ 30=30\\mathbin{:}5\\cdot 2=12$', ar: '$30\\mathbin{:}5\\cdot 2=12$' },
        takeaway: {
            eu: 'Kopuru baten zatikia: zatitu izendatzaileaz eta biderkatu zenbakitzaileaz.',
            es: 'Fracción de una cantidad: divide entre el denominador y multiplica por el numerador.',
            ar: 'كسر من كمية: اقسم على المقام واضرب في البسط.'
        },
        figure: (language) => <FractionOfFigure language={language} />
    },
    {
        id: 'problems',
        stage: 'problems',
        title: { eu: 'Zatikiekin buruketak', es: 'Problemas con fracciones', ar: 'مسائل بالكسور' },
        goal: {
            eu: 'Zatikiekin buruketak ebaztea, geratzen den zatia ere kalkulatuz.',
            es: 'Resolver problemas con fracciones, también calculando la parte que queda.',
            ar: 'حل مسائل بالكسور، ومنها حساب الجزء المتبقي.'
        },
        explanation: {
            eu: 'Buruketa askotan zati bat erabiltzen da eta geratzen dena galdetzen da. Osoa beti zatiki unitatea da ($\\frac{8}{8}$, $\\frac{5}{5}$…): geratzen den zatia kalkulatzeko, kendu erabilitakoa unitateari. Gero, zatiki hori kopuruari aplikatu. Amaitu beti esaldi batez eta unitateekin.',
            es: 'En muchos problemas se usa una parte y se pregunta por lo que queda. El total siempre es la fracción unidad ($\\frac{8}{8}$, $\\frac{5}{5}$…): para calcular la parte que queda, resta a la unidad lo que se ha usado. Después, aplica esa fracción a la cantidad. Termina siempre con una frase y con unidades.',
            ar: 'في كثير من المسائل يُستعمل جزء ويُسأل عمّا تبقّى. الكل دائمًا هو الكسر الواحد ($\\frac{8}{8}$، $\\frac{5}{5}$…): لحساب الجزء المتبقي اطرح من الواحد ما استُعمل، ثم طبّق هذا الكسر على الكمية. واختم دائمًا بجملة مع الوحدات.'
        },
        problem: { eu: 'Anek 30 €-ko pagaren $\\frac{2}{5}$ gastatu ditu. Zenbat euro geratzen zaizkio?', es: 'Ana ha gastado $\\frac{2}{5}$ de su paga de 30 €. ¿Cuántos euros le quedan?', ar: 'أنفقت آنه $\\frac{2}{5}$ مصروفها البالغ 30 €. كم يورو بقي لها؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Geratzen den zatia: unitatea ken gastatutakoa.', es: 'Parte que queda: la unidad menos lo gastado.', ar: 'الجزء المتبقي: الواحد ناقص ما أُنفق.' }, math: '$1-\\frac{2}{5}=\\frac{5}{5}-\\frac{2}{5}=\\frac{3}{5}$' },
            { text: { eu: 'Aplikatu zatiki hori kopuruari.', es: 'Aplica esa fracción a la cantidad.', ar: 'طبّق هذا الكسر على الكمية.' }, math: '$30\\mathbin{:}5\\cdot 3=18$' },
            { text: { eu: 'Erantzun: 18 € geratzen zaizkio (eta 12 € gastatu ditu).', es: 'Respuesta: le quedan 18 € (y ha gastado 12 €).', ar: 'الجواب: بقي لها 18 € (وأنفقت 12 €).' } }
        ],
        example: '$1-\\frac{3}{8}=\\frac{5}{8}$',
        takeaway: {
            eu: 'Osoa = 1. Geratzen dena = 1 ken erabilitakoa.',
            es: 'El total = 1. Lo que queda = 1 menos lo usado.',
            ar: 'الكل = 1. المتبقي = 1 ناقص المستعمل.'
        }
    }
]

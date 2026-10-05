import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { ChooseMethodFigure, InverseRuleFigure, RuleOfThreeFigure } from '../dbh1-proportzionaltasuna-v2/figures'
import { ChainedFigure, CompoundMixedFigure, IndexFigure, InterestFigure, InverseShareFigure, PercentTotalFigure, ShareDaysFigure } from '../dbh2-proportzionaltasuna-v2/figures'
import { CompoundInterestFigure, MixtureFigure, MotionFigure, PeriodsFigure, TapsFigure } from './figures'

/* ==========================================================================
   Proportzionaltasuna · 4. DBH aplikatuak — stages and lessons. Follows the
   class textbook (Santillana Aplicadas 4, unit 2 «Proporcionalidad
   numérica»: proportions, direct and inverse magnitudes, percentages,
   increases and decreases, simple and compound interest with
   capitalisation periods) and Anaya Aplicadas 4, unit 4 «Problemas
   aritméticos» (compound proportionality, shares, the index of variation,
   deposits, mixtures, moving vehicles and taps). The first three stages
   review 1. and 2. DBH with fourth-year numbers; compound interest and the
   arithmetic problems are new.
   ========================================================================== */

export type ProportionDbh4ApStageId = 'simple' | 'compound' | 'percent' | 'interest' | 'problems'

export const proportionDbh4ApStages: UnitStage[] = [
    { id: 'simple', tone: 'blue', title: { eu: 'Proportzionaltasun soila', es: 'Proporcionalidad simple', ar: 'التناسب البسيط' } },
    { id: 'compound', tone: 'violet', title: { eu: 'Konposatua eta banaketak', es: 'Compuesta y repartos', ar: 'المركّب والتوزيعات' } },
    { id: 'percent', tone: 'coral', title: { eu: 'Ehunekoak', es: 'Porcentajes', ar: 'النسب المئوية' } },
    { id: 'interest', tone: 'green', title: { eu: 'Interes bakuna eta konposatua', es: 'Interés simple y compuesto', ar: 'الفائدة البسيطة والمركّبة' } },
    { id: 'problems', tone: 'mustard', title: { eu: 'Beste problema aritmetiko batzuk', es: 'Otros problemas aritméticos', ar: 'مسائل حسابية أخرى' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const proportionDbh4ApTopics: UnitTopic[] = [
    /* ---------- 1. Simple proportionality ---------- */
    {
        id: 'relations',
        stage: 'simple',
        title: say('Zuzena, alderantzizkoa ala bat ere ez', 'Directa, inversa o ninguna', 'طردي أم عكسي أم لا شيء'),
        goal: say('Bi magnitude zuzenki, alderantziz ala ez proportzionalak diren erabakitzea, balioen taula batekin egiaztatuz.', 'Decidir si dos magnitudes son directa o inversamente proporcionales, o ninguna de las dos, comprobándolo con una tabla de valores.', 'تحديد ما إذا كان مقداران متناسبين طرديًا أو عكسيًا أو غير متناسبين، والتحقق بجدول قيم.'),
        explanation: say(
            'Bi magnitude zuzenki proportzionalak dira bata zenbaki batez biderkatzean bestea ere zenbaki berarekin biderkatzen bada; orduan zatidura konstantea da, $\\frac{b}{a}=k$. Alderantziz proportzionalak dira bata biderkatzean bestea zenbaki berarekin zatitzen bada; orduan biderkadura konstantea da, $a\\cdot b=k$. Ez da nahikoa «bat handitzean bestea handitzen da» esatea: auto batek 90 km/h-ra 7 l kontsumitzen ditu 100 km-ko eta 120 km/h-ra 12 l; $\\frac{120}{90}\\cdot 7\\approx 9{,}3\\neq 12$, beraz abiadura eta kontsumoa ez dira proportzionalak. Barra bat 0,90 € bada eta bost barrak 4,10 €, ezta ere.',
            'Dos magnitudes son directamente proporcionales si al multiplicar una por un número la otra queda multiplicada por el mismo número; entonces el cociente es constante, $\\frac{b}{a}=k$. Son inversamente proporcionales si al multiplicar una la otra queda dividida por el mismo número; entonces el producto es constante, $a\\cdot b=k$. No basta con «al crecer una crece la otra»: un coche gasta 7 l cada 100 km a 90 km/h y 12 l a 120 km/h; $\\frac{120}{90}\\cdot 7\\approx 9{,}3\\neq 12$, así que la velocidad y el consumo no son proporcionales. Si una barra de pan vale 0,90 € y cinco barras 4,10 €, tampoco.',
            'يكون المقداران متناسبين طرديًا إذا ضُرب أحدهما في عدد فضُرب الآخر في العدد نفسه؛ عندئذ يكون حاصل القسمة ثابتًا $\\frac{b}{a}=k$. ويكونان متناسبين عكسيًا إذا ضُرب أحدهما فقُسم الآخر على العدد نفسه؛ عندئذ يكون حاصل الضرب ثابتًا $a\\cdot b=k$. ولا يكفي أن «يزيد أحدهما حين يزيد الآخر»: تستهلك سيارة 7 ل لكل 100 كم بسرعة 90 كم/س و12 ل بسرعة 120 كم/س؛ $\\frac{120}{90}\\cdot 7\\approx 9{,}3\\neq 12$، فالسرعة والاستهلاك غير متناسبين. وإذا كان ثمن رغيف 0.90 € وثمن خمسة أرغفة 4.10 € فليسا متناسبين أيضًا.'
        ),
        problem: say('Ur-txorrota batek 3,5 l botatzen ditu orduko. Litroak eta orduak proportzionalak dira? Nolakoak?', 'Un grifo echa 3,5 l cada hora. ¿Son proporcionales los litros y las horas? ¿De qué tipo?', 'يصبّ صنبور 3.5 ل كل ساعة. هل اللترات والساعات متناسبة؟ من أي نوع؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Taula: 1 h, 2 h, 3 h.', 'Tabla: 1 h, 2 h, 3 h.', 'جدول: 1 س، 2 س، 3 س.'), math: same('$3{,}5\\quad 7\\quad 10{,}5$') },
            { text: say('Zatidura beti bera.', 'El cociente siempre es el mismo.', 'حاصل القسمة ثابت دائمًا.'), math: same('$\\frac{10{,}5}{3}=\\frac{7}{2}=3{,}5$') },
            { text: say('Zuzenki proportzionalak dira.', 'Son directamente proporcionales.', 'متناسبان طرديًا.') }
        ],
        example: same('$\\frac{120}{90}\\cdot 7\\approx 9{,}3\\neq 12$'),
        takeaway: say('Zuzena: zatidura konstantea. Alderantzizkoa: biderkadura konstantea.', 'Directa: cociente constante. Inversa: producto constante.', 'الطردي: حاصل قسمة ثابت. العكسي: حاصل ضرب ثابت.'),
        figure: (language) => <ChooseMethodFigure language={language} />
    },
    {
        id: 'direct-rule',
        stage: 'simple',
        title: say('Hiruko erregela zuzena', 'Regla de tres directa', 'قاعدة الثلاثة الطردية'),
        goal: say('Proportzionaltasun zuzeneko problemak hiruko erregelaz edo unitatera laburtuz ebaztea, hamartarrekin.', 'Resolver problemas de proporcionalidad directa con regla de tres o reduciendo a la unidad, también con decimales.', 'حلّ مسائل التناسب الطردي بقاعدة الثلاثة أو بالإرجاع إلى الوحدة، مع الأعداد العشرية أيضًا.'),
        explanation: say(
            'Hiruko erregela zuzenean bi lerro idazten dira, magnitude bakoitza bere zutabean, eta proportzioa planteatzen da: $\\frac{a}{b}=\\frac{c}{x}$, beraz $x=\\frac{b\\cdot c}{a}$. Olio-botila batek, $0{,}75$ l, $3{,}60$ € balio du: litroak $\\frac{3{,}60\\cdot 1}{0{,}75}=4{,}80$ € balio du. Unitatera laburtzea gauza bera da bi urratsetan: lehenik 1en balioa, gero eskatutakoa. 5,5 m kable $4{,}51$ € badira, metro bat $4{,}51\\mathbin{:}5{,}5=0{,}82$ € da eta $8{,}35$ m, $0{,}82\\cdot 8{,}35\\approx 6{,}85$ €. Kontuz unitateekin: biak unitate berean (8 m 35 cm = 8,35 m).',
            'En la regla de tres directa se escriben dos filas, cada magnitud en su columna, y se plantea la proporción: $\\frac{a}{b}=\\frac{c}{x}$, así que $x=\\frac{b\\cdot c}{a}$. Una botella de aceite de $0{,}75$ l cuesta $3{,}60$ €: el litro sale a $\\frac{3{,}60\\cdot 1}{0{,}75}=4{,}80$ €. Reducir a la unidad es lo mismo en dos pasos: primero el valor de 1, luego lo que se pide. Si 5,5 m de cable cuestan $4{,}51$ €, un metro cuesta $4{,}51\\mathbin{:}5{,}5=0{,}82$ € y $8{,}35$ m, $0{,}82\\cdot 8{,}35\\approx 6{,}85$ €. Cuidado con las unidades: las dos en la misma (8 m 35 cm = 8,35 m).',
            'في قاعدة الثلاثة الطردية نكتب سطرين، كل مقدار في عموده، ونكتب التناسب: $\\frac{a}{b}=\\frac{c}{x}$، إذن $x=\\frac{b\\cdot c}{a}$. ثمن زجاجة زيت سعتها $0{,}75$ ل هو $3{,}60$ €: ثمن اللتر $\\frac{3{,}60\\cdot 1}{0{,}75}=4{,}80$ €. والإرجاع إلى الوحدة هو الشيء نفسه بخطوتين: قيمة الواحد أولًا ثم المطلوب. إذا كان ثمن 5.5 م من السلك $4{,}51$ € فثمن المتر $4{,}51\\mathbin{:}5{,}5=0{,}82$ € وثمن $8{,}35$ م هو $0{,}82\\cdot 8{,}35\\approx 6{,}85$ €. انتبه إلى الوحدات: كلاهما بالوحدة نفسها (8 م 35 سم = 8.35 م).'
        ),
        problem: say('Jogurt baten 100 g-k 54 kcal dituzte. Zenbat kcal ditu 125 g-ko jogurt batek?', '100 g de yogur tienen 54 kcal. ¿Cuántas kcal tiene un yogur de 125 g?', 'في 100 غ من اللبن 54 سعرة حرارية. كم سعرة في لبن وزنه 125 غ؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioa.', 'La proporción.', 'التناسب.'), math: same('$\\frac{100}{125}=\\frac{54}{x}$') },
            { text: say('Gurutzean biderkatu.', 'Multiplica en cruz.', 'اضرب تبادليًا.'), math: same('$100\\cdot x=54\\cdot 125=6750$') },
            { text: say('Zatitu: 67,5 kcal.', 'Divide: 67,5 kcal.', 'اقسم: 67.5 سعرة.'), math: same('$x=6750\\mathbin{:}100=67{,}5$') }
        ],
        example: same('$\\frac{3{,}60\\cdot 1}{0{,}75}=4{,}8$'),
        takeaway: say('Zuzena: $X=\\frac{B\\cdot C}{A}$; edo lehenik 1en balioa.', 'Directa: $X=\\frac{B\\cdot C}{A}$; o primero el valor de 1.', 'الطردي: $X=\\frac{B\\cdot C}{A}$؛ أو قيمة الواحد أولًا.'),
        figure: (language) => <RuleOfThreeFigure language={language} />
    },
    {
        id: 'inverse-rule',
        stage: 'simple',
        title: say('Hiruko erregela alderantzizkoa', 'Regla de tres inversa', 'قاعدة الثلاثة العكسية'),
        goal: say('Alderantzizko proportzionaltasuneko problemak biderkadura konstantea erabiliz ebaztea.', 'Resolver problemas de proporcionalidad inversa usando el producto constante.', 'حلّ مسائل التناسب العكسي باستعمال حاصل الضرب الثابت.'),
        explanation: say(
            'Alderantzizko hiruko erregelan lerro bakoitzeko biderkadura berdina da: $a\\cdot b=c\\cdot x$, beraz $x=\\frac{a\\cdot b}{c}$. Abeltzain batek 35 behirentzako bazka du 60 egunerako; 15 behi saltzen baditu, 20 behi geratzen dira eta bazkak $\\frac{35\\cdot 60}{20}=105$ egun iraungo du. Biderkadura (35 · 60 = 2100 «behi-egun») bazka osoa da, eta ez da aldatzen. Adibide gehiago: abiadura eta denbora ibilbide berean, langileak eta egunak lan berean, eguneko gastua eta aurrezkiek irauten duten egunak.',
            'En la regla de tres inversa el producto de cada fila es el mismo: $a\\cdot b=c\\cdot x$, así que $x=\\frac{a\\cdot b}{c}$. Un ganadero tiene pasto para 35 vacas durante 60 días; si vende 15 vacas, le quedan 20 y el pasto le dura $\\frac{35\\cdot 60}{20}=105$ días. El producto (35 · 60 = 2100 «vacas-día») es todo el pasto, y no cambia. Más ejemplos: la velocidad y el tiempo en un mismo trayecto, los obreros y los días en una misma obra, el gasto diario y los días que duran los ahorros.',
            'في قاعدة الثلاثة العكسية يتساوى حاصل ضرب كل سطر: $a\\cdot b=c\\cdot x$، إذن $x=\\frac{a\\cdot b}{c}$. لدى مربٍّ علف يكفي 35 بقرة مدة 60 يومًا؛ إذا باع 15 بقرة بقي له 20 ويكفيه العلف $\\frac{35\\cdot 60}{20}=105$ أيام. وحاصل الضرب (35 · 60 = 2100 «بقرة-يوم») هو العلف كله ولا يتغير. أمثلة أخرى: السرعة والزمن في المسار نفسه، والعمال والأيام في العمل نفسه، والإنفاق اليومي وعدد الأيام التي تكفيها المدخرات.'
        ),
        problem: say('Egunean 3,60 € gastatuz, aurrezkiek 15 egun irauten dute. Zenbat egun egunean 4,50 € gastatuz?', 'Gastando 3,60 € al día, los ahorros duran 15 días. ¿Cuántos días duran gastando 4,50 € al día?', 'بإنفاق 3.60 € يوميًا تكفي المدخرات 15 يومًا. كم يومًا تكفي بإنفاق 4.50 € يوميًا؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gastu gehiago → egun gutxiago: alderantzizkoa.', 'Más gasto → menos días: inversa.', 'إنفاق أكثر ← أيام أقل: عكسي.') },
            { text: say('Aurrezki guztiak.', 'Los ahorros totales.', 'المدخرات كلها.'), math: same('$3{,}60\\cdot 15=54$') },
            { text: say('Zatitu: 12 egun.', 'Divide: 12 días.', 'اقسم: 12 يومًا.'), math: same('$54\\mathbin{:}4{,}50=12$') }
        ],
        example: same('$\\frac{35\\cdot 60}{20}=105$'),
        takeaway: say('Alderantzizkoa: $X=\\frac{A\\cdot B}{C}$, biderkadura ez da aldatzen.', 'Inversa: $X=\\frac{A\\cdot B}{C}$, el producto no cambia.', 'العكسي: $X=\\frac{A\\cdot B}{C}$، وحاصل الضرب لا يتغير.'),
        figure: (language) => <InverseRuleFigure language={language} />
    },

    /* ---------- 2. Compound proportionality and shares ---------- */
    {
        id: 'compound',
        stage: 'compound',
        title: say('Proportzionaltasun konposatua', 'Proporcionalidad compuesta', 'التناسب المركّب'),
        goal: say('Hiru magnitude edo gehiago dituzten problemak ebaztea, erlazio bakoitza zuzena ala alderantzizkoa den erabakiz.', 'Resolver problemas con tres o más magnitudes, decidiendo si cada relación es directa o inversa.', 'حلّ مسائل فيها ثلاثة مقادير أو أكثر، مع تحديد نوع كل علاقة طرديةً كانت أم عكسية.'),
        explanation: say(
            'Ezezaguna duen magnitudea beste bakoitzarekin konparatzen da, banan-banan, gainerakoak aldatzen ez direla pentsatuz. Zuzena bada, zatidura berria/zaharra jartzen da; alderantzizkoa bada, zaharra/berria. Hiru margolarik, egunean 8 ordu, horma bat 10 egunetan margotzen dute. Bost margolari egunean 6 ordu? Margolari gehiago → egun gutxiago (alderantzizkoa, $\\frac{3}{5}$); ordu gutxiago → egun gehiago (alderantzizkoa, $\\frac{8}{6}$). Beraz $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$ egun. Bizikletak alokatzea: 2 bizikleta 3 orduz 11,10 €; 3 bizikleta 5 orduz, biak zuzenak: $11{,}10\\cdot\\frac{3}{2}\\cdot\\frac{5}{3}=27{,}75$ €.',
            'La magnitud de la incógnita se compara con cada una de las otras, de una en una, imaginando que las demás no cambian. Si es directa se pone el cociente nuevo/viejo; si es inversa, viejo/nuevo. Tres pintores, trabajando 8 horas al día, pintan un muro en 10 días. ¿Y cinco pintores, 6 horas al día? Más pintores → menos días (inversa, $\\frac{3}{5}$); menos horas → más días (inversa, $\\frac{8}{6}$). Así que $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$ días. Alquiler de bicis: 2 bicis 3 horas, 11,10 €; 3 bicis 5 horas, las dos directas: $11{,}10\\cdot\\frac{3}{2}\\cdot\\frac{5}{3}=27{,}75$ €.',
            'نقارن مقدار المجهول بكل مقدار آخر على حدة، ونتخيل أن الباقي لا يتغير. إذا كان طرديًا نضع الكسر الجديد/القديم، وإذا كان عكسيًا القديم/الجديد. ثلاثة دهّانين يعملون 8 ساعات يوميًا يدهنون جدارًا في 10 أيام. فماذا عن خمسة دهّانين 6 ساعات يوميًا؟ دهّانون أكثر ← أيام أقل (عكسي، $\\frac{3}{5}$)؛ ساعات أقل ← أيام أكثر (عكسي، $\\frac{8}{6}$). إذن $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$ أيام. استئجار الدراجات: دراجتان 3 ساعات بـ11.10 €؛ و3 دراجات 5 ساعات، كلاهما طردي: $11{,}10\\cdot\\frac{3}{2}\\cdot\\frac{5}{3}=27{,}75$ €.'
        ),
        problem: say('5 lokaleko zinema-kate batek 15 000 sarrera saltzen ditu 3 astetan. Zenbat sarrera salduko lituzke astean 7 lokalekin?', 'Una cadena de cines con 5 locales vende 15 000 entradas en 3 semanas. ¿Cuántas entradas vendería a la semana con 7 locales?', 'سلسلة سينما لها 5 صالات تبيع 15000 تذكرة في 3 أسابيع. كم تذكرة تبيع في الأسبوع بـ7 صالات؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lokal gehiago → sarrera gehiago: zuzena.', 'Más locales → más entradas: directa.', 'صالات أكثر ← تذاكر أكثر: طردي.'), math: same('$\\frac{7}{5}$') },
            { text: say('Aste gutxiago → sarrera gutxiago: zuzena.', 'Menos semanas → menos entradas: directa.', 'أسابيع أقل ← تذاكر أقل: طردي.'), math: same('$\\frac{1}{3}$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.'), math: same('$15\\,000\\cdot\\frac{7}{5}\\cdot\\frac{1}{3}=7000$') }
        ],
        example: same('$10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$'),
        takeaway: say('Zuzena: berria/zaharra. Alderantzizkoa: zaharra/berria.', 'Directa: nuevo/viejo. Inversa: viejo/nuevo.', 'الطردي: الجديد/القديم. العكسي: القديم/الجديد.'),
        figure: (language) => <CompoundMixedFigure language={language} />
    },
    {
        id: 'direct-share',
        stage: 'compound',
        title: say('Banaketa zuzenki proportzionala', 'Reparto directamente proporcional', 'التوزيع الطردي'),
        goal: say('Kantitate bat zenbaki batzuekiko zuzenki proportzionalak diren zatitan banatzea.', 'Repartir una cantidad en partes directamente proporcionales a unos números.', 'توزيع كمية إلى أجزاء متناسبة طرديًا مع أعداد معطاة.'),
        explanation: say(
            'Zenbakiak batu, kantitatea batura horren artean zatitu (zati baten balioa) eta zenbaki bakoitza balio horrekin biderkatu. Hiru lagunek pisua partekatzen dute eta 62,40 €-ko argi-faktura jaso dute: Amelia 60 egun daramatza, Laura 40 eta Cristina 20. Guztira $60+40+20=120$ egun; egun bakoitzak $62{,}40\\mathbin{:}120=0{,}52$ €. Amelia: $60\\cdot 0{,}52=31{,}20$ €; Laura: $20{,}80$ €; Cristina: $10{,}40$ €. Egiaztatu: zatien batura kantitate osoa da.',
            'Suma los números, divide la cantidad entre esa suma (el valor de una parte) y multiplica cada número por ese valor. Tres amigas que comparten piso reciben una factura de la luz de 62,40 €: Amelia lleva 60 días en el piso, Laura 40 y Cristina 20. En total $60+40+20=120$ días; cada día vale $62{,}40\\mathbin{:}120=0{,}52$ €. Amelia: $60\\cdot 0{,}52=31{,}20$ €; Laura: $20{,}80$ €; Cristina: $10{,}40$ €. Comprueba: las partes suman la cantidad total.',
            'اجمع الأعداد، واقسم الكمية على مجموعها (قيمة الجزء الواحد)، ثم اضرب كل عدد في تلك القيمة. ثلاث صديقات يتقاسمن شقة وصلتهن فاتورة كهرباء بـ62.40 €: أميليا في الشقة منذ 60 يومًا ولاورا 40 وكريستينا 20. المجموع $60+40+20=120$ يومًا؛ قيمة اليوم $62{,}40\\mathbin{:}120=0{,}52$ €. أميليا: $60\\cdot 0{,}52=31{,}20$ €؛ لاورا: $20{,}80$ €؛ كريستينا: $10{,}40$ €. تحقّق: مجموع الأجزاء يساوي الكمية كلها.'
        ),
        problem: say('Bi ahizpek 5 eskuoihal-joko erosi dituzte 175 €-an. Batek 3 joko hartzen ditu eta besteak 2. Zenbat ordaintzen du bakoitzak?', 'Dos hermanas compran cinco juegos de toallas por 175 €. Una se queda con 3 juegos y la otra con 2. ¿Cuánto paga cada una?', 'اشترت أختان خمس مجموعات مناشف بـ175 €. أخذت إحداهما 3 مجموعات والأخرى 2. كم تدفع كل واحدة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Joko baten prezioa.', 'Precio de un juego.', 'ثمن المجموعة الواحدة.'), math: same('$175\\mathbin{:}5=35$') },
            { text: say('Bakoitzak.', 'Cada una.', 'كل واحدة.'), math: same('$3\\cdot 35=105\\qquad 2\\cdot 35=70$') }
        ],
        example: same('$62{,}40\\mathbin{:}120=0{,}52$'),
        takeaway: say('Zuzena: kantitatea : batura, gero bider zenbaki bakoitza.', 'Directo: cantidad : suma, y luego por cada número.', 'الطردي: الكمية : المجموع ثم في كل عدد.'),
        figure: (language) => <ShareDaysFigure language={language} />
    },
    {
        id: 'inverse-share',
        stage: 'compound',
        title: say('Banaketa alderantziz proportzionala', 'Reparto inversamente proporcional', 'التوزيع العكسي'),
        goal: say('Kantitate bat zenbaki batzuekiko alderantziz proportzionalak diren zatitan banatzea.', 'Repartir una cantidad en partes inversamente proporcionales a unos números.', 'توزيع كمية إلى أجزاء متناسبة عكسيًا مع أعداد معطاة.'),
        explanation: say(
            'Zenbakiekiko alderantziz banatzea haien alderantzizkoekiko zuzenki banatzea da: zenbaki handiari zati txikia. 660 banatu 1, 2 eta 3rekiko alderantziz = $1$, $\\frac{1}{2}$ eta $\\frac{1}{3}$-rekiko zuzenki. Alderantzizkoen batura $1+\\frac{1}{2}+\\frac{1}{3}=\\frac{11}{6}$; $660\\mathbin{:}\\frac{11}{6}=360$; zatiak $360$, $180$ eta $120$. Edo izendatzaile berarekin: $\\frac{6}{6},\\frac{3}{6},\\frac{2}{6}$, 6, 3 eta 2rekiko zuzenki: $660\\mathbin{:}11=60$. Gidari batek hiru bidaia egin ditu 50, 100 eta 80 km/h-ra, ibilbide berean, 4 h 15 min guztira: denbora abiadurarekiko alderantzizkoa da.',
            'Repartir inversamente a unos números es repartir directamente a sus inversos: al número mayor, la parte menor. Repartir 660 inversamente a 1, 2 y 3 = directamente a $1$, $\\frac{1}{2}$ y $\\frac{1}{3}$. Suma de los inversos $1+\\frac{1}{2}+\\frac{1}{3}=\\frac{11}{6}$; $660\\mathbin{:}\\frac{11}{6}=360$; las partes son $360$, $180$ y $120$. O con el mismo denominador: $\\frac{6}{6},\\frac{3}{6},\\frac{2}{6}$, directamente a 6, 3 y 2: $660\\mathbin{:}11=60$. Un conductor hace tres viajes del mismo trayecto a 50, 100 y 80 km/h, 4 h 15 min en total: el tiempo es inverso a la velocidad.',
            'التوزيع عكسيًا على أعداد هو التوزيع طرديًا على مقلوباتها: العدد الأكبر يأخذ الجزء الأصغر. توزيع 660 عكسيًا على 1 و2 و3 = طرديًا على $1$ و$\\frac{1}{2}$ و$\\frac{1}{3}$. مجموع المقلوبات $1+\\frac{1}{2}+\\frac{1}{3}=\\frac{11}{6}$؛ $660\\mathbin{:}\\frac{11}{6}=360$؛ الأجزاء $360$ و$180$ و$120$. أو بالمقام نفسه: $\\frac{6}{6},\\frac{3}{6},\\frac{2}{6}$، طرديًا على 6 و3 و2: $660\\mathbin{:}11=60$. يقطع سائق المسار نفسه ثلاث مرات بسرعة 50 و100 و80 كم/س في 4 س 15 د إجمالًا: الزمن يتناسب عكسيًا مع السرعة.'
        ),
        problem: say('Banatu 660 alderantziz proportzionalki 1, 2 eta 3rekiko.', 'Reparte 660 en partes inversamente proporcionales a 1, 2 y 3.', 'وزّع 660 عكسيًا على 1 و2 و3.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alderantzizkoak, izendatzaile berarekin.', 'Los inversos, con el mismo denominador.', 'المقلوبات بالمقام نفسه.'), math: same('$\\frac{6}{6},\\ \\frac{3}{6},\\ \\frac{2}{6}$') },
            { text: say('6, 3 eta 2rekiko: 11 zati.', 'Proporcional a 6, 3 y 2: 11 partes.', 'متناسب مع 6 و3 و2: 11 جزءًا.'), math: same('$660\\mathbin{:}11=60$') },
            { text: say('Zatiak.', 'Las partes.', 'الأجزاء.'), math: same('$360,\\ 180,\\ 120$') }
        ],
        example: same('$1+\\frac{1}{2}+\\frac{1}{3}=\\frac{11}{6}$'),
        takeaway: say('Alderantzizkoa: banatu alderantzizkoekiko zuzenki.', 'Inverso: reparte directamente a los inversos.', 'العكسي: وزّع طرديًا على المقلوبات.'),
        figure: (language) => <InverseShareFigure language={language} />
    },

    /* ---------- 3. Percentages ---------- */
    {
        id: 'percent-calc',
        stage: 'percent',
        title: say('Zatia, osoa eta ehunekoa', 'La parte, el total y el porcentaje', 'الجزء والكل والنسبة'),
        goal: say('Hiru kalkuluak ebaztea: kantitate baten ehunekoa, zatitik osoa eta zati batek zer ehuneko den.', 'Resolver los tres cálculos: el porcentaje de una cantidad, el total a partir de la parte y qué porcentaje es una parte.', 'حلّ الحسابات الثلاثة: نسبة من كمية، والكل انطلاقًا من الجزء، ونسبة جزء من الكل.'),
        explanation: say(
            'Ehunekoa hamartar gisa idazten da: % 32 = $0{,}32$, % 2,5 = $0{,}025$, % 150 = $1{,}5$. Hiru kasu daude, beti zatia = osoa · hamartarra erlaziotik: a) zatia: 500en % 32 = $500\\cdot 0{,}32=160$. b) osoa: futbol-zelaian 24 000 zale daude, edukieraren % 80: $T\\cdot 0{,}8=24\\,000$, $T=24\\,000\\mathbin{:}0{,}8=30\\,000$. c) ehunekoa: Elenak 5000 €-tik 750 € gastatu ditu: $750\\mathbin{:}5000\\cdot 100=15$, % 15. Soldata gordinaren % 15 atxikitzen badute, soldata garbia % 85 da: 1400 €-tik $1400\\cdot 0{,}85=1190$ €.',
            'El porcentaje se escribe como decimal: 32 % = $0{,}32$, 2,5 % = $0{,}025$, 150 % = $1{,}5$. Hay tres casos, siempre a partir de parte = total · decimal: a) la parte: el 32 % de 500 = $500\\cdot 0{,}32=160$. b) el total: en el estadio hay 24 000 aficionados, el 80 % de su capacidad: $T\\cdot 0{,}8=24\\,000$, $T=24\\,000\\mathbin{:}0{,}8=30\\,000$. c) el porcentaje: Elena ha gastado 750 € de 5000 €: $750\\mathbin{:}5000\\cdot 100=15$, el 15 %. Si del salario bruto retienen el 15 %, el neto es el 85 %: de 1400 €, $1400\\cdot 0{,}85=1190$ €.',
            'تُكتب النسبة المئوية عددًا عشريًا: 32٪ = $0{,}32$، و2.5٪ = $0{,}025$، و150٪ = $1{,}5$. وهناك ثلاث حالات، كلها من العلاقة الجزء = الكل · العدد العشري: أ) الجزء: 32٪ من 500 = $500\\cdot 0{,}32=160$. ب) الكل: في الملعب 24000 مشجع، أي 80٪ من سعته: $T\\cdot 0{,}8=24\\,000$، $T=24\\,000\\mathbin{:}0{,}8=30\\,000$. ج) النسبة: أنفقت إيلينا 750 € من 5000 €: $750\\mathbin{:}5000\\cdot 100=15$، أي 15٪. وإذا اقتُطع 15٪ من الراتب الإجمالي فالصافي 85٪: من 1400 € يبقى $1400\\cdot 0{,}85=1190$ €.'
        ),
        problem: say('Bernardok bizikleta bat erosi du: gurasoek % 50 ordaindu dute, amonak % 30 eta berak gainerakoa, 108 €. Zenbat balio zuen bizikletak?', 'Bernardo ha comprado una bici: sus padres han pagado el 50 %, su abuela el 30 % y él el resto, 108 €. ¿Cuánto costaba la bici?', 'اشترى برناردو دراجة: دفع والداه 50٪ وجدته 30٪ ودفع هو الباقي 108 €. كم كان ثمن الدراجة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berak jarritakoa.', 'Lo que ha puesto él.', 'ما دفعه هو.'), math: same('$100-50-30=20$') },
            { text: say('% 20 = 108 €.', '20 % = 108 €.', '20٪ = 108 €.'), math: same('$T\\cdot 0{,}2=108$') },
            { text: say('Osoa.', 'El total.', 'الكل.'), math: same('$T=108\\mathbin{:}0{,}2=540$') }
        ],
        example: same('$24\\,000\\mathbin{:}0{,}8=30\\,000$'),
        takeaway: say('Zatia = osoa · hamartarra; osoa = zatia : hamartarra.', 'Parte = total · decimal; total = parte : decimal.', 'الجزء = الكل · العشري؛ الكل = الجزء : العشري.'),
        figure: (language) => <PercentTotalFigure language={language} />
    },
    {
        id: 'index',
        stage: 'percent',
        title: say('Aldakuntza-indizea: BEZa eta beherapenak', 'El índice de variación: IVA y rebajas', 'مؤشر التغيّر: الضريبة والتخفيضات'),
        goal: say('Igoerak eta beherapenak indizeaz biderkatuz kalkulatzea, hasierako kantitatea zatituz, eta aldakuntzaren ehunekoa.', 'Calcular aumentos y disminuciones multiplicando por el índice, la cantidad inicial dividiendo y el porcentaje de variación.', 'حساب الزيادات والتخفيضات بالضرب في المؤشر، والكمية الأصلية بالقسمة، ونسبة التغيّر.'),
        explanation: say(
            'Amaierakoa = hasierakoa · indizea. % $p$ igotzean indizea $1+\\frac{p}{100}$ da (BEZa % 21 → $1{,}21$); % $p$ jaistean, $1-\\frac{p}{100}$ (% 25eko beherapena → $0{,}75$). Iturgin baten faktura 143,99 € da, BEZa barne (% 21): BEZik gabe $143{,}99\\mathbin{:}1{,}21=119$ € zen. Indizea bi kantitateetatik ere atera daiteke: aseguruak 520 €-tik 442 €-ra jaisten du kuota, $442\\mathbin{:}520=0{,}85$, beraz % 15eko beherapena. 4600 ikusletik 5200era, $5200\\mathbin{:}4600\\approx 1{,}13$: % 13 inguru gehiago.',
            'Final = inicial · índice. Al aumentar un $p$ % el índice es $1+\\frac{p}{100}$ (IVA del 21 % → $1{,}21$); al disminuir un $p$ %, $1-\\frac{p}{100}$ (rebaja del 25 % → $0{,}75$). La factura de un fontanero es de 143,99 €, IVA incluido (21 %): sin IVA eran $143{,}99\\mathbin{:}1{,}21=119$ €. El índice también se saca de las dos cantidades: el seguro baja la cuota de 520 € a 442 €, $442\\mathbin{:}520=0{,}85$, así que es una rebaja del 15 %. De 4600 espectadores a 5200, $5200\\mathbin{:}4600\\approx 1{,}13$: alrededor de un 13 % más.',
            'النهائية = الأصلية · المؤشر. عند الزيادة بنسبة $p$٪ يكون المؤشر $1+\\frac{p}{100}$ (ضريبة 21٪ ← $1{,}21$)، وعند الإنقاص $p$٪ يكون $1-\\frac{p}{100}$ (تخفيض 25٪ ← $0{,}75$). فاتورة سبّاك 143.99 € شاملة الضريبة (21٪): بدون الضريبة كانت $143{,}99\\mathbin{:}1{,}21=119$ €. ويُستخرج المؤشر أيضًا من الكميتين: خفّض التأمين القسط من 520 € إلى 442 €، $442\\mathbin{:}520=0{,}85$، أي تخفيض 15٪. ومن 4600 مشاهد إلى 5200، $5200\\mathbin{:}4600\\approx 1{,}13$: زيادة نحو 13٪.'
        ),
        problem: say('% 25 merkatutako soineko batek 84 € balio du. Zenbat balio zuen merkealdiaren aurretik?', 'Un vestido rebajado un 25 % sale por 84 €. ¿Cuánto costaba antes de la rebaja?', 'فستان مخفّض 25٪ ثمنه 84 €. كم كان ثمنه قبل التخفيض؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizea: % 75.', 'Índice: el 75 %.', 'المؤشر: 75٪.'), math: same('$1-0{,}25=0{,}75$') },
            { text: say('Hasierakoa = amaierakoa : indizea.', 'Inicial = final : índice.', 'الأصلية = النهائية : المؤشر.'), math: same('$84\\mathbin{:}0{,}75=112$') }
        ],
        example: same('$143{,}99\\mathbin{:}1{,}21=119$'),
        takeaway: say('Amaierakoa = hasierakoa · indizea; atzera, zatitu.', 'Final = inicial · índice; hacia atrás, divide.', 'النهائية = الأصلية · المؤشر؛ وللرجوع اقسم.'),
        figure: (language) => <IndexFigure language={language} />
    },
    {
        id: 'chained',
        stage: 'percent',
        title: say('Ehuneko kateatuak', 'Porcentajes encadenados', 'النسب المتتالية'),
        goal: say('Jarraian egiten diren aldaketak indizeak biderkatuz kalkulatzea eta aldakuntza osoa interpretatzea.', 'Calcular cambios sucesivos multiplicando los índices e interpretar la variación total.', 'حساب تغيّرات متتالية بضرب المؤشرات وتفسير التغيّر الكلي.'),
        explanation: say(
            'Aldaketa bakoitza aurrekoaren ondoren geratzen den kantitateari aplikatzen zaio, beraz indize osoa indizeen biderkadura da: $I_T=I_1\\cdot I_2\\cdots$. Herri batek 25 000 biztanle zituen; % 18 eta gero % 25 hazi zen: $1{,}18\\cdot 1{,}25=1{,}475$, $25\\,000\\cdot 1{,}475=36\\,875$ biztanle. Fruta nekazaritik kontsumitzailera: % 25, % 60, bikoiztu eta % 50: $1{,}25\\cdot 1{,}6\\cdot 2\\cdot 1{,}5=6$, prezioa sei aldiz handiagoa (% 500 igo). Merkatari batek % 40 igo eta gero % 40 merkatzen du: $1{,}4\\cdot 0{,}6=0{,}84$, benetako beherapena % 16 da.',
            'Cada cambio se aplica a la cantidad que queda tras el anterior, así que el índice total es el producto de los índices: $I_T=I_1\\cdot I_2\\cdots$. Un pueblo tenía 25 000 habitantes; creció un 18 % y luego un 25 %: $1{,}18\\cdot 1{,}25=1{,}475$, $25\\,000\\cdot 1{,}475=36\\,875$ habitantes. La fruta del agricultor al consumidor: 25 %, 60 %, se dobla y 50 %: $1{,}25\\cdot 1{,}6\\cdot 2\\cdot 1{,}5=6$, el precio es seis veces mayor (sube un 500 %). Un comerciante sube un 40 % y luego rebaja un 40 %: $1{,}4\\cdot 0{,}6=0{,}84$, el descuento real es del 16 %.',
            'يُطبَّق كل تغيّر على الكمية الناتجة عن السابق، فيكون المؤشر الكلي حاصل ضرب المؤشرات: $I_T=I_1\\cdot I_2\\cdots$. كان في قرية 25000 نسمة؛ زاد 18٪ ثم 25٪: $1{,}18\\cdot 1{,}25=1{,}475$، $25\\,000\\cdot 1{,}475=36\\,875$ نسمة. الفاكهة من المزارع إلى المستهلك: 25٪ و60٪ ثم تتضاعف ثم 50٪: $1{,}25\\cdot 1{,}6\\cdot 2\\cdot 1{,}5=6$، فالسعر ستة أضعاف (زيادة 500٪). يرفع تاجر السعر 40٪ ثم يخفّضه 40٪: $1{,}4\\cdot 0{,}6=0{,}84$، فالتخفيض الحقيقي 16٪.'
        ),
        problem: say('Auto batek 15 000 € balio du. Matrikulatzean % 18 galtzen du, eta gero % 10 urtero. Zenbat balio du hirugarren urtearen amaieran?', 'Un coche vale 15 000 €. Al matricularlo pierde un 18 % y luego un 10 % cada año. ¿Cuánto vale al final del tercer año?', 'ثمن سيارة 15000 €. تخسر 18٪ عند تسجيلها ثم 10٪ كل سنة. كم ثمنها في نهاية السنة الثالثة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizeak.', 'Los índices.', 'المؤشرات.'), math: same('$0{,}82\\cdot 0{,}9^{3}=0{,}59778$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.'), math: same('$15\\,000\\cdot 0{,}59778=8966{,}7$') }
        ],
        example: same('$1{,}4\\cdot 0{,}6=0{,}84$'),
        takeaway: say('Kateatuak: indizeak biderkatu, ez ehunekoak batu.', 'Encadenados: multiplica los índices, no sumes los porcentajes.', 'المتتالية: اضرب المؤشرات ولا تجمع النسب.'),
        figure: (language) => <ChainedFigure language={language} />
    },

    /* ---------- 4. Simple and compound interest ---------- */
    {
        id: 'simple-interest',
        stage: 'interest',
        title: say('Interes bakuna', 'El interés simple', 'الفائدة البسيطة'),
        goal: say('Interes bakuna kalkulatzea urtetan, hilabetetan edo egunetan, eta kapitala, tasa edo denbora aurkitzea.', 'Calcular el interés simple en años, meses o días, y hallar el capital, el tipo o el tiempo.', 'حساب الفائدة البسيطة بالسنوات أو الأشهر أو الأيام، وإيجاد رأس المال أو السعر أو المدة.'),
        explanation: say(
            'Interes bakunean urte bakoitzeko interesa beti bera da, hasierako kapitalaren % $r$: $I=\\frac{C\\cdot r\\cdot t}{100}$, $t$ urtetan. Denbora hilabetetan badago, 1200ez zatitzen da ($\\frac{C\\cdot r\\cdot t}{1200}$), eta egunetan, 36 000z. 1000 € % 4an 4 hilabetez: $\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$ €. Formulatik beste edozein datu ateratzen da: zer kapitalek sortzen ditu 448,80 € % 3,2an 9 hilabetetan? $C=\\frac{448{,}80\\cdot 1200}{3{,}2\\cdot 9}=18\\,700$ €. Amaierako kapitala $C+I$ da.',
            'En el interés simple el interés de cada año es siempre el mismo, el $r$ % del capital inicial: $I=\\frac{C\\cdot r\\cdot t}{100}$, con $t$ en años. Si el tiempo está en meses se divide entre 1200 ($\\frac{C\\cdot r\\cdot t}{1200}$), y en días, entre 36 000. 1000 € al 4 % durante 4 meses: $\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$ €. De la fórmula se despeja cualquier otro dato: ¿qué capital produce 448,80 € al 3,2 % en 9 meses? $C=\\frac{448{,}80\\cdot 1200}{3{,}2\\cdot 9}=18\\,700$ €. El capital final es $C+I$.',
            'في الفائدة البسيطة تكون فائدة كل سنة هي نفسها، $r$٪ من رأس المال الأصلي: $I=\\frac{C\\cdot r\\cdot t}{100}$، و$t$ بالسنوات. وإذا كانت المدة بالأشهر نقسم على 1200 ($\\frac{C\\cdot r\\cdot t}{1200}$)، وبالأيام على 36000. 1000 € بفائدة 4٪ مدة 4 أشهر: $\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$ €. ومن الصيغة نستخرج أي معطى آخر: أي رأس مال يُنتج 448.80 € بفائدة 3.2٪ في 9 أشهر؟ $C=\\frac{448{,}80\\cdot 1200}{3{,}2\\cdot 9}=18\\,700$ €. ورأس المال النهائي $C+I$.'
        ),
        problem: say('Zer interes sortzen dituzte 6000 €-k % 3an 8 hilabetez?', '¿Qué interés producen 6000 € al 3 % durante 8 meses?', 'ما الفائدة التي تُنتجها 6000 € بنسبة 3٪ مدة 8 أشهر؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Denbora hilabetetan: 1200ez zatitu.', 'Tiempo en meses: divide entre 1200.', 'المدة بالأشهر: اقسم على 1200.'), math: same('$I=\\frac{6000\\cdot 3\\cdot 8}{1200}$') },
            { text: say('120 €.', '120 €.', '120 €.'), math: same('$\\frac{144\\,000}{1200}=120$') }
        ],
        example: same('$\\frac{448{,}80\\cdot 1200}{3{,}2\\cdot 9}=18\\,700$'),
        takeaway: say('Urteak: 100ez zatitu. Hilabeteak: 1200ez. Egunak: 36 000z.', 'Años: entre 100. Meses: entre 1200. Días: entre 36 000.', 'السنوات: على 100. الأشهر: على 1200. الأيام: على 36000.'),
        figure: (language) => <InterestFigure language={language} />
    },
    {
        id: 'compound-interest',
        stage: 'interest',
        title: say('Interes konposatua', 'El interés compuesto', 'الفائدة المركّبة'),
        goal: say('Interes konposatuko amaierako kapitala eta hasierako kapitala kalkulatzea.', 'Calcular el capital final y el capital inicial en el interés compuesto.', 'حساب رأس المال النهائي ورأس المال الأصلي في الفائدة المركّبة.'),
        explanation: say(
            'Interes konposatuan urte bakoitzeko interesa kapitalari gehitzen zaio, eta hurrengo urtean kapital handiago horrek sortzen du interesa: interesak ere interesa sortzen du. Urtero kapitala $1+\\frac{r}{100}$ indizeaz biderkatzen da, beraz $t$ urtetan $C_f=C\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$. 1000 € % 10ean: bakunean 1100, 1200, 1300; konposatuan 1100, 1210, 1331. 5600 € % 3,8an 10 urtez: $5600\\cdot 1{,}038^{10}\\approx 8131{,}33$ €. Atzera, hasierako kapitala: $C=C_f\\mathbin{:}\\left(1+\\frac{r}{100}\\right)^{t}$.',
            'En el interés compuesto el interés de cada año se suma al capital, y al año siguiente ese capital mayor produce interés: el interés también produce interés. Cada año el capital se multiplica por el índice $1+\\frac{r}{100}$, así que en $t$ años $C_f=C\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$. 1000 € al 10 %: en simple 1100, 1200, 1300; en compuesto 1100, 1210, 1331. 5600 € al 3,8 % durante 10 años: $5600\\cdot 1{,}038^{10}\\approx 8131{,}33$ €. Hacia atrás, el capital inicial: $C=C_f\\mathbin{:}\\left(1+\\frac{r}{100}\\right)^{t}$.',
            'في الفائدة المركّبة تُضاف فائدة كل سنة إلى رأس المال، وفي السنة التالية يُنتج رأس المال الأكبر فائدة: الفائدة نفسها تُنتج فائدة. كل سنة يُضرب رأس المال في المؤشر $1+\\frac{r}{100}$، إذن في $t$ سنوات $C_f=C\\cdot\\left(1+\\frac{r}{100}\\right)^{t}$. 1000 € بفائدة 10٪: في البسيطة 1100، 1200، 1300؛ وفي المركّبة 1100، 1210، 1331. 5600 € بفائدة 3.8٪ مدة 10 سنوات: $5600\\cdot 1{,}038^{10}\\approx 8131{,}33$ €. وللرجوع إلى رأس المال الأصلي: $C=C_f\\mathbin{:}\\left(1+\\frac{r}{100}\\right)^{t}$.'
        ),
        problem: say('10 000 € % 5ean jartzen dira interes konposatuan 3 urtez. Zenbat diru egongo da amaieran?', 'Se colocan 10 000 € al 5 % de interés compuesto durante 3 años. ¿Cuánto dinero habrá al final?', 'أودعنا 10000 € بفائدة مركّبة 5٪ مدة 3 سنوات. كم يصبح المبلغ في النهاية؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizea.', 'El índice.', 'المؤشر.'), math: same('$1+\\frac{5}{100}=1{,}05$') },
            { text: say('Hiru urte: hiru aldiz.', 'Tres años: tres veces.', 'ثلاث سنوات: ثلاث مرات.'), math: same('$1{,}05^{3}=1{,}157625$') },
            { text: say('Amaierako kapitala.', 'Capital final.', 'رأس المال النهائي.'), math: same('$10\\,000\\cdot 1{,}157625=11\\,576{,}25$') }
        ],
        example: same('$1000\\cdot 1{,}1^{3}=1331$'),
        takeaway: say('Urtero bider indizea: $C\\cdot(1+R/100)^{T}$.', 'Cada año por el índice: $C\\cdot(1+R/100)^{T}$.', 'كل سنة في المؤشر: $C\\cdot(1+R/100)^{T}$.'),
        figure: (language) => <CompoundInterestFigure language={language} />
    },
    {
        id: 'periods',
        stage: 'interest',
        title: say('Kapitalizazio-aldiak', 'Periodos de capitalización', 'فترات الرسملة'),
        goal: say('Interesak urtean $k$ aldiz (seihilekoz, hiruhilekoz, hilero) metatzen direnean amaierako kapitala kalkulatzea.', 'Calcular el capital final cuando los intereses se acumulan $k$ veces al año (semestral, trimestral, mensualmente).', 'حساب رأس المال النهائي عندما تُضاف الفوائد $k$ مرات في السنة (نصف سنويًا، ربع سنويًا، شهريًا).'),
        explanation: say(
            'Bankuak urtean $k$ aldiz gehitzen baditu interesak, aldi bakoitzean urteko tasaren $k$-garren zatia aplikatzen du, eta $t$ urtetan $k\\cdot t$ aldi daude: $C_f=C\\cdot\\left(1+\\frac{r}{100\\cdot k}\\right)^{k\\cdot t}$. Hilekoa $k=12$, hiruhilekoa $k=4$, lauhilekoa $k=3$, seihilekoa $k=2$. 24 000 € % 4,8an 5 urtez: urtekoa $24\\,000\\cdot 1{,}048^{5}\\approx 30\\,340{,}15$ €; hilekoa, % 0,4 hilero 60 hilabetez, $24\\,000\\cdot 1{,}004^{60}\\approx 30\\,495{,}38$ €. Zenbat eta maizago, orduan eta gehiago, baina alde txikia.',
            'Si el banco suma los intereses $k$ veces al año, en cada periodo aplica la $k$-ésima parte del tipo anual, y en $t$ años hay $k\\cdot t$ periodos: $C_f=C\\cdot\\left(1+\\frac{r}{100\\cdot k}\\right)^{k\\cdot t}$. Mensual $k=12$, trimestral $k=4$, cuatrimestral $k=3$, semestral $k=2$. 24 000 € al 4,8 % durante 5 años: anual, $24\\,000\\cdot 1{,}048^{5}\\approx 30\\,340{,}15$ €; mensual, un 0,4 % cada mes durante 60 meses, $24\\,000\\cdot 1{,}004^{60}\\approx 30\\,495{,}38$ €. Cuanto más a menudo, algo más, pero la diferencia es pequeña.',
            'إذا أضاف المصرف الفوائد $k$ مرات في السنة فإنه يطبّق في كل فترة الجزء $k$ من السعر السنوي، وفي $t$ سنوات توجد $k\\cdot t$ فترة: $C_f=C\\cdot\\left(1+\\frac{r}{100\\cdot k}\\right)^{k\\cdot t}$. شهريًا $k=12$، وربع سنوي $k=4$، وكل أربعة أشهر $k=3$، ونصف سنوي $k=2$. 24000 € بفائدة 4.8٪ مدة 5 سنوات: سنويًا $24\\,000\\cdot 1{,}048^{5}\\approx 30\\,340{,}15$ €؛ وشهريًا، 0.4٪ كل شهر مدة 60 شهرًا، $24\\,000\\cdot 1{,}004^{60}\\approx 30\\,495{,}38$ €. كلما تكررت الإضافة زاد المبلغ، لكن الفرق صغير.'
        ),
        problem: say('10 000 € % 12an urte batez, interesak hiruhilekoz metatuz. Zenbat diru amaieran?', '10 000 € al 12 % durante un año, con intereses trimestrales. ¿Cuánto dinero al final?', '10000 € بفائدة 12٪ مدة سنة، مع إضافة الفوائد كل ربع سنة. كم يصبح المبلغ؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiruhileko bakoitzean.', 'En cada trimestre.', 'في كل ربع سنة.'), math: same('$\\frac{12}{4}=3$') },
            { text: say('Lau aldi.', 'Cuatro periodos.', 'أربع فترات.'), math: same('$1{,}03^{4}=1{,}12550881$') },
            { text: say('Amaierako kapitala.', 'Capital final.', 'رأس المال النهائي.'), math: same('$10\\,000\\cdot 1{,}03^{4}\\approx 11\\,255{,}09$') }
        ],
        example: same('$24\\,000\\cdot 1{,}004^{60}\\approx 30\\,495{,}38$'),
        takeaway: say('Tasa zati $K$; urteak bider $K$.', 'El tipo entre $K$; los años por $K$.', 'السعر على $K$؛ والسنوات في $K$.'),
        figure: (language) => <PeriodsFigure language={language} />
    },

    /* ---------- 5. Other arithmetic problems ---------- */
    {
        id: 'mixtures',
        stage: 'problems',
        title: say('Nahasketak eta aleazioak', 'Mezclas y aleaciones', 'الخلائط والسبائك'),
        goal: say('Nahasketa baten prezio ertaina eta aleazio baten legea kalkulatzea.', 'Calcular el precio medio de una mezcla y la ley de una aleación.', 'حساب السعر المتوسط لخليط وعيار سبيكة.'),
        explanation: say(
            'Nahasketa batean kostuak eta kantitateak batzen dira, ez prezioak: prezio ertaina = kostu osoa : kantitate osoa. 12 kg kafe 12,40 €/kg-an eta 8 kg 7,40 €/kg-an: $12\\cdot 12{,}40+8\\cdot 7{,}40=208$ €, 20 kg-tan, $208\\mathbin{:}20=10{,}40$ €/kg. Ez da $\\frac{12{,}40+7{,}40}{2}=9{,}90$, kantitate gehiago dagoelako garestienetik. Aleazio baten legea metal preziatuaren pisua zati pisu osoa da: 2 kg % 85eko urrea eta 1,5 kg % 90ekoa, $\\frac{1{,}7+1{,}35}{3{,}5}\\approx 0{,}87$. Ura (doan) gehitzean, kostua ez da aldatzen eta kantitatea bai.',
            'En una mezcla se suman los costes y las cantidades, no los precios: precio medio = coste total : cantidad total. 12 kg de café a 12,40 €/kg y 8 kg a 7,40 €/kg: $12\\cdot 12{,}40+8\\cdot 7{,}40=208$ €, en 20 kg, $208\\mathbin{:}20=10{,}40$ €/kg. No es $\\frac{12{,}40+7{,}40}{2}=9{,}90$, porque hay más cantidad del caro. La ley de una aleación es el peso del metal precioso entre el peso total: 2 kg de oro de ley 0,85 y 1,5 kg de ley 0,9, $\\frac{1{,}7+1{,}35}{3{,}5}\\approx 0{,}87$. Al añadir agua (gratis), el coste no cambia y la cantidad sí.',
            'في الخليط نجمع الكلفات والكميات لا الأسعار: السعر المتوسط = الكلفة الكلية : الكمية الكلية. 12 كغ من البن بـ12.40 €/كغ و8 كغ بـ7.40 €/كغ: $12\\cdot 12{,}40+8\\cdot 7{,}40=208$ € في 20 كغ، $208\\mathbin{:}20=10{,}40$ €/كغ. وليس $\\frac{12{,}40+7{,}40}{2}=9{,}90$، لأن كمية الغالي أكبر. وعيار السبيكة هو وزن المعدن الثمين على الوزن الكلي: 2 كغ من ذهب عياره 0.85 و1.5 كغ عياره 0.9، $\\frac{1{,}7+1{,}35}{3{,}5}\\approx 0{,}87$. وعند إضافة الماء (مجانًا) لا تتغير الكلفة وتتغير الكمية.'
        ),
        problem: say('Upel batean 100 l ardo daude, 3,60 €/l. 20 l ur gehitzen zaizkio. Zein da litroaren prezio berria?', 'Un barril tiene 100 l de vino a 3,60 €/l. Se le añaden 20 l de agua. ¿Cuál es el nuevo precio del litro?', 'في برميل 100 ل من النبيذ بـ3.60 €/ل. أُضيف إليه 20 ل من الماء. ما السعر الجديد للتر؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kostua ez da aldatzen.', 'El coste no cambia.', 'الكلفة لا تتغير.'), math: same('$100\\cdot 3{,}60=360$') },
            { text: say('Kantitate berria.', 'La nueva cantidad.', 'الكمية الجديدة.'), math: same('$100+20=120$') },
            { text: say('Prezio ertaina: 3 €/l.', 'Precio medio: 3 €/l.', 'السعر المتوسط: 3 €/ل.'), math: same('$360\\mathbin{:}120=3$') }
        ],
        example: same('$\\frac{12\\cdot 12{,}40+8\\cdot 7{,}40}{20}=10{,}4$'),
        takeaway: say('Prezio ertaina = kostu osoa : kantitate osoa.', 'Precio medio = coste total : cantidad total.', 'السعر المتوسط = الكلفة الكلية : الكمية الكلية.'),
        figure: (language) => <MixtureFigure language={language} />
    },
    {
        id: 'motion',
        stage: 'problems',
        title: say('Mugikariak: topaketa eta jazarpena', 'Móviles: encuentro y persecución', 'المتحركات: التلاقي والمطاردة'),
        goal: say('Bi mugikari noiz elkartzen diren kalkulatzea, elkarrengana doazenean edo bata bestearen atzetik.', 'Calcular cuándo se encuentran dos móviles, cuando van uno hacia el otro o uno detrás del otro.', 'حساب متى يلتقي متحركان، عندما يتجه أحدهما نحو الآخر أو يلحقه.'),
        explanation: say(
            'Bi mugikarik denbora berean ibiltzen badira, haien arteko distantzia elkartzeko abiaduran aldatzen da: elkarrengana badoaz, abiadurak batzen dira; norabide berean, bata bestearen atzetik, kendu egiten dira. Denbora = distantzia : elkartzeko abiadura. A eta B 240 km-ra daude; kamioi bat A-tik 70 km/h-ra eta auto bat B-tik 110 km/h-ra: $240\\mathbin{:}180=\\frac{4}{3}$ h = 1 h 20 min. Autoa 120 km/h-ra kamioiaren atzetik doa, 90 km/h-ra, 75 km-ra: $75\\mathbin{:}30=2{,}5$ h. Kontuz unitateekin: 12 min = 0,2 h.',
            'Si dos móviles se mueven a la vez, la distancia entre ellos cambia a la velocidad de acercamiento: si van uno hacia el otro, las velocidades se suman; si van en el mismo sentido, uno detrás del otro, se restan. Tiempo = distancia : velocidad de acercamiento. A y B distan 240 km; un camión sale de A a 70 km/h y un coche de B a 110 km/h: $240\\mathbin{:}180=\\frac{4}{3}$ h = 1 h 20 min. Un coche a 120 km/h sigue a un camión a 90 km/h que va 75 km por delante: $75\\mathbin{:}30=2{,}5$ h. Cuidado con las unidades: 12 min = 0,2 h.',
            'إذا تحرّك متحركان في الوقت نفسه تغيّرت المسافة بينهما بسرعة الاقتراب: إذا اتجه أحدهما نحو الآخر نجمع السرعتين، وإذا سارا في الاتجاه نفسه أحدهما خلف الآخر نطرحهما. الزمن = المسافة : سرعة الاقتراب. المسافة بين A وB هي 240 كم؛ تنطلق شاحنة من A بسرعة 70 كم/س وسيارة من B بسرعة 110 كم/س: $240\\mathbin{:}180=\\frac{4}{3}$ س = 1 س 20 د. وتلاحق سيارة بسرعة 120 كم/س شاحنة بسرعة 90 كم/س تسبقها بـ75 كم: $75\\mathbin{:}30=2{,}5$ س. انتبه إلى الوحدات: 12 د = 0.2 س.'
        ),
        problem: say('Txirrindulari profesional bat 38 km/h-ra doa, eta 22 km aurrerago zikloturista bat 14 km/h-ra, norabide berean. Zenbat minutu behar ditu harrapatzeko?', 'Un ciclista profesional va a 38 km/h y, 22 km por delante, un cicloturista a 14 km/h en el mismo sentido. ¿Cuántos minutos tarda en alcanzarlo?', 'يسير درّاج محترف بسرعة 38 كم/س، وأمامه بـ22 كم درّاج هاوٍ بسرعة 14 كم/س في الاتجاه نفسه. كم دقيقة يحتاج ليلحق به؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Norabide berean: kendu.', 'Mismo sentido: resta.', 'الاتجاه نفسه: اطرح.'), math: same('$38-14=24$') },
            { text: say('Denbora orduetan.', 'Tiempo en horas.', 'الزمن بالساعات.'), math: same('$22\\mathbin{:}24=\\frac{11}{12}$') },
            { text: say('Minututan: 55 min.', 'En minutos: 55 min.', 'بالدقائق: 55 د.'), math: same('$\\frac{11}{12}\\cdot 60=55$') }
        ],
        example: same('$240\\mathbin{:}(70+110)=\\frac{4}{3}$'),
        takeaway: say('Elkarrengana: batu. Atzetik: kendu. Denbora = distantzia : abiadura.', 'Al encuentro: suma. Persecución: resta. Tiempo = distancia : velocidad.', 'التلاقي: اجمع. المطاردة: اطرح. الزمن = المسافة : السرعة.'),
        figure: (language) => <MotionFigure language={language} />
    },
    {
        id: 'taps',
        stage: 'problems',
        title: say('Txorrotak eta elkarrekin egindako lanak', 'Grifos y trabajos en común', 'الصنابير والأعمال المشتركة'),
        goal: say('Bi txorrotak (edo bi langilek) elkarrekin zenbat denbora behar duten kalkulatzea, ordu bateko zatiak batuz.', 'Calcular cuánto tardan juntos dos grifos (o dos trabajadores) sumando las partes que hacen en una hora.', 'حساب الزمن الذي يحتاجه صنبوران (أو عاملان) معًا بجمع ما ينجزه كل منهما في ساعة.'),
        explanation: say(
            'Txorrota batek biltegia 5 orduan betetzen badu, ordu batean $\\frac{1}{5}$ betetzen du. Bi txorrota batera: zatiak batzen dira, $\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$ orduko, eta biltegi osoa $\\frac{35}{12}$ h-tan betetzen da, hau da, 2 h 55 min. Ez dira orduak batzen (12 h ez!): biak batera, bakarrik baino azkarrago. Hustubide batek kendu egiten du: hotza 8 min, beroa 12 min eta hustubidea 4 min, $\\frac{1}{8}+\\frac{1}{12}-\\frac{1}{4}<0$, bainuontzia ez da inoiz beteko. Atzera ere bai: biak 2 h, lehena 3 h, beraz bigarrena $\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}$, 6 h.',
            'Si un grifo llena un depósito en 5 horas, en una hora llena $\\frac{1}{5}$. Dos grifos a la vez: se suman las partes, $\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$ por hora, y el depósito entero se llena en $\\frac{35}{12}$ h, es decir, 2 h 55 min. No se suman las horas (¡12 h no!): los dos juntos tardan menos que cada uno solo. Un desagüe resta: fría 8 min, caliente 12 min y desagüe 4 min, $\\frac{1}{8}+\\frac{1}{12}-\\frac{1}{4}<0$, la bañera no se llenará nunca. También hacia atrás: los dos, 2 h; el primero, 3 h; así que el segundo $\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}$, 6 h.',
            'إذا ملأ صنبور خزانًا في 5 ساعات فإنه يملأ $\\frac{1}{5}$ منه في ساعة. وصنبوران معًا: نجمع الجزأين، $\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$ في الساعة، فيمتلئ الخزان كله في $\\frac{35}{12}$ س، أي 2 س 55 د. لا نجمع الساعات (ليست 12 س!): معًا يستغرقان أقل من كل واحد وحده. والمصرف يطرح: البارد 8 د والساخن 12 د والمصرف 4 د، $\\frac{1}{8}+\\frac{1}{12}-\\frac{1}{4}<0$، فلن يمتلئ الحوض أبدًا. وبالعكس أيضًا: معًا 2 س، والأول 3 س، إذن الثاني $\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}$، أي 6 س.'
        ),
        problem: say('Ur hotzaren txorrotak bainuontzia 8 minututan betetzen du eta beroarenak 12tan. Zenbat minutu biak batera?', 'El grifo de agua fría llena la bañera en 8 minutos y el de caliente en 12. ¿Cuántos minutos tardan los dos juntos?', 'يملأ صنبور الماء البارد الحوض في 8 دقائق والساخن في 12. كم دقيقة يحتاجان معًا؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Minutu batean.', 'En un minuto.', 'في دقيقة.'), math: same('$\\frac{1}{8}+\\frac{1}{12}=\\frac{5}{24}$') },
            { text: say('Osoa: alderantzizkoa.', 'El total: el inverso.', 'الكل: المقلوب.'), math: same('$\\frac{24}{5}=4{,}8$') },
            { text: say('4 min 48 s.', '4 min 48 s.', '4 د 48 ث.'), math: same('$0{,}8\\cdot 60=48$') }
        ],
        example: same('$\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$'),
        takeaway: say('Batu ordu bateko zatiak; denbora = batura horren alderantzizkoa.', 'Suma las partes de una hora; el tiempo es el inverso de esa suma.', 'اجمع أجزاء الساعة؛ والزمن هو مقلوب المجموع.'),
        figure: (language) => <TapsFigure language={language} />
    }
]

import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Proportzionaltasuna · 1. DBH — diagnostic, guided practice, exercise bank
   and challenges. Exercises follow Santillana 1.º ESO unit 8 (curricular
   adaptation: croquettes, fodder, felt-tip pens, the tap, the bricklayers,
   Enrique's trainers) and Anaya unit 9 (chocolate bars, the kangaroo,
   painters, horses, the beekeeper, the jam order). Every closed answer is a
   single number; percentages are answered with the number before %.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })
/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const [whole, decimals = ''] = text.split(',')
    return fraction(Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

export const proportionDiagnostic: DiagnosticQuestion[] = [
    {
        id: 1201,
        prompt: say('Zein ez da magnitudea?', '¿Cuál no es una magnitud?', 'أيها ليس مقدارًا؟'),
        options: [say('Edertasuna', 'La belleza', 'الجمال'), say('Patata-zaku baten pisua', 'El peso de un saco de patatas', 'وزن كيس بطاطا'), say('Bizikleta baten prezioa', 'El precio de una bici', 'ثمن دراجة')],
        correctIndex: 0,
        explanation: say('Edertasuna ezin da zenbaki eta unitate batekin neurtu. Pisua (kg) eta prezioa (€) bai.', 'La belleza no se puede medir con un número y una unidad. El peso (kg) y el precio (€), sí.', 'لا يمكن قياس الجمال بعدد ووحدة. أما الوزن (كغ) والسعر (€) فنعم.'),
        topic: 'magnitude'
    },
    {
        id: 1202,
        prompt: say('Zein da 6 kg pentsuren eta 10 behiren arteko arrazoiaren balioa?', '¿Cuánto vale la razón entre 6 kg de pienso y 10 vacas?', 'كم قيمة النسبة بين 6 كغ من العلف و10 أبقار؟'),
        options: [same('$1{,}6$'), same('$0{,}6$'), same('$4$')],
        correctIndex: 1,
        explanation: same('$\\frac{6}{10}=6\\mathbin{:}10=0{,}6$'),
        topic: 'ratio'
    },
    {
        id: 1203,
        prompt: say('Aurkitu $x$: $\\frac{3}{6}=\\frac{7}{x}$.', 'Halla $x$: $\\frac{3}{6}=\\frac{7}{x}$.', 'أوجد $x$: $\\frac{3}{6}=\\frac{7}{x}$.'),
        options: [same('$21$'), same('$3{,}5$'), same('$14$')],
        correctIndex: 2,
        explanation: say('$3\\cdot x=6\\cdot 7=42$, beraz $x=42\\mathbin{:}3=14$.', '$3\\cdot x=6\\cdot 7=42$, así que $x=42\\mathbin{:}3=14$.', '$3\\cdot x=6\\cdot 7=42$، إذن $x=42\\mathbin{:}3=14$.'),
        topic: 'proportion'
    },
    {
        id: 1204,
        prompt: say('Zein bikote da zuzenki proportzionala?', '¿Qué pareja es directamente proporcional?', 'أي زوج متناسب طرديًا؟'),
        options: [say('Adina eta altuera', 'La edad y la altura', 'العمر والطول'), say('Laranja-kiloak eta haien prezioa', 'Los kilos de naranjas y su precio', 'كيلوغرامات البرتقال وثمنها'), say('Abiadura eta denbora', 'La velocidad y el tiempo', 'السرعة والزمن')],
        correctIndex: 1,
        explanation: say('Kilo bikoitzak prezio bikoitza. Adina eta altuera ez dira proportzionalak, eta abiadura eta denbora alderantziz proportzionalak dira.', 'El doble de kilos, el doble de precio. La edad y la altura no son proporcionales, y la velocidad y el tiempo son inversamente proporcionales.', 'ضعف الكيلوغرامات ضعف الثمن. أما العمر والطول فليسا متناسبين، والسرعة والزمن متناسبان عكسيًا.'),
        topic: 'direct'
    },
    {
        id: 1205,
        prompt: say('Kanguru batek 12 m egiten ditu 4 jauzitan. Zenbat 10 jauzitan?', 'Un canguro avanza 12 m en 4 saltos. ¿Cuánto en 10 saltos?', 'يقطع كنغر 12 م في 4 قفزات. كم يقطع في 10 قفزات؟'),
        options: [same('30 m'), same('18 m'), same('120 m')],
        correctIndex: 0,
        explanation: same('$12\\mathbin{:}4=3\\ \\to\\ 3\\cdot 10=30$'),
        topic: 'direct-unit'
    },
    {
        id: 1206,
        prompt: say('Bi margolarik horma bat 9 ordutan margotzen dute. Zenbat ordu behar dituzte hiruk?', 'Dos pintores pintan una pared en 9 horas. ¿Cuántas horas tardan tres?', 'يدهن رسّامان جدارًا في 9 ساعات. كم ساعة يحتاج ثلاثة؟'),
        options: [same('13,5 h'), same('6 h'), same('4,5 h')],
        correctIndex: 1,
        explanation: say('Alderantzizkoa da: $9\\cdot 2=18$ ordu batek, $18\\mathbin{:}3=6$ ordu hiruk.', 'Es inversa: $9\\cdot 2=18$ horas uno solo, $18\\mathbin{:}3=6$ horas tres.', 'إنه عكسي: $9\\cdot 2=18$ ساعة للواحد، و$18\\mathbin{:}3=6$ ساعات للثلاثة.'),
        topic: 'inverse-unit'
    },
    {
        id: 1207,
        prompt: say('Zenbat da 80ren % 25?', '¿Cuánto es el 25 % de 80?', 'كم يساوي 25٪ من 80؟'),
        options: [same('20'), same('25'), same('55')],
        correctIndex: 0,
        explanation: say('% 25 laurdena da: $80\\mathbin{:}4=20$.', 'El 25 % es la cuarta parte: $80\\mathbin{:}4=20$.', '25٪ هي الربع: $80\\mathbin{:}4=20$.'),
        topic: 'percent-of'
    },
    {
        id: 1208,
        prompt: say('Beroki batek 80 € balio du eta % 10 merkatu dute. Zenbat ordainduko dut?', 'Un abrigo cuesta 80 € y lo rebajan un 10 %. ¿Cuánto pagaré?', 'ثمن معطف 80 € وخُفّض 10٪. كم سأدفع؟'),
        options: [same('70 €'), same('8 €'), same('72 €')],
        correctIndex: 2,
        explanation: say('Beherapena $80\\cdot 10\\mathbin{:}100=8$ € da; ordaintzen dena, $80-8=72$ €. Ez da 10 € kentzea.', 'El descuento es $80\\cdot 10\\mathbin{:}100=8$ €; se paga $80-8=72$ €. No es quitar 10 €.', 'الخصم $80\\cdot 10\\mathbin{:}100=8$ €؛ والمدفوع $80-8=72$ €. ليس طرح 10 €.'),
        topic: 'discount'
    }
]

export const proportionPractice: PracticeItem[] = [
    /* ---------- Magnitudes and ratios ---------- */
    {
        id: 1, stage: 'ratios',
        prompt: say('Hiru kilo sagarrek 15 € balio dute. Zein da euroen eta kiloen arteko arrazoiaren balioa?', 'Tres kilos de manzanas cuestan 15 €. ¿Cuánto vale la razón entre euros y kilos?', 'ثمن ثلاثة كيلوغرامات من التفاح 15 €. كم قيمة النسبة بين اليورو والكيلوغرامات؟'),
        expected: n(5),
        hint: say('Aurrekaria euroak, ondorengoa kiloak.', 'Antecedente, los euros; consecuente, los kilos.', 'المقدَّم اليورو والتالي الكيلوغرامات.'),
        explanation: same('$\\frac{15}{3}=15\\mathbin{:}3=5$')
    },
    {
        id: 2, stage: 'ratios',
        prompt: say('Aurkitu $x$: $\\frac{2}{7}=\\frac{x}{21}$.', 'Halla $x$: $\\frac{2}{7}=\\frac{x}{21}$.', 'أوجد $x$: $\\frac{2}{7}=\\frac{x}{21}$.'),
        expected: n(6),
        hint: say('$7\\cdot x=2\\cdot 21$.', '$7\\cdot x=2\\cdot 21$.', '$7\\cdot x=2\\cdot 21$.'),
        explanation: same('$7\\cdot x=2\\cdot 21=42\\ \\to\\ x=42\\mathbin{:}7=6$')
    },
    {
        id: 3, stage: 'ratios',
        prompt: say('Aurkitu $x$: $\\frac{1{,}2}{0{,}6}=\\frac{x}{1{,}5}$.', 'Halla $x$: $\\frac{1{,}2}{0{,}6}=\\frac{x}{1{,}5}$.', 'أوجد $x$: $\\frac{1{,}2}{0{,}6}=\\frac{x}{1{,}5}$.'),
        expected: n(3),
        hint: say('Arrazoiak decimalak izan daitezke: gurutzeko biderkadurak berdin.', 'Las razones pueden tener decimales: los productos cruzados, igual.', 'قد تكون في النسب أعداد عشرية: والضرب التبادلي كما هو.'),
        explanation: same('$0{,}6\\cdot x=1{,}2\\cdot 1{,}5=1{,}8\\ \\to\\ x=1{,}8\\mathbin{:}0{,}6=3$')
    },
    {
        id: 4, stage: 'ratios',
        prompt: say('Osatu arrazoi berdinen seriea: $\\frac{3}{15}=\\frac{5}{x}$.', 'Completa la serie de razones iguales: $\\frac{3}{15}=\\frac{5}{x}$.', 'أكمل سلسلة النسب المتساوية: $\\frac{3}{15}=\\frac{5}{x}$.'),
        expected: n(25),
        hint: say('Konstantea: $3\\mathbin{:}15=0{,}2$.', 'La constante: $3\\mathbin{:}15=0{,}2$.', 'الثابت: $3\\mathbin{:}15=0{,}2$.'),
        explanation: same('$3\\cdot x=15\\cdot 5=75\\ \\to\\ x=75\\mathbin{:}3=25$')
    },

    /* ---------- Direct ---------- */
    {
        id: 5, stage: 'direct',
        prompt: say('3 errotulagailuk 6 € balio dute. Zenbat balio dute 9k?', '3 rotuladores cuestan 6 €. ¿Cuánto cuestan 9?', 'ثمن 3 أقلام تلوين 6 €. كم ثمن 9؟'),
        expected: n(18),
        hint: say('Errotulagailu batek: $6\\mathbin{:}3$.', 'Un rotulador: $6\\mathbin{:}3$.', 'القلم الواحد: $6\\mathbin{:}3$.'),
        explanation: same('$6\\mathbin{:}3=2\\ \\to\\ 2\\cdot 9=18$')
    },
    {
        id: 6, stage: 'direct',
        prompt: say('Bi kilo laranjak $1{,}50$ € balio dute. Zenbat balio dute 12 kilok?', 'Dos kilos de naranjas cuestan $1{,}50$ €. ¿Cuánto cuestan 12 kilos?', 'ثمن كيلوغرامين من البرتقال $1{,}50$ €. كم ثمن 12 كيلوغرامًا؟'),
        expected: n(9),
        hint: say('Kilo batek: $1{,}50\\mathbin{:}2$.', 'Un kilo: $1{,}50\\mathbin{:}2$.', 'الكيلو الواحد: $1{,}50\\mathbin{:}2$.'),
        explanation: same('$1{,}50\\mathbin{:}2=0{,}75\\ \\to\\ 0{,}75\\cdot 12=9$')
    },
    {
        id: 7, stage: 'direct',
        prompt: say('100 g izokin ketuak $2{,}40$ € balio dute. Zenbat balio dute 260 g-k?', '100 g de salmón ahumado cuestan $2{,}40$ €. ¿Cuánto cuestan 260 g?', 'ثمن 100 غ من السلمون المدخّن $2{,}40$ €. كم ثمن 260 غ؟'),
        expected: v('6,24'),
        hint: say('Hiruko erregela: $\\frac{100}{2{,}40}=\\frac{260}{x}$.', 'Regla de tres: $\\frac{100}{2{,}40}=\\frac{260}{x}$.', 'قاعدة الثلاثة: $\\frac{100}{2{,}40}=\\frac{260}{x}$.'),
        explanation: same('$x=\\frac{260\\cdot 2{,}40}{100}=6{,}24$')
    },
    {
        id: 8, stage: 'direct',
        prompt: say('Sagar-kilo batek $1{,}50$ € balio du. Zenbat balio dute 7 kilok?', 'Un kilo de manzanas cuesta $1{,}50$ €. ¿Cuánto cuestan 7 kilos?', 'ثمن كيلو التفاح $1{,}50$ €. كم ثمن 7 كيلوغرامات؟'),
        expected: v('10,5'),
        hint: say('Konstantea $1{,}50$ da: biderkatu.', 'La constante es $1{,}50$: multiplica.', 'الثابت $1{,}50$: اضرب.'),
        explanation: same('$1{,}50\\cdot 7=10{,}5$')
    },

    /* ---------- Inverse ---------- */
    {
        id: 9, stage: 'inverse',
        prompt: say('4 langilek eraikin bat 5 ordutan garbitzen dute. Zenbat ordu beharko lituzkete 10 langilek?', '4 operarios limpian un edificio en 5 horas. ¿Cuántas horas tardarían 10 operarios?', 'ينظّف 4 عمال مبنى في 5 ساعات. كم ساعة يحتاج 10 عمال؟'),
        expected: n(2),
        hint: say('Langile bakarrak: $5\\cdot 4$ ordu.', 'Un solo operario: $5\\cdot 4$ horas.', 'العامل الواحد: $5\\cdot 4$ ساعات.'),
        explanation: same('$5\\cdot 4=20\\ \\to\\ 20\\mathbin{:}10=2$')
    },
    {
        id: 10, stage: 'inverse',
        prompt: say('3 igeltserok horma bat 8 ordutan zarpiatzen dute. Zenbat beharko luke igeltsero bakar batek?', '3 albañiles enfoscan una pared en 8 horas. ¿Cuánto tardaría un solo albañil?', 'يليّس 3 بنّائين جدارًا في 8 ساعات. كم يحتاج بنّاء واحد؟'),
        expected: n(24),
        hint: say('Bakarrak denbora gehiago: biderkatu.', 'Uno solo, más tiempo: multiplica.', 'الواحد يحتاج وقتًا أطول: اضرب.'),
        explanation: same('$8\\cdot 3=24$')
    },
    {
        id: 11, stage: 'inverse',
        prompt: say('Nekazari batek 25 behi 18 egunez elikatzeko pentsua du. Zenbat egunez elikatuko lituzke 45 behi?', 'Un granjero tiene pienso para 25 vacas durante 18 días. ¿Cuántos días alimentaría a 45 vacas?', 'لدى مزارع علف يكفي 25 بقرة مدة 18 يومًا. كم يومًا يكفي 45 بقرة؟'),
        expected: n(10),
        hint: say('Behi gehiago, egun gutxiago: $25\\cdot 18=45\\cdot x$.', 'Más vacas, menos días: $25\\cdot 18=45\\cdot x$.', 'أبقار أكثر، أيام أقل: $25\\cdot 18=45\\cdot x$.'),
        explanation: same('$25\\cdot 18=450\\ \\to\\ 450\\mathbin{:}45=10$')
    },
    {
        id: 12, stage: 'inverse',
        prompt: say('Minutuko $2{,}5$ litroko txorrota batek 40 minutu behar ditu ontzi bat betetzeko. Zenbat minutu beharko lituzke minutuko 4 litrorekin?', 'Un grifo de $2{,}5$ litros por minuto tarda 40 minutos en llenar un depósito. ¿Cuánto tardaría con 4 litros por minuto?', 'صنبور تدفقه $2{,}5$ لتر في الدقيقة يملأ خزانًا في 40 دقيقة. كم دقيقة يحتاج بتدفق 4 لترات في الدقيقة؟'),
        expected: n(25),
        hint: say('Biderkadura beti bera: $2{,}5\\cdot 40$.', 'El producto siempre igual: $2{,}5\\cdot 40$.', 'حاصل الضرب ثابت: $2{,}5\\cdot 40$.'),
        explanation: same('$2{,}5\\cdot 40=100\\ \\to\\ 100\\mathbin{:}4=25$')
    },

    /* ---------- Percentages ---------- */
    {
        id: 13, stage: 'percent',
        prompt: say('Kalkulatu 300en % 7.', 'Calcula el 7 % de 300.', 'احسب 7٪ من 300.'),
        expected: n(21),
        hint: say('Biderkatu 7z eta zatitu 100ez.', 'Multiplica por 7 y divide entre 100.', 'اضرب في 7 واقسم على 100.'),
        explanation: same('$300\\cdot 7\\mathbin{:}100=21$')
    },
    {
        id: 14, stage: 'percent',
        prompt: say('480 ardiko artalde batean 120 ilea moztuta daude. Zer ehuneko da? (Idatzi zenbakia, % gabe.)', 'En un rebaño de 480 ovejas se han esquilado 120. ¿Qué porcentaje es? (Escribe el número, sin %.)', 'في قطيع من 480 نعجة جُزّ صوف 120. ما النسبة المئوية؟ (اكتب العدد بلا ٪.)'),
        expected: n(25),
        hint: say('Zatia zati osoa, bider 100.', 'La parte entre el total, por 100.', 'الجزء على الكل، في 100.'),
        explanation: same('$120\\mathbin{:}480=0{,}25\\ \\to\\ 0{,}25\\cdot 100=25$')
    },
    {
        id: 15, stage: 'percent',
        prompt: say('Zer ehuneko da $0{,}07$? (Idatzi zenbakia, % gabe.)', '¿Qué porcentaje es $0{,}07$? (Escribe el número, sin %.)', 'ما النسبة المئوية المساوية لـ $0{,}07$؟ (اكتب العدد بلا ٪.)'),
        expected: n(7),
        hint: say('Bider 100: koma bi toki eskuinera.', 'Por 100: la coma dos lugares a la derecha.', 'في 100: الفاصلة منزلتين يمينًا.'),
        explanation: same('$0{,}07\\cdot 100=7$')
    },
    {
        id: 16, stage: 'percent',
        prompt: say('Erlezain batek 54 erlauntzetako eztia atera du, erlategiaren % 30. Zenbat erlauntza ditu guztira?', 'Un apicultor ha sacado la miel de 54 colmenas, el 30 % del colmenar. ¿Cuántas colmenas tiene en total?', 'استخرج نحّال عسل 54 خلية، وهي 30٪ من المنحل. كم خلية عنده في المجموع؟'),
        expected: n(180),
        hint: say('% 1: $54\\mathbin{:}30$.', 'El 1 %: $54\\mathbin{:}30$.', '1٪: $54\\mathbin{:}30$.'),
        explanation: same('$54\\mathbin{:}30=1{,}8\\ \\to\\ 1{,}8\\cdot 100=180$')
    },

    /* ---------- Changes ---------- */
    {
        id: 17, stage: 'changes',
        prompt: say('Zapatilek 60 € balio dute eta % 15 deskontatu dute. Zenbat ordaintzen da?', 'Unas zapatillas cuestan 60 € y les descuentan el 15 %. ¿Cuánto se paga?', 'ثمن حذاء رياضي 60 € وخُصم منه 15٪. كم يُدفع؟'),
        expected: n(51),
        hint: say('Deskontua: $60\\cdot 15\\mathbin{:}100$.', 'El descuento: $60\\cdot 15\\mathbin{:}100$.', 'الخصم: $60\\cdot 15\\mathbin{:}100$.'),
        explanation: same('$60\\cdot 15\\mathbin{:}100=9\\ \\to\\ 60-9=51$')
    },
    {
        id: 18, stage: 'changes',
        prompt: say('75 €-ko isun bati % 15eko errekargua jarri diote. Zenbat ordaindu behar da guztira?', 'A una multa de 75 € le ponen un recargo del 15 %. ¿Cuánto hay que pagar en total?', 'فُرض على مخالفة قيمتها 75 € رسم إضافي قدره 15٪. كم يجب دفعه في المجموع؟'),
        expected: v('86,25'),
        hint: say('Errekargua kalkulatu eta batu.', 'Calcula el recargo y súmalo.', 'احسب الرسم واجمعه.'),
        explanation: same('$75\\cdot 15\\mathbin{:}100=11{,}25\\ \\to\\ 75+11{,}25=86{,}25$')
    },
    {
        id: 19, stage: 'changes',
        prompt: say('Beroki bat % 10 merkatu didate. Prezioaren zer ehuneko ordaintzen dut? (Idatzi zenbakia, % gabe.)', 'Me rebajan un abrigo un 10 %. ¿Qué porcentaje del precio pago? (Escribe el número, sin %.)', 'خُفّض لي معطف بنسبة 10٪. ما النسبة التي أدفعها من السعر؟ (اكتب العدد بلا ٪.)'),
        expected: n(90),
        hint: say('Osoa % 100 da.', 'El total es el 100 %.', 'الكل هو 100٪.'),
        explanation: same('$100-10=90$')
    },
    {
        id: 20, stage: 'changes',
        prompt: say('Nekazari batek 8400 kg sagar bildu ditu. % 80 supermerkatu-kate bati saldu dio eta % 15 fruta-denda bati; gainerakoa bota egin du. Zenbat kilo bota ditu?', 'Un agricultor recoge 8400 kg de manzanas. Vende el 80 % a una cadena de supermercados y el 15 % a una frutería; el resto lo desecha. ¿Cuántos kilos desecha?', 'جمع مزارع 8400 كغ من التفاح. باع 80٪ لسلسلة متاجر و15٪ لدكان فاكهة، وتخلّص من الباقي. كم كيلوغرامًا تخلّص منه؟'),
        expected: n(420),
        hint: say('Gainerakoa: $100-80-15$ ehuneko.', 'El resto: $100-80-15$ por ciento.', 'الباقي: $100-80-15$ بالمئة.'),
        explanation: same('$100-80-15=5\\ \\to\\ 8400\\cdot 5\\mathbin{:}100=420$')
    }
]

export const proportionChallenges: ChallengeItem[] = [
    {
        id: 101, stage: 'ratios', points: 10, context: 'starter',
        prompt: say('Aurkitu $x$: $\\frac{7}{21}=\\frac{x}{63}$.', 'Halla $x$: $\\frac{7}{21}=\\frac{x}{63}$.', 'أوجد $x$: $\\frac{7}{21}=\\frac{x}{63}$.'),
        expected: n(21),
        hint: say('$21\\cdot x=7\\cdot 63$.', '$21\\cdot x=7\\cdot 63$.', '$21\\cdot x=7\\cdot 63$.'),
        explanation: same('$21\\cdot x=7\\cdot 63=441\\ \\to\\ x=441\\mathbin{:}21=21$')
    },
    {
        id: 102, stage: 'ratios', points: 20, context: 'advanced',
        prompt: say('$\\frac{1}{2}=\\frac{2}{4}=\\frac{3}{6}=\\frac{4}{8}$. Kalkulatu aurrekarien batura zati ondorengoen batura.', '$\\frac{1}{2}=\\frac{2}{4}=\\frac{3}{6}=\\frac{4}{8}$. Calcula la suma de los antecedentes entre la suma de los consecuentes.', '$\\frac{1}{2}=\\frac{2}{4}=\\frac{3}{6}=\\frac{4}{8}$. احسب مجموع المقدَّمات على مجموع التوالي.'),
        expected: v('0,5'),
        hint: say('$1+2+3+4$ eta $2+4+6+8$.', '$1+2+3+4$ y $2+4+6+8$.', '$1+2+3+4$ و$2+4+6+8$.'),
        explanation: same('$\\frac{1+2+3+4}{2+4+6+8}=\\frac{10}{20}=0{,}5$')
    },
    {
        id: 103, stage: 'direct', points: 10, context: 'starter',
        prompt: say('12 fotokopiak $0{,}50$ € balio dute. Zenbat balio dute 30 fotokopiak?', '12 fotocopias cuestan $0{,}50$ €. ¿Cuánto cuestan 30 fotocopias?', 'ثمن 12 نسخة مصوّرة $0{,}50$ €. كم ثمن 30 نسخة؟'),
        expected: v('1,25'),
        hint: say('$\\frac{12}{0{,}50}=\\frac{30}{x}$.', '$\\frac{12}{0{,}50}=\\frac{30}{x}$.', '$\\frac{12}{0{,}50}=\\frac{30}{x}$.'),
        explanation: same('$x=\\frac{30\\cdot 0{,}50}{12}=\\frac{15}{12}=1{,}25$')
    },
    {
        id: 104, stage: 'direct', points: 20, context: 'advanced',
        prompt: say('Hamar ogi-barrak $4{,}75$ € balio dute. Zenbat balio dute 24 barrak?', 'Diez barras de pan cuestan $4{,}75$ €. ¿Cuánto cuestan 24 barras?', 'ثمن عشرة أرغفة $4{,}75$ €. كم ثمن 24 رغيفًا؟'),
        expected: v('11,4'),
        hint: say('Barra batek: $4{,}75\\mathbin{:}10$.', 'Una barra: $4{,}75\\mathbin{:}10$.', 'الرغيف الواحد: $4{,}75\\mathbin{:}10$.'),
        explanation: same('$4{,}75\\mathbin{:}10=0{,}475\\ \\to\\ 0{,}475\\cdot 24=11{,}4$')
    },
    {
        id: 105, stage: 'direct', points: 30, context: 'master',
        prompt: say('20 € gastatzeagatik 3 deskontu-kupoi ematen dizkizute. Zenbat kupoi 140 € gastatzeagatik?', 'Por cada 20 € de gasto te dan 3 cupones descuento. ¿Cuántos cupones te dan por un gasto de 140 €?', 'مقابل كل 20 € من المشتريات تحصل على 3 قسائم خصم. كم قسيمة مقابل 140 €؟'),
        expected: n(21),
        hint: say('$\\frac{20}{3}=\\frac{140}{x}$.', '$\\frac{20}{3}=\\frac{140}{x}$.', '$\\frac{20}{3}=\\frac{140}{x}$.'),
        explanation: same('$20\\cdot x=140\\cdot 3=420\\ \\to\\ x=420\\mathbin{:}20=21$')
    },
    {
        id: 106, stage: 'inverse', points: 20, context: 'advanced',
        prompt: say('Ur-biltegi bat 18 ordutan betetzen da minutuko 360 litro botatzen dituen txorrota batekin. Zenbat ordu beharko lirateke minutuko 270 litrorekin?', 'Un depósito se llena en 18 horas con un grifo del que salen 360 litros por minuto. ¿Cuántas horas tardaría con 270 litros por minuto?', 'يمتلئ خزان في 18 ساعة بصنبور يصب 360 لترًا في الدقيقة. كم ساعة يحتاج بتدفق 270 لترًا في الدقيقة؟'),
        expected: n(24),
        hint: say('Emari gutxiago, denbora gehiago: $360\\cdot 18=270\\cdot x$.', 'Menos caudal, más tiempo: $360\\cdot 18=270\\cdot x$.', 'تدفق أقل، زمن أطول: $360\\cdot 18=270\\cdot x$.'),
        explanation: same('$360\\cdot 18=6480\\ \\to\\ 6480\\mathbin{:}270=24$')
    },
    {
        id: 107, stage: 'inverse', points: 30, context: 'master',
        prompt: say('Auto batek 39 minututan egin du A eta B hirien arteko bidea, 95 km/h-ko batez besteko abiaduran. Zenbat minutu beharko ditu kamioi batek 65 km/h-ra?', 'Un coche ha hecho el recorrido entre las ciudades A y B en 39 minutos a 95 km/h de media. ¿Cuántos minutos tardará un camión a 65 km/h?', 'قطعت سيارة الطريق بين المدينتين أ وب في 39 دقيقة بسرعة متوسطة 95 كم/س. كم دقيقة تحتاج شاحنة بسرعة 65 كم/س؟'),
        expected: n(57),
        hint: say('Alderantzizkoa: $95\\cdot 39=65\\cdot x$.', 'Inversa: $95\\cdot 39=65\\cdot x$.', 'عكسي: $95\\cdot 39=65\\cdot x$.'),
        explanation: same('$95\\cdot 39=3705\\ \\to\\ 3705\\mathbin{:}65=57$')
    },
    {
        id: 108, stage: 'inverse', points: 20, context: 'advanced',
        prompt: say('10 igeltserok horma bat 45 egunetan eraikitzen dute. Zenbat igeltsero beharko lirateke 5 egunetan amaitzeko?', '10 albañiles construyen un muro en 45 días. ¿Cuántos albañiles harían falta para terminarlo en 5 días?', 'يبني 10 بنّائين جدارًا في 45 يومًا. كم بنّاءً نحتاج لإنهائه في 5 أيام؟'),
        expected: n(90),
        hint: say('$10\\cdot 45=x\\cdot 5$.', '$10\\cdot 45=x\\cdot 5$.', '$10\\cdot 45=x\\cdot 5$.'),
        explanation: same('$10\\cdot 45=450\\ \\to\\ 450\\mathbin{:}5=90$')
    },
    {
        id: 109, stage: 'percent', points: 10, context: 'starter',
        prompt: say('Zein zenbakiren % 8 da 24?', '¿De qué número es 24 el 8 %?', 'العدد 24 هو 8٪ من أي عدد؟'),
        expected: n(300),
        hint: say('% 1: $24\\mathbin{:}8$.', 'El 1 %: $24\\mathbin{:}8$.', '1٪: $24\\mathbin{:}8$.'),
        explanation: same('$24\\mathbin{:}8=3\\ \\to\\ 3\\cdot 100=300$')
    },
    {
        id: 110, stage: 'percent', points: 20, context: 'advanced',
        prompt: say('Kalkulatu 50en % $37{,}5$.', 'Calcula el $37{,}5$ % de 50.', 'احسب $37{,}5$٪ من 50.'),
        expected: v('18,75'),
        hint: say('$50\\cdot 37{,}5\\mathbin{:}100$.', '$50\\cdot 37{,}5\\mathbin{:}100$.', '$50\\cdot 37{,}5\\mathbin{:}100$.'),
        explanation: same('$50\\cdot 37{,}5=1875\\ \\to\\ 1875\\mathbin{:}100=18{,}75$')
    },
    {
        id: 111, stage: 'percent', points: 30, context: 'master',
        prompt: say('1. DBHn mutilak nesken % 80 dira. 30 neska badaude, zenbat mutil daude?', 'En 1.º ESO, los chicos son el 80 % del número de chicas. Si hay 30 chicas, ¿cuántos chicos hay?', 'في الصف الأول عدد الأولاد 80٪ من عدد البنات. إذا كانت البنات 30، فكم عدد الأولاد؟'),
        expected: n(24),
        hint: say('Nesken % 80: 30en % 80.', 'El 80 % de las chicas: el 80 % de 30.', '80٪ من البنات: 80٪ من 30.'),
        explanation: same('$30\\cdot 80\\mathbin{:}100=24$')
    },
    {
        id: 112, stage: 'changes', points: 10, context: 'starter',
        prompt: say('Ikasleen % 92k azterketa gainditu dute. Zer ehunekok ez du gainditu? (Idatzi zenbakia, % gabe.)', 'El 92 % de los alumnos ha aprobado un examen. ¿Qué porcentaje no ha aprobado? (Escribe el número, sin %.)', 'نجح 92٪ من التلاميذ في امتحان. ما نسبة من لم ينجح؟ (اكتب العدد بلا ٪.)'),
        expected: n(8),
        hint: say('Osoa % 100.', 'El total es el 100 %.', 'الكل 100٪.'),
        explanation: same('$100-92=8$')
    },
    {
        id: 113, stage: 'changes', points: 20, context: 'advanced',
        prompt: say('3000 marmelada-poteko eskaera batean: % 25 marrubi, % 45 aran, % 20 mertxika eta gainerakoa laranja. Zenbat pote dira laranjazkoak?', 'En un pedido de 3000 botes de mermelada: el 25 % son de fresa, el 45 % de ciruela, el 20 % de melocotón y el resto de naranja. ¿Cuántos botes son de naranja?', 'في طلبية من 3000 علبة مربى: 25٪ فراولة و45٪ برقوق و20٪ خوخ والباقي برتقال. كم علبة برتقال؟'),
        expected: n(300),
        hint: say('Laranjazkoak: $100-25-45-20$ ehuneko.', 'Las de naranja: $100-25-45-20$ por ciento.', 'البرتقال: $100-25-45-20$ بالمئة.'),
        explanation: same('$100-25-45-20=10\\ \\to\\ 3000\\cdot 10\\mathbin{:}100=300$')
    },
    {
        id: 114, stage: 'changes', points: 30, context: 'master',
        prompt: say('20000 biztanleko herri batean % 35 alokairuan bizi da. Zenbat pertsona bizi dira etxe propioan?', 'En un pueblo de 20000 habitantes, el 35 % vive de alquiler. ¿Cuántas personas viven en casa propia?', 'في بلدة من 20000 نسمة يعيش 35٪ في بيوت مستأجرة. كم شخصًا يعيش في بيت يملكه؟'),
        expected: n(13000),
        hint: say('Etxe propioan: $100-35$ ehuneko.', 'En casa propia: $100-35$ por ciento.', 'في بيت مملوك: $100-35$ بالمئة.'),
        explanation: same('$100-35=65\\ \\to\\ 20000\\cdot 65\\mathbin{:}100=13000$')
    }
]

export const proportionExerciseBank: ExerciseSection[] = [
    {
        id: 'ratios',
        title: say('Magnitudeak eta arrazoiak', 'Magnitudes y razones', 'المقادير والنسب'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Magnitudeak dira ala ez? a) Patata-zaku baten pisua; b) maitasuna; c) zure mahaiaren neurriak; d) igerileku bateko ur-litroak; e) barrea.', '¿Son magnitudes o no? a) El peso de un saco de patatas; b) el cariño; c) las dimensiones de tu pupitre; d) los litros de agua de una piscina; e) la risa.', 'هل هي مقادير أم لا؟ أ) وزن كيس بطاطا؛ ب) المحبة؛ ج) أبعاد طاولتك؛ د) لترات الماء في مسبح؛ هـ) الضحك.'), solution: say('a), c) eta d) magnitudeak dira (kg, cm, l); b) eta e) ez.', 'a), c) y d) son magnitudes (kg, cm, l); b) y e), no.', 'أ) وج) ود) مقادير (كغ، سم، ل)؛ أما ب) وهـ) فلا.') },
            { id: 2, difficulty: 'easy', question: say('Idatzi bi neurri-unitate: a) bi herriren arteko distantzia; b) botila baten edukia; c) bizikleta baten prezioa.', 'Indica dos unidades de medida: a) la distancia entre dos pueblos; b) el contenido de una botella; c) el precio de una bicicleta.', 'اذكر وحدتي قياس: أ) المسافة بين قريتين؛ ب) سعة زجاجة؛ ج) ثمن دراجة.'), solution: say('a) km eta m; b) l eta cl; c) € eta zentimoak.', 'a) km y m; b) l y cl; c) € y céntimos.', 'أ) كم وم؛ ب) ل وسل؛ ج) € والسنتات.') },
            { id: 3, difficulty: 'easy', question: say('Kalkulatu arrazoiaren balioa: 5 € eta 2 kg.', 'Calcula el valor de la razón: 5 € y 2 kg.', 'احسب قيمة النسبة: 5 € و2 كغ.'), solution: same('$\\frac{5}{2}=2{,}5$'), answer: { expected: v('2,5') } },
            { id: 4, difficulty: 'medium', question: say('Aurkitu $x$: $\\frac{6}{10}=\\frac{9}{x}$.', 'Halla $x$: $\\frac{6}{10}=\\frac{9}{x}$.', 'أوجد $x$: $\\frac{6}{10}=\\frac{9}{x}$.'), solution: same('$6\\cdot x=10\\cdot 9=90\\ \\to\\ x=90\\mathbin{:}6=15$'), answer: { expected: n(15) } },
            { id: 5, difficulty: 'medium', question: say('Aurkitu $x$: $\\frac{x}{4}=\\frac{10}{8}$.', 'Halla $x$: $\\frac{x}{4}=\\frac{10}{8}$.', 'أوجد $x$: $\\frac{x}{4}=\\frac{10}{8}$.'), solution: same('$8\\cdot x=4\\cdot 10=40\\ \\to\\ x=40\\mathbin{:}8=5$'), answer: { expected: n(5) } },
            { id: 6, difficulty: 'medium', question: say('Osatu arrazoi berdinen seriea: $\\frac{2}{3}=\\frac{6}{\\square}=\\frac{\\square}{12}=\\frac{10}{\\square}$.', 'Completa la serie de razones iguales: $\\frac{2}{3}=\\frac{6}{\\square}=\\frac{\\square}{12}=\\frac{10}{\\square}$.', 'أكمل سلسلة النسب المتساوية: $\\frac{2}{3}=\\frac{6}{\\square}=\\frac{\\square}{12}=\\frac{10}{\\square}$.'), solution: same('$\\frac{2}{3}=\\frac{6}{9}=\\frac{8}{12}=\\frac{10}{15}$') },
            { id: 7, difficulty: 'medium', question: say('Zatikiak ala arrazoiak? a) $\\frac{2}{5}$; b) $\\frac{0{,}5}{9}$; c) $\\frac{35}{8}$; d) $\\frac{4}{2{,}5}$.', '¿Fracciones o razones? a) $\\frac{2}{5}$; b) $\\frac{0{,}5}{9}$; c) $\\frac{35}{8}$; d) $\\frac{4}{2{,}5}$.', 'كسور أم نسب؟ أ) $\\frac{2}{5}$؛ ب) $\\frac{0{,}5}{9}$؛ ج) $\\frac{35}{8}$؛ د) $\\frac{4}{2{,}5}$.'), solution: say('a) eta c) zatikiak eta arrazoiak dira; b) eta d) arrazoiak bakarrik, hamartarrak dituztelako.', 'a) y c) son fracciones y razones; b) y d), solo razones, porque tienen decimales.', 'أ) وج) كسران ونسبتان؛ أما ب) ود) فنسبتان فقط لأن فيهما أعدادًا عشرية.') },
            { id: 8, difficulty: 'hard', question: say('Aurkitu $x$: $\\frac{0{,}5}{0{,}6}=\\frac{7{,}5}{x}$.', 'Halla $x$: $\\frac{0{,}5}{0{,}6}=\\frac{7{,}5}{x}$.', 'أوجد $x$: $\\frac{0{,}5}{0{,}6}=\\frac{7{,}5}{x}$.'), solution: same('$0{,}5\\cdot x=0{,}6\\cdot 7{,}5=4{,}5\\ \\to\\ x=4{,}5\\mathbin{:}0{,}5=9$'), answer: { expected: n(9) } },
            { id: 9, difficulty: 'hard', question: say('Egiaztatu: $\\frac{3}{6}=\\frac{4}{8}$ proportzio bat da?', 'Comprueba: ¿es $\\frac{3}{6}=\\frac{4}{8}$ una proporción?', 'تحقّق: هل $\\frac{3}{6}=\\frac{4}{8}$ تناسب؟'), solution: say('Bai: $3\\cdot 8=24$ eta $6\\cdot 4=24$.', 'Sí: $3\\cdot 8=24$ y $6\\cdot 4=24$.', 'نعم: $3\\cdot 8=24$ و$6\\cdot 4=24$.') },
            { id: 10, difficulty: 'hard', question: say('$\\frac{6}{10}=\\frac{12}{20}=\\frac{18}{30}$. Kalkulatu aurrekarien batura zati ondorengoen batura.', '$\\frac{6}{10}=\\frac{12}{20}=\\frac{18}{30}$. Calcula la suma de los antecedentes entre la de los consecuentes.', '$\\frac{6}{10}=\\frac{12}{20}=\\frac{18}{30}$. احسب مجموع المقدَّمات على مجموع التوالي.'), solution: same('$\\frac{6+12+18}{10+20+30}=\\frac{36}{60}=0{,}6$'), answer: { expected: v('0,6') } }
        ]
    },
    {
        id: 'direct',
        title: say('Proportzionaltasun zuzena', 'Proporcionalidad directa', 'التناسب الطردي'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Zuzenki proportzionalak dira? a) Laranja-kiloak eta prezioa; b) liburu baten orri kopurua eta pisua; c) ikasle baten adina eta altuera.', '¿Son directamente proporcionales? a) Los kilos de naranjas y su precio; b) el número de hojas de un libro y su peso; c) la edad de un alumno y su altura.', 'هل هي متناسبة طرديًا؟ أ) كيلوغرامات البرتقال وثمنها؛ ب) عدد أوراق كتاب ووزنه؛ ج) عمر تلميذ وطوله.'), solution: say('a) eta b) bai; c) ez.', 'a) y b), sí; c), no.', 'أ) وب) نعم؛ ج) لا.') },
            { id: 12, difficulty: 'easy', question: say('Zinema-sarrera batek 5 € balio du. Zenbat balio dute 8 sarrerak?', 'Una entrada de cine cuesta 5 €. ¿Cuánto cuestan 8 entradas?', 'ثمن تذكرة السينما 5 €. كم ثمن 8 تذاكر؟'), solution: same('$5\\cdot 8=40$'), answer: { expected: n(40) } },
            { id: 13, difficulty: 'easy', question: say('Hiru txokolatinek 90 g pisatzen dute. Zenbat pisatzen dute bik?', 'Tres chocolatinas pesan 90 g. ¿Cuánto pesan dos?', 'تزن ثلاث قطع شوكولاتة 90 غ. كم تزن قطعتان؟'), solution: same('$90\\mathbin{:}3=30\\ \\to\\ 30\\cdot 2=60$'), answer: { expected: n(60) } },
            { id: 14, difficulty: 'medium', question: say('Freskagarri-botila batek $3{,}50$ € balio du; 2 botilak, 6 €; 4 botilak, 11 €. Zuzenki proportzionalak dira?', '1 botella de refresco cuesta $3{,}50$ €; 2 botellas, 6 €; 4 botellas, 11 €. ¿Son directamente proporcionales?', 'ثمن زجاجة مشروب $3{,}50$ €؛ وزجاجتين 6 €؛ و4 زجاجات 11 €. هل هي متناسبة طرديًا؟'), solution: say('Ez: $\\frac{1}{3{,}50}\\neq\\frac{2}{6}$. Bi botilek 7 € balioko lukete.', 'No: $\\frac{1}{3{,}50}\\neq\\frac{2}{6}$. Dos botellas costarían 7 €.', 'لا: $\\frac{1}{3{,}50}\\neq\\frac{2}{6}$. كانت الزجاجتان ستكلفان 7 €.') },
            { id: 15, difficulty: 'medium', question: say('Txorrota batek segundoko $0{,}2$ litro botatzen ditu. Zenbat litro 20 segundotan?', 'Un grifo arroja $0{,}2$ litros cada segundo. ¿Cuántos litros en 20 segundos?', 'يصبّ صنبور $0{,}2$ لتر كل ثانية. كم لترًا في 20 ثانية؟'), solution: same('$0{,}2\\cdot 20=4$'), answer: { expected: n(4) } },
            { id: 16, difficulty: 'medium', question: say('Lau txokolatina erosteagatik $9{,}20$ € ordaindu ditut. Zenbat ordainduko nituzke hiru erosita?', 'He pagado $9{,}20$ € por cuatro chocolatinas. ¿Cuánto habría pagado por tres?', 'دفعت $9{,}20$ € ثمن أربع قطع شوكولاتة. كم كنت سأدفع ثمن ثلاث؟'), solution: same('$x=\\frac{3\\cdot 9{,}20}{4}=6{,}9$'), answer: { expected: v('6,9') } },
            { id: 17, difficulty: 'medium', question: say('Txirrindulari batek 75 km egiten ditu 2 ordutan. Abiadura berean, zenbat km 5 ordutan?', 'Un ciclista recorre 75 km en 2 horas. A la misma velocidad, ¿cuántos km en 5 horas?', 'يقطع دراج 75 كم في ساعتين. بالسرعة نفسها، كم كيلومترًا في 5 ساعات؟'), solution: same('$x=\\frac{5\\cdot 75}{2}=187{,}5$'), answer: { expected: v('187,5') } },
            { id: 18, difficulty: 'hard', question: say('Garbitzeko tunel batek 12 auto garbitzen ditu ordubetean (60 minutu). Zenbat minutu beharko ditu 25 autorentzat?', 'Un túnel de lavado limpia 12 coches en una hora (60 minutos). ¿Cuántos minutos tardará en lavar 25 coches?', 'يغسل نفق غسيل 12 سيارة في ساعة (60 دقيقة). كم دقيقة يحتاج لغسل 25 سيارة؟'), solution: same('$60\\mathbin{:}12=5\\ \\to\\ 5\\cdot 25=125$'), answer: { expected: n(125) } },
            { id: 19, difficulty: 'hard', question: say('5 esne-botilak $3{,}75$ € balio dute. Zenbat balio du 36 botilako kaxa batek?', '5 botellas de leche cuestan $3{,}75$ €. ¿Cuánto cuesta una caja de 36 botellas?', 'ثمن 5 زجاجات حليب $3{,}75$ €. كم ثمن صندوق من 36 زجاجة؟'), solution: same('$3{,}75\\mathbin{:}5=0{,}75\\ \\to\\ 0{,}75\\cdot 36=27$'), answer: { expected: n(27) } },
            { id: 20, difficulty: 'hard', question: say('Obra batean 2 langilek 5 m-ko zanga egiten dute. Erritmo berean, zenbat metro egingo dituzte beste 3 langile gehitzen badira?', 'En una obra, 2 obreros hacen una zanja de 5 m. Al mismo ritmo, ¿cuántos metros harán si se incorporan 3 obreros más?', 'في ورشة يحفر عاملان خندقًا طوله 5 م. بالوتيرة نفسها، كم مترًا يحفرون إذا انضم 3 عمال آخرون؟'), solution: same('$2+3=5\\ \\to\\ 5\\mathbin{:}2=2{,}5\\ \\to\\ 2{,}5\\cdot 5=12{,}5$'), answer: { expected: v('12,5') } }
        ]
    },
    {
        id: 'inverse',
        title: say('Alderantzizko proportzionaltasuna', 'Proporcionalidad inversa', 'التناسب العكسي'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Alderantziz proportzionalak dira? a) Auto baten abiadura eta distantzia jakin bat egiteko denbora; b) horma baten adreilu kopurua eta altuera; c) biltegi bat betetzen duten txorrotak eta denbora.', '¿Son inversamente proporcionales? a) La velocidad de un coche y el tiempo en recorrer una distancia; b) el número de ladrillos de una pared y su altura; c) los grifos que llenan un depósito y el tiempo.', 'هل هي متناسبة عكسيًا؟ أ) سرعة سيارة والزمن اللازم لقطع مسافة؛ ب) عدد طوب جدار وارتفاعه؛ ج) الصنابير التي تملأ خزانًا والزمن.'), solution: say('a) eta c) bai; b) ez (zuzena da).', 'a) y c), sí; b), no (es directa).', 'أ) وج) نعم؛ ب) لا (طردي).') },
            { id: 22, difficulty: 'easy', question: say('Belar-zama batek 3 zaldi elikatzen ditu 6 egunez. Zenbat egunez elikatuko luke zaldi bat?', 'Una carga de heno alimenta a 3 caballos durante 6 días. ¿Cuántos días alimentaría a un caballo?', 'حمولة تبن تطعم 3 خيول 6 أيام. كم يومًا تطعم حصانًا واحدًا؟'), solution: same('$6\\cdot 3=18$'), answer: { expected: n(18) } },
            { id: 23, difficulty: 'easy', question: say('Osatu taula (alderantzizkoa): langileak 1, 2, 4, 5, 10; orduak 20, …', 'Completa la tabla (inversa): operarios 1, 2, 4, 5, 10; horas 20, …', 'أكمل الجدول (عكسي): العمال 1، 2، 4، 5، 10؛ الساعات 20، …'), solution: same('$20,\\ 10,\\ 5,\\ 4,\\ 2\\qquad 1\\cdot 20=2\\cdot 10=4\\cdot 5=5\\cdot 4=10\\cdot 2=20$') },
            { id: 24, difficulty: 'medium', question: say('Hiru igeltserok horma bat 8 ordutan zarpiatzen dute. Zenbat ordu beharko lituzkete laurek?', 'Tres albañiles enfoscan una pared en 8 horas. ¿Cuántas horas tardarían cuatro?', 'يليّس ثلاثة بنّائين جدارًا في 8 ساعات. كم ساعة يحتاج أربعة؟'), solution: same('$8\\cdot 3=24\\ \\to\\ 24\\mathbin{:}4=6$'), answer: { expected: n(6) } },
            { id: 25, difficulty: 'medium', question: say('Belar-zama batek 3 zaldi elikatzen ditu 6 egunez. Zenbat zaldi behar dira 2 egunean jateko?', 'Una carga de heno alimenta a 3 caballos durante 6 días. ¿Cuántos caballos hacen falta para consumirla en 2 días?', 'حمولة تبن تطعم 3 خيول 6 أيام. كم حصانًا يلزم لاستهلاكها في يومين؟'), solution: same('$3\\cdot 6=18\\ \\to\\ 18\\mathbin{:}2=9$'), answer: { expected: n(9) } },
            { id: 26, difficulty: 'medium', question: say('Txorrota batek minutuko 3 litro botatzen ditu eta 15 minututan betetzen du upel bat. Zenbat minutu minutuko 12 litrorekin?', 'Un grifo vierte 3 litros por minuto y llena un tonel en 15 minutos. ¿Cuántos minutos con 12 litros por minuto?', 'يصب صنبور 3 لترات في الدقيقة ويملأ برميلًا في 15 دقيقة. كم دقيقة بتدفق 12 لترًا في الدقيقة؟'), solution: same('$3\\cdot 15=45\\ \\to\\ 45\\mathbin{:}12=3{,}75$'), answer: { expected: v('3,75') } },
            { id: 27, difficulty: 'medium', question: say('Ibiltari batek 30 minutu behar ditu 4 km/h-ra. Zenbat minutu txirrindulari batek 15 km/h-ra?', 'Un paseante tarda 30 minutos a 4 km/h. ¿Cuántos minutos tarda un ciclista a 15 km/h?', 'يحتاج ماشٍ 30 دقيقة بسرعة 4 كم/س. كم دقيقة يحتاج دراج بسرعة 15 كم/س؟'), solution: same('$4\\cdot 30=120\\ \\to\\ 120\\mathbin{:}15=8$'), answer: { expected: n(8) } },
            { id: 28, difficulty: 'hard', question: say('Ur-biltegi bat 18 ordutan betetzen da minutuko 360 litrorekin. Zenbat ordu minutuko 630 litrorekin?', 'Un depósito se llena en 18 horas con 360 litros por minuto. ¿Cuántas horas con 630 litros por minuto?', 'يمتلئ خزان في 18 ساعة بتدفق 360 لترًا في الدقيقة. كم ساعة بتدفق 630 لترًا في الدقيقة؟'), solution: same('$360\\cdot 18=6480\\ \\to\\ 6480\\mathbin{:}630=\\frac{72}{7}\\approx 10{,}29$') },
            { id: 29, difficulty: 'hard', question: say('10 igeltserok horma bat 45 egunetan eraikitzen dute. Zenbat egun beharko lituzkete 25 igeltserok?', '10 albañiles construyen un muro en 45 días. ¿Cuántos días tardarían 25 albañiles?', 'يبني 10 بنّائين جدارًا في 45 يومًا. كم يومًا يحتاج 25 بنّاءً؟'), solution: same('$10\\cdot 45=450\\ \\to\\ 450\\mathbin{:}25=18$'), answer: { expected: n(18) } },
            { id: 30, difficulty: 'hard', question: say('Egia ala gezurra? Belar-zama bat 3 zaldirentzat 6 egunerako bada, 6 zaldirentzat 3 egunerako da.', '¿Verdadero o falso? Si una carga de heno dura 6 días a 3 caballos, a 6 caballos les dura 3 días.', 'صحيح أم خطأ؟ إذا كفت حمولة تبن 3 خيول 6 أيام، فإنها تكفي 6 خيول 3 أيام.'), solution: say('Egia: $3\\cdot 6=6\\cdot 3=18$.', 'Verdadero: $3\\cdot 6=6\\cdot 3=18$.', 'صحيح: $3\\cdot 6=6\\cdot 3=18$.') }
        ]
    },
    {
        id: 'percent',
        title: say('Ehunekoak', 'Porcentajes', 'النسب المئوية'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Idatzi zatiki eta hamartar gisa: a) % 85; b) % 9; c) % 38.', 'Escribe como fracción y como decimal: a) 85 %; b) 9 %; c) 38 %.', 'اكتب كسرًا وعددًا عشريًا: أ) 85٪؛ ب) 9٪؛ ج) 38٪.'), solution: same('a) $\\frac{85}{100}=0{,}85$; b) $\\frac{9}{100}=0{,}09$; c) $\\frac{38}{100}=0{,}38$') },
            { id: 32, difficulty: 'easy', question: say('Kalkulatu buruz: a) 100en % 30; b) 200en % 30; c) 300en % 30.', 'Calcula mentalmente: a) 30 % de 100; b) 30 % de 200; c) 30 % de 300.', 'احسب ذهنيًا: أ) 30٪ من 100؛ ب) 30٪ من 200؛ ج) 30٪ من 300.'), solution: same('a) $30$; b) $60$; c) $90$') },
            { id: 33, difficulty: 'easy', question: say('Kalkulatu 400en % 25.', 'Calcula el 25 % de 400.', 'احسب 25٪ من 400.'), solution: same('$400\\mathbin{:}4=100$'), answer: { expected: n(100) } },
            { id: 34, difficulty: 'medium', question: say('Kalkulatu 560ren % 17.', 'Calcula el 17 % de 560.', 'احسب 17٪ من 560.'), solution: same('$560\\cdot 17\\mathbin{:}100=95{,}2$'), answer: { expected: v('95,2') } },
            { id: 35, difficulty: 'medium', question: say('Idatzi ehuneko gisa: a) $0{,}16$; b) $0{,}03$; c) $\\frac{3}{4}$; d) $0{,}625$.', 'Expresa en porcentaje: a) $0{,}16$; b) $0{,}03$; c) $\\frac{3}{4}$; d) $0{,}625$.', 'عبّر بالنسبة المئوية: أ) $0{,}16$؛ ب) $0{,}03$؛ ج) $\\frac{3}{4}$؛ د) $0{,}625$.'), solution: say('a) % 16; b) % 3; c) % 75; d) % $62{,}5$.', 'a) 16 %; b) 3 %; c) 75 %; d) $62{,}5$ %.', 'أ) 16٪؛ ب) 3٪؛ ج) 75٪؛ د) $62{,}5$٪.') },
            { id: 36, difficulty: 'medium', question: say('Klasean 30 ikasle daude eta % 40 jantokian geratzen da. Zenbat dira?', 'En clase hay 30 alumnos y el 40 % se queda al comedor. ¿Cuántos son?', 'في الصف 30 تلميذًا ويبقى 40٪ منهم في المطعم. كم عددهم؟'), solution: same('$30\\cdot 40\\mathbin{:}100=12$'), answer: { expected: n(12) } },
            { id: 37, difficulty: 'medium', question: say('Zer ehuneko da 200etik 24? (Idatzi zenbakia, % gabe.)', '¿Qué porcentaje es 24 de 200? (Escribe el número, sin %.)', 'ما النسبة المئوية لـ 24 من 200؟ (اكتب العدد بلا ٪.)'), solution: same('$24\\mathbin{:}200=0{,}12\\ \\to\\ 0{,}12\\cdot 100=12$'), answer: { expected: n(12) } },
            { id: 38, difficulty: 'hard', question: say('Zein zenbakiren % 70 da 280?', '¿De qué número es 280 el 70 %?', 'العدد 280 هو 70٪ من أي عدد؟'), solution: same('$280\\mathbin{:}70=4\\ \\to\\ 4\\cdot 100=400$'), answer: { expected: n(400) } },
            { id: 39, difficulty: 'hard', question: say('24000 m²-ko urbanizazio baten % 35 lorategia da. Zenbat m² dira lorategiak?', 'Una urbanización de 24000 m² tiene el 35 % ajardinado. ¿Cuántos m² ocupan los jardines?', 'مجمّع سكني مساحته 24000 م² منها 35٪ حدائق. كم م² تشغل الحدائق؟'), solution: same('$24000\\cdot 35\\mathbin{:}100=8400$'), answer: { expected: n(8400) } },
            { id: 40, difficulty: 'hard', question: say('Artalde baten % 70 ardiak dira eta gainerakoak ahuntzak. 60 ahuntz badaude, zenbat buru ditu artaldeak?', 'El 70 % de un rebaño son ovejas y el resto cabras. Si hay 60 cabras, ¿cuántas cabezas tiene el rebaño?', '70٪ من قطيع نعاج والباقي ماعز. إذا كان الماعز 60، فكم رأسًا في القطيع؟'), solution: same('$100-70=30\\ \\to\\ 60\\mathbin{:}30\\cdot 100=200$'), answer: { expected: n(200) } }
        ]
    },
    {
        id: 'changes',
        title: say('Igoerak, beherapenak eta problemak', 'Aumentos, descuentos y problemas', 'الزيادات والتخفيضات والمسائل'),
        items: [
            { id: 41, difficulty: 'easy', question: say('% 10eko beherapena: zer ehuneko ordaintzen da? Eta % 25ekoarekin?', 'Con un descuento del 10 %, ¿qué porcentaje se paga? ¿Y con uno del 25 %?', 'مع خصم 10٪، ما النسبة التي تُدفع؟ ومع خصم 25٪؟'), solution: say('% 90 eta % 75.', 'El 90 % y el 75 %.', '90٪ و75٪.') },
            { id: 42, difficulty: 'easy', question: say('Bizikleta batek 200 € balio zuen eta % 5 garestitu da. Zenbat balio du orain?', 'Una bici costaba 200 € y ha subido un 5 %. ¿Cuánto cuesta ahora?', 'كان ثمن دراجة 200 € وارتفع 5٪. كم ثمنها الآن؟'), solution: same('$200\\cdot 5\\mathbin{:}100=10\\ \\to\\ 200+10=210$'), answer: { expected: n(210) } },
            { id: 43, difficulty: 'easy', question: say('Beroki batek 80 € balio du eta % 10 merkatu dute. Zenbat ordainduko dut?', 'Un abrigo cuesta 80 € y lo rebajan un 10 %. ¿Cuánto pagaré?', 'ثمن معطف 80 € وخُفّض 10٪. كم سأدفع؟'), solution: same('$80\\cdot 10\\mathbin{:}100=8\\ \\to\\ 80-8=72$'), answer: { expected: n(72) } },
            { id: 44, difficulty: 'medium', question: say('Zapatilek 60 € balio dute eta % 15eko beherapena dute. Kalkulatu prezioa bider $0{,}85$ eginez.', 'Unas zapatillas de 60 € tienen un 15 % de descuento. Calcula el precio multiplicando por $0{,}85$.', 'حذاء رياضي ثمنه 60 € بخصم 15٪. احسب السعر بالضرب في $0{,}85$.'), solution: same('$60\\cdot 0{,}85=51$'), answer: { expected: n(51) } },
            { id: 45, difficulty: 'medium', question: say('Telefono batek 150 € balio zuen eta % 20 garestitu da. Zenbat balio du orain?', 'Un teléfono costaba 150 € y ha subido un 20 %. ¿Cuánto cuesta ahora?', 'كان ثمن هاتف 150 € وارتفع 20٪. كم ثمنه الآن؟'), solution: same('$150\\cdot 1{,}2=180$'), answer: { expected: n(180) } },
            { id: 46, difficulty: 'medium', question: say('Zein metodo? a) 3 kg-k 6 € balio badute, 5 kg; b) 4 langilek 6 egun badira, 8 langile; c) 60ren % 15.', '¿Qué método? a) Si 3 kg cuestan 6 €, 5 kg; b) si 4 obreros tardan 6 días, 8 obreros; c) el 15 % de 60.', 'أي طريقة؟ أ) إذا كان ثمن 3 كغ 6 €، فكم ثمن 5 كغ؛ ب) إذا احتاج 4 عمال 6 أيام، فكم يحتاج 8 عمال؛ ج) 15٪ من 60.'), solution: say('a) zuzena: $6\\mathbin{:}3\\cdot 5=10$; b) alderantzizkoa: $4\\cdot 6\\mathbin{:}8=3$; c) ehunekoa: $60\\cdot 15\\mathbin{:}100=9$.', 'a) directa: $6\\mathbin{:}3\\cdot 5=10$; b) inversa: $4\\cdot 6\\mathbin{:}8=3$; c) porcentaje: $60\\cdot 15\\mathbin{:}100=9$.', 'أ) طردي: $6\\mathbin{:}3\\cdot 5=10$؛ ب) عكسي: $4\\cdot 6\\mathbin{:}8=3$؛ ج) نسبة: $60\\cdot 15\\mathbin{:}100=9$.') },
            { id: 47, difficulty: 'medium', question: say('Kontzertu baterako 1200 sarreratik % 85 saldu dira. Zenbat sarrera geratzen dira?', 'De 1200 entradas para un concierto se ha vendido el 85 %. ¿Cuántas entradas quedan?', 'بيع 85٪ من 1200 تذكرة لحفل. كم تذكرة بقيت؟'), solution: same('$100-85=15\\ \\to\\ 1200\\cdot 15\\mathbin{:}100=180$'), answer: { expected: n(180) } },
            { id: 48, difficulty: 'hard', question: say('Kamiseta batek 24 € balio du beherapena egin ondoren; % 20 merkatu dute. Zenbat balio zuen lehen?', 'Una camiseta cuesta 24 € después de rebajarla un 20 %. ¿Cuánto costaba antes?', 'ثمن قميص 24 € بعد تخفيضه 20٪. كم كان ثمنه قبل ذلك؟'), solution: same('$100-20=80\\ \\to\\ 24\\mathbin{:}80\\cdot 100=30$'), answer: { expected: n(30) } },
            { id: 49, difficulty: 'hard', question: say('Merluza-kilo eta laurden batek $15{,}75$ € balio du. Zenbat balio du $1{,}4$ kg-ko beste batek?', 'Una merluza de kilo y cuarto cuesta $15{,}75$ €. ¿Cuánto cuesta otra de $1{,}4$ kg?', 'ثمن سمكة نازلي وزنها كيلو وربع $15{,}75$ €. كم ثمن أخرى وزنها $1{,}4$ كغ؟'), solution: same('$15{,}75\\mathbin{:}1{,}25=12{,}6\\ \\to\\ 12{,}6\\cdot 1{,}4=17{,}64$'), answer: { expected: v('17,64') } },
            { id: 50, difficulty: 'hard', question: say('Isun bati % 15eko errekargua jarri diote eta guztira $86{,}25$ € ordaindu dira. Zenbatekoa zen isuna?', 'A una multa le han puesto un recargo del 15 % y se han pagado $86{,}25$ € en total. ¿De cuánto era la multa?', 'فُرض على مخالفة رسم إضافي 15٪ ودُفع في المجموع $86{,}25$ €. كم كانت قيمة المخالفة؟'), solution: same('$100+15=115\\ \\to\\ 86{,}25\\mathbin{:}115\\cdot 100=75$'), answer: { expected: n(75) } }
        ]
    }
]

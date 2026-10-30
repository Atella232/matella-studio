import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { proportionDbh4ApLessonTexts } from './lessonTexts'
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
    { id: 'simple', tone: 'blue', title: { eu: 'Proportzionaltasun soila', es: 'Proporcionalidad simple', en: 'Simple proportion', ar: 'التناسب البسيط' } },
    { id: 'compound', tone: 'violet', title: { eu: 'Konposatua eta banaketak', es: 'Compuesta y repartos', en: 'Compound proportion and sharing', ar: 'المركّب والتوزيعات' } },
    { id: 'percent', tone: 'coral', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' } },
    { id: 'interest', tone: 'green', title: { eu: 'Interes bakuna eta konposatua', es: 'Interés simple y compuesto', en: 'Simple and compound interest', ar: 'الفائدة البسيطة والمركّبة' } },
    { id: 'problems', tone: 'mustard', title: { eu: 'Beste problema aritmetiko batzuk', es: 'Otros problemas aritméticos', en: 'Other arithmetic problems', ar: 'مسائل حسابية أخرى' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without their explanation, cases and typical mistake, which live in lessonTexts.ts */
const lessons: Omit<UnitTopic, 'explanation'>[] = [
    /* ---------- 1. Simple proportionality ---------- */
    {
        id: 'relations',
        stage: 'simple',
        title: say('Zuzena, alderantzizkoa ala bat ere ez', 'Directa, inversa o ninguna', 'طردي أم عكسي أم لا شيء', 'Direct, inverse or neither'),
        goal: say('Bi magnitude zuzenki, alderantziz ala ez proportzionalak diren erabakitzea, balioen taula batekin egiaztatuz.', 'Decidir si dos magnitudes son directa o inversamente proporcionales, o ninguna de las dos, comprobándolo con una tabla de valores.', 'تحديد ما إذا كان مقداران متناسبين طرديًا أو عكسيًا أو غير متناسبين، والتحقق بجدول قيم.', 'Decide whether two quantities are directly or inversely proportional, or neither, by checking with a table of values.'),
        problem: say('Ur-txorrota batek 3,5 l botatzen ditu orduko. Litroak eta orduak proportzionalak dira? Nolakoak?', 'Un grifo echa 3,5 l cada hora. ¿Son proporcionales los litros y las horas? ¿De qué tipo?', 'يصبّ صنبور 3.5 ل كل ساعة. هل اللترات والساعات متناسبة؟ من أي نوع؟', 'A tap delivers 3.5 l every hour. Are the litres and the hours proportional? What kind?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Taula: 1 h, 2 h, 3 h.', 'Tabla: 1 h, 2 h, 3 h.', 'جدول: 1 س، 2 س، 3 س.', 'Table: 1 h, 2 h, 3 h.'), math: same('$3{,}5\\quad 7\\quad 10{,}5$') },
            { text: say('Zatidura beti bera.', 'El cociente siempre es el mismo.', 'حاصل القسمة ثابت دائمًا.', 'The ratio is always the same.'), math: same('$\\frac{10{,}5}{3}=\\frac{7}{2}=3{,}5$') },
            { text: say('Zuzenki proportzionalak dira.', 'Son directamente proporcionales.', 'متناسبان طرديًا.', 'They are directly proportional.') }
        ],
        example: same('$\\frac{120}{90}\\cdot 7\\approx 9{,}3\\neq 12$'),
        takeaway: say('Zuzena: zatidura konstantea. Alderantzizkoa: biderkadura konstantea.', 'Directa: cociente constante. Inversa: producto constante.', 'الطردي: حاصل قسمة ثابت. العكسي: حاصل ضرب ثابت.', 'Direct: constant quotient. Inverse: constant product.'),
        figure: (language) => <ChooseMethodFigure language={language} />
    },
    {
        id: 'direct-rule',
        stage: 'simple',
        title: say('Hiruko erregela zuzena', 'Regla de tres directa', 'قاعدة الثلاثة الطردية', 'Direct rule of three'),
        goal: say('Proportzionaltasun zuzeneko problemak hiruko erregelaz edo unitatera laburtuz ebaztea, hamartarrekin.', 'Resolver problemas de proporcionalidad directa con regla de tres o reduciendo a la unidad, también con decimales.', 'حلّ مسائل التناسب الطردي بقاعدة الثلاثة أو بالإرجاع إلى الوحدة، مع الأعداد العشرية أيضًا.', 'Solve direct proportion problems with the rule of three or the unitary method, including those with decimals.'),
        problem: say('Jogurt baten 100 g-k 54 kcal dituzte. Zenbat kcal ditu 125 g-ko jogurt batek?', '100 g de yogur tienen 54 kcal. ¿Cuántas kcal tiene un yogur de 125 g?', 'في 100 غ من اللبن 54 سعرة حرارية. كم سعرة في لبن وزنه 125 غ؟', '100 g of yoghurt contains 54 kcal. How many kcal does a 125 g yoghurt contain?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioa.', 'La proporción.', 'التناسب.', 'The proportion.'), math: same('$\\frac{100}{125}=\\frac{54}{x}$') },
            { text: say('Gurutzean biderkatu.', 'Multiplica en cruz.', 'اضرب تبادليًا.', 'Cross-multiply.'), math: same('$100\\cdot x=54\\cdot 125=6750$') },
            { text: say('Zatitu: 67,5 kcal.', 'Divide: 67,5 kcal.', 'اقسم: 67.5 سعرة.', 'Divide: 67.5 kcal.'), math: same('$x=6750\\mathbin{:}100=67{,}5$') }
        ],
        example: same('$\\frac{3{,}60\\cdot 1}{0{,}75}=4{,}8$'),
        takeaway: say('Zuzena: $X=\\frac{B\\cdot C}{A}$; edo lehenik unitate baten balioa.', 'Directa: $X=\\frac{B\\cdot C}{A}$; o primero el valor de 1.', 'الطردي: $X=\\frac{B\\cdot C}{A}$؛ أو قيمة الواحد أولًا.', 'Direct: $X=\\frac{B\\cdot C}{A}$; or first find the value of 1.'),
        figure: (language) => <RuleOfThreeFigure language={language} />
    },
    {
        id: 'inverse-rule',
        stage: 'simple',
        title: say('Hiruko erregela alderantzizkoa', 'Regla de tres inversa', 'قاعدة الثلاثة العكسية', 'Inverse rule of three'),
        goal: say('Alderantzizko proportzionaltasuneko problemak biderkadura konstantea erabiliz ebaztea.', 'Resolver problemas de proporcionalidad inversa usando el producto constante.', 'حلّ مسائل التناسب العكسي باستعمال حاصل الضرب الثابت.', 'Solve inverse proportion problems using the constant product.'),
        problem: say('Egunean 3,60 € gastatuz, aurrezkiek 15 egun irauten dute. Zenbat egun egunean 4,50 € gastatuz?', 'Gastando 3,60 € al día, los ahorros duran 15 días. ¿Cuántos días duran gastando 4,50 € al día?', 'بإنفاق 3.60 € يوميًا تكفي المدخرات 15 يومًا. كم يومًا تكفي بإنفاق 4.50 € يوميًا؟', 'Spending €3.60 a day, the savings last 15 days. How many days do they last if you spend €4.50 a day?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gastu gehiago → egun gutxiago: alderantzizkoa.', 'Más gasto → menos días: inversa.', 'إنفاق أكثر ← أيام أقل: عكسي.', 'More spending → fewer days: inverse.') },
            { text: say('Aurrezki guztiak.', 'Los ahorros totales.', 'المدخرات كلها.', 'The total savings.'), math: same('$3{,}60\\cdot 15=54$') },
            { text: say('Zatitu: 12 egun.', 'Divide: 12 días.', 'اقسم: 12 يومًا.', 'Divide: 12 days.'), math: same('$54\\mathbin{:}4{,}50=12$') }
        ],
        example: same('$\\frac{35\\cdot 60}{20}=105$'),
        takeaway: say('Alderantzizkoa: $X=\\frac{A\\cdot B}{C}$, biderkadura ez da aldatzen.', 'Inversa: $X=\\frac{A\\cdot B}{C}$, el producto no cambia.', 'العكسي: $X=\\frac{A\\cdot B}{C}$، وحاصل الضرب لا يتغير.', 'Inverse: $X=\\frac{A\\cdot B}{C}$, the product stays the same.'),
        figure: (language) => <InverseRuleFigure language={language} />
    },

    /* ---------- 2. Compound proportionality and shares ---------- */
    {
        id: 'compound',
        stage: 'compound',
        title: say('Proportzionaltasun konposatua', 'Proporcionalidad compuesta', 'التناسب المركّب', 'Compound proportion'),
        goal: say('Hiru magnitude edo gehiago dituzten problemak ebaztea, erlazio bakoitza zuzena ala alderantzizkoa den erabakiz.', 'Resolver problemas con tres o más magnitudes, decidiendo si cada relación es directa o inversa.', 'حلّ مسائل فيها ثلاثة مقادير أو أكثر، مع تحديد نوع كل علاقة طرديةً كانت أم عكسية.', 'Solve problems with three or more quantities, deciding whether each relationship is direct or inverse.'),
        problem: say('5 lokaleko zinema-kate batek 15 000 sarrera saltzen ditu 3 astetan. Zenbat sarrera salduko lituzke astean 7 lokalekin?', 'Una cadena de cines con 5 locales vende 15 000 entradas en 3 semanas. ¿Cuántas entradas vendería a la semana con 7 locales?', 'سلسلة سينما لها 5 صالات تبيع 15000 تذكرة في 3 أسابيع. كم تذكرة تبيع في الأسبوع بـ7 صالات؟', 'A chain of 5 cinemas sells 15,000 tickets in 3 weeks. How many tickets would it sell per week with 7 cinemas?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lokal gehiago → sarrera gehiago: zuzena.', 'Más locales → más entradas: directa.', 'صالات أكثر ← تذاكر أكثر: طردي.', 'More cinemas → more tickets: direct.'), math: same('$\\frac{7}{5}$') },
            { text: say('Aste gutxiago → sarrera gutxiago: zuzena.', 'Menos semanas → menos entradas: directa.', 'أسابيع أقل ← تذاكر أقل: طردي.', 'Fewer weeks → fewer tickets: direct.'), math: same('$\\frac{1}{3}$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$15\\,000\\cdot\\frac{7}{5}\\cdot\\frac{1}{3}=7000$') }
        ],
        example: same('$10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$'),
        takeaway: say('Zuzena: berria/zaharra. Alderantzizkoa: zaharra/berria.', 'Directa: nuevo/viejo. Inversa: viejo/nuevo.', 'الطردي: الجديد/القديم. العكسي: القديم/الجديد.', 'Direct: new/old. Inverse: old/new.'),
        figure: (language) => <CompoundMixedFigure language={language} />
    },
    {
        id: 'direct-share',
        stage: 'compound',
        title: say('Banaketa zuzenki proportzionala', 'Reparto directamente proporcional', 'التوزيع الطردي', 'Sharing in direct proportion'),
        goal: say('Kantitate bat zenbaki batzuekiko zuzenki proportzionalak diren zatitan banatzea.', 'Repartir una cantidad en partes directamente proporcionales a unos números.', 'توزيع كمية إلى أجزاء متناسبة طرديًا مع أعداد معطاة.', 'Share an amount into parts in direct proportion to some numbers.'),
        problem: say('Bi ahizpek 5 eskuoihal-joko erosi dituzte 175 €-an. Batek 3 joko hartzen ditu eta besteak 2. Zenbat ordaintzen du bakoitzak?', 'Dos hermanas compran cinco juegos de toallas por 175 €. Una se queda con 3 juegos y la otra con 2. ¿Cuánto paga cada una?', 'اشترت أختان خمس مجموعات مناشف بـ175 €. أخذت إحداهما 3 مجموعات والأخرى 2. كم تدفع كل واحدة؟', 'Two sisters buy five sets of towels for €175. One keeps 3 sets and the other keeps 2. How much does each one pay?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Joko baten prezioa.', 'Precio de un juego.', 'ثمن المجموعة الواحدة.', 'Price of one set.'), math: same('$175\\mathbin{:}5=35$') },
            { text: say('Bakoitzak.', 'Cada una.', 'كل واحدة.', 'Each one.'), math: same('$3\\cdot 35=105\\qquad 2\\cdot 35=70$') }
        ],
        example: same('$62{,}40\\mathbin{:}120=0{,}52$'),
        takeaway: say('Zuzena: kantitatea : batura, gero bider zenbaki bakoitza.', 'Directo: cantidad : suma, y luego por cada número.', 'الطردي: الكمية : المجموع ثم في كل عدد.', 'Direct: amount : sum, then multiply by each number.'),
        figure: (language) => <ShareDaysFigure language={language} />
    },
    {
        id: 'inverse-share',
        stage: 'compound',
        title: say('Banaketa alderantziz proportzionala', 'Reparto inversamente proporcional', 'التوزيع العكسي', 'Sharing in inverse proportion'),
        goal: say('Kantitate bat zenbaki batzuekiko alderantziz proportzionalak diren zatitan banatzea.', 'Repartir una cantidad en partes inversamente proporcionales a unos números.', 'توزيع كمية إلى أجزاء متناسبة عكسيًا مع أعداد معطاة.', 'Share an amount into parts in inverse proportion to some numbers.'),
        problem: say('Banatu 660 alderantziz proportzionalki 1, 2 eta 3rekiko.', 'Reparte 660 en partes inversamente proporcionales a 1, 2 y 3.', 'وزّع 660 عكسيًا على 1 و2 و3.', 'Share 660 into parts that are inversely proportional to 1, 2 and 3.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alderantzizkoak, izendatzaile berarekin.', 'Los inversos, con el mismo denominador.', 'المقلوبات بالمقام نفسه.', 'The inverses, with the same denominator.'), math: same('$\\frac{6}{6},\\ \\frac{3}{6},\\ \\frac{2}{6}$') },
            { text: say('6, 3 eta 2rekiko: 11 zati.', 'Proporcional a 6, 3 y 2: 11 partes.', 'متناسب مع 6 و3 و2: 11 جزءًا.', 'In proportion to 6, 3 and 2: 11 parts.'), math: same('$660\\mathbin{:}11=60$') },
            { text: say('Zatiak.', 'Las partes.', 'الأجزاء.', 'The parts.'), math: same('$360,\\ 180,\\ 120$') }
        ],
        example: same('$1+\\frac{1}{2}+\\frac{1}{3}=\\frac{11}{6}$'),
        takeaway: say('Alderantzizkoa: banatu alderantzizkoekiko zuzenki.', 'Inverso: reparte directamente a los inversos.', 'العكسي: وزّع طرديًا على المقلوبات.', 'Inverse: share directly in proportion to the inverses.'),
        figure: (language) => <InverseShareFigure language={language} />
    },

    /* ---------- 3. Percentages ---------- */
    {
        id: 'percent-calc',
        stage: 'percent',
        title: say('Zatia, osoa eta ehunekoa', 'La parte, el total y el porcentaje', 'الجزء والكل والنسبة', 'The part, the total and the percentage'),
        goal: say('Hiru kalkuluak ebaztea: kantitate baten ehunekoa, zatitik osoa eta zati batek zer ehuneko den.', 'Resolver los tres cálculos: el porcentaje de una cantidad, el total a partir de la parte y qué porcentaje es una parte.', 'حلّ الحسابات الثلاثة: نسبة من كمية، والكل انطلاقًا من الجزء، ونسبة جزء من الكل.', 'Solve the three calculations: the percentage of an amount, the total from the part, and what percentage a part is.'),
        problem: say('Bernardok bizikleta bat erosi du: gurasoek % 50 ordaindu dute, amonak % 30 eta berak gainerakoa, 108 €. Zenbat balio zuen bizikletak?', 'Bernardo ha comprado una bici: sus padres han pagado el 50 %, su abuela el 30 % y él el resto, 108 €. ¿Cuánto costaba la bici?', 'اشترى برناردو دراجة: دفع والداه 50٪ وجدته 30٪ ودفع هو الباقي 108 €. كم كان ثمن الدراجة؟', 'Bernardo has bought a bike: his parents paid 50%, his grandmother 30%, and he paid the rest, €108. How much did the bike cost?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berak jarritakoa.', 'Lo que ha puesto él.', 'ما دفعه هو.', 'What he paid.'), math: same('$100-50-30=20$') },
            { text: say('% 20 = 108 €.', '20 % = 108 €.', '20٪ = 108 €.', '20% = €108.'), math: same('$T\\cdot 0{,}2=108$') },
            { text: say('Osoa.', 'El total.', 'الكل.', 'The total.'), math: same('$T=108\\mathbin{:}0{,}2=540$') }
        ],
        example: same('$24\\,000\\mathbin{:}0{,}8=30\\,000$'),
        takeaway: say('Zatia = osoa · hamartarra; osoa = zatia : hamartarra.', 'Parte = total · decimal; total = parte : decimal.', 'الجزء = الكل · العشري؛ الكل = الجزء : العشري.', 'Part = total · decimal; total = part : decimal.'),
        figure: (language) => <PercentTotalFigure language={language} />
    },
    {
        id: 'index',
        stage: 'percent',
        title: say('Aldakuntza-indizea: BEZa eta beherapenak', 'El índice de variación: IVA y rebajas', 'مؤشر التغيّر: الضريبة والتخفيضات', 'The multiplier: VAT and sales'),
        goal: say('Igoerak eta beherapenak indizeaz biderkatuz kalkulatzea, hasierako kantitatea zatituz, eta aldakuntzaren ehunekoa.', 'Calcular aumentos y disminuciones multiplicando por el índice, la cantidad inicial dividiendo y el porcentaje de variación.', 'حساب الزيادات والتخفيضات بالضرب في المؤشر، والكمية الأصلية بالقسمة، ونسبة التغيّر.', 'Calculate increases and decreases by multiplying by the multiplier, find the starting amount by dividing, and find the percentage change.'),
        problem: say('% 25 merkatutako soineko batek 84 € balio du. Zenbat balio zuen merkealdiaren aurretik?', 'Un vestido rebajado un 25 % sale por 84 €. ¿Cuánto costaba antes de la rebaja?', 'فستان مخفّض 25٪ ثمنه 84 €. كم كان ثمنه قبل التخفيض؟', 'A dress reduced by 25% costs €84. How much did it cost before the sale?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizea: % 75.', 'Índice: el 75 %.', 'المؤشر: 75٪.', 'Multiplier: 75%.'), math: same('$1-0{,}25=0{,}75$') },
            { text: say('Hasierakoa = amaierakoa : indizea.', 'Inicial = final : índice.', 'الأصلية = النهائية : المؤشر.', 'Initial = final : multiplier.'), math: same('$84\\mathbin{:}0{,}75=112$') }
        ],
        example: same('$143{,}99\\mathbin{:}1{,}21=119$'),
        takeaway: say('Amaierakoa = hasierakoa · indizea; atzera, zatitu.', 'Final = inicial · índice; hacia atrás, divide.', 'النهائية = الأصلية · المؤشر؛ وللرجوع اقسم.', 'Final = starting amount · multiplier; working backwards, divide.'),
        figure: (language) => <IndexFigure language={language} />
    },
    {
        id: 'chained',
        stage: 'percent',
        title: say('Ehuneko kateatuak', 'Porcentajes encadenados', 'النسب المتتالية', 'Chained percentages'),
        goal: say('Jarraian egiten diren aldaketak indizeak biderkatuz kalkulatzea eta aldakuntza osoa interpretatzea.', 'Calcular cambios sucesivos multiplicando los índices e interpretar la variación total.', 'حساب تغيّرات متتالية بضرب المؤشرات وتفسير التغيّر الكلي.', 'Calculate successive changes by multiplying the multipliers and interpret the overall change.'),
        problem: say('Auto batek 15 000 € balio du. Matrikulatzean % 18 galtzen du, eta gero % 10 urtero. Zenbat balio du hirugarren urtearen amaieran?', 'Un coche vale 15 000 €. Al matricularlo pierde un 18 % y luego un 10 % cada año. ¿Cuánto vale al final del tercer año?', 'ثمن سيارة 15000 €. تخسر 18٪ عند تسجيلها ثم 10٪ كل سنة. كم ثمنها في نهاية السنة الثالثة؟', 'A car is worth €15,000. When it is registered, it loses 18%, and then 10% every year. How much is it worth at the end of the third year?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizeak.', 'Los índices.', 'المؤشرات.', 'The multipliers.'), math: same('$0{,}82\\cdot 0{,}9^{3}=0{,}59778$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$15\\,000\\cdot 0{,}59778=8966{,}7$') }
        ],
        example: same('$1{,}4\\cdot 0{,}6=0{,}84$'),
        takeaway: say('Kateatuak: indizeak biderkatu, ez ehunekoak batu.', 'Encadenados: multiplica los índices, no sumes los porcentajes.', 'المتتالية: اضرب المؤشرات ولا تجمع النسب.', 'Chained changes: multiply the multipliers, don\'t add the percentages.'),
        figure: (language) => <ChainedFigure language={language} />
    },

    /* ---------- 4. Simple and compound interest ---------- */
    {
        id: 'simple-interest',
        stage: 'interest',
        title: say('Interes bakuna', 'El interés simple', 'الفائدة البسيطة', 'Simple interest'),
        goal: say('Interes bakuna kalkulatzea urtetan, hilabetetan edo egunetan, eta kapitala, tasa edo denbora aurkitzea.', 'Calcular el interés simple en años, meses o días, y hallar el capital, el tipo o el tiempo.', 'حساب الفائدة البسيطة بالسنوات أو الأشهر أو الأيام، وإيجاد رأس المال أو السعر أو المدة.', 'Calculate simple interest in years, months or days, and find the principal, the rate or the time.'),
        problem: say('Kapitala: 6000 €. Interes-tasa: % 3. Denbora: 8 hilabete. Zenbat interes sortzen du?', '¿Qué interés producen 6000 € al 3 % durante 8 meses?', 'ما الفائدة التي تُنتجها 6000 € بنسبة 3٪ مدة 8 أشهر؟', 'How much interest does €6000 earn at 3% over 8 months?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Denbora hilabetetan: zatitzailea 1200 da.', 'Tiempo en meses: divide entre 1200.', 'المدة بالأشهر: اقسم على 1200.', 'Time in months: divide by 1200.'), math: same('$I=\\frac{6000\\cdot 3\\cdot 8}{1200}$') },
            { text: say('120 €.', '120 €.', '120 €.', '€120.'), math: same('$\\frac{144\\,000}{1200}=120$') }
        ],
        example: same('$\\frac{448{,}80\\cdot 1200}{3{,}2\\cdot 9}=18\\,700$'),
        takeaway: say('Zatitzailea: urteak, 100; hilabeteak, 1200; egunak, 36 000.', 'Años: entre 100. Meses: entre 1200. Días: entre 36 000.', 'السنوات: على 100. الأشهر: على 1200. الأيام: على 36000.', 'Years: divide by 100. Months: divide by 1200. Days: divide by 36,000.'),
        figure: (language) => <InterestFigure language={language} />
    },
    {
        id: 'compound-interest',
        stage: 'interest',
        title: say('Interes konposatua', 'El interés compuesto', 'الفائدة المركّبة', 'Compound interest'),
        goal: say('Interes konposatuko amaierako kapitala eta hasierako kapitala kalkulatzea.', 'Calcular el capital final y el capital inicial en el interés compuesto.', 'حساب رأس المال النهائي ورأس المال الأصلي في الفائدة المركّبة.', 'Calculate the final amount and the starting principal in compound interest.'),
        problem: say('10 000 € jartzen dira interes konposatuan, tasa % 5 dela, 3 urtez. Zenbat diru egongo da amaieran?', 'Se colocan 10 000 € al 5 % de interés compuesto durante 3 años. ¿Cuánto dinero habrá al final?', 'أودعنا 10000 € بفائدة مركّبة 5٪ مدة 3 سنوات. كم يصبح المبلغ في النهاية؟', '€10,000 is invested at 5% compound interest for 3 years. How much money will there be at the end?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizea.', 'El índice.', 'المؤشر.', 'The multiplier.'), math: same('$1+\\frac{5}{100}=1{,}05$') },
            { text: say('Hiru urte: hiru aldiz.', 'Tres años: tres veces.', 'ثلاث سنوات: ثلاث مرات.', 'Three years: three times.'), math: same('$1{,}05^{3}=1{,}157625$') },
            { text: say('Amaierako kapitala.', 'Capital final.', 'رأس المال النهائي.', 'Final amount.'), math: same('$10\\,000\\cdot 1{,}157625=11\\,576{,}25$') }
        ],
        example: same('$1000\\cdot 1{,}1^{3}=1331$'),
        takeaway: say('Urtero bider indizea: $C\\cdot(1+R/100)^{T}$.', 'Cada año por el índice: $C\\cdot(1+R/100)^{T}$.', 'كل سنة في المؤشر: $C\\cdot(1+R/100)^{T}$.', 'Multiply by the multiplier each year: $C\\cdot(1+R/100)^{T}$.'),
        figure: (language) => <CompoundInterestFigure language={language} />
    },
    {
        id: 'periods',
        stage: 'interest',
        title: say('Kapitalizazio-aldiak', 'Periodos de capitalización', 'فترات الرسملة', 'Compounding periods'),
        goal: say('Interesak urtean $k$ aldiz (seihilekoz, hiruhilekoz, hilero) metatzen direnean amaierako kapitala kalkulatzea.', 'Calcular el capital final cuando los intereses se acumulan $k$ veces al año (semestral, trimestral, mensualmente).', 'حساب رأس المال النهائي عندما تُضاف الفوائد $k$ مرات في السنة (نصف سنويًا، ربع سنويًا، شهريًا).', 'Calculate the final amount when interest is added $k$ times a year (every six months, quarterly, monthly).'),
        problem: say('10 000 € urte batez, tasa % 12 dela, interesak hiruhilekoz metatuz. Zenbat diru amaieran?', '10 000 € al 12 % durante un año, con intereses trimestrales. ¿Cuánto dinero al final?', '10000 € بفائدة 12٪ مدة سنة، مع إضافة الفوائد كل ربع سنة. كم يصبح المبلغ؟', '€10,000 at 12% for one year, with quarterly interest. How much money is there at the end?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiruhileko bakoitzean.', 'En cada trimestre.', 'في كل ربع سنة.', 'Each quarter.'), math: same('$\\frac{12}{4}=3$') },
            { text: say('Lau aldi.', 'Cuatro periodos.', 'أربع فترات.', 'Four periods.'), math: same('$1{,}03^{4}=1{,}12550881$') },
            { text: say('Amaierako kapitala.', 'Capital final.', 'رأس المال النهائي.', 'Final amount.'), math: same('$10\\,000\\cdot 1{,}03^{4}\\approx 11\\,255{,}09$') }
        ],
        example: same('$24\\,000\\cdot 1{,}004^{60}\\approx 30\\,495{,}38$'),
        takeaway: say('Tasa zati $K$; urteak bider $K$.', 'El tipo entre $K$; los años por $K$.', 'السعر على $K$؛ والسنوات في $K$.', 'Divide the rate by $K$; multiply the years by $K$.'),
        figure: (language) => <PeriodsFigure language={language} />
    },

    /* ---------- 5. Other arithmetic problems ---------- */
    {
        id: 'mixtures',
        stage: 'problems',
        title: say('Nahasketak eta aleazioak', 'Mezclas y aleaciones', 'الخلائط والسبائك', 'Mixtures and alloys'),
        goal: say('Nahasketa baten prezio ertaina eta aleazio baten legea kalkulatzea.', 'Calcular el precio medio de una mezcla y la ley de una aleación.', 'حساب السعر المتوسط لخليط وعيار سبيكة.', 'Calculate the mean price of a mixture and the purity of an alloy.'),
        problem: say('Upel batean 100 l ardo daude, 3,60 €/l. 20 l ur gehitzen zaizkio. Zein da litroaren prezio berria?', 'Un barril tiene 100 l de vino a 3,60 €/l. Se le añaden 20 l de agua. ¿Cuál es el nuevo precio del litro?', 'في برميل 100 ل من النبيذ بـ3.60 €/ل. أُضيف إليه 20 ل من الماء. ما السعر الجديد للتر؟', 'A barrel has 100 l of wine at €3.60/l. Then 20 l of water are added. What is the new price per litre?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kostua ez da aldatzen.', 'El coste no cambia.', 'الكلفة لا تتغير.', 'The cost does not change.'), math: same('$100\\cdot 3{,}60=360$') },
            { text: say('Kantitate berria.', 'La nueva cantidad.', 'الكمية الجديدة.', 'The new quantity.'), math: same('$100+20=120$') },
            { text: say('Prezio ertaina: 3 €/l.', 'Precio medio: 3 €/l.', 'السعر المتوسط: 3 €/ل.', 'Mean price: €3/l.'), math: same('$360\\mathbin{:}120=3$') }
        ],
        example: same('$\\frac{12\\cdot 12{,}40+8\\cdot 7{,}40}{20}=10{,}4$'),
        takeaway: say('Prezio ertaina = kostu osoa : kantitate osoa.', 'Precio medio = coste total : cantidad total.', 'السعر المتوسط = الكلفة الكلية : الكمية الكلية.', 'Mean price = total cost : total quantity.'),
        figure: (language) => <MixtureFigure language={language} />
    },
    {
        id: 'motion',
        stage: 'problems',
        title: say('Mugikariak: topaketa eta jazarpena', 'Móviles: encuentro y persecución', 'المتحركات: التلاقي والمطاردة', 'Moving objects: meeting and catching up'),
        goal: say('Bi mugikari noiz elkartzen diren kalkulatzea, elkarrengana doazenean edo bata bestearen atzetik.', 'Calcular cuándo se encuentran dos móviles, cuando van uno hacia el otro o uno detrás del otro.', 'حساب متى يلتقي متحركان، عندما يتجه أحدهما نحو الآخر أو يلحقه.', 'Calculate when two moving objects meet, when they move towards each other or one behind the other.'),
        problem: say('Txirrindulari profesional bat 38 km/h-ra doa, eta 22 km aurrerago zikloturista bat 14 km/h-ra, norabide berean. Zenbat minutu behar ditu harrapatzeko?', 'Un ciclista profesional va a 38 km/h y, 22 km por delante, un cicloturista a 14 km/h en el mismo sentido. ¿Cuántos minutos tarda en alcanzarlo?', 'يسير درّاج محترف بسرعة 38 كم/س، وأمامه بـ22 كم درّاج هاوٍ بسرعة 14 كم/س في الاتجاه نفسه. كم دقيقة يحتاج ليلحق به؟', 'A professional cyclist rides at 38 km/h, and 22 km ahead of him, a cycle tourist rides at 14 km/h in the same direction. How many minutes does the professional take to catch up with the tourist?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Norabide berean: kendu.', 'Mismo sentido: resta.', 'الاتجاه نفسه: اطرح.', 'Same direction: subtract.'), math: same('$38-14=24$') },
            { text: say('Denbora orduetan.', 'Tiempo en horas.', 'الزمن بالساعات.', 'Time in hours.'), math: same('$22\\mathbin{:}24=\\frac{11}{12}$') },
            { text: say('Minututan: 55 min.', 'En minutos: 55 min.', 'بالدقائق: 55 د.', 'In minutes: 55 min.'), math: same('$\\frac{11}{12}\\cdot 60=55$') }
        ],
        example: same('$240\\mathbin{:}(70+110)=\\frac{4}{3}$'),
        takeaway: say('Elkarrengana: batu. Atzetik: kendu. Denbora = distantzia : abiadura.', 'Al encuentro: suma. Persecución: resta. Tiempo = distancia : velocidad.', 'التلاقي: اجمع. المطاردة: اطرح. الزمن = المسافة : السرعة.', 'Meeting: add. Catching up: subtract. Time = distance : speed.'),
        figure: (language) => <MotionFigure language={language} />
    },
    {
        id: 'taps',
        stage: 'problems',
        title: say('Txorrotak eta elkarrekin egindako lanak', 'Grifos y trabajos en común', 'الصنابير والأعمال المشتركة', 'Taps and joint work'),
        goal: say('Bi txorrotak (edo bi langilek) elkarrekin zenbat denbora behar duten kalkulatzea, ordu bateko zatiak batuz.', 'Calcular cuánto tardan juntos dos grifos (o dos trabajadores) sumando las partes que hacen en una hora.', 'حساب الزمن الذي يحتاجه صنبوران (أو عاملان) معًا بجمع ما ينجزه كل منهما في ساعة.', 'Calculate how long two taps (or two workers) take together by adding up the parts they do in one hour.'),
        problem: say('Ur hotzaren txorrotak bainuontzia 8 minututan betetzen du eta beroarenak 12 minututan. Zenbat minutu biak batera?', 'El grifo de agua fría llena la bañera en 8 minutos y el de caliente en 12. ¿Cuántos minutos tardan los dos juntos?', 'يملأ صنبور الماء البارد الحوض في 8 دقائق والساخن في 12. كم دقيقة يحتاجان معًا؟', 'The cold tap fills the bath in 8 minutes and the hot tap in 12. How many minutes do they take together?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Minutu batean.', 'En un minuto.', 'في دقيقة.', 'In one minute.'), math: same('$\\frac{1}{8}+\\frac{1}{12}=\\frac{5}{24}$') },
            { text: say('Osoa: alderantzizkoa.', 'El total: el inverso.', 'الكل: المقلوب.', 'Total time: the reciprocal.'), math: same('$\\frac{24}{5}=4{,}8$') },
            { text: say('4 min 48 s.', '4 min 48 s.', '4 د 48 ث.', '4 min 48 s.'), math: same('$0{,}8\\cdot 60=48$') }
        ],
        example: same('$\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$'),
        takeaway: say('Batu ordu bateko zatiak; denbora = batura horren alderantzizkoa.', 'Suma las partes de una hora; el tiempo es el inverso de esa suma.', 'اجمع أجزاء الساعة؛ والزمن هو مقلوب المجموع.', 'Add up the parts done in one hour; the time is the reciprocal of that sum.'),
        figure: (language) => <TapsFigure language={language} />
    }
]

export const proportionDbh4ApTopics: UnitTopic[] = lessons.map((lesson) => ({ ...lesson, ...proportionDbh4ApLessonTexts[lesson.id] }))

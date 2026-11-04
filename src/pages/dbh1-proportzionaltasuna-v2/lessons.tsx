import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    ChooseMethodFigure,
    DirectTableFigure,
    DiscountFigure,
    IncreaseFigure,
    InverseRuleFigure,
    InverseTableFigure,
    InverseUnitFigure,
    MagnitudesFigure,
    PercentGridFigure,
    PercentOfFigure,
    ProportionFigure,
    RatioFigure,
    RuleOfThreeFigure,
    UnitReductionFigure,
    WhichPercentFigure
} from './figures'
import { proportionLessonChecks, type ProportionTopicId } from './lessonChecks'
import { proportionLessonTexts } from './lessonTexts'

/* ==========================================================================
   Proportzionaltasuna · 1. DBH — stages and lessons. Sequence follows the
   class textbook (Santillana 1.º ESO, unit 8, curricular adaptation):
   magnitudes, ratios and proportions, direct proportionality (the canteen
   croquettes, the cows' fodder, the felt-tip pens), inverse
   proportionality (the tap and the barrel, the bricklayers) and
   percentages (Enrique's trainers). Anaya (unit 9) adds the reduction to
   the unit, the rule of three and the percentage problems.
   ========================================================================== */

export type ProportionStageId = 'ratios' | 'direct' | 'inverse' | 'percent' | 'changes'

export const proportionStages: UnitStage[] = [
    { id: 'ratios', tone: 'blue', title: { eu: 'Magnitudeak eta arrazoiak', es: 'Magnitudes y razones', en: 'Quantities and ratios', ar: 'المقادير والنسب' } },
    { id: 'direct', tone: 'violet', title: { eu: 'Proportzionaltasun zuzena', es: 'Proporcionalidad directa', en: 'Direct proportion', ar: 'التناسب الطردي' } },
    { id: 'inverse', tone: 'mustard', title: { eu: 'Alderantzizko proportzionaltasuna', es: 'Proporcionalidad inversa', en: 'Inverse proportion', ar: 'التناسب العكسي' } },
    { id: 'percent', tone: 'coral', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' } },
    { id: 'changes', tone: 'green', title: { eu: 'Igoerak, beherapenak eta problemak', es: 'Aumentos, descuentos y problemas', en: 'Increases, discounts and problems', ar: 'الزيادات والتخفيضات والمسائل' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Magnitudes and ratios ---------- */
    {
        id: 'magnitude',
        stage: 'ratios',
        title: say('Magnitudeak eta unitateak', 'Magnitudes y unidades', 'المقادير والوحدات', 'Quantities and units'),
        goal: say('Magnitude bat zer den jakitea eta neurtu daitezkeenak bereiztea.', 'Saber qué es una magnitud y distinguir lo que se puede medir.', 'معرفة ما هو المقدار وتمييز ما يمكن قياسه.', 'Understand what a quantity is and tell apart what can be measured.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Magnitudea', 'Magnitud', 'المقدار', 'Quantity'), text: say('Neur daitekeena: luzera, masa, denbora, prezioa…', 'Lo que se puede medir: longitud, masa, tiempo, precio…', 'ما يمكن قياسه: الطول والكتلة والزمن والسعر…', 'What can be measured: length, mass, time, price…') },
            { title: say('Unitatea', 'Unidad', 'الوحدة', 'Unit'), text: say('Neurtzeko erabiltzen dena: m, kg, l, €, min…', 'Con lo que se mide: m, kg, l, €, min…', 'ما نقيس به: م، كغ، ل، €، د…', 'What it is measured in: m, kg, l, €, min…') },
            { title: say('Kantitatea', 'Cantidad', 'الكمية', 'Quantity'), text: say('Zenbakia eta unitatea: 2 kg, 5 l, 75 km.', 'Número y unidad: 2 kg, 5 l, 75 km.', 'عدد ووحدة: 2 كغ، 5 ل، 75 كم.', 'Number and unit: 2 kg, 5 l, 75 km.') }
        ],
        takeaway: say('Magnitudea: neur daitekeena. Kantitatea: zenbakia + unitatea.', 'Magnitud: lo que se puede medir. Cantidad: número + unidad.', 'المقدار: ما يمكن قياسه. الكمية: عدد + وحدة.', 'Quantity: what can be measured. Amount: number + unit.'),
        figure: (language) => <MagnitudesFigure language={language} />
    },
    {
        id: 'ratio',
        stage: 'ratios',
        title: say('Arrazoia', 'La razón', 'النسبة', 'The ratio'),
        goal: say('Bi kantitateren arteko arrazoia idaztea eta haren balioa kalkulatzea.', 'Escribir la razón entre dos cantidades y calcular su valor.', 'كتابة النسبة بين كميتين وحساب قيمتها.', 'Write the ratio between two amounts and work out its value.'),
        needs: [{ unit: 'dbh1/zatikiak', topic: 'division', title: { eu: 'Zatikia zatiketa gisa', es: 'La fracción como división', en: 'A fraction as a division', ar: 'الكسر قسمةً' } }],
        problem: say('Zein da 6 kg pentsuren eta 10 behiren arteko arrazoia?', '¿Cuál es la razón entre 6 kg de pienso y 10 vacas?', 'ما النسبة بين 6 كغ من العلف و10 أبقار؟', 'What is the ratio of 6 kg of feed to 10 cows?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aurrekaria goian, ondorengoa behean.', 'El antecedente arriba, el consecuente abajo.', 'المقدَّم في الأعلى والتالي في الأسفل.', 'The antecedent on top, the consequent at the bottom.'), math: same('$\\frac{6}{10}$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: same('$6\\mathbin{:}10=0{,}6$') }
        ],
        takeaway: say('Arrazoia: $\\frac{a}{b}$, zatidura bat.', 'Razón: $\\frac{a}{b}$, un cociente.', 'النسبة: $\\frac{a}{b}$، حاصل قسمة.', 'Ratio: $\\frac{a}{b}$, a quotient.'),
        figure: (language) => <RatioFigure language={language} />
    },
    {
        id: 'proportion',
        stage: 'ratios',
        title: say('Proportzioak', 'Proporciones', 'التناسبات', 'Proportions'),
        goal: say('Proportzio bat ezagutzea eta falta den gaia gurutzeko biderkaduren bidez aurkitzea.', 'Reconocer una proporción y hallar el término que falta con los productos cruzados.', 'التعرّف إلى التناسب وإيجاد الحد الناقص بالضرب التبادلي.', 'Recognise a proportion and find the missing term using cross products.'),
        needs: [{ unit: 'dbh1/zatikiak', topic: 'equivalent', title: { eu: 'Zatiki baliokideak', es: 'Fracciones equivalentes', en: 'Equivalent fractions', ar: 'الكسور المتكافئة' } }],
        problem: say('Aurkitu $x$: $\\frac{5}{x}=\\frac{15}{9}$.', 'Halla $x$: $\\frac{5}{x}=\\frac{15}{9}$.', 'أوجد $x$: $\\frac{5}{x}=\\frac{15}{9}$.', 'Find $x$: $\\frac{5}{x}=\\frac{15}{9}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gurutzeko biderkadurak berdindu.', 'Iguala los productos cruzados.', 'ساوِ حاصلي الضرب التبادلي.', 'Set the cross products equal.'), math: same('$5\\cdot 9=15\\cdot x$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$45=15\\cdot x$') },
            { text: say('Zatitu $x$ bakarrik geratzeko.', 'Divide para dejar $x$ sola.', 'اقسم ليبقى $x$ وحده.', 'Divide to leave $x$ on its own.'), math: same('$x=45\\mathbin{:}15=3$') }
        ],
        takeaway: say('Proportzio batean: muturren biderkadura = erdikoen biderkadura.', 'En una proporción: producto de extremos = producto de medios.', 'في التناسب: حاصل ضرب الطرفين = حاصل ضرب الوسطين.', 'In a proportion: product of extremes = product of means.'),
        figure: (language) => <ProportionFigure language={language} />
    },

    /* ---------- 2. Direct proportionality ---------- */
    {
        id: 'direct',
        stage: 'direct',
        title: say('Zuzenki proportzionalak diren magnitudeak', 'Magnitudes directamente proporcionales', 'المقادير المتناسبة طرديًا', 'Directly proportional quantities'),
        goal: say('Bi magnitude zuzenki proportzionalak diren jakitea eta proportzionaltasun-konstantea aurkitzea.', 'Saber si dos magnitudes son directamente proporcionales y hallar la constante de proporcionalidad.', 'معرفة هل المقداران متناسبان طرديًا وإيجاد ثابت التناسب.', 'Know whether two quantities are directly proportional and find the constant of proportionality.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Bikoitza → bikoitza', 'Doble → doble', 'الضعف ← الضعف', 'Double → double'), text: say('Biak batera handitu edo txikitzen dira, proportzio berean.', 'Las dos crecen o decrecen a la vez, en la misma proporción.', 'يزيدان أو ينقصان معًا بالنسبة نفسها.', 'Both grow or shrink at the same time, in the same proportion.') },
            { title: say('Konstantea', 'La constante', 'الثابت', 'The constant'), text: say('Arrazoi guztiek balio bera dute.', 'Todas las razones valen lo mismo.', 'كل النسب تساوي القيمة نفسها.', 'All the ratios are the same.'), math: same('$\\frac{6}{10}=\\frac{12}{20}=0{,}6$') },
            { title: say('Ez dira proportzionalak', 'No son proporcionales', 'ليسا متناسبين', 'Not proportional'), text: say('Botila 1: $3{,}50$ €; 2 botila: 6 €. Arrazoiak ez dira berdinak.', '1 botella: $3{,}50$ €; 2 botellas: 6 €. Las razones no son iguales.', 'زجاجة واحدة: $3{,}50$ €؛ زجاجتان: 6 €. النسبتان غير متساويتين.', '1 bottle: €$3{,}50$; 2 bottles: €6. The ratios are not equal.') }
        ],
        takeaway: say('Zuzena: bikoitza → bikoitza, eta arrazoia beti bera.', 'Directa: doble → doble, y la razón siempre igual.', 'طردي: الضعف ← الضعف، والنسبة ثابتة دائمًا.', 'Direct: double → double, and the ratio is always the same.'),
        figure: (language) => <DirectTableFigure language={language} />
    },
    {
        id: 'direct-unit',
        stage: 'direct',
        title: say('Unitatera laburtzea', 'Reducción a la unidad', 'الإرجاع إلى الوحدة', 'Unitary method'),
        goal: say('Proportzionaltasun zuzeneko problemak unitate baten balioa kalkulatuz ebaztea.', 'Resolver problemas de proporcionalidad directa calculando el valor de una unidad.', 'حلّ مسائل التناسب الطردي بحساب قيمة الوحدة.', 'Solve direct proportion problems by working out the value of one unit.'),
        problem: say('Bi kilo laranjak $1{,}50$ € balio dute. Zenbat balio dute 5 kilok?', 'Dos kilos de naranjas cuestan $1{,}50$ €. ¿Cuánto cuestan 5 kilos?', 'ثمن كيلوغرامين من البرتقال $1{,}50$ €. كم ثمن 5 كيلوغرامات؟', 'Two kilos of oranges cost €$1{,}50$. How much do 5 kilos cost?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kilo batek:', 'Un kilo:', 'الكيلو الواحد:', 'One kilo:'), math: same('$1{,}50\\mathbin{:}2=0{,}75$') },
            { text: say('Bost kilok:', 'Cinco kilos:', 'خمسة كيلوغرامات:', 'Five kilos:'), math: same('$0{,}75\\cdot 5=3{,}75$') }
        ],
        takeaway: say('Lehenik bat (zatitu), gero nahi direnak (biderkatu).', 'Primero uno (divide), luego los que quieras (multiplica).', 'أولًا الواحد (اقسم)، ثم ما تريد (اضرب).', 'First one (divide), then as many as you want (multiply).'),
        figure: (language) => <UnitReductionFigure language={language} />
    },
    {
        id: 'rule-of-three',
        stage: 'direct',
        title: say('Hiruko erregela zuzena', 'La regla de tres directa', 'قاعدة الثلاثة الطردية', 'The direct rule of three'),
        goal: say('Proportzionaltasun zuzeneko problemak proportzio baten bidez ebaztea.', 'Resolver problemas de proporcionalidad directa con una proporción.', 'حلّ مسائل التناسب الطردي بتناسب.', 'Solve direct proportion problems using a proportion.'),
        problem: say('Txirrindulari batek 75 km egiten ditu 2 ordutan. Abiadura berean, zenbat km 5 ordutan?', 'Un ciclista recorre 75 km en 2 horas. A la misma velocidad, ¿cuántos km en 5 horas?', 'يقطع دراج 75 كم في ساعتين. بالسرعة نفسها، كم كيلومترًا في 5 ساعات؟', 'A cyclist travels 75 km in 2 hours. At the same speed, how many km in 5 hours?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioa: ordu gehiago, km gehiago.', 'La proporción: más horas, más km.', 'التناسب: ساعات أكثر، كيلومترات أكثر.', 'The proportion: more hours, more km.'), math: same('$\\frac{2}{75}=\\frac{5}{x}$') },
            { text: say('Gurutzeko biderkadurak.', 'Productos cruzados.', 'الضرب التبادلي.', 'Cross products.'), math: same('$2\\cdot x=5\\cdot 75=375$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: same('$x=375\\mathbin{:}2=187{,}5$') }
        ],
        takeaway: say('Zuzena: $\\frac{a}{b}=\\frac{c}{x}$, eta $x=\\frac{b\\cdot c}{a}$.', 'Directa: $\\frac{a}{b}=\\frac{c}{x}$, y $x=\\frac{b\\cdot c}{a}$.', 'الطردي: $\\frac{a}{b}=\\frac{c}{x}$، و$x=\\frac{b\\cdot c}{a}$.', 'Direct: $\\frac{a}{b}=\\frac{c}{x}$, and $x=\\frac{b\\cdot c}{a}$.'),
        figure: (language) => <RuleOfThreeFigure language={language} />
    },

    /* ---------- 3. Inverse proportionality ---------- */
    {
        id: 'inverse',
        stage: 'inverse',
        title: say('Alderantziz proportzionalak diren magnitudeak', 'Magnitudes inversamente proporcionales', 'المقادير المتناسبة عكسيًا', 'Inversely proportional quantities'),
        goal: say('Bi magnitude alderantziz proportzionalak diren jakitea: biderkadura konstantea.', 'Saber si dos magnitudes son inversamente proporcionales: el producto constante.', 'معرفة هل المقداران متناسبان عكسيًا: حاصل الضرب الثابت.', 'Know whether two quantities are inversely proportional: the constant product.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Bikoitza → erdia', 'Doble → mitad', 'الضعف ← النصف', 'Double → half'), text: say('Bat handitzean bestea txikitzen da, proportzio berean.', 'Al crecer una, la otra decrece en la misma proporción.', 'حين يزيد أحدهما ينقص الآخر بالنسبة نفسها.', 'As one grows, the other decreases in the same proportion.') },
            { title: say('Biderkadura konstantea', 'Producto constante', 'حاصل ضرب ثابت', 'Constant product'), text: say('Bi balio korrespondenteren biderkadura ez da aldatzen.', 'El producto de dos valores correspondientes no cambia.', 'لا يتغيّر حاصل ضرب القيمتين المتقابلتين.', 'The product of two corresponding values does not change.'), math: same('$3\\cdot 15=9\\cdot 5=45$') },
            { title: say('Adibideak', 'Ejemplos', 'أمثلة', 'Examples'), text: say('Langileak eta denbora; abiadura eta denbora; txorrotak eta betetzeko denbora.', 'Obreros y tiempo; velocidad y tiempo; grifos y tiempo de llenado.', 'العمال والزمن؛ السرعة والزمن؛ الصنابير وزمن الملء.', 'Workers and time; speed and time; taps and filling time.') }
        ],
        takeaway: say('Alderantzizkoa: bikoitza → erdia, eta biderkadura beti bera.', 'Inversa: doble → mitad, y el producto siempre igual.', 'العكسي: الضعف ← النصف، وحاصل الضرب ثابت دائمًا.', 'Inverse: double → half, and the product is always the same.'),
        figure: (language) => <InverseTableFigure language={language} />
    },
    {
        id: 'inverse-unit',
        stage: 'inverse',
        title: say('Unitatera laburtzea alderantzizkoan', 'Reducción a la unidad en la inversa', 'الإرجاع إلى الوحدة في التناسب العكسي', 'Unitary method in inverse proportion'),
        goal: say('Alderantzizko problemak unitatera laburtuz ebaztea: lehenik biderkatu, gero zatitu.', 'Resolver problemas inversos reduciendo a la unidad: primero multiplica, luego divide.', 'حلّ المسائل العكسية بالإرجاع إلى الوحدة: اضرب أولًا ثم اقسم.', 'Solve inverse problems with the unitary method: first multiply, then divide.'),
        problem: say('Belar-zama batek 3 zaldi elikatzen ditu 6 egunez. Zenbat egunez elikatuko lituzke 2 zaldi?', 'Una carga de heno alimenta a 3 caballos durante 6 días. ¿Cuántos días alimentaría a 2 caballos?', 'حمولة تبن تطعم 3 خيول 6 أيام. كم يومًا تطعم حصانين؟', 'A load of hay feeds 3 horses for 6 days. How many days would it feed 2 horses?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zaldi bakarrari:', 'A un solo caballo:', 'لحصان واحد:', 'For one horse:'), math: same('$6\\cdot 3=18$') },
            { text: say('Bi zaldiri:', 'A dos caballos:', 'لحصانين:', 'For two horses:'), math: same('$18\\mathbin{:}2=9$') }
        ],
        takeaway: say('Alderantzizkoan: bat bakarra lortzeko biderkatu, gero zatitu.', 'En la inversa: multiplica para obtener uno solo, después divide.', 'في العكسي: اضرب لتحصل على الواحد ثم اقسم.', 'In the inverse case: multiply to find the value for one, then divide.'),
        figure: (language) => <InverseUnitFigure language={language} />
    },
    {
        id: 'inverse-rule',
        stage: 'inverse',
        title: say('Hiruko erregela alderantzizkoa', 'La regla de tres inversa', 'قاعدة الثلاثة العكسية', 'The inverse rule of three'),
        goal: say('Alderantzizko problemak biderkadurak berdinduz ebaztea.', 'Resolver problemas inversos igualando los productos.', 'حلّ المسائل العكسية بمساواة حاصلي الضرب.', 'Solve inverse problems by setting the products equal.'),
        problem: say('Ibiltari batek 30 minutu behar ditu ibilbide bat egiteko 4 km/h-ko abiaduran. Zenbat minutu beharko ditu txirrindulari batek 15 km/h-ra?', 'Un paseante tarda 30 minutos en un recorrido a 4 km/h. ¿Cuántos minutos tardará un ciclista a 15 km/h?', 'يقطع ماشٍ مسارًا في 30 دقيقة بسرعة 4 كم/س. كم دقيقة يحتاج دراج بسرعة 15 كم/س؟', 'A walker takes 30 minutes to cover a route at 4 km/h. How many minutes will a cyclist take at 15 km/h?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Abiadura gehiago, denbora gutxiago: alderantzizkoa.', 'Más velocidad, menos tiempo: inversa.', 'سرعة أكبر، زمن أقل: عكسي.', 'More speed, less time: inverse.'), math: same('$4\\cdot 30=15\\cdot x$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$120=15\\cdot x$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: same('$x=120\\mathbin{:}15=8$') }
        ],
        takeaway: say('Alderantzizkoa: $a\\cdot b=c\\cdot x$, eta $x=\\frac{a\\cdot b}{c}$.', 'Inversa: $a\\cdot b=c\\cdot x$, y $x=\\frac{a\\cdot b}{c}$.', 'العكسي: $a\\cdot b=c\\cdot x$، و$x=\\frac{a\\cdot b}{c}$.', 'Inverse: $a\\cdot b=c\\cdot x$, and $x=\\frac{a\\cdot b}{c}$.'),
        figure: (language) => <InverseRuleFigure language={language} />
    },

    /* ---------- 4. Percentages ---------- */
    {
        id: 'percent-meaning',
        stage: 'percent',
        title: say('Ehunekoaren esanahia', 'Qué es un porcentaje', 'معنى النسبة المئوية', 'What is a percentage?'),
        goal: say('Ehuneko bat zatiki, hamartar eta «100 bakoitzeko» gisa idaztea.', 'Escribir un porcentaje como fracción, como decimal y como «de cada 100».', 'كتابة النسبة المئوية كسرًا وعددًا عشريًا و«من كل 100».', 'Write a percentage as a fraction, as a decimal and as “out of every 100”.'),
        needs: [{ unit: 'dbh1/numeros-decimales', topic: 'decimal-fraction', title: { eu: 'Zatiki hamartarrak', es: 'Fracciones decimales', en: 'Decimal fractions', ar: 'الكسور العشرية' } }],
        stepsKind: 'facts',
        steps: [
            { title: say('Zatikia', 'Fracción', 'كسر', 'Fraction'), text: say('Izendatzailea 100.', 'Denominador 100.', 'المقام 100.', 'Denominator 100'), math: same('$\\frac{38}{100}$') },
            { title: say('Hamartarra', 'Decimal', 'عدد عشري', 'Decimal'), text: say('Zati 100: koma bi toki ezkerrera.', 'Entre 100: la coma dos lugares a la izquierda.', 'القسمة على 100: الفاصلة منزلتين يسارًا.', 'Divide by 100: move the decimal point two places to the left.'), math: same('$0{,}38$') },
            { title: say('Ezagunak', 'Los conocidos', 'المعروفة', 'The common ones'), text: say('% 50 erdia, % 25 laurdena, % 75 hiru laurden, % 10 hamarrena.', '50 % la mitad, 25 % la cuarta parte, 75 % tres cuartos, 10 % la décima parte.', '50٪ النصف، 25٪ الربع، 75٪ ثلاثة أرباع، 10٪ العُشر.', '50% is half, 25% is a quarter, 75% is three quarters, 10% is a tenth.'), math: same('$\\frac{1}{2}\\qquad\\frac{1}{4}\\qquad\\frac{3}{4}\\qquad\\frac{1}{10}$') }
        ],
        takeaway: say('Ehunekoa: 100 bakoitzeko zenbat. Zatiki gisa, izendatzailea 100.', 'Porcentaje: cuántos de cada 100. Como fracción, denominador 100.', 'النسبة المئوية: كم من كل 100. وكسرًا، المقام 100.', 'Percentage: how many out of every 100. As a fraction, denominator 100.'),
        figure: (language) => <PercentGridFigure language={language} />
    },
    {
        id: 'percent-of',
        stage: 'percent',
        title: say('Kantitate baten ehunekoa', 'El porcentaje de una cantidad', 'النسبة المئوية من كمية', 'Percentage of an amount'),
        goal: say('Kantitate baten ehuneko bat kalkulatzea.', 'Calcular un porcentaje de una cantidad.', 'حساب نسبة مئوية من كمية.', 'Work out a percentage of an amount.'),
        needs: [{ unit: 'dbh1/zatikiak', topic: 'fraction-of', title: { eu: 'Kopuru baten zatikia', es: 'Fracción de una cantidad', en: 'Fraction of a quantity', ar: 'كسر من كمية' } }],
        problem: say('Nire klasean 30 ikasle daude eta % 40 jantokian geratzen dira. Zenbat dira?', 'En mi clase hay 30 alumnos y el 40 % se queda al comedor. ¿Cuántos son?', 'في صفي 30 تلميذًا، يبقى 40٪ منهم في المطعم. كم عددهم؟', 'In my class there are 30 students and 40% stay for lunch. How many students stay for lunch?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu ehunekoaz.', 'Multiplica por el tanto.', 'اضرب في النسبة.', 'Multiply by the rate.'), math: same('$30\\cdot 40=1200$') },
            { text: say('Zatitu 100 zenbakiaz.', 'Divide entre 100.', 'اقسم على 100.', 'Divide by 100.'), math: same('$1200\\mathbin{:}100=12$') }
        ],
        takeaway: say('Kantitate baten % $p$: kantitatea · $p$ : 100.', 'El $p$ % de una cantidad: cantidad · $p$ : 100.', '$p$٪ من كمية: الكمية · $p$ : 100.', 'The $p$% of an amount: amount · $p$ : 100.'),
        figure: (language) => <PercentOfFigure language={language} />
    },
    {
        id: 'which-percent',
        stage: 'percent',
        title: say('Zer ehuneko da? Eta osoa?', '¿Qué porcentaje es? ¿Y el total?', 'ما النسبة؟ وما الكل؟', 'What percentage is it? And the total?'),
        goal: say('Zati batek osoaren zer ehuneko den eta ehuneko batetik osoa kalkulatzea.', 'Calcular qué porcentaje es una parte y el total a partir de un porcentaje.', 'حساب النسبة المئوية لجزء، والكل انطلاقًا من نسبة مئوية.', 'Work out what percentage a part is, and the total from a percentage.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Zer ehuneko', 'Qué porcentaje', 'أي نسبة', 'What percentage'), text: say('Zatia : osoa, bider 100.', 'Parte : total, por 100.', 'الجزء : الكل، في 100.', 'Part : total, times 100.'), math: same('$120\\mathbin{:}480\\cdot 100=25$') },
            { title: say('Osoa', 'El total', 'الكل', 'The total'), text: say('Zatia : ehunekoa, bider 100.', 'Parte : porcentaje, por 100.', 'الجزء : النسبة، في 100.', 'Part : percentage, times 100.'), math: same('$54\\mathbin{:}30\\cdot 100=180$') }
        ],
        takeaway: say('Ehunekoa = zatia : osoa · 100. Osoa = zatia : ehunekoa · 100.', 'Porcentaje = parte : total · 100. Total = parte : porcentaje · 100.', 'النسبة = الجزء : الكل · 100. الكل = الجزء : النسبة · 100.', 'Percentage = part : total · 100. Total = part : percentage · 100.'),
        figure: (language) => <WhichPercentFigure language={language} />
    },

    /* ---------- 5. Increases, discounts and problems ---------- */
    {
        id: 'discount',
        stage: 'changes',
        title: say('Beherapenak', 'Descuentos', 'التخفيضات', 'Discounts'),
        goal: say('Ehuneko beherapen baten ondorengo prezioa kalkulatzea.', 'Calcular el precio después de un descuento porcentual.', 'حساب السعر بعد تخفيض بنسبة مئوية.', 'Work out the price after a percentage discount.'),
        needs: [{ unit: 'dbh1/numeros-decimales', topic: 'multiply', title: { eu: 'Hamartarrak biderkatu', es: 'Multiplicar decimales', en: 'Multiplying decimals', ar: 'ضرب الأعداد العشرية' } }],
        problem: say('Beroki batek 80 € balio du eta % 10 merkatu dute. Zenbat ordainduko dut?', 'Un abrigo cuesta 80 € y lo rebajan un 10 %. ¿Cuánto pagaré?', 'ثمن معطف 80 € وخُفّض 10٪. كم سأدفع؟', 'A coat costs €80 and is reduced by 10%. How much will I pay?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Beherapena:', 'El descuento:', 'الخصم:', 'The discount:'), math: same('$80\\cdot 10\\mathbin{:}100=8$') },
            { text: say('Prezio berria:', 'El precio nuevo:', 'السعر الجديد:', 'The new price:'), math: same('$80-8=72$') }
        ],
        takeaway: say('Beherapena: prezioa − prezioaren % $p$; edo prezioa · $(100-p)$ : 100.', 'Descuento: precio − el $p$ % del precio; o precio · $(100-p)$ : 100.', 'التخفيض: السعر − $p$٪ من السعر؛ أو السعر · $(100-p)$ : 100.', 'Discount: price − $p$% of the price; or price · $(100-p)$ : 100.'),
        figure: (language) => <DiscountFigure language={language} />
    },
    {
        id: 'increase',
        stage: 'changes',
        title: say('Igoerak eta errekarguak', 'Aumentos y recargos', 'الزيادات والرسوم الإضافية', 'Increases and surcharges'),
        goal: say('Ehuneko igoera baten ondorengo kantitatea kalkulatzea.', 'Calcular la cantidad después de un aumento porcentual.', 'حساب الكمية بعد زيادة بنسبة مئوية.', 'Work out the amount after a percentage increase.'),
        problem: say('Bizikleta batek 200 € balio zuen eta % 5 garestitu da. Zenbat balio du orain?', 'Una bici costaba 200 € y ha subido un 5 %. ¿Cuánto cuesta ahora?', 'كان ثمن دراجة 200 € وارتفع 5٪. كم ثمنها الآن؟', 'A bike cost €200 and its price has gone up by 5%. How much does it cost now?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Igoera:', 'La subida:', 'الزيادة:', 'The increase:'), math: same('$200\\cdot 5\\mathbin{:}100=10$') },
            { text: say('Prezio berria:', 'El precio nuevo:', 'السعر الجديد:', 'The new price:'), math: same('$200+10=210$') }
        ],
        takeaway: say('Igoera: kantitatea + kantitatearen % $p$; edo kantitatea · $(100+p)$ : 100.', 'Aumento: cantidad + el $p$ % de la cantidad; o cantidad · $(100+p)$ : 100.', 'الزيادة: الكمية + $p$٪ منها؛ أو الكمية · $(100+p)$ : 100.', 'Increase: amount + $p$% of the amount; or amount · $(100+p)$ : 100.'),
        figure: (language) => <IncreaseFigure language={language} />
    },
    {
        id: 'problems',
        stage: 'changes',
        title: say('Zein metodo? Problemak', '¿Qué método? Problemas', 'أي طريقة؟ مسائل', 'Which method? Problems'),
        goal: say('Problema batean proportzionaltasun zuzena, alderantzizkoa edo ehunekoak diren ezagutzea eta ebaztea.', 'Reconocer si un problema es de proporcionalidad directa, inversa o de porcentajes, y resolverlo.', 'تمييز ما إذا كانت المسألة تناسبًا طرديًا أو عكسيًا أو نسبًا مئوية، وحلّها.', 'Recognise whether a problem is about direct proportion, inverse proportion or percentages, and solve it.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Gehiago → gehiago', 'Más → más', 'أكثر ← أكثر', 'More → more'), text: say('Zuzena: errotulagailuak eta prezioa, orduak eta km.', 'Directa: rotuladores y precio, horas y km.', 'طردي: الأقلام والسعر، الساعات والكيلومترات.', 'Direct: felt-tip pens and price, hours and km.') },
            { title: say('Gehiago → gutxiago', 'Más → menos', 'أكثر ← أقل', 'More → less'), text: say('Alderantzizkoa: langileak eta egunak, abiadura eta denbora.', 'Inversa: obreros y días, velocidad y tiempo.', 'عكسي: العمال والأيام، السرعة والزمن.', 'Inverse: workers and days, speed and time.') },
            { title: say('Ez proportzionala', 'No proporcional', 'غير متناسب', 'Not proportional'), text: say('Adina eta altuera; sarreraren prezioa eta filmaren iraupena.', 'Edad y altura; precio de la entrada y duración de la película.', 'العمر والطول؛ سعر التذكرة ومدة الفيلم.', 'Age and height; price of the ticket and length of the film.') }
        ],
        takeaway: say('Lehenik erabaki: zuzena, alderantzizkoa, ehunekoa ala ez proportzionala.', 'Primero decide: directa, inversa, porcentaje o no proporcional.', 'قرّر أولًا: طردي أم عكسي أم نسبة مئوية أم غير متناسب.', 'First decide: direct, inverse, percentage or not proportional.'),
        figure: (language) => <ChooseMethodFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const proportionTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...proportionLessonTexts[topic.id as ProportionTopicId], ...proportionLessonChecks[topic.id as ProportionTopicId] }))

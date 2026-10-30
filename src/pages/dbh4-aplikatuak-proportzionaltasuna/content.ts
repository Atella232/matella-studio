import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Proportzionaltasuna · 4. DBH aplikatuak — diagnostic, guided practice,
   exercise bank and challenges. Exercises follow Santillana Aplicadas 4,
   unit 2 (the yogurt, the petrol, the shelves, the air we breathe, the car
   that loses value, compound interest with periods) and Anaya Aplicadas 4,
   unit 4 (the oil bottle, the cable, the cows, the bikes, the gardener, the
   cinema chain, the flat's electricity bill, the stadium, the plumber's
   VAT, the fruit chain, deposits, coffee and gold mixtures, the chases and
   the taps). Every closed answer is a single number; money that does not
   come out exact is rounded to the cent and the explanation says ≈.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const [whole, decimals = ''] = text.split(',')
    return fraction(Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

export const proportionDbh4ApDiagnostic: DiagnosticQuestion[] = [
    {
        id: 4201,
        prompt: say('Ibilbide berean, abiadura eta denbora…', 'En un mismo trayecto, la velocidad y el tiempo son…', 'في المسار نفسه، السرعة والزمن…', 'On the same journey, speed and time are…'),
        options: [say('zuzenki proportzionalak', 'directamente proporcionales', 'متناسبان طرديًا', 'directly proportional'), say('alderantziz proportzionalak', 'inversamente proporcionales', 'متناسبان عكسيًا', 'inversely proportional'), say('ez dira proportzionalak', 'no son proporcionales', 'غير متناسبين', 'not proportional')],
        correctIndex: 1,
        explanation: say('Abiadura bikoitza → denbora erdia: biderkadura (distantzia) konstantea.', 'Doble velocidad → mitad de tiempo: el producto (la distancia) es constante.', 'ضعف السرعة ← نصف الزمن: حاصل الضرب (المسافة) ثابت.', 'Double the speed → half the time: the product (the distance) is constant.'),
        topic: 'relations'
    },
    {
        id: 4202,
        prompt: say('$0{,}75$ l-ko olio-botila batek $3{,}60$ € balio du. Zenbat balio du litroak?', 'Una botella de $0{,}75$ l de aceite cuesta $3{,}60$ €. ¿A cómo sale el litro?', 'ثمن زجاجة زيت سعتها $0{,}75$ ل هو $3{,}60$ €. كم ثمن اللتر؟', 'A bottle of $0{,}75$ l of oil costs €$3{,}60$. What does one litre cost?'),
        options: [same('$2{,}70$ €'), same('$4{,}50$ €'), same('$4{,}80$ €')],
        correctIndex: 2,
        explanation: same('$3{,}60\\mathbin{:}0{,}75=4{,}8$'),
        topic: 'direct-rule'
    },
    {
        id: 4203,
        prompt: say('3 margolarik, egunean 8 ordu, horma bat 10 egunetan margotzen dute. Zenbat egun 5 margolarik, egunean 6 ordu?', 'Tres pintores, 8 horas al día, pintan un muro en 10 días. ¿Cuántos días tardan 5 pintores, 6 horas al día?', 'ثلاثة دهّانين يعملون 8 ساعات يوميًا يدهنون جدارًا في 10 أيام. كم يومًا يحتاج 5 دهّانين يعملون 6 ساعات يوميًا؟', 'Three painters, working 8 hours a day, paint a wall in 10 days. How many days do 5 painters take, working 6 hours a day?'),
        options: [same('$8$'), same('$12{,}5$'), same('$10$')],
        correctIndex: 0,
        explanation: say('Biak alderantzizkoak: $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$.', 'Las dos inversas: $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$.', 'كلاهما عكسي: $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$.', 'Both are inverse: $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$.'),
        topic: 'compound'
    },
    {
        id: 4204,
        prompt: say('Banatu 660 alderantziz proportzionalki 1, 2 eta 3rekiko. Zenbat dagokio 1i?', 'Reparte 660 de forma inversamente proporcional a 1, 2 y 3. ¿Cuánto le toca al 1?', 'وزّع 660 عكسيًا على 1 و2 و3. كم نصيب 1؟', 'Share 660 in inverse proportion to 1, 2 and 3. How much is the share for 1?'),
        options: [same('$110$'), same('$360$'), same('$330$')],
        correctIndex: 1,
        explanation: same('$\\frac{6}{6},\\frac{3}{6},\\frac{2}{6}\\ \\to\\ 660\\mathbin{:}11=60\\ \\to\\ 6\\cdot 60=360$'),
        topic: 'inverse-share'
    },
    {
        id: 4205,
        prompt: say('Faktura batek 143,99 € balio du, % 21eko BEZa barne. Zenbat zen BEZik gabe?', 'Una factura es de 143,99 € con el 21 % de IVA incluido. ¿Cuánto era sin IVA?', 'فاتورة قيمتها 143.99 € شاملة ضريبة 21٪. كم كانت بدون الضريبة؟', 'A bill comes to €143.99 with 21% VAT included. How much was it before VAT?'),
        options: [same('$113{,}75$ €'), same('$174{,}23$ €'), same('$119$ €')],
        correctIndex: 2,
        explanation: say('Zatitu indizeaz, ez kendu % 21: $143{,}99\\mathbin{:}1{,}21=119$.', 'Divide entre el índice, no restes el 21 %: $143{,}99\\mathbin{:}1{,}21=119$.', 'اقسم على المؤشر ولا تطرح 21٪: $143{,}99\\mathbin{:}1{,}21=119$.', 'Divide by the multiplier, do not subtract the 21%: $143{,}99\\mathbin{:}1{,}21=119$.'),
        topic: 'index'
    },
    {
        id: 4206,
        prompt: say('1000 € % 10ean jartzen dira interes konposatuan 2 urtez. Zenbat diru amaieran?', 'Se colocan 1000 € al 10 % de interés compuesto durante 2 años. ¿Cuánto dinero hay al final?', 'أودعنا 1000 € بفائدة مركّبة 10٪ مدة سنتين. كم يصبح المبلغ؟', '€1000 is invested at 10% compound interest for 2 years. How much money is there at the end?'),
        options: [same('$1200$ €'), same('$1210$ €'), same('$1100$ €')],
        correctIndex: 1,
        explanation: say('Bigarren urtean 1100 €-k sortzen dute interesa: $1000\\cdot 1{,}1^{2}=1210$.', 'El segundo año producen interés 1100 €: $1000\\cdot 1{,}1^{2}=1210$.', 'في السنة الثانية تُنتج 1100 € فائدة: $1000\\cdot 1{,}1^{2}=1210$.', 'In the second year, the €1100 earns interest: $1000\\cdot 1{,}1^{2}=1210$.'),
        topic: 'compound-interest'
    },
    {
        id: 4207,
        prompt: say('1 kg kafe 10 €/kg-an eta 3 kg 6 €/kg-an nahasten dira. Zein da nahasketaren prezioa?', 'Se mezclan 1 kg de café a 10 €/kg y 3 kg a 6 €/kg. ¿Cuál es el precio de la mezcla?', 'نخلط 1 كغ من البن بـ10 €/كغ و3 كغ بـ6 €/كغ. ما سعر الخليط؟', '1 kg of coffee at €10/kg is mixed with 3 kg at €6/kg. What is the price of the mixture?'),
        options: [same('$7$ €/kg'), same('$8$ €/kg'), same('$6{,}5$ €/kg')],
        correctIndex: 0,
        explanation: say('Kostu osoa : kantitate osoa, ez prezioen batez bestekoa: $\\frac{10+18}{4}=7$.', 'Coste total : cantidad total, no la media de los precios: $\\frac{10+18}{4}=7$.', 'الكلفة الكلية : الكمية الكلية، لا متوسط السعرين: $\\frac{10+18}{4}=7$.', 'Total cost : total quantity, not the mean of the prices: $\\frac{10+18}{4}=7$.'),
        topic: 'mixtures'
    },
    {
        id: 4208,
        prompt: say('A txorrotak biltegia 3 orduan betetzen du eta B-k 6 orduan. Zenbat ordu biak batera?', 'El grifo A llena un depósito en 3 horas y el B en 6. ¿Cuántas horas tardan los dos juntos?', 'يملأ الصنبور أ خزانًا في 3 ساعات والصنبور ب في 6. كم ساعة يحتاجان معًا؟', 'Tap A fills a tank in 3 hours and tap B in 6. How many hours do both taps take together?'),
        options: [same('$9$'), same('$4{,}5$'), same('$2$')],
        correctIndex: 2,
        explanation: same('$\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}\\ \\to\\ 2$'),
        topic: 'taps'
    }
]

export const proportionDbh4ApPractice: PracticeItem[] = [
    /* ---------- Simple proportionality ---------- */
    {
        id: 1, stage: 'simple',
        prompt: say('Zikloturista batek 4 km egin ditu 12 minututan. Zenbat km egingo ditu ordu erdian?', 'Un cicloturista ha recorrido 4 km en 12 minutos. ¿Cuántos km recorrerá en media hora?', 'قطع درّاج 4 كم في 12 دقيقة. كم كيلومترًا يقطع في نصف ساعة؟', 'A cyclist has covered 4 km in 12 minutes. How many km will they cover in half an hour?'),
        expected: n(10),
        hint: say('Ordu erdia = 30 min. Minutu batean: $4\\mathbin{:}12$.', 'Media hora = 30 min. En un minuto: $4\\mathbin{:}12$.', 'نصف ساعة = 30 د. في دقيقة: $4\\mathbin{:}12$.', 'Half an hour = 30 min. In one minute: $4\\mathbin{:}12$.'),
        explanation: same('$\\frac{4\\cdot 30}{12}=10$')
    },
    {
        id: 2, stage: 'simple',
        prompt: say('5,5 m kable elektrikok 4,51 € balio dute. Zenbat balio dute 8 m 35 cm-k? Biribildu zentimoetara.', 'Cinco metros y medio de cable eléctrico han costado 4,51 €. ¿Cuánto costarán 8 m 35 cm? Redondea a los céntimos.', 'ثمن 5.5 م من السلك الكهربائي 4.51 €. كم ثمن 8 م 35 سم؟ قرّب إلى السنتات.', 'Five and a half metres of electric cable have cost €4.51. How much will 8 m 35 cm cost? Round to the nearest cent.'),
        expected: v('6,85'),
        hint: say('8 m 35 cm = $8{,}35$ m. Metro bat: $4{,}51\\mathbin{:}5{,}5$.', '8 m 35 cm = $8{,}35$ m. Un metro: $4{,}51\\mathbin{:}5{,}5$.', '8 م 35 سم = $8{,}35$ م. المتر: $4{,}51\\mathbin{:}5{,}5$.', '8 m 35 cm = $8{,}35$ m. One metre: $4{,}51\\mathbin{:}5{,}5$.'),
        explanation: same('$4{,}51\\mathbin{:}5{,}5=0{,}82\\ \\to\\ 0{,}82\\cdot 8{,}35\\approx 6{,}85$')
    },
    {
        id: 3, stage: 'simple',
        prompt: say('Kamioi batek, 60 km/h-ra, 40 minutu behar ditu A-tik B-ra. Zenbat minutu auto batek 80 km/h-ra?', 'Un camión, a 60 km/h, tarda 40 minutos en ir de A a B. ¿Cuántos minutos tardará un coche a 80 km/h?', 'تستغرق شاحنة بسرعة 60 كم/س 40 دقيقة من A إلى B. كم دقيقة تستغرق سيارة بسرعة 80 كم/س؟', 'A lorry travelling at 60 km/h takes 40 minutes to go from A to B. How many minutes will a car at 80 km/h take?'),
        expected: n(30),
        hint: say('Abiadura gehiago → denbora gutxiago: alderantzizkoa.', 'Más velocidad → menos tiempo: inversa.', 'سرعة أكبر ← زمن أقل: عكسي.', 'More speed → less time: inverse.'),
        explanation: same('$60\\cdot 40=2400\\ \\to\\ 2400\\mathbin{:}80=30$')
    },
    {
        id: 4, stage: 'simple',
        prompt: say('Abeltzain batek 35 behirentzako bazka du 60 egunerako. 15 behi saltzen baditu, zenbat egun iraungo dio bazkak?', 'Un ganadero tiene pasto para 35 vacas durante 60 días. Si vende 15 vacas, ¿cuántos días le durará el pasto?', 'لدى مربٍّ علف يكفي 35 بقرة مدة 60 يومًا. إذا باع 15 بقرة، كم يومًا يكفيه العلف؟', 'A farmer has enough grass for 35 cows for 60 days. If he sells 15 cows, how many days will the grass last?'),
        expected: n(105),
        hint: say('20 behi geratzen dira; biderkadura konstantea.', 'Quedan 20 vacas; el producto es constante.', 'تبقى 20 بقرة؛ حاصل الضرب ثابت.', '20 cows are left; the product is constant.'),
        explanation: same('$35\\cdot 60=2100\\ \\to\\ 2100\\mathbin{:}20=105$')
    },

    /* ---------- Compound and shares ---------- */
    {
        id: 5, stage: 'compound',
        prompt: say('Bi bizikleta 3 orduz alokatzeak 11,10 € balio du. Zenbat balioko du hiru bizikleta 5 orduz alokatzeak?', 'Alquilar dos bicicletas durante 3 horas cuesta 11,10 €. ¿Cuánto costará alquilar tres bicicletas durante cinco horas?', 'استئجار دراجتين 3 ساعات يكلّف 11.10 €. كم يكلّف استئجار ثلاث دراجات 5 ساعات؟', 'Renting two bikes for 3 hours costs €11.10. How much will it cost to rent three bikes for five hours?'),
        expected: v('27,75'),
        hint: say('Biak zuzenak: $\\frac{3}{2}$ eta $\\frac{5}{3}$.', 'Las dos directas: $\\frac{3}{2}$ y $\\frac{5}{3}$.', 'كلاهما طردي: $\\frac{3}{2}$ و$\\frac{5}{3}$.', 'Both are direct: $\\frac{3}{2}$ and $\\frac{5}{3}$.'),
        explanation: same('$11{,}10\\cdot\\frac{3}{2}\\cdot\\frac{5}{3}=27{,}75$')
    },
    {
        id: 6, stage: 'compound',
        prompt: say('5 langileko talde batek 1050 € kobratu ditu 3 eguneko lan batengatik. Tarifa berarekin, zenbat langile ditu 6 eguneko lanagatik 1680 € kobratzen dituen taldeak?', 'Una cuadrilla de 5 obreros ha cobrado 1050 € por un trabajo de 3 días. Con las mismas tarifas, ¿cuántos obreros tiene una cuadrilla que cobra 1680 € por un trabajo de 6 días?', 'تقاضت مجموعة من 5 عمال 1050 € عن عمل 3 أيام. بالأجور نفسها، كم عاملًا في مجموعة تقاضت 1680 € عن عمل 6 أيام؟', 'A crew of 5 workers has been paid €1050 for a 3-day job. At the same rates, how many workers are in a crew paid €1680 for a 6-day job?'),
        expected: n(4),
        hint: say('Diru gehiago → langile gehiago (zuzena); egun gehiago → langile gutxiago (alderantzizkoa).', 'Más dinero → más obreros (directa); más días → menos obreros (inversa).', 'مال أكثر ← عمال أكثر (طردي)؛ أيام أكثر ← عمال أقل (عكسي).', 'More money → more workers (direct); more days → fewer workers (inverse).'),
        explanation: same('$5\\cdot\\frac{1680}{1050}\\cdot\\frac{3}{6}=4$')
    },
    {
        id: 7, stage: 'compound',
        prompt: say('Banatu 660 zuzenki proportzionalki 1, 2 eta 3rekiko. Zenbat dagokio 3ri?', 'Reparte 660 de forma directamente proporcional a 1, 2 y 3. ¿Cuánto le toca al 3?', 'وزّع 660 طرديًا على 1 و2 و3. كم نصيب 3؟', 'Share 660 in direct proportion to 1, 2 and 3. How much is the share for 3?'),
        expected: n(330),
        hint: say('$1+2+3=6$ zati.', '$1+2+3=6$ partes.', '$1+2+3=6$ أجزاء.', '$1+2+3=6$ parts.'),
        explanation: same('$660\\mathbin{:}6=110\\ \\to\\ 3\\cdot 110=330$')
    },
    {
        id: 8, stage: 'compound',
        prompt: say('Gidari batek ibilbide bera hiru aldiz egin du, 50, 100 eta 80 km/h-ra, eta 255 minutu behar izan ditu guztira. Zenbat minutu 80 km/h-ko bidaian?', 'Un conductor ha hecho el mismo trayecto tres veces, a 50, 100 y 80 km/h, y ha tardado 255 minutos en total. ¿Cuántos minutos en el viaje a 80 km/h?', 'قطع سائق المسار نفسه ثلاث مرات بسرعة 50 و100 و80 كم/س واستغرق 255 دقيقة إجمالًا. كم دقيقة استغرقت رحلة الـ80 كم/س؟', 'A driver has made the same trip three times, at 50, 100 and 80 km/h, and the total time was 255 minutes. How many minutes were spent on the trip at 80 km/h?'),
        expected: n(75),
        hint: say('Denbora abiadurarekiko alderantzizkoa: banatu $\\frac{1}{50}$, $\\frac{1}{100}$ eta $\\frac{1}{80}$-rekiko.', 'El tiempo es inverso a la velocidad: reparte a $\\frac{1}{50}$, $\\frac{1}{100}$ y $\\frac{1}{80}$.', 'الزمن عكسي مع السرعة: وزّع على $\\frac{1}{50}$ و$\\frac{1}{100}$ و$\\frac{1}{80}$.', 'Time is inversely proportional to speed: share in proportion to $\\frac{1}{50}$, $\\frac{1}{100}$ and $\\frac{1}{80}$.'),
        explanation: same('$\\frac{1}{50}+\\frac{1}{100}+\\frac{1}{80}=\\frac{17}{400}\\ \\to\\ 255\\mathbin{:}\\frac{17}{400}=6000\\ \\to\\ 6000\\mathbin{:}80=75$')
    },

    /* ---------- Percentages ---------- */
    {
        id: 9, stage: 'percent',
        prompt: say('Kalkulatu 4000ren % 11,4.', 'Calcula el 11,4 % de 4000.', 'احسب 11.4٪ من 4000.', 'Work out 11.4% of 4000.'),
        expected: n(456),
        hint: say('% 11,4 = $0{,}114$.', '11,4 % = $0{,}114$.', '11.4٪ = $0{,}114$.', '11.4% = $0{,}114$.'),
        explanation: same('$4000\\cdot 0{,}114=456$')
    },
    {
        id: 10, stage: 'percent',
        prompt: say('380ren % $P$ = 57. Zenbat da $P$?', 'El $P$ % de 380 es 57. ¿Cuánto vale $P$?', '$P$٪ من 380 تساوي 57. كم قيمة $P$؟', '$P$% of 380 is 57. What is the value of $P$?'),
        expected: n(15),
        hint: say('Zatia : osoa · 100.', 'Parte : total · 100.', 'الجزء : الكل · 100.', 'Part : total · 100.'),
        explanation: same('$57\\mathbin{:}380\\cdot 100=15$')
    },
    {
        id: 11, stage: 'percent',
        prompt: say('Zenbat ordainduko du Ivánek 685 €-ko traje batengatik, % 25eko beherapenarekin?', '¿Cuánto pagará Iván por un traje de 685 € con una rebaja del 25 %?', 'كم يدفع إيبان ثمن بدلة سعرها 685 € مع تخفيض 25٪؟', 'How much will Iván pay for a suit costing €685 with a 25% discount?'),
        expected: v('513,75'),
        hint: say('Indizea: $0{,}75$.', 'Índice: $0{,}75$.', 'المؤشر: $0{,}75$.', 'Multiplier: $0{,}75$.'),
        explanation: same('$685\\cdot 0{,}75=513{,}75$')
    },
    {
        id: 12, stage: 'percent',
        prompt: say('Asegurua 520 €-tik 442 €-ra jaitsi da. Zer ehuneko merkatu da?', 'El seguro ha pasado de 520 € a 442 €. ¿En qué porcentaje se ha rebajado?', 'انخفض قسط التأمين من 520 € إلى 442 €. بأي نسبة انخفض؟', 'The insurance has gone down from €520 to €442. By what percentage has it gone down?'),
        expected: n(15),
        hint: say('Indizea: amaierakoa : hasierakoa.', 'Índice: final : inicial.', 'المؤشر: النهائية : الأصلية.', 'Multiplier: final : initial.'),
        explanation: same('$442\\mathbin{:}520=0{,}85\\ \\to\\ 100-85=15$')
    },

    /* ---------- Interest ---------- */
    {
        id: 13, stage: 'interest',
        prompt: say('Zer interes sortzen dute 1000 €-k % 4an 4 hilabetez, interes bakunean? Biribildu zentimoetara.', '¿Qué interés producen 1000 € al 4 % anual durante cuatro meses, a interés simple? Redondea a los céntimos.', 'ما الفائدة البسيطة التي تُنتجها 1000 € بنسبة 4٪ سنويًا مدة أربعة أشهر؟ قرّب إلى السنتات.', 'What simple interest do €1000 earn at 4% a year for four months? Round to the nearest cent.'),
        expected: v('13,33'),
        hint: say('Hilabeteak: zatitu 1200ez.', 'En meses: divide entre 1200.', 'بالأشهر: اقسم على 1200.', 'In months: divide by 1200.'),
        explanation: same('$\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$')
    },
    {
        id: 14, stage: 'interest',
        prompt: say('Inbertitzaile batek 24 000 € jartzen ditu % 4,8an interes konposatuan 5 urtez. Zenbat izango du? Biribildu zentimoetara.', 'Un inversor coloca 24 000 € al 4,8 % de interés compuesto durante 5 años. ¿Cuánto tendrá? Redondea a los céntimos.', 'يودع مستثمر 24000 € بفائدة مركّبة 4.8٪ مدة 5 سنوات. كم يصبح لديه؟ قرّب إلى السنتات.', 'An investor puts €24,000 at 4.8% compound interest for 5 years. How much will they have? Round to the nearest cent.'),
        expected: v('30340,15'),
        hint: say('$C\\cdot 1{,}048^{5}$.', '$C\\cdot 1{,}048^{5}$.', '$C\\cdot 1{,}048^{5}$.', '$C\\cdot 1{,}048^{5}$.'),
        explanation: same('$24\\,000\\cdot 1{,}048^{5}\\approx 30\\,340{,}15$')
    },
    {
        id: 15, stage: 'interest',
        prompt: say('120 000 €-ko kapitala 126 750 € bihurtu da sei hilabetean, interes bakunean. Zer urteko ehuneko ordaintzen du kontuak?', 'Un capital de 120 000 € se convierte en 126 750 € en seis meses, a interés simple. ¿Qué tanto por ciento anual abona la cuenta?', 'تحوّل رأس مال قدره 120000 € إلى 126750 € في ستة أشهر بفائدة بسيطة. ما النسبة السنوية التي يدفعها الحساب؟', 'A capital of €120,000 becomes €126,750 in six months, at simple interest. What annual percentage rate does the account pay?'),
        expected: v('11,25'),
        hint: say('Interesa: $126\\,750-120\\,000$. Bakandu $r$, hilabeteak 1200ekin.', 'Interés: $126\\,750-120\\,000$. Despeja $r$, con los meses y 1200.', 'الفائدة: $126\\,750-120\\,000$. استخرج $r$ بالأشهر و1200.', 'Interest: $126\\,750-120\\,000$. Solve for $r$, using the months and 1200.'),
        explanation: same('$126\\,750-120\\,000=6750\\ \\to\\ \\frac{6750\\cdot 1200}{120\\,000\\cdot 6}=11{,}25$')
    },
    {
        id: 16, stage: 'interest',
        prompt: say('Zer kapital jarri behar da % 5ean interes konposatuan 2 urtez, 4410 € izateko?', '¿Qué capital hay que colocar al 5 % de interés compuesto durante 2 años para tener 4410 €?', 'ما رأس المال الذي يجب إيداعه بفائدة مركّبة 5٪ مدة سنتين ليصبح 4410 €؟', 'What capital do you need to invest at 5% compound interest for 2 years to have €4410?'),
        expected: n(4000),
        hint: say('Atzera: zatitu $1{,}05^{2}$-z.', 'Hacia atrás: divide entre $1{,}05^{2}$.', 'للرجوع: اقسم على $1{,}05^{2}$.', 'Working backwards: divide by $1{,}05^{2}$.'),
        explanation: same('$4410\\mathbin{:}1{,}05^{2}=4410\\mathbin{:}1{,}1025=4000$')
    },

    /* ---------- Other arithmetic problems ---------- */
    {
        id: 17, stage: 'problems',
        prompt: say('12 kg kafe 12,40 €/kg-an eta 8 kg 7,40 €/kg-an nahasten dira. Zein da nahasketaren prezioa (€/kg)?', 'Se mezclan 12 kg de café de 12,40 €/kg con 8 kg de 7,40 €/kg. ¿Cuál es el precio de la mezcla (€/kg)?', 'نخلط 12 كغ من البن بـ12.40 €/كغ مع 8 كغ بـ7.40 €/كغ. ما سعر الخليط (€/كغ)؟', '12 kg of coffee at €12.40/kg are mixed with 8 kg at €7.40/kg. What is the price of the mixture (€/kg)?'),
        expected: v('10,4'),
        hint: say('Kostu osoa : kantitate osoa.', 'Coste total : cantidad total.', 'الكلفة الكلية : الكمية الكلية.', 'Total cost : total quantity.'),
        explanation: same('$\\frac{12\\cdot 12{,}40+8\\cdot 7{,}40}{20}=\\frac{208}{20}=10{,}4$')
    },
    {
        id: 18, stage: 'problems',
        prompt: say('3500 g-ko lingote bat (% 80 urrea) eta 1500 g-ko beste bat (% 95 urrea) urtzen dira. Zer ehuneko urre du lingote berriak?', 'Se funden un lingote de 3500 g con un 80 % de oro y otro de 1500 g con un 95 % de oro. ¿Qué porcentaje de oro tiene el nuevo lingote?', 'تُصهر سبيكة وزنها 3500 غ فيها 80٪ ذهب وأخرى وزنها 1500 غ فيها 95٪ ذهب. ما نسبة الذهب في السبيكة الجديدة؟', 'A 3500 g ingot that is 80% gold and another 1500 g ingot that is 95% gold are melted together. What percentage of gold does the new ingot have?'),
        expected: v('84,5'),
        hint: say('Urrea guztira : pisu osoa.', 'Oro total : peso total.', 'الذهب الكلي : الوزن الكلي.', 'Total gold : total weight.'),
        explanation: same('$\\frac{0{,}8\\cdot 3500+0{,}95\\cdot 1500}{5000}=\\frac{4225}{5000}=0{,}845\\ \\to\\ 84{,}5$')
    },
    {
        id: 19, stage: 'problems',
        prompt: say('Auto bat 120 km/h-ra eta kamioi bat 90 km/h-ra doaz, elkarrengana, 504 km-ra. Zenbat ordu behar dute gurutzatzeko?', 'Un coche a 120 km/h y un camión a 90 km/h están a 504 km y van uno hacia el otro. ¿Cuántas horas tardan en cruzarse?', 'سيارة بسرعة 120 كم/س وشاحنة بسرعة 90 كم/س تفصل بينهما 504 كم ويتجه كل منهما نحو الآخر. كم ساعة حتى يتقاطعا؟', 'A car at 120 km/h and a lorry at 90 km/h are 504 km apart and are heading towards each other. How many hours will they take to pass each other?'),
        expected: v('2,4'),
        hint: say('Elkarrengana: abiadurak batu.', 'Al encuentro: suma las velocidades.', 'التلاقي: اجمع السرعتين.', 'Towards each other: add the speeds.'),
        explanation: same('$504\\mathbin{:}(120+90)=2{,}4$')
    },
    {
        id: 20, stage: 'problems',
        prompt: say('Biltegi bat lehen txorrotarekin 3 orduan betetzen da, eta bi txorrotekin 2 orduan. Zenbat ordu bigarren txorrotarekin bakarrik?', 'Un depósito se llena con el primer grifo en 3 horas y con los dos en 2 horas. ¿Cuántas horas tarda el segundo grifo solo?', 'يمتلئ خزان بالصنبور الأول في 3 ساعات وبالصنبورين في ساعتين. كم ساعة يحتاج الصنبور الثاني وحده؟', 'A tank fills in 3 hours with the first tap and in 2 hours with both taps. How many hours does the second tap take on its own?'),
        expected: n(6),
        hint: say('Ordu batean: biak $\\frac{1}{2}$, lehena $\\frac{1}{3}$.', 'En una hora: los dos $\\frac{1}{2}$, el primero $\\frac{1}{3}$.', 'في ساعة: الاثنان $\\frac{1}{2}$ والأول $\\frac{1}{3}$.', 'In one hour: both taps fill $\\frac{1}{2}$, the first fills $\\frac{1}{3}$.'),
        explanation: same('$\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}\\ \\to\\ 6$')
    }
]

export const proportionDbh4ApChallenges: ChallengeItem[] = [
    {
        id: 101, stage: 'simple', points: 10, context: 'starter',
        prompt: say('27 bideojokorentzat 3 apal behar dira. Zenbat apal 36 bideojokorentzat?', 'Para 27 videojuegos hacen falta 3 estanterías. ¿Cuántas para 36 videojuegos?', 'نحتاج 3 رفوف لـ27 لعبة فيديو. كم رفًا لـ36 لعبة؟', '27 video games need 3 shelves. How many shelves are needed for 36 video games?'),
        expected: n(4),
        hint: say('Apal bakoitzean $27\\mathbin{:}3$.', 'En cada estantería, $27\\mathbin{:}3$.', 'في كل رف $27\\mathbin{:}3$.', 'Per shelf: $27\\mathbin{:}3$.'),
        explanation: same('$\\frac{36\\cdot 3}{27}=4$')
    },
    {
        id: 102, stage: 'simple', points: 20, context: 'advanced',
        prompt: say('Gasolinaren litroak 1,339 € balio du eta Jesusek 66,95 € ordaindu ditu. Zenbat litro jarri ditu?', 'El litro de gasolina vale 1,339 € y Jesús ha pagado 66,95 €. ¿Cuántos litros ha puesto?', 'ثمن لتر البنزين 1.339 € ودفع خيسوس 66.95 €. كم لترًا وضع؟', 'A litre of petrol costs €1.339 and Jesús has paid €66.95. How many litres has he put in?'),
        expected: n(50),
        hint: say('Zatitu prezio osoa litroaren prezioaz.', 'Divide el precio total entre el precio del litro.', 'اقسم الثمن الكلي على ثمن اللتر.', 'Divide the total price by the price of one litre.'),
        explanation: same('$66{,}95\\mathbin{:}1{,}339=50$')
    },
    {
        id: 103, stage: 'simple', points: 30, context: 'advanced',
        prompt: say('Bi belar-mozteko makinak zelai bat ordu erdian mozten dute. Zenbat minutu hiru makinak?', 'Dos máquinas cortacésped siegan un prado en media hora. ¿Cuántos minutos tardarían tres máquinas?', 'آلتا قص عشب تقصّان مرجًا في نصف ساعة. كم دقيقة تحتاج ثلاث آلات؟', 'Two lawnmowers mow a lawn in half an hour. How many minutes would three lawnmowers take?'),
        expected: n(20),
        hint: say('Ordu erdia = 30 min; makina gehiago → denbora gutxiago.', 'Media hora = 30 min; más máquinas → menos tiempo.', 'نصف ساعة = 30 د؛ آلات أكثر ← زمن أقل.', 'Half an hour = 30 min; more mowers → less time.'),
        explanation: same('$2\\cdot 30=60\\ \\to\\ 60\\mathbin{:}3=20$')
    },
    {
        id: 104, stage: 'compound', points: 10, context: 'starter',
        prompt: say('Segundoko litro erdi botatzen duen txorrota batek zisterna bat 3 orduan betetzen du. Zer emari (l/s) behar da bi zisterna ordu batean betetzeko?', 'Un caño que arroja medio litro por segundo llena una cisterna en 3 horas. ¿Qué caudal (l/s) hace falta para llenar dos cisternas en una hora?', 'أنبوب يصبّ نصف لتر في الثانية يملأ صهريجًا في 3 ساعات. ما التدفق (ل/ث) اللازم لملء صهريجين في ساعة؟', 'A pipe that releases half a litre per second fills a tank in 3 hours. What flow rate (l/s) is needed to fill two tanks in one hour?'),
        expected: n(3),
        hint: say('Zisterna gehiago → emari gehiago (zuzena); denbora gutxiago → emari gehiago (alderantzizkoa).', 'Más cisternas → más caudal (directa); menos tiempo → más caudal (inversa).', 'صهاريج أكثر ← تدفق أكبر (طردي)؛ زمن أقل ← تدفق أكبر (عكسي).', 'More tanks → more flow rate (direct); less time → more flow rate (inverse).'),
        explanation: same('$0{,}5\\cdot\\frac{2}{1}\\cdot\\frac{3}{1}=3$')
    },
    {
        id: 105, stage: 'compound', points: 20, context: 'advanced',
        prompt: say('Lorezain batek 120 € kobratzen ditu 250 m²-ko lursail bati 6 aldiz belarra mozteagatik. Zenbat kobratuko du 400 m²-ko lursail bati 8 aldiz mozteagatik?', 'Un jardinero cobra 120 € por dar seis cortes de césped a una parcela de 250 m². ¿Cuánto cobrará por dar ocho cortes a una parcela de 400 m²?', 'يتقاضى بستاني 120 € مقابل قص عشب قطعة أرض مساحتها 250 م² ست مرات. كم يتقاضى مقابل قص قطعة مساحتها 400 م² ثماني مرات؟', 'A gardener charges €120 for six lawn cuts on a 250 m² plot. How much will they charge for eight cuts on a 400 m² plot?'),
        expected: n(256),
        hint: say('Biak zuzenak.', 'Las dos directas.', 'كلاهما طردي.', 'Both are direct.'),
        explanation: same('$120\\cdot\\frac{8}{6}\\cdot\\frac{400}{250}=256$')
    },
    {
        id: 106, stage: 'compound', points: 30, context: 'advanced',
        prompt: say('2340 €-ko saria hiru lehiakideren artean banatzen da, akatsekiko (2, 3 eta 4) alderantziz proportzionalki. Zenbat jasotzen du 2 akats egin dituenak?', 'Un premio de 2340 € se reparte entre tres concursantes de forma inversamente proporcional a sus errores (2, 3 y 4). ¿Cuánto recibe el que cometió 2 errores?', 'تُوزَّع جائزة 2340 € على ثلاثة متسابقين عكسيًا مع أخطائهم (2 و3 و4). كم يأخذ صاحب الخطأين؟', 'A prize of €2340 is shared among three contestants in inverse proportion to their mistakes (2, 3 and 4). How much does the one who made 2 mistakes receive?'),
        expected: n(1080),
        hint: say('Alderantzizkoak izendatzaile berarekin: $\\frac{6}{12},\\frac{4}{12},\\frac{3}{12}$.', 'Los inversos con el mismo denominador: $\\frac{6}{12},\\frac{4}{12},\\frac{3}{12}$.', 'المقلوبات بالمقام نفسه: $\\frac{6}{12},\\frac{4}{12},\\frac{3}{12}$.', 'The reciprocals with the same denominator: $\\frac{6}{12},\\frac{4}{12},\\frac{3}{12}$.'),
        explanation: same('$2340\\mathbin{:}(6+4+3)=180\\ \\to\\ 6\\cdot 180=1080$')
    },
    {
        id: 107, stage: 'percent', points: 10, context: 'starter',
        prompt: say('2840 izangaitik % 95 hautaketan kanporatu zituzten. Zenbat gainditu zuten hautaketa?', 'De 2840 aspirantes, un 95 % fue eliminado en la selección. ¿Cuántos pasaron la selección?', 'من 2840 مترشحًا استُبعد 95٪ في الانتقاء. كم واحدًا نجح؟', 'Of 2840 applicants, 95% were eliminated in the selection. How many got through?'),
        expected: n(142),
        hint: say('% 5 gainditu zuten.', 'Pasó el 5 %.', 'نجح 5٪.', '5% got through.'),
        explanation: same('$2840\\cdot 0{,}05=142$')
    },
    {
        id: 108, stage: 'percent', points: 20, context: 'advanced',
        prompt: say('Fruta nekazaritik kontsumitzailera: % 25 garestitu, % 60, bikoiztu eta % 50. Kontsumitzaileak albertxikoak 2,40 €/kg ordaintzen baditu, zenbat kobratu zuen nekazariak (€/kg)?', 'La fruta del agricultor al consumidor: sube un 25 %, un 60 %, se dobla y un 50 %. Si el consumidor paga los albaricoques a 2,40 €/kg, ¿a cuánto los cobró el agricultor (€/kg)?', 'الفاكهة من المزارع إلى المستهلك: ترتفع 25٪ ثم 60٪ ثم تتضاعف ثم 50٪. إذا دفع المستهلك 2.40 €/كغ ثمن المشمش، فبكم باعه المزارع (€/كغ)؟', 'The fruit goes from the farmer to the consumer: its price rises 25%, then 60%, doubles and rises 50%. If the consumer pays €2.40/kg for apricots, how much did the farmer charge (€/kg)?'),
        expected: v('0,4'),
        hint: say('Indize osoa: $1{,}25\\cdot 1{,}6\\cdot 2\\cdot 1{,}5$. Atzera: zatitu.', 'Índice total: $1{,}25\\cdot 1{,}6\\cdot 2\\cdot 1{,}5$. Hacia atrás: divide.', 'المؤشر الكلي: $1{,}25\\cdot 1{,}6\\cdot 2\\cdot 1{,}5$. للرجوع: اقسم.', 'Total multiplier: $1{,}25\\cdot 1{,}6\\cdot 2\\cdot 1{,}5$. Working backwards: divide.'),
        explanation: same('$1{,}25\\cdot 1{,}6\\cdot 2\\cdot 1{,}5=6\\ \\to\\ 2{,}40\\mathbin{:}6=0{,}4$')
    },
    {
        id: 109, stage: 'percent', points: 30, context: 'advanced',
        prompt: say('Merkatari batek prezioak % 40 igotzen ditu eta gero % 40ko beherapena iragartzen du. Zer ehuneko da benetako beherapena?', 'Un comerciante sube los precios un 40 % y después anuncia una rebaja del 40 %. ¿De qué porcentaje es el descuento real?', 'يرفع تاجر الأسعار 40٪ ثم يعلن تخفيضًا بنسبة 40٪. ما نسبة التخفيض الحقيقي؟', 'A shopkeeper raises prices by 40% and then announces a 40% sale. What is the real discount, as a percentage?'),
        expected: n(16),
        hint: say('Biderkatu indizeak: $1{,}4$ eta $0{,}6$.', 'Multiplica los índices: $1{,}4$ y $0{,}6$.', 'اضرب المؤشرين: $1{,}4$ و$0{,}6$.', 'Multiply the multipliers: $1{,}4$ and $0{,}6$.'),
        explanation: same('$1{,}4\\cdot 0{,}6=0{,}84\\ \\to\\ 100-84=16$')
    },
    {
        id: 110, stage: 'interest', points: 10, context: 'starter',
        prompt: say('6000 € % 3an urtebetez. Gero dena atera, 3820 € gehitu eta beste banku batean % 5ean urtebetez. Zenbat diru amaieran?', 'Se depositan 6000 € al 3 % un año. Después se saca todo, se añaden 3820 € y se deposita todo al 5 % otro año. ¿Cuánto dinero hay al final?', 'نودع 6000 € بفائدة 3٪ سنة. ثم نسحب كل شيء ونضيف 3820 € ونودع الجميع بفائدة 5٪ سنة أخرى. كم يصبح المبلغ؟', '€6000 is deposited at 3% for one year. Then all of it is taken out, €3820 is added, and everything is deposited at 5% for another year. How much money is there at the end?'),
        expected: n(10500),
        hint: say('Lehen urtea: $6000\\cdot 1{,}03$.', 'Primer año: $6000\\cdot 1{,}03$.', 'السنة الأولى: $6000\\cdot 1{,}03$.', 'First year: $6000\\cdot 1{,}03$.'),
        explanation: same('$6000\\cdot 1{,}03+3820=10\\,000\\ \\to\\ 10\\,000\\cdot 1{,}05=10\\,500$')
    },
    {
        id: 111, stage: 'interest', points: 20, context: 'advanced',
        prompt: say('5600 € % 3,8an interes konposatuan 10 urtez. Zenbat amaieran? Biribildu zentimoetara.', '5600 € al 3,8 % de interés compuesto durante 10 años. ¿Cuánto al final? Redondea a los céntimos.', '5600 € بفائدة مركّبة 3.8٪ مدة 10 سنوات. كم في النهاية؟ قرّب إلى السنتات.', '€5600 at 3.8% compound interest for 10 years. How much will it be at the end? Round to the nearest cent.'),
        expected: v('8131,33'),
        hint: say('$C\\cdot 1{,}038^{10}$.', '$C\\cdot 1{,}038^{10}$.', '$C\\cdot 1{,}038^{10}$.', '$C\\cdot 1{,}038^{10}$.'),
        explanation: same('$5600\\cdot 1{,}038^{10}\\approx 8131{,}33$')
    },
    {
        id: 112, stage: 'interest', points: 30, context: 'advanced',
        prompt: say('25 000 € % 5ean 5 urtez, interesak hilero metatuz. Zenbat amaieran? Biribildu zentimoetara.', '25 000 € al 5 % durante 5 años, con los intereses acumulados mensualmente. ¿Cuánto al final? Redondea a los céntimos.', '25000 € بفائدة 5٪ مدة 5 سنوات، مع إضافة الفوائد شهريًا. كم في النهاية؟ قرّب إلى السنتات.', '€25,000 at 5% for 5 years, with the interest compounded monthly. How much will it be at the end? Round to the nearest cent.'),
        expected: v('32083,97'),
        hint: say('$k=12$: $\\left(1+\\frac{5}{1200}\\right)^{60}$.', '$k=12$: $\\left(1+\\frac{5}{1200}\\right)^{60}$.', '$k=12$: $\\left(1+\\frac{5}{1200}\\right)^{60}$.', '$k=12$: $\\left(1+\\frac{5}{1200}\\right)^{60}$.'),
        explanation: same('$25\\,000\\cdot\\left(1+\\frac{5}{1200}\\right)^{60}\\approx 32\\,083{,}97$')
    },
    {
        id: 113, stage: 'problems', points: 10, context: 'starter',
        prompt: say('Kantara bat ardo 7,40 €-an eta beste ardo baten hiru kantara 5,20 €-an nahasten dira. Zenbatean saldu behar da nahasketaren kantara, irabazi bera lortzeko?', 'Se mezcla una cántara de vino de 7,40 € con tres cántaras de otro vino de 5,20 €. ¿A cuánto hay que vender la cántara de la mezcla para obtener lo mismo?', 'نخلط جرّة نبيذ بـ7.40 € مع ثلاث جرار من نبيذ آخر بـ5.20 €. بكم نبيع جرّة الخليط لنحصل على المبلغ نفسه؟', 'One jug of wine costing €7.40 is mixed with three jugs of another wine costing €5.20. At what price must one jug of the mixture be sold to get the same money back?'),
        expected: v('5,75'),
        hint: say('Kostu osoa : 4 kantara.', 'Coste total : 4 cántaras.', 'الكلفة الكلية : 4 جرار.', 'Total cost : 4 jugs.'),
        explanation: same('$\\frac{7{,}40+3\\cdot 5{,}20}{4}=\\frac{23}{4}=5{,}75$')
    },
    {
        id: 114, stage: 'problems', points: 20, context: 'advanced',
        prompt: say('Lapur batzuk 120 km/h-ra doaz. Polizia 5 minutu geroago ateratzen da eta beste 12 minututan harrapatzen ditu. Zer abiaduratan (km/h) zihoan polizia?', 'Unos ladrones huyen a 120 km/h. La policía sale cinco minutos después y tarda otros doce minutos en alcanzarlos. ¿A qué velocidad (km/h) iba la policía?', 'يفرّ لصوص بسرعة 120 كم/س. تنطلق الشرطة بعد خمس دقائق وتلحق بهم بعد اثنتي عشرة دقيقة أخرى. ما سرعة الشرطة (كم/س)؟', 'Some robbers flee at 120 km/h. The police set off five minutes later and take another twelve minutes to catch up with them. How fast (km/h) was the police car going?'),
        expected: n(170),
        hint: say('Lapurrek 17 minutu ibili dute; poliziak distantzia bera 12 minututan.', 'Los ladrones han ido 17 minutos; la policía hace la misma distancia en 12 minutos.', 'سار اللصوص 17 دقيقة، وقطعت الشرطة المسافة نفسها في 12 دقيقة.', 'The robbers have been driving for 17 minutes; the police cover the same distance in 12 minutes.'),
        explanation: same('$120\\cdot\\frac{17}{60}=34\\ \\to\\ 34\\mathbin{:}0{,}2=170$')
    },
    {
        id: 115, stage: 'problems', points: 30, context: 'advanced',
        prompt: say('Oinezko batek A-B ibilbidea 35 minututan egiten du eta txirrindulari batek B-A 14 minututan. Aldi berean ateratzen badira, zenbat minutu behar dute gurutzatzeko?', 'Un peatón hace el recorrido A-B en 35 minutos y un ciclista el B-A en 14 minutos. Si salen a la vez, ¿cuántos minutos tardan en cruzarse?', 'يقطع ماشٍ المسار من A إلى B في 35 دقيقة ودرّاج من B إلى A في 14 دقيقة. إذا انطلقا معًا، كم دقيقة حتى يتقاطعا؟', 'A pedestrian walks from A to B in 35 minutes and a cyclist rides from B to A in 14 minutes. If they set off at the same time, how many minutes will it take them to pass each other?'),
        expected: n(10),
        hint: say('Minutu batean ibilbidearen zer zati egiten dute biek?', '¿Qué parte del recorrido hacen entre los dos en un minuto?', 'ما الجزء الذي يقطعانه معًا في دقيقة؟', 'What fraction of the route do the two of them cover together in one minute?'),
        explanation: same('$\\frac{1}{35}+\\frac{1}{14}=\\frac{1}{10}\\ \\to\\ 10$')
    }
]

export const proportionDbh4ApExerciseBank: ExerciseSection[] = [
    {
        id: 'simple',
        title: say('Proportzionaltasun soila', 'Proporcionalidad simple', 'التناسب البسيط', 'Simple proportion'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Igeltsero batek 280 lauza jarri ditu 14 orduan. Zenbat lauza jartzen ditu orduko?', 'Un albañil ha puesto 280 azulejos en 14 horas. ¿Cuántos azulejos pone cada hora?', 'وضع بنّاء 280 بلاطة في 14 ساعة. كم بلاطة يضع كل ساعة؟', 'A bricklayer has laid 280 tiles in 14 hours. How many tiles does he lay each hour?'), solution: same('$\\frac{280}{14}=20$'), answer: { expected: n(20) } },
            { id: 2, difficulty: 'easy', question: say('Zuzena, alderantzizkoa ala bat ere ez? a) Kontsumo finkoko auto baten litroak eta km-ak; b) langileak eta lan bat egiteko egunak; c) adina eta pisua.', '¿Directa, inversa o ninguna? a) Los litros y los km de un coche de consumo fijo; b) los obreros y los días para hacer una obra; c) la edad y el peso.', 'طردي أم عكسي أم لا شيء؟ أ) لترات سيارة ثابتة الاستهلاك وكيلومتراتها؛ ب) العمال وأيام إنجاز عمل؛ ج) العمر والوزن.', 'Direct, inverse or neither? a) The litres and the km of a car with a fixed fuel consumption; b) the workers and the days to finish a job; c) age and weight.'), solution: say('a) Zuzena; b) alderantzizkoa; c) bat ere ez.', 'a) Directa; b) inversa; c) ninguna.', 'أ) طردي؛ ب) عكسي؛ ج) لا شيء.', 'a) Direct; b) inverse; c) neither.') },
            { id: 3, difficulty: 'easy', question: say('35 autok 385 m² behar dituzte aparkatzeko. Zenbat m² 250 autok?', '35 coches necesitan 385 m² para aparcar. ¿Cuántos m² necesitan 250 coches?', 'تحتاج 35 سيارة إلى 385 م² للركن. كم م² تحتاج 250 سيارة؟', '35 cars need 385 m² to park. How many m² do 250 cars need?'), solution: same('$\\frac{385\\cdot 250}{35}=2750$'), answer: { expected: n(2750) } },
            { id: 4, difficulty: 'medium', question: say('Aire garbiaren 100 l-tan 21 l oxigeno daude. Zenbat litro oxigeno 2 l airetan?', 'En 100 l de aire limpio hay 21 l de oxígeno. ¿Cuántos litros de oxígeno hay en 2 l de aire?', 'في 100 ل من الهواء النقي 21 ل من الأكسجين. كم لترًا من الأكسجين في 2 ل من الهواء؟', 'There are 21 l of oxygen in 100 l of clean air. How many litres of oxygen are there in 2 l of air?'), solution: same('$\\frac{21\\cdot 2}{100}=0{,}42$'), answer: { expected: v('0,42') } },
            { id: 5, difficulty: 'medium', question: say('Ogi-barra batek 0,90 € balio du eta bost barrak 4,10 €. Barrak eta prezioa proportzionalak dira?', 'Una barra de pan vale 0,90 € y cinco barras 4,10 €. ¿Son proporcionales las barras y el precio?', 'ثمن رغيف 0.90 € وثمن خمسة أرغفة 4.10 €. هل الأرغفة والسعر متناسبان؟', 'A baguette costs €0.90 and five baguettes cost €4.10. Are the number of baguettes and the price proportional?'), solution: say('Ez: $0{,}90\\cdot 5=4{,}5\\neq 4{,}10$.', 'No: $0{,}90\\cdot 5=4{,}5\\neq 4{,}10$.', 'لا: $0{,}90\\cdot 5=4{,}5\\neq 4{,}10$.', 'No: $0{,}90\\cdot 5=4{,}5\\neq 4{,}10$.') },
            { id: 6, difficulty: 'medium', question: say('12 l/min-ko txorrota batek biltegia 25 minututan betetzen du. Zenbat minutu 15 l/min-ko batek?', 'Un grifo de 12 l/min llena un depósito en 25 minutos. ¿Cuántos minutos tarda uno de 15 l/min?', 'صنبور تدفقه 12 ل/د يملأ خزانًا في 25 دقيقة. كم دقيقة يحتاج صنبور تدفقه 15 ل/د؟', 'A tap delivering 12 l/min fills a tank in 25 minutes. How many minutes does one delivering 15 l/min take?'), solution: same('$12\\cdot 25=300\\ \\to\\ 300\\mathbin{:}15=20$'), answer: { expected: n(20) } },
            { id: 7, difficulty: 'medium', question: say('Ikastetxeko jantokian 132 ogi-barra kontsumitu dira 3 egunetan. Barrak 0,35 € balio badu, zenbat diru behar da astean (5 egun)?', 'En el comedor del colegio se han consumido 132 barras de pan en tres días. Si una barra cuesta 0,35 €, ¿cuánto dinero hace falta a la semana (5 días)?', 'استُهلك في مطعم المدرسة 132 رغيفًا في ثلاثة أيام. إذا كان ثمن الرغيف 0.35 €، فكم مالًا نحتاج في الأسبوع (5 أيام)؟', 'In the school canteen, 132 baguettes have been eaten in three days. If one baguette costs €0.35, how much money is needed for a week (5 days)?'), solution: same('$132\\mathbin{:}3\\cdot 5=220\\ \\to\\ 220\\cdot 0{,}35=77$'), answer: { expected: n(77) } },
            { id: 8, difficulty: 'hard', question: say('80 km/h-ra bidaia batek 2 h 15 min irauten du. Zenbat ordu 90 km/h-ra?', 'A 80 km/h un viaje dura 2 h 15 min. ¿Cuántas horas dura a 90 km/h?', 'تستغرق رحلة 2 س 15 د بسرعة 80 كم/س. كم ساعة تستغرق بسرعة 90 كم/س؟', 'At 80 km/h a trip takes 2 h 15 min. How many hours does it take at 90 km/h?'), solution: same('$80\\cdot 2{,}25=180\\ \\to\\ 180\\mathbin{:}90=2$'), answer: { expected: n(2) } },
            { id: 9, difficulty: 'hard', question: say('1,5 MW-ko errota batek 1250 familia hornitzen ditu. Zenbat familia 6 MW-ko errota batek?', 'Un molino de 1,5 MW abastece a 1250 familias. ¿A cuántas familias abastece uno de 6 MW?', 'طاحونة قدرتها 1.5 ميغاواط تزوّد 1250 أسرة. كم أسرة تزوّد طاحونة قدرتها 6 ميغاواط؟', 'A 1.5 MW wind turbine supplies 1250 families. How many families would a 6 MW one supply?'), solution: same('$\\frac{1250\\cdot 6}{1{,}5}=5000$'), answer: { expected: n(5000) } },
            { id: 10, difficulty: 'hard', question: say('4 lagunek 30 egunerako janaria dute. Beste 2 lagun etortzen badira, zenbat egun iraungo du?', 'Cuatro personas tienen comida para 30 días. Si llegan 2 personas más, ¿cuántos días durará?', 'لدى أربعة أشخاص طعام يكفي 30 يومًا. إذا وصل شخصان آخران، كم يومًا يكفي؟', 'Four people have food for 30 days. If 2 more people arrive, how many days will the food last?'), solution: same('$4\\cdot 30=120\\ \\to\\ 120\\mathbin{:}6=20$'), answer: { expected: n(20) } }
        ]
    },
    {
        id: 'compound',
        title: say('Konposatua eta banaketak', 'Compuesta y repartos', 'المركّب والتوزيعات', 'Compound proportion and sharing'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Horma bat margotzeko: margolari gehiago → egun gehiago ala gutxiago? Eguneko ordu gehiago → egun gehiago ala gutxiago?', 'Para pintar un muro: más pintores → ¿más o menos días? Más horas al día → ¿más o menos días?', 'لدهن جدار: دهّانون أكثر ← أيام أكثر أم أقل؟ ساعات أكثر يوميًا ← أيام أكثر أم أقل؟', 'To paint a wall: more painters → more or fewer days? More hours a day → more or fewer days?'), solution: say('Bietan egun gutxiago: biak alderantzizkoak.', 'En los dos casos, menos días: las dos inversas.', 'في الحالتين أيام أقل: كلاهما عكسي.', 'In both cases, fewer days: both are inverse.') },
            { id: 12, difficulty: 'easy', question: say('3 makinak, egunean 8 ordu, 600 pieza egiten dituzte. Zenbat pieza 6 makinak, egunean 8 ordu?', '3 máquinas, 8 horas al día, fabrican 600 piezas. ¿Cuántas piezas fabrican 6 máquinas, 8 horas al día?', '3 آلات تعمل 8 ساعات يوميًا تصنع 600 قطعة. كم قطعة تصنع 6 آلات تعمل 8 ساعات يوميًا؟', '3 machines, working 8 hours a day, make 600 pieces. How many pieces do 6 machines make, working 8 hours a day?'), solution: same('$600\\cdot\\frac{6}{3}\\cdot\\frac{8}{8}=1200$'), answer: { expected: n(1200) } },
            { id: 13, difficulty: 'medium', question: say('6 langilek, egunean 8 ordu, 15 egunetan bukatzen dute obra bat. Zenbat egun 9 langilek, egunean 10 ordu?', '6 obreros, 8 horas al día, terminan una obra en 15 días. ¿Cuántos días tardan 9 obreros, 10 horas al día?', '6 عمال يعملون 8 ساعات يوميًا ينهون عملًا في 15 يومًا. كم يومًا يحتاج 9 عمال يعملون 10 ساعات يوميًا؟', '6 workers, working 8 hours a day, finish a job in 15 days. How many days do 9 workers take, working 10 hours a day?'), solution: same('$15\\cdot\\frac{6}{9}\\cdot\\frac{8}{10}=8$'), answer: { expected: n(8) } },
            { id: 14, difficulty: 'medium', question: say('8 kamioik 240 t garraiatzen dituzte 3 egunetan. Zenbat tona 12 kamioik 5 egunetan?', '8 camiones transportan 240 t en 3 días. ¿Cuántas toneladas transportan 12 camiones en 5 días?', '8 شاحنات تنقل 240 طنًا في 3 أيام. كم طنًا تنقل 12 شاحنة في 5 أيام؟', '8 lorries carry 240 t in 3 days. How many tonnes do 12 lorries carry in 5 days?'), solution: same('$240\\cdot\\frac{12}{8}\\cdot\\frac{5}{3}=600$'), answer: { expected: n(600) } },
            { id: 15, difficulty: 'medium', question: say('Lorezain batek 120 € kobratzen ditu 250 m²-ri 6 aldiz belarra mozteagatik. 300 m²-ko lursail batean, zenbat aldiz moztuko du 72 €-ren truke?', 'Un jardinero cobra 120 € por seis cortes de césped a 250 m². En una parcela de 300 m², ¿cuántos cortes dará por 72 €?', 'يتقاضى بستاني 120 € مقابل ست قصّات لـ250 م². في قطعة مساحتها 300 م²، كم قصّة يقوم بها مقابل 72 €؟', 'A gardener charges €120 for six lawn cuts on a 250 m² plot. On a 300 m² plot, how many cuts will they do for €72?'), solution: same('$6\\cdot\\frac{72}{120}\\cdot\\frac{250}{300}=3$'), answer: { expected: n(3) } },
            { id: 16, difficulty: 'easy', question: say('Hiru lagunek 10, 15 eta 25 € jarri zituzten loteria batean eta 2000 € irabazi dituzte. Zenbat dagokio 25 € jarri zituenari?', 'Tres amigos pusieron 10, 15 y 25 € en una lotería y han ganado 2000 €. ¿Cuánto le toca al que puso 25 €?', 'وضع ثلاثة أصدقاء 10 و15 و25 € في يانصيب وربحوا 2000 €. كم نصيب من وضع 25 €؟', 'Three friends put in €10, €15 and €25 for a lottery and have won €2000. How much does the friend who put in €25 get?'), solution: same('$2000\\mathbin{:}50=40\\ \\to\\ 25\\cdot 40=1000$'), answer: { expected: n(1000) } },
            { id: 17, difficulty: 'medium', question: say('Banatu 1500 zuzenki proportzionalki 2, 3 eta 5ekiko.', 'Reparte 1500 de forma directamente proporcional a 2, 3 y 5.', 'وزّع 1500 طرديًا على 2 و3 و5.', 'Share 1500 in direct proportion to 2, 3 and 5.'), solution: same('$1500\\mathbin{:}10=150\\ \\to\\ 300,\\ 450,\\ 750$') },
            { id: 18, difficulty: 'hard', question: say('Banatu 1240 alderantziz proportzionalki 2, 3 eta 5ekiko. Zein da zati txikiena?', 'Reparte 1240 de forma inversamente proporcional a 2, 3 y 5. ¿Cuál es la parte menor?', 'وزّع 1240 عكسيًا على 2 و3 و5. ما الجزء الأصغر؟', 'Share 1240 in inverse proportion to 2, 3 and 5. What is the smallest share?'), solution: same('$\\frac{15}{30},\\frac{10}{30},\\frac{6}{30}\\ \\to\\ 1240\\mathbin{:}31=40\\ \\to\\ 600,\\ 400,\\ 240$'), answer: { expected: n(240) } },
            { id: 19, difficulty: 'hard', question: say('72 000 €-ko herentzia bat 12, 15 eta 21 urteko hiru anaien artean banatzen da, adinarekiko zuzenki. Zenbat jasotzen du zaharrenak?', 'Una herencia de 72 000 € se reparte entre tres hermanos de 12, 15 y 21 años de forma directamente proporcional a la edad. ¿Cuánto recibe el mayor?', 'تُوزَّع تركة قدرها 72000 € على ثلاثة إخوة أعمارهم 12 و15 و21 سنة طرديًا مع العمر. كم يأخذ الأكبر؟', 'An inheritance of €72,000 is shared among three siblings aged 12, 15 and 21 in direct proportion to their age. How much does the oldest receive?'), solution: same('$72\\,000\\mathbin{:}48=1500\\ \\to\\ 21\\cdot 1500=31\\,500$'), answer: { expected: n(31500) } },
            { id: 20, difficulty: 'hard', question: say('Gidari batek ibilbide bera 50, 100 eta 80 km/h-ra egin du, 255 minutu guztira. Zenbat minutu ibilgailu astunean (50 km/h)?', 'Un conductor ha hecho el mismo trayecto a 50, 100 y 80 km/h, 255 minutos en total. ¿Cuántos minutos con el vehículo pesado (50 km/h)?', 'قطع سائق المسار نفسه بسرعة 50 و100 و80 كم/س في 255 دقيقة إجمالًا. كم دقيقة بالمركبة الثقيلة (50 كم/س)؟', 'A driver has made the same trip at 50, 100 and 80 km/h, and the total time was 255 minutes. How many minutes did the heavy vehicle (50 km/h) take?'), solution: same('$\\frac{1}{50}+\\frac{1}{100}+\\frac{1}{80}=\\frac{17}{400}\\ \\to\\ 255\\mathbin{:}\\frac{17}{400}=6000\\ \\to\\ 6000\\mathbin{:}50=120$'), answer: { expected: n(120) } }
        ]
    },
    {
        id: 'percent',
        title: say('Ehunekoak', 'Porcentajes', 'النسب المئوية', 'Percentages'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Kalkulatu buruz: 500en % 10 eta 280ren % 75.', 'Calcula mentalmente: el 10 % de 500 y el 75 % de 280.', 'احسب ذهنيًا: 10٪ من 500 و75٪ من 280.', 'Work out in your head: 10% of 500 and 75% of 280.'), solution: same('$500\\cdot 0{,}1=50\\qquad 280\\cdot 0{,}75=210$') },
            { id: 22, difficulty: 'easy', question: say('Idatzi hamartar gisa: % 82, % 9, % 0,4.', 'Escribe como decimal: 82 %, 9 %, 0,4 %.', 'اكتب عددًا عشريًا: 82٪، 9٪، 0.4٪.', 'Write as decimals: 82%, 9%, 0.4%.'), solution: same('$0{,}82\\qquad 0{,}09\\qquad 0{,}004$') },
            { id: 23, difficulty: 'easy', question: say('Nekazari batek 40 ha ditu: % 65 garagarra, % 15 garia eta gainerakoa olo. Zenbat hektarea olo?', 'Un agricultor tiene 40 ha: el 65 % de cebada, el 15 % de trigo y el resto de avena. ¿Cuántas hectáreas de avena?', 'لدى مزارع 40 هكتارًا: 65٪ شعير و15٪ قمح والباقي شوفان. كم هكتارًا من الشوفان؟', 'A farmer has 40 ha: 65% barley, 15% wheat and the rest oats. How many hectares of oats?'), solution: same('$100-65-15=20\\ \\to\\ 40\\cdot 0{,}2=8$'), answer: { expected: n(8) } },
            { id: 24, difficulty: 'medium', question: say('$T$-ren % 24 = 156. Zenbat da $T$?', 'El 24 % de $T$ es 156. ¿Cuánto vale $T$?', '24٪ من $T$ تساوي 156. كم قيمة $T$؟', '24% of $T$ is 156. What is the value of $T$?'), solution: same('$T=156\\mathbin{:}0{,}24=650$'), answer: { expected: n(650) } },
            { id: 25, difficulty: 'medium', question: say('1800en % $P$ = 27. Zenbat da $P$?', 'El $P$ % de 1800 es 27. ¿Cuánto vale $P$?', '$P$٪ من 1800 تساوي 27. كم قيمة $P$؟', '$P$% of 1800 is 27. What is the value of $P$?'), solution: same('$27\\mathbin{:}1800\\cdot 100=1{,}5$'), answer: { expected: v('1,5') } },
            { id: 26, difficulty: 'medium', question: say('Informatika-denda batean dena % 7 garestitu da. Ordenagailu batek 840 € balio zuen. Zenbat orain?', 'En una tienda de informática han subido todo un 7 %. Un ordenador valía 840 €. ¿Cuánto vale ahora?', 'رفع متجر حواسيب كل الأسعار 7٪. كان ثمن حاسوب 840 €. كم ثمنه الآن؟', 'In a computer shop, all prices have gone up by 7%. A computer used to cost €840. How much does it cost now?'), solution: same('$840\\cdot 1{,}07=898{,}8$'), answer: { expected: v('898,8') } },
            { id: 27, difficulty: 'medium', question: say('Jatetxe bateko kontua 360 € da BEZik gabe. % 10eko BEZarekin, zenbat ordainduko dute?', 'La cuenta de un restaurante es de 360 € sin IVA. Con un IVA del 10 %, ¿cuánto pagarán?', 'فاتورة مطعم 360 € بدون ضريبة. مع ضريبة 10٪، كم يدفعون؟', 'A restaurant bill is €360 before VAT. With 10% VAT, how much will they pay?'), solution: same('$360\\cdot 1{,}1=396$'), answer: { expected: n(396) } },
            { id: 28, difficulty: 'hard', question: say('Herri batek 25 000 biztanle zituen. % 18 hazi zen eta gero % 25. Zenbat biztanle ditu?', 'Un pueblo tenía 25 000 habitantes. Creció un 18 % y luego un 25 %. ¿Cuántos habitantes tiene?', 'كان في قرية 25000 نسمة. زاد عددهم 18٪ ثم 25٪. كم نسمة الآن؟', 'A village had 25,000 inhabitants. It grew by 18% and then by 25%. How many inhabitants does it have now?'), solution: same('$25\\,000\\cdot 1{,}18\\cdot 1{,}25=36\\,875$'), answer: { expected: n(36875) } },
            { id: 29, difficulty: 'hard', question: say('Urtegi bateko ura % 27 igo zen lehen hiruhilekoan eta % 11 bigarrenean. Zer ehuneko igo zen seihilekoan?', 'El agua de un pantano subió un 27 % el primer trimestre y un 11 % el segundo. ¿En qué porcentaje subió en el semestre?', 'ارتفع ماء سدّ 27٪ في الربع الأول و11٪ في الثاني. بأي نسبة ارتفع في نصف السنة؟', 'The water in a reservoir rose 27% in the first quarter and 11% in the second. By what percentage did it rise over the six months?'), solution: same('$1{,}27\\cdot 1{,}11=1{,}4097\\ \\to\\ 140{,}97-100=40{,}97$'), answer: { expected: v('40,97') } },
            { id: 30, difficulty: 'hard', question: say('8 m-ko altueratik jaurtitako baloi batek altueraren % 60 galtzen du bote bakoitzean. Zenbat cm igotzen da hirugarren botearen ondoren?', 'Un balón lanzado desde 8 m pierde el 60 % de la altura en cada bote. ¿Cuántos cm sube después del tercer bote?', 'كرة أُطلقت من ارتفاع 8 م تفقد 60٪ من ارتفاعها في كل ارتداد. كم سنتيمترًا ترتفع بعد الارتداد الثالث؟', 'A ball dropped from 8 m loses 60% of its height with each bounce. How many cm does it rise after the third bounce?'), solution: same('$800\\cdot 0{,}4^{3}=51{,}2$'), answer: { expected: v('51,2') } }
        ]
    },
    {
        id: 'interest',
        title: say('Interes bakuna eta konposatua', 'Interés simple y compuesto', 'الفائدة البسيطة والمركّبة', 'Simple and compound interest'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Zer interes bakun sortzen dute 2000 €-k % 5ean 3 urtez?', '¿Qué interés simple producen 2000 € al 5 % durante 3 años?', 'ما الفائدة البسيطة التي تُنتجها 2000 € بنسبة 5٪ مدة 3 سنوات؟', 'What simple interest do €2000 earn at 5% for 3 years?'), solution: same('$\\frac{2000\\cdot 5\\cdot 3}{100}=300$'), answer: { expected: n(300) } },
            { id: 32, difficulty: 'easy', question: say('2000 € % 3,5ean urtebetez. Zenbat diru amaieran?', '2000 € al 3,5 % durante un año. ¿Cuánto dinero al final?', '2000 € بفائدة 3.5٪ مدة سنة. كم يصبح المبلغ؟', '€2000 at 3.5% for one year. How much money is there at the end?'), solution: same('$2000\\cdot 1{,}035=2070$'), answer: { expected: n(2070) } },
            { id: 33, difficulty: 'easy', question: say('Zergatik ematen du interes konposatuak bakunak baino gehiago urte bat baino gehiagotan?', '¿Por qué el interés compuesto da más que el simple cuando hay más de un año?', 'لماذا تعطي الفائدة المركّبة أكثر من البسيطة عندما تزيد المدة على سنة؟', 'Why does compound interest give more than simple interest when there is more than one year?'), solution: say('Konposatuan urte bakoitzeko interesa kapitalari gehitzen zaio eta hurrengo urtean hark ere interesa sortzen du; bakunean beti hasierako kapitalak bakarrik.', 'En el compuesto el interés de cada año se suma al capital y al año siguiente también produce interés; en el simple solo lo produce el capital inicial.', 'في المركّبة تُضاف فائدة كل سنة إلى رأس المال فتُنتج هي أيضًا فائدة في السنة التالية؛ أما في البسيطة فيُنتجها رأس المال الأصلي وحده.', 'With compound interest, each year\'s interest is added to the capital and earns interest the following year too; with simple interest, only the initial capital earns interest.') },
            { id: 34, difficulty: 'medium', question: say('Zer interes sortzen dute 9000 €-k % 4an 90 egunez, interes bakunean?', '¿Qué interés producen 9000 € al 4 % durante 90 días, a interés simple?', 'ما الفائدة البسيطة التي تُنتجها 9000 € بنسبة 4٪ مدة 90 يومًا؟', 'What simple interest do €9000 earn at 4% for 90 days?'), solution: same('$\\frac{9000\\cdot 4\\cdot 90}{36\\,000}=90$'), answer: { expected: n(90) } },
            { id: 35, difficulty: 'medium', question: say('4000 € % 5ean interes konposatuan 2 urtez. Zenbat amaieran?', '4000 € al 5 % de interés compuesto durante 2 años. ¿Cuánto al final?', '4000 € بفائدة مركّبة 5٪ مدة سنتين. كم في النهاية؟', '€4000 at 5% compound interest for 2 years. How much will it be at the end?'), solution: same('$4000\\cdot 1{,}05^{2}=4410$'), answer: { expected: n(4410) } },
            { id: 36, difficulty: 'medium', question: say('2000 € % 10ean interes konposatuan 3 urtez. Zenbat amaieran? Eta interes bakunean?', '2000 € al 10 % de interés compuesto durante 3 años. ¿Cuánto al final? ¿Y a interés simple?', '2000 € بفائدة مركّبة 10٪ مدة 3 سنوات. كم في النهاية؟ وبالفائدة البسيطة؟', '€2000 at 10% compound interest for 3 years. How much will it be at the end? And with simple interest?'), solution: same('$2000\\cdot 1{,}1^{3}=2662\\qquad 2000+\\frac{2000\\cdot 10\\cdot 3}{100}=2600$'), answer: { expected: n(2662) } },
            { id: 37, difficulty: 'medium', question: say('Banku batek % 6 ordaintzen du urtean. 20 000 € jarri, urtebete itxaron, 10 000 € gehitu eta beste urtebete. Zenbat diru amaieran?', 'Un banco paga el 6 % anual. Se ponen 20 000 €, se espera un año, se añaden 10 000 € y otro año. ¿Cuánto dinero al final?', 'يدفع مصرف 6٪ سنويًا. نودع 20000 € وننتظر سنة ثم نضيف 10000 € وننتظر سنة أخرى. كم يصبح المبلغ؟', 'A bank pays 6% a year. You put in €20,000, wait one year, add €10,000 and wait another year. How much money is there at the end?'), solution: same('$20\\,000\\cdot 1{,}06+10\\,000=31\\,200\\ \\to\\ 31\\,200\\cdot 1{,}06=33\\,072$'), answer: { expected: n(33072) } },
            { id: 38, difficulty: 'hard', question: say('14 000 € % 2,4an 12 urtez, interesak lauhilekoz metatuz. Zenbat amaieran? Biribildu zentimoetara.', '14 000 € al 2,4 % durante 12 años, con intereses cuatrimestrales. ¿Cuánto al final? Redondea a los céntimos.', '14000 € بفائدة 2.4٪ مدة 12 سنة، مع إضافة الفوائد كل أربعة أشهر. كم في النهاية؟ قرّب إلى السنتات.', '€14,000 at 2.4% for 12 years, with interest added every four months. How much will it be at the end? Round to the nearest cent.'), solution: same('$14\\,000\\cdot\\left(1+\\frac{2{,}4}{300}\\right)^{36}\\approx 18\\,651{,}22$'), answer: { expected: v('18651,22') } },
            { id: 39, difficulty: 'hard', question: say('Kapital bat % 3an jarri zen interes konposatuan 4 urtez eta 13 506,10 € bihurtu zen. Zenbat zen kapitala? Biribildu unitatera.', 'Un capital se colocó al 3 % de interés compuesto durante 4 años y se convirtió en 13 506,10 €. ¿Cuál era el capital? Redondea a las unidades.', 'أُودع رأس مال بفائدة مركّبة 3٪ مدة 4 سنوات فصار 13506.10 €. كم كان رأس المال؟ قرّب إلى الوحدات.', 'A capital was invested at 3% compound interest for 4 years and became €13,506.10. What was the original capital? Round to the nearest euro.'), solution: same('$13\\,506{,}10\\mathbin{:}1{,}03^{4}\\approx 12\\,000$'), answer: { expected: n(12000) } },
            { id: 40, difficulty: 'hard', question: say('10 000 € 13 000 € bihurtu dira 5 urtean, interes konposatuan. Zer urteko ehuneko ordaintzen du bankuak? Biribildu hamarrenetara.', '10 000 € se han convertido en 13 000 € en 5 años, a interés compuesto. ¿Qué tanto por ciento anual paga el banco? Redondea a las décimas.', 'صارت 10000 € بعد 5 سنوات 13000 € بفائدة مركّبة. ما النسبة السنوية التي يدفعها المصرف؟ قرّب إلى الأعشار.', '€10,000 has grown to €13,000 in 5 years, at compound interest. What annual percentage does the bank pay? Round to one decimal place.'), solution: same('$\\sqrt[5]{1{,}3}\\approx 1{,}054\\ \\to\\ 5{,}4$'), answer: { expected: v('5,4') } }
        ]
    },
    {
        id: 'problems',
        title: say('Beste problema aritmetiko batzuk', 'Otros problemas aritméticos', 'مسائل حسابية أخرى', 'Other arithmetic problems'),
        items: [
            { id: 41, difficulty: 'easy', question: say('1 kg kafe 10 €-an eta 1 kg 6 €-an nahasten dira. Zein da nahasketaren prezioa (€/kg)?', 'Se mezclan 1 kg de café a 10 € y 1 kg a 6 €. ¿Cuál es el precio de la mezcla (€/kg)?', 'نخلط 1 كغ من البن بـ10 € و1 كغ بـ6 €. ما سعر الخليط (€/كغ)؟', '1 kg of coffee at €10 and 1 kg at €6 are mixed. What is the price of the mixture (€/kg)?'), solution: same('$\\frac{10+6}{2}=8$'), answer: { expected: n(8) } },
            { id: 42, difficulty: 'easy', question: say('Bi auto 300 km-ra daude eta elkarrengana doaz, 70 eta 80 km/h-ra. Zenbat ordu behar dute gurutzatzeko?', 'Dos coches están a 300 km y van uno hacia el otro a 70 y 80 km/h. ¿Cuántas horas tardan en cruzarse?', 'سيارتان تفصل بينهما 300 كم وتتجه كل منهما نحو الأخرى بسرعة 70 و80 كم/س. كم ساعة حتى تتقاطعا؟', 'Two cars are 300 km apart and are driving towards each other at 70 and 80 km/h. How many hours will they take to pass each other?'), solution: same('$300\\mathbin{:}(70+80)=2$'), answer: { expected: n(2) } },
            { id: 43, difficulty: 'easy', question: say('Txorrota batek biltegia 4 orduan betetzen du. Biltegiaren zer zati betetzen du ordu batean?', 'Un grifo llena un depósito en 4 horas. ¿Qué parte del depósito llena en una hora?', 'يملأ صنبور خزانًا في 4 ساعات. ما الجزء الذي يملؤه في ساعة؟', 'A tap fills a tank in 4 hours. What fraction of the tank does it fill in one hour?'), solution: same('$\\frac{1}{4}=0{,}25$'), answer: { expected: fraction(1, 4) } },
            { id: 44, difficulty: 'medium', question: say('Ur litro batek 999,2 g pisatzen ditu eta alkohol litro batek 794,7 g. 3 l ur eta 7 l alkohol nahasten dira. Zenbat gramo pisatzen du nahasketaren litro batek?', 'Un litro de agua pesa 999,2 g y uno de alcohol 794,7 g. Se mezclan 3 l de agua y 7 l de alcohol. ¿Cuántos gramos pesa un litro de la mezcla?', 'يزن لتر الماء 999.2 غ ولتر الكحول 794.7 غ. نخلط 3 ل من الماء و7 ل من الكحول. كم غرامًا يزن لتر الخليط؟', 'One litre of water weighs 999.2 g and one litre of alcohol weighs 794.7 g. 3 l of water and 7 l of alcohol are mixed. How many grams does one litre of the mixture weigh?'), solution: same('$\\frac{3\\cdot 999{,}2+7\\cdot 794{,}7}{10}=\\frac{8560{,}5}{10}=856{,}05$'), answer: { expected: v('856,05') } },
            { id: 45, difficulty: 'medium', question: say('Zenbat kg kafe on (15 €/kg) nahastu behar dira 100 kg kafe txarragorekin (9,50 €/kg), nahasketa 12,50 €/kg izateko?', '¿Cuántos kg de café superior (15 €/kg) hay que mezclar con 100 kg de otro peor (9,50 €/kg) para que la mezcla salga a 12,50 €/kg?', 'كم كيلوغرامًا من البن الجيد (15 €/كغ) يجب خلطها مع 100 كغ من بن أقل جودة (9.50 €/كغ) ليكون سعر الخليط 12.50 €/كغ؟', 'How many kg of top-quality coffee (€15/kg) must be mixed with 100 kg of a lower-quality one (€9.50/kg) so that the mixture comes out at €12.50/kg?'), solution: same('$15x+950=12{,}5\\cdot(100+x)\\ \\to\\ 2{,}5x=300\\ \\to\\ x=120$'), answer: { expected: n(120) } },
            { id: 46, difficulty: 'medium', question: say('2 kg urre 0,85eko legearekin eta 1,5 kg 0,9ko legearekin urtzen dira. Zein da lingote berriaren legea? Biribildu ehunenetara.', 'Se funden 2 kg de oro de ley 0,85 con 1,5 kg de ley 0,9. ¿Cuál es la ley del nuevo lingote? Redondea a las centésimas.', 'تُصهر 2 كغ من ذهب عياره 0.85 مع 1.5 كغ عياره 0.9. ما عيار السبيكة الجديدة؟ قرّب إلى الأجزاء من مئة.', '2 kg of gold with a fineness of 0.85 are melted with 1.5 kg of fineness 0.9. What is the fineness of the new ingot? Round to two decimal places.'), solution: same('$\\frac{0{,}85\\cdot 2+0{,}9\\cdot 1{,}5}{3{,}5}=\\frac{3{,}05}{3{,}5}\\approx 0{,}87$'), answer: { expected: v('0,87') } },
            { id: 47, difficulty: 'medium', question: say('Julián eta Cristina 3,2 km-ra bizi dira eta elkarrengana ateratzen dira. Juliánek 70 m/min oinez eta 10 minututan elkartzen dira. Zer abiaduratan (m/min) zihoan Cristina bizikletaz?', 'Julián y Cristina viven a 3,2 km y salen uno al encuentro del otro. Julián va a pie a 70 m/min y se encuentran en 10 minutos. ¿A qué velocidad (m/min) iba Cristina en bici?', 'يسكن خوليان وكريستينا على بعد 3.2 كم وينطلق كل منهما نحو الآخر. يمشي خوليان 70 م/د ويلتقيان بعد 10 دقائق. ما سرعة كريستينا على الدراجة (م/د)؟', 'Julián and Cristina live 3.2 km apart and set off towards each other. Julián walks at 70 m/min and they meet after 10 minutes. What speed (m/min) was Cristina cycling at?'), solution: same('$3200-70\\cdot 10=2500\\ \\to\\ 2500\\mathbin{:}10=250$'), answer: { expected: n(250) } },
            { id: 48, difficulty: 'hard', question: say('A trena 9:00etan ateratzen da 80 km/h-ra. B trena geltoki beretik 10:00etan, norabide berean, 120 km/h-ra. B atera eta zenbat ordura harrapatzen du A?', 'El tren A sale a las 9:00 a 80 km/h. El B sale de la misma estación a las 10:00, en el mismo sentido, a 120 km/h. ¿Cuántas horas después de salir B alcanza a A?', 'ينطلق القطار أ الساعة 9:00 بسرعة 80 كم/س. وينطلق ب من المحطة نفسها الساعة 10:00 في الاتجاه نفسه بسرعة 120 كم/س. بعد كم ساعة من انطلاق ب يلحق بأ؟', 'Train A leaves at 9:00 at 80 km/h. Train B leaves the same station at 10:00, in the same direction, at 120 km/h. How many hours after B leaves does it catch up with A?'), solution: same('$80\\cdot 1=80\\ \\to\\ 80\\mathbin{:}(120-80)=2$'), answer: { expected: n(2) } },
            { id: 49, difficulty: 'hard', question: say('Bainuontzi bat ur hotzarekin 8 minututan betetzen da, beroarekin 12tan, eta hustubideak 4 minututan husten du. Bi txorrotak ireki eta tapoia jartzea ahazten bada, zer gertatzen da?', 'Una bañera se llena con agua fría en 8 minutos y con caliente en 12, y el desagüe la vacía en 4. Si se abren los dos grifos y se olvida el tapón, ¿qué ocurre?', 'يمتلئ حوض بالماء البارد في 8 دقائق وبالساخن في 12، ويفرغه المصرف في 4. إذا فُتح الصنبوران ونُسيت السدادة، فماذا يحدث؟', 'A bath fills with cold water in 8 minutes and with hot water in 12, and the drain empties it in 4 minutes. If both taps are turned on and the plug is left out, what happens?'), solution: say('Minutu batean $\\frac{1}{8}+\\frac{1}{12}=\\frac{5}{24}$ sartzen da eta $\\frac{1}{4}=\\frac{6}{24}$ ateratzen: ez da inoiz beteko.', 'En un minuto entran $\\frac{1}{8}+\\frac{1}{12}=\\frac{5}{24}$ y salen $\\frac{1}{4}=\\frac{6}{24}$: no se llenará nunca.', 'في الدقيقة يدخل $\\frac{1}{8}+\\frac{1}{12}=\\frac{5}{24}$ ويخرج $\\frac{1}{4}=\\frac{6}{24}$: لن يمتلئ أبدًا.', 'In one minute, $\\frac{1}{8}+\\frac{1}{12}=\\frac{5}{24}$ comes in and $\\frac{1}{4}=\\frac{6}{24}$ goes out: it will never fill up.') },
            { id: 50, difficulty: 'hard', question: say('Margolari batek gela bat 6 orduan margotzen du eta beste batek 3 orduan. Zenbat ordu biek batera?', 'Un pintor pinta una habitación en 6 horas y otro en 3 horas. ¿Cuántas horas tardan juntos?', 'يدهن دهّان غرفة في 6 ساعات وآخر في 3 ساعات. كم ساعة يحتاجان معًا؟', 'One painter paints a room in 6 hours and another in 3 hours. How many hours do they take working together?'), solution: same('$\\frac{1}{6}+\\frac{1}{3}=\\frac{1}{2}\\ \\to\\ 2$'), answer: { expected: n(2) } }
        ]
    }
]

import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistika eta probabilitatea · 4. DBH aplikatuak — diagnostic, guided
   practice, exercise bank and challenges. Exercises follow Anaya Aplicadas
   units 11–13 and Santillana Aplicadas unit 9 (the spelling dictation, the
   newborn weights, the cars of 25 families, the 14 heights, the two firms,
   the long jumpers, the sunshine and temperature, the atmospheric
   pressure, the opaque bottle, the drawing pins, the cards without
   replacement, the glasses and blood-group tables). Every closed answer is
   a single number or a fraction.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })
/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

const HUNDREDTHS = say('Hurbildu ehunenetara.', 'Aproxima a las centésimas.', 'قرّب إلى الأجزاء من مئة.')
const AS_FRACTION = say('Eman zatiki gisa.', 'Dalo como fracción.', 'اكتبه كسرًا.')
/** A prompt followed by an instruction (rounding, fraction) */
const with_ = (prompt: LocalizedText, ...rules: LocalizedText[]): LocalizedText => ({
    eu: [prompt.eu, ...rules.map((rule) => rule.eu)].join(' '),
    es: [prompt.es, ...rules.map((rule) => rule.es)].join(' '),
    ar: [prompt.ar, ...rules.map((rule) => rule.ar)].join(' ')
})

/** The cars table of the lessons */
const CARS = say('25 familiaren autoak: 0 → 3 familia, 1 → 12, 2 → 4, 3 → 4, 4 → 2.', 'Coches de 25 familias: 0 → 3 familias, 1 → 12, 2 → 4, 3 → 4, 4 → 2.', 'سيارات 25 أسرة: 0 ← 3 أسر، 1 ← 12، 2 ← 4، 3 ← 4، 4 ← 2.')
/** The spelling dictation of Anaya */
const SPELLING = say('Diktaketa bateko akatsak: 0 → 12 ikasle, 1 → 9, 2 → 7, 3 → 6, 4 → 3, 5 → 3.', 'Faltas en un dictado: 0 → 12 alumnos, 1 → 9, 2 → 7, 3 → 6, 4 → 3, 5 → 3.', 'أخطاء في إملاء: 0 ← 12 تلميذًا، 1 ← 9، 2 ← 7، 3 ← 6، 4 ← 3، 5 ← 3.')
/** The glasses table of Anaya */
const GLASSES = say('Ikastetxe bateko 1000 ikasleetatik, mutilak 600 dira (187 betaurrekoekin) eta neskak 400 (113 betaurrekoekin).', 'De los 1000 alumnos de un centro, 600 son chicos (187 con gafas) y 400 chicas (113 con gafas).', 'من 1000 تلميذ في مدرسة، 600 أولاد (187 بنظارات) و400 بنات (113 بنظارات).')

export const statisticsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 4901,
        prompt: say('Fabrika batek pilek zenbat irauten duten aztertu nahi du. Zer erabili behar du?', 'Una fábrica quiere estudiar cuánto duran sus pilas. ¿Qué debe usar?', 'يريد مصنع دراسة مدة بطارياته. ماذا يجب أن يستعمل؟'),
        options: [say('Pila guztiak, populazio osoa', 'Todas las pilas, toda la población', 'كل البطاريات، المجتمع كله'), say('Lagin bat, azterketak pilak agortzen dituelako', 'Una muestra, porque el estudio gasta las pilas', 'عيّنة، لأن الدراسة تستهلك البطاريات'), say('Pila hoberenak bakarrik', 'Solo las mejores pilas', 'أفضل البطاريات فقط')],
        correctIndex: 1,
        explanation: say('Pila guztiak aztertuz gero, ez litzateke bat ere geratuko saltzeko: zoriz aukeratutako lagin bat behar da.', 'Si se estudiaran todas, no quedaría ninguna para vender: hace falta una muestra elegida al azar.', 'لو دُرست كلها لما بقيت بطارية للبيع: نحتاج إلى عيّنة عشوائية.'),
        topic: 'sampling'
    },
    {
        id: 4902,
        prompt: say('Datuak 12tik 41era doaz eta 6 tartetan antolatu nahi dira. Zein zabalera?', 'Los datos van de 12 a 41 y se quieren organizar en 6 intervalos. ¿Qué amplitud?', 'تمتد البيانات من 12 إلى 41 ونريد تنظيمها في 6 فئات. ما طول الفئة؟'),
        options: [same('$5$'), same('$6$'), same('$29$')],
        correctIndex: 0,
        explanation: say('Ibiltartea $41-12=29$; 6z zatigarria den hurrengoa 30 da: $30:6=5$.', 'Recorrido $41-12=29$; el siguiente divisible entre 6 es 30: $30:6=5$.', 'المدى $41-12=29$؛ والتالي القابل للقسمة على 6 هو 30: $30:6=5$.'),
        topic: 'intervals'
    },
    {
        id: 4903,
        prompt: with_(CARS, say('Zein da batez bestekoa?', '¿Cuál es la media?', 'ما المتوسط؟')),
        options: [same('$2$'), same('$1{,}6$'), same('$1$')],
        correctIndex: 1,
        explanation: same('$\\frac{0\\cdot 3+1\\cdot 12+2\\cdot 4+3\\cdot 4+4\\cdot 2}{25}=1{,}6$'),
        topic: 'central'
    },
    {
        id: 4904,
        prompt: say('Zein parametro da 75 pertzentila?', '¿Qué parámetro es el percentil 75?', 'أي مقياس هو المئين 75؟'),
        options: [same('$Q_1$'), same('$\\text{Me}$'), same('$Q_3$')],
        correctIndex: 2,
        explanation: say('$Q_3$-ren azpian datuen % 75 dago: $Q_3=p_{75}$.', 'Por debajo de $Q_3$ está el 75 % de los datos: $Q_3=p_{75}$.', 'تحت $Q_3$ يقع 75 % من البيانات: $Q_3=p_{75}$.'),
        topic: 'percentiles'
    },
    {
        id: 4905,
        prompt: say('Zer da desbideratze tipikoa?', '¿Qué es la desviación típica?', 'ما الانحراف المعياري؟'),
        options: [say('Bariantzaren erro karratua', 'La raíz cuadrada de la varianza', 'الجذر التربيعي للتباين'), say('Batez bestekoarekiko distantzien batez bestekoa', 'La media de las distancias a la media', 'متوسط المسافات عن المتوسط'), say('Bariantzaren karratua', 'El cuadrado de la varianza', 'مربع التباين')],
        correctIndex: 0,
        explanation: say('$\\sigma=\\sqrt{\\sigma^2}$, datuen unitate berean. Distantzien batez bestekoa batez besteko desbideratzea da.', '$\\sigma=\\sqrt{\\sigma^2}$, en las mismas unidades que los datos. La media de las distancias es la desviación media.', '$\\sigma=\\sqrt{\\sigma^2}$، بوحدات البيانات نفسها. ومتوسط المسافات هو الانحراف المتوسط.'),
        topic: 'variance'
    },
    {
        id: 4906,
        prompt: say('Bi aldagairen korrelazio-koefizientea $r=-0{,}95$ da. Zer esan nahi du?', 'El coeficiente de correlación de dos variables es $r=-0{,}95$. ¿Qué significa?', 'معامل ارتباط متغيرين $r=-0{,}95$. ماذا يعني؟'),
        options: [say('Korrelazio positibo sendoa', 'Correlación positiva fuerte', 'ارتباط موجب قوي'), say('Korrelazio negatibo sendoa', 'Correlación negativa fuerte', 'ارتباط سالب قوي'), say('Ez dago erlaziorik', 'No hay relación', 'لا توجد علاقة')],
        correctIndex: 1,
        explanation: say('Zeinu negatiboa: bata handitzean bestea txikitzen da. $|r|$ 1etik hurbil: sendoa.', 'Signo negativo: al aumentar una, la otra disminuye. $|r|$ cerca de 1: fuerte.', 'إشارة سالبة: عندما يزداد أحدهما ينقص الآخر. و$|r|$ قريب من 1: قوي.'),
        topic: 'correlation'
    },
    {
        id: 4907,
        prompt: say('A eta B bateraezinak dira, $P(A)=0{,}3$ eta $P(B)=0{,}4$. Zenbat da $P(A\\cup B)$?', 'A y B son incompatibles, $P(A)=0{,}3$ y $P(B)=0{,}4$. ¿Cuánto vale $P(A\\cup B)$?', 'A وB متنافيان، $P(A)=0{,}3$ و$P(B)=0{,}4$. كم يساوي $P(A\\cup B)$؟'),
        options: [same('$0{,}12$'), same('$0{,}1$'), same('$0{,}7$')],
        correctIndex: 2,
        explanation: say('Bateraezinak: ez dute zati komunik, batu besterik ez: $0{,}3+0{,}4=0{,}7$.', 'Incompatibles: no tienen parte común, basta sumar: $0{,}3+0{,}4=0{,}7$.', 'متنافيان: لا جزء مشترك، يكفي الجمع: $0{,}3+0{,}4=0{,}7$.'),
        topic: 'laplace'
    },
    {
        id: 4908,
        prompt: say('Bi txanpon botatzen dira. Zein da bi aurpegi ateratzeko probabilitatea?', 'Se lanzan dos monedas. ¿Cuál es la probabilidad de sacar dos caras?', 'تُرمى قطعتا نقود. ما احتمال ظهور وجهين؟'),
        options: [same('$\\frac{1}{2}$'), same('$\\frac{1}{4}$'), same('$\\frac{1}{3}$')],
        correctIndex: 1,
        explanation: say('Independenteak: $\\frac{1}{2}\\cdot\\frac{1}{2}=\\frac{1}{4}$. Lau emaitza daude, ez hiru.', 'Independientes: $\\frac{1}{2}\\cdot\\frac{1}{2}=\\frac{1}{4}$. Hay cuatro resultados, no tres.', 'مستقلتان: $\\frac{1}{2}\\cdot\\frac{1}{2}=\\frac{1}{4}$. هناك أربع نتائج لا ثلاث.'),
        topic: 'compound'
    }
]

export const statisticsPractice: PracticeItem[] = [
    /* ---------- Data and graphs ---------- */
    {
        id: 1, stage: 'data',
        prompt: say('Datu txikiena 23 da eta handiena 61. Zein da ibiltartea?', 'El dato menor es 23 y el mayor 61. ¿Cuál es el recorrido?', 'أصغر بيان 23 وأكبرها 61. ما المدى؟'),
        expected: n(38),
        hint: say('Handiena ken txikiena.', 'El mayor menos el menor.', 'الأكبر ناقص الأصغر.'),
        explanation: same('$61-23=38$')
    },
    {
        id: 2, stage: 'data',
        prompt: say('Ibiltartea 47 da eta 8 tarte egin nahi dira. Zein zabalera izango dute?', 'El recorrido es 47 y se quieren hacer 8 intervalos. ¿Qué amplitud tendrán?', 'المدى 47 ونريد 8 فئات. ما طول كل فئة؟'),
        expected: n(6),
        hint: say('Bilatu 47 baino handiagoa eta 8z zatigarria den zenbakia.', 'Busca un número mayor que 47 y divisible entre 8.', 'ابحث عن عدد أكبر من 47 يقبل القسمة على 8.'),
        explanation: same('$r\'=48\\qquad 48:8=6$')
    },
    {
        id: 3, stage: 'data',
        prompt: say('Zein da $[152{,}5;\\ 157{,}5)$ tartearen klase-marka?', '¿Cuál es la marca de clase del intervalo $[152{,}5;\\ 157{,}5)$?', 'ما مركز الفئة $[152{,}5;\\ 157{,}5)$؟'),
        expected: n(155),
        hint: say('Muturren batura zati 2.', 'La suma de los extremos entre 2.', 'مجموع الطرفين على 2.'),
        explanation: same('$\\frac{152{,}5+157{,}5}{2}=155$')
    },
    {
        id: 4, stage: 'data',
        prompt: say('Balio baten maiztasun erlatiboa 0,15 da. Zenbat gradu ditu haren sektoreak?', 'La frecuencia relativa de un valor es 0,15. ¿Cuántos grados mide su sector?', 'التكرار النسبي لقيمة 0.15. كم درجة قطاعها؟'),
        expected: n(54),
        hint: say('Angelua: $h_i\\cdot 360^{\\circ}$.', 'Ángulo: $h_i\\cdot 360^{\\circ}$.', 'الزاوية: $h_i\\cdot 360^{\\circ}$.'),
        explanation: same('$0{,}15\\cdot 360=54$')
    },

    /* ---------- Centralization and position ---------- */
    {
        id: 5, stage: 'centre',
        prompt: say('Datu multzokatuak: $[0,10)$ 4, $[10,20)$ 10, $[20,30)$ 6. Kalkulatu batez bestekoa.', 'Datos agrupados: $[0,10)$ 4, $[10,20)$ 10, $[20,30)$ 6. Calcula la media.', 'بيانات مبوّبة: $[0,10)$ 4، $[10,20)$ 10، $[20,30)$ 6. احسب المتوسط.'),
        expected: n(16),
        hint: say('Klase-markak: 5, 15, 25.', 'Marcas de clase: 5, 15, 25.', 'مراكز الفئات: 5، 15، 25.'),
        explanation: same('$\\frac{5\\cdot 4+15\\cdot 10+25\\cdot 6}{20}=16$')
    },
    {
        id: 6, stage: 'centre',
        prompt: say('Aurkitu mediana: 3, 8, 5, 10, 6, 9, 4.', 'Halla la mediana de: 3, 8, 5, 10, 6, 9, 4.', 'أوجد وسيط: 3، 8، 5، 10، 6، 9، 4.'),
        expected: n(6),
        hint: say('Ordenatu lehenik; 7 datu daude.', 'Ordena primero; hay 7 datos.', 'رتّب أولًا؛ هناك 7 بيانات.'),
        explanation: say('3, 4, 5, 6, 8, 9, 10: 4. datua, $\\text{Me}=6$.', '3, 4, 5, 6, 8, 9, 10: el dato 4.º, $\\text{Me}=6$.', '3، 4، 5، 6، 8، 9، 10: البيان الرابع، $\\text{Me}=6$.')
    },
    {
        id: 7, stage: 'centre',
        prompt: with_(CARS, say('Ehuneko metatuak 12, 60, 76, 92 eta 100 dira. Zein da $p_{80}$?', 'Los porcentajes acumulados son 12, 60, 76, 92 y 100. ¿Cuál es $p_{80}$?', 'النسب المتجمّعة 12 و60 و76 و92 و100. ما $p_{80}$؟')),
        expected: n(3),
        hint: say('Bilatu ehuneko metatuak 80 lehen aldiz gainditzen duen balioa.', 'Busca el primer valor cuyo porcentaje acumulado supera 80.', 'ابحث عن أول قيمة تتجاوز نسبتها المتجمّعة 80.'),
        explanation: say('76 ez da iristen; 92k gainditzen du, 3 balioan: $p_{80}=3$.', 'El 76 no llega; el 92 lo supera, en el valor 3: $p_{80}=3$.', '76 لا تبلغها؛ و92 تتجاوزها عند القيمة 3: $p_{80}=3$.')
    },
    {
        id: 8, stage: 'centre',
        prompt: say('Kutxa-diagrama batean $Q_1=12$ eta $Q_3=20$. Gehienez noraino irits daiteke goiko bibotea?', 'En un diagrama de caja $Q_1=12$ y $Q_3=20$. ¿Hasta dónde puede llegar como mucho el bigote superior?', 'في مخطط صندوق $Q_1=12$ و$Q_3=20$. إلى أين يمكن أن يصل الشارب الأعلى على الأكثر؟'),
        expected: n(32),
        hint: say('$Q_3$ gehi kutxaren luzera bider 1,5.', '$Q_3$ más 1,5 veces la longitud de la caja.', '$Q_3$ زائد 1.5 مرة طول الصندوق.'),
        explanation: same('$20+1{,}5\\cdot(20-12)=32$')
    },

    /* ---------- Dispersion ---------- */
    {
        id: 9, stage: 'spread',
        prompt: say('Kalkulatu bariantza: 2, 4, 6, 8.', 'Calcula la varianza de: 2, 4, 6, 8.', 'احسب تباين: 2، 4، 6، 8.'),
        expected: n(5),
        hint: say('Batez bestekoa 5 da; batu desbideratzeen karratuak.', 'La media es 5; suma los cuadrados de las desviaciones.', 'المتوسط 5؛ اجمع مربعات الانحرافات.'),
        explanation: same('$\\frac{9+1+1+9}{4}=5$')
    },
    {
        id: 10, stage: 'spread',
        prompt: with_(say('Kalkulatu desbideratze tipikoa: 1, 3, 5, 7, 9.', 'Calcula la desviación típica de: 1, 3, 5, 7, 9.', 'احسب الانحراف المعياري لـ: 1، 3، 5، 7، 9.'), HUNDREDTHS),
        expected: v('2,83'),
        hint: say('Batez bestekoa 5; gero bariantza eta erroa.', 'La media es 5; luego la varianza y la raíz.', 'المتوسط 5؛ ثم التباين والجذر.'),
        explanation: same('$\\sigma^2=\\frac{16+4+0+4+16}{5}=8\\qquad \\sigma=\\sqrt{8}\\approx 2{,}83$')
    },
    {
        id: 11, stage: 'spread',
        prompt: say('Taula: 1 → 2, 2 → 6, 3 → 2. Batez bestekoa 2 da eta $\\sum f_i x_i^2=44$. Kalkulatu bariantza.', 'Tabla: 1 → 2, 2 → 6, 3 → 2. La media es 2 y $\\sum f_i x_i^2=44$. Calcula la varianza.', 'جدول: 1 ← 2، 2 ← 6، 3 ← 2. المتوسط 2 و$\\sum f_i x_i^2=44$. احسب التباين.'),
        expected: v('0,4'),
        hint: say('Karratuen batez bestekoa ken batez bestekoaren karratua.', 'La media de los cuadrados menos el cuadrado de la media.', 'متوسط المربعات ناقص مربع المتوسط.'),
        explanation: same('$\\frac{44}{10}-2^{2}=0{,}4$')
    },
    {
        id: 12, stage: 'spread',
        prompt: say('Banaketa batean $\\bar{x}=50$ eta $\\sigma=4$. Zein da aldakuntza-koefizientea, ehunekotan?', 'En una distribución $\\bar{x}=50$ y $\\sigma=4$. ¿Cuál es el coeficiente de variación, en porcentaje?', 'في توزيع $\\bar{x}=50$ و$\\sigma=4$. ما معامل الاختلاف بالنسبة المئوية؟'),
        expected: n(8),
        hint: say('$\\text{CV}=\\sigma:\\bar{x}$, bider 100.', '$\\text{CV}=\\sigma:\\bar{x}$, por 100.', '$\\text{CV}=\\sigma:\\bar{x}$، في 100.'),
        explanation: same('$\\frac{4}{50}\\cdot 100=8$')
    },

    /* ---------- Two variables ---------- */
    {
        id: 13, stage: 'two',
        prompt: say('Erregresio-zuzena $\\hat{y}=2x+3$ da. Estimatu $y$, $x=4$ denean.', 'La recta de regresión es $\\hat{y}=2x+3$. Estima $y$ cuando $x=4$.', 'مستقيم الانحدار $\\hat{y}=2x+3$. قدّر $y$ عندما $x=4$.'),
        expected: n(11),
        hint: say('Ordeztu $x$ zuzenean.', 'Sustituye $x$ en la recta.', 'عوّض $x$ في المستقيم.'),
        explanation: same('$2\\cdot 4+3=11$')
    },
    {
        id: 14, stage: 'two',
        prompt: say('Eguzki-orduen eta tenperaturaren erregresio-zuzena $\\hat{y}=0{,}5x+8$ da. Estimatu tenperatura 5 ordu eguzkirekin.', 'La recta de regresión de horas de sol y temperatura es $\\hat{y}=0{,}5x+8$. Estima la temperatura con 5 horas de sol.', 'مستقيم انحدار ساعات الشمس والحرارة $\\hat{y}=0{,}5x+8$. قدّر الحرارة مع 5 ساعات شمس.'),
        expected: v('10,5'),
        hint: say('Ordeztu $x=5$.', 'Sustituye $x=5$.', 'عوّض $x=5$.'),
        explanation: same('$0{,}5\\cdot 5+8=10{,}5$')
    },
    {
        id: 15, stage: 'two',
        prompt: say('Hodei bat beherantz doa eta puntuak zuzen batetik oso hurbil daude. Zein izan daiteke $r$: 0,9; −0,95 edo −0,3?', 'Una nube baja y sus puntos están muy cerca de una recta. ¿Cuál puede ser $r$: 0,9; −0,95 o −0,3?', 'سحابة تهبط ونقاطها قريبة جدًا من مستقيم. أيها قد يكون $r$: 0.9 أو −0.95 أو −0.3؟'),
        expected: v('-0,95'),
        hint: say('Beherantz: negatiboa. Oso hurbil: 1etik hurbil balio absolutuan.', 'Baja: negativa. Muy cerca: cerca de 1 en valor absoluto.', 'تهبط: سالب. قريبة جدًا: قريب من 1 بالقيمة المطلقة.'),
        explanation: say('Negatiboa eta sendoa: $r=-0{,}95$.', 'Negativa y fuerte: $r=-0{,}95$.', 'سالب وقوي: $r=-0{,}95$.')
    },
    {
        id: 16, stage: 'two',
        prompt: say('Erregresio-zuzena $\\hat{y}=1{,}2x+n$ da, eta $\\bar{x}=5$, $\\bar{y}=10$. Zenbat da $n$?', 'La recta de regresión es $\\hat{y}=1{,}2x+n$, y $\\bar{x}=5$, $\\bar{y}=10$. ¿Cuánto vale $n$?', 'مستقيم الانحدار $\\hat{y}=1{,}2x+n$، و$\\bar{x}=5$، $\\bar{y}=10$. كم تساوي $n$؟'),
        expected: n(4),
        hint: say('Zuzena beti $(\\bar{x},\\bar{y})$ puntutik pasatzen da.', 'La recta siempre pasa por el punto $(\\bar{x},\\bar{y})$.', 'يمرّ المستقيم دائمًا بالنقطة $(\\bar{x},\\bar{y})$.'),
        explanation: same('$10-1{,}2\\cdot 5=4$')
    },

    /* ---------- Probability ---------- */
    {
        id: 17, stage: 'chance',
        prompt: say('$P(A)=0{,}5$, $P(B)=0{,}4$ eta $P(A\\cap B)=0{,}2$. Kalkulatu $P(A\\cup B)$.', '$P(A)=0{,}5$, $P(B)=0{,}4$ y $P(A\\cap B)=0{,}2$. Calcula $P(A\\cup B)$.', '$P(A)=0{,}5$ و$P(B)=0{,}4$ و$P(A\\cap B)=0{,}2$. احسب $P(A\\cup B)$.'),
        expected: v('0,7'),
        hint: say('Bateragarriak: kendu zati komuna.', 'Compatibles: resta la parte común.', 'متوافقان: اطرح الجزء المشترك.'),
        explanation: same('$0{,}5+0{,}4-0{,}2=0{,}7$')
    },
    {
        id: 18, stage: 'chance',
        prompt: say('Botila opako batean 20 bola daude. 1000 aldiz begiratu da tapoiaren ondoko bola, eta 343 aldiz gorria izan da. Zenbat bola gorri daudela estimatzen duzu?', 'En una botella opaca hay 20 bolas. Se ha mirado 1000 veces la bola junto al tapón y 343 veces ha sido roja. ¿Cuántas bolas rojas estimas que hay?', 'في قارورة معتمة 20 كرة. نُظر 1000 مرة إلى الكرة قرب السدادة فكانت حمراء 343 مرة. كم كرة حمراء تقدّر؟'),
        expected: n(7),
        hint: say('Maiztasun erlatiboa ≈ probabilitatea = gorriak : 20.', 'Frecuencia relativa ≈ probabilidad = rojas : 20.', 'التكرار النسبي ≈ الاحتمال = الحمراء : 20.'),
        explanation: same('$0{,}343\\cdot 20=6{,}86\\approx 7$')
    },
    {
        id: 19, stage: 'chance',
        prompt: with_(say('Kutxa batean 3 bola gorri eta 2 urdin daude. Bi atera dira, itzuli gabe. Zein da biak gorriak izateko probabilitatea?', 'En una urna hay 3 bolas rojas y 2 azules. Se sacan dos sin devolver. ¿Cuál es la probabilidad de que las dos sean rojas?', 'في جرّة 3 كرات حمراء و2 زرقاوان. تُسحب كرتان دون إرجاع. ما احتمال أن تكونا حمراوين؟'), AS_FRACTION),
        expected: f(3, 10),
        hint: say('Bigarrenean 2 gorri geratzen dira 4 bolatan.', 'En la segunda quedan 2 rojas en 4 bolas.', 'في الثانية تبقى حمراوان في 4 كرات.'),
        explanation: same('$\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$')
    },
    {
        id: 20, stage: 'chance',
        prompt: with_(GLASSES, say('Betaurrekoak dituela jakinda, zein da mutila izateko probabilitatea?', 'Sabiendo que lleva gafas, ¿cuál es la probabilidad de que sea chico?', 'علمًا أنه يلبس نظارات، ما احتمال أن يكون ولدًا؟'), AS_FRACTION),
        expected: f(187, 300),
        hint: say('Kasu posibleak betaurrekoak dituztenak bakarrik dira: $187+113$.', 'Los casos posibles son solo los que llevan gafas: $187+113$.', 'الحالات الممكنة هم من يلبسون نظارات فقط: $187+113$.'),
        explanation: same('$\\frac{187}{187+113}=\\frac{187}{300}$')
    }
]

export const statisticsChallenges: ChallengeItem[] = [
    {
        id: 101, stage: 'data', points: 10, context: 'starter',
        prompt: say('200 pertsonari egindako inkesta batean, sektore batek 72° ditu. Zenbat pertsona dira?', 'En una encuesta a 200 personas, un sector mide 72°. ¿Cuántas personas son?', 'في استبيان لـ200 شخص، قياس قطاع 72°. كم شخصًا يمثّل؟'),
        expected: n(40),
        hint: say('Angelua zati 360: maiztasun erlatiboa.', 'El ángulo entre 360: la frecuencia relativa.', 'الزاوية على 360: التكرار النسبي.'),
        explanation: same('$\\frac{72}{360}\\cdot 200=40$')
    },
    {
        id: 102, stage: 'data', points: 20, context: 'advanced',
        prompt: say('384 datu daude, 19tik 188ra. 17ko zabalerako 10 tarte egingo dira. Non hasten da lehen tartea?', 'Hay 384 datos, de 19 a 188. Se harán 10 intervalos de amplitud 17. ¿Dónde empieza el primer intervalo?', 'هناك 384 بيانًا من 19 إلى 188. ستُعمل 10 فئات طولها 17. أين تبدأ الفئة الأولى؟'),
        expected: v('18,5'),
        hint: say('$r=169$ eta $r\'=170$: soberakina bi muturretan banatzen da.', '$r=169$ y $r\'=170$: el exceso se reparte entre los dos extremos.', '$r=169$ و$r\'=170$: يُوزَّع الفائض على الطرفين.'),
        explanation: same('$170-169=1\\ \\to\\ 19-0{,}5=18{,}5$')
    },
    {
        id: 103, stage: 'data', points: 30, context: 'master',
        prompt: say('Datu berak (19tik 188ra) 12 tartetan antolatu nahi dira, ahalik eta zabalera txikienarekin eta osoarekin. Zein zabalera?', 'Los mismos datos (de 19 a 188) se quieren organizar en 12 intervalos, con la menor amplitud entera posible. ¿Qué amplitud?', 'نريد تنظيم البيانات نفسها (من 19 إلى 188) في 12 فئة بأصغر طول صحيح ممكن. ما الطول؟'),
        expected: n(15),
        hint: say('Bilatu 169 baino handiagoa den 12ren lehen multiploa.', 'Busca el primer múltiplo de 12 mayor que 169.', 'ابحث عن أول مضاعف لـ12 أكبر من 169.'),
        explanation: same('$r\'=180\\qquad 180:12=15$')
    },
    {
        id: 104, stage: 'centre', points: 10, context: 'starter',
        prompt: say('30 ikasleko klase batean, nota bat 80 pertzentilean dago. Zenbat ikaslek dute nota hori edo txikiagoa?', 'En una clase de 30 alumnos, una nota está en el percentil 80. ¿Cuántos alumnos tienen esa nota o menos?', 'في قسم من 30 تلميذًا، علامة في المئين 80. كم تلميذًا علامته تلك أو أقل؟'),
        expected: n(24),
        hint: say('Datuen % 80.', 'El 80 % de los datos.', '80 % من البيانات.'),
        explanation: same('$30\\cdot\\frac{80}{100}=24$')
    },
    {
        id: 105, stage: 'centre', points: 20, context: 'advanced',
        prompt: say('Aurkitu 60 pertzentila: 18, 20, 22, 22, 23, 24, 25, 25, 27, 28, 30, 30, 31, 32, 35.', 'Halla el percentil 60 de: 18, 20, 22, 22, 23, 24, 25, 25, 27, 28, 30, 30, 31, 32, 35.', 'أوجد المئين 60 لـ: 18، 20، 22، 22، 23، 24، 25، 25، 27، 28، 30، 30، 31، 32، 35.'),
        expected: v('27,5'),
        hint: say('$15\\cdot 0{,}6$ zenbaki osoa da: postu horretako eta hurrengoko datuen batez bestekoa.', '$15\\cdot 0{,}6$ es entero: la media de los datos de esa posición y la siguiente.', '$15\\cdot 0{,}6$ عدد صحيح: متوسط بياني ذلك الموقع والذي يليه.'),
        explanation: same('$15\\cdot 0{,}6=9\\ \\to\\ \\frac{27+28}{2}=27{,}5$')
    },
    {
        id: 106, stage: 'centre', points: 30, context: 'master',
        prompt: say('Kutxa-diagrama batean $Q_3=15$ da, eta goiko biboteen muga 27,6. Zenbat da $Q_1$?', 'En un diagrama de caja $Q_3=15$, y el límite superior de los bigotes es 27,6. ¿Cuánto vale $Q_1$?', 'في مخطط صندوق $Q_3=15$، والحد الأعلى للشاربين 27.6. كم يساوي $Q_1$؟'),
        expected: v('6,6'),
        hint: say('$27{,}6-15$ kutxaren luzera bider 1,5 da.', '$27{,}6-15$ es 1,5 veces la longitud de la caja.', '$27{,}6-15$ هو 1.5 مرة طول الصندوق.'),
        explanation: same('$\\frac{27{,}6-15}{1{,}5}=8{,}4\\ \\to\\ 15-8{,}4=6{,}6$')
    },
    {
        id: 107, stage: 'spread', points: 10, context: 'starter',
        prompt: say('Banaketa baten bariantza 6,25 da. Zein da desbideratze tipikoa?', 'La varianza de una distribución es 6,25. ¿Cuál es la desviación típica?', 'تباين توزيع 6.25. ما الانحراف المعياري؟'),
        expected: v('2,5'),
        hint: say('Erro karratua.', 'La raíz cuadrada.', 'الجذر التربيعي.'),
        explanation: same('$\\sqrt{6{,}25}=2{,}5$')
    },
    {
        id: 108, stage: 'spread', points: 20, context: 'advanced',
        prompt: say('A banaketan $\\bar{x}=20$ eta $\\sigma=3$. B-n $\\bar{x}=60$. Zein $\\sigma$ behar du B-k aldakuntza erlatibo bera izateko?', 'En la distribución A, $\\bar{x}=20$ y $\\sigma=3$. En la B, $\\bar{x}=60$. ¿Qué $\\sigma$ necesita B para tener la misma variación relativa?', 'في التوزيع A $\\bar{x}=20$ و$\\sigma=3$. وفي B $\\bar{x}=60$. ما $\\sigma$ التي يحتاجها B ليكون له الاختلاف النسبي نفسه؟'),
        expected: n(9),
        hint: say('Aldakuntza-koefiziente bera.', 'El mismo coeficiente de variación.', 'معامل الاختلاف نفسه.'),
        explanation: same('$\\frac{3}{20}=0{,}15\\ \\to\\ 0{,}15\\cdot 60=9$')
    },
    {
        id: 109, stage: 'spread', points: 30, context: 'master',
        prompt: with_(say('30 ikaslek 10 jaurtiketatik lortutako saskiak: 1 → 1, 2 → 3, 3 → 5, 4 → 7, 5 → 7, 6 → 3, 7 → 3, 8 → 1. $\\sum f_i x_i=132$ eta $\\sum f_i x_i^2=664$. Kalkulatu $\\sigma$.', 'Canastas de 30 alumnos en 10 lanzamientos: 1 → 1, 2 → 3, 3 → 5, 4 → 7, 5 → 7, 6 → 3, 7 → 3, 8 → 1. $\\sum f_i x_i=132$ y $\\sum f_i x_i^2=664$. Calcula $\\sigma$.', 'سلال 30 تلميذًا في 10 رميات: 1 ← 1، 2 ← 3، 3 ← 5، 4 ← 7، 5 ← 7، 6 ← 3، 7 ← 3، 8 ← 1. $\\sum f_i x_i=132$ و$\\sum f_i x_i^2=664$. احسب $\\sigma$.'), HUNDREDTHS),
        expected: v('1,67'),
        hint: say('Lehenik $\\bar{x}$; gero karratuen batez bestekoa ken batez bestekoaren karratua.', 'Primero $\\bar{x}$; luego la media de los cuadrados menos el cuadrado de la media.', 'أولًا $\\bar{x}$؛ ثم متوسط المربعات ناقص مربع المتوسط.'),
        explanation: same('$\\bar{x}=\\frac{132}{30}=4{,}4\\qquad \\sigma=\\sqrt{\\frac{664}{30}-4{,}4^{2}}\\approx 1{,}67$')
    },
    {
        id: 110, stage: 'two', points: 10, context: 'starter',
        prompt: say('Presio atmosferikoaren (mm) eta altueraren (m) erregresio-zuzena $\\hat{y}=760-0{,}0824x$ da. Estimatu presioa 1000 m-tan.', 'La recta de regresión de la presión atmosférica (mm) y la altura (m) es $\\hat{y}=760-0{,}0824x$. Estima la presión a 1000 m.', 'مستقيم انحدار الضغط الجوي (مم) والارتفاع (م) هو $\\hat{y}=760-0{,}0824x$. قدّر الضغط على ارتفاع 1000 م.'),
        expected: v('677,6'),
        hint: say('Ordeztu $x=1000$.', 'Sustituye $x=1000$.', 'عوّض $x=1000$.'),
        explanation: same('$760-0{,}0824\\cdot 1000=677{,}6$')
    },
    {
        id: 111, stage: 'two', points: 20, context: 'advanced',
        prompt: say('Erregresio-zuzena $\\hat{y}=mx+2$ da, eta batez bestekoen puntua $(4,\\ 10)$. Zenbat da $m$?', 'La recta de regresión es $\\hat{y}=mx+2$, y el punto de las medias es $(4,\\ 10)$. ¿Cuánto vale $m$?', 'مستقيم الانحدار $\\hat{y}=mx+2$، ونقطة المتوسطين $(4,\\ 10)$. كم تساوي $m$؟'),
        expected: n(2),
        hint: say('Zuzena batez bestekoen puntutik pasatzen da: $10=4m+2$.', 'La recta pasa por el punto de las medias: $10=4m+2$.', 'يمرّ المستقيم بنقطة المتوسطين: $10=4m+2$.'),
        explanation: same('$\\frac{10-2}{4}=2$')
    },
    {
        id: 112, stage: 'two', points: 30, context: 'master',
        prompt: say('Banaketa: $x$ 1, 2, 3, 4, 5 eta $y$ 10, 8, 6, 4, 2. Zein da korrelazio-koefizientea?', 'Distribución: $x$ 1, 2, 3, 4, 5 e $y$ 10, 8, 6, 4, 2. ¿Cuál es el coeficiente de correlación?', 'التوزيع: $x$ 1، 2، 3، 4، 5 و$y$ 10، 8، 6، 4، 2. ما معامل الارتباط؟'),
        expected: n(-1),
        hint: say('Puntu guztiak zuzen beherakor batean daude?', '¿Están todos los puntos en una recta que baja?', 'هل تقع كل النقاط على مستقيم هابط؟'),
        explanation: say('Puntu guztiak $y=12-2x$ zuzenean daude: erlazio funtzional beherakorra, $r=-1$.', 'Todos los puntos están en la recta $y=12-2x$: relación funcional decreciente, $r=-1$.', 'كل النقاط على المستقيم $y=12-2x$: علاقة دالية متناقصة، $r=-1$.')
    },
    {
        id: 113, stage: 'chance', points: 10, context: 'starter',
        prompt: with_(say('Sendagai batek hiru kontrol gainditu behar ditu, independenteak, 0,89, 0,93 eta 0,85eko probabilitateekin. Zein da merkaturako egokia ez izateko probabilitatea?', 'Un medicamento tiene que superar tres controles, independientes, con probabilidades 0,89, 0,93 y 0,85. ¿Cuál es la probabilidad de que no sea apto para el mercado?', 'يجب أن يجتاز دواء ثلاث رقابات مستقلة باحتمالات 0.89 و0.93 و0.85. ما احتمال ألّا يصلح للسوق؟'), HUNDREDTHS),
        expected: v('0,3'),
        hint: say('Aurkakoa: hirurak gainditzea.', 'El contrario: superar los tres.', 'المعاكس: اجتياز الثلاث.'),
        explanation: same('$1-0{,}89\\cdot 0{,}93\\cdot 0{,}85\\approx 0{,}30$')
    },
    {
        id: 114, stage: 'chance', points: 20, context: 'advanced',
        prompt: say('Txintxeta bat punta gora erortzeko probabilitatea 0,38 da. Bi botatzen badira, zein da modu desberdinean erortzeko probabilitatea?', 'La probabilidad de que una chincheta caiga con la punta hacia arriba es 0,38. Si se tiran dos, ¿cuál es la probabilidad de que caigan de distinta forma?', 'احتمال أن يسقط دبوس ورأسه إلى الأعلى 0.38. إذا رُمي دبوسان، ما احتمال أن يسقطا بشكلين مختلفين؟'),
        expected: v('0,4712'),
        hint: say('Bi bide: gora-beste bat eta beste bat-gora.', 'Dos caminos: arriba-otro y otro-arriba.', 'مساران: أعلى ثم غيره، وغيره ثم أعلى.'),
        explanation: same('$0{,}38\\cdot 0{,}62+0{,}62\\cdot 0{,}38=0{,}4712$')
    },
    {
        id: 115, stage: 'chance', points: 30, context: 'master',
        prompt: with_(say('200 pertsonaren odol-taldeak: A Rh+ 74, Rh− 18; B Rh+ 12, Rh− 3; AB Rh+ 6, Rh− 1; 0 Rh+ 70, Rh− 16. A edo B taldekoa dela jakinda, zein da Rh+ izateko probabilitatea?', 'Grupos sanguíneos de 200 personas: A Rh+ 74, Rh− 18; B Rh+ 12, Rh− 3; AB Rh+ 6, Rh− 1; 0 Rh+ 70, Rh− 16. Sabiendo que es del grupo A o B, ¿cuál es la probabilidad de que sea Rh+?', 'فصائل دم 200 شخص: A Rh+ 74، Rh− 18؛ B Rh+ 12، Rh− 3؛ AB Rh+ 6، Rh− 1؛ 0 Rh+ 70، Rh− 16. علمًا أنه من الفصيلة A أو B، ما احتمال أن يكون Rh+؟'), AS_FRACTION),
        expected: f(86, 107),
        hint: say('Kasu posibleak: A eta B taldeak bakarrik.', 'Casos posibles: solo los grupos A y B.', 'الحالات الممكنة: الفصيلتان A وB فقط.'),
        explanation: same('$\\frac{74+12}{92+15}=\\frac{86}{107}$')
    }
]

export const statisticsExerciseBank: ExerciseSection[] = [
    {
        id: 'data',
        title: say('Datuak eta grafikoak', 'Datos y gráficos', 'البيانات والتمثيلات'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Torloju-fabrikatzaile batek 100etik bat hartzen du eta aztertzen du. Aztertutako torlojuak populazioa ala lagina dira? Zergatik?', 'Un fabricante de tornillos recoge uno de cada 100 y lo analiza. ¿Los tornillos analizados son población o muestra? ¿Por qué?', 'يأخذ صانع براغٍ واحدًا من كل 100 ويحلّله. هل البراغي المحلَّلة مجتمع أم عيّنة؟ لماذا؟'), solution: say('Lagina: ehunetik bat bakarrik aztertzen da, eta azterketak torlojua hondatu dezake.', 'Muestra: solo se analiza uno de cada cien, y el análisis puede estropear el tornillo.', 'عيّنة: لا يُحلَّل إلا واحد من كل مئة، وقد يُتلف التحليلُ البرغيَ.') },
            { id: 2, difficulty: 'easy', question: say('Sailkatu aldagaiak: anai-arreba kopurua, pisua, kolore gogokoena eta ikastetxera iristeko denbora.', 'Clasifica las variables: número de hermanos, peso, color favorito y tiempo en llegar al centro.', 'صنّف المتغيرات: عدد الإخوة، الوزن، اللون المفضّل، زمن الوصول إلى المدرسة.'), solution: say('Anai-arrebak: kuantitatibo diskretua. Pisua eta denbora: kuantitatibo jarraituak. Kolorea: kualitatiboa.', 'Hermanos: cuantitativa discreta. Peso y tiempo: cuantitativas continuas. Color: cualitativa.', 'الإخوة: كمي منفصل. الوزن والزمن: كميان متصلان. اللون: نوعي.') },
            { id: 3, difficulty: 'easy', question: say('Zein da $[1{,}65;\\ 2{,}05)$ tartearen klase-marka?', '¿Cuál es la marca de clase del intervalo $[1{,}65;\\ 2{,}05)$?', 'ما مركز الفئة $[1{,}65;\\ 2{,}05)$؟'), solution: same('$\\frac{1{,}65+2{,}05}{2}=1{,}85$'), answer: { expected: v('1,85') } },
            { id: 4, difficulty: 'easy', question: say('2000 hautesleko herri batean 200 laguneko lagin bat hautatzeko: a) alkateari galdetu nor den adierazgarriena; b) jaietako dantzaldian zoriz aukeratu; c) hauteslerroetatik zoriz aukeratu. Zein da baliozkoa?', 'Para elegir una muestra de 200 en un pueblo de 2000 electores: a) preguntar al alcalde quiénes son más representativos; b) elegir al azar en la verbena; c) elegir al azar en las listas electorales. ¿Cuál es válida?', 'لاختيار عيّنة من 200 في بلدة فيها 2000 ناخب: أ) سؤال رئيس البلدية عن الأكثر تمثيلًا؛ ب) الاختيار العشوائي في الحفل؛ ج) الاختيار العشوائي من القوائم الانتخابية. أيها صالح؟'), solution: say('c) bakarrik. a) subjektiboa da; b)-n adin batzuk beste batzuk baino askoz gehiago egongo dira.', 'Solo la c). La a) es subjetiva; en la b) unas edades estarán mucho más representadas que otras.', 'ج) فقط. أ) ذاتي؛ وفي ب) تكون بعض الأعمار ممثَّلة أكثر بكثير من غيرها.') },
            { id: 5, difficulty: 'medium', question: say('50 jaioberriren pisuak 1,8 kg-tik 3,9 kg-ra doaz. Zein da ibiltartea?', 'Los pesos de 50 recién nacidos van de 1,8 kg a 3,9 kg. ¿Cuál es el recorrido?', 'تمتد أوزان 50 مولودًا من 1.8 كغ إلى 3.9 كغ. ما المدى؟'), solution: same('$3{,}9-1{,}8=2{,}1$'), answer: { expected: v('2,1') } },
            { id: 6, difficulty: 'medium', question: say('40 datuko taula batean balio baten maiztasun erlatiboa 0,15 da. Zein da haren maiztasun absolutua?', 'En una tabla de 40 datos la frecuencia relativa de un valor es 0,15. ¿Cuál es su frecuencia absoluta?', 'في جدول من 40 بيانًا التكرار النسبي لقيمة 0.15. ما تكرارها المطلق؟'), solution: same('$0{,}15\\cdot 40=6$'), answer: { expected: n(6) } },
            { id: 7, difficulty: 'medium', question: say('Hiri batzuetako bisitarien % 31 Londreskoak dira. Zenbat gradu ditu Londresen sektoreak?', 'El 31 % de los visitantes de unas ciudades son de Londres. ¿Cuántos grados mide el sector de Londres?', '31 % من زوار بعض المدن من لندن. كم درجة قطاع لندن؟'), solution: same('$0{,}31\\cdot 360=111{,}6$'), answer: { expected: v('111,6') } },
            { id: 8, difficulty: 'medium', question: with_(say('15 lasterketa-denboratik 4 $[128,129)$ tartean daude. Zein ehuneko da?', 'De 15 tiempos de carrera, 4 están en el intervalo $[128,129)$. ¿Qué porcentaje es?', 'من 15 زمن سباق، 4 في الفئة $[128,129)$. ما النسبة المئوية؟'), HUNDREDTHS), solution: same('$\\frac{4}{15}\\cdot 100\\approx 26{,}67$'), answer: { expected: v('26,67') } },
            { id: 9, difficulty: 'hard', question: say('384 datu, 19tik 188ra, 18,5etik hasten diren 17ko zabalerako 10 tartetan. Non amaitzen da azken tartea?', '384 datos, de 19 a 188, en 10 intervalos de amplitud 17 que empiezan en 18,5. ¿Dónde termina el último intervalo?', '384 بيانًا من 19 إلى 188 في 10 فئات طولها 17 تبدأ من 18.5. أين تنتهي الفئة الأخيرة؟'), solution: same('$18{,}5+10\\cdot 17=188{,}5$'), answer: { expected: v('188,5') } },
            { id: 10, difficulty: 'hard', question: say('50 jaioberriren pisuak (kg) tartetan: $[1{,}65;\\ 2{,}05)$ 4, $[2{,}05;\\ 2{,}45)$ 5, $[2{,}45;\\ 2{,}85)$ 13, $[2{,}85;\\ 3{,}25)$ 16, $[3{,}25;\\ 3{,}65)$ 9, $[3{,}65;\\ 4{,}05)$ 3. Zein ehunekok du 2,85 kg baino gutxiago?', 'Pesos (kg) de 50 recién nacidos en intervalos: $[1{,}65;\\ 2{,}05)$ 4, $[2{,}05;\\ 2{,}45)$ 5, $[2{,}45;\\ 2{,}85)$ 13, $[2{,}85;\\ 3{,}25)$ 16, $[3{,}25;\\ 3{,}65)$ 9, $[3{,}65;\\ 4{,}05)$ 3. ¿Qué porcentaje pesa menos de 2,85 kg?', 'أوزان 50 مولودًا (كغ) في فئات: $[1{,}65;\\ 2{,}05)$ 4، $[2{,}05;\\ 2{,}45)$ 5، $[2{,}45;\\ 2{,}85)$ 13، $[2{,}85;\\ 3{,}25)$ 16، $[3{,}25;\\ 3{,}65)$ 9، $[3{,}65;\\ 4{,}05)$ 3. ما نسبة من يزنون أقل من 2.85 كغ؟'), solution: same('$\\frac{4+5+13}{50}\\cdot 100=44$'), answer: { expected: n(44) } }
        ]
    },
    {
        id: 'centre',
        title: say('Zentralizazioa eta posizioa', 'Centralización y posición', 'النزعة المركزية والموقع'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Kalkulatu batez bestekoa: 5, 7, 8, 10, 10.', 'Calcula la media de: 5, 7, 8, 10, 10.', 'احسب متوسط: 5، 7، 8، 10، 10.'), solution: same('$\\frac{5+7+8+10+10}{5}=8$'), answer: { expected: n(8) } },
            { id: 12, difficulty: 'easy', question: with_(SPELLING, say('Zein da moda?', '¿Cuál es la moda?', 'ما المنوال؟')), solution: say('Maiztasun handiena 12 da, 0 balioarena: $\\text{Mo}=0$.', 'La mayor frecuencia es 12, la del valor 0: $\\text{Mo}=0$.', 'أكبر تكرار 12 وهو للقيمة 0: $\\text{Mo}=0$.'), answer: { expected: n(0) } },
            { id: 13, difficulty: 'easy', question: say('Aurkitu mediana: 150, 158, 169, 171, 172, 172, 175, 176, 177, 179, 181, 182, 183, 184.', 'Halla la mediana de: 150, 158, 169, 171, 172, 172, 175, 176, 177, 179, 181, 182, 183, 184.', 'أوجد وسيط: 150، 158، 169، 171، 172، 172، 175، 176، 177، 179، 181، 182، 183، 184.'), solution: say('14 datu: 7. eta 8. datuen batez bestekoa, $\\frac{175+176}{2}=175{,}5$.', '14 datos: la media de los datos 7.º y 8.º, $\\frac{175+176}{2}=175{,}5$.', '14 بيانًا: متوسط البيانين السابع والثامن، $\\frac{175+176}{2}=175{,}5$.'), answer: { expected: v('175,5') } },
            { id: 14, difficulty: 'medium', question: with_(CARS, say('Kalkulatu batez bestekoa.', 'Calcula la media.', 'احسب المتوسط.')), solution: same('$\\frac{0\\cdot 3+1\\cdot 12+2\\cdot 4+3\\cdot 4+4\\cdot 2}{25}=1{,}6$'), answer: { expected: v('1,6') } },
            { id: 15, difficulty: 'medium', question: say('Aurkitu lehen kuartila: 18, 20, 22, 22, 23, 24, 25, 25, 27, 28, 30, 30, 31, 32, 35.', 'Halla el primer cuartil de: 18, 20, 22, 22, 23, 24, 25, 25, 27, 28, 30, 30, 31, 32, 35.', 'أوجد الربيع الأول لـ: 18، 20، 22، 22، 23، 24، 25، 25، 27، 28، 30، 30، 31، 32، 35.'), solution: say('$15\\cdot 0{,}25=3{,}75$: 4. datua, $Q_1=22$.', '$15\\cdot 0{,}25=3{,}75$: el dato 4.º, $Q_1=22$.', '$15\\cdot 0{,}25=3{,}75$: البيان الرابع، $Q_1=22$.'), answer: { expected: n(22) } },
            { id: 16, difficulty: 'medium', question: say('Taula: 0 → 12, 1 → 9, 2 → 7, 3 → 6, 4 → 3; ehuneko metatuak 32,4; 56,8; 75,7; 91,9; 100. Zein da $p_{70}$?', 'Tabla: 0 → 12, 1 → 9, 2 → 7, 3 → 6, 4 → 3; porcentajes acumulados 32,4; 56,8; 75,7; 91,9; 100. ¿Cuál es $p_{70}$?', 'جدول: 0 ← 12، 1 ← 9، 2 ← 7، 3 ← 6، 4 ← 3؛ النسب المتجمّعة 32.4؛ 56.8؛ 75.7؛ 91.9؛ 100. ما $p_{70}$؟'), solution: say('56,8 ez da iristen; 75,7k 70 gainditzen du 2 balioan: $p_{70}=2$.', 'El 56,8 no llega; el 75,7 supera el 70 en el valor 2: $p_{70}=2$.', '56.8 لا تبلغها؛ و75.7 تتجاوز 70 عند القيمة 2: $p_{70}=2$.'), answer: { expected: n(2) } },
            { id: 17, difficulty: 'medium', question: say('10. ariketako jaioberriak: klase-markak 1,85; 2,25; 2,65; 3,05; 3,45; 3,85 eta maiztasunak 4, 5, 13, 16, 9, 3. Kalkulatu batez besteko pisua.', 'Los recién nacidos del ejercicio 10: marcas de clase 1,85; 2,25; 2,65; 3,05; 3,45; 3,85 y frecuencias 4, 5, 13, 16, 9, 3. Calcula el peso medio.', 'مواليد التمرين 10: مراكز الفئات 1.85؛ 2.25؛ 2.65؛ 3.05؛ 3.45؛ 3.85 والتكرارات 4، 5، 13، 16، 9، 3. احسب متوسط الوزن.'), solution: same('$\\frac{7{,}4+11{,}25+34{,}45+48{,}8+31{,}05+11{,}55}{50}=2{,}89$'), answer: { expected: v('2,89') } },
            { id: 18, difficulty: 'hard', question: say('400 ikasleren noten ehuneko metatuak: 1 → 1,5; 2 → 6,25; 3 → 15,5; 4 → 26,75; 5 → 54; 6 → 74,25; 7 → 84; 8 → 89,5; 9 → 97; 10 → 100. Zein da $Q_3$?', 'Porcentajes acumulados de las notas de 400 alumnos: 1 → 1,5; 2 → 6,25; 3 → 15,5; 4 → 26,75; 5 → 54; 6 → 74,25; 7 → 84; 8 → 89,5; 9 → 97; 10 → 100. ¿Cuál es $Q_3$?', 'النسب المتجمّعة لعلامات 400 تلميذ: 1 ← 1.5؛ 2 ← 6.25؛ 3 ← 15.5؛ 4 ← 26.75؛ 5 ← 54؛ 6 ← 74.25؛ 7 ← 84؛ 8 ← 89.5؛ 9 ← 97؛ 10 ← 100. ما $Q_3$؟'), solution: say('74,25 ez da 75era iristen; 84k gainditzen du: $Q_3=p_{75}=7$.', 'El 74,25 no llega a 75; el 84 lo supera: $Q_3=p_{75}=7$.', '74.25 لا تبلغ 75؛ و84 تتجاوزها: $Q_3=p_{75}=7$.'), answer: { expected: n(7) } },
            { id: 19, difficulty: 'hard', question: say('87 pertsonaren puntuazioak 1 eta 9 artean daude; $Q_1=4{,}1$, $\\text{Me}=5{,}1$ eta $Q_3=6{,}8$. Zein da beheko biboteen muga? Badago datu atipikorik?', 'Las puntuaciones de 87 personas están entre 1 y 9; $Q_1=4{,}1$, $\\text{Me}=5{,}1$ y $Q_3=6{,}8$. ¿Cuál es el límite inferior de los bigotes? ¿Hay datos atípicos?', 'نقاط 87 شخصًا بين 1 و9؛ $Q_1=4{,}1$ و$\\text{Me}=5{,}1$ و$Q_3=6{,}8$. ما الحد الأدنى للشاربين؟ هل توجد بيانات شاذة؟'), solution: same('$6{,}8-4{,}1=2{,}7\\qquad 4{,}1-1{,}5\\cdot 2{,}7=0{,}05\\qquad 6{,}8+1{,}5\\cdot 2{,}7=10{,}85$'), answer: { expected: v('0,05') } },
            { id: 20, difficulty: 'hard', question: say('Bi klaseren notak kutxa-diagrametan: A: 2, 4, 5, 7, 9; B: 3,5, 4,5, 5,5, 6, 9 (txikiena, $Q_1$, Me, $Q_3$, handiena). Zein da homogeneoagoa? Zeinetan gainditu du erdiak justu?', 'Notas de dos clases en diagramas de caja: A: 2, 4, 5, 7, 9; B: 3,5, 4,5, 5,5, 6, 9 (mínimo, $Q_1$, Me, $Q_3$, máximo). ¿Cuál es más homogénea? ¿En cuál ha aprobado justo la mitad?', 'علامات قسمين في مخططي صندوق: A: 2، 4، 5، 7، 9؛ B: 3.5، 4.5، 5.5، 6، 9 (الأصغر، $Q_1$، Me، $Q_3$، الأكبر). أيهما أكثر تجانسًا؟ وفي أيهما نجح النصف تمامًا؟'), solution: say('B homogeneoagoa da: kutxa $6-4{,}5=1{,}5$, A-rena $7-4=3$. A-n mediana 5 da: erdiak justu gainditu du.', 'B es más homogénea: su caja mide $6-4{,}5=1{,}5$ y la de A, $7-4=3$. En A la mediana es 5: ha aprobado justo la mitad.', 'B أكثر تجانسًا: صندوقها $6-4{,}5=1{,}5$ وصندوق A $7-4=3$. في A الوسيط 5: نجح النصف تمامًا.') }
        ]
    },
    {
        id: 'spread',
        title: say('Sakabanaketa', 'Dispersión', 'التشتت'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Kalkulatu bariantza: 1, 3, 5, 7.', 'Calcula la varianza de: 1, 3, 5, 7.', 'احسب تباين: 1، 3، 5، 7.'), solution: same('$\\bar{x}=4\\qquad \\frac{9+1+1+9}{4}=5$'), answer: { expected: n(5) } },
            { id: 22, difficulty: 'easy', question: say('Bariantza 16 da. Zein da desbideratze tipikoa?', 'La varianza es 16. ¿Cuál es la desviación típica?', 'التباين 16. ما الانحراف المعياري؟'), solution: same('$\\sqrt{16}=4$'), answer: { expected: n(4) } },
            { id: 23, difficulty: 'easy', question: say('$\\bar{x}=60$ eta $\\sigma=3$. Zein da aldakuntza-koefizientea, ehunekotan?', '$\\bar{x}=60$ y $\\sigma=3$. ¿Cuál es el coeficiente de variación, en porcentaje?', '$\\bar{x}=60$ و$\\sigma=3$. ما معامل الاختلاف بالنسبة المئوية؟'), solution: same('$\\frac{3}{60}\\cdot 100=5$'), answer: { expected: n(5) } },
            { id: 24, difficulty: 'medium', question: with_(say('Robertoren notek 6ko batez bestekoa dute, eta haien desbideratzeak 0, 1, −2, 3, 2, −1, −1, −2, 0 dira. Kalkulatu bariantza.', 'Las notas de Roberto tienen media 6, y sus desviaciones son 0, 1, −2, 3, 2, −1, −1, −2, 0. Calcula la varianza.', 'متوسط علامات روبرتو 6، وانحرافاتها 0، 1، −2، 3، 2، −1، −1، −2، 0. احسب التباين.'), HUNDREDTHS), solution: same('$\\frac{0+1+4+9+4+1+1+4+0}{9}=\\frac{24}{9}\\approx 2{,}67$'), answer: { expected: v('2,67') } },
            { id: 25, difficulty: 'medium', question: with_(SPELLING, say('$\\sum f_i x_i=68$ eta $\\sum f_i x_i^2=214$. Kalkulatu $\\sigma$.', '$\\sum f_i x_i=68$ y $\\sum f_i x_i^2=214$. Calcula $\\sigma$.', '$\\sum f_i x_i=68$ و$\\sum f_i x_i^2=214$. احسب $\\sigma$.'), HUNDREDTHS), solution: same('$\\frac{214}{40}-1{,}7^{2}=2{,}46\\qquad \\sigma=\\sqrt{2{,}46}\\approx 1{,}57$'), answer: { expected: v('1,57') } },
            { id: 26, difficulty: 'medium', question: with_(CARS, say('$\\bar{x}=1{,}6$ eta $\\sum f_i x_i^2=96$. Kalkulatu $\\sigma$.', '$\\bar{x}=1{,}6$ y $\\sum f_i x_i^2=96$. Calcula $\\sigma$.', '$\\bar{x}=1{,}6$ و$\\sum f_i x_i^2=96$. احسب $\\sigma$.'), HUNDREDTHS), solution: same('$\\frac{96}{25}-1{,}6^{2}=1{,}28\\qquad \\sigma=\\sqrt{1{,}28}\\approx 1{,}13$'), answer: { expected: v('1,13') } },
            { id: 27, difficulty: 'medium', question: with_(say('Dieta baten kolesterol-mailak: $\\bar{x}=188{,}6$ eta $\\sigma=52{,}6$. Kalkulatu aldakuntza-koefizientea, ehunekotan.', 'Niveles de colesterol con una dieta: $\\bar{x}=188{,}6$ y $\\sigma=52{,}6$. Calcula el coeficiente de variación, en porcentaje.', 'مستويات الكولسترول مع حمية: $\\bar{x}=188{,}6$ و$\\sigma=52{,}6$. احسب معامل الاختلاف بالنسبة المئوية.'), HUNDREDTHS), solution: same('$\\frac{52{,}6}{188{,}6}\\cdot 100\\approx 27{,}89$'), answer: { expected: v('27,89') } },
            { id: 28, difficulty: 'hard', question: with_(say('40 ikasleren altuerak: klase-markak 150, 155, 160, 165, 170, 175 eta maiztasunak 2, 5, 10, 12, 8, 3; $\\bar{x}=163{,}5$ eta $\\sum f_i x_i^2=1\\,070\\,900$. Kalkulatu $\\sigma$.', 'Alturas de 40 alumnos: marcas de clase 150, 155, 160, 165, 170, 175 y frecuencias 2, 5, 10, 12, 8, 3; $\\bar{x}=163{,}5$ y $\\sum f_i x_i^2=1\\,070\\,900$. Calcula $\\sigma$.', 'أطوال 40 تلميذًا: مراكز الفئات 150، 155، 160، 165، 170، 175 والتكرارات 2، 5، 10، 12، 8، 3؛ $\\bar{x}=163{,}5$ و$\\sum f_i x_i^2=1\\,070\\,900$. احسب $\\sigma$.'), HUNDREDTHS), solution: same('$\\frac{1\\,070\\,900}{40}-163{,}5^{2}=40{,}25\\qquad \\sigma=\\sqrt{40{,}25}\\approx 6{,}34$'), answer: { expected: v('6,34') } },
            { id: 29, difficulty: 'hard', question: say('Elefanteen pisua: $\\bar{x}=5000$ kg, $\\sigma=400$ kg. Saguena: $\\bar{x}=25$ g, $\\sigma=4$ g. Zeinek du sakabanaketa erlatibo handiagoa? Idatzi saguen CV, ehunekotan.', 'Peso de elefantes: $\\bar{x}=5000$ kg, $\\sigma=400$ kg. De ratones: $\\bar{x}=25$ g, $\\sigma=4$ g. ¿Cuál tiene más dispersión relativa? Escribe el CV de los ratones, en porcentaje.', 'وزن الفيلة: $\\bar{x}=5000$ كغ، $\\sigma=400$ كغ. ووزن الفئران: $\\bar{x}=25$ غ، $\\sigma=4$ غ. أيهما تشتته النسبي أكبر؟ اكتب CV للفئران بالنسبة المئوية.'), solution: say('Elefanteak: $\\frac{400}{5000}\\cdot 100=8$. Saguak: $\\frac{4}{25}\\cdot 100=16$. Saguek dute sakabanaketa erlatibo handiagoa.', 'Elefantes: $\\frac{400}{5000}\\cdot 100=8$. Ratones: $\\frac{4}{25}\\cdot 100=16$. Los ratones tienen más dispersión relativa.', 'الفيلة: $\\frac{400}{5000}\\cdot 100=8$. الفئران: $\\frac{4}{25}\\cdot 100=16$. تشتت الفئران النسبي أكبر.'), answer: { expected: n(16) } },
            { id: 30, difficulty: 'hard', question: say('Datu batzuen $\\sigma$ 3 da. Datu guztiak bider 2 egiten badira, zein da $\\sigma$ berria? Eta guztiei 5 gehitzen bazaie?', 'La $\\sigma$ de unos datos es 3. Si se multiplican todos los datos por 2, ¿cuál es la nueva $\\sigma$? ¿Y si se suma 5 a todos?', '$\\sigma$ لبيانات تساوي 3. إذا ضُربت كل البيانات في 2، ما $\\sigma$ الجديدة؟ وإذا أُضيف 5 إلى كلها؟'), solution: say('Bider 2: desbideratze guztiak bikoizten dira, $2\\cdot 3=6$. 5 gehituta: denak lekuz aldatzen dira eta $\\sigma$ ez da aldatzen, 3.', 'Por 2: todas las desviaciones se duplican, $2\\cdot 3=6$. Sumando 5: todos se desplazan y $\\sigma$ no cambia, 3.', 'في 2: تتضاعف كل الانحرافات، $2\\cdot 3=6$. وبإضافة 5: تنزاح كلها ولا تتغيّر $\\sigma$، أي 3.'), answer: { expected: n(6) } }
        ]
    },
    {
        id: 'two',
        title: say('Bi aldagai', 'Dos variables', 'متغيران'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Positiboa ala negatiboa? a) Kanpoko tenperatura eta berokuntza-kontsumoa. b) Altuera eta pisua. c) Etxetik ikastetxera distantzia eta denbora.', '¿Positiva o negativa? a) Temperatura exterior y consumo de calefacción. b) Estatura y peso. c) Distancia de casa al centro y tiempo en llegar.', 'موجب أم سالب؟ أ) الحرارة الخارجية واستهلاك التدفئة. ب) الطول والوزن. ج) المسافة من البيت إلى المدرسة وزمن الوصول.'), solution: say('a) Negatiboa. b) Positiboa (ahula). c) Positiboa eta oso sendoa.', 'a) Negativa. b) Positiva (débil). c) Positiva y muy fuerte.', 'أ) سالب. ب) موجب (ضعيف). ج) موجب وقوي جدًا.') },
            { id: 32, difficulty: 'easy', question: say('Lau hodeiren $|r|$ balioak 0,47; 0,75; 0,92 eta 0,97 dira. Zein da sendoena? Zer adierazten du zeinuak?', 'Los valores de $|r|$ de cuatro nubes son 0,47; 0,75; 0,92 y 0,97. ¿Cuál es la más fuerte? ¿Qué indica el signo?', 'قيم $|r|$ لأربع سحب: 0.47؛ 0.75؛ 0.92؛ 0.97. أيها الأقوى؟ وعلامَ تدل الإشارة؟'), solution: say('0,97koa da sendoena: puntuak zuzenetik hurbilen. Zeinua positiboa da hodeia gorantz badoa eta negatiboa beherantz badoa.', 'La de 0,97 es la más fuerte: los puntos, más cerca de la recta. El signo es positivo si la nube sube y negativo si baja.', 'ذات 0.97 الأقوى: النقاط أقرب إلى المستقيم. والإشارة موجبة إذا صعدت السحابة وسالبة إذا هبطت.') },
            { id: 33, difficulty: 'easy', question: say('Erregresio-zuzena $\\hat{y}=3x+1$ da. Estimatu $y$, $x=2$ denean.', 'La recta de regresión es $\\hat{y}=3x+1$. Estima $y$ cuando $x=2$.', 'مستقيم الانحدار $\\hat{y}=3x+1$. قدّر $y$ عندما $x=2$.'), solution: same('$3\\cdot 2+1=7$'), answer: { expected: n(7) } },
            { id: 34, difficulty: 'medium', question: say('Barra baten luzapena (mm) eta tenperatura (°C): $\\hat{y}=0{,}12x$, $r$ 1etik oso hurbil eta datuak 0 °C eta 60 °C artean. Estimatu luzapena 45 °C-tan. Fidagarria da?', 'El alargamiento de una barra (mm) y la temperatura (°C): $\\hat{y}=0{,}12x$, $r$ muy cerca de 1 y datos entre 0 °C y 60 °C. Estima el alargamiento a 45 °C. ¿Es fiable?', 'استطالة قضيب (مم) ودرجة الحرارة (°C): $\\hat{y}=0{,}12x$، و$r$ قريب جدًا من 1، والبيانات بين 0 °C و60 °C. قدّر الاستطالة عند 45 °C. هل هو موثوق؟'), solution: say('$0{,}12\\cdot 45=5{,}4$. Oso fidagarria: korrelazio sendoa eta 45 datuen tartean.', '$0{,}12\\cdot 45=5{,}4$. Muy fiable: correlación fuerte y 45 dentro del intervalo.', '$0{,}12\\cdot 45=5{,}4$. موثوق جدًا: ارتباط قوي و45 داخل المجال.'), answer: { expected: v('5,4') } },
            { id: 35, difficulty: 'medium', question: say('Erlazio funtzionala ala estatistikoa? a) Karratu baten aldea eta azalera. b) Pertsona baten altuera eta pisua. c) Erositako kilo kopurua eta ordaindutakoa (prezio finkoa).', '¿Relación funcional o estadística? a) El lado de un cuadrado y su área. b) La estatura y el peso de una persona. c) Los kilos comprados y lo que se paga (precio fijo).', 'علاقة دالية أم إحصائية؟ أ) ضلع مربع ومساحته. ب) طول شخص ووزنه. ج) الكيلوغرامات المشتراة والمبلغ المدفوع (سعر ثابت).'), solution: say('a) eta c) funtzionalak: $x$-k $y$ zehazki zehazten du. b) estatistikoa: joera bat dago, baina ez arau zehatzik.', 'a) y c) funcionales: $x$ determina exactamente $y$. b) estadística: hay una tendencia, pero no una regla exacta.', 'أ) وج) داليتان: يحدّد $x$ قيمة $y$ تمامًا. ب) إحصائية: هناك اتجاه لكن لا قاعدة دقيقة.') },
            { id: 36, difficulty: 'medium', question: say('Presioa (mm) eta altuera (m): $\\hat{y}=760-0{,}0824x$, 0 eta 2000 m arteko datuekin. Estimatu presioa 6000 m-tan. Fidagarria da?', 'Presión (mm) y altura (m): $\\hat{y}=760-0{,}0824x$, con datos entre 0 y 2000 m. Estima la presión a 6000 m. ¿Es fiable?', 'الضغط (مم) والارتفاع (م): $\\hat{y}=760-0{,}0824x$، ببيانات بين 0 و2000 م. قدّر الضغط على 6000 م. هل هو موثوق؟'), solution: say('$760-0{,}0824\\cdot 6000=265{,}6$. Ez da fidagarria: 6000 datuen tartetik kanpo dago.', '$760-0{,}0824\\cdot 6000=265{,}6$. No es fiable: 6000 está fuera del intervalo de datos.', '$760-0{,}0824\\cdot 6000=265{,}6$. غير موثوق: 6000 خارج مجال البيانات.'), answer: { expected: v('265,6') } },
            { id: 37, difficulty: 'medium', question: say('Erregresio-zuzenaren malda 0,5 da eta batez bestekoen puntua $(6,\\ 11)$. Zein da jatorriko ordenatua $n$?', 'La pendiente de la recta de regresión es 0,5 y el punto de las medias es $(6,\\ 11)$. ¿Cuál es la ordenada en el origen $n$?', 'ميل مستقيم الانحدار 0.5 ونقطة المتوسطين $(6,\\ 11)$. ما الجزء المقطوع $n$؟'), solution: same('$11-0{,}5\\cdot 6=8$'), answer: { expected: n(8) } },
            { id: 38, difficulty: 'hard', question: say('Hiri bateko hileko batez besteko tenperaturaren eta telebista ikusteko denboraren arteko korrelazioa −0,89 da. Arrazoizkoa da? Nolakoa izango da euriaren eta telebistaren artekoa?', 'La correlación entre la temperatura media mensual de una ciudad y el tiempo que se ve la televisión es −0,89. ¿Es razonable? ¿Cómo será la de la lluvia y la televisión?', 'الارتباط بين متوسط الحرارة الشهري لمدينة وزمن مشاهدة التلفاز −0.89. هل هذا معقول؟ وكيف يكون بين المطر والتلفاز؟'), solution: say('Bai: beroarekin jendeak denbora gehiago ematen du kalean (negatibo sendoa). Euriarekin, etxean gehiago: positiboa.', 'Sí: con calor la gente pasa más tiempo en la calle (negativa fuerte). Con lluvia, más en casa: positiva.', 'نعم: مع الحرارة يقضي الناس وقتًا أطول في الشارع (سالب قوي). ومع المطر وقتًا أطول في البيت: موجب.') },
            { id: 39, difficulty: 'hard', question: say('Hodei baten puntu guztiak $(6,\\ 0)$ eta $(5,\\ 2)$ puntuetatik pasatzen den zuzenean daude. Zenbat da $y$, $x=3$ denean?', 'Todos los puntos de una nube están en la recta que pasa por $(6,\\ 0)$ y $(5,\\ 2)$. ¿Cuánto vale $y$ cuando $x=3$?', 'كل نقاط سحابة على المستقيم المار بـ$(6,\\ 0)$ و$(5,\\ 2)$. كم تساوي $y$ عندما $x=3$؟'), solution: same('$m=\\frac{2-0}{5-6}=-2\\qquad -2\\cdot(3-6)=6$'), answer: { expected: n(6) } },
            { id: 40, difficulty: 'hard', question: say('Eskualde bateko herrietan, zenbat eta zikoina-habia gehiago, orduan eta jaiotza gehiago. Zikoinek ekartzen dituzte haurrak?', 'En los pueblos de una comarca, cuantos más nidos de cigüeña, más nacimientos. ¿Traen las cigüeñas a los niños?', 'في بلدات منطقة ما، كلما كثرت أعشاش اللقالق كثرت الولادات. هل تجلب اللقالق الأطفال؟'), solution: say('Ez. Korrelazioak ez du kausa adierazten: herri handiagoek teilatu gehiago (habia gehiago) eta biztanle gehiago (jaiotza gehiago) dituzte.', 'No. La correlación no indica causa: los pueblos más grandes tienen más tejados (más nidos) y más habitantes (más nacimientos).', 'لا. الارتباط لا يدل على السببية: البلدات الأكبر فيها سطوح أكثر (أعشاش أكثر) وسكان أكثر (ولادات أكثر).') }
        ]
    },
    {
        id: 'chance',
        title: say('Probabilitatea', 'Probabilidad', 'الاحتمال'),
        items: [
            { id: 41, difficulty: 'easy', question: with_(say('40 kartako sorta batetik bat ateratzen da. Zein da ezpaten batekoa izateko probabilitatea?', 'Se saca una carta de una baraja de 40. ¿Cuál es la probabilidad de que sea el as de espadas?', 'تُسحب ورقة من مجموعة 40. ما احتمال أن تكون آس السيوف؟'), AS_FRACTION), solution: same('$\\frac{1}{40}$'), answer: { expected: f(1, 40) } },
            { id: 42, difficulty: 'easy', question: with_(say('Kanpaleku batean 32 europar, 13 amerikar, 15 afrikar eta 23 asiar daude. Bozeramailea zoriz aukeratzen da. Zein da europarra izateko probabilitatea?', 'En un campamento hay 32 europeos, 13 americanos, 15 africanos y 23 asiáticos. Se elige al azar al portavoz. ¿Cuál es la probabilidad de que sea europeo?', 'في مخيم 32 أوروبيًا و13 أمريكيًا و15 إفريقيًا و23 آسيويًا. يُختار المتحدث عشوائيًا. ما احتمال أن يكون أوروبيًا؟'), AS_FRACTION), solution: same('$\\frac{32}{32+13+15+23}=\\frac{32}{83}$'), answer: { expected: f(32, 83) } },
            { id: 43, difficulty: 'easy', question: with_(say('40 kartako sorta batetik bat ateratzen da. Zein da irudia (sota, zaldia edo errege) izateko probabilitatea?', 'Se saca una carta de una baraja de 40. ¿Cuál es la probabilidad de que sea figura (sota, caballo o rey)?', 'تُسحب ورقة من مجموعة 40. ما احتمال أن تكون صورة (فتى أو فارس أو ملك)؟'), AS_FRACTION), solution: same('$\\frac{12}{40}=\\frac{3}{10}$'), answer: { expected: f(3, 10) } },
            { id: 44, difficulty: 'medium', question: with_(say('1etik 12ra zenbakitutako aurpegiak dituen dodekaedro bat botatzen da. Zein da 3ren multiploa ez ateratzeko probabilitatea?', 'Se lanza un dodecaedro con las caras numeradas del 1 al 12. ¿Cuál es la probabilidad de no sacar múltiplo de 3?', 'يُرمى ثنائي عشري الأوجه مرقّم من 1 إلى 12. ما احتمال ألّا يظهر مضاعف للعدد 3؟'), AS_FRACTION), solution: same('$1-\\frac{4}{12}=\\frac{8}{12}=\\frac{2}{3}$'), answer: { expected: f(2, 3) } },
            { id: 45, difficulty: 'medium', question: with_(say('Hiru txanpon botatzen dira. Zein da bi aurpegi eta gurutze bat ateratzeko probabilitatea?', 'Se lanzan tres monedas. ¿Cuál es la probabilidad de sacar dos caras y una cruz?', 'تُرمى ثلاث قطع نقود. ما احتمال ظهور وجهين وظهر واحد؟'), AS_FRACTION), solution: say('Hiru bide (AAX, AXA, XAA), bakoitza $\\frac{1}{8}$: $3\\cdot\\frac{1}{8}=\\frac{3}{8}$.', 'Tres caminos (CC+, C+C, +CC), cada uno $\\frac{1}{8}$: $3\\cdot\\frac{1}{8}=\\frac{3}{8}$.', 'ثلاثة مسارات (CC+، C+C، +CC)، كل منها $\\frac{1}{8}$: $3\\cdot\\frac{1}{8}=\\frac{3}{8}$.'), answer: { expected: f(3, 8) } },
            { id: 46, difficulty: 'medium', question: with_(say('Dado bat botatzen da eta 1, 2, 3, 4, 5, 7, 8, 9 zenbakiak dituen 8 sektoreko erruleta bat biratzen da. Zein da biak bikoitiak izateko probabilitatea?', 'Se lanza un dado y se gira una ruleta de 8 sectores con los números 1, 2, 3, 4, 5, 7, 8, 9. ¿Cuál es la probabilidad de que los dos sean pares?', 'يُرمى نرد ويُدار دولاب من 8 قطاعات فيه الأعداد 1، 2، 3، 4، 5، 7، 8، 9. ما احتمال أن يكون العددان زوجيين؟'), AS_FRACTION), solution: say('Independenteak; erruletan 3 bikoiti (2, 4, 8): $\\frac{3}{6}\\cdot\\frac{3}{8}=\\frac{3}{16}$.', 'Independientes; en la ruleta hay 3 pares (2, 4, 8): $\\frac{3}{6}\\cdot\\frac{3}{8}=\\frac{3}{16}$.', 'مستقلتان؛ في الدولاب 3 أعداد زوجية (2، 4، 8): $\\frac{3}{6}\\cdot\\frac{3}{8}=\\frac{3}{16}$.'), answer: { expected: f(3, 16) } },
            { id: 47, difficulty: 'medium', question: say('Tiradera batean 20 galtzerdi daude. Bat atera, kolorea idatzi eta itzuli egiten da, 100 aldiz: 42 aldiz beltza. Zenbat galtzerdi beltz daudela estimatzen duzu?', 'En un cajón hay 20 calcetines. Se saca uno, se anota el color y se devuelve, 100 veces: 42 veces negro. ¿Cuántos calcetines negros estimas?', 'في درج 20 جوربًا. يُسحب جورب ويُسجَّل لونه ثم يُعاد، 100 مرة: 42 مرة أسود. كم جوربًا أسود تقدّر؟'), solution: same('$0{,}42\\cdot 20=8{,}4\\approx 8$'), answer: { expected: n(8) } },
            { id: 48, difficulty: 'hard', question: with_(say('Kutxa batean 2 bola urdin eta 3 gorri daude. Bi atera dira, itzuli gabe. Zein da gutxienez bat urdina izateko probabilitatea?', 'En una urna hay 2 bolas azules y 3 rojas. Se sacan dos, sin devolver. ¿Cuál es la probabilidad de que al menos una sea azul?', 'في جرّة كرتان زرقاوان و3 حمراء. تُسحب كرتان دون إرجاع. ما احتمال أن تكون واحدة على الأقل زرقاء؟'), AS_FRACTION), solution: say('Aurkakoa: biak gorriak, $\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$. Beraz, $1-\\frac{3}{10}=\\frac{7}{10}$.', 'El contrario: las dos rojas, $\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$. Así, $1-\\frac{3}{10}=\\frac{7}{10}$.', 'المعاكس: كلتاهما حمراء، $\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{3}{10}$. إذن $1-\\frac{3}{10}=\\frac{7}{10}$.'), answer: { expected: f(7, 10) } },
            { id: 49, difficulty: 'hard', question: with_(say('Ikastetxe bateko eskolaz kanpoko jarduerak: 4. mailako 80 ikasleetatik 24k jarduera kulturalak egiten dituzte. 4. mailakoa dela jakinda, zein da jarduera kulturala egiteko probabilitatea?', 'Actividades extraescolares de un centro: de los 80 alumnos de 4.º, 24 hacen actividades culturales. Sabiendo que es de 4.º, ¿cuál es la probabilidad de que haga una actividad cultural?', 'الأنشطة اللاصفية في مدرسة: من 80 تلميذًا في الصف الرابع، 24 يمارسون أنشطة ثقافية. علمًا أنه من الصف الرابع، ما احتمال أن يمارس نشاطًا ثقافيًا؟'), AS_FRACTION), solution: same('$\\frac{24}{80}=\\frac{3}{10}$'), answer: { expected: f(3, 10) } },
            { id: 50, difficulty: 'hard', question: with_(say('40 lagunetatik 24 mutil dira eta 16 neska. Tenisa nahiago dute 5ek: 2 mutil eta 3 neska. Tenisa nahiago duela jakinda, zein da mutila izateko probabilitatea?', 'De 40 amigos, 24 son chicos y 16 chicas. Prefieren el tenis 5: 2 chicos y 3 chicas. Sabiendo que prefiere el tenis, ¿cuál es la probabilidad de que sea chico?', 'من 40 صديقًا، 24 أولاد و16 بنات. يفضّل التنس 5: ولدان و3 بنات. علمًا أنه يفضّل التنس، ما احتمال أن يكون ولدًا؟'), AS_FRACTION), solution: same('$\\frac{2}{5}$'), answer: { expected: f(2, 5) } }
        ]
    }
]

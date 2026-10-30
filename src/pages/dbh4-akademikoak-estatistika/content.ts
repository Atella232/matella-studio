import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistika · 4. DBH akademikoak — diagnostic, guided practice, exercise
   bank and challenges. Exercises follow Santillana Académicas unit 12
   (strata, tables with gaps, the goals of 30 matches, means of joined
   groups, grouped waiting times, quartiles by position, box plots, mean
   deviation, σ and CV of Alba, Javier and Pedro) and Anaya Académicas
   unit 10 (clouds, r and estimations with the regression line). Every
   closed answer is a single number or a fraction.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

const HUNDREDTHS = say('Hurbildu ehunenetara.', 'Aproxima a las centésimas.', 'قرّب إلى الأجزاء من مئة.', 'Round to two decimal places.')
/** A prompt followed by an instruction (rounding) */
const with_ = (prompt: LocalizedText, ...rules: LocalizedText[]): LocalizedText => ({
    eu: [prompt.eu, ...rules.map((rule) => rule.eu)].join(' '),
    es: [prompt.es, ...rules.map((rule) => rule.es)].join(' '),
    en: [prompt.en, ...rules.map((rule) => rule.en)].join(' '),
    ar: [prompt.ar, ...rules.map((rule) => rule.ar)].join(' ')
})

/** The goals of 30 matches of the lessons */
const GOALS = say('30 partidatako golak: 0 → 6 partida, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1.', 'Goles en 30 partidos: 0 → 6 partidos, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1.', 'الأهداف في 30 مباراة: 0 ← 6 مباريات، 1 ← 7، 2 ← 8، 3 ← 6، 4 ← 2، 5 ← 1.', 'Goals in 30 matches: 0 → 6 matches, 1 → 7, 2 → 8, 3 → 6, 4 → 2, 5 → 1.')
/** The marks of 40 students */
const MARKS = say('40 ikasleren notak: 4 → 5 ikasle, 5 → 8, 6 → 9, 7 → 10, 8 → 6, 9 → 2.', 'Notas de 40 alumnos: 4 → 5 alumnos, 5 → 8, 6 → 9, 7 → 10, 8 → 6, 9 → 2.', 'علامات 40 تلميذًا: 4 ← 5 تلاميذ، 5 ← 8، 6 ← 9، 7 ← 10، 8 ← 6، 9 ← 2.', 'Marks of 40 students: 4 → 5 students, 5 → 8, 6 → 9, 7 → 10, 8 → 6, 9 → 2.')

export const statisticsAkDiagnostic: DiagnosticQuestion[] = [
    {
        id: 6101,
        prompt: say('Ikastetxe batean 1. mailak ikasleen % 30 ditu. 50 ikasleko lagin geruzatu batean, zenbat izango dira 1. mailakoak?', 'En un instituto, 1.º tiene el 30 % de los alumnos. En una muestra estratificada de 50, ¿cuántos serán de 1.º?', 'في مدرسة يضم الصف الأول 30 % من التلاميذ. في عيّنة طبقية من 50، كم تلميذًا من الأول؟', 'In a secondary school, 1st year makes up 30% of the students. In a stratified sample of 50, how many will be from 1st year?'),
        options: [same('$15$'), same('$30$'), same('$12$')],
        correctIndex: 0,
        explanation: say('Geruza bakoitzak bere proportzioa: $0{,}3\\cdot 50=15$.', 'Cada estrato, en su proporción: $0{,}3\\cdot 50=15$.', 'كل طبقة بنسبتها: $0{,}3\\cdot 50=15$.', 'Each stratum, in its proportion: $0{,}3\\cdot 50=15$.'),
        topic: 'sampling'
    },
    {
        id: 6102,
        prompt: say('Maiztasun-taula batean, zer balio du azken maiztasun absolutu metatuak?', 'En una tabla de frecuencias, ¿cuánto vale la última frecuencia absoluta acumulada?', 'في جدول تكرارات، كم يساوي آخر تكرار مطلق متجمّع؟', 'In a frequency table, what is the last absolute cumulative frequency?'),
        options: [same('$1$'), say('Datu kopurua, $N$', 'El número de datos, $N$', 'عدد البيانات $N$', 'The number of data values, $N$'), say('Maiztasun handiena', 'La mayor frecuencia', 'أكبر تكرار', 'The highest frequency')],
        correctIndex: 1,
        explanation: say('$F_i$ metatuak maiztasun guztiak batzen ditu azkenean: $N$. Erlatibo metatuaren azkena da 1.', 'La acumulada $F_i$ suma al final todas las frecuencias: $N$. La que acaba en 1 es la relativa acumulada.', 'المتجمّع $F_i$ يجمع في النهاية كل التكرارات: $N$. والذي ينتهي بـ1 هو النسبي المتجمّع.', 'The cumulative frequency $F_i$ adds up all the frequencies at the end: $N$. The one that ends at 1 is the relative cumulative frequency.'),
        topic: 'frequencies'
    },
    {
        id: 6103,
        prompt: say('10 ikasleren batez bestekoa 8 da eta beste 30en batez bestekoa 4. Zein da 40en batez bestekoa?', 'La media de 10 alumnos es 8 y la de otros 30, 4. ¿Cuál es la media de los 40?', 'متوسط 10 تلاميذ 8 ومتوسط 30 آخرين 4. ما متوسط الأربعين؟', 'The mean of 10 students is 8 and the mean of another 30 students is 4. What is the mean of all 40?'),
        options: [same('$6$'), same('$4{,}5$'), same('$5$')],
        correctIndex: 2,
        explanation: same('$\\frac{10\\cdot 8+30\\cdot 4}{40}=\\frac{200}{40}=5$'),
        topic: 'mean'
    },
    {
        id: 6104,
        prompt: say('Herri bateko etxebizitzen prezioetan, batzuk oso garestiak dira. Zein parametrok ordezkatzen du hobeto prezio tipikoa?', 'En los precios de las viviendas de un pueblo, unas pocas son carísimas. ¿Qué parámetro representa mejor el precio típico?', 'في أسعار مساكن بلدة، قليل منها غالٍ جدًا. أي مقياس يمثّل السعر النموذجي أفضل؟', 'In the house prices of a village, a few of them are extremely expensive. Which measure best represents the typical price?'),
        options: [say('Batez bestekoa', 'La media', 'المتوسط', 'The mean'), say('Mediana', 'La mediana', 'الوسيط', 'The median'), say('Ibiltartea', 'El recorrido', 'المدى', 'The range')],
        correctIndex: 1,
        explanation: say('Etxe garestiek batez bestekoa gorantz eramaten dute; medianak ia ez du aldatzen.', 'Las casas carísimas arrastran la media hacia arriba; la mediana apenas cambia.', 'المساكن الغالية جدًا تسحب المتوسط إلى الأعلى، أما الوسيط فلا يكاد يتغيّر.', 'The very expensive houses pull the mean upwards; the median hardly changes.'),
        topic: 'median-mode'
    },
    {
        id: 6105,
        prompt: say('20 datu ordenatu daude. Zein postutan dago $Q_1$?', 'Hay 20 datos ordenados. ¿En qué posición está $Q_1$?', 'هناك 20 بيانًا مرتّبًا. في أي موقع يقع $Q_1$؟', 'There are 20 ordered values. What position is $Q_1$ in?'),
        options: [say('5. eta 6. datuen erdian', 'Entre los datos 5.º y 6.º', 'بين البيانين الخامس والسادس', 'Between the 5th and 6th values'), say('5. datuan', 'En el dato 5.º', 'في البيان الخامس', 'At the 5th value'), say('6. datuan', 'En el dato 6.º', 'في البيان السادس', 'At the 6th value')],
        correctIndex: 0,
        explanation: say('$20\\cdot 0{,}25=5$ osoa da: 5. eta 6. datuen batez bestekoa.', '$20\\cdot 0{,}25=5$ es entero: la media de los datos 5.º y 6.º.', '$20\\cdot 0{,}25=5$ عدد صحيح: متوسط البيانين الخامس والسادس.', '$20\\cdot 0{,}25=5$ is a whole number: the mean of the 5th and 6th values.'),
        topic: 'quartiles'
    },
    {
        id: 6106,
        prompt: say('Kutxa-diagrama batean $Q_1=10$ eta $Q_3=18$ dira. Noraino irits daiteke goiko bibotea?', 'En un diagrama de caja $Q_1=10$ y $Q_3=18$. ¿Hasta dónde puede llegar el bigote superior?', 'في مخطط صندوق $Q_1=10$ و$Q_3=18$. إلى أين يمكن أن يصل الشارب العلوي؟', 'In a box plot, $Q_1=10$ and $Q_3=18$. How far can the upper whisker reach?'),
        options: [same('$27$'), same('$26$'), same('$30$')],
        correctIndex: 2,
        explanation: same('$18+1{,}5\\cdot(18-10)=30$'),
        topic: 'box-plot'
    },
    {
        id: 6107,
        prompt: say('Bi taldek batez besteko bera dute; A-ren $\\sigma$ 1,2 da eta B-rena 3,5. Zer esan daiteke?', 'Dos grupos tienen la misma media; la $\\sigma$ de A es 1,2 y la de B, 3,5. ¿Qué se puede decir?', 'لمجموعتين المتوسط نفسه؛ $\\sigma$ لـA تساوي 1.2 ولـB تساوي 3.5. ماذا يمكن القول؟', 'Two groups have the same mean; the $\\sigma$ of A is 1.2 and that of B is 3.5. What can be said?'),
        options: [say('A homogeneoagoa da', 'A es más homogéneo', 'A أكثر تجانسًا', 'A is more homogeneous'), say('B homogeneoagoa da', 'B es más homogéneo', 'B أكثر تجانسًا', 'B is more homogeneous'), say('Berdin sakabanatuta daude', 'Están igual de dispersos', 'تشتتهما متساوٍ', 'They are equally spread out')],
        correctIndex: 0,
        explanation: say('Batez besteko berarekin, $\\sigma$ txikiena duena da bilduena: A.', 'Con la misma media, el de menor $\\sigma$ es el más agrupado: A.', 'مع المتوسط نفسه، ذو $\\sigma$ الأصغر هو الأكثر تجمّعًا: A.', 'With the same mean, the one with the smaller $\\sigma$ is the more tightly grouped: A.'),
        topic: 'variance'
    },
    {
        id: 6108,
        prompt: say('Bi aldagairen arteko korrelazio-koefizientea $r=-0{,}95$ da. Nolakoa da korrelazioa?', 'El coeficiente de correlación entre dos variables es $r=-0{,}95$. ¿Cómo es la correlación?', 'معامل الارتباط بين متغيرين $r=-0{,}95$. كيف هو الارتباط؟', 'The correlation coefficient between two variables is $r=-0{,}95$. What is the correlation like?'),
        options: [say('Negatiboa eta ahula', 'Negativa y débil', 'سالب وضعيف', 'Negative and weak'), say('Positiboa eta sendoa', 'Positiva y fuerte', 'موجب وقوي', 'Positive and strong'), say('Negatiboa eta sendoa', 'Negativa y fuerte', 'سالب وقوي', 'Negative and strong')],
        correctIndex: 2,
        explanation: say('Zeinua negatiboa da (bata gora, bestea behera) eta $|r|=0{,}95$ 1etik oso hurbil: sendoa.', 'El signo es negativo (una sube, la otra baja) y $|r|=0{,}95$ está muy cerca de 1: fuerte.', 'الإشارة سالبة (أحدهما يصعد والآخر يهبط) و$|r|=0{,}95$ قريب جدًا من 1: قوي.', 'The sign is negative (one goes up, the other goes down) and $|r|=0{,}95$ is very close to 1: strong.'),
        topic: 'correlation'
    }
]

export const statisticsAkPractice: PracticeItem[] = [
    /* ---------- Data and tables ---------- */
    {
        id: 1, stage: 'data',
        prompt: say('2000 biztanleko herri batean 900 gizon eta 1100 emakume daude. 100 laguneko lagin geruzatua egin nahi da. Zenbat emakume?', 'En un pueblo de 2000 habitantes hay 900 hombres y 1100 mujeres. Se quiere una muestra estratificada de 100. ¿Cuántas mujeres?', 'في بلدة من 2000 نسمة 900 رجل و1100 امرأة. نريد عيّنة طبقية من 100. كم امرأة؟', 'In a village of 2,000 inhabitants there are 900 men and 1,100 women. They want a stratified sample of 100. How many women should be in the sample?'),
        expected: n(55),
        hint: say('Lagina bider emakumeen zatia.', 'La muestra por la fracción de mujeres.', 'العيّنة في كسر النساء.', 'Multiply the sample size by the fraction of women.'),
        explanation: same('$100\\cdot\\frac{1100}{2000}=55$')
    },
    {
        id: 2, stage: 'data',
        prompt: say('500 elementuko populazio batetik 25eko lagin sistematikoa hartzen da, eta lehena 7.a da. Zein da hirugarren aukeratua?', 'De una población de 500 elementos se toma una muestra sistemática de 25, y el primero es el 7. ¿Cuál es el tercero elegido?', 'من مجتمع من 500 عنصر نأخذ عيّنة منتظمة من 25، وأولها العنصر 7. ما العنصر الثالث المختار؟', 'From a population of 500 elements, a systematic sample of 25 is taken, and the first element chosen is 7. What is the third element chosen?'),
        expected: n(47),
        hint: say('Kalkulatu $k=N:n$ eta batu bi aldiz.', 'Calcula $k=N:n$ y súmalo dos veces.', 'احسب $k=N:n$ وأضفه مرتين.', 'Calculate $k=N:n$ and add it twice.'),
        explanation: same('$\\frac{500}{25}=20\\qquad 7+2\\cdot 20=47$')
    },
    {
        id: 3, stage: 'data',
        prompt: say('40 datuko taula batean, 3 balioaren maiztasun absolutu metatua 26 da. Zein da haren maiztasun erlatibo metatua?', 'En una tabla de 40 datos, la frecuencia absoluta acumulada del valor 3 es 26. ¿Cuál es su frecuencia relativa acumulada?', 'في جدول من 40 بيانًا، التكرار المطلق المتجمّع للقيمة 3 يساوي 26. ما تكرارها النسبي المتجمّع؟', 'In a table of 40 values, the absolute cumulative frequency of the value 3 is 26. What is its relative cumulative frequency?'),
        expected: v('0,65'),
        hint: same('$H_i=\\frac{F_i}{N}$'),
        explanation: same('$\\frac{26}{40}=0{,}65$')
    },
    {
        id: 4, stage: 'data',
        prompt: say('Datuak 31tik 88ra doaz eta 6 tartetan antolatu nahi dira. Zein zabalera?', 'Los datos van de 31 a 88 y se quieren agrupar en 6 intervalos. ¿Qué amplitud?', 'تمتد البيانات من 31 إلى 88 ونريد تبويبها في 6 فئات. ما طول الفئة؟', 'The data go from 31 to 88 and are to be grouped into 6 intervals. What should the width be?'),
        expected: n(10),
        hint: say('Ibiltartea, eta hurrengo 6z zatigarria.', 'El recorrido, y el siguiente divisible entre 6.', 'المدى، ثم التالي القابل للقسمة على 6.', 'The range, and then the next number divisible by 6.'),
        explanation: same('$88-31=57\\ \\to\\ r\'=60\\qquad 60:6=10$')
    },

    /* ---------- Centralization ---------- */
    {
        id: 5, stage: 'centre',
        prompt: say('Taula: 1 → 3, 2 → 5, 3 → 8, 4 → 4. Kalkulatu batez bestekoa.', 'Tabla: 1 → 3, 2 → 5, 3 → 8, 4 → 4. Calcula la media.', 'جدول: 1 ← 3، 2 ← 5، 3 ← 8، 4 ← 4. احسب المتوسط.', 'Table: 1 → 3, 2 → 5, 3 → 8, 4 → 4. Calculate the mean.'),
        expected: v('2,65'),
        hint: say('Balio bider maiztasun, batu eta zatitu 20z.', 'Valor por frecuencia, suma y divide entre 20.', 'القيمة في التكرار، اجمع واقسم على 20.', 'Multiply each value by its frequency, add up and divide by 20.'),
        explanation: same('$\\frac{3+10+24+16}{20}=\\frac{53}{20}=2{,}65$')
    },
    {
        id: 6, stage: 'centre',
        prompt: say('Klase batean, 12 neskaren batez bestekoa 7,5 da eta 18 mutilena 6. Zein da klase osoaren batez bestekoa?', 'En una clase, la media de 12 chicas es 7,5 y la de 18 chicos, 6. ¿Cuál es la media de toda la clase?', 'في صف، متوسط 12 بنتًا 7.5 ومتوسط 18 ولدًا 6. ما متوسط الصف كله؟', 'In a class, the mean of 12 girls is 7.5 and the mean of 18 boys is 6. What is the mean of the whole class?'),
        expected: v('6,6'),
        hint: say('Batez besteko haztatua: talde bakoitzaren batura.', 'Media ponderada: la suma de cada grupo.', 'متوسط مرجّح: مجموع كل مجموعة.', 'Weighted mean: the sum of each group.'),
        explanation: same('$\\frac{12\\cdot 7{,}5+18\\cdot 6}{30}=\\frac{198}{30}=6{,}6$')
    },
    {
        id: 7, stage: 'centre',
        prompt: say('Bost notaren batez bestekoa 6,8 da. Lau notak 6, 8, 5 eta 7 dira. Zein da bosgarrena?', 'La media de cinco notas es 6,8. Cuatro de ellas son 6, 8, 5 y 7. ¿Cuál es la quinta?', 'متوسط خمس علامات 6.8. أربع منها 6 و8 و5 و7. ما الخامسة؟', 'The mean of five marks is 6.8. Four of them are 6, 8, 5 and 7. What is the fifth?'),
        expected: n(8),
        hint: say('Batura osoa = 5 bider batez bestekoa.', 'Suma total = 5 por la media.', 'المجموع الكلي = 5 في المتوسط.', 'Total sum = 5 times the mean.'),
        explanation: same('$5\\cdot 6{,}8-(6+8+5+7)=34-26=8$')
    },
    {
        id: 8, stage: 'centre',
        prompt: say('Tarteak: $[0,10)$ 4, $[10,20)$ 10, $[20,30)$ 6. Kalkulatu batez bestekoa klase-markekin.', 'Intervalos: $[0,10)$ 4, $[10,20)$ 10, $[20,30)$ 6. Calcula la media con las marcas de clase.', 'الفئات: $[0,10)$ 4، $[10,20)$ 10، $[20,30)$ 6. احسب المتوسط بمراكز الفئات.', 'Intervals: $[0,10)$ 4, $[10,20)$ 10, $[20,30)$ 6. Calculate the mean using the class midpoints.'),
        expected: n(16),
        hint: say('Klase-markak 5, 15 eta 25.', 'Marcas de clase 5, 15 y 25.', 'المراكز 5 و15 و25.', 'Class midpoints 5, 15 and 25.'),
        explanation: same('$\\frac{5\\cdot 4+15\\cdot 10+25\\cdot 6}{20}=\\frac{320}{20}=16$')
    },

    /* ---------- Position ---------- */
    {
        id: 9, stage: 'position',
        prompt: say('Aurkitu $Q_1$: 3, 5, 6, 6, 8, 9, 10, 12, 14.', 'Halla $Q_1$ de: 3, 5, 6, 6, 8, 9, 10, 12, 14.', 'أوجد $Q_1$ لـ: 3، 5، 6، 6، 8، 9، 10، 12، 14.', 'Find $Q_1$ of: 3, 5, 6, 6, 8, 9, 10, 12, 14.'),
        expected: n(6),
        hint: say('$9\\cdot 0{,}25$ hamartarra da: hurrengo postua.', '$9\\cdot 0{,}25$ es decimal: la posición siguiente.', '$9\\cdot 0{,}25$ عشري: الموقع التالي.', '$9\\cdot 0{,}25$ is a decimal: use the next position.'),
        explanation: say('$9\\cdot 0{,}25=2{,}25\\ \\to\\ 3$. datua: $Q_1=6$.', '$9\\cdot 0{,}25=2{,}25\\ \\to\\ 3$.º dato: $Q_1=6$.', '$9\\cdot 0{,}25=2{,}25\\ \\to\\ 3$، البيان الثالث: $Q_1=6$.', '$9\\cdot 0{,}25=2{,}25\\ \\to\\ 3$rd value: $Q_1=6$.')
    },
    {
        id: 10, stage: 'position',
        prompt: say('Aurkitu $Q_3$: 3, 5, 6, 6, 8, 9, 10, 12, 14.', 'Halla $Q_3$ de: 3, 5, 6, 6, 8, 9, 10, 12, 14.', 'أوجد $Q_3$ لـ: 3، 5، 6، 6، 8، 9، 10، 12، 14.', 'Find $Q_3$ of: 3, 5, 6, 6, 8, 9, 10, 12, 14.'),
        expected: n(10),
        hint: same('$9\\cdot 0{,}75$'),
        explanation: say('$9\\cdot 0{,}75=6{,}75\\ \\to\\ 7$. datua: $Q_3=10$.', '$9\\cdot 0{,}75=6{,}75\\ \\to\\ 7$.º dato: $Q_3=10$.', '$9\\cdot 0{,}75=6{,}75\\ \\to\\ 7$، البيان السابع: $Q_3=10$.', '$9\\cdot 0{,}75=6{,}75\\ \\to\\ 7$th value: $Q_3=10$.')
    },
    {
        id: 11, stage: 'position',
        prompt: with_(MARKS, say('Zein da $p_{80}$?', '¿Cuál es $p_{80}$?', 'ما $p_{80}$؟', 'What is $p_{80}$?')),
        expected: v('7,5'),
        hint: say('Ehuneko metatuak: 12,5; 32,5; 55; 80… 80 justu: erdia hartu.', 'Porcentajes acumulados: 12,5; 32,5; 55; 80… justo 80: toma el punto medio.', 'النسب المتجمّعة: 12.5؛ 32.5؛ 55؛ 80… 80 تمامًا: خذ المنتصف.', 'Cumulative percentages: 12.5; 32.5; 55; 80… exactly 80: take the midpoint.'),
        explanation: say('7ren metatua % 80 da justu: $\\frac{7+8}{2}=7{,}5$.', 'El acumulado del 7 es justo el 80 %: $\\frac{7+8}{2}=7{,}5$.', 'المتجمّع عند 7 يساوي 80 % تمامًا: $\\frac{7+8}{2}=7{,}5$.', 'The cumulative percentage at 7 is exactly 80%: $\\frac{7+8}{2}=7{,}5$.')
    },
    {
        id: 12, stage: 'position',
        prompt: say('Kutxa-diagrama batean $Q_1=12$ eta $Q_3=20$ dira. Zein da goiko muga, hortik gorako datuak atipikoak izateko?', 'En un diagrama de caja $Q_1=12$ y $Q_3=20$. ¿Cuál es el límite superior a partir del cual los datos son atípicos?', 'في مخطط صندوق $Q_1=12$ و$Q_3=20$. ما الحدّ العلوي الذي تكون البيانات فوقه شاذة؟', 'In a box plot, $Q_1=12$ and $Q_3=20$. What is the upper limit above which the values are outliers?'),
        expected: n(32),
        hint: same('$Q_3+1{,}5\\cdot\\text{RIC}$'),
        explanation: same('$20+1{,}5\\cdot(20-12)=32$')
    },

    /* ---------- Dispersion ---------- */
    {
        id: 13, stage: 'spread',
        prompt: say('Kalkulatu batez besteko desbideratzea: 2, 4, 6, 8, 10.', 'Calcula la desviación media de: 2, 4, 6, 8, 10.', 'احسب الانحراف المتوسط لـ: 2، 4، 6، 8، 10.', 'Calculate the mean deviation of: 2, 4, 6, 8, 10.'),
        expected: v('2,4'),
        hint: say('Batez bestekoa 6; batu distantziak.', 'La media es 6; suma las distancias.', 'المتوسط 6؛ اجمع المسافات.', 'The mean is 6; add up the distances.'),
        explanation: same('$\\frac{4+2+0+2+4}{5}=\\frac{12}{5}=2{,}4$')
    },
    {
        id: 14, stage: 'spread',
        prompt: say('Kalkulatu bariantza: 3, 5, 7, 9.', 'Calcula la varianza de: 3, 5, 7, 9.', 'احسب تباين: 3، 5، 7، 9.', 'Calculate the variance of: 3, 5, 7, 9.'),
        expected: n(5),
        hint: say('Batez bestekoa 6; desbideratzeen karratuak.', 'La media es 6; los cuadrados de las desviaciones.', 'المتوسط 6؛ مربعات الانحرافات.', 'The mean is 6; then the squares of the deviations.'),
        explanation: same('$\\frac{9+1+1+9}{4}=\\frac{20}{4}=5$')
    },
    {
        id: 15, stage: 'spread',
        prompt: say('Taula batean $N=20$, $\\sum f_i x_i=60$ eta $\\sum f_i x_i^2=200$. Zein da $\\sigma$?', 'En una tabla $N=20$, $\\sum f_i x_i=60$ y $\\sum f_i x_i^2=200$. ¿Cuál es $\\sigma$?', 'في جدول $N=20$ و$\\sum f_i x_i=60$ و$\\sum f_i x_i^2=200$. ما $\\sigma$؟', 'In a table, $N=20$, $\\sum f_i x_i=60$ and $\\sum f_i x_i^2=200$. What is $\\sigma$?'),
        expected: n(1),
        hint: say('Lehenik $\\bar{x}$, gero karratuen batez bestekoa ken $\\bar{x}^2$.', 'Primero $\\bar{x}$, después la media de los cuadrados menos $\\bar{x}^2$.', 'أولًا $\\bar{x}$، ثم متوسط المربعات ناقص $\\bar{x}^2$.', 'First $\\bar{x}$, then the mean of the squares minus $\\bar{x}^2$.'),
        explanation: same('$\\frac{60}{20}=3\\qquad \\frac{200}{20}-3^{2}=1\\qquad \\sqrt{1}=1$')
    },
    {
        id: 16, stage: 'spread',
        prompt: say('Banaketa batean $\\bar{x}=40$ eta $\\sigma=6$. Zein da aldakuntza-koefizientea ehunekotan?', 'En una distribución $\\bar{x}=40$ y $\\sigma=6$. ¿Cuál es el coeficiente de variación en porcentaje?', 'في توزيع $\\bar{x}=40$ و$\\sigma=6$. ما معامل الاختلاف بالنسبة المئوية؟', 'In a distribution, $\\bar{x}=40$ and $\\sigma=6$. What is the coefficient of variation as a percentage?'),
        expected: n(15),
        hint: same('$\\text{CV}=\\frac{\\sigma}{\\bar{x}}$'),
        explanation: same('$\\frac{6}{40}\\cdot 100=15$')
    },

    /* ---------- Two variables ---------- */
    {
        id: 17, stage: 'two',
        prompt: say('Erregresio-zuzena $\\hat{y}=2x+3$ da. Estimatu $y$ $x=4$ denean.', 'La recta de regresión es $\\hat{y}=2x+3$. Estima $y$ para $x=4$.', 'مستقيم الانحدار $\\hat{y}=2x+3$. قدّر $y$ عندما $x=4$.', 'The regression line is $\\hat{y}=2x+3$. Estimate $y$ for $x=4$.'),
        expected: n(11),
        hint: say('Ordeztu $x$.', 'Sustituye $x$.', 'عوّض $x$.', 'Substitute $x$.'),
        explanation: same('$2\\cdot 4+3=11$')
    },
    {
        id: 18, stage: 'two',
        prompt: say('Erregresio-zuzenak 1,5eko malda du eta $(\\bar{x},\\bar{y})=(5,\\ 12)$ puntutik pasatzen da. Zein da haren ordenatua jatorrian?', 'La recta de regresión tiene pendiente 1,5 y pasa por $(\\bar{x},\\bar{y})=(5,\\ 12)$. ¿Cuál es su ordenada en el origen?', 'ميل مستقيم الانحدار 1.5 ويمرّ بالنقطة $(\\bar{x},\\bar{y})=(5,\\ 12)$. ما جزؤه المقطوع من محور الصادات؟', 'The regression line has a slope of 1.5 and passes through $(\\bar{x},\\bar{y})=(5,\\ 12)$. What is its y-intercept?'),
        expected: v('4,5'),
        hint: same('$n=\\bar{y}-m\\,\\bar{x}$'),
        explanation: same('$12-1{,}5\\cdot 5=4{,}5$')
    },
    {
        id: 19, stage: 'two',
        prompt: say('Erregresio-zuzena $\\hat{y}=-0{,}8x+20$ da eta $\\bar{x}=10$. Zein da $\\bar{y}$?', 'La recta de regresión es $\\hat{y}=-0{,}8x+20$ y $\\bar{x}=10$. ¿Cuánto vale $\\bar{y}$?', 'مستقيم الانحدار $\\hat{y}=-0{,}8x+20$ و$\\bar{x}=10$. كم يساوي $\\bar{y}$؟', 'The regression line is $\\hat{y}=-0{,}8x+20$ and $\\bar{x}=10$. What is $\\bar{y}$?'),
        expected: n(12),
        hint: say('Zuzena batez bestekoen puntutik pasatzen da.', 'La recta pasa por el punto de las medias.', 'المستقيم يمرّ بنقطة المتوسطين.', 'The regression line passes through the point of means.'),
        explanation: same('$-0{,}8\\cdot 10+20=12$')
    },
    {
        id: 20, stage: 'two',
        prompt: say('Hodei bat beherantz doa eta puntuak zuzenetik nahiko hurbil daude. Hauetatik zein da $r$: −0,9; 0,2; 0,85?', 'Una nube baja y los puntos están bastante cerca de la recta. ¿Cuál de estos es $r$: −0,9; 0,2; 0,85?', 'سحابة تهبط ونقاطها قريبة نسبيًا من المستقيم. أي هذه هو $r$: −0.9؛ 0.2؛ 0.85؟', 'The cloud of points goes down and the points are fairly close to the regression line. Which of these is $r$: −0.9; 0.2; 0.85?'),
        expected: v('-0,9'),
        hint: say('Beherantz: zeinu negatiboa.', 'Baja: signo negativo.', 'تهبط: إشارة سالبة.', 'It slopes down: negative sign.'),
        explanation: say('Negatibo bakarra eta 1etik hurbil: $r=-0{,}9$.', 'El único negativo y cerca de 1 en valor absoluto: $r=-0{,}9$.', 'السالب الوحيد وقيمته المطلقة قريبة من 1: $r=-0{,}9$.', 'The only negative one, and close to 1 in absolute value: $r=-0{,}9$.')
    }
]

export const statisticsAkChallenges: ChallengeItem[] = [
    /* ---------- Data and tables ---------- */
    {
        id: 101, stage: 'data', points: 10, context: 'starter',
        prompt: say('1200 ikasleko ikastetxe batean, 80ko lagin geruzatua egiten da. Maila batek 300 ikasle ditu. Zenbat aukeratuko dira maila horretatik?', 'En un centro de 1200 alumnos se hace una muestra estratificada de 80. Un curso tiene 300 alumnos. ¿Cuántos se eligen de ese curso?', 'في مدرسة من 1200 تلميذ نأخذ عيّنة طبقية من 80. في أحد الصفوف 300 تلميذ. كم تلميذًا نختار منه؟', 'In a school of 1,200 students, a stratified sample of 80 is taken. One year group has 300 students. How many are chosen from that year group?'),
        expected: n(20),
        hint: say('Mailaren zatia bider lagina.', 'La fracción del curso por la muestra.', 'كسر الصف في العيّنة.', 'The year group\'s size times the sampling fraction.'),
        explanation: same('$80\\cdot\\frac{300}{1200}=20$')
    },
    {
        id: 102, stage: 'data', points: 20, context: 'advanced',
        prompt: say('Taula batean lau balio daude: lehenak 5 maiztasun du eta bigarrenak 8; beste bien maiztasun erlatiboak $\\frac{1}{9}$ eta $\\frac{1}{6}$ dira. Zenbat datu daude?', 'En una tabla hay cuatro valores: el primero tiene frecuencia 5 y el segundo 8; las frecuencias relativas de los otros dos son $\\frac{1}{9}$ y $\\frac{1}{6}$. ¿Cuántos datos hay?', 'في جدول أربع قيم: تكرار الأولى 5 والثانية 8، والتكراران النسبيان للأخريين $\\frac{1}{9}$ و$\\frac{1}{6}$. كم بيانًا هناك؟', 'A table has four values: the first has frequency 5 and the second has frequency 8; the relative frequencies of the other two are $\\frac{1}{9}$ and $\\frac{1}{6}$. How many data values are there?'),
        expected: n(18),
        hint: say('$h_i$ guztien batura 1 da.', 'La suma de todas las $h_i$ es 1.', 'مجموع كل $h_i$ يساوي 1.', 'The sum of all the $h_i$ is 1.'),
        explanation: say('$1-\\frac{1}{9}-\\frac{1}{6}=\\frac{13}{18}$, eta $5+8=13$ datuak dira zati hori: $N=18$.', '$1-\\frac{1}{9}-\\frac{1}{6}=\\frac{13}{18}$, y los $5+8=13$ datos son esa parte: $N=18$.', '$1-\\frac{1}{9}-\\frac{1}{6}=\\frac{13}{18}$، والبيانات $5+8=13$ هي ذلك الجزء: $N=18$.', '$1-\\frac{1}{9}-\\frac{1}{6}=\\frac{13}{18}$, and the $5+8=13$ values are that part: $N=18$.')
    },
    {
        id: 103, stage: 'data', points: 30, context: 'master',
        prompt: with_(GOALS, say('Sektore-diagrama batean, zenbat gradu ditu «2 gol» sektoreak?', 'En un diagrama de sectores, ¿cuántos grados mide el sector «2 goles»?', 'في مخطط دائري، كم درجة قطاع «هدفان»؟', 'In a pie chart, how many degrees is the ‘2 goals’ sector?')),
        expected: n(96),
        hint: say('Maiztasun erlatiboa bider 360°.', 'Frecuencia relativa por 360°.', 'التكرار النسبي في 360°.', 'Relative frequency times 360°.'),
        explanation: same('$\\frac{8}{30}\\cdot 360=96$')
    },

    /* ---------- Centralization ---------- */
    {
        id: 104, stage: 'centre', points: 10, context: 'starter',
        prompt: say('Taula: 10 → 4, 20 → 7, 30 → 5, 40 → 4. Zein da mediana?', 'Tabla: 10 → 4, 20 → 7, 30 → 5, 40 → 4. ¿Cuál es la mediana?', 'جدول: 10 ← 4، 20 ← 7، 30 ← 5، 40 ← 4. ما الوسيط؟', 'Table: 10 → 4, 20 → 7, 30 → 5, 40 → 4. What is the median?'),
        expected: n(20),
        hint: say('$N=20$: bilatu 10. eta 11. datuak metatuetan.', '$N=20$: busca los datos 10.º y 11.º en las acumuladas.', '$N=20$: ابحث عن البيانين العاشر والحادي عشر في المتجمّعة.', '$N=20$: find the 10th and 11th values in the cumulative frequencies.'),
        explanation: say('Metatuak 4, 11, 16, 20: 10. eta 11. datuak 20 dira, $\\text{Me}=20$.', 'Acumuladas 4, 11, 16, 20: los datos 10.º y 11.º son 20, $\\text{Me}=20$.', 'المتجمّعة 4، 11، 16، 20: البيانان العاشر والحادي عشر يساويان 20، $\\text{Me}=20$.', 'Cumulative frequencies 4, 11, 16, 20: the 10th and 11th values are 20, $\\text{Med}=20$.')
    },
    {
        id: 105, stage: 'centre', points: 20, context: 'advanced',
        prompt: say('25 ikasleren batez bestekoa 6,4 da. Ikasle berri bat dator, 9ko notarekin. Zein da batez besteko berria?', 'La media de 25 alumnos es 6,4. Llega un alumno nuevo con un 9. ¿Cuál es la nueva media?', 'متوسط 25 تلميذًا 6.4. يصل تلميذ جديد بعلامة 9. ما المتوسط الجديد؟', 'The mean of 25 students is 6.4. A new student arrives with a 9. What is the new mean?'),
        expected: v('6,5'),
        hint: say('Batura zaharra $25\\cdot 6{,}4$; gehitu 9 eta zatitu 26z.', 'La suma vieja es $25\\cdot 6{,}4$; añade 9 y divide entre 26.', 'المجموع القديم $25\\cdot 6{,}4$؛ أضف 9 واقسم على 26.', 'The old sum is $25\\cdot 6{,}4$; add 9 and divide by 26.'),
        explanation: same('$\\frac{25\\cdot 6{,}4+9}{26}=\\frac{169}{26}=6{,}5$')
    },
    {
        id: 106, stage: 'centre', points: 30, context: 'master',
        prompt: say('Tarteak: $[0,10)$ 3, $[10,20)$ $f$, $[20,30)$ 5. Batez bestekoa 16 da. Zenbat balio du $f$-k?', 'Intervalos: $[0,10)$ 3, $[10,20)$ $f$, $[20,30)$ 5. La media es 16. ¿Cuánto vale $f$?', 'الفئات: $[0,10)$ 3، $[10,20)$ $f$، $[20,30)$ 5. المتوسط 16. كم تساوي $f$؟', 'Intervals: $[0,10)$ 3, $[10,20)$ $f$, $[20,30)$ 5. The mean is 16. What is $f$?'),
        expected: n(12),
        hint: say('Planteatu ekuazioa klase-markekin: 5, 15, 25.', 'Plantea la ecuación con las marcas de clase: 5, 15, 25.', 'اكتب المعادلة بالمراكز: 5، 15، 25.', 'Set up the equation using the class midpoints: 5, 15, 25.'),
        explanation: say('$15+15f+125=16\\,(8+f)$, beraz $f=12$. Egiaztatu: $\\frac{15+180+125}{20}=16$.', '$15+15f+125=16\\,(8+f)$, luego $f=12$. Comprueba: $\\frac{15+180+125}{20}=16$.', '$15+15f+125=16\\,(8+f)$، إذن $f=12$. تحقّق: $\\frac{15+180+125}{20}=16$.', '$15+15f+125=16\\,(8+f)$, so $f=12$. Check: $\\frac{15+180+125}{20}=16$.')
    },

    /* ---------- Position ---------- */
    {
        id: 107, stage: 'position', points: 10, context: 'starter',
        prompt: say('Haur baten pisua 85 pertzentilean dago. Bere adineko haurren zein ehunekok pisatzen du gehiago?', 'El peso de un bebé está en el percentil 85. ¿Qué porcentaje de los bebés de su edad pesa más?', 'وزن رضيع في المئين 85. ما نسبة رضّع عمره الذين يزنون أكثر؟', 'A baby\'s weight is at the 85th percentile. What percentage of babies of the same age weigh more?'),
        expected: n(15),
        hint: say('% 85ek gutxiago edo berdin pisatzen du.', 'El 85 % pesa lo mismo o menos.', '85 % يزنون مثله أو أقل.', '85% of babies weigh the same or less.'),
        explanation: same('$100-85=15$')
    },
    {
        id: 108, stage: 'position', points: 20, context: 'advanced',
        prompt: say('Kalkulatu kuartil arteko ibiltartea: 1, 2, 4, 4, 5, 7, 8, 8, 9, 12.', 'Calcula el recorrido intercuartílico de: 1, 2, 4, 4, 5, 7, 8, 8, 9, 12.', 'احسب المدى الربيعي لـ: 1، 2، 4، 4، 5، 7، 8، 8، 9، 12.', 'Calculate the interquartile range of: 1, 2, 4, 4, 5, 7, 8, 8, 9, 12.'),
        expected: n(4),
        hint: say('$10\\cdot 0{,}25$ eta $10\\cdot 0{,}75$ hamartarrak dira: hurrengo postuak.', '$10\\cdot 0{,}25$ y $10\\cdot 0{,}75$ son decimales: las posiciones siguientes.', '$10\\cdot 0{,}25$ و$10\\cdot 0{,}75$ عشريان: الموقعان التاليان.', '$10\\cdot 0{,}25$ and $10\\cdot 0{,}75$ are decimals: use the next positions.'),
        explanation: say('3. datua $Q_1=4$ eta 8. datua $Q_3=8$: $8-4=4$.', 'El dato 3.º, $Q_1=4$, y el 8.º, $Q_3=8$: $8-4=4$.', 'البيان الثالث $Q_1=4$ والثامن $Q_3=8$: $8-4=4$.', 'The 3rd value, $Q_1=4$, and the 8th, $Q_3=8$: $8-4=4$.')
    },
    {
        id: 109, stage: 'position', points: 30, context: 'master',
        prompt: say('Kutxa-diagrama batean $Q_3=50$ da eta goiko biboteak, gehienez, 65era irits daiteke. Zenbat balio du $Q_1$-ek?', 'En un diagrama de caja $Q_3=50$ y el bigote superior puede llegar como mucho a 65. ¿Cuánto vale $Q_1$?', 'في مخطط صندوق $Q_3=50$ والشارب العلوي يمكن أن يصل على الأكثر إلى 65. كم يساوي $Q_1$؟', 'In a box plot, $Q_3=50$ and the upper whisker can reach at most 65. What is $Q_1$?'),
        expected: n(40),
        hint: say('$65-50$ RIC bider 1,5 da.', '$65-50$ es 1,5 veces el RIC.', '$65-50$ يساوي 1.5 مرة المدى الربيعي.', '$65-50$ is 1.5 times the IQR.'),
        explanation: say('$\\frac{65-50}{1{,}5}=10$ da RIC, beraz $Q_1=50-10=40$.', 'El RIC es $\\frac{65-50}{1{,}5}=10$, luego $Q_1=50-10=40$.', 'المدى الربيعي $\\frac{65-50}{1{,}5}=10$، إذن $Q_1=50-10=40$.', 'The IQR is $\\frac{65-50}{1{,}5}=10$, so $Q_1=50-10=40$.')
    },

    /* ---------- Dispersion ---------- */
    {
        id: 110, stage: 'spread', points: 10, context: 'starter',
        prompt: say('Kalkulatu batez besteko desbideratzea: 2, 2, 5, 7.', 'Calcula la desviación media de: 2, 2, 5, 7.', 'احسب الانحراف المتوسط لـ: 2، 2، 5، 7.', 'Calculate the mean deviation of: 2, 2, 5, 7.'),
        expected: n(2),
        hint: say('Batez bestekoa 4 da.', 'La media es 4.', 'المتوسط 4.', 'The mean is 4.'),
        explanation: same('$\\frac{2+2+1+3}{4}=\\frac{8}{4}=2$')
    },
    {
        id: 111, stage: 'spread', points: 20, context: 'advanced',
        prompt: say('Kalkulatu desbideratze tipikoa: 2, 4, 4, 4, 5, 5, 7, 9.', 'Calcula la desviación típica de: 2, 4, 4, 4, 5, 5, 7, 9.', 'احسب الانحراف المعياري لـ: 2، 4، 4، 4، 5، 5، 7، 9.', 'Calculate the standard deviation of: 2, 4, 4, 4, 5, 5, 7, 9.'),
        expected: n(2),
        hint: say('Batez bestekoa 5; karratuen batez bestekoa ken 25.', 'La media es 5; la media de los cuadrados menos 25.', 'المتوسط 5؛ متوسط المربعات ناقص 25.', 'The mean is 5; the mean of the squares minus 25.'),
        explanation: same('$\\frac{232}{8}-5^{2}=4\\qquad \\sqrt{4}=2$')
    },
    {
        id: 112, stage: 'spread', points: 30, context: 'master',
        prompt: with_(say('Banaketa batean $\\bar{x}=8$ eta $\\sigma=2$. Datu guztiei 3 gehitzen zaie. Zein da aldakuntza-koefiziente berria?', 'En una distribución $\\bar{x}=8$ y $\\sigma=2$. Se suma 3 a todos los datos. ¿Cuál es el nuevo coeficiente de variación?', 'في توزيع $\\bar{x}=8$ و$\\sigma=2$. نضيف 3 إلى كل البيانات. ما معامل الاختلاف الجديد؟', 'In a distribution, $\\bar{x}=8$ and $\\sigma=2$. 3 is added to all the values. What is the new coefficient of variation?'), HUNDREDTHS),
        expected: v('0,18'),
        hint: say('Batez bestekoa 3 mugitzen da; sakabanaketa ez da aldatzen.', 'La media se desplaza 3; la dispersión no cambia.', 'ينزاح المتوسط 3؛ والتشتت لا يتغيّر.', 'The mean shifts by 3; the spread does not change.'),
        explanation: say('$\\bar{x}=11$ eta $\\sigma=2$: $\\frac{2}{11}\\approx 0{,}18$.', '$\\bar{x}=11$ y $\\sigma=2$: $\\frac{2}{11}\\approx 0{,}18$.', '$\\bar{x}=11$ و$\\sigma=2$: $\\frac{2}{11}\\approx 0{,}18$.', '$\\bar{x}=11$ and $\\sigma=2$: $\\frac{2}{11}\\approx 0{,}18$.')
    },

    /* ---------- Two variables ---------- */
    {
        id: 113, stage: 'two', points: 10, context: 'starter',
        prompt: say('Erregresio-zuzena $\\hat{y}=1{,}2x+5$ da. Estimatu $y$ $x=10$ denean.', 'La recta de regresión es $\\hat{y}=1{,}2x+5$. Estima $y$ para $x=10$.', 'مستقيم الانحدار $\\hat{y}=1{,}2x+5$. قدّر $y$ عندما $x=10$.', 'The regression line is $\\hat{y}=1{,}2x+5$. Estimate $y$ for $x=10$.'),
        expected: n(17),
        hint: say('Ordeztu $x=10$.', 'Sustituye $x=10$.', 'عوّض $x=10$.', 'Substitute $x=10$.'),
        explanation: same('$1{,}2\\cdot 10+5=17$')
    },
    {
        id: 114, stage: 'two', points: 20, context: 'advanced',
        prompt: say('Erregresio-zuzena $\\hat{y}=2{,}5x+5$ da. Zein $x$-rekin estimatzen da $y=30$?', 'La recta de regresión es $\\hat{y}=2{,}5x+5$. ¿Con qué $x$ se estima $y=30$?', 'مستقيم الانحدار $\\hat{y}=2{,}5x+5$. مع أي $x$ نقدّر $y=30$؟', 'The regression line is $\\hat{y}=2{,}5x+5$. For what $x$ is the estimate $y=30$?'),
        expected: n(10),
        hint: say('Ebatzi $2{,}5x+5=30$.', 'Resuelve $2{,}5x+5=30$.', 'حلّ $2{,}5x+5=30$.', 'Solve $2{,}5x+5=30$.'),
        explanation: same('$\\frac{30-5}{2{,}5}=10$')
    },
    {
        id: 115, stage: 'two', points: 30, context: 'master',
        prompt: say('Erregresio-zuzena $(\\bar{x},\\bar{y})=(4,\\ 9)$ eta $(8,\\ 15)$ puntuetatik pasatzen da. Estimatu $y$ $x=6$ denean.', 'La recta de regresión pasa por $(\\bar{x},\\bar{y})=(4,\\ 9)$ y por $(8,\\ 15)$. Estima $y$ para $x=6$.', 'يمرّ مستقيم الانحدار بالنقطتين $(\\bar{x},\\bar{y})=(4,\\ 9)$ و$(8,\\ 15)$. قدّر $y$ عندما $x=6$.', 'The regression line passes through $(\\bar{x},\\bar{y})=(4,\\ 9)$ and $(8,\\ 15)$. Estimate $y$ for $x=6$.'),
        expected: n(12),
        hint: say('Lehenik malda; gero batez bestekoen puntutik.', 'Primero la pendiente; después, desde el punto de las medias.', 'أولًا الميل؛ ثم من نقطة المتوسطين.', 'First the slope; then, from the point of means.'),
        explanation: same('$\\frac{15-9}{8-4}=1{,}5\\qquad 9+1{,}5\\cdot(6-4)=12$')
    }
]

export const statisticsAkExerciseBank: ExerciseSection[] = [
    {
        id: 'data',
        title: say('Datuak eta taulak', 'Datos y tablas', 'البيانات والجداول', 'Data and tables'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Sailkatu aldagaiak: jaiotze-eguna, jaiolekua eta altuera.', 'Clasifica las variables: día de nacimiento, lugar de nacimiento y estatura.', 'صنّف المتغيرات: يوم الميلاد، مكان الميلاد، الطول.', 'Classify the variables: date of birth, place of birth and height.'), solution: say('Jaiotze-eguna: kuantitatibo diskretua. Jaiolekua: kualitatiboa. Altuera: kuantitatibo jarraitua.', 'Día de nacimiento: cuantitativa discreta. Lugar de nacimiento: cualitativa. Estatura: cuantitativa continua.', 'يوم الميلاد: كمي منفصل. مكان الميلاد: نوعي. الطول: كمي متصل.', 'Date of birth: quantitative discrete. Place of birth: qualitative. Height: quantitative continuous.') },
            { id: 2, difficulty: 'easy', question: say('Ikastetxe bateko ikasleen altuera aztertzeko, abizenaren lehen letra A duten ikasleak hartzen dira. Lagin adierazgarria da?', 'Para estudiar la estatura de los alumnos de un centro se toman los alumnos cuyo apellido empieza por A. ¿Es una muestra representativa?', 'لدراسة أطوال تلاميذ مدرسة نأخذ التلاميذ الذين يبدأ لقبهم بحرف A. هل هي عيّنة ممثِّلة؟', 'To study the height of the students in a school, the students whose surname starts with A are selected. Is it a representative sample?'), solution: say('Altuerarako bai, abizenak ez baitu altuerarekin zerikusirik; baina abizenei buruzko azterketa baterako ez litzateke baliozkoa izango.', 'Para la estatura sí, porque el apellido no tiene que ver con la altura; pero no serviría para un estudio sobre los apellidos.', 'للطول نعم، لأن اللقب لا علاقة له بالطول؛ لكنها لا تصلح لدراسة عن الألقاب.', 'For height, yes, because surnames have nothing to do with height; but it would not work for a study about surnames.') },
            { id: 3, difficulty: 'easy', question: say('800 ikasleko ikastetxe batean, 40ko lagin sistematikoa egiten da. Zein da $k$ jauzia?', 'En un centro de 800 alumnos se hace una muestra sistemática de 40. ¿Cuál es el salto $k$?', 'في مدرسة من 800 تلميذ نأخذ عيّنة منتظمة من 40. ما الخطوة $k$؟', 'In a school of 800 students, a systematic sample of 40 is taken. What is the sampling interval $k$?'), solution: same('$\\frac{800}{40}=20$'), answer: { expected: n(20) } },
            { id: 4, difficulty: 'easy', question: with_(GOALS, say('Zein da 1 golaren maiztasun absolutu metatua?', '¿Cuál es la frecuencia absoluta acumulada del valor 1 gol?', 'ما التكرار المطلق المتجمّع لقيمة هدف واحد؟', 'What is the absolute cumulative frequency for 1 goal?')), solution: same('$6+7=13$'), answer: { expected: n(13) } },
            { id: 5, difficulty: 'medium', question: say('Hiri batek 30 000 biztanle ditu: 12 000 gazte, 10 500 heldu eta 7 500 adineko. 400 laguneko lagin geruzatu batean, zenbat heldu?', 'Una ciudad tiene 30 000 habitantes: 12 000 jóvenes, 10 500 adultos y 7 500 mayores. En una muestra estratificada de 400, ¿cuántos adultos?', 'في مدينة 30 000 نسمة: 12 000 شاب و10 500 بالغ و7 500 مسنّ. في عيّنة طبقية من 400، كم بالغًا؟', 'A city has 30,000 inhabitants: 12,000 young people, 10,500 adults and 7,500 older people. In a stratified sample of 400, how many adults should be in the sample?'), solution: same('$400\\cdot\\frac{10\\,500}{30\\,000}=140$'), answer: { expected: n(140) } },
            { id: 6, difficulty: 'medium', question: say('Taula bateko maiztasunak 2, 2, $f_3$, $f_4$ eta 4 dira, $N=19$, eta hirugarren balioaren metatua 7 da. Zenbat balio du $f_4$-k?', 'Las frecuencias de una tabla son 2, 2, $f_3$, $f_4$ y 4, con $N=19$, y la acumulada del tercer valor es 7. ¿Cuánto vale $f_4$?', 'تكرارات جدول 2، 2، $f_3$، $f_4$، 4، و$N=19$، والمتجمّع عند القيمة الثالثة 7. كم يساوي $f_4$؟', 'The frequencies in a table are 2, 2, $f_3$, $f_4$ and 4, with $N=19$, and the cumulative frequency of the third value is 7. What is $f_4$?'), solution: say('$2+2+f_3=7$, beraz $f_3=3$; eta $19-7-4=8$.', '$2+2+f_3=7$, luego $f_3=3$; y $19-7-4=8$.', '$2+2+f_3=7$، إذن $f_3=3$؛ و$19-7-4=8$.', '$2+2+f_3=7$, so $f_3=3$; and $19-7-4=8$.'), answer: { expected: n(8) } },
            { id: 7, difficulty: 'medium', question: with_(say('15 datuko taula batean, A balioak 8 maiztasun du. Zein da haren maiztasun erlatiboa?', 'En una tabla de 15 datos, el valor A tiene frecuencia 8. ¿Cuál es su frecuencia relativa?', 'في جدول من 15 بيانًا، تكرار القيمة A يساوي 8. ما تكرارها النسبي؟', 'In a table of 15 values, the value A has a frequency of 8. What is its relative frequency?'), HUNDREDTHS), solution: same('$\\frac{8}{15}\\approx 0{,}53$'), answer: { expected: v('0,53') } },
            { id: 8, difficulty: 'medium', question: say('Zein da $[26,\\ 38)$ tartearen klase-marka?', '¿Cuál es la marca de clase del intervalo $[26,\\ 38)$?', 'ما مركز الفئة $[26,\\ 38)$؟', 'What is the class midpoint of the interval $[26,\\ 38)$?'), solution: same('$\\frac{26+38}{2}=32$'), answer: { expected: n(32) } },
            { id: 9, difficulty: 'hard', question: say('Taula batean $h_1=0{,}2$, $h_2=0{,}36$, $h_3=0{,}12$ eta $f_4=8$ dira; ez dago beste baliorik. Zenbat datu daude?', 'En una tabla $h_1=0{,}2$, $h_2=0{,}36$, $h_3=0{,}12$ y $f_4=8$; no hay más valores. ¿Cuántos datos hay?', 'في جدول $h_1=0{,}2$ و$h_2=0{,}36$ و$h_3=0{,}12$ و$f_4=8$، ولا قيم أخرى. كم بيانًا هناك؟', 'In a table, $h_1=0{,}2$, $h_2=0{,}36$, $h_3=0{,}12$ and $f_4=8$; there are no more values. How many data values are there?'), solution: say('$h_4=1-0{,}2-0{,}36-0{,}12=0{,}32$, eta $\\frac{8}{0{,}32}=25$.', '$h_4=1-0{,}2-0{,}36-0{,}12=0{,}32$, y $\\frac{8}{0{,}32}=25$.', '$h_4=1-0{,}2-0{,}36-0{,}12=0{,}32$، و$\\frac{8}{0{,}32}=25$.', '$h_4=1-0{,}2-0{,}36-0{,}12=0{,}32$, and $\\frac{8}{0{,}32}=25$.'), answer: { expected: n(25) } },
            { id: 10, difficulty: 'hard', question: say('Datuak 8tik 92ra doaz eta zabalera bereko 7 tartetan antolatu nahi dira, soberakina bi muturretan banatuta. Non hasten da lehen tartea?', 'Los datos van de 8 a 92 y se quieren agrupar en 7 intervalos de la misma amplitud, con el exceso repartido entre los extremos. ¿Dónde empieza el primer intervalo?', 'تمتد البيانات من 8 إلى 92 ونريد تبويبها في 7 فئات متساوية الطول مع توزيع الفائض على الطرفين. أين تبدأ الفئة الأولى؟', 'The data go from 8 to 92 and are to be grouped into 7 intervals of the same width, with the excess shared between the two ends. Where does the first interval start?'), solution: say('$92-8=84$; 84 baino handiagoa eta 7z zatigarria: $r\'=91$, zabalera $91:7=13$. Soberakina 7 da: $8-3{,}5=4{,}5$.', '$92-8=84$; mayor que 84 y divisible entre 7: $r\'=91$, amplitud $91:7=13$. El exceso es 7: $8-3{,}5=4{,}5$.', '$92-8=84$؛ أكبر من 84 ويقبل القسمة على 7: $r\'=91$، والطول $91:7=13$. الفائض 7: $8-3{,}5=4{,}5$.', '$92-8=84$; larger than 84 and divisible by 7: $r\'=91$, width $91:7=13$. The excess is 7: $8-3{,}5=4{,}5$.'), answer: { expected: v('4,5') } }
        ]
    },
    {
        id: 'centre',
        title: say('Zentralizazioa', 'Centralización', 'النزعة المركزية', 'Central tendency'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Kalkulatu batez bestekoa: 4, 7, 7, 9, 13.', 'Calcula la media de: 4, 7, 7, 9, 13.', 'احسب متوسط: 4، 7، 7، 9، 13.', 'Calculate the mean of: 4, 7, 7, 9, 13.'), solution: same('$\\frac{4+7+7+9+13}{5}=8$'), answer: { expected: n(8) } },
            { id: 12, difficulty: 'easy', question: with_(GOALS, say('Zein da moda?', '¿Cuál es la moda?', 'ما المنوال؟', 'What is the mode?')), solution: say('Maiztasun handiena 8 da, 2 golena: $\\text{Mo}=2$.', 'La mayor frecuencia es 8, la de 2 goles: $\\text{Mo}=2$.', 'أكبر تكرار 8، وهو لهدفين: $\\text{Mo}=2$.', 'The highest frequency is 8, the one for 2 goals: $\\text{Mo}=2$.'), answer: { expected: n(2) } },
            { id: 13, difficulty: 'easy', question: say('Aurkitu mediana: 12, 15, 9, 20, 14, 11.', 'Halla la mediana de: 12, 15, 9, 20, 14, 11.', 'أوجد وسيط: 12، 15، 9، 20، 14، 11.', 'Find the median of: 12, 15, 9, 20, 14, 11.'), solution: say('Ordenatuta 9, 11, 12, 14, 15, 20: $\\frac{12+14}{2}=13$.', 'Ordenados 9, 11, 12, 14, 15, 20: $\\frac{12+14}{2}=13$.', 'بعد الترتيب 9، 11، 12، 14، 15، 20: $\\frac{12+14}{2}=13$.', 'Ordered: 9, 11, 12, 14, 15, 20: $\\frac{12+14}{2}=13$.'), answer: { expected: n(13) } },
            { id: 14, difficulty: 'medium', question: with_(GOALS, say('Kalkulatu batez bestekoa.', 'Calcula la media.', 'احسب المتوسط.', 'Calculate the mean.')), solution: same('$\\frac{0+7+16+18+8+5}{30}=\\frac{54}{30}=1{,}8$'), answer: { expected: v('1,8') } },
            { id: 15, difficulty: 'medium', question: say('Motor batek 10 km egiten ditu egunero 18 egunetan, eta 6 km egunero beste 12 egunetan. Zenbat kilometro egiten ditu egunean, batez beste?', 'Una moto recorre 10 km diarios durante 18 días y 6 km diarios durante otros 12. ¿Cuántos kilómetros hace al día, de media?', 'تقطع دراجة نارية 10 كم يوميًا مدة 18 يومًا و6 كم يوميًا مدة 12 يومًا أخرى. كم كيلومترًا تقطع يوميًا في المتوسط؟', 'A motorbike travels 10 km a day for 18 days and 6 km a day for another 12 days. How many kilometres a day does it travel on average?'), solution: same('$\\frac{18\\cdot 10+12\\cdot 6}{30}=\\frac{252}{30}=8{,}4$'), answer: { expected: v('8,4') } },
            { id: 16, difficulty: 'medium', question: say('Taula: 2 → 3, 4 → 1, 6 → 5, 8 → 2, 10 → 7. Kalkulatu batez bestekoa eta mediana.', 'Tabla: 2 → 3, 4 → 1, 6 → 5, 8 → 2, 10 → 7. Calcula la media y la mediana.', 'جدول: 2 ← 3، 4 ← 1، 6 ← 5، 8 ← 2، 10 ← 7. احسب المتوسط والوسيط.', 'Table: 2 → 3, 4 → 1, 6 → 5, 8 → 2, 10 → 7. Calculate the mean and the median.'), solution: say('$\\frac{6+4+30+16+70}{18}=7$; metatuak 3, 4, 9, 11, 18: 9. eta 10. datuak 6 eta 8, $\\text{Me}=7$. Moda 10 da.', '$\\frac{6+4+30+16+70}{18}=7$; acumuladas 3, 4, 9, 11, 18: los datos 9.º y 10.º son 6 y 8, $\\text{Me}=7$. La moda es 10.', '$\\frac{6+4+30+16+70}{18}=7$؛ المتجمّعة 3، 4، 9، 11، 18: البيانان التاسع والعاشر 6 و8، $\\text{Me}=7$. والمنوال 10.', '$\\frac{6+4+30+16+70}{18}=7$; cumulative frequencies 3, 4, 9, 11, 18: the 9th and 10th values are 6 and 8, $\\text{Med}=7$. The mode is 10.'), answer: { expected: n(7) } },
            { id: 17, difficulty: 'medium', question: say('Itxaron-denborak (min): $[0,15)$ 6, $[15,30)$ 3, $[30,45)$ 5, $[45,60)$ 6. Zein dira tarte modalak?', 'Tiempos de espera (min): $[0,15)$ 6, $[15,30)$ 3, $[30,45)$ 5, $[45,60)$ 6. ¿Cuáles son los intervalos modales?', 'أزمنة الانتظار (دقيقة): $[0,15)$ 6، $[15,30)$ 3، $[30,45)$ 5، $[45,60)$ 6. ما الفئات المنوالية؟', 'Waiting times (min): $[0,15)$ 6, $[15,30)$ 3, $[30,45)$ 5, $[45,60)$ 6. What are the modal intervals?'), solution: say('Bi tartek dute maiztasun handiena (6): $[0,15)$ eta $[45,60)$. Banaketa bimodala da: $\\text{Mo}=7{,}5$ eta $52{,}5$.', 'Dos intervalos tienen la mayor frecuencia (6): $[0,15)$ y $[45,60)$. La distribución es bimodal: $\\text{Mo}=7{,}5$ y $52{,}5$.', 'لفئتين أكبر تكرار (6): $[0,15)$ و$[45,60)$. التوزيع ثنائي المنوال: $\\text{Mo}=7{,}5$ و$52{,}5$.', 'Two intervals have the highest frequency (6): $[0,15)$ and $[45,60)$. The distribution is bimodal: $\\text{Mo}=7{,}5$ and $52{,}5$.') },
            { id: 18, difficulty: 'hard', question: say('Azterketa batek % 40 balio du eta beste batek % 60. Ane-k 5 eta 8 atera ditu. Zein da bere nota haztatua?', 'Un examen vale el 40 % y otro el 60 %. Ane ha sacado un 5 y un 8. ¿Cuál es su nota ponderada?', 'امتحان يساوي 40 % وآخر 60 %. حصلت آني على 5 و8. ما علامتها المرجّحة؟', 'One exam counts for 40% and another for 60%. Ane got a 5 and an 8. What is Ane\'s weighted mark?'), solution: same('$0{,}4\\cdot 5+0{,}6\\cdot 8=6{,}8$'), answer: { expected: v('6,8') } },
            { id: 19, difficulty: 'hard', question: say('Tarteak: $[0,4)$ 5, $[4,8)$ 9, $[8,12)$ 4, $[12,16)$ 2. Kalkulatu batez bestekoa eta aurkitu mediana-tartea.', 'Intervalos: $[0,4)$ 5, $[4,8)$ 9, $[8,12)$ 4, $[12,16)$ 2. Calcula la media y halla el intervalo mediano.', 'الفئات: $[0,4)$ 5، $[4,8)$ 9، $[8,12)$ 4، $[12,16)$ 2. احسب المتوسط وأوجد الفئة الوسيطية.', 'Intervals: $[0,4)$ 5, $[4,8)$ 9, $[8,12)$ 4, $[12,16)$ 2. Calculate the mean and find the median interval.'), solution: say('$\\frac{2\\cdot 5+6\\cdot 9+10\\cdot 4+14\\cdot 2}{20}=\\frac{132}{20}=6{,}6$. Metatuak 5, 14…: 10. datua $[4,8)$ tartean.', '$\\frac{2\\cdot 5+6\\cdot 9+10\\cdot 4+14\\cdot 2}{20}=\\frac{132}{20}=6{,}6$. Acumuladas 5, 14…: el dato 10.º, en $[4,8)$.', '$\\frac{2\\cdot 5+6\\cdot 9+10\\cdot 4+14\\cdot 2}{20}=\\frac{132}{20}=6{,}6$. المتجمّعة 5، 14…: البيان العاشر في $[4,8)$.', '$\\frac{2\\cdot 5+6\\cdot 9+10\\cdot 4+14\\cdot 2}{20}=\\frac{132}{20}=6{,}6$. Cumulative frequencies 5, 14…: the 10th value, in $[4,8)$.'), answer: { expected: v('6,6') } },
            { id: 20, difficulty: 'hard', question: say('Zazpi datuen batez bestekoa 10 da. Datu bat kenduta, gainerako seien batez bestekoa 9 da. Zein datu kendu da?', 'La media de siete datos es 10. Al quitar un dato, la media de los seis restantes es 9. ¿Qué dato se ha quitado?', 'متوسط سبعة بيانات 10. بعد حذف بيان صار متوسط الستة الباقية 9. أي بيان حُذف؟', 'The mean of seven values is 10. When one value is removed, the mean of the remaining six is 9. Which value was removed?'), solution: same('$7\\cdot 10-6\\cdot 9=70-54=16$'), answer: { expected: n(16) } }
        ]
    },
    {
        id: 'position',
        title: say('Posizioa', 'Posición', 'الموقع', 'Position'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Zein parametro da 50 pertzentila?', '¿Qué parámetro es el percentil 50?', 'أي مقياس هو المئين 50؟', 'Which measure is the 50th percentile?'), solution: say('Mediana: $p_{50}=Q_2=\\text{Me}$.', 'La mediana: $p_{50}=Q_2=\\text{Me}$.', 'الوسيط: $p_{50}=Q_2=\\text{Me}$.', 'The median: $p_{50}=Q_2=\\text{Med}$.') },
            { id: 22, difficulty: 'easy', question: say('Aurkitu mediana: 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 15.', 'Halla la mediana de: 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 15.', 'أوجد وسيط: 2، 3، 3، 4، 5، 5، 6، 7، 7، 8، 9، 15.', 'Find the median of: 2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 15.'), solution: say('6. eta 7. datuak: $\\frac{5+6}{2}=5{,}5$.', 'Datos 6.º y 7.º: $\\frac{5+6}{2}=5{,}5$.', 'البيانان السادس والسابع: $\\frac{5+6}{2}=5{,}5$.', 'The 6th and 7th values: $\\frac{5+6}{2}=5{,}5$.'), answer: { expected: v('5,5') } },
            { id: 23, difficulty: 'easy', question: say('Kutxa-diagrama batean $Q_1=24$ eta $Q_3=31$ dira. Zein da RIC?', 'En un diagrama de caja $Q_1=24$ y $Q_3=31$. ¿Cuál es el RIC?', 'في مخطط صندوق $Q_1=24$ و$Q_3=31$. ما المدى الربيعي؟', 'In a box plot, $Q_1=24$ and $Q_3=31$. What is the IQR?'), solution: same('$31-24=7$'), answer: { expected: n(7) } },
            { id: 24, difficulty: 'medium', question: say('Aurkitu $Q_1$: 18, 20, 22, 22, 23, 24, 25, 25, 27, 28, 30, 30, 31, 32, 35.', 'Halla $Q_1$ de: 18, 20, 22, 22, 23, 24, 25, 25, 27, 28, 30, 30, 31, 32, 35.', 'أوجد $Q_1$ لـ: 18، 20، 22، 22، 23، 24، 25، 25، 27، 28، 30، 30، 31، 32، 35.', 'Find $Q_1$ of: 18, 20, 22, 22, 23, 24, 25, 25, 27, 28, 30, 30, 31, 32, 35.'), solution: say('$15\\cdot 0{,}25=3{,}75\\ \\to\\ 4$. datua: $Q_1=22$.', '$15\\cdot 0{,}25=3{,}75\\ \\to\\ 4$.º dato: $Q_1=22$.', '$15\\cdot 0{,}25=3{,}75\\ \\to\\ 4$، البيان الرابع: $Q_1=22$.', '$15\\cdot 0{,}25=3{,}75\\ \\to\\ 4$th value: $Q_1=22$.'), answer: { expected: n(22) } },
            { id: 25, difficulty: 'medium', question: with_(MARKS, say('Zein da $p_{40}$?', '¿Cuál es $p_{40}$?', 'ما $p_{40}$؟', 'What is $p_{40}$?')), solution: say('Ehuneko metatuak 12,5; 32,5; 55…: 40 6an gainditzen da, $p_{40}=6$.', 'Porcentajes acumulados 12,5; 32,5; 55…: el 40 se supera en el 6, $p_{40}=6$.', 'النسب المتجمّعة 12.5؛ 32.5؛ 55…: تُتجاوز 40 عند 6، $p_{40}=6$.', 'Cumulative percentages 12.5; 32.5; 55…: 40 is exceeded at 6, so $p_{40}=6$.'), answer: { expected: n(6) } },
            { id: 26, difficulty: 'medium', question: with_(MARKS, say('Zein ehunekok atera du 6 edo gutxiago?', '¿Qué porcentaje ha sacado un 6 o menos?', 'ما نسبة من حصلوا على 6 أو أقل؟', 'What percentage got a 6 or less?')), solution: same('$\\frac{5+8+9}{40}\\cdot 100=55$'), answer: { expected: n(55) } },
            { id: 27, difficulty: 'medium', question: say('Kirol-orduetan (2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 15) $Q_1=3{,}5$ eta $Q_3=7{,}5$ dira. Zein da goiko muga?', 'En las horas de deporte (2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 15) $Q_1=3{,}5$ y $Q_3=7{,}5$. ¿Cuál es el límite superior?', 'في ساعات الرياضة (2، 3، 3، 4، 5، 5، 6، 7، 7، 8، 9، 15) $Q_1=3{,}5$ و$Q_3=7{,}5$. ما الحدّ العلوي؟', 'For the hours of sport (2, 3, 3, 4, 5, 5, 6, 7, 7, 8, 9, 15), $Q_1=3{,}5$ and $Q_3=7{,}5$. What is the upper limit?'), solution: say('$7{,}5+1{,}5\\cdot 4=13{,}5$: 15 atipikoa da.', '$7{,}5+1{,}5\\cdot 4=13{,}5$: el 15 es atípico.', '$7{,}5+1{,}5\\cdot 4=13{,}5$: العدد 15 شاذ.', '$7{,}5+1{,}5\\cdot 4=13{,}5$: the 15 is an outlier.'), answer: { expected: v('13,5') } },
            { id: 28, difficulty: 'hard', question: say('87 pertsonaren puntuazioak 1 eta 9 artean daude; $Q_1=4{,}1$ eta $Q_3=6{,}8$. Zein da beheko muga? Badago atipikorik beheko aldean?', 'Las puntuaciones de 87 personas están entre 1 y 9; $Q_1=4{,}1$ y $Q_3=6{,}8$. ¿Cuál es el límite inferior? ¿Hay atípicos por abajo?', 'درجات 87 شخصًا بين 1 و9؛ $Q_1=4{,}1$ و$Q_3=6{,}8$. ما الحدّ السفلي؟ هل توجد شواذ في الأسفل؟', 'The scores of 87 people are between 1 and 9; $Q_1=4{,}1$ and $Q_3=6{,}8$. What is the lower limit? Are there any outliers below?'), solution: say('RIC 2,7 da: $4{,}1-1{,}5\\cdot 2{,}7=0{,}05$. 1 muga barruan dago: ez dago atipikorik beheko aldean.', 'El RIC es 2,7: $4{,}1-1{,}5\\cdot 2{,}7=0{,}05$. El 1 queda dentro: no hay atípicos por abajo.', 'المدى الربيعي 2.7: $4{,}1-1{,}5\\cdot 2{,}7=0{,}05$. العدد 1 داخل الحدّ: لا شواذ في الأسفل.', 'The IQR is 2.7: $4{,}1-1{,}5\\cdot 2{,}7=0{,}05$. The 1 is inside: there are no outliers below.'), answer: { expected: v('0,05') } },
            { id: 29, difficulty: 'hard', question: say('Bi taldeen kutxa-diagramak: A, $Q_1=5$, Me $=6$, $Q_3=7$; B, $Q_1=3$, Me $=6$, $Q_3=9$. Biek mediana bera dute. Zeinek du erdiko % 50 bilduago?', 'Diagramas de caja de dos grupos: A, $Q_1=5$, Me $=6$, $Q_3=7$; B, $Q_1=3$, Me $=6$, $Q_3=9$. Tienen la misma mediana. ¿Cuál tiene el 50 % central más agrupado?', 'مخططا صندوق لمجموعتين: A، $Q_1=5$، Me $=6$، $Q_3=7$؛ B، $Q_1=3$، Me $=6$، $Q_3=9$. لهما الوسيط نفسه. أيهما الـ50 % الأوسط فيه أكثر تجمّعًا؟', 'Box plots of two groups: A, $Q_1=5$, Med $=6$, $Q_3=7$; B, $Q_1=3$, Med $=6$, $Q_3=9$. They have the same median. Which has the more tightly grouped middle 50%?'), solution: say('A: RIC $7-5=2$; B: $9-3=6$. A-ren kutxa estuagoa da: homogeneoagoa.', 'A: RIC $7-5=2$; B: $9-3=6$. La caja de A es más estrecha: más homogéneo.', 'A: المدى الربيعي $7-5=2$؛ B: $9-3=6$. صندوق A أضيق: أكثر تجانسًا.', 'A: IQR $7-5=2$; B: $9-3=6$. A\'s box is narrower, so it is more homogeneous.') },
            { id: 30, difficulty: 'hard', question: say('400 ikasleren noten ehuneko metatuak: 4 → 26,75; 5 → 54; 6 → 74,25; 7 → 84; 8 → 89,5. Zein da $Q_3$?', 'Porcentajes acumulados de las notas de 400 alumnos: 4 → 26,75; 5 → 54; 6 → 74,25; 7 → 84; 8 → 89,5. ¿Cuál es $Q_3$?', 'النسب المتجمّعة لعلامات 400 تلميذ: 4 ← 26.75؛ 5 ← 54؛ 6 ← 74.25؛ 7 ← 84؛ 8 ← 89.5. ما $Q_3$؟', 'Cumulative percentages of the marks of 400 students: 4 → 26.75; 5 → 54; 6 → 74.25; 7 → 84; 8 → 89.5. What is $Q_3$?'), solution: say('6an % 74,25 dago oraindik; 75 7an gainditzen da: $Q_3=7$.', 'En el 6 aún hay un 74,25 %; el 75 se supera en el 7: $Q_3=7$.', 'عند 6 ما زالت النسبة 74.25 %؛ وتُتجاوز 75 عند 7: $Q_3=7$.', 'At 6 there is still 74.25%; 75 is exceeded at 7: $Q_3=7$.'), answer: { expected: n(7) } }
        ]
    },
    {
        id: 'spread',
        title: say('Sakabanaketa', 'Dispersión', 'التشتت', 'Spread'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Kalkulatu ibiltartea: 4; 5; 4,5; 5,6.', 'Calcula el recorrido de: 4; 5; 4,5; 5,6.', 'احسب مدى: 4؛ 5؛ 4.5؛ 5.6.', 'Calculate the range of: 4; 5; 4.5; 5.6.'), solution: same('$5{,}6-4=1{,}6$'), answer: { expected: v('1,6') } },
            { id: 32, difficulty: 'easy', question: say('Bariantza 16 da. Zein da desbideratze tipikoa?', 'La varianza es 16. ¿Cuál es la desviación típica?', 'التباين 16. ما الانحراف المعياري؟', 'The variance is 16. What is the standard deviation?'), solution: same('$\\sqrt{16}=4$'), answer: { expected: n(4) } },
            { id: 33, difficulty: 'easy', question: say('Zergatik ez da desbideratzeen batura erabiltzen sakabanaketa neurtzeko?', '¿Por qué no se usa la suma de las desviaciones para medir la dispersión?', 'لماذا لا نستعمل مجموع الانحرافات لقياس التشتت؟', 'Why is the sum of the deviations not used to measure spread?'), solution: say('Positiboak eta negatiboak elkarri kentzen zaizkio eta batura beti 0 da; horregatik balio absolutua (DM) edo karratua (bariantza) hartzen da.', 'Las positivas y las negativas se compensan y la suma siempre es 0; por eso se toma el valor absoluto (DM) o el cuadrado (varianza).', 'الموجبة والسالبة تتعادل ويكون المجموع دائمًا 0؛ لذلك نأخذ القيمة المطلقة (DM) أو المربع (التباين).', 'The positive and negative deviations cancel each other out and the sum is always 0; that is why we take the absolute value (MD) or the square (variance).') },
            { id: 34, difficulty: 'medium', question: say('Kalkulatu batez besteko desbideratzea: 1, 3, 5, 7, 9.', 'Calcula la desviación media de: 1, 3, 5, 7, 9.', 'احسب الانحراف المتوسط لـ: 1، 3، 5، 7، 9.', 'Calculate the mean deviation of: 1, 3, 5, 7, 9.'), solution: same('$\\frac{4+2+0+2+4}{5}=2{,}4$'), answer: { expected: v('2,4') } },
            { id: 35, difficulty: 'medium', question: with_(GOALS, say('$\\sum f_i x_i^2=150$ jakinda, kalkulatu bariantza.', 'Sabiendo que $\\sum f_i x_i^2=150$, calcula la varianza.', 'إذا علمت أن $\\sum f_i x_i^2=150$، احسب التباين.', 'Given that $\\sum f_i x_i^2=150$, calculate the variance.')), solution: same('$\\frac{150}{30}-1{,}8^{2}=5-3{,}24=1{,}76$'), answer: { expected: v('1,76') } },
            { id: 36, difficulty: 'medium', question: say('Taula: 1 → 2, 2 → 5, 3 → 6, 4 → 1. $\\sum f_i x_i=34$ eta $\\sum f_i x_i^2=92$. Kalkulatu bariantza.', 'Tabla: 1 → 2, 2 → 5, 3 → 6, 4 → 1. $\\sum f_i x_i=34$ y $\\sum f_i x_i^2=92$. Calcula la varianza.', 'جدول: 1 ← 2، 2 ← 5، 3 ← 6، 4 ← 1. $\\sum f_i x_i=34$ و$\\sum f_i x_i^2=92$. احسب التباين.', 'Table: 1 → 2, 2 → 5, 3 → 6, 4 → 1. $\\sum f_i x_i=34$ and $\\sum f_i x_i^2=92$. Calculate the variance.'), solution: same('$\\frac{92}{14}-\\left(\\frac{34}{14}\\right)^{2}=\\frac{1288-1156}{196}=\\frac{132}{196}\\approx 0{,}67$') , answer: { expected: v('0,67') } },
            { id: 37, difficulty: 'medium', question: with_(say('Banaketa batean $\\bar{x}=4{,}775$ eta $\\sigma=0{,}59$. Zein da CV ehunekotan?', 'En una distribución $\\bar{x}=4{,}775$ y $\\sigma=0{,}59$. ¿Cuál es el CV en porcentaje?', 'في توزيع $\\bar{x}=4{,}775$ و$\\sigma=0{,}59$. ما CV بالنسبة المئوية؟', 'In a distribution, $\\bar{x}=4{,}775$ and $\\sigma=0{,}59$. What is the CV as a percentage?'), say('Hurbildu hamarrenetara.', 'Aproxima a las décimas.', 'قرّب إلى الأعشار.', 'Round to the nearest tenth.')), solution: same('$\\frac{0{,}59}{4{,}775}\\cdot 100\\approx 12{,}4$'), answer: { expected: v('12,4') } },
            { id: 38, difficulty: 'hard', question: say('Datu guztiak 2z biderkatzen dira. Zer gertatzen zaie batez bestekoari, desbideratze tipikoari eta CV-ri?', 'Se multiplican todos los datos por 2. ¿Qué les pasa a la media, a la desviación típica y al CV?', 'نضرب كل البيانات في 2. ماذا يحدث للمتوسط والانحراف المعياري وCV؟', 'All the data values are multiplied by 2. What happens to the mean, the standard deviation and the CV?'), solution: say('Batez bestekoa eta $\\sigma$ bikoiztu egiten dira; CV ez da aldatzen, $\\frac{2\\sigma}{2\\bar{x}}=\\frac{\\sigma}{\\bar{x}}$ delako.', 'La media y $\\sigma$ se duplican; el CV no cambia, porque $\\frac{2\\sigma}{2\\bar{x}}=\\frac{\\sigma}{\\bar{x}}$.', 'يتضاعف المتوسط و$\\sigma$؛ ولا يتغيّر CV لأن $\\frac{2\\sigma}{2\\bar{x}}=\\frac{\\sigma}{\\bar{x}}$.', 'The mean and $\\sigma$ double; the CV does not change, because $\\frac{2\\sigma}{2\\bar{x}}=\\frac{\\sigma}{\\bar{x}}$.') },
            { id: 39, difficulty: 'hard', question: say('Albaren notak: $\\bar{x}=4{,}775$, $\\sigma=0{,}59$. Javierrenak: $\\bar{x}=4{,}625$, $\\sigma=1{,}98$. Zein da erregularragoa?', 'Notas de Alba: $\\bar{x}=4{,}775$, $\\sigma=0{,}59$. Las de Javier: $\\bar{x}=4{,}625$, $\\sigma=1{,}98$. ¿Quién es más regular?', 'علامات ألبا: $\\bar{x}=4{,}775$، $\\sigma=0{,}59$. وعلامات خابيير: $\\bar{x}=4{,}625$، $\\sigma=1{,}98$. من الأكثر انتظامًا؟', 'Alba\'s marks: $\\bar{x}=4{,}775$, $\\sigma=0{,}59$. Javier\'s marks: $\\bar{x}=4{,}625$, $\\sigma=1{,}98$. Who is more consistent?'), solution: say('$\\frac{0{,}59}{4{,}775}\\approx 0{,}12$ eta $\\frac{1{,}98}{4{,}625}\\approx 0{,}43$: Alba, CV txikiagoa duelako.', '$\\frac{0{,}59}{4{,}775}\\approx 0{,}12$ y $\\frac{1{,}98}{4{,}625}\\approx 0{,}43$: Alba, porque tiene menor CV.', '$\\frac{0{,}59}{4{,}775}\\approx 0{,}12$ و$\\frac{1{,}98}{4{,}625}\\approx 0{,}43$: ألبا، لأن CV لها أصغر.', '$\\frac{0{,}59}{4{,}775}\\approx 0{,}12$ and $\\frac{1{,}98}{4{,}625}\\approx 0{,}43$: Alba, because the CV is lower.') },
            { id: 40, difficulty: 'hard', question: say('Kalkulatu desbideratze tipikoa: 2, 4, 6, 8.', 'Calcula la desviación típica de: 2, 4, 6, 8.', 'احسب الانحراف المعياري لـ: 2، 4، 6، 8.', 'Calculate the standard deviation of: 2, 4, 6, 8.'), solution: same('$\\frac{4+16+36+64}{4}-5^{2}=30-25=5\\qquad \\sigma=\\sqrt{5}\\approx 2{,}24$'), answer: { expected: v('2,24') } }
        ]
    },
    {
        id: 'two',
        title: say('Bi aldagai', 'Dos variables', 'متغيران', 'Two variables'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Funtzionala ala estatistikoa? a) Karratu baten aldea eta azalera. b) Pertsona baten altuera eta pisua.', '¿Funcional o estadística? a) El lado de un cuadrado y su área. b) La altura y el peso de una persona.', 'دالية أم إحصائية؟ أ) ضلع مربع ومساحته. ب) طول شخص ووزنه.', 'Is it a functional or a statistical relationship? a) The side of a square and its area. b) The height and weight of a person.'), solution: say('a) Funtzionala: $y=x^2$. b) Estatistikoa: altuera handiagoa, normalean pisu handiagoa, baina ez beti.', 'a) Funcional: $y=x^2$. b) Estadística: más altura suele llevar más peso, pero no siempre.', 'أ) دالية: $y=x^2$. ب) إحصائية: الطول الأكبر يرافقه غالبًا وزن أكبر، لكن ليس دائمًا.', 'a) Functional: $y=x^2$. b) Statistical: more height usually means more weight, but not always.') },
            { id: 42, difficulty: 'easy', question: say('Erregresio-zuzena $\\hat{y}=0{,}5x+6$ da. Estimatu $y$ $x=135$ denean.', 'La recta de regresión es $\\hat{y}=0{,}5x+6$. Estima $y$ para $x=135$.', 'مستقيم الانحدار $\\hat{y}=0{,}5x+6$. قدّر $y$ عندما $x=135$.', 'The regression line is $\\hat{y}=0{,}5x+6$. Estimate $y$ for $x=135$.'), solution: same('$0{,}5\\cdot 135+6=73{,}5$'), answer: { expected: v('73,5') } },
            { id: 43, difficulty: 'easy', question: say('Korrelazio positiboa ala negatiboa? a) Liga bateko sailkapena eta irabazitako partidak. b) Irabazitako partidak eta sartutako golak.', '¿Correlación positiva o negativa? a) La posición en la liga y los partidos ganados. b) Los partidos ganados y los goles a favor.', 'ارتباط موجب أم سالب؟ أ) الترتيب في الدوري والمباريات المربوحة. ب) المباريات المربوحة والأهداف المسجّلة.', 'Is the correlation positive or negative? a) The position in the league and the matches won. b) The matches won and the goals scored.'), solution: say('a) Negatiboa: zenbat eta partida gehiago irabazi, orduan eta postu txikiagoa (1.a, 2.a…). b) Positiboa.', 'a) Negativa: cuantos más partidos ganados, menor es el puesto (1.º, 2.º…). b) Positiva.', 'أ) سالب: كلما زادت المباريات المربوحة صغر رقم المركز (الأول، الثاني…). ب) موجب.', 'a) Negative: the more matches won, the lower the place (1st, 2nd…). b) Positive.') },
            { id: 44, difficulty: 'medium', question: say('Hiru hodeiren koefizienteak 0,98, −0,51 eta 0,57 dira. Bat beherantz doa; beste biak gorantz, bata estua eta bestea zabala. Zein da hodei zabalarena?', 'Los coeficientes de tres nubes son 0,98, −0,51 y 0,57. Una baja; las otras dos suben, una estrecha y otra ancha. ¿Cuál es el de la nube ancha?', 'معاملات ثلاث سحب 0.98 و−0.51 و0.57. واحدة تهبط، والأخريان تصعدان، إحداهما ضيقة والأخرى عريضة. ما معامل السحابة العريضة؟', 'The coefficients of three clouds are 0.98, −0.51 and 0.57. One goes down; the other two go up, one narrow and one wide. Which coefficient belongs to the wide cloud?'), solution: say('Gorantz eta ahula: $r=0{,}57$. Estuarena $0{,}98$ da eta beherantz doanarena $-0{,}51$.', 'Sube y es débil: $r=0{,}57$. La estrecha es $0{,}98$ y la que baja, $-0{,}51$.', 'تصعد وضعيفة: $r=0{,}57$. والضيقة $0{,}98$ والهابطة $-0{,}51$.', 'It goes up and is weak: $r=0{,}57$. The narrow one is $0{,}98$ and the one that goes down is $-0{,}51$.'), answer: { expected: v('0,57') } },
            { id: 45, difficulty: 'medium', question: say('Presioa ($y$, mm) eta altuera ($x$, m): $\\hat{y}=760-0{,}0824x$, 0tik 2000 m-ra arteko datuekin. Estimatu presioa 1000 m-tan.', 'Presión ($y$, mm) y altitud ($x$, m): $\\hat{y}=760-0{,}0824x$, con datos de 0 a 2000 m. Estima la presión a 1000 m.', 'الضغط ($y$، مم) والارتفاع ($x$، م): $\\hat{y}=760-0{,}0824x$ ببيانات من 0 إلى 2000 م. قدّر الضغط على ارتفاع 1000 م.', 'Pressure ($y$, mm) and altitude ($x$, m): $\\hat{y}=760-0{,}0824x$, with data from 0 to 2,000 m. Estimate the pressure at 1,000 m.'), solution: same('$760-0{,}0824\\cdot 1000=677{,}6$'), answer: { expected: v('677,6') } },
            { id: 46, difficulty: 'medium', question: say('Aurreko zuzenarekin, fidagarria da 8000 m-ko presioaren estimazioa?', 'Con la recta anterior, ¿es fiable la estimación de la presión a 8000 m?', 'بالمستقيم السابق، هل تقدير الضغط على ارتفاع 8000 م موثوق؟', 'Using the same line, is the estimate of the pressure at 8,000 m reliable?'), solution: say('Ez: 8000 m datuen tartetik kanpo dago (estrapolazioa), eta joera ez da zertan berdin mantendu.', 'No: 8000 m está fuera del intervalo de los datos (extrapolación), y la tendencia no tiene por qué mantenerse.', 'لا: 8000 م خارج مجال البيانات (استقراء خارجي)، ولا يلزم أن يستمر الاتجاه.', 'No: 8,000 m is outside the range of the data (extrapolation), and the trend does not have to continue.') },
            { id: 47, difficulty: 'medium', question: say('Erregresio-zuzenak $-2$ malda du eta $(\\bar{x},\\bar{y})=(3,\\ 10)$ puntutik pasatzen da. Estimatu $y$ $x=5$ denean.', 'La recta de regresión tiene pendiente $-2$ y pasa por $(\\bar{x},\\bar{y})=(3,\\ 10)$. Estima $y$ para $x=5$.', 'ميل مستقيم الانحدار $-2$ ويمرّ بـ$(\\bar{x},\\bar{y})=(3,\\ 10)$. قدّر $y$ عندما $x=5$.', 'The regression line has slope $-2$ and passes through $(\\bar{x},\\bar{y})=(3,\\ 10)$. Estimate $y$ for $x=5$.'), solution: same('$10-2\\cdot(5-3)=6$'), answer: { expected: n(6) } },
            { id: 48, difficulty: 'hard', question: say('Ingeleseko eta frantseseko noten erregresio-zuzena $\\hat{y}=0{,}8x+1{,}5$ da, $r=0{,}9$rekin. Ingelesean 7 atera duen ikasle batek zer nota izango du frantsesean, gutxi gorabehera?', 'La recta de regresión de las notas de inglés y francés es $\\hat{y}=0{,}8x+1{,}5$, con $r=0{,}9$. ¿Qué nota tendrá en francés, aproximadamente, quien saca un 7 en inglés?', 'مستقيم انحدار علامات الإنجليزية والفرنسية $\\hat{y}=0{,}8x+1{,}5$ مع $r=0{,}9$. ما العلامة التقريبية في الفرنسية لمن حصل على 7 في الإنجليزية؟', 'The regression line for the English and French marks is $\\hat{y}=0{,}8x+1{,}5$, with $r=0{,}9$. Roughly what French mark will someone get who gets a 7 in English?'), solution: say('$0{,}8\\cdot 7+1{,}5=7{,}1$; fidagarria da, $r$ 1etik hurbil dagoelako.', '$0{,}8\\cdot 7+1{,}5=7{,}1$; es fiable porque $r$ está cerca de 1.', '$0{,}8\\cdot 7+1{,}5=7{,}1$؛ وهو موثوق لأن $r$ قريب من 1.', '$0{,}8\\cdot 7+1{,}5=7{,}1$; it is reliable because $r$ is close to 1.'), answer: { expected: v('7,1') } },
            { id: 49, difficulty: 'hard', question: say('Eguzki-orduak ($x$) eta tenperatura ($y$) 8 egunetan: (2, 8), (2, 10), (4, 10), (6, 10), (6, 12), (8, 12), (10, 12), (10, 14). Kalkulatu $\\bar{x}$ eta $\\bar{y}$, eta egiaztatu $\\hat{y}=0{,}5x+8$ zuzena haien puntutik pasatzen dela.', 'Horas de sol ($x$) y temperatura ($y$) en 8 días: (2, 8), (2, 10), (4, 10), (6, 10), (6, 12), (8, 12), (10, 12), (10, 14). Calcula $\\bar{x}$ e $\\bar{y}$, y comprueba que la recta $\\hat{y}=0{,}5x+8$ pasa por su punto.', 'ساعات الشمس ($x$) والحرارة ($y$) في 8 أيام: (2, 8)، (2, 10)، (4, 10)، (6, 10)، (6, 12)، (8, 12)، (10, 12)، (10, 14). احسب $\\bar{x}$ و$\\bar{y}$، وتحقّق أن المستقيم $\\hat{y}=0{,}5x+8$ يمرّ بنقطتهما.', 'Hours of sunshine ($x$) and temperature ($y$) on 8 days: (2, 8), (2, 10), (4, 10), (6, 10), (6, 12), (8, 12), (10, 12), (10, 14). Calculate $\\bar{x}$ and $\\bar{y}$, and check that the straight line $\\hat{y}=0{,}5x+8$ passes through their point of means.'), solution: same('$\\frac{48}{8}=6\\qquad \\frac{88}{8}=11\\qquad 0{,}5\\cdot 6+8=11$'), answer: { expected: n(6) } },
            { id: 50, difficulty: 'hard', question: say('Herri batzuetan, zikoina-habia gehiago dagoen lekuetan jaiotza gehiago daude, $r=0{,}8$rekin. Zikoinek ekartzen dituzte haurrak?', 'En unos pueblos, donde hay más nidos de cigüeña hay más nacimientos, con $r=0{,}8$. ¿Traen las cigüeñas a los niños?', 'في بعض البلدات، حيث أعشاش اللقالق أكثر تكون المواليد أكثر، مع $r=0{,}8$. هل تجلب اللقالق الأطفال؟', 'In some villages, where there are more stork nests there are more births, with $r=0{,}8$. Do storks bring the babies?'), solution: say('Ez. Korrelazioak ez du kausa frogatzen: bi aldagaiak herriaren tamainaren araberakoak dira; herri handiek habia eta jaiotza gehiago dituzte.', 'No. La correlación no prueba la causa: las dos variables dependen del tamaño del pueblo; los pueblos grandes tienen más nidos y más nacimientos.', 'لا. الارتباط لا يثبت السبب: المتغيران يتعلقان بحجم البلدة؛ فالبلدات الكبيرة فيها أعشاش ومواليد أكثر.', 'No. Correlation does not prove cause: both variables depend on the size of the village; bigger villages have more nests and more births.') }
        ]
    }
]

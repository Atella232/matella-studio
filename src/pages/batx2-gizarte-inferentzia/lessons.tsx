import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { ChangesFigure, ClaimFigure, CriticalFigure, EstimateFigure, HundredFigure, IntervalFigure, LevelFigure, PollFigure, SizeFigure, TradeFigure, WorstCaseFigure } from './figures'
import { inferenceBatx2gLessonChecks, type InferenceBatx2gTopicId } from './lessonChecks'
import { inferenceBatx2gLessonTexts } from './lessonTexts'

/* ==========================================================================
   Inferentzia · Batxilergoa 2 · Gizarte Zientziak — stages and lessons. A
   unit with no twin in Ciencias: Santillana unit 12 and Anaya units 12
   and 13 (estimation). The point estimate, the confidence level and its
   critical value, the confidence interval for the mean (what it means and
   how to read it backwards), the error and the sample size, the interval
   for a proportion, polls and whether a claim fits an interval. All the
   exercises and numbers are our own; the critical values follow the
   approved convention (criticalZ of Banaketak). Notation: \bar{x},
   \hat{p}, z_{\alpha/2}, E, n rounded up.
   ========================================================================== */

export type InferenceBatx2gStageId = 'estimation' | 'mean-ci' | 'error-size' | 'proportion-ci' | 'decisions'

export const inferenceBatx2gStages: UnitStage[] = [
    { id: 'estimation', tone: 'blue', title: { eu: 'Estimazioa eta konfiantza', es: 'Estimación y confianza', en: 'Estimation and confidence', ar: 'التقدير والثقة' } },
    { id: 'mean-ci', tone: 'violet', title: { eu: 'Batez bestekoaren tartea', es: 'Intervalo para la media', en: 'Interval for the mean', ar: 'فترة المتوسط' } },
    { id: 'error-size', tone: 'mustard', title: { eu: 'Errorea eta tamaina', es: 'Error y tamaño', en: 'Error and size', ar: 'الخطأ والحجم' } },
    { id: 'proportion-ci', tone: 'coral', title: { eu: 'Proportzioaren tartea', es: 'Intervalo para la proporción', en: 'Interval for the proportion', ar: 'فترة النسبة' } },
    { id: 'decisions', tone: 'green', title: { eu: 'Inkestak eta erabakiak', es: 'Encuestas y decisiones', en: 'Polls and decisions', ar: 'الاستطلاعات والقرارات' } }
]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const need = {
    proportion: { unit: 'batx2-gizarte/muestreo', topic: 'sample-proportion', title: { eu: 'Laginaren proportzioa', es: 'La proporción muestral', en: 'The sample proportion', ar: 'نسبة العيّنة' } },
    characteristic: { unit: 'batx2-gizarte/binomial-normal', topic: 'characteristic-interval', title: { eu: 'Tarte karakteristikoa', es: 'El intervalo característico', en: 'The characteristic interval', ar: 'الفترة المميزة' } },
    meanBand: { unit: 'batx2-gizarte/muestreo', topic: 'mean-interval', title: { eu: 'Batez bestekoen tarte karakteristikoa', es: 'Intervalo característico de las medias', en: 'Characteristic interval of the means', ar: 'الفترة المميزة للمتوسطات' } },
    proportionBand: { unit: 'batx2-gizarte/muestreo', topic: 'proportion-interval', title: { eu: 'Proportzioen tarte karakteristikoa', es: 'Intervalo característico de las proporciones', en: 'Characteristic interval of the proportions', ar: 'الفترة المميزة للنسب' } }
}

const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Estimation and confidence ---------- */
    {
        id: 'point-estimate',
        stage: 'estimation',
        title: say('Estimazio puntuala', 'La estimación puntual', 'التقدير النقطي', 'The point estimate'),
        goal: say('Lagin baten datuekin populazioaren batez bestekoa eta proportzioa estimatzea.', 'Estimar la media y la proporción de la población con los datos de una muestra.', 'تقدير متوسط المجتمع ونسبته ببيانات عيّنة.', 'Estimate the mean and the proportion of the population from the data of a sample.'),
        needs: [need.proportion],
        problem: say('50 familiako lagin batean, hileko elikadura-gastuaren batez bestekoa 312 euro da, eta 18 familiak astean behin jaten dute kanpoan. Estimatu $\\mu$ eta $p$.', 'En una muestra de 50 familias, el gasto medio mensual en comida es de 312 € y 18 familias comen fuera una vez por semana. Estima $\\mu$ y $p$.', 'في عيّنة من 50 أسرة، متوسط الإنفاق الشهري على الطعام 312 € و18 أسرة تأكل خارج البيت مرة في الأسبوع. قدّر $\\mu$ و$p$.', 'In a sample of 50 families, the mean monthly spending on food is €312 and 18 families eat out once a week. Estimate $\\mu$ and $p$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoa: laginarena erabiltzen da.', 'La media: se usa la de la muestra.', 'المتوسط: نستعمل متوسط العيّنة.', 'The mean: use the sample\'s.'), math: same('$\\bar{x}=312\\ \\to\\ \\mu\\approx 312$') },
            { text: say('Proportzioa: kanpoan jaten duten familien zatia.', 'La proporción: la parte de familias que comen fuera.', 'النسبة: جزء الأسر التي تأكل خارج البيت.', 'The proportion: the share of families that eat out.'), math: same('$\\hat{p}=\\frac{18}{50}=0{,}36$') },
            { text: say('Beste lagin batek beste balio batzuk emango lituzke: horregatik, gero tarte bat emango da.', 'Otra muestra daría otros valores: por eso después se dará un intervalo.', 'عيّنة أخرى تعطي قيمًا أخرى: لذلك سنعطي فترة لاحقًا.', 'Another sample would give other values: that is why an interval will be given later.') }
        ],
        takeaway: say(
            'Estimazio puntualean, $\\bar{x}$ zenbakiak $\\mu$ estimatzen du, eta $\\hat{p}$ zenbakiak $p$. Lagin bakoitzak balio bat ematen du, eta ez da inoiz ziurra; horregatik ematen da gero tarte bat, konfiantza-maila batekin.',
            'En la estimación puntual, $\\bar{x}$ estima $\\mu$ y $\\hat{p}$ estima $p$. Cada muestra da un valor y nunca es seguro; por eso después se da un intervalo, con un nivel de confianza.',
            'في التقدير النقطي يقدّر $\\bar{x}$ القيمة $\\mu$ ويقدّر $\\hat{p}$ القيمة $p$. تعطي كل عيّنة قيمة غير مؤكدة أبدًا؛ لذلك نعطي لاحقًا فترة بمستوى ثقة.',
            'In a point estimate, $\\bar{x}$ estimates $\\mu$ and $\\hat{p}$ estimates $p$. Each sample gives a value and it is never certain; that is why an interval is given later, with a confidence level.'
        ),
        figure: (language) => <EstimateFigure language={language} />
    },
    {
        id: 'confidence-level',
        stage: 'estimation',
        title: say('Konfiantza-maila', 'El nivel de confianza', 'مستوى الثقة', 'The confidence level'),
        goal: say('Konfiantza-mailatik $\\alpha$ eta balio kritikoa, ${z}_{\\alpha/2}$, lortzea.', 'Obtener $\\alpha$ y el valor crítico ${z}_{\\alpha/2}$ a partir del nivel de confianza.', 'الحصول على $\\alpha$ والقيمة الحرجة ${z}_{\\alpha/2}$ من مستوى الثقة.', 'Get $\\alpha$ and the critical value ${z}_{\\alpha/2}$ from the confidence level.'),
        needs: [need.characteristic],
        problem: say('Inkesta-enpresa batek % 95 konfiantza-mailarekin lan egiten du. Zenbat dira $\\alpha$ eta $\\frac{\\alpha}{2}$? Zein da balio kritikoa?', 'Una empresa de encuestas trabaja con un nivel de confianza del 95 %. ¿Cuánto valen $\\alpha$ y $\\frac{\\alpha}{2}$? ¿Cuál es el valor crítico?', 'تعمل شركة استطلاعات بمستوى ثقة 95 %. كم يساوي $\\alpha$ و$\\frac{\\alpha}{2}$؟ وما القيمة الحرجة؟', 'A polling company works at a 95% confidence level. What are $\\alpha$ and $\\frac{\\alpha}{2}$? What is the critical value?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konfiantza-maila $1-\\alpha$ da:', 'El nivel de confianza es $1-\\alpha$:', 'مستوى الثقة هو $1-\\alpha$:', 'The confidence level is $1-\\alpha$:'), math: same('$1-\\alpha=0{,}95\\ \\to\\ \\alpha=0{,}05$') },
            { text: say('Buztan bakoitzean, erdia:', 'En cada cola, la mitad:', 'في كل ذيل النصف:', 'In each tail, half:'), math: same('$\\frac{\\alpha}{2}=0{,}025$') },
            { text: say('Balio kritikoaren azpian $0{,}975$ geratzen da:', 'Por debajo del valor crítico queda $0{,}975$:', 'تحت القيمة الحرجة يبقى $0{,}975$:', 'Below the critical value lies $0{,}975$:'), math: same('$P(Z\\le {z}_{\\alpha/2})=0{,}975\\ \\to\\ {z}_{\\alpha/2}=1{,}96$') }
        ],
        takeaway: say(
            'Konfiantza-maila $1-\\alpha$ da, eta balio kritikoaren azpian $1-\\frac{\\alpha}{2}$ geratzen da. Ohikoenak: 1,645 (% 90), 1,96 (% 95) eta 2,575 (% 99).',
            'El nivel de confianza es $1-\\alpha$, y por debajo del valor crítico queda $1-\\frac{\\alpha}{2}$. Los más usados: 1,645 (90 %), 1,96 (95 %) y 2,575 (99 %).',
            'مستوى الثقة هو $1-\\alpha$، وتحت القيمة الحرجة يبقى $1-\\frac{\\alpha}{2}$. والأكثر استعمالًا: 1.645 (90 %) و1.96 (95 %) و2.575 (99 %).',
            'The confidence level is $1-\\alpha$, and below the critical value lies $1-\\frac{\\alpha}{2}$. The most used: 1.645 (90%), 1.96 (95%) and 2.575 (99%).'
        ),
        figure: (language) => <LevelFigure language={language} />
    },
    {
        id: 'critical-value',
        stage: 'estimation',
        title: say('Balio kritikoa taulan', 'El valor crítico en la tabla', 'القيمة الحرجة في الجدول', 'The critical value in the table'),
        goal: say('Edozein konfiantza-mailaren balio kritikoa taulan aurkitzea.', 'Encontrar en la tabla el valor crítico de cualquier nivel de confianza.', 'إيجاد القيمة الحرجة لأي مستوى ثقة في الجدول.', 'Find the critical value of any confidence level in the table.'),
        problem: say('Aurkitu balio kritikoa, % 92 konfiantza-mailan.', 'Halla el valor crítico para un nivel de confianza del 92 %.', 'جد القيمة الحرجة لمستوى ثقة 92 %.', 'Find the critical value for a 92% confidence level.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Buztan bakoitzean, $0{,}04$:', 'En cada cola, $0{,}04$:', 'في كل ذيل $0{,}04$:', 'In each tail, $0{,}04$:'), math: same('$1-\\frac{\\alpha}{2}=1-0{,}04=0{,}96$') },
            { text: say('Bilatu $0{,}96$ taularen barruan: bi balio ditu inguruan.', 'Busca $0{,}96$ dentro de la tabla: tiene dos valores cerca.', 'ابحث عن $0{,}96$ داخل الجدول: قربه قيمتان.', 'Look for $0{,}96$ inside the table: there are two values near it.'), math: same('$P(Z\\le 1{,}75)=0{,}9599\\qquad P(Z\\le 1{,}76)=0{,}9608$') },
            { text: say('Hurbilena hartzen da:', 'Se toma el más cercano:', 'نأخذ الأقرب:', 'Take the closest:'), math: same('${z}_{\\alpha/2}=1{,}75$') }
        ],
        takeaway: say(
            'Balio kritikoa aurkitzeko, bilatu $1-\\frac{\\alpha}{2}$ taularen barruan eta hartu hurbilen dagoen balioa; biak berdin hurbil badaude, haien erdiko puntua. Horrela ateratzen dira 1,645 eta 2,575.',
            'Para hallar el valor crítico, busca $1-\\frac{\\alpha}{2}$ dentro de la tabla y toma el valor más cercano; si dos están igual de cerca, su punto medio. Así salen 1,645 y 2,575.',
            'لإيجاد القيمة الحرجة ابحث عن $1-\\frac{\\alpha}{2}$ داخل الجدول وخذ أقرب قيمة؛ وإذا تساوت قيمتان في القرب فخذ منتصفهما. هكذا نحصل على 1.645 و2.575.',
            'To find the critical value, look for $1-\\frac{\\alpha}{2}$ inside the table and take the closest value; if two are equally close, their midpoint. That is how 1.645 and 2.575 come out.'
        ),
        figure: (language) => <CriticalFigure language={language} />
    },

    /* ---------- 2. Interval for the mean ---------- */
    {
        id: 'mean-interval',
        stage: 'mean-ci',
        title: say('Batez bestekoaren konfiantza-tartea', 'Intervalo de confianza para la media', 'فترة الثقة للمتوسط', 'Confidence interval for the mean'),
        goal: say('$\\mu$ zenbakiaren konfiantza-tartea kalkulatzea, $\\sigma$ ezaguna denean.', 'Calcular el intervalo de confianza para $\\mu$ cuando se conoce $\\sigma$.', 'حساب فترة الثقة لـ $\\mu$ عندما تكون $\\sigma$ معلومة.', 'Work out the confidence interval for $\\mu$ when $\\sigma$ is known.'),
        needs: [need.meanBand],
        problem: say('64 ikasleren altueren batez bestekoa 172 cm da. Populazioaren desbideratzea $\\sigma=8$ cm bada, aurkitu $\\mu$ zenbakiaren konfiantza-tartea, % 95 mailan.', 'La altura media de 64 estudiantes es 172 cm. Si la desviación de la población es $\\sigma=8$ cm, halla el intervalo de confianza del 95 % para $\\mu$.', 'متوسط أطوال 64 طالبًا هو 172 سم. إذا كان انحراف المجتمع $\\sigma=8$ سم، فجد فترة الثقة 95 % لـ $\\mu$.', 'The mean height of 64 students is 172 cm. If the population deviation is $\\sigma=8$ cm, find the 95% confidence interval for $\\mu$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoaren desbideratzea:', 'La desviación de la media:', 'انحراف المتوسط:', 'The deviation of the mean:'), math: same('$\\frac{8}{\\sqrt{64}}=1$') },
            { text: say('Errorea, $1{,}96$ zenbakiarekin:', 'El error, con $1{,}96$:', 'الخطأ مع $1{,}96$:', 'The error, with $1{,}96$:'), math: same('$E=1{,}96\\cdot 1=1{,}96$') },
            { text: say('Tartea:', 'El intervalo:', 'الفترة:', 'The interval:'), math: same('$(172-1{,}96;\\ 172+1{,}96)=(170{,}04;\\ 173{,}96)$') }
        ],
        takeaway: say(
            '$\\mu$ zenbakiaren konfiantza-tartea $\\bar{x}\\pm {z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$ da: erdian laginaren batez bestekoa, eta erradioa errorea.',
            'El intervalo de confianza para $\\mu$ es $\\bar{x}\\pm {z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: en el centro, la media de la muestra, y de radio, el error.',
            'فترة الثقة لـ $\\mu$ هي $\\bar{x}\\pm {z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: في وسطها متوسط العيّنة ونصف قطرها الخطأ.',
            'The confidence interval for $\\mu$ is $\\bar{x}\\pm {z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$: the sample mean in the middle, and the error as the radius.'
        ),
        figureAfterSteps: true,
        figure: (language) => <IntervalFigure language={language} low={170.04} centre={172} high={173.96} caption="172 ± 1,96" />
    },
    {
        id: 'interpret',
        stage: 'mean-ci',
        title: say('Zer esan nahi du konfiantzak?', '¿Qué significa la confianza?', 'ماذا تعني الثقة؟', 'What does confidence mean?'),
        goal: say('Konfiantza-maila ondo interpretatzea: metodoari dagokio, ez tarte jakin bati.', 'Interpretar bien el nivel de confianza: es del método, no de un intervalo concreto.', 'تفسير مستوى الثقة جيدًا: إنه يخص الطريقة لا فترة بعينها.', 'Read the confidence level properly: it belongs to the method, not to one particular interval.'),
        problem: say('Aurreko tartea $(170{,}04;\\ 173{,}96)$ da, % 95 mailan. Zer esan nahi du % 95 horrek?', 'El intervalo anterior es $(170{,}04;\\ 173{,}96)$, al 95 %. ¿Qué quiere decir ese 95 %?', 'الفترة السابقة $(170{,}04;\\ 173{,}96)$ عند 95 %. ماذا تعني تلك الـ 95 %؟', 'The interval before is $(170{,}04;\\ 173{,}96)$, at 95%. What does that 95% mean?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\mu$ ez da aldatzen: zenbaki finko bat da, ezezaguna.', '$\\mu$ no cambia: es un número fijo, desconocido.', '$\\mu$ لا يتغير: عدد ثابت مجهول.', '$\\mu$ does not change: it is a fixed, unknown number.') },
            { text: say('Lagin bakoitzak tarte desberdin bat ematen du. 100 laginekin, 95 tarte inguruk harrapatzen dute $\\mu$.', 'Cada muestra da un intervalo distinto. Con 100 muestras, unos 95 intervalos atrapan $\\mu$.', 'تعطي كل عيّنة فترة مختلفة. ومع 100 عيّنة تلتقط نحو 95 فترة القيمة $\\mu$.', 'Each sample gives a different interval. With 100 samples, about 95 intervals catch $\\mu$.') },
            { text: say('Gure tartea horietako bat da, edo ez: ez dakigu, baina metodoak gehienetan asmatzen du.', 'El nuestro es uno de ellos, o no: no lo sabemos, pero el método acierta casi siempre.', 'فترتنا واحدة منها أو لا: لا نعرف، لكن الطريقة تصيب غالبًا.', 'Ours is one of them, or not: we do not know, but the method is right nearly always.') }
        ],
        takeaway: say(
            '% 95 konfiantzak esan nahi du lagin askorekin tarteen % 95 inguruk harrapatzen dutela $\\mu$. Tarte jakin batek $\\mu$ barruan du ala ez; ez da probabilitate bat.',
            'Confianza del 95 % quiere decir que, con muchas muestras, cerca del 95 % de los intervalos atrapan $\\mu$. Un intervalo concreto contiene $\\mu$ o no; no es una probabilidad.',
            'ثقة 95 % تعني أنه مع عيّنات كثيرة تلتقط نحو 95 % من الفترات القيمة $\\mu$. والفترة المعيّنة إما تحوي $\\mu$ أو لا؛ ليس احتمالًا.',
            '95% confidence means that, with many samples, about 95% of the intervals catch $\\mu$. One particular interval contains $\\mu$ or not; it is not a probability.'
        ),
        figure: (language) => <HundredFigure language={language} />
    },
    {
        id: 'interval-to-data',
        stage: 'mean-ci',
        title: say('Tartetik datuetara', 'Del intervalo a los datos', 'من الفترة إلى البيانات', 'From the interval to the data'),
        goal: say('Tarte batetik laginaren batez bestekoa, errorea eta laginaren tamaina ateratzea.', 'Sacar de un intervalo la media muestral, el error y el tamaño de la muestra.', 'استخراج متوسط العيّنة والخطأ وحجم العيّنة من فترة.', 'Get the sample mean, the error and the sample size back from an interval.'),
        problem: say('$\\mu$ zenbakiaren tartea, % 95 mailan, $(48{,}04;\\ 51{,}96)$ da, eta $\\sigma=10$. Aurkitu $\\bar{x}$ eta $n$.', 'El intervalo del 95 % para $\\mu$ es $(48{,}04;\\ 51{,}96)$ y $\\sigma=10$. Halla $\\bar{x}$ y $n$.', 'فترة 95 % لـ $\\mu$ هي $(48{,}04;\\ 51{,}96)$ و$\\sigma=10$. جد $\\bar{x}$ و$n$.', 'The 95% interval for $\\mu$ is $(48{,}04;\\ 51{,}96)$ and $\\sigma=10$. Find $\\bar{x}$ and $n$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erdiko puntua:', 'El punto medio:', 'المنتصف:', 'The midpoint:'), math: same('$\\bar{x}=\\frac{48{,}04+51{,}96}{2}=50$') },
            { text: say('Zabaleraren erdia:', 'La mitad de la anchura:', 'نصف العرض:', 'Half the width:'), math: same('$E=\\frac{51{,}96-48{,}04}{2}=1{,}96$') },
            { text: say('Errorearen formulatik:', 'De la fórmula del error:', 'من صيغة الخطأ:', 'From the error formula:'), math: same('$1{,}96\\cdot\\frac{10}{\\sqrt{n}}=1{,}96\\ \\to\\ \\sqrt{n}=10\\ \\to\\ n=100$') }
        ],
        takeaway: say(
            'Tarte batean, $\\bar{x}$ erdiko puntua da eta $E$ zabaleraren erdia. Errorearen formulatik, $n$, $\\sigma$ edo maila bera askatu daiteke.',
            'En un intervalo, $\\bar{x}$ es el punto medio y $E$ la mitad de la anchura. De la fórmula del error se puede despejar $n$, $\\sigma$ o el propio nivel.',
            'في الفترة $\\bar{x}$ هو المنتصف و$E$ نصف العرض. ومن صيغة الخطأ يمكن استخراج $n$ أو $\\sigma$ أو المستوى نفسه.',
            'In an interval, $\\bar{x}$ is the midpoint and $E$ half the width. From the error formula you can solve for $n$, $\\sigma$ or the level itself.'
        ),
        figure: (language) => <IntervalFigure language={language} low={48.04} centre={50} high={51.96} caption="E = 1,96" />
    },

    /* ---------- 3. Error and size ---------- */
    {
        id: 'error-margin',
        stage: 'error-size',
        title: say('Errore maximoa', 'El error máximo', 'الخطأ الأقصى', 'The maximum error'),
        goal: say('Estimazio baten errore maximoa kalkulatzea: $E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'Calcular el error máximo de una estimación: $E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'حساب الخطأ الأقصى لتقدير: $E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.', 'Work out the maximum error of an estimate: $E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$.'),
        problem: say('$\\sigma=12$ eta $n=36$. Zein da estimazioaren errore maximoa, % 99 mailan?', '$\\sigma=12$ y $n=36$. ¿Cuál es el error máximo de la estimación al 99 %?', '$\\sigma=12$ و$n=36$. ما الخطأ الأقصى للتقدير عند 99 %؟', '$\\sigma=12$ and $n=36$. What is the maximum error of the estimate at 99%?'),
        stepsKind: 'steps',
        steps: [
            { text: say('% 99 mailan, balio kritikoa:', 'Al 99 %, el valor crítico:', 'عند 99 % القيمة الحرجة:', 'At 99%, the critical value:'), math: same('${z}_{\\alpha/2}=2{,}575$') },
            { text: say('Batez bestekoaren desbideratzea:', 'La desviación de la media:', 'انحراف المتوسط:', 'The deviation of the mean:'), math: same('$\\frac{12}{\\sqrt{36}}=2$') },
            { text: say('Errorea:', 'El error:', 'الخطأ:', 'The error:'), math: same('$E=2{,}575\\cdot 2=5{,}15$') }
        ],
        takeaway: say(
            'Errore maximoa tartearen erradioa da: $E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$. Konfiantza horrekin, estimazioa eta $\\mu$ ez daude $E$ baino urrunago.',
            'El error máximo es el radio del intervalo: $E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$. Con esa confianza, la estimación y $\\mu$ no distan más de $E$.',
            'الخطأ الأقصى هو نصف قطر الفترة: $E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$. وبتلك الثقة لا يبعد التقدير عن $\\mu$ أكثر من $E$.',
            'The maximum error is the radius of the interval: $E={z}_{\\alpha/2}\\,\\frac{\\sigma}{\\sqrt{n}}$. With that confidence, the estimate and $\\mu$ are no more than $E$ apart.'
        ),
        figure: (language) => <IntervalFigure language={language} low={-5.15} centre={0} high={5.15} caption="E = 2,575 · 2" relative />
    },
    {
        id: 'sample-size',
        stage: 'error-size',
        title: say('Laginaren tamaina', 'El tamaño de la muestra', 'حجم العيّنة', 'The sample size'),
        goal: say('Errore maximo bat ez gainditzeko behar den laginaren tamaina kalkulatzea, gorantz biribilduz.', 'Calcular el tamaño de muestra necesario para no pasar de un error máximo, redondeando hacia arriba.', 'حساب حجم العيّنة اللازم لعدم تجاوز خطأ أقصى، مع التقريب إلى الأعلى.', 'Work out the sample size needed not to exceed a maximum error, rounding up.'),
        problem: say('$\\sigma=15$. Zenbat pertsona behar dira errorea 2 baino handiagoa ez izateko, % 95 mailan?', '$\\sigma=15$. ¿Cuántas personas hacen falta para que el error no pase de 2, al 95 %?', '$\\sigma=15$. كم شخصًا نحتاج كي لا يتجاوز الخطأ 2 عند 95 %؟', '$\\sigma=15$. How many people are needed for the error not to go past 2, at 95%?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Errorearen formula, $E\\le 2$ izateko:', 'La fórmula del error, con $E\\le 2$:', 'صيغة الخطأ مع $E\\le 2$:', 'The error formula, with $E\\le 2$:'), math: same('$1{,}96\\cdot\\frac{15}{\\sqrt{n}}\\le 2$') },
            { text: say('Askatu $n$:', 'Despeja $n$:', 'استخرج $n$:', 'Solve for $n$:'), math: same('$n\\ge\\left(\\frac{1{,}96\\cdot 15}{2}\\right)^2=216{,}09$') },
            { text: say('Gorantz biribildu:', 'Redondea hacia arriba:', 'قرّب إلى الأعلى:', 'Round up:'), math: same('$n=217$') }
        ],
        takeaway: say(
            'Laginaren tamaina: $n\\ge\\left(\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}\\right)^2$. Emaitza beti gorantz biribiltzen da, errorea mugaren azpian gera dadin.',
            'El tamaño de la muestra: $n\\ge\\left(\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}\\right)^2$. El resultado siempre se redondea hacia arriba, para que el error quede por debajo del límite.',
            'حجم العيّنة: $n\\ge\\left(\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}\\right)^2$. ونقرّب النتيجة دائمًا إلى الأعلى ليبقى الخطأ تحت الحد.',
            'The sample size: $n\\ge\\left(\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}\\right)^2$. The result is always rounded up, so the error stays under the limit.'
        ),
        figure: (language) => <SizeFigure language={language} />
    },
    {
        id: 'what-changes',
        stage: 'error-size',
        title: say('Zerk aldatzen du errorea?', '¿Qué cambia el error?', 'ما الذي يغيّر الخطأ؟', 'What changes the error?'),
        goal: say('Mailak, $\\sigma$ zenbakiak eta $n$ zenbakiak errorea nola aldatzen duten ikustea.', 'Ver cómo cambian el error el nivel, $\\sigma$ y $n$.', 'رؤية كيف يغيّر المستوى و$\\sigma$ و$n$ الخطأ.', 'See how the level, $\\sigma$ and $n$ change the error.'),
        problem: say('$\\sigma=10$ eta $n=100$ izanik, errorea $1{,}96$ da % 95 mailan. Zer gertatzen da % 99 mailan? Eta $n=400$ bada?', 'Con $\\sigma=10$ y $n=100$ el error es $1{,}96$ al 95 %. ¿Qué pasa al 99 %? ¿Y si $n=400$?', 'مع $\\sigma=10$ و$n=100$ الخطأ $1{,}96$ عند 95 %. ماذا يحدث عند 99 %؟ وإذا كان $n=400$؟', 'With $\\sigma=10$ and $n=100$ the error is $1{,}96$ at 95%. What happens at 99%? And if $n=400$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('% 99 mailan, balio kritikoa handiagoa da:', 'Al 99 %, el valor crítico es mayor:', 'عند 99 % القيمة الحرجة أكبر:', 'At 99%, the critical value is bigger:'), math: same('$2{,}575\\cdot\\frac{10}{\\sqrt{100}}=2{,}575$') },
            { text: say('Lagina lau aldiz handiagoa:', 'Una muestra cuatro veces mayor:', 'عيّنة أكبر بأربع مرات:', 'A sample four times bigger:'), math: same('$1{,}96\\cdot\\frac{10}{\\sqrt{400}}=0{,}98$') },
            { text: say('Maila igotzean errorea hazten da; lagina handitzean, txikitzen.', 'Al subir el nivel el error crece; al agrandar la muestra, baja.', 'برفع المستوى يكبر الخطأ؛ وبتكبير العيّنة يصغر.', 'Raising the level makes the error grow; making the sample bigger makes it shrink.') }
        ],
        takeaway: say(
            'Errorea handitzen da maila edo $\\sigma$ handitzean, eta txikitzen da $n$ handitzean, $\\sqrt{n}$ bezala: erdia izateko, lagina lau aldiz handiagoa behar da.',
            'El error crece al subir el nivel o $\\sigma$, y baja al crecer $n$, como $\\sqrt{n}$: para la mitad hace falta una muestra cuatro veces mayor.',
            'يكبر الخطأ برفع المستوى أو $\\sigma$، ويصغر بكبر $n$ مثل $\\sqrt{n}$: لتنصيفه نحتاج عيّنة أكبر بأربع مرات.',
            'The error grows when the level or $\\sigma$ goes up, and shrinks as $n$ grows, like $\\sqrt{n}$: to halve it you need a sample four times bigger.'
        ),
        figure: (language) => <ChangesFigure language={language} />
    },

    /* ---------- 4. Interval for the proportion ---------- */
    {
        id: 'proportion-interval',
        stage: 'proportion-ci',
        title: say('Proportzioaren konfiantza-tartea', 'Intervalo de confianza para la proporción', 'فترة الثقة للنسبة', 'Confidence interval for the proportion'),
        goal: say('$p$ zenbakiaren konfiantza-tartea kalkulatzea: $\\hat{p}\\pm {z}_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.', 'Calcular el intervalo de confianza para $p$: $\\hat{p}\\pm {z}_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.', 'حساب فترة الثقة لـ $p$: $\\hat{p}\\pm {z}_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.', 'Work out the confidence interval for $p$: $\\hat{p}\\pm {z}_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$.'),
        needs: [need.proportionBand],
        problem: say('400 pertsonatik, 80 pertsonak egunkaria egunero irakurtzen dute. Aurkitu $p$ zenbakiaren konfiantza-tartea, % 95 mailan.', 'De 400 personas, 80 leen el periódico a diario. Halla el intervalo de confianza del 95 % para $p$.', 'من 400 شخص يقرأ 80 الصحيفة يوميًّا. جد فترة الثقة 95 % لـ $p$.', 'Of 400 people, 80 read the newspaper every day. Find the 95% confidence interval for $p$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Laginaren proportzioa:', 'La proporción muestral:', 'نسبة العيّنة:', 'The sample proportion:'), math: same('$\\hat{p}=\\frac{80}{400}=0{,}2\\qquad\\hat{q}=0{,}8$') },
            { text: say('Desbideratzea:', 'La desviación:', 'الانحراف:', 'The deviation:'), math: same('$\\sqrt{\\frac{0{,}2\\cdot 0{,}8}{400}}=0{,}02$') },
            { text: say('Errorea eta tartea:', 'El error y el intervalo:', 'الخطأ والفترة:', 'The error and the interval:'), math: same('$1{,}96\\cdot 0{,}02=0{,}0392\\ \\to\\ (0{,}1608;\\ 0{,}2392)$') }
        ],
        takeaway: say(
            '$p$ zenbakiaren konfiantza-tartean, $\\hat{p}$ erdian dago, eta desbideratzea laginetik kalkulatzen da, $\\hat{p}$ eta $\\hat{q}$ erabiliz, $p$ ezezaguna delako.',
            'En el intervalo de confianza para $p$, $\\hat{p}$ está en el centro, y la desviación se calcula con la muestra, usando $\\hat{p}$ y $\\hat{q}$, porque $p$ es desconocida.',
            'في فترة الثقة لـ $p$ يقع $\\hat{p}$ في الوسط، ويُحسب الانحراف من العيّنة باستعمال $\\hat{p}$ و$\\hat{q}$ لأن $p$ مجهولة.',
            'In the confidence interval for $p$, $\\hat{p}$ is in the middle, and the deviation is worked out from the sample, using $\\hat{p}$ and $\\hat{q}$, because $p$ is unknown.'
        ),
        figureAfterSteps: true,
        figure: (language) => <IntervalFigure language={language} low={0.1608} centre={0.2} high={0.2392} caption="0,2 ± 0,0392" />
    },
    {
        id: 'proportion-error',
        stage: 'proportion-ci',
        title: say('Proportzioaren errorea', 'El error para la proporción', 'خطأ النسبة', 'The error for the proportion'),
        goal: say('Proportzio baten estimazioaren errore maximoa kalkulatzea.', 'Calcular el error máximo de la estimación de una proporción.', 'حساب الخطأ الأقصى لتقدير نسبة.', 'Work out the maximum error of the estimate of a proportion.'),
        problem: say('900 pertsonatik, 90 pertsonak ezaugarri bat dute. Zein da proportzioaren estimazioaren errorea, % 99 mailan?', 'De 900 personas, 90 tienen una característica. ¿Cuál es el error de la estimación de la proporción al 99 %?', 'من 900 شخص لدى 90 صفة ما. ما خطأ تقدير النسبة عند 99 %؟', 'Of 900 people, 90 have a feature. What is the error of the estimate of the proportion at 99%?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Laginaren proportzioa:', 'La proporción muestral:', 'نسبة العيّنة:', 'The sample proportion:'), math: same('$\\hat{p}=\\frac{90}{900}=0{,}1$') },
            { text: say('Desbideratzea:', 'La desviación:', 'الانحراف:', 'The deviation:'), math: same('$\\sqrt{\\frac{0{,}1\\cdot 0{,}9}{900}}=0{,}01$') },
            { text: say('Errorea:', 'El error:', 'الخطأ:', 'The error:'), math: same('$E=2{,}575\\cdot 0{,}01=0{,}02575$') }
        ],
        takeaway: say(
            'Proportzio baten errorea $E={z}_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$ da. Ehunekotan ere eman daiteke: $0{,}02575$ errorea % 2,575 da.',
            'El error de una proporción es $E={z}_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$. También se puede dar en porcentaje: un error de $0{,}02575$ es del 2,575 %.',
            'خطأ النسبة هو $E={z}_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$. ويمكن إعطاؤه بالنسبة المئوية: خطأ $0{,}02575$ هو 2.575 %.',
            'The error of a proportion is $E={z}_{\\alpha/2}\\sqrt{\\frac{\\hat{p}\\hat{q}}{n}}$. It can be given as a percentage too: an error of $0{,}02575$ is 2.575%.'
        ),
        figure: (language) => <IntervalFigure language={language} low={0.07425} centre={0.1} high={0.12575} caption="0,1 ± 0,02575" />
    },
    {
        id: 'proportion-size',
        stage: 'proportion-ci',
        title: say('Laginaren tamaina proportzioetan', 'El tamaño de muestra para proporciones', 'حجم العيّنة للنسب', 'The sample size for proportions'),
        goal: say('Proportzio bat estimatzeko behar den laginaren tamaina kalkulatzea, aurretiko daturik gabe ere.', 'Calcular el tamaño de muestra para estimar una proporción, también sin datos previos.', 'حساب حجم العيّنة لتقدير نسبة، حتى بلا بيانات سابقة.', 'Work out the sample size to estimate a proportion, even with no previous data.'),
        problem: say('Inkesta bat prestatzen ari dira: errorea gehienez $0{,}03$, % 95 mailan, eta ez dago aurretiko daturik. Zenbat pertsonari galdetu behar zaie?', 'Se prepara una encuesta: error como mucho $0{,}03$, al 95 %, y sin datos previos. ¿A cuántas personas hay que preguntar?', 'يُعدّ استطلاع: الخطأ لا يتجاوز $0{,}03$ عند 95 % ولا توجد بيانات سابقة. كم شخصًا يجب أن نسأل؟', 'A poll is being planned: error at most $0{,}03$, at 95%, with no previous data. How many people must be asked?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Daturik gabe, kasurik txarrena:', 'Sin datos, el caso más desfavorable:', 'بلا بيانات، أسوأ حالة:', 'With no data, the worst case:'), math: same('$\\hat{p}=\\hat{q}=0{,}5\\qquad\\hat{p}\\hat{q}=0{,}25$') },
            { text: say('Askatu $n$:', 'Despeja $n$:', 'استخرج $n$:', 'Solve for $n$:'), math: same('$n\\ge\\frac{1{,}96^2\\cdot 0{,}25}{0{,}03^2}\\approx 1067{,}11$') },
            { text: say('Gorantz biribildu:', 'Redondea hacia arriba:', 'قرّب إلى الأعلى:', 'Round up:'), math: same('$n=1068$') }
        ],
        takeaway: say(
            'Proportzioetan, $n\\ge\\frac{{z}_{\\alpha/2}^2\\,\\hat{p}\\hat{q}}{E^2}$. Aurretiko daturik ez badago, $\\hat{p}=0{,}5$ hartzen da: $\\hat{p}\\hat{q}$ handiena da, eta lagina nahikoa izango da edozein kasutan.',
            'Para proporciones, $n\\ge\\frac{{z}_{\\alpha/2}^2\\,\\hat{p}\\hat{q}}{E^2}$. Sin datos previos se toma $\\hat{p}=0{,}5$: $\\hat{p}\\hat{q}$ es máximo y la muestra bastará en cualquier caso.',
            'للنسب $n\\ge\\frac{{z}_{\\alpha/2}^2\\,\\hat{p}\\hat{q}}{E^2}$. وبلا بيانات سابقة نأخذ $\\hat{p}=0{,}5$: يكون $\\hat{p}\\hat{q}$ أكبر ما يمكن فتكفي العيّنة في كل الأحوال.',
            'For proportions, $n\\ge\\frac{{z}_{\\alpha/2}^2\\,\\hat{p}\\hat{q}}{E^2}$. With no previous data take $\\hat{p}=0{,}5$: $\\hat{p}\\hat{q}$ is as big as it gets and the sample will be enough in any case.'
        ),
        figure: (language) => <WorstCaseFigure language={language} />
    },

    /* ---------- 5. Polls and decisions ---------- */
    {
        id: 'polls',
        stage: 'decisions',
        title: say('Hauteskunde-inkestak', 'Las encuestas electorales', 'الاستطلاعات الانتخابية', 'Election polls'),
        goal: say('Inkesta baten fitxa teknikoa irakurtzea eta haren errore-marjina kalkulatzea.', 'Leer la ficha técnica de una encuesta y calcular su margen de error.', 'قراءة البطاقة التقنية لاستطلاع وحساب هامش خطئه.', 'Read the technical sheet of a poll and work out its margin of error.'),
        problem: say('Inkesta baten fitxa teknikoa: 2500 elkarrizketa, % 95 konfiantza-maila eta $p=q=0{,}5$. Zein da errore-marjina?', 'Ficha técnica de una encuesta: 2500 entrevistas, nivel de confianza del 95 % y $p=q=0{,}5$. ¿Cuál es el margen de error?', 'البطاقة التقنية لاستطلاع: 2500 مقابلة ومستوى ثقة 95 % و$p=q=0{,}5$. ما هامش الخطأ؟', 'The technical sheet of a poll: 2500 interviews, a 95% confidence level and $p=q=0{,}5$. What is the margin of error?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Desbideratzea, kasurik txarrenean:', 'La desviación, en el caso más desfavorable:', 'الانحراف في أسوأ حالة:', 'The deviation, in the worst case:'), math: same('$\\sqrt{\\frac{0{,}25}{2500}}=0{,}01$') },
            { text: say('Errore-marjina:', 'El margen de error:', 'هامش الخطأ:', 'The margin of error:'), math: same('$E=1{,}96\\cdot 0{,}01=0{,}0196$') },
            { text: say('Hau da, ± 1,96 puntu: alderdi batek % 30 badu, % 28,04 eta % 31,96 artean egongo da.', 'Es decir, ± 1,96 puntos: si un partido tiene el 30 %, estará entre el 28,04 % y el 31,96 %.', 'أي ± 1.96 نقطة: إذا كان لحزب 30 % فسيكون بين 28.04 % و31.96 %.', 'That is, ± 1.96 points: if a party has 30%, it will be between 28.04% and 31.96%.') }
        ],
        takeaway: say(
            'Inkesten fitxa teknikoak lagina, konfiantza-maila eta errore-marjina ematen ditu, $p=q=0{,}5$ kasurik txarrenarekin kalkulatuta. Bi alderdiren arteko aldea errorea baino txikiagoa bada, ezin da esan nor doan aurretik.',
            'La ficha técnica de una encuesta da la muestra, el nivel de confianza y el margen de error, calculado con el caso más desfavorable $p=q=0{,}5$. Si la diferencia entre dos partidos es menor que el error, no se puede decir quién va delante.',
            'تعطي البطاقة التقنية للاستطلاع العيّنة ومستوى الثقة وهامش الخطأ المحسوب بأسوأ حالة $p=q=0{,}5$. وإذا كان الفرق بين حزبين أصغر من الخطأ فلا يمكن القول من يتقدّم.',
            'The technical sheet of a poll gives the sample, the confidence level and the margin of error, worked out with the worst case $p=q=0{,}5$. If the gap between two parties is smaller than the error, you cannot say who is ahead.'
        ),
        figure: (language) => <PollFigure language={language} />
    },
    {
        id: 'compare-claim',
        stage: 'decisions',
        title: say('Baieztapen bat egiaztatzea', 'Contrastar una afirmación', 'التحقق من ادعاء', 'Checking a claim'),
        goal: say('Baieztatutako balio bat konfiantza-tartearekin bateragarria den erabakitzea.', 'Decidir si un valor afirmado es compatible con un intervalo de confianza.', 'تقرير ما إذا كانت قيمة مزعومة متوافقة مع فترة ثقة.', 'Decide whether a claimed value is compatible with a confidence interval.'),
        problem: say('Fabrikatzaile baten arabera, bere bonbillek 500 ordu irauten dute batez beste. 100 bonbillako lagin batek $\\bar{x}=490$ ematen du, $\\sigma=40$ izanik. Bateragarria da % 95 mailan?', 'Según un fabricante, sus bombillas duran 500 horas de media. Una muestra de 100 bombillas da $\\bar{x}=490$, con $\\sigma=40$. ¿Es compatible al 95 %?', 'بحسب مصنّع، تدوم مصابيحه 500 ساعة في المتوسط. تعطي عيّنة من 100 مصباح $\\bar{x}=490$ مع $\\sigma=40$. هل هذا متوافق عند 95 %؟', 'A maker says its light bulbs last 500 hours on average. A sample of 100 bulbs gives $\\bar{x}=490$, with $\\sigma=40$. Is it compatible at 95%?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Errorea:', 'El error:', 'الخطأ:', 'The error:'), math: same('$E=1{,}96\\cdot\\frac{40}{\\sqrt{100}}=7{,}84$') },
            { text: say('Tartea:', 'El intervalo:', 'الفترة:', 'The interval:'), math: same('$(490-7{,}84;\\ 490+7{,}84)=(482{,}16;\\ 497{,}84)$') },
            { text: say('500 tartetik kanpo dago: baieztapena ez da bateragarria % 95 mailan.', '500 queda fuera del intervalo: la afirmación no es compatible al 95 %.', '500 خارج الفترة: الادعاء غير متوافق عند 95 %.', '500 is outside the interval: the claim is not compatible at 95%.') }
        ],
        takeaway: say(
            'Baieztatutako balioa konfiantza-tartearen barruan badago, bateragarria da; kanpoan badago, ez da sinesgarria maila horretan. Ez da froga bat: maila aldatuz gero, erabakia alda daiteke.',
            'Si el valor afirmado está dentro del intervalo de confianza, es compatible; si está fuera, no es creíble a ese nivel. No es una prueba: al cambiar el nivel, la decisión puede cambiar.',
            'إذا كانت القيمة المزعومة داخل فترة الثقة فهي متوافقة؛ وإذا كانت خارجها فليست مقنعة عند ذلك المستوى. ليس برهانًا: بتغيير المستوى قد يتغير القرار.',
            'If the claimed value is inside the confidence interval, it is compatible; if it is outside, it is not believable at that level. It is not a proof: changing the level can change the decision.'
        ),
        figureAfterSteps: true,
        figure: (language) => <ClaimFigure language={language} />
    },
    {
        id: 'level-or-size',
        stage: 'decisions',
        title: say('Konfiantza gehiago, lagin handiagoa', 'Más confianza, más muestra', 'ثقة أكثر، عيّنة أكبر', 'More confidence, more sample'),
        goal: say('Errore bera mantenduz konfiantza igotzeak zenbat lagin gehiago eskatzen duen kalkulatzea.', 'Calcular cuánta más muestra pide subir la confianza manteniendo el mismo error.', 'حساب كم تحتاج العيّنة أن تكبر لرفع الثقة مع الحفاظ على الخطأ نفسه.', 'Work out how much bigger the sample must be to raise the confidence while keeping the same error.'),
        problem: say('$\\sigma=10$, eta errorea gehienez 2 izan behar da. Zenbat pertsona behar dira % 95 mailan? Eta % 99 mailan?', '$\\sigma=10$ y el error debe ser como mucho 2. ¿Cuántas personas hacen falta al 95 %? ¿Y al 99 %?', '$\\sigma=10$ ويجب ألا يتجاوز الخطأ 2. كم شخصًا نحتاج عند 95 %؟ وعند 99 %؟', '$\\sigma=10$ and the error must be at most 2. How many people are needed at 95%? And at 99%?'),
        stepsKind: 'steps',
        steps: [
            { text: say('% 95 mailan:', 'Al 95 %:', 'عند 95 %:', 'At 95%:'), math: same('$\\left(\\frac{1{,}96\\cdot 10}{2}\\right)^2=96{,}04\\ \\to\\ 97$') },
            { text: say('% 99 mailan:', 'Al 99 %:', 'عند 99 %:', 'At 99%:'), math: same('$\\left(\\frac{2{,}575\\cdot 10}{2}\\right)^2\\approx 165{,}77\\ \\to\\ 166$') },
            { text: say('Konfiantza gehiago izateko, lagina ia bikoiztu egin behar da.', 'Para tener más confianza, la muestra casi se duplica.', 'للحصول على ثقة أكبر تتضاعف العيّنة تقريبًا.', 'To get more confidence, the sample almost doubles.') }
        ],
        takeaway: say(
            'Konfiantza, errorea eta laginaren tamaina lotuta daude: bi aukeratzen dira, eta hirugarrena ateratzen da. Konfiantza gehiago eta errore txikiagoa nahi badira, lagina garestiagoa da.',
            'Confianza, error y tamaño de la muestra van unidos: se eligen dos y sale el tercero. Si se quiere más confianza y menos error, la muestra sale más cara.',
            'الثقة والخطأ وحجم العيّنة مترابطة: نختار اثنين فيخرج الثالث. وإذا أردنا ثقة أكبر وخطأ أصغر فالعيّنة أغلى.',
            'Confidence, error and sample size go together: choose two and the third follows. If you want more confidence and less error, the sample costs more.'
        ),
        figure: (language) => <TradeFigure language={language} />
    }
]

export const inferenceBatx2gTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...inferenceBatx2gLessonTexts[topic.id as InferenceBatx2gTopicId], ...inferenceBatx2gLessonChecks[topic.id as InferenceBatx2gTopicId] }))

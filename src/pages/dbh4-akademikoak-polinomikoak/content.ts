import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from '../dbh4-akademikoak-funtzioak/text.ts'

/* ==========================================================================
   Funtzio polinomikoak eta arrazionalak · 4. DBH akademikoak — diagnostic,
   guided practice, exercise bank and challenges, after Santillana 4.º
   Académicas unit 10 and Anaya 4.º Académicas unit 5 (lines, slopes and
   equations of lines, parabolas with their vertex and intercepts,
   translations, a line cutting a parabola, absolute values written in
   pieces, inverse proportion and hyperbolas with their asymptotes). Every
   closed answer is a single number: a slope, a coordinate, a parameter.
   ========================================================================== */

/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

export const polynomialAkDiagnostic: DiagnosticQuestion[] = [
    {
        id: 5901,
        prompt: say('Zein da proportzionaltasun zuzeneko funtzio bat?', '¿Cuál es una función de proporcionalidad directa?', 'أي دالة هي دالة تناسب طردي؟', 'Which one is a direct proportion function?'),
        options: [same('$y=3x$'), same('$y=3x+1$'), same('$y=3$')],
        correctIndex: 0,
        explanation: say('$n=0$ du: zuzenak jatorritik pasatzen da.', 'Tiene $n=0$: la recta pasa por el origen.', 'فيها $n=0$: يمر المستقيم بالأصل.', 'It has $n=0$: the straight line passes through the origin.'),
        topic: 'line-kinds'
    },
    {
        id: 5902,
        prompt: say('$(1,\\,2)$ eta $(3,\\,8)$ puntuetatik pasatzen den zuzenaren malda:', 'La pendiente de la recta que pasa por $(1,\\,2)$ y $(3,\\,8)$ es:', 'ميل المستقيم المار بـ $(1,\\,2)$ و$(3,\\,8)$ هو:', 'The slope of the straight line through $(1,\\,2)$ and $(3,\\,8)$ is:'),
        options: [same('$\\frac{1}{3}$'), same('$3$'), same('$6$')],
        correctIndex: 1,
        explanation: same('$m=\\frac{8-2}{3-1}=\\frac{6}{2}=3$'),
        topic: 'slope'
    },
    {
        id: 5903,
        prompt: say('$y=x^{2}-6x+5$ parabolaren erpina:', 'El vértice de $y=x^{2}-6x+5$ es:', 'رأس $y=x^{2}-6x+5$ هو:', 'The vertex of $y=x^{2}-6x+5$ is:'),
        options: [same('$(6,\\,5)$'), same('$(-3,\\,32)$'), same('$(3,\\,-4)$')],
        correctIndex: 2,
        explanation: same('$x_v=\\frac{6}{2}=3\\qquad y_v=9-18+5=-4$'),
        topic: 'vertex'
    },
    {
        id: 5904,
        prompt: say('Zenbat aldiz ebakitzen du $y=x^{2}+x+1$ parabolak X ardatza?', '¿Cuántas veces corta $y=x^{2}+x+1$ al eje X?', 'كم مرة يقطع $y=x^{2}+x+1$ محور X؟', 'How many times does $y=x^{2}+x+1$ cross the x-axis?'),
        options: [say('Bitan', 'Dos', 'مرتين', 'Two'), say('Behin', 'Una', 'مرة واحدة', 'One'), say('Behin ere ez', 'Ninguna', 'ولا مرة', 'None')],
        correctIndex: 2,
        explanation: say('$\\Delta=1-4=-3<0$: ez du ebakitzen.', '$\\Delta=1-4=-3<0$: no lo corta.', '$\\Delta=1-4=-3<0$: لا يقطعه.', '$\\Delta=1-4=-3<0$: it does not cross it.'),
        topic: 'parabola-cuts'
    },
    {
        id: 5905,
        prompt: say('$y=(x+2)^{2}-5$ parabolaren erpina:', 'El vértice de $y=(x+2)^{2}-5$ es:', 'رأس $y=(x+2)^{2}-5$ هو:', 'The vertex of $y=(x+2)^{2}-5$ is:'),
        options: [same('$(-2,\\,-5)$'), same('$(2,\\,-5)$'), same('$(2,\\,5)$')],
        correctIndex: 0,
        explanation: say('$x+2=x-(-2)$: $p=-2$ eta $q=-5$.', '$x+2=x-(-2)$: $p=-2$ y $q=-5$.', '$x+2=x-(-2)$: $p=-2$ و$q=-5$.', '$x+2=x-(-2)$: $p=-2$ and $q=-5$.'),
        topic: 'vertex-form'
    },
    {
        id: 5906,
        prompt: say('$f(x)=|x+1|$ bada, $f(-3)$ hau da:', 'Si $f(x)=|x+1|$, $f(-3)$ vale:', 'إذا كان $f(x)=|x+1|$ فإن $f(-3)$ تساوي:', 'If $f(x)=|x+1|$, $f(-3)$ is:'),
        options: [same('$-2$'), same('$2$'), same('$4$')],
        correctIndex: 1,
        explanation: same('$|-3+1|=|-2|=2$'),
        topic: 'absolute-linear'
    },
    {
        id: 5907,
        prompt: say('Zein koadrantetan daude $y=-\\frac{4}{x}$ hiperbolaren adarrak?', '¿En qué cuadrantes están las ramas de $y=-\\frac{4}{x}$?', 'في أي ربعين يقع فرعا $y=-\\frac{4}{x}$؟', 'In which quadrants are the branches of $y=-\\frac{4}{x}$?'),
        options: [say('I. eta III.', 'I y III', 'الأول والثالث', 'I and III'), say('II. eta IV.', 'II y IV', 'الثاني والرابع', 'II and IV'), say('I. eta II.', 'I y II', 'الأول والثاني', 'I and II')],
        correctIndex: 1,
        explanation: say('$k=-4<0$: II. eta IV. koadranteak.', '$k=-4<0$: cuadrantes II y IV.', '$k=-4<0$: الربعان الثاني والرابع.', '$k=-4<0$: quadrants II and IV.'),
        topic: 'inverse'
    },
    {
        id: 5908,
        prompt: say('$y=\\frac{3x-1}{x+2}$ funtzioaren asintota horizontala:', 'La asíntota horizontal de $y=\\frac{3x-1}{x+2}$ es:', 'المقارب الأفقي لـ $y=\\frac{3x-1}{x+2}$ هو:', 'The horizontal asymptote of $y=\\frac{3x-1}{x+2}$ is:'),
        options: [same('$y=-2$'), same('$y=3$'), same('$y=-\\frac{1}{2}$')],
        correctIndex: 1,
        explanation: say('$x$-en koefizienteen zatidura: $\\frac{3}{1}=3$.', 'El cociente de los coeficientes de $x$: $\\frac{3}{1}=3$.', 'ناتج قسمة معاملي $x$: $\\frac{3}{1}=3$.', 'The ratio of the coefficients of $x$: $\\frac{3}{1}=3$.'),
        topic: 'rational-form'
    }
]

export const polynomialAkPractice: PracticeItem[] = [
    /* ---------- Linear functions ---------- */
    {
        id: 1, stage: 'lines',
        prompt: say('Kalkulatu $(-2,\\,1)$ eta $(2,\\,9)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $(-2,\\,1)$ y $(2,\\,9)$.', 'احسب ميل المستقيم المار بـ $(-2,\\,1)$ و$(2,\\,9)$.', 'Calculate the slope of the straight line through $(-2,\\,1)$ and $(2,\\,9)$.'),
        expected: n(2),
        hint: say('$y$-ren aldaketa zati $x$-ren aldaketa, ordena berean.', 'Variación de $y$ entre variación de $x$, en el mismo orden.', 'تغير $y$ على تغير $x$ بالترتيب نفسه.', 'Change in $y$ divided by change in $x$, in the same order.'),
        explanation: same('$m=\\frac{9-1}{2-(-2)}=\\frac{8}{4}=2$')
    },
    {
        id: 2, stage: 'lines',
        prompt: say('Zuzen batek 3 malda du eta $(2,\\,1)$ puntutik pasatzen da. Zein da haren jatorriko ordenatua?', 'Una recta tiene pendiente 3 y pasa por $(2,\\,1)$. ¿Cuál es su ordenada en el origen?', 'مستقيم ميله 3 ويمر بـ $(2,\\,1)$. ما الجزء المقطوع من محور Y؟', 'A straight line has slope 3 and passes through $(2,\\,1)$. What is its y-intercept?'),
        expected: n(-5),
        hint: say('Erabili puntu-malda ekuazioa eta askatu $y$.', 'Usa la ecuación punto-pendiente y despeja $y$.', 'استعمل معادلة النقطة والميل واعزل $y$.', 'Use the point-slope equation and solve for $y$.'),
        explanation: same('$y-1=3(x-2)\\ \\to\\ y=3x-5\\qquad n=-5$')
    },
    {
        id: 3, stage: 'lines',
        prompt: say('Taxi batek 2,5 € kobratzen ditu igotzean eta 1,2 € km bakoitzeko. Zenbat balio du 10 km-ko bidaia batek (€)?', 'Un taxi cobra 2,5 € al subir y 1,2 € por km. ¿Cuánto cuesta un viaje de 10 km (€)?', 'تأخذ سيارة أجرة 2.5 € عند الركوب و1.2 € لكل كم. كم تكلف رحلة 10 كم (€)؟', 'A taxi charges €2.5 to get in and €1.2 per km. How much does a 10 km trip cost (in €)?'),
        expected: v('14,5'),
        hint: say('$y=1{,}2x+2{,}5$ eta $x=10$.', '$y=1{,}2x+2{,}5$ con $x=10$.', '$y=1{,}2x+2{,}5$ مع $x=10$.', '$y=1{,}2x+2{,}5$ with $x=10$.'),
        explanation: same('$y=1{,}2\\cdot 10+2{,}5=14{,}5$')
    },
    {
        id: 4, stage: 'lines',
        prompt: say('Zein da $y=-2x+7$ zuzenaren paraleloa den eta $(3,\\,4)$ puntutik pasatzen den zuzenaren jatorriko ordenatua?', '¿Cuál es la ordenada en el origen de la recta paralela a $y=-2x+7$ que pasa por $(3,\\,4)$?', 'ما الجزء المقطوع من محور Y للمستقيم الموازي لـ $y=-2x+7$ والمار بـ $(3,\\,4)$؟', 'What is the y-intercept of the straight line parallel to $y=-2x+7$ that passes through $(3,\\,4)$?'),
        expected: n(10),
        hint: say('Paraleloa: malda bera, $m=-2$.', 'Paralela: la misma pendiente, $m=-2$.', 'الموازي: الميل نفسه، $m=-2$.', 'Parallel: the same slope, $m=-2$.'),
        explanation: same('$y-4=-2(x-3)\\ \\to\\ y=-2x+10$')
    },
    /* ---------- Quadratic functions ---------- */
    {
        id: 5, stage: 'parabolas',
        prompt: say('Zein da $y=2x^{2}-8x+3$ funtzioaren balio minimoa?', '¿Cuál es el valor mínimo de $y=2x^{2}-8x+3$?', 'ما القيمة الصغرى لـ $y=2x^{2}-8x+3$؟', 'What is the minimum value of $y=2x^{2}-8x+3$?'),
        expected: n(-5),
        hint: say('Minimoa erpinean dago: $x_v=\\frac{-b}{2a}$.', 'El mínimo está en el vértice: $x_v=\\frac{-b}{2a}$.', 'الصغرى عند الرأس: $x_v=\\frac{-b}{2a}$.', 'The minimum is at the vertex: $x_v=\\frac{-b}{2a}$.'),
        explanation: same('$x_v=\\frac{8}{4}=2\\qquad y_v=2\\cdot 4-16+3=-5$')
    },
    {
        id: 6, stage: 'parabolas',
        prompt: say('$y=x^{2}-x-6$ parabolak bi puntutan ebakitzen du X ardatza. Zein da handienaren abzisa?', 'La parábola $y=x^{2}-x-6$ corta al eje X en dos puntos. ¿Cuál es la abscisa del mayor?', 'يقطع القطع $y=x^{2}-x-6$ محور X في نقطتين. ما الإحداثي السيني للأكبر؟', 'The parabola $y=x^{2}-x-6$ crosses the x-axis at two points. What is the x-coordinate of the larger one?'),
        expected: n(3),
        hint: say('Ebatzi $x^{2}-x-6=0$.', 'Resuelve $x^{2}-x-6=0$.', 'حُلّ $x^{2}-x-6=0$.', 'Solve $x^{2}-x-6=0$.'),
        explanation: same('$x=\\frac{1\\pm 5}{2}\\ \\to\\ x=3,\\ x=-2$')
    },
    {
        id: 7, stage: 'parabolas',
        prompt: say('Zein $c$ baliorekin du $y=x^{2}-6x+c$ parabolak erpina X ardatzaren gainean?', '¿Para qué valor de $c$ tiene la parábola $y=x^{2}-6x+c$ el vértice sobre el eje X?', 'لأي قيمة لـ $c$ يقع رأس القطع $y=x^{2}-6x+c$ على محور X؟', 'For which value of $c$ does the parabola $y=x^{2}-6x+c$ have its vertex on the x-axis?'),
        expected: n(9),
        hint: say('Ebaki-puntu bakarra: $\\Delta=0$.', 'Un solo corte: $\\Delta=0$.', 'تقاطع واحد: $\\Delta=0$.', 'Only one crossing point: $\\Delta=0$.'),
        explanation: same('$\\Delta=36-4c=0\\ \\to\\ c=9$')
    },
    {
        id: 8, stage: 'parabolas',
        prompt: say('Gora jaurtitako pilota baten altuera $h=-5t^{2}+20t$ da (m, s). Zein da altuera maximoa (m)?', 'La altura de una pelota lanzada hacia arriba es $h=-5t^{2}+20t$ (m, s). ¿Cuál es la altura máxima (m)?', 'ارتفاع كرة مقذوفة إلى الأعلى $h=-5t^{2}+20t$ (م، ث). ما أقصى ارتفاع (م)؟', 'The height of a ball thrown upwards is $h=-5t^{2}+20t$ (m, s). What is the maximum height (m)?'),
        expected: n(20),
        hint: say('Erpina: $t=\\frac{-b}{2a}$, eta gero haren irudia.', 'El vértice: $t=\\frac{-b}{2a}$, y luego su imagen.', 'الرأس: $t=\\frac{-b}{2a}$ ثم صورته.', 'The vertex: $t=\\frac{-b}{2a}$, and then the height at that time.'),
        explanation: same('$t=\\frac{-20}{-10}=2\\qquad h=-20+40=20$')
    },
    /* ---------- Translations and intersections ---------- */
    {
        id: 9, stage: 'shifts',
        prompt: say('$y=x^{2}+4x+1$ idatzi $y=(x-p)^{2}+q$ forman. Zenbat da $q$?', 'Escribe $y=x^{2}+4x+1$ en la forma $y=(x-p)^{2}+q$. ¿Cuánto vale $q$?', 'اكتب $y=x^{2}+4x+1$ على صورة $y=(x-p)^{2}+q$. كم قيمة $q$؟', 'Write $y=x^{2}+4x+1$ in the form $y=(x-p)^{2}+q$. What is $q$?'),
        expected: n(-3),
        hint: say('$q$ erpinaren ordenatua da.', '$q$ es la ordenada del vértice.', '$q$ هو الإحداثي الصادي للرأس.', '$q$ is the y-coordinate of the vertex.'),
        explanation: same('$x_v=\\frac{-4}{2}=-2\\qquad y_v=4-8+1=-3\\qquad y=(x+2)^{2}-3$')
    },
    {
        id: 10, stage: 'shifts',
        prompt: say('Parabola baten erpina $(2,\\,1)$ da eta $(0,\\,9)$ puntutik pasatzen da. Kalkulatu $a$.', 'Una parábola tiene el vértice en $(2,\\,1)$ y pasa por $(0,\\,9)$. Halla $a$.', 'قطع مكافئ رأسه $(2,\\,1)$ ويمر بـ $(0,\\,9)$. أوجد $a$.', 'A parabola has its vertex at $(2,\\,1)$ and passes through $(0,\\,9)$. Find $a$.'),
        expected: n(2),
        hint: say('$y=a(x-2)^{2}+1$ eta ordeztu $(0,\\,9)$.', '$y=a(x-2)^{2}+1$ y sustituye $(0,\\,9)$.', '$y=a(x-2)^{2}+1$ وعوّض $(0,\\,9)$.', '$y=a(x-2)^{2}+1$ and substitute $(0,\\,9)$.'),
        explanation: same('$9=a(0-2)^{2}+1\\ \\to\\ 4a=8\\ \\to\\ a=2$')
    },
    {
        id: 11, stage: 'shifts',
        prompt: say('$y=2x+3$ zuzenak eta $y=x^{2}$ parabolak bi puntutan ebakitzen dute elkar. Zein da handienaren abzisa?', 'La recta $y=2x+3$ y la parábola $y=x^{2}$ se cortan en dos puntos. ¿Cuál es la abscisa del mayor?', 'يتقاطع المستقيم $y=2x+3$ والقطع $y=x^{2}$ في نقطتين. ما الإحداثي السيني للأكبر؟', 'The straight line $y=2x+3$ and the parabola $y=x^{2}$ meet at two points. What is the x-coordinate of the larger one?'),
        expected: n(3),
        hint: say('Berdindu bi adierazpenak.', 'Iguala las dos expresiones.', 'ساوِ بين العبارتين.', 'Set the two expressions equal.'),
        explanation: same('$x^{2}=2x+3\\ \\to\\ x^{2}-2x-3=0\\ \\to\\ x=3,\\ x=-1$')
    },
    {
        id: 12, stage: 'shifts',
        prompt: say('Parabola batek X ardatza $x=1$ eta $x=5$ puntuetan ebakitzen du eta $(0,\\,10)$ puntutik pasatzen da. Kalkulatu $a$.', 'Una parábola corta al eje X en $x=1$ y $x=5$ y pasa por $(0,\\,10)$. Halla $a$.', 'قطع مكافئ يقطع محور X عند $x=1$ و$x=5$ ويمر بـ $(0,\\,10)$. أوجد $a$.', 'A parabola crosses the x-axis at $x=1$ and $x=5$ and passes through $(0,\\,10)$. Find $a$.'),
        expected: n(2),
        hint: say('Forma faktorizatua: $y=a(x-1)(x-5)$.', 'Forma factorizada: $y=a(x-1)(x-5)$.', 'الصورة المحللة: $y=a(x-1)(x-5)$.', 'Factored form: $y=a(x-1)(x-5)$.'),
        explanation: same('$10=a\\cdot(-1)\\cdot(-5)=5a\\ \\to\\ a=2$')
    },
    /* ---------- Absolute value ---------- */
    {
        id: 13, stage: 'absolute',
        prompt: say('$f(x)=|2x+3|$ bada, kalkulatu $f(-4)$.', 'Si $f(x)=|2x+3|$, calcula $f(-4)$.', 'إذا كان $f(x)=|2x+3|$ فاحسب $f(-4)$.', 'If $f(x)=|2x+3|$, calculate $f(-4)$.'),
        expected: n(5),
        hint: say('Kalkulatu barrukoa eta kendu zeinua.', 'Calcula lo de dentro y quita el signo.', 'احسب ما بالداخل واحذف الإشارة.', 'Work out what is inside, then make it positive.'),
        explanation: same('$|2\\cdot(-4)+3|=|-5|=5$')
    },
    {
        id: 14, stage: 'absolute',
        prompt: say('Zein da $|x-3|=5$ ekuazioaren soluzio handiena?', '¿Cuál es la mayor solución de $|x-3|=5$?', 'ما أكبر حل للمعادلة $|x-3|=5$؟', 'What is the larger solution of $|x-3|=5$?'),
        expected: n(8),
        hint: say('Barrukoa $5$ edo $-5$ izan daiteke.', 'Lo de dentro puede valer $5$ o $-5$.', 'قد يساوي ما بالداخل $5$ أو $-5$.', 'The expression inside can be $5$ or $-5$.'),
        explanation: same('$x-3=5\\ \\to\\ x=8\\qquad x-3=-5\\ \\to\\ x=-2$')
    },
    {
        id: 15, stage: 'absolute',
        prompt: say('Zein da $y=|x^{2}-6x+5|$ funtzioaren maximo erlatiboaren balioa?', '¿Cuál es el valor del máximo relativo de $y=|x^{2}-6x+5|$?', 'ما قيمة العظمى النسبية لـ $y=|x^{2}-6x+5|$؟', 'What is the value of the local maximum of $y=|x^{2}-6x+5|$?'),
        expected: n(4),
        hint: say('Barruko parabolaren erpina gora islatzen da.', 'El vértice de la parábola de dentro se refleja hacia arriba.', 'رأس القطع الداخلي ينعكس إلى الأعلى.', 'The vertex of the parabola inside is reflected upwards.'),
        explanation: same('$x_v=\\frac{6}{2}=3\\qquad y_v=9-18+5=-4\\ \\to\\ (3,\\,4)$')
    },
    {
        id: 16, stage: 'absolute',
        prompt: say('Zein $x$-tan du erpina $y=|2x-7|$ funtzioaren grafikoak?', '¿En qué $x$ tiene el pico la gráfica de $y=|2x-7|$?', 'عند أي $x$ يقع رأس رسم $y=|2x-7|$؟', 'At what $x$ does the graph of $y=|2x-7|$ have its corner?'),
        expected: v('3,5'),
        hint: say('Barrukoa 0 den lekuan.', 'Donde lo de dentro vale 0.', 'حيث يساوي ما بالداخل 0.', 'Where the expression inside is 0.'),
        explanation: same('$2x-7=0\\ \\to\\ x=\\frac{7}{2}=3{,}5$')
    },
    /* ---------- Rational functions ---------- */
    {
        id: 17, stage: 'rational',
        prompt: say('$y=\\frac{k}{x}$ hiperbola $(-3,\\,4)$ puntutik pasatzen da. Kalkulatu $k$.', 'La hipérbola $y=\\frac{k}{x}$ pasa por $(-3,\\,4)$. Halla $k$.', 'يمر القطع الزائد $y=\\frac{k}{x}$ بـ $(-3,\\,4)$. أوجد $k$.', 'The hyperbola $y=\\frac{k}{x}$ passes through $(-3,\\,4)$. Find $k$.'),
        expected: n(-12),
        hint: say('$k=x\\cdot y$.', '$k=x\\cdot y$.', '$k=x\\cdot y$.', '$k=x\\cdot y$.'),
        explanation: same('$k=-3\\cdot 4=-12$')
    },
    {
        id: 18, stage: 'rational',
        prompt: say('6 langilek 10 egunean egiten dute lan bat. Zenbat egunetan egingo lukete 15 langilek?', '6 obreros hacen un trabajo en 10 días. ¿En cuántos días lo harían 15 obreros?', 'ينجز 6 عمال عملًا في 10 أيام. في كم يومًا ينجزه 15 عاملًا؟', '6 workers do a job in 10 days. In how many days would 15 workers do it?'),
        expected: n(4),
        hint: say('Alderantzizko proportzionaltasuna: biderkadura konstantea da.', 'Proporcionalidad inversa: el producto es constante.', 'تناسب عكسي: حاصل الضرب ثابت.', 'Inverse proportion: the product is constant.'),
        explanation: same('$k=6\\cdot 10=60\\qquad y=\\frac{60}{15}=4$')
    },
    {
        id: 19, stage: 'rational',
        prompt: say('Zein balio ez du inoiz hartzen $y=\\frac{3}{x-4}+2$ funtzioak?', '¿Qué valor no toma nunca la función $y=\\frac{3}{x-4}+2$?', 'ما القيمة التي لا تأخذها الدالة $y=\\frac{3}{x-4}+2$ أبدًا؟', 'Which value is never taken by the function $y=\\frac{3}{x-4}+2$?'),
        expected: n(2),
        hint: say('Asintota horizontala: $y=b$.', 'La asíntota horizontal: $y=b$.', 'المقارب الأفقي: $y=b$.', 'The horizontal asymptote: $y=b$.'),
        explanation: say('$\\frac{3}{x-4}$ ez da inoiz 0: asintota $y=2$ da eta Rec $f=\\mathbb{R}-\\{2\\}$.', '$\\frac{3}{x-4}$ nunca vale 0: la asíntota es $y=2$ y Rec $f=\\mathbb{R}-\\{2\\}$.', '$\\frac{3}{x-4}$ لا يساوي 0 أبدًا: المقارب $y=2$ وRec $f=\\mathbb{R}-\\{2\\}$.', '$\\frac{3}{x-4}$ is never 0: the asymptote is $y=2$ and Range $f=\\mathbb{R}-\\{2\\}$.')
    },
    {
        id: 20, stage: 'rational',
        prompt: say('Zein da $y=\\frac{4x-1}{2x+6}$ funtzioaren asintota horizontala, $y=\\,?$', '¿Cuál es la asíntota horizontal de $y=\\frac{4x-1}{2x+6}$, $y=\\,?$', 'ما المقارب الأفقي لـ $y=\\frac{4x-1}{2x+6}$، $y=\\,?$', 'What is the horizontal asymptote of $y=\\frac{4x-1}{2x+6}$, $y=\\,?$'),
        expected: n(2),
        hint: say('Zatitu $x$-en koefizienteak.', 'Divide los coeficientes de $x$.', 'اقسم معاملي $x$.', 'Divide the coefficients of $x$.'),
        explanation: same('$y=\\frac{4}{2}=2\\qquad 2x+6=0\\ \\to\\ x=-3$')
    }
]

export const polynomialAkChallenges: ChallengeItem[] = [
    /* ---------- Linear functions ---------- */
    {
        id: 101, stage: 'lines', points: 10, context: 'starter',
        prompt: say('Telefono-tarifa batek 8 € kobratzen ditu hilean eta 0,05 € minutu bakoitzeko. Zenbat minutu hitz egin daiteke 20 €-rekin?', 'Una tarifa de teléfono cobra 8 € al mes y 0,05 € por minuto. ¿Cuántos minutos se puede hablar con 20 €?', 'تأخذ باقة هاتف 8 € شهريًا و0.05 € لكل دقيقة. كم دقيقة يمكن التحدث بـ 20 €؟', 'A phone tariff charges €8 a month and €0.05 per minute. How many minutes can you talk for €20?'),
        expected: n(240),
        hint: say('Ebatzi $0{,}05x+8=20$.', 'Resuelve $0{,}05x+8=20$.', 'حُلّ $0{,}05x+8=20$.', 'Solve $0{,}05x+8=20$.'),
        explanation: same('$0{,}05x=12\\ \\to\\ x=\\frac{12}{0{,}05}=240$')
    },
    {
        id: 102, stage: 'lines', points: 20, context: 'advanced',
        prompt: say('Zuzen bat $(1,\\,5)$ eta $(4,\\,-1)$ puntuetatik pasatzen da. Zein abzisatan ebakitzen du X ardatza?', 'Una recta pasa por $(1,\\,5)$ y $(4,\\,-1)$. ¿En qué abscisa corta al eje X?', 'يمر مستقيم بـ $(1,\\,5)$ و$(4,\\,-1)$. عند أي إحداثي سيني يقطع محور X؟', 'A straight line passes through $(1,\\,5)$ and $(4,\\,-1)$. At what x-coordinate does it cross the x-axis?'),
        expected: v('3,5'),
        hint: say('Kalkulatu malda, ekuazioa eta gero $y=0$.', 'Calcula la pendiente, la ecuación y luego $y=0$.', 'احسب الميل ثم المعادلة ثم $y=0$.', 'Calculate the slope and the equation, then set $y=0$.'),
        explanation: same('$m=\\frac{-1-5}{4-1}=-2\\qquad y=-2x+7\\qquad -2x+7=0\\ \\to\\ x=3{,}5$')
    },
    {
        id: 103, stage: 'lines', points: 30, context: 'master',
        prompt: say('$(0,\\,1)$, $(2,\\,5)$ eta $(5,\\,k)$ puntuak zuzen berean daude. Kalkulatu $k$.', 'Los puntos $(0,\\,1)$, $(2,\\,5)$ y $(5,\\,k)$ están alineados. Halla $k$.', 'النقاط $(0,\\,1)$ و$(2,\\,5)$ و$(5,\\,k)$ على استقامة واحدة. أوجد $k$.', 'The points $(0,\\,1)$, $(2,\\,5)$ and $(5,\\,k)$ lie on the same straight line. Find $k$.'),
        expected: n(11),
        hint: say('Bi lehenengoekin idatzi zuzena eta ordeztu $x=5$.', 'Con los dos primeros escribe la recta y sustituye $x=5$.', 'اكتب المستقيم بالنقطتين الأوليين وعوّض $x=5$.', 'Use the first two to write the equation of the straight line, then substitute $x=5$.'),
        explanation: same('$m=\\frac{5-1}{2-0}=2\\qquad k=2\\cdot 5+1=11$')
    },
    /* ---------- Quadratic functions ---------- */
    {
        id: 104, stage: 'parabolas', points: 10, context: 'starter',
        prompt: say('$y=x^{2}-4x+c$ parabola $(1,\\,0)$ puntutik pasatzen da. Kalkulatu $c$.', 'La parábola $y=x^{2}-4x+c$ pasa por $(1,\\,0)$. Halla $c$.', 'يمر القطع $y=x^{2}-4x+c$ بـ $(1,\\,0)$. أوجد $c$.', 'The parabola $y=x^{2}-4x+c$ passes through $(1,\\,0)$. Find $c$.'),
        expected: n(3),
        hint: say('Ordeztu $x=1$, $y=0$.', 'Sustituye $x=1$, $y=0$.', 'عوّض $x=1$ و$y=0$.', 'Substitute $x=1$, $y=0$.'),
        explanation: same('$1-4+c=0\\ \\to\\ c=3$')
    },
    {
        id: 105, stage: 'parabolas', points: 20, context: 'advanced',
        prompt: say('Laukizuzen baten perimetroa 20 m da. Zein da izan dezakeen azalera handiena (m²)?', 'Un rectángulo tiene 20 m de perímetro. ¿Cuál es la mayor área que puede tener (m²)?', 'محيط مستطيل 20 م. ما أكبر مساحة ممكنة له (م²)؟', 'A rectangle has a perimeter of 20 m. What is the largest area it can have (m²)?'),
        expected: n(25),
        hint: say('Aldeak $x$ eta $10-x$: $A=x(10-x)$, parabola bat.', 'Lados $x$ y $10-x$: $A=x(10-x)$, una parábola.', 'الضلعان $x$ و$10-x$: $A=x(10-x)$، قطع مكافئ.', 'Sides $x$ and $10-x$: $A=x(10-x)$, a parabola.'),
        explanation: same('$A=-x^{2}+10x\\qquad x=\\frac{-10}{-2}=5\\qquad A=5\\cdot 5=25$')
    },
    {
        id: 106, stage: 'parabolas', points: 30, context: 'master',
        prompt: say('$y=x^{2}+mx+9$ parabolak X ardatza ukitzen du $x$ positibo batean. Kalkulatu $m$.', 'La parábola $y=x^{2}+mx+9$ toca al eje X en una $x$ positiva. Halla $m$.', 'يمس القطع $y=x^{2}+mx+9$ محور X عند $x$ موجب. أوجد $m$.', 'The parabola $y=x^{2}+mx+9$ touches the x-axis at a positive $x$. Find $m$.'),
        expected: n(-6),
        hint: say('Ukitzeko $\\Delta=0$; erpina eskuinean egoteko $\\frac{-m}{2}>0$.', 'Para tocarlo $\\Delta=0$; para que el vértice quede a la derecha, $\\frac{-m}{2}>0$.', 'للمماسة $\\Delta=0$؛ وليكون الرأس على اليمين $\\frac{-m}{2}>0$.', 'To touch it, $\\Delta=0$; for the vertex to lie to the right, $\\frac{-m}{2}>0$.'),
        explanation: same('$\\Delta=m^{2}-36=0\\ \\to\\ m=\\pm 6\\qquad x_v=\\frac{-m}{2}>0\\ \\to\\ m=-6$')
    },
    /* ---------- Translations and intersections ---------- */
    {
        id: 107, stage: 'shifts', points: 10, context: 'starter',
        prompt: say('$y=x^{2}$ parabola 3 unitate eskuinera eta 2 gora eraman da. Kalkulatu $f(0)$.', 'La parábola $y=x^{2}$ se traslada 3 unidades a la derecha y 2 hacia arriba. Calcula $f(0)$.', 'سُحب القطع $y=x^{2}$ 3 وحدات إلى اليمين و2 إلى الأعلى. احسب $f(0)$.', 'The parabola $y=x^{2}$ is moved 3 units to the right and 2 units up. Calculate $f(0)$.'),
        expected: n(11),
        hint: say('$y=(x-3)^{2}+2$.', '$y=(x-3)^{2}+2$.', '$y=(x-3)^{2}+2$.', '$y=(x-3)^{2}+2$.'),
        explanation: same('$y=(x-3)^{2}+2\\qquad f(0)=9+2=11$')
    },
    {
        id: 108, stage: 'shifts', points: 20, context: 'advanced',
        prompt: say('Parabola baten erpina $(-1,\\,2)$ da eta $(1,\\,-6)$ puntutik pasatzen da. Kalkulatu $a$.', 'Una parábola tiene el vértice en $(-1,\\,2)$ y pasa por $(1,\\,-6)$. Halla $a$.', 'قطع مكافئ رأسه $(-1,\\,2)$ ويمر بـ $(1,\\,-6)$. أوجد $a$.', 'A parabola has its vertex at $(-1,\\,2)$ and passes through $(1,\\,-6)$. Find $a$.'),
        expected: n(-2),
        hint: say('$y=a(x+1)^{2}+2$ eta ordeztu puntua.', '$y=a(x+1)^{2}+2$ y sustituye el punto.', '$y=a(x+1)^{2}+2$ وعوّض النقطة.', '$y=a(x+1)^{2}+2$ and substitute the point.'),
        explanation: same('$-6=a(1+1)^{2}+2\\ \\to\\ 4a=-8\\ \\to\\ a=-2$')
    },
    {
        id: 109, stage: 'shifts', points: 30, context: 'master',
        prompt: say('Zein $n$ baliorekin da $y=2x+n$ zuzena $y=x^{2}$ parabolaren ukitzailea?', '¿Para qué valor de $n$ es la recta $y=2x+n$ tangente a la parábola $y=x^{2}$?', 'لأي قيمة لـ $n$ يكون المستقيم $y=2x+n$ مماسًا للقطع $y=x^{2}$؟', 'For what value of $n$ is the straight line $y=2x+n$ tangent to the parabola $y=x^{2}$?'),
        expected: n(-1),
        hint: say('Berdindu eta eskatu $\\Delta=0$.', 'Iguala y exige $\\Delta=0$.', 'ساوِ واشترط $\\Delta=0$.', 'Set them equal and require $\\Delta=0$.'),
        explanation: same('$x^{2}-2x-n=0\\qquad \\Delta=4+4n=0\\ \\to\\ n=-1$')
    },
    /* ---------- Absolute value ---------- */
    {
        id: 110, stage: 'absolute', points: 10, context: 'starter',
        prompt: say('$f(x)=|x^{2}-5|$ bada, kalkulatu $f(-2)$.', 'Si $f(x)=|x^{2}-5|$, calcula $f(-2)$.', 'إذا كان $f(x)=|x^{2}-5|$ فاحسب $f(-2)$.', 'If $f(x)=|x^{2}-5|$, calculate $f(-2)$.'),
        expected: n(1),
        hint: say('Ordeztu parentesi artean eta kendu zeinua.', 'Sustituye entre paréntesis y quita el signo.', 'عوّض بين قوسين واحذف الإشارة.', 'Substitute inside the brackets and make the result positive.'),
        explanation: same('$|(-2)^{2}-5|=|-1|=1$')
    },
    {
        id: 111, stage: 'absolute', points: 20, context: 'advanced',
        prompt: say('Zenbat soluzio ditu $|x^{2}-4|=3$ ekuazioak?', '¿Cuántas soluciones tiene la ecuación $|x^{2}-4|=3$?', 'كم حلًّا للمعادلة $|x^{2}-4|=3$؟', 'How many solutions does the equation $|x^{2}-4|=3$ have?'),
        expected: n(4),
        hint: say('Barrukoa 3 edo $-3$ da.', 'Lo de dentro vale 3 o $-3$.', 'ما بالداخل يساوي 3 أو $-3$.', 'The expression inside equals 3 or $-3$.'),
        explanation: say('$x^{2}-4=3$: $x=\\pm\\sqrt{7}$. $x^{2}-4=-3$: $x=\\pm 1$. Guztira 4.', '$x^{2}-4=3$: $x=\\pm\\sqrt{7}$. $x^{2}-4=-3$: $x=\\pm 1$. En total, 4.', '$x^{2}-4=3$: $x=\\pm\\sqrt{7}$. $x^{2}-4=-3$: $x=\\pm 1$. المجموع 4.', '$x^{2}-4=3$: $x=\\pm\\sqrt{7}$. $x^{2}-4=-3$: $x=\\pm 1$. In total, 4.')
    },
    {
        id: 112, stage: 'absolute', points: 30, context: 'master',
        prompt: say('$y=|x-2|$ eta $y=3$ grafikoek triangelu bat mugatzen dute. Zein da haren azalera?', 'Las gráficas de $y=|x-2|$ e $y=3$ encierran un triángulo. ¿Cuál es su área?', 'يحصر الرسمان $y=|x-2|$ و$y=3$ مثلثًا. ما مساحته؟', 'The graphs of $y=|x-2|$ and $y=3$ enclose a triangle. What is its area?'),
        expected: n(9),
        hint: say('Ebaki-puntuak $|x-2|=3$ ebatzita; erpina $(2,\\,0)$.', 'Los cortes, resolviendo $|x-2|=3$; el pico, $(2,\\,0)$.', 'التقاطعات بحل $|x-2|=3$؛ والرأس $(2,\\,0)$.', 'The meeting points, solving $|x-2|=3$; the corner, $(2,\\,0)$.'),
        explanation: same('$x=5,\\ x=-1\\qquad A=\\frac{6\\cdot 3}{2}=9$')
    },
    /* ---------- Rational functions ---------- */
    {
        id: 113, stage: 'rational', points: 10, context: 'starter',
        prompt: say('4 txorrotak 9 orduan betetzen dute depositu bat. Zenbat ordutan beteko lukete 6 txorrotak?', '4 grifos llenan un depósito en 9 horas. ¿En cuántas horas lo llenarían 6 grifos?', 'تملأ 4 صنابير خزانًا في 9 ساعات. في كم ساعة تملؤه 6 صنابير؟', '4 taps fill a tank in 9 hours. In how many hours would 6 taps fill it?'),
        expected: n(6),
        hint: say('Biderkadura konstantea da.', 'El producto es constante.', 'حاصل الضرب ثابت.', 'The product is constant.'),
        explanation: same('$k=4\\cdot 9=36\\qquad \\frac{36}{6}=6$')
    },
    {
        id: 114, stage: 'rational', points: 20, context: 'advanced',
        prompt: say('$y=\\frac{ax+1}{x-2}$ funtzioaren asintota horizontala $y=3$ da. Kalkulatu $f(3)$.', 'La función $y=\\frac{ax+1}{x-2}$ tiene la asíntota horizontal $y=3$. Calcula $f(3)$.', 'المقارب الأفقي للدالة $y=\\frac{ax+1}{x-2}$ هو $y=3$. احسب $f(3)$.', 'The function $y=\\frac{ax+1}{x-2}$ has the horizontal asymptote $y=3$. Calculate $f(3)$.'),
        expected: n(10),
        hint: say('Asintota horizontala $\\frac{a}{1}$ da.', 'La asíntota horizontal es $\\frac{a}{1}$.', 'المقارب الأفقي هو $\\frac{a}{1}$.', 'The horizontal asymptote is $\\frac{a}{1}$.'),
        explanation: same('$a=3\\qquad f(3)=\\frac{3\\cdot 3+1}{3-2}=10$')
    },
    {
        id: 115, stage: 'rational', points: 30, context: 'master',
        prompt: say('$y=\\frac{k}{x-1}+2$ hiperbola $(3,\\,5)$ puntutik pasatzen da. Zein abzisatan ebakitzen du X ardatza?', 'La hipérbola $y=\\frac{k}{x-1}+2$ pasa por $(3,\\,5)$. ¿En qué abscisa corta al eje X?', 'يمر القطع الزائد $y=\\frac{k}{x-1}+2$ بـ $(3,\\,5)$. عند أي إحداثي سيني يقطع محور X؟', 'The hyperbola $y=\\frac{k}{x-1}+2$ passes through $(3,\\,5)$. At what x-coordinate does it cross the x-axis?'),
        expected: n(-2),
        hint: say('Lehenik $k$, gero $y=0$.', 'Primero $k$, luego $y=0$.', 'أولًا $k$ ثم $y=0$.', 'First $k$, then $y=0$.'),
        explanation: same('$5=\\frac{k}{2}+2\\ \\to\\ k=6\\qquad \\frac{6}{x-1}=-2\\ \\to\\ x=-2$')
    }
]

export const polynomialAkExerciseBank: ExerciseSection[] = [
    {
        id: 'lines',
        title: say('Funtzio linealak', 'Funciones lineales', 'الدوال الخطية', 'Linear functions'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Zein da $y=-3x+5$ zuzenaren malda?', '¿Cuál es la pendiente de $y=-3x+5$?', 'ما ميل $y=-3x+5$؟', 'What is the slope of $y=-3x+5$?'), solution: say('$x$-en koefizientea: $m=-3$.', 'El coeficiente de $x$: $m=-3$.', 'معامل $x$: $m=-3$.', 'The coefficient of $x$: $m=-3$.'), answer: { expected: n(-3) } },
            { id: 2, difficulty: 'easy', question: say('Zein da $y=4x-7$ zuzenaren jatorriko ordenatua?', '¿Cuál es la ordenada en el origen de $y=4x-7$?', 'ما الجزء المقطوع من محور Y للمستقيم $y=4x-7$؟', 'What is the y-intercept of $y=4x-7$?'), solution: same('$f(0)=-7$'), answer: { expected: n(-7) } },
            { id: 3, difficulty: 'easy', question: say('$y=5$ funtzioa gorakorra da?', '¿Es creciente la función $y=5$?', 'هل الدالة $y=5$ متزايدة؟', 'Is the function $y=5$ increasing?'), solution: say('Ez: $m=0$, konstantea da (X ardatzaren paraleloa).', 'No: $m=0$, es constante (paralela al eje X).', 'لا: $m=0$، إنها ثابتة (توازي محور X).', 'No: $m=0$, it is constant (parallel to the x-axis).') },
            { id: 4, difficulty: 'easy', question: say('$f(x)=-2x+1$ bada, kalkulatu $f(3)$.', 'Si $f(x)=-2x+1$, calcula $f(3)$.', 'إذا كان $f(x)=-2x+1$ فاحسب $f(3)$.', 'If $f(x)=-2x+1$, calculate $f(3)$.'), solution: same('$-2\\cdot 3+1=-5$'), answer: { expected: n(-5) } },
            { id: 5, difficulty: 'medium', question: say('Kalkulatu $(-1,\\,-2)$ eta $(3,\\,6)$ puntuetatik pasatzen den zuzenaren malda.', 'Calcula la pendiente de la recta que pasa por $(-1,\\,-2)$ y $(3,\\,6)$.', 'احسب ميل المستقيم المار بـ $(-1,\\,-2)$ و$(3,\\,6)$.', 'Calculate the slope of the straight line through $(-1,\\,-2)$ and $(3,\\,6)$.'), solution: same('$m=\\frac{6-(-2)}{3-(-1)}=\\frac{8}{4}=2$'), answer: { expected: n(2) } },
            { id: 6, difficulty: 'medium', question: say('Zuzen batek $-\\frac{1}{2}$ malda du eta $(4,\\,3)$ puntutik pasatzen da. Zein da haren jatorriko ordenatua?', 'Una recta tiene pendiente $-\\frac{1}{2}$ y pasa por $(4,\\,3)$. ¿Cuál es su ordenada en el origen?', 'مستقيم ميله $-\\frac{1}{2}$ ويمر بـ $(4,\\,3)$. ما الجزء المقطوع من محور Y؟', 'A straight line has slope $-\\frac{1}{2}$ and passes through $(4,\\,3)$. What is its y-intercept?'), solution: same('$y-3=-\\frac{1}{2}(x-4)\\ \\to\\ y=-\\frac{1}{2}x+5$'), answer: { expected: n(5) } },
            { id: 7, difficulty: 'medium', question: say('500 L-ko depositu batek 20 L galtzen ditu minutuko. Zenbat minututan hustuko da?', 'Un depósito de 500 L pierde 20 L por minuto. ¿En cuántos minutos se vacía?', 'يفقد خزان سعته 500 ل مقدار 20 ل في الدقيقة. في كم دقيقة يفرغ؟', 'A 500 L tank loses 20 L per minute. How many minutes does it take to empty?'), solution: same('$500-20t=0\\ \\to\\ t=\\frac{500}{20}=25$'), answer: { expected: n(25) } },
            { id: 8, difficulty: 'medium', question: say('Zein abzisatan ebakitzen du $y=3x-6$ zuzenak X ardatza?', '¿En qué abscisa corta la recta $y=3x-6$ al eje X?', 'عند أي إحداثي سيني يقطع المستقيم $y=3x-6$ محور X؟', 'At what x-coordinate does the straight line $y=3x-6$ cross the x-axis?'), solution: same('$3x-6=0\\ \\to\\ x=2$'), answer: { expected: n(2) } },
            { id: 9, difficulty: 'hard', question: say('Zein da $y=3x+4$ zuzenaren paraleloa den eta $(2,\\,-1)$ puntutik pasatzen den zuzenaren jatorriko ordenatua?', '¿Cuál es la ordenada en el origen de la recta paralela a $y=3x+4$ que pasa por $(2,\\,-1)$?', 'ما الجزء المقطوع من محور Y للمستقيم الموازي لـ $y=3x+4$ والمار بـ $(2,\\,-1)$؟', 'What is the y-intercept of the straight line parallel to $y=3x+4$ that passes through $(2,\\,-1)$?'), solution: same('$y+1=3(x-2)\\ \\to\\ y=3x-7$'), answer: { expected: n(-7) } },
            { id: 10, difficulty: 'hard', question: say('A enpresak 20 € gehi 0,1 € kobratzen ditu km bakoitzeko, eta B enpresak 0,15 € km bakoitzeko. Zenbat km-tatik aurrera da A merkeagoa?', 'La empresa A cobra 20 € más 0,1 € por km, y la empresa B 0,15 € por km. ¿A partir de cuántos km es más barata A?', 'تأخذ الشركة A مبلغ 20 € زائد 0.1 € لكل كم، والشركة B مبلغ 0.15 € لكل كم. ابتداءً من كم كيلومترًا تصبح A أرخص؟', 'Company A charges €20 plus €0.1 per km, and company B charges €0.15 per km. From how many km is company A cheaper?'), solution: same('$20+0{,}1x=0{,}15x\\ \\to\\ 0{,}05x=20\\ \\to\\ x=\\frac{20}{0{,}05}=400$'), answer: { expected: n(400) } }
        ]
    },
    {
        id: 'parabolas',
        title: say('Funtzio koadratikoak', 'Funciones cuadráticas', 'الدوال التربيعية', 'Quadratic functions'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Zein da $y=x^{2}-8x+1$ parabolaren erpinaren abzisa?', '¿Cuál es la abscisa del vértice de $y=x^{2}-8x+1$?', 'ما الإحداثي السيني لرأس $y=x^{2}-8x+1$؟', 'What is the x-coordinate of the vertex of $y=x^{2}-8x+1$?'), solution: same('$x_v=\\frac{8}{2}=4$'), answer: { expected: n(4) } },
            { id: 12, difficulty: 'easy', question: say('Zein puntutan ebakitzen du $y=2x^{2}-3x+7$ parabolak Y ardatza? Idatzi ordenatua.', '¿En qué punto corta $y=2x^{2}-3x+7$ al eje Y? Escribe la ordenada.', 'في أي نقطة يقطع $y=2x^{2}-3x+7$ محور Y؟ اكتب الإحداثي الصادي.', 'At what point does $y=2x^{2}-3x+7$ cross the y-axis? Write the y-coordinate.'), solution: same('$f(0)=7\\ \\to\\ (0,\\,7)$'), answer: { expected: n(7) } },
            { id: 13, difficulty: 'easy', question: say('Nora irekitzen da $y=-3x^{2}$ parabola? Maximoa ala minimoa du?', '¿Hacia dónde se abre $y=-3x^{2}$? ¿Tiene máximo o mínimo?', 'إلى أين ينفتح $y=-3x^{2}$؟ هل له عظمى أم صغرى؟', 'Which way does $y=-3x^{2}$ open? Does it have a maximum or a minimum?'), solution: say('$a=-3<0$: behera; erpina, $(0,\\,0)$, maximoa da.', '$a=-3<0$: hacia abajo; el vértice, $(0,\\,0)$, es un máximo.', '$a=-3<0$: إلى الأسفل؛ والرأس $(0,\\,0)$ قيمة عظمى.', '$a=-3<0$: it opens downwards; the vertex, $(0,\\,0)$, is a maximum.') },
            { id: 14, difficulty: 'medium', question: say('Zein da $y=x^{2}+6x+10$ funtzioaren balio minimoa?', '¿Cuál es el valor mínimo de $y=x^{2}+6x+10$?', 'ما القيمة الصغرى لـ $y=x^{2}+6x+10$؟', 'What is the minimum value of $y=x^{2}+6x+10$?'), solution: same('$x_v=\\frac{-6}{2}=-3\\qquad y_v=9-18+10=1$'), answer: { expected: n(1) } },
            { id: 15, difficulty: 'medium', question: say('Zenbat puntutan ebakitzen du $y=x^{2}-4x+4$ parabolak X ardatza?', '¿En cuántos puntos corta $y=x^{2}-4x+4$ al eje X?', 'في كم نقطة يقطع $y=x^{2}-4x+4$ محور X؟', 'At how many points does $y=x^{2}-4x+4$ cross the x-axis?'), solution: say('$\\Delta=16-16=0$: puntu bakarrean, erpinean.', '$\\Delta=16-16=0$: en un solo punto, el vértice.', '$\\Delta=16-16=0$: في نقطة واحدة هي الرأس.', '$\\Delta=16-16=0$: at just one point, the vertex.'), answer: { expected: n(1) } },
            { id: 16, difficulty: 'medium', question: say('Zein da $y=2x^{2}-2x-12$ parabolak X ardatzarekin duen ebaki-punturik handienaren abzisa?', '¿Cuál es la abscisa del mayor punto de corte de $y=2x^{2}-2x-12$ con el eje X?', 'ما الإحداثي السيني لأكبر نقطة تقاطع لـ $y=2x^{2}-2x-12$ مع محور X؟', 'What is the x-coordinate of the larger point where $y=2x^{2}-2x-12$ crosses the x-axis?'), solution: same('$x^{2}-x-6=0\\ \\to\\ x=3,\\ x=-2$'), answer: { expected: n(3) } },
            { id: 17, difficulty: 'medium', question: say('Zein da $y=-x^{2}+2x+3$ funtzioaren balio maximoa?', '¿Cuál es el valor máximo de $y=-x^{2}+2x+3$?', 'ما القيمة العظمى لـ $y=-x^{2}+2x+3$؟', 'What is the maximum value of $y=-x^{2}+2x+3$?'), solution: same('$x_v=\\frac{-2}{-2}=1\\qquad y_v=-1+2+3=4$'), answer: { expected: n(4) } },
            { id: 18, difficulty: 'hard', question: say('Pilota baten altuera $h=-5t^{2}+30t+2$ da (m, s). Zein da altuera maximoa (m)?', 'La altura de una pelota es $h=-5t^{2}+30t+2$ (m, s). ¿Cuál es la altura máxima (m)?', 'ارتفاع كرة $h=-5t^{2}+30t+2$ (م، ث). ما أقصى ارتفاع (م)؟', 'The height of a ball is $h=-5t^{2}+30t+2$ (m, s). What is the maximum height (m)?'), solution: same('$t=\\frac{-30}{-10}=3\\qquad h=-45+90+2=47$'), answer: { expected: n(47) } },
            { id: 19, difficulty: 'hard', question: say('Zein da $y=x^{2}+4x+c$ parabolak X ardatza ez ebakitzeko $c$ oso txikiena?', '¿Cuál es el menor entero $c$ para el que $y=x^{2}+4x+c$ no corta al eje X?', 'ما أصغر عدد صحيح $c$ بحيث لا يقطع $y=x^{2}+4x+c$ محور X؟', 'What is the smallest integer $c$ for which $y=x^{2}+4x+c$ does not cross the x-axis?'), solution: say('$\\Delta=16-4c<0$ denean, hau da, $c>4$: $c=5$.', 'Cuando $\\Delta=16-4c<0$, es decir, $c>4$: $c=5$.', 'عندما $\\Delta=16-4c<0$، أي $c>4$: $c=5$.', 'When $\\Delta=16-4c<0$, that is, $c>4$: $c=5$.'), answer: { expected: n(5) } },
            { id: 20, difficulty: 'hard', question: say('Azaldu zergatik $y=x^{2}+1$ eta $y=-x^{2}-1$ parabolek ez duten inoiz X ardatza ebakitzen.', 'Explica por qué las parábolas $y=x^{2}+1$ e $y=-x^{2}-1$ no cortan nunca al eje X.', 'اشرح لماذا لا يقطع القطعان $y=x^{2}+1$ و$y=-x^{2}-1$ محور X أبدًا.', 'Explain why the parabolas $y=x^{2}+1$ and $y=-x^{2}-1$ never cross the x-axis.'), solution: say('Lehenengoak minimoa $(0,\\,1)$ puntuan du eta gora irekitzen da; bigarrenak maximoa $(0,\\,-1)$ puntuan du eta behera irekitzen da. Bietan $\\Delta=-4<0$.', 'La primera tiene el mínimo en $(0,\\,1)$ y se abre hacia arriba; la segunda tiene el máximo en $(0,\\,-1)$ y se abre hacia abajo. En las dos $\\Delta=-4<0$.', 'الأول صغراه في $(0,\\,1)$ وينفتح إلى الأعلى؛ والثاني عظماه في $(0,\\,-1)$ وينفتح إلى الأسفل. وفي كليهما $\\Delta=-4<0$.', 'The first has its minimum at $(0,\\,1)$ and opens upwards; the second has its maximum at $(0,\\,-1)$ and opens downwards. In both, $\\Delta=-4<0$.') }
        ]
    },
    {
        id: 'shifts',
        title: say('Lekualdaketak eta ebakidurak', 'Traslaciones y cortes', 'الانسحابات والتقاطعات', 'Translations and intersections'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Zein da $y=(x-5)^{2}+2$ parabolaren erpinaren abzisa?', '¿Cuál es la abscisa del vértice de $y=(x-5)^{2}+2$?', 'ما الإحداثي السيني لرأس $y=(x-5)^{2}+2$؟', 'What is the x-coordinate of the vertex of $y=(x-5)^{2}+2$?'), solution: same('$V(5,\\,2)$'), answer: { expected: n(5) } },
            { id: 22, difficulty: 'easy', question: say('Nola lortzen da $y=x^{2}-4$ parabola $y=x^{2}$ parabolatik?', '¿Cómo se obtiene $y=x^{2}-4$ a partir de $y=x^{2}$?', 'كيف نحصل على $y=x^{2}-4$ من $y=x^{2}$؟', 'How do you get $y=x^{2}-4$ from $y=x^{2}$?'), solution: say('4 unitate behera eramanda; erpina $(0,\\,-4)$ da.', 'Bajándola 4 unidades; el vértice es $(0,\\,-4)$.', 'بإنزاله 4 وحدات؛ الرأس $(0,\\,-4)$.', 'By moving it down 4 units; the vertex is $(0,\\,-4)$.') },
            { id: 23, difficulty: 'easy', question: say('Zein da $y=-2(x+1)^{2}+7$ funtzioaren balio maximoa?', '¿Cuál es el valor máximo de $y=-2(x+1)^{2}+7$?', 'ما القيمة العظمى لـ $y=-2(x+1)^{2}+7$؟', 'What is the maximum value of $y=-2(x+1)^{2}+7$?'), solution: say('Erpina $(-1,\\,7)$ da eta $a<0$: maximoa 7 da.', 'El vértice es $(-1,\\,7)$ y $a<0$: el máximo es 7.', 'الرأس $(-1,\\,7)$ و$a<0$: العظمى 7.', 'The vertex is $(-1,\\,7)$ and $a<0$: the maximum is 7.'), answer: { expected: n(7) } },
            { id: 24, difficulty: 'medium', question: say('Garatu $y=(x-2)^{2}+3$. Zenbat da gai askea?', 'Desarrolla $y=(x-2)^{2}+3$. ¿Cuánto vale el término independiente?', 'انشر $y=(x-2)^{2}+3$. كم الحد الثابت؟', 'Expand $y=(x-2)^{2}+3$. What is the constant term?'), solution: same('$x^{2}-4x+4+3=x^{2}-4x+7$'), answer: { expected: n(7) } },
            { id: 25, difficulty: 'medium', question: say('$y=x^{2}+2x-3$ idatzi $y=(x-p)^{2}+q$ forman. Zenbat da $q$?', 'Escribe $y=x^{2}+2x-3$ como $y=(x-p)^{2}+q$. ¿Cuánto vale $q$?', 'اكتب $y=x^{2}+2x-3$ على صورة $y=(x-p)^{2}+q$. كم قيمة $q$؟', 'Write $y=x^{2}+2x-3$ as $y=(x-p)^{2}+q$. What is $q$?'), solution: same('$x_v=-1\\qquad y_v=1-2-3=-4\\qquad y=(x+1)^{2}-4$'), answer: { expected: n(-4) } },
            { id: 26, difficulty: 'medium', question: say('Parabola baten erpina $(0,\\,-3)$ da eta $(2,\\,5)$ puntutik pasatzen da. Kalkulatu $a$.', 'Una parábola tiene el vértice en $(0,\\,-3)$ y pasa por $(2,\\,5)$. Halla $a$.', 'قطع مكافئ رأسه $(0,\\,-3)$ ويمر بـ $(2,\\,5)$. أوجد $a$.', 'A parabola has its vertex at $(0,\\,-3)$ and passes through $(2,\\,5)$. Find $a$.'), solution: same('$5=4a-3\\ \\to\\ a=2$'), answer: { expected: n(2) } },
            { id: 27, difficulty: 'medium', question: say('$y=x^{2}$ eta $y=4$ grafikoek bi puntutan ebakitzen dute elkar. Zein da handienaren abzisa?', 'Las gráficas de $y=x^{2}$ e $y=4$ se cortan en dos puntos. ¿Cuál es la abscisa del mayor?', 'يتقاطع رسما $y=x^{2}$ و$y=4$ في نقطتين. ما الإحداثي السيني للأكبر؟', 'The graphs of $y=x^{2}$ and $y=4$ meet at two points. What is the x-coordinate of the larger one?'), solution: same('$x^{2}=4\\ \\to\\ x=2,\\ x=-2$'), answer: { expected: n(2) } },
            { id: 28, difficulty: 'hard', question: say('Parabola batek X ardatza $-2$ eta $4$ puntuetan ebakitzen du eta Y ardatza $-16$ puntuan. Kalkulatu $a$.', 'Una parábola corta al eje X en $-2$ y en $4$, y al eje Y en $-16$. Halla $a$.', 'قطع مكافئ يقطع محور X عند $-2$ و$4$ ومحور Y عند $-16$. أوجد $a$.', 'A parabola crosses the x-axis at $-2$ and $4$, and the y-axis at $-16$. Find $a$.'), solution: same('$y=a(x+2)(x-4)\\qquad -16=a\\cdot 2\\cdot(-4)=-8a\\ \\to\\ a=2$'), answer: { expected: n(2) } },
            { id: 29, difficulty: 'hard', question: say('Zenbat puntutan ebakitzen dute elkar $y=x^{2}+1$ eta $y=2x$ grafikoek?', '¿En cuántos puntos se cortan las gráficas de $y=x^{2}+1$ e $y=2x$?', 'في كم نقطة يتقاطع رسما $y=x^{2}+1$ و$y=2x$؟', 'At how many points do the graphs of $y=x^{2}+1$ and $y=2x$ meet?'), solution: say('$x^{2}-2x+1=0$, $\\Delta=4-4=0$: puntu bakarra, $(1,\\,2)$; zuzena ukitzailea da.', '$x^{2}-2x+1=0$, $\\Delta=4-4=0$: un solo punto, $(1,\\,2)$; la recta es tangente.', '$x^{2}-2x+1=0$، $\\Delta=4-4=0$: نقطة واحدة $(1,\\,2)$؛ المستقيم مماس.', '$x^{2}-2x+1=0$, $\\Delta=4-4=0$: one point only, $(1,\\,2)$; the straight line is tangent.'), answer: { expected: n(1) } },
            { id: 30, difficulty: 'hard', question: say('$y=x+5$ zuzenak eta $y=x^{2}-1$ parabolak bi puntutan ebakitzen dute elkar. Zein da ordenaturik handiena?', 'La recta $y=x+5$ y la parábola $y=x^{2}-1$ se cortan en dos puntos. ¿Cuál es la mayor ordenada?', 'يتقاطع المستقيم $y=x+5$ والقطع $y=x^{2}-1$ في نقطتين. ما أكبر إحداثي صادي؟', 'The straight line $y=x+5$ and the parabola $y=x^{2}-1$ meet at two points. What is the larger y-coordinate?'), solution: same('$x^{2}-x-6=0\\ \\to\\ x=3,\\ x=-2\\qquad (3,\\,8),\\ (-2,\\,3)$'), answer: { expected: n(8) } }
        ]
    },
    {
        id: 'absolute',
        title: say('Balio absolutua', 'Valor absoluto', 'القيمة المطلقة', 'Absolute value'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Kalkulatu $|-7|+|3|$.', 'Calcula $|-7|+|3|$.', 'احسب $|-7|+|3|$.', 'Calculate $|-7|+|3|$.'), solution: same('$7+3=10$'), answer: { expected: n(10) } },
            { id: 32, difficulty: 'easy', question: say('$f(x)=|x-4|$ bada, kalkulatu $f(1)$.', 'Si $f(x)=|x-4|$, calcula $f(1)$.', 'إذا كان $f(x)=|x-4|$ فاحسب $f(1)$.', 'If $f(x)=|x-4|$, calculate $f(1)$.'), solution: same('$|1-4|=|-3|=3$'), answer: { expected: n(3) } },
            { id: 33, difficulty: 'easy', question: say('Zein $x$-tan du erpina $y=|x+3|$ funtzioak?', '¿En qué $x$ tiene el pico $y=|x+3|$?', 'عند أي $x$ يقع رأس $y=|x+3|$؟', 'At what $x$ does $y=|x+3|$ have its corner?'), solution: same('$x+3=0\\ \\to\\ x=-3$'), answer: { expected: n(-3) } },
            { id: 34, difficulty: 'medium', question: say('Zein da $|x+2|=5$ ekuazioaren soluzio txikiena?', '¿Cuál es la menor solución de $|x+2|=5$?', 'ما أصغر حل للمعادلة $|x+2|=5$؟', 'What is the smaller solution of $|x+2|=5$?'), solution: same('$x+2=5\\ \\to\\ x=3\\qquad x+2=-5\\ \\to\\ x=-7$'), answer: { expected: n(-7) } },
            { id: 35, difficulty: 'medium', question: say('Idatzi $y=|3x-9|$ zatika.', 'Escribe $y=|3x-9|$ a trozos.', 'اكتب $y=|3x-9|$ على أجزاء.', 'Write $y=|3x-9|$ as a piecewise function.'), solution: say('$3x-9=0$ denean $x=3$: $y=-3x+9$ baldin $x<3$ eta $y=3x-9$ baldin $x\\ge 3$.', '$3x-9=0$ cuando $x=3$: $y=-3x+9$ si $x<3$ e $y=3x-9$ si $x\\ge 3$.', '$3x-9=0$ عند $x=3$: $y=-3x+9$ إذا كان $x<3$ و$y=3x-9$ إذا كان $x\\ge 3$.', '$3x-9=0$ when $x=3$: $y=-3x+9$ if $x<3$ and $y=3x-9$ if $x\\ge 3$.') },
            { id: 36, difficulty: 'medium', question: say('$f(x)=|x^{2}-9|$ bada, kalkulatu $f(-2)$.', 'Si $f(x)=|x^{2}-9|$, calcula $f(-2)$.', 'إذا كان $f(x)=|x^{2}-9|$ فاحسب $f(-2)$.', 'If $f(x)=|x^{2}-9|$, calculate $f(-2)$.'), solution: same('$|4-9|=|-5|=5$'), answer: { expected: n(5) } },
            { id: 37, difficulty: 'medium', question: say('Zein da $y=|x^{2}-9|$ funtzioaren maximo erlatiboaren balioa?', '¿Cuál es el valor del máximo relativo de $y=|x^{2}-9|$?', 'ما قيمة العظمى النسبية لـ $y=|x^{2}-9|$؟', 'What is the value of the local maximum of $y=|x^{2}-9|$?'), solution: say('Barruko erpina $(0,\\,-9)$ da, eta gora islatzen da: $(0,\\,9)$.', 'El vértice de dentro es $(0,\\,-9)$ y se refleja hacia arriba: $(0,\\,9)$.', 'الرأس الداخلي $(0,\\,-9)$ وينعكس إلى الأعلى: $(0,\\,9)$.', 'The vertex inside is $(0,\\,-9)$ and is reflected upwards: $(0,\\,9)$.'), answer: { expected: n(9) } },
            { id: 38, difficulty: 'hard', question: say('Zein da $|2x-1|=x+4$ ekuazioaren soluzio handiena?', '¿Cuál es la mayor solución de $|2x-1|=x+4$?', 'ما أكبر حل للمعادلة $|2x-1|=x+4$؟', 'What is the larger solution of $|2x-1|=x+4$?'), solution: say('$2x-1=x+4$: $x=5$. $2x-1=-x-4$: $x=-1$. Biek betetzen dute ($x+4\\ge 0$).', '$2x-1=x+4$: $x=5$. $2x-1=-x-4$: $x=-1$. Las dos cumplen ($x+4\\ge 0$).', '$2x-1=x+4$: $x=5$. $2x-1=-x-4$: $x=-1$. وكلاهما يحقق ($x+4\\ge 0$).', '$2x-1=x+4$: $x=5$. $2x-1=-x-4$: $x=-1$. Both work ($x+4\\ge 0$).'), answer: { expected: n(5) } },
            { id: 39, difficulty: 'hard', question: say('Zenbat zenbaki osok betetzen dute $|x-1|<3$?', '¿Cuántos números enteros cumplen $|x-1|<3$?', 'كم عددًا صحيحًا يحقق $|x-1|<3$؟', 'How many integers satisfy $|x-1|<3$?'), solution: say('Distantzia 1era 3 baino txikiagoa: $-2<x<4$, hau da, $-1$, 0, 1, 2 eta 3: 5.', 'Distancia a 1 menor que 3: $-2<x<4$, es decir, $-1$, 0, 1, 2 y 3: 5.', 'المسافة عن 1 أقل من 3: $-2<x<4$، أي $-1$ و0 و1 و2 و3: 5.', 'The distance from 1 is less than 3: $-2<x<4$, that is, $-1$, 0, 1, 2 and 3: 5.'), answer: { expected: n(5) } },
            { id: 40, difficulty: 'hard', question: say('Zein da $y=|x^{2}-2x|$ funtzioaren maximo erlatiboaren balioa?', '¿Cuál es el valor del máximo relativo de $y=|x^{2}-2x|$?', 'ما قيمة العظمى النسبية لـ $y=|x^{2}-2x|$؟', 'What is the value of the local maximum of $y=|x^{2}-2x|$?'), solution: same('$x_v=1\\qquad y_v=1-2=-1\\ \\to\\ (1,\\,1)$'), answer: { expected: n(1) } }
        ]
    },
    {
        id: 'rational',
        title: say('Funtzio arrazionalak', 'Funciones racionales', 'الدوال الكسرية', 'Rational functions'),
        items: [
            { id: 41, difficulty: 'easy', question: say('$y=\\frac{k}{x}$ hiperbola $(3,\\,5)$ puntutik pasatzen da. Kalkulatu $k$.', 'La hipérbola $y=\\frac{k}{x}$ pasa por $(3,\\,5)$. Halla $k$.', 'يمر القطع الزائد $y=\\frac{k}{x}$ بـ $(3,\\,5)$. أوجد $k$.', 'The hyperbola $y=\\frac{k}{x}$ passes through $(3,\\,5)$. Find $k$.'), solution: same('$k=3\\cdot 5=15$'), answer: { expected: n(15) } },
            { id: 42, difficulty: 'easy', question: say('$f(x)=\\frac{12}{x}$ bada, kalkulatu $f(4)$.', 'Si $f(x)=\\frac{12}{x}$, calcula $f(4)$.', 'إذا كان $f(x)=\\frac{12}{x}$ فاحسب $f(4)$.', 'If $f(x)=\\frac{12}{x}$, calculate $f(4)$.'), solution: same('$\\frac{12}{4}=3$'), answer: { expected: n(3) } },
            { id: 43, difficulty: 'easy', question: say('Zein dira $y=\\frac{1}{x}$ funtzioaren asintotak?', '¿Cuáles son las asíntotas de $y=\\frac{1}{x}$?', 'ما مقاربا $y=\\frac{1}{x}$؟', 'What are the asymptotes of $y=\\frac{1}{x}$?'), solution: say('Ardatzak: $x=0$ eta $y=0$.', 'Los ejes: $x=0$ e $y=0$.', 'المحوران: $x=0$ و$y=0$.', 'The axes: $x=0$ and $y=0$.') },
            { id: 44, difficulty: 'medium', question: say('Zein da $y=\\frac{5}{x+3}$ funtzioaren asintota bertikala, $x=\\,?$', '¿Cuál es la asíntota vertical de $y=\\frac{5}{x+3}$, $x=\\,?$', 'ما المقارب الرأسي لـ $y=\\frac{5}{x+3}$، $x=\\,?$', 'What is the vertical asymptote of $y=\\frac{5}{x+3}$, $x=\\,?$'), solution: same('$x+3=0\\ \\to\\ x=-3$'), answer: { expected: n(-3) } },
            { id: 45, difficulty: 'medium', question: say('Zein da $y=\\frac{2}{x-1}-4$ funtzioaren asintota horizontala, $y=\\,?$', '¿Cuál es la asíntota horizontal de $y=\\frac{2}{x-1}-4$, $y=\\,?$', 'ما المقارب الأفقي لـ $y=\\frac{2}{x-1}-4$، $y=\\,?$', 'What is the horizontal asymptote of $y=\\frac{2}{x-1}-4$, $y=\\,?$'), solution: say('Kanpoko gaia: $y=-4$.', 'El término de fuera: $y=-4$.', 'الحد الخارجي: $y=-4$.', 'The term outside: $y=-4$.'), answer: { expected: n(-4) } },
            { id: 46, difficulty: 'medium', question: say('Zein da $y=\\frac{6x+1}{2x-4}$ funtzioaren asintota horizontala, $y=\\,?$', '¿Cuál es la asíntota horizontal de $y=\\frac{6x+1}{2x-4}$, $y=\\,?$', 'ما المقارب الأفقي لـ $y=\\frac{6x+1}{2x-4}$، $y=\\,?$', 'What is the horizontal asymptote of $y=\\frac{6x+1}{2x-4}$, $y=\\,?$'), solution: same('$y=\\frac{6}{2}=3$'), answer: { expected: n(3) } },
            { id: 47, difficulty: 'medium', question: say('Auto batek 5 ordu behar ditu bidaia bat egiteko 60 km/h-ko abiaduran. Zenbat ordu beharko lituzke 75 km/h-ra?', 'Un coche tarda 5 horas en un viaje a 60 km/h. ¿Cuántas horas tardaría a 75 km/h?', 'تستغرق سيارة 5 ساعات في رحلة بسرعة 60 كم/س. كم ساعة تستغرق بسرعة 75 كم/س؟', 'A car takes 5 hours for a trip at 60 km/h. How many hours would it take at 75 km/h?'), solution: same('$k=60\\cdot 5=300\\qquad t=\\frac{300}{75}=4$'), answer: { expected: n(4) } },
            { id: 48, difficulty: 'hard', question: say('Zein abzisatan ebakitzen du $y=\\frac{x+5}{x+1}$ funtzioak X ardatza?', '¿En qué abscisa corta $y=\\frac{x+5}{x+1}$ al eje X?', 'عند أي إحداثي سيني يقطع $y=\\frac{x+5}{x+1}$ محور X؟', 'At what x-coordinate does $y=\\frac{x+5}{x+1}$ cross the x-axis?'), solution: say('Zenbakitzailea 0: $x+5=0$, $x=-5$.', 'Numerador 0: $x+5=0$, $x=-5$.', 'البسط 0: $x+5=0$، $x=-5$.', 'Numerator 0: $x+5=0$, $x=-5$.'), answer: { expected: n(-5) } },
            { id: 49, difficulty: 'hard', question: say('Zein puntutan ebakitzen du $y=\\frac{3}{x-2}+1$ funtzioak Y ardatza? Idatzi ordenatua.', '¿En qué punto corta $y=\\frac{3}{x-2}+1$ al eje Y? Escribe la ordenada.', 'في أي نقطة يقطع $y=\\frac{3}{x-2}+1$ محور Y؟ اكتب الإحداثي الصادي.', 'At what point does $y=\\frac{3}{x-2}+1$ cross the y-axis? Write the y-coordinate.'), solution: same('$f(0)=\\frac{3}{-2}+1=-\\frac{1}{2}$'), answer: { expected: fraction(-1, 2) } },
            { id: 50, difficulty: 'hard', question: say('$y=\\frac{3x+5}{x+1}$ idatzi $y=\\frac{k}{x+1}+3$ forman. Zenbat da $k$?', 'Escribe $y=\\frac{3x+5}{x+1}$ como $y=\\frac{k}{x+1}+3$. ¿Cuánto vale $k$?', 'اكتب $y=\\frac{3x+5}{x+1}$ على صورة $y=\\frac{k}{x+1}+3$. كم قيمة $k$؟', 'Write $y=\\frac{3x+5}{x+1}$ as $y=\\frac{k}{x+1}+3$. What is $k$?'), solution: same('$3x+5=3(x+1)+2\\ \\to\\ y=3+\\frac{2}{x+1}$'), answer: { expected: n(2) } }
        ]
    }
]

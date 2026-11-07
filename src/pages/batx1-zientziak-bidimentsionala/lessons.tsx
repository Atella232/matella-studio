import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { CorrelationFigure } from '../dbh4-aplikatuak-estatistika/figures'
import { CalcTableFigure, ConditionalFigure, CovarianceTableFigure, DependenceFigure, DoubleTableFigure, EstimationFigure, GroupedPairsFigure, IndependenceFigure, MarginalFigure, QuadrantsFigure, RegressionLineFigure, TwoLinesFigure, UnitsFigure } from './figures'
import { bivarLessonChecks, type BivarTopicId } from './lessonChecks'
import { bivarLessonTexts } from './lessonTexts'

/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Zientziak — stages and
   lessons. The order follows unit 14 of Santillana 1.º Bachillerato
   Ciencias; unit 13 of Anaya Matemáticas I adds functional against
   statistical relation, changing the units, the angle of the two lines and
   whether a pair of lines is possible. 4. DBH already showed the cloud, r
   and a regression line with its slope given («Review first» links); the
   double-entry table with marginals, conditionals and independence, the
   covariance, r worked out, the two lines and grouped pairs are new. All
   the exercises and numbers are our own.
   ========================================================================== */

export type BivarStageId = 'tables' | 'cloud' | 'parameters' | 'regression' | 'problems'

export const bivarStages: UnitStage[] = [
    { id: 'tables', tone: 'blue', title: { eu: 'Sarrera bikoitzeko taulak', es: 'Tablas de doble entrada', en: 'Two-way tables', ar: 'الجداول مزدوجة المدخل' } },
    { id: 'cloud', tone: 'violet', title: { eu: 'Puntu-hodeia', es: 'La nube de puntos', en: 'The scatter plot', ar: 'سحابة النقاط' } },
    { id: 'parameters', tone: 'mustard', title: { eu: 'Kobariantza eta korrelazioa', es: 'Covarianza y correlación', en: 'Covariance and correlation', ar: 'التغاير والارتباط' } },
    { id: 'regression', tone: 'coral', title: { eu: 'Erregresio-zuzenak', es: 'Rectas de regresión', en: 'Regression lines', ar: 'مستقيمات الانحدار' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problema osoak', es: 'Problemas completos', en: 'Full problems', ar: 'مسائل كاملة' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const need = {
    frequencies: { unit: 'dbh4-akademikoak/estadistica', topic: 'frequencies', title: { eu: 'Maiztasun-taulak', es: 'Tablas de frecuencias', en: 'Frequency tables', ar: 'جداول التكرارات' } },
    mean: { unit: 'dbh4-akademikoak/estadistica', topic: 'mean', title: { eu: 'Batez bestekoa eta haztatua', es: 'Media y media ponderada', en: 'Mean and weighted mean', ar: 'المتوسط والمتوسط المرجّح' } },
    contingency: { unit: 'dbh4-aplikatuak/estadistica-probabilidad', topic: 'contingency', title: { eu: 'Kontingentzia-taulak', es: 'Tablas de contingencia', en: 'Contingency tables', ar: 'جداول التوافق' } },
    scatter: { unit: 'dbh4-akademikoak/estadistica', topic: 'scatter', title: { eu: 'Puntu-hodeiak', es: 'Nubes de puntos', en: 'Scatter plots', ar: 'سحب النقاط' } },
    correlation: { unit: 'dbh4-akademikoak/estadistica', topic: 'correlation', title: { eu: 'Korrelazioa eta r', es: 'Correlación y r', en: 'Correlation and r', ar: 'الارتباط وr' } },
    regression: { unit: 'dbh4-akademikoak/estadistica', topic: 'regression', title: { eu: 'Erregresio-zuzena', es: 'Recta de regresión', en: 'Regression line', ar: 'مستقيم الانحدار' } },
    variance: { unit: 'dbh4-akademikoak/estadistica', topic: 'variance', title: { eu: 'Bariantza eta desbideratze tipikoa', es: 'Varianza y desviación típica', en: 'Variance and standard deviation', ar: 'التباين والانحراف المعياري' } },
    grouped: { unit: 'dbh4-akademikoak/estadistica', topic: 'grouped-centre', title: { eu: 'Datu multzokatuen parametroak', es: 'Parámetros de datos agrupados', en: 'Measures for grouped data', ar: 'مقاييس البيانات المبوّبة' } },
    transform: { unit: 'batx1-zientziak/estadistica', topic: 'transform-data', title: { eu: 'Datuak aldatzea', es: 'Transformar los datos', en: 'Transforming the data', ar: 'تحويل البيانات' } }
}

/** Pairs written as formulas, so that Arabic keeps them left to right */
const pairsOf = (list: Array<[number, number]>, and: string) => {
    const written = list.map(([a, b]) => `$(${a},\\,${b})$`)
    return `${written.slice(0, -1).join(', ')} ${and} ${written[written.length - 1]}`
}
const FAMILIES: Array<[number, number]> = [[1, 0], [2, 1], [1, 1], [3, 2], [2, 1], [2, 0], [1, 0], [3, 1], [2, 1], [3, 2]]
const familyList = { eu: pairsOf(FAMILIES, 'eta'), es: pairsOf(FAMILIES, 'y'), en: pairsOf(FAMILIES, 'and'), ar: FAMILIES.map(([a, b]) => `$(${a},\\,${b})$`).join('، ') }

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Two-way tables ---------- */
    {
        id: 'two-variables',
        stage: 'tables',
        figureAfterSteps: true,
        title: say('Aldagai bidimentsionalak', 'Variables bidimensionales', 'المتغيرات ثنائية البعد', 'Two-variable data'),
        goal: say('Bi aldagaiko datuak bikote gisa ikustea eta sarrera bikoitzeko taula batean antolatzea.', 'Ver los datos de dos variables como pares y ordenarlos en una tabla de doble entrada.', 'رؤية بيانات متغيرين أزواجًا وترتيبها في جدول مزدوج المدخل.', 'See data on two variables as pairs and arrange them in a two-way table.'),
        needs: [need.frequencies],
        problem: say(
            `10 familiari seme-alaba kopurua (X) eta etxeko animalia kopurua (Y) galdetu zaie: ${familyList.eu}. Antolatu sarrera bikoitzeko taula batean. Zein da $(2,\\,1)$ bikotearen maiztasuna?`,
            `A 10 familias se les pregunta el número de hijos (X) y de mascotas (Y): ${familyList.es}. Ordénalo en una tabla de doble entrada. ¿Qué frecuencia tiene el par $(2,\\,1)$?`,
            `سُئلت 10 أسر عن عدد الأبناء (X) وعدد الحيوانات الأليفة (Y): ${familyList.ar}. رتّبها في جدول مزدوج المدخل. ما تكرار الزوج $(2,\\,1)$؟`,
            `10 families are asked their number of children (X) and of pets (Y): ${familyList.en}. Arrange them in a two-way table. What is the frequency of the pair $(2,\\,1)$?`
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Familia bakoitza bikote bat da: X errenkadetan eta Y zutabeetan.', 'Cada familia es un par: X en las filas e Y en las columnas.', 'كل أسرة زوج: X في الأسطر وY في الأعمدة.', 'Each family is a pair: X in the rows and Y in the columns.'), math: same('$X\\in\\{1,\\ 2,\\ 3\\}\\qquad Y\\in\\{0,\\ 1,\\ 2\\}$') },
            { text: say('Bikote bakoitza zenbat aldiz agertzen den zenbatzen da.', 'Se cuenta cuántas veces sale cada par.', 'نعدّ كم مرة يظهر كل زوج.', 'Count how many times each pair appears.'), math: same('$(2,\\,1)\\ \\to\\ 3$') },
            { text: say('Gelaxka guztiek batera N ematen dute.', 'Todas las casillas juntas suman N.', 'مجموع كل الخانات N.', 'All the cells together add up to N.'), math: same('$2+1+1+3+1+2=10$') }
        ],
        takeaway: say(
            'Aldagai bidimentsional batek $(x,y)$ bikote bat ematen du banako bakoitzeko. Sarrera bikoitzeko taulan, gelaxka bakoitza bikote baten $f_{ij}$ maiztasuna da, eta denek batera $N$ ematen dute.',
            'Una variable bidimensional da un par $(x,y)$ por individuo. En la tabla de doble entrada, cada casilla es la frecuencia $f_{ij}$ de un par, y todas juntas suman $N$.',
            'يعطي المتغير ثنائي البعد زوجًا $(x,y)$ لكل فرد. وفي الجدول مزدوج المدخل كل خانة هي تكرار $f_{ij}$ لزوج، ومجموع الخانات كلها $N$.',
            'A two-variable data set gives a pair $(x,y)$ for each individual. In the two-way table each cell is the frequency $f_{ij}$ of a pair, and together they add up to $N$.'
        ),
        figure: (language) => <DoubleTableFigure language={language} />
    },
    {
        id: 'marginal',
        stage: 'tables',
        figureAfterSteps: true,
        title: say('Banaketa marjinalak', 'Distribuciones marginales', 'التوزيعات الهامشية', 'Marginal distributions'),
        goal: say('Sarrera bikoitzeko taula baten marjinetan aldagai bakoitzaren banaketa irakurtzea eta haren batez bestekoa kalkulatzea.', 'Leer en los márgenes de una tabla de doble entrada la distribución de cada variable sola y calcular su media.', 'قراءة توزيع كل متغير وحده في هوامش جدول مزدوج المدخل وحساب متوسطه.', 'Read in the margins of a two-way table the distribution of each variable on its own, and work out its mean.'),
        needs: [need.mean],
        problem: say(
            '20 ikasleri anai-arreba kopurua (X: 0, 1, 2) eta etxeko animalia kopurua (Y: 0, 1) galdetu zaie. Errenkadak: $X=0$, 4 eta 2; $X=1$, 3 eta 5; $X=2$, 1 eta 5. Kalkulatu banaketa marjinalak, $\\bar{x}$ eta $\\bar{y}$.',
            'A 20 alumnos se les pregunta el número de hermanos (X: 0, 1, 2) y de mascotas (Y: 0, 1). Filas: $X=0$, 4 y 2; $X=1$, 3 y 5; $X=2$, 1 y 5. Halla las distribuciones marginales, $\\bar{x}$ e $\\bar{y}$.',
            'سُئل 20 تلميذًا عن عدد الإخوة (X: 0، 1، 2) وعدد الحيوانات الأليفة (Y: 0، 1). الأسطر: $X=0$، 4 و2؛ $X=1$، 3 و5؛ $X=2$، 1 و5. أوجد التوزيعين الهامشيين و$\\bar{x}$ و$\\bar{y}$.',
            '20 students are asked their number of siblings (X: 0, 1, 2) and of pets (Y: 0, 1). Rows: $X=0$, 4 and 2; $X=1$, 3 and 5; $X=2$, 1 and 5. Find the marginal distributions, $\\bar{x}$ and $\\bar{y}$.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('X-ren marjinala: errenkada bakoitza batzen da.', 'Marginal de X: se suma cada fila.', 'هامشي X: نجمع كل سطر.', 'Marginal of X: add each row.'), math: same('$4+2=6\\qquad 3+5=8\\qquad 1+5=6$') },
            { text: say('X-ren batez bestekoa, guztizko horiekin.', 'La media de X, con esos totales.', 'متوسط X بتلك المجاميع.', 'The mean of X, with those totals.'), math: same('$\\bar{x}=\\frac{0\\cdot 6+1\\cdot 8+2\\cdot 6}{20}=1$') },
            { text: say('Y-ren marjinala: zutabeak batzen dira, 8 eta 12.', 'Marginal de Y: se suman las columnas, 8 y 12.', 'هامشي Y: نجمع العمودين، 8 و12.', 'Marginal of Y: add the columns, 8 and 12.'), math: same('$\\bar{y}=\\frac{0\\cdot 8+1\\cdot 12}{20}=0{,}6$') }
        ],
        takeaway: say(
            'Banaketa marjinalak errenkaden guztizkoak (X-rena) eta zutabeenak (Y-rena) dira. Haiekin $\\bar{x}$, $\\sigma_x$, $\\bar{y}$ eta $\\sigma_y$ aldagai bakarrean bezala kalkulatzen dira.',
            'Las marginales son los totales de las filas (la de X) y de las columnas (la de Y). Con ellas se calculan $\\bar{x}$, $\\sigma_x$, $\\bar{y}$ y $\\sigma_y$ como con una sola variable.',
            'التوزيعان الهامشيان هما مجاميع الأسطر (توزيع X) ومجاميع الأعمدة (توزيع Y). وبهما نحسب $\\bar{x}$ و$\\sigma_x$ و$\\bar{y}$ و$\\sigma_y$ كما في متغير واحد.',
            'The marginals are the row totals (that of X) and the column totals (that of Y). With them you work out $\\bar{x}$, $\\sigma_x$, $\\bar{y}$ and $\\sigma_y$ as with a single variable.'
        ),
        figure: (language) => <MarginalFigure language={language} />
    },
    {
        id: 'conditional',
        stage: 'tables',
        figureAfterSteps: true,
        title: say('Banaketa baldintzatuak', 'Distribuciones condicionadas', 'التوزيعات الشرطية', 'Conditional distributions'),
        goal: say('Aldagai baten banaketa lortzea bestearen balio bat finko dagoenean, maiztasun erlatiboekin, eta errenkadak konparatzea.', 'Obtener la distribución de una variable cuando la otra tiene un valor fijo, con frecuencias relativas, y comparar las filas.', 'الحصول على توزيع متغير عندما تكون للآخر قيمة ثابتة، بالتكرارات النسبية، ومقارنة الأسطر.', 'Get the distribution of one variable when the other has a fixed value, with relative frequencies, and compare the rows.'),
        needs: [need.contingency],
        problem: say(
            'Ikasle 50 daude. Kirola egiten dutenak 30 dira: 24 gainditu dute eta 6 ez. Kirolik egiten ez dutenak 20 dira: 10 gainditu dute eta 10 ez. Zein da emaitzaren banaketa, kirola egitea baldintzatuta? Eta kirolik ez egitea baldintzatuta?',
            'De 50 alumnos, 30 hacen deporte: 24 aprueban y 6 suspenden. Los otros 20 no hacen deporte: 10 aprueban y 10 suspenden. ¿Cuál es la distribución de la nota condicionada a hacer deporte? ¿Y a no hacerlo?',
            'من 50 تلميذًا، يمارس 30 الرياضة: ينجح 24 ويرسب 6. والعشرون الآخرون لا يمارسونها: ينجح 10 ويرسب 10. ما توزيع النتيجة المشروط بممارسة الرياضة؟ والمشروط بعدم ممارستها؟',
            'Of 50 students, 30 do sport: 24 pass and 6 fail. The other 20 do no sport: 10 pass and 10 fail. What is the distribution of the result given that a student does sport? And given that they do not?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Baldintza: kirola egitea. Haren errenkada bakarrik hartzen da, 30 guztira.', 'Condición: hacer deporte. Solo cuenta su fila, de total 30.', 'الشرط: ممارسة الرياضة. لا يُحسب إلا سطرها، ومجموعه 30.', 'Condition: doing sport. Only its row counts, with a total of 30.'), math: same('$\\frac{24}{30}=0{,}8\\qquad\\frac{6}{30}=0{,}2$') },
            { text: say('Baldintza: kirolik ez egitea; 20 guztira.', 'Condición: no hacer deporte; total 20.', 'الشرط: عدم ممارسة الرياضة؛ المجموع 20.', 'Condition: doing no sport; total 20.'), math: same('$\\frac{10}{20}=0{,}5\\qquad\\frac{10}{20}=0{,}5$') },
            { text: say('Bi banaketa baldintzatuak desberdinak dira: gainditzea kirolaren mende dago.', 'Las dos condicionadas son distintas: aprobar depende de hacer deporte.', 'التوزيعان الشرطيان مختلفان: النجاح مرتبط بممارسة الرياضة.', 'The two conditionals are different: passing depends on doing sport.') }
        ],
        takeaway: say(
            'Y-ren banaketa, $X=a$ baldintzatuta, $a$ balioaren errenkada da, errenkada horren guztizkoaz zatituta. Banaketa baldintzatuak errenkada batetik bestera aldatzen badira, aldagaiak erlazionatuta daude.',
            'La distribución de Y condicionada a $X=a$ es la fila de $a$ dividida entre el total de esa fila. Si las condicionadas cambian de una fila a otra, las variables están relacionadas.',
            'توزيع Y المشروط بـ $X=a$ هو سطر $a$ مقسومًا على مجموع ذلك السطر. وإذا تغيّرت التوزيعات الشرطية من سطر إلى آخر فالمتغيران مرتبطان.',
            'The distribution of Y given $X=a$ is the row of $a$ divided by the total of that row. If the conditionals change from one row to another, the variables are related.'
        ),
        figure: (language) => <ConditionalFigure language={language} />
    },
    {
        id: 'independence',
        stage: 'tables',
        figureAfterSteps: true,
        title: say('Independentzia', 'Independencia', 'الاستقلال', 'Independence'),
        goal: say('Bi aldagai independenteak diren erabakitzea, errenkada proportzionalekin, eta taula bat osatzea independenteak izan daitezen.', 'Decidir si dos variables son independientes, con filas proporcionales, y completar una tabla para que lo sean.', 'تقرير ما إذا كان متغيران مستقلين، بأسطر متناسبة، وإكمال جدول ليكونا كذلك.', 'Decide whether two variables are independent, with proportional rows, and complete a table so that they are.'),
        problem: say(
            '2 × 2 taula batean, errenkaden guztizkoak 30 eta 20 dira, eta zutabeenak 20 eta 30 ($N=50$). Osatu taula, X eta Y independenteak izan daitezen.',
            'En una tabla de 2 × 2, los totales de las filas son 30 y 20, y los de las columnas, 20 y 30 ($N=50$). Complétala para que X e Y sean independientes.',
            'في جدول 2 × 2 مجموعا السطرين 30 و20، ومجموعا العمودين 20 و30 ($N=50$). أكمله ليكون X وY مستقلين.',
            'In a 2 × 2 table the row totals are 30 and 20, and the column totals 20 and 30 ($N=50$). Complete it so that X and Y are independent.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Independenteak badira, gelaxka bakoitza bere errenkadaren guztizkoa bider bere zutabearena da, zati N.', 'Si son independientes, cada casilla es el total de su fila por el de su columna, entre N.', 'إذا كانا مستقلين فكل خانة هي مجموع سطرها في مجموع عمودها، مقسومًا على N.', 'If they are independent, each cell is its row total times its column total, divided by N.'), math: same('$\\frac{30\\cdot 20}{50}=12$') },
            { text: say('Besteak guztizkoetatik kenduz ateratzen dira.', 'Las demás salen restando de los totales.', 'وتخرج الخانات الأخرى بالطرح من المجاميع.', 'The others come from subtracting from the totals.'), math: same('$30-12=18\\qquad 20-12=8\\qquad 20-8=12$') },
            { text: say('Errenkadak proportzionalak dira: bi banaketa baldintzatuak berdinak.', 'Las filas son proporcionales: las dos condicionadas coinciden.', 'الأسطر متناسبة: التوزيعان الشرطيان متساويان.', 'The rows are proportional: the two conditionals are the same.'), math: same('$\\frac{12}{30}=\\frac{8}{20}=0{,}4$') }
        ],
        takeaway: say(
            'X eta Y independenteak dira banaketa baldintzatu guztiak berdinak badira, hau da, errenkadak proportzionalak badira. Orduan gelaxka bakoitza errenkadaren guztizkoa bider zutabearena da, zati N.',
            'X e Y son independientes si todas las condicionadas son iguales, es decir, si las filas son proporcionales. Entonces cada casilla es el total de la fila por el de la columna, entre N.',
            'يكون X وY مستقلين إذا تساوت كل التوزيعات الشرطية، أي إذا كانت الأسطر متناسبة. وعندئذ تكون كل خانة مجموع السطر في مجموع العمود، مقسومًا على N.',
            'X and Y are independent if all the conditionals are equal, that is, if the rows are proportional. Then each cell is the row total times the column total, divided by N.'
        ),
        figure: (language) => <IndependenceFigure language={language} />
    },

    /* ---------- 2. The scatter plot ---------- */
    {
        id: 'scatter-dependence',
        stage: 'cloud',
        title: say('Puntu-hodeia eta mendekotasuna', 'Nube de puntos y dependencia', 'سحابة النقاط ونوع العلاقة', 'Scatter plot and dependence'),
        goal: say('Puntu-hodei batean erlazioa funtzionala ala estatistikoa den irakurtzea, eta mendekotasuna sendoa ala ahula, positiboa ala negatiboa den.', 'Leer en una nube de puntos si la relación es funcional o estadística, y si la dependencia es fuerte o débil, positiva o negativa.', 'قراءة سحابة نقاط لمعرفة هل العلاقة دالية أم إحصائية، وهل الارتباط قوي أم ضعيف، موجب أم سالب.', 'Read in a scatter plot whether the relation is functional or statistical, and whether the dependence is strong or weak, positive or negative.'),
        needs: [need.scatter],
        problem: say(
            'Hiru hodei daude. A hodeian, puntuak kurba baten gainean daude; B hodeian, beherantz doan zuzen baten inguruan, oso hurbil; C hodeian, formarik gabe. Zer erlazio erakusten du bakoitzak?',
            'Hay tres nubes. En A, los puntos están sobre una curva; en B, alrededor de una recta que baja, muy juntos; en C, sin forma. ¿Qué relación muestra cada una?',
            'هناك ثلاث سحب. في A النقاط على منحنى؛ وفي B حول مستقيم هابط ومتقاربة جدًّا؛ وفي C بلا شكل. ما العلاقة التي تُظهرها كل واحدة؟',
            'There are three clouds. In A the points lie on a curve; in B, around a falling straight line, very close together; in C, with no shape. What relation does each one show?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('A: puntuak lerro baten gainean; x bakoitzak y bakarra du: erlazio funtzionala.', 'A: los puntos están sobre una línea; cada x tiene una sola y: relación funcional.', 'A: النقاط على خط، ولكل x قيمة y واحدة: علاقة دالية.', 'A: the points lie on a line; each x has a single y: a functional relation.') },
            { text: say('B: beherantz doan zuzen baten inguruan, oso hurbil: mendekotasun sendoa eta negatiboa.', 'B: alrededor de una recta que baja, muy pegados: dependencia fuerte y negativa.', 'B: حول مستقيم هابط ومتلاصقة: ارتباط قوي وسالب.', 'B: around a falling line, very close: strong, negative dependence.') },
            { text: say('C: formarik gabe: ez dago mendekotasun linealik.', 'C: sin forma: no hay dependencia lineal.', 'C: بلا شكل: لا يوجد ارتباط خطي.', 'C: no shape: there is no linear dependence.') }
        ],
        takeaway: say(
            'Funtzionala: puntuak lerroaren gainean. Estatistikoa: haren inguruan. Zenbat eta hurbilago zuzenetik, orduan eta sendoagoa; zuzenak gora egiten badu, positiboa; behera, negatiboa.',
            'Funcional: los puntos sobre la línea. Estadística: alrededor de ella. Cuanto más pegados a una recta, más fuerte; si la recta sube, positiva; si baja, negativa.',
            'دالية: النقاط على الخط. إحصائية: حوله. وكلما التصقت بمستقيم كان الارتباط أقوى؛ موجبًا إذا صعد المستقيم، وسالبًا إذا هبط.',
            'Functional: the points on the line. Statistical: around it. The closer to a straight line, the stronger; if the line rises, positive; if it falls, negative.'
        ),
        figure: (language) => <DependenceFigure language={language} />
    },
    {
        id: 'quadrants',
        stage: 'cloud',
        figureAfterSteps: true,
        title: say('Grabitate-zentroa eta koadranteak', 'El centro de gravedad y los cuadrantes', 'مركز الثقل والأرباع', 'The centre of gravity and the quadrants'),
        goal: say('$(\\bar{x},\\bar{y})$ puntuarekin hodeia lau koadrantetan banatzea eta $(x-\\bar{x})(y-\\bar{y})$ biderkaduretan mendekotasunaren zeinua irakurtzea.', 'Partir la nube en cuatro cuadrantes con el punto $(\\bar{x},\\bar{y})$ y leer el signo de la dependencia en los productos $(x-\\bar{x})(y-\\bar{y})$.', 'تقسيم السحابة إلى أربعة أرباع بالنقطة $(\\bar{x},\\bar{y})$، وقراءة إشارة الارتباط في الجداءات $(x-\\bar{x})(y-\\bar{y})$.', 'Split the cloud into four quadrants with the point $(\\bar{x},\\bar{y})$ and read the sign of the dependence in the products $(x-\\bar{x})(y-\\bar{y})$.'),
        problem: say(
            'Puntuak: $(1,\\,2)$, $(2,\\,3)$, $(3,\\,3)$, $(4,\\,5)$ eta $(5,\\,7)$. Aurkitu grabitate-zentroa eta $(x-\\bar{x})(y-\\bar{y})$ biderkadura bakoitzaren zeinua.',
            'Puntos: $(1,\\,2)$, $(2,\\,3)$, $(3,\\,3)$, $(4,\\,5)$ y $(5,\\,7)$. Halla el centro de gravedad y el signo de cada producto $(x-\\bar{x})(y-\\bar{y})$.',
            'النقاط: $(1,\\,2)$ و$(2,\\,3)$ و$(3,\\,3)$ و$(4,\\,5)$ و$(5,\\,7)$. أوجد مركز الثقل وإشارة كل جداء $(x-\\bar{x})(y-\\bar{y})$.',
            'Points: $(1,\\,2)$, $(2,\\,3)$, $(3,\\,3)$, $(4,\\,5)$ and $(5,\\,7)$. Find the centre of gravity and the sign of each product $(x-\\bar{x})(y-\\bar{y})$.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Grabitate-zentroa: bi batez bestekoak.', 'Centro de gravedad: las dos medias.', 'مركز الثقل: المتوسطان.', 'Centre of gravity: the two means.'), math: same('$\\bar{x}=\\frac{15}{5}=3\\qquad\\bar{y}=\\frac{20}{5}=4$') },
            { text: say('Behean ezkerrean eta goian eskuinean dauden puntuek biderkadura positiboa ematen dute.', 'Los puntos de abajo a la izquierda y de arriba a la derecha dan productos positivos.', 'النقاط في الأسفل يسارًا وفي الأعلى يمينًا تعطي جداءات موجبة.', 'The points down on the left and up on the right give positive products.'), math: same('$(1-3)(2-4)=4\\qquad(5-3)(7-4)=6$') },
            { text: say('Batura positiboa da: mendekotasun positiboa.', 'La suma es positiva: dependencia positiva.', 'المجموع موجب: ارتباط موجب.', 'The sum is positive: positive dependence.'), math: same('$4+1+0+1+6=12$') }
        ],
        takeaway: say(
            '$(\\bar{x},\\bar{y})$ puntuak hodeia lau koadrantetan banatzen du. I eta III koadranteetan $(x-\\bar{x})(y-\\bar{y})$ positiboa da, eta II eta IV koadranteetan, negatiboa. Lehenengo biek gehiago pisatzen badute, mendekotasuna positiboa da.',
            '$(\\bar{x},\\bar{y})$ parte la nube en cuatro cuadrantes. En el I y el III, $(x-\\bar{x})(y-\\bar{y})$ es positivo; en el II y el IV, negativo. Si pesan más el I y el III, la dependencia es positiva.',
            'تقسم النقطة $(\\bar{x},\\bar{y})$ السحابة إلى أربعة أرباع. في الربعين I وIII يكون $(x-\\bar{x})(y-\\bar{y})$ موجبًا، وفي II وIV سالبًا. وإذا رجح I وIII كان الارتباط موجبًا.',
            '$(\\bar{x},\\bar{y})$ splits the cloud into four quadrants. In I and III, $(x-\\bar{x})(y-\\bar{y})$ is positive; in II and IV, negative. If I and III weigh more, the dependence is positive.'
        ),
        figure: (language) => <QuadrantsFigure language={language} />
    },

    /* ---------- 3. Covariance and correlation ---------- */
    {
        id: 'covariance',
        stage: 'parameters',
        figureAfterSteps: true,
        title: say('Kobariantza', 'La covarianza', 'التغاير', 'Covariance'),
        goal: say('$\\sigma_{xy}$ kobariantza kalkulatzea eta haren zeinua interpretatzea.', 'Calcular la covarianza $\\sigma_{xy}$ e interpretar su signo.', 'حساب التغاير $\\sigma_{xy}$ وتفسير إشارته.', 'Work out the covariance $\\sigma_{xy}$ and read its sign.'),
        needs: [need.variance],
        problem: say(
            '5 ikasleren ikasketa-orduak (x) eta nota (y): $(1,\\,2)$, $(2,\\,3)$, $(3,\\,5)$, $(4,\\,4)$ eta $(5,\\,6)$. Kalkulatu kobariantza.',
            'Horas de estudio (x) y nota (y) de 5 alumnos: $(1,\\,2)$, $(2,\\,3)$, $(3,\\,5)$, $(4,\\,4)$ y $(5,\\,6)$. Calcula la covarianza.',
            'ساعات الدراسة (x) والعلامة (y) لخمسة تلاميذ: $(1,\\,2)$ و$(2,\\,3)$ و$(3,\\,5)$ و$(4,\\,4)$ و$(5,\\,6)$. احسب التغاير.',
            'Study hours (x) and mark (y) of 5 students: $(1,\\,2)$, $(2,\\,3)$, $(3,\\,5)$, $(4,\\,4)$ and $(5,\\,6)$. Work out the covariance.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Batez bestekoak.', 'Las medias.', 'المتوسطان.', 'The means.'), math: same('$\\begin{gathered}\\bar{x}=\\frac{1+2+3+4+5}{5}=3\\\\ \\bar{y}=\\frac{2+3+5+4+6}{5}=4\\end{gathered}$') },
            { text: say('$x\\cdot y$ biderkaduren batez bestekoa.', 'La media de los productos $x\\cdot y$.', 'متوسط الجداءات $x\\cdot y$.', 'The mean of the products $x\\cdot y$.'), math: same('$\\frac{2+6+15+16+30}{5}=\\frac{69}{5}=13{,}8$') },
            { text: say('Batez bestekoen biderkadura kentzen da.', 'Se resta el producto de las medias.', 'نطرح جداء المتوسطين.', 'Subtract the product of the means.'), math: same('$\\sigma_{xy}=13{,}8-3\\cdot 4=1{,}8$') }
        ],
        takeaway: say(
            '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$. Positiboa: hodeiak gora egiten du; negatiboa: behera; 0 ingurukoa: ez dago mendekotasun linealik.',
            '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$. Positiva: la nube sube; negativa: baja; cerca de 0: no hay dependencia lineal.',
            '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$. موجب: السحابة تصعد؛ سالب: تهبط؛ قريب من 0: لا يوجد ارتباط خطي.',
            '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$. Positive: the cloud rises; negative: it falls; close to 0: there is no linear dependence.'
        ),
        figure: (language) => <CovarianceTableFigure language={language} />
    },
    {
        id: 'correlation-coefficient',
        stage: 'parameters',
        title: say('Korrelazio-koefizientea', 'El coeficiente de correlación', 'معامل الارتباط', 'The correlation coefficient'),
        goal: say('$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$ kalkulatzea eta harekin mendekotasun linealaren indarra eta zeinua irakurtzea.', 'Calcular $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$ y leer con él la fuerza y el signo de la dependencia lineal.', 'حساب $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$ وقراءة قوة الارتباط الخطي وإشارته به.', 'Work out $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$ and read from it the strength and the sign of the linear dependence.'),
        needs: [need.correlation],
        problem: say(
            'Hodei batek $\\sigma_{xy}=2{,}4$, $\\sigma_x=1{,}5$ eta $\\sigma_y=2$ ditu. Kalkulatu r eta interpretatu.',
            'Una nube tiene $\\sigma_{xy}=2{,}4$, $\\sigma_x=1{,}5$ y $\\sigma_y=2$. Calcula r e interprétalo.',
            'لسحابة $\\sigma_{xy}=2{,}4$ و$\\sigma_x=1{,}5$ و$\\sigma_y=2$. احسب r وفسّره.',
            'A cloud has $\\sigma_{xy}=2{,}4$, $\\sigma_x=1{,}5$ and $\\sigma_y=2$. Work out r and interpret it.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Desbideratze tipikoen biderkadura.', 'El producto de las desviaciones típicas.', 'جداء الانحرافين المعياريين.', 'The product of the standard deviations.'), math: same('$1{,}5\\cdot 2=3$') },
            { text: say('Kobariantza harekin zatitzen da.', 'Se divide la covarianza entre él.', 'نقسم التغاير عليه.', 'Divide the covariance by it.'), math: same('$r=\\frac{2{,}4}{3}=0{,}8$') },
            { text: say('Positiboa eta 1 zenbakitik hurbil: mendekotasun sendoa eta positiboa.', 'Positivo y cerca de 1: dependencia fuerte y positiva.', 'موجب وقريب من 1: ارتباط قوي وموجب.', 'Positive and close to 1: strong, positive dependence.') }
        ],
        takeaway: say(
            'r beti −1 eta 1 artean dago. Haren zeinua $\\sigma_{xy}$ kobariantzarena da; ±1 zenbakitik zenbat eta hurbilago, orduan eta sendoagoa mendekotasuna; 0 inguruan, ia ez dago mendekotasun linealik.',
            'r siempre está entre −1 y 1. Su signo es el de $\\sigma_{xy}$; cuanto más cerca de ±1, más fuerte la dependencia; cerca de 0, casi no hay dependencia lineal.',
            'يقع r دائمًا بين −1 و1. وإشارته إشارة $\\sigma_{xy}$؛ وكلما اقترب من ±1 قوي الارتباط؛ وقرب 0 يكاد لا يوجد ارتباط خطي.',
            'r is always between −1 and 1. Its sign is that of $\\sigma_{xy}$; the closer to ±1, the stronger the dependence; close to 0, there is hardly any linear dependence.'
        ),
        figure: (language) => <CorrelationFigure language={language} />
    },
    {
        id: 'units-change',
        stage: 'parameters',
        title: say('Unitate-aldaketa', 'Cambio de unidades', 'تغيير الوحدات', 'Changing the units'),
        goal: say('Jakitea zer gertatzen zaien batez bestekoei, desbideratzeei, kobariantzari eta r koefizienteari datuen unitateak aldatzean.', 'Saber qué les pasa a las medias, las desviaciones, la covarianza y r cuando cambian las unidades de los datos.', 'معرفة ما يحدث للمتوسطين والانحرافين والتغاير وr عند تغيير وحدات البيانات.', 'Know what happens to the means, the deviations, the covariance and r when the units of the data change.'),
        needs: [need.transform],
        problem: say(
            'Altuera (x) metrotan eta pisua (y) kilotan: $\\sigma_x=0{,}1$, $\\sigma_y=8$ eta $\\sigma_{xy}=0{,}48$. Altuera zentimetrotan emanez gero, zenbat dira $\\sigma_x$, $\\sigma_{xy}$ eta r?',
            'Estatura (x) en metros y peso (y) en kilos: $\\sigma_x=0{,}1$, $\\sigma_y=8$ y $\\sigma_{xy}=0{,}48$. Si la estatura se pasa a centímetros, ¿cuánto valen $\\sigma_x$, $\\sigma_{xy}$ y r?',
            'الطول (x) بالأمتار والوزن (y) بالكيلوغرامات: $\\sigma_x=0{,}1$ و$\\sigma_y=8$ و$\\sigma_{xy}=0{,}48$. إذا حُوّل الطول إلى السنتيمترات، فكم تصبح $\\sigma_x$ و$\\sigma_{xy}$ وr؟',
            'Height (x) in metres and weight (y) in kilos: $\\sigma_x=0{,}1$, $\\sigma_y=8$ and $\\sigma_{xy}=0{,}48$. If the height is written in centimetres, what are $\\sigma_x$, $\\sigma_{xy}$ and r?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Zentimetroek altuerak 100 bider egiten dituzte, baita haien desbideratzea ere.', 'Los centímetros multiplican las estaturas por 100, y también su desviación.', 'السنتيمترات تضرب الأطوال في 100، وكذلك انحرافها.', 'Centimetres multiply the heights by 100, and their deviation too.'), math: same('$\\sigma_x=100\\cdot 0{,}1=10$') },
            { text: say('Kobariantza ere 100 bider egiten da.', 'La covarianza también se multiplica por 100.', 'ويُضرب التغاير أيضًا في 100.', 'The covariance is multiplied by 100 too.'), math: same('$\\sigma_{xy}=100\\cdot 0{,}48=48$') },
            { text: say('r ez da aldatzen: 100 sinplifikatu egiten da.', 'r no cambia: el 100 se simplifica.', 'لا يتغير r: يُختصر 100.', 'r does not change: the 100 cancels.'), math: same('$r=\\frac{0{,}48}{0{,}1\\cdot 8}=\\frac{48}{10\\cdot 8}=0{,}6$') }
        ],
        takeaway: say(
            "$x'=a\\,x+b$ bada, $a>0$ izanik: $\\bar{x}'=a\\,\\bar{x}+b$, $\\sigma_{x'}=a\\,\\sigma_x$ eta $\\sigma_{x'y}=a\\,\\sigma_{xy}$, eta r ez da aldatzen. $a<0$ bada, r koefizienteak zeinua aldatzen du.",
            "Si $x'=a\\,x+b$ con $a>0$: $\\bar{x}'=a\\,\\bar{x}+b$, $\\sigma_{x'}=a\\,\\sigma_x$ y $\\sigma_{x'y}=a\\,\\sigma_{xy}$, y r no cambia. Si $a<0$, r cambia de signo.",
            "إذا كان $x'=a\\,x+b$ مع $a>0$: $\\bar{x}'=a\\,\\bar{x}+b$ و$\\sigma_{x'}=a\\,\\sigma_x$ و$\\sigma_{x'y}=a\\,\\sigma_{xy}$، ولا يتغير r. وإذا كان $a<0$ تغيّرت إشارة r.",
            "If $x'=a\\,x+b$ with $a>0$: $\\bar{x}'=a\\,\\bar{x}+b$, $\\sigma_{x'}=a\\,\\sigma_x$ and $\\sigma_{x'y}=a\\,\\sigma_{xy}$, and r does not change. If $a<0$, r changes sign."
        ),
        figure: (language) => <UnitsFigure language={language} />
    },

    /* ---------- 4. Regression lines ---------- */
    {
        id: 'regression-yx',
        stage: 'regression',
        figureAfterSteps: true,
        title: say('Y-ren X-rekiko erregresio-zuzena', 'Recta de regresión de Y sobre X', 'مستقيم انحدار Y على X', 'Regression line of Y on X'),
        goal: say('Y-ren X-rekiko erregresio-zuzena idaztea, batez bestekoetatik, kobariantzatik eta X-ren bariantzatik abiatuta.', 'Escribir la recta de regresión de Y sobre X a partir de las medias, la covarianza y la varianza de X.', 'كتابة مستقيم انحدار Y على X انطلاقًا من المتوسطين والتغاير وتباين X.', 'Write the regression line of Y on X from the means, the covariance and the variance of X.'),
        needs: [need.regression],
        problem: say(
            'Hodei batean $\\bar{x}=4$, $\\bar{y}=10$, $\\sigma_x^2=2{,}5$ eta $\\sigma_{xy}=5$ dira. Idatzi Y-ren X-rekiko erregresio-zuzena.',
            'Una nube tiene $\\bar{x}=4$, $\\bar{y}=10$, $\\sigma_x^2=2{,}5$ y $\\sigma_{xy}=5$. Escribe la recta de regresión de Y sobre X.',
            'لسحابة $\\bar{x}=4$ و$\\bar{y}=10$ و$\\sigma_x^2=2{,}5$ و$\\sigma_{xy}=5$. اكتب مستقيم انحدار Y على X.',
            'A cloud has $\\bar{x}=4$, $\\bar{y}=10$, $\\sigma_x^2=2{,}5$ and $\\sigma_{xy}=5$. Write the regression line of Y on X.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Malda: kobariantza zati X-ren bariantza.', 'Pendiente: la covarianza entre la varianza de X.', 'الميل: التغاير مقسومًا على تباين X.', 'Slope: the covariance divided by the variance of X.'), math: same('$m_{yx}=\\frac{5}{2{,}5}=2$') },
            { text: say('Zuzena grabitate-zentrotik pasatzen da.', 'La recta pasa por el centro de gravedad.', 'يمرّ المستقيم بمركز الثقل.', 'The line passes through the centre of gravity.'), math: same('$y-10=2\\,(x-4)$') },
            { text: say('y askatzen da.', 'Se despeja y.', 'نعزل y.', 'Solve for y.'), math: same('$y=2x+2$') }
        ],
        takeaway: say(
            '$y-\\bar{y}=\\frac{\\sigma_{xy}}{\\sigma_x^2}\\,(x-\\bar{x})$: $(\\bar{x},\\bar{y})$ puntutik pasatzen da, eta haren maldak kobariantzaren zeinua du.',
            '$y-\\bar{y}=\\frac{\\sigma_{xy}}{\\sigma_x^2}\\,(x-\\bar{x})$: pasa por $(\\bar{x},\\bar{y})$ y su pendiente tiene el signo de la covarianza.',
            '$y-\\bar{y}=\\frac{\\sigma_{xy}}{\\sigma_x^2}\\,(x-\\bar{x})$: يمرّ بـ $(\\bar{x},\\bar{y})$ وميله بإشارة التغاير.',
            '$y-\\bar{y}=\\frac{\\sigma_{xy}}{\\sigma_x^2}\\,(x-\\bar{x})$: it passes through $(\\bar{x},\\bar{y})$ and its slope has the sign of the covariance.'
        ),
        figure: (language) => <RegressionLineFigure language={language} mode="yx" />
    },
    {
        id: 'estimation',
        stage: 'regression',
        title: say('Estimazioak eta fidagarritasuna', 'Estimaciones y fiabilidad', 'التقديرات وموثوقيتها', 'Estimates and reliability'),
        goal: say('Erregresio-zuzenarekin estimatzea eta estimazioa zenbateraino den fidagarria epaitzea, r koefizientetik eta datuen tartetik.', 'Estimar con la recta de regresión y juzgar si la estimación es fiable, por r y por el intervalo de los datos.', 'التقدير بمستقيم الانحدار والحكم على موثوقية التقدير من r ومن مجال البيانات.', 'Estimate with the regression line and judge whether the estimate is reliable, from r and from the range of the data.'),
        problem: say(
            '$y=0{,}5x+8$ zuzenak eguzki-orduak (2 eta 10 artean) eta tenperatura lotzen ditu, $r\\approx 0{,}87$ izanik. Estimatu tenperatura 7 eta 20 eguzki-ordurekin. Fidagarriak al dira?',
            'La recta $y=0{,}5x+8$ relaciona las horas de sol (entre 2 y 10) y la temperatura, con $r\\approx 0{,}87$. Estima la temperatura con 7 y con 20 horas de sol. ¿Son fiables?',
            'يربط المستقيم $y=0{,}5x+8$ بين ساعات الشمس (بين 2 و10) ودرجة الحرارة، مع $r\\approx 0{,}87$. قدّر درجة الحرارة مع 7 ساعات شمس ومع 20 ساعة. هل التقديران موثوقان؟',
            'The line $y=0{,}5x+8$ links the hours of sunshine (between 2 and 10) and the temperature, with $r\\approx 0{,}87$. Estimate the temperature with 7 and with 20 hours of sunshine. Are they reliable?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Datuen tartean, x ordezkatzen da.', 'Dentro del intervalo de los datos, se sustituye x.', 'داخل مجال البيانات نعوّض x.', 'Within the range of the data, substitute x.'), math: same('$0{,}5\\cdot 7+8=11{,}5$') },
            { text: say('r 1 zenbakitik hurbil dago, eta 7 datuen artean: estimazio fidagarria.', 'r está cerca de 1 y 7 está entre los datos: estimación fiable.', 'r قريب من 1 و7 بين البيانات: تقدير موثوق.', 'r is close to 1 and 7 is among the data: a reliable estimate.') },
            { text: say('20 datuetatik oso urrun dago: kalkuluak zenbaki bat ematen du, baina ez da fidagarria.', '20 queda muy lejos de los datos: la cuenta da un número, pero no es fiable.', 'العدد 20 بعيد جدًّا عن البيانات: يعطي الحساب عددًا، لكنه غير موثوق.', '20 is very far from the data: the sum gives a number, but it is not reliable.'), math: same('$0{,}5\\cdot 20+8=18$') }
        ],
        takeaway: say(
            'Estimazio bat fidagarria da |r| 1 zenbakitik hurbil badago eta x datuen tartearen barruan edo ondoan badago. r 0 zenbakitik hurbil badago, ez du zentzurik estimatzeak.',
            'Una estimación es fiable si |r| está cerca de 1 y x está dentro del intervalo de los datos o cerca de él. Con r cerca de 0 no tiene sentido estimar.',
            'يكون التقدير موثوقًا إذا كان |r| قريبًا من 1 وكانت x داخل مجال البيانات أو قريبة منه. ومع r قريب من 0 لا معنى للتقدير.',
            'An estimate is reliable if |r| is close to 1 and x is within the range of the data or near it. With r close to 0 there is no point in estimating.'
        ),
        figure: (language) => <EstimationFigure language={language} />
    },
    {
        id: 'regression-xy',
        stage: 'regression',
        figureAfterSteps: true,
        title: say('X-ren Y-rekiko erregresio-zuzena', 'Recta de regresión de X sobre Y', 'مستقيم انحدار X على Y', 'Regression line of X on Y'),
        goal: say('X-ren Y-rekiko zuzena idaztea eta y-ren balio batetik x estimatzeko erabiltzea.', 'Escribir la recta de X sobre Y y usarla para estimar x a partir de un valor de y.', 'كتابة مستقيم انحدار X على Y واستعماله لتقدير x انطلاقًا من قيمة لـ y.', 'Write the line of X on Y and use it to estimate x from a value of y.'),
        problem: say(
            '$\\bar{x}=5$, $\\bar{y}=8$, $\\sigma_y^2=4$ eta $\\sigma_{xy}=3$ dira. Idatzi X-ren Y-rekiko zuzena eta estimatu x, $y=12$ denean.',
            'Se tiene $\\bar{x}=5$, $\\bar{y}=8$, $\\sigma_y^2=4$ y $\\sigma_{xy}=3$. Escribe la recta de X sobre Y y estima x para $y=12$.',
            'لدينا $\\bar{x}=5$ و$\\bar{y}=8$ و$\\sigma_y^2=4$ و$\\sigma_{xy}=3$. اكتب مستقيم انحدار X على Y وقدّر x عندما $y=12$.',
            'You have $\\bar{x}=5$, $\\bar{y}=8$, $\\sigma_y^2=4$ and $\\sigma_{xy}=3$. Write the line of X on Y and estimate x for $y=12$.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Orain Y-ren bariantzaz zatitzen da.', 'Ahora se divide entre la varianza de Y.', 'الآن نقسم على تباين Y.', 'Now divide by the variance of Y.'), math: same('$m_{xy}=\\frac{3}{4}=0{,}75$') },
            { text: say('Grabitate-zentrotik pasatzen da, x askatuta.', 'Pasa por el centro de gravedad, con x despejada.', 'يمرّ بمركز الثقل، ثم نعزل x.', 'It passes through the centre of gravity, with x on its own.'), math: same('$x-5=0{,}75\\,(y-8)\\ \\to\\ x=0{,}75y-1$') },
            { text: say('$y=12$ ordezkatzen da.', 'Se sustituye $y=12$.', 'نعوّض $y=12$.', 'Substitute $y=12$.'), math: same('$x=0{,}75\\cdot 12-1=8$') }
        ],
        takeaway: say(
            'y aldagaitik x estimatzeko, $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$ erabiltzen da, ez Y-ren X-rekiko zuzena askatuta. Biak bat datoz $r=\\pm 1$ denean bakarrik.',
            'Para estimar x a partir de y se usa $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$, no la recta de Y sobre X despejada. Las dos coinciden solo si $r=\\pm 1$.',
            'لتقدير x انطلاقًا من y نستعمل $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$، لا مستقيم Y على X بعد عزل x. ولا يتطابقان إلا إذا كان $r=\\pm 1$.',
            'To estimate x from y, use $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$, not the line of Y on X solved for x. The two are the same only if $r=\\pm 1$.'
        ),
        figure: (language) => <RegressionLineFigure language={language} mode="xy" />
    },
    {
        id: 'two-lines',
        stage: 'regression',
        figureAfterSteps: true,
        title: say('Bi erregresio-zuzenak', 'Las dos rectas de regresión', 'مستقيما الانحدار', 'The two regression lines'),
        goal: say('Bi zuzenen ebakidura-puntuan grabitate-zentroa aurkitzea, haien koefizienteetatik r ateratzea eta haien arteko angelua korrelazioaren indarrarekin lotzea.', 'Hallar el centro de gravedad en el corte de las dos rectas, sacar r de sus coeficientes y relacionar el ángulo entre ellas con la fuerza de la correlación.', 'إيجاد مركز الثقل في نقطة تقاطع المستقيمين، واستخراج r من معامليهما، وربط الزاوية بينهما بقوة الارتباط.', 'Find the centre of gravity where the two lines cross, get r from their coefficients and link the angle between them to the strength of the correlation.'),
        problem: say(
            'Erregresio-zuzenak $y=0{,}9x+5{,}5$ (Y-ren X-rekiko) eta $x=0{,}4y+1$ (X-ren Y-rekiko) dira. Aurkitu $\\bar{x}$, $\\bar{y}$ eta r.',
            'Las rectas de regresión son $y=0{,}9x+5{,}5$ (Y sobre X) y $x=0{,}4y+1$ (X sobre Y). Halla $\\bar{x}$, $\\bar{y}$ y r.',
            'مستقيما الانحدار هما $y=0{,}9x+5{,}5$ (Y على X) و$x=0{,}4y+1$ (X على Y). أوجد $\\bar{x}$ و$\\bar{y}$ وr.',
            'The regression lines are $y=0{,}9x+5{,}5$ (Y on X) and $x=0{,}4y+1$ (X on Y). Find $\\bar{x}$, $\\bar{y}$ and r.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Biak $(\\bar{x},\\bar{y})$ puntutik pasatzen dira: sistema ebazten da.', 'Las dos pasan por $(\\bar{x},\\bar{y})$: se resuelve el sistema.', 'يمرّ كلاهما بـ $(\\bar{x},\\bar{y})$: نحلّ النظام.', 'Both pass through $(\\bar{x},\\bar{y})$: solve the system.'), math: same('$\\begin{gathered}x=0{,}4\\,(0{,}9x+5{,}5)+1\\\\ 0{,}64x=3{,}2\\ \\to\\ x=5\\end{gathered}$') },
            { text: say('y lehenengo zuzenean.', 'La y, en la primera recta.', 'قيمة y من المستقيم الأول.', 'y, from the first line.'), math: same('$y=0{,}9\\cdot 5+5{,}5=10$') },
            { text: say('Koefizienteen biderkadura $r^2$ da, eta r koefizienteak haien zeinua du.', 'El producto de los coeficientes es $r^2$, y r tiene su signo.', 'جداء المعاملين هو $r^2$، وr بإشارتهما.', 'The product of the coefficients is $r^2$, and r has their sign.'), math: same('$r^2=0{,}9\\cdot 0{,}4=0{,}36\\qquad r=\\sqrt{0{,}36}=0{,}6$') }
        ],
        takeaway: say(
            'Bi zuzenak $(\\bar{x},\\bar{y})$ puntuan ebakitzen dira, eta $m_{yx}\\cdot m_{xy}=r^2$. $|r|=1$ denean bat datoz; korrelazioa zenbat eta ahulagoa, orduan eta irekiago; $r=0$ denean perpendikularrak dira: $y=\\bar{y}$ eta $x=\\bar{x}$.',
            'Las dos rectas se cortan en $(\\bar{x},\\bar{y})$ y $m_{yx}\\cdot m_{xy}=r^2$. Con $|r|=1$ coinciden; cuanto más débil la correlación, más se abren; con $r=0$ son perpendiculares: $y=\\bar{y}$ y $x=\\bar{x}$.',
            'يتقاطع المستقيمان في $(\\bar{x},\\bar{y})$ و$m_{yx}\\cdot m_{xy}=r^2$. ومع $|r|=1$ يتطابقان؛ وكلما ضعف الارتباط انفتحا؛ ومع $r=0$ يتعامدان: $y=\\bar{y}$ و$x=\\bar{x}$.',
            'The two lines cross at $(\\bar{x},\\bar{y})$ and $m_{yx}\\cdot m_{xy}=r^2$. With $|r|=1$ they are the same; the weaker the correlation, the more they open; with $r=0$ they are perpendicular: $y=\\bar{y}$ and $x=\\bar{x}$.'
        ),
        figure: (language) => <TwoLinesFigure language={language} />
    },

    /* ---------- 5. Full problems ---------- */
    {
        id: 'grouped-pairs',
        stage: 'problems',
        title: say('Datu multzokatuen taulak', 'Tablas con datos agrupados', 'جداول البيانات المبوّبة', 'Tables with grouped data'),
        goal: say('Bi aldagaiak tarteetan dituen taula batetik batez bestekoak eta kobariantza kalkulatzea, klase-markekin eta gelaxka bakoitzaren maiztasunarekin.', 'Calcular medias y covarianza de una tabla con las dos variables en intervalos, con las marcas de clase y la frecuencia de cada casilla.', 'حساب المتوسطين والتغاير من جدول فيه المتغيران في فئات، بمراكز الفئات وتكرار كل خانة.', 'Work out the means and the covariance of a table with both variables in intervals, with the class marks and the frequency of each cell.'),
        needs: [need.grouped],
        problem: say(
            'Taula: X $[5,15)$ eta $[15,25)$ tarteetan, Y $[0,2)$ eta $[2,4)$ tarteetan. $[5,15)$ errenkada: 6 eta 2; $[15,25)$ errenkada: 2 eta 10. Kalkulatu $\\sigma_{xy}$.',
            'Tabla: X en $[5,15)$ y $[15,25)$; Y en $[0,2)$ y $[2,4)$. Fila $[5,15)$: 6 y 2; fila $[15,25)$: 2 y 10. Calcula $\\sigma_{xy}$.',
            'جدول: X في $[5,15)$ و$[15,25)$، وY في $[0,2)$ و$[2,4)$. السطر $[5,15)$: 6 و2؛ السطر $[15,25)$: 2 و10. احسب $\\sigma_{xy}$.',
            'Table: X in $[5,15)$ and $[15,25)$; Y in $[0,2)$ and $[2,4)$. Row $[5,15)$: 6 and 2; row $[15,25)$: 2 and 10. Work out $\\sigma_{xy}$.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Klase-markak.', 'Las marcas de clase.', 'مراكز الفئات.', 'The class marks.'), math: same('$x\\in\\{10,\\ 20\\}\\qquad y\\in\\{1,\\ 3\\}$') },
            { text: say('Batez bestekoak, marjinalekin.', 'Las medias, con las marginales.', 'المتوسطان من التوزيعين الهامشيين.', 'The means, with the marginals.'), math: same('$\\begin{gathered}\\bar{x}=\\frac{8\\cdot 10+12\\cdot 20}{20}=16\\\\ \\bar{y}=\\frac{8\\cdot 1+12\\cdot 3}{20}=2{,}2\\end{gathered}$') },
            { text: say('Biderkadura bakoitza, bere gelaxkaren maiztasunaz biderkatuta.', 'Cada producto, por la frecuencia de su casilla.', 'كل جداء مضروبًا في تكرار خانته.', 'Each product, times the frequency of its cell.'), math: same('$\\begin{gathered}\\sum f_{ij}\\,x_i\\,y_j=60+60+40+600=760\\\\ \\sigma_{xy}=\\frac{760}{20}-16\\cdot 2{,}2=2{,}8\\end{gathered}$') }
        ],
        takeaway: say(
            'Datu multzokatuekin, tarte bakoitzaren ordez bere klase-marka hartzen da, eta $x_i\\,y_j$ biderkadura bakoitza bere gelaxkaren $f_{ij}$ maiztasunaz biderkatzen da: $\\sigma_{xy}=\\frac{\\sum f_{ij}\\,x_i\\,y_j}{N}-\\bar{x}\\,\\bar{y}$.',
            'Con datos agrupados, cada intervalo se sustituye por su marca de clase y cada producto $x_i\\,y_j$ se multiplica por la frecuencia $f_{ij}$ de su casilla: $\\sigma_{xy}=\\frac{\\sum f_{ij}\\,x_i\\,y_j}{N}-\\bar{x}\\,\\bar{y}$.',
            'مع البيانات المبوّبة تُستبدل كل فئة بمركزها، ويُضرب كل جداء $x_i\\,y_j$ في تكرار خانته $f_{ij}$: $\\sigma_{xy}=\\frac{\\sum f_{ij}\\,x_i\\,y_j}{N}-\\bar{x}\\,\\bar{y}$.',
            'With grouped data, each interval is replaced by its class mark and each product $x_i\\,y_j$ is multiplied by the frequency $f_{ij}$ of its cell: $\\sigma_{xy}=\\frac{\\sum f_{ij}\\,x_i\\,y_j}{N}-\\bar{x}\\,\\bar{y}$.'
        ),
        figure: (language) => <GroupedPairsFigure language={language} />
    },
    {
        id: 'calculation-table',
        stage: 'problems',
        figureAfterSteps: true,
        title: say('Kalkulu-taula', 'La tabla de cálculo', 'جدول الحساب', 'The working table'),
        goal: say('Problema oso bat $x$, $y$, $x^2$, $y^2$ eta $x\\,y$ zutabeko taula batean antolatzea, eta handik parametro guztiak eta zuzena ateratzea.', 'Ordenar un problema completo en una tabla con las columnas $x$, $y$, $x^2$, $y^2$ y $x\\,y$, y sacar de ella todos los parámetros y la recta.', 'ترتيب مسألة كاملة في جدول بالأعمدة $x$ و$y$ و$x^2$ و$y^2$ و$x\\,y$، واستخراج كل المقاييس والمستقيم منه.', 'Arrange a full problem in a table with the columns $x$, $y$, $x^2$, $y^2$ and $x\\,y$, and get from it all the measures and the line.'),
        problem: say(
            'Bikoteak: $(1,\\,3)$, $(2,\\,2)$, $(4,\\,6)$ eta $(5,\\,5)$. Kalkulatu r eta Y-ren X-rekiko erregresio-zuzena.',
            'Pares: $(1,\\,3)$, $(2,\\,2)$, $(4,\\,6)$ y $(5,\\,5)$. Calcula r y la recta de regresión de Y sobre X.',
            'الأزواج: $(1,\\,3)$ و$(2,\\,2)$ و$(4,\\,6)$ و$(5,\\,5)$. احسب r ومستقيم انحدار Y على X.',
            'Pairs: $(1,\\,3)$, $(2,\\,2)$, $(4,\\,6)$ and $(5,\\,5)$. Work out r and the regression line of Y on X.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Zutabeen baturak.', 'Las sumas de las columnas.', 'مجاميع الأعمدة.', 'The sums of the columns.'), math: same('$\\begin{gathered}\\sum x=12\\qquad\\sum y=16\\\\ \\sum x^2=46\\qquad\\sum y^2=74\\\\ \\sum xy=56\\end{gathered}$') },
            { text: say('Bariantzak eta kobariantza, $\\bar{x}=3$ eta $\\bar{y}=4$ izanik.', 'Varianzas y covarianza, con $\\bar{x}=3$ e $\\bar{y}=4$.', 'التباينان والتغاير، مع $\\bar{x}=3$ و$\\bar{y}=4$.', 'Variances and covariance, with $\\bar{x}=3$ and $\\bar{y}=4$.'), math: same('$\\begin{gathered}\\sigma_x^2=\\frac{46}{4}-3^2=2{,}5\\\\ \\sigma_y^2=\\frac{74}{4}-4^2=2{,}5\\\\ \\sigma_{xy}=\\frac{56}{4}-3\\cdot 4=2\\end{gathered}$') },
            { text: say('r eta zuzena.', 'r y la recta.', 'r والمستقيم.', 'r and the line.'), math: same('$r=\\frac{2}{\\sqrt{2{,}5\\cdot 2{,}5}}=0{,}8\\qquad y-4=0{,}8\\,(x-3)$') }
        ],
        takeaway: say(
            'Taulako bost baturekin dena ateratzen da: $\\bar{x}$, $\\bar{y}$, $\\sigma_x^2$, $\\sigma_y^2$, $\\sigma_{xy}$, r eta bi zuzenak. Kalkulagailuak, erregresio linealeko moduan, batura berak egiten ditu.',
            'Con las cinco sumas de la tabla sale todo: $\\bar{x}$, $\\bar{y}$, $\\sigma_x^2$, $\\sigma_y^2$, $\\sigma_{xy}$, r y las dos rectas. La calculadora, en modo de regresión lineal, hace esas mismas sumas.',
            'من مجاميع الجدول الخمسة يخرج كل شيء: $\\bar{x}$ و$\\bar{y}$ و$\\sigma_x^2$ و$\\sigma_y^2$ و$\\sigma_{xy}$ وr والمستقيمان. والآلة الحاسبة في نمط الانحدار الخطي تحسب المجاميع نفسها.',
            'With the five sums of the table you get everything: $\\bar{x}$, $\\bar{y}$, $\\sigma_x^2$, $\\sigma_y^2$, $\\sigma_{xy}$, r and the two lines. The calculator, in linear regression mode, works out those same sums.'
        ),
        figure: (language) => <CalcTableFigure language={language} />
    },
    {
        id: 'inverse-problems',
        stage: 'problems',
        title: say('Alderantzizko problemak', 'Problemas inversos', 'المسائل العكسية', 'Working backwards'),
        goal: say('Zuzenetatik eta r koefizientetik falta diren parametroak ateratzea: batez bestekoak ebakiduratik, kobariantza malda batetik, eta zuzen bat bestetik.', 'Sacar los parámetros que faltan de las rectas y de r: las medias del corte, la covarianza de una pendiente y una recta de la otra.', 'استخراج المقاييس الناقصة من المستقيمين ومن r: المتوسطين من التقاطع، والتغاير من ميل، ومستقيمًا من الآخر.', 'Get the missing measures from the lines and from r: the means from the crossing, the covariance from a slope and one line from the other.'),
        problem: say(
            'Y-ren X-rekiko zuzena $y=2x-3$ da, eta $\\bar{x}=4$, $\\sigma_x=1$ eta $\\sigma_y=2{,}5$. Aurkitu $\\bar{y}$, $\\sigma_{xy}$ eta r.',
            'La recta de Y sobre X es $y=2x-3$, y $\\bar{x}=4$, $\\sigma_x=1$ y $\\sigma_y=2{,}5$. Halla $\\bar{y}$, $\\sigma_{xy}$ y r.',
            'مستقيم انحدار Y على X هو $y=2x-3$، و$\\bar{x}=4$ و$\\sigma_x=1$ و$\\sigma_y=2{,}5$. أوجد $\\bar{y}$ و$\\sigma_{xy}$ وr.',
            'The line of Y on X is $y=2x-3$, and $\\bar{x}=4$, $\\sigma_x=1$ and $\\sigma_y=2{,}5$. Find $\\bar{y}$, $\\sigma_{xy}$ and r.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Zuzena $(\\bar{x},\\bar{y})$ puntutik pasatzen da.', 'La recta pasa por $(\\bar{x},\\bar{y})$.', 'يمرّ المستقيم بـ $(\\bar{x},\\bar{y})$.', 'The line passes through $(\\bar{x},\\bar{y})$.'), math: same('$\\bar{y}=2\\cdot 4-3=5$') },
            { text: say('Malda $\\frac{\\sigma_{xy}}{\\sigma_x^2}$ da.', 'La pendiente es $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.', 'الميل $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.', 'The slope is $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.'), math: same('$\\sigma_{xy}=2\\cdot 1^2=2$') },
            { text: say('Eta r.', 'Y r.', 'ثم r.', 'And r.'), math: same('$r=\\frac{2}{1\\cdot 2{,}5}=0{,}8$') }
        ],
        takeaway: say(
            'Atzera joateko: $(\\bar{x},\\bar{y})$ bi zuzenetan dago; $\\sigma_{xy}=m_{yx}\\,\\sigma_x^2=m_{xy}\\,\\sigma_y^2$; eta $r^2=m_{yx}\\cdot m_{xy}$. Horrela, zuzen batetik eta r koefizientetik, bestea ateratzen da.',
            'Para ir hacia atrás: $(\\bar{x},\\bar{y})$ está en las dos rectas; $\\sigma_{xy}=m_{yx}\\,\\sigma_x^2=m_{xy}\\,\\sigma_y^2$; y $r^2=m_{yx}\\cdot m_{xy}$. Con eso, de una recta y r sale la otra.',
            'للرجوع إلى الوراء: $(\\bar{x},\\bar{y})$ على المستقيمين؛ و$\\sigma_{xy}=m_{yx}\\,\\sigma_x^2=m_{xy}\\,\\sigma_y^2$؛ و$r^2=m_{yx}\\cdot m_{xy}$. وبذلك يخرج من مستقيم ومن r المستقيم الآخر.',
            'To work backwards: $(\\bar{x},\\bar{y})$ lies on both lines; $\\sigma_{xy}=m_{yx}\\,\\sigma_x^2=m_{xy}\\,\\sigma_y^2$; and $r^2=m_{yx}\\cdot m_{xy}$. With that, from one line and r you get the other.'
        )
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bivarTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bivarLessonTexts[topic.id as BivarTopicId], ...bivarLessonChecks[topic.id as BivarTopicId] }))

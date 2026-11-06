import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { BivarTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Zientziak — what each
   lesson tells: the new words (definitions), a short explanation, the
   example as an exercise («Another example»), the key words in four
   languages and, in five lessons, «Why does it work?». Plain data so the
   tests can import it; lessons.tsx merges it into the topics. The example
   uses numbers of its own, never those of «Let's solve», of «Check it» or
   of the typical mistake.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bivarLessonTexts: Record<BivarTopicId, LessonTexts> = {
    /* ---------- 1. Two-way tables ---------- */
    'two-variables': {
        definitions: [
            { term: say('Aldagai bidimentsionala', 'Variable bidimensional', 'المتغير ثنائي البعد', 'Two-variable data'), meaning: say('Banako bakoitzean neurtzen diren bi aldagai; datu bakoitza $(x,y)$ bikote bat da.', 'Dos variables que se miden en cada individuo; cada dato es un par $(x,y)$.', 'متغيران يُقاسان في كل فرد؛ وكل بيان زوج $(x,y)$.', 'Two variables measured on each individual; each datum is a pair $(x,y)$.') },
            { term: say('Sarrera bikoitzeko taula', 'Tabla de doble entrada', 'الجدول مزدوج المدخل', 'Two-way table'), meaning: say('X-ren balioak errenkadetan eta Y-renak zutabeetan dituen taula; gelaxka bakoitzak bikote bat zenbat aldiz agertzen den esaten du.', 'Tabla con los valores de X en las filas y los de Y en las columnas; cada casilla dice cuántas veces sale un par.', 'جدول فيه قيم X في الأسطر وقيم Y في الأعمدة؛ وكل خانة تقول كم مرة يظهر زوج.', 'A table with the values of X in the rows and those of Y in the columns; each cell says how many times a pair appears.') }
        ],
        vocabulary: [
            say('bikotea', 'par', 'الزوج', 'pair'),
            say('errenkada', 'fila', 'السطر', 'row'),
            say('zutabea', 'columna', 'العمود', 'column')
        ],
        explanation: say(
            'Banako bakoitzean bi aldagai neurtzen direnean, datu bakoitza $(x,y)$ bikote bat da: ikasketa-orduak eta nota, altuera eta pisua… Balioak errepikatzen badira, bikoteak sarrera bikoitzeko taula batean zenbatzen dira: X-ren balioak errenkadetan, Y-renak zutabeetan, eta gelaxka bakoitzean, bikote hori zenbat aldiz agertzen den.',
            'Cuando en cada individuo se miden dos variables, cada dato es un par $(x,y)$: horas de estudio y nota, estatura y peso… Si los valores se repiten, los pares se cuentan en una tabla de doble entrada: los valores de X en las filas, los de Y en las columnas y, en cada casilla, cuántas veces sale ese par.',
            'عندما يُقاس متغيران في كل فرد يكون كل بيان زوجًا $(x,y)$: ساعات الدراسة والعلامة، والطول والوزن… وإذا تكرّرت القيم عددنا الأزواج في جدول مزدوج المدخل: قيم X في الأسطر، وقيم Y في الأعمدة، كل قيمة في عمود، وفي كل خانة عدد مرات ظهور ذلك الزوج.',
            'When two variables are measured on each individual, each datum is a pair $(x,y)$: study hours and mark, height and weight… If the values repeat, the pairs are counted in a two-way table: the values of X in the rows, those of Y in the columns and, in each cell, how many times that pair appears.'
        ),
        examplePrompt: say('Sarrera bikoitzeko taula baten gelaxkak 5, 2, 0, 4, 6 eta 3 dira. Zenbat banako daude?', 'Las casillas de una tabla de doble entrada valen 5, 2, 0, 4, 6 y 3. ¿Cuántos individuos hay?', 'قيم خانات جدول مزدوج المدخل 5 و2 و0 و4 و6 و3. كم فردًا هناك؟', 'The cells of a two-way table are 5, 2, 0, 4, 6 and 3. How many individuals are there?'),
        example: same('$N=5+2+0+4+6+3=20$'),
        exampleAnswer: say('20 banako.', '20 individuos.', '20 فردًا.', '20 individuals.')
    },
    marginal: {
        definitions: [
            { term: say('Banaketa marjinala', 'Distribución marginal', 'التوزيع الهامشي', 'Marginal distribution'), meaning: say('Aldagai bakar baten banaketa, bestea kontuan hartu gabe; errenkaden edo zutabeen guztizkoetan irakurtzen da.', 'La de una sola variable, sin mirar la otra: se lee en los totales de las filas o de las columnas.', 'توزيع متغير واحد دون النظر إلى الآخر: يُقرأ في مجاميع الأسطر أو الأعمدة.', 'The distribution of one variable alone, ignoring the other: you read it in the row or column totals.') }
        ],
        vocabulary: [
            say('guztizkoa', 'total', 'المجموع', 'total'),
            say('marjina', 'margen', 'الهامش', 'margin')
        ],
        explanation: say(
            'Sarrera bikoitzeko taulan aldagai bat bakarrik interesatzen bada, bestea ahaztu egiten da: errenkada bakoitza batuta X-ren banaketa ateratzen da, eta zutabe bakoitza batuta, Y-rena. Guztizko horiek taularen marjinetan idazten dira; hortik dator izena. Haiekin batez bestekoak eta desbideratzeak kalkulatzen dira, aldagai bakarrarekin bezala.',
            'Si en la tabla de doble entrada solo interesa una variable, se olvida la otra: sumando cada fila sale la distribución de X, y sumando cada columna, la de Y. Esos totales se escriben en los márgenes de la tabla, de ahí el nombre. Con ellos se calculan medias y desviaciones como con una sola variable.',
            'إذا لم يهمّنا في الجدول مزدوج المدخل إلا متغير واحد نسينا الآخر: بجمع كل سطر يخرج توزيع X، وبجمع كل عمود يخرج توزيع Y. ويُكتب مجموع كل سطر وكل عمود في هوامش الجدول، ومن هنا الاسم. وبها نحسب المتوسطات والانحرافات كما في متغير واحد.',
            'If only one variable of the two-way table matters, forget the other: adding each row gives the distribution of X, and adding each column, that of Y. Those totals are written in the margins of the table, hence the name. With them you work out means and deviations as with a single variable.'
        ),
        examplePrompt: say('10 datuko taula bat, $X=1$ eta $X=2$ errenkadekin: lehenengoan 3 eta 1, bigarrenean 2 eta 4. Zenbat da $\\bar{x}$?', 'Tabla de 10 datos con filas $X=1$ y $X=2$: en la primera, 3 y 1; en la segunda, 2 y 4. ¿Cuánto vale $\\bar{x}$?', 'جدول من 10 بيانات بسطرين $X=1$ و$X=2$: في الأول 3 و1، وفي الثاني 2 و4. كم $\\bar{x}$؟', 'A table of 10 data with rows $X=1$ and $X=2$: in the first, 3 and 1; in the second, 2 and 4. What is $\\bar{x}$?'),
        example: same('$\\bar{x}=\\frac{1\\cdot 4+2\\cdot 6}{10}=1{,}6$'),
        exampleAnswer: same('$\\bar{x}=1{,}6$')
    },
    conditional: {
        definitions: [
            { term: say('Banaketa baldintzatua', 'Distribución condicionada', 'التوزيع الشرطي', 'Conditional distribution'), meaning: say('Aldagai baten banaketa, bestearen balio finko bat duten banakoen artean bakarrik; $Y/X=a$ idazten da.', 'La de una variable solo entre los individuos con un valor fijo de la otra; se escribe $Y/X=a$.', 'توزيع متغير بين الأفراد الذين لهم قيمة ثابتة للآخر فقط؛ ويُكتب $Y/X=a$.', 'The distribution of one variable only among the individuals with a fixed value of the other; it is written $Y/X=a$.') }
        ],
        vocabulary: [
            say('baldintza', 'condición', 'الشرط', 'condition'),
            say('maiztasun erlatiboa', 'frecuencia relativa', 'التكرار النسبي', 'relative frequency')
        ],
        explanation: say(
            'Y aztertzeko X-ren balio bat duten banakoetan bakarrik, balio horren errenkada hartzen da, eta gelaxka bakoitza errenkadaren guztizkoaz zatitzen da, ez N zenbakiaz: baldintzaren barruko maiztasun erlatiboa da. Errenkada batzuetako banaketa baldintzatuak konparatuz, aldagai batek besteari eragiten dion ikusten da.',
            'Para estudiar Y solo en los individuos con un valor de X, se toma la fila de ese valor y se divide cada casilla entre el total de la fila, no entre N: es una frecuencia relativa dentro de la condición. Comparando las condicionadas de varias filas se ve si una variable influye en la otra.',
            'لدراسة Y بين الأفراد الذين لهم قيمة معيّنة لـ X فقط، نأخذ سطر تلك القيمة ونقسم كل خانة على مجموع السطر لا على N: إنه تكرار نسبي داخل الشرط. وبمقارنة التوزيعات الشرطية لعدة أسطر نرى هل يؤثّر متغير في الآخر.',
            'To study Y only among the individuals with one value of X, take the row of that value and divide each cell by the row total, not by N: it is a relative frequency within the condition. Comparing the conditionals of several rows shows whether one variable influences the other.'
        ),
        examplePrompt: say('Taula baten $X=2$ errenkadak 9, 6 eta 15 banako ditu $Y=0$, $Y=1$ eta $Y=2$ zutabeetan. Zer maiztasun erlatibo du $Y=2$ balioak?', 'La fila $X=2$ de una tabla tiene 9, 6 y 15 individuos en $Y=0$, $Y=1$ e $Y=2$. ¿Qué frecuencia relativa tiene $Y=2$ en esa condicionada?', 'في السطر $X=2$ من جدول 9 و6 و15 فردًا في $Y=0$ و$Y=1$ و$Y=2$. ما التكرار النسبي لـ $Y=2$ في ذلك التوزيع الشرطي؟', 'The row $X=2$ of a table has 9, 6 and 15 individuals in $Y=0$, $Y=1$ and $Y=2$. What relative frequency does $Y=2$ have in that conditional?'),
        example: same('$\\frac{15}{9+6+15}=0{,}5$'),
        exampleAnswer: say('% 50.', 'El 50 %.', '50٪.', '50%.')
    },
    independence: {
        definitions: [
            { term: say('Aldagai independenteak', 'Variables independientes', 'المتغيران المستقلان', 'Independent variables'), meaning: say('Batak besteari eragiten ez diotenak: Y-ren banaketa bera da X-ren edozein baliotarako.', 'Las que no influyen una en la otra: la distribución de Y es la misma para cualquier valor de X.', 'اللذان لا يؤثّر أحدهما في الآخر: توزيع Y نفسه لأي قيمة لـ X.', 'Ones that do not influence each other: the distribution of Y is the same for any value of X.') }
        ],
        vocabulary: [
            say('proportzionala', 'proporcional', 'متناسب', 'proportional'),
            say('eragin', 'influir', 'يؤثّر', 'influence')
        ],
        explanation: say(
            'Bi aldagai independenteak dira X jakiteak Y-ren banaketa aldatzen ez badu: errenkada guztiek maiztasun erlatibo berak dituzte, hau da, proportzionalak dira. Orduan zutabe bakoitzaren zatia bera da errenkada guztietan, eta gelaxka bakoitza bere errenkadaren guztizkoa bider bere zutabearena da, zati N.',
            'Dos variables son independientes si conocer X no cambia la distribución de Y: todas las filas tienen las mismas frecuencias relativas, es decir, son proporcionales. Entonces la parte de cada columna es la misma en todas las filas, y cada casilla es el total de su fila por el de su columna, entre N.',
            'يكون المتغيران مستقلين إذا كانت معرفة X لا تغيّر توزيع Y: لكل الأسطر التكرارات النسبية نفسها، أي إنها متناسبة. وعندئذ يكون نصيب كل عمود واحدًا في كل الأسطر، وتكون كل خانة مجموع سطرها في مجموع عمودها، مقسومًا على N.',
            'Two variables are independent if knowing X does not change the distribution of Y: all the rows have the same relative frequencies, that is, they are proportional. Then the share of each column is the same in every row, and each cell is its row total times its column total, divided by N.'
        ),
        examplePrompt: say('Errenkaden guztizkoak 40 eta 60 dira, zutabeenak 25 eta 75, eta $N=100$. Zenbat izan behar du $(1,\\,1)$ gelaxkak independentzia egoteko?', 'Totales de fila 40 y 60, de columna 25 y 75, y $N=100$. ¿Cuánto debe valer la casilla $(1,\\,1)$ para que haya independencia?', 'مجموعا السطرين 40 و60، ومجموعا العمودين 25 و75، و$N=100$. كم يجب أن تكون الخانة $(1,\\,1)$ ليتحقق الاستقلال؟', 'Row totals 40 and 60, column totals 25 and 75, and $N=100$. What must the cell $(1,\\,1)$ be for independence?'),
        example: same('$\\frac{40\\cdot 25}{100}=10$'),
        exampleAnswer: say('10 banako.', '10 individuos.', '10 أفراد.', '10 individuals.'),
        why: {
            text: say(
                'Zergatik errenkada bider zutabe, zati N? Independentzia badago, zutabe baten zatia bera da errenkada guztietan, eta beraz guztizkoan ere bai: $\\frac{20}{50}=0{,}4$. Gelaxka bere errenkadaren zati hori da: $0{,}4\\cdot 30=12$.',
                '¿Por qué fila por columna entre N? Si hay independencia, la parte de una columna es la misma en todas las filas, y por tanto en el total: $\\frac{20}{50}=0{,}4$. La casilla es esa parte de su fila: $0{,}4\\cdot 30=12$.',
                'لماذا السطر في العمود مقسومًا على N؟ إذا تحقق الاستقلال فنصيب العمود واحد في كل الأسطر، ومن ثمّ في المجموع: $\\frac{20}{50}=0{,}4$. والخانة هي ذلك النصيب من سطرها: $0{,}4\\cdot 30=12$.',
                'Why row times column divided by N? With independence, the share of a column is the same in every row, and so in the total too: $\\frac{20}{50}=0{,}4$. The cell is that share of its row: $0{,}4\\cdot 30=12$.'
            ),
            math: same('$\\frac{20}{50}\\cdot 30=\\frac{30\\cdot 20}{50}=12$')
        }
    },

    /* ---------- 2. The scatter plot ---------- */
    'scatter-dependence': {
        definitions: [
            { term: say('Erlazio funtzionala', 'Relación funcional', 'العلاقة الدالية', 'Functional relation'), meaning: say('x-ren balio bakoitzak y-ren balio bakarra ematen du: puntuak lerro baten gainean daude.', 'Cada valor de x da un solo valor de y: los puntos están sobre una línea.', 'كل قيمة لـ x تعطي قيمة واحدة لـ y: النقاط على خط.', 'Each value of x gives a single value of y: the points lie on a line.') },
            { term: say('Erlazio estatistikoa', 'Relación estadística', 'العلاقة الإحصائية', 'Statistical relation'), meaning: say('Puntuak lerro baten inguruan daude: x aldagaiak y aurreikusten laguntzen du, baina ez du finkatzen.', 'Los puntos están alrededor de una línea: x ayuda a prever y, pero no la fija.', 'النقاط حول خط: تساعد x على توقّع y لكنها لا تحدّدها.', 'The points are around a line: x helps to predict y, but does not fix it.') }
        ],
        vocabulary: [
            say('sendoa', 'fuerte', 'قوي', 'strong'),
            say('ahula', 'débil', 'ضعيف', 'weak'),
            say('negatiboa', 'negativa', 'سالب', 'negative')
        ],
        explanation: say(
            'Puntu-hodeian banako bakoitza $(x,y)$ puntu bat da. Puntuak lerro baten gainean badaude, erlazioa funtzionala da; haren inguruan badaude, estatistikoa. Zuzen baten inguruan biltzen direnean, mendekotasun lineala dago: sendoa oso hurbil badaude, ahula sakabanatuta badaude; positiboa zuzenak gora egiten badu, eta negatiboa behera egiten badu.',
            'En la nube de puntos cada individuo es un punto $(x,y)$. Si los puntos están sobre una línea, la relación es funcional; si están alrededor de ella, es estadística. Si se agrupan en torno a una recta hay dependencia lineal: fuerte si están muy pegados, débil si están dispersos; positiva si la recta sube y negativa si baja.',
            'في سحابة النقاط كل فرد نقطة $(x,y)$. إذا كانت النقاط على خط فالعلاقة دالية، وإذا كانت حوله فهي إحصائية. وعندما تتجمّع حول مستقيم يوجد ارتباط خطي: قوي إذا كانت متلاصقة، وضعيف إذا كانت متفرقة؛ موجب إذا صعد المستقيم، وسالب إذا هبط.',
            'In the scatter plot each individual is a point $(x,y)$. If the points lie on a line, the relation is functional; if they lie around it, it is statistical. When they gather around a straight line there is linear dependence: strong if they are very close, weak if they are spread out; positive if the line rises and negative if it falls.'
        ),
        examplePrompt: say('Erortzen ari den objektu baten altuera eta denbora; 30 helduren altuera eta pisua. Zer erlazio dago kasu bakoitzean?', 'La altura de un objeto que cae y el tiempo; la estatura y el peso de 30 adultos. ¿Qué relación hay en cada caso?', 'ارتفاع جسم يسقط والزمن؛ وطول 30 بالغًا ووزنهم. ما العلاقة في كل حالة؟', 'The height of a falling object and the time; the height and weight of 30 adults. What relation is there in each case?'),
        example: '',
        exampleAnswer: say('Lehenengoa funtzionala da (formula batek ematen du altuera); bigarrena, estatistikoa eta positiboa.', 'La primera es funcional (una fórmula da la altura); la segunda, estadística y positiva.', 'الأولى دالية (صيغة تعطي الارتفاع)، والثانية إحصائية وموجبة.', 'The first is functional (a formula gives the height); the second, statistical and positive.')
    },
    quadrants: {
        definitions: [
            { term: say('Grabitate-zentroa', 'Centro de gravedad', 'مركز الثقل', 'Centre of gravity'), meaning: say('Bi batez bestekoen $(\\bar{x},\\bar{y})$ puntua; hodeia puntu horretan orekatzen da.', 'El punto $(\\bar{x},\\bar{y})$ de las dos medias; la nube se equilibra en él.', 'النقطة $(\\bar{x},\\bar{y})$ للمتوسطين؛ وتتوازن السحابة عندها.', 'The point $(\\bar{x},\\bar{y})$ of the two means; the cloud balances on it.') }
        ],
        vocabulary: [
            say('koadrantea', 'cuadrante', 'الربع', 'quadrant'),
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('biderkadura', 'producto', 'الجداء', 'product')
        ],
        explanation: say(
            '$x=\\bar{x}$ eta $y=\\bar{y}$ zuzenek planoa lau koadrantetan banatzen dute. Puntu bakoitzeko, $(x-\\bar{x})(y-\\bar{y})$ biderkadura zeinudun laukizuzen baten azalera da: positiboa goian eskuinean eta behean ezkerrean, negatiboa beste bietan. Positiboek irabazten badute, hodeiak gora egiten du.',
            'Las rectas $x=\\bar{x}$ e $y=\\bar{y}$ dividen el plano en cuatro cuadrantes. Para cada punto, el producto $(x-\\bar{x})(y-\\bar{y})$ es el área de un rectángulo con signo: positivo arriba a la derecha y abajo a la izquierda, negativo en los otros dos. Si ganan los positivos, la nube sube.',
            'يقسم المستقيمان $x=\\bar{x}$ و$y=\\bar{y}$ المستوى إلى أربعة أرباع. ولكل نقطة يكون الجداء $(x-\\bar{x})(y-\\bar{y})$ مساحة مستطيل لها إشارة: موجبة في الأعلى يمينًا وفي الأسفل يسارًا، وسالبة في الربعين الآخرين. وإذا غلبت الموجبة صعدت السحابة.',
            'The lines $x=\\bar{x}$ and $y=\\bar{y}$ split the plane into four quadrants. For each point, the product $(x-\\bar{x})(y-\\bar{y})$ is the area of a rectangle with a sign: positive up on the right and down on the left, negative in the other two. If the positives win, the cloud rises.'
        ),
        examplePrompt: say('Grabitate-zentroa $(5,\\,6)$ da. Zer zeinu du $(8,\\,2)$ puntuaren biderkadurak?', 'El centro de gravedad es $(5,\\,6)$. ¿Qué signo tiene el producto del punto $(8,\\,2)$?', 'مركز الثقل $(5,\\,6)$. ما إشارة جداء النقطة $(8,\\,2)$؟', 'The centre of gravity is $(5,\\,6)$. What sign does the product of the point $(8,\\,2)$ have?'),
        example: same('$(8-5)(2-6)=-12$'),
        exampleAnswer: say('Negatiboa: IV koadrantea, eskuinean eta behean.', 'Negativo: cuadrante IV, a la derecha y abajo.', 'سالب: الربع IV، يمينًا وفي الأسفل.', 'Negative: quadrant IV, on the right and below.')
    },

    /* ---------- 3. Covariance and correlation ---------- */
    covariance: {
        definitions: [
            { term: say('Kobariantza', 'Covarianza', 'التغاير', 'Covariance'), meaning: say('Puntu guztien $(x-\\bar{x})(y-\\bar{y})$ biderkaduren batez bestekoa; haren zeinua mendekotasunarena da.', 'La media de los productos $(x-\\bar{x})(y-\\bar{y})$ de todos los puntos; su signo es el de la dependencia.', 'متوسط الجداءات $(x-\\bar{x})(y-\\bar{y})$ لكل النقاط؛ وإشارته إشارة الارتباط.', 'The mean of the products $(x-\\bar{x})(y-\\bar{y})$ of all the points; its sign is that of the dependence.') }
        ],
        vocabulary: [
            say('batez bestekoa', 'media', 'المتوسط', 'mean'),
            say('kendu', 'restar', 'نطرح', 'subtract')
        ],
        explanation: say(
            'Kobariantza puntu guztien $(x-\\bar{x})(y-\\bar{y})$ biderkaduren batez bestekoa da: zenbaki batean laburtzen du hodeia nora doan. Kalkulatzeko, erosoagoa da $x\\cdot y$ biderkaduren batez bestekoa egitea eta batez bestekoen biderkadura kentzea.',
            'La covarianza es la media de los productos $(x-\\bar{x})(y-\\bar{y})$ de todos los puntos: resume en un número hacia dónde va la nube. Para calcularla es más cómodo hacer la media de los productos $x\\cdot y$ y restarle el producto de las medias.',
            'التغاير هو متوسط الجداءات $(x-\\bar{x})(y-\\bar{y})$ لكل النقاط: يلخّص في عدد واحد اتجاه السحابة. ولحسابه يسهل أن نأخذ متوسط الجداءات $x\\cdot y$ ونطرح منه جداء المتوسطين.',
            'The covariance is the mean of the products $(x-\\bar{x})(y-\\bar{y})$ of all the points: it sums up in one number where the cloud is going. To work it out, it is easier to take the mean of the products $x\\cdot y$ and subtract the product of the means.'
        ),
        examplePrompt: say('Bikoteak: $(1,\\,2)$, $(3,\\,2)$ eta $(5,\\,8)$. Zenbat da $\\sigma_{xy}$?', 'Pares: $(1,\\,2)$, $(3,\\,2)$ y $(5,\\,8)$. ¿Cuánto vale $\\sigma_{xy}$?', 'الأزواج: $(1,\\,2)$ و$(3,\\,2)$ و$(5,\\,8)$. كم $\\sigma_{xy}$؟', 'Pairs: $(1,\\,2)$, $(3,\\,2)$ and $(5,\\,8)$. What is $\\sigma_{xy}$?'),
        example: same('$\\frac{2+6+40}{3}-3\\cdot 4=4$'),
        exampleAnswer: say('$\\sigma_{xy}=4$: mendekotasun positiboa.', '$\\sigma_{xy}=4$: dependencia positiva.', '$\\sigma_{xy}=4$: ارتباط موجب.', '$\\sigma_{xy}=4$: positive dependence.'),
        why: {
            text: say(
                'Zergatik ematen dute gauza bera bi bideek? $(x-\\bar{x})(y-\\bar{y})$ garatu eta batez bestekoa eginez, batez bestekoak dituzten gaiak $-\\bar{x}\\,\\bar{y}$ geratzen dira. Koadranteen puntuekin: biderkaduren batura 12 zen, eta $x\\cdot y$ biderkaduren batez bestekoa, 14,4.',
                '¿Por qué los dos caminos dan lo mismo? Al desarrollar $(x-\\bar{x})(y-\\bar{y})$ y hacer la media, los términos con medias se quedan en $-\\bar{x}\\,\\bar{y}$. Con los puntos de los cuadrantes: la suma de los productos era 12, y la media de los $x\\cdot y$ es 14,4.',
                'لماذا يعطي الطريقان النتيجة نفسها؟ عند نشر $(x-\\bar{x})(y-\\bar{y})$ وأخذ المتوسط تبقى الحدود التي فيها المتوسطان $-\\bar{x}\\,\\bar{y}$. ومع نقاط الأرباع: كان مجموع الجداءات 12، ومتوسط $x\\cdot y$ يساوي 14.4.',
                'Why do the two ways give the same? Expanding $(x-\\bar{x})(y-\\bar{y})$ and taking the mean, the terms with means come down to $-\\bar{x}\\,\\bar{y}$. With the points of the quadrants: the sum of the products was 12, and the mean of the $x\\cdot y$ is 14.4.'
            ),
            math: same('$\\frac{12}{5}=2{,}4\\qquad\\frac{72}{5}-3\\cdot 4=2{,}4$')
        }
    },
    'correlation-coefficient': {
        definitions: [
            { term: say('Korrelazio-koefizientea', 'Coeficiente de correlación', 'معامل الارتباط', 'Correlation coefficient'), meaning: say('$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$, unitaterik gabeko zenbaki bat, −1 eta 1 artekoa.', '$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$, un número sin unidades entre −1 y 1.', '$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$، عدد بلا وحدات بين −1 و1.', '$r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$, a number without units between −1 and 1.') }
        ],
        vocabulary: [
            say('indarra', 'fuerza', 'القوة', 'strength'),
            say('unitatea', 'unidad', 'الوحدة', 'unit')
        ],
        explanation: say(
            'Kobariantzak hodeiaren noranzkoa ematen du, baina haren tamaina unitateen araberakoa da. $\\sigma_x\\,\\sigma_y$ biderkaduraz zatituz $r$ lortzen da: ez du unitaterik, eta beti −1 eta 1 artean dago; ±1 da puntuak zuzen baten gainean badaude, eta 0 ingurukoa mendekotasun linealik ez badago.',
            'La covarianza da el sentido de la nube, pero su tamaño depende de las unidades. Al dividirla entre $\\sigma_x\\,\\sigma_y$ se obtiene $r$, que no tiene unidades y siempre está entre −1 y 1: vale ±1 si los puntos están sobre una recta, y está cerca de 0 si no hay dependencia lineal.',
            'يعطي التغاير اتجاه السحابة، لكن حجمه يتعلق بالوحدات. وبقسمته على $\\sigma_x\\,\\sigma_y$ نحصل على $r$: لا وحدات له، ويقع دائمًا بين −1 و1؛ ويساوي ±1 إذا كانت النقاط على مستقيم، ويقترب من 0 إذا لم يوجد ارتباط خطي.',
            'The covariance gives the direction of the cloud, but its size depends on the units. Dividing it by $\\sigma_x\\,\\sigma_y$ gives $r$, which has no units and is always between −1 and 1: it is ±1 if the points lie on a straight line, and close to 0 if there is no linear dependence.'
        ),
        examplePrompt: say('$\\sigma_{xy}=-6$, $\\sigma_x=2$ eta $\\sigma_y=4$. Zenbat da r?', '$\\sigma_{xy}=-6$, $\\sigma_x=2$ y $\\sigma_y=4$. ¿Cuánto vale r?', '$\\sigma_{xy}=-6$ و$\\sigma_x=2$ و$\\sigma_y=4$. كم r؟', 'If $\\sigma_{xy}=-6$, $\\sigma_x=2$ and $\\sigma_y=4$, what is r?'),
        example: same('$r=\\frac{-6}{2\\cdot 4}=-0{,}75$'),
        exampleAnswer: say('$r=-0{,}75$: mendekotasun negatibo nahiko sendoa.', '$r=-0{,}75$: dependencia negativa bastante fuerte.', '$r=-0{,}75$: ارتباط سالب قوي نسبيًّا.', '$r=-0{,}75$: a fairly strong negative dependence.')
    },
    'units-change': {
        vocabulary: [
            say('unitatea', 'unidad', 'الوحدة', 'unit'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            "Unitatez aldatzea datuak eraldatzea da: $x'=a\\,x+b$. Batez bestekoa datuen modu berean aldatzen da; desbideratze tipikoa eta kobariantza $a$ bider egiten dira, $b$ batzeak ez baitu hodeiaren forma aldatzen. r koefizientean, goiko eta beheko $a$ sinplifikatu egiten dira: r koefizienteak ez du unitaterik.",
            "Cambiar de unidades es transformar los datos: $x'=a\\,x+b$. La media cambia igual que los datos; la desviación típica y la covarianza se multiplican por $a$, porque sumar $b$ no cambia la forma de la nube. En r, la $a$ de arriba y la de abajo se simplifican: r no tiene unidades.",
            "تغيير الوحدات تحويل للبيانات: $x'=a\\,x+b$. يتغيّر المتوسط كما تتغيّر البيانات، ويُضرب الانحراف المعياري والتغاير في $a$، لأن إضافة $b$ لا تغيّر شكل السحابة. وفي r تُختصر $a$ في البسط والمقام: لا وحدات لـ r.",
            "Changing the units is transforming the data: $x'=a\\,x+b$. The mean changes like the data; the standard deviation and the covariance are multiplied by $a$, because adding $b$ does not change the shape of the cloud. In r, the $a$ on top and the one below cancel: r has no units."
        ),
        examplePrompt: say('Tenperaturak °C-tan daudela, salmentekiko korrelazioa $r=-0{,}7$ da. Zenbat da r tenperaturak °F-tan emanda, $F=1{,}8\\,C+32$?', 'Con las temperaturas en °C, la correlación con las ventas es $r=-0{,}7$. ¿Cuánto vale r con las temperaturas en °F, $F=1{,}8\\,C+32$?', 'مع درجات الحرارة بالدرجة المئوية الارتباط بالمبيعات $r=-0{,}7$. كم r مع درجات الحرارة بالفهرنهايت $F=1{,}8\\,C+32$؟', 'With the temperatures in °C, the correlation with sales is $r=-0{,}7$. What is r with the temperatures in °F, $F=1{,}8\\,C+32$?'),
        example: same('$a=1{,}8>0\\ \\to\\ r=-0{,}7$'),
        exampleAnswer: say('$r=-0{,}7$ izaten jarraitzen du.', 'Sigue siendo $r=-0{,}7$.', 'يبقى $r=-0{,}7$.', 'It is still $r=-0{,}7$.'),
        why: {
            text: say(
                'Zergatik ez da r aldatzen? Goian $a\\,\\sigma_{xy}$ dago eta behean $a\\,\\sigma_x\\cdot\\sigma_y$: $a$ sinplifikatu egiten da. $a$ negatiboa bada, desbideratzea positiboa da oraindik, baina kobariantzak zeinua aldatzen du, eta r koefizienteak ere bai.',
                '¿Por qué no cambia r? Arriba queda $a\\,\\sigma_{xy}$ y abajo $a\\,\\sigma_x\\cdot\\sigma_y$: la $a$ se simplifica. Si $a$ es negativa, la desviación sigue siendo positiva, pero la covarianza cambia de signo, y r también.',
                'لماذا لا يتغير r؟ في البسط $a\\,\\sigma_{xy}$ وفي المقام $a\\,\\sigma_x\\cdot\\sigma_y$: فتُختصر $a$. وإذا كانت $a$ سالبة يبقى الانحراف موجبًا، لكن التغاير يغيّر إشارته، وكذلك r.',
                'Why does r not change? On top there is $a\\,\\sigma_{xy}$ and below $a\\,\\sigma_x\\cdot\\sigma_y$: the $a$ cancels. If $a$ is negative, the deviation is still positive, but the covariance changes sign, and so does r.'
            ),
            math: same('$\\frac{100\\cdot 0{,}48}{100\\cdot 0{,}1\\cdot 8}=0{,}6$')
        }
    },

    /* ---------- 4. Regression lines ---------- */
    'regression-yx': {
        definitions: [
            { term: say('Erregresio-zuzena', 'Recta de regresión', 'مستقيم الانحدار', 'Regression line'), meaning: say('Hodeiari hobekien egokitzen zaion zuzena; Y-ren X-rekikoak x-tik y estimatzeko balio du.', 'La recta que mejor se ajusta a la nube; la de Y sobre X sirve para estimar y a partir de x.', 'المستقيم الأكثر ملاءمة للسحابة؛ ومستقيم Y على X يفيد في تقدير y انطلاقًا من x.', 'The straight line that best fits the cloud; the one of Y on X is used to estimate y from x.') }
        ],
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('estimatu', 'estimar', 'التقدير', 'estimate')
        ],
        explanation: say(
            'Y-ren X-rekiko erregresio-zuzena hodeiari hobekien jarraitzen diona da y aurreikusteko: puntuetatik zuzenerainoko distantzia bertikalen karratuak txikienak egiten dituena. Grabitate-zentrotik, $(\\bar{x},\\bar{y})$ puntutik, pasatzen da, eta haren malda $\\frac{\\sigma_{xy}}{\\sigma_x^2}$ da.',
            'La recta de regresión de Y sobre X es la que mejor sigue a la nube para predecir y: la que hace mínimos los cuadrados de las distancias verticales de los puntos a la recta. Pasa por el centro de gravedad $(\\bar{x},\\bar{y})$ y su pendiente es $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.',
            'مستقيم انحدار Y على X هو الذي يتبع السحابة أفضل من غيره لتوقّع y: يجعل مربعات المسافات الرأسية من النقاط إلى المستقيم أصغر ما يمكن. ويمرّ بمركز الثقل $(\\bar{x},\\bar{y})$، وميله $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.',
            'The regression line of Y on X is the one that follows the cloud best to predict y: the one that makes the squares of the vertical distances from the points to the line as small as possible. It passes through the centre of gravity $(\\bar{x},\\bar{y})$ and its slope is $\\frac{\\sigma_{xy}}{\\sigma_x^2}$.'
        ),
        examplePrompt: say('$\\bar{x}=6$, $\\bar{y}=3$, $\\sigma_x^2=4$ eta $\\sigma_{xy}=-2$. Zein da Y-ren X-rekiko zuzena?', '$\\bar{x}=6$, $\\bar{y}=3$, $\\sigma_x^2=4$ y $\\sigma_{xy}=-2$. ¿Cuál es la recta de Y sobre X?', '$\\bar{x}=6$ و$\\bar{y}=3$ و$\\sigma_x^2=4$ و$\\sigma_{xy}=-2$. ما مستقيم انحدار Y على X؟', 'If $\\bar{x}=6$, $\\bar{y}=3$, $\\sigma_x^2=4$ and $\\sigma_{xy}=-2$, what is the line of Y on X?'),
        example: same('$y-3=-0{,}5\\,(x-6)\\ \\to\\ y=-0{,}5x+6$'),
        exampleAnswer: same('$y=-0{,}5x+6$')
    },
    estimation: {
        definitions: [
            { term: say('Fidagarritasuna', 'Fiabilidad', 'الموثوقية', 'Reliability'), meaning: say('Estimazio batek merezi duen konfiantza: handiagoa r ±1 zenbakitik hurbilago dagoenean.', 'La confianza que merece una estimación: mayor cuanto más cerca de ±1 está r.', 'الثقة التي يستحقها التقدير: أكبر كلما اقترب r من ±1.', 'How much an estimate can be trusted: more the closer r is to ±1.') },
            { term: say('Estrapolatzea', 'Extrapolar', 'الاستقراء خارج المجال', 'Extrapolating'), meaning: say('Datuen tartetik kanpo estimatzea; arriskutsua da, r handia izan arren.', 'Estimar fuera del intervalo de los datos; es arriesgado aunque r sea alto.', 'التقدير خارج مجال البيانات؛ وهو مخاطرة ولو كان r كبيرًا.', 'Estimating outside the range of the data; it is risky even if r is high.') }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'المجال', 'range'),
            say('zuzena', 'recta', 'المستقيم', 'line')
        ],
        explanation: say(
            'y estimatzeko, x ordezkatzen da erregresio-zuzenean. Zuzenak beti ematen du zenbaki bat, baina ez du beti konfiantzarik merezi: merezi du |r| 1 zenbakitik hurbil badago, puntuak zuzenetik hurbil daudelako, eta x datuen tartearen barruan badago. Tartetik kanpo, joera alda daiteke.',
            'Para estimar y se sustituye x en la recta de regresión. La recta siempre da un número, pero no siempre merece confianza: la merece si |r| está cerca de 1, porque los puntos están pegados a la recta, y si x está dentro del intervalo de los datos. Fuera de él, la tendencia puede cambiar.',
            'لتقدير y نعوّض x في مستقيم الانحدار. يعطي المستقيم عددًا دائمًا، لكنه لا يستحق الثقة دائمًا: يستحقها إذا كان |r| قريبًا من 1، لأن النقاط ملتصقة بالمستقيم، وإذا كانت x داخل مجال البيانات. وخارجه قد يتغيّر الاتجاه.',
            'To estimate y, substitute x in the regression line. The line always gives a number, but it does not always deserve trust: it does if |r| is close to 1, because the points are close to the line, and if x is within the range of the data. Outside it, the trend may change.'
        ),
        examplePrompt: say('$y=2x+5$ zuzena, $r=0{,}95$ izanik, eta x datuak 1 eta 6 artean. Estimatu y, $x=4$ denean.', 'Recta $y=2x+5$, con $r=0{,}95$ y los datos de x entre 1 y 6. Estima y para $x=4$.', 'المستقيم $y=2x+5$ مع $r=0{,}95$، وبيانات x بين 1 و6. قدّر y عندما $x=4$.', 'Line $y=2x+5$, with $r=0{,}95$ and the x data between 1 and 6. Estimate y for $x=4$.'),
        example: same('$2\\cdot 4+5=13$'),
        exampleAnswer: say('13: fidagarria, r 1 zenbakitik hurbil dagoelako eta 4 datuen barruan dagoelako.', '13: fiable, porque r está cerca de 1 y 4 está dentro de los datos.', '13: موثوق لأن r قريب من 1 و4 داخل البيانات.', '13: reliable, because r is close to 1 and 4 is within the data.')
    },
    'regression-xy': {
        vocabulary: [
            say('horizontala', 'horizontal', 'أفقي', 'horizontal'),
            say('askatu', 'despejar', 'نعزل', 'solve for')
        ],
        explanation: say(
            'Y-ren X-rekiko zuzenak distantzia bertikalak txikitzen ditu, eta y estimatzeko balio du. x estimatzeko bestea behar da, X-ren Y-rekikoa, distantzia horizontalak txikitzen dituena. Hau ere $(\\bar{x},\\bar{y})$ puntutik pasatzen da, baina haren koefizientea $\\frac{\\sigma_{xy}}{\\sigma_y^2}$ da.',
            'La recta de Y sobre X hace mínimas las distancias verticales y sirve para estimar y. Para estimar x hace falta la otra, la de X sobre Y, que hace mínimas las distancias horizontales. También pasa por $(\\bar{x},\\bar{y})$, pero su coeficiente es $\\frac{\\sigma_{xy}}{\\sigma_y^2}$.',
            'مستقيم Y على X يجعل المسافات الرأسية أصغر ما يمكن ويفيد في تقدير y. ولتقدير x نحتاج إلى الآخر، مستقيم X على Y، الذي يجعل المسافات الأفقية أصغر ما يمكن. ويمرّ هو أيضًا بـ $(\\bar{x},\\bar{y})$، لكن معامله $\\frac{\\sigma_{xy}}{\\sigma_y^2}$.',
            'The line of Y on X makes the vertical distances as small as possible and is used to estimate y. To estimate x you need the other one, the line of X on Y, which makes the horizontal distances as small as possible. It also passes through $(\\bar{x},\\bar{y})$, but its coefficient is $\\frac{\\sigma_{xy}}{\\sigma_y^2}$.'
        ),
        examplePrompt: say('$\\bar{x}=10$, $\\bar{y}=4$, $\\sigma_y^2=2$ eta $\\sigma_{xy}=-3$. Estimatu x, $y=6$ denean.', '$\\bar{x}=10$, $\\bar{y}=4$, $\\sigma_y^2=2$ y $\\sigma_{xy}=-3$. Estima x para $y=6$.', '$\\bar{x}=10$ و$\\bar{y}=4$ و$\\sigma_y^2=2$ و$\\sigma_{xy}=-3$. قدّر x عندما $y=6$.', 'If $\\bar{x}=10$, $\\bar{y}=4$, $\\sigma_y^2=2$ and $\\sigma_{xy}=-3$, estimate x for $y=6$.'),
        example: same('$x=10-1{,}5\\cdot(6-4)=7$'),
        exampleAnswer: say('$x=7$ ateratzen da.', 'Sale $x=7$.', 'نجد $x=7$.', 'It gives $x=7$.'),
        why: {
            text: say(
                'Zergatik daude bi zuzen? Puntuak lerroan ez badaude, y hobekien aurreikusten duen zuzena, errore bertikalekin, ez da x hobekien aurreikusten duena, errore horizontalekin. $|r|=1$ denean ez dago errorerik, eta bi zuzenak bat dira.',
                '¿Por qué hay dos rectas? Si los puntos no están en línea, la recta que mejor predice y, con errores verticales, no es la que mejor predice x, con errores horizontales. Cuando $|r|=1$ no hay errores y las dos rectas son la misma.',
                'لماذا يوجد مستقيمان؟ إذا لم تكن النقاط على خط فالمستقيم الذي يتوقّع y أفضل، بأخطاء رأسية، ليس الذي يتوقّع x أفضل، بأخطاء أفقية. وعندما $|r|=1$ لا توجد أخطاء ويكون المستقيمان واحدًا.',
                'Why are there two lines? If the points are not in line, the line that best predicts y, with vertical errors, is not the one that best predicts x, with horizontal errors. When $|r|=1$ there are no errors and the two lines are the same.'
            )
        }
    },
    'two-lines': {
        vocabulary: [
            say('angelua', 'ángulo', 'الزاوية', 'angle'),
            say('perpendikularra', 'perpendicular', 'التعامد', 'perpendicular'),
            say('ebaki', 'cortar', 'يتقاطع', 'cross')
        ],
        explanation: say(
            'Bi erregresio-zuzenak grabitate-zentrotik pasatzen dira; beraz, $(\\bar{x},\\bar{y})$ puntuan ebakitzen dira. $m_{yx}=\\frac{\\sigma_{xy}}{\\sigma_x^2}$ eta $m_{xy}=\\frac{\\sigma_{xy}}{\\sigma_y^2}$ direnez, haien biderkadura $r^2$ da. Horregatik, haien arteko angeluak korrelazioa neurtzen du: guraize itxiak sendoa bada, irekiak ahula bada.',
            'Las dos rectas de regresión pasan por el centro de gravedad, así que se cortan en $(\\bar{x},\\bar{y})$. Como $m_{yx}=\\frac{\\sigma_{xy}}{\\sigma_x^2}$ y $m_{xy}=\\frac{\\sigma_{xy}}{\\sigma_y^2}$, su producto es $r^2$. Por eso el ángulo entre ellas mide la correlación: cerradas como unas tijeras si es fuerte, abiertas si es débil.',
            'يمرّ مستقيما الانحدار بمركز الثقل، فيتقاطعان في $(\\bar{x},\\bar{y})$. وبما أن $m_{yx}=\\frac{\\sigma_{xy}}{\\sigma_x^2}$ و$m_{xy}=\\frac{\\sigma_{xy}}{\\sigma_y^2}$ فجداؤهما $r^2$. لذلك تقيس الزاوية بينهما الارتباط: مقصّ مغلق إذا كان قويًّا، ومفتوح إذا كان ضعيفًا.',
            'The two regression lines pass through the centre of gravity, so they cross at $(\\bar{x},\\bar{y})$. Since $m_{yx}=\\frac{\\sigma_{xy}}{\\sigma_x^2}$ and $m_{xy}=\\frac{\\sigma_{xy}}{\\sigma_y^2}$, their product is $r^2$. That is why the angle between them measures the correlation: closed like scissors if it is strong, open if it is weak.'
        ),
        examplePrompt: say('Erregresio-zuzenak $y=-1{,}6x+18$ eta $x=-0{,}4y+9$ dira. Zenbat da r?', 'Las rectas de regresión son $y=-1{,}6x+18$ y $x=-0{,}4y+9$. ¿Cuánto vale r?', 'مستقيما الانحدار هما $y=-1{,}6x+18$ و$x=-0{,}4y+9$. كم r؟', 'The regression lines are $y=-1{,}6x+18$ and $x=-0{,}4y+9$. What is r?'),
        example: same('$r^2=(-1{,}6)\\cdot(-0{,}4)=0{,}64\\qquad r=-0{,}8$'),
        exampleAnswer: say('$r=-0{,}8$: koefizienteak negatiboak dira.', '$r=-0{,}8$: los coeficientes son negativos.', '$r=-0{,}8$: المعاملان سالبان.', '$r=-0{,}8$: the coefficients are negative.'),
        why: {
            text: say(
                'Zergatik da biderkadura $r^2$? Bi maldak biderkatuz, goian $\\sigma_{xy}^2$ geratzen da eta behean $\\sigma_x^2\\,\\sigma_y^2$, hau da, $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$ koefizientearen karratua. Gainera, biek $\\sigma_{xy}$ kobariantzaren zeinua dute, r koefizientearena.',
                '¿Por qué el producto es $r^2$? Al multiplicar las dos pendientes, arriba queda $\\sigma_{xy}^2$ y abajo $\\sigma_x^2\\,\\sigma_y^2$, que es el cuadrado de $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$. Además, las dos tienen el signo de $\\sigma_{xy}$, que es el de r.',
                'لماذا الجداء $r^2$؟ عند ضرب الميلين يبقى في البسط $\\sigma_{xy}^2$ وفي المقام $\\sigma_x^2\\,\\sigma_y^2$، وهو مربع $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$. وللميلين أيضًا إشارة $\\sigma_{xy}$، وهي إشارة r.',
                'Why is the product $r^2$? Multiplying the two slopes leaves $\\sigma_{xy}^2$ on top and $\\sigma_x^2\\,\\sigma_y^2$ below, which is the square of $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$. Also, both have the sign of $\\sigma_{xy}$, which is that of r.'
            ),
            math: same('$\\frac{\\sigma_{xy}}{\\sigma_x^2}\\cdot\\frac{\\sigma_{xy}}{\\sigma_y^2}=\\frac{\\sigma_{xy}^2}{\\sigma_x^2\\,\\sigma_y^2}=r^2$')
        }
    },

    /* ---------- 5. Full problems ---------- */
    'grouped-pairs': {
        vocabulary: [
            say('klase-marka', 'marca de clase', 'مركز الفئة', 'class mark'),
            say('gelaxka', 'casilla', 'الخانة', 'cell')
        ],
        explanation: say(
            'Datu asko daudenean, aldagai bakoitza tarteetan multzokatzen da, eta sarrera bikoitzeko taulak tarte-bikote bakoitzeko banakoak zenbatzen ditu. Klase-markekin lan egiten da: batez bestekoak eta bariantzak marjinaletatik ateratzen dira, eta kobariantzan marken biderkadura bakoitza bere gelaxkaren maiztasunaz biderkatzen da.',
            'Cuando hay muchos datos, cada variable se agrupa en intervalos y la tabla de doble entrada cuenta los individuos de cada pareja de intervalos. Se trabaja con las marcas de clase: las medias y las varianzas salen de las marginales, y en la covarianza cada producto de marcas se multiplica por la frecuencia de su casilla.',
            'عندما تكثر البيانات يُجمَّع كل متغير في فئات، ويعدّ الجدول مزدوج المدخل أفراد كل زوج من الفئات. ونعمل بمراكز الفئات: يخرج المتوسطان والتباينان من التوزيعين الهامشيين، وفي التغاير يُضرب كل جداء لمركزين في تكرار خانته.',
            'When there are many data, each variable is grouped in intervals and the two-way table counts the individuals of each pair of intervals. You work with the class marks: the means and the variances come from the marginals, and in the covariance each product of marks is multiplied by the frequency of its cell.'
        ),
        examplePrompt: say('Markak: $x=2$ eta $x=4$; $y=1$ eta $y=5$. Gelaxkak: $(2,\\,1)$: 3, $(2,\\,5)$: 1, $(4,\\,1)$: 1 eta $(4,\\,5)$: 3. Zenbat da $\\sigma_{xy}$?', 'Marcas: $x=2$ y $x=4$; $y=1$ e $y=5$. Casillas: $(2,\\,1)$: 3, $(2,\\,5)$: 1, $(4,\\,1)$: 1 y $(4,\\,5)$: 3. ¿Cuánto vale $\\sigma_{xy}$?', 'المراكز: $x=2$ و$x=4$؛ $y=1$ و$y=5$. الخانات: $(2,\\,1)$: 3، $(2,\\,5)$: 1، $(4,\\,1)$: 1، $(4,\\,5)$: 3. كم $\\sigma_{xy}$؟', 'Marks: $x=2$ and $x=4$; $y=1$ and $y=5$. Cells: $(2,\\,1)$: 3, $(2,\\,5)$: 1, $(4,\\,1)$: 1 and $(4,\\,5)$: 3. What is $\\sigma_{xy}$?'),
        example: same('$\\frac{6+10+4+60}{8}-3\\cdot 3=1$'),
        exampleAnswer: say('$\\sigma_{xy}=1$, $\\bar{x}=\\bar{y}=3$ izanik.', '$\\sigma_{xy}=1$, con $\\bar{x}=\\bar{y}=3$.', '$\\sigma_{xy}=1$، مع $\\bar{x}=\\bar{y}=3$.', '$\\sigma_{xy}=1$, with $\\bar{x}=\\bar{y}=3$.')
    },
    'calculation-table': {
        vocabulary: [
            say('zutabea', 'columna', 'العمود', 'column'),
            say('batura', 'suma', 'المجموع', 'sum'),
            say('kalkulagailua', 'calculadora', 'الآلة الحاسبة', 'calculator')
        ],
        explanation: say(
            'Problema oso batean, komeni da taula bat egitea, bikote bakoitzeko errenkada batekin eta $x$, $y$, $x^2$, $y^2$ eta $x\\,y$ zutabeekin. Haren bost baturekin batez bestekoak, bariantzak eta kobariantza kalkulatzen dira, eta handik r eta zuzenak. Kontuz: $\\sum x^2$ eta $(\\sum x)^2$ ez dira gauza bera.',
            'En un problema completo conviene hacer una tabla con una fila por par y las columnas $x$, $y$, $x^2$, $y^2$ y $x\\,y$. Con sus cinco sumas se calculan las medias, las varianzas y la covarianza, y de ahí r y las rectas. Ojo: $\\sum x^2$ no es lo mismo que $(\\sum x)^2$.',
            'في مسألة كاملة يحسن أن نصنع جدولًا فيه سطر لكل زوج، وعمود لكل من $x$ و$y$ و$x^2$ و$y^2$ و$x\\,y$. وبمجموع كل عمود نحسب المتوسطين والتباينين والتغاير، ومنها r والمستقيمين. انتبه: $\\sum x^2$ ليس هو $(\\sum x)^2$.',
            'In a full problem it helps to make a table with one row per pair and the columns $x$, $y$, $x^2$, $y^2$ and $x\\,y$. With its five sums you work out the means, the variances and the covariance, and from them r and the lines. Careful: $\\sum x^2$ is not the same as $(\\sum x)^2$.'
        ),
        examplePrompt: say('Bikoteak: $(1,\\,2)$, $(2,\\,8)$, $(4,\\,4)$ eta $(5,\\,10)$. Zenbat da r?', 'Pares: $(1,\\,2)$, $(2,\\,8)$, $(4,\\,4)$ y $(5,\\,10)$. ¿Cuánto vale r?', 'الأزواج: $(1,\\,2)$ و$(2,\\,8)$ و$(4,\\,4)$ و$(5,\\,10)$. كم r؟', 'Pairs: $(1,\\,2)$, $(2,\\,8)$, $(4,\\,4)$ and $(5,\\,10)$. What is r?'),
        example: same('$r=\\frac{3}{\\sqrt{2{,}5\\cdot 10}}=0{,}6$'),
        exampleAnswer: say('$r=0{,}6$, $\\sigma_{xy}=3$ eta $\\sigma_y^2=10$ izanik.', '$r=0{,}6$, con $\\sigma_{xy}=3$ y $\\sigma_y^2=10$.', '$r=0{,}6$، مع $\\sigma_{xy}=3$ و$\\sigma_y^2=10$.', '$r=0{,}6$, with $\\sigma_{xy}=3$ and $\\sigma_y^2=10$.')
    },
    'inverse-problems': {
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('posiblea', 'posible', 'ممكن', 'possible')
        ],
        explanation: say(
            'Batzuetan zuzenak ezagutzen dira, eta datuak bilatzen. Grabitate-zentroa bi zuzenen ebakidura-puntua da; kobariantza malda batetik ateratzen da, $\\sigma_{xy}=m_{yx}\\,\\sigma_x^2$; eta r, $r^2=m_{yx}\\cdot m_{xy}$ berdintzatik. Zuzen-bikote bat posible da bakarrik haien koefizienteek zeinu bera badute eta haien biderkadura 1 baino handiagoa ez bada.',
            'A veces se conocen las rectas y se buscan los datos. El centro de gravedad es el punto de corte de las dos rectas; la covarianza sale de una pendiente, $\\sigma_{xy}=m_{yx}\\,\\sigma_x^2$; y r, de $r^2=m_{yx}\\cdot m_{xy}$. Un par de rectas solo es posible si sus coeficientes tienen el mismo signo y su producto no pasa de 1.',
            'أحيانًا نعرف المستقيمين ونبحث عن البيانات. مركز الثقل نقطة تقاطع المستقيمين؛ والتغاير يخرج من ميل: $\\sigma_{xy}=m_{yx}\\,\\sigma_x^2$؛ وr من $r^2=m_{yx}\\cdot m_{xy}$. ولا يكون زوج المستقيمين ممكنًا إلا إذا كان للمعاملين الإشارة نفسها ولم يتجاوز جداؤهما 1.',
            'Sometimes the lines are known and the data are what you look for. The centre of gravity is where the two lines cross; the covariance comes from a slope, $\\sigma_{xy}=m_{yx}\\,\\sigma_x^2$; and r, from $r^2=m_{yx}\\cdot m_{xy}$. A pair of lines is only possible if their coefficients have the same sign and their product is not more than 1.'
        ),
        examplePrompt: say('X-ren Y-rekiko zuzena $x=0{,}5y+2$ da, $\\bar{y}=6$ eta $\\sigma_y=2$ izanik. Aurkitu $\\bar{x}$ eta $\\sigma_{xy}$.', 'La recta de X sobre Y es $x=0{,}5y+2$, con $\\bar{y}=6$ y $\\sigma_y=2$. Halla $\\bar{x}$ y $\\sigma_{xy}$.', 'مستقيم انحدار X على Y هو $x=0{,}5y+2$، مع $\\bar{y}=6$ و$\\sigma_y=2$. أوجد $\\bar{x}$ و$\\sigma_{xy}$.', 'The line of X on Y is $x=0{,}5y+2$, with $\\bar{y}=6$ and $\\sigma_y=2$. Find $\\bar{x}$ and $\\sigma_{xy}$.'),
        example: same('$\\bar{x}=0{,}5\\cdot 6+2=5\\qquad\\sigma_{xy}=0{,}5\\cdot 2^2=2$'),
        exampleAnswer: say('$\\bar{x}=5$ eta $\\sigma_{xy}=2$.', '$\\bar{x}=5$ y $\\sigma_{xy}=2$.', '$\\bar{x}=5$ و$\\sigma_{xy}=2$.', '$\\bar{x}=5$ and $\\sigma_{xy}=2$.')
    }
}

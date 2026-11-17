import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { Bach2gApplicationsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 2 · Gizarte Zientziak — what each
   lesson tells: the new words, a short explanation, the example as an
   exercise with numbers of its own, the key words and, in four lessons,
   «Why does it work?». Plain data so the tests can import it.
   ========================================================================== */

export const bach2gApplicationsLessonTexts: Record<Bach2gApplicationsTopicId, LessonTexts> = {
    /* ---------- 1. The tangent line ---------- */
    'tangent-line': {
        definitions: [
            { term: say('Zuzen ukitzailea', 'Recta tangente', 'المماس', 'Tangent line'), meaning: say('Puntu batean kurbaren malda bera duen zuzena: $y-f(a)=f\'(a)(x-a)$.', 'La recta con la misma pendiente que la curva en un punto: $y-f(a)=f\'(a)(x-a)$.', 'المستقيم الذي له ميل المنحنى نفسه عند نقطة: $y-f(a)=f\'(a)(x-a)$.', 'The line with the same slope as the curve at a point: $y-f(a)=f\'(a)(x-a)$.') }
        ],
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('puntua', 'punto', 'النقطة', 'point'),
            say('hurbildu', 'aproximar', 'التقريب', 'approximate')
        ],
        explanation: say(
            'Zuzen ukitzailea idazteko bi gauza behar dira: puntua, $(a,f(a))$, eta malda, $f\'(a)$. Puntutik gertu, zuzenak eta kurbak ia bat egiten dute; horregatik, zuzen ukitzailea erabil daiteke funtzioaren balioak gutxi gorabehera aurreikusteko.',
            'Para escribir la tangente hacen falta dos cosas: el punto, $(a,f(a))$, y la pendiente, $f\'(a)$. Cerca del punto, la recta y la curva casi coinciden; por eso la tangente sirve para prever de forma aproximada los valores de la función.',
            'لكتابة المماس يلزم أمران: النقطة $(a,f(a))$ والميل $f\'(a)$. وقرب النقطة يكاد المستقيم والمنحنى يتطابقان؛ لذلك يصلح المماس لتوقّع قيم الدالة تقريبيًا.',
            'To write the tangent you need two things: the point, $(a,f(a))$, and the slope, $f\'(a)$. Near the point, the line and the curve almost coincide; so the tangent can forecast the values of the function roughly.'
        ),
        examplePrompt: say('Idatzi $g(x)=x^2+4x$ kurbaren zuzen ukitzailea $x=1$ puntuan.', 'Escribe la tangente a $g(x)=x^2+4x$ en $x=1$.', 'اكتب مماس $g(x)=x^2+4x$ عند $x=1$.', 'Write the tangent to $g(x)=x^2+4x$ at $x=1$.'),
        example: same("$g(1)=5\\qquad g'(1)=6\\qquad y=6x-1$"),
        exampleAnswer: say('Puntua $(1,5)$ eta malda 6: $y=6x-1$.', 'Punto $(1,5)$ y pendiente 6: $y=6x-1$.', 'النقطة $(1,5)$ والميل 6: ‏$y=6x-1$.', 'Point $(1,5)$ and slope 6: $y=6x-1$.')
    },
    'parallel-tangent': {
        definitions: [
            { term: say('Zuzen paraleloak', 'Rectas paralelas', 'المستقيمات المتوازية', 'Parallel lines'), meaning: say('Malda bera duten zuzenak: $y=mx+n$ eta $y=mx+n\'$.', 'Rectas con la misma pendiente: $y=mx+n$ e $y=mx+n\'$.', 'مستقيمات لها الميل نفسه: $y=mx+n$ و$y=mx+n\'$.', 'Lines with the same slope: $y=mx+n$ and $y=mx+n\'$.') }
        ],
        vocabulary: [
            say('horizontala', 'horizontal', 'أفقي', 'horizontal'),
            say('ekuazioa', 'ecuación', 'المعادلة', 'equation')
        ],
        explanation: say(
            'Zuzen ukitzailea zuzen jakin baten paraleloa izateko, malda bera izan behar du. Beraz, $f\'(x)=m$ ekuazioa ebazten da: soluzio bakoitza puntu bat da. Zuzen horizontal baterako, $m=0$, eta puntu horiek maximo edo minimo izan daitezke.',
            'Para que la tangente sea paralela a una recta dada, tiene que tener su misma pendiente. Así que se resuelve la ecuación $f\'(x)=m$: cada solución es un punto. Para una recta horizontal, $m=0$, y esos puntos pueden ser máximos o mínimos.',
            'ليكون المماس موازيًا لمستقيم معلوم يجب أن يكون له ميله نفسه. لذا نحل المعادلة $f\'(x)=m$: وكل حل نقطة. ومع مستقيم أفقي $m=0$، وقد تكون تلك النقاط قيمًا عظمى أو صغرى.',
            'For the tangent to be parallel to a given line, it must have the same slope. So the equation $f\'(x)=m$ is solved: each solution is a point. For a horizontal line, $m=0$, and those points may be maxima or minima.'
        ),
        examplePrompt: say('Zein puntutan da $g(x)=x^3$ kurbaren zuzen ukitzailea $y=12x$ zuzenaren paraleloa?', '¿En qué puntos la tangente a $g(x)=x^3$ es paralela a $y=12x$?', 'عند أي نقاط يكون مماس $g(x)=x^3$ موازيًا للمستقيم $y=12x$؟', 'At which points is the tangent to $g(x)=x^3$ parallel to $y=12x$?'),
        example: same("$g'(x)=3x^2=12\\ \\to\\ x=\\pm 2$"),
        exampleAnswer: say('Bi puntutan: $(2,8)$ eta $(-2,-8)$.', 'En dos puntos: $(2,8)$ y $(-2,-8)$.', 'في نقطتين: $(2,8)$ و$(-2,-8)$.', 'At two points: $(2,8)$ and $(-2,-8)$.')
    },
    'inflection-tangent': {
        definitions: [
            { term: say('Inflexio-puntua', 'Punto de inflexión', 'نقطة الانعطاف', 'Point of inflection'), meaning: say('Kurbadura aldatzen den puntua: $f\'\'=0$ eta zeinuz aldatzen da.', 'El punto donde cambia la curvatura: $f\'\'=0$ y cambia de signo.', 'النقطة التي يتغير فيها التقعّر: $f\'\'=0$ وتتغير إشارتها.', 'The point where the curvature changes: $f\'\'=0$ and it changes sign.') }
        ],
        vocabulary: [
            say('kurbadura', 'curvatura', 'التقعّر', 'curvature'),
            say('zeharkatu', 'atravesar', 'يعبر', 'cross')
        ],
        explanation: say(
            'Normalean kurba zuzen ukitzailearen alde batean geratzen da. Inflexio-puntuan, ordea, alde batetik bestera pasatzen da: zuzena zeharkatzen du. Hori aurkitzeko, $f\'\'(x)=0$ ebazten da, eta gero zuzen ukitzailea ohiko moduan idazten da.',
            'Normalmente la curva queda a un lado de la tangente. En el punto de inflexión, en cambio, pasa de un lado al otro: llega a atravesar la recta. Para encontrarlo se resuelve $f\'\'(x)=0$, y después se escribe la tangente como siempre.',
            'عادةً يبقى المنحنى في جهة واحدة من المماس. أما عند نقطة الانعطاف فينتقل من جهة إلى أخرى: يعبر المستقيم. ولإيجادها نحل $f\'\'(x)=0$ ثم نكتب المماس كالمعتاد.',
            'Usually the curve stays on one side of the tangent. At the point of inflection, however, it passes from one side to the other: it crosses the line. To find it, solve $f\'\'(x)=0$, then write the tangent as usual.'
        ),
        examplePrompt: say('Aurkitu $g(x)=x^3+6x^2$ funtzioaren inflexio-puntua eta han zuzen ukitzailearen malda.', 'Halla el punto de inflexión de $g(x)=x^3+6x^2$ y la pendiente de la tangente allí.', 'أوجد نقطة انعطاف $g(x)=x^3+6x^2$ وميل المماس فيها.', 'Find the point of inflection of $g(x)=x^3+6x^2$ and the slope of the tangent there.'),
        example: same("$\\begin{gathered}g''(x)=6x+12=0\\ \\to\\ x=-2\\\\ g'(-2)=12-24=-12\\end{gathered}$"),
        exampleAnswer: say('Inflexioa $(-2,16)$ puntuan, malda $-12$ duela.', 'Inflexión en $(-2,16)$, con pendiente $-12$.', 'انعطاف عند $(-2,16)$ بميل $-12$.', 'Inflection at $(-2,16)$, with slope $-12$.')
    },

    /* ---------- 2. Increase and decrease ---------- */
    sign: {
        definitions: [
            { term: say('Funtzio gorakorra', 'Función creciente', 'دالة متزايدة', 'Increasing function'), meaning: say('$x$ handitzean $f(x)$ ere handitzen da: grafikoa gora doa ezkerretik eskuinera.', 'Al aumentar $x$ también aumenta $f(x)$: la gráfica sube de izquierda a derecha.', 'عندما يزداد $x$ يزداد $f(x)$ أيضًا: يصعد التمثيل من اليسار إلى اليمين.', 'As $x$ increases, $f(x)$ increases too: the graph rises from left to right.') }
        ],
        vocabulary: [
            say('beherakorra', 'decreciente', 'متناقصة', 'decreasing'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Deribatua malda da. Malda positiboa bada, grafikoa igotzen ari da puntu horretan; negatiboa bada, jaisten. Beraz, $f$ gorakorra ala beherakorra den jakiteko nahikoa da $f\'(a)$ deribatuaren zeinua begiratzea.',
            'La derivada es la pendiente. Si la pendiente es positiva, la gráfica está subiendo en ese punto; si es negativa, bajando. Así que para saber si $f$ crece o decrece basta con mirar el signo de $f\'(a)$.',
            'المشتقة هي الميل. إذا كان الميل موجبًا فالتمثيل يصعد عند تلك النقطة، وإذا كان سالبًا فهو ينزل. لذا لمعرفة هل $f$ متزايدة أم متناقصة يكفي النظر إلى إشارة $f\'(a)$.',
            'The derivative is the slope. If the slope is positive, the graph is going up at that point; if negative, down. So to know whether $f$ increases or decreases, it is enough to look at the sign of $f\'(a)$.'
        ),
        examplePrompt: say('Gorakorra al da $g(x)=x^2-8x$ funtzioa $x=5$ puntuan?', '¿Es creciente $g(x)=x^2-8x$ en $x=5$?', 'هل $g(x)=x^2-8x$ متزايدة عند $x=5$؟', 'Is $g(x)=x^2-8x$ increasing at $x=5$?'),
        example: same("$g'(5)=10-8=2>0$"),
        exampleAnswer: say('Bai: deribatua positiboa da, gorakorra.', 'Sí: la derivada es positiva, crece.', 'نعم: المشتقة موجبة فهي متزايدة.', 'Yes: the derivative is positive, it increases.')
    },
    intervals: {
        definitions: [
            { term: say('Zeinu-taula', 'Tabla de signos', 'جدول الإشارات', 'Sign chart'), meaning: say('$f\'$ zero den puntuek zatitutako tarteak, bakoitza bere zeinuarekin.', 'Los intervalos que dejan los ceros de $f\'$, cada uno con su signo.', 'الفترات التي تحددها أصفار $f\'$، ولكل منها إشارتها.', 'The intervals left by the zeros of $f\'$, each with its sign.') }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'الفترة', 'interval'),
            say('proba-balioa', 'valor de prueba', 'قيمة اختبار', 'test value')
        ],
        explanation: say(
            'Deribatuak zeinua aldatzeko, zero izan behar du (edo ez existitu). Horregatik, $f\'(x)=0$ ebazten da: soluzioek zuzena tartetan zatitzen dute. Tarte bakoitzean balio bat probatzen da, eta haren zeinuak tarte osoaren zeinua ematen du.',
            'Para cambiar de signo, la derivada tiene que anularse (o no existir). Por eso se resuelve $f\'(x)=0$: las soluciones parten la recta en intervalos. En cada intervalo se prueba un valor, y su signo da el de todo el intervalo.',
            'لتتغير إشارة المشتقة يجب أن تنعدم (أو لا توجد). لذلك نحل $f\'(x)=0$: فتقسم الحلول المستقيم إلى فترات. ونجرّب في كل فترة قيمة تعطي إشارتها إشارة الفترة كلها.',
            'To change sign, the derivative has to be zero (or not exist). That is why $f\'(x)=0$ is solved: the solutions split the line into intervals. In each interval a value is tried, and its sign gives that of the whole interval.'
        ),
        examplePrompt: say('Aztertu $g(x)=x^2-6x+5$ funtzioaren hazkundea.', 'Estudia el crecimiento de $g(x)=x^2-6x+5$.', 'ادرس تزايد $g(x)=x^2-6x+5$.', 'Study the increase and decrease of $g(x)=x^2-6x+5$.'),
        example: same("$g'(x)=2x-6=0\\ \\to\\ x=3$"),
        exampleAnswer: say('Beherakorra $(-\\infty,3)$ tartean eta gorakorra $(3,+\\infty)$ tartean.', 'Decrece en $(-\\infty,3)$ y crece en $(3,+\\infty)$.', 'متناقصة في $(-\\infty,3)$ ومتزايدة في $(3,+\\infty)$.', 'Decreasing on $(-\\infty,3)$ and increasing on $(3,+\\infty)$.')
    },
    'growth-context': {
        definitions: [
            { term: say('Joera', 'Tendencia', 'الاتجاه', 'Trend'), meaning: say('Magnitude bat denbora-tarte batean hazten ala jaisten den.', 'Si una magnitud sube o baja en un periodo de tiempo.', 'هل يصعد مقدار أم ينزل في فترة زمنية.', 'Whether a quantity goes up or down over a period of time.') }
        ],
        vocabulary: [
            say('irabaziak', 'beneficios', 'الأرباح', 'profits'),
            say('urtea', 'año', 'السنة', 'year')
        ],
        explanation: say(
            'Eredu ekonomikoetan, zeinu-taula irakurtzen da istorio bat bezala: zein urtetan edo hilabetetan hazten den magnitudea eta zeinetan jaisten den. Kontuan hartu ereduaren tartea (lehen 6 urteak, adibidez): kanpoko puntuak ez dira kontatzen.',
            'En los modelos económicos, la tabla de signos se lee como una historia: en qué años o meses crece la magnitud y en cuáles baja. Ten en cuenta el intervalo del modelo (los 6 primeros años, por ejemplo): los puntos de fuera no cuentan.',
            'في النماذج الاقتصادية يُقرأ جدول الإشارات كحكاية: في أي سنوات أو أشهر يتزايد المقدار وفي أيها يتناقص. وانتبه لفترة النموذج (السنوات الست الأولى مثلًا): فالنقاط خارجها لا تُحسب.',
            'In economic models, the sign chart is read like a story: in which years or months the quantity grows and in which it falls. Keep in mind the interval of the model (the first 6 years, for example): points outside do not count.'
        ),
        examplePrompt: say('Langabezia, milakatan, $L(t)=t^2-8t+30$ da ($t$ urteetan, $0\\le t\\le 10$). Noiz jaisten da?', 'El paro, en miles, es $L(t)=t^2-8t+30$ ($t$ en años, $0\\le t\\le 10$). ¿Cuándo baja?', 'البطالة بالآلاف $L(t)=t^2-8t+30$ ($t$ بالسنوات، $0\\le t\\le 10$). متى تنخفض؟', 'Unemployment, in thousands, is $L(t)=t^2-8t+30$ ($t$ in years, $0\\le t\\le 10$). When does it fall?'),
        example: same("$L'(t)=2t-8<0\\ \\to\\ t<4$"),
        exampleAnswer: say('Lehen 4 urteetan jaisten da, eta gero igotzen.', 'Baja los 4 primeros años y después sube.', 'تنخفض في السنوات الأربع الأولى ثم ترتفع.', 'It falls for the first 4 years and then rises.')
    },

    /* ---------- 3. Maxima and minima ---------- */
    relative: {
        definitions: [
            { term: say('Puntu singularra', 'Punto singular', 'النقطة الحرجة', 'Stationary point'), meaning: say('$f\'(x)=0$ den puntua: zuzen ukitzailea horizontala da.', 'Un punto con $f\'(x)=0$: la tangente es horizontal.', 'نقطة فيها $f\'(x)=0$: المماس أفقي.', 'A point with $f\'(x)=0$: the tangent is horizontal.') },
            { term: say('Maximo erlatiboa', 'Máximo relativo', 'القيمة العظمى المحلية', 'Relative maximum'), meaning: say('Inguruko puntu guztiak baino altuagoa den puntua.', 'Un punto más alto que todos los de su alrededor.', 'نقطة أعلى من كل النقاط حولها.', 'A point higher than all those around it.') }
        ],
        vocabulary: [
            say('minimoa', 'mínimo', 'الصغرى', 'minimum'),
            say('bigarren deribatua', 'segunda derivada', 'المشتقة الثانية', 'second derivative')
        ],
        explanation: say(
            'Maximo edo minimo batean zuzen ukitzailea horizontala da: $f\'=0$. Baina $f\'=0$ izateak ez du esan nahi muturra dagoenik. Bi modutan erabakitzen da: $f\'$ zeinuz aldatzen den begiratuz, edo $f\'\'$ deribatuaren zeinuarekin (negatiboa, maximoa; positiboa, minimoa).',
            'En un máximo o un mínimo la tangente es horizontal: $f\'=0$. Pero que $f\'=0$ no quiere decir que haya extremo. Se decide de dos maneras: mirando si $f\'$ cambia de signo, o con el signo de $f\'\'$ (negativo, máximo; positivo, mínimo).',
            'في القيمة العظمى أو الصغرى يكون المماس أفقيًا: $f\'=0$. لكن $f\'=0$ لا يعني وجود قيمة قصوى. ويُحسم ذلك بطريقتين: بالنظر هل تتغير إشارة $f\'$، أو بإشارة $f\'\'$ (سالبة عظمى، وموجبة صغرى).',
            'At a maximum or minimum the tangent is horizontal: $f\'=0$. But $f\'=0$ does not mean there is an extremum. It is decided in two ways: by checking whether $f\'$ changes sign, or with the sign of $f\'\'$ (negative, maximum; positive, minimum).'
        ),
        examplePrompt: say('Aurkitu $g(x)=x^3-27x$ funtzioaren muturrak.', 'Halla los extremos de $g(x)=x^3-27x$.', 'أوجد القيم القصوى للدالة $g(x)=x^3-27x$.', 'Find the extrema of $g(x)=x^3-27x$.'),
        example: same("$\\begin{gathered}g'(x)=3x^2-27=0\\ \\to\\ x=\\pm 3\\\\ g''(-3)=-18\\qquad g''(3)=18\\end{gathered}$"),
        exampleAnswer: say('Maximoa $(-3,54)$ puntuan eta minimoa $(3,-54)$ puntuan.', 'Máximo en $(-3,54)$ y mínimo en $(3,-54)$.', 'عظمى عند $(-3,54)$ وصغرى عند $(3,-54)$.', 'A maximum at $(-3,54)$ and a minimum at $(3,-54)$.'),
        why: {
            text: say(
                'Zergatik da maximoa $f\'\'<0$ bada? $f\'\'<0$ denean, $f\'$ jaisten ari da. Zero bada puntuan, aurretik positiboa zen (funtzioa igotzen) eta ondoren negatiboa (jaisten): gailur bat.',
                '¿Por qué es máximo si $f\'\'<0$? Si $f\'\'<0$, $f\'$ está bajando. Si vale cero en el punto, antes era positiva (la función subía) y después negativa (baja): una cima.',
                'لماذا تكون عظمى إذا $f\'\'<0$؟ إذا كان $f\'\'<0$ فإن $f\'$ تتناقص. وإذا انعدمت عند النقطة فقد كانت قبلها موجبة (الدالة تصعد) وبعدها سالبة (تنزل): قمة.',
                'Why is it a maximum if $f\'\'<0$? If $f\'\'<0$, $f\'$ is going down. If it is zero at the point, before it was positive (the function rose) and after negative (it falls): a peak.'
            )
        }
    },
    absolute: {
        definitions: [
            { term: say('Maximo absolutua', 'Máximo absoluto', 'القيمة العظمى المطلقة', 'Absolute maximum'), meaning: say('Tarte osoko balio handiena.', 'El mayor valor de todo el intervalo.', 'أكبر قيمة في الفترة كلها.', 'The largest value on the whole interval.') }
        ],
        vocabulary: [
            say('muturrak', 'extremos', 'الطرفان', 'ends'),
            say('alderatu', 'comparar', 'المقارنة', 'compare')
        ],
        explanation: say(
            'Tarte itxi batean, balio handiena eta txikiena bi tokitan egon daitezke: puntu singularretan edo tartearen muturretan. Beraz, $f$ kalkulatzen da puntu horietan guztietan eta emaitzak alderatzen dira. Maximo erlatibo bat muturreko balio bat baino txikiagoa izan daiteke.',
            'En un intervalo cerrado, el mayor y el menor valor pueden estar en dos sitios: en los puntos singulares o en los extremos del intervalo. Así que se calcula $f$ en todos esos puntos y se comparan los resultados. Un máximo relativo puede ser menor que el valor en un extremo.',
            'في فترة مغلقة قد تقع أكبر قيمة وأصغر قيمة في موضعين: في النقاط الحرجة أو عند طرفي الفترة. لذا نحسب $f$ في كل تلك النقاط ونقارن النتائج. وقد تكون القيمة العظمى المحلية أصغر من القيمة عند طرف.',
            'On a closed interval, the largest and smallest values can be in two places: at the stationary points or at the ends of the interval. So $f$ is worked out at all those points and the results compared. A relative maximum can be smaller than the value at an end.'
        ),
        examplePrompt: say('Zein da $g(x)=x^2-4x$ funtzioaren minimo absolutua $[0,5]$ tartean?', '¿Cuál es el mínimo absoluto de $g(x)=x^2-4x$ en $[0,5]$?', 'ما القيمة الصغرى المطلقة للدالة $g(x)=x^2-4x$ على $[0,5]$؟', 'What is the absolute minimum of $g(x)=x^2-4x$ on $[0,5]$?'),
        example: same('$g(0)=0\\qquad g(2)=-4\\qquad g(5)=5$'),
        exampleAnswer: say('Minimo absolutua $-4$ da, $x=2$ puntuan.', 'El mínimo absoluto es $-4$, en $x=2$.', 'القيمة الصغرى المطلقة $-4$ عند $x=2$.', 'The absolute minimum is $-4$, at $x=2$.')
    },
    parameters: {
        definitions: [
            { term: say('Baldintza', 'Condición', 'الشرط', 'Condition'), meaning: say('Enuntziatuaren datu bat, ekuazio bihurtzen dena: «maximoa $x=2$ puntuan» $\\to$ $f\'(2)=0$.', 'Un dato del enunciado que se convierte en ecuación: «máximo en $x=2$» $\\to$ $f\'(2)=0$.', 'معطى من النص يتحول إلى معادلة: «عظمى عند $x=2$» $\\to$ $f\'(2)=0$.', 'A piece of data in the problem that becomes an equation: «maximum at $x=2$» $\\to$ $f\'(2)=0$.') }
        ],
        vocabulary: [
            say('parametroa', 'parámetro', 'الوسيط', 'parameter'),
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('sistema', 'sistema', 'الجملة', 'system')
        ],
        explanation: say(
            'Enuntziatuko esaldi bakoitza ekuazio bat da. «Mutur bat $x=p$ puntuan»: $f\'(p)=0$. «$(p,q)$ puntutik igarotzen da»: $f(p)=q$. Parametro adina ekuazio behar dira. Sistema ebatzi ondoren, egiaztatu maximoa ala minimoa den.',
            'Cada frase del enunciado es una ecuación. «Un extremo en $x=p$»: $f\'(p)=0$. «Pasa por $(p,q)$»: $f(p)=q$. Hacen falta tantas ecuaciones como parámetros. Tras resolver el sistema, comprueba si es máximo o mínimo.',
            'كل عبارة في النص معادلة. «قيمة قصوى عند $x=p$»: ‏$f\'(p)=0$. «يمر بـ $(p,q)$»: ‏$f(p)=q$. ويلزم عدد من المعادلات يساوي عدد الوسطاء. وبعد حل الجملة تحقّق هل هي عظمى أم صغرى.',
            'Each sentence of the problem is an equation. «An extremum at $x=p$»: $f\'(p)=0$. «It passes through $(p,q)$»: $f(p)=q$. You need as many equations as parameters. After solving the system, check whether it is a maximum or a minimum.'
        ),
        examplePrompt: say('Aurkitu $k$, $g(x)=x^3-kx$ funtzioak mutur bat izan dezan $x=3$ puntuan.', 'Halla $k$ para que $g(x)=x^3-kx$ tenga un extremo en $x=3$.', 'أوجد $k$ لتكون للدالة $g(x)=x^3-kx$ قيمة قصوى عند $x=3$.', 'Find $k$ so that $g(x)=x^3-kx$ has an extremum at $x=3$.'),
        example: same("$g'(3)=27-k=0\\ \\to\\ k=27$"),
        exampleAnswer: say('$k=27$; $g\'\'(3)=18>0$, minimoa da.', '$k=27$; $g\'\'(3)=18>0$, es un mínimo.', '$k=27$؛ و$g\'\'(3)=18>0$ فهي صغرى.', '$k=27$; $g\'\'(3)=18>0$, it is a minimum.')
    },

    /* ---------- 4. Curvature ---------- */
    'second-sign': {
        definitions: [
            { term: say('Ahurra (∪)', 'Cóncava (∪)', 'مقعّرة نحو الأعلى (∪)', 'Concave up (∪)'), meaning: say('Kurba ontzi baten antzera okertzen da: maldak handitzen doaz, $f\'\'>0$.', 'La curva se dobla como un cuenco: las pendientes van aumentando, $f\'\'>0$.', 'ينحني المنحنى كوعاء: تزداد الميول، $f\'\'>0$.', 'The curve bends like a bowl: the slopes keep increasing, $f\'\'>0$.') }
        ],
        vocabulary: [
            say('ganbila', 'convexa', 'مقعّرة نحو الأسفل', 'concave down'),
            say('maldak', 'pendientes', 'الميول', 'slopes')
        ],
        explanation: say(
            '$f\'\'$ deribatuak esaten du maldak nola aldatzen diren. Positiboa bada, maldak handitzen dira eta kurba ∪ itxurakoa da; negatiboa bada, maldak txikitzen dira eta kurba ∩ itxurakoa da. Tarteak aurkitzeko, $f\'\'(x)=0$ ebazten da eta zeinua aztertzen da.',
            '$f\'\'$ dice cómo cambian las pendientes. Si es positiva, las pendientes aumentan y la curva tiene forma de ∪; si es negativa, las pendientes disminuyen y tiene forma de ∩. Para hallar los intervalos se resuelve $f\'\'(x)=0$ y se estudia el signo.',
            'تخبر $f\'\'$ بكيفية تغيّر الميول. إذا كانت موجبة تزداد الميول ويأخذ المنحنى شكل ∪، وإذا كانت سالبة تتناقص الميول ويأخذ شكل ∩. ولإيجاد الفترات نحل $f\'\'(x)=0$ وندرس الإشارة.',
            '$f\'\'$ tells how the slopes change. If it is positive, the slopes increase and the curve is shaped like ∪; if negative, the slopes decrease and it is shaped like ∩. To find the intervals, solve $f\'\'(x)=0$ and study the sign.'
        ),
        examplePrompt: say('Nolakoa da $g(x)=x^4$ funtzioaren kurbadura?', '¿Cómo es la curvatura de $g(x)=x^4$?', 'كيف تقعّر $g(x)=x^4$؟', 'How is $g(x)=x^4$ curved?'),
        example: same("$g''(x)=12x^2\\ge 0$"),
        exampleAnswer: say('Beti ahurra (∪): $g\'\'=0$ da $x=0$ puntuan, baina ez da zeinuz aldatzen.', 'Siempre cóncava (∪): $g\'\'=0$ en $x=0$, pero no cambia de signo.', 'مقعّرة نحو الأعلى دائمًا (∪): $g\'\'=0$ عند $x=0$ لكن إشارتها لا تتغير.', 'Always concave up (∪): $g\'\'=0$ at $x=0$, but it does not change sign.')
    },
    inflection: {
        definitions: [
            { term: say('Hazkunde-erritmoa', 'Ritmo de crecimiento', 'وتيرة النمو', 'Rate of growth'), meaning: say('Magnitudea zein abiaduran aldatzen den: $f\'$.', 'La velocidad a la que cambia la magnitud: $f\'$.', 'السرعة التي يتغير بها المقدار: $f\'$.', 'The speed at which the quantity changes: $f\'$.') }
        ],
        vocabulary: [
            say('azkarren', 'más deprisa', 'بأسرع ما يمكن', 'fastest'),
            say('salmentak', 'ventas', 'المبيعات', 'sales')
        ],
        explanation: say(
            'Inflexio-puntuak aurkitzeko, $f\'\'(x)=0$ ebazten da eta zeinua aldatzen dela egiaztatzen da. Ekonomian garrantzitsuak dira: hor $f\'$ maximoa edo minimoa da. Salmenta-kurba batean, inflexioa salmentak azkarren hazten diren unea da.',
            'Para hallar los puntos de inflexión se resuelve $f\'\'(x)=0$ y se comprueba que cambia de signo. En economía son importantes: ahí $f\'$ es máxima o mínima. En una curva de ventas, la inflexión es el momento en que las ventas crecen más deprisa.',
            'لإيجاد نقاط الانعطاف نحل $f\'\'(x)=0$ ونتحقق من تغيّر الإشارة. وهي مهمة في الاقتصاد: فهناك تكون $f\'$ عظمى أو صغرى. وفي منحنى المبيعات يكون الانعطاف لحظة أسرع نمو للمبيعات.',
            'To find the points of inflection, solve $f\'\'(x)=0$ and check that it changes sign. In economics they matter: there $f\'$ is highest or lowest. On a sales curve, the inflection is the moment sales grow fastest.'
        ),
        examplePrompt: say('Erabiltzaileak $U(t)=-t^3+12t^2$ dira. Noiz hazten dira azkarren?', 'Los usuarios son $U(t)=-t^3+12t^2$. ¿Cuándo crecen más deprisa?', 'المستخدمون $U(t)=-t^3+12t^2$. متى ينمون بأسرع ما يمكن؟', 'The users are $U(t)=-t^3+12t^2$. When do they grow fastest?'),
        example: same("$U''(t)=-6t+24=0\\ \\to\\ t=4$"),
        exampleAnswer: say('$t=4$ unean: hor $U\'(4)=48$ da, erritmo handiena.', 'En $t=4$: ahí $U\'(4)=48$, el mayor ritmo.', 'عند $t=4$: هناك $U\'(4)=48$، أكبر وتيرة.', 'At $t=4$: there $U\'(4)=48$, the highest pace.')
    },
    'read-graph': {
        definitions: [
            { term: say('Deribatuaren grafikoa', 'Gráfica de la derivada', 'تمثيل المشتقة', 'Graph of the derivative'), meaning: say('$x$ bakoitzean $f$ funtzioaren malda erakusten duen kurba.', 'La curva que muestra en cada $x$ la pendiente de $f$.', 'المنحنى الذي يبيّن ميل $f$ عند كل $x$.', 'The curve showing the slope of $f$ at each $x$.') }
        ],
        vocabulary: [
            say('ardatza', 'eje', 'المحور', 'axis'),
            say('zeharkatu', 'cruzar', 'تقطع', 'cross')
        ],
        explanation: say(
            'Batzuetan $f\'$ funtzioaren grafikoa ematen da, ez $f$ funtzioarena. Orduan, ardatzaren gaineko zatietan $f$ hazten da eta azpikoetan jaisten. $f\'$ ardatza zeharkatzen duen tokietan $f$ funtzioak muturrak ditu, eta $f\'$ funtzioaren gailur eta haranetan, inflexioak.',
            'A veces dan la gráfica de $f\'$, no la de $f$. Entonces, donde está por encima del eje $f$ crece y donde está por debajo, baja. Donde $f\'$ cruza el eje, $f$ tiene extremos, y en las cimas y valles de $f\'$, inflexiones.',
            'أحيانًا يُعطى تمثيل $f\'$ لا تمثيل $f$. عندئذ حيث يكون فوق المحور تتزايد $f$، وحيث يكون تحته تتناقص. وحيث تقطع $f\'$ المحور تكون لـ $f$ قيم قصوى، وعند قمم $f\'$ وقيعانها نقاط انعطاف.',
            'Sometimes the graph of $f\'$ is given, not that of $f$. Then, where it is above the axis $f$ rises and where it is below, it falls. Where $f\'$ crosses the axis, $f$ has extrema, and at the peaks and valleys of $f\'$, inflections.'
        ),
        examplePrompt: say('$f\'$ zuzen bat da, $(5,0)$ puntutik igarotzen dena eta beherantz doana. Zer du $f$ funtzioak $x=5$ puntuan?', '$f\'$ es una recta que pasa por $(5,0)$ y baja. ¿Qué tiene $f$ en $x=5$?', '$f\'$ مستقيم يمر بـ $(5,0)$ وينزل. ماذا لـ $f$ عند $x=5$؟', '$f\'$ is a line through $(5,0)$ going down. What does $f$ have at $x=5$?'),
        example: same("$x<5\\ \\to\\ f'>0\\qquad x>5\\ \\to\\ f'<0$"),
        exampleAnswer: say('$f\'$ positibotik negatibora pasatzen da: $f$ funtzioak maximoa du $x=5$ puntuan.', '$f\'$ pasa de positiva a negativa: $f$ tiene un máximo en $x=5$.', 'تنتقل $f\'$ من موجبة إلى سالبة: لـ $f$ قيمة عظمى عند $x=5$.', '$f\'$ goes from positive to negative: $f$ has a maximum at $x=5$.')
    },

    /* ---------- 5. Optimisation ---------- */
    'max-profit': {
        definitions: [
            { term: say('Irabazi-funtzioa', 'Función beneficio', 'دالة الربح', 'Profit function'), meaning: say('Diru-sarrerak ken kostuak: $B(x)=I(x)-C(x)$.', 'Ingresos menos costes: $B(x)=I(x)-C(x)$.', 'الإيراد ناقص التكاليف: $B(x)=I(x)-C(x)$.', 'Income minus costs: $B(x)=I(x)-C(x)$.') }
        ],
        vocabulary: [
            say('diru-sarrerak', 'ingresos', 'الإيراد', 'income'),
            say('kostuak', 'costes', 'التكاليف', 'costs'),
            say('prezioa', 'precio', 'السعر', 'price')
        ],
        explanation: say(
            'Lehenik irabazi-funtzioa idazten da: unitate bakoitzaren prezioa bider unitateak, ken kostuak. Gero $B\'(x)=0$ ebazten da eta $B\'\'$ negatiboa dela egiaztatzen. Erantzunak bi zati ditu: zenbat unitate eta zenbat irabazten den.',
            'Primero se escribe la función beneficio: el precio de cada unidad por las unidades, menos los costes. Después se resuelve $B\'(x)=0$ y se comprueba que $B\'\'$ es negativa. La respuesta tiene dos partes: cuántas unidades y cuánto se gana.',
            'نكتب أولًا دالة الربح: سعر الوحدة في عدد الوحدات ناقص التكاليف. ثم نحل $B\'(x)=0$ ونتحقق أن $B\'\'$ سالبة. وللإجابة جزءان: كم وحدة وكم يُربح.',
            'First write the profit function: the price of each unit times the units, minus the costs. Then solve $B\'(x)=0$ and check that $B\'\'$ is negative. The answer has two parts: how many units and how much is earned.'
        ),
        examplePrompt: say('$B(x)=-2x^2+120x-1000$ euro bada, zenbat unitaterekin da irabazia handiena eta zenbatekoa da?', 'Si $B(x)=-2x^2+120x-1000$ euros, ¿con cuántas unidades es máximo el beneficio y cuánto vale?', 'إذا كان $B(x)=-2x^2+120x-1000$ يورو، فبكم وحدة يكون الربح أعظميًا وكم يساوي؟', 'If $B(x)=-2x^2+120x-1000$ euros, with how many units is the profit highest and how much is it?'),
        example: same("$\\begin{gathered}B'(x)=-4x+120=0\\ \\to\\ x=30\\\\ B(30)=-1800+3600-1000=800\\end{gathered}$"),
        exampleAnswer: say('30 unitaterekin, 800 euro.', 'Con 30 unidades, 800 €.', 'مع 30 وحدة، 800 €.', 'With 30 units, €800.'),
        why: {
            text: say(
                'Zergatik $I\'=C\'$ maximoan? $I\'>C\'$ bada, hurrengo unitateak kostatzen duena baino gehiago ekartzen du: komeni da gehiago egitea. $I\'<C\'$ bada, gutxiago egitea. Bien arteko oreka, $I\'=C\'$, da irabazirik handiena.',
                '¿Por qué $I\'=C\'$ en el máximo? Si $I\'>C\'$, la unidad siguiente aporta más de lo que cuesta: conviene hacer más. Si $I\'<C\'$, conviene hacer menos. El equilibrio entre los dos, $I\'=C\'$, da el mayor beneficio.',
                'لماذا $I\'=C\'$ عند الأعظمية؟ إذا كان $I\'>C\'$ فالوحدة التالية تضيف أكثر مما تكلّف: يحسن إنتاج المزيد. وإذا كان $I\'<C\'$ يحسن إنتاج أقل. والتوازن بينهما $I\'=C\'$ يعطي أكبر ربح.',
                'Why $I\'=C\'$ at the maximum? If $I\'>C\'$, the next unit brings in more than it costs: it pays to make more. If $I\'<C\'$, it pays to make less. The balance between the two, $I\'=C\'$, gives the highest profit.'
            )
        }
    },
    'min-average': {
        definitions: [
            { term: say('Batez besteko kostua', 'Coste medio', 'متوسط التكلفة', 'Average cost'), meaning: say('Unitate bakoitzaren kostua: $M(x)=\\frac{C(x)}{x}$.', 'Lo que cuesta cada unidad: $M(x)=\\frac{C(x)}{x}$.', 'تكلفة كل وحدة: $M(x)=\\frac{C(x)}{x}$.', 'What each unit costs: $M(x)=\\frac{C(x)}{x}$.') }
        ],
        vocabulary: [
            say('produkzioa', 'producción', 'الإنتاج', 'production'),
            say('unitatea', 'unidad', 'الوحدة', 'unit')
        ],
        explanation: say(
            'Batez besteko kostua kostu osoa zati unitateak da. Hasieran jaisten da, kostu finkoa banatzen delako, eta gero igotzen, lantegia betetzen delako. Minimoa $M\'(x)=0$ ebatziz aurkitzen da; zatikiak dituenez, kontuz deribatzean.',
            'El coste medio es el coste total entre las unidades. Al principio baja, porque se reparte el coste fijo, y después sube, porque la fábrica se llena. El mínimo se halla resolviendo $M\'(x)=0$; como lleva fracciones, cuidado al derivar.',
            'متوسط التكلفة هو التكلفة الكلية على عدد الوحدات. ينخفض في البداية لأن التكلفة الثابتة تتوزع، ثم يرتفع لأن المصنع يزدحم. ونجد أصغره بحل $M\'(x)=0$؛ وبما أن فيه كسورًا فانتبه عند الاشتقاق.',
            'The average cost is the total cost divided by the units. At first it falls, because the fixed cost is shared, and then it rises, because the factory fills up. The minimum is found by solving $M\'(x)=0$; as it has fractions, take care when differentiating.'
        ),
        examplePrompt: say('$C(x)=2x^2+8x+50$ bada, zenbat unitaterekin da batez besteko kostua minimoa?', 'Si $C(x)=2x^2+8x+50$, ¿con cuántas unidades es mínimo el coste medio?', 'إذا كانت $C(x)=2x^2+8x+50$ فبكم وحدة يكون متوسط التكلفة أصغريًا؟', 'If $C(x)=2x^2+8x+50$, with how many units is the average cost lowest?'),
        example: same("$\\begin{gathered}M(x)=2x+8+\\frac{50}{x}\\\\ M'(x)=2-\\frac{50}{x^2}=0\\ \\to\\ x=5\\end{gathered}$"),
        exampleAnswer: say('5 unitaterekin: $M(5)=28$ euro unitateko.', 'Con 5 unidades: $M(5)=28$ € por unidad.', 'مع 5 وحدات: $M(5)=28$ € للوحدة.', 'With 5 units: $M(5)=28$ euros per unit.'),
        why: {
            text: say(
                'Zergatik $M=C\'$ minimoan? Hurrengo unitateak batez bestekoa baino gutxiago kostatzen badu, batez bestekoa jaitsi egiten da; gehiago kostatzen badu, igo. Jaisteari utzi eta igotzen hasten den tokian, biak berdinak dira.',
                '¿Por qué $M=C\'$ en el mínimo? Si la unidad siguiente cuesta menos que la media, la media baja; si cuesta más, sube. Donde deja de bajar y empieza a subir, las dos son iguales.',
                'لماذا $M=C\'$ عند الأصغرية؟ إذا كلّفت الوحدة التالية أقل من المتوسط انخفض المتوسط، وإذا كلّفت أكثر ارتفع. وحيث يتوقف عن الانخفاض ويبدأ بالارتفاع يتساويان.',
                'Why $M=C\'$ at the minimum? If the next unit costs less than the average, the average falls; if it costs more, it rises. Where it stops falling and starts rising, the two are equal.'
            )
        }
    },
    'max-income': {
        definitions: [
            { term: say('Optimizatu', 'Optimizar', 'الاستمثال', 'Optimise'), meaning: say('Magnitude baten balio handiena edo txikiena bilatzea, baldintza batzuekin.', 'Buscar el mayor o el menor valor de una magnitud con unas condiciones.', 'البحث عن أكبر قيمة أو أصغر قيمة لمقدار وفق شروط.', 'Look for the largest or smallest value of a quantity under some conditions.') }
        ],
        vocabulary: [
            say('aldagaia', 'variable', 'المتغير', 'variable'),
            say('igoera', 'subida', 'الزيادة', 'rise')
        ],
        explanation: say(
            'Optimizazio-problemetan, zailena funtzioa idaztea da. Aukeratu aldagai bat (prezioaren igoera, kutxaren aldea…), idatzi optimizatu beharrekoa haren arabera, deribatu eta zerora berdindu. Azkenik, egiaztatu emaitza eta erantzun galderari.',
            'En los problemas de optimización, lo difícil es escribir la función. Elige una variable (la subida del precio, el lado de la caja…), escribe lo que hay que optimizar en función de ella, deriva e iguala a cero. Al final, comprueba el resultado y contesta a la pregunta.',
            'في مسائل الاستمثال يكون الأصعب كتابة الدالة. اختر متغيرًا (زيادة السعر، ضلع العلبة…)، واكتب ما يُراد استمثاله بدلالته، ثم اشتق وساوِ بالصفر. وأخيرًا تحقّق من النتيجة وأجب عن السؤال.',
            'In optimisation problems, the hard part is writing the function. Choose a variable (the rise in price, the side of the box…), write what is to be optimised in terms of it, differentiate and set to zero. Finally, check the result and answer the question.'
        ),
        examplePrompt: say('Bi zenbaki positiboren batura 18 da. Zein dira, haien biderkadura handiena izan dadin?', 'Dos números positivos suman 18. ¿Cuáles son si su producto es máximo?', 'مجموع عددين موجبين 18. ما هما إذا كان جداؤهما أعظميًا؟', 'Two positive numbers add up to 18. Which are they if their product is highest?'),
        example: same("$\\begin{gathered}P(x)=x(18-x)\\\\ P'(x)=18-2x=0\\ \\to\\ x=9\\end{gathered}$"),
        exampleAnswer: say('9 eta 9: biderkadura 81 da.', '9 y 9: el producto es 81.', '9 و9: الجداء 81.', '9 and 9: the product is 81.')
    }
}

import type { LessonTexts } from '../../features/unit-v2/types.ts'
import type { SocDerivTopicId } from './lessonChecks.ts'
import { plain as say, plainSame as same } from './text.ts'

/* ==========================================================================
   Deribatuak eta haien aplikazioak · Batxilergoa 1 · Gizarte Zientziak —
   what each lesson tells: definitions, a short explanation, the example
   as an exercise («Another example») and key words. Plain data so the
   tests can import it. The example uses numbers of its own.
   ========================================================================== */

export const socDerivLessonTexts: Record<SocDerivTopicId, LessonTexts> = {
    /* ---------- 1. Rate of change ---------- */
    'average-rate': {
        definitions: [
            { term: say('Batez besteko aldakuntza-tasa', 'Tasa de variación media', 'معدل التغير المتوسط', 'Average rate of change'), meaning: say('$f$ funtzioa, batez beste, zenbat aldatzen den $x$ aldagaiaren unitate bakoitzeko, tarte batean.', 'Lo que cambia $f$, de media, por cada unidad de $x$ en un intervalo.', 'مقدار تغير $f$ في المتوسط لكل وحدة من $x$ في مجال.', 'How much $f$ changes, on average, for each unit of $x$ on an interval.') }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'المجال', 'interval'),
            say('ebakitzailea', 'secante', 'القاطع', 'secant')
        ],
        explanation: say(
            '$f$ funtzioaren batez besteko aldakuntza-tasa $[a,b]$ tartean $\\frac{f(b)-f(a)}{b-a}$ da: funtzioaren aldaketa zati $x$ aldagaiaren aldaketa. Positiboa bada, funtzioa igo egiten da batez beste; negatiboa bada, jaitsi. Geometrikoki, $(a,f(a))$ eta $(b,f(b))$ puntuetatik pasatzen den zuzen ebakitzailearen malda da.',
            'La tasa de variación media de $f$ en $[a,b]$ es $\\frac{f(b)-f(a)}{b-a}$: el cambio de la función dividido entre el cambio de $x$. Si es positiva, la función sube de media; si es negativa, baja. Geométricamente es la pendiente de la recta secante que pasa por $(a,f(a))$ y $(b,f(b))$.',
            'معدل التغير المتوسط لـ $f$ في $[a,b]$ هو $\\frac{f(b)-f(a)}{b-a}$: تغير الدالة مقسومًا على تغير $x$. إذا كان موجبًا فالدالة تصعد في المتوسط، وإذا كان سالبًا فهي تنزل. وهندسيًّا هو ميل المستقيم القاطع المار بـ $(a,f(a))$ و$(b,f(b))$.',
            'The average rate of change of $f$ on $[a,b]$ is $\\frac{f(b)-f(a)}{b-a}$: the change of the function divided by the change of $x$. If it is positive, the function rises on average; if negative, it falls. Geometrically it is the slope of the secant line through $(a,f(a))$ and $(b,f(b))$.'
        ),
        examplePrompt: say('Biztanleria bat $P(t)=2t^2+5$ milakoa da. Aurkitu T.V.M. $t=1$ eta $t=4$ artean.', 'Una población es $P(t)=2t^2+5$ miles. Halla la T.V.M. entre $t=1$ y $t=4$.', 'عدد سكان $P(t)=2t^2+5$ ألفًا. أوجد معدل التغير المتوسط بين $t=1$ و$t=4$.', 'A population is $P(t)=2t^2+5$ thousand. Find the average rate between $t=1$ and $t=4$.'),
        example: same('$\\frac{P(4)-P(1)}{4-1}=\\frac{37-7}{3}=10$'),
        exampleAnswer: say('Batez beste 10 mila hazten da urteko.', 'Crece, de media, 10 mil por año.', 'تنمو في المتوسط 10 آلاف في السنة.', 'It grows, on average, by 10 thousand a year.')
    },
    'derivative-point': {
        definitions: [
            { term: say('Deribatua puntu batean', 'Derivada en un punto', 'المشتقة عند نقطة', 'Derivative at a point'), meaning: say('$f\'(a)$: $[a,a+h]$ tarteetako T.V.M. balioen limitea, $h\\to 0$ denean.', '$f\'(a)$: el límite de las T.V.M. en $[a,a+h]$ cuando $h\\to 0$.', '$f\'(a)$: نهاية معدلات التغير المتوسطة في $[a,a+h]$ عندما $h\\to 0$.', '$f\'(a)$: the limit of the average rates on $[a,a+h]$ as $h\\to 0$.') }
        ],
        vocabulary: [
            say('berehalakoa', 'instantánea', 'اللحظي', 'instantaneous'),
            say('ukitzailea', 'tangente', 'المماس', 'tangent')
        ],
        explanation: say(
            '$[a,a+h]$ tartea gero eta txikiagoa egiten bada, batez besteko tasa zenbaki batera hurbiltzen da: $f\'(a)$ deribatua. $a$ unean aldaketaren erritmoa da, berehalakoa, eta zuzen ukitzailearen malda. $h$ sinplifikatuz kalkulatzen da $h\\to 0$ egin aurretik, ordezkatzean $\\frac{0}{0}$ ateratzen delako.',
            'Si el intervalo $[a,a+h]$ se hace cada vez más pequeño, la tasa media se acerca a un número: la derivada $f\'(a)$. Es el ritmo de cambio en el instante $a$, la tasa instantánea, y la pendiente de la recta tangente. Se calcula simplificando $h$ antes de hacer $h\\to 0$, porque al sustituir sale $\\frac{0}{0}$.',
            'إذا صغر المجال $[a,a+h]$ أكثر فأكثر اقترب المعدل المتوسط من عدد: المشتقة $f\'(a)$. إنها سرعة التغير في اللحظة $a$، أي المعدل اللحظي، وميل المستقيم المماس. وتُحسب باختصار $h$ قبل جعل $h\\to 0$ لأن التعويض يعطي $\\frac{0}{0}$.',
            'If the interval $[a,a+h]$ gets smaller and smaller, the average rate approaches a number: the derivative $f\'(a)$. It is the rate of change at the instant $a$, the instantaneous rate, and the slope of the tangent line. It is worked out by cancelling $h$ before letting $h\\to 0$, because substituting gives $\\frac{0}{0}$.'
        ),
        examplePrompt: say('Aurkitu $f\'(1)$, $f(x)=3x^2$ bada.', 'Halla $f\'(1)$ si $f(x)=3x^2$.', 'أوجد $f\'(1)$ إذا كانت $f(x)=3x^2$.', 'Find $f\'(1)$ if $f(x)=3x^2$.'),
        example: same('$\\frac{3(1+h)^2-3}{h}=6+3h\\ \\to\\ 6$'),
        exampleAnswer: same('$f\'(1)=6$')
    },
    tangent: {
        definitions: [
            { term: say('Zuzen normala', 'Recta normal', 'المستقيم العمودي', 'Normal line'), meaning: say('Ukitzailearen perpendikularra, puntu berean.', 'La perpendicular a la tangente en el mismo punto.', 'العمودي على المماس في النقطة نفسها.', 'The perpendicular to the tangent at the same point.') }
        ],
        vocabulary: [
            say('puntua', 'punto', 'النقطة', 'point'),
            say('malda', 'pendiente', 'الميل', 'slope')
        ],
        explanation: say(
            'Zuzen bat idazteko puntu bat eta malda bat behar dira. Puntua $(a,f(a))$ da, eta malda $f\'(a)$. Ukitzaileak kurba ukitzen du puntu horretan, eta haren norabide bera du. Normala puntu beretik pasatzen da, $-\\frac{1}{f\'(a)}$ maldarekin.',
            'Para escribir una recta hacen falta un punto y una pendiente. El punto es $(a,f(a))$ y la pendiente, $f\'(a)$. La tangente toca la curva en ese punto y lleva su misma dirección. La normal pasa por el mismo punto con pendiente $-\\frac{1}{f\'(a)}$.',
            'لكتابة مستقيم نحتاج إلى نقطة وميل. النقطة هي $(a,f(a))$ والميل $f\'(a)$. يمس المماس المنحنى في تلك النقطة وله اتجاهه نفسه. ويمر العمودي بالنقطة نفسها بميل $-\\frac{1}{f\'(a)}$.',
            'To write a line you need a point and a slope. The point is $(a,f(a))$ and the slope, $f\'(a)$. The tangent touches the curve at that point and has its direction. The normal goes through the same point with slope $-\\frac{1}{f\'(a)}$.'
        ),
        examplePrompt: say('Aurkitu $g(x)=x^2-4x$ funtzioaren ukitzailea $x=3$ puntuan.', 'Halla la tangente a $g(x)=x^2-4x$ en $x=3$.', 'أوجد المماس لـ $g(x)=x^2-4x$ عند $x=3$.', 'Find the tangent to $g(x)=x^2-4x$ at $x=3$.'),
        example: same('$g(3)=-3\\qquad g\'(3)=2\\qquad y+3=2(x-3)$'),
        exampleAnswer: say('Ukitzailea $y=2x-9$ da.', 'La tangente es $y=2x-9$.', 'المماس هو $y=2x-9$.', 'The tangent is $y=2x-9$.')
    },

    /* ---------- 2. Rules ---------- */
    'derivative-function': {
        definitions: [
            { term: say('Funtzio deribatua', 'Función derivada', 'الدالة المشتقة', 'Derivative function'), meaning: say('$f\'$ funtzioa: $x$ bakoitzean, $f$ funtzioaren malda ematen du.', 'La función $f\'$ que da, en cada $x$, la pendiente de $f$.', 'الدالة $f\'$ التي تعطي عند كل $x$ ميل $f$.', 'The function $f\'$ that gives, at each $x$, the slope of $f$.') }
        ],
        vocabulary: [
            say('berretura', 'potencia', 'القوة', 'power'),
            say('konstantea', 'constante', 'الثابت', 'constant')
        ],
        explanation: say(
            'Definizioa zenbaki baten ordez $x$ aldagaiarekin eginez gero, funtzio berri bat lortzen da, $f\'(x)$, puntu bakoitzeko malda ematen duena. Berreturetarako erregela bat dago: berretzailea jaitsi eta bat kendu. Baturak gaiz gai deribatzen dira, eta biderkatzen duten zenbakiak geratu egiten dira; konstante baten deribatua 0 da.',
            'Haciendo la definición con $x$ en vez de con un número se obtiene una función nueva, $f\'(x)$, que da la pendiente en cada punto. Para las potencias hay una regla: baja el exponente y réstale uno. Las sumas se derivan término a término y los números que multiplican se quedan; la derivada de una constante es 0.',
            'إذا طبّقنا التعريف على $x$ بدل عدد حصلنا على دالة جديدة $f\'(x)$ تعطي الميل عند كل نقطة. وللقوى قاعدة: أنزل الأس واطرح منه واحدًا. وتُشتق المجاميع حدًّا حدًّا وتبقى الأعداد المضروبة، ومشتقة الثابت 0.',
            'Doing the definition with $x$ instead of a number gives a new function, $f\'(x)$, that gives the slope at each point. Powers have a rule: bring the exponent down and take one off. Sums are differentiated term by term and the numbers that multiply stay; the derivative of a constant is 0.'
        ),
        examplePrompt: say('Deribatu $h(x)=2x^5-x^2+7$.', 'Deriva $h(x)=2x^5-x^2+7$.', 'اشتق $h(x)=2x^5-x^2+7$.', 'Differentiate $h(x)=2x^5-x^2+7$.'),
        example: same('$h\'(x)=10x^4-2x$'),
        exampleAnswer: say('Gai bakoitza bere aldetik; 7 desagertu egiten da.', 'Cada término por separado; el 7 desaparece.', 'كل حد على حدة، ويختفي 7.', 'Each term on its own; the 7 disappears.')
    },
    'product-quotient': {
        definitions: [
            { term: say('Zatiduraren erregela', 'Regla del cociente', 'قاعدة خارج القسمة', 'Quotient rule'), meaning: say('Goikoaren deribatua bider behekoa, ken goikoa bider behekoaren deribatua, zati behekoa karratuan.', 'Derivada de arriba por la de abajo, menos la de arriba por la derivada de abajo, entre la de abajo al cuadrado.', 'مشتقة البسط في المقام ناقص البسط في مشتقة المقام، على مربع المقام.', 'Derivative of the top times the bottom, minus the top times the derivative of the bottom, over the bottom squared.') }
        ],
        vocabulary: [
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient')
        ],
        explanation: say(
            'Biderkadura baten deribatua ez da deribatuen biderkadura: faktore bat deribatzen da bestea utzita, eta bi emaitzak batzen dira. Zatidura batean gauza bera egiten da, zenbakitzailean kendura bat jarrita, eta izendatzailearen karratuaz zatitzen da. Batzuetan errazagoa da lehenik biderkatzea eta polinomio bat deribatzea.',
            'La derivada de un producto no es el producto de las derivadas: se deriva un factor dejando el otro y se suman los dos resultados. En un cociente se hace lo mismo con una resta en el numerador, y se divide entre el denominador al cuadrado. A veces es más fácil multiplicar antes y derivar un polinomio.',
            'مشتقة الجداء ليست جداء المشتقات: نشتق عاملًا ونترك الآخر ثم نجمع النتيجتين. وفي خارج القسمة نفعل الشيء نفسه مع طرح في البسط، ونقسم على مربع المقام. وأحيانًا يكون أسهل أن نضرب أولًا ونشتق حدودية.',
            'The derivative of a product is not the product of the derivatives: differentiate one factor leaving the other and add both results. In a quotient do the same with a subtraction on top, and divide by the denominator squared. Sometimes it is easier to multiply first and differentiate a polynomial.'
        ),
        examplePrompt: say('Deribatu $h(x)=\\frac{x^2}{x-3}$.', 'Deriva $h(x)=\\frac{x^2}{x-3}$.', 'اشتق $h(x)=\\frac{x^2}{x-3}$.', 'Differentiate $h(x)=\\frac{x^2}{x-3}$.'),
        example: same('$h\'(x)=\\frac{2x(x-3)-x^2}{(x-3)^2}=\\frac{x^2-6x}{(x-3)^2}$'),
        exampleAnswer: say('$x=0$ eta $x=6$ puntuetan anulatzen da.', 'Se anula en $x=0$ y en $x=6$.', 'تنعدم عند $x=0$ وعند $x=6$.', 'It is 0 at $x=0$ and at $x=6$.')
    },
    'chain-exp-log': {
        definitions: [
            { term: say('Katearen erregela', 'Regla de la cadena', 'قاعدة السلسلة', 'Chain rule'), meaning: say('$f(g(x))$ deribatzeko: kanpokoaren deribatua, barrukoa ukitu gabe, bider barrukoaren deribatua.', 'Para derivar $f(g(x))$: derivada de fuera, con lo de dentro sin tocar, por la derivada de dentro.', 'لاشتقاق $f(g(x))$: مشتقة الخارج مع ترك الداخل كما هو، في مشتقة الداخل.', 'To differentiate $f(g(x))$: the derivative of the outside, leaving the inside as it is, times the derivative of the inside.') }
        ],
        vocabulary: [
            say('barrukoa', 'dentro', 'الداخل', 'inside'),
            say('kanpokoa', 'fuera', 'الخارج', 'outside')
        ],
        explanation: say(
            '$e^x$ esponentziala bere deribatua da, eta $\\ln x$ funtzioaren deribatua $\\frac{1}{x}$ da. Barruan beste funtzio bat dagoenean, kanpokoa deribatzen da barrukoa berdin utzita, eta barrukoaren deribatuaz biderkatzen da. Horrela, $(e^{u})\'=e^{u}\\cdot u\'$ eta $(\\ln u)\'=\\frac{u\'}{u}$.',
            'La exponencial $e^x$ es su propia derivada, y la derivada de $\\ln x$ es $\\frac{1}{x}$. Cuando dentro hay otra función, se deriva la de fuera dejando dentro lo mismo y se multiplica por la derivada de dentro. Así, $(e^{u})\'=e^{u}\\cdot u\'$ y $(\\ln u)\'=\\frac{u\'}{u}$.',
            'الأسية $e^x$ هي مشتقة نفسها، ومشتقة $\\ln x$ هي $\\frac{1}{x}$. وعندما توجد في الداخل دالة أخرى نشتق دالة الخارج مع إبقاء الداخل كما هو ونضرب في مشتقة الداخل. وهكذا $(e^{u})\'=e^{u}\\cdot u\'$ و$(\\ln u)\'=\\frac{u\'}{u}$.',
            'The exponential $e^x$ is its own derivative, and the derivative of $\\ln x$ is $\\frac{1}{x}$. When there is another function inside, differentiate the outside leaving the inside the same and multiply by the derivative of the inside. So $(e^{u})\'=e^{u}\\cdot u\'$ and $(\\ln u)\'=\\frac{u\'}{u}$.'
        ),
        examplePrompt: say('Deribatu $f(x)=e^{x^2}$ eta $g(x)=\\ln(3x)$.', 'Deriva $f(x)=e^{x^2}$ y $g(x)=\\ln(3x)$.', 'اشتق $f(x)=e^{x^2}$ و$g(x)=\\ln(3x)$.', 'Differentiate $f(x)=e^{x^2}$ and $g(x)=\\ln(3x)$.'),
        example: same('$f\'(x)=2x\\cdot e^{x^2}\\qquad g\'(x)=\\frac{3}{3x}=\\frac{1}{x}$'),
        exampleAnswer: say('Biak katearen erregelarekin.', 'Las dos con la regla de la cadena.', 'كلتاهما بقاعدة السلسلة.', 'Both with the chain rule.')
    },

    /* ---------- 3. Growth and extremes ---------- */
    'sign-intervals': {
        definitions: [
            { term: say('Funtzio gorakorra', 'Función creciente', 'الدالة المتزايدة', 'Increasing function'), meaning: say('$x$ handitzean, $f(x)$ ere handitzen da.', 'Al aumentar $x$, aumenta $f(x)$.', 'عندما يزداد $x$ تزداد $f(x)$.', 'As $x$ increases, $f(x)$ increases.') }
        ],
        vocabulary: [
            say('igo', 'sube', 'يصعد', 'rises'),
            say('jaitsi', 'baja', 'ينزل', 'falls'),
            say('zatia', 'tramo', 'الجزء', 'stretch')
        ],
        explanation: say(
            'Deribatua malda da: positiboa den lekuan grafikoa igo egiten da, eta negatiboa den lekuan, jaitsi. Hazkundea aztertzeko $f\'(x)=0$ ebazten da; balio horiek zuzena zatitan banatzen dute, eta zati bakoitzean zenbaki bat probatzen da $f\'$ deribatuaren zeinua ikusteko.',
            'La derivada es la pendiente: donde es positiva, la gráfica sube, y donde es negativa, baja. Para estudiar el crecimiento se resuelve $f\'(x)=0$; esos valores parten la recta en tramos, y en cada tramo se prueba un número para ver el signo de $f\'$.',
            'المشتقة هي الميل: حيث تكون موجبة يصعد الرسم، وحيث تكون سالبة ينزل. ولدراسة التزايد نحل $f\'(x)=0$؛ وهذه القيم تقسم المستقيم إلى أجزاء، ونجرب في كل جزء عددًا لنرى إشارة $f\'$.',
            'The derivative is the slope: where it is positive the graph rises, and where it is negative it falls. To study growth, solve $f\'(x)=0$; those values split the line into stretches, and in each stretch you try a number to see the sign of $f\'$.'
        ),
        examplePrompt: say('Aztertu $g(x)=x^2-8x+3$ funtzioaren hazkundea.', 'Estudia el crecimiento de $g(x)=x^2-8x+3$.', 'ادرس تزايد $g(x)=x^2-8x+3$.', 'Study the growth of $g(x)=x^2-8x+3$.'),
        example: same('$g\'(x)=2x-8=0\\ \\to\\ x=4$'),
        exampleAnswer: say('Beherakorra $(-\\infty,4)$ tartean, eta gorakorra $(4,+\\infty)$ tartean.', 'Decrece en $(-\\infty,4)$ y crece en $(4,+\\infty)$.', 'متناقصة في $(-\\infty,4)$ ومتزايدة في $(4,+\\infty)$.', 'It decreases on $(-\\infty,4)$ and increases on $(4,+\\infty)$.')
    },
    'singular-points': {
        definitions: [
            { term: say('Puntu singularra', 'Punto singular', 'النقطة الحرجة', 'Stationary point'), meaning: say('Ukitzaile horizontala duen grafikoaren puntu bat: $f\'(a)=0$.', 'Un punto de la gráfica con tangente horizontal: $f\'(a)=0$.', 'نقطة من الرسم مماسها أفقي: $f\'(a)=0$.', 'A point of the graph with a horizontal tangent: $f\'(a)=0$.') }
        ],
        vocabulary: [
            say('maximoa', 'máximo', 'القيمة العظمى', 'maximum'),
            say('minimoa', 'mínimo', 'القيمة الصغرى', 'minimum')
        ],
        explanation: say(
            'Maximo edo minimo batean ukitzailea horizontala da; beraz, $f\'(a)=0$. Baina $f\'(a)=0$ duen puntu oro ez da mutur bat: $f\'$ deribatuaren zeinua begiratu behar da alde bakoitzean. Adibidez, $f(x)=x^3$ funtzioak $f\'(0)=0$ du, eta hazten jarraitzen du.',
            'En un máximo o en un mínimo la tangente es horizontal, así que $f\'(a)=0$. Pero no todo punto con $f\'(a)=0$ es un extremo: hay que mirar el signo de $f\'$ a cada lado. Por ejemplo, $f(x)=x^3$ tiene $f\'(0)=0$ y sigue creciendo.',
            'عند قيمة عظمى أو صغرى يكون المماس أفقيًّا، إذن $f\'(a)=0$. لكن ليست كل نقطة فيها $f\'(a)=0$ قيمة قصوى: يجب النظر إلى إشارة $f\'$ على كل جانب. مثلًا $f(x)=x^3$ لها $f\'(0)=0$ وتبقى متزايدة.',
            'At a maximum or a minimum the tangent is horizontal, so $f\'(a)=0$. But not every point with $f\'(a)=0$ is an extreme: look at the sign of $f\'$ on each side. For example, $f(x)=x^3$ has $f\'(0)=0$ and keeps growing.'
        ),
        examplePrompt: say('Aurkitu $g(x)=x^3-3x$ funtzioaren muturrak.', 'Halla los extremos de $g(x)=x^3-3x$.', 'أوجد القيم القصوى لـ $g(x)=x^3-3x$.', 'Find the extremes of $g(x)=x^3-3x$.'),
        example: same('$g\'(x)=3x^2-3=0\\ \\to\\ x=\\pm 1$'),
        exampleAnswer: say('Maximoa $(-1,2)$ puntuan, eta minimoa $(1,-2)$ puntuan.', 'Máximo en $(-1,2)$ y mínimo en $(1,-2)$.', 'قيمة عظمى عند $(-1,2)$ وصغرى عند $(1,-2)$.', 'Maximum at $(-1,2)$ and minimum at $(1,-2)$.')
    },
    'extreme-coefficients': {
        definitions: [
            { term: say('Mutur-baldintza', 'Condición de extremo', 'شرط القيمة القصوى', 'Extreme condition'), meaning: say('$f\'(p)=0$, $x=p$ puntuan maximo edo minimo bat badago.', '$f\'(p)=0$ si hay un máximo o un mínimo en $x=p$.', '$f\'(p)=0$ إذا وُجدت قيمة عظمى أو صغرى عند $x=p$.', '$f\'(p)=0$ if there is a maximum or a minimum at $x=p$.') }
        ],
        vocabulary: [
            say('ekuazioa', 'ecuación', 'المعادلة', 'equation'),
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient')
        ],
        explanation: say(
            'Maximo edo minimo bat non dagoen jakinez gero, badakigu han deribatuak 0 balio duela, eta puntuaren altuera ere bai. Datu bakoitza ekuazio bat da, koefiziente ezezagunekin. Letrak beste ekuazio izanez gero, sistema ebazten da.',
            'Si se sabe dónde está un máximo o un mínimo, se sabe que allí la derivada vale 0, y también la altura del punto. Cada dato es una ecuación con los coeficientes desconocidos. Con tantas ecuaciones como letras, se resuelve el sistema.',
            'إذا عرفنا موضع قيمة عظمى أو صغرى عرفنا أن المشتقة هناك تساوي 0، وعرفنا ارتفاع النقطة أيضًا. وكل معطى معادلة بالمعاملات المجهولة. ومع معادلات بعدد الحروف نحل الجملة.',
            'If you know where a maximum or a minimum is, you know the derivative is 0 there, and also the height of the point. Each fact is an equation in the unknown coefficients. With as many equations as letters, you solve the system.'
        ),
        examplePrompt: say('Aurkitu $k$, $g(x)=x^3+kx$ funtzioak mutur bat izan dezan $x=2$ puntuan.', 'Halla $k$ para que $g(x)=x^3+kx$ tenga un extremo en $x=2$.', 'أوجد $k$ لتكون لـ $g(x)=x^3+kx$ قيمة قصوى عند $x=2$.', 'Find $k$ so that $g(x)=x^3+kx$ has an extreme at $x=2$.'),
        example: same('$g\'(2)=12+k=0\\ \\to\\ k=-12$'),
        exampleAnswer: say('$k=-12$ denean, $g\'(2)=0$.', 'Con $k=-12$, $g\'(2)=0$.', 'مع $k=-12$ يكون $g\'(2)=0$.', 'With $k=-12$, $g\'(2)=0$.')
    },

    /* ---------- 4. Optimisation ---------- */
    'max-profit': {
        definitions: [
            { term: say('Kostu marjinala', 'Coste marginal', 'التكلفة الحدية', 'Marginal cost'), meaning: say('$C\'(x)$: unitate bat gehiago egiteak, gutxi gorabehera, zenbat balio duen.', '$C\'(x)$: lo que cuesta, más o menos, fabricar una unidad más.', '$C\'(x)$: ما تكلّفه تقريبًا وحدة إضافية.', '$C\'(x)$: roughly what making one more unit costs.') }
        ],
        vocabulary: [
            say('mozkina', 'beneficio', 'الربح', 'profit'),
            say('diru-sarrera', 'ingreso', 'الإيراد', 'revenue')
        ],
        explanation: say(
            'Mozkina diru-sarrera ken gastua da. Unitate bat gehiagoren diru-sarrera haren kostua baino handiagoa den bitartean, gehiago ekoiztea komeni da; berdina denean, maximora iristen da. Horregatik, $B(x)$ deribatu eta 0 berdintzen da, eta $B\'$ deribatuaren zeinuarekin egiaztatzen da.',
            'El beneficio es lo que se ingresa menos lo que se gasta. Mientras el ingreso de una unidad más supera a su coste, conviene producir más; cuando lo iguala, se alcanza el máximo. Por eso se deriva $B(x)$, se iguala a 0 y se comprueba con el signo de $B\'$.',
            'الربح هو الإيراد ناقص الإنفاق. وما دام إيراد وحدة إضافية يفوق تكلفتها فمن المفيد إنتاج المزيد؛ وعندما يساويها نبلغ القيمة العظمى. لذلك نشتق $B(x)$ ونساويها بـ 0 ونتحقق بإشارة $B\'$.',
            'Profit is what comes in minus what is spent. While the revenue of one more unit beats its cost, it pays to produce more; when it equals it, the maximum is reached. That is why you differentiate $B(x)$, set it to 0 and check with the sign of $B\'$.'
        ),
        examplePrompt: say('$I(x)=50x$ eta $C(x)=2x^2+10x$ badira, zer ekoizpenek ematen du mozkin maximoa?', 'Con $I(x)=50x$ y $C(x)=2x^2+10x$, ¿qué producción da el beneficio máximo?', 'مع $I(x)=50x$ و$C(x)=2x^2+10x$، أي إنتاج يعطي الربح الأعظم؟', 'With $I(x)=50x$ and $C(x)=2x^2+10x$, which production gives the greatest profit?'),
        example: same('$B\'(x)=50-4x-10=0\\ \\to\\ x=10$'),
        exampleAnswer: say('10 unitate ekoiztea.', 'Producir 10 unidades.', 'إنتاج 10 وحدات.', 'Producing 10 units.')
    },
    optimize: {
        definitions: [
            { term: say('Helburu-funtzioa', 'Función objetivo', 'دالة الهدف', 'Objective function'), meaning: say('Ahalik eta handiena edo txikiena izan nahi den magnitudea.', 'La magnitud que se quiere hacer máxima o mínima.', 'المقدار الذي نريده أعظميًّا أو أصغريًّا.', 'The quantity you want to make as large or as small as possible.') }
        ],
        vocabulary: [
            say('aldagaia', 'variable', 'المتغير', 'variable'),
            say('baldintza', 'condición', 'الشرط', 'condition')
        ],
        explanation: say(
            'Optimizazio-problema batek ahalik eta handiena edo txikiena izan nahi den magnitude bat du, eta aldagaiak lotzen dituen baldintza bat. Baldintzarekin aldagai bat askatzen da, eta magnitudea aldagai bakarraren menpe geratzen da. Gero, muturra ohi bezala bilatzen da, eta galderari erantzuten zaio.',
            'Un problema de optimización tiene una magnitud que se quiere hacer lo mayor o lo menor posible y una condición que une las variables. Con la condición se despeja una variable y la magnitud queda en función de una sola. Después se busca el extremo como siempre y se responde a la pregunta.',
            'في مسألة الاستمثال مقدار نريده أكبر أو أصغر ما يمكن، وشرط يربط المتغيرات. بالشرط نعزل متغيرًا فيصير المقدار دالة في متغير واحد. ثم نبحث عن القيمة القصوى كالمعتاد ونجيب عن السؤال.',
            'An optimisation problem has a quantity to make as large or as small as possible and a condition that links the variables. With the condition you solve for one variable, and the quantity depends on a single one. Then find the extreme as usual and answer the question.'
        ),
        examplePrompt: say('Bi zenbaki positiboren batura 12 da. Zeinek dute biderkadurarik handiena?', 'Dos números positivos suman 12. ¿Cuáles tienen el producto mayor?', 'عددان موجبان مجموعهما 12. أيهما يعطيان أكبر جداء؟', 'Two positive numbers add up to 12. Which have the greatest product?'),
        example: same('$P(x)=x(12-x)\\qquad P\'(x)=12-2x=0\\ \\to\\ x=6$'),
        exampleAnswer: say('Biak 6 dira, eta biderkadura 36.', 'Los dos valen 6 y el producto es 36.', 'كلاهما 6 والجداء 36.', 'Both are 6 and the product is 36.')
    },
    'interval-extremes': {
        definitions: [
            { term: say('Maximo absolutua', 'Máximo absoluto', 'القيمة العظمى المطلقة', 'Absolute maximum'), meaning: say('Funtzioaren baliorik handiena tarte osoan.', 'El mayor valor de la función en todo el intervalo.', 'أكبر قيمة للدالة في كل المجال.', 'The greatest value of the function on the whole interval.') }
        ],
        vocabulary: [
            say('ertza', 'borde', 'الطرف', 'border'),
            say('hautagaia', 'candidato', 'المرشح', 'candidate')
        ],
        explanation: say(
            'Tarte itxi batean, maximoa eta minimoa puntu singular batean edo ertz batean egon daitezke, eta ertzean deribatuak ez du zertan 0 balio. Horregatik, hautagai guztiak kalkulatu eta alderatzen dira. Tartetik kanpo geratzen diren puntu singularrek ez dute kontatzen.',
            'En un intervalo cerrado, el máximo y el mínimo pueden estar en un punto singular o en un borde, donde la derivada no tiene por qué valer 0. Por eso se calculan todos los candidatos y se comparan. Los puntos singulares que caen fuera del intervalo no cuentan.',
            'في مجال مغلق قد تكون القيمتان العظمى والصغرى عند نقطة حرجة أو عند طرف، حيث لا يلزم أن تساوي المشتقة 0. لذلك نحسب كل المرشحين ونقارن بينهم. والنقاط الحرجة الواقعة خارج المجال لا تُحسب.',
            'On a closed interval, the maximum and the minimum can be at a stationary point or at a border, where the derivative need not be 0. That is why you work out every candidate and compare them. Stationary points outside the interval do not count.'
        ),
        examplePrompt: say('Aurkitu $g(x)=x^3-3x$ funtzioaren maximoa $[0,3]$ tartean.', 'Halla el máximo de $g(x)=x^3-3x$ en $[0,3]$.', 'أوجد القيمة العظمى لـ $g(x)=x^3-3x$ في $[0,3]$.', 'Find the maximum of $g(x)=x^3-3x$ on $[0,3]$.'),
        example: same('$g(0)=0\\qquad g(1)=-2\\qquad g(3)=18$'),
        exampleAnswer: say('Maximoa 18 da, $x=3$ ertzean.', 'El máximo es 18, en el borde $x=3$.', 'القيمة العظمى 18 عند الطرف $x=3$.', 'The maximum is 18, at the border $x=3$.')
    },

    /* ---------- 5. Graphs ---------- */
    'polynomial-graph': {
        definitions: [
            { term: say('Adar infinituak', 'Ramas infinitas', 'الفروع اللانهائية', 'Infinite branches'), meaning: say('Funtzioak zer egiten duen $x\\to\\pm\\infty$ denean.', 'Lo que hace la función cuando $x\\to\\pm\\infty$.', 'ما تفعله الدالة عندما $x\\to\\pm\\infty$.', 'What the function does as $x\\to\\pm\\infty$.') }
        ],
        vocabulary: [
            say('ebaki-puntuak', 'cortes', 'نقاط التقاطع', 'intercepts'),
            say('ardatzak', 'ejes', 'المحاور', 'axes')
        ],
        explanation: say(
            'Ardatzekin dituen ebaki-puntuak bilatzen dira, puntu singularrak beren altuerarekin, eta haien arteko hazkundea. Polinomio baten adar infinituak maila handieneko gaiak agintzen ditu. Datu horiekin, puntuak kurba leun batekin lotzen dira, puntarik eta jauzirik gabe.',
            'Se buscan los cortes con los ejes, los puntos singulares con su altura y el crecimiento entre ellos. Las ramas infinitas de un polinomio las manda el término de mayor grado. Con estos datos se unen los puntos con una curva suave, sin picos ni saltos.',
            'نبحث عن نقاط التقاطع مع المحاور، والنقاط الحرجة مع ارتفاعها، والتزايد بينها. والفروع اللانهائية للحدودية يحددها الحد ذو الدرجة الأكبر. وبهذه المعطيات نصل النقاط بمنحنى أملس دون رؤوس ولا قفزات.',
            'Find the intercepts with the axes, the stationary points with their height and the growth between them. The infinite branches of a polynomial follow the highest-degree term. With these facts, join the points with a smooth curve, with no peaks or jumps.'
        ),
        examplePrompt: say('Marraztu $g(x)=-x^2+4x$.', 'Representa $g(x)=-x^2+4x$.', 'ارسم $g(x)=-x^2+4x$.', 'Draw $g(x)=-x^2+4x$.'),
        example: same('$g\'(x)=-2x+4=0\\ \\to\\ x=2\\qquad g(2)=4$'),
        exampleAnswer: say('Beherantz irekitako parabola, maximoa $(2,4)$ puntuan eta ebaki-puntuak $x=0$ eta $x=4$.', 'Parábola hacia abajo con máximo en $(2,4)$ y cortes en $x=0$ y $x=4$.', 'قطع مكافئ مفتوح إلى الأسفل قيمته العظمى عند $(2,4)$ ويقطع المحور عند $x=0$ و$x=4$.', 'A downward parabola with its maximum at $(2,4)$ and intercepts at $x=0$ and $x=4$.')
    },
    'rational-graph': {
        definitions: [
            { term: say('Izate-eremua', 'Dominio', 'المجال', 'Domain'), meaning: say('Funtzioa existitzen den $x$ balioak: hemen, izendatzailea anulatzen dutenak izan ezik, denak.', 'Los $x$ donde la función existe: aquí, todos menos los que anulan el denominador.', 'قيم $x$ التي توجد عندها الدالة: هنا كلها ما عدا التي تعدم المقام.', 'The $x$ where the function exists: here, all but those that make the denominator 0.') }
        ],
        vocabulary: [
            say('asintota', 'asíntota', 'المقارب', 'asymptote'),
            say('zeinuen taula', 'tabla de signos', 'جدول الإشارات', 'sign table')
        ],
        explanation: say(
            'Lehenik, izate-eremutik kentzen da izendatzailea anulatzen duena, eta asintotak bilatzen dira limiteekin. Gero, polinomio batean bezala: ebaki-puntuak, puntu singularrak eta hazkundea. $f\'$ deribatuaren zeinuen taulan asintota bertikala ere jarri behar da, alde bakoitzean zeinua desberdina izan daitekeelako.',
            'Primero se quita del dominio lo que anula el denominador y se buscan las asíntotas con los límites. Después, como en un polinomio: cortes, puntos singulares y crecimiento. En la tabla de signos de $f\'$ hay que poner también la asíntota vertical, porque a cada lado el signo puede ser distinto.',
            'أولًا نحذف من المجال ما يعدم المقام ونبحث عن المقاربات بالنهايات. ثم كما في الحدودية: نقاط التقاطع والنقاط الحرجة والتزايد. وفي جدول إشارات $f\'$ يجب وضع المقارب الرأسي أيضًا لأن الإشارة قد تختلف على جانبيه.',
            'First remove from the domain what makes the denominator 0 and find the asymptotes with limits. Then, as with a polynomial: intercepts, stationary points and growth. In the sign table of $f\'$ the vertical asymptote must also go in, because the sign can differ on each side.'
        ),
        examplePrompt: say('Aurkitu $g(x)=\\frac{4}{x^2+1}$ funtzioaren muturrak.', 'Halla los extremos de $g(x)=\\frac{4}{x^2+1}$.', 'أوجد القيم القصوى لـ $g(x)=\\frac{4}{x^2+1}$.', 'Find the extremes of $g(x)=\\frac{4}{x^2+1}$.'),
        example: same('$g\'(x)=\\frac{-8x}{(x^2+1)^2}=0\\ \\to\\ x=0$'),
        exampleAnswer: say('Maximoa $(0,4)$ puntuan; $y=0$ asintota horizontala.', 'Máximo en $(0,4)$; asíntota horizontal $y=0$.', 'قيمة عظمى عند $(0,4)$؛ ومقارب أفقي $y=0$.', 'Maximum at $(0,4)$; horizontal asymptote $y=0$.')
    },
    'derivative-graph': {
        definitions: [
            { term: say('Deribatuaren grafikoa', 'Gráfica de la derivada', 'رسم المشتقة', 'Graph of the derivative'), meaning: say('$y=f\'(x)$ kurba: haren altuera $f$ funtzioaren malda da.', 'La curva $y=f\'(x)$: su altura es la pendiente de $f$.', 'المنحنى $y=f\'(x)$: ارتفاعه هو ميل $f$.', 'The curve $y=f\'(x)$: its height is the slope of $f$.') }
        ],
        vocabulary: [
            say('ardatza', 'eje', 'المحور', 'axis'),
            say('ebaki', 'corta', 'تقطع', 'cuts')
        ],
        explanation: say(
            '$f$ funtzioaren grafikoari begiratuz, $f\'$ deribatuarena marraz daiteke: puntu bakoitzean haren altuera $f$ funtzioaren malda da. $f$ igotzen den lekuan, $f\'$ ardatzaren gainetik doa; $f$ jaisten den lekuan, azpitik; eta $f$ funtzioaren muturretan, $f\'$ deribatuak ardatza ebakitzen du.',
            'Mirando la gráfica de $f$ se puede dibujar la de $f\'$: en cada punto su altura es la pendiente de $f$. Donde $f$ sube, $f\'$ va por encima del eje; donde $f$ baja, por debajo, y en los extremos de $f$ la gráfica de $f\'$ corta el eje.',
            'بالنظر إلى رسم $f$ يمكن رسم $f\'$: ارتفاعها عند كل نقطة هو ميل $f$. حيث تصعد $f$ تكون $f\'$ فوق المحور، وحيث تنزل $f$ تكون تحته، وعند القيم القصوى لـ $f$ يقطع رسم $f\'$ المحور.',
            'Looking at the graph of $f$ you can draw that of $f\'$: at each point its height is the slope of $f$. Where $f$ rises, $f\'$ is above the axis; where $f$ falls, below it; and at the extremes of $f$ the graph of $f\'$ cuts the axis.'
        ),
        examplePrompt: say('$g$ funtzioaren deribatua $g\'(x)=2x-6$ da. Non du $g$ funtzioak muturra, eta zer motatakoa?', 'La derivada de $g$ es $g\'(x)=2x-6$. ¿Dónde tiene $g$ su extremo y de qué tipo?', 'مشتقة $g$ هي $g\'(x)=2x-6$. أين القيمة القصوى لـ $g$ وما نوعها؟', 'The derivative of $g$ is $g\'(x)=2x-6$. Where is the extreme of $g$, and of which kind?'),
        example: same('$2x-6=0\\ \\to\\ x=3$'),
        exampleAnswer: say('$g\'$ negatiboa izatetik positiboa izatera pasatzen da: minimoa $x=3$ puntuan.', '$g\'$ pasa de negativa a positiva: mínimo en $x=3$.', 'تنتقل $g\'$ من سالبة إلى موجبة: قيمة صغرى عند $x=3$.', '$g\'$ goes from negative to positive: a minimum at $x=3$.')
    }
}

import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { Bach2DefiniteTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Integral mugatua · Batxilergoa 2 · Zientziak — what each lesson tells:
   the new words (definitions), a short explanation, the example as an
   exercise («Another example»), the key words in four languages and, in
   eight lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics and gives each language its
   trigonometric names (\sin is sen in Spanish). The example uses numbers
   of its own, never those of «Let's solve», of «Check it» or of the
   typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const bach2DefiniteLessonTexts: Record<Bach2DefiniteTopicId, LessonTexts> = {
    /* ---------- 1. Review from 1.º ---------- */
    'barrow-review': {
        definitions: [
            { term: say('Integral mugatua', 'Integral definida', 'التكامل المحدد', 'Definite integral'), meaning: say('$\\int_a^b f(x)\\,dx$ zenbakia: $f$ funtzioaren azalera zeinuduna, $a$ eta $b$ artean.', 'El número $\\int_a^b f(x)\\,dx$: el área con signo de $f$ entre $a$ y $b$.', 'العدد $\\int_a^b f(x)\\,dx$: المساحة ذات الإشارة لـ $f$ بين $a$ و$b$.', 'The number $\\int_a^b f(x)\\,dx$: the signed area of $f$ between $a$ and $b$.') }
        ],
        vocabulary: [
            say('jatorrizkoa', 'primitiva', 'الدالة الأصلية', 'antiderivative'),
            say('muga', 'límite', 'الحد', 'limit')
        ],
        explanation: say(
            'Barrow-ren erregelak integral mugatu bat kalkulatzen du $F$ jatorrizko batekin: goiko mugako balioa ken beheko mugako balioa. $k$ konstantea desagertu egiten da kentzean. Mugak alderantzikatzen badira, integralak zeinua aldatzen du; eta tartea puntu batean zatitzen bada, bi integralak batu egiten dira.',
            'La regla de Barrow calcula una integral definida con una primitiva $F$: su valor en el límite de arriba menos su valor en el de abajo. La constante $k$ se anula al restar. Si se invierten los límites, la integral cambia de signo; y si se parte el intervalo en un punto, las dos integrales se suman.',
            'تحسب قاعدة بارو التكامل المحدد بدالة أصلية $F$: قيمتها عند الحد الأعلى ناقص قيمتها عند الحد الأدنى. ويختفي الثابت $k$ عند الطرح. وإذا قلبنا الحدّين تغيّرت إشارة التكامل، وإذا قسمنا الفترة عند نقطة جمعنا التكاملين.',
            'Barrow\'s rule works out a definite integral with an antiderivative $F$: its value at the top limit minus its value at the bottom one. The constant $k$ cancels when you subtract. If the limits are swapped, the integral changes sign; and if the interval is split at a point, the two integrals add up.'
        ),
        examplePrompt: say('Kalkulatu $\\int_0^2(x^3+1)\\,dx$ eta $\\int_2^0(x^3+1)\\,dx$.', 'Calcula $\\int_0^2(x^3+1)\\,dx$ y $\\int_2^0(x^3+1)\\,dx$.', 'احسب $\\int_0^2(x^3+1)\\,dx$ و$\\int_2^0(x^3+1)\\,dx$.', 'Work out $\\int_0^2(x^3+1)\\,dx$ and $\\int_2^0(x^3+1)\\,dx$.'),
        example: same('$\\begin{aligned}&\\left[\\frac{x^4}{4}+x\\right]_0^2=4+2=6\\\\ &\\int_2^0(x^3+1)\\,dx=-6\\end{aligned}$'),
        exampleAnswer: say('Mugak alderantzikatzean, zeinua bakarrik aldatzen da.', 'Al invertir los límites solo cambia el signo.', 'عند قلب الحدّين تتغير الإشارة فقط.', 'Swapping the limits only changes the sign.'),
        why: {
            text: say(
                'Zergatik ez da $k$ jartzen? Edozein jatorrizko $F+k$ da, eta kentzean: $(F(b)+k)-(F(a)+k)=F(b)-F(a)$. Jatorrizko guztiek zenbaki bera ematen dute.',
                '¿Por qué no se pone $k$? Cualquier primitiva es $F+k$, y al restar: $(F(b)+k)-(F(a)+k)=F(b)-F(a)$. Todas las primitivas dan el mismo número.',
                'لماذا لا نضع $k$؟ كل دالة أصلية هي $F+k$، وعند الطرح: $(F(b)+k)-(F(a)+k)=F(b)-F(a)$. فكل الدوال الأصلية تعطي العدد نفسه.',
                'Why is there no $k$? Any antiderivative is $F+k$, and when you subtract: $(F(b)+k)-(F(a)+k)=F(b)-F(a)$. Every antiderivative gives the same number.'
            )
        }
    },
    'areas-review': {
        definitions: [
            { term: say('Barrutia', 'Recinto', 'المنطقة', 'Region'), meaning: say('Kurba batzuek (eta, batzuetan, X ardatzak edo $x=a$ bezalako zuzenek) itxitako planoaren eskualdea.', 'La región del plano encerrada por unas curvas (y, a veces, por el eje X o rectas como $x=a$).', 'جزء المستوى الذي تحيط به منحنيات (وأحيانًا محور X أو مستقيمات مثل $x=a$).', 'The part of the plane closed off by some curves (and sometimes by the x-axis or lines such as $x=a$).') }
        ],
        vocabulary: [
            say('ardatza', 'eje', 'المحور', 'axis'),
            say('ebaki-puntua', 'corte', 'نقطة التقاطع', 'crossing'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value')
        ],
        explanation: say(
            'Integralak positibo gisa zenbatzen du X ardatzaren gainean dagoena, eta negatibo gisa azpian dagoena. Azalera bat aurkitzeko, lehenik ardatzarekiko ebaki-puntuak aurkitzen dira; gero zati bakoitza bere aldetik integratzen da, eta balio absolutuak batzen dira. Bi kurben artean, goikoa ken behekoa integratzen da, haien ebaki-puntuen artean.',
            'La integral cuenta en positivo lo que queda por encima del eje X y en negativo lo de debajo. Para un área, primero se hallan los cortes con el eje; luego se integra cada tramo por separado y se suman los valores absolutos. Entre dos curvas se integra la de arriba menos la de abajo, entre sus cortes.',
            'يحسب التكامل ما فوق محور X بالموجب وما تحته بالسالب. ولإيجاد مساحة نبحث أولًا عن نقاط التقاطع مع المحور، ثم نكامل كل جزء على حدة ونجمع القيم المطلقة. وبين منحنيين نكامل الأعلى ناقص الأدنى بين نقاط تقاطعهما.',
            'The integral counts what is above the x-axis as positive and what is below as negative. For an area, first find the crossings with the axis; then integrate each piece on its own and add the absolute values. Between two curves, integrate the top one minus the bottom one, between their crossings.'
        ),
        examplePrompt: say('Aurkitu $f(x)=4-x^2$ eta $g(x)=x+2$ kurbek itxitako barrutiaren azalera.', 'Halla el área del recinto encerrado entre $f(x)=4-x^2$ y $g(x)=x+2$.', 'أوجد مساحة المنطقة المحصورة بين $f(x)=4-x^2$ و$g(x)=x+2$.', 'Find the area of the region enclosed by $f(x)=4-x^2$ and $g(x)=x+2$.'),
        example: same('$\\int_{-2}^{1}(2-x-x^2)\\,dx=\\frac{9}{2}$'),
        exampleAnswer: say('Ebaki-puntuak $x=-2$ eta $x=1$ dira, eta goian $4-x^2$ dago.', 'Cortes en $x=-2$ y $x=1$; arriba va $4-x^2$.', 'التقاطع عند $x=-2$ و$x=1$، و$4-x^2$ في الأعلى.', 'Crossings at $x=-2$ and $x=1$; the top one is $4-x^2$.')
    },

    /* ---------- 2. Sums and mean value ---------- */
    'lower-upper': {
        definitions: [
            { term: say('Zatiketa', 'Partición', 'التجزئة', 'Partition'), meaning: say('Puntu hauek: $a=x_0<x_1<\\dots<x_n=b$; $[a,b]$ tartea zatitan banatzen dute.', 'Los puntos $a=x_0<x_1<\\dots<x_n=b$, que parten $[a,b]$ en tramos.', 'النقاط $a=x_0<x_1<\\dots<x_n=b$ التي تقسم $[a,b]$ إلى أجزاء.', 'The points $a=x_0<x_1<\\dots<x_n=b$, which split $[a,b]$ into pieces.') },
            { term: say('Behe-batura', 'Suma inferior', 'المجموع الأدنى', 'Lower sum'), meaning: say('Zati bakoitzean $f$ funtzioaren minimoa altuera duten laukizuzenen batura: $s=\\sum m_i\\,\\Delta x_i$.', 'La suma de los rectángulos que tienen como altura el mínimo de $f$ en cada tramo: $s=\\sum m_i\\,\\Delta x_i$.', 'مجموع المستطيلات التي ارتفاعها أصغر قيمة لـ $f$ في كل جزء: $s=\\sum m_i\\,\\Delta x_i$.', 'The sum of the rectangles whose height is the minimum of $f$ on each piece: $s=\\sum m_i\\,\\Delta x_i$.') },
            { term: say('Goi-batura', 'Suma superior', 'المجموع الأعلى', 'Upper sum'), meaning: say('Zati bakoitzean $f$ funtzioaren maximoa altuera duten laukizuzenen batura: $S=\\sum M_i\\,\\Delta x_i$.', 'La suma de los rectángulos que tienen como altura el máximo de $f$ en cada tramo: $S=\\sum M_i\\,\\Delta x_i$.', 'مجموع المستطيلات التي ارتفاعها أكبر قيمة لـ $f$ في كل جزء: $S=\\sum M_i\\,\\Delta x_i$.', 'The sum of the rectangles whose height is the maximum of $f$ on each piece: $S=\\sum M_i\\,\\Delta x_i$.') }
        ],
        vocabulary: [
            say('zatia', 'tramo', 'الجزء', 'piece'),
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('minimoa', 'mínimo', 'أصغر قيمة', 'minimum')
        ],
        explanation: say(
            '$[a,b]$ tartea zatitan banatzen da. Zati bakoitzean bi laukizuzen marrazten dira: bat kurbaren azpian, altuera minimoarekin, eta bestea gainean, maximoarekin. Azpikoen batura $s$ da, eta gainekoena $S$; azalera bien artean geratzen da. Kurba igo eta jaisten bada, minimoa zatiaren barruan egon daiteke.',
            'Se parte $[a,b]$ en tramos. En cada tramo se dibuja un rectángulo por debajo de la curva, con la altura mínima, y otro por encima, con la máxima. Los de abajo suman $s$ y los de arriba, $S$; el área queda entre las dos. Si la curva sube y baja, el mínimo puede estar dentro del tramo.',
            'نقسم $[a,b]$ إلى أجزاء. وفي كل جزء نرسم مستطيلًا تحت المنحنى بأصغر ارتفاع وآخر فوقه بأكبر ارتفاع. مجموع السفلية $s$ ومجموع العلوية $S$، والمساحة بينهما. وإذا صعد المنحنى ونزل فقد تكون أصغر قيمة داخل الجزء.',
            'Split $[a,b]$ into pieces. On each piece draw one rectangle below the curve, with the minimum height, and another above it, with the maximum. The ones below add up to $s$ and the ones above to $S$; the area lies between the two. If the curve goes up and down, the minimum may be inside the piece.'
        ),
        examplePrompt: say('$\\{0,\\,1,\\,2\\}$ zatiketarekin, aurkitu $s$ eta $S$, $f(x)=8-x^2$ funtzioarentzat $[0,\\,2]$ tartean.', 'Con $\\{0,\\,1,\\,2\\}$, halla $s$ y $S$ para $f(x)=8-x^2$ en $[0,\\,2]$.', 'باستعمال $\\{0,\\,1,\\,2\\}$ أوجد $s$ و$S$ لـ $f(x)=8-x^2$ في $[0,\\,2]$.', 'With $\\{0,\\,1,\\,2\\}$, find $s$ and $S$ for $f(x)=8-x^2$ on $[0,\\,2]$.'),
        example: same('$\\begin{aligned}&s=1\\cdot 7+1\\cdot 4=11\\\\ &S=1\\cdot 8+1\\cdot 7=15\\end{aligned}$'),
        exampleAnswer: say('$f$ beherakorra da: minimoa eskuinean dago, eta maximoa ezkerrean. Egiaz, $A=\\frac{40}{3}\\approx 13{,}3$.', '$f$ decrece: el mínimo está a la derecha y el máximo, a la izquierda. De hecho, $A=\\frac{40}{3}\\approx 13{,}3$.', '$f$ متناقصة: أصغر قيمة عند اليمين وأكبرها عند اليسار. وفي الواقع $A=\\frac{40}{3}\\approx 13.3$.', '$f$ decreases: the minimum is on the right and the maximum on the left. In fact, $A=\\frac{40}{3}\\approx 13{,}3$.'),
        why: {
            text: say(
                'Zergatik igotzen da $s$ zatiketa finagoarekin? Zati bat bitan banatzean, erdi bakoitzaren minimoa zati osoarena bezainbestekoa edo handiagoa da: azpiko laukizuzenak hazi egiten dira. Gainekoekin alderantziz gertatzen da: $S$ jaitsi egiten da.',
                '¿Por qué sube $s$ con una partición más fina? Al partir un tramo en dos, el mínimo de cada mitad es igual o mayor que el del tramo entero: los rectángulos de abajo crecen. Con los de arriba pasa al revés: $S$ baja.',
                'لماذا يرتفع $s$ مع تجزئة أدق؟ عند تقسيم جزء إلى اثنين تكون أصغر قيمة في كل نصف مساوية لأصغر قيمة في الجزء كله أو أكبر منها: فتكبر المستطيلات السفلية. ويحدث العكس مع العلوية: ينخفض $S$.',
                'Why does $s$ go up with a finer partition? When a piece is split in two, the minimum on each half is equal to or bigger than the one on the whole piece: the rectangles below grow. The ones above do the opposite: $S$ goes down.'
            )
        }
    },
    'limit-sums': {
        definitions: [
            { term: say('Funtzio integragarria', 'Función integrable', 'دالة قابلة للتكامل', 'Integrable function'), meaning: say('$\\lim s_n$ eta $\\lim S_n$ berdinak dituena; balio komun hori $\\int_a^b f(x)\\,dx$ da.', 'La que tiene $\\lim s_n$ y $\\lim S_n$ iguales; ese valor común es $\\int_a^b f(x)\\,dx$.', 'دالة لها $\\lim s_n$ و$\\lim S_n$ متساويتان؛ وتلك القيمة المشتركة هي $\\int_a^b f(x)\\,dx$.', 'One whose $\\lim s_n$ and $\\lim S_n$ are equal; that common value is $\\int_a^b f(x)\\,dx$.') }
        ],
        vocabulary: [
            say('limitea', 'límite', 'النهاية', 'limit'),
            say('oinarria', 'base', 'القاعدة', 'base')
        ],
        explanation: say(
            '$n$ zati berdinekin, oinarri bakoitzak $\\frac{b-a}{n}$ neurtzen du. $n$ handitzean, laukizuzenak kurbara egokitzen dira: $s_n$ igo egiten da, $S_n$ jaitsi, eta $S_n-s_n$ diferentzia 0 zenbakira hurbiltzen da. Limite komuna integrala da. Kalkulatzeko, batura $\\sum i$ edo $\\sum i^2$ erabiliz idazten da, eta haren formula erabiltzen da.',
            'Con $n$ tramos iguales, cada base mide $\\frac{b-a}{n}$. Al aumentar $n$, los rectángulos se ajustan a la curva: $s_n$ sube, $S_n$ baja y la diferencia $S_n-s_n$ tiende a 0. El límite común es la integral. Para calcularlo, se escribe la suma con $\\sum i$ o $\\sum i^2$ y se usa su fórmula.',
            'مع $n$ أجزاء متساوية تقيس كل قاعدة $\\frac{b-a}{n}$. وعند زيادة $n$ تنطبق المستطيلات على المنحنى: يرتفع $s_n$ وينخفض $S_n$ ويقترب الفرق $S_n-s_n$ من 0. والنهاية المشتركة هي التكامل. ولحسابها نكتب المجموع بـ $\\sum i$ أو $\\sum i^2$ ونستعمل صيغته.',
            'With $n$ equal pieces, each base measures $\\frac{b-a}{n}$. As $n$ grows, the rectangles fit the curve: $s_n$ goes up, $S_n$ goes down and the difference $S_n-s_n$ approaches 0. The common limit is the integral. To work it out, write the sum with $\\sum i$ or $\\sum i^2$ and use its formula.'
        ),
        cases: [
            { title: say('Lehen zenbakien batura', 'Suma de los primeros números', 'مجموع الأعداد الأولى', 'Sum of the first numbers'), text: say('$1+2+\\dots+n$ batura:', 'La suma $1+2+\\dots+n$:', 'المجموع $1+2+\\dots+n$:', 'The sum $1+2+\\dots+n$:'), math: same('$\\sum_{i=1}^{n}i=\\frac{n(n+1)}{2}$') },
            { title: say('Karratuen batura', 'Suma de los cuadrados', 'مجموع المربعات', 'Sum of the squares'), text: say('$1^2+2^2+\\dots+n^2$ batura:', 'La suma $1^2+2^2+\\dots+n^2$:', 'المجموع $1^2+2^2+\\dots+n^2$:', 'The sum $1^2+2^2+\\dots+n^2$:'), math: same('$\\sum_{i=1}^{n}i^2=\\frac{n(n+1)(2n+1)}{6}$') }
        ],
        examplePrompt: say('Kalkulatu $\\int_0^2 x\\,dx$, goi-baturen limite gisa.', 'Calcula $\\int_0^2 x\\,dx$ como límite de las sumas superiores.', 'احسب $\\int_0^2 x\\,dx$ بوصفه نهاية المجاميع العليا.', 'Work out $\\int_0^2 x\\,dx$ as the limit of the upper sums.'),
        example: same('$\\begin{aligned}&S_n=\\frac{4}{n^2}\\cdot\\frac{n(n+1)}{2}\\\\ &=\\frac{2(n+1)}{n}\\to 2\\end{aligned}$'),
        exampleAnswer: say('Oinarria $\\frac{2}{n}$ da, eta altuera $\\frac{2i}{n}$. Egiaztatu: triangeluaren azalera $\\frac{2\\cdot 2}{2}=2$ da.', 'Base $\\frac{2}{n}$ y altura $\\frac{2i}{n}$. Comprueba: el triángulo tiene área $\\frac{2\\cdot 2}{2}=2$.', 'القاعدة $\\frac{2}{n}$ والارتفاع $\\frac{2i}{n}$. تحقق: مساحة المثلث $\\frac{2\\cdot 2}{2}=2$.', 'Base $\\frac{2}{n}$ and height $\\frac{2i}{n}$. Check: the triangle has area $\\frac{2\\cdot 2}{2}=2$.'),
        why: {
            text: say(
                'Zergatik da integragarria funtzio jarraitu oro? Zati oso estu batean, funtzio jarraitu bat ia ez da aldatzen: haren minimoa eta maximoa oso hurbil daude. Horrela, gaineko laukizuzen bakoitza azpikoa baino apur bat handiagoa baino ez da, eta $S_n-s_n$ diferentzia 0 zenbakira hurbiltzen da.',
                '¿Por qué toda función continua es integrable? En un tramo muy estrecho, una función continua casi no cambia: su mínimo y su máximo están muy cerca. Así, cada rectángulo de arriba sobrepasa muy poco al de abajo, y $S_n-s_n$ tiende a 0.',
                'لماذا تكون كل دالة متصلة قابلة للتكامل؟ في جزء ضيق جدًا لا تكاد الدالة المتصلة تتغير: أصغر قيمة لها وأكبرها متقاربتان جدًا. لذلك يزيد كل مستطيل علوي قليلًا جدًا على السفلي، ويقترب $S_n-s_n$ من 0.',
                'Why is every continuous function integrable? On a very narrow piece, a continuous function hardly changes: its minimum and maximum are very close. So each rectangle above is only a little bigger than the one below, and $S_n-s_n$ approaches 0.'
            )
        }
    },
    'mean-value': {
        definitions: [
            { term: say('Batez besteko balioa', 'Valor medio', 'القيمة المتوسطة', 'Mean value'), meaning: say('$\\frac{1}{b-a}\\int_a^b f(x)\\,dx$ zenbakia: azalera bereko laukizuzenaren altuera, $b-a$ oinarria duena.', 'El número $\\frac{1}{b-a}\\int_a^b f(x)\\,dx$: la altura del rectángulo de base $b-a$ con la misma área.', 'العدد $\\frac{1}{b-a}\\int_a^b f(x)\\,dx$: ارتفاع المستطيل الذي قاعدته $b-a$ وله المساحة نفسها.', 'The number $\\frac{1}{b-a}\\int_a^b f(x)\\,dx$: the height of the rectangle of base $b-a$ with the same area.') }
        ],
        vocabulary: [
            say('laukizuzena', 'rectángulo', 'المستطيل', 'rectangle'),
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('jarraitua', 'continua', 'متصلة', 'continuous')
        ],
        explanation: say(
            '$f$ jarraitua bada $[a,b]$ tartean, bada $b-a$ oinarriko laukizuzen bat, kurbaren azpiko eskualdearen azalera bera duena. Haren altuera $f$ funtzioaren batez besteko balioa da, eta tarteko $c$ batean lortzen da. $c$ aurkitzeko: integrala kalkulatu, $b-a$ luzeraz zatitu, eta $f(c)$ zenbaki horrekin berdindu.',
            'Si $f$ es continua en $[a,b]$, hay un rectángulo de base $b-a$ con la misma área que la región bajo la curva. Su altura es el valor medio de $f$, y se alcanza en algún $c$ del intervalo. Para hallar $c$: se calcula la integral, se divide entre $b-a$ y se iguala $f(c)$ a ese número.',
            'إذا كانت $f$ متصلة في $[a,b]$ فهناك مستطيل قاعدته $b-a$ وله مساحة المنطقة تحت المنحنى نفسها. ارتفاعه هو القيمة المتوسطة لـ $f$، ونبلغها عند $c$ ما في الفترة. ولإيجاد $c$ نحسب التكامل ونقسم على $b-a$ ونساوي $f(c)$ بهذا العدد.',
            'If $f$ is continuous on $[a,b]$, there is a rectangle of base $b-a$ with the same area as the region under the curve. Its height is the mean value of $f$, and it is reached at some $c$ in the interval. To find $c$: work out the integral, divide by $b-a$ and set $f(c)$ equal to that number.'
        ),
        examplePrompt: say('Aurkitu $f(x)=2x+1$ funtzioaren batez besteko balioa $[1,\\,4]$ tartean, eta $c$ puntua.', 'Halla el valor medio de $f(x)=2x+1$ en $[1,\\,4]$ y el $c$ donde se alcanza.', 'أوجد القيمة المتوسطة لـ $f(x)=2x+1$ في $[1,\\,4]$ و$c$ الذي تُبلغ عنده.', 'Find the mean value of $f(x)=2x+1$ on $[1,\\,4]$ and the $c$ where it is reached.'),
        example: same('$\\begin{aligned}&\\frac{18}{3}=6\\\\ &2c+1=6\\to c=\\frac{5}{2}\\end{aligned}$'),
        exampleAnswer: say('$\\int_1^4(2x+1)\\,dx=20-2=18$; $c$ tartearen erdia da, $f$ zuzen bat delako.', '$\\int_1^4(2x+1)\\,dx=20-2=18$; $c$ es el centro porque $f$ es una recta.', '$\\int_1^4(2x+1)\\,dx=20-2=18$؛ و$c$ هو المنتصف لأن $f$ مستقيم.', '$\\int_1^4(2x+1)\\,dx=20-2=18$; $c$ is the middle because $f$ is a straight line.'),
        why: {
            text: say(
                'Zergatik dago $c$? $m$ eta $M$ $f$ funtzioaren minimoa eta maximoa badira, azalera $m(b-a)$ eta $M(b-a)$ artean dago; beraz, batez besteko balioa $m$ eta $M$ artean dago. Funtzio jarraitu batek minimoaren eta maximoaren arteko balio guztiak hartzen ditu: hori ere bai.',
                '¿Por qué existe $c$? Si $m$ y $M$ son el mínimo y el máximo de $f$, el área está entre $m(b-a)$ y $M(b-a)$, así que el valor medio está entre $m$ y $M$. Una función continua toma todos los valores entre su mínimo y su máximo: también ese.',
                'لماذا يوجد $c$؟ إذا كان $m$ و$M$ أصغر قيمة لـ $f$ وأكبرها فالمساحة بين $m(b-a)$ و$M(b-a)$، إذن القيمة المتوسطة بين $m$ و$M$. والدالة المتصلة تأخذ كل القيم بين أصغر قيمة لها وأكبرها: وهذه منها.',
                'Why does $c$ exist? If $m$ and $M$ are the minimum and maximum of $f$, the area is between $m(b-a)$ and $M(b-a)$, so the mean value is between $m$ and $M$. A continuous function takes every value between its minimum and its maximum: that one too.'
            )
        }
    },

    /* ---------- 3. The fundamental theorem ---------- */
    'area-function': {
        definitions: [
            { term: say('Funtzio integrala', 'Función integral', 'الدالة التكاملية', 'Integral function'), meaning: say('$F(x)=\\int_a^x f(t)\\,dt$: $a$ puntutik $x$ puntura pilatutako azalera.', '$F(x)=\\int_a^x f(t)\\,dt$: el área acumulada desde $a$ hasta $x$.', '$F(x)=\\int_a^x f(t)\\,dt$: المساحة المتراكمة من $a$ إلى $x$.', '$F(x)=\\int_a^x f(t)\\,dt$: the area piled up from $a$ to $x$.') },
            { term: say('Integrazio-aldagaia', 'Variable de integración', 'متغير التكامل', 'Variable of integration'), meaning: say('Barruko letra, $t$; ez da kanpora ateratzen, eta beste edozein letra izan daiteke.', 'La letra de dentro, $t$; no sale fuera y podría ser cualquier otra.', 'الحرف الذي في الداخل $t$؛ لا يخرج ويمكن أن يكون أي حرف آخر.', 'The letter inside, $t$; it does not come out and could be any other.') }
        ],
        vocabulary: [
            say('deribatua', 'derivada', 'المشتقة', 'derivative'),
            say('jatorrizkoa', 'primitiva', 'الدالة الأصلية', 'antiderivative')
        ],
        explanation: say(
            '$F(x)=\\int_a^x f(t)\\,dt$ funtzioan, goiko muga da aldagaia: $x$ bakoitzak azalera bat ematen du, $a$ puntutik pilatutakoa. Barruan beste letra bat idazten da, $t$, $x$ letrarekin ez nahasteko. Oinarrizko teoremak dio haren deribatua barruko funtzioa dela: $F\'(x)=f(x)$. Gainera, $F(a)=0$.',
            'En $F(x)=\\int_a^x f(t)\\,dt$ el límite de arriba es la variable: cada $x$ da un área, la acumulada desde $a$. Dentro se escribe otra letra, $t$, para no confundirla con $x$. El teorema fundamental dice que su derivada es la función de dentro: $F\'(x)=f(x)$. Además, $F(a)=0$.',
            'في $F(x)=\\int_a^x f(t)\\,dt$ الحد الأعلى هو المتغير: كل $x$ يعطي مساحة، هي المتراكمة من $a$. وفي الداخل نكتب حرفًا آخر $t$ حتى لا نخلطه بـ $x$. وتقول المبرهنة الأساسية إن مشتقتها هي الدالة التي في الداخل: $F\'(x)=f(x)$. كما أن $F(a)=0$.',
            'In $F(x)=\\int_a^x f(t)\\,dt$ the top limit is the variable: each $x$ gives an area, the one piled up from $a$. Inside, another letter is written, $t$, so as not to mix it up with $x$. The fundamental theorem says that its derivative is the function inside: $F\'(x)=f(x)$. Also, $F(a)=0$.'
        ),
        examplePrompt: say('Aurkitu $F(x)=\\int_1^x 3t^2\\,dt$ eta $F\'(x)$.', 'Halla $F(x)=\\int_1^x 3t^2\\,dt$ y $F\'(x)$.', 'أوجد $F(x)=\\int_1^x 3t^2\\,dt$ و$F\'(x)$.', 'Find $F(x)=\\int_1^x 3t^2\\,dt$ and $F\'(x)$.'),
        example: same('$\\begin{aligned}&F(x)=x^3-1\\\\ &F\'(x)=3x^2\\end{aligned}$'),
        exampleAnswer: say('$F(1)=0$: 1 puntutik 1 punturako azalera nulua da.', '$F(1)=0$: el área desde 1 hasta 1 es nula.', '$F(1)=0$: المساحة من 1 إلى 1 منعدمة.', '$F(1)=0$: the area from 1 to 1 is zero.'),
        why: {
            text: say(
                'Zergatik $F\'(x)=f(x)$? $x$ pixka bat aurreratzen bada, $h$, azalera zerrenda estu bat hazten da, ia $f(x)$ altuerakoa: $F(x+h)-F(x)\\approx f(x)\\cdot h$. $h$ luzeraz zatitu eta $h\\to 0$ egitean, zatidura $f(x)$ funtziora hurbiltzen da.',
                '¿Por qué $F\'(x)=f(x)$? Si $x$ avanza un poco, $h$, el área crece una tira estrecha de altura casi $f(x)$: $F(x+h)-F(x)\\approx f(x)\\cdot h$. Al dividir entre $h$ y hacer $h\\to 0$, el cociente tiende a $f(x)$.',
                'لماذا $F\'(x)=f(x)$؟ إذا تقدّم $x$ قليلًا بمقدار $h$ تزداد المساحة شريحة ضيقة ارتفاعها تقريبًا $f(x)$: $F(x+h)-F(x)\\approx f(x)\\cdot h$. وبالقسمة على $h$ وجعل $h\\to 0$ يقترب خارج القسمة من $f(x)$.',
                'Why $F\'(x)=f(x)$? If $x$ moves on a little, $h$, the area grows by a narrow strip of height almost $f(x)$: $F(x+h)-F(x)\\approx f(x)\\cdot h$. Dividing by $h$ and letting $h\\to 0$, the quotient approaches $f(x)$.'
            )
        }
    },
    'upper-limit': {
        definitions: [
            { term: say('Muga aldakorra', 'Límite variable', 'حدّ متغير', 'Variable limit'), meaning: say('$x$ aldagaiarekin aldatzen den integral-muga: $x$, $x^2$, $\\sin x$…', 'Un límite de la integral que cambia con $x$: $x$, $x^2$, $\\sin x$…', 'حد للتكامل يتغير مع $x$: $x$ و$x^2$ و$\\sin x$…', 'A limit of the integral that changes with $x$: $x$, $x^2$, $\\sin x$…') }
        ],
        vocabulary: [
            say('katearen erregela', 'regla de la cadena', 'قاعدة السلسلة', 'chain rule'),
            say('goiko muga', 'límite de arriba', 'الحد الأعلى', 'top limit')
        ],
        explanation: say(
            'Goiko muga $g(x)$ funtzio bat bada, integrala $F(g(x))$ da, $F$ funtzio integrala izanik. Katearen erregelaren arabera, $g(x)$ jartzen da $t$ letraren ordez, eta $g\'(x)$ deribatuaz biderkatzen da. Beheko muga ere aldatzen bada, gauza bera kentzen da $h(x)$ funtzioarekin.',
            'Si el límite de arriba es una función $g(x)$, la integral es $F(g(x))$, con $F$ la función integral. Por la regla de la cadena, se pone $g(x)$ en lugar de $t$ y se multiplica por $g\'(x)$. Si el de abajo también varía, se resta lo mismo con $h(x)$.',
            'إذا كان الحد الأعلى دالة $g(x)$ فالتكامل هو $F(g(x))$ حيث $F$ الدالة التكاملية. وبقاعدة السلسلة نضع $g(x)$ بدل $t$ ونضرب في $g\'(x)$. وإذا تغيّر الحد الأدنى أيضًا نطرح الشيء نفسه مع $h(x)$.',
            'If the top limit is a function $g(x)$, the integral is $F(g(x))$, with $F$ the integral function. By the chain rule, put $g(x)$ in place of $t$ and multiply by $g\'(x)$. If the bottom limit also varies, subtract the same with $h(x)$.'
        ),
        examplePrompt: say('Deribatu $F(x)=\\int_2^{3x}t^2\\,dt$.', 'Deriva $F(x)=\\int_2^{3x}t^2\\,dt$.', 'اشتق $F(x)=\\int_2^{3x}t^2\\,dt$.', 'Differentiate $F(x)=\\int_2^{3x}t^2\\,dt$.'),
        example: same('$F\'(x)=(3x)^2\\cdot 3=27x^2$'),
        exampleAnswer: say('Egiaztatu: $F(x)=9x^3-\\frac{8}{3}$, eta haren deribatua $27x^2$ da.', 'Comprueba: $F(x)=9x^3-\\frac{8}{3}$, cuya derivada es $27x^2$.', 'تحقق: $F(x)=9x^3-\\frac{8}{3}$ ومشتقتها $27x^2$.', 'Check: $F(x)=9x^3-\\frac{8}{3}$, whose derivative is $27x^2$.'),
        why: {
            text: say(
                'Zergatik agertzen da $g\'(x)$? $F(u)=\\int_a^u f(t)\\,dt$ funtzio integralarekin, integrala $F(g(x))$ da, funtzio konposatu bat. Haren deribatua $F\'(g(x))\\cdot g\'(x)$ da, eta $F\'=f$.',
                '¿Por qué aparece $g\'(x)$? Con la función integral $F(u)=\\int_a^u f(t)\\,dt$, la integral es $F(g(x))$, una función compuesta. Su derivada es $F\'(g(x))\\cdot g\'(x)$, y $F\'=f$.',
                'لماذا يظهر $g\'(x)$؟ مع الدالة التكاملية $F(u)=\\int_a^u f(t)\\,dt$ يكون التكامل $F(g(x))$، أي دالة مركّبة. ومشتقتها $F\'(g(x))\\cdot g\'(x)$ و$F\'=f$.',
                'Why does $g\'(x)$ appear? With the integral function $F(u)=\\int_a^u f(t)\\,dt$, the integral is $F(g(x))$, a composite function. Its derivative is $F\'(g(x))\\cdot g\'(x)$, and $F\'=f$.'
            )
        }
    },
    'barrow-conditions': {
        definitions: [
            { term: say('Funtzio jarraitua', 'Función continua', 'دالة متصلة', 'Continuous function'), meaning: say('$[a,b]$ tartean jauzirik eta asintotarik ez duena: arkatza altxatu gabe marrazten da.', 'La que no tiene saltos ni asíntotas en $[a,b]$: se dibuja sin levantar el lápiz.', 'دالة ليس لها قفزات ولا مقاربات في $[a,b]$: تُرسم دون رفع القلم.', 'One with no jumps or asymptotes on $[a,b]$: it is drawn without lifting the pencil.') }
        ],
        vocabulary: [
            say('asintota', 'asíntota', 'المقارب', 'asymptote'),
            say('jauzia', 'salto', 'القفزة', 'jump'),
            say('tartea', 'intervalo', 'الفترة', 'interval')
        ],
        explanation: say(
            'Barrow-k tarte osoan balio duen $F$ jatorrizko bat erabiltzen du, eta horrek $f$ jarraitua izatea eskatzen du $[a,b]$ tartean. Kalkulatu aurretik, bilatu $f$ existitzen ez den puntuak (zero egiten diren izendatzaileak, zenbaki negatiboen logaritmoak). $[a,b]$ tartetik kanpo badaude, Barrow-k balio du. Asintota bat barruan badago, ez. Jauzi bat bakarrik badago, bertan zatitzen da.',
            'Barrow usa una primitiva $F$ válida en todo el intervalo, y eso exige $f$ continua en $[a,b]$. Antes de calcular, busca los puntos donde $f$ no existe (denominadores que se anulan, logaritmos de negativos). Si caen fuera de $[a,b]$, Barrow vale. Si hay una asíntota dentro, no. Si solo hay un salto, se parte en él.',
            'تستعمل قاعدة بارو دالة أصلية $F$ صالحة في الفترة كلها، وهذا يشترط أن تكون $f$ متصلة في $[a,b]$. قبل الحساب ابحث عن النقاط التي لا توجد فيها $f$ (مقامات تنعدم، ولوغاريتمات أعداد سالبة). فإذا وقعت خارج $[a,b]$ صحت القاعدة. وإذا كان مقارب في الداخل فلا. وإذا كانت قفزة فقط نقسم عندها.',
            'Barrow uses an antiderivative $F$ that is valid on the whole interval, and that needs $f$ continuous on $[a,b]$. Before working it out, look for the points where $f$ does not exist (denominators that become zero, logarithms of negatives). If they fall outside $[a,b]$, Barrow works. If there is an asymptote inside, it does not. If there is only a jump, split there.'
        ),
        cases: [
            { title: say('Asintota kanpoan', 'Asíntota fuera', 'المقارب في الخارج', 'Asymptote outside'), text: say('$\\int_1^3\\frac{dx}{x^2}$ integralean, $x=0$ tartetik kanpo dago: Barrow-k balio du.', 'En $\\int_1^3\\frac{dx}{x^2}$, $x=0$ queda fuera del intervalo: Barrow vale.', 'في $\\int_1^3\\frac{dx}{x^2}$ يقع $x=0$ خارج الفترة: تصح قاعدة بارو.', 'In $\\int_1^3\\frac{dx}{x^2}$, $x=0$ is outside the interval: Barrow works.') },
            { title: say('Asintota barruan', 'Asíntota dentro', 'المقارب في الداخل', 'Asymptote inside'), text: say('$\\int_{-1}^{2}\\frac{dx}{x}$ integralean, $x=0$ barruan dago: Barrow-k ez du balio.', 'En $\\int_{-1}^{2}\\frac{dx}{x}$, $x=0$ está dentro: Barrow no vale.', 'في $\\int_{-1}^{2}\\frac{dx}{x}$ يقع $x=0$ في الداخل: لا تصح قاعدة بارو.', 'In $\\int_{-1}^{2}\\frac{dx}{x}$, $x=0$ is inside: Barrow does not work.') },
            { title: say('Jauzi bat', 'Un salto', 'قفزة', 'A jump'), text: say('Zatika definitutako funtzio batek jauzi bat badu, jauziaren puntuan zatitzen da, eta zati bakoitzean Barrow aplikatzen da.', 'Si una función a trozos salta en un punto, se parte ahí y se aplica Barrow en cada trozo.', 'إذا قفزت دالة معرّفة على أجزاء عند نقطة نقسم عندها ونطبق بارو في كل جزء.', 'If a piecewise function jumps at a point, split there and apply Barrow on each piece.') }
        ],
        examplePrompt: say('Barrow aplika daiteke $\\int_2^4\\frac{dx}{x-1}$ integralean? Ahal bada, kalkulatu.', '¿Se puede aplicar Barrow a $\\int_2^4\\frac{dx}{x-1}$? Si se puede, calcúlala.', 'هل يمكن تطبيق بارو على $\\int_2^4\\frac{dx}{x-1}$؟ إن أمكن فاحسبه.', 'Can Barrow be applied to $\\int_2^4\\frac{dx}{x-1}$? If so, work it out.'),
        example: same('$\\left[\\ln|x-1|\\right]_2^4=\\ln 3$'),
        exampleAnswer: say('Bai: $x=1$ asintota $[2,\\,4]$ tartetik kanpo dago.', 'Sí: la asíntota $x=1$ queda fuera de $[2,\\,4]$.', 'نعم: المقارب $x=1$ يقع خارج $[2,\\,4]$.', 'Yes: the asymptote $x=1$ is outside $[2,\\,4]$.')
    },

    /* ---------- 4. Working out definite integrals ---------- */
    'definite-change': {
        definitions: [
            { term: say('Muga berriak', 'Límites nuevos', 'الحدود الجديدة', 'New limits'), meaning: say('$t=g(x)$ aldaketan, $g(a)$ eta $g(b)$ balioak: $t$ aldagaiaren mugak.', 'En el cambio $t=g(x)$, los valores $g(a)$ y $g(b)$: los límites de $t$.', 'في التعويض $t=g(x)$ القيمتان $g(a)$ و$g(b)$: حدود $t$.', 'In the change $t=g(x)$, the values $g(a)$ and $g(b)$: the limits of $t$.') }
        ],
        vocabulary: [
            say('aldagai-aldaketa', 'cambio de variable', 'تغيير المتغير', 'substitution'),
            say('muga', 'límite', 'الحدود', 'limit')
        ],
        explanation: say(
            'Integral mugatu batean, mugak $x$ aldagaiaren balioak dira. $t=g(x)$ aldaketa egitean, $t$ aldagaira pasatu behar dira: $g(a)$ eta $g(b)$ kalkulatzen dira, $t$ aldagaian integratzen da balio horien artean, eta hor amaitzen da, $x$ aldagaira itzuli gabe. Beste bide bat da lehenik $x$ aldagaiaren jatorrizkoa aurkitzea, eta Barrow aplikatzea $x$ aldagaiaren mugekin.',
            'En una integral definida, los límites son valores de $x$. Al hacer el cambio $t=g(x)$, hay que pasarlos a $t$: se calcula $g(a)$ y $g(b)$, se integra en $t$ entre esos valores y se termina ahí, sin volver a $x$. La otra forma es hallar primero la primitiva en $x$ y aplicar Barrow con los límites de $x$.',
            'في التكامل المحدد الحدود قيم لـ $x$. وعند التعويض $t=g(x)$ يجب نقلها إلى $t$: نحسب $g(a)$ و$g(b)$، ونكامل بـ $t$ بين هاتين القيمتين وننتهي هناك دون العودة إلى $x$. والطريقة الأخرى أن نجد أولًا الدالة الأصلية بـ $x$ ونطبق بارو بحدود $x$.',
            'In a definite integral, the limits are values of $x$. When you make the change $t=g(x)$, they have to be moved to $t$: work out $g(a)$ and $g(b)$, integrate in $t$ between those values and finish there, without going back to $x$. The other way is to find the antiderivative in $x$ first and apply Barrow with the limits of $x$.'
        ),
        examplePrompt: say('Kalkulatu $\\int_1^2\\frac{2x}{x^2+1}\\,dx$.', 'Calcula $\\int_1^2\\frac{2x}{x^2+1}\\,dx$.', 'احسب $\\int_1^2\\frac{2x}{x^2+1}\\,dx$.', 'Work out $\\int_1^2\\frac{2x}{x^2+1}\\,dx$.'),
        example: same('$\\int_2^5\\frac{dt}{t}=\\ln 5-\\ln 2$'),
        exampleAnswer: say('$t=x^2+1$ aldaketarekin: $x=1\\to t=2$ eta $x=2\\to t=5$.', 'Con $t=x^2+1$: $x=1\\to t=2$ y $x=2\\to t=5$.', 'مع $t=x^2+1$: $x=1\\to t=2$ و$x=2\\to t=5$.', 'With $t=x^2+1$: $x=1\\to t=2$ and $x=2\\to t=5$.'),
        why: {
            text: say(
                'Zergatik alda daitezke mugak? $G$ funtzioa $f$ funtzioaren jatorrizkoa bada, $G(g(x))$ funtzioa $f(g(x))\\,g\'(x)$ funtzioarena da. Barrow-ren arabera, $x$ aldagaiko integrala $G(g(b))-G(g(a))$ da: hain zuzen, $f$ funtzioaren integrala $g(a)$ eta $g(b)$ artean.',
                '¿Por qué se pueden cambiar los límites? Si $G$ es una primitiva de $f$, $G(g(x))$ lo es de $f(g(x))\\,g\'(x)$. Por Barrow, la integral en $x$ vale $G(g(b))-G(g(a))$: justo la integral de $f$ entre $g(a)$ y $g(b)$.',
                'لماذا يمكن تغيير الحدود؟ إذا كانت $G$ أصلية لـ $f$ فإن $G(g(x))$ أصلية لـ $f(g(x))\\,g\'(x)$. وبقاعدة بارو يساوي التكامل بـ $x$ القيمة $G(g(b))-G(g(a))$: وهو بالضبط تكامل $f$ بين $g(a)$ و$g(b)$.',
                'Why can the limits be changed? If $G$ is an antiderivative of $f$, $G(g(x))$ is one of $f(g(x))\\,g\'(x)$. By Barrow, the integral in $x$ is $G(g(b))-G(g(a))$: exactly the integral of $f$ between $g(a)$ and $g(b)$.'
            )
        }
    },
    'definite-parts': {
        vocabulary: [
            say('formula', 'fórmula', 'الصيغة', 'formula'),
            say('jatorrizkoa', 'primitiva', 'الدالة الأصلية', 'antiderivative')
        ],
        explanation: say(
            'Zatikako integrazioaren formulak mugekin ere balio du. $uv$ zatia $a$ eta $b$ artean kalkulatzen da, Barrow-rekin bezala, eta geratzen den integralak muga berberak ditu. $u$ eta $dv$ integral mugagabean bezala aukeratzen dira, eta hemen ez dago $k$ konstanterik. Amaieran, bi zenbaki geratzen dira, eta kendu egiten dira.',
            'La fórmula de partes también vale con límites. La parte $uv$ se evalúa entre $a$ y $b$, como en Barrow, y la integral que queda conserva los mismos límites. $u$ y $dv$ se eligen igual que en la indefinida, y aquí no hay constante $k$. Al final quedan dos números que se restan.',
            'تصح صيغة التجزئة مع الحدود أيضًا. يُحسب الجزء $uv$ بين $a$ و$b$ كما في بارو، ويحتفظ التكامل الباقي بالحدود نفسها. ونختار $u$ و$dv$ كما في التكامل غير المحدد، ولا يوجد هنا ثابت $k$. وفي النهاية يبقى عددان نطرحهما.',
            'The by-parts formula also works with limits. The part $uv$ is worked out between $a$ and $b$, as in Barrow, and the integral that is left keeps the same limits. $u$ and $dv$ are chosen as in the indefinite integral, and here there is no constant $k$. At the end, two numbers are left, and you subtract them.'
        ),
        examplePrompt: say('Kalkulatu $\\int_1^e x\\ln x\\,dx$.', 'Calcula $\\int_1^e x\\ln x\\,dx$.', 'احسب $\\int_1^e x\\ln x\\,dx$.', 'Work out $\\int_1^e x\\ln x\\,dx$.'),
        example: same('$\\begin{aligned}&\\left[\\frac{x^2}{2}\\ln x\\right]_1^e-\\int_1^e\\frac{x}{2}\\,dx\\\\ &=\\frac{e^2}{2}-\\frac{e^2-1}{4}=\\frac{e^2+1}{4}\\end{aligned}$'),
        exampleAnswer: say('$u=\\ln x$ eta $dv=x\\,dx$: logaritmoa deribatu egiten da.', '$u=\\ln x$ y $dv=x\\,dx$: el logaritmo se deriva.', '$u=\\ln x$ و$dv=x\\,dx$: نشتق اللوغاريتم.', '$u=\\ln x$ and $dv=x\\,dx$: the logarithm is differentiated.')
    },
    piecewise: {
        definitions: [
            { term: say('Zatika definitutako funtzioa', 'Función a trozos', 'دالة معرّفة على أجزاء', 'Piecewise function'), meaning: say('Tarte bakoitzean formula desberdina duen funtzioa.', 'Una función con una fórmula distinta en cada intervalo.', 'دالة لها صيغة مختلفة في كل فترة.', 'A function with a different formula on each interval.') },
            { term: say('Balio absolutua', 'Valor absoluto', 'القيمة المطلقة', 'Absolute value'), meaning: say('$|f(x)|$ funtzioa $f(x)$ da $f\\ge 0$ den tokian, eta $-f(x)$, $f<0$ den tokian: ez da inoiz negatiboa.', '$|f(x)|$ es $f(x)$ donde $f\\ge 0$ y $-f(x)$ donde $f<0$: nunca es negativo.', '$|f(x)|$ هي $f(x)$ حيث $f\\ge 0$ و$-f(x)$ حيث $f<0$: ليست سالبة أبدًا.', '$|f(x)|$ is $f(x)$ where $f\\ge 0$ and $-f(x)$ where $f<0$: it is never negative.') }
        ],
        vocabulary: [
            say('zatia', 'trozo', 'الجزء', 'piece'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Barrow-k jatorrizko bakarra behar du zati bakoitzean. Funtzioak formula aldatzen badu puntu batean, integrala bertan zatitzen da, eta zati bakoitza bere formularekin integratzen da. Balio absolutuarekin, lehenik barrukoaren zeroak bilatzen dira, eta zati bakoitzean balio absolutua kentzen da, bere zeinuarekin.',
            'Barrow necesita una sola primitiva en cada tramo. Si la función cambia de fórmula en un punto, se parte la integral ahí y cada trozo se integra con su fórmula. Con valor absoluto, primero se buscan los ceros de lo de dentro y se quita el valor absoluto en cada tramo, con su signo.',
            'تحتاج قاعدة بارو إلى دالة أصلية واحدة في كل جزء. فإذا غيّرت الدالة صيغتها عند نقطة نقسم التكامل عندها ونكامل كل جزء بصيغته. ومع القيمة المطلقة نبحث أولًا عن أصفار ما في داخلها، ثم نزيل القيمة المطلقة في كل جزء بإشارته.',
            'Barrow needs a single antiderivative on each piece. If the function changes formula at a point, split the integral there and integrate each piece with its own formula. With an absolute value, first find the zeros of what is inside, then remove the absolute value on each piece, with its sign.'
        ),
        examplePrompt: say('Kalkulatu $\\int_0^4 f(x)\\,dx$, $f(x)=x^2$ bada $x<2$ denean, eta $f(x)=4$ bada $x\\ge 2$ denean.', 'Calcula $\\int_0^4 f(x)\\,dx$ si $f(x)=x^2$ para $x<2$ y $f(x)=4$ para $x\\ge 2$.', 'احسب $\\int_0^4 f(x)\\,dx$ إذا كانت $f(x)=x^2$ عندما $x<2$ و$f(x)=4$ عندما $x\\ge 2$.', 'Work out $\\int_0^4 f(x)\\,dx$ if $f(x)=x^2$ for $x<2$ and $f(x)=4$ for $x\\ge 2$.'),
        example: same('$\\begin{aligned}&\\int_0^2 x^2\\,dx+\\int_2^4 4\\,dx\\\\ &=\\frac{8}{3}+8=\\frac{32}{3}\\end{aligned}$'),
        exampleAnswer: say('$x=2$ puntuan zatitzen da, formula aldatzen den tokian.', 'Se parte en $x=2$, donde cambia la fórmula.', 'نقسم عند $x=2$ حيث تتغير الصيغة.', 'Split at $x=2$, where the formula changes.')
    },

    /* ---------- 5. Regions and problems ---------- */
    'three-curves': {
        definitions: [
            { term: say('Zerrenda', 'Tira', 'الشريحة', 'Strip'), meaning: say('Barrutiaren zati bertikal bat, non goiko eta beheko kurbak beti berak diren.', 'Un trozo vertical del recinto en el que la curva de arriba y la de abajo son siempre las mismas.', 'جزء عمودي من المنطقة يبقى فيه المنحنى الأعلى والأدنى نفسيهما.', 'A vertical slice of the region in which the top curve and the bottom curve stay the same.') }
        ],
        vocabulary: [
            say('barrutia', 'recinto', 'المنطقة', 'region'),
            say('ebaki-puntua', 'corte', 'نقطة التقاطع', 'crossing'),
            say('koadrantea', 'cuadrante', 'الربع', 'quadrant')
        ],
        explanation: say(
            'Hiru kurbarekin, barrutiak ertza aldatu ohi du bidean. Lehenik, kurba-bikote bakoitzaren ebaki-puntuak aurkitzen dira, eta barrutia marrazten da. Ondoz ondoko bi ebaki-punturen artean, goiko eta beheko kurbak ez dira aldatzen: zerrenda bat da. Zerrenda bakoitzean goikoa ken behekoa integratzen da, eta emaitzak batzen dira.',
            'Con tres curvas, el recinto suele cambiar de borde a mitad de camino. Primero se hallan los cortes de cada par de curvas y se dibuja el recinto. Entre dos cortes seguidos, la curva de arriba y la de abajo no cambian: es una tira. En cada tira se integra arriba menos abajo, y se suman.',
            'مع ثلاثة منحنيات تغيّر المنطقة حدودها عادةً في منتصف الطريق. نوجد أولًا نقاط تقاطع كل منحنيين ونرسم المنطقة. وبين تقاطعين متتاليين لا يتغير المنحنى الأعلى ولا الأدنى: إنها شريحة. وفي كل شريحة نكامل الأعلى ناقص الأدنى ونجمع.',
            'With three curves, the region usually changes edge halfway. First find the crossings of each pair of curves and draw the region. Between two crossings in a row, the top curve and the bottom one do not change: that is a strip. On each strip, integrate the top one minus the bottom one, and add them up.'
        ),
        examplePrompt: say('Aurkitu lehen koadranteko barrutiaren azalera, $y=x^2$ eta $y=\\frac{x^2}{4}$ kurbek eta $y=4$ zuzenak mugatua.', 'Halla el área del recinto del primer cuadrante entre $y=x^2$, $y=\\frac{x^2}{4}$ e $y=4$.', 'أوجد مساحة المنطقة في الربع الأول بين $y=x^2$ و$y=\\frac{x^2}{4}$ و$y=4$.', 'Find the area of the region in the first quadrant between $y=x^2$, $y=\\frac{x^2}{4}$ and $y=4$.'),
        example: same('$\\begin{aligned}&\\int_0^2\\frac{3x^2}{4}\\,dx=2\\\\ &\\int_2^4\\left(4-\\frac{x^2}{4}\\right)dx=\\frac{10}{3}\\\\ &2+\\frac{10}{3}=\\frac{16}{3}\\end{aligned}$'),
        exampleAnswer: say('$y=4$ zuzenarekiko ebaki-puntuak: $x=2$ eta $x=4$. 2 arte, $x^2$ da goian; gero, $y=4$.', 'Cortes con $y=4$: $x=2$ y $x=4$. Hasta 2, arriba va $x^2$; después, $y=4$.', 'التقاطع مع $y=4$: $x=2$ و$x=4$. حتى 2 يكون $x^2$ في الأعلى، ثم $y=4$.', 'Crossings with $y=4$: $x=2$ and $x=4$. Up to 2 the top is $x^2$; then $y=4$.')
    },
    parameter: {
        definitions: [
            { term: say('Parametroa', 'Parámetro', 'الوسيط', 'Parameter'), meaning: say('Zenbaki finko baina ezezagun bat adierazten duen letra; enuntziatuaren baldintzarekin aurkitzen da.', 'Una letra que representa un número fijo pero desconocido; se halla con la condición del enunciado.', 'حرف يمثل عددًا ثابتًا لكنه مجهول؛ نجده بالشرط الذي يعطيه نص المسألة.', 'A letter standing for a fixed but unknown number; it is found with the condition the question gives.') }
        ],
        vocabulary: [
            say('ekuazioa', 'ecuación', 'المعادلة', 'equation'),
            say('soluzioa', 'solución', 'الحل', 'solution')
        ],
        explanation: say(
            'Parametroa zenbaki bat balitz bezala tratatzen da: jatorrizkoan edo mugetan agertzen da, eta Barrow-k hura duen adierazpen bat ematen du. Eskatutako balioarekin berdintzean, ekuazio bat geratzen da. Parametroa muga batean badago, batzuetan soluzio bat baino gehiago ateratzen dira: enuntziatua betetzen duena hartzen da.',
            'El parámetro se trata como un número: aparece en la primitiva o en los límites, y Barrow da una expresión con él. Al igualarla al valor pedido queda una ecuación. Si el parámetro está en un límite, a veces salen varias soluciones: se queda la que cumple el enunciado.',
            'نعامل الوسيط كأنه عدد: يظهر في الدالة الأصلية أو في الحدود، وتعطي قاعدة بارو عبارة تحتويه. وبمساواتها بالقيمة المطلوبة تبقى معادلة. وإذا كان الوسيط في حد فقد نحصل أحيانًا على عدة حلول: نأخذ الذي يحقق نص المسألة.',
            'The parameter is treated as a number: it appears in the antiderivative or in the limits, and Barrow gives an expression with it. Setting it equal to the value asked for leaves an equation. If the parameter is in a limit, there are sometimes several solutions: keep the one that fits the question.'
        ),
        examplePrompt: say('Aurkitu $k$, $\\int_0^2 kx^3\\,dx=12$ izan dadin.', 'Halla $k$ para que $\\int_0^2 kx^3\\,dx=12$.', 'أوجد $k$ بحيث $\\int_0^2 kx^3\\,dx=12$.', 'Find $k$ so that $\\int_0^2 kx^3\\,dx=12$.'),
        example: same('$4k=12\\ \\to\\ k=3$'),
        exampleAnswer: say('Barrow-rekin: $\\int_0^2 kx^3\\,dx=k\\cdot\\frac{16}{4}=4k$.', 'Con Barrow: $\\int_0^2 kx^3\\,dx=k\\cdot\\frac{16}{4}=4k$.', 'ببارو: $\\int_0^2 kx^3\\,dx=k\\cdot\\frac{16}{4}=4k$.', 'With Barrow: $\\int_0^2 kx^3\\,dx=k\\cdot\\frac{16}{4}=4k$.')
    },
    'integral-extrema': {
        definitions: [
            { term: say('Inflexio-puntua', 'Punto de inflexión', 'نقطة الانعطاف', 'Inflection point'), meaning: say('Kurbadura aldatzen den puntua; $F$ funtzioan, $f$ funtzioaren muturrak dira.', 'Donde cambia la curvatura; en $F$, son los extremos de $f$.', 'نقطة يتغير عندها التقعر؛ وفي $F$ هي القيم القصوى لـ $f$.', 'Where the concavity changes; for $F$, they are the extrema of $f$.') }
        ],
        vocabulary: [
            say('maximoa', 'máximo', 'القيمة العظمى', 'maximum'),
            say('minimoa', 'mínimo', 'القيمة الصغرى', 'minimum'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            '$F(x)=\\int_a^x f(t)\\,dt$ aztertzeko ez da kalkulatu behar: haren deribatua $f$ da. $f>0$ den tokian, $F$ hazi egiten da; $f<0$ den tokian, jaitsi. $f$ zeinuz aldatzen den zeroetan, $F$ funtzioak maximo edo minimo bat du. Eta $F\'\'=f\'$ deribatuarekin, kurbadura.',
            'Para estudiar $F(x)=\\int_a^x f(t)\\,dt$ no hace falta calcularla: su derivada es $f$. Donde $f>0$, $F$ crece; donde $f<0$, decrece. En los ceros donde $f$ cambia de signo, $F$ tiene un máximo o un mínimo. Y con $F\'\'=f\'$, la curvatura.',
            'لدراسة $F(x)=\\int_a^x f(t)\\,dt$ لا حاجة إلى حسابها: مشتقتها $f$. حيث $f>0$ تتزايد $F$، وحيث $f<0$ تتناقص. وعند الأصفار التي تتغير فيها إشارة $f$ يكون لـ $F$ قيمة عظمى أو صغرى. وبـ $F\'\'=f\'$ ندرس التقعّر.',
            'To study $F(x)=\\int_a^x f(t)\\,dt$ you do not need to work it out: its derivative is $f$. Where $f>0$, $F$ grows; where $f<0$, it goes down. At the zeros where $f$ changes sign, $F$ has a maximum or a minimum. And with $F\'\'=f\'$, the concavity.'
        ),
        cases: [
            { title: say('Positibotik negatibora', 'De positiva a negativa', 'من الموجب إلى السالب', 'From positive to negative'), text: say('$f$ positiboa da zeroaren aurretik, eta negatiboa ondoren: $F$ igo eta gero jaisten da. Maximoa.', '$f$ es positiva antes del cero y negativa después: $F$ sube y luego baja. Máximo.', '$f$ موجبة قبل الصفر وسالبة بعده: $F$ تصعد ثم تنزل. قيمة عظمى.', '$f$ is positive before the zero and negative after: $F$ goes up and then down. Maximum.') },
            { title: say('Negatibotik positibora', 'De negativa a positiva', 'من السالب إلى الموجب', 'From negative to positive'), text: say('$f$ negatiboa da zeroaren aurretik, eta positiboa ondoren: $F$ jaitsi eta gero igotzen da. Minimoa.', '$f$ es negativa antes del cero y positiva después: $F$ baja y luego sube. Mínimo.', '$f$ سالبة قبل الصفر وموجبة بعده: $F$ تنزل ثم تصعد. قيمة صغرى.', '$f$ is negative before the zero and positive after: $F$ goes down and then up. Minimum.') },
            { title: say('Zeinu-aldaketarik gabe', 'Sin cambio de signo', 'دون تغيّر الإشارة', 'No change of sign'), text: say('$f$ zeroa ukitzen du zeinua aldatu gabe: $F$ funtzioak ez du muturrik bertan, $F\'=0$ izan arren.', '$f$ toca el cero sin cambiar de signo: $F$ no tiene extremo ahí, aunque $F\'=0$.', '$f$ تلمس الصفر دون أن تتغير إشارتها: ليس لـ $F$ قيمة قصوى هناك رغم أن $F\'=0$.', '$f$ touches zero without changing sign: $F$ has no extremum there, even though $F\'=0$.') }
        ],
        examplePrompt: say('Non hazten da $F(x)=\\int_1^x(6-2t)\\,dt$ funtzioa, eta non du maximoa?', '¿Dónde crece $F(x)=\\int_1^x(6-2t)\\,dt$ y dónde tiene su máximo?', 'أين تتزايد $F(x)=\\int_1^x(6-2t)\\,dt$ وأين قيمتها العظمى؟', 'Where does $F(x)=\\int_1^x(6-2t)\\,dt$ grow, and where is its maximum?'),
        example: same('$F\'(x)=6-2x\\ \\to\\ x=3$'),
        exampleAnswer: say('$(-\\infty,\\,3)$ tartean hazten da, eta gero jaisten: maximoa $x=3$ puntuan.', 'Crece en $(-\\infty,\\,3)$ y decrece después: máximo en $x=3$.', 'تتزايد في $(-\\infty,\\,3)$ ثم تتناقص: قيمة عظمى عند $x=3$.', 'It grows on $(-\\infty,\\,3)$ and goes down after: maximum at $x=3$.')
    },
    revolution: {
        definitions: [
            { term: say('Bira-gorputza', 'Cuerpo de revolución', 'جسم دوراني', 'Solid of revolution'), meaning: say('Eskualde lau bat ardatz baten inguruan biratzean lortzen den gorputza: kono bat, zilindro bat, esfera bat…', 'El que sale al girar una región plana alrededor de un eje: un cono, un cilindro, una esfera…', 'الجسم الناتج عن دوران منطقة مستوية حول محور: مخروط أو أسطوانة أو كرة…', 'The solid made by turning a flat region about an axis: a cone, a cylinder, a sphere…') }
        ],
        vocabulary: [
            say('diskoa', 'disco', 'القرص', 'disc'),
            say('erradioa', 'radio', 'نصف القطر', 'radius'),
            say('bolumena', 'volumen', 'الحجم', 'volume')
        ],
        explanation: say(
            '$y=f(x)$ kurbaren azpiko eskualdea X ardatzaren inguruan biratzean, ebaki bertikal bakoitza $f(x)$ erradioko disko bihurtzen da. Disko oso mehe batek, $dx$ lodierakoak, $\\pi f(x)^2\\,dx$ bolumena du. $a$ eta $b$ arteko disko guztiak batuz, integrala ateratzen da. Horregatik, $f$ karratura jasotzen da integratu aurretik.',
            'Al girar la región bajo $y=f(x)$ alrededor del eje X, cada corte vertical se convierte en un disco de radio $f(x)$. Un disco muy fino, de grosor $dx$, tiene volumen $\\pi f(x)^2\\,dx$. Sumando todos los discos entre $a$ y $b$ sale la integral. Por eso se eleva $f$ al cuadrado antes de integrar.',
            'عند دوران المنطقة تحت $y=f(x)$ حول محور X يصبح كل مقطع عمودي قرصًا نصف قطره $f(x)$. والقرص الرقيق جدًا الذي سمكه $dx$ حجمه $\\pi f(x)^2\\,dx$. وبجمع كل الأقراص بين $a$ و$b$ نحصل على التكامل. لذلك نربّع $f$ قبل التكامل.',
            'When the region under $y=f(x)$ is turned about the x-axis, each vertical cut becomes a disc of radius $f(x)$. A very thin disc, of thickness $dx$, has volume $\\pi f(x)^2\\,dx$. Adding all the discs between $a$ and $b$ gives the integral. That is why $f$ is squared before integrating.'
        ),
        examplePrompt: say('Aurkitu $y=\\frac{x}{2}$ zuzena 0 eta 6 artean biratzean lortzen den konoaren bolumena.', 'Halla el volumen del cono que sale al girar $y=\\frac{x}{2}$ entre 0 y 6.', 'أوجد حجم المخروط الناتج عن دوران $y=\\frac{x}{2}$ بين 0 و6.', 'Find the volume of the cone made by turning $y=\\frac{x}{2}$ between 0 and 6.'),
        example: same('$V=\\pi\\int_0^6\\frac{x^2}{4}\\,dx=18\\pi$'),
        exampleAnswer: say('3 erradioko eta 6 altuerako konoa da: $\\frac{1}{3}\\pi\\cdot 9\\cdot 6=18\\pi$.', 'Es un cono de radio 3 y altura 6: $\\frac{1}{3}\\pi\\cdot 9\\cdot 6=18\\pi$.', 'إنه مخروط نصف قطره 3 وارتفاعه 6: $\\frac{1}{3}\\pi\\cdot 9\\cdot 6=18\\pi$.', 'It is a cone of radius 3 and height 6: $\\frac{1}{3}\\pi\\cdot 9\\cdot 6=18\\pi$.'),
        why: {
            text: say(
                'Zergatik $f(x)^2$? Disko bakoitza zilindro oso baxu bat da: oinarriaren azalera $\\pi r^2$ bider $dx$ altuera, $r=f(x)$ izanik. Horrela, $\\pi\\int_a^b f(x)^2\\,dx$ zilindro horien guztien batura da.',
                '¿Por qué $f(x)^2$? Cada disco es un cilindro muy bajo: área de la base $\\pi r^2$ por altura $dx$, con $r=f(x)$. Así, $\\pi\\int_a^b f(x)^2\\,dx$ es la suma de todos esos cilindros.',
                'لماذا $f(x)^2$؟ كل قرص أسطوانة منخفضة جدًا: مساحة القاعدة $\\pi r^2$ في الارتفاع $dx$ حيث $r=f(x)$. وهكذا فإن $\\pi\\int_a^b f(x)^2\\,dx$ مجموع كل تلك الأسطوانات.',
                'Why $f(x)^2$? Each disc is a very short cylinder: base area $\\pi r^2$ times height $dx$, with $r=f(x)$. So $\\pi\\int_a^b f(x)^2\\,dx$ is the sum of all those cylinders.'
            )
        }
    }
}

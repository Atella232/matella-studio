import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { BachConicsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Leku geometrikoak eta konikak · Batxilergoa 1 · Zientziak — what each
   lesson tells: the new words (definitions), a short explanation, the
   example as an exercise («Another example»), the key words in four
   languages and, in five lessons, «Why does it work?». Plain data so the
   tests can import it; lessons.tsx merges it into the topics. The example
   uses numbers of its own, never those of «Let's solve», of «Check it» or
   of the typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachConicsLessonTexts: Record<BachConicsTopicId, LessonTexts> = {
    /* ---------- 1. Loci ---------- */
    'perpendicular-bisector': {
        definitions: [
            { term: say('Leku geometrikoa', 'Lugar geométrico', 'المحل الهندسي', 'Locus'), meaning: say('Baldintza bat betetzen duten puntu guztien multzoa, eta beste inor ez.', 'El conjunto de todos los puntos que cumplen una condición, y de ningún otro.', 'مجموعة كل النقاط التي تحقق شرطًا، ولا نقطة غيرها.', 'The set of all the points that meet a condition, and no others.') }
        ],
        vocabulary: [
            say('erdibitzailea', 'mediatriz', 'محور القطعة', 'perpendicular bisector'),
            say('baldintza', 'condición', 'الشرط', 'condition')
        ],
        explanation: say(
            'Leku geometriko baten ekuazioa aurkitzeko, deitu $P(x,y)$ edozein puntuari eta idatzi baldintza koordenatuekin. Distantziak badaude, karratura jaso erroak kentzeko. $AB$ zuzenkiaren erdibitzailean baldintza $d(P,A)=d(P,B)$ da: garatzean, $x^2$ eta $y^2$ desagertzen dira eta zuzen bat geratzen da.',
            'Para hallar la ecuación de un lugar geométrico, llama $P(x,y)$ a un punto cualquiera y escribe la condición con coordenadas. Si hay distancias, elévalas al cuadrado para quitar las raíces. En la mediatriz de $AB$ la condición es $d(P,A)=d(P,B)$: al desarrollar, $x^2$ e $y^2$ se van y queda una recta.',
            'لإيجاد معادلة محل هندسي سمِّ أي نقطة $P(x,y)$ واكتب الشرط بالإحداثيات. وإذا كانت هناك مسافات فربّعها لتتخلص من الجذور. في محور $AB$ الشرط هو $d(P,A)=d(P,B)$: وعند النشر يختفي $x^2$ و$y^2$ ويبقى مستقيم.',
            'To find the equation of a locus, call any point $P(x,y)$ and write the condition with coordinates. If there are distances, square them to get rid of the roots. For the perpendicular bisector of $AB$ the condition is $d(P,A)=d(P,B)$: when you expand, $x^2$ and $y^2$ cancel and a line is left.'
        ),
        examplePrompt: say('Aurkitu $A(-3,0)$ eta $B(1,4)$ muturreko zuzenkiaren erdibitzailea, leku geometriko gisa.', 'Halla la mediatriz del segmento de extremos $A(-3,0)$ y $B(1,4)$ como lugar geométrico.', 'أوجد محور القطعة التي طرفاها $A(-3,0)$ و$B(1,4)$ بوصفه محلًّا هندسيًّا.', 'Find the perpendicular bisector of the segment with end points $A(-3,0)$ and $B(1,4)$ as a locus.'),
        example: same('$(x+3)^2+y^2=(x-1)^2+(y-4)^2\\ \\to\\ x+y-1=0$'),
        exampleAnswer: say('$x+y-1=0$ zuzena, $(-1,2)$ erdiko puntutik pasatzen dena.', 'La recta $x+y-1=0$, que pasa por el punto medio $(-1,2)$.', 'المستقيم $x+y-1=0$ الذي يمر بالمنتصف $(-1,2)$.', 'The line $x+y-1=0$, which passes through the midpoint $(-1,2)$.')
    },
    'angle-bisectors': {
        definitions: [
            { term: say('Bi zuzenen erdikaria', 'Bisectriz de dos rectas', 'منصّف زاوية مستقيمين', 'Bisector of two lines'), meaning: say('Bi zuzenetatik distantzia berera dauden puntuek osatzen duten zuzena; haien angeluetako bat bi zati berditan banatzen du.', 'La recta formada por los puntos que están a la misma distancia de las dos rectas; divide uno de sus ángulos en dos partes iguales.', 'المستقيم المكوَّن من النقاط التي تبعد المسافة نفسها عن المستقيمين؛ ويقسم إحدى زواياهما قسمين متساويين.', 'The line made of the points at the same distance from both lines; it cuts one of their angles into two equal parts.') }
        ],
        vocabulary: [
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value'),
            say('perpendikularrak', 'perpendiculares', 'متعامدان', 'perpendicular')
        ],
        explanation: say(
            '$P(x,y)$ puntu bat erdikari batean dago bi zuzenetatik distantzia berera badago. Distantziaren formularekin, baldintzak bi balio absolutu ditu. $|u|=|v|$ esateak $u=v$ edo $u=-v$ esan nahi duenez, bi zuzen ateratzen dira: bi erdikariak, elkarren perpendikularrak.',
            'Un punto $P(x,y)$ está en una bisectriz si está a la misma distancia de las dos rectas. Con la fórmula de la distancia, la condición tiene dos valores absolutos. Como $|u|=|v|$ significa $u=v$ o $u=-v$, salen dos rectas: las dos bisectrices, perpendiculares entre sí.',
            'تقع النقطة $P(x,y)$ على منصّف إذا كانت على المسافة نفسها من المستقيمين. وبصيغة المسافة يحوي الشرط قيمتين مطلقتين. ولأن $|u|=|v|$ يعني $u=v$ أو $u=-v$ ينتج مستقيمان: المنصّفان، وهما متعامدان.',
            'A point $P(x,y)$ is on a bisector if it is the same distance from both lines. With the distance formula, the condition has two absolute values. Since $|u|=|v|$ means $u=v$ or $u=-v$, two lines come out: the two bisectors, perpendicular to each other.'
        ),
        examplePrompt: say('Aurkitu $x-2y+3=0$ eta $2x+y-4=0$ zuzenen erdikariak.', 'Halla las bisectrices de las rectas $x-2y+3=0$ y $2x+y-4=0$.', 'أوجد منصّفي المستقيمين $x-2y+3=0$ و$2x+y-4=0$.', 'Find the bisectors of the lines $x-2y+3=0$ and $2x+y-4=0$.'),
        example: same('$x-2y+3=\\pm(2x+y-4)\\ \\to\\ x+3y-7=0\\quad 3x-y-1=0$'),
        exampleAnswer: say('Bi zuzenek $\\sqrt{5}$ dute izendatzailean, eta sinplifikatu egiten da. Erdikariak perpendikularrak dira: $(1,3)\\cdot(3,-1)=0$.', 'Las dos rectas tienen $\\sqrt{5}$ en el denominador, que se simplifica. Las bisectrices son perpendiculares: $(1,3)\\cdot(3,-1)=0$.', 'للمستقيمين $\\sqrt{5}$ في المقام فيُختصر. والمنصّفان متعامدان: $(1,3)\\cdot(3,-1)=0$.', 'Both lines have $\\sqrt{5}$ in the denominator, which cancels. The bisectors are perpendicular: $(1,3)\\cdot(3,-1)=0$.'),
        why: {
            text: say(
                'Zergatik betetzen da? $|u|=|v|$ berdintza betetzen da $u$ eta $v$ berdinak edo aurkakoak direnean. Horregatik $d(P,r)=d(P,s)$ baldintzak bi zuzen ematen ditu. Bi zuzenek $\\sqrt{A^2+B^2}$ bera ez badute, bakoitza berearekin zatitu behar da berdindu aurretik.',
                '¿Por qué funciona? $|u|=|v|$ se cumple cuando $u$ y $v$ son iguales u opuestos. Por eso la condición $d(P,r)=d(P,s)$ da dos rectas. Si las dos rectas no tienen el mismo $\\sqrt{A^2+B^2}$, cada una se divide por el suyo antes de igualar.',
                'لماذا يصح؟ تتحقق $|u|=|v|$ عندما يكون $u$ و$v$ متساويين أو متعاكسين. لذلك يعطي الشرط $d(P,r)=d(P,s)$ مستقيمين. وإذا لم يكن للمستقيمين $\\sqrt{A^2+B^2}$ نفسه فيُقسم كل منهما على ما يخصه قبل المساواة.',
                'Why does it work? $|u|=|v|$ holds when $u$ and $v$ are equal or opposite. That is why the condition $d(P,r)=d(P,s)$ gives two lines. If the two lines do not have the same $\\sqrt{A^2+B^2}$, each one is divided by its own before equating.'
            ),
            math: same('$|u|=|v|\\ \\Leftrightarrow\\ u=\\pm v$')
        }
    },
    'distance-loci': {
        vocabulary: [
            say('paraleloa', 'paralela', 'موازٍ', 'parallel'),
            say('distantzia', 'distancia', 'المسافة', 'distance')
        ],
        explanation: say(
            'Baldintza zuzen batetik $d$ distantzia finkora egotea bada, formulako balio absolutuak bi zuzen paralelo ematen ditu, alde banatan. Puntu batetik $d$ distantziara egotea bada, zirkunferentzia bat ateratzen da. Eta bi distantzia konparatzen baditu, karratura jasotzen dira eta sinplifikatu egiten da, erdibitzailean bezala.',
            'Si la condición es estar a una distancia fija $d$ de una recta, el valor absoluto de la fórmula da dos rectas paralelas, una a cada lado. Si es estar a distancia $d$ de un punto, sale una circunferencia. Y si compara dos distancias, se elevan al cuadrado y se simplifica, como en la mediatriz.',
            'إذا كان الشرط البعد مسافة ثابتة $d$ عن مستقيم فإن القيمة المطلقة في الصيغة تعطي مستقيمين موازيين، واحدًا في كل جهة. وإذا كان البعد $d$ عن نقطة فتنتج دائرة. وإذا قارن الشرط بين مسافتين فإننا نربّعهما ونبسّط كما في محور القطعة.',
            'If the condition is being at a fixed distance $d$ from a line, the absolute value of the formula gives two parallel lines, one on each side. If it is being at distance $d$ from a point, a circle comes out. And if it compares two distances, square them and simplify, as for the perpendicular bisector.'
        ),
        cases: [
            { title: say('Zuzen batetik', 'De una recta', 'عن مستقيم', 'From a line'), text: say('Bi zuzen paralelo, alde banatan.', 'Dos rectas paralelas, una a cada lado.', 'مستقيمان متوازيان، واحد في كل جهة.', 'Two parallel lines, one on each side.'), math: same('$|Ax+By+C|=d\\sqrt{A^2+B^2}$') },
            { title: say('Puntu batetik', 'De un punto', 'عن نقطة', 'From a point'), text: say('Zirkunferentzia bat: zentroa puntua da, eta erradioa, $d$.', 'Una circunferencia de centro el punto y radio $d$.', 'دائرة مركزها النقطة ونصف قطرها $d$.', 'A circle with the point as centre and radius $d$.'), math: same('$(x-a)^2+(y-b)^2=d^2$') }
        ],
        examplePrompt: say('Aurkitu $6x-8y+5=0$ zuzenerako distantzia $3$ duten puntuen leku geometrikoa.', 'Halla el lugar de los puntos cuya distancia a la recta $6x-8y+5=0$ es $3$.', 'أوجد المحل الهندسي للنقاط التي بعدها عن المستقيم $6x-8y+5=0$ يساوي $3$.', 'Find the locus of the points whose distance from the line $6x-8y+5=0$ is $3$.'),
        example: same('$|6x-8y+5|=30\\ \\to\\ 6x-8y-25=0\\quad 6x-8y+35=0$'),
        exampleAnswer: say('Bi zuzen paralelo, alde bakoitzean $3$ unitatera: $\\sqrt{6^2+8^2}=10$.', 'Dos rectas paralelas, a $3$ unidades a cada lado: $\\sqrt{6^2+8^2}=10$.', 'مستقيمان متوازيان على بعد $3$ وحدات من كل جهة: $\\sqrt{6^2+8^2}=10$.', 'Two parallel lines, $3$ units away on each side: $\\sqrt{6^2+8^2}=10$.')
    },

    /* ---------- 2. The circle ---------- */
    'circle-equation': {
        definitions: [
            { term: say('Zirkunferentzia', 'Circunferencia', 'الدائرة', 'Circle'), meaning: say('Puntu finko batetik, zentrotik, distantzia berera, erradiora, dauden planoko puntuen leku geometrikoa.', 'El lugar de los puntos del plano que están a la misma distancia, el radio, de un punto fijo, el centro.', 'المحل الهندسي لنقاط المستوى التي تبعد المسافة نفسها، أي نصف القطر، عن نقطة ثابتة هي المركز.', 'The locus of the points of the plane at the same distance, the radius, from a fixed point, the centre.') }
        ],
        vocabulary: [
            say('zentroa', 'centro', 'المركز', 'centre'),
            say('erradioa', 'radio', 'نصف القطر', 'radius'),
            say('diametroa', 'diámetro', 'القطر', 'diameter')
        ],
        explanation: say(
            '$P(x,y)$ puntua zirkunferentzian dago $C(a,b)$ zentrorako distantzia $r$ erradioa bada. Karratura jasotzean, $(x-a)^2+(y-b)^2=r^2$ ekuazioa ateratzen da. Beste datu batzuk ematen badizkizute, aurkitu lehenik zentroa eta erradioa: diametro batekin, zentroa haren erdiko puntua da, eta erradioa, haren luzeraren erdia.',
            'Un punto $P(x,y)$ está en la circunferencia si su distancia al centro $C(a,b)$ es el radio $r$. Al elevar al cuadrado sale la ecuación $(x-a)^2+(y-b)^2=r^2$. Si te dan otros datos, halla primero el centro y el radio: con un diámetro, el centro es su punto medio y el radio, la mitad de su longitud.',
            'تقع النقطة $P(x,y)$ على الدائرة إذا كان بعدها عن المركز $C(a,b)$ يساوي نصف القطر $r$. وبالتربيع نحصل على المعادلة $(x-a)^2+(y-b)^2=r^2$. وإذا أُعطيت معطيات أخرى فأوجد المركز ونصف القطر أولًا: مع قطر يكون المركز منتصفه ونصف القطر نصف طوله.',
            'A point $P(x,y)$ is on the circle if its distance from the centre $C(a,b)$ is the radius $r$. Squaring gives the equation $(x-a)^2+(y-b)^2=r^2$. If you are given other data, find the centre and the radius first: with a diameter, the centre is its midpoint and the radius is half its length.'
        ),
        examplePrompt: say('Aurkitu $C(4,-3)$ zentroa duen eta jatorritik pasatzen den zirkunferentzia.', 'Halla la circunferencia de centro $C(4,-3)$ que pasa por el origen.', 'أوجد الدائرة التي مركزها $C(4,-3)$ وتمر بالأصل.', 'Find the circle with centre $C(4,-3)$ that passes through the origin.'),
        example: same('$r=\\sqrt{4^2+3^2}=5\\qquad (x-4)^2+(y+3)^2=25$'),
        exampleAnswer: say('Erradioa zentrotik jatorrirako distantzia da.', 'El radio es la distancia del centro al origen.', 'نصف القطر هو المسافة من المركز إلى الأصل.', 'The radius is the distance from the centre to the origin.')
    },
    'circle-general': {
        definitions: [
            { term: say('Karratua osatzea', 'Completar el cuadrado', 'إكمال المربع', 'Completing the square'), meaning: say('$x^2+Ax$ karratu bihurtzen duen zenbakia gehitzea: $x^2+Ax+\\frac{A^2}{4}=\\left(x+\\frac{A}{2}\\right)^2$.', 'Sumar el número que convierte $x^2+Ax$ en un cuadrado: $x^2+Ax+\\frac{A^2}{4}=\\left(x+\\frac{A}{2}\\right)^2$.', 'إضافة العدد الذي يجعل $x^2+Ax$ مربعًا: $x^2+Ax+\\frac{A^2}{4}=\\left(x+\\frac{A}{2}\\right)^2$.', 'Adding the number that turns $x^2+Ax$ into a square: $x^2+Ax+\\frac{A^2}{4}=\\left(x+\\frac{A}{2}\\right)^2$.') }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('zentroa', 'centro', 'المركز', 'centre')
        ],
        explanation: say(
            '$(x-a)^2+(y-b)^2=r^2$ garatzen baduzu, $x^2+y^2+Ax+By+C=0$ motako ekuazio bat ateratzen da: $x^2$ eta $y^2$ gaien koefizienteak berdinak dira, eta ez dago $xy$ gairik. Zentrora eta erradiora itzultzeko, osatu karratuak $x$ aldagaian eta $y$ aldagaian. Eskuinean zenbaki negatibo bat geratzen bada, ez dago zirkunferentziarik.',
            'Si desarrollas $(x-a)^2+(y-b)^2=r^2$, sale una ecuación $x^2+y^2+Ax+By+C=0$: los coeficientes de $x^2$ e $y^2$ son iguales y no hay término en $xy$. Para volver al centro y al radio, completa cuadrados en $x$ y en $y$. Si a la derecha queda un número negativo, no hay circunferencia.',
            'إذا نشرت $(x-a)^2+(y-b)^2=r^2$ نحصل على معادلة من الشكل $x^2+y^2+Ax+By+C=0$: معاملا $x^2$ و$y^2$ متساويان ولا يوجد حد فيه $xy$. وللعودة إلى المركز ونصف القطر أكمل المربعين في $x$ وفي $y$. وإذا بقي عدد سالب في الطرف الأيمن فلا توجد دائرة.',
            'If you expand $(x-a)^2+(y-b)^2=r^2$, you get an equation $x^2+y^2+Ax+By+C=0$: the coefficients of $x^2$ and $y^2$ are equal and there is no term in $xy$. To get back to the centre and the radius, complete the square in $x$ and in $y$. If a negative number is left on the right, there is no circle.'
        ),
        examplePrompt: say('$x^2+y^2-2x+8y+20=0$ zirkunferentzia bat da?', '¿Es una circunferencia $x^2+y^2-2x+8y+20=0$?', 'هل $x^2+y^2-2x+8y+20=0$ دائرة؟', 'Is $x^2+y^2-2x+8y+20=0$ a circle?'),
        example: same('$(x-1)^2+(y+4)^2=-20+1+16=-3$'),
        exampleAnswer: say('Ez: $r^2$ negatiboa litzateke, eta ez dago ekuazioa betetzen duen punturik.', 'No: $r^2$ sería negativo, y ningún punto cumple la ecuación.', 'لا: سيكون $r^2$ سالبًا، ولا توجد نقطة تحقق المعادلة.', 'No: $r^2$ would be negative, and no point satisfies the equation.'),
        why: {
            text: say(
                'Zergatik betetzen da? $(x-a)^2$ garatzean $x^2-2ax+a^2$ ateratzen da: $x$ aldagaiaren koefizientea $A=-2a$ da. Horregatik zentroaren lehen koordenatua $a=-\\frac{A}{2}$ da, eta gauza bera $y$ aldagaiarekin.',
                '¿Por qué funciona? Al desarrollar $(x-a)^2$ sale $x^2-2ax+a^2$: el coeficiente de $x$ es $A=-2a$. Por eso la primera coordenada del centro es $a=-\\frac{A}{2}$, y lo mismo con $y$.',
                'لماذا يصح؟ عند نشر $(x-a)^2$ نحصل على $x^2-2ax+a^2$: معامل $x$ هو $A=-2a$. لذلك الإحداثي الأول للمركز هو $a=-\\frac{A}{2}$، والأمر نفسه مع $y$.',
                'Why does it work? Expanding $(x-a)^2$ gives $x^2-2ax+a^2$: the coefficient of $x$ is $A=-2a$. That is why the first coordinate of the centre is $a=-\\frac{A}{2}$, and the same with $y$.'
            ),
            math: same('$(x-a)^2=x^2-2ax+a^2$')
        }
    },
    'circle-line': {
        definitions: [
            { term: say('Zuzen ukitzailea', 'Recta tangente', 'المستقيم المماس', 'Tangent line'), meaning: say('Zirkunferentzia puntu bakar batean ukitzen duen zuzena; puntu horretan erradioarekiko perpendikularra da.', 'Recta que toca a la circunferencia en un solo punto; en ese punto es perpendicular al radio.', 'مستقيم يمسّ الدائرة في نقطة واحدة فقط، ويكون عموديًا على نصف القطر فيها.', 'A line that touches the circle at a single point; there it is perpendicular to the radius.') },
            { term: say('Zuzen ebakitzailea', 'Recta secante', 'المستقيم القاطع', 'Secant line'), meaning: say('Zirkunferentzia bi puntutan ebakitzen duen zuzena.', 'Recta que corta a la circunferencia en dos puntos.', 'مستقيم يقطع الدائرة في نقطتين.', 'A line that cuts the circle at two points.') },
            { term: say('Kanpoko zuzena', 'Recta exterior', 'المستقيم الخارجي', 'Outside line'), meaning: say('Zirkunferentzia ukitzen ez duen zuzena.', 'Recta que no toca a la circunferencia.', 'مستقيم لا يمسّ الدائرة.', 'A line that does not touch the circle.') }
        ],
        vocabulary: [
            say('zentroa', 'centro', 'المركز', 'centre'),
            say('perpendikularra', 'perpendicular', 'عمودي', 'perpendicular')
        ],
        explanation: say(
            'Zuzen bat zirkunferentziarekiko nola dagoen jakiteko ez dago zertan ebaki: nahikoa da zentrotik zuzenerako $d$ distantzia $r$ erradioarekin konparatzea. $d<r$ bada, bi ebaki-puntu daude; $d=r$ bada, bat; $d>r$ bada, bat ere ez. $P$ puntuko ukitzailea $CP$ erradioarekiko perpendikularra da.',
            'Para saber cómo está una recta respecto de una circunferencia no hace falta cortarlas: basta comparar la distancia $d$ del centro a la recta con el radio $r$. Con $d<r$ hay dos puntos de corte; con $d=r$, uno; con $d>r$, ninguno. La tangente en un punto $P$ es perpendicular al radio $CP$.',
            'لمعرفة وضع مستقيم بالنسبة إلى دائرة لا حاجة إلى تقاطعهما: يكفي مقارنة المسافة $d$ من المركز إلى المستقيم بنصف القطر $r$. إذا كان $d<r$ فهناك نقطتا تقاطع، وإذا كان $d=r$ فنقطة واحدة، وإذا كان $d>r$ فلا شيء. والمماس في نقطة $P$ عمودي على نصف القطر $CP$.',
            'To know how a line lies with respect to a circle you do not need to intersect them: just compare the distance $d$ from the centre to the line with the radius $r$. With $d<r$ there are two crossing points; with $d=r$, one; with $d>r$, none. The tangent at a point $P$ is perpendicular to the radius $CP$.'
        ),
        examplePrompt: say('Nolakoa da $x+y-7=0$ zuzena $x^2+y^2=9$ zirkunferentziarekiko?', '¿Cómo es la recta $x+y-7=0$ respecto de la circunferencia $x^2+y^2=9$?', 'ما وضع المستقيم $x+y-7=0$ بالنسبة إلى الدائرة $x^2+y^2=9$؟', 'How does the line $x+y-7=0$ lie with respect to the circle $x^2+y^2=9$?'),
        example: same('$d=\\frac{7}{\\sqrt{2}}\\approx 4{,}95>3$'),
        exampleAnswer: say('Kanpokoa: $(0,0)$ zentrotik zuzenerako distantzia $3$ erradioa baino handiagoa da.', 'Exterior: la distancia del centro $(0,0)$ a la recta es mayor que el radio $3$.', 'خارجي: المسافة من المركز $(0,0)$ إلى المستقيم أكبر من نصف القطر $3$.', 'Outside: the distance from the centre $(0,0)$ to the line is greater than the radius $3$.')
    },
    'two-circles': {
        definitions: [
            { term: say('Zirkunferentzia ukitzaileak', 'Circunferencias tangentes', 'دائرتان متماستان', 'Tangent circles'), meaning: say('Puntu bakar bat komunean duten bi zirkunferentzia.', 'Dos circunferencias que tienen un solo punto en común.', 'دائرتان لهما نقطة مشتركة واحدة فقط.', 'Two circles that have a single point in common.') },
            { term: say('Zirkunferentzia zentrokideak', 'Circunferencias concéntricas', 'دوائر متحدة المركز', 'Concentric circles'), meaning: say('Zentro bera duten zirkunferentziak.', 'Circunferencias con el mismo centro.', 'دوائر لها المركز نفسه.', 'Circles with the same centre.') }
        ],
        vocabulary: [
            say('batura', 'suma', 'المجموع', 'sum'),
            say('kendura', 'diferencia', 'الفرق', 'difference')
        ],
        explanation: say(
            'Bi zirkunferentzia bi puntutan ebakitzen dira zentroen arteko $d$ distantzia erradioen kenduraren eta baturaren artean dagoenean. $d$ horietako baten berdina bada, ukitzaileak dira. $d$ batura baino handiagoa bada, kanpokoak dira, eta kendura baino txikiagoa bada, bata bestearen barruan dago.',
            'Dos circunferencias se cortan en dos puntos cuando la distancia $d$ entre sus centros está entre la diferencia y la suma de los radios. Si $d$ es igual a una de las dos, son tangentes. Si $d$ es mayor que la suma, son exteriores, y si es menor que la diferencia, una está dentro de la otra.',
            'تتقاطع دائرتان في نقطتين عندما تكون المسافة $d$ بين مركزيهما بين الفرق والمجموع لنصفي القطرين. وإذا ساوت $d$ أحدهما فهما متماستان. وإذا كانت $d$ أكبر من المجموع فهما متباعدتان، وإذا كانت أصغر من الفرق فإحداهما داخل الأخرى.',
            'Two circles cut each other at two points when the distance $d$ between their centres lies between the difference and the sum of the radii. If $d$ equals one of them, they are tangent. If $d$ is greater than the sum, they are apart, and if it is less than the difference, one is inside the other.'
        ),
        cases: [
            { title: say('Ebakitzaileak', 'Secantes', 'متقاطعتان', 'Cutting'), text: say('Distantzia kenduraren eta baturaren artean dago.', 'La distancia está entre la diferencia y la suma.', 'المسافة بين الفرق والمجموع.', 'The distance lies between the difference and the sum.'), math: same('$|r_1-r_2|<d<r_1+r_2$') },
            { title: say('Ukitzaileak', 'Tangentes', 'متماستان', 'Tangent'), text: say('Kanpotik, $d$ baturaren berdina denean; barrutik, kenduraren berdina denean.', 'Por fuera si $d$ es igual a la suma; por dentro si es igual a la diferencia.', 'من الخارج إذا ساوت $d$ المجموع، ومن الداخل إذا ساوت الفرق.', 'On the outside if $d$ equals the sum; on the inside if it equals the difference.'), math: same('$d=r_1+r_2\\qquad d=|r_1-r_2|$') },
            { title: say('Ez dira ukitzen', 'No se tocan', 'لا تتلامسان', 'Not touching'), text: say('Kanpokoak, batura baino urrunago; barrukoak, kendura baino hurbilago.', 'Exteriores, más lejos que la suma; interiores, más cerca que la diferencia.', 'متباعدتان أبعد من المجموع، أو إحداهما داخل الأخرى أقرب من الفرق.', 'Apart, further than the sum; one inside the other, closer than the difference.'), math: same('$d>r_1+r_2\\qquad d<|r_1-r_2|$') }
        ],
        examplePrompt: say('Nolakoak dira $x^2+y^2=25$ eta $(x-6)^2+y^2=9$ zirkunferentziak?', '¿Cómo son las circunferencias $x^2+y^2=25$ y $(x-6)^2+y^2=9$?', 'ما وضع الدائرتين $x^2+y^2=25$ و$(x-6)^2+y^2=9$؟', 'How are the circles $x^2+y^2=25$ and $(x-6)^2+y^2=9$ placed?'),
        example: same('$d=6\\qquad 5-3<6<5+3$'),
        exampleAnswer: say('Ebakitzaileak: bi puntutan ebakitzen dira.', 'Secantes: se cortan en dos puntos.', 'متقاطعتان: تتقاطعان في نقطتين.', 'Cutting: they meet at two points.')
    },

    /* ---------- 3. The ellipse ---------- */
    'ellipse-definition': {
        definitions: [
            { term: say('Elipsea', 'Elipse', 'القطع الناقص', 'Ellipse'), meaning: say('Bi puntu finkotarako, fokuetarako, distantzien batura konstantea duten puntuen leku geometrikoa.', 'El lugar de los puntos cuya suma de distancias a dos puntos fijos, los focos, es constante.', 'المحل الهندسي للنقاط التي مجموع بعديها عن نقطتين ثابتتين، هما البؤرتان، ثابت.', 'The locus of the points whose sum of distances to two fixed points, the foci, is constant.') }
        ],
        vocabulary: [
            say('fokuak', 'focos', 'البؤرتان', 'foci'),
            say('konstantea', 'constante', 'ثابت', 'constant')
        ],
        explanation: say(
            'Irudikatu $2a$ luzerako soka bat, bi iltzetara lotuta, $F$ eta $F\'$ fokuetara: arkatz batekin tenkatu eta mugitzen baduzu, elipse bat marrazten duzu, $PF+PF\'$ beti $2a$ delako. Fokuak $(\\pm c,0)$ puntuetan badaude, ekuazio laburtua $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$ da, eta $b$ zenbakia $a^2=b^2+c^2$ berdintzatik ateratzen da.',
            'Imagina una cuerda de longitud $2a$ atada a dos clavos, los focos $F$ y $F\'$: si la tensas con un lápiz y lo mueves, dibujas una elipse, porque $PF+PF\'$ vale siempre $2a$. Si los focos están en $(\\pm c,0)$, la ecuación reducida es $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$, donde $b$ sale de $a^2=b^2+c^2$.',
            'تخيّل خيطًا طوله $2a$ مربوطًا بمسمارين هما البؤرتان $F$ و$F\'$: إذا شددته بقلم وحرّكته رسمت قطعًا ناقصًا، لأن $PF+PF\'$ يساوي دائمًا $2a$. وإذا كانت البؤرتان في $(\\pm c,0)$ فالمعادلة المختصرة هي $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$، حيث يُحسب $b$ من $a^2=b^2+c^2$.',
            'Picture a string of length $2a$ tied to two nails, the foci $F$ and $F\'$: if you pull it tight with a pencil and move it, you draw an ellipse, because $PF+PF\'$ is always $2a$. If the foci are at $(\\pm c,0)$, the reduced equation is $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$, where $b$ comes from $a^2=b^2+c^2$.'
        ),
        examplePrompt: say('Aurkitu $(\\pm 12,0)$ fokuak dituen eta fokuetarako distantzien batura $26$ duen elipsea.', 'Halla la elipse de focos $(\\pm 12,0)$ cuya suma de distancias a los focos es $26$.', 'أوجد القطع الناقص الذي بؤرتاه $(\\pm 12,0)$ ومجموع بعدي نقاطه عن البؤرتين $26$.', 'Find the ellipse with foci $(\\pm 12,0)$ whose sum of distances to the foci is $26$.'),
        example: same('$a=13\\qquad b^2=169-144=25\\qquad\\frac{x^2}{169}+\\frac{y^2}{25}=1$'),
        exampleAnswer: say('Ardatzak $(\\pm 13,0)$ eta $(0,\\pm 5)$ puntuetan ebakitzen ditu.', 'Corta a los ejes en $(\\pm 13,0)$ y $(0,\\pm 5)$.', 'يقطع المحورين في $(\\pm 13,0)$ و$(0,\\pm 5)$.', 'It cuts the axes at $(\\pm 13,0)$ and $(0,\\pm 5)$.')
    },
    'ellipse-elements': {
        definitions: [
            { term: say('Ardatzerdiak', 'Semiejes', 'نصفا المحورين', 'Semi-axes'), meaning: say('Elipsearen ardatzen erdiak, $a$ eta $b$; $a$ handiena da.', 'Las mitades $a$ y $b$ de los ejes de la elipse; $a$ es la mayor.', 'نصفا محوري القطع الناقص $a$ و$b$؛ و$a$ الأكبر.', 'The halves $a$ and $b$ of the axes of the ellipse; $a$ is the greater one.') },
            { term: say('Eszentrikotasuna', 'Excentricidad', 'الاختلاف المركزي', 'Eccentricity'), meaning: say('$e=\\frac{c}{a}$ zatidura, elipsea zenbat zapalduta dagoen neurtzen duena.', 'El cociente $e=\\frac{c}{a}$, que mide lo achatada que está la elipse.', 'النسبة $e=\\frac{c}{a}$ التي تقيس مدى تفلطح القطع الناقص.', 'The ratio $e=\\frac{c}{a}$, which measures how flattened the ellipse is.') },
            { term: say('Erpinak', 'Vértices', 'الرؤوس', 'Vertices'), meaning: say('Elipseak bere ardatzak ebakitzen dituen lau puntuak.', 'Los cuatro puntos donde la elipse corta a sus ejes.', 'النقاط الأربع التي يقطع فيها القطع الناقص محوريه.', 'The four points where the ellipse cuts its axes.') }
        ],
        vocabulary: [
            say('zapaldua', 'achatada', 'مفلطح', 'flattened'),
            say('foku-distantzia', 'distancia focal', 'البعد البؤري', 'focal distance')
        ],
        explanation: say(
            'Ekuazio laburtuan, izendatzaile handiena $a^2$ da, eta ardatz nagusia adierazten du: $x^2$ gaiaren azpian badago, elipsea horizontala da; $y^2$ gaiaren azpian badago, bertikala. Fokuak ardatz nagusian daude, zentrotik $c$ distantziara, $c^2=a^2-b^2$ izanik; $2c$ foku-distantzia da. $e=\\frac{c}{a}$ eszentrikotasunak esaten du zenbat zapalduta dagoen.',
            'En la ecuación reducida, el denominador mayor es $a^2$ y marca el eje mayor: si está bajo $x^2$, la elipse es horizontal; si está bajo $y^2$, vertical. Los focos están en el eje mayor, a distancia $c$ del centro, con $c^2=a^2-b^2$; $2c$ es la distancia focal. La excentricidad $e=\\frac{c}{a}$ dice lo achatada que es.',
            'في المعادلة المختصرة يكون أكبر مقام هو $a^2$ ويحدد المحور الأكبر: إذا كان تحت $x^2$ فالقطع أفقي، وإذا كان تحت $y^2$ فهو رأسي. والبؤرتان على المحور الأكبر على بعد $c$ من المركز، مع $c^2=a^2-b^2$؛ و$2c$ هو البعد البؤري. والاختلاف المركزي $e=\\frac{c}{a}$ يبيّن مدى كونه مفلطحًا.',
            'In the reduced equation the greater denominator is $a^2$ and it marks the major axis: if it is under $x^2$, the ellipse is horizontal; if it is under $y^2$, vertical. The foci are on the major axis, at distance $c$ from the centre, with $c^2=a^2-b^2$; $2c$ is the focal distance. The eccentricity $e=\\frac{c}{a}$ says how flattened it is.'
        ),
        examplePrompt: say('Aurkitu $\\frac{x^2}{100}+\\frac{y^2}{36}=1$ elipsearen eszentrikotasuna.', 'Halla la excentricidad de la elipse $\\frac{x^2}{100}+\\frac{y^2}{36}=1$.', 'أوجد الاختلاف المركزي للقطع الناقص $\\frac{x^2}{100}+\\frac{y^2}{36}=1$.', 'Find the eccentricity of the ellipse $\\frac{x^2}{100}+\\frac{y^2}{36}=1$.'),
        example: same('$c=\\sqrt{100-36}=8\\qquad e=\\frac{8}{10}=0{,}8$'),
        exampleAnswer: say('Horizontala da; fokuak $(\\pm 8,0)$ puntuetan daude.', 'Es horizontal; los focos están en $(\\pm 8,0)$.', 'إنه أفقي؛ والبؤرتان في $(\\pm 8,0)$.', 'It is horizontal; the foci are at $(\\pm 8,0)$.'),
        why: {
            text: say(
                'Zergatik betetzen da? $(0,b)$ erpina bi fokuetatik distantzia berera dago, eta bi distantzia horien batura $2a$ da: bakoitzak $a$ balio du. $b$ eta $c$ katetoak dituen triangeluaren hipotenusa $a$ da, eta Pitagorasek $a^2=b^2+c^2$ ematen du.',
                '¿Por qué funciona? El vértice $(0,b)$ está a la misma distancia de los dos focos, y esas distancias suman $2a$: cada una vale $a$. El triángulo de catetos $b$ y $c$ tiene hipotenusa $a$, y Pitágoras da $a^2=b^2+c^2$.',
                'لماذا يصح؟ الرأس $(0,b)$ على المسافة نفسها من البؤرتين، ومجموع المسافتين $2a$: كل منهما تساوي $a$. والمثلث الذي ضلعاه القائمان $b$ و$c$ وتره $a$، وفيثاغورس يعطي $a^2=b^2+c^2$.',
                'Why does it work? The vertex $(0,b)$ is the same distance from both foci, and those distances add up to $2a$: each one is $a$. The triangle with legs $b$ and $c$ has hypotenuse $a$, and Pythagoras gives $a^2=b^2+c^2$.'
            ),
            math: same('$a^2=b^2+c^2$')
        }
    },
    'ellipse-shifted': {
        definitions: [
            { term: say('Elipse lekualdatua', 'Elipse trasladada', 'قطع ناقص مُزاح', 'Shifted ellipse'), meaning: say('Zentroa jatorrian ez duen elipsea; zentratuaren forma bera du, mugituta.', 'Una elipse cuyo centro no es el origen; tiene la forma de la centrada, movida.', 'قطع ناقص مركزه ليس الأصل؛ له شكل القطع الذي مركزه الأصل بعد تحريكه.', 'An ellipse whose centre is not the origin; it has the shape of the centred one, moved.') }
        ],
        vocabulary: [
            say('zentroa', 'centro', 'المركز', 'centre'),
            say('jatorria', 'origen', 'الأصل', 'origin')
        ],
        explanation: say(
            'Elipse batek $(x_0,y_0)$ zentroa badu, haren ekuazioan $x-x_0$ eta $y-y_0$ agertzen dira, $x$ eta $y$ aldagaien ordez: jatorrian zentroa duen elipsea da, lekualdatuta. Ardatzerdiak berdin irakurtzen dira, eta erpinak eta fokuak zentroari batuz lortzen dira. Batzuetan karratuak osatu behar dira zentroa ikusteko.',
            'Si una elipse tiene centro $(x_0,y_0)$, en su ecuación aparecen $x-x_0$ e $y-y_0$ en lugar de $x$ e $y$: es la elipse de centro el origen, trasladada. Los semiejes se leen igual, y los vértices y los focos se obtienen sumando al centro. A veces hay que completar cuadrados para ver el centro.',
            'إذا كان مركز القطع الناقص $(x_0,y_0)$ فتظهر في معادلته $x-x_0$ و$y-y_0$ بدل $x$ و$y$: إنه القطع الذي مركزه الأصل بعد إزاحته. ويُقرأ نصفا المحورين كما هما، ونحصل على الرؤوس والبؤرتين بالإضافة إلى المركز. وأحيانًا يلزم إكمال المربعات لرؤية المركز.',
            'If an ellipse has centre $(x_0,y_0)$, its equation shows $x-x_0$ and $y-y_0$ instead of $x$ and $y$: it is the ellipse centred at the origin, shifted. The semi-axes are read in the same way, and the vertices and foci are found by adding to the centre. Sometimes you have to complete the square to see the centre.'
        ),
        examplePrompt: say('Aurkitu $\\frac{(x+3)^2}{4}+\\frac{(y-2)^2}{16}=1$ elipsearen zentroa eta ardatz nagusiko erpinak.', 'Halla el centro y los vértices del eje mayor de la elipse $\\frac{(x+3)^2}{4}+\\frac{(y-2)^2}{16}=1$.', 'أوجد مركز القطع الناقص $\\frac{(x+3)^2}{4}+\\frac{(y-2)^2}{16}=1$ ورأسي محوره الأكبر.', 'Find the centre and the vertices on the major axis of the ellipse $\\frac{(x+3)^2}{4}+\\frac{(y-2)^2}{16}=1$.'),
        example: same('$(-3,2)\\qquad a=4\\qquad (-3,2\\pm 4)$'),
        exampleAnswer: say('Bertikala da: erpinak $(-3,6)$ eta $(-3,-2)$ dira.', 'Es vertical: los vértices son $(-3,6)$ y $(-3,-2)$.', 'إنه رأسي: الرأسان $(-3,6)$ و$(-3,-2)$.', 'It is vertical: the vertices are $(-3,6)$ and $(-3,-2)$.')
    },

    /* ---------- 4. The hyperbola ---------- */
    'hyperbola-definition': {
        definitions: [
            { term: say('Hiperbola', 'Hipérbola', 'القطع الزائد', 'Hyperbola'), meaning: say('Bi fokutarako distantzien kendura, balio absolutuan, konstantea duten puntuen leku geometrikoa.', 'El lugar de los puntos cuya diferencia de distancias a dos focos, en valor absoluto, es constante.', 'المحل الهندسي للنقاط التي فرق بعديها عن بؤرتين، بالقيمة المطلقة، ثابت.', 'The locus of the points whose difference of distances to two foci, in absolute value, is constant.') }
        ],
        vocabulary: [
            say('kendura', 'diferencia', 'الفرق', 'difference'),
            say('adarra', 'rama', 'الفرع', 'branch')
        ],
        explanation: say(
            'Hiperbolan, konstantea ez da batura, fokuetarako distantzien kendura baizik: $|PF-PF\'|=2a$. Horregatik bi adar ditu, foku bakoitzaren ondoan bat. Haren ekuazio laburtua elipsearenaren antzekoa da, minus zeinu batekin, eta orain handiena $c$ da: $c^2=a^2+b^2$.',
            'En la hipérbola, lo constante no es la suma sino la diferencia de distancias a los focos: $|PF-PF\'|=2a$. Por eso tiene dos ramas, una junto a cada foco. Su ecuación reducida se parece a la de la elipse, con un signo menos, y ahora el mayor es $c$: $c^2=a^2+b^2$.',
            'في القطع الزائد الثابت ليس المجموع بل فرق البعدين عن البؤرتين: $|PF-PF\'|=2a$. لذلك له فرعان، واحد قرب كل بؤرة. ومعادلته المختصرة تشبه معادلة القطع الناقص مع إشارة ناقص، والأكبر الآن هو $c$: $c^2=a^2+b^2$.',
            'In a hyperbola, what stays constant is not the sum but the difference of the distances to the foci: $|PF-PF\'|=2a$. That is why it has two branches, one next to each focus. Its reduced equation looks like the ellipse\'s, with a minus sign, and now the greatest is $c$: $c^2=a^2+b^2$.'
        ),
        examplePrompt: say('Aurkitu $(\\pm 13,0)$ fokuak dituen eta fokuetarako distantzien kendura $10$ duen hiperbola.', 'Halla la hipérbola de focos $(\\pm 13,0)$ cuya diferencia de distancias a los focos es $10$.', 'أوجد القطع الزائد الذي بؤرتاه $(\\pm 13,0)$ وفرق بعدي نقاطه عن البؤرتين $10$.', 'Find the hyperbola with foci $(\\pm 13,0)$ whose difference of distances to the foci is $10$.'),
        example: same('$a=5\\qquad b^2=169-25=144\\qquad\\frac{x^2}{25}-\\frac{y^2}{144}=1$'),
        exampleAnswer: say('Erpinak $(\\pm 5,0)$ dira; kurbak ez du ordenatu-ardatza ebakitzen.', 'Los vértices son $(\\pm 5,0)$; la curva no corta al eje de ordenadas.', 'الرأسان $(\\pm 5,0)$؛ والمنحنى لا يقطع محور الصادات.', 'The vertices are $(\\pm 5,0)$; the curve does not cut the vertical axis.')
    },
    'hyperbola-asymptotes': {
        definitions: [
            { term: say('Asintota', 'Asíntota', 'المقارب', 'Asymptote'), meaning: say('Kurba gero eta gehiago hurbiltzen zaion zuzena, inoiz ukitu gabe.', 'Recta a la que la curva se acerca cada vez más sin llegar a tocarla.', 'مستقيم يقترب منه المنحنى أكثر فأكثر دون أن يمسّه.', 'A line that the curve gets closer and closer to without touching it.') },
            { term: say('Hiperbola aldekidea', 'Hipérbola equilátera', 'القطع الزائد القائم', 'Rectangular hyperbola'), meaning: say('$a=b$ duen hiperbola: haren asintotak perpendikularrak dira.', 'Hipérbola con $a=b$: sus asíntotas son perpendiculares.', 'قطع زائد فيه $a=b$: مقارباه متعامدان.', 'A hyperbola with $a=b$: its asymptotes are perpendicular.') }
        ],
        vocabulary: [
            say('laukizuzena', 'rectángulo', 'المستطيل', 'rectangle'),
            say('diagonala', 'diagonal', 'القطر', 'diagonal')
        ],
        explanation: say(
            'Marraztu jatorrian zentroa duen eta $2a$ eta $2b$ aldeak dituen laukizuzena: haren diagonalak dira asintotak, $y=\\pm\\frac{b}{a}x$, eta adarrak haietara hurbiltzen dira. $e=\\frac{c}{a}$ eszentrikotasuna $1$ baino handiagoa da, $c>a$ delako: zenbat eta handiagoa izan, orduan eta irekiagoak daude adarrak.',
            'Dibuja el rectángulo de centro el origen y lados $2a$ y $2b$: sus diagonales son las asíntotas, $y=\\pm\\frac{b}{a}x$, y las ramas se pegan a ellas. La excentricidad $e=\\frac{c}{a}$ es mayor que $1$, porque $c>a$: cuanto mayor es, más abiertas están las ramas.',
            'ارسم المستطيل الذي مركزه الأصل وضلعاه $2a$ و$2b$: قطراه هما المقاربان $y=\\pm\\frac{b}{a}x$، والفرعان يقتربان منهما. والاختلاف المركزي $e=\\frac{c}{a}$ أكبر من $1$ لأن $c>a$: وكلما كبر انفتح الفرعان أكثر.',
            'Draw the rectangle centred at the origin with sides $2a$ and $2b$: its diagonals are the asymptotes, $y=\\pm\\frac{b}{a}x$, and the branches hug them. The eccentricity $e=\\frac{c}{a}$ is greater than $1$, because $c>a$: the greater it is, the more open the branches are.'
        ),
        examplePrompt: say('Aurkitu $\\frac{x^2}{9}-\\frac{y^2}{9}=1$ hiperbolaren asintotak eta eszentrikotasuna.', 'Halla las asíntotas y la excentricidad de la hipérbola $\\frac{x^2}{9}-\\frac{y^2}{9}=1$.', 'أوجد مقاربي القطع الزائد $\\frac{x^2}{9}-\\frac{y^2}{9}=1$ واختلافه المركزي.', 'Find the asymptotes and the eccentricity of the hyperbola $\\frac{x^2}{9}-\\frac{y^2}{9}=1$.'),
        example: same('$y=\\pm x\\qquad c=\\sqrt{9+9}=3\\sqrt{2}\\qquad e=\\frac{3\\sqrt{2}}{3}=\\sqrt{2}$'),
        exampleAnswer: say('Aldekidea da, $a=b$: asintotak koadranteen erdikariak dira.', 'Es equilátera, $a=b$: las asíntotas son las bisectrices de los cuadrantes.', 'إنه قائم، $a=b$: المقاربان منصّفا الأرباع.', 'It is rectangular, $a=b$: the asymptotes are the bisectors of the quadrants.'),
        why: {
            text: say(
                'Zergatik betetzen da? Askatu $y$: $y=\\pm\\frac{b}{a}\\sqrt{x^2-a^2}$. $x$ oso handia denean, $x^2-a^2$ ia $x^2$ da, eta erroa ia $x$: kurba $y=\\pm\\frac{b}{a}x$ zuzenetara hurbiltzen da.',
                '¿Por qué funciona? Despeja $y$: $y=\\pm\\frac{b}{a}\\sqrt{x^2-a^2}$. Para $x$ muy grande, $x^2-a^2$ es casi $x^2$, y la raíz es casi $x$: la curva se pega a $y=\\pm\\frac{b}{a}x$.',
                'لماذا يصح؟ اعزل $y$: $y=\\pm\\frac{b}{a}\\sqrt{x^2-a^2}$. وعندما يكون $x$ كبيرًا جدًا يكون $x^2-a^2$ قريبًا من $x^2$ والجذر قريبًا من $x$: فيلتصق المنحنى بـ $y=\\pm\\frac{b}{a}x$.',
                'Why does it work? Solve for $y$: $y=\\pm\\frac{b}{a}\\sqrt{x^2-a^2}$. For a very large $x$, $x^2-a^2$ is almost $x^2$, and the root is almost $x$: the curve hugs $y=\\pm\\frac{b}{a}x$.'
            ),
            math: same('$y=\\pm\\frac{b}{a}\\sqrt{x^2-a^2}\\approx\\pm\\frac{b}{a}x$')
        }
    },

    /* ---------- 5. The parabola and the conics ---------- */
    'parabola-definition': {
        definitions: [
            { term: say('Parabola', 'Parábola', 'القطع المكافئ', 'Parabola'), meaning: say('Puntu finko batetik, fokutik, eta zuzen finko batetik, zuzentzailetik, distantzia berera dauden puntuen leku geometrikoa.', 'El lugar de los puntos que están a la misma distancia de un punto fijo, el foco, y de una recta fija, la directriz.', 'المحل الهندسي للنقاط التي تبعد المسافة نفسها عن نقطة ثابتة هي البؤرة وعن مستقيم ثابت هو الدليل.', 'The locus of the points at the same distance from a fixed point, the focus, and from a fixed line, the directrix.') },
            { term: say('Parametroa', 'Parámetro', 'الوسيط', 'Parameter'), meaning: say('$p$ zenbakia: fokutik zuzentzailerako distantzia.', 'El número $p$: la distancia del foco a la directriz.', 'العدد $p$: المسافة من البؤرة إلى الدليل.', 'The number $p$: the distance from the focus to the directrix.') }
        ],
        vocabulary: [
            say('erpina', 'vértice', 'الرأس', 'vertex'),
            say('ardatza', 'eje', 'المحور', 'axis')
        ],
        explanation: say(
            'Parabolako puntu bat fokutik zuzentzailetik bezain urrun dago. Fokua $\\left(\\frac{p}{2},0\\right)$ bada eta zuzentzailea $x=-\\frac{p}{2}$, erpina jatorrian dago, bien erdian, eta ardatza abzisa-ardatza da. Ekuazioa $y^2=2px$ da: $p$ zenbakia fokutik zuzentzailerako distantzia da.',
            'Un punto de la parábola está tan lejos del foco como de la directriz. Si el foco es $\\left(\\frac{p}{2},0\\right)$ y la directriz $x=-\\frac{p}{2}$, el vértice está en el origen, justo entre los dos, y el eje es el de abscisas. La ecuación es $y^2=2px$: el número $p$ es la distancia del foco a la directriz.',
            'تبعد كل نقطة من القطع المكافئ عن البؤرة بقدر ما تبعد عن الدليل. فإذا كانت البؤرة $\\left(\\frac{p}{2},0\\right)$ والدليل $x=-\\frac{p}{2}$ فالرأس في الأصل، في المنتصف بينهما، والمحور هو محور السينات. والمعادلة $y^2=2px$: والعدد $p$ هو المسافة من البؤرة إلى الدليل.',
            'A point of the parabola is as far from the focus as from the directrix. If the focus is $\\left(\\frac{p}{2},0\\right)$ and the directrix $x=-\\frac{p}{2}$, the vertex is at the origin, right between them, and the axis is the horizontal axis. The equation is $y^2=2px$: the number $p$ is the distance from the focus to the directrix.'
        ),
        examplePrompt: say('Aurkitu $y^2=10x$ parabolaren fokua eta zuzentzailea.', 'Halla el foco y la directriz de la parábola $y^2=10x$.', 'أوجد بؤرة القطع المكافئ $y^2=10x$ ودليله.', 'Find the focus and the directrix of the parabola $y^2=10x$.'),
        example: same('$2p=10\\ \\to\\ p=5\\qquad F\\left(\\frac{5}{2},0\\right)\\qquad x=-\\frac{5}{2}$'),
        exampleAnswer: say('Fokua erpinetik $\\frac{5}{2}$ distantziara dago, eta zuzentzailea beste aldean, distantzia berera.', 'El foco está a $\\frac{5}{2}$ del vértice, y la directriz al otro lado, a la misma distancia.', 'البؤرة على بعد $\\frac{5}{2}$ من الرأس، والدليل في الجهة الأخرى على البعد نفسه.', 'The focus is $\\frac{5}{2}$ from the vertex, and the directrix is on the other side, at the same distance.'),
        why: {
            text: say(
                'Zergatik betetzen da? $F\\left(\\frac{p}{2},0\\right)$ fokuarekin eta $x=-\\frac{p}{2}$ zuzentzailearekin, baldintza $\\left(x-\\frac{p}{2}\\right)^2+y^2=\\left(x+\\frac{p}{2}\\right)^2$ da. Garatzean, $x^2$ eta $\\frac{p^2}{4}$ bi aldeetatik joaten dira, eta $y^2=2px$ geratzen da.',
                '¿Por qué funciona? Con $F\\left(\\frac{p}{2},0\\right)$ y directriz $x=-\\frac{p}{2}$, la condición es $\\left(x-\\frac{p}{2}\\right)^2+y^2=\\left(x+\\frac{p}{2}\\right)^2$. Al desarrollar, $x^2$ y $\\frac{p^2}{4}$ se van de los dos lados y queda $y^2=2px$.',
                'لماذا يصح؟ مع $F\\left(\\frac{p}{2},0\\right)$ والدليل $x=-\\frac{p}{2}$ يكون الشرط $\\left(x-\\frac{p}{2}\\right)^2+y^2=\\left(x+\\frac{p}{2}\\right)^2$. وعند النشر يذهب $x^2$ و$\\frac{p^2}{4}$ من الطرفين ويبقى $y^2=2px$.',
                'Why does it work? With $F\\left(\\frac{p}{2},0\\right)$ and directrix $x=-\\frac{p}{2}$, the condition is $\\left(x-\\frac{p}{2}\\right)^2+y^2=\\left(x+\\frac{p}{2}\\right)^2$. Expanding, $x^2$ and $\\frac{p^2}{4}$ cancel on both sides and $y^2=2px$ is left.'
            ),
            math: same('$\\left(x+\\frac{p}{2}\\right)^2-\\left(x-\\frac{p}{2}\\right)^2=2px$')
        }
    },
    'parabola-positions': {
        definitions: [
            { term: say('Parabolaren ardatza', 'Eje de la parábola', 'محور القطع المكافئ', 'Axis of a parabola'), meaning: say('Fokutik pasatzen den eta zuzentzailearekiko perpendikularra den zuzena; parabola simetrikoa da harekiko.', 'La recta que pasa por el foco y es perpendicular a la directriz; la parábola es simétrica respecto de ella.', 'المستقيم المار بالبؤرة والعمودي على الدليل؛ والقطع المكافئ متناظر بالنسبة إليه.', 'The line through the focus perpendicular to the directrix; the parabola is symmetric about it.') }
        ],
        vocabulary: [
            say('simetrikoa', 'simétrica', 'متناظر', 'symmetric'),
            say('erpina', 'vértice', 'الرأس', 'vertex')
        ],
        explanation: say(
            'Karratura doan aldagaiak ardatza adierazten du: $y^2$ bada, ardatza horizontala da, eta $x^2$ bada, bertikala. $p$ zenbakiaren zeinuak esaten du nora irekitzen den. Erpina jatorrian ez badago, aldagaiak lekualdatzen dira, $x-x_0$ eta $y-y_0$, eta fokua eta zuzentzailea harekin mugitzen dira, beti erpinetik $\\frac{p}{2}$ distantziara.',
            'La variable que va al cuadrado dice el eje: con $y^2$ el eje es horizontal, y con $x^2$, vertical. El signo de $p$ dice hacia dónde se abre. Si el vértice no está en el origen, se trasladan las variables, $x-x_0$ e $y-y_0$, y el foco y la directriz se mueven con él, siempre a $\\frac{p}{2}$ del vértice.',
            'المتغير المربّع يحدد المحور: مع $y^2$ يكون المحور أفقيًا، ومع $x^2$ رأسيًا. وإشارة $p$ تحدد جهة الانفتاح. وإذا لم يكن الرأس في الأصل نزيح المتغيرين، $x-x_0$ و$y-y_0$، فتتحرك البؤرة والدليل معه، دائمًا على بعد $\\frac{p}{2}$ من الرأس.',
            'The variable that is squared tells you the axis: with $y^2$ the axis is horizontal, and with $x^2$, vertical. The sign of $p$ tells you which way it opens. If the vertex is not at the origin, the variables are shifted, $x-x_0$ and $y-y_0$, and the focus and the directrix move with it, always $\\frac{p}{2}$ from the vertex.'
        ),
        cases: [
            { title: say('Eskuinera', 'A la derecha', 'نحو اليمين', 'To the right'), text: say('Fokua $\\left(\\frac{p}{2},0\\right)$, zuzentzailea $x=-\\frac{p}{2}$.', 'Foco $\\left(\\frac{p}{2},0\\right)$, directriz $x=-\\frac{p}{2}$.', 'البؤرة $\\left(\\frac{p}{2},0\\right)$ والدليل $x=-\\frac{p}{2}$.', 'Focus $\\left(\\frac{p}{2},0\\right)$, directrix $x=-\\frac{p}{2}$.'), math: same('$y^2=2px$') },
            { title: say('Ezkerrera', 'A la izquierda', 'نحو اليسار', 'To the left'), text: say('Fokua $\\left(-\\frac{p}{2},0\\right)$, zuzentzailea $x=\\frac{p}{2}$.', 'Foco $\\left(-\\frac{p}{2},0\\right)$, directriz $x=\\frac{p}{2}$.', 'البؤرة $\\left(-\\frac{p}{2},0\\right)$ والدليل $x=\\frac{p}{2}$.', 'Focus $\\left(-\\frac{p}{2},0\\right)$, directrix $x=\\frac{p}{2}$.'), math: same('$y^2=-2px$') },
            { title: say('Gora', 'Hacia arriba', 'نحو الأعلى', 'Upwards'), text: say('Fokua $\\left(0,\\frac{p}{2}\\right)$, zuzentzailea $y=-\\frac{p}{2}$.', 'Foco $\\left(0,\\frac{p}{2}\\right)$, directriz $y=-\\frac{p}{2}$.', 'البؤرة $\\left(0,\\frac{p}{2}\\right)$ والدليل $y=-\\frac{p}{2}$.', 'Focus $\\left(0,\\frac{p}{2}\\right)$, directrix $y=-\\frac{p}{2}$.'), math: same('$x^2=2py$') },
            { title: say('Behera', 'Hacia abajo', 'نحو الأسفل', 'Downwards'), text: say('Fokua $\\left(0,-\\frac{p}{2}\\right)$, zuzentzailea $y=\\frac{p}{2}$.', 'Foco $\\left(0,-\\frac{p}{2}\\right)$, directriz $y=\\frac{p}{2}$.', 'البؤرة $\\left(0,-\\frac{p}{2}\\right)$ والدليل $y=\\frac{p}{2}$.', 'Focus $\\left(0,-\\frac{p}{2}\\right)$, directrix $y=\\frac{p}{2}$.'), math: same('$x^2=-2py$') }
        ],
        examplePrompt: say('Aurkitu $x^2=-12y$ parabolaren fokua eta zuzentzailea.', 'Halla el foco y la directriz de la parábola $x^2=-12y$.', 'أوجد بؤرة القطع المكافئ $x^2=-12y$ ودليله.', 'Find the focus and the directrix of the parabola $x^2=-12y$.'),
        example: same('$2p=12\\ \\to\\ p=6\\qquad F(0,-3)\\qquad y=3$'),
        exampleAnswer: say('Behera irekitzen da: ardatza ordenatu-ardatza da, eta fokua erpinaren azpian dago.', 'Se abre hacia abajo: el eje es el de ordenadas y el foco está debajo del vértice.', 'ينفتح نحو الأسفل: المحور هو محور الصادات والبؤرة تحت الرأس.', 'It opens downwards: the axis is the vertical axis and the focus is below the vertex.')
    },
    'recognize-conic': {
        definitions: [
            { term: say('Konika', 'Cónica', 'القطع المخروطي', 'Conic'), meaning: say('Kono bikoitz bat plano batekin ebakitzean ateratzen den kurba: zirkunferentzia, elipsea, hiperbola edo parabola.', 'La curva que sale al cortar un cono doble con un plano: circunferencia, elipse, hipérbola o parábola.', 'المنحنى الناتج عن قطع مخروط مزدوج بمستوى: دائرة أو قطع ناقص أو قطع زائد أو قطع مكافئ.', 'The curve you get by cutting a double cone with a plane: a circle, an ellipse, a hyperbola or a parabola.') },
            { term: say('Sortzailea', 'Generatriz', 'الراسم', 'Generator'), meaning: say('Konoaren gainazala osatzen duten zuzenetako bakoitza.', 'Cada una de las rectas que forman la superficie del cono.', 'كل مستقيم من المستقيمات التي تكوّن سطح المخروط.', 'Each of the lines that make up the surface of the cone.') }
        ],
        vocabulary: [
            say('konoa', 'cono', 'المخروط', 'cone'),
            say('planoa', 'plano', 'المستوى', 'plane')
        ],
        explanation: say(
            'Kurba horiek guztiak konikak dira: kono bikoitz bat plano batekin ebakitzean ateratzen dira. Ekuazioan, $xy$ gairik gabe, begiratu $x^2$ eta $y^2$ gaien koefizienteei: berdinak, zirkunferentzia; zeinu berekoak, elipsea; aurkako zeinukoak, hiperbola; bat zero, parabola. Gero osatu karratuak zentroa edo erpina aurkitzeko.',
            'Todas estas curvas son cónicas: salen al cortar un cono doble con un plano. En la ecuación, sin término en $xy$, mira los coeficientes de $x^2$ e $y^2$: iguales, circunferencia; del mismo signo, elipse; de signos opuestos, hipérbola; uno nulo, parábola. Después completa cuadrados para hallar el centro o el vértice.',
            'كل هذه المنحنيات قطوع مخروطية: تنتج عن قطع مخروط مزدوج بمستوى. وفي المعادلة، من دون حد فيه $xy$، انظر إلى معاملي $x^2$ و$y^2$: متساويان، دائرة؛ من الإشارة نفسها، قطع ناقص؛ بإشارتين مختلفتين، قطع زائد؛ وأحدهما صفر، قطع مكافئ. ثم أكمل المربعات لإيجاد المركز أو الرأس.',
            'All these curves are conics: you get them by cutting a double cone with a plane. In the equation, with no term in $xy$, look at the coefficients of $x^2$ and $y^2$: equal, a circle; same sign, an ellipse; opposite signs, a hyperbola; one of them zero, a parabola. Then complete the square to find the centre or the vertex.'
        ),
        cases: [
            { title: say('Zirkunferentzia', 'Circunferencia', 'الدائرة', 'Circle'), text: say('Konoaren ardatzarekiko perpendikularra den ebakidura.', 'Corte perpendicular al eje del cono.', 'مقطع عمودي على محور المخروط.', 'A cut perpendicular to the axis of the cone.'), math: same('$e=0$') },
            { title: say('Elipsea', 'Elipse', 'القطع الناقص', 'Ellipse'), text: say('Ebakidura makurtua, sortzaile guztiak ebakitzen dituena.', 'Corte inclinado que corta a todas las generatrices.', 'مقطع مائل يقطع كل الرواسم.', 'A slanted cut that crosses every generator.'), math: same('$0<e<1$') },
            { title: say('Parabola', 'Parábola', 'القطع المكافئ', 'Parabola'), text: say('Sortzaile batekiko paraleloa den ebakidura.', 'Corte paralelo a una generatriz.', 'مقطع موازٍ لراسم.', 'A cut parallel to a generator.'), math: same('$e=1$') },
            { title: say('Hiperbola', 'Hipérbola', 'القطع الزائد', 'Hyperbola'), text: say('Konoaren bi orriak zeharkatzen dituen ebakidura.', 'Corte que atraviesa las dos hojas del cono.', 'مقطع يخترق نصفي المخروط.', 'A cut through both halves of the cone.'), math: same('$e>1$') }
        ],
        examplePrompt: say('Zein konika da $x^2-4y^2-2x-8y-7=0$?', '¿Qué cónica es $x^2-4y^2-2x-8y-7=0$?', 'أي قطع مخروطي هو $x^2-4y^2-2x-8y-7=0$؟', 'Which conic is $x^2-4y^2-2x-8y-7=0$?'),
        example: same('$(x-1)^2-4(y+1)^2=7+1-4=4$'),
        exampleAnswer: say('Hiperbola bat da: $\\frac{(x-1)^2}{4}-(y+1)^2=1$, $(1,-1)$ zentroarekin.', 'Una hipérbola: $\\frac{(x-1)^2}{4}-(y+1)^2=1$, de centro $(1,-1)$.', 'قطع زائد: $\\frac{(x-1)^2}{4}-(y+1)^2=1$ مركزه $(1,-1)$.', 'A hyperbola: $\\frac{(x-1)^2}{4}-(y+1)^2=1$, with centre $(1,-1)$.')
    }
}

import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { FiguresTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Irudi lauak · 1. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, the example as an exercise («Another example», or «Example»
   in the lessons of facts) and, in three lessons, «Why does it work?».
   Plain data so the tests can import it; lessons.tsx merges it into the
   topics. The long explanations of this unit (up to 117 words) moved their
   cases into cards and their side notes into definitions, and keep the
   numbers that their drawing shows (the pentagon in 3 triangles and the
   hexagon in 4, the sticks of 3, 5, 7 and 3, 4, 8 cm, the 90° sector); the
   drawings that solve «Let's solve» wait after the steps. π is 3,14. The
   example uses numbers of its own, never those of «Let's solve», of «Check
   it» or of the typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const figuresLessonTexts: Record<FiguresTopicId, LessonTexts> = {
    /* ---------- 1. Polygons ---------- */
    diagonals: {
        vocabulary: [
            say('erpina', 'vértice', 'الرأس', 'vertex'),
            say('auzokideak', 'vecinos', 'الجار', 'neighbours'),
            say('muturra', 'extremo', 'الطرف', 'end')
        ],
        explanation: say(
            '$n$ aldeko poligono baten erpin bakoitzetik $n-3$ diagonal ateratzen dira: ez da bere buruarekin lotzen, ez bi auzokideekin. $n$ erpinekin $n\\cdot(n-3)$ marra ateratzen dira, baina diagonal bakoitza bi aldiz zenbatzen da, mutur bakoitzetik behin: $\\frac{n\\cdot(n-3)}{2}$ daude.',
            'De cada vértice de un polígono de $n$ lados salen $n-3$ diagonales: no se une consigo mismo ni con sus dos vecinos. Con $n$ vértices salen $n\\cdot(n-3)$ trazos, pero cada diagonal se cuenta dos veces, una desde cada extremo: hay $\\frac{n\\cdot(n-3)}{2}$.',
            'من كل رأس في مضلع له $n$ أضلاع يخرج $n-3$ أقطار: لا يتصل بنفسه ولا بجاريه. ومع $n$ رؤوس نحصل على $n\\cdot(n-3)$ خطًا، لكن كل قطر يُعدّ مرتين، مرة من كل طرف: إذن هناك $\\frac{n\\cdot(n-3)}{2}$.',
            'From each vertex of a polygon with $n$ sides, $n-3$ diagonals come out: it does not join itself or its two neighbours. With $n$ vertices you draw $n\\cdot(n-3)$ lines, but each diagonal is counted twice, once from each end: there are $\\frac{n\\cdot(n-3)}{2}$.'
        ),
        examplePrompt: say('Zenbat diagonal ditu oktogono batek? Eta dekagono batek?', '¿Cuántas diagonales tiene un octógono? ¿Y un decágono?', 'كم قطرًا للمثمن؟ وللمعشّر؟', 'How many diagonals does an octagon have? And a decagon?'),
        example: same('$\\begin{gathered}\\frac{8\\cdot 5}{2}=20\\\\\\frac{10\\cdot 7}{2}=35\\end{gathered}$'),
        exampleAnswer: say('Oktogonoak 20 diagonal ditu, eta dekagonoak 35.', 'El octógono tiene 20 diagonales y el decágono, 35.', 'للمثمن 20 قطرًا وللمعشّر 35.', 'The octagon has 20 diagonals and the decagon 35.')
    },
    'angle-sum': {
        vocabulary: [
            say('barne-angeluak', 'ángulos interiores', 'الزوايا الداخلية', 'interior angles'),
            say('triangeluak', 'triángulos', 'المثلثات', 'triangles'),
            say('batura', 'suma', 'المجموع', 'sum')
        ],
        explanation: say(
            'Erpin batetik, diagonalek $n$ aldeko poligonoa $n-2$ triangelutan banatzen dute: marrazkiko pentagonoa 3 triangelutan, eta hexagonoa 4 triangelutan. Triangelu bakoitzak $180^{\\circ}$ batzen ditu; beraz, poligonoak $(n-2)\\cdot 180^{\\circ}$. Angelu bat falta bada, kendu ezagunak guztizkoari.',
            'Desde un vértice, las diagonales dividen un polígono de $n$ lados en $n-2$ triángulos: el pentágono del dibujo, en 3, y el hexágono, en 4. Cada triángulo suma $180^{\\circ}$, así que el polígono suma $(n-2)\\cdot 180^{\\circ}$. Si falta un ángulo, resta los conocidos al total.',
            'من رأس واحد تقسم الأقطار المضلع ذا $n$ أضلاع إلى $n-2$ مثلثات: المخمس في الرسم إلى 3، والمسدس إلى 4. ومجموع زوايا كل مثلث $180^{\\circ}$، إذن مجموع زوايا المضلع $(n-2)\\cdot 180^{\\circ}$. وإذا نقصت زاوية فاطرح المعلومة من المجموع.',
            'From one vertex, the diagonals split a polygon with $n$ sides into $n-2$ triangles: the pentagon in the drawing into 3, and the hexagon into 4. Each triangle adds up to $180^{\\circ}$, so the polygon adds up to $(n-2)\\cdot 180^{\\circ}$. If an angle is missing, subtract the known ones from the total.'
        ),
        examplePrompt: say('Zenbat batzen dute oktogono baten angeluek? Eta dekagono batenek?', '¿Cuánto suman los ángulos de un octógono? ¿Y los de un decágono?', 'كم مجموع زوايا المثمن؟ وزوايا المعشّر؟', 'What do the angles of an octagon add up to? And those of a decagon?'),
        example: same('$\\begin{gathered}(8-2)\\cdot 180^{\\circ}=1080^{\\circ}\\\\(10-2)\\cdot 180^{\\circ}=1440^{\\circ}\\end{gathered}$'),
        exampleAnswer: say('Oktogonoarenek $1080^{\\circ}$ batzen dute, eta dekagonoarenek $1440^{\\circ}$.', 'El octógono suma $1080^{\\circ}$ y el decágono, $1440^{\\circ}$.', 'مجموع زوايا المثمن $1080^{\\circ}$ والمعشّر $1440^{\\circ}$.', 'The octagon adds up to $1080^{\\circ}$ and the decagon to $1440^{\\circ}$.')
    },
    'regular-angles': {
        vocabulary: [
            say('zentroa', 'centro', 'المركز', 'centre'),
            say('lauza', 'baldosa', 'البلاطة', 'tile'),
            say('erregularra', 'regular', 'منتظم', 'regular')
        ],
        definitions: [
            {
                term: say('Angelu zentrala', 'Ángulo central', 'الزاوية المركزية', 'Central angle'),
                meaning: say('Zentroa ondoz ondoko bi erpinekin lotzen duten zuzenkiek osatzen dutena.', 'El que forman los segmentos que unen el centro con dos vértices consecutivos.', 'الزاوية التي تكوّنها القطعتان الواصلتان بين المركز ورأسين متتاليين.', 'The angle between the segments joining the centre to two neighbouring vertices.')
            }
        ],
        explanation: say(
            'Poligono erregular batean angelu guztiak berdinak dira: barne-angelu bakoitza batura zati $n$ da, $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. Angelu zentralek zentroaren inguruko $360^{\\circ}$ banatzen dituzte: $\\frac{360^{\\circ}}{n}$. Lauza erregular batek lurra estaltzen du, haren barne-angeluak $360^{\\circ}$ zatitzen badu.',
            'En un polígono regular todos los ángulos son iguales: cada ángulo interior es la suma entre $n$, $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. Los ángulos centrales se reparten los $360^{\\circ}$ alrededor del centro: $\\frac{360^{\\circ}}{n}$. Una baldosa regular cubre el suelo si su ángulo interior divide a $360^{\\circ}$.',
            'في المضلع المنتظم كل الزوايا متساوية: كل زاوية داخلية هي المجموع مقسومًا على $n$، $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. والزوايا المركزية تتقاسم $360^{\\circ}$ حول المركز: $\\frac{360^{\\circ}}{n}$. والبلاطة المنتظمة تغطي الأرض إذا كانت زاويتها الداخلية تقسم $360^{\\circ}$.',
            'In a regular polygon all the angles are equal: each interior angle is the sum divided by $n$, $\\frac{(n-2)\\cdot 180^{\\circ}}{n}$. The central angles share out the $360^{\\circ}$ round the centre: $\\frac{360^{\\circ}}{n}$. A regular tile covers the floor if its interior angle divides $360^{\\circ}$.'
        ),
        examplePrompt: say('Kalkulatu oktogono erregular baten barne-angelua eta angelu zentrala.', 'Calcula el ángulo interior y el central de un octógono regular.', 'احسب الزاوية الداخلية والزاوية المركزية للمثمن المنتظم.', 'Work out the interior and the central angle of a regular octagon.'),
        example: same('$\\begin{gathered}\\frac{(8-2)\\cdot 180^{\\circ}}{8}=135^{\\circ}\\\\\\frac{360^{\\circ}}{8}=45^{\\circ}\\end{gathered}$'),
        exampleAnswer: say('Barnekoa $135^{\\circ}$; zentrala $45^{\\circ}$. 135 zenbakiak ez du 360 zatitzen: oktogonoek, bakarrik, ez dute lauzatzen.', 'Interior, $135^{\\circ}$; central, $45^{\\circ}$. Como 135 no divide a 360, los octógonos solos no embaldosan.', 'الداخلية $135^{\\circ}$ والمركزية $45^{\\circ}$. ولأن 135 لا يقسم 360 فالمثمنات وحدها لا تبلّط.', 'Interior, $135^{\\circ}$; central, $45^{\\circ}$. Since 135 does not divide 360, octagons on their own do not tile.'),
        why: {
            text: say(
                'Lurreko puntu bakoitzean elkartzen diren lauzek $360^{\\circ}$ bete behar dituzte, hutsunerik gabe. Hiru hexagonok $3\\cdot 120^{\\circ}=360^{\\circ}$ ematen dute; hiru pentagonok, $3\\cdot 108^{\\circ}=324^{\\circ}$, eta hutsune bat geratzen da.',
                'En cada punto del suelo se juntan baldosas que tienen que llenar $360^{\\circ}$ sin huecos. Tres hexágonos dan $3\\cdot 120^{\\circ}=360^{\\circ}$; tres pentágonos, $3\\cdot 108^{\\circ}=324^{\\circ}$, y queda un hueco.',
                'عند كل نقطة من الأرض تلتقي بلاطات يجب أن تملأ $360^{\\circ}$ دون فراغ. ثلاثة مسدسات تعطي $3\\cdot 120^{\\circ}=360^{\\circ}$؛ وثلاثة مخمسات $3\\cdot 108^{\\circ}=324^{\\circ}$ فيبقى فراغ.',
                'At each point of the floor, tiles meet and have to fill $360^{\\circ}$ with no gaps. Three hexagons give $3\\cdot 120^{\\circ}=360^{\\circ}$; three pentagons, $3\\cdot 108^{\\circ}=324^{\\circ}$, and a gap is left.'
            ),
            math: same('$3\\cdot 108^{\\circ}=324^{\\circ}<360^{\\circ}$')
        }
    },

    /* ---------- 2. Triangles ---------- */
    'triangle-exists': {
        vocabulary: [
            say('alde handiena', 'lado mayor', 'الضلع الأكبر', 'longest side'),
            say('makilak', 'palos', 'العصي', 'sticks'),
            say('ixten da', 'se cierra', 'ينغلق', 'closes')
        ],
        definitions: [
            {
                term: say('Desberdintza triangeluarra', 'Desigualdad triangular', 'متباينة المثلث', 'Triangle inequality'),
                meaning: say('Triangelu baten alde bakoitza beste bien batura baino txikiagoa da.', 'Cada lado de un triángulo es menor que la suma de los otros dos.', 'كل ضلع في المثلث أصغر من مجموع الضلعين الآخرين.', 'Each side of a triangle is shorter than the other two put together.')
            }
        ],
        explanation: say(
            'Hiru makilarekin ez da beti triangelu bat osatzen: nahikoa da alde handiena egiaztatzea. Marrazkian, 3, 5 eta 7 cm-rekin, $7<3+5$ eta ixten da; 3, 4 eta 8 cm-rekin, $8>3+4$ eta ez. Angeluekin, bik $180^{\\circ}$ baino gutxiago batu behar dute.',
            'Con tres palos no siempre se forma un triángulo: basta comprobar el lado mayor. En el dibujo, con 3, 5 y 7 cm, $7<3+5$ y se cierra; con 3, 4 y 8 cm, $8>3+4$ y no. Con los ángulos, dos tienen que sumar menos de $180^{\\circ}$.',
            'لا تكوّن ثلاث عصي مثلثًا دائمًا: يكفي فحص الضلع الأكبر. في الرسم مع 3 و5 و7 سم يكون $7<3+5$ فينغلق؛ ومع 3 و4 و8 سم يكون $8>3+4$ فلا ينغلق. ومع الزوايا يجب أن يكون مجموع اثنتين أقل من $180^{\\circ}$.',
            'Three sticks do not always make a triangle: it is enough to check the longest side. In the drawing, with 3, 5 and 7 cm, $7<3+5$ and it closes; with 3, 4 and 8 cm, $8>3+4$ and it does not. With angles, any two must add up to less than $180^{\\circ}$.'
        ),
        examplePrompt: say('Triangelu bat eraiki daiteke 6, 9 eta 16 cm-ko aldeekin? Eta 6, 9 eta 13 cm-koekin?', '¿Se puede construir un triángulo con lados de 6, 9 y 16 cm? ¿Y con 6, 9 y 13 cm?', 'هل يمكن بناء مثلث أضلاعه 6 و9 و16 سم؟ وبأضلاع 6 و9 و13 سم؟', 'Can you build a triangle with sides of 6, 9 and 16 cm? And with 6, 9 and 13 cm?'),
        example: same('$\\begin{gathered}16>6+9=15\\\\13<6+9=15\\end{gathered}$'),
        exampleAnswer: say('16 cm-rekin, ez: beste biak ez dira iristen. 13 cm-rekin, bai.', 'Con 16 cm, no: los otros dos no llegan. Con 13 cm, sí.', 'مع 16 سم لا: لا يصل الضلعان الآخران. ومع 13 سم نعم.', 'With 16 cm, no: the other two do not reach. With 13 cm, yes.'),
        why: {
            text: say(
                'Bi punturen arteko biderik laburrena zuzena da. Alde handienaren mutur batetik bestera beste bi aldeetatik joatea itzulinguru bat da, eta itzulinguru bat beti da luzeagoa: horregatik behar dute biek batera gehiago neurtu.',
                'El camino más corto entre dos puntos es el recto. Ir de un extremo del lado mayor al otro por los otros dos lados es dar un rodeo, y un rodeo siempre es más largo: por eso los dos juntos tienen que medir más.',
                'أقصر طريق بين نقطتين هو الخط المستقيم. والذهاب من طرف الضلع الأكبر إلى طرفه الآخر عبر الضلعين الآخرين التفاف، والالتفاف أطول دائمًا: لذلك يجب أن يكون مجموعهما أكبر.',
                'The shortest way between two points is the straight one. Going from one end of the longest side to the other along the other two sides is a detour, and a detour is always longer: that is why the two together must be longer.'
            )
        }
    },
    'side-angle': {
        vocabulary: [
            say('aurrean', 'frente', 'المقابل', 'opposite'),
            say('isoszelea', 'isósceles', 'متساوي الساقين', 'isosceles'),
            say('aldeberdina', 'equilátero', 'متساوي الأضلاع', 'equilateral')
        ],
        explanation: say(
            'Triangelu batean, alde handiaren aurrean angelu handiena dago, eta txikiaren aurrean, txikiena. Bi alde berdinak badira, haien aurreko angeluak ere bai: isoszelearen oinarriko angeluak dira. Aldeberdinean hirurek $180^{\\circ}\\mathbin{:}3=60^{\\circ}$ neurtzen dute.',
            'En un triángulo, frente al lado mayor está el ángulo mayor, y frente al menor, el menor. Si dos lados son iguales, los ángulos opuestos también: son los ángulos de la base del isósceles. En el equilátero los tres miden $180^{\\circ}\\mathbin{:}3=60^{\\circ}$.',
            'في المثلث تقابل الضلعَ الأكبر الزاويةُ الكبرى، وتقابل الأصغرَ الصغرى. وإذا تساوى ضلعان تساوت الزاويتان المقابلتان لهما: هما زاويتا قاعدة المثلث المتساوي الساقين. وفي المتساوي الأضلاع تقيس كل زاوية $180^{\\circ}\\mathbin{:}3=60^{\\circ}$.',
            'In a triangle, opposite the longest side is the biggest angle, and opposite the shortest, the smallest. If two sides are equal, the opposite angles are too: they are the base angles of the isosceles triangle. In an equilateral triangle all three are $180^{\\circ}\\mathbin{:}3=60^{\\circ}$.'
        ),
        examplePrompt: say('Triangelu isoszele baten oinarriko angelu bakoitzak $52^{\\circ}$ neurtzen du. Zenbat neurtzen du angelu desberdinak?', 'Cada ángulo de la base de un triángulo isósceles mide $52^{\\circ}$. ¿Cuánto mide el ángulo desigual?', 'كل زاوية من زاويتي قاعدة مثلث متساوي الساقين $52^{\\circ}$. كم قياس الزاوية الثالثة؟', 'Each base angle of an isosceles triangle is $52^{\\circ}$. What is the other angle?'),
        example: same('$180^{\\circ}-2\\cdot 52^{\\circ}=76^{\\circ}$'),
        exampleAnswer: say('Angelu desberdinak $76^{\\circ}$ neurtzen ditu.', 'El ángulo desigual mide $76^{\\circ}$.', 'الزاوية الثالثة $76^{\\circ}$.', 'The other angle is $76^{\\circ}$.'),
        why: {
            text: say(
                'Bi alderen arteko angelua gehiago irekitzen baduzu, haien muturrak urrundu egiten dira, eta hirugarren aldea luzatu egiten da. Horregatik du alderik luzeenak aurrean irekiera handiena.',
                'Si abres más el ángulo entre dos lados, sus extremos se separan y el tercer lado se alarga. Por eso el lado más largo tiene enfrente la abertura mayor.',
                'إذا فتحت الزاوية بين ضلعين أكثر ابتعد طرفاهما وطال الضلع الثالث. لذلك تقابل الضلعَ الأطول أكبرُ فتحة.',
                'If you open the angle between two sides wider, their ends move apart and the third side gets longer. That is why the longest side has the widest opening opposite it.'
            )
        }
    },
    centers: {
        vocabulary: [
            say('zirkunzentroa', 'circuncentro', 'مركز الدائرة المحيطة', 'circumcentre'),
            say('inzentroa', 'incentro', 'مركز الدائرة الداخلية', 'incentre'),
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse')
        ],
        definitions: [
            {
                term: say('Zirkunskribatua eta inskribatua', 'Circunscrita e inscrita', 'المحيطة والداخلية', 'Circumscribed and inscribed'),
                meaning: say('Zirkunskribatua hiru erpinetatik pasatzen da (zentroa: zirkunzentroa); inskribatuak hiru aldeak ukitzen ditu barrutik (zentroa: inzentroa).', 'La circunscrita pasa por los tres vértices (centro: circuncentro); la inscrita toca los tres lados por dentro (centro: incentro).', 'المحيطة تمر بالرؤوس الثلاثة (مركزها مركز الدائرة المحيطة)؛ والداخلية تمس الأضلاع الثلاثة من الداخل (مركزها مركز الدائرة الداخلية).', 'The circumscribed circle goes through the three vertices (centre: circumcentre); the inscribed one touches the three sides inside (centre: incentre).')
            }
        ],
        explanation: say(
            'Zirkunzentroa hiru erpinetatik distantzia berera dago, eta inzentroa, hiru aldeetatik. Zirkunzentroaren tokiak triangelu mota salatzen du, marrazkian bezala: zorrotzean barruan dago; zuzenean, hipotenusaren erdiko puntuan; kamutsean, kanpoan.',
            'El circuncentro está a la misma distancia de los tres vértices, y el incentro, de los tres lados. La posición del circuncentro delata el tipo de triángulo, como en el dibujo: en el acutángulo está dentro; en el rectángulo, en el punto medio de la hipotenusa; en el obtusángulo, fuera.',
            'يبعد مركز الدائرة المحيطة المسافة نفسها عن الرؤوس الثلاثة، ومركز الدائرة الداخلية عن الأضلاع الثلاثة. وموقع مركز الدائرة المحيطة يكشف نوع المثلث، كما في الرسم: في الحاد يقع داخله؛ وفي القائم في منتصف الوتر؛ وفي المنفرج خارجه.',
            'The circumcentre is the same distance from the three vertices, and the incentre from the three sides. Where the circumcentre lies gives away the kind of triangle, as in the drawing: in an acute-angled one it is inside; in a right-angled one, at the midpoint of the hypotenuse; in an obtuse-angled one, outside.'
        ),
        examplePrompt: say('Triangelu zuzen batek 10 cm-ko hipotenusa du. Non dago zirkunzentroa, eta zenbat neurtzen du zirkunskribatuaren erradioak?', 'Un triángulo rectángulo tiene una hipotenusa de 10 cm. ¿Dónde está el circuncentro y cuánto mide el radio de la circunscrita?', 'مثلث قائم وتره 10 سم. أين يقع مركز الدائرة المحيطة؟ وكم نصف قطرها؟', 'A right-angled triangle has a 10 cm hypotenuse. Where is the circumcentre and how long is the radius of the circumscribed circle?'),
        example: same('$r=10\\mathbin{:}2=5\\ \\mathrm{cm}$'),
        exampleAnswer: say('Zirkunzentroa hipotenusaren erdiko puntua da, eta erradioa haren erdia.', 'El circuncentro es el punto medio de la hipotenusa, y el radio es la mitad de ella.', 'مركز الدائرة المحيطة هو منتصف الوتر، ونصف قطرها نصف الوتر.', 'The circumcentre is the midpoint of the hypotenuse, and the radius is half of it.')
    },

    /* ---------- 3. Quadrilaterals ---------- */
    'quad-diagonals': {
        vocabulary: [
            say('erdiko puntua', 'punto medio', 'المنتصف', 'midpoint'),
            say('perpendikularrak', 'perpendiculares', 'متعامدان', 'perpendicular'),
            say('paralelogramoak', 'paralelogramos', 'متوازيات الأضلاع', 'parallelograms')
        ],
        explanation: say(
            'Paralelogramo guztietan diagonalak erdiko puntuan ebakitzen dira. Gainera, laukizuzenean berdinak dira; erronboan, perpendikularrak; eta karratuan, berdinak eta perpendikularrak, marrazkian bezala. Joko bat: gurutzatu bi makila erditik eta lotu muturrak.',
            'En todos los paralelogramos las diagonales se cortan en su punto medio. Además, en el rectángulo son iguales; en el rombo, perpendiculares; y en el cuadrado, iguales y perpendiculares, como en el dibujo. Un juego: cruza dos palos por su mitad y une los extremos.',
            'في كل متوازيات الأضلاع يتقاطع القطران في منتصفيهما. وفي المستطيل هما متساويان؛ وفي المعين متعامدان؛ وفي المربع متساويان ومتعامدان، كما في الرسم. لعبة: صالِب عصوين من منتصفيهما وصِل أطرافهما.',
            'In every parallelogram the diagonals cross at their midpoints. Also, in a rectangle they are equal; in a rhombus, perpendicular; and in a square, equal and perpendicular, as in the drawing. A game: cross two sticks at their middles and join the ends.'
        ),
        examplePrompt: say('Lauki baten diagonalak erdiko puntuan ebakitzen dira eta perpendikularrak dira, baina ez berdinak. Zer lauki da?', 'Las diagonales de un cuadrilátero se cortan en su punto medio y son perpendiculares, pero no iguales. ¿Qué cuadrilátero es?', 'قطرا رباعي يتقاطعان في منتصفيهما ومتعامدان لكنهما غير متساويين. ما هذا الرباعي؟', 'The diagonals of a quadrilateral cross at their midpoints and are perpendicular, but not equal. Which quadrilateral is it?'),
        example: '',
        exampleAnswer: say('Erronbo bat: erdiko puntua, paralelogramoa; perpendikularrak, erronboa; berdinak ere balira, karratua.', 'Un rombo: punto medio, paralelogramo; perpendiculares, rombo; si además fueran iguales, cuadrado.', 'معين: المنتصف يعني متوازي أضلاع، والتعامد يعني معينًا؛ ولو تساويا أيضًا لكان مربعًا.', 'A rhombus: midpoint, parallelogram; perpendicular, rhombus; if they were also equal, a square.')
    },
    'quad-angles': {
        vocabulary: [
            say('aurkakoak', 'opuestos', 'المتقابلتان', 'opposite'),
            say('ondokoak', 'consecutivos', 'المتتاليتان', 'consecutive'),
            say('betegarriak', 'suplementarios', 'متكاملتان', 'supplementary')
        ],
        explanation: say(
            'Edozein laukiren angeluek $360^{\\circ}$ batzen dituzte. Paralelogramoetan, aurkako angeluak berdinak dira, eta ondokoek $180^{\\circ}$ batzen dituzte, alde paraleloen artean daudelako. Trapezioetan, alde ez-paralelo bereko bi angeluek ere $180^{\\circ}$ batzen dituzte.',
            'En cualquier cuadrilátero los ángulos suman $360^{\\circ}$. En los paralelogramos, los ángulos opuestos son iguales y los consecutivos suman $180^{\\circ}$, porque están entre lados paralelos. En los trapecios, los dos ángulos de un mismo lado no paralelo también suman $180^{\\circ}$.',
            'في أي رباعي مجموع الزوايا $360^{\\circ}$. وفي متوازيات الأضلاع تتساوى الزاويتان المتقابلتان، ومجموع المتتاليتين $180^{\\circ}$ لأنهما بين ضلعين متوازيين. وفي شبه المنحرف مجموع زاويتي الضلع غير الموازي نفسه $180^{\\circ}$ أيضًا.',
            'In any quadrilateral the angles add up to $360^{\\circ}$. In parallelograms, opposite angles are equal and consecutive ones add up to $180^{\\circ}$, because they lie between parallel sides. In trapeziums, the two angles on the same non-parallel side also add up to $180^{\\circ}$.'
        ),
        examplePrompt: say('Erronbo baten angelu batek $118^{\\circ}$ neurtzen du. Zenbat neurtzen dute beste hirurek?', 'Un ángulo de un rombo mide $118^{\\circ}$. ¿Cuánto miden los otros tres?', 'زاوية في معين قياسها $118^{\\circ}$. كم قياس الزوايا الثلاث الأخرى؟', 'One angle of a rhombus is $118^{\\circ}$. What are the other three?'),
        example: same('$\\begin{gathered}180^{\\circ}-118^{\\circ}=62^{\\circ}\\\\118^{\\circ}+62^{\\circ}+118^{\\circ}+62^{\\circ}\\\\=360^{\\circ}\\end{gathered}$'),
        exampleAnswer: say('Aurkakoak $118^{\\circ}$; beste biek $62^{\\circ}$ bana.', 'El opuesto, $118^{\\circ}$; los otros dos, $62^{\\circ}$ cada uno.', 'المقابلة $118^{\\circ}$، والأخريان $62^{\\circ}$ لكل منهما.', 'The opposite one, $118^{\\circ}$; the other two, $62^{\\circ}$ each.')
    },
    symmetry: {
        vocabulary: [
            say('tolestu', 'doblar', 'طوي', 'fold'),
            say('ispilua', 'espejo', 'المرآة', 'mirror'),
            say('bat etorri', 'coincidir', 'ينطبق', 'match')
        ],
        definitions: [
            {
                term: say('Simetria-ardatza', 'Eje de simetría', 'محور التناظر', 'Line of symmetry'),
                meaning: say('Irudia bi zati berdinetan banatzen duen zuzena, ispilu bat bezala: hartatik tolestuta, bi zatiak bat etortzen dira.', 'Una recta que divide la figura en dos partes iguales, como un espejo: si se dobla por ella, las dos partes coinciden.', 'مستقيم يقسم الشكل إلى جزأين متطابقين كالمرآة: إذا طويناه عليه ينطبق الجزآن.', 'A line that splits the shape into two equal parts, like a mirror: if you fold along it, the two parts match.')
            }
        ],
        explanation: say(
            'Karratuak 4 ardatz ditu; laukizuzenak eta erronboak, 2; trapezio isoszeleak eta kometak, 1; erronboideak, bat ere ez. $n$ aldeko poligono erregular batek $n$ ardatz ditu, eta zirkuluak infinitu: zentrotik pasatzen den edozein zuzen.',
            'El cuadrado tiene 4 ejes; el rectángulo y el rombo, 2; el trapecio isósceles y la cometa, 1; el romboide, ninguno. Un polígono regular de $n$ lados tiene $n$ ejes, y el círculo, infinitos: cualquier recta que pase por el centro.',
            'للمربع 4 محاور؛ وللمستطيل والمعين محوران؛ ولشبه المنحرف المتساوي الساقين والطائرة الورقية محور واحد؛ ولا محور لمتوازي الأضلاع. وللمضلع المنتظم ذي $n$ أضلاع $n$ محاور، وللقرص عدد لا نهائي: كل مستقيم يمر بالمركز.',
            'A square has 4 lines of symmetry; a rectangle and a rhombus, 2; an isosceles trapezium and a kite, 1; a parallelogram, none. A regular polygon with $n$ sides has $n$ lines, and a circle infinitely many: any line through the centre.'
        ),
        examplePrompt: say('Zenbat simetria-ardatz ditu hexagono erregular batek? Eta triangelu isoszele batek?', '¿Cuántos ejes de simetría tiene un hexágono regular? ¿Y un triángulo isósceles?', 'كم محور تناظر للمسدس المنتظم؟ وللمثلث المتساوي الساقين؟', 'How many lines of symmetry does a regular hexagon have? And an isosceles triangle?'),
        example: same('$\\frac{180^{\\circ}}{6}=30^{\\circ}$'),
        exampleAnswer: say('Hexagono erregularrak 6 ardatz ditu, $30^{\\circ}$-ko tartearekin; triangelu isoszeleak, 1.', 'El hexágono regular tiene 6 ejes, separados $30^{\\circ}$; el triángulo isósceles, 1.', 'للمسدس المنتظم 6 محاور تفصل بينها $30^{\\circ}$؛ وللمثلث المتساوي الساقين محور واحد.', 'The regular hexagon has 6 lines, $30^{\\circ}$ apart; the isosceles triangle, 1.')
    },

    /* ---------- 4. Circles ---------- */
    'line-circle': {
        vocabulary: [
            say('distantzia', 'distancia', 'المسافة', 'distance'),
            say('erradioa', 'radio', 'نصف القطر', 'radius'),
            say('ukitu', 'tocar', 'يمس', 'touch')
        ],
        explanation: say(
            'Konparatu zentrotik zuzenera dagoen $d$ distantzia $r$ erradioarekin, marrazkian bezala:',
            'Compara la distancia $d$ del centro a la recta con el radio $r$, como en el dibujo:',
            'قارن المسافة $d$ بين المركز والمستقيم بنصف القطر $r$، كما في الرسم:',
            'Compare the distance $d$ from the centre to the line with the radius $r$, as in the drawing:'
        ),
        cases: [
            { title: say('Ebakitzailea', 'Secante', 'قاطع', 'Secant'), text: say('Zirkunferentzia bi puntutan ebakitzen du.', 'Corta la circunferencia en dos puntos.', 'يقطع الدائرة في نقطتين.', 'It cuts the circle at two points.'), math: same('$d<r$') },
            { title: say('Ukitzailea', 'Tangente', 'مماس', 'Tangent'), text: say('Puntu batean ukitzen du, erradioarekiko perpendikularra.', 'La toca en un punto y es perpendicular al radio.', 'يمسها في نقطة واحدة ويعامد نصف القطر.', 'It touches at one point, at right angles to the radius.'), math: same('$d=r$') },
            { title: say('Kanpokoa', 'Exterior', 'خارجي', 'Outside'), text: say('Ez du ukitzen.', 'No la toca.', 'لا يمسها.', 'It does not touch it.'), math: same('$d>r$') }
        ],
        examplePrompt: say('Zirkunferentzia batek 6 cm-ko erradioa du. Nolakoa da zentrotik 4 cm-ra dagoen zuzen bat? Eta 9 cm-ra dagoena?', 'Una circunferencia tiene 6 cm de radio. ¿Cómo es una recta a 4 cm del centro? ¿Y a 9 cm?', 'نصف قطر دائرة 6 سم. ما وضع مستقيم على بعد 4 سم من المركز؟ وعلى بعد 9 سم؟', 'A circle has a 6 cm radius. What is a line 4 cm from the centre? And 9 cm away?'),
        example: same('$4<6\\qquad 9>6$'),
        exampleAnswer: say('4 cm-ra, ebakitzailea; 9 cm-ra, kanpokoa.', 'A 4 cm, secante; a 9 cm, exterior.', 'على بعد 4 سم قاطع؛ وعلى بعد 9 سم خارجي.', '4 cm away, secant; 9 cm away, outside.')
    },
    'two-circles': {
        vocabulary: [
            say('zentroak', 'centros', 'المركزان', 'centres'),
            say('erradioak', 'radios', 'نصفا القطرين', 'radii'),
            say('ukitzaileak', 'tangentes', 'متماستان', 'touching')
        ],
        explanation: say(
            'Deitu $r_1$ erradio handiari, $r_2$ txikiari eta $d$ zentroen arteko distantziari, eta konparatu $d$ erradioen baturarekin eta kendurarekin:',
            'Llama $r_1$ al radio mayor, $r_2$ al menor y $d$ a la distancia entre los centros, y compara $d$ con la suma y la resta de los radios:',
            'سمِّ نصف القطر الأكبر $r_1$ والأصغر $r_2$ والمسافة بين المركزين $d$، وقارن $d$ بمجموع نصفي القطرين وبالفرق بينهما:',
            'Call the bigger radius $r_1$, the smaller $r_2$ and the distance between the centres $d$, and compare $d$ with the sum and the difference of the radii:'
        ),
        cases: [
            { title: say('Kanpokoak', 'Exteriores', 'متباعدتان', 'Apart'), text: say('Ez dira ukitzen.', 'No se tocan.', 'لا تتماسان.', 'They do not touch.'), math: same('$d>r_1+r_2$') },
            { title: say('Ukitzaileak', 'Tangentes', 'متماستان', 'Touching'), text: say('Puntu batean ukitzen dira, kanpotik edo barrutik.', 'Se tocan en un punto, por fuera o por dentro.', 'تتماسان في نقطة، من الخارج أو من الداخل.', 'They touch at one point, outside or inside.'), math: same('$d=r_1+r_2\\qquad d=r_1-r_2$') },
            { title: say('Ebakitzaileak', 'Secantes', 'متقاطعتان', 'Crossing'), text: say('Bi puntutan ebakitzen dira.', 'Se cortan en dos puntos.', 'تتقاطعان في نقطتين.', 'They cross at two points.'), math: same('$r_1-r_2<d<r_1+r_2$') },
            { title: say('Barrukoak', 'Interiores', 'متداخلتان', 'One inside'), text: say('Txikia handiaren barruan dago, ukitu gabe.', 'La pequeña está dentro de la grande, sin tocarla.', 'الصغرى داخل الكبرى دون أن تمسها.', 'The small one is inside the big one, not touching.'), math: same('$d<r_1-r_2$') }
        ],
        examplePrompt: say('Bi zirkunferentziak 9 cm eta 5 cm-ko erradioak dituzte. Nolakoak dira zentroak 14 cm-ra badaude? Eta 2 cm-ra?', 'Dos circunferencias tienen radios de 9 cm y 5 cm. ¿Cómo son si sus centros están a 14 cm? ¿Y a 2 cm?', 'دائرتان نصفا قطريهما 9 سم و5 سم. ما وضعهما إذا كان المركزان على بعد 14 سم؟ وعلى بعد 2 سم؟', 'Two circles have radii of 9 cm and 5 cm. What are they if their centres are 14 cm apart? And 2 cm apart?'),
        example: same('$\\begin{gathered}9+5=14\\\\9-5=4>2\\end{gathered}$'),
        exampleAnswer: say('14 cm-ra, kanpo-ukitzaileak; 2 cm-ra, barrukoak.', 'A 14 cm, tangentes exteriores; a 2 cm, interiores.', 'على بعد 14 سم متماستان من الخارج؛ وعلى بعد 2 سم متداخلتان.', '14 cm apart, touching outside; 2 cm apart, one inside the other.')
    },
    'circle-angles': {
        vocabulary: [
            say('sektorea', 'sector', 'القطاع', 'sector'),
            say('segmentua', 'segmento', 'القطعة الدائرية', 'segment'),
            say('koroa', 'corona', 'الحلقة', 'ring')
        ],
        definitions: [
            {
                term: say('Angelu zentrala eta inskribatua', 'Ángulo central e inscrito', 'الزاوية المركزية والمحيطية', 'Central and inscribed angle'),
                meaning: say('Zentralak erpina zentroan du; inskribatuak, zirkunferentzian, eta haren aldeak kordak dira.', 'El central tiene el vértice en el centro; el inscrito, en la circunferencia, y sus lados son cuerdas.', 'رأس المركزية في المركز؛ ورأس المحيطية على الدائرة وضلعاها وتران.', 'The central angle has its vertex at the centre; the inscribed one, on the circle, and its sides are chords.')
            }
        ],
        explanation: say(
            'Arku bera hartzen badute, inskribatuak zentralaren erdia neurtzen du. Horregatik, diametro baten gaineko angelu inskribatu oro zuzena da. Marrazkiko zirkuluaren zatiak: sektorea (bi erradio eta arku bat), segmentua (korda bat eta arku bat) eta koroa (zentro bereko bi zirkunferentzien artean).',
            'Si abarcan el mismo arco, el inscrito mide la mitad que el central. Por eso todo ángulo inscrito sobre un diámetro es recto. Las partes del círculo del dibujo: sector (dos radios y un arco), segmento (una cuerda y un arco) y corona (entre dos circunferencias con el mismo centro).',
            'إذا قابلتا القوس نفسه فالمحيطية نصف المركزية. لذلك كل زاوية محيطية تقابل قطرًا قائمة. وأجزاء القرص في الرسم: القطاع (نصفا قطر وقوس)، والقطعة الدائرية (وتر وقوس)، والحلقة (بين دائرتين لهما المركز نفسه).',
            'If they stand on the same arc, the inscribed angle is half the central one. That is why every inscribed angle on a diameter is a right angle. The parts of the circle in the drawing: sector (two radii and an arc), segment (a chord and an arc) and ring (between two circles with the same centre).'
        ),
        examplePrompt: say('Angelu zentral batek $130^{\\circ}$ neurtzen du. Zenbat neurtzen du arku bera hartzen duen inskribatu batek?', 'Un ángulo central mide $130^{\\circ}$. ¿Cuánto mide un inscrito que abarca el mismo arco?', 'زاوية مركزية قياسها $130^{\\circ}$. كم قياس زاوية محيطية تقابل القوس نفسه؟', 'A central angle is $130^{\\circ}$. What is an inscribed angle on the same arc?'),
        example: same('$130^{\\circ}\\mathbin{:}2=65^{\\circ}$'),
        exampleAnswer: say('Inskribatuak $65^{\\circ}$ neurtzen ditu, erdia.', 'El inscrito mide $65^{\\circ}$, la mitad.', 'المحيطية $65^{\\circ}$، أي النصف.', 'The inscribed angle is $65^{\\circ}$, half.')
    },

    /* ---------- 5. Areas ---------- */
    composite: {
        vocabulary: [
            say('piezak', 'piezas', 'القطع', 'pieces'),
            say('ondorioztatu', 'deducir', 'استنتج', 'work out'),
            say('unitate karratuak', 'unidades cuadradas', 'الوحدات المربعة', 'square units')
        ],
        explanation: say(
            'Irudi konposatu baten azalerarako bi bide daude. Neurri batzuk beste aldeetatik ondorioztatu behar dira, eta emaitza beti doa unitate karratutan:',
            'Para el área de una figura compuesta hay dos caminos. Algunas medidas hay que deducirlas de otros lados, y el resultado siempre va en unidades cuadradas:',
            'لمساحة شكل مركّب طريقان. ويجب استنتاج بعض الأبعاد من أضلاع أخرى، والنتيجة دائمًا بالوحدات المربعة:',
            'For the area of a composite shape there are two ways. Some measurements have to be worked out from other sides, and the result is always in square units:'
        ),
        cases: [
            { title: say('Batu', 'Sumar', 'الجمع', 'Add'), text: say('Zatitu irudia formula ezaguneko piezatan, eta batu haien azalerak.', 'Divide la figura en piezas de fórmula conocida y suma sus áreas.', 'قسّم الشكل إلى قطع معروفة الصيغة واجمع مساحاتها.', 'Split the shape into pieces with known formulas and add their areas.'), math: same('$A=A_{1}+A_{2}$') },
            { title: say('Kendu', 'Restar', 'الطرح', 'Subtract'), text: say('Osatu irudi handiago bat, eta kendu soberan dagoena.', 'Completa una figura mayor y quita lo que sobra.', 'أكمل شكلًا أكبر واطرح الزائد.', 'Complete a bigger shape and take away what is left over.'), math: same('$A=A_{1}-A_{2}$') }
        ],
        examplePrompt: say('Etxetxo bat: 8 cm-ko aldeko karratu bat, gainean 8 cm-ko oinarria eta 3 cm-ko altuera dituen triangelu batekin. Zein da haren azalera?', 'Una casita: un cuadrado de 8 cm de lado con un triángulo encima de 8 cm de base y 3 cm de altura. ¿Cuál es su área?', 'بيت صغير: مربع طول ضلعه 8 سم وفوقه مثلث قاعدته 8 سم وارتفاعه 3 سم. ما مساحته؟', 'A little house: a square with 8 cm sides with a triangle on top, base 8 cm and height 3 cm. What is its area?'),
        example: same('$\\begin{aligned}A&=8^{2}+\\frac{8\\cdot 3}{2}\\\\&=64+12=76\\ \\mathrm{cm}^{2}\\end{aligned}$'),
        exampleAnswer: say('Bi piezak batzen dira: 76 cm².', 'Se suman las dos piezas: 76 cm².', 'نجمع القطعتين: 76 سم².', 'Add the two pieces: 76 cm².')
    },
    'sector-ring': {
        vocabulary: [
            say('sektorea', 'sector', 'القطاع', 'sector'),
            say('koroa', 'corona', 'الحلقة', 'ring'),
            say('laurdena', 'cuarto', 'الربع', 'quarter')
        ],
        definitions: [
            {
                term: say('Arkua', 'Arco', 'القوس', 'Arc'),
                meaning: say('Sektorearen zirkunferentzia-zatia: $2\\pi r$ luzeratik, angeluak $360^{\\circ}$-tik duen zati bera da.', 'El trozo de circunferencia del sector: mide la misma parte de $2\\pi r$ que su ángulo de $360^{\\circ}$.', 'جزء الدائرة في القطاع: يساوي من $2\\pi r$ الجزء نفسه الذي تمثله زاويته من $360^{\\circ}$.', 'The piece of circumference of the sector: it is the same part of $2\\pi r$ as its angle is of $360^{\\circ}$.')
            }
        ],
        explanation: say(
            'Sektore bat zirkuluaren zati bera da, haren angelua $360^{\\circ}$-tik den bezala: marrazkiko $90^{\\circ}$-koa laurdena da, $A=\\frac{\\pi r^{2}\\cdot\\alpha}{360}$. Koroa zirkulu handia ken txikia da: $A=\\pi\\cdot(R^{2}-r^{2})$. Lehenik karratuak, gero kenketa.',
            'Un sector es la misma parte del círculo que su ángulo de $360^{\\circ}$: el de $90^{\\circ}$ del dibujo es un cuarto, $A=\\frac{\\pi r^{2}\\cdot\\alpha}{360}$. La corona es el círculo grande menos el pequeño: $A=\\pi\\cdot(R^{2}-r^{2})$. Primero los cuadrados y luego la resta.',
            'القطاع جزء من القرص يساوي ما تمثله زاويته من $360^{\\circ}$: قطاع $90^{\\circ}$ في الرسم ربع، $A=\\frac{\\pi r^{2}\\cdot\\alpha}{360}$. والحلقة هي القرص الكبير ناقص الصغير: $A=\\pi\\cdot(R^{2}-r^{2})$. المربعات أولًا ثم الطرح.',
            'A sector is the same part of the circle as its angle is of $360^{\\circ}$: the $90^{\\circ}$ one in the drawing is a quarter, $A=\\frac{\\pi r^{2}\\cdot\\alpha}{360}$. A ring is the big circle minus the small one: $A=\\pi\\cdot(R^{2}-r^{2})$. Squares first, then the subtraction.'
        ),
        examplePrompt: say('Kalkulatu 6 cm eta 4 cm-ko erradioak dituzten zirkunferentzien arteko koroaren azalera.', 'Calcula el área de una corona entre circunferencias de 6 cm y 4 cm de radio.', 'احسب مساحة حلقة بين دائرتين نصفا قطريهما 6 سم و4 سم.', 'Work out the area of a ring between circles with radii 6 cm and 4 cm.'),
        example: same('$\\begin{aligned}A&=3{,}14\\cdot(6^{2}-4^{2})\\\\&=3{,}14\\cdot 20=62{,}8\\ \\mathrm{cm}^{2}\\end{aligned}$'),
        exampleAnswer: say('Koroak 62,8 cm² ditu.', 'La corona mide 62,8 cm².', 'مساحة الحلقة 62.8 سم².', 'The ring measures 62.8 cm².')
    },
    'area-problems': {
        vocabulary: [
            say('inguratu', 'rodear', 'الإحاطة', 'go round'),
            say('estali', 'cubrir', 'التغطية', 'cover'),
            say('lauzak', 'baldosas', 'البلاطات', 'tiles')
        ],
        explanation: say(
            'Buruketa baten aurrean, galdetu: inguratu ala estali behar da? Hesi, zinta edo zokalo baterako, perimetroa. Lauzatu, landatu edo margotzeko, azalera. Zenbat lauza behar diren jakiteko, zatitu lurraren azalera lauza batenarekin, unitate berean.',
            'Ante un problema, pregúntate: ¿hay que rodear o cubrir? Para una valla, una cinta o un rodapié, el perímetro. Para embaldosar, sembrar o pintar, el área. Para saber cuántas baldosas, divide el área del suelo entre la de una baldosa, en la misma unidad.',
            'أمام المسألة اسأل نفسك: هل علينا الإحاطة أم التغطية؟ للسياج أو الشريط أو الإفريز: المحيط. وللتبليط أو الزراعة أو الطلاء: المساحة. ولمعرفة عدد البلاطات اقسم مساحة الأرض على مساحة بلاطة، بالوحدة نفسها.',
            'Faced with a problem, ask yourself: do we have to go round or cover? For a fence, a ribbon or a skirting board, the perimeter. To tile, plant or paint, the area. To know how many tiles, divide the area of the floor by that of one tile, in the same unit.'
        ),
        examplePrompt: say('Lorategi angeluzuzen batek 12 m × 8 m neurtzen ditu. Zenbat metro hesi behar dira? Eta zenbat belar?', 'Un jardín rectangular mide 12 m × 8 m. ¿Cuántos metros de valla hacen falta? ¿Y cuánto césped?', 'حديقة مستطيلة أبعادها 12 م × 8 م. كم مترًا من السياج نحتاج؟ وكم من العشب؟', 'A rectangular garden is 12 m × 8 m. How many metres of fence are needed? And how much grass?'),
        example: same('$\\begin{gathered}P=2\\cdot 12+2\\cdot 8=40\\ \\mathrm{m}\\\\A=12\\cdot 8=96\\ \\mathrm{m}^{2}\\end{gathered}$'),
        exampleAnswer: say('40 m hesi (inguratu) eta 96 m² belar (estali).', '40 m de valla (rodear) y 96 m² de césped (cubrir).', '40 م من السياج (إحاطة) و96 م² من العشب (تغطية).', '40 m of fence (going round) and 96 m² of grass (covering).')
    }
}

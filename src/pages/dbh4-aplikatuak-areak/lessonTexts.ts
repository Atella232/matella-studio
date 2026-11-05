import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { AreasVolumesTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Perimetroak, azalerak eta bolumenak · 4. DBH aplikatuak — what each
   lesson tells: the new words (definitions), a short explanation, its
   cases (the formulas, one card each) and the example as an exercise
   («Another example»), with the key words in four languages and, in three
   lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics. The cases keep what the drawings
   show (the pentagon and the hexagon, 49 < 25 + 36, r = 3, the triangle of
   13 and 10, the ladder of 6,5 m, the sector of r = 10, the cylinder of
   785, the pyramid of 400…). π ≈ 3,14 in every sum, as in the lessons;
   the units go outside the formulas (cm², سم²).
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const areasVolumesLessonTexts: Record<AreasVolumesTopicId, LessonTexts> = {
    /* ---------- 1. Polygons ---------- */
    angles: {
        definitions: [
            {
                term: say('Diagonala', 'Diagonal', 'القطر', 'Diagonal'),
                meaning: say('Ondoz ondokoak ez diren bi erpin lotzen dituen zuzenkia.', 'Segmento que une dos vértices no consecutivos.', 'قطعة تصل بين رأسين غير متتاليين.', 'A segment joining two vertices that are not next to each other.')
            },
            {
                term: say('Poligono erregularra', 'Polígono regular', 'المضلع المنتظم', 'Regular polygon'),
                meaning: say('Alde guztiak eta angelu guztiak berdinak dituena.', 'El que tiene todos los lados iguales y todos los ángulos iguales.', 'المضلع الذي كل أضلاعه متساوية وكل زواياه متساوية.', 'One with all its sides equal and all its angles equal.')
            }
        ],
        vocabulary: [
            say('erpina', 'vértice', 'رأس', 'vertex'),
            say('triangelua', 'triángulo', 'مثلث', 'triangle'),
            say('aldea', 'lado', 'ضلع', 'side')
        ],
        explanation: say(
            'Erpin batetik, diagonalek $n$ aldeko poligonoa $n-2$ triangelutan banatzen dute, eta triangelu bakoitzaren angeluek $180°$ batzen dute. Horregatik barneko angeluek $180°\\cdot(n-2)$ batzen dute: pentagonoak $3\\cdot 180°=540°$; hexagonoak $720°$. Erregularrean, angelu bakoitza batura zati $n$ da.',
            'Desde un vértice, las diagonales dividen un polígono de $n$ lados en $n-2$ triángulos, y los ángulos de cada uno suman $180°$. Por eso los ángulos interiores suman $180°\\cdot(n-2)$: el pentágono, $3\\cdot 180°=540°$; el hexágono, $720°$. En un regular, cada ángulo es la suma entre $n$.',
            'من رأس واحد تقسم الأقطار المضلع ذا $n$ ضلعًا إلى $n-2$ مثلثًا، ومجموع زوايا كل مثلث $180°$. لذلك مجموع الزوايا الداخلية $180°\\cdot(n-2)$: المخمس $3\\cdot 180°=540°$، والمسدس $720°$. وفي المنتظم كل زاوية هي المجموع على $n$.',
            'From one vertex, the diagonals split a polygon with $n$ sides into $n-2$ triangles, and the angles of each one add up to $180°$. That is why the interior angles add up to $180°\\cdot(n-2)$: the pentagon, $3\\cdot 180°=540°$; the hexagon, $720°$. In a regular one, each angle is the sum divided by $n$.'
        ),
        examplePrompt: say('Zenbat neurtzen du oktogono erregular baten angelu bakoitzak?', '¿Cuánto mide cada ángulo de un octógono regular?', 'كم تقيس كل زاوية في مثمن منتظم؟', 'How big is each angle of a regular octagon?'),
        example: same('$\\begin{gathered}180\\cdot(8-2)=1080\\\\ 1080\\div 8=135\\end{gathered}$'),
        exampleAnswer: say('$1080°$ batzen dute, eta bakoitzak $135°$ neurtzen du.', 'Suman $1080°$ y cada uno mide $135°$.', 'مجموعها $1080°$ وكل زاوية $135°$.', 'They add up to $1080°$ and each one is $135°$.')
    },
    triangles: {
        definitions: [
            {
                term: say('Triangelu isoszelea', 'Triángulo isósceles', 'المثلث متساوي الساقين', 'Isosceles triangle'),
                meaning: say('Bi alde berdin dituena. Hiruak berdinak badira, aldeberdina da; denak desberdinak badira, eskalenoa.', 'El que tiene dos lados iguales. Si los tres son iguales, es equilátero, y si son todos distintos, escaleno.', 'ما له ضلعان متساويان. وإذا تساوت الثلاثة فهو متساوي الأضلاع، وإذا اختلفت كلها فهو مختلف الأضلاع.', 'One with two equal sides. If all three are equal it is equilateral, and if they are all different, scalene.')
            }
        ],
        vocabulary: [
            say('angeluzuzena', 'rectángulo', 'قائم الزاوية', 'right-angled'),
            say('kamutsa', 'obtusángulo', 'منفرج الزاوية', 'obtuse'),
            say('zorrotza', 'acutángulo', 'حاد الزوايا', 'acute')
        ],
        explanation: say(
            'Hiru aldeak bakarrik ezagutzen baditugu, alde handienaren karratua beste bien karratuen baturarekin konparatzen da. Gainera, triangelua egon dadin, alde bakoitzak beste bien batura baino txikiagoa izan behar du.',
            'Si solo conocemos los tres lados, se compara el cuadrado del lado mayor con la suma de los cuadrados de los otros dos. Además, para que el triángulo exista, cada lado tiene que ser menor que la suma de los otros dos.',
            'إذا لم نعرف إلا الأضلاع الثلاثة نقارن مربع الضلع الأكبر بمجموع مربعي الضلعين الآخرين. وكي يوجد المثلث يجب أن يكون كل ضلع أصغر من مجموع الضلعين الآخرين.',
            'If we only know the three sides, we compare the square of the longest side with the sum of the squares of the other two. Also, for the triangle to exist, each side has to be shorter than the other two together.'
        ),
        cases: [
            { title: say('Berdina', 'Igual', 'يساوي', 'Equal'), text: say('Angeluzuzena: angelu zuzen bat.', 'Rectángulo: un ángulo recto.', 'قائم الزاوية: زاوية قائمة.', 'Right-angled: one right angle.'), math: same('$100=36+64$') },
            { title: say('Handiagoa', 'Mayor', 'أكبر', 'Greater'), text: say('Kamutsa: angelu kamuts bat.', 'Obtusángulo: un ángulo obtuso.', 'منفرج الزاوية: زاوية منفرجة.', 'Obtuse: one obtuse angle.'), math: same('$64>16+25$') },
            { title: say('Txikiagoa', 'Menor', 'أصغر', 'Less'), text: say('Zorrotza: hiru angelu zorrotz.', 'Acutángulo: tres ángulos agudos.', 'حاد الزوايا: ثلاث زوايا حادة.', 'Acute: three acute angles.'), math: same('$49<25+36$') }
        ],
        why: {
            text: say(
                'Bi alde laburren arteko angelua zuzena denean, Pitagorasek $a^{2}=b^{2}+c^{2}$ dio. Angelu hori gehiago irekitzen bada, aurrez aurreko aldea luzatu egiten da, eta haren karratuak batura gainditzen du; ixten bada, laburtu egiten da eta azpian geratzen da.',
                'Cuando el ángulo entre los dos lados cortos es recto, Pitágoras dice $a^{2}=b^{2}+c^{2}$. Si ese ángulo se abre más, el lado de enfrente se alarga y su cuadrado pasa de la suma; si se cierra, se acorta y queda por debajo.',
                'عندما تكون الزاوية بين الضلعين القصيرين قائمة يقول فيثاغورس $a^{2}=b^{2}+c^{2}$. وإذا انفرجت أكثر طال الضلع المقابل وتجاوز مربعه المجموع؛ وإذا ضاقت قصر وبقي دونه.',
                'When the angle between the two short sides is a right angle, Pythagoras says $a^{2}=b^{2}+c^{2}$. If that angle opens wider, the opposite side gets longer and its square goes past the sum; if it closes, it gets shorter and stays below.'
            )
        },
        examplePrompt: say('Nolakoa da 5 cm, 12 cm eta 13 cm-ko aldeak dituen triangelua?', '¿Cómo es un triángulo de lados 5 cm, 12 cm y 13 cm?', 'ما نوع مثلث أضلاعه 5 سم و12 سم و13 سم؟', 'What kind of triangle has sides of 5 cm, 12 cm and 13 cm?'),
        example: same('$13^{2}=169=25+144=5^{2}+12^{2}$'),
        exampleAnswer: say('Angeluzuzena, eta eskalenoa.', 'Rectángulo, y escaleno.', 'قائم الزاوية ومختلف الأضلاع.', 'Right-angled, and scalene.')
    },
    perimeters: {
        definitions: [
            {
                term: say('Zirkunferentzia', 'Circunferencia', 'الدائرة', 'Circle'),
                meaning: say('Zentrotik distantzia berera (erradioa) dauden puntuek osatzen duten lerro kurbatu itxia.', 'La línea curva cerrada cuyos puntos están a la misma distancia (el radio) del centro.', 'خط منحنٍ مغلق نقاطه على البعد نفسه (نصف القطر) من المركز.', 'The closed curved line whose points are all the same distance (the radius) from the centre.')
            },
            {
                term: say('Arkua', 'Arco', 'القوس', 'Arc'),
                meaning: say('Zirkunferentziaren zati bat.', 'Un trozo de la circunferencia.', 'جزء من الدائرة.', 'A piece of the circle.')
            }
        ],
        vocabulary: [
            say('erradioa', 'radio', 'نصف القطر', 'radius'),
            say('diametroa', 'diámetro', 'القطر', 'diameter'),
            say('luzera', 'longitud', 'الطول', 'length')
        ],
        explanation: say(
            'Poligono baten perimetroa haren aldeen batura da; erregular batean, $P=n\\cdot l$. Zirkunferentzia guztietan, luzera zati diametroa berdin da, $\\pi\\approx 3{,}14$; horregatik $L=2\\pi r$. $n°$-ko arku batek $\\frac{2\\pi r\\cdot n}{360}$ neurtzen du.',
            'El perímetro de un polígono es la suma de sus lados; en uno regular, $P=n\\cdot l$. En todas las circunferencias, la longitud entre el diámetro da lo mismo, $\\pi\\approx 3{,}14$; por eso $L=2\\pi r$. Un arco de $n°$ mide $\\frac{2\\pi r\\cdot n}{360}$.',
            'محيط المضلع مجموع أضلاعه؛ وفي المنتظم $P=n\\cdot l$. وفي كل الدوائر يكون الطول على القطر هو نفسه $\\pi\\approx 3{,}14$؛ لذلك $L=2\\pi r$. وقوس قياسه $n°$ طوله $\\frac{2\\pi r\\cdot n}{360}$.',
            'The perimeter of a polygon is the sum of its sides; in a regular one, $P=n\\cdot l$. In every circle, the length divided by the diameter gives the same, $\\pi\\approx 3{,}14$; that is why $L=2\\pi r$. An arc of $n°$ measures $\\frac{2\\pi r\\cdot n}{360}$.'
        ),
        cases: [
            { title: say('Zirkunferentzia', 'Circunferencia', 'الدائرة', 'Circle'), text: say('Marrazkikoa, $r=3$ duela.', 'La del dibujo, con $r=3$.', 'دائرة الرسم مع $r=3$.', 'The one in the drawing, with $r=3$.'), math: same('$L=2\\cdot 3{,}14\\cdot 3=18{,}84$') },
            { title: say('$90°$-ko arkua', 'Arco de $90°$', 'قوس $90°$', 'A $90°$ arc'), text: say('Zirkunferentziaren laurdena.', 'La cuarta parte de la circunferencia.', 'ربع الدائرة.', 'A quarter of the circle.'), math: same('$18{,}84\\div 4=4{,}71$') }
        ],
        why: {
            text: say(
                '$\\pi$ zenbakia hau da, hain zuzen ere: edozein zirkunferentziaren luzera zati haren diametroa. Beraz, luzera $\\pi$ bider diametroa da, eta diametroa bi erradio da: $L=\\pi\\cdot 2r$.',
                '$\\pi$ es justo eso: la longitud de cualquier circunferencia entre su diámetro. Así que la longitud es $\\pi$ por el diámetro, y el diámetro son dos radios: $L=\\pi\\cdot 2r$.',
                '$\\pi$ هو بالضبط طول أي دائرة على قطرها. فالطول $\\pi$ في القطر، والقطر نصفا قطر: $L=\\pi\\cdot 2r$.',
                '$\\pi$ is exactly that: the length of any circle divided by its diameter. So the length is $\\pi$ times the diameter, and the diameter is two radii: $L=\\pi\\cdot 2r$.'
            )
        },
        examplePrompt: say('Zenbat neurtzen du 60°-ko arku batek, 9 cm-ko erradioko zirkunferentzian?', '¿Cuánto mide un arco de 60° en una circunferencia de 9 cm de radio?', 'كم طول قوس قياسه 60° في دائرة نصف قطرها 9 سم؟', 'How long is a 60° arc on a circle with a radius of 9 cm?'),
        example: same('$\\frac{2\\cdot 3{,}14\\cdot 9\\cdot 60}{360}=9{,}42$'),
        exampleAnswer: say('$9{,}42$ cm: zirkunferentziaren seirena.', '$9{,}42$ cm: la sexta parte de la circunferencia.', '$9{,}42$ سم: سدس الدائرة.', '$9{,}42$ cm: a sixth of the circle.')
    },
    /* ---------- 2. Pythagoras ---------- */
    'right-triangles': {
        definitions: [
            {
                term: say('Hipotenusa', 'Hipotenusa', 'الوتر', 'Hypotenuse'),
                meaning: say('Triangelu angeluzuzenean, angelu zuzenaren aurkako aldea; luzeena da. Beste biak katetoak dira.', 'En un triángulo rectángulo, el lado opuesto al ángulo recto; es el más largo. Los otros dos son los catetos.', 'في المثلث القائم، الضلع المقابل للزاوية القائمة؛ وهو الأطول. والآخران هما الضلعان القائمان.', 'In a right-angled triangle, the side opposite the right angle; it is the longest. The other two are the legs.')
            }
        ],
        vocabulary: [
            say('katetoa', 'cateto', 'الضلع القائم', 'leg'),
            say('angelu zuzena', 'ángulo recto', 'الزاوية القائمة', 'right angle'),
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root')
        ],
        explanation: say(
            'Pitagorasen teorema: hipotenusaren karratua katetoen karratuen batura da, $a^{2}=b^{2}+c^{2}$. Erroa zehatza ez bada, hurbildu ehunenetara. Egiaztatu hipotenusa katetoak baino luzeagoa ateratzen dela.',
            'El teorema de Pitágoras: el cuadrado de la hipotenusa es la suma de los cuadrados de los catetos, $a^{2}=b^{2}+c^{2}$. Si la raíz no es exacta, aproxima a las centésimas. Comprueba que la hipotenusa sale más larga que los catetos.',
            'مبرهنة فيثاغورس: مربع الوتر مجموع مربعي الضلعين القائمين، $a^{2}=b^{2}+c^{2}$. وإذا لم يكن الجذر تامًّا فقرّب إلى الأجزاء من مئة. وتحقّق أن الوتر أطول من الضلعين القائمين.',
            'Pythagoras’ theorem: the square of the hypotenuse is the sum of the squares of the legs, $a^{2}=b^{2}+c^{2}$. If the root is not exact, round to two decimal places. Check that the hypotenuse comes out longer than the legs.'
        ),
        cases: [
            { title: say('Hipotenusa', 'Hipotenusa', 'الوتر', 'Hypotenuse'), text: say('Batu katetoen karratuak eta atera erro karratua.', 'Suma los cuadrados de los catetos y saca la raíz cuadrada.', 'اجمع مربعي الضلعين القائمين وخذ الجذر التربيعي.', 'Add the squares of the legs and take the square root.'), math: same('$a=\\sqrt{b^{2}+c^{2}}$') },
            { title: say('Katetoa', 'Cateto', 'ضلع قائم', 'A leg'), text: say('Hipotenusaren karratuari kendu beste katetoaren karratua.', 'Al cuadrado de la hipotenusa réstale el del otro cateto.', 'اطرح مربع الضلع القائم الآخر من مربع الوتر.', 'From the square of the hypotenuse, subtract the square of the other leg.'), math: same('$c=\\sqrt{a^{2}-b^{2}}$') }
        ],
        examplePrompt: say('Triangelu angeluzuzen baten katetoek 9 cm eta 12 cm neurtzen dute. Kalkulatu hipotenusa.', 'Los catetos de un triángulo rectángulo miden 9 cm y 12 cm. Calcula la hipotenusa.', 'الضلعان القائمان في مثلث قائم 9 سم و12 سم. احسب الوتر.', 'The legs of a right-angled triangle are 9 cm and 12 cm. Calculate the hypotenuse.'),
        example: same('$a=\\sqrt{9^{2}+12^{2}}=\\sqrt{225}=15$'),
        exampleAnswer: say('15 cm, kateto bakoitza baino gehiago.', '15 cm, más que cada cateto.', '15 سم، أكثر من كل ضلع قائم.', '15 cm, more than each leg.')
    },
    heights: {
        definitions: [
            {
                term: say('Apotema', 'Apotema', 'العامد', 'Apothem'),
                meaning: say('Poligono erregular batean, zentrotik alde baten erdiko puntura doan zuzenkia.', 'En un polígono regular, el segmento que va del centro al punto medio de un lado.', 'في المضلع المنتظم، القطعة من المركز إلى منتصف أحد الأضلاع.', 'In a regular polygon, the segment from the centre to the midpoint of a side.')
            }
        ],
        vocabulary: [
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('erdia', 'mitad', 'نصف', 'half'),
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse')
        ],
        explanation: say(
            'Irudi askotan triangelu angeluzuzen bat ezkutatuta dago. Triangelu isoszele edo aldeberdin batean, altuerak oinarria bi erditan banatzen du: alde berdina hipotenusa da, eta katetoak, altuera eta oinarriaren erdia.',
            'En muchas figuras hay un triángulo rectángulo escondido. En un triángulo isósceles o equilátero, la altura parte la base en dos mitades: el lado igual es la hipotenusa, y los catetos, la altura y media base.',
            'في كثير من الأشكال مثلث قائم مخفي. في المثلث متساوي الساقين أو متساوي الأضلاع يقسم الارتفاع القاعدة نصفين: الضلع المتساوي هو الوتر، والضلعان القائمان هما الارتفاع ونصف القاعدة.',
            'Many shapes hide a right-angled triangle. In an isosceles or equilateral triangle, the height splits the base into two halves: the equal side is the hypotenuse, and the legs are the height and half the base.'
        ),
        cases: [
            { title: say('Isoszelea', 'Isósceles', 'متساوي الساقين', 'Isosceles'), text: say('Marrazkikoa: alde berdinak 13 eta oinarria 10.', 'El del dibujo: lados iguales de 13 y base de 10.', 'مثلث الرسم: الضلعان المتساويان 13 والقاعدة 10.', 'The one in the drawing: equal sides of 13 and a base of 10.'), math: same('$h=\\sqrt{13^{2}-5^{2}}=\\sqrt{144}=12$') },
            { title: say('Hexagono erregularra', 'Hexágono regular', 'المسدس المنتظم', 'Regular hexagon'), text: say('Erradioa aldearen berdina da; apotema kateto bat da, eta bestea, aldearen erdia.', 'El radio es igual al lado; la apotema es un cateto, y el otro, medio lado.', 'نصف القطر يساوي الضلع؛ والعامد ضلع قائم، والآخر نصف الضلع.', 'The radius equals the side; the apothem is one leg, and the other is half the side.') },
            { title: say('Erronboa', 'Rombo', 'المعيّن', 'Rhombus'), text: say('Diagonal-erdiak katetoak dira, eta aldea, hipotenusa.', 'Las semidiagonales son los catetos, y el lado, la hipotenusa.', 'نصفا القطرين ضلعان قائمان، والضلع هو الوتر.', 'The half-diagonals are the legs, and the side is the hypotenuse.') }
        ],
        examplePrompt: say('Kalkulatu 6 cm-ko aldeko hexagono erregular baten apotema.', 'Calcula la apotema de un hexágono regular de 6 cm de lado.', 'احسب عامد مسدس منتظم طول ضلعه 6 سم.', 'Calculate the apothem of a regular hexagon with 6 cm sides.'),
        example: same('$a=\\sqrt{6^{2}-3^{2}}=\\sqrt{27}\\approx 5{,}20$'),
        exampleAnswer: say('$5{,}20$ cm: erradioa (6) da hipotenusa.', '$5{,}20$ cm: el radio (6) es la hipotenusa.', '$5{,}20$ سم: نصف القطر (6) هو الوتر.', '$5{,}20$ cm: the radius (6) is the hypotenuse.')
    },
    applications: {
        vocabulary: [
            say('eskema', 'esquema', 'مخطط', 'sketch'),
            say('eskailera', 'escalera', 'سلّم', 'ladder'),
            say('diagonala', 'diagonal', 'القطر', 'diagonal')
        ],
        explanation: say(
            'Problema askotan triangelu angeluzuzena egoera marraztean agertzen da: eskailera, horma eta lurra; bi eraikinen altueren kendura; telebista baten hazbeteak, pantailaren diagonala baitira.',
            'En muchos problemas el triángulo rectángulo aparece al dibujar la situación: la escalera, la pared y el suelo; la diferencia de alturas de dos edificios; las pulgadas de un televisor, que son la diagonal de la pantalla.',
            'في كثير من المسائل يظهر المثلث القائم عند رسم الموقف: السلّم والجدار والأرض؛ وفرق ارتفاعي بنايتين؛ وبوصات التلفاز، وهي قطر الشاشة.',
            'In many problems the right-angled triangle appears when you draw the situation: the ladder, the wall and the floor; the difference in height of two buildings; the inches of a TV, which are the diagonal of the screen.'
        ),
        cases: [
            { title: say('Marraztu', 'Dibuja', 'ارسم', 'Draw'), text: say('Egin eskema bat eta markatu angelu zuzena.', 'Haz un esquema y marca el ángulo recto.', 'ارسم مخططًا وحدّد الزاوية القائمة.', 'Make a sketch and mark the right angle.') },
            { title: say('Hipotenusa', 'Hipotenusa', 'الوتر', 'Hypotenuse'), text: say('Angelu zuzenaren aurrean dago; marrazkian, $6{,}5$ m-ko eskailera.', 'Está enfrente del ángulo recto; en el dibujo, la escalera de $6{,}5$ m.', 'يقابل الزاوية القائمة؛ وفي الرسم هو السلّم الذي طوله $6{,}5$ م.', 'It is opposite the right angle; in the drawing, the $6{,}5$ m ladder.'), math: same('$\\sqrt{6{,}5^{2}-6^{2}}=\\sqrt{6{,}25}=2{,}5$') },
            { title: say('Unitateak', 'Unidades', 'الوحدات', 'Units'), text: say('Datu guztiak unitate berean.', 'Todos los datos en la misma unidad.', 'كل المعطيات بالوحدة نفسها.', 'All the data in the same unit.') },
            { title: say('Egiaztatu', 'Comprueba', 'تحقّق', 'Check'), text: say('Begiratu emaitza zentzuzkoa den.', 'Mira que el resultado sea razonable.', 'انظر هل النتيجة معقولة.', 'Make sure the result is reasonable.') }
        ],
        examplePrompt: say('50 hazbeteko telebista baten pantailak 40 hazbeteko zabalera du. Zenbat neurtzen du altuerak?', 'Un televisor de 50 pulgadas tiene una pantalla de 40 pulgadas de ancho. ¿Cuánto mide de alto?', 'تلفاز قياسه 50 بوصة عرض شاشته 40 بوصة. كم ارتفاعها؟', 'A 50-inch TV has a screen 40 inches wide. How tall is it?'),
        example: same('$\\sqrt{50^{2}-40^{2}}=\\sqrt{900}=30$'),
        exampleAnswer: say('30 hazbete: diagonala da hipotenusa.', '30 pulgadas: la diagonal es la hipotenusa.', '30 بوصة: القطر هو الوتر.', '30 inches: the diagonal is the hypotenuse.')
    },
    /* ---------- 3. Plane areas ---------- */
    'polygon-areas': {
        vocabulary: [
            say('oinarria', 'base', 'القاعدة', 'base'),
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter')
        ],
        explanation: say(
            'Azalera irudi batek hartzen duen gainazala da, eta unitate karratuetan neurtzen da (cm², m²…), datu guztiak unitate berean. Triangelua paralelogramo baten erdia da, eta erronboa, haren diagonalek osatzen duten laukizuzenaren erdia.',
            'El área es la superficie que ocupa una figura y se mide en unidades cuadradas (cm², m²…), con todos los datos en la misma unidad. El triángulo es la mitad de un paralelogramo, y el rombo, la mitad del rectángulo que forman sus diagonales.',
            'المساحة هي السطح الذي يشغله الشكل، وتقاس بالوحدات المربعة (سم²، م²…)، مع كل المعطيات بالوحدة نفسها. المثلث نصف متوازي أضلاع، والمعيّن نصف المستطيل الذي يكوّنه قطراه.',
            'Area is the surface a shape covers, measured in square units (cm², m²…), with all the data in the same unit. The triangle is half a parallelogram, and the rhombus is half the rectangle its diagonals make.'
        ),
        cases: [
            { title: say('Laukizuzena eta paralelogramoa', 'Rectángulo y paralelogramo', 'المستطيل ومتوازي الأضلاع', 'Rectangle and parallelogram'), text: say('Oinarria bider altuera.', 'Base por altura.', 'القاعدة في الارتفاع.', 'Base times height.'), math: same('$A=b\\cdot h$') },
            { title: say('Triangelua eta erronboa', 'Triángulo y rombo', 'المثلث والمعيّن', 'Triangle and rhombus'), text: say('Erdia.', 'La mitad.', 'النصف.', 'Half.'), math: same('$A=\\frac{b\\cdot h}{2}\\qquad A=\\frac{D\\cdot d}{2}$') },
            { title: say('Trapezioa', 'Trapecio', 'شبه المنحرف', 'Trapezium'), text: say('Oinarrien batez bestekoa bider altuera.', 'Media de las bases por la altura.', 'متوسط القاعدتين في الارتفاع.', 'The average of the bases times the height.'), math: same('$A=\\frac{(B+b)\\cdot h}{2}$') },
            { title: say('Poligono erregularra', 'Polígono regular', 'المضلع المنتظم', 'Regular polygon'), text: say('$n$ triangelu, altuera apotema dutela.', '$n$ triángulos cuya altura es la apotema.', '$n$ مثلثًا ارتفاعها العامد.', '$n$ triangles whose height is the apothem.'), math: same('$A=\\frac{P\\cdot a}{2}$') }
        ],
        examplePrompt: say('Trapezio batek 10 cm eta 6 cm-ko oinarriak ditu, eta 4 cm-ko altuera. Kalkulatu haren azalera.', 'Un trapecio tiene bases de 10 cm y 6 cm, y 4 cm de altura. Calcula su área.', 'شبه منحرف قاعدتاه 10 سم و6 سم وارتفاعه 4 سم. احسب مساحته.', 'A trapezium has bases of 10 cm and 6 cm and a height of 4 cm. Calculate its area.'),
        example: same('$\\frac{(10+6)\\cdot 4}{2}=32$'),
        exampleAnswer: say('$32$ cm².', '$32$ cm².', '$32$ سم².', '$32$ cm².')
    },
    'circle-areas': {
        definitions: [
            {
                term: say('Sektore zirkularra', 'Sector circular', 'القطاع الدائري', 'Sector'),
                meaning: say('Bi erradiok eta arku batek mugatutako zirkulu-zatia.', 'La parte del círculo limitada por dos radios y un arco.', 'جزء القرص المحدود بنصفي قطر وقوس.', 'The part of a circle between two radii and an arc.')
            },
            {
                term: say('Koroa zirkularra', 'Corona circular', 'الحلقة الدائرية', 'Annulus'),
                meaning: say('Zentro bera duten bi zirkunferentziaren arteko zatia.', 'La parte entre dos circunferencias con el mismo centro.', 'الجزء بين دائرتين لهما المركز نفسه.', 'The part between two circles with the same centre.')
            }
        ],
        vocabulary: [
            say('zirkulua', 'círculo', 'القرص', 'disc'),
            say('erradioa', 'radio', 'نصف القطر', 'radius'),
            say('diametroa', 'diámetro', 'القطر', 'diameter')
        ],
        explanation: say(
            'Zirkuluaren azalera $A=\\pi r^{2}$ da. $n°$-ko sektorea zirkuluaren zati proportzionala da, eta koroa, zirkulu handia ken txikia. Azalera jakinda, erradioa ateratzen da $\\pi$ zenbakiaz zatituz eta erroa eginez. Diametroa ematen badute, hartu erdia.',
            'El área del círculo es $A=\\pi r^{2}$. Un sector de $n°$ es la parte proporcional del círculo, y la corona, el círculo grande menos el pequeño. Conociendo el área, el radio sale dividiendo entre $\\pi$ y haciendo la raíz. Si dan el diámetro, toma la mitad.',
            'مساحة القرص $A=\\pi r^{2}$. والقطاع ذو $n°$ هو الجزء المتناسب من القرص، والحلقة هي القرص الكبير ناقص الصغير. وإذا عرفنا المساحة نحسب نصف القطر بالقسمة على $\\pi$ وأخذ الجذر. وإذا أُعطي القطر فخذ نصفه.',
            'The area of a disc is $A=\\pi r^{2}$. A sector of $n°$ is the matching fraction of the disc, and the annulus is the big disc minus the small one. If you know the area, you get the radius by dividing by $\\pi$ and taking the root. If you are given the diameter, take half.'
        ),
        cases: [
            { title: say('Sektorea', 'Sector', 'القطاع', 'Sector'), text: say('Marrazkikoa: $r=10$, $90°$.', 'El del dibujo: $r=10$, $90°$.', 'قطاع الرسم: $r=10$، $90°$.', 'The one in the drawing: $r=10$, $90°$.'), math: same('$\\frac{314\\cdot 90}{360}=78{,}5$') },
            { title: say('Koroa', 'Corona', 'الحلقة', 'Annulus'), text: say('Handia ken txikia.', 'El grande menos el pequeño.', 'الكبير ناقص الصغير.', 'The big one minus the small one.'), math: same('$A=\\pi(R^{2}-r^{2})$') }
        ],
        examplePrompt: say('Kalkulatu 120°-ko sektore baten azalera, 6 cm-ko erradioko zirkulu batean.', 'Calcula el área de un sector de 120° en un círculo de 6 cm de radio.', 'احسب مساحة قطاع قياسه 120° في قرص نصف قطره 6 سم.', 'Calculate the area of a 120° sector in a disc with a radius of 6 cm.'),
        example: same('$\\frac{3{,}14\\cdot 6^{2}\\cdot 120}{360}=37{,}68$'),
        exampleAnswer: say('$37{,}68$ cm²: zirkuluaren herena.', '$37{,}68$ cm²: la tercera parte del círculo.', '$37{,}68$ سم²: ثلث القرص.', '$37{,}68$ cm²: a third of the disc.')
    },
    composite: {
        vocabulary: [
            say('deskonposatu', 'descomponer', 'جزّئ', 'split up'),
            say('itzaleztatua', 'sombreado', 'المظلّل', 'shaded'),
            say('ingurua', 'contorno', 'الحد الخارجي', 'outline')
        ],
        explanation: say(
            'Irudi konposatu baten azalerarako bi bide daude: azalera ezaguneko zatitan deskonposatu eta batu, edo irudi handiago batera osatu eta soberan dagoena kendu. Perimetroa eskatzen badute, ingurua bakarrik kontatzen da, ez barruko lerroak.',
            'Para el área de una figura compuesta hay dos caminos: descomponerla en partes de área conocida y sumar, o completarla hasta una figura mayor y restar lo que sobra. Si piden el perímetro, solo cuenta el contorno, no las líneas interiores.',
            'لمساحة الشكل المركّب طريقان: جزّئ الشكل إلى أجزاء معروفة المساحة واجمع، أو أكمله إلى شكل أكبر واطرح الزائد. وإذا طُلب المحيط فلا يُحسب إلا الحد الخارجي، لا الخطوط الداخلية.',
            'For the area of a composite shape there are two ways: split it up into parts of known area and add, or complete it into a bigger shape and take away what is left over. If they ask for the perimeter, only the outline counts, not the lines inside.'
        ),
        cases: [
            { title: say('Batu', 'Sumar', 'الجمع', 'Add'), text: say('Laukizuzenak, triangeluak, zirkulu-erdiak…', 'Rectángulos, triángulos, semicírculos…', 'مستطيلات ومثلثات وأنصاف أقراص…', 'Rectangles, triangles, semicircles…') },
            { title: say('Kendu', 'Restar', 'الطرح', 'Subtract'), text: say('Itzaleztatua: handia ken zuria.', 'Sombreado: el grande menos el blanco.', 'المظلّل: الكبير ناقص الأبيض.', 'Shaded: the big one minus the white part.'), math: same('$4^{2}-3{,}14\\cdot 2^{2}=3{,}44$') }
        ],
        examplePrompt: say('10 cm-ko aldeko karratu batek triangelu bat du gainean, 10 cm-ko oinarria eta 6 cm-ko altuera dituena. Kalkulatu azalera osoa.', 'Un cuadrado de 10 cm de lado tiene encima un triángulo de 10 cm de base y 6 cm de altura. Calcula el área total.', 'مربع ضلعه 10 سم فوقه مثلث قاعدته 10 سم وارتفاعه 6 سم. احسب المساحة الكلية.', 'A square with 10 cm sides has a triangle on top with a 10 cm base and a 6 cm height. Calculate the total area.'),
        example: same('$10^{2}+\\frac{10\\cdot 6}{2}=100+30=130$'),
        exampleAnswer: say('$130$ cm²: bi zatiak batzen dira.', '$130$ cm²: se suman las dos partes.', '$130$ سم²: نجمع الجزأين.', '$130$ cm²: add the two parts.')
    },
    /* ---------- 4. Areas of solids ---------- */
    'prism-area': {
        definitions: [
            {
                term: say('Poliedroa', 'Poliedro', 'متعدد الأوجه', 'Polyhedron'),
                meaning: say('Aurpegi lauak dituen gorputza, prisma eta piramidea bezala. Zilindroa, konoa eta esfera, berriz, biraketa-gorputzak dira.', 'Cuerpo de caras planas, como el prisma y la pirámide. El cilindro, el cono y la esfera son cuerpos de revolución.', 'جسم أوجهه مستوية، مثل المنشور والهرم. أما الأسطوانة والمخروط والكرة فأجسام دورانية.', 'A solid with flat faces, like the prism and the pyramid. The cylinder, the cone and the sphere are solids of revolution.')
            }
        ],
        vocabulary: [
            say('garapena', 'desarrollo', 'النشر', 'net'),
            say('alboko aurpegia', 'cara lateral', 'الوجه الجانبي', 'side face'),
            say('oinarria', 'base', 'القاعدة', 'base')
        ],
        explanation: say(
            'Prisma batek bi oinarri berdin eta paralelo ditu, eta haren alboko aurpegiak laukizuzenak dira. Garapenean, alboko aurpegiek laukizuzen bakarra osatzen dute: haren oinarria oinarriaren perimetroa da, eta altuera, prismarena.',
            'Un prisma tiene dos bases iguales y paralelas, y sus caras laterales son rectángulos. En el desarrollo, las caras laterales forman un solo rectángulo: su base es el perímetro de la base, y su altura, la del prisma.',
            'للمنشور قاعدتان متطابقتان ومتوازيتان، وأوجهه الجانبية مستطيلات. وفي النشر تكوّن الأوجه الجانبية مستطيلًا واحدًا: قاعدته محيط القاعدة، وارتفاعه ارتفاع المنشور.',
            'A prism has two equal, parallel bases, and its side faces are rectangles. In the net, the side faces make a single rectangle: its base is the perimeter of the base, and its height is the prism’s.'
        ),
        cases: [
            { title: say('Alboko azalera', 'Área lateral', 'المساحة الجانبية', 'Lateral area'), text: say('Perimetroa bider altuera.', 'Perímetro por altura.', 'المحيط في الارتفاع.', 'Perimeter times height.'), math: same('$A_L=P\\cdot h$') },
            { title: say('Azalera osoa', 'Área total', 'المساحة الكلية', 'Total area'), text: say('Gehi bi oinarriak.', 'Más las dos bases.', 'زائد القاعدتين.', 'Plus the two bases.'), math: same('$A_T=A_L+2A_B$') },
            { title: say('Kuboa eta ortoedroa', 'Cubo y ortoedro', 'المكعب ومتوازي المستطيلات', 'Cube and cuboid'), text: say('Sei aurpegi, biko taldetan berdinak.', 'Seis caras, iguales de dos en dos.', 'ستة أوجه، متساوية مثنى مثنى.', 'Six faces, equal in pairs.'), math: same('$6l^{2}\\qquad 2(ab+ac+bc)$') }
        ],
        examplePrompt: say('Kalkulatu 5 cm, 4 cm eta 3 cm-ko ortoedro baten azalera osoa.', 'Calcula el área total de un ortoedro de 5 cm, 4 cm y 3 cm.', 'احسب المساحة الكلية لمتوازي مستطيلات أبعاده 5 سم و4 سم و3 سم.', 'Calculate the total area of a 5 cm by 4 cm by 3 cm cuboid.'),
        example: same('$2(5\\cdot 4+5\\cdot 3+4\\cdot 3)=2\\cdot 47=94$'),
        exampleAnswer: say('$94$ cm²: sei laukizuzen, biko taldetan berdinak.', '$94$ cm²: seis rectángulos, iguales de dos en dos.', '$94$ سم²: ستة مستطيلات متساوية مثنى مثنى.', '$94$ cm²: six rectangles, equal in pairs.')
    },
    'pyramid-area': {
        vocabulary: [
            say('apotema', 'apotema', 'العامد', 'apothem'),
            say('erpina', 'vértice', 'رأس', 'vertex'),
            say('alboko aurpegia', 'cara lateral', 'الوجه الجانبي', 'side face')
        ],
        explanation: say(
            'Piramide batek oinarri bakarra du, eta haren alboko aurpegiak erpin batean elkartzen diren triangeluak dira. Erregularrean isoszeleak eta berdinak dira, eta haien altuera piramidearen apotema da, $a_p$. Ez nahastu $h$ altuerarekin: apotema hipotenusa da.',
            'Una pirámide tiene una sola base, y sus caras laterales son triángulos que se juntan en un vértice. En la regular son isósceles e iguales, y su altura es la apotema de la pirámide, $a_p$. No la confundas con la altura $h$: la apotema es la hipotenusa.',
            'للهرم قاعدة واحدة، وأوجهه الجانبية مثلثات تلتقي في رأس. وفي المنتظم تكون متساوية الساقين ومتطابقة، وارتفاعها عامد الهرم $a_p$. لا تخلطه بالارتفاع $h$: العامد هو الوتر.',
            'A pyramid has a single base, and its side faces are triangles that meet at a vertex. In a regular one they are isosceles and equal, and their height is the apothem of the pyramid, $a_p$. Do not mix it up with the height $h$: the apothem is the hypotenuse.'
        ),
        cases: [
            { title: say('Alboko azalera', 'Área lateral', 'المساحة الجانبية', 'Lateral area'), text: say('Triangelu berdinak.', 'Triángulos iguales.', 'مثلثات متطابقة.', 'Equal triangles.'), math: same('$A_L=\\frac{P\\cdot a_p}{2}$') },
            { title: say('Azalera osoa', 'Área total', 'المساحة الكلية', 'Total area'), text: say('Gehi oinarria.', 'Más la base.', 'زائد القاعدة.', 'Plus the base.'), math: same('$A_T=A_L+A_B$') },
            { title: say('Apotema', 'Apotema', 'العامد', 'Apothem'), text: say('Oinarri karratuan, katetoak altuera eta aldearen erdia dira.', 'En base cuadrada, los catetos son la altura y medio lado.', 'في القاعدة المربعة الضلعان القائمان هما الارتفاع ونصف الضلع.', 'With a square base, the legs are the height and half the side.'), math: same('$a_p=\\sqrt{h^{2}+\\left(\\frac{l}{2}\\right)^{2}}$') }
        ],
        examplePrompt: say('Oinarri karratuko piramide erregular batek 6 cm-ko aldea eta 4 cm-ko altuera ditu. Kalkulatu alboko azalera.', 'Una pirámide regular de base cuadrada tiene 6 cm de lado y 4 cm de altura. Calcula su área lateral.', 'هرم منتظم قاعدته مربعة ضلعها 6 سم وارتفاعه 4 سم. احسب مساحته الجانبية.', 'A regular square-based pyramid has 6 cm sides and a height of 4 cm. Calculate its lateral area.'),
        example: same('$a_p=\\sqrt{4^{2}+3^{2}}=5\\qquad \\frac{24\\cdot 5}{2}=60$'),
        exampleAnswer: say('$60$ cm². Apotema (5) altuera (4) baino handiagoa da.', '$60$ cm². La apotema (5) es mayor que la altura (4).', '$60$ سم². العامد (5) أكبر من الارتفاع (4).', '$60$ cm². The apothem (5) is greater than the height (4).')
    },
    'round-area': {
        definitions: [
            {
                term: say('Sortzailea', 'Generatriz', 'الراسم', 'Slant height'),
                meaning: say('Konoan, erpinetik oinarriaren ertzeraino doan zuzenkia: $g=\\sqrt{h^{2}+r^{2}}$.', 'En el cono, el segmento que va del vértice al borde de la base: $g=\\sqrt{h^{2}+r^{2}}$.', 'في المخروط، القطعة من الرأس إلى حافة القاعدة: $g=\\sqrt{h^{2}+r^{2}}$.', 'In a cone, the segment from the vertex to the edge of the base: $g=\\sqrt{h^{2}+r^{2}}$.')
            }
        ],
        vocabulary: [
            say('zilindroa', 'cilindro', 'الأسطوانة', 'cylinder'),
            say('konoa', 'cono', 'المخروط', 'cone'),
            say('esfera', 'esfera', 'الكرة', 'sphere')
        ],
        explanation: say(
            'Zilindroaren garapena laukizuzen bat eta bi zirkulu dira; laukizuzenaren oinarria zirkunferentzia da. Konoarena sektore bat eta zirkulu bat dira; sektorearen erradioa sortzailea da. Esfera ez da garatzen: haren azalera lau zirkulu handi da.',
            'El desarrollo del cilindro es un rectángulo y dos círculos; la base del rectángulo es la circunferencia. El del cono es un sector y un círculo; el radio del sector es la generatriz. La esfera no se desarrolla: su área es cuatro círculos máximos.',
            'نشر الأسطوانة مستطيل ودائرتان؛ وقاعدة المستطيل محيط الدائرة. ونشر المخروط قطاع ودائرة؛ ونصف قطر القطاع هو الراسم. أما الكرة فلا تُنشر: مساحتها أربع دوائر عظمى.',
            'The net of a cylinder is a rectangle and two circles; the base of the rectangle is the circumference. The cone’s is a sector and a circle; the radius of the sector is the slant height. A sphere has no net: its area is four great circles.'
        ),
        cases: [
            { title: say('Zilindroa', 'Cilindro', 'الأسطوانة', 'Cylinder'), text: say('Zirkunferentzia bider altuera, gehi bi oinarriak.', 'Circunferencia por altura, más las dos bases.', 'المحيط في الارتفاع، زائد القاعدتين.', 'Circumference times height, plus the two bases.'), math: same('$A_L=2\\pi rh$') },
            { title: say('Konoa', 'Cono', 'المخروط', 'Cone'), text: say('Marrazkikoa: $r=6$, $g=10$.', 'El del dibujo: $r=6$, $g=10$.', 'مخروط الرسم: $r=6$، $g=10$.', 'The one in the drawing: $r=6$, $g=10$.'), math: same('$A_L=3{,}14\\cdot 6\\cdot 10=188{,}4$') },
            { title: say('Esfera', 'Esfera', 'الكرة', 'Sphere'), text: say('Lau zirkulu handi.', 'Cuatro círculos máximos.', 'أربع دوائر عظمى.', 'Four great circles.'), math: same('$A=4\\pi r^{2}$') }
        ],
        examplePrompt: say('Kalkulatu 2 cm-ko erradioko eta 5 cm-ko altuerako zilindro baten azalera osoa.', 'Calcula el área total de un cilindro de 2 cm de radio y 5 cm de altura.', 'احسب المساحة الكلية لأسطوانة نصف قطرها 2 سم وارتفاعها 5 سم.', 'Calculate the total area of a cylinder with a radius of 2 cm and a height of 5 cm.'),
        example: same('$\\begin{aligned}&2\\cdot 3{,}14\\cdot 2\\cdot 5+2\\cdot 3{,}14\\cdot 2^{2}\\\\ &=62{,}8+25{,}12=87{,}92\\end{aligned}$'),
        exampleAnswer: say('$87{,}92$ cm²: albokoa eta bi tapak.', '$87{,}92$ cm²: el lateral y las dos tapas.', '$87{,}92$ سم²: الجانب والغطاءان.', '$87{,}92$ cm²: the side and the two lids.')
    },
    /* ---------- 5. Volumes ---------- */
    'prism-volume': {
        vocabulary: [
            say('edukiera', 'capacidad', 'السعة', 'capacity'),
            say('litroa', 'litro', 'لتر', 'litre'),
            say('unitate kubikoak', 'unidades cúbicas', 'الوحدات المكعبة', 'cubic units')
        ],
        explanation: say(
            'Bolumena gorputz batek hartzen duen espazioa da, eta unitate kubikoetan neurtzen da (cm³, m³…). Prismek eta zilindroek sekzio bera dute behetik gora: haien bolumena oinarriaren azalera bider altuera da. Edukiera litrotan neurtzen da.',
            'El volumen es el espacio que ocupa un cuerpo y se mide en unidades cúbicas (cm³, m³…). Prismas y cilindros tienen la misma sección de abajo arriba: su volumen es el área de la base por la altura. La capacidad se mide en litros.',
            'الحجم هو الحيز الذي يشغله الجسم، ويقاس بالوحدات المكعبة (سم³، م³…). للمناشير والأسطوانات المقطع نفسه من الأسفل إلى الأعلى: حجمها مساحة القاعدة في الارتفاع. وتقاس السعة باللتر.',
            'Volume is the space a solid takes up, measured in cubic units (cm³, m³…). Prisms and cylinders have the same cross-section from bottom to top: their volume is the area of the base times the height. Capacity is measured in litres.'
        ),
        cases: [
            { title: say('Prisma eta zilindroa', 'Prisma y cilindro', 'المنشور والأسطوانة', 'Prism and cylinder'), text: say('Oinarria bider altuera.', 'Base por altura.', 'القاعدة في الارتفاع.', 'Base times height.'), math: same('$V=A_B\\cdot h$') },
            { title: say('Marrazkiko zilindroa', 'El cilindro del dibujo', 'أسطوانة الرسم', 'The cylinder in the drawing'), text: say('$r=5$ eta $h=10$.', '$r=5$ y $h=10$.', '$r=5$ و$h=10$.', '$r=5$ and $h=10$.'), math: same('$3{,}14\\cdot 25\\cdot 10=785$') },
            { title: say('Edukiera', 'Capacidad', 'السعة', 'Capacity'), text: say('1 dm³ = 1 L eta 1 m³ = 1000 L; bolumenean, maila bakoitza 1000 da.', '1 dm³ = 1 L y 1 m³ = 1000 L; en volumen, cada escalón es 1000.', '1 دسم³ = 1 لتر و1 م³ = 1000 لتر؛ وفي الحجم كل درجة 1000.', '1 dm³ = 1 L and 1 m³ = 1,000 L; in volume, each step is 1,000.') }
        ],
        examplePrompt: say('Biltegi zilindriko batek 1 m-ko erradioa eta 2 m-ko altuera ditu. Zenbat litro sartzen dira?', 'Un depósito cilíndrico tiene 1 m de radio y 2 m de altura. ¿Cuántos litros caben?', 'خزان أسطواني نصف قطره 1 م وارتفاعه 2 م. كم لترًا يتّسع؟', 'A cylindrical tank has a radius of 1 m and a height of 2 m. How many litres does it hold?'),
        example: same('$3{,}14\\cdot 1^{2}\\cdot 2=6{,}28$'),
        exampleAnswer: say('$6{,}28$ m³, hau da, 6280 litro.', '$6{,}28$ m³, es decir, 6280 litros.', '$6{,}28$ م³، أي 6280 لترًا.', '$6{,}28$ m³, that is, 6,280 litres.')
    },
    'pyramid-volume': {
        vocabulary: [
            say('herena', 'tercio', 'الثلث', 'third'),
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('sortzailea', 'generatriz', 'الراسم', 'slant height')
        ],
        explanation: say(
            'Piramide bat hiru aldiz sartzen da oinarri eta altuera bereko prisman: haren bolumena herena da. Gauza bera gertatzen da konoarekin eta zilindroarekin. Formulan altuera doa, ez apotema ez sortzailea.',
            'Una pirámide cabe tres veces en el prisma de la misma base y la misma altura: su volumen es un tercio. Lo mismo pasa con el cono y el cilindro. En la fórmula va la altura, no la apotema ni la generatriz.',
            'يتّسع المنشور ذو القاعدة نفسها والارتفاع نفسه للهرم ثلاث مرات: حجم الهرم ثلثه. والأمر نفسه في المخروط والأسطوانة. وفي الصيغة يوضع الارتفاع، لا العامد ولا الراسم.',
            'A pyramid fits three times into the prism with the same base and the same height: its volume is a third. The same goes for the cone and the cylinder. The formula takes the height, not the apothem or the slant height.'
        ),
        cases: [
            { title: say('Piramidea', 'Pirámide', 'الهرم', 'Pyramid'), text: say('Marrazkikoa: oinarria $10^{2}$, altuera 12.', 'La del dibujo: base $10^{2}$, altura 12.', 'هرم الرسم: القاعدة $10^{2}$، والارتفاع 12.', 'The one in the drawing: base $10^{2}$, height 12.'), math: same('$V=\\frac{10^{2}\\cdot 12}{3}=400$') },
            { title: say('Konoa', 'Cono', 'المخروط', 'Cone'), text: say('Zilindroaren herena.', 'Un tercio del cilindro.', 'ثلث الأسطوانة.', 'A third of the cylinder.'), math: same('$V=\\frac{\\pi r^{2}h}{3}$') },
            { title: say('Sortzailearekin', 'Con la generatriz', 'بالراسم', 'With the slant height'), text: say('Kalkulatu lehenik altuera Pitagorasekin.', 'Calcula antes la altura con Pitágoras.', 'احسب الارتفاع أولًا بفيثاغورس.', 'First work out the height with Pythagoras.'), math: same('$h=\\sqrt{g^{2}-r^{2}}$') }
        ],
        why: {
            text: say(
                'Esperimentu batek erakusten du: piramidea urez beteta, oinarri eta altuera bereko prisma hiru edukirekin betetzen da. Marrazkian, $10^{2}$ oinarriko eta 12 altuerako prismak 1200 cm³ ditu, eta piramideak 400.',
                'Lo enseña un experimento: con la pirámide llena de agua, el prisma de la misma base y altura se llena con tres. En el dibujo, el prisma de base $10^{2}$ y altura 12 tiene 1200 cm³, y la pirámide, 400.',
                'تُبيّنه تجربة: بملء الهرم ماءً يمتلئ المنشور ذو القاعدة والارتفاع نفسيهما بثلاث مرات. في الرسم المنشور الذي قاعدته $10^{2}$ وارتفاعه 12 حجمه 1200 سم³، والهرم 400.',
                'An experiment shows it: filling the pyramid with water, the prism with the same base and height fills up with three. In the drawing, the prism with base $10^{2}$ and height 12 holds 1,200 cm³, and the pyramid, 400.'
            ),
            math: same('$10^{2}\\cdot 12=1200=3\\cdot 400$')
        },
        examplePrompt: say('Oinarri karratuko piramide batek 9 cm-ko aldea du eta 10 cm-ko altuera. Kalkulatu haren bolumena.', 'Una pirámide de base cuadrada de 9 cm de lado mide 10 cm de altura. Calcula su volumen.', 'هرم قاعدته مربعة ضلعها 9 سم وارتفاعه 10 سم. احسب حجمه.', 'A square-based pyramid has 9 cm sides and a height of 10 cm. Calculate its volume.'),
        example: same('$\\frac{9^{2}\\cdot 10}{3}=270$'),
        exampleAnswer: say('$270$ cm³, prismaren herena.', '$270$ cm³, un tercio del prisma.', '$270$ سم³، ثلث المنشور.', '$270$ cm³, a third of the prism.')
    },
    compound: {
        vocabulary: [
            say('esfera-erdia', 'semiesfera', 'نصف كرة', 'hemisphere'),
            say('hutsunea', 'hueco', 'فراغ', 'hole'),
            say('deskonposatu', 'descompón', 'جزّئ', 'split up')
        ],
        explanation: say(
            'Esferaren bolumena $V=\\frac{4}{3}\\pi r^{3}$ da, eta esfera-erdiarena, erdia. Objektu asko gorputz ezagunak dira elkarrekin: silo bat zilindro bat eta bi esfera-erdi da. Deskonposatu, kalkulatu zati bakoitza eta batu; hutsuneak badaude, kendu. Eman emaitza eskatzen duten unitatean.',
            'El volumen de la esfera es $V=\\frac{4}{3}\\pi r^{3}$, y el de la semiesfera, la mitad. Muchos objetos son cuerpos conocidos juntos: un silo es un cilindro y dos semiesferas. Descompón, calcula cada parte y suma; si hay huecos, réstalos. Da el resultado en la unidad que piden.',
            'حجم الكرة $V=\\frac{4}{3}\\pi r^{3}$، وحجم نصف الكرة نصفه. أشياء كثيرة أجسام معروفة مجتمعة: الصومعة أسطوانة ونصفا كرة. جزّئ واحسب كل جزء واجمع؛ وإذا وُجد فراغ فاطرحه. وأعطِ النتيجة بالوحدة المطلوبة.',
            'The volume of a sphere is $V=\\frac{4}{3}\\pi r^{3}$, and a hemisphere’s is half of it. Many objects are known solids put together: a silo is a cylinder and two hemispheres. Split it up, work out each part and add; if there are holes, subtract them. Give the result in the unit asked for.'
        ),
        cases: [
            { title: say('Batu', 'Sumar', 'الجمع', 'Add'), text: say('Silo bat: zilindroa eta bi esfera-erdi, hau da, esfera bat.', 'Un silo: cilindro y dos semiesferas, es decir, una esfera.', 'صومعة: أسطوانة ونصفا كرة، أي كرة كاملة.', 'A silo: a cylinder and two hemispheres, that is, a whole sphere.'), math: same('$785+523{,}33\\approx 1308{,}33$') },
            { title: say('Kendu', 'Restar', 'الطرح', 'Subtract'), text: say('Hutsuneak kentzen dira: zilindro baten barruko konoa, zulo bat…', 'Los huecos se restan: un cono dentro de un cilindro, un agujero…', 'نطرح الفراغات: مخروط داخل أسطوانة، ثقب…', 'Holes are subtracted: a cone inside a cylinder, a hole…') }
        ],
        examplePrompt: say('Pilota batek 6 cm-ko erradioa du. Zein da haren bolumena?', 'Una pelota tiene 6 cm de radio. ¿Cuál es su volumen?', 'كرة نصف قطرها 6 سم. ما حجمها؟', 'A ball has a radius of 6 cm. What is its volume?'),
        example: same('$\\frac{4\\cdot 3{,}14\\cdot 6^{3}}{3}=904{,}32$'),
        exampleAnswer: say('$904{,}32$ cm³, ia litro bat.', '$904{,}32$ cm³, casi un litro.', '$904{,}32$ سم³، قرابة لتر.', '$904{,}32$ cm³, almost a litre.')
    }
}

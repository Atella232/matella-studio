import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'
import type { Geometry3TopicId } from './lessonChecks.ts'

/* ==========================================================================
   Geometria · 3. DBH — what each lesson tells: the new words (definitions),
   the key words in four languages (vocabulary), a short explanation, its
   cases, the example as an exercise («Another example») and, in three
   lessons, «Why does it work?» (a full turn round the polygon, two
   perpendicular bisectors, length and width both growing). Plain data so
   the tests can import it; lessons.tsx merges it into the topics. The
   explanations use the numbers of their drawings (the pentagon in 3
   triangles and the hexagon in 4, PA = PB = 5, the ladder of 6,5 m at 6 m,
   the sector of 90°, squares of side 1, 2 and 3); the example uses numbers
   of its own. No text command inside the formulas (the unit test forbids
   it). Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const geometry3LessonTexts: Record<Geometry3TopicId, LessonTexts> = {
    'polygon-angles': {
        vocabulary: [
            say('diagonalak', 'diagonales', 'الأقطار', 'diagonals'),
            say('barne-angeluak', 'ángulos interiores', 'الزوايا الداخلية', 'interior angles'),
            say('kanpo-angeluak', 'ángulos exteriores', 'الزوايا الخارجية', 'exterior angles')
        ],
        explanation: say(
            'Triangelu baten angeluek 180° batzen dute. Erpin batetik, diagonalek $n$ aldeko poligonoa $n-2$ triangelutan banatzen dute: pentagonoa 3 triangelutan eta hexagonoa 4 triangelutan. Horregatik, barne-angeluek $(n-2)\\cdot 180°$ batzen dute. Kanpo-angeluek beti 360° batzen dute.',
            'Los ángulos de un triángulo suman 180°. Desde un vértice, las diagonales dividen un polígono de $n$ lados en $n-2$ triángulos: el pentágono en 3 y el hexágono en 4. Por eso sus ángulos interiores suman $(n-2)\\cdot 180°$. Los ángulos exteriores suman siempre 360°.',
            'مجموع زوايا المثلث 180°. ومن رأس واحد تقسم الأقطار مضلعًا له $n$ ضلعًا إلى $n-2$ مثلثًا: المخمس إلى 3 والمسدس إلى 4. لذلك مجموع زواياه الداخلية $(n-2)\\cdot 180°$. أما الزوايا الخارجية فمجموعها 360° دائمًا.',
            'The angles of a triangle add up to 180°. From one vertex, the diagonals split a polygon with $n$ sides into $n-2$ triangles: the pentagon into 3 and the hexagon into 4. That is why its interior angles add up to $(n-2)\\cdot 180°$. The exterior angles always add up to 360°.'
        ),
        examplePrompt: say('Zenbat batzen dute dekagono baten (10 alde) barne-angeluek?', '¿Cuánto suman los ángulos interiores de un decágono (10 lados)?', 'كم مجموع الزوايا الداخلية لمعشّر (10 أضلاع)؟', 'What do the interior angles of a decagon (10 sides) add up to?'),
        example: same('$(10-2)\\cdot 180°=1440°$'),
        exampleAnswer: say('1440°: dekagonoa 8 triangelutan banatzen da.', '1440°: el decágono se divide en 8 triángulos.', '1440°: ينقسم المعشّر إلى 8 مثلثات.', '1,440°: the decagon splits into 8 triangles.'),
        why: {
            text: say(
                'Poligonoaren inguruan ibiltzean, erpin bakoitzean kanpo-angelua biratzen duzu. Hasierara itzultzean, bira oso bat eman duzu: 360°. Horregatik, edozein poligonotan, kanpo-angeluek 360° batzen dute.',
                'Al recorrer el polígono, en cada vértice giras el ángulo exterior. Al volver al principio has dado una vuelta entera: 360°. Por eso, en cualquier polígono, los ángulos exteriores suman 360°.',
                'عندما تدور حول المضلع تنعطف في كل رأس بمقدار الزاوية الخارجية. وعندما تعود إلى البداية تكون قد أتممت دورة كاملة: 360°. لذلك مجموع الزوايا الخارجية 360° في أي مضلع.',
                'Walking round the polygon, at each vertex you turn through the exterior angle. When you are back at the start you have made a full turn: 360°. That is why, in any polygon, the exterior angles add up to 360°.'
            )
        }
    },
    'regular-polygons': {
        definitions: [
            {
                term: say('Angelu osagarriak', 'Ángulos suplementarios', 'الزاويتان المتكاملتان', 'Supplementary angles'),
                meaning: say('180° batzen duten bi angelu.', 'Dos ángulos que suman 180°.', 'زاويتان مجموعهما 180°.', 'Two angles that add up to 180°.')
            }
        ],
        vocabulary: [
            say('angelu zentrala', 'ángulo central', 'الزاوية المركزية', 'central angle'),
            say('barne-angelua', 'ángulo interior', 'الزاوية الداخلية', 'interior angle'),
            say('kanpo-angelua', 'ángulo exterior', 'الزاوية الخارجية', 'exterior angle')
        ],
        explanation: say(
            '$n$ aldeko poligono erregular batean angelu guztiak berdinak dira. Angelu zentralak eta kanpo-angeluak $360°\\div n$ neurtzen dute, eta barne-angelua haren osagarria da, $180°-\\frac{360°}{n}$. Hexagono erregularrean: angelu zentrala 60° eta barne-angelua 120°.',
            'En un polígono regular de $n$ lados todos los ángulos son iguales. El ángulo central y el exterior miden $360°\\div n$, y el interior es su suplementario, $180°-\\frac{360°}{n}$. En el hexágono regular: central 60° e interior 120°.',
            'في المضلع المنتظم الذي له $n$ ضلعًا كل الزوايا متساوية. الزاوية المركزية والخارجية قياس كل منهما $360°\\div n$، والداخلية مكمّلتها $180°-\\frac{360°}{n}$. في المسدس المنتظم: المركزية 60° والداخلية 120°.',
            'In a regular polygon with $n$ sides all the angles are equal. The central angle and the exterior angle measure $360°\\div n$, and the interior angle is its supplement, $180°-\\frac{360°}{n}$. In the regular hexagon: central 60° and interior 120°.'
        ),
        examplePrompt: say('Zenbat neurtzen du dodekagono erregular baten (12 alde) barne-angelu bakoitzak?', '¿Cuánto mide cada ángulo interior de un dodecágono regular (12 lados)?', 'كم قياس كل زاوية داخلية في مضلع منتظم له 12 ضلعًا؟', 'How big is each interior angle of a regular dodecagon (12 sides)?'),
        example: same('$360°\\div 12=30°\\qquad 180°-30°=150°$'),
        exampleAnswer: say('150°: kanpo-angelua 30° da, eta barne-angelua haren osagarria.', '150°: el exterior mide 30°, y el interior es su suplementario.', '150°: الخارجية 30° والداخلية مكمّلتها.', '150°: the exterior angle is 30°, and the interior is its supplement.')
    },
    'circle-angles': {
        definitions: [
            {
                term: say('Angelu zentrala', 'Ángulo central', 'الزاوية المركزية', 'Central angle'),
                meaning: say('Erpina zirkunferentziaren zentroan duen angelua.', 'El que tiene el vértice en el centro de la circunferencia.', 'زاوية رأسها مركز الدائرة.', 'An angle with its vertex at the centre of the circle.')
            },
            {
                term: say('Angelu inskribatua', 'Ángulo inscrito', 'الزاوية المحيطية', 'Inscribed angle'),
                meaning: say('Erpina zirkunferentzian bertan duen angelua, aldeek zirkunferentzia ebakitzen dutela.', 'El que tiene el vértice sobre la circunferencia y sus lados la cortan.', 'زاوية رأسها على الدائرة وضلعاها يقطعانها.', 'An angle with its vertex on the circle and its sides cutting it.')
            }
        ],
        vocabulary: [
            say('arkua', 'arco', 'القوس', 'arc'),
            say('diametroa', 'diámetro', 'القطر', 'diameter'),
            say('erdia', 'mitad', 'النصف', 'half')
        ],
        explanation: say(
            'Arku bera hartzen badute, inskribatua zentralaren erdia da. Horregatik, arku bera hartzen duten inskribatu guztiak berdinak dira, eta diametro bat hartzen duenak beti 90° neurtzen du: haren zentralak 180° neurtzen ditu.',
            'Si abarcan el mismo arco, el inscrito es la mitad del central. Por eso todos los inscritos que abarcan el mismo arco son iguales, y el que abarca un diámetro siempre mide 90°: su central mide 180°.',
            'إذا حصرتا القوس نفسه فالمحيطية نصف المركزية. لذلك كل الزوايا المحيطية التي تحصر القوس نفسه متساوية، والتي تحصر قطرًا قياسها 90° دائمًا لأن المركزية 180°.',
            'If they take in the same arc, the inscribed angle is half the central one. So all inscribed angles on the same arc are equal, and one on a diameter always measures 90°: its central angle is 180°.'
        ),
        examplePrompt: say('Angelu inskribatu batek 35° neurtzen du. Zenbat neurtzen du arku bera hartzen duen zentralak?', 'Un ángulo inscrito mide 35°. ¿Cuánto mide el central que abarca el mismo arco?', 'زاوية محيطية قياسها 35°. كم قياس المركزية التي تحصر القوس نفسه؟', 'An inscribed angle measures 35°. How big is the central angle on the same arc?'),
        example: same('$2\\cdot 35°=70°$'),
        exampleAnswer: say('70°: zentrala inskribatuaren bikoitza da.', '70°: el central es el doble del inscrito.', '70°: المركزية ضعف المحيطية.', '70°: the central angle is twice the inscribed one.')
    },
    'perpendicular-bisector': {
        definitions: [
            {
                term: say('Leku geometrikoa', 'Lugar geométrico', 'المحل الهندسي', 'Locus'),
                meaning: say('Propietate bera betetzen duten puntuen multzoa.', 'El conjunto de puntos que cumplen una misma propiedad.', 'مجموعة النقاط التي تحقق خاصية واحدة.', 'The set of points that share one property.')
            },
            {
                term: say('Erdibitzailea', 'Mediatriz', 'المنصّف العمودي', 'Perpendicular bisector'),
                meaning: say('$A$ eta $B$ puntuetatik distantzia berera dauden puntuen zuzena.', 'La recta de los puntos que están a la misma distancia de $A$ y de $B$.', 'مستقيم النقاط التي تبعد المسافة نفسها عن $A$ و$B$.', 'The line of the points that are the same distance from $A$ and from $B$.')
            }
        ],
        vocabulary: [
            say('perpendikularra', 'perpendicular', 'عمودي', 'perpendicular'),
            say('erdiko puntua', 'punto medio', 'منتصف', 'midpoint'),
            say('zirkunferentzia', 'circunferencia', 'الدائرة', 'circle')
        ],
        explanation: say(
            'Erdibitzailea $AB$ zuzenki-zatiarekiko perpendikularra da, eta haren erdiko puntutik pasatzen da. Erdibitzaileko edozein $P$ puntu bi muturretatik distantzia berera dago: marrazkian, $PA=PB=5$. Zirkunferentzia ere leku geometriko bat da: zentrotik $r$ distantziara dauden puntuak.',
            'La mediatriz es perpendicular al segmento $AB$ y pasa por su punto medio. Cualquier punto $P$ de la mediatriz está a la misma distancia de los dos extremos: en el dibujo, $PA=PB=5$. La circunferencia también es un lugar geométrico: los puntos a distancia $r$ del centro.',
            'المنصّف العمودي عمودي على القطعة $AB$ ويمر بمنتصفها. وأي نقطة $P$ عليه تبعد المسافة نفسها عن الطرفين: في الرسم $PA=PB=5$. والدائرة أيضًا محل هندسي: النقاط التي تبعد $r$ عن المركز.',
            'The perpendicular bisector is perpendicular to the segment $AB$ and passes through its midpoint. Any point $P$ on it is the same distance from both ends: in the drawing, $PA=PB=5$. The circle is a locus too: the points at distance $r$ from the centre.'
        ),
        examplePrompt: say('Aurkitu $A=(-3,5)$ eta $B=(5,5)$ zuzenki-zatiaren erdibitzailea.', 'Halla la mediatriz del segmento de $A=(-3,5)$ y $B=(5,5)$.', 'جد المنصّف العمودي للقطعة بين $A=(-3,5)$ و$B=(5,5)$.', 'Find the perpendicular bisector of the segment from $A=(-3,5)$ to $B=(5,5)$.'),
        example: same('$\\left(\\frac{-3+5}{2},\\,5\\right)=(1,5)\\ \\to\\ x=1$'),
        exampleAnswer: say('$x=1$ zuzen bertikala: zuzenki-zatia horizontala da.', 'La recta vertical $x=1$: el segmento es horizontal.', 'المستقيم العمودي $x=1$: القطعة أفقية.', 'The vertical line $x=1$: the segment is horizontal.')
    },
    'angle-bisector': {
        definitions: [
            {
                term: say('Erdikaria', 'Bisectriz', 'المنصّف', 'Angle bisector'),
                meaning: say('Angelu bat bi angelu berdinetan banatzen duen zuzenerdia.', 'La semirrecta que divide un ángulo en dos ángulos iguales.', 'نصف المستقيم الذي يقسم الزاوية إلى زاويتين متساويتين.', 'The ray that splits an angle into two equal angles.')
            }
        ],
        vocabulary: [
            say('aldeak', 'lados', 'الضلعين', 'sides'),
            say('distantzia', 'distancia', 'المسافة', 'distance'),
            say('perpendikularrean', 'en perpendicular', 'عموديًا', 'at right angles')
        ],
        explanation: say(
            'Erdikariko puntu bakoitza angeluaren bi aldeetatik distantzia berera dago: marrazkian, $Q$ alde bakoitzetik 3 unitatera. Distantzia hori aldearekiko perpendikularrean neurtzen da. Triangelu baten hiru erdikariak puntu batean ebakitzen dira: inzentroan.',
            'Cada punto de la bisectriz está a la misma distancia de los dos lados del ángulo: en el dibujo, $Q$ está a 3 de cada lado. Esa distancia se mide en perpendicular al lado. Las tres bisectrices de un triángulo se cortan en un punto: el incentro.',
            'كل نقطة على المنصّف تبعد المسافة نفسها عن ضلعي الزاوية: في الرسم تبعد $Q$ مسافة 3 عن كل ضلع. وتُقاس هذه المسافة عموديًا على الضلع. وتتقاطع منصّفات المثلث الثلاثة في نقطة: مركز الدائرة الداخلية.',
            'Every point of the angle bisector is the same distance from both sides of the angle: in the drawing, $Q$ is 3 from each side. That distance is measured at right angles to the side. The three angle bisectors of a triangle meet at one point: the incentre.'
        ),
        examplePrompt: say('Angelu batek 128° neurtzen ditu. Zenbat neurtzen du erdikariak sortzen duen erdi bakoitzak?', 'Un ángulo mide 128°. ¿Cuánto mide cada mitad que forma su bisectriz?', 'زاوية قياسها 128°. كم قياس كل نصف يكوّنه منصّفها؟', 'An angle measures 128°. How big is each half made by its bisector?'),
        example: same('$128°\\div 2=64°\\qquad 64°+64°=128°$'),
        exampleAnswer: say('64°: bi erdiek berriro 128° batzen dute.', '64°: las dos mitades vuelven a sumar 128°.', '64°: النصفان يعطيان 128° من جديد.', '64°: the two halves add back up to 128°.')
    },
    'notable-points': {
        definitions: [
            {
                term: say('Erdibidekoa', 'Mediana', 'المتوسط', 'Median'),
                meaning: say('Erpin bat aurkako aldearen erdiko puntuarekin lotzen duen zuzenki-zatia.', 'El segmento que une un vértice con el punto medio del lado opuesto.', 'القطعة التي تصل رأسًا بمنتصف الضلع المقابل.', 'The segment joining a vertex to the midpoint of the opposite side.')
            }
        ],
        vocabulary: [
            say('zirkunzentroa', 'circuncentro', 'مركز الدائرة المحيطة', 'circumcentre'),
            say('barizentroa', 'baricentro', 'مركز الثقل', 'centroid'),
            say('erpinak', 'vértices', 'الرؤوس', 'vertices')
        ],
        explanation: say(
            'Triangelu baten mota bakoitzeko zuzenak puntu batean ebakitzen dira. Zirkunzentroa, erdibitzaileena, hiru erpinetatik distantzia berera dago; inzentroa, erdikariena, hiru aldeetatik. Barizentroa, erdibidekoena, erdibideko bakoitzaren $\\frac{2}{3}$ zatian dago, erpinetik hasita.',
            'Las rectas de cada tipo de un triángulo se cortan en un punto. El circuncentro, de las mediatrices, está a la misma distancia de los tres vértices; el incentro, de las bisectrices, de los tres lados. El baricentro, de las medianas, está a $\\frac{2}{3}$ de cada mediana desde el vértice.',
            'تتقاطع مستقيمات كل نوع في المثلث في نقطة. مركز الدائرة المحيطة، تقاطع المنصّفات العمودية، يبعد المسافة نفسها عن الرؤوس الثلاثة، ومركز الدائرة الداخلية، تقاطع المنصّفات، عن الأضلاع الثلاثة. ومركز الثقل، تقاطع المتوسطات، يقع على $\\frac{2}{3}$ من كل متوسط بدءًا من الرأس.',
            'The lines of each kind in a triangle meet at a point. The circumcentre, of the perpendicular bisectors, is the same distance from the three vertices; the incentre, of the angle bisectors, from the three sides. The centroid, of the medians, is $\\frac{2}{3}$ along each median from the vertex.'
        ),
        cases: [
            { title: say('Zirkunzentroa', 'Circuncentro', 'مركز الدائرة المحيطة', 'Circumcentre'), text: say('Erdibitzaileak. Kanpoan egon daiteke.', 'Mediatrices. Puede quedar fuera.', 'المنصّفات العمودية. قد يقع خارجًا.', 'Perpendicular bisectors. It can lie outside.') },
            { title: say('Inzentroa', 'Incentro', 'مركز الدائرة المحاطة', 'Incentre'), text: say('Erdikariak. Beti barruan.', 'Bisectrices. Siempre dentro.', 'منصّفات الزوايا. داخلًا دائمًا.', 'Angle bisectors. Always inside.') },
            { title: say('Barizentroa', 'Baricentro', 'مركز الثقل', 'Centroid'), text: say('Medianak. Beti barruan.', 'Medianas. Siempre dentro.', 'المتوسطات. داخلًا دائمًا.', 'Medians. Always inside.') },
            { title: say('Ortozentroa', 'Ortocentro', 'ملتقى الارتفاعات', 'Orthocentre'), text: say('Altuerak. Kanpoan egon daiteke.', 'Alturas. Puede quedar fuera.', 'الارتفاعات. قد يقع خارجًا.', 'Altitudes. It can lie outside.') }
        ],
        examplePrompt: say('Triangelu batean, $A$ erpineko erdibidekoak 18 cm neurtzen ditu. Zer distantziatara dago barizentroa $A$ erpinetik? Eta aldearen erdiko puntutik?', 'En un triángulo, la mediana desde $A$ mide 18 cm. ¿A qué distancia de $A$ está el baricentro? ¿Y del punto medio del lado?', 'في مثلث طول المتوسط من $A$ هو 18 سم. كم يبعد مركز الثقل عن $A$؟ وعن منتصف الضلع؟', 'In a triangle, the median from $A$ is 18 cm long. How far is the centroid from $A$? And from the midpoint of the side?'),
        example: same('$\\frac{2}{3}\\cdot 18=12\\qquad 18-12=6$'),
        exampleAnswer: say('$A$ erpinetik 12 cm-ra, eta erdiko puntutik 6 cm-ra.', 'A 12 cm de $A$ y a 6 cm del punto medio.', 'يبعد 12 سم عن $A$ و6 سم عن المنتصف.', '12 cm from $A$ and 6 cm from the midpoint.'),
        why: {
            text: say(
                'Zirkunzentroa $AB$ zuzenki-zatiaren erdibitzailean dago ($A$ eta $B$ puntuetatik distantzia berera) eta $BC$ zuzenki-zatiarenean ($B$ eta $C$ puntuetatik). Beraz, hiru erpinetatik distantzia berera dago, eta hirugarren erdibitzailetik ere pasatzen da.',
                'El circuncentro está en la mediatriz de $AB$ (igual de lejos de $A$ y de $B$) y en la de $BC$ (igual de lejos de $B$ y de $C$). Así que está a la misma distancia de los tres vértices, y también pasa por él la tercera mediatriz.',
                'يقع مركز الدائرة المحيطة على المنصّف العمودي لـ $AB$ (يبعد المسافة نفسها عن $A$ و$B$) وعلى منصّف $BC$ (يبعد المسافة نفسها عن $B$ و$C$). إذن يبعد المسافة نفسها عن الرؤوس الثلاثة، ويمر به المنصّف الثالث أيضًا.',
                'The circumcentre lies on the perpendicular bisector of $AB$ (as far from $A$ as from $B$) and on that of $BC$ (as far from $B$ as from $C$). So it is the same distance from all three vertices, and the third bisector also passes through it.'
            )
        }
    },
    pythagoras: {
        vocabulary: [
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse'),
            say('katetoak', 'catetos', 'الضلعان القائمان', 'legs'),
            say('erro karratua', 'raíz', 'الجذر', 'root')
        ],
        explanation: say(
            'Triangelu zuzen batean, hipotenusaren karratua katetoen karratuen batura da: $a^{2}=b^{2}+c^{2}$. Hipotenusa aurkitzeko, batu karratuak eta atera erro karratua; kateto bat aurkitzeko, kendu. Eta alderantziz: $a^{2}=b^{2}+c^{2}$ betetzen bada, triangelua zuzena da.',
            'En un triángulo rectángulo, el cuadrado de la hipotenusa es la suma de los cuadrados de los catetos: $a^{2}=b^{2}+c^{2}$. Para la hipotenusa, suma los cuadrados y saca la raíz; para un cateto, resta. Y al revés: si se cumple $a^{2}=b^{2}+c^{2}$, el triángulo es rectángulo.',
            'في المثلث القائم مربع الوتر يساوي مجموع مربعي الضلعين القائمين: $a^{2}=b^{2}+c^{2}$. وللوتر اجمع المربعين واستخرج الجذر، ولضلع قائم اطرح. وبالعكس: إذا تحقق $a^{2}=b^{2}+c^{2}$ فالمثلث قائم.',
            'In a right triangle, the square of the hypotenuse is the sum of the squares of the legs: $a^{2}=b^{2}+c^{2}$. For the hypotenuse, add the squares and take the root; for a leg, subtract. And the other way round: if $a^{2}=b^{2}+c^{2}$ holds, the triangle has a right angle.'
        ),
        examplePrompt: say('8, 15 eta 17 cm-ko aldeak dituen triangelu bat zuzena da?', '¿Es rectángulo un triángulo de lados 8, 15 y 17 cm?', 'هل المثلث الذي أضلاعه 8 و15 و17 سم قائم؟', 'Is a triangle with sides 8, 15 and 17 cm a right triangle?'),
        example: same('$8^{2}+15^{2}=64+225=289=17^{2}$'),
        exampleAnswer: say('Bai: Pitagoras betetzen da, eta hipotenusa 17 cm da.', 'Sí: se cumple Pitágoras, y la hipotenusa es 17 cm.', 'نعم: تتحقق فيثاغورس، والوتر 17 سم.', 'Yes: Pythagoras holds, and the hypotenuse is 17 cm.')
    },
    'pythagoras-figures': {
        vocabulary: [
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('apotema', 'apotema', 'العامد', 'apothem'),
            say('diagonala', 'diagonal', 'القطر', 'diagonal')
        ],
        explanation: say(
            'Irudi askotan triangelu zuzen bat ezkutatzen da. Marraztu lehenik, jarri izenak aldeei eta aplikatu Pitagoras:',
            'En muchas figuras se esconde un triángulo rectángulo. Dibújalo primero, pon nombre a sus lados y aplica Pitágoras:',
            'في أشكال كثيرة يختبئ مثلث قائم. ارسمه أولًا وسمِّ أضلاعه ثم طبّق فيثاغورس:',
            'Many figures hide a right triangle. Draw it first, name its sides and apply Pythagoras:'
        ),
        cases: [
            {
                title: say('Triangelu isoszelea', 'Triángulo isósceles', 'المثلث المتساوي الساقين', 'Isosceles triangle'),
                text: say('Altuerak oinarria erdibitzen du: altuera, oinarri-erdia eta aldea.', 'La altura parte la base por la mitad: altura, media base y lado.', 'الارتفاع ينصّف القاعدة: الارتفاع ونصف القاعدة والساق.', 'The height cuts the base in half: height, half the base and side.'),
                math: same('$h=\\sqrt{l^{2}-\\left(\\frac{b}{2}\\right)^{2}}$')
            },
            {
                title: say('Laukizuzena', 'Rectángulo', 'المستطيل', 'Rectangle'),
                text: say('Diagonala eta bi aldeak.', 'La diagonal y los dos lados.', 'القطر والضلعان.', 'The diagonal and the two sides.'),
                math: same('$d=\\sqrt{a^{2}+b^{2}}$')
            },
            {
                title: say('Erronboa', 'Rombo', 'المعيّن', 'Rhombus'),
                text: say('Diagonal-erdiak eta aldea.', 'Las semidiagonales y el lado.', 'نصفا القطرين والضلع.', 'The half-diagonals and the side.')
            },
            {
                title: say('Poligono erregularra', 'Polígono regular', 'المضلع المنتظم', 'Regular polygon'),
                text: say('Apotema, alde-erdia eta erradioa.', 'La apotema, el medio lado y el radio.', 'العامد ونصف الضلع ونصف القطر.', 'The apothem, half the side and the radius.')
            }
        ],
        examplePrompt: say('Zenbat neurtzen du 20 cm eta 21 cm-ko laukizuzen baten diagonalak?', '¿Cuánto mide la diagonal de un rectángulo de 20 cm por 21 cm?', 'كم طول قطر مستطيل بُعداه 20 سم و21 سم؟', 'How long is the diagonal of a rectangle 20 cm by 21 cm?'),
        example: same('$d=\\sqrt{20^{2}+21^{2}}=\\sqrt{841}=29$'),
        exampleAnswer: say('29 cm: diagonala hipotenusa da.', '29 cm: la diagonal es la hipotenusa.', '29 سم: القطر هو الوتر.', '29 cm: the diagonal is the hypotenuse.')
    },
    'pythagoras-problems': {
        vocabulary: [
            say('eskailera', 'escalera', 'السلّم', 'ladder'),
            say('horma', 'pared', 'الجدار', 'wall'),
            say('distantzia', 'distancia', 'المسافة', 'distance')
        ],
        explanation: say(
            'Eskailera bat horman bermatzen bada, eskailera hipotenusa da: 6,5 m-ko eskailerarekin eta 6 m-ko hormarekin, oina 2,5 m-ra dago. Planoko bi punturen artean, katetoak $x$ eta $y$ balioen kendurak dira.',
            'Si una escalera se apoya en la pared, la escalera es la hipotenusa: con 6,5 m de escalera y 6 m de pared, el pie está a 2,5 m. Entre dos puntos del plano, los catetos son las diferencias de $x$ y de $y$.',
            'إذا أُسند سلّم إلى الجدار فالسلّم هو الوتر: مع سلّم 6.5 م وجدار 6 م تكون القاعدة على بعد 2.5 م. وبين نقطتين في المستوى يكون الضلعان القائمان فرقَي $x$ و$y$، والمسافة هي الوتر.',
            'If a ladder leans on a wall, the ladder is the hypotenuse: with a 6.5 m ladder and 6 m of wall, the foot is 2.5 m away. Between two points of the plane, the legs are the differences in $x$ and in $y$, and the distance is the hypotenuse.'
        ),
        examplePrompt: say('Zer distantzia dago $A=(-2,1)$ eta $B=(10,6)$ puntuen artean?', '¿Qué distancia hay entre $A=(-2,1)$ y $B=(10,6)$?', 'ما المسافة بين $A=(-2,1)$ و$B=(10,6)$؟', 'How far apart are $A=(-2,1)$ and $B=(10,6)$?'),
        example: same('$AB=\\sqrt{12^{2}+5^{2}}=\\sqrt{169}=13$'),
        exampleAnswer: say('13: katetoak $10-(-2)=12$ eta $6-1=5$ dira.', '13: los catetos son $10-(-2)=12$ y $6-1=5$.', '13: الضلعان القائمان $10-(-2)=12$ و$6-1=5$.', '13: the legs are $10-(-2)=12$ and $6-1=5$.')
    },
    'polygon-areas': {
        vocabulary: [
            say('oinarria', 'base', 'القاعدة', 'base'),
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('perpendikularra', 'perpendicular', 'عمودي', 'perpendicular')
        ],
        explanation: say(
            'Paralelogramoa: oinarria bider altuera, $b\\cdot h$. Triangelua haren erdia da: $\\frac{b\\cdot h}{2}$. Trapezioa: oinarrien batez bestekoa bider altuera, $\\frac{(B+b)\\cdot h}{2}$. Erronboa: $\\frac{D\\cdot d}{2}$. Altuera beti da oinarriarekiko perpendikularra, ez alde makurtua.',
            'Paralelogramo: base por altura, $b\\cdot h$. El triángulo es la mitad: $\\frac{b\\cdot h}{2}$. Trapecio: la media de las bases por la altura, $\\frac{(B+b)\\cdot h}{2}$. Rombo: $\\frac{D\\cdot d}{2}$. La altura siempre es perpendicular a la base, no el lado inclinado.',
            'متوازي الأضلاع: القاعدة في الارتفاع $b\\cdot h$. والمثلث نصفه: $\\frac{b\\cdot h}{2}$. وشبه المنحرف: متوسط القاعدتين في الارتفاع $\\frac{(B+b)\\cdot h}{2}$. والمعيّن: $\\frac{D\\cdot d}{2}$. والارتفاع عمودي دائمًا على القاعدة، وليس الضلع المائل.',
            'Parallelogram: base times height, $b\\cdot h$. The triangle is half of it: $\\frac{b\\cdot h}{2}$. Trapezium: the mean of the bases times the height, $\\frac{(B+b)\\cdot h}{2}$. Rhombus: $\\frac{D\\cdot d}{2}$. The height is always perpendicular to the base, not the slanting side.'
        ),
        examplePrompt: say('Erronbo baten diagonalek 14 cm eta 9 cm neurtzen dituzte. Zein da haren azalera?', 'Un rombo tiene diagonales de 14 cm y 9 cm. ¿Cuál es su área?', 'قطرا معيّن 14 سم و9 سم. ما مساحته؟', 'A rhombus has diagonals of 14 cm and 9 cm. What is its area?'),
        example: same('$\\frac{14\\cdot 9}{2}=63$'),
        exampleAnswer: say('63 cm²: diagonalen biderkaduraren erdia.', '63 cm²: la mitad del producto de las diagonales.', '63 سم²: نصف حاصل ضرب القطرين.', '63 cm²: half the product of the diagonals.')
    },
    'regular-area': {
        vocabulary: [
            say('apotema', 'apotema', 'العامد', 'apothem'),
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter'),
            say('erradioa', 'radio', 'نصف القطر', 'radius')
        ],
        explanation: say(
            'Poligono erregular bat zentrotik $n$ triangelu berdinetan banatzen da, aldea oinarri eta apotema altuera dituztela. Horregatik haren azalera $A=\\frac{P\\cdot a}{2}$ da, $P$ perimetroa eta $a$ apotema izanik. Apotema ezagutzen ez baduzu, aurkitu Pitagorasekin eta erradioarekin: $a^{2}=r^{2}-\\left(\\frac{l}{2}\\right)^{2}$.',
            'Un polígono regular se divide desde el centro en $n$ triángulos iguales, con base el lado y altura la apotema. Por eso su área es $A=\\frac{P\\cdot a}{2}$, con $P$ el perímetro y $a$ la apotema. Si no conoces la apotema, hállala con Pitágoras y el radio: $a^{2}=r^{2}-\\left(\\frac{l}{2}\\right)^{2}$.',
            'ينقسم المضلع المنتظم من مركزه إلى $n$ مثلثًا متساويًا، قاعدة كل منها الضلع وارتفاعه العامد. لذلك مساحته $A=\\frac{P\\cdot a}{2}$ حيث $P$ المحيط و$a$ العامد. وإذا لم تعرف العامد فجده بفيثاغورس: $a^{2}=r^{2}-\\left(\\frac{l}{2}\\right)^{2}$ بنصف القطر.',
            'A regular polygon splits from the centre into $n$ equal triangles, with the side as base and the apothem as height. That is why its area is $A=\\frac{P\\cdot a}{2}$, with $P$ the perimeter and $a$ the apothem. If you do not know the apothem, find it with Pythagoras and the radius: $a^{2}=r^{2}-\\left(\\frac{l}{2}\\right)^{2}$.'
        ),
        examplePrompt: say('Hexagono erregular batek 10 cm-ko aldea eta 8,7 cm-ko apotema ditu. Zein da haren azalera?', 'Un hexágono regular tiene 10 cm de lado y 8,7 cm de apotema. ¿Cuál es su área?', 'مسدس منتظم ضلعه 10 سم وعامده 8.7 سم. ما مساحته؟', 'A regular hexagon has a side of 10 cm and an apothem of 8.7 cm. What is its area?'),
        example: same('$\\frac{60\\cdot 8{,}7}{2}=261$'),
        exampleAnswer: say('261 cm²: perimetroa $6\\cdot 10=60$ cm da.', '261 cm²: el perímetro es $6\\cdot 10=60$ cm.', '261 سم²: المحيط $6\\cdot 10=60$ سم.', '261 cm²: the perimeter is $6\\cdot 10=60$ cm.')
    },
    'circle-areas': {
        definitions: [
            {
                term: say('Sektore zirkularra', 'Sector circular', 'القطاع الدائري', 'Sector'),
                meaning: say('Zirkuluaren zatia, bi erradioren artean.', 'La parte del círculo entre dos radios.', 'جزء الدائرة بين نصفي قطر.', 'The part of a circle between two radii.')
            }
        ],
        vocabulary: [
            say('erradioa', 'radio', 'نصف القطر', 'radius'),
            say('arkua', 'arco', 'القوس', 'arc'),
            say('koroa zirkularra', 'corona circular', 'الحلقة الدائرية', 'annulus')
        ],
        explanation: say(
            'Zirkunferentziaren luzera $2\\pi r$ da, eta zirkuluaren azalera, $\\pi r^{2}$. $\\alpha$ graduko arkua eta sektorea osoaren $\\frac{\\alpha}{360°}$ dira: 90°-ko sektorea zirkuluaren laurdena da. Koroa zirkularrak, bi zirkulu zentrokideren artean, $\\pi(R^{2}-r^{2})$ neurtzen du. Erabili $\\pi\\approx 3{,}14$.',
            'La longitud de la circunferencia es $2\\pi r$, y el área del círculo, $\\pi r^{2}$. El arco y el sector de $\\alpha$ grados son $\\frac{\\alpha}{360°}$ del total: el sector de 90° es un cuarto del círculo. La corona circular, entre dos círculos concéntricos, mide $\\pi(R^{2}-r^{2})$. Usa $\\pi\\approx 3{,}14$.',
            'طول الدائرة $2\\pi r$ ومساحة القرص $\\pi r^{2}$. والقوس والقطاع اللذان زاويتهما $\\alpha$ درجة هما $\\frac{\\alpha}{360°}$ من الكل: قطاع 90° ربع القرص. والحلقة الدائرية بين دائرتين متحدتي المركز مساحتها $\\pi(R^{2}-r^{2})$. استعمل $\\pi\\approx 3{,}14$.',
            'The length of the circle is $2\\pi r$, and the area of the disc, $\\pi r^{2}$. The arc and the sector of $\\alpha$ degrees are $\\frac{\\alpha}{360°}$ of the whole: the 90° sector is a quarter of the circle. The annulus, between two circles with the same centre, measures $\\pi(R^{2}-r^{2})$. Use $\\pi\\approx 3{,}14$.'
        ),
        examplePrompt: say('Aurkitu 7 cm eta 3 cm-ko erradioak dituen koroa baten azalera.', 'Halla el área de una corona de radios 7 cm y 3 cm.', 'جد مساحة حلقة نصفا قطريها 7 سم و3 سم.', 'Find the area of an annulus with radii 7 cm and 3 cm.'),
        example: same('$\\pi(7^{2}-3^{2})=40\\pi\\approx 125{,}6$'),
        exampleAnswer: say('125,6 cm² inguru: zirkulu handia ken txikia.', 'Unos 125,6 cm²: el círculo grande menos el pequeño.', 'نحو 125.6 سم²: القرص الكبير ناقص الصغير.', 'About 125.6 cm²: the big disc minus the small one.')
    },
    thales: {
        vocabulary: [
            say('paraleloak', 'paralelas', 'متوازية', 'parallel'),
            say('zuzenki-zatiak', 'segmentos', 'القطع المستقيمة', 'segments'),
            say('proportzioa', 'proporción', 'التناسب', 'proportion')
        ],
        explanation: say(
            'Bi zuzen ebakitzaile zuzen paraleloek mozten badituzte, batean sortzen diren zuzenki-zatiak bestekoekin proportzionalak dira: $\\frac{AB}{A^{\\prime}B^{\\prime}}=\\frac{BC}{B^{\\prime}C^{\\prime}}$. Triangelu batean, alde baten paraleloak beste triangelu antzeko bat sortzen du. Idatzi proportzioa eta ebatzi gurutzeko biderkadurarekin.',
            'Si dos rectas secantes se cortan por rectas paralelas, los segmentos que se forman en una son proporcionales a los de la otra: $\\frac{AB}{A^{\\prime}B^{\\prime}}=\\frac{BC}{B^{\\prime}C^{\\prime}}$. En un triángulo, una paralela a un lado forma otro triángulo semejante. Escribe la proporción y resuelve con el producto cruzado.',
            'إذا قطعت مستقيمات متوازية مستقيمين متقاطعين فإن القطع المستقيمة على أحدهما تتناسب مع القطع على الآخر: $\\frac{AB}{A^{\\prime}B^{\\prime}}=\\frac{BC}{B^{\\prime}C^{\\prime}}$. وفي المثلث يكوّن مستقيم موازٍ لضلع مثلثًا آخر مشابهًا. اكتب التناسب وحلّ بالضرب التبادلي.',
            'If two crossing lines are cut by parallel lines, the segments on one are proportional to those on the other: $\\frac{AB}{A^{\\prime}B^{\\prime}}=\\frac{BC}{B^{\\prime}C^{\\prime}}$. In a triangle, a line parallel to one side makes another similar triangle. Write the proportion and solve with the cross product.'
        ),
        examplePrompt: say('Paralelo berekin, $AB=5$, $BC=8$ eta $A^{\\prime}B^{\\prime}=7{,}5$. Zenbat neurtzen du $B^{\\prime}C^{\\prime}$ zuzenki-zatiak?', 'Con las mismas paralelas, $AB=5$, $BC=8$ y $A^{\\prime}B^{\\prime}=7{,}5$. ¿Cuánto mide $B^{\\prime}C^{\\prime}$?', 'بالمتوازيات نفسها $AB=5$ و$BC=8$ و$A^{\\prime}B^{\\prime}=7{,}5$. كم طول $B^{\\prime}C^{\\prime}$؟', 'With the same parallels, $AB=5$, $BC=8$ and $A^{\\prime}B^{\\prime}=7{,}5$. How long is $B^{\\prime}C^{\\prime}$?'),
        example: same('$\\frac{5}{7{,}5}=\\frac{8}{x}\\ \\to\\ x=\\frac{8\\cdot 7{,}5}{5}=12$'),
        exampleAnswer: say('12: bi zuzenetan ordena bera.', '12: el mismo orden en las dos rectas.', '12: الترتيب نفسه على المستقيمين.', '12: the same order on both lines.')
    },
    'similar-triangles': {
        definitions: [
            {
                term: say('Antzekotasun-arrazoia', 'Razón de semejanza', 'نسبة التشابه', 'Scale factor'),
                meaning: say('Bi irudi antzekoren alde homologoen arteko $k$ zatidura.', 'El cociente $k$ entre lados homólogos de dos figuras semejantes.', 'حاصل القسمة $k$ بين الأضلاع المتناظرة في شكلين متشابهين.', 'The quotient $k$ of corresponding sides of two similar figures.')
            }
        ],
        vocabulary: [
            say('irizpideak', 'criterios', 'المعايير', 'criteria'),
            say('angeluak', 'ángulos', 'الزوايا', 'angles'),
            say('proportzionalak', 'proporcionales', 'متناسبة', 'proportional')
        ],
        explanation: say(
            'Bi triangelu antzekoak dira angelu berdinak eta alde proportzionalak badituzte. Nahikoa da irizpide hauetako bat: bi angelu berdin; hiru alde proportzional; edo bi alde proportzional eta haien arteko angelua berdina. Alde guztiak $k$ aldiz handiagoak dira.',
            'Dos triángulos son semejantes si tienen los ángulos iguales y los lados proporcionales. Basta con uno de estos criterios: dos ángulos iguales; los tres lados proporcionales; o dos lados proporcionales y el ángulo entre ellos igual. Todos los lados son $k$ veces mayores.',
            'يتشابه مثلثان إذا كانت زواياهما متساوية وأضلاعهما متناسبة. ويكفي أحد هذه المعايير: زاويتان متساويتان، أو الأضلاع الثلاثة متناسبة، أو ضلعان متناسبان والزاوية بينهما متساوية. وكل الأضلاع أكبر بـ $k$ مرة.',
            'Two triangles are similar if they have equal angles and proportional sides. One of these criteria is enough: two equal angles; all three sides proportional; or two sides proportional and the angle between them equal. All the sides are $k$ times bigger.'
        ),
        examplePrompt: say('Triangelu batek 4, 6 eta 7 cm-ko aldeak ditu. Antzeko batek 10 cm-ko alde txikiena du. Zenbat neurtzen dute besteek?', 'Un triángulo tiene lados de 4, 6 y 7 cm. Otro semejante tiene el lado menor de 10 cm. ¿Cuánto miden los otros?', 'مثلث أضلاعه 4 و6 و7 سم. ومثلث مشابه له أصغر أضلاعه 10 سم. كم طول الضلعين الآخرين؟', 'A triangle has sides of 4, 6 and 7 cm. A similar one has its shortest side 10 cm. How long are the others?'),
        example: same('$k=\\frac{10}{4}=2{,}5\\qquad 6\\cdot 2{,}5=15\\qquad 7\\cdot 2{,}5=17{,}5$'),
        exampleAnswer: say('15 cm eta 17,5 cm: alde guztiak bider $k$.', '15 cm y 17,5 cm: todos los lados por $k$.', '15 سم و17.5 سم: كل الأضلاع في $k$.', '15 cm and 17.5 cm: every side times $k$.')
    },
    'scale-areas': {
        vocabulary: [
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter'),
            say('azalera', 'área', 'المساحة', 'area'),
            say('eskala', 'escala', 'مقياس', 'scale')
        ],
        explanation: say(
            'Bi irudi antzekoren arrazoia $k$ bada, perimetroena ere $k$ da, baina azalerena $k^{2}$. 1, 2 eta 3 aldeko karratuek 1, 4 eta 9 azalera dituzte. Eskala bat, $1\\mathbin{:}500$ bezala, antzekotasun-arrazoi bat da.',
            'Si la razón de dos figuras semejantes es $k$, la de los perímetros también es $k$, pero la de las áreas es $k^{2}$. Los cuadrados de lado 1, 2 y 3 tienen áreas 1, 4 y 9. Una escala, como $1\\mathbin{:}500$, es una razón de semejanza.',
            'إذا كانت نسبة شكلين متشابهين $k$ فنسبة المحيطين $k$ أيضًا، لكن نسبة المساحتين $k^{2}$. والمربعات التي أضلاعها 1 و2 و3 مساحاتها 1 و4 و9. والمقياس مثل $1\\mathbin{:}500$ نسبة تشابه.',
            'If the ratio of two similar figures is $k$, that of the perimeters is also $k$, but that of the areas is $k^{2}$. Squares of side 1, 2 and 3 have areas 1, 4 and 9. A scale, like $1\\mathbin{:}500$, is a scale factor.'
        ),
        examplePrompt: say('$1\\mathbin{:}100$ eskalako plano batean, gela batek 12 cm² ditu. Zenbat neurtzen du benetan?', 'En un plano a escala $1\\mathbin{:}100$, una habitación mide 12 cm². ¿Cuánto mide en realidad?', 'في مخطط بمقياس $1\\mathbin{:}100$ مساحة غرفة 12 سم². كم مساحتها في الواقع؟', 'On a plan at scale $1\\mathbin{:}100$, a room measures 12 cm². How big is it really?'),
        example: same('$12\\cdot 100^{2}=120\\,000$'),
        exampleAnswer: say('120 000 cm², hau da, 12 m².', '120 000 cm², es decir, 12 m².', '120 000 سم²، أي 12 م².', '120,000 cm², that is, 12 m².'),
        why: {
            text: say(
                '3 bider 2 laukizuzen bat $k=2$ arrazoiarekin handituta 6 bider 4 da: haren azalera 6 zenbakitik 24 zenbakira pasatzen da, lau aldiz gehiago, luzera eta zabalera biak bikoizten direlako.',
                'Un rectángulo de 3 por 2 ampliado con $k=2$ mide 6 por 4: su área pasa de 6 a 24, cuatro veces más, porque se dobla el largo y también el ancho.',
                'مستطيل بُعداه 3 و2 إذا كُبّر بـ $k=2$ صار 6 و4: تنتقل مساحته من 6 إلى 24، أي أربعة أضعاف، لأن الطول يتضاعف وكذلك العرض.',
                'A 3 by 2 rectangle enlarged with $k=2$ is 6 by 4: its area goes from 6 to 24, four times as much, because the length doubles and so does the width.'
            ),
            math: same('$6\\cdot 4=24=2^{2}\\cdot 6$')
        }
    }
}

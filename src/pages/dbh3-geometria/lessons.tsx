import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AngleSumFigure, CentersFigure, CircleAnglesFigure, RegularAnglesFigure, SectorRingFigure } from '../dbh1-figurak-v2/figures'
import { ApothemFigure, HypotenuseFigure, IsoscelesHeightFigure, LadderFigure } from '../dbh2-pitagoras-v2/figures'
import { CriteriaFigure, RatiosFigure, ThalesFigure } from '../dbh4-aplikatuak-antzekotasuna/figures'
import { PolygonAreasFigure } from '../dbh4-aplikatuak-areak/figures'
import { AngleBisectorFigure, PerpendicularBisectorFigure } from './figures'
import { say, same } from './text'

/* ==========================================================================
   Planoko geometria · 3. DBH — stages and lessons, following Santillana
   3.º ESO unit 8 «Geometría plana» (loci, angles in polygons and in the
   circle, notable lines of a triangle, Pythagoras, areas, circular
   figures) and Anaya 3.º ESO unit 10 «Problemas métricos en el plano»
   (Pythagoras, similarity and Thales, areas). Every number and context is
   original: the books only fix the scope and the order. Each lesson names
   its typical mistake.
   ========================================================================== */

export type Geometry3StageId = 'angles' | 'loci' | 'pythagoras' | 'areas' | 'similarity'

export const geometry3Stages: UnitStage[] = [
    { id: 'angles', tone: 'blue', title: { eu: 'Angeluak', es: 'Ángulos', en: 'Angles', ar: 'الزوايا' } },
    { id: 'loci', tone: 'violet', title: { eu: 'Leku geometrikoak', es: 'Lugares geométricos', en: 'Loci', ar: 'المحلات الهندسية' } },
    { id: 'pythagoras', tone: 'mustard', title: { eu: 'Pitagoras', es: 'Pitágoras', en: 'Pythagoras', ar: 'فيثاغورس' } },
    { id: 'areas', tone: 'coral', title: { eu: 'Azalerak', es: 'Áreas', en: 'Areas', ar: 'المساحات' } },
    { id: 'similarity', tone: 'green', title: { eu: 'Antzekotasuna', es: 'Semejanza', en: 'Similarity', ar: 'التشابه' } }
]

export const geometry3Topics: UnitTopic[] = [
    /* ---------- 1. Angles ---------- */
    {
        id: 'polygon-angles',
        stage: 'angles',
        title: say('Poligonoen angeluak', 'Ángulos de los polígonos', 'زوايا المضلعات', 'Angles of polygons'),
        goal: say('Poligono baten barne-angeluen batura kalkulatzea.', 'Calcular la suma de los ángulos interiores de un polígono.', 'حساب مجموع الزوايا الداخلية لمضلع.', 'Work out the sum of the interior angles of a polygon.'),
        explanation: say(
            'Triangelu baten angeluek 180° batzen dute. $n$ aldeko poligono bat, erpin batetik diagonalak marraztuta, $n-2$ triangelutan banatzen da; beraz, haren barne-angeluek $(n-2)\\cdot 180°$ batzen dute. Laukiak: 360°; pentagonoak: 540°; hexagonoak: 720°. Kanpo-angeluek, berriz, beti 360° batzen dute, edozein dela aldeen kopurua.',
            'Los ángulos de un triángulo suman 180°. Un polígono de $n$ lados, trazando las diagonales desde un vértice, se divide en $n-2$ triángulos; por eso sus ángulos interiores suman $(n-2)\\cdot 180°$. Cuadrilátero: 360°; pentágono: 540°; hexágono: 720°. Los ángulos exteriores, en cambio, suman siempre 360°, tenga los lados que tenga.',
            'مجموع زوايا المثلث 180°. والمضلع ذو $n$ ضلعًا ينقسم برسم الأقطار من رأس واحد إلى $n-2$ مثلثًا؛ لذا مجموع زواياه الداخلية $(n-2)\\cdot 180°$. الرباعي: 360°؛ الخماسي: 540°؛ السداسي: 720°. أما الزوايا الخارجية فمجموعها دائمًا 360° مهما كان عدد الأضلاع.',
            'The angles of a triangle add up to 180°. A polygon with $n$ sides, drawing the diagonals from one vertex, splits into $n-2$ triangles; so its interior angles add up to $(n-2)\\cdot 180°$. Quadrilateral: 360°; pentagon: 540°; hexagon: 720°. The exterior angles, on the other hand, always add up to 360°, whatever the number of sides.'
        ),
        problem: say('Pentagono baten lau angeluk 100°, 110°, 95° eta 120° neurtzen dute. Zenbat da bosgarrena?', 'Cuatro ángulos de un pentágono miden 100°, 110°, 95° y 120°. ¿Cuánto mide el quinto?', 'أربع زوايا لخماسي قياساتها 100° و110° و95° و120°. كم قياس الخامسة؟', 'Four angles of a pentagon measure 100°, 110°, 95° and 120°. How big is the fifth?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Angeluen batura.', 'Suma de los ángulos.', 'مجموع الزوايا.', 'Sum of the angles.'), math: same('$(5-2)\\cdot 180°=540°$') },
            { text: say('Kendu ezagunak.', 'Resta los conocidos.', 'اطرح المعلومة.', 'Subtract the known ones.'), math: same('$540°-425°=115°$') }
        ],
        example: same('$(8-2)\\cdot 180°=1080°$'),
        mistake: {
            wrong: say('Hexagono baten angeluek $6\\cdot 180°=1080°$ batzen dute.', 'Los ángulos de un hexágono suman $6\\cdot 180°=1080°$.', 'مجموع زوايا السداسي $6\\cdot 180°=1080°$.', 'The angles of a hexagon add up to $6\\cdot 180°=1080°$.'),
            right: say('Hexagonoa 4 triangelutan banatzen da, ez 6: $(6-2)\\cdot 180°=720°$.', 'El hexágono se divide en 4 triángulos, no en 6: $(6-2)\\cdot 180°=720°$.', 'ينقسم السداسي إلى 4 مثلثات لا 6: $(6-2)\\cdot 180°=720°$.', 'The hexagon splits into 4 triangles, not 6: $(6-2)\\cdot 180°=720°$.')
        },
        takeaway: say('Barnekoak: $(N-2)\\cdot 180°$. Kanpokoak: $360°$.', 'Interiores: $(N-2)\\cdot 180°$. Exteriores: $360°$.', 'الداخلية: $(N-2)\\cdot 180°$. الخارجية: $360°$.', 'Interior: $(N-2)\\cdot 180°$. Exterior: $360°$.'),
        figure: (language) => <AngleSumFigure language={language} />
    },
    {
        id: 'regular-polygons',
        stage: 'angles',
        title: say('Poligono erregularren angeluak', 'Ángulos de los polígonos regulares', 'زوايا المضلعات المنتظمة', 'Angles of regular polygons'),
        goal: say('Poligono erregular baten barne-angelua, kanpo-angelua eta angelu zentrala kalkulatzea.', 'Calcular el ángulo interior, el exterior y el central de un polígono regular.', 'حساب الزاوية الداخلية والخارجية والمركزية لمضلع منتظم.', 'Work out the interior, exterior and central angle of a regular polygon.'),
        explanation: say(
            'Poligono erregular batean angelu guztiak berdinak dira. Angelu zentrala (zentrotik bi erpin jarraietara) $360°\\div n$ da, eta kanpo-angelua ere bai. Barne-angelua kanpo-angeluaren osagarria da: $180°-\\frac{360°}{n}$. Hexagono erregularrean: zentrala 60°, barnekoa 120°.',
            'En un polígono regular todos los ángulos son iguales. El ángulo central (desde el centro a dos vértices seguidos) es $360°\\div n$, y el exterior también. El ángulo interior es el suplementario del exterior: $180°-\\frac{360°}{n}$. En el hexágono regular: central 60°, interior 120°.',
            'في المضلع المنتظم كل الزوايا متساوية. والزاوية المركزية (من المركز إلى رأسين متتاليين) $360°\\div n$، وكذلك الخارجية. والزاوية الداخلية مكمّلة الخارجية: $180°-\\frac{360°}{n}$. في السداسي المنتظم: المركزية 60° والداخلية 120°.',
            'In a regular polygon all the angles are equal. The central angle (from the centre to two consecutive vertices) is $360°\\div n$, and so is the exterior angle. The interior angle is the supplement of the exterior one: $180°-\\frac{360°}{n}$. In the regular hexagon: central 60°, interior 120°.'
        ),
        problem: say('Zenbat neurtzen du oktogono erregular baten barne-angeluak?', '¿Cuánto mide el ángulo interior de un octógono regular?', 'كم قياس الزاوية الداخلية لمثمن منتظم؟', 'How big is the interior angle of a regular octagon?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kanpo-angelua.', 'Ángulo exterior.', 'الزاوية الخارجية.', 'Exterior angle.'), math: same('$360°\\div 8=45°$') },
            { text: say('Barnekoa, osagarria.', 'El interior, su suplementario.', 'الداخلية مكمّلتها.', 'The interior one, its supplement.'), math: same('$180°-45°=135°$') }
        ],
        example: same('$\\frac{(5-2)\\cdot 180°}{5}=108°$'),
        mistake: {
            wrong: say('Pentagono erregularraren barne-angelua: $360°\\div 5=72°$.', 'Ángulo interior del pentágono regular: $360°\\div 5=72°$.', 'الزاوية الداخلية للخماسي المنتظم: $360°\\div 5=72°$.', 'Interior angle of the regular pentagon: $360°\\div 5=72°$.'),
            right: say('$72°$ kanpo-angelua (eta zentrala) da. Barnekoa: $180°-72°=108°$.', '$72°$ es el exterior (y el central). El interior: $180°-72°=108°$.', '$72°$ هي الخارجية (والمركزية). الداخلية: $180°-72°=108°$.', '$72°$ is the exterior (and central) angle. The interior one: $180°-72°=108°$.')
        },
        takeaway: say('Zentrala = kanpokoa = $\\frac{360°}{N}$; barnekoa = $180°-\\frac{360°}{N}$.', 'Central = exterior = $\\frac{360°}{N}$; interior = $180°-\\frac{360°}{N}$.', 'المركزية = الخارجية = $\\frac{360°}{N}$؛ الداخلية = $180°-\\frac{360°}{N}$.', 'Central = exterior = $\\frac{360°}{N}$; interior = $180°-\\frac{360°}{N}$.'),
        figure: (language) => <RegularAnglesFigure language={language} />
    },
    {
        id: 'circle-angles',
        stage: 'angles',
        title: say('Angeluak zirkunferentzian', 'Ángulos en la circunferencia', 'الزوايا في الدائرة', 'Angles in a circle'),
        goal: say('Angelu inskribatua angelu zentralaren erdia dela erabiltzea.', 'Usar que el ángulo inscrito es la mitad del central.', 'استعمال أن الزاوية المحيطية نصف المركزية.', 'Use the fact that an inscribed angle is half the central angle.'),
        explanation: say(
            'Angelu zentralak erpina zirkunferentziaren zentroan du; angelu inskribatuak, zirkunferentzian bertan. Arku bera hartzen badute, inskribatua zentralaren erdia da. Ondorioz, arku bera hartzen duten inskribatu guztiak berdinak dira, eta diametro bat hartzen duen inskribatua beti zuzena da (90°), zentrala 180° baita.',
            'El ángulo central tiene el vértice en el centro de la circunferencia; el inscrito, sobre la propia circunferencia. Si abarcan el mismo arco, el inscrito es la mitad del central. Por eso todos los inscritos que abarcan el mismo arco son iguales, y el que abarca un diámetro siempre es recto (90°), porque el central mide 180°.',
            'رأس الزاوية المركزية في مركز الدائرة، ورأس المحيطية على الدائرة نفسها. وإذا كانتا تحصران القوس نفسه فالمحيطية نصف المركزية. لذلك كل المحيطيات على القوس نفسه متساوية، والمحيطية المرسومة على قطر قائمة دائمًا (90°) لأن المركزية 180°.',
            'A central angle has its vertex at the centre of the circle; an inscribed angle, on the circle itself. If they span the same arc, the inscribed angle is half the central one. So all inscribed angles on the same arc are equal, and one that spans a diameter is always a right angle (90°), because the central one is 180°.'
        ),
        problem: say('Angelu zentral batek 130° neurtzen du. Zenbat arku bera hartzen duen inskribatuak?', 'Un ángulo central mide 130°. ¿Cuánto mide el inscrito que abarca el mismo arco?', 'زاوية مركزية قياسها 130°. كم قياس المحيطية التي تحصر القوس نفسه؟', 'A central angle measures 130°. How big is the inscribed angle on the same arc?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erdia.', 'La mitad.', 'النصف.', 'Half.'), math: same('$130°\\div 2=65°$') }
        ],
        example: same('$180°\\div 2=90°$'),
        mistake: {
            wrong: say('Inskribatua zentralaren bikoitza da: $2\\cdot 40°=80°$.', 'El inscrito es el doble del central: $2\\cdot 40°=80°$.', 'المحيطية ضعف المركزية: $2\\cdot 40°=80°$.', 'The inscribed angle is twice the central one: $2\\cdot 40°=80°$.'),
            right: say('Alderantziz: zentrala da bikoitza. $40°$ zentralaren inskribatua $20°$ da.', 'Al revés: el central es el doble. El inscrito de un central de $40°$ mide $20°$.', 'بالعكس: المركزية هي الضعف. محيطية مركزية $40°$ قياسها $20°$.', 'The other way round: the central one is twice. The inscribed angle for a central $40°$ is $20°$.')
        },
        takeaway: say('Inskribatua: $\\beta=\\frac{\\alpha}{2}$, $\\alpha$ zentrala izanik.', 'Inscrito: $\\beta=\\frac{\\alpha}{2}$, con $\\alpha$ el central.', 'المحيطية: $\\beta=\\frac{\\alpha}{2}$، حيث $\\alpha$ المركزية.', 'Inscribed: $\\beta=\\frac{\\alpha}{2}$, where $\\alpha$ is the central angle.'),
        figure: (language) => <CircleAnglesFigure language={language} />
    },
    /* ---------- 2. Loci ---------- */
    {
        id: 'perpendicular-bisector',
        stage: 'loci',
        title: say('Segmentu baten erdibitzailea', 'La mediatriz de un segmento', 'المنصّف العمودي لقطعة', 'The perpendicular bisector'),
        goal: say('Bi puntutatik distantzia berera dauden puntuak ezagutzea.', 'Reconocer los puntos que están a la misma distancia de dos puntos.', 'التعرّف على النقاط المتساوية البعد عن نقطتين.', 'Recognise the points that are the same distance from two points.'),
        explanation: say(
            'Leku geometriko bat propietate bera betetzen duten puntuen multzoa da. $A$ eta $B$ puntuetatik distantzia berera dauden puntuek zuzen bat osatzen dute: $AB$ segmentuaren erdibitzailea. Segmentuarekiko perpendikularra da eta erdiko puntutik igarotzen da. Zirkunferentzia bat ere leku geometrikoa da: zentrotik distantzia berera ($r$) dauden puntuak.',
            'Un lugar geométrico es el conjunto de puntos que cumplen una misma propiedad. Los puntos que están a la misma distancia de $A$ y de $B$ forman una recta: la mediatriz del segmento $AB$. Es perpendicular al segmento y pasa por su punto medio. La circunferencia también es un lugar geométrico: los puntos que están a la misma distancia ($r$) del centro.',
            'المحل الهندسي مجموعة النقاط التي تحقق خاصية واحدة. والنقاط المتساوية البعد عن $A$ و$B$ تشكّل مستقيمًا: المنصّف العمودي للقطعة $AB$. وهو عمودي على القطعة ويمرّ بمنتصفها. والدائرة أيضًا محل هندسي: النقاط التي على البعد نفسه ($r$) من المركز.',
            'A locus is the set of points that share a property. The points that are the same distance from $A$ and from $B$ form a line: the perpendicular bisector of the segment $AB$. It is perpendicular to the segment and goes through its midpoint. A circle is a locus too: the points at the same distance ($r$) from the centre.'
        ),
        problem: say('$A=(1,2)$ eta $B=(7,2)$. Zein zuzen da haien erdibitzailea?', '$A=(1,2)$ y $B=(7,2)$. ¿Qué recta es su mediatriz?', '$A=(1,2)$ و$B=(7,2)$. ما المنصّف العمودي؟', '$A=(1,2)$ and $B=(7,2)$. Which line is their perpendicular bisector?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erdiko puntua.', 'El punto medio.', 'المنتصف.', 'The midpoint.'), math: same('$\\left(\\frac{1+7}{2},2\\right)=(4,2)$') },
            { text: say('Segmentua horizontala da: erdibitzailea bertikala.', 'El segmento es horizontal: la mediatriz es vertical.', 'القطعة أفقية: المنصّف عمودي.', 'The segment is horizontal: the bisector is vertical.'), math: same('$x=4$') }
        ],
        example: same('$P=(4,6)\\ \\to\\ PA=PB=5$'),
        mistake: {
            wrong: say('Erdibitzailea $A$ eta $B$ lotzen dituen zuzena da.', 'La mediatriz es la recta que une $A$ y $B$.', 'المنصّف العمودي هو المستقيم الواصل بين $A$ و$B$.', 'The perpendicular bisector is the line joining $A$ and $B$.'),
            right: say('Ez: segmentua perpendikularki ebakitzen du, erdian.', 'No: corta al segmento perpendicularmente, por su punto medio.', 'لا: يقطع القطعة عموديًا في منتصفها.', 'No: it cuts the segment at right angles, through its midpoint.')
        },
        takeaway: say('Erdibitzailea: $PA=PB$ betetzen duten puntuak.', 'Mediatriz: los puntos con $PA=PB$.', 'المنصّف العمودي: النقاط التي فيها $PA=PB$.', 'Perpendicular bisector: the points with $PA=PB$.'),
        figure: (language) => <PerpendicularBisectorFigure language={language} />
    },
    {
        id: 'angle-bisector',
        stage: 'loci',
        title: say('Angelu baten erdikaria', 'La bisectriz de un ángulo', 'منصّف الزاوية', 'The angle bisector'),
        goal: say('Angelu baten bi aldeetatik distantzia berera dauden puntuak ezagutzea.', 'Reconocer los puntos que están a la misma distancia de los dos lados de un ángulo.', 'التعرّف على النقاط المتساوية البعد عن ضلعي زاوية.', 'Recognise the points that are the same distance from the two sides of an angle.'),
        explanation: say(
            'Angelu baten erdikaria angelua bi angelu berdinetan banatzen duen zuzenerdia da. Haren puntu bakoitza angeluaren bi aldeetatik distantzia berera dago (distantzia, aldearekiko perpendikularra neurtuta). Triangelu baten hiru erdikariak puntu batean elkartzen dira, eta puntu hori hiru aldeetatik distantzia berera dago.',
            'La bisectriz de un ángulo es la semirrecta que lo divide en dos ángulos iguales. Cada uno de sus puntos está a la misma distancia de los dos lados del ángulo (la distancia se mide en perpendicular al lado). Las tres bisectrices de un triángulo se cortan en un punto que está a la misma distancia de los tres lados.',
            'منصّف الزاوية نصف مستقيم يقسمها إلى زاويتين متساويتين. وكل نقطة منه على البعد نفسه من ضلعي الزاوية (يُقاس البعد عموديًا على الضلع). وتتلاقى منصّفات المثلث الثلاثة في نقطة على البعد نفسه من الأضلاع الثلاثة.',
            'The bisector of an angle is the ray that splits it into two equal angles. Each of its points is the same distance from both sides of the angle (distance measured at right angles to the side). The three angle bisectors of a triangle meet at a point that is the same distance from all three sides.'
        ),
        problem: say('Angelu batek 76° neurtzen du. Zenbat neurtzen du erdikariak sortzen dituen angelu bakoitzak?', 'Un ángulo mide 76°. ¿Cuánto mide cada ángulo que forma su bisectriz?', 'زاوية قياسها 76°. كم قياس كل زاوية يكوّنها منصّفها؟', 'An angle measures 76°. How big is each angle its bisector makes?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erdibitu.', 'Divide entre dos.', 'اقسم على اثنين.', 'Halve it.'), math: same('$76°\\div 2=38°$') }
        ],
        example: same('$90°\\div 2=45°$'),
        mistake: {
            wrong: say('Erdikariaren puntu batetik aldeetarako distantzia, edozein zuzen zeiharretan neurtzen da.', 'La distancia de un punto de la bisectriz a los lados se mide por cualquier recta oblicua.', 'يُقاس بعد نقطة من المنصّف عن الضلعين على أي مستقيم مائل.', 'The distance from a point of the bisector to the sides is measured along any slanting line.'),
            right: say('Distantzia beti perpendikularrean neurtzen da: horrela bakarrik dira berdinak.', 'La distancia siempre se mide en perpendicular: solo así son iguales.', 'يُقاس البعد دائمًا عموديًا: وبذلك فقط يتساويان.', 'Distance is always measured at right angles: only then are they equal.')
        },
        takeaway: say('Erdikaria: bi ALDEETATIK distantzia berera.', 'Bisectriz: a la misma distancia de los dos LADOS.', 'المنصّف: على البعد نفسه من الضلعين.', 'Bisector: the same distance from both SIDES.'),
        figure: (language) => <AngleBisectorFigure language={language} />
    },
    {
        id: 'notable-points',
        stage: 'loci',
        title: say('Triangeluaren puntu nabarmenak', 'Puntos notables del triángulo', 'النقاط الشهيرة في المثلث', 'Notable points of a triangle'),
        goal: say('Zirkunzentroa, inzentroa, barizentroa eta ortozentroa bereiztea.', 'Distinguir circuncentro, incentro, baricentro y ortocentro.', 'التمييز بين مركز الدائرة المحيطة والمحاطة ومركز الثقل وملتقى الارتفاعات.', 'Tell the circumcentre, incentre, centroid and orthocentre apart.'),
        explanation: say(
            'Triangelu bateko hiru zuzen motak puntu batean ebakitzen dira. Erdibitzaileak zirkunzentroan: hiru erpinetatik distantzia berera dago, eta inguratzen duen zirkunferentziaren zentroa da. Erdikariak inzentroan: barneko zirkunferentziaren zentroa. Medianak (erpinetik aurkako aldearen erdira) barizentroan: masa-zentroa, medianaren $\\frac{2}{3}$ erpinetik. Altuerak ortozentroan.',
            'Las rectas de cada tipo de un triángulo se cortan en un punto. Las mediatrices, en el circuncentro: está a la misma distancia de los tres vértices y es el centro de la circunferencia circunscrita. Las bisectrices, en el incentro: centro de la circunferencia inscrita. Las medianas (de un vértice al punto medio del lado opuesto), en el baricentro: el centro de gravedad, a $\\frac{2}{3}$ de la mediana desde el vértice. Las alturas, en el ortocentro.',
            'تتلاقى مستقيمات كل نوع في المثلث في نقطة. المنصّفات العمودية في مركز الدائرة المحيطة: على البعد نفسه من الرؤوس الثلاثة. ومنصّفات الزوايا في مركز الدائرة المحاطة. والمتوسطات (من رأس إلى منتصف الضلع المقابل) في مركز الثقل، على $\\frac{2}{3}$ من المتوسط بدءًا من الرأس. والارتفاعات في ملتقى الارتفاعات.',
            'The lines of each kind in a triangle meet at one point. The perpendicular bisectors meet at the circumcentre: the same distance from the three vertices, the centre of the circumscribed circle. The angle bisectors meet at the incentre: the centre of the inscribed circle. The medians (from a vertex to the midpoint of the opposite side) meet at the centroid: the centre of mass, $\\frac{2}{3}$ of the way along each median from the vertex. The altitudes meet at the orthocentre.'
        ),
        cases: [
            { title: say('Zirkunzentroa', 'Circuncentro', 'مركز الدائرة المحيطة', 'Circumcentre'), text: say('Erdibitzaileak. Kanpoan egon daiteke.', 'Mediatrices. Puede quedar fuera.', 'المنصّفات العمودية. قد يقع خارجًا.', 'Perpendicular bisectors. It can lie outside.') },
            { title: say('Inzentroa', 'Incentro', 'مركز الدائرة المحاطة', 'Incentre'), text: say('Erdikariak. Beti barruan.', 'Bisectrices. Siempre dentro.', 'منصّفات الزوايا. داخلًا دائمًا.', 'Angle bisectors. Always inside.') },
            { title: say('Barizentroa', 'Baricentro', 'مركز الثقل', 'Centroid'), text: say('Medianak. Beti barruan.', 'Medianas. Siempre dentro.', 'المتوسطات. داخلًا دائمًا.', 'Medians. Always inside.') },
            { title: say('Ortozentroa', 'Ortocentro', 'ملتقى الارتفاعات', 'Orthocentre'), text: say('Altuerak. Kanpoan egon daiteke.', 'Alturas. Puede quedar fuera.', 'الارتفاعات. قد يقع خارجًا.', 'Altitudes. It can lie outside.') }
        ],
        problem: say('Mediana batek 12 cm neurtzen du. Zein distantziatara dago barizentroa erpinetik?', 'Una mediana mide 12 cm. ¿A qué distancia del vértice está el baricentro?', 'متوسط طوله 12 سم. على أي بعد من الرأس يقع مركز الثقل؟', 'A median is 12 cm long. How far from the vertex is the centroid?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Medianaren bi heren.', 'Dos tercios de la mediana.', 'ثلثا المتوسط.', 'Two thirds of the median.'), math: same('$\\frac{2}{3}\\cdot 12=8$') }
        ],
        example: same('$12-8=4$'),
        mistake: {
            wrong: say('Zirkunzentroa beti triangeluaren barruan dago.', 'El circuncentro siempre está dentro del triángulo.', 'مركز الدائرة المحيطة داخل المثلث دائمًا.', 'The circumcentre is always inside the triangle.'),
            right: say('Triangelu kamutsean kanpoan dago, eta zuzenean hipotenusaren erdian.', 'En un triángulo obtusángulo queda fuera, y en uno rectángulo en el punto medio de la hipotenusa.', 'في المثلث المنفرج يقع خارجه، وفي القائم في منتصف الوتر.', 'In an obtuse triangle it lies outside, and in a right triangle at the midpoint of the hypotenuse.')
        },
        takeaway: say('Erdibitzaileak, erdikariak, medianak, altuerak: lau PUNTU.', 'Mediatrices, bisectrices, medianas, alturas: cuatro PUNTOS.', 'منصّفات عمودية، منصّفات زوايا، متوسطات، ارتفاعات: أربع نقاط.', 'Bisectors, angle bisectors, medians, altitudes: four POINTS.'),
        figure: (language) => <CentersFigure language={language} />
    },
    /* ---------- 3. Pythagoras ---------- */
    {
        id: 'pythagoras',
        stage: 'pythagoras',
        title: say('Pitagorasen teorema', 'El teorema de Pitágoras', 'مبرهنة فيثاغورس', 'Pythagoras\' theorem'),
        goal: say('Triangelu zuzen baten alde ezezaguna kalkulatzea.', 'Calcular el lado desconocido de un triángulo rectángulo.', 'حساب الضلع المجهول في مثلث قائم.', 'Work out the unknown side of a right triangle.'),
        explanation: say(
            'Triangelu zuzen batean, hipotenusaren karratua katetoen karratuen batura da: $a^{2}=b^{2}+c^{2}$. Hipotenusa kalkulatzeko, batu karratuak eta atera erroa. Katetoa kalkulatzeko, kendu: $b^{2}=a^{2}-c^{2}$. Hipotenusa beti alderik luzeena da. Alderantzizkoa ere egia da: $a^{2}=b^{2}+c^{2}$ betetzen bada, triangelua zuzena da.',
            'En un triángulo rectángulo, el cuadrado de la hipotenusa es la suma de los cuadrados de los catetos: $a^{2}=b^{2}+c^{2}$. Para hallar la hipotenusa, suma los cuadrados y saca la raíz. Para hallar un cateto, resta: $b^{2}=a^{2}-c^{2}$. La hipotenusa siempre es el lado más largo. El recíproco también es cierto: si se cumple $a^{2}=b^{2}+c^{2}$, el triángulo es rectángulo.',
            'في المثلث القائم مربع الوتر يساوي مجموع مربعي الضلعين القائمين: $a^{2}=b^{2}+c^{2}$. لإيجاد الوتر اجمع المربعين وخذ الجذر. ولإيجاد ضلع قائم اطرح: $b^{2}=a^{2}-c^{2}$. والوتر دائمًا أطول الأضلاع. والعكس صحيح أيضًا: إذا تحقّق $a^{2}=b^{2}+c^{2}$ فالمثلث قائم.',
            'In a right triangle, the square of the hypotenuse is the sum of the squares of the legs: $a^{2}=b^{2}+c^{2}$. To find the hypotenuse, add the squares and take the root. To find a leg, subtract: $b^{2}=a^{2}-c^{2}$. The hypotenuse is always the longest side. The converse is true too: if $a^{2}=b^{2}+c^{2}$ holds, the triangle is a right triangle.'
        ),
        problem: say('Triangelu zuzen baten hipotenusak 13 cm eta kateto batek 5 cm neurtzen dute. Zenbat bestea?', 'En un triángulo rectángulo la hipotenusa mide 13 cm y un cateto 5 cm. ¿Cuánto mide el otro?', 'في مثلث قائم الوتر 13 سم وضلع قائم 5 سم. كم الآخر؟', 'In a right triangle the hypotenuse is 13 cm and one leg is 5 cm. How long is the other?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Katetoa: kendu.', 'Cateto: resta.', 'الضلع القائم: اطرح.', 'A leg: subtract.'), math: same('$b^{2}=13^{2}-5^{2}=169-25=144$') },
            { text: say('Atera erroa.', 'Saca la raíz.', 'خذ الجذر.', 'Take the root.'), math: same('$b=\\sqrt{144}=12$') }
        ],
        example: same('$\\sqrt{6^{2}+8^{2}}=\\sqrt{100}=10$'),
        mistake: {
            wrong: same('$\\sqrt{3^{2}+4^{2}}=3+4=7$'),
            right: say('Erroa ez da banatzen batuketan: $\\sqrt{9+16}=\\sqrt{25}=5$.', 'La raíz no se reparte en la suma: $\\sqrt{9+16}=\\sqrt{25}=5$.', 'لا يتوزع الجذر على الجمع: $\\sqrt{9+16}=\\sqrt{25}=5$.', 'The root does not split over a sum: $\\sqrt{9+16}=\\sqrt{25}=5$.')
        },
        takeaway: same('$A^{2}=B^{2}+C^{2}$'),
        figure: (language) => <HypotenuseFigure language={language} />
    },
    {
        id: 'pythagoras-figures',
        stage: 'pythagoras',
        title: say('Pitagoras irudietan', 'Pitágoras en las figuras', 'فيثاغورس في الأشكال', 'Pythagoras in shapes'),
        goal: say('Triangelu zuzenak aurkitzea irudi lauetan: altuerak, diagonalak eta apotemak.', 'Encontrar triángulos rectángulos en figuras planas: alturas, diagonales y apotemas.', 'إيجاد مثلثات قائمة في الأشكال المستوية: الارتفاعات والأقطار والعوامد.', 'Find right triangles inside plane shapes: heights, diagonals and apothems.'),
        explanation: say(
            'Irudi askotan triangelu zuzen bat ezkutatzen da. Triangelu isoszelean, altuerak oinarria erditik banatzen du: altuera, oinarriaren erdia eta aldea. Laukizuzenean, diagonala bi aldeekin. Erronboan, diagonalen erdiak eta aldea. Poligono erregularrean, apotema, aldearen erdia eta erradioa. Marraztu lehenik triangelua eta jarri izenak.',
            'En muchas figuras se esconde un triángulo rectángulo. En el triángulo isósceles, la altura parte la base por la mitad: altura, media base y lado. En el rectángulo, la diagonal con los dos lados. En el rombo, las semidiagonales y el lado. En el polígono regular, la apotema, el medio lado y el radio. Dibuja primero el triángulo y pon nombres.',
            'في أشكال كثيرة يختبئ مثلث قائم. في المثلث المتساوي الساقين يقسم الارتفاع القاعدة إلى نصفين: الارتفاع ونصف القاعدة والساق. وفي المستطيل القطر مع الضلعين. وفي المعيّن نصفا القطرين والضلع. وفي المضلع المنتظم العامد ونصف الضلع ونصف القطر. ارسم المثلث أولًا وسمِّ أضلاعه.',
            'Many shapes hide a right triangle. In an isosceles triangle, the height cuts the base in half: height, half base and side. In a rectangle, the diagonal with the two sides. In a rhombus, the half diagonals and the side. In a regular polygon, the apothem, half a side and the radius. Draw the triangle first and label it.'
        ),
        problem: say('Triangelu isoszele baten alde berdinek 10 cm eta oinarriak 12 cm neurtzen dute. Zenbat da altuera?', 'Un triángulo isósceles tiene los lados iguales de 10 cm y la base de 12 cm. ¿Cuánto mide la altura?', 'مثلث متساوي الساقين ساقاه 10 سم وقاعدته 12 سم. كم ارتفاعه؟', 'An isosceles triangle has equal sides of 10 cm and a base of 12 cm. How tall is it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarriaren erdia: 6 cm.', 'Media base: 6 cm.', 'نصف القاعدة: 6 سم.', 'Half the base: 6 cm.') },
            { text: say('Altuera, kateto bat.', 'La altura, un cateto.', 'الارتفاع ضلع قائم.', 'The height, a leg.'), math: same('$h=\\sqrt{10^{2}-6^{2}}=\\sqrt{64}=8$') }
        ],
        example: same('$d=\\sqrt{5^{2}+12^{2}}=13$'),
        mistake: {
            wrong: say('Altuera: $\\sqrt{10^{2}-12^{2}}$.', 'La altura: $\\sqrt{10^{2}-12^{2}}$.', 'الارتفاع: $\\sqrt{10^{2}-12^{2}}$.', 'The height: $\\sqrt{10^{2}-12^{2}}$.'),
            right: say('Triangelu zuzenak oinarriaren ERDIA du: $\\sqrt{10^{2}-6^{2}}=8$.', 'El triángulo rectángulo tiene la MITAD de la base: $\\sqrt{10^{2}-6^{2}}=8$.', 'للمثلث القائم نصف القاعدة: $\\sqrt{10^{2}-6^{2}}=8$.', 'The right triangle has HALF the base: $\\sqrt{10^{2}-6^{2}}=8$.')
        },
        takeaway: say('Bilatu triangelu ZUZENA: $H=\\sqrt{L^{2}-(B\\div 2)^{2}}$.', 'Busca el triángulo RECTÁNGULO: $H=\\sqrt{L^{2}-(B\\div 2)^{2}}$.', 'ابحث عن المثلث القائم: $H=\\sqrt{L^{2}-(B\\div 2)^{2}}$.', 'Look for the RIGHT triangle: $H=\\sqrt{L^{2}-(B\\div 2)^{2}}$.'),
        figure: (language) => <IsoscelesHeightFigure language={language} />
    },
    {
        id: 'pythagoras-problems',
        stage: 'pythagoras',
        title: say('Problemak Pitagorasekin', 'Problemas con Pitágoras', 'مسائل بفيثاغورس', 'Problems with Pythagoras'),
        goal: say('Eguneroko egoeretan eta planoan distantziak kalkulatzea.', 'Calcular distancias en situaciones cotidianas y en el plano.', 'حساب المسافات في مواقف يومية وفي المستوى.', 'Work out distances in everyday situations and on the plane.'),
        explanation: say(
            'Eskailera bat horman: eskailera hipotenusa da, eta horma eta lurra katetoak. Planoko bi punturen arteko distantzia ere Pitagoras da: katetoak $x$-en aldea eta $y$-ren aldea dira. $A=(1,1)$ eta $B=(4,5)$ badira, katetoak 3 eta 4 dira, eta distantzia 5.',
            'Una escalera apoyada en la pared: la escalera es la hipotenusa, y la pared y el suelo, los catetos. La distancia entre dos puntos del plano también es Pitágoras: los catetos son la diferencia de las $x$ y la de las $y$. Si $A=(1,1)$ y $B=(4,5)$, los catetos miden 3 y 4, y la distancia 5.',
            'سلّم مستند إلى جدار: السلّم هو الوتر، والجدار والأرض هما الضلعان القائمان. والمسافة بين نقطتين في المستوى فيثاغورس أيضًا: الضلعان القائمان فرق السينات وفرق الصادات. إذا $A=(1,1)$ و$B=(4,5)$ فالضلعان 3 و4 والمسافة 5.',
            'A ladder against a wall: the ladder is the hypotenuse, and the wall and the floor are the legs. The distance between two points on the plane is also Pythagoras: the legs are the difference in $x$ and the difference in $y$. If $A=(1,1)$ and $B=(4,5)$, the legs are 3 and 4, and the distance is 5.'
        ),
        problem: say('10 m-ko eskailera bat horman jarri da, oina hormatik 6 m-ra. Zein altueratara iristen da?', 'Una escalera de 10 m se apoya en la pared con el pie a 6 m de ella. ¿A qué altura llega?', 'سلّم طوله 10 م مستند إلى جدار وقدمه على بعد 6 م منه. إلى أي ارتفاع يصل؟', 'A 10 m ladder leans on a wall with its foot 6 m from it. How high does it reach?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eskailera: hipotenusa.', 'La escalera: hipotenusa.', 'السلّم: الوتر.', 'The ladder: hypotenuse.'), math: same('$h=\\sqrt{10^{2}-6^{2}}=\\sqrt{64}=8$') }
        ],
        example: same('$AB=\\sqrt{3^{2}+4^{2}}=5$'),
        mistake: {
            wrong: say('Eskailera: $h=\\sqrt{10^{2}+6^{2}}$.', 'Escalera: $h=\\sqrt{10^{2}+6^{2}}$.', 'السلّم: $h=\\sqrt{10^{2}+6^{2}}$.', 'Ladder: $h=\\sqrt{10^{2}+6^{2}}$.'),
            right: say('Eskailera hipotenusa da: katetoa kalkulatzeko kendu egiten da, $\\sqrt{100-36}=8$.', 'La escalera es la hipotenusa: para un cateto se resta, $\\sqrt{100-36}=8$.', 'السلّم هو الوتر: لإيجاد ضلع قائم نطرح، $\\sqrt{100-36}=8$.', 'The ladder is the hypotenuse: for a leg you subtract, $\\sqrt{100-36}=8$.')
        },
        takeaway: same('$D=\\sqrt{(X_{2}-X_{1})^{2}+(Y_{2}-Y_{1})^{2}}$'),
        figure: (language) => <LadderFigure language={language} />
    },
    /* ---------- 4. Areas ---------- */
    {
        id: 'polygon-areas',
        stage: 'areas',
        title: say('Poligonoen azalerak', 'Áreas de polígonos', 'مساحات المضلعات', 'Areas of polygons'),
        goal: say('Triangelu, paralelogramo, trapezio eta erronboaren azalerak kalkulatzea.', 'Calcular el área de triángulos, paralelogramos, trapecios y rombos.', 'حساب مساحات المثلث ومتوازي الأضلاع وشبه المنحرف والمعيّن.', 'Work out the areas of triangles, parallelograms, trapeziums and rhombuses.'),
        explanation: say(
            'Paralelogramoa: oinarria bider altuera, $b\\cdot h$. Triangelua horren erdia da: $\\frac{b\\cdot h}{2}$. Trapezioa: oinarrien batez bestekoa bider altuera, $\\frac{(B+b)\\cdot h}{2}$. Erronboa: diagonalen biderkaduraren erdia, $\\frac{D\\cdot d}{2}$. Altuera beti oinarriarekiko perpendikularra da, ez alde zeiharra.',
            'Paralelogramo: base por altura, $b\\cdot h$. El triángulo es la mitad: $\\frac{b\\cdot h}{2}$. Trapecio: la media de las bases por la altura, $\\frac{(B+b)\\cdot h}{2}$. Rombo: la mitad del producto de las diagonales, $\\frac{D\\cdot d}{2}$. La altura siempre es perpendicular a la base, no el lado inclinado.',
            'متوازي الأضلاع: القاعدة في الارتفاع، $b\\cdot h$. والمثلث نصفه: $\\frac{b\\cdot h}{2}$. وشبه المنحرف: متوسط القاعدتين في الارتفاع، $\\frac{(B+b)\\cdot h}{2}$. والمعيّن: نصف جداء القطرين، $\\frac{D\\cdot d}{2}$. والارتفاع دائمًا عمودي على القاعدة لا الضلع المائل.',
            'Parallelogram: base times height, $b\\cdot h$. A triangle is half of it: $\\frac{b\\cdot h}{2}$. Trapezium: the mean of the bases times the height, $\\frac{(B+b)\\cdot h}{2}$. Rhombus: half the product of the diagonals, $\\frac{D\\cdot d}{2}$. The height is always perpendicular to the base, not the slanting side.'
        ),
        problem: say('Trapezio baten oinarriak 10 cm eta 6 cm dira, eta altuera 5 cm. Zein da azalera?', 'Un trapecio tiene bases de 10 cm y 6 cm y altura de 5 cm. ¿Cuál es su área?', 'شبه منحرف قاعدتاه 10 سم و6 سم وارتفاعه 5 سم. ما مساحته؟', 'A trapezium has bases of 10 cm and 6 cm and a height of 5 cm. What is its area?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Formula.', 'Fórmula.', 'الصيغة.', 'Formula.'), math: same('$\\frac{(10+6)\\cdot 5}{2}=40$') }
        ],
        example: same('$\\frac{8\\cdot 6}{2}=24$'),
        mistake: {
            wrong: say('Oinarria 8 eta altuera 6 duen triangelua: $8\\cdot 6=48$.', 'Triángulo de base 8 y altura 6: $8\\cdot 6=48$.', 'مثلث قاعدته 8 وارتفاعه 6: $8\\cdot 6=48$.', 'Triangle with base 8 and height 6: $8\\cdot 6=48$.'),
            right: say('Triangelua paralelogramoaren erdia da: $\\frac{8\\cdot 6}{2}=24$.', 'El triángulo es la mitad del paralelogramo: $\\frac{8\\cdot 6}{2}=24$.', 'المثلث نصف متوازي الأضلاع: $\\frac{8\\cdot 6}{2}=24$.', 'The triangle is half the parallelogram: $\\frac{8\\cdot 6}{2}=24$.')
        },
        takeaway: say('Triangelua: $\\frac{B\\cdot H}{2}$. Trapezioa: $\\frac{(B+B^{\\prime})\\cdot H}{2}$.', 'Triángulo: $\\frac{B\\cdot H}{2}$. Trapecio: $\\frac{(B+B^{\\prime})\\cdot H}{2}$.', 'المثلث: $\\frac{B\\cdot H}{2}$. شبه المنحرف: $\\frac{(B+B^{\\prime})\\cdot H}{2}$.', 'Triangle: $\\frac{B\\cdot H}{2}$. Trapezium: $\\frac{(B+B^{\\prime})\\cdot H}{2}$.'),
        figure: (language) => <PolygonAreasFigure language={language} />
    },
    {
        id: 'regular-area',
        stage: 'areas',
        title: say('Poligono erregularren azalera', 'Área de los polígonos regulares', 'مساحة المضلعات المنتظمة', 'Area of regular polygons'),
        goal: say('Perimetroa eta apotema erabiliz azalera kalkulatzea.', 'Calcular el área con el perímetro y la apotema.', 'حساب المساحة بالمحيط والعامد.', 'Work out the area with the perimeter and the apothem.'),
        explanation: say(
            'Poligono erregular bat zentrotik $n$ triangelu berdinetan banatzen da; bakoitzak aldea du oinarritzat eta apotema altueratzat. Beraz, azalera $\\frac{P\\cdot a}{2}$ da, $P$ perimetroa eta $a$ apotema izanik. Apotema ezagutzen ez bada, Pitagorasekin kalkulatzen da: $a^{2}=r^{2}-\\left(\\frac{l}{2}\\right)^{2}$.',
            'Un polígono regular se divide desde el centro en $n$ triángulos iguales; cada uno tiene por base el lado y por altura la apotema. Por eso el área es $\\frac{P\\cdot a}{2}$, con $P$ el perímetro y $a$ la apotema. Si no se conoce la apotema, se halla con Pitágoras: $a^{2}=r^{2}-\\left(\\frac{l}{2}\\right)^{2}$.',
            'ينقسم المضلع المنتظم من مركزه إلى $n$ مثلثًا متساويًا؛ قاعدة كل منها الضلع وارتفاعه العامد. لذلك المساحة $\\frac{P\\cdot a}{2}$، حيث $P$ المحيط و$a$ العامد. وإذا كان العامد مجهولًا نجده بفيثاغورس: $a^{2}=r^{2}-\\left(\\frac{l}{2}\\right)^{2}$.',
            'A regular polygon splits from its centre into $n$ equal triangles; each has the side as its base and the apothem as its height. So the area is $\\frac{P\\cdot a}{2}$, where $P$ is the perimeter and $a$ the apothem. If the apothem is not known, use Pythagoras: $a^{2}=r^{2}-\\left(\\frac{l}{2}\\right)^{2}$.'
        ),
        problem: say('Pentagono erregular baten aldeak 8 cm eta apotemak 5,5 cm neurtzen dute. Zein da azalera?', 'Un pentágono regular tiene lado 8 cm y apotema 5,5 cm. ¿Cuál es su área?', 'خماسي منتظم ضلعه 8 سم وعامده 5.5 سم. ما مساحته؟', 'A regular pentagon has side 8 cm and apothem 5.5 cm. What is its area?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Perimetroa.', 'Perímetro.', 'المحيط.', 'Perimeter.'), math: same('$P=5\\cdot 8=40$') },
            { text: say('Azalera.', 'Área.', 'المساحة.', 'Area.'), math: same('$\\frac{40\\cdot 5{,}5}{2}=110$') }
        ],
        example: same('$\\frac{6\\cdot 4\\cdot 3{,}5}{2}=42$'),
        mistake: {
            wrong: say('Azalera $P\\cdot a$ da, zati 2 gabe.', 'El área es $P\\cdot a$, sin dividir entre 2.', 'المساحة $P\\cdot a$ دون قسمة على 2.', 'The area is $P\\cdot a$, without dividing by 2.'),
            right: say('Triangelu bakoitza $\\frac{l\\cdot a}{2}$ da: guztira $\\frac{P\\cdot a}{2}$.', 'Cada triángulo es $\\frac{l\\cdot a}{2}$: en total $\\frac{P\\cdot a}{2}$.', 'كل مثلث $\\frac{l\\cdot a}{2}$: والمجموع $\\frac{P\\cdot a}{2}$.', 'Each triangle is $\\frac{l\\cdot a}{2}$: in total $\\frac{P\\cdot a}{2}$.')
        },
        takeaway: same('$A=\\frac{P\\cdot AP}{2}$'),
        figure: (language) => <ApothemFigure language={language} />
    },
    {
        id: 'circle-areas',
        stage: 'areas',
        title: say('Zirkulua eta haren zatiak', 'El círculo y sus partes', 'الدائرة وأجزاؤها', 'The circle and its parts'),
        goal: say('Zirkunferentziaren luzera, arkua, zirkuluaren azalera, sektorea eta koroa kalkulatzea.', 'Calcular la longitud de la circunferencia, el arco, el área del círculo, el sector y la corona.', 'حساب محيط الدائرة والقوس ومساحة الدائرة والقطاع والحلقة.', 'Work out the circumference, an arc, the area of a circle, a sector and an annulus.'),
        explanation: say(
            'Zirkunferentziaren luzera $2\\pi r$ da, eta zirkuluaren azalera $\\pi r^{2}$. $\\alpha$ graduko arkua eta sektorea zirkulu osoaren zati bat dira: $\\frac{\\alpha}{360°}$ aldiz. Koroa zirkularra bi zirkulu zentrokideren arteko eremua da: $\\pi(R^{2}-r^{2})$. Erabili $\\pi\\approx 3{,}14$ eta biribildu emaitza.',
            'La longitud de la circunferencia es $2\\pi r$, y el área del círculo, $\\pi r^{2}$. El arco y el sector de $\\alpha$ grados son una parte del total: $\\frac{\\alpha}{360°}$ veces. La corona circular es la zona entre dos círculos concéntricos: $\\pi(R^{2}-r^{2})$. Usa $\\pi\\approx 3{,}14$ y redondea el resultado.',
            'محيط الدائرة $2\\pi r$، ومساحتها $\\pi r^{2}$. والقوس والقطاع ذوا $\\alpha$ درجة جزء من الكل: $\\frac{\\alpha}{360°}$ مرة. والحلقة هي المنطقة بين دائرتين متحدتي المركز: $\\pi(R^{2}-r^{2})$. استعمل $\\pi\\approx 3{,}14$ وقرّب النتيجة.',
            'The circumference is $2\\pi r$, and the area of the circle is $\\pi r^{2}$. An arc and a sector of $\\alpha$ degrees are a part of the whole: $\\frac{\\alpha}{360°}$ times. An annulus is the region between two concentric circles: $\\pi(R^{2}-r^{2})$. Use $\\pi\\approx 3{,}14$ and round the result.'
        ),
        problem: say('Zein da 6 cm-ko erradioa eta 60°-ko angelua dituen sektorearen azalera?', '¿Cuál es el área de un sector de radio 6 cm y 60°?', 'ما مساحة قطاع نصف قطره 6 سم وزاويته 60°؟', 'What is the area of a sector of radius 6 cm and 60°?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zirkulu osoa.', 'El círculo entero.', 'الدائرة كاملة.', 'The whole circle.'), math: same('$\\pi\\cdot 6^{2}=36\\pi$') },
            { text: say('Seiren bat: $60°$ zati $360°$.', 'Un sexto: $60°$ entre $360°$.', 'السدس: $60°$ على $360°$.', 'A sixth: $60°$ out of $360°$.'), math: same('$\\frac{36\\pi}{6}=6\\pi\\approx 18{,}84$') }
        ],
        example: same('$\\pi(5^{2}-3^{2})=16\\pi\\approx 50{,}24$'),
        mistake: {
            wrong: say('8 cm-ko diametroa: azalera $\\pi\\cdot 8^{2}$.', 'Diámetro 8 cm: área $\\pi\\cdot 8^{2}$.', 'القطر 8 سم: المساحة $\\pi\\cdot 8^{2}$.', 'Diameter 8 cm: area $\\pi\\cdot 8^{2}$.'),
            right: say('Formulak erradioa erabiltzen du: $r=4$, azalera $16\\pi$.', 'La fórmula usa el radio: $r=4$, área $16\\pi$.', 'تستعمل الصيغة نصف القطر: $r=4$، المساحة $16\\pi$.', 'The formula uses the radius: $r=4$, area $16\\pi$.')
        },
        takeaway: say('Sektorea = $\\pi R^{2}\\cdot\\frac{\\alpha}{360°}$', 'Sector = $\\pi R^{2}\\cdot\\frac{\\alpha}{360°}$', 'القطاع = $\\pi R^{2}\\cdot\\frac{\\alpha}{360°}$', 'Sector = $\\pi R^{2}\\cdot\\frac{\\alpha}{360°}$'),
        figure: (language) => <SectorRingFigure language={language} />
    },
    /* ---------- 5. Similarity ---------- */
    {
        id: 'thales',
        stage: 'similarity',
        title: say('Talesen teorema', 'El teorema de Tales', 'مبرهنة طاليس', 'Thales\' theorem'),
        goal: say('Paralelo batzuek ebakitako segmentu proportzionalak kalkulatzea.', 'Calcular segmentos proporcionales cortados por rectas paralelas.', 'حساب القطع المتناسبة التي تقطعها مستقيمات متوازية.', 'Work out proportional segments cut off by parallel lines.'),
        explanation: say(
            'Bi zuzen ebakitzaile hainbat zuzen paralelok ebakitzen badituzte, zuzen batean ebakitako segmentuak bestean ebakitakoekiko proportzionalak dira: $\\frac{AB}{A^{\\prime}B^{\\prime}}=\\frac{BC}{B^{\\prime}C^{\\prime}}$. Triangelu batean, alde bati paraleloa den zuzen batek beste triangelu antzeko bat sortzen du. Idatzi proportzioa eta ebatzi biderketa gurutzatuarekin.',
            'Si dos rectas secantes se cortan por varias rectas paralelas, los segmentos que se forman en una son proporcionales a los de la otra: $\\frac{AB}{A^{\\prime}B^{\\prime}}=\\frac{BC}{B^{\\prime}C^{\\prime}}$. En un triángulo, una recta paralela a un lado forma otro triángulo semejante. Escribe la proporción y resuelve con el producto cruzado.',
            'إذا قطعت مستقيمات متوازية مستقيمين فإن القطع على أحدهما تتناسب مع القطع على الآخر: $\\frac{AB}{A^{\\prime}B^{\\prime}}=\\frac{BC}{B^{\\prime}C^{\\prime}}$. وفي المثلث يكوّن مستقيم موازٍ لضلع مثلثًا مشابهًا. اكتب التناسب وحلّه بالضرب التبادلي.',
            'If two lines are cut by several parallel lines, the segments formed on one are proportional to those on the other: $\\frac{AB}{A^{\\prime}B^{\\prime}}=\\frac{BC}{B^{\\prime}C^{\\prime}}$. In a triangle, a line parallel to one side makes another similar triangle. Write the proportion and solve it by cross-multiplying.'
        ),
        problem: say('$AB=4$, $BC=6$ eta $A^{\\prime}B^{\\prime}=6$. Zenbat da $B^{\\prime}C^{\\prime}$?', '$AB=4$, $BC=6$ y $A^{\\prime}B^{\\prime}=6$. ¿Cuánto mide $B^{\\prime}C^{\\prime}$?', '$AB=4$ و$BC=6$ و$A^{\\prime}B^{\\prime}=6$. كم $B^{\\prime}C^{\\prime}$؟', '$AB=4$, $BC=6$ and $A^{\\prime}B^{\\prime}=6$. How long is $B^{\\prime}C^{\\prime}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Proportzioa.', 'La proporción.', 'التناسب.', 'The proportion.'), math: same('$\\frac{4}{6}=\\frac{6}{x}$') },
            { text: say('Biderketa gurutzatua.', 'Producto cruzado.', 'الضرب التبادلي.', 'Cross-multiply.'), math: same('$x=\\frac{6\\cdot 6}{4}=9$') }
        ],
        example: same('$\\frac{3}{5}=\\frac{6}{10}$'),
        mistake: {
            wrong: say('$\\frac{AB}{BC}=\\frac{B^{\\prime}C^{\\prime}}{A^{\\prime}B^{\\prime}}$: ordena aldatu.', '$\\frac{AB}{BC}=\\frac{B^{\\prime}C^{\\prime}}{A^{\\prime}B^{\\prime}}$: cambiar el orden.', '$\\frac{AB}{BC}=\\frac{B^{\\prime}C^{\\prime}}{A^{\\prime}B^{\\prime}}$: قلب الترتيب.', '$\\frac{AB}{BC}=\\frac{B^{\\prime}C^{\\prime}}{A^{\\prime}B^{\\prime}}$: swapping the order.'),
            right: say('Zuzen bakoitzean ordena bera: $\\frac{AB}{BC}=\\frac{A^{\\prime}B^{\\prime}}{B^{\\prime}C^{\\prime}}$.', 'El mismo orden en las dos rectas: $\\frac{AB}{BC}=\\frac{A^{\\prime}B^{\\prime}}{B^{\\prime}C^{\\prime}}$.', 'الترتيب نفسه على المستقيمين: $\\frac{AB}{BC}=\\frac{A^{\\prime}B^{\\prime}}{B^{\\prime}C^{\\prime}}$.', 'The same order on both lines: $\\frac{AB}{BC}=\\frac{A^{\\prime}B^{\\prime}}{B^{\\prime}C^{\\prime}}$.')
        },
        takeaway: same("$\\frac{AB}{A^{\\prime}B^{\\prime}}=\\frac{BC}{B^{\\prime}C^{\\prime}}$"),
        figure: (language) => <ThalesFigure language={language} />
    },
    {
        id: 'similar-triangles',
        stage: 'similarity',
        title: say('Triangelu antzekoak', 'Triángulos semejantes', 'المثلثات المتشابهة', 'Similar triangles'),
        goal: say('Bi triangelu antzekoak diren jakitea eta antzekotasun-arrazoia erabiltzea.', 'Saber si dos triángulos son semejantes y usar la razón de semejanza.', 'معرفة ما إذا كان مثلثان متشابهين واستعمال نسبة التشابه.', 'Tell whether two triangles are similar and use the scale factor.'),
        explanation: say(
            'Bi triangelu antzekoak dira angelu berdinak eta alde proportzionalak badituzte. Nahikoa da bi angelu berdinak izatea, edo hiru aldeak proportzionalak izatea, edo bi alde proportzional eta haien arteko angelua berdina. Antzekotasun-arrazoia $k$ alde homologoen arteko zatidura da: alde guztiak $k$ aldiz handiagoak dira.',
            'Dos triángulos son semejantes si tienen los ángulos iguales y los lados proporcionales. Basta con que tengan dos ángulos iguales, o los tres lados proporcionales, o dos lados proporcionales y el ángulo entre ellos igual. La razón de semejanza $k$ es el cociente entre lados homólogos: todos los lados son $k$ veces mayores.',
            'يتشابه مثلثان إذا كانت زواياهما متساوية وأضلاعهما متناسبة. ويكفي تساوي زاويتين، أو تناسب الأضلاع الثلاثة، أو تناسب ضلعين وتساوي الزاوية بينهما. ونسبة التشابه $k$ هي خارج قسمة الضلعين المتناظرين: كل الأضلاع أكبر $k$ مرة.',
            'Two triangles are similar if their angles are equal and their sides proportional. It is enough to have two equal angles, or all three sides proportional, or two proportional sides with the same angle between them. The scale factor $k$ is the ratio of matching sides: every side is $k$ times larger.'
        ),
        problem: say('Triangelu batek 3, 4 eta 5 cm-ko aldeak ditu. Antzeko batek 12 cm-ko alde handiena du. Zenbat da alde txikiena?', 'Un triángulo tiene lados de 3, 4 y 5 cm. Uno semejante tiene el lado mayor de 12 cm. ¿Cuánto mide su lado menor?', 'مثلث أضلاعه 3 و4 و5 سم. ومثلث مشابه أطول أضلاعه 12 سم. كم أصغر أضلاعه؟', 'A triangle has sides of 3, 4 and 5 cm. A similar one has a longest side of 12 cm. How long is its shortest side?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Arrazoia: alde handienak.', 'La razón: los lados mayores.', 'النسبة: الضلعان الأكبران.', 'The factor: the longest sides.'), math: same('$k=\\frac{12}{5}=2{,}4$') },
            { text: say('Alde txikiena.', 'El lado menor.', 'الضلع الأصغر.', 'The shortest side.'), math: same('$3\\cdot 2{,}4=7{,}2$') }
        ],
        example: same('$\\frac{6}{4}=\\frac{9}{6}=\\frac{12}{8}=1{,}5$'),
        mistake: {
            wrong: say('5 cm-tik 12 cm-ra 7 gehitu da: alde guztiei 7 gehitu.', 'De 5 cm a 12 cm se suman 7: se suman 7 a todos los lados.', 'من 5 سم إلى 12 سم أُضيف 7: نضيف 7 إلى كل الأضلاع.', 'From 5 cm to 12 cm, 7 is added: add 7 to every side.'),
            right: say('Antzekotasunean biderkatu egiten da, ez batu: alde guztiak bider $k$.', 'En la semejanza se multiplica, no se suma: todos los lados por $k$.', 'في التشابه نضرب ولا نجمع: كل الأضلاع في $k$.', 'Similarity multiplies, it does not add: every side times $k$.')
        },
        takeaway: same("$K=\\frac{A^{\\prime}}{A}=\\frac{B^{\\prime}}{B}=\\frac{C^{\\prime}}{C}$"),
        figure: (language) => <CriteriaFigure language={language} />
    },
    {
        id: 'scale-areas',
        stage: 'similarity',
        title: say('Perimetroak, azalerak eta eskalak', 'Perímetros, áreas y escalas', 'المحيطات والمساحات والمقاييس', 'Perimeters, areas and scales'),
        goal: say('Irudi antzekoen perimetroen eta azaleren arrazoia jakitea.', 'Conocer la razón de los perímetros y de las áreas de figuras semejantes.', 'معرفة نسبة المحيطات والمساحات في الأشكال المتشابهة.', 'Know the ratio of the perimeters and the areas of similar shapes.'),
        explanation: say(
            'Bi irudi antzekoren arrazoia $k$ bada, perimetroen arrazoia ere $k$ da, baina azaleren arrazoia $k^{2}$: luzera eta zabalera, biak, $k$ aldiz handitzen dira. Alde bikoiztean, azalera laukoiztu egiten da. Eskala bat ($1\\mathbin{:}500$) antzekotasun-arrazoi bat da: planoko 1 cm errealitateko 500 cm da.',
            'Si la razón de dos figuras semejantes es $k$, la razón de los perímetros también es $k$, pero la de las áreas es $k^{2}$: el largo y el ancho crecen los dos $k$ veces. Al doblar los lados, el área se multiplica por cuatro. Una escala ($1\\mathbin{:}500$) es una razón de semejanza: 1 cm del plano son 500 cm de la realidad.',
            'إذا كانت نسبة شكلين متشابهين $k$ فنسبة المحيطين أيضًا $k$، لكن نسبة المساحتين $k^{2}$: يكبر الطول والعرض كلاهما $k$ مرة. وعند مضاعفة الأضلاع تتضاعف المساحة أربع مرات. والمقياس ($1\\mathbin{:}500$) نسبة تشابه: 1 سم في المخطط 500 سم في الواقع.',
            'If the ratio of two similar shapes is $k$, the ratio of the perimeters is also $k$, but the ratio of the areas is $k^{2}$: length and width both grow $k$ times. Doubling the sides multiplies the area by four. A scale ($1\\mathbin{:}500$) is a scale factor: 1 cm on the plan is 500 cm in reality.'
        ),
        problem: say('Lauki batek 20 cm² ditu. Antzeko batek aldeak hiru aldiz handiagoak ditu. Zenbat da haren azalera?', 'Un cuadrilátero mide 20 cm². Otro semejante tiene los lados tres veces mayores. ¿Cuál es su área?', 'رباعي مساحته 20 سم². ورباعي مشابه أضلاعه أكبر ثلاث مرات. ما مساحته؟', 'A quadrilateral has an area of 20 cm². A similar one has sides three times as long. What is its area?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Azaleren arrazoia.', 'Razón de las áreas.', 'نسبة المساحتين.', 'Ratio of the areas.'), math: same('$k^{2}=3^{2}=9$') },
            { text: say('Azalera.', 'Área.', 'المساحة.', 'Area.'), math: same('$20\\cdot 9=180$') }
        ],
        example: same('$k=2\\ \\to\\ k^{2}=4$'),
        mistake: {
            wrong: say('Aldeak bikoiztean, azalera ere bikoizten da.', 'Al doblar los lados, el área también se dobla.', 'عند مضاعفة الأضلاع تتضاعف المساحة أيضًا.', 'Doubling the sides doubles the area too.'),
            right: say('Azalera $k^{2}$ aldiz: aldeak bikoiztean, azalera laukoiztu.', 'El área va por $k^{2}$: al doblar los lados, el área se multiplica por 4.', 'المساحة في $k^{2}$: بمضاعفة الأضلاع تُضرب المساحة في 4.', 'The area goes by $k^{2}$: doubling the sides multiplies the area by 4.')
        },
        takeaway: say('Perimetroak: $K$. Azalerak: $K^{2}$.', 'Perímetros: $K$. Áreas: $K^{2}$.', 'المحيطات: $K$. المساحات: $K^{2}$.', 'Perimeters: $K$. Areas: $K^{2}$.'),
        figure: (language) => <RatiosFigure language={language} />
    }
]

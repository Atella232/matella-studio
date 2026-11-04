import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { AreasTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Azalerak, bolumenak eta antzekotasuna · 4. DBH akademikoak — what each
   lesson tells: the new words (definitions), a short explanation, its
   cases, the example as an exercise («Another example»), the key words in
   four languages and, in three lessons, «Why does it work?». Plain data so
   the tests can import it; lessons.tsx merges it into the topics. π ≈ 3,14
   as in the rest of the unit; each explanation keeps the numbers its
   drawing shows.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const areasLessonTexts: Record<AreasTopicId, LessonTexts> = {
    /* ---------- 1. Plane areas ---------- */
    'regular-polygons': {
        definitions: [
            {
                term: say('Apotema', 'Apotema', 'العامد', 'Apothem'),
                meaning: say('Poligono erregularraren erditik alde baten erdiko puntura doan zuzenkia.', 'El segmento que va del centro del polígono regular al punto medio de un lado.', 'القطعة الواصلة من مركز المضلع المنتظم إلى منتصف أحد أضلاعه.', 'The segment from the centre of the regular polygon to the midpoint of a side.')
            }
        ],
        vocabulary: [
            say('erradioa', 'radio', 'نصف القطر', 'radius'),
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter')
        ],
        explanation: say(
            'Erpinak erdiarekin lotuz, $n$ aldeko poligono erregular bat $n$ triangelu berdinetan banatzen da; haien oinarria aldea da eta altuera apotema: horregatik, $A=\\dfrac{P\\cdot a}{2}$. Apotema ematen ez badute, erradioak, apotemak eta alde-erdiak triangelu angeluzuzen bat osatzen dute, erradioa hipotenusa dela: $a=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$.',
            'Uniendo los vértices con el centro, un polígono regular de $n$ lados se divide en $n$ triángulos iguales, de base el lado y altura la apotema: por eso $A=\\dfrac{P\\cdot a}{2}$. Si no dan la apotema, el radio, la apotema y medio lado forman un triángulo rectángulo cuya hipotenusa es el radio: $a=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$.',
            'بوصل الرؤوس بالمركز ينقسم المضلع المنتظم ذو $n$ ضلعًا إلى $n$ مثلثًا متطابقًا، قاعدة كل منها الضلع وارتفاعه العامد: لذلك $A=\\dfrac{P\\cdot a}{2}$. وإذا لم يُعطَ العامد فإن نصف القطر والعامد ونصف الضلع تكوّن مثلثًا قائمًا وتره نصف القطر: $a=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$.',
            'Joining the vertices to the centre splits a regular polygon with $n$ sides into $n$ equal triangles, with the side as base and the apothem as height: that is why $A=\\dfrac{P\\cdot a}{2}$. If the apothem is not given, the radius, the apothem and half a side form a right-angled triangle whose hypotenuse is the radius: $a=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$.'
        ),
        examplePrompt: say('Hexagono erregular baten aldeak 10 cm neurtzen ditu. Kalkulatu haren apotema eta azalera.', 'Un hexágono regular tiene 10 cm de lado. Calcula su apotema y su área.', 'مسدس منتظم طول ضلعه 10 سم. احسب عامده ومساحته.', 'A regular hexagon has 10 cm sides. Work out its apothem and its area.'),
        example: same('$\\begin{gathered}a=\\sqrt{10^{2}-5^{2}}\\approx 8{,}66\\\\ A=\\dfrac{60\\cdot 8{,}66}{2}=259{,}8\\end{gathered}$'),
        exampleAnswer: say('Hexagono erregularrean erradioa aldea bezalakoa da: $r=10$. Azalera, 259,8 cm² inguru.', 'En el hexágono regular el radio es igual al lado: $r=10$. Área, unos 259,8 cm².', 'في المسدس المنتظم نصف القطر يساوي الضلع: $r=10$. المساحة نحو 259.8 سم².', 'In a regular hexagon the radius equals the side: $r=10$. Area, about 259.8 cm².')
    },
    'circle-parts': {
        vocabulary: [
            say('arkua', 'arco', 'القوس', 'arc'),
            say('sektorea', 'sector', 'القطاع', 'sector'),
            say('koroa', 'corona', 'الحلقة', 'annulus')
        ],
        explanation: say(
            '$n°$ graduko arkua zirkunferentziaren $\\frac{n}{360}$ zatia da, eta sektorea, zirkuluaren zati bera: $r=10$ eta $90°$ badira, $A=\\dfrac{314\\cdot 90}{360}=78{,}5$. Sektorearen perimetroa arkua gehi bi erradio da. Koroa zirkularra zentro bera duten bi zirkunferentzien artean dago: $A=\\pi(R^{2}-r^{2})$.',
            'Un arco de $n°$ es la fracción $\\frac{n}{360}$ de la circunferencia, y el sector, la misma fracción del círculo: con $r=10$ y $90°$, $A=\\dfrac{314\\cdot 90}{360}=78{,}5$. El perímetro del sector es el arco más dos radios. La corona circular está entre dos circunferencias con el mismo centro: $A=\\pi(R^{2}-r^{2})$.',
            'قوس $n°$ هو الجزء $\\frac{n}{360}$ من المحيط، والقطاع هو الجزء نفسه من الدائرة: مع $r=10$ و$90°$ تكون $A=\\dfrac{314\\cdot 90}{360}=78{,}5$. ومحيط القطاع هو القوس زائد نصفي قطر. والحلقة الدائرية تقع بين دائرتين لهما المركز نفسه: $A=\\pi(R^{2}-r^{2})$.',
            'An arc of $n°$ is the fraction $\\frac{n}{360}$ of the circumference, and the sector is the same fraction of the circle: with $r=10$ and $90°$, $A=\\dfrac{314\\cdot 90}{360}=78{,}5$. The perimeter of the sector is the arc plus two radii. The annulus lies between two circles with the same centre: $A=\\pi(R^{2}-r^{2})$.'
        ),
        cases: [
            { title: say('Arkua', 'Arco', 'القوس', 'Arc'), text: say('Zirkunferentziaren zati bat.', 'Una fracción de la circunferencia.', 'جزء من المحيط.', 'A fraction of the circumference.'), math: same('$L=\\dfrac{2\\pi r\\cdot n}{360}$') },
            { title: say('Sektorea', 'Sector', 'القطاع', 'Sector'), text: say('Zirkuluaren zati bat.', 'Una fracción del círculo.', 'جزء من الدائرة.', 'A fraction of the circle.'), math: same('$A=\\dfrac{\\pi r^{2}\\cdot n}{360}$') }
        ],
        examplePrompt: say('Kalkulatu 5 cm eta 3 cm-ko erradioak dituen koroaren azalera.', 'Calcula el área de una corona de radios 5 cm y 3 cm.', 'احسب مساحة حلقة نصفا قطريها 5 سم و3 سم.', 'Work out the area of an annulus with radii 5 cm and 3 cm.'),
        example: same('$\\begin{aligned}&A=3{,}14\\cdot(5^{2}-3^{2})\\\\&=3{,}14\\cdot 16=50{,}24\\end{aligned}$'),
        exampleAnswer: say('50,24 cm²: zirkulu handia ken txikia.', '50,24 cm²: el círculo grande menos el pequeño.', '50.24 سم²: الدائرة الكبيرة ناقص الصغيرة.', '50.24 cm²: the big circle minus the small one.')
    },
    segments: {
        definitions: [
            {
                term: say('Segmentu zirkularra', 'Segmento circular', 'القطعة الدائرية', 'Circular segment'),
                meaning: say('Korda baten eta haren arkuaren arteko zirkulu-zatia.', 'La parte del círculo entre una cuerda y su arco.', 'جزء الدائرة المحصور بين وتر وقوسه.', 'The part of the circle between a chord and its arc.')
            }
        ],
        vocabulary: [
            say('korda', 'cuerda', 'الوتر', 'chord'),
            say('sektorea', 'sector', 'القطاع', 'sector')
        ],
        explanation: say(
            'Haren azalerak ez du formula berezirik: sektorea ken bi erradioek eta kordak osatzen duten triangelua da. 90 graduko segmentuan triangelua angeluzuzena da: 4 erradioarekin, $12{,}56-8=4{,}56$. Irudi konposatu batean, banatu zati ezagunetan eta batu, edo osatu irudi ezagun bat eta kendu soberakoa.',
            'Su área no tiene fórmula propia: es el sector menos el triángulo que forman los dos radios y la cuerda. En el de 90° el triángulo es rectángulo: con radio 4, $12{,}56-8=4{,}56$. En una figura compuesta, descompón en partes conocidas y suma, o completa una figura conocida y resta lo que sobra.',
            'ليس لمساحتها صيغة خاصة: إنها القطاع ناقص المثلث الذي يكوّنه نصفا القطر والوتر. في القطعة ذات 90° يكون المثلث قائمًا: مع نصف قطر 4، $12{,}56-8=4{,}56$. وفي الشكل المركّب جزّئ إلى أجزاء معروفة واجمع، أو أكمل شكلًا معروفًا واطرح الزائد.',
            'Its area has no formula of its own: it is the sector minus the triangle formed by the two radii and the chord. In the 90° one the triangle is right-angled: with radius 4, $12{,}56-8=4{,}56$. In a composite figure, split it into known parts and add, or complete a known figure and subtract what is left over.'
        ),
        examplePrompt: say('Kalkulatu 6 cm-ko erradioa duen zirkulu bateko 90 graduko segmentuaren azalera.', 'Calcula el área de un segmento de 90° en un círculo de 6 cm de radio.', 'احسب مساحة قطعة دائرية زاويتها 90° في دائرة نصف قطرها 6 سم.', 'Work out the area of a 90° segment in a circle of radius 6 cm.'),
        example: same('$\\begin{gathered}\\dfrac{3{,}14\\cdot 6^{2}}{4}=28{,}26\\qquad\\dfrac{6\\cdot 6}{2}=18\\\\ 28{,}26-18=10{,}26\\end{gathered}$'),
        exampleAnswer: say('10,26 cm²: sektorea ken triangelu angeluzuzena.', '10,26 cm²: el sector menos el triángulo rectángulo.', '10.26 سم²: القطاع ناقص المثلث القائم.', '10.26 cm²: the sector minus the right-angled triangle.')
    },

    /* ---------- 2. Areas of solids ---------- */
    'polyhedra-area': {
        vocabulary: [
            say('garapena', 'desarrollo', 'النشر', 'net'),
            say('alboko azalera', 'área lateral', 'المساحة الجانبية', 'lateral area')
        ],
        explanation: say(
            'Garapenean ikusten da. Prisma zuzen baten alboko aurpegiek laukizuzen bat osatzen dute: $A_L=P\\cdot h$ eta $A_T=A_L+2A_B$. Piramide erregular batenak triangeluak dira, eta haien altuera piramidearen apotema da, $a_p$: $A_L=\\dfrac{P\\cdot a_p}{2}$ eta $A_T=A_L+A_B$. Oinarriaren aldea 10 eta altuera 12 badira, $a_p=\\sqrt{12^{2}+5^{2}}=13$.',
            'Se ve en el desarrollo. Las caras laterales de un prisma recto forman un rectángulo: $A_L=P\\cdot h$ y $A_T=A_L+2A_B$. Las de una pirámide regular son triángulos cuya altura es la apotema de la pirámide, $a_p$: $A_L=\\dfrac{P\\cdot a_p}{2}$ y $A_T=A_L+A_B$. Con base de lado 10 y altura 12, $a_p=\\sqrt{12^{2}+5^{2}}=13$.',
            'يظهر ذلك في النشر. الأوجه الجانبية للمنشور القائم تكوّن مستطيلًا: $A_L=P\\cdot h$ و$A_T=A_L+2A_B$. وأوجه الهرم المنتظم مثلثات ارتفاعها عامد الهرم $a_p$: $A_L=\\dfrac{P\\cdot a_p}{2}$ و$A_T=A_L+A_B$. مع ضلع قاعدة 10 وارتفاع 12: $a_p=\\sqrt{12^{2}+5^{2}}=13$.',
            'You can see it in the net. The lateral faces of a right prism form a rectangle: $A_L=P\\cdot h$ and $A_T=A_L+2A_B$. Those of a regular pyramid are triangles whose height is the slant height of the pyramid, $a_p$: $A_L=\\dfrac{P\\cdot a_p}{2}$ and $A_T=A_L+A_B$. With a base side of 10 and a height of 12, $a_p=\\sqrt{12^{2}+5^{2}}=13$.'
        ),
        examplePrompt: say('Oinarri karratuko prisma zuzen baten aldeak 5 cm eta altuerak 8 cm neurtzen ditu. Kalkulatu haren azalera osoa.', 'Un prisma recto de base cuadrada tiene 5 cm de lado y 8 cm de altura. Calcula su área total.', 'منشور قائم قاعدته مربعة ضلعها 5 سم وارتفاعه 8 سم. احسب مساحته الكلية.', 'A right prism with a square base has 5 cm sides and is 8 cm high. Work out its total area.'),
        example: same('$\\begin{gathered}A_L=20\\cdot 8=160\\\\ A_T=160+2\\cdot 25=210\\end{gathered}$'),
        exampleAnswer: say('210 cm²: lau alboko aurpegiak eta bi oinarriak.', '210 cm²: las cuatro caras laterales y las dos bases.', '210 سم²: الأوجه الجانبية الأربعة والقاعدتان.', '210 cm²: the four lateral faces and the two bases.')
    },
    'round-area': {
        definitions: [
            {
                term: say('Sortzailea', 'Generatriz', 'الراسم', 'Slant height'),
                meaning: say('Konoan, erpinetik oinarriaren zirkunferentziara doan zuzenkia.', 'En el cono, el segmento que va del vértice a la circunferencia de la base.', 'في المخروط، القطعة الواصلة من الرأس إلى محيط القاعدة.', 'In a cone, the segment from the apex to the circle of the base.')
            }
        ],
        vocabulary: [
            say('zilindroa', 'cilindro', 'الأسطوانة', 'cylinder'),
            say('konoa', 'cono', 'المخروط', 'cone')
        ],
        explanation: say(
            'Zilindroaren garapena laukizuzen bat da, oinarria zirkunferentzia duela, gehi bi zirkulu: $A_L=2\\pi rh$. Konoarena, sektore bat, erradioa $g$ sortzailea duena, gehi zirkulu bat: $A_L=\\pi rg$. Altuerak, erradioak eta sortzaileak triangelu angeluzuzen bat osatzen dute: $r=6$ eta $h=8$ badira, $g=\\sqrt{8^{2}+6^{2}}=10$.',
            'El desarrollo del cilindro es un rectángulo cuya base es la circunferencia, y dos círculos: $A_L=2\\pi rh$. El del cono, un sector cuyo radio es la generatriz $g$, y un círculo: $A_L=\\pi rg$. La altura, el radio y la generatriz forman un triángulo rectángulo: con $r=6$ y $h=8$, $g=\\sqrt{8^{2}+6^{2}}=10$.',
            'نشر الأسطوانة مستطيل قاعدته المحيط، ودائرتان: $A_L=2\\pi rh$. ونشر المخروط قطاع نصف قطره الراسم $g$، ودائرة: $A_L=\\pi rg$. والارتفاع ونصف القطر والراسم تكوّن مثلثًا قائمًا: مع $r=6$ و$h=8$ يكون $g=\\sqrt{8^{2}+6^{2}}=10$.',
            'The net of a cylinder is a rectangle whose base is the circumference, plus two circles: $A_L=2\\pi rh$. That of a cone is a sector whose radius is the slant height $g$, plus a circle: $A_L=\\pi rg$. The height, the radius and the slant height form a right-angled triangle: with $r=6$ and $h=8$, $g=\\sqrt{8^{2}+6^{2}}=10$.'
        ),
        examplePrompt: say('Kalkulatu 2 cm-ko erradioa eta 5 cm-ko altuera dituen zilindro baten azalera osoa.', 'Calcula el área total de un cilindro de 2 cm de radio y 5 cm de altura.', 'احسب المساحة الكلية لأسطوانة نصف قطرها 2 سم وارتفاعها 5 سم.', 'Work out the total area of a cylinder with radius 2 cm and height 5 cm.'),
        example: same('$\\begin{gathered}A_L=2\\cdot 3{,}14\\cdot 2\\cdot 5=62{,}8\\\\ A_T=62{,}8+2\\cdot 3{,}14\\cdot 2^{2}=87{,}92\\end{gathered}$'),
        exampleAnswer: say('87,92 cm²: albokoa gehi bi oinarriak.', '87,92 cm²: la lateral más las dos bases.', '87.92 سم²: الجانبية زائد القاعدتين.', '87.92 cm²: the lateral area plus the two bases.')
    },
    'sphere-area': {
        definitions: [
            {
                term: say('Zona esferikoa', 'Zona esférica', 'المنطقة الكروية', 'Spherical zone'),
                meaning: say('Bi plano paraleloren arteko esfera-gainazalaren zatia.', 'La parte de la superficie de la esfera entre dos planos paralelos.', 'جزء سطح الكرة المحصور بين مستويين متوازيين.', 'The part of the surface of a sphere between two parallel planes.')
            }
        ],
        vocabulary: [
            say('esfera', 'esfera', 'الكرة', 'sphere'),
            say('esfera-erdia', 'semiesfera', 'نصف الكرة', 'hemisphere')
        ],
        explanation: say(
            'Esferaren azalera erradio bereko lau zirkulurena da: $A=4\\pi r^{2}$; $r=3$ bada, $4\\cdot 3{,}14\\cdot 9=113{,}04$. Arkimedesek ikusi zuen inguratzen duen zilindroaren alboko azalera dela, $2\\pi r\\cdot 2r$. Horregatik, $h$ altuerako zona esferikoak zilindroaren bandaren azalera du: $A=2\\pi rh$.',
            'El área de la esfera es la de cuatro círculos de su mismo radio: $A=4\\pi r^{2}$; con $r=3$, $4\\cdot 3{,}14\\cdot 9=113{,}04$. Arquímedes vio que es el área lateral del cilindro que la envuelve, $2\\pi r\\cdot 2r$. Por eso una zona esférica de altura $h$ tiene el área de la banda del cilindro: $A=2\\pi rh$.',
            'مساحة الكرة هي مساحة أربع دوائر لها نصف القطر نفسه: $A=4\\pi r^{2}$؛ ومع $r=3$: $4\\cdot 3{,}14\\cdot 9=113{,}04$. ورأى أرخميدس أنها المساحة الجانبية للأسطوانة التي تحيط بها، $2\\pi r\\cdot 2r$. لذلك للمنطقة الكروية ذات الارتفاع $h$ مساحة شريط الأسطوانة: $A=2\\pi rh$.',
            'The area of a sphere is that of four circles with the same radius: $A=4\\pi r^{2}$; with $r=3$, $4\\cdot 3{,}14\\cdot 9=113{,}04$. Archimedes saw that it equals the lateral area of the cylinder around it, $2\\pi r\\cdot 2r$. That is why a spherical zone of height $h$ has the area of the cylinder band: $A=2\\pi rh$.'
        ),
        examplePrompt: say('Kalkulatu 10 cm-ko erradioa duen esfera-erdi itxi baten azalera.', 'Calcula el área de una semiesfera cerrada de 10 cm de radio.', 'احسب مساحة نصف كرة مغلق نصف قطره 10 سم.', 'Work out the area of a closed hemisphere with radius 10 cm.'),
        example: same('$2\\cdot 3{,}14\\cdot 10^{2}+3{,}14\\cdot 10^{2}=942$'),
        exampleAnswer: say('942 cm²: esferaren erdia gehi oinarriko zirkulua.', '942 cm²: la mitad de la esfera más el círculo de la base.', '942 سم²: نصف الكرة زائد دائرة القاعدة.', '942 cm²: half the sphere plus the circle of the base.')
    },

    /* ---------- 3. Volumes ---------- */
    'prism-cylinder-volume': {
        definitions: [
            {
                term: say('Cavalieriren printzipioa', 'Principio de Cavalieri', 'مبدأ كافالييري', 'Cavalieri\'s principle'),
                meaning: say('Altuera bera eta maila bakoitzean ebakidura-azalera bera dituzten bi gorputzek bolumen bera dute.', 'Dos cuerpos con la misma altura y la misma área de sección a cada nivel tienen el mismo volumen.', 'جسمان لهما الارتفاع نفسه ومساحة المقطع نفسها عند كل مستوى لهما الحجم نفسه.', 'Two solids with the same height and the same cross-section area at every level have the same volume.')
            }
        ],
        vocabulary: [
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('litroa', 'litro', 'لتر', 'litre')
        ],
        explanation: say(
            'Horregatik, prismaren eta zilindroaren bolumena oinarriaren azalera bider altuera da, zuzenak edo zeiharrak izan: $V=A_B\\cdot h$; zilindroan, $V=\\pi r^{2}h$. Gogoratu: 1 dm³ = 1 L, eta 1 m³ = 1000 L.',
            'Por eso el volumen del prisma y del cilindro es el área de la base por la altura, sean rectos u oblicuos: $V=A_B\\cdot h$; en el cilindro, $V=\\pi r^{2}h$. Recuerda: 1 dm³ = 1 L, y 1 m³ = 1000 L.',
            'لذلك حجم المنشور والأسطوانة هو مساحة القاعدة في الارتفاع، قائمين كانا أو مائلين: $V=A_B\\cdot h$؛ وفي الأسطوانة $V=\\pi r^{2}h$. تذكّر: 1 dm³ = 1 لتر، و1 m³ = 1000 لتر.',
            'That is why the volume of a prism or a cylinder is the area of the base times the height, whether they are right or oblique: $V=A_B\\cdot h$; for the cylinder, $V=\\pi r^{2}h$. Remember: 1 dm³ = 1 L, and 1 m³ = 1,000 L.'
        ),
        examplePrompt: say('Igerileku bat prisma bat da, 10 m bider 5 m-ko oinarria eta 1,5 m-ko sakonera dituena. Zenbat litro sartzen dira?', 'Una piscina es un prisma de 10 m por 5 m de base y 1,5 m de profundidad. ¿Cuántos litros caben?', 'مسبح على شكل منشور قاعدته 10 م في 5 م وعمقه 1.5 م. كم لترًا يتسع؟', 'A pool is a prism with a 10 m by 5 m base and 1.5 m deep. How many litres does it hold?'),
        example: same('$V=10\\cdot 5\\cdot 1{,}5=75\\ \\to\\ 75\\,000\\ \\mathrm{L}$'),
        exampleAnswer: say('75 m³, hau da, 75\u00a0000 L.', '75 m³, es decir, 75\u00a0000 L.', '75 m³، أي 75\u00a0000 لتر.', '75 m³, that is, 75,000 L.')
    },
    'pyramid-cone-volume': {
        vocabulary: [
            say('herena', 'tercio', 'الثلث', 'third'),
            say('sortzailea', 'generatriz', 'الراسم', 'slant height')
        ],
        explanation: say(
            'Piramide batek oinarri eta altuera bereko prismaren heren bat hartzen du, eta konoak, zilindroaren heren bat: $V=\\dfrac{1}{3}A_B\\cdot h$. Bolumenerako altuera behar da, ez apotema ez sortzailea; ematen ez badute, atera Pitagorasekin: konoan, $h=\\sqrt{g^{2}-r^{2}}$.',
            'Una pirámide ocupa un tercio del prisma de igual base y altura, y el cono, un tercio del cilindro: $V=\\dfrac{1}{3}A_B\\cdot h$. Para el volumen hace falta la altura, no la apotema ni la generatriz; si no la dan, sácala con Pitágoras: en el cono, $h=\\sqrt{g^{2}-r^{2}}$.',
            'يشغل الهرم ثلث المنشور المساوي له قاعدةً وارتفاعًا، والمخروط ثلث الأسطوانة: $V=\\dfrac{1}{3}A_B\\cdot h$. ويلزم للحجم الارتفاع لا العامد ولا الراسم؛ وإن لم يُعطَ فاستخرجه بفيثاغورس: في المخروط $h=\\sqrt{g^{2}-r^{2}}$.',
            'A pyramid fills a third of the prism with the same base and height, and a cone a third of the cylinder: $V=\\dfrac{1}{3}A_B\\cdot h$. The volume needs the height, not the slant height of a face or of the cone; if it is not given, find it with Pythagoras: in the cone, $h=\\sqrt{g^{2}-r^{2}}$.'
        ),
        examplePrompt: say('Kalkulatu oinarri karratuko piramide baten bolumena, oinarriaren aldea 9 cm eta altuera 10 cm badira.', 'Calcula el volumen de una pirámide de base cuadrada de 9 cm de lado y 10 cm de altura.', 'احسب حجم هرم قاعدته مربعة ضلعها 9 سم وارتفاعه 10 سم.', 'Work out the volume of a square-based pyramid with 9 cm sides and a height of 10 cm.'),
        example: same('$V=\\dfrac{81\\cdot 10}{3}=270$'),
        exampleAnswer: say('270 cm³: 810 cm³-ko prismaren herena.', '270 cm³: un tercio del prisma de 810 cm³.', '270 سم³: ثلث المنشور الذي حجمه 810 سم³.', '270 cm³: a third of the 810 cm³ prism.'),
        why: {
            text: say(
                'Kubo bat hiru piramide berdinetan zatitu daiteke, guztiak erpina kuboaren izkina berean dutela eta kuboaren aurpegi bat oinarri gisa. Bakoitzak kuboaren heren bat hartzen du; Cavalieriren printzipioarekin, edozein piramidetara zabaltzen da: $V=\\dfrac{1}{3}A_B\\cdot h$.',
                'Un cubo se puede partir en tres pirámides iguales, todas con el vértice en una misma esquina del cubo y una cara del cubo como base. Cada una ocupa un tercio del cubo; con el principio de Cavalieri, se extiende a cualquier pirámide: $V=\\dfrac{1}{3}A_B\\cdot h$.',
                'يمكن تقسيم المكعب إلى ثلاثة أهرام متطابقة، رأس كل منها في زاوية واحدة من المكعب وقاعدته وجه من أوجهه. يشغل كل هرم ثلث المكعب؛ وبمبدأ كافالييري يمتد ذلك إلى أي هرم: $V=\\dfrac{1}{3}A_B\\cdot h$.',
                'A cube can be cut into three equal pyramids, all with their apex at the same corner of the cube and a face of the cube as base. Each fills a third of the cube; Cavalieri\'s principle extends it to any pyramid: $V=\\dfrac{1}{3}A_B\\cdot h$.'
            )
        }
    },
    'sphere-composite': {
        vocabulary: [
            say('esfera-erdia', 'semiesfera', 'نصف الكرة', 'hemisphere'),
            say('zuloa', 'hueco', 'التجويف', 'hollow')
        ],
        explanation: say(
            'Esferaren bolumena inguratzen duen zilindroaren bi heren da: $\\dfrac{2}{3}\\cdot\\pi r^{2}\\cdot 2r=\\dfrac{4}{3}\\pi r^{3}$. Gorputz konposatu batean, izozki-kono batean (konoa eta esfera-erdia) edo silo batean bezala, banatu gorputz ezagunetan eta batu bolumenak; zulo bat badu, kendu.',
            'El volumen de la esfera es dos tercios del cilindro que la envuelve: $\\dfrac{2}{3}\\cdot\\pi r^{2}\\cdot 2r=\\dfrac{4}{3}\\pi r^{3}$. En un cuerpo compuesto, como un cucurucho (cono y semiesfera) o un silo, descompón en cuerpos conocidos y suma los volúmenes; si tiene un hueco, réstalo.',
            'حجم الكرة ثلثا الأسطوانة التي تحيط بها: $\\dfrac{2}{3}\\cdot\\pi r^{2}\\cdot 2r=\\dfrac{4}{3}\\pi r^{3}$. وفي الجسم المركّب، كالمثلّجة (مخروط ونصف كرة) أو الصومعة، جزّئ إلى أجسام معروفة واجمع الحجوم؛ وإن كان فيه تجويف فاطرحه.',
            'The volume of a sphere is two thirds of the cylinder around it: $\\dfrac{2}{3}\\cdot\\pi r^{2}\\cdot 2r=\\dfrac{4}{3}\\pi r^{3}$. In a composite solid, such as an ice-cream cone (cone and hemisphere) or a silo, split it into known solids and add the volumes; if it has a hollow, subtract it.'
        ),
        examplePrompt: say('Izozki-kono bat 3 cm-ko erradioa eta 8 cm-ko altuera dituen konoa da, esfera-erdi bat gainean duela. Kalkulatu haren bolumena.', 'Un cucurucho es un cono de 3 cm de radio y 8 cm de altura con media esfera encima. Calcula su volumen.', 'مثلّجة على شكل مخروط نصف قطره 3 سم وارتفاعه 8 سم فوقه نصف كرة. احسب حجمها.', 'An ice-cream cone is a cone with radius 3 cm and height 8 cm with half a sphere on top. Work out its volume.'),
        example: same('$\\begin{gathered}\\dfrac{3{,}14\\cdot 3^{2}\\cdot 8}{3}=75{,}36\\\\ \\dfrac{2}{3}\\cdot 3{,}14\\cdot 3^{3}=56{,}52\\end{gathered}$'),
        exampleAnswer: say('$75{,}36+56{,}52=131{,}88$ cm³.', '$75{,}36+56{,}52=131{,}88$ cm³.', '$75{,}36+56{,}52=131{,}88$ سم³.', '$75{,}36+56{,}52=131{,}88$ cm³.')
    },

    /* ---------- 4. Similarity ---------- */
    thales: {
        vocabulary: [
            say('paraleloak', 'paralelas', 'المتوازيات', 'parallel'),
            say('proportzionalak', 'proporcionales', 'متناسبة', 'proportional')
        ],
        explanation: say(
            'Bi zuzen zuzen paralelo batzuek mozten badituzte, batean sortzen diren zuzenkiak bestean sortzen direnekiko proportzionalak dira: $\\dfrac{AB}{A\'B\'}=\\dfrac{BC}{B\'C\'}$. Zuzenki ezezagun bat proportzio horretatik ateratzen da. Alderantzizkoa ere egia da: zuzenkiak proportzionalak badira, zuzenak paraleloak dira.',
            'Si dos rectas son cortadas por varias rectas paralelas, los segmentos que se forman en una son proporcionales a los de la otra: $\\dfrac{AB}{A\'B\'}=\\dfrac{BC}{B\'C\'}$. Un segmento desconocido sale de esa proporción. El recíproco también es cierto: si los segmentos son proporcionales, las rectas son paralelas.',
            'إذا قطعت مستقيمات متوازية مستقيمين فإن القطع الناتجة على أحدهما متناسبة مع القطع على الآخر: $\\dfrac{AB}{A\'B\'}=\\dfrac{BC}{B\'C\'}$. والقطعة المجهولة تُستخرج من هذا التناسب. والعكس صحيح أيضًا: إذا كانت القطع متناسبة فالمستقيمات متوازية.',
            'If two lines are cut by several parallel lines, the segments on one are proportional to those on the other: $\\dfrac{AB}{A\'B\'}=\\dfrac{BC}{B\'C\'}$. An unknown segment comes out of that proportion. The converse is also true: if the segments are proportional, the lines are parallel.'
        ),
        examplePrompt: say('Paralelo batzuek zuzen bat 3 cm eta 7 cm-ko zuzenkitan mozten dute, eta beste bat 4,5 cm eta $x$ zuzenkitan. Kalkulatu $x$.', 'Unas paralelas cortan una recta en segmentos de 3 cm y 7 cm, y otra en segmentos de 4,5 cm y $x$. Calcula $x$.', 'مستقيمات متوازية تقطع مستقيمًا إلى قطعتين 3 سم و7 سم، وآخر إلى 4.5 سم و$x$. احسب $x$.', 'Some parallel lines cut one line into segments of 3 cm and 7 cm, and another into segments of 4.5 cm and $x$. Work out $x$.'),
        example: same('$\\dfrac{3}{4{,}5}=\\dfrac{7}{x}\\ \\to\\ x=\\dfrac{4{,}5\\cdot 7}{3}=10{,}5$'),
        exampleAnswer: say('$x=10{,}5$ cm.', '$x=10{,}5$ cm.', '$x=10{,}5$ سم.', '$x=10{,}5$ cm.')
    },
    'similar-triangles': {
        definitions: [
            {
                term: say('Antzekotasun-arrazoia', 'Razón de semejanza', 'نسبة التشابه', 'Scale factor'),
                meaning: say('Bi irudi antzekoren alde homologoen arteko zatidura, $k$.', 'El cociente entre lados correspondientes de dos figuras semejantes, $k$.', 'خارج قسمة الأضلاع المتناظرة في شكلين متشابهين، $k$.', 'The ratio between corresponding sides of two similar figures, $k$.')
            }
        ],
        vocabulary: [
            say('irizpidea', 'criterio', 'المعيار', 'criterion'),
            say('angelua', 'ángulo', 'الزاوية', 'angle')
        ],
        explanation: say(
            'Bi triangelu antzekoak dira angeluak berdinak eta aldeak proportzionalak badituzte. Irizpide hauetako bat nahikoa da: bi angelu berdin; bi alde proportzional eta haien arteko angelua berdina; edo hiru aldeak proportzionalak. Alde baten paralelo batek triangelu txiki antzeko bat sortzen du (Talesen posizioa): $\\dfrac{12}{6}=\\dfrac{x}{5}$, $x=10$.',
            'Dos triángulos son semejantes si tienen los ángulos iguales y los lados proporcionales. Basta uno de estos criterios: dos ángulos iguales; dos lados proporcionales y el ángulo que forman igual; o los tres lados proporcionales. Una paralela a un lado forma un triángulo pequeño semejante (posición de Tales): $\\dfrac{12}{6}=\\dfrac{x}{5}$, $x=10$.',
            'يتشابه مثلثان إذا تساوت زواياهما وتناسبت أضلاعهما. ويكفي معيار واحد من هذه: زاويتان متساويتان؛ أو ضلعان متناسبان والزاوية بينهما متساوية؛ أو الأضلاع الثلاثة متناسبة. والمستقيم الموازي لضلع يكوّن مثلثًا صغيرًا مشابهًا (وضع طاليس): $\\dfrac{12}{6}=\\dfrac{x}{5}$، $x=10$.',
            'Two triangles are similar if their angles are equal and their sides proportional. One of these criteria is enough: two equal angles; two proportional sides with the same angle between them; or all three sides proportional. A line parallel to one side makes a small similar triangle (Thales\' position): $\\dfrac{12}{6}=\\dfrac{x}{5}$, $x=10$.'
        ),
        examplePrompt: say('2 m-ko makila batek 3 m-ko itzala du, eta aldi berean zuhaitz batek 15 m-koa. Zenbat neurtzen du zuhaitzak?', 'Un palo de 2 m da una sombra de 3 m, y a la vez un árbol da una sombra de 15 m. ¿Cuánto mide el árbol?', 'عصا طولها 2 م ظلها 3 م، وفي الوقت نفسه ظل شجرة 15 م. كم طول الشجرة؟', 'A 2 m stick casts a 3 m shadow, and at the same time a tree casts a 15 m shadow. How tall is the tree?'),
        example: same('$\\dfrac{h}{2}=\\dfrac{15}{3}\\ \\to\\ h=10$'),
        exampleAnswer: say('Eguzki-izpiek triangelu antzekoak osatzen dituzte: zuhaitzak 10 m neurtzen ditu.', 'Los rayos del sol forman triángulos semejantes: el árbol mide 10 m.', 'أشعة الشمس تكوّن مثلثين متشابهين: طول الشجرة 10 م.', 'The sun\'s rays form similar triangles: the tree is 10 m tall.')
    },
    'right-theorems': {
        definitions: [
            {
                term: say('Katetoaren proiekzioa', 'Proyección de un cateto', 'مسقط الضلع القائم', 'Projection of a leg'),
                meaning: say('Altueraren oinaren eta kateto horren arteko hipotenusa-zatia.', 'El trozo de hipotenusa que queda entre el pie de la altura y ese cateto.', 'جزء الوتر الواقع بين موقع الارتفاع وذلك الضلع القائم.', 'The piece of the hypotenuse between the foot of the height and that leg.')
            }
        ],
        vocabulary: [
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse'),
            say('katetoa', 'cateto', 'الضلع القائم', 'leg')
        ],
        explanation: say(
            'Triangelu angeluzuzen batean, hipotenusaren gaineko altuerak triangelu handiaren antzeko bi triangelu sortzen ditu eta hipotenusa $m$ eta $n$ proiekzioetan banatzen du. Antzekotasunetik bi teorema ateratzen dira. 9 eta 16 proiekzioekin: $h^{2}=9\\cdot 16$, beraz $h=12$, eta 16 proiekzioari dagokion katetoak $b^{2}=25\\cdot 16$ betetzen du.',
            'En un triángulo rectángulo, la altura sobre la hipotenusa forma dos triángulos semejantes al grande y divide la hipotenusa en las proyecciones $m$ y $n$. De la semejanza salen dos teoremas. Con proyecciones 9 y 16: $h^{2}=9\\cdot 16$, así que $h=12$, y el cateto de la proyección 16 cumple $b^{2}=25\\cdot 16$.',
            'في المثلث القائم يكوّن الارتفاع على الوتر مثلثين مشابهين للكبير ويقسم الوتر إلى المسقطين $m$ و$n$. ومن التشابه تنتج مبرهنتان. مع المسقطين 9 و16: $h^{2}=9\\cdot 16$، إذن $h=12$، والضلع القائم ذو المسقط 16 يحقق $b^{2}=25\\cdot 16$.',
            'In a right-angled triangle, the height to the hypotenuse makes two triangles similar to the big one and splits the hypotenuse into the projections $m$ and $n$. Two theorems come from the similarity. With projections 9 and 16: $h^{2}=9\\cdot 16$, so $h=12$, and the leg with projection 16 satisfies $b^{2}=25\\cdot 16$.'
        ),
        cases: [
            { title: say('Altueraren teorema', 'Teorema de la altura', 'مبرهنة الارتفاع', 'Height theorem'), text: say('Altuera ber bi proiekzioen biderkadura da.', 'La altura al cuadrado es el producto de las proyecciones.', 'مربع الارتفاع يساوي جداء المسقطين.', 'The height squared is the product of the projections.'), math: same('$h^{2}=m\\cdot n$') },
            { title: say('Katetoaren teorema', 'Teorema del cateto', 'مبرهنة الضلع القائم', 'Leg theorem'), text: say('Kateto bakoitza ber bi hipotenusa bider bere proiekzioa da.', 'Cada cateto al cuadrado es la hipotenusa por su proyección.', 'مربع كل ضلع قائم يساوي الوتر في مسقطه.', 'Each leg squared is the hypotenuse times its projection.'), math: same('$b^{2}=a\\cdot n$') }
        ],
        examplePrompt: say('Katetoen proiekzioek 4 cm eta 25 cm neurtzen dute. Kalkulatu altuera eta kateto handiena.', 'Las proyecciones de los catetos miden 4 cm y 25 cm. Calcula la altura y el cateto mayor.', 'مسقطا الضلعين القائمين 4 سم و25 سم. احسب الارتفاع والضلع القائم الأكبر.', 'The projections of the legs are 4 cm and 25 cm. Work out the height and the longer leg.'),
        example: same('$\\begin{gathered}h=\\sqrt{4\\cdot 25}=10\\\\ b=\\sqrt{29\\cdot 25}\\approx 26{,}93\\end{gathered}$'),
        exampleAnswer: say('Altuera, 10 cm; kateto handiena proiekzio handienarekin doa, 25 cm-koarekin.', 'Altura, 10 cm; el cateto mayor va con la proyección mayor, la de 25 cm.', 'الارتفاع 10 سم؛ والضلع القائم الأكبر يرافق المسقط الأكبر، 25 سم.', 'Height, 10 cm; the longer leg goes with the longer projection, the 25 cm one.'),
        why: {
            text: say(
                'Bi triangelu txikiak antzekoak dira: batean, altuera eta $m$ proiekzioa; bestean, $n$ eta altuera. Haien aldeak proportzionalak dira: $\\dfrac{h}{m}=\\dfrac{n}{h}$, eta gurutzean biderkatuta, $h^{2}=m\\cdot n$.',
                'Los dos triángulos pequeños son semejantes: en uno están la altura y la proyección $m$; en el otro, $n$ y la altura. Sus lados son proporcionales: $\\dfrac{h}{m}=\\dfrac{n}{h}$, y al multiplicar en cruz, $h^{2}=m\\cdot n$.',
                'المثلثان الصغيران متشابهان: في أحدهما الارتفاع والمسقط $m$، وفي الآخر $n$ والارتفاع. أضلاعهما متناسبة: $\\dfrac{h}{m}=\\dfrac{n}{h}$، وبالضرب التبادلي $h^{2}=m\\cdot n$.',
                'The two small triangles are similar: one has the height and the projection $m$; the other, $n$ and the height. Their sides are proportional: $\\dfrac{h}{m}=\\dfrac{n}{h}$, and cross-multiplying, $h^{2}=m\\cdot n$.'
            )
        }
    },

    /* ---------- 5. Ratio of similarity and scales ---------- */
    'ratio-powers': {
        vocabulary: [
            say('antzekotasun-arrazoia', 'razón de semejanza', 'نسبة التشابه', 'scale factor'),
            say('bolumena', 'volumen', 'الحجم', 'volume')
        ],
        explanation: say(
            'Antzekotasun-arrazoia $k$ bada, luzera guztiak $k$ zenbakiaz biderkatzen dira; azalerak, $k^{2}$ zenbakiaz, bi luzera biderkatzen direlako; eta bolumenak, $k^{3}$ zenbakiaz. 1, 2 eta 3 ertzeko kuboek 1, 8 eta 27 bolumen dituzte.',
            'Si la razón de semejanza es $k$, todas las longitudes se multiplican por $k$; las áreas, por $k^{2}$, porque se multiplican dos longitudes; y los volúmenes, por $k^{3}$. Los cubos de arista 1, 2 y 3 tienen volúmenes 1, 8 y 27.',
            'إذا كانت نسبة التشابه $k$ تُضرب كل الأطوال في $k$، والمساحات في $k^{2}$ لأنها جداء طولين، والحجوم في $k^{3}$. المكعبات التي أحرفها 1 و2 و3 حجومها 1 و8 و27.',
            'If the scale factor is $k$, every length is multiplied by $k$; areas by $k^{2}$, because two lengths are multiplied; and volumes by $k^{3}$. Cubes with edges 1, 2 and 3 have volumes 1, 8 and 27.'
        ),
        cases: [
            { title: say('Luzerak', 'Longitudes', 'الأطوال', 'Lengths'), text: say('Aldeak, perimetroak, altuerak.', 'Lados, perímetros, alturas.', 'الأضلاع والمحيطات والارتفاعات.', 'Sides, perimeters, heights.'), math: same('$\\times k$') },
            { title: say('Azalerak', 'Áreas', 'المساحات', 'Areas'), text: say('Bi luzeraren biderkadura.', 'Producto de dos longitudes.', 'جداء طولين.', 'A product of two lengths.'), math: same('$\\times k^{2}$') },
            { title: say('Bolumenak', 'Volúmenes', 'الحجوم', 'Volumes'), text: say('Hiru luzeraren biderkadura.', 'Producto de tres longitudes.', 'جداء ثلاثة أطوال.', 'A product of three lengths.'), math: same('$\\times k^{3}$') }
        ],
        examplePrompt: say('Baloi baten erradioa 30 cm³-ko eta 50 cm²-ko beste baloi batena halako bi da. Zenbat dira haren bolumena eta azalera?', 'Un balón tiene el doble de radio que otro de 30 cm³ y 50 cm². ¿Cuánto valen su volumen y su área?', 'كرة نصف قطرها ضعف نصف قطر كرة أخرى حجمها 30 سم³ ومساحتها 50 سم². كم حجمها ومساحتها؟', 'A ball has twice the radius of another ball of 30 cm³ and 50 cm². What are its volume and area?'),
        example: same('$50\\cdot 2^{2}=200\\qquad 30\\cdot 2^{3}=240$'),
        exampleAnswer: say('Azalera, 200 cm²; bolumena, 240 cm³.', 'Área, 200 cm²; volumen, 240 cm³.', 'المساحة 200 سم²، والحجم 240 سم³.', 'Area, 200 cm²; volume, 240 cm³.'),
        why: {
            text: say(
                '$l$ aldeko karratuaren azalera $l^{2}$ da; aldea $k\\cdot l$ bihurtzen bada, azalera $(k\\,l)^{2}=k^{2}\\,l^{2}$ da. Kuboarekin, $(k\\,l)^{3}=k^{3}\\,l^{3}$. Edozein irudi karratu edo kubo txikiz bete daiteke, eta bakoitza era berean hazten da.',
                'Un cuadrado de lado $l$ tiene área $l^{2}$; si el lado pasa a $k\\cdot l$, el área es $(k\\,l)^{2}=k^{2}\\,l^{2}$. Con un cubo, $(k\\,l)^{3}=k^{3}\\,l^{3}$. Cualquier figura se puede llenar de cuadraditos o de cubitos, y cada uno crece igual.',
                'مساحة المربع الذي ضلعه $l$ هي $l^{2}$؛ وإذا صار الضلع $k\\cdot l$ تصير المساحة $(k\\,l)^{2}=k^{2}\\,l^{2}$. ومع المكعب $(k\\,l)^{3}=k^{3}\\,l^{3}$. ويمكن ملء أي شكل بمربعات أو مكعبات صغيرة، وكل منها يكبر بالطريقة نفسها.',
                'A square with side $l$ has area $l^{2}$; if the side becomes $k\\cdot l$, the area is $(k\\,l)^{2}=k^{2}\\,l^{2}$. With a cube, $(k\\,l)^{3}=k^{3}\\,l^{3}$. Any figure can be filled with little squares or cubes, and each one grows the same way.'
            )
        }
    },
    frustums: {
        definitions: [
            {
                term: say('Kono-enborra', 'Tronco de cono', 'جذع المخروط', 'Frustum of a cone'),
                meaning: say('Konoa oinarriaren plano paralelo batez moztu eta goiko zatia kentzean geratzen dena.', 'Lo que queda de un cono al cortarlo con un plano paralelo a la base y quitarle la parte de arriba.', 'ما يبقى من المخروط عند قطعه بمستوٍ موازٍ للقاعدة وإزالة الجزء العلوي.', 'What is left of a cone when it is cut by a plane parallel to the base and the top is removed.')
            }
        ],
        vocabulary: [
            say('antzekotasuna', 'semejanza', 'التشابه', 'similarity'),
            say('kono txikia', 'cono pequeño', 'المخروط الصغير', 'small cone')
        ],
        explanation: say(
            'Enborraren bolumena kono handiarena ken txikiarena da, eta txikia handiaren antzekoa da. Txikiaren altuera, $x$, antzekotasunetik ateratzen da: $\\dfrac{x}{r}=\\dfrac{x+h}{R}$. $R=6$, $r=3$ eta $h=4$ badira: $6x=3x+12$, $x=4$, eta $V=\\dfrac{1}{3}\\pi\\cdot 36\\cdot 8-\\dfrac{1}{3}\\pi\\cdot 9\\cdot 4=84\\pi$.',
            'El volumen del tronco es el del cono grande menos el del pequeño, que es semejante al grande. La altura del pequeño, $x$, sale de la semejanza: $\\dfrac{x}{r}=\\dfrac{x+h}{R}$. Con $R=6$, $r=3$ y $h=4$: $6x=3x+12$, $x=4$, y $V=\\dfrac{1}{3}\\pi\\cdot 36\\cdot 8-\\dfrac{1}{3}\\pi\\cdot 9\\cdot 4=84\\pi$.',
            'حجم الجذع هو حجم المخروط الكبير ناقص حجم الصغير المشابه له. وارتفاع الصغير $x$ يُستخرج من التشابه: $\\dfrac{x}{r}=\\dfrac{x+h}{R}$. مع $R=6$ و$r=3$ و$h=4$: $6x=3x+12$، $x=4$، و$V=\\dfrac{1}{3}\\pi\\cdot 36\\cdot 8-\\dfrac{1}{3}\\pi\\cdot 9\\cdot 4=84\\pi$.',
            'The volume of the frustum is that of the big cone minus that of the small one, which is similar to the big one. The height of the small cone, $x$, comes from the similarity: $\\dfrac{x}{r}=\\dfrac{x+h}{R}$. With $R=6$, $r=3$ and $h=4$: $6x=3x+12$, $x=4$, and $V=\\dfrac{1}{3}\\pi\\cdot 36\\cdot 8-\\dfrac{1}{3}\\pi\\cdot 9\\cdot 4=84\\pi$.'
        ),
        examplePrompt: say('Kono-enbor batek 4 cm eta 2 cm-ko erradioak eta 5 cm-ko altuera ditu. Kalkulatu haren bolumena $\\pi$ zenbakiaren arabera.', 'Un tronco de cono tiene radios de 4 cm y 2 cm y 5 cm de altura. Calcula su volumen en función de $\\pi$.', 'جذع مخروط نصفا قطريه 4 سم و2 سم وارتفاعه 5 سم. احسب حجمه بدلالة $\\pi$.', 'A frustum of a cone has radii of 4 cm and 2 cm and a height of 5 cm. Work out its volume in terms of $\\pi$.'),
        example: same('$\\begin{gathered}\\dfrac{x}{2}=\\dfrac{x+5}{4}\\ \\to\\ x=5\\\\ V=\\dfrac{1}{3}\\pi\\cdot 16\\cdot 10-\\dfrac{1}{3}\\pi\\cdot 4\\cdot 5\\\\ V=\\dfrac{140}{3}\\pi\\end{gathered}$'),
        exampleAnswer: say('$\\dfrac{140}{3}\\pi\\approx 146{,}6$ cm³.', '$\\dfrac{140}{3}\\pi\\approx 146{,}6$ cm³.', '$\\dfrac{140}{3}\\pi\\approx 146{,}6$ سم³.', '$\\dfrac{140}{3}\\pi\\approx 146{,}6$ cm³.')
    },
    models: {
        vocabulary: [
            say('eskala', 'escala', 'المقياس', 'scale'),
            say('planoa', 'plano', 'المخطط', 'plan'),
            say('maketa', 'maqueta', 'المجسّم', 'model')
        ],
        explanation: say(
            '$1\\mathbin{:}n$ eskalak esan nahi du planoko unitate bat errealitatean $n$ dela: antzekotasun-arrazoia $n$ da. Benetako luzerak $n$ aldiz handiagoak dira; azalerak, $n^{2}$; bolumenak, $n^{3}$. 1:100 eskalan, 5 cm bider 4 cm-ko gela batek 5 m bider 4 m neurtzen ditu: haren azalera, 10\u00a0000 aldiz gehiago.',
            'Una escala $1\\mathbin{:}n$ significa que una unidad del plano es $n$ en la realidad: la razón de semejanza es $n$. Las longitudes reales son $n$ veces mayores; las áreas, $n^{2}$; los volúmenes, $n^{3}$. A escala 1:100, una habitación de 5 cm por 4 cm mide 5 m por 4 m: su área, 10\u00a0000 veces más.',
            'المقياس $1\\mathbin{:}n$ يعني أن وحدة في المخطط أو المجسّم تساوي $n$ في الواقع: نسبة التشابه $n$. الأطوال الحقيقية أكبر $n$ مرة، والمساحات $n^{2}$، والحجوم $n^{3}$. بمقياس 1:100 تقيس غرفة 5 سم في 4 سم في الواقع 5 م في 4 م: ومساحتها أكبر 10\u00a0000 مرة.',
            'A scale of $1\\mathbin{:}n$ means one unit on the plan is $n$ in reality: the scale factor is $n$. Real lengths are $n$ times larger; areas, $n^{2}$; volumes, $n^{3}$. At 1:100, a 5 cm by 4 cm room is 5 m by 4 m: its area, 10,000 times more.'
        ),
        examplePrompt: say('1:50\u00a0000 eskalako mapa batean, bi herri 6 cm-ra daude. Zenbat km-ra daude errealitatean?', 'En un mapa a escala 1:50\u00a0000, dos pueblos están a 6 cm. ¿A cuántos km están en la realidad?', 'في خريطة بمقياس 1:50\u00a0000 تبعد قريتان 6 سم. كم كيلومترًا تبعدان في الواقع؟', 'On a 1:50,000 map, two villages are 6 cm apart. How many km apart are they in reality?'),
        example: same('$6\\cdot 50\\,000=300\\,000\\ \\mathrm{cm}\\ \\to\\ 3\\ \\mathrm{km}$'),
        exampleAnswer: say('3 km-ra: 300\u00a0000 cm.', 'A 3 km: 300\u00a0000 cm.', 'على بعد 3 كم: 300\u00a0000 سم.', '3 km apart: 300,000 cm.')
    }
}

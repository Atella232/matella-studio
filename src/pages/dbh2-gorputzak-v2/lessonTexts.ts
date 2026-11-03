import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { SolidsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Gorputz geometrikoak · 2. DBH — what each lesson tells: the new words
   (definitions), a short explanation, its cases as cards and the example as
   an exercise («Another example»). Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. The drawings carry
   their own numbers (the 3-4-5 prism, the 10-12-13 pyramid…); the example
   uses numbers of its own, never those of «Let's solve», of «Check it» or
   of the typical mistake. π ≈ 3,14 as in the lessons. Basque writes the
   area of the base A_O. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

/** As in lessons.tsx, the Arabic formulas get a decimal point */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const solidsLessonTexts: Record<SolidsTopicId, LessonTexts> = {
    /* ---------- 1. Polyhedra ---------- */
    elements: {
        definitions: [
            {
                term: say('Poliedroa', 'Poliedro', 'متعدد الأوجه', 'Polyhedron'),
                meaning: say(
                    'Poligonoz mugatutako gorputza: poligonoak aurpegiak dira. Aurpegiak ertzetan elkartzen dira, eta ertzak erpinetan.',
                    'Cuerpo limitado por polígonos, que son sus caras. Las caras se juntan en las aristas, y las aristas en los vértices.',
                    'جسم تحدّه مضلعات هي أوجهه. تلتقي الأوجه في الأحرف، وتلتقي الأحرف في الرؤوس.',
                    'A solid bounded by polygons, which are its faces. The faces meet at the edges, and the edges at the vertices.'
                )
            },
            {
                term: say('Prisma', 'Prisma', 'المنشور', 'Prism'),
                meaning: say('Bi oinarri berdin eta paralelo dituen poliedroa; alboko aurpegiak paralelogramoak dira.', 'Poliedro con dos bases iguales y paralelas; sus caras laterales son paralelogramos.', 'متعدد أوجه له قاعدتان متطابقتان ومتوازيتان، وأوجهه الجانبية متوازيات أضلاع.', 'A polyhedron with two equal, parallel bases; its lateral faces are parallelograms.')
            },
            {
                term: say('Piramidea', 'Pirámide', 'الهرم', 'Pyramid'),
                meaning: say('Oinarri bakarra duen poliedroa; alboko aurpegiak erpin batean elkartzen diren triangeluak dira.', 'Poliedro con una sola base; sus caras laterales son triángulos que se juntan en un vértice.', 'متعدد أوجه له قاعدة واحدة، وأوجهه الجانبية مثلثات تلتقي في رأس واحد.', 'A polyhedron with only one base; its lateral faces are triangles that meet at a vertex.')
            }
        ],
        explanation: say(
            'Oinarriko poligonoak ematen dio izena gorputzari: prisma triangeluarra, piramide pentagonala… Oinarriak poligono erregularrak eta alboko aurpegiak berdinak badira, erregularra da. Oinarriak $n$ alde baditu, elementuak honela zenbatzen dira:',
            'El polígono de la base da nombre al cuerpo: prisma triangular, pirámide pentagonal… Si las bases son polígonos regulares y las caras laterales iguales, es regular. Si la base tiene $n$ lados, los elementos se cuentan así:',
            'يأخذ الجسم اسمه من مضلع القاعدة: منشور ثلاثي، هرم خماسي… وإذا كانت القاعدتان مضلعين منتظمين والأوجه الجانبية متطابقة كان منتظمًا. وإذا كان للقاعدة $n$ أضلاع تُعدّ العناصر هكذا:',
            'The polygon of the base gives the solid its name: triangular prism, pentagonal pyramid… If the bases are regular polygons and the lateral faces are equal, it is regular. If the base has $n$ sides, the elements are counted like this:'
        ),
        cases: [
            {
                title: say('Prisma', 'Prisma', 'المنشور', 'Prism'),
                text: say('$n+2$ aurpegi, $3n$ ertz eta $2n$ erpin ditu.', 'Tiene $n+2$ caras, $3n$ aristas y $2n$ vértices.', 'له $n+2$ وجهًا و$3n$ حرفًا و$2n$ رأسًا.', 'It has $n+2$ faces, $3n$ edges and $2n$ vertices.')
            },
            {
                title: say('Piramidea', 'Pirámide', 'الهرم', 'Pyramid'),
                text: say('$n+1$ aurpegi, $2n$ ertz eta $n+1$ erpin ditu.', 'Tiene $n+1$ caras, $2n$ aristas y $n+1$ vértices.', 'له $n+1$ وجهًا و$2n$ حرفًا و$n+1$ رأسًا.', 'It has $n+1$ faces, $2n$ edges and $n+1$ vertices.')
            }
        ],
        examplePrompt: say(
            'Zenbat aurpegi, ertz eta erpin ditu prisma dekagonal batek (10 aldeko oinarria)?',
            '¿Cuántas caras, aristas y vértices tiene un prisma decagonal (base de 10 lados)?',
            'كم وجهًا وحرفًا ورأسًا للمنشور العشاري (قاعدته ذات 10 أضلاع)؟',
            'How many faces, edges and vertices does a decagonal prism (a base with 10 sides) have?'
        ),
        example: same('$\\begin{gathered}10+2=12\\\\3\\cdot 10=30\\\\2\\cdot 10=20\\end{gathered}$'),
        exampleAnswer: say('12 aurpegi, 30 ertz eta 20 erpin.', '12 caras, 30 aristas y 20 vértices.', '12 وجهًا و30 حرفًا و20 رأسًا.', '12 faces, 30 edges and 20 vertices.')
    },
    euler: {
        definitions: [
            {
                term: say('Poliedro ganbila', 'Poliedro convexo', 'متعدد الأوجه المحدّب', 'Convex polyhedron'),
                meaning: say(
                    'Edozein aurpegiren planoak poliedro osoa alde batean uzten du. Bestela, ahurra da: koska bat du.',
                    'El plano de cualquier cara deja todo el poliedro a un mismo lado. Si no, es cóncavo: tiene un entrante.',
                    'يترك مستوى أي وجه الجسمَ كله في جهة واحدة. وإلا فهو مقعّر: فيه انبعاج.',
                    'The plane of any face leaves the whole polyhedron on one side. If not, it is concave: it has a dent.'
                )
            }
        ],
        explanation: say(
            'Poliedro ganbil orotan Eulerren formula betetzen da: aurpegiak + erpinak = ertzak + 2. Kuboan, $6+8=12+2$. Bi datu jakinda, hirugarrena ateratzen da. Betetzen ez bada, gorputza ez da poliedro ganbila: zenbaketak berrikusteko balio du.',
            'En todo poliedro convexo se cumple la fórmula de Euler: caras + vértices = aristas + 2. En el cubo, $6+8=12+2$. Conociendo dos de los datos, sale el tercero. Si no se cumple, el cuerpo no es un poliedro convexo: sirve para revisar los recuentos.',
            'في كل متعدد أوجه محدّب تتحقق صيغة أويلر: الأوجه + الرؤوس = الأحرف + 2. في المكعب: $6+8=12+2$. وبمعرفة معطيين يُستخرج الثالث. وإذا لم تتحقق فالجسم ليس متعدد أوجه محدّبًا: إنها طريقة لمراجعة العدّ.',
            'Every convex polyhedron satisfies Euler\'s formula: faces + vertices = edges + 2. For the cube, $6+8=12+2$. If you know two of the values, you get the third. If it does not hold, the solid is not a convex polyhedron: it is a way to check your counts.'
        ),
        examplePrompt: say(
            'Poliedro ganbil batek 14 aurpegi eta 36 ertz ditu. Zenbat erpin ditu?',
            'Un poliedro convexo tiene 14 caras y 36 aristas. ¿Cuántos vértices tiene?',
            'متعدد أوجه محدّب له 14 وجهًا و36 حرفًا. كم رأسًا له؟',
            'A convex polyhedron has 14 faces and 36 edges. How many vertices does it have?'
        ),
        example: same('$\\begin{gathered}36+2-14=24\\\\14+24=36+2\\end{gathered}$'),
        exampleAnswer: say('24 erpin ditu.', 'Tiene 24 vértices.', 'له 24 رأسًا.', 'It has 24 vertices.')
    },
    regular: {
        definitions: [
            {
                term: say('Poliedro erregularra', 'Poliedro regular', 'متعدد الأوجه المنتظم', 'Regular polyhedron'),
                meaning: say(
                    'Aurpegi guztiak poligono erregular berdinak dira, eta erpin guztietan aurpegi kopuru bera elkartzen da.',
                    'Todas sus caras son polígonos regulares iguales y en cada vértice se junta el mismo número de caras.',
                    'جميع أوجهه مضلعات منتظمة متطابقة، ويلتقي العدد نفسه من الأوجه عند كل رأس.',
                    'All its faces are equal regular polygons, and the same number of faces meet at every vertex.'
                )
            }
        ],
        explanation: say(
            'Bost besterik ez daude: tetraedroa, kuboa, oktaedroa, dodekaedroa eta ikosaedroa. Erpin batean gutxienez hiru aurpegi elkartzen dira, eta haien angeluen baturak 360° baino txikiagoa izan behar du: 360° izanez gero, laua geratzen da.',
            'Solo hay cinco: tetraedro, cubo, octaedro, dodecaedro e icosaedro. En un vértice se juntan al menos tres caras, y la suma de sus ángulos tiene que ser menor que 360°: si llega a 360°, queda plano.',
            'وهي خمسة فقط: رباعي الأوجه، والمكعب، وثماني الأوجه، واثنا عشري الأوجه، وعشريني الأوجه. يلتقي عند الرأس ثلاثة أوجه على الأقل، ويجب أن يكون مجموع زواياها أقل من 360°: فإن بلغ 360° بقي مستويًا.',
            'There are only five: tetrahedron, cube, octahedron, dodecahedron and icosahedron. At least three faces meet at a vertex, and the sum of their angles must be less than 360°: if it reaches 360°, the vertex is flat.'
        ),
        cases: [
            {
                title: say('Triangeluak', 'Triángulos', 'المثلثات', 'Triangles'),
                text: say('3, 4 edo 5 erpin bakoitzean: tetraedroa (4 aurpegi), oktaedroa (8) eta ikosaedroa (20).', '3, 4 o 5 en cada vértice: tetraedro (4 caras), octaedro (8) e icosaedro (20).', '3 أو 4 أو 5 عند كل رأس: رباعي الأوجه (4 أوجه)، وثماني الأوجه (8)، وعشريني الأوجه (20).', '3, 4 or 5 at each vertex: tetrahedron (4 faces), octahedron (8) and icosahedron (20).'),
                math: same('$5\\cdot 60^{\\circ}=300^{\\circ}$')
            },
            {
                title: say('Karratuak', 'Cuadrados', 'المربعات', 'Squares'),
                text: say('3 erpin bakoitzean: kuboa (6 aurpegi).', '3 en cada vértice: el cubo (6 caras).', '3 عند كل رأس: المكعب (6 أوجه).', '3 at each vertex: the cube (6 faces).'),
                math: same('$3\\cdot 90^{\\circ}=270^{\\circ}$')
            },
            {
                title: say('Pentagonoak', 'Pentágonos', 'المخمسات', 'Pentagons'),
                text: say('3 erpin bakoitzean: dodekaedroa (12 aurpegi).', '3 en cada vértice: el dodecaedro (12 caras).', '3 عند كل رأس: اثنا عشري الأوجه (12 وجهًا).', '3 at each vertex: the dodecahedron (12 faces).'),
                math: same('$3\\cdot 108^{\\circ}=324^{\\circ}$')
            }
        ],
        examplePrompt: say('Zenbat ertz ditu dodekaedroak? (12 pentagono)', '¿Cuántas aristas tiene el dodecaedro? (12 pentágonos)', 'كم حرفًا لاثني عشري الأوجه؟ (12 مخمسًا)', 'How many edges does the dodecahedron have? (12 pentagons)'),
        example: same('$\\begin{gathered}12\\cdot 5=60\\\\60\\mathbin{:}2=30\\end{gathered}$'),
        exampleAnswer: say('30 ertz ditu: ertz bakoitza bi aurpegik partekatzen dute.', 'Tiene 30 aristas: cada arista la comparten dos caras.', 'له 30 حرفًا: يشترك وجهان في كل حرف.', 'It has 30 edges: two faces share each edge.')
    },

    /* ---------- 2. Areas of polyhedra ---------- */
    'prism-area': {
        definitions: [
            {
                term: say('Garapen laua', 'Desarrollo plano', 'النشر المستوي', 'Net'),
                meaning: say('Gorputz bat ireki eta mahai gainean zabaltzean ateratzen den irudia.', 'La figura que sale al abrir un cuerpo y extenderlo sobre la mesa.', 'الشكل الناتج عن فتح الجسم وبسطه على الطاولة.', 'The flat shape you get when you open a solid and lay it out on the table.')
            }
        ],
        explanation: say(
            'Prisma baten garapenean, alboko aurpegiek laukizuzen bat osatzen dute: haren oinarria prismaren oinarriaren perimetroa da, eta altuera prismarena. Beraz, $A_L=P\\cdot h$, eta azalera osoak bi oinarriak gehitzen ditu: $A_T=A_L+2\\cdot A_O$.',
            'En el desarrollo de un prisma, las caras laterales forman un rectángulo: su base es el perímetro de la base del prisma, y su altura, la del prisma. Por eso $A_L=P\\cdot h$, y el área total suma las dos bases: $A_T=A_L+2\\cdot A_B$.',
            'في نشر المنشور تكوّن الأوجه الجانبية مستطيلًا: قاعدته محيط قاعدة المنشور، وارتفاعه ارتفاع المنشور. لذلك $A_L=P\\cdot h$، والمساحة الكلية تضيف القاعدتين: $A_T=A_L+2\\cdot A_B$.',
            'In the net of a prism, the lateral faces form a rectangle: its base is the perimeter of the prism\'s base, and its height is the prism\'s height. So $A_L=P\\cdot h$, and the total area adds the two bases: $A_T=A_L+2\\cdot A_B$.'
        ),
        cases: [
            {
                title: say('Ortoedroa', 'Ortoedro', 'متوازي المستطيلات', 'Cuboid'),
                text: say('Sei laukizuzen, binaka berdinak.', 'Seis rectángulos, iguales dos a dos.', 'ستة مستطيلات متطابقة مثنى مثنى.', 'Six rectangles, equal in pairs.'),
                math: same('$A_T=2(ab+ac+bc)$')
            },
            {
                title: say('Kuboa', 'Cubo', 'المكعب', 'Cube'),
                text: say('Sei karratu berdin.', 'Seis cuadrados iguales.', 'ستة مربعات متطابقة.', 'Six equal squares.'),
                math: same('$A_T=6l^{2}$')
            }
        ],
        examplePrompt: say(
            'Prisma zuzen baten oinarria 6 cm eta 8 cm-ko katetoak dituen triangelu angeluzuzena da (hipotenusa 10 cm), eta prismak 20 cm-ko altuera du. Kalkulatu azalera osoa.',
            'Un prisma recto tiene por base un triángulo rectángulo de catetos 6 cm y 8 cm (hipotenusa 10 cm), y mide 20 cm de alto. Calcula su área total.',
            'قاعدة منشور قائم مثلث قائم ضلعاه القائمان 6 سم و8 سم (ووتره 10 سم)، وارتفاع المنشور 20 سم. احسب مساحته الكلية.',
            'A right prism has a right-angled triangle as its base, with legs of 6 cm and 8 cm (hypotenuse 10 cm), and is 20 cm high. Work out its total area.'
        ),
        example: {
            eu: '$\\begin{gathered}A_L=(6+8+10)\\cdot 20=480\\\\A_O=\\frac{6\\cdot 8}{2}=24\\\\A_T=480+2\\cdot 24=528\\end{gathered}$',
            es: '$\\begin{gathered}A_L=(6+8+10)\\cdot 20=480\\\\A_B=\\frac{6\\cdot 8}{2}=24\\\\A_T=480+2\\cdot 24=528\\end{gathered}$',
            en: '$\\begin{gathered}A_L=(6+8+10)\\cdot 20=480\\\\A_B=\\frac{6\\cdot 8}{2}=24\\\\A_T=480+2\\cdot 24=528\\end{gathered}$',
            ar: '$\\begin{gathered}A_L=(6+8+10)\\cdot 20=480\\\\A_B=\\frac{6\\cdot 8}{2}=24\\\\A_T=480+2\\cdot 24=528\\end{gathered}$'
        },
        exampleAnswer: say('Azalera osoa 528 cm² da.', 'El área total es 528 cm².', 'المساحة الكلية 528 سم².', 'The total area is 528 cm².')
    },
    'pyramid-area': {
        definitions: [
            {
                term: say('Piramidearen apotema', 'Apotema de la pirámide', 'عامد الهرم', 'Slant height'),
                meaning: say(
                    'Alboko triangelu bakoitzaren altuera ($a$). Ez da piramidearen altuera ($h$), ez eta oinarriaren apotema ($a\'$) ere.',
                    'La altura de cada triángulo lateral ($a$). No es la altura de la pirámide ($h$) ni la apotema de la base ($a\'$).',
                    'ارتفاع كل مثلث جانبي ($a$). وليس ارتفاع الهرم ($h$) ولا عامد القاعدة ($a\'$).',
                    'The height of each lateral triangle ($a$). It is not the height of the pyramid ($h$) nor the apothem of the base ($a\'$).'
                )
            }
        ],
        explanation: say(
            'Piramide erregular baten garapena oinarria da eta, inguruan, triangelu isoszele berdinak. Beraz, $A_L=\\frac{P\\cdot a}{2}$ eta $A_T=A_L+A_O$. Apotema ematen ez badute, altuera eta oinarriaren apotema triangelu angeluzuzen baten katetoak dira, eta $a$ hipotenusa: $a=\\sqrt{h^{2}+a\'^{2}}$.',
            'El desarrollo de una pirámide regular es la base y, alrededor, triángulos isósceles iguales. Por eso $A_L=\\frac{P\\cdot a}{2}$ y $A_T=A_L+A_B$. Si no dan la apotema, la altura y la apotema de la base son los catetos de un triángulo rectángulo, y $a$ la hipotenusa: $a=\\sqrt{h^{2}+a\'^{2}}$.',
            'نشر الهرم المنتظم هو القاعدة وحولها مثلثات متساوية الساقين متطابقة. لذلك $A_L=\\frac{P\\cdot a}{2}$ و$A_T=A_L+A_B$. وإذا لم يُعطَ العامد فالارتفاع وعامد القاعدة ضلعان قائمان في مثلث قائم، و$a$ وتره: $a=\\sqrt{h^{2}+a\'^{2}}$.',
            'The net of a regular pyramid is the base and, around it, equal isosceles triangles. So $A_L=\\frac{P\\cdot a}{2}$ and $A_T=A_L+A_B$. If the slant height is not given, the height and the apothem of the base are the legs of a right-angled triangle, and $a$ is the hypotenuse: $a=\\sqrt{h^{2}+a\'^{2}}$.'
        ),
        examplePrompt: say(
            'Piramide erregular baten oinarria 18 cm-ko aldeko karratua da, eta altuera 12 cm. Kalkulatu azalera osoa.',
            'Una pirámide regular tiene base cuadrada de 18 cm de lado y 12 cm de altura. Calcula su área total.',
            'هرم منتظم قاعدته مربع طول ضلعه 18 سم وارتفاعه 12 سم. احسب مساحته الكلية.',
            'A regular pyramid has a square base with 18 cm sides and a height of 12 cm. Work out its total area.'
        ),
        example: same('$\\begin{gathered}a=\\sqrt{12^{2}+9^{2}}=15\\\\A_T=4\\cdot\\frac{18\\cdot 15}{2}+18^{2}=864\\end{gathered}$'),
        exampleAnswer: say('Azalera osoa 864 cm² da. Oinarriaren apotema aldearen erdia da, 9.', 'El área total es 864 cm². La apotema de la base es medio lado, 9.', 'المساحة الكلية 864 سم². وعامد القاعدة نصف الضلع، 9.', 'The total area is 864 cm². The apothem of the base is half the side, 9.')
    },
    'frustum-area': {
        definitions: [
            {
                term: say('Piramide-enborra', 'Tronco de pirámide', 'جذع الهرم', 'Truncated pyramid'),
                meaning: say(
                    'Piramide bat oinarriarekiko paralelo den plano batez moztean behean geratzen dena: bi oinarri desberdin, eta trapezioak alboko aurpegi.',
                    'Lo que queda debajo al cortar una pirámide con un plano paralelo a la base: dos bases distintas y trapecios como caras laterales.',
                    'ما يبقى في الأسفل عند قطع هرم بمستوى موازٍ للقاعدة: قاعدتان مختلفتان، وأوجه جانبية هي أشباه منحرفات.',
                    'What is left at the bottom when a pyramid is cut by a plane parallel to the base: two different bases, and trapeziums as lateral faces.'
                )
            }
        ],
        explanation: say(
            'Trapezio horien altuera enborraren apotema da ($a$). Enbor erregularrean, alboko azalera trapezioen batura da: $A_L=\\frac{(P+P\')\\cdot a}{2}$; azalera osoa lortzeko, gehitu bi oinarriak. Apotema ematen ez badute, Pitagorasekin ateratzen da: alboko ertza hipotenusa da.',
            'La altura de esos trapecios es la apotema del tronco ($a$). En un tronco regular, el área lateral es la suma de los trapecios: $A_L=\\frac{(P+P\')\\cdot a}{2}$; para el área total, suma las dos bases. Si no dan la apotema, sale con Pitágoras: la arista lateral es la hipotenusa.',
            'ارتفاع هذه الأشكال هو عامد الجذع ($a$). في الجذع المنتظم المساحة الجانبية مجموع أشباه المنحرفات: $A_L=\\frac{(P+P\')\\cdot a}{2}$؛ وللمساحة الكلية أضف القاعدتين. وإذا لم يُعطَ العامد فإنه يُستخرج بفيثاغورس: الحرف الجانبي هو الوتر.',
            'The height of those trapeziums is the slant height of the frustum ($a$). In a regular frustum, the lateral area is the sum of the trapeziums: $A_L=\\frac{(P+P\')\\cdot a}{2}$; for the total area, add the two bases. If the slant height is not given, Pythagoras gives it: the lateral edge is the hypotenuse.'
        ),
        examplePrompt: say(
            'Piramide-enbor erregular baten oinarriak 8 cm eta 4 cm-ko aldeko karratuak dira, eta apotema 6 cm. Kalkulatu azalera osoa.',
            'Un tronco de pirámide regular tiene bases cuadradas de 8 cm y 4 cm de lado, y su apotema mide 6 cm. Calcula su área total.',
            'جذع هرم منتظم قاعدتاه مربعان طولا ضلعيهما 8 سم و4 سم، وعامده 6 سم. احسب مساحته الكلية.',
            'A regular truncated pyramid has square bases with sides of 8 cm and 4 cm, and its slant height is 6 cm. Work out its total area.'
        ),
        example: same('$\\begin{gathered}A_L=\\frac{(32+16)\\cdot 6}{2}=144\\\\A_T=144+64+16=224\\end{gathered}$'),
        exampleAnswer: say('Perimetroak 32 cm eta 16 cm dira. Azalera osoa 224 cm² da.', 'Los perímetros son 32 cm y 16 cm. El área total es 224 cm².', 'المحيطان 32 سم و16 سم. والمساحة الكلية 224 سم².', 'The perimeters are 32 cm and 16 cm. The total area is 224 cm².')
    },

    /* ---------- 3. Solids of revolution ---------- */
    cylinder: {
        definitions: [
            {
                term: say('Biraketa-gorputza', 'Cuerpo de revolución', 'الجسم الدوراني', 'Solid of revolution'),
                meaning: say(
                    'Irudi lau bat ardatz baten inguruan biratuz sortzen dena. Laukizuzen batek bere alde baten inguruan biratuz zilindroa sortzen du.',
                    'El que se genera al girar una figura plana alrededor de un eje. Un rectángulo que gira sobre un lado genera un cilindro.',
                    'جسم ينشأ بدوران شكل مستوٍ حول محور. والمستطيل الذي يدور حول أحد أضلاعه يولّد أسطوانة.',
                    'A solid made by rotating a flat shape around an axis. A rectangle rotating around one side makes a cylinder.'
                )
            }
        ],
        explanation: say(
            'Zilindroaren garapena laukizuzen bat eta bi zirkulu dira. Laukizuzenaren oinarria zirkunferentziaren luzera da, $2\\pi r$, eta altuera zilindroarena. Beraz, $A_L=2\\pi r\\cdot h$ eta $A_T=2\\pi r h+2\\pi r^{2}$. $\\pi\\approx 3{,}14$ erabiliko dugu.',
            'El desarrollo del cilindro es un rectángulo y dos círculos. La base del rectángulo es la longitud de la circunferencia, $2\\pi r$, y su altura, la del cilindro. Por eso $A_L=2\\pi r\\cdot h$ y $A_T=2\\pi r h+2\\pi r^{2}$. Usaremos $\\pi\\approx 3{,}14$.',
            'نشر الأسطوانة مستطيل ودائرتان. قاعدة المستطيل طول محيط الدائرة $2\\pi r$، وارتفاعه ارتفاع الأسطوانة. لذلك $A_L=2\\pi r\\cdot h$ و$A_T=2\\pi r h+2\\pi r^{2}$. سنستعمل $\\pi\\approx 3{,}14$.',
            'The net of a cylinder is a rectangle and two circles. The base of the rectangle is the circumference of the circle, $2\\pi r$, and its height is the cylinder\'s height. So $A_L=2\\pi r\\cdot h$ and $A_T=2\\pi r h+2\\pi r^{2}$. We will use $\\pi\\approx 3{,}14$.'
        ),
        examplePrompt: say(
            'Lata zilindriko batek 3 cm-ko erradioa eta 10 cm-ko altuera ditu. Zenbat paper behar da haren etiketarako?',
            'Una lata cilíndrica tiene 3 cm de radio y 10 cm de altura. ¿Cuánto papel hace falta para su etiqueta?',
            'علبة أسطوانية نصف قطرها 3 سم وارتفاعها 10 سم. كم من الورق يلزم لملصقها؟',
            'A cylindrical can has a 3 cm radius and is 10 cm high. How much paper does its label need?'
        ),
        example: same('$A_L=2\\cdot 3{,}14\\cdot 3\\cdot 10=188{,}4$'),
        exampleAnswer: say('188,4 cm² paper: alboko azalera bakarrik, oinarririk gabe.', 'Hacen falta 188,4 cm² de papel: solo el área lateral, sin las bases.', 'يلزم 188.4 سم² من الورق: المساحة الجانبية وحدها، دون القاعدتين.', '188.4 cm² of paper: only the lateral area, without the bases.')
    },
    cone: {
        definitions: [
            {
                term: say('Sortzailea', 'Generatriz', 'الراسم', 'Slant height'),
                meaning: say(
                    'Konoaren erpinetik oinarriko zirkunferentziaren puntu batera doan zuzenkia ($g$): biratzen den triangeluaren hipotenusa.',
                    'El segmento que va del vértice del cono a un punto de la circunferencia de la base ($g$): la hipotenusa del triángulo que gira.',
                    'القطعة الواصلة من رأس المخروط إلى نقطة على محيط القاعدة ($g$): وتر المثلث الذي يدور.',
                    'The segment from the vertex of the cone to a point on the edge of the base ($g$): the hypotenuse of the triangle that rotates.'
                )
            }
        ],
        explanation: say(
            'Konoa triangelu angeluzuzen bat kateto baten inguruan biratuz sortzen da: $h$ altueraren inguruan. Beste katetoa $r$ erradioa da, eta hipotenusa sortzailea: $g=\\sqrt{h^{2}+r^{2}}$. Haren garapena sektore zirkular bat eta zirkulu bat dira.',
            'El cono se genera al girar un triángulo rectángulo alrededor de un cateto: la altura $h$. El otro cateto es el radio $r$ y la hipotenusa, la generatriz: $g=\\sqrt{h^{2}+r^{2}}$. Su desarrollo es un sector circular y un círculo.',
            'ينشأ المخروط بدوران مثلث قائم حول أحد ضلعيه القائمين: الارتفاع $h$. والضلع الآخر نصف القطر $r$، والوتر هو الراسم: $g=\\sqrt{h^{2}+r^{2}}$. ونشره قطاع دائري ودائرة.',
            'A cone is made by rotating a right-angled triangle around one leg: the height $h$. The other leg is the radius $r$ and the hypotenuse is the slant height: $g=\\sqrt{h^{2}+r^{2}}$. Its net is a circular sector and a circle.'
        ),
        cases: [
            {
                title: say('Konoa', 'Cono', 'المخروط', 'Cone'),
                text: say('Alboko azalera; osoa lortzeko, gehitu oinarria, $\\pi r^{2}$.', 'El área lateral; para la total, suma la base, $\\pi r^{2}$.', 'المساحة الجانبية؛ وللكلية أضف القاعدة $\\pi r^{2}$.', 'The lateral area; for the total, add the base, $\\pi r^{2}$.'),
                math: same('$A_L=\\pi r g$')
            },
            {
                title: say('Kono-enborra', 'Tronco de cono', 'جذع المخروط', 'Truncated cone'),
                text: say('Bi oinarri, $R$ eta $r$ erradiokoak; sortzailea: $g=\\sqrt{h^{2}+(R-r)^{2}}$.', 'Dos bases de radios $R$ y $r$; su generatriz: $g=\\sqrt{h^{2}+(R-r)^{2}}$.', 'قاعدتان نصفا قطريهما $R$ و$r$؛ وراسمه: $g=\\sqrt{h^{2}+(R-r)^{2}}$.', 'Two bases with radii $R$ and $r$; its slant height: $g=\\sqrt{h^{2}+(R-r)^{2}}$.'),
                math: same('$A_L=\\pi (R+r)\\,g$')
            }
        ],
        examplePrompt: say(
            'Kono batek 8 cm-ko erradioa eta 15 cm-ko altuera ditu. Kalkulatu alboko azalera.',
            'Un cono tiene 8 cm de radio y 15 cm de altura. Calcula su área lateral.',
            'مخروط نصف قطره 8 سم وارتفاعه 15 سم. احسب مساحته الجانبية.',
            'A cone has an 8 cm radius and a height of 15 cm. Work out its lateral area.'
        ),
        example: same('$\\begin{gathered}g=\\sqrt{15^{2}+8^{2}}=17\\\\A_L=3{,}14\\cdot 8\\cdot 17=427{,}04\\end{gathered}$'),
        exampleAnswer: say('Alboko azalera 427,04 cm² da. Formulan sortzailea doa, ez altuera.', 'El área lateral es 427,04 cm². En la fórmula va la generatriz, no la altura.', 'المساحة الجانبية 427.04 سم². وفي الصيغة يدخل الراسم لا الارتفاع.', 'The lateral area is 427.04 cm². The formula uses the slant height, not the height.')
    },
    sphere: {
        definitions: [
            {
                term: say('Zirkulu handia', 'Círculo máximo', 'الدائرة العظمى', 'Great circle'),
                meaning: say('Esferaren zentrotik pasatzen den zirkulua; esferaren erradio bera du.', 'El círculo que pasa por el centro de la esfera; tiene su mismo radio.', 'الدائرة التي تمر بمركز الكرة، ولها نصف قطرها نفسه.', 'The circle through the centre of the sphere; it has the same radius.')
            },
            {
                term: say('Zilindro zirkunskribatua', 'Cilindro circunscrito', 'الأسطوانة المحيطة', 'Circumscribed cylinder'),
                meaning: say('Esfera justu biltzen duen zilindroa: erradioa esferarena da, eta altuera diametroa.', 'El cilindro que envuelve justo la esfera: su radio es el de la esfera y su altura, el diámetro.', 'الأسطوانة التي تحيط بالكرة تمامًا: نصف قطرها نصف قطر الكرة وارتفاعها القطر.', 'The cylinder that just wraps the sphere: its radius is the sphere\'s and its height is the diameter.')
            }
        ],
        explanation: say(
            'Esfera zirkulu-erdi bat bere diametroaren inguruan biratuz sortzen da. Ezin da laua bihurtu, baina Arkimedesek aurkitu zuen haren azalera zilindro zirkunskribatuaren alboko azalera bezainbestekoa dela: $A=4\\pi r^{2}$, lau zirkulu handi.',
            'La esfera se genera al girar un semicírculo alrededor de su diámetro. No se puede aplanar, pero Arquímedes descubrió que su área es igual al área lateral del cilindro circunscrito: $A=4\\pi r^{2}$, cuatro círculos máximos.',
            'تنشأ الكرة بدوران نصف دائرة حول قطرها. لا يمكن جعلها مستوية، لكن أرخميدس اكتشف أن مساحتها تساوي المساحة الجانبية للأسطوانة المحيطة: $A=4\\pi r^{2}$، أي أربع دوائر عظمى.',
            'A sphere is made by rotating a semicircle around its diameter. It cannot be flattened, but Archimedes found that its area equals the lateral area of the circumscribed cylinder: $A=4\\pi r^{2}$, four great circles.'
        ),
        cases: [
            {
                title: say('Zona eta kasketa', 'Zona y casquete', 'المنطقة والقبعة', 'Zone and cap'),
                text: say('Bi plano paraleloren arteko zatia (zona) edo plano batek moztutakoa (kasketa): zilindroaren banda, $h$ altuerakoa.', 'La parte entre dos planos paralelos (zona) o la que corta un plano (casquete): la banda del cilindro, de altura $h$.', 'الجزء بين مستويين متوازيين (منطقة) أو الذي يقطعه مستوٍ واحد (قبعة): شريط الأسطوانة الذي ارتفاعه $h$.', 'The part between two parallel planes (zone) or cut off by one plane (cap): the band of the cylinder, of height $h$.'),
                math: same('$A=2\\pi r h$')
            },
            {
                title: say('Sekzioa', 'Sección', 'المقطع', 'Section'),
                text: say('Plano batek esfera zirkulu batean mozten du; zentrotik $d$ distantziara, haren erradioa:', 'Un plano corta la esfera en un círculo; a una distancia $d$ del centro, su radio es:', 'يقطع المستوي الكرة في دائرة؛ وعلى بعد $d$ من المركز يكون نصف قطرها:', 'A plane cuts the sphere in a circle; at a distance $d$ from the centre, its radius is:'),
                math: same('$\\sqrt{r^{2}-d^{2}}$')
            }
        ],
        examplePrompt: say('Pilota batek 12 cm-ko erradioa du. Kalkulatu haren azalera.', 'Una pelota tiene 12 cm de radio. Calcula su área.', 'كرة نصف قطرها 12 سم. احسب مساحتها.', 'A ball has a 12 cm radius. Work out its area.'),
        example: same('$A=4\\cdot 3{,}14\\cdot 12^{2}=1808{,}64$'),
        exampleAnswer: say('Azalera 1808,64 cm² da: lau zirkulu handi.', 'El área es 1808,64 cm²: cuatro círculos máximos.', 'المساحة 1808.64 سم²: أربع دوائر عظمى.', 'The area is 1808.64 cm²: four great circles.')
    },

    /* ---------- 4. Volume ---------- */
    'volume-units': {
        definitions: [
            {
                term: say('Bolumena', 'Volumen', 'الحجم', 'Volume'),
                meaning: say('Gorputz batek hartzen duen espazioa. Unitatea metro kubikoa da (m³): metro bateko ertza duen kuboa.', 'El espacio que ocupa un cuerpo. Su unidad es el metro cúbico (m³), un cubo de un metro de arista.', 'الحيز الذي يشغله الجسم. ووحدته المتر المكعب (m³)، أي مكعب طول حرفه متر.', 'The space a solid takes up. Its unit is the cubic metre (m³), a cube with a one-metre edge.')
            }
        ],
        explanation: say(
            'Dezimetro kubiko batean $10\\cdot 10\\cdot 10=1000$ zentimetro kubiko sartzen dira. Horregatik, maila bakoitza (km³, hm³, dam³, m³, dm³, cm³, mm³) hurrengoa baino 1000 aldiz handiagoa da: jaisteko, biderkatu 1000 maila bakoitzeko; igotzeko, zatitu.',
            'En un decímetro cúbico caben $10\\cdot 10\\cdot 10=1000$ centímetros cúbicos. Por eso cada escalón (km³, hm³, dam³, m³, dm³, cm³, mm³) es 1000 veces el siguiente: para bajar, multiplica por 1000 en cada escalón; para subir, divide.',
            'في الديسيمتر المكعب $10\\cdot 10\\cdot 10=1000$ سنتيمتر مكعب. لذلك كل درجة (km³، hm³، dam³، m³، dm³، cm³، mm³) تساوي 1000 مرة الدرجة التالية: للنزول اضرب في 1000 لكل درجة؛ وللصعود اقسم.',
            'A cubic decimetre holds $10\\cdot 10\\cdot 10=1000$ cubic centimetres. So each step (km³, hm³, dam³, m³, dm³, cm³, mm³) is 1000 times the next one: to go down, multiply by 1000 at each step; to go up, divide.'
        ),
        examplePrompt: say('Adierazi dm³-tan: 7200 cm³ eta 0,8 m³.', 'Expresa en dm³: 7200 cm³ y 0,8 m³.', 'عبّر بـdm³ عن: 7200 cm³ و0.8 m³.', 'Write in dm³: 7200 cm³ and 0.8 m³.'),
        example: same('$\\begin{gathered}7200\\mathbin{:}1000=7{,}2\\\\0{,}8\\cdot 1000=800\\end{gathered}$'),
        exampleAnswer: say('7,2 dm³ eta 800 dm³: igotzeko zatitu egiten da; jaisteko, biderkatu.', '7,2 dm³ y 800 dm³: para subir se divide; para bajar, se multiplica.', '7.2 dm³ و800 dm³: للصعود نقسم، وللنزول نضرب.', '7.2 dm³ and 800 dm³: to go up you divide; to go down, you multiply.')
    },
    capacity: {
        definitions: [
            {
                term: say('Edukiera', 'Capacidad', 'السعة', 'Capacity'),
                meaning: say('Ontzi baten barruan sartzen dena. Litrotan (L) neurtzen da.', 'Lo que cabe dentro de un recipiente. Se mide en litros (L).', 'ما يتسع له الإناء. وتقاس باللتر (L).', 'What fits inside a container. It is measured in litres (L).')
            }
        ],
        explanation: say(
            'Litro bat dezimetro bateko ertza duen kubo batean sartzen dena da: $1\\ \\text{dm}^{3}=1\\ \\text{L}$. Hortik, $1\\ \\text{cm}^{3}=1\\ \\text{mL}$ eta $1\\ \\text{m}^{3}=1000\\ \\text{L}$. Edukiera-unitateak hamarnaka doaz, eta bolumenekoak milaka. Ur litro batek ia kilo bat pisatzen du.',
            'Un litro es lo que cabe en un cubo de un decímetro de arista: $1\\ \\text{dm}^{3}=1\\ \\text{L}$. De ahí, $1\\ \\text{cm}^{3}=1\\ \\text{mL}$ y $1\\ \\text{m}^{3}=1000\\ \\text{L}$. Las unidades de capacidad van de 10 en 10, y las de volumen, de 1000 en 1000. Un litro de agua pesa casi un kilo.',
            'اللتر هو ما يتسع له مكعب طول حرفه ديسيمتر: $1\\ \\text{dm}^{3}=1\\ \\text{L}$. ومن ذلك $1\\ \\text{cm}^{3}=1\\ \\text{mL}$ و$1\\ \\text{m}^{3}=1000\\ \\text{L}$. تتدرج وحدات السعة عشرة عشرة، ووحدات الحجم ألفًا ألفًا. ولتر الماء يزن نحو كيلوغرام.',
            'A litre is what fits in a cube with a one-decimetre edge: $1\\ \\text{dm}^{3}=1\\ \\text{L}$. So $1\\ \\text{cm}^{3}=1\\ \\text{mL}$ and $1\\ \\text{m}^{3}=1000\\ \\text{L}$. Units of capacity go in steps of 10, and units of volume in steps of 1000. A litre of water weighs about a kilogram.'
        ),
        examplePrompt: say('Botila batek 750 cm³-ko edukiera du. Zenbat litro dira?', 'Una botella tiene 750 cm³ de capacidad. ¿Cuántos litros son?', 'سعة زجاجة 750 cm³. كم لترًا هي؟', 'A bottle holds 750 cm³. How many litres is that?'),
        example: same('$750\\mathbin{:}1000=0{,}75$'),
        exampleAnswer: say('0,75 L dira: 750 cm³ 750 mL baitira.', 'Son 0,75 L: 750 cm³ son 750 mL.', 'إنها 0.75 L: لأن 750 cm³ تساوي 750 mL.', 'It is 0.75 L: 750 cm³ is 750 mL.')
    },
    cavalieri: {
        definitions: [
            {
                term: say('Cavalieriren printzipioa', 'Principio de Cavalieri', 'مبدأ كافاليري', 'Cavalieri\'s principle'),
                meaning: say(
                    'Bi gorputzek altuera bera badute, eta oinarriarekiko plano paralelo bakoitzak azalera bereko sekzioak mozten baditu, bolumen bera dute.',
                    'Si dos cuerpos tienen la misma altura y cada plano paralelo a la base los corta en secciones de la misma área, tienen el mismo volumen.',
                    'إذا كان لجسمين الارتفاع نفسه وقطعهما كل مستوٍ موازٍ للقاعدة في مقطعين متساويي المساحة فلهما الحجم نفسه.',
                    'If two solids have the same height and every plane parallel to the base cuts them in sections of the same area, they have the same volume.'
                )
            }
        ],
        explanation: say(
            'Ortoedro bat unitate-kuboz betetzen baduzu, beheko geruzan luzera bider zabalera kubo sartzen dira, eta altuera adina geruza daude: $V=a\\cdot b\\cdot c$, oinarria bider altuera. Kuboan, $V=l^{3}$. Cavalieriren arabera, txanpon-pila zuzen batek eta okertu batek bolumen bera dute.',
            'Si llenas un ortoedro de cubos unidad, en la capa de abajo caben largo por ancho cubos, y hay tantas capas como la altura: $V=a\\cdot b\\cdot c$, base por altura. En el cubo, $V=l^{3}$. Por Cavalieri, una pila de monedas recta y otra inclinada tienen el mismo volumen.',
            'إذا ملأت متوازي مستطيلات بمكعبات الوحدة ففي الطبقة السفلى عدد من المكعبات يساوي الطول في العرض، وعدد الطبقات يساوي الارتفاع: $V=a\\cdot b\\cdot c$، القاعدة في الارتفاع. وفي المكعب $V=l^{3}$. وبحسب كافاليري لكومة نقود مستقيمة وأخرى مائلة الحجم نفسه.',
            'If you fill a cuboid with unit cubes, the bottom layer holds length times width cubes, and there are as many layers as the height: $V=a\\cdot b\\cdot c$, base times height. For a cube, $V=l^{3}$. By Cavalieri, a straight stack of coins and a slanted one have the same volume.'
        ),
        examplePrompt: say(
            'Kubo batek 6 cm-ko ertza du. Zein da haren bolumena? Eta oinarri eta altuera bereko prisma zeihar batena?',
            'Un cubo tiene 6 cm de arista. ¿Cuál es su volumen? ¿Y el de un prisma oblicuo con la misma base y la misma altura?',
            'مكعب طول حرفه 6 سم. ما حجمه؟ وما حجم منشور مائل له القاعدة نفسها والارتفاع نفسه؟',
            'A cube has 6 cm edges. What is its volume? And that of an oblique prism with the same base and the same height?'
        ),
        example: same('$V=6^{3}=216$'),
        exampleAnswer: say('Biek 216 cm³ dituzte: oinarri bera eta altuera bera.', 'Los dos tienen 216 cm³: misma base y misma altura.', 'لكليهما 216 سم³: القاعدة نفسها والارتفاع نفسه.', 'Both have 216 cm³: same base, same height.')
    },
    'prism-volume': {
        explanation: say(
            'Cavalieriren printzipioaren arabera, prisma eta zilindro orotan: $V=A_O\\cdot h$, oinarriaren azalera bider altuera. Zilindroan oinarria zirkulua da: $V=\\pi r^{2}h$. Gorputz konposatu batean, batu zatien bolumenak, edo kendu zuloa.',
            'Por el principio de Cavalieri, en todo prisma y cilindro: $V=A_B\\cdot h$, el área de la base por la altura. En el cilindro la base es un círculo: $V=\\pi r^{2}h$. En un cuerpo compuesto, suma los volúmenes de sus partes, o resta el hueco.',
            'وفق مبدأ كافاليري، في كل منشور وأسطوانة: $V=A_B\\cdot h$، مساحة القاعدة في الارتفاع. وفي الأسطوانة القاعدة دائرة: $V=\\pi r^{2}h$. وفي الجسم المركب اجمع حجوم أجزائه، أو اطرح التجويف.',
            'By Cavalieri\'s principle, in every prism and cylinder: $V=A_B\\cdot h$, the area of the base times the height. In a cylinder the base is a circle: $V=\\pi r^{2}h$. In a composite solid, add the volumes of its parts, or subtract the hole.'
        ),
        examplePrompt: say(
            'Prisma baten oinarria 24 cm²-ko hexagono erregularra da, eta prismak 15 cm-ko altuera du. Zein da haren bolumena litrotan?',
            'Un prisma tiene por base un hexágono regular de 24 cm² y mide 15 cm de alto. ¿Cuál es su volumen en litros?',
            'قاعدة منشور مسدس منتظم مساحته 24 سم²، وارتفاع المنشور 15 سم. ما حجمه باللتر؟',
            'A prism has a regular hexagon of 24 cm² as its base and is 15 cm high. What is its volume in litres?'
        ),
        example: same('$\\begin{gathered}V=24\\cdot 15=360\\\\360\\mathbin{:}1000=0{,}36\\end{gathered}$'),
        exampleAnswer: say('360 cm³, hau da, 0,36 L.', '360 cm³, es decir, 0,36 L.', '360 سم³، أي 0.36 L.', '360 cm³, that is, 0.36 L.')
    },
    'pyramid-volume': {
        explanation: say(
            'Piramide bat urez bete eta oinarri eta altuera bereko prisma batera husten baduzu, hiru aldiz egin behar duzu prisma betetzeko. Beraz, $V=\\frac{A_O\\cdot h}{3}$; eta konoan, $V=\\frac{\\pi r^{2}h}{3}$. Formulan altuera doa, ez apotema edo sortzailea: behar bada, Pitagorasekin ateratzen da.',
            'Si llenas de agua una pirámide y la vacías en un prisma de igual base y altura, necesitas tres veces para llenarlo. Por eso $V=\\frac{A_B\\cdot h}{3}$; y en el cono, $V=\\frac{\\pi r^{2}h}{3}$. En la fórmula va la altura, no la apotema ni la generatriz: si hace falta, sale con Pitágoras.',
            'إذا ملأت هرمًا بالماء وأفرغته في منشور له القاعدة والارتفاع نفسهما فعليك تكرار ذلك ثلاث مرات لملئه. لذلك $V=\\frac{A_B\\cdot h}{3}$؛ وفي المخروط $V=\\frac{\\pi r^{2}h}{3}$. في الصيغة يدخل الارتفاع لا العامد ولا الراسم: وعند الحاجة يُحسب بفيثاغورس.',
            'If you fill a pyramid with water and pour it into a prism with the same base and height, you need three goes to fill it. So $V=\\frac{A_B\\cdot h}{3}$; and for the cone, $V=\\frac{\\pi r^{2}h}{3}$. The formula uses the height, not the slant height: if needed, Pythagoras gives it.'
        ),
        examplePrompt: say(
            'Piramide baten oinarria 9 cm-ko aldeko karratua da, eta altuera 20 cm. Kalkulatu bolumena.',
            'Una pirámide tiene base cuadrada de 9 cm de lado y 20 cm de altura. Calcula su volumen.',
            'هرم قاعدته مربع طول ضلعه 9 سم وارتفاعه 20 سم. احسب حجمه.',
            'A pyramid has a square base with 9 cm sides and a height of 20 cm. Work out its volume.'
        ),
        example: same('$V=\\frac{81\\cdot 20}{3}=540$'),
        exampleAnswer: say('Bolumena 540 cm³ da: oinarri eta altuera bereko prismaren herena.', 'El volumen es 540 cm³: un tercio del prisma de igual base y altura.', 'الحجم 540 سم³: ثلث المنشور الذي له القاعدة والارتفاع نفسهما.', 'The volume is 540 cm³: a third of the prism with the same base and height.')
    },
    'sphere-volume': {
        explanation: say(
            'Arkimedesek erakutsi zuen esferak bere zilindro zirkunskribatuaren bi heren hartzen dituela: zilindroak $\\pi r^{2}\\cdot 2r=2\\pi r^{3}$ du, eta esferak $V=\\frac{4}{3}\\pi r^{3}$. Erdiesferak erdia du. Problemetan, idatzi datuak unitate berean, kalkulatu bolumen bakoitza, batu edo kendu, eta eman emaitza eskatutako unitatean.',
            'Arquímedes demostró que la esfera ocupa dos tercios de su cilindro circunscrito: el cilindro tiene $\\pi r^{2}\\cdot 2r=2\\pi r^{3}$ y la esfera, $V=\\frac{4}{3}\\pi r^{3}$. La semiesfera tiene la mitad. En los problemas, escribe los datos en la misma unidad, calcula cada volumen, suma o resta, y da el resultado en la unidad pedida.',
            'برهن أرخميدس أن الكرة تشغل ثلثي الأسطوانة المحيطة بها: للأسطوانة $\\pi r^{2}\\cdot 2r=2\\pi r^{3}$ وللكرة $V=\\frac{4}{3}\\pi r^{3}$. ولنصف الكرة النصف. في المسائل اكتب المعطيات بالوحدة نفسها، واحسب كل حجم، واجمع أو اطرح، وأعطِ النتيجة بالوحدة المطلوبة.',
            'Archimedes showed that the sphere fills two thirds of its circumscribed cylinder: the cylinder has $\\pi r^{2}\\cdot 2r=2\\pi r^{3}$ and the sphere $V=\\frac{4}{3}\\pi r^{3}$. A hemisphere has half. In problems, write the data in the same unit, work out each volume, add or subtract, and give the answer in the unit asked for.'
        ),
        examplePrompt: say(
            '10 cm-ko ertzeko kaxa kubiko batean 5 cm-ko erradioko bola bat sartzen da. Zenbat leku geratzen da libre?',
            'En una caja cúbica de 10 cm de arista se mete una bola de 5 cm de radio. ¿Cuánto espacio queda libre?',
            'وُضعت كرة نصف قطرها 5 سم في صندوق مكعب طول حرفه 10 سم. كم يبقى من الفراغ؟',
            'A ball with a 5 cm radius is put into a cubic box with 10 cm edges. How much space is left?'
        ),
        example: same('$\\begin{gathered}V=\\frac{4\\cdot 3{,}14\\cdot 125}{3}\\approx 523{,}33\\\\1000-523{,}33=476{,}67\\end{gathered}$'),
        exampleAnswer: say('476,67 cm³ inguru geratzen dira libre, ia litro erdi.', 'Quedan libres unos 476,67 cm³, casi medio litro.', 'يبقى نحو 476.67 سم³، أي قرابة نصف لتر.', 'About 476.67 cm³ is left, almost half a litre.')
    }
}

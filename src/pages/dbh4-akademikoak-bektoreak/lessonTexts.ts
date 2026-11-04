import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { VectorsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Bektoreak eta zuzenak · 4. DBH akademikoak — what each lesson tells: the
   new words (definitions), a short explanation, its cases, the example as
   an exercise («Another example»), the key words in four languages and, in
   three lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics. Points and vectors are
   written left to right in every language; Arabic writes the decimal
   point ({,} becomes .).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const vectorsLessonTexts: Record<VectorsTopicId, LessonTexts> = {
    /* ---------- 1. Vectors ---------- */
    'vector-coordinates': {
        definitions: [
            {
                term: say('$\\overrightarrow{AB}$ bektore finkoa', 'Vector fijo $\\overrightarrow{AB}$', 'المتجه المقيد $\\overrightarrow{AB}$', 'Fixed vector $\\overrightarrow{AB}$'),
                meaning: say('$A$ jatorritik $B$ muturrera doan zuzenki orientatua.', 'Un segmento orientado que va del origen $A$ al extremo $B$.', 'قطعة موجهة من البداية $A$ إلى النهاية $B$.', 'A directed segment from the starting point $A$ to the end point $B$.')
            },
            {
                term: say('Modulua', 'Módulo', 'الطول', 'Magnitude'),
                meaning: say('Bektorearen luzera: $|\\overrightarrow{AB}|$.', 'La longitud del vector: $|\\overrightarrow{AB}|$.', 'طول المتجه: $|\\overrightarrow{AB}|$.', 'The length of the vector: $|\\overrightarrow{AB}|$.')
            }
        ],
        vocabulary: [
            say('jatorria', 'origen', 'البداية', 'starting point'),
            say('muturra', 'extremo', 'النهاية', 'end point')
        ],
        explanation: say(
            'Haren koordenatuak muturraren koordenatuei jatorriarenak kenduta ateratzen dira: $A(1,2)$ puntutik $B(5,5)$ puntura, $\\overrightarrow{AB}=(4,3)$. Modulua Pitagorasekin ateratzen da: $\\sqrt{4^{2}+3^{2}}=5$. Koordenatu berak dituzten bi bektorek modulu, norabide eta noranzko bera dute: bektore bera dira, beste puntu batean hasi arren.',
            'Sus coordenadas se obtienen restando las del origen a las del extremo: de $A(1,2)$ a $B(5,5)$, $\\overrightarrow{AB}=(4,3)$. El módulo sale con Pitágoras: $\\sqrt{4^{2}+3^{2}}=5$. Dos vectores con las mismas coordenadas tienen el mismo módulo, dirección y sentido: son el mismo vector, aunque empiecen en otro punto.',
            'تُستخرج مركّبتاه بطرح إحداثيي البداية من إحداثيي النهاية: من $A(1,2)$ إلى $B(5,5)$ يكون $\\overrightarrow{AB}=(4,3)$. ويُحسب الطول بفيثاغورس: $\\sqrt{4^{2}+3^{2}}=5$. والمتجهان اللذان لهما المركّبتان نفسهما لهما الطول والاتجاه والمنحى نفسها: إنهما المتجه نفسه وإن بدآ في نقطة أخرى.',
            'Its coordinates are found by subtracting those of the starting point from those of the end point: from $A(1,2)$ to $B(5,5)$, $\\overrightarrow{AB}=(4,3)$. The magnitude comes from Pythagoras: $\\sqrt{4^{2}+3^{2}}=5$. Two vectors with the same coordinates have the same magnitude, direction and sense: they are the same vector, even if they start at another point.'
        ),
        examplePrompt: say('Aurkitu $P(3,-2)$ puntutik $Q(-3,6)$ puntura doan bektorearen koordenatuak eta modulua.', 'Halla las coordenadas y el módulo del vector de $P(3,-2)$ a $Q(-3,6)$.', 'جد مركّبتي المتجه من $P(3,-2)$ إلى $Q(-3,6)$ وطوله.', 'Find the coordinates and magnitude of the vector from $P(3,-2)$ to $Q(-3,6)$.'),
        example: same('$\\begin{gathered}\\overrightarrow{PQ}=(-3-3,\\ 6-(-2))=(-6,8)\\\\ |\\overrightarrow{PQ}|=\\sqrt{36+64}=10\\end{gathered}$'),
        exampleAnswer: say('$(-6,8)$, 10 modulukoa.', '$(-6,8)$, de módulo 10.', '$(-6,8)$، وطوله 10.', '$(-6,8)$, with magnitude 10.')
    },
    'vector-operations': {
        vocabulary: [
            say('aurkakoa', 'opuesto', 'المعاكس', 'opposite'),
            say('koordenatua', 'coordenada', 'المركّبة', 'coordinate')
        ],
        explanation: say(
            'Bektoreak koordenatuz koordenatu batzen dira: $(3,-1)+(-2,4)=(1,3)$; marrazkian, osatzen duten paralelogramoaren diagonala da. Kentzea aurkakoa batzea da, eta $(a,b)$ bektorearen aurkakoa $(-a,-b)$ da. $k$ zenbaki batez biderkatzean bi koordenatuak biderkatzen dira; $k$ negatiboa bada, bektoreak noranzkoa aldatzen du.',
            'Los vectores se suman coordenada a coordenada: $(3,-1)+(-2,4)=(1,3)$; en el dibujo, es la diagonal del paralelogramo que forman. Restar es sumar el opuesto, y el opuesto de $(a,b)$ es $(-a,-b)$. Al multiplicar por un número $k$ se multiplican las dos coordenadas; si $k$ es negativo, el vector cambia de sentido.',
            'تُجمع المتجهات مركّبة بمركّبة: $(3,-1)+(-2,4)=(1,3)$؛ وفي الرسم هو قطر متوازي الأضلاع الذي يكوّنانه. والطرح جمع المعاكس، ومعاكس $(a,b)$ هو $(-a,-b)$. وعند الضرب في عدد $k$ تُضرب المركّبتان؛ وإذا كان $k$ سالبًا ينقلب منحى المتجه.',
            'Vectors are added coordinate by coordinate: $(3,-1)+(-2,4)=(1,3)$; in the drawing, it is the diagonal of the parallelogram they form. Subtracting is adding the opposite, and the opposite of $(a,b)$ is $(-a,-b)$. Multiplying by a number $k$ multiplies both coordinates; if $k$ is negative, the vector changes its sense.'
        ),
        examplePrompt: say('$\\vec{u}=(2,5)$ eta $\\vec{v}=(4,-1)$ badira, kalkulatu $3\\vec{u}+\\vec{v}$ eta $\\vec{u}-\\vec{v}$.', 'Si $\\vec{u}=(2,5)$ y $\\vec{v}=(4,-1)$, calcula $3\\vec{u}+\\vec{v}$ y $\\vec{u}-\\vec{v}$.', 'إذا كان $\\vec{u}=(2,5)$ و$\\vec{v}=(4,-1)$ فاحسب $3\\vec{u}+\\vec{v}$ و$\\vec{u}-\\vec{v}$.', 'If $\\vec{u}=(2,5)$ and $\\vec{v}=(4,-1)$, work out $3\\vec{u}+\\vec{v}$ and $\\vec{u}-\\vec{v}$.'),
        example: same('$\\begin{gathered}3\\vec{u}+\\vec{v}=(6+4,\\ 15-1)=(10,14)\\\\ \\vec{u}-\\vec{v}=(2-4,\\ 5+1)=(-2,6)\\end{gathered}$'),
        exampleAnswer: say('$(10,14)$ eta $(-2,6)$.', '$(10,14)$ y $(-2,6)$.', '$(10,14)$ و$(-2,6)$.', '$(10,14)$ and $(-2,6)$.')
    },
    'parallel-vectors': {
        vocabulary: [
            say('norabidea', 'dirección', 'الاتجاه', 'direction'),
            say('proportzionalak', 'proporcionales', 'متناسبة', 'proportional')
        ],
        explanation: say(
            'Bi bektore paraleloak dira (norabide bera dute) bata bestea bider zenbaki bat denean, hau da, koordenatuak proportzionalak dituztenean: $(2,3)$ eta $(4,6)$ paraleloak dira, $\\frac{4}{2}=\\frac{6}{3}=2$ delako. Nahikoa da biderkadura gurutzatuak begiratzea: $(a,b)\\parallel(c,d)$ da $a\\cdot d=b\\cdot c$ bada. $(a,b)$ bektorearen perpendikular bat $(-b,a)$ da: $(2,3)$ bektorearekin, $(-3,2)$.',
            'Dos vectores son paralelos (tienen la misma dirección) cuando uno es el otro por un número, es decir, cuando sus coordenadas son proporcionales: $(2,3)$ y $(4,6)$ lo son, porque $\\frac{4}{2}=\\frac{6}{3}=2$. Basta mirar los productos cruzados: $(a,b)\\parallel(c,d)$ si $a\\cdot d=b\\cdot c$. Un perpendicular a $(a,b)$ es $(-b,a)$: con $(2,3)$, $(-3,2)$.',
            'يتوازى متجهان (لهما الاتجاه نفسه) عندما يكون أحدهما الآخر مضروبًا في عدد، أي عندما تكون مركّباتهما متناسبة: $(2,3)$ و$(4,6)$ متوازيان لأن $\\frac{4}{2}=\\frac{6}{3}=2$. ويكفي النظر إلى الضرب التبادلي: $(a,b)\\parallel(c,d)$ إذا كان $a\\cdot d=b\\cdot c$. ومتجه عمودي على $(a,b)$ هو $(-b,a)$: مع $(2,3)$ نجد $(-3,2)$.',
            'Two vectors are parallel (same direction) when one is the other times a number, that is, when their coordinates are proportional: $(2,3)$ and $(4,6)$ are, because $\\frac{4}{2}=\\frac{6}{3}=2$. Checking the cross products is enough: $(a,b)\\parallel(c,d)$ if $a\\cdot d=b\\cdot c$. A perpendicular to $(a,b)$ is $(-b,a)$: for $(2,3)$, $(-3,2)$.'
        ),
        examplePrompt: say('$(6,-4)$ eta $(-9,6)$ paraleloak dira? Idatzi $(6,-4)$ bektorearen perpendikular bat.', '¿Son paralelos $(6,-4)$ y $(-9,6)$? Escribe un vector perpendicular a $(6,-4)$.', 'هل $(6,-4)$ و$(-9,6)$ متوازيان؟ اكتب متجهًا عموديًا على $(6,-4)$.', 'Are $(6,-4)$ and $(-9,6)$ parallel? Write a vector perpendicular to $(6,-4)$.'),
        example: same('$\\begin{gathered}6\\cdot 6=36\\qquad(-4)\\cdot(-9)=36\\\\ (4,6)\\perp(6,-4)\\end{gathered}$'),
        exampleAnswer: say('Bai, paraleloak dira (aurkako noranzkoan); $(4,6)$ perpendikularra da.', 'Sí, son paralelos (con sentidos contrarios); $(4,6)$ es perpendicular.', 'نعم، متوازيان (بمنحيين متعاكسين)؛ و$(4,6)$ عمودي.', 'Yes, they are parallel (in opposite senses); $(4,6)$ is perpendicular.'),
        why: {
            text: say(
                'Marraztu $(a,b)$ katetoak $a$ eta $b$ dituen triangelu baten hipotenusa gisa. Triangelu hori 90° biratuz, katetoak trukatzen dira eta batek noranzkoa aldatzen du: biratutako bektorea $(-b,a)$ da, lehenengoaren perpendikularra.',
                'Dibuja $(a,b)$ como la hipotenusa de un triángulo de catetos $a$ y $b$. Al girar ese triángulo 90°, los catetos se intercambian y uno cambia de sentido: el vector girado es $(-b,a)$, perpendicular al primero.',
                'ارسم $(a,b)$ وترًا لمثلث ضلعاه القائمان $a$ و$b$. عند تدوير هذا المثلث 90° يتبادل الضلعان القائمان وينقلب منحى أحدهما: فالمتجه المدوَّر هو $(-b,a)$، عمودي على الأول.',
                'Draw $(a,b)$ as the hypotenuse of a triangle with legs $a$ and $b$. Turning that triangle 90° swaps the legs and one changes its sense: the turned vector is $(-b,a)$, perpendicular to the first.'
            )
        }
    },

    /* ---------- 2. Points and distances ---------- */
    distance: {
        vocabulary: [
            say('distantzia', 'distancia', 'المسافة', 'distance'),
            say('katetoa', 'cateto', 'الضلع القائم', 'leg')
        ],
        explanation: say(
            'Bi punturen arteko distantzia haiek lotzen dituen bektorearen modulua da: $d(A,B)=\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. Pitagoras da, katetoak abzisen kendura eta ordenatuen kendura dituen triangelu angeluzuzenean. Ordenak ez du axola, karratuek zeinua kentzen dutelako. Distantziekin triangeluak sailkatzen dira.',
            'La distancia entre dos puntos es el módulo del vector que los une: $d(A,B)=\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. Es Pitágoras en el triángulo rectángulo cuyos catetos son la diferencia de abscisas y la de ordenadas. El orden no importa, porque los cuadrados quitan el signo. Con distancias se clasifican triángulos.',
            'المسافة بين نقطتين هي طول المتجه الذي يصل بينهما: $d(A,B)=\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. إنها فيثاغورس في المثلث القائم الذي ضلعاه القائمان فرق الفاصلتين وفرق الترتيبين. والترتيب لا يهم لأن التربيع يزيل الإشارة. وبالمسافات تُصنَّف المثلثات.',
            'The distance between two points is the magnitude of the vector joining them: $d(A,B)=\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. It is Pythagoras in the right-angled triangle whose legs are the difference of the x-coordinates and that of the y-coordinates. The order does not matter, because squaring removes the sign. Distances classify triangles.'
        ),
        examplePrompt: say('Aurkitu $A(-2,1)$ eta $B(4,9)$ puntuen arteko distantzia.', 'Halla la distancia entre $A(-2,1)$ y $B(4,9)$.', 'جد المسافة بين $A(-2,1)$ و$B(4,9)$.', 'Find the distance between $A(-2,1)$ and $B(4,9)$.'),
        example: same('$d(A,B)=\\sqrt{6^{2}+8^{2}}=\\sqrt{100}=10$'),
        exampleAnswer: say('6 eta 8 katetoak: distantzia 10 da.', 'Catetos 6 y 8: la distancia es 10.', 'الضلعان القائمان 6 و8: المسافة 10.', 'Legs 6 and 8: the distance is 10.')
    },
    midpoint: {
        vocabulary: [
            say('erdiko puntua', 'punto medio', 'المنتصف', 'midpoint'),
            say('simetrikoa', 'simétrico', 'المتناظر', 'symmetric')
        ],
        explanation: say(
            'Zuzenki baten $M$ erdiko puntuaren koordenatuak, $AB$ zuzenkian, muturrenen batez bestekoa dira: $A(2,-3)$ eta $B(6,5)$ puntuetatik $M=\\left(\\frac{2+6}{2},\\frac{-3+5}{2}\\right)=(4,1)$ ateratzen da. Alderantziz, mutur bat eta erdiko puntua ezagutzen badira, beste muturra $B=2M-A$ da. Horrela aurkitzen da puntu baten simetrikoa beste batekiko ere.',
            'Las coordenadas del punto medio $M$ de un segmento $AB$ son la media de las de los extremos: de $A(2,-3)$ y $B(6,5)$ sale $M=\\left(\\frac{2+6}{2},\\frac{-3+5}{2}\\right)=(4,1)$. Al revés, si se conocen un extremo y el punto medio, el otro extremo es $B=2M-A$. Así se halla también el simétrico de un punto respecto de otro.',
            'إحداثيا المنتصف $M$ للقطعة $AB$ هما متوسطا إحداثيي الطرفين: من $A(2,-3)$ و$B(6,5)$ نجد $M=\\left(\\frac{2+6}{2},\\frac{-3+5}{2}\\right)=(4,1)$. وبالعكس، إذا عُلم طرف والمنتصف فالطرف الآخر $B=2M-A$. وهكذا نجد أيضًا متناظر نقطة بالنسبة إلى أخرى.',
            'The coordinates of the midpoint $M$ of a segment $AB$ are the averages of those of the end points: from $A(2,-3)$ and $B(6,5)$ you get $M=\\left(\\frac{2+6}{2},\\frac{-3+5}{2}\\right)=(4,1)$. Conversely, if you know one end point and the midpoint, the other end is $B=2M-A$. This also gives the reflection of a point in another point.'
        ),
        examplePrompt: say('Zuzenki baten mutur bat $A(3,-1)$ da, eta haren erdiko puntua, $M(5,2)$. Aurkitu beste muturra.', 'Un extremo de un segmento es $A(3,-1)$ y su punto medio, $M(5,2)$. Halla el otro extremo.', 'أحد طرفي قطعة $A(3,-1)$ ومنتصفها $M(5,2)$. جد الطرف الآخر.', 'One end of a segment is $A(3,-1)$ and its midpoint is $M(5,2)$. Find the other end.'),
        example: same('$B=(2\\cdot 5-3,\\ 2\\cdot 2-(-1))=(7,5)$'),
        exampleAnswer: say('Egiaztatu: $(3,-1)$ eta $(7,5)$ puntuen erdiko puntua $(5,2)$ da.', 'Comprueba: el punto medio de $(3,-1)$ y $(7,5)$ es $(5,2)$.', 'تحقّق: منتصف $(3,-1)$ و$(7,5)$ هو $(5,2)$.', 'Check: the midpoint of $(3,-1)$ and $(7,5)$ is $(5,2)$.'),
        why: {
            text: say(
                '$A$ puntutik $M$ puntura joateko $\\overrightarrow{AB}$ bektorearen erdia egiten da: $M=A+\\frac{1}{2}(B-A)=\\frac{A+B}{2}$. Horregatik da erdiko puntua muturren batez bestekoa, koordenatu bakoitzean.',
                'Para ir de $A$ a $M$ se recorre la mitad de $\\overrightarrow{AB}$: $M=A+\\frac{1}{2}(B-A)=\\frac{A+B}{2}$. Por eso el punto medio es la media de los extremos, en cada coordenada.',
                'للانتقال من $A$ إلى $M$ نقطع نصف $\\overrightarrow{AB}$: $M=A+\\frac{1}{2}(B-A)=\\frac{A+B}{2}$. لذلك المنتصف هو متوسط الطرفين في كل إحداثي.',
                'To go from $A$ to $M$ you travel half of $\\overrightarrow{AB}$: $M=A+\\frac{1}{2}(B-A)=\\frac{A+B}{2}$. That is why the midpoint is the average of the end points, in each coordinate.'
            )
        }
    },
    collinear: {
        vocabulary: [
            say('lerrokatuta', 'alineados', 'على استقامة واحدة', 'collinear'),
            say('proportzioa', 'proporción', 'التناسب', 'proportion')
        ],
        explanation: say(
            '$A$, $B$ eta $C$ hiru puntu lerrokatuta daude $\\overrightarrow{AB}$ eta $\\overrightarrow{AC}$ bektoreak paraleloak badira, hau da, koordenatuak proportzionalak badituzte. $A(1,2)$, $B(3,6)$ eta $C(5,10)$: $\\overrightarrow{AB}=(2,4)$, $\\overrightarrow{AC}=(4,8)$, eta $\\frac{4}{2}=\\frac{8}{4}$. Koordenatu bat ezezaguna bada, proportzioa ekuazio bihurtzen da.',
            'Tres puntos $A$, $B$ y $C$ están alineados si los vectores $\\overrightarrow{AB}$ y $\\overrightarrow{AC}$ son paralelos, es decir, si sus coordenadas son proporcionales. Con $A(1,2)$, $B(3,6)$ y $C(5,10)$: $\\overrightarrow{AB}=(2,4)$, $\\overrightarrow{AC}=(4,8)$ y $\\frac{4}{2}=\\frac{8}{4}$. Si una coordenada es desconocida, la proporción se convierte en una ecuación.',
            'تقع ثلاث نقاط $A$ و$B$ و$C$ على استقامة واحدة إذا كان المتجهان $\\overrightarrow{AB}$ و$\\overrightarrow{AC}$ متوازيين، أي إذا كانت مركّباتهما متناسبة. مع $A(1,2)$ و$B(3,6)$ و$C(5,10)$: $\\overrightarrow{AB}=(2,4)$ و$\\overrightarrow{AC}=(4,8)$ و$\\frac{4}{2}=\\frac{8}{4}$. وإذا كان إحداثي مجهولًا يصير التناسب معادلة.',
            'Three points $A$, $B$ and $C$ are collinear if the vectors $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are parallel, that is, if their coordinates are proportional. With $A(1,2)$, $B(3,6)$ and $C(5,10)$: $\\overrightarrow{AB}=(2,4)$, $\\overrightarrow{AC}=(4,8)$ and $\\frac{4}{2}=\\frac{8}{4}$. If a coordinate is unknown, the proportion becomes an equation.'
        ),
        examplePrompt: say('$P(0,1)$, $Q(2,4)$ eta $R(6,10)$ lerrokatuta daude?', '¿Están alineados $P(0,1)$, $Q(2,4)$ y $R(6,10)$?', 'هل $P(0,1)$ و$Q(2,4)$ و$R(6,10)$ على استقامة واحدة؟', 'Are $P(0,1)$, $Q(2,4)$ and $R(6,10)$ collinear?'),
        example: same('$\\begin{gathered}\\overrightarrow{PQ}=(2,3)\\qquad\\overrightarrow{PR}=(6,9)\\\\ \\frac{6}{2}=\\frac{9}{3}=3\\end{gathered}$'),
        exampleAnswer: say('Bai: $\\overrightarrow{PR}$ bektorea $\\overrightarrow{PQ}$ bektorearen hirukoitza da.', 'Sí: $\\overrightarrow{PR}$ es el triple de $\\overrightarrow{PQ}$.', 'نعم: $\\overrightarrow{PR}$ ثلاثة أضعاف $\\overrightarrow{PQ}$.', 'Yes: $\\overrightarrow{PR}$ is three times $\\overrightarrow{PQ}$.')
    },

    /* ---------- 3. Equations of a line ---------- */
    parametric: {
        definitions: [
            {
                term: say('Norabide-bektorea', 'Vector director', 'متجه التوجيه', 'Direction vector'),
                meaning: say('Zuzenaren paraleloa den bektorea, haren norabidea markatzen duena.', 'Un vector paralelo a la recta, que marca su dirección.', 'متجه موازٍ للمستقيم يحدد اتجاهه.', 'A vector parallel to the line, which marks its direction.')
            }
        ],
        vocabulary: [
            say('parametrikoak', 'paramétricas', 'الوسيطية', 'parametric'),
            say('parametroa', 'parámetro', 'الوسيط', 'parameter')
        ],
        explanation: say(
            'Zuzen bat $P$ puntu batek eta $\\vec{d}$ norabide-bektore batek zehazten dute: puntu bakoitzera $P$ puntutik iristen da, $\\vec{d}$ bektorearen multiplo bat batuz. Ekuazio bektoriala $(x,y)=(p_1,p_2)+t\\,(d_1,d_2)$ da, eta koordenatuak bereizita ekuazio parametrikoak ateratzen dira: $x=p_1+t\\,d_1$, $y=p_2+t\\,d_2$. $t$ parametroaren balio bakoitzak zuzenaren puntu bat ematen du.',
            'Una recta queda determinada por un punto $P$ y un vector director $\\vec{d}$: a cada punto se llega desde $P$ sumando un múltiplo de $\\vec{d}$. La ecuación vectorial es $(x,y)=(p_1,p_2)+t\\,(d_1,d_2)$, y separando coordenadas salen las paramétricas: $x=p_1+t\\,d_1$, $y=p_2+t\\,d_2$. Cada valor del parámetro $t$ da un punto de la recta.',
            'يتحدد المستقيم بنقطة $P$ ومتجه توجيه $\\vec{d}$: نصل إلى كل نقطة من $P$ بإضافة مضاعف لـ $\\vec{d}$. المعادلة المتجهة $(x,y)=(p_1,p_2)+t\\,(d_1,d_2)$، وبفصل الإحداثيين نحصل على المعادلتين الوسيطيتين: $x=p_1+t\\,d_1$، $y=p_2+t\\,d_2$. وكل قيمة للوسيط $t$ تعطي نقطة من المستقيم.',
            'A line is fixed by a point $P$ and a direction vector $\\vec{d}$: you reach each point from $P$ by adding a multiple of $\\vec{d}$. The vector equation is $(x,y)=(p_1,p_2)+t\\,(d_1,d_2)$, and splitting the coordinates gives the parametric equations: $x=p_1+t\\,d_1$, $y=p_2+t\\,d_2$. Each value of the parameter $t$ gives a point of the line.'
        ),
        examplePrompt: say('Idatzi $P(3,0)$ puntutik $(2,5)$ norabidearekin pasatzen den zuzenaren parametrikoak, eta aurkitu $t=2$ balioaren puntua.', 'Escribe las paramétricas de la recta que pasa por $P(3,0)$ con dirección $(2,5)$ y halla el punto para $t=2$.', 'اكتب المعادلتين الوسيطيتين للمستقيم المار بـ $P(3,0)$ باتجاه $(2,5)$، وجد النقطة عندما $t=2$.', 'Write the parametric equations of the line through $P(3,0)$ with direction $(2,5)$ and find the point for $t=2$.'),
        example: same('$\\begin{gathered}x=3+2t,\\quad y=5t\\\\ t=2\\ \\to\\ (7,10)\\end{gathered}$'),
        exampleAnswer: say('$t=2$ balioak $(3+4,\\ 10)=(7,10)$ ematen du.', '$t=2$ da $(3+4,\\ 10)=(7,10)$.', '$t=2$ تعطي $(3+4,\\ 10)=(7,10)$.', '$t=2$ gives $(3+4,\\ 10)=(7,10)$.')
    },
    continuous: {
        vocabulary: [
            say('malda', 'pendiente', 'الميل', 'slope'),
            say('jarraitua', 'continua', 'المتصلة', 'continuous')
        ],
        explanation: say(
            'Parametrikoetan $t$ askatu eta berdinduz, ekuazio jarraitua ateratzen da: $\\frac{x-p_1}{d_1}=\\frac{y-p_2}{d_2}$. Gurutzean biderkatu eta $y$ askatuz, puntu-malda ekuazioa agertzen da: $y-p_2=m\\,(x-p_1)$, $m=\\frac{d_2}{d_1}$ izanik. Guztiek zuzen bera deskribatzen dute: puntu bat eta norabide bat.',
            'Despejando $t$ en las paramétricas e igualando sale la ecuación continua: $\\frac{x-p_1}{d_1}=\\frac{y-p_2}{d_2}$. Multiplicando en cruz y despejando $y$ aparece la ecuación punto-pendiente: $y-p_2=m\\,(x-p_1)$, con $m=\\frac{d_2}{d_1}$. Todas describen la misma recta: un punto y una dirección.',
            'بعزل $t$ في المعادلتين الوسيطيتين والمساواة نحصل على المعادلة المتصلة: $\\frac{x-p_1}{d_1}=\\frac{y-p_2}{d_2}$. وبالضرب التبادلي وعزل $y$ تظهر معادلة النقطة والميل: $y-p_2=m\\,(x-p_1)$ مع $m=\\frac{d_2}{d_1}$. وكلها تصف المستقيم نفسه: نقطة واتجاه.',
            'Solving the parametric equations for $t$ and setting them equal gives the continuous equation: $\\frac{x-p_1}{d_1}=\\frac{y-p_2}{d_2}$. Cross-multiplying and solving for $y$ gives the point-slope equation: $y-p_2=m\\,(x-p_1)$, with $m=\\frac{d_2}{d_1}$. They all describe the same line: a point and a direction.'
        ),
        examplePrompt: say('Idatzi $(1,-3)$ puntutik $(2,6)$ norabide-bektorearekin pasatzen den zuzenaren ekuazio jarraitua eta puntu-malda ekuazioa.', 'Escribe la ecuación continua y la punto-pendiente de la recta que pasa por $(1,-3)$ con vector director $(2,6)$.', 'اكتب المعادلة المتصلة ومعادلة النقطة والميل للمستقيم المار بـ $(1,-3)$ بمتجه توجيه $(2,6)$.', 'Write the continuous and point-slope equations of the line through $(1,-3)$ with direction vector $(2,6)$.'),
        example: same('$\\begin{gathered}\\frac{x-1}{2}=\\frac{y+3}{6}\\\\ y+3=3\\,(x-1)\\end{gathered}$'),
        exampleAnswer: say('Malda $m=\\frac{6}{2}=3$ da.', 'La pendiente es $m=\\frac{6}{2}=3$.', 'الميل $m=\\frac{6}{2}=3$.', 'The slope is $m=\\frac{6}{2}=3$.')
    },
    'general-explicit': {
        vocabulary: [
            say('jatorriko ordenatua', 'ordenada en el origen', 'الجزء المقطوع من محور الترتيب', 'y-intercept'),
            say('esplizitua', 'explícita', 'الصريحة', 'explicit')
        ],
        explanation: say(
            'Aurrekoetako edozein eraginez, ekuazio orokorra lortzen da, $Ax+By+C=0$; norabide-bektore bat $(-B,A)$ da. $B\\neq 0$ bada, $y$ askatuz esplizitua ateratzen da, $y=mx+n$: $m=-\\frac{A}{B}$ malda da, eta $n$, jatorriko ordenatua. Ardatzekiko ebakidurak $x=0$ eta $y=0$ eginda ateratzen dira.',
            'Operando cualquiera de las anteriores se llega a la ecuación general, $Ax+By+C=0$; un vector director es $(-B,A)$. Si $B\\neq 0$, despejando $y$ sale la explícita, $y=mx+n$: $m=-\\frac{A}{B}$ es la pendiente, y $n$, la ordenada en el origen. Los cortes con los ejes salen con $x=0$ y con $y=0$.',
            'بإجراء العمليات على أيٍّ من السابقة نصل إلى المعادلة العامة $Ax+By+C=0$؛ ومتجه توجيه لها $(-B,A)$. وإذا كان $B\\neq 0$ فبعزل $y$ نحصل على الصريحة $y=mx+n$: $m=-\\frac{A}{B}$ هو الميل، و$n$ الجزء المقطوع من محور الترتيب. ونقاط التقاطع مع المحورين تُستخرج بـ $x=0$ و$y=0$.',
            'Working on any of the previous ones gives the general equation, $Ax+By+C=0$; a direction vector is $(-B,A)$. If $B\\neq 0$, solving for $y$ gives the explicit one, $y=mx+n$: $m=-\\frac{A}{B}$ is the slope, and $n$ the y-intercept. The crossings with the axes come from $x=0$ and $y=0$.'
        ),
        examplePrompt: say('Idatzi $4x+2y-10=0$ zuzenaren ekuazio esplizitua eta aurkitu ardatzekiko ebakidurak.', 'Escribe la explícita de $4x+2y-10=0$ y halla sus cortes con los ejes.', 'اكتب الصريحة لـ $4x+2y-10=0$ وجد نقاط تقاطعه مع المحورين.', 'Write the explicit form of $4x+2y-10=0$ and find where it crosses the axes.'),
        example: same('$\\begin{gathered}2y=-4x+10\\ \\to\\ y=-2x+5\\\\ (0,5)\\qquad(2{,}5,\\ 0)\\end{gathered}$'),
        exampleAnswer: say('Malda $-2$; Y ardatza 5 puntuan mozten du, eta X ardatza 2,5 puntuan.', 'Pendiente $-2$; corta al eje Y en 5 y al eje X en 2,5.', 'الميل $-2$؛ يقطع محور Y عند 5 ومحور X عند 2.5.', 'Slope $-2$; it crosses the Y axis at 5 and the X axis at 2.5.')
    },

    /* ---------- 4. Slope and relative positions ---------- */
    slope: {
        vocabulary: [
            say('gorakorra', 'creciente', 'متزايد', 'increasing'),
            say('beherakorra', 'decreciente', 'متناقص', 'decreasing')
        ],
        explanation: say(
            '$m$ maldak neurtzen du zuzena zenbat igotzen den eskuinerantz unitate bat aurreratzen den bakoitzean. Bi punturekin, $m=\\frac{y_2-y_1}{x_2-x_1}$; norabide-bektore batekin, $m=\\frac{d_2}{d_1}$; esplizituan, $x$ letraren koefizientea da. Zuzen bertikalek ez dute maldarik. Gainera, $m$ zuzenak X ardatzarekin osatzen duen angeluaren tangentea da.',
            'La pendiente $m$ mide cuánto sube la recta por cada unidad que avanza hacia la derecha. Con dos puntos, $m=\\frac{y_2-y_1}{x_2-x_1}$; con un vector director, $m=\\frac{d_2}{d_1}$; en la explícita, es el coeficiente de $x$. Las rectas verticales no tienen pendiente. Además, $m$ es la tangente del ángulo que forma la recta con el eje X.',
            'الميل $m$ يقيس كم يصعد المستقيم مقابل كل وحدة يتقدمها نحو اليمين. بنقطتين $m=\\frac{y_2-y_1}{x_2-x_1}$، وبمتجه توجيه $m=\\frac{d_2}{d_1}$، وفي الصريحة هو معامل $x$. والمستقيمات العمودية لا ميل لها. كذلك $m$ هو ظل الزاوية التي يصنعها المستقيم مع المحور X.',
            'The slope $m$ measures how much the line rises for each unit it moves to the right. With two points, $m=\\frac{y_2-y_1}{x_2-x_1}$; with a direction vector, $m=\\frac{d_2}{d_1}$; in the explicit form, it is the coefficient of $x$. Vertical lines have no slope. Also, $m$ is the tangent of the angle the line makes with the X axis.'
        ),
        cases: [
            { title: say('Gorakorra', 'Creciente', 'متزايد', 'Increasing'), text: say('Malda positiboa.', 'Pendiente positiva.', 'ميل موجب.', 'Positive slope.'), math: same('$m>0$') },
            { title: say('Beherakorra', 'Decreciente', 'متناقص', 'Decreasing'), text: say('Malda negatiboa.', 'Pendiente negativa.', 'ميل سالب.', 'Negative slope.'), math: same('$m<0$') },
            { title: say('Horizontala', 'Horizontal', 'أفقي', 'Horizontal'), text: say('Malda zero.', 'Pendiente cero.', 'ميل صفر.', 'Zero slope.'), math: same('$m=0$') }
        ],
        examplePrompt: say('Aurkitu $(2,7)$ eta $(5,1)$ puntuetatik pasatzen den zuzenaren malda.', 'Halla la pendiente de la recta que pasa por $(2,7)$ y $(5,1)$.', 'جد ميل المستقيم المار بـ $(2,7)$ و$(5,1)$.', 'Find the slope of the line through $(2,7)$ and $(5,1)$.'),
        example: same('$m=\\frac{1-7}{5-2}=\\frac{-6}{3}=-2$'),
        exampleAnswer: say('Malda $-2$: zuzena beherakorra da.', 'Pendiente $-2$: la recta es decreciente.', 'الميل $-2$: المستقيم متناقص.', 'Slope $-2$: the line is decreasing.'),
        why: {
            text: say(
                '1 aurreratu eta $m$ igotzen bada, katetoak 1 eta $m$ dituen triangelu angeluzuzen bat osatzen da. X ardatzarekiko $\\alpha$ angeluak $\\tan\\alpha=\\frac{m}{1}=m$ betetzen du: aurkakoa zati ondokoa.',
                'Si se avanza 1 y se sube $m$, se forma un triángulo rectángulo de catetos 1 y $m$. El ángulo $\\alpha$ con el eje X cumple $\\tan\\alpha=\\frac{m}{1}=m$: opuesto entre contiguo.',
                'إذا تقدمنا 1 وصعدنا $m$ يتكوّن مثلث قائم ضلعاه القائمان 1 و$m$. والزاوية $\\alpha$ مع المحور X تحقق $\\tan\\alpha=\\frac{m}{1}=m$: المقابل على المجاور.',
                'If you move 1 across and rise $m$, you get a right-angled triangle with legs 1 and $m$. The angle $\\alpha$ with the X axis satisfies $\\tan\\alpha=\\frac{m}{1}=m$: opposite over adjacent.'
            )
        }
    },
    'parallel-perpendicular': {
        vocabulary: [
            say('paraleloak', 'paralelas', 'متوازيان', 'parallel'),
            say('perpendikularrak', 'perpendiculares', 'متعامدان', 'perpendicular')
        ],
        explanation: say(
            'Bi zuzen ez-bertikal paraleloak dira malda bera badute, eta perpendikularrak, malden biderkadura $-1$ bada: $m\\cdot m\'=-1$, hau da, $m\'=-\\frac{1}{m}$. Era orokorrean, $Ax+By+C=0$ zuzenaren paraleloek $A$ eta $B$ berak dituzte.',
            'Dos rectas no verticales son paralelas si tienen la misma pendiente, y perpendiculares si el producto de sus pendientes es $-1$: $m\\cdot m\'=-1$, es decir, $m\'=-\\frac{1}{m}$. En forma general, las paralelas a $Ax+By+C=0$ tienen los mismos $A$ y $B$.',
            'يتوازى مستقيمان غير عموديين إذا كان لهما الميل نفسه، ويتعامدان إذا كان جداء ميليهما $-1$: $m\\cdot m\'=-1$، أي $m\'=-\\frac{1}{m}$. وفي الصورة العامة للمستقيمات الموازية لـ $Ax+By+C=0$ المعاملان $A$ و$B$ نفسهما.',
            'Two non-vertical lines are parallel if they have the same slope, and perpendicular if the product of their slopes is $-1$: $m\\cdot m\'=-1$, that is, $m\'=-\\frac{1}{m}$. In general form, the lines parallel to $Ax+By+C=0$ have the same $A$ and $B$.'
        ),
        examplePrompt: say('Aurkitu $y=\\frac{1}{2}x+3$ zuzenaren perpendikularra, $(4,-1)$ puntutik pasatzen dena.', 'Halla la perpendicular a $y=\\frac{1}{2}x+3$ que pasa por $(4,-1)$.', 'جد المستقيم العمودي على $y=\\frac{1}{2}x+3$ والمار بـ $(4,-1)$.', 'Find the perpendicular to $y=\\frac{1}{2}x+3$ through $(4,-1)$.'),
        example: same('$\\begin{gathered}m\'=-2\\\\ y+1=-2\\,(x-4)\\ \\to\\ y=-2x+7\\end{gathered}$'),
        exampleAnswer: say('$\\frac{1}{2}\\cdot(-2)=-1$: perpendikularrak dira.', '$\\frac{1}{2}\\cdot(-2)=-1$: son perpendiculares.', '$\\frac{1}{2}\\cdot(-2)=-1$: متعامدان.', '$\\frac{1}{2}\\cdot(-2)=-1$: they are perpendicular.')
    },
    'relative-position': {
        vocabulary: [
            say('ebakitzaileak', 'secantes', 'متقاطعان', 'intersecting'),
            say('bat datozenak', 'coincidentes', 'منطبقان', 'coincident')
        ],
        explanation: say(
            'Planoko bi zuzen ebakitzaileak (puntu batean mozten dira), paraleloak (ez dute puntu komunik) edo bat datozenak (zuzen bera dira) izan daitezke. Maldekin ikusten da, edo ekuazio orokorren koefizienteen zatidurak konparatuz, sistemetan bezala. Bi ebakitzaileren ebaki-puntua haien sistemaren ebazpena da.',
            'Dos rectas del plano pueden ser secantes (se cortan en un punto), paralelas (no tienen puntos comunes) o coincidentes (son la misma recta). Se ve con las pendientes, o comparando los cocientes de los coeficientes de las ecuaciones generales, como en los sistemas. El punto de corte de dos secantes es la solución de su sistema.',
            'يمكن أن يكون مستقيمان في المستوى متقاطعين (يتقاطعان في نقطة)، أو متوازيين (لا نقاط مشتركة)، أو منطبقين (المستقيم نفسه). ويُعرف ذلك بالميلين، أو بمقارنة نسب معاملات المعادلتين العامتين كما في الأنظمة. ونقطة تقاطع المتقاطعين هي حل نظامهما.',
            'Two lines in the plane can be intersecting (they cross at one point), parallel (no common points) or coincident (the same line). You can tell by the slopes, or by comparing the ratios of the coefficients of the general equations, as with systems. The crossing point of two intersecting lines is the solution of their system.'
        ),
        cases: [
            { title: say('Ebakitzaileak', 'Secantes', 'متقاطعان', 'Intersecting'), text: say('Malda desberdinak.', 'Pendientes distintas.', 'ميلان مختلفان.', 'Different slopes.'), math: same('$\\frac{A}{A\'}\\neq\\frac{B}{B\'}$') },
            { title: say('Paraleloak', 'Paralelas', 'متوازيان', 'Parallel'), text: say('Malda bera, ordenatu desberdina.', 'Misma pendiente, distinta ordenada.', 'الميل نفسه وجزء مقطوع مختلف.', 'Same slope, different intercept.'), math: same('$\\frac{A}{A\'}=\\frac{B}{B\'}\\neq\\frac{C}{C\'}$') },
            { title: say('Bat datozenak', 'Coincidentes', 'منطبقان', 'Coincident'), text: say('Dena berdina.', 'Todo igual.', 'كل شيء متساوٍ.', 'Everything equal.'), math: same('$\\frac{A}{A\'}=\\frac{B}{B\'}=\\frac{C}{C\'}$') }
        ],
        examplePrompt: say('Nolakoak dira $y=2x+1$ eta $y=-x+4$? Aurkitu haien ebaki-puntua.', '¿Cómo son $y=2x+1$ e $y=-x+4$? Halla su punto de corte.', 'ما وضع $y=2x+1$ و$y=-x+4$؟ جد نقطة تقاطعهما.', 'How are $y=2x+1$ and $y=-x+4$ placed? Find where they cross.'),
        example: same('$2x+1=-x+4\\ \\to\\ x=1,\\ y=3$'),
        exampleAnswer: say('2 eta $-1$ maldak: ebakitzaileak, $(1,3)$ puntuan.', 'Pendientes 2 y $-1$: secantes, en $(1,3)$.', 'الميلان 2 و$-1$: متقاطعان في $(1,3)$.', 'Slopes 2 and $-1$: intersecting, at $(1,3)$.')
    },

    /* ---------- 5. Applications ---------- */
    bisector: {
        definitions: [
            {
                term: say('Erdibitzailea', 'Mediatriz', 'محور القطعة', 'Perpendicular bisector'),
                meaning: say('Zuzenki bati bere erdiko puntuan perpendikularra den zuzena.', 'La recta perpendicular a un segmento por su punto medio.', 'المستقيم العمودي على قطعة في منتصفها.', 'The line perpendicular to a segment through its midpoint.')
            }
        ],
        vocabulary: [
            say('erdiko puntua', 'punto medio', 'المنتصف', 'midpoint'),
            say('perpendikularra', 'perpendicular', 'عمودي', 'perpendicular')
        ],
        explanation: say(
            'Haren puntu guztiak bi muturretatik, $A$ eta $B$, distantzia berera daude. Aurkitzeko: $M$ erdiko puntua eta, norabide gisa, $\\overrightarrow{AB}$ bektorearen perpendikular bat, edo $m\'=-\\frac{1}{m}$ malda. Distantziak berdinduz ere ateratzen da: $d(X,A)=d(X,B)$.',
            'Todos sus puntos están a la misma distancia de los dos extremos, $A$ y $B$. Para hallarla: el punto medio $M$ y, como dirección, un vector perpendicular a $\\overrightarrow{AB}$, o la pendiente $m\'=-\\frac{1}{m}$. También sale igualando distancias: $d(X,A)=d(X,B)$.',
            'كل نقاطه على المسافة نفسها من الطرفين $A$ و$B$. ولإيجاده: المنتصف $M$، ومتجه عمودي على $\\overrightarrow{AB}$ اتجاهًا، أو الميل $m\'=-\\frac{1}{m}$. ويُستخرج أيضًا بمساواة المسافتين: $d(X,A)=d(X,B)$.',
            'All its points are the same distance from both end points, $A$ and $B$. To find it: the midpoint $M$ and, as direction, a vector perpendicular to $\\overrightarrow{AB}$, or the slope $m\'=-\\frac{1}{m}$. It also comes from setting distances equal: $d(X,A)=d(X,B)$.'
        ),
        examplePrompt: say('Aurkitu $A(-2,3)$ eta $B(4,1)$ muturreko zuzenkiaren erdibitzailea.', 'Halla la mediatriz del segmento de extremos $A(-2,3)$ y $B(4,1)$.', 'جد محور القطعة التي طرفاها $A(-2,3)$ و$B(4,1)$.', 'Find the perpendicular bisector of the segment with end points $A(-2,3)$ and $B(4,1)$.'),
        example: same('$\\begin{gathered}M=(1,2)\\qquad m=\\frac{1-3}{4+2}=-\\frac{1}{3}\\\\ y-2=3\\,(x-1)\\ \\to\\ y=3x-1\\end{gathered}$'),
        exampleAnswer: say('$M(1,2)$ puntutik pasatzen da, 3 maldarekin.', 'Pasa por $M(1,2)$ con pendiente 3.', 'يمر بـ $M(1,2)$ بميل 3.', 'It goes through $M(1,2)$ with slope 3.')
    },
    circle: {
        vocabulary: [
            say('zentroa', 'centro', 'المركز', 'centre'),
            say('erradioa', 'radio', 'نصف القطر', 'radius')
        ],
        explanation: say(
            '$C(a,b)$ zentroko eta $r$ erradioko zirkunferentzia $C$ puntutik $r$ distantziara dauden puntuek osatzen dute. Karratura jasota: $(x-a)^{2}+(y-b)^{2}=r^{2}$. Zentroa jatorria bada, $x^{2}+y^{2}=r^{2}$. Puntu bat barruan, kanpoan edo zirkunferentzian dagoen jakiteko, alderatu zentrorako distantzia eta $r$.',
            'La circunferencia de centro $C(a,b)$ y radio $r$ está formada por los puntos que están a distancia $r$ de $C$. Elevando al cuadrado: $(x-a)^{2}+(y-b)^{2}=r^{2}$. Si el centro es el origen, $x^{2}+y^{2}=r^{2}$. Para saber si un punto está dentro, fuera o sobre la circunferencia, compara su distancia al centro con $r$.',
            'الدائرة التي مركزها $C(a,b)$ ونصف قطرها $r$ تتكوّن من النقاط التي تبعد $r$ عن $C$. وبالتربيع: $(x-a)^{2}+(y-b)^{2}=r^{2}$. وإذا كان المركز هو الأصل: $x^{2}+y^{2}=r^{2}$. ولمعرفة هل نقطة داخل الدائرة أو خارجها أو عليها قارن بعدها عن المركز بـ $r$.',
            'The circle with centre $C(a,b)$ and radius $r$ is made of the points at distance $r$ from $C$. Squaring: $(x-a)^{2}+(y-b)^{2}=r^{2}$. If the centre is the origin, $x^{2}+y^{2}=r^{2}$. To see whether a point is inside, outside or on the circle, compare its distance to the centre with $r$.'
        ),
        examplePrompt: say('Idatzi $(-1,4)$ zentroko eta 3 erradioko zirkunferentzia, eta begiratu $(2,4)$ puntua hartan dagoen.', 'Escribe la circunferencia de centro $(-1,4)$ y radio 3, y mira si $(2,4)$ está en ella.', 'اكتب معادلة الدائرة التي مركزها $(-1,4)$ ونصف قطرها 3، وانظر هل $(2,4)$ عليها.', 'Write the circle with centre $(-1,4)$ and radius 3, and see whether $(2,4)$ is on it.'),
        example: same('$\\begin{gathered}(x+1)^{2}+(y-4)^{2}=9\\\\ (2+1)^{2}+0^{2}=9\\end{gathered}$'),
        exampleAnswer: say('$(2,4)$ zirkunferentzian dago: zentrorako distantzia 3 da.', '$(2,4)$ está sobre la circunferencia: su distancia al centro es 3.', '$(2,4)$ على الدائرة: بعدها عن المركز 3.', '$(2,4)$ is on the circle: its distance to the centre is 3.')
    },
    polygons: {
        vocabulary: [
            say('paralelogramoa', 'paralelogramo', 'متوازي الأضلاع', 'parallelogram'),
            say('diagonalak', 'diagonales', 'القطران', 'diagonals')
        ],
        explanation: say(
            'Koordenatuekin irudiak aztertzen dira: aldeak distantziekin neurtzen dira, paralelotasuna eta perpendikulartasuna bektoreekin edo maldekin egiaztatzen dira, eta puntu nabarmenak erdiko puntuetatik eta zuzenen ebakiduretatik ateratzen dira. $ABCD$ paralelogramoan, $\\overrightarrow{AB}=\\overrightarrow{DC}$; beraz, laugarren erpina $D=A+C-B$ da, eta diagonalak elkar erdibitzen dira.',
            'Con coordenadas se estudian figuras: los lados se miden con distancias, el paralelismo y la perpendicularidad se comprueban con vectores o pendientes, y los puntos notables salen de puntos medios y cortes de rectas. En un paralelogramo $ABCD$, $\\overrightarrow{AB}=\\overrightarrow{DC}$; por eso el cuarto vértice es $D=A+C-B$, y las diagonales se cortan en su punto medio.',
            'بالإحداثيات تُدرس الأشكال: تُقاس الأضلاع بالمسافات، ويُتحقق من التوازي والتعامد بالمتجهات أو الميول، وتُستخرج النقاط المميزة من المنتصفات وتقاطع المستقيمات. في متوازي الأضلاع $ABCD$ يكون $\\overrightarrow{AB}=\\overrightarrow{DC}$؛ لذلك الرأس الرابع $D=A+C-B$، والقطران يتقاطعان في منتصفيهما.',
            'Coordinates let you study figures: sides are measured with distances, parallel and perpendicular sides are checked with vectors or slopes, and special points come from midpoints and crossing lines. In a parallelogram $ABCD$, $\\overrightarrow{AB}=\\overrightarrow{DC}$; so the fourth vertex is $D=A+C-B$, and the diagonals cross at their midpoint.'
        ),
        examplePrompt: say('Angeluzuzena al da $B$ erpinean $A(0,0)$, $B(3,1)$, $C(2,4)$ triangelua?', '¿Es rectángulo en $B$ el triángulo $A(0,0)$, $B(3,1)$, $C(2,4)$?', 'هل الزاوية عند $B$ قائمة في المثلث $A(0,0)$، $B(3,1)$، $C(2,4)$؟', 'Is there a right angle at $B$ in the triangle $A(0,0)$, $B(3,1)$, $C(2,4)$?'),
        example: same('$\\begin{gathered}m_{BA}=\\frac{1}{3}\\qquad m_{BC}=\\frac{4-1}{2-3}=-3\\\\ \\frac{1}{3}\\cdot(-3)=-1\\end{gathered}$'),
        exampleAnswer: say('Bai: malden biderkadura $-1$ da, $BA$ eta $BC$ perpendikularrak dira.', 'Sí: el producto de las pendientes es $-1$, así que $BA$ y $BC$ son perpendiculares.', 'نعم: جداء الميلين $-1$، إذن $BA$ و$BC$ متعامدان.', 'Yes: the product of the slopes is $-1$, so $BA$ and $BC$ are perpendicular.')
    }
}

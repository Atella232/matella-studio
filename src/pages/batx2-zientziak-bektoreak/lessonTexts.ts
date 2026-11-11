import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { SpaceVectorsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Espazioko bektoreak · Batxilergoa 2 · Zientziak — what each lesson
   tells: the new words (definitions), a short explanation, the example
   as an exercise («Another example»), the key words in four languages
   and, in four lessons, «Why does it work?». Plain data so the tests can
   import it; lessons.tsx merges it into the topics. The example uses
   numbers of its own, never those of «Let's solve», of «Check it» or of
   the typical mistake. Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const spaceVectorsLessonTexts: Record<SpaceVectorsTopicId, LessonTexts> = {
    /* ---------- 1. Points and vectors in space ---------- */
    'space-points': {
        definitions: [
            { term: say('Erreferentzia-sistema', 'Sistema de referencia', 'المعلم', 'Frame of reference'), meaning: say('$O$ jatorri bat eta hiru ardatz perpendikular, $x$, $y$ eta ${z}$, hiruretan unitate bera dutela.', 'Un origen $O$ y tres ejes perpendiculares $x$, $y$ y ${z}$, con la misma unidad en los tres.', 'أصل $O$ وثلاثة محاور متعامدة $x$ و$y$ و${z}$ لها الوحدة نفسها.', 'An origin $O$ and three perpendicular axes $x$, $y$ and ${z}$, with the same unit on all three.') },
            { term: say('Plano koordenatuak', 'Planos coordenados', 'المستويات الإحداثية', 'Coordinate planes'), meaning: say('$XY$ (${z}=0$), $XZ$ ($y=0$) eta $YZ$ ($x=0$) planoak; espazioa zortzi oktantetan zatitzen dute.', 'Los planos $XY$ (${z}=0$), $XZ$ ($y=0$) e $YZ$ ($x=0$); dividen el espacio en ocho octantes.', 'المستويات $XY$ ‏(${z}=0$) و$XZ$ ‏($y=0$) و$YZ$ ‏($x=0$)؛ وهي تقسم الفضاء إلى ثمانية أثمان.', 'The planes $XY$ (${z}=0$), $XZ$ ($y=0$) and $YZ$ ($x=0$); they split space into eight octants.') }
        ],
        vocabulary: [
            say('ardatza', 'eje', 'المحور', 'axis'),
            say('proiekzioa', 'proyección', 'المسقط', 'projection'),
            say('oktantea', 'octante', 'الثمن', 'octant')
        ],
        explanation: say(
            'Hiru ardatz perpendikularrekin, puntu bakoitzak hiru koordenatu ditu: $P(x,y,z)$ puntura iristeko, $x$ unitate egiten dira $x$ ardatzaren norabidean, $y$ unitate $y$ ardatzarenean, eta ${z}$ unitate gora. Zeinuek esaten dute zein oktantetan dagoen. Plano koordenatu batean proiektatzeko, planoan ez dagoen koordenatua 0 bihurtzen da.',
            'Con tres ejes perpendiculares, cada punto tiene tres coordenadas: a $P(x,y,z)$ se llega andando $x$ en la dirección del eje $x$, $y$ en la del eje $y$ y subiendo ${z}$. Los signos dicen en qué octante está. Para proyectarlo sobre un plano coordenado, se pone a 0 la coordenada que no está en él.',
            'مع ثلاثة محاور متعامدة يكون لكل نقطة ثلاثة إحداثيات: نصل إلى $P(x,y,z)$ بالسير $x$ في اتجاه المحور $x$، و$y$ في اتجاه المحور $y$، ثم الصعود ${z}$. وتدل الإشارات على الثمن الذي تقع فيه. ولإسقاطها على مستوى إحداثي نجعل الإحداثي الذي لا ينتمي إليه صفرًا.',
            'With three perpendicular axes, every point has three coordinates: you reach $P(x,y,z)$ by walking $x$ along the $x$ axis, $y$ along the $y$ axis and going up ${z}$. The signs tell you which octant it is in. To project it onto a coordinate plane, set to 0 the coordinate that is not in that plane.'
        ),
        examplePrompt: say('Zein da $Q(-5,1,-2)$ puntuaren proiekzioa $XZ$ planoan, eta zer distantziatara dago $Q$ plano horretatik?', '¿Cuál es la proyección de $Q(-5,1,-2)$ sobre el plano $XZ$, y a qué distancia está $Q$ de ese plano?', 'ما مسقط $Q(-5,1,-2)$ على المستوى $XZ$، وعلى أي بعد تقع $Q$ من هذا المستوى؟', 'What is the projection of $Q(-5,1,-2)$ onto the plane $XZ$, and how far is $Q$ from that plane?'),
        example: same('$Q_{XZ}=(-5,0,-2)\\qquad d(Q,XZ)=|1|=1$'),
        exampleAnswer: say('Proiekzioa $(-5,0,-2)$ da, eta distantzia, 1.', 'La proyección es $(-5,0,-2)$ y la distancia, 1.', 'المسقط $(-5,0,-2)$ والبعد 1.', 'The projection is $(-5,0,-2)$ and the distance is 1.')
    },
    'space-vectors': {
        definitions: [
            { term: say('Modulua', 'Módulo', 'الطول', 'Magnitude'), meaning: say('Bektorearen luzera: $|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$.', 'La longitud del vector: $|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$.', 'طول المتجه: $|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$.', 'The length of the vector: $|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$.') },
            { term: say('Bektore unitarioa', 'Vector unitario', 'متجه الوحدة', 'Unit vector'), meaning: say('Modulua 1 duen bektorea; $\\frac{\\vec{u}}{|\\vec{u}|}$ bektoreak $\\vec{u}$ bektorearen norabidea eta noranzkoa ditu.', 'Un vector de módulo 1; $\\frac{\\vec{u}}{|\\vec{u}|}$ es el unitario con la dirección y el sentido de $\\vec{u}$.', 'متجه طوله 1؛ و$\\frac{\\vec{u}}{|\\vec{u}|}$ هو متجه الوحدة الذي له اتجاه $\\vec{u}$ ومنحاه.', 'A vector of magnitude 1; $\\frac{\\vec{u}}{|\\vec{u}|}$ is the unit vector with the direction and sense of $\\vec{u}$.') }
        ],
        vocabulary: [
            say('jatorria', 'origen', 'الأصل', 'start point'),
            say('muturra', 'extremo', 'الطرف', 'end point'),
            say('diagonala', 'diagonal', 'القطر', 'diagonal')
        ],
        explanation: say(
            'Planoan bezala, $\\overrightarrow{AB}$ bektorearen koordenatuak muturra ken jatorria dira, orain hiru zenbakirekin. Modulua Pitagorasekin kalkulatzen da bi aldiz: lehenik kutxaren zoruko diagonala, eta gero kutxaren diagonala. Bektore bat bere moduluaz zatitzean, bektore unitario bat lortzen da.',
            'Como en el plano, las coordenadas de $\\overrightarrow{AB}$ son extremo menos origen, ahora con tres números. El módulo se calcula con Pitágoras dos veces: primero la diagonal del suelo de la caja y después la diagonal de la caja. Dividir un vector entre su módulo da un vector unitario.',
            'كما في المستوى، مركّبات $\\overrightarrow{AB}$ هي الطرف ناقص الأصل، لكن بثلاثة أعداد الآن. ويُحسب الطول بفيثاغورس مرتين: أولًا قطر أرضية الصندوق ثم قطر الصندوق. وقسمة متجه على طوله تعطي متجه وحدة.',
            'As in the plane, the coordinates of $\\overrightarrow{AB}$ are end point minus start point, now with three numbers. The magnitude comes from Pythagoras twice: first the diagonal of the floor of the box, then the diagonal of the box. Dividing a vector by its magnitude gives a unit vector.'
        ),
        examplePrompt: say('Zenbat neurtzen du $C(-1,4,2)$ puntutik $D(1,0,-2)$ puntura doan bektoreak? Zein da haren bektore unitarioa?', '¿Cuánto mide el vector de $C(-1,4,2)$ a $D(1,0,-2)$? ¿Cuál es su vector unitario?', 'كم طول المتجه من $C(-1,4,2)$ إلى $D(1,0,-2)$؟ وما متجه وحدته؟', 'How long is the vector from $C(-1,4,2)$ to $D(1,0,-2)$? What is its unit vector?'),
        example: same('$\\begin{gathered}\\overrightarrow{CD}=(2,-4,-4)\\\\ |\\overrightarrow{CD}|=\\sqrt{4+16+16}=6\\end{gathered}$'),
        exampleAnswer: say('6 neurtzen du, eta haren unitarioa $\\left(\\frac{1}{3},-\\frac{2}{3},-\\frac{2}{3}\\right)$ da.', 'Mide 6, y su unitario es $\\left(\\frac{1}{3},-\\frac{2}{3},-\\frac{2}{3}\\right)$.', 'طوله 6، ومتجه وحدته $\\left(\\frac{1}{3},-\\frac{2}{3},-\\frac{2}{3}\\right)$.', 'It is 6 long, and its unit vector is $\\left(\\frac{1}{3},-\\frac{2}{3},-\\frac{2}{3}\\right)$.'),
        why: {
            text: say(
                '$u_1$, $u_2$ eta $u_3$ aldeak dituen kutxan, zoruko diagonalak $\\sqrt{u_1^2+u_2^2}$ neurtzen du. Diagonal hori eta $u_3$ altuera beste triangelu angeluzuzen baten katetoak dira, eta haren hipotenusa bektorea da.',
                'En la caja de lados $u_1$, $u_2$ y $u_3$, la diagonal del suelo mide $\\sqrt{u_1^2+u_2^2}$. Esa diagonal y la altura $u_3$ son los catetos de otro triángulo rectángulo, cuya hipotenusa es el vector.',
                'في الصندوق الذي أضلاعه $u_1$ و$u_2$ و$u_3$ يكون طول قطر الأرضية $\\sqrt{u_1^2+u_2^2}$. وهذا القطر والارتفاع $u_3$ ضلعا قائمة لمثلث قائم آخر وتره هو المتجه.',
                'In the box with sides $u_1$, $u_2$ and $u_3$, the diagonal of the floor is $\\sqrt{u_1^2+u_2^2}$. That diagonal and the height $u_3$ are the legs of another right triangle, whose hypotenuse is the vector.'
            ),
            math: same('$\\begin{gathered}|\\vec{u}|^2=\\left(\\sqrt{u_1^2+u_2^2}\\right)^2+u_3^2\\\\ =u_1^2+u_2^2+u_3^2\\end{gathered}$')
        }
    },
    'midpoint-symmetric': {
        definitions: [
            { term: say('Erdiko puntua', 'Punto medio', 'المنتصف', 'Midpoint'), meaning: say('$AB$ zuzenkiaren puntua, $A$ puntutik eta $B$ puntutik distantzia berera dagoena.', 'El punto del segmento $AB$ que está a la misma distancia de $A$ y de $B$.', 'نقطة القطعة $AB$ التي تبعد البعد نفسه عن $A$ وعن $B$.', 'The point of the segment $AB$ that is the same distance from $A$ and from $B$.') },
            { term: say('Puntu batekiko simetrikoa', 'Simétrico respecto de un punto', 'النظيرة بالنسبة إلى نقطة', 'Symmetric point'), meaning: say('$P\'$ puntua, $M$ puntua $P$ eta $P\'$ puntuen erdiko puntua izan dadin.', 'El punto $P\'$ tal que $M$ es el punto medio de $P$ y $P\'$.', 'النقطة $P\'$ التي تجعل $M$ منتصف $P$ و$P\'$.', 'The point $P\'$ such that $M$ is the midpoint of $P$ and $P\'$.') }
        ],
        vocabulary: [
            say('zuzenkia', 'segmento', 'القطعة', 'segment'),
            say('batezbestekoa', 'media', 'المتوسط', 'average'),
            say('erdia', 'mitad', 'النصف', 'half')
        ],
        explanation: say(
            '$A$ puntutik erdiko puntura joateko, $\\overrightarrow{AB}$ bektorearen erdia egiten da: $M=A+\\frac{1}{2}\\overrightarrow{AB}=\\frac{A+B}{2}$, koordenatuz koordenatu, hau da, koordenatuen batezbestekoa. Alderantziz, mutur bat eta erdiko puntua ezagutzen badira, beste muturra $2M$ ken ezaguna da: horrela aurkitzen da puntu baten simetrikoa.',
            'Para ir de $A$ al punto medio se recorre la mitad de $\\overrightarrow{AB}$: $M=A+\\frac{1}{2}\\overrightarrow{AB}=\\frac{A+B}{2}$, coordenada a coordenada, es decir, la media de las coordenadas. Al revés, si se conocen un extremo y el punto medio, el otro extremo es $2M$ menos el conocido: así se halla el simétrico de un punto.',
            'للانتقال من $A$ إلى المنتصف نقطع نصف $\\overrightarrow{AB}$: ‏$M=A+\\frac{1}{2}\\overrightarrow{AB}=\\frac{A+B}{2}$ مركّبةً مركّبة، أي متوسط الإحداثيات. وبالعكس، إذا عُرف طرف والمنتصف فالطرف الآخر هو $2M$ ناقص المعروف: وهكذا نجد نظيرة نقطة.',
            'To go from $A$ to the midpoint you cover half of $\\overrightarrow{AB}$: $M=A+\\frac{1}{2}\\overrightarrow{AB}=\\frac{A+B}{2}$, coordinate by coordinate, that is, the average of the coordinates. The other way round, if you know one end and the midpoint, the other end is $2M$ minus the known one: that is how you find the symmetric of a point.'
        ),
        examplePrompt: say('$C(4,-1,5)$ eta $D$ puntuen erdiko puntua $M(1,2,-3)$ da. Aurkitu $D$.', 'El punto medio de $C(4,-1,5)$ y $D$ es $M(1,2,-3)$. Halla $D$.', 'منتصف $C(4,-1,5)$ و$D$ هو $M(1,2,-3)$. أوجد $D$.', 'The midpoint of $C(4,-1,5)$ and $D$ is $M(1,2,-3)$. Find $D$.'),
        example: same('$\\begin{gathered}D=2M-C=(2-4,4+1,-6-5)\\\\ =(-2,5,-11)\\end{gathered}$'),
        exampleAnswer: same('$D(-2,5,-11)$')
    },

    /* ---------- 2. Linear dependence and bases ---------- */
    'combination-3d': {
        definitions: [
            { term: say('Konbinazio lineala', 'Combinación lineal', 'التركيب الخطي', 'Linear combination'), meaning: say('Zenbakiez biderkatutako bektoreen batura bat: $a\\vec{u}+b\\vec{v}$.', 'Una suma de vectores multiplicados por números: $a\\vec{u}+b\\vec{v}$.', 'مجموع متجهات مضروبة في أعداد: $a\\vec{u}+b\\vec{v}$.', 'A sum of vectors multiplied by numbers: $a\\vec{u}+b\\vec{v}$.') },
            { term: say('Lerrokatutako puntuak', 'Puntos alineados', 'نقاط على استقامة واحدة', 'Collinear points'), meaning: say('Zuzen bereko puntuak: $A$, $B$ eta $C$ lerrokatuta daude $\\overrightarrow{AC}$ bektorea $\\overrightarrow{AB}$ bektorearen multiploa bada.', 'Puntos de una misma recta: $A$, $B$ y $C$ lo están si $\\overrightarrow{AC}$ es un múltiplo de $\\overrightarrow{AB}$.', 'نقاط على مستقيم واحد: تكون $A$ و$B$ و$C$ كذلك إذا كان $\\overrightarrow{AC}$ من مضاعفات $\\overrightarrow{AB}$.', 'Points on one line: $A$, $B$ and $C$ are collinear if $\\overrightarrow{AC}$ is a multiple of $\\overrightarrow{AB}$.') }
        ],
        vocabulary: [
            say('sistema', 'sistema', 'النظام', 'system'),
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('planoa', 'plano', 'المستوى', 'plane')
        ],
        explanation: say(
            'Bektoreak batzea eta zenbaki batez biderkatzea koordenatuz koordenatu egiten da. $\\vec{w}$ bektorea $\\vec{u}$ eta $\\vec{v}$ bektoreen konbinazioa den jakiteko, hiru koordenatuak berdintzen dira: hiru ekuazio ateratzen dira, bi ezezagunekin. Soluzio batek hirurak betetzen baditu, $\\vec{w}$ bektorea $\\vec{u}$ eta $\\vec{v}$ bektoreen planoan dago; bestela, planotik irteten da.',
            'Sumar vectores y multiplicarlos por un número se hace coordenada a coordenada. Para saber si $\\vec{w}$ es combinación de $\\vec{u}$ y $\\vec{v}$ se igualan las tres coordenadas: salen tres ecuaciones con dos incógnitas. Si una solución cumple las tres, $\\vec{w}$ está en el plano de $\\vec{u}$ y $\\vec{v}$; si no, sale de él.',
            'يُجرى جمع المتجهات وضربها في عدد مركّبةً مركّبة. ولمعرفة هل $\\vec{w}$ تركيب لـ $\\vec{u}$ و$\\vec{v}$ نساوي المركّبات الثلاث: فنحصل على ثلاث معادلات بمجهولين. وإذا حقق حلٌّ المعادلات الثلاث فإن $\\vec{w}$ يقع في مستوى $\\vec{u}$ و$\\vec{v}$؛ وإلا فإنه يخرج منه.',
            'Adding vectors and multiplying them by a number is done coordinate by coordinate. To find out whether $\\vec{w}$ is a combination of $\\vec{u}$ and $\\vec{v}$, set the three coordinates equal: you get three equations in two unknowns. If one solution satisfies all three, $\\vec{w}$ lies in the plane of $\\vec{u}$ and $\\vec{v}$; if not, it leaves it.'
        ),
        examplePrompt: say('Lerrokatuta daude $A(2,-1,1)$, $B(3,1,0)$ eta $C(5,5,-2)$ puntuak?', '¿Están alineados los puntos $A(2,-1,1)$, $B(3,1,0)$ y $C(5,5,-2)$?', 'هل النقاط $A(2,-1,1)$ و$B(3,1,0)$ و$C(5,5,-2)$ على استقامة واحدة؟', 'Are the points $A(2,-1,1)$, $B(3,1,0)$ and $C(5,5,-2)$ collinear?'),
        example: same('$\\overrightarrow{AB}=(1,2,-1)\\qquad\\overrightarrow{AC}=(3,6,-3)=3\\,\\overrightarrow{AB}$'),
        exampleAnswer: say('Bai: $\\overrightarrow{AC}$ bektorea $\\overrightarrow{AB}$ bektorearen multiploa da, eta hiru puntuak zuzen berean daude.', 'Sí: $\\overrightarrow{AC}$ es un múltiplo de $\\overrightarrow{AB}$, y los tres puntos están en la misma recta.', 'نعم: $\\overrightarrow{AC}$ من مضاعفات $\\overrightarrow{AB}$، والنقاط الثلاث على مستقيم واحد.', 'Yes: $\\overrightarrow{AC}$ is a multiple of $\\overrightarrow{AB}$, and the three points are on the same line.')
    },
    'dependence-rank': {
        definitions: [
            { term: say('Linealki mendekoak', 'Linealmente dependientes', 'مرتبطة خطيًا', 'Linearly dependent'), meaning: say('Bektore batzuk, haietako bat besteen konbinazio lineala denean.', 'Vectores en los que uno es combinación lineal de los otros.', 'متجهات يكون أحدها تركيبًا خطيًا للأخرى.', 'Vectors in which one is a linear combination of the others.') },
            { term: say('Heina', 'Rango', 'الرتبة', 'Rank'), meaning: say('Haien artean dauden bektore independenteen kopurua, $\\operatorname{rg}$.', 'El número de vectores independientes que hay entre ellos, $\\operatorname{rg}$.', 'عدد المتجهات المستقلة بينها، $\\operatorname{rg}$.', 'The number of independent vectors among them, $\\operatorname{rg}$.') }
        ],
        vocabulary: [
            say('determinantea', 'determinante', 'المحدد', 'determinant'),
            say('Sarrusen erregela', 'regla de Sarrus', 'قاعدة ساروس', 'rule of Sarrus'),
            say('paraleloak', 'paralelos', 'متوازيان', 'parallel')
        ],
        explanation: say(
            'Bi bektore mendekoak dira paraleloak badira. Espazioko hiru bektore mendekoak dira plano berean badaude: orduan, bat beste bien konbinazioa da, eta haien determinantea 0 da. Hiru bektore baino gehiagorekin, beti dago mendekotasuna. Koordenatuen matrizearen heinak independenteak zenbatzen ditu.',
            'Dos vectores son dependientes si son paralelos. Tres vectores del espacio son dependientes si están en un mismo plano: entonces uno es combinación de los otros dos y su determinante vale 0. Con más de tres vectores siempre hay dependencia. El rango de la matriz de coordenadas cuenta los independientes.',
            'يكون متجهان مرتبطين إذا كانا متوازيين. وتكون ثلاثة متجهات في الفضاء مرتبطة إذا وقعت في مستوى واحد: عندئذ يكون أحدها تركيبًا للآخرين ويساوي محددها 0. ومع أكثر من ثلاثة متجهات يوجد ارتباط دائمًا. وتعدّ رتبة مصفوفة المركّبات المتجهات المستقلة.',
            'Two vectors are dependent if they are parallel. Three vectors in space are dependent if they lie in one plane: then one is a combination of the other two and their determinant is 0. With more than three vectors there is always dependence. The rank of the matrix of coordinates counts the independent ones.'
        ),
        examplePrompt: say('Independenteak dira $(2,1,3)$, $(1,-1,0)$ eta $(4,5,6)$?', '¿Son independientes $(2,1,3)$, $(1,-1,0)$ y $(4,5,6)$?', 'هل $(2,1,3)$ و$(1,-1,0)$ و$(4,5,6)$ مستقلة؟', 'Are $(2,1,3)$, $(1,-1,0)$ and $(4,5,6)$ independent?'),
        example: same('$\\begin{vmatrix}2&1&3\\\\1&-1&0\\\\4&5&6\\end{vmatrix}=-12+0+15+12-0-6=9$'),
        exampleAnswer: say('Bai: determinantea 9 da, ez 0, eta heina 3 da.', 'Sí: el determinante es 9, no 0, y el rango es 3.', 'نعم: المحدد 9 وليس 0، والرتبة 3.', 'Yes: the determinant is 9, not 0, and the rank is 3.'),
        why: {
            text: say(
                '$\\vec{w}=a\\vec{u}+b\\vec{v}$ bada, determinantearen hirugarren errenkada lehenengoa bider $a$ gehi bigarrena bider $b$ da. Kenduz gero, zeroz osatutako errenkada bat geratzen da, eta determinantea 0 da. Alderantziz, 0 bada, errenkadak zeroz osatutako errenkada bat lortu arte murriztu daitezke.',
                'Si $\\vec{w}=a\\vec{u}+b\\vec{v}$, la tercera fila del determinante es $a$ veces la primera más $b$ veces la segunda. Restándolas queda una fila de ceros, y el determinante vale 0. Al revés, si vale 0, las filas se pueden reducir hasta una fila de ceros.',
                'إذا كان $\\vec{w}=a\\vec{u}+b\\vec{v}$ فإن الصف الثالث في المحدد هو $a$ مرة الأول زائد $b$ مرة الثاني. وبطرحهما يبقى صف من الأصفار فيساوي المحدد 0. وبالعكس، إذا كان 0 أمكن اختزال الصفوف حتى صف من الأصفار.',
                'If $\\vec{w}=a\\vec{u}+b\\vec{v}$, the third row of the determinant is $a$ times the first plus $b$ times the second. Subtracting them leaves a row of zeros, and the determinant is 0. The other way round, if it is 0, the rows can be reduced to a row of zeros.'
            )
        }
    },
    'basis-3d': {
        definitions: [
            { term: say('Espazioaren oinarria', 'Base del espacio', 'أساس الفضاء', 'Basis of space'), meaning: say('Linealki independenteak diren hiru bektore.', 'Tres vectores linealmente independientes.', 'ثلاثة متجهات مستقلة خطيًا.', 'Three linearly independent vectors.') },
            { term: say('Oinarri kanonikoa', 'Base canónica', 'الأساس القانوني', 'Standard basis'), meaning: say('Ardatzen bektore unitarioen oinarria: $\\vec{i}=(1,0,0)$, $\\vec{j}=(0,1,0)$ eta $\\vec{k}=(0,0,1)$.', 'La base de los vectores unitarios de los ejes: $\\vec{i}=(1,0,0)$, $\\vec{j}=(0,1,0)$ y $\\vec{k}=(0,0,1)$.', 'أساس متجهات الوحدة على المحاور: $\\vec{i}=(1,0,0)$ و$\\vec{j}=(0,1,0)$ و$\\vec{k}=(0,0,1)$.', 'The basis of the unit vectors of the axes: $\\vec{i}=(1,0,0)$, $\\vec{j}=(0,1,0)$ and $\\vec{k}=(0,0,1)$.') }
        ],
        vocabulary: [
            say('koordenatuak', 'coordenadas', 'المركّبات', 'coordinates'),
            say('ekuazioa', 'ecuación', 'المعادلة', 'equation'),
            say('independenteak', 'independientes', 'مستقلة', 'independent')
        ],
        explanation: say(
            'Bi bektore ez dira nahikoak espazio osora iristeko, eta lau beti dira mendekoak: espazioaren oinarri batek hiru bektore independente ditu. Bektore baten koordenatuak oinarrian konbinazioaren zenbakiak dira, eta hiru ekuazioko sistema batetik ateratzen dira. Oinarri kanonikoan, betiko koordenatuekin bat datoz.',
            'Dos vectores no bastan para llegar a todo el espacio, y cuatro siempre son dependientes: una base del espacio tiene tres vectores independientes. Las coordenadas de un vector en la base son los números de la combinación, y salen de un sistema de tres ecuaciones. En la base canónica coinciden con las coordenadas de siempre.',
            'متجهان لا يكفيان للوصول إلى الفضاء كله، وأربعة متجهات مرتبطة دائمًا: لأساس الفضاء ثلاثة متجهات مستقلة. ومركّبات متجه في الأساس هي أعداد التركيب، وتأتي من نظام من ثلاث معادلات. وفي الأساس القانوني تطابق المركّبات المعتادة.',
            'Two vectors are not enough to reach the whole of space, and four are always dependent: a basis of space has three independent vectors. The coordinates of a vector in the basis are the numbers of the combination, and they come from a system of three equations. In the standard basis they are the usual coordinates.'
        ),
        examplePrompt: say('Aurkitu $(4,-1,6)$ bektorearen koordenatuak $\\{(2,0,0),(2,1,0),(0,2,3)\\}$ oinarrian.', 'Halla las coordenadas de $(4,-1,6)$ en la base $\\{(2,0,0),(2,1,0),(0,2,3)\\}$.', 'أوجد مركّبات $(4,-1,6)$ في الأساس $\\{(2,0,0),(2,1,0),(0,2,3)\\}$.', 'Find the coordinates of $(4,-1,6)$ in the basis $\\{(2,0,0),(2,1,0),(0,2,3)\\}$.'),
        example: same('$\\begin{gathered}c=\\frac{6}{3}=2\\qquad b=-1-4=-5\\\\ a=\\frac{4+10}{2}=7\\end{gathered}$'),
        exampleAnswer: same('$(7,-5,2)_B$')
    },

    /* ---------- 3. The dot product in space ---------- */
    'dot-3d': {
        definitions: [
            { term: say('Biderkadura eskalarra', 'Producto escalar', 'الجداء السلمي', 'Dot product'), meaning: say('$\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, bi bektoreen $\\alpha$ angeluak ematen duen zenbakia.', '$\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, el número que da el ángulo $\\alpha$ de los dos vectores.', '$\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$، العدد الذي تعطيه الزاوية $\\alpha$ بين المتجهين.', '$\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, the number the angle $\\alpha$ between the two vectors gives.') }
        ],
        vocabulary: [
            say('trukakorra', 'conmutativo', 'تبديلي', 'commutative'),
            say('banakorra', 'distributivo', 'توزيعي', 'distributive'),
            say('ortonormala', 'ortonormal', 'متعامد متجانس', 'orthonormal')
        ],
        explanation: say(
            'Biderkadura eskalarra planoan bezala definitzen da, moduluekin eta angeluaren kosinuarekin. Oinarri ortonormal bateko koordenatuekin ($\\vec{i}$, $\\vec{j}$ eta $\\vec{k}$ perpendikularrak eta 1 modulukoak), gai bat gehiago batzen da. Haren propietateei esker zenbakiekin bezala garatzen da: trukakorra eta banakorra da, eta $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$.',
            'El producto escalar se define igual que en el plano, con los módulos y el coseno del ángulo. Con coordenadas en una base ortonormal ($\\vec{i}$, $\\vec{j}$ y $\\vec{k}$ perpendiculares y de módulo 1) se suma un término más. Sus propiedades permiten desarrollar como con números: es conmutativo y distributivo, y $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$.',
            'يُعرَّف الجداء السلمي كما في المستوى، بالطولين وجيب تمام الزاوية. وبالمركّبات في أساس متعامد متجانس ($\\vec{i}$ و$\\vec{j}$ و$\\vec{k}$ متعامدة وطول كل منها 1) نضيف حدًا آخر. وتسمح خصائصه بالنشر كما مع الأعداد: هو تبديلي وتوزيعي، و$\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$.',
            'The dot product is defined as in the plane, with the magnitudes and the cosine of the angle. With coordinates in an orthonormal basis ($\\vec{i}$, $\\vec{j}$ and $\\vec{k}$ perpendicular and of magnitude 1) you add one more term. Its properties let you expand as with numbers: it is commutative and distributive, and $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$.'
        ),
        examplePrompt: say('$|\\vec{a}|=3$, $|\\vec{b}|=5$ eta $\\vec{a}\\cdot\\vec{b}=-4$ badira, zenbat da $(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b})$?', 'Si $|\\vec{a}|=3$, $|\\vec{b}|=5$ y $\\vec{a}\\cdot\\vec{b}=-4$, ¿cuánto vale $(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b})$?', 'إذا كان $|\\vec{a}|=3$ و$|\\vec{b}|=5$ و$\\vec{a}\\cdot\\vec{b}=-4$ فكم يساوي $(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b})$؟', 'If $|\\vec{a}|=3$, $|\\vec{b}|=5$ and $\\vec{a}\\cdot\\vec{b}=-4$, what is $(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b})$?'),
        example: same('$(\\vec{a}+\\vec{b})\\cdot(\\vec{a}-\\vec{b})=|\\vec{a}|^2-|\\vec{b}|^2=9-25=-16$'),
        exampleAnswer: say('$-16$ da: gurutzatutako biderkadurak elkar ezeztatzen dira.', 'Vale $-16$: los productos cruzados se anulan.', 'يساوي $-16$: الجداءات المتقاطعة تُلغي بعضها.', 'It is $-16$: the cross terms cancel out.')
    },
    'angle-3d': {
        definitions: [
            { term: say('Bektore ortogonalak', 'Vectores ortogonales', 'المتجهات المتعامدة', 'Orthogonal vectors'), meaning: say('Bektore perpendikularrak: haien biderkadura eskalarra 0 da.', 'Vectores perpendiculares: su producto escalar vale 0.', 'متجهات متعامدة: جداؤها السلمي يساوي 0.', 'Perpendicular vectors: their dot product is 0.') }
        ],
        vocabulary: [
            say('kosinua', 'coseno', 'جيب التمام', 'cosine'),
            say('zorrotza', 'agudo', 'حادة', 'acute'),
            say('kamutsa', 'obtuso', 'منفرجة', 'obtuse')
        ],
        explanation: say(
            'Biderkadura eskalarraren definiziotik kosinua askatuz, angelua lortzen da. Biderkadura eskalarra positiboa bada, angelua zorrotza da; negatiboa bada, kamutsa; eta 0 bada, zuzena. Parametro bat duten bi bektore perpendikularrak izan daitezen, haien biderkadura eskalarra 0 egiten da.',
            'Despejando el coseno de la definición del producto escalar se obtiene el ángulo. Si el producto escalar es positivo, el ángulo es agudo; si es negativo, obtuso; y si es 0, recto. Para que dos vectores con un parámetro sean perpendiculares, se iguala su producto escalar a 0.',
            'بعزل جيب التمام من تعريف الجداء السلمي نحصل على الزاوية. إذا كان الجداء السلمي موجبًا فالزاوية حادة، وإذا كان سالبًا فهي منفرجة، وإذا كان 0 فهي قائمة. ولكي يتعامد متجهان فيهما وسيط نساوي جداءهما السلمي بـ 0.',
            'Solving the definition of the dot product for the cosine gives the angle. If the dot product is positive, the angle is acute; if it is negative, obtuse; and if it is 0, a right angle. For two vectors with a parameter to be perpendicular, set their dot product equal to 0.'
        ),
        examplePrompt: say('Zorrotza, zuzena ala kamutsa da $(3,-1,2)$ eta $(1,5,-2)$ bektoreen angelua? Aurkitu haren kosinua.', '¿Es agudo, recto u obtuso el ángulo de $(3,-1,2)$ y $(1,5,-2)$? Halla su coseno.', 'هل الزاوية بين $(3,-1,2)$ و$(1,5,-2)$ حادة أم قائمة أم منفرجة؟ أوجد جيب تمامها.', 'Is the angle between $(3,-1,2)$ and $(1,5,-2)$ acute, right or obtuse? Find its cosine.'),
        example: same('$\\cos\\alpha=\\frac{3-5-4}{\\sqrt{14}\\cdot\\sqrt{30}}\\approx -0{,}29$'),
        exampleAnswer: say('Kamutsa: biderkadura eskalarra $-6$ da, negatiboa.', 'Obtuso: el producto escalar es $-6$, negativo.', 'منفرجة: الجداء السلمي $-6$، سالب.', 'Obtuse: the dot product is $-6$, negative.')
    },
    'projection-3d': {
        definitions: [
            { term: say('Proiekzio eskalarra', 'Proyección escalar', 'الإسقاط السلمي', 'Scalar projection'), meaning: say('$\\vec{v}$ bektoreak $\\vec{u}$ bektorearen zuzenean duen itzalaren luzera, zeinuarekin: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$.', 'La longitud, con signo, de la sombra de $\\vec{v}$ sobre la recta de $\\vec{u}$: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$.', 'طول ظل $\\vec{v}$ على مستقيم $\\vec{u}$ مع إشارته: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$.', 'The signed length of the shadow of $\\vec{v}$ on the line of $\\vec{u}$: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$.') },
            { term: say('Proiekzio-bektorea', 'Vector proyección', 'متجه الإسقاط', 'Vector projection'), meaning: say('Itzala bera, $\\vec{u}$ bektorearen paraleloa den bektore bat.', 'La sombra misma, un vector paralelo a $\\vec{u}$.', 'الظل نفسه، وهو متجه موازٍ لـ $\\vec{u}$.', 'The shadow itself, a vector parallel to $\\vec{u}$.') }
        ],
        vocabulary: [
            say('itzala', 'sombra', 'الظل', 'shadow'),
            say('perpendikularra', 'perpendicular', 'عمودي', 'perpendicular'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Argia $\\vec{u}$ bektorearen zuzenarekiko perpendikularki erortzen bada, $\\vec{v}$ bektorearen itzalak zuzen horretan $|\\vec{v}|\\cos\\alpha$ neurtzen du, hau da, $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$. Proiekzio-bektorerako, luzera hori $\\vec{u}$ bektorearen unitarioaz biderkatzen da, eta horregatik agertzen da $|\\vec{u}|^2$ izendatzailean.',
            'Si la luz cae perpendicular a la recta de $\\vec{u}$, la sombra de $\\vec{v}$ sobre ella mide $|\\vec{v}|\\cos\\alpha$, que es $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$. Para el vector proyección, esa longitud se multiplica por el unitario de $\\vec{u}$, y por eso aparece $|\\vec{u}|^2$ en el denominador.',
            'إذا سقط الضوء عموديًا على مستقيم $\\vec{u}$ فإن ظل $\\vec{v}$ عليه طوله $|\\vec{v}|\\cos\\alpha$، أي $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$. ولمتجه الإسقاط نضرب هذا الطول في متجه وحدة $\\vec{u}$، ولهذا يظهر $|\\vec{u}|^2$ في المقام.',
            'If the light falls perpendicular to the line of $\\vec{u}$, the shadow of $\\vec{v}$ on it measures $|\\vec{v}|\\cos\\alpha$, which is $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$. For the vector projection, that length is multiplied by the unit vector of $\\vec{u}$, which is why $|\\vec{u}|^2$ appears in the denominator.'
        ),
        examplePrompt: say('Aurkitu $(5,-2,1)$ bektorearen proiekzio-bektorea $(0,3,4)$ bektorearen gainean.', 'Halla el vector proyección de $(5,-2,1)$ sobre $(0,3,4)$.', 'أوجد متجه إسقاط $(5,-2,1)$ على $(0,3,4)$.', 'Find the vector projection of $(5,-2,1)$ onto $(0,3,4)$.'),
        example: same('$\\frac{-2}{25}\\,(0,3,4)=\\left(0,-\\frac{6}{25},-\\frac{8}{25}\\right)$'),
        exampleAnswer: say('$(0,3,4)$ bektorearen aurkako noranzkoan doa: biderkadura eskalarra, $-2$, negatiboa da.', 'Apunta al revés que $(0,3,4)$: el producto escalar, $-2$, es negativo.', 'يتجه عكس $(0,3,4)$: الجداء السلمي $-2$ سالب.', 'It points the opposite way to $(0,3,4)$: the dot product, $-2$, is negative.'),
        why: {
            text: say(
                'Itzala hipotenusa $\\vec{v}$ duen triangelu angeluzuzen baten katetoa da: $|\\vec{v}|\\cos\\alpha$ neurtzen du. $|\\vec{u}|$ moduluaz biderkatu eta zatituz, biderkadura eskalarra agertzen da.',
                'La sombra es el cateto de un triángulo rectángulo cuya hipotenusa es $\\vec{v}$: mide $|\\vec{v}|\\cos\\alpha$. Multiplicando y dividiendo por $|\\vec{u}|$ aparece el producto escalar.',
                'الظل ضلع قائمة في مثلث قائم وتره $\\vec{v}$: طوله $|\\vec{v}|\\cos\\alpha$. وبالضرب والقسمة على $|\\vec{u}|$ يظهر الجداء السلمي.',
                'The shadow is a leg of a right triangle whose hypotenuse is $\\vec{v}$: it measures $|\\vec{v}|\\cos\\alpha$. Multiplying and dividing by $|\\vec{u}|$ brings in the dot product.'
            ),
            math: same('$|\\vec{v}|\\cos\\alpha=\\frac{|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha}{|\\vec{u}|}=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$')
        }
    },

    /* ---------- 4. The cross product ---------- */
    'cross-product': {
        definitions: [
            { term: say('Biderkadura bektoriala', 'Producto vectorial', 'الجداء المتجهي', 'Cross product'), meaning: say('$\\vec{u}\\times\\vec{v}$ bektorea, $\\vec{u}$ eta $\\vec{v}$ bektoreekiko perpendikularra, $|\\vec{u}|\\,|\\vec{v}|\\sin\\alpha$ modulukoa.', 'El vector $\\vec{u}\\times\\vec{v}$, perpendicular a $\\vec{u}$ y a $\\vec{v}$, de módulo $|\\vec{u}|\\,|\\vec{v}|\\sin\\alpha$.', 'المتجه $\\vec{u}\\times\\vec{v}$ العمودي على $\\vec{u}$ وعلى $\\vec{v}$، وطوله $|\\vec{u}|\\,|\\vec{v}|\\sin\\alpha$.', 'The vector $\\vec{u}\\times\\vec{v}$, perpendicular to $\\vec{u}$ and to $\\vec{v}$, of magnitude $|\\vec{u}|\\,|\\vec{v}|\\sin\\alpha$.') },
            { term: say('Eskuineko eskuaren erregela', 'Regla de la mano derecha', 'قاعدة اليد اليمنى', 'Right-hand rule'), meaning: say('Hatzak $\\vec{u}$ bektoretik $\\vec{v}$ bektorerantz biratuz, erpuruak $\\vec{u}\\times\\vec{v}$ bektorearen noranzkoa adierazten du.', 'Con los dedos girando de $\\vec{u}$ hacia $\\vec{v}$, el pulgar señala el sentido de $\\vec{u}\\times\\vec{v}$.', 'إذا دارت الأصابع من $\\vec{u}$ نحو $\\vec{v}$ أشار الإبهام إلى منحى $\\vec{u}\\times\\vec{v}$.', 'With your fingers turning from $\\vec{u}$ towards $\\vec{v}$, your thumb points the way of $\\vec{u}\\times\\vec{v}$.') }
        ],
        vocabulary: [
            say('sinua', 'seno', 'الجيب', 'sine'),
            say('noranzkoa', 'sentido', 'المنحى', 'sense'),
            say('determinantea', 'determinante', 'المحدد', 'determinant')
        ],
        explanation: say(
            'Eskalarra ez bezala, biderkadura bektorialak bektore bat ematen du. Biekiko perpendikularra da, beraz, osatzen duten planoarekiko perpendikularra; haren modulua angeluaren sinuarekin hazten da; eta haren noranzkoa eskuineko eskuak ematen du. Kalkulatzeko, determinante bat garatzen da, lehen errenkadan $\\vec{i}$, $\\vec{j}$ eta $\\vec{k}$ dituela.',
            'A diferencia del escalar, el producto vectorial da un vector. Es perpendicular a los dos, así que es perpendicular al plano que forman; su módulo crece con el seno del ángulo; y su sentido lo da la mano derecha. Para calcularlo se desarrolla un determinante con $\\vec{i}$, $\\vec{j}$ y $\\vec{k}$ en la primera fila.',
            'بخلاف الجداء السلمي، يعطي الجداء المتجهي متجهًا. وهو عمودي على المتجهين، أي على المستوى الذي يكوّنانه؛ ويكبر طوله مع جيب الزاوية؛ وتعطي اليد اليمنى منحاه. ولحسابه ننشر محددًا صفه الأول $\\vec{i}$ و$\\vec{j}$ و$\\vec{k}$.',
            'Unlike the dot product, the cross product gives a vector. It is perpendicular to both, so it is perpendicular to the plane they form; its magnitude grows with the sine of the angle; and its sense is given by the right hand. To work it out you expand a determinant with $\\vec{i}$, $\\vec{j}$ and $\\vec{k}$ in the first row.'
        ),
        examplePrompt: say('Kalkulatu $(2,-1,3)\\times(0,4,1)$.', 'Calcula $(2,-1,3)\\times(0,4,1)$.', 'احسب $(2,-1,3)\\times(0,4,1)$.', 'Work out $(2,-1,3)\\times(0,4,1)$.'),
        example: same('$\\begin{gathered}(-1-12)\\,\\vec{i}-(2-0)\\,\\vec{j}+(8-0)\\,\\vec{k}\\\\ =(-13,-2,8)\\end{gathered}$'),
        exampleAnswer: say('$(-13,-2,8)$, bi bektoreekiko perpendikularra.', '$(-13,-2,8)$, perpendicular a los dos vectores.', '$(-13,-2,8)$، وهو عمودي على المتجهين.', '$(-13,-2,8)$, perpendicular to both vectors.')
    },
    'cross-properties': {
        definitions: [
            { term: say('Antitrukakorra', 'Anticonmutativo', 'ضد تبديلي', 'Anticommutative'), meaning: say('Ordena aldatzean zeinua aldatzen duena: $\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$.', 'Que cambia de signo al cambiar el orden: $\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$.', 'تتغير إشارته بتغيير الترتيب: $\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$.', 'Changing sign when the order changes: $\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$.') }
        ],
        vocabulary: [
            say('aurkakoa', 'opuesto', 'المعاكس', 'opposite'),
            say('elkartze-propietatea', 'asociativo', 'تجميعي', 'associative'),
            say('bektore nulua', 'vector cero', 'المتجه الصفري', 'zero vector')
        ],
        explanation: say(
            'Ordena aldatzean, eskuineko eskuak beste aldera seinalatzen du: biderkadura bektorialak zeinua aldatzen du. Bektoreak paraleloak badira, angeluaren sinua 0 da, eta biderkadura bektore nulua da. Eta ez du elkartze-propietaterik: $(\\vec{u}\\times\\vec{v})\\times\\vec{w}$ eta $\\vec{u}\\times(\\vec{v}\\times\\vec{w})$ desberdinak izan ohi dira.',
            'Al cambiar el orden, la mano derecha apunta al otro lado: el producto vectorial cambia de signo. Si los vectores son paralelos, el seno del ángulo es 0 y el producto es el vector cero. Y no es asociativo: $(\\vec{u}\\times\\vec{v})\\times\\vec{w}$ y $\\vec{u}\\times(\\vec{v}\\times\\vec{w})$ suelen ser distintos.',
            'عند تغيير الترتيب تشير اليد اليمنى إلى الجهة الأخرى: يغيّر الجداء المتجهي إشارته. وإذا كان المتجهان متوازيين فجيب الزاوية 0 والجداء هو المتجه الصفري. وهو ليس تجميعيًا: $(\\vec{u}\\times\\vec{v})\\times\\vec{w}$ و$\\vec{u}\\times(\\vec{v}\\times\\vec{w})$ يختلفان عادةً.',
            'When you change the order, the right hand points the other way: the cross product changes sign. If the vectors are parallel, the sine of the angle is 0 and the product is the zero vector. And it is not associative: $(\\vec{u}\\times\\vec{v})\\times\\vec{w}$ and $\\vec{u}\\times(\\vec{v}\\times\\vec{w})$ are usually different.'
        ),
        examplePrompt: say('Paraleloak dira $(3,-6,9)$ eta $(-2,4,-6)$? Erabili biderkadura bektoriala.', '¿Son paralelos $(3,-6,9)$ y $(-2,4,-6)$? Usa el producto vectorial.', 'هل $(3,-6,9)$ و$(-2,4,-6)$ متوازيان؟ استعمل الجداء المتجهي.', 'Are $(3,-6,9)$ and $(-2,4,-6)$ parallel? Use the cross product.'),
        example: same('$(36-36)\\,\\vec{i}-(-18+18)\\,\\vec{j}+(12-12)\\,\\vec{k}=\\vec{0}$'),
        exampleAnswer: say('Bai: biderkadura bektoriala $\\vec{0}$ da (bigarrena lehenengoaren $-\\frac{2}{3}$ da).', 'Sí: el producto vectorial es $\\vec{0}$ (el segundo es $-\\frac{2}{3}$ del primero).', 'نعم: الجداء المتجهي هو $\\vec{0}$ (الثاني يساوي $-\\frac{2}{3}$ من الأول).', 'Yes: the cross product is $\\vec{0}$ (the second is $-\\frac{2}{3}$ of the first).')
    },
    'cross-area': {
        definitions: [
            { term: say('Bi bektoreren paralelogramoa', 'Paralelogramo de dos vectores', 'متوازي أضلاع متجهين', 'Parallelogram of two vectors'), meaning: say('$\\vec{u}$ eta $\\vec{v}$ aldeak dituena, biak puntu beretik irtenda.', 'El que tiene por lados $\\vec{u}$ y $\\vec{v}$, saliendo del mismo punto.', 'الذي ضلعاه $\\vec{u}$ و$\\vec{v}$ الخارجان من النقطة نفسها.', 'The one with sides $\\vec{u}$ and $\\vec{v}$, leaving the same point.') }
        ],
        vocabulary: [
            say('azalera', 'área', 'المساحة', 'area'),
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('erpina', 'vértice', 'الرأس', 'vertex')
        ],
        explanation: say(
            '$\\vec{u}$ eta $\\vec{v}$ aldeak dituen paralelogramoak $|\\vec{u}|$ oinarria eta $|\\vec{v}|\\sin\\alpha$ altuera ditu; beraz, haren azalera biderkadura bektorialaren modulua da, hain zuzen. Triangelu bat paralelogramo erdia da: erpin beretik irteten diren bi alde hartzen dira, bektorialki biderkatzen dira, eta modulua 2 zenbakiaz zatitzen da.',
            'El paralelogramo de lados $\\vec{u}$ y $\\vec{v}$ tiene base $|\\vec{u}|$ y altura $|\\vec{v}|\\sin\\alpha$, así que su área es justo el módulo del producto vectorial. Un triángulo es medio paralelogramo: se toman dos lados que salen del mismo vértice, se multiplican vectorialmente y se divide el módulo entre 2.',
            'لمتوازي الأضلاع الذي ضلعاه $\\vec{u}$ و$\\vec{v}$ قاعدة $|\\vec{u}|$ وارتفاع $|\\vec{v}|\\sin\\alpha$، فمساحته هي بالضبط طول الجداء المتجهي. والمثلث نصف متوازي أضلاع: نأخذ ضلعين خارجين من الرأس نفسه، ونضربهما ضربًا متجهيًا، ونقسم الطول على 2.',
            'The parallelogram with sides $\\vec{u}$ and $\\vec{v}$ has base $|\\vec{u}|$ and height $|\\vec{v}|\\sin\\alpha$, so its area is exactly the magnitude of the cross product. A triangle is half a parallelogram: take two sides leaving the same vertex, take their cross product and divide its magnitude by 2.'
        ),
        examplePrompt: say('Zein da $(2,1,0)$ eta $(2,2,3)$ aldeak dituen paralelogramoaren azalera?', '¿Cuál es el área del paralelogramo de lados $(2,1,0)$ y $(2,2,3)$?', 'ما مساحة متوازي الأضلاع الذي ضلعاه $(2,1,0)$ و$(2,2,3)$؟', 'What is the area of the parallelogram with sides $(2,1,0)$ and $(2,2,3)$?'),
        example: same('$\\begin{gathered}(3-0)\\,\\vec{i}-(6-0)\\,\\vec{j}+(4-2)\\,\\vec{k}\\\\ =(3,-6,2)\\\\ |(3,-6,2)|=\\sqrt{9+36+4}=7\\end{gathered}$'),
        exampleAnswer: say('7 unitate karratu.', '7 unidades cuadradas.', '7 وحدات مربعة.', '7 square units.'),
        why: {
            text: say(
                '$|\\vec{u}|$ oinarria eta $|\\vec{v}|\\sin\\alpha$ altuera izanik, paralelogramoaren azalera $|\\vec{u}|\\,|\\vec{v}|\\sin\\alpha$ da, eta hori da biderkadura bektorialaren moduluaren definizioa.',
                'Con base $|\\vec{u}|$ y altura $|\\vec{v}|\\sin\\alpha$, el área del paralelogramo es $|\\vec{u}|\\,|\\vec{v}|\\sin\\alpha$, que es la definición del módulo del producto vectorial.',
                'بقاعدة $|\\vec{u}|$ وارتفاع $|\\vec{v}|\\sin\\alpha$ تكون مساحة متوازي الأضلاع $|\\vec{u}|\\,|\\vec{v}|\\sin\\alpha$، وهذا تعريف طول الجداء المتجهي.',
                'With base $|\\vec{u}|$ and height $|\\vec{v}|\\sin\\alpha$, the area of the parallelogram is $|\\vec{u}|\\,|\\vec{v}|\\sin\\alpha$, which is the definition of the magnitude of the cross product.'
            ),
            math: same('$S=|\\vec{u}|\\cdot|\\vec{v}|\\sin\\alpha=|\\vec{u}\\times\\vec{v}|$')
        }
    },

    /* ---------- 5. The mixed product ---------- */
    'mixed-product': {
        definitions: [
            { term: say('Biderkadura mistoa', 'Producto mixto', 'الجداء المختلط', 'Scalar triple product'), meaning: say('$[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$ zenbakia, bi biderkadurak batzen dituena.', 'El número $[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$, que junta los dos productos.', 'العدد $[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$ الذي يجمع الجداءين.', 'The number $[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$, which puts the two products together.') }
        ],
        vocabulary: [
            say('errenkada', 'fila', 'الصف', 'row'),
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('ordena', 'orden', 'الترتيب', 'order')
        ],
        explanation: say(
            'Lehenik $\\vec{v}\\times\\vec{w}$ egiten da, bektore bat, eta gero haren biderkadura eskalarra $\\vec{u}$ bektorearekin, zenbaki bat ematen duena. Garatuz gero, koordenatuen hiru errenkaden determinantea ateratzen da. Horregatik ditu haren propietateak: bi errenkada trukatzeak zeinua aldatzen du, eta bi bektore paraleloak badira, 0 da.',
            'Primero se hace $\\vec{v}\\times\\vec{w}$, un vector, y después su producto escalar con $\\vec{u}$, que da un número. Desarrollando, sale el determinante de las tres filas de coordenadas. Por eso hereda sus propiedades: intercambiar dos filas cambia el signo y, si dos vectores son paralelos, vale 0.',
            'نحسب أولًا $\\vec{v}\\times\\vec{w}$، وهو متجه، ثم جداءه السلمي مع $\\vec{u}$، فنحصل على عدد. وبالنشر يظهر محدد الصفوف الثلاثة من المركّبات. ولذلك يرث خصائصه: تبديل صفين يغيّر الإشارة، وإذا توازى متجهان كان 0.',
            'First you take $\\vec{v}\\times\\vec{w}$, a vector, and then its dot product with $\\vec{u}$, which gives a number. Expanding, you get the determinant of the three rows of coordinates. That is why it has its properties: swapping two rows changes the sign and, if two vectors are parallel, it is 0.'
        ),
        examplePrompt: say('Kalkulatu $[\\vec{a},\\vec{b},\\vec{c}]$, $\\vec{a}=(3,1,-1)$, $\\vec{b}=(2,0,4)$ eta $\\vec{c}=(1,5,2)$ izanik.', 'Calcula $[\\vec{a},\\vec{b},\\vec{c}]$ con $\\vec{a}=(3,1,-1)$, $\\vec{b}=(2,0,4)$ y $\\vec{c}=(1,5,2)$.', 'احسب $[\\vec{a},\\vec{b},\\vec{c}]$ حيث $\\vec{a}=(3,1,-1)$ و$\\vec{b}=(2,0,4)$ و$\\vec{c}=(1,5,2)$.', 'Work out $[\\vec{a},\\vec{b},\\vec{c}]$ with $\\vec{a}=(3,1,-1)$, $\\vec{b}=(2,0,4)$ and $\\vec{c}=(1,5,2)$.'),
        example: same('$0+4-10-0-60-4=-70$'),
        exampleAnswer: say('$-70$: haien kutxaren bolumena 70 da.', '$-70$: el volumen de su caja es 70.', '$-70$: حجم صندوقها 70.', '$-70$: the volume of their box is 70.')
    },
    'mixed-volume': {
        definitions: [
            { term: say('Paralelepipedoa', 'Paralelepípedo', 'متوازي السطوح', 'Parallelepiped'), meaning: say('Sei aurpegiak paralelogramoak dituen prisma; puntu beretik irteten diren hiru bektorek osatzen dute.', 'Un prisma cuyas seis caras son paralelogramos; lo forman tres vectores que salen del mismo punto.', 'موشور أوجهه الستة متوازيات أضلاع؛ تكوّنه ثلاثة متجهات خارجة من النقطة نفسها.', 'A prism whose six faces are parallelograms; three vectors leaving the same point form it.') },
            { term: say('Tetraedroa', 'Tetraedro', 'رباعي الأوجه', 'Tetrahedron'), meaning: say('Oinarri triangeluarreko piramide bat: lau erpin eta lau aurpegi triangeluar.', 'Una pirámide de base triangular: cuatro vértices y cuatro caras triangulares.', 'هرم قاعدته مثلث: أربعة رؤوس وأربعة أوجه مثلثة.', 'A pyramid with a triangular base: four vertices and four triangular faces.') }
        ],
        vocabulary: [
            say('ertza', 'arista', 'الحرف', 'edge'),
            say('bolumena', 'volumen', 'الحجم', 'volume'),
            say('balio absolutua', 'valor absoluto', 'القيمة المطلقة', 'absolute value')
        ],
        explanation: say(
            'Paralelepipedoaren oinarriaren azalera $|\\vec{v}\\times\\vec{w}|$ da, eta haren altuera $\\vec{u}$ bektorearen proiekzioa $\\vec{v}\\times\\vec{w}$ norabidean. Haien biderkadura biderkadura mistoaren balio absolutua da. Ertz berak dituen tetraedroa sei aldiz sartzen da: paralelogramo erdiko oinarria duen piramide bat da; beraz, $\\frac{1}{2}\\cdot\\frac{1}{3}=\\frac{1}{6}$.',
            'El área de la base del paralelepípedo es $|\\vec{v}\\times\\vec{w}|$, y su altura es la proyección de $\\vec{u}$ sobre la dirección de $\\vec{v}\\times\\vec{w}$. Su producto es el valor absoluto del producto mixto. Un tetraedro con las mismas aristas cabe seis veces: es una pirámide de base medio paralelogramo, así que $\\frac{1}{2}\\cdot\\frac{1}{3}=\\frac{1}{6}$.',
            'مساحة قاعدة متوازي السطوح $|\\vec{v}\\times\\vec{w}|$، وارتفاعه إسقاط $\\vec{u}$ على اتجاه $\\vec{v}\\times\\vec{w}$. وجداؤهما هو القيمة المطلقة للجداء المختلط. ورباعي الأوجه الذي له الأحرف نفسها يدخل فيه ست مرات: إنه هرم قاعدته نصف متوازي أضلاع، إذن $\\frac{1}{2}\\cdot\\frac{1}{3}=\\frac{1}{6}$.',
            'The area of the base of the parallelepiped is $|\\vec{v}\\times\\vec{w}|$, and its height is the projection of $\\vec{u}$ on the direction of $\\vec{v}\\times\\vec{w}$. Their product is the absolute value of the scalar triple product. A tetrahedron with the same edges fits six times: it is a pyramid on half a parallelogram, so $\\frac{1}{2}\\cdot\\frac{1}{3}=\\frac{1}{6}$.'
        ),
        examplePrompt: say('Aurkitu $(1,-1,2)$, $(3,0,1)$ eta $(0,2,5)$ ertzak dituen paralelepipedoaren bolumena.', 'Halla el volumen del paralelepípedo de aristas $(1,-1,2)$, $(3,0,1)$ y $(0,2,5)$.', 'أوجد حجم متوازي السطوح الذي أحرفه $(1,-1,2)$ و$(3,0,1)$ و$(0,2,5)$.', 'Find the volume of the parallelepiped with edges $(1,-1,2)$, $(3,0,1)$ and $(0,2,5)$.'),
        example: same('$0+0+12-0-2+15=25$'),
        exampleAnswer: say('25 unitate kubiko.', '25 unidades cúbicas.', '25 وحدة مكعبة.', '25 cubic units.'),
        why: {
            text: say(
                'Bolumena = oinarriaren azalera bider altuera. Oinarriak $|\\vec{v}\\times\\vec{w}|$ neurtzen du, eta altuera $|\\vec{u}|\\,|\\cos\\theta|$ da, $\\theta$ izanik $\\vec{u}$ eta $\\vec{v}\\times\\vec{w}$ bektoreen angelua: haien biderkadura biderkadura eskalarraren balio absolutua da.',
                'Volumen = área de la base por altura. La base mide $|\\vec{v}\\times\\vec{w}|$ y la altura es $|\\vec{u}|\\,|\\cos\\theta|$, con $\\theta$ el ángulo de $\\vec{u}$ y $\\vec{v}\\times\\vec{w}$: su producto es el valor absoluto del producto escalar.',
                'الحجم = مساحة القاعدة في الارتفاع. مساحة القاعدة $|\\vec{v}\\times\\vec{w}|$ والارتفاع $|\\vec{u}|\\,|\\cos\\theta|$، حيث $\\theta$ الزاوية بين $\\vec{u}$ و$\\vec{v}\\times\\vec{w}$: وجداؤهما القيمة المطلقة للجداء السلمي.',
                'Volume = area of the base times height. The base is $|\\vec{v}\\times\\vec{w}|$ and the height is $|\\vec{u}|\\,|\\cos\\theta|$, with $\\theta$ the angle between $\\vec{u}$ and $\\vec{v}\\times\\vec{w}$: their product is the absolute value of the dot product.'
            ),
            math: same('$V=|\\vec{v}\\times\\vec{w}|\\,|\\vec{u}|\\,|\\cos\\theta|=|\\vec{u}\\cdot(\\vec{v}\\times\\vec{w})|$')
        }
    },
    coplanar: {
        definitions: [
            { term: say('Planokideak', 'Coplanarios', 'مستوية', 'Coplanar'), meaning: say('Plano berean dauden bektoreak edo puntuak.', 'Vectores o puntos que están en un mismo plano.', 'متجهات أو نقاط تقع في مستوى واحد.', 'Vectors or points that lie in one plane.') }
        ],
        vocabulary: [
            say('kutxa', 'caja', 'الصندوق', 'box'),
            say('zapalduta', 'aplastada', 'منضغطة', 'flattened'),
            say('mendekotasuna', 'dependencia', 'الارتباط', 'dependence')
        ],
        explanation: say(
            'Hiru bektore plano batean badaude, osatzen duten kutxa zapalduta geratzen da, eta haren bolumena, biderkadura mistoa, 0 da; eta alderantziz. Lau punturekin, haietako batetik irteten diren hiru bektoreak erabiltzen dira. Mendekotasun linealaren baldintza bera da: determinantea 0.',
            'Si tres vectores están en un plano, la caja que forman queda aplastada y su volumen, el producto mixto, es 0; y al revés. Para cuatro puntos se usan los tres vectores que salen de uno de ellos. Es la misma condición que la dependencia lineal: determinante 0.',
            'إذا وقعت ثلاثة متجهات في مستوى واحد صار الصندوق الذي تكوّنه منضغطًا، وحجمه، أي الجداء المختلط، 0؛ والعكس صحيح. ولأربع نقاط نستعمل المتجهات الثلاثة الخارجة من إحداها. وهو شرط الارتباط الخطي نفسه: المحدد 0.',
            'If three vectors lie in one plane, the box they form is flattened and its volume, the scalar triple product, is 0; and the other way round. For four points you use the three vectors leaving one of them. It is the same condition as linear dependence: determinant 0.'
        ),
        examplePrompt: say('Planokideak dira $(1,3,2)$, $(2,-1,4)$ eta $(4,5,8)$?', '¿Son coplanarios $(1,3,2)$, $(2,-1,4)$ y $(4,5,8)$?', 'هل $(1,3,2)$ و$(2,-1,4)$ و$(4,5,8)$ مستوية؟', 'Are $(1,3,2)$, $(2,-1,4)$ and $(4,5,8)$ coplanar?'),
        example: same('$-8+48+20+8-20-48=0$'),
        exampleAnswer: say('Bai: biderkadura mistoa 0 da. Izan ere, $(4,5,8)=2\\,(1,3,2)+(2,-1,4)$.', 'Sí: el producto mixto es 0. De hecho, $(4,5,8)=2\\,(1,3,2)+(2,-1,4)$.', 'نعم: الجداء المختلط 0. وفي الواقع $(4,5,8)=2\\,(1,3,2)+(2,-1,4)$.', 'Yes: the scalar triple product is 0. In fact, $(4,5,8)=2\\,(1,3,2)+(2,-1,4)$.')
    }
}

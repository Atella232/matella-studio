import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'
import type { Motions3TopicId } from './lessonChecks.ts'

/* ==========================================================================
   Mugimenduak · 3. DBH — what each lesson tells: the new words
   (definitions), the key words in four languages (vocabulary), a short
   explanation, its cases, the example as an exercise («Another example»)
   and, in three lessons, «Why does it work?» (the turning triangle, two
   mirrors, distances times k). Plain data so the tests can import it;
   lessons.tsx merges it into the topics. The explanations use the numbers
   of their drawings (|(4, 3)| = 5, (3, 2) → (7, 4) with the vector (4, 2),
   the flag turned 90°, three hexagons at a vertex); the example uses
   numbers of its own. No text command inside the formulas (the unit test
   forbids it). Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const motions3LessonTexts: Record<Motions3TopicId, LessonTexts> = {
    'vector-components': {
        definitions: [
            {
                term: say('Bektore finkoa', 'Vector fijo', 'المتجه الثابت', 'Fixed vector'),
                meaning: say('$A$ jatorritik $B$ muturreraino doan gezia.', 'Una flecha que va del origen $A$ al extremo $B$.', 'سهم يمتد من البداية $A$ إلى النهاية $B$.', 'An arrow from the start point $A$ to the end point $B$.')
            }
        ],
        vocabulary: [
            say('osagaiak', 'componentes', 'المركّبتان', 'components'),
            say('muturra', 'extremo', 'النهاية', 'end point'),
            say('baliokideak', 'equivalentes', 'متكافئان', 'equivalent')
        ],
        explanation: say(
            'Bektore baten osagaiak mutur ken jatorria dira: $\\vec{AB}=(x_{2}-x_{1},\\ y_{2}-y_{1})$. Lehenak esaten du zenbat mugitzen den eskuinera (edo ezkerrera, negatiboa bada), eta bigarrenak, zenbat igotzen edo jaisten den. Osagai berak dituzten bi bektore baliokideak dira.',
            'Las componentes de un vector son el extremo menos el origen: $\\vec{AB}=(x_{2}-x_{1},\\ y_{2}-y_{1})$. La primera dice cuánto se avanza a la derecha (o a la izquierda, si es negativa), y la segunda, cuánto se sube o se baja. Dos vectores con las mismas componentes son equivalentes.',
            'مركّبتا المتجه هما النهاية ناقص البداية: $\\vec{AB}=(x_{2}-x_{1},\\ y_{2}-y_{1})$. الأولى تقول كم نتقدم إلى اليمين (أو إلى اليسار إذا كانت سالبة)، والثانية كم نصعد أو ننزل. والمتجهان اللذان لهما المركّبتان نفسهما متكافئان.',
            'The components of a vector are the end point minus the start point: $\\vec{AB}=(x_{2}-x_{1},\\ y_{2}-y_{1})$. The first says how far you move right (or left, if negative), and the second, how far up or down. Two vectors with the same components are equivalent.'
        ),
        examplePrompt: say('$C=(-2,4)$ eta $D=(3,1)$. Aurkitu $\\vec{CD}$ eta $\\vec{DC}$.', '$C=(-2,4)$ y $D=(3,1)$. Halla $\\vec{CD}$ y $\\vec{DC}$.', '$C=(-2,4)$ و$D=(3,1)$. جد $\\vec{CD}$ و$\\vec{DC}$.', '$C=(-2,4)$ and $D=(3,1)$. Find $\\vec{CD}$ and $\\vec{DC}$.'),
        example: same('$\\vec{CD}=(3-(-2),\\ 1-4)=(5,-3)\\qquad\\vec{DC}=(-5,3)$'),
        exampleAnswer: say('$\\vec{CD}=(5,-3)$: 5 eskuinera eta 3 behera. $\\vec{DC}$ bektoreak aurkako osagaiak ditu.', '$\\vec{CD}=(5,-3)$: 5 a la derecha y 3 hacia abajo. $\\vec{DC}$ tiene las componentes opuestas.', '$\\vec{CD}=(5,-3)$: ‏5 إلى اليمين و3 إلى الأسفل. ومركّبتا $\\vec{DC}$ معاكستان.', '$\\vec{CD}=(5,-3)$: 5 to the right and 3 down. $\\vec{DC}$ has the opposite components.')
    },
    'vector-modulus': {
        definitions: [
            {
                term: say('Bektore baten modulua', 'Módulo de un vector', 'طول المتجه', 'Length of a vector'),
                meaning: say('Haren luzera: $\\vec{v}=(a,b)$ bada, $|\\vec{v}|=\\sqrt{a^{2}+b^{2}}$.', 'Su longitud: si $\\vec{v}=(a,b)$, $|\\vec{v}|=\\sqrt{a^{2}+b^{2}}$.', 'مقداره: إذا كان $\\vec{v}=(a,b)$ فإن $|\\vec{v}|=\\sqrt{a^{2}+b^{2}}$.', 'How long it is: if $\\vec{v}=(a,b)$, $|\\vec{v}|=\\sqrt{a^{2}+b^{2}}$.')
            }
        ],
        vocabulary: [
            say('katetoak', 'catetos', 'ضلعا', 'legs'),
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse'),
            say('karratuak', 'cuadrados', 'المربعات', 'squares')
        ],
        explanation: say(
            'Osagaiak triangelu zuzen baten katetoak dira, eta bektorea hipotenusa: horregatik ateratzen da modulua Pitagorasekin, $|(4,3)|=\\sqrt{16+9}=5$. Osagaiak negatiboak izan arren, haien karratuak positiboak dira: modulua ez da inoiz negatiboa.',
            'Las componentes son los catetos de un triángulo rectángulo y el vector es la hipotenusa: por eso el módulo sale con Pitágoras, $|(4,3)|=\\sqrt{16+9}=5$. Aunque las componentes sean negativas, sus cuadrados son positivos: el módulo nunca es negativo.',
            'المركّبتان ضلعا مثلث قائم والمتجه هو الوتر: لذلك نحسب الطول بفيثاغورس، $|(4,3)|=\\sqrt{16+9}=5$. وحتى لو كانت المركّبتان سالبتين فإن المربعات موجبة: الطول ليس سالبًا أبدًا.',
            'The components are the legs of a right triangle and the vector is the hypotenuse: that is why the length comes from Pythagoras, $|(4,3)|=\\sqrt{16+9}=5$. Even if the components are negative, their squares are positive: the length is never negative.'
        ),
        examplePrompt: say('Aurkitu $\\vec{w}=(-9,-12)$ bektorearen modulua.', 'Halla el módulo de $\\vec{w}=(-9,-12)$.', 'جد طول $\\vec{w}=(-9,-12)$.', 'Find the length of $\\vec{w}=(-9,-12)$.'),
        example: same('$|\\vec{w}|=\\sqrt{(-9)^{2}+(-12)^{2}}=\\sqrt{225}=15$'),
        exampleAnswer: say('15: karratuak positiboak dira.', '15: los cuadrados son positivos.', '15: المربعات موجبة.', '15: the squares are positive.')
    },
    'vector-sum': {
        vocabulary: [
            say('batura', 'suma', 'المجموع', 'sum'),
            say('jatorria', 'origen', 'البداية', 'start point'),
            say('muturra', 'extremo', 'نهاية', 'end point')
        ],
        explanation: say(
            'Bi bektore batzeko, batu osagaiak: $(a,b)+(c,d)=(a+c,\\ b+d)$. Marrazkian, jarri bigarrenaren jatorria lehenengoaren muturrean: batura lehenengoaren jatorritik bigarrenaren muturrera doa. Baturaren modulua ez da moduluen batura.',
            'Para sumar dos vectores, se suman las componentes: $(a,b)+(c,d)=(a+c,\\ b+d)$. En el dibujo, el origen del segundo se pone en el extremo del primero, y la suma va del origen del primero al extremo del segundo. El módulo de la suma no es la suma de los módulos.',
            'لجمع متجهين نجمع المركّبات: $(a,b)+(c,d)=(a+c,\\ b+d)$. وفي الرسم نضع بداية الثاني عند نهاية الأول، والمجموع يمتد من بداية الأول إلى نهاية الثاني. وطول المجموع ليس مجموع الطولين.',
            'To add two vectors, add the components: $(a,b)+(c,d)=(a+c,\\ b+d)$. In the drawing, the start of the second goes on the end of the first, and the sum goes from the start of the first to the end of the second. The length of the sum is not the sum of the lengths.'
        ),
        examplePrompt: say('Batu $\\vec{u}=(-2,5)$ eta $\\vec{v}=(6,-2)$.', 'Suma $\\vec{u}=(-2,5)$ y $\\vec{v}=(6,-2)$.', 'اجمع $\\vec{u}=(-2,5)$ و$\\vec{v}=(6,-2)$.', 'Add $\\vec{u}=(-2,5)$ and $\\vec{v}=(6,-2)$.'),
        example: same('$(-2+6,\\ 5+(-2))=(4,3)$'),
        exampleAnswer: say('$(4,3)$, 5 modulukoa.', '$(4,3)$, de módulo 5.', '$(4,3)$ وطوله 5.', '$(4,3)$, of length 5.')
    },
    translation: {
        definitions: [
            {
                term: say('Lekualdaketa', 'Traslación', 'الانسحاب', 'Translation'),
                meaning: say('Puntu guztiak bektore berarekin mugitzen dituen mugimendua.', 'Un movimiento que desplaza todos los puntos con el mismo vector.', 'حركة تنقل كل النقاط بالمتجه نفسه.', 'A movement that shifts every point by the same vector.')
            }
        ],
        vocabulary: [
            say('mugimendu zuzena', 'movimiento directo', 'حركة مباشرة', 'direct movement'),
            say('orientazioa', 'orientación', 'الاتجاه', 'orientation'),
            say('paraleloak', 'paralelos', 'متوازية', 'parallel')
        ],
        explanation: say(
            'Puntu guztiak distantzia berean mugitzen dira, norabide eta noranzko berean. Irudiak ez du forma, tamaina ezta orientazioa aldatzen: ez da biratzen ezta iraultzen, beraz mugimendu zuzena da. Irudiak eta haren irudiak alde paraleloak dituzte.',
            'Todos los puntos se mueven la misma distancia, en la misma dirección y sentido. La figura no cambia de forma, tamaño ni orientación: no gira ni se da la vuelta, así que es un movimiento directo. La figura y su imagen tienen los lados paralelos.',
            'تتحرك كل النقاط المسافة نفسها، في الاتجاه والمنحى نفسيهما. ولا يتغير شكل الصورة ولا حجمها ولا اتجاهها: لا تدور ولا تنقلب، فهي حركة مباشرة. وللشكل وصورته أضلاع متوازية.',
            'Every point moves the same distance, in the same direction and sense. The figure does not change shape, size or orientation: it neither turns nor flips, so it is a direct movement. The figure and its image have parallel sides.'
        ),
        examplePrompt: say('$A=(0,0)$, $B=(3,0)$, $C=(0,2)$ triangelua lekualdatzen da $\\vec{v}=(-1,4)$ bektorearekin. Non geratzen dira erpinak?', 'Se traslada el triángulo $A=(0,0)$, $B=(3,0)$, $C=(0,2)$ con $\\vec{v}=(-1,4)$. ¿Dónde quedan sus vértices?', 'يُنقل المثلث $A=(0,0)$ و$B=(3,0)$ و$C=(0,2)$ بالمتجه $\\vec{v}=(-1,4)$. أين تقع رؤوسه؟', 'The triangle $A=(0,0)$, $B=(3,0)$, $C=(0,2)$ is translated by $\\vec{v}=(-1,4)$. Where do its vertices go?'),
        example: same('$A^{\\prime}=(-1,4)\\qquad B^{\\prime}=(2,4)\\qquad C^{\\prime}=(-1,6)$'),
        exampleAnswer: say('Erpin bakoitza 1 ezkerrera eta 4 gora mugitzen da.', 'Cada vértice se mueve 1 a la izquierda y 4 hacia arriba.', 'يتحرك كل رأس 1 إلى اليسار و4 إلى الأعلى.', 'Each vertex moves 1 to the left and 4 up.')
    },
    'translation-coordinates': {
        vocabulary: [
            say('koordenatuak', 'coordenadas', 'الإحداثيات', 'coordinates'),
            say('erpinak', 'vértices', 'الرؤوس', 'vertices'),
            say('irudia', 'imagen', 'الصورة', 'image')
        ],
        explanation: say(
            '$\\vec{v}=(a,b)$ bektorearekiko lekualdaketak $(x,y)$ puntua $(x+a,\\ y+b)$ puntura eramaten du: $\\vec{v}=(4,2)$ bektorearekin, $(3,2)\\to(7,4)$. Alderantziz, bektorea irudia ken puntua da. Irudi bat lekualdatzeko, lekualdatu haren erpinak eta lotu berriro.',
            'La traslación de vector $\\vec{v}=(a,b)$ lleva $(x,y)$ a $(x+a,\\ y+b)$: con $\\vec{v}=(4,2)$, $(3,2)\\to(7,4)$. Al revés, el vector es la imagen menos el punto. Para trasladar una figura, traslada sus vértices y vuelve a unirlos.',
            'الانسحاب بالمتجه $\\vec{v}=(a,b)$ ينقل $(x,y)$ إلى $(x+a,\\ y+b)$: مع $\\vec{v}=(4,2)$ تصير $(3,2)\\to(7,4)$. وبالعكس، المتجه هو الصورة ناقص النقطة. ولنقل شكل انقل رؤوسه ثم صِلها من جديد.',
            'The translation by $\\vec{v}=(a,b)$ takes $(x,y)$ to $(x+a,\\ y+b)$: with $\\vec{v}=(4,2)$, $(3,2)\\to(7,4)$. The other way round, the vector is the image minus the point. To translate a figure, translate its vertices and join them again.'
        ),
        examplePrompt: say('$\\vec{v}=(-3,1)$ bektorearekin, nora doa $(2,-4)$? Zein puntu doa $(0,0)$ puntura?', 'Con $\\vec{v}=(-3,1)$, ¿adónde va $(2,-4)$? ¿Qué punto va a $(0,0)$?', 'مع $\\vec{v}=(-3,1)$ إلى أين تذهب $(2,-4)$؟ وأي نقطة تذهب إلى $(0,0)$؟', 'With $\\vec{v}=(-3,1)$, where does $(2,-4)$ go? Which point goes to $(0,0)$?'),
        example: same('$(2-3,\\ -4+1)=(-1,-3)\\qquad(0+3,\\ 0-1)=(3,-1)$'),
        exampleAnswer: say('$(2,-4)\\to(-1,-3)$, eta $(3,-1)\\to(0,0)$.', '$(2,-4)\\to(-1,-3)$, y $(3,-1)\\to(0,0)$.', '$(2,-4)\\to(-1,-3)$، و$(3,-1)\\to(0,0)$.', '$(2,-4)\\to(-1,-3)$, and $(3,-1)\\to(0,0)$.')
    },
    'translation-composition': {
        vocabulary: [
            say('aurkako bektorea', 'vector opuesto', 'المتجه المعاكس', 'opposite vector'),
            say('ordena', 'orden', 'الترتيب', 'order'),
            say('desegin', 'deshacer', 'نلغي', 'undo')
        ],
        explanation: say(
            '$\\vec{u}$ bektorearekin eta gero $\\vec{v}$ bektorearekin lekualdatzea $\\vec{u}+\\vec{v}$ bektorearekin behin lekualdatzea bezala da, eta ordenak ez du axola. Lekualdaketa bat desegiteko, aurkako bektorea erabiltzen da: $(a,b)$ bektorearena $(-a,-b)$ da.',
            'Trasladar con $\\vec{u}$ y después con $\\vec{v}$ es como trasladar una sola vez con $\\vec{u}+\\vec{v}$, y el orden no importa. Para deshacer una traslación se usa el vector opuesto: el de $(a,b)$ es $(-a,-b)$.',
            'الانسحاب بـ $\\vec{u}$ ثم بـ $\\vec{v}$ كالانسحاب مرة واحدة بـ $\\vec{u}+\\vec{v}$، والترتيب لا يهم. ولكي نلغي انسحابًا نستعمل المتجه المعاكس: معاكس $(a,b)$ هو $(-a,-b)$.',
            'Translating by $\\vec{u}$ and then by $\\vec{v}$ is like translating once by $\\vec{u}+\\vec{v}$, and the order does not matter. To undo a translation, use the opposite vector: that of $(a,b)$ is $(-a,-b)$.'
        ),
        examplePrompt: say('Irudi bat $(-4,2)$ bektorearekin lekualdatzen da, gero $(1,5)$ bektorearekin eta gero $(3,-7)$ bektorearekin. Non amaitzen du?', 'Se traslada con $(-4,2)$, después con $(1,5)$ y después con $(3,-7)$. ¿Dónde acaba la figura?', 'يُنقل شكل بـ $(-4,2)$ ثم بـ $(1,5)$ ثم بـ $(3,-7)$. أين ينتهي؟', 'A figure is translated by $(-4,2)$, then by $(1,5)$ and then by $(3,-7)$. Where does it end up?'),
        example: same('$(-4+1+3,\\ 2+5-7)=(0,0)$'),
        exampleAnswer: say('Leku berean: bektoreen batura $(0,0)$ da.', 'En el mismo sitio: la suma de los vectores es $(0,0)$.', 'في المكان نفسه: مجموع المتجهات $(0,0)$.', 'In the same place: the sum of the vectors is $(0,0)$.')
    },
    rotation: {
        definitions: [
            {
                term: say('Biraketa', 'Giro', 'الدوران', 'Rotation'),
                meaning: say('$O$ zentroko eta $\\alpha$ angeluko mugimendua: puntu bakoitzak $\\alpha$ angelua egiten du, $O$ zentroko zirkunferentzia batean.', 'El movimiento de centro $O$ y ángulo $\\alpha$: cada punto recorre el ángulo $\\alpha$ por una circunferencia de centro $O$.', 'حركة مركزها $O$ وزاويتها $\\alpha$: تقطع كل نقطة الزاوية $\\alpha$ على دائرة مركزها $O$.', 'The movement with centre $O$ and angle $\\alpha$: each point travels the angle $\\alpha$ along a circle with centre $O$.')
            }
        ],
        vocabulary: [
            say('zentroa', 'centro', 'المركز', 'centre'),
            say('angelua', 'ángulo', 'الزاوية', 'angle'),
            say('erlojuaren orratzak', 'agujas del reloj', 'عقارب الساعة', 'clockwise')
        ],
        explanation: say(
            'Puntu bakoitzak zentrotik distantzia bera mantentzen du. Angelu positiboak erlojuaren orratzen kontrako noranzkoan biratzen du. Zentroa da mugitzen ez den puntu bakarra. Irudiak forma eta tamaina mantentzen ditu: marrazkian, bandera $O$ puntuaren inguruan 90° biratua.',
            'Cada punto mantiene su distancia al centro. Un ángulo positivo gira en sentido contrario a las agujas del reloj. El centro es el único punto que no se mueve. La figura mantiene forma y tamaño: en el dibujo, la bandera girada 90° alrededor de $O$.',
            'تحافظ كل نقطة على بعدها عن المركز. والزاوية الموجبة تدور عكس اتجاه عقارب الساعة. والمركز هو النقطة الوحيدة التي لا تتحرك. ويحافظ الشكل على شكله وحجمه: في الرسم، العلم مدار 90° حول $O$.',
            'Each point keeps its distance from the centre. A positive angle turns anticlockwise, against the clockwise sense. The centre is the only point that does not move. The figure keeps its shape and size: in the drawing, the flag turned 90° about $O$.'
        ),
        examplePrompt: say('Noria batek 8 minututan bira oso bat ematen du. Zer angelu biratzen du 3 minututan?', 'Una noria da una vuelta en 8 minutos. ¿Qué ángulo gira en 3 minutos?', 'تدور عجلة دوّارة دورة كاملة في 8 دقائق. ما الزاوية التي تدورها في 3 دقائق؟', 'A big wheel turns once in 8 minutes. What angle does it turn in 3 minutes?'),
        example: same('$\\frac{360°}{8}\\cdot 3=135°$'),
        exampleAnswer: say('135°: minutu bakoitzean 45°.', '135°: cada minuto gira 45°.', '135°: ‏45° في كل دقيقة.', '135°: 45° each minute.')
    },
    'rotation-coordinates': {
        vocabulary: [
            say('koordenatuak', 'coordenadas', 'الإحداثيات', 'coordinates'),
            say('jatorria', 'origen', 'الأصل', 'origin'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Jatorriaren inguruan, 90°-ko biraketak koordenatuak trukatzen ditu eta lehenengoaren zeinua aldatzen du. Egiaztatu beti zentrorako distantzia ez dela aldatu.',
            'Alrededor del origen, el giro de 90° intercambia las coordenadas y le cambia el signo a la primera. Comprueba siempre que la distancia al centro no ha cambiado.',
            'حول الأصل يبادل الدوران بـ 90° الإحداثيين ويغيّر إشارة الأول. وتحقق دائمًا من أن البعد عن المركز لم يتغير.',
            'About the origin, a 90° rotation swaps the coordinates and changes the sign of the first one. Always check that the distance to the centre has not changed.'
        ),
        cases: [
            { title: same('$90°$'), text: say('Laurden bat', 'Un cuarto de vuelta', 'ربع دورة', 'A quarter turn'), math: same('$(x,y)\\to(-y,x)$') },
            { title: same('$180°$'), text: say('Erdia', 'Media vuelta', 'نصف دورة', 'Half a turn'), math: same('$(x,y)\\to(-x,-y)$') },
            { title: same('$270°$'), text: say('Hiru laurden', 'Tres cuartos de vuelta', 'ثلاثة أرباع دورة', 'Three quarters of a turn'), math: same('$(x,y)\\to(y,-x)$') }
        ],
        examplePrompt: say('Biratu $Q=(-5,2)$ puntua 90° eta 180°, jatorriaren inguruan.', 'Gira $Q=(-5,2)$ 90° y 180° alrededor del origen.', 'أدر $Q=(-5,2)$ بـ 90° وبـ 180° حول الأصل.', 'Rotate $Q=(-5,2)$ by 90° and by 180° about the origin.'),
        example: same('$(-5,2)\\xrightarrow{\\ 90°\\ }(-2,-5)\\qquad(-5,2)\\xrightarrow{\\ 180°\\ }(5,-2)$'),
        exampleAnswer: say('$(-2,-5)$ eta $(5,-2)$: jatorrirako distantzia $\\sqrt{29}$ da oraindik.', '$(-2,-5)$ y $(5,-2)$: la distancia al origen sigue siendo $\\sqrt{29}$.', '$(-2,-5)$ و$(5,-2)$: البعد عن الأصل ما زال $\\sqrt{29}$.', '$(-2,-5)$ and $(5,-2)$: the distance to the origin is still $\\sqrt{29}$.'),
        why: {
            text: say(
                'Biratzean, puntuaren eta jatorriaren arteko triangeluak puntuarekin batera biratzen du: kateto horizontala bertikal bihurtzen da, eta bertikala horizontal, ezkerrera. Horregatik trukatzen dira koordenatuak eta aldatzen da zeinu bat.',
                'Al girar, el triángulo entre el punto y el origen gira con el punto: el cateto horizontal pasa a ser vertical, y el vertical, horizontal hacia la izquierda. Por eso se intercambian las coordenadas y cambia un signo.',
                'عند الدوران يدور المثلث بين النقطة والأصل مع النقطة: يصير الضلع القائم الأفقي عموديًا، والعمودي أفقيًا نحو اليسار. لذلك يتبادل الإحداثيان وتتغير إشارة.',
                'When it turns, the triangle between the point and the origin turns with it: the horizontal leg becomes vertical, and the vertical one horizontal, pointing left. That is why the coordinates swap and one sign changes.'
            ),
            math: same('$(1,0)\\to(0,1)\\qquad(0,1)\\to(-1,0)$')
        }
    },
    'central-symmetry': {
        definitions: [
            {
                term: say('Errosetoia', 'Rosetón', 'الوردة الزخرفية', 'Rosette'),
                meaning: say('Bere zentroaren inguruan biratzean bere buruarekin bat datorren irudia.', 'Una figura que coincide consigo misma al girarla alrededor de su centro.', 'شكل ينطبق على نفسه عند تدويره حول مركزه.', 'A figure that matches itself when turned about its centre.')
            }
        ],
        vocabulary: [
            say('erdiko puntua', 'punto medio', 'المنتصف', 'midpoint'),
            say('ordena', 'orden', 'رتبة', 'order'),
            say('karratua', 'cuadrado', 'المربع', 'square')
        ],
        explanation: say(
            '$O$ zentroko simetria zentralak puntu bakoitza $O$ puntutik beste aldera eramaten du, distantzia berera: $O$ da $P$ eta $P^{\\prime}$ arteko erdiko puntua. 180°-ko biraketa bat da. Irudi batek $n$ ordenako biraketa-simetria du $\\frac{360°}{n}$ biratzean bat badator: karratuak, 4 ordenakoa.',
            'La simetría central de centro $O$ lleva cada punto al otro lado de $O$: $O$ es el punto medio de $P$ y $P^{\\prime}$. Es un giro de 180°. Una figura tiene simetría de giro de orden $n$ si coincide consigo misma al girar $\\frac{360°}{n}$: el cuadrado, orden 4.',
            'التناظر المركزي حول $O$ ينقل كل نقطة إلى الجهة الأخرى من $O$ على البعد نفسه: $O$ منتصف $P$ و$P^{\\prime}$. إنه دوران بـ 180°. وللشكل تناظر دوراني من الرتبة $n$ إذا انطبق على نفسه عند الدوران $\\frac{360°}{n}$: المربع من الرتبة 4.',
            'The central symmetry with centre $O$ takes each point to the other side of $O$, the same distance away: $O$ is the midpoint of $P$ and $P^{\\prime}$. It is a rotation by 180°. A figure has rotational symmetry of order $n$ if it matches itself after turning $\\frac{360°}{n}$: the square, order 4.'
        ),
        examplePrompt: say('Zein da $(-3,2)$ puntuaren simetrikoa jatorriarekiko?', '¿Cuál es el simétrico de $(-3,2)$ respecto al origen?', 'ما نظير $(-3,2)$ بالنسبة إلى الأصل؟', 'What is the image of $(-3,2)$ in the origin?'),
        example: same('$(-3,2)\\to(3,-2)$'),
        exampleAnswer: say('$(3,-2)$: bi koordenatuek zeinua aldatzen dute, 180°-ko biraketan bezala.', '$(3,-2)$: las dos coordenadas cambian de signo, como en un giro de 180°.', '$(3,-2)$: يغيّر الإحداثيان إشارتيهما، كما في الدوران بـ 180°.', '$(3,-2)$: both coordinates change sign, as in a 180° rotation.')
    },
    'axial-symmetry': {
        definitions: [
            {
                term: say('Simetria-ardatza', 'Eje de simetría', 'محور التناظر', 'Line of symmetry'),
                meaning: say('Irudi bat islatzean bat datozen bi erditan banatzen duen zuzena.', 'Una recta que divide una figura en dos mitades que coinciden al reflejarlas.', 'مستقيم يقسم الشكل إلى نصفين ينطبقان عند الانعكاس.', 'A line that splits a figure into two halves that match when reflected.')
            }
        ],
        vocabulary: [
            say('ispilua', 'espejo', 'المرآة', 'mirror'),
            say('mugimendu alderantzizkoa', 'movimiento inverso', 'حركة عكسية', 'opposite movement'),
            say('erdibitzailea', 'mediatriz', 'المنصّف العمودي', 'perpendicular bisector')
        ],
        explanation: say(
            '$e$ ardatzarekiko simetriak puntu bakoitza ardatzaren beste aldera eramaten du, distantzia berera: ardatza $PP^{\\prime}$ zuzenki-zatiaren erdibitzailea da. Ispilu bat bezala da: irudiak forma eta tamaina mantentzen ditu, baina iraulita geratzen da, mugimendu alderantzizkoa. $n$ aldeko poligono erregular batek $n$ ardatz ditu.',
            'La simetría de eje $e$ lleva cada punto al otro lado del eje: el eje es la mediatriz de $PP^{\\prime}$. Es como un espejo: la figura conserva forma y tamaño, pero queda dada la vuelta, un movimiento inverso. Un polígono regular de $n$ lados tiene $n$ ejes de simetría.',
            'التناظر بالنسبة إلى المحور $e$ ينقل كل نقطة إلى الجهة الأخرى من المحور على البعد نفسه: المحور هو المنصّف العمودي لـ $PP^{\\prime}$. إنه كالمرآة: يحافظ الشكل على شكله وحجمه لكنه ينقلب، فهي حركة عكسية. وللمضلع المنتظم الذي له $n$ ضلعًا $n$ محور تناظر.',
            'The reflection in the axis $e$ takes each point to the other side of the axis, the same distance away: the axis is the perpendicular bisector of $PP^{\\prime}$. It is like a mirror: the figure keeps its shape and size, but it is flipped over, an opposite movement. A regular polygon with $n$ sides has $n$ lines of symmetry.'
        ),
        examplePrompt: say('Ardatza $y=1$ zuzena da. Non geratzen da $(2,4)$?', 'El eje es la recta $y=1$. ¿Dónde queda $(2,4)$?', 'المحور هو المستقيم $y=1$. أين تقع صورة $(2,4)$؟', 'The axis is the line $y=1$. Where does $(2,4)$ go?'),
        example: same('$(2,4)\\xrightarrow{\\ y=1\\ }(2,-2)$'),
        exampleAnswer: say('$(2,-2)$: ardatzaren gainetik 3 unitatera zegoen, eta azpitik 3 unitatera geratzen da.', '$(2,-2)$: estaba 3 unidades por encima del eje, y queda 3 por debajo.', '$(2,-2)$: كانت فوق المحور بـ 3 وحدات فصارت تحته بـ 3.', '$(2,-2)$: it was 3 units above the axis, and ends up 3 below.')
    },
    'reflection-coordinates': {
        vocabulary: [
            say('X ardatza', 'eje X', 'محور X', 'X axis'),
            say('Y ardatza', 'eje Y', 'محور Y', 'Y axis'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Ardatz bakoitzak koordenatuetan gauza bat aldatzen du. $x=k$ ardatz bertikal batekiko, $(x,y)$ puntua $(2k-x,\\ y)$ puntura doa.',
            'Cada eje cambia una cosa distinta de las coordenadas. Respecto a un eje vertical $x=k$, el punto $(x,y)$ va a $(2k-x,\\ y)$.',
            'كل محور يغيّر شيئًا مختلفًا في الإحداثيات. وبالنسبة إلى محور عمودي $x=k$ تذهب النقطة $(x,y)$ إلى $(2k-x,\\ y)$.',
            'Each axis changes a different thing in the coordinates. In a vertical axis $x=k$, the point $(x,y)$ goes to $(2k-x,\\ y)$.'
        ),
        cases: [
            { title: say('X ardatza', 'Eje X', 'محور X', 'X axis'), text: say('$y$ koordenatua aldatzen da.', 'Cambia la $y$.', 'يتغيّر $y$.', 'The $y$ changes.'), math: same('$(x,y)\\to(x,-y)$') },
            { title: say('Y ardatza', 'Eje Y', 'محور Y', 'Y axis'), text: say('$x$ koordenatua aldatzen da.', 'Cambia la $x$.', 'يتغيّر $x$.', 'The $x$ changes.'), math: same('$(x,y)\\to(-x,y)$') },
            { title: same('$y=x$'), text: say('Trukatu egiten dira.', 'Se intercambian.', 'يتبادلان.', 'They swap.'), math: same('$(x,y)\\to(y,x)$') }
        ],
        examplePrompt: say('Aurkitu $(-2,7)$ puntuaren simetrikoa Y ardatzarekiko eta $x=1$ zuzenarekiko.', 'Halla el simétrico de $(-2,7)$ respecto al eje Y y respecto a la recta $x=1$.', 'جد نظير $(-2,7)$ بالنسبة إلى محور Y وبالنسبة إلى المستقيم $x=1$.', 'Find the image of $(-2,7)$ in the Y axis and in the line $x=1$.'),
        example: same('$(-2,7)\\to(2,7)\\qquad(-2,7)\\xrightarrow{\\ x=1\\ }(4,7)$'),
        exampleAnswer: say('$(2,7)$ eta $(4,7)$: $2\\cdot 1-(-2)=4$.', '$(2,7)$ y $(4,7)$: $2\\cdot 1-(-2)=4$.', '$(2,7)$ و$(4,7)$: ‏$2\\cdot 1-(-2)=4$.', '$(2,7)$ and $(4,7)$: $2\\cdot 1-(-2)=4$.')
    },
    'two-mirrors': {
        vocabulary: [
            say('ardatz paraleloak', 'ejes paralelos', 'محوران متوازيان', 'parallel axes'),
            say('bikoitza', 'doble', 'ضعف', 'twice'),
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'crossing point')
        ],
        explanation: say(
            'Bi aldiz islatzean, irudia berriro zuzen geratzen da. Ardatz paraleloekin, emaitza lekualdaketa bat da, ardatzen arteko distantziaren bikoitza; elkar ebakitzen duten ardatzekin, ebaki-puntuaren inguruko biraketa bat, haien arteko angeluaren bikoitza.',
            'Al reflejar dos veces, la figura vuelve a quedar del derecho. Con ejes paralelos, el resultado es una traslación del doble de la distancia entre los ejes; con ejes que se cortan, un giro alrededor del punto de corte del doble del ángulo entre ellos.',
            'عند الانعكاس مرتين يعود الشكل إلى وضعه الصحيح. ومع محورين متوازيين تكون النتيجة انسحابًا بضعف المسافة بينهما، ومع محورين متقاطعين دورانًا حول نقطة التقاطع بضعف الزاوية بينهما.',
            'Reflecting twice, the figure is the right way round again. With parallel axes, the result is a translation by twice the distance between them; with axes that cross, a rotation about the crossing point by twice the angle between them.'
        ),
        cases: [
            { title: say('Ardatz paraleloak', 'Ejes paralelos', 'محوران متوازيان', 'Parallel axes'), text: say('Lekualdaketa: $2d$.', 'Traslación: $2d$.', 'انسحاب: $2d$.', 'Translation: $2d$.') },
            { title: say('Ardatz ebakitzaileak', 'Ejes que se cortan', 'محوران متقاطعان', 'Crossing axes'), text: say('Biraketa: $2\\alpha$.', 'Giro: $2\\alpha$.', 'دوران: $2\\alpha$.', 'Rotation: $2\\alpha$.') }
        ],
        examplePrompt: say('Bi ardatzek 30°-ko angelua osatzen dute. Zer mugimendu ematen dute bi simetriek jarraian?', 'Dos ejes se cortan formando 30°. ¿Qué movimiento dan las dos simetrías seguidas?', 'يتقاطع محوران بزاوية 30°. ما الحركة الناتجة عن التناظرين المتتاليين؟', 'Two axes cross at 30°. What movement do the two reflections in a row give?'),
        example: same('$2\\cdot 30°=60°$'),
        exampleAnswer: say('60°-ko biraketa bat, ebaki-puntuaren inguruan.', 'Un giro de 60° alrededor del punto de corte.', 'دوران بـ 60° حول نقطة التقاطع.', 'A 60° rotation about the crossing point.'),
        why: {
            text: say(
                '$x=0$ eta $x=3$ ispiluekin, $(1,0)$ puntua $(-1,0)$ puntura doa eta gero $(7,0)$ puntura: 6 unitate mugitu da, 3 zenbakiaren bikoitza. Ispilu bakoitzak distantzia bat gehitzen du alde batetik eta bestetik.',
                'Con espejos en $x=0$ y $x=3$, el punto $(1,0)$ va a $(-1,0)$ y después a $(7,0)$: se ha movido 6, el doble de 3. Cada espejo suma una distancia por un lado y por otro.',
                'مع مرآتين عند $x=0$ و$x=3$ تذهب النقطة $(1,0)$ إلى $(-1,0)$ ثم إلى $(7,0)$: تحركت 6، أي ضعف 3. فكل مرآة تضيف مسافة من جهة ومن أخرى.',
                'With mirrors at $x=0$ and $x=3$, the point $(1,0)$ goes to $(-1,0)$ and then to $(7,0)$: it has moved 6, twice 3. Each mirror adds a distance on one side and on the other.'
            ),
            math: same('$7-1=6=2\\cdot 3$')
        }
    },
    friezes: {
        definitions: [
            {
                term: say('Frisoa', 'Friso', 'الإفريز', 'Frieze'),
                meaning: say('Norabide batean, lekualdaketa berarekin, behin eta berriz errepikatzen den motiboa.', 'Un motivo repetido una y otra vez en una dirección con la misma traslación.', 'نقش يتكرر مرة بعد مرة في اتجاه واحد بالانسحاب نفسه.', 'A motif repeated again and again in one direction with the same translation.')
            }
        ],
        vocabulary: [
            say('motiboa', 'motivo', 'النقش', 'motif'),
            say('jauziak', 'saltos', 'قفزات', 'jumps'),
            say('zabalera', 'ancho', 'عرض', 'width')
        ],
        explanation: say(
            'Motiboak simetria bat ere izan dezake, edo 180°-ko biraketa bat. Lekualdaketaren bektorea motibo batetik hurrengorako distantzia da: $n$ motibok $n-1$ jauzi gehi motibo baten zabalera hartzen dute.',
            'El motivo puede tener además una simetría o un giro de 180°. El vector de la traslación es la distancia de un motivo al siguiente: $n$ motivos ocupan $n-1$ saltos más el ancho de un motivo.',
            'قد يكون للنقش أيضًا تناظر أو دوران بـ 180°. ومتجه الانسحاب هو المسافة من نقش إلى الذي يليه: $n$ نقشًا تشغل $n-1$ قفزة زائد عرض نقش واحد.',
            'The motif may also have a symmetry or a 180° rotation. The vector of the translation is the distance from one motif to the next: $n$ motifs take up $n-1$ jumps plus the width of one motif.'
        ),
        examplePrompt: say('Friso batek 4 cm-ko motiboak ditu, 6 cm-tik behin. Zenbat neurtzen du 10 motiborekin?', 'Un friso tiene motivos de 4 cm, uno cada 6 cm. ¿Cuánto mide con 10 motivos?', 'إفريز نقوشه بعرض 4 سم، واحد كل 6 سم. كم طوله مع 10 نقوش؟', 'A frieze has 4 cm motifs, one every 6 cm. How long is it with 10 motifs?'),
        example: same('$9\\cdot 6+4=58$'),
        exampleAnswer: say('58 cm: 6 cm-ko 9 jauzi eta azken motiboa.', '58 cm: 9 saltos de 6 cm y el último motivo.', '58 سم: ‏9 قفزات بطول 6 سم والنقش الأخير.', '58 cm: 9 jumps of 6 cm and the last motif.')
    },
    tessellations: {
        definitions: [
            {
                term: say('Mosaikoa', 'Mosaico', 'التبليط', 'Tessellation'),
                meaning: say('Planoa irudiz estaltzea, hutsunerik eta gainjartzerik gabe.', 'Un recubrimiento del plano con figuras, sin huecos ni solapamientos.', 'تغطية المستوى بأشكال دون فراغات أو تداخل.', 'Covering the plane with shapes, with no gaps and no overlaps.')
            }
        ],
        vocabulary: [
            say('erpina', 'vértice', 'رأس', 'vertex'),
            say('barne-angelua', 'ángulo interior', 'الزاوية الداخلية', 'interior angle'),
            say('hexagonoak', 'hexágonos', 'مسدسات', 'hexagons')
        ],
        explanation: say(
            'Erpin batean elkartzen diren angeluek 360° batu behar dute. Poligono erregular bakarrarekin, haren barne-angeluak 360° zatitu behar du: triangeluek (60°-ko 6), karratuek (90°-ko 4) eta hexagonoek (120°-ko 3) bai; pentagonoek ez.',
            'Los ángulos que se juntan en un vértice tienen que sumar 360°. Con un solo polígono regular, su ángulo interior tiene que dividir a 360°: triángulos (6 de 60°), cuadrados (4 de 90°) y hexágonos (3 de 120°) sí; pentágonos no.',
            'يجب أن يكون مجموع الزوايا الملتقية في رأس 360°. ومع مضلع منتظم واحد يجب أن تقسم زاويته الداخلية 360°: المثلثات (6 من 60°) والمربعات (4 من 90°) والمسدسات (3 من 120°) نعم، والمخمسات لا.',
            'The angles that meet at a vertex must add up to 360°. With a single regular polygon, its interior angle must divide 360°: triangles (6 of 60°), squares (4 of 90°) and hexagons (3 of 120°) do; pentagons do not.'
        ),
        examplePrompt: say('Planoa estaltzen dute dodekagono erregularrek, 150°-ko angeluarekin?', '¿Cubren el plano los dodecágonos regulares, de ángulo 150°?', 'هل تغطي المضلعات المنتظمة ذات 12 ضلعًا وزاوية 150° المستوى؟', 'Do regular dodecagons, with angles of 150°, tile the plane?'),
        example: same('$2\\cdot 150°=300°\\qquad 3\\cdot 150°=450°$'),
        exampleAnswer: say('Ez: birekin hutsune bat geratzen da, eta hirurekin gainjarri egiten dira.', 'No: con 2 queda un hueco y con 3 se solapan.', 'لا: مع اثنين يبقى فراغ، ومع ثلاثة تتداخل.', 'No: with 2 there is a gap and with 3 they overlap.')
    },
    homothety: {
        definitions: [
            {
                term: say('Homotezia', 'Homotecia', 'التحاكي', 'Enlargement'),
                meaning: say('$O$ zentroko eta $k$ arrazoiko transformazioa: puntu bakoitza $k$ aldiz urrunago eramaten du $O$ puntutik, zuzen beretik.', 'La transformación de centro $O$ y razón $k$ que lleva cada punto $k$ veces más lejos de $O$, por la misma recta.', 'تحويل مركزه $O$ ونسبته $k$ ينقل كل نقطة أبعد عن $O$ بـ $k$ مرة على المستقيم نفسه.', 'The transformation with centre $O$ and ratio $k$ that takes each point $k$ times as far from $O$, along the same line.')
            }
        ],
        vocabulary: [
            say('zentroa', 'centro', 'المركز', 'centre'),
            say('arrazoia', 'razón', 'النسبة', 'ratio'),
            say('antzekoa', 'semejante', 'مشابهًا', 'similar')
        ],
        explanation: say(
            'Zentroa jatorria bada, $(x,y)\\to(kx,\\ ky)$. $k>1$ bada, handitu egiten du; $0<k<1$ bada, txikitu; eta $k$ negatiboa bada, irudia zentroaren beste aldera eramaten du. Ez da mugimendu bat: tamaina aldatzen du, baina irudia antzekoa geratzen da.',
            'Si el centro es el origen, $(x,y)\\to(kx,\\ ky)$. Si $k>1$, amplía; si $0<k<1$, reduce; y si $k$ es negativa, lleva la figura al otro lado del centro. No es un movimiento: cambia el tamaño, pero la figura queda semejante.',
            'إذا كان المركز هو الأصل فإن $(x,y)\\to(kx,\\ ky)$. وإذا كان $k>1$ يكبّر، وإذا $0<k<1$ يصغّر، وإذا كان $k$ سالبًا ينقل الشكل إلى الجهة الأخرى من المركز. وليس حركة: يغيّر الحجم لكن الشكل يبقى مشابهًا.',
            'If the centre is the origin, $(x,y)\\to(kx,\\ ky)$. If $k>1$, it enlarges; if $0<k<1$, it shrinks; and if $k$ is negative, it takes the figure to the other side of the centre. It is not a movement: it changes the size, but the figure stays similar.'
        ),
        examplePrompt: say('Aplikatu jatorri-zentroko eta $k=-2$ arrazoiko homotezia $(3,-1)$ puntuari.', 'Aplica la homotecia de centro el origen y $k=-2$ al punto $(3,-1)$.', 'طبّق التحاكي الذي مركزه الأصل و$k=-2$ على النقطة $(3,-1)$.', 'Apply the enlargement with centre the origin and $k=-2$ to the point $(3,-1)$.'),
        example: same('$(3,-1)\\xrightarrow{\\ k=-2\\ }(-6,2)$'),
        exampleAnswer: say('$(-6,2)$: bi aldiz urrunago, eta jatorriaren beste aldean.', '$(-6,2)$: el doble de lejos y al otro lado del origen.', '$(-6,2)$: أبعد بمرتين وفي الجهة الأخرى من الأصل.', '$(-6,2)$: twice as far and on the other side of the origin.'),
        why: {
            text: say(
                'Homoteziak distantzia guztiak $|k|$ zenbakiaz biderkatzen ditu: alde guztiak proportzionalak dira, eta angeluak ez dira aldatzen. Horregatik da irudia antzekoa, baina ez berdina.',
                'La homotecia multiplica todas las distancias por $|k|$: todos los lados quedan proporcionales y los ángulos no cambian. Por eso la figura es semejante, pero no igual.',
                'يضرب التحاكي كل المسافات في $|k|$: فتبقى كل الأضلاع متناسبة ولا تتغير الزوايا. لذلك يكون الشكل مشابهًا لكن غير مطابق.',
                'An enlargement multiplies every distance by $|k|$: all the sides stay proportional and the angles do not change. That is why the figure is similar, but not equal.'
            )
        }
    }
}

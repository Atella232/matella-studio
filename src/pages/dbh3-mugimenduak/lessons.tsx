import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { HomothetyFigure } from '../dbh4-aplikatuak-antzekotasuna/figures'
import { MotionFigure } from './figures'
import { say, same } from './text'

/* ==========================================================================
   Planoko mugimenduak · 3. DBH — stages and lessons, following Santillana
   3.º ESO unit 9 «Movimientos en el plano» (vectors, translations,
   rotations, symmetries, homotheties) and Anaya 3.º ESO unit 12
   «Transformaciones geométricas» (movements, composition, friezes,
   rosettes and tessellations). Every number and context is original: the
   books only fix the scope and the order. Each lesson names its typical
   mistake.
   ========================================================================== */

export type Motions3StageId = 'vectors' | 'translations' | 'rotations' | 'reflections' | 'patterns'

export const motions3Stages: UnitStage[] = [
    { id: 'vectors', tone: 'blue', title: { eu: 'Bektoreak', es: 'Vectores', en: 'Vectors', ar: 'المتجهات' } },
    { id: 'translations', tone: 'violet', title: { eu: 'Lekualdaketak', es: 'Traslaciones', en: 'Translations', ar: 'الانسحابات' } },
    { id: 'rotations', tone: 'mustard', title: { eu: 'Biraketak', es: 'Giros', en: 'Rotations', ar: 'الدورانات' } },
    { id: 'reflections', tone: 'coral', title: { eu: 'Simetriak', es: 'Simetrías', en: 'Reflections', ar: 'التناظرات' } },
    { id: 'patterns', tone: 'green', title: { eu: 'Frisoak eta mosaikoak', es: 'Frisos y mosaicos', en: 'Friezes and tilings', ar: 'الأفاريز والتبليطات' } }
]

export const motions3Topics: UnitTopic[] = [
    /* ---------- 1. Vectors ---------- */
    {
        id: 'vector-components',
        stage: 'vectors',
        title: say('Bektoreak eta haien osagaiak', 'Vectores y sus componentes', 'المتجهات ومركّباتها', 'Vectors and their components'),
        goal: say('Bektore baten osagaiak bi puntutatik kalkulatzea.', 'Calcular las componentes de un vector a partir de dos puntos.', 'حساب مركّبتي متجه انطلاقًا من نقطتين.', 'Work out the components of a vector from two points.'),
        explanation: say(
            'Bektore finko bat gezi bat da: $A$ jatorritik $B$ muturreraino doa. Haren osagaiak mutur ken jatorria dira: $\\vec{AB}=(x_{2}-x_{1},\\ y_{2}-y_{1})$. Lehen osagaiak esaten du zenbat mugitzen den eskuinera (edo ezkerrera, negatiboa bada), eta bigarrenak zenbat gora (edo behera). Osagai berak dituzten bi bektore baliokideak dira: luzera, norabide eta noranzko bera dute.',
            'Un vector fijo es una flecha: va del origen $A$ al extremo $B$. Sus componentes son el extremo menos el origen: $\\vec{AB}=(x_{2}-x_{1},\\ y_{2}-y_{1})$. La primera componente dice cuánto se avanza a la derecha (o a la izquierda, si es negativa), y la segunda cuánto se sube (o se baja). Dos vectores con las mismas componentes son equivalentes: tienen la misma longitud, dirección y sentido.',
            'المتجه الثابت سهم: يمتد من البداية $A$ إلى النهاية $B$. ومركّبتاه النهاية ناقص البداية: $\\vec{AB}=(x_{2}-x_{1},\\ y_{2}-y_{1})$. تقول المركّبة الأولى كم نتقدم يمينًا (أو يسارًا إن كانت سالبة)، والثانية كم نصعد (أو ننزل). والمتجهان اللذان لهما المركّبتان نفساهما متكافئان: لهما الطول والاتجاه والمنحى أنفسها.',
            'A fixed vector is an arrow: it goes from the start $A$ to the end $B$. Its components are the end minus the start: $\\vec{AB}=(x_{2}-x_{1},\\ y_{2}-y_{1})$. The first component says how far to move right (or left, if negative), and the second how far up (or down). Two vectors with the same components are equivalent: same length, direction and sense.'
        ),
        problem: say('$A=(1,1)$ eta $B=(5,4)$. Zeintzuk dira $\\vec{AB}$ bektorearen osagaiak?', '$A=(1,1)$ y $B=(5,4)$. ¿Cuáles son las componentes de $\\vec{AB}$?', '$A=(1,1)$ و$B=(5,4)$. ما مركّبتا $\\vec{AB}$؟', '$A=(1,1)$ and $B=(5,4)$. What are the components of $\\vec{AB}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturra ken jatorria.', 'Extremo menos origen.', 'النهاية ناقص البداية.', 'End minus start.'), math: same('$(5-1,\\ 4-1)$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: same('$\\vec{AB}=(4,3)$') }
        ],
        example: same('$\\vec{BA}=(-4,-3)$'),
        mistake: {
            wrong: say('$\\vec{AB}$ = jatorria ken muturra: $(1-5,\\ 1-4)$.', '$\\vec{AB}$ = origen menos extremo: $(1-5,\\ 1-4)$.', '$\\vec{AB}$ = البداية ناقص النهاية: $(1-5,\\ 1-4)$.', '$\\vec{AB}$ = start minus end: $(1-5,\\ 1-4)$.'),
            right: say('Hori $\\vec{BA}$ da, aurkako noranzkoan. $\\vec{AB}$: muturra ken jatorria, $(4,3)$.', 'Eso es $\\vec{BA}$, en sentido contrario. $\\vec{AB}$: extremo menos origen, $(4,3)$.', 'هذا $\\vec{BA}$ بالمنحى المعاكس. $\\vec{AB}$: النهاية ناقص البداية، $(4,3)$.', 'That is $\\vec{BA}$, the opposite way. $\\vec{AB}$: end minus start, $(4,3)$.')
        },
        takeaway: same('$\\vec{AB}=(X_{2}-X_{1},\\ Y_{2}-Y_{1})$'),
        figure: (language) => <MotionFigure language={language} kind="components" />
    },
    {
        id: 'vector-modulus',
        stage: 'vectors',
        title: say('Bektore baten modulua', 'El módulo de un vector', 'طول المتجه', 'The length of a vector'),
        goal: say('Bektore baten luzera Pitagorasekin kalkulatzea.', 'Calcular la longitud de un vector con Pitágoras.', 'حساب طول متجه بفيثاغورس.', 'Work out the length of a vector with Pythagoras.'),
        explanation: say(
            'Modulua bektorearen luzera da. Osagaiak triangelu zuzen baten katetoak dira, eta bektorea hipotenusa: $|\\vec{v}|=\\sqrt{a^{2}+b^{2}}$. Osagaiak negatiboak izan arren, karratuak positiboak dira, eta modulua beti positiboa. Lekualdaketa batean, puntu guztiak modulu horren distantzia mugitzen dira.',
            'El módulo es la longitud del vector. Las componentes son los catetos de un triángulo rectángulo y el vector es la hipotenusa: $|\\vec{v}|=\\sqrt{a^{2}+b^{2}}$. Aunque las componentes sean negativas, los cuadrados son positivos, y el módulo siempre es positivo. En una traslación, todos los puntos se mueven esa distancia.',
            'طول المتجه هو مقياسه. المركّبتان ضلعا مثلث قائم والمتجه هو الوتر: $|\\vec{v}|=\\sqrt{a^{2}+b^{2}}$. وحتى لو كانت المركّبتان سالبتين فالمربعان موجبان، والطول موجب دائمًا. وفي الانسحاب تتحرك كل النقاط هذه المسافة.',
            'The length (modulus) of a vector: the components are the legs of a right triangle and the vector is the hypotenuse: $|\\vec{v}|=\\sqrt{a^{2}+b^{2}}$. Even if the components are negative, the squares are positive, and the length is always positive. In a translation, every point moves that distance.'
        ),
        problem: say('Zein da $\\vec{v}=(-6,8)$ bektorearen modulua?', '¿Cuál es el módulo de $\\vec{v}=(-6,8)$?', 'ما طول $\\vec{v}=(-6,8)$؟', 'What is the length of $\\vec{v}=(-6,8)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Karratuak.', 'Los cuadrados.', 'المربعان.', 'The squares.'), math: same('$(-6)^{2}+8^{2}=36+64=100$') },
            { text: say('Erroa.', 'La raíz.', 'الجذر.', 'The root.'), math: same('$\\sqrt{100}=10$') }
        ],
        example: same('$|(5,12)|=\\sqrt{169}=13$'),
        mistake: {
            wrong: say('$|(-6,8)|=-6+8=2$', '$|(-6,8)|=-6+8=2$', '$|(-6,8)|=-6+8=2$', '$|(-6,8)|=-6+8=2$'),
            right: say('Osagaiak ez dira batzen: haien karratuak batu eta erroa atera, $\\sqrt{36+64}=10$.', 'Las componentes no se suman: se suman sus cuadrados y se saca la raíz, $\\sqrt{36+64}=10$.', 'لا تُجمع المركّبتان: نجمع مربعيهما ونأخذ الجذر، $\\sqrt{36+64}=10$.', 'The components are not added: add their squares and take the root, $\\sqrt{36+64}=10$.')
        },
        takeaway: same('$|\\vec{V}|=\\sqrt{A^{2}+B^{2}}$'),
        figure: (language) => <MotionFigure language={language} kind="components" />
    },
    {
        id: 'vector-sum',
        stage: 'vectors',
        title: say('Bektoreen batura', 'Suma de vectores', 'جمع المتجهات', 'Adding vectors'),
        goal: say('Bi bektore osagaiz osagai eta grafikoki batzea.', 'Sumar dos vectores componente a componente y gráficamente.', 'جمع متجهين مركّبة بمركّبة وبيانيًا.', 'Add two vectors component by component and on a drawing.'),
        explanation: say(
            'Bi bektore batzeko, batu osagaiak: $(a,b)+(c,d)=(a+c,\\ b+d)$. Grafikoki, jarri bigarrenaren jatorria lehenengoaren muturrean: batura lehenengoaren jatorritik bigarrenaren muturrera doan bektorea da. Baturaren modulua ez da moduluen batura: bide zuzenetik joatea laburragoa da.',
            'Para sumar dos vectores, se suman las componentes: $(a,b)+(c,d)=(a+c,\\ b+d)$. Gráficamente, se pone el origen del segundo en el extremo del primero: la suma es el vector que va del origen del primero al extremo del segundo. El módulo de la suma no es la suma de los módulos: ir en línea recta es más corto.',
            'لجمع متجهين نجمع المركّبات: $(a,b)+(c,d)=(a+c,\\ b+d)$. وبيانيًا نضع بداية الثاني عند نهاية الأول: المجموع هو المتجه من بداية الأول إلى نهاية الثاني. وطول المجموع ليس مجموع الطولين: الذهاب في خط مستقيم أقصر.',
            'To add two vectors, add the components: $(a,b)+(c,d)=(a+c,\\ b+d)$. On a drawing, put the start of the second at the end of the first: the sum goes from the start of the first to the end of the second. The length of the sum is not the sum of the lengths: going straight is shorter.'
        ),
        problem: same('$\\vec{u}=(3,1),\\ \\vec{v}=(1,3)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu osagaiak.', 'Suma las componentes.', 'اجمع المركّبات.', 'Add the components.'), math: same('$\\vec{u}+\\vec{v}=(4,4)$') }
        ],
        example: same('$(2,-5)+(-3,1)=(-1,-4)$'),
        mistake: {
            wrong: say('$|\\vec{u}+\\vec{v}|=|\\vec{u}|+|\\vec{v}|$ beti.', 'Siempre $|\\vec{u}+\\vec{v}|=|\\vec{u}|+|\\vec{v}|$.', 'دائمًا $|\\vec{u}+\\vec{v}|=|\\vec{u}|+|\\vec{v}|$.', 'Always $|\\vec{u}+\\vec{v}|=|\\vec{u}|+|\\vec{v}|$.'),
            right: say('Norabide berean daudenean bakarrik. Bestela, batura laburragoa da: $|(4,4)|\\approx 5{,}66<3{,}16+3{,}16$.', 'Solo cuando van en la misma dirección. Si no, la suma es más corta: $|(4,4)|\\approx 5{,}66<3{,}16+3{,}16$.', 'فقط عندما يكونان بالاتجاه نفسه. وإلا فالمجموع أقصر: $|(4,4)|\\approx 5{,}66<3{,}16+3{,}16$.', 'Only when they point the same way. Otherwise the sum is shorter: $|(4,4)|\\approx 5{,}66<3{,}16+3{,}16$.')
        },
        takeaway: same('$(A,B)+(C,D)=(A+C,\\ B+D)$'),
        figure: (language) => <MotionFigure language={language} kind="sum" />
    },
    /* ---------- 2. Translations ---------- */
    {
        id: 'translation',
        stage: 'translations',
        title: say('Lekualdaketak', 'Traslaciones', 'الانسحابات', 'Translations'),
        goal: say('Irudi bat bektore batekin lekualdatzea.', 'Trasladar una figura con un vector.', 'نقل شكل بمتجه.', 'Translate a shape by a vector.'),
        explanation: say(
            'Lekualdaketa batek puntu guztiak bektore berarekin mugitzen ditu: distantzia, norabide eta noranzko bera. Irudiak ez du forma, tamaina ezta orientazioa aldatzen: ez da biratzen ezta iraultzen. Horregatik, lekualdaketa mugimendu zuzena da. Irudia eta haren irudia elkarren paraleloak dira alde guztietan.',
            'Una traslación mueve todos los puntos con el mismo vector: la misma distancia, dirección y sentido. La figura no cambia de forma, tamaño ni orientación: no se gira ni se da la vuelta. Por eso la traslación es un movimiento directo. La figura y su imagen tienen todos los lados paralelos.',
            'ينقل الانسحاب كل النقاط بالمتجه نفسه: المسافة والاتجاه والمنحى نفسها. ولا يتغيّر شكل الشكل ولا حجمه ولا وضعه: لا يدور ولا ينقلب. لذلك الانسحاب حركة مباشرة. وأضلاع الشكل وصورته متوازية كلها.',
            'A translation moves every point by the same vector: the same distance, direction and sense. The shape keeps its form, size and orientation: it is neither turned nor flipped. That is why a translation is a direct movement. A shape and its image have all their sides parallel.'
        ),
        problem: say('$P=(3,2)$ puntua $\\vec{v}=(4,2)$ bektorearekin lekualdatzen da. Non dago $P^{\\prime}$?', 'El punto $P=(3,2)$ se traslada con $\\vec{v}=(4,2)$. ¿Dónde queda $P^{\\prime}$?', 'تُنقل النقطة $P=(3,2)$ بالمتجه $\\vec{v}=(4,2)$. أين تقع $P^{\\prime}$؟', 'The point $P=(3,2)$ is translated by $\\vec{v}=(4,2)$. Where is $P^{\\prime}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('4 eskuinera eta 2 gora.', '4 a la derecha y 2 hacia arriba.', '4 يمينًا و2 إلى الأعلى.', '4 to the right and 2 up.'), math: same('$(3+4,\\ 2+2)=(7,4)$') }
        ],
        example: same('$(0,5)\\to(4,7)$'),
        mistake: {
            wrong: say('Lekualdaketa batean irudia biratu egiten da bektorearen norabidean.', 'En una traslación la figura gira hacia la dirección del vector.', 'في الانسحاب يدور الشكل نحو اتجاه المتجه.', 'In a translation the shape turns towards the direction of the vector.'),
            right: say('Ez da biratzen: puntu guztiek mugimendu bera egiten dute, eta orientazioa ez da aldatzen.', 'No gira: todos los puntos se mueven igual y la orientación no cambia.', 'لا يدور: تتحرك كل النقاط بالطريقة نفسها ولا يتغيّر الوضع.', 'It does not turn: every point moves the same way and the orientation stays.')
        },
        takeaway: say('Puntu GUZTIAK bektore berarekin: $P^{\\prime}=P+\\vec{V}$.', 'TODOS los puntos con el mismo vector: $P^{\\prime}=P+\\vec{V}$.', 'كل النقاط بالمتجه نفسه: $P^{\\prime}=P+\\vec{V}$.', 'EVERY point by the same vector: $P^{\\prime}=P+\\vec{V}$.'),
        figure: (language) => <MotionFigure language={language} kind="translation" />
    },
    {
        id: 'translation-coordinates',
        stage: 'translations',
        title: say('Lekualdaketak koordenatuetan', 'Traslaciones en coordenadas', 'الانسحابات بالإحداثيات', 'Translations in coordinates'),
        goal: say('Puntu baten irudia eta lekualdaketaren bektorea koordenatuekin kalkulatzea.', 'Calcular la imagen de un punto y el vector de una traslación con coordenadas.', 'حساب صورة نقطة ومتجه الانسحاب بالإحداثيات.', 'Work out the image of a point and the vector of a translation with coordinates.'),
        explanation: say(
            '$\\vec{v}=(a,b)$ bektorearekiko lekualdaketak $(x,y)$ puntua $(x+a,\\ y+b)$ puntura eramaten du. Alderantziz, puntu bat eta haren irudia ezagutzen badira, bektorea irudia ken puntua da. Irudi oso bat lekualdatzeko, nahikoa da erpinak lekualdatzea eta berriro lotzea.',
            'La traslación de vector $\\vec{v}=(a,b)$ lleva el punto $(x,y)$ al $(x+a,\\ y+b)$. Al revés, si se conocen un punto y su imagen, el vector es la imagen menos el punto. Para trasladar una figura entera, basta con trasladar sus vértices y volver a unirlos.',
            'الانسحاب بالمتجه $\\vec{v}=(a,b)$ ينقل النقطة $(x,y)$ إلى $(x+a,\\ y+b)$. وبالعكس، إذا عرفنا نقطة وصورتها فالمتجه هو الصورة ناقص النقطة. ولنقل شكل كامل يكفي نقل رؤوسه ثم وصلها من جديد.',
            'The translation by $\\vec{v}=(a,b)$ takes the point $(x,y)$ to $(x+a,\\ y+b)$. The other way round, if you know a point and its image, the vector is the image minus the point. To translate a whole shape, translate its vertices and join them again.'
        ),
        problem: say('$A=(-2,5)$ puntuaren irudia $A^{\\prime}=(3,1)$ da. Zein da bektorea?', 'La imagen de $A=(-2,5)$ es $A^{\\prime}=(3,1)$. ¿Cuál es el vector?', 'صورة $A=(-2,5)$ هي $A^{\\prime}=(3,1)$. ما المتجه؟', 'The image of $A=(-2,5)$ is $A^{\\prime}=(3,1)$. What is the vector?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Irudia ken puntua.', 'Imagen menos punto.', 'الصورة ناقص النقطة.', 'Image minus point.'), math: same('$(3-(-2),\\ 1-5)=(5,-4)$') }
        ],
        example: same('$(x,y)\\to(x-3,\\ y+1)$'),
        mistake: {
            wrong: say('$(4,-1)$ bektorearekin: $(2,3)\\to(2-4,\\ 3+1)$.', 'Con el vector $(4,-1)$: $(2,3)\\to(2-4,\\ 3+1)$.', 'بالمتجه $(4,-1)$: $(2,3)\\to(2-4,\\ 3+1)$.', 'With the vector $(4,-1)$: $(2,3)\\to(2-4,\\ 3+1)$.'),
            right: say('Osagaiak zeinuarekin batzen dira: $(2+4,\\ 3-1)=(6,2)$.', 'Las componentes se suman con su signo: $(2+4,\\ 3-1)=(6,2)$.', 'تُجمع المركّبتان بإشارتيهما: $(2+4,\\ 3-1)=(6,2)$.', 'The components are added with their signs: $(2+4,\\ 3-1)=(6,2)$.')
        },
        takeaway: same('$(X,Y)\\to(X+A,\\ Y+B)$'),
        figure: (language) => <MotionFigure language={language} kind="coordinates" />
    },
    {
        id: 'translation-composition',
        stage: 'translations',
        title: say('Lekualdaketak elkarren segidan', 'Traslaciones seguidas', 'انسحابات متتالية', 'One translation after another'),
        goal: say('Bi lekualdaketa bakar batekin ordeztea.', 'Sustituir dos traslaciones por una sola.', 'استبدال انسحابين بانسحاب واحد.', 'Replace two translations with a single one.'),
        explanation: say(
            '$\\vec{u}$ bektorearekin lekualdatu eta gero $\\vec{v}$ bektorearekin lekualdatzea, $\\vec{u}+\\vec{v}$ bektorearekin behin lekualdatzea bezala da. Ordenak ez du axola: $\\vec{u}+\\vec{v}=\\vec{v}+\\vec{u}$. Lekualdaketa bat desegiteko, aurkako bektorea erabiltzen da: $(a,b)$ bektorearena $(-a,-b)$ da.',
            'Trasladar con $\\vec{u}$ y después con $\\vec{v}$ es como trasladar una sola vez con $\\vec{u}+\\vec{v}$. El orden no importa: $\\vec{u}+\\vec{v}=\\vec{v}+\\vec{u}$. Para deshacer una traslación se usa el vector opuesto: el de $(a,b)$ es $(-a,-b)$.',
            'الانسحاب بـ$\\vec{u}$ ثم بـ$\\vec{v}$ كالانسحاب مرة واحدة بـ$\\vec{u}+\\vec{v}$. والترتيب لا يهم: $\\vec{u}+\\vec{v}=\\vec{v}+\\vec{u}$. ولإلغاء انسحاب نستعمل المتجه المعاكس: معاكس $(a,b)$ هو $(-a,-b)$.',
            'Translating by $\\vec{u}$ and then by $\\vec{v}$ is the same as translating once by $\\vec{u}+\\vec{v}$. The order does not matter: $\\vec{u}+\\vec{v}=\\vec{v}+\\vec{u}$. To undo a translation, use the opposite vector: the opposite of $(a,b)$ is $(-a,-b)$.'
        ),
        problem: say('$(3,-2)$ bektorearekin eta gero $(2,3)$ bektorearekin lekualdatzen da. Zein bektore bakarrek egiten du gauza bera?', 'Se traslada con $(3,-2)$ y después con $(2,3)$. ¿Qué vector solo hace lo mismo?', 'ننقل بـ$(3,-2)$ ثم بـ$(2,3)$. أي متجه واحد يفعل الشيء نفسه؟', 'You translate by $(3,-2)$ and then by $(2,3)$. Which single vector does the same?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu bektoreak.', 'Suma los vectores.', 'اجمع المتجهين.', 'Add the vectors.'), math: same('$(3+2,\\ -2+3)=(5,1)$') }
        ],
        example: same('$(4,1)+(-4,-1)=(0,0)$'),
        mistake: {
            wrong: say('Bi lekualdaketa elkarren segidan biraketa bat dira.', 'Dos traslaciones seguidas son un giro.', 'انسحابان متتاليان دوران.', 'Two translations in a row make a rotation.'),
            right: say('Lekualdaketa bat dira, bektoreen baturarekin: irudia ez da biratzen.', 'Son una traslación, con la suma de los vectores: la figura no gira.', 'هما انسحاب بمجموع المتجهين: الشكل لا يدور.', 'They make a translation by the sum of the vectors: the shape does not turn.')
        },
        takeaway: say('$\\vec{U}$ eta gero $\\vec{V}$ = $\\vec{U}+\\vec{V}$', '$\\vec{U}$ y después $\\vec{V}$ = $\\vec{U}+\\vec{V}$', '$\\vec{U}$ ثم $\\vec{V}$ = $\\vec{U}+\\vec{V}$', '$\\vec{U}$ then $\\vec{V}$ = $\\vec{U}+\\vec{V}$'),
        figure: (language) => <MotionFigure language={language} kind="two-translations" />
    },
    /* ---------- 3. Rotations ---------- */
    {
        id: 'rotation',
        stage: 'rotations',
        title: say('Biraketak', 'Giros', 'الدورانات', 'Rotations'),
        goal: say('Irudi bat zentro baten inguruan angelu batez biratzea.', 'Girar una figura alrededor de un centro un ángulo dado.', 'تدوير شكل حول مركز بزاوية معطاة.', 'Rotate a shape about a centre by a given angle.'),
        explanation: say(
            '$O$ zentroko eta $\\alpha$ angeluko biraketak puntu bakoitza zirkunferentzia batean mugitzen du: zentrotik distantzia bera mantentzen du, eta $\\alpha$ angelua egiten du. Angelu positiboak erlojuaren orratzen aurkako noranzkoan biratzen du. Zentroa da mugitzen ez den puntu bakarra. Irudiak forma eta tamaina mantentzen ditu, baina orientazioa aldatzen du.',
            'El giro de centro $O$ y ángulo $\\alpha$ mueve cada punto por una circunferencia: mantiene su distancia al centro y recorre el ángulo $\\alpha$. Un ángulo positivo gira en sentido contrario a las agujas del reloj. El centro es el único punto que no se mueve. La figura mantiene forma y tamaño, pero cambia su orientación.',
            'الدوران حول المركز $O$ بالزاوية $\\alpha$ يحرّك كل نقطة على دائرة: تحافظ على بعدها عن المركز وتقطع الزاوية $\\alpha$. والزاوية الموجبة تدور عكس عقارب الساعة. والمركز هو النقطة الوحيدة التي لا تتحرك. ويحافظ الشكل على هيئته وحجمه لكن يتغيّر وضعه.',
            'The rotation with centre $O$ and angle $\\alpha$ moves each point along a circle: it keeps its distance from the centre and turns through $\\alpha$. A positive angle turns anticlockwise. The centre is the only point that does not move. The shape keeps its form and size, but its orientation changes.'
        ),
        problem: say('$P$ puntua $O$ zentrotik 5 cm-ra dago. 90° biratu ondoren, zein distantziatara dago $P^{\\prime}$ zentrotik?', 'El punto $P$ está a 5 cm del centro $O$. Tras un giro de 90°, ¿a qué distancia del centro está $P^{\\prime}$?', 'النقطة $P$ على بعد 5 سم من المركز $O$. بعد دوران 90° على أي بعد من المركز تقع $P^{\\prime}$؟', 'The point $P$ is 5 cm from the centre $O$. After a 90° rotation, how far from the centre is $P^{\\prime}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biraketak zentrorako distantzia gordetzen du.', 'El giro conserva la distancia al centro.', 'يحافظ الدوران على البعد عن المركز.', 'A rotation keeps the distance to the centre.'), math: same('$OP^{\\prime}=OP=5$') }
        ],
        example: same('$360°\\div 4=90°$'),
        mistake: {
            wrong: say('90° biratzean, puntu guztiak 90 unitate mugitzen dira.', 'Al girar 90°, todos los puntos se mueven 90 unidades.', 'عند الدوران 90° تتحرك كل النقاط 90 وحدة.', 'Turning by 90°, every point moves 90 units.'),
            right: say('90° angelua da, ez distantzia: zentrotik urrun dauden puntuek bide luzeagoa egiten dute.', '90° es un ángulo, no una distancia: los puntos lejos del centro recorren más camino.', '90° زاوية لا مسافة: النقاط البعيدة عن المركز تقطع طريقًا أطول.', '90° is an angle, not a distance: points far from the centre travel further.')
        },
        takeaway: say('Biraketa = ZENTROA + ANGELUA; $OP^{\\prime}=OP$.', 'Giro = CENTRO + ÁNGULO; $OP^{\\prime}=OP$.', 'الدوران = المركز + الزاوية؛ $OP^{\\prime}=OP$.', 'Rotation = CENTRE + ANGLE; $OP^{\\prime}=OP$.'),
        figure: (language) => <MotionFigure language={language} kind="rotation" />
    },
    {
        id: 'rotation-coordinates',
        stage: 'rotations',
        title: say('Biraketak koordenatuetan', 'Giros en coordenadas', 'الدورانات بالإحداثيات', 'Rotations in coordinates'),
        goal: say('Jatorriaren inguruko 90°, 180° eta 270°-ko biraketak koordenatuekin egitea.', 'Hacer giros de 90°, 180° y 270° alrededor del origen con coordenadas.', 'إجراء دورانات 90° و180° و270° حول الأصل بالإحداثيات.', 'Do rotations of 90°, 180° and 270° about the origin with coordinates.'),
        explanation: say(
            'Jatorriaren inguruan: 90° biratzean, $(x,y)$ puntua $(-y,x)$ bihurtzen da; 180° biratzean, $(-x,-y)$; 270° (edo $-90°$) biratzean, $(y,-x)$. Gogoratzeko: 90°-ko biraketak koordenatuak trukatzen ditu eta lehenengoari zeinua aldatzen dio. Egiaztatu beti zentrorako distantzia ez dela aldatu.',
            'Alrededor del origen: al girar 90°, el punto $(x,y)$ pasa a $(-y,x)$; al girar 180°, a $(-x,-y)$; al girar 270° (o $-90°$), a $(y,-x)$. Para recordarlo: el giro de 90° intercambia las coordenadas y le cambia el signo a la primera. Comprueba siempre que la distancia al centro no ha cambiado.',
            'حول الأصل: عند الدوران 90° تصير النقطة $(x,y)$ هي $(-y,x)$؛ وعند 180° تصير $(-x,-y)$؛ وعند 270° (أو $-90°$) تصير $(y,-x)$. للتذكّر: دوران 90° يبادل الإحداثيين ويغيّر إشارة الأول. وتحقّق دائمًا أن البعد عن المركز لم يتغيّر.',
            'About the origin: turning by 90°, the point $(x,y)$ goes to $(-y,x)$; by 180°, to $(-x,-y)$; by 270° (or $-90°$), to $(y,-x)$. To remember: the 90° rotation swaps the coordinates and changes the sign of the first. Always check that the distance to the centre has not changed.'
        ),
        cases: [
            { title: same('$90°$'), text: say('Laurden bat', 'Un cuarto de vuelta', 'ربع دورة', 'A quarter turn'), math: same('$(x,y)\\to(-y,x)$') },
            { title: same('$180°$'), text: say('Erdia', 'Media vuelta', 'نصف دورة', 'Half a turn'), math: same('$(x,y)\\to(-x,-y)$') },
            { title: same('$270°$'), text: say('Hiru laurden', 'Tres cuartos de vuelta', 'ثلاثة أرباع دورة', 'Three quarters of a turn'), math: same('$(x,y)\\to(y,-x)$') }
        ],
        problem: say('$P=(3,2)$ jatorriaren inguruan 90° biratzen da. Non dago $P^{\\prime}$?', '$P=(3,2)$ gira 90° alrededor del origen. ¿Dónde queda $P^{\\prime}$?', 'تدور $P=(3,2)$ بزاوية 90° حول الأصل. أين تقع $P^{\\prime}$؟', '$P=(3,2)$ is rotated 90° about the origin. Where is $P^{\\prime}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Trukatu eta aldatu lehenengoaren zeinua.', 'Intercambia y cambia el signo de la primera.', 'بادِل وغيّر إشارة الأول.', 'Swap and change the sign of the first.'), math: same('$(-2,3)$') },
            { text: say('Egiaztatu distantzia.', 'Comprueba la distancia.', 'تحقّق من البعد.', 'Check the distance.'), math: same('$3^{2}+2^{2}=13=(-2)^{2}+3^{2}$') }
        ],
        example: same('$(4,-1)\\to(-4,1)$'),
        mistake: {
            wrong: say('90° biraketa: $(3,2)\\to(2,3)$.', 'Giro de 90°: $(3,2)\\to(2,3)$.', 'دوران 90°: $(3,2)\\to(2,3)$.', 'Rotation by 90°: $(3,2)\\to(2,3)$.'),
            right: say('Trukatzea bakarrik $y=x$ zuzenarekiko simetria da. Biraketan zeinua ere aldatzen da: $(-2,3)$.', 'Solo intercambiar es la simetría respecto a $y=x$. En el giro también cambia un signo: $(-2,3)$.', 'المبادلة وحدها تناظر بالنسبة إلى $y=x$. وفي الدوران تتغيّر إشارة أيضًا: $(-2,3)$.', 'Only swapping is the reflection in $y=x$. A rotation also changes a sign: $(-2,3)$.')
        },
        takeaway: same('$90°: (X,Y)\\to(-Y,X)$'),
        figure: (language) => <MotionFigure language={language} kind="rotation-coordinates" />
    },
    {
        id: 'central-symmetry',
        stage: 'rotations',
        title: say('Simetria zentrala eta errosetoiak', 'Simetría central y rosetones', 'التناظر المركزي والزخارف الدائرية', 'Central symmetry and rosettes'),
        goal: say('Simetria zentrala 180°-ko biraketa gisa ezagutzea eta irudi baten biraketa-ordena aurkitzea.', 'Reconocer la simetría central como un giro de 180° y hallar el orden de giro de una figura.', 'التعرّف على التناظر المركزي كدوران 180° وإيجاد رتبة دوران شكل.', 'See central symmetry as a 180° rotation and find the order of rotation of a shape.'),
        explanation: say(
            '$O$ zentroko simetria zentralak puntu bakoitza $O$ puntutik beste aldera eramaten du, distantzia berera: $O$ da $P$ eta $P^{\\prime}$ arteko erdiko puntua. 180°-ko biraketa bera da. Irudi batek $n$ ordenako biraketa-simetria du $\\frac{360°}{n}$ biratuta bere buruarekin bat egiten badu: karratuak 4 ordena du, eta hexagono erregularrak 6. Errosetoiak horrela eraikitzen dira.',
            'La simetría central de centro $O$ lleva cada punto al otro lado de $O$, a la misma distancia: $O$ es el punto medio entre $P$ y $P^{\\prime}$. Es lo mismo que un giro de 180°. Una figura tiene simetría de giro de orden $n$ si coincide consigo misma al girarla $\\frac{360°}{n}$: el cuadrado tiene orden 4 y el hexágono regular, 6. Así se construyen los rosetones.',
            'التناظر المركزي حول $O$ ينقل كل نقطة إلى الجهة الأخرى من $O$ على البعد نفسه: $O$ منتصف $P$ و$P^{\\prime}$. وهو دوران 180° نفسه. ويكون للشكل تناظر دوراني من الرتبة $n$ إذا انطبق على نفسه عند تدويره $\\frac{360°}{n}$: للمربع الرتبة 4 وللسداسي المنتظم 6. وهكذا تُبنى الزخارف الدائرية.',
            'Central symmetry with centre $O$ takes each point to the other side of $O$, at the same distance: $O$ is the midpoint of $P$ and $P^{\\prime}$. It is the same as a 180° rotation. A shape has rotational symmetry of order $n$ if it matches itself when turned by $\\frac{360°}{n}$: a square has order 4 and a regular hexagon, 6. That is how rosettes are built.'
        ),
        problem: say('$P=(4,-1)$ eta $O=(1,1)$. Zein da $P$ puntuaren simetrikoa $O$ puntuarekiko?', '$P=(4,-1)$ y $O=(1,1)$. ¿Cuál es el simétrico de $P$ respecto a $O$?', '$P=(4,-1)$ و$O=(1,1)$. ما نظير $P$ بالنسبة إلى $O$؟', '$P=(4,-1)$ and $O=(1,1)$. What is the image of $P$ in the point $O$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$O$ erdiko puntua da: $P^{\\prime}=2O-P$.', '$O$ es el punto medio: $P^{\\prime}=2O-P$.', '$O$ المنتصف: $P^{\\prime}=2O-P$.', '$O$ is the midpoint: $P^{\\prime}=2O-P$.'), math: same('$(2-4,\\ 2+1)=(-2,3)$') }
        ],
        example: same('$\\frac{360°}{6}=60°$'),
        mistake: {
            wrong: say('Simetria zentrala ispilu bat da $O$ puntuan.', 'La simetría central es un espejo en el punto $O$.', 'التناظر المركزي مرآة عند النقطة $O$.', 'Central symmetry is a mirror at the point $O$.'),
            right: say('Biraketa bat da (180°): irudia ez da iraultzen, buruz behera geratzen da.', 'Es un giro (180°): la figura no se da la vuelta, queda cabeza abajo.', 'إنه دوران (180°): لا ينقلب الشكل بل يصير مقلوبًا رأسًا على عقب.', 'It is a rotation (180°): the shape is not flipped, it ends up upside down.')
        },
        takeaway: say('Simetria zentrala = 180° biraketa: $P^{\\prime}=2O-P$.', 'Simetría central = giro de 180°: $P^{\\prime}=2O-P$.', 'التناظر المركزي = دوران 180°: $P^{\\prime}=2O-P$.', 'Central symmetry = rotation by 180°: $P^{\\prime}=2O-P$.'),
        figure: (language) => <MotionFigure language={language} kind="central" />
    },
    /* ---------- 4. Reflections ---------- */
    {
        id: 'axial-symmetry',
        stage: 'reflections',
        title: say('Simetria axiala', 'Simetría axial', 'التناظر المحوري', 'Reflection'),
        goal: say('Irudi bat ardatz batekiko islatzea eta irudi baten simetria-ardatzak aurkitzea.', 'Reflejar una figura respecto a un eje y encontrar los ejes de simetría de una figura.', 'عكس شكل بالنسبة إلى محور وإيجاد محاور تناظر شكل.', 'Reflect a shape in an axis and find the axes of symmetry of a shape.'),
        explanation: say(
            '$e$ ardatzarekiko simetriak puntu bakoitza ardatzaren beste aldera eramaten du: $e$ ardatza $PP^{\\prime}$ segmentuaren erdibitzailea da. Ispilu bat bezala da: irudiak forma eta tamaina gordetzen ditu, baina iraulita geratzen da (mugimendu alderantzizkoa). Irudi batek simetria-ardatz bat du ardatz horrekiko bere buruarekin bat egiten badu: $n$ aldeko poligono erregularrak $n$ ardatz ditu.',
            'La simetría de eje $e$ lleva cada punto al otro lado del eje: el eje $e$ es la mediatriz del segmento $PP^{\\prime}$. Es como un espejo: la figura conserva forma y tamaño, pero queda dada la vuelta (movimiento inverso). Una figura tiene un eje de simetría si coincide consigo misma al reflejarla en él: un polígono regular de $n$ lados tiene $n$ ejes.',
            'التناظر بالنسبة إلى المحور $e$ ينقل كل نقطة إلى الجهة الأخرى من المحور: المحور $e$ هو المنصّف العمودي للقطعة $PP^{\\prime}$. إنه كالمرآة: يحافظ الشكل على هيئته وحجمه لكنه ينقلب (حركة عكسية). ويكون للشكل محور تناظر إذا انطبق على نفسه عند عكسه فيه: للمضلع المنتظم ذي $n$ ضلعًا $n$ محاور.',
            'The reflection in the axis $e$ takes each point to the other side of the axis: $e$ is the perpendicular bisector of $PP^{\\prime}$. It is like a mirror: the shape keeps its form and size, but ends up flipped (an opposite movement). A shape has an axis of symmetry if it matches itself when reflected in it: a regular polygon with $n$ sides has $n$ axes.'
        ),
        problem: say('$P=(5,2)$ eta ardatza $x=3$ zuzena. Non dago $P^{\\prime}$?', '$P=(5,2)$ y el eje es la recta $x=3$. ¿Dónde queda $P^{\\prime}$?', '$P=(5,2)$ والمحور المستقيم $x=3$. أين تقع $P^{\\prime}$؟', '$P=(5,2)$ and the axis is the line $x=3$. Where is $P^{\\prime}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$P$ ardatzetik 2 unitatera dago eskuinean.', '$P$ está 2 unidades a la derecha del eje.', '$P$ على بعد وحدتين يمين المحور.', '$P$ is 2 units to the right of the axis.') },
            { text: say('$P^{\\prime}$ 2 unitatera ezkerrean.', '$P^{\\prime}$, 2 unidades a la izquierda.', '$P^{\\prime}$ على بعد وحدتين يساره.', '$P^{\\prime}$, 2 units to the left.'), math: same('$P^{\\prime}=(1,2)$') }
        ],
        example: same('$x=3:\\ (7,0)\\to(-1,0)$'),
        mistake: {
            wrong: say('Simetria axialean irudia biratu egiten da.', 'En la simetría axial la figura gira.', 'في التناظر المحوري يدور الشكل.', 'In a reflection the shape turns.'),
            right: say('Ez da biratzen: iraultzen da, ispiluan bezala. Ezkerra eskuin bihurtzen da.', 'No gira: se da la vuelta, como en un espejo. La izquierda pasa a ser la derecha.', 'لا يدور: ينقلب كما في المرآة. يصير اليسار يمينًا.', 'It does not turn: it flips, as in a mirror. Left becomes right.')
        },
        takeaway: say('Ardatza $PP^{\\prime}$ segmentuaren ERDIBITZAILEA da.', 'El eje es la MEDIATRIZ de $PP^{\\prime}$.', 'المحور هو المنصّف العمودي لـ$PP^{\\prime}$.', 'The axis is the PERPENDICULAR BISECTOR of $PP^{\\prime}$.'),
        figure: (language) => <MotionFigure language={language} kind="axial" />
    },
    {
        id: 'reflection-coordinates',
        stage: 'reflections',
        title: say('Simetriak koordenatuetan', 'Simetrías en coordenadas', 'التناظرات بالإحداثيات', 'Reflections in coordinates'),
        goal: say('Ardatz koordenatuekiko eta $y=x$ zuzenarekiko simetriak egitea.', 'Hacer simetrías respecto a los ejes de coordenadas y a la recta $y=x$.', 'إجراء التناظرات بالنسبة إلى محوري الإحداثيات والمستقيم $y=x$.', 'Reflect in the coordinate axes and in the line $y=x$.'),
        explanation: say(
            'X ardatzarekiko simetriak $y$ koordenatuaren zeinua aldatzen du: $(x,y)\\to(x,-y)$. Y ardatzarekikoak $x$ koordenatuarena: $(x,y)\\to(-x,y)$. $y=x$ zuzenarekikoak koordenatuak trukatzen ditu: $(x,y)\\to(y,x)$. $x=k$ ardatz bertikalarekiko: $(x,y)\\to(2k-x,\\ y)$.',
            'La simetría respecto al eje X cambia el signo de la $y$: $(x,y)\\to(x,-y)$. La del eje Y cambia el de la $x$: $(x,y)\\to(-x,y)$. La de la recta $y=x$ intercambia las coordenadas: $(x,y)\\to(y,x)$. Respecto a un eje vertical $x=k$: $(x,y)\\to(2k-x,\\ y)$.',
            'التناظر بالنسبة إلى محور X يغيّر إشارة $y$: $(x,y)\\to(x,-y)$. وبالنسبة إلى محور Y يغيّر إشارة $x$: $(x,y)\\to(-x,y)$. وبالنسبة إلى المستقيم $y=x$ يبادل الإحداثيين: $(x,y)\\to(y,x)$. وبالنسبة إلى محور عمودي $x=k$: $(x,y)\\to(2k-x,\\ y)$.',
            'Reflection in the X axis changes the sign of $y$: $(x,y)\\to(x,-y)$. In the Y axis, the sign of $x$: $(x,y)\\to(-x,y)$. In the line $y=x$ it swaps the coordinates: $(x,y)\\to(y,x)$. In a vertical axis $x=k$: $(x,y)\\to(2k-x,\\ y)$.'
        ),
        cases: [
            { title: say('X ardatza', 'Eje X', 'محور X', 'X axis'), text: say('$y$ koordenatua aldatzen da.', 'Cambia la $y$.', 'يتغيّر $y$.', 'The $y$ changes.'), math: same('$(x,y)\\to(x,-y)$') },
            { title: say('Y ardatza', 'Eje Y', 'محور Y', 'Y axis'), text: say('$x$ koordenatua aldatzen da.', 'Cambia la $x$.', 'يتغيّر $x$.', 'The $x$ changes.'), math: same('$(x,y)\\to(-x,y)$') },
            { title: same('$y=x$'), text: say('Trukatu egiten dira.', 'Se intercambian.', 'يتبادلان.', 'They swap.'), math: same('$(x,y)\\to(y,x)$') }
        ],
        problem: say('Zein da $(3,3)$ puntuaren simetrikoa X ardatzarekiko?', '¿Cuál es el simétrico de $(3,3)$ respecto al eje X?', 'ما نظير $(3,3)$ بالنسبة إلى محور X؟', 'What is the image of $(3,3)$ in the X axis?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$y$ koordenatuaren zeinua aldatu.', 'Cambia el signo de la $y$.', 'غيّر إشارة $y$.', 'Change the sign of $y$.'), math: same('$(3,-3)$') }
        ],
        example: same('$y=x:\\ (2,-5)\\to(-5,2)$'),
        mistake: {
            wrong: say('X ardatzarekiko: $(4,1)\\to(-4,1)$.', 'Respecto al eje X: $(4,1)\\to(-4,1)$.', 'بالنسبة إلى محور X: $(4,1)\\to(-4,1)$.', 'In the X axis: $(4,1)\\to(-4,1)$.'),
            right: say('X ardatza horizontala da: puntua gora edo behera islatzen da, $(4,-1)$.', 'El eje X es horizontal: el punto se refleja hacia arriba o abajo, $(4,-1)$.', 'محور X أفقي: تنعكس النقطة إلى الأعلى أو الأسفل، $(4,-1)$.', 'The X axis is horizontal: the point is reflected up or down, $(4,-1)$.')
        },
        takeaway: same('$X:\\ (X,Y)\\to(X,-Y)\\qquad Y:\\ (X,Y)\\to(-X,Y)$'),
        figure: (language) => <MotionFigure language={language} kind="reflection-coordinates" />
    },
    {
        id: 'two-mirrors',
        stage: 'reflections',
        title: say('Bi simetria elkarren segidan', 'Dos simetrías seguidas', 'تناظران متتاليان', 'Two reflections in a row'),
        goal: say('Bi simetria axialen konposizioa ezagutzea: lekualdaketa edo biraketa.', 'Reconocer la composición de dos simetrías axiales: traslación o giro.', 'التعرّف على تركيب تناظرين محوريين: انسحاب أو دوران.', 'Recognise two reflections in a row: a translation or a rotation.'),
        explanation: say(
            'Bi aldiz islatzean irudia berriro zuzen geratzen da. Ardatzak paraleloak badira, emaitza lekualdaketa bat da, ardatzen arteko distantziaren bikoitza, ardatzekiko perpendikularra. Ardatzak puntu batean ebakitzen badira, emaitza biraketa bat da, ebakidura-puntuan zentroa duena eta ardatzen arteko angeluaren bikoitza.',
            'Al reflejar dos veces la figura vuelve a quedar del derecho. Si los ejes son paralelos, el resultado es una traslación del doble de la distancia entre los ejes, perpendicular a ellos. Si los ejes se cortan en un punto, el resultado es un giro con centro en ese punto y el doble del ángulo entre los ejes.',
            'عند العكس مرتين يعود الشكل إلى وضعه الصحيح. فإذا كان المحوران متوازيين كانت النتيجة انسحابًا بضعف المسافة بينهما عموديًا عليهما. وإذا تقاطعا في نقطة كانت النتيجة دورانًا حول تلك النقطة بضعف الزاوية بينهما.',
            'Reflecting twice puts the shape the right way round again. If the axes are parallel, the result is a translation by twice the distance between them, at right angles to them. If the axes cross at a point, the result is a rotation about that point by twice the angle between them.'
        ),
        cases: [
            { title: say('Ardatz paraleloak', 'Ejes paralelos', 'محوران متوازيان', 'Parallel axes'), text: say('Lekualdaketa: $2d$.', 'Traslación: $2d$.', 'انسحاب: $2d$.', 'Translation: $2d$.') },
            { title: say('Ardatz ebakitzaileak', 'Ejes que se cortan', 'محوران متقاطعان', 'Crossing axes'), text: say('Biraketa: $2\\alpha$.', 'Giro: $2\\alpha$.', 'دوران: $2\\alpha$.', 'Rotation: $2\\alpha$.') }
        ],
        problem: say('$x=-2$ eta $x=1$ ardatzekiko simetriak elkarren segidan egiten dira. Zein mugimendu da?', 'Se hacen seguidas las simetrías de ejes $x=-2$ y $x=1$. ¿Qué movimiento es?', 'نجري التناظرين بالمحورين $x=-2$ و$x=1$ متتاليين. أي حركة هي؟', 'You reflect in $x=-2$ and then in $x=1$. Which movement is it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ardatzen arteko distantzia.', 'Distancia entre los ejes.', 'المسافة بين المحورين.', 'Distance between the axes.'), math: same('$1-(-2)=3$') },
            { text: say('Lekualdaketa, bikoitza eskuinera.', 'Traslación del doble, a la derecha.', 'انسحاب بالضعف إلى اليمين.', 'A translation of twice that, to the right.'), math: same('$\\vec{v}=(6,0)$') }
        ],
        example: same('$2\\cdot 45°=90°$'),
        mistake: {
            wrong: say('Bi ardatz paralelo 3 unitatera: lekualdaketa 3 unitatekoa da.', 'Dos ejes paralelos a 3 unidades: la traslación es de 3 unidades.', 'محوران متوازيان على بعد 3 وحدات: الانسحاب 3 وحدات.', 'Two parallel axes 3 units apart: the translation is 3 units.'),
            right: say('Bikoitza da: 6 unitate.', 'Es el doble: 6 unidades.', 'إنه الضعف: 6 وحدات.', 'It is twice: 6 units.')
        },
        takeaway: say('Paraleloak: lekualdaketa $2D$. Ebakitzaileak: biraketa $2\\alpha$.', 'Paralelos: traslación $2D$. Secantes: giro $2\\alpha$.', 'متوازيان: انسحاب $2D$. متقاطعان: دوران $2\\alpha$.', 'Parallel: translation $2D$. Crossing: rotation $2\\alpha$.'),
        figure: (language) => <MotionFigure language={language} kind="two-mirrors" />
    },
    /* ---------- 5. Patterns ---------- */
    {
        id: 'friezes',
        stage: 'patterns',
        title: say('Frisoak', 'Frisos', 'الأفاريز', 'Friezes'),
        goal: say('Friso bat motibo bat eta lekualdaketa bat bezala ikustea.', 'Ver un friso como un motivo y una traslación.', 'رؤية الإفريز كنقش وانسحاب.', 'See a frieze as one motif and a translation.'),
        explanation: say(
            'Friso bat motibo bat da, norabide batean behin eta berriz errepikatua lekualdaketa berarekin. Motiboak ere simetria bat izan dezake (ardatz bertikala, horizontala) edo biraketa bat 180°-koa. Lekualdaketaren bektorea motibo batetik hurrengora dagoen distantzia da: $n$ motibo $n-1$ jauzitan zabaltzen dira.',
            'Un friso es un motivo repetido una y otra vez en una dirección con la misma traslación. El motivo puede tener además una simetría (eje vertical, horizontal) o un giro de 180°. El vector de la traslación es la distancia de un motivo al siguiente: $n$ motivos se extienden en $n-1$ saltos.',
            'الإفريز نقش يتكرر مرة بعد مرة في اتجاه واحد بالانسحاب نفسه. وقد يكون للنقش أيضًا تناظر (محور عمودي أو أفقي) أو دوران 180°. ومتجه الانسحاب هو المسافة من نقش إلى الذي يليه: $n$ نقشًا تمتد على $n-1$ قفزة.',
            'A frieze is one motif repeated again and again in one direction by the same translation. The motif may also have a reflection (vertical or horizontal axis) or a 180° rotation. The vector of the translation is the distance from one motif to the next: $n$ motifs stretch over $n-1$ jumps.'
        ),
        problem: say('Friso batek 3 cm-ko motiboak ditu, 5 cm-ko bektorearekin. Zenbat neurtzen du 8 motiboko frisoak?', 'Un friso tiene motivos de 3 cm con un vector de 5 cm. ¿Cuánto mide un friso de 8 motivos?', 'إفريز نقوشه بعرض 3 سم والمتجه 5 سم. كم طول إفريز من 8 نقوش؟', 'A frieze has 3 cm motifs with a 5 cm vector. How long is a frieze of 8 motifs?'),
        stepsKind: 'steps',
        steps: [
            { text: say('7 jauzi eta azken motiboa.', '7 saltos y el último motivo.', '7 قفزات والنقش الأخير.', '7 jumps and the last motif.'), math: same('$7\\cdot 5+3=38$') }
        ],
        example: same('$4\\cdot 6+2=26$'),
        mistake: {
            wrong: say('8 motibo: $8\\cdot 5=40$ cm.', '8 motivos: $8\\cdot 5=40$ cm.', '8 نقوش: $8\\cdot 5=40$ سم.', '8 motifs: $8\\cdot 5=40$ cm.'),
            right: say('8 motiboren artean 7 jauzi daude, eta azkenaren zabalera falta da: $7\\cdot 5+3=38$.', 'Entre 8 motivos hay 7 saltos, y falta el ancho del último: $7\\cdot 5+3=38$.', 'بين 8 نقوش 7 قفزات وينقص عرض الأخير: $7\\cdot 5+3=38$.', 'Between 8 motifs there are 7 jumps, plus the width of the last one: $7\\cdot 5+3=38$.')
        },
        takeaway: say('Frisoa = MOTIBOA + LEKUALDAKETA.', 'Friso = MOTIVO + TRASLACIÓN.', 'الإفريز = نقش + انسحاب.', 'Frieze = MOTIF + TRANSLATION.'),
        figure: (language) => <MotionFigure language={language} kind="frieze" />
    },
    {
        id: 'tessellations',
        stage: 'patterns',
        title: say('Mosaikoak', 'Mosaicos', 'التبليطات', 'Tilings'),
        goal: say('Zein poligono erregularrek estaltzen duten planoa hutsunerik gabe jakitea.', 'Saber qué polígonos regulares cubren el plano sin huecos.', 'معرفة أي المضلعات المنتظمة تغطي المستوى دون فراغات.', 'Know which regular polygons cover the plane with no gaps.'),
        explanation: say(
            'Mosaiko batek planoa estaltzen du hutsunerik eta gainjartzerik gabe. Erpin batean elkartzen diren angeluek 360° batu behar dute. Poligono erregular bakarrarekin, barne-angeluak 360 zatitu behar du: triangelu aldeberdinak (60°, 6 erpinean), karratuak (90°, 4) eta hexagonoak (120°, 3) bai; pentagonoak (108°) ez.',
            'Un mosaico cubre el plano sin huecos ni solapamientos. Los ángulos que se juntan en un vértice tienen que sumar 360°. Con un solo polígono regular, el ángulo interior tiene que dividir a 360: el triángulo equilátero (60°, 6 en el vértice), el cuadrado (90°, 4) y el hexágono (120°, 3) sí; el pentágono (108°) no.',
            'التبليط يغطي المستوى دون فراغات أو تداخل. ويجب أن يكون مجموع الزوايا الملتقية عند رأس 360°. وبمضلع منتظم واحد يجب أن تقسم الزاوية الداخلية 360: المثلث المتساوي الأضلاع (60°، 6 عند الرأس) والمربع (90°، 4) والسداسي (120°، 3) نعم؛ والخماسي (108°) لا.',
            'A tiling covers the plane with no gaps and no overlaps. The angles that meet at a vertex must add up to 360°. With a single regular polygon, the interior angle must divide 360: equilateral triangles (60°, 6 at a vertex), squares (90°, 4) and hexagons (120°, 3) work; pentagons (108°) do not.'
        ),
        problem: say('Pentagono erregularrek planoa estaltzen al dute?', '¿Los pentágonos regulares cubren el plano?', 'هل تغطي الخماسيات المنتظمة المستوى؟', 'Do regular pentagons tile the plane?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barne-angelua.', 'Ángulo interior.', 'الزاوية الداخلية.', 'Interior angle.'), math: same('$180°-72°=108°$') },
            { text: say('360 ez da 108 zenbakiaren multiploa: hutsune bat geratzen da.', '360 no es múltiplo de 108: queda un hueco.', '360 ليس مضاعفًا لـ108: يبقى فراغ.', '360 is not a multiple of 108: a gap is left.'), math: same('$360°-3\\cdot 108°=36°$') }
        ],
        example: same('$4\\cdot 90°=360°$'),
        mistake: {
            wrong: say('Oktogono erregularrek ere estaltzen dute: 3 sartzen dira erpin batean.', 'Los octógonos regulares también cubren: caben 3 en un vértice.', 'المثمنات المنتظمة تغطي أيضًا: يتسع الرأس لثلاثة.', 'Regular octagons tile too: 3 fit at a vertex.'),
            right: say('$3\\cdot 135°=405°>360°$: gainjarri egiten dira. Oktogonoek karratuekin batera bakarrik estaltzen dute.', '$3\\cdot 135°=405°>360°$: se solapan. Los octógonos solo cubren junto con cuadrados.', '$3\\cdot 135°=405°>360°$: تتداخل. ولا تغطي المثمنات إلا مع المربعات.', '$3\\cdot 135°=405°>360°$: they overlap. Octagons only tile together with squares.')
        },
        takeaway: say('Erpin batean: angeluen batura = $360°$.', 'En un vértice: suma de ángulos = $360°$.', 'عند رأس: مجموع الزوايا = $360°$.', 'At a vertex: sum of the angles = $360°$.'),
        figure: (language) => <MotionFigure language={language} kind="tessellation" />
    },
    {
        id: 'homothety',
        stage: 'patterns',
        title: say('Homoteziak', 'Homotecias', 'التحاكي', 'Enlargements'),
        goal: say('Irudi bat zentro batetik arrazoi batekin handitu edo txikitzea.', 'Ampliar o reducir una figura desde un centro con una razón.', 'تكبير شكل أو تصغيره من مركز بنسبة.', 'Enlarge or reduce a shape from a centre with a factor.'),
        explanation: say(
            '$O$ zentroko eta $k$ arrazoiko homoteziak puntu bakoitza $O$ puntutik igarotzen den zuzenean eramaten du, $k$ aldiz urrunago: $\\vec{OP^{\\prime}}=k\\cdot\\vec{OP}$. Jatorria zentroa bada, $(x,y)\\to(kx,\\ ky)$. $k>1$ bada handitu egiten du, $0<k<1$ bada txikitu, eta $k$ negatiboa bada beste aldera eramaten du. Ez da mugimendu bat: tamaina aldatzen du, baina irudia antzekoa da.',
            'La homotecia de centro $O$ y razón $k$ lleva cada punto por la recta que pasa por $O$, $k$ veces más lejos: $\\vec{OP^{\\prime}}=k\\cdot\\vec{OP}$. Si el centro es el origen, $(x,y)\\to(kx,\\ ky)$. Si $k>1$ amplía, si $0<k<1$ reduce, y si $k$ es negativa lo lleva al otro lado. No es un movimiento: cambia el tamaño, pero la figura es semejante.',
            'التحاكي بالمركز $O$ والنسبة $k$ ينقل كل نقطة على المستقيم المار بـ$O$ أبعد $k$ مرة: $\\vec{OP^{\\prime}}=k\\cdot\\vec{OP}$. وإذا كان المركز الأصل: $(x,y)\\to(kx,\\ ky)$. وإذا $k>1$ يكبّر، وإذا $0<k<1$ يصغّر، وإذا كانت $k$ سالبة ينقله إلى الجهة الأخرى. وليس حركة: يغيّر الحجم لكن الشكل مشابه.',
            'The enlargement with centre $O$ and factor $k$ moves each point along the line through $O$, $k$ times as far: $\\vec{OP^{\\prime}}=k\\cdot\\vec{OP}$. If the centre is the origin, $(x,y)\\to(kx,\\ ky)$. If $k>1$ it enlarges, if $0<k<1$ it reduces, and if $k$ is negative it takes it to the other side. It is not a movement: the size changes, but the shape is similar.'
        ),
        problem: say('$P=(2,-3)$ eta homotezia jatorrian, $k=3$. Non dago $P^{\\prime}$?', '$P=(2,-3)$ y la homotecia de centro el origen y $k=3$. ¿Dónde queda $P^{\\prime}$?', '$P=(2,-3)$ والتحاكي مركزه الأصل و$k=3$. أين تقع $P^{\\prime}$؟', '$P=(2,-3)$ and the enlargement from the origin with $k=3$. Where is $P^{\\prime}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu koordenatuak.', 'Multiplica las coordenadas.', 'اضرب الإحداثيين.', 'Multiply the coordinates.'), math: same('$(3\\cdot 2,\\ 3\\cdot(-3))=(6,-9)$') }
        ],
        example: same('$k=\\frac{1}{2}:\\ (8,4)\\to(4,2)$'),
        mistake: {
            wrong: say('$k=3$ homotezia: $(2,-3)\\to(2+3,\\ -3+3)$.', 'Homotecia $k=3$: $(2,-3)\\to(2+3,\\ -3+3)$.', 'تحاكٍ $k=3$: $(2,-3)\\to(2+3,\\ -3+3)$.', 'Enlargement $k=3$: $(2,-3)\\to(2+3,\\ -3+3)$.'),
            right: say('Homoteziak biderkatu egiten du, ez batu: $(6,-9)$. Batzea lekualdaketa da.', 'La homotecia multiplica, no suma: $(6,-9)$. Sumar es trasladar.', 'التحاكي يضرب ولا يجمع: $(6,-9)$. الجمع انسحاب.', 'An enlargement multiplies, it does not add: $(6,-9)$. Adding is translating.')
        },
        takeaway: same("$\\vec{OP^{\\prime}}=K\\cdot\\vec{OP}$"),
        figure: (language) => <HomothetyFigure language={language} />
    }
]

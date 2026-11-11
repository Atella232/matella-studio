import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { LinesPlanesTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zuzenak eta planoak espazioan · Batxilergoa 2 · Zientziak — what each
   lesson tells: the new words (definitions), a short explanation, the
   example as an exercise («Another example»), the key words in four
   languages and, in four lessons, «Why does it work?». Plain data so the
   tests can import it; lessons.tsx merges it into the topics. The
   example uses numbers of its own, never those of «Let's solve», of
   «Check it» or of the typical mistake. Formulas never start with a bare
   z (the Basque suffix test would read ${z} as a suffix): {z} is the same.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const linesPlanesLessonTexts: Record<LinesPlanesTopicId, LessonTexts> = {
    /* ---------- 1. Equations of a line ---------- */
    'line-parametric': {
        definitions: [
            { term: say('Norabide-bektorea', 'Vector director', 'متجه التوجيه', 'Direction vector'), meaning: say('Zuzenaren norabidea duen $\\vec{u}$ bektore bat (ez nulua).', 'Un vector $\\vec{u}$ (no nulo) con la dirección de la recta.', 'متجه $\\vec{u}$ غير معدوم له اتجاه المستقيم.', 'A vector $\\vec{u}$ (not zero) with the direction of the line.') },
            { term: say('Parametroa', 'Parámetro', 'الوسيط', 'Parameter'), meaning: say('$t$ zenbakia: balio bakoitzak zuzeneko puntu bat ematen du.', 'El número $t$: cada valor da un punto de la recta.', 'العدد $t$: كل قيمة له تعطي نقطة من المستقيم.', 'The number $t$: each value gives a point of the line.') }
        ],
        vocabulary: [
            say('zuzena', 'recta', 'المستقيم', 'line'),
            say('puntua', 'punto', 'النقطة', 'point'),
            say('ekuazio parametrikoak', 'ecuaciones paramétricas', 'المعادلات الوسيطية', 'parametric equations')
        ],
        explanation: say(
            'Zuzen bat ezagutzeko, haren puntu bat, $A$, eta norabide-bektore bat, $\\vec{u}$, nahikoak dira. Zuzeneko puntu guztiak $A$ puntutik $\\vec{u}$ bektorearen multiplo bat ibiliz lortzen dira: hori da ekuazio bektoriala. Koordenatuz koordenatu idatzita, hiru ekuazio parametrikoak ateratzen dira.',
            'Para conocer una recta bastan un punto suyo, $A$, y un vector director, $\\vec{u}$. Todos los puntos de la recta se obtienen andando desde $A$ un múltiplo de $\\vec{u}$: es la ecuación vectorial. Escrita coordenada a coordenada, salen las tres ecuaciones paramétricas.',
            'لمعرفة مستقيم يكفي نقطة منه $A$ ومتجه توجيه $\\vec{u}$. وكل نقاط المستقيم تُحصل بالسير من $A$ مضاعفًا لـ $\\vec{u}$: هذه المعادلة المتجهية. وبكتابتها مركّبةً مركّبة نحصل على المعادلات الوسيطية الثلاث.',
            'To know a line, one of its points, $A$, and a direction vector, $\\vec{u}$, are enough. Every point of the line is reached by walking from $A$ a multiple of $\\vec{u}$: that is the vector equation. Written coordinate by coordinate, it gives the three parametric equations.'
        ),
        examplePrompt: say('Zuzen bat $B(0,4,-1)$ puntutik pasatzen da, $(3,-2,5)$ norabidearekin. Zein puntu da $t=-1$ denean?', 'Una recta pasa por $B(0,4,-1)$ con dirección $(3,-2,5)$. ¿Qué punto da $t=-1$?', 'يمر مستقيم بـ $B(0,4,-1)$ باتجاه $(3,-2,5)$. ما النقطة عند $t=-1$؟', 'A line passes through $B(0,4,-1)$ with direction $(3,-2,5)$. Which point does $t=-1$ give?'),
        example: same('$(0-3,4+2,-1-5)=(-3,6,-6)$'),
        exampleAnswer: say('$(-3,6,-6)$ puntua.', 'El punto $(-3,6,-6)$.', 'النقطة $(-3,6,-6)$.', 'The point $(-3,6,-6)$.')
    },
    'line-continuous': {
        definitions: [
            { term: say('Ekuazio jarraitua', 'Ecuación continua', 'المعادلة المتصلة', 'Continuous equation'), meaning: say('Hiru parametrikoetatik $t$ askatu eta berdinduz: $\\frac{x-a_1}{u_1}=\\frac{y-a_2}{u_2}=\\frac{{z}-a_3}{u_3}$.', 'Despejar $t$ de las tres paramétricas e igualar: $\\frac{x-a_1}{u_1}=\\frac{y-a_2}{u_2}=\\frac{{z}-a_3}{u_3}$.', 'عزل $t$ من المعادلات الوسيطية الثلاث ومساواتها: $\\frac{x-a_1}{u_1}=\\frac{y-a_2}{u_2}=\\frac{{z}-a_3}{u_3}$.', 'Solve the three parametric equations for $t$ and set them equal: $\\frac{x-a_1}{u_1}=\\frac{y-a_2}{u_2}=\\frac{{z}-a_3}{u_3}$.') },
            { term: say('Ekuazio inplizituak', 'Ecuaciones implícitas', 'المعادلتان الديكارتيتان', 'Implicit equations'), meaning: say('Zuzena bi planoren ebaki gisa: bi ekuazio lineal.', 'La recta como corte de dos planos: dos ecuaciones lineales.', 'المستقيم تقاطعًا لمستويين: معادلتان خطيتان.', 'The line as the meeting of two planes: two linear equations.') }
        ],
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('planoa', 'plano', 'المستوى', 'plane')
        ],
        explanation: say(
            'Ekuazio jarraituan, izendatzaileak norabide-bektorearen koordenatuak dira, eta zenbakitzaileetan puntua irakurtzen da, zeinua aldatuta. Bi berdintzatik bi ekuazio lineal ateratzen dira: zuzena bi planoren ebaki gisa geratzen da, eta horiek dira ekuazio inplizituak.',
            'En la ecuación continua, los denominadores son las coordenadas del vector director y en los numeradores se lee el punto, con el signo cambiado. De dos de las igualdades salen dos ecuaciones lineales: la recta queda como el corte de dos planos, y esas son sus ecuaciones implícitas.',
            'في المعادلة المتصلة تكون المقامات مركّبات متجه التوجيه، وتُقرأ النقطة في البسوط بإشارة معاكسة. ومن مساواتين نحصل على معادلتين خطيتين: يصبح المستقيم تقاطع مستويين، وهاتان معادلتاه الديكارتيتان.',
            'In the continuous equation, the denominators are the coordinates of the direction vector, and the point is read in the numerators, with the sign changed. Two of the equalities give two linear equations: the line becomes the meeting of two planes, and those are its implicit equations.'
        ),
        examplePrompt: say('Idatzi $(0,-3,5)$ puntutik $(1,4,-2)$ norabidearekin pasatzen den zuzenaren ekuazio jarraitua.', 'Escribe la ecuación continua de la recta por $(0,-3,5)$ con dirección $(1,4,-2)$.', 'اكتب المعادلة المتصلة للمستقيم المار بـ $(0,-3,5)$ باتجاه $(1,4,-2)$.', 'Write the continuous equation of the line through $(0,-3,5)$ with direction $(1,4,-2)$.'),
        example: same('$\\frac{x}{1}=\\frac{y+3}{4}=\\frac{{z}-5}{-2}$'),
        exampleAnswer: say('Inplizituak: $4x-y-3=0$ eta $y+2{z}-7=0$.', 'Implícitas: $4x-y-3=0$ y $y+2{z}-7=0$.', 'الديكارتيتان: $4x-y-3=0$ و$y+2{z}-7=0$.', 'Implicit: $4x-y-3=0$ and $y+2{z}-7=0$.')
    },
    'implicit-to-parametric': {
        definitions: [
            { term: say('Normalen biderkadura bektoriala', 'Producto de los normales', 'جداء الناظمين', 'Product of the normals'), meaning: say('$\\vec{n}_1\\times\\vec{n}_2$: bi planoekiko paraleloa da, beraz, haien ebakiaren norabidea du.', '$\\vec{n}_1\\times\\vec{n}_2$: es paralelo a los dos planos, así que tiene la dirección de su corte.', '$\\vec{n}_1\\times\\vec{n}_2$: يوازي المستويين، فله اتجاه تقاطعهما.', '$\\vec{n}_1\\times\\vec{n}_2$: it is parallel to both planes, so it has the direction of the line where they meet.') }
        ],
        vocabulary: [
            say('normala', 'normal', 'الناظم', 'normal'),
            say('sistema', 'sistema', 'النظام', 'system'),
            say('norabidea', 'dirección', 'الاتجاه', 'direction')
        ],
        explanation: say(
            'Bi planoren ebakia bi planoetan dago; beraz, haren norabidea bi normalekiko perpendikularra da: $\\vec{n}_1\\times\\vec{n}_2$. Puntu bat aurkitzeko, koordenatu bati balio bat ematen zaio (adibidez ${z}=0$) eta bi ezezaguneko sistema ebazten da. Puntua eta norabidea izanda, parametrikoak idazten dira.',
            'El corte de dos planos está en los dos, así que su dirección es perpendicular a los dos normales: $\\vec{n}_1\\times\\vec{n}_2$. Para un punto, se da un valor a una coordenada (por ejemplo ${z}=0$) y se resuelve el sistema de dos incógnitas. Con el punto y la dirección se escriben las paramétricas.',
            'تقاطع مستويين يقع في كليهما، فاتجاهه عمودي على الناظمين: $\\vec{n}_1\\times\\vec{n}_2$. ولإيجاد نقطة نعطي إحداثيًا قيمة (مثلًا ${z}=0$) ونحل النظام ذا المجهولين. وبالنقطة والاتجاه نكتب المعادلات الوسيطية.',
            'The line where two planes meet lies in both, so its direction is perpendicular to both normals: $\\vec{n}_1\\times\\vec{n}_2$. For a point, give one coordinate a value (for example ${z}=0$) and solve the system in two unknowns. With the point and the direction, write the parametric equations.'
        ),
        examplePrompt: say('Idatzi parametrikoetan: $r$: $x-{z}=2$, $y+2{z}=1$.', 'Pasa a paramétricas $r$: $x-{z}=2$, $y+2{z}=1$.', 'حوّل إلى معادلات وسيطية: $r$: ‏$x-{z}=2$ و$y+2{z}=1$.', 'Turn into parametric equations: $r$: $x-{z}=2$, $y+2{z}=1$.'),
        example: same('$(1,0,-1)\\times(0,1,2)=(1,-2,1)\\qquad x=2+t,\\ y=1-2t,\\ {z}=t$'),
        exampleAnswer: say('${z}=0$ eginez $(2,1,0)$ puntua, eta $(1,-2,1)$ norabidea.', 'Con ${z}=0$, el punto $(2,1,0)$, y la dirección $(1,-2,1)$.', 'مع ${z}=0$ النقطة $(2,1,0)$ والاتجاه $(1,-2,1)$.', 'With ${z}=0$, the point $(2,1,0)$, and the direction $(1,-2,1)$.'),
        why: {
            text: say(
                'Zuzena lehen planoan dago; beraz, haren norabidea $\\vec{n}_1$ normalarekiko perpendikularra da. Bigarren planoan ere badago: $\\vec{n}_2$ normalarekiko ere perpendikularra da. Bientzat perpendikularra den bektorea biderkadura bektoriala da.',
                'La recta está en el primer plano, así que su dirección es perpendicular al normal $\\vec{n}_1$. También está en el segundo: es perpendicular a $\\vec{n}_2$. El vector perpendicular a los dos es el producto vectorial.',
                'المستقيم في المستوى الأول، فاتجاهه عمودي على الناظم $\\vec{n}_1$. وهو في الثاني أيضًا: عمودي على $\\vec{n}_2$. والمتجه العمودي على الاثنين هو الجداء المتجهي.',
                'The line lies in the first plane, so its direction is perpendicular to the normal $\\vec{n}_1$. It also lies in the second: it is perpendicular to $\\vec{n}_2$. The vector perpendicular to both is the cross product.'
            )
        }
    },

    /* ---------- 2. Equations of a plane ---------- */
    'plane-parametric': {
        definitions: [
            { term: say('Plano baten norabideak', 'Vectores directores del plano', 'متجها توجيه المستوى', 'Direction vectors of a plane'), meaning: say('Planoaren paraleloak diren eta elkarren paraleloak ez diren bi bektore, $\\vec{u}$ eta $\\vec{v}$.', 'Dos vectores $\\vec{u}$ y $\\vec{v}$ paralelos al plano y no paralelos entre sí.', 'متجهان $\\vec{u}$ و$\\vec{v}$ موازيان للمستوى وغير متوازيين.', 'Two vectors $\\vec{u}$ and $\\vec{v}$ parallel to the plane and not parallel to each other.') }
        ],
        vocabulary: [
            say('bi parametro', 'dos parámetros', 'وسيطان', 'two parameters'),
            say('konbinazio lineala', 'combinación lineal', 'التركيب الخطي', 'linear combination')
        ],
        explanation: say(
            'Plano bat zehazteko, puntu bat eta paraleloak ez diren bi norabide behar dira. Planoko puntu guztiak $A$ puntutik $\\vec{u}$ eta $\\vec{v}$ bektoreen konbinazio lineal bat ibiliz lortzen dira: $\\lambda$ eta $\\mu$ bi parametro daude, zuzenak bat bakarrik zuen bitartean.',
            'Para fijar un plano hacen falta un punto y dos direcciones no paralelas. Todos los puntos del plano se alcanzan desde $A$ andando una combinación lineal de $\\vec{u}$ y $\\vec{v}$: hay dos parámetros, $\\lambda$ y $\\mu$, mientras que la recta tenía uno solo.',
            'لتحديد مستوى يلزم نقطة واتجاهان غير متوازيين. ونصل إلى كل نقاط المستوى من $A$ بالسير تركيبًا خطيًا لـ $\\vec{u}$ و$\\vec{v}$: هناك وسيطان $\\lambda$ و$\\mu$، بينما كان للمستقيم وسيط واحد.',
            'To fix a plane you need a point and two directions that are not parallel. Every point of the plane is reached from $A$ by walking a linear combination of $\\vec{u}$ and $\\vec{v}$: there are two parameters, $\\lambda$ and $\\mu$, while the line had only one.'
        ),
        examplePrompt: say('Planoa $(0,3,1)$ puntutik pasatzen da, $(2,0,1)$ eta $(1,-1,0)$ norabideekin. Zein puntu da $\\lambda=2$ eta $\\mu=1$ denean?', 'Un plano pasa por $(0,3,1)$ con direcciones $(2,0,1)$ y $(1,-1,0)$. ¿Qué punto da $\\lambda=2$, $\\mu=1$?', 'يمر مستوى بـ $(0,3,1)$ باتجاهين $(2,0,1)$ و$(1,-1,0)$. ما النقطة عند $\\lambda=2$ و$\\mu=1$؟', 'A plane passes through $(0,3,1)$ with directions $(2,0,1)$ and $(1,-1,0)$. Which point do $\\lambda=2$, $\\mu=1$ give?'),
        example: same('$(0+4+1,3+0-1,1+2+0)=(5,2,3)$'),
        exampleAnswer: say('$(5,2,3)$ puntua.', 'El punto $(5,2,3)$.', 'النقطة $(5,2,3)$.', 'The point $(5,2,3)$.')
    },
    'plane-general': {
        definitions: [
            { term: say('Bektore normala', 'Vector normal', 'المتجه الناظمي', 'Normal vector'), meaning: say('Planoarekiko perpendikularra den $\\vec{n}=(A,B,C)$ bektorea.', 'El vector $\\vec{n}=(A,B,C)$, perpendicular al plano.', 'المتجه $\\vec{n}=(A,B,C)$ العمودي على المستوى.', 'The vector $\\vec{n}=(A,B,C)$, perpendicular to the plane.') },
            { term: say('Ekuazio orokorra', 'Ecuación general', 'المعادلة العامة', 'General equation'), meaning: say('$Ax+By+C{z}+D=0$, $(A,B,C)$ normala izanik.', '$Ax+By+C{z}+D=0$, con $(A,B,C)$ el normal.', '$Ax+By+C{z}+D=0$ حيث $(A,B,C)$ الناظم.', '$Ax+By+C{z}+D=0$, with $(A,B,C)$ the normal.') }
        ],
        vocabulary: [
            say('perpendikularra', 'perpendicular', 'عمودي', 'perpendicular'),
            say('koefizienteak', 'coeficientes', 'المعاملات', 'coefficients')
        ],
        explanation: say(
            '$P(x,y,{z})$ puntua planoan dago $\\overrightarrow{AP}$ bektorea normalarekiko perpendikularra bada: $\\vec{n}\\cdot\\overrightarrow{AP}=0$. Garatuz, $Ax+By+C{z}+D=0$ ateratzen da: $x$, $y$ eta ${z}$ aldagaien koefizienteak normala dira. Normala bi norabideen biderkadura bektoriala da, eta $D$ puntu batekin aurkitzen da.',
            'El punto $P(x,y,{z})$ está en el plano si $\\overrightarrow{AP}$ es perpendicular al normal: $\\vec{n}\\cdot\\overrightarrow{AP}=0$. Al desarrollar sale $Ax+By+C{z}+D=0$: los coeficientes de $x$, $y$ y ${z}$ son el normal. El normal es el producto vectorial de las dos direcciones, y $D$ sale de un punto.',
            'تقع النقطة $P(x,y,{z})$ في المستوى إذا كان $\\overrightarrow{AP}$ عموديًا على الناظم: $\\vec{n}\\cdot\\overrightarrow{AP}=0$. وبالنشر نحصل على $Ax+By+C{z}+D=0$: معاملات $x$ و$y$ و${z}$ هي الناظم. والناظم هو الجداء المتجهي للاتجاهين، و$D$ يُحسب من نقطة.',
            'The point $P(x,y,{z})$ is on the plane if $\\overrightarrow{AP}$ is perpendicular to the normal: $\\vec{n}\\cdot\\overrightarrow{AP}=0$. Expanding gives $Ax+By+C{z}+D=0$: the coefficients of $x$, $y$ and ${z}$ are the normal. The normal is the cross product of the two directions, and $D$ comes from a point.'
        ),
        examplePrompt: say('Aurkitu $(2,-1,0)$ puntutik pasatzen den eta $(3,1,-2)$ normala duen planoa.', 'Halla el plano que pasa por $(2,-1,0)$ y tiene normal $(3,1,-2)$.', 'أوجد المستوى المار بـ $(2,-1,0)$ وناظمه $(3,1,-2)$.', 'Find the plane through $(2,-1,0)$ with normal $(3,1,-2)$.'),
        example: same('$6-1-0+D=0\\ \\to\\ D=-5$'),
        exampleAnswer: same('$3x+y-2{z}-5=0$'),
        why: {
            text: say(
                'Normala planoko bektore guztiekiko perpendikularra da; beraz, $P$ planoan dago $\\vec{n}\\cdot\\overrightarrow{AP}=0$ bada. Biderkadura eskalarra garatzean, $A(a_1,a_2,a_3)$ puntuaren zatia $D$ konstantean biltzen da.',
                'El normal es perpendicular a todos los vectores del plano, así que $P$ está en él si $\\vec{n}\\cdot\\overrightarrow{AP}=0$. Al desarrollar el producto escalar, la parte del punto $A(a_1,a_2,a_3)$ se junta en la constante $D$.',
                'الناظم عمودي على كل متجهات المستوى، فتقع $P$ فيه إذا كان $\\vec{n}\\cdot\\overrightarrow{AP}=0$. وعند نشر الجداء السلمي يجتمع جزء النقطة $A(a_1,a_2,a_3)$ في الثابت $D$.',
                'The normal is perpendicular to every vector of the plane, so $P$ is on it if $\\vec{n}\\cdot\\overrightarrow{AP}=0$. Expanding the dot product, the part of the point $A(a_1,a_2,a_3)$ gathers in the constant $D$.'
            ),
            math: same('$\\begin{gathered}A(x-a_1)+B(y-a_2)+C({z}-a_3)=0\\\\ \\to\\ D=-Aa_1-Ba_2-Ca_3\\end{gathered}$')
        }
    },
    'plane-three-points': {
        definitions: [
            { term: say('Lerrokatu gabeko puntuak', 'Puntos no alineados', 'نقاط ليست على استقامة واحدة', 'Non-collinear points'), meaning: say('Zuzen berean ez dauden hiru puntu: plano bakar bat zehazten dute.', 'Tres puntos que no están en una misma recta: fijan un único plano.', 'ثلاث نقاط ليست على مستقيم واحد: تحدد مستوى واحدًا.', 'Three points not on one line: they fix a single plane.') }
        ],
        vocabulary: [
            say('lerrokatuta', 'alineados', 'على استقامة', 'collinear'),
            say('zuzena', 'recta', 'المستقيم', 'line'),
            say('normala', 'normal', 'الناظم', 'normal')
        ],
        explanation: say(
            'Lerrokatuta ez dauden hiru puntutik plano bakar bat pasatzen da: $\\overrightarrow{AB}$ eta $\\overrightarrow{AC}$ bektoreak haren norabideak dira, eta haien biderkadura bektoriala normala. Zuzen batetik eta kanpoko puntu batetik pasatzen den planorako, berdin: zuzenaren norabidea eta zuzeneko puntu batetik kanpoko puntura doan bektorea.',
            'Por tres puntos no alineados pasa un único plano: $\\overrightarrow{AB}$ y $\\overrightarrow{AC}$ son sus direcciones y su producto vectorial, el normal. Para el plano que contiene una recta y un punto de fuera, igual: el director de la recta y el vector que va de un punto de la recta al de fuera.',
            'يمر بثلاث نقاط ليست على استقامة واحدة مستوى واحد: $\\overrightarrow{AB}$ و$\\overrightarrow{AC}$ اتجاهاه، وجداؤهما المتجهي الناظم. وللمستوى الذي يحوي مستقيمًا ونقطة خارجه الأمر نفسه: متجه توجيه المستقيم والمتجه من نقطة على المستقيم إلى النقطة الخارجية.',
            'Through three non-collinear points passes a single plane: $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are its directions and their cross product, the normal. For the plane holding a line and a point off it, the same: the direction of the line and the vector from a point of the line to the outside point.'
        ),
        examplePrompt: say('Aurkitu $r$: $(1,1,0)+t(1,0,2)$ zuzena eta $P(2,3,1)$ puntua dituen planoa.', 'Halla el plano que contiene a $r$: $(1,1,0)+t(1,0,2)$ y a $P(2,3,1)$.', 'أوجد المستوى الذي يحوي $r$: ‏$(1,1,0)+t(1,0,2)$ و$P(2,3,1)$.', 'Find the plane holding $r$: $(1,1,0)+t(1,0,2)$ and $P(2,3,1)$.'),
        example: same('$(1,0,2)\\times(1,2,1)=(-4,1,2)$'),
        exampleAnswer: same('$-4x+y+2{z}+3=0$'),
        why: {
            text: say(
                'Hiru puntu lerrokatuta badaude, $\\overrightarrow{AB}$ eta $\\overrightarrow{AC}$ paraleloak dira eta haien biderkadura bektoriala $\\vec{0}$ da: ez dago normalik, eta zuzen horretatik infinitu plano pasatzen dira.',
                'Si los tres puntos están alineados, $\\overrightarrow{AB}$ y $\\overrightarrow{AC}$ son paralelos y su producto vectorial es $\\vec{0}$: no hay normal, y por esa recta pasan infinitos planos.',
                'إذا كانت النقاط الثلاث على استقامة واحدة كان $\\overrightarrow{AB}$ و$\\overrightarrow{AC}$ متوازيين وجداؤهما المتجهي $\\vec{0}$: لا ناظم، ويمر بذلك المستقيم عدد لا نهائي من المستويات.',
                'If the three points are collinear, $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are parallel and their cross product is $\\vec{0}$: there is no normal, and infinitely many planes pass through that line.'
            )
        }
    },

    /* ---------- 3. Two lines ---------- */
    'lines-parallel': {
        definitions: [
            { term: say('Bat datozen zuzenak', 'Rectas coincidentes', 'المستقيمات المنطبقة', 'Coincident lines'), meaning: say('Zuzen bera dira, bi ekuaziorekin idatzita.', 'Son la misma recta escrita con dos ecuaciones.', 'هما المستقيم نفسه مكتوبًا بمعادلتين.', 'They are the same line written with two equations.') }
        ],
        vocabulary: [
            say('paraleloak', 'paralelas', 'متوازيان', 'parallel'),
            say('proportzionalak', 'proporcionales', 'متناسبة', 'proportional'),
            say('puntua', 'punto', 'النقطة', 'point')
        ],
        explanation: say(
            'Norabide-bektoreak proportzionalak badira, zuzenek norabide bera dute: paraleloak edo bat datozenak dira. Bereizteko, zuzen bateko puntu bat hartu eta bestean dagoen begiratzen da: badago, bat datoz; ez badago, paraleloak dira.',
            'Si los vectores directores son proporcionales, las rectas tienen la misma dirección: son paralelas o coincidentes. Para distinguirlas se toma un punto de una y se mira si está en la otra: si está, coinciden; si no, son paralelas.',
            'إذا تناسب متجها التوجيه كان للمستقيمين الاتجاه نفسه: فهما متوازيان أو منطبقان. وللتمييز نأخذ نقطة من أحدهما وننظر هل تقع على الآخر: إن وقعت فهما منطبقان، وإلا فمتوازيان.',
            'If the direction vectors are proportional, the lines have the same direction: they are parallel or coincident. To tell them apart, take a point of one and check whether it lies on the other: if it does, they coincide; if not, they are parallel.'
        ),
        examplePrompt: say('$r$: $(t,1+2t,-t)$ eta $s$: $(2,0,1)+\\lambda(-1,-2,1)$. Paraleloak ala bat datozenak?', '$r$: $(t,1+2t,-t)$ y $s$: $(2,0,1)+\\lambda(-1,-2,1)$. ¿Paralelas o coincidentes?', '$r$: ‏$(t,1+2t,-t)$ و$s$: ‏$(2,0,1)+\\lambda(-1,-2,1)$. متوازيان أم منطبقان؟', '$r$: $(t,1+2t,-t)$ and $s$: $(2,0,1)+\\lambda(-1,-2,1)$. Parallel or coincident?'),
        example: same('$(-1,-2,1)=-(1,2,-1)\\qquad t=2\\ \\to\\ (2,5,-2)\\neq(2,0,1)$'),
        exampleAnswer: say('Paraleloak: norabide bera, baina $(2,0,1)$ ez dago $r$ zuzenean.', 'Paralelas: la misma dirección, pero $(2,0,1)$ no está en $r$.', 'متوازيان: الاتجاه نفسه، لكن $(2,0,1)$ لا تقع على $r$.', 'Parallel: the same direction, but $(2,0,1)$ is not on $r$.')
    },
    'lines-cross': {
        definitions: [
            { term: say('Gurutzatzen diren zuzenak', 'Rectas que se cruzan', 'المستقيمات المتخالفة', 'Skew lines'), meaning: say('Paraleloak ez diren eta ebakitzen ez diren zuzenak: ez daude plano berean.', 'Rectas ni paralelas ni secantes: no están en un mismo plano.', 'مستقيمات غير متوازية وغير متقاطعة: ليست في مستوى واحد.', 'Lines that are neither parallel nor intersecting: they are not in one plane.') },
            { term: say('Zuzen ebakitzaileak', 'Rectas secantes', 'المستقيمات المتقاطعة', 'Intersecting lines'), meaning: say('Puntu bakar batean ebakitzen diren zuzenak.', 'Rectas que se cortan en un solo punto.', 'مستقيمات تتقاطع في نقطة واحدة.', 'Lines that meet at a single point.') }
        ],
        vocabulary: [
            say('biderkadura mistoa', 'producto mixto', 'الجداء المختلط', 'scalar triple product'),
            say('planokideak', 'coplanarios', 'مستوية', 'coplanar')
        ],
        explanation: say(
            'Norabideak paraleloak ez badira, bi aukera daude. Zuzenak plano berean badaude, ebakitzaileak dira; bestela, gurutzatu egiten dira. Plano berean daude $\\overrightarrow{AB}$, $\\vec{u}$ eta $\\vec{v}$ planokideak badira, hau da, haien biderkadura mistoa 0 bada.',
            'Si las direcciones no son paralelas, hay dos posibilidades. Si las rectas están en un mismo plano, son secantes; si no, se cruzan. Están en un plano si $\\overrightarrow{AB}$, $\\vec{u}$ y $\\vec{v}$ son coplanarios, es decir, si su producto mixto es 0.',
            'إذا لم يتوازَ الاتجاهان فهناك احتمالان. إذا كان المستقيمان في مستوى واحد فهما متقاطعان، وإلا فهما متخالفان. ويكونان في مستوى واحد إذا كانت $\\overrightarrow{AB}$ و$\\vec{u}$ و$\\vec{v}$ مستوية، أي إذا كان جداؤها المختلط 0.',
            'If the directions are not parallel, there are two possibilities. If the lines lie in one plane, they intersect; if not, they are skew. They lie in one plane if $\\overrightarrow{AB}$, $\\vec{u}$ and $\\vec{v}$ are coplanar, that is, if their scalar triple product is 0.'
        ),
        examplePrompt: say('$r$: $(2,0,3)+t(1,2,0)$ eta $s$: $(5,3,4)+\\lambda(1,-1,1)$. Ebakitzen dira ala gurutzatzen?', '$r$: $(2,0,3)+t(1,2,0)$ y $s$: $(5,3,4)+\\lambda(1,-1,1)$. ¿Se cortan o se cruzan?', '$r$: ‏$(2,0,3)+t(1,2,0)$ و$s$: ‏$(5,3,4)+\\lambda(1,-1,1)$. هل يتقاطعان أم يتخالفان؟', '$r$: $(2,0,3)+t(1,2,0)$ and $s$: $(5,3,4)+\\lambda(1,-1,1)$. Do they intersect or are they skew?'),
        example: same('$\\begin{vmatrix}3&3&1\\\\1&2&0\\\\1&-1&1\\end{vmatrix}=6+0-1-2-0-3=0$'),
        exampleAnswer: say('Ebakitzen dira: biderkadura mistoa 0 da eta norabideak ez dira paraleloak.', 'Se cortan: el producto mixto es 0 y las direcciones no son paralelas.', 'يتقاطعان: الجداء المختلط 0 والاتجاهان غير متوازيين.', 'They intersect: the scalar triple product is 0 and the directions are not parallel.'),
        why: {
            text: say(
                'Bi zuzen ebakitzen badira, $A$, $B$ eta ebaki-puntua plano batean daude, eta $\\overrightarrow{AB}$, $\\vec{u}$ eta $\\vec{v}$ bektoreak plano horretan: haien kutxa zapalduta dago. Gurutzatzen badira, ez dago bientzako planorik, eta kutxak bolumena du.',
                'Si dos rectas se cortan, $A$, $B$ y el punto de corte están en un plano, y $\\overrightarrow{AB}$, $\\vec{u}$ y $\\vec{v}$ en ese plano: su caja está aplastada. Si se cruzan, no hay un plano para las dos, y la caja tiene volumen.',
                'إذا تقاطع مستقيمان كانت $A$ و$B$ ونقطة التقاطع في مستوى، و$\\overrightarrow{AB}$ و$\\vec{u}$ و$\\vec{v}$ في ذلك المستوى: صندوقها منضغط. وإذا تخالفا فلا مستوى يجمعهما، وللصندوق حجم.',
                'If two lines meet, $A$, $B$ and the meeting point are in one plane, and $\\overrightarrow{AB}$, $\\vec{u}$ and $\\vec{v}$ lie in that plane: their box is flat. If they are skew, there is no plane for both, and the box has a volume.'
            )
        }
    },
    'lines-intersection': {
        definitions: [
            { term: say('Ebaki-puntua', 'Punto de corte', 'نقطة التقاطع', 'Meeting point'), meaning: say('Bi zuzenek komunean duten puntua: bien ekuazioak betetzen ditu.', 'El punto que tienen en común dos rectas: cumple las ecuaciones de las dos.', 'النقطة المشتركة بين مستقيمين: تحقق معادلات كليهما.', 'The point two lines have in common: it satisfies the equations of both.') }
        ],
        vocabulary: [
            say('parametroa', 'parámetro', 'الوسيط', 'parameter'),
            say('ekuazioa', 'ecuación', 'المعادلة', 'equation')
        ],
        explanation: say(
            'Ebaki-puntua aurkitzeko, bi zuzenen parametrikoak berdintzen dira, parametro desberdinekin ($t$ eta $\\lambda$). Hiru ekuazio eta bi ezezagun daude: bi ekuaziorekin $t$ eta $\\lambda$ ateratzen dira, eta hirugarrenak bete behar du. Gero, $t$ zuzen batean ordezkatzen da.',
            'Para el punto de corte se igualan las paramétricas de las dos rectas, con parámetros distintos ($t$ y $\\lambda$). Hay tres ecuaciones y dos incógnitas: con dos se sacan $t$ y $\\lambda$, y la tercera tiene que cumplirse. Después, $t$ se sustituye en su recta.',
            'لإيجاد نقطة التقاطع نساوي المعادلات الوسيطية للمستقيمين بوسيطين مختلفين ($t$ و$\\lambda$). هناك ثلاث معادلات ومجهولان: من اثنتين نستخرج $t$ و$\\lambda$، ويجب أن تتحقق الثالثة. ثم نعوّض $t$ في مستقيمه.',
            'For the meeting point, set the parametric equations of the two lines equal, with different parameters ($t$ and $\\lambda$). There are three equations and two unknowns: two give $t$ and $\\lambda$, and the third has to hold. Then put $t$ into its line.'
        ),
        examplePrompt: say('Non ebakitzen dira $r$: $(t,2t,3)$ eta $s$: $(2,7,3)+\\lambda(0,3,0)$?', '¿Dónde se cortan $r$: $(t,2t,3)$ y $s$: $(2,7,3)+\\lambda(0,3,0)$?', 'أين يتقاطع $r$: ‏$(t,2t,3)$ و$s$: ‏$(2,7,3)+\\lambda(0,3,0)$؟', 'Where do $r$: $(t,2t,3)$ and $s$: $(2,7,3)+\\lambda(0,3,0)$ meet?'),
        example: same('$t=2\\qquad 7+3\\lambda=4\\ \\to\\ \\lambda=-1\\qquad 3=3$'),
        exampleAnswer: say('$(2,4,3)$ puntuan.', 'En el punto $(2,4,3)$.', 'في النقطة $(2,4,3)$.', 'At the point $(2,4,3)$.')
    },

    /* ---------- 4. A line and a plane ---------- */
    'line-plane-position': {
        definitions: [
            { term: say('Zuzena planoan dago', 'Recta contenida', 'مستقيم محتوى', 'Line in the plane'), meaning: say('Zuzeneko puntu guztiak planoan daude.', 'Todos los puntos de la recta están en el plano.', 'كل نقاط المستقيم في المستوى.', 'Every point of the line is on the plane.') }
        ],
        vocabulary: [
            say('biderkadura eskalarra', 'producto escalar', 'الجداء السلمي', 'dot product'),
            say('ebakitzailea', 'secante', 'قاطع', 'secant'),
            say('paraleloa', 'paralela', 'موازٍ', 'parallel')
        ],
        explanation: say(
            'Zuzenaren $\\vec{u}$ norabidea eta planoaren $\\vec{n}$ normala biderkadura eskalarrarekin konparatzen dira. $\\vec{u}\\cdot\\vec{n}\\neq 0$ bada, zuzena ebakitzailea da: planoa puntu batean zeharkatzen du. $\\vec{u}\\cdot\\vec{n}=0$ bada, zuzena planoaren paraleloa da edo planoan dago: zuzeneko puntu bat planoan dagoen begiratzen da.',
            'Se comparan con el producto escalar la dirección $\\vec{u}$ de la recta y el normal $\\vec{n}$ del plano. Si $\\vec{u}\\cdot\\vec{n}\\neq 0$, la recta es secante: atraviesa el plano en un punto. Si $\\vec{u}\\cdot\\vec{n}=0$, la recta es paralela al plano o está contenida en él: se mira si un punto de la recta está en el plano.',
            'نقارن بالجداء السلمي اتجاه المستقيم $\\vec{u}$ وناظم المستوى $\\vec{n}$. إذا كان $\\vec{u}\\cdot\\vec{n}\\neq 0$ فالمستقيم قاطع: يخترق المستوى في نقطة. وإذا كان $\\vec{u}\\cdot\\vec{n}=0$ فالمستقيم موازٍ للمستوى أو محتوى فيه: ننظر هل تقع نقطة من المستقيم في المستوى.',
            'Compare, with the dot product, the direction $\\vec{u}$ of the line and the normal $\\vec{n}$ of the plane. If $\\vec{u}\\cdot\\vec{n}\\neq 0$, the line is secant: it goes through the plane at a point. If $\\vec{u}\\cdot\\vec{n}=0$, the line is parallel to the plane or lies in it: check whether a point of the line is on the plane.'
        ),
        examplePrompt: say('$r$: $(2,1,0)+t(1,-1,1)$ eta $\\pi$: $2x+y-{z}=1$. Zer posizio dute?', '$r$: $(2,1,0)+t(1,-1,1)$ y $\\pi$: $2x+y-{z}=1$. ¿Qué posición tienen?', '$r$: ‏$(2,1,0)+t(1,-1,1)$ و$\\pi$: ‏$2x+y-{z}=1$. ما وضعهما؟', '$r$: $(2,1,0)+t(1,-1,1)$ and $\\pi$: $2x+y-{z}=1$. What is their position?'),
        example: same('$\\vec{u}\\cdot\\vec{n}=2-1-1=0\\qquad 4+1-0=5\\neq 1$'),
        exampleAnswer: say('Paraleloa: ez du planoa ukitzen.', 'Paralela: no toca el plano.', 'موازٍ: لا يلمس المستوى.', 'Parallel: it does not touch the plane.')
    },
    'line-plane-point': {
        definitions: [
            { term: say('Ordezkapena', 'Sustitución', 'التعويض', 'Substitution'), meaning: say('Zuzenaren parametrikoak planoaren ekuazioan sartzea: $t$ ezezaguna duen ekuazio bat geratzen da.', 'Meter las paramétricas de la recta en la ecuación del plano: queda una ecuación en $t$.', 'إدخال المعادلات الوسيطية للمستقيم في معادلة المستوى: تبقى معادلة في $t$.', 'Putting the parametric equations of the line into the equation of the plane: an equation in $t$ is left.') }
        ],
        vocabulary: [
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'meeting point'),
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown')
        ],
        explanation: say(
            'Zuzeneko puntu bakoitza $t$ parametroaren funtzioan dago. Parametrikoak planoaren ekuazioan ordezkatuz, $t$ ezezaguneko lehen graduko ekuazio bat geratzen da. Soluzio bakarra badu, $t$ hori zuzenean ordezkatu eta ebaki-puntua ateratzen da; soluziorik ez badu, paraleloa da; beti betetzen bada, zuzena planoan dago.',
            'Cada punto de la recta depende del parámetro $t$. Sustituyendo las paramétricas en la ecuación del plano queda una ecuación de primer grado en la incógnita $t$. Si tiene una solución, ese $t$ en la recta da el punto de corte; si no tiene, es paralela; si se cumple siempre, la recta está en el plano.',
            'كل نقطة من المستقيم تتعلق بالوسيط $t$. وبتعويض المعادلات الوسيطية في معادلة المستوى تبقى معادلة من الدرجة الأولى في المجهول $t$. إن كان لها حل واحد فإن $t$ هذا في المستقيم يعطي نقطة التقاطع؛ وإن لم يكن لها حل فهو موازٍ؛ وإن تحققت دائمًا فالمستقيم في المستوى.',
            'Each point of the line depends on the parameter $t$. Putting the parametric equations into the equation of the plane leaves a first-degree equation in the unknown $t$. If it has one solution, that $t$ in the line gives the meeting point; if it has none, the line is parallel; if it always holds, the line lies in the plane.'
        ),
        examplePrompt: say('Non ebakitzen du $r$: $(2t,1+t,2-t)$ zuzenak $\\pi$: $x+y+{z}=9$ planoa?', '¿Dónde corta $r$: $(2t,1+t,2-t)$ al plano $\\pi$: $x+y+{z}=9$?', 'أين يقطع $r$: ‏$(2t,1+t,2-t)$ المستوى $\\pi$: ‏$x+y+{z}=9$؟', 'Where does $r$: $(2t,1+t,2-t)$ meet the plane $\\pi$: $x+y+{z}=9$?'),
        example: same('$2t+1+t+2-t=9\\ \\to\\ 2t=6\\ \\to\\ t=3$'),
        exampleAnswer: say('$(6,4,-1)$ puntuan.', 'En el punto $(6,4,-1)$.', 'في النقطة $(6,4,-1)$.', 'At the point $(6,4,-1)$.')
    },
    'pencil-planes': {
        definitions: [
            { term: say('Plano-sorta', 'Haz de planos', 'حزمة المستويات', 'Pencil of planes'), meaning: say('Zuzen bat duten plano guztiak: $\\pi_1+k\\,\\pi_2=0$, eta $\\pi_2$ bera.', 'Todos los planos que contienen una recta: $\\pi_1+k\\,\\pi_2=0$, y el propio $\\pi_2$.', 'كل المستويات التي تحوي مستقيمًا: $\\pi_1+k\\,\\pi_2=0$، و$\\pi_2$ نفسه.', 'All the planes holding a line: $\\pi_1+k\\,\\pi_2=0$, and $\\pi_2$ itself.') }
        ],
        vocabulary: [
            say('zuzena', 'recta', 'المستقيم', 'line'),
            say('parametroa', 'parámetro', 'الوسيط', 'parameter')
        ],
        explanation: say(
            'Zuzena bi planoren ebaki gisa emanda badago, $\\pi_1=0$ eta $\\pi_2=0$, $\\pi_1+k\\,\\pi_2=0$ plano guztiek ere zuzena dute: zuzeneko puntuetan bi zatiak 0 dira. Baldintza bat duen planoa (puntu batetik pasatzea) aurkitzeko, $k$ parametroa kalkulatzen da.',
            'Si la recta viene como corte de dos planos, $\\pi_1=0$ y $\\pi_2=0$, todos los planos $\\pi_1+k\\,\\pi_2=0$ la contienen también: en los puntos de la recta las dos partes valen 0. Para el plano que cumple una condición (pasar por un punto), se calcula el parámetro $k$.',
            'إذا أُعطي المستقيم تقاطعًا لمستويين $\\pi_1=0$ و$\\pi_2=0$ فإن كل المستويات $\\pi_1+k\\,\\pi_2=0$ تحويه أيضًا: في نقاط المستقيم يكون الجزآن 0. ولإيجاد المستوى الذي يحقق شرطًا (المرور بنقطة) نحسب الوسيط $k$.',
            'If the line is given as the meeting of two planes, $\\pi_1=0$ and $\\pi_2=0$, every plane $\\pi_1+k\\,\\pi_2=0$ holds it too: at the points of the line both parts are 0. For the plane that meets a condition (passing through a point), work out the parameter $k$.'
        ),
        examplePrompt: say('Aurkitu $r$: $x=2$, ${z}=1$ zuzena duen eta jatorritik pasatzen den planoa.', 'Halla el plano que contiene a $r$: $x=2$, ${z}=1$ y pasa por el origen.', 'أوجد المستوى الذي يحوي $r$: ‏$x=2$ و${z}=1$ ويمر بالأصل.', 'Find the plane holding $r$: $x=2$, ${z}=1$ and passing through the origin.'),
        example: same('$(0-2)+k\\,(0-1)=0\\ \\to\\ k=-2$'),
        exampleAnswer: same('$x-2-2({z}-1)=0\\ \\to\\ x-2{z}=0$')
    },

    /* ---------- 5. Position of planes ---------- */
    'two-planes': {
        definitions: [
            { term: say('Plano paraleloak', 'Planos paralelos', 'المستويات المتوازية', 'Parallel planes'), meaning: say('Normal proportzionalak dituzten eta puntu komunik ez duten planoak.', 'Planos con normales proporcionales y sin puntos comunes.', 'مستويات ناظماتها متناسبة ولا نقاط مشتركة لها.', 'Planes with proportional normals and no common point.') }
        ],
        vocabulary: [
            say('normala', 'normal', 'الناظم', 'normal'),
            say('proportzionalak', 'proporcionales', 'متناسبة', 'proportional'),
            say('ebakitzaileak', 'secantes', 'متقاطعة', 'secant')
        ],
        explanation: say(
            'Bi planoren normalak proportzionalak ez badira, planoak ebakitzaileak dira eta zuzen batean ebakitzen dute elkar. Proportzionalak badira, paraleloak edo bat datozenak dira: $D$ ere proportzio berean badago, plano bera da; bestela, paraleloak.',
            'Si los normales de dos planos no son proporcionales, los planos son secantes y se cortan en una recta. Si son proporcionales, son paralelos o coincidentes: si también $D$ va en la misma proporción, es el mismo plano; si no, son paralelos.',
            'إذا لم يتناسب ناظما مستويين كانا متقاطعين وتقاطعا في مستقيم. وإذا تناسبا فهما متوازيان أو منطبقان: إن كان $D$ أيضًا بالتناسب نفسه فهو المستوى نفسه؛ وإلا فمتوازيان.',
            'If the normals of two planes are not proportional, the planes are secant and meet in a line. If they are proportional, the planes are parallel or coincident: if $D$ is also in the same proportion, it is the same plane; if not, they are parallel.'
        ),
        examplePrompt: say('$\\pi_1$: $x+y-{z}=2$ eta $\\pi_2$: $2x+2y-2{z}=4$. Nolakoak dira?', '$\\pi_1$: $x+y-{z}=2$ y $\\pi_2$: $2x+2y-2{z}=4$. ¿Cómo son?', '$\\pi_1$: ‏$x+y-{z}=2$ و$\\pi_2$: ‏$2x+2y-2{z}=4$. ما وضعهما؟', '$\\pi_1$: $x+y-{z}=2$ and $\\pi_2$: $2x+2y-2{z}=4$. How are they?'),
        example: same('$\\frac{2}{1}=\\frac{2}{1}=\\frac{-2}{-1}=\\frac{4}{2}=2$'),
        exampleAnswer: say('Bat datoz: dena bider 2.', 'Coincidentes: todo multiplicado por 2.', 'منطبقان: الكل مضروب في 2.', 'Coincident: everything times 2.')
    },
    'three-planes': {
        definitions: [
            { term: say('Koefizienteen matrizea', 'Matriz de coeficientes', 'مصفوفة المعاملات', 'Coefficient matrix'), meaning: say('$M$: hiru normalak errenkadetan. $M^*$: gainera, gai askeak.', '$M$: los tres normales en filas. $M^*$: además, los términos independientes.', '$M$: الناظمات الثلاثة صفوفًا. $M^*$: ومعها الحدود الثابتة.', '$M$: the three normals as rows. $M^*$: the constant terms too.') }
        ],
        vocabulary: [
            say('heina', 'rango', 'الرتبة', 'rank'),
            say('sistema', 'sistema', 'النظام', 'system'),
            say('puntu komuna', 'punto común', 'نقطة مشتركة', 'common point')
        ],
        explanation: say(
            'Hiru planoen puntu komunak haien ekuazioen sistemaren soluzioak dira. $\\operatorname{rg}M=3$ bada, puntu bakar batean ebakitzen dira. $\\operatorname{rg}M=\\operatorname{rg}M^*=2$ bada, zuzen batean. $\\operatorname{rg}M^*$ heina $\\operatorname{rg}M$ baino handiagoa bada, ez dute puntu komunik.',
            'Los puntos comunes de tres planos son las soluciones del sistema de sus ecuaciones. Si $\\operatorname{rg}M=3$, se cortan en un solo punto. Si $\\operatorname{rg}M=\\operatorname{rg}M^*=2$, en una recta. Si $\\operatorname{rg}M^*$ es mayor que $\\operatorname{rg}M$, no tienen ningún punto común.',
            'النقاط المشتركة لثلاثة مستويات هي حلول نظام معادلاتها. إذا كان $\\operatorname{rg}M=3$ تقاطعت في نقطة واحدة. وإذا كان $\\operatorname{rg}M=\\operatorname{rg}M^*=2$ ففي مستقيم. وإذا كانت $\\operatorname{rg}M^*$ أكبر من $\\operatorname{rg}M$ فلا نقطة مشتركة لها.',
            'The common points of three planes are the solutions of the system of their equations. If $\\operatorname{rg}M=3$, they meet at a single point. If $\\operatorname{rg}M=\\operatorname{rg}M^*=2$, in a line. If $\\operatorname{rg}M^*$ is greater than $\\operatorname{rg}M$, they have no common point.'
        ),
        examplePrompt: say('Nola ebakitzen dute elkar $x+y=1$, $y+{z}=1$ eta $x+2y+{z}=2$ planoek?', '¿Cómo se cortan los planos $x+y=1$, $y+{z}=1$ y $x+2y+{z}=2$?', 'كيف تتقاطع المستويات $x+y=1$ و$y+{z}=1$ و$x+2y+{z}=2$؟', 'How do the planes $x+y=1$, $y+{z}=1$ and $x+2y+{z}=2$ meet?'),
        example: same('$\\pi_3=\\pi_1+\\pi_2\\qquad\\operatorname{rg}M=\\operatorname{rg}M^*=2$'),
        exampleAnswer: say('Zuzen batean: hirugarrena beste bien batura da.', 'En una recta: el tercero es la suma de los otros dos.', 'في مستقيم: الثالث مجموع الآخرين.', 'In a line: the third is the sum of the other two.'),
        why: {
            text: say(
                'Heinak esaten du zenbat ekuazio independente dauden. Hiru badira, hiru ezezagunak zehazten dira: puntu bat. Bi badira eta sistema bateragarria bada, ezezagun bat aske geratzen da: zuzen bat. $M^*$ handiagoa bada, ekuazioak kontraesanean daude.',
                'El rango dice cuántas ecuaciones son independientes. Si son tres, fijan las tres incógnitas: un punto. Si son dos y el sistema es compatible, queda una incógnita libre: una recta. Si $M^*$ tiene más rango, las ecuaciones se contradicen.',
                'تدل الرتبة على عدد المعادلات المستقلة. إذا كانت ثلاثًا حددت المجاهيل الثلاثة: نقطة. وإذا كانت اثنتين والنظام متوافقًا بقي مجهول حر: مستقيم. وإذا كانت رتبة $M^*$ أكبر تناقضت المعادلات.',
                'The rank tells how many equations are independent. If three, they fix the three unknowns: a point. If two and the system has solutions, one unknown is free: a line. If $M^*$ has a greater rank, the equations contradict each other.'
            )
        }
    },
    'planes-parameter': {
        definitions: [
            { term: say('Kasu berezia', 'Caso especial', 'الحالة الخاصة', 'Special case'), meaning: say('$\\det M=0$ egiten duen parametroaren balioa: han aldatzen da posizioa.', 'El valor del parámetro que hace $\\det M=0$: ahí cambia la posición.', 'قيمة الوسيط التي تجعل $\\det M=0$: هناك يتغير الوضع.', 'The value of the parameter that makes $\\det M=0$: that is where the position changes.') }
        ],
        vocabulary: [
            say('determinantea', 'determinante', 'المحدد', 'determinant'),
            say('heina', 'rango', 'الرتبة', 'rank')
        ],
        explanation: say(
            'Parametro bat badago, lehenik $\\det M$ kalkulatzen da. Parametroaren balio gehienetan ez da 0: hiru planoek puntu batean ebakitzen dute elkar. $\\det M=0$ egiten duten balioetan, $\\operatorname{rg}M$ eta $\\operatorname{rg}M^*$ konparatzen dira, zuzen bat ala ezer ez dagoen jakiteko.',
            'Si hay un parámetro, primero se calcula $\\det M$. Para casi todos los valores del parámetro no es 0: los tres planos se cortan en un punto. En los valores que hacen $\\det M=0$ se comparan $\\operatorname{rg}M$ y $\\operatorname{rg}M^*$ para saber si hay una recta o nada.',
            'إذا وُجد وسيط نحسب أولًا $\\det M$. ولمعظم قيم الوسيط لا يساوي 0: تتقاطع المستويات الثلاثة في نقطة. وفي القيم التي تجعل $\\det M=0$ نقارن $\\operatorname{rg}M$ و$\\operatorname{rg}M^*$ لنعرف هل هناك مستقيم أم لا شيء.',
            'If there is a parameter, first work out $\\det M$. For almost every value of the parameter it is not 0: the three planes meet at a point. For the values that make $\\det M=0$, compare $\\operatorname{rg}M$ and $\\operatorname{rg}M^*$ to know whether there is a line or nothing.'
        ),
        examplePrompt: say('Zer gertatzen da $x+y=2$, $y+{z}=1$ eta $x+a{z}=3$ planoekin $a=-1$ denean?', '¿Qué pasa con $x+y=2$, $y+{z}=1$ y $x+a{z}=3$ si $a=-1$?', 'ماذا يحدث للمستويات $x+y=2$ و$y+{z}=1$ و$x+a{z}=3$ عندما $a=-1$؟', 'What happens to $x+y=2$, $y+{z}=1$ and $x+a{z}=3$ when $a=-1$?'),
        example: same('$\\det M=a+1=0\\qquad\\operatorname{rg}M=2,\\ \\operatorname{rg}M^*=3$'),
        exampleAnswer: say('Ez dute puntu komunik: lehena ken bigarrena $x-{z}=1$ da, eta hirugarrena $x-{z}=3$.', 'No tienen ningún punto común: la primera menos la segunda es $x-{z}=1$, y la tercera, $x-{z}=3$.', 'لا نقطة مشتركة لها: الأولى ناقص الثانية $x-{z}=1$، والثالثة $x-{z}=3$.', 'They have no common point: the first minus the second is $x-{z}=1$, and the third is $x-{z}=3$.')
    }
}

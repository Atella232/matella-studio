import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Mugimenduak · 3. DBH — the typical mistake and the «Check it» question
   of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The mistakes are the ones the
   lessons already had; the questions use new numbers, never those of
   «Let's solve» or of the example, and one of their wrong answers is the
   lesson's typical mistake. Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type Motions3TopicId = 'vector-components' | 'vector-modulus' | 'vector-sum' | 'translation' | 'translation-coordinates' | 'translation-composition' | 'rotation' | 'rotation-coordinates' | 'central-symmetry' | 'axial-symmetry' | 'reflection-coordinates' | 'two-mirrors' | 'friezes' | 'tessellations' | 'homothety'

export const motions3LessonChecks: Record<Motions3TopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'vector-components': {
        mistake: {
            wrong: say('$\\vec{AB}$ = jatorria ken muturra: $(1-5,\\ 1-4)$.', '$\\vec{AB}$ = origen menos extremo: $(1-5,\\ 1-4)$.', '$\\vec{AB}$ = البداية ناقص النهاية: $(1-5,\\ 1-4)$.', '$\\vec{AB}$ = start minus end: $(1-5,\\ 1-4)$.'),
            right: say('Hori $\\vec{BA}$ da, aurkako noranzkoan. $\\vec{AB}$: muturra ken jatorria, $(4,3)$.', 'Eso es $\\vec{BA}$, en sentido contrario. $\\vec{AB}$: extremo menos origen, $(4,3)$.', 'هذا $\\vec{BA}$ بالمنحى المعاكس. $\\vec{AB}$: النهاية ناقص البداية، $(4,3)$.', 'That is $\\vec{BA}$, the opposite way. $\\vec{AB}$: end minus start, $(4,3)$.')
        },
        check: {
            prompt: say('$A=(2,6)$ eta $B=(7,1)$. Zein dira $\\vec{AB}$ bektorearen osagaiak?', '$A=(2,6)$ y $B=(7,1)$. ¿Cuáles son las componentes de $\\vec{AB}$?', '$A=(2,6)$ و$B=(7,1)$. ما مركّبتا $\\vec{AB}$؟', '$A=(2,6)$ and $B=(7,1)$. What are the components of $\\vec{AB}$?'),
            options: [same('$(-5,5)$'), same('$(5,-5)$'), same('$(9,7)$')],
            correctIndex: 1,
            explanation: say('Mutur ken jatorria: $(7-2,\\ 1-6)=(5,-5)$. $(-5,5)$ bektorea $\\vec{BA}$ da.', 'Extremo menos origen: $(7-2,\\ 1-6)=(5,-5)$. $(-5,5)$ es $\\vec{BA}$.', 'النهاية ناقص البداية: $(7-2,\\ 1-6)=(5,-5)$. أما $(-5,5)$ فهو $\\vec{BA}$.', 'End minus start: $(7-2,\\ 1-6)=(5,-5)$. $(-5,5)$ is $\\vec{BA}$.')
        }
    },
    'vector-modulus': {
        mistake: {
            wrong: say('$|(-6,8)|=-6+8=2$', '$|(-6,8)|=-6+8=2$', '$|(-6,8)|=-6+8=2$', '$|(-6,8)|=-6+8=2$'),
            right: say('Osagaiak ez dira batzen: haien karratuak batu eta erroa atera, $\\sqrt{36+64}=10$.', 'Las componentes no se suman: se suman sus cuadrados y se saca la raíz, $\\sqrt{36+64}=10$.', 'لا تُجمع المركّبتان: نجمع مربعيهما ونأخذ الجذر، $\\sqrt{36+64}=10$.', 'The components are not added: add their squares and take the root, $\\sqrt{36+64}=10$.')
        },
        check: {
            prompt: say('Zein da $(5,-12)$ bektorearen modulua?', '¿Cuál es el módulo de $(5,-12)$?', 'ما طول المتجه $(5,-12)$؟', 'What is the length of $(5,-12)$?'),
            options: [same('$-7$'), same('$13$'), same('$17$')],
            correctIndex: 1,
            explanation: say('Ez dira osagaiak batzen, haien karratuak baizik: $\\sqrt{25+144}=\\sqrt{169}=13$.', 'No se suman las componentes, sino sus cuadrados: $\\sqrt{25+144}=\\sqrt{169}=13$.', 'لا نجمع المركّبتين بل مربعيهما: $\\sqrt{25+144}=\\sqrt{169}=13$.', 'You do not add the components, but their squares: $\\sqrt{25+144}=\\sqrt{169}=13$.')
        }
    },
    'vector-sum': {
        mistake: {
            wrong: say('$|\\vec{u}+\\vec{v}|=|\\vec{u}|+|\\vec{v}|$ beti.', 'Siempre $|\\vec{u}+\\vec{v}|=|\\vec{u}|+|\\vec{v}|$.', 'دائمًا $|\\vec{u}+\\vec{v}|=|\\vec{u}|+|\\vec{v}|$.', 'Always $|\\vec{u}+\\vec{v}|=|\\vec{u}|+|\\vec{v}|$.'),
            right: say('Norabide berean daudenean bakarrik. Bestela, batura laburragoa da: $|(4,4)|\\approx 5{,}66<3{,}16+3{,}16$.', 'Solo cuando van en la misma dirección. Si no, la suma es más corta: $|(4,4)|\\approx 5{,}66<3{,}16+3{,}16$.', 'فقط عندما يكونان بالاتجاه نفسه. وإلا فالمجموع أقصر: $|(4,4)|\\approx 5{,}66<3{,}16+3{,}16$.', 'Only when they point the same way. Otherwise the sum is shorter: $|(4,4)|\\approx 5{,}66<3{,}16+3{,}16$.')
        },
        check: {
            prompt: say('Zenbat da $(3,-1)+(-5,4)$?', '¿Cuánto es $(3,-1)+(-5,4)$?', 'كم يساوي $(3,-1)+(-5,4)$؟', 'What is $(3,-1)+(-5,4)$?'),
            options: [same('$(-2,3)$'), same('$(8,-5)$'), same('$(-15,-4)$')],
            correctIndex: 0,
            explanation: say('Osagaiak batu: $(3-5,\\ -1+4)=(-2,3)$.', 'Suma las componentes: $(3-5,\\ -1+4)=(-2,3)$.', 'اجمع المركّبات: $(3-5,\\ -1+4)=(-2,3)$.', 'Add the components: $(3-5,\\ -1+4)=(-2,3)$.')
        }
    },
    translation: {
        mistake: {
            wrong: say('Lekualdaketa batean irudia biratu egiten da bektorearen norabidean.', 'En una traslación la figura gira hacia la dirección del vector.', 'في الانسحاب يدور الشكل نحو اتجاه المتجه.', 'In a translation the shape turns towards the direction of the vector.'),
            right: say('Ez da biratzen: puntu guztiek mugimendu bera egiten dute, eta orientazioa ez da aldatzen.', 'No gira: todos los puntos se mueven igual y la orientación no cambia.', 'لا يدور: تتحرك كل النقاط بالطريقة نفسها ولا يتغيّر الوضع.', 'It does not turn: every point moves the same way and the orientation stays.')
        },
        check: {
            prompt: say('Lekualdaketa batean, zer gertatzen zaio irudiaren orientazioari?', 'En una traslación, ¿qué le pasa a la orientación de la figura?', 'في الانسحاب، ماذا يحدث لاتجاه الشكل؟', 'In a translation, what happens to the orientation of the figure?'),
            options: [say('Bektorearen norabidera biratzen da', 'Gira hacia la dirección del vector', 'يدور نحو اتجاه المتجه', 'It turns towards the vector'), say('Ez da aldatzen', 'No cambia', 'لا يتغير', 'It does not change'), say('Irauli egiten da', 'Se da la vuelta', 'ينقلب', 'It flips over')],
            correctIndex: 1,
            explanation: say('Puntu guztiak berdin mugitzen dira: irudia ez da biratzen ezta iraultzen.', 'Todos los puntos se mueven igual: la figura ni gira ni se da la vuelta.', 'تتحرك كل النقاط بالطريقة نفسها: الشكل لا يدور ولا ينقلب.', 'Every point moves the same way: the figure neither turns nor flips.')
        }
    },
    'translation-coordinates': {
        mistake: {
            wrong: say('$(4,-1)$ bektorearekin: $(2,3)\\to(2-4,\\ 3+1)$.', 'Con el vector $(4,-1)$: $(2,3)\\to(2-4,\\ 3+1)$.', 'بالمتجه $(4,-1)$: $(2,3)\\to(2-4,\\ 3+1)$.', 'With the vector $(4,-1)$: $(2,3)\\to(2-4,\\ 3+1)$.'),
            right: say('Osagaiak zeinuarekin batzen dira: $(2+4,\\ 3-1)=(6,2)$.', 'Las componentes se suman con su signo: $(2+4,\\ 3-1)=(6,2)$.', 'تُجمع المركّبتان بإشارتيهما: $(2+4,\\ 3-1)=(6,2)$.', 'The components are added with their signs: $(2+4,\\ 3-1)=(6,2)$.')
        },
        check: {
            prompt: say('Zein bektorek eramaten du $(1,-2)$ puntua $(6,1)$ puntura?', '¿Qué vector lleva $(1,-2)$ a $(6,1)$?', 'أي متجه ينقل $(1,-2)$ إلى $(6,1)$؟', 'Which vector takes $(1,-2)$ to $(6,1)$?'),
            options: [same('$(-5,-3)$'), same('$(5,3)$'), same('$(7,-1)$')],
            correctIndex: 1,
            explanation: say('Irudia ken puntua, zeinuekin: $(6-1,\\ 1-(-2))=(5,3)$.', 'Imagen menos punto, con los signos: $(6-1,\\ 1-(-2))=(5,3)$.', 'الصورة ناقص النقطة بالإشارات: $(6-1,\\ 1-(-2))=(5,3)$.', 'Image minus point, with the signs: $(6-1,\\ 1-(-2))=(5,3)$.')
        }
    },
    'translation-composition': {
        mistake: {
            wrong: say('Bi lekualdaketa elkarren segidan biraketa bat dira.', 'Dos traslaciones seguidas son un giro.', 'انسحابان متتاليان دوران.', 'Two translations in a row make a rotation.'),
            right: say('Lekualdaketa bat dira, bektoreen baturarekin: irudia ez da biratzen.', 'Son una traslación, con la suma de los vectores: la figura no gira.', 'هما انسحاب بمجموع المتجهين: الشكل لا يدور.', 'They make a translation by the sum of the vectors: the shape does not turn.')
        },
        check: {
            prompt: say('Irudi bat $(2,1)$ bektorearekin eta gero $(1,3)$ bektorearekin lekualdatzen da. Zer mugimendu da?', 'Se traslada con $(2,1)$ y después con $(1,3)$. ¿Qué movimiento es?', 'يُنقل شكل بـ $(2,1)$ ثم بـ $(1,3)$. ما هذه الحركة؟', 'A figure is translated by $(2,1)$ and then by $(1,3)$. What movement is it?'),
            options: [say('Biraketa bat', 'Un giro', 'دوران', 'A rotation'), say('$(3,4)$ bektoreko lekualdaketa', 'La traslación de vector $(3,4)$', 'الانسحاب بالمتجه $(3,4)$', 'The translation by $(3,4)$'), say('$(2,3)$ bektoreko lekualdaketa', 'La traslación de vector $(2,3)$', 'الانسحاب بالمتجه $(2,3)$', 'The translation by $(2,3)$')],
            correctIndex: 1,
            explanation: say('Lekualdaketa bakarra da, bektoreen baturarekin: $(2+1,\\ 1+3)=(3,4)$. Irudia ez da biratzen.', 'Es una sola traslación, con la suma de los vectores: $(2+1,\\ 1+3)=(3,4)$. La figura no gira.', 'إنه انسحاب واحد بمجموع المتجهين: $(2+1,\\ 1+3)=(3,4)$. الشكل لا يدور.', 'It is a single translation, by the sum of the vectors: $(2+1,\\ 1+3)=(3,4)$. The figure does not turn.')
        }
    },
    rotation: {
        mistake: {
            wrong: say('90° biratzean, puntu guztiak 90 unitate mugitzen dira.', 'Al girar 90°, todos los puntos se mueven 90 unidades.', 'عند الدوران 90° تتحرك كل النقاط 90 وحدة.', 'Turning by 90°, every point moves 90 units.'),
            right: say('90° angelua da, ez distantzia: zentrotik urrun dauden puntuek bide luzeagoa egiten dute.', '90° es un ángulo, no una distancia: los puntos lejos del centro recorren más camino.', '90° زاوية لا مسافة: النقاط البعيدة عن المركز تقطع طريقًا أطول.', '90° is an angle, not a distance: points far from the centre travel further.')
        },
        check: {
            prompt: say('Puntu bat zentrotik 4 cm-ra dago eta 60° biratzen da. Zer distantziatara geratzen da zentrotik?', 'Un punto está a 4 cm del centro y gira 60°. ¿A qué distancia del centro queda?', 'نقطة تبعد 4 سم عن المركز وتدور 60°. على أي بعد من المركز تصبح؟', 'A point is 4 cm from the centre and turns 60°. How far from the centre is it now?'),
            options: [say('4 cm', '4 cm', '4 سم', '4 cm'), say('64 cm', '64 cm', '64 سم', '64 cm'), say('60 cm', '60 cm', '60 سم', '60 cm')],
            correctIndex: 0,
            explanation: say('Biraketak zentrorako distantzia mantentzen du; 60° angelu bat da, ez distantzia bat.', 'El giro conserva la distancia al centro; 60° es un ángulo, no una distancia.', 'الدوران يحافظ على البعد عن المركز؛ و60° زاوية لا مسافة.', 'A rotation keeps the distance to the centre; 60° is an angle, not a distance.')
        }
    },
    'rotation-coordinates': {
        mistake: {
            wrong: say('90° biraketa: $(3,2)\\to(2,3)$.', 'Giro de 90°: $(3,2)\\to(2,3)$.', 'دوران 90°: $(3,2)\\to(2,3)$.', 'Rotation by 90°: $(3,2)\\to(2,3)$.'),
            right: say('Trukatzea bakarrik $y=x$ zuzenarekiko simetria da. Biraketan zeinua ere aldatzen da: $(-2,3)$.', 'Solo intercambiar es la simetría respecto a $y=x$. En el giro también cambia un signo: $(-2,3)$.', 'المبادلة وحدها تناظر بالنسبة إلى $y=x$. وفي الدوران تتغيّر إشارة أيضًا: $(-2,3)$.', 'Only swapping is the reflection in $y=x$. A rotation also changes a sign: $(-2,3)$.')
        },
        check: {
            prompt: say('Biratu $(4,1)$ puntua 90° jatorriaren inguruan.', 'Gira $(4,1)$ 90° alrededor del origen.', 'أدر $(4,1)$ بـ 90° حول الأصل.', 'Rotate $(4,1)$ by 90° about the origin.'),
            options: [same('$(1,4)$'), same('$(-1,4)$'), same('$(-4,-1)$')],
            correctIndex: 1,
            explanation: say('Trukatu eta aldatu lehenengoaren zeinua: $(4,1)\\to(-1,4)$. $(1,4)$ $y=x$ zuzenarekiko simetria da.', 'Intercambia y cambia el signo de la primera: $(4,1)\\to(-1,4)$. $(1,4)$ es la simetría respecto a $y=x$.', 'بادل وغيّر إشارة الأول: $(4,1)\\to(-1,4)$. أما $(1,4)$ فهو التناظر بالنسبة إلى $y=x$.', 'Swap and change the sign of the first: $(4,1)\\to(-1,4)$. $(1,4)$ is the reflection in $y=x$.')
        }
    },
    'central-symmetry': {
        mistake: {
            wrong: say('Simetria zentrala ispilu bat da $O$ puntuan.', 'La simetría central es un espejo en el punto $O$.', 'التناظر المركزي مرآة عند النقطة $O$.', 'Central symmetry is a mirror at the point $O$.'),
            right: say('Biraketa bat da (180°): irudia ez da iraultzen, buruz behera geratzen da.', 'Es un giro (180°): la figura no se da la vuelta, queda cabeza abajo.', 'إنه دوران (180°): لا ينقلب الشكل بل يصير مقلوبًا رأسًا على عقب.', 'It is a rotation (180°): the shape is not flipped, it ends up upside down.')
        },
        check: {
            prompt: say('Zer da $O$ zentroko simetria zentrala?', '¿Qué es la simetría central de centro $O$?', 'ما التناظر المركزي حول $O$؟', 'What is the central symmetry with centre $O$?'),
            options: [say('Ispilu bat $O$ puntuan', 'Un espejo en $O$', 'مرآة في $O$', 'A mirror at $O$'), say('180°-ko biraketa bat $O$ puntuaren inguruan', 'Un giro de 180° alrededor de $O$', 'دوران بـ 180° حول $O$', 'A 180° rotation about $O$'), say('Lekualdaketa bat', 'Una traslación', 'انسحاب', 'A translation')],
            correctIndex: 1,
            explanation: say('Biraketa bat da: irudia ez da iraultzen, buruz behera geratzen da.', 'Es un giro: la figura no se da la vuelta, queda cabeza abajo.', 'إنه دوران: الشكل لا ينقلب بل يصير رأسًا على عقب.', 'It is a rotation: the figure does not flip, it ends up upside down.')
        }
    },
    'axial-symmetry': {
        mistake: {
            wrong: say('Simetria axialean irudia biratu egiten da.', 'En la simetría axial la figura gira.', 'في التناظر المحوري يدور الشكل.', 'In a reflection the shape turns.'),
            right: say('Ez da biratzen: iraultzen da, ispiluan bezala. Ezkerra eskuin bihurtzen da.', 'No gira: se da la vuelta, como en un espejo. La izquierda pasa a ser la derecha.', 'لا يدور: ينقلب كما في المرآة. يصير اليسار يمينًا.', 'It does not turn: it flips, as in a mirror. Left becomes right.')
        },
        check: {
            prompt: say('Simetria axialean, zer gertatzen zaio irudiari?', 'En la simetría axial, ¿qué le pasa a la figura?', 'في التناظر المحوري، ماذا يحدث للشكل؟', 'In a reflection, what happens to the figure?'),
            options: [say('Biratu egiten da', 'Gira', 'يدور', 'It turns'), say('Irauli egiten da, ispilu batean bezala', 'Se da la vuelta, como en un espejo', 'ينقلب كما في المرآة', 'It flips over, as in a mirror'), say('Tamaina aldatzen du', 'Cambia de tamaño', 'يتغير حجمه', 'It changes size')],
            correctIndex: 1,
            explanation: say('Ez da biratzen: iraulita geratzen da, eta ezkerra eskuin bihurtzen da.', 'No gira: queda dada la vuelta, y la izquierda pasa a ser la derecha.', 'لا يدور: ينقلب، فيصير اليسار يمينًا.', 'It does not turn: it is flipped, and left becomes right.')
        }
    },
    'reflection-coordinates': {
        mistake: {
            wrong: say('X ardatzarekiko: $(4,1)\\to(-4,1)$.', 'Respecto al eje X: $(4,1)\\to(-4,1)$.', 'بالنسبة إلى محور X: $(4,1)\\to(-4,1)$.', 'In the X axis: $(4,1)\\to(-4,1)$.'),
            right: say('X ardatza horizontala da: puntua gora edo behera islatzen da, $(4,-1)$.', 'El eje X es horizontal: el punto se refleja hacia arriba o abajo, $(4,-1)$.', 'محور X أفقي: تنعكس النقطة إلى الأعلى أو الأسفل، $(4,-1)$.', 'The X axis is horizontal: the point is reflected up or down, $(4,-1)$.')
        },
        check: {
            prompt: say('Zein da $(5,2)$ puntuaren simetrikoa X ardatzarekiko?', '¿Cuál es el simétrico de $(5,2)$ respecto al eje X?', 'ما نظير $(5,2)$ بالنسبة إلى محور X؟', 'What is the image of $(5,2)$ in the X axis?'),
            options: [same('$(-5,2)$'), same('$(5,-2)$'), same('$(2,5)$')],
            correctIndex: 1,
            explanation: say('X ardatza horizontala da: $y$ koordenatuak aldatzen du zeinua, $(5,-2)$.', 'El eje X es horizontal: cambia el signo de la $y$, $(5,-2)$.', 'محور X أفقي: تتغير إشارة $y$، ‏$(5,-2)$.', 'The X axis is horizontal: the $y$ changes sign, $(5,-2)$.')
        }
    },
    'two-mirrors': {
        mistake: {
            wrong: say('Bi ardatz paralelo 3 unitatera: lekualdaketa 3 unitatekoa da.', 'Dos ejes paralelos a 3 unidades: la traslación es de 3 unidades.', 'محوران متوازيان على بعد 3 وحدات: الانسحاب 3 وحدات.', 'Two parallel axes 3 units apart: the translation is 3 units.'),
            right: say('Bikoitza da: 6 unitate.', 'Es el doble: 6 unidades.', 'إنه الضعف: 6 وحدات.', 'It is twice: 6 units.')
        },
        check: {
            prompt: say('Bi ispilu paralelo 5 cm-ra daude. Zenbat lekualdatzen da irudia?', 'Dos espejos paralelos están a 5 cm. ¿Cuánto se traslada la figura?', 'مرآتان متوازيتان المسافة بينهما 5 سم. كم ينتقل الشكل؟', 'Two parallel mirrors are 5 cm apart. How far is the figure translated?'),
            options: [say('5 cm', '5 cm', '5 سم', '5 cm'), say('10 cm', '10 cm', '10 سم', '10 cm'), say('25 cm', '25 cm', '25 سم', '25 cm')],
            correctIndex: 1,
            explanation: say('Ardatzen arteko distantziaren bikoitza: $2\\cdot 5=10$.', 'El doble de la distancia entre los ejes: $2\\cdot 5=10$.', 'ضعف المسافة بين المحورين: $2\\cdot 5=10$.', 'Twice the distance between the axes: $2\\cdot 5=10$.')
        }
    },
    friezes: {
        mistake: {
            wrong: say('8 motibo: $8\\cdot 5=40$ cm.', '8 motivos: $8\\cdot 5=40$ cm.', '8 نقوش: $8\\cdot 5=40$ سم.', '8 motifs: $8\\cdot 5=40$ cm.'),
            right: say('8 motiboren artean 7 jauzi daude, eta azkenaren zabalera falta da: $7\\cdot 5+3=38$.', 'Entre 8 motivos hay 7 saltos, y falta el ancho del último: $7\\cdot 5+3=38$.', 'بين 8 نقوش 7 قفزات وينقص عرض الأخير: $7\\cdot 5+3=38$.', 'Between 8 motifs there are 7 jumps, plus the width of the last one: $7\\cdot 5+3=38$.')
        },
        check: {
            prompt: say('Friso batean bektoreak 3 cm neurtzen ditu. Zenbat dago lehen motibotik bosgarrenera?', 'En un friso el vector mide 3 cm. ¿Cuánto hay del primer motivo al quinto?', 'في إفريز طول المتجه 3 سم. كم المسافة من النقش الأول إلى الخامس؟', 'In a frieze the vector is 3 cm. How far is it from the first motif to the fifth?'),
            options: [say('15 cm', '15 cm', '15 سم', '15 cm'), say('12 cm', '12 cm', '12 سم', '12 cm'), say('9 cm', '9 cm', '9 سم', '9 cm')],
            correctIndex: 1,
            explanation: say('Lehenetik bosgarrenera 4 jauzi daude, ez 5: $4\\cdot 3=12$.', 'Del primero al quinto hay 4 saltos, no 5: $4\\cdot 3=12$.', 'من الأول إلى الخامس 4 قفزات لا 5: $4\\cdot 3=12$.', 'From the first to the fifth there are 4 jumps, not 5: $4\\cdot 3=12$.')
        }
    },
    tessellations: {
        mistake: {
            wrong: say('Oktogono erregularrek ere estaltzen dute: 3 sartzen dira erpin batean.', 'Los octógonos regulares también cubren: caben 3 en un vértice.', 'المثمنات المنتظمة تغطي أيضًا: يتسع الرأس لثلاثة.', 'Regular octagons tile too: 3 fit at a vertex.'),
            right: say('$3\\cdot 135°=405°>360°$: gainjarri egiten dira. Oktogonoek karratuekin batera bakarrik estaltzen dute.', '$3\\cdot 135°=405°>360°$: se solapan. Los octógonos solo cubren junto con cuadrados.', '$3\\cdot 135°=405°>360°$: تتداخل. ولا تغطي المثمنات إلا مع المربعات.', '$3\\cdot 135°=405°>360°$: they overlap. Octagons only tile together with squares.')
        },
        check: {
            prompt: say('Planoa estaltzen dute dekagono erregularrek, 144°-ko angeluarekin?', '¿Cubren el plano los decágonos regulares, de ángulo 144°?', 'هل تغطي المعشّرات المنتظمة ذات الزاوية 144° المستوى؟', 'Do regular decagons, with angles of 144°, tile the plane?'),
            options: [say('Bai, 3 erpin bakoitzean', 'Sí, 3 en cada vértice', 'نعم، 3 في كل رأس', 'Yes, 3 at each vertex'), say('Ez: ez dago 360° batzen duen angelu kopuru osorik', 'No: ningún número entero de ángulos suma 360°', 'لا: لا يوجد عدد صحيح من الزوايا مجموعه 360°', 'No: no whole number of angles adds up to 360°'), say('Bai, 2 erpin bakoitzean', 'Sí, 2 en cada vértice', 'نعم، 2 في كل رأس', 'Yes, 2 at each vertex')],
            correctIndex: 1,
            explanation: say('$2\\cdot 144°=288°$ eta $3\\cdot 144°=432°$: hutsune bat edo gainjartze bat beti.', '$2\\cdot 144°=288°$ y $3\\cdot 144°=432°$: siempre queda un hueco o se solapan.', '$2\\cdot 144°=288°$ و$3\\cdot 144°=432°$: يبقى دائمًا فراغ أو تداخل.', '$2\\cdot 144°=288°$ and $3\\cdot 144°=432°$: there is always a gap or an overlap.')
        }
    },
    homothety: {
        mistake: {
            wrong: say('$k=3$ homotezia: $(2,-3)\\to(2+3,\\ -3+3)$.', 'Homotecia $k=3$: $(2,-3)\\to(2+3,\\ -3+3)$.', 'تحاكٍ $k=3$: $(2,-3)\\to(2+3,\\ -3+3)$.', 'Enlargement $k=3$: $(2,-3)\\to(2+3,\\ -3+3)$.'),
            right: say('Homoteziak biderkatu egiten du, ez batu: $(6,-9)$. Batzea lekualdaketa da.', 'La homotecia multiplica, no suma: $(6,-9)$. Sumar es trasladar.', 'التحاكي يضرب ولا يجمع: $(6,-9)$. الجمع انسحاب.', 'An enlargement multiplies, it does not add: $(6,-9)$. Adding is translating.')
        },
        check: {
            prompt: say('Jatorri-zentroko eta $k=\\frac{1}{2}$ arrazoiko homotezian, nora doa $(6,-4)$?', 'Homotecia de centro el origen y $k=\\frac{1}{2}$: ¿adónde va $(6,-4)$?', 'في التحاكي الذي مركزه الأصل و$k=\\frac{1}{2}$، إلى أين تذهب $(6,-4)$؟', 'Enlargement with centre the origin and $k=\\frac{1}{2}$: where does $(6,-4)$ go?'),
            options: [same('$(3,-2)$'), same('$(6{,}5,\\ -3{,}5)$'), same('$(12,-8)$')],
            correctIndex: 0,
            explanation: say('Homoteziak biderkatu egiten du, ez batu: $\\left(\\frac{1}{2}\\cdot 6,\\ \\frac{1}{2}\\cdot(-4)\\right)=(3,-2)$.', 'La homotecia multiplica, no suma: $\\left(\\frac{1}{2}\\cdot 6,\\ \\frac{1}{2}\\cdot(-4)\\right)=(3,-2)$.', 'التحاكي يضرب ولا يجمع: $\\left(\\frac{1}{2}\\cdot 6,\\ \\frac{1}{2}\\cdot(-4)\\right)=(3,-2)$.', 'An enlargement multiplies, it does not add: $\\left(\\frac{1}{2}\\cdot 6,\\ \\frac{1}{2}\\cdot(-4)\\right)=(3,-2)$.')
        }
    }
}

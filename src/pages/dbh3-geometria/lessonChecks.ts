import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Geometria · 3. DBH — the typical mistake and the «Check it» question of
   every lesson. Plain data (no JSX) so the tests can import it; lessons.tsx
   merges it into the topics. The mistakes are the ones the lessons already
   had (the one of regular polygons no longer repeats 180°); the questions
   use new numbers, never those of «Let's solve» or of the example, and one
   of their wrong answers is the lesson's typical mistake. Tests in
   tests/lesson-checks.test.ts.
   ========================================================================== */

export type Geometry3TopicId = 'polygon-angles' | 'regular-polygons' | 'circle-angles' | 'perpendicular-bisector' | 'angle-bisector' | 'notable-points' | 'pythagoras' | 'pythagoras-figures' | 'pythagoras-problems' | 'polygon-areas' | 'regular-area' | 'circle-areas' | 'thales' | 'similar-triangles' | 'scale-areas'

export const geometry3LessonChecks: Record<Geometry3TopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'polygon-angles': {
        mistake: {
            wrong: say('Hexagono baten angeluek $6\\cdot 180°=1080°$ batzen dute.', 'Los ángulos de un hexágono suman $6\\cdot 180°=1080°$.', 'مجموع زوايا السداسي $6\\cdot 180°=1080°$.', 'The angles of a hexagon add up to $6\\cdot 180°=1080°$.'),
            right: say('Hexagonoa 4 triangelutan banatzen da, ez 6: $(6-2)\\cdot 180°=720°$.', 'El hexágono se divide en 4 triángulos, no en 6: $(6-2)\\cdot 180°=720°$.', 'ينقسم السداسي إلى 4 مثلثات لا 6: $(6-2)\\cdot 180°=720°$.', 'The hexagon splits into 4 triangles, not 6: $(6-2)\\cdot 180°=720°$.')
        },
        check: {
            prompt: say('Zenbat batzen dute heptagono baten (7 alde) barne-angeluek?', '¿Cuánto suman los ángulos interiores de un heptágono (7 lados)?', 'كم مجموع الزوايا الداخلية لمسبّع (7 أضلاع)؟', 'What do the interior angles of a heptagon (7 sides) add up to?'),
            options: [same('$1260°$'), same('$900°$'), same('$720°$')],
            correctIndex: 1,
            explanation: say('Heptagonoa 5 triangelutan banatzen da, ez 7 triangelutan: $(7-2)\\cdot 180°=900°$.', 'El heptágono se divide en 5 triángulos, no en 7: $(7-2)\\cdot 180°=900°$.', 'ينقسم المسبّع إلى 5 مثلثات لا إلى 7: $(7-2)\\cdot 180°=900°$.', 'The heptagon splits into 5 triangles, not 7: $(7-2)\\cdot 180°=900°$.')
        }
    },
    'regular-polygons': {
        mistake: {
            wrong: say('Pentagono erregularraren barne-angelua: $360°\\div 5=72°$.', 'Ángulo interior del pentágono regular: $360°\\div 5=72°$.', 'الزاوية الداخلية للمخمس المنتظم: $360°\\div 5=72°$.', 'Interior angle of the regular pentagon: $360°\\div 5=72°$.'),
            right: say('$72°$ kanpo-angelua da (eta zentrala). Barne-angelua haren osagarria da: $108°$.', '$72°$ es el exterior (y el central). El interior es su suplementario: $108°$.', '$72°$ هي الخارجية (والمركزية). أما الداخلية فمكمّلتها: $108°$.', '$72°$ is the exterior (and central) angle. The interior is its supplement: $108°$.')
        },
        check: {
            prompt: say('Zenbat neurtzen du dekagono erregular baten barne-angeluak?', '¿Cuánto mide el ángulo interior de un decágono regular?', 'كم قياس الزاوية الداخلية للمعشّر المنتظم؟', 'How big is the interior angle of a regular decagon?'),
            options: [same('$36°$'), same('$144°$'), same('$162°$')],
            correctIndex: 1,
            explanation: say('Kanpo-angelua $360°\\div 10=36°$ da, eta barne-angelua $180°-36°=144°$.', 'El exterior mide $360°\\div 10=36°$, y el interior, $180°-36°=144°$.', 'الخارجية $360°\\div 10=36°$، والداخلية $180°-36°=144°$.', 'The exterior is $360°\\div 10=36°$, and the interior, $180°-36°=144°$.')
        }
    },
    'circle-angles': {
        mistake: {
            wrong: say('Inskribatua zentralaren bikoitza da: $2\\cdot 40°=80°$.', 'El inscrito es el doble del central: $2\\cdot 40°=80°$.', 'المحيطية ضعف المركزية: $2\\cdot 40°=80°$.', 'The inscribed angle is twice the central one: $2\\cdot 40°=80°$.'),
            right: say('Alderantziz: zentrala da bikoitza. $40°$ zentralaren inskribatua $20°$ da.', 'Al revés: el central es el doble. El inscrito de un central de $40°$ mide $20°$.', 'بالعكس: المركزية هي الضعف. محيطية مركزية $40°$ قياسها $20°$.', 'The other way round: the central one is twice. The inscribed angle for a central $40°$ is $20°$.')
        },
        check: {
            prompt: say('Angelu zentral batek 150° neurtzen ditu. Zenbat neurtzen du arku bera hartzen duen inskribatu batek?', 'Un ángulo central mide 150°. ¿Cuánto mide un inscrito que abarca el mismo arco?', 'زاوية مركزية قياسها 150°. كم قياس زاوية محيطية تحصر القوس نفسه؟', 'A central angle measures 150°. How big is an inscribed angle on the same arc?'),
            options: [same('$300°$'), same('$75°$'), same('$150°$')],
            correctIndex: 1,
            explanation: say('Inskribatua zentralaren erdia da: $150°\\div 2=75°$.', 'El inscrito es la mitad del central: $150°\\div 2=75°$.', 'المحيطية نصف المركزية: $150°\\div 2=75°$.', 'The inscribed angle is half the central one: $150°\\div 2=75°$.')
        }
    },
    'perpendicular-bisector': {
        mistake: {
            wrong: say('Erdibitzailea $A$ eta $B$ lotzen dituen zuzena da.', 'La mediatriz es la recta que une $A$ y $B$.', 'المنصّف العمودي هو المستقيم الواصل بين $A$ و$B$.', 'The perpendicular bisector is the line joining $A$ and $B$.'),
            right: say('Ez: segmentua perpendikularki ebakitzen du, erdian.', 'No: corta al segmento perpendicularmente, por su punto medio.', 'لا: يقطع القطعة عموديًا في منتصفها.', 'No: it cuts the segment at right angles, through its midpoint.')
        },
        check: {
            prompt: say('Nolakoa da erdibitzailea zuzenki-zatiarekiko?', '¿Cómo es la mediatriz respecto al segmento?', 'كيف يكون المنصّف العمودي بالنسبة إلى القطعة؟', 'How is the perpendicular bisector placed with respect to the segment?'),
            options: [say('$A$ eta $B$ puntuetatik pasatzen da', 'Pasa por $A$ y por $B$', 'يمر بـ $A$ و$B$', 'It goes through $A$ and $B$'), say('Perpendikularra da eta erdiko puntutik pasatzen da', 'Es perpendicular y pasa por su punto medio', 'عمودي عليها ويمر بمنتصفها', 'It is perpendicular and goes through the midpoint'), say('Paraleloa da', 'Es paralela', 'موازٍ لها', 'It is parallel')],
            correctIndex: 1,
            explanation: say('Erdibitzaileak zuzenki-zatia perpendikularki ebakitzen du, erdiko puntuan: hor dauden puntuak $A$ eta $B$ puntuetatik distantzia berera daude.', 'La mediatriz corta al segmento en perpendicular, por su punto medio: sus puntos están a la misma distancia de $A$ y de $B$.', 'يقطع المنصّف العمودي القطعة عموديًا في منتصفها: نقاطه تبعد المسافة نفسها عن $A$ و$B$.', 'The perpendicular bisector cuts the segment at right angles at its midpoint: its points are the same distance from $A$ and $B$.')
        }
    },
    'angle-bisector': {
        mistake: {
            wrong: say('Erdikariaren puntu batetik aldeetarako distantzia, edozein zuzen zeiharretan neurtzen da.', 'La distancia de un punto de la bisectriz a los lados se mide por cualquier recta oblicua.', 'يُقاس بعد نقطة من المنصّف عن الضلعين على أي مستقيم مائل.', 'The distance from a point of the bisector to the sides is measured along any slanting line.'),
            right: say('Distantzia beti perpendikularrean neurtzen da: horrela bakarrik dira berdinak.', 'La distancia siempre se mide en perpendicular: solo así son iguales.', 'يُقاس البعد دائمًا عموديًا: وبذلك فقط يتساويان.', 'Distance is always measured at right angles: only then are they equal.')
        },
        check: {
            prompt: say('Nola neurtzen da erdikariko puntu batetik alde baterainoko distantzia?', '¿Cómo se mide la distancia de un punto de la bisectriz a un lado?', 'كيف تُقاس المسافة من نقطة على المنصّف إلى ضلع؟', 'How do you measure the distance from a point of the bisector to a side?'),
            options: [say('Aldera arteko edozein zuzenki-zatirekin', 'Con cualquier segmento hasta el lado', 'بأي قطعة حتى الضلع', 'With any segment to the side'), say('Aldearekiko perpendikularra den zuzenki-zatiarekin', 'Con el segmento perpendicular al lado', 'بالقطعة العمودية على الضلع', 'With the segment at right angles to the side'), say('Angeluaren erpineraino', 'Hasta el vértice del ángulo', 'حتى رأس الزاوية', 'Up to the vertex of the angle')],
            correctIndex: 1,
            explanation: say('Distantzia beti perpendikularrean neurtzen da: hala bakarrik dira berdinak bi aldeetarako distantziak.', 'La distancia siempre se mide en perpendicular: solo así son iguales las distancias a los dos lados.', 'تُقاس المسافة دائمًا عموديًا: وبهذا فقط تتساوى المسافتان إلى الضلعين.', 'Distance is always measured at right angles: only then are the distances to both sides equal.')
        }
    },
    'notable-points': {
        mistake: {
            wrong: say('Zirkunzentroa beti triangeluaren barruan dago.', 'El circuncentro siempre está dentro del triángulo.', 'مركز الدائرة المحيطة داخل المثلث دائمًا.', 'The circumcentre is always inside the triangle.'),
            right: say('Triangelu kamutsean kanpoan dago, eta zuzenean hipotenusaren erdian.', 'En un triángulo obtusángulo queda fuera, y en uno rectángulo en el punto medio de la hipotenusa.', 'في المثلث المنفرج يقع خارجه، وفي القائم في منتصف الوتر.', 'In an obtuse triangle it lies outside, and in a right triangle at the midpoint of the hypotenuse.')
        },
        check: {
            prompt: say('Triangelu kamutsangeluar batean, non dago zirkunzentroa?', 'En un triángulo obtusángulo, ¿dónde queda el circuncentro?', 'في مثلث منفرج الزاوية، أين يقع مركز الدائرة المحيطة؟', 'In an obtuse triangle, where is the circumcentre?'),
            options: [say('Triangelutik kanpo', 'Fuera del triángulo', 'خارج المثلث', 'Outside the triangle'), say('Triangeluaren barruan', 'Dentro del triángulo', 'داخل المثلث', 'Inside the triangle'), say('Erpin batean', 'En un vértice', 'في أحد الرؤوس', 'At a vertex')],
            correctIndex: 0,
            explanation: say('Zirkunzentroa ez dago beti barruan: kamutsangeluarretan kanpo geratzen da, eta angeluzuzenetan hipotenusaren erdiko puntuan.', 'El circuncentro no siempre está dentro: en los obtusángulos queda fuera, y en los rectángulos, en el punto medio de la hipotenusa.', 'مركز الدائرة المحيطة ليس دائمًا في الداخل: في المنفرج يقع خارجه، وفي القائم في منتصف الوتر.', 'The circumcentre is not always inside: in obtuse triangles it is outside, and in right triangles at the midpoint of the hypotenuse.')
        }
    },
    pythagoras: {
        mistake: {
            wrong: same('$\\sqrt{3^{2}+4^{2}}=3+4=7$'),
            right: say('Erroa ez da banatzen batuketan: $\\sqrt{9+16}=\\sqrt{25}=5$.', 'La raíz no se reparte en la suma: $\\sqrt{9+16}=\\sqrt{25}=5$.', 'لا يتوزع الجذر على الجمع: $\\sqrt{9+16}=\\sqrt{25}=5$.', 'The root does not split over a sum: $\\sqrt{9+16}=\\sqrt{25}=5$.')
        },
        check: {
            prompt: say('Triangelu zuzen baten katetoek 9 cm eta 12 cm neurtzen dituzte. Zenbat neurtzen du hipotenusak?', 'Los catetos de un triángulo rectángulo miden 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?', 'الضلعان القائمان لمثلث قائم 9 سم و12 سم. كم طول الوتر؟', 'The legs of a right triangle are 9 cm and 12 cm. How long is the hypotenuse?'),
            options: [say('21 cm', '21 cm', '21 سم', '21 cm'), say('15 cm', '15 cm', '15 سم', '15 cm'), say('225 cm', '225 cm', '225 سم', '225 cm')],
            correctIndex: 1,
            explanation: say('$\\sqrt{9^{2}+12^{2}}=\\sqrt{81+144}=\\sqrt{225}=15$. Erroa ez da batuketan banatzen, eta ez da ahaztu behar.', '$\\sqrt{9^{2}+12^{2}}=\\sqrt{81+144}=\\sqrt{225}=15$. La raíz no se reparte en la suma, y no hay que olvidarla.', '$\\sqrt{9^{2}+12^{2}}=\\sqrt{81+144}=\\sqrt{225}=15$. الجذر لا يتوزع على الجمع، ولا يجوز نسيانه.', '$\\sqrt{9^{2}+12^{2}}=\\sqrt{81+144}=\\sqrt{225}=15$. The root does not split over the sum, and it must not be forgotten.')
        }
    },
    'pythagoras-figures': {
        mistake: {
            wrong: say('Altuera: $\\sqrt{10^{2}-12^{2}}$.', 'La altura: $\\sqrt{10^{2}-12^{2}}$.', 'الارتفاع: $\\sqrt{10^{2}-12^{2}}$.', 'The height: $\\sqrt{10^{2}-12^{2}}$.'),
            right: say('Triangelu zuzenak oinarriaren ERDIA du: $\\sqrt{10^{2}-6^{2}}=8$.', 'El triángulo rectángulo tiene la MITAD de la base: $\\sqrt{10^{2}-6^{2}}=8$.', 'للمثلث القائم نصف القاعدة: $\\sqrt{10^{2}-6^{2}}=8$.', 'The right triangle has HALF the base: $\\sqrt{10^{2}-6^{2}}=8$.')
        },
        check: {
            prompt: say('Erronbo baten diagonalek 16 cm eta 12 cm neurtzen dituzte. Zenbat neurtzen du aldeak?', 'Un rombo tiene diagonales de 16 cm y 12 cm. ¿Cuánto mide su lado?', 'قطرا معيّن 16 سم و12 سم. كم طول ضلعه؟', 'A rhombus has diagonals of 16 cm and 12 cm. How long is its side?'),
            options: [say('20 cm', '20 cm', '20 سم', '20 cm'), say('10 cm', '10 cm', '10 سم', '10 cm'), say('14 cm', '14 cm', '14 سم', '14 cm')],
            correctIndex: 1,
            explanation: say('Triangelu zuzenak diagonal-erdiak ditu: $\\sqrt{8^{2}+6^{2}}=\\sqrt{100}=10$.', 'El triángulo rectángulo tiene las semidiagonales: $\\sqrt{8^{2}+6^{2}}=\\sqrt{100}=10$.', 'في المثلث القائم نصفا القطرين: $\\sqrt{8^{2}+6^{2}}=\\sqrt{100}=10$.', 'The right triangle has the half-diagonals: $\\sqrt{8^{2}+6^{2}}=\\sqrt{100}=10$.')
        }
    },
    'pythagoras-problems': {
        mistake: {
            wrong: say('Eskailera: $h=\\sqrt{10^{2}+6^{2}}$.', 'Escalera: $h=\\sqrt{10^{2}+6^{2}}$.', 'السلّم: $h=\\sqrt{10^{2}+6^{2}}$.', 'Ladder: $h=\\sqrt{10^{2}+6^{2}}$.'),
            right: say('Eskailera hipotenusa da: katetoa kalkulatzeko kendu egiten da, $\\sqrt{100-36}=8$.', 'La escalera es la hipotenusa: para un cateto se resta, $\\sqrt{100-36}=8$.', 'السلّم هو الوتر: لإيجاد ضلع قائم نطرح، $\\sqrt{100-36}=8$.', 'The ladder is the hypotenuse: for a leg you subtract, $\\sqrt{100-36}=8$.')
        },
        check: {
            prompt: say('25 m-ko arrapala batek 7 m igotzen ditu. Zenbat aurreratzen du horizontalean?', 'Una rampa de 25 m sube 7 m de altura. ¿Cuánto avanza en horizontal?', 'منحدر طوله 25 م يرتفع 7 م. كم يتقدم أفقيًا؟', 'A 25 m ramp rises 7 m. How far does it go horizontally?'),
            options: [say('26 m', '26 m', '26 م', '26 m'), say('24 m', '24 m', '24 م', '24 m'), say('18 m', '18 m', '18 م', '18 m')],
            correctIndex: 1,
            explanation: say('Arrapala hipotenusa da: kateto baterako kendu egiten da, $\\sqrt{625-49}=\\sqrt{576}=24$.', 'La rampa es la hipotenusa: para un cateto se resta, $\\sqrt{625-49}=\\sqrt{576}=24$.', 'المنحدر هو الوتر: للضلع القائم نطرح، $\\sqrt{625-49}=\\sqrt{576}=24$.', 'The ramp is the hypotenuse: for a leg you subtract, $\\sqrt{625-49}=\\sqrt{576}=24$.')
        }
    },
    'polygon-areas': {
        mistake: {
            wrong: say('Oinarria 8 eta altuera 6 duen triangelua: $8\\cdot 6=48$.', 'Triángulo de base 8 y altura 6: $8\\cdot 6=48$.', 'مثلث قاعدته 8 وارتفاعه 6: $8\\cdot 6=48$.', 'Triangle with base 8 and height 6: $8\\cdot 6=48$.'),
            right: say('Triangelua paralelogramoaren erdia da: $\\frac{8\\cdot 6}{2}=24$.', 'El triángulo es la mitad del paralelogramo: $\\frac{8\\cdot 6}{2}=24$.', 'المثلث نصف متوازي الأضلاع: $\\frac{8\\cdot 6}{2}=24$.', 'The triangle is half the parallelogram: $\\frac{8\\cdot 6}{2}=24$.')
        },
        check: {
            prompt: say('Zein da 12 cm-ko oinarria eta 7 cm-ko altuera dituen triangelu baten azalera?', '¿Cuál es el área de un triángulo de base 12 cm y altura 7 cm?', 'ما مساحة مثلث قاعدته 12 سم وارتفاعه 7 سم؟', 'What is the area of a triangle with base 12 cm and height 7 cm?'),
            options: [say('84 cm²', '84 cm²', '84 سم²', '84 cm²'), say('42 cm²', '42 cm²', '42 سم²', '42 cm²'), say('19 cm²', '19 cm²', '19 سم²', '19 cm²')],
            correctIndex: 1,
            explanation: say('Triangelua paralelogramoaren erdia da: $\\frac{12\\cdot 7}{2}=42$.', 'El triángulo es la mitad del paralelogramo: $\\frac{12\\cdot 7}{2}=42$.', 'المثلث نصف متوازي الأضلاع: $\\frac{12\\cdot 7}{2}=42$.', 'The triangle is half the parallelogram: $\\frac{12\\cdot 7}{2}=42$.')
        }
    },
    'regular-area': {
        mistake: {
            wrong: say('Azalera $P\\cdot a$ da, zati 2 gabe.', 'El área es $P\\cdot a$, sin dividir entre 2.', 'المساحة $P\\cdot a$ دون قسمة على 2.', 'The area is $P\\cdot a$, without dividing by 2.'),
            right: say('Triangelu bakoitza $\\frac{l\\cdot a}{2}$ da: guztira $\\frac{P\\cdot a}{2}$.', 'Cada triángulo es $\\frac{l\\cdot a}{2}$: en total $\\frac{P\\cdot a}{2}$.', 'كل مثلث $\\frac{l\\cdot a}{2}$: والمجموع $\\frac{P\\cdot a}{2}$.', 'Each triangle is $\\frac{l\\cdot a}{2}$: in total $\\frac{P\\cdot a}{2}$.')
        },
        check: {
            prompt: say('6 cm-ko aldeko karratu batek 3 cm-ko apotema du. Zein da haren azalera, $A=\\frac{P\\cdot a}{2}$ formularekin?', 'Un cuadrado de 6 cm de lado tiene 3 cm de apotema. ¿Cuál es su área con $A=\\frac{P\\cdot a}{2}$?', 'مربع ضلعه 6 سم وعامده 3 سم. ما مساحته بالصيغة $A=\\frac{P\\cdot a}{2}$؟', 'A square with a 6 cm side has a 3 cm apothem. What is its area with $A=\\frac{P\\cdot a}{2}$?'),
            options: [say('72 cm²', '72 cm²', '72 سم²', '72 cm²'), say('36 cm²', '36 cm²', '36 سم²', '36 cm²'), say('18 cm²', '18 cm²', '18 سم²', '18 cm²')],
            correctIndex: 1,
            explanation: say('$P=24$ cm, eta $\\frac{24\\cdot 3}{2}=36$, $6^{2}$ bezala. 72 ateratzen da 2 zenbakiaz zatitu gabe.', '$P=24$ cm, y $\\frac{24\\cdot 3}{2}=36$, igual que $6^{2}$. 72 sale sin dividir entre 2.', '$P=24$ سم، و$\\frac{24\\cdot 3}{2}=36$ مثل $6^{2}$. أما 72 فتخرج دون القسمة على 2.', '$P=24$ cm, and $\\frac{24\\cdot 3}{2}=36$, the same as $6^{2}$. 72 comes from not dividing by 2.')
        }
    },
    'circle-areas': {
        mistake: {
            wrong: say('8 cm-ko diametroa: azalera $\\pi\\cdot 8^{2}$.', 'Diámetro 8 cm: área $\\pi\\cdot 8^{2}$.', 'القطر 8 سم: المساحة $\\pi\\cdot 8^{2}$.', 'Diameter 8 cm: area $\\pi\\cdot 8^{2}$.'),
            right: say('Formulak erradioa erabiltzen du: $r=4$, azalera $16\\pi$.', 'La fórmula usa el radio: $r=4$, área $16\\pi$.', 'تستعمل الصيغة نصف القطر: $r=4$، المساحة $16\\pi$.', 'The formula uses the radius: $r=4$, area $16\\pi$.')
        },
        check: {
            prompt: say('Zirkulu batek 10 cm-ko diametroa du. Zein da haren azalera?', 'Un círculo tiene 10 cm de diámetro. ¿Cuál es su área?', 'قرص قطره 10 سم. ما مساحته؟', 'A circle has a diameter of 10 cm. What is its area?'),
            options: [say('314 cm²', '314 cm²', '314 سم²', '314 cm²'), say('78,5 cm²', '78,5 cm²', '78.5 سم²', '78.5 cm²'), say('31,4 cm²', '31,4 cm²', '31.4 سم²', '31.4 cm²')],
            correctIndex: 1,
            explanation: say('Formulak erradioa erabiltzen du: $r=5$, eta $\\pi\\cdot 5^{2}=25\\pi\\approx 78{,}5$.', 'La fórmula usa el radio: $r=5$, y $\\pi\\cdot 5^{2}=25\\pi\\approx 78{,}5$.', 'الصيغة تستعمل نصف القطر: $r=5$ و$\\pi\\cdot 5^{2}=25\\pi\\approx 78{,}5$.', 'The formula uses the radius: $r=5$, and $\\pi\\cdot 5^{2}=25\\pi\\approx 78{,}5$.')
        }
    },
    thales: {
        mistake: {
            wrong: say('$\\frac{AB}{BC}=\\frac{B^{\\prime}C^{\\prime}}{A^{\\prime}B^{\\prime}}$: ordena aldatu.', '$\\frac{AB}{BC}=\\frac{B^{\\prime}C^{\\prime}}{A^{\\prime}B^{\\prime}}$: cambiar el orden.', '$\\frac{AB}{BC}=\\frac{B^{\\prime}C^{\\prime}}{A^{\\prime}B^{\\prime}}$: قلب الترتيب.', '$\\frac{AB}{BC}=\\frac{B^{\\prime}C^{\\prime}}{A^{\\prime}B^{\\prime}}$: swapping the order.'),
            right: say('Zuzen bakoitzean ordena bera: $\\frac{AB}{BC}=\\frac{A^{\\prime}B^{\\prime}}{B^{\\prime}C^{\\prime}}$.', 'El mismo orden en las dos rectas: $\\frac{AB}{BC}=\\frac{A^{\\prime}B^{\\prime}}{B^{\\prime}C^{\\prime}}$.', 'الترتيب نفسه على المستقيمين: $\\frac{AB}{BC}=\\frac{A^{\\prime}B^{\\prime}}{B^{\\prime}C^{\\prime}}$.', 'The same order on both lines: $\\frac{AB}{BC}=\\frac{A^{\\prime}B^{\\prime}}{B^{\\prime}C^{\\prime}}$.')
        },
        check: {
            prompt: say('$AB=3$, $BC=9$ eta $A^{\\prime}B^{\\prime}=4$. Zenbat neurtzen du $B^{\\prime}C^{\\prime}$ zuzenki-zatiak?', '$AB=3$, $BC=9$ y $A^{\\prime}B^{\\prime}=4$. ¿Cuánto mide $B^{\\prime}C^{\\prime}$?', '$AB=3$ و$BC=9$ و$A^{\\prime}B^{\\prime}=4$. كم طول $B^{\\prime}C^{\\prime}$؟', '$AB=3$, $BC=9$ and $A^{\\prime}B^{\\prime}=4$. How long is $B^{\\prime}C^{\\prime}$?'),
            options: [same('$\\frac{4}{3}$'), same('$12$'), same('$\\frac{27}{4}$')],
            correctIndex: 1,
            explanation: say('Ordena bera: $\\frac{3}{4}=\\frac{9}{x}$; beraz, $x=\\frac{9\\cdot 4}{3}=12$.', 'El mismo orden: $\\frac{3}{4}=\\frac{9}{x}$, así que $x=\\frac{9\\cdot 4}{3}=12$.', 'الترتيب نفسه: $\\frac{3}{4}=\\frac{9}{x}$، إذن $x=\\frac{9\\cdot 4}{3}=12$.', 'The same order: $\\frac{3}{4}=\\frac{9}{x}$, so $x=\\frac{9\\cdot 4}{3}=12$.')
        }
    },
    'similar-triangles': {
        mistake: {
            wrong: say('5 cm-tik 12 cm-ra 7 gehitu da: alde guztiei 7 gehitu.', 'De 5 cm a 12 cm se suman 7: se suman 7 a todos los lados.', 'من 5 سم إلى 12 سم أُضيف 7: نضيف 7 إلى كل الأضلاع.', 'From 5 cm to 12 cm, 7 is added: add 7 to every side.'),
            right: say('Antzekotasunean biderkatu egiten da, ez batu: alde guztiak bider $k$.', 'En la semejanza se multiplica, no se suma: todos los lados por $k$.', 'في التشابه نضرب ولا نجمع: كل الأضلاع في $k$.', 'Similarity multiplies, it does not add: every side times $k$.')
        },
        check: {
            prompt: say('2, 3 eta 4 cm-ko aldeak dituen triangelu bat handitzen da, eta 2 cm-ko aldeak 6 cm neurtzen ditu orain. Zenbat neurtzen du 4 cm-ko aldeak?', 'Un triángulo de lados 2, 3 y 4 cm se amplía y el lado de 2 cm pasa a medir 6 cm. ¿Cuánto mide ahora el de 4 cm?', 'يُكبَّر مثلث أضلاعه 2 و3 و4 سم فيصير الضلع الذي طوله 2 سم 6 سم. كم يصير طول الضلع الذي كان 4 سم؟', 'A triangle with sides 2, 3 and 4 cm is enlarged and the 2 cm side becomes 6 cm. How long is the 4 cm side now?'),
            options: [say('8 cm', '8 cm', '8 سم', '8 cm'), say('12 cm', '12 cm', '12 سم', '12 cm'), say('6 cm', '6 cm', '6 سم', '6 cm')],
            correctIndex: 1,
            explanation: say('$k=\\frac{6}{2}=3$: alde guztiak bider 3, $4\\cdot 3=12$. 4 batzea ez da antzekotasuna.', '$k=\\frac{6}{2}=3$: todos los lados por 3, $4\\cdot 3=12$. Sumar 4 no es semejanza.', '$k=\\frac{6}{2}=3$: كل الأضلاع في 3، $4\\cdot 3=12$. وإضافة 4 ليست تشابهًا.', '$k=\\frac{6}{2}=3$: every side times 3, $4\\cdot 3=12$. Adding 4 is not similarity.')
        }
    },
    'scale-areas': {
        mistake: {
            wrong: say('Aldeak bikoiztean, azalera ere bikoizten da.', 'Al doblar los lados, el área también se dobla.', 'عند مضاعفة الأضلاع تتضاعف المساحة أيضًا.', 'Doubling the sides doubles the area too.'),
            right: say('Azalera $k^{2}$ aldiz: aldeak bikoiztean, azalera laukoiztu.', 'El área va por $k^{2}$: al doblar los lados, el área se multiplica por 4.', 'المساحة في $k^{2}$: بمضاعفة الأضلاع تُضرب المساحة في 4.', 'The area goes by $k^{2}$: doubling the sides multiplies the area by 4.')
        },
        check: {
            prompt: say('Mapa bat 3 arrazoiarekin handitzen da. Laku batek 5 cm² neurtzen zituen mapa txikian. Zenbat neurtzen du handian?', 'Un mapa se amplía con razón 3. Un lago medía 5 cm² en el mapa pequeño. ¿Cuánto mide en el grande?', 'تُكبَّر خريطة بنسبة 3. كانت مساحة بحيرة 5 سم² في الخريطة الصغيرة. كم مساحتها في الكبيرة؟', 'A map is enlarged with ratio 3. A lake measured 5 cm² on the small map. How big is it on the large one?'),
            options: [say('15 cm²', '15 cm²', '15 سم²', '15 cm²'), say('45 cm²', '45 cm²', '45 سم²', '45 cm²'), say('135 cm²', '135 cm²', '135 سم²', '135 cm²')],
            correctIndex: 1,
            explanation: say('Azalerak $k^{2}=9$ aldiz handitzen dira: $5\\cdot 9=45$.', 'Las áreas crecen $k^{2}=9$ veces: $5\\cdot 9=45$.', 'تكبر المساحات $k^{2}=9$ مرات: $5\\cdot 9=45$.', 'Areas grow $k^{2}=9$ times: $5\\cdot 9=45$.')
        }
    }
}

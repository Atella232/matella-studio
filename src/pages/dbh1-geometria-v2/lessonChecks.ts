import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Planoko geometria · 1. DBH — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. Units go after the number in
   the formulas (\ \mathrm{cm}); π is 3,14 as in the lessons.
   ========================================================================== */

export type GeometryIntroTopicId = 'lines' | 'angles' | 'angle-pairs' | 'polygons' | 'triangles' | 'triangle-lines' | 'quadrilaterals' | 'circle' | 'pythagoras' | 'pythagoras-use' | 'units' | 'perimeter' | 'circumference' | 'area-rectangles' | 'area-triangle' | 'area-circle'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const geometryIntroLessonChecks: Record<GeometryIntroTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Lines and angles ---------- */
    lines: {
        mistake: {
            wrong: say('Zuzerdi batek 5 cm neurtzen ditu.', 'Una semirrecta mide 5 cm.', 'نصف مستقيم طوله 5 سم.', 'A ray is 5 cm long.'),
            right: say('Zuzerdiak ez du amaierarik: ezin da neurtu. 5 cm neurtzen dituena zuzenki bat da.', 'La semirrecta no tiene fin: no se puede medir. Lo que mide 5 cm es un segmento.', 'نصف المستقيم لا نهاية له فلا يُقاس. أما الذي طوله 5 سم فهو قطعة مستقيمة.', 'A ray has no end: it cannot be measured. What is 5 cm long is a line segment.')
        },
        check: {
            prompt: say('Zer neur daiteke?', '¿Qué se puede medir?', 'ما الذي يمكن قياسه؟', 'Which one can be measured?'),
            options: [say('Zuzen bat', 'Una recta', 'مستقيم', 'A straight line'), say('Zuzerdi bat', 'Una semirrecta', 'نصف مستقيم', 'A ray'), say('Zuzenki bat', 'Un segmento', 'قطعة مستقيمة', 'A line segment')],
            correctIndex: 2,
            explanation: say('Zuzenkiak bi mutur ditu; zuzenak eta zuzerdiak ez dute amaierarik.', 'El segmento tiene dos extremos; la recta y la semirrecta no terminan.', 'للقطعة طرفان؛ أما المستقيم ونصف المستقيم فلا ينتهيان.', 'A segment has two ends; a line and a ray never end.')
        }
    },
    angles: {
        mistake: {
            wrong: say('100°-ko angelua zorrotza da, txikia delako.', 'Un ángulo de 100° es agudo, porque es pequeño.', 'زاوية 100° حادة لأنها صغيرة.', 'An angle of 100° is acute, because it is small.'),
            right: say('Zorrotza 90° baino txikiagoa da; 100° 90° eta 180° artean dago: kamutsa da.', 'Agudo es menor de 90°; 100° está entre 90° y 180°: es obtuso.', 'الحادة أصغر من 90°؛ و100° بين 90° و180°: إنها منفرجة.', 'Acute means less than 90°; 100° is between 90° and 180°: it is obtuse.')
        },
        check: {
            prompt: say('Nolakoa da 135°-ko angelu bat?', '¿Cómo es un ángulo de 135°?', 'ما نوع زاوية قياسها 135°؟', 'What kind of angle is 135°?'),
            options: [say('Zorrotza', 'Agudo', 'حادة', 'Acute'), say('Kamutsa', 'Obtuso', 'منفرجة', 'Obtuse'), say('Laua', 'Llano', 'مستقيمة', 'Straight')],
            correctIndex: 1,
            explanation: say('90° eta 180° artean dago: kamutsa.', 'Está entre 90° y 180°: obtuso.', 'بين 90° و180°: منفرجة.', 'It is between 90° and 180°: obtuse.')
        }
    },
    'angle-pairs': {
        mistake: {
            wrong: say('120°-ko angeluaren osagarria 60° da.', 'El complementario de 120° es 60°.', 'متممة زاوية 120° هي 60°.', 'The complement of 120° is 60°.'),
            right: say('Angelu kamutsek ez dute osagarririk: 120° 90° baino handiagoa da. 60° haren betegarria da.', 'Ningún obtuso tiene complementario: 120° ya pasa de 90°. 60° es su suplementario.', 'الزاوية المنفرجة لا متممة لها: 120° أكبر من 90°. أما 60° فهي مكمّلتها.', 'No obtuse angle has a complement: 120° is already more than 90°. 60° is its supplement.')
        },
        check: {
            prompt: say('Bi zuzen ebakitzen dira, eta angeluetako batek 40° neurtzen du. Zenbat neurtzen du erpinez aurkako angeluak?', 'Dos rectas se cortan y uno de los ángulos mide 40°. ¿Cuánto mide el ángulo opuesto por el vértice?', 'يتقاطع مستقيمان وإحدى الزوايا 40°. كم قياس الزاوية المقابلة بالرأس؟', 'Two lines cross and one of the angles is 40°. What is the vertically opposite angle?'),
            options: [same('$40^{\\circ}$'), same('$140^{\\circ}$'), same('$50^{\\circ}$')],
            correctIndex: 0,
            explanation: say('Erpinez aurkako angeluak berdinak dira: 40°. Ondokoak, $180^{\\circ}-40^{\\circ}=140^{\\circ}$.', 'Los opuestos por el vértice son iguales: 40°. Los contiguos, $180^{\\circ}-40^{\\circ}=140^{\\circ}$.', 'الزاويتان المتقابلتان بالرأس متساويتان: 40°. والمتجاورتان $180^{\\circ}-40^{\\circ}=140^{\\circ}$.', 'Vertically opposite angles are equal: 40°. The ones next to it, $180^{\\circ}-40^{\\circ}=140^{\\circ}$.')
        }
    },

    /* ---------- 2. Polygons, triangles and circles ---------- */
    polygons: {
        mistake: {
            wrong: say('Laukizuzena poligono erregularra da, angeluak berdinak dituelako.', 'Un rectángulo es un polígono regular, porque sus ángulos son iguales.', 'المستطيل مضلع منتظم لأن زواياه متساوية.', 'A rectangle is a regular polygon, because its angles are equal.'),
            right: say('Aldeek ere berdinak izan behar dute: karratua erregularra da; laukizuzena, ez.', 'También tienen que ser iguales los lados: el cuadrado sí es regular; el rectángulo, no.', 'يجب أن تتساوى الأضلاع أيضًا: المربع منتظم، والمستطيل ليس كذلك.', 'The sides have to be equal too: a square is regular; a rectangle is not.')
        },
        check: {
            prompt: say('Zein poligonok ditu 6 alde?', '¿Qué polígono tiene 6 lados?', 'أيّ مضلع له 6 أضلاع؟', 'Which polygon has 6 sides?'),
            options: [say('Pentagonoak', 'El pentágono', 'المخمس', 'The pentagon'), say('Hexagonoak', 'El hexágono', 'المسدس', 'The hexagon'), say('Heptagonoak', 'El heptágono', 'المسبع', 'The heptagon')],
            correctIndex: 1,
            explanation: say('Hexagonoak 6 alde, 6 erpin eta 6 angelu ditu.', 'El hexágono tiene 6 lados, 6 vértices y 6 ángulos.', 'للمسدس 6 أضلاع و6 رؤوس و6 زوايا.', 'The hexagon has 6 sides, 6 vertices and 6 angles.')
        }
    },
    triangles: {
        mistake: {
            wrong: say('Triangelu batek bi angelu zuzen izan ditzake.', 'Un triángulo puede tener dos ángulos rectos.', 'يمكن أن يكون للمثلث زاويتان قائمتان.', 'A triangle can have two right angles.'),
            right: say('Bi angelu zuzenek 180° egiten dute jada: ez da ezer geratzen hirugarrenarentzat. Gehienez angelu zuzen bat.', 'Dos rectos ya suman 180°: no queda nada para el tercero. Como mucho, un ángulo recto.', 'زاويتان قائمتان مجموعهما 180°: لا يبقى شيء للثالثة. زاوية قائمة واحدة على الأكثر.', 'Two right angles already add up to 180°: nothing is left for the third. One right angle at most.')
        },
        check: {
            prompt: say('Triangelu baten bi angeluk 30° eta 45° neurtzen dute. Zenbat neurtzen du hirugarrenak?', 'Dos ángulos de un triángulo miden 30° y 45°. ¿Cuánto mide el tercero?', 'زاويتان في مثلث قياسهما 30° و45°. كم قياس الثالثة؟', 'Two angles of a triangle are 30° and 45°. What is the third?'),
            options: [same('$75^{\\circ}$'), same('$105^{\\circ}$'), same('$285^{\\circ}$')],
            correctIndex: 1,
            explanation: say('$180^{\\circ}-30^{\\circ}-45^{\\circ}=105^{\\circ}$: triangelu kamutsa da.', '$180^{\\circ}-30^{\\circ}-45^{\\circ}=105^{\\circ}$: es obtusángulo.', '$180^{\\circ}-30^{\\circ}-45^{\\circ}=105^{\\circ}$: إنه منفرج الزاوية.', '$180^{\\circ}-30^{\\circ}-45^{\\circ}=105^{\\circ}$: it is obtuse-angled.')
        }
    },
    'triangle-lines': {
        mistake: {
            wrong: say('Erdibidekoa aurkako aldearen perpendikularra da.', 'La mediana es perpendicular al lado opuesto.', 'المتوسط عمودي على الضلع المقابل.', 'The median is perpendicular to the opposite side.'),
            right: say('Perpendikularra altuera da. Erdibidekoa aurkako aldearen erdiko puntura doa.', 'La que es perpendicular es la altura. La mediana va al punto medio del lado opuesto.', 'العمودي هو الارتفاع. أما المتوسط فيصل إلى منتصف الضلع المقابل.', 'The one that is perpendicular is the height. The median goes to the midpoint of the opposite side.')
        },
        check: {
            prompt: say('Zein zuzenek banatzen du angelu bat bi zati berdinetan?', '¿Qué recta divide un ángulo en dos partes iguales?', 'أيّ مستقيم يقسم الزاوية إلى قسمين متساويين؟', 'Which line splits an angle into two equal parts?'),
            options: [say('Erdibitzailea', 'La mediatriz', 'محور القطعة', 'The perpendicular bisector'), say('Erdikaria', 'La bisectriz', 'منصّف الزاوية', 'The angle bisector'), say('Erdibidekoa', 'La mediana', 'المتوسط', 'The median')],
            correctIndex: 1,
            explanation: say('Erdikaria; hiru erdikariak intzentroan elkartzen dira.', 'La bisectriz; las tres bisectrices se cortan en el incentro.', 'منصّف الزاوية؛ وتتلاقى المنصّفات الثلاثة في مركز الدائرة الداخلية.', 'The angle bisector; the three angle bisectors meet at the incentre.')
        }
    },
    quadrilaterals: {
        mistake: {
            wrong: say('Karratua ez da laukizuzena, aldeak berdinak dituelako.', 'Un cuadrado no es un rectángulo, porque sus lados son iguales.', 'المربع ليس مستطيلًا لأن أضلاعه متساوية.', 'A square is not a rectangle, because its sides are equal.'),
            right: say('Karratuak lau angelu zuzen ditu: laukizuzena da, eta erronboa ere bai.', 'El cuadrado tiene cuatro ángulos rectos: es un rectángulo, y también un rombo.', 'للمربع أربع زوايا قائمة: فهو مستطيل، ومعين أيضًا.', 'A square has four right angles: it is a rectangle, and a rhombus too.')
        },
        check: {
            prompt: say('Zein laukik ditu bi alde paralelo bakarrik?', '¿Qué cuadrilátero tiene solo dos lados paralelos?', 'أيّ رباعي له ضلعان متوازيان فقط؟', 'Which quadrilateral has only two parallel sides?'),
            options: [say('Trapezioak', 'El trapecio', 'شبه المنحرف', 'The trapezium'), say('Erronboak', 'El rombo', 'المعين', 'The rhombus'), say('Erronboideak', 'El romboide', 'متوازي الأضلاع', 'The parallelogram')],
            correctIndex: 0,
            explanation: say('Trapezioak alde paralelo pare bat du, oinarriak. Erronboak eta erronboideak bi pare dituzte.', 'El trapecio tiene un par de lados paralelos, las bases. El rombo y el romboide tienen dos pares.', 'لشبه المنحرف زوج واحد من الأضلاع المتوازية، هما القاعدتان. أما المعين ومتوازي الأضلاع فلهما زوجان.', 'A trapezium has one pair of parallel sides, the bases. A rhombus and a parallelogram have two pairs.')
        }
    },
    circle: {
        mistake: {
            wrong: say('Zirkulua ertzeko lerroa da.', 'El círculo es la línea del borde.', 'القرص هو خط الحافة.', 'The circle is the line around the edge.'),
            right: say('Lerroa zirkunferentzia da; zirkulua barruko gainazal osoa da.', 'La línea es la circunferencia; el círculo es toda la superficie de dentro.', 'الخط هو الدائرة، أما القرص فهو كل السطح الداخلي.', 'The line is the circumference; the circle is the whole surface inside.')
        },
        check: {
            prompt: say('Erradioak 9 cm neurtzen baditu, zenbat neurtzen du diametroak?', 'Si el radio mide 9 cm, ¿cuánto mide el diámetro?', 'إذا كان نصف القطر 9 سم، فكم طول القطر؟', 'If the radius is 9 cm, how long is the diameter?'),
            options: [same('$18\\ \\mathrm{cm}$'), same('$4{,}5\\ \\mathrm{cm}$'), same('$81\\ \\mathrm{cm}$')],
            correctIndex: 0,
            explanation: say('Diametroa erradioaren bikoitza da: $2\\cdot 9=18$.', 'El diámetro es el doble del radio: $2\\cdot 9=18$.', 'القطر ضعف نصف القطر: $2\\cdot 9=18$.', 'The diameter is twice the radius: $2\\cdot 9=18$.')
        }
    },

    /* ---------- 3. Pythagoras ---------- */
    pythagoras: {
        mistake: {
            wrong: say('5, 12 eta 13 aldeetako triangeluan, hipotenusa 5 da, lehena delako.', 'En un triángulo de lados 5, 12 y 13, la hipotenusa es 5, porque está primero.', 'في مثلث أضلاعه 5 و12 و13 الوتر هو 5 لأنه الأول.', 'In a triangle with sides 5, 12 and 13, the hypotenuse is 5, because it comes first.'),
            right: say('Hipotenusa alde luzeena da, 13: $13^{2}=5^{2}+12^{2}$.', 'La hipotenusa es el lado más largo, 13: $13^{2}=5^{2}+12^{2}$.', 'الوتر هو الضلع الأطول، 13: $13^{2}=5^{2}+12^{2}$.', 'The hypotenuse is the longest side, 13: $13^{2}=5^{2}+12^{2}$.')
        },
        check: {
            prompt: say('Zein triangelu da zuzena?', '¿Qué triángulo es rectángulo?', 'أيّ مثلث قائم الزاوية؟', 'Which triangle is right-angled?'),
            options: [same('$4,\\ 5,\\ 6$'), same('$9,\\ 12,\\ 15$'), same('$2,\\ 3,\\ 4$')],
            correctIndex: 1,
            explanation: say('$9^{2}+12^{2}=81+144=225=15^{2}$: Pitagoras betetzen da.', '$9^{2}+12^{2}=81+144=225=15^{2}$: se cumple Pitágoras.', '$9^{2}+12^{2}=81+144=225=15^{2}$: تتحقق مبرهنة فيثاغورس.', '$9^{2}+12^{2}=81+144=225=15^{2}$: Pythagoras holds.')
        }
    },
    'pythagoras-use': {
        mistake: {
            wrong: say('Hipotenusak 10 eta katetoak 6 neurtzen badute, beste katetoa $\\sqrt{10^{2}+6^{2}}$ da.', 'Si la hipotenusa mide 10 y un cateto 6, el otro es $\\sqrt{10^{2}+6^{2}}$.', 'إذا كان الوتر 10 وأحد الضلعين 6 فالآخر $\\sqrt{10^{2}+6^{2}}$.', 'If the hypotenuse is 10 and one leg is 6, the other is $\\sqrt{10^{2}+6^{2}}$.'),
            right: say('Katetoa kalkulatzeko kendu egiten da: $\\sqrt{10^{2}-6^{2}}=\\sqrt{64}=8$.', 'Para un cateto se resta: $\\sqrt{10^{2}-6^{2}}=\\sqrt{64}=8$.', 'لحساب ضلع القائمة نطرح: $\\sqrt{10^{2}-6^{2}}=\\sqrt{64}=8$.', 'For a leg you subtract: $\\sqrt{10^{2}-6^{2}}=\\sqrt{64}=8$.')
        },
        check: {
            prompt: say('Katetoek 9 cm eta 12 cm neurtzen dute. Zenbat neurtzen du hipotenusak?', 'Los catetos miden 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?', 'ضلعا القائمة 9 سم و12 سم. كم طول الوتر؟', 'The legs are 9 cm and 12 cm. How long is the hypotenuse?'),
            options: [same('$15\\ \\mathrm{cm}$'), same('$21\\ \\mathrm{cm}$'), same('$\\sqrt{63}\\ \\mathrm{cm}$')],
            correctIndex: 0,
            explanation: say('$\\sqrt{9^{2}+12^{2}}=\\sqrt{225}=15$. Ez dira aldeak batzen, karratuak baizik.', '$\\sqrt{9^{2}+12^{2}}=\\sqrt{225}=15$. No se suman los lados, sino sus cuadrados.', '$\\sqrt{9^{2}+12^{2}}=\\sqrt{225}=15$. لا نجمع الأضلاع بل مربعاتها.', '$\\sqrt{9^{2}+12^{2}}=\\sqrt{225}=15$. You add the squares, not the sides.')
        }
    },

    /* ---------- 4. Units and perimeters ---------- */
    units: {
        mistake: {
            wrong: say('$1\\ \\mathrm{m}^{2}=10\\ \\mathrm{dm}^{2}$', '$1\\ \\mathrm{m}^{2}=10\\ \\mathrm{dm}^{2}$', '$1\\ \\mathrm{m}^{2}=10\\ \\mathrm{dm}^{2}$', '$1\\ \\mathrm{m}^{2}=10\\ \\mathrm{dm}^{2}$'),
            right: say('Azaleran urrats bakoitzak 100 balio du: $1\\ \\mathrm{m}^{2}=100\\ \\mathrm{dm}^{2}$.', 'En superficie cada escalón vale 100: $1\\ \\mathrm{m}^{2}=100\\ \\mathrm{dm}^{2}$.', 'في المساحة كل درجة تساوي 100: $1\\ \\mathrm{m}^{2}=100\\ \\mathrm{dm}^{2}$.', 'For area, each step is worth 100: $1\\ \\mathrm{m}^{2}=100\\ \\mathrm{dm}^{2}$.')
        },
        check: {
            prompt: say('Zenbat zentimetro dira 2,5 m?', '¿Cuántos centímetros son 2,5 m?', 'كم سنتيمترًا في 2.5 م؟', 'How many centimetres are 2.5 m?'),
            options: [same('$250$'), same('$25$'), same('$2500$')],
            correctIndex: 0,
            explanation: say('m-tik cm-ra bi urrats: $2{,}5\\cdot 100=250$.', 'De m a cm hay dos escalones: $2{,}5\\cdot 100=250$.', 'من م إلى سم درجتان: $2{,}5\\cdot 100=250$.', 'From m to cm there are two steps: $2{,}5\\cdot 100=250$.')
        }
    },
    perimeter: {
        mistake: {
            wrong: say('4 m bider 30 cm-ko laukizuzen baten perimetroa $4+30+4+30=68$ da.', 'Un rectángulo de 4 m por 30 cm tiene $4+30+4+30=68$ de perímetro.', 'محيط مستطيل بعداه 4 م و30 سم هو $4+30+4+30=68$.', 'A rectangle of 4 m by 30 cm has a perimeter of $4+30+4+30=68$.'),
            right: say('Lehenik, unitate bera: 30 cm = 0,3 m, eta $P=4+0{,}3+4+0{,}3=8{,}6$ m.', 'Primero, la misma unidad: 30 cm = 0,3 m, y $P=4+0{,}3+4+0{,}3=8{,}6$ m.', 'أولًا الوحدة نفسها: 30 سم = 0.3 م، و$P=4+0{,}3+4+0{,}3=8{,}6$ م.', 'First, the same unit: 30 cm = 0.3 m, and $P=4+0{,}3+4+0{,}3=8{,}6$ m.')
        },
        check: {
            prompt: say('Zein da 11 cm-ko aldea duen karratu baten perimetroa?', '¿Cuál es el perímetro de un cuadrado de 11 cm de lado?', 'ما محيط مربع طول ضلعه 11 سم؟', 'What is the perimeter of a square with 11 cm sides?'),
            options: [same('$121\\ \\mathrm{cm}$'), same('$44\\ \\mathrm{cm}$'), same('$22\\ \\mathrm{cm}$')],
            correctIndex: 1,
            explanation: say('Lau alde berdin: $4\\cdot 11=44$. 121 azalera izango litzateke.', 'Cuatro lados iguales: $4\\cdot 11=44$. 121 sería el área.', 'أربعة أضلاع متساوية: $4\\cdot 11=44$. أما 121 فهي المساحة.', 'Four equal sides: $4\\cdot 11=44$. 121 would be the area.')
        }
    },
    circumference: {
        mistake: {
            wrong: say('4 cm-ko erradioarekin, $L=3{,}14\\cdot 4=12{,}56$ cm.', 'Con radio 4 cm, $L=3{,}14\\cdot 4=12{,}56$ cm.', 'بنصف قطر 4 سم: $L=3{,}14\\cdot 4=12{,}56$ سم.', 'With a radius of 4 cm, $L=3{,}14\\cdot 4=12{,}56$ cm.'),
            right: say('Erradioarekin 2 zenbakiaz biderkatu behar da: $L=2\\cdot 3{,}14\\cdot 4=25{,}12$ cm.', 'Con el radio hay que multiplicar por 2: $L=2\\cdot 3{,}14\\cdot 4=25{,}12$ cm.', 'مع نصف القطر يجب الضرب في 2: $L=2\\cdot 3{,}14\\cdot 4=25{,}12$ سم.', 'With the radius you multiply by 2: $L=2\\cdot 3{,}14\\cdot 4=25{,}12$ cm.')
        },
        check: {
            prompt: say('Zenbat neurtzen du 10 cm-ko diametroa duen zirkunferentzia batek?', '¿Cuánto mide una circunferencia de 10 cm de diámetro?', 'كم طول دائرة قطرها 10 سم؟', 'How long is a circumference with a 10 cm diameter?'),
            options: [same('$31{,}4\\ \\mathrm{cm}$'), same('$62{,}8\\ \\mathrm{cm}$'), same('$314\\ \\mathrm{cm}$')],
            correctIndex: 0,
            explanation: say('Diametroarekin: $L=3{,}14\\cdot 10=31{,}4$. $62{,}8$ ateratzen da 10 erradiotzat hartzen bada.', 'Con el diámetro: $L=3{,}14\\cdot 10=31{,}4$. Sale $62{,}8$ si se toma 10 como radio.', 'بالقطر: $L=3{,}14\\cdot 10=31{,}4$. ونحصل على $62{,}8$ إذا اعتبرنا 10 نصف قطر.', 'With the diameter: $L=3{,}14\\cdot 10=31{,}4$. You get $62{,}8$ if you take 10 as the radius.')
        }
    },

    /* ---------- 5. Areas ---------- */
    'area-rectangles': {
        mistake: {
            wrong: say('Paralelogramo baten oinarria 10 cm da, alde makurra 6 cm eta altuera 5 cm; azalera $10\\cdot 6=60$ cm² da.', 'Un paralelogramo de base 10 cm, lado inclinado 6 cm y altura 5 cm tiene un área de $10\\cdot 6=60$ cm².', 'متوازي أضلاع قاعدته 10 سم وضلعه المائل 6 سم وارتفاعه 5 سم مساحته $10\\cdot 6=60$ سم².', 'A parallelogram with base 10 cm, slanted side 6 cm and height 5 cm has an area of $10\\cdot 6=60$ cm².'),
            right: say('Altuera erabiltzen da, ez alde makurra: $A=10\\cdot 5=50$ cm².', 'Se usa la altura, no el lado inclinado: $A=10\\cdot 5=50$ cm².', 'نستعمل الارتفاع لا الضلع المائل: $A=10\\cdot 5=50$ سم².', 'Use the height, not the slanted side: $A=10\\cdot 5=50$ cm².')
        },
        check: {
            prompt: say('Zein da 7 cm-ko aldea duen karratu baten azalera?', '¿Cuál es el área de un cuadrado de 7 cm de lado?', 'ما مساحة مربع طول ضلعه 7 سم؟', 'What is the area of a square with 7 cm sides?'),
            options: [same('$28\\ \\mathrm{cm}^{2}$'), same('$14\\ \\mathrm{cm}^{2}$'), same('$49\\ \\mathrm{cm}^{2}$')],
            correctIndex: 2,
            explanation: say('Aldea bider aldea: $7\\cdot 7=49$. 28 perimetroa da.', 'Lado por lado: $7\\cdot 7=49$. 28 es el perímetro.', 'الضلع في الضلع: $7\\cdot 7=49$. أما 28 فهو المحيط.', 'Side times side: $7\\cdot 7=49$. 28 is the perimeter.')
        }
    },
    'area-triangle': {
        mistake: {
            wrong: say('8 cm-ko oinarria eta 5 cm-ko altuera dituen triangelu baten azalera $8\\cdot 5=40$ cm² da.', 'Un triángulo de base 8 cm y altura 5 cm tiene un área de $8\\cdot 5=40$ cm².', 'مساحة مثلث قاعدته 8 سم وارتفاعه 5 سم هي $8\\cdot 5=40$ سم².', 'A triangle with base 8 cm and height 5 cm has an area of $8\\cdot 5=40$ cm².'),
            right: say('Bitan zatitzea falta da: $A=\\frac{8\\cdot 5}{2}=20$ cm².', 'Falta dividir entre dos: $A=\\frac{8\\cdot 5}{2}=20$ cm².', 'ينقص القسمة على 2: $A=\\frac{8\\cdot 5}{2}=20$ سم².', 'You still have to divide by two: $A=\\frac{8\\cdot 5}{2}=20$ cm².')
        },
        check: {
            prompt: say('Zein da 12 cm-ko oinarria eta 7 cm-ko altuera dituen triangelu baten azalera?', '¿Cuál es el área de un triángulo de base 12 cm y altura 7 cm?', 'ما مساحة مثلث قاعدته 12 سم وارتفاعه 7 سم؟', 'What is the area of a triangle with base 12 cm and height 7 cm?'),
            options: [same('$42\\ \\mathrm{cm}^{2}$'), same('$84\\ \\mathrm{cm}^{2}$'), same('$19\\ \\mathrm{cm}^{2}$')],
            correctIndex: 0,
            explanation: say('$\\frac{12\\cdot 7}{2}=42$: laukizuzenaren erdia.', '$\\frac{12\\cdot 7}{2}=42$: la mitad del rectángulo.', '$\\frac{12\\cdot 7}{2}=42$: نصف المستطيل.', '$\\frac{12\\cdot 7}{2}=42$: half the rectangle.')
        }
    },
    'area-circle': {
        mistake: {
            wrong: say('5 cm-ko erradioarekin, $A=3{,}14\\cdot 10=31{,}4$ cm².', 'Con radio 5 cm, $A=3{,}14\\cdot 10=31{,}4$ cm².', 'بنصف قطر 5 سم: $A=3{,}14\\cdot 10=31{,}4$ سم².', 'With a radius of 5 cm, $A=3{,}14\\cdot 10=31{,}4$ cm².'),
            right: say('Erradioaren karratua da, ez bikoitza: $A=3{,}14\\cdot 5^{2}=78{,}5$ cm².', 'Es el radio al cuadrado, no el doble: $A=3{,}14\\cdot 5^{2}=78{,}5$ cm².', 'إنه مربع نصف القطر لا ضعفه: $A=3{,}14\\cdot 5^{2}=78{,}5$ سم².', 'It is the radius squared, not doubled: $A=3{,}14\\cdot 5^{2}=78{,}5$ cm².')
        },
        check: {
            prompt: say('Zein da 4 cm-ko erradioa duen zirkulu baten azalera?', '¿Cuál es el área de un círculo de 4 cm de radio?', 'ما مساحة قرص نصف قطره 4 سم؟', 'What is the area of a circle with a 4 cm radius?'),
            options: [same('$50{,}24\\ \\mathrm{cm}^{2}$'), same('$25{,}12\\ \\mathrm{cm}^{2}$'), same('$12{,}56\\ \\mathrm{cm}^{2}$')],
            correctIndex: 0,
            explanation: say('$3{,}14\\cdot 4^{2}=3{,}14\\cdot 16=50{,}24$.', '$3{,}14\\cdot 4^{2}=3{,}14\\cdot 16=50{,}24$.', '$3{,}14\\cdot 4^{2}=3{,}14\\cdot 16=50{,}24$.', '$3{,}14\\cdot 4^{2}=3{,}14\\cdot 16=50{,}24$.')
        }
    }
}

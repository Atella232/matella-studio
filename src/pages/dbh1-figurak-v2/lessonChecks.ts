import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Irudi lauak · 1. DBH — the typical mistake and the «Check it» question
   of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. π is 3,14 as in the lessons.
   ========================================================================== */

export type FiguresTopicId = 'diagonals' | 'angle-sum' | 'regular-angles' | 'triangle-exists' | 'side-angle' | 'centers' | 'quad-diagonals' | 'quad-angles' | 'symmetry' | 'line-circle' | 'two-circles' | 'circle-angles' | 'composite' | 'sector-ring' | 'area-problems'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const figuresLessonChecks: Record<FiguresTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Polygons ---------- */
    diagonals: {
        mistake: {
            wrong: say('Pentagono batek $5\\cdot 2=10$ diagonal ditu.', 'Un pentágono tiene $5\\cdot 2=10$ diagonales.', 'للمخمس $5\\cdot 2=10$ أقطار.', 'A pentagon has $5\\cdot 2=10$ diagonals.'),
            right: say('Diagonal bakoitza bi aldiz zenbatu da: $\\frac{5\\cdot 2}{2}=5$ diagonal.', 'Cada diagonal se ha contado dos veces: $\\frac{5\\cdot 2}{2}=5$ diagonales.', 'عُدّ كل قطر مرتين: $\\frac{5\\cdot 2}{2}=5$ أقطار.', 'Each diagonal has been counted twice: $\\frac{5\\cdot 2}{2}=5$ diagonals.')
        },
        check: {
            prompt: say('Zenbat diagonal ateratzen dira heptagono baten erpin batetik?', '¿Cuántas diagonales salen de un vértice de un heptágono?', 'كم قطرًا يخرج من رأس واحد في المسبع؟', 'How many diagonals come out of one vertex of a heptagon?'),
            options: [same('$4$'), same('$7$'), same('$14$')],
            correctIndex: 0,
            explanation: say('$7-3=4$: ez bere buruarekin, ez bi auzokideekin.', '$7-3=4$: ni consigo mismo ni con sus dos vecinos.', '$7-3=4$: لا مع نفسه ولا مع جاريه.', '$7-3=4$: not with itself nor with its two neighbours.')
        }
    },
    'angle-sum': {
        mistake: {
            wrong: say('Heptagono baten angeluek $7\\cdot 180^{\\circ}$ batzen dute.', 'Los ángulos de un heptágono suman $7\\cdot 180^{\\circ}$.', 'مجموع زوايا المسبع $7\\cdot 180^{\\circ}$.', 'The angles of a heptagon add up to $7\\cdot 180^{\\circ}$.'),
            right: say('$7-2=5$ triangelutan banatzen da: $5\\cdot 180^{\\circ}=900^{\\circ}$.', 'Se divide en $7-2=5$ triángulos: $5\\cdot 180^{\\circ}=900^{\\circ}$.', 'ينقسم إلى $7-2=5$ مثلثات: $5\\cdot 180^{\\circ}=900^{\\circ}$.', 'It splits into $7-2=5$ triangles: $5\\cdot 180^{\\circ}=900^{\\circ}$.')
        },
        check: {
            prompt: say('Zenbat batzen dute eneagono baten (9 alde) barne-angeluek?', '¿Cuánto suman los ángulos interiores de un eneágono (9 lados)?', 'كم مجموع الزوايا الداخلية للمتسع (9 أضلاع)؟', 'What do the interior angles of a nonagon (9 sides) add up to?'),
            options: [same('$1620^{\\circ}$'), same('$1260^{\\circ}$'), same('$1080^{\\circ}$')],
            correctIndex: 1,
            explanation: say('$(9-2)\\cdot 180^{\\circ}=7\\cdot 180^{\\circ}=1260^{\\circ}$.', '$(9-2)\\cdot 180^{\\circ}=7\\cdot 180^{\\circ}=1260^{\\circ}$.', '$(9-2)\\cdot 180^{\\circ}=7\\cdot 180^{\\circ}=1260^{\\circ}$.', '$(9-2)\\cdot 180^{\\circ}=7\\cdot 180^{\\circ}=1260^{\\circ}$.')
        }
    },
    'regular-angles': {
        mistake: {
            wrong: say('Pentagono erregularraren barne-angeluak $\\frac{360^{\\circ}}{5}=72^{\\circ}$ neurtzen ditu.', 'El ángulo interior del pentágono regular mide $\\frac{360^{\\circ}}{5}=72^{\\circ}$.', 'الزاوية الداخلية للمخمس المنتظم $\\frac{360^{\\circ}}{5}=72^{\\circ}$.', 'The interior angle of a regular pentagon is $\\frac{360^{\\circ}}{5}=72^{\\circ}$.'),
            right: say('Hori angelu zentrala da. Barnekoa $\\frac{540^{\\circ}}{5}=108^{\\circ}$ da.', 'Ese es el central. El interior es $\\frac{540^{\\circ}}{5}=108^{\\circ}$.', 'تلك هي الزاوية المركزية. أما الداخلية فهي $\\frac{540^{\\circ}}{5}=108^{\\circ}$.', 'That is the central angle. The interior one is $\\frac{540^{\\circ}}{5}=108^{\\circ}$.')
        },
        check: {
            prompt: say('Zein poligono erregularrek lauzatzen du lurra bera bakarrik?', '¿Qué polígono regular embaldosa el suelo él solo?', 'أيّ مضلع منتظم يبلّط الأرض وحده؟', 'Which regular polygon tiles the floor on its own?'),
            options: [say('Pentagonoak', 'El pentágono', 'المخمس', 'The pentagon'), say('Hexagonoak', 'El hexágono', 'المسدس', 'The hexagon'), say('Oktogonoak', 'El octógono', 'المثمن', 'The octagon')],
            correctIndex: 1,
            explanation: say('Haren barne-angeluak, $120^{\\circ}$, zehazki zatitzen du $360^{\\circ}$: hiru hexagono erpin bakoitzean.', 'Su ángulo interior, $120^{\\circ}$, divide a $360^{\\circ}$: tres hexágonos en cada vértice.', 'زاويته الداخلية $120^{\\circ}$ تقسم $360^{\\circ}$: ثلاثة مسدسات عند كل رأس.', 'Its interior angle, $120^{\\circ}$, divides $360^{\\circ}$: three hexagons at each corner.')
        }
    },

    /* ---------- 2. Triangles ---------- */
    'triangle-exists': {
        mistake: {
            wrong: say('4, 4 eta 9 cm-ko aldeekin triangelua eraiki daiteke, $9+4>4$ delako.', 'Con 4, 4 y 9 cm sí se puede, porque $9+4>4$.', 'مع 4 و4 و9 سم يمكن البناء لأن $9+4>4$.', 'With 4, 4 and 9 cm it can be built, because $9+4>4$.'),
            right: say('Alde handiena egiaztatu behar da: $9>4+4=8$; beraz, ez da ixten.', 'Hay que comprobar el lado mayor: $9>4+4=8$, así que no se cierra.', 'يجب فحص الضلع الأكبر: $9>4+4=8$، إذن لا ينغلق.', 'You have to check the longest side: $9>4+4=8$, so it does not close.')
        },
        check: {
            prompt: say('Zein hiru aldekin eraiki daiteke triangelu bat?', '¿Con qué tres lados se puede construir un triángulo?', 'بأيّ أضلاع ثلاثة يمكن بناء مثلث؟', 'With which three sides can a triangle be built?'),
            options: [same('$2,\\ 3,\\ 6$'), same('$5,\\ 6,\\ 10$'), same('$4,\\ 5,\\ 9$')],
            correctIndex: 1,
            explanation: say('$10<5+6=11$: ixten da. $6>2+3$ eta $9=4+5$: ez.', '$10<5+6=11$: se cierra. $6>2+3$ y $9=4+5$: no.', '$10<5+6=11$: ينغلق. أما $6>2+3$ و$9=4+5$ فلا.', '$10<5+6=11$: it closes. $6>2+3$ and $9=4+5$: no.')
        }
    },
    'side-angle': {
        mistake: {
            wrong: say('4, 6 eta 9 cm-ko aldeak dituen triangelu batean, angelu handiena 6 eta 9 cm-ko aldeen artean dago.', 'En un triángulo de lados 4, 6 y 9 cm, el ángulo mayor está entre los lados de 6 y 9 cm.', 'في مثلث أضلاعه 4 و6 و9 سم تقع الزاوية الكبرى بين الضلعين 6 و9 سم.', 'In a triangle with sides 4, 6 and 9 cm, the biggest angle is between the 6 cm and 9 cm sides.'),
            right: say('Angelu handiena alde handiaren aurrean dago, 9 cm-koaren aurrean: 4 eta 6 cm-ko aldeek osatzen dutena da.', 'El ángulo mayor está frente al lado mayor, el de 9 cm: es el que forman los lados de 4 y 6 cm.', 'الزاوية الكبرى تقابل الضلع الأكبر 9 سم: إنها التي يكوّنها الضلعان 4 و6 سم.', 'The biggest angle is opposite the longest side, the 9 cm one: it is the one between the 4 cm and 6 cm sides.')
        },
        check: {
            prompt: say('Triangelu batean, $a=8$ cm, $b=5$ cm eta $c=10$ cm. Zein angelu da txikiena?', 'En un triángulo, $a=8$ cm, $b=5$ cm y $c=10$ cm. ¿Qué ángulo es el menor?', 'في مثلث $a=8$ سم و$b=5$ سم و$c=10$ سم. أيّ زاوية هي الصغرى؟', 'In a triangle, $a=8$ cm, $b=5$ cm and $c=10$ cm. Which angle is the smallest?'),
            options: [same('$\\hat{A}$'), same('$\\hat{B}$'), same('$\\hat{C}$')],
            correctIndex: 1,
            explanation: say('Angelu txikiena alde txikienaren aurrean dago, $b$ aldearen aurrean: $\\hat{B}$.', 'El menor está frente al lado menor, $b$: $\\hat{B}$.', 'الزاوية الصغرى تقابل الضلع الأصغر $b$: $\\hat{B}$.', 'The smallest is opposite the shortest side, $b$: $\\hat{B}$.')
        }
    },
    centers: {
        mistake: {
            wrong: say('Inskribatutako zirkunferentzia hiru erpinetatik pasatzen da.', 'La circunferencia inscrita pasa por los tres vértices.', 'الدائرة الداخلية تمر بالرؤوس الثلاثة.', 'The inscribed circle goes through the three vertices.'),
            right: say('Erpinetatik zirkunskribatua pasatzen da; inskribatuak hiru aldeak ukitzen ditu barrutik.', 'La que pasa por los vértices es la circunscrita; la inscrita toca los tres lados por dentro.', 'التي تمر بالرؤوس هي الدائرة المحيطة؛ أما الداخلية فتمس الأضلاع الثلاثة من الداخل.', 'The one through the vertices is the circumscribed circle; the inscribed one touches the three sides from inside.')
        },
        check: {
            prompt: say('Non dago triangelu kamuts baten zirkunzentroa?', '¿Dónde está el circuncentro de un triángulo obtusángulo?', 'أين يقع مركز الدائرة المحيطة بمثلث منفرج الزاوية؟', 'Where is the circumcentre of an obtuse-angled triangle?'),
            options: [say('Barruan', 'Dentro', 'في الداخل', 'Inside'), say('Alde batean', 'En un lado', 'على أحد الأضلاع', 'On a side'), say('Kanpoan', 'Fuera', 'في الخارج', 'Outside')],
            correctIndex: 2,
            explanation: say('Kamutsean kanpoan dago; zuzenean, hipotenusaren erdian; zorrotzean, barruan.', 'En el obtusángulo está fuera; en el rectángulo, en el punto medio de la hipotenusa; en el acutángulo, dentro.', 'في منفرج الزاوية يقع خارجه؛ وفي القائم في منتصف الوتر؛ وفي الحاد داخله.', 'In an obtuse-angled triangle it is outside; in a right-angled one, at the midpoint of the hypotenuse; in an acute-angled one, inside.')
        }
    },

    /* ---------- 3. Quadrilaterals ---------- */
    'quad-diagonals': {
        mistake: {
            wrong: say('Laukizuzen baten diagonalak perpendikularrak dira.', 'Las diagonales de un rectángulo son perpendiculares.', 'قطرا المستطيل متعامدان.', 'The diagonals of a rectangle are perpendicular.'),
            right: say('Berdinak dira eta erdian ebakitzen dira, baina ez dira perpendikularrak (karratuan izan ezik).', 'Son iguales y se cortan en su punto medio, pero no son perpendiculares (salvo en el cuadrado).', 'هما متساويان ويتقاطعان في منتصفيهما، لكنهما غير متعامدين (إلا في المربع).', 'They are equal and cross at their midpoints, but they are not perpendicular (except in a square).')
        },
        check: {
            prompt: say('Zein laukitan dira diagonalak berdinak eta perpendikularrak?', '¿En qué cuadrilátero las diagonales son iguales y perpendiculares?', 'في أيّ رباعي يكون القطران متساويين ومتعامدين؟', 'In which quadrilateral are the diagonals equal and perpendicular?'),
            options: [say('Erronboan', 'Rombo', 'المعين', 'Rhombus'), say('Karratuan', 'Cuadrado', 'المربع', 'Square'), say('Laukizuzenean', 'Rectángulo', 'المستطيل', 'Rectangle')],
            correctIndex: 1,
            explanation: say('Karratua laukizuzena (berdinak) eta erronboa (perpendikularrak) da aldi berean.', 'El cuadrado es a la vez rectángulo (iguales) y rombo (perpendiculares).', 'المربع مستطيل (قطران متساويان) ومعين (قطران متعامدان) في آن واحد.', 'A square is a rectangle (equal) and a rhombus (perpendicular) at the same time.')
        }
    },
    'quad-angles': {
        mistake: {
            wrong: say('Erronboide batean, ondoko angeluak berdinak dira.', 'En un romboide, los ángulos consecutivos son iguales.', 'في متوازي الأضلاع الزاويتان المتتاليتان متساويتان.', 'In a parallelogram, consecutive angles are equal.'),
            right: say('Berdinak aurkakoak dira; ondokoek $180^{\\circ}$ batzen dituzte.', 'Los iguales son los opuestos; los consecutivos suman $180^{\\circ}$.', 'المتساويتان هما المتقابلتان؛ أما المتتاليتان فمجموعهما $180^{\\circ}$.', 'The equal ones are the opposite angles; consecutive ones add up to $180^{\\circ}$.')
        },
        check: {
            prompt: say('Paralelogramo batean angelu batek $80^{\\circ}$ neurtzen du. Zenbat neurtzen du ondoko angelu batek?', 'En un paralelogramo, un ángulo mide $80^{\\circ}$. ¿Cuánto mide un ángulo consecutivo?', 'في متوازي أضلاع زاوية قياسها $80^{\\circ}$. كم قياس الزاوية المتتالية معها؟', 'In a parallelogram, one angle is $80^{\\circ}$. What is a consecutive angle?'),
            options: [same('$100^{\\circ}$'), same('$80^{\\circ}$'), same('$280^{\\circ}$')],
            correctIndex: 0,
            explanation: say('Ondokoak betegarriak dira: $180^{\\circ}-80^{\\circ}=100^{\\circ}$.', 'Los consecutivos son suplementarios: $180^{\\circ}-80^{\\circ}=100^{\\circ}$.', 'المتتاليتان متكاملتان: $180^{\\circ}-80^{\\circ}=100^{\\circ}$.', 'Consecutive angles are supplementary: $180^{\\circ}-80^{\\circ}=100^{\\circ}$.')
        }
    },
    symmetry: {
        mistake: {
            wrong: say('Laukizuzenak 4 simetria-ardatz ditu, karratuak bezala: diagonalak ere bai.', 'El rectángulo tiene 4 ejes de simetría, como el cuadrado: también las diagonales.', 'للمستطيل 4 محاور تناظر مثل المربع: والقطران أيضًا.', 'A rectangle has 4 lines of symmetry, like a square: the diagonals too.'),
            right: say('Laukizuzena diagonaletik tolestean, zatiak ez datoz bat: 2 ardatz bakarrik ditu.', 'Al doblar un rectángulo por la diagonal, las partes no coinciden: solo tiene 2 ejes.', 'إذا طوينا المستطيل على قطره لا ينطبق النصفان: له محوران فقط.', 'If you fold a rectangle along a diagonal, the halves do not match: it has only 2 lines.')
        },
        check: {
            prompt: say('Zenbat simetria-ardatz ditu triangelu aldeberdin batek?', '¿Cuántos ejes de simetría tiene un triángulo equilátero?', 'كم محور تناظر للمثلث المتساوي الأضلاع؟', 'How many lines of symmetry does an equilateral triangle have?'),
            options: [same('$3$'), same('$1$'), same('$6$')],
            correctIndex: 0,
            explanation: say('Poligono erregularra da: $n=3$ ardatz, erpin bakoitzetik aurkako aldearen erdira.', 'Es un polígono regular: $n=3$ ejes, de cada vértice al punto medio del lado opuesto.', 'إنه مضلع منتظم: $n=3$ محاور، من كل رأس إلى منتصف الضلع المقابل.', 'It is a regular polygon: $n=3$ lines, from each vertex to the midpoint of the opposite side.')
        }
    },

    /* ---------- 4. Circles ---------- */
    'line-circle': {
        mistake: {
            wrong: say('Zuzena zentrotik 7 cm-ra badago eta erradioak 7 cm neurtzen baditu, zuzenak bi puntutan ebakitzen du.', 'Si la recta está a 7 cm del centro y el radio mide 7 cm, la recta corta en dos puntos.', 'إذا كان المستقيم على بعد 7 سم من المركز ونصف القطر 7 سم، فإنه يقطع الدائرة في نقطتين.', 'If the line is 7 cm from the centre and the radius is 7 cm, the line cuts in two points.'),
            right: say('$d=r$ bada, puntu batean bakarrik ukitzen du: ukitzailea da.', 'Si $d=r$, solo la toca en un punto: es tangente.', 'إذا كان $d=r$ فإنه يمسها في نقطة واحدة: إنه مماس.', 'If $d=r$, it only touches at one point: it is a tangent.')
        },
        check: {
            prompt: say('Erradioak 3 cm neurtzen ditu, eta zuzena zentrotik 2 cm-ra dago. Nolakoa da?', 'El radio mide 3 cm y la recta está a 2 cm del centro. ¿Cómo es?', 'نصف القطر 3 سم والمستقيم على بعد 2 سم من المركز. ما وضعه؟', 'The radius is 3 cm and the line is 2 cm from the centre. What is it?'),
            options: [say('Kanpokoa', 'Exterior', 'خارجي', 'Outside'), say('Ukitzailea', 'Tangente', 'مماس', 'Tangent'), say('Ebakitzailea', 'Secante', 'قاطع', 'Secant')],
            correctIndex: 2,
            explanation: say('$2<3$: $d<r$, bi puntutan ebakitzen du.', '$2<3$: $d<r$, la corta en dos puntos.', '$2<3$: $d<r$، فيقطعها في نقطتين.', '$2<3$: $d<r$, it cuts in two points.')
        }
    },
    'two-circles': {
        mistake: {
            wrong: say('6 eta 2 cm-ko erradioak, zentroak 3 cm-ra: $3<6+2$ denez, ebakitzaileak dira.', 'Radios de 6 y 2 cm, centros a 3 cm: como $3<6+2$, son secantes.', 'نصفا قطرين 6 و2 سم والمركزان على بعد 3 سم: بما أن $3<6+2$ فهما متقاطعتان.', 'Radii of 6 and 2 cm, centres 3 cm apart: since $3<6+2$, they cross.'),
            right: say('Kendura ere begiratu behar da: $3<6-2=4$; beraz, barrukoak dira.', 'También hay que mirar la resta: $3<6-2=4$, así que son interiores.', 'يجب النظر إلى الفرق أيضًا: $3<6-2=4$، إذن هما متداخلتان.', 'You must look at the difference too: $3<6-2=4$, so one is inside the other.')
        },
        check: {
            prompt: say('8 cm eta 3 cm-ko erradioak, zentroak 11 cm-ra. Nolakoak dira?', 'Radios de 8 cm y 3 cm, centros a 11 cm. ¿Cómo son?', 'نصفا القطرين 8 سم و3 سم والمركزان على بعد 11 سم. ما وضعهما؟', 'Radii of 8 cm and 3 cm, centres 11 cm apart. What are they?'),
            options: [say('Ebakitzaileak', 'Secantes', 'متقاطعتان', 'Crossing'), say('Kanpo-ukitzaileak', 'Tangentes exteriores', 'متماستان من الخارج', 'Touching outside'), say('Kanpokoak', 'Exteriores', 'متباعدتان', 'Apart')],
            correctIndex: 1,
            explanation: say('$8+3=11=d$: kanpotik ukitzen dira, puntu batean.', '$8+3=11=d$: se tocan por fuera, en un punto.', '$8+3=11=d$: تتماسان من الخارج في نقطة واحدة.', '$8+3=11=d$: they touch on the outside, at one point.')
        }
    },
    'circle-angles': {
        mistake: {
            wrong: say('Zentralak $80^{\\circ}$ neurtzen badu, arku bereko inskribatuak $160^{\\circ}$ neurtzen ditu.', 'Si el central mide $80^{\\circ}$, el inscrito sobre el mismo arco mide $160^{\\circ}$.', 'إذا كانت المركزية $80^{\\circ}$ فالمحيطية على القوس نفسه $160^{\\circ}$.', 'If the central angle is $80^{\\circ}$, the inscribed one on the same arc is $160^{\\circ}$.'),
            right: say('Alderantziz da: inskribatua erdia da, $40^{\\circ}$.', 'Es al revés: el inscrito es la mitad, $40^{\\circ}$.', 'بالعكس: المحيطية نصفها، $40^{\\circ}$.', 'It is the other way round: the inscribed angle is half, $40^{\\circ}$.')
        },
        check: {
            prompt: say('Angelu inskribatu batek diametro bat hartzen du. Zenbat neurtzen du?', 'Un ángulo inscrito abarca un diámetro. ¿Cuánto mide?', 'زاوية محيطية تقابل قطرًا. كم قياسها؟', 'An inscribed angle stands on a diameter. What is it?'),
            options: [same('$90^{\\circ}$'), same('$180^{\\circ}$'), same('$360^{\\circ}$')],
            correctIndex: 0,
            explanation: say('Zentrala laua da, $180^{\\circ}$; inskribatua erdia, $90^{\\circ}$.', 'El central es llano, $180^{\\circ}$; el inscrito, la mitad, $90^{\\circ}$.', 'المركزية مستقيمة $180^{\\circ}$، والمحيطية نصفها $90^{\\circ}$.', 'The central angle is straight, $180^{\\circ}$; the inscribed one is half, $90^{\\circ}$.')
        }
    },

    /* ---------- 5. Areas ---------- */
    composite: {
        mistake: {
            wrong: say('20 × 15 cm-ko marko batek, 12 × 8 cm-ko zuloarekin, $20\\cdot 15=300$ cm² ditu.', 'Un marco de 20 × 15 cm con un hueco de 12 × 8 cm tiene un área de $20\\cdot 15=300$ cm².', 'إطار أبعاده 20 × 15 سم فيه فتحة 12 × 8 سم مساحته $20\\cdot 15=300$ سم².', 'A 20 × 15 cm frame with a 12 × 8 cm hole has an area of $20\\cdot 15=300$ cm².'),
            right: say('Zuloa kendu behar da: $300-12\\cdot 8=300-96=204$ cm².', 'Hay que restar el hueco: $300-12\\cdot 8=300-96=204$ cm².', 'يجب طرح الفتحة: $300-12\\cdot 8=300-96=204$ سم².', 'You have to take away the hole: $300-12\\cdot 8=300-96=204$ cm².')
        },
        check: {
            prompt: say('L bat 6 × 2 cm-ko laukizuzen batek eta 2 × 4 cm-ko beste batek osatzen dute. Zein da haren azalera?', 'Una L se forma con un rectángulo de 6 × 2 cm y otro de 2 × 4 cm. ¿Cuál es su área?', 'شكل L مكوّن من مستطيل 6 × 2 سم وآخر 2 × 4 سم. ما مساحته؟', 'An L is made of a 6 × 2 cm rectangle and a 2 × 4 cm one. What is its area?'),
            options: [same('$20\\ \\mathrm{cm}^{2}$'), same('$12\\ \\mathrm{cm}^{2}$'), same('$48\\ \\mathrm{cm}^{2}$')],
            correctIndex: 0,
            explanation: say('Piezak batzen dira: $12+8=20$.', 'Se suman las piezas: $12+8=20$.', 'نجمع القطعتين: $12+8=20$.', 'Add the pieces: $12+8=20$.')
        }
    },
    'sector-ring': {
        mistake: {
            wrong: say('5 eta 3 cm-ko erradioetako koroa: $3{,}14\\cdot(5-3)^{2}=12{,}56$ cm².', 'Corona de radios 5 y 3 cm: $3{,}14\\cdot(5-3)^{2}=12{,}56$ cm².', 'حلقة نصفا قطريها 5 و3 سم: $3{,}14\\cdot(5-3)^{2}=12{,}56$ سم².', 'A ring with radii 5 and 3 cm: $3{,}14\\cdot(5-3)^{2}=12{,}56$ cm².'),
            right: say('Lehenik karratuak: $3{,}14\\cdot(5^{2}-3^{2})=50{,}24$ cm².', 'Primero los cuadrados: $3{,}14\\cdot(5^{2}-3^{2})=50{,}24$ cm².', 'المربعات أولًا: $3{,}14\\cdot(5^{2}-3^{2})=50{,}24$ سم².', 'Squares first: $3{,}14\\cdot(5^{2}-3^{2})=50{,}24$ cm².')
        },
        check: {
            prompt: say('Zirkuluaren zer zati da $120^{\\circ}$-ko sektore bat?', '¿Qué parte del círculo es un sector de $120^{\\circ}$?', 'ما الجزء من القرص الذي يمثله قطاع زاويته $120^{\\circ}$؟', 'What part of the circle is a $120^{\\circ}$ sector?'),
            options: [same('$\\frac{1}{3}$'), same('$\\frac{1}{4}$'), same('$\\frac{1}{120}$')],
            correctIndex: 0,
            explanation: say('$\\frac{120}{360}=\\frac{1}{3}$: herena.', '$\\frac{120}{360}=\\frac{1}{3}$: un tercio.', '$\\frac{120}{360}=\\frac{1}{3}$: الثلث.', '$\\frac{120}{360}=\\frac{1}{3}$: a third.')
        }
    },
    'area-problems': {
        mistake: {
            wrong: say('20 cm-ko aldeko zenbat lauza sartzen diren 4 m²-tan jakiteko, $4\\mathbin{:}400$ zatitzen dut.', 'Para saber cuántas baldosas de 20 cm de lado caben en 4 m², divido $4\\mathbin{:}400$.', 'لمعرفة عدد البلاطات التي طول ضلعها 20 سم في 4 م² أقسم $4\\mathbin{:}400$.', 'To know how many 20 cm tiles fit in 4 m², I divide $4\\mathbin{:}400$.'),
            right: say('Unitate bera: $4\\ \\mathrm{m}^{2}=40\\,000\\ \\mathrm{cm}^{2}$, eta $40\\,000\\mathbin{:}400=100$ lauza.', 'Misma unidad: $4\\ \\mathrm{m}^{2}=40\\,000\\ \\mathrm{cm}^{2}$ y $40\\,000\\mathbin{:}400=100$ baldosas.', 'الوحدة نفسها: $4\\ \\mathrm{m}^{2}=40\\,000\\ \\mathrm{cm}^{2}$، و$40\\,000\\mathbin{:}400=100$ بلاطة.', 'Same unit: $4\\ \\mathrm{m}^{2}=40\\,000\\ \\mathrm{cm}^{2}$ and $40\\,000\\mathbin{:}400=100$ tiles.')
        },
        check: {
            prompt: say('Gela baten inguruan zokalo bat jartzeko, zer kalkulatzen duzu?', 'Para poner un rodapié alrededor de una habitación, ¿qué calculas?', 'لوضع إفريز حول غرفة، ماذا تحسب؟', 'To put a skirting board around a room, what do you work out?'),
            options: [say('Azalera', 'El área', 'المساحة', 'The area'), say('Perimetroa', 'El perímetro', 'المحيط', 'The perimeter'), say('Bolumena', 'El volumen', 'الحجم', 'The volume')],
            correctIndex: 1,
            explanation: say('Inguratu: perimetroa, luzera bat. Estali: azalera.', 'Rodear: perímetro, una longitud. Cubrir: área.', 'الإحاطة: المحيط، وهو طول. التغطية: المساحة.', 'Going round: perimeter, a length. Covering: area.')
        }
    }
}

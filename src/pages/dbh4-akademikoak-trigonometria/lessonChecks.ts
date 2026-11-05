import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Trigonometria · 4. DBH akademikoak — the typical mistake and the «Check
   it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics and gives \sin and \tan
   each language's names (localizeNames in text.ts).
   ========================================================================== */

export type TrigonometryTopicId = 'right-ratios' | 'ratio-properties' | 'notable-angles' | 'fundamental' | 'one-ratio' | 'calculator' | 'two-sides' | 'side-angle' | 'elevation' | 'double-observation' | 'oblique' | 'trig-area' | 'unit-circle' | 'reduction' | 'radians'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const trigonometryLessonChecks: Record<TrigonometryTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'right-ratios': {
        mistake: {
            wrong: say('6-8-10 triangeluan, $\\alpha$ angeluaren aurkako katetoa 6 bada, $\\sin\\alpha=\\frac{8}{10}$.', 'En el triángulo 6-8-10, si el cateto opuesto a $\\alpha$ mide 6, $\\sin\\alpha=\\frac{8}{10}$.', 'في المثلث 6-8-10 إذا كان الضلع المقابل لـ $\\alpha$ هو 6 فإن $\\sin\\alpha=\\frac{8}{10}$.', 'In the 6-8-10 triangle, if the leg opposite $\\alpha$ is 6, $\\sin\\alpha=\\frac{8}{10}$.'),
            right: say('Sinuak aurkakoa erabiltzen du: $\\sin\\alpha=\\frac{6}{10}$; $\\frac{8}{10}$ kosinua da.', 'El seno usa el opuesto: $\\sin\\alpha=\\frac{6}{10}$; $\\frac{8}{10}$ es el coseno.', 'الجيب يستعمل المقابل: $\\sin\\alpha=\\frac{6}{10}$؛ أما $\\frac{8}{10}$ فهو جيب التمام.', 'The sine uses the opposite leg: $\\sin\\alpha=\\frac{6}{10}$; $\\frac{8}{10}$ is the cosine.')
        },
        check: {
            prompt: say('Triangelu angeluzuzen batean, $\\alpha$ angeluaren aurkako katetoa 5 da eta hipotenusa 13. Zenbat da $\\cos\\alpha$?', 'En un triángulo rectángulo, el cateto opuesto a $\\alpha$ mide 5 y la hipotenusa 13. ¿Cuánto vale $\\cos\\alpha$?', 'في مثلث قائم الضلع المقابل لـ $\\alpha$ طوله 5 والوتر 13. كم يساوي $\\cos\\alpha$؟', 'In a right-angled triangle, the leg opposite $\\alpha$ is 5 and the hypotenuse 13. What is $\\cos\\alpha$?'),
            options: [same('$\\frac{12}{13}$'), same('$\\frac{5}{13}$'), same('$\\frac{5}{12}$')],
            correctIndex: 0,
            explanation: say('Ondoko katetoa $\\sqrt{13^{2}-5^{2}}=12$ da, eta kosinua ondokoa zati hipotenusa.', 'El cateto contiguo es $\\sqrt{13^{2}-5^{2}}=12$, y el coseno es contiguo entre hipotenusa.', 'الضلع المجاور $\\sqrt{13^{2}-5^{2}}=12$، وجيب التمام هو المجاور على الوتر.', 'The adjacent leg is $\\sqrt{13^{2}-5^{2}}=12$, and the cosine is adjacent over hypotenuse.')
        }
    },
    'ratio-properties': {
        mistake: {
            wrong: say('Angelu bera duen triangelu handiago batek sinu handiagoa du.', 'Un triángulo más grande con el mismo ángulo tiene un seno mayor.', 'المثلث الأكبر ذو الزاوية نفسها له جيب أكبر.', 'A bigger triangle with the same angle has a bigger sine.'),
            right: say('Triangeluak antzekoak dira: zatidurak ez dira aldatzen, $\\frac{3}{5}=\\frac{6}{10}$.', 'Los triángulos son semejantes: los cocientes no cambian, $\\frac{3}{5}=\\frac{6}{10}$.', 'المثلثان متشابهان: النسب لا تتغير، $\\frac{3}{5}=\\frac{6}{10}$.', 'The triangles are similar: the ratios do not change, $\\frac{3}{5}=\\frac{6}{10}$.')
        },
        check: {
            prompt: say('Balio hauetatik, zein ezin da angelu zorrotz baten sinua izan?', '¿Cuál de estos valores no puede ser el seno de un ángulo agudo?', 'أيّ هذه القيم لا يمكن أن تكون جيب زاوية حادة؟', 'Which of these values cannot be the sine of an acute angle?'),
            options: [same('$1{,}2$'), same('$0{,}5$'), same('$0{,}99$')],
            correctIndex: 0,
            explanation: say('Katetoa hipotenusa baino txikiagoa da: sinua 0 eta 1 artean dago.', 'El cateto es menor que la hipotenusa: el seno está entre 0 y 1.', 'الضلع القائم أقصر من الوتر: الجيب بين 0 و1.', 'A leg is shorter than the hypotenuse: the sine lies between 0 and 1.')
        }
    },
    'notable-angles': {
        mistake: {
            wrong: same('$\\sin 60°=\\frac{1}{2}$'),
            right: say('Hori $\\sin 30°$ da; angelu handienak sinu handiena du: $\\sin 60°=\\frac{\\sqrt{3}}{2}$.', 'Ese es $\\sin 30°$; el ángulo mayor tiene el seno mayor: $\\sin 60°=\\frac{\\sqrt{3}}{2}$.', 'هذا $\\sin 30°$؛ الزاوية الأكبر جيبها أكبر: $\\sin 60°=\\frac{\\sqrt{3}}{2}$.', 'That is $\\sin 30°$; the bigger angle has the bigger sine: $\\sin 60°=\\frac{\\sqrt{3}}{2}$.')
        },
        check: {
            prompt: say('Zenbat da $\\tan 45°$?', '¿Cuánto vale $\\tan 45°$?', 'كم يساوي $\\tan 45°$؟', 'What is $\\tan 45°$?'),
            options: [same('$\\frac{\\sqrt{2}}{2}$'), same('$1$'), same('$\\sqrt{2}$')],
            correctIndex: 1,
            explanation: say('Karratu-erdian bi katetoak berdinak dira: $\\tan 45°=\\frac{1}{1}=1$.', 'En medio cuadrado los dos catetos son iguales: $\\tan 45°=\\frac{1}{1}=1$.', 'في نصف المربع الضلعان القائمان متساويان: $\\tan 45°=\\frac{1}{1}=1$.', 'In half a square both legs are equal: $\\tan 45°=\\frac{1}{1}=1$.')
        }
    },
    fundamental: {
        mistake: {
            wrong: say('$\\sin\\alpha=0{,}8$ bada, $\\cos\\alpha=1-0{,}8=0{,}2$.', 'Si $\\sin\\alpha=0{,}8$, $\\cos\\alpha=1-0{,}8=0{,}2$.', 'إذا كان $\\sin\\alpha=0{,}8$ فإن $\\cos\\alpha=1-0{,}8=0{,}2$.', 'If $\\sin\\alpha=0{,}8$, $\\cos\\alpha=1-0{,}8=0{,}2$.'),
            right: say('Karratuek batzen dute 1: $\\cos^{2}\\alpha=1-0{,}64=0{,}36$, $\\cos\\alpha=0{,}6$.', 'Son los cuadrados los que suman 1: $\\cos^{2}\\alpha=1-0{,}64=0{,}36$, $\\cos\\alpha=0{,}6$.', 'المربعان هما اللذان مجموعهما 1: $\\cos^{2}\\alpha=1-0{,}64=0{,}36$، $\\cos\\alpha=0{,}6$.', 'It is the squares that add up to 1: $\\cos^{2}\\alpha=1-0{,}64=0{,}36$, $\\cos\\alpha=0{,}6$.')
        },
        check: {
            prompt: say('$\\sin\\alpha=\\frac{5}{13}$ eta $\\alpha$ zorrotza bada, zenbat da $\\cos\\alpha$?', 'Si $\\sin\\alpha=\\frac{5}{13}$ y $\\alpha$ es agudo, ¿cuánto vale $\\cos\\alpha$?', 'إذا كان $\\sin\\alpha=\\frac{5}{13}$ و$\\alpha$ حادة فكم يساوي $\\cos\\alpha$؟', 'If $\\sin\\alpha=\\frac{5}{13}$ and $\\alpha$ is acute, what is $\\cos\\alpha$?'),
            options: [same('$\\frac{12}{13}$'), same('$\\frac{8}{13}$'), same('$\\frac{5}{12}$')],
            correctIndex: 0,
            explanation: same('$\\cos^{2}\\alpha=1-\\frac{25}{169}=\\frac{144}{169}$')
        }
    },
    'one-ratio': {
        mistake: {
            wrong: say('$\\tan\\alpha=2$ bada, $\\sin\\alpha=2$ eta $\\cos\\alpha=1$.', 'Si $\\tan\\alpha=2$, entonces $\\sin\\alpha=2$ y $\\cos\\alpha=1$.', 'إذا كان $\\tan\\alpha=2$ فإن $\\sin\\alpha=2$ و$\\cos\\alpha=1$.', 'If $\\tan\\alpha=2$, then $\\sin\\alpha=2$ and $\\cos\\alpha=1$.'),
            right: say('Sinua ez da 1 baino handiagoa: 2 eta 1 katetoekin hipotenusa $\\sqrt{5}$ da, eta $\\sin\\alpha=\\frac{2}{\\sqrt{5}}$.', 'El seno no pasa de 1: con catetos 2 y 1, la hipotenusa es $\\sqrt{5}$ y $\\sin\\alpha=\\frac{2}{\\sqrt{5}}$.', 'الجيب لا يتجاوز 1: مع الضلعين 2 و1 يكون الوتر $\\sqrt{5}$ و$\\sin\\alpha=\\frac{2}{\\sqrt{5}}$.', 'The sine never exceeds 1: with legs 2 and 1, the hypotenuse is $\\sqrt{5}$ and $\\sin\\alpha=\\frac{2}{\\sqrt{5}}$.')
        },
        check: {
            prompt: say('$\\tan\\alpha=1$ eta $\\alpha$ zorrotza bada, zenbat da $\\alpha$?', 'Si $\\tan\\alpha=1$ y $\\alpha$ es agudo, ¿cuánto mide $\\alpha$?', 'إذا كان $\\tan\\alpha=1$ و$\\alpha$ حادة فكم قياس $\\alpha$؟', 'If $\\tan\\alpha=1$ and $\\alpha$ is acute, what is $\\alpha$?'),
            options: [same('$90°$'), same('$1°$'), same('$45°$')],
            correctIndex: 2,
            explanation: say('Bi katetoak berdinak: triangelua karratu-erdia da.', 'Los dos catetos son iguales: el triángulo es medio cuadrado.', 'الضلعان القائمان متساويان: المثلث نصف مربع.', 'Both legs are equal: the triangle is half a square.')
        }
    },
    calculator: {
        mistake: {
            wrong: say('$12{,}25°$ gradu 12° eta 25\' dira.', '$12{,}25°$ son 12° 25\'.', '$12{,}25°$ تساوي 12° و25\'.', '$12{,}25°$ is 12° 25\'.'),
            right: say('Zati hamartarra bider 60: $0{,}25$ gradu 15 minutu dira, beraz $12°\\,15\'$.', 'La parte decimal, por 60: $0{,}25$ de grado son 15 minutos, así que $12°\\,15\'$.', 'الجزء العشري في 60: $0{,}25$ من الدرجة 15 دقيقة، إذن $12°\\,15\'$.', 'The decimal part, times 60: $0{,}25$ of a degree is 15 minutes, so $12°\\,15\'$.')
        },
        check: {
            prompt: say('Zenbat minutu dira $0{,}2°$?', '¿Cuántos minutos son $0{,}2°$?', 'كم دقيقة في $0{,}2°$؟', 'How many minutes are $0{,}2°$?'),
            options: [same('$12\'$'), same('$20\'$'), same('$2\'$')],
            correctIndex: 0,
            explanation: same('$0{,}2\\cdot 60=12$')
        }
    },
    'two-sides': {
        mistake: {
            wrong: say('Bi katetoekin, angelua sinuarekin ateratzen da.', 'Con los dos catetos, el ángulo sale con el seno.', 'مع الضلعين القائمين تُستخرج الزاوية بالجيب.', 'With both legs, the angle comes from the sine.'),
            right: say('Bi katetoak tangentean daude, aurkakoa zati ondokoa; sinuak hipotenusa behar du.', 'Los dos catetos están en la tangente, opuesto entre contiguo; el seno necesita la hipotenusa.', 'الضلعان القائمان في الظل، المقابل على المجاور؛ أما الجيب فيحتاج الوتر.', 'Both legs are in the tangent, opposite over adjacent; the sine needs the hypotenuse.')
        },
        check: {
            prompt: say('Katetoak 7 eta 7 badira, zenbat neurtzen dute angelu zorrotzek?', 'Si los catetos miden 7 y 7, ¿cuánto miden los ángulos agudos?', 'إذا كان الضلعان القائمان 7 و7 فكم قياس الزاويتين الحادتين؟', 'If the legs are 7 and 7, what are the acute angles?'),
            options: [say('45° eta 45°', '45° y 45°', '45° و45°', '45° and 45°'), say('30° eta 60°', '30° y 60°', '30° و60°', '30° and 60°'), say('7° eta 83°', '7° y 83°', '7° و83°', '7° and 83°')],
            correctIndex: 0,
            explanation: say('$\\tan\\alpha=\\frac{7}{7}=1$, beraz $\\alpha=45°$, eta bestea $90°-45°=45°$.', '$\\tan\\alpha=\\frac{7}{7}=1$, así que $\\alpha=45°$, y el otro, $90°-45°=45°$.', '$\\tan\\alpha=\\frac{7}{7}=1$، إذن $\\alpha=45°$، والأخرى $90°-45°=45°$.', '$\\tan\\alpha=\\frac{7}{7}=1$, so $\\alpha=45°$, and the other is $90°-45°=45°$.')
        }
    },
    'side-angle': {
        mistake: {
            wrong: say('$\\tan 30°=\\frac{6}{c}$ bada, $c=6\\cdot\\tan 30°$.', 'Si $\\tan 30°=\\frac{6}{c}$, entonces $c=6\\cdot\\tan 30°$.', 'إذا كان $\\tan 30°=\\frac{6}{c}$ فإن $c=6\\cdot\\tan 30°$.', 'If $\\tan 30°=\\frac{6}{c}$, then $c=6\\cdot\\tan 30°$.'),
            right: say('Ezezaguna izendatzailean dago: $c=\\frac{6}{\\tan 30°}\\approx 10{,}39$.', 'La incógnita está en el denominador: $c=\\frac{6}{\\tan 30°}\\approx 10{,}39$.', 'المجهول في المقام: $c=\\frac{6}{\\tan 30°}\\approx 10{,}39$.', 'The unknown is in the denominator: $c=\\frac{6}{\\tan 30°}\\approx 10{,}39$.')
        },
        check: {
            prompt: say('Angelu batek 40° neurtzen ditu, eta haren ondoko katetoak 10 cm. Zein arrazoik ematen du hipotenusa?', 'Un ángulo mide 40° y su cateto contiguo, 10 cm. ¿Qué razón da la hipotenusa?', 'زاوية قياسها 40° وضلعها المجاور 10 سم. أيّ نسبة تعطي الوتر؟', 'An angle is 40° and its adjacent leg is 10 cm. Which ratio gives the hypotenuse?'),
            options: [say('Sinuak', 'El seno', 'الجيب', 'The sine'), say('Kosinuak', 'El coseno', 'جيب التمام', 'The cosine'), say('Tangenteak', 'La tangente', 'الظل', 'The tangent')],
            correctIndex: 1,
            explanation: say('Kosinuak ondokoa eta hipotenusa lotzen ditu: $\\cos 40°=\\frac{10}{a}$.', 'El coseno une el contiguo y la hipotenusa: $\\cos 40°=\\frac{10}{a}$.', 'جيب التمام يربط المجاور بالوتر: $\\cos 40°=\\frac{10}{a}$.', 'The cosine links the adjacent leg and the hypotenuse: $\\cos 40°=\\frac{10}{a}$.')
        }
    },
    elevation: {
        mistake: {
            wrong: say('Goratze-angelua bertikaletik neurtzen da.', 'El ángulo de elevación se mide desde la vertical.', 'تُقاس زاوية الارتفاع من الخط العمودي.', 'The angle of elevation is measured from the vertical.'),
            right: say('Horizontaletik neurtzen da, ikusmira-lerroraino.', 'Se mide desde la horizontal hasta la visual.', 'تُقاس من الأفق حتى خط النظر.', 'It is measured from the horizontal up to the line of sight.')
        },
        check: {
            prompt: say('Eraikin batetik 12 m-ra, teilatua 45 graduko angeluarekin ikusten da. Zenbat neurtzen du eraikinak?', 'A 12 m de un edificio se ve el tejado con un ángulo de 45°. ¿Cuánto mide el edificio?', 'على بعد 12 م من مبنى يُرى سطحه بزاوية 45°. كم ارتفاع المبنى؟', 'From 12 m away from a building, the roof is seen at 45°. How tall is the building?'),
            options: [say('12 m', '12 m', '12 م', '12 m'), say('6 m', '6 m', '6 م', '6 m'), say('24 m', '24 m', '24 م', '24 m')],
            correctIndex: 0,
            explanation: say('$h=12\\cdot\\tan 45°=12\\cdot 1=12$.', '$h=12\\cdot\\tan 45°=12\\cdot 1=12$.', '$h=12\\cdot\\tan 45°=12\\cdot 1=12$.', '$h=12\\cdot\\tan 45°=12\\cdot 1=12$.')
        }
    },
    'double-observation': {
        mistake: {
            wrong: say('Bi triangeluetan $x$ distantzia bera erabiltzen dut.', 'Uso la misma distancia $x$ en los dos triángulos.', 'أستعمل المسافة نفسها $x$ في المثلثين.', 'I use the same distance $x$ in both triangles.'),
            right: say('Puntu urrunetik distantzia $x+10$ da: triangelu bakoitzak berea du.', 'Desde el punto lejano la distancia es $x+10$: cada triángulo tiene la suya.', 'من النقطة البعيدة المسافة $x+10$: لكل مثلث مسافته.', 'From the far point the distance is $x+10$: each triangle has its own.')
        },
        check: {
            prompt: say('Zenbat ezezagun daude behaketa bikoitz batean?', '¿Cuántas incógnitas hay en una doble observación?', 'كم مجهولًا في الرصد المزدوج؟', 'How many unknowns are there in a double observation?'),
            options: [say('Bat: altuera', 'Una: la altura', 'واحد: الارتفاع', 'One: the height'), say('Bi: altuera eta distantzia bat', 'Dos: la altura y una distancia', 'اثنان: الارتفاع ومسافة', 'Two: the height and a distance'), say('Hiru', 'Tres', 'ثلاثة', 'Three')],
            correctIndex: 1,
            explanation: say('Bi ezezagun eta bi triangelu: bi ekuazioko sistema bat.', 'Dos incógnitas y dos triángulos: un sistema de dos ecuaciones.', 'مجهولان ومثلثان: نظام من معادلتين.', 'Two unknowns and two triangles: a system of two equations.')
        }
    },
    oblique: {
        mistake: {
            wrong: say('Altuera angelu ezagunaren erpinetik marrazten dut, eta angelua bitan zatitzen da.', 'Trazo la altura desde el vértice del ángulo conocido, y lo parto en dos.', 'أرسم الارتفاع من رأس الزاوية المعلومة فأقسمها إلى قسمين.', 'I draw the height from the vertex of the known angle, and it splits in two.'),
            right: say('Horrela datua galtzen da: marraztu altuera beste erpin batetik, angelu ezaguna osorik triangelu angeluzuzen batean gera dadin.', 'Así se pierde el dato: traza la altura desde otro vértice, para que el ángulo conocido quede entero en un triángulo rectángulo.', 'هكذا يضيع المعطى: ارسم الارتفاع من رأس آخر لتبقى الزاوية المعلومة كاملة في مثلث قائم.', 'That loses the data: draw the height from another vertex, so the known angle stays whole in a right-angled triangle.')
        },
        check: {
            prompt: say('$ABC$ triangeluan, $AB=10$ eta $A=30°$. Zenbat neurtzen du $B$ erpinetik doan altuerak?', 'En el triángulo $ABC$, $AB=10$ y $A=30°$. ¿Cuánto mide la altura desde $B$?', 'في المثلث $ABC$: $AB=10$ و$A=30°$. كم طول الارتفاع من $B$؟', 'In triangle $ABC$, $AB=10$ and $A=30°$. How long is the height from $B$?'),
            options: [same('$5$'), same('$8{,}66$'), same('$10$')],
            correctIndex: 0,
            explanation: same('$h=10\\cdot\\sin 30°=10\\cdot\\frac{1}{2}=5$')
        }
    },
    'trig-area': {
        mistake: {
            wrong: say('4 eta 7 aldeko eta 30 graduko angeluko triangeluaren azalera $\\frac{4\\cdot 7}{2}=14$ da.', 'El área del triángulo de lados 4 y 7 con un ángulo de 30° es $\\frac{4\\cdot 7}{2}=14$.', 'مساحة المثلث الذي ضلعاه 4 و7 وزاويته 30° هي $\\frac{4\\cdot 7}{2}=14$.', 'The area of the triangle with sides 4 and 7 and a 30° angle is $\\frac{4\\cdot 7}{2}=14$.'),
            right: say('Sinua falta da: $\\frac{1}{2}\\cdot 4\\cdot 7\\cdot\\sin 30°=7$.', 'Falta el seno: $\\frac{1}{2}\\cdot 4\\cdot 7\\cdot\\sin 30°=7$.', 'ينقص الجيب: $\\frac{1}{2}\\cdot 4\\cdot 7\\cdot\\sin 30°=7$.', 'The sine is missing: $\\frac{1}{2}\\cdot 4\\cdot 7\\cdot\\sin 30°=7$.')
        },
        check: {
            prompt: say('10 cm-ko bi aldek 90 graduko angelua osatzen dute. Zer azalera du triangeluak?', 'Dos lados de 10 cm forman un ángulo de 90°. ¿Qué área tiene el triángulo?', 'ضلعان طول كل منهما 10 سم يصنعان زاوية 90°. ما مساحة المثلث؟', 'Two 10 cm sides form a 90° angle. What is the area of the triangle?'),
            options: [say('100 cm²', '100 cm²', '100 سم²', '100 cm²'), say('25 cm²', '25 cm²', '25 سم²', '25 cm²'), say('50 cm²', '50 cm²', '50 سم²', '50 cm²')],
            correctIndex: 2,
            explanation: same('$\\frac{1}{2}\\cdot 10\\cdot 10\\cdot\\sin 90°=50$')
        }
    },
    'unit-circle': {
        mistake: {
            wrong: say('$\\sin 150°$ negatiboa da, 150° 90° baino handiagoa delako.', '$\\sin 150°$ es negativo, porque 150° es mayor que 90°.', '$\\sin 150°$ سالب لأن 150° أكبر من 90°.', '$\\sin 150°$ is negative, because 150° is more than 90°.'),
            right: say('150° II. koadrantean dago, eta han sinua positiboa da: $\\sin 150°=\\frac{1}{2}$.', '150° está en el II cuadrante, donde el seno es positivo: $\\sin 150°=\\frac{1}{2}$.', '150° في الربع الثاني حيث الجيب موجب: $\\sin 150°=\\frac{1}{2}$.', '150° is in quadrant II, where the sine is positive: $\\sin 150°=\\frac{1}{2}$.')
        },
        check: {
            prompt: say('Zein koadrantetan da sinua negatiboa eta kosinua positiboa?', '¿En qué cuadrante el seno es negativo y el coseno positivo?', 'في أيّ ربع يكون الجيب سالبًا وجيب التمام موجبًا؟', 'In which quadrant is the sine negative and the cosine positive?'),
            options: [say('IV.ean', 'En el IV', 'في الرابع', 'In IV'), say('II.ean', 'En el II', 'في الثاني', 'In II'), say('III.ean', 'En el III', 'في الثالث', 'In III')],
            correctIndex: 0,
            explanation: say('IV. koadrantean $P$ puntua eskuinean eta behean dago: $x>0$ eta $y<0$.', 'En el IV cuadrante el punto $P$ está a la derecha y abajo: $x>0$ e $y<0$.', 'في الربع الرابع تقع $P$ يمينًا وأسفل: $x>0$ و$y<0$.', 'In quadrant IV the point $P$ is to the right and below: $x>0$ and $y<0$.')
        }
    },
    reduction: {
        mistake: {
            wrong: same('$\\cos 120°=\\cos 60°=\\frac{1}{2}$'),
            right: say('120° II. koadrantean dago: kosinua negatiboa da, $\\cos 120°=-\\frac{1}{2}$.', '120° está en el II cuadrante: el coseno es negativo, $\\cos 120°=-\\frac{1}{2}$.', '120° في الربع الثاني: جيب التمام سالب، $\\cos 120°=-\\frac{1}{2}$.', '120° is in quadrant II: the cosine is negative, $\\cos 120°=-\\frac{1}{2}$.')
        },
        check: {
            prompt: say('Zenbat da $\\sin 225°$?', '¿Cuánto vale $\\sin 225°$?', 'كم يساوي $\\sin 225°$؟', 'What is $\\sin 225°$?'),
            options: [same('$-\\frac{\\sqrt{2}}{2}$'), same('$\\frac{\\sqrt{2}}{2}$'), same('$-\\frac{1}{2}$')],
            correctIndex: 0,
            explanation: say('$225°=180°+45°$, III. koadrantean: $\\sin 225°=-\\sin 45°$.', '$225°=180°+45°$, en el III cuadrante: $\\sin 225°=-\\sin 45°$.', '$225°=180°+45°$ في الربع الثالث: $\\sin 225°=-\\sin 45°$.', '$225°=180°+45°$, in quadrant III: $\\sin 225°=-\\sin 45°$.')
        }
    },
    radians: {
        mistake: {
            wrong: say('2 rad 2° dira.', '2 rad son 2°.', '2 rad تساوي 2°.', '2 rad is 2°.'),
            right: say('Radian bat 57,3° ingurukoa da: 2 rad 114,6° inguru dira.', 'Un radián son unos 57,3°: 2 rad son unos 114,6°.', 'الراديان نحو 57.3°: إذن 2 rad نحو 114.6°.', 'One radian is about 57.3°: 2 rad is about 114.6°.')
        },
        check: {
            prompt: say('Zenbat gradu dira $\\frac{\\pi}{3}$ rad?', '¿Cuántos grados son $\\frac{\\pi}{3}$ rad?', 'كم درجة في $\\frac{\\pi}{3}$ rad؟', 'How many degrees is $\\frac{\\pi}{3}$ rad?'),
            options: [same('$30°$'), same('$60°$'), same('$120°$')],
            correctIndex: 1,
            explanation: same('$\\frac{\\pi}{3}\\cdot\\frac{180}{\\pi}=60°$')
        }
    }
}

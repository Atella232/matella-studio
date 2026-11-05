import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Perimetroak, azalerak eta bolumenak · 4. DBH aplikatuak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no JSX)
   so the tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical mistake.
   π ≈ 3,14 as in the lessons; the units go outside the formulas (cm², سم²).
   Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type AreasVolumesTopicId = 'angles' | 'triangles' | 'perimeters' | 'right-triangles' | 'heights' | 'applications' | 'polygon-areas' | 'circle-areas' | 'composite' | 'prism-area' | 'pyramid-area' | 'round-area' | 'prism-volume' | 'pyramid-volume' | 'compound'

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
/** A number with its unit after it: cm, m², L… in Arabic letters there */
const unit = (value: string, latin: string, arabic: string): LocalizedText => say(`$${value}$ ${latin}`, `$${value}$ ${latin}`, `$${value}$ ${arabic}`, `$${value}$ ${latin}`)

export const areasVolumesLessonChecks: Record<AreasVolumesTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Polygons ---------- */
    angles: {
        mistake: {
            wrong: say('Pentagono baten angeluek $180°\\cdot 5=900°$ batzen dute.', 'Los ángulos de un pentágono suman $180°\\cdot 5=900°$.', 'زوايا المخمس مجموعها $180°\\cdot 5=900°$.', 'The angles of a pentagon add up to $180°\\cdot 5=900°$.'),
            right: say('$5-2=3$ triangelutan banatzen da: $180°\\cdot 3=540°$.', 'Se divide en $5-2=3$ triángulos: $180°\\cdot 3=540°$.', 'ينقسم إلى $5-2=3$ مثلثات: $180°\\cdot 3=540°$.', 'It splits into $5-2=3$ triangles: $180°\\cdot 3=540°$.')
        },
        check: {
            prompt: say('Zenbat batzen dute dekagono baten barneko angeluek?', '¿Cuánto suman los ángulos interiores de un decágono?', 'كم مجموع الزوايا الداخلية لمضلع عشاري؟', 'What do the interior angles of a decagon add up to?'),
            options: [same('$1800°$'), same('$1440°$'), same('$144°$')],
            correctIndex: 1,
            explanation: say('10 alde, 8 triangelu: $180°\\cdot 8=1440°$. $144°$ dekagono erregularraren angelu bakoitza da.', '10 lados, 8 triángulos: $180°\\cdot 8=1440°$. $144°$ es cada ángulo del decágono regular.', '10 أضلاع، 8 مثلثات: $180°\\cdot 8=1440°$. و$144°$ هي كل زاوية في العشاري المنتظم.', '10 sides, 8 triangles: $180°\\cdot 8=1440°$. $144°$ is each angle of the regular decagon.')
        }
    },
    triangles: {
        mistake: {
            wrong: say('4, 5 eta 7 aldeak: $4^{2}=16<25+49$; zorrotza da.', 'Lados 4, 5 y 7: $4^{2}=16<25+49$, acutángulo.', 'الأضلاع 4 و5 و7: $4^{2}=16<25+49$، حاد الزوايا.', 'Sides 4, 5 and 7: $4^{2}=16<25+49$, acute.'),
            right: say('Alde handiena erabiltzen da: $7^{2}=49>16+25=41$, kamutsa da.', 'Se usa el lado mayor: $7^{2}=49>16+25=41$, es obtusángulo.', 'نستعمل الضلع الأكبر: $7^{2}=49>16+25=41$، فهو منفرج الزاوية.', 'Use the longest side: $7^{2}=49>16+25=41$, it is obtuse.')
        },
        check: {
            prompt: say('Nolakoa da, angeluen arabera, 7 cm, 8 cm eta 10 cm-ko aldeak dituen triangelua?', '¿Cómo es según sus ángulos un triángulo de lados 7 cm, 8 cm y 10 cm?', 'ما نوع المثلث حسب زواياه إذا كانت أضلاعه 7 سم و8 سم و10 سم؟', 'What kind of triangle by its angles has sides 7 cm, 8 cm and 10 cm?'),
            options: [say('Angeluzuzena', 'Rectángulo', 'قائم الزاوية', 'Right-angled'), say('Kamutsa', 'Obtusángulo', 'منفرج الزاوية', 'Obtuse'), say('Zorrotza', 'Acutángulo', 'حاد الزوايا', 'Acute')],
            correctIndex: 2,
            explanation: say('$10^{2}=100$ txikiagoa da $7^{2}+8^{2}=113$ baino: zorrotza da.', '$10^{2}=100$ es menor que $7^{2}+8^{2}=113$: es acutángulo.', '$10^{2}=100$ أصغر من $7^{2}+8^{2}=113$: فهو حاد الزوايا.', '$10^{2}=100$ is less than $7^{2}+8^{2}=113$: it is acute.')
        }
    },
    perimeters: {
        mistake: {
            wrong: say('$r=5$ cm bada, $L=3{,}14\\cdot 5=15{,}7$ cm.', 'Con $r=5$ cm, $L=3{,}14\\cdot 5=15{,}7$ cm.', 'مع $r=5$ سم، $L=3{,}14\\cdot 5=15{,}7$ سم.', 'With $r=5$ cm, $L=3{,}14\\cdot 5=15{,}7$ cm.'),
            right: say('2 zenbakia falta da (edo diametroa erabili): $L=2\\cdot 3{,}14\\cdot 5=31{,}4$ cm.', 'Falta el 2 (o usar el diámetro): $L=2\\cdot 3{,}14\\cdot 5=31{,}4$ cm.', 'ينقص العدد 2 (أو استعمل القطر): $L=2\\cdot 3{,}14\\cdot 5=31{,}4$ سم.', 'The 2 is missing (or use the diameter): $L=2\\cdot 3{,}14\\cdot 5=31{,}4$ cm.')
        },
        check: {
            prompt: say('Gurpil batek 20 cm-ko diametroa du. Zenbat aurreratzen du bira batean?', 'Una rueda tiene 20 cm de diámetro. ¿Cuánto avanza en una vuelta?', 'قطر عجلة 20 سم. كم تتقدّم في دورة واحدة؟', 'A wheel is 20 cm across. How far does it go in one turn?'),
            options: [unit('125{,}6', 'cm', 'سم'), unit('62{,}8', 'cm', 'سم'), unit('31{,}4', 'cm', 'سم')],
            correctIndex: 1,
            explanation: say('Erradioa 10 cm da: $2\\cdot 3{,}14\\cdot 10=62{,}8$. 20 erradio gisa hartzeak bikoitza ematen du.', 'El radio es 10 cm: $2\\cdot 3{,}14\\cdot 10=62{,}8$. Tomar 20 como radio da el doble.', 'نصف القطر 10 سم: $2\\cdot 3{,}14\\cdot 10=62{,}8$. وأخذ 20 نصفَ قطر يعطي الضعف.', 'The radius is 10 cm: $2\\cdot 3{,}14\\cdot 10=62{,}8$. Taking 20 as the radius gives twice as much.')
        }
    },
    /* ---------- 2. Pythagoras ---------- */
    'right-triangles': {
        mistake: {
            wrong: same('$a=\\sqrt{3^{2}+4^{2}}=3+4=7$'),
            right: say('Batura baten erroa ez da erroen batura: $\\sqrt{9+16}=\\sqrt{25}=5$.', 'La raíz de una suma no es la suma de las raíces: $\\sqrt{9+16}=\\sqrt{25}=5$.', 'جذر المجموع ليس مجموع الجذور: $\\sqrt{9+16}=\\sqrt{25}=5$.', 'The root of a sum is not the sum of the roots: $\\sqrt{9+16}=\\sqrt{25}=5$.')
        },
        check: {
            prompt: say('Hipotenusak 10 cm ditu eta kateto batek 6 cm. Zenbat neurtzen du beste katetoak?', 'La hipotenusa mide 10 cm y un cateto, 6 cm. ¿Cuánto mide el otro cateto?', 'الوتر 10 سم وأحد الضلعين القائمين 6 سم. كم طول الآخر؟', 'The hypotenuse is 10 cm and one leg is 6 cm. How long is the other leg?'),
            options: [unit('11{,}66', 'cm', 'سم'), unit('4', 'cm', 'سم'), unit('8', 'cm', 'سم')],
            correctIndex: 2,
            explanation: say('Katetoa: kendu karratuak, $\\sqrt{100-36}=\\sqrt{64}=8$. Hipotenusak luzeena izan behar du.', 'Cateto: resta los cuadrados, $\\sqrt{100-36}=\\sqrt{64}=8$. La hipotenusa tiene que ser la más larga.', 'الضلع القائم: اطرح المربعين، $\\sqrt{100-36}=\\sqrt{64}=8$. يجب أن يكون الوتر الأطول.', 'A leg: subtract the squares, $\\sqrt{100-36}=\\sqrt{64}=8$. The hypotenuse has to be the longest side.')
        }
    },
    heights: {
        mistake: {
            wrong: say('5, 5 eta 6 aldeko triangelu isoszelearen altuera: $\\sqrt{5^{2}-6^{2}}$.', 'La altura del triángulo isósceles de lados 5, 5 y 6 es $\\sqrt{5^{2}-6^{2}}$.', 'ارتفاع المثلث متساوي الساقين ذي الأضلاع 5 و5 و6 هو $\\sqrt{5^{2}-6^{2}}$.', 'The height of the isosceles triangle with sides 5, 5 and 6 is $\\sqrt{5^{2}-6^{2}}$.'),
            right: say('Katetoa oinarriaren erdia da, 3: $h=\\sqrt{25-9}=4$.', 'El cateto es media base, 3: $h=\\sqrt{25-9}=4$.', 'الضلع القائم نصف القاعدة، 3: $h=\\sqrt{25-9}=4$.', 'The leg is half the base, 3: $h=\\sqrt{25-9}=4$.')
        },
        check: {
            prompt: say('Triangelu isoszele baten alde berdinek 10 cm dituzte eta oinarriak 12 cm. Zenbat da altuera?', 'Un triángulo isósceles tiene los lados iguales de 10 cm y la base de 12 cm. ¿Cuánto mide su altura?', 'مثلث متساوي الساقين ضلعاه المتساويان 10 سم وقاعدته 12 سم. كم ارتفاعه؟', 'An isosceles triangle has equal sides of 10 cm and a base of 12 cm. How tall is it?'),
            options: [unit('8', 'cm', 'سم'), unit('6', 'cm', 'سم'), unit('15{,}62', 'cm', 'سم')],
            correctIndex: 0,
            explanation: say('Oinarriaren erdia 6 da: $h=\\sqrt{100-36}=8$.', 'Media base es 6: $h=\\sqrt{100-36}=8$.', 'نصف القاعدة 6: $h=\\sqrt{100-36}=8$.', 'Half the base is 6: $h=\\sqrt{100-36}=8$.')
        }
    },
    applications: {
        mistake: {
            wrong: say('5 m-ko eskailera, oina hormatik 3 m-ra: altuera $\\sqrt{5^{2}+3^{2}}$.', 'Escalera de 5 m con el pie a 3 m de la pared: altura $\\sqrt{5^{2}+3^{2}}$.', 'سلّم طوله 5 م وقدمه على بعد 3 م من الجدار: الارتفاع $\\sqrt{5^{2}+3^{2}}$.', 'A 5 m ladder with its foot 3 m from the wall: height $\\sqrt{5^{2}+3^{2}}$.'),
            right: say('Eskailera hipotenusa da: kendu egiten da, $\\sqrt{25-9}=4$ m.', 'La escalera es la hipotenusa: se resta, $\\sqrt{25-9}=4$ m.', 'السلّم هو الوتر: نطرح، $\\sqrt{25-9}=4$ م.', 'The ladder is the hypotenuse: subtract, $\\sqrt{25-9}=4$ m.')
        },
        check: {
            prompt: say('30 m eta 18 m-ko bi eraikin 16 m-ra daude. Zenbateko distantzia dago haien terrazen artean?', 'Dos edificios de 30 m y 18 m de altura están a 16 m. ¿Qué distancia hay entre sus azoteas?', 'بنايتان ارتفاعهما 30 م و18 م والمسافة بينهما 16 م. ما المسافة بين سطحيهما؟', 'Two buildings 30 m and 18 m tall are 16 m apart. How far apart are their roofs?'),
            options: [unit('34', 'm', 'م'), unit('20', 'm', 'م'), unit('28', 'm', 'م')],
            correctIndex: 1,
            explanation: say('Kateto bat altueren kendura da, 12: $\\sqrt{12^{2}+16^{2}}=\\sqrt{400}=20$.', 'Un cateto es la diferencia de alturas, 12: $\\sqrt{12^{2}+16^{2}}=\\sqrt{400}=20$.', 'أحد الضلعين القائمين فرق الارتفاعين، 12: $\\sqrt{12^{2}+16^{2}}=\\sqrt{400}=20$.', 'One leg is the difference in height, 12: $\\sqrt{12^{2}+16^{2}}=\\sqrt{400}=20$.')
        }
    },
    /* ---------- 3. Plane areas ---------- */
    'polygon-areas': {
        mistake: {
            wrong: say('8 eta 6 diagonaleko erronbo baten azalera: $8\\cdot 6=48$.', 'Área de un rombo de diagonales 8 y 6: $8\\cdot 6=48$.', 'مساحة معيّن قطراه 8 و6: $8\\cdot 6=48$.', 'Area of a rhombus with diagonals 8 and 6: $8\\cdot 6=48$.'),
            right: say('Laukizuzenaren erdia da: $\\frac{8\\cdot 6}{2}=24$.', 'Es la mitad del rectángulo: $\\frac{8\\cdot 6}{2}=24$.', 'هو نصف المستطيل: $\\frac{8\\cdot 6}{2}=24$.', 'It is half the rectangle: $\\frac{8\\cdot 6}{2}=24$.')
        },
        check: {
            prompt: say('Triangelu baten oinarria 12 cm da eta altuera 7 cm. Zein da haren azalera?', 'Un triángulo tiene 12 cm de base y 7 cm de altura. ¿Cuál es su área?', 'مثلث قاعدته 12 سم وارتفاعه 7 سم. ما مساحته؟', 'A triangle has a base of 12 cm and a height of 7 cm. What is its area?'),
            options: [unit('84', 'cm²', 'سم²'), unit('19', 'cm²', 'سم²'), unit('42', 'cm²', 'سم²')],
            correctIndex: 2,
            explanation: say('Paralelogramo baten erdia: $\\frac{12\\cdot 7}{2}=42$.', 'La mitad de un paralelogramo: $\\frac{12\\cdot 7}{2}=42$.', 'نصف متوازي أضلاع: $\\frac{12\\cdot 7}{2}=42$.', 'Half a parallelogram: $\\frac{12\\cdot 7}{2}=42$.')
        }
    },
    'circle-areas': {
        mistake: {
            wrong: say('10 cm-ko diametroko zirkulua: $A=3{,}14\\cdot 10^{2}=314$ cm².', 'Un círculo de 10 cm de diámetro: $A=3{,}14\\cdot 10^{2}=314$ cm².', 'قرص قطره 10 سم: $A=3{,}14\\cdot 10^{2}=314$ سم².', 'A circle 10 cm across: $A=3{,}14\\cdot 10^{2}=314$ cm².'),
            right: say('Erradioa erdia da, 5: $A=3{,}14\\cdot 5^{2}=78{,}5$ cm².', 'El radio es la mitad, 5: $A=3{,}14\\cdot 5^{2}=78{,}5$ cm².', 'نصف القطر نصفه، 5: $A=3{,}14\\cdot 5^{2}=78{,}5$ سم².', 'The radius is half of it, 5: $A=3{,}14\\cdot 5^{2}=78{,}5$ cm².')
        },
        check: {
            prompt: say('Koroa batek 5 cm eta 3 cm-ko erradioak ditu. Zein da haren azalera?', 'Una corona tiene radios de 5 cm y 3 cm. ¿Cuál es su área?', 'حلقة نصفا قطريها 5 سم و3 سم. ما مساحتها؟', 'An annulus has radii of 5 cm and 3 cm. What is its area?'),
            options: [unit('50{,}24', 'cm²', 'سم²'), unit('12{,}56', 'cm²', 'سم²'), unit('78{,}5', 'cm²', 'سم²')],
            correctIndex: 0,
            explanation: say('Handia ken txikia: $3{,}14\\cdot(25-9)=50{,}24$. Ez da $(5-3)^{2}$.', 'El grande menos el pequeño: $3{,}14\\cdot(25-9)=50{,}24$. No es $(5-3)^{2}$.', 'الكبير ناقص الصغير: $3{,}14\\cdot(25-9)=50{,}24$. وليس $(5-3)^{2}$.', 'The big one minus the small one: $3{,}14\\cdot(25-9)=50{,}24$. It is not $(5-3)^{2}$.')
        }
    },
    composite: {
        mistake: {
            wrong: say('Leihoaren perimetroan laukizuzenaren eta zirkulu-erdiaren arteko lerroa ere batzen da.', 'El perímetro de la ventana suma también la línea entre el rectángulo y el semicírculo.', 'محيط النافذة يشمل أيضًا الخط بين المستطيل ونصف القرص.', 'The perimeter of the window also includes the line between the rectangle and the semicircle.'),
            right: say('Perimetroa ingurua bakarrik da: barruko lerroak ez dira kontatzen.', 'El perímetro es solo el contorno: las líneas interiores no cuentan.', 'المحيط هو الحد الخارجي فقط: الخطوط الداخلية لا تُحسب.', 'The perimeter is only the outline: the lines inside do not count.')
        },
        check: {
            prompt: say('6 cm-ko aldeko karratu baten barruan 3 cm-ko erradioko zirkulu bat dago. Zenbat da zirkulutik kanpoko eremu itzaleztatua?', 'Un cuadrado de 6 cm de lado tiene dentro un círculo de 3 cm de radio. ¿Cuánto mide la zona sombreada fuera del círculo?', 'مربع ضلعه 6 سم داخله قرص نصف قطره 3 سم. كم مساحة المنطقة المظلّلة خارج القرص؟', 'A square with 6 cm sides has a circle of radius 3 cm inside. What is the shaded area outside the circle?'),
            options: [unit('64{,}26', 'cm²', 'سم²'), unit('7{,}74', 'cm²', 'سم²'), unit('28{,}26', 'cm²', 'سم²')],
            correctIndex: 1,
            explanation: say('Handia ken zuria: $36-3{,}14\\cdot 9=7{,}74$.', 'El grande menos el blanco: $36-3{,}14\\cdot 9=7{,}74$.', 'الكبير ناقص الأبيض: $36-3{,}14\\cdot 9=7{,}74$.', 'The big one minus the white part: $36-3{,}14\\cdot 9=7{,}74$.')
        }
    },
    /* ---------- 4. Areas of solids ---------- */
    'prism-area': {
        mistake: {
            wrong: say('Prismaren azalera osoa $=P\\cdot h$.', 'Área total del prisma $=P\\cdot h$.', 'المساحة الكلية للمنشور $=P\\cdot h$.', 'Total area of the prism $=P\\cdot h$.'),
            right: say('Hori alboko azalera bakarrik da: bi oinarriak batu behar dira, $A_T=P\\cdot h+2A_B$.', 'Eso es solo el área lateral: faltan las dos bases, $A_T=P\\cdot h+2A_B$.', 'هذه المساحة الجانبية فقط: تنقص القاعدتان، $A_T=P\\cdot h+2A_B$.', 'That is only the lateral area: the two bases are missing, $A_T=P\\cdot h+2A_B$.')
        },
        check: {
            prompt: say('Kubo batek 5 cm-ko ertza du. Zein da haren azalera osoa?', 'Un cubo tiene 5 cm de arista. ¿Cuál es su área total?', 'مكعب طول حرفه 5 سم. ما مساحته الكلية؟', 'A cube has 5 cm edges. What is its total area?'),
            options: [unit('100', 'cm²', 'سم²'), unit('125', 'cm²', 'سم²'), unit('150', 'cm²', 'سم²')],
            correctIndex: 2,
            explanation: say('Sei aurpegi karratu: $6\\cdot 5^{2}=150$. 100 lau aurpegi dira, eta 125 bolumena.', 'Seis caras cuadradas: $6\\cdot 5^{2}=150$. 100 son cuatro caras, y 125, el volumen.', 'ستة أوجه مربعة: $6\\cdot 5^{2}=150$. و100 أربعة أوجه، و125 هو الحجم.', 'Six square faces: $6\\cdot 5^{2}=150$. 100 is four faces, and 125 is the volume.')
        }
    },
    'pyramid-area': {
        mistake: {
            wrong: say('Marrazkiko piramidean, $A_L=\\frac{40\\cdot 12}{2}$, altuerarekin.', 'En la pirámide del dibujo, $A_L=\\frac{40\\cdot 12}{2}$, con la altura.', 'في هرم الرسم $A_L=\\frac{40\\cdot 12}{2}$ بالارتفاع.', 'In the pyramid in the drawing, $A_L=\\frac{40\\cdot 12}{2}$, with the height.'),
            right: say('Apotema doa, ez altuera: $a_p=13$ eta $A_L=\\frac{40\\cdot 13}{2}=260$.', 'Va la apotema, no la altura: $a_p=13$ y $A_L=\\frac{40\\cdot 13}{2}=260$.', 'يُستعمل العامد لا الارتفاع: $a_p=13$ و$A_L=\\frac{40\\cdot 13}{2}=260$.', 'It takes the apothem, not the height: $a_p=13$ and $A_L=\\frac{40\\cdot 13}{2}=260$.')
        },
        check: {
            prompt: say('Piramide karratu erregular baten aurpegiek 8 cm-ko oinarria eta 5 cm-ko apotema dute. Zein da alboko azalera?', 'Las caras de una pirámide cuadrangular regular tienen 8 cm de base y 5 cm de apotema. ¿Cuál es su área lateral?', 'أوجه هرم رباعي منتظم قاعدتها 8 سم وعامدها 5 سم. ما المساحة الجانبية؟', 'The faces of a regular square pyramid have an 8 cm base and a 5 cm apothem. What is its lateral area?'),
            options: [unit('80', 'cm²', 'سم²'), unit('160', 'cm²', 'سم²'), unit('20', 'cm²', 'سم²')],
            correctIndex: 0,
            explanation: say('Lau triangelu: $\\frac{32\\cdot 5}{2}=80$. 2 zenbakiaz zatitu gabe, bikoitza aterako litzateke.', 'Cuatro triángulos: $\\frac{32\\cdot 5}{2}=80$. Sin dividir entre 2 saldría el doble.', 'أربعة مثلثات: $\\frac{32\\cdot 5}{2}=80$. ودون القسمة على 2 يخرج الضعف.', 'Four triangles: $\\frac{32\\cdot 5}{2}=80$. Without dividing by 2 you would get twice as much.')
        }
    },
    'round-area': {
        mistake: {
            wrong: say('Konoaren alboko azalera: $\\pi\\cdot r\\cdot h$.', 'Área lateral del cono: $\\pi\\cdot r\\cdot h$.', 'المساحة الجانبية للمخروط: $\\pi\\cdot r\\cdot h$.', 'Lateral area of the cone: $\\pi\\cdot r\\cdot h$.'),
            right: say('Sortzailea doa, ez altuera: $A_L=\\pi rg$.', 'Va la generatriz, no la altura: $A_L=\\pi rg$.', 'يُستعمل الراسم لا الارتفاع: $A_L=\\pi rg$.', 'It takes the slant height, not the height: $A_L=\\pi rg$.')
        },
        check: {
            prompt: say('Zein da 10 cm-ko erradioko esfera baten azalera?', '¿Cuál es el área de una esfera de 10 cm de radio?', 'ما مساحة كرة نصف قطرها 10 سم؟', 'What is the area of a sphere with a radius of 10 cm?'),
            options: [unit('314', 'cm²', 'سم²'), unit('1256', 'cm²', 'سم²'), unit('4186{,}67', 'cm²', 'سم²')],
            correctIndex: 1,
            explanation: say('Lau zirkulu handi: $4\\cdot 3{,}14\\cdot 10^{2}=1256$. 314 zirkulu bakarra da.', 'Cuatro círculos máximos: $4\\cdot 3{,}14\\cdot 10^{2}=1256$. 314 es un solo círculo.', 'أربع دوائر عظمى: $4\\cdot 3{,}14\\cdot 10^{2}=1256$. و314 دائرة واحدة.', 'Four great circles: $4\\cdot 3{,}14\\cdot 10^{2}=1256$. 314 is a single circle.')
        }
    },
    /* ---------- 5. Volumes ---------- */
    'prism-volume': {
        mistake: {
            wrong: say('3 m³ 300 litro dira.', '3 m³ son 300 litros.', '3 م³ هي 300 لتر.', '3 m³ is 300 litres.'),
            right: say('m³ bakoitza 1000 L da: 3 m³ = 3000 L.', 'Cada m³ son 1000 L: 3 m³ = 3000 L.', 'كل م³ هو 1000 لتر: 3 م³ = 3000 لتر.', 'Each m³ is 1,000 L: 3 m³ = 3,000 L.')
        },
        check: {
            prompt: say('Zenbat litro sartzen dira 20 cm-ko ertzeko kubo batean?', '¿Cuántos litros caben en un cubo de 20 cm de arista?', 'كم لترًا يتّسع مكعب طول حرفه 20 سم؟', 'How many litres fit in a cube with 20 cm edges?'),
            options: [unit('80', 'L', 'لترًا'), unit('0{,}8', 'L', 'لتر'), unit('8', 'L', 'لترات')],
            correctIndex: 2,
            explanation: say('$20^{3}=8000$ cm³, hau da, 8 dm³: 8 litro.', '$20^{3}=8000$ cm³, que son 8 dm³: 8 litros.', '$20^{3}=8000$ سم³، أي 8 دسم³: 8 لترات.', '$20^{3}=8000$ cm³, which is 8 dm³: 8 litres.')
        }
    },
    'pyramid-volume': {
        mistake: {
            wrong: say('Konoaren bolumena: $3{,}14\\cdot r^{2}\\cdot h$.', 'Volumen del cono: $3{,}14\\cdot r^{2}\\cdot h$.', 'حجم المخروط: $3{,}14\\cdot r^{2}\\cdot h$.', 'Volume of the cone: $3{,}14\\cdot r^{2}\\cdot h$.'),
            right: say('3 zenbakiaz zatitzea falta da: zilindroaren herena da.', 'Falta dividir entre 3: es un tercio del cilindro.', 'تنقص القسمة على 3: إنه ثلث الأسطوانة.', 'You still have to divide by 3: it is a third of the cylinder.')
        },
        check: {
            prompt: say('Kono batek 6 cm-ko erradioa eta 5 cm-ko altuera ditu. Zein da haren bolumena?', 'Un cono tiene 6 cm de radio y 5 cm de altura. ¿Cuál es su volumen?', 'مخروط نصف قطره 6 سم وارتفاعه 5 سم. ما حجمه؟', 'A cone has a radius of 6 cm and a height of 5 cm. What is its volume?'),
            options: [unit('565{,}2', 'cm³', 'سم³'), unit('188{,}4', 'cm³', 'سم³'), unit('62{,}8', 'cm³', 'سم³')],
            correctIndex: 1,
            explanation: say('$\\frac{3{,}14\\cdot 36\\cdot 5}{3}=188{,}4$: zilindroaren herena.', '$\\frac{3{,}14\\cdot 36\\cdot 5}{3}=188{,}4$: un tercio del cilindro.', '$\\frac{3{,}14\\cdot 36\\cdot 5}{3}=188{,}4$: ثلث الأسطوانة.', '$\\frac{3{,}14\\cdot 36\\cdot 5}{3}=188{,}4$: a third of the cylinder.')
        }
    },
    compound: {
        mistake: {
            wrong: same('$V=4\\cdot 3{,}14\\cdot r^{2}$'),
            right: say('Hori esferaren azalera da. Bolumena kubora doa eta 3 zenbakiaz zatituta: $\\frac{4}{3}\\pi r^{3}$.', 'Eso es el área de la esfera. El volumen va al cubo y entre 3: $\\frac{4}{3}\\pi r^{3}$.', 'هذه مساحة الكرة. أما الحجم فبالتكعيب والقسمة على 3: $\\frac{4}{3}\\pi r^{3}$.', 'That is the area of the sphere. The volume is cubed and divided by 3: $\\frac{4}{3}\\pi r^{3}$.')
        },
        check: {
            prompt: say('Biltegi bat 2 m-ko erradioko eta 5 m-ko altuerako zilindro bat da, gainean esfera-erdi bat duela. Zein da haren bolumena?', 'Un depósito es un cilindro de 2 m de radio y 5 m de altura con una semiesfera encima. ¿Cuál es su volumen?', 'خزان أسطوانة نصف قطرها 2 م وارتفاعها 5 م وفوقها نصف كرة. ما حجمه؟', 'A tank is a cylinder with a radius of 2 m and a height of 5 m with a hemisphere on top. What is its volume?'),
            options: [unit('96{,}29', 'm³', 'م³'), unit('62{,}8', 'm³', 'م³'), unit('79{,}55', 'm³', 'م³')],
            correctIndex: 2,
            explanation: say('Zilindroa $3{,}14\\cdot 4\\cdot 5=62{,}8$ gehi esfera-erdia $\\frac{2\\cdot 3{,}14\\cdot 8}{3}\\approx 16{,}75$.', 'Cilindro $3{,}14\\cdot 4\\cdot 5=62{,}8$ más semiesfera $\\frac{2\\cdot 3{,}14\\cdot 8}{3}\\approx 16{,}75$.', 'الأسطوانة $3{,}14\\cdot 4\\cdot 5=62{,}8$ زائد نصف الكرة $\\frac{2\\cdot 3{,}14\\cdot 8}{3}\\approx 16{,}75$.', 'Cylinder $3{,}14\\cdot 4\\cdot 5=62{,}8$ plus hemisphere $\\frac{2\\cdot 3{,}14\\cdot 8}{3}\\approx 16{,}75$.')
        }
    }
}

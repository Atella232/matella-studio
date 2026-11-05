import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Azalerak, bolumenak eta antzekotasuna · 4. DBH akademikoak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no JSX)
   so the tests can import it; lessons.tsx merges it into the topics. Units
   go outside the formulas (cm², سم²); π ≈ 3,14.
   ========================================================================== */

export type AreasTopicId = 'regular-polygons' | 'circle-parts' | 'segments' | 'polyhedra-area' | 'round-area' | 'sphere-area' | 'prism-cylinder-volume' | 'pyramid-cone-volume' | 'sphere-composite' | 'thales' | 'similar-triangles' | 'right-theorems' | 'ratio-powers' | 'frustums' | 'models'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const areasLessonChecks: Record<AreasTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'regular-polygons': {
        mistake: {
            wrong: say('8 aldeko eta 6,8 erradioko pentagonoan: $a=\\sqrt{6{,}8^{2}-8^{2}}$.', 'En un pentágono de lado 8 y radio 6,8: $a=\\sqrt{6{,}8^{2}-8^{2}}$.', 'في مخمس ضلعه 8 ونصف قطره 6.8: $a=\\sqrt{6{,}8^{2}-8^{2}}$.', 'In a pentagon with side 8 and radius 6.8: $a=\\sqrt{6{,}8^{2}-8^{2}}$.'),
            right: say('Alde-erdia da, 4: $a=\\sqrt{6{,}8^{2}-4^{2}}\\approx 5{,}5$.', 'Es medio lado, 4: $a=\\sqrt{6{,}8^{2}-4^{2}}\\approx 5{,}5$.', 'إنه نصف الضلع 4: $a=\\sqrt{6{,}8^{2}-4^{2}}\\approx 5{,}5$.', 'It is half the side, 4: $a=\\sqrt{6{,}8^{2}-4^{2}}\\approx 5{,}5$.')
        },
        check: {
            prompt: say('Zenbat da 6 aldeko karratuaren azalera, $A=\\dfrac{P\\cdot a}{2}$ erabiltzen bada?', '¿Cuánto da el área de un cuadrado de lado 6 si se usa $A=\\dfrac{P\\cdot a}{2}$?', 'كم مساحة مربع ضلعه 6 باستعمال $A=\\dfrac{P\\cdot a}{2}$؟', 'What area does a square with side 6 give if you use $A=\\dfrac{P\\cdot a}{2}$?'),
            options: [same('$36$'), same('$72$'), same('$18$')],
            correctIndex: 0,
            explanation: say('$P=24$ eta apotema alde-erdia da, $a=3$: $\\dfrac{24\\cdot 3}{2}=36$, $6^{2}$ bezala.', '$P=24$ y la apotema es medio lado, $a=3$: $\\dfrac{24\\cdot 3}{2}=36$, como $6^{2}$.', '$P=24$ والعامد نصف الضلع، $a=3$: $\\dfrac{24\\cdot 3}{2}=36$، مثل $6^{2}$.', '$P=24$ and the apothem is half the side, $a=3$: $\\dfrac{24\\cdot 3}{2}=36$, like $6^{2}$.')
        }
    },
    'circle-parts': {
        mistake: {
            wrong: say('60 graduko eta 6 erradioko sektorearen azalera $3{,}14\\cdot 6^{2}\\cdot 60$ da.', 'El área de un sector de 60° y radio 6 es $3{,}14\\cdot 6^{2}\\cdot 60$.', 'مساحة قطاع زاويته 60° ونصف قطره 6 هي $3{,}14\\cdot 6^{2}\\cdot 60$.', 'The area of a 60° sector with radius 6 is $3{,}14\\cdot 6^{2}\\cdot 60$.'),
            right: say('360 zenbakiaz zatitzea falta da: $\\frac{60}{360}=\\frac{1}{6}$ da, $\\dfrac{3{,}14\\cdot 36}{6}=18{,}84$.', 'Falta dividir entre 360: es $\\frac{60}{360}=\\frac{1}{6}$ del círculo, $\\dfrac{3{,}14\\cdot 36}{6}=18{,}84$.', 'ينقص القسمة على 360: إنه $\\frac{60}{360}=\\frac{1}{6}$ من الدائرة، $\\dfrac{3{,}14\\cdot 36}{6}=18{,}84$.', 'You must divide by 360: it is $\\frac{60}{360}=\\frac{1}{6}$ of the circle, $\\dfrac{3{,}14\\cdot 36}{6}=18{,}84$.')
        },
        check: {
            prompt: say('Zirkuluaren zer zati da 120 graduko sektore bat?', '¿Qué fracción del círculo es un sector de 120°?', 'ما الجزء من الدائرة الذي يمثله قطاع زاويته 120°؟', 'What fraction of the circle is a 120° sector?'),
            options: [same('$\\frac{1}{3}$'), same('$\\frac{1}{120}$'), same('$\\frac{1}{4}$')],
            correctIndex: 0,
            explanation: same('$\\frac{120}{360}=\\frac{1}{3}$')
        }
    },
    segments: {
        mistake: {
            wrong: say('2 erradioko 90 graduko segmentua $\\dfrac{3{,}14\\cdot 2^{2}}{4}=3{,}14$ da.', 'El segmento de 90° y radio 2 es $\\dfrac{3{,}14\\cdot 2^{2}}{4}=3{,}14$.', 'القطعة ذات 90° ونصف القطر 2 هي $\\dfrac{3{,}14\\cdot 2^{2}}{4}=3{,}14$.', 'The 90° segment with radius 2 is $\\dfrac{3{,}14\\cdot 2^{2}}{4}=3{,}14$.'),
            right: say('Hori sektorea da; triangelua kendu behar da: $3{,}14-2=1{,}14$.', 'Eso es el sector; falta restar el triángulo: $3{,}14-2=1{,}14$.', 'هذا هو القطاع؛ يجب طرح المثلث: $3{,}14-2=1{,}14$.', 'That is the sector; you must subtract the triangle: $3{,}14-2=1{,}14$.')
        },
        check: {
            prompt: say('Sektore batek 15 cm² ditu, eta haren bi erradioek eta kordak osatzen duten triangeluak, 9 cm². Zenbat da segmentua?', 'Un sector mide 15 cm² y el triángulo de sus dos radios y su cuerda, 9 cm². ¿Cuánto mide el segmento?', 'مساحة قطاع 15 سم² ومساحة المثلث المكوّن من نصفي قطره ووتره 9 سم². كم مساحة القطعة؟', 'A sector is 15 cm² and the triangle of its two radii and its chord is 9 cm². How big is the segment?'),
            options: [say('24 cm²', '24 cm²', '24 سم²', '24 cm²'), say('6 cm²', '6 cm²', '6 سم²', '6 cm²'), say('15 cm²', '15 cm²', '15 سم²', '15 cm²')],
            correctIndex: 1,
            explanation: say('Segmentua sektorea ken triangelua da: $15-9=6$.', 'El segmento es el sector menos el triángulo: $15-9=6$.', 'القطعة هي القطاع ناقص المثلث: $15-9=6$.', 'The segment is the sector minus the triangle: $15-9=6$.')
        }
    },
    'polyhedra-area': {
        mistake: {
            wrong: say('Piramide batean, $A_L=\\dfrac{P\\cdot h}{2}$, piramidearen altuerarekin.', 'En una pirámide, $A_L=\\dfrac{P\\cdot h}{2}$ con la altura de la pirámide.', 'في الهرم $A_L=\\dfrac{P\\cdot h}{2}$ بارتفاع الهرم.', 'In a pyramid, $A_L=\\dfrac{P\\cdot h}{2}$ with the height of the pyramid.'),
            right: say('Aurpegi bakoitzaren altuera piramidearen apotema da, $a_p$, ez $h$ altuera.', 'La altura de cada cara es la apotema de la pirámide, $a_p$, no la altura $h$.', 'ارتفاع كل وجه هو عامد الهرم $a_p$، لا الارتفاع $h$.', 'The height of each face is the slant height of the pyramid, $a_p$, not the height $h$.')
        },
        check: {
            prompt: say('Piramide karratu baten oinarriaren aldea 8 cm da, eta altuera 3 cm. Zenbat neurtzen du haren apotemak?', 'Una pirámide cuadrangular tiene 8 cm de lado de la base y 3 cm de altura. ¿Cuánto mide su apotema?', 'هرم رباعي ضلع قاعدته 8 سم وارتفاعه 3 سم. كم طول عامده؟', 'A square pyramid has an 8 cm base side and is 3 cm high. How long is its slant height?'),
            options: [same('$3$'), same('$\\sqrt{73}$'), same('$5$')],
            correctIndex: 2,
            explanation: say('Altuera eta alde-erdia: $\\sqrt{3^{2}+4^{2}}=5$ cm.', 'La altura y medio lado: $\\sqrt{3^{2}+4^{2}}=5$ cm.', 'الارتفاع ونصف الضلع: $\\sqrt{3^{2}+4^{2}}=5$ سم.', 'The height and half the side: $\\sqrt{3^{2}+4^{2}}=5$ cm.')
        }
    },
    'round-area': {
        mistake: {
            wrong: say('Konoan, $A_L=\\pi rh$, altuerarekin.', 'En un cono, $A_L=\\pi rh$ con la altura.', 'في المخروط $A_L=\\pi rh$ بالارتفاع.', 'In a cone, $A_L=\\pi rh$ with the height.'),
            right: say('Sortzailea doa: $A_L=\\pi rg$, eta $g$ handiagoa da $h$ baino.', 'Va la generatriz: $A_L=\\pi rg$, y $g$ es mayor que $h$.', 'يدخل الراسم: $A_L=\\pi rg$، و$g$ أكبر من $h$.', 'It is the slant height: $A_L=\\pi rg$, and $g$ is greater than $h$.')
        },
        check: {
            prompt: say('Kono batek 5 cm-ko erradioa eta 12 cm-ko altuera ditu. Zenbat neurtzen du sortzaileak?', 'Un cono tiene 5 cm de radio y 12 cm de altura. ¿Cuánto mide la generatriz?', 'مخروط نصف قطره 5 سم وارتفاعه 12 سم. كم طول راسمه؟', 'A cone has a radius of 5 cm and a height of 12 cm. How long is the slant height?'),
            options: [same('$13$'), same('$17$'), same('$\\sqrt{119}$')],
            correctIndex: 0,
            explanation: say('$g=\\sqrt{12^{2}+5^{2}}=13$ cm.', '$g=\\sqrt{12^{2}+5^{2}}=13$ cm.', '$g=\\sqrt{12^{2}+5^{2}}=13$ سم.', '$g=\\sqrt{12^{2}+5^{2}}=13$ cm.')
        }
    },
    'sphere-area': {
        mistake: {
            wrong: say('5 erradioko esferaren azalera $3{,}14\\cdot 5^{2}=78{,}5$ da.', 'El área de una esfera de radio 5 es $3{,}14\\cdot 5^{2}=78{,}5$.', 'مساحة كرة نصف قطرها 5 هي $3{,}14\\cdot 5^{2}=78{,}5$.', 'The area of a sphere with radius 5 is $3{,}14\\cdot 5^{2}=78{,}5$.'),
            right: say('Lau zirkulu dira: $4\\cdot 3{,}14\\cdot 25=314$.', 'Son cuatro círculos: $4\\cdot 3{,}14\\cdot 25=314$.', 'إنها أربع دوائر: $4\\cdot 3{,}14\\cdot 25=314$.', 'It is four circles: $4\\cdot 3{,}14\\cdot 25=314$.')
        },
        check: {
            prompt: say('Zenbat da 2 cm-ko erradioa duen esfera baten azalera?', '¿Cuánto mide el área de una esfera de 2 cm de radio?', 'كم مساحة كرة نصف قطرها 2 سم؟', 'What is the area of a sphere with a radius of 2 cm?'),
            options: [same('$12{,}56$'), same('$50{,}24$'), same('$33{,}49$')],
            correctIndex: 1,
            explanation: say('$4\\cdot 3{,}14\\cdot 2^{2}=50{,}24$ cm².', '$4\\cdot 3{,}14\\cdot 2^{2}=50{,}24$ cm².', '$4\\cdot 3{,}14\\cdot 2^{2}=50{,}24$ سم².', '$4\\cdot 3{,}14\\cdot 2^{2}=50{,}24$ cm².')
        }
    },
    'prism-cylinder-volume': {
        mistake: {
            wrong: say('6 cm-ko diametroa eta 10 cm-ko altuera dituen zilindroa: $V=3{,}14\\cdot 6^{2}\\cdot 10$.', 'Un cilindro de 6 cm de diámetro y 10 cm de altura: $V=3{,}14\\cdot 6^{2}\\cdot 10$.', 'أسطوانة قطرها 6 سم وارتفاعها 10 سم: $V=3{,}14\\cdot 6^{2}\\cdot 10$.', 'A cylinder 6 cm across and 10 cm high: $V=3{,}14\\cdot 6^{2}\\cdot 10$.'),
            right: say('Erradioa doa, diametroaren erdia: $V=3{,}14\\cdot 3^{2}\\cdot 10=282{,}6$.', 'Va el radio, la mitad del diámetro: $V=3{,}14\\cdot 3^{2}\\cdot 10=282{,}6$.', 'يُستعمل نصف القطر لا القطر: $V=3{,}14\\cdot 3^{2}\\cdot 10=282{,}6$.', 'It takes the radius, half the diameter: $V=3{,}14\\cdot 3^{2}\\cdot 10=282{,}6$.')
        },
        check: {
            prompt: say('Prisma zeihar batek eta zuzen batek oinarri eta altuera berak dituzte. Nolakoak dira haien bolumenak?', 'Un prisma oblicuo y uno recto tienen la misma base y la misma altura. ¿Cómo son sus volúmenes?', 'لمنشور مائل ومنشور قائم القاعدة نفسها والارتفاع نفسه. كيف حجماهما؟', 'An oblique prism and a right prism have the same base and the same height. How do their volumes compare?'),
            options: [say('Berdinak', 'Iguales', 'متساويان', 'Equal'), say('Zeiharrarena handiagoa', 'Mayor el oblicuo', 'المائل أكبر', 'The oblique one is bigger'), say('Zuzenarena handiagoa', 'Mayor el recto', 'القائم أكبر', 'The right one is bigger')],
            correctIndex: 0,
            explanation: say('Cavalieriren printzipioa: maila bakoitzean ebakidura bera, beraz $V=A_B\\cdot h$ bietan.', 'Principio de Cavalieri: la misma sección a cada nivel, así que $V=A_B\\cdot h$ en los dos.', 'مبدأ كافالييري: المقطع نفسه عند كل مستوى، إذن $V=A_B\\cdot h$ في الاثنين.', 'Cavalieri\'s principle: the same cross-section at every level, so $V=A_B\\cdot h$ for both.')
        }
    },
    'pyramid-cone-volume': {
        mistake: {
            wrong: say('3 erradioko eta 5 sortzaileko konoaren bolumena $\\dfrac{3{,}14\\cdot 3^{2}\\cdot 5}{3}$ da.', 'El volumen de un cono de radio 3 y generatriz 5 es $\\dfrac{3{,}14\\cdot 3^{2}\\cdot 5}{3}$.', 'حجم مخروط نصف قطره 3 وراسمه 5 هو $\\dfrac{3{,}14\\cdot 3^{2}\\cdot 5}{3}$.', 'The volume of a cone with radius 3 and slant height 5 is $\\dfrac{3{,}14\\cdot 3^{2}\\cdot 5}{3}$.'),
            right: say('Altuera doa, $h=\\sqrt{5^{2}-3^{2}}=4$: $V=\\dfrac{3{,}14\\cdot 9\\cdot 4}{3}=37{,}68$.', 'Va la altura, $h=\\sqrt{5^{2}-3^{2}}=4$: $V=\\dfrac{3{,}14\\cdot 9\\cdot 4}{3}=37{,}68$.', 'يدخل الارتفاع $h=\\sqrt{5^{2}-3^{2}}=4$: $V=\\dfrac{3{,}14\\cdot 9\\cdot 4}{3}=37{,}68$.', 'It takes the height, $h=\\sqrt{5^{2}-3^{2}}=4$: $V=\\dfrac{3{,}14\\cdot 9\\cdot 4}{3}=37{,}68$.')
        },
        check: {
            prompt: say('Zenbat kono behar dira oinarri eta altuera bereko zilindro bat betetzeko?', '¿Cuántos conos llenan un cilindro de la misma base y altura?', 'كم مخروطًا يملأ أسطوانة لها القاعدة والارتفاع نفسهما؟', 'How many cones fill a cylinder with the same base and height?'),
            options: [same('$2$'), same('$3$'), same('$4$')],
            correctIndex: 1,
            explanation: say('Kono bakoitza zilindroaren herena da: $V=\\dfrac{1}{3}\\pi r^{2}h$.', 'Cada cono es un tercio del cilindro: $V=\\dfrac{1}{3}\\pi r^{2}h$.', 'كل مخروط ثلث الأسطوانة: $V=\\dfrac{1}{3}\\pi r^{2}h$.', 'Each cone is a third of the cylinder: $V=\\dfrac{1}{3}\\pi r^{2}h$.')
        }
    },
    'sphere-composite': {
        mistake: {
            wrong: say('3 erradioko esferaren bolumena $\\dfrac{4}{3}\\cdot 3{,}14\\cdot 3^{2}$ da.', 'El volumen de una esfera de radio 3 es $\\dfrac{4}{3}\\cdot 3{,}14\\cdot 3^{2}$.', 'حجم كرة نصف قطرها 3 هو $\\dfrac{4}{3}\\cdot 3{,}14\\cdot 3^{2}$.', 'The volume of a sphere with radius 3 is $\\dfrac{4}{3}\\cdot 3{,}14\\cdot 3^{2}$.'),
            right: say('Erradioa kubora doa: $\\dfrac{4}{3}\\cdot 3{,}14\\cdot 27=113{,}04$.', 'El radio va al cubo: $\\dfrac{4}{3}\\cdot 3{,}14\\cdot 27=113{,}04$.', 'نصف القطر مكعّب: $\\dfrac{4}{3}\\cdot 3{,}14\\cdot 27=113{,}04$.', 'The radius is cubed: $\\dfrac{4}{3}\\cdot 3{,}14\\cdot 27=113{,}04$.')
        },
        check: {
            prompt: say('6 cm-ko ertzeko kubo batek 3 cm-ko erradioko zulo esferiko bat du barruan. Zer bolumen geratzen da?', 'Un cubo de 6 cm de arista tiene dentro un hueco esférico de 3 cm de radio. ¿Qué volumen queda?', 'مكعب حرفه 6 سم في داخله تجويف كروي نصف قطره 3 سم. ما الحجم الباقي؟', 'A cube with 6 cm edges has a spherical hollow of radius 3 cm inside. What volume is left?'),
            options: [say('102,96 cm³', '102,96 cm³', '102.96 سم³', '102.96 cm³'), say('329,04 cm³', '329,04 cm³', '329.04 سم³', '329.04 cm³'), say('216 cm³', '216 cm³', '216 سم³', '216 cm³')],
            correctIndex: 0,
            explanation: say('Kuboa ken zuloa: $216-113{,}04=102{,}96$.', 'El cubo menos el hueco: $216-113{,}04=102{,}96$.', 'المكعب ناقص التجويف: $216-113{,}04=102{,}96$.', 'The cube minus the hollow: $216-113{,}04=102{,}96$.')
        }
    },
    thales: {
        mistake: {
            wrong: say('Zuzen batean 2 eta 3, eta bestean 4 eta $x$ badaude, $x=5$, 2 batzen delako.', 'Si en una recta hay 2 y 3, y en la otra 4 y $x$, entonces $x=5$, porque se suma 2.', 'إذا كان على مستقيم 2 و3 وعلى الآخر 4 و$x$ فإن $x=5$ لأننا نضيف 2.', 'If one line has 2 and 3, and the other 4 and $x$, then $x=5$, because you add 2.'),
            right: say('Proportzio bat da, ez batuketa: $\\dfrac{2}{4}=\\dfrac{3}{x}$, $x=6$.', 'Es una proporción, no una suma: $\\dfrac{2}{4}=\\dfrac{3}{x}$, $x=6$.', 'إنه تناسب لا جمع: $\\dfrac{2}{4}=\\dfrac{3}{x}$، $x=6$.', 'It is a proportion, not a sum: $\\dfrac{2}{4}=\\dfrac{3}{x}$, $x=6$.')
        },
        check: {
            prompt: say('Zuzen batean 6 eta 9; bestean, 4 eta $x$. Zenbat da $x$?', 'En una recta, 6 y 9; en la otra, 4 y $x$. ¿Cuánto vale $x$?', 'على مستقيم 6 و9، وعلى الآخر 4 و$x$. كم يساوي $x$؟', 'On one line, 6 and 9; on the other, 4 and $x$. What is $x$?'),
            options: [same('$6$'), same('$7$'), same('$13{,}5$')],
            correctIndex: 0,
            explanation: say('$\\dfrac{6}{4}=\\dfrac{9}{x}$, beraz $x=\\dfrac{4\\cdot 9}{6}=6$.', '$\\dfrac{6}{4}=\\dfrac{9}{x}$, así que $x=\\dfrac{4\\cdot 9}{6}=6$.', '$\\dfrac{6}{4}=\\dfrac{9}{x}$، إذن $x=\\dfrac{4\\cdot 9}{6}=6$.', '$\\dfrac{6}{4}=\\dfrac{9}{x}$, so $x=\\dfrac{4\\cdot 9}{6}=6$.')
        }
    },
    'similar-triangles': {
        mistake: {
            wrong: say('Hiru angelu berdinak eta alde desberdinak dituzten bi triangelu ez dira antzekoak.', 'Dos triángulos con los tres ángulos iguales y lados distintos no son semejantes.', 'مثلثان زواياهما الثلاث متساوية وأضلاعهما مختلفة ليسا متشابهين.', 'Two triangles with all three angles equal and different sides are not similar.'),
            right: say('Antzekoak dira: bi angelu berdin nahikoa dira; tamaina bakarrik aldatzen da.', 'Sí lo son: con dos ángulos iguales basta; solo cambia el tamaño.', 'بل هما متشابهان: تكفي زاويتان متساويتان؛ ولا يتغيّر إلا الحجم.', 'They are similar: two equal angles are enough; only the size changes.')
        },
        check: {
            prompt: say('Triangelu batek 3, 4 eta 5 aldeak ditu, eta beste batek 9, 12 eta 15. Zein da antzekotasun-arrazoia?', 'Un triángulo tiene lados 3, 4 y 5, y otro, 9, 12 y 15. ¿Cuál es la razón de semejanza?', 'مثلث أضلاعه 3 و4 و5، وآخر أضلاعه 9 و12 و15. ما نسبة التشابه؟', 'One triangle has sides 3, 4 and 5, and another 9, 12 and 15. What is the scale factor?'),
            options: [same('$6$'), same('$3$'), same('$12$')],
            correctIndex: 1,
            explanation: same('$\\frac{9}{3}=\\frac{12}{4}=\\frac{15}{5}=3$')
        }
    },
    'right-theorems': {
        mistake: {
            wrong: say('Katetoaren teorema: $b^{2}=m\\cdot n$.', 'Teorema del cateto: $b^{2}=m\\cdot n$.', 'مبرهنة الضلع القائم: $b^{2}=m\\cdot n$.', 'Leg theorem: $b^{2}=m\\cdot n$.'),
            right: say('Hori altuerarena da; katetoarenak hipotenusa erabiltzen du: $b^{2}=a\\cdot n$.', 'Ese es el de la altura; el del cateto usa la hipotenusa: $b^{2}=a\\cdot n$.', 'تلك مبرهنة الارتفاع؛ أما مبرهنة الضلع القائم فتستعمل الوتر: $b^{2}=a\\cdot n$.', 'That is the height theorem; the leg theorem uses the hypotenuse: $b^{2}=a\\cdot n$.')
        },
        check: {
            prompt: say('Proiekzioek 2 cm eta 8 cm neurtzen dute. Zenbat neurtzen du altuerak?', 'Las proyecciones miden 2 cm y 8 cm. ¿Cuánto mide la altura?', 'المسقطان 2 سم و8 سم. كم طول الارتفاع؟', 'The projections are 2 cm and 8 cm. How long is the height?'),
            options: [say('4 cm', '4 cm', '4 سم', '4 cm'), say('10 cm', '10 cm', '10 سم', '10 cm'), say('5 cm', '5 cm', '5 سم', '5 cm')],
            correctIndex: 0,
            explanation: same('$h=\\sqrt{2\\cdot 8}=4$')
        }
    },
    'ratio-powers': {
        mistake: {
            wrong: say('Aldeak bikoizten badira, azalera ere bikoizten da.', 'Si los lados se duplican, el área también se duplica.', 'إذا تضاعفت الأضلاع تضاعفت المساحة أيضًا.', 'If the sides double, the area doubles too.'),
            right: say('Azalera $2^{2}=4$ zenbakiaz biderkatzen da, eta bolumena, $2^{3}=8$ zenbakiaz.', 'El área se multiplica por $2^{2}=4$, y el volumen, por $2^{3}=8$.', 'تُضرب المساحة في $2^{2}=4$، والحجم في $2^{3}=8$.', 'The area is multiplied by $2^{2}=4$, and the volume by $2^{3}=8$.')
        },
        check: {
            prompt: say('Kubo baten ertzak hirukoizten badira, zenbatez biderkatzen da bolumena?', 'Si las aristas de un cubo se triplican, ¿por cuánto se multiplica su volumen?', 'إذا تضاعفت أحرف مكعب ثلاث مرات، ففي كم يُضرب حجمه؟', 'If the edges of a cube are tripled, what is its volume multiplied by?'),
            options: [same('$9$'), same('$3$'), same('$27$')],
            correctIndex: 2,
            explanation: same('$k^{3}=3^{3}=27$')
        }
    },
    frustums: {
        mistake: {
            wrong: say('Kono txikiaren altuera enborraren altuera da.', 'La altura del cono pequeño es la del tronco.', 'ارتفاع المخروط الصغير هو ارتفاع الجذع.', 'The height of the small cone is that of the frustum.'),
            right: say('Beste bat da: antzekotasunetik ateratzen da, $\\dfrac{x}{r}=\\dfrac{x+h}{R}$.', 'Es otra: sale de la semejanza, $\\dfrac{x}{r}=\\dfrac{x+h}{R}$.', 'إنه ارتفاع آخر يُستخرج من التشابه: $\\dfrac{x}{r}=\\dfrac{x+h}{R}$.', 'It is a different one: it comes from the similarity, $\\dfrac{x}{r}=\\dfrac{x+h}{R}$.')
        },
        check: {
            prompt: say('12 cm-ko kono bat altueraren erdian mozten da oinarriaren plano paralelo batez. Bolumenaren zer zati da kono txikia?', 'Un cono de 12 cm de altura se corta a media altura con un plano paralelo a la base. ¿Qué parte del volumen es el cono pequeño?', 'مخروط ارتفاعه 12 سم يُقطع عند منتصف ارتفاعه بمستوٍ موازٍ للقاعدة. ما الجزء من الحجم الذي يمثله المخروط الصغير؟', 'A cone 12 cm high is cut halfway up by a plane parallel to the base. What part of the volume is the small cone?'),
            options: [same('$\\frac{1}{8}$'), same('$\\frac{1}{2}$'), same('$\\frac{1}{4}$')],
            correctIndex: 0,
            explanation: say('Arrazoia $k=\\frac{1}{2}$ da, eta bolumenak $k^{3}=\\frac{1}{8}$ zenbakiaz biderkatzen dira.', 'La razón es $k=\\frac{1}{2}$, y los volúmenes se multiplican por $k^{3}=\\frac{1}{8}$.', 'النسبة $k=\\frac{1}{2}$، والحجوم تُضرب في $k^{3}=\\frac{1}{8}$.', 'The ratio is $k=\\frac{1}{2}$, and volumes are multiplied by $k^{3}=\\frac{1}{8}$.')
        }
    },
    models: {
        mistake: {
            wrong: say('1:100 eskalan, 6 cm²-ko lurzorua 600 cm² da errealitatean.', 'A escala 1:100, un suelo de 6 cm² mide 600 cm² en la realidad.', 'بمقياس 1:100 تكون أرضية مساحتها 6 سم² في الواقع 600 سم².', 'At a 1:100 scale, a 6 cm² floor is 600 cm² in reality.'),
            right: say('Azalerak $100^{2}=10\\,000$ zenbakiaz biderkatzen dira: $60\\,000$ cm², hau da, 6 m².', 'Las áreas se multiplican por $100^{2}=10\\,000$: $60\\,000$ cm², es decir, 6 m².', 'تُضرب المساحات في $100^{2}=10\\,000$: $60\\,000$ سم²، أي 6 م².', 'Areas are multiplied by $100^{2}=10\\,000$: $60\\,000$ cm², that is, 6 m².')
        },
        check: {
            prompt: say('1:20 eskalako maketa batek 3 dm³-ko bolumena du. Zer bolumen du objektu errealak?', 'Una maqueta a escala 1:20 tiene 3 dm³ de volumen. ¿Qué volumen tiene el objeto real?', 'مجسّم بمقياس 1:20 حجمه 3 dm³. ما حجم الشيء الحقيقي؟', 'A 1:20 model has a volume of 3 dm³. What is the volume of the real object?'),
            options: [say('60 dm³', '60 dm³', '60 dm³', '60 dm³'), say('1,2 m³', '1,2 m³', '1.2 m³', '1.2 m³'), say('24 m³', '24 m³', '24 m³', '24 m³')],
            correctIndex: 2,
            explanation: say('$3\\cdot 20^{3}=24\\,000$ dm³, hau da, 24 m³.', '$3\\cdot 20^{3}=24\\,000$ dm³, es decir, 24 m³.', '$3\\cdot 20^{3}=24\\,000$ dm³، أي 24 m³.', '$3\\cdot 20^{3}=24\\,000$ dm³, that is, 24 m³.')
        }
    }
}

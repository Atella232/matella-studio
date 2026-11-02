import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Gorputz geometrikoak · 2. DBH — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. As in the lessons, π ≈ 3,14.
   ========================================================================== */

export type SolidsTopicId = 'elements' | 'euler' | 'regular' | 'prism-area' | 'pyramid-area' | 'frustum-area' | 'cylinder' | 'cone' | 'sphere' | 'volume-units' | 'capacity' | 'cavalieri' | 'prism-volume' | 'pyramid-volume' | 'sphere-volume'

/** As in lessons.tsx, the Arabic formulas get a decimal point */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const solidsLessonChecks: Record<SolidsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    elements: {
        mistake: {
            wrong: say('Piramide pentagonal batek 7 aurpegi ditu: 5 albokoak eta 2 oinarri.', 'Una pirámide pentagonal tiene 7 caras: 5 laterales y 2 bases.', 'للهرم الخماسي 7 أوجه: 5 جانبية وقاعدتان.', 'A pentagonal pyramid has 7 faces: 5 lateral ones and 2 bases.'),
            right: say('Piramideak oinarri bakarra du: $5+1=6$ aurpegi. Bi oinarri prismak ditu.', 'La pirámide tiene una sola base: $5+1=6$ caras. Las dos bases son del prisma.', 'للهرم قاعدة واحدة: $5+1=6$ أوجه. القاعدتان للمنشور.', 'A pyramid has only one base: $5+1=6$ faces. Two bases belong to a prism.')
        },
        check: {
            prompt: say('Zenbat ertz ditu prisma oktogonal batek?', '¿Cuántas aristas tiene un prisma octogonal?', 'كم حرفًا للمنشور الثماني؟', 'How many edges does an octagonal prism have?'),
            options: [same('$24$'), same('$16$'), same('$10$')],
            correctIndex: 0,
            explanation: say('8 ertz oinarri bakoitzean eta 8 albokoak: $3\\cdot 8=24$. $8+2=10$ aurpegi eta $2\\cdot 8=16$ erpin ditu.', '8 aristas en cada base y 8 laterales: $3\\cdot 8=24$. Tiene $8+2=10$ caras y $2\\cdot 8=16$ vértices.', '8 أحرف في كل قاعدة و8 جانبية: $3\\cdot 8=24$. وله $8+2=10$ أوجه و$2\\cdot 8=16$ رأسًا.', '8 edges on each base and 8 lateral ones: $3\\cdot 8=24$. It has $8+2=10$ faces and $2\\cdot 8=16$ vertices.')
        }
    },
    euler: {
        mistake: {
            wrong: say('8 aurpegi eta 12 erpin dituen poliedroa: $8+12+2=22$ ertz.', 'Un poliedro de 8 caras y 12 vértices tiene $8+12+2=22$ aristas.', 'متعدد أوجه له 8 أوجه و12 رأسًا عدد أحرفه $8+12+2=22$.', 'A polyhedron with 8 faces and 12 vertices has $8+12+2=22$ edges.'),
            right: say('Aurpegiak + erpinak = ertzak + 2; beraz, ertzak $8+12-2=18$ dira.', 'Caras + vértices = aristas + 2, así que las aristas son $8+12-2=18$.', 'الأوجه + الرؤوس = الأحرف + 2، إذن عدد الأحرف $8+12-2=18$.', 'Faces + vertices = edges + 2, so the edges are $8+12-2=18$.')
        },
        check: {
            prompt: say('Poliedro ganbil batek 10 erpin eta 15 ertz ditu. Zenbat aurpegi ditu?', 'Un poliedro convexo tiene 10 vértices y 15 aristas. ¿Cuántas caras tiene?', 'متعدد أوجه محدّب له 10 رؤوس و15 حرفًا. كم وجهًا له؟', 'A convex polyhedron has 10 vertices and 15 edges. How many faces does it have?'),
            options: [same('$27$'), same('$3$'), same('$7$')],
            correctIndex: 2,
            explanation: say('Aurpegiak = ertzak + 2 − erpinak: $15+2-10=7$. Adibidez, prisma pentagonal bat.', 'Caras = aristas + 2 − vértices: $15+2-10=7$. Por ejemplo, un prisma pentagonal.', 'الأوجه = الأحرف + 2 − الرؤوس: $15+2-10=7$. مثل منشور خماسي.', 'Faces = edges + 2 − vertices: $15+2-10=7$. A pentagonal prism, for example.')
        }
    },
    regular: {
        mistake: {
            wrong: say('Hexagono erregularrekin ere poliedro erregular bat egin daiteke.', 'Con hexágonos regulares también se puede hacer un poliedro regular.', 'يمكن أيضًا بناء متعدد أوجه منتظم من سداسيات منتظمة.', 'A regular polyhedron can also be made with regular hexagons.'),
            right: say('Hiru hexagonok $3\\cdot 120^{\\circ}=360^{\\circ}$ batzen dute eta lau geratzen dira: ez dute erpinik ixten. Bost poliedro erregular baino ez daude.', 'Tres hexágonos suman $3\\cdot 120^{\\circ}=360^{\\circ}$ y quedan planos: no cierran un vértice. Solo hay cinco poliedros regulares.', 'ثلاثة سداسيات مجموع زواياها $3\\cdot 120^{\\circ}=360^{\\circ}$ فتبقى مستوية ولا تغلق رأسًا. لا توجد إلا خمسة متعددات أوجه منتظمة.', 'Three hexagons add up to $3\\cdot 120^{\\circ}=360^{\\circ}$ and lie flat: they do not close a vertex. There are only five regular polyhedra.')
        },
        check: {
            prompt: say('Zein poligono erregularrekin ezin da poliedro erregularrik egin?', '¿Con qué polígono regular no se puede construir ningún poliedro regular?', 'بأيّ مضلع منتظم لا يمكن بناء أيّ متعدد أوجه منتظم؟', 'Which regular polygon cannot make any regular polyhedron?'),
            options: [
                say('Triangeluak', 'Triángulos', 'المثلثات', 'Triangles'),
                say('Hexagonoak', 'Hexágonos', 'السداسيات', 'Hexagons'),
                say('Pentagonoak', 'Pentágonos', 'المخمسات', 'Pentagons')
            ],
            correctIndex: 1,
            explanation: say('Hiru hexagonok $360^{\\circ}$ batzen dute erpin batean, eta lau geratzen dira. Triangeluekin hiru poliedro erregular daude, eta pentagonoekin dodekaedroa.', 'Tres hexágonos suman $360^{\\circ}$ en un vértice y quedan planos. Con triángulos hay tres poliedros regulares y con pentágonos, el dodecaedro.', 'ثلاثة سداسيات تجمع $360^{\\circ}$ عند الرأس فتبقى مستوية. ومن المثلثات ثلاثة متعددات أوجه منتظمة، ومن المخمسات اثنا عشري الأوجه.', 'Three hexagons add up to $360^{\\circ}$ at a vertex and lie flat. Triangles give three regular polyhedra, and pentagons the dodecahedron.')
        }
    },
    'prism-area': {
        mistake: {
            wrong: say('5 cm-ko ertzeko kuboa: azalera osoa $=4\\cdot 5^{2}=100$ cm².', 'Cubo de 5 cm de arista: área total $=4\\cdot 5^{2}=100$ cm².', 'مكعب حرفه 5 سم: المساحة الكلية $=4\\cdot 5^{2}=100$ سم².', 'Cube with 5 cm edges: total area $=4\\cdot 5^{2}=100$ cm².'),
            right: say('Kuboak sei aurpegi ditu: $6\\cdot 25=150$ cm². Laurekin, alboko azalera baino ez da.', 'El cubo tiene seis caras: $6\\cdot 25=150$ cm². Con cuatro, solo es el área lateral.', 'للمكعب ستة أوجه: $6\\cdot 25=150$ سم². وبأربعة نحصل على المساحة الجانبية فقط.', 'A cube has six faces: $6\\cdot 25=150$ cm². With four, it is only the lateral area.')
        },
        check: {
            prompt: say('Oinarri karratuko prisma batek 3 cm-ko oinarri-aldea eta 10 cm-ko altuera ditu. Zein da haren azalera osoa, cm²-tan?', 'Un prisma de base cuadrada tiene 3 cm de lado de la base y 10 cm de altura. ¿Cuál es su área total en cm²?', 'منشور قاعدته مربعة طول ضلعها 3 سم وارتفاعه 10 سم. ما مساحته الكلية بالسنتيمتر المربع؟', 'A square-based prism has a 3 cm base side and is 10 cm high. What is its total area in cm²?'),
            options: [same('$138$'), same('$120$'), same('$129$')],
            correctIndex: 0,
            explanation: say('Alboko azalera: $P\\cdot h=12\\cdot 10=120$. Bi oinarri: $2\\cdot 9=18$. Guztira: $120+18=138$ cm².', 'Área lateral: $P\\cdot h=12\\cdot 10=120$. Dos bases: $2\\cdot 9=18$. Total: $120+18=138$ cm².', 'المساحة الجانبية: $P\\cdot h=12\\cdot 10=120$. القاعدتان: $2\\cdot 9=18$. المجموع: $120+18=138$ سم².', 'Lateral area: $P\\cdot h=12\\cdot 10=120$. Two bases: $2\\cdot 9=18$. Total: $120+18=138$ cm².')
        }
    },
    'pyramid-area': {
        mistake: {
            wrong: say('10 cm-ko oinarri karratua eta 12 cm-ko altuera dituen piramidea: $A_L=\\frac{40\\cdot 12}{2}$.', 'Pirámide de base cuadrada de 10 cm de lado y 12 cm de altura: $A_L=\\frac{40\\cdot 12}{2}$.', 'هرم قاعدته مربعة ضلعها 10 سم وارتفاعه 12 سم: $A_L=\\frac{40\\cdot 12}{2}$.', 'Pyramid with a 10 cm square base and 12 cm high: $A_L=\\frac{40\\cdot 12}{2}$.'),
            right: say('Formulan apotema doa, ez altuera: $a=\\sqrt{12^{2}+5^{2}}=13$, eta $A_L=\\frac{40\\cdot 13}{2}=260$ cm².', 'En la fórmula va la apotema, no la altura: $a=\\sqrt{12^{2}+5^{2}}=13$, y $A_L=\\frac{40\\cdot 13}{2}=260$ cm².', 'في القانون نضع العامد لا الارتفاع: $a=\\sqrt{12^{2}+5^{2}}=13$، و$A_L=\\frac{40\\cdot 13}{2}=260$ سم².', 'The formula uses the apothem, not the height: $a=\\sqrt{12^{2}+5^{2}}=13$, and $A_L=\\frac{40\\cdot 13}{2}=260$ cm².')
        },
        check: {
            prompt: say('Piramide erregular batek 16 cm-ko aldeko oinarri karratua eta 6 cm-ko altuera ditu. Zein da haren alboko azalera, cm²-tan?', 'Una pirámide regular tiene base cuadrada de 16 cm de lado y 6 cm de altura. ¿Cuál es su área lateral en cm²?', 'هرم منتظم قاعدته مربعة ضلعها 16 سم وارتفاعه 6 سم. ما مساحته الجانبية بالسنتيمتر المربع؟', 'A regular pyramid has a 16 cm square base and is 6 cm high. What is its lateral area in cm²?'),
            options: [same('$192$'), same('$576$'), same('$320$')],
            correctIndex: 2,
            explanation: say('Apotema: $\\sqrt{6^{2}+8^{2}}=10$. $A_L=\\frac{64\\cdot 10}{2}=320$ cm². Altuerarekin 192 aterako litzateke.', 'Apotema: $\\sqrt{6^{2}+8^{2}}=10$. $A_L=\\frac{64\\cdot 10}{2}=320$ cm². Con la altura saldría 192.', 'العامد: $\\sqrt{6^{2}+8^{2}}=10$. $A_L=\\frac{64\\cdot 10}{2}=320$ سم². ومع الارتفاع يخرج 192.', 'Apothem: $\\sqrt{6^{2}+8^{2}}=10$. $A_L=\\frac{64\\cdot 10}{2}=320$ cm². With the height you would get 192.')
        }
    },
    'frustum-area': {
        mistake: {
            wrong: say('14 cm eta 4 cm-ko oinarri karratuak eta 13 cm-ko ertza dituen enborra: apotema $\\sqrt{13^{2}-10^{2}}$.', 'Tronco de bases cuadradas de 14 cm y 4 cm, y arista de 13 cm: apotema $\\sqrt{13^{2}-10^{2}}$.', 'جذع قاعدتاه مربعان ضلعاهما 14 سم و4 سم وحرفه 13 سم: العامد $\\sqrt{13^{2}-10^{2}}$.', 'Frustum with square bases of 14 cm and 4 cm and 13 cm edges: apothem $\\sqrt{13^{2}-10^{2}}$.'),
            right: say('Katetoa oinarrien kenduraren erdia da: $(14-4)\\mathbin{:}2=5$, eta apotema $\\sqrt{169-25}=12$ cm.', 'El cateto es la mitad de la diferencia de las bases: $(14-4)\\mathbin{:}2=5$, y la apotema, $\\sqrt{169-25}=12$ cm.', 'الضلع القائم نصف الفرق بين القاعدتين: $(14-4)\\mathbin{:}2=5$، والعامد $\\sqrt{169-25}=12$ سم.', 'The leg is half the difference of the bases: $(14-4)\\mathbin{:}2=5$, and the apothem is $\\sqrt{169-25}=12$ cm.')
        },
        check: {
            prompt: say('Piramide-enbor erregular baten oinarriak 9 cm eta 5 cm-ko aldeko karratuak dira, eta apotema 4 cm. Zein da haren alboko azalera, cm²-tan?', 'Un tronco de pirámide regular tiene bases cuadradas de 9 cm y 5 cm de lado, y su apotema mide 4 cm. ¿Cuál es su área lateral en cm²?', 'جذع هرم منتظم قاعدتاه مربعان ضلعاهما 9 سم و5 سم، وعامده 4 سم. ما مساحته الجانبية بالسنتيمتر المربع؟', 'A regular frustum has square bases with 9 cm and 5 cm sides, and its apothem is 4 cm. What is its lateral area in cm²?'),
            options: [same('$72$'), same('$112$'), same('$218$')],
            correctIndex: 1,
            explanation: say('$A_L=\\frac{(P+P\')\\cdot a}{2}=\\frac{(36+20)\\cdot 4}{2}=112$ cm². Bi oinarriekin azalera osoa litzateke, 218 cm².', '$A_L=\\frac{(P+P\')\\cdot a}{2}=\\frac{(36+20)\\cdot 4}{2}=112$ cm². Con las dos bases sería el área total, 218 cm².', '$A_L=\\frac{(P+P\')\\cdot a}{2}=\\frac{(36+20)\\cdot 4}{2}=112$ سم². ومع القاعدتين تكون المساحة الكلية 218 سم².', '$A_L=\\frac{(P+P\')\\cdot a}{2}=\\frac{(36+20)\\cdot 4}{2}=112$ cm². With both bases it would be the total area, 218 cm².')
        }
    },
    cylinder: {
        mistake: {
            wrong: say('10 cm-ko diametroa eta 20 cm-ko altuera dituen zilindroa: $A_L=2\\cdot 3{,}14\\cdot 10\\cdot 20$.', 'Cilindro de 10 cm de diámetro y 20 cm de altura: $A_L=2\\cdot 3{,}14\\cdot 10\\cdot 20$.', 'أسطوانة قطرها 10 سم وارتفاعها 20 سم: $A_L=2\\cdot 3{,}14\\cdot 10\\cdot 20$.', 'Cylinder 10 cm in diameter and 20 cm high: $A_L=2\\cdot 3{,}14\\cdot 10\\cdot 20$.'),
            right: say('Erradioa diametroaren erdia da, 5: $A_L=2\\cdot 3{,}14\\cdot 5\\cdot 20=628$ cm².', 'El radio es la mitad del diámetro, 5: $A_L=2\\cdot 3{,}14\\cdot 5\\cdot 20=628$ cm².', 'نصف القطر هو نصف طول القطر، أي 5: $A_L=2\\cdot 3{,}14\\cdot 5\\cdot 20=628$ سم².', 'The radius is half the diameter, 5: $A_L=2\\cdot 3{,}14\\cdot 5\\cdot 20=628$ cm².')
        },
        check: {
            prompt: say('Zilindro batek 2 cm-ko erradioa eta 5 cm-ko altuera ditu. Zein da haren alboko azalera, cm²-tan? (π ≈ 3,14)', 'Un cilindro tiene 2 cm de radio y 5 cm de altura. ¿Cuál es su área lateral en cm²? (π ≈ 3,14)', 'أسطوانة نصف قطرها 2 سم وارتفاعها 5 سم. ما مساحتها الجانبية بالسنتيمتر المربع؟ (π ≈ 3.14)', 'A cylinder has a 2 cm radius and is 5 cm high. What is its lateral area in cm²? (π ≈ 3.14)'),
            options: [same('$62{,}8$'), same('$31{,}4$'), same('$87{,}92$')],
            correctIndex: 0,
            explanation: say('$A_L=2\\pi r h=2\\cdot 3{,}14\\cdot 2\\cdot 5=62{,}8$ cm². Bi oinarriekin azalera osoa litzateke, 87,92 cm².', '$A_L=2\\pi r h=2\\cdot 3{,}14\\cdot 2\\cdot 5=62{,}8$ cm². Con las dos bases sería el área total, 87,92 cm².', '$A_L=2\\pi r h=2\\cdot 3{,}14\\cdot 2\\cdot 5=62{,}8$ سم². ومع القاعدتين تكون المساحة الكلية 87.92 سم².', '$A_L=2\\pi r h=2\\cdot 3{,}14\\cdot 2\\cdot 5=62{,}8$ cm². With both bases it would be the total area, 87.92 cm².')
        }
    },
    cone: {
        mistake: {
            wrong: say('5 cm-ko erradioa eta 12 cm-ko altuera dituen konoa: $A_L=3{,}14\\cdot 5\\cdot 12$.', 'Cono de 5 cm de radio y 12 cm de altura: $A_L=3{,}14\\cdot 5\\cdot 12$.', 'مخروط نصف قطره 5 سم وارتفاعه 12 سم: $A_L=3{,}14\\cdot 5\\cdot 12$.', 'Cone with a 5 cm radius, 12 cm high: $A_L=3{,}14\\cdot 5\\cdot 12$.'),
            right: say('$A_L=\\pi r g$ formulan sortzailea doa: $g=\\sqrt{12^{2}+5^{2}}=13$, eta $A_L=3{,}14\\cdot 5\\cdot 13=204{,}1$ cm².', 'En $A_L=\\pi r g$ va la generatriz: $g=\\sqrt{12^{2}+5^{2}}=13$, y $A_L=3{,}14\\cdot 5\\cdot 13=204{,}1$ cm².', 'في $A_L=\\pi r g$ نضع الراسم: $g=\\sqrt{12^{2}+5^{2}}=13$، و$A_L=3{,}14\\cdot 5\\cdot 13=204{,}1$ سم².', '$A_L=\\pi r g$ uses the slant height: $g=\\sqrt{12^{2}+5^{2}}=13$, and $A_L=3{,}14\\cdot 5\\cdot 13=204{,}1$ cm².')
        },
        check: {
            prompt: say('Kono batek 3 cm-ko erradioa eta 4 cm-ko altuera ditu. Zein da haren alboko azalera, cm²-tan? (π ≈ 3,14)', 'Un cono tiene 3 cm de radio y 4 cm de altura. ¿Cuál es su área lateral en cm²? (π ≈ 3,14)', 'مخروط نصف قطره 3 سم وارتفاعه 4 سم. ما مساحته الجانبية بالسنتيمتر المربع؟ (π ≈ 3.14)', 'A cone has a 3 cm radius and is 4 cm high. What is its lateral area in cm²? (π ≈ 3.14)'),
            options: [same('$37{,}68$'), same('$75{,}36$'), same('$47{,}1$')],
            correctIndex: 2,
            explanation: say('Sortzailea: $g=\\sqrt{4^{2}+3^{2}}=5$. $A_L=\\pi r g=3{,}14\\cdot 3\\cdot 5=47{,}1$ cm². Altuerarekin 37,68 aterako litzateke.', 'Generatriz: $g=\\sqrt{4^{2}+3^{2}}=5$. $A_L=\\pi r g=3{,}14\\cdot 3\\cdot 5=47{,}1$ cm². Con la altura saldría 37,68.', 'الراسم: $g=\\sqrt{4^{2}+3^{2}}=5$. $A_L=\\pi r g=3{,}14\\cdot 3\\cdot 5=47{,}1$ سم². ومع الارتفاع يخرج 37.68.', 'Slant height: $g=\\sqrt{4^{2}+3^{2}}=5$. $A_L=\\pi r g=3{,}14\\cdot 3\\cdot 5=47{,}1$ cm². With the height you would get 37.68.')
        }
    },
    sphere: {
        mistake: {
            wrong: say('6 cm-ko erradioko esfera: $A=3{,}14\\cdot 6^{2}=113{,}04$ cm².', 'Esfera de 6 cm de radio: $A=3{,}14\\cdot 6^{2}=113{,}04$ cm².', 'كرة نصف قطرها 6 سم: $A=3{,}14\\cdot 6^{2}=113{,}04$ سم².', 'Sphere with a 6 cm radius: $A=3{,}14\\cdot 6^{2}=113{,}04$ cm².'),
            right: say('Hori zirkulu maximo bakarra da. Esfera lau dira: $A=4\\cdot 3{,}14\\cdot 36=452{,}16$ cm².', 'Eso es un solo círculo máximo. La esfera son cuatro: $A=4\\cdot 3{,}14\\cdot 36=452{,}16$ cm².', 'هذه دائرة عظمى واحدة. والكرة أربع منها: $A=4\\cdot 3{,}14\\cdot 36=452{,}16$ سم².', 'That is a single great circle. The sphere is four of them: $A=4\\cdot 3{,}14\\cdot 36=452{,}16$ cm².')
        },
        check: {
            prompt: say('Pilota batek 10 cm-ko diametroa du. Zein da haren azalera, cm²-tan? (π ≈ 3,14)', 'Una pelota tiene 10 cm de diámetro. ¿Cuál es su área en cm²? (π ≈ 3,14)', 'كرة قطرها 10 سم. ما مساحتها بالسنتيمتر المربع؟ (π ≈ 3.14)', 'A ball is 10 cm in diameter. What is its area in cm²? (π ≈ 3.14)'),
            options: [same('$1256$'), same('$314$'), same('$78{,}5$')],
            correctIndex: 1,
            explanation: say('Erradioa: $10\\mathbin{:}2=5$. $A=4\\pi r^{2}=4\\cdot 3{,}14\\cdot 25=314$ cm². 1256 diametroa erradio gisa hartuz ateratzen da.', 'Radio: $10\\mathbin{:}2=5$. $A=4\\pi r^{2}=4\\cdot 3{,}14\\cdot 25=314$ cm². El 1256 sale tomando el diámetro como radio.', 'نصف القطر: $10\\mathbin{:}2=5$. $A=4\\pi r^{2}=4\\cdot 3{,}14\\cdot 25=314$ سم². أما 1256 فتأتي من أخذ القطر بدل نصفه.', 'Radius: $10\\mathbin{:}2=5$. $A=4\\pi r^{2}=4\\cdot 3{,}14\\cdot 25=314$ cm². 1256 comes from using the diameter as the radius.')
        }
    },
    'volume-units': {
        mistake: {
            wrong: same('$3\\ \\text{m}^{3}=30\\ \\text{dm}^{3}$'),
            right: say('Bolumenean maila bakoitza 1000 da: $3\\ \\text{m}^{3}=3000\\ \\text{dm}^{3}$.', 'En volumen cada escalón es 1000: $3\\ \\text{m}^{3}=3000\\ \\text{dm}^{3}$.', 'في الحجم كل درجة 1000: $3\\ \\text{m}^{3}=3000\\ \\text{dm}^{3}$.', 'In volume each step is 1000: $3\\ \\text{m}^{3}=3000\\ \\text{dm}^{3}$.')
        },
        check: {
            prompt: say('Zenbat cm³ dira 2,5 dm³?', '¿Cuántos cm³ son 2,5 dm³?', 'كم سنتيمترًا مكعبًا في 2.5 دسم³؟', 'How many cm³ are 2.5 dm³?'),
            options: [same('$25$'), same('$250$'), same('$2500$')],
            correctIndex: 2,
            explanation: say('dm³-tik cm³-ra maila bat jaisten da: bider 1000. $2{,}5\\cdot 1000=2500$ cm³. 250 azalerako mailekin ateratzen da (bider 100).', 'De dm³ a cm³ se baja un escalón: por 1000. $2{,}5\\cdot 1000=2500$ cm³. El 250 sale con los escalones de área, de 100.', 'من دسم³ إلى سم³ ننزل درجة واحدة: نضرب في 1000. $2{,}5\\cdot 1000=2500$ سم³. أما 250 فتأتي من درجات المساحة (100).', 'From dm³ to cm³ you go down one step: times 1000. $2{,}5\\cdot 1000=2500$ cm³. 250 comes from the area steps, of 100.')
        }
    },
    capacity: {
        mistake: {
            wrong: same('$1\\ \\text{m}^{3}=1\\ \\text{L}$'),
            right: say('Litro bat dezimetro kubiko bat da: $1\\ \\text{m}^{3}=1000\\ \\text{dm}^{3}=1000\\ \\text{L}$.', 'Un litro es un decímetro cúbico: $1\\ \\text{m}^{3}=1000\\ \\text{dm}^{3}=1000\\ \\text{L}$.', 'اللتر ديسيمتر مكعب: $1\\ \\text{m}^{3}=1000\\ \\text{dm}^{3}=1000\\ \\text{L}$.', 'A litre is a cubic decimetre: $1\\ \\text{m}^{3}=1000\\ \\text{dm}^{3}=1000\\ \\text{L}$.')
        },
        check: {
            prompt: say('Akuario batek 50 cm × 30 cm × 40 cm neurtzen ditu. Zenbat litro ur sartzen dira?', 'Un acuario mide 50 cm × 30 cm × 40 cm. ¿Cuántos litros caben?', 'حوض سمك أبعاده 50 سم × 30 سم × 40 سم. كم لترًا يتسع؟', 'A fish tank measures 50 cm × 30 cm × 40 cm. How many litres does it hold?'),
            options: [same('$60$'), same('$60\\,000$'), same('$600$')],
            correctIndex: 0,
            explanation: say('$50\\cdot 30\\cdot 40=60\\,000$ cm³, eta 1000 cm³ = 1 L: 60 L sartzen dira. $60\\,000$ zentimetro kubikoak dira, ez litroak.', '$50\\cdot 30\\cdot 40=60\\,000$ cm³, y 1000 cm³ = 1 L: caben 60 L. $60\\,000$ son centímetros cúbicos, no litros.', '$50\\cdot 30\\cdot 40=60\\,000$ سم³، و1000 سم³ = 1 لتر: يتسع 60 لترًا. أما $60\\,000$ فهي سنتيمترات مكعبة لا لترات.', '$50\\cdot 30\\cdot 40=60\\,000$ cm³, and 1000 cm³ = 1 L: it holds 60 L. $60\\,000$ is cubic centimetres, not litres.')
        }
    },
    cavalieri: {
        mistake: {
            wrong: say('Txanpon-pila makurtu batek pila zuzen berak baino bolumen handiagoa du.', 'Una pila de monedas inclinada ocupa más volumen que la misma pila recta.', 'كومة نقود مائلة تشغل حجمًا أكبر من الكومة نفسها مستقيمة.', 'A slanted stack of coins takes up more volume than the same stack standing straight.'),
            right: say('Altuera bera eta sekzio berdinak dituzte: bolumen bera (Cavalieriren printzipioa).', 'Tienen la misma altura y las mismas secciones: el mismo volumen (principio de Cavalieri).', 'لهما الارتفاع نفسه والمقاطع نفسها: الحجم نفسه (مبدأ كافاليري).', 'They have the same height and the same cross-sections: the same volume (Cavalieri’s principle).')
        },
        check: {
            prompt: say('Prisma zuzen batek eta prisma zeihar batek 12 cm²-ko oinarria eta altuera bera dute, 5 cm. Zeinek du bolumen handiagoa?', 'Un prisma recto y uno oblicuo tienen bases de 12 cm² y la misma altura, 5 cm. ¿Cuál tiene más volumen?', 'منشور قائم ومنشور مائل لهما قاعدتان مساحة كل منهما 12 سم² والارتفاع نفسه 5 سم. أيّهما حجمه أكبر؟', 'A right prism and an oblique prism have 12 cm² bases and the same height, 5 cm. Which has the greater volume?'),
            options: [
                say('Zuzenak', 'El recto', 'القائم', 'The right one'),
                say('Biek berdin: $60$ cm³', 'Los dos igual: $60$ cm³', 'كلاهما متساويان: $60$ سم³', 'Both the same: $60$ cm³'),
                say('Zeiharrak', 'El oblicuo', 'المائل', 'The oblique one')
            ],
            correctIndex: 1,
            explanation: say('Oinarri bera eta altuera bera: sekzioak berdinak dira; beraz, biek $12\\cdot 5=60$ cm³ dituzte.', 'Misma base y misma altura: las secciones son iguales, así que los dos tienen $12\\cdot 5=60$ cm³.', 'القاعدة نفسها والارتفاع نفسه: المقاطع متساوية، إذن لكل منهما $12\\cdot 5=60$ سم³.', 'Same base and same height: the cross-sections are equal, so both have $12\\cdot 5=60$ cm³.')
        }
    },
    'prism-volume': {
        mistake: {
            wrong: say('3 cm-ko erradioa eta 10 cm-ko altuera dituen zilindroa: $V=2\\cdot 3{,}14\\cdot 3\\cdot 10$.', 'Cilindro de 3 cm de radio y 10 cm de altura: $V=2\\cdot 3{,}14\\cdot 3\\cdot 10$.', 'أسطوانة نصف قطرها 3 سم وارتفاعها 10 سم: $V=2\\cdot 3{,}14\\cdot 3\\cdot 10$.', 'Cylinder with a 3 cm radius, 10 cm high: $V=2\\cdot 3{,}14\\cdot 3\\cdot 10$.'),
            right: say('Hori alboko azalera da. Bolumena oinarria bider altuera da: $V=3{,}14\\cdot 3^{2}\\cdot 10=282{,}6$ cm³.', 'Eso es el área lateral. El volumen es la base por la altura: $V=3{,}14\\cdot 3^{2}\\cdot 10=282{,}6$ cm³.', 'هذه المساحة الجانبية. الحجم هو القاعدة في الارتفاع: $V=3{,}14\\cdot 3^{2}\\cdot 10=282{,}6$ سم³.', 'That is the lateral area. The volume is the base times the height: $V=3{,}14\\cdot 3^{2}\\cdot 10=282{,}6$ cm³.')
        },
        check: {
            prompt: say('Prisma triangular baten oinarria 6 cm-ko oinarria eta 4 cm-ko altuera dituen triangelua da, eta prismak 10 cm-ko altuera du. Zein da haren bolumena, cm³-tan?', 'La base de un prisma triangular es un triángulo de 6 cm de base y 4 cm de altura, y el prisma mide 10 cm de alto. ¿Cuál es su volumen en cm³?', 'قاعدة منشور ثلاثي مثلث قاعدته 6 سم وارتفاعه 4 سم، وارتفاع المنشور 10 سم. ما حجمه بالسنتيمتر المكعب؟', 'The base of a triangular prism is a triangle with a 6 cm base and 4 cm height, and the prism is 10 cm tall. What is its volume in cm³?'),
            options: [same('$240$'), same('$80$'), same('$120$')],
            correctIndex: 2,
            explanation: say('Oinarriaren azalera: $\\frac{6\\cdot 4}{2}=12$ cm². $V=A_B\\cdot h=12\\cdot 10=120$ cm³. 240 triangeluaren zati bi ahaztuz ateratzen da.', 'Área de la base: $\\frac{6\\cdot 4}{2}=12$ cm². $V=A_B\\cdot h=12\\cdot 10=120$ cm³. El 240 sale olvidando dividir el triángulo entre dos.', 'مساحة القاعدة: $\\frac{6\\cdot 4}{2}=12$ سم². $V=A_B\\cdot h=12\\cdot 10=120$ سم³. أما 240 فتأتي من نسيان القسمة على 2 في المثلث.', 'Area of the base: $\\frac{6\\cdot 4}{2}=12$ cm². $V=A_B\\cdot h=12\\cdot 10=120$ cm³. 240 comes from forgetting to halve the triangle.')
        }
    },
    'pyramid-volume': {
        mistake: {
            wrong: say('5 cm-ko erradioa eta 13 cm-ko sortzailea dituen konoa: $V=\\frac{3{,}14\\cdot 25\\cdot 13}{3}$.', 'Cono de 5 cm de radio y 13 cm de generatriz: $V=\\frac{3{,}14\\cdot 25\\cdot 13}{3}$.', 'مخروط نصف قطره 5 سم وراسمه 13 سم: $V=\\frac{3{,}14\\cdot 25\\cdot 13}{3}$.', 'Cone with a 5 cm radius and a 13 cm slant height: $V=\\frac{3{,}14\\cdot 25\\cdot 13}{3}$.'),
            right: say('Formulan altuera doa: $h=\\sqrt{13^{2}-5^{2}}=12$, eta $V=\\frac{3{,}14\\cdot 25\\cdot 12}{3}=314$ cm³.', 'En la fórmula va la altura: $h=\\sqrt{13^{2}-5^{2}}=12$, y $V=\\frac{3{,}14\\cdot 25\\cdot 12}{3}=314$ cm³.', 'في القانون نضع الارتفاع: $h=\\sqrt{13^{2}-5^{2}}=12$، و$V=\\frac{3{,}14\\cdot 25\\cdot 12}{3}=314$ سم³.', 'The formula uses the height: $h=\\sqrt{13^{2}-5^{2}}=12$, and $V=\\frac{3{,}14\\cdot 25\\cdot 12}{3}=314$ cm³.')
        },
        check: {
            prompt: say('Piramide batek 6 cm-ko aldeko oinarri karratua eta 10 cm-ko altuera ditu. Zein da haren bolumena, cm³-tan?', 'Una pirámide de base cuadrada de 6 cm de lado mide 10 cm de altura. ¿Cuál es su volumen en cm³?', 'هرم قاعدته مربعة ضلعها 6 سم وارتفاعه 10 سم. ما حجمه بالسنتيمتر المكعب؟', 'A pyramid with a 6 cm square base is 10 cm high. What is its volume in cm³?'),
            options: [same('$120$'), same('$360$'), same('$40$')],
            correctIndex: 0,
            explanation: say('$V=\\frac{A_B\\cdot h}{3}=\\frac{36\\cdot 10}{3}=120$ cm³: prismaren herena (360 cm³).', '$V=\\frac{A_B\\cdot h}{3}=\\frac{36\\cdot 10}{3}=120$ cm³: un tercio del prisma (360 cm³).', '$V=\\frac{A_B\\cdot h}{3}=\\frac{36\\cdot 10}{3}=120$ سم³: ثلث المنشور (360 سم³).', '$V=\\frac{A_B\\cdot h}{3}=\\frac{36\\cdot 10}{3}=120$ cm³: a third of the prism (360 cm³).')
        }
    },
    'sphere-volume': {
        mistake: {
            wrong: say('6 cm-ko erradioko esfera: $V=\\frac{4}{3}\\cdot 3{,}14\\cdot 6^{2}$.', 'Esfera de 6 cm de radio: $V=\\frac{4}{3}\\cdot 3{,}14\\cdot 6^{2}$.', 'كرة نصف قطرها 6 سم: $V=\\frac{4}{3}\\cdot 3{,}14\\cdot 6^{2}$.', 'Sphere with a 6 cm radius: $V=\\frac{4}{3}\\cdot 3{,}14\\cdot 6^{2}$.'),
            right: say('Erradioa kubora doa: $V=\\frac{4}{3}\\cdot 3{,}14\\cdot 216=904{,}32$ cm³.', 'El radio va al cubo: $V=\\frac{4}{3}\\cdot 3{,}14\\cdot 216=904{,}32$ cm³.', 'نصف القطر يُرفع إلى القوة الثالثة: $V=\\frac{4}{3}\\cdot 3{,}14\\cdot 216=904{,}32$ سم³.', 'The radius is cubed: $V=\\frac{4}{3}\\cdot 3{,}14\\cdot 216=904{,}32$ cm³.')
        },
        check: {
            prompt: say('Bola batek 30 cm-ko diametroa du. Gutxi gorabehera, zenbat litro da haren bolumena? (π ≈ 3,14)', 'Una bola tiene 30 cm de diámetro. ¿Cuántos litros, más o menos, es su volumen? (π ≈ 3,14)', 'كرة قطرها 30 سم. كم لترًا تقريبًا حجمها؟ (π ≈ 3.14)', 'A ball is 30 cm in diameter. Roughly how many litres is its volume? (π ≈ 3.14)'),
            options: [same('$\\approx 113$'), same('$\\approx 14{,}1$'), same('$\\approx 0{,}9$')],
            correctIndex: 1,
            explanation: say('Erradioa: 15 cm. $V=\\frac{4}{3}\\cdot 3{,}14\\cdot 15^{3}=14\\,130$ cm³, 14,1 L inguru. 113 diametroa erradio gisa hartuz ateratzen da.', 'Radio: 15 cm. $V=\\frac{4}{3}\\cdot 3{,}14\\cdot 15^{3}=14\\,130$ cm³, unos 14,1 L. El 113 sale tomando el diámetro como radio.', 'نصف القطر: 15 سم. $V=\\frac{4}{3}\\cdot 3{,}14\\cdot 15^{3}=14\\,130$ سم³، أي نحو 14.1 لتر. أما 113 فتأتي من أخذ القطر بدل نصفه.', 'Radius: 15 cm. $V=\\frac{4}{3}\\cdot 3{,}14\\cdot 15^{3}=14\\,130$ cm³, about 14.1 L. 113 comes from using the diameter as the radius.')
        }
    }
}

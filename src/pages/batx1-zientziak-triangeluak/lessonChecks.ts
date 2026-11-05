import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Triangeluen ebazpena · Batxilergoa 1 · Zientziak — the typical mistake
   and the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics. Formulas
   write \sin and \tan (localizeNames gives each language its names). The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical mistake.
   The trigonometric values are checked in
   tests/triangeluak-batx1z-content.test.ts.
   ========================================================================== */

export type TrianglesTopicId =
    | 'quadrant-ratios' | 'big-angles' | 'related-angles' | 'inverse-angles'
    | 'right-review' | 'height-strategy'
    | 'sine-rule' | 'ambiguous-case' | 'circumradius'
    | 'cosine-rule' | 'three-sides' | 'which-rule'
    | 'heron' | 'inaccessible' | 'parallelogram-forces'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const trianglesLessonChecks: Record<TrianglesTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Any angle ---------- */
    'quadrant-ratios': {
        mistake: {
            wrong: say('$\\sin\\alpha=\\frac{1}{2}$ eta α bigarren koadrantean: $\\cos\\alpha=\\frac{\\sqrt{3}}{2}$', '$\\sin\\alpha=\\frac{1}{2}$ y α en el segundo cuadrante: $\\cos\\alpha=\\frac{\\sqrt{3}}{2}$', '$\\sin\\alpha=\\frac{1}{2}$ وα في الربع الثاني: $\\cos\\alpha=\\frac{\\sqrt{3}}{2}$', '$\\sin\\alpha=\\frac{1}{2}$ and α in the second quadrant: $\\cos\\alpha=\\frac{\\sqrt{3}}{2}$'),
            right: say('Bigarren koadrantean kosinua negatiboa da: $\\cos\\alpha=-\\frac{\\sqrt{3}}{2}$.', 'En el segundo cuadrante el coseno es negativo: $\\cos\\alpha=-\\frac{\\sqrt{3}}{2}$.', 'جيب التمام سالب في الربع الثاني: $\\cos\\alpha=-\\frac{\\sqrt{3}}{2}$.', 'In the second quadrant the cosine is negative: $\\cos\\alpha=-\\frac{\\sqrt{3}}{2}$.')
        },
        check: {
            prompt: say('$\\tan\\alpha=-\\frac{8}{15}$ da, eta α laugarren koadrantean dago. Zenbat da $\\cos\\alpha$?', '$\\tan\\alpha=-\\frac{8}{15}$ y α está en el cuarto cuadrante. ¿Cuánto vale $\\cos\\alpha$?', '$\\tan\\alpha=-\\frac{8}{15}$ وα في الربع الرابع. كم قيمة $\\cos\\alpha$؟', '$\\tan\\alpha=-\\frac{8}{15}$ and α is in the fourth quadrant. What is $\\cos\\alpha$?'),
            options: [same('$-\\frac{15}{17}$'), same('$\\frac{15}{17}$'), same('$\\frac{8}{17}$')],
            correctIndex: 1,
            explanation: say('Laugarren koadrantean kosinua positiboa da: $\\cos\\alpha=\\frac{15}{\\sqrt{8^2+15^2}}=\\frac{15}{17}$.', 'En el cuarto cuadrante el coseno es positivo: $\\cos\\alpha=\\frac{15}{\\sqrt{8^2+15^2}}=\\frac{15}{17}$.', 'جيب التمام موجب في الربع الرابع: $\\cos\\alpha=\\frac{15}{\\sqrt{8^2+15^2}}=\\frac{15}{17}$.', 'In the fourth quadrant the cosine is positive: $\\cos\\alpha=\\frac{15}{\\sqrt{8^2+15^2}}=\\frac{15}{17}$.')
        }
    },
    'big-angles': {
        mistake: {
            wrong: same('$800\\div 360\\approx 2{,}22\\ \\to\\ 22°$'),
            right: say('Hondarra ez da zati hamartarra: $800-2\\cdot 360=80$; beraz, angelua 80° da.', 'El resto no es la parte decimal: $800-2\\cdot 360=80$, así que el ángulo es 80°.', 'الباقي ليس الجزء العشري: $800-2\\cdot 360=80$، إذن الزاوية 80°.', 'The remainder is not the decimal part: $800-2\\cdot 360=80$, so the angle is 80°.')
        },
        check: {
            prompt: say('0°-tik 360°-rako zein angeluren baliokidea da 1000°-ko angelua?', '¿A qué ángulo entre 0° y 360° equivale uno de 1000°?', 'أي زاوية بين 0° و360° تكافئ زاوية 1000°؟', 'Which angle between 0° and 360° is the same as one of 1000°?'),
            options: [same('$280°$'), same('$640°$'), same('$78°$')],
            correctIndex: 0,
            explanation: same('$1000°=2\\cdot 360°+280°$')
        }
    },
    'related-angles': {
        mistake: {
            wrong: same('$\\sin 160°=\\cos 20°$'),
            right: say('180° − α angeluarekin izena ez da aldatzen: $\\sin 160°=\\sin 20°$.', 'Con 180° − α no se cambia el nombre: $\\sin 160°=\\sin 20°$.', 'مع 180° − α لا يتغير الاسم: $\\sin 160°=\\sin 20°$.', 'With 180° − α the name does not change: $\\sin 160°=\\sin 20°$.')
        },
        check: {
            prompt: say('Zeren berdina da $\\cos 100°$?', '¿Qué es igual a $\\cos 100°$?', 'ما الذي يساوي $\\cos 100°$؟', 'What is equal to $\\cos 100°$?'),
            options: [same('$-\\sin 10°$'), same('$\\sin 10°$'), same('$-\\cos 10°$')],
            correctIndex: 0,
            explanation: same('$\\cos(90°+10°)=-\\sin 10°$')
        }
    },
    'inverse-angles': {
        mistake: {
            wrong: same('$\\sin\\alpha=0{,}5\\ \\to\\ \\alpha=30°$'),
            right: say('Bestea falta da: $\\sin 150°=0{,}5$ ere bada, beraz $\\alpha=150°$ ere bai.', 'Falta el otro: también $\\sin 150°=0{,}5$, así que $\\alpha=150°$ también vale.', 'ينقص الآخر: $\\sin 150°=0{,}5$ أيضًا، إذن $\\alpha=150°$ تصلح أيضًا.', 'The other one is missing: $\\sin 150°=0{,}5$ too, so $\\alpha=150°$ works as well.')
        },
        check: {
            prompt: say('$\\tan\\alpha=1$ da, eta α hirugarren koadrantean dago. Zenbat neurtzen du α angeluak?', '$\\tan\\alpha=1$ y α está en el tercer cuadrante. ¿Cuánto mide α?', '$\\tan\\alpha=1$ وα في الربع الثالث. كم قياس α؟', '$\\tan\\alpha=1$ and α is in the third quadrant. What is α?'),
            options: [same('$225°$'), same('$45°$'), same('$135°$')],
            correctIndex: 0,
            explanation: same('$45°+180°=225°$')
        }
    },

    /* ---------- 2. Right triangles and the height ---------- */
    'right-review': {
        mistake: {
            wrong: say('A-n angeluzuzena, $a=12$ eta $B=35°$: $b=12\\cdot\\cos 35°$', 'Rectángulo en A, $a=12$ y $B=35°$: $b=12\\cdot\\cos 35°$', 'قائم في A، و$a=12$ و$B=35°$: $b=12\\cdot\\cos 35°$', 'Right angle at A, $a=12$ and $B=35°$: $b=12\\cdot\\cos 35°$'),
            right: say('$b$ B angeluaren aurkako katetoa da: $b=12\\cdot\\sin 35°$.', '$b$ es el cateto opuesto a B: $b=12\\cdot\\sin 35°$.', '$b$ هو الضلع القائم المقابل لـ B: $b=12\\cdot\\sin 35°$.', '$b$ is the leg opposite B: $b=12\\cdot\\sin 35°$.')
        },
        check: {
            prompt: say('A-n angeluzuzena den triangelu batean $b=9$ eta $c=12$ dira. Zenbat da hipotenusa?', 'En un triángulo rectángulo en A, $b=9$ y $c=12$. ¿Cuánto mide la hipotenusa?', 'في مثلث قائم في A: $b=9$ و$c=12$. كم طول الوتر؟', 'In a triangle with a right angle at A, $b=9$ and $c=12$. How long is the hypotenuse?'),
            options: [same('$21$'), same('$15$'), same('$\\sqrt{63}$')],
            correctIndex: 1,
            explanation: same('$a=\\sqrt{9^2+12^2}=15$')
        }
    },
    'height-strategy': {
        mistake: {
            wrong: say('Altuera kanpoan: $c=AH+HB$', 'Altura fuera: $c=AH+HB$', 'الارتفاع خارج المثلث: $c=AH+HB$', 'Height outside: $c=AH+HB$'),
            right: say('Altuera kanpoan erortzen bada, zatiak kendu egiten dira: $c=AH-BH$.', 'Si la altura cae fuera, los trozos se restan: $c=AH-BH$.', 'إذا وقع الارتفاع خارج المثلث طُرح الجزآن: $c=AH-BH$.', 'If the height falls outside, the pieces are subtracted: $c=AH-BH$.')
        },
        check: {
            prompt: say('ABC triangeluan $a=6$ cm eta $B=150°$ dira. Zenbat da C erpinetik ateratako altuera?', 'En el triángulo ABC, $a=6$ cm y $B=150°$. ¿Cuánto mide la altura desde C?', 'في المثلث ABC: $a=6$ سم و$B=150°$. كم طول الارتفاع النازل من C؟', 'In triangle ABC, $a=6$ cm and $B=150°$. How long is the height from C?'),
            options: [same('$3\\sqrt{3}$'), same('$6$'), same('$3$')],
            correctIndex: 2,
            explanation: say('Kanpoan erortzen da, eta kanpoko triangeluan angelua 30° da: $h=6\\cdot\\sin 30°=3$.', 'Cae fuera, y en el triángulo de fuera el ángulo es 30°: $h=6\\cdot\\sin 30°=3$.', 'يقع خارج المثلث، والزاوية في المثلث الخارجي 30°: $h=6\\cdot\\sin 30°=3$.', 'It falls outside, and in the outer triangle the angle is 30°: $h=6\\cdot\\sin 30°=3$.')
        }
    },

    /* ---------- 3. The sine rule ---------- */
    'sine-rule': {
        mistake: {
            wrong: same('$\\frac{a}{\\sin B}=\\frac{b}{\\sin A}$'),
            right: say('Alde bakoitza bere aurkako angeluarekin doa: $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$.', 'Cada lado va con su ángulo opuesto: $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$.', 'كل ضلع مع الزاوية المقابلة له: $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$.', 'Each side goes with its opposite angle: $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$.')
        },
        check: {
            prompt: say('ABC triangeluan $A=30°$, $a=5$ eta $B=90°$ dira. Zenbat da $b$?', 'En el triángulo ABC, $A=30°$, $a=5$ y $B=90°$. ¿Cuánto mide $b$?', 'في المثلث ABC: $A=30°$ و$a=5$ و$B=90°$. كم طول $b$؟', 'In triangle ABC, $A=30°$, $a=5$ and $B=90°$. How long is $b$?'),
            options: [same('$10$'), same('$2{,}5$'), same('$5$')],
            correctIndex: 0,
            explanation: same('$b=\\frac{5\\cdot\\sin 90°}{\\sin 30°}=10$')
        }
    },
    'ambiguous-case': {
        mistake: {
            wrong: say('$\\sin B=0{,}8\\ \\to\\ B\\approx 53{,}1°$, eta kitto', '$\\sin B=0{,}8\\ \\to\\ B\\approx 53{,}1°$, y ya está', '$\\sin B=0{,}8\\ \\to\\ B\\approx 53{,}1°$، وانتهى', '$\\sin B=0{,}8\\ \\to\\ B\\approx 53{,}1°$, and that is it'),
            right: say('$B\\approx 126{,}9°$ falta da: A-rekin 180° baino gutxiago egiten badu, hark ere balio du.', 'Falta $B\\approx 126{,}9°$: si con A suma menos de 180°, también vale.', 'ينقص $B\\approx 126{,}9°$: إذا كان مجموعها مع A أقل من 180° فهي تصلح أيضًا.', 'You are missing $B\\approx 126{,}9°$: if it adds up to less than 180° with A, it works too.')
        },
        check: {
            prompt: say('ABC triangeluan $a=9$, $b=6$ eta $A=70°$ dira. Zenbat triangelu daude?', 'En el triángulo ABC, $a=9$, $b=6$ y $A=70°$. ¿Cuántos triángulos hay?', 'في المثلث ABC: $a=9$ و$b=6$ و$A=70°$. كم مثلثًا يوجد؟', 'In triangle ABC, $a=9$, $b=6$ and $A=70°$. How many triangles are there?'),
            options: [same('$2$'), same('$1$'), same('$0$')],
            correctIndex: 1,
            explanation: say('$a>b$ denez, B zorrotza da: $\\sin B\\approx 0{,}63$ eta $B\\approx 38{,}8°$; besteak, 141,2°, ez du lekurik 70°-rekin.', 'Como $a>b$, B es agudo: $\\sin B\\approx 0{,}63$ y $B\\approx 38{,}8°$; el otro, 141,2°, no cabe con 70°.', 'بما أن $a>b$ فالزاوية B حادة: $\\sin B\\approx 0{,}63$ و$B\\approx 38{,}8°$؛ أما الأخرى 141.2° فلا تتسع مع 70°.', 'Since $a>b$, B is acute: $\\sin B\\approx 0{,}63$ and $B\\approx 38{,}8°$; the other one, 141.2°, does not fit with 70°.')
        }
    },
    circumradius: {
        mistake: {
            wrong: same('$\\frac{a}{\\sin A}=R$'),
            right: say('Diametroa da, ez erradioa: $\\frac{a}{\\sin A}=2R$.', 'Es el diámetro, no el radio: $\\frac{a}{\\sin A}=2R$.', 'إنه القطر لا نصف القطر: $\\frac{a}{\\sin A}=2R$.', 'It is the diameter, not the radius: $\\frac{a}{\\sin A}=2R$.')
        },
        check: {
            prompt: say('Triangelu aldeberdin baten aldeak 9 cm dira. Zenbat da haren zirkunferentzia zirkunskribatuaren erradioa?', 'Un triángulo equilátero tiene lados de 9 cm. ¿Cuánto mide el radio de su circunferencia circunscrita?', 'مثلث متساوي الأضلاع طول ضلعه 9 سم. كم نصف قطر دائرته المحيطة؟', 'An equilateral triangle has sides of 9 cm. What is the radius of its circumscribed circle?'),
            options: [same('$9$'), same('$\\frac{9}{2}$'), same('$3\\sqrt{3}$')],
            correctIndex: 2,
            explanation: same('$2R=\\frac{9}{\\sin 60°}=6\\sqrt{3}$')
        }
    },

    /* ---------- 4. The cosine rule ---------- */
    'cosine-rule': {
        mistake: {
            wrong: same('$a^2=(b^2+c^2-2bc)\\cdot\\cos A$'),
            right: say('Azken gaiak bakarrik darama kosinua: $a^2=b^2+c^2-2bc\\cdot\\cos A$.', 'Solo el último término lleva el coseno: $a^2=b^2+c^2-2bc\\cdot\\cos A$.', 'الحد الأخير وحده فيه جيب التمام: $a^2=b^2+c^2-2bc\\cdot\\cos A$.', 'Only the last term has the cosine: $a^2=b^2+c^2-2bc\\cdot\\cos A$.')
        },
        check: {
            prompt: say('ABC triangeluan $b=3$, $c=5$ eta $A=120°$ dira. Zenbat da $a$?', 'En el triángulo ABC, $b=3$, $c=5$ y $A=120°$. ¿Cuánto mide $a$?', 'في المثلث ABC: $b=3$ و$c=5$ و$A=120°$. كم طول $a$؟', 'In triangle ABC, $b=3$, $c=5$ and $A=120°$. How long is $a$?'),
            options: [same('$\\sqrt{34}$'), same('$7$'), same('$\\sqrt{19}$')],
            correctIndex: 1,
            explanation: same('$a^2=9+25-30\\cdot(-0{,}5)=49$')
        }
    },
    'three-sides': {
        mistake: {
            wrong: say('2, 3 eta 6 aldeak: $\\cos A=\\frac{4+9-36}{12}$', 'Lados 2, 3 y 6: $\\cos A=\\frac{4+9-36}{12}$', 'الأضلاع 2 و3 و6: $\\cos A=\\frac{4+9-36}{12}$', 'Sides 2, 3 and 6: $\\cos A=\\frac{4+9-36}{12}$'),
            right: say('$2+3<6$: alde horiek ez dute triangelurik ixten, eta horregatik ateratzen da $-1$ baino txikiagoa den kosinua.', '$2+3<6$: esos lados no cierran un triángulo, y por eso sale un coseno menor que $-1$.', '$2+3<6$: هذه الأضلاع لا تغلق مثلثًا، ولذلك يخرج جيب تمام أصغر من $-1$.', '$2+3<6$: those sides do not close up into a triangle, which is why the cosine comes out below $-1$.')
        },
        check: {
            prompt: say('Triangelu baten aldeak 5, 12 eta 13 dira. Zer motatakoa da?', 'Los lados de un triángulo miden 5, 12 y 13. ¿Qué clase de triángulo es?', 'أضلاع مثلث 5 و12 و13. ما نوعه؟', 'The sides of a triangle are 5, 12 and 13. What type of triangle is it?'),
            options: [say('Angeluzorrotza', 'Acutángulo', 'حاد الزوايا', 'Acute'), say('Angeluzuzena', 'Rectángulo', 'قائم', 'Right-angled'), say('Angelukamutsa', 'Obtusángulo', 'منفرج', 'Obtuse')],
            correctIndex: 1,
            explanation: same('$5^2+12^2=13^2$')
        }
    },
    'which-rule': {
        mistake: {
            wrong: say('$a=5$, $b=9$ eta $C=40°$: $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$', '$a=5$, $b=9$ y $C=40°$: $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$', '$a=5$ و$b=9$ و$C=40°$: $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$', '$a=5$, $b=9$ and $C=40°$: $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}$'),
            right: say('Ez dago bikote ezagunik: lehenik kosinua, $c$ aldearentzat.', 'No hay ninguna pareja conocida: primero el coseno, para $c$.', 'لا يوجد ثنائي معروف: جيب التمام أولًا لإيجاد $c$.', 'There is no known pair: the cosine first, for $c$.')
        },
        check: {
            prompt: say('Hiru aldeak ezagutzen dituzu. Zerekin kalkulatzen duzu lehen angelua?', 'Conoces los tres lados. ¿Con qué hallas el primer ángulo?', 'تعرف الأضلاع الثلاثة. بماذا تجد الزاوية الأولى؟', 'You know the three sides. What do you use to find the first angle?'),
            options: [say('Sinuaren teoremarekin', 'Con el teorema de los senos', 'بمبرهنة الجيوب', 'The sine rule'), say('180° ken besteak eginez', 'Con 180° menos los otros', 'بـ 180° ناقص الأخريين', '180° minus the others'), say('Kosinuaren teoremarekin', 'Con el teorema del coseno', 'بمبرهنة جيب التمام', 'The cosine rule')],
            correctIndex: 2,
            explanation: say('Angelurik gabe ez dago bikoterik: kosinuak angelua hiru aldeetatik ematen du.', 'Sin ningún ángulo no hay pareja: el coseno da el ángulo a partir de los tres lados.', 'بلا أي زاوية لا يوجد ثنائي: جيب التمام يعطي الزاوية من الأضلاع الثلاثة.', 'With no angle there is no pair: the cosine gives the angle from the three sides.')
        }
    },

    /* ---------- 5. Areas and problems ---------- */
    heron: {
        mistake: {
            wrong: say('7, 8 eta 9 aldeak: $s=24$', 'Lados 7, 8 y 9: $s=24$', 'الأضلاع 7 و8 و9: $s=24$', 'Sides 7, 8 and 9: $s=24$'),
            right: say('$s$ perimetroaren erdia da: $s=12$ eta $S=\\sqrt{12\\cdot 5\\cdot 4\\cdot 3}$.', '$s$ es la mitad del perímetro: $s=12$ y $S=\\sqrt{12\\cdot 5\\cdot 4\\cdot 3}$.', '$s$ نصف المحيط: $s=12$ و$S=\\sqrt{12\\cdot 5\\cdot 4\\cdot 3}$.', '$s$ is half the perimeter: $s=12$ and $S=\\sqrt{12\\cdot 5\\cdot 4\\cdot 3}$.')
        },
        check: {
            prompt: say('6 cm eta 10 cm-ko bi aldek 30°-ko angelua osatzen dute. Zenbat da azalera?', 'Dos lados de 6 cm y 10 cm forman un ángulo de 30°. ¿Cuánto mide el área?', 'ضلعان طولاهما 6 سم و10 سم بينهما زاوية 30°. كم المساحة؟', 'Two sides of 6 cm and 10 cm make an angle of 30°. What is the area?'),
            options: [same('$30$'), same('$15$'), same('$60$')],
            correctIndex: 1,
            explanation: same('$S=\\frac{1}{2}\\cdot 6\\cdot 10\\cdot\\sin 30°=15$')
        }
    },
    inaccessible: {
        mistake: {
            wrong: same('$AE=\\frac{AB\\cdot\\sin A}{\\sin E}$'),
            right: say('AE aldea B-ren parean dago: $AE=\\frac{AB\\cdot\\sin B}{\\sin E}$.', 'AE está enfrente de B: $AE=\\frac{AB\\cdot\\sin B}{\\sin E}$.', 'الضلع AE مقابل B: $AE=\\frac{AB\\cdot\\sin B}{\\sin E}$.', 'AE is opposite B: $AE=\\frac{AB\\cdot\\sin B}{\\sin E}$.')
        },
        check: {
            prompt: say('100 m-ko oinarri baten muturretatik puntu bat ikusten da, 45°-ko bi angeluekin. Zer distantziara dago oinarritik?', 'Desde los extremos de una base de 100 m se ve un punto con dos ángulos de 45°. ¿A qué distancia está de la base?', 'من طرفي قاعدة طولها 100 م تُرى نقطة بزاويتين قياس كل منهما 45°. كم تبعد عن القاعدة؟', 'From the ends of a 100 m base a point is seen with two angles of 45°. How far is it from the base?'),
            options: [same('$50$'), same('$100$'), same('$70{,}71$')],
            correctIndex: 0,
            explanation: say('Karratu erdia da: altuera oinarriaren erdia da, $\\frac{100}{2}=50$.', 'Es medio cuadrado: la altura es la mitad de la base, $\\frac{100}{2}=50$.', 'إنه نصف مربع: الارتفاع نصف القاعدة، $\\frac{100}{2}=50$.', 'It is half a square: the height is half the base, $\\frac{100}{2}=50$.')
        }
    },
    'parallelogram-forces': {
        mistake: {
            wrong: say('6 N eta 8 N-eko indarrak, 90°-an: $R=14$ N', 'Fuerzas de 6 N y 8 N a 90°: $R=14$ N', 'قوتان 6 N و8 N بزاوية 90°: $R=14$ N', 'Forces of 6 N and 8 N at 90°: $R=14$ N'),
            right: say('Indarrak ez dira zenbakiak bezala batzen: $R=\\sqrt{36+64}=10$ N.', 'Las fuerzas no se suman como números: $R=\\sqrt{36+64}=10$ N.', 'القوى لا تُجمع كالأعداد: $R=\\sqrt{36+64}=10$ N.', 'Forces do not add up like numbers: $R=\\sqrt{36+64}=10$ N.')
        },
        check: {
            prompt: say('10 N-eko bi indarrek 120°-ko angelua osatzen dute. Zenbatekoa da erresultantea?', 'Dos fuerzas de 10 N forman un ángulo de 120°. ¿Cuánto mide la resultante?', 'قوتان مقدار كل منهما 10 N بينهما زاوية 120°. كم مقدار المحصلة؟', 'Two forces of 10 N make an angle of 120°. How big is the resultant?'),
            options: [same('$20$'), same('$10\\sqrt{3}$'), same('$10$')],
            correctIndex: 2,
            explanation: same('$R^2=100+100+200\\cdot\\cos 120°=100$')
        }
    }
}

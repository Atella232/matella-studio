import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Angeluak eta distantziak · Batxilergoa 2 · Zientziak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no
   JSX) so the tests can import it; lessons.tsx merges it into the
   topics. The questions use new numbers, never those of «Let's solve» or
   of the example, and one of their wrong answers is the lesson's typical
   mistake. A line or a plane in a question is named with a formula of
   its own ($r$:, $\pi$:), so the question is not read as one equation.
   ========================================================================== */

export type AnglesDistancesTopicId =
    | 'angle-lines' | 'angle-line-plane' | 'angle-planes'
    | 'project-point-plane' | 'project-point-line' | 'project-line-plane'
    | 'symmetric-plane' | 'symmetric-line' | 'mediator-plane'
    | 'point-plane' | 'parallel-planes' | 'point-line'
    | 'parallel-lines' | 'skew-distance' | 'common-perpendicular'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const anglesDistancesLessonChecks: Record<AnglesDistancesTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Angles ---------- */
    'angle-lines': {
        mistake: {
            wrong: say('$\\vec{u}\\cdot\\vec{v}=-3$ denez, $\\cos\\alpha=-\\frac{1}{2}$ eta angelua $120^\\circ$ da', 'Como $\\vec{u}\\cdot\\vec{v}=-3$, $\\cos\\alpha=-\\frac{1}{2}$ y el ángulo es $120^\\circ$', 'بما أن $\\vec{u}\\cdot\\vec{v}=-3$ فإن $\\cos\\alpha=-\\frac{1}{2}$ والزاوية $120^\\circ$', 'Since $\\vec{u}\\cdot\\vec{v}=-3$, $\\cos\\alpha=-\\frac{1}{2}$ and the angle is $120^\\circ$'),
            right: say('Bi zuzenen angelua $0^\\circ$ eta $90^\\circ$ artean dago: balio absolutua, $\\cos\\alpha=\\frac{1}{2}$, $60^\\circ$.', 'El ángulo de dos rectas está entre $0^\\circ$ y $90^\\circ$: valor absoluto, $\\cos\\alpha=\\frac{1}{2}$, $60^\\circ$.', 'زاوية مستقيمين بين $0^\\circ$ و$90^\\circ$: القيمة المطلقة، $\\cos\\alpha=\\frac{1}{2}$، أي $60^\\circ$.', 'The angle of two lines is between $0^\\circ$ and $90^\\circ$: absolute value, $\\cos\\alpha=\\frac{1}{2}$, $60^\\circ$.')
        },
        check: {
            prompt: say('$\\vec{u}=(1,0,0)$ eta $\\vec{v}=(-1,1,0)$ norabideak dituzten zuzenek zer angelu osatzen dute?', '¿Qué ángulo forman las rectas de direcciones $\\vec{u}=(1,0,0)$ y $\\vec{v}=(-1,1,0)$?', 'ما الزاوية بين المستقيمين ذوي الاتجاهين $\\vec{u}=(1,0,0)$ و$\\vec{v}=(-1,1,0)$؟', 'What angle do the lines with directions $\\vec{u}=(1,0,0)$ and $\\vec{v}=(-1,1,0)$ form?'),
            options: [same('$135^\\circ$'), same('$45^\\circ$'), same('$90^\\circ$')],
            correctIndex: 1,
            explanation: say('$|\\vec{u}\\cdot\\vec{v}|=1$ eta $|\\vec{u}|\\,|\\vec{v}|=\\sqrt{2}$: $\\cos\\alpha=\\frac{1}{\\sqrt{2}}$, $45^\\circ$.', '$|\\vec{u}\\cdot\\vec{v}|=1$ y $|\\vec{u}|\\,|\\vec{v}|=\\sqrt{2}$: $\\cos\\alpha=\\frac{1}{\\sqrt{2}}$, $45^\\circ$.', '$|\\vec{u}\\cdot\\vec{v}|=1$ و$|\\vec{u}|\\,|\\vec{v}|=\\sqrt{2}$: ‏$\\cos\\alpha=\\frac{1}{\\sqrt{2}}$، أي $45^\\circ$.', '$|\\vec{u}\\cdot\\vec{v}|=1$ and $|\\vec{u}|\\,|\\vec{v}|=\\sqrt{2}$: $\\cos\\alpha=\\frac{1}{\\sqrt{2}}$, $45^\\circ$.')
        }
    },
    'angle-line-plane': {
        mistake: {
            wrong: say('$\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}=\\frac{1}{2}$: zuzenaren eta planoaren angelua $60^\\circ$ da', '$\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}=\\frac{1}{2}$: el ángulo de recta y plano es $60^\\circ$', '$\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}=\\frac{1}{2}$: زاوية المستقيم والمستوى $60^\\circ$', '$\\cos\\alpha=\\frac{|\\vec{u}\\cdot\\vec{n}|}{|\\vec{u}|\\,|\\vec{n}|}=\\frac{1}{2}$: the angle of the line and the plane is $60^\\circ$'),
            right: say('$60^\\circ$ hori normalarekiko angelua da. Planoarekiko angelua osagarria da: sinua erabiltzen da, $\\sin\\alpha=\\frac{1}{2}$, $30^\\circ$.', 'Esos $60^\\circ$ son el ángulo con el normal. Con el plano es el complementario: se usa el seno, $\\sin\\alpha=\\frac{1}{2}$, $30^\\circ$.', 'هذه $60^\\circ$ هي الزاوية مع الناظم. ومع المستوى هي المتممة: نستعمل الجيب، $\\sin\\alpha=\\frac{1}{2}$، أي $30^\\circ$.', 'Those $60^\\circ$ are the angle with the normal. With the plane it is the complement: use the sine, $\\sin\\alpha=\\frac{1}{2}$, $30^\\circ$.')
        },
        check: {
            prompt: say('$r$ zuzenaren norabidea $(2,1,0)$ da eta $\\pi$: ${z}=4$. Zer angelu osatzen dute?', '$r$ tiene dirección $(2,1,0)$ y $\\pi$: ${z}=4$. ¿Qué ángulo forman?', 'اتجاه $r$ هو $(2,1,0)$ و$\\pi$: ‏${z}=4$. ما الزاوية بينهما؟', '$r$ has direction $(2,1,0)$ and $\\pi$: ${z}=4$. What angle do they form?'),
            options: [same('$90^\\circ$'), same('$45^\\circ$'), same('$0^\\circ$')],
            correctIndex: 2,
            explanation: say('$\\vec{u}\\cdot\\vec{n}=0$: $\\sin\\alpha=0$, zuzena planoaren paraleloa da.', '$\\vec{u}\\cdot\\vec{n}=0$: $\\sin\\alpha=0$, la recta es paralela al plano.', '$\\vec{u}\\cdot\\vec{n}=0$: ‏$\\sin\\alpha=0$، المستقيم موازٍ للمستوى.', '$\\vec{u}\\cdot\\vec{n}=0$: $\\sin\\alpha=0$, the line is parallel to the plane.')
        }
    },
    'angle-planes': {
        mistake: {
            wrong: say('$\\vec{n}_1\\cdot\\vec{n}_2=-1$ eta moduluak $\\sqrt{2}$: $\\cos\\alpha=-\\frac{1}{2}$, planoek $120^\\circ$ osatzen dute', '$\\vec{n}_1\\cdot\\vec{n}_2=-1$ y módulos $\\sqrt{2}$: $\\cos\\alpha=-\\frac{1}{2}$, los planos forman $120^\\circ$', '$\\vec{n}_1\\cdot\\vec{n}_2=-1$ والطولان $\\sqrt{2}$: ‏$\\cos\\alpha=-\\frac{1}{2}$، يصنع المستويان $120^\\circ$', '$\\vec{n}_1\\cdot\\vec{n}_2=-1$ and magnitudes $\\sqrt{2}$: $\\cos\\alpha=-\\frac{1}{2}$, the planes form $120^\\circ$'),
            right: say('Bi planoren angelua ere $90^\\circ$ arte doa: balio absolutua, $60^\\circ$.', 'El ángulo de dos planos también llega solo a $90^\\circ$: valor absoluto, $60^\\circ$.', 'زاوية مستويين أيضًا لا تتجاوز $90^\\circ$: القيمة المطلقة، $60^\\circ$.', 'The angle of two planes also goes only up to $90^\\circ$: absolute value, $60^\\circ$.')
        },
        check: {
            prompt: say('Zer angelu osatzen dute $\\pi_1$: $x=0$ eta $\\pi_2$: $x+{z}=3$ planoek?', '¿Qué ángulo forman $\\pi_1$: $x=0$ y $\\pi_2$: $x+{z}=3$?', 'ما الزاوية بين $\\pi_1$: ‏$x=0$ و$\\pi_2$: ‏$x+{z}=3$؟', 'What angle do $\\pi_1$: $x=0$ and $\\pi_2$: $x+{z}=3$ form?'),
            options: [same('$45^\\circ$'), same('$135^\\circ$'), same('$30^\\circ$')],
            correctIndex: 0,
            explanation: say('Normalak $(1,0,0)$ eta $(1,0,1)$: $\\cos\\alpha=\\frac{1}{\\sqrt{2}}$, $45^\\circ$.', 'Normales $(1,0,0)$ y $(1,0,1)$: $\\cos\\alpha=\\frac{1}{\\sqrt{2}}$, $45^\\circ$.', 'الناظمان $(1,0,0)$ و$(1,0,1)$: ‏$\\cos\\alpha=\\frac{1}{\\sqrt{2}}$، أي $45^\\circ$.', 'Normals $(1,0,0)$ and $(1,0,1)$: $\\cos\\alpha=\\frac{1}{\\sqrt{2}}$, $45^\\circ$.')
        }
    },

    /* ---------- 2. Projections ---------- */
    'project-point-plane': {
        mistake: {
            wrong: say('$t=-1$ ateratzen da; beraz, oina $t\\,\\vec{n}=(-1,-1,-1)$ da', 'Sale $t=-1$, así que el pie es $t\\,\\vec{n}=(-1,-1,-1)$', 'نحصل على $t=-1$، فالمسقط $t\\,\\vec{n}=(-1,-1,-1)$', 'We get $t=-1$, so the foot is $t\\,\\vec{n}=(-1,-1,-1)$'),
            right: say('$t$ zenbakia zuzenean ordezkatzen da: $M=P+t\\,\\vec{n}$, $P$ ahaztu gabe.', 'El $t$ se sustituye en la recta: $M=P+t\\,\\vec{n}$, sin olvidar $P$.', 'تُعوَّض $t$ في المستقيم: $M=P+t\\,\\vec{n}$ دون نسيان $P$.', 'The $t$ goes back into the line: $M=P+t\\,\\vec{n}$, without forgetting $P$.')
        },
        check: {
            prompt: say('$P(0,0,5)$ puntuaren proiekzioa $\\pi$: ${z}=1$ planoan:', 'La proyección de $P(0,0,5)$ sobre $\\pi$: ${z}=1$ es:', 'مسقط $P(0,0,5)$ على $\\pi$: ‏${z}=1$ هو:', 'The projection of $P(0,0,5)$ on $\\pi$: ${z}=1$ is:'),
            options: [same('$(0,0,4)$'), same('$(0,0,-4)$'), same('$(0,0,1)$')],
            correctIndex: 2,
            explanation: say('Perpendikularra bertikala da: $(0,0,5-4)=(0,0,1)$.', 'La perpendicular es vertical: $(0,0,5-4)=(0,0,1)$.', 'العمودي رأسي: $(0,0,5-4)=(0,0,1)$.', 'The perpendicular is vertical: $(0,0,5-4)=(0,0,1)$.')
        }
    },
    'project-point-line': {
        mistake: {
            wrong: say('$r$ zuzenarekiko plano perpendikularra zuzeneko $A$ puntutik pasatzen da', 'El plano perpendicular a $r$ pasa por el punto $A$ de la recta', 'المستوى العمودي على $r$ يمر بالنقطة $A$ من المستقيم', 'The plane perpendicular to $r$ goes through the point $A$ of the line'),
            right: say('$P$ puntutik pasatzen da; zuzena ebakitzen duen tokian dago $M$ oina.', 'Pasa por $P$; donde corta a la recta está el pie $M$.', 'يمر بـ $P$؛ وحيث يقطع المستقيم يقع المسقط $M$.', 'It goes through $P$; where it meets the line is the foot $M$.')
        },
        check: {
            prompt: say('$P(1,1,5)$ puntuaren proiekzioa ${z}$ ardatzean:', 'La proyección de $P(1,1,5)$ sobre el eje ${z}$ es:', 'مسقط $P(1,1,5)$ على المحور ${z}$ هو:', 'The projection of $P(1,1,5)$ on the ${z}$ axis is:'),
            options: [same('$(0,0,5)$'), same('$(0,0,0)$'), same('$(1,1,0)$')],
            correctIndex: 0,
            explanation: say('${z}=5$ planoak ardatza $(0,0,5)$ puntuan ebakitzen du.', 'El plano ${z}=5$ corta al eje en $(0,0,5)$.', 'المستوى ${z}=5$ يقطع المحور في $(0,0,5)$.', 'The plane ${z}=5$ meets the axis at $(0,0,5)$.')
        }
    },
    'project-line-plane': {
        mistake: {
            wrong: say('Proiekzioak $r$ zuzenaren norabide bera du', 'La proyección tiene el mismo director que $r$', 'للمسقط اتجاه $r$ نفسه', 'The projection has the same direction as $r$'),
            right: say('Ez: bi puntu proiektatzen dira, eta haien artean norabide berria ateratzen da.', 'No: se proyectan dos puntos y entre ellos sale el director nuevo.', 'لا: نُسقط نقطتين ومنهما يخرج الاتجاه الجديد.', 'No: two points are projected and the new direction comes from them.')
        },
        check: {
            prompt: say('$r$ zuzena $\\pi$ planoarekiko perpendikularra bada, haren proiekzioa $\\pi$ planoan hau da:', 'Si $r$ es perpendicular a $\\pi$, su proyección sobre $\\pi$ es:', 'إذا كان $r$ عموديًا على $\\pi$ فإن مسقطه على $\\pi$ هو:', 'If $r$ is perpendicular to $\\pi$, its projection on $\\pi$ is:'),
            options: [say('zuzen bat', 'una recta', 'مستقيم', 'a line'), say('puntu bat', 'un punto', 'نقطة', 'a point'), say('plano osoa', 'todo el plano', 'المستوى كله', 'the whole plane')],
            correctIndex: 1,
            explanation: say('Zuzeneko puntu guztiek oin bera dute: zuzenak planoa ebakitzen duen puntua.', 'Todos sus puntos tienen el mismo pie: el punto donde la recta corta al plano.', 'لكل نقاطه المسقط نفسه: النقطة التي يقطع فيها المستقيم المستوى.', 'All its points have the same foot: the point where the line meets the plane.')
        }
    },

    /* ---------- 3. Symmetric points ---------- */
    'symmetric-plane': {
        mistake: {
            wrong: say('$P$ puntuaren simetrikoa $M$ oina da', 'El simétrico de $P$ es el pie $M$', 'نظيرة $P$ هي المسقط $M$', 'The symmetric of $P$ is the foot $M$'),
            right: say('$M$ erdian geratzen da: $P\'=2M-P$.', '$M$ queda en el medio: $P\'=2M-P$.', '$M$ في المنتصف: $P\'=2M-P$.', '$M$ is in the middle: $P\'=2M-P$.')
        },
        check: {
            prompt: say('$P(2,5,3)$ puntuaren simetrikoa $\\pi$: $y=1$ planoarekiko:', 'El simétrico de $P(2,5,3)$ respecto de $\\pi$: $y=1$ es:', 'نظيرة $P(2,5,3)$ بالنسبة إلى $\\pi$: ‏$y=1$ هي:', 'The symmetric of $P(2,5,3)$ with respect to $\\pi$: $y=1$ is:'),
            options: [same('$(2,1,3)$'), same('$(2,-3,3)$'), same('$(2,-5,3)$')],
            correctIndex: 1,
            explanation: same('$M=(2,1,3)\\qquad P\'=(4-2,2-5,6-3)=(2,-3,3)$')
        }
    },
    'symmetric-line': {
        mistake: {
            wrong: say('$M$ oina aurkitu ondoren, $P\'=M-P$', 'Con el pie $M$ hallado, $P\'=M-P$', 'بعد إيجاد المسقط $M$، ‏$P\'=M-P$', 'With the foot $M$ found, $P\'=M-P$'),
            right: say('$M$ zuzenkiaren erdiko puntua da: $P\'=2M-P$.', '$M$ es el punto medio del segmento: $P\'=2M-P$.', '$M$ منتصف القطعة: $P\'=2M-P$.', '$M$ is the midpoint of the segment: $P\'=2M-P$.')
        },
        check: {
            prompt: say('$P(1,2,3)$ puntuaren simetrikoa ${z}$ ardatzarekiko:', 'El simétrico de $P(1,2,3)$ respecto del eje ${z}$ es:', 'نظيرة $P(1,2,3)$ بالنسبة إلى المحور ${z}$ هي:', 'The symmetric of $P(1,2,3)$ with respect to the ${z}$ axis is:'),
            options: [same('$(-1,-2,3)$'), same('$(1,2,-3)$'), same('$(-1,-2,0)$')],
            correctIndex: 0,
            explanation: same('$M=(0,0,3)\\qquad P\'=(0-1,0-2,6-3)=(-1,-2,3)$')
        }
    },
    'mediator-plane': {
        mistake: {
            wrong: say('Plano erdikaria $A$ puntutik pasatzen da, $\\overrightarrow{AB}$ normalarekin', 'El plano mediador pasa por $A$, con normal $\\overrightarrow{AB}$', 'المستوى المنصِّف يمر بـ $A$ وناظمه $\\overrightarrow{AB}$', 'The mediator plane goes through $A$, with normal $\\overrightarrow{AB}$'),
            right: say('$A$ eta $B$ puntuetatik distantzia berera dago: erdiko puntutik pasatzen da.', 'Está a la misma distancia de $A$ y de $B$: pasa por el punto medio.', 'يبعد البعد نفسه عن $A$ و$B$: يمر بالمنتصف.', 'It is the same distance from $A$ and $B$: it goes through the midpoint.')
        },
        check: {
            prompt: say('$A(1,0,0)$ eta $B(-1,0,0)$ puntuen plano erdikaria:', 'El plano mediador de $A(1,0,0)$ y $B(-1,0,0)$ es:', 'المستوى المنصِّف لـ $A(1,0,0)$ و$B(-1,0,0)$ هو:', 'The mediator plane of $A(1,0,0)$ and $B(-1,0,0)$ is:'),
            options: [say('$x=1$ planoa', 'el plano $x=1$', 'المستوى $x=1$', 'the plane $x=1$'), say('$y=0$ planoa', 'el plano $y=0$', 'المستوى $y=0$', 'the plane $y=0$'), say('$x=0$ planoa', 'el plano $x=0$', 'المستوى $x=0$', 'the plane $x=0$')],
            correctIndex: 2,
            explanation: say('Erdiko puntua jatorria da eta normala $(-2,0,0)$: $x=0$.', 'El punto medio es el origen y el normal $(-2,0,0)$: $x=0$.', 'المنتصف هو الأصل والناظم $(-2,0,0)$: ‏$x=0$.', 'The midpoint is the origin and the normal $(-2,0,0)$: $x=0$.')
        }
    },

    /* ---------- 4. Distance from a point ---------- */
    'point-plane': {
        mistake: {
            wrong: say('$d(P,\\pi)$ distantzia ekuazioan ordezkatzean ateratzen den zenbakia da, $|\\vec{n}|$ zenbakiaz zatitu gabe', 'La $d(P,\\pi)$ es el número que sale al sustituir en la ecuación, sin dividir entre $|\\vec{n}|$', 'المسافة $d(P,\\pi)$ هي العدد الناتج من التعويض في المعادلة دون القسمة على $|\\vec{n}|$', 'The $d(P,\\pi)$ is the number you get by substituting into the equation, without dividing by $|\\vec{n}|$'),
            right: say('Normalaren moduluaz zatitu behar da, eta balio absolutua hartu.', 'Hay que dividir entre el módulo del normal y tomar el valor absoluto.', 'يجب القسمة على طول الناظم وأخذ القيمة المطلقة.', 'You have to divide by the magnitude of the normal and take the absolute value.')
        },
        check: {
            prompt: say('Zein da jatorritik $\\pi$: $x+2y+2{z}=6$ planorako distantzia?', '¿Cuál es la distancia del origen a $\\pi$: $x+2y+2{z}=6$?', 'ما المسافة من الأصل إلى $\\pi$: ‏$x+2y+2{z}=6$؟', 'What is the distance from the origin to $\\pi$: $x+2y+2{z}=6$?'),
            options: [same('$6$'), same('$2$'), same('$\\frac{6}{5}$')],
            correctIndex: 1,
            explanation: same('$\\frac{|0+0+0-6|}{\\sqrt{1+4+4}}=\\frac{6}{3}=2$')
        }
    },
    'parallel-planes': {
        mistake: {
            wrong: say('$x+y=2$ eta $2x+2y=10$ planoen arteko distantzia $\\frac{|10-2|}{\\sqrt{2}}$ da', 'La distancia entre $x+y=2$ y $2x+2y=10$ es $\\frac{|10-2|}{\\sqrt{2}}$', 'المسافة بين $x+y=2$ و$2x+2y=10$ هي $\\frac{|10-2|}{\\sqrt{2}}$', 'The distance between $x+y=2$ and $2x+2y=10$ is $\\frac{|10-2|}{\\sqrt{2}}$'),
            right: say('Lehenik normal bera: $2x+2y=10$ planoa $x+y=5$ da. Orduan $\\frac{|5-2|}{\\sqrt{2}}$.', 'Primero el mismo normal: $2x+2y=10$ es $x+y=5$. Entonces $\\frac{|5-2|}{\\sqrt{2}}$.', 'أولًا الناظم نفسه: $2x+2y=10$ هو $x+y=5$. ثم $\\frac{|5-2|}{\\sqrt{2}}$.', 'First the same normal: $2x+2y=10$ is $x+y=5$. Then $\\frac{|5-2|}{\\sqrt{2}}$.')
        },
        check: {
            prompt: say('Zein da $\\pi_1$: ${z}=1$ eta $\\pi_2$: ${z}=-3$ planoen arteko distantzia?', '¿Cuál es la distancia entre $\\pi_1$: ${z}=1$ y $\\pi_2$: ${z}=-3$?', 'ما المسافة بين $\\pi_1$: ‏${z}=1$ و$\\pi_2$: ‏${z}=-3$؟', 'What is the distance between $\\pi_1$: ${z}=1$ and $\\pi_2$: ${z}=-3$?'),
            options: [same('$2$'), same('$3$'), same('$4$')],
            correctIndex: 2,
            explanation: same('$|1-(-3)|=4$')
        }
    },
    'point-line': {
        mistake: {
            wrong: say('$d(P,r)=|\\overrightarrow{AP}|$: zuzeneko $A$ puntutik $P$ punturako distantzia', '$d(P,r)=|\\overrightarrow{AP}|$: la distancia de $P$ al punto $A$ de la recta', '$d(P,r)=|\\overrightarrow{AP}|$: المسافة من $P$ إلى النقطة $A$ من المستقيم', '$d(P,r)=|\\overrightarrow{AP}|$: the distance from $P$ to the point $A$ of the line'),
            right: say('$A$ ez da hurbilena: $d(P,r)=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$, paralelogramoaren altuera.', '$A$ no es el más cercano: $d(P,r)=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$, la altura del paralelogramo.', '$A$ ليست الأقرب: $d(P,r)=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$، ارتفاع متوازي الأضلاع.', '$A$ is not the closest point: $d(P,r)=\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$, the height of the parallelogram.')
        },
        check: {
            prompt: say('Zein da $P(0,6,8)$ puntutik $x$ ardatzerako distantzia?', '¿Cuál es la distancia de $P(0,6,8)$ al eje $x$?', 'ما المسافة من $P(0,6,8)$ إلى المحور $x$؟', 'What is the distance from $P(0,6,8)$ to the $x$ axis?'),
            options: [same('$10$'), same('$14$'), same('$8$')],
            correctIndex: 0,
            explanation: same('$\\sqrt{36+64}=\\sqrt{100}=10$')
        }
    },

    /* ---------- 5. Distance between lines ---------- */
    'parallel-lines': {
        mistake: {
            wrong: say('Bi zuzen paraleloren distantzia haien $A$ eta $B$ puntuen arteko distantzia da', 'La distancia entre dos rectas paralelas es la de sus puntos $A$ y $B$', 'المسافة بين مستقيمين متوازيين هي المسافة بين نقطتيهما $A$ و$B$', 'The distance between two parallel lines is the distance between their points $A$ and $B$'),
            right: say('$B$ puntutik $r$ zuzenerako distantzia da: $\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}$.', 'Es la distancia de $B$ a la recta $r$: $\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}$.', 'هي المسافة من $B$ إلى المستقيم $r$: $\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}$.', 'It is the distance from $B$ to the line $r$: $\\frac{|\\overrightarrow{AB}\\times\\vec{u}|}{|\\vec{u}|}$.')
        },
        check: {
            prompt: say('$r$ zuzena $x$ ardatza da, eta $s$ zuzena $(0,0,7)$ puntutik pasatzen da $(1,0,0)$ norabidearekin. Zein da haien distantzia?', '$r$ es el eje $x$ y $s$ pasa por $(0,0,7)$ con dirección $(1,0,0)$. ¿Cuál es su distancia?', '$r$ هو المحور $x$، و$s$ يمر بـ $(0,0,7)$ باتجاه $(1,0,0)$. ما المسافة بينهما؟', '$r$ is the $x$ axis and $s$ goes through $(0,0,7)$ with direction $(1,0,0)$. What is their distance?'),
            options: [same('$0$'), same('$7$'), same('$1$')],
            correctIndex: 1,
            explanation: say('$s$ zuzena $x$ ardatzaren paraleloa da, 7 altueran.', '$s$ es paralela al eje $x$, a altura 7.', '$s$ موازٍ للمحور $x$ على ارتفاع 7.', '$s$ is parallel to the $x$ axis, at height 7.')
        }
    },
    'skew-distance': {
        mistake: {
            wrong: say('$d(r,s)=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}|\\,|\\vec{v}|}$', '$d(r,s)=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}|\\,|\\vec{v}|}$', '$d(r,s)=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}|\\,|\\vec{v}|}$', '$d(r,s)=\\frac{|[\\overrightarrow{AB},\\vec{u},\\vec{v}]|}{|\\vec{u}|\\,|\\vec{v}|}$'),
            right: say('Oinarriaren azalera $|\\vec{u}\\times\\vec{v}|$ da, ez $|\\vec{u}|\\,|\\vec{v}|$: bolumena zati azalera.', 'El área de la base es $|\\vec{u}\\times\\vec{v}|$, no $|\\vec{u}|\\,|\\vec{v}|$: volumen entre área.', 'مساحة القاعدة $|\\vec{u}\\times\\vec{v}|$ لا $|\\vec{u}|\\,|\\vec{v}|$: الحجم على المساحة.', 'The area of the base is $|\\vec{u}\\times\\vec{v}|$, not $|\\vec{u}|\\,|\\vec{v}|$: volume divided by area.')
        },
        check: {
            prompt: say('$r$ zuzena $x$ ardatza da, eta $s$ zuzena $(0,0,5)$ puntutik pasatzen da $(0,1,0)$ norabidearekin. Zein da haien distantzia?', '$r$ es el eje $x$ y $s$ pasa por $(0,0,5)$ con dirección $(0,1,0)$. ¿Cuál es su distancia?', '$r$ هو المحور $x$، و$s$ يمر بـ $(0,0,5)$ باتجاه $(0,1,0)$. ما المسافة بينهما؟', '$r$ is the $x$ axis and $s$ goes through $(0,0,5)$ with direction $(0,1,0)$. What is their distance?'),
            options: [same('$0$'), same('$25$'), same('$5$')],
            correctIndex: 2,
            explanation: same('$\\frac{|[(0,0,5),(1,0,0),(0,1,0)]|}{|(0,0,1)|}=\\frac{5}{1}=5$')
        }
    },
    'common-perpendicular': {
        mistake: {
            wrong: say('$P$ eta $Q$ aurkitzeko, nahikoa da $\\overrightarrow{PQ}\\cdot\\vec{u}=0$', 'Para hallar $P$ y $Q$ basta con $\\overrightarrow{PQ}\\cdot\\vec{u}=0$', 'لإيجاد $P$ و$Q$ يكفي $\\overrightarrow{PQ}\\cdot\\vec{u}=0$', 'To find $P$ and $Q$, $\\overrightarrow{PQ}\\cdot\\vec{u}=0$ is enough'),
            right: say('Bi ekuazio behar dira: $\\overrightarrow{PQ}\\cdot\\vec{u}=0$ eta $\\overrightarrow{PQ}\\cdot\\vec{v}=0$.', 'Hacen falta dos ecuaciones: $\\overrightarrow{PQ}\\cdot\\vec{u}=0$ y $\\overrightarrow{PQ}\\cdot\\vec{v}=0$.', 'نحتاج إلى معادلتين: $\\overrightarrow{PQ}\\cdot\\vec{u}=0$ و$\\overrightarrow{PQ}\\cdot\\vec{v}=0$.', 'Two equations are needed: $\\overrightarrow{PQ}\\cdot\\vec{u}=0$ and $\\overrightarrow{PQ}\\cdot\\vec{v}=0$.')
        },
        check: {
            prompt: say('Gurutzatzen diren $r$ eta $s$ zuzenen perpendikular komuna:', 'La perpendicular común de dos rectas $r$ y $s$ que se cruzan es:', 'العمودي المشترك لمستقيمين متخالفين $r$ و$s$ هو:', 'The common perpendicular of two skew lines $r$ and $s$ is:'),
            options: [say('$r$ zuzenarekiko bakarrik perpendikularra', 'perpendicular solo a $r$', 'عمودي على $r$ فقط', 'perpendicular to $r$ only'), say('biekiko perpendikularra eta biak ebakitzen ditu', 'perpendicular a las dos y las corta a las dos', 'عمودي على الاثنين ويقطعهما', 'perpendicular to both and meeting both'), say('bien paraleloa', 'paralela a las dos', 'موازٍ للاثنين', 'parallel to both')],
            correctIndex: 1,
            explanation: say('Haren norabidea $\\vec{u}\\times\\vec{v}$ da, eta $P$ eta $Q$ puntuetan ebakitzen ditu.', 'Su dirección es $\\vec{u}\\times\\vec{v}$, y las corta en $P$ y $Q$.', 'اتجاهه $\\vec{u}\\times\\vec{v}$ ويقطعهما في $P$ و$Q$.', 'Its direction is $\\vec{u}\\times\\vec{v}$, and it meets them at $P$ and $Q$.')
        }
    }
}

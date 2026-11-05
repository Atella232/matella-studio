import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Geometria analitikoa · Batxilergoa 1 · Zientziak — the typical mistake
   and the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical
   mistake. A question about a line always names it with a second formula,
   so the test does not read the options as solutions of its equation.
   ========================================================================== */

export type BachGeometryTopicId =
    | 'midpoint-symmetric' | 'collinear' | 'divide-segment'
    | 'vector-parametric' | 'general-normal' | 'explicit-slope' | 'pencil'
    | 'parallel-perpendicular' | 'relative-position' | 'line-angle'
    | 'point-line' | 'parallel-lines' | 'reflection'
    | 'triangle-points' | 'triangle-area'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachGeometryLessonChecks: Record<BachGeometryTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Points ---------- */
    'midpoint-symmetric': {
        mistake: {
            wrong: say('$A(2,6)$ eta $B(8,0)$: $M=(8-2,0-6)=(6,-6)$', '$A(2,6)$ y $B(8,0)$: $M=(8-2,0-6)=(6,-6)$', '$A(2,6)$ و$B(8,0)$: $M=(8-2,0-6)=(6,-6)$', '$A(2,6)$ and $B(8,0)$: $M=(8-2,0-6)=(6,-6)$'),
            right: say('Hori $\\overrightarrow{AB}$ da. Erdiko puntua muturren batez bestekoa da: $M=\\left(\\frac{2+8}{2},\\frac{6+0}{2}\\right)=(5,3)$.', 'Eso es $\\overrightarrow{AB}$. El punto medio es la media de los extremos: $M=\\left(\\frac{2+8}{2},\\frac{6+0}{2}\\right)=(5,3)$.', 'هذا $\\overrightarrow{AB}$. المنتصف متوسط الطرفين: $M=\\left(\\frac{2+8}{2},\\frac{6+0}{2}\\right)=(5,3)$.', 'That is $\\overrightarrow{AB}$. The midpoint is the mean of the end points: $M=\\left(\\frac{2+8}{2},\\frac{6+0}{2}\\right)=(5,3)$.')
        },
        check: {
            prompt: say('Zein da $A(-1,7)$ eta $B(5,1)$ puntuen erdiko puntua?', '¿Cuál es el punto medio de $A(-1,7)$ y $B(5,1)$?', 'ما منتصف $A(-1,7)$ و$B(5,1)$؟', 'What is the midpoint of $A(-1,7)$ and $B(5,1)$?'),
            options: [same('$(3,-3)$'), same('$(2,4)$'), same('$(6,-6)$')],
            correctIndex: 1,
            explanation: same('$\\left(\\frac{-1+5}{2},\\frac{7+1}{2}\\right)=(2,4)$')
        }
    },
    collinear: {
        mistake: {
            wrong: say('$\\overrightarrow{AB}=(1,4)$ eta $\\overrightarrow{AC}=(4,1)$: lerrokatuta daude', '$\\overrightarrow{AB}=(1,4)$ y $\\overrightarrow{AC}=(4,1)$: están alineados', '$\\overrightarrow{AB}=(1,4)$ و$\\overrightarrow{AC}=(4,1)$: على استقامة واحدة', '$\\overrightarrow{AB}=(1,4)$ and $\\overrightarrow{AC}=(4,1)$: they are collinear'),
            right: say('Proportzionalak izan behar dute ordena berean: $\\frac{4}{1}\\neq\\frac{1}{4}$. Ez daude lerrokatuta.', 'Tienen que ser proporcionales en el mismo orden: $\\frac{4}{1}\\neq\\frac{1}{4}$. No están alineados.', 'يجب أن يتناسبا بالترتيب نفسه: $\\frac{4}{1}\\neq\\frac{1}{4}$. ليست على استقامة واحدة.', 'They have to be proportional in the same order: $\\frac{4}{1}\\neq\\frac{1}{4}$. They are not collinear.')
        },
        check: {
            prompt: say('Zein puntu dago $A(0,0)$ eta $B(2,3)$ puntuekin lerrokatuta?', '¿Qué punto está alineado con $A(0,0)$ y $B(2,3)$?', 'أي نقطة على استقامة واحدة مع $A(0,0)$ و$B(2,3)$؟', 'Which point is collinear with $A(0,0)$ and $B(2,3)$?'),
            options: [same('$(3,2)$'), same('$(4,5)$'), same('$(6,9)$')],
            correctIndex: 2,
            explanation: same('$(6,9)=3\\cdot(2,3)$')
        }
    },
    'divide-segment': {
        mistake: {
            wrong: say('$A(3,0)$ eta $B(9,6)$: $A$-tik heren batera $\\left(\\frac{3+9}{3},\\frac{0+6}{3}\\right)=(4,2)$ dago', '$A(3,0)$ y $B(9,6)$: a un tercio de $A$ está $\\left(\\frac{3+9}{3},\\frac{0+6}{3}\\right)=(4,2)$', '$A(3,0)$ و$B(9,6)$: على ثلث المسافة من $A$ توجد $\\left(\\frac{3+9}{3},\\frac{0+6}{3}\\right)=(4,2)$', '$A(3,0)$ and $B(9,6)$: a third of the way from $A$ is $\\left(\\frac{3+9}{3},\\frac{0+6}{3}\\right)=(4,2)$'),
            right: say('Bektorearen heren bat batzen zaio $A$ puntuari: $(3,0)+\\frac{1}{3}(6,6)=(5,2)$.', 'Se suma a $A$ un tercio del vector: $(3,0)+\\frac{1}{3}(6,6)=(5,2)$.', 'نضيف إلى $A$ ثلث المتجه: $(3,0)+\\frac{1}{3}(6,6)=(5,2)$.', 'You add a third of the vector to $A$: $(3,0)+\\frac{1}{3}(6,6)=(5,2)$.')
        },
        check: {
            prompt: say('Zein puntu dago $A(0,6)$ puntutik $B(9,0)$ punturako bidearen bi herenetan?', '¿Qué punto está a dos tercios del camino de $A(0,6)$ a $B(9,0)$?', 'ما النقطة الواقعة على ثلثي الطريق من $A(0,6)$ إلى $B(9,0)$؟', 'Which point is two thirds of the way from $A(0,6)$ to $B(9,0)$?'),
            options: [same('$(6,2)$'), same('$(3,4)$'), same('$(6,4)$')],
            correctIndex: 0,
            explanation: same('$(0,6)+\\frac{2}{3}(9,-6)=(6,2)$')
        }
    },

    /* ---------- 2. The equations of a line ---------- */
    'vector-parametric': {
        mistake: {
            wrong: say('$A(1,2)$ eta $B(4,6)$ puntuetatik: $(x,y)=(1,2)+t(4,6)$', 'Por $A(1,2)$ y $B(4,6)$: $(x,y)=(1,2)+t(4,6)$', 'عبر $A(1,2)$ و$B(4,6)$: $(x,y)=(1,2)+t(4,6)$', 'Through $A(1,2)$ and $B(4,6)$: $(x,y)=(1,2)+t(4,6)$'),
            right: say('Norabide-bektorea $\\overrightarrow{AB}=(3,4)$ da, ez $B$ puntuaren koordenatuak: $(x,y)=(1,2)+t(3,4)$.', 'El vector director es $\\overrightarrow{AB}=(3,4)$, no las coordenadas de $B$: $(x,y)=(1,2)+t(3,4)$.', 'متجه التوجيه هو $\\overrightarrow{AB}=(3,4)$ لا إحداثيا $B$: $(x,y)=(1,2)+t(3,4)$.', 'The direction vector is $\\overrightarrow{AB}=(3,4)$, not the coordinates of $B$: $(x,y)=(1,2)+t(3,4)$.')
        },
        check: {
            prompt: say('Zein puntu da $x=1+2t$, $y=3-t$ zuzenekoa?', '¿Qué punto es de la recta $x=1+2t$, $y=3-t$?', 'أي نقطة على المستقيم $x=1+2t$، $y=3-t$؟', 'Which point is on the line $x=1+2t$, $y=3-t$?'),
            options: [same('$(5,-1)$'), same('$(3,4)$'), same('$(5,1)$')],
            correctIndex: 2,
            explanation: say('$t=2$ denean: $x=5$ eta $y=1$.', 'Con $t=2$: $x=5$ e $y=1$.', 'مع $t=2$: $x=5$ و$y=1$.', 'With $t=2$: $x=5$ and $y=1$.')
        }
    },
    'general-normal': {
        mistake: {
            wrong: say('$3x+4y-1=0$ zuzenaren norabide-bektorea $(3,4)$ da', 'La recta $3x+4y-1=0$ tiene vector director $(3,4)$', 'متجه توجيه المستقيم $3x+4y-1=0$ هو $(3,4)$', 'The line $3x+4y-1=0$ has direction vector $(3,4)$'),
            right: say('$(3,4)$ bektore normala da, zuzenarekiko perpendikularra. Norabide-bektore bat $(-4,3)$ da.', '$(3,4)$ es el vector normal, perpendicular a la recta. Un director es $(-4,3)$.', '$(3,4)$ هو المتجه الناظمي العمودي على المستقيم. ومتجه توجيه هو $(-4,3)$.', '$(3,4)$ is the normal vector, perpendicular to the line. A direction vector is $(-4,3)$.')
        },
        check: {
            prompt: say('Zein da $r$: $x-2y+5=0$ zuzenaren norabide-bektore bat?', '¿Cuál es un vector director de $r$: $x-2y+5=0$?', 'ما متجه توجيه للمستقيم $r$: $x-2y+5=0$؟', 'Which is a direction vector of $r$: $x-2y+5=0$?'),
            options: [same('$(1,-2)$'), same('$(2,1)$'), same('$(1,2)$')],
            correctIndex: 1,
            explanation: say('$\\vec{n}=(1,-2)$ eta $(1,-2)\\cdot(2,1)=0$.', '$\\vec{n}=(1,-2)$ y $(1,-2)\\cdot(2,1)=0$.', '$\\vec{n}=(1,-2)$ و$(1,-2)\\cdot(2,1)=0$.', '$\\vec{n}=(1,-2)$ and $(1,-2)\\cdot(2,1)=0$.')
        }
    },
    'explicit-slope': {
        mistake: {
            wrong: say('$2x+y-4=0$: malda 2 da', '$2x+y-4=0$: la pendiente es 2', '$2x+y-4=0$: الميل 2', '$2x+y-4=0$: the slope is 2'),
            right: say('$y$ askatu behar da: $y=-2x+4$; beraz, $m=-2$.', 'Hay que despejar $y$: $y=-2x+4$, así que $m=-2$.', 'يجب عزل $y$: $y=-2x+4$، إذن $m=-2$.', 'You have to solve for $y$: $y=-2x+4$, so $m=-2$.')
        },
        check: {
            prompt: say('Zer angelu osatzen du $y=-x+5$ zuzenak $X$ ardatzarekin?', '¿Qué ángulo forma la recta $y=-x+5$ con el eje $X$?', 'ما الزاوية التي يصنعها المستقيم $y=-x+5$ مع المحور $X$؟', 'What angle does the line $y=-x+5$ make with the $X$ axis?'),
            options: [same('$45^\\circ$'), same('$-45^\\circ$'), same('$135^\\circ$')],
            correctIndex: 2,
            explanation: say('$\\tan\\alpha=-1$, eta angelua $0^\\circ$ eta $180^\\circ$ artekoa da: $\\alpha=135^\\circ$.', '$\\tan\\alpha=-1$ y el ángulo va de $0^\\circ$ a $180^\\circ$: $\\alpha=135^\\circ$.', '$\\tan\\alpha=-1$ والزاوية بين $0^\\circ$ و$180^\\circ$: $\\alpha=135^\\circ$.', '$\\tan\\alpha=-1$ and the angle goes from $0^\\circ$ to $180^\\circ$: $\\alpha=135^\\circ$.')
        }
    },
    pencil: {
        mistake: {
            wrong: say('$(1,3)$ zentroko zuzen-sorta: $y-1=m(x-3)$', 'Haz de centro $(1,3)$: $y-1=m(x-3)$', 'حزمة مركزها $(1,3)$: $y-1=m(x-3)$', 'Pencil with centre $(1,3)$: $y-1=m(x-3)$'),
            right: say('Koordenatu bakoitza bere lekuan: $y-3=m(x-1)$.', 'Cada coordenada en su sitio: $y-3=m(x-1)$.', 'كل إحداثي في مكانه: $y-3=m(x-1)$.', 'Each coordinate in its place: $y-3=m(x-1)$.')
        },
        check: {
            prompt: say('Zein zuzen dago $(0,4)$ zentroko zuzen-sortan?', '¿Qué recta es del haz de centro $(0,4)$?', 'أي مستقيم من الحزمة التي مركزها $(0,4)$؟', 'Which line belongs to the pencil with centre $(0,4)$?'),
            options: [same('$y=4x+2$'), same('$y=-3x+4$'), same('$y=x-4$')],
            correctIndex: 1,
            explanation: say('$(0,4)$ puntutik pasatzen da: $-3\\cdot 0+4=4$.', 'Pasa por $(0,4)$: $-3\\cdot 0+4=4$.', 'يمر بـ $(0,4)$: $-3\\cdot 0+4=4$.', 'It passes through $(0,4)$: $-3\\cdot 0+4=4$.')
        }
    },

    /* ---------- 3. Positions and angles ---------- */
    'parallel-perpendicular': {
        mistake: {
            wrong: say('$4x+y=0$ zuzenaren perpendikularra: $4x-y+C=0$', 'Perpendicular a $4x+y=0$: $4x-y+C=0$', 'العمودي على $4x+y=0$: $4x-y+C=0$', 'Perpendicular to $4x+y=0$: $4x-y+C=0$'),
            right: say('$A$ eta $B$ trukatu, eta zeinu bat aldatu: $x-4y+C=0$.', 'Hay que intercambiar $A$ y $B$ y cambiar un signo: $x-4y+C=0$.', 'يجب تبديل $A$ و$B$ وتغيير إشارة: $x-4y+C=0$.', 'You have to swap $A$ and $B$ and change a sign: $x-4y+C=0$.')
        },
        check: {
            prompt: say('Zein zuzen da $2x+3y-1=0$ zuzenaren perpendikularra eta $(1,1)$ puntutik pasatzen da?', '¿Qué recta es perpendicular a $2x+3y-1=0$ y pasa por $(1,1)$?', 'أي مستقيم عمودي على $2x+3y-1=0$ ويمر بـ $(1,1)$؟', 'Which line is perpendicular to $2x+3y-1=0$ and passes through $(1,1)$?'),
            options: [same('$2x+3y-5=0$'), same('$3x+2y-5=0$'), same('$3x-2y-1=0$')],
            correctIndex: 2,
            explanation: say('$(2,3)\\cdot(3,-2)=0$, eta $3\\cdot 1-2\\cdot 1-1=0$.', '$(2,3)\\cdot(3,-2)=0$ y $3\\cdot 1-2\\cdot 1-1=0$.', '$(2,3)\\cdot(3,-2)=0$ و$3\\cdot 1-2\\cdot 1-1=0$.', '$(2,3)\\cdot(3,-2)=0$ and $3\\cdot 1-2\\cdot 1-1=0$.')
        }
    },
    'relative-position': {
        mistake: {
            wrong: say('$x+2y-1=0$ eta $2x+4y-2=0$: paraleloak dira', '$x+2y-1=0$ y $2x+4y-2=0$: son paralelas', '$x+2y-1=0$ و$2x+4y-2=0$: متوازيان', '$x+2y-1=0$ and $2x+4y-2=0$: they are parallel'),
            right: say('$\\frac{-1}{-2}$ ere $\\frac{1}{2}$ da: hiru arrazoiak berdinak dira, zuzen bera da.', 'También $\\frac{-1}{-2}$ vale $\\frac{1}{2}$: las tres razones son iguales, es la misma recta.', '$\\frac{-1}{-2}$ أيضًا يساوي $\\frac{1}{2}$: النسب الثلاث متساوية، إنه المستقيم نفسه.', '$\\frac{-1}{-2}$ is also $\\frac{1}{2}$: the three ratios are equal, it is the same line.')
        },
        check: {
            prompt: say('Nolakoak dira $3x-y+1=0$ eta $6x-2y+5=0$?', '¿Cómo son $3x-y+1=0$ y $6x-2y+5=0$?', 'كيف هما $3x-y+1=0$ و$6x-2y+5=0$؟', 'How are $3x-y+1=0$ and $6x-2y+5=0$?'),
            options: [say('Ebakitzaileak', 'Secantes', 'متقاطعان', 'Intersecting'), say('Paraleloak', 'Paralelas', 'متوازيان', 'Parallel'), say('Bat datozenak', 'Coincidentes', 'منطبقان', 'Coincident')],
            correctIndex: 1,
            explanation: same('$\\frac{3}{6}=\\frac{-1}{-2}\\neq\\frac{1}{5}$')
        }
    },
    'line-angle': {
        mistake: {
            wrong: say('$\\cos\\alpha=-\\frac{\\sqrt{2}}{2}$; beraz, zuzenek $135^\\circ$ osatzen dute', '$\\cos\\alpha=-\\frac{\\sqrt{2}}{2}$, así que las rectas forman $135^\\circ$', '$\\cos\\alpha=-\\frac{\\sqrt{2}}{2}$، إذن يصنع المستقيمان $135^\\circ$', '$\\cos\\alpha=-\\frac{\\sqrt{2}}{2}$, so the lines make $135^\\circ$'),
            right: say('Bi zuzenen angelua zorrotza da: balio absolutuarekin, $\\cos\\alpha=\\frac{\\sqrt{2}}{2}$ eta $\\alpha=45^\\circ$.', 'El ángulo de dos rectas es el agudo: con valor absoluto, $\\cos\\alpha=\\frac{\\sqrt{2}}{2}$ y $\\alpha=45^\\circ$.', 'زاوية مستقيمين هي الحادة: بالقيمة المطلقة $\\cos\\alpha=\\frac{\\sqrt{2}}{2}$ و$\\alpha=45^\\circ$.', 'The angle of two lines is the acute one: with the absolute value, $\\cos\\alpha=\\frac{\\sqrt{2}}{2}$ and $\\alpha=45^\\circ$.')
        },
        check: {
            prompt: say('Zer angelu osatzen dute $y=x$ eta $y=-x$ zuzenek?', '¿Qué ángulo forman la recta $y=x$ y la recta $y=-x$?', 'ما الزاوية بين المستقيمين $y=x$ و$y=-x$؟', 'What angle do the lines $y=x$ and $y=-x$ make?'),
            options: [same('$45^\\circ$'), same('$90^\\circ$'), same('$180^\\circ$')],
            correctIndex: 1,
            explanation: say('Normalak $(1,-1)$ eta $(1,1)$ dira, eta haien biderkadura eskalarra 0 da.', 'Los normales son $(1,-1)$ y $(1,1)$, y su producto escalar es 0.', 'الناظميان $(1,-1)$ و$(1,1)$ وجداؤهما السلمي 0.', 'The normals are $(1,-1)$ and $(1,1)$, and their dot product is 0.')
        }
    },

    /* ---------- 4. Distances ---------- */
    'point-line': {
        mistake: {
            wrong: say('$P(1,2)$ eta $r$: $y=2x+3$; $d=|2\\cdot 1+3-2|=3$', '$P(1,2)$ y $r$: $y=2x+3$; $d=|2\\cdot 1+3-2|=3$', '$P(1,2)$ و$r$: $y=2x+3$؛ $d=|2\\cdot 1+3-2|=3$', '$P(1,2)$ and $r$: $y=2x+3$; $d=|2\\cdot 1+3-2|=3$'),
            right: say('Lehenik forma orokorra, $2x-y+3=0$, eta gero normalaren moduluaz zatitu: $d=\\frac{|2-2+3|}{\\sqrt{5}}=\\frac{3}{\\sqrt{5}}$.', 'Primero la forma general, $2x-y+3=0$, y después se divide entre el módulo del normal: $d=\\frac{|2-2+3|}{\\sqrt{5}}=\\frac{3}{\\sqrt{5}}$.', 'أولًا الصيغة العامة $2x-y+3=0$ ثم القسمة على طول الناظمي: $d=\\frac{|2-2+3|}{\\sqrt{5}}=\\frac{3}{\\sqrt{5}}$.', 'First the general form, $2x-y+3=0$, and then divide by the length of the normal: $d=\\frac{|2-2+3|}{\\sqrt{5}}=\\frac{3}{\\sqrt{5}}$.')
        },
        check: {
            prompt: say('Zer distantziatara dago $O(0,0)$ puntua $3x+4y-10=0$ zuzenetik?', '¿A qué distancia está $O(0,0)$ de la recta $3x+4y-10=0$?', 'كم تبعد $O(0,0)$ عن المستقيم $3x+4y-10=0$؟', 'How far is $O(0,0)$ from the line $3x+4y-10=0$?'),
            options: [same('$10$'), same('$2$'), same('$-2$')],
            correctIndex: 1,
            explanation: same('$\\frac{10}{\\sqrt{9+16}}=\\frac{10}{5}=2$')
        }
    },
    'parallel-lines': {
        mistake: {
            wrong: say('$2x+y-3=0$ eta $4x+2y+4=0$: $d=\\frac{|-3-4|}{\\sqrt{5}}$', '$2x+y-3=0$ y $4x+2y+4=0$: $d=\\frac{|-3-4|}{\\sqrt{5}}$', '$2x+y-3=0$ و$4x+2y+4=0$: $d=\\frac{|-3-4|}{\\sqrt{5}}$', '$2x+y-3=0$ and $4x+2y+4=0$: $d=\\frac{|-3-4|}{\\sqrt{5}}$'),
            right: say('Lehenik koefizienteak berdindu behar dira: $2x+y+2=0$, eta $d=\\frac{|-3-2|}{\\sqrt{5}}=\\sqrt{5}$.', 'Antes hay que igualar los coeficientes: $2x+y+2=0$, y $d=\\frac{|-3-2|}{\\sqrt{5}}=\\sqrt{5}$.', 'يجب أولًا مساواة المعاملات: $2x+y+2=0$، و$d=\\frac{|-3-2|}{\\sqrt{5}}=\\sqrt{5}$.', 'First the coefficients have to be made equal: $2x+y+2=0$, and $d=\\frac{|-3-2|}{\\sqrt{5}}=\\sqrt{5}$.')
        },
        check: {
            prompt: say('Zer distantzia dago $3x+4y=0$ eta $3x+4y-15=0$ zuzenen artean?', '¿Qué distancia hay entre $3x+4y=0$ y $3x+4y-15=0$?', 'ما المسافة بين $3x+4y=0$ و$3x+4y-15=0$؟', 'What is the distance between $3x+4y=0$ and $3x+4y-15=0$?'),
            options: [same('$15$'), same('$5$'), same('$3$')],
            correctIndex: 2,
            explanation: same('$\\frac{15}{\\sqrt{9+16}}=3$')
        }
    },
    reflection: {
        mistake: {
            wrong: say('$Q(0,4)$ puntuaren simetrikoa $y=0$ zuzenarekiko: oina, $(0,0)$', 'El simétrico de $Q(0,4)$ respecto de $y=0$: el pie, $(0,0)$', 'نظير $Q(0,4)$ بالنسبة إلى $y=0$: الموقع $(0,0)$', 'The reflection of $Q(0,4)$ in $y=0$: the foot, $(0,0)$'),
            right: say('Oina $QQ\'$ zuzenkiaren erdiko puntua da: $Q\'=2\\cdot(0,0)-(0,4)=(0,-4)$.', 'El pie es el punto medio de $QQ\'$: $Q\'=2\\cdot(0,0)-(0,4)=(0,-4)$.', 'الموقع هو منتصف $QQ\'$: $Q\'=2\\cdot(0,0)-(0,4)=(0,-4)$.', 'The foot is the midpoint of $QQ\'$: $Q\'=2\\cdot(0,0)-(0,4)=(0,-4)$.')
        },
        check: {
            prompt: say('Zein da $(2,5)$ puntuaren simetrikoa $X$ ardatzarekiko?', '¿Cuál es el simétrico de $(2,5)$ respecto del eje $X$?', 'ما نظير $(2,5)$ بالنسبة إلى المحور $X$؟', 'What is the reflection of $(2,5)$ in the $X$ axis?'),
            options: [same('$(-2,5)$'), same('$(2,0)$'), same('$(2,-5)$')],
            correctIndex: 2,
            explanation: say('Oina $(2,0)$ da: $2\\cdot(2,0)-(2,5)=(2,-5)$.', 'El pie es $(2,0)$: $2\\cdot(2,0)-(2,5)=(2,-5)$.', 'الموقع $(2,0)$: $2\\cdot(2,0)-(2,5)=(2,-5)$.', 'The foot is $(2,0)$: $2\\cdot(2,0)-(2,5)=(2,-5)$.')
        }
    },

    /* ---------- 5. Triangles ---------- */
    'triangle-points': {
        mistake: {
            wrong: say('$A(0,0)$, $B(4,0)$ eta $C(2,6)$ triangeluaren barizentroa: $\\left(\\frac{0+4+2}{2},\\frac{0+0+6}{2}\\right)=(3,3)$', 'Baricentro de $A(0,0)$, $B(4,0)$, $C(2,6)$: $\\left(\\frac{0+4+2}{2},\\frac{0+0+6}{2}\\right)=(3,3)$', 'مركز ثقل $A(0,0)$ و$B(4,0)$ و$C(2,6)$: $\\left(\\frac{0+4+2}{2},\\frac{0+0+6}{2}\\right)=(3,3)$', 'Centroid of $A(0,0)$, $B(4,0)$, $C(2,6)$: $\\left(\\frac{0+4+2}{2},\\frac{0+0+6}{2}\\right)=(3,3)$'),
            right: say('3 zenbakiaz zatitzen da, hiru erpin direlako: $G=(2,2)$.', 'Se divide entre 3, porque son tres vértices: $G=(2,2)$.', 'نقسم على 3 لأنها ثلاثة رؤوس: $G=(2,2)$.', 'You divide by 3, because there are three vertices: $G=(2,2)$.')
        },
        check: {
            prompt: say('Non ebakitzen dira triangelu baten altuerak?', '¿Dónde se cortan las alturas de un triángulo?', 'أين تتقاطع ارتفاعات المثلث؟', 'Where do the altitudes of a triangle meet?'),
            options: [say('Barizentroan', 'En el baricentro', 'في مركز الثقل', 'At the centroid'), say('Ortozentroan', 'En el ortocentro', 'في ملتقى الارتفاعات', 'At the orthocentre'), say('Zirkunzentroan', 'En el circuncentro', 'في مركز الدائرة المحيطة', 'At the circumcentre')],
            correctIndex: 1,
            explanation: say('Altuerak ortozentroan ebakitzen dira; medianak, barizentroan; erdibitzaileak, zirkunzentroan.', 'Las alturas se cortan en el ortocentro; las medianas, en el baricentro; las mediatrices, en el circuncentro.', 'تتقاطع الارتفاعات في ملتقى الارتفاعات، والمتوسطات في مركز الثقل، والمحاور في مركز الدائرة المحيطة.', 'The altitudes meet at the orthocentre; the medians, at the centroid; the perpendicular bisectors, at the circumcentre.')
        }
    },
    'triangle-area': {
        mistake: {
            wrong: say('$AB$ aldearen gaineko altuera: $C$ puntutik $A$ punturako distantzia', 'Altura sobre $AB$: la distancia de $C$ a $A$', 'الارتفاع على $AB$: المسافة من $C$ إلى $A$', 'Height on $AB$: the distance from $C$ to $A$'),
            right: say('Altuera $C$ puntutik $AB$ zuzenerako distantzia da, perpendikularrean neurtuta; ez erpin batera.', 'La altura es la distancia de $C$ a la recta $AB$, medida en perpendicular, no a un vértice.', 'الارتفاع هو المسافة من $C$ إلى المستقيم $AB$ مقيسة عموديًا، لا إلى رأس.', 'The height is the distance from $C$ to the line $AB$, measured perpendicularly, not to a vertex.')
        },
        check: {
            prompt: say('Zenbat da $(0,0)$, $(6,0)$ eta $(2,4)$ erpinak dituen triangeluaren azalera?', '¿Cuál es el área del triángulo de vértices $(0,0)$, $(6,0)$ y $(2,4)$?', 'ما مساحة المثلث الذي رؤوسه $(0,0)$ و$(6,0)$ و$(2,4)$؟', 'What is the area of the triangle with vertices $(0,0)$, $(6,0)$ and $(2,4)$?'),
            options: [same('$24$'), same('$12$'), same('$6$')],
            correctIndex: 1,
            explanation: same('$\\frac{1}{2}\\cdot 6\\cdot 4=12$')
        }
    }
}

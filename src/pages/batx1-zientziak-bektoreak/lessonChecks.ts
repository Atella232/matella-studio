import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Bektoreak · Batxilergoa 1 · Zientziak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests
   can import it; lessons.tsx merges it into the topics. The questions use
   new numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake.
   ========================================================================== */

export type BachVectorsTopicId =
    | 'free-vectors' | 'vector-operations'
    | 'linear-combination' | 'basis' | 'basis-coordinates'
    | 'dot-definition' | 'dot-figures' | 'dot-properties'
    | 'orthonormal' | 'modulus-unit' | 'angle-vectors' | 'perpendicular-vectors'
    | 'projection' | 'decomposition' | 'forces'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachVectorsLessonChecks: Record<BachVectorsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Vectors and operations ---------- */
    'free-vectors': {
        mistake: {
            wrong: say('$A(2,1)$ eta $B(5,3)$: $\\overrightarrow{AB}=(2-5,1-3)=(-3,-2)$', '$A(2,1)$ y $B(5,3)$: $\\overrightarrow{AB}=(2-5,1-3)=(-3,-2)$', '$A(2,1)$ و$B(5,3)$: $\\overrightarrow{AB}=(2-5,1-3)=(-3,-2)$', '$A(2,1)$ and $B(5,3)$: $\\overrightarrow{AB}=(2-5,1-3)=(-3,-2)$'),
            right: say('Muturra ken jatorria da: $\\overrightarrow{AB}=(5-2,3-1)=(3,2)$. $(-3,-2)$ bektorea $\\overrightarrow{BA}$ da.', 'Es extremo menos origen: $\\overrightarrow{AB}=(5-2,3-1)=(3,2)$. El vector $(-3,-2)$ es $\\overrightarrow{BA}$.', 'إنه الطرف ناقص الأصل: $\\overrightarrow{AB}=(5-2,3-1)=(3,2)$. أما المتجه $(-3,-2)$ فهو $\\overrightarrow{BA}$.', 'It is end point minus start point: $\\overrightarrow{AB}=(5-2,3-1)=(3,2)$. The vector $(-3,-2)$ is $\\overrightarrow{BA}$.')
        },
        check: {
            prompt: say('$A(0,3)$ eta $B(4,1)$ badira, zein bektore finko da $\\overrightarrow{AB}$ bektore askearen ordezkari?', 'Si $A(0,3)$ y $B(4,1)$, ¿qué vector fijo representa al mismo vector libre que $\\overrightarrow{AB}$?', 'إذا كانت $A(0,3)$ و$B(4,1)$، فأي متجه مقيّد يمثل المتجه الحر نفسه الذي يمثله $\\overrightarrow{AB}$؟', 'If $A(0,3)$ and $B(4,1)$, which fixed vector represents the same free vector as $\\overrightarrow{AB}$?'),
            options: [
                say('$C(1,1)$ puntutik $D(5,3)$ puntura', 'De $C(1,1)$ a $D(5,3)$', 'من $C(1,1)$ إلى $D(5,3)$', 'From $C(1,1)$ to $D(5,3)$'),
                say('$C(4,1)$ puntutik $D(0,3)$ puntura', 'De $C(4,1)$ a $D(0,3)$', 'من $C(4,1)$ إلى $D(0,3)$', 'From $C(4,1)$ to $D(0,3)$'),
                say('$C(1,1)$ puntutik $D(5,-1)$ puntura', 'De $C(1,1)$ a $D(5,-1)$', 'من $C(1,1)$ إلى $D(5,-1)$', 'From $C(1,1)$ to $D(5,-1)$')
            ],
            correctIndex: 2,
            explanation: say('$\\overrightarrow{AB}=(4,-2)$ eta $\\overrightarrow{CD}=(5-1,-1-1)=(4,-2)$: modulu, norabide eta noranzko bera.', '$\\overrightarrow{AB}=(4,-2)$ y $\\overrightarrow{CD}=(5-1,-1-1)=(4,-2)$: mismo módulo, dirección y sentido.', '$\\overrightarrow{AB}=(4,-2)$ و$\\overrightarrow{CD}=(5-1,-1-1)=(4,-2)$: الطول والاتجاه والمنحى نفسها.', '$\\overrightarrow{AB}=(4,-2)$ and $\\overrightarrow{CD}=(5-1,-1-1)=(4,-2)$: same magnitude, direction and sense.')
        }
    },
    'vector-operations': {
        mistake: {
            wrong: same('$3\\cdot(2,-5)=(6,-5)$'),
            right: say('Zenbakiak bi koordenatuak biderkatzen ditu: $3\\cdot(2,-5)=(6,-15)$.', 'El número multiplica las dos coordenadas: $3\\cdot(2,-5)=(6,-15)$.', 'العدد يضرب المركّبتين معًا: $3\\cdot(2,-5)=(6,-15)$.', 'The number multiplies both coordinates: $3\\cdot(2,-5)=(6,-15)$.')
        },
        check: {
            prompt: say('$\\vec{u}=(1,4)$ eta $\\vec{v}=(2,1)$ badira, zenbat da $\\vec{u}-3\\vec{v}$?', 'Si $\\vec{u}=(1,4)$ y $\\vec{v}=(2,1)$, ¿cuánto vale $\\vec{u}-3\\vec{v}$?', 'إذا كان $\\vec{u}=(1,4)$ و$\\vec{v}=(2,1)$، فكم يساوي $\\vec{u}-3\\vec{v}$؟', 'If $\\vec{u}=(1,4)$ and $\\vec{v}=(2,1)$, what is $\\vec{u}-3\\vec{v}$?'),
            options: [same('$(-5,1)$'), same('$(-5,3)$'), same('$(7,7)$')],
            correctIndex: 0,
            explanation: same('$(1,4)-(6,3)=(-5,1)$')
        }
    },

    /* ---------- 2. Linear combinations and bases ---------- */
    'linear-combination': {
        mistake: {
            wrong: say('$(4,1)=a(1,1)+b(2,-1)$: $a=4$ eta $b=1$', '$(4,1)=a(1,1)+b(2,-1)$: $a=4$ y $b=1$', '$(4,1)=a(1,1)+b(2,-1)$: $a=4$ و$b=1$', '$(4,1)=a(1,1)+b(2,-1)$: $a=4$ and $b=1$'),
            right: say('$a$ eta $b$ ez dira $\\vec{w}$ bektorearen koordenatuak. Ebatzi $a+2b=4$ eta $a-b=1$: $a=2$ eta $b=1$.', '$a$ y $b$ no son las coordenadas de $\\vec{w}$. Resuelve $a+2b=4$ y $a-b=1$: $a=2$ y $b=1$.', 'ليس $a$ و$b$ مركّبتي $\\vec{w}$. حُلّ $a+2b=4$ و$a-b=1$: $a=2$ و$b=1$.', '$a$ and $b$ are not the coordinates of $\\vec{w}$. Solve $a+2b=4$ and $a-b=1$: $a=2$ and $b=1$.')
        },
        check: {
            prompt: say('Zein zenbakik betetzen dute $(3,9)=a(1,2)+b(1,-1)$?', '¿Qué números cumplen $(3,9)=a(1,2)+b(1,-1)$?', 'ما العددان اللذان يحققان $(3,9)=a(1,2)+b(1,-1)$؟', 'Which numbers satisfy $(3,9)=a(1,2)+b(1,-1)$?'),
            options: [
                say('$a=3$ eta $b=9$', '$a=3$ y $b=9$', '$a=3$ و$b=9$', '$a=3$ and $b=9$'),
                say('$a=4$ eta $b=-1$', '$a=4$ y $b=-1$', '$a=4$ و$b=-1$', '$a=4$ and $b=-1$'),
                say('$a=-1$ eta $b=4$', '$a=-1$ y $b=4$', '$a=-1$ و$b=4$', '$a=-1$ and $b=4$')
            ],
            correctIndex: 1,
            explanation: same('$4\\cdot(1,2)-(1,-1)=(3,9)$')
        }
    },
    basis: {
        mistake: {
            wrong: say('$(2,4)$ eta $(4,2)$ paraleloak dira: zenbaki berak dituzte', '$(2,4)$ y $(4,2)$ son paralelos: tienen los mismos números', '$(2,4)$ و$(4,2)$ متوازيان: لهما الأعداد نفسها', '$(2,4)$ and $(4,2)$ are parallel: they have the same numbers'),
            right: say('Paraleloak izateko, koordenatuek proportzionalak izan behar dute ordena berean: $\\frac{4}{2}\\neq\\frac{2}{4}$. Oinarri bat osatzen dute.', 'Para ser paralelos, las coordenadas tienen que ser proporcionales en el mismo orden: $\\frac{4}{2}\\neq\\frac{2}{4}$. Forman una base.', 'ليكونا متوازيين يجب أن تتناسب المركّبات بالترتيب نفسه: $\\frac{4}{2}\\neq\\frac{2}{4}$. إنهما يكوّنان أساسًا.', 'To be parallel, the coordinates have to be proportional in the same order: $\\frac{4}{2}\\neq\\frac{2}{4}$. They form a basis.')
        },
        check: {
            prompt: say('Zein bikotek ez du oinarri bat osatzen?', '¿Qué pareja no forma una base?', 'أي زوج لا يكوّن أساسًا؟', 'Which pair does not form a basis?'),
            options: [
                say('$(1,3)$ eta $(3,1)$', '$(1,3)$ y $(3,1)$', '$(1,3)$ و$(3,1)$', '$(1,3)$ and $(3,1)$'),
                say('$(0,2)$ eta $(2,0)$', '$(0,2)$ y $(2,0)$', '$(0,2)$ و$(2,0)$', '$(0,2)$ and $(2,0)$'),
                say('$(2,-1)$ eta $(-6,3)$', '$(2,-1)$ y $(-6,3)$', '$(2,-1)$ و$(-6,3)$', '$(2,-1)$ and $(-6,3)$')
            ],
            correctIndex: 2,
            explanation: say('$(-6,3)=-3\\cdot(2,-1)$: paraleloak dira, eta zuzen bakarrean geratzen dira.', '$(-6,3)=-3\\cdot(2,-1)$: son paralelos y se quedan en una sola recta.', '$(-6,3)=-3\\cdot(2,-1)$: متوازيان ويبقيان على مستقيم واحد.', '$(-6,3)=-3\\cdot(2,-1)$: they are parallel and stay on a single line.')
        }
    },
    'basis-coordinates': {
        mistake: {
            wrong: say('$\\vec{w}=(4,2)$: edozein oinarritan haren koordenatuak $(4,2)$ dira', '$\\vec{w}=(4,2)$: en cualquier base sus coordenadas son $(4,2)$', '$\\vec{w}=(4,2)$: مركّبتاه $(4,2)$ في أي أساس', '$\\vec{w}=(4,2)$: in any basis its coordinates are $(4,2)$'),
            right: say('Oinarri kanonikoan bakarrik. $B=((1,1),(1,-1))$ oinarrian, $\\vec{w}=3(1,1)+1(1,-1)$: haren koordenatuak $(3,1)_B$ dira.', 'Solo en la base canónica. En $B=((1,1),(1,-1))$, $\\vec{w}=3(1,1)+1(1,-1)$: sus coordenadas son $(3,1)_B$.', 'في الأساس القانوني فقط. وفي $B=((1,1),(1,-1))$ يكون $\\vec{w}=3(1,1)+1(1,-1)$: مركّبتاه $(3,1)_B$.', 'Only in the standard basis. In $B=((1,1),(1,-1))$, $\\vec{w}=3(1,1)+1(1,-1)$: its coordinates are $(3,1)_B$.')
        },
        check: {
            prompt: say('$\\vec{u}=(1,2)$ eta $\\vec{v}=(1,-1)$ badira, zein dira $\\vec{w}=(0,6)$ bektorearen koordenatuak $B=(\\vec{u},\\vec{v})$ oinarrian?', 'Si $\\vec{u}=(1,2)$ y $\\vec{v}=(1,-1)$, ¿qué coordenadas tiene $\\vec{w}=(0,6)$ en la base $B=(\\vec{u},\\vec{v})$?', 'إذا كان $\\vec{u}=(1,2)$ و$\\vec{v}=(1,-1)$، فما مركّبتا $\\vec{w}=(0,6)$ في الأساس $B=(\\vec{u},\\vec{v})$؟', 'If $\\vec{u}=(1,2)$ and $\\vec{v}=(1,-1)$, what are the coordinates of $\\vec{w}=(0,6)$ in the basis $B=(\\vec{u},\\vec{v})$?'),
            options: [same('$(0,6)_B$'), same('$(2,-2)_B$'), same('$(-2,2)_B$')],
            correctIndex: 1,
            explanation: same('$2\\cdot(1,2)-2\\cdot(1,-1)=(0,6)$')
        }
    },

    /* ---------- 3. The dot product ---------- */
    'dot-definition': {
        mistake: {
            wrong: say('$|\\vec{u}|=2$, $|\\vec{v}|=5$ eta $\\alpha=0^\\circ$: $\\vec{u}\\cdot\\vec{v}$ modulua 10 duen bektore bat da', '$|\\vec{u}|=2$, $|\\vec{v}|=5$ y $\\alpha=0^\\circ$: $\\vec{u}\\cdot\\vec{v}$ es un vector de módulo 10', '$|\\vec{u}|=2$ و$|\\vec{v}|=5$ و$\\alpha=0^\\circ$: ‏$\\vec{u}\\cdot\\vec{v}$ متجه طوله 10', '$|\\vec{u}|=2$, $|\\vec{v}|=5$ and $\\alpha=0^\\circ$: $\\vec{u}\\cdot\\vec{v}$ is a vector of length 10'),
            right: say('Zenbaki bat da, ez bektore bat: $\\vec{u}\\cdot\\vec{v}=2\\cdot 5\\cdot\\cos 0^\\circ=10$. Ez du norabiderik ez noranzkorik.', 'Es un número, no un vector: $\\vec{u}\\cdot\\vec{v}=2\\cdot 5\\cdot\\cos 0^\\circ=10$. No tiene dirección ni sentido.', 'إنه عدد لا متجه: $\\vec{u}\\cdot\\vec{v}=2\\cdot 5\\cdot\\cos 0^\\circ=10$. ليس له اتجاه ولا منحى.', 'It is a number, not a vector: $\\vec{u}\\cdot\\vec{v}=2\\cdot 5\\cdot\\cos 0^\\circ=10$. It has no direction and no sense.')
        },
        check: {
            prompt: say('$|\\vec{u}|=2$ eta $|\\vec{v}|=6$ dira, eta $120^\\circ$ osatzen dute. Zenbat da $\\vec{u}\\cdot\\vec{v}$?', '$|\\vec{u}|=2$, $|\\vec{v}|=6$ y forman $120^\\circ$. ¿Cuánto vale $\\vec{u}\\cdot\\vec{v}$?', '$|\\vec{u}|=2$ و$|\\vec{v}|=6$ ويصنعان $120^\\circ$. كم يساوي $\\vec{u}\\cdot\\vec{v}$؟', '$|\\vec{u}|=2$, $|\\vec{v}|=6$ and they make $120^\\circ$. What is $\\vec{u}\\cdot\\vec{v}$?'),
            options: [same('$6$'), same('$12$'), same('$-6$')],
            correctIndex: 2,
            explanation: same('$2\\cdot 6\\cdot\\left(-\\frac{1}{2}\\right)=-6$')
        }
    },
    'dot-figures': {
        mistake: {
            wrong: say('Alde 4 duen triangelu aldeberdina: $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}=4\\cdot 4\\cdot\\cos 60^\\circ$', 'Triángulo equilátero de lado 4: $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}=4\\cdot 4\\cdot\\cos 60^\\circ$', 'مثلث متساوي الأضلاع طول ضلعه 4: $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}=4\\cdot 4\\cdot\\cos 60^\\circ$', 'Equilateral triangle with side 4: $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}=4\\cdot 4\\cdot\\cos 60^\\circ$'),
            right: say('Jatorri berean $120^\\circ$ osatzen dute, kanpoko angelua: $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}=4\\cdot 4\\cdot\\cos 120^\\circ=-8$.', 'Con el mismo origen forman $120^\\circ$, el ángulo exterior: $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}=4\\cdot 4\\cdot\\cos 120^\\circ=-8$.', 'من الأصل نفسه يصنعان $120^\\circ$، أي الزاوية الخارجية: $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}=4\\cdot 4\\cdot\\cos 120^\\circ=-8$.', 'From the same starting point they make $120^\\circ$, the outer angle: $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}=4\\cdot 4\\cdot\\cos 120^\\circ=-8$.')
        },
        check: {
            prompt: say('Alde 2 duen hexagono erregular batean, $O$ zentroa da eta $A$ eta $B$ ondoz ondoko erpinak. Zenbat da $\\overrightarrow{OA}\\cdot\\overrightarrow{OB}$?', 'En un hexágono regular de lado 2, $O$ es el centro y $A$ y $B$ son vértices seguidos. ¿Cuánto vale $\\overrightarrow{OA}\\cdot\\overrightarrow{OB}$?', 'في سداسي منتظم طول ضلعه 2، ‏$O$ هو المركز و$A$ و$B$ رأسان متتاليان. كم يساوي $\\overrightarrow{OA}\\cdot\\overrightarrow{OB}$؟', 'In a regular hexagon with side 2, $O$ is the centre and $A$ and $B$ are consecutive vertices. What is $\\overrightarrow{OA}\\cdot\\overrightarrow{OB}$?'),
            options: [same('$2$'), same('$-2$'), same('$4$')],
            correctIndex: 0,
            explanation: say('$OAB$ aldeberdina da: $2\\cdot 2\\cdot\\cos 60^\\circ=2$.', '$OAB$ es equilátero: $2\\cdot 2\\cdot\\cos 60^\\circ=2$.', '$OAB$ متساوي الأضلاع: $2\\cdot 2\\cdot\\cos 60^\\circ=2$.', '$OAB$ is equilateral: $2\\cdot 2\\cdot\\cos 60^\\circ=2$.')
        }
    },
    'dot-properties': {
        mistake: {
            wrong: say('$|\\vec{u}|=6$, $|\\vec{v}|=8$ eta perpendikularrak: $|\\vec{u}+\\vec{v}|=6+8=14$', '$|\\vec{u}|=6$, $|\\vec{v}|=8$ y perpendiculares: $|\\vec{u}+\\vec{v}|=6+8=14$', '$|\\vec{u}|=6$ و$|\\vec{v}|=8$ ومتعامدان: $|\\vec{u}+\\vec{v}|=6+8=14$', '$|\\vec{u}|=6$, $|\\vec{v}|=8$ and perpendicular: $|\\vec{u}+\\vec{v}|=6+8=14$'),
            right: say('$|\\vec{u}+\\vec{v}|^2=36+2\\cdot 0+64=100$; beraz, $|\\vec{u}+\\vec{v}|=10$: Pitagoras da.', '$|\\vec{u}+\\vec{v}|^2=36+2\\cdot 0+64=100$, así que $|\\vec{u}+\\vec{v}|=10$: es Pitágoras.', '$|\\vec{u}+\\vec{v}|^2=36+2\\cdot 0+64=100$، إذن $|\\vec{u}+\\vec{v}|=10$: إنها فيثاغورس.', '$|\\vec{u}+\\vec{v}|^2=36+2\\cdot 0+64=100$, so $|\\vec{u}+\\vec{v}|=10$: it is Pythagoras.')
        },
        check: {
            prompt: say('$|\\vec{u}|=2$, $|\\vec{v}|=3$ eta $\\vec{u}\\cdot\\vec{v}=3$ badira, zenbat da $|\\vec{u}+\\vec{v}|$?', 'Si $|\\vec{u}|=2$, $|\\vec{v}|=3$ y $\\vec{u}\\cdot\\vec{v}=3$, ¿cuánto vale $|\\vec{u}+\\vec{v}|$?', 'إذا كان $|\\vec{u}|=2$ و$|\\vec{v}|=3$ و$\\vec{u}\\cdot\\vec{v}=3$، فكم يساوي $|\\vec{u}+\\vec{v}|$؟', 'If $|\\vec{u}|=2$, $|\\vec{v}|=3$ and $\\vec{u}\\cdot\\vec{v}=3$, what is $|\\vec{u}+\\vec{v}|$?'),
            options: [same('$5$'), same('$\\sqrt{19}$'), same('$\\sqrt{13}$')],
            correctIndex: 1,
            explanation: same('$|\\vec{u}+\\vec{v}|^2=4+2\\cdot 3+9=19$')
        }
    },

    /* ---------- 4. The dot product with coordinates ---------- */
    orthonormal: {
        mistake: {
            wrong: same('$(2,3)\\cdot(4,-1)=(8,-3)$'),
            right: say('Biderkadura eskalarra zenbaki bat da: $(2,3)\\cdot(4,-1)=2\\cdot 4+3\\cdot(-1)=5$.', 'El producto escalar es un número: $(2,3)\\cdot(4,-1)=2\\cdot 4+3\\cdot(-1)=5$.', 'الجداء السلمي عدد: $(2,3)\\cdot(4,-1)=2\\cdot 4+3\\cdot(-1)=5$.', 'The dot product is a number: $(2,3)\\cdot(4,-1)=2\\cdot 4+3\\cdot(-1)=5$.')
        },
        check: {
            prompt: say('Oinarri ortonormal batean, zenbat da $(5,-1)\\cdot(2,6)$?', 'En una base ortonormal, ¿cuánto vale $(5,-1)\\cdot(2,6)$?', 'في أساس متعامد ومتجانس، كم يساوي $(5,-1)\\cdot(2,6)$؟', 'In an orthonormal basis, what is $(5,-1)\\cdot(2,6)$?'),
            options: [same('$(10,-6)$'), same('$4$'), same('$16$')],
            correctIndex: 1,
            explanation: same('$5\\cdot 2+(-1)\\cdot 6=10-6=4$')
        }
    },
    'modulus-unit': {
        mistake: {
            wrong: say('$(3,4)$ bektorearen unitarioa $\\left(\\frac{3}{7},\\frac{4}{7}\\right)$ da: $3+4$ zenbakiaz zatitzen da', 'El unitario de $(3,4)$ es $\\left(\\frac{3}{7},\\frac{4}{7}\\right)$: se divide entre $3+4$', 'متجه الوحدة لـ $(3,4)$ هو $\\left(\\frac{3}{7},\\frac{4}{7}\\right)$: نقسم على $3+4$', 'The unit vector of $(3,4)$ is $\\left(\\frac{3}{7},\\frac{4}{7}\\right)$: you divide by $3+4$'),
            right: say('Modulua zatitzen da, $\\sqrt{9+16}=5$: $\\left(\\frac{3}{5},\\frac{4}{5}\\right)$. Egiaztatu: $\\frac{9}{25}+\\frac{16}{25}=1$.', 'Se divide entre el módulo, $\\sqrt{9+16}=5$: $\\left(\\frac{3}{5},\\frac{4}{5}\\right)$. Comprueba: $\\frac{9}{25}+\\frac{16}{25}=1$.', 'نقسم على الطول $\\sqrt{9+16}=5$: ‏$\\left(\\frac{3}{5},\\frac{4}{5}\\right)$. تحقق: $\\frac{9}{25}+\\frac{16}{25}=1$.', 'You divide by the length, $\\sqrt{9+16}=5$: $\\left(\\frac{3}{5},\\frac{4}{5}\\right)$. Check: $\\frac{9}{25}+\\frac{16}{25}=1$.')
        },
        check: {
            prompt: say('Zein bektorek du modulua 1?', '¿Qué vector tiene módulo 1?', 'أي متجه طوله 1؟', 'Which vector has length 1?'),
            options: [same('$\\left(\\frac{1}{2},\\frac{1}{2}\\right)$'), same('$\\left(\\frac{2}{3},\\frac{1}{3}\\right)$'), same('$\\left(\\frac{8}{17},-\\frac{15}{17}\\right)$')],
            correctIndex: 2,
            explanation: same('$\\frac{64}{289}+\\frac{225}{289}=1$')
        }
    },
    'angle-vectors': {
        mistake: {
            wrong: say('$\\cos\\alpha=-\\frac{1}{2}$; beraz, $\\alpha=60^\\circ$', '$\\cos\\alpha=-\\frac{1}{2}$, así que $\\alpha=60^\\circ$', '$\\cos\\alpha=-\\frac{1}{2}$، إذن $\\alpha=60^\\circ$', '$\\cos\\alpha=-\\frac{1}{2}$, so $\\alpha=60^\\circ$'),
            right: say('Kosinu negatibo batek angelu kamutsa ematen du: $\\alpha=120^\\circ$. Bi bektoreren angelua $0^\\circ$ eta $180^\\circ$ artekoa da.', 'Un coseno negativo da un ángulo obtuso: $\\alpha=120^\\circ$. El ángulo de dos vectores va de $0^\\circ$ a $180^\\circ$.', 'جيب تمام سالب يعطي زاوية منفرجة: $\\alpha=120^\\circ$. وزاوية متجهين بين $0^\\circ$ و$180^\\circ$.', 'A negative cosine gives an obtuse angle: $\\alpha=120^\\circ$. The angle of two vectors goes from $0^\\circ$ to $180^\\circ$.')
        },
        check: {
            prompt: say('Zer angelu osatzen dute $(2,0)$ eta $(-3,3)$ bektoreek?', '¿Qué ángulo forman $(2,0)$ y $(-3,3)$?', 'ما الزاوية بين $(2,0)$ و$(-3,3)$؟', 'What angle do $(2,0)$ and $(-3,3)$ make?'),
            options: [same('$45^\\circ$'), same('$135^\\circ$'), same('$90^\\circ$')],
            correctIndex: 1,
            explanation: same('$\\cos\\alpha=\\frac{-6}{2\\cdot 3\\sqrt{2}}=-\\frac{\\sqrt{2}}{2}$')
        }
    },
    'perpendicular-vectors': {
        mistake: {
            wrong: say('$(3,4)$ bektorearen perpendikular bat $(4,3)$ da', 'Un perpendicular a $(3,4)$ es $(4,3)$', 'متجه عمودي على $(3,4)$ هو $(4,3)$', 'A vector perpendicular to $(3,4)$ is $(4,3)$'),
            right: say('Zeinu bat ere aldatu behar da: $(3,4)\\cdot(-4,3)=-12+12=0$. Aldiz, $(3,4)\\cdot(4,3)=24$.', 'Hay que cambiar también un signo: $(3,4)\\cdot(-4,3)=-12+12=0$. En cambio, $(3,4)\\cdot(4,3)=24$.', 'يجب تغيير إشارة أيضًا: $(3,4)\\cdot(-4,3)=-12+12=0$. أما $(3,4)\\cdot(4,3)=24$.', 'You also have to change a sign: $(3,4)\\cdot(-4,3)=-12+12=0$. Whereas $(3,4)\\cdot(4,3)=24$.')
        },
        check: {
            prompt: say('Zein bektore da $(7,-3)$ bektorearen perpendikularra?', '¿Qué vector es perpendicular a $(7,-3)$?', 'أي متجه عمودي على $(7,-3)$؟', 'Which vector is perpendicular to $(7,-3)$?'),
            options: [same('$(3,7)$'), same('$(-3,7)$'), same('$(-7,3)$')],
            correctIndex: 0,
            explanation: same('$(7,-3)\\cdot(3,7)=21-21=0$')
        }
    },

    /* ---------- 5. Projections and applications ---------- */
    projection: {
        mistake: {
            wrong: say('$(2,6)$ bektorearen proiekzioa $(3,4)$ bektorearen gainean: $\\frac{6+24}{|(2,6)|}$', 'Proyección de $(2,6)$ sobre $(3,4)$: $\\frac{6+24}{|(2,6)|}$', 'إسقاط $(2,6)$ على $(3,4)$: $\\frac{6+24}{|(2,6)|}$', 'Projection of $(2,6)$ onto $(3,4)$: $\\frac{6+24}{|(2,6)|}$'),
            right: say('Proiektatzen den bektorearen gaineko bektorearen moduluaz zatitzen da: $\\frac{6+24}{5}=6$.', 'Se divide entre el módulo del vector sobre el que se proyecta: $\\frac{6+24}{5}=6$.', 'نقسم على طول المتجه الذي نُسقط عليه: $\\frac{6+24}{5}=6$.', 'You divide by the length of the vector you project onto: $\\frac{6+24}{5}=6$.')
        },
        check: {
            prompt: say('Zenbat neurtzen du (zeinuarekin) $(1,-7)$ bektorearen proiekzioak $(4,3)$ bektorearen gainean?', '¿Cuánto mide (con signo) la proyección de $(1,-7)$ sobre $(4,3)$?', 'كم طول إسقاط $(1,-7)$ على $(4,3)$ (بإشارته)؟', 'What is the signed length of the projection of $(1,-7)$ onto $(4,3)$?'),
            options: [same('$\\frac{17}{5}$'), same('$-17$'), same('$-\\frac{17}{5}$')],
            correctIndex: 2,
            explanation: same('$\\frac{4-21}{5}=-\\frac{17}{5}$')
        }
    },
    decomposition: {
        mistake: {
            wrong: say('$(3,4)$ bektorearen zati paraleloa $(2,0)$ norabidean: $(3,4)\\cdot(2,0)=6$', 'La parte de $(3,4)$ paralela a $(2,0)$: $(3,4)\\cdot(2,0)=6$', 'جزء $(3,4)$ الموازي لـ $(2,0)$: $(3,4)\\cdot(2,0)=6$', 'The part of $(3,4)$ parallel to $(2,0)$: $(3,4)\\cdot(2,0)=6$'),
            right: say('Zati paraleloa bektore bat da, ez zenbaki bat: $\\frac{6}{4}(2,0)=(3,0)$; perpendikularra $(0,4)$ da.', 'La parte paralela es un vector, no un número: $\\frac{6}{4}(2,0)=(3,0)$; la perpendicular es $(0,4)$.', 'الجزء الموازي متجه لا عدد: $\\frac{6}{4}(2,0)=(3,0)$؛ والعمودي $(0,4)$.', 'The parallel part is a vector, not a number: $\\frac{6}{4}(2,0)=(3,0)$; the perpendicular one is $(0,4)$.')
        },
        check: {
            prompt: say('$(6,2)$ bektorearen zatia, $(1,1)$ bektorearen paraleloa, $(4,4)$ da. Zein da zati perpendikularra?', 'La parte de $(6,2)$ paralela a $(1,1)$ es $(4,4)$. ¿Cuál es la parte perpendicular?', 'جزء $(6,2)$ الموازي لـ $(1,1)$ هو $(4,4)$. ما الجزء العمودي؟', 'The part of $(6,2)$ parallel to $(1,1)$ is $(4,4)$. What is the perpendicular part?'),
            options: [same('$(10,6)$'), same('$(2,-2)$'), same('$(-2,2)$')],
            correctIndex: 1,
            explanation: same('$(6,2)-(4,4)=(2,-2)\\qquad (2,-2)\\cdot(1,1)=0$')
        }
    },
    forces: {
        mistake: {
            wrong: say('$12$ N eta $16$ N indarrak angelu zuzenean: erresultantea $28$ N da', 'Fuerzas de $12$ N y $16$ N en ángulo recto: la resultante es $28$ N', 'قوتان $12$ N و$16$ N متعامدتان: المحصلة $28$ N', 'Forces of $12$ N and $16$ N at a right angle: the resultant is $28$ N'),
            right: say('Bektore gisa batzen dira: $\\sqrt{12^2+16^2}=20$ N. Norabide eta noranzko berean tiratzen badute bakarrik ematen dute $28$ N.', 'Se suman como vectores: $\\sqrt{12^2+16^2}=20$ N. Solo dan $28$ N si tiran en la misma dirección y sentido.', 'تُجمعان كمتجهين: $\\sqrt{12^2+16^2}=20$ N. ولا تعطيان $28$ N إلا إذا شدّتا بالاتجاه والمنحى نفسيهما.', 'They add as vectors: $\\sqrt{12^2+16^2}=20$ N. They only give $28$ N if they pull in the same direction and sense.')
        },
        check: {
            prompt: say('Indar batek orga bati tiratzen dio, $20$ N, eta orga $5$ m aurreratzen da; indarrak $90^\\circ$ osatzen ditu bidearekin. Zenbateko lana egiten du?', 'Una fuerza de $20$ N tira de un carro que avanza $5$ m, y forma $90^\\circ$ con el camino. ¿Qué trabajo hace?', 'قوة مقدارها $20$ N تشدّ عربة تتقدم $5$ m، وتصنع $90^\\circ$ مع الطريق. ما الشغل الذي تبذله؟', 'A force of $20$ N pulls a cart that moves $5$ m forward, and it makes $90^\\circ$ with the path. How much work does it do?'),
            options: [same('$100$ J'), same('$0$ J'), same('$-100$ J')],
            correctIndex: 1,
            explanation: say('$\\cos 90^\\circ=0$: bidearekiko perpendikularra den indarrak ez du lanik egiten.', '$\\cos 90^\\circ=0$: una fuerza perpendicular al camino no hace trabajo.', '$\\cos 90^\\circ=0$: القوة العمودية على الطريق لا تبذل شغلًا.', '$\\cos 90^\\circ=0$: a force perpendicular to the path does no work.')
        }
    }
}

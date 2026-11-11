import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Espazioko bektoreak · Batxilergoa 2 · Zientziak — the typical mistake
   and the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical mistake.
   ========================================================================== */

export type SpaceVectorsTopicId =
    | 'space-points' | 'space-vectors' | 'midpoint-symmetric'
    | 'combination-3d' | 'dependence-rank' | 'basis-3d'
    | 'dot-3d' | 'angle-3d' | 'projection-3d'
    | 'cross-product' | 'cross-properties' | 'cross-area'
    | 'mixed-product' | 'mixed-volume' | 'coplanar'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const spaceVectorsLessonChecks: Record<SpaceVectorsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Points and vectors in space ---------- */
    'space-points': {
        mistake: {
            wrong: say('$P(2,5,-1)$ puntuaren proiekzioa $XY$ planoan: $(0,0,-1)$', 'Proyección de $P(2,5,-1)$ sobre el plano $XY$: $(0,0,-1)$', 'مسقط $P(2,5,-1)$ على المستوى $XY$: $(0,0,-1)$', 'Projection of $P(2,5,-1)$ onto the plane $XY$: $(0,0,-1)$'),
            right: say('$XY$ planoan $x$ eta $y$ gordetzen dira, eta ${z}=0$ jartzen da: $(2,5,0)$. $(0,0,-1)$ puntua ${z}$ ardatzeko proiekzioa da.', 'Sobre el plano $XY$ se conservan $x$ e $y$ y se pone ${z}=0$: $(2,5,0)$. El punto $(0,0,-1)$ es la proyección sobre el eje ${z}$.', 'على المستوى $XY$ نحتفظ بـ $x$ و$y$ ونضع ${z}=0$: ‏$(2,5,0)$. أما $(0,0,-1)$ فهو المسقط على المحور ${z}$.', 'On the plane $XY$ you keep $x$ and $y$ and set ${z}=0$: $(2,5,0)$. The point $(0,0,-1)$ is the projection onto the ${z}$ axis.')
        },
        check: {
            prompt: say('Zein da $R(4,-3,6)$ puntuaren proiekzioa $YZ$ planoan?', '¿Cuál es la proyección de $R(4,-3,6)$ sobre el plano $YZ$?', 'ما مسقط $R(4,-3,6)$ على المستوى $YZ$؟', 'What is the projection of $R(4,-3,6)$ onto the plane $YZ$?'),
            options: [same('$(0,-3,6)$'), same('$(4,0,0)$'), same('$(4,-3,0)$')],
            correctIndex: 0,
            explanation: say('$YZ$ planoa $x=0$ da: $y$ eta ${z}$ gordetzen dira, eta $x$ zero bihurtzen da.', 'El plano $YZ$ es $x=0$: se conservan $y$ y ${z}$, y $x$ pasa a ser 0.', 'المستوى $YZ$ هو $x=0$: نحتفظ بـ $y$ و${z}$ ويصبح $x$ صفرًا.', 'The plane $YZ$ is $x=0$: you keep $y$ and ${z}$, and $x$ becomes 0.')
        }
    },
    'space-vectors': {
        mistake: {
            wrong: same('$|(2,6,-9)|=\\sqrt{2^2+6^2}=\\sqrt{40}$'),
            right: say('Hirugarren koordenatua falta da: $|(2,6,-9)|=\\sqrt{4+36+81}=11$.', 'Falta la tercera coordenada: $|(2,6,-9)|=\\sqrt{4+36+81}=11$.', 'نقصت المركّبة الثالثة: $|(2,6,-9)|=\\sqrt{4+36+81}=11$.', 'The third coordinate is missing: $|(2,6,-9)|=\\sqrt{4+36+81}=11$.')
        },
        check: {
            prompt: say('Zenbat neurtzen du $\\overrightarrow{PQ}$ bektoreak, $P(2,0,-1)$ eta $Q(-2,3,11)$ badira?', '¿Cuánto mide $\\overrightarrow{PQ}$ si $P(2,0,-1)$ y $Q(-2,3,11)$?', 'كم طول $\\overrightarrow{PQ}$ إذا كانت $P(2,0,-1)$ و$Q(-2,3,11)$؟', 'How long is $\\overrightarrow{PQ}$ if $P(2,0,-1)$ and $Q(-2,3,11)$?'),
            options: [same('$5$'), same('$13$'), same('$19$')],
            correctIndex: 1,
            explanation: same('$\\overrightarrow{PQ}=(-4,3,12)\\qquad|\\overrightarrow{PQ}|=\\sqrt{16+9+144}=13$')
        }
    },
    'midpoint-symmetric': {
        mistake: {
            wrong: say('$A(1,4,2)$ puntuaren simetrikoa $M(3,0,5)$ puntuarekiko: $\\frac{A+M}{2}=(2,2,3{,}5)$', 'Simétrico de $A(1,4,2)$ respecto de $M(3,0,5)$: $\\frac{A+M}{2}=(2,2,3{,}5)$', 'نظيرة $A(1,4,2)$ بالنسبة إلى $M(3,0,5)$: $\\frac{A+M}{2}=(2,2,3{,}5)$', 'Symmetric of $A(1,4,2)$ with respect to $M(3,0,5)$: $\\frac{A+M}{2}=(2,2,3{,}5)$'),
            right: say('Hori $A$ eta $M$ puntuen erdiko puntua da. Simetrikoa $2M-A=(5,-4,8)$ da.', 'Eso es el punto medio de $A$ y $M$. El simétrico es $2M-A=(5,-4,8)$.', 'هذا منتصف $A$ و$M$. أما النظيرة فهي $2M-A=(5,-4,8)$.', 'That is the midpoint of $A$ and $M$. The symmetric point is $2M-A=(5,-4,8)$.')
        },
        check: {
            prompt: say('Zein da $E(-3,6,1)$ eta $F(5,0,-7)$ puntuen erdiko puntua?', '¿Cuál es el punto medio de $E(-3,6,1)$ y $F(5,0,-7)$?', 'ما منتصف $E(-3,6,1)$ و$F(5,0,-7)$؟', 'What is the midpoint of $E(-3,6,1)$ and $F(5,0,-7)$?'),
            options: [same('$(1,3,-3)$'), same('$(4,-3,-4)$'), same('$(2,6,-6)$')],
            correctIndex: 0,
            explanation: same('$M=\\left(\\frac{-3+5}{2},\\frac{6+0}{2},\\frac{1-7}{2}\\right)=(1,3,-3)$')
        }
    },

    /* ---------- 2. Linear dependence and bases ---------- */
    'combination-3d': {
        mistake: {
            wrong: say('$(4,1,7)=a(2,0,1)+b(0,1,3)$: $a=2$ eta $b=1$; beraz, konbinazio lineala da', '$(4,1,7)=a(2,0,1)+b(0,1,3)$: $a=2$ y $b=1$, así que es combinación lineal', '$(4,1,7)=a(2,0,1)+b(0,1,3)$: ‏$a=2$ و$b=1$، إذن هو تركيب خطي', '$(4,1,7)=a(2,0,1)+b(0,1,3)$: $a=2$ and $b=1$, so it is a linear combination'),
            right: say('Hirugarren ekuazioa egiaztatu behar da: $2\\cdot 1+1\\cdot 3=5$, eta ez $7$. Ez da konbinazio lineala.', 'Hay que comprobar la tercera ecuación: $2\\cdot 1+1\\cdot 3=5$, no $7$. No es combinación lineal.', 'يجب التحقق من المعادلة الثالثة: $2\\cdot 1+1\\cdot 3=5$ وليس $7$. ليس تركيبًا خطيًا.', 'You have to check the third equation: $2\\cdot 1+1\\cdot 3=5$, not $7$. It is not a linear combination.')
        },
        check: {
            prompt: say('$m$ parametroaren zein baliotarako da $(3,m,5)$ bektorea $(1,0,1)$ eta $(0,1,1)$ bektoreen konbinazio lineala?', '¿Para qué valor de $m$ es $(3,m,5)$ combinación lineal de $(1,0,1)$ y $(0,1,1)$?', 'لأي قيمة لـ $m$ يكون $(3,m,5)$ تركيبًا خطيًا لـ $(1,0,1)$ و$(0,1,1)$؟', 'For which value of $m$ is $(3,m,5)$ a linear combination of $(1,0,1)$ and $(0,1,1)$?'),
            options: [same('$m=2$'), same('$m=5$'), same('$m=8$')],
            correctIndex: 0,
            explanation: say('$a=3$, $b=m$ eta $a+b=5$; beraz, $m=5-3=2$.', '$a=3$, $b=m$ y $a+b=5$, así que $m=5-3=2$.', '$a=3$ و$b=m$ و$a+b=5$، إذن $m=5-3=2$.', '$a=3$, $b=m$ and $a+b=5$, so $m=5-3=2$.')
        }
    },
    'dependence-rank': {
        mistake: {
            wrong: say('$(1,1,0)$, $(0,1,1)$ eta $(1,2,1)$ ez dira biko paraleloak: independenteak dira', '$(1,1,0)$, $(0,1,1)$ y $(1,2,1)$ no son paralelos dos a dos: son independientes', '$(1,1,0)$ و$(0,1,1)$ و$(1,2,1)$ ليست متوازية مثنى مثنى: إذن هي مستقلة', '$(1,1,0)$, $(0,1,1)$ and $(1,2,1)$ are not parallel in pairs: they are independent'),
            right: say('Plano berean egon daitezke: $(1,2,1)=(1,1,0)+(0,1,1)$, eta haien determinantea 0 da. Mendekoak dira.', 'Pueden estar en un plano: $(1,2,1)=(1,1,0)+(0,1,1)$, y su determinante vale 0. Son dependientes.', 'قد تقع في مستوى واحد: $(1,2,1)=(1,1,0)+(0,1,1)$، ومحددها يساوي 0. إنها مرتبطة خطيًا.', 'They can lie in one plane: $(1,2,1)=(1,1,0)+(0,1,1)$, and their determinant is 0. They are dependent.')
        },
        check: {
            prompt: say('$(1,0,2)$, $(2,0,4)$ eta $(0,3,1)$ bektoreetatik zenbat dira linealki independenteak?', '¿Cuántos de los vectores $(1,0,2)$, $(2,0,4)$ y $(0,3,1)$ son linealmente independientes?', 'كم متجهًا مستقلًا خطيًا يوجد بين $(1,0,2)$ و$(2,0,4)$ و$(0,3,1)$؟', 'How many of the vectors $(1,0,2)$, $(2,0,4)$ and $(0,3,1)$ are linearly independent?'),
            options: [same('$1$'), same('$2$'), same('$3$')],
            correctIndex: 1,
            explanation: say('$(2,0,4)$ bektorea $(1,0,2)$ bektorearen bikoitza da, baina $(0,3,1)$ ez da haren multiploa: $\\operatorname{rg}=2$.', '$(2,0,4)$ es el doble de $(1,0,2)$, pero $(0,3,1)$ no es múltiplo suyo: $\\operatorname{rg}=2$.', '$(2,0,4)$ ضعف $(1,0,2)$، لكن $(0,3,1)$ ليس من مضاعفاته: $\\operatorname{rg}=2$.', '$(2,0,4)$ is twice $(1,0,2)$, but $(0,3,1)$ is not a multiple of it: $\\operatorname{rg}=2$.')
        }
    },
    'basis-3d': {
        mistake: {
            wrong: say('$(2,5,1)$ bektorearen koordenatuak edozein oinarritan $(2,5,1)$ dira', 'Las coordenadas de $(2,5,1)$ en cualquier base son $(2,5,1)$', 'مركّبات $(2,5,1)$ في أي أساس هي $(2,5,1)$', 'The coordinates of $(2,5,1)$ in any basis are $(2,5,1)$'),
            right: say('Oinarri kanonikoan bakarrik. Beste oinarri batean, $a\\vec{u}+b\\vec{v}+c\\vec{w}=(2,5,1)$ sistema ebatzi behar da.', 'Solo en la base canónica. En otra base hay que resolver el sistema $a\\vec{u}+b\\vec{v}+c\\vec{w}=(2,5,1)$.', 'فقط في الأساس القانوني. وفي أساس آخر يجب حل النظام $a\\vec{u}+b\\vec{v}+c\\vec{w}=(2,5,1)$.', 'Only in the standard basis. In another basis you have to solve the system $a\\vec{u}+b\\vec{v}+c\\vec{w}=(2,5,1)$.')
        },
        check: {
            prompt: say('Multzo hauetatik zein da espazioaren oinarri bat?', '¿Cuál de estos conjuntos es una base del espacio?', 'أي هذه المجموعات أساس للفضاء؟', 'Which of these sets is a basis of space?'),
            options: [same('$\\{(1,0,0),(0,1,0)\\}$'), same('$\\{(1,2,0),(0,1,3),(1,3,3)\\}$'), same('$\\{(1,0,0),(1,1,0),(0,1,2)\\}$')],
            correctIndex: 2,
            explanation: say('Bi bektore ez dira nahikoak, eta bigarrenean $(1,3,3)=(1,2,0)+(0,1,3)$. Hirugarrenaren determinantea 2 da, ez 0.', 'Dos vectores no bastan, y en el segundo $(1,3,3)=(1,2,0)+(0,1,3)$. El tercero tiene determinante 2, distinto de 0.', 'متجهان لا يكفيان، وفي الثانية $(1,3,3)=(1,2,0)+(0,1,3)$. أما محدد الثالثة فيساوي 2، وهو غير 0.', 'Two vectors are not enough, and in the second $(1,3,3)=(1,2,0)+(0,1,3)$. The third has determinant 2, not 0.')
        }
    },

    /* ---------- 3. The dot product in space ---------- */
    'dot-3d': {
        mistake: {
            wrong: same('$(3,0,-2)\\cdot(1,5,4)=(3,0,-8)$'),
            right: say('Biderkadura eskalarra zenbaki bat da: $3+0-8=-5$.', 'El producto escalar es un número: $3+0-8=-5$.', 'الجداء السلمي عدد: $3+0-8=-5$.', 'The dot product is a number: $3+0-8=-5$.')
        },
        check: {
            prompt: say('Zenbat da $(1,-2,5)\\cdot(4,3,1)$?', '¿Cuánto vale $(1,-2,5)\\cdot(4,3,1)$?', 'كم يساوي $(1,-2,5)\\cdot(4,3,1)$؟', 'What is $(1,-2,5)\\cdot(4,3,1)$?'),
            options: [same('$(4,-6,5)$'), same('$3$'), same('$15$')],
            correctIndex: 1,
            explanation: same('$1\\cdot 4+(-2)\\cdot 3+5\\cdot 1=4-6+5=3$')
        }
    },
    'angle-3d': {
        mistake: {
            wrong: same('$\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|+|\\vec{v}|}$'),
            right: say('Moduluen biderkaduraz zatitzen da: $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$.', 'Se divide entre el producto de los módulos: $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$.', 'نقسم على جداء الطولين: $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$.', 'You divide by the product of the magnitudes: $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$.')
        },
        check: {
            prompt: say('$m$ parametroaren zein baliotarako dira perpendikularrak $(m,1,-2)$ eta $(3,m,1)$?', '¿Para qué valor de $m$ son perpendiculares $(m,1,-2)$ y $(3,m,1)$?', 'لأي قيمة لـ $m$ يتعامد $(m,1,-2)$ و$(3,m,1)$؟', 'For which value of $m$ are $(m,1,-2)$ and $(3,m,1)$ perpendicular?'),
            options: [same('$m=\\frac{1}{2}$'), same('$m=2$'), same('$m=-\\frac{1}{2}$')],
            correctIndex: 0,
            explanation: same('$3m+m-2=4m-2=0\\ \\to\\ m=\\frac{1}{2}$')
        }
    },
    'projection-3d': {
        mistake: {
            wrong: say('$\\vec{v}$ bektorearen proiekzioa $\\vec{u}$ bektorearen gainean: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$', 'Proyección de $\\vec{v}$ sobre $\\vec{u}$: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$', 'إسقاط $\\vec{v}$ على $\\vec{u}$: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$', 'Projection of $\\vec{v}$ onto $\\vec{u}$: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$'),
            right: say('Proiektatzen den gaineko bektorearen moduluaz zatitzen da: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$.', 'Se divide entre el módulo del vector sobre el que se proyecta: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$.', 'نقسم على طول المتجه الذي نُسقط عليه: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$.', 'You divide by the magnitude of the vector you project onto: $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}$.')
        },
        check: {
            prompt: say('Zenbat neurtzen du $(2,7,1)$ bektorearen proiekzioak $(2,1,2)$ bektorearen gainean?', '¿Cuánto mide la proyección de $(2,7,1)$ sobre $(2,1,2)$?', 'كم طول إسقاط $(2,7,1)$ على $(2,1,2)$؟', 'How long is the projection of $(2,7,1)$ onto $(2,1,2)$?'),
            options: [same('$\\frac{13}{3}$'), same('$\\frac{13}{9}$'), same('$13$')],
            correctIndex: 0,
            explanation: same('$\\frac{4+7+2}{\\sqrt{4+1+4}}=\\frac{13}{3}$')
        }
    },

    /* ---------- 4. The cross product ---------- */
    'cross-product': {
        mistake: {
            wrong: same('$(1,3,2)\\times(2,0,1)=(3,-3,-6)$'),
            right: say('$\\vec{j}$ minus zeinuarekin doa: $-(1\\cdot 1-2\\cdot 2)=3$; beraz, emaitza $(3,3,-6)$ da.', 'La $\\vec{j}$ va con signo menos: $-(1\\cdot 1-2\\cdot 2)=3$, así que el resultado es $(3,3,-6)$.', 'يأتي $\\vec{j}$ بإشارة سالبة: $-(1\\cdot 1-2\\cdot 2)=3$، فالنتيجة $(3,3,-6)$.', 'The $\\vec{j}$ goes with a minus sign: $-(1\\cdot 1-2\\cdot 2)=3$, so the result is $(3,3,-6)$.')
        },
        check: {
            prompt: say('Zein da $(1,0,2)\\times(0,1,1)$?', '¿Cuál es $(1,0,2)\\times(0,1,1)$?', 'ما $(1,0,2)\\times(0,1,1)$؟', 'What is $(1,0,2)\\times(0,1,1)$?'),
            options: [same('$(-2,-1,1)$'), same('$(-2,1,1)$'), same('$(0,0,2)$')],
            correctIndex: 0,
            explanation: same('$(0-2)\\,\\vec{i}-(1-0)\\,\\vec{j}+(1-0)\\,\\vec{k}=(-2,-1,1)$')
        }
    },
    'cross-properties': {
        mistake: {
            wrong: same('$\\vec{v}\\times\\vec{u}=\\vec{u}\\times\\vec{v}$'),
            right: say('Zeinua aldatzen da: $\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$. $\\vec{u}\\times\\vec{v}=(2,-1,4)$ bada, $\\vec{v}\\times\\vec{u}=(-2,1,-4)$ da.', 'Cambia de signo: $\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$. Si $\\vec{u}\\times\\vec{v}=(2,-1,4)$, entonces $\\vec{v}\\times\\vec{u}=(-2,1,-4)$.', 'تتغير الإشارة: $\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$. فإذا كان $\\vec{u}\\times\\vec{v}=(2,-1,4)$ فإن $\\vec{v}\\times\\vec{u}=(-2,1,-4)$.', 'It changes sign: $\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$. If $\\vec{u}\\times\\vec{v}=(2,-1,4)$, then $\\vec{v}\\times\\vec{u}=(-2,1,-4)$.')
        },
        check: {
            prompt: say('$\\vec{u}\\times\\vec{v}=(3,0,-4)$ bada, zenbat da $\\vec{v}\\times(2\\vec{u})$?', 'Si $\\vec{u}\\times\\vec{v}=(3,0,-4)$, ¿cuánto vale $\\vec{v}\\times(2\\vec{u})$?', 'إذا كان $\\vec{u}\\times\\vec{v}=(3,0,-4)$ فكم يساوي $\\vec{v}\\times(2\\vec{u})$؟', 'If $\\vec{u}\\times\\vec{v}=(3,0,-4)$, what is $\\vec{v}\\times(2\\vec{u})$?'),
            options: [same('$(6,0,-8)$'), same('$(-6,0,8)$'), same('$(-3,0,4)$')],
            correctIndex: 1,
            explanation: same('$\\vec{v}\\times(2\\vec{u})=2\\,(\\vec{v}\\times\\vec{u})=-2\\,(3,0,-4)=(-6,0,8)$')
        }
    },
    'cross-area': {
        mistake: {
            wrong: say('$\\overrightarrow{AB}$ eta $\\overrightarrow{AC}$ aldeak dituen triangelua, $|\\overrightarrow{AB}\\times\\overrightarrow{AC}|=10$ izanik: $S=10$', 'Triángulo de lados $\\overrightarrow{AB}$ y $\\overrightarrow{AC}$, con $|\\overrightarrow{AB}\\times\\overrightarrow{AC}|=10$: $S=10$', 'مثلث ضلعاه $\\overrightarrow{AB}$ و$\\overrightarrow{AC}$ مع $|\\overrightarrow{AB}\\times\\overrightarrow{AC}|=10$: ‏$S=10$', 'Triangle with sides $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$, with $|\\overrightarrow{AB}\\times\\overrightarrow{AC}|=10$: $S=10$'),
            right: say('Hori paralelogramoa da. Triangelua erdia da: $S=\\frac{10}{2}=5$.', 'Eso es el paralelogramo. El triángulo es la mitad: $S=\\frac{10}{2}=5$.', 'هذه مساحة متوازي الأضلاع. والمثلث نصفه: $S=\\frac{10}{2}=5$.', 'That is the parallelogram. The triangle is half of it: $S=\\frac{10}{2}=5$.')
        },
        check: {
            prompt: say('$|\\overrightarrow{AB}\\times\\overrightarrow{AC}|=\\sqrt{56}$ bada, zein da $ABC$ triangeluaren azalera?', 'Si $|\\overrightarrow{AB}\\times\\overrightarrow{AC}|=\\sqrt{56}$, ¿cuál es el área del triángulo $ABC$?', 'إذا كان $|\\overrightarrow{AB}\\times\\overrightarrow{AC}|=\\sqrt{56}$ فما مساحة المثلث $ABC$؟', 'If $|\\overrightarrow{AB}\\times\\overrightarrow{AC}|=\\sqrt{56}$, what is the area of the triangle $ABC$?'),
            options: [same('$\\sqrt{56}$'), same('$\\frac{\\sqrt{56}}{2}$'), same('$28$')],
            correctIndex: 1,
            explanation: say('Paralelogramo erdia: $\\frac{\\sqrt{56}}{2}=\\sqrt{14}\\approx 3{,}74$.', 'Medio paralelogramo: $\\frac{\\sqrt{56}}{2}=\\sqrt{14}\\approx 3{,}74$.', 'نصف متوازي الأضلاع: $\\frac{\\sqrt{56}}{2}=\\sqrt{14}\\approx 3{,}74$.', 'Half the parallelogram: $\\frac{\\sqrt{56}}{2}=\\sqrt{14}\\approx 3{,}74$.')
        }
    },

    /* ---------- 5. The mixed product ---------- */
    'mixed-product': {
        mistake: {
            wrong: say('$[\\vec{u},\\vec{v},\\vec{w}]=8$ da; beraz, $[\\vec{w},\\vec{v},\\vec{u}]=8$', '$[\\vec{u},\\vec{v},\\vec{w}]=8$, así que $[\\vec{w},\\vec{v},\\vec{u}]=8$', '$[\\vec{u},\\vec{v},\\vec{w}]=8$، إذن $[\\vec{w},\\vec{v},\\vec{u}]=8$', '$[\\vec{u},\\vec{v},\\vec{w}]=8$, so $[\\vec{w},\\vec{v},\\vec{u}]=8$'),
            right: say('$\\vec{u}$ eta $\\vec{w}$ trukatu dira: zeinua aldatzen da, $[\\vec{w},\\vec{v},\\vec{u}]=-8$.', 'Se han intercambiado $\\vec{u}$ y $\\vec{w}$: cambia el signo, $[\\vec{w},\\vec{v},\\vec{u}]=-8$.', 'تبادل $\\vec{u}$ و$\\vec{w}$ موضعيهما: تتغير الإشارة، $[\\vec{w},\\vec{v},\\vec{u}]=-8$.', '$\\vec{u}$ and $\\vec{w}$ have been swapped: the sign changes, $[\\vec{w},\\vec{v},\\vec{u}]=-8$.')
        },
        check: {
            prompt: say('$[\\vec{u},\\vec{v},\\vec{w}]=5$ bada, zenbat da $[\\vec{v},\\vec{w},\\vec{u}]$?', 'Si $[\\vec{u},\\vec{v},\\vec{w}]=5$, ¿cuánto vale $[\\vec{v},\\vec{w},\\vec{u}]$?', 'إذا كان $[\\vec{u},\\vec{v},\\vec{w}]=5$ فكم يساوي $[\\vec{v},\\vec{w},\\vec{u}]$؟', 'If $[\\vec{u},\\vec{v},\\vec{w}]=5$, what is $[\\vec{v},\\vec{w},\\vec{u}]$?'),
            options: [same('$5$'), same('$-5$'), same('$\\frac{1}{5}$')],
            correctIndex: 0,
            explanation: say('Errotazio bat da (bi truke): zeinua bi aldiz aldatzen da, eta $5$ geratzen da.', 'Es una rotación (dos intercambios): el signo cambia dos veces y queda $5$.', 'إنه تدوير (تبديلان): تتغير الإشارة مرتين فيبقى $5$.', 'It is a rotation (two swaps): the sign changes twice and you are left with $5$.')
        }
    },
    'mixed-volume': {
        mistake: {
            wrong: say('$[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=-18$ duen tetraedroa: $V=-18$', 'Tetraedro con $[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=-18$: $V=-18$', 'رباعي أوجه فيه $[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=-18$: ‏$V=-18$', 'Tetrahedron with $[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=-18$: $V=-18$'),
            right: say('Bolumen bat ez da inoiz negatiboa, eta tetraedroa seirena da: $V=\\frac{|-18|}{6}=3$.', 'Un volumen nunca es negativo, y el tetraedro es la sexta parte: $V=\\frac{|-18|}{6}=3$.', 'الحجم لا يكون سالبًا أبدًا، ورباعي الأوجه سدسه: $V=\\frac{|-18|}{6}=3$.', 'A volume is never negative, and the tetrahedron is a sixth: $V=\\frac{|-18|}{6}=3$.')
        },
        check: {
            prompt: say('$[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=-30$ bada, zein da $ABCD$ tetraedroaren bolumena?', 'Si $[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=-30$, ¿cuál es el volumen del tetraedro $ABCD$?', 'إذا كان $[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=-30$ فما حجم رباعي الأوجه $ABCD$؟', 'If $[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=-30$, what is the volume of the tetrahedron $ABCD$?'),
            options: [same('$-5$'), same('$30$'), same('$5$')],
            correctIndex: 2,
            explanation: same('$V=\\frac{1}{6}\\cdot|-30|=5$')
        }
    },
    coplanar: {
        mistake: {
            wrong: say('$[\\vec{u},\\vec{v},\\vec{w}]=0$ da; beraz, bektoreetako bi paraleloak dira', '$[\\vec{u},\\vec{v},\\vec{w}]=0$, así que dos de los vectores son paralelos', '$[\\vec{u},\\vec{v},\\vec{w}]=0$، إذن اثنان من المتجهات متوازيان', '$[\\vec{u},\\vec{v},\\vec{w}]=0$, so two of the vectors are parallel'),
            right: say('Ez da beharrezkoa: nahikoa da plano batean egotea, $(1,0,0)$, $(0,1,0)$ eta $(1,1,0)$ bezala, paraleloak izan gabe.', 'No hace falta: basta con que estén en un plano, como $(1,0,0)$, $(0,1,0)$ y $(1,1,0)$, sin ser paralelos.', 'لا يلزم ذلك: يكفي أن تقع في مستوى واحد، مثل $(1,0,0)$ و$(0,1,0)$ و$(1,1,0)$، دون أن تكون متوازية.', 'Not necessarily: it is enough for them to lie in one plane, like $(1,0,0)$, $(0,1,0)$ and $(1,1,0)$, without being parallel.')
        },
        check: {
            prompt: say('$a$ parametroaren zein baliotarako dira planokideak $(1,0,1)$, $(0,1,1)$ eta $(1,1,a)$?', '¿Para qué valor de $a$ son coplanarios $(1,0,1)$, $(0,1,1)$ y $(1,1,a)$?', 'لأي قيمة لـ $a$ تكون $(1,0,1)$ و$(0,1,1)$ و$(1,1,a)$ مستوية؟', 'For which value of $a$ are $(1,0,1)$, $(0,1,1)$ and $(1,1,a)$ coplanar?'),
            options: [same('$a=0$'), same('$a=1$'), same('$a=2$')],
            correctIndex: 2,
            explanation: same('$[\\vec{u},\\vec{v},\\vec{w}]=a-1-1=a-2=0\\ \\to\\ a=2$')
        }
    }
}

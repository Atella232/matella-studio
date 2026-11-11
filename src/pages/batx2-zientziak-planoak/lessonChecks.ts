import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zuzenak eta planoak espazioan · Batxilergoa 2 · Zientziak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no
   JSX) so the tests can import it; lessons.tsx merges it into the
   topics. The questions use new numbers, never those of «Let's solve» or
   of the example, and one of their wrong answers is the lesson's typical
   mistake. A line or a plane in a question is named with a formula of
   its own ($r$:, $\pi$:), so the question is not read as one equation.
   ========================================================================== */

export type LinesPlanesTopicId =
    | 'line-parametric' | 'line-continuous' | 'implicit-to-parametric'
    | 'plane-parametric' | 'plane-general' | 'plane-three-points'
    | 'lines-parallel' | 'lines-cross' | 'lines-intersection'
    | 'line-plane-position' | 'line-plane-point' | 'pencil-planes'
    | 'two-planes' | 'three-planes' | 'planes-parameter'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const linesPlanesLessonChecks: Record<LinesPlanesTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Equations of a line ---------- */
    'line-parametric': {
        mistake: {
            wrong: say('$r$: $x=2+3t$, $y=-1+t$, ${z}=4-2t$ zuzena $(3,1,-2)$ puntutik pasatzen da', 'La recta $r$: $x=2+3t$, $y=-1+t$, ${z}=4-2t$ pasa por $(3,1,-2)$', 'المستقيم $r$: ‏$x=2+3t$ و$y=-1+t$ و${z}=4-2t$ يمر بـ $(3,1,-2)$', 'The line $r$: $x=2+3t$, $y=-1+t$, ${z}=4-2t$ passes through $(3,1,-2)$'),
            right: say('Hori norabide-bektorea da. Puntua $t=0$ eginez irakurtzen da: $(2,-1,4)$.', 'Ese es el vector director. El punto se lee con $t=0$: $(2,-1,4)$.', 'هذا متجه التوجيه. وتُقرأ النقطة بجعل $t=0$: ‏$(2,-1,4)$.', 'That is the direction vector. The point is read with $t=0$: $(2,-1,4)$.')
        },
        check: {
            prompt: say('Zein puntu dago $r$ zuzenean? $r$: $x=1-t$, $y=2+2t$, ${z}=3t$', '¿Qué punto está en $r$? $r$: $x=1-t$, $y=2+2t$, ${z}=3t$', 'أي نقطة تقع على $r$؟ $r$: ‏$x=1-t$ و$y=2+2t$ و${z}=3t$', 'Which point lies on $r$? $r$: $x=1-t$, $y=2+2t$, ${z}=3t$'),
            options: [same('$(0,4,3)$'), same('$(-1,2,3)$'), same('$(1,2,3)$')],
            correctIndex: 0,
            explanation: say('$t=1$ eginez: $(1-1,2+2,3)=(0,4,3)$.', 'Con $t=1$: $(1-1,2+2,3)=(0,4,3)$.', 'مع $t=1$: ‏$(1-1,2+2,3)=(0,4,3)$.', 'With $t=1$: $(1-1,2+2,3)=(0,4,3)$.')
        }
    },
    'line-continuous': {
        mistake: {
            wrong: say('$\\frac{x-1}{2}=\\frac{y+3}{4}=\\frac{{z}}{5}$ ekuaziotik $(1,3,0)$ puntua irakurtzen da', 'De $\\frac{x-1}{2}=\\frac{y+3}{4}=\\frac{{z}}{5}$ se lee el punto $(1,3,0)$', 'من $\\frac{x-1}{2}=\\frac{y+3}{4}=\\frac{{z}}{5}$ تُقرأ النقطة $(1,3,0)$', 'From $\\frac{x-1}{2}=\\frac{y+3}{4}=\\frac{{z}}{5}$ you read the point $(1,3,0)$'),
            right: say('Zeinua aldatuta irakurtzen da: $y+3=y-(-3)$; beraz, puntua $(1,-3,0)$ da.', 'Se lee con el signo cambiado: $y+3=y-(-3)$, así que el punto es $(1,-3,0)$.', 'تُقرأ بإشارة معاكسة: $y+3=y-(-3)$، فالنقطة $(1,-3,0)$.', 'It is read with the sign changed: $y+3=y-(-3)$, so the point is $(1,-3,0)$.')
        },
        check: {
            prompt: say('Zein da $r$ zuzenaren norabide-bektorea? $r$: $\\frac{x+2}{3}=\\frac{y}{-1}=\\frac{{z}-4}{2}$', '¿Qué vector director tiene $r$? $r$: $\\frac{x+2}{3}=\\frac{y}{-1}=\\frac{{z}-4}{2}$', 'ما متجه توجيه $r$؟ $r$: ‏$\\frac{x+2}{3}=\\frac{y}{-1}=\\frac{{z}-4}{2}$', 'What is the direction vector of $r$? $r$: $\\frac{x+2}{3}=\\frac{y}{-1}=\\frac{{z}-4}{2}$'),
            options: [same('$(-2,0,4)$'), same('$(3,-1,2)$'), same('$(2,0,-4)$')],
            correctIndex: 1,
            explanation: say('Izendatzaileak dira: $(3,-1,2)$. Zenbakitzaileek $(-2,0,4)$ puntua ematen dute.', 'Son los denominadores: $(3,-1,2)$. Los numeradores dan el punto $(-2,0,4)$.', 'إنها المقامات: $(3,-1,2)$. وتعطي البسوط النقطة $(-2,0,4)$.', 'They are the denominators: $(3,-1,2)$. The numerators give the point $(-2,0,4)$.')
        }
    },
    'implicit-to-parametric': {
        mistake: {
            wrong: say('$r$: $x+y=0$, ${z}=3$ zuzenaren norabide-bektorea $(1,1,0)$ da', 'El vector director de $r$: $x+y=0$, ${z}=3$ es $(1,1,0)$', 'متجه توجيه $r$: ‏$x+y=0$ و${z}=3$ هو $(1,1,0)$', 'The direction vector of $r$: $x+y=0$, ${z}=3$ is $(1,1,0)$'),
            right: say('Hori lehen planoaren normala da. Norabide-bektorea normalen biderkadura bektoriala da: $(1,1,0)\\times(0,0,1)=(1,-1,0)$.', 'Ese es el normal del primer plano. El director es el producto vectorial de los normales: $(1,1,0)\\times(0,0,1)=(1,-1,0)$.', 'هذا ناظم المستوى الأول. ومتجه التوجيه هو الجداء المتجهي للناظمين: $(1,1,0)\\times(0,0,1)=(1,-1,0)$.', 'That is the normal of the first plane. The direction is the cross product of the normals: $(1,1,0)\\times(0,0,1)=(1,-1,0)$.')
        },
        check: {
            prompt: say('Zein da $r$ zuzenaren norabide-bektorea? $r$: $x=2$, $y={z}$', '¿Qué vector director tiene $r$? $r$: $x=2$, $y={z}$', 'ما متجه توجيه $r$؟ $r$: ‏$x=2$ و$y={z}$', 'What is the direction vector of $r$? $r$: $x=2$, $y={z}$'),
            options: [same('$(1,0,0)$'), same('$(0,1,-1)$'), same('$(0,1,1)$')],
            correctIndex: 2,
            explanation: say('Normalak $(1,0,0)$ eta $(0,1,-1)$ dira: $(1,0,0)\\times(0,1,-1)=(0,1,1)$.', 'Los normales son $(1,0,0)$ y $(0,1,-1)$: $(1,0,0)\\times(0,1,-1)=(0,1,1)$.', 'الناظمان $(1,0,0)$ و$(0,1,-1)$: ‏$(1,0,0)\\times(0,1,-1)=(0,1,1)$.', 'The normals are $(1,0,0)$ and $(0,1,-1)$: $(1,0,0)\\times(0,1,-1)=(0,1,1)$.')
        }
    },

    /* ---------- 2. Equations of a plane ---------- */
    'plane-parametric': {
        mistake: {
            wrong: say('$(x,y,{z})=(1,0,2)+\\lambda(2,4,0)+\\mu(1,2,0)$ plano bat da', '$(x,y,{z})=(1,0,2)+\\lambda(2,4,0)+\\mu(1,2,0)$ es un plano', '$(x,y,{z})=(1,0,2)+\\lambda(2,4,0)+\\mu(1,2,0)$ مستوى', '$(x,y,{z})=(1,0,2)+\\lambda(2,4,0)+\\mu(1,2,0)$ is a plane'),
            right: say('Bi bektoreak paraleloak dira, $(2,4,0)=2\\,(1,2,0)$: hori zuzen bat da. Paraleloak ez diren bi norabide behar dira.', 'Los dos vectores son paralelos, $(2,4,0)=2\\,(1,2,0)$: eso es una recta. Hacen falta dos direcciones no paralelas.', 'المتجهان متوازيان، $(2,4,0)=2\\,(1,2,0)$: هذا مستقيم. يلزم اتجاهان غير متوازيين.', 'The two vectors are parallel, $(2,4,0)=2\\,(1,2,0)$: that is a line. You need two directions that are not parallel.')
        },
        check: {
            prompt: say('Zein puntu dago $\\pi$ planoan? $\\pi$: $(x,y,{z})=(1,1,1)+\\lambda(1,0,0)+\\mu(0,1,0)$', '¿Qué punto está en $\\pi$? $\\pi$: $(x,y,{z})=(1,1,1)+\\lambda(1,0,0)+\\mu(0,1,0)$', 'أي نقطة تقع في $\\pi$؟ $\\pi$: ‏$(x,y,{z})=(1,1,1)+\\lambda(1,0,0)+\\mu(0,1,0)$', 'Which point lies on $\\pi$? $\\pi$: $(x,y,{z})=(1,1,1)+\\lambda(1,0,0)+\\mu(0,1,0)$'),
            options: [same('$(1,1,0)$'), same('$(5,-2,1)$'), same('$(0,0,2)$')],
            correctIndex: 1,
            explanation: say('Planoaren puntu guztiek ${z}=1$ dute, eta $x$ eta $y$ edozein izan daitezke: $\\lambda=4$ eta $\\mu=-3$.', 'Todos sus puntos tienen ${z}=1$, y $x$ e $y$ pueden ser cualquiera: $\\lambda=4$ y $\\mu=-3$.', 'لكل نقاطه ${z}=1$، و$x$ و$y$ أيًا كانا: ‏$\\lambda=4$ و$\\mu=-3$.', 'All its points have ${z}=1$, and $x$ and $y$ can be anything: $\\lambda=4$ and $\\mu=-3$.')
        }
    },
    'plane-general': {
        mistake: {
            wrong: say('$2x-y+3{z}=5$ planoaren bektore normala $(2,-1,5)$ da', 'El plano $2x-y+3{z}=5$ tiene vector normal $(2,-1,5)$', 'المتجه الناظمي للمستوى $2x-y+3{z}=5$ هو $(2,-1,5)$', 'The plane $2x-y+3{z}=5$ has normal vector $(2,-1,5)$'),
            right: say('Normala $x$, $y$ eta ${z}$ aldagaien koefizienteak dira: $(2,-1,3)$. 5 zenbakiak planoa mugitu besterik ez du egiten.', 'El normal son los coeficientes de $x$, $y$ y ${z}$: $(2,-1,3)$. El 5 solo desplaza el plano.', 'الناظم هو معاملات $x$ و$y$ و${z}$: ‏$(2,-1,3)$. أما 5 فيزيح المستوى فقط.', 'The normal is the coefficients of $x$, $y$ and ${z}$: $(2,-1,3)$. The 5 only shifts the plane.')
        },
        check: {
            prompt: say('Zein da $\\pi$ planoaren bektore normal bat? $\\pi$: $x-4{z}+7=0$', '¿Cuál es un vector normal de $\\pi$? $\\pi$: $x-4{z}+7=0$', 'ما متجه ناظمي لـ $\\pi$؟ $\\pi$: ‏$x-4{z}+7=0$', 'What is a normal vector of $\\pi$? $\\pi$: $x-4{z}+7=0$'),
            options: [same('$(1,-4,7)$'), same('$(1,-4,0)$'), same('$(1,0,-4)$')],
            correctIndex: 2,
            explanation: say('$y$ aldagaia ez dago: haren koefizientea 0 da. Normala $(1,0,-4)$ da.', 'No aparece la $y$: su coeficiente es 0. El normal es $(1,0,-4)$.', 'لا يظهر $y$: معامله 0. فالناظم $(1,0,-4)$.', 'There is no $y$: its coefficient is 0. The normal is $(1,0,-4)$.')
        }
    },
    'plane-three-points': {
        mistake: {
            wrong: say('$A(1,1,1)$, $B(2,2,2)$ eta $C(3,3,3)$ puntuetatik plano bakar bat pasatzen da', 'Por $A(1,1,1)$, $B(2,2,2)$ y $C(3,3,3)$ pasa un único plano', 'يمر بـ $A(1,1,1)$ و$B(2,2,2)$ و$C(3,3,3)$ مستوى واحد فقط', 'A single plane passes through $A(1,1,1)$, $B(2,2,2)$ and $C(3,3,3)$'),
            right: say('Lerrokatuta daude, $\\overrightarrow{AC}=2\\,\\overrightarrow{AB}$: infinitu plano pasatzen dira. Hiru puntuk plano bakar bat ematen dute lerrokatuta ez badaude.', 'Están alineados, $\\overrightarrow{AC}=2\\,\\overrightarrow{AB}$: pasan infinitos planos. Tres puntos dan un único plano si no están alineados.', 'إنها على استقامة واحدة، $\\overrightarrow{AC}=2\\,\\overrightarrow{AB}$: تمر بها مستويات لا نهائية. وتعطي ثلاث نقاط مستوى واحدًا إذا لم تكن على استقامة واحدة.', 'They are collinear, $\\overrightarrow{AC}=2\\,\\overrightarrow{AB}$: infinitely many planes pass through them. Three points give one plane if they are not collinear.')
        },
        check: {
            prompt: say('Zein plano pasatzen da $(2,0,0)$, $(0,2,0)$ eta $(0,0,2)$ puntuetatik?', '¿Qué plano pasa por $(2,0,0)$, $(0,2,0)$ y $(0,0,2)$?', 'أي مستوى يمر بـ $(2,0,0)$ و$(0,2,0)$ و$(0,0,2)$؟', 'Which plane passes through $(2,0,0)$, $(0,2,0)$ and $(0,0,2)$?'),
            options: [same('$x+y+{z}=2$'), same('$x+y+{z}=0$'), same('$2x+2y+2{z}=1$')],
            correctIndex: 0,
            explanation: say('Hiru puntuek betetzen dute: $2+0+0=2$, eta berdin besteak.', 'Lo cumplen los tres puntos: $2+0+0=2$, y lo mismo los otros.', 'تحققه النقاط الثلاث: $2+0+0=2$، وكذلك الأخريان.', 'All three points satisfy it: $2+0+0=2$, and the same for the others.')
        }
    },

    /* ---------- 3. Two lines ---------- */
    'lines-parallel': {
        mistake: {
            wrong: say('Norabide-bektoreak proportzionalak dira; beraz, zuzenak bat datoz', 'Los directores son proporcionales, así que las rectas coinciden', 'متجها التوجيه متناسبان، إذن المستقيمان منطبقان', 'The direction vectors are proportional, so the lines coincide'),
            right: say('Paralelo desberdinak izan daitezke: zuzen bateko puntu bat bestean dagoen begiratu behar da.', 'Pueden ser paralelas distintas: hay que ver si un punto de una está en la otra.', 'قد يكونان متوازيين مختلفين: يجب أن ننظر هل تقع نقطة من أحدهما على الآخر.', 'They can be different parallel lines: you have to check whether a point of one lies on the other.')
        },
        check: {
            prompt: say('$r$: $(0,1,0)+t(1,1,1)$ eta $s$: $(2,3,2)+\\lambda(2,2,2)$. Nolakoak dira?', '$r$: $(0,1,0)+t(1,1,1)$ y $s$: $(2,3,2)+\\lambda(2,2,2)$. ¿Cómo son?', '$r$: ‏$(0,1,0)+t(1,1,1)$ و$s$: ‏$(2,3,2)+\\lambda(2,2,2)$. ما وضعهما؟', '$r$: $(0,1,0)+t(1,1,1)$ and $s$: $(2,3,2)+\\lambda(2,2,2)$. How are they?'),
            options: [
                say('Paraleloak', 'Paralelas', 'متوازيان', 'Parallel'),
                say('Bat datoz', 'Coincidentes', 'منطبقان', 'Coincident'),
                say('Gurutzatu egiten dira', 'Se cruzan', 'متخالفان', 'Skew')
            ],
            correctIndex: 1,
            explanation: say('Norabideak proportzionalak dira, eta $(2,3,2)$ puntua $r$ zuzenean dago $t=2$ denean.', 'Los directores son proporcionales, y $(2,3,2)$ está en $r$ con $t=2$.', 'الاتجاهان متناسبان، و$(2,3,2)$ تقع على $r$ عندما $t=2$.', 'The directions are proportional, and $(2,3,2)$ lies on $r$ with $t=2$.')
        }
    },
    'lines-cross': {
        mistake: {
            wrong: say('$\\vec{u}$ eta $\\vec{v}$ ez dira paraleloak; beraz, zuzenak ebakitzen dira', 'Como $\\vec{u}$ y $\\vec{v}$ no son paralelos, las rectas se cortan', 'بما أن $\\vec{u}$ و$\\vec{v}$ غير متوازيين فالمستقيمان متقاطعان', 'Since $\\vec{u}$ and $\\vec{v}$ are not parallel, the lines intersect'),
            right: say('Espazioan gurutzatu ere egin daitezke: ebakitzen dira $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$ bada bakarrik.', 'En el espacio también pueden cruzarse: se cortan solo si $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$.', 'في الفضاء قد يكونان متخالفين أيضًا: لا يتقاطعان إلا إذا كان $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$.', 'In space they can also be skew: they intersect only if $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=0$.')
        },
        check: {
            prompt: say('$\\vec{u}$ eta $\\vec{v}$ ez dira paraleloak, eta $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=5$. Zuzenak:', '$\\vec{u}$ y $\\vec{v}$ no son paralelos y $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=5$. Las rectas:', '$\\vec{u}$ و$\\vec{v}$ غير متوازيين و$[\\overrightarrow{AB},\\vec{u},\\vec{v}]=5$. المستقيمان:', '$\\vec{u}$ and $\\vec{v}$ are not parallel and $[\\overrightarrow{AB},\\vec{u},\\vec{v}]=5$. The lines:'),
            options: [
                say('ebakitzen dira', 'se cortan', 'متقاطعان', 'intersect'),
                say('paraleloak dira', 'son paralelas', 'متوازيان', 'are parallel'),
                say('gurutzatu egiten dira', 'se cruzan', 'متخالفان', 'are skew')
            ],
            correctIndex: 2,
            explanation: say('Biderkadura mistoa ez da 0: ez daude plano berean, beraz, gurutzatu egiten dira.', 'El producto mixto no es 0: no están en un mismo plano, así que se cruzan.', 'الجداء المختلط ليس 0: ليسا في مستوى واحد، فهما متخالفان.', 'The scalar triple product is not 0: they are not in one plane, so they are skew.')
        }
    },
    'lines-intersection': {
        mistake: {
            wrong: say('$r$: $(1,0,0)+t(1,2,0)$ eta $s$: $(0,1,0)+t(2,1,0)$ ebakitzeko, $1+t=2t$', 'Para cortar $r$: $(1,0,0)+t(1,2,0)$ y $s$: $(0,1,0)+t(2,1,0)$, $1+t=2t$', 'لتقاطع $r$: ‏$(1,0,0)+t(1,2,0)$ و$s$: ‏$(0,1,0)+t(2,1,0)$، ‏$1+t=2t$', 'To intersect $r$: $(1,0,0)+t(1,2,0)$ and $s$: $(0,1,0)+t(2,1,0)$, $1+t=2t$'),
            right: say('Zuzen bakoitzak bere parametroa du: $1+t=2\\lambda$, $2t=1+\\lambda$.', 'Cada recta tiene su parámetro: $1+t=2\\lambda$, $2t=1+\\lambda$.', 'لكل مستقيم وسيطه: $1+t=2\\lambda$ و$2t=1+\\lambda$.', 'Each line has its own parameter: $1+t=2\\lambda$, $2t=1+\\lambda$.')
        },
        check: {
            prompt: say('$r$: $(t,t,1)$ eta $s$: $(2,1+\\lambda,\\lambda)$. Non ebakitzen dira?', '$r$: $(t,t,1)$ y $s$: $(2,1+\\lambda,\\lambda)$. ¿Dónde se cortan?', '$r$: ‏$(t,t,1)$ و$s$: ‏$(2,1+\\lambda,\\lambda)$. أين يتقاطعان؟', '$r$: $(t,t,1)$ and $s$: $(2,1+\\lambda,\\lambda)$. Where do they meet?'),
            options: [same('$(1,1,1)$'), same('$(2,1,0)$'), same('$(2,2,1)$')],
            correctIndex: 2,
            explanation: say('$t=2$ eta $t=1+\\lambda$, beraz, $\\lambda=1$; eta ${z}$: $1=\\lambda$. Puntua $(2,2,1)$ da.', '$t=2$ y $t=1+\\lambda$, así que $\\lambda=1$; y la ${z}$: $1=\\lambda$. El punto es $(2,2,1)$.', '$t=2$ و$t=1+\\lambda$، إذن $\\lambda=1$؛ و${z}$: ‏$1=\\lambda$. النقطة $(2,2,1)$.', '$t=2$ and $t=1+\\lambda$, so $\\lambda=1$; and the ${z}$: $1=\\lambda$. The point is $(2,2,1)$.')
        }
    },

    /* ---------- 4. A line and a plane ---------- */
    'line-plane-position': {
        mistake: {
            wrong: say('$\\vec{u}\\parallel\\vec{n}$ bada, zuzena planoaren paraleloa da', 'Si $\\vec{u}\\parallel\\vec{n}$, la recta es paralela al plano', 'إذا كان $\\vec{u}\\parallel\\vec{n}$ فالمستقيم موازٍ للمستوى', 'If $\\vec{u}\\parallel\\vec{n}$, the line is parallel to the plane'),
            right: say('$\\vec{u}\\parallel\\vec{n}$ bada, zuzena planoarekiko perpendikularra da. Paraleloa da $\\vec{u}\\cdot\\vec{n}=0$ bada.', 'Si $\\vec{u}\\parallel\\vec{n}$, la recta es perpendicular al plano. Es paralela si $\\vec{u}\\cdot\\vec{n}=0$.', 'إذا كان $\\vec{u}\\parallel\\vec{n}$ فالمستقيم عمودي على المستوى. ويكون موازيًا إذا كان $\\vec{u}\\cdot\\vec{n}=0$.', 'If $\\vec{u}\\parallel\\vec{n}$, the line is perpendicular to the plane. It is parallel if $\\vec{u}\\cdot\\vec{n}=0$.')
        },
        check: {
            prompt: say('$\\vec{u}\\cdot\\vec{n}=3$ bada, zuzena eta planoa:', 'Si $\\vec{u}\\cdot\\vec{n}=3$, la recta y el plano:', 'إذا كان $\\vec{u}\\cdot\\vec{n}=3$ فإن المستقيم والمستوى:', 'If $\\vec{u}\\cdot\\vec{n}=3$, the line and the plane:'),
            options: [
                say('paraleloak dira', 'son paralelos', 'متوازيان', 'are parallel'),
                say('puntu batean ebakitzen dira', 'se cortan en un punto', 'يتقاطعان في نقطة', 'meet at a point'),
                say('zuzena planoan dago', 'la recta está en el plano', 'المستقيم داخل المستوى', 'the line lies in the plane')
            ],
            correctIndex: 1,
            explanation: say('$\\vec{u}\\cdot\\vec{n}\\neq 0$: zuzenak planoa zeharkatzen du, puntu bakar batean.', '$\\vec{u}\\cdot\\vec{n}\\neq 0$: la recta atraviesa el plano, en un solo punto.', '$\\vec{u}\\cdot\\vec{n}\\neq 0$: يخترق المستقيم المستوى في نقطة واحدة.', '$\\vec{u}\\cdot\\vec{n}\\neq 0$: the line goes through the plane, at a single point.')
        }
    },
    'line-plane-point': {
        mistake: {
            wrong: say('Ordezkatuz $t=2$ ateratzen da: ebaki-puntua $t=2$ da', 'Al sustituir sale $t=2$: el punto de corte es $t=2$', 'بالتعويض نحصل على $t=2$: نقطة التقاطع هي $t=2$', 'Substituting gives $t=2$: the meeting point is $t=2$'),
            right: say('$t$ parametroa da: zuzenean ordezkatu behar da puntua lortzeko.', '$t$ es el parámetro: hay que sustituirlo en la recta para tener el punto.', '$t$ هو الوسيط: يجب تعويضه في المستقيم للحصول على النقطة.', '$t$ is the parameter: you have to put it into the line to get the point.')
        },
        check: {
            prompt: say('Non ebakitzen du $r$: $(t,1,t)$ zuzenak $\\pi$: $x+{z}=4$ planoa?', '¿Dónde corta $r$: $(t,1,t)$ al plano $\\pi$: $x+{z}=4$?', 'أين يقطع $r$: ‏$(t,1,t)$ المستوى $\\pi$: ‏$x+{z}=4$؟', 'Where does $r$: $(t,1,t)$ meet the plane $\\pi$: $x+{z}=4$?'),
            options: [same('$(4,1,4)$'), same('$(2,1,2)$'), same('$(2,2,2)$')],
            correctIndex: 1,
            explanation: same('$t+t=4\\ \\to\\ t=2\\ \\to\\ (2,1,2)$')
        }
    },
    'pencil-planes': {
        mistake: {
            wrong: say('Plano-sorta bateko plano guztiak paraleloak dira', 'Todos los planos de un haz son paralelos', 'كل مستويات الحزمة متوازية', 'All the planes of a pencil are parallel'),
            right: say('Zuzen batena den sortako plano guztiek zuzena dute: haren inguruan biratzen dira, liburu baten orriak bezala.', 'Los planos del haz de una recta la contienen todos: giran a su alrededor como las páginas de un libro.', 'كل مستويات حزمة مستقيم تحتويه: تدور حوله كصفحات كتاب.', 'The planes of the pencil of a line all contain it: they turn around it like the pages of a book.')
        },
        check: {
            prompt: say('Zein planok du $r$ zuzena? $r$: $x=0$, $y=0$', '¿Qué plano contiene a $r$? $r$: $x=0$, $y=0$', 'أي مستوى يحتوي $r$؟ $r$: ‏$x=0$ و$y=0$', 'Which plane contains $r$? $r$: $x=0$, $y=0$'),
            options: [same('${z}=0$'), same('$x+y=1$'), same('$x+y=0$')],
            correctIndex: 2,
            explanation: say('$r$ zuzena ${z}$ ardatza da; $x+y=0$ planoa sortakoa da: $1\\cdot x+1\\cdot y=0$.', '$r$ es el eje ${z}$; $x+y=0$ es del haz: $1\\cdot x+1\\cdot y=0$.', '$r$ هو المحور ${z}$؛ و$x+y=0$ من الحزمة: $1\\cdot x+1\\cdot y=0$.', '$r$ is the ${z}$ axis; $x+y=0$ belongs to the pencil: $1\\cdot x+1\\cdot y=0$.')
        }
    },

    /* ---------- 5. Position of planes ---------- */
    'two-planes': {
        mistake: {
            wrong: say('$(1,2,-1)$ eta $(2,1,-1)$ normalak ez dira proportzionalak: planoak paraleloak dira', 'Los normales $(1,2,-1)$ y $(2,1,-1)$ no son proporcionales: los planos son paralelos', 'الناظمان $(1,2,-1)$ و$(2,1,-1)$ غير متناسبين: المستويان متوازيان', 'The normals $(1,2,-1)$ and $(2,1,-1)$ are not proportional: the planes are parallel'),
            right: say('Normalak proportzionalak ez badira, planoek zuzen batean ebakitzen dute elkar.', 'Si los normales no son proporcionales, los planos se cortan en una recta.', 'إذا لم يتناسب الناظمان تقاطع المستويان في مستقيم.', 'If the normals are not proportional, the planes meet in a line.')
        },
        check: {
            prompt: say('$\\pi_1$: $x-2y+{z}=3$ eta $\\pi_2$: $3x-6y+3{z}=9$. Nolakoak dira?', '$\\pi_1$: $x-2y+{z}=3$ y $\\pi_2$: $3x-6y+3{z}=9$. ¿Cómo son?', '$\\pi_1$: ‏$x-2y+{z}=3$ و$\\pi_2$: ‏$3x-6y+3{z}=9$. ما وضعهما؟', '$\\pi_1$: $x-2y+{z}=3$ and $\\pi_2$: $3x-6y+3{z}=9$. How are they?'),
            options: [
                say('Bat datoz', 'Coincidentes', 'منطبقان', 'Coincident'),
                say('Paraleloak', 'Paralelos', 'متوازيان', 'Parallel'),
                say('Ebakitzaileak', 'Secantes', 'متقاطعان', 'Intersecting')
            ],
            correctIndex: 0,
            explanation: say('Ekuazio osoa 3 zenbakiaz biderkatuta dago: $3\\cdot 3=9$. Plano bera da.', 'Toda la ecuación está multiplicada por 3: $3\\cdot 3=9$. Es el mismo plano.', 'المعادلة كلها مضروبة في 3: ‏$3\\cdot 3=9$. إنه المستوى نفسه.', 'The whole equation is multiplied by 3: $3\\cdot 3=9$. It is the same plane.')
        }
    },
    'three-planes': {
        mistake: {
            wrong: say('$\\operatorname{rg}M=2$ eta $\\operatorname{rg}M^*=3$: hiru planoek zuzen batean ebakitzen dute elkar', '$\\operatorname{rg}M=2$ y $\\operatorname{rg}M^*=3$: los tres planos se cortan en una recta', '$\\operatorname{rg}M=2$ و$\\operatorname{rg}M^*=3$: تتقاطع المستويات الثلاثة في مستقيم', '$\\operatorname{rg}M=2$ and $\\operatorname{rg}M^*=3$: the three planes meet in a line'),
            right: say('$\\operatorname{rg}M^*=3$ denean sistema bateraezina da: ez dago puntu komunik.', 'Con $\\operatorname{rg}M^*=3$ el sistema es incompatible: no hay ningún punto común.', 'مع $\\operatorname{rg}M^*=3$ يكون النظام مستحيلًا: لا توجد نقطة مشتركة.', 'With $\\operatorname{rg}M^*=3$ the system has no solution: there is no common point.')
        },
        check: {
            prompt: say('Hiru planoren sisteman, $\\operatorname{rg}M=3$. Planoak:', 'En el sistema de tres planos, $\\operatorname{rg}M=3$. Los planos:', 'في نظام ثلاثة مستويات $\\operatorname{rg}M=3$. المستويات:', 'In the system of three planes, $\\operatorname{rg}M=3$. The planes:'),
            options: [
                say('zuzen batean ebakitzen dira', 'se cortan en una recta', 'تتقاطع في مستقيم', 'meet in a line'),
                say('ez dute puntu komunik', 'no tienen puntos comunes', 'لا نقاط مشتركة لها', 'have no common point'),
                say('puntu batean ebakitzen dira', 'se cortan en un punto', 'تتقاطع في نقطة', 'meet at a point')
            ],
            correctIndex: 2,
            explanation: say('Heina 3 bada, sistema bateragarri determinatua da: soluzio bakarra, puntu bat.', 'Con rango 3 el sistema es compatible determinado: una sola solución, un punto.', 'مع رتبة 3 يكون النظام محددًا: حل واحد، أي نقطة.', 'With rank 3 the system has exactly one solution: a point.')
        }
    },
    'planes-parameter': {
        mistake: {
            wrong: say('$\\det M=0$ da; beraz, hiru planoek zuzen batean ebakitzen dute elkar', '$\\det M=0$, así que los tres planos se cortan en una recta', '$\\det M=0$، إذن تتقاطع المستويات الثلاثة في مستقيم', '$\\det M=0$, so the three planes meet in a line'),
            right: say('$\\det M=0$ datuak $\\operatorname{rg}M<3$ esaten du bakarrik: $\\operatorname{rg}M^*$ begiratu behar da. 3 bada, ez dago puntu komunik.', '$\\det M=0$ solo dice que $\\operatorname{rg}M<3$: hay que mirar $\\operatorname{rg}M^*$. Si es 3, no hay puntos comunes.', '$\\det M=0$ يقول فقط إن $\\operatorname{rg}M<3$: يجب النظر في $\\operatorname{rg}M^*$. وإذا كانت 3 فلا نقاط مشتركة.', '$\\det M=0$ only says $\\operatorname{rg}M<3$: you have to look at $\\operatorname{rg}M^*$. If it is 3, there is no common point.')
        },
        check: {
            prompt: say('$\\det M=a-2$ da. $a$ parametroaren zein baliotarako ebakitzen dute hiru planoek puntu bakar batean?', '$\\det M=a-2$. ¿Para qué valores de $a$ se cortan los tres planos en un solo punto?', '$\\det M=a-2$. لأي قيم لـ $a$ تتقاطع المستويات الثلاثة في نقطة واحدة؟', '$\\det M=a-2$. For which values of $a$ do the three planes meet at a single point?'),
            options: [same('$a=2$'), same('$a\\neq 2$'), say('Ezein baliotarako', 'Para ninguno', 'لا قيمة', 'For none')],
            correctIndex: 1,
            explanation: say('Puntu bakarra $\\operatorname{rg}M=3$ denean, hau da, $\\det M\\neq 0$: $a\\neq 2$.', 'Un solo punto cuando $\\operatorname{rg}M=3$, es decir, $\\det M\\neq 0$: $a\\neq 2$.', 'نقطة واحدة عندما $\\operatorname{rg}M=3$، أي $\\det M\\neq 0$: ‏$a\\neq 2$.', 'A single point when $\\operatorname{rg}M=3$, that is, $\\det M\\neq 0$: $a\\neq 2$.')
        }
    }
}

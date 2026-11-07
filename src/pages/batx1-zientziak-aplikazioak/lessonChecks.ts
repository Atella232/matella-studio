import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 1 · Zientziak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no
   JSX) so the tests can import it; lessons.tsx merges it into the topics.
   The questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical
   mistake: the sign of f instead of f′, intervals that jump over a point
   outside the domain, f′ > 0 required everywhere, «f′ = 0 is an
   extremum» (x³), f″ > 0 read as a maximum, the height put into f′, f′ in
   place of f″ for concavity, «f″ = 0 is an inflection» (x⁴), f′ in place
   of f″ for an inflection, the ends of [a, b] forgotten, two variables
   left in the function, x given instead of the value asked for, the
   branches of an odd polynomial, a point outside the domain read as an
   extremum and ln x defined at 0. Every prompt carries two formulas, so
   that the shared test does not take a whole interval for a point.
   ========================================================================== */

export type BachApplicationsTopicId =
    | 'sign-monotony' | 'intervals' | 'always-increasing'
    | 'singular-points' | 'second-derivative' | 'extreme-coefficients'
    | 'concavity' | 'inflection' | 'inflection-coefficients'
    | 'absolute-extremes' | 'geometry' | 'contexts'
    | 'polynomial-graph' | 'rational-graph' | 'exp-log-graph'

export const bachApplicationsLessonChecks: Record<BachApplicationsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Increase and decrease ---------- */
    'sign-monotony': {
        mistake: {
            wrong: say('$f(a)>0$ bada, $f$ gorakorra da $a$ puntuan.', 'Si $f(a)>0$, $f$ crece en $a$.', 'إذا كان $f(a)>0$ فإن $f$ متزايدة عند $a$.', 'If $f(a)>0$, $f$ is increasing at $a$.'),
            right: say('Hazkundea $f\'(a)$ balioaren zeinuak ematen du, ez $f(a)$ balioarenak: funtzio bat positiboa izan daiteke eta jaisten egon.', 'El crecimiento lo da el signo de $f\'(a)$, no el de $f(a)$: una función puede ser positiva y estar bajando.', 'يحدد التزايدَ إشارةُ $f\'(a)$ لا إشارة $f(a)$: قد تكون الدالة موجبة وهي نازلة.', 'Growth comes from the sign of $f\'(a)$, not of $f(a)$: a function can be positive and still be going down.')
        },
        check: {
            prompt: say('$f\'(x)=2x-8$ bada, nolakoa da $f$ funtzioa $x=3$ puntuan?', 'Si $f\'(x)=2x-8$, ¿cómo es $f$ en $x=3$?', 'إذا كانت $f\'(x)=2x-8$ فكيف تكون $f$ عند $x=3$؟', 'If $f\'(x)=2x-8$, what is $f$ like at $x=3$?'),
            options: [say('Gorakorra', 'Creciente', 'متزايدة', 'Increasing'), say('Beherakorra', 'Decreciente', 'متناقصة', 'Decreasing'), say('Maximo bat du', 'Tiene un máximo', 'لها قيمة عظمى', 'It has a maximum')],
            correctIndex: 1,
            explanation: say('$f\'(3)=6-8=-2$ negatiboa da: beherakorra.', '$f\'(3)=6-8=-2$ es negativa: decrece.', '$f\'(3)=6-8=-2$ سالبة: متناقصة.', '$f\'(3)=6-8=-2$ is negative: decreasing.')
        }
    },
    intervals: {
        mistake: {
            wrong: say('$\\frac{1}{x}$ beherakorra da $(-\\infty,\\,+\\infty)$ tartean.', '$\\frac{1}{x}$ decrece en $(-\\infty,\\,+\\infty)$.', '$\\frac{1}{x}$ متناقصة في $(-\\infty,\\,+\\infty)$.', '$\\frac{1}{x}$ decreases on $(-\\infty,\\,+\\infty)$.'),
            right: say('0 ez dago izate-eremuan: beherakorra da $(-\\infty,\\,0)$ tartean eta $(0,\\,+\\infty)$ tartean, bakoitza bere aldetik.', 'El 0 no está en el dominio: decrece en $(-\\infty,\\,0)$ y en $(0,\\,+\\infty)$, por separado.', 'العدد 0 ليس في المجال: تتناقص في $(-\\infty,\\,0)$ وفي $(0,\\,+\\infty)$ كلٌّ على حدة.', '0 is not in the domain: it decreases on $(-\\infty,\\,0)$ and on $(0,\\,+\\infty)$, separately.')
        },
        check: {
            prompt: say('$f\'(x)=\\frac{x-3}{x^2}$ bada, non da beherakorra $f$?', 'Si $f\'(x)=\\frac{x-3}{x^2}$, ¿dónde decrece $f$?', 'إذا كانت $f\'(x)=\\frac{x-3}{x^2}$ فأين تتناقص $f$؟', 'If $f\'(x)=\\frac{x-3}{x^2}$, where does $f$ decrease?'),
            options: [same('$(-\\infty,\\,3)$'), same('$(-\\infty,\\,0)\\cup(0,\\,3)$'), same('$(3,\\,+\\infty)$')],
            correctIndex: 1,
            explanation: say('$f\'<0$ da $x<3$ denean, baina 0 izate-eremutik kanpo dago eta tartea zatitzen du.', '$f\'<0$ si $x<3$, pero el 0 queda fuera del dominio y parte el intervalo.', '$f\'<0$ عندما $x<3$، لكن العدد 0 خارج المجال ويقسم الفترة.', '$f\'<0$ when $x<3$, but 0 is outside the domain and splits the interval.')
        }
    },
    'always-increasing': {
        mistake: {
            wrong: say('$f$ funtzioa $\\mathbb{R}$ osoan gorakorra izateko, $f\'(x)>0$ behar da puntu guztietan.', 'Para que $f$ crezca en todo $\\mathbb{R}$ hace falta $f\'(x)>0$ en todos los puntos.', 'كي تتزايد $f$ في كل $\\mathbb{R}$ يلزم $f\'(x)>0$ عند كل النقاط.', 'For $f$ to increase on all of $\\mathbb{R}$, you need $f\'(x)>0$ at every point.'),
            right: say('Nahikoa da $f\'(x)\\ge 0$, zero solteekin: $x^3$ gorakorra da, eta $f\'(0)=0$.', 'Basta $f\'(x)\\ge 0$ con ceros sueltos: $x^3$ crece, y $f\'(0)=0$.', 'يكفي $f\'(x)\\ge 0$ مع أصفار منفردة: $x^3$ متزايدة، و$f\'(0)=0$.', '$f\'(x)\\ge 0$ with isolated zeros is enough: $x^3$ increases, and $f\'(0)=0$.')
        },
        check: {
            prompt: say('$a$ parametroaren zer baliotarako da gorakorra $\\mathbb{R}$ osoan $f(x)=x^3+ax$ funtzioa?', '¿Para qué valores de $a$ es creciente en todo $\\mathbb{R}$ la función $f(x)=x^3+ax$?', 'ما قيم $a$ التي تكون فيها $f(x)=x^3+ax$ متزايدة في كل $\\mathbb{R}$؟', 'For which values of $a$ is $f(x)=x^3+ax$ increasing on all of $\\mathbb{R}$?'),
            options: [same('$a>0$'), same('$a\\ge 0$'), same('$a\\le 0$')],
            correctIndex: 1,
            explanation: say('$f\'(x)=3x^2+a\\ge 0$ beti, $a\\ge 0$ bada; $a=0$ denean, 0 puntuan bakarrik anulatzen da.', '$f\'(x)=3x^2+a\\ge 0$ siempre si $a\\ge 0$; con $a=0$, solo se anula en 0.', '$f\'(x)=3x^2+a\\ge 0$ دائمًا إذا كان $a\\ge 0$؛ ومع $a=0$ لا تنعدم إلا عند 0.', '$f\'(x)=3x^2+a\\ge 0$ always if $a\\ge 0$; with $a=0$, it is zero only at 0.')
        }
    },

    /* ---------- 2. Maxima and minima ---------- */
    'singular-points': {
        mistake: {
            wrong: say('$f\'(a)=0$ bada, maximo edo minimo bat dago $a$ puntuan.', 'Si $f\'(a)=0$, en $a$ hay un máximo o un mínimo.', 'إذا كان $f\'(a)=0$ فعند $a$ قيمة عظمى أو صغرى.', 'If $f\'(a)=0$, there is a maximum or a minimum at $a$.'),
            right: say('$f\'$ deribatuak zeinua aldatu behar du: $x^3$ funtzioak $f\'(0)=0$ du, eta ez du muturrik.', 'Hace falta que $f\'$ cambie de signo: $x^3$ tiene $f\'(0)=0$ y no tiene extremo.', 'يلزم أن تغير $f\'$ إشارتها: لـ $x^3$ يكون $f\'(0)=0$ ولا قيمة قصوى لها.', '$f\'$ must change sign: $x^3$ has $f\'(0)=0$ and no extremum.')
        },
        check: {
            prompt: say('Zer du $f(x)=x^3+2$ funtzioak $x=0$ puntuan?', '¿Qué tiene $f(x)=x^3+2$ en $x=0$?', 'ماذا للدالة $f(x)=x^3+2$ عند $x=0$؟', 'What does $f(x)=x^3+2$ have at $x=0$?'),
            options: [say('Maximo bat', 'Un máximo', 'قيمة عظمى', 'A maximum'), say('Minimo bat', 'Un mínimo', 'قيمة صغرى', 'A minimum'), say('Ez maximorik ez minimorik', 'Ni máximo ni mínimo', 'لا عظمى ولا صغرى', 'Neither a maximum nor a minimum')],
            correctIndex: 2,
            explanation: say('$f\'(x)=3x^2$ positiboa da 0 puntuaren bi aldeetan: ez du zeinurik aldatzen.', '$f\'(x)=3x^2$ es positiva a los dos lados de 0: no cambia de signo.', '$f\'(x)=3x^2$ موجبة على جانبي 0: لا تغير إشارتها.', '$f\'(x)=3x^2$ is positive on both sides of 0: it does not change sign.')
        }
    },
    'second-derivative': {
        mistake: {
            wrong: say('$f\'(a)=0$ eta $f\'\'(a)>0$ badira, maximo bat dago.', 'Si $f\'(a)=0$ y $f\'\'(a)>0$, hay un máximo.', 'إذا كان $f\'(a)=0$ و$f\'\'(a)>0$ فهناك قيمة عظمى.', 'If $f\'(a)=0$ and $f\'\'(a)>0$, there is a maximum.'),
            right: say('Alderantziz: $f\'\'(a)>0$ ∪ forma da, minimo bat; $f\'\'(a)<0$ ∩ forma da, maximo bat.', 'Al revés: $f\'\'(a)>0$ es forma ∪, un mínimo; $f\'\'(a)<0$ es ∩, un máximo.', 'العكس: $f\'\'(a)>0$ شكل ∪ أي قيمة صغرى، و$f\'\'(a)<0$ شكل ∩ أي قيمة عظمى.', 'The other way round: $f\'\'(a)>0$ is the shape ∪, a minimum; $f\'\'(a)<0$ is ∩, a maximum.')
        },
        check: {
            prompt: say('$f\'(2)=0$ eta $f\'\'(2)=-5$ badira, zer dago $x=2$ puntuan?', 'Si $f\'(2)=0$ y $f\'\'(2)=-5$, ¿qué hay en $x=2$?', 'إذا كان $f\'(2)=0$ و$f\'\'(2)=-5$ فماذا يوجد عند $x=2$؟', 'If $f\'(2)=0$ and $f\'\'(2)=-5$, what is there at $x=2$?'),
            options: [say('Maximo bat', 'Un máximo', 'قيمة عظمى', 'A maximum'), say('Minimo bat', 'Un mínimo', 'قيمة صغرى', 'A minimum'), say('Inflexio bat', 'Una inflexión', 'انعطاف', 'An inflection')],
            correctIndex: 0,
            explanation: say('$f\'\'(2)<0$: kurba ∩ da han, eta zuzen ukitzaile horizontala gailurrean dago.', '$f\'\'(2)<0$: la curva es ∩ allí, y la tangente horizontal está en la cima.', '$f\'\'(2)<0$: المنحنى ∩ هناك، والمماس الأفقي في القمة.', '$f\'\'(2)<0$: the curve is ∩ there, and the horizontal tangent is at the peak.')
        }
    },
    'extreme-coefficients': {
        mistake: {
            wrong: say('Minimoa $(2,\\,-1)$ puntuan: $f\'(2)=-1$.', 'Mínimo en $(2,\\,-1)$: $f\'(2)=-1$.', 'قيمة صغرى عند $(2,\\,-1)$: $f\'(2)=-1$.', 'A minimum at $(2,\\,-1)$: $f\'(2)=-1$.'),
            right: say('$-1$ altuera da: $f(2)=-1$. Deribatuak $f\'(2)=0$ ematen du.', 'El $-1$ es la altura: $f(2)=-1$. La derivada da $f\'(2)=0$.', '$-1$ هو الارتفاع: $f(2)=-1$. والمشتقة تعطي $f\'(2)=0$.', 'The $-1$ is the height: $f(2)=-1$. The derivative gives $f\'(2)=0$.')
        },
        check: {
            prompt: say('$f(x)=x^2+bx$ funtzioak minimo bat du $x=4$ puntuan. Zenbat da $b$?', '$f(x)=x^2+bx$ tiene un mínimo en $x=4$. ¿Cuánto vale $b$?', 'للدالة $f(x)=x^2+bx$ قيمة صغرى عند $x=4$. كم تساوي $b$؟', '$f(x)=x^2+bx$ has a minimum at $x=4$. What is $b$?'),
            options: [same('$-4$'), same('$-8$'), same('$8$')],
            correctIndex: 1,
            explanation: say('$f\'(4)=8+b=0$; beraz, $b=-8$.', '$f\'(4)=8+b=0$, así que $b=-8$.', '$f\'(4)=8+b=0$، إذن $b=-8$.', '$f\'(4)=8+b=0$, so $b=-8$.')
        }
    },

    /* ---------- 3. Concavity ---------- */
    concavity: {
        mistake: {
            wrong: say('$f\'>0$ bada, kurba ahurra da (∪).', 'Si $f\'>0$, la curva es cóncava (∪).', 'إذا كان $f\'>0$ فالمنحنى مقعّر نحو الأعلى (∪).', 'If $f\'>0$, the curve is concave up (∪).'),
            right: say('Horrek gorakorra dela esaten du. Kurbadura $f\'\'$ deribatuak ematen du: $\\sqrt{x}$ gorakorra eta ganbila da (∩).', 'Eso dice que crece. La curvatura la da $f\'\'$: $\\sqrt{x}$ crece y es convexa (∩).', 'هذا يعني أنها متزايدة. التقعّر تحدده $f\'\'$: $\\sqrt{x}$ متزايدة ومقعّرة نحو الأسفل (∩).', 'That says it increases. The concavity comes from $f\'\'$: $\\sqrt{x}$ increases and is concave down (∩).')
        },
        check: {
            prompt: say('$f\'\'(x)=x-4$ bada, nolakoa da $f$ funtzioa $x=1$ puntuan?', 'Si $f\'\'(x)=x-4$, ¿cómo es $f$ en $x=1$?', 'إذا كانت $f\'\'(x)=x-4$ فكيف تكون $f$ عند $x=1$؟', 'If $f\'\'(x)=x-4$, what is $f$ like at $x=1$?'),
            options: [say('Ahurra (∪)', 'Cóncava (∪)', 'مقعّرة نحو الأعلى (∪)', 'Concave up (∪)'), say('Ganbila (∩)', 'Convexa (∩)', 'مقعّرة نحو الأسفل (∩)', 'Concave down (∩)'), say('Zuzena', 'Recta', 'مستقيمة', 'Straight')],
            correctIndex: 1,
            explanation: say('$f\'\'(1)=1-4=-3$ negatiboa da: ganbila (∩).', '$f\'\'(1)=1-4=-3$ es negativa: convexa (∩).', '$f\'\'(1)=1-4=-3$ سالبة: مقعّرة نحو الأسفل (∩).', '$f\'\'(1)=1-4=-3$ is negative: concave down (∩).')
        }
    },
    inflection: {
        mistake: {
            wrong: say('$f\'\'(a)=0$ bada, inflexio-puntu bat dago $a$ puntuan.', 'Si $f\'\'(a)=0$, hay un punto de inflexión en $a$.', 'إذا كان $f\'\'(a)=0$ فعند $a$ نقطة انعطاف.', 'If $f\'\'(a)=0$, there is a point of inflection at $a$.'),
            right: say('$f\'\'$ deribatuak zeinua aldatu behar du: $x^4$ funtzioan, $f\'\'(0)=0$ da, eta ez dago inflexiorik.', 'Hace falta que $f\'\'$ cambie de signo: en $x^4$, $f\'\'(0)=0$ y no hay inflexión.', 'يلزم أن تغير $f\'\'$ إشارتها: في $x^4$ يكون $f\'\'(0)=0$ ولا انعطاف.', '$f\'\'$ must change sign: for $x^4$, $f\'\'(0)=0$ and there is no inflection.')
        },
        check: {
            prompt: say('Badu $f(x)=x^4+x$ funtzioak inflexio-punturik $x=0$ puntuan?', '¿Tiene $f(x)=x^4+x$ un punto de inflexión en $x=0$?', 'هل للدالة $f(x)=x^4+x$ نقطة انعطاف عند $x=0$؟', 'Does $f(x)=x^4+x$ have a point of inflection at $x=0$?'),
            options: [say('Bai, $f\'\'(0)=0$ delako', 'Sí, porque $f\'\'(0)=0$', 'نعم، لأن $f\'\'(0)=0$', 'Yes, because $f\'\'(0)=0$'), say('Ez: $f\'\'$ deribatuak ez du zeinurik aldatzen', 'No: $f\'\'$ no cambia de signo', 'لا: لا تغير $f\'\'$ إشارتها', 'No: $f\'\'$ does not change sign'), say('Bai, $f\'(0)=0$ delako', 'Sí, porque $f\'(0)=0$', 'نعم، لأن $f\'(0)=0$', 'Yes, because $f\'(0)=0$')],
            correctIndex: 1,
            explanation: say('$f\'\'(x)=12x^2\\ge 0$ da 0 puntuaren bi aldeetan: ∪ izaten jarraitzen du.', '$f\'\'(x)=12x^2\\ge 0$ a los dos lados de 0: sigue siendo ∪.', '$f\'\'(x)=12x^2\\ge 0$ على جانبي 0: يبقى ∪.', '$f\'\'(x)=12x^2\\ge 0$ on both sides of 0: it stays ∪.')
        }
    },
    'inflection-coefficients': {
        mistake: {
            wrong: say('Inflexioa $x=1$ puntuan: $f\'(1)=0$.', 'Inflexión en $x=1$: $f\'(1)=0$.', 'انعطاف عند $x=1$: $f\'(1)=0$.', 'An inflection at $x=1$: $f\'(1)=0$.'),
            right: say('Inflexioak bigarren deribatua eskatzen du: $f\'\'(1)=0$.', 'La inflexión pide la segunda derivada: $f\'\'(1)=0$.', 'الانعطاف يتطلب المشتقة الثانية: $f\'\'(1)=0$.', 'An inflection calls for the second derivative: $f\'\'(1)=0$.')
        },
        check: {
            prompt: say('$f(x)=x^3+ax^2$ funtzioak inflexio-puntu bat du $x=1$ puntuan. Zenbat da $a$?', '$f(x)=x^3+ax^2$ tiene un punto de inflexión en $x=1$. ¿Cuánto vale $a$?', 'للدالة $f(x)=x^3+ax^2$ نقطة انعطاف عند $x=1$. كم تساوي $a$؟', '$f(x)=x^3+ax^2$ has a point of inflection at $x=1$. What is $a$?'),
            options: [same('$-\\frac{3}{2}$'), same('$-3$'), same('$3$')],
            correctIndex: 1,
            explanation: say('$f\'\'(x)=6x+2a$ eta $f\'\'(1)=6+2a=0$; beraz, $a=-3$.', '$f\'\'(x)=6x+2a$ y $f\'\'(1)=6+2a=0$, así que $a=-3$.', '$f\'\'(x)=6x+2a$ و$f\'\'(1)=6+2a=0$، إذن $a=-3$.', '$f\'\'(x)=6x+2a$ and $f\'\'(1)=6+2a=0$, so $a=-3$.')
        }
    },

    /* ---------- 4. Optimisation ---------- */
    'absolute-extremes': {
        mistake: {
            wrong: say('Mutur absolutuak beti daude $f\'=0$ den tokian.', 'Los extremos absolutos están siempre donde $f\'=0$.', 'القيم القصوى المطلقة دائمًا حيث $f\'=0$.', 'The absolute extrema are always where $f\'=0$.'),
            right: say('Tartearen $a$ eta $b$ ertzetan ere egon daitezke: $f$ han ere kalkulatu behar da.', 'También pueden estar en los bordes $a$ y $b$ del intervalo: hay que calcular $f$ también allí.', 'قد تقع أيضًا عند الطرفين $a$ و$b$ للفترة: يجب حساب $f$ هناك أيضًا.', 'They can also be at the edges $a$ and $b$ of the interval: you have to work out $f$ there too.')
        },
        check: {
            prompt: say('$[0,\\,4]$ tartean, non hartzen du $f(x)=x^2-2x$ funtzioak bere maximo absolutua?', 'En $[0,\\,4]$, ¿dónde alcanza su máximo absoluto $f(x)=x^2-2x$?', 'في $[0,\\,4]$ أين تبلغ $f(x)=x^2-2x$ قيمتها العظمى المطلقة؟', 'On $[0,\\,4]$, where does $f(x)=x^2-2x$ reach its absolute maximum?'),
            options: [same('$x=1$'), same('$x=4$'), same('$x=0$')],
            correctIndex: 1,
            explanation: say('$f(0)=0$, $f(1)=-1$ eta $f(4)=8$: handiena 8 da, $x=4$ ertzean.', '$f(0)=0$, $f(1)=-1$ y $f(4)=8$: el mayor es 8, en el borde $x=4$.', '$f(0)=0$ و$f(1)=-1$ و$f(4)=8$: الأكبر 8 عند الطرف $x=4$.', '$f(0)=0$, $f(1)=-1$ and $f(4)=8$: the greatest is 8, at the edge $x=4$.')
        }
    },
    geometry: {
        mistake: {
            wrong: say('$A=x\\cdot y$ azalera $x$ aldagaiarekiko deribatzen da, $y$ finko utzita.', 'El área $A=x\\cdot y$ se deriva respecto a $x$ dejando $y$ fija.', 'تُشتق المساحة $A=x\\cdot y$ بالنسبة إلى $x$ مع تثبيت $y$.', 'The area $A=x\\cdot y$ is differentiated with respect to $x$ keeping $y$ fixed.'),
            right: say('Lehenik $y$ idazten da $x$ aldagaiaren funtzioan, baldintzarekin; bestela, $A$ funtzioak bi aldagai ditu.', 'Primero se escribe $y$ en función de $x$ con la condición; si no, $A$ tiene dos variables.', 'نكتب أولًا $y$ بدلالة $x$ باستعمال الشرط، وإلا كان لـ $A$ متغيران.', 'First write $y$ in terms of $x$ using the condition; otherwise $A$ has two variables.')
        },
        check: {
            prompt: say('Laukizuzen batek 16 perimetroa du. Oinarria $x$ bada, zer $A(x)$ azalera maximizatu behar da?', 'Un rectángulo tiene perímetro 16. Si la base mide $x$, ¿qué área $A(x)$ hay que maximizar?', 'مستطيل محيطه 16. إذا كان طول القاعدة $x$ فما المساحة $A(x)$ التي يجب جعلها أكبر ما يمكن؟', 'A rectangle has a perimeter of 16. If the base is $x$, which area $A(x)$ must be maximised?'),
            options: [same('$A(x)=x(8-x)$'), same('$A(x)=x(16-x)$'), same('$A(x)=16x$')],
            correctIndex: 0,
            explanation: say('Altuera $8-x$ da, $2x+2(8-x)=16$ delako.', 'La altura es $8-x$, porque $2x+2(8-x)=16$.', 'الارتفاع $8-x$ لأن $2x+2(8-x)=16$.', 'The height is $8-x$, because $2x+2(8-x)=16$.')
        }
    },
    contexts: {
        mistake: {
            wrong: say('«Zein da mozkinik handiena?»: $x=20$ erantzuten da.', '«¿Cuál es el beneficio máximo?»: se responde $x=20$.', '«ما الربح الأكبر؟»: نجيب $x=20$.', '«What is the greatest profit?»: you answer $x=20$.'),
            right: say('20 unitate-kopurua da; mozkinik handiena $B(20)=400$ da.', '20 es el número de unidades; el beneficio máximo es $B(20)=400$.', '20 هو عدد الوحدات، والربح الأكبر $B(20)=400$.', '20 is the number of units; the greatest profit is $B(20)=400$.')
        },
        check: {
            prompt: say('$B(x)=60x-x^2$ bada, zein da $B$ mozkinaren baliorik handiena?', 'Si $B(x)=60x-x^2$, ¿cuál es el valor máximo del beneficio $B$?', 'إذا كان $B(x)=60x-x^2$ فما أكبر قيمة للربح $B$؟', 'If $B(x)=60x-x^2$, what is the greatest value of the profit $B$?'),
            options: [same('$30$'), same('$900$'), same('$60$')],
            correctIndex: 1,
            explanation: say('$B\'(x)=60-2x=0$ da $x=30$ denean, eta $B(30)=1800-900=900$.', '$B\'(x)=60-2x=0$ en $x=30$, y $B(30)=1800-900=900$.', '$B\'(x)=60-2x=0$ عند $x=30$، و$B(30)=1800-900=900$.', '$B\'(x)=60-2x=0$ at $x=30$, and $B(30)=1800-900=900$.')
        }
    },

    /* ---------- 5. Sketching functions ---------- */
    'polynomial-graph': {
        mistake: {
            wrong: say('Hirugarren mailako polinomio bat $+\\infty$ aldera doa bi aldeetan.', 'Un polinomio de grado tres va hacia $+\\infty$ por los dos lados.', 'تتجه الحدودية من الدرجة الثالثة نحو $+\\infty$ من الجهتين.', 'A polynomial of degree three goes towards $+\\infty$ on both sides.'),
            right: say('Maila bakoitia bada, alde batean $-\\infty$ aldera doa eta bestean $+\\infty$ aldera; bikoitia bada, bi aldeetan leku berera.', 'Si el grado es impar, va hacia $-\\infty$ por un lado y hacia $+\\infty$ por el otro; si es par, por los dos lados al mismo sitio.', 'إذا كانت الدرجة فردية اتجهت نحو $-\\infty$ من جهة ونحو $+\\infty$ من الأخرى، وإذا كانت زوجية فإلى المكان نفسه من الجهتين.', 'If the degree is odd, it goes towards $-\\infty$ on one side and towards $+\\infty$ on the other; if it is even, to the same place on both sides.')
        },
        check: {
            prompt: say('Nora doa $f(x)=x^4-2x^2$ funtzioa $x\\to-\\infty$ denean?', '¿Hacia dónde va $f(x)=x^4-2x^2$ cuando $x\\to-\\infty$?', 'إلى أين تتجه $f(x)=x^4-2x^2$ عندما $x\\to-\\infty$؟', 'Where does $f(x)=x^4-2x^2$ go as $x\\to-\\infty$?'),
            options: [same('$+\\infty$'), same('$-\\infty$'), same('$0$')],
            correctIndex: 0,
            explanation: say('$x^4$ gaiak agintzen du, maila bikoitikoak: positiboa bi aldeetan.', 'Manda el término $x^4$, de grado par: positivo por los dos lados.', 'يتحكم الحد $x^4$ ذو الدرجة الزوجية: موجب من الجهتين.', 'The term $x^4$, of even degree, is in charge: positive on both sides.')
        }
    },
    'rational-graph': {
        mistake: {
            wrong: say('$f(x)=\\frac{1}{x^2}$ funtzioan, $f\'$ deribatua $+$ zeinutik $-$ zeinura pasatzen da 0 puntuan: maximo bat dago.', 'En $f(x)=\\frac{1}{x^2}$, $f\'$ pasa de $+$ a $-$ en 0: hay un máximo.', 'في $f(x)=\\frac{1}{x^2}$ تنتقل $f\'$ من $+$ إلى $-$ عند 0: توجد قيمة عظمى.', 'For $f(x)=\\frac{1}{x^2}$, $f\'$ goes from $+$ to $-$ at 0: there is a maximum.'),
            right: say('0 ez dago izate-eremuan: han asintota bertikal bat dago, ez mutur bat.', 'El 0 no está en el dominio: allí hay una asíntota vertical, no un extremo.', 'العدد 0 ليس في المجال: هناك مقارب رأسي لا قيمة قصوى.', '0 is not in the domain: there is a vertical asymptote there, not an extremum.')
        },
        check: {
            prompt: say('$f(x)=\\frac{2}{x-3}$ bada, zer dago $x=3$ puntuan?', 'Si $f(x)=\\frac{2}{x-3}$, ¿qué hay en $x=3$?', 'إذا كانت $f(x)=\\frac{2}{x-3}$ فماذا يوجد عند $x=3$؟', 'If $f(x)=\\frac{2}{x-3}$, what is there at $x=3$?'),
            options: [say('Maximo bat', 'Un máximo', 'قيمة عظمى', 'A maximum'), say('Asintota bertikal bat', 'Una asíntota vertical', 'مقارب رأسي', 'A vertical asymptote'), say('Inflexio-puntu bat', 'Un punto de inflexión', 'نقطة انعطاف', 'A point of inflection')],
            correctIndex: 1,
            explanation: say('Izendatzailea 3 puntuan anulatzen da: $x=3$ ez dago izate-eremuan, eta $f$ funtzioa $\\pm\\infty$ aldera doa.', 'El denominador se anula en 3: $x=3$ no está en el dominio y $f$ tiende a $\\pm\\infty$.', 'ينعدم المقام عند 3: $x=3$ ليست في المجال و$f$ تؤول إلى $\\pm\\infty$.', 'The denominator is zero at 3: $x=3$ is not in the domain and $f$ tends to $\\pm\\infty$.')
        }
    },
    'exp-log-graph': {
        mistake: {
            wrong: say('$\\ln(x-2)$ funtzioaren izate-eremua $\\mathbb{R}$ da.', 'El dominio de $\\ln(x-2)$ es $\\mathbb{R}$.', 'مجال $\\ln(x-2)$ هو $\\mathbb{R}$.', 'The domain of $\\ln(x-2)$ is $\\mathbb{R}$.'),
            right: say('Logaritmoak argumentu positiboa eskatzen du: $x-2>0$, hau da, $x>2$.', 'El logaritmo pide argumento positivo: $x-2>0$, es decir, $x>2$.', 'يتطلب اللوغاريتم ما داخله موجبًا: $x-2>0$، أي $x>2$.', 'The logarithm needs a positive argument: $x-2>0$, that is, $x>2$.')
        },
        check: {
            prompt: say('Zer $x$ baliotarako existitzen da $f(x)=x\\,\\ln x$?', '¿Para qué $x$ existe $f(x)=x\\,\\ln x$?', 'لأي $x$ توجد $f(x)=x\\,\\ln x$؟', 'For which $x$ does $f(x)=x\\,\\ln x$ exist?'),
            options: [same('$x\\in\\mathbb{R}$'), same('$x\\ge 0$'), same('$x>0$')],
            correctIndex: 2,
            explanation: say('$\\ln x$ funtzioak $x>0$ eskatzen du; 0 puntuan ez da existitzen.', '$\\ln x$ pide $x>0$; en 0 no existe.', 'تتطلب $\\ln x$ أن يكون $x>0$؛ وعند 0 لا توجد.', '$\\ln x$ needs $x>0$; at 0 it does not exist.')
        }
    }
}

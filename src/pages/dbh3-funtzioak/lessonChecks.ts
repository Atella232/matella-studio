import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Funtzioak · 3. DBH — the typical mistake and the «Check it» question of
   every lesson. Plain data (no JSX) so the tests can import it; lessons.tsx
   merges it into the topics. The mistakes are the ones the lessons already
   had; the questions use new numbers, never those of «Let's solve» or of
   the example, and one of their wrong answers is the lesson's typical
   mistake. A question about a point of a line writes the line as y = …, so
   the test can check the point. Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type Functions3TopicId = 'function-concept' | 'domain-range' | 'reading-graphs' | 'growth' | 'extremes' | 'intercepts' | 'proportional' | 'slope' | 'affine' | 'two-points' | 'parallel-lines' | 'linear-problems' | 'parabola-shape' | 'vertex' | 'parabola-intercepts'

export const functions3LessonChecks: Record<Functions3TopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'function-concept': {
        mistake: {
            wrong: same('$f(-2)=-2^{2}+6=2$'),
            right: say('Negatiboa parentesi artean karratura: $(-2)^{2}=4$, eta $f(-2)=10$.', 'El negativo va entre paréntesis al cuadrado: $(-2)^{2}=4$, y $f(-2)=10$.', 'يُربَّع السالب بين قوسين: $(-2)^{2}=4$، و$f(-2)=10$.', 'Square the negative number in brackets: $(-2)^{2}=4$, so $f(-2)=10$.')
        },
        check: {
            prompt: say('$f(x)=x^{2}+1$ bada, zenbat balio du $f(-3)$?', 'Si $f(x)=x^{2}+1$, ¿cuánto vale $f(-3)$?', 'إذا كان $f(x)=x^{2}+1$ فكم يساوي $f(-3)$؟', 'If $f(x)=x^{2}+1$, what is $f(-3)$?'),
            options: [same('$10$'), same('$-8$'), same('$7$')],
            correctIndex: 0,
            explanation: say('Negatiboa parentesi artean: $(-3)^{2}+1=9+1=10$.', 'El negativo, entre paréntesis: $(-3)^{2}+1=9+1=10$.', 'السالب بين قوسين: $(-3)^{2}+1=9+1=10$.', 'The negative, in brackets: $(-3)^{2}+1=9+1=10$.')
        }
    },
    'domain-range': {
        mistake: {
            wrong: say('Definizio-eremua grafikoaren altuera da.', 'El dominio es la altura de la gráfica.', 'المجال هو ارتفاع التمثيل.', 'The domain is how high the graph goes.'),
            right: say('Altuera ibilbidea da ($y$). Definizio-eremua zabalera da ($x$).', 'La altura es el recorrido ($y$). El dominio es el ancho ($x$).', 'الارتفاع هو المدى ($y$). والمجال هو العرض ($x$).', 'Height is the range ($y$). The domain is the width ($x$).')
        },
        check: {
            prompt: say('Grafiko bat $(-1,2)$ puntuan hasi eta $(4,7)$ puntuan amaitzen da, eta tartean igo egiten da. Zein da haren definizio-eremua?', 'Una gráfica empieza en $(-1,2)$, acaba en $(4,7)$ y entre ellos sube. ¿Cuál es su dominio?', 'يبدأ تمثيل بياني في $(-1,2)$ وينتهي في $(4,7)$ ويصعد بينهما. ما مجاله؟', 'A graph starts at $(-1,2)$, ends at $(4,7)$ and goes up in between. What is its domain?'),
            options: [same('$[-1,4]$'), same('$[2,7]$'), same('$[-1,7]$')],
            correctIndex: 0,
            explanation: say('Definizio-eremua $x$ balioena da, ardatz horizontalean: $-1$ zenbakitik 4 zenbakira. $[2,7]$ ibilbidea da.', 'El dominio son los valores de $x$, en el eje horizontal: de $-1$ a 4. $[2,7]$ es el recorrido.', 'المجال قيم $x$ على المحور الأفقي: من $-1$ إلى 4. أما $[2,7]$ فهو المدى.', 'The domain is the values of $x$, on the horizontal axis: from $-1$ to 4. $[2,7]$ is the range.')
        }
    },
    'reading-graphs': {
        mistake: {
            wrong: say('Zati horizontal batean, pertsona azkar dabil.', 'En un tramo horizontal, la persona va deprisa.', 'في الجزء الأفقي يسير الشخص بسرعة.', 'On a flat stretch, the person is moving fast.'),
            right: say('Zati horizontalean distantzia ez da aldatzen: geldirik dago.', 'En un tramo horizontal la distancia no cambia: está parada.', 'في الجزء الأفقي لا تتغيّر المسافة: إنه متوقف.', 'On a flat stretch the distance does not change: they are standing still.')
        },
        check: {
            prompt: say('Bidaia baten grafikoan, 10 eta 11 orduen artean distantzia beti 40 km da. Zer gertatzen da ordu horretan?', 'En la gráfica de un viaje, entre las 10 y las 11 la distancia es siempre 40 km. ¿Qué pasa en esa hora?', 'في تمثيل رحلة تبقى المسافة 40 كم بين الساعة 10 والساعة 11. ماذا يحدث في تلك الساعة؟', 'On the graph of a trip, between 10 and 11 o’clock the distance is always 40 km. What happens in that hour?'),
            options: [say('Oso azkar doa', 'Va muy deprisa', 'يسير بسرعة كبيرة', 'It goes very fast'), say('Geldirik dago', 'Está parado', 'متوقف', 'It is stopped'), say('Etxera itzultzen da', 'Vuelve a casa', 'يعود إلى البيت', 'It goes back home')],
            correctIndex: 1,
            explanation: say('Zati horizontal batean distantzia ez da aldatzen: ez da mugitzen.', 'En un tramo horizontal la distancia no cambia: no se mueve.', 'في الجزء الأفقي لا تتغير المسافة: لا يتحرك.', 'On a flat stretch the distance does not change: it is not moving.')
        }
    },
    growth: {
        mistake: {
            wrong: say('Tarteak $y$ ardatzean idazten dira: gorakorra $(2,8)$ tartean, $y$ balioa 2 eta 8 artean dagoelako.', 'Los intervalos se escriben en el eje $y$: creciente en $(2,8)$ porque $y$ va de 2 a 8.', 'تُكتب الفترات على المحور $y$: متزايدة على $(2,8)$ لأن $y$ يذهب من 2 إلى 8.', 'Intervals are written on the $y$ axis: increasing on $(2,8)$ because $y$ goes from 2 to 8.'),
            right: say('Tarteak $x$ ardatzekoak dira: begiratu non dagoen $x$ grafikoa igotzen denean.', 'Los intervalos son del eje $x$: mira dónde está $x$ mientras la gráfica sube.', 'الفترات على المحور $x$: انظر أين يكون $x$ بينما يصعد التمثيل.', 'Intervals are on the $x$ axis: look where $x$ is while the graph rises.')
        },
        check: {
            prompt: say('Grafiko bat $(1,3)$ puntutik $(5,9)$ puntura igotzen da. Zein tartetan da gorakorra?', 'Una gráfica sube desde $(1,3)$ hasta $(5,9)$. ¿En qué intervalo es creciente?', 'يصعد تمثيل بياني من $(1,3)$ إلى $(5,9)$. على أي فترة يكون متزايدًا؟', 'A graph goes up from $(1,3)$ to $(5,9)$. On which interval is it increasing?'),
            options: [same('$(3,9)$'), same('$(1,5)$'), same('$(1,9)$')],
            correctIndex: 1,
            explanation: say('Tartea $x$ ardatzekoa da: $x$ 1 eta 5 artean dago grafikoa igotzen den bitartean.', 'El intervalo es del eje $x$: $x$ va de 1 a 5 mientras la gráfica sube.', 'الفترة على المحور $x$: يمتد $x$ من 1 إلى 5 بينما يصعد التمثيل.', 'The interval is on the $x$ axis: $x$ goes from 1 to 5 while the graph goes up.')
        }
    },
    extremes: {
        mistake: {
            wrong: say('Maximoa $x=2$ da.', 'El máximo es $x=2$.', 'العظمى هي $x=2$.', 'The maximum is $x=2$.'),
            right: say('Maximoa puntu bat da, $(2,6)$: $x=2$ denean, $y$ balio handiena 6 da.', 'El máximo es un punto, $(2,6)$: en $x=2$ el mayor valor de $y$ es 6.', 'العظمى نقطة $(2,6)$: عند $x=2$ تكون أكبر قيمة لـ$y$ هي 6.', 'The maximum is a point, $(2,6)$: at $x=2$ the largest value of $y$ is 6.')
        },
        check: {
            prompt: say('Grafiko bat $(3,7)$ puntura arte igotzen da eta gero jaisten. Zein da maximoa?', 'Una gráfica sube hasta el punto $(3,7)$ y después baja. ¿Cuál es el máximo?', 'يصعد تمثيل بياني حتى النقطة $(3,7)$ ثم ينزل. ما القيمة العظمى؟', 'A graph goes up to the point $(3,7)$ and then down. What is the maximum?'),
            options: [same('$x=3$'), same('$(3,7)$'), same('$y=3$')],
            correctIndex: 1,
            explanation: say('Maximoa puntu bat da: $x=3$ denean, $y$ aldagaiaren baliorik handiena 7 da.', 'El máximo es un punto: en $x=3$, el mayor valor de $y$ es 7.', 'العظمى نقطة: عند $x=3$ تكون أكبر قيمة لـ $y$ هي 7.', 'The maximum is a point: at $x=3$, the greatest value of $y$ is 7.')
        }
    },
    intercepts: {
        mistake: {
            wrong: say('X ardatza mozteko $x=0$ ordezkatu.', 'Para cortar el eje X se sustituye $x=0$.', 'لقطع محور X نعوّض $x=0$.', 'To meet the X axis, substitute $x=0$.'),
            right: say('Alderantziz: X ardatzean $y=0$ da. $x=0$ Y ardatzerako da.', 'Al revés: en el eje X es $y=0$. $x=0$ es para el eje Y.', 'بالعكس: على محور X يكون $y=0$. و$x=0$ لمحور Y.', 'The other way round: on the X axis $y=0$. $x=0$ is for the Y axis.')
        },
        check: {
            prompt: say('Non mozten du $y=5x-10$ zuzenak X ardatza?', '¿Dónde corta la recta $y=5x-10$ al eje X?', 'أين يقطع المستقيم $y=5x-10$ محور X؟', 'Where does the line $y=5x-10$ cross the X axis?'),
            options: [same('$(0,-10)$'), same('$(2,0)$'), same('$(-2,0)$')],
            correctIndex: 1,
            explanation: say('X ardatzean $y=0$: $5x-10=0$, $x=2$. $(0,-10)$ Y ardatzarekiko ebakia da.', 'En el eje X, $y=0$: $5x-10=0$, $x=2$. $(0,-10)$ es el corte con el eje Y.', 'على محور X يكون $y=0$: ‏$5x-10=0$ و$x=2$. أما $(0,-10)$ فهو التقاطع مع محور Y.', 'On the X axis, $y=0$: $5x-10=0$, $x=2$. $(0,-10)$ is where it crosses the Y axis.')
        }
    },
    proportional: {
        mistake: {
            wrong: say('$y=2x+1$ proportzionaltasun zuzenekoa da, zuzen bat delako.', '$y=2x+1$ es de proporcionalidad directa porque es una recta.', '$y=2x+1$ تناسب طردي لأنه مستقيم.', '$y=2x+1$ is a direct proportion because it is a line.'),
            right: say('Ez da jatorritik igarotzen ($x=0$ denean $y=1$): afina da, ez proportzionala.', 'No pasa por el origen ($x=0$ da $y=1$): es afín, no proporcional.', 'لا يمر بالأصل ($x=0$ يعطي $y=1$): إنها تآلفية لا تناسبية.', 'It does not go through the origin ($x=0$ gives $y=1$): it is affine, not proportional.')
        },
        check: {
            prompt: say('Funtzio hauetatik, zein da zuzeneko proportzionaltasunekoa?', '¿Cuál de estas funciones es de proporcionalidad directa?', 'أي هذه الدوال دالة تناسب طردي؟', 'Which of these functions is a direct proportion?'),
            options: [same('$y=4x+1$'), same('$y=-3x$'), same('$y=x^{2}$')],
            correctIndex: 1,
            explanation: say('$y=-3x$ jatorritik pasatzen da, eta $\\frac{y}{x}=-3$ beti. $y=4x+1$ zuzena da, baina ez da jatorritik pasatzen.', '$y=-3x$ pasa por el origen y $\\frac{y}{x}=-3$ siempre. $y=4x+1$ es una recta, pero no pasa por el origen.', '$y=-3x$ يمر بالأصل و$\\frac{y}{x}=-3$ دائمًا. أما $y=4x+1$ فمستقيم لا يمر بالأصل.', '$y=-3x$ goes through the origin and $\\frac{y}{x}=-3$ always. $y=4x+1$ is a line, but not through the origin.')
        }
    },
    slope: {
        mistake: {
            wrong: same('$m=\\frac{4-1}{11-2}=\\frac{1}{3}$'),
            right: say('Malda $y$ aldaketa zati $x$ aldaketa da, ez alderantziz: $\\frac{9}{3}=3$.', 'La pendiente es el cambio de $y$ entre el cambio de $x$, no al revés: $\\frac{9}{3}=3$.', 'الميل تغيّر $y$ على تغيّر $x$ لا العكس: $\\frac{9}{3}=3$.', 'The slope is the change in $y$ over the change in $x$, not the other way round: $\\frac{9}{3}=3$.')
        },
        check: {
            prompt: say('Zein da $(2,1)$ eta $(4,7)$ puntuen arteko malda?', '¿Cuál es la pendiente entre $(2,1)$ y $(4,7)$?', 'ما الميل بين $(2,1)$ و$(4,7)$؟', 'What is the slope between $(2,1)$ and $(4,7)$?'),
            options: [same('$\\frac{1}{3}$'), same('$3$'), same('$2$')],
            correctIndex: 1,
            explanation: say('$y$ aldaketa zati $x$ aldaketa: $\\frac{7-1}{4-2}=\\frac{6}{2}=3$.', 'Cambio de $y$ entre cambio de $x$: $\\frac{7-1}{4-2}=\\frac{6}{2}=3$.', 'تغير $y$ على تغير $x$: $\\frac{7-1}{4-2}=\\frac{6}{2}=3$.', 'Change in $y$ over change in $x$: $\\frac{7-1}{4-2}=\\frac{6}{2}=3$.')
        }
    },
    affine: {
        mistake: {
            wrong: say('$y=3x-2$ zuzenak Y ardatza $(0,3)$ puntuan mozten du.', 'La recta $y=3x-2$ corta al eje Y en $(0,3)$.', 'المستقيم $y=3x-2$ يقطع محور Y في $(0,3)$.', 'The line $y=3x-2$ meets the Y axis at $(0,3)$.'),
            right: say('3 malda da. Ebaki-puntua $n=-2$ da: $(0,-2)$.', 'El 3 es la pendiente. El corte es $n=-2$: $(0,-2)$.', '3 هو الميل. والتقاطع $n=-2$: $(0,-2)$.', '3 is the slope. The intercept is $n=-2$: $(0,-2)$.')
        },
        check: {
            prompt: say('Non mozten du $y=-4x+7$ zuzenak Y ardatza?', '¿Dónde corta la recta $y=-4x+7$ al eje Y?', 'أين يقطع المستقيم $y=-4x+7$ محور Y؟', 'Where does the line $y=-4x+7$ cross the Y axis?'),
            options: [same('$(0,-4)$'), same('$(0,7)$'), same('$(7,0)$')],
            correctIndex: 1,
            explanation: say('$-4$ malda da; ebakia $n=7$ da: $(0,7)$.', 'El $-4$ es la pendiente; el corte es $n=7$: $(0,7)$.', '$-4$ هو الميل، والتقاطع $n=7$: ‏$(0,7)$.', 'The $-4$ is the slope; the crossing is $n=7$: $(0,7)$.')
        }
    },
    'two-points': {
        mistake: {
            wrong: say('$m=2$ eta $(1,5)$: $n=5$, beraz $y=2x+5$.', '$m=2$ y $(1,5)$: $n=5$, así que $y=2x+5$.', '$m=2$ و$(1,5)$: $n=5$، إذن $y=2x+5$.', '$m=2$ and $(1,5)$: $n=5$, so $y=2x+5$.'),
            right: say('$n$ ez da puntuaren $y$, $x=0$ denean ez badago: $5=2\\cdot 1+n$, $n=3$.', '$n$ no es la $y$ del punto si no está en $x=0$: $5=2\\cdot 1+n$, $n=3$.', '$n$ ليس $y$ للنقطة إن لم تكن عند $x=0$: $5=2\\cdot 1+n$، $n=3$.', '$n$ is not the $y$ of the point unless it is at $x=0$: $5=2\\cdot 1+n$, $n=3$.')
        },
        check: {
            prompt: say('Zuzen batek 4 malda du eta $(2,3)$ puntutik pasatzen da. Zenbat balio du $n$?', 'Una recta tiene pendiente 4 y pasa por $(2,3)$. ¿Cuánto vale $n$?', 'مستقيم ميله 4 ويمر بـ $(2,3)$. كم تساوي $n$؟', 'A line has slope 4 and passes through $(2,3)$. What is $n$?'),
            options: [same('$n=3$'), same('$n=-5$'), same('$n=11$')],
            correctIndex: 1,
            explanation: say('Ordezkatu: $3=4\\cdot 2+n$; beraz, $n=3-8=-5$.', 'Sustituye: $3=4\\cdot 2+n$, así que $n=3-8=-5$.', 'عوّض: $3=4\\cdot 2+n$، إذن $n=3-8=-5$.', 'Substitute: $3=4\\cdot 2+n$, so $n=3-8=-5$.')
        }
    },
    'parallel-lines': {
        mistake: {
            wrong: say('$y=2x+1$ eta $y=x+1$ paraleloak dira, $n$ bera dutelako.', '$y=2x+1$ e $y=x+1$ son paralelas porque tienen el mismo $n$.', '$y=2x+1$ و$y=x+1$ متوازيان لأن لهما $n$ نفسه.', '$y=2x+1$ and $y=x+1$ are parallel because they have the same $n$.'),
            right: say('$n$ bera dutenek Y ardatzean ebakitzen dute, $(0,1)$ puntuan. Paraleloek malda bera dute.', 'Con el mismo $n$ se cortan en el eje Y, en $(0,1)$. Las paralelas tienen la misma pendiente.', 'لهما $n$ نفسه فيتقاطعان على محور Y في $(0,1)$. والمتوازيان لهما الميل نفسه.', 'With the same $n$ they cross on the Y axis, at $(0,1)$. Parallel lines have the same slope.')
        },
        check: {
            prompt: say('$y=3x-2$ zuzenaren paralelo batek $m$ bera du. Zein da?', 'Una paralela a $y=3x-2$ tiene la misma $m$. ¿Cuál es?', 'المستقيم الموازي لـ $y=3x-2$ له $m$ نفسه. أيها هو؟', 'A line parallel to $y=3x-2$ has the same $m$. Which one is it?'),
            options: [same('$y=x-2$'), same('$y=3x+5$'), same('$y=-3x-2$')],
            correctIndex: 1,
            explanation: say('Paraleloek malda bera dute, $m=3$. $y=x-2$ zuzenak $n$ bera du, eta $(0,-2)$ puntuan ebakitzen du.', 'Las paralelas tienen la misma pendiente, $m=3$. $y=x-2$ tiene el mismo $n$ y la corta en $(0,-2)$.', 'المستقيمان المتوازيان لهما الميل نفسه $m=3$. أما $y=x-2$ فله $n$ نفسه ويقطعه في $(0,-2)$.', 'Parallel lines have the same slope, $m=3$. $y=x-2$ has the same $n$ and crosses it at $(0,-2)$.')
        }
    },
    'linear-problems': {
        mistake: {
            wrong: say('Taxia: 3 € hasteko eta 1,50 € km-ko. 8 km: $3\\cdot 8+1{,}5=25{,}5$ €.', 'Taxi: 3 € de bajada y 1,50 € el km. 8 km: $3\\cdot 8+1{,}5=25{,}5$ €.', 'سيارة أجرة: 3 يورو انطلاق و1.50 يورو للكيلومتر. 8 كم: $3\\cdot 8+1{,}5=25{,}5$ يورو.', 'Taxi: €3 to start and €1.50 per km. 8 km: $3\\cdot 8+1{,}5=25{,}5$ €.'),
            right: say('Km kopurua prezioaz biderkatzen da, eta zati finkoa batu: $1{,}5\\cdot 8+3=15$ €.', 'Se multiplica el precio por los km y se suma la parte fija: $1{,}5\\cdot 8+3=15$ €.', 'نضرب السعر في الكيلومترات ونضيف الجزء الثابت: $1{,}5\\cdot 8+3=15$ يورو.', 'Multiply the price by the km and add the fixed part: $1{,}5\\cdot 8+3=15$ €.')
        },
        check: {
            prompt: say('Iturgin batek 30 € kobratzen ditu etortzeagatik eta 20 € orduko. Zenbat kobratzen du 3 orduko?', 'Un fontanero cobra 30 € por ir y 20 € por hora. ¿Cuánto cobra por 3 horas?', 'يتقاضى سبّاك 30 € للحضور و20 € لكل ساعة. كم يتقاضى عن 3 ساعات؟', 'A plumber charges €30 to come and €20 an hour. How much for 3 hours?'),
            options: [say('110 €', '110 €', '110 €', '€110'), say('90 €', '90 €', '90 €', '€90'), say('150 €', '150 €', '150 €', '€150')],
            correctIndex: 1,
            explanation: say('Orduko prezioa bider orduak, gehi zati finkoa: $20\\cdot 3+30=90$.', 'Precio por hora por las horas, más la parte fija: $20\\cdot 3+30=90$.', 'سعر الساعة في عدد الساعات زائد الجزء الثابت: $20\\cdot 3+30=90$.', 'Price per hour times the hours, plus the fixed part: $20\\cdot 3+30=90$.')
        }
    },
    'parabola-shape': {
        mistake: {
            wrong: say('$y=-x^{2}$ gora irekitzen da, $x^{2}$ beti positiboa delako.', '$y=-x^{2}$ se abre hacia arriba porque $x^{2}$ siempre es positivo.', '$y=-x^{2}$ ينفتح إلى الأعلى لأن $x^{2}$ موجب دائمًا.', '$y=-x^{2}$ opens upwards because $x^{2}$ is always positive.'),
            right: say('Minusak $y$ guztiak negatibo egiten ditu: behera irekitzen da.', 'El menos hace negativos todos los $y$: se abre hacia abajo.', 'السالب يجعل كل قيم $y$ سالبة: ينفتح إلى الأسفل.', 'The minus makes every $y$ negative: it opens downwards.')
        },
        check: {
            prompt: say('Nora irekitzen da $y=-3x^{2}+1$ parabola?', '¿Hacia dónde se abre la parábola $y=-3x^{2}+1$?', 'إلى أين يتجه القطع المكافئ $y=-3x^{2}+1$؟', 'Which way does the parabola $y=-3x^{2}+1$ open?'),
            options: [say('Gora', 'Hacia arriba', 'إلى الأعلى', 'Upwards'), say('Behera', 'Hacia abajo', 'إلى الأسفل', 'Downwards'), say('Eskuinera', 'Hacia la derecha', 'إلى اليمين', 'To the right')],
            correctIndex: 1,
            explanation: say('$a=-3<0$: adarrak behera doaz, eta maximo bat du.', '$a=-3<0$: las ramas van hacia abajo, y tiene un máximo.', '$a=-3<0$: يتجه الفرعان إلى الأسفل وله قيمة عظمى.', '$a=-3<0$: the branches go down, and it has a maximum.')
        }
    },
    vertex: {
        mistake: {
            wrong: same('$x_{v}=\\frac{-6}{2}=-3$'),
            right: say('Formulak $-b$ du: $b=-6$ bada, $-b=6$ eta $x_{v}=3$.', 'La fórmula lleva $-b$: si $b=-6$, $-b=6$ y $x_{v}=3$.', 'في الصيغة $-b$: إذا $b=-6$ فإن $-b=6$ و$x_{v}=3$.', 'The formula has $-b$: if $b=-6$, $-b=6$ and $x_{v}=3$.')
        },
        check: {
            prompt: say('Zein da $y=x^{2}-10x+3$ parabolaren erpinaren $x$ koordenatua?', '¿Cuál es la coordenada $x$ del vértice de $y=x^{2}-10x+3$?', 'ما الإحداثي $x$ لرأس $y=x^{2}-10x+3$؟', 'What is the $x$ coordinate of the vertex of $y=x^{2}-10x+3$?'),
            options: [same('$x_{v}=5$'), same('$x_{v}=-5$'), same('$x_{v}=10$')],
            correctIndex: 0,
            explanation: say('$b=-10$; beraz, $-b=10$ eta $x_{v}=\\frac{10}{2}=5$.', '$b=-10$, así que $-b=10$ y $x_{v}=\\frac{10}{2}=5$.', '$b=-10$ إذن $-b=10$ و$x_{v}=\\frac{10}{2}=5$.', '$b=-10$, so $-b=10$ and $x_{v}=\\frac{10}{2}=5$.')
        }
    },
    'parabola-intercepts': {
        mistake: {
            wrong: say('Parabola batek beti mozten du X ardatza bi puntutan.', 'Una parábola siempre corta al eje X en dos puntos.', 'يقطع القطع المكافئ محور X دائمًا في نقطتين.', 'A parabola always meets the X axis at two points.'),
            right: say('Ez beti: $\\Delta$ negatiboa bada ez du mozten, eta zero bada ukitu besterik ez du egiten.', 'No siempre: si $\\Delta$ es negativo no lo corta, y si es cero solo lo toca.', 'ليس دائمًا: إذا كان $\\Delta$ سالبًا لا يقطعه، وإذا كان صفرًا يمسّه فقط.', 'Not always: if $\\Delta$ is negative it does not meet it, and if it is zero it only touches it.')
        },
        check: {
            prompt: say('Zenbat aldiz mozten du $y=x^{2}+2x+5$ parabolak X ardatza?', '¿Cuántas veces corta $y=x^{2}+2x+5$ al eje X?', 'كم مرة يقطع $y=x^{2}+2x+5$ محور X؟', 'How many times does $y=x^{2}+2x+5$ cross the X axis?'),
            options: [say('Bat ere ez', 'Ninguna', 'ولا مرة', 'None'), say('Bi', 'Dos', 'مرتين', 'Twice'), say('Bat', 'Una', 'مرة واحدة', 'Once')],
            correctIndex: 0,
            explanation: say('$\\Delta=4-20=-16<0$: parabolak ez du X ardatza ukitzen.', '$\\Delta=4-20=-16<0$: la parábola no toca el eje X.', '$\\Delta=4-20=-16<0$: لا يمسّ القطع المكافئ محور X.', '$\\Delta=4-20=-16<0$: the parabola does not touch the X axis.')
        }
    }
}

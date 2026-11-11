import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 2 · Zientziak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no
   JSX) so the tests can import it; lessons.tsx merges it into the topics.
   The questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical
   mistake: f′ = 0 taken as an extremum, f″ = 0 as an inflection, the ends
   of the interval forgotten, Rolle without all its hypotheses, Rolle
   taken for a proof that a root exists, f(c) instead of f′(c),
   L'Hôpital with no indeterminate form, 0·∞ read as 0, ln L given as the
   limit, an extremum read as f = 0, f′ = 0 at an inflection, a tangent
   that only gives its slope, a zero of the derivative taken as the
   optimum, D = d² given as the distance and a profit that is always
   largest where B′ = 0.
   ========================================================================== */

export type Bach2ApplicationsTopicId =
    | 'monotony-review' | 'curvature-review' | 'absolute-review'
    | 'rolle' | 'roots-count' | 'mean-value'
    | 'hopital' | 'hopital-products' | 'hopital-powers'
    | 'extreme-condition' | 'inflection-condition' | 'extreme-tangent'
    | 'areas-volumes' | 'distances' | 'contexts-interval'

export const bach2ApplicationsLessonChecks: Record<Bach2ApplicationsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Review of 1.º ---------- */
    'monotony-review': {
        mistake: {
            wrong: say('$f\'(a)=0$ bada, $a$ puntuan mutur bat dago.', 'Si $f\'(a)=0$, en $a$ hay un extremo.', 'إذا كان $f\'(a)=0$ ففي $a$ قيمة قصوى.', 'If $f\'(a)=0$, there is an extremum at $a$.'),
            right: say('$f\'$ deribatuak zeinua aldatu behar du. $f(x)=x^3$ funtzioan $f\'(0)=0$ da, baina $f\'\\ge 0$ bi aldeetan: $x^3$ beti da gorakorra, eta ez du muturrik 0 puntuan.', 'Hace falta que $f\'$ cambie de signo. En $f(x)=x^3$, $f\'(0)=0$, pero $f\'\\ge 0$ a los dos lados: $x^3$ siempre crece y no tiene extremo en 0.', 'يجب أن تغيّر $f\'$ إشارتها. في $f(x)=x^3$ يكون $f\'(0)=0$، لكن $f\'\\ge 0$ من الجهتين: $x^3$ متزايدة دائمًا وليس لها قيمة قصوى عند 0.', '$f\'$ has to change sign. For $f(x)=x^3$, $f\'(0)=0$, but $f\'\\ge 0$ on both sides: $x^3$ always increases and has no extremum at 0.')
        },
        check: {
            prompt: say('Zenbat mutur erlatibo ditu $f(x)=x^4-4x^3$ funtzioak $\\mathbb{R}$ osoan?', '¿Cuántos extremos relativos tiene $f(x)=x^4-4x^3$ en $\\mathbb{R}$?', 'كم قيمة قصوى محلية للدالة $f(x)=x^4-4x^3$ على $\\mathbb{R}$؟', 'How many local extrema does $f(x)=x^4-4x^3$ have on $\\mathbb{R}$?'),
            options: [same('$2$'), same('$1$'), same('$0$')],
            correctIndex: 1,
            explanation: say('$f\'(x)=4x^2(x-3)$ zero da 0 eta 3 puntuetan, baina 0 puntuan ez du zeinua aldatzen: minimo bakarra dago, $x=3$ puntuan.', '$f\'(x)=4x^2(x-3)$ se anula en 0 y en 3, pero en 0 no cambia de signo: solo hay un mínimo, en $x=3$.', '$f\'(x)=4x^2(x-3)$ تنعدم عند 0 و3، لكنها لا تغيّر إشارتها عند 0: توجد قيمة صغرى واحدة فقط عند $x=3$.', '$f\'(x)=4x^2(x-3)$ is 0 at 0 and at 3, but at 0 it does not change sign: there is only a minimum, at $x=3$.')
        }
    },
    'curvature-review': {
        mistake: {
            wrong: say('$f\'\'(a)=0$ bada, $a$ puntuan inflexio-puntu bat dago.', 'Si $f\'\'(a)=0$, en $a$ hay un punto de inflexión.', 'إذا كان $f\'\'(a)=0$ ففي $a$ نقطة انعطاف.', 'If $f\'\'(a)=0$, there is a point of inflection at $a$.'),
            right: say('$f\'\'$ deribatuak zeinua aldatu behar du. $f(x)=x^4$ funtzioan $f\'\'(0)=0$ da, baina $f\'\'=12x^2\\ge 0$: kurba beti da $\\cup$, eta ez dago inflexiorik.', 'Hace falta que $f\'\'$ cambie de signo. En $f(x)=x^4$, $f\'\'(0)=0$, pero $f\'\'=12x^2\\ge 0$: la curva es siempre $\\cup$ y no hay inflexión.', 'يجب أن تغيّر $f\'\'$ إشارتها. في $f(x)=x^4$ يكون $f\'\'(0)=0$، لكن $f\'\'=12x^2\\ge 0$: المنحنى دائمًا $\\cup$ ولا انعطاف.', '$f\'\'$ has to change sign. For $f(x)=x^4$, $f\'\'(0)=0$, but $f\'\'=12x^2\\ge 0$: the curve is always $\\cup$ and there is no inflection.')
        },
        check: {
            prompt: say('Ba al du $f(x)=x^4+2x$ funtzioak inflexio-punturik $x=0$ puntuan?', '¿Tiene $f(x)=x^4+2x$ un punto de inflexión en $x=0$?', 'هل للدالة $f(x)=x^4+2x$ نقطة انعطاف عند $x=0$؟', 'Does $f(x)=x^4+2x$ have a point of inflection at $x=0$?'),
            options: [
                say('Bai: $f\'\'(0)=0$', 'Sí: $f\'\'(0)=0$', 'نعم: $f\'\'(0)=0$', 'Yes: $f\'\'(0)=0$'),
                say('Bai: $f\'(0)=2$', 'Sí: $f\'(0)=2$', 'نعم: $f\'(0)=2$', 'Yes: $f\'(0)=2$'),
                say('Ez: $f\'\'$ deribatuak ez du zeinua aldatzen', 'No: $f\'\'$ no cambia de signo', 'لا: لا تغيّر $f\'\'$ إشارتها', 'No: $f\'\'$ does not change sign')
            ],
            correctIndex: 2,
            explanation: say('$f\'\'(x)=12x^2$ zero da 0 puntuan, baina positiboa da bi aldeetan: kurba $\\cup$ da oraindik.', '$f\'\'(x)=12x^2$ vale 0 en 0, pero es positiva a los dos lados: la curva sigue siendo $\\cup$.', '$f\'\'(x)=12x^2$ تساوي 0 عند 0، لكنها موجبة من الجهتين: يبقى المنحنى $\\cup$.', '$f\'\'(x)=12x^2$ is 0 at 0, but it is positive on both sides: the curve is still $\\cup$.')
        }
    },
    'absolute-review': {
        mistake: {
            wrong: say('Mutur absolutuak $f\'=0$ den tokian daude.', 'Los extremos absolutos están donde $f\'=0$.', 'القيم القصوى المطلقة حيث $f\'=0$.', 'The absolute extrema are where $f\'=0$.'),
            right: say('Tartearen muturretan ere egon daitezke. Horregatik, $f$ kalkulatzen da puntu singularretan eta $a$ eta $b$ puntuetan, eta balio handiena eta txikiena aukeratzen dira.', 'También pueden estar en los bordes del intervalo. Por eso se calcula $f$ en los puntos singulares y en $a$ y $b$, y se eligen el valor mayor y el menor.', 'قد تكون أيضًا عند طرفي الفترة. لذلك نحسب $f$ عند النقاط الحرجة وعند $a$ و$b$، ونختار أكبر قيمة وأصغرها.', 'They can also be at the ends of the interval. That is why you work out $f$ at the stationary points and at $a$ and $b$, and pick the largest and the smallest value.')
        },
        check: {
            prompt: say('Zein da $f(x)=x^2-2x$ funtzioaren maximo absolutua $[0,\\,4]$ tartean?', '¿Cuál es el máximo absoluto de $f(x)=x^2-2x$ en $[0,\\,4]$?', 'ما القيمة العظمى المطلقة للدالة $f(x)=x^2-2x$ على $[0,\\,4]$؟', 'What is the absolute maximum of $f(x)=x^2-2x$ on $[0,\\,4]$?'),
            options: [same('$8$'), same('$-1$'), same('$0$')],
            correctIndex: 0,
            explanation: say('$f\'(x)=2x-2$ zero da $x=1$ puntuan, $f(1)=-1$ balioarekin (minimoa). Muturretan, $f(0)=0$ eta $f(4)=8$: maximoa 8 da, muturrean.', '$f\'(x)=2x-2$ se anula en $x=1$, con $f(1)=-1$ (el mínimo). En los bordes, $f(0)=0$ y $f(4)=8$: el máximo es 8, en el borde.', '$f\'(x)=2x-2$ تنعدم عند $x=1$ حيث $f(1)=-1$ (القيمة الصغرى). وعند الطرفين $f(0)=0$ و$f(4)=8$: القيمة العظمى 8 عند الطرف.', '$f\'(x)=2x-2$ is 0 at $x=1$, with $f(1)=-1$ (the minimum). At the ends, $f(0)=0$ and $f(4)=8$: the maximum is 8, at the end.')
        }
    },

    /* ---------- 2. Rolle and the mean value ---------- */
    rolle: {
        mistake: {
            wrong: say('$f(a)=f(b)$ bada, beti dago $f\'(c)=0$ duen $c$ bat.', 'Si $f(a)=f(b)$, siempre hay un $c$ con $f\'(c)=0$.', 'إذا كان $f(a)=f(b)$ فهناك دائمًا $c$ يحقق $f\'(c)=0$.', 'If $f(a)=f(b)$, there is always a $c$ with $f\'(c)=0$.'),
            right: say('Beste hipotesiak falta dira. $f(x)=|x|$ funtzioak $f(-1)=f(1)$ betetzen du, baina ez da deribagarria 0 puntuan, eta $f\'$ deribatuak $-1$ edo 1 balio du: ez dago $f\'(c)=0$ duen $c$ punturik.', 'Faltan las otras hipótesis. $f(x)=|x|$ cumple $f(-1)=f(1)$, pero no es derivable en 0, y $f\'$ vale $-1$ o 1: no hay ningún $c$ con $f\'(c)=0$.', 'تنقص الفرضيات الأخرى. تحقق $f(x)=|x|$ المساواة $f(-1)=f(1)$، لكنها غير قابلة للاشتقاق عند 0، و$f\'$ تساوي $-1$ أو 1: لا يوجد $c$ يحقق $f\'(c)=0$.', 'The other hypotheses are missing. $f(x)=|x|$ has $f(-1)=f(1)$, but it is not differentiable at 0, and $f\'$ is $-1$ or 1: there is no $c$ with $f\'(c)=0$.')
        },
        check: {
            prompt: say('Zein funtziotarako ziurtatzen du Rollek $c\\in(-1,\\,1)$ bat, $f\'(c)=0$ betetzen duena?', '¿Para cuál de estas funciones asegura Rolle un $c\\in(-1,\\,1)$ con $f\'(c)=0$?', 'لأي من هذه الدوال تضمن مبرهنة رول وجود $c\\in(-1,\\,1)$ يحقق $f\'(c)=0$؟', 'For which of these functions does Rolle guarantee a $c\\in(-1,\\,1)$ with $f\'(c)=0$?'),
            options: [same('$f(x)=|x|$'), same('$f(x)=x^2$'), same('$f(x)=x^3$')],
            correctIndex: 1,
            explanation: say('$x^2$ funtzioak hiru hipotesiak betetzen ditu, eta $c=0$. $|x|$ ez da deribagarria 0 puntuan, eta $x^3$ funtzioan $f(-1)\\neq f(1)$.', '$x^2$ cumple las tres hipótesis, con $c=0$. $|x|$ no es derivable en 0 y en $x^3$ es $f(-1)\\neq f(1)$.', 'تحقق $x^2$ الفرضيات الثلاث مع $c=0$. و$|x|$ غير قابلة للاشتقاق عند 0، وفي $x^3$ يكون $f(-1)\\neq f(1)$.', '$x^2$ meets the three hypotheses, with $c=0$. $|x|$ is not differentiable at 0 and for $x^3$, $f(-1)\\neq f(1)$.')
        }
    },
    'roots-count': {
        mistake: {
            wrong: say('Rollek ziurtatzen du $f$ funtzioak erro bat duela.', 'Rolle asegura que $f$ tiene una raíz.', 'تضمن مبرهنة رول أن للدالة $f$ جذرًا.', 'Rolle guarantees that $f$ has a root.'),
            right: say('Rollek zenbat dauden mugatzen du bakarrik; bat badagoela Bolzanok esaten du. $f(x)=x^2+1$ funtzioan, $f\'$ deribatuak erro bat du, baina $f$ funtzioak ez du bat ere.', 'Rolle solo limita cuántas hay; que exista una lo dice Bolzano. En $f(x)=x^2+1$, $f\'$ tiene una raíz, pero $f$ no tiene ninguna.', 'تحدّ مبرهنة رول عدد الجذور فقط؛ أما وجود جذر فتقوله مبرهنة بولتسانو. في $f(x)=x^2+1$ للمشتقة $f\'$ جذر، لكن ليس للدالة $f$ أي جذر.', 'Rolle only limits how many there are; that one exists is what Bolzano says. For $f(x)=x^2+1$, $f\'$ has a root, but $f$ has none.')
        },
        check: {
            prompt: say('Zenbat erro erreal ditu $x^3+x+5=0$ ekuazioak, $f\'(x)=3x^2+1$ izanik?', '¿Cuántas raíces reales tiene $x^3+x+5=0$, sabiendo que $f\'(x)=3x^2+1$?', 'كم جذرًا حقيقيًّا للمعادلة $x^3+x+5=0$، علمًا أن $f\'(x)=3x^2+1$؟', 'How many real roots does $x^3+x+5=0$ have, given that $f\'(x)=3x^2+1$?'),
            options: [same('$3$'), same('$0$'), same('$1$')],
            correctIndex: 2,
            explanation: say('$f(-2)=-5<0$ eta $f(-1)=3>0$: gutxienez bat dago. $f\'>0$ denez, ez dago gehiago: bat zehazki.', '$f(-2)=-5<0$ y $f(-1)=3>0$: hay al menos una. Como $f\'>0$, no hay más: exactamente una.', '$f(-2)=-5<0$ و$f(-1)=3>0$: يوجد جذر واحد على الأقل. وبما أن $f\'>0$ فلا يوجد غيره: جذر واحد بالضبط.', '$f(-2)=-5<0$ and $f(-1)=3>0$: there is at least one. Since $f\'>0$, there are no more: exactly one.')
        }
    },
    'mean-value': {
        mistake: {
            wrong: say('$c$ puntuak $f(c)=\\frac{f(b)-f(a)}{b-a}$ betetzen du.', 'El $c$ cumple $f(c)=\\frac{f(b)-f(a)}{b-a}$.', 'تحقق $c$ المساواة $f(c)=\\frac{f(b)-f(a)}{b-a}$.', 'The $c$ satisfies $f(c)=\\frac{f(b)-f(a)}{b-a}$.'),
            right: say('Malda berdintzen da, $f\'(c)$, ez altuera. $f(x)=x^2$ funtzioarekin $[0,\\,6]$ tartean, malda 6 da: $2c=6$ eta $c=3$; $f(c)=6$ eginez $c=\\sqrt{6}$ aterako litzateke, eta ez da hori.', 'Lo que se iguala es la pendiente, $f\'(c)$, no la altura. Con $f(x)=x^2$ en $[0,\\,6]$, la pendiente es 6: $2c=6$ y $c=3$; con $f(c)=6$ saldría $c=\\sqrt{6}$, que no es.', 'الذي نساويه هو الميل $f\'(c)$ لا الارتفاع. مع $f(x)=x^2$ على $[0,\\,6]$ يكون الميل 6: $2c=6$ و$c=3$؛ ولو أخذنا $f(c)=6$ لخرج $c=\\sqrt{6}$، وهو خطأ.', 'What you set equal is the slope, $f\'(c)$, not the height. With $f(x)=x^2$ on $[0,\\,6]$, the slope is 6: $2c=6$ and $c=3$; with $f(c)=6$ you would get $c=\\sqrt{6}$, which is wrong.')
        },
        check: {
            prompt: say('Zein da batez besteko balioaren $c$, $f(x)=x^2$ funtziorako $[0,\\,2]$ tartean?', '¿Cuál es el $c$ del valor medio para $f(x)=x^2$ en $[0,\\,2]$?', 'ما قيمة $c$ في مبرهنة القيمة المتوسطة للدالة $f(x)=x^2$ على $[0,\\,2]$؟', 'What is the mean value $c$ for $f(x)=x^2$ on $[0,\\,2]$?'),
            options: [same('$\\sqrt{2}$'), same('$2$'), same('$1$')],
            correctIndex: 2,
            explanation: say('Ebakitzailearen malda $\\frac{4-0}{2-0}=2$ da, eta $f\'(c)=2c=2$ eginez $c=1$.', 'La secante tiene pendiente $\\frac{4-0}{2-0}=2$, y $f\'(c)=2c=2$ da $c=1$.', 'ميل القاطع $\\frac{4-0}{2-0}=2$، و$f\'(c)=2c=2$ يعطي $c=1$.', 'The secant has slope $\\frac{4-0}{2-0}=2$, and $f\'(c)=2c=2$ gives $c=1$.')
        }
    },

    /* ---------- 3. L'Hôpital ---------- */
    hopital: {
        mistake: {
            wrong: say('L\'Hôpitalek edozein zatidurarekin balio du.', 'L\'Hôpital vale para cualquier cociente.', 'تصح قاعدة لوبيتال مع أي خارج قسمة.', 'L\'Hôpital works for any quotient.'),
            right: say('$\\frac{0}{0}$ edo $\\frac{\\infty}{\\infty}$ denean bakarrik. $\\lim_{x\\to 0}\\frac{x+3}{x+1}$ limitean ez dago indeterminaziorik: limitea 3 da, eta deribatuz 1 aterako litzateke, okerra.', 'Solo con $\\frac{0}{0}$ o $\\frac{\\infty}{\\infty}$. En $\\lim_{x\\to 0}\\frac{x+3}{x+1}$ no hay indeterminación: el límite es 3, y derivando saldría 1, que está mal.', 'فقط مع $\\frac{0}{0}$ أو $\\frac{\\infty}{\\infty}$. في $\\lim_{x\\to 0}\\frac{x+3}{x+1}$ لا يوجد عدم تعيين: النهاية 3، ولو اشتققنا لخرج 1، وهو خطأ.', 'Only with $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$. In $\\lim_{x\\to 0}\\frac{x+3}{x+1}$ there is no indeterminate form: the limit is 3, and differentiating would give 1, which is wrong.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to 0}\\frac{\\cos x}{x+1}$? Begiratu lehenik $\\frac{0}{0}$ den.', '¿Cuánto vale $\\lim_{x\\to 0}\\frac{\\cos x}{x+1}$? Mira primero si es $\\frac{0}{0}$.', 'كم تساوي $\\lim_{x\\to 0}\\frac{\\cos x}{x+1}$؟ انظر أولًا هل هي $\\frac{0}{0}$.', 'What is $\\lim_{x\\to 0}\\frac{\\cos x}{x+1}$? First see whether it is $\\frac{0}{0}$.'),
            options: [same('$0$'), same('$1$'), same('$-1$')],
            correctIndex: 1,
            explanation: say('Ordezkatuz $\\frac{1}{1}=1$ ateratzen da: ez dago indeterminaziorik. Deribatuz $\\frac{-\\sin 0}{1}=0$ aterako litzateke, okerra.', 'Al sustituir sale $\\frac{1}{1}=1$: no hay indeterminación. Derivando saldría $\\frac{-\\sin 0}{1}=0$, que está mal.', 'بالتعويض نحصل على $\\frac{1}{1}=1$: لا يوجد عدم تعيين. ولو اشتققنا لخرج $\\frac{-\\sin 0}{1}=0$، وهو خطأ.', 'Substituting gives $\\frac{1}{1}=1$: there is no indeterminate form. Differentiating would give $\\frac{-\\sin 0}{1}=0$, which is wrong.')
        }
    },
    'hopital-products': {
        mistake: {
            wrong: say('$0\\cdot\\infty$ beti da 0.', '$0\\cdot\\infty$ siempre da 0.', '$0\\cdot\\infty$ تساوي 0 دائمًا.', '$0\\cdot\\infty$ is always 0.'),
            right: say('Indeterminazio bat da: edozer eman dezake. $x\\cdot\\frac{3}{x}$ adierazpena $0\\cdot\\infty$ da $x\\to 0^+$ doanean, eta beti 3 balio du.', 'Es una indeterminación: puede dar cualquier cosa. $x\\cdot\\frac{3}{x}$ es $0\\cdot\\infty$ cuando $x\\to 0^+$, y vale 3 siempre.', 'إنها حالة عدم تعيين: قد تعطي أي شيء. فالعبارة $x\\cdot\\frac{3}{x}$ من النوع $0\\cdot\\infty$ عندما $x\\to 0^+$، وقيمتها 3 دائمًا.', 'It is an indeterminate form: it can give anything. $x\\cdot\\frac{3}{x}$ is $0\\cdot\\infty$ as $x\\to 0^+$, and it is always 3.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to+\\infty}x\\left(e^{1/x}-1\\right)$? $\\infty\\cdot 0$ da.', '¿Cuánto vale $\\lim_{x\\to+\\infty}x\\left(e^{1/x}-1\\right)$? Es $\\infty\\cdot 0$.', 'كم تساوي $\\lim_{x\\to+\\infty}x\\left(e^{1/x}-1\\right)$؟ إنها $\\infty\\cdot 0$.', 'What is $\\lim_{x\\to+\\infty}x\\left(e^{1/x}-1\\right)$? It is $\\infty\\cdot 0$.'),
            options: [same('$0$'), same('$+\\infty$'), same('$1$')],
            correctIndex: 2,
            explanation: say('$t=\\frac{1}{x}$ eginez, $\\lim_{t\\to 0}\\frac{e^t-1}{t}$ geratzen da, eta L\'Hôpitalek $\\frac{e^0}{1}=1$ ematen du.', 'Con $t=\\frac{1}{x}$ queda $\\lim_{t\\to 0}\\frac{e^t-1}{t}$, y L\'Hôpital da $\\frac{e^0}{1}=1$.', 'مع $t=\\frac{1}{x}$ تصير $\\lim_{t\\to 0}\\frac{e^t-1}{t}$، وتعطي قاعدة لوبيتال $\\frac{e^0}{1}=1$.', 'With $t=\\frac{1}{x}$ it becomes $\\lim_{t\\to 0}\\frac{e^t-1}{t}$, and L\'Hôpital gives $\\frac{e^0}{1}=1$.')
        }
    },
    'hopital-powers': {
        mistake: {
            wrong: say('$\\ln L=-1$ bada, limitea $-1$ da.', 'Si $\\ln L=-1$, el límite es $-1$.', 'إذا كان $\\ln L=-1$ فالنهاية $-1$.', 'If $\\ln L=-1$, the limit is $-1$.'),
            right: say('Logaritmoa desegin behar da: $\\ln L=-1$ bada, limitea $L=e^{-1}=\\frac{1}{e}$ da, positiboa.', 'Hay que deshacer el logaritmo: si $\\ln L=-1$, el límite es $L=e^{-1}=\\frac{1}{e}$, que es positivo.', 'يجب التخلص من اللوغاريتم: إذا كان $\\ln L=-1$ فالنهاية $L=e^{-1}=\\frac{1}{e}$، وهي موجبة.', 'The logarithm has to be undone: if $\\ln L=-1$, the limit is $L=e^{-1}=\\frac{1}{e}$, which is positive.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to 0}(1+3x)^{1/x}$? $1^\\infty$ da.', '¿Cuánto vale $\\lim_{x\\to 0}(1+3x)^{1/x}$? Es $1^\\infty$.', 'كم تساوي $\\lim_{x\\to 0}(1+3x)^{1/x}$؟ إنها $1^\\infty$.', 'What is $\\lim_{x\\to 0}(1+3x)^{1/x}$? It is $1^\\infty$.'),
            options: [same('$3$'), same('$e^3$'), same('$1$')],
            correctIndex: 1,
            explanation: say('$\\ln L=\\lim_{x\\to 0}\\frac{\\ln(1+3x)}{x}=\\lim_{x\\to 0}\\frac{3}{1+3x}=3$, beraz $L=e^3$.', '$\\ln L=\\lim_{x\\to 0}\\frac{\\ln(1+3x)}{x}=\\lim_{x\\to 0}\\frac{3}{1+3x}=3$, así que $L=e^3$.', '$\\ln L=\\lim_{x\\to 0}\\frac{\\ln(1+3x)}{x}=\\lim_{x\\to 0}\\frac{3}{1+3x}=3$، إذن $L=e^3$.', '$\\ln L=\\lim_{x\\to 0}\\frac{\\ln(1+3x)}{x}=\\lim_{x\\to 0}\\frac{3}{1+3x}=3$, so $L=e^3$.')
        }
    },

    /* ---------- 4. Coefficients with conditions ---------- */
    'extreme-condition': {
        mistake: {
            wrong: say('$(x_0,y_0)$ puntuko mutur batek $f(x_0)=0$ esan nahi du.', 'Un extremo en $(x_0,y_0)$ significa $f(x_0)=0$.', 'القيمة القصوى عند $(x_0,y_0)$ تعني $f(x_0)=0$.', 'An extremum at $(x_0,y_0)$ means $f(x_0)=0$.'),
            right: say('Bi gauza esan nahi ditu: $f\'(x_0)=0$, zuzen ukitzailea horizontala delako, eta $f(x_0)=y_0$, grafikoa puntutik igarotzen delako. Muturraren altuera ez da zertan 0 izan.', 'Significa dos cosas: $f\'(x_0)=0$, porque la tangente es horizontal, y $f(x_0)=y_0$, porque la gráfica pasa por el punto. La altura del extremo no tiene por qué ser 0.', 'تعني أمرين: $f\'(x_0)=0$ لأن المماس أفقي، و$f(x_0)=y_0$ لأن الرسم يمر بالنقطة. ولا يلزم أن يكون ارتفاع القيمة القصوى 0.', 'It means two things: $f\'(x_0)=0$, because the tangent is horizontal, and $f(x_0)=y_0$, because the graph passes through the point. The height of the extremum need not be 0.')
        },
        check: {
            prompt: say('$f(x)=x^2+bx+c$ funtzioak minimo bat du $(1,\\,4)$ puntuan. Zenbat da $c$?', '$f(x)=x^2+bx+c$ tiene un mínimo en $(1,\\,4)$. ¿Cuánto vale $c$?', 'للدالة $f(x)=x^2+bx+c$ قيمة صغرى عند $(1,\\,4)$. كم تساوي $c$؟', '$f(x)=x^2+bx+c$ has a minimum at $(1,\\,4)$. What is $c$?'),
            options: [same('$5$'), same('$4$'), same('$-2$')],
            correctIndex: 0,
            explanation: say('$f\'(1)=2+b=0$ eginez $b=-2$, eta $f(1)=1-2+c=4$ eginez $c=5$.', '$f\'(1)=2+b=0$ da $b=-2$, y $f(1)=1-2+c=4$ da $c=5$.', '$f\'(1)=2+b=0$ يعطي $b=-2$، و$f(1)=1-2+c=4$ يعطي $c=5$.', '$f\'(1)=2+b=0$ gives $b=-2$, and $f(1)=1-2+c=4$ gives $c=5$.')
        }
    },
    'inflection-condition': {
        mistake: {
            wrong: say('Inflexio-puntu batean $f\'=0$ da.', 'En un punto de inflexión, $f\'=0$.', 'عند نقطة الانعطاف يكون $f\'=0$.', 'At a point of inflection, $f\'=0$.'),
            right: say('Zero dena $f\'\'$ da. Inflexioko zuzen ukitzaileak edozein malda izan dezake: $f(x)=x^3-3x$ funtzioan, inflexioa 0 puntuan dago, $-3$ maldarekin.', 'Lo que se anula es $f\'\'$. La tangente de inflexión puede tener cualquier pendiente: en $f(x)=x^3-3x$, la inflexión está en 0 con pendiente $-3$.', 'الذي ينعدم هو $f\'\'$. قد يكون لمماس الانعطاف أي ميل: في $f(x)=x^3-3x$ يقع الانعطاف عند 0 وميله $-3$.', 'What is 0 is $f\'\'$. The inflectional tangent can have any slope: for $f(x)=x^3-3x$, the inflection is at 0 with slope $-3$.')
        },
        check: {
            prompt: say('$f(x)=ax^3+3x^2$ funtzioak inflexio bat du $x=1$ puntuan. Zenbat da $a$?', '$f(x)=ax^3+3x^2$ tiene una inflexión en $x=1$. ¿Cuánto vale $a$?', 'للدالة $f(x)=ax^3+3x^2$ نقطة انعطاف عند $x=1$. كم تساوي $a$؟', '$f(x)=ax^3+3x^2$ has an inflection at $x=1$. What is $a$?'),
            options: [same('$-1$'), same('$1$'), same('$-2$')],
            correctIndex: 0,
            explanation: say('$f\'\'(x)=6ax+6$, eta $f\'\'(1)=6a+6=0$ eginez $a=-1$. $f\'(1)=0$ erabiliz $a=-2$ aterako litzateke: hori da akatsa.', '$f\'\'(x)=6ax+6$, y $f\'\'(1)=6a+6=0$ da $a=-1$. Con $f\'(1)=0$ saldría $a=-2$: ese es el error.', '$f\'\'(x)=6ax+6$، و$f\'\'(1)=6a+6=0$ يعطي $a=-1$. ولو استعملنا $f\'(1)=0$ لخرج $a=-2$: وهذا هو الخطأ.', '$f\'\'(x)=6ax+6$, and $f\'\'(1)=6a+6=0$ gives $a=-1$. With $f\'(1)=0$ you would get $a=-2$: that is the mistake.')
        }
    },
    'extreme-tangent': {
        mistake: {
            wrong: say('$x_0$ puntuko $y=mx+n$ zuzen ukitzaileak malda bakarrik ematen du.', 'La tangente $y=mx+n$ en $x_0$ da solo la pendiente.', 'المماس $y=mx+n$ عند $x_0$ يعطي الميل فقط.', 'The tangent $y=mx+n$ at $x_0$ only gives the slope.'),
            right: say('Puntua ere ematen du: $f(x_0)=mx_0+n$. $x=2$ puntuko zuzen ukitzailea $y=3x-1$ bada, $f\'(2)=3$ eta, gainera, $f(2)=5$.', 'Da también el punto: $f(x_0)=mx_0+n$. Si la tangente en $x=2$ es $y=3x-1$, entonces $f\'(2)=3$ y además $f(2)=5$.', 'يعطي النقطة أيضًا: $f(x_0)=mx_0+n$. إذا كان المماس عند $x=2$ هو $y=3x-1$ فإن $f\'(2)=3$ و$f(2)=5$ أيضًا.', 'It gives the point too: $f(x_0)=mx_0+n$. If the tangent at $x=2$ is $y=3x-1$, then $f\'(2)=3$ and also $f(2)=5$.')
        },
        check: {
            prompt: say('$f(x)=ax^2+b$ funtzioaren zuzen ukitzailea $x=1$ puntuan $y=6x-2$ da. Zenbat da $b$?', 'La tangente a $f(x)=ax^2+b$ en $x=1$ es $y=6x-2$. ¿Cuánto vale $b$?', 'مماس $f(x)=ax^2+b$ عند $x=1$ هو $y=6x-2$. كم تساوي $b$؟', 'The tangent to $f(x)=ax^2+b$ at $x=1$ is $y=6x-2$. What is $b$?'),
            options: [same('$-2$'), same('$4$'), same('$1$')],
            correctIndex: 2,
            explanation: say('$f\'(1)=2a=6$ eginez $a=3$; altuera $6-2=4$ da, beraz $3+b=4$ eta $b=1$.', '$f\'(1)=2a=6$ da $a=3$; la altura es $6-2=4$, así que $3+b=4$ y $b=1$.', '$f\'(1)=2a=6$ يعطي $a=3$؛ والارتفاع $6-2=4$، إذن $3+b=4$ و$b=1$.', '$f\'(1)=2a=6$ gives $a=3$; the height is $6-2=4$, so $3+b=4$ and $b=1$.')
        }
    },

    /* ---------- 5. Optimisation ---------- */
    'areas-volumes': {
        mistake: {
            wrong: say('Nahikoa da $S\'(x)=0$ duen $x$ aurkitzea.', 'Basta con hallar el $x$ con $S\'(x)=0$.', 'يكفي إيجاد $x$ الذي يحقق $S\'(x)=0$.', 'It is enough to find the $x$ with $S\'(x)=0$.'),
            right: say('Egiaztatu behar da eskatzen den optimoa dela: $S\'\'$ deribatuarekin, $S\'$ deribatuaren zeinuarekin edo muturrekin alderatuz. Deribatuaren zero bat maximo bat izan daiteke minimo bat bilatzen duzunean.', 'Hay que comprobar que es el óptimo que se pide: con $S\'\'$, con el signo de $S\'$ o comparando con los bordes. Un cero de la derivada puede ser un máximo cuando buscas un mínimo.', 'يجب التحقق من أنه الأمثل المطلوب: بـ $S\'\'$ أو بإشارة $S\'$ أو بالمقارنة مع الطرفين. فقد يكون صفر المشتقة قيمة عظمى وأنت تبحث عن صغرى.', 'You have to check that it is the optimum you are asked for: with $S\'\'$, with the sign of $S\'$ or by comparing with the ends. A zero of the derivative can be a maximum when you are looking for a minimum.')
        },
        check: {
            prompt: say('Bi zenbaki positiboren batura 12 da. Zein da haien biderkaduraren balio handiena, $P(x)=x(12-x)$?', 'Dos números positivos suman 12. ¿Cuál es el mayor valor de su producto, $P(x)=x(12-x)$?', 'مجموع عددين موجبين 12. ما أكبر قيمة لجدائهما $P(x)=x(12-x)$؟', 'Two positive numbers add up to 12. What is the largest value of their product, $P(x)=x(12-x)$?'),
            options: [same('$36$'), same('$6$'), same('$32$')],
            correctIndex: 0,
            explanation: say('$P\'(x)=12-2x=0$ eginez $x=6$, eta $P(6)=6\\cdot 6=36$. 6 zenbakia $x$ da, ez biderkadura.', '$P\'(x)=12-2x=0$ da $x=6$, y $P(6)=6\\cdot 6=36$. El 6 es $x$, no el producto.', '$P\'(x)=12-2x=0$ يعطي $x=6$، و$P(6)=6\\cdot 6=36$. والعدد 6 هو $x$ لا الجداء.', '$P\'(x)=12-2x=0$ gives $x=6$, and $P(6)=6\\cdot 6=36$. The 6 is $x$, not the product.')
        }
    },
    distances: {
        mistake: {
            wrong: say('Distantzia minimoa $D=d^2$ funtzioaren minimoa da.', 'La distancia mínima es el mínimo de $D=d^2$.', 'المسافة الصغرى هي القيمة الصغرى لـ $D=d^2$.', 'The minimum distance is the minimum of $D=d^2$.'),
            right: say('$D$ funtzioaren minimoak puntua ematen du, baina distantzia haren erroa da: $D$ minimoa 9 bada, distantzia minimoa $d=\\sqrt{9}=3$ da.', 'El mínimo de $D$ da el punto, pero la distancia es su raíz: si el mínimo de $D$ vale 9, la distancia mínima es $d=\\sqrt{9}=3$.', 'تعطي القيمة الصغرى لـ $D$ النقطة، لكن المسافة جذرها: إذا كانت القيمة الصغرى لـ $D$ هي 9 فالمسافة الصغرى $d=\\sqrt{9}=3$.', 'The minimum of $D$ gives the point, but the distance is its root: if the minimum of $D$ is 9, the minimum distance is $d=\\sqrt{9}=3$.')
        },
        check: {
            prompt: say('Zein da $P(0,\\,2)$ puntutik $y=x^2$ parabolarainoko distantzia minimoa?', '¿Cuál es la distancia mínima de $P(0,\\,2)$ a la parábola $y=x^2$?', 'ما المسافة الصغرى من $P(0,\\,2)$ إلى القطع المكافئ $y=x^2$؟', 'What is the minimum distance from $P(0,\\,2)$ to the parabola $y=x^2$?'),
            options: [same('$\\frac{\\sqrt{7}}{2}$'), same('$\\frac{7}{4}$'), same('$2$')],
            correctIndex: 0,
            explanation: say('$D(x)=x^2+(x^2-2)^2=x^4-3x^2+4$ minimoa da $x^2=\\frac{3}{2}$ denean: $D=\\frac{7}{4}$ eta $d=\\frac{\\sqrt{7}}{2}$.', '$D(x)=x^2+(x^2-2)^2=x^4-3x^2+4$ es mínima con $x^2=\\frac{3}{2}$: $D=\\frac{7}{4}$ y $d=\\frac{\\sqrt{7}}{2}$.', '$D(x)=x^2+(x^2-2)^2=x^4-3x^2+4$ صغرى عندما $x^2=\\frac{3}{2}$: $D=\\frac{7}{4}$ و$d=\\frac{\\sqrt{7}}{2}$.', '$D(x)=x^2+(x^2-2)^2=x^4-3x^2+4$ is smallest when $x^2=\\frac{3}{2}$: $D=\\frac{7}{4}$ and $d=\\frac{\\sqrt{7}}{2}$.')
        }
    },
    'contexts-interval': {
        mistake: {
            wrong: say('Optimoa beti dago $B\'(x)=0$ den tokian.', 'El óptimo siempre está donde $B\'(x)=0$.', 'الأمثل دائمًا حيث $B\'(x)=0$.', 'The optimum is always where $B\'(x)=0$.'),
            right: say('Mutur batean egon daiteke. $B\'(x)=0$ tartetik kanpo badago, edo han minimo bat badago, maximoa tartearen muturretako batean dago.', 'Puede estar en un borde. Si $B\'(x)=0$ cae fuera del intervalo, o allí hay un mínimo, el máximo está en uno de los extremos del intervalo.', 'قد يكون عند طرف. إذا وقع $B\'(x)=0$ خارج الفترة، أو كانت هناك قيمة صغرى، فالقيمة العظمى عند أحد طرفي الفترة.', 'It can be at an end. If $B\'(x)=0$ falls outside the interval, or there is a minimum there, the maximum is at one of the ends of the interval.')
        },
        check: {
            prompt: say('Mozkina $B(x)=8x-x^2$ da, $x\\in[0,\\,3]$ izanik. Zein $x$ baliotan da maximoa?', 'El beneficio es $B(x)=8x-x^2$ con $x\\in[0,\\,3]$. ¿Para qué $x$ es máximo?', 'الربح $B(x)=8x-x^2$ حيث $x\\in[0,\\,3]$. عند أي قيمة $x$ يكون أعظم؟', 'The profit is $B(x)=8x-x^2$ with $x\\in[0,\\,3]$. For which $x$ is it largest?'),
            options: [same('$4$'), same('$0$'), same('$3$')],
            correctIndex: 2,
            explanation: say('$B\'(x)=8-2x$ zero da $x=4$ puntuan, tartetik kanpo; $[0,\\,3]$ tartean $B$ gorakorra da, eta maximoa $x=3$ muturrean dago.', '$B\'(x)=8-2x$ se anula en $x=4$, fuera del intervalo; en $[0,\\,3]$, $B$ crece y el máximo está en el borde $x=3$.', '$B\'(x)=8-2x$ تنعدم عند $x=4$ خارج الفترة؛ وعلى $[0,\\,3]$ تتزايد $B$ وتكون القيمة العظمى عند الطرف $x=3$.', '$B\'(x)=8-2x$ is 0 at $x=4$, outside the interval; on $[0,\\,3]$, $B$ increases and the maximum is at the end $x=3$.')
        }
    }
}

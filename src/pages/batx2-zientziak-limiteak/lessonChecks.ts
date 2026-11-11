import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 2 · Zientziak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no JSX)
   so the tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical mistake:
   0/0 read as 0, ∞ − ∞ = 0, δ = ε whatever the slope, √x² = x when
   x → −∞, a power beating an exponential, 1^∞ = 1, sin 3x / x = 1, the
   wrong piece at a joint, Bolzano or Weierstrass without their
   hypotheses.
   ========================================================================== */

export type Bach2LimitsTopicId =
    | 'review-point' | 'review-infinity' | 'review-continuity'
    | 'epsilon-delta' | 'infinite-definitions' | 'minus-infinity'
    | 'orders' | 'one-infinity' | 'sine-limit'
    | 'interval' | 'parameter' | 'two-parameters'
    | 'bolzano-equations' | 'intermediate' | 'weierstrass'

export const bach2LimitsLessonChecks: Record<Bach2LimitsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Review of 1.º ---------- */
    'review-point': {
        mistake: {
            wrong: say('$\\frac{0}{0}$ ateratzen bada, ez dago limiterik.', 'Si sale $\\frac{0}{0}$, no existe el límite.', 'إذا ظهرت $\\frac{0}{0}$ فلا توجد نهاية.', 'If you get $\\frac{0}{0}$, the limit does not exist.'),
            right: say('$\\frac{0}{0}$ indeterminazio bat da: eragiketak egin behar dira. Faktorizatuz, $\\frac{x^2-1}{x-1}=x+1$ eta limitea 2 da 1 puntuan.', '$\\frac{0}{0}$ es una indeterminación: hay que operar. Al factorizar, $\\frac{x^2-1}{x-1}=x+1$ y el límite en 1 es 2.', '$\\frac{0}{0}$ حالة عدم تعيين: يجب الحساب. بالتحليل $\\frac{x^2-1}{x-1}=x+1$ والنهاية عند 1 تساوي 2.', '$\\frac{0}{0}$ is an indeterminate form: you must work. Factorising, $\\frac{x^2-1}{x-1}=x+1$ and the limit at 1 is 2.')
        },
        check: {
            prompt: say('$f(x)=\\frac{x^2-5x}{x-5}$ bada, zenbat da $\\lim_{x\\to 5}f(x)$?', 'Si $f(x)=\\frac{x^2-5x}{x-5}$, ¿cuánto vale $\\lim_{x\\to 5}f(x)$?', 'إذا كانت $f(x)=\\frac{x^2-5x}{x-5}$، فكم تساوي $\\lim_{x\\to 5}f(x)$؟', 'If $f(x)=\\frac{x^2-5x}{x-5}$, what is $\\lim_{x\\to 5}f(x)$?'),
            options: [same('$5$'), same('$0$'), say('Ez dago', 'No existe', 'غير موجودة', 'It does not exist')],
            correctIndex: 0,
            explanation: say('$\\frac{x(x-5)}{x-5}=x$, eta $x\\to 5$ denean 5 baliora doa.', '$\\frac{x(x-5)}{x-5}=x$, que tiende a 5 cuando $x\\to 5$.', '$\\frac{x(x-5)}{x-5}=x$ وتؤول إلى 5 عندما $x\\to 5$.', '$\\frac{x(x-5)}{x-5}=x$, which tends to 5 as $x\\to 5$.')
        }
    },
    'review-infinity': {
        mistake: {
            wrong: same('$\\infty-\\infty=0$'),
            right: say('Indeterminazio bat da: konjokatuaz, $\\sqrt{x^2+2x}-x\\to 1$, ez 0.', 'Es una indeterminación: con el conjugado, $\\sqrt{x^2+2x}-x\\to 1$, no 0.', 'إنها حالة عدم تعيين: بالمرافق $\\sqrt{x^2+2x}-x\\to 1$ لا 0.', 'It is indeterminate: with the conjugate, $\\sqrt{x^2+2x}-x\\to 1$, not 0.')
        },
        check: {
            prompt: say('$f(x)=\\frac{2x^2+1}{4x^2-x}$ bada, zenbat da $\\lim_{x\\to+\\infty}f(x)$?', 'Si $f(x)=\\frac{2x^2+1}{4x^2-x}$, ¿cuánto vale $\\lim_{x\\to+\\infty}f(x)$?', 'إذا كانت $f(x)=\\frac{2x^2+1}{4x^2-x}$، فكم تساوي $\\lim_{x\\to+\\infty}f(x)$؟', 'If $f(x)=\\frac{2x^2+1}{4x^2-x}$, what is $\\lim_{x\\to+\\infty}f(x)$?'),
            options: [same('$2$'), same('$\\frac{1}{2}$'), same('$0$')],
            correctIndex: 1,
            explanation: say('Maila bera: $\\frac{2x^2}{4x^2}=\\frac{1}{2}$.', 'Mismo grado: $\\frac{2x^2}{4x^2}=\\frac{1}{2}$.', 'الدرجة نفسها: $\\frac{2x^2}{4x^2}=\\frac{1}{2}$.', 'Same degree: $\\frac{2x^2}{4x^2}=\\frac{1}{2}$.')
        }
    },
    'review-continuity': {
        mistake: {
            wrong: say('$f(a)$ ez badago, etenunea jauzikoa da.', 'Si no existe $f(a)$, la discontinuidad es de salto.', 'إذا لم توجد $f(a)$ فالانقطاع قفزة.', 'If $f(a)$ does not exist, the discontinuity is a jump.'),
            right: say('Limitea badago, saihesgarria da $f(a)$ ez egon arren: zuloa limitearen balioarekin estaltzen da.', 'Si existe el límite, es evitable aunque no exista $f(a)$: el agujero se tapa con el valor del límite.', 'إذا وُجدت النهاية فهو قابل للإزالة ولو لم توجد $f(a)$: يُسدّ الثقب بقيمة النهاية.', 'If the limit exists, it is removable even if $f(a)$ does not exist: the hole is filled with the value of the limit.')
        },
        check: {
            prompt: say('Zer etenune du $f(x)=\\frac{x+2}{x^2-4}$ funtzioak $x=-2$ puntuan?', '¿Qué discontinuidad tiene $f(x)=\\frac{x+2}{x^2-4}$ en $x=-2$?', 'ما نوع انقطاع $f(x)=\\frac{x+2}{x^2-4}$ عند $x=-2$؟', 'What discontinuity does $f(x)=\\frac{x+2}{x^2-4}$ have at $x=-2$?'),
            options: [say('Saihesgarria', 'Evitable', 'قابل للإزالة', 'Removable'), say('Jauzi finitukoa', 'De salto finito', 'قفزة منتهية', 'A finite jump'), say('Jauzi infinitukoa', 'De salto infinito', 'قفزة لانهائية', 'An infinite jump')],
            correctIndex: 0,
            explanation: say('$\\frac{x+2}{(x-2)(x+2)}=\\frac{1}{x-2}\\to-\\frac{1}{4}$: limitea badago.', '$\\frac{x+2}{(x-2)(x+2)}=\\frac{1}{x-2}\\to-\\frac{1}{4}$: existe el límite.', '$\\frac{x+2}{(x-2)(x+2)}=\\frac{1}{x-2}\\to-\\frac{1}{4}$: النهاية موجودة.', '$\\frac{x+2}{(x-2)(x+2)}=\\frac{1}{x-2}\\to-\\frac{1}{4}$: the limit exists.')
        }
    },

    /* ---------- 2. The exact definition ---------- */
    'epsilon-delta': {
        mistake: {
            wrong: say('Edozein $\\delta$ txikik balio du: $\\delta=\\varepsilon$ ere bai.', 'Vale cualquier $\\delta$ pequeño: también $\\delta=\\varepsilon$.', 'تصلح أي $\\delta$ صغيرة: و$\\delta=\\varepsilon$ أيضًا.', 'Any small $\\delta$ works: $\\delta=\\varepsilon$ too.'),
            right: say('$3x-1$ funtzioarekin $\\delta=\\varepsilon$ ez da nahikoa: $|x-1|<\\varepsilon$ izanda, $|f(x)-2|<3\\varepsilon$. Maldaz zatitu behar da.', 'Con $3x-1$, $\\delta=\\varepsilon$ no basta: si $|x-1|<\\varepsilon$, $|f(x)-2|<3\\varepsilon$. Hay que dividir entre la pendiente.', 'مع $3x-1$ لا تكفي $\\delta=\\varepsilon$: إذا كان $|x-1|<\\varepsilon$ فإن $|f(x)-2|<3\\varepsilon$. يجب القسمة على الميل.', 'With $3x-1$, $\\delta=\\varepsilon$ is not enough: if $|x-1|<\\varepsilon$, $|f(x)-2|<3\\varepsilon$. You must divide by the slope.')
        },
        check: {
            prompt: say('$\\lim_{x\\to 3}(2x+1)=7$ eta $\\varepsilon=0{,}2$ badira, zein da balio duen $\\delta$ handiena?', 'Para $\\lim_{x\\to 3}(2x+1)=7$ y $\\varepsilon=0{,}2$, ¿cuál es el mayor $\\delta$ que sirve?', 'إذا كانت $\\lim_{x\\to 3}(2x+1)=7$ و$\\varepsilon=0{,}2$، فما أكبر $\\delta$ تصلح؟', 'For $\\lim_{x\\to 3}(2x+1)=7$ and $\\varepsilon=0{,}2$, what is the largest $\\delta$ that works?'),
            options: [same('$0{,}1$'), same('$0{,}2$'), same('$0{,}4$')],
            correctIndex: 0,
            explanation: say('$|2x+1-7|=2|x-3|<0{,}2$ eginda, $|x-3|<0{,}1$.', '$|2x+1-7|=2|x-3|<0{,}2$ lleva a $|x-3|<0{,}1$.', '$|2x+1-7|=2|x-3|<0{,}2$ يؤدي إلى $|x-3|<0{,}1$.', '$|2x+1-7|=2|x-3|<0{,}2$ leads to $|x-3|<0{,}1$.')
        }
    },
    'infinite-definitions': {
        mistake: {
            wrong: say('Infinituan ere $\\delta$ bat bilatzen da puntu baten inguruan.', 'En el infinito también se busca un $\\delta$ alrededor de un punto.', 'عند اللانهاية أيضًا نبحث عن $\\delta$ حول نقطة.', 'At infinity you also look for a $\\delta$ around a point.'),
            right: say('Ez dago hurbiltzeko punturik: $K$ bat bilatzen da, eta handik aurrera $|f(x)-L|<\\varepsilon$.', 'No hay punto al que acercarse: se busca un $K$ a partir del cual $|f(x)-L|<\\varepsilon$.', 'لا توجد نقطة نقترب منها: نبحث عن $K$ يتحقق ابتداءً منه $|f(x)-L|<\\varepsilon$.', 'There is no point to approach: you look for a $K$ from which on $|f(x)-L|<\\varepsilon$.')
        },
        check: {
            prompt: say('$\\lim_{x\\to+\\infty}\\frac{1}{x}=0$ da. Zein $K$ baliotik aurrera betetzen da $\\frac{1}{x}<0{,}001$?', 'Como $\\lim_{x\\to+\\infty}\\frac{1}{x}=0$, ¿a partir de qué $K$ se cumple $\\frac{1}{x}<0{,}001$?', 'بما أن $\\lim_{x\\to+\\infty}\\frac{1}{x}=0$، فابتداءً من أي $K$ يتحقق $\\frac{1}{x}<0{,}001$؟', 'As $\\lim_{x\\to+\\infty}\\frac{1}{x}=0$, from which $K$ on does $\\frac{1}{x}<0{,}001$ hold?'),
            options: [same('$K=100$'), same('$K=1000$'), same('$K=0{,}001$')],
            correctIndex: 1,
            explanation: say('$\\frac{1}{x}<0{,}001$ betetzen da $x>1000$ denean.', '$\\frac{1}{x}<0{,}001$ cuando $x>1000$.', '$\\frac{1}{x}<0{,}001$ عندما $x>1000$.', '$\\frac{1}{x}<0{,}001$ when $x>1000$.')
        }
    },
    'minus-infinity': {
        mistake: {
            wrong: say('$\\sqrt{x^2}=x$ da $x\\to-\\infty$ denean ere.', '$\\sqrt{x^2}=x$ también cuando $x\\to-\\infty$.', '$\\sqrt{x^2}=x$ أيضًا عندما $x\\to-\\infty$.', '$\\sqrt{x^2}=x$ also as $x\\to-\\infty$.'),
            right: say('$x<0$ bada, $\\sqrt{x^2}=-x$: $\\sqrt{(-5)^2}=5$, ez $-5$.', 'Si $x<0$, $\\sqrt{x^2}=-x$: $\\sqrt{(-5)^2}=5$, no $-5$.', 'إذا كان $x<0$ فإن $\\sqrt{x^2}=-x$: $\\sqrt{(-5)^2}=5$ لا $-5$.', 'If $x<0$, $\\sqrt{x^2}=-x$: $\\sqrt{(-5)^2}=5$, not $-5$.')
        },
        check: {
            prompt: say('$f(x)=\\frac{\\sqrt{9x^2+1}}{x}$ bada, zenbat da $\\lim_{x\\to-\\infty}f(x)$?', 'Si $f(x)=\\frac{\\sqrt{9x^2+1}}{x}$, ¿cuánto vale $\\lim_{x\\to-\\infty}f(x)$?', 'إذا كانت $f(x)=\\frac{\\sqrt{9x^2+1}}{x}$، فكم تساوي $\\lim_{x\\to-\\infty}f(x)$؟', 'If $f(x)=\\frac{\\sqrt{9x^2+1}}{x}$, what is $\\lim_{x\\to-\\infty}f(x)$?'),
            options: [same('$3$'), same('$-3$'), same('$-\\infty$')],
            correctIndex: 1,
            explanation: say('$x=-t$ eginda: $\\frac{\\sqrt{9t^2+1}}{-t}\\to\\frac{3t}{-t}=-3$.', 'Con $x=-t$: $\\frac{\\sqrt{9t^2+1}}{-t}\\to\\frac{3t}{-t}=-3$.', 'مع $x=-t$: $\\frac{\\sqrt{9t^2+1}}{-t}\\to\\frac{3t}{-t}=-3$.', 'With $x=-t$: $\\frac{\\sqrt{9t^2+1}}{-t}\\to\\frac{3t}{-t}=-3$.')
        }
    },

    /* ---------- 3. Infinities and notable limits ---------- */
    orders: {
        mistake: {
            wrong: say('$\\lim_{x\\to+\\infty}\\frac{x^5}{2^x}=+\\infty$, hasieran $x^5$ handiagoa delako.', '$\\lim_{x\\to+\\infty}\\frac{x^5}{2^x}=+\\infty$, porque al principio $x^5$ es mayor.', '$\\lim_{x\\to+\\infty}\\frac{x^5}{2^x}=+\\infty$ لأن $x^5$ أكبر في البداية.', '$\\lim_{x\\to+\\infty}\\frac{x^5}{2^x}=+\\infty$, because at first $x^5$ is bigger.'),
            right: say('Esponentzialak beti irabazten dio azkenean berreketari: limitea 0 da.', 'La exponencial siempre acaba ganando a la potencia: el límite es 0.', 'الأسية تتفوق دائمًا على القوة في النهاية: النهاية 0.', 'The exponential always ends up beating the power: the limit is 0.')
        },
        check: {
            prompt: say('$f(x)=\\frac{3^x}{x^4}$ bada, zenbat da $\\lim_{x\\to+\\infty}f(x)$?', 'Si $f(x)=\\frac{3^x}{x^4}$, ¿cuánto vale $\\lim_{x\\to+\\infty}f(x)$?', 'إذا كانت $f(x)=\\frac{3^x}{x^4}$، فكم تساوي $\\lim_{x\\to+\\infty}f(x)$؟', 'If $f(x)=\\frac{3^x}{x^4}$, what is $\\lim_{x\\to+\\infty}f(x)$?'),
            options: [same('$0$'), same('$+\\infty$'), same('$3$')],
            correctIndex: 1,
            explanation: say('$3^x$ ordena handiagoko infinitua da $x^4$ baino.', '$3^x$ es un infinito de mayor orden que $x^4$.', '$3^x$ لانهاية من رتبة أكبر من $x^4$.', '$3^x$ is an infinity of higher order than $x^4$.')
        }
    },
    'one-infinity': {
        mistake: {
            wrong: say('$1^{\\infty}=1$, 1 edozein zenbakitara berretuta 1 delako.', '$1^{\\infty}=1$, porque 1 elevado a cualquier número es 1.', '$1^{\\infty}=1$ لأن 1 مرفوعًا لأي عدد يساوي 1.', '$1^{\\infty}=1$, because 1 to any power is 1.'),
            right: say('Oinarria ez da 1, 1 baliora hurbiltzen da: $\\left(1+\\frac{1}{x}\\right)^{x}\\to e$, ez 1.', 'La base no es 1, solo se acerca a 1: $\\left(1+\\frac{1}{x}\\right)^{x}\\to e$, no 1.', 'الأساس ليس 1 بل يقترب من 1: $\\left(1+\\frac{1}{x}\\right)^{x}\\to e$ لا 1.', 'The base is not 1, it only approaches 1: $\\left(1+\\frac{1}{x}\\right)^{x}\\to e$, not 1.')
        },
        check: {
            prompt: say('$f(x)=(1+2x)^{\\frac{1}{x}}$ bada, zenbat da $\\lim_{x\\to 0}f(x)$?', 'Si $f(x)=(1+2x)^{\\frac{1}{x}}$, ¿cuánto vale $\\lim_{x\\to 0}f(x)$?', 'إذا كانت $f(x)=(1+2x)^{\\frac{1}{x}}$، فكم تساوي $\\lim_{x\\to 0}f(x)$؟', 'If $f(x)=(1+2x)^{\\frac{1}{x}}$, what is $\\lim_{x\\to 0}f(x)$?'),
            options: [same('$1$'), same('$e$'), same('$e^{2}$')],
            correctIndex: 2,
            explanation: say('$\\frac{1}{x}\\,(1+2x-1)=2$: limitea $e^{2}$ da.', '$\\frac{1}{x}\\,(1+2x-1)=2$: el límite es $e^{2}$.', '$\\frac{1}{x}\\,(1+2x-1)=2$: النهاية $e^{2}$.', '$\\frac{1}{x}\\,(1+2x-1)=2$: the limit is $e^{2}$.')
        }
    },
    'sine-limit': {
        mistake: {
            wrong: same('$\\lim_{x\\to 0}\\frac{\\sin 3x}{x}=1$'),
            right: say('3 falta da: $\\frac{\\sin 3x}{x}=3\\cdot\\frac{\\sin 3x}{3x}\\to 3$.', 'Falta el 3: $\\frac{\\sin 3x}{x}=3\\cdot\\frac{\\sin 3x}{3x}\\to 3$.', 'ينقص العدد 3: $\\frac{\\sin 3x}{x}=3\\cdot\\frac{\\sin 3x}{3x}\\to 3$.', 'The 3 is missing: $\\frac{\\sin 3x}{x}=3\\cdot\\frac{\\sin 3x}{3x}\\to 3$.')
        },
        check: {
            prompt: say('$f(x)=\\frac{\\sin 6x}{3x}$ bada, zenbat da $\\lim_{x\\to 0}f(x)$?', 'Si $f(x)=\\frac{\\sin 6x}{3x}$, ¿cuánto vale $\\lim_{x\\to 0}f(x)$?', 'إذا كانت $f(x)=\\frac{\\sin 6x}{3x}$، فكم تساوي $\\lim_{x\\to 0}f(x)$؟', 'If $f(x)=\\frac{\\sin 6x}{3x}$, what is $\\lim_{x\\to 0}f(x)$?'),
            options: [same('$2$'), same('$1$'), same('$\\frac{1}{2}$')],
            correctIndex: 0,
            explanation: same('$\\frac{\\sin 6x}{3x}=2\\cdot\\frac{\\sin 6x}{6x}\\to 2$')
        }
    },

    /* ---------- 4. Continuity in depth ---------- */
    interval: {
        mistake: {
            wrong: say('$\\sqrt{x}$ ez da jarraitua 0 puntuan, ez dagoelako ezkerreko limiterik.', '$\\sqrt{x}$ no es continua en 0 porque no existe el límite por la izquierda.', '$\\sqrt{x}$ ليست متصلة عند 0 لأن النهاية من اليسار غير موجودة.', '$\\sqrt{x}$ is not continuous at 0 because there is no limit from the left.'),
            right: say('Izate-eremuaren muturrean nahikoa da dagoen aldea: $\\lim_{x\\to 0^+}\\sqrt{x}=0=\\sqrt{0}$, eskuinetik jarraitua.', 'En el extremo de su dominio basta el lado que existe: $\\lim_{x\\to 0^+}\\sqrt{x}=0=\\sqrt{0}$, continua por la derecha.', 'عند طرف مجالها يكفي الجانب الموجود: $\\lim_{x\\to 0^+}\\sqrt{x}=0=\\sqrt{0}$، متصلة من اليمين.', 'At the end of its domain the side that exists is enough: $\\lim_{x\\to 0^+}\\sqrt{x}=0=\\sqrt{0}$, continuous from the right.')
        },
        check: {
            prompt: say('Zein tartetan da jarraitua $f(x)=\\sqrt{x-4}$ funtzioa?', '¿En qué intervalo es continua $f(x)=\\sqrt{x-4}$?', 'على أي فترة تكون $f(x)=\\sqrt{x-4}$ متصلة؟', 'On which interval is $f(x)=\\sqrt{x-4}$ continuous?'),
            options: [same('$[4,+\\infty)$'), same('$(4,+\\infty)$'), same('$\\mathbb{R}$')],
            correctIndex: 0,
            explanation: say('Izate-eremua $[4,+\\infty)$ da: 4 puntuan, eskuinetik jarraitua.', 'Dominio $[4,+\\infty)$: en 4, continua por la derecha.', 'المجال $[4,+\\infty)$: عند 4 متصلة من اليمين.', 'Domain $[4,+\\infty)$: at 4, continuous from the right.')
        }
    },
    parameter: {
        mistake: {
            wrong: say('0 baliotik eskuinera $x\\le 0$ daraman zatia erabiltzen da, 0 barne hartzen duelako.', 'Por la derecha de 0 se usa el trozo que lleva $x\\le 0$, porque incluye el 0.', 'إلى يمين 0 نستعمل الجزء الذي فيه $x\\le 0$ لأنه يضم 0.', 'To the right of 0 you use the piece with $x\\le 0$, because it includes 0.'),
            right: say('Eskuinetik $x>0$ zatia erabiltzen da; $\\le$ daraman zatiak $f(0)$ eta ezkerreko limitea ematen ditu.', 'Por la derecha se usa el trozo de $x>0$; el trozo con $\\le$ da $f(0)$ y el límite por la izquierda.', 'من اليمين نستعمل جزء $x>0$؛ والجزء الذي فيه $\\le$ يعطي $f(0)$ والنهاية من اليسار.', 'From the right you use the piece for $x>0$; the piece with $\\le$ gives $f(0)$ and the limit from the left.')
        },
        check: {
            prompt: say('$f(x)=\\begin{cases}2^x+k & x<1\\\\ 5 & x\\ge 1\\end{cases}$ bada, zein $k$ baliok egiten du jarraitua $x=1$ puntuan?', 'Si $f(x)=\\begin{cases}2^x+k & x<1\\\\ 5 & x\\ge 1\\end{cases}$, ¿qué valor de $k$ la hace continua en $x=1$?', 'إذا كانت $f(x)=\\begin{cases}2^x+k & x<1\\\\ 5 & x\\ge 1\\end{cases}$، فأي قيمة لـ $k$ تجعلها متصلة عند $x=1$؟', 'If $f(x)=\\begin{cases}2^x+k & x<1\\\\ 5 & x\\ge 1\\end{cases}$, which value of $k$ makes it continuous at $x=1$?'),
            options: [same('$k=3$'), same('$k=5$'), same('$k=7$')],
            correctIndex: 0,
            explanation: same('$2^1+k=5\\ \\to\\ k=3$')
        }
    },
    'two-parameters': {
        mistake: {
            wrong: say('Lotune bat begiratzea nahikoa da: $x=1$ puntuarekin $a$ ateratzen da jada.', 'Basta con mirar una unión: con $x=1$ ya sale $a$.', 'يكفي النظر إلى نقطة التقاء واحدة: مع $x=1$ نجد $a$.', 'Looking at one joint is enough: with $x=1$ you already get $a$.'),
            right: say('Ekuazio bakar batek ez ditu bi parametro finkatzen: bi lotuneak behar dira.', 'Una sola ecuación no fija dos parámetros: hacen falta las dos uniones.', 'معادلة واحدة لا تحدد وسيطين: تلزم نقطتا الالتقاء معًا.', 'One equation does not fix two parameters: both joints are needed.')
        },
        check: {
            prompt: say('$f(x)=\\begin{cases}x+a & x<0\\\\ b & 0\\le x<1\\\\ 2x & x\\ge 1\\end{cases}$ jarraitua bada, zenbat dira $a$ eta $b$?', 'Si $f(x)=\\begin{cases}x+a & x<0\\\\ b & 0\\le x<1\\\\ 2x & x\\ge 1\\end{cases}$ es continua, ¿cuánto valen $a$ y $b$?', 'إذا كانت $f(x)=\\begin{cases}x+a & x<0\\\\ b & 0\\le x<1\\\\ 2x & x\\ge 1\\end{cases}$ متصلة، فكم تساوي $a$ و$b$؟', 'If $f(x)=\\begin{cases}x+a & x<0\\\\ b & 0\\le x<1\\\\ 2x & x\\ge 1\\end{cases}$ is continuous, what are $a$ and $b$?'),
            options: [same('$a=2,\\ b=2$'), same('$a=0,\\ b=2$'), same('$a=2,\\ b=0$')],
            correctIndex: 0,
            explanation: say('0 puntuan: $a=b$. 1 puntuan: $b=2$. Beraz, $a=b=2$.', 'En 0: $a=b$. En 1: $b=2$. Así, $a=b=2$.', 'عند 0: $a=b$. وعند 1: $b=2$. إذن $a=b=2$.', 'At 0: $a=b$. At 1: $b=2$. So $a=b=2$.')
        }
    },

    /* ---------- 5. Theorems on continuous functions ---------- */
    'bolzano-equations': {
        mistake: {
            wrong: say('$f$ eta $g$ ebakitzen direla ikusteko, $f(a)$ eta $g(b)$ zeinu desberdinekoak diren begiratzen dut.', 'Para ver que $f$ y $g$ se cortan, miro si $f(a)$ y $g(b)$ tienen distinto signo.', 'لأعرف أن $f$ و$g$ تتقاطعان أنظر هل إشارتا $f(a)$ و$g(b)$ مختلفتان.', 'To see that $f$ and $g$ cross, I check whether $f(a)$ and $g(b)$ have different signs.'),
            right: say('$h=f-g$ funtzioaren zeinua begiratu behar da bi muturretan: $h(a)$ eta $h(b)$.', 'Hay que mirar el signo de $h=f-g$ en los dos extremos: $h(a)$ y $h(b)$.', 'يجب النظر إلى إشارة $h=f-g$ عند الطرفين: $h(a)$ و$h(b)$.', 'You must look at the sign of $h=f-g$ at both ends: $h(a)$ and $h(b)$.')
        },
        check: {
            prompt: say('Bolzanok ziurtatzen al du $x^3=x+1$ ekuazioak soluzio bat duela $(1,2)$ tartean?', '¿Asegura Bolzano que $x^3=x+1$ tiene una solución en $(1,2)$?', 'هل تضمن بولتسانو أن للمعادلة $x^3=x+1$ حلًّا في $(1,2)$؟', 'Does Bolzano ensure that $x^3=x+1$ has a solution in $(1,2)$?'),
            options: [say('Bai: $h(1)<0$ eta $h(2)>0$', 'Sí: $h(1)<0$ y $h(2)>0$', 'نعم: $h(1)<0$ و$h(2)>0$', 'Yes: $h(1)<0$ and $h(2)>0$'), say('Ez: $1^{3}$ eta $2^{3}$ positiboak dira', 'No: $1^{3}$ y $2^{3}$ son positivos', 'لا: $1^{3}$ و$2^{3}$ موجبان', 'No: $1^{3}$ and $2^{3}$ are positive'), say('Ezin da jakin', 'No se puede saber', 'لا يمكن المعرفة', 'It cannot be known')],
            correctIndex: 0,
            explanation: say('$h(x)=x^3-x-1$: $h(1)=-1$ eta $h(2)=5$; jarraitua da eta zeinuz aldatzen da.', '$h(x)=x^3-x-1$: $h(1)=-1$ y $h(2)=5$; es continua y cambia de signo.', '$h(x)=x^3-x-1$: ‏$h(1)=-1$ و$h(2)=5$؛ وهي متصلة وتتغير إشارتها.', '$h(x)=x^3-x-1$: $h(1)=-1$ and $h(2)=5$; it is continuous and changes sign.')
        }
    },
    intermediate: {
        mistake: {
            wrong: say('$f(a)=0$ eta $f(b)=10$ badira, $f$ funtzioak 5 balioa hartzen du, jauzi bat izan arren.', 'Si $f(a)=0$ y $f(b)=10$, $f$ toma el valor 5 aunque tenga un salto.', 'إذا كان $f(a)=0$ و$f(b)=10$ فإن $f$ تأخذ القيمة 5 ولو كان لها قفزة.', 'If $f(a)=0$ and $f(b)=10$, $f$ takes the value 5 even if it has a jump.'),
            right: say('Jarraitutasunik gabe, ez: jauzia duen funtzio batek 5 saltatu dezake.', 'Sin continuidad, no: una función con un salto puede saltarse el 5.', 'بلا اتصال لا: الدالة ذات القفزة قد تقفز فوق 5.', 'Without continuity, no: a function with a jump can skip 5.')
        },
        check: {
            prompt: say('$f$ jarraitua da $[0,4]$ tartean, $f(0)=1$ eta $f(4)=9$. Ziurta al daiteke $c$ batentzat $f(c)=7$ dela?', '$f$ es continua en $[0,4]$, $f(0)=1$ y $f(4)=9$. ¿Se puede asegurar que $f(c)=7$ para algún $c$?', '$f$ متصلة على $[0,4]$ و$f(0)=1$ و$f(4)=9$. هل يمكن ضمان أن $f(c)=7$ لقيمة ما $c$؟', '$f$ is continuous on $[0,4]$, $f(0)=1$ and $f(4)=9$. Can we be sure that $f(c)=7$ for some $c$?'),
            options: [say('Ez, $f$ gorakorra bada bakarrik', 'No, solo si $f$ es creciente', 'لا، إلا إذا كانت $f$ متزايدة', 'No, only if $f$ is increasing'), say('Bai, tarteko balioengatik', 'Sí, por los valores intermedios', 'نعم، بسبب القيم الوسيطة', 'Yes, by the intermediate values'), say('$c=3$ bada bakarrik', 'Solo si $c=3$', 'فقط إذا كان $c=3$', 'Only if $c=3$')],
            correctIndex: 1,
            explanation: say('7 zenbakia $f(0)=1$ eta $f(4)=9$ artean dago, eta $f$ jarraitua da.', '7 está entre $f(0)=1$ y $f(4)=9$, y $f$ es continua.', 'العدد 7 بين $f(0)=1$ و$f(4)=9$، و$f$ متصلة.', '7 is between $f(0)=1$ and $f(4)=9$, and $f$ is continuous.')
        }
    },
    weierstrass: {
        mistake: {
            wrong: say('$(0,1)$ tartean jarraitua den funtzio orok du maximoa eta minimoa.', 'Toda función continua en $(0,1)$ tiene máximo y mínimo.', 'كل دالة متصلة على $(0,1)$ لها قيمة عظمى وصغرى.', 'Every function continuous on $(0,1)$ has a maximum and a minimum.'),
            right: say('Tarte itxia behar da: $x$ funtzioak $(0,1)$ tartean ez du hartzen ez 0 ez 1.', 'Hace falta el intervalo cerrado: $x$ en $(0,1)$ no alcanza ni 0 ni 1.', 'تلزم الفترة المغلقة: $x$ على $(0,1)$ لا تبلغ 0 ولا 1.', 'The closed interval is needed: $x$ on $(0,1)$ reaches neither 0 nor 1.')
        },
        check: {
            prompt: say('Funtzio hauetatik zeinek hartzen du ziur maximo absolutu bat bere tartean?', '¿Cuál de estas funciones alcanza seguro un máximo absoluto en su intervalo?', 'أي هذه الدوال تبلغ حتمًا قيمة عظمى مطلقة على فترتها؟', 'Which of these functions surely reaches an absolute maximum on its interval?'),
            options: [say('$\\frac{1}{x}$, $(0,2]$ tartean', '$\\frac{1}{x}$ en $(0,2]$', '$\\frac{1}{x}$ على $(0,2]$', '$\\frac{1}{x}$ on $(0,2]$'), say('$x^2$, $[-3,1]$ tartean', '$x^2$ en $[-3,1]$', '$x^2$ على $[-3,1]$', '$x^2$ on $[-3,1]$'), say('$x$, $(0,1)$ tartean', '$x$ en $(0,1)$', '$x$ على $(0,1)$', '$x$ on $(0,1)$')],
            correctIndex: 1,
            explanation: say('$x^2$ jarraitua da eta $[-3,1]$ itxia: bere maximoa $(-3)^2=9$ da.', '$x^2$ es continua y $[-3,1]$ es cerrado: su máximo es $(-3)^2=9$.', '$x^2$ متصلة و$[-3,1]$ مغلقة: قيمتها العظمى $(-3)^2=9$.', '$x^2$ is continuous and $[-3,1]$ is closed: its maximum is $(-3)^2=9$.')
        }
    }
}

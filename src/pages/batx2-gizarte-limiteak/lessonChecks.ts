import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 2 · Gizarte Zientziak — the
   typical mistake and the «Check it» question of every lesson. Plain data
   (no JSX) so the tests can import it; lessons.tsx merges it into the
   topics. The questions use new numbers, and one of their wrong answers
   is the lesson's typical mistake: a limit that must be reached, k/∞ = ∞,
   1^∞ = 1, ∞ − ∞ = 0, the wrong degree with x → −∞, k/0 read as 0, 0/0
   read as «no limit», continuity checked with f(a) alone, the jump of a
   tariff mistaken for its price, a parameter fitted on one side only.
   ========================================================================== */

export type Bach2gLimitsTopicId =
    | 'branches' | 'infinity-arithmetic' | 'indeterminate'
    | 'degrees' | 'conjugate' | 'number-e'
    | 'one-sided' | 'k-zero' | 'zero-zero'
    | 'continuous' | 'discontinuities' | 'parameter'
    | 'long-run' | 'brackets' | 'fair-tariff'

export const bach2gLimitsLessonChecks: Record<Bach2gLimitsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. The graph and infinity ---------- */
    branches: {
        mistake: {
            wrong: say('Kurba ez da inoiz $y=2$ zuzenera iristen; beraz, limitea ez da 2.', 'La curva nunca llega a la recta $y=2$; así que el límite no es 2.', 'لا يبلغ المنحنى المستقيم $y=2$ أبدًا؛ إذن ليست النهاية 2.', 'The curve never reaches the line $y=2$; so the limit is not 2.'),
            right: say('Limitea kurba hurbiltzen den altuera da, ez iristen dena: gero eta hurbilago badago, limitea 2 da.', 'El límite es la altura a la que se acerca la curva, no a la que llega: si se pega cada vez más, el límite es 2.', 'النهاية هي الارتفاع الذي يقترب منه المنحنى لا الذي يبلغه: إذا التصق به أكثر فأكثر فالنهاية 2.', 'The limit is the height the curve approaches, not one it reaches: if it gets ever closer, the limit is 2.')
        },
        check: {
            prompt: say('Kurba bat $y=-3$ zuzenera hurbiltzen da eskuinerantz, ukitu gabe. Zenbat da $\\lim_{x\\to+\\infty}f(x)$?', 'Una curva se pega a la recta $y=-3$ hacia la derecha, sin tocarla. ¿Cuánto vale $\\lim_{x\\to+\\infty}f(x)$?', 'يقترب منحنى من المستقيم $y=-3$ نحو اليمين دون أن يلمسه. كم تساوي $\\lim_{x\\to+\\infty}f(x)$؟', 'A curve hugs the line $y=-3$ to the right, without touching it. What is $\\lim_{x\\to+\\infty}f(x)$?'),
            options: [say('Ez dago, ez delako iristen', 'No existe, porque no llega', 'غير موجودة لأنه لا يبلغه', 'It does not exist, as it never gets there'), same('$-3$'), same('$+\\infty$')],
            correctIndex: 1,
            explanation: say('Hurbiltzea nahikoa da: limitea $-3$ da.', 'Basta con acercarse: el límite es $-3$.', 'يكفي الاقتراب: النهاية $-3$.', 'Getting close is enough: the limit is $-3$.')
        }
    },
    'infinity-arithmetic': {
        mistake: {
            wrong: same('$\\frac{7}{\\infty}=\\infty$'),
            right: say('Zenbaki bat gero eta handiagoa den zenbaki batez zatituz, emaitza gero eta txikiagoa da: $\\frac{7}{\\infty}=0$.', 'Al dividir un número entre otro cada vez mayor, el resultado es cada vez más pequeño: $\\frac{7}{\\infty}=0$.', 'عند قسمة عدد على عدد يكبر باستمرار تصغر النتيجة باستمرار: $\\frac{7}{\\infty}=0$.', 'Dividing a number by an ever larger one gives an ever smaller result: $\\frac{7}{\\infty}=0$.')
        },
        check: {
            prompt: say('$f\\to-\\infty$ eta $g\\to 2$ badira, zein da $\\frac{f}{g}$ funtzioaren limitea?', 'Si $f\\to-\\infty$ y $g\\to 2$, ¿cuál es el límite de $\\frac{f}{g}$?', 'إذا كان $f\\to-\\infty$ و$g\\to 2$، فما نهاية $\\frac{f}{g}$؟', 'If $f\\to-\\infty$ and $g\\to 2$, what is the limit of $\\frac{f}{g}$?'),
            options: [same('$0$'), same('$+\\infty$'), same('$-\\infty$')],
            correctIndex: 2,
            explanation: say('Infinitu negatiboa zati zenbaki positibo bat: $\\frac{-\\infty}{2}=-\\infty$.', 'Infinito negativo entre un número positivo: $\\frac{-\\infty}{2}=-\\infty$.', 'لانهاية سالبة على عدد موجب: $\\frac{-\\infty}{2}=-\\infty$.', 'Negative infinity over a positive number: $\\frac{-\\infty}{2}=-\\infty$.')
        }
    },
    indeterminate: {
        mistake: {
            wrong: same('$1^{\\infty}=1$'),
            right: say('$1^{\\infty}$ indeterminazioa da: $\\left(1+\\frac{1}{x}\\right)^{x}$ adierazpena $e$ baliora doa, ez 1 baliora.', '$1^{\\infty}$ es una indeterminación: $\\left(1+\\frac{1}{x}\\right)^{x}$ tiende a $e$, no a 1.', '$1^{\\infty}$ حالة عدم تعيين: $\\left(1+\\frac{1}{x}\\right)^{x}$ تؤول إلى $e$ لا إلى 1.', '$1^{\\infty}$ is indeterminate: $\\left(1+\\frac{1}{x}\\right)^{x}$ tends to $e$, not to 1.')
        },
        check: {
            prompt: say('Hauetako zein ez da indeterminazioa?', '¿Cuál de estas no es una indeterminación?', 'أي هذه ليست حالة عدم تعيين؟', 'Which of these is not indeterminate?'),
            options: [same('$\\frac{0}{0}$'), same('$\\frac{5}{0}$'), same('$0\\cdot\\infty$')],
            correctIndex: 1,
            explanation: say('$\\frac{5}{0}$ infinitua da (zeinua alde bakoitzean); beste biak indeterminazioak dira.', '$\\frac{5}{0}$ es infinito (con el signo de cada lado); las otras dos son indeterminaciones.', '$\\frac{5}{0}$ لانهاية (بإشارة كل جانب)؛ والأخريان حالتا عدم تعيين.', '$\\frac{5}{0}$ is infinite (with each side\'s sign); the other two are indeterminate.')
        }
    },

    /* ---------- 2. Limits at infinity ---------- */
    degrees: {
        mistake: {
            wrong: same('$\\lim_{x\\to-\\infty}(2x^3+x^2)=+\\infty$'),
            right: say('$x\\to-\\infty$ denean, $2x^3$ negatiboa da eta hark agintzen du: limitea $-\\infty$ da.', 'Si $x\\to-\\infty$, $2x^3$ es negativo y es el que manda: el límite es $-\\infty$.', 'إذا كان $x\\to-\\infty$ فإن $2x^3$ سالب وهو المتحكم: النهاية $-\\infty$.', 'If $x\\to-\\infty$, $2x^3$ is negative and it rules: the limit is $-\\infty$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to+\\infty}\\frac{9x+2}{3x^2-1}$?', '¿Cuánto vale $\\lim_{x\\to+\\infty}\\frac{9x+2}{3x^2-1}$?', 'كم تساوي $\\lim_{x\\to+\\infty}\\frac{9x+2}{3x^2-1}$؟', 'What is $\\lim_{x\\to+\\infty}\\frac{9x+2}{3x^2-1}$?'),
            options: [same('$0$'), same('$3$'), same('$+\\infty$')],
            correctIndex: 0,
            explanation: say('Behean maila handiagoa: limitea 0 da.', 'Más grado abajo: el límite es 0.', 'درجة أكبر في المقام: النهاية 0.', 'Higher degree below: the limit is 0.')
        }
    },
    conjugate: {
        mistake: {
            wrong: same('$\\infty-\\infty=0$'),
            right: say('Indeterminazio bat da: konjokatuaz, $\\sqrt{x^2+6x}-x\\to 3$, ez 0.', 'Es una indeterminación: con el conjugado, $\\sqrt{x^2+6x}-x\\to 3$, no 0.', 'إنها حالة عدم تعيين: بالمرافق $\\sqrt{x^2+6x}-x\\to 3$ لا 0.', 'It is indeterminate: with the conjugate, $\\sqrt{x^2+6x}-x\\to 3$, not 0.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+8x}-x\\right)$?', '¿Cuánto vale $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+8x}-x\\right)$?', 'كم تساوي $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+8x}-x\\right)$؟', 'What is $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+8x}-x\\right)$?'),
            options: [same('$0$'), same('$8$'), same('$4$')],
            correctIndex: 2,
            explanation: same('$\\frac{8x}{\\sqrt{x^2+8x}+x}\\ \\to\\ \\frac{8}{2}=4$')
        }
    },
    'number-e': {
        mistake: {
            wrong: same('$\\lim_{x\\to+\\infty}\\left(1+\\frac{3}{x}\\right)^{x}=1$'),
            right: say('Oinarria 1 baliora doa, baina berretzailea infinitura: $1^{\\infty}$. Formularekin, $e^{3}$.', 'La base tiende a 1, pero el exponente a infinito: $1^{\\infty}$. Con la fórmula, $e^{3}$.', 'الأساس يؤول إلى 1 لكن الأس إلى اللانهاية: $1^{\\infty}$. وبالصيغة $e^{3}$.', 'The base tends to 1, but the exponent to infinity: $1^{\\infty}$. With the formula, $e^{3}$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to+\\infty}\\left(1+\\frac{1}{4x}\\right)^{8x}$?', '¿Cuánto vale $\\lim_{x\\to+\\infty}\\left(1+\\frac{1}{4x}\\right)^{8x}$?', 'كم تساوي $\\lim_{x\\to+\\infty}\\left(1+\\frac{1}{4x}\\right)^{8x}$؟', 'What is $\\lim_{x\\to+\\infty}\\left(1+\\frac{1}{4x}\\right)^{8x}$?'),
            options: [same('$1$'), same('$e^{2}$'), same('$e^{32}$')],
            correctIndex: 1,
            explanation: same('$8x\\cdot\\frac{1}{4x}=2\\ \\to\\ e^{2}$')
        }
    },

    /* ---------- 3. Limits at a point ---------- */
    'one-sided': {
        mistake: {
            wrong: say('Funtzio zatikatu batean, limitea $f(a)$ da.', 'En una función a trozos, el límite es $f(a)$.', 'في الدالة متعددة الأجزاء، النهاية هي $f(a)$.', 'In a piecewise function, the limit is $f(a)$.'),
            right: say('$f(a)$ zati batetik bakarrik dator; alboko bi limiteak kalkulatu behar dira, bakoitza bere zatiarekin.', '$f(a)$ sale de un solo trozo; hay que calcular los dos laterales, cada uno con su trozo.', '$f(a)$ تأتي من جزء واحد فقط؛ يجب حساب النهايتين الجانبيتين، كل واحدة بجزئها.', '$f(a)$ comes from one piece only; you must work out both one-sided limits, each with its own piece.')
        },
        check: {
            prompt: say('$f(x)=\\begin{cases}5x & x<1\\\\ x+4 & x\\ge 1\\end{cases}$. Zenbat da $\\lim_{x\\to 1}f(x)$?', '$f(x)=\\begin{cases}5x & x<1\\\\ x+4 & x\\ge 1\\end{cases}$. ¿Cuánto vale $\\lim_{x\\to 1}f(x)$?', '$f(x)=\\begin{cases}5x & x<1\\\\ x+4 & x\\ge 1\\end{cases}$. كم تساوي $\\lim_{x\\to 1}f(x)$؟', '$f(x)=\\begin{cases}5x & x<1\\\\ x+4 & x\\ge 1\\end{cases}$. What is $\\lim_{x\\to 1}f(x)$?'),
            options: [same('$5$'), say('Ez dago', 'No existe', 'غير موجودة', 'It does not exist'), same('$4$')],
            correctIndex: 0,
            explanation: same('$\\lim_{x\\to 1^-}5x=5\\qquad\\lim_{x\\to 1^+}(x+4)=5$')
        }
    },
    'k-zero': {
        mistake: {
            wrong: same('$\\frac{6}{0}=0$'),
            right: say('Zenbaki bat oso zenbaki txiki batez zatituz, emaitza oso handia da: $\\frac{6}{0}$ infinitua da, zeinua alde bakoitzean.', 'Un número entre otro muy pequeño da algo enorme: $\\frac{6}{0}$ es infinito, con el signo de cada lado.', 'عدد على عدد صغير جدًا يعطي شيئًا ضخمًا: $\\frac{6}{0}$ لانهاية بإشارة كل جانب.', 'A number over a very small one gives something huge: $\\frac{6}{0}$ is infinite, with each side\'s sign.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to 2^-}\\frac{3}{x-2}$?', '¿Cuánto vale $\\lim_{x\\to 2^-}\\frac{3}{x-2}$?', 'كم تساوي $\\lim_{x\\to 2^-}\\frac{3}{x-2}$؟', 'What is $\\lim_{x\\to 2^-}\\frac{3}{x-2}$?'),
            options: [same('$+\\infty$'), same('$0$'), same('$-\\infty$')],
            correctIndex: 2,
            explanation: say('2 baino apur bat gutxiagorekin, $x-2$ negatiboa da: $\\frac{3}{0^-}=-\\infty$.', 'Con un poco menos de 2, $x-2$ es negativo: $\\frac{3}{0^-}=-\\infty$.', 'بقيمة أقل قليلًا من 2 يكون $x-2$ سالبًا: $\\frac{3}{0^-}=-\\infty$.', 'With a little less than 2, $x-2$ is negative: $\\frac{3}{0^-}=-\\infty$.')
        }
    },
    'zero-zero': {
        mistake: {
            wrong: say('$\\frac{0}{0}$ ateratzen bada, ez dago limiterik.', 'Si sale $\\frac{0}{0}$, no existe el límite.', 'إذا ظهرت $\\frac{0}{0}$ فلا توجد نهاية.', 'If you get $\\frac{0}{0}$, the limit does not exist.'),
            right: say('$\\frac{0}{0}$ indeterminazioa da: faktorizatuz, $\\frac{x^2-16}{x-4}=x+4$ eta limitea 8 da 4 puntuan.', '$\\frac{0}{0}$ es una indeterminación: al factorizar, $\\frac{x^2-16}{x-4}=x+4$ y el límite en 4 es 8.', '$\\frac{0}{0}$ حالة عدم تعيين: بالتحليل $\\frac{x^2-16}{x-4}=x+4$ والنهاية عند 4 تساوي 8.', '$\\frac{0}{0}$ is indeterminate: factorising, $\\frac{x^2-16}{x-4}=x+4$ and the limit at 4 is 8.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to 3}\\frac{x^2-3x}{x-3}$?', '¿Cuánto vale $\\lim_{x\\to 3}\\frac{x^2-3x}{x-3}$?', 'كم تساوي $\\lim_{x\\to 3}\\frac{x^2-3x}{x-3}$؟', 'What is $\\lim_{x\\to 3}\\frac{x^2-3x}{x-3}$?'),
            options: [say('Ez dago', 'No existe', 'غير موجودة', 'It does not exist'), same('$3$'), same('$0$')],
            correctIndex: 1,
            explanation: same('$\\frac{x(x-3)}{x-3}=x\\ \\to\\ 3$')
        }
    },

    /* ---------- 4. Continuity ---------- */
    continuous: {
        mistake: {
            wrong: say('$f(a)$ badago, $f$ jarraitua da $a$ puntuan.', 'Si existe $f(a)$, $f$ es continua en $a$.', 'إذا وُجدت $f(a)$ فإن $f$ متصلة عند $a$.', 'If $f(a)$ exists, $f$ is continuous at $a$.'),
            right: say('Hiru baldintzak behar dira: $f(a)$, limitea, eta biak berdinak. Funtzio zatikatu batek $f(a)$ izan dezake eta hala ere jauzi egin.', 'Hacen falta las tres condiciones: $f(a)$, el límite, y que coincidan. Una función a trozos puede tener $f(a)$ y aun así saltar.', 'يلزم الشروط الثلاثة: $f(a)$ والنهاية وتساويهما. قد تكون للدالة متعددة الأجزاء قيمة $f(a)$ ومع ذلك تقفز.', 'All three conditions are needed: $f(a)$, the limit, and that they agree. A piecewise function can have $f(a)$ and still jump.')
        },
        check: {
            prompt: say('$f(x)=\\begin{cases}x+2 & x<4\\\\ 10-x & x\\ge 4\\end{cases}$. Jarraitua al da $x=4$ puntuan?', '$f(x)=\\begin{cases}x+2 & x<4\\\\ 10-x & x\\ge 4\\end{cases}$. ¿Es continua en $x=4$?', '$f(x)=\\begin{cases}x+2 & x<4\\\\ 10-x & x\\ge 4\\end{cases}$. هل هي متصلة عند $x=4$؟', '$f(x)=\\begin{cases}x+2 & x<4\\\\ 10-x & x\\ge 4\\end{cases}$. Is it continuous at $x=4$?'),
            options: [say('Ez: alboko limiteak desberdinak dira', 'No: los laterales son distintos', 'لا: النهايتان الجانبيتان مختلفتان', 'No: the one-sided limits differ'), say('Bai, $f(4)$ badagoelako', 'Sí, porque existe $f(4)$', 'نعم، لأن $f(4)$ موجودة', 'Yes, because $f(4)$ exists'), say('Bai: biak 6 baliora doaz', 'Sí: los dos tienden a 6', 'نعم: كلاهما يؤول إلى 6', 'Yes: both tend to 6')],
            correctIndex: 2,
            explanation: same('$\\lim_{x\\to 4^-}(x+2)=6\\qquad f(4)=10-4=6$')
        }
    },
    discontinuities: {
        mistake: {
            wrong: say('$\\frac{x^2-1}{x-1}$ funtzioak jauzi infinitua du $x=1$ puntuan, izendatzailea 0 delako.', '$\\frac{x^2-1}{x-1}$ tiene un salto infinito en $x=1$ porque el denominador se anula.', 'للدالة $\\frac{x^2-1}{x-1}$ قفزة لانهائية عند $x=1$ لأن المقام ينعدم.', '$\\frac{x^2-1}{x-1}$ has an infinite jump at $x=1$ because the denominator is 0.'),
            right: say('Goian ere 0 da: $\\frac{0}{0}$. Sinplifikatuz $x+1\\to 2$: etenune saihesgarria da, ez jauzia.', 'Arriba también sale 0: $\\frac{0}{0}$. Al simplificar, $x+1\\to 2$: es evitable, no un salto.', 'البسط أيضًا 0: $\\frac{0}{0}$. بالاختصار $x+1\\to 2$: انقطاع قابل للإزالة لا قفزة.', 'The top is 0 too: $\\frac{0}{0}$. Cancelling, $x+1\\to 2$: it is removable, not a jump.')
        },
        check: {
            prompt: say('$\\lim_{x\\to 3^-}f(x)=1$ eta $\\lim_{x\\to 3^+}f(x)=7$. Zer etenune mota du $f$ funtzioak $x=3$ puntuan?', '$\\lim_{x\\to 3^-}f(x)=1$ y $\\lim_{x\\to 3^+}f(x)=7$. ¿Qué discontinuidad tiene $f$ en $x=3$?', '$\\lim_{x\\to 3^-}f(x)=1$ و$\\lim_{x\\to 3^+}f(x)=7$. ما نوع انقطاع $f$ عند $x=3$؟', '$\\lim_{x\\to 3^-}f(x)=1$ and $\\lim_{x\\to 3^+}f(x)=7$. What discontinuity does $f$ have at $x=3$?'),
            options: [say('Saihesgarria', 'Evitable', 'قابل للإزالة', 'Removable'), say('Jauzi finitua', 'Salto finito', 'قفزة منتهية', 'Finite jump'), say('Jauzi infinitua', 'Salto infinito', 'قفزة لانهائية', 'Infinite jump')],
            correctIndex: 1,
            explanation: say('Bi zenbaki desberdin: 6 unitateko jauzi finitua.', 'Dos números distintos: un salto finito de 6 unidades.', 'عددان مختلفان: قفزة منتهية مقدارها 6.', 'Two different numbers: a finite jump of 6 units.')
        }
    },
    parameter: {
        mistake: {
            wrong: say('$x=2$ lotunean, ezkerreko zatia bakarrik ordezkatzen da eta 0 berdintzen da.', 'En la unión de $x=2$, se sustituye solo el trozo de la izquierda y se iguala a 0.', 'عند نقطة الالتقاء $x=2$ نعوّض الجزء الأيسر فقط ونساويه بـ 0.', 'At the joint $x=2$, only the left piece is substituted and set equal to 0.'),
            right: say('Ezkerreko limitea eskuinekoarekin berdintzen da: alde bakoitza bere zatiarekin.', 'Se iguala el límite por la izquierda con el de la derecha: cada lado con su trozo.', 'نساوي النهاية اليسرى باليمنى: كل جانب بجزئه.', 'The left-hand limit is set equal to the right-hand one: each side with its own piece.')
        },
        check: {
            prompt: say('$f(x)=\\begin{cases}kx & x<3\\\\ x+9 & x\\ge 3\\end{cases}$ jarraitua da. Zenbat da $k$?', '$f(x)=\\begin{cases}kx & x<3\\\\ x+9 & x\\ge 3\\end{cases}$ es continua. ¿Cuánto vale $k$?', '$f(x)=\\begin{cases}kx & x<3\\\\ x+9 & x\\ge 3\\end{cases}$ متصلة. كم تساوي $k$؟', '$f(x)=\\begin{cases}kx & x<3\\\\ x+9 & x\\ge 3\\end{cases}$ is continuous. What is $k$?'),
            options: [same('$3$'), same('$4$'), same('$12$')],
            correctIndex: 1,
            explanation: same('$3k=3+9=12\\ \\to\\ k=4$')
        }
    },

    /* ---------- 5. In economy and society ---------- */
    'long-run': {
        mistake: {
            wrong: say('$P(t)=\\frac{40t}{t+5}$ biztanleria mugarik gabe hazten da, $t$ hazten delako.', 'La población $P(t)=\\frac{40t}{t+5}$ crece sin límite porque $t$ crece.', 'السكان $P(t)=\\frac{40t}{t+5}$ يكبرون بلا حد لأن $t$ يكبر.', 'The population $P(t)=\\frac{40t}{t+5}$ grows without limit because $t$ grows.'),
            right: say('Maila bera goian eta behean: $P\\to 40$. Hazten da, baina 40 inguruan egonkortzen da.', 'Mismo grado arriba y abajo: $P\\to 40$. Crece, pero se estabiliza cerca de 40.', 'الدرجة نفسها في البسط والمقام: $P\\to 40$. يكبر لكنه يستقر قرب 40.', 'Same degree on top and below: $P\\to 40$. It grows, but levels off near 40.')
        },
        check: {
            prompt: say('Produktu baten salmentak $V(t)=\\frac{60}{t+3}$ dira (milaka), $t$ hilabetetan. Zer gertatzen da epe luzera?', 'Las ventas de un producto son $V(t)=\\frac{60}{t+3}$ (miles), con $t$ en meses. ¿Qué pasa a largo plazo?', 'مبيعات منتج هي $V(t)=\\frac{60}{t+3}$ (بالآلاف)، حيث $t$ بالأشهر. ماذا يحدث على المدى الطويل؟', 'The sales of a product are $V(t)=\\frac{60}{t+3}$ (thousands), with $t$ in months. What happens in the long run?'),
            options: [say('20 milara egonkortzen dira', 'Se estabilizan en 20 mil', 'تستقر عند 20 ألفًا', 'They level off at 20 thousand'), say('Mugarik gabe hazten dira', 'Crecen sin límite', 'تكبر بلا حد', 'They grow without limit'), say('0 baliora doaz: produktua itzaltzen doa', 'Tienden a 0: el producto se va apagando', 'تؤول إلى 0: ينطفئ المنتج تدريجيًا', 'They tend to 0: the product dies away')],
            correctIndex: 2,
            explanation: say('Behean maila handiagoa: $\\frac{60}{t+3}\\to 0$.', 'Más grado abajo: $\\frac{60}{t+3}\\to 0$.', 'درجة أكبر في المقام: $\\frac{60}{t+3}\\to 0$.', 'Higher degree below: $\\frac{60}{t+3}\\to 0$.')
        }
    },
    brackets: {
        mistake: {
            wrong: say('Tarifak jauzi egiten badu, jauzia bigarren tarteko unitateko prezioa da.', 'Si la tarifa salta, el salto es el precio por unidad del segundo tramo.', 'إذا قفزت التعريفة فالقفزة هي سعر الوحدة في الشريحة الثانية.', 'If the tariff jumps, the jump is the price per unit of the second bracket.'),
            right: say('Jauzia alboko limiteen kenketa da: tarte-aldaketan ordaintzen den gehigarria.', 'El salto es la diferencia de los laterales: lo que se paga de más en el cambio de tramo.', 'القفزة هي فرق النهايتين الجانبيتين: ما يُدفع زيادةً عند تغيّر الشريحة.', 'The jump is the difference of the one-sided limits: the extra paid at the change of bracket.')
        },
        check: {
            prompt: say('$f(x)=\\begin{cases}4x & 0\\le x\\le 5\\\\ 3x+9 & x>5\\end{cases}$ euro. Zenbatekoa da jauzia $x=5$ puntuan?', '$f(x)=\\begin{cases}4x & 0\\le x\\le 5\\\\ 3x+9 & x>5\\end{cases}$ euros. ¿De cuánto es el salto en $x=5$?', '$f(x)=\\begin{cases}4x & 0\\le x\\le 5\\\\ 3x+9 & x>5\\end{cases}$ يورو. كم مقدار القفزة عند $x=5$؟', '$f(x)=\\begin{cases}4x & 0\\le x\\le 5\\\\ 3x+9 & x>5\\end{cases}$ euros. How big is the jump at $x=5$?'),
            options: [say('3 euro', '3 €', '3 €', '€3'), say('4 euro', '4 €', '4 €', '€4'), say('Ez dago jauzirik', 'No hay salto', 'لا توجد قفزة', 'There is no jump')],
            correctIndex: 1,
            explanation: same('$f(5)=20\\qquad\\lim_{x\\to 5^+}(3x+9)=24\\qquad 24-20=4$')
        }
    },
    'fair-tariff': {
        mistake: {
            wrong: say('Jauzirik ez egoteko, bi tarteek unitateko prezio bera izan behar dute.', 'Para que no haya salto, los dos tramos deben tener el mismo precio por unidad.', 'كي لا توجد قفزة يجب أن يكون للشريحتين سعر الوحدة نفسه.', 'For there to be no jump, both brackets must have the same price per unit.'),
            right: say('Prezioak desberdinak izan daitezke: nahikoa da aldaketa-puntuan biek kopuru bera ematea. Kuota finkoak doitzen du.', 'Los precios pueden ser distintos: basta con que en el punto de cambio los dos den la misma cantidad. La cuota fija lo ajusta.', 'يمكن أن يختلف السعران: يكفي أن تعطي الشريحتان المبلغ نفسه عند نقطة التغيّر. والحصة الثابتة تضبط ذلك.', 'The prices can differ: it is enough that at the point of change both give the same amount. The fixed charge adjusts it.')
        },
        check: {
            prompt: say('$f(x)=\\begin{cases}3x & 0\\le x\\le 20\\\\ 2x+c & x>20\\end{cases}$ jarraitua izateko, zenbat da $c$?', 'Para que $f(x)=\\begin{cases}3x & 0\\le x\\le 20\\\\ 2x+c & x>20\\end{cases}$ sea continua, ¿cuánto vale $c$?', 'كي تكون $f(x)=\\begin{cases}3x & 0\\le x\\le 20\\\\ 2x+c & x>20\\end{cases}$ متصلة، كم تساوي $c$؟', 'For $f(x)=\\begin{cases}3x & 0\\le x\\le 20\\\\ 2x+c & x>20\\end{cases}$ to be continuous, what is $c$?'),
            options: [same('$20$'), same('$0$'), same('$60$')],
            correctIndex: 0,
            explanation: same('$3\\cdot 20=2\\cdot 20+c\\ \\to\\ c=20$')
        }
    }
}

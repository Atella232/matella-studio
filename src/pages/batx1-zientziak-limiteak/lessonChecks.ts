import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 1 · Zientziak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no JSX)
   so the tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical mistake:
   the limit taken as f(a), 0/0 read as «no limit», ∞/∞ = 1, ∞ − ∞ = 0,
   1^∞ = 1, a curve that «never» cuts its asymptote, Bolzano without
   continuity.
   ========================================================================== */

export type BachLimitsTopicId =
    | 'idea' | 'one-sided' | 'infinite'
    | 'substitute' | 'zero-zero' | 'roots'
    | 'degrees' | 'infinity-minus' | 'e-limits'
    | 'vertical-horizontal' | 'oblique' | 'branches'
    | 'continuous' | 'discontinuities' | 'bolzano'

export const bachLimitsLessonChecks: Record<BachLimitsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. The limit at a point ---------- */
    idea: {
        mistake: {
            wrong: same('$\\lim_{x\\to a}f(x)=f(a)$'),
            right: say('Limiteak $a$ puntuaren ondoan begiratzen du, ez $a$ puntuan: egon daiteke $f(a)$ ez badago edo beste balio bat badu.', 'El límite mira cerca de $a$, no en $a$: puede existir aunque $f(a)$ no exista o valga otra cosa.', 'تنظر النهاية قرب $a$ لا عند $a$: قد توجد حتى لو لم توجد $f(a)$ أو كانت لها قيمة أخرى.', 'The limit looks near $a$, not at $a$: it can exist even if $f(a)$ does not exist or has another value.')
        },
        check: {
            prompt: say('$f(x)=2x$ da $x\\neq 3$ denean, eta $f(3)=1$. Zenbat da $\\lim_{x\\to 3}f(x)$?', 'Si $f(x)=2x$ para $x\\neq 3$ y $f(3)=1$, ¿cuánto vale $\\lim_{x\\to 3}f(x)$?', 'إذا كانت $f(x)=2x$ عندما $x\\neq 3$ و$f(3)=1$، فكم تساوي $\\lim_{x\\to 3}f(x)$؟', 'If $f(x)=2x$ for $x\\neq 3$ and $f(3)=1$, what is $\\lim_{x\\to 3}f(x)$?'),
            options: [same('$6$'), same('$1$'), say('Ez dago', 'No existe', 'غير موجودة', 'It does not exist')],
            correctIndex: 0,
            explanation: say('3 zenbakitik hurbil $f(x)=2x$ da, eta 6 baliora hurbiltzen da; $f(3)=1$ izateak ez du ezer aldatzen.', 'Cerca de 3, $f(x)=2x$, que se acerca a 6; que $f(3)=1$ no cambia nada.', 'قرب 3 تكون $f(x)=2x$ وتقترب من 6؛ وكون $f(3)=1$ لا يغيّر شيئًا.', 'Near 3, $f(x)=2x$, which approaches 6; $f(3)=1$ changes nothing.')
        }
    },
    'one-sided': {
        mistake: {
            wrong: say('Limitea $\\ge$ daraman zatiaren balioa da.', 'El límite es el valor del trozo que lleva $\\ge$.', 'النهاية هي قيمة الجزء الذي فيه $\\ge$.', 'The limit is the value of the piece with $\\ge$.'),
            right: say('Bi aldeak begiratu behar dira: alboko limiteak berdinak badira bakarrik dago limitea.', 'Hay que mirar los dos lados: el límite existe solo si los límites laterales coinciden.', 'يجب النظر إلى الجانبين: لا توجد النهاية إلا إذا تساوت النهايتان الجانبيتان.', 'You have to look at both sides: the limit exists only if the one-sided limits are equal.')
        },
        check: {
            prompt: say('Badago $\\lim_{x\\to 0}\\frac{|x|}{x}$?', '¿Existe $\\lim_{x\\to 0}\\frac{|x|}{x}$?', 'هل توجد $\\lim_{x\\to 0}\\frac{|x|}{x}$؟', 'Does $\\lim_{x\\to 0}\\frac{|x|}{x}$ exist?'),
            options: [say('Bai, 0 da', 'Sí, vale 0', 'نعم، تساوي 0', 'Yes, it is 0'), say('Bai, 1 da', 'Sí, vale 1', 'نعم، تساوي 1', 'Yes, it is 1'), say('Ez: alboko limiteak $-1$ eta 1 dira', 'No: los laterales son $-1$ y 1', 'لا: النهايتان الجانبيتان $-1$ و1', 'No: the one-sided limits are $-1$ and 1')],
            correctIndex: 2,
            explanation: say('Ezkerrean $\\frac{|x|}{x}=-1$ da, eta eskuinean 1: ez datoz bat.', 'A la izquierda $\\frac{|x|}{x}=-1$, y a la derecha vale 1: no coinciden.', 'إلى اليسار $\\frac{|x|}{x}=-1$ وإلى اليمين 1: لا تتساويان.', 'To the left $\\frac{|x|}{x}=-1$, and to the right it is 1: they do not match.')
        }
    },
    infinite: {
        mistake: {
            wrong: same('$\\frac{5}{0}=0$'),
            right: say('0 zenbakira hurbiltzen den batez zatituta, emaitza mugarik gabe hazten da: $\\pm\\infty$, alde bakoitzeko zeinuaren arabera.', 'Al dividir entre algo que se acerca a 0, el resultado crece sin límite: $\\pm\\infty$, según el signo de cada lado.', 'عند القسمة على شيء يقترب من 0 يكبر الناتج بلا حد: $\\pm\\infty$ حسب إشارة كل جانب.', 'Dividing by something that approaches 0 makes the result grow without bound: $\\pm\\infty$, depending on the sign on each side.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to 4^-}\\frac{1}{x-4}$?', '¿Cuánto vale $\\lim_{x\\to 4^-}\\frac{1}{x-4}$?', 'كم تساوي $\\lim_{x\\to 4^-}\\frac{1}{x-4}$؟', 'What is $\\lim_{x\\to 4^-}\\frac{1}{x-4}$?'),
            options: [same('$+\\infty$'), same('$-\\infty$'), same('$0$')],
            correctIndex: 1,
            explanation: say('$x<4$ denean, $x-4$ negatiboa eta oso txikia da: $\\frac{1}{x-4}\\to-\\infty$.', 'Si $x<4$, $x-4$ es negativo y muy pequeño: $\\frac{1}{x-4}\\to-\\infty$.', 'إذا كان $x<4$ فإن $x-4$ سالب وصغير جدًّا: $\\frac{1}{x-4}\\to-\\infty$.', 'If $x<4$, $x-4$ is negative and very small: $\\frac{1}{x-4}\\to-\\infty$.')
        }
    },

    /* ---------- 2. Working out limits at a point ---------- */
    substitute: {
        mistake: {
            wrong: same('$\\infty-\\infty=0$'),
            right: say('Indeterminazio bat da: edozer eman dezake. Aldiz, $\\infty+\\infty=\\infty$ eta $\\frac{k}{\\infty}=0$.', 'Es una indeterminación: puede dar cualquier cosa. En cambio, $\\infty+\\infty=\\infty$ y $\\frac{k}{\\infty}=0$.', 'إنها حالة عدم تعيين: قد تعطي أي شيء. أما $\\infty+\\infty=\\infty$ و$\\frac{k}{\\infty}=0$ فمعلومتان.', 'It is an indeterminate form: it can give anything. On the other hand, $\\infty+\\infty=\\infty$ and $\\frac{k}{\\infty}=0$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to 2}\\sqrt{x^2+5}$?', '¿Cuánto vale $\\lim_{x\\to 2}\\sqrt{x^2+5}$?', 'كم تساوي $\\lim_{x\\to 2}\\sqrt{x^2+5}$؟', 'What is $\\lim_{x\\to 2}\\sqrt{x^2+5}$?'),
            options: [same('$9$'), same('$3$'), same('$\\sqrt{5}$')],
            correctIndex: 1,
            explanation: say('Jarraitua da 2 puntuan: ordezkatu besterik ez, $\\sqrt{4+5}=3$.', 'Es continua en 2: basta con sustituir, $\\sqrt{4+5}=3$.', 'هي متصلة عند 2: يكفي التعويض، $\\sqrt{4+5}=3$.', 'It is continuous at 2: just substitute, $\\sqrt{4+5}=3$.')
        }
    },
    'zero-zero': {
        mistake: {
            wrong: say('$\\frac{0}{0}$: limitea ez dago.', '$\\frac{0}{0}$: el límite no existe.', '$\\frac{0}{0}$: النهاية غير موجودة.', '$\\frac{0}{0}$: the limit does not exist.'),
            right: say('$\\frac{0}{0}$ indeterminazio bat da: faktorizatu, sinplifikatu $(x-a)$ faktore komuna eta ordezkatu berriro.', '$\\frac{0}{0}$ es una indeterminación: factoriza, simplifica el factor común $(x-a)$ y vuelve a sustituir.', '$\\frac{0}{0}$ حالة عدم تعيين: حلّل واختصر العامل المشترك $(x-a)$ ثم عوّض من جديد.', '$\\frac{0}{0}$ is an indeterminate form: factorise, cancel the common factor $(x-a)$ and substitute again.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to 1}\\frac{x^2-1}{x-1}$?', '¿Cuánto vale $\\lim_{x\\to 1}\\frac{x^2-1}{x-1}$?', 'كم تساوي $\\lim_{x\\to 1}\\frac{x^2-1}{x-1}$؟', 'What is $\\lim_{x\\to 1}\\frac{x^2-1}{x-1}$?'),
            options: [same('$0$'), say('Ez dago', 'No existe', 'غير موجودة', 'It does not exist'), same('$2$')],
            correctIndex: 2,
            explanation: same('$\\frac{(x-1)(x+1)}{x-1}=x+1\\ \\to\\ 2$')
        }
    },
    roots: {
        mistake: {
            wrong: same('$(\\sqrt{x}-2)(\\sqrt{x}+2)=x+4$'),
            right: say('Batura bider kendura: $(\\sqrt{x}-2)(\\sqrt{x}+2)=x-4$. Horregatik desagertzen da erroa.', 'Suma por diferencia: $(\\sqrt{x}-2)(\\sqrt{x}+2)=x-4$. Por eso desaparece la raíz.', 'مجموع في فرق: $(\\sqrt{x}-2)(\\sqrt{x}+2)=x-4$. لذلك يختفي الجذر.', 'Sum times difference: $(\\sqrt{x}-2)(\\sqrt{x}+2)=x-4$. That is why the root disappears.')
        },
        check: {
            prompt: say('Zerekin biderkatzen da $\\lim_{x\\to 1}\\frac{\\sqrt{x+3}-2}{x-1}$ kalkulatzeko?', '¿Por qué se multiplica para calcular $\\lim_{x\\to 1}\\frac{\\sqrt{x+3}-2}{x-1}$?', 'في أي شيء نضرب لحساب $\\lim_{x\\to 1}\\frac{\\sqrt{x+3}-2}{x-1}$؟', 'What do you multiply by to work out $\\lim_{x\\to 1}\\frac{\\sqrt{x+3}-2}{x-1}$?'),
            options: [same('$\\sqrt{x+3}+2$'), same('$\\sqrt{x+3}-2$'), same('$x-1$')],
            correctIndex: 0,
            explanation: say('Konjokatuaz: goian $(x+3)-4=x-1$ geratzen da, eta $x-1$ sinplifikatzen da.', 'Por el conjugado: arriba queda $(x+3)-4=x-1$, y $x-1$ se simplifica.', 'في المرافق: يبقى في البسط $(x+3)-4=x-1$ ويُختصر $x-1$.', 'By the conjugate: on top you get $(x+3)-4=x-1$, and $x-1$ cancels.')
        }
    },

    /* ---------- 3. Limits at infinity ---------- */
    degrees: {
        mistake: {
            wrong: same('$\\frac{\\infty}{\\infty}=1$'),
            right: say('Mailen araberakoa da: $\\frac{x^2}{x}\\to\\infty$ eta $\\frac{x}{x^2}\\to 0$.', 'Depende de los grados: $\\frac{x^2}{x}\\to\\infty$ y $\\frac{x}{x^2}\\to 0$.', 'يتوقف على الدرجات: $\\frac{x^2}{x}\\to\\infty$ و$\\frac{x}{x^2}\\to 0$.', 'It depends on the degrees: $\\frac{x^2}{x}\\to\\infty$ and $\\frac{x}{x^2}\\to 0$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to+\\infty}\\frac{5x+2}{x^2+1}$?', '¿Cuánto vale $\\lim_{x\\to+\\infty}\\frac{5x+2}{x^2+1}$?', 'كم تساوي $\\lim_{x\\to+\\infty}\\frac{5x+2}{x^2+1}$؟', 'What is $\\lim_{x\\to+\\infty}\\frac{5x+2}{x^2+1}$?'),
            options: [same('$5$'), same('$0$'), same('$+\\infty$')],
            correctIndex: 1,
            explanation: say('Behekoaren maila handiagoa da: $\\frac{5x}{x^2}=\\frac{5}{x}\\to 0$.', 'El de abajo tiene mayor grado: $\\frac{5x}{x^2}=\\frac{5}{x}\\to 0$.', 'درجة المقام أكبر: $\\frac{5x}{x^2}=\\frac{5}{x}\\to 0$.', 'The bottom has the higher degree: $\\frac{5x}{x^2}=\\frac{5}{x}\\to 0$.')
        }
    },
    'infinity-minus': {
        mistake: {
            wrong: same('$\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+2x}-x\\right)=0$'),
            right: say('$\\infty-\\infty$ ez da 0: biderkatu konjokatuaz, eta $\\frac{2x}{\\sqrt{x^2+2x}+x}\\to 1$ ateratzen da.', '$\\infty-\\infty$ no es 0: multiplica por el conjugado y sale $\\frac{2x}{\\sqrt{x^2+2x}+x}\\to 1$.', '$\\infty-\\infty$ ليست 0: اضرب في المرافق فتحصل على $\\frac{2x}{\\sqrt{x^2+2x}+x}\\to 1$.', '$\\infty-\\infty$ is not 0: multiply by the conjugate and you get $\\frac{2x}{\\sqrt{x^2+2x}+x}\\to 1$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+4x}-x\\right)$?', '¿Cuánto vale $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+4x}-x\\right)$?', 'كم تساوي $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+4x}-x\\right)$؟', 'What is $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+4x}-x\\right)$?'),
            options: [same('$0$'), same('$4$'), same('$2$')],
            correctIndex: 2,
            explanation: same('$\\frac{4x}{\\sqrt{x^2+4x}+x}\\ \\to\\ \\frac{4}{2}=2$')
        }
    },
    'e-limits': {
        mistake: {
            wrong: same('$1^{\\infty}=1$'),
            right: say('Indeterminazio bat da: oinarria 1 baliora hurbiltzen da, baina ez da 1. $e^{\\lim g(x)\\,(f(x)-1)}$ erabiltzen da.', 'Es una indeterminación: la base se acerca a 1, pero no es 1. Se usa $e^{\\lim g(x)\\,(f(x)-1)}$.', 'إنها حالة عدم تعيين: الأساس يقترب من 1 لكنه ليس 1. نستعمل $e^{\\lim g(x)\\,(f(x)-1)}$.', 'It is an indeterminate form: the base approaches 1 but is not 1. Use $e^{\\lim g(x)\\,(f(x)-1)}$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim_{x\\to+\\infty}\\left(1+\\frac{1}{x}\\right)^{2x}$?', '¿Cuánto vale $\\lim_{x\\to+\\infty}\\left(1+\\frac{1}{x}\\right)^{2x}$?', 'كم تساوي $\\lim_{x\\to+\\infty}\\left(1+\\frac{1}{x}\\right)^{2x}$؟', 'What is $\\lim_{x\\to+\\infty}\\left(1+\\frac{1}{x}\\right)^{2x}$?'),
            options: [same('$1$'), same('$e^2$'), same('$2e$')],
            correctIndex: 1,
            explanation: same('$e^{\\lim 2x\\cdot\\frac{1}{x}}=e^2$')
        }
    },

    /* ---------- 4. Asymptotes ---------- */
    'vertical-horizontal': {
        mistake: {
            wrong: say('Kurbak ez du inoiz asintota horizontala mozten.', 'La curva nunca corta su asíntota horizontal.', 'لا يقطع المنحنى مقاربه الأفقي أبدًا.', 'The curve never cuts its horizontal asymptote.'),
            right: say('Erdiko zatian moztu dezake: asintota horizontalak $x\\to\\pm\\infty$ denean gertatzen dena bakarrik esaten du.', 'Puede cortarla en la parte central: la asíntota horizontal solo habla de lo que pasa cuando $x\\to\\pm\\infty$.', 'قد يقطعه في الجزء الأوسط: المقارب الأفقي يصف فقط ما يحدث عندما $x\\to\\pm\\infty$.', 'It can cut it in the middle: the horizontal asymptote only tells what happens as $x\\to\\pm\\infty$.')
        },
        check: {
            prompt: say('Zein asintota horizontal du $\\frac{4x^2}{x^2+1}$ funtzioaren grafikoak?', '¿Qué asíntota horizontal tiene la gráfica de $\\frac{4x^2}{x^2+1}$?', 'ما المقارب الأفقي لرسم $\\frac{4x^2}{x^2+1}$؟', 'Which horizontal asymptote does the graph of $\\frac{4x^2}{x^2+1}$ have?'),
            options: [same('$y=4$'), same('$y=0$'), say('Ez du', 'No tiene', 'ليس لها', 'It has none')],
            correctIndex: 0,
            explanation: say('Maila bera goian eta behean: $\\frac{4x^2}{x^2}=4$.', 'Mismo grado arriba y abajo: $\\frac{4x^2}{x^2}=4$.', 'الدرجة نفسها في البسط والمقام: $\\frac{4x^2}{x^2}=4$.', 'Same degree on top and below: $\\frac{4x^2}{x^2}=4$.')
        }
    },
    oblique: {
        mistake: {
            wrong: say('Funtzio arrazional guztiek dute asintota zeiharra.', 'Toda función racional tiene asíntota oblicua.', 'لكل دالة كسرية مقارب مائل.', 'Every rational function has an oblique asymptote.'),
            right: say('Goiko maila beheko maila baino bat handiagoa denean bakarrik; maila bera badute, asintota horizontala da.', 'Solo si el grado de arriba es uno más que el de abajo; con el mismo grado, la asíntota es horizontal.', 'فقط إذا زادت درجة البسط على درجة المقام بواحد؛ ومع الدرجة نفسها يكون المقارب أفقيًّا.', 'Only if the degree on top is one more than below; with the same degree, the asymptote is horizontal.')
        },
        check: {
            prompt: say('Zein da $\\frac{x^2}{x+2}$ funtzioaren asintota zeiharra?', '¿Cuál es la asíntota oblicua de $\\frac{x^2}{x+2}$?', 'ما المقارب المائل لـ $\\frac{x^2}{x+2}$؟', 'What is the oblique asymptote of $\\frac{x^2}{x+2}$?'),
            options: [same('$y=x+2$'), same('$y=x-2$'), same('$y=x$')],
            correctIndex: 1,
            explanation: same('$\\frac{x^2}{x+2}=x-2+\\frac{4}{x+2}$')
        }
    },
    branches: {
        mistake: {
            wrong: say('$\\frac{x^2-1}{x-1}$ funtzioak asintota bertikala du $x=1$ zuzenean.', '$\\frac{x^2-1}{x-1}$ tiene una asíntota vertical en $x=1$.', 'للدالة $\\frac{x^2-1}{x-1}$ مقارب رأسي عند $x=1$.', '$\\frac{x^2-1}{x-1}$ has a vertical asymptote at $x=1$.'),
            right: say('$x=1$ puntuan $\\frac{0}{0}$ da: sinplifikatuta, $x+1\\to 2$. Zulo bat dago, ez asintota.', 'En $x=1$ es $\\frac{0}{0}$: simplificando, $x+1\\to 2$. Hay un agujero, no una asíntota.', 'عند $x=1$ نجد $\\frac{0}{0}$: وبالاختصار $x+1\\to 2$. هناك ثقب لا مقارب.', 'At $x=1$ it is $\\frac{0}{0}$: simplifying, $x+1\\to 2$. There is a hole, not an asymptote.')
        },
        check: {
            prompt: say('Zer adar du $\\frac{x^4+1}{x^2}$ funtzioak $x\\to+\\infty$ denean?', '¿Qué rama tiene $\\frac{x^4+1}{x^2}$ cuando $x\\to+\\infty$?', 'ما الفرع الذي لـ $\\frac{x^4+1}{x^2}$ عندما $x\\to+\\infty$؟', 'What branch does $\\frac{x^4+1}{x^2}$ have as $x\\to+\\infty$?'),
            options: [say('Asintota zeiharra', 'Asíntota oblicua', 'مقارب مائل', 'Oblique asymptote'), say('Adar parabolikoa', 'Rama parabólica', 'فرع شلجمي', 'Parabolic branch'), say('Asintota horizontala', 'Asíntota horizontal', 'مقارب أفقي', 'Horizontal asymptote')],
            correctIndex: 1,
            explanation: say('Goiko maila 2 handiagoa da: $\\frac{x^4}{x^2}=x^2$ hazi egiten da, inolako zuzeni hurbildu gabe.', 'El grado de arriba es 2 más: $\\frac{x^4}{x^2}=x^2$ crece sin pegarse a ninguna recta.', 'درجة البسط أكبر باثنين: $\\frac{x^4}{x^2}=x^2$ تكبر دون أن تقترب من أي مستقيم.', 'The degree on top is 2 more: $\\frac{x^4}{x^2}=x^2$ grows without hugging any line.')
        }
    },

    /* ---------- 5. Continuity ---------- */
    continuous: {
        mistake: {
            wrong: say('Funtzioa jarraitua da $a$ puntuan, $f(a)$ existitzen bada.', 'Una función es continua en $a$ si existe $f(a)$.', 'تكون الدالة متصلة عند $a$ إذا وُجدت $f(a)$.', 'A function is continuous at $a$ if $f(a)$ exists.'),
            right: say('Hiru gauza behar dira: $f(a)$ egotea, limitea egotea eta biak berdinak izatea.', 'Hacen falta tres cosas: que exista $f(a)$, que exista el límite y que sean iguales.', 'يلزم ثلاثة أمور: أن توجد $f(a)$، وأن توجد النهاية، وأن تتساويا.', 'Three things are needed: $f(a)$ exists, the limit exists and they are equal.')
        },
        check: {
            prompt: say('Zein $a$ baliorekin da jarraitua $f(x)=\\begin{cases}ax & x<1\\\\ x+4 & x\\ge 1\\end{cases}$?', '¿Para qué $a$ es continua $f(x)=\\begin{cases}ax & x<1\\\\ x+4 & x\\ge 1\\end{cases}$?', 'لأي قيمة لـ $a$ تكون $f(x)=\\begin{cases}ax & x<1\\\\ x+4 & x\\ge 1\\end{cases}$ متصلة؟', 'For which $a$ is $f(x)=\\begin{cases}ax & x<1\\\\ x+4 & x\\ge 1\\end{cases}$ continuous?'),
            options: [same('$4$'), same('$5$'), same('$1$')],
            correctIndex: 1,
            explanation: say('Bi zatiek balio bera eman behar dute $x=1$ puntuan: $a\\cdot 1=1+4$, beraz $a=5$.', 'Los dos trozos tienen que dar lo mismo en $x=1$: $a\\cdot 1=1+4$, así que $a=5$.', 'يجب أن يعطي الجزآن القيمة نفسها عند $x=1$: $a\\cdot 1=1+4$، إذن $a=5$.', 'Both pieces must give the same at $x=1$: $a\\cdot 1=1+4$, so $a=5$.')
        }
    },
    discontinuities: {
        mistake: {
            wrong: say('Etenune gaindigarria limiterik ez duena da.', 'Una discontinuidad evitable es la que no tiene límite.', 'الانقطاع القابل للإزالة هو الذي لا نهاية له.', 'A removable discontinuity is one with no limit.'),
            right: say('Gaindigarrian limitea badago, baina ez da $f(a)$ edo $f(a)$ ez dago; puntu bakarra aldatuta konpontzen da.', 'En la evitable el límite existe, pero no es $f(a)$ o $f(a)$ no existe; se arregla cambiando un solo punto.', 'في الانقطاع القابل للإزالة توجد النهاية لكنها لا تساوي $f(a)$ أو أن $f(a)$ غير موجودة؛ ويُصلح بتغيير نقطة واحدة.', 'In a removable one the limit exists, but it is not $f(a)$ or $f(a)$ does not exist; changing a single point fixes it.')
        },
        check: {
            prompt: say('Zer etenune du $\\frac{x^2-4}{x-2}$ funtzioak $x=2$ puntuan?', '¿Qué discontinuidad tiene $\\frac{x^2-4}{x-2}$ en $x=2$?', 'ما نوع انقطاع $\\frac{x^2-4}{x-2}$ عند $x=2$؟', 'What discontinuity does $\\frac{x^2-4}{x-2}$ have at $x=2$?'),
            options: [say('Jauzi infinitua', 'Salto infinito', 'قفزة لانهائية', 'Infinite jump'), say('Gaindigarria', 'Evitable', 'قابل للإزالة', 'Removable'), say('Jauzi finitua', 'Salto finito', 'قفزة منتهية', 'Finite jump')],
            correctIndex: 1,
            explanation: say('$\\frac{(x-2)(x+2)}{x-2}=x+2\\to 4$: limitea badago, baina $f(2)$ ez.', '$\\frac{(x-2)(x+2)}{x-2}=x+2\\to 4$: el límite existe, pero $f(2)$ no.', '$\\frac{(x-2)(x+2)}{x-2}=x+2\\to 4$: النهاية موجودة لكن $f(2)$ غير موجودة.', '$\\frac{(x-2)(x+2)}{x-2}=x+2\\to 4$: the limit exists, but $f(2)$ does not.')
        }
    },
    bolzano: {
        mistake: {
            wrong: say('$f(a)$ eta $f(b)$ zeinu berekoak badira, ez dago errorik $a$ eta $b$ artean.', 'Si $f(a)$ y $f(b)$ tienen el mismo signo, no hay raíces entre $a$ y $b$.', 'إذا كان لـ $f(a)$ و$f(b)$ الإشارة نفسها فلا جذور بين $a$ و$b$.', 'If $f(a)$ and $f(b)$ have the same sign, there are no roots between $a$ and $b$.'),
            right: say('Bolzanok ez du hori esaten: $x^2-1$ funtzioak 3 balio du $-2$ eta 2 puntuetan, eta bi erro ditu bien artean.', 'Bolzano no dice eso: $x^2-1$ vale 3 en $-2$ y en 2, y tiene dos raíces entre ellos.', 'بولتسانو لا يقول ذلك: $x^2-1$ تساوي 3 عند $-2$ وعند 2، ولها جذران بينهما.', 'Bolzano does not say that: $x^2-1$ is 3 at $-2$ and at 2, and it has two roots between them.')
        },
        check: {
            prompt: say('$f(x)=\\frac{1}{x}$ funtzioak $f(-1)<0$ eta $f(1)>0$ betetzen ditu. Ba al du errorik $(-1,1)$ tartean?', '$f(x)=\\frac{1}{x}$ cumple $f(-1)<0$ y $f(1)>0$. ¿Tiene alguna raíz en $(-1,1)$?', 'تحقق $f(x)=\\frac{1}{x}$ الشرطين $f(-1)<0$ و$f(1)>0$. هل لها جذر في $(-1,1)$؟', '$f(x)=\\frac{1}{x}$ has $f(-1)<0$ and $f(1)>0$. Does it have a root in $(-1,1)$?'),
            options: [say('Bai, Bolzanoren arabera', 'Sí, por Bolzano', 'نعم، حسب بولتسانو', 'Yes, by Bolzano'), say('Ez: ez da jarraitua 0 puntuan', 'No: no es continua en 0', 'لا: ليست متصلة عند 0', 'No: it is not continuous at 0'), say('Bai, $x=0$ puntuan', 'Sí, en $x=0$', 'نعم، عند $x=0$', 'Yes, at $x=0$')],
            correctIndex: 1,
            explanation: say('Bolzanok funtzio jarraitua eskatzen du. $\\frac{1}{x}$ jauzi egiten du 0 puntuan, eta ez da inoiz 0.', 'Bolzano pide una función continua. $\\frac{1}{x}$ salta en 0 y nunca vale 0.', 'يشترط بولتسانو دالة متصلة. و$\\frac{1}{x}$ تقفز عند 0 ولا تساوي 0 أبدًا.', 'Bolzano needs a continuous function. $\\frac{1}{x}$ jumps at 0 and is never 0.')
        }
    }
}

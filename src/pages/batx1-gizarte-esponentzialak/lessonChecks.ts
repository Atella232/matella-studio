import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from './text.ts'

/* ==========================================================================
   Funtzio esponentzialak eta logaritmikoak · Batxilergoa 1 · Gizarte
   Zientziak — the typical mistake and the «Check it» question of every
   lesson. Plain data (no JSX) so the tests can import it. The questions
   use new numbers, never those of «Let's solve» or of the example, and one
   of their wrong answers is the lesson's typical mistake.
   ========================================================================== */

export type SocExpTopicId =
    | 'shifts' | 'reflections' | 'vertex-form'
    | 'composition' | 'inverse' | 'inverse-graph'
    | 'exp-graph' | 'percent-growth' | 'two-points'
    | 'log-inverse' | 'log-graph' | 'solve-time'
    | 'doubling' | 'logistic' | 'log-model'

export const socExpLessonChecks: Record<SocExpTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Transformations ---------- */
    shifts: {
        mistake: {
            wrong: say('$y=(x+4)^2$ parabolaren erpina $(4,0)$ da.', 'El vértice de $y=(x+4)^2$ es $(4,0)$.', 'رأس $y=(x+4)^2$ هو $(4,0)$.', 'The vertex of $y=(x+4)^2$ is $(4,0)$.'),
            right: say('Barrukoa 0 da $x=-4$ denean: erpina $(-4,0)$ da. Barruko $+4$ ezkerrera doa.', 'Lo de dentro vale 0 en $x=-4$: el vértice es $(-4,0)$. El $+4$ de dentro va a la izquierda.', 'ما بالداخل يساوي 0 عند $x=-4$: الرأس $(-4,0)$. والـ $+4$ في الداخل يذهب إلى اليسار.', 'The inside is 0 at $x=-4$: the vertex is $(-4,0)$. The $+4$ inside goes to the left.')
        },
        check: {
            prompt: say('$f$ funtzioa $(1,6)$ puntutik pasatzen da. Zein puntutatik pasatzen da $y=f(x-3)-2$?', 'La gráfica de $f$ pasa por $(1,6)$. ¿Por qué punto pasa $y=f(x-3)-2$?', 'يمر رسم $f$ بالنقطة $(1,6)$. بأي نقطة يمر $y=f(x-3)-2$؟', 'The graph of $f$ passes through $(1,6)$. Which point does $y=f(x-3)-2$ pass through?'),
            options: [same('$(-2,4)$'), same('$(4,4)$'), same('$(4,8)$')],
            correctIndex: 1,
            explanation: say('$x-3=1$ denean, $x=4$; eta $y=6-2=4$.', 'Con $x-3=1$, $x=4$; y $y=6-2=4$.', 'عندما $x-3=1$ تكون $x=4$، و$y=6-2=4$.', 'With $x-3=1$, $x=4$; and $y=6-2=4$.')
        }
    },
    reflections: {
        mistake: {
            wrong: say('$f$ funtzioa $(2,5)$ puntutik pasatzen bada, $y=f(-x)$ funtzioa $(2,-5)$ puntutik pasatzen da.', 'Si $f$ pasa por $(2,5)$, $y=f(-x)$ pasa por $(2,-5)$.', 'إذا مرت $f$ بـ $(2,5)$ فإن $y=f(-x)$ تمر بـ $(2,-5)$.', 'If $f$ passes through $(2,5)$, $y=f(-x)$ passes through $(2,-5)$.'),
            right: say('$f(-x)$ Y ardatzean islatzen da: $(-2,5)$. $(2,-5)$ puntua $-f(x)$ funtzioarena da.', '$f(-x)$ se refleja en el eje Y: $(-2,5)$. El punto $(2,-5)$ es de $-f(x)$.', '$f(-x)$ تنعكس في محور Y: $(-2,5)$. والنقطة $(2,-5)$ تخص $-f(x)$.', '$f(-x)$ is reflected in the y-axis: $(-2,5)$. The point $(2,-5)$ belongs to $-f(x)$.')
        },
        check: {
            prompt: say('$f$ funtzioa $(3,-4)$ puntutik pasatzen da. Zein puntutatik pasatzen da $y=2f(x)$?', 'La gráfica de $f$ pasa por $(3,-4)$. ¿Por qué punto pasa $y=2f(x)$?', 'يمر رسم $f$ بالنقطة $(3,-4)$. بأي نقطة يمر $y=2f(x)$؟', 'The graph of $f$ passes through $(3,-4)$. Which point does $y=2f(x)$ pass through?'),
            options: [same('$(6,-4)$'), same('$(3,-2)$'), same('$(3,-8)$')],
            correctIndex: 2,
            explanation: say('$2f(x)$ eginda, $y$ bikoizten da eta $x$ ez da aldatzen: $2\\cdot(-4)=-8$.', 'Con $2f(x)$ se duplica la $y$ y la $x$ no cambia: $2\\cdot(-4)=-8$.', 'مع $2f(x)$ تتضاعف $y$ ولا تتغير $x$: $2\\cdot(-4)=-8$.', 'With $2f(x)$ the $y$ doubles and the $x$ stays: $2\\cdot(-4)=-8$.')
        }
    },
    'vertex-form': {
        mistake: {
            wrong: same('$x^2+8x+3=(x+4)^2+3$'),
            right: say('$(x+4)^2=x^2+8x+16$ da: 16 kendu behar da, eta $(x+4)^2-13$ geratzen da.', '$(x+4)^2=x^2+8x+16$: hay que restar 16, y queda $(x+4)^2-13$.', '$(x+4)^2=x^2+8x+16$: يجب طرح 16، فيبقى $(x+4)^2-13$.', '$(x+4)^2=x^2+8x+16$: 16 must be taken away, leaving $(x+4)^2-13$.')
        },
        check: {
            prompt: say('$x^2-10x+20$ adierazpena $(x-m)^2+p$ moduan idaztean, zenbat da $p$?', 'Al escribir $x^2-10x+20$ como $(x-m)^2+p$, ¿cuánto vale $p$?', 'عند كتابة $x^2-10x+20$ على صورة $(x-m)^2+p$، كم تساوي $p$؟', 'Writing $x^2-10x+20$ as $(x-m)^2+p$, what is $p$?'),
            options: [same('$-5$'), same('$20$'), same('$45$')],
            correctIndex: 0,
            explanation: same('$(x-5)^2=x^2-10x+25\\qquad 20-25=-5$')
        }
    },

    /* ---------- 2. Composition and inverse ---------- */
    composition: {
        mistake: {
            wrong: say('$f(x)=2x$ eta $g(x)=x+5$ badira, $(f\\circ g)(x)=2x+5$.', 'Si $f(x)=2x$ y $g(x)=x+5$, $(f\\circ g)(x)=2x+5$.', 'إذا كانت $f(x)=2x$ و$g(x)=x+5$ فإن $(f\\circ g)(x)=2x+5$.', 'If $f(x)=2x$ and $g(x)=x+5$, then $(f\\circ g)(x)=2x+5$.'),
            right: say('$f\\circ g$ funtzioan lehenik $g$ doa: $f(x+5)=2(x+5)=2x+10$.', 'En $f\\circ g$ va primero $g$: $f(x+5)=2(x+5)=2x+10$.', 'في $f\\circ g$ تأتي $g$ أولًا: $f(x+5)=2(x+5)=2x+10$.', 'In $f\\circ g$, $g$ comes first: $f(x+5)=2(x+5)=2x+10$.')
        },
        check: {
            prompt: say('$f(x)=x^2$ eta $g(x)=x-1$ badira, zenbat da $(f\\circ g)(4)$?', 'Si $f(x)=x^2$ y $g(x)=x-1$, ¿cuánto vale $(f\\circ g)(4)$?', 'إذا كانت $f(x)=x^2$ و$g(x)=x-1$ فكم تساوي $(f\\circ g)(4)$؟', 'If $f(x)=x^2$ and $g(x)=x-1$, what is $(f\\circ g)(4)$?'),
            options: [same('$15$'), same('$9$'), same('$3$')],
            correctIndex: 1,
            explanation: same('$g(4)=3\\qquad f(3)=9$')
        }
    },
    inverse: {
        mistake: {
            wrong: say('$f(x)=x+7$ funtzioaren alderantzizkoa $\\frac{1}{x+7}$ da.', 'La inversa de $f(x)=x+7$ es $\\frac{1}{x+7}$.', 'عكسية $f(x)=x+7$ هي $\\frac{1}{x+7}$.', 'The inverse of $f(x)=x+7$ is $\\frac{1}{x+7}$.'),
            right: say('Alderantzizkoak $f$ desegiten du: 7 gehitu bazen, orain 7 kentzen da, $x-7$.', 'La inversa deshace $f$: si se sumaba 7, ahora se resta 7, $x-7$.', 'العكسية تلغي عمل $f$: إذا أضيف 7 نطرح الآن 7، أي $x-7$.', 'The inverse undoes $f$: if 7 was added, now 7 is taken away, $x-7$.')
        },
        check: {
            prompt: say('$f(x)=4x-8$ bada, zenbat da $f^{-1}(12)$?', 'Si $f(x)=4x-8$, ¿cuánto vale $f^{-1}(12)$?', 'إذا كانت $f(x)=4x-8$ فكم تساوي $f^{-1}(12)$؟', 'If $f(x)=4x-8$, what is $f^{-1}(12)$?'),
            options: [same('$40$'), same('$\\frac{1}{40}$'), same('$5$')],
            correctIndex: 2,
            explanation: say('Ebatzi $4x-8=12$: $4x=20$, beraz $x=5$.', 'Resuelve $4x-8=12$: $4x=20$, así que $x=5$.', 'حُلّ $4x-8=12$: ‏$4x=20$ إذن $x=5$.', 'Solve $4x-8=12$: $4x=20$, so $x=5$.')
        }
    },
    'inverse-graph': {
        mistake: {
            wrong: say('$y=x^2$ funtzioaren alderantzizkoa $\\sqrt{x}$ da, $\\mathbb{R}$ osoan.', 'La inversa de $y=x^2$ es $\\sqrt{x}$ en todo $\\mathbb{R}$.', 'عكسية $y=x^2$ هي $\\sqrt{x}$ على كل $\\mathbb{R}$.', 'The inverse of $y=x^2$ is $\\sqrt{x}$ on all of $\\mathbb{R}$.'),
            right: say('$x^2$ funtzioak balio bera ematen du $x$ eta $-x$ zenbakietan: adarka bakarrik du alderantzizkoa. $x\\ge 0$ denean, $\\sqrt{x}$; $x\\le 0$ denean, $-\\sqrt{x}$.', '$x^2$ da el mismo valor en $x$ y en $-x$: solo tiene inversa por ramas. Con $x\\ge 0$, $\\sqrt{x}$; con $x\\le 0$, $-\\sqrt{x}$.', '$x^2$ تعطي القيمة نفسها عند $x$ و$-x$: لها عكسية على فروع فقط. مع $x\\ge 0$ هي $\\sqrt{x}$، ومع $x\\le 0$ هي $-\\sqrt{x}$.', '$x^2$ gives the same value at $x$ and $-x$: it only has an inverse by branches. With $x\\ge 0$, $\\sqrt{x}$; with $x\\le 0$, $-\\sqrt{x}$.')
        },
        check: {
            prompt: say('$f$ funtzioaren grafikoa $(2,7)$ puntutik pasatzen da. Zein puntutatik pasatzen da $f^{-1}$ funtzioarena?', 'La gráfica de $f$ pasa por $(2,7)$. ¿Por qué punto pasa la de $f^{-1}$?', 'يمر رسم $f$ بالنقطة $(2,7)$. بأي نقطة يمر رسم $f^{-1}$؟', 'The graph of $f$ passes through $(2,7)$. Which point does that of $f^{-1}$ pass through?'),
            options: [same('$(7,2)$'), same('$(-2,-7)$'), same('$\\left(2,\\frac{1}{7}\\right)$')],
            correctIndex: 0,
            explanation: say('$y=x$ zuzenean islatzean, koordenatuak trukatzen dira: $(7,2)$.', 'Al reflejar en la recta $y=x$, las coordenadas se intercambian: $(7,2)$.', 'عند الانعكاس في المستقيم $y=x$ يتبادل الإحداثيان: $(7,2)$.', 'Reflecting in the line $y=x$ swaps the coordinates: $(7,2)$.')
        }
    },

    /* ---------- 3. Exponential functions ---------- */
    'exp-graph': {
        mistake: {
            wrong: say('$y=0{,}5^x$ gorakorra da, $0{,}5>0$ delako.', '$y=0{,}5^x$ es creciente porque $0{,}5>0$.', '$y=0{,}5^x$ متزايدة لأن $0{,}5>0$.', '$y=0{,}5^x$ is increasing because $0{,}5>0$.'),
            right: say('$0<a<1$ denean beherakorra da: $0{,}5^1=0{,}5$ eta $0{,}5^2=0{,}25$.', 'Con $0<a<1$ es decreciente: $0{,}5^1=0{,}5$ y $0{,}5^2=0{,}25$.', 'مع $0<a<1$ تكون متناقصة: $0{,}5^1=0{,}5$ و$0{,}5^2=0{,}25$.', 'With $0<a<1$ it is decreasing: $0{,}5^1=0{,}5$ and $0{,}5^2=0{,}25$.')
        },
        check: {
            prompt: say('Zer balio du beti $y=a^x$ funtzioak $x=0$ denean?', '¿Qué valor toma siempre $y=a^x$ en $x=0$?', 'ما القيمة التي تأخذها دائمًا $y=a^x$ عند $x=0$؟', 'What value does $y=a^x$ always take at $x=0$?'),
            options: [same('$0$'), same('$1$'), same('$a$')],
            correctIndex: 1,
            explanation: say('$a^0=1$ da edozein $a>0$ zenbakirekin: $(0,1)$.', '$a^0=1$ para cualquier $a>0$: $(0,1)$.', '$a^0=1$ لأي $a>0$: $(0,1)$.', '$a^0=1$ for any $a>0$: $(0,1)$.')
        }
    },
    'percent-growth': {
        mistake: {
            wrong: say('Auto batek % 15 galtzen badu urtero, haren balioa $V=V_0\\cdot 0{,}15^t$ da.', 'Si un coche pierde un 15 % al año, su valor es $V=V_0\\cdot 0{,}15^t$.', 'إذا فقدت سيارة 15 % سنويًّا فقيمتها $V=V_0\\cdot 0{,}15^t$.', 'If a car loses 15 % a year, its value is $V=V_0\\cdot 0{,}15^t$.'),
            right: say('% 85 geratzen da urtero: $V=V_0\\cdot 0{,}85^t$.', 'Cada año queda el 85 %: $V=V_0\\cdot 0{,}85^t$.', 'يبقى كل سنة 85 %: $V=V_0\\cdot 0{,}85^t$.', 'Each year 85 % is left: $V=V_0\\cdot 0{,}85^t$.')
        },
        check: {
            prompt: say('2000 biztanleko herri bat % 3 hazten da urtero. Zein formulak ematen du biztanleria $t$ urteren buruan?', 'Una población de 2000 habitantes crece un 3 % al año. ¿Qué fórmula da la población a los $t$ años?', 'بلدة سكانها 2000 تنمو 3 % سنويًّا. أي صيغة تعطي عدد السكان بعد $t$ سنة؟', 'A town of 2,000 people grows 3 % a year. Which formula gives the population after $t$ years?'),
            options: [same('$2000\\cdot 0{,}03^t$'), same('$2000\\cdot 3^t$'), same('$2000\\cdot 1{,}03^t$')],
            correctIndex: 2,
            explanation: say('% 3 hazteak 1,03 zenbakiaz biderkatzea esan nahi du urte bakoitzean.', 'Crecer un 3 % es multiplicar por 1,03 cada año.', 'النمو 3 % يعني الضرب في 1.03 كل سنة.', 'Growing 3 % means multiplying by 1.03 every year.')
        }
    },
    'two-points': {
        mistake: {
            wrong: say('$y=k\\cdot a^x$ funtzioa $(0,3)$ eta $(2,48)$ puntuetatik pasatzen bada, $a=\\frac{48}{3\\cdot 2}=8$.', 'Si $y=k\\cdot a^x$ pasa por $(0,3)$ y $(2,48)$, $a=\\frac{48}{3\\cdot 2}=8$.', 'إذا مرت $y=k\\cdot a^x$ بـ $(0,3)$ و$(2,48)$ فإن $a=\\frac{48}{3\\cdot 2}=8$.', 'If $y=k\\cdot a^x$ passes through $(0,3)$ and $(2,48)$, then $a=\\frac{48}{3\\cdot 2}=8$.'),
            right: say('Bi urratsetan biderkatzen da $a$ zenbakiaz: $a^2=\\frac{48}{3}=16$, eta $a=4$.', 'En dos pasos se multiplica dos veces por $a$: $a^2=\\frac{48}{3}=16$, y $a=4$.', 'في خطوتين نضرب في $a$ مرتين: $a^2=\\frac{48}{3}=16$، إذن $a=4$.', 'In two steps you multiply by $a$ twice: $a^2=\\frac{48}{3}=16$, so $a=4$.')
        },
        check: {
            prompt: say('$y=k\\cdot a^x$ funtzioa $(0,10)$ eta $(1,15)$ puntuetatik pasatzen da. Zenbat da $a$?', 'La función $y=k\\cdot a^x$ pasa por $(0,10)$ y $(1,15)$. ¿Cuánto vale $a$?', 'تمر $y=k\\cdot a^x$ بـ $(0,10)$ و$(1,15)$. كم تساوي $a$؟', 'The function $y=k\\cdot a^x$ passes through $(0,10)$ and $(1,15)$. What is $a$?'),
            options: [same('$5$'), same('$1{,}5$'), same('$0{,}5$')],
            correctIndex: 1,
            explanation: same('$k=10\\qquad a=\\frac{15}{10}=1{,}5$')
        }
    },

    /* ---------- 4. Logarithmic functions ---------- */
    'log-inverse': {
        mistake: {
            wrong: say('$\\log_2 8=4$, $8\\div 2=4$ delako.', '$\\log_2 8=4$, porque $8\\div 2=4$.', '$\\log_2 8=4$ لأن $8\\div 2=4$.', '$\\log_2 8=4$, because $8\\div 2=4$.'),
            right: say('$\\log_2 8$ berretzailea da: $2^3=8$, beraz $\\log_2 8=3$.', '$\\log_2 8$ es el exponente: $2^3=8$, así que $\\log_2 8=3$.', '$\\log_2 8$ هو الأس: $2^3=8$ إذن $\\log_2 8=3$.', '$\\log_2 8$ is the exponent: $2^3=8$, so $\\log_2 8=3$.')
        },
        check: {
            prompt: say('Zenbat da $\\log_3 81$?', '¿Cuánto vale $\\log_3 81$?', 'كم تساوي $\\log_3 81$؟', 'What is $\\log_3 81$?'),
            options: [same('$27$'), same('$3$'), same('$4$')],
            correctIndex: 2,
            explanation: same('$3^4=81\\ \\to\\ \\log_3 81=4$')
        }
    },
    'log-graph': {
        mistake: {
            wrong: say('$y=\\log(x+5)$ funtzioaren izate-eremua $x>5$ da.', 'El dominio de $y=\\log(x+5)$ es $x>5$.', 'مجال $y=\\log(x+5)$ هو $x>5$.', 'The domain of $y=\\log(x+5)$ is $x>5$.'),
            right: say('Barrukoak positiboa izan behar du: $x+5>0$, hau da, $x>-5$.', 'Lo de dentro tiene que ser positivo: $x+5>0$, es decir, $x>-5$.', 'يجب أن يكون ما بالداخل موجبًا: $x+5>0$ أي $x>-5$.', 'The inside must be positive: $x+5>0$, that is, $x>-5$.')
        },
        check: {
            prompt: say('Zein da $y=\\log_2(x-3)+1$ funtzioaren izate-eremua?', '¿Cuál es el dominio de $y=\\log_2(x-3)+1$?', 'ما مجال $y=\\log_2(x-3)+1$؟', 'What is the domain of $y=\\log_2(x-3)+1$?'),
            options: [same('$(-3,+\\infty)$'), same('$(3,+\\infty)$'), same('$[3,+\\infty)$')],
            correctIndex: 1,
            explanation: say('$x-3>0$; 0 zenbakiaren logaritmorik ez dago, beraz 3 ez da sartzen.', '$x-3>0$; el logaritmo de 0 no existe, así que el 3 no entra.', '$x-3>0$؛ لوغاريتم 0 غير موجود، فلا يدخل 3.', '$x-3>0$; the logarithm of 0 does not exist, so 3 is left out.')
        }
    },
    'solve-time': {
        mistake: {
            wrong: say('$1{,}05^t=2$ bada, $t=\\frac{2}{1{,}05}$.', 'Si $1{,}05^t=2$, $t=\\frac{2}{1{,}05}$.', 'إذا كان $1{,}05^t=2$ فإن $t=\\frac{2}{1{,}05}$.', 'If $1{,}05^t=2$, then $t=\\frac{2}{1{,}05}$.'),
            right: say('$t$ berretzailea da: logaritmoak hartzen dira, $t=\\frac{\\log 2}{\\log 1{,}05}\\approx 14{,}2$.', '$t$ es el exponente: se toman logaritmos, $t=\\frac{\\log 2}{\\log 1{,}05}\\approx 14{,}2$.', '$t$ هو الأس: نأخذ اللوغاريتم، $t=\\frac{\\log 2}{\\log 1{,}05}\\approx 14{,}2$.', '$t$ is the exponent: take logarithms, $t=\\frac{\\log 2}{\\log 1{,}05}\\approx 14{,}2$.')
        },
        check: {
            prompt: say('Zein adierazpenek ematen du $t$, $3^t=50$ bada?', '¿Qué expresión da $t$ si $3^t=50$?', 'أي عبارة تعطي $t$ إذا كان $3^t=50$؟', 'Which expression gives $t$ if $3^t=50$?'),
            options: [same('$\\frac{\\log 50}{\\log 3}$'), same('$\\frac{50}{3}$'), same('$\\log\\frac{50}{3}$')],
            correctIndex: 0,
            explanation: same('$t\\cdot\\log 3=\\log 50\\ \\to\\ t=\\frac{\\log 50}{\\log 3}$')
        }
    },

    /* ---------- 5. Models ---------- */
    doubling: {
        mistake: {
            wrong: say('10 urtean bikoizten bada, 30 urtean 6 aldiz handiagoa izango da.', 'Si se duplica en 10 años, en 30 años será 6 veces mayor.', 'إذا تضاعف في 10 سنوات فسيكون بعد 30 سنة أكبر بـ 6 مرات.', 'If it doubles in 10 years, in 30 years it will be 6 times bigger.'),
            right: say('10 urtean behin bikoizten da: 30 urte 3 bikoizketa dira, $2^3=8$ aldiz.', 'Se duplica cada 10 años: 30 años son 3 duplicaciones, $2^3=8$ veces.', 'يتضاعف كل 10 سنوات: 30 سنة هي 3 مضاعفات، أي $2^3=8$ مرات.', 'It doubles every 10 years: 30 years are 3 doublings, $2^3=8$ times.')
        },
        check: {
            prompt: say('Substantzia baten erdibizitza 5 urte da. Zer zati geratzen da 15 urteren buruan?', 'Una sustancia tiene una semivida de 5 años. ¿Qué fracción queda a los 15 años?', 'عمر النصف لمادة 5 سنوات. أي كسر يبقى بعد 15 سنة؟', 'A substance has a half-life of 5 years. What fraction is left after 15 years?'),
            options: [same('$\\frac{1}{3}$'), same('$\\frac{1}{8}$'), same('$\\frac{1}{6}$')],
            correctIndex: 1,
            explanation: same('$\\left(\\frac{1}{2}\\right)^3=\\frac{1}{8}$')
        }
    },
    logistic: {
        mistake: {
            wrong: say('Salmenta logistikoak gelditu gabe hazten dira, esponentzial bat bezala.', 'Unas ventas logísticas crecen sin parar, como una exponencial.', 'المبيعات اللوجستية تنمو بلا توقف مثل الأسية.', 'Logistic sales grow without stopping, like an exponential.'),
            right: say('Hasieran esponentzialaren antzekoak dira, baina gero moteldu eta $M$ sabairantz hurbiltzen dira: $y=M$ asintota da.', 'Al principio se parecen a una exponencial, pero luego se frenan y se acercan al techo $M$: $y=M$ es una asíntota.', 'في البداية تشبه الأسية، ثم تتباطأ وتقترب من السقف $M$: ‏$y=M$ خط مقارب.', 'At first they look exponential, but then they slow down and approach the ceiling $M$: $y=M$ is an asymptote.')
        },
        check: {
            prompt: say('$f(x)=\\frac{500}{1+4\\cdot 2^{-x}}$ bada, zein baliotara hurbiltzen da $x$ oso handia denean?', 'Si $f(x)=\\frac{500}{1+4\\cdot 2^{-x}}$, ¿a qué valor se acerca cuando $x$ es muy grande?', 'إذا كانت $f(x)=\\frac{500}{1+4\\cdot 2^{-x}}$، فمن أي قيمة تقترب عندما تكبر $x$ كثيرًا؟', 'If $f(x)=\\frac{500}{1+4\\cdot 2^{-x}}$, what value does it approach when $x$ is very large?'),
            options: [same('$100$'), same('$125$'), same('$500$')],
            correctIndex: 2,
            explanation: say('$2^{-x}$ gaia 0 baliora hurbiltzen da, eta izendatzailea 1 baliora: $\\frac{500}{1}=500$. Hasieran, $\\frac{500}{5}=100$.', '$2^{-x}$ se acerca a 0 y el denominador, a 1: $\\frac{500}{1}=500$. Al principio vale $\\frac{500}{5}=100$.', '$2^{-x}$ يقترب من 0 والمقام من 1: $\\frac{500}{1}=500$. وفي البداية تساوي $\\frac{500}{5}=100$.', '$2^{-x}$ approaches 0 and the denominator 1: $\\frac{500}{1}=500$. At the start it is $\\frac{500}{5}=100$.')
        }
    },
    'log-model': {
        mistake: {
            wrong: same('$R(100)=60-25\\cdot 100=-2440$'),
            right: say('Logaritmoa ahaztu da: $\\log 100=2$, beraz $R(100)=60-25\\cdot 2=10$.', 'Se olvidó el logaritmo: $\\log 100=2$, así que $R(100)=60-25\\cdot 2=10$.', 'نُسي اللوغاريتم: $\\log 100=2$ إذن $R(100)=60-25\\cdot 2=10$.', 'The logarithm was forgotten: $\\log 100=2$, so $R(100)=60-25\\cdot 2=10$.')
        },
        check: {
            prompt: say('$R(t)=70-20\\log(t+1)$ bada, zenbat da $R(99)$?', 'Si $R(t)=70-20\\log(t+1)$, ¿cuánto vale $R(99)$?', 'إذا كانت $R(t)=70-20\\log(t+1)$ فكم تساوي $R(99)$؟', 'If $R(t)=70-20\\log(t+1)$, what is $R(99)$?'),
            options: [same('$30$'), same('$50$'), same('$-1930$')],
            correctIndex: 0,
            explanation: same('$\\log 100=2\\qquad 70-20\\cdot 2=30$')
        }
    }
}

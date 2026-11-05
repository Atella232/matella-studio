import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Funtzioak · 4. DBH akademikoak — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import
   it; lessons.tsx merges it into the topics. Intervals and points are
   written left to right in every language.
   ========================================================================== */

export type FunctionsAkTopicId = 'what-is' | 'images' | 'range-graph' | 'rational-domain' | 'radical-domain' | 'mixed-domain' | 'discontinuities' | 'piecewise' | 'piecewise-continuity' | 'intercepts' | 'sign' | 'symmetry' | 'monotony' | 'rate' | 'periodic'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const functionsAkLessonChecks: Record<FunctionsAkTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'what-is': {
        mistake: {
            wrong: say('$y=x^{2}$ funtzioan $f(2)=f(-2)=4$; bi $x$ balioek $y$ bera ematen dutenez, ez da funtzioa.', 'En $y=x^{2}$, $f(2)=f(-2)=4$; como dos $x$ dan la misma $y$, no es función.', 'في $y=x^{2}$ يكون $f(2)=f(-2)=4$؛ وبما أن قيمتين لـ $x$ تعطيان $y$ نفسها فليست دالة.', 'In $y=x^{2}$, $f(2)=f(-2)=4$; since two values of $x$ give the same $y$, it is not a function.'),
            right: say('Debekatuta dagoena da $x$ batek bi $y$ izatea. Bi $x$ balioek $y$ bera ematea ondo dago: funtzioa da.', 'Lo que no se permite es que una $x$ tenga dos $y$. Que dos $x$ den la misma $y$ está bien: es función.', 'الممنوع أن يكون لقيمة $x$ واحدة قيمتان لـ $y$. أما أن تعطي قيمتان لـ $x$ القيمة $y$ نفسها فلا بأس: هي دالة.', 'What is not allowed is one $x$ with two values of $y$. Two values of $x$ giving the same $y$ is fine: it is a function.')
        },
        check: {
            prompt: say('Erlazio hauetatik, zein ez da funtzioa?', '¿Cuál de estas relaciones no es una función?', 'أيّ هذه العلاقات ليست دالة؟', 'Which of these relations is not a function?'),
            options: [same('$y=2x-1$'), same('$y^{2}=x+1$'), same('$y=x^{3}$')],
            correctIndex: 1,
            explanation: say('$y^{2}=x+1$ erlazioan, 3 zenbakiari $y=2$ eta $y=-2$ dagozkio.', 'En $y^{2}=x+1$, al 3 le tocan $y=2$ e $y=-2$.', 'في $y^{2}=x+1$ تقابل العدد 3 القيمتان $y=2$ و$y=-2$.', 'In $y^{2}=x+1$, 3 gets $y=2$ and $y=-2$.')
        }
    },
    images: {
        mistake: {
            wrong: say('$f(x)=x^{2}$ bada, $f(-4)=-4^{2}=-16$.', 'Si $f(x)=x^{2}$, $f(-4)=-4^{2}=-16$.', 'إذا كانت $f(x)=x^{2}$ فإن $f(-4)=-4^{2}=-16$.', 'If $f(x)=x^{2}$, $f(-4)=-4^{2}=-16$.'),
            right: say('Parentesi artean ordezten da: $f(-4)=(-4)^{2}=16$.', 'Se sustituye entre paréntesis: $f(-4)=(-4)^{2}=16$.', 'نعوّض بين قوسين: $f(-4)=(-4)^{2}=16$.', 'Substitute in brackets: $f(-4)=(-4)^{2}=16$.')
        },
        check: {
            prompt: say('$f(x)=3x-2$ bada, zein $x$ balioak betetzen du $f(x)=10$?', 'Si $f(x)=3x-2$, ¿qué $x$ cumple $f(x)=10$?', 'إذا كانت $f(x)=3x-2$ فما قيمة $x$ التي تحقق $f(x)=10$؟', 'If $f(x)=3x-2$, which $x$ has $f(x)=10$?'),
            options: [same('$4$'), same('$28$'), same('$\\frac{8}{3}$')],
            correctIndex: 0,
            explanation: same('$3x-2=10\\ \\to\\ 3x=12\\ \\to\\ x=4$')
        }
    },
    'range-graph': {
        mistake: {
            wrong: say('Ibiltartea X ardatzean irakurtzen da.', 'El recorrido se lee en el eje X.', 'يُقرأ المدى على محور X.', 'The range is read on the X axis.'),
            right: say('X ardatzean izate-eremua irakurtzen da; ibiltartea, Y ardatzean: grafikoak hartzen dituen altuerak.', 'En el eje X se lee el dominio; el recorrido, en el eje Y: las alturas que alcanza la gráfica.', 'على محور X يُقرأ المجال، والمدى على محور Y: الارتفاعات التي يبلغها الرسم.', 'The domain is read on the X axis; the range, on the Y axis: the heights the graph reaches.')
        },
        check: {
            prompt: say('Grafiko jarraitu bat $(-1,\\,0)$ puntu betetik $(5,\\,2)$ puntu hutsera doa. Zein da haren izate-eremua?', 'Una gráfica sin cortes va del punto relleno $(-1,\\,0)$ al punto hueco $(5,\\,2)$. ¿Cuál es su dominio?', 'يمتد رسم متصل من النقطة الممتلئة $(-1,\\,0)$ إلى النقطة الفارغة $(5,\\,2)$. ما مجاله؟', 'An unbroken graph goes from the filled point $(-1,\\,0)$ to the open point $(5,\\,2)$. What is its domain?'),
            options: [same('$[-1,\\,5)$'), same('$[-1,\\,5]$'), same('$[0,\\,2)$')],
            correctIndex: 0,
            explanation: say('X ardatzean, $-1$ zenbakitik 5 zenbakira: betea, kortxetea; hutsa, parentesia.', 'En el eje X, de $-1$ a 5: relleno, corchete; hueco, paréntesis.', 'على محور X من $-1$ إلى 5: الممتلئة بقوس معقوف والفارغة بقوس عادي.', 'On the X axis, from $-1$ to 5: filled, square bracket; open, round bracket.')
        }
    },
    'rational-domain': {
        mistake: {
            wrong: say('$y=\\dfrac{x-3}{x+5}$ funtzioan 3 eta $-5$ kendu behar dira.', 'En $y=\\dfrac{x-3}{x+5}$ hay que quitar el 3 y el $-5$.', 'في $y=\\dfrac{x-3}{x+5}$ يجب حذف 3 و$-5$.', 'In $y=\\dfrac{x-3}{x+5}$ you must remove 3 and $-5$.'),
            right: say('Izendatzailea anulatzen duena bakarrik kentzen da: Dom $f=\\mathbb{R}-\\{-5\\}$. Zenbakitzaileak ez du ezer kentzen.', 'Solo se quita lo que anula el denominador: Dom $f=\\mathbb{R}-\\{-5\\}$. El numerador no quita nada.', 'نحذف فقط ما يعدم المقام: Dom $f=\\mathbb{R}-\\{-5\\}$. البسط لا يحذف شيئًا.', 'Only what makes the denominator 0 is removed: Dom $f=\\mathbb{R}-\\{-5\\}$. The numerator removes nothing.')
        },
        check: {
            prompt: say('Zein da $y=\\dfrac{2}{x^{2}-9x}$ funtzioaren izate-eremua?', '¿Cuál es el dominio de $y=\\dfrac{2}{x^{2}-9x}$?', 'ما مجال $y=\\dfrac{2}{x^{2}-9x}$؟', 'What is the domain of $y=\\dfrac{2}{x^{2}-9x}$?'),
            options: [same('$\\mathbb{R}-\\{9\\}$'), same('$\\mathbb{R}-\\{0,\\,9\\}$'), same('$\\mathbb{R}-\\{-9,\\,9\\}$')],
            correctIndex: 1,
            explanation: same('$x(x-9)=0\\ \\to\\ x=0,\\ x=9$')
        }
    },
    'radical-domain': {
        mistake: {
            wrong: say('$y=\\sqrt{x-4}$ funtzioaren izate-eremua $(4,\\,+\\infty)$ da.', 'El dominio de $y=\\sqrt{x-4}$ es $(4,\\,+\\infty)$.', 'مجال $y=\\sqrt{x-4}$ هو $(4,\\,+\\infty)$.', 'The domain of $y=\\sqrt{x-4}$ is $(4,\\,+\\infty)$.'),
            right: say('$\\sqrt{0}=0$ badago: 4 sartzen da, $[4,\\,+\\infty)$.', '$\\sqrt{0}=0$ existe: el 4 entra, $[4,\\,+\\infty)$.', '$\\sqrt{0}=0$ موجود: العدد 4 يدخل، $[4,\\,+\\infty)$.', '$\\sqrt{0}=0$ exists: 4 is in, $[4,\\,+\\infty)$.')
        },
        check: {
            prompt: say('Zein da $y=\\sqrt{6-2x}$ funtzioaren izate-eremua?', '¿Cuál es el dominio de $y=\\sqrt{6-2x}$?', 'ما مجال $y=\\sqrt{6-2x}$؟', 'What is the domain of $y=\\sqrt{6-2x}$?'),
            options: [same('$[3,\\,+\\infty)$'), same('$(-\\infty,\\,3]$'), same('$(-\\infty,\\,6]$')],
            correctIndex: 1,
            explanation: same('$6-2x\\ge 0\\ \\to\\ x\\le 3$')
        }
    },
    'mixed-domain': {
        mistake: {
            wrong: say('$y=\\dfrac{1}{\\sqrt{x+3}}$ funtzioaren izate-eremua $[-3,\\,+\\infty)$ da.', 'El dominio de $y=\\dfrac{1}{\\sqrt{x+3}}$ es $[-3,\\,+\\infty)$.', 'مجال $y=\\dfrac{1}{\\sqrt{x+3}}$ هو $[-3,\\,+\\infty)$.', 'The domain of $y=\\dfrac{1}{\\sqrt{x+3}}$ is $[-3,\\,+\\infty)$.'),
            right: say('Erroa izendatzailean dago: $x+3>0$, $-3$ gabe: $(-3,\\,+\\infty)$.', 'La raíz está en el denominador: $x+3>0$, sin el $-3$: $(-3,\\,+\\infty)$.', 'الجذر في المقام: $x+3>0$ بدون $-3$: $(-3,\\,+\\infty)$.', 'The root is in the denominator: $x+3>0$, without $-3$: $(-3,\\,+\\infty)$.')
        },
        check: {
            prompt: say('Zein da $y=\\dfrac{\\sqrt{x}}{x-4}$ funtzioaren izate-eremua?', '¿Cuál es el dominio de $y=\\dfrac{\\sqrt{x}}{x-4}$?', 'ما مجال $y=\\dfrac{\\sqrt{x}}{x-4}$؟', 'What is the domain of $y=\\dfrac{\\sqrt{x}}{x-4}$?'),
            options: [same('$[0,\\,4)\\cup(4,\\,+\\infty)$'), same('$[0,\\,+\\infty)$'), same('$\\mathbb{R}-\\{4\\}$')],
            correctIndex: 0,
            explanation: say('$x\\ge 0$ eta $x\\ne 4$, biak batera.', '$x\\ge 0$ y $x\\ne 4$, a la vez.', '$x\\ge 0$ و$x\\ne 4$ معًا.', '$x\\ge 0$ and $x\\ne 4$, at once.')
        }
    },
    discontinuities: {
        mistake: {
            wrong: say('$y=\\dfrac{x^{2}-4}{x-2}$ jarraitua da $x=2$ puntuan, sinplifikatuta $y=x+2$ geratzen delako.', '$y=\\dfrac{x^{2}-4}{x-2}$ es continua en $x=2$, porque al simplificar queda $y=x+2$.', '$y=\\dfrac{x^{2}-4}{x-2}$ متصلة عند $x=2$ لأنها تصبح $y=x+2$ بعد الاختزال.', '$y=\\dfrac{x^{2}-4}{x-2}$ is continuous at $x=2$, because it simplifies to $y=x+2$.'),
            right: say('$x=2$ puntuan ez dago definituta: zulo bat dago, etenune saihesgarri bat.', 'En $x=2$ no está definida: hay un agujero, una discontinuidad evitable.', 'عند $x=2$ ليست معرّفة: فيها ثقب، أي انقطاع قابل للإزالة.', 'At $x=2$ it is not defined: there is a hole, a removable discontinuity.')
        },
        check: {
            prompt: say('Aparkaleku batek 2 € kobratzen ditu hasitako ordu bakoitzeko. Zer etenune du prezioak ordu zehatzetan?', 'Un aparcamiento cobra 2 € por cada hora empezada. ¿Qué discontinuidad tiene el precio en las horas exactas?', 'موقف سيارات يأخذ 2 € عن كل ساعة تبدأ. ما نوع انقطاع السعر عند الساعات الكاملة؟', 'A car park charges €2 for each hour started. What discontinuity does the price have at the exact hours?'),
            options: [say('Saihesgarria', 'Evitable', 'قابل للإزالة', 'Removable'), say('Jauzi finitukoa', 'De salto finito', 'قفزة منتهية', 'Finite jump'), say('Jauzi infinitukoa', 'De salto infinito', 'قفزة لانهائية', 'Infinite jump')],
            correctIndex: 1,
            explanation: say('Prezioak balio batetik bestera egiten du jauzi: alde banatan balio desberdinak.', 'El precio salta de un valor a otro: a cada lado, valores distintos.', 'يقفز السعر من قيمة إلى أخرى: قيمتان مختلفتان على الجانبين.', 'The price jumps from one value to another: different values on each side.')
        }
    },
    piecewise: {
        mistake: {
            wrong: say('$f(x)=x+5$ ($x<3$) eta $f(x)=2x$ ($x\\ge 3$) badira, $f(3)=3+5=8$.', 'Si $f(x)=x+5$ ($x<3$) y $f(x)=2x$ ($x\\ge 3$), $f(3)=3+5=8$.', 'إذا كانت $f(x)=x+5$ ($x<3$) و$f(x)=2x$ ($x\\ge 3$) فإن $f(3)=3+5=8$.', 'If $f(x)=x+5$ ($x<3$) and $f(x)=2x$ ($x\\ge 3$), $f(3)=3+5=8$.'),
            right: say('3 bigarren zatian dago, $x\\ge 3$ delako: $f(3)=2\\cdot 3=6$.', 'El 3 está en el segundo trozo, porque $x\\ge 3$: $f(3)=2\\cdot 3=6$.', 'العدد 3 في الجزء الثاني لأن $x\\ge 3$: $f(3)=2\\cdot 3=6$.', '3 is in the second piece, because $x\\ge 3$: $f(3)=2\\cdot 3=6$.')
        },
        check: {
            prompt: say('$f(x)=x^{2}$ ($x<0$) eta $f(x)=4-x$ ($x\\ge 0$) badira, zenbat da $f(-2)$?', 'Si $f(x)=x^{2}$ ($x<0$) y $f(x)=4-x$ ($x\\ge 0$), ¿cuánto vale $f(-2)$?', 'إذا كانت $f(x)=x^{2}$ ($x<0$) و$f(x)=4-x$ ($x\\ge 0$) فما قيمة $f(-2)$؟', 'If $f(x)=x^{2}$ ($x<0$) and $f(x)=4-x$ ($x\\ge 0$), what is $f(-2)$?'),
            options: [same('$6$'), same('$4$'), same('$-4$')],
            correctIndex: 1,
            explanation: say('$-2<0$: lehen zatia, $(-2)^{2}=4$.', '$-2<0$: primer trozo, $(-2)^{2}=4$.', '$-2<0$: الجزء الأول، $(-2)^{2}=4$.', '$-2<0$: first piece, $(-2)^{2}=4$.')
        }
    },
    'piecewise-continuity': {
        mistake: {
            wrong: say('Zati bakoitza jarraitua bada, zatika definitutako funtzioa ere jarraitua da.', 'Si cada trozo es continuo, la función a trozos es continua.', 'إذا كان كل جزء متصلًا فالدالة المعرّفة على أجزاء متصلة.', 'If each piece is continuous, the piecewise function is continuous.'),
            right: say('Lotuneak begiratu behar dira: $f(x)=x+1$ ($x<2$) eta $f(x)=x+4$ ($x\\ge 2$) zatiek 3 eta 6 ematen dute 2 puntuan: 3 unitateko jauzia.', 'Falta mirar las uniones: $f(x)=x+1$ ($x<2$) y $f(x)=x+4$ ($x\\ge 2$) dan 3 y 6 en el 2: un salto de 3.', 'يجب النظر في نقاط الالتقاء: $f(x)=x+1$ ($x<2$) و$f(x)=x+4$ ($x\\ge 2$) يعطيان 3 و6 عند 2: قفزة مقدارها 3.', 'You must look at the joins: $f(x)=x+1$ ($x<2$) and $f(x)=x+4$ ($x\\ge 2$) give 3 and 6 at 2: a jump of 3.')
        },
        check: {
            prompt: say('$f(x)=3x$ ($x\\le 1$) eta $f(x)=x+k$ ($x>1$) badira, zein $k$ balioarekin da jarraitua?', 'Si $f(x)=3x$ ($x\\le 1$) y $f(x)=x+k$ ($x>1$), ¿con qué $k$ es continua?', 'إذا كانت $f(x)=3x$ ($x\\le 1$) و$f(x)=x+k$ ($x>1$) فبأي $k$ تكون متصلة؟', 'If $f(x)=3x$ ($x\\le 1$) and $f(x)=x+k$ ($x>1$), for which $k$ is it continuous?'),
            options: [same('$3$'), same('$2$'), same('$4$')],
            correctIndex: 1,
            explanation: same('$3\\cdot 1=1+k\\ \\to\\ k=2$')
        }
    },
    intercepts: {
        mistake: {
            wrong: say('$y=x^{2}-9$ funtzioak X ardatza $(0,\\,-9)$ puntuan mozten du.', '$y=x^{2}-9$ corta al eje X en $(0,\\,-9)$.', '$y=x^{2}-9$ يقطع محور X في $(0,\\,-9)$.', '$y=x^{2}-9$ cuts the X axis at $(0,\\,-9)$.'),
            right: say('Hori Y ardatzarekiko ebaki-puntua da. X ardatzarekin, $y=0$: $x^{2}=9$, $(-3,\\,0)$ eta $(3,\\,0)$.', 'Ese es el corte con el eje Y. Con el eje X, $y=0$: $x^{2}=9$, $(-3,\\,0)$ y $(3,\\,0)$.', 'تلك نقطة التقاطع مع محور Y. ومع محور X يكون $y=0$: $x^{2}=9$، $(-3,\\,0)$ و$(3,\\,0)$.', 'That is the Y-axis intercept. With the X axis, $y=0$: $x^{2}=9$, $(-3,\\,0)$ and $(3,\\,0)$.')
        },
        check: {
            prompt: say('Zein puntutan mozten du $y=\\dfrac{x-6}{x+2}$ funtzioak X ardatza?', '¿En qué punto corta $y=\\dfrac{x-6}{x+2}$ al eje X?', 'في أي نقطة يقطع $y=\\dfrac{x-6}{x+2}$ محور X؟', 'At which point does $y=\\dfrac{x-6}{x+2}$ cut the X axis?'),
            options: [same('$(6,\\,0)$'), same('$(-6,\\,0)$'), same('$(0,\\,6)$')],
            correctIndex: 0,
            explanation: say('Zenbakitzailea 0: $x-6=0\\ \\to\\ x=6$.', 'Numerador igual a 0: $x-6=0\\ \\to\\ x=6$.', 'البسط يساوي 0: $x-6=0\\ \\to\\ x=6$.', 'Numerator equal to 0: $x-6=0\\ \\to\\ x=6$.')
        }
    },
    sign: {
        mistake: {
            wrong: say('$f(x)=x^{2}-1$ negatiboa da $(-\\infty,\\,-1)$ tartean, han $x$ negatiboa delako.', '$f(x)=x^{2}-1$ es negativa en $(-\\infty,\\,-1)$, porque ahí la $x$ es negativa.', '$f(x)=x^{2}-1$ سالبة في $(-\\infty,\\,-1)$ لأن $x$ سالبة هناك.', '$f(x)=x^{2}-1$ is negative on $(-\\infty,\\,-1)$, because $x$ is negative there.'),
            right: say('Zenbaki bat probatu behar da: $f(-2)=3>0$. Positiboa da $(-\\infty,\\,-1)$ tartean.', 'Hay que probar un número: $f(-2)=3>0$. Es positiva en $(-\\infty,\\,-1)$.', 'يجب تجريب عدد: $f(-2)=3>0$. فهي موجبة في $(-\\infty,\\,-1)$.', 'Try a number: $f(-2)=3>0$. It is positive on $(-\\infty,\\,-1)$.')
        },
        check: {
            prompt: say('$f(x)=x(x-5)$ bada, non da $f(x)<0$?', 'Si $f(x)=x(x-5)$, ¿dónde es $f(x)<0$?', 'إذا كانت $f(x)=x(x-5)$ فأين يكون $f(x)<0$؟', 'If $f(x)=x(x-5)$, where is $f(x)<0$?'),
            options: [same('$(0,\\,5)$'), same('$(-\\infty,\\,0)$'), same('$(5,\\,+\\infty)$')],
            correctIndex: 0,
            explanation: say('0 eta 5 zenbakietan bakarrik aldatzen da zeinua, eta $f(1)=1\\cdot(-4)=-4$.', 'El signo solo cambia en 0 y en 5, y $f(1)=1\\cdot(-4)=-4$.', 'لا تتغير الإشارة إلا عند 0 و5، و$f(1)=1\\cdot(-4)=-4$.', 'The sign only changes at 0 and 5, and $f(1)=1\\cdot(-4)=-4$.')
        }
    },
    symmetry: {
        mistake: {
            wrong: say('$f(x)=x^{2}+x$ bikoitia da, $x^{2}$ duelako.', '$f(x)=x^{2}+x$ es par, porque tiene $x^{2}$.', '$f(x)=x^{2}+x$ زوجية لأن فيها $x^{2}$.', '$f(x)=x^{2}+x$ is even, because it has $x^{2}$.'),
            right: say('$f(-x)=x^{2}-x$, ez $f(x)$ ez $-f(x)$: ez bikoitia ez bakoitia.', '$f(-x)=x^{2}-x$, que no es $f(x)$ ni $-f(x)$: ni par ni impar.', '$f(-x)=x^{2}-x$ ليست $f(x)$ ولا $-f(x)$: لا زوجية ولا فردية.', '$f(-x)=x^{2}-x$, which is neither $f(x)$ nor $-f(x)$: neither even nor odd.')
        },
        check: {
            prompt: say('Zer simetria du $f(x)=x^{3}-2x$ funtzioak?', '¿Qué simetría tiene $f(x)=x^{3}-2x$?', 'ما تناظر $f(x)=x^{3}-2x$؟', 'What symmetry does $f(x)=x^{3}-2x$ have?'),
            options: [say('Bikoitia da', 'Es par', 'زوجية', 'Even'), say('Bakoitia da', 'Es impar', 'فردية', 'Odd'), say('Ez bata ez bestea', 'Ninguna', 'لا هذه ولا تلك', 'Neither')],
            correctIndex: 1,
            explanation: same('$f(-x)=-x^{3}+2x=-f(x)$')
        }
    },
    monotony: {
        mistake: {
            wrong: say('Parabola bat $(2,\\,-3)$ erpineraino jaitsi eta gero igotzen da: gorakorra da $(-3,\\,+\\infty)$ tartean.', 'Una parábola baja hasta el vértice $(2,\\,-3)$ y luego sube: crece en $(-3,\\,+\\infty)$.', 'قطع مكافئ ينزل حتى الرأس $(2,\\,-3)$ ثم يصعد: متزايد في $(-3,\\,+\\infty)$.', 'A parabola falls to the vertex $(2,\\,-3)$ and then rises: it increases on $(-3,\\,+\\infty)$.'),
            right: say('Tarteak $x$ balioekin idazten dira: gorakorra $(2,\\,+\\infty)$ tartean, eta minimoa $(2,\\,-3)$ da.', 'Los intervalos se escriben con las $x$: crece en $(2,\\,+\\infty)$, y el mínimo es $(2,\\,-3)$.', 'تُكتب الفترات بقيم $x$: متزايد في $(2,\\,+\\infty)$، والقيمة الصغرى $(2,\\,-3)$.', 'Intervals are written with the $x$ values: it increases on $(2,\\,+\\infty)$, and the minimum is $(2,\\,-3)$.')
        },
        check: {
            prompt: say('Non dago $y=x^{2}-8x+10$ parabolaren erpina?', '¿Dónde está el vértice de $y=x^{2}-8x+10$?', 'أين رأس $y=x^{2}-8x+10$؟', 'Where is the vertex of $y=x^{2}-8x+10$?'),
            options: [same('$(4,\\,-6)$'), same('$(-4,\\,-6)$'), same('$(4,\\,6)$')],
            correctIndex: 0,
            explanation: same('$x=\\frac{8}{2}=4\\qquad y=16-32+10=-6$')
        }
    },
    rate: {
        mistake: {
            wrong: say('$f(x)=x^{2}$ funtzioaren T.V.M. $[1,\\,3]$ tartean $f(3)-f(1)=8$ da.', 'La T.V.M. de $f(x)=x^{2}$ en $[1,\\,3]$ es $f(3)-f(1)=8$.', 'معدل التغير المتوسط لـ $f(x)=x^{2}$ في $[1,\\,3]$ هو $f(3)-f(1)=8$.', 'The average rate of change of $f(x)=x^{2}$ on $[1,\\,3]$ is $f(3)-f(1)=8$.'),
            right: say('$3-1$ kenduraz zatitu behar da: $\\frac{9-1}{3-1}=4$.', 'Falta dividir entre $3-1$: $\\frac{9-1}{3-1}=4$.', 'يجب القسمة على $3-1$: $\\frac{9-1}{3-1}=4$.', 'You still have to divide by $3-1$: $\\frac{9-1}{3-1}=4$.')
        },
        check: {
            prompt: say('Zein da $f(x)=5-2x$ funtzioaren T.V.M. $[0,\\,4]$ tartean?', '¿Cuál es la T.V.M. de $f(x)=5-2x$ en $[0,\\,4]$?', 'ما معدل التغير المتوسط لـ $f(x)=5-2x$ في $[0,\\,4]$؟', 'What is the average rate of change of $f(x)=5-2x$ on $[0,\\,4]$?'),
            options: [same('$-2$'), same('$2$'), same('$-8$')],
            correctIndex: 0,
            explanation: same('$\\frac{-3-5}{4-0}=-2$')
        }
    },
    periodic: {
        mistake: {
            wrong: say('Periodoa 4 bada, $f(19)=f(4)$, 19 zati 4 eginda 4 ateratzen delako.', 'Con periodo 4, $f(19)=f(4)$, porque 19 entre 4 da 4.', 'إذا كان الدور 4 فإن $f(19)=f(4)$ لأن 19 على 4 يعطي 4.', 'With period 4, $f(19)=f(4)$, because 19 divided by 4 gives 4.'),
            right: say('Hondarra da kontuan hartzen dena: $19=4\\cdot 4+3$; beraz, $f(19)=f(3)$.', 'Lo que cuenta es el resto: $19=4\\cdot 4+3$, así que $f(19)=f(3)$.', 'المهم هو الباقي: $19=4\\cdot 4+3$، إذن $f(19)=f(3)$.', 'What counts is the remainder: $19=4\\cdot 4+3$, so $f(19)=f(3)$.')
        },
        check: {
            prompt: say('5 periodoko funtzio batek $f(2)=7$ betetzen du. Zenbat da $f(27)$?', 'Una función de periodo 5 cumple $f(2)=7$. ¿Cuánto vale $f(27)$?', 'دالة دورها 5 تحقق $f(2)=7$. فما قيمة $f(27)$؟', 'A function with period 5 has $f(2)=7$. What is $f(27)$?'),
            options: [same('$7$'), same('$2$'), same('$27$')],
            correctIndex: 0,
            explanation: say('$27=5\\cdot 5+2$; beraz, $f(27)=f(2)$.', '$27=5\\cdot 5+2$, así que $f(27)=f(2)$.', '$27=5\\cdot 5+2$، إذن $f(27)=f(2)$.', '$27=5\\cdot 5+2$, so $f(27)=f(2)$.')
        }
    }
}

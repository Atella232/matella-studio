import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from './text.ts'

/* ==========================================================================
   Funtzio elementalak · Batxilergoa 1 · Zientziak — the typical mistake
   and the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics and gives
   each language its trigonometric names (\sin and \arcsin are written the
   same in the four here). The questions use new numbers, never those of
   «Let's solve» or of the example, and one of their wrong answers is the
   lesson's typical mistake. The inverses are written as bare expressions
   (∛(x + 2), not f⁻¹(x) = …): the test would read f⁻¹(x) as a product.
   ========================================================================== */

export type BachFunctionsTopicId =
    | 'domain' | 'symmetry' | 'periodic'
    | 'shifts' | 'reflections' | 'stretch'
    | 'inverse-function' | 'inverse-graph' | 'exp-log' | 'arc'
    | 'piecewise' | 'absolute' | 'floor'
    | 'operations' | 'composition'

export const bachFunctionsLessonChecks: Record<BachFunctionsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Studying a function ---------- */
    domain: {
        mistake: {
            wrong: say('$\\log(x-1)$ funtzioaren izate-eremua: $[1,+\\infty)$', 'Dominio de $\\log(x-1)$: $[1,+\\infty)$', 'مجال $\\log(x-1)$: $[1,+\\infty)$', 'Domain of $\\log(x-1)$: $[1,+\\infty)$'),
            right: say('Logaritmoak $x-1>0$ eskatzen du, ez $\\ge 0$: $x=1$ balioarekin $\\log 0$ legoke, eta ez dago. Izate-eremua $(1,+\\infty)$ da.', 'El logaritmo pide $x-1>0$, no $\\ge 0$: con $x=1$ saldría $\\log 0$, que no existe. El dominio es $(1,+\\infty)$.', 'يشترط اللوغاريتم $x-1>0$ لا $\\ge 0$: مع $x=1$ نحصل على $\\log 0$ وهو غير موجود. المجال هو $(1,+\\infty)$.', 'The logarithm needs $x-1>0$, not $\\ge 0$: with $x=1$ you would get $\\log 0$, which does not exist. The domain is $(1,+\\infty)$.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\frac{1}{\\sqrt{x-4}}$ funtzioaren izate-eremua?', '¿Cuál es el dominio de $f(x)=\\frac{1}{\\sqrt{x-4}}$?', 'ما مجال $f(x)=\\frac{1}{\\sqrt{x-4}}$؟', 'What is the domain of $f(x)=\\frac{1}{\\sqrt{x-4}}$?'),
            options: [same('$(4,+\\infty)$'), same('$[4,+\\infty)$'), same('$\\mathbb{R}-\\{4\\}$')],
            correctIndex: 0,
            explanation: say('Erroak $x-4\\ge 0$ eskatzen du, eta izendatzaileak $\\sqrt{x-4}\\neq 0$: biak batera, $x>4$.', 'La raíz pide $x-4\\ge 0$ y el denominador, $\\sqrt{x-4}\\neq 0$: las dos a la vez, $x>4$.', 'يشترط الجذر $x-4\\ge 0$ ويشترط المقام $\\sqrt{x-4}\\neq 0$: والاثنان معًا يعطيان $x>4$.', 'The root needs $x-4\\ge 0$ and the denominator $\\sqrt{x-4}\\neq 0$: both at once, $x>4$.')
        }
    },
    symmetry: {
        mistake: {
            wrong: say('$f(x)=x^3+x^2$ bakoitia da, $x^3$ duelako.', '$f(x)=x^3+x^2$ es impar porque tiene $x^3$.', '$f(x)=x^3+x^2$ فردية لأن فيها $x^3$.', '$f(x)=x^3+x^2$ is odd because it has $x^3$.'),
            right: say('$f(-x)=-x^3+x^2$ ez da $f(x)$, ezta $-f(x)$ ere: ez bikoitia ez bakoitia. Bakoitia izateko, gai guztiek izan behar dute berretzaile bakoitia.', '$f(-x)=-x^3+x^2$ no es $f(x)$ ni $-f(x)$: no es par ni impar. Para ser impar, todos los términos tendrían que tener exponente impar.', '$f(-x)=-x^3+x^2$ ليست $f(x)$ ولا $-f(x)$: فهي ليست زوجية ولا فردية. لتكون فردية يجب أن تكون أسس كل الحدود فردية.', '$f(-x)=-x^3+x^2$ is neither $f(x)$ nor $-f(x)$: it is neither even nor odd. To be odd, every term would need an odd exponent.')
        },
        check: {
            prompt: say('Nolakoa da $f(x)=\\frac{x^2}{x^4+1}$ funtzioa?', '¿Cómo es la función $f(x)=\\frac{x^2}{x^4+1}$?', 'ما نوع الدالة $f(x)=\\frac{x^2}{x^4+1}$؟', 'What kind of function is $f(x)=\\frac{x^2}{x^4+1}$?'),
            options: [say('Bakoitia', 'Impar', 'فردية', 'Odd'), say('Bikoitia', 'Par', 'زوجية', 'Even'), say('Ez bikoitia ez bakoitia', 'Ni par ni impar', 'ليست زوجية ولا فردية', 'Neither even nor odd')],
            correctIndex: 1,
            explanation: say('$f(-x)=\\frac{(-x)^2}{(-x)^4+1}=\\frac{x^2}{x^4+1}=f(x)$: Y ardatzarekiko simetrikoa da.', '$f(-x)=\\frac{(-x)^2}{(-x)^4+1}=\\frac{x^2}{x^4+1}=f(x)$: es simétrica respecto del eje Y.', '$f(-x)=\\frac{(-x)^2}{(-x)^4+1}=\\frac{x^2}{x^4+1}=f(x)$: إنها متناظرة حول محور Y.', '$f(-x)=\\frac{(-x)^2}{(-x)^4+1}=\\frac{x^2}{x^4+1}=f(x)$: it is symmetric about the y-axis.')
        }
    },
    periodic: {
        mistake: {
            wrong: say('$\\cos 4x$ funtzioaren periodoa $8\\pi$ da.', 'El periodo de $\\cos 4x$ es $8\\pi$.', 'دور $\\cos 4x$ هو $8\\pi$.', 'The period of $\\cos 4x$ is $8\\pi$.'),
            right: say('$x$ bider 4 egiteak grafikoa estutzen du: periodoa 4 zenbakiaz zatitzen da, $T=\\frac{2\\pi}{4}=\\frac{\\pi}{2}$.', 'Multiplicar $x$ por 4 comprime la gráfica: el periodo se divide entre 4, $T=\\frac{2\\pi}{4}=\\frac{\\pi}{2}$.', 'ضرب $x$ في 4 يقلّص الرسم: يُقسم الدور على 4، $T=\\frac{2\\pi}{4}=\\frac{\\pi}{2}$.', 'Multiplying $x$ by 4 squeezes the graph: the period is divided by 4, $T=\\frac{2\\pi}{4}=\\frac{\\pi}{2}$.')
        },
        check: {
            prompt: say('Funtzio baten periodoa 3 da, eta $f(1)=7$. Zenbat da $f(10)$?', 'Una función tiene periodo 3 y $f(1)=7$. ¿Cuánto vale $f(10)$?', 'لدالة دور 3 و$f(1)=7$. كم تساوي $f(10)$؟', 'A function has period 3 and $f(1)=7$. What is $f(10)$?'),
            options: [same('$21$'), same('$0$'), same('$7$')],
            correctIndex: 2,
            explanation: say('$10=1+3\\cdot 3$: hiru periodo aurrerago dago; beraz, $f(10)=f(1)=7$.', '$10=1+3\\cdot 3$: está tres periodos más allá, así que $f(10)=f(1)=7$.', '$10=1+3\\cdot 3$: إنها بعد ثلاثة أدوار، إذن $f(10)=f(1)=7$.', '$10=1+3\\cdot 3$: it is three periods further on, so $f(10)=f(1)=7$.')
        }
    },

    /* ---------- 2. Transformations ---------- */
    shifts: {
        mistake: {
            wrong: say('$y=(x-4)^2$ funtzioa $y=x^2$ da, 4 unitate ezkerrera eramanda.', '$y=(x-4)^2$ es $y=x^2$ desplazada 4 unidades a la izquierda.', '$y=(x-4)^2$ هي $y=x^2$ منسحبة 4 وحدات إلى اليسار.', '$y=(x-4)^2$ is $y=x^2$ moved 4 units to the left.'),
            right: say('Eskuinera doa: erpina $x-4=0$ denean dago, hau da, $x=4$ puntuan.', 'Va a la derecha: el vértice está donde $x-4=0$, es decir, en $x=4$.', 'بل تنسحب إلى اليمين: الرأس حيث $x-4=0$، أي عند $x=4$.', 'It moves to the right: the vertex is where $x-4=0$, that is, at $x=4$.')
        },
        check: {
            prompt: say('Nola lortzen da $y=f(x+2)$ funtzioaren grafikoa?', '¿Cómo se obtiene la gráfica de $y=f(x+2)$?', 'كيف نحصل على رسم $y=f(x+2)$؟', 'How do you get the graph of $y=f(x+2)$?'),
            options: [
                say('$f$ eramanda 2 unitate ezkerrera', 'Moviendo $f$ 2 unidades a la izquierda', 'بسحب $f$ وحدتين إلى اليسار', 'Moving $f$ 2 units to the left'),
                say('$f$ eramanda 2 unitate eskuinera', 'Moviendo $f$ 2 unidades a la derecha', 'بسحب $f$ وحدتين إلى اليمين', 'Moving $f$ 2 units to the right'),
                say('$f$ eramanda 2 unitate gora', 'Moviendo $f$ 2 unidades hacia arriba', 'بسحب $f$ وحدتين إلى الأعلى', 'Moving $f$ 2 units up')
            ],
            correctIndex: 0,
            explanation: say('$f$ funtzioak 0 puntuan zuena orain $x+2=0$ denean ateratzen da, $x=-2$ puntuan: ezkerrera.', 'Lo que $f$ hacía en 0 ahora sale cuando $x+2=0$, en $x=-2$: a la izquierda.', 'ما كانت تفعله $f$ عند 0 يظهر الآن عندما $x+2=0$، أي عند $x=-2$: إلى اليسار.', 'What $f$ did at 0 now happens when $x+2=0$, at $x=-2$: to the left.')
        }
    },
    reflections: {
        mistake: {
            wrong: say('$y=-x^2$ funtzioa $y=x^2$ da, Y ardatzean islatuta.', '$y=-x^2$ es $y=x^2$ reflejada en el eje Y.', '$y=-x^2$ هي انعكاس $y=x^2$ في محور Y.', '$y=-x^2$ is $y=x^2$ reflected in the y-axis.'),
            right: say('Kanpoko zeinuak $y$ balioak aldatzen ditu: X ardatzarekiko islapena da. Y ardatzean, $(-x)^2=x^2$, eta ez da ezer aldatzen.', 'El signo de fuera cambia las $y$: es la reflexión en el eje X. En el eje Y, $(-x)^2=x^2$, y no cambia nada.', 'الإشارة الخارجية تغيّر قيم $y$: إنه انعكاس في محور X. أما في محور Y فإن $(-x)^2=x^2$ ولا يتغير شيء.', 'The sign outside changes the $y$ values: it is the reflection in the x-axis. In the y-axis, $(-x)^2=x^2$, and nothing changes.')
        },
        check: {
            prompt: say('$y=f(x)$ grafikoa $(4,-1)$ puntutik pasatzen da. Zein puntutatik pasatzen da $y=f(-x)$?', 'La gráfica de $y=f(x)$ pasa por $(4,-1)$. ¿Por qué punto pasa $y=f(-x)$?', 'يمر رسم $y=f(x)$ بالنقطة $(4,-1)$. بأي نقطة يمر $y=f(-x)$؟', 'The graph of $y=f(x)$ passes through $(4,-1)$. Which point does $y=f(-x)$ pass through?'),
            options: [same('$(4,1)$'), same('$(-4,-1)$'), same('$(-4,1)$')],
            correctIndex: 1,
            explanation: say('$f(-x)$ adierazpenean $x$ zeinuz aldatzen da: $x=-4$ denean, $f(4)=-1$ kalkulatzen da.', 'En $f(-x)$ cambia el signo de $x$: con $x=-4$ se calcula $f(4)=-1$.', 'في $f(-x)$ تتغير إشارة $x$: مع $x=-4$ نحسب $f(4)=-1$.', 'In $f(-x)$ the sign of $x$ changes: with $x=-4$ you work out $f(4)=-1$.')
        }
    },
    stretch: {
        mistake: {
            wrong: say('$y=f(2x)$ funtzioak grafikoa bi aldiz zabalago egiten du.', '$y=f(2x)$ estira la gráfica al doble de ancho.', '$y=f(2x)$ تمدّد الرسم إلى ضعف عرضه.', '$y=f(2x)$ stretches the graph to twice its width.'),
            right: say('Estutu egiten du: $f$ funtzioak $x=4$ puntuan zuena orain $x=2$ puntuan ateratzen da.', 'La comprime: lo que $f$ hacía en $x=4$ ahora sale en $x=2$.', 'بل تقلّصه: ما كانت تفعله $f$ عند $x=4$ يظهر الآن عند $x=2$.', 'It squeezes it: what $f$ did at $x=4$ now happens at $x=2$.')
        },
        check: {
            prompt: say('$y=f(x)$ grafikoa $(6,2)$ puntutik pasatzen da. Zein puntu dago $y=f(3x)$ grafikoan?', 'La gráfica de $y=f(x)$ pasa por $(6,2)$. ¿Qué punto está en la gráfica de $y=f(3x)$?', 'يمر رسم $y=f(x)$ بالنقطة $(6,2)$. أي نقطة تقع على رسم $y=f(3x)$؟', 'The graph of $y=f(x)$ passes through $(6,2)$. Which point lies on the graph of $y=f(3x)$?'),
            options: [same('$(18,2)$'), same('$(2,2)$'), same('$(6,6)$')],
            correctIndex: 1,
            explanation: say('$x=2$ denean, $f(3\\cdot 2)=f(6)=2$.', 'Con $x=2$, $f(3\\cdot 2)=f(6)=2$.', 'مع $x=2$ يكون $f(3\\cdot 2)=f(6)=2$.', 'With $x=2$, $f(3\\cdot 2)=f(6)=2$.')
        }
    },

    /* ---------- 3. The inverse function ---------- */
    'inverse-function': {
        mistake: {
            wrong: same('$f(x)=x+4\\ \\to\\ f^{-1}(x)=\\frac{1}{x+4}$'),
            right: say('$f^{-1}$ funtzioak $f$ desegiten du: 4 kentzen du, $f^{-1}(x)=x-4$. $\\frac{1}{f(x)}$ beste gauza bat da.', '$f^{-1}$ deshace lo que hace $f$: resta 4, $f^{-1}(x)=x-4$. $\\frac{1}{f(x)}$ es otra cosa.', '$f^{-1}$ تعكس ما تفعله $f$: تطرح 4، $f^{-1}(x)=x-4$. أما $\\frac{1}{f(x)}$ فشيء آخر.', '$f^{-1}$ undoes what $f$ does: it subtracts 4, $f^{-1}(x)=x-4$. $\\frac{1}{f(x)}$ is something else.')
        },
        check: {
            prompt: say('Zein da $f(x)=x^3-2$ funtzioaren alderantzizkoa?', '¿Cuál es la inversa de $f(x)=x^3-2$?', 'ما الدالة العكسية للدالة $f(x)=x^3-2$؟', 'What is the inverse of $f(x)=x^3-2$?'),
            options: [same('$\\frac{1}{x^3-2}$'), same('$\\sqrt[3]{x+2}$'), same('$\\sqrt[3]{x}+2$')],
            correctIndex: 1,
            explanation: say('Idatzi $y=x^3-2$ eta askatu $x$: $x=\\sqrt[3]{y+2}$. Gero trukatu $x$ eta $y$.', 'Escribe $y=x^3-2$ y despeja $x$: $x=\\sqrt[3]{y+2}$. Después cambia $x$ por $y$.', 'اكتب $y=x^3-2$ واعزل $x$: $x=\\sqrt[3]{y+2}$. ثم بدّل $x$ و$y$.', 'Write $y=x^3-2$ and solve for $x$: $x=\\sqrt[3]{y+2}$. Then swap $x$ and $y$.')
        }
    },
    'inverse-graph': {
        mistake: {
            wrong: say('$y=x^2$ funtzioaren alderantzizkoa $y=\\pm\\sqrt{x}$ da.', 'La inversa de $y=x^2$ es $y=\\pm\\sqrt{x}$.', 'الدالة العكسية للدالة $y=x^2$ هي $y=\\pm\\sqrt{x}$.', 'The inverse of $y=x^2$ is $y=\\pm\\sqrt{x}$.'),
            right: say('$\\pm\\sqrt{x}$ adierazpenak bi balio ematen ditu: ez da funtzioa. Adar bat aukeratu behar da: $y=\\sqrt{x}$, $x\\ge 0$ adarrarentzat.', '$\\pm\\sqrt{x}$ da dos valores: no es una función. Hay que elegir una rama: $y=\\sqrt{x}$ para la rama $x\\ge 0$.', '$\\pm\\sqrt{x}$ تعطي قيمتين: فهي ليست دالة. يجب اختيار فرع: $y=\\sqrt{x}$ للفرع $x\\ge 0$.', '$\\pm\\sqrt{x}$ gives two values: it is not a function. You have to choose a branch: $y=\\sqrt{x}$ for the branch $x\\ge 0$.')
        },
        check: {
            prompt: say('Funtzio hauetatik, zeinek du alderantzizkoa $\\mathbb{R}$ osoan?', '¿Cuál de estas funciones tiene inversa en todo $\\mathbb{R}$?', 'أي هذه الدوال لها دالة عكسية على كل $\\mathbb{R}$؟', 'Which of these functions has an inverse on the whole of $\\mathbb{R}$?'),
            options: [same('$y=x^2$'), same('$y=|x|$'), same('$y=x^3$')],
            correctIndex: 2,
            explanation: say('$y=x^3$ beti gorakorra da: zuzen horizontal bakoitzak behin bakarrik mozten du. $x^2$ eta $|x|$ funtzioetan, $f(-1)=f(1)$.', '$y=x^3$ siempre crece: cada recta horizontal la corta una sola vez. En $x^2$ y en $|x|$, $f(-1)=f(1)$.', '$y=x^3$ متزايدة دائمًا: يقطعها كل مستقيم أفقي مرة واحدة. أما في $x^2$ وفي $|x|$ فإن $f(-1)=f(1)$.', '$y=x^3$ always increases: each horizontal line cuts it only once. For $x^2$ and $|x|$, $f(-1)=f(1)$.')
        }
    },
    'exp-log': {
        mistake: {
            wrong: say('$y=0{,}5^x$ gorakorra da, esponentziala delako.', '$y=0{,}5^x$ es creciente porque es exponencial.', '$y=0{,}5^x$ متزايدة لأنها أسية.', '$y=0{,}5^x$ is increasing because it is exponential.'),
            right: say('Oinarria 0 eta 1 artean dagoenean, beherakorra da: $0{,}5^1=0{,}5$ eta $0{,}5^2=0{,}25$.', 'Con base entre 0 y 1 es decreciente: $0{,}5^1=0{,}5$ y $0{,}5^2=0{,}25$.', 'إذا كان الأساس بين 0 و1 فهي متناقصة: $0{,}5^1=0{,}5$ و$0{,}5^2=0{,}25$.', 'With a base between 0 and 1 it is decreasing: $0{,}5^1=0{,}5$ and $0{,}5^2=0{,}25$.')
        },
        check: {
            prompt: say('Zein da $y=5^x$ funtzioaren alderantzizkoa?', '¿Cuál es la inversa de $y=5^x$?', 'ما الدالة العكسية للدالة $y=5^x$؟', 'What is the inverse of $y=5^x$?'),
            options: [same('$\\log_5 x$'), same('$\\frac{1}{5^x}$'), same('$\\sqrt[5]{x}$')],
            correctIndex: 0,
            explanation: say('$y=5^x$ bada, $x=\\log_5 y$; $x$ eta $y$ trukatuta, $y=\\log_5 x$.', 'Si $y=5^x$, entonces $x=\\log_5 y$; al cambiar $x$ por $y$, $y=\\log_5 x$.', 'إذا كان $y=5^x$ فإن $x=\\log_5 y$، وبتبديل $x$ و$y$ نجد $y=\\log_5 x$.', 'If $y=5^x$, then $x=\\log_5 y$; swapping $x$ and $y$, $y=\\log_5 x$.')
        }
    },
    arc: {
        mistake: {
            wrong: same('$\\arccos\\left(-\\frac{1}{2}\\right)=-\\frac{\\pi}{3}$'),
            right: say('Arku kosinua 0 eta $\\pi$ artean dago, eta $\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$: $\\arccos\\left(-\\frac{1}{2}\\right)=\\frac{2\\pi}{3}$.', 'El arco coseno está entre 0 y $\\pi$, y $\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$: $\\arccos\\left(-\\frac{1}{2}\\right)=\\frac{2\\pi}{3}$.', 'قوس جيب التمام بين 0 و$\\pi$، و$\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$: إذن $\\arccos\\left(-\\frac{1}{2}\\right)=\\frac{2\\pi}{3}$.', 'The arc cosine lies between 0 and $\\pi$, and $\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$: $\\arccos\\left(-\\frac{1}{2}\\right)=\\frac{2\\pi}{3}$.')
        },
        check: {
            prompt: say('Zenbat da $\\arcsin\\left(\\sin\\frac{5\\pi}{6}\\right)$?', '¿Cuánto vale $\\arcsin\\left(\\sin\\frac{5\\pi}{6}\\right)$?', 'كم يساوي $\\arcsin\\left(\\sin\\frac{5\\pi}{6}\\right)$؟', 'What is $\\arcsin\\left(\\sin\\frac{5\\pi}{6}\\right)$?'),
            options: [same('$\\frac{5\\pi}{6}$'), same('$\\frac{\\pi}{6}$'), same('$-\\frac{\\pi}{6}$')],
            correctIndex: 1,
            explanation: say('$\\sin\\frac{5\\pi}{6}=\\frac{1}{2}$, eta $-\\frac{\\pi}{2}$ eta $\\frac{\\pi}{2}$ artean, sinua $\\frac{1}{2}$ duen angelua $\\frac{\\pi}{6}$ da.', '$\\sin\\frac{5\\pi}{6}=\\frac{1}{2}$, y el ángulo entre $-\\frac{\\pi}{2}$ y $\\frac{\\pi}{2}$ con seno $\\frac{1}{2}$ es $\\frac{\\pi}{6}$.', '$\\sin\\frac{5\\pi}{6}=\\frac{1}{2}$، والزاوية بين $-\\frac{\\pi}{2}$ و$\\frac{\\pi}{2}$ التي جيبها $\\frac{1}{2}$ هي $\\frac{\\pi}{6}$.', '$\\sin\\frac{5\\pi}{6}=\\frac{1}{2}$, and the angle between $-\\frac{\\pi}{2}$ and $\\frac{\\pi}{2}$ whose sine is $\\frac{1}{2}$ is $\\frac{\\pi}{6}$.')
        }
    },

    /* ---------- 4. Piecewise functions ---------- */
    piecewise: {
        mistake: {
            wrong: say('Bi zatiak elkartzen diren puntuan, biak erabiltzen dira.', 'En el punto donde se juntan los trozos se usan los dos.', 'عند النقطة التي يلتقي فيها الجزآن نستعمل الاثنين.', 'At the point where the pieces meet you use both of them.'),
            right: say('$x$ bakoitzak zati bakarra erabiltzen du: mutur horretan $\\le$ edo $\\ge$ daramana.', 'Cada $x$ usa un solo trozo: el que lleva $\\le$ o $\\ge$ en ese extremo.', 'كل $x$ تستعمل جزءًا واحدًا فقط: الذي فيه $\\le$ أو $\\ge$ عند ذلك الطرف.', 'Each $x$ uses a single piece: the one with $\\le$ or $\\ge$ at that end.')
        },
        check: {
            prompt: say('$f(x)=2x$ da $x<1$ denean, eta $f(x)=5$ da $x\\ge 1$ denean. Zenbat da $f(1)$?', 'Si $f(x)=2x$ para $x<1$ y $f(x)=5$ para $x\\ge 1$, ¿cuánto vale $f(1)$?', 'إذا كانت $f(x)=2x$ عندما $x<1$ و$f(x)=5$ عندما $x\\ge 1$، فكم تساوي $f(1)$؟', 'If $f(x)=2x$ for $x<1$ and $f(x)=5$ for $x\\ge 1$, what is $f(1)$?'),
            options: [same('$2$'), same('$5$'), same('$7$')],
            correctIndex: 1,
            explanation: say('$x=1$ balioa $x\\ge 1$ zatian dago: $f(1)=5$.', '$x=1$ está en el trozo $x\\ge 1$: $f(1)=5$.', '$x=1$ تقع في الجزء $x\\ge 1$: $f(1)=5$.', '$x=1$ is in the piece $x\\ge 1$: $f(1)=5$.')
        }
    },
    absolute: {
        mistake: {
            wrong: say('$y=|f(x)|$ eta $y=f(|x|)$ grafiko bera dira.', '$y=|f(x)|$ y $y=f(|x|)$ son la misma gráfica.', '$y=|f(x)|$ و$y=f(|x|)$ رسم واحد.', '$y=|f(x)|$ and $y=f(|x|)$ are the same graph.'),
            right: say('$|f(x)|$ funtzioak X ardatzaren azpian dagoena gora tolesten du; $f(|x|)$ funtzioak eskuineko zatia ezkerrera kopiatzen du.', '$|f(x)|$ dobla hacia arriba lo que queda bajo el eje X; $f(|x|)$ copia la parte de la derecha a la izquierda.', '$|f(x)|$ تطوي إلى الأعلى ما تحت محور X، أما $f(|x|)$ فتنسخ الجزء الأيمن إلى اليسار.', '$|f(x)|$ folds up what lies below the x-axis; $f(|x|)$ copies the right-hand part to the left.')
        },
        check: {
            prompt: say('Nola idazten da $y=|x^2-4x|$ funtzioa $0<x<4$ tartean?', '¿Cómo se escribe $y=|x^2-4x|$ en el tramo $0<x<4$?', 'كيف تُكتب $y=|x^2-4x|$ في المجال $0<x<4$؟', 'How is $y=|x^2-4x|$ written on the stretch $0<x<4$?'),
            options: [same('$x^2-4x$'), same('$-x^2+4x$'), same('$x^2+4x$')],
            correctIndex: 1,
            explanation: say('Han $x^2-4x<0$ da (adibidez, $x=1$ denean, $-3$); beraz, zeinua aldatzen zaio: $-x^2+4x$.', 'Ahí $x^2-4x<0$ (con $x=1$ da $-3$), así que se le cambia el signo: $-x^2+4x$.', 'هناك $x^2-4x<0$ (مع $x=1$ تساوي $-3$)، لذا نغيّر إشارتها: $-x^2+4x$.', 'There $x^2-4x<0$ (with $x=1$ it is $-3$), so its sign is changed: $-x^2+4x$.')
        }
    },
    floor: {
        mistake: {
            wrong: same('$E(-3{,}2)=-3$'),
            right: say('$E$ funtzioak beherantz biribiltzen du: $-4\\le -3{,}2<-3$; beraz, $E(-3{,}2)=-4$.', '$E$ redondea hacia abajo: $-4\\le -3{,}2<-3$, así que $E(-3{,}2)=-4$.', 'الدالة $E$ تقرّب إلى الأسفل: $-4\\le -3{,}2<-3$، إذن $E(-3{,}2)=-4$.', '$E$ rounds down: $-4\\le -3{,}2<-3$, so $E(-3{,}2)=-4$.')
        },
        check: {
            prompt: say('Zenbat da $E(-1{,}5)$?', '¿Cuánto vale $E(-1{,}5)$?', 'كم يساوي $E(-1{,}5)$؟', 'What is $E(-1{,}5)$?'),
            options: [same('$-1$'), same('$-2$'), same('$2$')],
            correctIndex: 1,
            explanation: say('$-2\\le -1{,}5<-1$: $-1{,}5$ zenbakiaren azpiko osoa $-2$ da.', '$-2\\le -1{,}5<-1$: el entero que queda por debajo de $-1{,}5$ es $-2$.', '$-2\\le -1{,}5<-1$: العدد الصحيح الذي تحت $-1{,}5$ هو $-2$.', '$-2\\le -1{,}5<-1$: the integer just below $-1{,}5$ is $-2$.')
        }
    },

    /* ---------- 5. Operations and composition ---------- */
    operations: {
        mistake: {
            wrong: say('$\\frac{f}{g}$ funtzioaren izate-eremua $f$ eta $g$ funtzioen izate-eremuen ebakidura da, besterik gabe.', 'El dominio de $\\frac{f}{g}$ es la intersección de los dominios de $f$ y $g$, sin más.', 'مجال $\\frac{f}{g}$ هو تقاطع مجالي $f$ و$g$ فقط.', 'The domain of $\\frac{f}{g}$ is just the intersection of the domains of $f$ and $g$.'),
            right: say('Gainera, $g$ funtzioaren zeroak kendu behar dira: $g(x)=x-5$ bada, 5 zenbakia ez dago izate-eremuan.', 'Además hay que quitar los ceros de $g$: si $g(x)=x-5$, el 5 no está en el dominio.', 'ويجب أيضًا حذف أصفار $g$: إذا كانت $g(x)=x-5$ فإن 5 ليس في المجال.', 'You also have to remove the zeros of $g$: if $g(x)=x-5$, 5 is not in the domain.')
        },
        check: {
            prompt: say('$f(x)=x+1$ eta $g(x)=x^2-4$ badira, zein da $\\frac{f}{g}$ funtzioaren izate-eremua?', 'Si $f(x)=x+1$ y $g(x)=x^2-4$, ¿cuál es el dominio de $\\frac{f}{g}$?', 'إذا كانت $f(x)=x+1$ و$g(x)=x^2-4$، فما مجال $\\frac{f}{g}$؟', 'If $f(x)=x+1$ and $g(x)=x^2-4$, what is the domain of $\\frac{f}{g}$?'),
            options: [same('$\\mathbb{R}-\\{-1\\}$'), same('$\\mathbb{R}$'), same('$\\mathbb{R}-\\{-2,2\\}$')],
            correctIndex: 2,
            explanation: say('$g(x)=0$ da $x=\\pm 2$ denean: han zatidurarik ez dago. $f(x)=0$ izateak ez du ezer kentzen.', '$g(x)=0$ cuando $x=\\pm 2$: ahí el cociente no existe. Que $f(x)=0$ no quita nada.', '$g(x)=0$ عندما $x=\\pm 2$: هناك لا يوجد خارج القسمة. أما كون $f(x)=0$ فلا يحذف شيئًا.', '$g(x)=0$ when $x=\\pm 2$: there the quotient does not exist. $f(x)=0$ removes nothing.')
        }
    },
    composition: {
        mistake: {
            wrong: say('$(f\\circ g)(x)$: lehenik $f$, eta gero $g$.', '$(f\\circ g)(x)$: primero $f$ y después $g$.', '$(f\\circ g)(x)$: أولًا $f$ ثم $g$.', '$(f\\circ g)(x)$: first $f$, then $g$.'),
            right: say('Eskuinetik ezkerrera irakurtzen da: $(f\\circ g)(x)=f(g(x))$, lehenik $g$.', 'Se lee de derecha a izquierda: $(f\\circ g)(x)=f(g(x))$, primero $g$.', 'تُقرأ من اليمين إلى اليسار: $(f\\circ g)(x)=f(g(x))$، أولًا $g$.', 'It is read from right to left: $(f\\circ g)(x)=f(g(x))$, first $g$.')
        },
        check: {
            prompt: say('$f(x)=2x$ eta $g(x)=x-1$ badira, zenbat da $(f\\circ g)(5)$?', 'Si $f(x)=2x$ y $g(x)=x-1$, ¿cuánto vale $(f\\circ g)(5)$?', 'إذا كانت $f(x)=2x$ و$g(x)=x-1$، فكم يساوي $(f\\circ g)(5)$؟', 'If $f(x)=2x$ and $g(x)=x-1$, what is $(f\\circ g)(5)$?'),
            options: [same('$9$'), same('$8$'), same('$10$')],
            correctIndex: 1,
            explanation: say('$g(5)=4$, eta $f(4)=8$. Alderantziz, $(g\\circ f)(5)=g(10)=9$.', '$g(5)=4$ y $f(4)=8$. Al revés, $(g\\circ f)(5)=g(10)=9$.', '$g(5)=4$ و$f(4)=8$. وبالعكس $(g\\circ f)(5)=g(10)=9$.', '$g(5)=4$ and $f(4)=8$. The other way round, $(g\\circ f)(5)=g(10)=9$.')
        }
    }
}

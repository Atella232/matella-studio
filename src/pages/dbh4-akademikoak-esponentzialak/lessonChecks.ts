import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Funtzio esponentzialak, logaritmikoak eta trigonometrikoak · 4. DBH
   akademikoak — the typical mistake and the «Check it» question of every
   lesson. Plain data (no JSX) so the tests can import it; lessons.tsx
   merges it into the topics through localizeNames (\sin and \tan become
   each language's names).
   ========================================================================== */

export type ExponentialAkTopicId = 'exp-graph' | 'exp-values' | 'exp-shifts' | 'growth' | 'decay' | 'exp-equations' | 'log-values' | 'log-graph' | 'log-shifts' | 'trig-values' | 'sine' | 'cosine' | 'amplitude' | 'period' | 'tangent'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const exponentialAkLessonChecks: Record<ExponentialAkTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'exp-graph': {
        mistake: {
            wrong: same('$2^{-3}=-8$'),
            right: say('Berretzaile negatibo batek alderantzizkoa ematen du, ez negatibo bat: $2^{-3}=\\frac{1}{8}$. $y=a^{x}$ beti positiboa da.', 'Un exponente negativo da el inverso, no un negativo: $2^{-3}=\\frac{1}{8}$. $y=a^{x}$ siempre es positiva.', 'الأس السالب يعطي المقلوب لا عددًا سالبًا: $2^{-3}=\\frac{1}{8}$. و$y=a^{x}$ موجبة دائمًا.', 'A negative exponent gives the reciprocal, not a negative number: $2^{-3}=\\frac{1}{8}$. $y=a^{x}$ is always positive.')
        },
        check: {
            prompt: say('Zein puntu dute komunean $y=2^{x}$ eta $y=5^{x}$ funtzioek?', '¿Qué punto tienen en común $y=2^{x}$ e $y=5^{x}$?', 'ما النقطة المشتركة بين $y=2^{x}$ و$y=5^{x}$؟', 'Which point do $y=2^{x}$ and $y=5^{x}$ have in common?'),
            options: [same('$(0,\\,1)$'), same('$(1,\\,0)$'), same('$(1,\\,1)$')],
            correctIndex: 0,
            explanation: same('$2^{0}=5^{0}=1$')
        }
    },
    'exp-values': {
        mistake: {
            wrong: same('$8^{\\frac{1}{3}}=\\frac{8}{3}$'),
            right: say('$\\frac{1}{3}$ berretzailea erro kubikoa da: $8^{\\frac{1}{3}}=\\sqrt[3]{8}=2$.', 'El exponente $\\frac{1}{3}$ es una raíz cúbica: $8^{\\frac{1}{3}}=\\sqrt[3]{8}=2$.', 'الأس $\\frac{1}{3}$ جذر تكعيبي: $8^{\\frac{1}{3}}=\\sqrt[3]{8}=2$.', 'The exponent $\\frac{1}{3}$ is a cube root: $8^{\\frac{1}{3}}=\\sqrt[3]{8}=2$.')
        },
        check: {
            prompt: say('Zenbat da $16^{\\frac{3}{4}}$?', '¿Cuánto vale $16^{\\frac{3}{4}}$?', 'ما قيمة $16^{\\frac{3}{4}}$؟', 'What is $16^{\\frac{3}{4}}$?'),
            options: [same('$8$'), same('$12$'), same('$\\frac{3}{64}$')],
            correctIndex: 0,
            explanation: say('$\\sqrt[4]{16}=2$ eta $2^{3}=8$.', '$\\sqrt[4]{16}=2$ y $2^{3}=8$.', '$\\sqrt[4]{16}=2$ و$2^{3}=8$.', '$\\sqrt[4]{16}=2$ and $2^{3}=8$.')
        }
    },
    'exp-shifts': {
        mistake: {
            wrong: say('$y=2^{x}+3$ funtzioaren asintota $y=0$ da oraindik.', 'La asíntota de $y=2^{x}+3$ sigue siendo $y=0$.', 'مقارب $y=2^{x}+3$ ما زال $y=0$.', 'The asymptote of $y=2^{x}+3$ is still $y=0$.'),
            right: say('Grafikoarekin batera igotzen da: asintota $y=3$ da, eta ibiltartea, $(3,\\,+\\infty)$.', 'Sube con la gráfica: la asíntota es $y=3$ y el recorrido, $(3,\\,+\\infty)$.', 'يصعد مع الرسم: المقارب $y=3$ والمدى $(3,\\,+\\infty)$.', 'It goes up with the graph: the asymptote is $y=3$ and the range, $(3,\\,+\\infty)$.')
        },
        check: {
            prompt: say('Zein da $y=5^{x-1}-4$ funtzioaren ibiltartea?', '¿Cuál es el recorrido de $y=5^{x-1}-4$?', 'ما مدى $y=5^{x-1}-4$؟', 'What is the range of $y=5^{x-1}-4$?'),
            options: [same('$(-4,\\,+\\infty)$'), same('$(-1,\\,+\\infty)$'), same('$(4,\\,+\\infty)$')],
            correctIndex: 0,
            explanation: say('Asintota $y=-4$ puntura jaisten da; balioak haren gainean geratzen dira.', 'La asíntota baja a $y=-4$; los valores quedan por encima.', 'ينزل المقارب إلى $y=-4$، والقيم تبقى فوقه.', 'The asymptote goes down to $y=-4$; the values stay above it.')
        }
    },
    growth: {
        mistake: {
            wrong: say('Kapital bat urtean % 4 hazten bada, $C=1000\\cdot 0{,}04^{t}$.', 'Si un capital crece un 4 % al año, $C=1000\\cdot 0{,}04^{t}$.', 'إذا نما رأس مال 4 % سنويًا فإن $C=1000\\cdot 0{,}04^{t}$.', 'If a capital grows 4% a year, $C=1000\\cdot 0{,}04^{t}$.'),
            right: say('Faktorea $1+0{,}04=1{,}04$ da: $C=1000\\cdot 1{,}04^{t}$.', 'El factor es $1+0{,}04=1{,}04$: $C=1000\\cdot 1{,}04^{t}$.', 'المعامل $1+0{,}04=1{,}04$: $C=1000\\cdot 1{,}04^{t}$.', 'The factor is $1+0{,}04=1{,}04$: $C=1000\\cdot 1{,}04^{t}$.')
        },
        check: {
            prompt: say('Hiri batek biztanleen % 2 galtzen du urtero. Zenbatez biderkatzen da biztanleria urtero?', 'Una ciudad pierde un 2 % de habitantes al año. ¿Por cuánto se multiplica la población cada año?', 'مدينة تفقد 2 % من سكانها كل سنة. في كم يُضرب عدد السكان كل سنة؟', 'A town loses 2% of its people each year. What is the population multiplied by each year?'),
            options: [same('$0{,}98$'), same('$1{,}02$'), same('$0{,}02$')],
            correctIndex: 0,
            explanation: same('$1-0{,}02=0{,}98$')
        }
    },
    decay: {
        mistake: {
            wrong: say('3 urteko erdibizitzarekin, 6 urtean ez da ezer geratzen.', 'Con una semivida de 3 años, en 6 años no queda nada.', 'مع عمر نصف 3 سنوات لا يبقى شيء بعد 6 سنوات.', 'With a half-life of 3 years, nothing is left after 6 years.'),
            right: say('Erdibizitza bakoitzean erdia geratzen da: 6 urtean, hasierakoaren $\\frac{1}{4}$.', 'En cada semivida queda la mitad: en 6 años, $\\frac{1}{4}$ de lo que había.', 'في كل عمر نصف يبقى النصف: بعد 6 سنوات يبقى $\\frac{1}{4}$ مما كان.', 'Each half-life leaves half: after 6 years, $\\frac{1}{4}$ of what there was.')
        },
        check: {
            prompt: say('2 orduko erdibizitzako substantzia baten 64 g daude. Zenbat geratzen da 6 orduren buruan?', 'Hay 64 g de una sustancia de semivida 2 horas. ¿Cuánto queda a las 6 horas?', 'لدينا 64 غ من مادة عمر نصفها ساعتان. كم يبقى بعد 6 ساعات؟', 'There are 64 g of a substance with a half-life of 2 hours. How much is left after 6 hours?'),
            options: [say('8 g', '8 g', '8 غ', '8 g'), say('16 g', '16 g', '16 غ', '16 g'), say('32 g', '32 g', '32 غ', '32 g')],
            correctIndex: 0,
            explanation: same('$64\\cdot\\left(\\frac{1}{2}\\right)^{3}=8$')
        }
    },
    'exp-equations': {
        mistake: {
            wrong: say('$2^{x}=6$ ekuazioan $x=3$, $6=2\\cdot 3$ delako.', 'En $2^{x}=6$, $x=3$, porque $6=2\\cdot 3$.', 'في $2^{x}=6$ يكون $x=3$ لأن $6=2\\cdot 3$.', 'In $2^{x}=6$, $x=3$, because $6=2\\cdot 3$.'),
            right: say('$2^{3}=8$ da, ez 6. Ez dago oinarri komunik: $x=\\frac{\\log 6}{\\log 2}\\approx 2{,}58$.', '$2^{3}=8$, no 6. No hay base común: $x=\\frac{\\log 6}{\\log 2}\\approx 2{,}58$.', '$2^{3}=8$ لا 6. لا يوجد أساس مشترك: $x=\\frac{\\log 6}{\\log 2}\\approx 2{,}58$.', '$2^{3}=8$, not 6. There is no common base: $x=\\frac{\\log 6}{\\log 2}\\approx 2{,}58$.')
        },
        check: {
            prompt: say('Ebatzi $5^{x}=125$.', 'Resuelve $5^{x}=125$.', 'حُلّ $5^{x}=125$.', 'Solve $5^{x}=125$.'),
            options: [same('$x=3$'), same('$x=25$'), same('$x=5$')],
            correctIndex: 0,
            explanation: same('$125=5^{3}$')
        }
    },
    'log-values': {
        mistake: {
            wrong: say('$\\log_2 8=4$, $8\\div 2=4$ delako.', '$\\log_2 8=4$, porque $8\\div 2=4$.', '$\\log_2 8=4$ لأن $8\\div 2=4$.', '$\\log_2 8=4$, because $8\\div 2=4$.'),
            right: say('Logaritmoa berretzaile bat da: $2^{3}=8$; beraz, $\\log_2 8=3$.', 'El logaritmo es un exponente: $2^{3}=8$, así que $\\log_2 8=3$.', 'اللوغاريتم أس: $2^{3}=8$، إذن $\\log_2 8=3$.', 'The logarithm is an exponent: $2^{3}=8$, so $\\log_2 8=3$.')
        },
        check: {
            prompt: say('Zenbat da $\\log_3 81$?', '¿Cuánto vale $\\log_3 81$?', 'ما قيمة $\\log_3 81$؟', 'What is $\\log_3 81$?'),
            options: [same('$4$'), same('$27$'), same('$3$')],
            correctIndex: 0,
            explanation: same('$3^{4}=81$')
        }
    },
    'log-graph': {
        mistake: {
            wrong: say('$y=\\log_2 x$ funtzioaren izate-eremua $\\mathbb{R}$ da, $y=2^{x}$ funtzioarena bezala.', 'El dominio de $y=\\log_2 x$ es $\\mathbb{R}$, como el de $y=2^{x}$.', 'مجال $y=\\log_2 x$ هو $\\mathbb{R}$ مثل مجال $y=2^{x}$.', 'The domain of $y=\\log_2 x$ is $\\mathbb{R}$, like that of $y=2^{x}$.'),
            right: say('Trukatu egiten dira: Dom $f=(0,\\,+\\infty)$, $y=2^{x}$ funtzioaren ibiltartea. Negatiboek eta 0 zenbakiak ez dute logaritmorik.', 'Se intercambian: Dom $f=(0,\\,+\\infty)$, el recorrido de $y=2^{x}$. Los negativos y el 0 no tienen logaritmo.', 'يتبادلان: Dom $f=(0,\\,+\\infty)$ وهو مدى $y=2^{x}$. والأعداد السالبة و0 ليس لها لوغاريتم.', 'They swap: Dom $f=(0,\\,+\\infty)$, the range of $y=2^{x}$. Negative numbers and 0 have no logarithm.')
        },
        check: {
            prompt: say('5 oinarriko esponentziala $(2,\\,25)$ puntutik pasatzen da. Zein puntutik pasatzen da $y=\\log_5 x$?', 'La exponencial de base 5 pasa por $(2,\\,25)$. ¿Por qué punto pasa $y=\\log_5 x$?', 'الدالة الأسية للأساس 5 تمر بـ $(2,\\,25)$. بأي نقطة تمر $y=\\log_5 x$؟', 'The exponential with base 5 goes through $(2,\\,25)$. Which point is $y=\\log_5 x$ on?'),
            options: [same('$(25,\\,2)$'), same('$(2,\\,25)$'), same('$(5,\\,2)$')],
            correctIndex: 0,
            explanation: say('$\\log_5 25=2$: koordenatuak trukatzen dira.', '$\\log_5 25=2$: las coordenadas se intercambian.', '$\\log_5 25=2$: يتبادل الإحداثيان.', '$\\log_5 25=2$: the coordinates swap.')
        }
    },
    'log-shifts': {
        mistake: {
            wrong: say('$y=\\log(x-4)$ funtzioaren izate-eremua $(0,\\,+\\infty)$ da.', 'El dominio de $y=\\log(x-4)$ es $(0,\\,+\\infty)$.', 'مجال $y=\\log(x-4)$ هو $(0,\\,+\\infty)$.', 'The domain of $y=\\log(x-4)$ is $(0,\\,+\\infty)$.'),
            right: say('Barrukoak positiboa izan behar du: $x-4>0$, Dom $f=(4,\\,+\\infty)$.', 'Lo de dentro tiene que ser positivo: $x-4>0$, Dom $f=(4,\\,+\\infty)$.', 'يجب أن يكون ما بالداخل موجبًا: $x-4>0$، Dom $f=(4,\\,+\\infty)$.', 'What is inside must be positive: $x-4>0$, Dom $f=(4,\\,+\\infty)$.')
        },
        check: {
            prompt: say('Zein $x$ balioan dago $y=\\log_2(x+5)-1$ funtzioaren asintota bertikala?', '¿En qué valor de $x$ está la asíntota vertical de $y=\\log_2(x+5)-1$?', 'عند أي قيمة لـ $x$ يقع المقارب الرأسي لـ $y=\\log_2(x+5)-1$؟', 'At which value of $x$ is the vertical asymptote of $y=\\log_2(x+5)-1$?'),
            options: [same('$-5$'), same('$5$'), same('$-1$')],
            correctIndex: 0,
            explanation: say('Barrukoa $-5$ balioan anulatzen da; Dom $f=(-5,\\,+\\infty)$.', 'Lo de dentro se anula en $-5$; Dom $f=(-5,\\,+\\infty)$.', 'ما بالداخل ينعدم عند $-5$؛ Dom $f=(-5,\\,+\\infty)$.', 'What is inside is 0 at $-5$; Dom $f=(-5,\\,+\\infty)$.')
        }
    },
    'trig-values': {
        mistake: {
            wrong: say('$\\cos\\pi=1$, $\\pi$ bira bat delako.', '$\\cos\\pi=1$, porque $\\pi$ es una vuelta.', '$\\cos\\pi=1$ لأن $\\pi$ دورة كاملة.', '$\\cos\\pi=1$, because $\\pi$ is a full turn.'),
            right: say('Bira bat $2\\pi$ da; $\\pi$ bira erdia da, $(-1,\\,0)$ puntua: $\\cos\\pi=-1$.', 'Una vuelta es $2\\pi$; $\\pi$ es media vuelta, el punto $(-1,\\,0)$: $\\cos\\pi=-1$.', 'الدورة $2\\pi$؛ و$\\pi$ نصف دورة، النقطة $(-1,\\,0)$: $\\cos\\pi=-1$.', 'A full turn is $2\\pi$; $\\pi$ is half a turn, the point $(-1,\\,0)$: $\\cos\\pi=-1$.')
        },
        check: {
            prompt: say('Zenbat gradu dira $\\frac{3\\pi}{4}$ rad?', '¿Cuántos grados son $\\frac{3\\pi}{4}$ rad?', 'كم درجة تساوي $\\frac{3\\pi}{4}$ rad؟', 'How many degrees is $\\frac{3\\pi}{4}$ rad?'),
            options: [same('$135°$'), same('$270°$'), same('$45°$')],
            correctIndex: 0,
            explanation: same('$\\frac{3\\cdot 180°}{4}=135°$')
        }
    },
    sine: {
        mistake: {
            wrong: say('$y=\\sin x$ funtzioaren ibiltartea $\\mathbb{R}$ da, angelu guztietarako definituta dagoelako.', 'El recorrido de $y=\\sin x$ es $\\mathbb{R}$, porque está definida para todo ángulo.', 'مدى $y=\\sin x$ هو $\\mathbb{R}$ لأنها معرّفة لكل زاوية.', 'The range of $y=\\sin x$ is $\\mathbb{R}$, because it is defined for every angle.'),
            right: say('Hori izate-eremua da. Balioak $-1$ eta 1 artean daude: Rec $f=[-1,\\,1]$.', 'Eso es el dominio. Los valores están entre $-1$ y 1: Rec $f=[-1,\\,1]$.', 'ذلك هو المجال. والقيم بين $-1$ و1: Rec $f=[-1,\\,1]$.', 'That is the domain. The values lie between $-1$ and 1: Rec $f=[-1,\\,1]$.')
        },
        check: {
            prompt: say('Zenbat zero ditu $y=\\sin x$ funtzioak $[0,\\,2\\pi]$ tartean?', '¿Cuántos ceros tiene $y=\\sin x$ en $[0,\\,2\\pi]$?', 'كم صفرًا لـ $y=\\sin x$ في $[0,\\,2\\pi]$؟', 'How many zeros does $y=\\sin x$ have on $[0,\\,2\\pi]$?'),
            options: [same('$2$'), same('$3$'), same('$1$')],
            correctIndex: 1,
            explanation: say('$0$, $\\pi$ eta $2\\pi$.', '$0$, $\\pi$ y $2\\pi$.', '$0$ و$\\pi$ و$2\\pi$.', '$0$, $\\pi$ and $2\\pi$.')
        }
    },
    cosine: {
        mistake: {
            wrong: say('$\\cos 0=0$, $\\sin 0$ bezala.', '$\\cos 0=0$, como $\\sin 0$.', '$\\cos 0=0$ مثل $\\sin 0$.', '$\\cos 0=0$, like $\\sin 0$.'),
            right: say('Kosinua abszisa da: 0 angeluak $(1,\\,0)$ puntua ematen du; beraz, $\\cos 0=1$.', 'El coseno es la abscisa: el ángulo 0 da el punto $(1,\\,0)$, así que $\\cos 0=1$.', 'جيب التمام هو الفاصلة: الزاوية 0 تعطي النقطة $(1,\\,0)$، إذن $\\cos 0=1$.', 'The cosine is the x-coordinate: the angle 0 gives the point $(1,\\,0)$, so $\\cos 0=1$.')
        },
        check: {
            prompt: say('Berdintza hauetatik, zein da egia?', '¿Cuál de estas igualdades es verdadera?', 'أيّ هذه المساويات صحيحة؟', 'Which of these equalities is true?'),
            options: [same('$\\cos(-x)=\\cos x$'), same('$\\cos(-x)=-\\cos x$'), same('$\\cos x=\\sin x$')],
            correctIndex: 0,
            explanation: say('Kosinua bikoitia da: grafikoa Y ardatzarekiko simetrikoa da.', 'El coseno es par: su gráfica es simétrica respecto del eje Y.', 'جيب التمام زوجي: رسمه متناظر حول محور Y.', 'The cosine is even: its graph is symmetric about the Y axis.')
        }
    },
    amplitude: {
        mistake: {
            wrong: say('$y=-4\\cos x$ funtzioaren anplitudea $-4$ da.', 'La amplitud de $y=-4\\cos x$ es $-4$.', 'سعة $y=-4\\cos x$ هي $-4$.', 'The amplitude of $y=-4\\cos x$ is $-4$.'),
            right: say('Anplitudea $|A|=4$ da: zeinuak grafikoa iraultzen du bakarrik. Ibiltartea, $[-4,\\,4]$.', 'La amplitud es $|A|=4$: el signo solo da la vuelta a la gráfica. Recorrido $[-4,\\,4]$.', 'السعة $|A|=4$: الإشارة تقلب الرسم فقط. والمدى $[-4,\\,4]$.', 'The amplitude is $|A|=4$: the sign only turns the graph upside down. Range $[-4,\\,4]$.')
        },
        check: {
            prompt: say('Zein da $y=3\\cos x+1$ funtzioaren ibiltartea?', '¿Cuál es el recorrido de $y=3\\cos x+1$?', 'ما مدى $y=3\\cos x+1$؟', 'What is the range of $y=3\\cos x+1$?'),
            options: [same('$[-2,\\,4]$'), same('$[-3,\\,3]$'), same('$[1,\\,4]$')],
            correctIndex: 0,
            explanation: same('$1-3=-2\\qquad 1+3=4$')
        }
    },
    period: {
        mistake: {
            wrong: say('$y=\\sin 3x$ funtzioaren periodoa $6\\pi$ da.', 'El periodo de $y=\\sin 3x$ es $6\\pi$.', 'دور $y=\\sin 3x$ هو $6\\pi$.', 'The period of $y=\\sin 3x$ is $6\\pi$.'),
            right: say('$x$ biderkatzean, uhinak estutu egiten dira: $T=\\frac{2\\pi}{3}$.', 'Al multiplicar $x$, las ondas se aprietan: $T=\\frac{2\\pi}{3}$.', 'عند ضرب $x$ تتقارب الموجات: $T=\\frac{2\\pi}{3}$.', 'Multiplying $x$ squeezes the waves: $T=\\frac{2\\pi}{3}$.')
        },
        check: {
            prompt: say('$y=\\sin kx$ funtzioaren periodoa $\\frac{\\pi}{2}$ bada, zenbat da $k$?', 'Si el periodo de $y=\\sin kx$ es $\\frac{\\pi}{2}$, ¿cuánto vale $k$?', 'إذا كان دور $y=\\sin kx$ هو $\\frac{\\pi}{2}$ فما قيمة $k$؟', 'If the period of $y=\\sin kx$ is $\\frac{\\pi}{2}$, what is $k$?'),
            options: [same('$4$'), same('$2$'), same('$\\frac{1}{4}$')],
            correctIndex: 0,
            explanation: same('$k=\\frac{2\\pi}{\\frac{\\pi}{2}}=4$')
        }
    },
    tangent: {
        mistake: {
            wrong: say('$y=\\tan x$ funtzioaren periodoa $2\\pi$ da, sinuarena bezala.', 'El periodo de $y=\\tan x$ es $2\\pi$, como el del seno.', 'دور $y=\\tan x$ هو $2\\pi$ مثل الجيب.', 'The period of $y=\\tan x$ is $2\\pi$, like the sine.'),
            right: say('$\\pi$ gehitzean, sinuak eta kosinuak biek aldatzen dute zeinua, eta zatidura ez da aldatzen: periodoa $\\pi$ da.', 'Al sumar $\\pi$, el seno y el coseno cambian los dos de signo y el cociente no cambia: el periodo es $\\pi$.', 'عند إضافة $\\pi$ يغيّر الجيب وجيب التمام كلاهما الإشارة فلا يتغير خارج القسمة: الدور $\\pi$.', 'Adding $\\pi$, the sine and the cosine both change sign and the quotient stays the same: the period is $\\pi$.')
        },
        check: {
            prompt: say('$x$ balio hauetatik, zeinetan du asintota bertikal bat $y=\\tan x$ funtzioak?', '¿En cuál de estos valores de $x$ tiene una asíntota vertical $y=\\tan x$?', 'عند أي من قيم $x$ هذه يكون لـ $y=\\tan x$ مقارب رأسي؟', 'At which of these values of $x$ does $y=\\tan x$ have a vertical asymptote?'),
            options: [same('$\\frac{\\pi}{2}$'), same('$\\pi$'), same('$0$')],
            correctIndex: 0,
            explanation: say('$\\cos\\frac{\\pi}{2}=0$: zatidura ez da existitzen.', '$\\cos\\frac{\\pi}{2}=0$: el cociente no existe.', '$\\cos\\frac{\\pi}{2}=0$: خارج القسمة غير موجود.', '$\\cos\\frac{\\pi}{2}=0$: the quotient does not exist.')
        }
    }
}

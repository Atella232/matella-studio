import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Funtzioak · 4. DBH aplikatuak — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The card has no drawing: a graph
   is given in words (its points and how it goes between them). A question
   that names x alone also writes another formula, so the test does not
   take that x for the calculation. Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type FunctionsTopicId = 'what-is' | 'expressions' | 'evaluate' | 'domain-graph' | 'domain-formula' | 'intercepts' | 'monotony' | 'extrema' | 'rate' | 'continuity' | 'periodicity' | 'tendency' | 'reading' | 'study' | 'modelling'

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const functionsLessonChecks: Record<FunctionsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Concept ---------- */
    'what-is': {
        mistake: {
            wrong: say('$(1,\\,3)$ eta $(2,\\,3)$: bi $x$ eta $y$ bera; beraz, ez da funtzioa.', '$(1,\\,3)$ y $(2,\\,3)$: dos $x$ con la misma $y$, así que no es función.', '$(1,\\,3)$ و$(2,\\,3)$: قيمتان لـ$x$ بالقيمة نفسها لـ$y$، إذن ليست دالة.', '$(1,\\,3)$ and $(2,\\,3)$: two values of $x$ with the same $y$, so it is not a function.'),
            right: say('$y$ bat errepika daiteke; ezin dena da $x$ batek bi $y$ izatea. Funtzioa da.', 'Una $y$ puede repetirse; lo que no puede es que una $x$ tenga dos $y$. Sí es función.', 'يمكن أن تتكرر $y$؛ أما الممنوع فأن يكون لـ$x$ واحدة قيمتان لـ$y$. إنها دالة.', 'A $y$ can repeat; what cannot happen is one $x$ with two values of $y$. It is a function.')
        },
        check: {
            prompt: say('Zein erlazio da funtzioa?', '¿Qué relación es una función?', 'أيّ علاقة دالة؟', 'Which relation is a function?'),
            options: [
                say('$(2,\\,1)$, $(2,\\,3)$, $(4,\\,5)$', '$(2,\\,1)$, $(2,\\,3)$, $(4,\\,5)$', '$(2,\\,1)$، $(2,\\,3)$، $(4,\\,5)$', '$(2,\\,1)$, $(2,\\,3)$, $(4,\\,5)$'),
                say('$(1,\\,2)$, $(2,\\,2)$, $(3,\\,2)$', '$(1,\\,2)$, $(2,\\,2)$, $(3,\\,2)$', '$(1,\\,2)$، $(2,\\,2)$، $(3,\\,2)$', '$(1,\\,2)$, $(2,\\,2)$, $(3,\\,2)$'),
                say('$(0,\\,1)$, $(1,\\,0)$, $(0,\\,-1)$', '$(0,\\,1)$, $(1,\\,0)$, $(0,\\,-1)$', '$(0,\\,1)$، $(1,\\,0)$، $(0,\\,-1)$', '$(0,\\,1)$, $(1,\\,0)$, $(0,\\,-1)$')
            ],
            correctIndex: 1,
            explanation: say('$x$ bakoitzak $y$ bakarra du, nahiz eta $y$ beti 2 izan. Besteetan, $x=2$ eta $x=0$ errepikatuta daude.', 'Cada $x$ tiene una sola $y$, aunque la $y$ sea siempre 2. En las otras se repiten $x=2$ y $x=0$.', 'لكل $x$ قيمة واحدة لـ$y$ وإن كانت $y$ دائمًا 2. وفي الأخريين تتكرر $x=2$ و$x=0$.', 'Each $x$ has only one $y$, even though $y$ is always 2. In the others, $x=2$ and $x=0$ repeat.')
        }
    },
    expressions: {
        mistake: {
            wrong: say('Taxia: 3 € igotzean eta 1 € minutuko: $y=3x+1$.', 'Taxi: 3 € al subir y 1 € por minuto: $y=3x+1$.', 'سيارة أجرة: 3 € عند الركوب و1 € للدقيقة: $y=3x+1$.', 'Taxi: €3 to get in and €1 a minute: $y=3x+1$.'),
            right: say('Minutuekin biderkatzen dena minutuko euroa da: $y=x+3$.', 'Lo que se multiplica por los minutos es el euro por minuto: $y=x+3$.', 'ما يُضرب في الدقائق هو اليورو لكل دقيقة: $y=x+3$.', 'What multiplies the minutes is the euro per minute: $y=x+3$.')
        },
        check: {
            prompt: say('Gimnasio batek 15 € kobratzen ditu matrikulan eta 20 € hilean. Zein formulak ematen du $x$ hilabeteren kostua?', 'Un gimnasio cobra 15 € de matrícula y 20 € al mes. ¿Qué fórmula da el coste de $x$ meses?', 'نادٍ رياضي يأخذ 15 € للتسجيل و20 € كل شهر. أيّ صيغة تعطي كلفة $x$ شهرًا؟', 'A gym charges €15 to join and €20 a month. Which formula gives the cost of $x$ months?'),
            options: [same('$y=15x+20$'), same('$y=35x$'), same('$y=20x+15$')],
            correctIndex: 2,
            explanation: say('Hilabeteak bider 20, gehi 15 behin bakarrik: $y=20x+15$.', 'Los meses, por 20, más 15 una sola vez: $y=20x+15$.', 'الأشهر في 20، زائد 15 مرة واحدة: $y=20x+15$.', 'The months times 20, plus 15 just once: $y=20x+15$.')
        }
    },
    evaluate: {
        mistake: {
            wrong: say('$f(x)=x^{2}$ bada, $f(-3)=-9$.', 'Si $f(x)=x^{2}$, $f(-3)=-9$.', 'إذا كان $f(x)=x^{2}$ فإن $f(-3)=-9$.', 'If $f(x)=x^{2}$, $f(-3)=-9$.'),
            right: say('Parentesi artean: $f(-3)=(-3)^{2}=9$.', 'Entre paréntesis: $f(-3)=(-3)^{2}=9$.', 'بين قوسين: $f(-3)=(-3)^{2}=9$.', 'In brackets: $f(-3)=(-3)^{2}=9$.')
        },
        check: {
            prompt: say('Zein puntu dago $y=2x-1$ funtzioaren grafikoan?', '¿Qué punto está en la gráfica de $y=2x-1$?', 'أيّ نقطة تقع على رسم $y=2x-1$؟', 'Which point is on the graph of $y=2x-1$?'),
            options: [same('$(3,\\,2)$'), same('$(2,\\,3)$'), same('$(1,\\,2)$')],
            correctIndex: 1,
            explanation: say('$x=2$ ordeztuz: $2\\cdot 2-1=3$. $(3,\\,2)$ puntuan zenbakiak trukatuta daude.', 'Sustituye $x=2$: $2\\cdot 2-1=3$. En $(3,\\,2)$ los números están cambiados.', 'عوّض $x=2$: $2\\cdot 2-1=3$. وفي $(3,\\,2)$ العددان مقلوبان.', 'Put in $x=2$: $2\\cdot 2-1=3$. In $(3,\\,2)$ the numbers are swapped.')
        }
    },
    /* ---------- 2. Domain ---------- */
    'domain-graph': {
        mistake: {
            wrong: say('Izate-eremua: $y$ balioak, $[-2,\\,4]$.', 'Dominio: los valores de $y$, $[-2,\\,4]$.', 'المجال: قيم $y$، $[-2,\\,4]$.', 'Domain: the values of $y$, $[-2,\\,4]$.'),
            right: say('Izate-eremua X ardatzean dago ($x$ balioak); $y$ balioak ibiltartea dira.', 'El dominio va en el eje X (los valores de $x$); los de $y$ son el recorrido.', 'المجال على محور X (قيم $x$)؛ وقيم $y$ هي المدى.', 'The domain is on the X axis (the values of $x$); the $y$ values are the range.')
        },
        check: {
            prompt: say('Grafiko bat $(0,\\,2)$ puntutik $(6,\\,8)$ puntura doa, etenik gabe eta beti gora. Zein da ibiltartea?', 'Una gráfica va de $(0,\\,2)$ a $(6,\\,8)$ sin interrupciones y siempre sube. ¿Cuál es el recorrido?', 'رسم يمتد من $(0,\\,2)$ إلى $(6,\\,8)$ دون انقطاع ويتزايد دائمًا. ما المدى؟', 'A graph goes from $(0,\\,2)$ to $(6,\\,8)$ without breaks and always goes up. What is the range?'),
            options: [same('$[0,\\,6]$'), same('$(2,\\,8)$'), same('$[2,\\,8]$')],
            correctIndex: 2,
            explanation: say('Ibiltartea $y$ balioak dira, 2 eta 8 barne: $[2,\\,8]$. $[0,\\,6]$ izate-eremua da.', 'El recorrido son las $y$, con 2 y 8 incluidos: $[2,\\,8]$. $[0,\\,6]$ es el dominio.', 'المدى قيم $y$ مع 2 و8: $[2,\\,8]$. أما $[0,\\,6]$ فهو المجال.', 'The range is the $y$ values, with 2 and 8 included: $[2,\\,8]$. $[0,\\,6]$ is the domain.')
        }
    },
    'domain-formula': {
        mistake: {
            wrong: same('$y=\\sqrt{x-5}\\ \\to\\ \\mathbb{R}-\\{5\\}$'),
            right: say('Erro batean, $x-5\\ge 0$: izate-eremua $[5,\\,+\\infty)$ da.', 'En una raíz, $x-5\\ge 0$: el dominio es $[5,\\,+\\infty)$.', 'في الجذر $x-5\\ge 0$: المجال $[5,\\,+\\infty)$.', 'In a root, $x-5\\ge 0$: the domain is $[5,\\,+\\infty)$.')
        },
        check: {
            prompt: say('$x$ aldagaiaren zein balio ez dago $y=\\frac{x}{x+7}$ funtzioaren izate-eremuan?', '¿Qué valor de $x$ no está en el dominio de $y=\\frac{x}{x+7}$?', 'ما قيمة $x$ التي ليست في مجال $y=\\frac{x}{x+7}$؟', 'Which value of $x$ is not in the domain of $y=\\frac{x}{x+7}$?'),
            options: [same('$x=0$'), same('$x=-7$'), same('$x=7$')],
            correctIndex: 1,
            explanation: say('Izendatzailea ezin da 0 izan: $x+7=0$ denean, $x=-7$. $x=0$ denean zenbakitzailea da 0, eta horrek ez du ezer eragozten.', 'El denominador no puede ser 0: $x+7=0$ si $x=-7$. Con $x=0$ se anula el numerador, y eso no impide nada.', 'لا يكون المقام 0: $x+7=0$ عندما $x=-7$. ومع $x=0$ ينعدم البسط، وهذا لا يمنع شيئًا.', 'The denominator cannot be 0: $x+7=0$ when $x=-7$. With $x=0$ the numerator is 0, and that is no problem.')
        }
    },
    intercepts: {
        mistake: {
            wrong: say('$y=2x+6$ funtzioak X ardatza $(0,\\,6)$ puntuan mozten du.', 'El corte de $y=2x+6$ con el eje X es $(0,\\,6)$.', 'تقاطع $y=2x+6$ مع محور X هو $(0,\\,6)$.', 'The X intercept of $y=2x+6$ is $(0,\\,6)$.'),
            right: say('X ardatzarekin $y=0$ jartzen da: $2x+6=0$, $(-3,\\,0)$. $(0,\\,6)$ Y ardatzarekiko ebaki-puntua da.', 'Con el eje X se pone $y=0$: $2x+6=0$, $(-3,\\,0)$. $(0,\\,6)$ es el corte con el eje Y.', 'مع محور X نضع $y=0$: $2x+6=0$، $(-3,\\,0)$. أما $(0,\\,6)$ فهو التقاطع مع محور Y.', 'For the X axis, put $y=0$: $2x+6=0$, $(-3,\\,0)$. $(0,\\,6)$ is the Y intercept.')
        },
        check: {
            prompt: say('Non mozten du Y ardatza $y=3x-12$ funtzioaren grafikoak?', '¿Dónde corta al eje Y la gráfica de $y=3x-12$?', 'أين يقطع رسم $y=3x-12$ محور Y؟', 'Where does the graph of $y=3x-12$ cross the Y axis?'),
            options: [same('$(4,\\,0)$'), same('$(0,\\,-12)$'), same('$(0,\\,12)$')],
            correctIndex: 1,
            explanation: say('Y ardatzean $x=0$: $y=3\\cdot 0-12=-12$. $(4,\\,0)$ X ardatzarekiko ebaki-puntua da.', 'En el eje Y, $x=0$: $y=3\\cdot 0-12=-12$. $(4,\\,0)$ es el corte con el eje X.', 'على محور Y يكون $x=0$: $y=3\\cdot 0-12=-12$. و$(4,\\,0)$ هو التقاطع مع محور X.', 'On the Y axis, $x=0$: $y=3\\cdot 0-12=-12$. $(4,\\,0)$ is the X intercept.')
        }
    },
    /* ---------- 3. Change ---------- */
    monotony: {
        mistake: {
            wrong: say('$(0,\\,2)$ puntutik $(3,\\,8)$ puntura igotzen da: gorakorra da $(2,\\,8)$ tartean.', 'Sube de $(0,\\,2)$ a $(3,\\,8)$: crece en $(2,\\,8)$.', 'يصعد من $(0,\\,2)$ إلى $(3,\\,8)$: متزايدة في $(2,\\,8)$.', 'It rises from $(0,\\,2)$ to $(3,\\,8)$: it increases on $(2,\\,8)$.'),
            right: say('Tarteak $x$ ardatzean daude: gorakorra da $(0,\\,3)$ tartean.', 'Los intervalos van en $x$: crece en $(0,\\,3)$.', 'الفترات على $x$: متزايدة في $(0,\\,3)$.', 'The intervals are in $x$: it increases on $(0,\\,3)$.')
        },
        check: {
            prompt: say('Grafiko bat $(1,\\,0)$ puntutik $(4,\\,6)$ puntura igotzen da. Zein tartetan da gorakorra?', 'Una gráfica sube de $(1,\\,0)$ a $(4,\\,6)$. ¿En qué intervalo crece?', 'رسم يصعد من $(1,\\,0)$ إلى $(4,\\,6)$. في أيّ فترة يتزايد؟', 'A graph rises from $(1,\\,0)$ to $(4,\\,6)$. On which interval does it increase?'),
            options: [same('$(1,\\,4)$'), same('$(0,\\,6)$'), same('$(1,\\,6)$')],
            correctIndex: 0,
            explanation: say('$x$ balioak hartzen dira, ezkerretik eskuinera: 1 zenbakitik 4 zenbakira.', 'Se toman los valores de $x$, de izquierda a derecha: de 1 a 4.', 'نأخذ قيم $x$ من اليسار إلى اليمين: من 1 إلى 4.', 'Take the $x$ values, from left to right: from 1 to 4.')
        }
    },
    extrema: {
        mistake: {
            wrong: say('Gluzemiaren maximoa 120 da.', 'El máximo de la glucemia es 120.', 'القيمة العظمى لسكر الدم 120.', 'The maximum of the blood sugar is 120.'),
            right: say('Puntu osoa ematen da: $(1,\\,120)$; ordu batean 120 mg/dl.', 'Se da el punto entero: $(1,\\,120)$; a la 1 h, 120 mg/dl.', 'نعطي النقطة كاملة: $(1,\\,120)$؛ بعد ساعة 120 mg/dl.', 'Give the whole point: $(1,\\,120)$; after 1 h, 120 mg/dl.')
        },
        check: {
            prompt: say('Grafiko bat $(3,\\,7)$ puntura arte igotzen da, eta gero jaitsi egiten da. Zer da $(3,\\,7)$?', 'Una gráfica sube hasta $(3,\\,7)$ y después baja. ¿Qué es $(3,\\,7)$?', 'رسم يصعد حتى $(3,\\,7)$ ثم ينزل. ما $(3,\\,7)$؟', 'A graph rises to $(3,\\,7)$ and then falls. What is $(3,\\,7)$?'),
            options: [say('Minimo erlatibo bat', 'Un mínimo relativo', 'قيمة صغرى نسبية', 'A relative minimum'), say('Ardatz batekiko ebaki-puntu bat', 'Un corte con un eje', 'نقطة تقاطع مع محور', 'An intercept'), say('Maximo erlatibo bat', 'Un máximo relativo', 'قيمة عظمى نسبية', 'A relative maximum')],
            correctIndex: 2,
            explanation: say('Igotzetik jaistera pasatzen da: tontor bat, maximo erlatibo bat.', 'Pasa de subir a bajar: una cima, un máximo relativo.', 'ينتقل من الصعود إلى النزول: قمة، أي قيمة عظمى نسبية.', 'It goes from rising to falling: a peak, a relative maximum.')
        }
    },
    rate: {
        mistake: {
            wrong: same('$\\frac{f(4)-f(1)}{1-4}$'),
            right: say('Ordena berean kentzen da goian eta behean: $\\frac{f(4)-f(1)}{4-1}$.', 'Se resta en el mismo orden arriba y abajo: $\\frac{f(4)-f(1)}{4-1}$.', 'نطرح بالترتيب نفسه في البسط والمقام: $\\frac{f(4)-f(1)}{4-1}$.', 'Subtract in the same order on top and at the bottom: $\\frac{f(4)-f(1)}{4-1}$.')
        },
        check: {
            prompt: say('Auto bat 20. km-an dago 10:00 orduan, eta 200. km-an 12:00 orduan. Zein da haren batez besteko abiadura?', 'Un coche está en el km 20 a las 10 h y en el km 200 a las 12 h. ¿Cuál es su velocidad media?', 'سيارة عند الكيلومتر 20 في الساعة 10 وعند الكيلومتر 200 في الساعة 12. ما سرعتها المتوسطة؟', 'A car is at km 20 at 10:00 and at km 200 at 12:00. What is its average speed?'),
            options: [say('$100$ km/h', '$100$ km/h', '$100$ كم/س', '$100$ km/h'), say('$180$ km/h', '$180$ km/h', '$180$ كم/س', '$180$ km/h'), say('$90$ km/h', '$90$ km/h', '$90$ كم/س', '$90$ km/h')],
            correctIndex: 2,
            explanation: say('$\\frac{200-20}{12-10}=\\frac{180}{2}=90$ km/h.', '$\\frac{200-20}{12-10}=\\frac{180}{2}=90$ km/h.', '$\\frac{200-20}{12-10}=\\frac{180}{2}=90$ كم/س.', '$\\frac{200-20}{12-10}=\\frac{180}{2}=90$ km/h.')
        }
    },
    /* ---------- 4. Properties ---------- */
    continuity: {
        mistake: {
            wrong: say('Grafikoko puntu huts bat funtzioaren puntu bat da.', 'Un punto hueco de la gráfica es un punto de la función.', 'النقطة الفارغة في الرسم نقطة من الدالة.', 'An open dot on the graph is a point of the function.'),
            right: say('Hutsa: puntu hori ez dago grafikoan. Betea: badago.', 'Hueco: ese punto no está en la gráfica. Relleno: sí está.', 'الفارغة: تلك النقطة ليست على الرسم. الممتلئة: موجودة.', 'Open: that point is not on the graph. Filled: it is.')
        },
        check: {
            prompt: say('Zein funtzio da etena?', '¿Qué función es discontinua?', 'أيّ دالة منفصلة؟', 'Which function is discontinuous?'),
            options: [
                say('Haur baten altuera adinaren arabera', 'La altura de un niño según su edad', 'طول طفل حسب عمره', 'A child’s height by age'),
                say('Aparkaleku baten prezioa, hasitako orduka', 'El precio de un parking por horas empezadas', 'ثمن موقف السيارات حسب الساعات المبدوءة', 'The price of a car park by hours started'),
                say('Tenperatura egunean zehar', 'La temperatura a lo largo del día', 'درجة الحرارة على مدار اليوم', 'The temperature through the day')
            ],
            correctIndex: 1,
            explanation: say('Prezioa ordu bakoitzean jauzika igotzen da, eskailera bat bezala. Beste biak arkatza altxatu gabe marrazten dira.', 'El precio sube de golpe cada hora, como una escalera. Las otras dos se dibujan sin levantar el lápiz.', 'يرتفع الثمن فجأة كل ساعة مثل الدرج. أما الأخريان فتُرسمان دون رفع القلم.', 'The price jumps up every hour, like a staircase. The other two are drawn without lifting the pencil.')
        }
    },
    periodicity: {
        mistake: {
            wrong: same('$T=3\\ \\to\\ f(14)=f(4)$'),
            right: say('$14=4\\cdot 3+2$: hondarra hartzen da, $f(14)=f(2)$.', '$14=4\\cdot 3+2$: se toma el resto, $f(14)=f(2)$.', '$14=4\\cdot 3+2$: نأخذ الباقي، $f(14)=f(2)$.', '$14=4\\cdot 3+2$: take the remainder, $f(14)=f(2)$.')
        },
        check: {
            prompt: say('Funtzio baten periodoa 5 da eta $f(1)=4$. Zenbat da $f(21)$?', 'Una función tiene periodo 5 y $f(1)=4$. ¿Cuánto vale $f(21)$?', 'دالة دورها 5 و$f(1)=4$. كم يساوي $f(21)$؟', 'A function has period 5 and $f(1)=4$. What is $f(21)$?'),
            options: [same('$21$'), same('$1$'), same('$4$')],
            correctIndex: 2,
            explanation: say('$21=4\\cdot 5+1$: $f(21)=f(1)=4$.', '$21=4\\cdot 5+1$: $f(21)=f(1)=4$.', '$21=4\\cdot 5+1$: $f(21)=f(1)=4$.', '$21=4\\cdot 5+1$: $f(21)=f(1)=4$.')
        }
    },
    tendency: {
        mistake: {
            wrong: say('Erradioaktibitatea azkenean 0 izatera iristen da.', 'La radiactividad acaba llegando a 0.', 'النشاط الإشعاعي يصل في النهاية إلى 0.', 'The radioactivity ends up reaching 0.'),
            right: say('Gero eta gehiago hurbiltzen da 0 zenbakira, baina ez da inoiz iristen: 0 haren joera da.', 'Se acerca a 0 cada vez más, pero nunca llega: 0 es su tendencia.', 'يقترب من 0 أكثر فأكثر لكنه لا يصل أبدًا: 0 هو اتجاهه.', 'It gets closer and closer to 0, but never gets there: 0 is its trend.')
        },
        check: {
            prompt: say('100 kantitate bat egunero erdira murrizten da. Zertara jotzen du?', 'Una cantidad de 100 se reduce a la mitad cada día. ¿A qué tiende?', 'كمية مقدارها 100 تنقص إلى النصف كل يوم. إلامَ تتجه؟', 'An amount of 100 halves every day. What does it tend to?'),
            options: [same('$50$'), same('$0$'), same('$1$')],
            correctIndex: 1,
            explanation: say('100, 50, 25, $12{,}5$… gero eta gertuago 0 zenbakitik, inoiz iritsi gabe.', '100, 50, 25, $12{,}5$… cada vez más cerca de 0, sin llegar nunca.', '100، 50، 25، $12{,}5$… أقرب فأقرب إلى 0 دون أن تصل.', '100, 50, 25, $12{,}5$… closer and closer to 0, never getting there.')
        }
    },
    /* ---------- 5. Study ---------- */
    reading: {
        mistake: {
            wrong: say('Denbora–abiadura grafiko batean, zati horizontal batek esan nahi du geldirik dagoela.', 'En una gráfica tiempo–velocidad, un tramo horizontal significa que está parado.', 'في رسم الزمن–السرعة يعني الجزء الأفقي أنه متوقف.', 'On a time–speed graph, a flat stretch means it has stopped.'),
            right: say('Horizontalak abiadura konstantea esan nahi du; geldirik egotea abiadura 0 litzateke.', 'Horizontal significa velocidad constante; parado sería velocidad 0.', 'الأفقي يعني سرعة ثابتة؛ أما التوقف فسرعة 0.', 'Flat means constant speed; stopped would be speed 0.')
        },
        check: {
            prompt: say('Tenperatura-grafiko batean, X ardatzak 0 eta 24 h artean doa eta maximoa $(15,\\,28)$ puntuan dago. Zer esan nahi du?', 'En una gráfica de temperatura, el eje X va de 0 a 24 h y el máximo está en $(15,\\,28)$. ¿Qué significa?', 'في رسم لدرجة الحرارة يمتد محور X من 0 إلى 24 س والعظمى في $(15,\\,28)$. ماذا يعني ذلك؟', 'On a temperature graph, the X axis runs from 0 to 24 h and the maximum is at $(15,\\,28)$. What does it mean?'),
            options: [
                say('15:00 orduan 28 °C daude, gehienekoa', 'A las 15 h hace 28 °C, la máxima', 'في الساعة 15 تكون الحرارة 28 °م، وهي العظمى', 'At 15:00 it is 28 °C, the highest'),
                say('28:00 orduan 15 °C daude', 'A las 28 h hace 15 °C', 'في الساعة 28 تكون الحرارة 15 °م', 'At 28:00 it is 15 °C'),
                say('15 orduz 28 °C daude', 'Hace 28 °C durante 15 horas', 'تبقى الحرارة 28 °م مدة 15 ساعة', 'It is 28 °C for 15 hours')
            ],
            correctIndex: 0,
            explanation: say('$x$ ordua da eta $y$ tenperatura: 15 h, 28 °C.', 'La $x$ es la hora y la $y$, la temperatura: 15 h, 28 °C.', '$x$ هي الساعة و$y$ درجة الحرارة: 15 س، 28 °م.', 'The $x$ is the time and the $y$ is the temperature: 15:00, 28 °C.')
        }
    },
    study: {
        mistake: {
            wrong: say('Ibiltartea $[0,\\,6]$: hasten den tokitik amaitzen den tokira.', 'Recorrido $[0,\\,6]$: de dónde empieza a dónde acaba.', 'المدى $[0,\\,6]$: من حيث يبدأ إلى حيث ينتهي.', 'Range $[0,\\,6]$: from where it starts to where it ends.'),
            right: say('Hori izate-eremua da (X ardatza). Ibiltartea $y$ balioak dira.', 'Eso es el dominio (eje X). El recorrido son las $y$.', 'هذا هو المجال (محور X). أما المدى فقيم $y$.', 'That is the domain (X axis). The range is the $y$ values.')
        },
        check: {
            prompt: say('Grafiko batean, funtzioa $x=2$ arte igotzen da, $x=5$ arte jaisten da, eta berriro igotzen da. Zenbat mutur erlatibo ditu?', 'En una gráfica, la función sube hasta $x=2$, baja hasta $x=5$ y vuelve a subir. ¿Cuántos extremos relativos tiene?', 'في رسم تتزايد الدالة حتى $x=2$ وتتناقص حتى $x=5$ ثم تتزايد من جديد. كم قيمة قصوى نسبية لها؟', 'On a graph, the function rises until $x=2$, falls until $x=5$ and rises again. How many relative extremes does it have?'),
            options: [say('Bat', 'Uno', 'واحدة', 'One'), say('Bi', 'Dos', 'اثنتان', 'Two'), say('Hiru', 'Tres', 'ثلاث', 'Three')],
            correctIndex: 1,
            explanation: say('Maximo bat $x=2$ puntuan (igo eta jaitsi) eta minimo bat $x=5$ puntuan (jaitsi eta igo).', 'Un máximo en $x=2$ (sube y baja) y un mínimo en $x=5$ (baja y sube).', 'عظمى عند $x=2$ (تصعد ثم تنزل) وصغرى عند $x=5$ (تنزل ثم تصعد).', 'A maximum at $x=2$ (up then down) and a minimum at $x=5$ (down then up).')
        }
    },
    modelling: {
        mistake: {
            wrong: say('Kutxan, izate-eremua $x>0$ da.', 'En la caja, el dominio es $x>0$.', 'في العلبة، المجال $x>0$.', 'For the box, the domain is $x>0$.'),
            right: say('$30-2x>0$ ere bai; bestela ez dago kutxarik: $0<x<15$.', 'También $30-2x>0$: si no, no hay caja. $0<x<15$.', 'وأيضًا $30-2x>0$: وإلا فلا علبة. $0<x<15$.', 'Also $30-2x>0$: otherwise there is no box. $0<x<15$.')
        },
        check: {
            prompt: say('Kutxa ireki bat egiten da $20$ cm-ko aldeko kartulina karratu batetik, izkina bakoitzean $x$ cm-ko aldeko karratu bat moztuta. Zein da bolumena?', 'Se hace una caja abierta con una cartulina cuadrada de $20$ cm de lado, cortando un cuadrado de lado $x$ cm en cada esquina. ¿Cuál es su volumen?', 'تُصنع علبة مفتوحة من ورق مقوى مربع ضلعه $20$ سم بقصّ مربع ضلعه $x$ سم من كل زاوية. ما حجمها؟', 'An open box is made from a square card with $20$ cm sides by cutting a square with $x$ cm sides from each corner. What is its volume?'),
            options: [same('$(20-x)^{2}\\,x$'), same('$(20-2x)^{2}\\,x$'), same('$20^{2}\\,x$')],
            correctIndex: 1,
            explanation: say('Alde bakoitzari bi karratu kentzen zaizkio: oinarria $20-2x$ da, eta altuera $x$.', 'A cada lado se le quitan dos cuadrados: la base es $20-2x$, y la altura, $x$.', 'يُنزع من كل ضلع مربعان: القاعدة $20-2x$ والارتفاع $x$.', 'Each side loses two squares: the base is $20-2x$, and the height is $x$.')
        }
    }
}

import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from './text.ts'

/* ==========================================================================
   Funtzio elementalak · Batxilergoa 1 · Gizarte Zientziak — the typical
   mistake and the «Check it» question of every lesson. Plain data (no JSX)
   so the tests can import it. The questions use new numbers, never those
   of «Let's solve» or of the example, and one of their wrong answers is
   the lesson's typical mistake.
   ========================================================================== */

export type SocFunctionsTopicId =
    | 'families' | 'domain' | 'context-domain'
    | 'line' | 'interpolation' | 'linear-models'
    | 'parabola' | 'optimum' | 'three-points'
    | 'inverse-prop' | 'average-cost' | 'root'
    | 'piecewise' | 'piecewise-model' | 'absolute'

export const socFunctionsLessonChecks: Record<SocFunctionsTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Functions and domain ---------- */
    families: {
        mistake: {
            wrong: say('$y=\\frac{12}{x}$ zuzen bat da: $x$ handitzean, $y$ txikitu egiten da.', '$y=\\frac{12}{x}$ es una recta: cuando $x$ sube, $y$ baja.', '$y=\\frac{12}{x}$ مستقيم: عندما تزداد $x$ تنقص $y$.', '$y=\\frac{12}{x}$ is a line: when $x$ goes up, $y$ goes down.'),
            right: say('Beheratzeak ez du zuzen bihurtzen. Zuzen batean $y$ berdin aldatzen da urrats bakoitzean; hemen, $x=1$ eta $x=2$ artean 6 jaisten da, eta $x=2$ eta $x=3$ artean 2 bakarrik: hiperbola da.', 'Bajar no la convierte en recta. En una recta $y$ cambia lo mismo en cada paso; aquí, de $x=1$ a $x=2$ baja 6 y de $x=2$ a $x=3$ solo 2: es una hipérbola.', 'النقصان لا يجعلها مستقيمًا. في المستقيم تتغير $y$ بالمقدار نفسه في كل خطوة؛ وهنا تنقص 6 من $x=1$ إلى $x=2$ و2 فقط من $x=2$ إلى $x=3$: إنها قطع زائد.', 'Going down does not make it a line. On a line $y$ changes by the same amount at each step; here it drops 6 from $x=1$ to $x=2$ and only 2 from $x=2$ to $x=3$: it is a hyperbola.')
        },
        check: {
            prompt: say('Zein grafiko du $y=2x^2-3$ funtzioak?', '¿Qué gráfica tiene la función $y=2x^2-3$?', 'ما رسم الدالة $y=2x^2-3$؟', 'What graph does the function $y=2x^2-3$ have?'),
            options: [say('Parabola bat', 'Una parábola', 'قطع مكافئ', 'A parabola'), say('Zuzen bat', 'Una recta', 'مستقيم', 'A line'), say('Hiperbola bat', 'Una hipérbola', 'قطع زائد', 'A hyperbola')],
            correctIndex: 0,
            explanation: say('$x^2$ gaia dago: funtzio koadratikoa da, eta haren grafikoa parabola bat.', 'Tiene término en $x^2$: es una función cuadrática y su gráfica es una parábola.', 'فيها حد $x^2$: إنها دالة تربيعية ورسمها قطع مكافئ.', 'It has an $x^2$ term: it is a quadratic function and its graph is a parabola.')
        }
    },
    domain: {
        mistake: {
            wrong: say('$\\sqrt{x-8}$ funtzioaren izate-eremua: $(8,+\\infty)$', 'Dominio de $\\sqrt{x-8}$: $(8,+\\infty)$', 'مجال $\\sqrt{x-8}$: $(8,+\\infty)$', 'Domain of $\\sqrt{x-8}$: $(8,+\\infty)$'),
            right: say('0 zenbakiaren erroa badago: $\\sqrt{0}=0$. $x-8\\ge 0$ eskatzen da, eta izate-eremua $[8,+\\infty)$ da.', 'La raíz de 0 existe: $\\sqrt{0}=0$. Se pide $x-8\\ge 0$, y el dominio es $[8,+\\infty)$.', 'جذر 0 موجود: $\\sqrt{0}=0$. نشترط $x-8\\ge 0$، فيكون المجال $[8,+\\infty)$.', 'The root of 0 exists: $\\sqrt{0}=0$. You need $x-8\\ge 0$, and the domain is $[8,+\\infty)$.')
        },
        check: {
            prompt: say('Zein da $f(x)=\\frac{3}{x^2-25}$ funtzioaren izate-eremua?', '¿Cuál es el dominio de $f(x)=\\frac{3}{x^2-25}$?', 'ما مجال $f(x)=\\frac{3}{x^2-25}$؟', 'What is the domain of $f(x)=\\frac{3}{x^2-25}$?'),
            options: [same('$\\mathbb{R}-\\{25\\}$'), same('$(5,+\\infty)$'), same('$\\mathbb{R}-\\{-5,5\\}$')],
            correctIndex: 2,
            explanation: say('Izendatzailea 0 da $x^2=25$ denean, hau da, $x=-5$ eta $x=5$ direnean: bi zenbaki horiek kentzen dira.', 'El denominador es 0 cuando $x^2=25$, es decir, en $x=-5$ y $x=5$: se quitan esos dos números.', 'يكون المقام 0 عندما $x^2=25$، أي عند $x=-5$ و$x=5$: نحذف هذين العددين.', 'The denominator is 0 when $x^2=25$, that is, at $x=-5$ and $x=5$: those two numbers are removed.')
        }
    },
    'context-domain': {
        mistake: {
            wrong: say('Laukizuzen baten azalera, $A(x)=x(16-x)$: izate-eremua $\\mathbb{R}$ da, polinomio bat delako.', 'El área de un rectángulo, $A(x)=x(16-x)$, tiene dominio $\\mathbb{R}$ porque es un polinomio.', 'مساحة مستطيل $A(x)=x(16-x)$ مجالها $\\mathbb{R}$ لأنها حدودية.', 'The area of a rectangle, $A(x)=x(16-x)$, has domain $\\mathbb{R}$ because it is a polynomial.'),
            right: say('Formula edozein $x$ zenbakirekin kalkula daiteke, baina alde batek ezin du 0 neurtu edo negatiboa izan: testuinguruan, $0<x<16$.', 'La fórmula se puede calcular con cualquier $x$, pero un lado no puede medir 0 ni ser negativo: en el contexto, $0<x<16$.', 'يمكن حساب الصيغة لأي $x$، لكن الضلع لا يمكن أن يكون 0 أو سالبًا: في السياق $0<x<16$.', 'The formula can be worked out for any $x$, but a side cannot measure 0 or be negative: in the context, $0<x<16$.')
        },
        check: {
            prompt: say('Produktu bat $p$ euroan saltzen da, eta $q=120-3p$ unitate saltzen dira. Zein da $p$ prezioaren izate-eremua testuinguruan?', 'Un producto se vende a $p$ euros y se venden $q=120-3p$ unidades. ¿Qué dominio tiene el precio $p$ en el contexto?', 'يُباع منتج بسعر $p$ يورو وتُباع منه $q=120-3p$ وحدة. ما مجال السعر $p$ في هذا السياق؟', 'A product sells at $p$ euros and $q=120-3p$ units are sold. What is the domain of the price $p$ in the context?'),
            options: [same('$\\mathbb{R}$'), same('$(0,40)$'), same('$(0,120)$')],
            correctIndex: 1,
            explanation: say('Prezioa positiboa da, eta saldutako unitateak ere bai: $120-3p>0$ eskatzen du $p<40$.', 'El precio es positivo y las unidades vendidas también: $120-3p>0$ pide $p<40$.', 'السعر موجب، وكذلك عدد الوحدات المبيعة: $120-3p>0$ يعطي $p<40$.', 'The price is positive and so are the units sold: $120-3p>0$ needs $p<40$.')
        }
    },

    /* ---------- 2. Linear functions and interpolation ---------- */
    line: {
        mistake: {
            wrong: say('$(1,4)$ eta $(3,10)$ puntuen arteko malda: $m=\\frac{3-1}{10-4}=\\frac{1}{3}$', 'Pendiente entre $(1,4)$ y $(3,10)$: $m=\\frac{3-1}{10-4}=\\frac{1}{3}$', 'الميل بين $(1,4)$ و$(3,10)$: $m=\\frac{3-1}{10-4}=\\frac{1}{3}$', 'Slope between $(1,4)$ and $(3,10)$: $m=\\frac{3-1}{10-4}=\\frac{1}{3}$'),
            right: say('Goian $y$ koordenatuaren aldaketa doa, eta behean $x$ koordenatuarena: $m=\\frac{10-4}{3-1}=3$.', 'Arriba va lo que cambia la $y$ y abajo lo que cambia la $x$: $m=\\frac{10-4}{3-1}=3$.', 'في البسط تغيّر $y$ وفي المقام تغيّر $x$: $m=\\frac{10-4}{3-1}=3$.', 'The change in $y$ goes on top and the change in $x$ below: $m=\\frac{10-4}{3-1}=3$.')
        },
        check: {
            prompt: say('Zein da $(0,7)$ eta $(5,22)$ puntuetatik pasatzen den zuzenaren malda?', '¿Cuál es la pendiente de la recta que pasa por $(0,7)$ y $(5,22)$?', 'ما ميل المستقيم المار بالنقطتين $(0,7)$ و$(5,22)$؟', 'What is the slope of the line through $(0,7)$ and $(5,22)$?'),
            options: [same('$\\frac{1}{3}$'), same('$3$'), same('$15$')],
            correctIndex: 1,
            explanation: same('$m=\\frac{22-7}{5-0}=\\frac{15}{5}=3$')
        }
    },
    interpolation: {
        mistake: {
            wrong: say('100 kWh kontsumituta 40 € eta 200 kWh kontsumituta 70 € ordaintzen bada, 1000 kWh kontsumituta, ziur, 310 € ordainduko dira.', 'Si por 100 kWh se pagan 40 € y por 200 kWh, 70 €, por 1000 kWh se pagarán seguro 310 €.', 'إذا دُفع 40 € مقابل 100 kWh و70 € مقابل 200 kWh، فسيُدفع حتمًا 310 € مقابل 1000 kWh.', 'If 100 kWh cost €40 and 200 kWh cost €70, then 1,000 kWh will surely cost €310.'),
            right: say('310 € estrapolazio oso urrun bat da: tarifa alda daiteke. Estimazioa datuetatik hurbil bakarrik da fidagarria.', '310 € es una extrapolación muy lejana: la tarifa puede cambiar. La estimación solo es fiable cerca de los datos.', '310 € استقراء خارجي بعيد جدًّا: قد تتغير التعرفة. التقدير موثوق قرب البيانات فقط.', '€310 is a very distant extrapolation: the tariff may change. The estimate can only be trusted near the data.')
        },
        check: {
            prompt: say('$(10,25)$ eta $(20,45)$ datuekin, zein da $x=16$ baliorako estimazio lineala?', 'Con los datos $(10,25)$ y $(20,45)$, ¿cuál es la estimación lineal para $x=16$?', 'بالبيانات $(10,25)$ و$(20,45)$، ما التقدير الخطي عند $x=16$؟', 'With the data $(10,25)$ and $(20,45)$, what is the linear estimate for $x=16$?'),
            options: [same('$41$'), same('$36$'), same('$37$')],
            correctIndex: 2,
            explanation: same('$m=\\frac{45-25}{20-10}=2\\qquad 25+2\\cdot(16-10)=37$')
        }
    },
    'linear-models': {
        mistake: {
            wrong: say('Taxi batek 4 € kobratzen ditu hasieran eta 1,5 € kilometro bakoitzeko: 10 km kostatzen dira $1{,}5\\cdot 10=15$ €.', 'Un taxi cobra 4 € de bajada de bandera y 1,5 € por km: 10 km cuestan $1{,}5\\cdot 10=15$ €.', 'تتقاضى سيارة أجرة 4 € عند الركوب و1.5 € لكل كيلومتر: تكلّف 10 كم $1{,}5\\cdot 10=15$ €.', 'A taxi charges €4 to start and €1.5 per km: 10 km cost $1{,}5\\cdot 10=15$ euros.'),
            right: say('Zati finkoa falta da: $4+1{,}5\\cdot 10=19$ €.', 'Falta la parte fija: $4+1{,}5\\cdot 10=19$ €.', 'ينقص الجزء الثابت: $4+1{,}5\\cdot 10=19$ €.', 'The fixed part is missing: $4+1{,}5\\cdot 10=19$ euros.')
        },
        check: {
            prompt: say('Inprimategi batek 15 € finko kobratzen ditu, eta 0,05 € kopia bakoitzeko. Zenbat kostatzen dira 400 kopia?', 'Una imprenta cobra 15 € fijos y 0,05 € por copia. ¿Cuánto cuestan 400 copias?', 'تتقاضى مطبعة 15 € ثابتة و0.05 € لكل نسخة. كم تكلّف 400 نسخة؟', 'A print shop charges a fixed €15 and €0.05 per copy. How much do 400 copies cost?'),
            options: [say('35 €', '35 €', '35 €', '€35'), say('20 €', '20 €', '20 €', '€20'), say('415 €', '415 €', '415 €', '€415')],
            correctIndex: 0,
            explanation: same('$15+0{,}05\\cdot 400=15+20=35$')
        }
    },

    /* ---------- 3. Quadratic functions ---------- */
    parabola: {
        mistake: {
            wrong: say('$y=x^2+10x$ parabolaren erpina: $x=\\frac{10}{2}=5$', 'Vértice de $y=x^2+10x$: $x=\\frac{10}{2}=5$', 'رأس $y=x^2+10x$: $x=\\frac{10}{2}=5$', 'Vertex of $y=x^2+10x$: $x=\\frac{10}{2}=5$'),
            right: say('Minus zeinua falta da: $x=-\\frac{10}{2}=-5$.', 'Falta el signo menos: $x=-\\frac{10}{2}=-5$.', 'تنقص إشارة السالب: $x=-\\frac{10}{2}=-5$.', 'The minus sign is missing: $x=-\\frac{10}{2}=-5$.')
        },
        check: {
            prompt: say('Zein $x$ baliotan dago $y=3x^2-12x+7$ parabolaren erpina?', '¿En qué $x$ está el vértice de $y=3x^2-12x+7$?', 'عند أي $x$ يقع رأس $y=3x^2-12x+7$؟', 'At which $x$ is the vertex of $y=3x^2-12x+7$?'),
            options: [same('$-2$'), same('$2$'), same('$4$')],
            correctIndex: 1,
            explanation: same('$x=-\\frac{-12}{2\\cdot 3}=2$')
        }
    },
    optimum: {
        mistake: {
            wrong: say('$B(x)=-x^2+60x-700$ mozkinaren baliorik handiena 30 da.', 'El beneficio máximo de $B(x)=-x^2+60x-700$ es 30.', 'أكبر ربح لـ $B(x)=-x^2+60x-700$ هو 30.', 'The greatest profit of $B(x)=-x^2+60x-700$ is 30.'),
            right: say('30 unitate kopurua da (erpinaren $x$). Mozkinik handiena hau da: $-900+1800-700=200$.', '30 es el número de unidades (la $x$ del vértice). El beneficio máximo es $-900+1800-700=200$.', '30 هو عدد الوحدات (إحداثي $x$ للرأس). وأكبر ربح هو $-900+1800-700=200$.', '30 is the number of units (the $x$ of the vertex). The greatest profit is $-900+1800-700=200$.')
        },
        check: {
            prompt: say('$I(x)=-2x^2+80x$ diru-sarrerak badira, zein $x$ baliorekin dira handienak?', 'Si los ingresos son $I(x)=-2x^2+80x$, ¿con qué $x$ son máximos?', 'إذا كانت الإيرادات $I(x)=-2x^2+80x$، فعند أي $x$ تكون أكبر ما يمكن؟', 'If the revenue is $I(x)=-2x^2+80x$, for which $x$ is it greatest?'),
            options: [same('$40$'), same('$800$'), same('$20$')],
            correctIndex: 2,
            explanation: same('$x=-\\frac{80}{2\\cdot(-2)}=20$')
        }
    },
    'three-points': {
        mistake: {
            wrong: say('Hiru daturekin, lehen bien zuzena hartzen da, eta hirugarrena ahaztu.', 'Con tres datos se toma la recta de los dos primeros y se olvida el tercero.', 'مع ثلاث بيانات نأخذ مستقيم الأوليين وننسى الثالثة.', 'With three data you take the line through the first two and forget the third.'),
            right: say('Datuak lerrokatuta ez badaude, zuzen batek ez ditu hirurak ukitzen. Parabolak hiru datuak erabiltzen ditu, eta hobeto estimatzen du datuak kurbatzen direnean.', 'Si los datos no están alineados, una recta no pasa por los tres. La parábola usa los tres datos y estima mejor cuando los datos se curvan.', 'إذا لم تكن البيانات على استقامة واحدة فلا يمر مستقيم بالثلاث. يستعمل القطع المكافئ البيانات الثلاث ويقدّر أفضل عندما تنحني البيانات.', 'If the data are not in a line, no line passes through all three. The parabola uses the three data and estimates better when the data curve.')
        },
        check: {
            prompt: say('Parabola bat $(0,4)$, $(1,5)$ eta $(2,8)$ puntuetatik pasatzen da. Zenbat balio du $x=3$ denean?', 'Una parábola pasa por $(0,4)$, $(1,5)$ y $(2,8)$. ¿Cuánto vale en $x=3$?', 'يمر قطع مكافئ بالنقاط $(0,4)$ و$(1,5)$ و$(2,8)$. كم قيمته عند $x=3$؟', 'A parabola passes through $(0,4)$, $(1,5)$ and $(2,8)$. What is its value at $x=3$?'),
            options: [same('$11$'), same('$13$'), same('$12$')],
            correctIndex: 1,
            explanation: say('Newtonen bidez, $y=4+x+x(x-1)=x^2+4$ ateratzen da, eta $3^2+4=13$. Azken bi puntuen zuzenak 11 emango luke.', 'Por Newton sale $y=4+x+x(x-1)=x^2+4$, y $3^2+4=13$. La recta de los dos últimos puntos daría 11.', 'بطريقة نيوتن نحصل على $y=4+x+x(x-1)=x^2+4$، و$3^2+4=13$. ومستقيم النقطتين الأخيرتين يعطي 11.', 'By Newton you get $y=4+x+x(x-1)=x^2+4$, and $3^2+4=13$. The line through the last two points would give 11.')
        }
    },

    /* ---------- 4. Inverse proportion and roots ---------- */
    'inverse-prop': {
        mistake: {
            wrong: say('3 margolarik 12 egun behar badituzte, 6 margolarik 24 egun beharko dituzte.', 'Si 3 pintores tardan 12 días, 6 pintores tardarán 24 días.', 'إذا احتاج 3 دهّانين إلى 12 يومًا، فسيحتاج 6 دهّانين إلى 24 يومًا.', 'If 3 painters take 12 days, 6 painters will take 24 days.'),
            right: say('Alderantzizko proportzionaltasuna da: biderkadura ez da aldatzen, $3\\cdot 12=36$, eta $\\frac{36}{6}=6$ egun.', 'Es proporcionalidad inversa: el producto no cambia, $3\\cdot 12=36$, y $\\frac{36}{6}=6$ días.', 'إنه تناسب عكسي: الجداء لا يتغير، $3\\cdot 12=36$، و$\\frac{36}{6}=6$ أيام.', 'It is inverse proportion: the product does not change, $3\\cdot 12=36$, and $\\frac{36}{6}=6$ days.')
        },
        check: {
            prompt: say('$y=\\frac{k}{x}$ hiperbola $(5,8)$ puntutik pasatzen da. Zenbat da $k$?', 'La hipérbola $y=\\frac{k}{x}$ pasa por $(5,8)$. ¿Cuánto vale $k$?', 'يمر القطع الزائد $y=\\frac{k}{x}$ بالنقطة $(5,8)$. كم تساوي $k$؟', 'The hyperbola $y=\\frac{k}{x}$ passes through $(5,8)$. What is $k$?'),
            options: [same('$13$'), same('$3$'), same('$40$')],
            correctIndex: 2,
            explanation: same('$k=x\\cdot y=5\\cdot 8=40$')
        }
    },
    'average-cost': {
        mistake: {
            wrong: say('$y=4+\\frac{6}{x-2}$ funtzioaren asintota bertikala $x=-2$ da.', 'La asíntota vertical de $y=4+\\frac{6}{x-2}$ es $x=-2$.', 'الخط المقارب الرأسي لـ $y=4+\\frac{6}{x-2}$ هو $x=-2$.', 'The vertical asymptote of $y=4+\\frac{6}{x-2}$ is $x=-2$.'),
            right: say('Izendatzailea $x=2$ denean anulatzen da: asintota bertikala $x=2$ da, eta horizontala $y=4$.', 'El denominador se anula en $x=2$: la asíntota vertical es $x=2$, y la horizontal, $y=4$.', 'ينعدم المقام عند $x=2$: الخط المقارب الرأسي هو $x=2$ والأفقي $y=4$.', 'The denominator is zero at $x=2$: the vertical asymptote is $x=2$, and the horizontal one $y=4$.')
        },
        check: {
            prompt: say('$x$ unitate ekoizteko kostua $C(x)=600+8x$ euro da. Zein baliotara hurbiltzen da batez besteko kostua, $x$ oso handia denean?', 'Producir $x$ unidades cuesta $C(x)=600+8x$ euros. ¿A qué valor se acerca el coste medio cuando $x$ es muy grande?', 'تكلفة إنتاج $x$ وحدة هي $C(x)=600+8x$ يورو. من أي قيمة تقترب التكلفة المتوسطة عندما تكبر $x$ كثيرًا؟', 'Making $x$ units costs $C(x)=600+8x$ euros. What value does the average cost approach when $x$ is very large?'),
            options: [same('$600$'), same('$8$'), same('$0$')],
            correctIndex: 1,
            explanation: say('Batez besteko kostua $\\frac{600}{x}+8$ da: $\\frac{600}{x}$ gero eta txikiagoa da, eta kostua 8 baliora hurbiltzen da, iritsi gabe.', 'El coste medio es $\\frac{600}{x}+8$: $\\frac{600}{x}$ se hace cada vez más pequeño y el coste se acerca a 8 sin llegar.', 'التكلفة المتوسطة $\\frac{600}{x}+8$: يصغر $\\frac{600}{x}$ أكثر فأكثر وتقترب التكلفة من 8 دون أن تبلغها.', 'The average cost is $\\frac{600}{x}+8$: $\\frac{600}{x}$ keeps getting smaller and the cost approaches 8 without reaching it.')
        }
    },
    root: {
        mistake: {
            wrong: say('$y=\\sqrt{x+3}$ funtzioa $x=3$ puntuan hasten da.', '$y=\\sqrt{x+3}$ empieza en $x=3$.', '$y=\\sqrt{x+3}$ تبدأ عند $x=3$.', '$y=\\sqrt{x+3}$ starts at $x=3$.'),
            right: say('Barrukoa 0 da $x=-3$ denean: $(-3,0)$ puntuan hasten da.', 'Lo de dentro vale 0 cuando $x=-3$: empieza en $(-3,0)$.', 'ما بالداخل يساوي 0 عندما $x=-3$: تبدأ من $(-3,0)$.', 'The inside is 0 when $x=-3$: it starts at $(-3,0)$.')
        },
        check: {
            prompt: say('Zein puntutan hasten da $y=\\sqrt{x-4}-1$ funtzioa?', '¿En qué punto empieza $y=\\sqrt{x-4}-1$?', 'من أي نقطة تبدأ $y=\\sqrt{x-4}-1$؟', 'At which point does $y=\\sqrt{x-4}-1$ start?'),
            options: [same('$(4,-1)$'), same('$(-4,-1)$'), same('$(4,1)$')],
            correctIndex: 0,
            explanation: say('Barrukoa 0 da $x=4$ denean, eta orduan $y=\\sqrt{0}-1=-1$.', 'Lo de dentro vale 0 en $x=4$, y entonces $y=\\sqrt{0}-1=-1$.', 'ما بالداخل يساوي 0 عند $x=4$، وحينئذ $y=\\sqrt{0}-1=-1$.', 'The inside is 0 at $x=4$, and then $y=\\sqrt{0}-1=-1$.')
        }
    },

    /* ---------- 5. Piecewise functions ---------- */
    piecewise: {
        mistake: {
            wrong: say('$f(x)=\\begin{cases}x+1 & x<2\\\\ 3x & x\\ge 2\\end{cases}$ bada, $f(2)=2+1=3$.', 'Si $f(x)=\\begin{cases}x+1 & x<2\\\\ 3x & x\\ge 2\\end{cases}$, $f(2)=2+1=3$.', 'إذا كانت $f(x)=\\begin{cases}x+1 & x<2\\\\ 3x & x\\ge 2\\end{cases}$، فإن $f(2)=2+1=3$.', 'If $f(x)=\\begin{cases}x+1 & x<2\\\\ 3x & x\\ge 2\\end{cases}$, then $f(2)=2+1=3$.'),
            right: say('$x=2$ balioak $x\\ge 2$ betetzen du: bigarren zatia da, eta $3\\cdot 2=6$.', '$x=2$ cumple $x\\ge 2$: es el segundo trozo, y $3\\cdot 2=6$.', '$x=2$ تحقق $x\\ge 2$: إنه الجزء الثاني، و$3\\cdot 2=6$.', '$x=2$ satisfies $x\\ge 2$: it is the second piece, and $3\\cdot 2=6$.')
        },
        check: {
            prompt: say('$f(x)=\\begin{cases}5 & x\\le 10\\\\ 5+0{,}5(x-10) & x>10\\end{cases}$ bada, zenbat da $f(16)$?', 'Si $f(x)=\\begin{cases}5 & x\\le 10\\\\ 5+0{,}5(x-10) & x>10\\end{cases}$, ¿cuánto vale $f(16)$?', 'إذا كانت $f(x)=\\begin{cases}5 & x\\le 10\\\\ 5+0{,}5(x-10) & x>10\\end{cases}$، فكم تساوي $f(16)$؟', 'If $f(x)=\\begin{cases}5 & x\\le 10\\\\ 5+0{,}5(x-10) & x>10\\end{cases}$, what is $f(16)$?'),
            options: [same('$5$'), same('$13$'), same('$8$')],
            correctIndex: 2,
            explanation: say('$16>10$: bigarren zatia, $5+0{,}5\\cdot 6=8$.', '$16>10$: segundo trozo, $5+0{,}5\\cdot 6=8$.', '$16>10$: الجزء الثاني، $5+0{,}5\\cdot 6=8$.', '$16>10$: second piece, $5+0{,}5\\cdot 6=8$.')
        }
    },
    'piecewise-model': {
        mistake: {
            wrong: say('Kopia bakoitza 0,20 € da 100 kopiara arte, eta 0,10 € hortik aurrera: 150 kopia, $0{,}10\\cdot 150=15$ €.', 'Si la copia vale 0,20 € hasta 100 copias y 0,10 € después, 150 copias cuestan $0{,}10\\cdot 150=15$ €.', 'إذا كان ثمن النسخة 0.20 € حتى 100 نسخة و0.10 € بعدها، فإن 150 نسخة تكلّف $0{,}10\\cdot 150=15$ €.', 'If a copy costs €0.20 up to 100 copies and €0.10 after that, 150 copies cost $0{,}10\\cdot 150=15$ euros.'),
            right: say('Lehen 100 kopiek 0,20 € balio dute oraindik: $0{,}2\\cdot 100+0{,}1\\cdot 50=25$ €.', 'Las 100 primeras siguen costando 0,20 €: $0{,}2\\cdot 100+0{,}1\\cdot 50=25$ €.', 'تبقى النسخ المئة الأولى بسعر 0.20 €: $0{,}2\\cdot 100+0{,}1\\cdot 50=25$ €.', 'The first 100 copies still cost €0.20: $0{,}2\\cdot 100+0{,}1\\cdot 50=25$ euros.')
        },
        check: {
            prompt: say('Enpresa batek 12 € ordaintzen ditu orduko lehen 40 orduetan, eta 18 € ordu gehigarri bakoitzeko. Zenbat kobratzen du 45 ordu lan egiten dituenak?', 'Una empresa paga 12 € la hora las 40 primeras horas y 18 € cada hora extra. ¿Cuánto cobra quien trabaja 45 horas?', 'تدفع شركة 12 € للساعة في الساعات الأربعين الأولى و18 € لكل ساعة إضافية. كم يتقاضى من يعمل 45 ساعة؟', 'A company pays €12 an hour for the first 40 hours and €18 for each extra hour. How much does someone who works 45 hours earn?'),
            options: [say('540 €', '540 €', '540 €', '€540'), say('570 €', '570 €', '570 €', '€570'), say('810 €', '810 €', '810 €', '€810')],
            correctIndex: 1,
            explanation: same('$12\\cdot 40+18\\cdot 5=480+90=570$')
        }
    },
    absolute: {
        mistake: {
            wrong: same('$|x-5|=x+5$'),
            right: say('Balio absolutuak ez dio zeinua aldatzen zenbaki bakoitzari bakarka: $|x-5|$ adierazpena $x-5$ da $x\\ge 5$ denean, eta $5-x$ $x<5$ denean.', 'El valor absoluto no cambia el signo de cada número suelto: $|x-5|$ es $x-5$ si $x\\ge 5$ y $5-x$ si $x<5$.', 'القيمة المطلقة لا تغيّر إشارة كل عدد وحده: $|x-5|$ تساوي $x-5$ إذا $x\\ge 5$ و$5-x$ إذا $x<5$.', 'The absolute value does not change the sign of each number on its own: $|x-5|$ is $x-5$ if $x\\ge 5$ and $5-x$ if $x<5$.')
        },
        check: {
            prompt: say('Zenbat balio du $y=|x^2-9|$ funtzioak $x=1$ denean?', '¿Cuánto vale $y=|x^2-9|$ en $x=1$?', 'كم تساوي $y=|x^2-9|$ عند $x=1$؟', 'What is $y=|x^2-9|$ at $x=1$?'),
            options: [same('$-8$'), same('$10$'), same('$8$')],
            correctIndex: 2,
            explanation: same('$1^2-9=-8\\ \\to\\ |-8|=8$')
        }
    }
}

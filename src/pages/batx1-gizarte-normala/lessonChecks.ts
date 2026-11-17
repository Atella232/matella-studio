import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'
import { above, below, between, tableLatex } from '../batx2-zientziak-banaketak/normal.ts'

/* ==========================================================================
   Normala · Batxilergoa 1 · Gizarte Zientziak — the typical mistake and
   the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics. The values
   of the normal table come from normal.ts (computed, never copied).
   ========================================================================== */

export type NormalBatx1gTopicId =
    | 'histogram' | 'standard-score'
    | 'density' | 'straight-density'
    | 'normal-curve' | 'sigma-rule' | 'standard-table' | 'table-symmetry' | 'standardize' | 'inverse'
    | 'binomial-to-normal' | 'continuity'
    | 'fit-parameters' | 'fit-expected' | 'fit-decision'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)
/** Table values, for LaTeX */
const P = (z: number) => tableLatex(below(z))
const Q = (z: number) => tableLatex(above(z))
const T = (tenThousandths: number) => tableLatex(tenThousandths)
/** z in braces, so that Basque never reads it as a case ending */
const Z = '{z}'

export const normalBatx1gLessonChecks: Record<NormalBatx1gTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Before you start ---------- */
    histogram: {
        mistake: {
            wrong: say('4 minutuko klase batek % 20 badu, haren barraren altuera 20 da.', 'Si una clase de 4 minutos tiene el 20 %, su barra mide 20 de alto.', 'إذا كان لفئة طولها 4 دقائق نسبة 20٪، فارتفاع عمودها 20.', 'If a 4-minute class has 20%, its bar is 20 tall.'),
            right: say('Azalera da ehunekoa: altuera = $\\frac{0{,}2}{4}=0{,}05$ minutu bakoitzeko.', 'Lo que vale el porcentaje es el área: altura = $\\frac{0{,}2}{4}=0{,}05$ por minuto.', 'المساحة هي النسبة: الارتفاع = $\\frac{0{,}2}{4}=0{,}05$ لكل دقيقة.', 'The area is the percentage: height = $\\frac{0{,}2}{4}=0{,}05$ per minute.')
        },
        check: {
            prompt: say('Histograma batean, 0 eta 10 arteko klaseak % 40 du. Zein da 0 eta 5 arteko probabilitatea, klasean berdin banatuta?', 'En un histograma, la clase de 0 a 10 tiene el 40 %. ¿Qué probabilidad hay entre 0 y 5, repartida por igual en la clase?', 'في مدرج تكراري للفئة من 0 إلى 10 نسبة 40٪. ما الاحتمال بين 0 و5 إذا توزعت الفئة بالتساوي؟', 'In a histogram, the class from 0 to 10 has 40%. What is the probability between 0 and 5, spread evenly in the class?'),
            options: [same('$0{,}4$'), same('$0{,}2$'), same('$0{,}5$')],
            correctIndex: 1,
            explanation: say('Klasearen erdia da, azaleraren erdia: $0{,}4\\div 2=0{,}2$.', 'Es media clase, medio área: $0{,}4\\div 2=0{,}2$.', 'إنها نصف الفئة، أي نصف المساحة: $0{,}4\\div 2=0{,}2$.', 'It is half the class, half the area: $0{,}4\\div 2=0{,}2$.')
        }
    },
    'standard-score': {
        mistake: {
            wrong: say('Batez bestekoa 60 eta $\\sigma=8$ badira, 72 balioak ${z}=\\frac{72-60}{64}$ du.', 'Si la media es 60 y $\\sigma=8$, 72 tiene ${z}=\\frac{72-60}{64}$.', 'إذا كان المتوسط 60 و$\\sigma=8$ فإن 72 له ${z}=\\frac{72-60}{64}$.', 'If the mean is 60 and $\\sigma=8$, 72 has ${z}=\\frac{72-60}{64}$.'),
            right: say('Desbideratzeaz zatitzen da, ez bariantzaz: ${z}=\\frac{72-60}{8}=1{,}5$.', 'Se divide entre la desviación, no entre la varianza: ${z}=\\frac{72-60}{8}=1{,}5$.', 'نقسم على الانحراف لا على التباين: ${z}=\\frac{72-60}{8}=1{,}5$.', 'Divide by the deviation, not the variance: ${z}=\\frac{72-60}{8}=1{,}5$.')
        },
        check: {
            prompt: say('Batez bestekoa 20 da, eta $\\sigma=4$. Zein da 14 balioaren puntuazio tipikoa?', 'La media es 20 y $\\sigma=4$. ¿Cuál es la puntuación típica de 14?', 'المتوسط 20 و$\\sigma=4$. ما الدرجة المعيارية للقيمة 14؟', 'The mean is 20 and $\\sigma=4$. What is the standard score of 14?'),
            options: [same('$1{,}5$'), same('$-6$'), same('$-1{,}5$')],
            correctIndex: 2,
            explanation: say('${z}=\\frac{14-20}{4}=-1{,}5$: batez bestekotik behera dago, $1{,}5$ desbideratzera.', '${z}=\\frac{14-20}{4}=-1{,}5$: está por debajo de la media, a $1{,}5$ desviaciones.', '${z}=\\frac{14-20}{4}=-1{,}5$: تحت المتوسط بمقدار $1{,}5$ انحراف.', '${z}=\\frac{14-20}{4}=-1{,}5$: it is below the mean, $1{,}5$ deviations away.')
        }
    },

    /* ---------- 2. Continuous variable ---------- */
    density: {
        mistake: {
            wrong: say('$f(x)=0{,}2$ dentsitatearekin, $P(X=4)=0{,}2$.', 'Con densidad $f(x)=0{,}2$, $P(X=4)=0{,}2$.', 'مع الكثافة $f(x)=0{,}2$ يكون $P(X=4)=0{,}2$.', 'With density $f(x)=0{,}2$, $P(X=4)=0{,}2$.'),
            right: say('Balio bakar baten gainean ez dago azalerarik: $P(X=4)=0$. Dentsitatea altuera bat da, ez probabilitate bat.', 'Sobre un solo valor no hay área: $P(X=4)=0$. La densidad es una altura, no una probabilidad.', 'لا مساحة فوق قيمة واحدة: $P(X=4)=0$. الكثافة ارتفاع لا احتمال.', 'There is no area over a single value: $P(X=4)=0$. The density is a height, not a probability.')
        },
        check: {
            prompt: say('Dentsitate batek $k$ balio du 0 eta 4 artean, eta 0 kanpoan. Zenbat da $k$?', 'Una densidad vale $k$ entre 0 y 4, y 0 fuera. ¿Cuánto vale $k$?', 'كثافة تساوي $k$ بين 0 و4، و0 خارج ذلك. كم يساوي $k$؟', 'A density is $k$ between 0 and 4, and 0 outside. What is $k$?'),
            options: [same('$4$'), same('$0{,}25$'), same('$1$')],
            correctIndex: 1,
            explanation: say('Azalera osoa 1 da: $4k=1$, $k=0{,}25$.', 'El área total es 1: $4k=1$, $k=0{,}25$.', 'المساحة الكلية 1: $4k=1$، $k=0{,}25$.', 'The total area is 1: $4k=1$, $k=0{,}25$.')
        }
    },
    'straight-density': {
        mistake: {
            wrong: say('$f(x)=kx$ 0 eta 2 artean: azalera $2\\cdot 2k=1$, beraz $k=0{,}25$.', '$f(x)=kx$ entre 0 y 2: el área es $2\\cdot 2k=1$, luego $k=0{,}25$.', '$f(x)=kx$ بين 0 و2: المساحة $2\\cdot 2k=1$، إذن $k=0{,}25$.', '$f(x)=kx$ between 0 and 2: the area is $2\\cdot 2k=1$, so $k=0{,}25$.'),
            right: say('Triangelu bat da, ez laukizuzen bat: $\\frac{2\\cdot 2k}{2}=1$, beraz $k=0{,}5$.', 'Es un triángulo, no un rectángulo: $\\frac{2\\cdot 2k}{2}=1$, luego $k=0{,}5$.', 'إنه مثلث لا مستطيل: $\\frac{2\\cdot 2k}{2}=1$، إذن $k=0{,}5$.', 'It is a triangle, not a rectangle: $\\frac{2\\cdot 2k}{2}=1$, so $k=0{,}5$.')
        },
        check: {
            prompt: say('$f(x)=\\frac{x}{2}$ 0 eta 2 artean. Zenbat da $P(X\\le 1)$?', '$f(x)=\\frac{x}{2}$ entre 0 y 2. ¿Cuánto vale $P(X\\le 1)$?', '$f(x)=\\frac{x}{2}$ بين 0 و2. كم يساوي $P(X\\le 1)$؟', '$f(x)=\\frac{x}{2}$ between 0 and 2. What is $P(X\\le 1)$?'),
            options: [same('$0{,}5$'), same('$0{,}75$'), same('$0{,}25$')],
            correctIndex: 2,
            explanation: say('Triangelu txiki bat: oinarria 1 eta altuera $0{,}5$, $\\frac{1\\cdot 0{,}5}{2}=0{,}25$. 0,5 tartearen erdia da, ez azaleraren erdia.', 'Un triángulo pequeño de base 1 y altura $0{,}5$: $\\frac{1\\cdot 0{,}5}{2}=0{,}25$. El 0,5 es la mitad del intervalo, no del área.', 'مثلث صغير قاعدته 1 وارتفاعه $0{,}5$: $\\frac{1\\cdot 0{,}5}{2}=0{,}25$. و0.5 نصف المجال لا نصف المساحة.', 'A small triangle with base 1 and height $0{,}5$: $\\frac{1\\cdot 0{,}5}{2}=0{,}25$. 0.5 is half the interval, not half the area.')
        }
    },

    /* ---------- 3. The normal ---------- */
    'normal-curve': {
        mistake: {
            wrong: say('$N(170;\\,8)$ eta $N(170;\\,4)$ kanpai berak dira, batez besteko bera dutelako.', '$N(170;\\,8)$ y $N(170;\\,4)$ son la misma campana, porque tienen la misma media.', '$N(170;\\,8)$ و$N(170;\\,4)$ الجرس نفسه لأن متوسطهما واحد.', '$N(170;\\,8)$ and $N(170;\\,4)$ are the same bell, because they have the same mean.'),
            right: say('Leku berean daude, baina $\\sigma=4$ duena estuagoa eta altuagoa da: datuak batez bestekotik hurbilago daude.', 'Están en el mismo sitio, pero la de $\\sigma=4$ es más estrecha y alta: los datos están más cerca de la media.', 'هما في الموضع نفسه، لكن ذا $\\sigma=4$ أضيق وأعلى: البيانات أقرب إلى المتوسط.', 'They are in the same place, but the one with $\\sigma=4$ is narrower and taller: the data are closer to the mean.')
        },
        check: {
            prompt: say('$X\\sim N(50;\\,6)$. Zenbat da $P(X\\le 50)$?', '$X\\sim N(50;\\,6)$. ¿Cuánto vale $P(X\\le 50)$?', '$X\\sim N(50;\\,6)$. كم يساوي $P(X\\le 50)$؟', '$X\\sim N(50;\\,6)$. What is $P(X\\le 50)$?'),
            options: [same('$0{,}5$'), same('$0{,}6$'), same('$1$')],
            correctIndex: 0,
            explanation: say('Kanpaia simetrikoa da batez bestekoaren inguruan: erdia alde bakoitzean.', 'La campana es simétrica alrededor de la media: la mitad a cada lado.', 'الجرس متماثل حول المتوسط: النصف في كل جهة.', 'The bell is symmetric about the mean: half on each side.')
        }
    },
    'sigma-rule': {
        mistake: {
            wrong: say('$\\mu$ eta $\\mu+\\sigma$ artean % 68,26 dago.', 'Entre $\\mu$ y $\\mu+\\sigma$ está el 68,26 %.', 'بين $\\mu$ و$\\mu+\\sigma$ تقع 68.26٪.', 'Between $\\mu$ and $\\mu+\\sigma$ lies 68.26%.'),
            right: say(`% 68,26 $\\mu-\\sigma$ eta $\\mu+\\sigma$ artean dago; erdia baino ez dago alde batean: $${T(between(-1, 1) / 2)}$.`, `El 68,26 % está entre $\\mu-\\sigma$ y $\\mu+\\sigma$; a un lado solo hay la mitad: $${T(between(-1, 1) / 2)}$.`, `68.26٪ بين $\\mu-\\sigma$ و$\\mu+\\sigma$؛ وفي جهة واحدة النصف فقط: $${T(between(-1, 1) / 2)}$.`, `68.26% lies between $\\mu-\\sigma$ and $\\mu+\\sigma$; on one side there is only half: $${T(between(-1, 1) / 2)}$.`)
        },
        check: {
            prompt: say('$X\\sim N(100;\\,15)$. Datuen zer ehuneko dago 70 eta 130 artean?', '$X\\sim N(100;\\,15)$. ¿Qué porcentaje de los datos queda entre 70 y 130?', '$X\\sim N(100;\\,15)$. ما النسبة المئوية للبيانات بين 70 و130؟', '$X\\sim N(100;\\,15)$. What percentage of the data lies between 70 and 130?'),
            options: [same('$68{,}26$'), same('$95{,}44$'), same('$47{,}72$')],
            correctIndex: 1,
            explanation: say('70 eta 130 $\\mu\\pm 2\\sigma$ dira: % 95,44. 47,72 alde bakarra litzateke.', '70 y 130 son $\\mu\\pm 2\\sigma$: el 95,44 %. 47,72 sería un solo lado.', '70 و130 هما $\\mu\\pm 2\\sigma$: أي 95.44٪. و47.72 جهة واحدة فقط.', '70 and 130 are $\\mu\\pm 2\\sigma$: 95.44%. 47.72 would be one side only.')
        }
    },
    'standard-table': {
        mistake: {
            wrong: say('$P(Z\\le 1{,}06)$ irakurtzeko, 1,0 errenkada eta 0,6 zutabea.', 'Para leer $P(Z\\le 1{,}06)$, fila 1,0 y columna 0,6.', 'لقراءة $P(Z\\le 1{,}06)$: الصف 1.0 والعمود 0.6.', 'To read $P(Z\\le 1{,}06)$, row 1.0 and column 0.6.'),
            right: say('Zutabeak ehunenak dira: 1,0 errenkada eta 0,06 zutabea.', 'Las columnas son las centésimas: fila 1,0 y columna 0,06.', 'الأعمدة هي أجزاء المئة: الصف 1.0 والعمود 0.06.', 'The columns are the hundredths: row 1.0 and column 0.06.')
        },
        check: {
            prompt: say('Taularekin, zenbat da $P(Z\\le 0{,}5)$?', 'Con la tabla, ¿cuánto vale $P(Z\\le 0{,}5)$?', 'بالجدول، كم يساوي $P(Z\\le 0{,}5)$؟', 'With the table, what is $P(Z\\le 0{,}5)$?'),
            options: [same('$0{,}5$'), same(`$${Q(0.5)}$`), same(`$${P(0.5)}$`)],
            correctIndex: 2,
            explanation: say(`0,5 errenkada eta 0,00 zutabea: $${P(0.5)}$.`, `Fila 0,5 y columna 0,00: $${P(0.5)}$.`, `الصف 0.5 والعمود 0.00: $${P(0.5)}$.`, `Row 0.5 and column 0.00: $${P(0.5)}$.`)
        }
    },
    'table-symmetry': {
        mistake: {
            wrong: say(`$P(Z\\le -1)=${P(1)}$, taulan 1 begiratuta.`, `$P(Z\\le -1)=${P(1)}$, mirando el 1 en la tabla.`, `$P(Z\\le -1)=${P(1)}$ بالنظر إلى 1 في الجدول.`, `$P(Z\\le -1)=${P(1)}$, looking up 1 in the table.`),
            right: say(`$-1$ puntuaren azpikoa $1$ puntuaren gainekoa da: $1-${P(1)}=${Q(1)}$.`, `Lo de debajo de $-1$ es lo de encima de $1$: $1-${P(1)}=${Q(1)}$.`, `ما تحت $-1$ هو ما فوق $1$: $1-${P(1)}=${Q(1)}$.`, `What lies below $-1$ is what lies above $1$: $1-${P(1)}=${Q(1)}$.`)
        },
        check: {
            prompt: say(`$P(Z\\le 2)=${P(2)}$ bada, zenbat da $P(Z>2)$?`, `Si $P(Z\\le 2)=${P(2)}$, ¿cuánto vale $P(Z>2)$?`, `إذا كان $P(Z\\le 2)=${P(2)}$ فكم يساوي $P(Z>2)$؟`, `If $P(Z\\le 2)=${P(2)}$, what is $P(Z>2)$?`),
            options: [same(`$${P(2)}$`), same(`$${Q(2)}$`), same('$0{,}5$')],
            correctIndex: 1,
            explanation: same(`$P(Z>2)=1-${P(2)}=${Q(2)}$`)
        }
    },
    standardize: {
        mistake: {
            wrong: say('$X\\sim N(250;\\,4)$ bada, $P(X\\le 256)=P(Z\\le 256)=1$.', 'Si $X\\sim N(250;\\,4)$, $P(X\\le 256)=P(Z\\le 256)=1$.', 'إذا كان $X\\sim N(250;\\,4)$ فإن $P(X\\le 256)=P(Z\\le 256)=1$.', 'If $X\\sim N(250;\\,4)$, $P(X\\le 256)=P(Z\\le 256)=1$.'),
            right: say(`Taula $N(0;\\,1)$ banaketarena da: lehenik tipifikatu, $${Z}=\\frac{256-250}{4}=1{,}5$, eta gero $${P(1.5)}$.`, `La tabla es la de $N(0;\\,1)$: primero se tipifica, $${Z}=\\frac{256-250}{4}=1{,}5$, y luego $${P(1.5)}$.`, `الجدول خاص بـ $N(0;\\,1)$: نوحّد أولًا، $${Z}=\\frac{256-250}{4}=1{,}5$، ثم $${P(1.5)}$.`, `The table is that of $N(0;\\,1)$: standardise first, $${Z}=\\frac{256-250}{4}=1{,}5$, and then $${P(1.5)}$.`)
        },
        check: {
            prompt: say('$X\\sim N(40;\\,5)$. Zein da 47 balioaren ${z}$?', '$X\\sim N(40;\\,5)$. ¿Cuál es la ${z}$ de 47?', '$X\\sim N(40;\\,5)$. ما ${z}$ للقيمة 47؟', '$X\\sim N(40;\\,5)$. What is the ${z}$ of 47?'),
            options: [same('$1{,}4$'), same('$7$'), same('$0{,}28$')],
            correctIndex: 0,
            explanation: same('${z}=\\frac{47-40}{5}=1{,}4$')
        }
    },
    inverse: {
        mistake: {
            wrong: say('% 10 onenaren muga bilatzeko, $P(Z\\le k)=0{,}1$ bilatzen da taulan.', 'Para el límite del 10 % mejor se busca $P(Z\\le k)=0{,}1$ en la tabla.', 'لحدّ أفضل 10٪ نبحث في الجدول عن $P(Z\\le k)=0{,}1$.', 'For the limit of the best 10%, look up $P(Z\\le k)=0{,}1$ in the table.'),
            right: say('% 10 onena gainetik dago: azpitik % 90 geratzen da, $P(Z\\le k)=0{,}9$, $k=1{,}28$.', 'El 10 % mejor está por encima: debajo queda el 90 %, $P(Z\\le k)=0{,}9$, $k=1{,}28$.', 'أفضل 10٪ فوق: يبقى تحته 90٪، $P(Z\\le k)=0{,}9$، $k=1{,}28$.', 'The best 10% lie above: 90% is below, $P(Z\\le k)=0{,}9$, $k=1{,}28$.')
        },
        check: {
            prompt: say(`$P(Z\\le k)=${P(0.67)}$ bada, zenbat da $k$?`, `Si $P(Z\\le k)=${P(0.67)}$, ¿cuánto vale $k$?`, `إذا كان $P(Z\\le k)=${P(0.67)}$ فكم يساوي $k$؟`, `If $P(Z\\le k)=${P(0.67)}$, what is $k$?`),
            options: [same('$-0{,}67$'), same('$0{,}67$'), same('$0{,}75$')],
            correctIndex: 1,
            explanation: say(`Taularen barruan, 0,6 errenkadan eta 0,07 zutabean dago: $k=0{,}67$.`, `Dentro de la tabla está en la fila 0,6 y la columna 0,07: $k=0{,}67$.`, `داخل الجدول في الصف 0.6 والعمود 0.07: $k=0{,}67$.`, `Inside the table it is in row 0.6 and column 0.07: $k=0{,}67$.`)
        }
    },

    /* ---------- 4. From the binomial to the normal ---------- */
    'binomial-to-normal': {
        mistake: {
            wrong: say('$B(100;\\,0{,}5)$ banaketa $N(50;\\,25)$ banaketaz hurbiltzen da.', '$B(100;\\,0{,}5)$ se aproxima por $N(50;\\,25)$.', 'يُقرَّب $B(100;\\,0{,}5)$ بـ $N(50;\\,25)$.', '$B(100;\\,0{,}5)$ is approximated by $N(50;\\,25)$.'),
            right: say('Normalaren bigarren zenbakia $\\sigma$ da, ez bariantza: $\\sigma=\\sqrt{25}=5$, $N(50;\\,5)$.', 'El segundo número de la normal es $\\sigma$, no la varianza: $\\sigma=\\sqrt{25}=5$, $N(50;\\,5)$.', 'العدد الثاني في الطبيعي هو $\\sigma$ لا التباين: $\\sigma=\\sqrt{25}=5$، $N(50;\\,5)$.', 'The second number of the normal is $\\sigma$, not the variance: $\\sigma=\\sqrt{25}=5$, $N(50;\\,5)$.')
        },
        check: {
            prompt: say('Zein binomial hurbil daiteke normal batez?', '¿Qué binomial se puede aproximar por una normal?', 'أي توزيع ثنائي يمكن تقريبه بتوزيع طبيعي؟', 'Which binomial can be approximated by a normal?'),
            options: [same('$B(20;\\,0{,}1)$'), same('$B(60;\\,0{,}5)$'), same('$B(100;\\,0{,}02)$')],
            correctIndex: 1,
            explanation: say('$B(60;\\,0{,}5)$: $np=30$ eta $nq=30$, biak 5 edo gehiago. Besteetan $np=2$ da.', '$B(60;\\,0{,}5)$: $np=30$ y $nq=30$, los dos de 5 o más. En las otras, $np=2$.', '$B(60;\\,0{,}5)$: $np=30$ و$nq=30$، وكلاهما 5 أو أكثر. وفي الأخريين $np=2$.', '$B(60;\\,0{,}5)$: $np=30$ and $nq=30$, both 5 or more. In the others $np=2$.')
        }
    },
    continuity: {
        mistake: {
            wrong: say('$P(X\\ge 58)\\approx P(Y\\ge 58{,}5)$.', '$P(X\\ge 58)\\approx P(Y\\ge 58{,}5)$.', '$P(X\\ge 58)\\approx P(Y\\ge 58{,}5)$.', '$P(X\\ge 58)\\approx P(Y\\ge 58{,}5)$.'),
            right: say('58 sartzen da, eta haren barra 57,5 puntuan hasten da: $P(Y\\ge 57{,}5)$.', 'El 58 entra, y su barra empieza en 57,5: $P(Y\\ge 57{,}5)$.', 'تدخل 58، ويبدأ عمودها عند 57.5: $P(Y\\ge 57{,}5)$.', '58 is included, and its bar starts at 57.5: $P(Y\\ge 57{,}5)$.')
        },
        check: {
            prompt: say('Zuzenketarekin, zein $a$ balioak betetzen du $P(X\\le 40)\\approx P(Y\\le a)$?', 'Con la corrección, ¿qué valor $a$ cumple $P(X\\le 40)\\approx P(Y\\le a)$?', 'مع التصحيح، ما القيمة $a$ التي تحقق $P(X\\le 40)\\approx P(Y\\le a)$؟', 'With the correction, which value $a$ satisfies $P(X\\le 40)\\approx P(Y\\le a)$?'),
            options: [same('$39{,}5$'), same('$40$'), same('$40{,}5$')],
            correctIndex: 2,
            explanation: say('40 balioaren barra 40,5 arte iristen da.', 'La barra del 40 llega hasta 40,5.', 'يصل عمود 40 إلى 40.5.', 'The bar of 40 reaches 40.5.')
        }
    },

    /* ---------- 5. Fitting a normal ---------- */
    'fit-parameters': {
        mistake: {
            wrong: say('150–160 klasearentzat, batez bestekoan 150 balioa erabiltzen da.', 'Para la clase 150–160, en la media se usa el 150.', 'للفئة 150–160 نستعمل 150 في المتوسط.', 'For the class 150–160, 150 is used in the mean.'),
            right: say('Klase-marka erabiltzen da, erdiko puntua: $\\frac{150+160}{2}=155$.', 'Se usa la marca de clase, el punto medio: $\\frac{150+160}{2}=155$.', 'نستعمل مركز الفئة، أي النقطة الوسطى: $\\frac{150+160}{2}=155$.', 'Use the class mark, the midpoint: $\\frac{150+160}{2}=155$.')
        },
        check: {
            prompt: say('Bi klase: 0–10 (5 datu) eta 10–20 (15 datu). Zenbat da $\\bar{x}$?', 'Dos clases: 0–10 (5 datos) y 10–20 (15 datos). ¿Cuánto vale $\\bar{x}$?', 'فئتان: 0–10 (5 معطيات) و10–20 (15 معطى). كم يساوي $\\bar{x}$؟', 'Two classes: 0–10 (5 data) and 10–20 (15 data). What is $\\bar{x}$?'),
            options: [same('$10$'), same('$12{,}5$'), same('$15$')],
            correctIndex: 1,
            explanation: same('$\\bar{x}=\\frac{5\\cdot 5+15\\cdot 15}{20}=\\frac{250}{20}=12{,}5$')
        }
    },
    'fit-expected': {
        mistake: {
            wrong: say('160–170 klasearentzat, klase-marka tipifikatzen da: $\\frac{165-170}{10}$.', 'Para la clase 160–170 se tipifica la marca: $\\frac{165-170}{10}$.', 'للفئة 160–170 نوحّد مركز الفئة: $\\frac{165-170}{10}$.', 'For the class 160–170, the mark is standardised: $\\frac{165-170}{10}$.'),
            right: say(`Klasearen probabilitatea bi muturren artekoa da: $P(-1\\le Z\\le 0)=${T(between(-1, 0))}$.`, `La probabilidad de la clase está entre sus dos extremos: $P(-1\\le Z\\le 0)=${T(between(-1, 0))}$.`, `احتمال الفئة بين طرفيها: $P(-1\\le Z\\le 0)=${T(between(-1, 0))}$.`, `The probability of the class lies between its two ends: $P(-1\\le Z\\le 0)=${T(between(-1, 0))}$.`)
        },
        check: {
            prompt: say(`200 datu dira, eta klase batek $${T(between(0, 1))}$ probabilitatea du. Zenbat datu espero dira?`, `Son 200 datos, y una clase tiene probabilidad $${T(between(0, 1))}$. ¿Cuántos datos se esperan?`, `هناك 200 معطى، ولفئة احتمال $${T(between(0, 1))}$. كم معطى يُتوقع؟`, `There are 200 data, and a class has probability $${T(between(0, 1))}$. How many data are expected?`),
            options: [same(`$${T(between(0, 1))}$`), same('$68{,}26$'), same('$34{,}13$')],
            correctIndex: 1,
            explanation: same(`$200\\cdot ${T(between(0, 1))}=68{,}26$`)
        }
    },
    'fit-decision': {
        mistake: {
            wrong: say('Diferentziarik handiena 9 denez, 5 baino handiagoa, doikuntza ez da onartzen.', 'Como la mayor diferencia es 9, mayor que 5, el ajuste se rechaza.', 'بما أن أكبر فرق 9، أكبر من 5، تُرفض المطابقة.', 'Since the largest difference is 9, bigger than 5, the fit is rejected.'),
            right: say('Guztizkoarekin alderatzen da: 400 datutan, $\\frac{9}{400}=0{,}0225$, % 5 baino gutxiago: onartzen da.', 'Se compara con el total: en 400 datos, $\\frac{9}{400}=0{,}0225$, menos del 5 %: se acepta.', 'نقارن بالكل: في 400 معطى، $\\frac{9}{400}=0{,}0225$، أقل من 5٪: تُقبل.', 'Compare with the total: in 400 data, $\\frac{9}{400}=0{,}0225$, less than 5%: it is accepted.')
        },
        check: {
            prompt: say('100 datutan, diferentziarik handiena 7 da. Doikuntza onartzen da?', 'En 100 datos, la mayor diferencia es 7. ¿Se acepta el ajuste?', 'في 100 معطى أكبر فرق 7. هل تُقبل المطابقة؟', 'In 100 data, the largest difference is 7. Is the fit accepted?'),
            options: [
                say('Bai: diferentziak beti txikiak dira.', 'Sí: las diferencias siempre son pequeñas.', 'نعم: الفروق صغيرة دائمًا.', 'Yes: the differences are always small.'),
                say('Ez: 7 guztizkoaren % 7 da, % 5 baino gehiago.', 'No: 7 es el 7 % del total, más del 5 %.', 'لا: 7 هو 7٪ من الكل، أكثر من 5٪.', 'No: 7 is 7% of the total, more than 5%.'),
                say('Ezin da jakin.', 'No se puede saber.', 'لا يمكن معرفة ذلك.', 'It cannot be told.')
            ],
            correctIndex: 1,
            explanation: say('$\\frac{7}{100}=0{,}07$, $0{,}05$ baino handiagoa: datuek ez diote normal horri jarraitzen.', '$\\frac{7}{100}=0{,}07$, mayor que $0{,}05$: los datos no siguen esa normal.', '$\\frac{7}{100}=0{,}07$، أكبر من $0{,}05$: البيانات لا تتبع ذلك التوزيع الطبيعي.', '$\\frac{7}{100}=0{,}07$, more than $0{,}05$: the data do not follow that normal.')
        }
    }
}

import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { EqualizationFigure, LinearSolutionsFigure, ReductionFigure, SubstitutionFigure, SystemProblemFigure, SystemTypesFigure } from '../dbh4-aplikatuak-ekuazioak/figures'
import {
    CoefficientsFigure,
    HalfPlaneFigure,
    HyperbolaFigure,
    LineCircleFigure,
    NonlinearProblemFigure,
    RegionFigure,
    RegionProblemFigure,
    SimplifyFirstFigure,
    SquaresReductionFigure
} from './figures'

/* ==========================================================================
   Sistemak · 4. DBH akademikoak — stages and lessons, following Santillana
   4.º Académicas unit 5 (systems solved graphically and classified, the
   three methods, systems with brackets and denominators, non-linear
   systems with squares, products, fractions and roots, inequalities in
   two unknowns and their systems, and problems: coins, two numbers, x² −
   y²) and the systems part of Anaya 4.º Académicas unit 3 (x + 5y = 7,
   3x − 5y = −26, 22x + 17y = 49, x − y = 15 with xy = 100, x² + y² = 41
   with x² − y² = 9). It builds on the systems of 4. DBH aplikatuak and
   goes further: the coefficient test and parameters, non-linear systems,
   and half-planes and regions.
   ========================================================================== */

export type SystemsStageId = 'linear' | 'methods' | 'nonlinear' | 'half-planes' | 'problems'

export const systemsStages: UnitStage[] = [
    { id: 'linear', tone: 'blue', title: { eu: 'Sistema linealak', es: 'Sistemas lineales', ar: 'الأنظمة الخطية' } },
    { id: 'methods', tone: 'violet', title: { eu: 'Ebazteko metodoak', es: 'Métodos de resolución', ar: 'طرق الحل' } },
    { id: 'nonlinear', tone: 'mustard', title: { eu: 'Sistema ez-linealak', es: 'Sistemas no lineales', ar: 'الأنظمة غير الخطية' } },
    { id: 'half-planes', tone: 'coral', title: { eu: 'Bi ezezaguneko inekuazioak', es: 'Inecuaciones con dos incógnitas', ar: 'متراجحات بمجهولين' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problemak', es: 'Problemas', ar: 'المسائل' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const systemsTopics: UnitTopic[] = [
    /* ---------- 1. Linear systems ---------- */
    {
        id: 'linear-equations',
        stage: 'linear',
        title: say('Bi ezezaguneko ekuazio linealak', 'Ecuaciones lineales con dos incógnitas', 'المعادلات الخطية بمجهولين'),
        goal: say('$ax+by=c$ ekuazio baten ebazpenak aurkitzea eta zuzen batean irudikatzea.', 'Encontrar soluciones de una ecuación $ax+by=c$ y representarlas en una recta.', 'إيجاد حلول معادلة $ax+by=c$ وتمثيلها بمستقيم.'),
        explanation: say(
            '$ax+by=c$ ekuazio baten ebazpena zenbaki-bikote bat da, $(x,y)$, ekuazioa betetzen duena. Infinitu daude: $x+y=5$ ekuazioak $(0,5)$, $(1,4)$, $(2,3)$… ditu, eta planoan zuzen bat osatzen dute. Bikote bat ebazpena den jakiteko, ordeztu: $(2,-1)$ puntua $3x+2y=4$ ekuazioaren ebazpena da, $6-2=4$ delako. Ebazpen bat aurkitzeko, eman balio bat ezezagun bati eta askatu bestea: $2x-y=3$ ekuazioan, $x=4$ bada, $8-y=3$ eta $y=5$. Zuzena marrazteko, bi puntu nahikoak dira, adibidez $x=0$ eta $y=0$ egitean ateratzen direnak.',
            'Una solución de $ax+by=c$ es una pareja de números $(x,y)$ que cumple la ecuación. Hay infinitas: $x+y=5$ tiene $(0,5)$, $(1,4)$, $(2,3)$…, y en el plano forman una recta. Para saber si una pareja es solución, sustituye: $(2,-1)$ es solución de $3x+2y=4$ porque $6-2=4$. Para encontrar una solución, da un valor a una incógnita y despeja la otra: en $2x-y=3$, si $x=4$, $8-y=3$ e $y=5$. Para dibujar la recta bastan dos puntos, por ejemplo los que salen al hacer $x=0$ e $y=0$.',
            'حل المعادلة $ax+by=c$ زوج من الأعداد $(x,y)$ يحقق المعادلة. وحلولها لا نهاية لها: للمعادلة $x+y=5$ الحلول $(0,5)$ و$(1,4)$ و$(2,3)$…، وتكوّن في المستوى مستقيمًا. ولمعرفة هل الزوج حل، عوّض: $(2,-1)$ حل للمعادلة $3x+2y=4$ لأن $6-2=4$. ولإيجاد حل، أعطِ قيمة لأحد المجهولين واعزل الآخر: في $2x-y=3$ إذا كان $x=4$ فإن $8-y=3$ و$y=5$. ويكفي لرسم المستقيم نقطتان، مثل الناتجتين عن $x=0$ و$y=0$.'
        ),
        problem: say('k-ren zein baliotarako da $(2,k)$ bikotea $3x-2y=8$ ekuazioaren ebazpena?', '¿Para qué valor de k es $(2,k)$ solución de $3x-2y=8$?', 'لأي قيمة لـ k يكون $(2,k)$ حلًّا للمعادلة $3x-2y=8$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu $x=2$ eta $y=k$.', 'Sustituye $x=2$ e $y=k$.', 'عوّض $x=2$ و$y=k$.'), math: same('$6-2k=8$') },
            { text: say('Askatu k.', 'Despeja k.', 'اعزل k.'), math: same('$-2k=2\\ \\to\\ k=-1$') }
        ],
        example: same('$x+y=5$'),
        takeaway: say('$AX+BY=C$: infinitu ebazpen, zuzen bat.', '$AX+BY=C$: infinitas soluciones, una recta.', '$AX+BY=C$: حلول لا نهاية لها، مستقيم.'),
        figure: (language) => <LinearSolutionsFigure language={language} />
    },
    {
        id: 'graphic',
        stage: 'linear',
        title: say('Ebazpen grafikoa', 'Resolución gráfica', 'الحل البياني'),
        goal: say('Sistema bat bi zuzen marraztuz ebaztea eta zenbat ebazpen dituen ikustea.', 'Resolver un sistema dibujando sus dos rectas y ver cuántas soluciones tiene.', 'حل نظام برسم مستقيميه ورؤية عدد حلوله.'),
        explanation: say(
            'Bi ezezaguneko bi ekuazioko sistema baten ebazpena bi ekuazioak batera betetzen dituen bikotea da: bi zuzenen ebaki-puntua. $x+y=4$ zuzenak $(0,4)$ eta $(4,0)$ puntuak ditu, eta $x-y=2$ zuzenak $(0,-2)$ eta $(2,0)$; $(3,1)$ puntuan ebakitzen dira, eta hori da ebazpena: $3+1=4$ eta $3-1=2$. Hiru gauza gerta daitezke: zuzenak ebakitzen dira (bateragarri determinatua, ebazpen bat), paraleloak dira (bateraezina, ebazpenik ez) edo bat datoz (bateragarri indeterminatua, infinitu ebazpen). $x+y=4$ eta $2x+2y=5$ paraleloak dira; $-x+y=5$ eta $x-y=-5$ zuzen bera dira.',
            'La solución de un sistema de dos ecuaciones con dos incógnitas es la pareja que cumple las dos a la vez: el punto de corte de las dos rectas. La recta $x+y=4$ pasa por $(0,4)$ y $(4,0)$, y $x-y=2$ por $(0,-2)$ y $(2,0)$; se cortan en $(3,1)$, que es la solución: $3+1=4$ y $3-1=2$. Pueden pasar tres cosas: las rectas se cortan (compatible determinado, una solución), son paralelas (incompatible, sin solución) o coinciden (compatible indeterminado, infinitas soluciones). $x+y=4$ y $2x+2y=5$ son paralelas; $-x+y=5$ y $x-y=-5$ son la misma recta.',
            'حل نظام من معادلتين بمجهولين هو الزوج الذي يحقق المعادلتين معًا: نقطة تقاطع المستقيمين. يمر المستقيم $x+y=4$ بـ$(0,4)$ و$(4,0)$، ويمر $x-y=2$ بـ$(0,-2)$ و$(2,0)$؛ ويتقاطعان في $(3,1)$ وهي الحل: $3+1=4$ و$3-1=2$. وقد يحدث أحد ثلاثة أمور: يتقاطع المستقيمان (متوافق محدد، حل واحد)، أو يتوازيان (غير متوافق، لا حل)، أو ينطبقان (متوافق غير محدد، حلول لا نهاية لها). $x+y=4$ و$2x+2y=5$ متوازيان؛ و$-x+y=5$ و$x-y=-5$ مستقيم واحد.'
        ),
        problem: say('Ebatzi grafikoki $2x+y=7$ eta $x-y=-1$. Zenbat da y?', 'Resuelve gráficamente $2x+y=7$ y $x-y=-1$. ¿Cuánto vale y?', 'حل بيانيًا $2x+y=7$ و$x-y=-1$. كم تساوي y؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen zuzenaren bi puntu.', 'Dos puntos de la primera recta.', 'نقطتان من المستقيم الأول.'), math: same('$(0,7),\\ (2,3)$') },
            { text: say('Bigarrenaren bi puntu.', 'Dos puntos de la segunda.', 'نقطتان من الثاني.'), math: same('$(0,1),\\ (2,3)$') },
            { text: say('Ebaki-puntua.', 'El punto de corte.', 'نقطة التقاطع.'), math: same('$(2,3)\\ \\to\\ y=3$') }
        ],
        example: same('$(3,1)$'),
        takeaway: say('Ebazpena: bi zuzenen ebaki-puntua.', 'La solución: el punto de corte de las dos rectas.', 'الحل: نقطة تقاطع المستقيمين.'),
        figure: (language) => <SystemTypesFigure language={language} />
    },
    {
        id: 'classify',
        stage: 'linear',
        title: say('Koefizienteekin sailkatzea', 'Clasificar con los coeficientes', 'التصنيف بالمعاملات'),
        goal: say('Sistema bat marraztu gabe sailkatzea eta parametro baten balioa aurkitzea.', 'Clasificar un sistema sin dibujarlo y hallar el valor de un parámetro.', 'تصنيف نظام دون رسمه وإيجاد قيمة وسيط.'),
        explanation: say(
            '$ax+by=c$ eta $a\'x+b\'y=c\'$ sistemarako, alderatu koefizienteen arteko zatidurak. $\\frac{a}{a\'}\\ne\\frac{b}{b\'}$ bada, bateragarri determinatua da: $2x+y=7$ eta $x-y=2$, $\\frac{2}{1}\\ne\\frac{1}{-1}$. $\\frac{a}{a\'}=\\frac{b}{b\'}\\ne\\frac{c}{c\'}$ bada, bateraezina: $x+2y=3$ eta $2x+4y=5$. Hirurak berdinak badira, bateragarri indeterminatua: $3x-y=2$ eta $6x-2y=4$, bigarrena lehena bider 2 baita. Horrela parametroak aurki daitezke: $x+2y=3$ eta $2x+my=5$ bateraezina da $\\frac{1}{2}=\\frac{2}{m}$ denean, hau da, $m=4$ denean, $\\frac{3}{5}\\ne\\frac{1}{2}$ delako.',
            'Para el sistema $ax+by=c$, $a\'x+b\'y=c\'$, compara los cocientes de los coeficientes. Si $\\frac{a}{a\'}\\ne\\frac{b}{b\'}$, es compatible determinado: $2x+y=7$ y $x-y=2$, $\\frac{2}{1}\\ne\\frac{1}{-1}$. Si $\\frac{a}{a\'}=\\frac{b}{b\'}\\ne\\frac{c}{c\'}$, incompatible: $x+2y=3$ y $2x+4y=5$. Si los tres son iguales, compatible indeterminado: $3x-y=2$ y $6x-2y=4$, porque la segunda es la primera por 2. Así se hallan parámetros: $x+2y=3$, $2x+my=5$ es incompatible cuando $\\frac{1}{2}=\\frac{2}{m}$, es decir, para $m=4$, ya que $\\frac{3}{5}\\ne\\frac{1}{2}$.',
            'للنظام $ax+by=c$ و$a\'x+b\'y=c\'$ قارن نسب المعاملات. إذا كان $\\frac{a}{a\'}\\ne\\frac{b}{b\'}$ فهو متوافق محدد: $2x+y=7$ و$x-y=2$، $\\frac{2}{1}\\ne\\frac{1}{-1}$. وإذا كان $\\frac{a}{a\'}=\\frac{b}{b\'}\\ne\\frac{c}{c\'}$ فهو غير متوافق: $x+2y=3$ و$2x+4y=5$. وإذا تساوت النسب الثلاث فهو متوافق غير محدد: $3x-y=2$ و$6x-2y=4$ لأن الثانية هي الأولى مضروبة في 2. وهكذا نجد الوسائط: النظام $x+2y=3$ و$2x+my=5$ غير متوافق عندما $\\frac{1}{2}=\\frac{2}{m}$، أي عندما $m=4$، لأن $\\frac{3}{5}\\ne\\frac{1}{2}$.'
        ),
        problem: say('m-ren zein baliotarako du infinitu ebazpen $2x-3y=1$, $4x+my=2$ sistemak?', '¿Para qué valor de m tiene infinitas soluciones el sistema $2x-3y=1$, $4x+my=2$?', 'لأي قيمة لـ m يكون للنظام $2x-3y=1$ و$4x+my=2$ حلول لا نهاية لها؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('a eta c-ren zatidurak.', 'Los cocientes de a y de c.', 'نسبتا a وc.'), math: same('$\\frac{2}{4}=\\frac{1}{2}$') },
            { text: say('b-rena ere berdina izan behar da.', 'El de b también tiene que ser igual.', 'ويجب أن تساويهما نسبة b.'), math: same('$\\frac{-3}{m}=\\frac{1}{2}\\ \\to\\ m=-6$') }
        ],
        example: same('$\\frac{a}{a\'}\\ne\\frac{b}{b\'}$'),
        takeaway: say('$\\frac{A}{A\'}=\\frac{B}{B\'}$: paraleloak edo zuzen bera.', '$\\frac{A}{A\'}=\\frac{B}{B\'}$: paralelas o la misma recta.', '$\\frac{A}{A\'}=\\frac{B}{B\'}$: متوازيان أو مستقيم واحد.'),
        figure: (language) => <CoefficientsFigure language={language} />
    },

    /* ---------- 2. Methods ---------- */
    {
        id: 'substitution',
        stage: 'methods',
        title: say('Ordezkapen-metodoa', 'Método de sustitución', 'طريقة التعويض'),
        goal: say('Ezezagun bat ekuazio batean askatu eta bestean ordeztuz sistemak ebaztea.', 'Resolver sistemas despejando una incógnita en una ecuación y sustituyéndola en la otra.', 'حل الأنظمة بعزل مجهول في معادلة وتعويضه في الأخرى.'),
        explanation: say(
            'Askatu ezezagun bat ekuazio batean, ordeztu bestean, eta ezezagun bakarreko ekuazio bat geratzen da. Komeni da koefizientea 1 edo $-1$ duena askatzea. $-x+3y=-4$ eta $5x+y=4$: lehenengotik $x=3y+4$; bigarrenean, $5(3y+4)+y=4$, $16y=-16$, $y=-1$; eta $x=3\\cdot(-1)+4=1$. Ebazpena $(1,-1)$ da. Zatikiak ager daitezke: $x+5y=7$ eta $3x-5y=11$ sisteman, $x=7-5y$, $3(7-5y)-5y=11$, $20y=10$, $y=\\frac{1}{2}$ eta $x=\\frac{9}{2}$. Bukaeran, egiaztatu bi ekuazioetan.',
            'Despeja una incógnita en una ecuación, sustitúyela en la otra y queda una ecuación con una sola incógnita. Conviene despejar la que tiene coeficiente 1 o $-1$. $-x+3y=-4$ y $5x+y=4$: de la primera, $x=3y+4$; en la segunda, $5(3y+4)+y=4$, $16y=-16$, $y=-1$; y $x=3\\cdot(-1)+4=1$. La solución es $(1,-1)$. Pueden salir fracciones: en $x+5y=7$, $3x-5y=11$, $x=7-5y$, $3(7-5y)-5y=11$, $20y=10$, $y=\\frac{1}{2}$ y $x=\\frac{9}{2}$. Al final, comprueba en las dos ecuaciones.',
            'اعزل مجهولًا في معادلة وعوّضه في الأخرى، فتبقى معادلة بمجهول واحد. ويُستحسن عزل ما معامله 1 أو $-1$. $-x+3y=-4$ و$5x+y=4$: من الأولى $x=3y+4$؛ وفي الثانية $5(3y+4)+y=4$ و$16y=-16$ و$y=-1$؛ ثم $x=3\\cdot(-1)+4=1$. فالحل $(1,-1)$. وقد تظهر كسور: في $x+5y=7$ و$3x-5y=11$ يكون $x=7-5y$ و$3(7-5y)-5y=11$ و$20y=10$، $y=\\frac{1}{2}$ و$x=\\frac{9}{2}$. وفي النهاية تحقّق في المعادلتين.'
        ),
        problem: say('Ebatzi ordezkapenez $x-2y=1$ eta $3x+y=17$.', 'Resuelve por sustitución $x-2y=1$ y $3x+y=17$.', 'حل بالتعويض $x-2y=1$ و$3x+y=17$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu x lehenengoan.', 'Despeja x en la primera.', 'اعزل x في الأولى.'), math: same('$x=2y+1$') },
            { text: say('Ordeztu bigarrenean.', 'Sustituye en la segunda.', 'عوّض في الثانية.'), math: same('$3(2y+1)+y=17\\ \\to\\ y=2$') },
            { text: say('Kalkulatu x.', 'Calcula x.', 'احسب x.'), math: same('$x=2\\cdot 2+1=5$') }
        ],
        example: same('$x=3y+4$'),
        takeaway: say('Askatu, ordeztu, ebatzi eta egiaztatu.', 'Despeja, sustituye, resuelve y comprueba.', 'اعزل وعوّض وحلّ وتحقّق.'),
        figure: (language) => <SubstitutionFigure language={language} />
    },
    {
        id: 'equalization',
        stage: 'methods',
        title: say('Berdinketa-metodoa', 'Método de igualación', 'طريقة المساواة'),
        goal: say('Ezezagun bera bi ekuazioetan askatu eta adierazpenak berdinduz sistemak ebaztea.', 'Resolver sistemas despejando la misma incógnita en las dos ecuaciones e igualando las expresiones.', 'حل الأنظمة بعزل المجهول نفسه في المعادلتين ومساواة العبارتين.'),
        explanation: say(
            'Askatu ezezagun bera bi ekuazioetan eta berdindu: biek balio bera dute. Erosoa da sistema dagoeneko $y=\\dots$ moduan badago: $y=2x-1$ eta $y=-x+5$ bada, $2x-1=-x+5$, $3x=6$, $x=2$ eta $y=3$. Bestela, lehenik askatu: $x+5y=7$ eta $3x-5y=11$ sisteman, $x=7-5y$ eta $x=\\frac{11+5y}{3}$; berdinduz, $21-15y=11+5y$, $y=\\frac{1}{2}$, eta $x=7-\\frac{5}{2}=\\frac{9}{2}$, ordezkapenez lortutako ebazpen bera. Grafikoki, bi zuzenen y-ak berdintzea da.',
            'Despeja la misma incógnita en las dos ecuaciones e iguala: las dos valen lo mismo. Es cómodo si el sistema ya viene en la forma $y=\\dots$: si $y=2x-1$ e $y=-x+5$, $2x-1=-x+5$, $3x=6$, $x=2$ e $y=3$. Si no, despeja primero: en $x+5y=7$, $3x-5y=11$, $x=7-5y$ y $x=\\frac{11+5y}{3}$; al igualar, $21-15y=11+5y$, $y=\\frac{1}{2}$, y $x=7-\\frac{5}{2}=\\frac{9}{2}$, la misma solución que por sustitución. Gráficamente, es igualar las y de las dos rectas.',
            'اعزل المجهول نفسه في المعادلتين وساوِ بينهما: فلهما القيمة نفسها. وهي مريحة إذا كان النظام على الصورة $y=\\dots$: إذا كان $y=2x-1$ و$y=-x+5$ فإن $2x-1=-x+5$ و$3x=6$، $x=2$ و$y=3$. وإلا فاعزل أولًا: في $x+5y=7$ و$3x-5y=11$ يكون $x=7-5y$ و$x=\\frac{11+5y}{3}$؛ وبالمساواة $21-15y=11+5y$، $y=\\frac{1}{2}$، و$x=7-\\frac{5}{2}=\\frac{9}{2}$، وهو الحل نفسه بالتعويض. وبيانيًا هي مساواة قيمتي y للمستقيمين.'
        ),
        problem: say('Ebatzi berdinketaz $x=2y+1$ eta $x=7-y$.', 'Resuelve por igualación $x=2y+1$ y $x=7-y$.', 'حل بالمساواة $x=2y+1$ و$x=7-y$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.'), math: same('$2y+1=7-y$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.'), math: same('$3y=6\\ \\to\\ y=2$') },
            { text: say('Kalkulatu x.', 'Calcula x.', 'احسب x.'), math: same('$x=7-2=5$') }
        ],
        example: same('$2x-1=-x+5$'),
        takeaway: say('Ezezagun bera bietan askatu eta berdindu.', 'Despeja la misma incógnita en las dos e iguala.', 'اعزل المجهول نفسه في الاثنتين وساوِ.'),
        figure: (language) => <EqualizationFigure language={language} />
    },
    {
        id: 'reduction',
        stage: 'methods',
        title: say('Laburketa-metodoa', 'Método de reducción', 'طريقة الحذف'),
        goal: say('Ekuazioak zenbakiz biderkatu eta batuz ezezagun bat desagerraraztea.', 'Multiplicar las ecuaciones por números y sumarlas para eliminar una incógnita.', 'ضرب المعادلتين في أعداد وجمعهما لحذف مجهول.'),
        explanation: say(
            'Biderkatu ekuazio bat edo biak, ezezagun baten koefizienteak aurkakoak izan daitezen, eta batu: ezezagun hori desagertzen da. $3x-5y=-26$ eta $4x+10y=32$: lehenengoa bider 2, $6x-10y=-52$; batuz, $10x=-20$, $x=-2$; eta $3\\cdot(-2)-5y=-26$, $y=4$. Koefizienteak handiak direnean ere balio du: $22x+17y=49$ eta $31x-26y=119$ sisteman, lehenengoa bider 26 eta bigarrena bider 17, $1\\,099x=3\\,297$, $x=3$ eta $y=-1$. Bigarren ezezaguna ere laburketaz atera daiteke, ordeztu beharrean.',
            'Multiplica una ecuación o las dos para que los coeficientes de una incógnita sean opuestos, y súmalas: esa incógnita desaparece. $3x-5y=-26$ y $4x+10y=32$: la primera por 2, $6x-10y=-52$; al sumar, $10x=-20$, $x=-2$; y $3\\cdot(-2)-5y=-26$, $y=4$. También sirve con coeficientes grandes: en $22x+17y=49$, $31x-26y=119$, la primera por 26 y la segunda por 17, $1\\,099x=3\\,297$, $x=3$ e $y=-1$. La segunda incógnita también se puede sacar por reducción, en vez de sustituir.',
            'اضرب إحدى المعادلتين أو كلتيهما ليصير معاملا مجهول متعاكسين، ثم اجمع: فيختفي ذلك المجهول. $3x-5y=-26$ و$4x+10y=32$: الأولى في 2، $6x-10y=-52$؛ وبالجمع $10x=-20$، $x=-2$؛ ثم $3\\cdot(-2)-5y=-26$، $y=4$. وتصلح أيضًا مع المعاملات الكبيرة: في $22x+17y=49$ و$31x-26y=119$ نضرب الأولى في 26 والثانية في 17، $1\\,099x=3\\,297$، $x=3$ و$y=-1$. ويمكن إيجاد المجهول الثاني بالحذف أيضًا بدل التعويض.'
        ),
        problem: say('Ebatzi laburketaz $2x+3y=12$ eta $5x-2y=11$.', 'Resuelve por reducción $2x+3y=12$ y $5x-2y=11$.', 'حل بالحذف $2x+3y=12$ و$5x-2y=11$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehena bider 2, bigarrena bider 3.', 'La primera por 2, la segunda por 3.', 'الأولى في 2 والثانية في 3.'), math: same('$4x+6y=24,\\ \\ 15x-6y=33$') },
            { text: say('Batu.', 'Suma.', 'اجمع.'), math: same('$19x=57\\ \\to\\ x=3$') },
            { text: say('Kalkulatu y.', 'Calcula y.', 'احسب y.'), math: same('$6+3y=12\\ \\to\\ y=2$') }
        ],
        example: same('$10x=-20$'),
        takeaway: say('Koefizienteak aurkakoak egin eta batu.', 'Haz opuestos los coeficientes y suma.', 'اجعل المعاملين متعاكسين واجمع.'),
        figure: (language) => <ReductionFigure language={language} />
    },
    {
        id: 'simplify-first',
        stage: 'methods',
        title: say('Parentesiak eta izendatzaileak', 'Paréntesis y denominadores', 'الأقواس والمقامات'),
        goal: say('Ekuazioak $ax+by=c$ moduan idaztea sistema ebatzi aurretik.', 'Escribir las ecuaciones en la forma $ax+by=c$ antes de resolver el sistema.', 'كتابة المعادلتين على الصورة $ax+by=c$ قبل حل النظام.'),
        explanation: say(
            'Ekuazioek parentesiak edo izendatzaileak badituzte, lehenik sinplifikatu: kendu parentesiak, biderkatu izendatzaileen m.k.t.-az eta pasatu ezezagunak ezkerrera. $3x-2(y-1)=y-x+1$ ekuazioa $4x-3y=-1$ bihurtzen da, eta $2x-y=x+y-9$ ekuazioa $x-2y=-9$; ebazpena $x=5$, $y=7$. Izendatzaileekin: $\\frac{x}{5}-\\frac{y}{4}=4$, bider 20, $4x-5y=80$; $-2(x+y)=1-\\frac{x}{2}$, bider 2, $-3x-4y=2$; laburketaz, $x=10$ eta $y=-8$. Egiaztatu beti hasierako ekuazioetan: $\\frac{10}{5}-\\frac{-8}{4}=2+2=4$.',
            'Si las ecuaciones tienen paréntesis o denominadores, simplifica primero: quita paréntesis, multiplica por el m.c.m. de los denominadores y pasa las incógnitas a la izquierda. $3x-2(y-1)=y-x+1$ queda $4x-3y=-1$, y $2x-y=x+y-9$ queda $x-2y=-9$; la solución es $x=5$, $y=7$. Con denominadores: $\\frac{x}{5}-\\frac{y}{4}=4$, por 20, $4x-5y=80$; $-2(x+y)=1-\\frac{x}{2}$, por 2, $-3x-4y=2$; por reducción, $x=10$ e $y=-8$. Comprueba siempre en las ecuaciones iniciales: $\\frac{10}{5}-\\frac{-8}{4}=2+2=4$.',
            'إذا كان في المعادلتين أقواس أو مقامات فبسّط أولًا: أزل الأقواس، واضرب في المضاعف المشترك الأصغر للمقامات، وانقل المجهولين إلى اليسار. $3x-2(y-1)=y-x+1$ تصبح $4x-3y=-1$، و$2x-y=x+y-9$ تصبح $x-2y=-9$؛ والحل $x=5$ و$y=7$. ومع المقامات: $\\frac{x}{5}-\\frac{y}{4}=4$ في 20، $4x-5y=80$؛ و$-2(x+y)=1-\\frac{x}{2}$ في 2، $-3x-4y=2$؛ وبالحذف $x=10$ و$y=-8$. وتحقّق دائمًا في المعادلتين الأصليتين: $\\frac{10}{5}-\\frac{-8}{4}=2+2=4$.'
        ),
        problem: say('Ebatzi $\\frac{x}{2}+\\frac{y}{3}=4$ eta $2(x-y)=x-4$.', 'Resuelve $\\frac{x}{2}+\\frac{y}{3}=4$ y $2(x-y)=x-4$.', 'حل $\\frac{x}{2}+\\frac{y}{3}=4$ و$2(x-y)=x-4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehena bider 6.', 'La primera por 6.', 'الأولى في 6.'), math: same('$3x+2y=24$') },
            { text: say('Bigarrena, parentesirik gabe.', 'La segunda, sin paréntesis.', 'الثانية دون أقواس.'), math: same('$x-2y=-4$') },
            { text: say('Batu.', 'Suma.', 'اجمع.'), math: same('$4x=20\\ \\to\\ x=5,\\ y=\\frac{9}{2}$') }
        ],
        example: same('$4x-5y=80$'),
        takeaway: say('Lehenik $AX+BY=C$, gero metodoa.', 'Primero $AX+BY=C$, después el método.', 'أولًا $AX+BY=C$، ثم الطريقة.'),
        figure: (language) => <SimplifyFirstFigure language={language} />
    },

    /* ---------- 3. Non-linear systems ---------- */
    {
        id: 'line-curve',
        stage: 'nonlinear',
        title: say('Lehen mailakoa eta bigarren mailakoa', 'Una de primer grado y otra de segundo', 'معادلة من الدرجة الأولى وأخرى من الثانية'),
        goal: say('Ekuazio bat lineala eta bestea bigarren mailakoa duten sistemak ordezkapenez ebaztea.', 'Resolver por sustitución sistemas con una ecuación lineal y otra de segundo grado.', 'حل أنظمة فيها معادلة خطية وأخرى من الدرجة الثانية بالتعويض.'),
        explanation: say(
            'Sistema bat ez-lineala da ekuazioren batek $x^{2}$, $y^{2}$, $xy$, zatikiak edo erroak dituenean. Bat lineala bada, askatu ezezagun bat hartan eta ordeztu bestean: bigarren mailako ekuazio bat geratzen da, bi ebazpenekin gehienez. $x^{2}+y^{2}=25$ eta $x+y=7$: $y=7-x$, $x^{2}+(7-x)^{2}=25$, $2x^{2}-14x+24=0$, hau da, $x^{2}-7x+12=0$; $x=3$ edo $x=4$, eta ebazpenak $(3,4)$ eta $(4,3)$ dira. x bakoitzarekin, kalkulatu bere y ekuazio linealean. Grafikoki, zirkunferentziaren eta zuzenaren ebaki-puntuak dira; ebaki-punturik ez badago, ebazpenik ez.',
            'Un sistema es no lineal cuando alguna ecuación tiene $x^{2}$, $y^{2}$, $xy$, fracciones o raíces. Si una es lineal, despeja una incógnita en ella y sustitúyela en la otra: queda una ecuación de segundo grado, con dos soluciones como mucho. $x^{2}+y^{2}=25$ y $x+y=7$: $y=7-x$, $x^{2}+(7-x)^{2}=25$, $2x^{2}-14x+24=0$, es decir, $x^{2}-7x+12=0$; $x=3$ o $x=4$, y las soluciones son $(3,4)$ y $(4,3)$. Con cada x, calcula su y en la ecuación lineal. Gráficamente, son los puntos de corte de la circunferencia y la recta; si no se cortan, no hay solución.',
            'يكون النظام غير خطي إذا كان في إحدى معادلتيه $x^{2}$ أو $y^{2}$ أو $xy$ أو كسور أو جذور. وإذا كانت إحداهما خطية فاعزل فيها مجهولًا وعوّضه في الأخرى: تبقى معادلة من الدرجة الثانية لها حلّان على الأكثر. $x^{2}+y^{2}=25$ و$x+y=7$: $y=7-x$ و$x^{2}+(7-x)^{2}=25$ و$2x^{2}-14x+24=0$، أي $x^{2}-7x+12=0$؛ $x=3$ أو $x=4$، والحلان $(3,4)$ و$(4,3)$. ومع كل x احسب y الخاص به في المعادلة الخطية. وبيانيًا هي نقاط تقاطع الدائرة والمستقيم؛ وإذا لم يتقاطعا فلا حل.'
        ),
        problem: say('Ebatzi $y=x^{2}-1$ eta $y=x+1$. Zein da y-ren baliorik handiena?', 'Resuelve $y=x^{2}-1$ e $y=x+1$. ¿Cuál es el mayor valor de y?', 'حل $y=x^{2}-1$ و$y=x+1$. ما أكبر قيمة لـ y؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.'), math: same('$x^{2}-1=x+1\\ \\to\\ x^{2}-x-2=0$') },
            { text: say('Bi x.', 'Dos x.', 'قيمتان لـ x.'), math: same('$x=2,\\ x=-1$') },
            { text: say('Haien y-ak.', 'Sus y.', 'قيمتا y.'), math: same('$(2,3),\\ (-1,0)\\ \\to\\ y=3$') }
        ],
        example: same('$x^{2}+(7-x)^{2}=25$'),
        takeaway: say('Askatu linealean eta ordeztu: bi ebazpen gehienez.', 'Despeja en la lineal y sustituye: como mucho dos soluciones.', 'اعزل في الخطية وعوّض: حلّان على الأكثر.'),
        figure: (language) => <LineCircleFigure language={language} />
    },
    {
        id: 'squares',
        stage: 'nonlinear',
        title: say('Karratuak laburketaz', 'Cuadrados por reducción', 'المربعات بالحذف'),
        goal: say('$x^{2}$ eta $y^{2}$ dituzten sistemak laburketaz ebaztea eta ebazpen guztiak idaztea.', 'Resolver por reducción sistemas con $x^{2}$ e $y^{2}$ y escribir todas las soluciones.', 'حل أنظمة فيها $x^{2}$ و$y^{2}$ بالحذف وكتابة كل الحلول.'),
        explanation: say(
            'Bi ekuazioek $x^{2}$ eta $y^{2}$ bakarrik badituzte, tratatu ezezagun berri gisa eta erabili laburketa. $x^{2}+y^{2}=41$ eta $x^{2}-y^{2}=9$: batuz, $2x^{2}=50$, $x^{2}=25$, $x=\\pm 5$; eta $25+y^{2}=41$, $y^{2}=16$, $y=\\pm 4$. Zeinu guztiak konbina daitezke: lau ebazpen, $(5,4)$, $(5,-4)$, $(-5,4)$ eta $(-5,-4)$. Kontuz karratu negatiboekin: $x^{2}=-4$ ateratzen bada, ez dago x errealik. $xy$ gaia badago, askatu: $x-y=15$ eta $xy=100$ sisteman, $x=y+15$, $y^{2}+15y-100=0$, $y=5$ edo $y=-20$; ebazpenak $(20,5)$ eta $(-5,-20)$.',
            'Si las dos ecuaciones solo tienen $x^{2}$ e $y^{2}$, trátalas como incógnitas nuevas y usa reducción. $x^{2}+y^{2}=41$ y $x^{2}-y^{2}=9$: al sumar, $2x^{2}=50$, $x^{2}=25$, $x=\\pm 5$; y $25+y^{2}=41$, $y^{2}=16$, $y=\\pm 4$. Todos los signos se combinan: cuatro soluciones, $(5,4)$, $(5,-4)$, $(-5,4)$ y $(-5,-4)$. Cuidado con los cuadrados negativos: si sale $x^{2}=-4$, no hay x real. Si aparece $xy$, despeja: en $x-y=15$, $xy=100$, $x=y+15$, $y^{2}+15y-100=0$, $y=5$ o $y=-20$; las soluciones son $(20,5)$ y $(-5,-20)$.',
            'إذا لم يكن في المعادلتين إلا $x^{2}$ و$y^{2}$ فعاملهما كمجهولين جديدين واستعمل الحذف. $x^{2}+y^{2}=41$ و$x^{2}-y^{2}=9$: بالجمع $2x^{2}=50$ و$x^{2}=25$، $x=\\pm 5$؛ و$25+y^{2}=41$ و$y^{2}=16$، $y=\\pm 4$. وتجتمع كل الإشارات: أربعة حلول، $(5,4)$ و$(5,-4)$ و$(-5,4)$ و$(-5,-4)$. وانتبه للمربعات السالبة: إذا ظهر $x^{2}=-4$ فلا يوجد x حقيقي. وإذا ظهر $xy$ فاعزل: في $x-y=15$ و$xy=100$ يكون $x=y+15$ و$y^{2}+15y-100=0$، $y=5$ أو $y=-20$؛ والحلان $(20,5)$ و$(-5,-20)$.'
        ),
        problem: say('Zenbat ebazpen ditu $x^{2}+y^{2}=13$, $x^{2}-y^{2}=5$ sistemak?', '¿Cuántas soluciones tiene el sistema $x^{2}+y^{2}=13$, $x^{2}-y^{2}=5$?', 'كم حلًّا للنظام $x^{2}+y^{2}=13$ و$x^{2}-y^{2}=5$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu.', 'Suma.', 'اجمع.'), math: same('$2x^{2}=18\\ \\to\\ x=\\pm 3$') },
            { text: say('Kalkulatu y.', 'Calcula y.', 'احسب y.'), math: same('$9+y^{2}=13\\ \\to\\ y=\\pm 2$') },
            { text: say('Konbinatu zeinuak: lau.', 'Combina los signos: cuatro.', 'اجمع الإشارات: أربعة.'), math: same('$(\\pm 3,\\pm 2)$') }
        ],
        example: same('$2x^{2}=50$'),
        takeaway: say('$X^{2}=K$: $X=\\pm\\sqrt{K}$; zeinu guztiak konbinatu.', '$X^{2}=K$: $X=\\pm\\sqrt{K}$; combina todos los signos.', '$X^{2}=K$: $X=\\pm\\sqrt{K}$؛ اجمع كل الإشارات.'),
        figure: (language) => <SquaresReductionFigure language={language} />
    },
    {
        id: 'check-solutions',
        stage: 'nonlinear',
        title: say('Biderkadurak, zatikiak eta erroak', 'Productos, fracciones y raíces', 'الجداءات والكسور والجذور'),
        goal: say('$xy$, zatikiak edo erroak dituzten sistemak ebaztea eta ebazpen faltsuak baztertzea.', 'Resolver sistemas con $xy$, fracciones o raíces y descartar las soluciones falsas.', 'حل أنظمة فيها $xy$ أو كسور أو جذور واستبعاد الحلول الزائفة.'),
        explanation: say(
            'Metodoa berdina da: askatu eta ordeztu. $xy=6$ eta $x-y=1$: $y=x-1$, $x(x-1)=6$, $x^{2}-x-6=0$, $x=3$ edo $x=-2$; ebazpenak $(3,2)$ eta $(-2,-3)$. Zatikiekin, biderkatu izendatzaileez eta baztertu izendatzaile bat 0 egiten duten bikoteak. Erroekin, karratura jasotzean ebazpen faltsuak ager daitezke: $\\sqrt{x-2}=y+2$ eta $2x-3=2-y$ sisteman, $y=5-2x$, $\\sqrt{x-2}=7-2x$, eta karratura jasoz $4x^{2}-29x+51=0$, $x=3$ edo $x=\\frac{17}{4}$. $x=\\frac{17}{4}$ denean, $y=-\\frac{7}{2}$ eta $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}\\ne -\\frac{3}{2}$: faltsua da. Ebazpen bakarra $(3,-1)$ da.',
            'El método es el mismo: despeja y sustituye. $xy=6$ y $x-y=1$: $y=x-1$, $x(x-1)=6$, $x^{2}-x-6=0$, $x=3$ o $x=-2$; las soluciones son $(3,2)$ y $(-2,-3)$. Con fracciones, multiplica por los denominadores y descarta las parejas que anulan alguno. Con raíces, al elevar al cuadrado pueden aparecer soluciones falsas: en $\\sqrt{x-2}=y+2$, $2x-3=2-y$, $y=5-2x$, $\\sqrt{x-2}=7-2x$, y al elevar al cuadrado $4x^{2}-29x+51=0$, $x=3$ o $x=\\frac{17}{4}$. Para $x=\\frac{17}{4}$, $y=-\\frac{7}{2}$ y $\\sqrt{\\frac{9}{4}}=\\frac{3}{2}\\ne -\\frac{3}{2}$: es falsa. La única solución es $(3,-1)$.',
            'الطريقة نفسها: اعزل وعوّض. $xy=6$ و$x-y=1$: $y=x-1$ و$x(x-1)=6$ و$x^{2}-x-6=0$، $x=3$ أو $x=-2$؛ والحلان $(3,2)$ و$(-2,-3)$. ومع الكسور اضرب في المقامات واستبعد الأزواج التي تعدم أحدها. ومع الجذور قد تظهر حلول زائفة عند التربيع: في $\\sqrt{x-2}=y+2$ و$2x-3=2-y$ يكون $y=5-2x$ و$\\sqrt{x-2}=7-2x$، وبالتربيع $4x^{2}-29x+51=0$، $x=3$ أو $x=\\frac{17}{4}$. وعندما $x=\\frac{17}{4}$ يكون $y=-\\frac{7}{2}$ و$\\sqrt{\\frac{9}{4}}=\\frac{3}{2}\\ne -\\frac{3}{2}$: فهو زائف. والحل الوحيد $(3,-1)$.'
        ),
        problem: say('Ebatzi $x+y=5$ eta $xy=6$. Zein da x-ren baliorik handiena?', 'Resuelve $x+y=5$ y $xy=6$. ¿Cuál es el mayor valor de x?', 'حل $x+y=5$ و$xy=6$. ما أكبر قيمة لـ x؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu eta ordeztu.', 'Despeja y sustituye.', 'اعزل وعوّض.'), math: same('$y=5-x\\ \\to\\ x(5-x)=6$') },
            { text: say('Bigarren mailakoa.', 'La de segundo grado.', 'معادلة الدرجة الثانية.'), math: same('$x^{2}-5x+6=0\\ \\to\\ x=2,\\ x=3$') },
            { text: say('Ebazpenak.', 'Las soluciones.', 'الحلول.'), math: same('$(2,3),\\ (3,2)\\ \\to\\ x=3$') }
        ],
        example: same('$x(x-1)=6$'),
        takeaway: say('Erroak edo zatikiak: egiaztatu ebazpen bakoitza.', 'Raíces o fracciones: comprueba cada solución.', 'جذور أو كسور: تحقّق من كل حل.'),
        figure: (language) => <HyperbolaFigure language={language} />
    },

    /* ---------- 4. Inequalities in two unknowns ---------- */
    {
        id: 'half-plane',
        stage: 'half-planes',
        title: say('Bi ezezaguneko inekuazioak', 'Inecuaciones con dos incógnitas', 'المتراجحات بمجهولين'),
        goal: say('$ax+by\\le c$ moduko inekuazio baten ebazpena erdiplano gisa irudikatzea.', 'Representar la solución de una inecuación $ax+by\\le c$ como un semiplano.', 'تمثيل حل متراجحة $ax+by\\le c$ بنصف مستوى.'),
        explanation: say(
            '$ax+by=c$ zuzenak planoa bi erdiplanotan banatzen du: batean $ax+by<c$ da, eta bestean $ax+by>c$. Ebazteko: marraztu muga-zuzena, aukeratu zuzenean ez dagoen proba-puntu bat (normalean $(0,0)$) eta begiratu betetzen duen. $2x+y\\le 4$: zuzenak $(0,4)$ eta $(2,0)$ puntuak ditu; $(0,0)$ puntuan, $0\\le 4$, beraz ebazpena $(0,0)$ duen erdiplanoa da. $x+2y\\le -1$ inekuazioan, $(0,0)$ puntuan $0\\le -1$ ez da betetzen: ebazpena beste erdiplanoa da. $\\le$ edo $\\ge$ bada, zuzena ebazpenaren barruan dago; $<$ edo $>$ bada, ez, eta marra etenaz marrazten da. Zuzena $(0,0)$ puntutik pasatzen bada, hartu beste puntu bat, adibidez $(1,0)$.',
            'La recta $ax+by=c$ divide el plano en dos semiplanos: en uno $ax+by<c$ y en el otro $ax+by>c$. Para resolver: dibuja la recta frontera, elige un punto de prueba que no esté en ella (normalmente $(0,0)$) y mira si la cumple. $2x+y\\le 4$: la recta pasa por $(0,4)$ y $(2,0)$; en $(0,0)$, $0\\le 4$, así que la solución es el semiplano que contiene $(0,0)$. En $x+2y\\le -1$, $(0,0)$ no la cumple, $0\\le -1$ es falso: la solución es el otro semiplano. Con $\\le$ o $\\ge$ la recta forma parte de la solución; con $<$ o $>$, no, y se dibuja discontinua. Si la recta pasa por $(0,0)$, toma otro punto, por ejemplo $(1,0)$.',
            'يقسم المستقيم $ax+by=c$ المستوى إلى نصفين: في أحدهما $ax+by<c$ وفي الآخر $ax+by>c$. وللحل: ارسم المستقيم الحدّي، واختر نقطة اختبار ليست عليه (عادةً $(0,0)$) وانظر هل تحققها. $2x+y\\le 4$: يمر المستقيم بـ$(0,4)$ و$(2,0)$؛ وفي $(0,0)$ يكون $0\\le 4$، فالحل نصف المستوى الذي يحوي $(0,0)$. وفي $x+2y\\le -1$ لا تحققها $(0,0)$ لأن $0\\le -1$ خطأ: فالحل نصف المستوى الآخر. ومع $\\le$ أو $\\ge$ يكون المستقيم من الحل؛ ومع $<$ أو $>$ لا يكون، ويُرسم متقطعًا. وإذا مر المستقيم بـ$(0,0)$ فخذ نقطة أخرى، مثل $(1,0)$.'
        ),
        problem: say('$(3,-1)$ puntua $2x-3y>8$ inekuazioaren ebazpena al da?', '¿Es el punto $(3,-1)$ solución de $2x-3y>8$?', 'هل النقطة $(3,-1)$ حل للمتراجحة $2x-3y>8$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu.', 'Sustituye.', 'عوّض.'), math: same('$2\\cdot 3-3\\cdot(-1)=6+3=9$') },
            { text: say('Alderatu: bai, ebazpena da.', 'Compara: sí, es solución.', 'قارن: نعم، هي حل.'), math: same('$9>8$') }
        ],
        example: same('$2x+y\\le 4$'),
        takeaway: say('Muga-zuzena eta proba-puntua: erdiplano bat.', 'Recta frontera y punto de prueba: un semiplano.', 'مستقيم حدّي ونقطة اختبار: نصف مستوى.'),
        figure: (language) => <HalfPlaneFigure language={language} />
    },
    {
        id: 'region',
        stage: 'half-planes',
        title: say('Bi ezezaguneko inekuazio-sistemak', 'Sistemas de inecuaciones con dos incógnitas', 'أنظمة المتراجحات بمجهولين'),
        goal: say('Inekuazio-sistema baten ebazpena erdiplanoen zati komun gisa irudikatzea eta haren erpinak aurkitzea.', 'Representar la solución de un sistema de inecuaciones como la parte común de los semiplanos y hallar sus vértices.', 'تمثيل حل نظام متراجحات بالجزء المشترك بين أنصاف المستويات وإيجاد رؤوسه.'),
        explanation: say(
            'Ebatzi inekuazio bakoitza bere erdiplanoarekin; sistemaren ebazpena guztien zati komuna da, eskualde bat. $y\\ge 1$, $x\\le 4$ eta $y\\le x$: lehenengoa $y=1$ zuzenaren gainean dago, bigarrena $x=4$ zuzenaren ezkerrean eta hirugarrena $y=x$ zuzenaren azpian. Zati komuna triangelu bat da, eta haren erpinak muga-zuzenen ebaki-puntuak dira, bi ekuazioko sistemak ebatziz: $y=1$ eta $y=x$, $(1,1)$; $y=1$ eta $x=4$, $(4,1)$; $x=4$ eta $y=x$, $(4,4)$. Eskualdeak ez du zertan itxia izan, eta erdiplanoek zati komunik ez badute, sistemak ez du ebazpenik.',
            'Resuelve cada inecuación con su semiplano; la solución del sistema es la parte común de todos, una región. $y\\ge 1$, $x\\le 4$ e $y\\le x$: la primera está por encima de la recta $y=1$, la segunda a la izquierda de $x=4$ y la tercera por debajo de $y=x$. La parte común es un triángulo, y sus vértices son los cortes de las rectas frontera, resolviendo sistemas de dos ecuaciones: $y=1$ e $y=x$, $(1,1)$; $y=1$ y $x=4$, $(4,1)$; $x=4$ e $y=x$, $(4,4)$. La región no tiene por qué ser cerrada, y si los semiplanos no tienen parte común, el sistema no tiene solución.',
            'حلّ كل متراجحة بنصف مستواها؛ وحل النظام هو الجزء المشترك بينها كلها، أي منطقة. $y\\ge 1$ و$x\\le 4$ و$y\\le x$: الأولى فوق المستقيم $y=1$، والثانية يسار $x=4$، والثالثة تحت $y=x$. والجزء المشترك مثلث، ورؤوسه نقاط تقاطع المستقيمات الحدّية، بحل أنظمة من معادلتين: $y=1$ و$y=x$، $(1,1)$؛ و$y=1$ و$x=4$، $(4,1)$؛ و$x=4$ و$y=x$، $(4,4)$. وليس بالضرورة أن تكون المنطقة مغلقة، وإذا لم يكن لأنصاف المستويات جزء مشترك فلا حل للنظام.'
        ),
        problem: say('$x+y\\le 4$, $x\\ge 0$, $y\\ge 0$. Zenbat puntu ditu eskualdeak koordenatu osoekin?', '$x+y\\le 4$, $x\\ge 0$, $y\\ge 0$. ¿Cuántos puntos de coordenadas enteras tiene la región?', '$x+y\\le 4$ و$x\\ge 0$ و$y\\ge 0$. كم نقطة إحداثياتها صحيحة في المنطقة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Triangelua: $(0,0)$, $(4,0)$, $(0,4)$.', 'El triángulo: $(0,0)$, $(4,0)$, $(0,4)$.', 'المثلث: $(0,0)$ و$(4,0)$ و$(0,4)$.'), math: same('$x+y\\le 4$') },
            { text: say('Zutabeka zenbatu.', 'Cuenta por columnas.', 'عُدّ عمودًا عمودًا.'), math: same('$5+4+3+2+1=15$') }
        ],
        example: same('$(1,1),\\ (4,1),\\ (4,4)$'),
        takeaway: say('Sistemaren ebazpena: erdiplanoen zati komuna.', 'La solución del sistema: la parte común de los semiplanos.', 'حل النظام: الجزء المشترك بين أنصاف المستويات.'),
        figure: (language) => <RegionFigure language={language} />
    },

    /* ---------- 5. Problems ---------- */
    {
        id: 'linear-problems',
        stage: 'problems',
        title: say('Sistema linealen problemak', 'Problemas con sistemas lineales', 'مسائل بالأنظمة الخطية'),
        goal: say('Bi ezezaguneko problemak sistema lineal batekin planteatu eta ebaztea.', 'Plantear y resolver problemas con dos incógnitas mediante un sistema lineal.', 'صياغة مسائل بمجهولين وحلها بنظام خطي.'),
        explanation: say(
            'Izendatu bi ezezagunak, idatzi testuaren bi baldintzak ekuazio gisa, ebatzi eta egiaztatu testuan. Taula batek asko laguntzen du. 20 buru eta 56 hanka dituzten oiloak eta untxiak: $x+y=20$ eta $2x+4y=56$; laburketaz, $y=8$ eta $x=12$. Luisak 1 eta 2 euroko 20 txanpon ditu, guztira 25 €: $x+y=20$ eta $x+2y=25$, beraz $y=5$ eta $x=15$. Zenbakiek zentzua izan behar dute: txanpon kopuru negatibo batek edo hamartarrak dituen batek planteamenduan edo kalkuluetan akats bat dagoela adierazten du.',
            'Nombra las dos incógnitas, escribe como ecuaciones las dos condiciones del enunciado, resuelve y comprueba en el enunciado. Una tabla ayuda mucho. Gallinas y conejos con 20 cabezas y 56 patas: $x+y=20$ y $2x+4y=56$; por reducción, $y=8$ y $x=12$. Luisa lleva 20 monedas de 1 € y de 2 €, 25 € en total: $x+y=20$ y $x+2y=25$, así que $y=5$ y $x=15$. Los números tienen que tener sentido: un número de monedas negativo o con decimales indica un error en el planteamiento o en las cuentas.',
            'سمِّ المجهولين، واكتب شرطي النص معادلتين، ثم حلّ وتحقّق في النص. والجدول يساعد كثيرًا. دجاج وأرانب لها 20 رأسًا و56 رجلًا: $x+y=20$ و$2x+4y=56$؛ وبالحذف $y=8$ و$x=12$. مع لويزا 20 قطعة نقدية من فئتي 1 € و2 € مجموعها 25 €: $x+y=20$ و$x+2y=25$، إذن $y=5$ و$x=15$. ويجب أن يكون للأعداد معنى: عدد قطع سالب أو بفاصلة يدل على خطأ في الصياغة أو في الحساب.'
        ),
        problem: say('Kontzertu baterako 120 sarrera saldu dira, batzuk 15 €-tan eta besteak 10 €-tan, guztira 1 550 €. Zenbat saldu dira 15 €-tan?', 'Para un concierto se han vendido 120 entradas, unas a 15 € y otras a 10 €, por 1 550 € en total. ¿Cuántas se han vendido a 15 €?', 'بيعت لحفلة 120 تذكرة، بعضها بـ15 € والباقي بـ10 €، بمجموع 1 550 €. كم تذكرة بيعت بـ15 €؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sistema.', 'El sistema.', 'النظام.'), math: same('$x+y=120,\\ \\ 15x+10y=1\\,550$') },
            { text: say('Lehena bider 10 eta kendu.', 'La primera por 10 y resta.', 'الأولى في 10 ثم اطرح.'), math: same('$5x=350\\ \\to\\ x=70$') },
            { text: say('Egiaztatu.', 'Comprueba.', 'تحقّق.'), math: same('$70\\cdot 15+50\\cdot 10=1\\,550$') }
        ],
        example: same('$x+y=20$'),
        takeaway: say('Izendatu, idatzi, ebatzi eta egiaztatu testuan.', 'Nombra, escribe, resuelve y comprueba en el enunciado.', 'سمِّ واكتب وحلّ وتحقّق في النص.'),
        figure: (language) => <SystemProblemFigure language={language} />
    },
    {
        id: 'nonlinear-problems',
        stage: 'problems',
        title: say('Sistema ez-linealen problemak', 'Problemas con sistemas no lineales', 'مسائل بالأنظمة غير الخطية'),
        goal: say('Azalerak, Pitagoras edo biderkadurak dituzten problemak sistema ez-lineal batekin ebaztea.', 'Resolver con un sistema no lineal problemas de áreas, de Pitágoras o de productos.', 'حل مسائل المساحات وفيثاغورس والجداءات بنظام غير خطي.'),
        explanation: say(
            'Azalerak, Pitagorasen teoremak edo biderkadurek bigarren mailako ekuazioak ematen dituzte. Laukizuzen baten perimetroa 34 cm da eta diagonala 13 cm: $x+y=17$ eta $x^{2}+y^{2}=169$; ordezkatuz, $x^{2}-17x+60=0$, $x=12$ edo $x=5$: aldeak 12 eta 5 cm. Bi zenbakiren batura 27 da eta haien karratuen kendura 81: $x+y=27$ eta $x^{2}-y^{2}=81$; $(x+y)(x-y)=81$ denez, $x-y=3$, eta zenbakiak 15 eta 12 dira. Baztertu testuan zentzurik ez duten ebazpenak: luzera negatiboak edo zenbaki osoak izan behar duten zatikiak.',
            'Las áreas, el teorema de Pitágoras o los productos dan ecuaciones de segundo grado. Un rectángulo tiene 34 cm de perímetro y 13 cm de diagonal: $x+y=17$ y $x^{2}+y^{2}=169$; al sustituir, $x^{2}-17x+60=0$, $x=12$ o $x=5$: los lados miden 12 y 5 cm. Dos números suman 27 y la diferencia de sus cuadrados es 81: $x+y=27$ y $x^{2}-y^{2}=81$; como $(x+y)(x-y)=81$, $x-y=3$, y los números son 15 y 12. Descarta las soluciones sin sentido en el enunciado: longitudes negativas o fracciones donde tiene que haber números enteros.',
            'تعطي المساحات ونظرية فيثاغورس والجداءات معادلات من الدرجة الثانية. مستطيل محيطه 34 سم وقطره 13 سم: $x+y=17$ و$x^{2}+y^{2}=169$؛ وبالتعويض $x^{2}-17x+60=0$، $x=12$ أو $x=5$: فضلعاه 12 و5 سم. عددان مجموعهما 27 والفرق بين مربعيهما 81: $x+y=27$ و$x^{2}-y^{2}=81$؛ وبما أن $(x+y)(x-y)=81$ فإن $x-y=3$، والعددان 15 و12. واستبعد الحلول التي لا معنى لها في النص: الأطوال السالبة أو الكسور حيث يجب أن تكون الأعداد صحيحة.'
        ),
        problem: say('Laukizuzen baten azalera 48 cm² da eta perimetroa 28 cm. Zenbat neurtzen du alderik luzeenak?', 'Un rectángulo tiene 48 cm² de área y 28 cm de perímetro. ¿Cuánto mide el lado mayor?', 'مستطيل مساحته 48 سم² ومحيطه 28 سم. كم طول ضلعه الأكبر؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Sistema.', 'El sistema.', 'النظام.'), math: same('$x+y=14,\\ \\ xy=48$') },
            { text: say('Ordeztu.', 'Sustituye.', 'عوّض.'), math: same('$x(14-x)=48\\ \\to\\ x^{2}-14x+48=0$') },
            { text: say('Aldeak.', 'Los lados.', 'الضلعان.'), math: same('$x=8,\\ x=6\\ \\to\\ 8$ cm') }
        ],
        example: same('$x^{2}+y^{2}=169$'),
        takeaway: say('Pitagoras eta azalerak: sistema ez-lineala.', 'Pitágoras y áreas: un sistema no lineal.', 'فيثاغورس والمساحات: نظام غير خطي.'),
        figure: (language) => <NonlinearProblemFigure language={language} />
    },
    {
        id: 'region-problems',
        stage: 'problems',
        title: say('Inekuazioekin problemak', 'Problemas con inecuaciones', 'مسائل بالمتراجحات'),
        goal: say('Mugak dituzten egoerak bi ezezaguneko inekuazioekin adieraztea eta aukera posibleak aztertzea.', 'Expresar situaciones con límites mediante inecuaciones con dos incógnitas y estudiar las opciones posibles.', 'التعبير عن مواقف لها حدود بمتراجحات بمجهولين ودراسة الخيارات الممكنة.'),
        explanation: say(
            '«Gehienez», «gutxienez» edo «ez gainditu» esaten denean, inekuazioak agertzen dira. 12 € ditugu 3 €-ko ogitartekoak eta 2 €-ko freskagarriak erosteko: $3x+2y\\le 12$, eta gainera $x\\ge 0$ eta $y\\ge 0$. Eskualdea triangelu bat da, erpinak $(0,0)$, $(4,0)$ eta $(0,6)$ dituena, eta kopuruak osoak direnez, eskualdeko puntu osoak bakarrik balio dute: 19 aukera. Galdera bat erantzuteko, aztertu puntu horiek: gehienez 6 artikulu eros daitezke, $(0,6)$; eta ogitarteko bat gutxienez nahi badugu, gehienez 4 freskagarri, $(1,4)$.',
            'Cuando se dice «como mucho», «al menos» o «no pasar de», aparecen inecuaciones. Tenemos 12 € para comprar bocadillos de 3 € y refrescos de 2 €: $3x+2y\\le 12$, y además $x\\ge 0$ e $y\\ge 0$. La región es un triángulo de vértices $(0,0)$, $(4,0)$ y $(0,6)$, y como las cantidades son enteras, solo valen los puntos enteros de la región: 19 opciones. Para responder una pregunta, estudia esos puntos: como mucho se pueden comprar 6 artículos, $(0,6)$; y si queremos al menos un bocadillo, como mucho 4 refrescos, $(1,4)$.',
            'عندما يقال «على الأكثر» أو «على الأقل» أو «لا يتجاوز» تظهر المتراجحات. معنا 12 € لشراء شطائر بـ3 € ومشروبات بـ2 €: $3x+2y\\le 12$، وأيضًا $x\\ge 0$ و$y\\ge 0$. والمنطقة مثلث رؤوسه $(0,0)$ و$(4,0)$ و$(0,6)$، وبما أن الكميات صحيحة فلا تصلح إلا النقاط الصحيحة من المنطقة: 19 خيارًا. وللإجابة عن سؤال ادرس هذه النقاط: يمكن شراء 6 قطع على الأكثر، $(0,6)$؛ وإذا أردنا شطيرة على الأقل فأربعة مشروبات على الأكثر، $(1,4)$.'
        ),
        problem: say('Kamioi batek gehienez 10 tona eraman ditzake, 2 tonako kutxa handiak eta tona bateko kutxa txikiak. 3 kutxa handi badaramatza, gehienez zenbat txiki?', 'Un camión lleva como mucho 10 toneladas, en cajas grandes de 2 toneladas y pequeñas de 1 tonelada. Si lleva 3 grandes, ¿cuántas pequeñas como máximo?', 'تحمل شاحنة 10 أطنان على الأكثر في صناديق كبيرة وزنها طنّان وصغيرة وزنها طن. إذا حملت 3 كبيرة فكم صغيرة على الأكثر؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Inekuazioa.', 'La inecuación.', 'المتراجحة.'), math: same('$2x+y\\le 10$') },
            { text: say('Ordeztu $x=3$.', 'Sustituye $x=3$.', 'عوّض $x=3$.'), math: same('$6+y\\le 10\\ \\to\\ y\\le 4$') }
        ],
        example: same('$3x+2y\\le 12$'),
        takeaway: say('Mugak: inekuazioak; kopuru osoak: eskualdeko puntu osoak.', 'Límites: inecuaciones; cantidades enteras: los puntos enteros de la región.', 'الحدود: متراجحات؛ الكميات الصحيحة: النقاط الصحيحة من المنطقة.'),
        figure: (language) => <RegionProblemFigure language={language} />
    }
]

import type { LocalizedText, UnitTopic } from '../../features/unit-v2/types'
import { bachSystemsTopics } from '../batx1-zientziak-sistemak/lessons'
import { LessonRegion } from './figures'
import { programazioaLessonChecks, type ProgramazioaTopicId } from './lessonChecks'
import { programazioaLessonTexts } from './lessonTexts'
import type { ProgramazioaStageId } from './stages'

/* ==========================================================================
   Programazio lineala · Batxilergoa 2 · Gizarte Zientziak — the lessons.
   The scope follows unit 4 of Santillana 2.º Bachillerato CCSS and unit 4
   of Anaya Matemáticas Aplicadas a las CCSS II, and the problem of linear
   programming of every Basque university entrance exam. There is no
   twin: as the owner chose (2026-11-18), the two lessons of half-planes
   and regions come from 1.º Ciencias as they are (imported, never copied
   or edited, with the stage of this unit) and the other nine are this
   unit's own: constraints, vertices, whole-number points, level lines,
   the method of the vertices, kinds of solution and three problems.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
const sistemak1 = (topic: string, title: LocalizedText) => ({ unit: 'batx1-zientziak/sistemas', topic, title })

/** The lessons of this unit without what they tell, which lives in lessonTexts.ts */
const ownTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'constraints',
        stage: 'regions',
        title: say('Enuntziatu baten murrizketak', 'Las restricciones de un enunciado', 'قيود نص المسألة', 'The constraints of a statement'),
        goal: say('Problema baten baldintzak inekuazio gisa idaztea: «gehienez» $\\le$ da, «gutxienez» $\\ge$.', 'Escribir las condiciones de un problema como inecuaciones: «como mucho» es $\\le$ y «al menos» es $\\ge$.', 'كتابة شروط مسألة على شكل متراجحات: «على الأكثر» هي $\\le$ و«على الأقل» هي $\\ge$.', 'Write the conditions of a problem as inequalities: «at most» is $\\le$ and «at least» is $\\ge$.'),
        problem: say(
            'Lantegi batek $x$ mahai eta $y$ aulki egiten ditu. Mahai bakoitzak 2 ordu behar ditu, eta aulki bakoitzak ordu bat; gehienez 40 ordu daude. Gutxienez 5 mahai egin behar dira. Idatzi murrizketak.',
            'Un taller hace $x$ mesas e $y$ sillas. Cada mesa necesita 2 horas y cada silla, 1; hay como mucho 40 horas. Hay que hacer al menos 5 mesas. Escribe las restricciones.',
            'تصنع ورشة $x$ طاولة و$y$ كرسيًا. تحتاج كل طاولة ساعتين وكل كرسي ساعة؛ وتتوفر 40 ساعة على الأكثر. ويجب صنع 5 طاولات على الأقل. اكتب القيود.',
            'A workshop makes $x$ tables and $y$ chairs. Each table needs 2 hours and each chair 1; there are at most 40 hours. At least 5 tables must be made. Write the constraints.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezin da mahai edo aulki negatiborik egin.', 'No se hacen mesas ni sillas negativas.', 'لا تُصنع طاولات أو كراسٍ سالبة.', 'No negative tables or chairs are made.'), math: same('$x\\ge 0,\\quad y\\ge 0$') },
            { text: say('Orduak: mahaiak $2x$ eta aulkiak $y$; «gehienez 40»: $\\le$.', 'Horas: las mesas, $2x$, y las sillas, $y$; «como mucho 40»: $\\le$.', 'الساعات: الطاولات $2x$ والكراسي $y$؛ «على الأكثر 40»: $\\le$.', 'Hours: the tables $2x$ and the chairs $y$; «at most 40»: $\\le$.'), math: same('$2x+y\\le 40$') },
            { text: say('«Gutxienez 5 mahai»: $\\ge$.', '«Al menos 5 mesas»: $\\ge$.', '«5 طاولات على الأقل»: $\\ge$.', '«At least 5 tables»: $\\ge$.'), math: same('$x\\ge 5$') }
        ],
        takeaway: say(
            'Izendatu aldagaiak, eta idatzi baldintza bakoitza inekuazio gisa: «gehienez», «ez gehiago» edo «ez du gainditzen» $\\le$ da; «gutxienez» edo «ez gutxiago» $\\ge$. Gehitu beti $x\\ge 0$ eta $y\\ge 0$.',
            'Nombra las variables y escribe cada condición como inecuación: «como mucho», «no más de» o «no supera» es $\\le$; «al menos» o «no menos de» es $\\ge$. Añade siempre $x\\ge 0$ e $y\\ge 0$.',
            'سمِّ المتغيرات واكتب كل شرط متراجحة: «على الأكثر» أو «لا أكثر من» أو «لا يتجاوز» هي $\\le$؛ و«على الأقل» أو «لا أقل من» هي $\\ge$. وأضف دائمًا $x\\ge 0$ و$y\\ge 0$.',
            'Name the variables and write each condition as an inequality: «at most», «no more than» or «does not exceed» is $\\le$; «at least» or «no less than» is $\\ge$. Always add $x\\ge 0$ and $y\\ge 0$.'
        ),
        figure: (language) => <LessonRegion setup="constraints" language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'vertices',
        stage: 'feasible',
        title: say('Eskualde bideragarriaren erpinak', 'Los vértices de la región factible', 'رؤوس المنطقة الممكنة', 'The vertices of the feasible region'),
        goal: say('Eskualde bideragarria marraztea eta haren erpinak aurkitzea, muga-zuzenen ebaki-puntuak kalkulatuz.', 'Dibujar la región factible y hallar sus vértices, calculando los cortes de las rectas frontera.', 'رسم المنطقة الممكنة وإيجاد رؤوسها بحساب نقاط تقاطع المستقيمات الحدّية.', 'Draw the feasible region and find its vertices by working out where the boundary lines cross.'),
        needs: [sistemak1('half-plane-regions', { eu: 'Erdiplanoak eta eskualdeak', es: 'Semiplanos y regiones', en: 'Half-planes and regions', ar: 'أنصاف المستويات والمناطق' })],
        problem: say('Aurkitu $x+y\\le 6$, $x+2y\\le 8$, $x\\ge 0$ eta $y\\ge 0$ eskualdearen erpinak.', 'Halla los vértices de la región $x+y\\le 6$, $x+2y\\le 8$, $x\\ge 0$, $y\\ge 0$.', 'أوجد رؤوس المنطقة $x+y\\le 6$ و$x+2y\\le 8$ و$x\\ge 0$ و$y\\ge 0$.', 'Find the vertices of the region $x+y\\le 6$, $x+2y\\le 8$, $x\\ge 0$, $y\\ge 0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ardatzekin: $x+y=6$ zuzenak $(6,0)$ puntuan mozten du, eta $x+2y=8$ zuzenak $(0,4)$ puntuan.', 'Con los ejes: $x+y=6$ corta en $(6,0)$ y $x+2y=8$, en $(0,4)$.', 'مع المحورين: يقطع $x+y=6$ في $(6,0)$ و$x+2y=8$ في $(0,4)$.', 'With the axes: $x+y=6$ cuts at $(6,0)$ and $x+2y=8$ at $(0,4)$.'), math: same('$6+0=6,\\qquad 0+2\\cdot 4=8$') },
            { text: say('Bi zuzenen arteko ebaki-puntua: sistema bat. Kendu lehen ekuazioa bigarrenari.', 'El corte entre las dos rectas: un sistema. Resta la primera ecuación a la segunda.', 'تقاطع المستقيمين: نظام. اطرح المعادلة الأولى من الثانية.', 'Where the two lines cross: a system. Subtract the first equation from the second.'), math: same('$\\begin{cases}x+y=6\\\\ x+2y=8\\end{cases}\\ \\to\\ y=2,\\ x=4$') },
            { text: say('Puntu horiek murrizketa guztiak betetzen dituzte. $(8,0)$ eta $(0,6)$ ez: kanpoan daude.', 'Esos puntos cumplen todas las restricciones. $(8,0)$ y $(0,6)$ no: están fuera.', 'تحقق هذه النقاط كل القيود. أما $(8,0)$ و$(0,6)$ فلا: هما خارجها.', 'Those points satisfy every constraint. $(8,0)$ and $(0,6)$ do not: they are outside.'), math: same('$(0,0),\\ (6,0),\\ (4,2),\\ (0,4)$') }
        ],
        takeaway: say(
            'Erpinak muga-zuzenen ebaki-puntuak dira, ardatzekin eta beren artean, baina murrizketa guztiak betetzen dituztenak bakarrik. Bi zuzenen ebaki-puntua bi ekuazioko sistema bat ebatziz aurkitzen da.',
            'Los vértices son los cortes de las rectas frontera, con los ejes y entre ellas, pero solo los que cumplen todas las restricciones. El corte de dos rectas se halla resolviendo un sistema de dos ecuaciones.',
            'الرؤوس نقاط تقاطع المستقيمات الحدّية مع المحورين وفيما بينها، لكن فقط تلك التي تحقق كل القيود. وتقاطع مستقيمين يوجد بحل نظام من معادلتين.',
            'The vertices are where the boundary lines cross, with the axes and with each other, but only those that satisfy every constraint. Where two lines cross is found by solving a system of two equations.'
        ),
        figure: (language) => <LessonRegion setup="vertices" language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'integer-points',
        stage: 'feasible',
        title: say('Soluzio osoak', 'Soluciones enteras', 'الحلول الصحيحة', 'Whole-number solutions'),
        goal: say('Aldagaiak unitate osoak direnean, eskualdeko puntu osoak zenbatzea eta zerrendatzea.', 'Cuando las variables son unidades enteras, contar y listar los puntos enteros de la región.', 'عندما تكون المتغيرات وحدات كاملة، عدّ النقاط الصحيحة في المنطقة وسردها.', 'When the variables are whole units, count and list the whole points of the region.'),
        problem: say(
            'Talde batek $x$ kotxe eta $y$ furgoneta alokatzen ditu. Garajean $x+2y\\le 6$ leku daude, eta gutxienez furgoneta bat behar da. Zenbat aukera daude?',
            'Un grupo alquila $x$ coches e $y$ furgonetas. En el garaje caben $x+2y\\le 6$ plazas y hace falta al menos una furgoneta. ¿Cuántas posibilidades hay?',
            'تستأجر مجموعة $x$ سيارة و$y$ شاحنة صغيرة. يتسع المرآب لـ $x+2y\\le 6$ أماكن، وتلزم شاحنة واحدة على الأقل. كم احتمالًا يوجد؟',
            'A group hires $x$ cars and $y$ vans. The garage has room for $x+2y\\le 6$, and at least one van is needed. How many options are there?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('$y=1$ denean, $x\\le 4$: bost aukera, $x$ 0 eta 4 artean.', 'Con $y=1$, $x\\le 4$: cinco posibilidades, $x$ de 0 a 4.', 'مع $y=1$ يكون $x\\le 4$: خمسة احتمالات، $x$ من 0 إلى 4.', 'With $y=1$, $x\\le 4$: five options, $x$ from 0 to 4.'), math: same('$x+2\\cdot 1\\le 6\\ \\to\\ x\\le 4$') },
            { text: say('$y=2$ denean, $x\\le 2$: hiru aukera. $y=3$ denean, $x=0$ bakarrik.', 'Con $y=2$, $x\\le 2$: tres. Con $y=3$, solo $x=0$.', 'مع $y=2$ يكون $x\\le 2$: ثلاثة. ومع $y=3$ فقط $x=0$.', 'With $y=2$, $x\\le 2$: three. With $y=3$, only $x=0$.'), math: same('$x+2\\cdot 2\\le 6\\ \\to\\ x\\le 2$') },
            { text: say('Batu: 9 aukera daude.', 'Suma: hay 9 posibilidades.', 'اجمع: هناك 9 احتمالات.', 'Add up: there are 9 options.'), math: same('$5+3+1=9$') }
        ],
        takeaway: say(
            'Aldagaiak unitate osoak direnean (kotxeak, pertsonak, kutxak), soluzioak eskualdeko puntu osoak dira. Zenbatzeko, hartu aldagai baten balio bakoitza, kontatu bestearen balio osoak eta batu.',
            'Cuando las variables son unidades enteras (coches, personas, cajas), las soluciones son los puntos enteros de la región. Para contarlas, toma cada valor de una variable, cuenta los valores enteros de la otra y suma.',
            'عندما تكون المتغيرات وحدات كاملة (سيارات، أشخاص، صناديق) تكون الحلول النقاط الصحيحة في المنطقة. ولعدّها خذ كل قيمة لمتغير، وعدّ القيم الصحيحة للآخر، ثم اجمع.',
            'When the variables are whole units (cars, people, boxes), the solutions are the whole points of the region. To count them, take each value of one variable, count the whole values of the other and add up.'
        ),
        figure: (language) => <LessonRegion setup="integers" language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'level-lines',
        stage: 'objective',
        title: say('Helburu-funtzioa eta maila-zuzenak', 'La función objetivo y las rectas de nivel', 'دالة الهدف ومستقيمات المستوى', 'The objective function and level lines'),
        goal: say('$F(x,y)=ax+by$ funtzioaren maila-zuzenak paraleloan mugitzea, eta eskualdea uzten duten azken puntuan optimoa aurkitzea.', 'Desplazar en paralelo las rectas de nivel de $F(x,y)=ax+by$ y hallar el óptimo en el último punto en que dejan la región.', 'تحريك مستقيمات المستوى لـ $F(x,y)=ax+by$ موازية لنفسها، وإيجاد القيمة المثلى عند آخر نقطة تغادر فيها المنطقة.', 'Move the level lines of $F(x,y)=ax+by$ parallel to themselves and find the optimum at the last point where they leave the region.'),
        problem: say('$x+y\\le 6$ eta $x+2y\\le 8$ eskualdean ($x,y\\ge 0$), non da maximoa $F=3x+2y$ funtzioarentzat?', 'En la región $x+y\\le 6$, $x+2y\\le 8$ ($x,y\\ge 0$), ¿dónde es máxima $F=3x+2y$?', 'في المنطقة $x+y\\le 6$ و$x+2y\\le 8$ ($x,y\\ge 0$)، أين تكون $F=3x+2y$ عظمى؟', 'In the region $x+y\\le 6$, $x+2y\\le 8$ ($x,y\\ge 0$), where is $F=3x+2y$ greatest?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$3x+2y=k$ zuzenek malda bera dute: paraleloak dira.', 'Las rectas $3x+2y=k$ tienen la misma pendiente: son paralelas.', 'للمستقيمات $3x+2y=k$ الميل نفسه: إنها متوازية.', 'The lines $3x+2y=k$ have the same slope: they are parallel.'), math: same('$3x+2y=6,\\quad 3x+2y=12,\\quad 3x+2y=18$') },
            { text: say('$k$ handitzean, zuzena jatorritik urruntzen da.', 'Al crecer $k$, la recta se aleja del origen.', 'عندما تكبر $k$ يبتعد المستقيم عن المبدأ.', 'As $k$ grows, the line moves away from the origin.'), math: same('$F(4,2)=3\\cdot 4+2\\cdot 2=16$') },
            { text: say('Eskualdea ukitzen duen azkena $(6,0)$ erpinetik pasatzen da: maximoa 18 da.', 'La última que toca la región pasa por el vértice $(6,0)$: el máximo es 18.', 'آخر مستقيم يلمس المنطقة يمر بالرأس $(6,0)$: القيمة العظمى 18.', 'The last one that touches the region goes through the vertex $(6,0)$: the maximum is 18.'), math: same('$F(6,0)=3\\cdot 6+2\\cdot 0=18$') }
        ],
        takeaway: say(
            '$F(x,y)=ax+by$ funtzioaren maila-zuzenak $ax+by=k$ dira, guztiak paraleloak. Mugitu zuzena $F$ hobetzen den norabidean: eskualdea ukitzen duen azken puntua optimoa da, eta beti erpin batean dago.',
            'Las rectas de nivel de $F(x,y)=ax+by$ son $ax+by=k$, todas paralelas. Desplaza la recta en la dirección en que $F$ mejora: el último punto de la región que toca es el óptimo, y siempre es un vértice.',
            'مستقيمات المستوى لـ $F(x,y)=ax+by$ هي $ax+by=k$، وكلها متوازية. حرّك المستقيم في الاتجاه الذي تتحسن فيه $F$: آخر نقطة من المنطقة يلمسها هي الأمثل، وهي دائمًا رأس.',
            'The level lines of $F(x,y)=ax+by$ are $ax+by=k$, all parallel. Move the line in the direction where $F$ improves: the last point of the region it touches is the optimum, and it is always a vertex.'
        ),
        figure: (language) => <LessonRegion setup="level" language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'vertex-method',
        stage: 'objective',
        title: say('Optimoa erpin batean dago', 'El óptimo está en un vértice', 'القيمة المثلى عند رأس', 'The optimum is at a vertex'),
        goal: say('Helburu-funtzioa erpin guztietan kalkulatzea taula batean, eta maximoa edo minimoa aukeratzea.', 'Calcular la función objetivo en todos los vértices en una tabla y elegir el máximo o el mínimo.', 'حساب دالة الهدف عند كل الرؤوس في جدول، واختيار القيمة العظمى أو الصغرى.', 'Work out the objective function at every vertex in a table and choose the maximum or the minimum.'),
        problem: say('Maximizatu $F=2x+y$, $x+y\\le 5$, $3x+y\\le 9$, $x\\ge 0$ eta $y\\ge 0$ izanik.', 'Maximiza $F=2x+y$ con $x+y\\le 5$, $3x+y\\le 9$, $x\\ge 0$, $y\\ge 0$.', 'عظّم $F=2x+y$ مع $x+y\\le 5$ و$3x+y\\le 9$ و$x\\ge 0$ و$y\\ge 0$.', 'Maximise $F=2x+y$ with $x+y\\le 5$, $3x+y\\le 9$, $x\\ge 0$, $y\\ge 0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi zuzenen ebaki-puntua: kendu lehen ekuazioa bigarrenari.', 'El corte de las dos rectas: resta la primera ecuación a la segunda.', 'تقاطع المستقيمين: اطرح المعادلة الأولى من الثانية.', 'Where the two lines cross: subtract the first equation from the second.'), math: same('$2x=4\\ \\to\\ x=2,\\ y=3$') },
            { text: say('Erpinak: $(0,0)$, $(3,0)$, $(2,3)$ eta $(0,5)$. Kalkulatu $F$ bakoitzean.', 'Vértices: $(0,0)$, $(3,0)$, $(2,3)$ y $(0,5)$. Calcula $F$ en cada uno.', 'الرؤوس: $(0,0)$ و$(3,0)$ و$(2,3)$ و$(0,5)$. احسب $F$ عند كل منها.', 'Vertices: $(0,0)$, $(3,0)$, $(2,3)$ and $(0,5)$. Work out $F$ at each one.'), math: same('$F(3,0)=6,\\quad F(2,3)=7,\\quad F(0,5)=5$') },
            { text: say('Handiena 7 da: maximoa $(2,3)$ erpinean dago.', 'El mayor es 7: el máximo está en el vértice $(2,3)$.', 'الأكبر 7: القيمة العظمى عند الرأس $(2,3)$.', 'The largest is 7: the maximum is at the vertex $(2,3)$.'), math: same('$F(2,3)=2\\cdot 2+3=7$') }
        ],
        takeaway: say(
            'Erpinen metodoa: aurkitu eskualdeko erpinak, kalkulatu $F$ bakoitzean taula batean, eta aukeratu handiena (maximoa) edo txikiena (minimoa). Optimoa ez dago inoiz eskualdearen barruan bakarrik: beti erpin batean.',
            'El método de los vértices: halla los vértices de la región, calcula $F$ en cada uno en una tabla y elige el mayor (máximo) o el menor (mínimo). El óptimo nunca está solo en el interior: siempre en un vértice.',
            'طريقة الرؤوس: أوجد رؤوس المنطقة، واحسب $F$ عند كل منها في جدول، واختر الأكبر (العظمى) أو الأصغر (الصغرى). ولا تكون القيمة المثلى في الداخل وحده أبدًا: بل دائمًا عند رأس.',
            'The method of the vertices: find the vertices of the region, work out $F$ at each one in a table and choose the largest (maximum) or the smallest (minimum). The optimum is never only inside: always at a vertex.'
        ),
        figure: (language) => <LessonRegion setup="vertex" language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'solution-types',
        stage: 'cases',
        title: say('Bakarra, anitza ala optimorik gabe', 'Única, múltiple o sin óptimo', 'وحيد أم متعدد أم بلا قيمة مثلى', 'Unique, multiple or no optimum'),
        goal: say('Programazio linealeko problema batek soluzio bakarra, anitza, optimorik gabea ala soluziorik gabea duen jakitea.', 'Saber si un problema de programación lineal tiene solución única, múltiple, sin óptimo o ninguna.', 'معرفة هل لمسألة البرمجة الخطية حل وحيد أم متعدد أم بلا قيمة مثلى أم لا حل.', 'Tell whether a linear programming problem has a unique solution, a multiple one, no optimum or none at all.'),
        problem: say('Maximizatu $F=x+y$, $x+y\\le 5$, $x\\le 4$, $y\\le 3$, $x\\ge 0$ eta $y\\ge 0$ izanik.', 'Maximiza $F=x+y$ con $x+y\\le 5$, $x\\le 4$, $y\\le 3$, $x\\ge 0$, $y\\ge 0$.', 'عظّم $F=x+y$ مع $x+y\\le 5$ و$x\\le 4$ و$y\\le 3$ و$x\\ge 0$ و$y\\ge 0$.', 'Maximise $F=x+y$ with $x+y\\le 5$, $x\\le 4$, $y\\le 3$, $x\\ge 0$, $y\\ge 0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erpinak: $(0,0)$, $(4,0)$, $(4,1)$, $(2,3)$ eta $(0,3)$.', 'Vértices: $(0,0)$, $(4,0)$, $(4,1)$, $(2,3)$ y $(0,3)$.', 'الرؤوس: $(0,0)$ و$(4,0)$ و$(4,1)$ و$(2,3)$ و$(0,3)$.', 'Vertices: $(0,0)$, $(4,0)$, $(4,1)$, $(2,3)$ and $(0,3)$.'), math: same('$F(4,0)=4,\\quad F(0,3)=3$') },
            { text: say('Bi erpinek balio bera ematen dute: 5.', 'Dos vértices dan el mismo valor: 5.', 'يعطي رأسان القيمة نفسها: 5.', 'Two vertices give the same value: 5.'), math: same('$F(4,1)=4+1=5,\\quad F(2,3)=2+3=5$') },
            { text: say('$F$ funtzioa $x+y=5$ aldearen paraleloa da: alde horretako puntu guztiak dira optimoak. Soluzio anitza.', '$F$ es paralela al lado $x+y=5$: todos los puntos de ese lado son óptimos. Solución múltiple.', '$F$ موازية للضلع $x+y=5$: كل نقاط ذلك الضلع مثلى. حل متعدد.', '$F$ is parallel to the side $x+y=5$: every point of that side is optimal. A multiple solution.'), math: same('$F(3,2)=3+2=5$') }
        ],
        takeaway: say(
            'Bakarra: erpin bakar batean. Anitza: bi erpinek balio optimo bera dute, eta haien arteko aldea osoa da soluzioa. Optimorik gabe: eskualdea ez da ixten $F$ hobetzen den aldean. Soluziorik gabe: eskualdea hutsik dago.',
            'Única: en un solo vértice. Múltiple: dos vértices tienen el mismo valor óptimo y todo el lado entre ellos es solución. Sin óptimo: la región no se cierra hacia donde $F$ mejora. Sin solución: la región está vacía.',
            'وحيد: عند رأس واحد. متعدد: لرأسين القيمة المثلى نفسها والضلع كله بينهما حل. بلا قيمة مثلى: المنطقة لا تنغلق في الجهة التي تتحسن فيها $F$. بلا حل: المنطقة خالية.',
            'Unique: at a single vertex. Multiple: two vertices have the same best value and the whole side between them is a solution. No optimum: the region does not close where $F$ improves. No solution: the region is empty.'
        ),
        figure: (language) => <LessonRegion setup="types" language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'max-profit',
        stage: 'problems',
        title: say('Irabazi handiena', 'Máximo beneficio', 'أكبر ربح', 'Greatest profit'),
        goal: say('Ekoizpen-problema bat taula batetik planteatzea eta irabazi handiena erpinen metodoaz aurkitzea.', 'Plantear un problema de producción a partir de una tabla y hallar el beneficio máximo por el método de los vértices.', 'صياغة مسألة إنتاج انطلاقًا من جدول، وإيجاد أكبر ربح بطريقة الرؤوس.', 'Set up a production problem from a table and find the greatest profit by the method of the vertices.'),
        problem: say(
            'Lantegi batek mahaiak ($x$) eta aulkiak ($y$) egiten ditu. Mahai batek 2 ordu behar ditu arotzerian eta ordu bat margotzen; aulki batek, ordu bat eta 2 ordu. Gehienez 40 eta 50 ordu daude. Mahai batek 30 euro uzten ditu, eta aulki batek 20 euro. Zenbat egin?',
            'Un taller hace mesas ($x$) y sillas ($y$). Una mesa necesita 2 horas de carpintería y 1 de pintura; una silla, 1 y 2. Hay como mucho 40 y 50 horas. Cada mesa deja 30 € y cada silla, 20 €. ¿Cuántas hace?',
            'تصنع ورشة طاولات ($x$) وكراسي ($y$). تحتاج الطاولة ساعتين نجارة وساعة طلاء، والكرسي ساعة وساعتين. تتوفر 40 و50 ساعة على الأكثر. تترك الطاولة 30 € والكرسي 20 €. كم تصنع؟',
            'A workshop makes tables ($x$) and chairs ($y$). A table needs 2 hours of carpentry and 1 of painting; a chair, 1 and 2. There are at most 40 and 50 hours. Each table leaves €30 and each chair €20. How many should it make?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Murrizketak eta helburu-funtzioa.', 'Restricciones y función objetivo.', 'القيود ودالة الهدف.', 'Constraints and objective function.'), math: same('$2x+y\\le 40,\\quad x+2y\\le 50,\\quad F=30x+20y$') },
            { text: say('Erpinak: $(0,0)$, $(20,0)$, $(0,25)$ eta bi zuzenen ebaki-puntua.', 'Vértices: $(0,0)$, $(20,0)$, $(0,25)$ y el corte de las dos rectas.', 'الرؤوس: $(0,0)$ و$(20,0)$ و$(0,25)$ وتقاطع المستقيمين.', 'Vertices: $(0,0)$, $(20,0)$, $(0,25)$ and where the two lines cross.'), math: same('$\\begin{cases}2x+y=40\\\\ x+2y=50\\end{cases}\\ \\to\\ x=10,\\ y=20$') },
            { text: say('Kalkulatu $F$ erpinetan: 10 mahai eta 20 aulki, 700 euroko irabaziarekin.', 'Calcula $F$ en los vértices: 10 mesas y 20 sillas, con 700 € de beneficio.', 'احسب $F$ عند الرؤوس: 10 طاولات و20 كرسيًا بربح 700 €.', 'Work out $F$ at the vertices: 10 tables and 20 chairs, with €700 of profit.'), math: same('$F(20,0)=600,\\quad F(10,20)=700,\\quad F(0,25)=500$') }
        ],
        takeaway: say(
            'Ekoizpen-problema batean: baliabide bakoitza (orduak, materialak) murrizketa bat da, eta irabazia $F$. Erpinen metodoak esaten du zenbat egin; askotan, bi produktuak nahastea da onena.',
            'En un problema de producción, cada recurso (horas, materiales) es una restricción y el beneficio es $F$. El método de los vértices dice cuánto hacer; muchas veces lo mejor es mezclar los dos productos.',
            'في مسألة إنتاج يكون كل مورد (ساعات، مواد) قيدًا، والربح هو $F$. وتقول طريقة الرؤوس كم نصنع؛ وكثيرًا ما يكون الأفضل الجمع بين المنتجين.',
            'In a production problem, each resource (hours, materials) is a constraint and the profit is $F$. The method of the vertices says how much to make; often the best is to mix both products.'
        ),
        figure: (language) => <LessonRegion setup="profit" language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'min-cost',
        stage: 'problems',
        title: say('Kostu txikiena', 'Mínimo coste', 'أقل كلفة', 'Least cost'),
        goal: say('«Gutxienez» murrizketak dituen dieta- edo garraio-problema bat planteatzea eta kostu txikiena aurkitzea.', 'Plantear un problema de dieta o de transporte con restricciones de «al menos» y hallar el coste mínimo.', 'صياغة مسألة نظام غذائي أو نقل بقيود «على الأقل» وإيجاد أقل كلفة.', 'Set up a diet or transport problem with «at least» constraints and find the least cost.'),
        problem: say(
            'Abeltzain batek A pentsua ($x$ kilo) eta B pentsua ($y$ kilo) nahasten ditu. Gutxienez 8 unitate proteina ($2x+y$) eta 9 unitate bitamina ($x+3y$) behar dira. A pentsuak 3 euro balio du kiloko, eta B pentsuak 2 euro. Zein da nahasketa merkeena?',
            'Un ganadero mezcla pienso A ($x$ kilos) y pienso B ($y$ kilos). Hacen falta al menos 8 unidades de proteína ($2x+y$) y 9 de vitaminas ($x+3y$). El pienso A cuesta 3 € el kilo y el B, 2 €. ¿Cuál es la mezcla más barata?',
            'يخلط مربي ماشية العلف A ($x$ كيلوغرام) والعلف B ($y$ كيلوغرام). يلزم 8 وحدات بروتين على الأقل ($2x+y$) و9 وحدات فيتامينات ($x+3y$). كيلو العلف A بـ 3 € وكيلو B بـ 2 €. ما أرخص خليط؟',
            'A farmer mixes feed A ($x$ kilos) and feed B ($y$ kilos). At least 8 units of protein ($2x+y$) and 9 of vitamins ($x+3y$) are needed. Feed A costs €3 a kilo and B €2. What is the cheapest mix?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('«Gutxienez»: $\\ge$. Kostua minimizatu behar da.', '«Al menos»: $\\ge$. Hay que minimizar el coste.', '«على الأقل»: $\\ge$. يجب تصغير الكلفة.', '«At least»: $\\ge$. The cost must be minimised.'), math: same('$2x+y\\ge 8,\\quad x+3y\\ge 9,\\quad F=3x+2y$') },
            { text: say('Eskualdea gorantz irekita dago. Erpinak: $(0,8)$, $(9,0)$ eta ebaki-puntua.', 'La región está abierta hacia arriba. Vértices: $(0,8)$, $(9,0)$ y el corte.', 'المنطقة مفتوحة إلى الأعلى. الرؤوس: $(0,8)$ و$(9,0)$ والتقاطع.', 'The region is open upwards. Vertices: $(0,8)$, $(9,0)$ and the crossing.'), math: same('$\\begin{cases}2x+y=8\\\\ x+3y=9\\end{cases}\\ \\to\\ x=3,\\ y=2$') },
            { text: say('3 kilo A eta 2 kilo B: 13 euro.', '3 kilos de A y 2 de B: 13 €.', '3 كيلوغرامات من A و2 من B: 13 €.', '3 kilos of A and 2 of B: €13.'), math: same('$F(0,8)=16,\\quad F(3,2)=13,\\quad F(9,0)=27$') }
        ],
        takeaway: say(
            'Dieta- eta garraio-problemetan, murrizketak «gutxienez» dira, eta eskualdea ez da gorantz ixten. Hala ere, minimoa badago, erpin batean: kalkulatu $F$ erpinetan eta aukeratu txikiena.',
            'En los problemas de dieta y de transporte las restricciones son de «al menos» y la región no se cierra hacia arriba. Aun así el mínimo existe, en un vértice: calcula $F$ en los vértices y elige el menor.',
            'في مسائل النظام الغذائي والنقل تكون القيود «على الأقل» ولا تنغلق المنطقة إلى الأعلى. ومع ذلك توجد القيمة الصغرى عند رأس: احسب $F$ عند الرؤوس واختر الأصغر.',
            'In diet and transport problems the constraints are «at least» and the region does not close upwards. Even so, the minimum exists, at a vertex: work out $F$ at the vertices and choose the smallest.'
        ),
        figure: (language) => <LessonRegion setup="cost" language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'full-problem',
        stage: 'problems',
        title: say('Problema oso bat', 'Un problema completo', 'مسألة كاملة', 'A complete problem'),
        goal: say('Problema oso bat ebaztea bost urratsetan, unibertsitatera sartzeko probako ariketetan bezala, eta hitzez erantzutea.', 'Resolver un problema completo en cinco pasos, como en la prueba de acceso a la universidad, y responder con palabras.', 'حل مسألة كاملة في خمس خطوات، كما في امتحان الدخول إلى الجامعة، والإجابة بالكلمات.', 'Solve a complete problem in five steps, as in the university entrance exam, and answer in words.'),
        problem: say(
            'Eraikitzaile batek gehienez 100 etxebizitza egin ditzake, A ($x$) eta B ($y$) motakoak. Kapitala: $x+3y\\le 180$ (ehunka mila euro). Irabazia: $F=2x+5y$ (hamarnaka mila euro). Zenbat egin behar ditu?',
            'Una constructora puede hacer como mucho 100 viviendas, de tipo A ($x$) y B ($y$). Capital: $x+3y\\le 180$ (cientos de miles de euros). Beneficio: $F=2x+5y$ (decenas de miles de euros). ¿Cuántas debe hacer?',
            'يمكن لشركة بناء أن تبني 100 مسكن على الأكثر من النوعين A ($x$) وB ($y$). رأس المال: $x+3y\\le 180$ (مئات آلاف اليوروهات). الربح: $F=2x+5y$ (عشرات آلاف اليوروهات). كم يجب أن تبني؟',
            'A builder can make at most 100 homes, of type A ($x$) and B ($y$). Capital: $x+3y\\le 180$ (hundreds of thousands of euros). Profit: $F=2x+5y$ (tens of thousands of euros). How many should it build?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Murrizketak: etxebizitzak eta kapitala, eta $x,y\\ge 0$.', 'Restricciones: las viviendas y el capital, y $x,y\\ge 0$.', 'القيود: المساكن ورأس المال و$x,y\\ge 0$.', 'Constraints: the homes and the capital, and $x,y\\ge 0$.'), math: same('$x+y\\le 100,\\quad x+3y\\le 180$') },
            { text: say('Erpinak: $(0,0)$, $(100,0)$, $(0,60)$ eta ebaki-puntua.', 'Vértices: $(0,0)$, $(100,0)$, $(0,60)$ y el corte.', 'الرؤوس: $(0,0)$ و$(100,0)$ و$(0,60)$ والتقاطع.', 'Vertices: $(0,0)$, $(100,0)$, $(0,60)$ and the crossing.'), math: same('$2y=80\\ \\to\\ y=40,\\ x=60$') },
            { text: say('60 A motakoa eta 40 B motakoa: 320 hamarnaka mila euro, hau da, 3,2 milioi euro.', '60 de tipo A y 40 de tipo B: 320 decenas de miles de euros, es decir, 3,2 millones de euros.', '60 من النوع A و40 من النوع B: 320 عشرة آلاف يورو، أي 3.2 مليون يورو.', '60 of type A and 40 of type B: 320 tens of thousands of euros, that is, 3.2 million euros.'), math: same('$F(100,0)=200,\\quad F(60,40)=320,\\quad F(0,60)=300$') }
        ],
        takeaway: say(
            'Bost urrats: aldagaiak, murrizketak eta $F$, eskualdea, erpinak, eta $F$ erpinetan. Bukaeran erantzun bi gauzak hitzez: zenbat egin behar den eta zer irabazi lortzen den, unitateekin.',
            'Cinco pasos: variables, restricciones y $F$, región, vértices, y $F$ en los vértices. Al final responde las dos cosas con palabras: cuánto hay que hacer y qué beneficio se obtiene, con unidades.',
            'خمس خطوات: المتغيرات، والقيود و$F$، والمنطقة، والرؤوس، و$F$ عند الرؤوس. وفي النهاية أجب عن الأمرين بالكلمات: كم يجب أن نصنع وما الربح، مع الوحدات.',
            'Five steps: variables, constraints and $F$, region, vertices, and $F$ at the vertices. At the end answer both things in words: how much to make and what profit it gives, with units.'
        ),
        figure: (language) => <LessonRegion setup="full" language={language} />,
        figureAfterSteps: true
    }
]

const own = Object.fromEntries(ownTopics.map((topic) => [topic.id, {
    ...topic,
    ...programazioaLessonTexts[topic.id as ProgramazioaTopicId],
    ...programazioaLessonChecks[topic.id as ProgramazioaTopicId]
} as UnitTopic]))

/** The stage of this unit for each borrowed lesson */
const twinStage: Record<string, ProgramazioaStageId> = { 'half-plane-regions': 'regions', 'region-cases': 'regions' }
const twin = Object.fromEntries(bachSystemsTopics.filter((topic) => topic.id in twinStage).map((topic) => [topic.id, { ...topic, stage: twinStage[topic.id] }]))

/** The order of the unit */
const order = [
    'half-plane-regions', 'region-cases', 'constraints',
    'vertices', 'integer-points',
    'level-lines', 'vertex-method',
    'solution-types',
    'max-profit', 'min-cost', 'full-problem'
]

/** The lesson ids borrowed from 1.º Ciencias */
export const programazioaTwinTopicIds = order.filter((id) => !(id in own))

export const programazioaTopics: UnitTopic[] = order.map((id) => own[id] ?? twin[id])

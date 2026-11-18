import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { ProgramazioaTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Programazio lineala · Batxilergoa 2 · Gizarte Zientziak — what the nine
   lessons of this unit tell: the new words, a short explanation, the
   example as an exercise, the key words and, in some, «Why does it
   work?». Plain data so the tests can import it; lessons.tsx merges it
   into the topics. The examples use numbers of their own.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const programazioaLessonTexts: Record<ProgramazioaTopicId, LessonTexts> = {
    constraints: {
        definitions: [
            { term: say('Murrizketa', 'Restricción', 'القيد', 'Constraint'), meaning: say('Problemaren baldintza bat, inekuazio gisa idatzita.', 'Una condición del problema escrita como inecuación.', 'شرط من شروط المسألة مكتوب على شكل متراجحة.', 'A condition of the problem written as an inequality.') }
        ],
        vocabulary: [
            say('gehienez', 'como mucho', 'على الأكثر', 'at most'),
            say('gutxienez', 'al menos', 'على الأقل', 'at least'),
            say('aldagaia', 'variable', 'المتغير', 'variable')
        ],
        explanation: say(
            'Lehenik, izendatu aldagaiak: zenbat egin edo erosi. Gero, baldintza bakoitza murrizketa bat da: «gehienez» edo «ez gehiago» $\\le$ da, eta «gutxienez» $\\ge$. Ez ahaztu $x\\ge 0$ eta $y\\ge 0$: ezin da negatiborik egin.',
            'Primero nombra las variables: cuánto se hace o se compra. Después, cada condición es una restricción: «como mucho» o «no más de» es $\\le$, y «al menos» es $\\ge$. No olvides $x\\ge 0$ e $y\\ge 0$: no se hacen cantidades negativas.',
            'أولًا سمِّ المتغيرات: كم يُصنع أو يُشترى. ثم كل شرط قيد: «على الأكثر» أو «لا أكثر من» هي $\\le$، و«على الأقل» هي $\\ge$. ولا تنسَ $x\\ge 0$ و$y\\ge 0$: لا توجد كميات سالبة.',
            'First name the variables: how much is made or bought. Then each condition is a constraint: «at most» or «no more than» is $\\le$, and «at least» is $\\ge$. Do not forget $x\\ge 0$ and $y\\ge 0$: there are no negative amounts.'
        ),
        examplePrompt: say(
            'Denda batek $x$ kilo kafe eta $y$ kilo te erosten ditu: gehienez 30 kilo guztira, eta gutxienez tea halako bi kafe. Idatzi murrizketak.',
            'Una tienda compra $x$ kilos de café e $y$ de té: como mucho 30 kilos en total, y al menos el doble de café que de té. Escribe las restricciones.',
            'يشتري متجر $x$ كيلوغرام قهوة و$y$ كيلوغرام شاي: 30 كيلوغرامًا على الأكثر إجمالًا، والقهوة ضعف الشاي على الأقل. اكتب القيود.',
            'A shop buys $x$ kilos of coffee and $y$ of tea: at most 30 kilos in total, and at least twice as much coffee as tea. Write the constraints.'
        ),
        example: same('$\\begin{cases}x+y\\le 30\\\\ x\\ge 2y\\\\ x\\ge 0,\\ y\\ge 0\\end{cases}$'),
        exampleAnswer: say('Egiaztatu puntu batekin: 20 kilo kafe eta 10 te, $20+10=30$, eta 20 da 10 halako bi.', 'Compruébalo con un punto: 20 kilos de café y 10 de té, $20+10=30$, y 20 es el doble de 10.', 'تحقق بنقطة: 20 كيلوغرام قهوة و10 شاي، $20+10=30$، و20 ضعف 10.', 'Check with a point: 20 kilos of coffee and 10 of tea, $20+10=30$, and 20 is twice 10.')
    },
    vertices: {
        definitions: [
            { term: say('Eskualde bideragarria', 'Región factible', 'المنطقة الممكنة', 'Feasible region'), meaning: say('Murrizketa guztiak betetzen dituzten puntuen eskualdea.', 'La región de los puntos que cumplen todas las restricciones.', 'منطقة النقاط التي تحقق كل القيود.', 'The region of the points that satisfy every constraint.') },
            { term: say('Erpina', 'Vértice', 'الرأس', 'Vertex'), meaning: say('Bi muga-zuzenen ebaki-puntua, eskualdean dagoena.', 'El corte de dos rectas frontera que está en la región.', 'نقطة تقاطع مستقيمين حدّيين تقع في المنطقة.', 'Where two boundary lines cross, inside the region.') }
        ],
        vocabulary: [
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'crossing point'),
            say('muga-zuzena', 'recta frontera', 'المستقيم الحدّي', 'boundary line')
        ],
        explanation: say(
            'Erpinak muga-zuzenen ebaki-puntuak dira: ardatzekin eta beren artean. Ebaki-puntu bakoitza bi ekuazioko sistema bat ebatziz aurkitzen da. Gero, egiaztatu murrizketa guztiak betetzen dituela: betetzen ez badu, ez da erpina.',
            'Los vértices son los cortes de las rectas frontera: con los ejes y entre ellas. Cada corte se halla resolviendo un sistema de dos ecuaciones. Después comprueba que cumple todas las restricciones: si no, no es vértice.',
            'الرؤوس نقاط تقاطع المستقيمات الحدّية: مع المحورين وفيما بينها. وتوجد كل نقطة بحل نظام من معادلتين. ثم تحقق من أنها تحقق كل القيود: وإلا فليست رأسًا.',
            'The vertices are where the boundary lines cross: with the axes and with each other. Each crossing is found by solving a system of two equations. Then check that it satisfies every constraint: if not, it is not a vertex.'
        ),
        examplePrompt: say(
            'Aurkitu $2x+y\\le 10$, $x+y\\le 7$, $x\\ge 0$ eta $y\\ge 0$ eskualdearen erpinak.',
            'Halla los vértices de la región $2x+y\\le 10$, $x+y\\le 7$, $x\\ge 0$, $y\\ge 0$.',
            'أوجد رؤوس المنطقة $2x+y\\le 10$ و$x+y\\le 7$ و$x\\ge 0$ و$y\\ge 0$.',
            'Find the vertices of the region $2x+y\\le 10$, $x+y\\le 7$, $x\\ge 0$, $y\\ge 0$.'
        ),
        example: same('$\\begin{cases}2x+y=10\\\\ x+y=7\\end{cases}\\ \\to\\ x=3,\\ y=4$'),
        exampleAnswer: say('Erpinak: $(0,0)$, $(5,0)$, $(3,4)$ eta $(0,7)$. Egiaztatu: $2\\cdot 3+4=10$.', 'Vértices: $(0,0)$, $(5,0)$, $(3,4)$ y $(0,7)$. Comprueba: $2\\cdot 3+4=10$.', 'الرؤوس: $(0,0)$ و$(5,0)$ و$(3,4)$ و$(0,7)$. تحقق: $2\\cdot 3+4=10$.', 'Vertices: $(0,0)$, $(5,0)$, $(3,4)$ and $(0,7)$. Check: $2\\cdot 3+4=10$.')
    },
    'integer-points': {
        definitions: [
            { term: say('Soluzio osoa', 'Solución entera', 'الحل الصحيح', 'Whole-number solution'), meaning: say('Koordenatu osoak dituen eskualdeko puntua: unitate osoak bakarrik egiten direnean.', 'Un punto de la región con coordenadas enteras: cuando solo se hacen unidades enteras.', 'نقطة من المنطقة إحداثياتها صحيحة: عندما لا تُصنع إلا وحدات كاملة.', 'A point of the region with whole coordinates: when only whole units are made.') }
        ],
        vocabulary: [
            say('zenbaki osoa', 'número entero', 'العدد الصحيح', 'whole number'),
            say('aukera', 'posibilidad', 'الاحتمال', 'option')
        ],
        explanation: say(
            'Aldagaiak kotxeak, pertsonak edo kutxak direnean, zenbaki osoak bakarrik balio dute. Zenbatzeko, hartu $x$ edo $y$ balio bakoitza, eta begiratu zenbat balio osok betetzen dituzten murrizketak; gero, batu.',
            'Cuando las variables son coches, personas o cajas, solo valen números enteros. Para contarlos, toma cada valor de $x$ o de $y$, mira cuántos valores enteros de la otra cumplen las restricciones y suma.',
            'عندما تكون المتغيرات سيارات أو أشخاصًا أو صناديق لا تصلح إلا الأعداد الصحيحة. ولعدّها خذ كل قيمة لـ $x$ أو $y$، وانظر كم قيمة صحيحة للأخرى تحقق القيود، ثم اجمع.',
            'When the variables are cars, people or boxes, only whole numbers count. To count them, take each value of $x$ or $y$, see how many whole values of the other satisfy the constraints, and add up.'
        ),
        examplePrompt: say(
            'Zenbat puntu oso daude $2x+y\\le 8$, $x\\ge 1$ eta $y\\ge 0$ eskualdean?',
            '¿Cuántos puntos enteros hay en la región $2x+y\\le 8$, $x\\ge 1$, $y\\ge 0$?',
            'كم نقطة صحيحة في المنطقة $2x+y\\le 8$ و$x\\ge 1$ و$y\\ge 0$؟',
            'How many whole points are there in the region $2x+y\\le 8$, $x\\ge 1$, $y\\ge 0$?'
        ),
        example: same('$7+5+3+1=16$'),
        exampleAnswer: say('$x=1$ denean, $y$ 0 eta 6 artean; $x=2$ denean, 0 eta 4 artean; $x=3$ denean, 0 eta 2 artean; $x=4$ denean, 0. Guztira 16.', 'Con $x=1$, $y$ va de 0 a 6; con $x=2$, de 0 a 4; con $x=3$, de 0 a 2; con $x=4$, 0. En total, 16.', 'مع $x=1$ تكون $y$ من 0 إلى 6؛ ومع $x=2$ من 0 إلى 4؛ ومع $x=3$ من 0 إلى 2؛ ومع $x=4$ تكون 0. المجموع 16.', 'With $x=1$, $y$ goes from 0 to 6; with $x=2$, from 0 to 4; with $x=3$, from 0 to 2; with $x=4$, 0. In all, 16.')
    },
    'level-lines': {
        definitions: [
            { term: say('Helburu-funtzioa', 'Función objetivo', 'دالة الهدف', 'Objective function'), meaning: say('Maximizatu edo minimizatu nahi den $F(x,y)=ax+by$ funtzioa: irabazia, kostua…', 'La función $F(x,y)=ax+by$ que se quiere hacer máxima o mínima: un beneficio, un coste…', 'الدالة $F(x,y)=ax+by$ التي نريد جعلها عظمى أو صغرى: ربح، كلفة…', 'The function $F(x,y)=ax+by$ to be made as large or as small as possible: a profit, a cost…') },
            { term: say('Maila-zuzena', 'Recta de nivel', 'مستقيم المستوى', 'Level line'), meaning: say('$F$ balio bera duten puntuak: $ax+by=k$ zuzena.', 'Los puntos con el mismo valor de $F$: la recta $ax+by=k$.', 'النقاط التي لها القيمة نفسها لـ $F$: المستقيم $ax+by=k$.', 'The points with the same value of $F$: the line $ax+by=k$.') }
        ],
        vocabulary: [
            say('paraleloa', 'paralela', 'موازٍ', 'parallel'),
            say('malda', 'pendiente', 'الميل', 'slope')
        ],
        explanation: say(
            '$k$ bakoitzerako, $ax+by=k$ zuzen bat da, eta denak paraleloak dira. $k$ handitzean, zuzena paraleloan mugitzen da. Maximoa eskualdea ukitzen duen azken zuzenean dago; minimoa, lehenengoan.',
            'Para cada $k$, $ax+by=k$ es una recta, y todas son paralelas. Al crecer $k$, la recta se desplaza en paralelo. El máximo está en la última recta que toca la región; el mínimo, en la primera.',
            'لكل $k$ يكون $ax+by=k$ مستقيمًا، وكلها متوازية. وعندما تكبر $k$ ينتقل المستقيم موازيًا لنفسه. والقيمة العظمى على آخر مستقيم يلمس المنطقة، والصغرى على أولها.',
            'For each $k$, $ax+by=k$ is a line, and they are all parallel. As $k$ grows, the line moves parallel to itself. The maximum is on the last line that touches the region; the minimum, on the first.'
        ),
        examplePrompt: say(
            '$x+y\\le 6$ eta $x+2y\\le 8$ eskualdean ($x,y\\ge 0$), non da maximoa $F=x+3y$ funtzioarentzat?',
            'En la región $x+y\\le 6$, $x+2y\\le 8$ ($x,y\\ge 0$), ¿dónde está el máximo de $F=x+3y$?',
            'في المنطقة $x+y\\le 6$ و$x+2y\\le 8$ ($x,y\\ge 0$)، أين القيمة العظمى لـ $F=x+3y$؟',
            'In the region $x+y\\le 6$, $x+2y\\le 8$ ($x,y\\ge 0$), where is the maximum of $F=x+3y$?'
        ),
        example: same('$F(0,4)=0+3\\cdot 4=12$'),
        exampleAnswer: say('$x+3y=k$ zuzenak oso inklinatuta daude: eskualdea ukitzen duen azkena $(0,4)$ erpinetik pasatzen da.', 'Las rectas $x+3y=k$ son poco inclinadas: la última que toca la región pasa por el vértice $(0,4)$.', 'المستقيمات $x+3y=k$ قليلة الميل: آخر مستقيم يلمس المنطقة يمر بالرأس $(0,4)$.', 'The lines $x+3y=k$ are not very steep: the last one that touches the region goes through the vertex $(0,4)$.')
    },
    'vertex-method': {
        definitions: [
            { term: say('Soluzio optimoa', 'Solución óptima', 'الحل الأمثل', 'Optimal solution'), meaning: say('Helburu-funtzioari baliorik onena (handiena edo txikiena) ematen dion eskualdeko puntua.', 'El punto de la región que da a la función objetivo el mejor valor (el mayor o el menor).', 'نقطة المنطقة التي تعطي دالة الهدف أفضل قيمة (الأكبر أو الأصغر).', 'The point of the region that gives the objective function its best value (the largest or the smallest).') }
        ],
        vocabulary: [
            say('maximoa', 'máximo', 'القيمة العظمى', 'maximum'),
            say('minimoa', 'mínimo', 'القيمة الصغرى', 'minimum'),
            say('erpinen taula', 'tabla de vértices', 'جدول الرؤوس', 'table of vertices')
        ],
        explanation: say(
            'Optimoa beti eskualdeko erpin batean dago. Beraz, ez da puntu guztiak probatu behar: aurkitu erpinak, kalkulatu $F$ bakoitzean taula batean, eta aukeratu handiena (maximoa) edo txikiena (minimoa).',
            'El óptimo siempre está en un vértice de la región. Por eso no hace falta probar todos los puntos: halla los vértices, calcula $F$ en cada uno en una tabla y elige el mayor (máximo) o el menor (mínimo).',
            'القيمة المثلى دائمًا عند رأس من المنطقة. لذلك لا حاجة إلى تجريب كل النقاط: أوجد الرؤوس واحسب $F$ عند كل منها في جدول واختر الأكبر (العظمى) أو الأصغر (الصغرى).',
            'The optimum is always at a vertex of the region. So there is no need to try every point: find the vertices, work out $F$ at each one in a table and choose the largest (maximum) or the smallest (minimum).'
        ),
        examplePrompt: say(
            'Minimizatu $F=2x+3y$, $x+y\\ge 4$, $x+3y\\ge 6$, $x\\ge 0$ eta $y\\ge 0$ izanik.',
            'Minimiza $F=2x+3y$ con $x+y\\ge 4$, $x+3y\\ge 6$, $x\\ge 0$, $y\\ge 0$.',
            'صغّر $F=2x+3y$ مع $x+y\\ge 4$ و$x+3y\\ge 6$ و$x\\ge 0$ و$y\\ge 0$.',
            'Minimise $F=2x+3y$ with $x+y\\ge 4$, $x+3y\\ge 6$, $x\\ge 0$, $y\\ge 0$.'
        ),
        example: same('$F(0,4)=12,\\quad F(3,1)=9,\\quad F(6,0)=12$'),
        exampleAnswer: say('Minimoa 9 da, $(3,1)$ erpinean. Eskualdea irekia da, baina minimoa badago.', 'El mínimo es 9, en el vértice $(3,1)$. La región es abierta, pero el mínimo existe.', 'القيمة الصغرى 9 عند الرأس $(3,1)$. المنطقة مفتوحة لكن القيمة الصغرى موجودة.', 'The minimum is 9, at the vertex $(3,1)$. The region is open, but the minimum exists.'),
        why: {
            text: say('Zergatik erpin batean? Maila-zuzena paraleloan mugitzen da, eta eskualdea uzten duen azken puntua izkina bat da.', '¿Por qué en un vértice? La recta de nivel se desplaza en paralelo, y el último punto de la región que toca es una esquina.', 'لماذا عند رأس؟ ينتقل مستقيم المستوى موازيًا لنفسه، وآخر نقطة يلمسها من المنطقة زاوية.', 'Why at a vertex? The level line moves parallel to itself, and the last point of the region it touches is a corner.')
        }
    },
    'solution-types': {
        definitions: [
            { term: say('Soluzio anitza', 'Solución múltiple', 'الحل المتعدد', 'Multiple solution'), meaning: say('Optimoa bi erpinen arteko aldeko puntu guztietan dagoenean.', 'Cuando el óptimo está en todos los puntos del lado entre dos vértices.', 'عندما تكون القيمة المثلى في كل نقاط الضلع بين رأسين.', 'When the optimum is at every point of the side between two vertices.') },
            { term: say('Eskualde ez-bornatua', 'Región no acotada', 'منطقة غير محدودة', 'Unbounded region'), meaning: say('Ixten ez den eskualdea: norabide batean amaierarik gabe doa.', 'Una región que no se cierra: sigue sin fin en alguna dirección.', 'منطقة لا تنغلق: تمتد بلا نهاية في اتجاه ما.', 'A region that does not close: it goes on for ever in some direction.') }
        ],
        vocabulary: [
            say('bakarra', 'única', 'وحيد', 'unique'),
            say('optimorik gabe', 'sin óptimo', 'بلا قيمة مثلى', 'no optimum')
        ],
        explanation: say(
            'Lau aukera daude. Bakarra: erpin batean. Anitza: bi erpinek balio bera ematen dute, eta $F$ alde horren paraleloa da. Optimorik gabe: eskualdea ez da ixten $F$ hobetzen den norabidean. Eta eskualdea hutsik badago, ez dago soluziorik.',
            'Hay cuatro casos. Única: en un vértice. Múltiple: dos vértices dan el mismo valor y $F$ es paralela a ese lado. Sin óptimo: la región no se cierra en la dirección en que $F$ mejora. Y si la región está vacía, no hay solución.',
            'هناك أربع حالات. وحيد: عند رأس. متعدد: يعطي رأسان القيمة نفسها و$F$ موازية لذلك الضلع. بلا قيمة مثلى: المنطقة لا تنغلق في الاتجاه الذي تتحسن فيه $F$. وإذا كانت المنطقة خالية فلا حل.',
            'There are four cases. Unique: at one vertex. Multiple: two vertices give the same value and $F$ is parallel to that side. No optimum: the region does not close in the direction where $F$ improves. And if the region is empty, there is no solution.'
        ),
        examplePrompt: say(
            'Ba al du maximorik $F=x+y$ funtzioak $x+y\\ge 2$, $x\\ge 0$ eta $y\\ge 0$ eskualdean?',
            '¿Tiene máximo $F=x+y$ en la región $x+y\\ge 2$, $x\\ge 0$, $y\\ge 0$?',
            'هل لـ $F=x+y$ قيمة عظمى في المنطقة $x+y\\ge 2$ و$x\\ge 0$ و$y\\ge 0$؟',
            'Does $F=x+y$ have a maximum in the region $x+y\\ge 2$, $x\\ge 0$, $y\\ge 0$?'
        ),
        example: same('$F(5,5)=10,\\quad F(50,50)=100$'),
        exampleAnswer: say('Ez: eskualdea gorantz eta eskuinera irekita dago, eta $F$ beti handitzen da. Minimoa, berriz, 2 da, $x+y=2$ alde osoan.', 'No: la región está abierta hacia arriba y a la derecha, y $F$ crece sin fin. El mínimo, en cambio, es 2, en todo el lado $x+y=2$.', 'لا: المنطقة مفتوحة إلى الأعلى واليمين و$F$ تكبر بلا نهاية. أما القيمة الصغرى فهي 2 على كل الضلع $x+y=2$.', 'No: the region is open upwards and to the right, and $F$ grows for ever. The minimum, though, is 2, along the whole side $x+y=2$.')
    },
    'max-profit': {
        definitions: [
            { term: say('Irabazia', 'Beneficio', 'الربح', 'Profit'), meaning: say('Unitate bakoitzak uzten duena bider unitate-kopurua; helburu-funtzioa da.', 'Lo que deja cada unidad por el número de unidades; es la función objetivo.', 'ما تتركه كل وحدة مضروبًا في عدد الوحدات؛ وهو دالة الهدف.', 'What each unit leaves times the number of units; it is the objective function.') }
        ],
        vocabulary: [
            say('taula', 'tabla', 'الجدول', 'table'),
            say('baliabidea', 'recurso', 'المورد', 'resource')
        ],
        explanation: say(
            'Antolatu datuak taula batean: produktu bakoitzak baliabide bakoitzetik behar duena eta uzten duen irabazia. Errenkada bakoitzetik murrizketa bat ateratzen da, eta azken zutabetik $F$. Gero: eskualdea, erpinak eta $F$ erpinetan.',
            'Ordena los datos en una tabla: lo que cada producto necesita de cada recurso y el beneficio que deja. De cada fila sale una restricción y de la última columna, $F$. Después: región, vértices y $F$ en los vértices.',
            'رتّب المعطيات في جدول: ما يحتاجه كل منتج من كل مورد والربح الذي يتركه. من كل صف يخرج قيد، ومن العمود الأخير $F$. ثم: المنطقة والرؤوس و$F$ عند الرؤوس.',
            'Put the data in a table: what each product needs of each resource and the profit it leaves. Each row gives a constraint and the last column gives $F$. Then: region, vertices and $F$ at the vertices.'
        ),
        examplePrompt: say(
            'Maximizatu $F=5x+9y$, $x+y\\le 8$, $x+3y\\le 12$, $x\\ge 0$ eta $y\\ge 0$ izanik.',
            'Maximiza $F=5x+9y$ con $x+y\\le 8$, $x+3y\\le 12$, $x\\ge 0$, $y\\ge 0$.',
            'عظّم $F=5x+9y$ مع $x+y\\le 8$ و$x+3y\\le 12$ و$x\\ge 0$ و$y\\ge 0$.',
            'Maximise $F=5x+9y$ with $x+y\\le 8$, $x+3y\\le 12$, $x\\ge 0$, $y\\ge 0$.'
        ),
        example: same('$F(8,0)=40,\\quad F(6,2)=48,\\quad F(0,4)=36$'),
        exampleAnswer: say('Maximoa 48 da, $(6,2)$ erpinean: $5\\cdot 6+9\\cdot 2=48$.', 'El máximo es 48, en el vértice $(6,2)$: $5\\cdot 6+9\\cdot 2=48$.', 'القيمة العظمى 48 عند الرأس $(6,2)$: $5\\cdot 6+9\\cdot 2=48$.', 'The maximum is 48, at the vertex $(6,2)$: $5\\cdot 6+9\\cdot 2=48$.')
    },
    'min-cost': {
        definitions: [
            { term: say('Kostua', 'Coste', 'الكلفة', 'Cost'), meaning: say('Erosten den bakoitzaren prezioa bider kopurua; minimizatu egin nahi da.', 'El precio de lo que se compra por la cantidad; se quiere hacer mínimo.', 'سعر ما يُشترى مضروبًا في الكمية؛ ونريد جعله أصغر ما يمكن.', 'The price of what is bought times the amount; it is to be made as small as possible.') }
        ],
        vocabulary: [
            say('dieta', 'dieta', 'النظام الغذائي', 'diet'),
            say('pentsua', 'pienso', 'العلف', 'feed')
        ],
        explanation: say(
            'Dieta- edo garraio-problemetan, murrizketak «gutxienez» izaten dira: $\\ge$. Eskualdea gorantz irekita dago, baina minimoa badago, eskualdea jatorriaren aldean ixten delako. Kalkulatu $F$ erpinetan eta aukeratu txikiena.',
            'En los problemas de dieta o de transporte las restricciones suelen ser de «al menos»: $\\ge$. La región queda abierta hacia arriba, pero el mínimo existe, porque por el lado del origen sí se cierra. Calcula $F$ en los vértices y elige el menor.',
            'في مسائل النظام الغذائي أو النقل تكون القيود عادة «على الأقل»: $\\ge$. وتبقى المنطقة مفتوحة إلى الأعلى، لكن القيمة الصغرى موجودة لأنها تنغلق من جهة المبدأ. احسب $F$ عند الرؤوس واختر الأصغر.',
            'In diet or transport problems the constraints are usually «at least»: $\\ge$. The region stays open upwards, but the minimum exists, because on the side of the origin it does close. Work out $F$ at the vertices and choose the smallest.'
        ),
        examplePrompt: say(
            'Minimizatu $F=4x+3y$, $x+y\\ge 5$, $2x+y\\ge 6$, $x\\ge 0$ eta $y\\ge 0$ izanik.',
            'Minimiza $F=4x+3y$ con $x+y\\ge 5$, $2x+y\\ge 6$, $x\\ge 0$, $y\\ge 0$.',
            'صغّر $F=4x+3y$ مع $x+y\\ge 5$ و$2x+y\\ge 6$ و$x\\ge 0$ و$y\\ge 0$.',
            'Minimise $F=4x+3y$ with $x+y\\ge 5$, $2x+y\\ge 6$, $x\\ge 0$, $y\\ge 0$.'
        ),
        example: same('$F(0,6)=18,\\quad F(1,4)=16,\\quad F(5,0)=20$'),
        exampleAnswer: say('Minimoa 16 da, $(1,4)$ erpinean: $4\\cdot 1+3\\cdot 4=16$.', 'El mínimo es 16, en el vértice $(1,4)$: $4\\cdot 1+3\\cdot 4=16$.', 'القيمة الصغرى 16 عند الرأس $(1,4)$: $4\\cdot 1+3\\cdot 4=16$.', 'The minimum is 16, at the vertex $(1,4)$: $4\\cdot 1+3\\cdot 4=16$.')
    },
    'full-problem': {
        definitions: [
            { term: say('Planteamendua', 'Planteamiento', 'صياغة المسألة', 'Setting up'), meaning: say('Aldagaiak, murrizketak eta helburu-funtzioa enuntziatutik idaztea.', 'Escribir las variables, las restricciones y la función objetivo a partir del enunciado.', 'كتابة المتغيرات والقيود ودالة الهدف من نص المسألة.', 'Writing the variables, the constraints and the objective function from the statement.') }
        ],
        vocabulary: [
            say('urratsak', 'pasos', 'الخطوات', 'steps'),
            say('unitatea', 'unidad', 'الوحدة', 'unit')
        ],
        explanation: say(
            'Problema oso batek bost urrats ditu: aldagaiak izendatu, murrizketak eta $F$ idatzi, eskualdea marraztu, erpinak aurkitu eta $F$ erpinetan kalkulatu. Azkenik, erantzun hitzez: zenbat egin behar den eta zenbat irabazten den, unitateekin.',
            'Un problema completo tiene cinco pasos: nombrar las variables, escribir las restricciones y $F$, dibujar la región, hallar los vértices y calcular $F$ en ellos. Al final, responde con palabras: cuánto hay que hacer y cuánto se gana, con unidades.',
            'للمسألة الكاملة خمس خطوات: تسمية المتغيرات، وكتابة القيود و$F$، ورسم المنطقة، وإيجاد الرؤوس، وحساب $F$ عندها. وفي النهاية أجب بالكلمات: كم يجب أن نصنع وكم نربح، مع الوحدات.',
            'A complete problem has five steps: name the variables, write the constraints and $F$, draw the region, find the vertices and work out $F$ at them. At the end, answer in words: how much to make and how much is earned, with units.'
        ),
        examplePrompt: say(
            'Bitxigile batek $x$ lepoko eta $y$ eskumuturreko egiten ditu: $x+y\\le 10$ eta $3x+y\\le 18$. Irabazia $F=5x+3y$ eurotan. Zenbat egin?',
            'Un orfebre hace $x$ collares e $y$ pulseras: $x+y\\le 10$ y $3x+y\\le 18$. El beneficio es $F=5x+3y$ euros. ¿Cuántos hace?',
            'يصنع صائغ $x$ قلادة و$y$ سوارًا: $x+y\\le 10$ و$3x+y\\le 18$. والربح $F=5x+3y$ يورو. كم يصنع؟',
            'A jeweller makes $x$ necklaces and $y$ bracelets: $x+y\\le 10$ and $3x+y\\le 18$. The profit is $F=5x+3y$ euros. How many of each?'
        ),
        example: same('$F(6,0)=30,\\quad F(4,6)=38,\\quad F(0,10)=30$'),
        exampleAnswer: say('4 lepoko eta 6 eskumuturreko, 38 euroko irabaziarekin.', '4 collares y 6 pulseras, con 38 € de beneficio.', '4 قلادات و6 أساور بربح 38 €.', '4 necklaces and 6 bracelets, with €38 of profit.')
    }
}

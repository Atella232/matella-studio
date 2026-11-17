import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { GizAlgebraTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Aljebra · Batxilergoa 1 · Gizarte Zientziak — what the four lessons of
   its own tell: definitions, a short explanation, the example as an
   exercise («Another example») and the key words in four languages. The
   example uses numbers of its own, never those of «Let's solve», of
   «Check it» or of the typical mistake. In English, supply is S(p) and
   profit P(x); the other languages write O(p) and B(x).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })

export const gizAlgebraLessonTexts: Record<GizAlgebraTopicId, LessonTexts> = {
    'money-systems': {
        definitions: [
            {
                term: say('Diru-bilketa', 'Recaudación', 'الإيراد', 'Takings'),
                meaning: say('Sartzen den dirua: prezio bakoitzeko sarrera kopurua bider bere prezioa, dena batuta.', 'El dinero que entra: las entradas de cada precio por su precio, todo sumado.', 'المال الداخل: عدد التذاكر بكل سعر مضروبًا في سعرها، والكل مجموع.', 'The money that comes in: the tickets at each price times that price, all added up.')
            }
        ],
        vocabulary: [
            say('ekuazioa', 'ecuación', 'المعادلة', 'equation'),
            say('ezezaguna', 'incógnita', 'المجاهيل', 'unknown'),
            say('prezioa', 'precio', 'السعر', 'price')
        ],
        explanation: say(
            'Hiru ezezaguneko problema batean, haiek lotzen dituzten hiru datu bilatzen dira: guztizkoa, dirua eta beste baldintza bat. Bi ekuaziorekin bakarrik, infinitu erantzun daude. Ordezkapenez edo Gaussen metodoz ebazten da, eta amaieran egiaztatzen da soluzioak zentzua duela: sarrera osoak eta ez negatiboak.',
            'En un problema con tres incógnitas se buscan tres datos que las relacionen: el total, el dinero y una condición más. Con solo dos ecuaciones hay infinitas respuestas. Se resuelve por sustitución o por Gauss, y al final se comprueba que la solución tiene sentido: entradas enteras y no negativas.',
            'في مسألة بثلاثة مجاهيل نبحث عن ثلاثة معطيات تربطها: المجموع والمال وشرط آخر. وبمعادلتين فقط توجد إجابات لا نهائية. تُحل بالتعويض أو بطريقة غاوس، وفي النهاية نتحقق من أن للحل معنى: تذاكر بأعداد صحيحة غير سالبة لكل سعر.',
            'In a problem with three unknowns you look for three facts that link them: the total, the money and one more condition. With only two equations there are infinitely many answers. It is solved by substitution or by Gauss, and at the end you check that the solution makes sense: whole tickets, not negative.'
        ),
        examplePrompt: say('Hiru lagunek 64 euro ordaintzen dituzte guztira. A-k B-k baino bi aldiz gehiago ordaintzen du, eta C-k A-k baino 4 euro gehiago. Zenbat ordaintzen du bakoitzak?', 'Tres amigos pagan 64 euros en total. A paga el doble que B, y C paga 4 euros más que A. ¿Cuánto paga cada uno?', 'يدفع ثلاثة أصدقاء 64 يورو في المجموع. يدفع A ضعف ما يدفعه B، ويدفع C أكثر من A بـ 4 يورو. كم يدفع كل واحد؟', 'Three friends pay 64 euros in all. A pays twice as much as B, and C pays 4 euros more than A. How much does each one pay?'),
        example: say('$b+2b+(2b+4)=64\\ \\to\\ 5b=60\\ \\to\\ b=12$', '$b+2b+(2b+4)=64\\ \\to\\ 5b=60\\ \\to\\ b=12$', '$b+2b+(2b+4)=64\\ \\to\\ 5b=60\\ \\to\\ b=12$', '$b+2b+(2b+4)=64\\ \\to\\ 5b=60\\ \\to\\ b=12$'),
        exampleAnswer: say('B-k 12 euro, A-k 24 eta C-k 28. Batura: $12+24+28=64$.', 'B paga 12 euros, A paga 24 y C paga 28. Suma: $12+24+28=64$.', 'يدفع B ‏12 يورو وA ‏24 وC ‏28. المجموع: $12+24+28=64$.', 'B pays 12 euros, A pays 24 and C pays 28. Sum: $12+24+28=64$.')
    },
    'break-even': {
        definitions: [
            {
                term: say('Kostu finkoak', 'Costes fijos', 'التكاليف الثابتة', 'Fixed costs'),
                meaning: say('Ezer egin ez arren ordaintzen dena: alokairua, soldatak, aseguruak.', 'Lo que se paga aunque no se fabrique nada: el alquiler, los sueldos, los seguros.', 'ما يُدفع حتى لو لم يُصنع شيء: الإيجار والرواتب والتأمين.', 'What is paid even if nothing is made: rent, wages, insurance.')
            },
            {
                term: say('Errentagarritasun-atalasea', 'Punto muerto', 'نقطة التعادل', 'Break-even point'),
                meaning: say('Diru-sarrerak kostuen berdinak diren kantitatea: ez da irabazten, ez da galtzen.', 'La cantidad con la que los ingresos igualan a los costes: ni se gana ni se pierde.', 'الكمية التي تتساوى عندها الإيرادات والتكاليف: لا ربح ولا خسارة.', 'The quantity at which income equals costs: you neither earn nor lose.')
            }
        ],
        vocabulary: [
            say('diru-sarrerak', 'ingresos', 'الإيرادات', 'income'),
            say('kostuak', 'costes', 'التكاليف', 'costs'),
            say('mozkina', 'beneficio', 'الربح', 'profit')
        ],
        explanation: {
            eu: 'Diru-sarrerak prezioa bider saldutako unitateak dira: $I(x)=p\\cdot x$. Kostuek zati finko bat eta unitate bakoitzarekin hazten den beste bat dituzte: $C(x)=F+c\\cdot x$. Mozkina kenketa da, $B(x)=I(x)-C(x)$. Atalasea bi zuzenak ebakitzen diren tokian dago: $x=\\frac{F}{p-c}$.',
            es: 'Los ingresos son el precio por las unidades vendidas: $I(x)=p\\cdot x$. Los costes juntan una parte fija y otra que crece con cada unidad: $C(x)=F+c\\cdot x$. El beneficio es la resta $B(x)=I(x)-C(x)$. El punto muerto está donde se cortan las dos rectas: $x=\\frac{F}{p-c}$.',
            en: 'Income is the price times the units sold: $I(x)=p\\cdot x$. Costs have a fixed part and another that grows with each unit: $C(x)=F+c\\cdot x$. Profit is the difference $P(x)=I(x)-C(x)$. The break-even point is where the two lines cross: $x=\\frac{F}{p-c}$.',
            ar: 'الإيرادات هي السعر في عدد الوحدات المبيعة: $I(x)=p\\cdot x$. وتجمع التكاليف جزءًا ثابتًا وجزءًا ينمو مع كل وحدة: $C(x)=F+c\\cdot x$. والربح هو الفرق $B(x)=I(x)-C(x)$. وتقع نقطة التعادل حيث يتقاطع المستقيمان: $x=\\frac{F}{p-c}$.'
        },
        examplePrompt: say('Akademia batek 2000 euroko kostu finkoak ditu; ikasle bakoitzak 30 euroko kostua du eta 80 ordaintzen ditu. Zenbat ikaslerekin iristen da atalasera?', 'Una academia tiene 2000 euros de costes fijos; cada alumno le cuesta 30 euros y paga 80. ¿Con cuántos alumnos llega al punto muerto?', 'لدى أكاديمية تكاليف ثابتة قدرها 2000 يورو، وكل طالب يكلفها 30 يورو ويدفع 80. بكم طالب تبلغ نقطة التعادل؟', 'A school has fixed costs of 2,000 euros; each student costs it 30 euros and pays 80. With how many students does it reach break-even?'),
        example: say('$80x=2000+30x\\ \\to\\ x=\\frac{2000}{50}=40$', '$80x=2000+30x\\ \\to\\ x=\\frac{2000}{50}=40$', '$80x=2000+30x\\ \\to\\ x=\\frac{2000}{50}=40$', '$80x=2000+30x\\ \\to\\ x=\\frac{2000}{50}=40$'),
        exampleAnswer: say('40 ikaslerekin. Hortik aurrera, ikasle bakoitzak 50 euroko mozkina ematen du.', 'Con 40 alumnos. A partir de ahí, cada alumno deja 50 euros de beneficio.', 'بأربعين طالبًا. وبعد ذلك يترك كل طالب 50 يورو من الربح.', 'With 40 students. From then on, each student leaves 50 euros of profit.')
    },
    'supply-demand': {
        definitions: [
            {
                term: say('Eskaria', 'Demanda', 'الطلب', 'Demand'),
                meaning: say('Bezeroek prezio bakoitzean erosi nahi dituzten unitateak: prezioa igotzean, jaitsi egiten da.', 'Las unidades que los clientes quieren comprar a cada precio: baja si el precio sube.', 'الوحدات التي يريد الزبائن شراءها بكل سعر: تنخفض إذا ارتفع السعر.', 'The units customers want to buy at each price: it goes down if the price goes up.')
            },
            {
                term: say('Eskaintza', 'Oferta', 'العرض', 'Supply'),
                meaning: say('Ekoizleek prezio bakoitzean saldu nahi dituzten unitateak: prezioa igotzean, igo egiten da.', 'Las unidades que los productores quieren vender a cada precio: sube si el precio sube.', 'الوحدات التي يريد المنتجون بيعها بكل سعر: ترتفع إذا ارتفع السعر.', 'The units producers want to sell at each price: it goes up if the price goes up.')
            }
        ],
        vocabulary: [
            say('oreka', 'equilibrio', 'التوازن', 'equilibrium'),
            say('soberakina', 'excedente', 'الفائض', 'surplus'),
            say('eskasia', 'escasez', 'النقص', 'shortage')
        ],
        explanation: {
            eu: 'Prezioa igotzean, eskaria jaitsi eta eskaintza igo egiten da. Oreka-prezioak bi kantitateak berdintzen ditu: $D(p)=O(p)$ idazten da eta $p$ askatzen da. Prezioa gainetik badago, eskatzen dena baino gehiago eskaintzen da eta produktua soberan dago; azpitik badago, falta da.',
            es: 'Cuando el precio sube, la demanda baja y la oferta sube. El precio de equilibrio hace iguales las dos cantidades: se iguala $D(p)=O(p)$ y se despeja $p$. Si el precio está por encima, se ofrece más de lo que se pide y sobra producto; si está por debajo, falta.',
            en: 'When the price goes up, demand goes down and supply goes up. The equilibrium price makes the two quantities equal: set $D(p)=S(p)$ and solve for $p$. If the price is above it, more is offered than is asked for and product is left over; if it is below, there is not enough.',
            ar: 'عندما يرتفع السعر ينخفض الطلب ويرتفع العرض. وسعر التوازن يجعل الكميتين متساويتين: نكتب $D(p)=O(p)$ ونعزل $p$. وإذا كان السعر فوقه عُرض أكثر مما يُطلب ففاض المنتج، وإذا كان تحته نقص.'
        },
        examplePrompt: {
            eu: 'Eskaria $D(p)=90-3p$ da, eta eskaintza $O(p)=2p+10$. Zein da oreka-prezioa?',
            es: 'La demanda es $D(p)=90-3p$ y la oferta, $O(p)=2p+10$. ¿Cuál es el precio de equilibrio?',
            en: 'Demand is $D(p)=90-3p$ and supply is $S(p)=2p+10$. What is the equilibrium price?',
            ar: 'الطلب $D(p)=90-3p$ والعرض $O(p)=2p+10$. ما سعر التوازن؟'
        },
        example: say('$90-3p=2p+10\\ \\to\\ 80=5p\\ \\to\\ p=16$', '$90-3p=2p+10\\ \\to\\ 80=5p\\ \\to\\ p=16$', '$90-3p=2p+10\\ \\to\\ 80=5p\\ \\to\\ p=16$', '$90-3p=2p+10\\ \\to\\ 80=5p\\ \\to\\ p=16$'),
        exampleAnswer: say('16 euro. Prezio horretan $90-3\\cdot 16=42$ unitate saltzen dira, ez gehiago, ez gutxiago.', '16 euros. A ese precio se venden $90-3\\cdot 16=42$ unidades, ni más ni menos.', '16 يورو. وبهذا السعر تُباع $90-3\\cdot 16=42$ وحدة، لا أكثر ولا أقل.', '16 euros. At that price $90-3\\cdot 16=42$ units are sold, no more and no fewer.')
    },
    'budget-region': {
        definitions: [
            {
                term: say('Murrizketa', 'Restricción', 'القيد', 'Constraint'),
                meaning: say('Planak bete behar duen baldintza, inekuazio gisa idatzita: dirua, orduak edo materialak.', 'Una condición que el plan tiene que cumplir, escrita como inecuación: dinero, horas o materiales.', 'شرط يجب أن تحققه الخطة، مكتوب على شكل متراجحة: المال أو الساعات أو المواد.', 'A condition the plan has to meet, written as an inequality: money, hours or materials.')
            },
            {
                term: say('Eskualde bideragarria', 'Región factible', 'المنطقة الممكنة', 'Feasible region'),
                meaning: say('Murrizketa guztiak aldi berean betetzen dituzten planoko puntuak.', 'Los puntos del plano que cumplen todas las restricciones a la vez.', 'نقاط المستوى التي تحقق كل القيود في الوقت نفسه.', 'The points of the plane that meet all the constraints at once.')
            }
        ],
        vocabulary: [
            say('aurrekontua', 'presupuesto', 'الميزانية', 'budget'),
            say('inekuazioa', 'inecuación', 'المتراجحة', 'inequality'),
            say('erdiplanoa', 'semiplano', 'نصف المستوى', 'half-plane')
        ],
        explanation: say(
            'Mugatuta dagoen baliabide bakoitzak inekuazio bat ematen du: planak gastatzen duena ezin da dagoena baino gehiago izan. Inekuazio bakoitza erdiplano bat da, eta $x\\ge 0$ eta $y\\ge 0$ inekuazioekin batera eskualde bideragarria osatzen dute. Plan bat sartzen da bere puntuak guztiak betetzen baditu; bat huts egiten badu, ez.',
            'Cada recurso limitado da una inecuación: lo que gasta el plan no puede pasar de lo que hay. Cada inecuación es un semiplano, y con $x\\ge 0$ e $y\\ge 0$ forman juntas la región factible. Un plan cabe si su punto las cumple todas; si falla una, no cabe.',
            'كل مورد محدود يعطي متراجحة: ما تنفقه الخطة لا يمكن أن يتجاوز الموجود. وكل متراجحة نصف مستوى، ومع $x\\ge 0$ و$y\\ge 0$ تكوّن معًا المنطقة الممكنة. وتتسع الخطة إذا حققت نقطتها كل المتراجحات؛ وإذا أخلّت بواحدة فلا.',
            'Each limited resource gives an inequality: what the plan uses cannot go over what there is. Each inequality is a half-plane, and with $x\\ge 0$ and $y\\ge 0$ together they make the feasible region. A plan fits if its point meets them all; if it fails one, it does not fit.'
        ),
        examplePrompt: say('Murrizketak $3x+2y\\le 60$ eta $x+y\\le 25$ dira. Betetzen ditu $(12,\\,9)$ puntuak biak?', 'Las restricciones son $3x+2y\\le 60$ y $x+y\\le 25$. ¿Cumple el punto $(12,\\,9)$ las dos?', 'القيدان هما $3x+2y\\le 60$ و$x+y\\le 25$. هل تحقق النقطة $(12,\\,9)$ القيدين؟', 'The constraints are $3x+2y\\le 60$ and $x+y\\le 25$. Does the point $(12,\\,9)$ meet both?'),
        example: say('$3\\cdot 12+2\\cdot 9=54\\qquad 12+9=21$', '$3\\cdot 12+2\\cdot 9=54\\qquad 12+9=21$', '$3\\cdot 12+2\\cdot 9=54\\qquad 12+9=21$', '$3\\cdot 12+2\\cdot 9=54\\qquad 12+9=21$'),
        exampleAnswer: say('Bai: $54\\le 60$ eta $21\\le 25$. Puntua eskualdearen barruan dago.', 'Sí: $54\\le 60$ y $21\\le 25$. El punto está dentro de la región.', 'نعم: $54\\le 60$ و$21\\le 25$. النقطة داخل المنطقة.', 'Yes: $54\\le 60$ and $21\\le 25$. The point is inside the region.')
    }
}

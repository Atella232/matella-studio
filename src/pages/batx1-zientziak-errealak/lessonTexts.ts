import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { BachRealsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zenbaki errealak · Batxilergoa 1 · Zientziak — what each lesson tells:
   the new words (definitions), a short explanation, the example as an
   exercise («Another example»), the key words in four languages and, in
   four lessons, «Why does it work?». Plain data so the tests can import it;
   lessons.tsx merges it into the topics. The example uses numbers of its
   own, never those of «Let's solve», of «Check it» or of the typical
   mistake. Arabic writes the decimal point ({,} becomes .). Tests in
   tests/lesson-texts.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachRealsLessonTexts: Record<BachRealsTopicId, LessonTexts> = {
    /* ---------- 1. Real numbers ---------- */
    sets: {
        definitions: [
            {
                term: say('Multzoa', 'Conjunto', 'المجموعة', 'Set'),
                meaning: say('Objektu-bilduma bat; objektu horiek bere elementuak dira, eta giltzen artean idazten dira: $\\{0,10,20\\}$.', 'Colección de objetos, sus elementos, que se escriben entre llaves: $\\{0,10,20\\}$.', 'تجمّع من الأشياء هي عناصرها، وتُكتب بين قوسين معقوصين: $\\{0,10,20\\}$.', 'A collection of objects, its elements, written between curly brackets: $\\{0,10,20\\}$.')
            },
            {
                term: say('Azpimultzoa', 'Subconjunto', 'المجموعة الجزئية', 'Subset'),
                meaning: say('$A\\subset B$ da baldin eta $A$ multzoko elementu guztiak $B$ multzoan ere badaude.', '$A\\subset B$ si todos los elementos de $A$ están también en $B$.', '$A\\subset B$ إذا كانت كل عناصر $A$ موجودة أيضًا في $B$.', '$A\\subset B$ if every element of $A$ is also in $B$.')
            }
        ],
        vocabulary: [
            say('bildura', 'unión', 'الاتحاد', 'union'),
            say('ebakidura', 'intersección', 'التقاطع', 'intersection'),
            say('elementua', 'elemento', 'العنصر', 'element')
        ],
        explanation: say(
            'Zenbakiek bata bestearen barruan dauden multzoak osatzen dituzte: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. $\\in$ ikurrak elementu bat multzo batekoa dela adierazten du: $-3\\in\\mathbb{Z}$, baina $\\sqrt{2}\\notin\\mathbb{Q}$. Bi multzorekin beste batzuk sortzen dira: bildurak bien elementuak biltzen ditu, ebakidurak komunak uzten ditu, eta $A-B$ kendurak $A$ multzoko elementuak, $B$ multzoan ez daudenak.',
            'Los números forman conjuntos encajados: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. El símbolo $\\in$ indica que un elemento pertenece a un conjunto: $-3\\in\\mathbb{Z}$, pero $\\sqrt{2}\\notin\\mathbb{Q}$. Con dos conjuntos se forman otros: la unión junta los elementos de ambos, la intersección deja los comunes y la diferencia $A-B$ deja los de $A$ que no están en $B$.',
            'تشكّل الأعداد مجموعات متداخلة: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. الرمز $\\in$ يعني أن عنصرًا ينتمي إلى مجموعة: $-3\\in\\mathbb{Z}$ لكن $\\sqrt{2}\\notin\\mathbb{Q}$. ومن مجموعتين نكوّن مجموعات أخرى: الاتحاد يجمع عناصر الاثنتين، والتقاطع يُبقي العناصر المشتركة، والفرق $A-B$ يُبقي عناصر $A$ التي ليست في $B$.',
            'Numbers form sets that fit inside each other: $\\mathbb{N}\\subset\\mathbb{Z}\\subset\\mathbb{Q}\\subset\\mathbb{R}$. The symbol $\\in$ says that an element belongs to a set: $-3\\in\\mathbb{Z}$, but $\\sqrt{2}\\notin\\mathbb{Q}$. Two sets make others: the union puts together the elements of both, the intersection keeps the common ones and the difference $A-B$ keeps those of $A$ that are not in $B$.'
        ),
        examplePrompt: say('$P=\\{5,7,9,11,13\\}$ eta $Q=\\{9,10,11,12\\}$ badira, aurkitu $P\\cap Q$ eta $Q-P$.', 'Si $P=\\{5,7,9,11,13\\}$ y $Q=\\{9,10,11,12\\}$, halla $P\\cap Q$ y $Q-P$.', 'إذا كانت $P=\\{5,7,9,11,13\\}$ و$Q=\\{9,10,11,12\\}$ فأوجد $P\\cap Q$ و$Q-P$.', 'If $P=\\{5,7,9,11,13\\}$ and $Q=\\{9,10,11,12\\}$, find $P\\cap Q$ and $Q-P$.'),
        example: same('$\\begin{gathered}P\\cap Q=\\{9,11\\}\\\\ Q-P=\\{10,12\\}\\end{gathered}$'),
        exampleAnswer: say('$P\\cap Q=\\{9,11\\}$, bietan daudenak; $Q-P=\\{10,12\\}$, $Q$ multzokoak eta $P$ multzoan ez daudenak.', '$P\\cap Q=\\{9,11\\}$, los que están en los dos; $Q-P=\\{10,12\\}$, los de $Q$ que no están en $P$.', '$P\\cap Q=\\{9,11\\}$ أي الموجودة في الاثنتين، و$Q-P=\\{10,12\\}$ أي عناصر $Q$ التي ليست في $P$.', '$P\\cap Q=\\{9,11\\}$, those in both; $Q-P=\\{10,12\\}$, those in $Q$ that are not in $P$.')
    },
    'irrational-proof': {
        definitions: [
            {
                term: say('Zenbaki irrazionala', 'Número irracional', 'العدد غير النسبي', 'Irrational number'),
                meaning: say('Zatiki gisa idatz ezin daitekeen zenbaki erreala: bere adierazpen hamartarra infinitua eta ez-periodikoa da.', 'Número real que no se puede escribir como fracción: su expresión decimal es infinita y no periódica.', 'عدد حقيقي لا يُكتب على صورة كسر: تمثيله العشري لا نهائي وغير دوري.', 'A real number that cannot be written as a fraction: its decimal form is infinite and non-recurring.')
            },
            {
                term: say('Absurdura eramatea', 'Reducción al absurdo', 'البرهان بالخلف', 'Proof by contradiction'),
                meaning: say('Frogatu nahi denaren aurkakoa suposatu, eta kontraesan batera iristea.', 'Suponer lo contrario de lo que se quiere probar y llegar a una contradicción.', 'افتراض عكس ما نريد برهانه والوصول إلى تناقض.', 'Assuming the opposite of what you want to prove and reaching a contradiction.')
            }
        ],
        vocabulary: [
            say('arrazionala', 'racional', 'نسبي', 'rational'),
            say('periodikoa', 'periódico', 'دوري', 'recurring'),
            say('bikoitia', 'número par', 'عدد زوجي', 'even number')
        ],
        explanation: say(
            'Zenbaki arrazionala zatiki bat da, eta bere adierazpen hamartarra zehatza edo periodikoa da: $\\frac{7}{11}=0{,}\\overline{63}$. Irrazionalek infinitu zifra dituzte, periodorik gabe. Baina hamartarrei begiratzea ez da nahikoa $\\sqrt{2}$ irrazionala dela frogatzeko: zatiki laburtezina dela suposatzen da, eta kontraesan batera iristen da. Berdin frogatzen da $\\sqrt{3}$ edo $\\sqrt{5}$ erroetarako.',
            'Un número racional es una fracción, y su expresión decimal es exacta o periódica: $\\frac{7}{11}=0{,}\\overline{63}$. Los irracionales tienen infinitas cifras sin periodo. Pero mirar decimales no basta para probar que $\\sqrt{2}$ es irracional: se supone que es una fracción irreducible y se llega a una contradicción. Igual se prueba para $\\sqrt{3}$ o $\\sqrt{5}$.',
            'العدد النسبي كسر، وتمثيله العشري منتهٍ أو دوري: $\\frac{7}{11}=0{,}\\overline{63}$. أما الأعداد غير النسبية فلها أرقام لا نهائية بلا دورة. لكن النظر إلى الأرقام العشرية لا يكفي لبرهنة أن $\\sqrt{2}$ غير نسبي: نفترض أنه كسر غير قابل للاختزال ونصل إلى تناقض. وبالطريقة نفسها نبرهن ذلك للعددين $\\sqrt{3}$ و$\\sqrt{5}$.',
            'A rational number is a fraction, and its decimal form ends or recurs: $\\frac{7}{11}=0{,}\\overline{63}$. Irrational numbers have infinitely many digits with no repeating block. But looking at decimals is not enough to prove that $\\sqrt{2}$ is irrational: you suppose it is a fraction in lowest terms and reach a contradiction. The same proof works for $\\sqrt{3}$ or $\\sqrt{5}$.'
        ),
        examplePrompt: say('Sailkatu $\\sqrt{49}$, $\\frac{5}{6}$, $\\pi-1$ eta $\\sqrt{8}$: arrazionalak ala irrazionalak?', 'Clasifica $\\sqrt{49}$, $\\frac{5}{6}$, $\\pi-1$ y $\\sqrt{8}$: ¿racionales o irracionales?', 'صنّف $\\sqrt{49}$ و$\\frac{5}{6}$ و$\\pi-1$ و$\\sqrt{8}$: نسبية أم غير نسبية؟', 'Classify $\\sqrt{49}$, $\\frac{5}{6}$, $\\pi-1$ and $\\sqrt{8}$: rational or irrational?'),
        example: same('$\\begin{gathered}\\sqrt{49}=7\\qquad \\frac{5}{6}=0{,}8\\overline{3}\\\\ \\pi-1=2{,}1415\\ldots\\qquad \\sqrt{8}=2\\sqrt{2}\\end{gathered}$'),
        exampleAnswer: say('Arrazionalak: $\\sqrt{49}$ eta $\\frac{5}{6}$. Irrazionalak: $\\pi-1$ eta $\\sqrt{8}$.', 'Racionales: $\\sqrt{49}$ y $\\frac{5}{6}$. Irracionales: $\\pi-1$ y $\\sqrt{8}$.', 'نسبية: $\\sqrt{49}$ و$\\frac{5}{6}$. غير نسبية: $\\pi-1$ و$\\sqrt{8}$.', 'Rational: $\\sqrt{49}$ and $\\frac{5}{6}$. Irrational: $\\pi-1$ and $\\sqrt{8}$.'),
        why: {
            text: say(
                'Zergatik behartzen du $a^2$ bikoitia izateak $a$ bikoitia izatera? $a$ bakoitia balitz, $a=2k+1$, haren karratua $4k^2+4k+1$ litzateke, bakoitia. Beraz, karratu bikoitia zenbaki bikoiti batetik dator beti, eta frogak ez du zulorik.',
                '¿Por qué un $a^2$ par obliga a que $a$ sea par? Si $a$ fuera impar, $a=2k+1$, su cuadrado sería $4k^2+4k+1$, impar. Así que un cuadrado par viene siempre de un número par, y la prueba no tiene huecos.',
                'لماذا يفرض كون $a^2$ زوجيًا أن يكون $a$ زوجيًا؟ لو كان $a$ فرديًا، $a=2k+1$، لكان مربعه $4k^2+4k+1$ فرديًا. إذن المربع الزوجي يأتي دائمًا من عدد زوجي، والبرهان بلا ثغرات.',
                'Why does an even $a^2$ force $a$ to be even? If $a$ were odd, $a=2k+1$, its square would be $4k^2+4k+1$, which is odd. So an even square always comes from an even number, and the proof has no gaps.'
            ),
            math: same('$(2k+1)^2=4k^2+4k+1$')
        }
    },
    'exact-line': {
        definitions: [
            {
                term: say('Zenbaki urrea', 'Número áureo', 'العدد الذهبي', 'Golden ratio'),
                meaning: say('$\\varphi=\\frac{1+\\sqrt{5}}{2}\\approx 1{,}618$: pentagono erregularraren diagonalaren eta aldearen arteko arrazoia.', '$\\varphi=\\frac{1+\\sqrt{5}}{2}\\approx 1{,}618$: la razón entre la diagonal y el lado del pentágono regular.', '$\\varphi=\\frac{1+\\sqrt{5}}{2}\\approx 1{,}618$: النسبة بين قطر المخمّس المنتظم وضلعه.', '$\\varphi=\\frac{1+\\sqrt{5}}{2}\\approx 1{,}618$: the ratio of the diagonal to the side of a regular pentagon.')
            }
        ],
        vocabulary: [
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse'),
            say('konpasa', 'compás', 'الفرجار', 'compass'),
            say('triangelu zuzena', 'triángulo rectángulo', 'المثلث القائم', 'right-angled triangle')
        ],
        explanation: say(
            'Zenbaki erreal bakoitza zuzeneko puntu bat da. Zatikiak unitatea zati berdinetan banatuz kokatzen dira; erro asko, Pitagorasekin: $n=a^2+b^2$ bada, $a$ eta $b$ katetoak dituen triangelu zuzenaren hipotenusak $\\sqrt{n}$ neurtzen du. Konpasak luzera hori zuzenera eramaten du. Horrela marrazten da zenbaki urrea ere.',
            'Cada número real es un punto de la recta. Las fracciones se sitúan dividiendo la unidad en partes iguales; muchas raíces, con Pitágoras: si $n=a^2+b^2$, el triángulo rectángulo de catetos $a$ y $b$ tiene una hipotenusa de $\\sqrt{n}$. El compás lleva esa longitud a la recta. Así se dibuja también el número áureo.',
            'كل عدد حقيقي نقطة على المستقيم. تُعيَّن الكسور بتقسيم الوحدة إلى أجزاء متساوية، وكثير من الجذور بفيثاغورس: إذا كان $n=a^2+b^2$ فإن المثلث القائم الذي ضلعاه القائمان $a$ و$b$ طول وتره $\\sqrt{n}$. والفرجار ينقل هذا الطول إلى المستقيم. وهكذا يُرسم العدد الذهبي أيضًا.',
            'Every real number is a point on the line. Fractions are placed by splitting the unit into equal parts; many roots, with Pythagoras: if $n=a^2+b^2$, the right-angled triangle with legs $a$ and $b$ has a hypotenuse of $\\sqrt{n}$. The compass carries that length to the line. The golden ratio is drawn the same way.'
        ),
        examplePrompt: say('Adierazi $\\sqrt{13}$ eta zenbaki urrea.', 'Representa $\\sqrt{13}$ y el número áureo.', 'مثّل $\\sqrt{13}$ والعدد الذهبي.', 'Show $\\sqrt{13}$ and the golden ratio.'),
        example: same('$\\begin{gathered}13=2^2+3^2\\ \\to\\ \\sqrt{13}\\\\ \\sqrt{5}=\\sqrt{2^2+1^2}\\ \\to\\ \\frac{1+\\sqrt{5}}{2}\\end{gathered}$'),
        exampleAnswer: say('$\\sqrt{13}$: 2 eta 3 katetoak. Zenbaki urrea: $1+\\sqrt{5}$ zenbakiaren erdia, eta $\\sqrt{5}$, 2 eta 1 katetoekin.', '$\\sqrt{13}$: catetos 2 y 3. El áureo: la mitad de $1+\\sqrt{5}$, con $\\sqrt{5}$ de catetos 2 y 1.', '$\\sqrt{13}$: الضلعان القائمان 2 و3. العدد الذهبي: نصف $1+\\sqrt{5}$، و$\\sqrt{5}$ من الضلعين 2 و1.', '$\\sqrt{13}$: legs 2 and 3. The golden ratio: half of $1+\\sqrt{5}$, with $\\sqrt{5}$ from legs 2 and 1.')
    },

    /* ---------- 2. Intervals and absolute value ---------- */
    'interval-sets': {
        definitions: [
            {
                term: say('Zuzenerdia', 'Semirrecta', 'نصف المستقيم', 'Half-line'),
                meaning: say('Mutur bat infinitua duen tartea: $[3,+\\infty)$ tartean 3 edo handiagoak diren zenbakiak daude.', 'Intervalo con un extremo infinito: $[3,+\\infty)$ son los números mayores o iguales que 3.', 'فترة أحد طرفيها لا نهائي: $[3,+\\infty)$ هي الأعداد الأكبر من 3 أو المساوية له.', 'An interval with one infinite end: $[3,+\\infty)$ is the numbers greater than or equal to 3.')
            }
        ],
        vocabulary: [
            say('muturra', 'extremo', 'الطرف', 'endpoint'),
            say('kortxetea', 'corchete', 'القوس المعقوف', 'square bracket'),
            say('parentesia', 'paréntesis', 'القوس', 'round bracket')
        ],
        explanation: say(
            'Tartea zuzenaren zati bat da. $(a,b)$ tarteak muturrak kanpoan uzten ditu, $[a,b]$ tarteak barruan hartzen ditu, eta parentesi bat eta kortxete bat badaude, mutur bakarra sartzen da. Mutur bat infinitua bada, zuzenerdia da. Eragiketak egiteko, marraztu tarteak zuzen berean: ebakidura zati komuna da, eta bildura, margotutako guztia.',
            'Un intervalo es un trozo de recta. $(a,b)$ deja fuera los extremos, $[a,b]$ los incluye, y con un paréntesis y un corchete entra solo uno. Si un extremo es infinito, es una semirrecta. Para operar, dibuja los intervalos en la misma recta: la intersección es la parte común, y la unión, todo lo pintado.',
            'الفترة جزء من المستقيم. $(a,b)$ تستثني الطرفين، و$[a,b]$ تتضمنهما، ومع قوس عادي وقوس معقوف يدخل طرف واحد فقط. وإذا كان أحد الطرفين لا نهائيًا فهي نصف مستقيم. وللعمليات ارسم الفترات على المستقيم نفسه: التقاطع هو الجزء المشترك، والاتحاد كل ما لُوِّن.',
            'An interval is a piece of the line. $(a,b)$ leaves the endpoints out, $[a,b]$ takes them in, and with one round bracket and one square bracket only one endpoint is in. If an end is infinite, it is a half-line. To operate, draw the intervals on the same line: the intersection is the common part, and the union, everything coloured.'
        ),
        examplePrompt: say('Aurkitu $[-5,0)\\cup(-2,3]$ eta $[-5,0)\\cap(-2,3]$.', 'Halla $[-5,0)\\cup(-2,3]$ y $[-5,0)\\cap(-2,3]$.', 'أوجد $[-5,0)\\cup(-2,3]$ و$[-5,0)\\cap(-2,3]$.', 'Find $[-5,0)\\cup(-2,3]$ and $[-5,0)\\cap(-2,3]$.'),
        example: same('$\\begin{gathered}[-5,0)\\cup(-2,3]=[-5,3]\\\\ [-5,0)\\cap(-2,3]=(-2,0)\\end{gathered}$'),
        exampleAnswer: say('Bildura: $[-5,3]$. Ebakidura: $(-2,0)$, 0 ez baitago lehenengoan, ezta $-2$ bigarrenean ere.', 'Unión: $[-5,3]$. Intersección: $(-2,0)$, porque el 0 no está en el primero ni el $-2$ en el segundo.', 'الاتحاد: $[-5,3]$. التقاطع: $(-2,0)$ لأن 0 ليس في الأولى و$-2$ ليس في الثانية.', 'Union: $[-5,3]$. Intersection: $(-2,0)$, because 0 is not in the first one and $-2$ is not in the second.')
    },
    'absolute-value': {
        definitions: [
            {
                term: say('Balio absolutua', 'Valor absoluto', 'القيمة المطلقة', 'Absolute value'),
                meaning: say('$|a|=a$ $a\\ge 0$ bada, eta $|a|=-a$ $a<0$ bada: zenbakia, zeinurik gabe.', '$|a|=a$ si $a\\ge 0$, y $|a|=-a$ si $a<0$: el número sin su signo.', '$|a|=a$ إذا كان $a\\ge 0$، و$|a|=-a$ إذا كان $a<0$: العدد بلا إشارته.', '$|a|=a$ if $a\\ge 0$, and $|a|=-a$ if $a<0$: the number without its sign.')
            }
        ],
        vocabulary: [
            say('distantzia', 'distancia', 'المسافة', 'distance'),
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('soluzioa', 'solución', 'الحلول', 'solution')
        ],
        explanation: say(
            'Balio absolutuak zeinua kentzen du: $|-6|=6$ eta $|6|=6$. Zuzenean, zerorainoko distantzia neurtzen du, eta $|a-b|$ balioak $a$ eta $b$ arteko distantzia, ordena edozein dela ere. Horregatik, $|x-3|=2$ ekuazioak 3 zenbakitik 2 unitatera dauden puntuak eskatzen ditu: 1 eta 5. Kontuz: $|a+b|$ ez da beti $|a|+|b|$.',
            'El valor absoluto quita el signo: $|-6|=6$ y $|6|=6$. En la recta mide la distancia al 0, y $|a-b|$ mide la distancia entre $a$ y $b$, sin importar el orden. Por eso $|x-3|=2$ pide los puntos que están a distancia 2 del 3: el 1 y el 5. Cuidado: $|a+b|$ no siempre es $|a|+|b|$.',
            'القيمة المطلقة تحذف الإشارة: $|-6|=6$ و$|6|=6$. وعلى المستقيم تقيس المسافة إلى 0، و$|a-b|$ تقيس المسافة بين $a$ و$b$ مهما كان الترتيب. لذلك تطلب $|x-3|=2$ النقاط التي تبعد 2 عن 3: أي 1 و5. انتبه: $|a+b|$ لا تساوي دائمًا $|a|+|b|$.',
            'Absolute value removes the sign: $|-6|=6$ and $|6|=6$. On the line it measures the distance to 0, and $|a-b|$ measures the distance between $a$ and $b$, whatever the order. That is why $|x-3|=2$ asks for the points at distance 2 from 3: 1 and 5. Careful: $|a+b|$ is not always $|a|+|b|$.'
        ),
        examplePrompt: say('Ebatzi $|x+4|=3$, eta kalkulatu $-2{,}5$ eta $1{,}5$ arteko distantzia.', 'Resuelve $|x+4|=3$ y halla la distancia entre $-2{,}5$ y $1{,}5$.', 'حُلّ $|x+4|=3$، وأوجد المسافة بين $-2{,}5$ و$1{,}5$.', 'Solve $|x+4|=3$ and find the distance between $-2{,}5$ and $1{,}5$.'),
        example: same('$\\begin{gathered}x+4=\\pm 3\\ \\to\\ x=-1,\\ x=-7\\\\ |1{,}5-(-2{,}5)|=4\\end{gathered}$'),
        exampleAnswer: say('$x=-1$ eta $x=-7$ soluzioak; distantzia 4 da.', 'Soluciones $x=-1$ y $x=-7$; la distancia es 4.', 'الحلول $x=-1$ و$x=-7$، والمسافة 4.', 'Solutions $x=-1$ and $x=-7$; the distance is 4.')
    },
    neighbourhoods: {
        definitions: [
            {
                term: say('Ingurunea', 'Entorno', 'الجوار', 'Neighbourhood'),
                meaning: say('$E(a,r)=(a-r,a+r)$: $a$ zenbakitik $r$ baino gutxiagora dauden puntuak.', '$E(a,r)=(a-r,a+r)$: los puntos que están a menos de $r$ de $a$.', '$E(a,r)=(a-r,a+r)$: النقاط التي تبعد عن $a$ أقل من $r$.', '$E(a,r)=(a-r,a+r)$: the points less than $r$ away from $a$.')
            }
        ],
        vocabulary: [
            say('erdigunea', 'centro', 'المركز', 'centre'),
            say('erradioa', 'radio', 'نصف القطر', 'radius'),
            say('desberdintza', 'desigualdad', 'المتباينة', 'inequality')
        ],
        explanation: say(
            'Ingurunea tarte ireki bat da, $a$ erdigunea eta $r$ erradioa dituena: $a$ zenbakitik $r$ baino gutxiagora dauden puntuak. Distantzia balio absolutua denez, $|x-a|<r$ eta $a-r<x<a+r$ baliokideak dira. Desberdintza $>$ bada, urruneko puntuak geratzen dira: bi zuzenerdi. $\\le$ edo $\\ge$ badago, muturrak sartzen dira.',
            'Un entorno es un intervalo abierto de centro $a$ y radio $r$: los puntos que están a menos de $r$ de $a$. Como la distancia es un valor absoluto, $|x-a|<r$ equivale a $a-r<x<a+r$. Si la desigualdad es $>$, quedan los puntos lejanos: dos semirrectas. Con $\\le$ o $\\ge$, los extremos entran.',
            'الجوار فترة مفتوحة مركزها $a$ ونصف قطرها $r$: النقاط التي تبعد عن $a$ أقل من $r$. وبما أن المسافة قيمة مطلقة فإن $|x-a|<r$ تكافئ $a-r<x<a+r$. وإذا كانت المتباينة $>$ تبقى النقاط البعيدة: نصفا مستقيم. ومع $\\le$ أو $\\ge$ يدخل الطرفان.',
            'A neighbourhood is an open interval with centre $a$ and radius $r$: the points less than $r$ away from $a$. Since distance is an absolute value, $|x-a|<r$ is the same as $a-r<x<a+r$. If the inequality is $>$, the far points are left: two half-lines. With $\\le$ or $\\ge$, the endpoints are in.'
        ),
        examplePrompt: say('Idatzi $|x+2|\\le 4$ tarte gisa, eta $(-1,9)$ ingurune gisa.', 'Escribe $|x+2|\\le 4$ como intervalo y $(-1,9)$ como entorno.', 'اكتب $|x+2|\\le 4$ على صورة فترة، و$(-1,9)$ على صورة جوار.', 'Write $|x+2|\\le 4$ as an interval and $(-1,9)$ as a neighbourhood.'),
        example: same('$\\begin{gathered}-4\\le x+2\\le 4\\ \\to\\ [-6,2]\\\\ (-1,9)=E(4,5)\\end{gathered}$'),
        exampleAnswer: say('$[-6,2]$: $-2$ erdigunea eta 4 erradioa. $(-1,9)$: erdigunea erdiko puntua da, 4, eta erradioa 5.', '$[-6,2]$: centro $-2$ y radio 4. $(-1,9)$: el centro es el punto medio, 4, y el radio 5.', '$[-6,2]$: المركز $-2$ ونصف القطر 4. $(-1,9)$: المركز هو منتصفها 4، ونصف القطر 5.', '$[-6,2]$: centre $-2$ and radius 4. $(-1,9)$: the centre is the midpoint, 4, and the radius 5.')
    },

    /* ---------- 3. Approximations and errors ---------- */
    significant: {
        definitions: [
            {
                term: say('Zifra esanguratsuak', 'Cifras significativas', 'الأرقام المعنوية', 'Significant figures'),
                meaning: say('Ezkerreko lehen zifra ez-nulutik aurrera dauden zifrak: $0{,}0307$ zenbakiak hiru ditu.', 'Las cifras desde la primera distinta de cero por la izquierda: $0{,}0307$ tiene tres.', 'الأرقام بدءًا من أول رقم غير صفري من اليسار: للعدد $0{,}0307$ ثلاثة أرقام.', 'The figures from the first non-zero one on the left: $0{,}0307$ has three.')
            },
            {
                term: say('Errore-bornea', 'Cota de error', 'حدّ الخطأ', 'Error bound'),
                meaning: say('Errorea baino handiagoa dela ziur dakigun zenbakia.', 'Un número que sabemos seguro que es mayor que el error.', 'عدد نعرف يقينًا أنه أكبر من الخطأ.', 'A number we know for sure is larger than the error.')
            }
        ],
        vocabulary: [
            say('biribildu', 'redondear', 'التدوير', 'round'),
            say('errore absolutua', 'error absoluto', 'الخطأ المطلق', 'absolute error')
        ],
        explanation: say(
            'Zifra esanguratsuek informazioa ematen dute: ezkerreko zeroak ez dira kontatzen, baina erdikoak bai. $n$ zifra esanguratsutara biribiltzeko, hurrengo zifrari begiratzen zaio. Errore absolutua $|x-a|$ da, baina balio zehatza ezagutzen ez badugu, borne bat ematen dugu: utzi dugun azken zifraren unitate erdia.',
            'Las cifras significativas son las que aportan información: los ceros de la izquierda no cuentan, pero los de en medio sí. Para redondear a $n$ cifras significativas, se mira la cifra siguiente. El error absoluto es $|x-a|$, pero si no conocemos el valor exacto, damos una cota: media unidad de la última cifra que hemos dejado.',
            'الأرقام المعنوية هي التي تحمل معلومة: الأصفار على اليسار لا تُحسب، أما الأصفار في الوسط فتُحسب. وللتقريب إلى $n$ رقمًا معنويًا ننظر إلى الرقم التالي. الخطأ المطلق هو $|x-a|$، لكن إذا لم نعرف القيمة الدقيقة نعطي حدًّا: نصف وحدة آخر رقم أبقيناه.',
            'Significant figures are the ones that carry information: zeros on the left do not count, but zeros in the middle do. To round to $n$ significant figures, look at the next figure. The absolute error is $|x-a|$, but if we do not know the exact value, we give a bound: half a unit of the last figure we kept.'
        ),
        examplePrompt: say('Biribildu $0{,}04862$ bi zifra esanguratsutara eta $25\\,371$ hirutara. Eman errore-borne bat.', 'Redondea $0{,}04862$ a dos cifras significativas y $25\\,371$ a tres. Da una cota del error.', 'قرّب $0{,}04862$ إلى رقمين معنويين و$25\\,371$ إلى ثلاثة. وأعطِ حدًّا للخطأ.', 'Round $0{,}04862$ to two significant figures and $25\\,371$ to three. Give an error bound.'),
        example: same('$\\begin{gathered}0{,}04862\\ \\to\\ 0{,}049\\qquad E_a<0{,}0005\\\\ 25\\,371\\ \\to\\ 25\\,400\\qquad E_a<50\\end{gathered}$'),
        exampleAnswer: say('$0{,}049$, errorea $0{,}0005$ baino txikiagoa; $25\\,400$, errorea 50 baino txikiagoa.', '$0{,}049$, con un error menor que $0{,}0005$; $25\\,400$, con un error menor que 50.', '$0{,}049$ بخطأ أقل من $0{,}0005$، و$25\\,400$ بخطأ أقل من 50.', '$0{,}049$, with an error smaller than $0{,}0005$; $25\\,400$, with an error smaller than 50.')
    },
    relative: {
        definitions: [
            {
                term: say('Errore erlatiboa', 'Error relativo', 'الخطأ النسبي', 'Relative error'),
                meaning: say('Errore absolutua zati balio zehatza (edo hurbildua): $E_r=\\frac{E_a}{x}$. Ehunekotan ere ematen da.', 'El error absoluto dividido entre el valor exacto (o el aproximado): $E_r=\\frac{E_a}{x}$. También se da en porcentaje.', 'الخطأ المطلق مقسومًا على القيمة الدقيقة (أو التقريبية): $E_r=\\frac{E_a}{x}$. ويُعطى أيضًا بالنسبة المئوية.', 'The absolute error divided by the exact (or approximate) value: $E_r=\\frac{E_a}{x}$. It is also given as a percentage.')
            }
        ],
        vocabulary: [
            say('zehaztasuna', 'precisión', 'الدقة', 'precision'),
            say('neurketa', 'medida', 'القياس', 'measurement'),
            say('ehunekoa', 'porcentaje', 'النسبة المئوية', 'percentage')
        ],
        explanation: say(
            'Errore absolutuak zenbat oker gauden esaten du, baina ez ea asko edo gutxi den: 1 cm izugarria da inurri bat neurtzean, eta ezer ez errepide bat neurtzean. Errore erlatiboak errorea neurketarekin alderatzen du: $E_r=\\frac{E_a}{x}$. Ez du unitaterik, eta askotan ehunekotan ematen da. Zenbat eta txikiagoa, orduan eta zehaztasun handiagoa.',
            'El error absoluto dice cuánto nos equivocamos, pero no si es mucho o poco: 1 cm es enorme midiendo una hormiga y nada midiendo una carretera. El error relativo compara el error con la medida: $E_r=\\frac{E_a}{x}$. No tiene unidades y suele darse en porcentaje. Cuanto menor es, más precisión tiene la medida.',
            'يخبرنا الخطأ المطلق بمقدار خطئنا، لا بكونه كبيرًا أو صغيرًا: 1 سم كثير عند قياس نملة ولا شيء عند قياس طريق. أما الخطأ النسبي فيقارن الخطأ بالقياس: $E_r=\\frac{E_a}{x}$. لا وحدة له، ويُعطى غالبًا بالنسبة المئوية. وكلما صغر زادت دقة القياس.',
            'The absolute error tells you how far off you are, but not whether that is a lot: 1 cm is huge when measuring an ant and nothing when measuring a road. The relative error compares the error with the measurement: $E_r=\\frac{E_a}{x}$. It has no units and is often given as a percentage. The smaller it is, the more precision the measurement has.'
        ),
        examplePrompt: say('Bi neurketa: $2{,}4$ kg, $0{,}05$ kg-ko errorearekin, eta $380$ g, $4$ g-ko errorearekin. Zein da zehatzagoa?', 'Dos medidas: $2{,}4$ kg con un error de $0{,}05$ kg y $380$ g con un error de $4$ g. ¿Cuál es más precisa?', 'قياسان: $2{,}4$ كغ بخطأ $0{,}05$ كغ، و$380$ غ بخطأ $4$ غ. أيّهما أدق؟', 'Two measurements: $2{,}4$ kg with an error of $0{,}05$ kg and $380$ g with an error of $4$ g. Which is more precise?'),
        example: same('$\\begin{gathered}\\frac{0{,}05}{2{,}4}\\approx 0{,}0208\\\\ \\frac{4}{380}\\approx 0{,}0105\\end{gathered}$'),
        exampleAnswer: say('$380$ g-koa: $1{,}05\\,\\%$, $2{,}08\\,\\%$ baino txikiagoa.', 'La de $380$ g: $1{,}05\\,\\%$, menor que $2{,}08\\,\\%$.', 'قياس $380$ غ: $1{,}05\\,\\%$ وهو أصغر من $2{,}08\\,\\%$.', 'The $380$ g one: $1{,}05\\,\\%$, smaller than $2{,}08\\,\\%$.')
    },
    'scientific-errors': {
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('magnitude-ordena', 'orden de magnitud', 'رتبة المقدار', 'order of magnitude')
        ],
        explanation: say(
            'Idazkera zientifikoan, $a\\cdot 10^{n}$ eta $1\\le a<10$, $n$ berretzaileak magnitude-ordena ematen du, eta $a$ zenbakiak zifra esanguratsuak. Biderkatzeko edo zatitzeko, $a$ zenbakiekin eta berreturekin bereiz egiten da. Batzeko, lehenik berretzaileak berdindu. Azkenean, gutxien zehatza den datuaren arabera biribiltzen da.',
            'En notación científica, $a\\cdot 10^{n}$ con $1\\le a<10$, el exponente $n$ da el orden de magnitud y $a$ lleva las cifras significativas. Para multiplicar o dividir se opera con las $a$ y con las potencias por separado. Para sumar, primero se igualan los exponentes. Al final, se redondea según el dato menos preciso.',
            'في الترميز العلمي $a\\cdot 10^{n}$ مع $1\\le a<10$، يعطي الأس $n$ رتبة المقدار، ويحمل $a$ الأرقام المعنوية. وللضرب أو القسمة نتعامل مع الأعداد $a$ ومع القوى كلٌّ على حدة. وللجمع نساوي الأسس أولًا. وفي النهاية نقرّب حسب أقل المعطيات دقة.',
            'In scientific notation, $a\\cdot 10^{n}$ with $1\\le a<10$, the exponent $n$ gives the order of magnitude and $a$ carries the significant figures. To multiply or divide, work with the $a$ numbers and with the powers separately. To add, first make the exponents equal. At the end, round according to the least precise datum.'
        ),
        examplePrompt: say('Kalkulatu $(6{,}2\\cdot 10^{-5})\\div(2{,}48\\cdot 10^{3})$ eta $4{,}12\\cdot 10^{6}+3{,}6\\cdot 10^{5}$.', 'Calcula $(6{,}2\\cdot 10^{-5})\\div(2{,}48\\cdot 10^{3})$ y $4{,}12\\cdot 10^{6}+3{,}6\\cdot 10^{5}$.', 'احسب $(6{,}2\\cdot 10^{-5})\\div(2{,}48\\cdot 10^{3})$ و$4{,}12\\cdot 10^{6}+3{,}6\\cdot 10^{5}$.', 'Work out $(6{,}2\\cdot 10^{-5})\\div(2{,}48\\cdot 10^{3})$ and $4{,}12\\cdot 10^{6}+3{,}6\\cdot 10^{5}$.'),
        example: same('$\\begin{gathered}\\frac{6{,}2}{2{,}48}\\cdot 10^{-5-3}=2{,}5\\cdot 10^{-8}\\\\ 41{,}2\\cdot 10^{5}+3{,}6\\cdot 10^{5}=44{,}8\\cdot 10^{5}=4{,}48\\cdot 10^{6}\\end{gathered}$'),
        exampleAnswer: say('$2{,}5\\cdot 10^{-8}$ eta $4{,}48\\cdot 10^{6}$.', '$2{,}5\\cdot 10^{-8}$ y $4{,}48\\cdot 10^{6}$.', '$2{,}5\\cdot 10^{-8}$ و$4{,}48\\cdot 10^{6}$.', '$2{,}5\\cdot 10^{-8}$ and $4{,}48\\cdot 10^{6}$.')
    },

    /* ---------- 4. Radicals and logarithms ---------- */
    'radical-ops': {
        definitions: [
            {
                term: say('Erradikal antzekoak', 'Radicales semejantes', 'الجذور المتشابهة', 'Like radicals'),
                meaning: say('Indize bera eta errokizun bera dituztenak: $2\\sqrt[3]{5}$ eta $-7\\sqrt[3]{5}$.', 'Los que tienen el mismo índice y el mismo radicando: $2\\sqrt[3]{5}$ y $-7\\sqrt[3]{5}$.', 'الجذور التي لها الدليل نفسه وما تحت الجذر نفسه: $2\\sqrt[3]{5}$ و$-7\\sqrt[3]{5}$.', 'Those with the same index and the same radicand: $2\\sqrt[3]{5}$ and $-7\\sqrt[3]{5}$.')
            }
        ],
        vocabulary: [
            say('indizea', 'índice', 'الدليل', 'index'),
            say('errokizuna', 'radicando', 'ما تحت الجذر', 'radicand'),
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient')
        ],
        explanation: say(
            'Erradikal bat faktoreak ateraz sinplifikatzen da: $\\sqrt{a^2 b}=a\\sqrt{b}$. Horrela bakarrik ikusten da bi erradikal antzekoak diren eta batu daitezkeen. Biderkatzeko edo zatitzeko indize bera behar da: desberdinak badira, indize komun batera pasatzen dira, zatikiak izendatzaile komunera eramatean bezala. Azkenean, sinplifikatu berriro.',
            'Un radical se simplifica sacando factores: $\\sqrt{a^2 b}=a\\sqrt{b}$. Solo así se ve si dos radicales son semejantes y se pueden sumar. Para multiplicar o dividir hace falta el mismo índice: si son distintos, se pasan a un índice común, como al reducir fracciones a común denominador. Al final, vuelve a simplificar.',
            'يُبسَّط الجذر بإخراج العوامل: $\\sqrt{a^2 b}=a\\sqrt{b}$. وبذلك فقط نرى إن كان جذران متشابهين ويمكن جمعهما. وللضرب أو القسمة يلزم الدليل نفسه: فإن اختلفا ننقلهما إلى دليل مشترك، كما نوحّد مقامات الكسور. وفي النهاية بسّط من جديد.',
            'A radical is simplified by taking factors out: $\\sqrt{a^2 b}=a\\sqrt{b}$. Only then can you see whether two radicals are like radicals and can be added. To multiply or divide you need the same index: if they are different, change them to a common index, as when giving fractions a common denominator. At the end, simplify again.'
        ),
        examplePrompt: say('Kalkulatu $2\\sqrt{12}+\\sqrt{75}-\\sqrt{27}$ eta $\\sqrt[4]{3}\\cdot\\sqrt{3}$.', 'Calcula $2\\sqrt{12}+\\sqrt{75}-\\sqrt{27}$ y $\\sqrt[4]{3}\\cdot\\sqrt{3}$.', 'احسب $2\\sqrt{12}+\\sqrt{75}-\\sqrt{27}$ و$\\sqrt[4]{3}\\cdot\\sqrt{3}$.', 'Work out $2\\sqrt{12}+\\sqrt{75}-\\sqrt{27}$ and $\\sqrt[4]{3}\\cdot\\sqrt{3}$.'),
        example: same('$\\begin{gathered}4\\sqrt{3}+5\\sqrt{3}-3\\sqrt{3}=6\\sqrt{3}\\\\ \\sqrt[4]{3}\\cdot\\sqrt[4]{3^2}=\\sqrt[4]{27}\\end{gathered}$'),
        exampleAnswer: say('$6\\sqrt{3}$ eta $\\sqrt[4]{27}$.', '$6\\sqrt{3}$ y $\\sqrt[4]{27}$.', '$6\\sqrt{3}$ و$\\sqrt[4]{27}$.', '$6\\sqrt{3}$ and $\\sqrt[4]{27}$.')
    },
    rationalize: {
        definitions: [
            {
                term: say('Konjokatua', 'Conjugado', 'المرافق', 'Conjugate'),
                meaning: say('$\\sqrt{a}+\\sqrt{b}$ adierazpenaren konjokatua $\\sqrt{a}-\\sqrt{b}$ da: biderkatuta, $a-b$ ematen dute.', 'El conjugado de $\\sqrt{a}+\\sqrt{b}$ es $\\sqrt{a}-\\sqrt{b}$: multiplicados dan $a-b$.', 'مرافق $\\sqrt{a}+\\sqrt{b}$ هو $\\sqrt{a}-\\sqrt{b}$: وحاصل ضربهما $a-b$.', 'The conjugate of $\\sqrt{a}+\\sqrt{b}$ is $\\sqrt{a}-\\sqrt{b}$: multiplied, they give $a-b$.')
            }
        ],
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('erro kubikoa', 'raíz cúbica', 'الجذر التكعيبي', 'cube root')
        ],
        explanation: say(
            'Arrazionalizatzea izendatzailea errorik gabe uztea da, hobeto kalkulatu eta alderatzeko. $\\sqrt[n]{b^m}$ badago, goian eta behean biderkatzen da berretzailea $n$ arte osatzen duen faktoreaz. Erro karratuen batura edo kendura badago, konjokatuaz biderkatzen da: karratuen kendurak erroak desagerrarazten ditu.',
            'Racionalizar es dejar el denominador sin raíces, para operar y comparar mejor. Con $\\sqrt[n]{b^m}$, se multiplica arriba y abajo por el factor que completa el exponente hasta $n$. Con una suma o resta de raíces cuadradas, se multiplica por el conjugado: la diferencia de cuadrados hace desaparecer las raíces.',
            'الإنطاق هو جعل المقام بلا جذور لنحسب ونقارن بسهولة. مع $\\sqrt[n]{b^m}$ نضرب البسط والمقام في العامل الذي يكمل الأس حتى $n$. ومع مجموع جذرين تربيعيين أو فرقهما نضرب في المرافق: فرق المربعين يزيل الجذور.',
            'Rationalising means leaving the denominator with no roots, to calculate and compare more easily. With $\\sqrt[n]{b^m}$, multiply top and bottom by the factor that completes the exponent up to $n$. With a sum or difference of square roots, multiply by the conjugate: the difference of squares makes the roots disappear.'
        ),
        examplePrompt: say('Arrazionalizatu $\\frac{10}{\\sqrt[4]{5}}$ eta $\\frac{1}{2+\\sqrt{3}}$.', 'Racionaliza $\\frac{10}{\\sqrt[4]{5}}$ y $\\frac{1}{2+\\sqrt{3}}$.', 'أنطق مقام $\\frac{10}{\\sqrt[4]{5}}$ و$\\frac{1}{2+\\sqrt{3}}$.', 'Rationalise $\\frac{10}{\\sqrt[4]{5}}$ and $\\frac{1}{2+\\sqrt{3}}$.'),
        example: same('$\\begin{gathered}\\frac{10\\sqrt[4]{5^3}}{5}=2\\sqrt[4]{125}\\\\ \\frac{2-\\sqrt{3}}{4-3}=2-\\sqrt{3}\\end{gathered}$'),
        exampleAnswer: say('$2\\sqrt[4]{125}$ eta $2-\\sqrt{3}$.', '$2\\sqrt[4]{125}$ y $2-\\sqrt{3}$.', '$2\\sqrt[4]{125}$ و$2-\\sqrt{3}$.', '$2\\sqrt[4]{125}$ and $2-\\sqrt{3}$.'),
        why: {
            text: say(
                'Zergatik funtzionatzen du konjokatuak? $(a+b)(a-b)=a^2-b^2$ delako: erro karratuekin, karratu bakoitzak bere erroa kentzen du. Adibidez, $(\\sqrt{5}+1)(\\sqrt{5}-1)=5-1$, errorik gabeko zenbaki bat.',
                '¿Por qué funciona el conjugado? Porque $(a+b)(a-b)=a^2-b^2$: con raíces cuadradas, cada cuadrado quita su raíz. Por ejemplo, $(\\sqrt{5}+1)(\\sqrt{5}-1)=5-1$, un número sin raíces.',
                'لماذا ينجح المرافق؟ لأن $(a+b)(a-b)=a^2-b^2$: ومع الجذور التربيعية يزيل كل مربع جذره. مثلًا $(\\sqrt{5}+1)(\\sqrt{5}-1)=5-1$، وهو عدد بلا جذور.',
                'Why does the conjugate work? Because $(a+b)(a-b)=a^2-b^2$: with square roots, each square removes its root. For example, $(\\sqrt{5}+1)(\\sqrt{5}-1)=5-1$, a number with no roots.'
            ),
            math: same('$(\\sqrt{5}+1)(\\sqrt{5}-1)=4$')
        }
    },
    logarithms: {
        definitions: [
            {
                term: say('Logaritmoa', 'Logaritmo', 'اللوغاريتم', 'Logarithm'),
                meaning: say('$\\log_a b$: $b$ lortzeko $a$ oinarria jaso behar den berretzailea. Oinarririk gabeko $\\log$, 10 oinarrikoa da.', '$\\log_a b$ es el exponente al que hay que elevar la base $a$ para obtener $b$. $\\log$ sin base es en base 10.', '$\\log_a b$ هو الأس الذي نرفع إليه الأساس $a$ لنحصل على $b$. و$\\log$ بلا أساس يعني الأساس 10.', '$\\log_a b$ is the exponent you raise the base $a$ to in order to get $b$. $\\log$ with no base is base 10.')
            }
        ],
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('propietatea', 'propiedad', 'الخاصية', 'property')
        ],
        explanation: say(
            'Logaritmoa berretzaile bat da: $\\log_a b=x$ esan nahi du $a^x=b$, $a>0$, $a\\neq 1$ eta $b>0$ izanik. Horregatik, berreturen propietateak ditu: biderkadura baten logaritmoa logaritmoen batura da, zatidura batena kendura, eta berretura batena biderkatuz ateratzen da: $\\log b^n=n\\log b$.',
            'Un logaritmo es un exponente: $\\log_a b=x$ significa $a^x=b$, con $a>0$, $a\\neq 1$ y $b>0$. Por eso hereda las propiedades de las potencias: el logaritmo de un producto es la suma de los logaritmos, el de un cociente es la resta y el de una potencia sale multiplicando: $\\log b^n=n\\log b$.',
            'اللوغاريتم أس: $\\log_a b=x$ تعني $a^x=b$ حيث $a>0$ و$a\\neq 1$ و$b>0$. لذلك يرث خصائص القوى: لوغاريتم الضرب مجموع اللوغاريتمات، ولوغاريتم القسمة فرقها، ولوغاريتم القوة يخرج بالضرب، وهذه خاصية مهمة: $\\log b^n=n\\log b$.',
            'A logarithm is an exponent: $\\log_a b=x$ means $a^x=b$, with $a>0$, $a\\neq 1$ and $b>0$. That is why it inherits the properties of powers: the logarithm of a product is the sum of the logarithms, that of a quotient is the difference, and that of a power comes out by multiplying: $\\log b^n=n\\log b$.'
        ),
        examplePrompt: say('$\\log 3\\approx 0{,}477$ dela jakinda, kalkulatu $\\log 0{,}09$ eta $\\log_3 \\sqrt{27}$.', 'Sabiendo que $\\log 3\\approx 0{,}477$, calcula $\\log 0{,}09$ y $\\log_3 \\sqrt{27}$.', 'إذا علمت أن $\\log 3\\approx 0{,}477$ فاحسب $\\log 0{,}09$ و$\\log_3 \\sqrt{27}$.', 'Given that $\\log 3\\approx 0{,}477$, work out $\\log 0{,}09$ and $\\log_3 \\sqrt{27}$.'),
        example: same('$\\begin{gathered}\\log\\frac{9}{100}=2\\log 3-2\\approx -1{,}046\\\\ \\sqrt{27}=3^{\\frac{3}{2}}\\ \\to\\ \\log_3\\sqrt{27}=\\frac{3}{2}\\end{gathered}$'),
        exampleAnswer: say('$\\log 0{,}09\\approx -1{,}046$ eta $\\log_3\\sqrt{27}=\\frac{3}{2}$.', '$\\log 0{,}09\\approx -1{,}046$ y $\\log_3\\sqrt{27}=\\frac{3}{2}$.', '$\\log 0{,}09\\approx -1{,}046$ و$\\log_3\\sqrt{27}=\\frac{3}{2}$.', '$\\log 0{,}09\\approx -1{,}046$ and $\\log_3\\sqrt{27}=\\frac{3}{2}$.'),
        why: {
            text: say(
                'Zergatik da biderkadura baten logaritmoa batura bat? $\\log_a M=m$ eta $\\log_a N=n$ badira, $M=a^m$ eta $N=a^n$ dira. Biderkatzean, $MN=a^{m+n}$: berretzaileak batzen dira. Eta logaritmoa berretzaile hori da, hain zuzen.',
                '¿Por qué el logaritmo de un producto es una suma? Si $\\log_a M=m$ y $\\log_a N=n$, entonces $M=a^m$ y $N=a^n$. Al multiplicar, $MN=a^{m+n}$: los exponentes se suman. Y el logaritmo es justo ese exponente.',
                'لماذا لوغاريتم الضرب مجموع؟ إذا كان $\\log_a M=m$ و$\\log_a N=n$ فإن $M=a^m$ و$N=a^n$. وعند الضرب $MN=a^{m+n}$: تُجمع الأسس. واللوغاريتم هو هذا الأس بالضبط.',
                'Why is the logarithm of a product a sum? If $\\log_a M=m$ and $\\log_a N=n$, then $M=a^m$ and $N=a^n$. Multiplying, $MN=a^{m+n}$: the exponents add. And the logarithm is exactly that exponent.'
            ),
            math: same('$a^m\\cdot a^n=a^{m+n}$')
        }
    },
    'log-unknown': {
        definitions: [
            {
                term: say('Oinarri-aldaketa', 'Cambio de base', 'تغيير الأساس', 'Change of base'),
                meaning: say('$\\log_a b=\\frac{\\log b}{\\log a}$: horrela, kalkulagailuak edozein oinarritako logaritmoak ematen ditu.', '$\\log_a b=\\frac{\\log b}{\\log a}$: así la calculadora da logaritmos de cualquier base.', '$\\log_a b=\\frac{\\log b}{\\log a}$: وبها تعطي الآلة الحاسبة لوغاريتمات أي أساس.', '$\\log_a b=\\frac{\\log b}{\\log a}$: this way the calculator gives logarithms in any base.')
            }
        ],
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('kalkulagailua', 'calculadora', 'الآلة الحاسبة', 'calculator')
        ],
        explanation: say(
            'Ezezaguna logaritmo batean badago, pasatu berretura batera: $\\log_a b=c$ eta $a^c=b$ gauza bera dira. Oinarria falta bada, atera erroa; argumentua falta bada, kalkulatu berretura. Ezezaguna berretzailea bada, $a^x=b$, hartu logaritmoak: $x=\\log_a b$, eta kalkulagailuak oinarri-aldaketarekin ematen du. Egiaztatu beti oinarria: positiboa eta 1 ez dena.',
            'Si la incógnita está en un logaritmo, pásalo a potencia: $\\log_a b=c$ es lo mismo que $a^c=b$. Si falta la base, saca la raíz; si falta el argumento, calcula la potencia. Si la incógnita es el exponente, $a^x=b$, toma logaritmos: $x=\\log_a b$, y la calculadora lo da con el cambio de base. Comprueba siempre la base: positiva y distinta de 1.',
            'إذا كان المجهول في لوغاريتم فحوّله إلى قوة: $\\log_a b=c$ تعني $a^c=b$. فإن نقص الأساس فاستخرج الجذر، وإن نقص ما داخل اللوغاريتم فاحسب القوة. وإذا كان المجهول هو الأس، $a^x=b$، فخذ اللوغاريتم: $x=\\log_a b$، وتعطيه الآلة الحاسبة بتغيير الأساس. وتحقّق دائمًا من الأساس: موجب ومختلف عن 1.',
            'If the unknown is inside a logarithm, turn it into a power: $\\log_a b=c$ is the same as $a^c=b$. If the base is missing, take the root; if the argument is missing, work out the power. If the unknown is the exponent, $a^x=b$, take logarithms: $x=\\log_a b$, and the calculator gives it with the change of base. Always check the base: positive and not 1.'
        ),
        examplePrompt: say('Ebatzi $\\log_x 81=4$, $\\log_{\\frac{1}{2}} x=-3$ eta $2^x=0{,}6$.', 'Resuelve $\\log_x 81=4$, $\\log_{\\frac{1}{2}} x=-3$ y $2^x=0{,}6$.', 'حُلّ $\\log_x 81=4$ و$\\log_{\\frac{1}{2}} x=-3$ و$2^x=0{,}6$.', 'Solve $\\log_x 81=4$, $\\log_{\\frac{1}{2}} x=-3$ and $2^x=0{,}6$.'),
        example: same('$\\begin{gathered}x^4=81\\ \\to\\ x=3\\qquad x=\\left(\\frac{1}{2}\\right)^{-3}=8\\\\ x=\\frac{\\log 0{,}6}{\\log 2}\\approx -0{,}74\\end{gathered}$'),
        exampleAnswer: say('$x=3$, $x=8$ eta $x\\approx -0{,}74$: $2^x$ 1 baino txikiagoa denez, $x$ negatiboa da.', '$x=3$, $x=8$ y $x\\approx -0{,}74$: como $2^x$ es menor que 1, $x$ es negativo.', '$x=3$ و$x=8$ و$x\\approx -0{,}74$: بما أن $2^x$ أصغر من 1 فإن $x$ سالب.', '$x=3$, $x=8$ and $x\\approx -0{,}74$: since $2^x$ is less than 1, $x$ is negative.')
    },

    /* ---------- 5. The binomial theorem ---------- */
    combinatorial: {
        definitions: [
            {
                term: say('Faktoriala', 'Factorial', 'المضروب', 'Factorial'),
                meaning: say('$n!=n\\cdot(n-1)\\cdots 2\\cdot 1$, eta $0!=1$.', '$n!=n\\cdot(n-1)\\cdots 2\\cdot 1$, y $0!=1$.', '$n!=n\\cdot(n-1)\\cdots 2\\cdot 1$، و$0!=1$.', '$n!=n\\cdot(n-1)\\cdots 2\\cdot 1$, and $0!=1$.')
            }
        ],
        vocabulary: [
            say('errenkada', 'fila', 'الصف', 'row'),
            say('simetria', 'simetría', 'التناظر', 'symmetry')
        ],
        explanation: say(
            '$\\binom{n}{k}$ zenbaki konbinatorioak zenbatzen du zenbat modutan aukera daitezkeen $k$ gauza $n$ gauzen artean, ordena kontuan hartu gabe. Faktorialekin kalkulatzen da, baina Tartagliaren triangeluan ere agertzen da: zenbaki bakoitza goiko bien batura da, eta $n$ errenkada 1 zenbakiarekin hasi eta amaitzen da. Simetriagatik, $\\binom{n}{k}=\\binom{n}{n-k}$.',
            'El número combinatorio $\\binom{n}{k}$ cuenta de cuántas formas se eligen $k$ cosas entre $n$, sin importar el orden. Se calcula con factoriales, pero también aparece en el triángulo de Tartaglia: cada número es la suma de los dos de encima, y la fila $n$ empieza y acaba en 1. Por simetría, $\\binom{n}{k}=\\binom{n}{n-k}$.',
            'العدد التوافقي $\\binom{n}{k}$ يعدّ طرق اختيار $k$ أشياء من بين $n$ دون مراعاة الترتيب. يُحسب بالمضروب، ويظهر أيضًا في مثلث تارتاليا: كل عدد مجموع العددين فوقه، والصف $n$ يبدأ بالعدد 1 وينتهي به. وبالتناظر $\\binom{n}{k}=\\binom{n}{n-k}$.',
            'The binomial coefficient $\\binom{n}{k}$ counts how many ways there are to choose $k$ things out of $n$, regardless of order. It is worked out with factorials, but it also appears in Tartaglia\'s triangle: each number is the sum of the two above it, and row $n$ starts and ends with 1. By symmetry, $\\binom{n}{k}=\\binom{n}{n-k}$.'
        ),
        examplePrompt: say('Kalkulatu $\\binom{9}{7}$ eta $\\binom{10}{0}$.', 'Calcula $\\binom{9}{7}$ y $\\binom{10}{0}$.', 'احسب $\\binom{9}{7}$ و$\\binom{10}{0}$.', 'Work out $\\binom{9}{7}$ and $\\binom{10}{0}$.'),
        example: same('$\\begin{gathered}\\binom{9}{7}=\\binom{9}{2}=\\frac{9\\cdot 8}{2}=36\\\\ \\binom{10}{0}=1\\end{gathered}$'),
        exampleAnswer: say('$36$ eta $1$: simetriak kalkulua laburtzen du.', '$36$ y $1$: la simetría acorta la cuenta.', '$36$ و$1$: التناظر يختصر الحساب.', '$36$ and $1$: symmetry makes the sum shorter.')
    },
    newton: {
        definitions: [
            {
                term: say('Binomioa', 'Binomio', 'ذات الحدين', 'Binomial'),
                meaning: say('Bi gairen batura edo kendura: $a+b$, $2x-1$.', 'Suma o resta de dos términos: $a+b$, $2x-1$.', 'مجموع حدّين أو فرقهما: $a+b$ و$2x-1$.', 'A sum or difference of two terms: $a+b$, $2x-1$.')
            }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('gai orokorra', 'término general', 'الحد العام', 'general term'),
            say('garatu', 'desarrollar', 'انشر', 'expand')
        ],
        explanation: say(
            '$(a+b)^n$ garatzeko ez da $n$ aldiz biderkatu behar. Gai bakoitzak zenbaki konbinatorio bat du, $\\binom{n}{k}$, Tartagliaren $n$ errenkadatik ateratzen dena; $a$ zenbakiaren berretzailea $n$ zenbakitik 0 zenbakira jaisten da, eta $b$ zenbakiarena 0 zenbakitik $n$ zenbakira igotzen. Gai orokorra, $k+1$ lekuan dagoena, $\\binom{n}{k}a^{n-k}b^k$ da.',
            'Para desarrollar $(a+b)^n$ no hace falta multiplicar $n$ veces. Cada término lleva un número combinatorio, $\\binom{n}{k}$, que sale de la fila $n$ de Tartaglia; el exponente de $a$ baja de $n$ a 0 y el de $b$ sube de 0 a $n$. El término general, el que ocupa el lugar $k+1$, es $\\binom{n}{k}a^{n-k}b^k$.',
            'لنشر $(a+b)^n$ لا نحتاج إلى الضرب $n$ مرة. كل حدّ فيه عدد توافقي $\\binom{n}{k}$ يؤخذ من الصف $n$ في مثلث تارتاليا، وأس $a$ ينقص من $n$ إلى 0 وأس $b$ يزيد من 0 إلى $n$. والحد العام، الذي رتبته $k+1$، هو $\\binom{n}{k}a^{n-k}b^k$.',
            'To expand $(a+b)^n$ you do not need to multiply $n$ times. Each term carries a binomial coefficient, $\\binom{n}{k}$, taken from row $n$ of Tartaglia; the exponent of $a$ goes down from $n$ to 0 and that of $b$ goes up from 0 to $n$. The general term, the one in place $k+1$, is $\\binom{n}{k}a^{n-k}b^k$.'
        ),
        examplePrompt: say('Aurkitu $(2x+1)^5$ garapenaren laugarren gaia.', 'Halla el cuarto término de $(2x+1)^5$.', 'أوجد الحد الرابع في نشر $(2x+1)^5$.', 'Find the fourth term of $(2x+1)^5$.'),
        example: same('$\\binom{5}{3}(2x)^{2}\\cdot 1^{3}=10\\cdot 4x^2=40x^2$'),
        exampleAnswer: say('$40x^2$: laugarren gaia $k=3$ duena da.', '$40x^2$: el cuarto término es el de $k=3$.', '$40x^2$: الحد الرابع هو الذي فيه $k=3$.', '$40x^2$: the fourth term is the one with $k=3$.'),
        why: {
            text: say(
                'Zergatik agertzen dira zenbaki konbinatorioak? $(a+b)^n$ garatzea $n$ parentesi biderkatzea da. $b^k$ duen gai baterako, $b$ aukeratzen duzu horietako $k$ parentesitan eta $a$ gainerakoetan, eta hori $\\binom{n}{k}$ modutan egin daiteke.',
                '¿Por qué salen números combinatorios? Desarrollar $(a+b)^n$ es multiplicar $n$ paréntesis. Para un término con $b^k$ eliges $b$ en $k$ de ellos y $a$ en el resto, y eso se puede hacer de $\\binom{n}{k}$ formas.',
                'لماذا تظهر الأعداد التوافقية؟ نشر $(a+b)^n$ هو ضرب $n$ من الأقواس. ولحدّ فيه $b^k$ تختار $b$ من $k$ أقواس منها و$a$ من الباقي، ويمكن ذلك بعدد $\\binom{n}{k}$ من الطرق.',
                'Why do binomial coefficients appear? Expanding $(a+b)^n$ is multiplying $n$ brackets. For a term with $b^k$ you pick $b$ in $k$ of them and $a$ in the rest, and that can be done in $\\binom{n}{k}$ ways.'
            ),
            math: same('$(a+b)^3=a^3+3a^2b+3ab^2+b^3$')
        }
    }
}

import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { TrigonometryTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Trigonometria · 4. DBH akademikoak — what each lesson tells: the new
   words (definitions), a short explanation, its cases, the example as an
   exercise («Another example»), the key words in four languages and, in
   three lessons, «Why does it work?». Plain data so the tests can import
   it. Formulas write \sin and \tan in every language; lessons.tsx turns
   them into sen and tg where the language says so (localizeNames in
   text.ts). Arabic writes the decimal point ({,} becomes .).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const trigonometryLessonTexts: Record<TrigonometryTopicId, LessonTexts> = {
    /* ---------- 1. Ratios ---------- */
    'right-ratios': {
        definitions: [
            {
                term: say('Arrazoi trigonometrikoak', 'Razones trigonométricas', 'النسب المثلثية', 'Trigonometric ratios'),
                meaning: say('Sinua, kosinua eta tangentea: triangelu angeluzuzen baten aldeen arteko zatidurak, angelu zorrotz baten araberakoak.', 'El seno, el coseno y la tangente: cocientes entre los lados de un triángulo rectángulo que dependen de un ángulo agudo.', 'الجيب وجيب التمام والظل: نسب بين أضلاع مثلث قائم تتعلق بزاوية حادة.', 'Sine, cosine and tangent: ratios between the sides of a right-angled triangle that depend on an acute angle.')
            }
        ],
        vocabulary: [
            say('aurkakoa', 'opuesto', 'المقابل', 'opposite'),
            say('ondokoa', 'contiguo', 'المجاور', 'adjacent'),
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse')
        ],
        explanation: say(
            'Triangelu angeluzuzen batean, $\\alpha$ angelu zorrotzarekiko, aurkako katetoa angeluaren aurrean dago, eta ondokoak hipotenusarekin batera osatzen du angelua. Hiru arrazoiak alde horien arteko zatidurak dira; marrazkiko 3-4-5 triangeluan, honela:',
            'En un triángulo rectángulo, respecto de un ángulo agudo $\\alpha$, el cateto opuesto está enfrente del ángulo, y el contiguo lo forma junto con la hipotenusa. Las tres razones son cocientes entre esos lados; en el triángulo 3-4-5 del dibujo, así:',
            'في المثلث القائم، بالنسبة إلى زاوية حادة $\\alpha$، يقع الضلع المقابل أمام الزاوية، ويكوّنها الضلع المجاور مع الوتر. والنسب الثلاث خوارج قسمة بين هذه الأضلاع؛ وفي المثلث 3-4-5 المرسوم هي:',
            'In a right-angled triangle, for an acute angle $\\alpha$, the opposite leg is in front of the angle, and the adjacent leg forms it together with the hypotenuse. The three ratios are quotients of those sides; in the 3-4-5 triangle of the drawing:'
        ),
        cases: [
            { title: say('Sinua', 'Seno', 'الجيب', 'Sine'), text: say('Aurkakoa zati hipotenusa.', 'Opuesto entre hipotenusa.', 'المقابل على الوتر.', 'Opposite over hypotenuse.'), math: same('$\\sin\\alpha=\\frac{3}{5}=0{,}6$') },
            { title: say('Kosinua', 'Coseno', 'جيب التمام', 'Cosine'), text: say('Ondokoa zati hipotenusa.', 'Contiguo entre hipotenusa.', 'المجاور على الوتر.', 'Adjacent over hypotenuse.'), math: same('$\\cos\\alpha=\\frac{4}{5}=0{,}8$') },
            { title: say('Tangentea', 'Tangente', 'الظل', 'Tangent'), text: say('Aurkakoa zati ondokoa.', 'Opuesto entre contiguo.', 'المقابل على المجاور.', 'Opposite over adjacent.'), math: same('$\\tan\\alpha=\\frac{3}{4}=0{,}75$') }
        ],
        examplePrompt: say('Triangelu angeluzuzen baten katetoak 7 eta 24 dira. Kalkulatu 7 katetoaren aurkako angeluaren arrazoiak.', 'Un triángulo rectángulo tiene catetos 7 y 24. Calcula las razones del ángulo opuesto al cateto de 7.', 'مثلث قائم ضلعاه القائمان 7 و24. احسب نسب الزاوية المقابلة للضلع 7.', 'A right-angled triangle has legs 7 and 24. Work out the ratios of the angle opposite the leg of 7.'),
        example: same('$\\begin{gathered}\\sqrt{7^{2}+24^{2}}=25\\\\ \\sin\\alpha=\\frac{7}{25}\\qquad\\cos\\alpha=\\frac{24}{25}\\\\ \\tan\\alpha=\\frac{7}{24}\\end{gathered}$'),
        exampleAnswer: say('Hipotenusa 25 da: alderik handiena, angelu zuzenaren aurrean.', 'La hipotenusa es 25: el lado mayor, enfrente del ángulo recto.', 'الوتر 25: أطول الأضلاع، أمام الزاوية القائمة.', 'The hypotenuse is 25: the longest side, opposite the right angle.')
    },
    'ratio-properties': {
        vocabulary: [
            say('antzekoak', 'semejantes', 'متشابهة', 'similar'),
            say('osagarriak', 'complementarios', 'متتامّتان', 'complementary')
        ],
        explanation: say(
            'Angelu zorrotz bera duten triangelu angeluzuzen guztiak antzekoak dira, eta haien arrazoiak berdinak: 3-4-5, 6-8-10 eta 9-12-15 triangeluetan, $\\sin\\alpha=\\frac{3}{5}=\\frac{6}{10}=\\frac{9}{15}$. Arrazoiak angeluaren araberakoak dira, ez tamainarenak. Katetoak hipotenusa baino txikiagoak direnez, sinua eta kosinua 0 eta 1 artean daude.',
            'Todos los triángulos rectángulos con el mismo ángulo agudo son semejantes, así que sus razones coinciden: en los triángulos 3-4-5, 6-8-10 y 9-12-15, $\\sin\\alpha=\\frac{3}{5}=\\frac{6}{10}=\\frac{9}{15}$. Las razones dependen del ángulo, no del tamaño. Como los catetos son menores que la hipotenusa, el seno y el coseno están entre 0 y 1.',
            'كل المثلثات القائمة التي لها الزاوية الحادة نفسها متشابهة، فنسبها متساوية: في المثلثات 3-4-5 و6-8-10 و9-12-15 يكون $\\sin\\alpha=\\frac{3}{5}=\\frac{6}{10}=\\frac{9}{15}$. النسب تتعلق بالزاوية لا بالحجم. ولأن الضلعين القائمين أقصر من الوتر فالجيب وجيب التمام بين 0 و1.',
            'All right-angled triangles with the same acute angle are similar, so their ratios are equal: in the triangles 3-4-5, 6-8-10 and 9-12-15, $\\sin\\alpha=\\frac{3}{5}=\\frac{6}{10}=\\frac{9}{15}$. The ratios depend on the angle, not on the size. As the legs are shorter than the hypotenuse, sine and cosine lie between 0 and 1.'
        ),
        cases: [
            { title: say('Angelu osagarriak', 'Ángulos complementarios', 'زاويتان متتامّتان', 'Complementary angles'), text: say('Batek 90° osatzen badu besteekin, baten sinua bestearen kosinua da.', 'Si suman 90°, el seno de uno es el coseno del otro.', 'إذا كان مجموعهما 90° فجيب إحداهما جيب تمام الأخرى.', 'If they add up to 90°, the sine of one is the cosine of the other.'), math: same('$\\sin(90°-\\alpha)=\\cos\\alpha$') },
            { title: say('Tangentea', 'Tangente', 'الظل', 'Tangent'), text: say('Edozein zenbaki positibo izan daiteke; osagarriarena alderantzizkoa da.', 'Puede valer cualquier número positivo; la del complementario es la inversa.', 'قد يكون أي عدد موجب؛ وظل المتممة هو المقلوب.', 'It can be any positive number; that of the complementary angle is its reciprocal.'), math: same('$\\tan(90°-\\alpha)=\\dfrac{1}{\\tan\\alpha}$') }
        ],
        examplePrompt: say('$\\sin 20°\\approx 0{,}34$ eta $\\cos 20°\\approx 0{,}94$ badira, zenbat dira $\\sin 70°$ eta $\\cos 70°$?', 'Si $\\sin 20°\\approx 0{,}34$ y $\\cos 20°\\approx 0{,}94$, ¿cuánto valen $\\sin 70°$ y $\\cos 70°$?', 'إذا كان $\\sin 20°\\approx 0{,}34$ و$\\cos 20°\\approx 0{,}94$ فكم يساوي $\\sin 70°$ و$\\cos 70°$؟', 'If $\\sin 20°\\approx 0{,}34$ and $\\cos 20°\\approx 0{,}94$, what are $\\sin 70°$ and $\\cos 70°$?'),
        example: same('$\\begin{gathered}\\sin 70°=\\cos 20°\\approx 0{,}94\\\\ \\cos 70°=\\sin 20°\\approx 0{,}34\\end{gathered}$'),
        exampleAnswer: say('70° eta 20° osagarriak dira: sinua eta kosinua trukatzen dituzte.', '70° y 20° son complementarios: intercambian seno y coseno.', '70° و20° متتامّتان: تتبادلان الجيب وجيب التمام.', '70° and 20° are complementary: they swap sine and cosine.')
    },
    'notable-angles': {
        vocabulary: [
            say('diagonala', 'diagonal', 'القطر', 'diagonal'),
            say('aldeberdina', 'equilátero', 'متساوي الأضلاع', 'equilateral')
        ],
        explanation: say(
            'Haien arrazoiak kalkulagailurik gabe ateratzen dira. 1 aldeko karratua diagonalaz zatituz, 45 graduko triangelu bat geratzen da, 1 katetoekin eta $\\sqrt{2}$ hipotenusarekin. 2 aldeko triangelu aldeberdina altueraz zatituz, 30 eta 60 graduko angeluak geratzen dira, 1, $\\sqrt{3}$ eta 2 aldeekin.',
            'Sus razones salen sin calculadora. Partiendo por la diagonal un cuadrado de lado 1 queda un triángulo de 45° con catetos 1 e hipotenusa $\\sqrt{2}$. Partiendo por la altura un triángulo equilátero de lado 2 quedan ángulos de 30° y 60°, con lados 1, $\\sqrt{3}$ y 2.',
            'تُستخرج نسبها دون آلة حاسبة. بقطع مربع ضلعه 1 بقطره نحصل على مثلث زاويته 45° ضلعاه القائمان 1 ووتره $\\sqrt{2}$. وبقطع مثلث متساوي الأضلاع ضلعه 2 بارتفاعه نحصل على زاويتين 30° و60° وأضلاع 1 و$\\sqrt{3}$ و2.',
            'Their ratios come out without a calculator. Cutting a square of side 1 along its diagonal gives a 45° triangle with legs 1 and hypotenuse $\\sqrt{2}$. Cutting an equilateral triangle of side 2 along its height gives angles of 30° and 60°, with sides 1, $\\sqrt{3}$ and 2.'
        ),
        cases: [
            { title: same('30°'), text: say('$\\tan 30°=\\frac{\\sqrt{3}}{3}$.', '$\\tan 30°=\\frac{\\sqrt{3}}{3}$.', '$\\tan 30°=\\frac{\\sqrt{3}}{3}$.', '$\\tan 30°=\\frac{\\sqrt{3}}{3}$.'), math: same('$\\sin 30°=\\frac{1}{2}\\qquad\\cos 30°=\\frac{\\sqrt{3}}{2}$') },
            { title: same('45°'), text: say('$\\tan 45°=1$.', '$\\tan 45°=1$.', '$\\tan 45°=1$.', '$\\tan 45°=1$.'), math: same('$\\sin 45°=\\cos 45°=\\frac{\\sqrt{2}}{2}$') },
            { title: same('60°'), text: say('$\\tan 60°=\\sqrt{3}$.', '$\\tan 60°=\\sqrt{3}$.', '$\\tan 60°=\\sqrt{3}$.', '$\\tan 60°=\\sqrt{3}$.'), math: same('$\\sin 60°=\\frac{\\sqrt{3}}{2}\\qquad\\cos 60°=\\frac{1}{2}$') }
        ],
        examplePrompt: say('4 m-ko eskailera batek 60 graduko angelua egiten du lurrarekin. Zer altueraraino iristen da?', 'Una escalera de 4 m forma 60° con el suelo. ¿A qué altura llega?', 'سُلّم طوله 4 م يصنع زاوية 60° مع الأرض. إلى أي ارتفاع يصل؟', 'A 4 m ladder makes 60° with the ground. How high does it reach?'),
        example: same('$\\begin{gathered}h=4\\cdot\\sin 60°=4\\cdot\\frac{\\sqrt{3}}{2}\\\\ h=2\\sqrt{3}\\approx 3{,}46\\end{gathered}$'),
        exampleAnswer: say('3,46 m inguru: altuera 60 graduko angeluaren aurkako katetoa da.', 'Unos 3,46 m: la altura es el cateto opuesto a 60°.', 'نحو 3.46 م: الارتفاع هو الضلع المقابل للزاوية 60°.', 'About 3.46 m: the height is the leg opposite 60°.')
    },

    /* ---------- 2. Fundamental relations ---------- */
    fundamental: {
        vocabulary: [
            say('karratua', 'cuadrado', 'مربع', 'square'),
            say('zorrotza', 'agudo', 'حادة', 'acute')
        ],
        explanation: say(
            'Hartu 1 hipotenusako triangelu angeluzuzen bat: haren katetoak $\\sin\\alpha$ eta $\\cos\\alpha$ dira, eta Pitagorasek $\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$ ematen du, edozein angelurako. Gainera, $\\tan\\alpha=\\dfrac{\\sin\\alpha}{\\cos\\alpha}$. Lehena $\\cos^{2}\\alpha$ adierazpenaz zatituz, $1+\\tan^{2}\\alpha=\\dfrac{1}{\\cos^{2}\\alpha}$ ateratzen da.',
            'Toma un triángulo rectángulo de hipotenusa 1: sus catetos son $\\sin\\alpha$ y $\\cos\\alpha$, y Pitágoras da $\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$, para cualquier ángulo. Además, $\\tan\\alpha=\\dfrac{\\sin\\alpha}{\\cos\\alpha}$. Dividiendo la primera entre $\\cos^{2}\\alpha$ sale $1+\\tan^{2}\\alpha=\\dfrac{1}{\\cos^{2}\\alpha}$.',
            'خذ مثلثًا قائمًا وتره 1: ضلعاه القائمان $\\sin\\alpha$ و$\\cos\\alpha$، وفيثاغورس يعطي $\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$ لأي زاوية. كذلك $\\tan\\alpha=\\dfrac{\\sin\\alpha}{\\cos\\alpha}$. وبقسمة الأولى على $\\cos^{2}\\alpha$ نحصل على $1+\\tan^{2}\\alpha=\\dfrac{1}{\\cos^{2}\\alpha}$.',
            'Take a right-angled triangle with hypotenuse 1: its legs are $\\sin\\alpha$ and $\\cos\\alpha$, and Pythagoras gives $\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$, for any angle. Also, $\\tan\\alpha=\\dfrac{\\sin\\alpha}{\\cos\\alpha}$. Dividing the first by $\\cos^{2}\\alpha$ gives $1+\\tan^{2}\\alpha=\\dfrac{1}{\\cos^{2}\\alpha}$.'
        ),
        examplePrompt: say('$\\alpha$ zorrotza da eta $\\cos\\alpha=0{,}28$. Kalkulatu $\\sin\\alpha$ eta $\\tan\\alpha$.', 'Si $\\alpha$ es agudo y $\\cos\\alpha=0{,}28$, calcula $\\sin\\alpha$ y $\\tan\\alpha$.', 'إذا كانت $\\alpha$ حادة و$\\cos\\alpha=0{,}28$ فاحسب $\\sin\\alpha$ و$\\tan\\alpha$.', 'If $\\alpha$ is acute and $\\cos\\alpha=0{,}28$, work out $\\sin\\alpha$ and $\\tan\\alpha$.'),
        example: same('$\\begin{gathered}\\sin^{2}\\alpha=1-0{,}28^{2}=0{,}9216\\\\ \\sin\\alpha=0{,}96\\qquad\\tan\\alpha=\\frac{0{,}96}{0{,}28}\\approx 3{,}43\\end{gathered}$'),
        exampleAnswer: say('Angelu zorrotza: sinua positiboa da, $0{,}96$.', 'Ángulo agudo: el seno es positivo, $0{,}96$.', 'زاوية حادة: الجيب موجب، $0{,}96$.', 'An acute angle: the sine is positive, $0{,}96$.')
    },
    'one-ratio': {
        vocabulary: [
            say('tangentea', 'tangente', 'الظل', 'tangent'),
            say('triangelua', 'triángulo', 'المثلث', 'triangle')
        ],
        explanation: say(
            'Arrazoi bat ematen badute, besteak oinarrizko erlazioetatik ateratzen dira. Sinutik edo kosinutik, erabili $\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$. Tangentetik, $1+\\tan^{2}\\alpha=\\dfrac{1}{\\cos^{2}\\alpha}$ erlazioak kosinua ematen du, eta gero $\\sin\\alpha=\\tan\\alpha\\cdot\\cos\\alpha$. Beste bide bat: marraztu arrazoi hori duen triangelu bat eta osatu Pitagorasekin.',
            'Si te dan una razón, las otras salen de las relaciones fundamentales. Desde el seno o el coseno, usa $\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$. Desde la tangente, $1+\\tan^{2}\\alpha=\\dfrac{1}{\\cos^{2}\\alpha}$ da el coseno, y después $\\sin\\alpha=\\tan\\alpha\\cdot\\cos\\alpha$. Otro camino: dibuja un triángulo con esa razón y complétalo con Pitágoras.',
            'إذا أُعطيت نسبة فالنسب الأخرى تُستخرج من العلاقات الأساسية. من الجيب أو جيب التمام استعمل $\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$. ومن الظل تعطي $1+\\tan^{2}\\alpha=\\dfrac{1}{\\cos^{2}\\alpha}$ جيب التمام، ثم $\\sin\\alpha=\\tan\\alpha\\cdot\\cos\\alpha$. وطريق آخر: ارسم مثلثًا له تلك النسبة وأكمله بفيثاغورس.',
            'If you are given one ratio, the others come from the fundamental relations. From the sine or cosine, use $\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$. From the tangent, $1+\\tan^{2}\\alpha=\\dfrac{1}{\\cos^{2}\\alpha}$ gives the cosine, and then $\\sin\\alpha=\\tan\\alpha\\cdot\\cos\\alpha$. Another way: draw a triangle with that ratio and complete it with Pythagoras.'
        ),
        examplePrompt: say('$\\alpha$ zorrotza da eta $\\tan\\alpha=\\frac{20}{21}$. Kalkulatu $\\sin\\alpha$ eta $\\cos\\alpha$, triangelua marraztuz.', 'Si $\\alpha$ es agudo y $\\tan\\alpha=\\frac{20}{21}$, calcula $\\sin\\alpha$ y $\\cos\\alpha$ dibujando el triángulo.', 'إذا كانت $\\alpha$ حادة و$\\tan\\alpha=\\frac{20}{21}$ فاحسب $\\sin\\alpha$ و$\\cos\\alpha$ برسم المثلث.', 'If $\\alpha$ is acute and $\\tan\\alpha=\\frac{20}{21}$, work out $\\sin\\alpha$ and $\\cos\\alpha$ by drawing the triangle.'),
        example: same('$\\begin{gathered}\\sqrt{20^{2}+21^{2}}=29\\\\ \\sin\\alpha=\\frac{20}{29}\\qquad\\cos\\alpha=\\frac{21}{29}\\end{gathered}$'),
        exampleAnswer: say('Aurkako katetoa 20, ondokoa 21 eta hipotenusa 29.', 'Cateto opuesto 20, contiguo 21 e hipotenusa 29.', 'الضلع المقابل 20 والمجاور 21 والوتر 29.', 'Opposite leg 20, adjacent 21 and hypotenuse 29.')
    },
    calculator: {
        vocabulary: [
            say('kalkulagailua', 'calculadora', 'الآلة الحاسبة', 'calculator'),
            say('minutuak', 'minutos', 'الدقائق', 'minutes')
        ],
        explanation: say(
            'Jarri kalkulagailua DEG moduan (graduak). Angelutik arrazoira: sin, cos edo tan tekla eta angelua: $\\tan 22°\\approx 0{,}404$. Arrazoitik angelura: SHIFT eta tekla bera. Angeluak gradu, minutu eta segundotan ematen dira, $1°=60\'$ eta $1\'=60\'\'$ direla: graduen zati hamartarra bider 60 eginda minutuak ateratzen dira.',
            'Pon la calculadora en modo DEG (grados). Del ángulo a la razón: tecla sin, cos o tan y el ángulo: $\\tan 22°\\approx 0{,}404$. De la razón al ángulo: SHIFT y la misma tecla. Los ángulos se dan en grados, minutos y segundos, con $1°=60\'$ y $1\'=60\'\'$: la parte decimal de los grados, por 60, da los minutos.',
            'ضع الآلة الحاسبة في وضع DEG (الدرجات). من الزاوية إلى النسبة: المفتاح sin أو cos أو tan ثم الزاوية: $\\tan 22°\\approx 0{,}404$. ومن النسبة إلى الزاوية: SHIFT والمفتاح نفسه. وتُعطى الزوايا بالدرجات والدقائق والثواني، مع $1°=60\'$ و$1\'=60\'\'$: الجزء العشري من الدرجات مضروبًا في 60 يعطي الدقائق.',
            'Put the calculator in DEG mode (degrees). From angle to ratio: the sin, cos or tan key and the angle: $\\tan 22°\\approx 0{,}404$. From ratio to angle: SHIFT and the same key. Angles are given in degrees, minutes and seconds, with $1°=60\'$ and $1\'=60\'\'$: the decimal part of the degrees, times 60, gives the minutes.'
        ),
        examplePrompt: say('Pasatu $38{,}75°$ gradu eta minututara, eta aurkitu $\\alpha$, $\\sin\\alpha=0{,}9$ bada.', 'Pasa $38{,}75°$ a grados y minutos, y halla $\\alpha$ si $\\sin\\alpha=0{,}9$.', 'حوّل $38{,}75°$ إلى درجات ودقائق، وجد $\\alpha$ إذا كان $\\sin\\alpha=0{,}9$.', 'Convert $38{,}75°$ to degrees and minutes, and find $\\alpha$ if $\\sin\\alpha=0{,}9$.'),
        example: same('$\\begin{gathered}0{,}75\\cdot 60=45\\ \\to\\ 38°\\,45\'\\\\ \\sin\\alpha=0{,}9\\ \\to\\ \\alpha\\approx 64{,}16°\\end{gathered}$'),
        exampleAnswer: say('SHIFT sin 0,9 sakatuta, 64,16° inguru ateratzen da.', 'SHIFT sin 0,9 da unos 64,16°.', 'SHIFT sin 0.9 تعطي نحو 64.16°.', 'SHIFT sin 0.9 gives about 64.16°.')
    },

    /* ---------- 3. Solving right triangles ---------- */
    'two-sides': {
        vocabulary: [
            say('triangelua ebatzi', 'resolver un triángulo', 'حل المثلث', 'solve a triangle'),
            say('angelua', 'ángulo', 'الزاوية', 'angle')
        ],
        explanation: say(
            'Triangelu bat ebaztea haren hiru aldeak eta hiru angeluak aurkitzea da. Angeluzuzenean, bat 90° da, eta beste biek 90° batzen dute. Bi alde ezagututa, hirugarrena Pitagorasekin ateratzen da, eta angelu bat, bi alde horiek lotzen dituen arrazoiarekin: bi katetoekin, tangentea; kateto batekin eta hipotenusarekin, sinua edo kosinua.',
            'Resolver un triángulo es hallar sus tres lados y sus tres ángulos. En el rectángulo, uno mide 90° y los otros dos suman 90°. Con dos lados, el tercero sale con Pitágoras, y un ángulo, con la razón que une esos dos lados: con los dos catetos, la tangente; con un cateto y la hipotenusa, el seno o el coseno.',
            'حل المثلث هو إيجاد أضلاعه الثلاثة وزواياه الثلاث. في المثلث القائم إحدى الزوايا 90° ومجموع الأخريين 90°. ومع ضلعين يُستخرج الثالث بفيثاغورس، وتُستخرج زاوية بالنسبة التي تربط هذين الضلعين: مع الضلعين القائمين الظل، ومع ضلع قائم والوتر الجيب أو جيب التمام.',
            'Solving a triangle means finding its three sides and three angles. In a right-angled one, one angle is 90° and the other two add up to 90°. With two sides, the third comes from Pythagoras, and an angle from the ratio that links those two sides: with both legs, the tangent; with a leg and the hypotenuse, the sine or cosine.'
        ),
        examplePrompt: say('Triangelu angeluzuzen baten kateto batek 9 cm eta hipotenusak 15 cm neurtzen dituzte. Ebatzi triangelua.', 'Un triángulo rectángulo tiene un cateto de 9 cm y una hipotenusa de 15 cm. Resuélvelo.', 'مثلث قائم أحد ضلعيه القائمين 9 سم ووتره 15 سم. حلّه.', 'A right-angled triangle has a 9 cm leg and a 15 cm hypotenuse. Solve it.'),
        example: same('$\\begin{gathered}\\sqrt{15^{2}-9^{2}}=12\\\\ \\sin\\alpha=\\frac{9}{15}\\ \\to\\ \\alpha\\approx 36{,}87°\\\\ \\beta\\approx 90°-36{,}87°=53{,}13°\\end{gathered}$'),
        exampleAnswer: say('Aldeak 9, 12 eta 15; angeluak 90°, 36,87° inguru eta 53,13° inguru.', 'Lados 9, 12 y 15; ángulos 90°, unos 36,87° y unos 53,13°.', 'الأضلاع 9 و12 و15؛ والزوايا 90° ونحو 36.87° ونحو 53.13°.', 'Sides 9, 12 and 15; angles 90°, about 36.87° and about 53.13°.')
    },
    'side-angle': {
        vocabulary: [
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Beste angelu zorrotza berehala ateratzen da: $90°-\\alpha$. Alde baterako, aukeratu alde ezaguna eta bilatzen duzuna lotzen dituen arrazoia, eta askatu: aurkakoa eta hipotenusa, sinua; ondokoa eta hipotenusa, kosinua; bi katetoak, tangentea. Ezezaguna zenbakitzailean geratzen bada, biderkatu; izendatzailean geratzen bada, zatitu.',
            'El otro ángulo agudo sale enseguida: $90°-\\alpha$. Para un lado, elige la razón que une el lado conocido y el buscado, y despeja: opuesto e hipotenusa, el seno; contiguo e hipotenusa, el coseno; los dos catetos, la tangente. Si la incógnita queda en el numerador, multiplica; si queda en el denominador, divide.',
            'الزاوية الحادة الأخرى تُستخرج فورًا: $90°-\\alpha$. ولإيجاد ضلع اختر النسبة التي تربط الضلع المعلوم بالمطلوب واعزل: المقابل والوتر الجيب، والمجاور والوتر جيب التمام، والضلعان القائمان الظل. إذا بقي المجهول في البسط فاضرب، وإذا بقي في المقام فاقسم.',
            'The other acute angle comes straight away: $90°-\\alpha$. For a side, choose the ratio linking the known side and the one you want, and solve: opposite and hypotenuse, the sine; adjacent and hypotenuse, the cosine; both legs, the tangent. If the unknown ends up in the numerator, multiply; if it ends up in the denominator, divide.'
        ),
        examplePrompt: say('Triangelu angeluzuzen baten hipotenusak 20 cm neurtzen ditu, eta angelu batek 25°. Kalkulatu katetoak.', 'La hipotenusa de un triángulo rectángulo mide 20 cm y un ángulo, 25°. Calcula los catetos.', 'وتر مثلث قائم 20 سم وإحدى زواياه 25°. احسب الضلعين القائمين.', 'The hypotenuse of a right-angled triangle is 20 cm and one angle is 25°. Work out the legs.'),
        example: same('$\\begin{gathered}20\\cdot\\sin 25°\\approx 8{,}45\\\\ 20\\cdot\\cos 25°\\approx 18{,}13\\end{gathered}$'),
        exampleAnswer: say('Beste angeluak 65° neurtzen ditu; katetoek, 8,45 cm eta 18,13 cm inguru.', 'El otro ángulo mide 65°; los catetos, unos 8,45 cm y 18,13 cm.', 'الزاوية الأخرى 65°؛ والضلعان القائمان نحو 8.45 سم و18.13 سم.', 'The other angle is 65°; the legs are about 8.45 cm and 18.13 cm.')
    },
    elevation: {
        definitions: [
            {
                term: say('Goratze-angelua', 'Ángulo de elevación', 'زاوية الارتفاع', 'Angle of elevation'),
                meaning: say('Horizontalak eta goragoko objektu baterako ikusmira-lerroak osatzen dutena.', 'El que forma la horizontal con la visual hacia un objeto más alto.', 'الزاوية بين الأفق وخط النظر إلى شيء أعلى.', 'The one between the horizontal and the line of sight to a higher object.')
            },
            {
                term: say('Beheratze-angelua', 'Ángulo de depresión', 'زاوية الانخفاض', 'Angle of depression'),
                meaning: say('Horizontalak eta beheragoko objektu baterako ikusmira-lerroak osatzen dutena.', 'El que forma la horizontal con la visual hacia un objeto más bajo.', 'الزاوية بين الأفق وخط النظر إلى شيء أدنى.', 'The one between the horizontal and the line of sight to a lower object.')
            }
        ],
        vocabulary: [
            say('horizontala', 'horizontal', 'الأفق', 'horizontal'),
            say('ikusmira', 'visual', 'خط النظر', 'line of sight')
        ],
        explanation: say(
            'Bi kasuetan triangelu angeluzuzen bat sortzen da, eta haren katetoak altuera bertikala eta distantzia horizontala dira; arrazoirik erabilgarriena tangentea da: $h=d\\cdot\\tan\\alpha$. Ezagutzen dena ikusmira bada, kable bat edo arrapala bat bezala, erabili sinua edo kosinua.',
            'En los dos casos se forma un triángulo rectángulo cuyos catetos son la altura vertical y la distancia horizontal, y la razón más útil es la tangente: $h=d\\cdot\\tan\\alpha$. Si lo que se conoce es la visual, como un cable o una rampa, usa el seno o el coseno.',
            'في الحالتين يتكوّن مثلث قائم ضلعاه القائمان الارتفاع العمودي والمسافة الأفقية، والنسبة الأنفع هي الظل: $h=d\\cdot\\tan\\alpha$. وإذا كان المعلوم هو خط النظر، كسلك أو منحدر، فاستعمل الجيب أو جيب التمام.',
            'In both cases a right-angled triangle forms whose legs are the vertical height and the horizontal distance, and the most useful ratio is the tangent: $h=d\\cdot\\tan\\alpha$. If what you know is the line of sight, like a cable or a ramp, use the sine or the cosine.'
        ),
        examplePrompt: say('30 m-ko itsasargi batetik, itsasontzi bat 15 graduko beheratze-angeluarekin ikusten da. Zer distantziatara dago?', 'Desde un faro de 30 m de altura se ve un barco con un ángulo de depresión de 15°. ¿A qué distancia está?', 'من منارة ارتفاعها 30 م يُرى قارب بزاوية انخفاض 15°. على أي مسافة هو؟', 'From a 30 m lighthouse a boat is seen at an angle of depression of 15°. How far away is it?'),
        example: same('$\\begin{gathered}\\tan 15°=\\frac{30}{d}\\\\ d=\\frac{30}{\\tan 15°}\\approx 111{,}96\\end{gathered}$'),
        exampleAnswer: say('112 m inguru: beheratze-angelua itsasontzitik ikusitako goratze-angeluaren berdina da.', 'Unos 112 m: el ángulo de depresión es igual al de elevación desde el barco.', 'نحو 112 م: زاوية الانخفاض تساوي زاوية الارتفاع من القارب.', 'About 112 m: the angle of depression equals the angle of elevation from the boat.'),
        why: {
            text: say(
                'Itsasargiko horizontala eta itsasontzikoa paraleloak dira, eta ikusmirak biak mozten ditu. Paraleloen eta ebakitzaile baten angelu txandakatuak berdinak dira; horregatik, goitik ikusitako beheratze-angelua behetik ikusitako goratze-angeluaren berdina da.',
                'La horizontal del faro y la del barco son paralelas, y la visual corta a las dos. Los ángulos alternos entre paralelas y una secante son iguales; por eso el ángulo de depresión desde arriba es igual al de elevación desde abajo.',
                'أفق المنارة وأفق القارب متوازيان، وخط النظر يقطعهما. والزاويتان المتبادلتان بين متوازيين وقاطع متساويتان؛ لذلك زاوية الانخفاض من الأعلى تساوي زاوية الارتفاع من الأسفل.',
                'The horizontal at the lighthouse and the one at the boat are parallel, and the line of sight crosses both. Alternate angles between parallel lines and a transversal are equal; that is why the angle of depression from above equals the angle of elevation from below.'
            )
        }
    },

    /* ---------- 4. Heights, distances and areas ---------- */
    'double-observation': {
        vocabulary: [
            say('ekuazioa', 'ecuación', 'معادلة', 'equation'),
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown')
        ],
        explanation: say(
            'Objektu baten oinera iritsi ezin bada, bi puntutatik neurtzen da: zuhaitz baten tontorra 50 graduko angeluarekin ikusten da, eta 10 m urrunduta, 25 graduko angeluarekin. Ezezagunak $y$ altuera eta lehen puntutik dagoen $x$ distantzia dira, eta triangelu bakoitzak ekuazio bat ematen du: $y=x\\cdot\\tan 50°$ eta $y=(x+10)\\cdot\\tan 25°$. Berdinduz, $x$ ateratzen da, eta gero $y$.',
            'Si no se puede llegar al pie de un objeto, se mide desde dos puntos: la copa de un árbol se ve con 50° y, alejándose 10 m, con 25°. Las incógnitas son la altura $y$ y la distancia $x$ desde el primer punto, y cada triángulo da una ecuación: $y=x\\cdot\\tan 50°$ e $y=(x+10)\\cdot\\tan 25°$. Igualando, sale $x$, y después $y$.',
            'إذا لم يمكن الوصول إلى أسفل الجسم نقيس من نقطتين: تُرى قمة شجرة بزاوية 50°، وبعد الابتعاد 10 م بزاوية 25°. والمجهولان هما الارتفاع $y$ والمسافة $x$ من النقطة الأولى، وكل مثلث يعطي معادلة: $y=x\\cdot\\tan 50°$ و$y=(x+10)\\cdot\\tan 25°$. وبالمساواة نجد $x$ ثم $y$.',
            'If you cannot reach the foot of an object, you measure from two points: the top of a tree is seen at 50° and, 10 m further away, at 25°. The unknowns are the height $y$ and the distance $x$ from the first point, and each triangle gives an equation: $y=x\\cdot\\tan 50°$ and $y=(x+10)\\cdot\\tan 25°$. Setting them equal gives $x$, and then $y$.'
        ),
        examplePrompt: say('Mendi bat 30 graduko angeluarekin ikusten da, eta 200 m hurbildu ondoren, 45 graduko angeluarekin. Zer altuera du?', 'Un monte se ve con 30° y, tras acercarse 200 m, con 45°. ¿Qué altura tiene?', 'يُرى جبل بزاوية 30°، وبعد الاقتراب 200 م بزاوية 45°. ما ارتفاعه؟', 'A hill is seen at 30° and, after moving 200 m closer, at 45°. How high is it?'),
        example: same('$\\begin{gathered}y=x\\qquad y=(x+200)\\cdot\\tan 30°\\\\ x=\\frac{200\\cdot\\tan 30°}{1-\\tan 30°}\\approx 273{,}2\\end{gathered}$'),
        exampleAnswer: say('273 m inguru: 45 graduko angeluarekin altuera eta distantzia berdinak dira.', 'Unos 273 m: con 45°, la altura es igual a la distancia.', 'نحو 273 م: مع الزاوية 45° يتساوى الارتفاع والمسافة.', 'About 273 m: with 45°, the height equals the distance.')
    },
    oblique: {
        vocabulary: [
            say('altuera', 'altura', 'الارتفاع', 'height'),
            say('ez-angeluzuzena', 'oblicuángulo', 'غير القائم', 'oblique')
        ],
        explanation: say(
            'Triangelu batek angelu zuzenik ez badu, marraztu altuera bat: bi triangelu angeluzuzen agertzen dira, eta bakoitzean arrazoiak erabil daitezke. Ondo aukeratu: altuerak ez du angelu ezagun bat zatitu behar, eta komeni da alde ezaguna bi triangeluetako baten hipotenusa izatea. Gero, Pitagorasek edo arrazoi batek falta dena ematen dute.',
            'Si un triángulo no tiene ángulo recto, traza una altura: aparecen dos triángulos rectángulos, y en cada uno valen las razones. Elige bien: la altura no debe partir un ángulo conocido, y conviene que el lado conocido sea la hipotenusa de uno de los dos triángulos. Después, Pitágoras o una razón dan lo que falta.',
            'إذا لم يكن في المثلث زاوية قائمة فارسم ارتفاعًا: يظهر مثلثان قائمان تصلح النسب في كل منهما. أحسن الاختيار: يجب ألا يقسم الارتفاع زاوية معلومة، ويُستحسن أن يكون الضلع المعلوم وترًا لأحد المثلثين. ثم يعطي فيثاغورس أو نسبةٌ ما ينقص.',
            'If a triangle has no right angle, draw a height: two right-angled triangles appear, and the ratios work in each. Choose well: the height should not split a known angle, and it helps if the known side is the hypotenuse of one of the two triangles. Then Pythagoras or a ratio gives what is missing.'
        ),
        examplePrompt: say('Triangelu batean, $B=60°$, $C=45°$, eta $A$ erpinetik doan altuerak 6 cm neurtzen ditu. Kalkulatu $BC$.', 'En un triángulo, $B=60°$, $C=45°$ y la altura desde $A$ mide 6 cm. Calcula $BC$.', 'في مثلث $B=60°$ و$C=45°$، والارتفاع من $A$ طوله 6 سم. احسب $BC$.', 'In a triangle, $B=60°$, $C=45°$ and the height from $A$ is 6 cm. Work out $BC$.'),
        example: same('$\\begin{gathered}BH=\\frac{6}{\\tan 60°}\\approx 3{,}46\\qquad HC=\\frac{6}{\\tan 45°}=6\\\\ BC\\approx 9{,}46\\end{gathered}$'),
        exampleAnswer: say('Altuerak $BC$ bi zatitan banatzen du: 9,46 cm inguru.', 'La altura parte $BC$ en dos trozos: unos 9,46 cm.', 'يقسم الارتفاع $BC$ إلى قطعتين: نحو 9.46 سم.', 'The height splits $BC$ into two pieces: about 9.46 cm.')
    },
    'trig-area': {
        vocabulary: [
            say('azalera', 'área', 'المساحة', 'area'),
            say('paralelogramoa', 'paralelogramo', 'متوازي الأضلاع', 'parallelogram')
        ],
        explanation: say(
            'Triangelu baten bi alde, $b$ eta $c$, eta haien arteko $A$ angelua ezagutzen badira, $b$ aldearen gaineko altuera $h=c\\cdot\\sin A$ da. Beraz, azalera $\\dfrac{b\\cdot h}{2}=\\dfrac{1}{2}\\,b\\,c\\,\\sin A$ da. Paralelogramo bat bi triangelu berdin dira: haren azalera $a\\cdot b\\cdot\\sin\\alpha$ da.',
            'Si se conocen dos lados $b$ y $c$ de un triángulo y el ángulo $A$ que forman, la altura sobre $b$ es $h=c\\cdot\\sin A$. Por tanto, el área es $\\dfrac{b\\cdot h}{2}=\\dfrac{1}{2}\\,b\\,c\\,\\sin A$. Un paralelogramo son dos triángulos iguales: su área es $a\\cdot b\\cdot\\sin\\alpha$.',
            'إذا عُلم ضلعان $b$ و$c$ في مثلث والزاوية $A$ بينهما، فالارتفاع على $b$ هو $h=c\\cdot\\sin A$. إذن المساحة $\\dfrac{b\\cdot h}{2}=\\dfrac{1}{2}\\,b\\,c\\,\\sin A$. ومتوازي الأضلاع مثلثان متطابقان: مساحته $a\\cdot b\\cdot\\sin\\alpha$.',
            'If you know two sides $b$ and $c$ of a triangle and the angle $A$ between them, the height on $b$ is $h=c\\cdot\\sin A$. So the area is $\\dfrac{b\\cdot h}{2}=\\dfrac{1}{2}\\,b\\,c\\,\\sin A$. A parallelogram is two equal triangles: its area is $a\\cdot b\\cdot\\sin\\alpha$.'
        ),
        examplePrompt: say('Paralelogramo baten aldeek 8 cm eta 5 cm neurtzen dituzte, eta 70 graduko angelua osatzen dute. Kalkulatu haren azalera.', 'Un paralelogramo tiene lados de 8 cm y 5 cm que forman 70°. Calcula su área.', 'متوازي أضلاع ضلعاه 8 سم و5 سم يصنعان زاوية 70°. احسب مساحته.', 'A parallelogram has sides of 8 cm and 5 cm that form 70°. Work out its area.'),
        example: same('$8\\cdot 5\\cdot\\sin 70°\\approx 37{,}59$'),
        exampleAnswer: say('37,59 cm² inguru: 18,79 cm² inguruko bi triangelu.', 'Unos 37,59 cm²: dos triángulos de unos 18,79 cm².', 'نحو 37.59 سم²: مثلثان مساحة كل منهما نحو 18.79 سم².', 'About 37.59 cm²: two triangles of about 18.79 cm².')
    },

    /* ---------- 5. The unit circle ---------- */
    'unit-circle': {
        definitions: [
            {
                term: say('Zirkunferentzia goniometrikoa', 'Circunferencia goniométrica', 'الدائرة المثلثية', 'Unit circle'),
                meaning: say('1 erradioko zirkunferentzia, zentroa jatorrian duena; angeluak abzisen ardatzerdi positibotik neurtzen dira, erlojuaren kontrako noranzkoan.', 'La de radio 1 y centro en el origen; los ángulos se miden desde el semieje positivo de abscisas, en sentido contrario a las agujas del reloj.', 'دائرة نصف قطرها 1 ومركزها الأصل؛ وتُقاس الزوايا من نصف محور الفواصل الموجب عكس اتجاه عقارب الساعة.', 'The circle of radius 1 centred at the origin; angles are measured from the positive x-axis, anticlockwise.')
            }
        ],
        vocabulary: [
            say('koadrantea', 'cuadrante', 'الربع', 'quadrant'),
            say('abzisa', 'abscisa', 'الفاصلة', 'x-coordinate'),
            say('ordenatua', 'ordenada', 'الترتيب', 'y-coordinate')
        ],
        explanation: say(
            '$\\alpha$ angeluaren aldeak zirkunferentzia $P(x,y)$ puntu batean mozten du: $\\cos\\alpha=x$, abzisa; $\\sin\\alpha=y$, ordenatua; eta $\\tan\\alpha=\\dfrac{y}{x}$, angelu zorrotzetan bezala, baina orain zeinuarekin. Zeinua koadrantearen araberakoa da.',
            'El lado de un ángulo $\\alpha$ corta la circunferencia en un punto $P(x,y)$: $\\cos\\alpha=x$, la abscisa; $\\sin\\alpha=y$, la ordenada; y $\\tan\\alpha=\\dfrac{y}{x}$, como en los ángulos agudos, pero ahora con signo. El signo depende del cuadrante.',
            'يقطع ضلع الزاوية $\\alpha$ الدائرة في نقطة $P(x,y)$: $\\cos\\alpha=x$ هو الفاصلة، و$\\sin\\alpha=y$ هو الترتيب، و$\\tan\\alpha=\\dfrac{y}{x}$، كما في الزوايا الحادة لكن مع الإشارة الآن. والإشارة تتعلق بالربع.',
            'The side of an angle $\\alpha$ meets the circle at a point $P(x,y)$: $\\cos\\alpha=x$, the x-coordinate; $\\sin\\alpha=y$, the y-coordinate; and $\\tan\\alpha=\\dfrac{y}{x}$, as with acute angles, but now with a sign. The sign depends on the quadrant.'
        ),
        cases: [
            { title: say('I. koadrantea', 'Cuadrante I', 'الربع الأول', 'Quadrant I'), text: say('Hirurak positiboak.', 'Las tres, positivas.', 'الثلاث موجبة.', 'All three positive.') },
            { title: say('II. koadrantea', 'Cuadrante II', 'الربع الثاني', 'Quadrant II'), text: say('Sinua bakarrik positiboa.', 'Solo el seno, positivo.', 'الجيب وحده موجب.', 'Only the sine positive.') },
            { title: say('III. koadrantea', 'Cuadrante III', 'الربع الثالث', 'Quadrant III'), text: say('Tangentea bakarrik positiboa.', 'Solo la tangente, positiva.', 'الظل وحده موجب.', 'Only the tangent positive.') },
            { title: say('IV. koadrantea', 'Cuadrante IV', 'الربع الرابع', 'Quadrant IV'), text: say('Kosinua bakarrik positiboa.', 'Solo el coseno, positivo.', 'جيب التمام وحده موجب.', 'Only the cosine positive.') }
        ],
        examplePrompt: say('$\\cos\\alpha=-\\frac{5}{13}$ eta $\\alpha$ III. koadrantean badago, kalkulatu $\\sin\\alpha$ eta $\\tan\\alpha$.', 'Si $\\cos\\alpha=-\\frac{5}{13}$ y $\\alpha$ está en el III cuadrante, calcula $\\sin\\alpha$ y $\\tan\\alpha$.', 'إذا كان $\\cos\\alpha=-\\frac{5}{13}$ و$\\alpha$ في الربع الثالث فاحسب $\\sin\\alpha$ و$\\tan\\alpha$.', 'If $\\cos\\alpha=-\\frac{5}{13}$ and $\\alpha$ is in quadrant III, work out $\\sin\\alpha$ and $\\tan\\alpha$.'),
        example: same('$\\begin{gathered}\\sin^{2}\\alpha=1-\\frac{25}{169}=\\frac{144}{169}\\\\ \\sin\\alpha=-\\frac{12}{13}\\qquad\\tan\\alpha=\\frac{12}{5}\\end{gathered}$'),
        exampleAnswer: say('III. koadrantean sinua negatiboa da, eta tangentea, positiboa.', 'En el III cuadrante el seno es negativo y la tangente, positiva.', 'في الربع الثالث الجيب سالب والظل موجب.', 'In quadrant III the sine is negative and the tangent positive.'),
        why: {
            text: say(
                'Angelu zorrotzetan, 1 hipotenusako triangeluaren katetoak $\\cos\\alpha$ eta $\\sin\\alpha$ dira: $P$ puntuaren koordenatuak, hain zuzen. Puntuaren bidezko definizioak ideia bera edozein angelutara zabaltzen du, eta orduan koordenatuak negatiboak izan daitezke.',
                'En los ángulos agudos, los catetos del triángulo de hipotenusa 1 son $\\cos\\alpha$ y $\\sin\\alpha$: justo las coordenadas de $P$. La definición con el punto lleva esa misma idea a cualquier ángulo, y entonces las coordenadas pueden ser negativas.',
                'في الزوايا الحادة يكون الضلعان القائمان في المثلث الذي وتره 1 هما $\\cos\\alpha$ و$\\sin\\alpha$: أي إحداثيا $P$ بالضبط. والتعريف بالنقطة يمدّ الفكرة نفسها إلى أي زاوية، وعندئذ قد تكون الإحداثيات سالبة.',
                'For acute angles, the legs of the triangle with hypotenuse 1 are $\\cos\\alpha$ and $\\sin\\alpha$: exactly the coordinates of $P$. The definition with the point carries that same idea to any angle, and then the coordinates can be negative.'
            )
        }
    },
    reduction: {
        vocabulary: [
            say('simetrikoak', 'simétricos', 'متناظرة', 'symmetric'),
            say('koadrantea', 'cuadrante', 'الربع', 'quadrant')
        ],
        explanation: say(
            'Zirkunferentzia goniometrikoan, $\\alpha$, $180°-\\alpha$, $180°+\\alpha$ eta $360°-\\alpha$ angeluen puntuak simetrikoak dira: haien arrazoiek balio absolutu bera dute, eta zeinua koadranteak ematen du. 30 graduko angeluarekin: $\\sin 150°=\\frac{1}{2}$, $\\sin 210°=-\\frac{1}{2}$ eta $\\sin 330°=-\\frac{1}{2}$. 360° baino handiagoko angelu bati, kendu buelta osoak.',
            'En la circunferencia goniométrica, los puntos de $\\alpha$, $180°-\\alpha$, $180°+\\alpha$ y $360°-\\alpha$ son simétricos: sus razones tienen el mismo valor absoluto y el signo lo da el cuadrante. Con 30°: $\\sin 150°=\\frac{1}{2}$, $\\sin 210°=-\\frac{1}{2}$ y $\\sin 330°=-\\frac{1}{2}$. A un ángulo mayor que 360°, quítale las vueltas completas.',
            'في الدائرة المثلثية نقاط الزوايا $\\alpha$ و$180°-\\alpha$ و$180°+\\alpha$ و$360°-\\alpha$ متناظرة: لنسبها القيمة المطلقة نفسها والإشارة يحددها الربع. مع 30°: $\\sin 150°=\\frac{1}{2}$ و$\\sin 210°=-\\frac{1}{2}$ و$\\sin 330°=-\\frac{1}{2}$. وللزاوية الأكبر من 360° احذف الدورات الكاملة.',
            'On the unit circle, the points of $\\alpha$, $180°-\\alpha$, $180°+\\alpha$ and $360°-\\alpha$ are symmetric: their ratios have the same absolute value and the quadrant gives the sign. With 30°: $\\sin 150°=\\frac{1}{2}$, $\\sin 210°=-\\frac{1}{2}$ and $\\sin 330°=-\\frac{1}{2}$. For an angle over 360°, take away the full turns.'
        ),
        examplePrompt: say('Kalkulatu $\\cos 240°$ eta $\\sin 495°$, kalkulagailurik gabe.', 'Calcula $\\cos 240°$ y $\\sin 495°$ sin calculadora.', 'احسب $\\cos 240°$ و$\\sin 495°$ دون آلة حاسبة.', 'Work out $\\cos 240°$ and $\\sin 495°$ without a calculator.'),
        example: same('$\\begin{gathered}\\cos 240°=-\\cos 60°=-\\frac{1}{2}\\\\ \\sin 495°=\\sin 135°=\\sin 45°=\\frac{\\sqrt{2}}{2}\\end{gathered}$'),
        exampleAnswer: say('240° III. koadrantean dago (kosinua negatiboa); 495° buelta bat gehi 135° da.', '240° está en el III cuadrante (coseno negativo); 495° es una vuelta más 135°.', '240° في الربع الثالث (جيب التمام سالب)؛ و495° دورة زائد 135°.', '240° is in quadrant III (negative cosine); 495° is one turn plus 135°.')
    },
    radians: {
        definitions: [
            {
                term: say('Radiana', 'Radián', 'الراديان', 'Radian'),
                meaning: say('Arkuak erradioaren luzera bera duen erdiko angelua.', 'El ángulo central cuyo arco mide lo mismo que el radio.', 'الزاوية المركزية التي يساوي قوسها نصف القطر.', 'The central angle whose arc is as long as the radius.')
            }
        ],
        vocabulary: [
            say('arkua', 'arco', 'القوس', 'arc'),
            say('erradioa', 'radio', 'نصف القطر', 'radius')
        ],
        explanation: say(
            'Zirkunferentziak $2\\pi r$ neurtzen duenez, buelta oso bat $2\\pi$ radian da: $360°=2\\pi$ rad, hau da, $180°=\\pi$ rad. Horregatik, radian bat 57,3° ingurukoa da, 60° baino zertxobait gutxiago. Graduetatik radianetara, biderkatu $\\frac{\\pi}{180}$ zatikiaz; radianetatik graduetara, $\\frac{180}{\\pi}$ zatikiaz.',
            'Como la circunferencia mide $2\\pi r$, una vuelta entera son $2\\pi$ radianes: $360°=2\\pi$ rad, es decir, $180°=\\pi$ rad. Por eso un radián son unos 57,3°, algo menos de 60°. De grados a radianes, multiplica por $\\frac{\\pi}{180}$; de radianes a grados, por $\\frac{180}{\\pi}$.',
            'لأن محيط الدائرة $2\\pi r$ فالدورة الكاملة $2\\pi$ راديان: $360°=2\\pi$ rad، أي $180°=\\pi$ rad. لذلك الراديان نحو 57.3°، أقل قليلًا من 60°. من الدرجات إلى الراديان اضرب في $\\frac{\\pi}{180}$، ومن الراديان إلى الدرجات في $\\frac{180}{\\pi}$.',
            'Since the circle measures $2\\pi r$, a full turn is $2\\pi$ radians: $360°=2\\pi$ rad, that is, $180°=\\pi$ rad. So a radian is about 57.3°, a little less than 60°. From degrees to radians, multiply by $\\frac{\\pi}{180}$; from radians to degrees, by $\\frac{180}{\\pi}$.'
        ),
        examplePrompt: say('Pasatu $\\frac{3\\pi}{4}$ rad gradutara, eta 210° radianetara.', 'Pasa $\\frac{3\\pi}{4}$ rad a grados y 210° a radianes.', 'حوّل $\\frac{3\\pi}{4}$ rad إلى درجات و210° إلى راديان.', 'Convert $\\frac{3\\pi}{4}$ rad to degrees and 210° to radians.'),
        example: same('$\\begin{gathered}\\frac{3\\pi}{4}\\cdot\\frac{180}{\\pi}=135°\\\\ 210\\cdot\\frac{\\pi}{180}=\\frac{7\\pi}{6}\\end{gathered}$'),
        exampleAnswer: say('135° eta $\\frac{7\\pi}{6}$ rad, 3,67 rad inguru.', '135° y $\\frac{7\\pi}{6}$ rad, unos 3,67 rad.', '135° و$\\frac{7\\pi}{6}$ rad، أي نحو 3.67 rad.', '135° and $\\frac{7\\pi}{6}$ rad, about 3.67 rad.'),
        why: {
            text: say(
                'Erdiko angelu bat eta haren arkua proportzionalak dira. Radian bateko arkuak $r$ neurtzen badu, buelta osoak, $2\\pi r$ luzerakoak, $\\frac{2\\pi r}{r}=2\\pi$ radian ditu. Horregatik ez dago erradioaren mende.',
                'Un ángulo central y su arco son proporcionales. Si el arco de un radián mide $r$, la vuelta entera, que mide $2\\pi r$, tiene $\\frac{2\\pi r}{r}=2\\pi$ radianes. Por eso no depende del radio.',
                'الزاوية المركزية وقوسها متناسبان. إذا كان قوس الراديان الواحد $r$ فالدورة الكاملة التي طولها $2\\pi r$ فيها $\\frac{2\\pi r}{r}=2\\pi$ راديان. لذلك لا يتعلق الأمر بنصف القطر.',
                'A central angle and its arc are proportional. If the arc of one radian is $r$, the full turn, which is $2\\pi r$ long, has $\\frac{2\\pi r}{r}=2\\pi$ radians. That is why it does not depend on the radius.'
            )
        }
    }
}

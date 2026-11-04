import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { SimilarityTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Antzekotasuna · 4. DBH aplikatuak — what each lesson tells: the new words
   (definitions), a short explanation, its cases and the example as an
   exercise («Another example»), with the key words in four languages and,
   in three lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics. The cases keep what the
   drawings show (3, 4, 4,5 and x = 6; 10 cm in 5 parts; 12 : 6 = x : 5; the
   quadrilaterals of r = 1,5; the squares 1, 2, 3 and the cubes 1, 8, 27;
   1:50 000; the plan at 1:100). Primes are written ^{\prime}; scales such
   as 1:50 000 go in the words, where «:» is not drawn as ÷; the proportions
   of shadows and mirrors are told in words, not with \text{} (no Arabic
   there).
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const similarityLessonTexts: Record<SimilarityTopicId, LessonTexts> = {
    /* ---------- 1. Thales ---------- */
    thales: {
        vocabulary: [
            say('paraleloak', 'paralelas', 'متوازية', 'parallel'),
            say('zuzenkia', 'segmento', 'قطعة', 'segment'),
            say('biderketa gurutzatua', 'producto en cruz', 'الضرب التبادلي', 'cross-multiplying')
        ],
        explanation: say(
            'Bi zuzen paralelo batzuek mozten badituzte, zuzen batean eta bestean sortzen diren zuzenkiak proportzionalak dira: hori da Talesen teorema. Zuzenki ezezagun bat biderketa gurutzatuarekin aurkitzen da. Parekatu ondo: zuzen batekoak goian eta bestekoak behean, beti ordena berean.',
            'Si dos rectas son cortadas por varias paralelas, los segmentos que se forman en una y en otra son proporcionales: es el teorema de Tales. Un segmento desconocido se halla con el producto en cruz. Empareja bien: los de una recta arriba y los de la otra abajo, siempre en el mismo orden.',
            'إذا قطعت مستقيمات متوازية مستقيمين فإن القطع المتكوّنة على أحدهما وعلى الآخر متناسبة: هذه مبرهنة طاليس. ونجد القطعة المجهولة بالضرب التبادلي. أحسن المطابقة: قطع مستقيم في الأعلى وقطع الآخر في الأسفل، وبالترتيب نفسه دائمًا.',
            'If two lines are cut by several parallel lines, the segments formed on one and on the other are proportional: that is Thales’ theorem. An unknown segment is found by cross-multiplying. Match them carefully: those of one line on top and those of the other below, always in the same order.'
        ),
        cases: [
            { title: say('Proportzioa', 'La proporción', 'التناسب', 'The proportion'), text: say('Zuzen batekoak goian, bestekoak behean.', 'Los de una recta arriba, los de la otra abajo.', 'قطع مستقيم في الأعلى وقطع الآخر في الأسفل.', 'One line’s on top, the other’s below.'), math: same('$\\frac{a}{a^{\\prime}}=\\frac{b}{b^{\\prime}}$') },
            { title: say('Marrazkikoa', 'La del dibujo', 'حالة الرسم', 'The one in the drawing'), text: say('$3$ eta $4$; $4{,}5$ eta $x$.', '$3$ y $4$; $4{,}5$ y $x$.', '$3$ و$4$؛ $4{,}5$ و$x$.', '$3$ and $4$; $4{,}5$ and $x$.'), math: same('$\\frac{3}{4{,}5}=\\frac{4}{x}\\ \\to\\ x=\\frac{4\\cdot 4{,}5}{3}=6$') }
        ],
        examplePrompt: say('Paralelo batzuek zuzen batean 2 cm eta 5 cm-ko zuzenkiak mozten dituzte, eta bestean 3 cm eta $x$. Kalkulatu $x$.', 'Unas paralelas cortan en una recta segmentos de 2 cm y 5 cm, y en otra, de 3 cm y $x$. Calcula $x$.', 'مستقيمات متوازية تقطع على مستقيم قطعتين 2 سم و5 سم، وعلى آخر 3 سم و$x$. احسب $x$.', 'Some parallel lines cut segments of 2 cm and 5 cm on one line, and 3 cm and $x$ on another. Calculate $x$.'),
        example: same('$\\frac{2}{3}=\\frac{5}{x}\\ \\to\\ x=\\frac{3\\cdot 5}{2}=7{,}5$'),
        exampleAnswer: say('$x=7{,}5$ cm.', '$x=7{,}5$ cm.', '$x=7{,}5$ سم.', '$x=7{,}5$ cm.')
    },
    divide: {
        vocabulary: [
            say('zuzenerdia', 'semirrecta', 'نصف مستقيم', 'ray'),
            say('konpasa', 'compás', 'الفرجار', 'compass'),
            say('zati berdinak', 'partes iguales', 'أجزاء متساوية', 'equal parts')
        ],
        explanation: say(
            '$AB$ zuzenki bat zati berdinetan banatzeko ez da neurtu behar: $A$ puntutik marraztu beste zuzenerdi bat, markatu haren gainean konpasarekin zati berdinak, lotu azken marka $B$ puntuarekin eta marraztu paraleloak beste marketatik.',
            'Para dividir un segmento $AB$ en partes iguales no hace falta medir: desde $A$ traza otra semirrecta, marca en ella con el compás trozos iguales, une la última marca con $B$ y traza paralelas desde las otras marcas.',
            'لتقسيم قطعة $AB$ إلى أجزاء متساوية لا داعي للقياس: ارسم من $A$ نصف مستقيم آخر، وعلّم عليه بالفرجار أجزاء متساوية، وصِل العلامة الأخيرة بـ$B$، وارسم من العلامات الأخرى مستقيمات موازية.',
            'To divide a segment $AB$ into equal parts you do not need to measure: from $A$ draw another ray, mark equal pieces on it with the compass, join the last mark to $B$ and draw parallel lines from the other marks.'
        ),
        cases: [
            { title: say('Zati berdinak', 'Partes iguales', 'أجزاء متساوية', 'Equal parts'), text: say('Marrazkian, 10 cm 5 zatitan.', 'En el dibujo, 10 cm en 5 partes.', 'في الرسم 10 سم إلى 5 أجزاء.', 'In the drawing, 10 cm in 5 parts.'), math: same('$10\\div 5=2$') },
            { title: say('Zati proportzionalak', 'Partes proporcionales', 'أجزاء متناسبة', 'Proportional parts'), text: say('2, 3 eta 5 zenbakiekiko: markatu luzera horiek jarraian; kontuekin, zati bakoitza bere zatikia da.', 'A 2, 3 y 5: marca esas longitudes seguidas; con cuentas, cada parte es su fracción.', 'بالتناسب مع 2 و3 و5: علّم هذه الأطوال متتالية؛ وبالحساب كل جزء هو كسره.', 'In proportion to 2, 3 and 5: mark those lengths one after another; by calculation, each part is its fraction.'), math: same('$\\frac{2}{10},\\ \\frac{3}{10},\\ \\frac{5}{10}$') }
        ],
        examplePrompt: say('Banatu 12 cm-ko zuzenki bat 1, 2 eta 3 zenbakiekiko proportzionalak diren zatitan.', 'Divide un segmento de 12 cm en partes proporcionales a 1, 2 y 3.', 'قسّم قطعة طولها 12 سم بالتناسب مع 1 و2 و3.', 'Divide a 12 cm segment in proportion to 1, 2 and 3.'),
        example: same('$\\begin{gathered}12\\div(1+2+3)=2\\\\ 2,\\ 4,\\ 6\\end{gathered}$'),
        exampleAnswer: say('2 cm, 4 cm eta 6 cm.', '2 cm, 4 cm y 6 cm.', '2 سم و4 سم و6 سم.', '2 cm, 4 cm and 6 cm.')
    },
    'thales-position': {
        definitions: [
            {
                term: say('Tales posizioa', 'Posición de Tales', 'وضع طاليس', 'Thales’ position'),
                meaning: say('Angelu bat partekatzen duten eta angelu horren aurkako aldeak paraleloak dituzten bi triangelu: bata bestearen barruan dago.', 'Dos triángulos que comparten un ángulo y tienen paralelos los lados opuestos a ese ángulo: uno está dentro del otro.', 'مثلثان يشتركان في زاوية والضلعان المقابلان لها متوازيان: أحدهما داخل الآخر.', 'Two triangles that share an angle and have parallel sides opposite that angle: one is inside the other.')
            }
        ],
        vocabulary: [
            say('aldea', 'lado', 'الضلع', 'side'),
            say('angelu komuna', 'ángulo común', 'زاوية مشتركة', 'shared angle'),
            say('erpina', 'vértice', 'الرأس', 'vertex')
        ],
        explanation: say(
            'Orduan haien aldeak proportzionalak dira. Kontuz: proportzioan alde osoak doaz, ez bi triangeluen arteko zatia bakarrik: $AB^{\\prime}=6$ eta $B^{\\prime}B=6$ badira, alde handia $AB=12$ da. Bi triangeluek erpin bera dute.',
            'Entonces sus lados son proporcionales. Cuidado: en la proporción van los lados enteros, no solo el trozo que hay entre los dos triángulos: si $AB^{\\prime}=6$ y $B^{\\prime}B=6$, el lado grande es $AB=12$. Los dos triángulos comparten el vértice.',
            'عندئذ تكون أضلاعهما متناسبة. انتبه: في التناسب توضع الأضلاع كاملة، لا الجزء الذي بين المثلثين فقط: إذا كان $AB^{\\prime}=6$ و$B^{\\prime}B=6$ فالضلع الكبير $AB=12$. والمثلثان يشتركان في الرأس.',
            'Then their sides are proportional. Careful: the whole sides go into the proportion, not just the piece between the two triangles: if $AB^{\\prime}=6$ and $B^{\\prime}B=6$, the big side is $AB=12$. The two triangles share the vertex.'
        ),
        cases: [
            { title: say('Proportzioa', 'La proporción', 'التناسب', 'The proportion'), text: say('Hiru aldeak.', 'Los tres lados.', 'الأضلاع الثلاثة.', 'All three sides.'), math: same('$\\frac{AB}{AB^{\\prime}}=\\frac{AC}{AC^{\\prime}}=\\frac{BC}{B^{\\prime}C^{\\prime}}$') },
            { title: say('Marrazkikoa', 'La del dibujo', 'حالة الرسم', 'The one in the drawing'), text: say('$B^{\\prime}C^{\\prime}=5$ denean:', 'Con $B^{\\prime}C^{\\prime}=5$:', 'مع $B^{\\prime}C^{\\prime}=5$:', 'With $B^{\\prime}C^{\\prime}=5$:'), math: same('$\\frac{12}{6}=\\frac{x}{5}\\ \\to\\ x=10$') }
        ],
        examplePrompt: say('Tales posizioan dauden bi triangelutan, $AB^{\\prime}=5$, $B^{\\prime}B=10$ eta $B^{\\prime}C^{\\prime}=4$. Kalkulatu $BC$.', 'En dos triángulos en posición de Tales, $AB^{\\prime}=5$, $B^{\\prime}B=10$ y $B^{\\prime}C^{\\prime}=4$. Calcula $BC$.', 'في مثلثين في وضع طاليس $AB^{\\prime}=5$ و$B^{\\prime}B=10$ و$B^{\\prime}C^{\\prime}=4$. احسب $BC$.', 'In two triangles in Thales’ position, $AB^{\\prime}=5$, $B^{\\prime}B=10$ and $B^{\\prime}C^{\\prime}=4$. Calculate $BC$.'),
        example: same('$\\begin{gathered}AB=5+10=15\\\\ \\frac{15}{5}=\\frac{BC}{4}\\ \\to\\ BC=12\\end{gathered}$'),
        exampleAnswer: say('$BC=12$: lehenik alde osoa, $AB=15$.', '$BC=12$: primero el lado entero, $AB=15$.', '$BC=12$: أولًا الضلع الكامل $AB=15$.', '$BC=12$: first the whole side, $AB=15$.')
    },
    /* ---------- 2. Similarity ---------- */
    'similar-figures': {
        definitions: [
            {
                term: say('Irudi antzekoak', 'Figuras semejantes', 'الأشكال المتشابهة', 'Similar shapes'),
                meaning: say('Forma bera dutenak eta tamainaz bakarrik desberdinak: alde homologoak proportzionalak eta angelu homologoak berdinak.', 'Las que tienen la misma forma y solo se diferencian en el tamaño: lados homólogos proporcionales y ángulos homólogos iguales.', 'أشكال لها الهيئة نفسها وتختلف في الحجم فقط: أضلاعها المتناظرة متناسبة وزواياها المتناظرة متساوية.', 'Shapes with the same form that differ only in size: corresponding sides proportional and corresponding angles equal.')
            },
            {
                term: say('Antzekotasun-arrazoia', 'Razón de semejanza', 'نسبة التشابه', 'Scale factor'),
                meaning: say('Alde homologoen arteko zatidura, $r$.', 'El cociente entre lados homólogos, $r$.', 'خارج قسمة ضلعين متناظرين، $r$.', 'The quotient of corresponding sides, $r$.')
            }
        ],
        vocabulary: [
            say('homologoak', 'homólogos', 'المتناظرة', 'corresponding'),
            say('handitu', 'ampliar', 'كُبّر', 'enlarge'),
            say('txikitu', 'reducir', 'صُغّر', 'reduce')
        ],
        explanation: say(
            '$r>1$ bada, irudia handitu egin da; $r<1$ bada, txikitu. Poligonoetan aldeak eta angeluak egiaztatu behar dira: laukizuzen guztiek angelu berdinak dituzte, baina ez dira denak antzekoak.',
            'Si $r>1$, la figura se ha ampliado; si $r<1$, se ha reducido. En los polígonos hay que comprobar los lados y los ángulos: todos los rectángulos tienen los ángulos iguales, pero no todos son semejantes.',
            'إذا كان $r>1$ فقد كُبّر الشكل؛ وإذا كان $r<1$ فقد صُغّر. وفي المضلعات يجب التحقق من الأضلاع والزوايا: كل المستطيلات زواياها متساوية لكنها ليست كلها متشابهة.',
            'If $r>1$, the shape has been enlarged; if $r<1$, it has been reduced. In polygons you have to check the sides and the angles: all rectangles have equal angles, but they are not all similar.'
        ),
        cases: [
            { title: say('Marrazkikoak', 'Las del dibujo', 'شكلا الرسم', 'The ones in the drawing'), text: say('Bi lauki antzeko: aldeak bider $1{,}5$.', 'Dos cuadriláteros semejantes: los lados, por $1{,}5$.', 'رباعيان متشابهان: الأضلاع في $1{,}5$.', 'Two similar quadrilaterals: the sides times $1{,}5$.'), math: same('$\\frac{6}{4}=\\frac{3}{2}=1{,}5$') },
            { title: say('Beti antzekoak', 'Siempre semejantes', 'متشابهة دائمًا', 'Always similar'), text: say('Karratu guztiak, zirkulu guztiak eta alde kopuru bera duten poligono erregularrak.', 'Todos los cuadrados, todos los círculos y los polígonos regulares con el mismo número de lados.', 'كل المربعات وكل الدوائر والمضلعات المنتظمة التي لها عدد الأضلاع نفسه.', 'All squares, all circles and regular polygons with the same number of sides.') }
        ],
        examplePrompt: say('Triangelu batek 3, 4 eta 5 cm-ko aldeak ditu. Antzeko baten alde txikiena $7{,}5$ cm da. Zein da arrazoia, eta zenbat neurtzen dute beste aldeek?', 'Un triángulo tiene lados de 3, 4 y 5 cm. Uno semejante tiene el lado menor de $7{,}5$ cm. ¿Cuál es la razón y cuánto miden los otros lados?', 'مثلث أضلاعه 3 و4 و5 سم. وأصغر أضلاع مثلث مشابه له $7{,}5$ سم. ما النسبة، وكم طول الضلعين الآخرين؟', 'A triangle has sides of 3, 4 and 5 cm. A similar one has its shortest side $7{,}5$ cm. What is the scale factor and how long are the other sides?'),
        example: same('$\\begin{gathered}r=\\frac{7{,}5}{3}=2{,}5\\\\ 4\\cdot 2{,}5=10\\qquad 5\\cdot 2{,}5=12{,}5\\end{gathered}$'),
        exampleAnswer: say('$r=2{,}5$ (handitu da): 10 cm eta $12{,}5$ cm.', '$r=2{,}5$ (se ha ampliado): 10 cm y $12{,}5$ cm.', '$r=2{,}5$ (كُبّر): 10 سم و$12{,}5$ سم.', '$r=2{,}5$ (it is enlarged): 10 cm and $12{,}5$ cm.')
    },
    criteria: {
        vocabulary: [
            say('irizpideak', 'criterios', 'معايير', 'tests'),
            say('proportzionalak', 'proporcionales', 'متناسبة', 'proportional'),
            say('zatidura', 'cociente', 'خارج القسمة', 'quotient')
        ],
        explanation: say(
            'Triangeluetan irizpide hauetako bat nahikoa da. Aldeak konparatzeko, ordenatu txikienetik handienera bi triangeluetan eta zatitu binaka: zatidura guztiak berdinak badira, antzekoak dira.',
            'En los triángulos basta con uno de estos criterios. Para comparar los lados, ordénalos de menor a mayor en los dos triángulos y divide dos a dos: si todos los cocientes son iguales, son semejantes.',
            'في المثلثات يكفي أحد هذه المعايير. ولمقارنة الأضلاع رتّبها من الأصغر إلى الأكبر في المثلثين واقسم كل ضلعين متقابلين: إذا تساوت كل خوارج القسمة فهما متشابهان.',
            'For triangles, one of these tests is enough. To compare the sides, put them in order from shortest to longest in both triangles and divide them in pairs: if all the quotients are equal, they are similar.'
        ),
        cases: [
            { title: say('Bi angelu', 'Dos ángulos', 'زاويتان', 'Two angles'), text: say('Bi angelu berdin (hirugarrena ere bai).', 'Dos ángulos iguales (el tercero también).', 'زاويتان متساويتان (والثالثة أيضًا).', 'Two equal angles (the third one too).') },
            { title: say('Aldea, angelua, aldea', 'Lado, ángulo, lado', 'ضلع وزاوية وضلع', 'Side, angle, side'), text: say('Bi alde proportzional eta haien arteko angelua berdina.', 'Dos lados proporcionales y el ángulo que forman, igual.', 'ضلعان متناسبان والزاوية بينهما متساوية.', 'Two proportional sides and the angle between them equal.') },
            { title: say('Hiru alde', 'Tres lados', 'ثلاثة أضلاع', 'Three sides'), text: say('Hiru aldeak proportzionalak.', 'Los tres lados proporcionales.', 'الأضلاع الثلاثة متناسبة.', 'All three sides proportional.'), math: same('$\\frac{a}{a^{\\prime}}=\\frac{b}{b^{\\prime}}=\\frac{c}{c^{\\prime}}$') }
        ],
        why: {
            text: say(
                'Triangelu baten angeluek $180°$ batzen dute. Bi angelu berdinak badira, hirugarrena $180°$ arte falta dena da, eta hura ere berdina da. Horregatik nahikoa da bi begiratzea.',
                'Los ángulos de un triángulo suman $180°$. Si dos ángulos son iguales, el tercero es lo que falta hasta $180°$, y también es igual. Por eso basta con mirar dos.',
                'مجموع زوايا المثلث $180°$. فإذا تساوت زاويتان كانت الثالثة ما ينقص حتى $180°$، فهي متساوية أيضًا. لذلك يكفي النظر في اثنتين.',
                'The angles of a triangle add up to $180°$. If two angles are equal, the third is what is left up to $180°$, and it is equal too. That is why looking at two is enough.'
            ),
            math: same('$180°-50°-60°=70°$')
        },
        examplePrompt: say('Antzekoak al dira 5, 7, 9 eta 15, 21, 27 aldeko bi triangelu?', '¿Son semejantes dos triángulos de lados 5, 7, 9 y 15, 21, 27?', 'هل المثلثان اللذان أضلاعهما 5 و7 و9 و15 و21 و27 متشابهان؟', 'Are two triangles with sides 5, 7, 9 and 15, 21, 27 similar?'),
        example: same('$\\frac{5}{15}=\\frac{7}{21}=\\frac{9}{27}=\\frac{1}{3}$'),
        exampleAnswer: say('Bai: hiru aldeak proportzionalak dira.', 'Sí: los tres lados son proporcionales.', 'نعم: الأضلاع الثلاثة متناسبة.', 'Yes: all three sides are proportional.')
    },
    homothety: {
        vocabulary: [
            say('zentroa', 'centro', 'المركز', 'centre'),
            say('arrazoia', 'razón', 'النسبة', 'scale factor'),
            say('irudia', 'imagen', 'الصورة', 'image')
        ],
        explanation: say(
            'Homoteziak irudi antzekoak marrazteko balio du. $O$ zentro bat eta $r$ arrazoi bat aukeratzen dira, eta $A$ puntu bakoitza $A^{\\prime}$ puntura doa, $OA$ zuzenerdian, $OA^{\\prime}=r\\cdot OA$ izanik. Irudi berria hasierakoaren antzekoa da, $r$ arrazoiarekin eta alde paraleloekin.',
            'La homotecia sirve para dibujar figuras semejantes. Se eligen un centro $O$ y una razón $r$, y cada punto $A$ va a parar a $A^{\\prime}$, en la semirrecta $OA$, con $OA^{\\prime}=r\\cdot OA$. La figura nueva es semejante a la inicial, con razón $r$ y los lados paralelos.',
            'التحاكي طريقة لرسم أشكال متشابهة. نختار مركزًا $O$ ونسبة $r$، فتنتقل كل نقطة $A$ إلى $A^{\\prime}$ على نصف المستقيم $OA$، بحيث $OA^{\\prime}=r\\cdot OA$. والشكل الجديد يشابه الأصلي بالنسبة $r$ وأضلاعه موازية.',
            'A homothety is a way to draw similar shapes. You choose a centre $O$ and a scale factor $r$, and each point $A$ goes to $A^{\\prime}$, on the ray $OA$, with $OA^{\\prime}=r\\cdot OA$. The new shape is similar to the first, with scale factor $r$ and parallel sides.'
        ),
        cases: [
            { title: say('Handitu', 'Ampliar', 'تكبير', 'Enlarge'), text: say('$r>1$: marrazkian, $r=2$ zenbakiak irudia bikoizten du.', '$r>1$: en el dibujo, $r=2$ duplica la figura.', '$r>1$: في الرسم $r=2$ يضاعف الشكل.', '$r>1$: in the drawing, $r=2$ doubles the shape.') },
            { title: say('Txikitu', 'Reducir', 'تصغير', 'Reduce'), text: say('$r<1$: $r=0{,}5$ arrazoiarekin, erdian geratzen da.', '$r<1$: con $r=0{,}5$ se queda en la mitad.', '$r<1$: مع $r=0{,}5$ يصير نصفه.', '$r<1$: with $r=0{,}5$ it ends up half the size.') }
        ],
        examplePrompt: say('$O$ zentroko eta 3 arrazoiko homotezia batean, $OA=2$ cm eta $AB=1{,}5$ cm. Kalkulatu $OA^{\\prime}$ eta $A^{\\prime}B^{\\prime}$.', 'En una homotecia de centro $O$ y razón 3, $OA=2$ cm y $AB=1{,}5$ cm. Calcula $OA^{\\prime}$ y $A^{\\prime}B^{\\prime}$.', 'في تحاكٍ مركزه $O$ ونسبته 3، $OA=2$ سم و$AB=1{,}5$ سم. احسب $OA^{\\prime}$ و$A^{\\prime}B^{\\prime}$.', 'In a homothety with centre $O$ and scale factor 3, $OA=2$ cm and $AB=1{,}5$ cm. Calculate $OA^{\\prime}$ and $A^{\\prime}B^{\\prime}$.'),
        example: same('$\\begin{gathered}OA^{\\prime}=3\\cdot 2=6\\\\ A^{\\prime}B^{\\prime}=3\\cdot 1{,}5=4{,}5\\end{gathered}$'),
        exampleAnswer: say('6 cm eta $4{,}5$ cm: luzera guztiak bider 3.', '6 cm y $4{,}5$ cm: todas las longitudes, por 3.', '6 سم و$4{,}5$ سم: كل الأطوال في 3.', '6 cm and $4{,}5$ cm: every length times 3.')
    },
    /* ---------- 3. Ratios ---------- */
    'perimeter-ratio': {
        vocabulary: [
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter'),
            say('luzera', 'longitud', 'طول', 'length'),
            say('arrazoia', 'razón', 'النسبة', 'scale factor')
        ],
        explanation: say(
            'Bi irudi $r$ arrazoiarekin antzekoak badira, haien luzera guztiak bider $r$ doaz: aldeak, diagonalak, altuerak, erradioak… eta baita perimetroa ere, aldeen batura baita.',
            'Si dos figuras son semejantes con razón $r$, todas sus longitudes se multiplican por $r$: lados, diagonales, alturas, radios… y también el perímetro, que es la suma de los lados.',
            'إذا كان شكلان متشابهين بالنسبة $r$ فإن كل أطوالهما تُضرب في $r$: الأضلاع والأقطار والارتفاعات وأنصاف الأقطار… والمحيط أيضًا لأنه مجموع الأضلاع.',
            'If two shapes are similar with scale factor $r$, all their lengths are multiplied by $r$: sides, diagonals, heights, radii… and the perimeter too, since it is the sum of the sides.'
        ),
        cases: [
            { title: say('Perimetroa', 'Perímetro', 'المحيط', 'Perimeter'), text: say('Marrazkiko karratuetan, aldea bikoitza, perimetroa bikoitza.', 'En los cuadrados del dibujo, lado doble, perímetro doble.', 'في مربعات الرسم: ضلع مضاعف، محيط مضاعف.', 'In the squares of the drawing, double side, double perimeter.'), math: same('$\\frac{P^{\\prime}}{P}=r$') },
            { title: say('Zirkunferentziak', 'Circunferencias', 'الدوائر', 'Circles'), text: say('Erradioa hirukoiztean, luzera hirukoiztu egiten da.', 'Si el radio se triplica, la longitud se triplica.', 'إذا تضاعف نصف القطر ثلاث مرات تضاعف الطول ثلاث مرات.', 'If the radius is tripled, the length is tripled.') }
        ],
        examplePrompt: say('Hexagono erregular batek 3 cm-ko aldea du, eta beste batek $0{,}5$ cm-koa. Zein da haien perimetroen arrazoia?', 'Un hexágono regular tiene 3 cm de lado y otro, $0{,}5$ cm. ¿Cuál es la razón de sus perímetros?', 'مسدس منتظم طول ضلعه 3 سم وآخر $0{,}5$ سم. ما نسبة محيطيهما؟', 'One regular hexagon has 3 cm sides and another $0{,}5$ cm. What is the ratio of their perimeters?'),
        example: same('$3\\div 0{,}5=6$'),
        exampleAnswer: say('6: perimetro handia txikiaren 6 aldiz da.', '6: el perímetro grande es 6 veces el pequeño.', '6: المحيط الكبير 6 أمثال الصغير.', '6: the big perimeter is 6 times the small one.')
    },
    'area-ratio': {
        vocabulary: [
            say('azalera', 'área', 'المساحة', 'area'),
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root'),
            say('karratua', 'cuadrado', 'مربع', 'square')
        ],
        explanation: say(
            'Azalera bi luzeraren biderkadura da, eta biak $r$ aldiz hazten dira. Horregatik irudi antzekoen azaleren arrazoia $r^{2}$ da. Alderantziz, luzeren arrazoia azaleren arrazoiaren erro karratua da.',
            'El área es el producto de dos longitudes, y las dos crecen $r$ veces. Por eso la razón de las áreas de figuras semejantes es $r^{2}$. Al revés, la razón de las longitudes es la raíz cuadrada de la de las áreas.',
            'المساحة جداء طولين، وكلاهما يكبر $r$ مرة. لذلك نسبة مساحات الأشكال المتشابهة $r^{2}$. وبالعكس، نسبة الأطوال الجذر التربيعي لنسبة المساحات.',
            'Area is the product of two lengths, and both grow $r$ times. That is why the ratio of the areas of similar shapes is $r^{2}$. The other way round, the ratio of the lengths is the square root of the ratio of the areas.'
        ),
        cases: [
            { title: say('Azalerak', 'Áreas', 'المساحات', 'Areas'), text: say('Bider $r^{2}$.', 'Por $r^{2}$.', 'في $r^{2}$.', 'Times $r^{2}$.'), math: same('$\\frac{A^{\\prime}}{A}=r^{2}$') },
            { title: say('Marrazkikoak', 'Las del dibujo', 'مربعات الرسم', 'The ones in the drawing'), text: say('1, 2 eta 3 aldeak: azalerak 1, 4 eta 9.', 'Lados 1, 2 y 3: áreas 1, 4 y 9.', 'الأضلاع 1 و2 و3: المساحات 1 و4 و9.', 'Sides 1, 2 and 3: areas 1, 4 and 9.') }
        ],
        why: {
            text: say(
                'Alde bikoitzeko karratua lau karratu txikirekin betetzen da: bi errenkada, biko. Alde hirukoitzarekin, hiru errenkada, hiruko: bederatzi. Luzera bakoitza bider $r$ doa, eta azalera, oinarria bider altuera denez, bider $r\\cdot r$.',
                'Un cuadrado de lado doble se llena con cuatro cuadrados pequeños: dos filas de dos. Con lado triple, tres filas de tres: nueve. Cada longitud va por $r$, y el área, que es base por altura, por $r\\cdot r$.',
                'المربع ذو الضلع المضاعف يمتلئ بأربعة مربعات صغيرة: صفان في كل منهما اثنان. ومع الضلع المضاعف ثلاث مرات ثلاثة صفوف في كل منها ثلاثة: تسعة. كل طول يُضرب في $r$، والمساحة، وهي القاعدة في الارتفاع، في $r\\cdot r$.',
                'A square with double the side fills up with four small squares: two rows of two. With triple the side, three rows of three: nine. Each length goes times $r$, and the area, which is base times height, times $r\\cdot r$.'
            ),
            math: same('$(2\\cdot 3)\\cdot(2\\cdot 4)=4\\cdot(3\\cdot 4)$')
        },
        examplePrompt: say('Bi triangelu antzekoren azalerak 18 cm² eta 50 cm² dira. Zein da antzekotasun-arrazoia?', 'Dos triángulos semejantes tienen áreas de 18 cm² y 50 cm². ¿Cuál es la razón de semejanza?', 'مثلثان متشابهان مساحتاهما 18 سم² و50 سم². ما نسبة التشابه؟', 'Two similar triangles have areas of 18 cm² and 50 cm². What is the scale factor?'),
        example: same('$\\frac{50}{18}=\\frac{25}{9}\\ \\to\\ r=\\frac{5}{3}$'),
        exampleAnswer: say('$\\frac{25}{9}$ zatikiaren erroa: $r=\\frac{5}{3}\\approx 1{,}67$.', 'La raíz de $\\frac{25}{9}$: $r=\\frac{5}{3}\\approx 1{,}67$.', 'جذر $\\frac{25}{9}$: $r=\\frac{5}{3}\\approx 1{,}67$.', 'The root of $\\frac{25}{9}$: $r=\\frac{5}{3}\\approx 1{,}67$.')
    },
    'volume-ratio': {
        vocabulary: [
            say('ertza', 'arista', 'الحرف', 'edge'),
            say('bolumena', 'volumen', 'الحجم', 'volume'),
            say('maketa', 'maqueta', 'مجسّم', 'scale model')
        ],
        explanation: say(
            'Bi gorputz $r$ arrazoiarekin antzekoak badira, haien ertzak bider $r$ doaz, azalerak bider $r^{2}$ eta bolumenak bider $r^{3}$. Horregatik maketa batek benetakoak baino bolumen askoz txikiagoa du: 1:10 eskalan, mila aldiz txikiagoa.',
            'Si dos cuerpos son semejantes con razón $r$, sus aristas se multiplican por $r$, sus áreas por $r^{2}$ y sus volúmenes por $r^{3}$. Por eso una maqueta tiene un volumen mucho menor que el real: a escala 1:10, mil veces menor.',
            'إذا كان جسمان متشابهين بالنسبة $r$ فإن أحرفهما تُضرب في $r$ ومساحاتهما في $r^{2}$ وحجومهما في $r^{3}$. لذلك حجم المجسّم أصغر بكثير من الحقيقي: بمقياس 1:10 أصغر ألف مرة.',
            'If two solids are similar with scale factor $r$, their edges are multiplied by $r$, their areas by $r^{2}$ and their volumes by $r^{3}$. That is why a scale model has a much smaller volume than the real thing: at 1:10, a thousand times smaller.'
        ),
        cases: [
            { title: say('Bolumenak', 'Volúmenes', 'الحجوم', 'Volumes'), text: say('Bider $r^{3}$.', 'Por $r^{3}$.', 'في $r^{3}$.', 'Times $r^{3}$.'), math: same('$\\frac{V^{\\prime}}{V}=r^{3}$') },
            { title: say('Marrazkikoak', 'Los del dibujo', 'مكعبات الرسم', 'The ones in the drawing'), text: say('Ertz bikoitza: 8 kubo sartzen dira; hirukoitza: 27.', 'Arista doble: caben 8 cubos; triple: 27.', 'حرف مضاعف: تتّسع 8 مكعبات؛ ثلاثة أضعاف: 27.', 'Double edge: 8 cubes fit; triple: 27.'), math: same('$2^{3}=8\\qquad 3^{3}=27$') }
        ],
        examplePrompt: say('Baloi batek 4 L-ko bolumena du. Zer bolumen du erradio bikoitza duen antzeko batek?', 'Una pelota tiene 4 L de volumen. ¿Qué volumen tiene otra semejante con el radio doble?', 'حجم كرة 4 لترات. ما حجم كرة مشابهة نصف قطرها ضعفه؟', 'A ball has a volume of 4 L. What is the volume of a similar one with double the radius?'),
        example: same('$4\\cdot 2^{3}=32$'),
        exampleAnswer: say('32 L: bolumena bider 8 doa.', '32 L: el volumen se multiplica por 8.', '32 لترًا: الحجم يُضرب في 8.', '32 L: the volume is multiplied by 8.')
    },
    /* ---------- 4. Scales ---------- */
    scale: {
        definitions: [
            {
                term: say('Eskala', 'Escala', 'المقياس', 'Scale'),
                meaning: say('$1\\mathbin{:}n$ idazten da: mapako unitate bat errealitateko $n$ unitate dira, edozein unitate izanda ere.', 'Se escribe $1\\mathbin{:}n$: una unidad del mapa son $n$ unidades reales, sea cual sea la unidad.', 'يُكتب $1\\mathbin{:}n$: وحدة واحدة في الخريطة تساوي $n$ وحدة في الواقع، أيًّا كانت الوحدة.', 'It is written $1\\mathbin{:}n$: one unit on the map is $n$ real units, whatever the unit.')
            }
        ],
        vocabulary: [
            say('mapa', 'mapa', 'الخريطة', 'map'),
            say('distantzia', 'distancia', 'المسافة', 'distance'),
            say('unitatea', 'unidad', 'الوحدة', 'unit')
        ],
        explanation: say(
            'Mapak eta planoak errealitatearen antzeko irudiak dira. Benetako distantzia bat aurkitzeko, biderkatu mapakoa $n$ zenbakiaz; mapakoa aurkitzeko, zatitu benetakoa $n$ zenbakiaz. Amaieran, pasatu emaitza unitate egoki batera: 100 000 cm 1 km dira.',
            'Los mapas y los planos son figuras semejantes a la realidad. Para hallar una distancia real, multiplica la del mapa por $n$; para la del mapa, divide la real entre $n$. Al final, pasa el resultado a una unidad adecuada: 100 000 cm son 1 km.',
            'الخرائط والمخططات أشكال مشابهة للواقع. لإيجاد مسافة حقيقية اضرب مسافة الخريطة في $n$؛ ولإيجاد مسافة الخريطة اقسم الحقيقية على $n$. وفي النهاية حوّل النتيجة إلى وحدة مناسبة: 100 000 سم تساوي 1 كم.',
            'Maps and plans are shapes similar to reality. To find a real distance, multiply the map one by $n$; for the map one, divide the real one by $n$. At the end, change the result into a suitable unit: 100,000 cm is 1 km.'
        ),
        cases: [
            { title: say('Marrazkiko mapa', 'El mapa del dibujo', 'خريطة الرسم', 'The map in the drawing'), text: say('1:50 000 eskalan, mapako 4 cm 200 000 cm dira, hau da, 2 km.', 'A escala 1:50 000, 4 cm del mapa son 200 000 cm, es decir, 2 km.', 'بمقياس 1:50 000 تساوي 4 سم في الخريطة 200 000 سم، أي 2 كم.', 'At 1:50,000, 4 cm on the map is 200,000 cm, that is, 2 km.'), math: same('$4\\cdot 50\\,000=200\\,000$') },
            { title: say('Eskala grafikoa', 'Escala gráfica', 'المقياس الخطي', 'Scale bar'), text: say('Zuzenki bat, benetan zenbat balio duen adierazten duena.', 'Un segmento que indica cuánto vale su longitud en la realidad.', 'قطعة تبيّن كم يساوي طولها في الواقع.', 'A segment that shows how long it is in reality.') }
        ],
        examplePrompt: say('Bi hiri 45 km-ra daude. Zer distantziatara daude 1:1 500 000 eskalako mapa batean?', 'Dos ciudades están a 45 km. ¿A qué distancia están en un mapa a escala 1:1 500 000?', 'مدينتان المسافة بينهما 45 كم. كم المسافة بينهما في خريطة بمقياس 1:1 500 000؟', 'Two cities are 45 km apart. How far apart are they on a 1:1,500,000 map?'),
        example: same('$4\\,500\\,000\\div 1\\,500\\,000=3$'),
        exampleAnswer: say('3 cm: km-ak cm-tan jarrita, $n$ zenbakiaz zatitzen da.', '3 cm: se divide entre $n$, con los km pasados a cm.', '3 سم: نقسم على $n$ بعد تحويل الكيلومترات إلى سنتيمترات.', '3 cm: divide by $n$, with the km changed into cm.')
    },
    'find-scale': {
        vocabulary: [
            say('eskala', 'escala', 'المقياس', 'scale'),
            say('unitate bera', 'misma unidad', 'الوحدة نفسها', 'same unit'),
            say('maketa', 'maqueta', 'مجسّم', 'scale model')
        ],
        explanation: say(
            'Eskala aurkitzeko, jarri bi distantziak unitate berean eta zatitu benetakoa mapakoaz: zatidura hori $n$ da. km eta cm nahasten badituzu, eskala gaizki ateratzen da.',
            'Para hallar la escala, pon las dos distancias en la misma unidad y divide la real entre la del mapa: ese cociente es $n$. Si mezclas km y cm, la escala sale mal.',
            'لإيجاد المقياس ضع المسافتين بالوحدة نفسها واقسم الحقيقية على مسافة الخريطة: خارج القسمة هو $n$. وإذا خلطت الكيلومترات بالسنتيمترات خرج المقياس خطأً.',
            'To find the scale, put the two distances in the same unit and divide the real one by the map one: that quotient is $n$. If you mix km and cm, the scale comes out wrong.'
        ),
        cases: [
            { title: say('Mapa', 'Mapa', 'خريطة', 'Map'), text: say('Mapako 1 cm benetako 5 km bada: 5 km = 500 000 cm; eskala 1:500 000.', 'Si 1 cm del mapa son 5 km reales: 5 km = 500 000 cm, escala 1:500 000.', 'إذا كان 1 سم في الخريطة يساوي 5 كم: 5 كم = 500 000 سم، والمقياس 1:500 000.', 'If 1 cm on the map is 5 km in reality: 5 km = 500,000 cm, scale 1:500,000.') },
            { title: say('Maketa', 'Maqueta', 'مجسّم', 'Scale model'), text: say('17,5 cm-ko maketa batek 350 cm-ko armairua adierazten du: eskala 1:20.', 'Una maqueta de 17,5 cm de un armario de 350 cm: escala 1:20.', 'مجسّم طوله 17.5 سم لخزانة طولها 350 سم: المقياس 1:20.', 'A 17.5 cm model of a 350 cm wardrobe: scale 1:20.'), math: same('$350\\div 17{,}5=20$') }
        ],
        examplePrompt: say('Plano batean 4 cm 12 m dira. Zein da eskala?', 'En un plano, 4 cm representan 12 m. ¿Cuál es la escala?', 'في مخطط تمثّل 4 سم مسافة 12 م. ما المقياس؟', 'On a plan, 4 cm stand for 12 m. What is the scale?'),
        example: same('$1200\\div 4=300$'),
        exampleAnswer: say('12 m = 1200 cm: eskala 1:300.', '12 m = 1200 cm: escala 1:300.', '12 م = 1200 سم: المقياس 1:300.', '12 m = 1,200 cm: scale 1:300.')
    },
    plans: {
        vocabulary: [
            say('planoa', 'plano', 'المخطط', 'plan'),
            say('maketa', 'maqueta', 'المجسّم', 'scale model'),
            say('luzerak', 'longitudes', 'الأطوال', 'lengths')
        ],
        explanation: say(
            'Eskala luzerei aplikatzen zaie. $1\\mathbin{:}n$ eskalako plano batean, benetako azalerak $n^{2}$ aldiz handiagoak dira, eta maketa batean, bolumenak $n^{3}$ aldiz. Errazagoa da lehenik luzerak pasatzea eta gero azalera kalkulatzea.',
            'La escala se aplica a las longitudes. En un plano a escala $1\\mathbin{:}n$, las áreas reales son $n^{2}$ veces mayores, y en una maqueta, los volúmenes son $n^{3}$ veces mayores. Es más fácil pasar primero las longitudes y después calcular el área.',
            'المقياس يطبَّق على الأطوال. في مخطط بمقياس $1\\mathbin{:}n$ تكون المساحات الحقيقية أكبر $n^{2}$ مرة، وفي المجسّم تكون الحجوم أكبر $n^{3}$ مرة. والأسهل تحويل الأطوال أولًا ثم حساب المساحة.',
            'The scale applies to lengths. On a plan at $1\\mathbin{:}n$, the real areas are $n^{2}$ times bigger, and in a scale model, the volumes are $n^{3}$ times bigger. It is easier to change the lengths first and then work out the area.'
        ),
        cases: [
            { title: say('Lehenik luzerak', 'Primero las longitudes', 'الأطوال أولًا', 'Lengths first'), text: say('Marrazkian, 1:100 eskalan: 5 cm × 4 cm, 5 m × 4 m dira.', 'En el dibujo, a escala 1:100: 5 cm × 4 cm son 5 m × 4 m.', 'في الرسم بمقياس 1:100: 5 سم × 4 سم هي 5 م × 4 م.', 'In the drawing, at 1:100: 5 cm × 4 cm is 5 m × 4 m.'), math: same('$5\\cdot 4=20$') },
            { title: say('Azalera zuzenean', 'El área directa', 'المساحة مباشرة', 'The area directly'), text: say('Planoko 20 cm², bider $100^{2}$: 20 m².', '20 cm² del plano, por $100^{2}$: 20 m².', '20 سم² في المخطط في $100^{2}$: 20 م².', '20 cm² on the plan, times $100^{2}$: 20 m².'), math: same('$20\\cdot 10\\,000=200\\,000$') }
        ],
        examplePrompt: say('1:200 eskalako plano batean, lorategi batek 3 cm × 2 cm neurtzen ditu. Zein da haren benetako azalera?', 'En un plano a escala 1:200, un jardín mide 3 cm × 2 cm. ¿Cuál es su área real?', 'في مخطط بمقياس 1:200 أبعاد حديقة 3 سم × 2 سم. ما مساحتها الحقيقية؟', 'On a 1:200 plan, a garden is 3 cm × 2 cm. What is its real area?'),
        example: same('$\\begin{gathered}3\\cdot 200=600\\qquad 2\\cdot 200=400\\\\ 6\\cdot 4=24\\end{gathered}$'),
        exampleAnswer: say('24 m²: 6 m bider 4 m.', '24 m²: 6 m por 4 m.', '24 م²: 6 م في 4 م.', '24 m²: 6 m by 4 m.')
    },
    /* ---------- 5. Heights and distances ---------- */
    shadows: {
        vocabulary: [
            say('itzala', 'sombra', 'الظل', 'shadow'),
            say('izpiak', 'rayos', 'الأشعة', 'rays'),
            say('bertikala', 'vertical', 'عمودي', 'upright')
        ],
        explanation: say(
            'Eguzki-izpiak paraleloak dira. Une berean, objektu bertikal batek eta haren itzalak osatzen duten triangelua beste edozeinena bezalakoa da: angelu zuzena eta izpien angelua berdinak dira. Horregatik altuerak eta itzalak proportzionalak dira. Horrela neurtu zuen Talesek Keopsen piramidea.',
            'Los rayos del sol son paralelos. En un mismo momento, el triángulo que forman un objeto vertical y su sombra es semejante al de cualquier otro: el ángulo recto y el de los rayos son iguales. Por eso alturas y sombras son proporcionales. Así midió Tales la pirámide de Keops.',
            'أشعة الشمس متوازية. في اللحظة نفسها يكون المثلث الذي يكوّنه جسم عمودي وظله مشابهًا لمثلث أي جسم آخر: الزاوية القائمة وزاوية الأشعة متساويتان. لذلك الأطوال والظلال متناسبة. وهكذا قاس طاليس هرم خوفو.',
            'The sun’s rays are parallel. At any one moment, the triangle an upright object makes with its shadow is similar to anyone else’s: the right angle and the angle of the rays are equal. That is why heights and shadows are proportional. That is how Thales measured the pyramid of Khufu.'
        ),
        cases: [
            { title: say('Proportzioa', 'La proporción', 'التناسب', 'The proportion'), text: say('Altuera zati itzala, berdina bientzat.', 'Altura entre sombra, igual para los dos.', 'الطول على الظل، نفسه لكليهما.', 'Height over shadow, the same for both.') },
            { title: say('Kontuz', 'Cuidado', 'انتبه', 'Careful'), text: say('Datu guztiak unitate berean eta une berean.', 'Todos los datos en la misma unidad y en el mismo momento.', 'كل المعطيات بالوحدة نفسها وفي اللحظة نفسها.', 'All the data in the same unit and at the same moment.') }
        ],
        examplePrompt: say('$1{,}8$ m-ko pertsona batek $1{,}2$ m-ko itzala ematen du. Aldi berean, eraikin batek 20 m-koa. Zenbat neurtzen du eraikinak?', 'Una persona de $1{,}8$ m da una sombra de $1{,}2$ m. A la vez, un edificio da una sombra de 20 m. ¿Cuánto mide el edificio?', 'شخص طوله $1{,}8$ م ظله $1{,}2$ م. وفي الوقت نفسه ظل مبنى 20 م. كم طول المبنى؟', 'A $1{,}8$ m person casts a $1{,}2$ m shadow. At the same time, a building casts a 20 m shadow. How tall is the building?'),
        example: same('$\\frac{x}{20}=\\frac{1{,}8}{1{,}2}\\ \\to\\ x=30$'),
        exampleAnswer: say('30 m: itzala halako 1,5.', '30 m: 1,5 veces la sombra.', '30 م: مرة ونصف طول الظل.', '30 m: 1.5 times the shadow.')
    },
    mirror: {
        vocabulary: [
            say('ispilua', 'espejo', 'المرآة', 'mirror'),
            say('begiak', 'ojos', 'العينين', 'eyes'),
            say('islatu', 'reflejar', 'ينعكس', 'reflect')
        ],
        explanation: say(
            'Pertsona batek lurreko ispilu batean eraikin baten goiko puntua ikusten badu, argia angelu berarekin iristen eta islatzen da. Bi triangelu angeluzuzen antzeko sortzen dira: pertsonarena (begien altuera eta ispilurainoko distantzia) eta eraikinarena. Pertsonaren begien altuera erabiltzen da.',
            'Si una persona ve en un espejo del suelo lo alto de un edificio, la luz llega y se refleja con el mismo ángulo. Se forman dos triángulos rectángulos semejantes: el de la persona (altura de los ojos y distancia al espejo) y el del edificio. De la persona se usa la altura de los ojos.',
            'إذا رأى شخص في مرآة على الأرض أعلى مبنى، فإن الضوء يصل وينعكس بالزاوية نفسها. يتكوّن مثلثان قائمان متشابهان: مثلث الشخص (ارتفاع العينين والبعد عن المرآة) ومثلث المبنى. ونستعمل من الشخص ارتفاع العينين.',
            'If a person sees the top of a building in a mirror on the ground, the light arrives and is reflected at the same angle. Two similar right-angled triangles form: the person’s (eye height and distance to the mirror) and the building’s. For the person, you use the height of the eyes.'
        ),
        why: {
            text: say(
                'Argiak billarreko bola batek bezala egiten du jauzi: iristen den angelu berarekin ateratzen da. Lurrarekiko angelu zuzenarekin batera, bi triangeluek bi angelu berdin dituzte: antzekoak dira (lehen irizpidea).',
                'La luz rebota como una bola de billar: sale con el mismo ángulo con que llega. Con el ángulo recto del suelo, los dos triángulos tienen dos ángulos iguales: son semejantes (primer criterio).',
                'يرتدّ الضوء ككرة البلياردو: يخرج بالزاوية نفسها التي يصل بها. ومع الزاوية القائمة على الأرض يكون للمثلثين زاويتان متساويتان: فهما متشابهان (المعيار الأول).',
                'Light bounces like a snooker ball: it leaves at the same angle it arrives. With the right angle at the ground, the two triangles have two equal angles: they are similar (the first test).'
            )
        },
        examplePrompt: say('Ispilu bat zuhaitz batetik 9 m-ra dago. Begiak $1{,}5$ m-ra dituen pertsona batek ispilutik $1{,}8$ m-ra ikusten du. Zenbat neurtzen du zuhaitzak?', 'Un espejo está a 9 m de un árbol. Una persona con los ojos a $1{,}5$ m lo ve desde $1{,}8$ m del espejo. ¿Cuánto mide el árbol?', 'مرآة على بعد 9 م من شجرة. شخص عيناه على ارتفاع $1{,}5$ م يراها من بعد $1{,}8$ م عن المرآة. كم طول الشجرة؟', 'A mirror is 9 m from a tree. A person with eyes at $1{,}5$ m sees it from $1{,}8$ m away from the mirror. How tall is the tree?'),
        example: same('$\\frac{x}{9}=\\frac{1{,}5}{1{,}8}\\ \\to\\ x=7{,}5$'),
        exampleAnswer: say('$7{,}5$ m.', '$7{,}5$ m.', '$7{,}5$ م.', '$7{,}5$ m.')
    },
    sight: {
        vocabulary: [
            say('ikus-lerroa', 'línea de visión', 'خط النظر', 'line of sight'),
            say('lerrokatuta', 'alineados', 'على استقامة واحدة', 'lined up'),
            say('zutoina', 'poste', 'عمود', 'post')
        ],
        explanation: say(
            'Pertsona batek zutoin baten punta eta eraikin baten goialdea lerrokatuta ikusten baditu, Tales posizioko bi triangelu sortzen dira, oinarria begien altueran dutela. Lehenik kendu begien altuera, egin proportzioa eta amaieran batu berriro.',
            'Si una persona ve alineados la punta de un poste y lo alto de un edificio, se forman dos triángulos en posición de Tales, con la base a la altura de los ojos. Primero resta la altura de los ojos, haz la proporción y al final vuelve a sumarla.',
            'إذا رأى شخص رأس عمود وأعلى مبنى على استقامة واحدة يتكوّن مثلثان في وضع طاليس، قاعدتهما على ارتفاع العينين. اطرح أولًا ارتفاع العينين، ثم كوّن التناسب، وفي النهاية أضفه من جديد.',
            'If a person sees the tip of a post and the top of a building lined up, two triangles in Thales’ position form, with their base at eye height. First take off the eye height, set up the proportion and add it back at the end.'
        ),
        cases: [
            { title: say('Txikia', 'El pequeño', 'الصغير', 'The small one'), text: say('Altuera: zutoina ken begiak.', 'Altura: poste menos ojos.', 'الارتفاع: العمود ناقص العينين.', 'Height: the post minus the eyes.') },
            { title: say('Handia', 'El grande', 'الكبير', 'The big one'), text: say('Altuera: eraikina ken begiak.', 'Altura: edificio menos ojos.', 'الارتفاع: المبنى ناقص العينين.', 'Height: the building minus the eyes.') },
            { title: say('Distantziak', 'Distancias', 'المسافات', 'Distances'), text: say('Ibai baten zabalera ere horrela neurtzen da, bi triangelu antzekorekin.', 'El ancho de un río se mide igual, con dos triángulos semejantes.', 'ويُقاس عرض نهر بالطريقة نفسها، بمثلثين متشابهين.', 'The width of a river is measured the same way, with two similar triangles.') }
        ],
        examplePrompt: say('Begiak $1{,}6$ m-ra, $2{,}1$ m-ko hesi batetik 2 m-ra: hesiaren ertza eta 30 m-ra dagoen dorre baten goialdea lerrokatuta daude. Zenbat neurtzen du dorreak?', 'Unos ojos a $1{,}6$ m, a 2 m de una valla de $2{,}1$ m, ven alineados su borde y lo alto de una torre a 30 m. ¿Cuánto mide?', 'عينان على ارتفاع $1{,}6$ م، على بعد 2 م من سياج طوله $2{,}1$ م، تريان حافته وأعلى برج على بعد 30 م على استقامة واحدة. كم طول البرج؟', 'Eyes at $1{,}6$ m, 2 m from a $2{,}1$ m fence, see its edge and the top of a tower 30 m away lined up. How tall is the tower?'),
        example: same('$\\begin{gathered}\\frac{30\\cdot 0{,}5}{2}=7{,}5\\\\ 7{,}5+1{,}6=9{,}1\\end{gathered}$'),
        exampleAnswer: say('$9{,}1$ m: triangelu txikiaren altuera $0{,}5$ da.', '$9{,}1$ m: la altura del triángulo pequeño es $0{,}5$.', '$9{,}1$ م: ارتفاع المثلث الصغير $0{,}5$.', '$9{,}1$ m: the height of the small triangle is $0{,}5$.')
    }
}

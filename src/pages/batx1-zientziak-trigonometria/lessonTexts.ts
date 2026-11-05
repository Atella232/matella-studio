import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { TrigonometryTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Formula eta funtzio trigonometrikoak · Batxilergoa 1 · Zientziak — what
   each lesson tells: the new words (definitions), a short explanation, the
   example as an exercise («Another example»), the key words in four
   languages and, in five lessons, «Why does it work?». Plain data so the
   tests can import it; lessons.tsx merges it into the topics. Formulas
   write \sin, \tan, \csc and \cot in every language (so the shared tests
   see the same formulas) and localizeNames gives each language its names
   (sen, tg, cosec, cotg). The examples use numbers of their own. Tests in
   tests/lesson-texts.test.ts and tests/trigonometria-batx1z-content.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const trigonometryLessonTexts: Record<TrigonometryTopicId, LessonTexts> = {
    /* ---------- 1. The six ratios ---------- */
    'radians-review': {
        definitions: [
            { term: say('Radiana', 'Radián', 'الراديان', 'Radian'), meaning: say('Arkuak erradioak beste neurtzen duen angelua: bira osoa $2\\pi$ rad da.', 'El ángulo cuyo arco mide lo mismo que el radio: una vuelta son $2\\pi$ rad.', 'الزاوية التي يساوي قوسها نصف القطر: الدورة الكاملة $2\\pi$ rad.', 'The angle whose arc is as long as the radius: a full turn is $2\\pi$ rad.') }
        ],
        vocabulary: [
            say('arkua', 'arco', 'القوس', 'arc'),
            say('erradioa', 'radio', 'نصف القطر', 'radius')
        ],
        explanation: say(
            'Radianetan neurtzea arkuan zenbat erradio sartzen diren zenbatzea da. Bira erdia, 180°, π radian da, eta berdintza horretatik ateratzen dira bi bihurketak. Grafikoetan $x$ ardatza radianetan doa. Angelu nabarmenak π zenbakiaren zatiki gisa geratzen dira: 30° angelua $\\frac{\\pi}{6}$ da, eta 90° angelua, $\\frac{\\pi}{2}$.',
            'Medir en radianes es contar cuántos radios caben en el arco. Media vuelta, 180°, son π radianes, y de esa igualdad salen las dos conversiones. En las gráficas, el eje $x$ va en radianes. Los ángulos notables quedan como fracciones de π: 30° es $\\frac{\\pi}{6}$ y 90° es $\\frac{\\pi}{2}$.',
            'القياس بالراديان هو عدّ أنصاف الأقطار التي يتسع لها القوس. نصف الدورة، أي 180°، يساوي π راديان، ومن هذه المساواة يخرج التحويلان. وفي التمثيلات البيانية يكون المحور $x$ بالراديان. وتصير الزوايا الشهيرة كسورًا من π: الزاوية 30° هي $\\frac{\\pi}{6}$ والزاوية 90° هي $\\frac{\\pi}{2}$.',
            'Measuring in radians means counting how many radii fit along the arc. Half a turn, 180°, is π radians, and both conversions come from that equality. In the graphs, the $x$ axis is in radians. The notable angles become fractions of π: 30° is $\\frac{\\pi}{6}$ and 90° is $\\frac{\\pi}{2}$.'
        ),
        examplePrompt: say('Pasatu 240° radianetara, eta $\\frac{5\\pi}{4}$ rad gradutara.', 'Pasa 240° a radianes y $\\frac{5\\pi}{4}$ rad a grados.', 'حوّل 240° إلى الراديان و$\\frac{5\\pi}{4}$ rad إلى الدرجات.', 'Convert 240° to radians and $\\frac{5\\pi}{4}$ rad to degrees.'),
        example: same('$240°=\\frac{4\\pi}{3}\\qquad\\frac{5\\pi}{4}=225°$')
    },
    reciprocal: {
        definitions: [
            { term: say('Sekantea', 'Secante', 'القاطع', 'Secant'), meaning: say('Kosinuaren alderantzizkoa: $\\sec\\alpha=\\frac{1}{\\cos\\alpha}$.', 'El inverso del coseno: $\\sec\\alpha=\\frac{1}{\\cos\\alpha}$.', 'مقلوب جيب التمام: $\\sec\\alpha=\\frac{1}{\\cos\\alpha}$.', 'The reciprocal of the cosine: $\\sec\\alpha=\\frac{1}{\\cos\\alpha}$.') },
            { term: say('Kosekantea', 'Cosecante', 'قاطع التمام', 'Cosecant'), meaning: say('Sinuaren alderantzizkoa: $\\csc\\alpha=\\frac{1}{\\sin\\alpha}$.', 'El inverso del seno: $\\csc\\alpha=\\frac{1}{\\sin\\alpha}$.', 'مقلوب الجيب: $\\csc\\alpha=\\frac{1}{\\sin\\alpha}$.', 'The reciprocal of the sine: $\\csc\\alpha=\\frac{1}{\\sin\\alpha}$.') },
            { term: say('Kotangentea', 'Cotangente', 'ظل التمام', 'Cotangent'), meaning: say('Tangentearen alderantzizkoa: $\\cot\\alpha=\\frac{\\cos\\alpha}{\\sin\\alpha}$.', 'El inverso de la tangente: $\\cot\\alpha=\\frac{\\cos\\alpha}{\\sin\\alpha}$.', 'مقلوب الظل: $\\cot\\alpha=\\frac{\\cos\\alpha}{\\sin\\alpha}$.', 'The reciprocal of the tangent: $\\cot\\alpha=\\frac{\\cos\\alpha}{\\sin\\alpha}$.') }
        ],
        vocabulary: [
            say('alderantzizkoa', 'inverso', 'المقلوب', 'reciprocal'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Hiru arrazoi berriak ohiko hiruren alderantzizkoak dira: sekantea kosinuarena, kosekantea sinuarena eta kotangentea tangentearena. Bakoitzak bere arrazoiaren zeinua du: kosinua negatiboa bada, sekantea ere bai. Ez dute baliorik beheko arrazoia 0 denean: $\\sec 90°$ ez da existitzen.',
            'Las tres razones nuevas son las inversas de las tres de siempre: la secante, del coseno; la cosecante, del seno; y la cotangente, de la tangente. Cada una tiene el signo de su razón: si el coseno es negativo, la secante también. No existen cuando la razón de abajo vale 0: $\\sec 90°$ no existe.',
            'النسب الثلاث الجديدة هي مقلوب النسب الثلاث المعتادة: القاطع مقلوب جيب التمام، وقاطع التمام مقلوب الجيب، وظل التمام مقلوب الظل. ولكل منها إشارة نسبتها: إذا كان جيب التمام سالبًا فالقاطع سالب أيضًا. ولا توجد عندما تساوي النسبة التي في المقام 0: $\\sec 90°$ غير موجود.',
            'The three new ratios are the reciprocals of the usual three: the secant of the cosine, the cosecant of the sine and the cotangent of the tangent. Each one has the sign of its ratio: if the cosine is negative, so is the secant. They do not exist when the ratio underneath is 0: $\\sec 90°$ does not exist.'
        ),
        examplePrompt: say('$\\tan\\alpha=\\frac{5}{12}$ da, eta α hirugarren koadrantean dago. Kalkulatu $\\sec\\alpha$.', '$\\tan\\alpha=\\frac{5}{12}$ y α está en el tercer cuadrante. Halla $\\sec\\alpha$.', '$\\tan\\alpha=\\frac{5}{12}$ وα في الربع الثالث. أوجد $\\sec\\alpha$.', '$\\tan\\alpha=\\frac{5}{12}$ and α is in the third quadrant. Find $\\sec\\alpha$.'),
        example: same('$\\sec^2\\alpha=1+\\frac{25}{144}=\\frac{169}{144}\\qquad\\sec\\alpha=-\\frac{13}{12}$'),
        why: {
            text: say(
                'Zergatik funtzionatzen du? Zatitu $\\sin^2\\alpha+\\cos^2\\alpha=1$ berdintza $\\cos^2\\alpha$ adierazpenaz: sinua zati kosinua tangentea da, eta 1 zati kosinua, sekantea. $\\sin^2\\alpha$ adierazpenaz zatituz, kotangentearena ateratzen da.',
                '¿Por qué funciona? Divide $\\sin^2\\alpha+\\cos^2\\alpha=1$ entre $\\cos^2\\alpha$: el seno entre el coseno es la tangente, y 1 entre el coseno, la secante. Dividiendo entre $\\sin^2\\alpha$ sale la de la cotangente.',
                'لماذا تصح؟ اقسم $\\sin^2\\alpha+\\cos^2\\alpha=1$ على $\\cos^2\\alpha$: الجيب على جيب التمام هو الظل، و1 على جيب التمام هو القاطع. وبالقسمة على $\\sin^2\\alpha$ تخرج علاقة ظل التمام.',
                'Why does it work? Divide $\\sin^2\\alpha+\\cos^2\\alpha=1$ by $\\cos^2\\alpha$: the sine divided by the cosine is the tangent, and 1 divided by the cosine is the secant. Dividing by $\\sin^2\\alpha$ gives the one for the cotangent.'
            ),
            math: same('$\\tan^2\\alpha+1=\\sec^2\\alpha\\qquad 1+\\cot^2\\alpha=\\csc^2\\alpha$')
        }
    },
    identities: {
        definitions: [
            { term: say('Identitatea', 'Identidad', 'المتطابقة', 'Identity'), meaning: say('Bi aldeak existitzen diren angelu guztietan betetzen den berdintza.', 'Una igualdad que se cumple para todos los ángulos en que existen sus dos lados.', 'مساواة تتحقق لكل الزوايا التي يوجد فيها طرفاها.', 'An equality that holds for every angle where both sides exist.') }
        ],
        vocabulary: [
            say('aldea', 'lado', 'الطرف', 'side'),
            say('sinplifikatu', 'simplificar', 'التبسيط', 'simplify')
        ],
        explanation: say(
            'Identitate bat ez da ebazten: frogatu egiten da. Hasi alde konplikatuenetik, idatzi arrazoi bakoitza sinuz eta kosinuz, bilatu izendatzaile komuna eta erabili $\\sin^2\\alpha+\\cos^2\\alpha=1$ beste aldera iritsi arte. Ez pasatu gaiak alde batetik bestera: hori da frogatu behar dena.',
            'Una identidad no se resuelve: se demuestra. Parte del lado más complicado, escribe cada razón con senos y cosenos, saca común denominador y usa $\\sin^2\\alpha+\\cos^2\\alpha=1$ hasta llegar al otro lado. No pases términos de un lado a otro: eso es justo lo que hay que probar.',
            'المتطابقة لا تُحل بل تُثبت. ابدأ من الطرف الأكثر تعقيدًا، واكتب كل نسبة بالجيب وجيب التمام، ووحّد المقامات، واستعمل $\\sin^2\\alpha+\\cos^2\\alpha=1$ حتى تصل إلى الطرف الآخر. ولا تنقل الحدود من طرف إلى آخر: فهذا بالضبط ما يجب إثباته.',
            'An identity is not solved: it is proved. Start from the more complicated side, write each ratio with sines and cosines, find a common denominator and use $\\sin^2\\alpha+\\cos^2\\alpha=1$ until you reach the other side. Do not move terms from one side to the other: that is exactly what you have to prove.'
        ),
        cases: [
            { title: say('Dena sinuz eta kosinuz', 'Todo con senos y cosenos', 'كل شيء بالجيب وجيب التمام', 'Everything with sines and cosines'), text: say('Arrazoi bakoitza zatiki bihurtzen da.', 'Cada razón pasa a ser una fracción.', 'تصير كل نسبة كسرًا.', 'Each ratio turns into a fraction.'), math: same('$\\cot\\alpha=\\frac{\\cos\\alpha}{\\sin\\alpha}$') },
            { title: say('Ezkutuko 1 zenbakia', 'El 1 escondido', 'الواحد المخفي', 'The hidden 1'), text: say('Aldatu $1-\\cos^2\\alpha$ adierazpena $\\sin^2\\alpha$ adierazpenaz, edo alderantziz.', 'Cambia $1-\\cos^2\\alpha$ por $\\sin^2\\alpha$, o al revés.', 'ضع مكان $1-\\cos^2\\alpha$ العبارة $\\sin^2\\alpha$، أو العكس.', 'Swap $1-\\cos^2\\alpha$ for $\\sin^2\\alpha$, or the other way round.'), math: same('$1-\\cos^2\\alpha=\\sin^2\\alpha$') },
            { title: say('Faktore komuna', 'Factor común', 'العامل المشترك', 'Common factor'), text: say('Errepikatzen den faktorea kanpora ateratzen da, eta batzuetan sinplifikatu egiten da.', 'Un factor que se repite sale fuera y a veces se simplifica.', 'العامل المتكرر يخرج، وأحيانًا يُختصر.', 'A factor that repeats comes outside and sometimes cancels.'), math: same('$\\sin^3\\alpha+\\sin\\alpha\\cos^2\\alpha=\\sin\\alpha$') }
        ],
        examplePrompt: say('Sinplifikatu $\\frac{1-\\cos^2\\alpha}{\\sin\\alpha\\cos\\alpha}$.', 'Simplifica $\\frac{1-\\cos^2\\alpha}{\\sin\\alpha\\cos\\alpha}$.', 'بسّط $\\frac{1-\\cos^2\\alpha}{\\sin\\alpha\\cos\\alpha}$.', 'Simplify $\\frac{1-\\cos^2\\alpha}{\\sin\\alpha\\cos\\alpha}$.'),
        example: same('$\\frac{\\sin^2\\alpha}{\\sin\\alpha\\cos\\alpha}=\\frac{\\sin\\alpha}{\\cos\\alpha}=\\tan\\alpha$')
    },

    /* ---------- 2. Sums and differences ---------- */
    'sum-formulas': {
        definitions: [
            { term: say('Balio zehatza', 'Valor exacto', 'القيمة الدقيقة', 'Exact value'), meaning: say('Zatiki eta erroekin idatzitako arrazoia, biribildu gabe: $\\frac{\\sqrt{2}}{2}$, ez $0{,}707$.', 'Una razón escrita con fracciones y raíces, sin redondear: $\\frac{\\sqrt{2}}{2}$, no $0{,}707$.', 'نسبة مكتوبة بالكسور والجذور دون تقريب: $\\frac{\\sqrt{2}}{2}$ لا $0{,}707$.', 'A ratio written with fractions and roots, not rounded: $\\frac{\\sqrt{2}}{2}$, not $0{,}707$.') }
        ],
        vocabulary: [
            say('batuketa', 'suma', 'المجموع', 'sum'),
            say('nabarmena', 'notable', 'الشهيرة', 'notable')
        ],
        explanation: say(
            'Batuketaren arrazoiak ez dira arrazoien batuketa. $\\alpha+\\beta$ angeluaren sinuak bi angeluen sinuak eta kosinuak nahasten ditu, eta kosinuak kosinua bider kosinua eta sinua bider sinua biderkatzen ditu, zeinua aldatuta. Haiekin balio zehatzak ateratzen dira: 75°, 105° edo 15° angeluak 30°, 45° eta 60° angelu nabarmenekin idazten dira.',
            'Las razones de una suma no son la suma de las razones. El seno de $\\alpha+\\beta$ mezcla senos y cosenos de los dos ángulos, y el coseno multiplica coseno por coseno y seno por seno, con el signo cambiado. Con ellas salen valores exactos: 75°, 105° o 15° se escriben con los notables 30°, 45° y 60°.',
            'نسب المجموع ليست مجموع النسب. جيب $\\alpha+\\beta$ يمزج جيبي الزاويتين وجيبي تمامهما، وجيب التمام يضرب جيب التمام في جيب التمام والجيب في الجيب مع تغيير الإشارة. وبها نحصل على قيم دقيقة: 75° و105° و15° تُكتب بالزوايا الشهيرة 30° و45° و60°.',
            'The ratios of a sum are not the sum of the ratios. The sine of $\\alpha+\\beta$ mixes the sines and cosines of both angles, and the cosine multiplies cosine by cosine and sine by sine, with the sign changed. With them you get exact values: 75°, 105° or 15° are written with the notable angles 30°, 45° and 60°.'
        ),
        examplePrompt: say('Kalkulatu $\\cos 105°$ kalkulagailurik gabe.', 'Calcula $\\cos 105°$ sin calculadora.', 'احسب $\\cos 105°$ دون آلة حاسبة.', 'Work out $\\cos 105°$ without a calculator.'),
        example: same('$\\begin{gathered}\\cos 105°=\\cos 60°\\cos 45°-\\sin 60°\\sin 45°\\\\ =\\frac{\\sqrt{2}}{4}-\\frac{\\sqrt{6}}{4}=\\frac{\\sqrt{2}-\\sqrt{6}}{4}\\end{gathered}$')
    },
    'difference-tangent': {
        vocabulary: [
            say('kenketa', 'resta', 'الفرق', 'difference'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Kenketarako nahikoa da β ordez $-\\beta$ jartzea: kosinuak ez du zeinua aldatzen, eta sinuak bai. Horregatik, kenketan sinuak − darama eta kosinuak +. Tangentea sinua zati kosinua eginez eta dena $\\cos\\alpha\\cos\\beta$ adierazpenaz zatituz ateratzen da: izendatzailean, zeinua goikoaren kontrakoa da.',
            'Para restar basta cambiar β por $-\\beta$: el coseno no cambia de signo y el seno sí. Por eso en la resta el seno lleva − y el coseno, +. La tangente sale de dividir el seno entre el coseno y todo entre $\\cos\\alpha\\cos\\beta$: en el denominador, el signo es el contrario al de arriba.',
            'للطرح يكفي وضع $-\\beta$ مكان β: جيب التمام لا يغيّر إشارته والجيب يغيّرها. لذلك يحمل الجيب في الفرق − ويحمل جيب التمام +. ويخرج الظل بقسمة الجيب على جيب التمام ثم قسمة الكل على $\\cos\\alpha\\cos\\beta$: وفي المقام تكون الإشارة عكس إشارة البسط.',
            'To subtract, it is enough to put $-\\beta$ in place of β: the cosine does not change sign and the sine does. That is why in the difference the sine carries − and the cosine +. The tangent comes from dividing the sine by the cosine and everything by $\\cos\\alpha\\cos\\beta$: in the denominator, the sign is the opposite of the one on top.'
        ),
        examplePrompt: say('Kalkulatu $\\tan 75°$ kalkulagailurik gabe.', 'Calcula $\\tan 75°$ sin calculadora.', 'احسب $\\tan 75°$ دون آلة حاسبة.', 'Work out $\\tan 75°$ without a calculator.'),
        example: same('$\\tan(45°+30°)=\\frac{1+\\frac{\\sqrt{3}}{3}}{1-\\frac{\\sqrt{3}}{3}}=2+\\sqrt{3}$')
    },
    'known-ratios': {
        vocabulary: [
            say('zorrotza', 'agudo', 'الحادة', 'acute'),
            say('osatu', 'completar', 'أكمل', 'complete')
        ],
        explanation: say(
            'Formulek bi angeluen sinua eta kosinua eskatzen dituzte. Bakoitzaren arrazoi bakarra ezagutzen baduzu, osatu bestea $\\sin^2+\\cos^2=1$ erlazioarekin, eta aukeratu zeinua koadrantearen arabera. Angelu zorrotzetan, dena positiboa da. Trikimailu bat: 3, 4 eta 5 aldeak dituen triangeluak eta 5, 12 eta 13 aldeak dituenak arrazoi errazak ematen dituzte.',
            'Las fórmulas piden el seno y el coseno de los dos ángulos. Si solo conoces una razón de cada uno, completa la otra con $\\sin^2+\\cos^2=1$ y elige el signo según el cuadrante. En ángulos agudos, todo es positivo. Un truco: los triángulos de lados 3, 4 y 5 y de lados 5, 12 y 13 dan razones sencillas.',
            'تطلب الصيغ جيب الزاويتين وجيبي تمامهما. فإذا عرفت نسبة واحدة لكل منهما فأكمل الأخرى بـ $\\sin^2+\\cos^2=1$ واختر الإشارة حسب الربع. وفي الزوايا الحادة كل شيء موجب. وحيلة مفيدة: المثلث الذي أضلاعه 3 و4 و5 والذي أضلاعه 5 و12 و13 يعطيان نسبًا بسيطة.',
            'The formulas ask for the sine and cosine of both angles. If you only know one ratio of each, complete the other with $\\sin^2+\\cos^2=1$ and choose the sign from the quadrant. For acute angles, everything is positive. A trick: the triangles with sides 3, 4 and 5 and with sides 5, 12 and 13 give simple ratios.'
        ),
        examplePrompt: say('α eta β zorrotzak dira, $\\cos\\alpha=\\frac{4}{5}$ eta $\\sin\\beta=\\frac{8}{17}$. Kalkulatu $\\cos(\\alpha-\\beta)$.', 'α y β son agudos, $\\cos\\alpha=\\frac{4}{5}$ y $\\sin\\beta=\\frac{8}{17}$. Halla $\\cos(\\alpha-\\beta)$.', 'α وβ حادتان، و$\\cos\\alpha=\\frac{4}{5}$ و$\\sin\\beta=\\frac{8}{17}$. أوجد $\\cos(\\alpha-\\beta)$.', 'α and β are acute, $\\cos\\alpha=\\frac{4}{5}$ and $\\sin\\beta=\\frac{8}{17}$. Find $\\cos(\\alpha-\\beta)$.'),
        example: same('$\\begin{gathered}\\sin\\alpha=\\frac{3}{5}\\qquad\\cos\\beta=\\frac{15}{17}\\\\ \\cos(\\alpha-\\beta)=\\frac{60+24}{85}=\\frac{84}{85}\\end{gathered}$')
    },

    /* ---------- 3. Double and half angle ---------- */
    'double-angle': {
        vocabulary: [
            say('bikoitza', 'doble', 'الضعف', 'double'),
            say('karratua', 'cuadrado', 'المربع', 'square')
        ],
        explanation: say(
            'Angelu bikoitza bi angelu berdinen batura da. $2\\alpha$ angeluaren sinua bi bider sinua bider kosinua da. Kosinuak hiru forma ditu: $1-2\\sin^2\\alpha$ formak sinuaren karratua bakarrik eskatzen du, eta $2\\cos^2\\alpha-1$ formak, kosinuaren karratua. Bat ere ez da α angeluaren arrazoiaren bikoitza.',
            'El ángulo doble es la suma de dos ángulos iguales. El seno de $2\\alpha$ es dos veces el seno por el coseno. El coseno tiene tres formas: $1-2\\sin^2\\alpha$ solo pide el seno al cuadrado, y $2\\cos^2\\alpha-1$, el coseno al cuadrado. Ninguna es el doble de la razón de α.',
            'ضعف الزاوية هو مجموع زاويتين متساويتين. جيب $2\\alpha$ هو مرتين الجيب في جيب التمام. ولجيب التمام ثلاث صيغ: $1-2\\sin^2\\alpha$ تحتاج إلى مربع الجيب فقط، و$2\\cos^2\\alpha-1$ إلى مربع جيب التمام. ولا واحدة منها ضعف نسبة α.',
            'The double angle is the sum of two equal angles. The sine of $2\\alpha$ is twice the sine times the cosine. The cosine has three forms: $1-2\\sin^2\\alpha$ only needs the square of the sine, and $2\\cos^2\\alpha-1$ the square of the cosine. None of them is double the ratio of α.'
        ),
        examplePrompt: say('$\\cos\\alpha=\\frac{12}{13}$ da, eta α zorrotza da. Kalkulatu $\\cos 2\\alpha$.', '$\\cos\\alpha=\\frac{12}{13}$ y α es agudo. Halla $\\cos 2\\alpha$.', '$\\cos\\alpha=\\frac{12}{13}$ وα حادة. أوجد $\\cos 2\\alpha$.', '$\\cos\\alpha=\\frac{12}{13}$ and α is acute. Find $\\cos 2\\alpha$.'),
        example: same('$\\cos 2\\alpha=2\\cdot\\frac{144}{169}-1=\\frac{119}{169}$'),
        why: {
            text: say(
                'Zergatik funtzionatzen du? Jarri $\\beta=\\alpha$ batuketaren formuletan: $\\sin(\\alpha+\\alpha)$ adierazpenak bi biderkadura berdin ematen ditu, eta $\\cos(\\alpha+\\alpha)$ adierazpenak, $\\cos^2\\alpha-\\sin^2\\alpha$. $\\cos^2\\alpha$ ordez $1-\\sin^2\\alpha$ jarriz, beste formak ateratzen dira.',
                '¿Por qué funciona? Pon $\\beta=\\alpha$ en las fórmulas de la suma: $\\sin(\\alpha+\\alpha)$ da dos productos iguales y $\\cos(\\alpha+\\alpha)$ da $\\cos^2\\alpha-\\sin^2\\alpha$. Cambiando $\\cos^2\\alpha$ por $1-\\sin^2\\alpha$ salen las otras formas.',
                'لماذا تصح؟ ضع $\\beta=\\alpha$ في صيغ المجموع: $\\sin(\\alpha+\\alpha)$ يعطي جداءين متساويين، و$\\cos(\\alpha+\\alpha)$ يعطي $\\cos^2\\alpha-\\sin^2\\alpha$. وبوضع مكان $\\cos^2\\alpha$ العبارة $1-\\sin^2\\alpha$ تخرج الصيغ الأخرى.',
                'Why does it work? Put $\\beta=\\alpha$ in the sum formulas: $\\sin(\\alpha+\\alpha)$ gives two equal products and $\\cos(\\alpha+\\alpha)$ gives $\\cos^2\\alpha-\\sin^2\\alpha$. Replacing $\\cos^2\\alpha$ with $1-\\sin^2\\alpha$ gives the other forms.'
            ),
            math: same('$\\sin 2\\alpha=\\sin\\alpha\\cos\\alpha+\\cos\\alpha\\sin\\alpha$')
        }
    },
    'half-angle': {
        vocabulary: [
            say('erdia', 'mitad', 'النصف', 'half'),
            say('erroa', 'raíz', 'الجذر', 'root')
        ],
        explanation: say(
            'Angelu erdiaren formulak erro karratu batetik ateratzen dira, eta erroak ez du zeinua esaten. Zeinua $\\frac{\\alpha}{2}$ angeluaren koadranteak ematen du, ez α angeluarenak: α 90°-tik 180°-ra badago, haren erdia 45°-tik 90°-ra dago, lehen koadrantean. Erroaren barruan, sinuak − darama eta kosinuak +.',
            'Las fórmulas del ángulo mitad salen de una raíz cuadrada, y la raíz no dice el signo. El signo lo da el cuadrante de $\\frac{\\alpha}{2}$, no el de α: si α está entre 90° y 180°, su mitad está entre 45° y 90°, en el primer cuadrante. Dentro de la raíz, el seno lleva − y el coseno, +.',
            'تخرج صيغ نصف الزاوية من جذر تربيعي، والجذر لا يحدد الإشارة. فالإشارة يعطيها ربع $\\frac{\\alpha}{2}$ لا ربع α: إذا كانت α بين 90° و180° فنصفها بين 45° و90°، في الربع الأول. وداخل الجذر يحمل الجيب − ويحمل جيب التمام +.',
            'The half-angle formulas come from a square root, and the root does not tell the sign. The sign comes from the quadrant of $\\frac{\\alpha}{2}$, not that of α: if α is between 90° and 180°, its half is between 45° and 90°, in the first quadrant. Inside the root, the sine carries − and the cosine +.'
        ),
        examplePrompt: say('Kalkulatu $\\cos 15°$ angelu erdiaren formularekin.', 'Calcula $\\cos 15°$ con la fórmula del ángulo mitad.', 'احسب $\\cos 15°$ بصيغة نصف الزاوية.', 'Work out $\\cos 15°$ with the half-angle formula.'),
        example: same('$\\cos 15°=\\sqrt{\\frac{1+\\cos 30°}{2}}\\approx 0{,}966$'),
        why: {
            text: say(
                'Zergatik funtzionatzen du? Idatzi angelu bikoitzaren kosinua α ordez $\\frac{\\alpha}{2}$ jarrita: $\\cos\\alpha=1-2\\sin^2\\frac{\\alpha}{2}$. Askatuz, sinuaren karratua ateratzen da, eta erroak sinua ematen du. $2\\cos^2\\frac{\\alpha}{2}-1$ formarekin, kosinua ateratzen da.',
                '¿Por qué funciona? Escribe el coseno del ángulo doble con $\\frac{\\alpha}{2}$ en lugar de α: $\\cos\\alpha=1-2\\sin^2\\frac{\\alpha}{2}$. Al despejar sale el seno al cuadrado, y la raíz da el seno. Con $2\\cos^2\\frac{\\alpha}{2}-1$ sale el coseno.',
                'لماذا تصح؟ اكتب جيب تمام ضعف الزاوية مع $\\frac{\\alpha}{2}$ مكان α: $\\cos\\alpha=1-2\\sin^2\\frac{\\alpha}{2}$. وبالعزل يخرج مربع الجيب، والجذر يعطي الجيب. ومع $2\\cos^2\\frac{\\alpha}{2}-1$ يخرج جيب التمام.',
                'Why does it work? Write the cosine of the double angle with $\\frac{\\alpha}{2}$ in place of α: $\\cos\\alpha=1-2\\sin^2\\frac{\\alpha}{2}$. Solving gives the square of the sine, and the root gives the sine. With $2\\cos^2\\frac{\\alpha}{2}-1$ you get the cosine.'
            ),
            math: same('$\\sin^2\\frac{\\alpha}{2}=\\frac{1-\\cos\\alpha}{2}$')
        }
    },
    'sum-to-product': {
        definitions: [
            { term: say('Batura-erdia', 'Semisuma', 'نصف المجموع', 'Half-sum'), meaning: say('Bi angeluren baturaren erdia: $\\frac{A+B}{2}$.', 'La mitad de la suma de dos ángulos: $\\frac{A+B}{2}$.', 'نصف مجموع زاويتين: $\\frac{A+B}{2}$.', 'Half the sum of two angles: $\\frac{A+B}{2}$.') },
            { term: say('Kendura-erdia', 'Semidiferencia', 'نصف الفرق', 'Half-difference'), meaning: say('Haien kenduraren erdia: $\\frac{A-B}{2}$.', 'La mitad de su resta: $\\frac{A-B}{2}$.', 'نصف فرقهما: $\\frac{A-B}{2}$.', 'Half their difference: $\\frac{A-B}{2}$.') }
        ],
        vocabulary: [
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('faktorizatu', 'factorizar', 'التحليل', 'factorise')
        ],
        explanation: say(
            'Batzen edo kentzen diren bi sinu edo bi kosinu biderkadura gisa idatz daitezke. Angeluen batura-erdia eta kendura-erdia erabiltzen dira. Kalkulagailurik gabe kalkulatzeko balio du, eta ekuazioak faktorizatzeko: biderkadura bat 0 da bere faktoreetako bat 0 denean.',
            'Dos senos o dos cosenos que se suman o se restan se pueden escribir como un producto. Se usan la semisuma y la semidiferencia de los ángulos. Sirve para calcular sin calculadora y para factorizar ecuaciones: un producto vale 0 cuando vale 0 uno de sus factores.',
            'يمكن كتابة جيبين أو جيبي تمام يُجمعان أو يُطرحان على شكل جداء. ونستعمل نصف مجموع الزاويتين ونصف فرقهما. ويفيد ذلك في الحساب دون آلة حاسبة وفي تحليل المعادلات: الجداء يساوي 0 عندما يساوي 0 أحد عوامله.',
            'Two sines or two cosines that are added or subtracted can be written as a product. You use the half-sum and the half-difference of the angles. It helps to calculate without a calculator and to factorise equations: a product is 0 when one of its factors is 0.'
        ),
        cases: [
            { title: say('Sinuen batura', 'Suma de senos', 'مجموع جيبين', 'Sum of sines'), text: say('Batura-erdiaren sinua bider kendura-erdiaren kosinua.', 'Seno de la semisuma por coseno de la semidiferencia.', 'جيب نصف المجموع في جيب تمام نصف الفرق.', 'Sine of the half-sum times cosine of the half-difference.'), math: same('$\\sin A+\\sin B=2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}$') },
            { title: say('Sinuen kendura', 'Resta de senos', 'فرق جيبين', 'Difference of sines'), text: say('Batura-erdiaren kosinua bider kendura-erdiaren sinua.', 'Coseno de la semisuma por seno de la semidiferencia.', 'جيب تمام نصف المجموع في جيب نصف الفرق.', 'Cosine of the half-sum times sine of the half-difference.'), math: same('$\\sin A-\\sin B=2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}$') },
            { title: say('Kosinuen batura', 'Suma de cosenos', 'مجموع جيبي تمام', 'Sum of cosines'), text: say('Kosinua bider kosinua.', 'Coseno por coseno.', 'جيب تمام في جيب تمام.', 'Cosine times cosine.'), math: same('$\\cos A+\\cos B=2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}$') },
            { title: say('Kosinuen kendura', 'Resta de cosenos', 'فرق جيبي تمام', 'Difference of cosines'), text: say('Sinua bider sinua, aurrean − dela.', 'Seno por seno, con un − delante.', 'جيب في جيب، وأمامهما −.', 'Sine times sine, with a − in front.'), math: same('$\\cos A-\\cos B=-2\\sin\\frac{A+B}{2}\\sin\\frac{A-B}{2}$') }
        ],
        examplePrompt: say('Kalkulatu $\\cos 105°+\\cos 15°$ kalkulagailurik gabe.', 'Calcula $\\cos 105°+\\cos 15°$ sin calculadora.', 'احسب $\\cos 105°+\\cos 15°$ دون آلة حاسبة.', 'Work out $\\cos 105°+\\cos 15°$ without a calculator.'),
        example: same('$2\\cos 60°\\cos 45°=2\\cdot\\frac{1}{2}\\cdot\\frac{\\sqrt{2}}{2}=\\frac{\\sqrt{2}}{2}$')
    },

    /* ---------- 4. Equations ---------- */
    'basic-equations': {
        definitions: [
            { term: say('Soluzio orokorra', 'Solución general', 'الحل العام', 'General solution'), meaning: say('Soluzio guztiak batera: bira batekoak gehi $k\\cdot 360°$, $k$ zenbaki osoa izanik.', 'Todas las soluciones a la vez: las de una vuelta más $k\\cdot 360°$, con $k$ entero.', 'كل الحلول معًا: حلول دورة واحدة زائد $k\\cdot 360°$، حيث $k$ عدد صحيح.', 'All the solutions at once: those of one turn plus $k\\cdot 360°$, with $k$ a whole number.') }
        ],
        vocabulary: [
            say('bira', 'vuelta', 'الدورة', 'turn'),
            say('koadrantea', 'cuadrante', 'الربع', 'quadrant')
        ],
        explanation: say(
            'Ekuazio trigonometriko batek infinitu soluzio ditu, arrazoiak bira bakoitzean errepikatzen baitira. Lehenik, askatu arrazoia eta aurkitu angelu bat kalkulagailuarekin edo angelu nabarmenekin. Gero, bilatu biran arrazoi bera duen beste angelua, eta gehitu $k\\cdot 360°$ bakoitzari. Tangentea 180° bakoitzean errepikatzen da.',
            'Una ecuación trigonométrica tiene infinitas soluciones, porque las razones se repiten en cada vuelta. Primero despeja la razón y halla un ángulo con la calculadora o con los notables. Después busca el otro ángulo de la vuelta con la misma razón y suma $k\\cdot 360°$ a cada uno. La tangente se repite cada 180°.',
            'للمعادلة المثلثية عدد لا نهائي من الحلول، لأن النسب تتكرر في كل دورة. اعزل النسبة أولًا وأوجد زاوية بالآلة الحاسبة أو بالزوايا الشهيرة. ثم ابحث عن الزاوية الأخرى في الدورة التي لها النسبة نفسها، وأضف $k\\cdot 360°$ إلى كل منهما. ويتكرر الظل كل 180°.',
            'A trigonometric equation has infinitely many solutions, because the ratios repeat in every turn. First solve for the ratio and find one angle with the calculator or the notable angles. Then look for the other angle in the turn with the same ratio and add $k\\cdot 360°$ to each one. The tangent repeats every 180°.'
        ),
        cases: [
            { title: say('Sinua', 'Seno', 'الجيب', 'Sine'), text: say('$\\alpha$ eta $180°-\\alpha$.', '$\\alpha$ y $180°-\\alpha$.', '$\\alpha$ و$180°-\\alpha$.', '$\\alpha$ and $180°-\\alpha$.'), math: same('$\\sin x=\\frac{\\sqrt{3}}{2}\\ \\to\\ x=60°,\\ 120°$') },
            { title: say('Kosinua', 'Coseno', 'جيب التمام', 'Cosine'), text: say('$\\alpha$ eta $360°-\\alpha$.', '$\\alpha$ y $360°-\\alpha$.', '$\\alpha$ و$360°-\\alpha$.', '$\\alpha$ and $360°-\\alpha$.'), math: same('$\\cos x=\\frac{\\sqrt{2}}{2}\\ \\to\\ x=45°,\\ 315°$') },
            { title: say('Tangentea', 'Tangente', 'الظل', 'Tangent'), text: say('$\\alpha$ eta $\\alpha+180°$: bira erdi bakoitzean errepikatzen da.', '$\\alpha$ y $\\alpha+180°$: se repite cada media vuelta.', '$\\alpha$ و$\\alpha+180°$: يتكرر كل نصف دورة.', '$\\alpha$ and $\\alpha+180°$: it repeats every half turn.'), math: same('$\\tan x=-1\\ \\to\\ x=135°,\\ 315°$') }
        ],
        examplePrompt: say('Ebatzi $\\sqrt{2}\\sin x=1$, 0°-tik 360°-ra.', 'Resuelve $\\sqrt{2}\\sin x=1$ entre 0° y 360°.', 'حُلّ $\\sqrt{2}\\sin x=1$ بين 0° و360°.', 'Solve $\\sqrt{2}\\sin x=1$ between 0° and 360°.'),
        example: same('$\\sin x=\\frac{\\sqrt{2}}{2}\\ \\to\\ x=45°,\\ 135°$')
    },
    'quadratic-equations': {
        vocabulary: [
            say('aldaketa', 'cambio', 'التغيير', 'change'),
            say('baztertu', 'descartar', 'تُستبعد', 'discard')
        ],
        explanation: say(
            'Ekuazioan arrazoi bakarra badago, deitu $t$ arrazoi horri eta ebatzi bigarren mailako ekuazio bat. $t$ balio bakoitzak oinarrizko ekuazio bat ematen du. $[-1,1]$ tartetik kanpoko balioa baztertu egiten da: ez dago 2 balio duen sinurik. Sinua eta kosinua badaude, eraman dena bakarrera $\\sin^2x+\\cos^2x=1$ erlazioarekin.',
            'Si en la ecuación solo aparece una razón, llama $t$ a esa razón y resuelve una ecuación de segundo grado. Cada valor de $t$ da una ecuación elemental. Un valor fuera de $[-1,1]$ se descarta: ningún seno vale 2. Si aparecen seno y coseno, pásalo todo a uno con $\\sin^2x+\\cos^2x=1$.',
            'إذا ظهرت في المعادلة نسبة واحدة فقط فسمّها $t$ وحُلّ معادلة من الدرجة الثانية. وكل قيمة لـ $t$ تعطي معادلة أساسية. والقيمة خارج $[-1,1]$ تُستبعد: لا يوجد جيب يساوي 2. وإذا ظهر الجيب وجيب التمام فحوّل كل شيء إلى نسبة واحدة بـ $\\sin^2x+\\cos^2x=1$.',
            'If only one ratio appears in the equation, call that ratio $t$ and solve a quadratic equation. Each value of $t$ gives a basic equation. A value outside $[-1,1]$ is discarded: no sine equals 2. If sine and cosine both appear, turn everything into one with $\\sin^2x+\\cos^2x=1$.'
        ),
        examplePrompt: say('Ebatzi $2\\cos^2x=3\\sin x+3$, 0°-tik 360°-ra.', 'Resuelve $2\\cos^2x=3\\sin x+3$ entre 0° y 360°.', 'حُلّ $2\\cos^2x=3\\sin x+3$ بين 0° و360°.', 'Solve $2\\cos^2x=3\\sin x+3$ between 0° and 360°.'),
        example: same('$\\begin{gathered}2t^2+3t+1=0\\\\ t=-\\frac{1}{2}\\ \\to\\ x=210°,\\ 330°\\\\ t=-1\\ \\to\\ x=270°\\end{gathered}$')
    },
    'formula-equations': {
        vocabulary: [
            say('faktorea', 'factor', 'العامل', 'factor'),
            say('zatitu', 'dividir', 'تقسم', 'divide')
        ],
        explanation: say(
            'Ekuazioan angelu desberdinak badaude, $2x$ eta $x$ adibidez, erabili formulak dena $x$ angeluarekin uzteko. Gero, eraman dena alde batera eta atera faktore komuna: 0 berdin den faktore bakoitza oinarrizko ekuazio bat da. Azkenean, bildu faktore guztien soluzioak eta ordenatu.',
            'Si en la ecuación hay ángulos distintos, como $2x$ y $x$, usa las fórmulas para dejarlo todo con $x$. Después pasa todo a un lado y saca factor común: cada factor igual a 0 es una ecuación elemental. Al final, junta las soluciones de todos los factores y ordénalas.',
            'إذا كانت في المعادلة زوايا مختلفة مثل $2x$ و$x$ فاستعمل الصيغ ليبقى كل شيء بـ $x$. ثم انقل كل شيء إلى طرف واحد وأخرج عاملًا مشتركًا: كل عامل يساوي 0 معادلة أساسية. وفي النهاية اجمع حلول كل العوامل ورتّبها.',
            'If the equation has different angles, such as $2x$ and $x$, use the formulas to leave everything with $x$. Then move everything to one side and take out a common factor: each factor equal to 0 is a basic equation. At the end, gather the solutions of all the factors and put them in order.'
        ),
        examplePrompt: say('Ebatzi $\\cos 2x+\\cos x=0$, 0°-tik 360°-ra.', 'Resuelve $\\cos 2x+\\cos x=0$ entre 0° y 360°.', 'حُلّ $\\cos 2x+\\cos x=0$ بين 0° و360°.', 'Solve $\\cos 2x+\\cos x=0$ between 0° and 360°.'),
        example: same('$\\begin{gathered}2\\cos^2x+\\cos x-1=0\\\\ \\cos x=\\frac{1}{2}\\ \\to\\ x=60°,\\ 300°\\\\ \\cos x=-1\\ \\to\\ x=180°\\end{gathered}$'),
        why: {
            text: say(
                'Zergatik ez zatitu? $\\cos x$ adierazpenaz zatitzea $\\cos x\\neq 0$ denean bakarrik da zilegi, eta, hain zuzen, $\\cos x=0$ duten angeluak soluzio izan daitezke. Faktore komuna ateratzean, biderkadura 0 da faktoreetako edozein 0 denean, eta ez da soluziorik galtzen.',
                '¿Por qué no se divide? Dividir entre $\\cos x$ solo vale si $\\cos x\\neq 0$, y justo los ángulos con $\\cos x=0$ pueden ser soluciones. Al sacar factor común, el producto vale 0 si vale 0 cualquiera de los factores, y no se pierde ninguna.',
                'لماذا لا نقسم؟ القسمة على $\\cos x$ لا تصح إلا إذا كان $\\cos x\\neq 0$، والزوايا التي فيها $\\cos x=0$ قد تكون حلولًا بالضبط. وعند إخراج العامل المشترك يساوي الجداء 0 إذا ساوى 0 أي عامل، فلا يضيع أي حل.',
                'Why not divide? Dividing by $\\cos x$ only works if $\\cos x\\neq 0$, and the angles with $\\cos x=0$ may be exactly the solutions. When you take out a common factor, the product is 0 if any factor is 0, and no solution is lost.'
            ),
            math: same('$\\cos 90°\\,(2\\sin 90°-1)=0$')
        }
    },

    /* ---------- 5. Functions ---------- */
    'trig-graphs': {
        definitions: [
            { term: say('Funtzio periodikoa', 'Función periódica', 'الدالة الدورية', 'Periodic function'), meaning: say('Bere balioak tarte jakin batean errepikatzen dituena; tarte hori periodoa da: $f(x+T)=f(x)$.', 'La que repite sus valores cada cierto intervalo, el periodo: $f(x+T)=f(x)$.', 'دالة تتكرر قيمها كل مجال معيّن هو الدور: $f(x+T)=f(x)$.', 'One that repeats its values every fixed interval, the period: $f(x+T)=f(x)$.') },
            { term: say('Ibiltartea', 'Recorrido', 'المدى', 'Range'), meaning: say('Funtzioak hartzen dituen balioak; sinuarentzat eta kosinuarentzat, $[-1,1]$.', 'Los valores que toma la función; para el seno y el coseno, $[-1,1]$.', 'القيم التي تأخذها الدالة؛ وللجيب وجيب التمام $[-1,1]$.', 'The values the function takes; for sine and cosine, $[-1,1]$.') }
        ],
        vocabulary: [
            say('periodoa', 'periodo', 'الدور', 'period'),
            say('asintota', 'asíntota', 'المقارب', 'asymptote')
        ],
        explanation: say(
            'Grafikoetan angelua radianetan doa. Sinua eta kosinua uhin bera dira: kosinua $\\frac{\\pi}{2}$ aurreratutako sinua da. Biak $2\\pi$ bakoitzean errepikatzen dira, eta $-1$ eta $1$ artean ibiltzen dira. Tangentea π bakoitzean errepikatzen da, balio guztiak hartzen ditu, eta asintota bertikalak ditu kosinua 0 den lekuetan.',
            'En las gráficas el ángulo va en radianes. El seno y el coseno son la misma onda: el coseno es el seno adelantado $\\frac{\\pi}{2}$. Los dos se repiten cada $2\\pi$ y van de $-1$ a $1$. La tangente se repite cada π, toma todos los valores y tiene asíntotas verticales donde el coseno vale 0.',
            'في التمثيلات البيانية تكون الزاوية بالراديان. الجيب وجيب التمام موجة واحدة: جيب التمام هو الجيب مقدَّمًا بـ $\\frac{\\pi}{2}$. ويتكرر كلاهما كل $2\\pi$ ويتراوحان بين $-1$ و$1$. ويتكرر الظل كل π ويأخذ كل القيم، وله مستقيمات مقاربة رأسية حيث يساوي جيب التمام 0.',
            'In the graphs the angle is in radians. Sine and cosine are the same wave: the cosine is the sine moved ahead by $\\frac{\\pi}{2}$. Both repeat every $2\\pi$ and go from $-1$ to $1$. The tangent repeats every π, takes every value and has vertical asymptotes where the cosine is 0.'
        ),
        examplePrompt: say('Zenbat aldiz ebakitzen du $y=\\cos x$ grafikoak $y=-\\frac{1}{2}$ zuzena, 0 eta $6\\pi$ artean?', '¿Cuántas veces corta la gráfica de $y=\\cos x$ a la recta $y=-\\frac{1}{2}$ entre 0 y $6\\pi$?', 'كم مرة يقطع تمثيل $y=\\cos x$ المستقيم $y=-\\frac{1}{2}$ بين 0 و$6\\pi$؟', 'How many times does the graph of $y=\\cos x$ cross the line $y=-\\frac{1}{2}$ between 0 and $6\\pi$?'),
        example: same('$\\begin{gathered}x=\\frac{2\\pi}{3}\\qquad x=\\frac{4\\pi}{3}\\\\ 3\\cdot 2=6\\end{gathered}$'),
        exampleAnswer: say('6 aldiz: bi ebakidura periodo bakoitzean, eta hiru periodo daude.', '6 veces: dos cortes en cada periodo, y hay tres periodos.', '6 مرات: تقاطعان في كل دور، وهناك ثلاثة أدوار.', '6 times: two crossings in each period, and there are three periods.')
    },
    transformations: {
        definitions: [
            { term: say('Anplitudea', 'Amplitud', 'السعة', 'Amplitude'), meaning: say('Maximoaren eta minimoaren arteko distantziaren erdia: $|A|$.', 'La mitad de la distancia entre el máximo y el mínimo: $|A|$.', 'نصف المسافة بين القيمة العظمى والصغرى: $|A|$.', 'Half the distance between the maximum and the minimum: $|A|$.') },
            { term: say('Desfasea', 'Desfase', 'انزياح الطور', 'Phase shift'), meaning: say('Uhina horizontalean zenbat lekualdatzen den.', 'Lo que se desplaza la onda en horizontal.', 'مقدار انسحاب الموجة أفقيًا.', 'How far the wave moves sideways.') }
        ],
        vocabulary: [
            say('uhina', 'onda', 'الموجة', 'wave'),
            say('ardatza', 'eje', 'المحور', 'axis')
        ],
        explanation: say(
            '$y=A\\sin(Bx+C)+D$ funtzioaren zenbaki bakoitzak gauza bat aldatzen du. A zenbakiak uhina bertikalean luzatzen du; B zenbakiak horizontalean estutzen du eta periodoa aldatzen du; C zenbakiak alde batera lekualdatzen du; D zenbakiak igo edo jaitsi egiten du. Desfasea ez da C: barrukoa 0 egiten duen $x$ balioa da, $-\\frac{C}{B}$.',
            'Cada número de $y=A\\sin(Bx+C)+D$ cambia una cosa. A estira la onda en vertical; B la comprime en horizontal y cambia el periodo; C la desplaza hacia un lado; D la sube o la baja. El desfase no es C: es el valor de $x$ que hace 0 lo de dentro, $-\\frac{C}{B}$.',
            'كل عدد في $y=A\\sin(Bx+C)+D$ يغيّر شيئًا واحدًا. A يمد الموجة رأسيًا، وB يضغطها أفقيًا ويغيّر الدور، وC يزيحها إلى جانب، وD يرفعها أو يخفضها. وانزياح الطور ليس C: بل هو قيمة $x$ التي تجعل ما في الداخل 0، أي $-\\frac{C}{B}$.',
            'Each number in $y=A\\sin(Bx+C)+D$ changes one thing. A stretches the wave vertically; B squeezes it horizontally and changes the period; C moves it sideways; D moves it up or down. The phase shift is not C: it is the value of $x$ that makes the inside 0, $-\\frac{C}{B}$.'
        ),
        examplePrompt: say('Aurkitu $y=\\cos(4x+\\pi)$ funtzioaren periodoa eta desfasea.', 'Halla el periodo y el desfase de $y=\\cos(4x+\\pi)$.', 'أوجد دور الدالة $y=\\cos(4x+\\pi)$ وانزياح طورها.', 'Find the period and the phase shift of $y=\\cos(4x+\\pi)$.'),
        example: same('$T=\\frac{2\\pi}{4}=\\frac{\\pi}{2}\\qquad 4x+\\pi=0\\ \\to\\ x=-\\frac{\\pi}{4}$'),
        why: {
            text: say(
                'Zergatik da periodoa $\\frac{2\\pi}{B}$? Sinuak uhin oso bat egiten du barrukoak $2\\pi$ aurrera egiten duenean. Barruan $Bx$ badago, nahikoa da $x$ balioak $\\frac{2\\pi}{B}$ aurrera egitea. $B=2$ denean, uhina bi aldiz azkarrago doa, eta periodoa erdia da.',
                '¿Por qué el periodo es $\\frac{2\\pi}{B}$? El seno completa una onda cuando lo de dentro avanza $2\\pi$. Si dentro hay $Bx$, basta que $x$ avance $\\frac{2\\pi}{B}$. Con $B=2$ la onda va el doble de rápido y su periodo es la mitad.',
                'لماذا الدور $\\frac{2\\pi}{B}$؟ يُكمل الجيب موجة كاملة عندما يتقدم ما في الداخل $2\\pi$. فإذا كان في الداخل $Bx$ فيكفي أن يتقدم $x$ بمقدار $\\frac{2\\pi}{B}$. ومع $B=2$ تسير الموجة بضعف السرعة ويصير دورها النصف.',
                'Why is the period $\\frac{2\\pi}{B}$? The sine completes one wave when the inside moves on by $2\\pi$. If the inside is $Bx$, it is enough for $x$ to move on by $\\frac{2\\pi}{B}$. With $B=2$ the wave goes twice as fast and its period is half.'
            ),
            math: same('$B\\cdot\\frac{2\\pi}{B}=2\\pi$')
        }
    },
    'periodic-models': {
        definitions: [
            { term: say('Batez besteko balioa', 'Valor medio', 'القيمة الوسطى', 'Mean value'), meaning: say('Inguruan oszilatzen duen balioa: maximoaren eta minimoaren baturaren erdia.', 'El valor alrededor del cual oscila: la mitad de la suma del máximo y el mínimo.', 'القيمة التي تتذبذب حولها: نصف مجموع القيمة العظمى والصغرى.', 'The value it oscillates around: half the sum of the maximum and the minimum.') }
        ],
        vocabulary: [
            say('maximoa', 'máximo', 'القيمة العظمى', 'maximum'),
            say('minimoa', 'mínimo', 'الصغرى', 'minimum')
        ],
        explanation: say(
            'Gauza asko errepikatzen dira: noria baten kabina, itsasaldia, urteko argi-orduak. $y=D+A\\cos(Bt)$ funtzioarekin deskribatzen dira. D ardatza batez besteko balioa da; A anplitudea, minimotik maximora dagoenaren erdia; eta B, denbora-unitate bakoitzean aurreratzen diren graduak: 360° zati periodoa.',
            'Muchas cosas se repiten: una cabina de noria, la marea, las horas de luz del año. Se describen con $y=D+A\\cos(Bt)$. El eje D es el valor medio; la amplitud A, la mitad de lo que hay del mínimo al máximo; y B, los grados que avanza por unidad de tiempo: 360° entre el periodo.',
            'أشياء كثيرة تتكرر: عربة الدولاب، والمدّ والجزر، وساعات النهار في السنة. وتوصف بـ $y=D+A\\cos(Bt)$. المحور D هو القيمة الوسطى، والسعة A نصف ما بين القيمة الصغرى والعظمى، وB الدرجات التي يتقدمها في كل وحدة زمن: 360° على الدور.',
            'Many things repeat: a Ferris wheel cabin, the tide, the hours of daylight over the year. They are described with $y=D+A\\cos(Bt)$. The axis D is the mean value; the amplitude A, half of what lies between the minimum and the maximum; and B, the degrees it moves on per unit of time: 360° divided by the period.'
        ),
        examplePrompt: say('Portu bateko itsasaldia $h(t)=3+2\\cos(30°\\cdot t)$ da, metrotan eta ordutan. Zer altueratan dago ura 4 h-ren buruan?', 'La marea de un puerto sigue $h(t)=3+2\\cos(30°\\cdot t)$, en metros y horas. ¿A qué altura está el agua a las 4 h?', 'يتبع المدّ في ميناء $h(t)=3+2\\cos(30°\\cdot t)$ بالأمتار والساعات. ما ارتفاع الماء بعد 4 ساعات؟', 'The tide in a harbour follows $h(t)=3+2\\cos(30°\\cdot t)$, in metres and hours. How high is the water after 4 h?'),
        example: same('$h(4)=3+2\\cdot\\cos 120°=3-1=2$')
    }
}

import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    ApothemFigure,
    BoxDiagonalFigure,
    ChordFigure,
    ClassifyFigure,
    FormulaFigure,
    GridFigure,
    HypotenuseFigure,
    IsoscelesHeightFigure,
    LadderFigure,
    LegFigure,
    RectangleRhombusFigure,
    SquaresFigure,
    TangentFigure,
    TrapezoidFigure,
    TriplesFigure
} from './figures'

/* ==========================================================================
   Pitagorasen teorema · 2. DBH — stages and lessons, following Anaya 2.º
   ESO unit 9 and the Pythagoras pages of Santillana 2.º ESO unit 10: the
   squares on the sides, the formula and Pythagorean triples; finding the
   hypotenuse or a leg and classifying triangles; heights and diagonals of
   plane figures; apothems, chords and tangents; and the diagonal of a box,
   distances on a grid and everyday problems (ladders, poles, ziplines).
   ========================================================================== */

export type PythagorasStageId = 'theorem' | 'sides' | 'plane' | 'circle' | 'space'

export const pythagorasStages: UnitStage[] = [
    { id: 'theorem', tone: 'blue', title: { eu: 'Teorema', es: 'El teorema', ar: 'النظرية' } },
    { id: 'sides', tone: 'violet', title: { eu: 'Aldeak kalkulatu eta sailkatu', es: 'Calcular lados y clasificar', ar: 'حساب الأضلاع والتصنيف' } },
    { id: 'plane', tone: 'mustard', title: { eu: 'Irudi lauetan', es: 'En las figuras planas', ar: 'في الأشكال المستوية' } },
    { id: 'circle', tone: 'coral', title: { eu: 'Poligono erregularrak eta zirkunferentzia', es: 'Polígonos regulares y circunferencia', ar: 'المضلعات المنتظمة والدائرة' } },
    { id: 'space', tone: 'green', title: { eu: 'Espazioa eta problemak', es: 'El espacio y los problemas', ar: 'الفضاء والمسائل' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const pythagorasTopics: UnitTopic[] = [
    /* ---------- 1. The theorem ---------- */
    {
        id: 'squares',
        stage: 'theorem',
        title: say('Aldeetako karratuak', 'Los cuadrados sobre los lados', 'المربعات على الأضلاع'),
        goal: say('Triangelu angeluzuzen baten aldeetan eraikitako karratuen azaleren arteko erlazioa ezagutzea.', 'Descubrir la relación entre las áreas de los cuadrados construidos sobre los lados de un triángulo rectángulo.', 'اكتشاف العلاقة بين مساحات المربعات المنشأة على أضلاع مثلث قائم.'),
        explanation: say(
            'Triangelu angeluzuzen batean, angelu zuzena osatzen duten bi aldeak katetoak dira, eta angelu zuzenaren aurrean dagoena hipotenusa, alde handiena. Eraiki karratu bat alde bakoitzaren gainean. 3 eta 4 katetoak eta 5 hipotenusa dituen triangeluan, karratu txikiek 9 eta 16 lauki dituzte, eta handiak 25: $9+16=25$. Hori beti gertatzen da triangelu angeluzuzenetan: hipotenusaren gaineko karratuaren azalera katetoen gaineko karratuen azaleren batura da. Karratu bat falta bada, kalkula daiteke: batu, handia bada; kendu, txiki bat bada.',
            'En un triángulo rectángulo, los dos lados que forman el ángulo recto son los catetos, y el que está frente al ángulo recto es la hipotenusa, el lado mayor. Construye un cuadrado sobre cada lado. En el triángulo de catetos 3 y 4 e hipotenusa 5, los cuadrados pequeños tienen 9 y 16 cuadraditos, y el grande 25: $9+16=25$. Eso pasa siempre en los triángulos rectángulos: el área del cuadrado construido sobre la hipotenusa es igual a la suma de las áreas de los cuadrados construidos sobre los catetos. Si falta un cuadrado, se puede calcular: sumando si es el grande; restando si es uno pequeño.',
            'في المثلث القائم يسمى الضلعان المكوّنان للزاوية القائمة الضلعين القائمين، ويسمى الضلع المقابل للزاوية القائمة الوتر، وهو أكبر الأضلاع. أنشئ مربعًا على كل ضلع. في المثلث الذي ضلعاه القائمان 3 و4 ووتره 5، في المربعين الصغيرين 9 و16 مربعًا صغيرًا، وفي الكبير 25: $9+16=25$. ويحدث هذا دائمًا في المثلثات القائمة: مساحة المربع المنشأ على الوتر تساوي مجموع مساحتي المربعين المنشأين على الضلعين القائمين. وإذا نقص مربع أمكن حسابه: بالجمع إن كان الكبير، وبالطرح إن كان صغيرًا.'
        ),
        problem: say('Triangelu angeluzuzen baten katetoen gaineko karratuek 57 cm² eta 57 cm² dituzte. Zein da hipotenusaren gainekoaren azalera?', 'Los cuadrados sobre los catetos de un triángulo rectángulo miden 57 cm² y 57 cm². ¿Qué área tiene el de la hipotenusa?', 'مساحتا المربعين على الضلعين القائمين في مثلث قائم 57 سم² و57 سم². ما مساحة المربع على الوتر؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusarena handiena da: batu.', 'El de la hipotenusa es el grande: suma.', 'مربع الوتر هو الأكبر: اجمع.'), math: same('$57+57=114$') },
            { text: say('Handiak 14 eta txiki batek 3 balitu? Kendu.', '¿Y si el grande midiera 14 y uno pequeño 3? Resta.', 'وإن كان الكبير 14 وأحد الصغيرين 3؟ اطرح.'), math: same('$14-3=11$') }
        ],
        example: same('$9+16=25\\qquad 36+64=100$'),
        takeaway: say('Hipotenusaren karratua = katetoen karratuen batura.', 'Cuadrado de la hipotenusa = suma de los cuadrados de los catetos.', 'مربع الوتر = مجموع مربعي الضلعين القائمين.'),
        figure: (language) => <SquaresFigure language={language} />
    },
    {
        id: 'formula',
        stage: 'theorem',
        title: say('Teoremaren formula', 'La fórmula del teorema', 'صيغة النظرية'),
        goal: say('Teorema formula gisa idaztea eta hipotenusa eta katetoak edozein izenekin ezagutzea.', 'Escribir el teorema como fórmula y reconocer la hipotenusa y los catetos se llamen como se llamen.', 'كتابة النظرية صيغةً والتعرّف إلى الوتر والضلعين القائمين مهما كانت أسماؤهما.'),
        explanation: say(
            'Hipotenusari $a$ eta katetoei $b$ eta $c$ deitzen badiegu, Pitagorasen teorema hau da: $a^{2}=b^{2}+c^{2}$. Formula horretatik beste bi ateratzen dira, katetoetarako: $b^{2}=a^{2}-c^{2}$ eta $c^{2}=a^{2}-b^{2}$. Letrak aldatu daitezke; garrantzitsua da zein den hipotenusa jakitea: angelu zuzenaren aurrean dagoena eta luzeena. Beraz, hipotenusaren karratua beti bakarrik dago berdintzaren alde batean. Kontuz: teorema triangelu angeluzuzenetan bakarrik betetzen da; aldeberdin batean, adibidez, $5^{2}\\neq 5^{2}+5^{2}$.',
            'Si llamamos $a$ a la hipotenusa y $b$ y $c$ a los catetos, el teorema de Pitágoras dice: $a^{2}=b^{2}+c^{2}$. De esa fórmula salen otras dos para los catetos: $b^{2}=a^{2}-c^{2}$ y $c^{2}=a^{2}-b^{2}$. Las letras pueden cambiar; lo importante es saber cuál es la hipotenusa: la que está frente al ángulo recto y la más larga. Por eso el cuadrado de la hipotenusa siempre queda solo a un lado de la igualdad. Cuidado: el teorema solo se cumple en los triángulos rectángulos; en un equilátero, por ejemplo, $5^{2}\\neq 5^{2}+5^{2}$.',
            'إذا سمّينا الوتر $a$ والضلعين القائمين $b$ و$c$ فإن نظرية فيثاغورس تقول: $a^{2}=b^{2}+c^{2}$. ومن هذه الصيغة تُستخرج صيغتان للضلعين القائمين: $b^{2}=a^{2}-c^{2}$ و$c^{2}=a^{2}-b^{2}$. قد تتغير الحروف؛ والمهم معرفة الوتر: المقابل للزاوية القائمة والأطول. لذلك يبقى مربع الوتر وحده دائمًا في أحد طرفي المساواة. انتبه: النظرية لا تصح إلا في المثلثات القائمة؛ ففي المثلث المتساوي الأضلاع مثلًا $5^{2}\\neq 5^{2}+5^{2}$.'
        ),
        problem: say('$PQR$ triangeluan angelu zuzena $Q$ erpinean dago. Idatzi Pitagorasen teorema.', 'En el triángulo $PQR$ el ángulo recto está en el vértice $Q$. Escribe el teorema de Pitágoras.', 'في المثلث $PQR$ الزاوية القائمة عند الرأس $Q$. اكتب نظرية فيثاغورس.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusa $Q$-ren aurrean dagoen aldea da.', 'La hipotenusa es el lado opuesto a $Q$.', 'الوتر هو الضلع المقابل لـ$Q$.'), math: same('$PR$') },
            { text: say('Haren karratua, bakarrik.', 'Su cuadrado, solo.', 'مربعه وحده.'), math: same('$PR^{2}=PQ^{2}+QR^{2}$') }
        ],
        example: same('$a^{2}=b^{2}+c^{2}\\qquad b^{2}=a^{2}-c^{2}$'),
        takeaway: say('Hipotenusa: batu. Katetoa: kendu. Triangelu angeluzuzenetan bakarrik.', 'Hipotenusa: suma. Cateto: resta. Solo en triángulos rectángulos.', 'الوتر: اجمع. الضلع القائم: اطرح. في المثلثات القائمة فقط.'),
        figure: (language) => <FormulaFigure language={language} />
    },
    {
        id: 'triples',
        stage: 'theorem',
        title: say('Hirukote pitagorikoak', 'Ternas pitagóricas', 'الثلاثيات الفيثاغورية'),
        goal: say('Hiru zenbaki oso hirukote pitagorikoa diren egiaztatzea eta berriak sortzea.', 'Comprobar si tres números enteros forman una terna pitagórica y fabricar otras nuevas.', 'التحقق مما إذا كانت ثلاثة أعداد صحيحة ثلاثية فيثاغورية وصنع ثلاثيات جديدة.'),
        explanation: say(
            'Hirukote pitagorikoa $a^{2}=b^{2}+c^{2}$ betetzen duten hiru zenbaki osok osatzen dute: haiekin triangelu angeluzuzen bat eraikitzen da, eta kalkuluak zehatzak dira. Ezagunenak: 3, 4, 5; 5, 12, 13; 8, 15, 17; 7, 24, 25. Egiaztatzeko, batu bi txikienen karratuak eta konparatu handienaren karratuarekin: $8^{2}+15^{2}=64+225=289=17^{2}$. Hirukote bat zenbaki berarekin biderkatuz gero, beste hirukote bat lortzen da: 3, 4, 5 bider 2 6, 8, 10 da, eta bider 3, 9, 12, 15. Antzinako Egipton 12 korapiloko soka bat erabiltzen zuten 3, 4 eta 5 zatiekin angelu zuzenak markatzeko.',
            'Una terna pitagórica son tres números enteros que cumplen $a^{2}=b^{2}+c^{2}$: con ellos se construye un triángulo rectángulo y las cuentas salen exactas. Las más conocidas: 3, 4, 5; 5, 12, 13; 8, 15, 17; 7, 24, 25. Para comprobarlo, suma los cuadrados de los dos menores y compara con el cuadrado del mayor: $8^{2}+15^{2}=64+225=289=17^{2}$. Si multiplicas una terna por un mismo número, sale otra terna: 3, 4, 5 por 2 es 6, 8, 10, y por 3, 9, 12, 15. En el antiguo Egipto usaban una cuerda de 12 nudos con tramos 3, 4 y 5 para marcar ángulos rectos.',
            'الثلاثية الفيثاغورية ثلاثة أعداد صحيحة تحقق $a^{2}=b^{2}+c^{2}$: بها يُنشأ مثلث قائم وتخرج الحسابات دقيقة. أشهرها: 3، 4، 5؛ 5، 12، 13؛ 8، 15، 17؛ 7، 24، 25. للتحقق اجمع مربعي العددين الأصغرين وقارن بمربع الأكبر: $8^{2}+15^{2}=64+225=289=17^{2}$. وإذا ضربت ثلاثية في عدد واحد نتجت ثلاثية أخرى: 3، 4، 5 مضروبة في 2 تعطي 6، 8، 10، وفي 3 تعطي 9، 12، 15. وفي مصر القديمة استعملوا حبلًا ذا 12 عقدة بأجزاء 3 و4 و5 لرسم الزوايا القائمة.'
        ),
        problem: say('11, 60 eta 61 hirukote pitagorikoa da?', '¿Es 11, 60 y 61 una terna pitagórica?', 'هل 11 و60 و61 ثلاثية فيثاغورية؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi txikienen karratuak batu.', 'Suma los cuadrados de los dos menores.', 'اجمع مربعي الأصغرين.'), math: same('$11^{2}+60^{2}=121+3600=3721$') },
            { text: say('Handienaren karratua.', 'El cuadrado del mayor.', 'مربع الأكبر.'), math: same('$61^{2}=3721$') },
            { text: say('Berdinak dira: bai.', 'Son iguales: sí.', 'متساويان: نعم.') }
        ],
        example: same('$3,4,5\\ \\to\\ 6,8,10\\ \\to\\ 9,12,15$'),
        takeaway: say('Bi txikienen karratuen batura = handienaren karratua. Biderkatuz, hirukote berriak.', 'Suma de cuadrados de los dos menores = cuadrado del mayor. Multiplicando, ternas nuevas.', 'مجموع مربعي الأصغرين = مربع الأكبر. وبالضرب ثلاثيات جديدة.'),
        figure: (language) => <TriplesFigure language={language} />
    },

    /* ---------- 2. Finding sides and classifying ---------- */
    {
        id: 'hypotenuse',
        stage: 'sides',
        title: say('Hipotenusa kalkulatu', 'Calcular la hipotenusa', 'حساب الوتر'),
        goal: say('Bi katetoak ezagututa hipotenusa kalkulatzea, zehatza edo hurbildua.', 'Calcular la hipotenusa conociendo los dos catetos, exacta o aproximada.', 'حساب الوتر بمعرفة الضلعين القائمين، دقيقًا أو تقريبيًا.'),
        explanation: say(
            'Bi katetoak ezagutzen badira, hipotenusa hiru urratsetan kalkulatzen da: katetoak karratura jaso, batu eta emaitzaren erro karratua atera: $a=\\sqrt{b^{2}+c^{2}}$. 6 eta 8 katetoekin, $\\sqrt{36+64}=\\sqrt{100}=10$. Batura karratu perfektua ez denean, erroa hurbildu egiten da kalkulagailuarekin: 3 eta 5 katetoekin, $\\sqrt{34}\\approx 5{,}83$. Akats ohikoa: erroa zatika ateratzea; $\\sqrt{6^{2}+8^{2}}$ ez da $6+8=14$. Egiaztapen azkarra: hipotenusak katetorik handiena baino handiagoa izan behar du, baina bien batura baino txikiagoa.',
            'Si se conocen los dos catetos, la hipotenusa se calcula en tres pasos: eleva los catetos al cuadrado, súmalos y saca la raíz cuadrada del resultado: $a=\\sqrt{b^{2}+c^{2}}$. Con catetos 6 y 8, $\\sqrt{36+64}=\\sqrt{100}=10$. Cuando la suma no es un cuadrado perfecto, la raíz se aproxima con la calculadora: con catetos 3 y 5, $\\sqrt{34}\\approx 5{,}83$. Error típico: sacar la raíz por partes; $\\sqrt{6^{2}+8^{2}}$ no es $6+8=14$. Comprobación rápida: la hipotenusa tiene que ser mayor que el cateto mayor, pero menor que la suma de los dos.',
            'إذا عُرف الضلعان القائمان حُسب الوتر في ثلاث خطوات: ربّع الضلعين، واجمعهما، وخذ الجذر التربيعي للناتج: $a=\\sqrt{b^{2}+c^{2}}$. مع الضلعين 6 و8: $\\sqrt{36+64}=\\sqrt{100}=10$. وإذا لم يكن المجموع مربعًا كاملًا قُرّب الجذر بالآلة الحاسبة: مع الضلعين 3 و5: $\\sqrt{34}\\approx 5{,}83$. خطأ شائع: أخذ الجذر لكل حد على حدة؛ فـ$\\sqrt{6^{2}+8^{2}}$ ليس $6+8=14$. تحقق سريع: يجب أن يكون الوتر أكبر من أكبر الضلعين القائمين وأصغر من مجموعهما.'
        ),
        problem: say('Triangelu angeluzuzen baten katetoak 15 m eta 20 m dira. Kalkulatu hipotenusa.', 'Los catetos de un triángulo rectángulo miden 15 m y 20 m. Calcula la hipotenusa.', 'الضلعان القائمان في مثلث قائم 15 م و20 م. احسب الوتر.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Karratuak.', 'Los cuadrados.', 'المربعات.'), math: same('$15^{2}=225\\qquad 20^{2}=400$') },
            { text: say('Batu.', 'Suma.', 'اجمع.'), math: same('$225+400=625$') },
            { text: say('Erro karratua.', 'Raíz cuadrada.', 'الجذر التربيعي.'), math: same('$\\sqrt{625}=25$') }
        ],
        example: same('$\\sqrt{6^{2}+8^{2}}=10\\qquad\\sqrt{3^{2}+5^{2}}\\approx 5{,}83$'),
        takeaway: say('$a=\\sqrt{b^{2}+c^{2}}$. Erroa amaieran, ez zatika.', '$a=\\sqrt{b^{2}+c^{2}}$. La raíz al final, no por partes.', '$a=\\sqrt{b^{2}+c^{2}}$. الجذر في النهاية، لا لكل حد.'),
        figure: (language) => <HypotenuseFigure language={language} />
    },
    {
        id: 'leg',
        stage: 'sides',
        title: say('Katetoa kalkulatu', 'Calcular un cateto', 'حساب ضلع قائم'),
        goal: say('Hipotenusa eta kateto bat ezagututa beste katetoa kalkulatzea.', 'Calcular un cateto conociendo la hipotenusa y el otro cateto.', 'حساب ضلع قائم بمعرفة الوتر والضلع الآخر.'),
        explanation: say(
            'Hipotenusa eta kateto bat ezagutzen badira, falta den katetoa kenketarekin ateratzen da: $b=\\sqrt{a^{2}-c^{2}}$. Lehenik hipotenusaren karratua, gero katetoaren karratua kendu, eta azkenik erroa. 13 hipotenusa eta 5 katetoa badira, $\\sqrt{169-25}=\\sqrt{144}=12$. Ordena garrantzitsua da: beti handiaren karratuari txikiarena kendu; alderantziz, zenbaki negatibo bat aterako litzateke. Batzea akatsa da: $\\sqrt{13^{2}+5^{2}}\\approx 13{,}9$ hipotenusa baino handiagoa litzateke, eta katetoa beti da hipotenusa baino txikiagoa.',
            'Si se conocen la hipotenusa y un cateto, el cateto que falta sale con una resta: $b=\\sqrt{a^{2}-c^{2}}$. Primero el cuadrado de la hipotenusa, luego réstale el cuadrado del cateto y al final la raíz. Con hipotenusa 13 y cateto 5, $\\sqrt{169-25}=\\sqrt{144}=12$. El orden importa: al cuadrado del grande siempre se le resta el del pequeño; al revés saldría un número negativo. Sumar es un error: $\\sqrt{13^{2}+5^{2}}\\approx 13{,}9$ sería mayor que la hipotenusa, y un cateto siempre es menor que la hipotenusa.',
            'إذا عُرف الوتر وضلع قائم استُخرج الضلع الناقص بالطرح: $b=\\sqrt{a^{2}-c^{2}}$. أولًا مربع الوتر، ثم اطرح منه مربع الضلع القائم، وأخيرًا الجذر. مع الوتر 13 والضلع 5: $\\sqrt{169-25}=\\sqrt{144}=12$. الترتيب مهم: يُطرح دائمًا مربع الصغير من مربع الكبير؛ وبالعكس يخرج عدد سالب. والجمع خطأ: $\\sqrt{13^{2}+5^{2}}\\approx 13{,}9$ سيكون أكبر من الوتر، والضلع القائم أصغر من الوتر دائمًا.'
        ),
        problem: say('Hipotenusa 25 cm da eta kateto bat 15 cm. Kalkulatu beste katetoa.', 'La hipotenusa mide 25 cm y un cateto 15 cm. Calcula el otro cateto.', 'الوتر 25 سم وأحد الضلعين القائمين 15 سم. احسب الضلع الآخر.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusaren karratua ken katetoarena.', 'Cuadrado de la hipotenusa menos el del cateto.', 'مربع الوتر ناقص مربع الضلع.'), math: same('$625-225=400$') },
            { text: say('Erro karratua.', 'Raíz cuadrada.', 'الجذر التربيعي.'), math: same('$\\sqrt{400}=20$') },
            { text: say('Egiaztatu: katetoa < hipotenusa.', 'Comprueba: cateto < hipotenusa.', 'تحقّق: الضلع القائم < الوتر.'), math: same('$20<25$') }
        ],
        example: same('$\\sqrt{13^{2}-5^{2}}=12\\qquad\\sqrt{74^{2}-70^{2}}=24$'),
        takeaway: say('$b=\\sqrt{a^{2}-c^{2}}$: handiaren karratua ken txikiarena.', '$b=\\sqrt{a^{2}-c^{2}}$: el cuadrado del grande menos el del pequeño.', '$b=\\sqrt{a^{2}-c^{2}}$: مربع الكبير ناقص مربع الصغير.'),
        figure: (language) => <LegFigure language={language} />
    },
    {
        id: 'classify',
        stage: 'sides',
        title: say('Triangeluak angeluen arabera sailkatu', 'Clasificar triángulos según sus ángulos', 'تصنيف المثلثات حسب زواياها'),
        goal: say('Hiru aldeak ezagututa triangelua angelu-zorrotza, angeluzuzena ala angelu-kamutsa den erabakitzea.', 'Decidir, conociendo los tres lados, si un triángulo es acutángulo, rectángulo u obtusángulo.', 'تحديد ما إذا كان المثلث حادًّا أو قائمًا أو منفرجًا بمعرفة أضلاعه الثلاثة.'),
        explanation: say(
            'Teoremak alderantziz ere balio du: alde handienaren karratua beste bien karratuen batura bada, triangelua angeluzuzena da. Eta berdina ez bada, angeluen berri ere ematen du. Izan bedi $a$ alde handiena. $a^{2}=b^{2}+c^{2}$ bada, angeluzuzena. $a^{2}<b^{2}+c^{2}$ bada, alde handiena «laburregia» da angelu zuzena egiteko, eta haren aurreko angelua zorrotza da: angelu-zorrotza. $a^{2}>b^{2}+c^{2}$ bada, alde handiena «luzeegia» da eta angelua irekitzen da: angelu-kamutsa. Adibidez, 17, 6 eta 14: $6^{2}+14^{2}=232<289=17^{2}$, angelu-kamutsa.',
            'El teorema también funciona al revés: si el cuadrado del lado mayor es igual a la suma de los cuadrados de los otros dos, el triángulo es rectángulo. Y si no es igual, también informa sobre los ángulos. Sea $a$ el lado mayor. Si $a^{2}=b^{2}+c^{2}$, es rectángulo. Si $a^{2}<b^{2}+c^{2}$, el lado mayor es «demasiado corto» para un ángulo recto y el ángulo opuesto es agudo: acutángulo. Si $a^{2}>b^{2}+c^{2}$, el lado mayor es «demasiado largo» y el ángulo se abre: obtusángulo. Por ejemplo, 17, 6 y 14: $6^{2}+14^{2}=232<289=17^{2}$, obtusángulo.',
            'تصح النظرية بالعكس أيضًا: إذا كان مربع الضلع الأكبر يساوي مجموع مربعي الضلعين الآخرين فالمثلث قائم. وإن لم يساوه فإنها تخبرنا عن الزوايا أيضًا. ليكن $a$ الضلع الأكبر. إذا كان $a^{2}=b^{2}+c^{2}$ فهو قائم. وإذا كان $a^{2}<b^{2}+c^{2}$ فالضلع الأكبر «أقصر من اللازم» لزاوية قائمة والزاوية المقابلة حادة: حاد الزوايا. وإذا كان $a^{2}>b^{2}+c^{2}$ فالضلع الأكبر «أطول من اللازم» فتنفرج الزاوية: منفرج الزاوية. مثلًا 17 و6 و14: $6^{2}+14^{2}=232<289=17^{2}$، منفرج.'
        ),
        problem: say('Sailkatu 28 dm, 45 dm eta 53 dm-ko aldeak dituen triangelua.', 'Clasifica el triángulo de lados 28 dm, 45 dm y 53 dm.', 'صنّف المثلث الذي أضلاعه 28 دسم و45 دسم و53 دسم.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi txikienen karratuak batu.', 'Suma los cuadrados de los dos menores.', 'اجمع مربعي الأصغرين.'), math: same('$784+2025=2809$') },
            { text: say('Handienaren karratua.', 'Cuadrado del mayor.', 'مربع الأكبر.'), math: same('$53^{2}=2809$') },
            { text: say('Berdinak: angeluzuzena.', 'Iguales: rectángulo.', 'متساويان: قائم الزاوية.') }
        ],
        example: same('$a^{2}<b^{2}+c^{2}\\qquad a^{2}=b^{2}+c^{2}\\qquad a^{2}>b^{2}+c^{2}$'),
        takeaway: say('Txikiagoa: zorrotza. Berdina: zuzena. Handiagoa: kamutsa.', 'Menor: acutángulo. Igual: rectángulo. Mayor: obtusángulo.', 'أصغر: حاد. يساوي: قائم. أكبر: منفرج.'),
        figure: (language) => <ClassifyFigure language={language} />
    },

    /* ---------- 3. In plane figures ---------- */
    {
        id: 'triangle-height',
        stage: 'plane',
        title: say('Triangelu isoszele eta aldeberdinen altuera', 'La altura de triángulos isósceles y equiláteros', 'ارتفاع المثلث المتساوي الساقين والمتساوي الأضلاع'),
        goal: say('Triangelu isoszele edo aldeberdin baten altuera kalkulatzea eta haren azalera aurkitzea.', 'Calcular la altura de un triángulo isósceles o equilátero y hallar su área.', 'حساب ارتفاع مثلث متساوي الساقين أو متساوي الأضلاع وإيجاد مساحته.'),
        explanation: say(
            'Triangelu isoszele batean, oinarri desberdinaren gaineko altuerak oinarria erdibitzen du, eta triangelua bi triangelu angeluzuzen berdinetan banatzen du. Triangelu angeluzuzen bakoitzean, alde berdina hipotenusa da, eta oinarri-erdia eta altuera katetoak: $h=\\sqrt{l^{2}-\\left(\\frac{b}{2}\\right)^{2}}$. 13, 13 eta 10 aldeekin, $h=\\sqrt{169-25}=12$, eta azalera $\\frac{10\\cdot 12}{2}=60$. Aldeberdinean gauza bera: 40 cm-ko aldearekin, $h=\\sqrt{40^{2}-20^{2}}=\\sqrt{1200}\\approx 34{,}64$ cm. Akats ohikoa: oinarri osoa erabiltzea, erdia beharrean.',
            'En un triángulo isósceles, la altura sobre el lado desigual parte la base por la mitad y divide el triángulo en dos triángulos rectángulos iguales. En cada uno, el lado igual es la hipotenusa, y media base y la altura son los catetos: $h=\\sqrt{l^{2}-\\left(\\frac{b}{2}\\right)^{2}}$. Con lados 13, 13 y 10, $h=\\sqrt{169-25}=12$, y el área es $\\frac{10\\cdot 12}{2}=60$. En el equilátero, igual: con lado 40 cm, $h=\\sqrt{40^{2}-20^{2}}=\\sqrt{1200}\\approx 34{,}64$ cm. Error típico: usar la base entera en lugar de la mitad.',
            'في المثلث المتساوي الساقين ينصّف الارتفاعُ النازل على الضلع المختلف القاعدةَ، ويقسم المثلث إلى مثلثين قائمين متطابقين. في كل منهما الضلع المساوي هو الوتر، ونصف القاعدة والارتفاع هما الضلعان القائمان: $h=\\sqrt{l^{2}-\\left(\\frac{b}{2}\\right)^{2}}$. مع الأضلاع 13 و13 و10: $h=\\sqrt{169-25}=12$، والمساحة $\\frac{10\\cdot 12}{2}=60$. وفي المتساوي الأضلاع كذلك: مع ضلع 40 سم، $h=\\sqrt{40^{2}-20^{2}}=\\sqrt{1200}\\approx 34{,}64$ سم. خطأ شائع: استعمال القاعدة كاملة بدل نصفها.'
        ),
        problem: say('Triangelu isoszele baten alde desberdina 5 m da eta haren gaineko altuera 6 m. Zenbat dira alde berdinak?', 'El lado desigual de un triángulo isósceles mide 5 m y la altura sobre él 6 m. ¿Cuánto miden los lados iguales?', 'الضلع المختلف في مثلث متساوي الساقين 5 م والارتفاع عليه 6 م. كم طول الضلعين المتساويين؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarri-erdia.', 'Media base.', 'نصف القاعدة.'), math: same('$5\\mathbin{:}2=2{,}5$') },
            { text: say('Alde berdina hipotenusa da.', 'El lado igual es la hipotenusa.', 'الضلع المساوي هو الوتر.'), math: same('$\\sqrt{6^{2}+2{,}5^{2}}=\\sqrt{42{,}25}=6{,}5$') }
        ],
        example: same('$\\sqrt{13^{2}-5^{2}}=12\\qquad\\sqrt{40^{2}-20^{2}}\\approx 34{,}64$'),
        takeaway: say('Altuerak oinarria erdibitzen du: oinarri-erdia katetoa da.', 'La altura parte la base: la media base es un cateto.', 'الارتفاع ينصّف القاعدة: نصف القاعدة ضلع قائم.'),
        figure: (language) => <IsoscelesHeightFigure language={language} />
    },
    {
        id: 'diagonals',
        stage: 'plane',
        title: say('Laukizuzenak, karratuak eta erronboak', 'Rectángulos, cuadrados y rombos', 'المستطيلات والمربعات والمعيّنات'),
        goal: say('Laukizuzen eta karratuen diagonala eta erronboen aldea edo diagonala kalkulatzea.', 'Calcular la diagonal de rectángulos y cuadrados y el lado o la diagonal de los rombos.', 'حساب قطر المستطيلات والمربعات وضلع المعيّن أو قطره.'),
        explanation: say(
            'Laukizuzen baten diagonalak bi triangelu angeluzuzen sortzen ditu; diagonala hipotenusa da eta aldeak katetoak: $d=\\sqrt{b^{2}+h^{2}}$. Karratuan bi aldeak berdinak dira: 7 cm-ko aldearekin, $d=\\sqrt{49+49}=\\sqrt{98}\\approx 9{,}9$ cm. Erronboan diagonalak perpendikularrak dira eta elkar erdibitzen dute: lau triangelu angeluzuzen sortzen dira, katetoak diagonal-erdiak dituztenak eta hipotenusa aldea. 24 eta 10 diagonalak badira, diagonal-erdiak 12 eta 5 dira, eta aldea $\\sqrt{144+25}=13$. Aldea eta diagonal bat ezagututa, beste diagonal-erdia kenketarekin ateratzen da.',
            'La diagonal de un rectángulo forma dos triángulos rectángulos; la diagonal es la hipotenusa y los lados son los catetos: $d=\\sqrt{b^{2}+h^{2}}$. En el cuadrado los dos lados son iguales: con lado 7 cm, $d=\\sqrt{49+49}=\\sqrt{98}\\approx 9{,}9$ cm. En el rombo las diagonales son perpendiculares y se cortan en su punto medio: se forman cuatro triángulos rectángulos con las semidiagonales como catetos y el lado como hipotenusa. Si las diagonales miden 24 y 10, las semidiagonales son 12 y 5, y el lado $\\sqrt{144+25}=13$. Conocidos el lado y una diagonal, la otra semidiagonal sale con una resta.',
            'قطر المستطيل يكوّن مثلثين قائمين؛ القطر هو الوتر والضلعان هما الضلعان القائمان: $d=\\sqrt{b^{2}+h^{2}}$. وفي المربع الضلعان متساويان: مع ضلع 7 سم، $d=\\sqrt{49+49}=\\sqrt{98}\\approx 9{,}9$ سم. وفي المعيّن القطران متعامدان وينصّف كل منهما الآخر: فتتكوّن أربعة مثلثات قائمة ضلعاها القائمان نصفا القطرين ووترها ضلع المعيّن. إذا كان القطران 24 و10 فنصفاهما 12 و5، والضلع $\\sqrt{144+25}=13$. وإذا عُرف الضلع وقطر استُخرج نصف القطر الآخر بالطرح.'
        ),
        problem: say('Erronbo baten aldea 8,5 m da, eta diagonal bat 15,4 m. Kalkulatu beste diagonala.', 'El lado de un rombo mide 8,5 m y una diagonal 15,4 m. Calcula la otra diagonal.', 'ضلع معيّن 8.5 م وأحد قطريه 15.4 م. احسب القطر الآخر.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Diagonal-erdia.', 'La semidiagonal.', 'نصف القطر.'), math: same('$15{,}4\\mathbin{:}2=7{,}7$') },
            { text: say('Beste diagonal-erdia: kenketa.', 'La otra semidiagonal: resta.', 'نصف القطر الآخر: بالطرح.'), math: same('$\\sqrt{8{,}5^{2}-7{,}7^{2}}=\\sqrt{12{,}96}=3{,}6$') },
            { text: say('Bikoiztu.', 'Duplícala.', 'ضاعفه.'), math: same('$2\\cdot 3{,}6=7{,}2$') }
        ],
        example: same('$\\sqrt{12^{2}+5^{2}}=13\\qquad\\sqrt{7^{2}+7^{2}}\\approx 9{,}9$'),
        takeaway: say('Laukizuzena: diagonala hipotenusa. Erronboa: aldea hipotenusa, diagonal-erdiak katetoak.', 'Rectángulo: la diagonal es la hipotenusa. Rombo: el lado es la hipotenusa y las semidiagonales, los catetos.', 'المستطيل: القطر هو الوتر. المعيّن: الضلع هو الوتر ونصفا القطرين ضلعاه القائمان.'),
        figure: (language) => <RectangleRhombusFigure language={language} />
    },
    {
        id: 'trapezoid',
        stage: 'plane',
        title: say('Trapezioak', 'Trapecios', 'أشباه المنحرف'),
        goal: say('Trapezio angeluzuzen eta isoszeleen altuera edo alde zeiharra kalkulatzea, eta azalera eta perimetroa aurkitzea.', 'Calcular la altura o el lado oblicuo de trapecios rectángulos e isósceles y hallar su área y su perímetro.', 'حساب ارتفاع أشباه المنحرف القائمة والمتساوية الساقين أو ضلعها المائل، وإيجاد مساحتها ومحيطها.'),
        explanation: say(
            'Trapezio batean, oinarri txikiaren erpin batetik altuera marrazten bada, triangelu angeluzuzen bat ateratzen da: alde zeiharra hipotenusa da, altuera kateto bat, eta beste katetoa oinarriaren zati bat. Trapezio angeluzuzenean zati hori oinarrien kendura da: 13 eta 19 oinarriekin, $19-13=6$. Trapezio isoszelean kendura bi aldeetan banatzen da: 10 eta 22 oinarriekin, $(22-10)\\mathbin{:}2=6$. Gero, Pitagoras: alde zeiharra 10 bada, $h=\\sqrt{10^{2}-6^{2}}=8$. Altuerarekin azalera ateratzen da: $\\frac{B+b}{2}\\cdot h$.',
            'En un trapecio, si se traza la altura desde un vértice de la base menor, sale un triángulo rectángulo: el lado oblicuo es la hipotenusa, la altura un cateto y el otro cateto un trozo de la base. En el trapecio rectángulo ese trozo es la diferencia de las bases: con bases 13 y 19, $19-13=6$. En el trapecio isósceles la diferencia se reparte a los dos lados: con bases 10 y 22, $(22-10)\\mathbin{:}2=6$. Después, Pitágoras: si el lado oblicuo mide 10, $h=\\sqrt{10^{2}-6^{2}}=8$. Con la altura sale el área: $\\frac{B+b}{2}\\cdot h$.',
            'في شبه المنحرف، إذا رُسم الارتفاع من رأس القاعدة الصغرى نتج مثلث قائم: الضلع المائل هو الوتر، والارتفاع ضلع قائم، والضلع القائم الآخر جزء من القاعدة. في شبه المنحرف القائم هذا الجزء هو فرق القاعدتين: مع القاعدتين 13 و19، $19-13=6$. وفي المتساوي الساقين يتوزع الفرق على الجانبين: مع القاعدتين 10 و22، $(22-10)\\mathbin{:}2=6$. ثم فيثاغورس: إذا كان الضلع المائل 10 فإن $h=\\sqrt{10^{2}-6^{2}}=8$. وبالارتفاع تُستخرج المساحة: $\\frac{B+b}{2}\\cdot h$.'
        ),
        problem: say('Trapezio isoszele baten oinarriak 3,2 m eta 6,4 m dira, eta altuera 6,3 m. Kalkulatu alde zeiharra.', 'Las bases de un trapecio isósceles miden 3,2 m y 6,4 m, y la altura 6,3 m. Calcula el lado oblicuo.', 'قاعدتا شبه منحرف متساوي الساقين 3.2 م و6.4 م، وارتفاعه 6.3 م. احسب الضلع المائل.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarrien kendura, zati bi.', 'La diferencia de las bases, entre dos.', 'فرق القاعدتين على اثنين.'), math: same('$(6{,}4-3{,}2)\\mathbin{:}2=1{,}6$') },
            { text: say('Alde zeiharra hipotenusa da.', 'El lado oblicuo es la hipotenusa.', 'الضلع المائل هو الوتر.'), math: same('$\\sqrt{6{,}3^{2}+1{,}6^{2}}=\\sqrt{42{,}25}=6{,}5$') }
        ],
        example: same('$\\sqrt{10^{2}-6^{2}}=8\\qquad\\frac{13+19}{2}\\cdot 8=128$'),
        takeaway: say('Angeluzuzena: $B-b$. Isoszelea: $(B-b)\\mathbin{:}2$. Alde zeiharra, hipotenusa.', 'Rectángulo: $B-b$. Isósceles: $(B-b)\\mathbin{:}2$. El lado oblicuo, hipotenusa.', 'القائم: $B-b$. المتساوي الساقين: $(B-b)\\mathbin{:}2$. الضلع المائل هو الوتر.'),
        figure: (language) => <TrapezoidFigure language={language} />
    },

    /* ---------- 4. Regular polygons and the circle ---------- */
    {
        id: 'apothem',
        stage: 'circle',
        title: say('Poligono erregularren apotema', 'La apotema de los polígonos regulares', 'عامد المضلعات المنتظمة'),
        goal: say('Poligono erregular baten apotema kalkulatzea eta haren azalera aurkitzea.', 'Calcular la apotema de un polígono regular y hallar su área.', 'حساب عامد مضلع منتظم وإيجاد مساحته.'),
        explanation: say(
            'Apotema zentrotik alde baten erdiko puntura doan zuzenkia da, aldearekiko perpendikularra. Erradioak (zentrotik erpin batera), apotemak eta alde-erdiak triangelu angeluzuzen bat osatzen dute: erradioa hipotenusa da. Beraz, $ap=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. Hexagono erregularrean aldea eta erradioa berdinak dira: 10 cm-ko aldearekin, $ap=\\sqrt{100-25}=\\sqrt{75}\\approx 8{,}66$ cm. Apotemarekin azalera kalkulatzen da: $A=\\frac{P\\cdot ap}{2}=\\frac{60\\cdot 8{,}66}{2}=259{,}8$ cm².',
            'La apotema es el segmento que va del centro al punto medio de un lado, perpendicular a él. El radio (del centro a un vértice), la apotema y medio lado forman un triángulo rectángulo: el radio es la hipotenusa. Así, $ap=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. En el hexágono regular el lado y el radio son iguales: con lado 10 cm, $ap=\\sqrt{100-25}=\\sqrt{75}\\approx 8{,}66$ cm. Con la apotema se calcula el área: $A=\\frac{P\\cdot ap}{2}=\\frac{60\\cdot 8{,}66}{2}=259{,}8$ cm².',
            'العامد قطعة من المركز إلى منتصف ضلع، عمودية عليه. نصف القطر (من المركز إلى رأس) والعامد ونصف الضلع تكوّن مثلثًا قائمًا: نصف القطر هو الوتر. لذلك $ap=\\sqrt{r^{2}-\\left(\\frac{l}{2}\\right)^{2}}$. وفي المسدس المنتظم الضلع ونصف القطر متساويان: مع ضلع 10 سم، $ap=\\sqrt{100-25}=\\sqrt{75}\\approx 8{,}66$ سم. وبالعامد تُحسب المساحة: $A=\\frac{P\\cdot ap}{2}=\\frac{60\\cdot 8{,}66}{2}=259{,}8$ سم².'
        ),
        problem: say('11,7 cm-ko aldeko pentagono erregular bat 10 cm-ko erradioko zirkunferentzian inskribatuta dago. Kalkulatu apotema hamarrenetara.', 'Un pentágono regular de 11,7 cm de lado está inscrito en una circunferencia de 10 cm de radio. Calcula su apotema a las décimas.', 'مخمس منتظم طول ضلعه 11.7 سم مرسوم داخل دائرة نصف قطرها 10 سم. احسب عامده مقرّبًا إلى الأعشار.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alde-erdia.', 'Medio lado.', 'نصف الضلع.'), math: same('$11{,}7\\mathbin{:}2=5{,}85$') },
            { text: say('Erradioa hipotenusa da.', 'El radio es la hipotenusa.', 'نصف القطر هو الوتر.'), math: same('$\\sqrt{10^{2}-5{,}85^{2}}\\approx 8{,}1$') }
        ],
        example: same('$\\sqrt{10^{2}-5^{2}}\\approx 8{,}66\\qquad\\sqrt{20^{2}-10^{2}}\\approx 17{,}32$'),
        takeaway: say('Erradioa hipotenusa; apotema eta alde-erdia katetoak.', 'El radio es la hipotenusa; la apotema y medio lado, los catetos.', 'نصف القطر هو الوتر؛ والعامد ونصف الضلع ضلعاه القائمان.'),
        figure: (language) => <ApothemFigure language={language} />
    },
    {
        id: 'chord',
        stage: 'circle',
        title: say('Kordak eta zentrorako distantzia', 'Cuerdas y distancia al centro', 'الأوتار والبعد عن المركز'),
        goal: say('Korda baten luzera edo zentrotik kordarako distantzia kalkulatzea.', 'Calcular la longitud de una cuerda o la distancia del centro a la cuerda.', 'حساب طول وتر في الدائرة أو بعد المركز عنه.'),
        explanation: say(
            'Zentrotik korda batera marraztutako perpendikularrak korda erdibitzen du. Hala, erradioak (zentrotik kordaren mutur batera), zentrorako distantziak eta korda-erdiak triangelu angeluzuzen bat osatzen dute, eta erradioa hipotenusa da: $r^{2}=d^{2}+\\left(\\frac{k}{2}\\right)^{2}$. 10 cm-ko erradioko zirkunferentzian, zentrotik 6 cm-ra dagoen kordaren erdia $\\sqrt{100-36}=8$ cm da, eta korda osoa 16 cm. Alderantziz, korda ezagututa, distantzia ateratzen da: 9,7 m-ko erradioarekin eta 13 m-ko kordarekin, $d=\\sqrt{9{,}7^{2}-6{,}5^{2}}=7{,}2$ m.',
            'La perpendicular trazada desde el centro a una cuerda la parte por la mitad. Así, el radio (del centro a un extremo de la cuerda), la distancia al centro y media cuerda forman un triángulo rectángulo, y el radio es la hipotenusa: $r^{2}=d^{2}+\\left(\\frac{k}{2}\\right)^{2}$. En una circunferencia de 10 cm de radio, la mitad de la cuerda que pasa a 6 cm del centro mide $\\sqrt{100-36}=8$ cm, y la cuerda entera 16 cm. Al revés, conocida la cuerda, sale la distancia: con radio 9,7 m y cuerda 13 m, $d=\\sqrt{9{,}7^{2}-6{,}5^{2}}=7{,}2$ m.',
            'العمود النازل من المركز على وتر في الدائرة ينصّفه. وهكذا يكوّن نصفُ القطر (من المركز إلى طرف الوتر) والبعدُ عن المركز ونصفُ الوتر مثلثًا قائمًا، ونصف القطر هو الوتر فيه: $r^{2}=d^{2}+\\left(\\frac{k}{2}\\right)^{2}$. في دائرة نصف قطرها 10 سم، نصف الوتر الذي يبعد 6 سم عن المركز $\\sqrt{100-36}=8$ سم، والوتر كله 16 سم. وبالعكس، إذا عُرف الوتر استُخرج البعد: مع نصف قطر 9.7 م ووتر 13 م، $d=\\sqrt{9{,}7^{2}-6{,}5^{2}}=7{,}2$ م.'
        ),
        problem: say('Zuzen bat 15 cm-ko erradioko zirkunferentzia baten zentrotik 10 cm-ra pasatzen da. Kalkulatu kordaren luzera hamarrenetara.', 'Una recta pasa a 10 cm del centro de una circunferencia de 15 cm de radio. Calcula la longitud de la cuerda a las décimas.', 'مستقيم يمر على بعد 10 سم من مركز دائرة نصف قطرها 15 سم. احسب طول الوتر مقرّبًا إلى الأعشار.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Korda-erdia: erradioa hipotenusa.', 'Media cuerda: el radio es la hipotenusa.', 'نصف الوتر: نصف القطر هو الوتر.'), math: same('$\\sqrt{15^{2}-10^{2}}=\\sqrt{125}\\approx 11{,}18$') },
            { text: say('Bikoiztu.', 'Duplica.', 'ضاعف.'), math: same('$2\\cdot 11{,}18\\approx 22{,}4$') }
        ],
        example: same('$\\sqrt{10^{2}-6^{2}}=8\\ \\to\\ 16$'),
        takeaway: say('Erradioa hipotenusa; distantzia eta korda-erdia katetoak.', 'El radio es la hipotenusa; la distancia y media cuerda, los catetos.', 'نصف القطر هو الوتر؛ والبعد ونصف الوتر الضلعان القائمان.'),
        figure: (language) => <ChordFigure language={language} />
    },
    {
        id: 'tangent',
        stage: 'circle',
        title: say('Zuzenki ukitzaileak', 'Segmentos tangentes', 'قطع المماس'),
        goal: say('Kanpoko puntu batetik zirkunferentzia batera doan zuzenki ukitzailea, erradioa edo distantzia kalkulatzea.', 'Calcular el segmento tangente desde un punto exterior, el radio o la distancia al centro.', 'حساب قطعة المماس من نقطة خارجية، أو نصف القطر، أو البعد عن المركز.'),
        explanation: say(
            'Zuzen ukitzailea ukitze-puntuko erradioarekiko perpendikularra da. Beraz, kanpoko $P$ puntu batetik $T$ puntuan ukitzen duen zuzenki ukitzailea marrazten bada, $OTP$ triangeluak angelu zuzena du $T$-n, eta hipotenusa $OP$ da, zentrotik puntura dagoen distantzia: $OP^{2}=r^{2}+PT^{2}$. 10 m-ko erradioarekin eta 24 m-ko zuzenki ukitzailearekin, $OP=\\sqrt{100+576}=26$ m. $OP$ eta $PT$ ezagututa, erradioa kenketarekin ateratzen da: $r=\\sqrt{89^{2}-80^{2}}=39$.',
            'La recta tangente es perpendicular al radio en el punto de tangencia. Por eso, si desde un punto exterior $P$ se traza el segmento tangente que toca en $T$, el triángulo $OTP$ tiene el ángulo recto en $T$, y la hipotenusa es $OP$, la distancia del centro al punto: $OP^{2}=r^{2}+PT^{2}$. Con radio 10 m y segmento tangente 24 m, $OP=\\sqrt{100+576}=26$ m. Conocidos $OP$ y $PT$, el radio sale con una resta: $r=\\sqrt{89^{2}-80^{2}}=39$.',
            'المماس عمودي على نصف القطر عند نقطة التماس. لذلك إذا رُسمت من نقطة خارجية $P$ قطعة مماس تمس الدائرة في $T$ كان للمثلث $OTP$ زاوية قائمة عند $T$، ووتره $OP$، أي بعد المركز عن النقطة: $OP^{2}=r^{2}+PT^{2}$. مع نصف قطر 10 م وقطعة مماس 24 م: $OP=\\sqrt{100+576}=26$ م. وإذا عُرف $OP$ و$PT$ استُخرج نصف القطر بالطرح: $r=\\sqrt{89^{2}-80^{2}}=39$.'
        ),
        problem: say('$P$ puntua 89 cm-ra dago zentrotik, eta $PT$ zuzenki ukitzailea 80 cm da. Kalkulatu erradioa.', 'El punto $P$ está a 89 cm del centro y el segmento tangente $PT$ mide 80 cm. Calcula el radio.', 'النقطة $P$ تبعد 89 سم عن المركز، وقطعة المماس $PT$ طولها 80 سم. احسب نصف القطر.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$OP$ hipotenusa da: kendu.', '$OP$ es la hipotenusa: resta.', '$OP$ هو الوتر: اطرح.'), math: same('$89^{2}-80^{2}=7921-6400=1521$') },
            { text: say('Erro karratua.', 'Raíz cuadrada.', 'الجذر التربيعي.'), math: same('$\\sqrt{1521}=39$') }
        ],
        example: same('$\\sqrt{5^{2}+12^{2}}=13\\qquad\\sqrt{10^{2}+24^{2}}=26$'),
        takeaway: say('Angelu zuzena ukitze-puntuan. Hipotenusa: zentrotik puntura.', 'Ángulo recto en el punto de tangencia. Hipotenusa: del centro al punto.', 'الزاوية القائمة عند نقطة التماس. الوتر: من المركز إلى النقطة.'),
        figure: (language) => <TangentFigure language={language} />
    },

    /* ---------- 5. Space and problems ---------- */
    {
        id: 'box',
        stage: 'space',
        title: say('Ortoedroaren eta kuboaren diagonala', 'La diagonal del ortoedro y del cubo', 'قطر متوازي المستطيلات والمكعب'),
        goal: say('Ortoedro, kubo eta zilindroetan sartzen den barra luzeena kalkulatzea.', 'Calcular la barra más larga que cabe en ortoedros, cubos y cilindros.', 'حساب أطول قضيب يدخل في متوازي المستطيلات والمكعب والأسطوانة.'),
        explanation: say(
            'Kaxa batean sartzen den barra luzeena diagonala da, beheko izkina batetik goiko aurkako izkinara. Pitagoras bi aldiz aplikatzen da. Lehenik, oinarriaren diagonala: $d=\\sqrt{a^{2}+b^{2}}$. Gero, $d$ eta altuera $c$ katetoak dira, eta diagonal handia hipotenusa: $D=\\sqrt{d^{2}+c^{2}}$. Bi urratsak batera: $D=\\sqrt{a^{2}+b^{2}+c^{2}}$. 3, 4 eta 12 cm-ko ortoedroan, $d=5$ eta $D=\\sqrt{25+144}=13$ cm. Zilindroan, triangeluaren katetoak diametroa eta altuera dira: 8 cm-ko erradioarekin eta 63 cm-ko altuerarekin, $\\sqrt{16^{2}+63^{2}}=65$ cm.',
            'La barra más larga que cabe en una caja es la diagonal, de una esquina de abajo a la esquina opuesta de arriba. Se aplica Pitágoras dos veces. Primero, la diagonal de la base: $d=\\sqrt{a^{2}+b^{2}}$. Después, $d$ y la altura $c$ son los catetos, y la diagonal grande es la hipotenusa: $D=\\sqrt{d^{2}+c^{2}}$. Los dos pasos juntos: $D=\\sqrt{a^{2}+b^{2}+c^{2}}$. En el ortoedro de 3, 4 y 12 cm, $d=5$ y $D=\\sqrt{25+144}=13$ cm. En el cilindro, los catetos del triángulo son el diámetro y la altura: con radio 8 cm y altura 63 cm, $\\sqrt{16^{2}+63^{2}}=65$ cm.',
            'أطول قضيب يدخل في صندوق هو قطره، من ركن سفلي إلى الركن العلوي المقابل. تُطبّق فيثاغورس مرتين. أولًا قطر القاعدة: $d=\\sqrt{a^{2}+b^{2}}$. ثم يكون $d$ والارتفاع $c$ ضلعين قائمين، والقطر الكبير هو الوتر: $D=\\sqrt{d^{2}+c^{2}}$. والخطوتان معًا: $D=\\sqrt{a^{2}+b^{2}+c^{2}}$. في متوازي المستطيلات 3 و4 و12 سم: $d=5$ و$D=\\sqrt{25+144}=13$ سم. وفي الأسطوانة الضلعان القائمان هما القطر والارتفاع: مع نصف قطر 8 سم وارتفاع 63 سم، $\\sqrt{16^{2}+63^{2}}=65$ سم.'
        ),
        problem: say('Kalkulatu 20 cm-ko ertzeko kubo baten diagonala hamarrenetara.', 'Calcula la diagonal de un cubo de 20 cm de arista a las décimas.', 'احسب قطر مكعب طول حرفه 20 سم مقرّبًا إلى الأعشار.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru dimentsioen karratuak batu.', 'Suma los cuadrados de las tres dimensiones.', 'اجمع مربعات الأبعاد الثلاثة.'), math: same('$400+400+400=1200$') },
            { text: say('Erro karratua.', 'Raíz cuadrada.', 'الجذر التربيعي.'), math: same('$\\sqrt{1200}\\approx 34{,}6$') }
        ],
        example: same('$\\sqrt{3^{2}+4^{2}+12^{2}}=13\\qquad\\sqrt{16^{2}+63^{2}}=65$'),
        takeaway: say('$D=\\sqrt{a^{2}+b^{2}+c^{2}}$: bi aldiz Pitagoras.', '$D=\\sqrt{a^{2}+b^{2}+c^{2}}$: dos veces Pitágoras.', '$D=\\sqrt{a^{2}+b^{2}+c^{2}}$: فيثاغورس مرتين.'),
        figure: (language) => <BoxDiagonalFigure language={language} />
    },
    {
        id: 'grid',
        stage: 'space',
        title: say('Distantziak sarean', 'Distancias en la cuadrícula', 'المسافات على الشبكة'),
        goal: say('Sare batean edo planoan bi punturen arteko distantzia kalkulatzea.', 'Calcular la distancia entre dos puntos de una cuadrícula o del plano.', 'حساب المسافة بين نقطتين على شبكة أو في المستوى.'),
        explanation: say(
            'Sare batean bi puntu lotzen dituen zuzenki zeiharra triangelu angeluzuzen baten hipotenusa da: katetoak puntu batetik bestera joateko horizontalean eta bertikalean zenbatzen diren laukiak dira. $A(1,1)$ eta $B(7,9)$ puntuen artean, 6 lauki eskuinera eta 8 gora daude, eta distantzia $\\sqrt{36+64}=10$. Koordenatuekin: $\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. Bide bera mapa batean: 4 m iparraldera eta 7 m ekialdera ibili ondoren, abiapuntutik $\\sqrt{16+49}=\\sqrt{65}\\approx 8{,}06$ m-ra gaude.',
            'En una cuadrícula, el segmento inclinado que une dos puntos es la hipotenusa de un triángulo rectángulo: los catetos son los cuadros que se cuentan en horizontal y en vertical para ir de un punto al otro. Entre $A(1,1)$ y $B(7,9)$ hay 6 cuadros a la derecha y 8 hacia arriba, y la distancia es $\\sqrt{36+64}=10$. Con coordenadas: $\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. Lo mismo en un mapa: tras caminar 4 m al norte y 7 m al este, estamos a $\\sqrt{16+49}=\\sqrt{65}\\approx 8{,}06$ m del punto de partida.',
            'على الشبكة تكون القطعة المائلة الواصلة بين نقطتين وترَ مثلث قائم: ضلعاه القائمان هما عدد المربعات أفقيًا وعموديًا للانتقال من نقطة إلى أخرى. بين $A(1,1)$ و$B(7,9)$ هناك 6 مربعات إلى اليمين و8 إلى الأعلى، والمسافة $\\sqrt{36+64}=10$. وبالإحداثيات: $\\sqrt{(x_2-x_1)^{2}+(y_2-y_1)^{2}}$. والأمر نفسه على خريطة: بعد المشي 4 م شمالًا و7 م شرقًا نكون على بعد $\\sqrt{16+49}=\\sqrt{65}\\approx 8{,}06$ م من نقطة الانطلاق.'
        ),
        problem: say('Kalkulatu $A(2,1)$ eta $B(5,5)$ puntuen arteko distantzia.', 'Calcula la distancia entre los puntos $A(2,1)$ y $B(5,5)$.', 'احسب المسافة بين النقطتين $A(2,1)$ و$B(5,5)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Horizontalean eta bertikalean.', 'En horizontal y en vertical.', 'أفقيًا وعموديًا.'), math: same('$5-2=3\\qquad 5-1=4$') },
            { text: say('Hipotenusa.', 'La hipotenusa.', 'الوتر.'), math: same('$\\sqrt{3^{2}+4^{2}}=\\sqrt{25}=5$') }
        ],
        example: same('$\\sqrt{6^{2}+8^{2}}=10\\qquad\\sqrt{4^{2}+7^{2}}\\approx 8{,}06$'),
        takeaway: say('Zenbatu laukiak horizontalean eta bertikalean: katetoak dira.', 'Cuenta los cuadros en horizontal y en vertical: son los catetos.', 'عُدّ المربعات أفقيًا وعموديًا: إنها الضلعان القائمان.'),
        figure: (language) => <GridFigure language={language} />
    },
    {
        id: 'problems',
        stage: 'space',
        title: say('Eguneroko problemak', 'Problemas cotidianos', 'مسائل من الحياة اليومية'),
        goal: say('Eskailera, poste, soka eta antzeko problemetan triangelu angeluzuzena aurkitzea eta ebaztea.', 'Encontrar el triángulo rectángulo en problemas de escaleras, postes, cuerdas y similares, y resolverlos.', 'إيجاد المثلث القائم في مسائل السلالم والأعمدة والحبال ونحوها وحلّها.'),
        explanation: say(
            'Problema askotan triangelu angeluzuzena ezkutatuta dago: horma eta lurra, poste bat eta haren itzala, mastaren kablea. Urratsak: 1) egin marrazki bat eta bilatu angelu zuzena; 2) erabaki zein den hipotenusa (angelu zuzenaren aurrean, luzeena: eskailera, kablea, soka); 3) batu edo kendu; 4) egiaztatu emaitza zentzuzkoa den. Adibidez, 6,5 m-ko eskailera bat horman 6 m-ko altueran badago, oina $\\sqrt{6{,}5^{2}-6^{2}}=\\sqrt{6{,}25}=2{,}5$ m-ra dago hormatik. Batzuetan Pitagoras bi aldiz edo beste kontu batekin batera erabili behar da.',
            'En muchos problemas el triángulo rectángulo está escondido: la pared y el suelo, un poste y su sombra, el cable de un mástil. Pasos: 1) haz un dibujo y busca el ángulo recto; 2) decide cuál es la hipotenusa (frente al ángulo recto, la más larga: la escalera, el cable, la cuerda); 3) suma o resta; 4) comprueba que el resultado tiene sentido. Por ejemplo, si una escalera de 6,5 m se apoya en la pared a 6 m de altura, el pie está a $\\sqrt{6{,}5^{2}-6^{2}}=\\sqrt{6{,}25}=2{,}5$ m de la pared. A veces hay que usar Pitágoras dos veces o junto con otra cuenta.',
            'في كثير من المسائل يكون المثلث القائم مخفيًا: الجدار والأرض، عمود وظله، كابل سارية. الخطوات: 1) ارسم شكلًا وابحث عن الزاوية القائمة؛ 2) حدّد الوتر (المقابل للزاوية القائمة والأطول: السلّم، الكابل، الحبل)؛ 3) اجمع أو اطرح؛ 4) تحقّق من أن النتيجة معقولة. مثلًا، إذا استند سلّم طوله 6.5 م إلى الجدار على ارتفاع 6 م، فإن قاعدته تبعد $\\sqrt{6{,}5^{2}-6^{2}}=\\sqrt{6{,}25}=2{,}5$ م عن الجدار. وأحيانًا يلزم استعمال فيثاغورس مرتين أو مع حساب آخر.'
        ),
        problem: say('26 m-ko tirolina bat 24 m-ra dauden bi postetan lotuta dago. Lehen postean 50 m-ko altueran hasten bada, zer altueratan amaitzen da?', 'Una tirolina de 26 m está atada a dos postes que distan 24 m. Si sale del primero a 50 m de altura, ¿a qué altura llega al segundo?', 'حبل انزلاق طوله 26 م مربوط بعمودين بينهما 24 م. إذا بدأ من الأول على ارتفاع 50 م، فعلى أي ارتفاع يصل إلى الثاني؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Soka hipotenusa da; jaitsiera katetoa.', 'La cuerda es la hipotenusa; la bajada, un cateto.', 'الحبل هو الوتر؛ والنزول ضلع قائم.'), math: same('$\\sqrt{26^{2}-24^{2}}=\\sqrt{100}=10$') },
            { text: say('Kendu hasierako altuerari.', 'Réstalo de la altura inicial.', 'اطرحه من الارتفاع الأول.'), math: same('$50-10=40$') }
        ],
        example: same('$\\sqrt{6{,}5^{2}-6^{2}}=2{,}5\\qquad\\sqrt{14{,}5^{2}-10^{2}}=10{,}5$'),
        takeaway: say('Marraztu, bilatu angelu zuzena, aukeratu hipotenusa eta egiaztatu.', 'Dibuja, busca el ángulo recto, elige la hipotenusa y comprueba.', 'ارسم، وابحث عن الزاوية القائمة، واختر الوتر، وتحقّق.'),
        figure: (language) => <LadderFigure language={language} />
    }
]

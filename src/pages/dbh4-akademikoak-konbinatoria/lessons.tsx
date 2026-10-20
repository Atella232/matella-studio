import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    BlockFigure,
    CommitteeFigure,
    ComplementFigure,
    ConditionsFigure,
    DecisionFigure,
    FactorialFigure,
    GridPathFigure,
    HandshakeFigure,
    MenuTreeFigure,
    OrdersFigure,
    PascalFigure,
    PodiumFigure,
    ProductGridFigure,
    RepeatedDigitsFigure,
    RepetitionSlotsFigure
} from './figures'

/* ==========================================================================
   Konbinatoria · 4. DBH akademikoak — stages and lessons, following
   Santillana Académicas unit 13 (trees and the product rule, factorials,
   variations with and without repetition, permutations, combinations and
   combinatorial numbers) and Anaya Académicas unit 11 (menus, dice and
   cards, flags, prizes, handshakes, the triangle of Tartaglia, numbers
   with repeated digits and paths on a grid).
   ========================================================================== */

export type CombinatoricsAkStageId = 'counting' | 'variations' | 'permutations' | 'combinations' | 'problems'

export const combinatoricsAkStages: UnitStage[] = [
    { id: 'counting', tone: 'blue', title: { eu: 'Zenbatzen', es: 'Contar', ar: 'العدّ' } },
    { id: 'variations', tone: 'violet', title: { eu: 'Aldakuntzak', es: 'Variaciones', ar: 'التراتيب' } },
    { id: 'permutations', tone: 'mustard', title: { eu: 'Permutazioak', es: 'Permutaciones', ar: 'التباديل' } },
    { id: 'combinations', tone: 'coral', title: { eu: 'Konbinazioak', es: 'Combinaciones', ar: 'التوافيق' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problemak', es: 'Problemas', ar: 'مسائل' } }
]

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const combinatoricsAkTopics: UnitTopic[] = [
    /* ---------- 1. Counting ---------- */
    {
        id: 'tree',
        stage: 'counting',
        title: say('Zuhaitz-diagramak', 'Diagramas de árbol', 'المخططات الشجرية'),
        goal: say('Aukera guztiak zuhaitz-diagrama batekin ordenatzea eta zenbatzea.', 'Ordenar y contar todas las posibilidades con un diagrama de árbol.', 'ترتيب كل الإمكانات وعدّها بمخطط شجري.'),
        explanation: say(
            'Konbinatoriak zenbatzen irakasten du, banan-banan idatzi gabe. Lehen tresna zuhaitz-diagrama da: lehen erabakiaren aukera bakoitzetik adar bat ateratzen da, eta adar bakoitzaren amaieratik bigarren erabakiaren aukerak, eta horrela jarraian. Azken adar bakoitza emaitza bat da, eta emaitzak zenbatzeko nahikoa da adarren amaierak zenbatzea. Zuhaitzak ez du zertan erregularra izan: tenis-partida batean, txapelketa amaitu bada adar bat moztu egiten da. Adar guztiek aukera kopuru bera badute, zuhaitza marraztu gabe ere zenbatu daiteke, biderkatuz.',
            'La combinatoria enseña a contar sin escribir los casos uno a uno. La primera herramienta es el diagrama de árbol: de cada opción de la primera decisión sale una rama, del final de cada rama salen las opciones de la segunda decisión, y así sucesivamente. Cada rama final es un resultado, y para contar los resultados basta con contar los extremos de las ramas. El árbol no tiene por qué ser regular: en un torneo, si alguien ya ha ganado, la rama se corta. Si todas las ramas tienen el mismo número de opciones, se puede contar sin dibujar el árbol, multiplicando.',
            'يعلّم التحليل التوافقي العدّ دون كتابة الحالات واحدة واحدة. الأداة الأولى هي المخطط الشجري: من كل خيار في القرار الأول يخرج فرع، ومن نهاية كل فرع تخرج خيارات القرار الثاني، وهكذا. كل فرع نهائي نتيجة، ولعدّ النتائج يكفي عدّ نهايات الفروع. ولا يلزم أن تكون الشجرة منتظمة: في دورة إذا فاز أحدهم يُقطع الفرع. وإذا كان لكل الفروع العدد نفسه من الخيارات أمكن العدّ دون رسم الشجرة، بالضرب.'
        ),
        problem: say('Jatetxe batean 3 lehen plater (entsalada, zopa, pasta) eta 2 bigarren plater (arraina, haragia) daude. Zenbat menu desberdin?', 'En un restaurante hay 3 primeros (ensalada, sopa, pasta) y 2 segundos (pescado, carne). ¿Cuántos menús distintos hay?', 'في مطعم 3 أطباق أولى (سلطة، حساء، معكرونة) وطبقان ثانيان (سمك، لحم). كم وجبة مختلفة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen mailan, 3 adar: lehen plater bakoitzeko bat.', 'En el primer nivel, 3 ramas: una por primero.', 'في المستوى الأول 3 فروع: واحد لكل طبق أول.') },
            { text: say('Adar bakoitzetik 2 adar: bigarren platerak.', 'De cada rama salen 2: los segundos.', 'من كل فرع يخرج فرعان: الأطباق الثانية.') },
            { text: say('Zenbatu amaierak.', 'Cuenta los extremos.', 'عُدّ النهايات.'), math: same('$3\\cdot 2=6$') }
        ],
        example: same('$2\\cdot 2\\cdot 2=8$'),
        takeaway: say('Adar bakoitzaren amaiera emaitza bat da: zenbatu amaierak.', 'El final de cada rama es un resultado: cuenta los extremos.', 'نهاية كل فرع نتيجة: عُدّ النهايات.'),
        figure: (language) => <MenuTreeFigure language={language} />
    },
    {
        id: 'product',
        stage: 'counting',
        title: say('Biderkaduraren erregela', 'El principio del producto', 'مبدأ الضرب'),
        goal: say('Hainbat erabaki jarraian hartzean, aukera kopuruak biderkatzea.', 'Multiplicar los números de opciones cuando se toman varias decisiones seguidas.', 'ضرب أعداد الخيارات عند اتخاذ عدة قرارات متتالية.'),
        explanation: say(
            'Lehen erabakiak $m$ aukera baditu eta, haietako bakoitzarekin, bigarrenak $n$ aukera, bi erabakiak batera $m\\cdot n$ eratara har daitezke. Hori da biderkaduraren erregela, eta erabaki gehiagotara zabaltzen da: dado bat, 40 kartako sorta bateko karta bat eta txanpon bat, $6\\cdot 40\\cdot 2=480$ emaitza. Taula batean ere ikusten da: lerro bat lehen aukera bakoitzeko eta zutabe bat bigarren bakoitzeko; laukiak dira emaitzak. Kontuz: erabakiak «eta» bidez lotzen direnean biderkatzen da; «edo» bidez (bata ala bestea, ez biak), batu egiten da.',
            'Si la primera decisión tiene $m$ opciones y, con cada una de ellas, la segunda tiene $n$, las dos decisiones juntas se pueden tomar de $m\\cdot n$ formas. Es el principio del producto, y se extiende a más decisiones: un dado, una carta de una baraja de 40 y una moneda dan $6\\cdot 40\\cdot 2=480$ resultados. También se ve en una tabla: una fila por cada opción de la primera y una columna por cada opción de la segunda; las casillas son los resultados. Cuidado: se multiplica cuando las decisiones se unen con «y»; cuando se unen con «o» (una u otra, no las dos), se suma.',
            'إذا كان للقرار الأول $m$ خيارًا، ومع كل منها للثاني $n$ خيارًا، أمكن اتخاذ القرارين معًا بـ $m\\cdot n$ طريقة. هذا مبدأ الضرب، ويمتد إلى قرارات أكثر: نرد وورقة من مجموعة 40 ورقة وقطعة نقود تعطي $6\\cdot 40\\cdot 2=480$ نتيجة. ويُرى أيضًا في جدول: صف لكل خيار من الأول وعمود لكل خيار من الثاني، والخانات هي النتائج. انتبه: نضرب عندما تربط القرارات «و»، أما عندما تربطها «أو» (أحدهما لا كلاهما) فنجمع.'
        ),
        problem: say('Taberna batean 5 ogitarteko, 8 edari eta 4 postre daude. Zenbat menu (bat bakoitzetik)?', 'En un bar hay 5 bocadillos, 8 bebidas y 4 postres. ¿Cuántos menús (uno de cada)?', 'في مقهى 5 شطائر و8 مشروبات و4 حلويات. كم وجبة (واحد من كل نوع)؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ogitartekoa eta edaria.', 'Bocadillo y bebida.', 'شطيرة ومشروب.'), math: same('$5\\cdot 8=40$') },
            { text: say('Haietako bakoitzari, 4 postre.', 'A cada uno, 4 postres.', 'لكل منها 4 حلويات.'), math: same('$40\\cdot 4=160$') },
            { text: say('«Eta» denez, biderkatu.', 'Como es «y», se multiplica.', 'لأنها «و» نضرب.') }
        ],
        example: same('$6\\cdot 40\\cdot 2=480$'),
        takeaway: say('Erabakiak «eta» bidez: aukera kopuruak biderkatu.', 'Decisiones unidas con «y»: multiplica los números de opciones.', 'قرارات مربوطة بـ«و»: اضرب أعداد الخيارات.'),
        figure: (language) => <ProductGridFigure language={language} />
    },
    {
        id: 'factorial',
        stage: 'counting',
        title: say('Faktoriala', 'El factorial', 'المضروب'),
        goal: say('$n!$ kalkulatzea eta faktorialen zatiketak sinplifikatzea.', 'Calcular $n!$ y simplificar cocientes de factoriales.', 'حساب $n!$ واختصار قسمة المضاريب.'),
        explanation: say(
            'Zenbaki arrunt baten faktoriala, $n!$, $n$-tik 1era arteko zenbaki guztien biderkadura da: $n!=n\\cdot(n-1)\\cdots 2\\cdot 1$. Adibidez, $5!=120$. Hitzarmenez, $0!=1$. Faktorialak oso azkar hazten dira: $10!$ 3 milioi baino gehiago da. Horregatik, faktorialen zatiketa bat ez da biderkatuta kalkulatzen, sinplifikatuta baizik: $n!=n\\cdot(n-1)!$ denez, $\\frac{8!}{5!}$ zatiketan $5!$ goian eta behean dago, eta $8\\cdot 7\\cdot 6$ geratzen da. Faktorialak hurrengo eredu guztietan agertzen dira.',
            'El factorial de un número natural, $n!$, es el producto de todos los números desde $n$ hasta 1: $n!=n\\cdot(n-1)\\cdots 2\\cdot 1$. Por ejemplo, $5!=120$. Por convenio, $0!=1$. Los factoriales crecen muy deprisa: $10!$ pasa de 3 millones. Por eso un cociente de factoriales no se calcula multiplicando, sino simplificando: como $n!=n\\cdot(n-1)!$, en $\\frac{8!}{5!}$ el $5!$ está arriba y abajo, y queda $8\\cdot 7\\cdot 6$. Los factoriales aparecen en todos los modelos siguientes.',
            'مضروب عدد طبيعي $n!$ هو جداء كل الأعداد من $n$ إلى 1: $n!=n\\cdot(n-1)\\cdots 2\\cdot 1$. مثلًا $5!=120$. واصطلاحًا $0!=1$. تنمو المضاريب بسرعة كبيرة: $10!$ يتجاوز 3 ملايين. لذلك لا نحسب قسمة المضاريب بالضرب بل بالاختصار: بما أن $n!=n\\cdot(n-1)!$ ففي $\\frac{8!}{5!}$ يوجد $5!$ في البسط والمقام، فيبقى $8\\cdot 7\\cdot 6$. وتظهر المضاريب في كل النماذج التالية.'
        ),
        problem: say('Kalkulatu $\\frac{8!}{5!}$ eta $\\frac{10!}{8!\\cdot 2!}$.', 'Calcula $\\frac{8!}{5!}$ y $\\frac{10!}{8!\\cdot 2!}$.', 'احسب $\\frac{8!}{5!}$ و$\\frac{10!}{8!\\cdot 2!}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $8!=8\\cdot 7\\cdot 6\\cdot 5!$ eta sinplifikatu.', 'Escribe $8!=8\\cdot 7\\cdot 6\\cdot 5!$ y simplifica.', 'اكتب $8!=8\\cdot 7\\cdot 6\\cdot 5!$ واختصر.'), math: same('$8\\cdot 7\\cdot 6=336$') },
            { text: say('$10!=10\\cdot 9\\cdot 8!$', '$10!=10\\cdot 9\\cdot 8!$', '$10!=10\\cdot 9\\cdot 8!$'), math: same('$\\frac{10\\cdot 9}{2}=45$') },
            { text: say('Ez kalkulatu faktorial osoak: sinplifikatu lehenago.', 'No calcules los factoriales enteros: simplifica antes.', 'لا تحسب المضاريب كاملة: اختصر أولًا.') }
        ],
        example: same('$5!=120$'),
        takeaway: say('n! = n · (n − 1)!: sinplifikatu faktorialak biderkatu baino lehen.', 'n! = n · (n − 1)!: simplifica los factoriales antes de multiplicar.', 'n! = n · (n − 1)!: اختصر المضاريب قبل الضرب.'),
        figure: (language) => <FactorialFigure language={language} />
    },

    /* ---------- 2. Variations ---------- */
    {
        id: 'with-repetition',
        stage: 'variations',
        title: say('Errepikapenezko aldakuntzak', 'Variaciones con repetición', 'التراتيب مع التكرار'),
        goal: say('$n$ elementutatik $k$ ordenatuz eta errepikatuz har daitezkeen taldeak zenbatzea.', 'Contar los grupos de $k$ que se forman con $n$ elementos cuando importa el orden y se puede repetir.', 'عدّ مجموعات $k$ المكوّنة من $n$ عنصرًا عندما يهم الترتيب ويجوز التكرار.'),
        explanation: say(
            '$k$ lauki bete behar badira, bakoitza $n$ elementuetako batekin, ordenak axola badu eta elementuak errepika badaitezke, lauki bakoitzak $n$ aukera ditu. Biderkaduraren erregelaz: $\\text{VR}_{n,k}=n^{k}$. Adibideak: 5 zifra bakoitiekin egindako lau zifrako zenbakiak, $5^{4}=625$; dado bat 4 aldiz botata, $6^{4}=1296$ emaitza; 7 koloreko hiru marrako banderak, kolore bat errepika badaiteke, $7^{3}=343$. Kontuz ordenarekin: oinarria aukera kopurua da ($n$), eta berretzailea lauki kopurua ($k$). $k$ $n$ baino handiagoa izan daiteke.',
            'Si hay que llenar $k$ casillas, cada una con uno de $n$ elementos, importa el orden y los elementos se pueden repetir, cada casilla tiene $n$ opciones. Por el principio del producto: $\\text{VR}_{n,k}=n^{k}$. Ejemplos: números de cuatro cifras con las 5 cifras impares, $5^{4}=625$; un dado lanzado 4 veces, $6^{4}=1296$ resultados; banderas de tres franjas con 7 colores, si se puede repetir color, $7^{3}=343$. Cuidado con el orden: la base es el número de opciones ($n$) y el exponente, el número de casillas ($k$). $k$ puede ser mayor que $n$.',
            'إذا وجب ملء $k$ خانة، كل منها بعنصر من $n$ عنصرًا، وكان الترتيب مهمًا والتكرار جائزًا، فلكل خانة $n$ خيارًا. وبمبدأ الضرب: $\\text{VR}_{n,k}=n^{k}$. أمثلة: أعداد من أربعة أرقام بالأرقام الفردية الخمسة $5^{4}=625$؛ نرد يُرمى 4 مرات $6^{4}=1296$ نتيجة؛ أعلام من ثلاثة أشرطة بـ7 ألوان إذا جاز تكرار اللون $7^{3}=343$. انتبه للترتيب: الأساس عدد الخيارات ($n$) والأس عدد الخانات ($k$). ويمكن أن يكون $k$ أكبر من $n$.'
        ),
        problem: say('Zenbat lau zifrako zenbaki egin daitezke 1, 3, 5, 7, 9 zifrekin, errepikatuz?', '¿Cuántos números de cuatro cifras se pueden formar con las cifras 1, 3, 5, 7, 9, repitiendo?', 'كم عددًا من أربعة أرقام يمكن تكوينه بالأرقام 1، 3، 5، 7، 9 مع التكرار؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordenak axola du (1357 ≠ 7531) eta errepika daiteke.', 'Importa el orden (1357 ≠ 7531) y se puede repetir.', 'الترتيب مهم (1357 ≠ 7531) والتكرار جائز.') },
            { text: say('4 lauki, bakoitzean 5 aukera.', '4 casillas, 5 opciones en cada una.', '4 خانات، في كل منها 5 خيارات.'), math: same('$5\\cdot 5\\cdot 5\\cdot 5$') },
            { text: say('Berretura gisa.', 'Como potencia.', 'على شكل قوة.'), math: same('$\\text{VR}_{5,4}=5^{4}=625$') }
        ],
        example: same('$6^{4}=1296$'),
        takeaway: say('Ordena bai eta errepikapena bai: n ber k.', 'Con orden y con repetición: n elevado a k.', 'مع الترتيب والتكرار: n أس k.'),
        figure: (language) => <RepetitionSlotsFigure language={language} />
    },
    {
        id: 'variations',
        stage: 'variations',
        title: say('Aldakuntzak', 'Variaciones', 'التراتيب'),
        goal: say('Ordenak axola duenean eta ezin denean errepikatu, $\\text{V}_{n,k}$ kalkulatzea.', 'Calcular $\\text{V}_{n,k}$ cuando importa el orden y no se puede repetir.', 'حساب $\\text{V}_{n,k}$ عندما يهم الترتيب ولا يجوز التكرار.'),
        explanation: say(
            'Ordenak axola badu baina elementu bat behin bakarrik erabil badaiteke, lehen laukiak $n$ aukera ditu, bigarrenak $n-1$, hirugarrenak $n-2$, eta horrela $k$ faktore arte: $\\text{V}_{n,k}=n\\cdot(n-1)\\cdots(n-k+1)=\\frac{n!}{(n-k)!}$. Adibidez, 10 liburutatik urrezko, zilarrezko eta brontzezko saria banatzeko, $10\\cdot 9\\cdot 8=720$ era. Kasu honetan $k$ ezin da $n$ baino handiagoa izan. Formula gogoratzeko: $n$-tik hasi eta beherantz biderkatu, $k$ faktore hartuta.',
            'Si importa el orden pero cada elemento solo se puede usar una vez, la primera casilla tiene $n$ opciones, la segunda $n-1$, la tercera $n-2$, y así hasta $k$ factores: $\\text{V}_{n,k}=n\\cdot(n-1)\\cdots(n-k+1)=\\frac{n!}{(n-k)!}$. Por ejemplo, para repartir el premio de oro, el de plata y el de bronce entre 10 libros hay $10\\cdot 9\\cdot 8=720$ formas. Aquí $k$ no puede ser mayor que $n$. Para recordar la fórmula: empieza en $n$ y multiplica hacia abajo, tomando $k$ factores.',
            'إذا كان الترتيب مهمًا لكن كل عنصر يُستعمل مرة واحدة فقط، فللخانة الأولى $n$ خيارًا، وللثانية $n-1$، وللثالثة $n-2$، وهكذا حتى $k$ عاملًا: $\\text{V}_{n,k}=n\\cdot(n-1)\\cdots(n-k+1)=\\frac{n!}{(n-k)!}$. مثلًا لتوزيع الجائزة الذهبية والفضية والبرونزية على 10 كتب هناك $10\\cdot 9\\cdot 8=720$ طريقة. وهنا لا يمكن أن يكون $k$ أكبر من $n$. لتذكّر الصيغة: ابدأ من $n$ واضرب نزولًا آخذًا $k$ عاملًا.'
        ),
        problem: say('10 liburu hautatu dira, eta urrezko, zilarrezko eta brontzezko sariak banatu behar dira. Zenbat eratara?', 'Se han seleccionado 10 libros y hay que repartir los premios de oro, plata y bronce. ¿De cuántas formas?', 'اختير 10 كتب ويجب توزيع الجوائز الذهبية والفضية والبرونزية. بكم طريقة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordenak axola du (saria desberdina da) eta liburu batek ezin ditu bi sari jaso.', 'Importa el orden (el premio es distinto) y un libro no puede llevar dos premios.', 'الترتيب مهم (الجوائز مختلفة) ولا يأخذ الكتاب جائزتين.') },
            { text: say('10 aukera, gero 9, gero 8.', '10 opciones, luego 9, luego 8.', '10 خيارات ثم 9 ثم 8.'), math: same('$\\text{V}_{10,3}=10\\cdot 9\\cdot 8$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.'), math: same('$\\frac{10!}{7!}=720$') }
        ],
        example: same('$\\text{V}_{7,3}=210$'),
        takeaway: say('Ordena bai eta errepikapenik ez: n-tik beherantz biderkatu, k faktore.', 'Con orden y sin repetición: multiplica hacia abajo desde n, k factores.', 'مع الترتيب ودون تكرار: اضرب نزولًا من n، k عاملًا.'),
        figure: (language) => <PodiumFigure language={language} />
    },
    {
        id: 'conditions',
        stage: 'variations',
        title: say('Baldintzak dituzten zenbakiak', 'Números con condiciones', 'أعداد بشروط'),
        goal: say('Lauki bakoitzaren aukerak banan-banan zenbatzea, baldintzak daudenean (0 hasieran ez, bikoitia…).', 'Contar las opciones de cada casilla una a una cuando hay condiciones (el 0 no al principio, par…).', 'عدّ خيارات كل خانة واحدة واحدة عند وجود شروط (لا 0 في البداية، زوجي…).'),
        explanation: say(
            'Batzuetan laukiek ez dute aukera kopuru bera, eta formula zuzenean ezin da aplikatu. Orduan, lauki bakoitzaren aukerak zenbatzen dira eta biderkatu egiten dira, baldintza gehien dituen laukitik hasita. Zenbakietan, 0 ezin da lehen zifra izan: hiru zifrako zenbakiak, zifrak errepikatu gabe, $9\\cdot 9\\cdot 8=648$ dira (lehenean 0 ez; bigarrenean 0 bai, baina ez lehenengoa). Zenbakia bikoitia izan behar bada, hasi azken zifratik. Baldintza batek kasuak bitan banatzen baditu (0an amaitzen dira ala ez), zenbatu kasu bakoitza eta batu.',
            'A veces las casillas no tienen el mismo número de opciones y la fórmula no se aplica directamente. Entonces se cuentan las opciones de cada casilla y se multiplican, empezando por la casilla con más condiciones. En los números, el 0 no puede ser la primera cifra: los números de tres cifras sin repetir cifras son $9\\cdot 9\\cdot 8=648$ (en la primera, el 0 no; en la segunda el 0 sí, pero no la primera). Si el número tiene que ser par, empieza por la última cifra. Si una condición parte los casos en dos (acaban en 0 o no), cuenta cada caso y suma.',
            'أحيانًا لا يكون للخانات العدد نفسه من الخيارات فلا تُطبَّق الصيغة مباشرة. عندها نعدّ خيارات كل خانة ونضربها، بادئين بالخانة ذات الشروط الأكثر. في الأعداد لا يكون 0 الرقم الأول: الأعداد من ثلاثة أرقام دون تكرار هي $9\\cdot 9\\cdot 8=648$ (في الأولى لا 0، وفي الثانية يجوز 0 لا الرقم الأول). وإذا وجب أن يكون العدد زوجيًا فابدأ بالرقم الأخير. وإذا قسم شرط الحالات إلى قسمين (تنتهي بـ0 أو لا) فعُدّ كل حالة واجمع.'
        ),
        problem: say('Zenbat hiru zifrako zenbaki daude zifrak errepikatu gabe?', '¿Cuántos números de tres cifras hay sin repetir cifras?', 'كم عددًا من ثلاثة أرقام دون تكرار الأرقام؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen zifra: 1etik 9ra.', 'Primera cifra: del 1 al 9.', 'الرقم الأول: من 1 إلى 9.'), math: same('$9$') },
            { text: say('Bigarrena: 10 zifretatik lehena kenduta (0 barne).', 'Segunda: las 10 cifras menos la primera (el 0 incluido).', 'الثاني: الأرقام العشرة ناقص الأول (يشمل 0).'), math: same('$9$') },
            { text: say('Hirugarrena: 8. Biderkatu.', 'Tercera: 8. Multiplica.', 'الثالث: 8. اضرب.'), math: same('$9\\cdot 9\\cdot 8=648$') }
        ],
        example: same('$9\\cdot 10\\cdot 10=900$'),
        takeaway: say('Baldintza gehien duen laukitik hasi eta lauki bakoitzaren aukerak biderkatu.', 'Empieza por la casilla con más condiciones y multiplica las opciones de cada una.', 'ابدأ بالخانة ذات الشروط الأكثر واضرب خيارات كل خانة.'),
        figure: (language) => <ConditionsFigure language={language} />
    },

    /* ---------- 3. Permutations ---------- */
    {
        id: 'permutations',
        stage: 'permutations',
        title: say('Permutazioak', 'Permutaciones', 'التباديل'),
        goal: say('$n$ elementu guztiak ordenatzeko erak kalkulatzea: $\\text{P}_n=n!$.', 'Calcular las formas de ordenar todos los $n$ elementos: $\\text{P}_n=n!$.', 'حساب طرق ترتيب كل العناصر $n$: $\\text{P}_n=n!$.'),
        explanation: say(
            'Permutazioak elementu guztiak ordenatzeko erak dira, errepikatu gabe: $k=n$ duten aldakuntzak. Lehen tokirako $n$ aukera, bigarrenerako $n-1$… azkenerako 1: $\\text{P}_n=n!$. A, B, C letrekin 6 ordena daude: ABC, ACB, BAC, BCA, CAB, CBA. 8 hautagaiko zerrenda bat $8!=40\\,320$ eratara ordena daiteke. Hitz baten anagramak, letra guztiak desberdinak badira, permutazioak dira: AMOR hitzak $4!=24$ anagrama ditu. Mahai biribil batean, biraketak gauza bera direnez, $(n-1)!$ era daude.',
            'Las permutaciones son las formas de ordenar todos los elementos, sin repetir: variaciones con $k=n$. Para el primer lugar hay $n$ opciones, para el segundo $n-1$… para el último 1: $\\text{P}_n=n!$. Con las letras A, B, C hay 6 órdenes: ABC, ACB, BAC, BCA, CAB, CBA. Una lista de 8 candidatos se puede ordenar de $8!=40\\,320$ formas. Los anagramas de una palabra, si todas sus letras son distintas, son permutaciones: AMOR tiene $4!=24$ anagramas. En una mesa redonda, como los giros son lo mismo, hay $(n-1)!$ formas.',
            'التباديل هي طرق ترتيب كل العناصر دون تكرار: تراتيب فيها $k=n$. للمكان الأول $n$ خيارًا، وللثاني $n-1$… وللأخير 1: $\\text{P}_n=n!$. بالأحرف A وB وC هناك 6 ترتيبات: ABC وACB وBAC وBCA وCAB وCBA. ويمكن ترتيب قائمة من 8 مرشحين بـ $8!=40\\,320$ طريقة. وجناسات كلمة، إذا كانت أحرفها كلها مختلفة، تباديل: لكلمة AMOR عدد $4!=24$ جناسًا. وحول طاولة مستديرة، لأن الدورانات متماثلة، هناك $(n-1)!$ طريقة.'
        ),
        problem: say('6 lagun ilara batean jarri behar dira. Zenbat eratara?', 'Hay que colocar a 6 amigos en una fila. ¿De cuántas formas?', 'يجب وضع 6 أصدقاء في صف. بكم طريقة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Denak ordenatzen dira, errepikatu gabe.', 'Se ordenan todos, sin repetir.', 'يُرتَّبون جميعًا دون تكرار.') },
            { text: say('Lehen tokian 6, bigarrenean 5…', 'En el primer lugar 6, en el segundo 5…', 'في المكان الأول 6، وفي الثاني 5…'), math: same('$6\\cdot 5\\cdot 4\\cdot 3\\cdot 2\\cdot 1$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.'), math: same('$\\text{P}_6=6!=720$') }
        ],
        example: same('$\\text{P}_4=24$'),
        takeaway: say('Guztiak ordenatu, errepikatu gabe: n!.', 'Ordenar todos, sin repetir: n!.', 'ترتيب الكل دون تكرار: n!.'),
        figure: (language) => <OrdersFigure language={language} />
    },
    {
        id: 'restricted',
        stage: 'permutations',
        title: say('Baldintzak dituzten ordenak', 'Órdenes con condiciones', 'ترتيبات بشروط'),
        goal: say('Elementu batzuk elkarrekin, toki jakin batean edo bereizita egon behar direnean ordenak zenbatzea.', 'Contar órdenes cuando unos elementos deben ir juntos, en un lugar fijo o separados.', 'عدّ الترتيبات عندما يجب أن تكون بعض العناصر معًا أو في مكان محدد أو متباعدة.'),
        explanation: say(
            'Bi pertsonak elkarren ondoan egon behar badute, kola-bloke bat bezala tratatzen dira: $n-1$ «elementu» ordenatzen dira, $(n-1)!$, eta gero blokea barrutik ordenatzen da, $2!$. Guztira $2\\cdot(n-1)!$. Elementu bat toki jakin batean badago (lehena, adibidez), beste $n-1$ak bakarrik ordenatzen dira. Bi elementu ez badaude elkarren ondoan, errazagoa da aurkakoa zenbatzea: guztiak ken elkarrekin daudenak. Gauza bera letrekin: bokalak elkarrekin, kontsonante batez hasita…',
            'Si dos personas tienen que ir juntas, se tratan como un bloque pegado: se ordenan $n-1$ «elementos», $(n-1)!$, y después el bloque por dentro, $2!$. En total, $2\\cdot(n-1)!$. Si un elemento está en un lugar fijo (el primero, por ejemplo), solo se ordenan los otros $n-1$. Si dos elementos no pueden ir juntos, es más fácil contar el contrario: todos menos los que van juntos. Lo mismo con letras: vocales juntas, empezar por consonante…',
            'إذا وجب أن يكون شخصان متجاورين عوملا ككتلة ملتصقة: نرتّب $n-1$ «عنصرًا» أي $(n-1)!$، ثم نرتّب الكتلة من الداخل $2!$. المجموع $2\\cdot(n-1)!$. وإذا كان عنصر في مكان محدد (الأول مثلًا) نرتّب الـ $n-1$ الأخرى فقط. وإذا لم يجز تجاور عنصرين فالأسهل عدّ العكس: الكل ناقص المتجاورين. والأمر نفسه مع الأحرف: الحروف الصوتية معًا، البدء بحرف ساكن…'
        ),
        problem: say('5 lagun (A, B, C, D, E) argazki baterako ilaran jartzen dira, eta A eta B elkarren ondoan egon nahi dute. Zenbat eratara?', '5 amigos (A, B, C, D, E) se colocan en fila para una foto, y A y B quieren ir juntos. ¿De cuántas formas?', 'يقف 5 أصدقاء (A وB وC وD وE) في صف لصورة، ويريد A وB أن يتجاورا. بكم طريقة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('[AB] bloke bat: 4 elementu ordenatu.', '[AB] es un bloque: ordena 4 elementos.', '[AB] كتلة: رتّب 4 عناصر.'), math: same('$4!=24$') },
            { text: say('Blokea barrutik: AB edo BA.', 'El bloque por dentro: AB o BA.', 'الكتلة من الداخل: AB أو BA.'), math: same('$2!=2$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.'), math: same('$2\\cdot 24=48$') }
        ],
        example: same('$5!-48=72$'),
        takeaway: say('Elkarrekin: bloke bat, eta gero barrutik. Bereizita: guztiak ken elkarrekin.', 'Juntos: un bloque, y después por dentro. Separados: todos menos juntos.', 'معًا: كتلة ثم من الداخل. متباعدان: الكل ناقص المتجاورين.'),
        figure: (language) => <BlockFigure language={language} />
    },
    {
        id: 'repeated',
        stage: 'permutations',
        title: say('Elementu errepikatuak', 'Elementos repetidos', 'عناصر مكررة'),
        goal: say('Elementu batzuk berdinak direnean ordenak zenbatzea.', 'Contar los órdenes cuando algunos elementos son iguales.', 'عدّ الترتيبات عندما تكون بعض العناصر متماثلة.'),
        explanation: say(
            'Elementu batzuk berdinak badira, haien artean trukatzeak ez du ordena berririk ematen. Horregatik, $n!$ zati elementu berdin talde bakoitzaren faktoriala: 5555333 zifrekin, $\\frac{7!}{4!\\cdot 3!}=35$ zenbaki. Beste era batera ere pentsa daiteke: nahikoa da lau bostak 7 tokietatik zein lautan dauden aukeratzea, eta hori konbinazio bat da. Hitz baten anagrametan berdin: PAPA hitzak $\\frac{4!}{2!\\cdot 2!}=6$ anagrama ditu. Txanpon bat 5 aldiz botata, 2 aurpegi eta 3 gurutze ateratzeko $\\frac{5!}{2!\\cdot 3!}=10$ ordena daude.',
            'Si algunos elementos son iguales, intercambiarlos entre sí no da un orden nuevo. Por eso se divide $n!$ entre el factorial de cada grupo de elementos iguales: con las cifras 5555333 hay $\\frac{7!}{4!\\cdot 3!}=35$ números. También se puede pensar de otra forma: basta con elegir en cuáles de los 7 lugares van los cuatro cincos, y eso es una combinación. Igual con los anagramas: PAPA tiene $\\frac{4!}{2!\\cdot 2!}=6$ anagramas. Al lanzar una moneda 5 veces, hay $\\frac{5!}{2!\\cdot 3!}=10$ órdenes para sacar 2 caras y 3 cruces.',
            'إذا كانت بعض العناصر متماثلة فتبادلها بينها لا يعطي ترتيبًا جديدًا. لذلك نقسم $n!$ على مضروب كل مجموعة من العناصر المتماثلة: بالأرقام 5555333 هناك $\\frac{7!}{4!\\cdot 3!}=35$ عددًا. ويمكن التفكير بطريقة أخرى: يكفي اختيار الأماكن الأربعة من 7 التي توضع فيها الخمسات، وهذا توفيق. والأمر نفسه مع الجناسات: لكلمة PAPA عدد $\\frac{4!}{2!\\cdot 2!}=6$ جناسات. وعند رمي قطعة نقود 5 مرات هناك $\\frac{5!}{2!\\cdot 3!}=10$ ترتيبات للحصول على وجهين و3 ظهور.'
        ),
        problem: say('Zenbat zazpi zifrako zenbaki egin daitezke 5, 5, 5, 5, 3, 3, 3 zifrekin?', '¿Cuántos números de siete cifras se pueden formar con las cifras 5, 5, 5, 5, 3, 3, 3?', 'كم عددًا من سبعة أرقام يمكن تكوينه بالأرقام 5، 5، 5، 5، 3، 3، 3؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zifra guztiak desberdinak balira, $7!$.', 'Si todas las cifras fueran distintas, $7!$.', 'لو كانت الأرقام كلها مختلفة لكان $7!$.') },
            { text: say('Zatitu bosten $4!$ eta hiruen $3!$ trukeez.', 'Divide entre los $4!$ cambios de los cincos y los $3!$ de los treses.', 'اقسم على $4!$ تبديلات الخمسات و$3!$ تبديلات الثلاثات.'), math: same('$\\frac{5040}{24\\cdot 6}$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.'), math: same('$\\frac{7!}{4!\\cdot 3!}=35$') }
        ],
        example: same('$\\frac{4!}{2!\\cdot 2!}=6$'),
        takeaway: say('n! zati elementu berdinen taldeen faktorialak.', 'n! entre los factoriales de los grupos de elementos iguales.', 'n! على مضاريب مجموعات العناصر المتماثلة.'),
        figure: (language) => <RepeatedDigitsFigure language={language} />
    },

    /* ---------- 4. Combinations ---------- */
    {
        id: 'combinations',
        stage: 'combinations',
        title: say('Konbinazioak', 'Combinaciones', 'التوافيق'),
        goal: say('Ordenak axola ez duenean, $n$ elementutatik $k$ aukeratzeko erak kalkulatzea.', 'Calcular las formas de elegir $k$ de $n$ elementos cuando no importa el orden.', 'حساب طرق اختيار $k$ من $n$ عنصرًا عندما لا يهم الترتيب.'),
        explanation: say(
            'Konbinazioetan $k$ elementu aukeratzen dira $n$etatik, errepikatu gabe eta ordenak axola gabe: talde bat, ez zerrenda bat. Aldakuntzek talde bakoitza $k!$ aldiz zenbatzen dute (haren $k!$ ordenak), eta horregatik $\\text{C}_{n,k}=\\frac{\\text{V}_{n,k}}{k!}=\\frac{n!}{k!\\,(n-k)!}$. Adibidez, 5 lagunek elkarri eskua ematen badiote, bikote bakoitza behin: $\\frac{5\\cdot 4}{2}=10$ eskuemate. 10 diskotatik 3 oparitzeko, $\\frac{10\\cdot 9\\cdot 8}{3\\cdot 2\\cdot 1}=120$ era. Galdera gakoa: talde bera bi ordenatan idatzita, gauza bera da? Baiezkoan, konbinazioak.',
            'En las combinaciones se eligen $k$ elementos de $n$, sin repetir y sin que importe el orden: un grupo, no una lista. Las variaciones cuentan cada grupo $k!$ veces (sus $k!$ órdenes), y por eso $\\text{C}_{n,k}=\\frac{\\text{V}_{n,k}}{k!}=\\frac{n!}{k!\\,(n-k)!}$. Por ejemplo, si 5 amigos se dan la mano, cada pareja una vez: $\\frac{5\\cdot 4}{2}=10$ apretones. Para regalar 3 discos de 10, hay $\\frac{10\\cdot 9\\cdot 8}{3\\cdot 2\\cdot 1}=120$ formas. La pregunta clave: el mismo grupo escrito en dos órdenes, ¿es lo mismo? Si es así, combinaciones.',
            'في التوافيق نختار $k$ عنصرًا من $n$ دون تكرار ودون أن يهم الترتيب: مجموعة لا قائمة. التراتيب تعدّ كل مجموعة $k!$ مرة (ترتيباتها الـ $k!$)، لذلك $\\text{C}_{n,k}=\\frac{\\text{V}_{n,k}}{k!}=\\frac{n!}{k!\\,(n-k)!}$. مثلًا إذا تصافح 5 أصدقاء، كل زوج مرة: $\\frac{5\\cdot 4}{2}=10$ مصافحات. ولإهداء 3 أقراص من 10 هناك $\\frac{10\\cdot 9\\cdot 8}{3\\cdot 2\\cdot 1}=120$ طريقة. السؤال المفتاح: المجموعة نفسها مكتوبة بترتيبين، هل هي الشيء نفسه؟ إن كان كذلك فهي توافيق.'
        ),
        problem: say('Vicentek 10 diskotatik 3 oparitu nahi dizkio lagun bati. Zenbat eratara aukera ditzake?', 'Vicente quiere regalar a un amigo 3 discos de entre 10. ¿De cuántas formas puede elegirlos?', 'يريد فيسنتي أن يهدي صديقه 3 أقراص من 10. بكم طريقة يمكنه اختيارها؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordenak axola balu: $\\text{V}_{10,3}$.', 'Si importara el orden: $\\text{V}_{10,3}$.', 'لو كان الترتيب مهمًا: $\\text{V}_{10,3}$.'), math: same('$10\\cdot 9\\cdot 8=720$') },
            { text: say('Hiru diskoko talde bakoitza $3!=6$ aldiz dago.', 'Cada grupo de tres discos está $3!=6$ veces.', 'كل مجموعة من ثلاثة أقراص مكررة $3!=6$ مرات.') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.'), math: same('$\\text{C}_{10,3}=\\frac{720}{6}=120$') }
        ],
        example: same('$\\text{C}_{6,2}=15$'),
        takeaway: say('Taldeak, ez zerrendak: aldakuntzak zati k!.', 'Grupos, no listas: variaciones entre k!.', 'مجموعات لا قوائم: التراتيب على k!.'),
        figure: (language) => <HandshakeFigure language={language} />
    },
    {
        id: 'binomial',
        stage: 'combinations',
        title: say('Zenbaki konbinatorioak', 'Números combinatorios', 'الأعداد التوافقية'),
        goal: say('$\\binom{n}{k}$ kalkulatzea eta haren propietateak erabiltzea.', 'Calcular $\\binom{n}{k}$ y usar sus propiedades.', 'حساب $\\binom{n}{k}$ واستعمال خصائصه.'),
        explanation: say(
            'Zenbaki konbinatorioa $\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$ da, «$n$ gain $k$» irakurtzen da, eta $\\text{C}_{n,k}$-ren berdina da. Propietateak: $\\binom{n}{0}=\\binom{n}{n}=1$ (ezer ez edo dena aukeratzeko era bakarra); $\\binom{n}{1}=n$; eta simetria, $\\binom{n}{k}=\\binom{n}{n-k}$, $k$ aukeratzea gainerako $n-k$ uztea delako. Simetriak kalkuluak errazten ditu: $\\binom{20}{18}=\\binom{20}{2}=190$. Gainera, $\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$, Tartagliaren triangeluaren oinarria.',
            'El número combinatorio $\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$ se lee «$n$ sobre $k$» y es igual a $\\text{C}_{n,k}$. Propiedades: $\\binom{n}{0}=\\binom{n}{n}=1$ (una sola forma de no elegir nada o elegirlo todo); $\\binom{n}{1}=n$; y la simetría, $\\binom{n}{k}=\\binom{n}{n-k}$, porque elegir $k$ es dejar los otros $n-k$. La simetría facilita los cálculos: $\\binom{20}{18}=\\binom{20}{2}=190$. Además, $\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$, la base del triángulo de Tartaglia.',
            'العدد التوافقي $\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$ يساوي $\\text{C}_{n,k}$. خصائصه: $\\binom{n}{0}=\\binom{n}{n}=1$ (طريقة واحدة لعدم اختيار شيء أو اختيار الكل)؛ و$\\binom{n}{1}=n$؛ والتماثل $\\binom{n}{k}=\\binom{n}{n-k}$ لأن اختيار $k$ هو ترك الـ $n-k$ الباقية. ويسهّل التماثل الحسابات: $\\binom{20}{18}=\\binom{20}{2}=190$. كما أن $\\binom{n}{k}+\\binom{n}{k+1}=\\binom{n+1}{k+1}$، وهي أساس مثلث تارتاليا.'
        ),
        problem: say('Kalkulatu $\\binom{12}{10}$ eta $\\binom{7}{3}+\\binom{7}{4}$.', 'Calcula $\\binom{12}{10}$ y $\\binom{7}{3}+\\binom{7}{4}$.', 'احسب $\\binom{12}{10}$ و$\\binom{7}{3}+\\binom{7}{4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Simetria: 10 aukeratu = 2 utzi.', 'Simetría: elegir 10 = dejar 2.', 'التماثل: اختيار 10 = ترك 2.'), math: same('$\\binom{12}{2}=\\frac{12\\cdot 11}{2}=66$') },
            { text: say('$\\binom{7}{3}=35$ eta, simetriaz, $\\binom{7}{4}=35$.', '$\\binom{7}{3}=35$ y, por simetría, $\\binom{7}{4}=35$.', '$\\binom{7}{3}=35$ وبالتماثل $\\binom{7}{4}=35$.') },
            { text: say('Batura, triangeluaren erregelaz.', 'La suma, por la regla del triángulo.', 'المجموع بقاعدة المثلث.'), math: same('$\\binom{8}{4}=70$') }
        ],
        example: same('$\\binom{5}{2}=\\binom{5}{3}$'),
        takeaway: say('k aukeratzea n − k uztea da: simetria erabili kalkulu laburragorako.', 'Elegir k es dejar n − k: usa la simetría para un cálculo más corto.', 'اختيار k هو ترك n − k: استعمل التماثل لحساب أقصر.'),
        figure: (language) => <ComplementFigure language={language} />
    },
    {
        id: 'pascal',
        stage: 'combinations',
        title: say('Tartagliaren triangelua', 'El triángulo de Tartaglia', 'مثلث تارتاليا'),
        goal: say('Triangelua eraikitzea eta haren lerroak zenbaki konbinatorio gisa irakurtzea.', 'Construir el triángulo y leer sus filas como números combinatorios.', 'بناء المثلث وقراءة صفوفه كأعداد توافقية.'),
        explanation: say(
            'Tartagliaren (edo Pascalen) triangeluan, lerro bakoitza 1ekin hasi eta amaitzen da, eta barruko zenbaki bakoitza gaineko bien batura da. $n$. lerroa (0tik zenbatzen hasita) $\\binom{n}{0},\\ \\binom{n}{1},\\ \\ldots,\\ \\binom{n}{n}$ da: 4. lerroa 1, 4, 6, 4, 1. Simetrikoa da, $\\binom{n}{k}=\\binom{n}{n-k}$ delako. Lerro bateko zenbakien batura $2^{n}$ da: $n$ elementuko multzo batek $2^{n}$ azpimultzo ditu (elementu bakoitza sartu ala ez). Triangeluak $(a+b)^{n}$ garatzeko koefizienteak ere ematen ditu.',
            'En el triángulo de Tartaglia (o de Pascal), cada fila empieza y acaba en 1, y cada número interior es la suma de los dos de encima. La fila $n$ (contando desde 0) es $\\binom{n}{0},\\ \\binom{n}{1},\\ \\ldots,\\ \\binom{n}{n}$: la fila 4 es 1, 4, 6, 4, 1. Es simétrico, porque $\\binom{n}{k}=\\binom{n}{n-k}$. La suma de una fila es $2^{n}$: un conjunto de $n$ elementos tiene $2^{n}$ subconjuntos (cada elemento entra o no). El triángulo también da los coeficientes del desarrollo de $(a+b)^{n}$.',
            'في مثلث تارتاليا (أو باسكال) يبدأ كل صف وينتهي بـ1، وكل عدد داخلي مجموع العددين فوقه. الصف $n$ (بالعدّ من 0) هو $\\binom{n}{0},\\ \\binom{n}{1},\\ \\ldots,\\ \\binom{n}{n}$: الصف 4 هو 1، 4، 6، 4، 1. وهو متماثل لأن $\\binom{n}{k}=\\binom{n}{n-k}$. ومجموع صف هو $2^{n}$: لمجموعة من $n$ عنصرًا $2^{n}$ مجموعة جزئية (كل عنصر يدخل أو لا). ويعطي المثلث أيضًا معاملات نشر $(a+b)^{n}$.'
        ),
        problem: say('Eraiki 6. lerroa 5. lerrotik abiatuta: 1, 5, 10, 10, 5, 1.', 'Construye la fila 6 a partir de la fila 5: 1, 5, 10, 10, 5, 1.', 'ابنِ الصف 6 انطلاقًا من الصف 5: 1، 5، 10، 10، 5، 1.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturretan 1.', 'En los extremos, 1.', 'في الطرفين 1.') },
            { text: say('Batu ondoz ondoko bikoteak: 1 + 5, 5 + 10, 10 + 10…', 'Suma las parejas contiguas: 1 + 5, 5 + 10, 10 + 10…', 'اجمع الأزواج المتجاورة: 1 + 5، 5 + 10، 10 + 10…'), math: same('$1,\\ 6,\\ 15,\\ 20,\\ 15,\\ 6,\\ 1$') },
            { text: say('Lerroaren batura.', 'La suma de la fila.', 'مجموع الصف.'), math: same('$2^{6}=64$') }
        ],
        example: same('$\\binom{6}{3}=20$'),
        takeaway: say('Bakoitza gaineko bien batura; n. lerroak 2ⁿ batzen du.', 'Cada uno es la suma de los dos de encima; la fila n suma 2ⁿ.', 'كل عدد مجموع العددين فوقه؛ ومجموع الصف n هو 2ⁿ.'),
        figure: (language) => <PascalFigure language={language} />
    },

    /* ---------- 5. Problems ---------- */
    {
        id: 'which-model',
        stage: 'problems',
        title: say('Zein eredu?', '¿Qué modelo?', 'أي نموذج؟'),
        goal: say('Enuntziatu bakoitzean eredu egokia aukeratzea bi galderarekin: ordena eta errepikapena.', 'Elegir en cada enunciado el modelo adecuado con dos preguntas: orden y repetición.', 'اختيار النموذج المناسب في كل نص بسؤالين: الترتيب والتكرار.'),
        explanation: say(
            'Problema bat ebazteko, galdetu lehenik: ordenak axola du? Talde bera bi ordenatan desberdina bada (zerrendak, zenbakiak, sariak, karguak), ordenak axola du; berdina bada (batzordeak, nahasketak, eskuemateak, karta-eskuak), ez. Gero: elementuak errepika daitezke? Zifrak, koloreak edo emaitzak bai; pertsonak eta objektu bakarrak ez. Ordena bai eta errepikapena bai: $\\text{VR}$. Ordena bai eta errepikapena ez: $\\text{V}$ (eta guztiak ordenatzen badira, $\\text{P}$). Ordena ez: $\\text{C}$. Eredu bakar batek ez badu balio, erabili biderkaduraren erregela edo zuhaitza.',
            'Para resolver un problema, pregunta primero: ¿importa el orden? Si el mismo grupo en dos órdenes es distinto (listas, números, premios, cargos), importa; si es igual (comisiones, mezclas, saludos, manos de cartas), no. Después: ¿se pueden repetir los elementos? Las cifras, los colores o los resultados sí; las personas y los objetos únicos no. Con orden y con repetición: $\\text{VR}$. Con orden y sin repetición: $\\text{V}$ (y si se ordenan todos, $\\text{P}$). Sin orden: $\\text{C}$. Si ningún modelo sirve, usa el principio del producto o un árbol.',
            'لحل مسألة اسأل أولًا: هل يهم الترتيب؟ إذا كانت المجموعة نفسها بترتيبين مختلفة (قوائم، أعداد، جوائز، مناصب) فالترتيب مهم؛ وإذا كانت متماثلة (لجان، خلطات، مصافحات، أوراق لعب) فلا. ثم: هل يجوز تكرار العناصر؟ الأرقام والألوان والنتائج نعم، والأشخاص والأشياء الفريدة لا. مع الترتيب والتكرار: $\\text{VR}$. مع الترتيب دون تكرار: $\\text{V}$ (وإذا رُتّب الكل $\\text{P}$). دون ترتيب: $\\text{C}$. وإذا لم يصلح أي نموذج فاستعمل مبدأ الضرب أو شجرة.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Ligako partidak', 'Partidos de liga', 'مباريات الدوري'), text: say('20 talde, joan-etorrian: A–B eta B–A desberdinak.', '20 equipos a ida y vuelta: A–B y B–A son distintos.', '20 فريقًا ذهابًا وإيابًا: A–B وB–A مختلفان.'), math: same('$\\text{V}_{20,2}=380$') },
            { title: say('Margo-nahasketak', 'Mezclas de pintura', 'خلطات الطلاء'), text: say('8 kolore, 3ko nahasketak: ordenak ez du axola.', '8 colores, mezclas de 3: el orden no importa.', '8 ألوان، خلطات من 3: الترتيب لا يهم.'), math: same('$\\text{C}_{8,3}=56$') },
            { title: say('Kinielak', 'Quinielas', 'المراهنات'), text: say('14 partida, bakoitzean 1, X edo 2.', '14 partidos, en cada uno 1, X o 2.', '14 مباراة، في كل منها 1 أو X أو 2.'), math: same('$\\text{VR}_{3,14}=3^{14}$') }
        ],
        example: same('$\\text{V}_{n,n}=\\text{P}_n$'),
        takeaway: say('Bi galdera: ordenak axola du? Errepika daiteke? Erantzunek eredua ematen dute.', 'Dos preguntas: ¿importa el orden? ¿Se repite? Las respuestas dan el modelo.', 'سؤالان: هل يهم الترتيب؟ هل يتكرر؟ والإجابتان تعطيان النموذج.'),
        figure: (language) => <DecisionFigure language={language} />
    },
    {
        id: 'geometry',
        stage: 'problems',
        title: say('Bideak, zuzenak eta diagonalak', 'Caminos, rectas y diagonales', 'المسارات والمستقيمات والأقطار'),
        goal: say('Konbinazioak erabiltzea sare bateko bideak, puntuen arteko zuzenak eta poligono baten diagonalak zenbatzeko.', 'Usar las combinaciones para contar caminos en una cuadrícula, rectas entre puntos y diagonales de un polígono.', 'استعمال التوافيق لعدّ المسارات في شبكة والمستقيمات بين النقاط وأقطار مضلع.'),
        explanation: say(
            'Sare batean, eskuinera eta gora bakarrik mugituz, A-tik B-ra joateko bide bakoitza urrats-zerrenda bat da: adibidez, 5 eskuinera eta 3 gora, 8 urrats guztira. Bide bat aukeratzea 8 urratsetatik zeintzuk diren gora aukeratzea da: $\\binom{8}{3}=56$ bide. Lerrokatu gabeko $n$ puntutatik, zuzen bakoitza bi puntuk zehazten dute: $\\binom{n}{2}$ zuzen. $n$ aldeko poligono batean, erpinen arteko bikoteak $\\binom{n}{2}$ dira, eta haietatik $n$ aldeak: diagonalak $\\binom{n}{2}-n=\\frac{n(n-3)}{2}$.',
            'En una cuadrícula, moviéndose solo hacia la derecha y hacia arriba, cada camino de A a B es una lista de pasos: por ejemplo, 5 a la derecha y 3 hacia arriba, 8 pasos en total. Elegir un camino es elegir cuáles de los 8 pasos son hacia arriba: $\\binom{8}{3}=56$ caminos. Con $n$ puntos sin tres alineados, cada recta la determinan dos puntos: $\\binom{n}{2}$ rectas. En un polígono de $n$ lados, las parejas de vértices son $\\binom{n}{2}$, y de ellas $n$ son lados: las diagonales son $\\binom{n}{2}-n=\\frac{n(n-3)}{2}$.',
            'في شبكة، بالتحرك يمينًا وأعلى فقط، كل مسار من A إلى B قائمة خطوات: مثلًا 5 يمينًا و3 أعلى، 8 خطوات إجمالًا. اختيار مسار هو اختيار أي الخطوات الثماني إلى الأعلى: $\\binom{8}{3}=56$ مسارًا. ومن $n$ نقطة لا تقع ثلاث منها على استقامة، يحدّد كل مستقيم نقطتان: $\\binom{n}{2}$ مستقيمًا. وفي مضلع ذي $n$ ضلعًا أزواج الرؤوس $\\binom{n}{2}$ ومنها $n$ أضلاع: الأقطار $\\binom{n}{2}-n=\\frac{n(n-3)}{2}$.'
        ),
        problem: say('Sare batean, A-tik B-ra 5 urrats eskuinera eta 3 gora daude. Zenbat bide daude?', 'En una cuadrícula, de A a B hay 5 pasos a la derecha y 3 hacia arriba. ¿Cuántos caminos hay?', 'في شبكة، من A إلى B هناك 5 خطوات يمينًا و3 أعلى. كم مسارًا هناك؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bide bakoitza 8 urrats dira.', 'Cada camino son 8 pasos.', 'كل مسار 8 خطوات.'), math: same('$5+3=8$') },
            { text: say('Aukeratu zein 3 diren gora.', 'Elige cuáles 3 son hacia arriba.', 'اختر أي 3 منها إلى الأعلى.'), math: same('$\\binom{8}{3}=\\frac{8\\cdot 7\\cdot 6}{6}$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.'), math: same('$\\binom{8}{3}=56$') }
        ],
        example: same('$\\frac{8\\cdot 5}{2}=20$'),
        takeaway: say('Bidea = urratsen zerrenda: aukeratu noiz igo. Diagonalak: n(n − 3)/2.', 'Camino = lista de pasos: elige cuándo subir. Diagonales: n(n − 3)/2.', 'المسار = قائمة خطوات: اختر متى تصعد. الأقطار: n(n − 3)/2.'),
        figure: (language) => <GridPathFigure language={language} />
    },
    {
        id: 'committees',
        stage: 'problems',
        title: say('Batzordeak eta problema konbinatuak', 'Comisiones y problemas combinados', 'اللجان والمسائل المركّبة'),
        goal: say('Eredu bat baino gehiago biderkatzea edo batzea problema konbinatuetan.', 'Multiplicar o sumar varios modelos en problemas combinados.', 'ضرب عدة نماذج أو جمعها في المسائل المركّبة.'),
        explanation: say(
            'Problema askotan aukeraketa bat baino gehiago egiten da batera, eta biderkaduraren erregelaz biderkatzen dira: 5 mutiletatik 2 eta 4 neskatatik 3 dituen batzordea, $\\binom{5}{2}\\cdot\\binom{4}{3}=10\\cdot 4=40$. Baldintzak kasuetan banatzen baditu («gutxienez bi neska»), kasu bakoitza zenbatu eta batu: 2 neska edo 3 neska… Batzuetan errazagoa da aurkakoa: «gutxienez bat» = guztiak ken «bat ere ez». Karguak badaude (lehendakaria, idazkaria), ordenak axola du kargu horietan.',
            'En muchos problemas se hacen varias elecciones a la vez, y se multiplican por el principio del producto: una comisión de 2 de 5 chicos y 3 de 4 chicas, $\\binom{5}{2}\\cdot\\binom{4}{3}=10\\cdot 4=40$. Si la condición parte en casos («al menos dos chicas»), cuenta cada caso y suma: 2 chicas o 3 chicas… A veces es más fácil el contrario: «al menos uno» = todos menos «ninguno». Si hay cargos (presidente, secretario), el orden importa en esos cargos.',
            'في مسائل كثيرة نُجري عدة اختيارات معًا ونضربها بمبدأ الضرب: لجنة من 2 من 5 أولاد و3 من 4 بنات $\\binom{5}{2}\\cdot\\binom{4}{3}=10\\cdot 4=40$. وإذا قسم الشرط الحالات («بنتان على الأقل») فعُدّ كل حالة واجمع: بنتان أو ثلاث… وأحيانًا يكون العكس أسهل: «واحد على الأقل» = الكل ناقص «لا أحد». وإذا وُجدت مناصب (رئيس، أمين) فالترتيب مهم في تلك المناصب.'
        ),
        problem: say('Klase batean 5 mutil eta 4 neska daude. 2 mutil eta 3 neskako batzordea egin nahi da. Zenbat eratara?', 'En una clase hay 5 chicos y 4 chicas. Se quiere una comisión de 2 chicos y 3 chicas. ¿De cuántas formas?', 'في صف 5 أولاد و4 بنات. نريد لجنة من ولدين و3 بنات. بكم طريقة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Mutilak: 5etik 2.', 'Chicos: 2 de 5.', 'الأولاد: 2 من 5.'), math: same('$\\binom{5}{2}=10$') },
            { text: say('Neskak: 4tik 3.', 'Chicas: 3 de 4.', 'البنات: 3 من 4.'), math: same('$\\binom{4}{3}=4$') },
            { text: say('Biak batera: biderkatu.', 'Las dos a la vez: multiplica.', 'كلاهما معًا: اضرب.'), math: same('$10\\cdot 4=40$') }
        ],
        example: same('$2^{5}-1=31$'),
        takeaway: say('Aukeraketak batera: biderkatu. Kasu bereiziak: batu. «Gutxienez bat»: guztiak ken bat ere ez.', 'Elecciones a la vez: multiplica. Casos separados: suma. «Al menos uno»: todos menos ninguno.', 'اختيارات معًا: اضرب. حالات منفصلة: اجمع. «واحد على الأقل»: الكل ناقص لا أحد.'),
        figure: (language) => <CommitteeFigure language={language} />
    }
]

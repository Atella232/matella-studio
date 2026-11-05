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
import { combinatoricsAkLessonChecks, type CombinatoricsAkTopicId } from './lessonChecks'
import { combinatoricsAkLessonTexts } from './lessonTexts'

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
    { id: 'counting', tone: 'blue', title: { eu: 'Zenbatzen', es: 'Contar', en: 'Counting', ar: 'العدّ' } },
    { id: 'variations', tone: 'violet', title: { eu: 'Aldakuntzak', es: 'Variaciones', en: 'Arrangements', ar: 'التراتيب' } },
    { id: 'permutations', tone: 'mustard', title: { eu: 'Permutazioak', es: 'Permutaciones', en: 'Permutations', ar: 'التباديل' } },
    { id: 'combinations', tone: 'coral', title: { eu: 'Konbinazioak', es: 'Combinaciones', en: 'Combinations', ar: 'التوافيق' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'مسائل' } }
]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Counting ---------- */
    {
        id: 'tree',
        stage: 'counting',
        figureAfterSteps: true,
        title: say('Zuhaitz-diagramak', 'Diagramas de árbol', 'المخططات الشجرية', 'Tree diagrams'),
        goal: say('Aukera guztiak zuhaitz-diagrama batekin ordenatzea eta zenbatzea.', 'Ordenar y contar todas las posibilidades con un diagrama de árbol.', 'ترتيب كل الإمكانات وعدّها بمخطط شجري.', 'Organise and count all the possibilities with a tree diagram.'),
        needs: [
            { unit: 'dbh3/estadistica-probabilidad', topic: 'compound', title: { eu: 'Esperimentu konposatuak', es: 'Experimentos compuestos', en: 'Compound experiments', ar: 'التجارب المركّبة' } }
        ],
        problem: say('Jatetxe batean 3 lehen plater (entsalada, zopa, pasta) eta 2 bigarren plater (arraina, haragia) daude. Zenbat menu desberdin?', 'En un restaurante hay 3 primeros (ensalada, sopa, pasta) y 2 segundos (pescado, carne). ¿Cuántos menús distintos hay?', 'في مطعم 3 أطباق أولى (سلطة، حساء، معكرونة) وطبقان ثانيان (سمك، لحم). كم وجبة مختلفة؟', 'A restaurant has 3 starters (salad, soup, pasta) and 2 main courses (fish, meat). How many different menus are there?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen mailan, 3 adar: lehen plater bakoitzeko bat.', 'En el primer nivel, 3 ramas: una por primero.', 'في المستوى الأول 3 فروع: واحد لكل طبق أول.', 'On the first level, 3 branches: one for each starter.') },
            { text: say('Adar bakoitzetik 2 adar: bigarren platerak.', 'De cada rama salen 2: los segundos.', 'من كل فرع يخرج فرعان: الأطباق الثانية.', 'From each branch come 2: the main courses.') },
            { text: say('Zenbatu amaierak.', 'Cuenta los extremos.', 'عُدّ النهايات.', 'Count the ends.'), math: same('$3\\cdot 2=6$') }
        ],
        takeaway: say('Adar bakoitzaren amaiera emaitza bat da: zenbatu amaierak.', 'El final de cada rama es un resultado: cuenta los extremos.', 'نهاية كل فرع نتيجة: عُدّ النهايات.', 'The end of each branch is one outcome: count the ends.'),
        figure: (language) => <MenuTreeFigure language={language} />
    },
    {
        id: 'product',
        stage: 'counting',
        title: say('Biderkaduraren erregela', 'El principio del producto', 'مبدأ الضرب', 'The multiplication principle'),
        goal: say('Hainbat erabaki jarraian hartzean, aukera kopuruak biderkatzea.', 'Multiplicar los números de opciones cuando se toman varias decisiones seguidas.', 'ضرب أعداد الخيارات عند اتخاذ عدة قرارات متتالية.', 'Multiply the numbers of options when you make several decisions in a row.'),
        problem: say('Taberna batean 5 ogitarteko, 8 edari eta 4 postre daude. Zenbat menu (bat bakoitzetik)?', 'En un bar hay 5 bocadillos, 8 bebidas y 4 postres. ¿Cuántos menús (uno de cada)?', 'في مقهى 5 شطائر و8 مشروبات و4 حلويات. كم وجبة (واحد من كل نوع)؟', 'A bar has 5 sandwiches, 8 drinks and 4 desserts. How many menus (one of each) can you make?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ogitartekoa eta edaria.', 'Bocadillo y bebida.', 'شطيرة ومشروب.', 'Sandwich and drink.'), math: same('$5\\cdot 8=40$') },
            { text: say('Haietako bakoitzari, 4 postre.', 'A cada uno, 4 postres.', 'لكل منها 4 حلويات.', 'For each of them, 4 desserts.'), math: same('$40\\cdot 4=160$') },
            { text: say('«Eta» denez, biderkatu.', 'Como es «y», se multiplica.', 'لأنها «و» نضرب.', 'Because it is “and”, you multiply.') }
        ],
        takeaway: say('Erabakiak «eta» bidez: aukera kopuruak biderkatu.', 'Decisiones unidas con «y»: multiplica los números de opciones.', 'قرارات مربوطة بـ«و»: اضرب أعداد الخيارات.', 'Decisions joined by “and”: multiply the numbers of options.'),
        figure: (language) => <ProductGridFigure language={language} />
    },
    {
        id: 'factorial',
        stage: 'counting',
        figureAfterSteps: true,
        title: say('Faktoriala', 'El factorial', 'المضروب', 'The factorial'),
        goal: say('$n!$ kalkulatzea eta faktorialen zatiketak sinplifikatzea.', 'Calcular $n!$ y simplificar cocientes de factoriales.', 'حساب $n!$ واختصار قسمة المضاريب.', 'Calculate $n!$ and simplify quotients of factorials.'),
        problem: say('Kalkulatu $\\frac{8!}{5!}$ eta $\\frac{10!}{8!\\cdot 2!}$.', 'Calcula $\\frac{8!}{5!}$ y $\\frac{10!}{8!\\cdot 2!}$.', 'احسب $\\frac{8!}{5!}$ و$\\frac{10!}{8!\\cdot 2!}$.', 'Calculate $\\frac{8!}{5!}$ and $\\frac{10!}{8!\\cdot 2!}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $8!=8\\cdot 7\\cdot 6\\cdot 5!$ eta sinplifikatu.', 'Escribe $8!=8\\cdot 7\\cdot 6\\cdot 5!$ y simplifica.', 'اكتب $8!=8\\cdot 7\\cdot 6\\cdot 5!$ واختصر.', 'Write $8!=8\\cdot 7\\cdot 6\\cdot 5!$ and simplify.'), math: same('$8\\cdot 7\\cdot 6=336$') },
            { text: say('$10!=10\\cdot 9\\cdot 8!$', '$10!=10\\cdot 9\\cdot 8!$', '$10!=10\\cdot 9\\cdot 8!$', '$10!=10\\cdot 9\\cdot 8!$'), math: same('$\\frac{10\\cdot 9}{2}=45$') },
            { text: say('Ez kalkulatu faktorial osoak: sinplifikatu lehenago.', 'No calcules los factoriales enteros: simplifica antes.', 'لا تحسب المضاريب كاملة: اختصر أولًا.', 'Don\'t work out the full factorials: simplify first.') }
        ],
        takeaway: say('n! = n · (n − 1)!: sinplifikatu faktorialak biderkatu baino lehen.', 'n! = n · (n − 1)!: simplifica los factoriales antes de multiplicar.', 'n! = n · (n − 1)!: اختصر المضاريب قبل الضرب.', 'n! = n · (n − 1)!: simplify the factorials before multiplying.'),
        figure: (language) => <FactorialFigure language={language} />
    },

    /* ---------- 2. Variations ---------- */
    {
        id: 'with-repetition',
        stage: 'variations',
        figureAfterSteps: true,
        title: say('Errepikapenezko aldakuntzak', 'Variaciones con repetición', 'التراتيب مع التكرار', 'Arrangements with repetition'),
        goal: say('$n$ elementutatik $k$ ordenatuz eta errepikatuz har daitezkeen taldeak zenbatzea.', 'Contar los grupos de $k$ que se forman con $n$ elementos cuando importa el orden y se puede repetir.', 'عدّ مجموعات $k$ المكوّنة من $n$ عنصرًا عندما يهم الترتيب ويجوز التكرار.', 'Count the groups of $k$ that can be formed from $n$ elements when order matters and repetition is allowed.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'integer-powers', title: { eu: 'Berretzaile osoko berreturak', es: 'Potencias de exponente entero', en: 'Powers with integer exponents', ar: 'القوى ذات الأس الصحيح' } }
        ],
        problem: say('Zenbat lau zifrako zenbaki egin daitezke 1, 3, 5, 7, 9 zifrekin, errepikatuz?', '¿Cuántos números de cuatro cifras se pueden formar con las cifras 1, 3, 5, 7, 9, repitiendo?', 'كم عددًا من أربعة أرقام يمكن تكوينه بالأرقام 1، 3، 5، 7، 9 مع التكرار؟', 'How many four-digit numbers can be made from the digits 1, 3, 5, 7, 9, with repetition?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordenak axola du (1357 ≠ 7531) eta errepika daiteke.', 'Importa el orden (1357 ≠ 7531) y se puede repetir.', 'الترتيب مهم (1357 ≠ 7531) والتكرار جائز.', 'Order matters (1357 ≠ 7531) and repetition is allowed.') },
            { text: say('4 lauki, bakoitzean 5 aukera.', '4 casillas, 5 opciones en cada una.', '4 خانات، في كل منها 5 خيارات.', '4 slots, 5 options in each one.'), math: same('$5\\cdot 5\\cdot 5\\cdot 5$') },
            { text: say('Berretura gisa.', 'Como potencia.', 'على شكل قوة.', 'As a power.'), math: same('$\\text{VR}_{5,4}=5^{4}=625$') }
        ],
        takeaway: say('Ordena bai eta errepikapena bai: n ber k.', 'Con orden y con repetición: n elevado a k.', 'مع الترتيب والتكرار: n أس k.', 'With order and repetition: n to the power of k.'),
        figure: (language) => <RepetitionSlotsFigure language={language} />
    },
    {
        id: 'variations',
        stage: 'variations',
        figureAfterSteps: true,
        title: say('Aldakuntzak', 'Variaciones', 'التراتيب', 'Arrangements'),
        goal: say('Ordenak axola duenean eta ezin denean errepikatu, $\\text{V}_{n,k}$ kalkulatzea.', 'Calcular $\\text{V}_{n,k}$ cuando importa el orden y no se puede repetir.', 'حساب $\\text{V}_{n,k}$ عندما يهم الترتيب ولا يجوز التكرار.', 'Calculate $\\text{V}_{n,k}$ when order matters and repetition is not allowed.'),
        problem: say('10 liburu hautatu dira, eta urrezko, zilarrezko eta brontzezko sariak banatu behar dira. Zenbat eratara?', 'Se han seleccionado 10 libros y hay que repartir los premios de oro, plata y bronce. ¿De cuántas formas?', 'اختير 10 كتب ويجب توزيع الجوائز الذهبية والفضية والبرونزية. بكم طريقة؟', '10 books have been selected and the gold, silver and bronze prizes must be handed out. In how many ways?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordenak axola du (saria desberdina da) eta liburu batek ezin ditu bi sari jaso.', 'Importa el orden (el premio es distinto) y un libro no puede llevar dos premios.', 'الترتيب مهم (الجوائز مختلفة) ولا يأخذ الكتاب جائزتين.', 'Order matters (each prize is different), and one book cannot win two prizes.') },
            { text: say('10 aukera, gero 9, gero 8.', '10 opciones, luego 9, luego 8.', '10 خيارات ثم 9 ثم 8.', '10 options, then 9, then 8.'), math: same('$\\text{V}_{10,3}=10\\cdot 9\\cdot 8$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: same('$\\frac{10!}{7!}=720$') }
        ],
        takeaway: say('Ordena bai eta errepikapenik ez: n-tik beherantz biderkatu, k faktore.', 'Con orden y sin repetición: multiplica hacia abajo desde n, k factores.', 'مع الترتيب ودون تكرار: اضرب نزولًا من n، k عاملًا.', 'With order and without repetition: multiply downwards from n, with k factors.'),
        figure: (language) => <PodiumFigure language={language} />
    },
    {
        id: 'conditions',
        stage: 'variations',
        figureAfterSteps: true,
        title: say('Baldintzak dituzten zenbakiak', 'Números con condiciones', 'أعداد بشروط', 'Numbers with conditions'),
        goal: say('Lauki bakoitzaren aukerak banan-banan zenbatzea, baldintzak daudenean (0 hasieran ez, bikoitia…).', 'Contar las opciones de cada casilla una a una cuando hay condiciones (el 0 no al principio, par…).', 'عدّ خيارات كل خانة واحدة واحدة عند وجود شروط (لا 0 في البداية، زوجي…).', 'Count the options for each slot one at a time when there are conditions (0 not at the start, even…).'),
        problem: say('Zenbat hiru zifrako zenbaki daude zifrak errepikatu gabe?', '¿Cuántos números de tres cifras hay sin repetir cifras?', 'كم عددًا من ثلاثة أرقام دون تكرار الأرقام؟', 'How many three-digit numbers are there with no repeated digits?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen zifra: 1 eta 9 artean.', 'Primera cifra: del 1 al 9.', 'الرقم الأول: من 1 إلى 9.', 'First digit: from 1 to 9.'), math: same('$9$') },
            { text: say('Bigarrena: 10 zifretatik lehena kenduta (0 barne).', 'Segunda: las 10 cifras menos la primera (el 0 incluido).', 'الثاني: الأرقام العشرة ناقص الأول (يشمل 0).', 'Second: the 10 digits minus the first one (0 included).'), math: same('$9$') },
            { text: say('Hirugarrena: 8. Biderkatu.', 'Tercera: 8. Multiplica.', 'الثالث: 8. اضرب.', 'Third: 8. Multiply.'), math: same('$9\\cdot 9\\cdot 8=648$') }
        ],
        takeaway: say('Baldintza gehien duen laukitik hasi eta lauki bakoitzaren aukerak biderkatu.', 'Empieza por la casilla con más condiciones y multiplica las opciones de cada una.', 'ابدأ بالخانة ذات الشروط الأكثر واضرب خيارات كل خانة.', 'Start with the slot with the most conditions, and multiply the options of each one.'),
        figure: (language) => <ConditionsFigure language={language} />
    },

    /* ---------- 3. Permutations ---------- */
    {
        id: 'permutations',
        stage: 'permutations',
        title: say('Permutazioak', 'Permutaciones', 'التباديل', 'Permutations'),
        goal: say('$n$ elementu guztiak ordenatzeko erak kalkulatzea: $\\text{P}_n=n!$.', 'Calcular las formas de ordenar todos los $n$ elementos: $\\text{P}_n=n!$.', 'حساب طرق ترتيب كل العناصر $n$: $\\text{P}_n=n!$.', 'Calculate the ways to order all $n$ elements: $\\text{P}_n=n!$.'),
        problem: say('6 lagun ilara batean jarri behar dira. Zenbat eratara?', 'Hay que colocar a 6 amigos en una fila. ¿De cuántas formas?', 'يجب وضع 6 أصدقاء في صف. بكم طريقة؟', '6 friends have to be lined up in a row. In how many ways?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Denak ordenatzen dira, errepikatu gabe.', 'Se ordenan todos, sin repetir.', 'يُرتَّبون جميعًا دون تكرار.', 'All of them are ordered, without repetition.') },
            { text: say('Lehen tokian 6, bigarrenean 5…', 'En el primer lugar 6, en el segundo 5…', 'في المكان الأول 6، وفي الثاني 5…', 'First place: 6, second place: 5…'), math: same('$6\\cdot 5\\cdot 4\\cdot 3\\cdot 2\\cdot 1$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: same('$\\text{P}_6=6!=720$') }
        ],
        takeaway: say('Guztiak ordenatu, errepikatu gabe: n!.', 'Ordenar todos, sin repetir: n!.', 'ترتيب الكل دون تكرار: n!.', 'Order them all, without repetition: n!.'),
        figure: (language) => <OrdersFigure language={language} />
    },
    {
        id: 'restricted',
        stage: 'permutations',
        figureAfterSteps: true,
        title: say('Baldintzak dituzten ordenak', 'Órdenes con condiciones', 'ترتيبات بشروط', 'Orderings with conditions'),
        goal: say('Elementu batzuk elkarrekin, toki jakin batean edo bereizita egon behar direnean ordenak zenbatzea.', 'Contar órdenes cuando unos elementos deben ir juntos, en un lugar fijo o separados.', 'عدّ الترتيبات عندما يجب أن تكون بعض العناصر معًا أو في مكان محدد أو متباعدة.', 'Count orderings when some elements must go together, in a fixed place or kept apart.'),
        problem: say('5 lagun (A, B, C, D, E) argazki baterako ilaran jartzen dira, eta A eta B elkarren ondoan egon nahi dute. Zenbat eratara?', '5 amigos (A, B, C, D, E) se colocan en fila para una foto, y A y B quieren ir juntos. ¿De cuántas formas?', 'يقف 5 أصدقاء (A وB وC وD وE) في صف لصورة، ويريد A وB أن يتجاورا. بكم طريقة؟', '5 friends (A, B, C, D, E) line up in a row for a photo, and A and B want to stand together. In how many ways?'),
        stepsKind: 'steps',
        steps: [
            { text: say('[AB] bloke bat: 4 elementu ordenatu.', '[AB] es un bloque: ordena 4 elementos.', '[AB] كتلة: رتّب 4 عناصر.', '[AB] is one block: order 4 elements.'), math: same('$4!=24$') },
            { text: say('Blokea barrutik: AB edo BA.', 'El bloque por dentro: AB o BA.', 'الكتلة من الداخل: AB أو BA.', 'The order inside the block: AB or BA.'), math: same('$2!=2$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$2\\cdot 24=48$') }
        ],
        takeaway: say('Elkarrekin: bloke bat, eta gero barrutik. Bereizita: guztiak ken elkarrekin.', 'Juntos: un bloque, y después por dentro. Separados: todos menos juntos.', 'معًا: كتلة ثم من الداخل. متباعدان: الكل ناقص المتجاورين.', 'Together: one block, and then the order inside it. Apart: all orderings minus the ones together.'),
        figure: (language) => <BlockFigure language={language} />
    },
    {
        id: 'repeated',
        stage: 'permutations',
        figureAfterSteps: true,
        title: say('Elementu errepikatuak', 'Elementos repetidos', 'عناصر مكررة', 'Repeated elements'),
        goal: say('Elementu batzuk berdinak direnean ordenak zenbatzea.', 'Contar los órdenes cuando algunos elementos son iguales.', 'عدّ الترتيبات عندما تكون بعض العناصر متماثلة.', 'Count the orderings when some elements are the same.'),
        problem: say('Zenbat zazpi zifrako zenbaki egin daitezke 5, 5, 5, 5, 3, 3, 3 zifrekin?', '¿Cuántos números de siete cifras se pueden formar con las cifras 5, 5, 5, 5, 3, 3, 3?', 'كم عددًا من سبعة أرقام يمكن تكوينه بالأرقام 5، 5، 5، 5، 3، 3، 3؟', 'How many seven-digit numbers can be made from the digits 5, 5, 5, 5, 3, 3, 3?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zifra guztiak desberdinak balira, $7!$.', 'Si todas las cifras fueran distintas, $7!$.', 'لو كانت الأرقام كلها مختلفة لكان $7!$.', 'If all the digits were different, $7!$.') },
            { text: say('Zatitu bosten $4!$ eta hiruen $3!$ trukeez.', 'Divide entre los $4!$ cambios de los cincos y los $3!$ de los treses.', 'اقسم على $4!$ تبديلات الخمسات و$3!$ تبديلات الثلاثات.', 'Divide by the $4!$ rearrangements of the 5s and the $3!$ of the 3s.'), math: same('$\\frac{5040}{24\\cdot 6}$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: same('$\\frac{7!}{4!\\cdot 3!}=35$') }
        ],
        takeaway: say('n! zati elementu berdinen taldeen faktorialak.', 'n! entre los factoriales de los grupos de elementos iguales.', 'n! على مضاريب مجموعات العناصر المتماثلة.', 'n! divided by the factorials of the groups of identical elements.'),
        figure: (language) => <RepeatedDigitsFigure language={language} />
    },

    /* ---------- 4. Combinations ---------- */
    {
        id: 'combinations',
        stage: 'combinations',
        title: say('Konbinazioak', 'Combinaciones', 'التوافيق', 'Combinations'),
        goal: say('Ordenak axola ez duenean, $n$ elementutatik $k$ aukeratzeko erak kalkulatzea.', 'Calcular las formas de elegir $k$ de $n$ elementos cuando no importa el orden.', 'حساب طرق اختيار $k$ من $n$ عنصرًا عندما لا يهم الترتيب.', 'Calculate the ways to choose $k$ from $n$ elements when order does not matter.'),
        problem: say('Vicentek 10 diskotatik 3 oparitu nahi dizkio lagun bati. Zenbat eratara aukera ditzake?', 'Vicente quiere regalar a un amigo 3 discos de entre 10. ¿De cuántas formas puede elegirlos?', 'يريد فيسنتي أن يهدي صديقه 3 أقراص من 10. بكم طريقة يمكنه اختيارها؟', 'Vicente wants to give a friend 3 of 10 discs. In how many ways can he choose them?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordenak axola balu: $\\text{V}_{10,3}$.', 'Si importara el orden: $\\text{V}_{10,3}$.', 'لو كان الترتيب مهمًا: $\\text{V}_{10,3}$.', 'If order mattered: $\\text{V}_{10,3}$.'), math: same('$10\\cdot 9\\cdot 8=720$') },
            { text: say('Hiru diskoko talde bakoitza $3!=6$ aldiz dago.', 'Cada grupo de tres discos está $3!=6$ veces.', 'كل مجموعة من ثلاثة أقراص مكررة $3!=6$ مرات.', 'Each group of three discs appears $3!=6$ times.') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: same('$\\text{C}_{10,3}=\\frac{720}{6}=120$') }
        ],
        takeaway: say('Taldeak, ez zerrendak: aldakuntzak zati k!.', 'Grupos, no listas: variaciones entre k!.', 'مجموعات لا قوائم: التراتيب على k!.', 'Groups, not lists: arrangements divided by k!.'),
        figure: (language) => <HandshakeFigure language={language} />
    },
    {
        id: 'binomial',
        stage: 'combinations',
        title: say('Zenbaki konbinatorioak', 'Números combinatorios', 'الأعداد التوافقية', 'Binomial coefficients'),
        goal: say('$\\binom{n}{k}$ kalkulatzea eta haren propietateak erabiltzea.', 'Calcular $\\binom{n}{k}$ y usar sus propiedades.', 'حساب $\\binom{n}{k}$ واستعمال خصائصه.', 'Calculate $\\binom{n}{k}$ and use its properties.'),
        problem: say('Kalkulatu $\\binom{12}{10}$ eta $\\binom{7}{3}+\\binom{7}{4}$.', 'Calcula $\\binom{12}{10}$ y $\\binom{7}{3}+\\binom{7}{4}$.', 'احسب $\\binom{12}{10}$ و$\\binom{7}{3}+\\binom{7}{4}$.', 'Calculate $\\binom{12}{10}$ and $\\binom{7}{3}+\\binom{7}{4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Simetria: 10 aukeratu = 2 utzi.', 'Simetría: elegir 10 = dejar 2.', 'التماثل: اختيار 10 = ترك 2.', 'Symmetry: choosing 10 = leaving 2.'), math: same('$\\binom{12}{2}=\\frac{12\\cdot 11}{2}=66$') },
            { text: say('$\\binom{7}{3}=35$ eta, simetriaz, $\\binom{7}{4}=35$.', '$\\binom{7}{3}=35$ y, por simetría, $\\binom{7}{4}=35$.', '$\\binom{7}{3}=35$ وبالتماثل $\\binom{7}{4}=35$.', '$\\binom{7}{3}=35$ and, by symmetry, $\\binom{7}{4}=35$.') },
            { text: say('Batura, triangeluaren erregelaz.', 'La suma, por la regla del triángulo.', 'المجموع بقاعدة المثلث.', 'The sum, by the triangle rule.'), math: same('$\\binom{8}{4}=70$') }
        ],
        takeaway: say('k aukeratzea n − k uztea da: simetria erabili kalkulu laburragorako.', 'Elegir k es dejar n − k: usa la simetría para un cálculo más corto.', 'اختيار k هو ترك n − k: استعمل التماثل لحساب أقصر.', 'Choosing k means leaving n − k: use symmetry for a shorter calculation.'),
        figure: (language) => <ComplementFigure language={language} />
    },
    {
        id: 'pascal',
        stage: 'combinations',
        figureAfterSteps: true,
        title: say('Tartagliaren triangelua', 'El triángulo de Tartaglia', 'مثلث تارتاليا', 'Tartaglia\'s triangle'),
        goal: say('Triangelua eraikitzea eta haren lerroak zenbaki konbinatorio gisa irakurtzea.', 'Construir el triángulo y leer sus filas como números combinatorios.', 'بناء المثلث وقراءة صفوفه كأعداد توافقية.', 'Build the triangle and read its rows as binomial coefficients.'),
        needs: [
            { unit: 'dbh4-akademikoak/polinomios-fracciones', topic: 'binomial', title: { eu: 'Tartagliaren triangelua', es: 'El triángulo de Tartaglia', en: 'Tartaglia\'s triangle', ar: 'مثلث تارتاليا' } }
        ],
        problem: say('Eraiki 6. lerroa 5. lerrotik abiatuta: 1, 5, 10, 10, 5, 1.', 'Construye la fila 6 a partir de la fila 5: 1, 5, 10, 10, 5, 1.', 'ابنِ الصف 6 انطلاقًا من الصف 5: 1، 5، 10، 10، 5، 1.', 'Build row 6 from row 5: 1, 5, 10, 10, 5, 1.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturretan 1.', 'En los extremos, 1.', 'في الطرفين 1.', 'At the ends, 1.') },
            { text: say('Batu ondoz ondoko bikoteak: 1 + 5, 5 + 10, 10 + 10…', 'Suma las parejas contiguas: 1 + 5, 5 + 10, 10 + 10…', 'اجمع الأزواج المتجاورة: 1 + 5، 5 + 10، 10 + 10…', 'Add the neighbouring pairs: 1 + 5, 5 + 10, 10 + 10…'), math: same('$1,\\ 6,\\ 15,\\ 20,\\ 15,\\ 6,\\ 1$') },
            { text: say('Lerroaren batura.', 'La suma de la fila.', 'مجموع الصف.', 'The sum of the row.'), math: same('$2^{6}=64$') }
        ],
        takeaway: say('Bakoitza gaineko bien batura; n. lerroak 2ⁿ batzen du.', 'Cada uno es la suma de los dos de encima; la fila n suma 2ⁿ.', 'كل عدد مجموع العددين فوقه؛ ومجموع الصف n هو 2ⁿ.', 'Each one is the sum of the two above it; row n adds up to 2ⁿ.'),
        figure: (language) => <PascalFigure language={language} />
    },

    /* ---------- 5. Problems ---------- */
    {
        id: 'which-model',
        stage: 'problems',
        title: say('Zein eredu?', '¿Qué modelo?', 'أي نموذج؟', 'Which model?'),
        goal: say('Enuntziatu bakoitzean eredu egokia aukeratzea bi galderarekin: ordena eta errepikapena.', 'Elegir en cada enunciado el modelo adecuado con dos preguntas: orden y repetición.', 'اختيار النموذج المناسب في كل نص بسؤالين: الترتيب والتكرار.', 'Choose the right model for each problem by asking two questions: order and repetition.'),
        stepsKind: 'facts',
        steps: [
            { title: say('Ligako partidak', 'Partidos de liga', 'مباريات الدوري', 'League matches'), text: say('20 talde, joan-etorrian: A–B eta B–A desberdinak.', '20 equipos a ida y vuelta: A–B y B–A son distintos.', '20 فريقًا ذهابًا وإيابًا: A–B وB–A مختلفان.', '20 teams playing home and away: A–B and B–A are different.'), math: same('$\\text{V}_{20,2}=380$') },
            { title: say('Margo-nahasketak', 'Mezclas de pintura', 'خلطات الطلاء', 'Paint mixtures'), text: say('8 kolore, 3 koloreko nahasketak: ordenak ez du axola.', '8 colores, mezclas de 3: el orden no importa.', '8 ألوان، خلطات من 3: الترتيب لا يهم.', '8 colours, mixtures of 3: order does not matter.'), math: same('$\\text{C}_{8,3}=56$') },
            { title: say('Kinielak', 'Quinielas', 'المراهنات', 'Football pools'), text: say('14 partida, bakoitzean 1, X edo 2.', '14 partidos, en cada uno 1, X o 2.', '14 مباراة، في كل منها 1 أو X أو 2.', '14 matches, each with 1, X or 2.'), math: same('$\\text{VR}_{3,14}=3^{14}$') }
        ],
        takeaway: say('Bi galdera: ordenak axola du? Errepika daiteke? Erantzunek eredua ematen dute.', 'Dos preguntas: ¿importa el orden? ¿Se repite? Las respuestas dan el modelo.', 'سؤالان: هل يهم الترتيب؟ هل يتكرر؟ والإجابتان تعطيان النموذج.', 'Two questions: does order matter? Can it repeat? The answers give the model.'),
        figure: (language) => <DecisionFigure language={language} />
    },
    {
        id: 'geometry',
        stage: 'problems',
        figureAfterSteps: true,
        title: say('Bideak, zuzenak eta diagonalak', 'Caminos, rectas y diagonales', 'المسارات والمستقيمات والأقطار', 'Paths, straight lines and diagonals'),
        goal: say('Konbinazioak erabiltzea sare bateko bideak, puntuen arteko zuzenak eta poligono baten diagonalak zenbatzeko.', 'Usar las combinaciones para contar caminos en una cuadrícula, rectas entre puntos y diagonales de un polígono.', 'استعمال التوافيق لعدّ المسارات في شبكة والمستقيمات بين النقاط وأقطار مضلع.', 'Use combinations to count paths on a grid, straight lines between points and diagonals of a polygon.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'polygon-angles', title: { eu: 'Poligonoen angeluak', es: 'Ángulos de los polígonos', en: 'Angles of polygons', ar: 'زوايا المضلعات' } }
        ],
        problem: say('Sare batean, A-tik B-ra 5 urrats eskuinera eta 3 gora daude. Zenbat bide daude?', 'En una cuadrícula, de A a B hay 5 pasos a la derecha y 3 hacia arriba. ¿Cuántos caminos hay?', 'في شبكة، من A إلى B هناك 5 خطوات يمينًا و3 أعلى. كم مسارًا هناك؟', 'On a grid, from A to B there are 5 steps to the right and 3 up. How many paths are there?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bide bakoitza 8 urrats dira.', 'Cada camino son 8 pasos.', 'كل مسار 8 خطوات.', 'Each path is 8 steps.'), math: same('$5+3=8$') },
            { text: say('Aukeratu zein 3 diren gora.', 'Elige cuáles 3 son hacia arriba.', 'اختر أي 3 منها إلى الأعلى.', 'Choose which 3 are up.'), math: same('$\\binom{8}{3}=\\frac{8\\cdot 7\\cdot 6}{6}$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.', 'Result.'), math: same('$\\binom{8}{3}=56$') }
        ],
        takeaway: say('Bidea = urratsen zerrenda: aukeratu noiz igo. Diagonalak: n(n − 3)/2.', 'Camino = lista de pasos: elige cuándo subir. Diagonales: n(n − 3)/2.', 'المسار = قائمة خطوات: اختر متى تصعد. الأقطار: n(n − 3)/2.', 'Path = list of steps: choose when to go up. Diagonals: n(n − 3)/2.'),
        figure: (language) => <GridPathFigure language={language} />
    },
    {
        id: 'committees',
        stage: 'problems',
        figureAfterSteps: true,
        title: say('Batzordeak eta problema konbinatuak', 'Comisiones y problemas combinados', 'اللجان والمسائل المركّبة', 'Committees and combined problems'),
        goal: say('Eredu bat baino gehiago biderkatzea edo batzea problema konbinatuetan.', 'Multiplicar o sumar varios modelos en problemas combinados.', 'ضرب عدة نماذج أو جمعها في المسائل المركّبة.', 'Multiply or add several models in combined problems.'),
        problem: say('Klase batean 5 mutil eta 4 neska daude. 2 mutil eta 3 neskako batzordea egin nahi da. Zenbat eratara?', 'En una clase hay 5 chicos y 4 chicas. Se quiere una comisión de 2 chicos y 3 chicas. ¿De cuántas formas?', 'في صف 5 أولاد و4 بنات. نريد لجنة من ولدين و3 بنات. بكم طريقة؟', 'A class has 5 boys and 4 girls. They want a committee of 2 boys and 3 girls. In how many ways?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Mutilak: 5 mutiletatik 2.', 'Chicos: 2 de 5.', 'الأولاد: 2 من 5.', 'Boys: 2 of 5.'), math: same('$\\binom{5}{2}=10$') },
            { text: say('Neskak: 4 nesketatik 3.', 'Chicas: 3 de 4.', 'البنات: 3 من 4.', 'Girls: 3 of 4.'), math: same('$\\binom{4}{3}=4$') },
            { text: say('Biak batera: biderkatu.', 'Las dos a la vez: multiplica.', 'كلاهما معًا: اضرب.', 'Both at once: multiply.'), math: same('$10\\cdot 4=40$') }
        ],
        takeaway: say('Aukeraketak batera: biderkatu. Kasu bereiziak: batu. «Gutxienez bat»: guztiak ken bat ere ez.', 'Elecciones a la vez: multiplica. Casos separados: suma. «Al menos uno»: todos menos ninguno.', 'اختيارات معًا: اضرب. حالات منفصلة: اجمع. «واحد على الأقل»: الكل ناقص لا أحد.', 'Choices made at the same time: multiply. Separate cases: add. “At least one”: all minus “none”.'),
        figure: (language) => <CommitteeFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const combinatoricsAkTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...combinatoricsAkLessonTexts[topic.id as CombinatoricsAkTopicId], ...combinatoricsAkLessonChecks[topic.id as CombinatoricsAkTopicId] }))

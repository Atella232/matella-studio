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
import { pythagorasLessonChecks, type PythagorasTopicId } from './lessonChecks'
import { pythagorasLessonTexts } from './lessonTexts'

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
    { id: 'theorem', tone: 'blue', title: { eu: 'Teorema', es: 'El teorema', en: 'The theorem', ar: 'النظرية' } },
    { id: 'sides', tone: 'violet', title: { eu: 'Aldeak kalkulatu eta sailkatu', es: 'Calcular lados y clasificar', en: 'Calculate sides and classify', ar: 'حساب الأضلاع والتصنيف' } },
    { id: 'plane', tone: 'mustard', title: { eu: 'Irudi lauetan', es: 'En las figuras planas', en: 'In plane figures', ar: 'في الأشكال المستوية' } },
    { id: 'circle', tone: 'coral', title: { eu: 'Poligono erregularrak eta zirkunferentzia', es: 'Polígonos regulares y circunferencia', en: 'Regular polygons and circumference', ar: 'المضلعات المنتظمة والدائرة' } },
    { id: 'space', tone: 'green', title: { eu: 'Espazioa eta problemak', es: 'El espacio y los problemas', en: 'Space and problems', ar: 'الفضاء والمسائل' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. The theorem ---------- */
    {
        id: 'squares',
        stage: 'theorem',
        title: say('Aldeetako karratuak', 'Los cuadrados sobre los lados', 'المربعات على الأضلاع', 'The squares on the sides'),
        goal: say('Triangelu angeluzuzen baten aldeetan eraikitako karratuen azaleren arteko erlazioa ezagutzea.', 'Descubrir la relación entre las áreas de los cuadrados construidos sobre los lados de un triángulo rectángulo.', 'اكتشاف العلاقة بين مساحات المربعات المنشأة على أضلاع مثلث قائم.', 'Discover the relationship between the areas of the squares built on the sides of a right-angled triangle.'),
        problem: say('Triangelu angeluzuzen baten katetoen gaineko karratuek 57 cm² eta 57 cm² dituzte. Zein da hipotenusaren gainekoaren azalera?', 'Los cuadrados sobre los catetos de un triángulo rectángulo miden 57 cm² y 57 cm². ¿Qué área tiene el de la hipotenusa?', 'مساحتا المربعين على الضلعين القائمين في مثلث قائم 57 سم² و57 سم². ما مساحة المربع على الوتر؟', 'The squares on the legs of a right-angled triangle have areas of 57 cm² and 57 cm². What is the area of the square on the hypotenuse?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusarena handiena da: batu.', 'El de la hipotenusa es el grande: suma.', 'مربع الوتر هو الأكبر: اجمع.', 'The square on the hypotenuse is the big one: add them.'), math: same('$57+57=114$') },
            { text: say('Handiak 14 eta txiki batek 3 balitu? Kendu.', '¿Y si el grande midiera 14 y uno pequeño 3? Resta.', 'وإن كان الكبير 14 وأحد الصغيرين 3؟ اطرح.', 'What if the big one measured 14 and a small one measured 3? Subtract.'), math: same('$14-3=11$') }
        ],
        takeaway: say('Hipotenusaren karratua = katetoen karratuen batura.', 'Cuadrado de la hipotenusa = suma de los cuadrados de los catetos.', 'مربع الوتر = مجموع مربعي الضلعين القائمين.', 'Square of the hypotenuse = sum of the squares of the legs.'),
        figure: (language) => <SquaresFigure language={language} />
    },
    {
        id: 'formula',
        stage: 'theorem',
        title: say('Teoremaren formula', 'La fórmula del teorema', 'صيغة النظرية', 'The theorem\'s formula'),
        goal: say('Teorema formula gisa idaztea eta hipotenusa eta katetoak edozein izenekin ezagutzea.', 'Escribir el teorema como fórmula y reconocer la hipotenusa y los catetos se llamen como se llamen.', 'كتابة النظرية صيغةً والتعرّف إلى الوتر والضلعين القائمين مهما كانت أسماؤهما.', 'Write the theorem as a formula and recognise the hypotenuse and the legs, whatever letters they are given.'),
        problem: say('$PQR$ triangeluan angelu zuzena $Q$ erpinean dago. Idatzi Pitagorasen teorema.', 'En el triángulo $PQR$ el ángulo recto está en el vértice $Q$. Escribe el teorema de Pitágoras.', 'في المثلث $PQR$ الزاوية القائمة عند الرأس $Q$. اكتب نظرية فيثاغورس.', 'In triangle $PQR$ the right angle is at vertex $Q$. Write Pythagoras\' theorem.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusa $Q$-ren aurrean dagoen aldea da.', 'La hipotenusa es el lado opuesto a $Q$.', 'الوتر هو الضلع المقابل لـ$Q$.', 'The hypotenuse is the side opposite $Q$.'), math: same('$PR$') },
            { text: say('Haren karratua, bakarrik.', 'Su cuadrado, solo.', 'مربعه وحده.', 'Its square, on its own.'), math: same('$PR^{2}=PQ^{2}+QR^{2}$') }
        ],
        takeaway: say('Hipotenusa: batu. Katetoa: kendu. Triangelu angeluzuzenetan bakarrik.', 'Hipotenusa: suma. Cateto: resta. Solo en triángulos rectángulos.', 'الوتر: اجمع. الضلع القائم: اطرح. في المثلثات القائمة فقط.', 'Hypotenuse: add. Leg: subtract. Only in right-angled triangles.'),
        figure: (language) => <FormulaFigure language={language} />
    },
    {
        id: 'triples',
        stage: 'theorem',
        title: say('Hirukote pitagorikoak', 'Ternas pitagóricas', 'الثلاثيات الفيثاغورية', 'Pythagorean triples'),
        goal: say('Hiru zenbaki oso hirukote pitagorikoa diren egiaztatzea eta berriak sortzea.', 'Comprobar si tres números enteros forman una terna pitagórica y fabricar otras nuevas.', 'التحقق مما إذا كانت ثلاثة أعداد صحيحة ثلاثية فيثاغورية وصنع ثلاثيات جديدة.', 'Check whether three integers form a Pythagorean triple, and make new ones.'),
        problem: say('11, 60 eta 61 hirukote pitagorikoa da?', '¿Es 11, 60 y 61 una terna pitagórica?', 'هل 11 و60 و61 ثلاثية فيثاغورية؟', 'Is 11, 60 and 61 a Pythagorean triple?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi txikienen karratuak batu.', 'Suma los cuadrados de los dos menores.', 'اجمع مربعي الأصغرين.', 'Add the squares of the two smaller ones.'), math: same('$11^{2}+60^{2}=121+3600=3721$') },
            { text: say('Handienaren karratua.', 'El cuadrado del mayor.', 'مربع الأكبر.', 'The square of the largest.'), math: same('$61^{2}=3721$') },
            { text: say('Berdinak dira: bai.', 'Son iguales: sí.', 'متساويان: نعم.', 'They are equal: yes.') }
        ],
        takeaway: say('Bi txikienen karratuen batura = handienaren karratua. Biderkatuz, hirukote berriak.', 'Suma de cuadrados de los dos menores = cuadrado del mayor. Multiplicando, ternas nuevas.', 'مجموع مربعي الأصغرين = مربع الأكبر. وبالضرب ثلاثيات جديدة.', 'Sum of the squares of the two smaller ones = square of the largest. Multiplying gives new triples.'),
        figure: (language) => <TriplesFigure language={language} />
    },

    /* ---------- 2. Finding sides and classifying ---------- */
    {
        id: 'hypotenuse',
        stage: 'sides',
        title: say('Hipotenusa kalkulatu', 'Calcular la hipotenusa', 'حساب الوتر', 'Calculate the hypotenuse'),
        goal: say('Bi katetoak ezagututa hipotenusa kalkulatzea, zehatza edo hurbildua.', 'Calcular la hipotenusa conociendo los dos catetos, exacta o aproximada.', 'حساب الوتر بمعرفة الضلعين القائمين، دقيقًا أو تقريبيًا.', 'Calculate the hypotenuse when you know both legs, exactly or approximately.'),
        problem: say('Triangelu angeluzuzen baten katetoak 15 m eta 20 m dira. Kalkulatu hipotenusa.', 'Los catetos de un triángulo rectángulo miden 15 m y 20 m. Calcula la hipotenusa.', 'الضلعان القائمان في مثلث قائم 15 م و20 م. احسب الوتر.', 'The legs of a right-angled triangle measure 15 m and 20 m. Calculate the hypotenuse.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Karratuak.', 'Los cuadrados.', 'المربعات.', 'The squares.'), math: same('$15^{2}=225\\qquad 20^{2}=400$') },
            { text: say('Batu.', 'Suma.', 'اجمع.', 'Add.'), math: same('$225+400=625$') },
            { text: say('Erro karratua.', 'Raíz cuadrada.', 'الجذر التربيعي.', 'Square root.'), math: same('$\\sqrt{625}=25$') }
        ],
        takeaway: say('$a=\\sqrt{b^{2}+c^{2}}$. Erroa amaieran, ez zatika.', '$a=\\sqrt{b^{2}+c^{2}}$. La raíz al final, no por partes.', '$a=\\sqrt{b^{2}+c^{2}}$. الجذر في النهاية، لا لكل حد.', '$a=\\sqrt{b^{2}+c^{2}}$. Take the root at the end, not part by part.'),
        figure: (language) => <HypotenuseFigure language={language} />
    },
    {
        id: 'leg',
        stage: 'sides',
        title: say('Katetoa kalkulatu', 'Calcular un cateto', 'حساب ضلع قائم', 'Calculate a leg'),
        goal: say('Hipotenusa eta kateto bat ezagututa beste katetoa kalkulatzea.', 'Calcular un cateto conociendo la hipotenusa y el otro cateto.', 'حساب ضلع قائم بمعرفة الوتر والضلع الآخر.', 'Calculate a leg when you know the hypotenuse and the other leg.'),
        problem: say('Hipotenusa 25 cm da eta kateto bat 15 cm. Kalkulatu beste katetoa.', 'La hipotenusa mide 25 cm y un cateto 15 cm. Calcula el otro cateto.', 'الوتر 25 سم وأحد الضلعين القائمين 15 سم. احسب الضلع الآخر.', 'The hypotenuse measures 25 cm and one leg 15 cm. Calculate the other leg.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hipotenusaren karratua ken katetoarena.', 'Cuadrado de la hipotenusa menos el del cateto.', 'مربع الوتر ناقص مربع الضلع.', 'Square of the hypotenuse minus the square of the leg.'), math: same('$625-225=400$') },
            { text: say('Erro karratua.', 'Raíz cuadrada.', 'الجذر التربيعي.', 'Square root.'), math: same('$\\sqrt{400}=20$') },
            { text: say('Egiaztatu: katetoa < hipotenusa.', 'Comprueba: cateto < hipotenusa.', 'تحقّق: الضلع القائم < الوتر.', 'Check: leg < hypotenuse.'), math: same('$20<25$') }
        ],
        takeaway: say('$b=\\sqrt{a^{2}-c^{2}}$: handiaren karratua ken txikiarena.', '$b=\\sqrt{a^{2}-c^{2}}$: el cuadrado del grande menos el del pequeño.', '$b=\\sqrt{a^{2}-c^{2}}$: مربع الكبير ناقص مربع الصغير.', '$b=\\sqrt{a^{2}-c^{2}}$: the square of the hypotenuse minus the square of the leg.'),
        figure: (language) => <LegFigure language={language} />
    },
    {
        id: 'classify',
        stage: 'sides',
        title: say('Triangeluak angeluen arabera sailkatu', 'Clasificar triángulos según sus ángulos', 'تصنيف المثلثات حسب زواياها', 'Classify triangles by their angles'),
        goal: say('Hiru aldeak ezagututa triangelua angelu-zorrotza, angeluzuzena ala angelu-kamutsa den erabakitzea.', 'Decidir, conociendo los tres lados, si un triángulo es acutángulo, rectángulo u obtusángulo.', 'تحديد ما إذا كان المثلث حادًّا أو قائمًا أو منفرجًا بمعرفة أضلاعه الثلاثة.', 'Decide, knowing the three sides, whether a triangle is acute-angled, right-angled or obtuse-angled.'),
        problem: say('Sailkatu 28 dm, 45 dm eta 53 dm-ko aldeak dituen triangelua.', 'Clasifica el triángulo de lados 28 dm, 45 dm y 53 dm.', 'صنّف المثلث الذي أضلاعه 28 دسم و45 دسم و53 دسم.', 'Classify the triangle with sides 28 dm, 45 dm and 53 dm.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi txikienen karratuak batu.', 'Suma los cuadrados de los dos menores.', 'اجمع مربعي الأصغرين.', 'Add the squares of the two smaller ones.'), math: same('$784+2025=2809$') },
            { text: say('Handienaren karratua.', 'Cuadrado del mayor.', 'مربع الأكبر.', 'Square of the largest.'), math: same('$53^{2}=2809$') },
            { text: say('Berdinak: angeluzuzena.', 'Iguales: rectángulo.', 'متساويان: قائم الزاوية.', 'Equal: right-angled.') }
        ],
        takeaway: say('Txikiagoa: zorrotza. Berdina: zuzena. Handiagoa: kamutsa.', 'Menor: acutángulo. Igual: rectángulo. Mayor: obtusángulo.', 'أصغر: حاد. يساوي: قائم. أكبر: منفرج.', 'Smaller: acute-angled. Equal: right-angled. Bigger: obtuse-angled.'),
        figure: (language) => <ClassifyFigure language={language} />
    },

    /* ---------- 3. In plane figures ---------- */
    {
        id: 'triangle-height',
        stage: 'plane',
        needs: [{ unit: 'dbh1/geometria', topic: 'area-triangle', title: { eu: 'Triangeluaren, erronboaren eta trapezioaren azalera', es: 'Área del triángulo, del rombo y del trapecio', en: 'Area of the triangle, the rhombus and the trapezium', ar: 'مساحة المثلث والمعيّن وشبه المنحرف' } }],
        title: say('Triangelu isoszele eta aldeberdinen altuera', 'La altura de triángulos isósceles y equiláteros', 'ارتفاع المثلث المتساوي الساقين والمتساوي الأضلاع', 'The height of isosceles and equilateral triangles'),
        goal: say('Triangelu isoszele edo aldeberdin baten altuera kalkulatzea eta haren azalera aurkitzea.', 'Calcular la altura de un triángulo isósceles o equilátero y hallar su área.', 'حساب ارتفاع مثلث متساوي الساقين أو متساوي الأضلاع وإيجاد مساحته.', 'Calculate the height of an isosceles or equilateral triangle and find its area.'),
        problem: say('Triangelu isoszele baten alde desberdina 5 m da eta haren gaineko altuera 6 m. Zenbat dira alde berdinak?', 'El lado desigual de un triángulo isósceles mide 5 m y la altura sobre él 6 m. ¿Cuánto miden los lados iguales?', 'الضلع المختلف في مثلث متساوي الساقين 5 م والارتفاع عليه 6 م. كم طول الضلعين المتساويين؟', 'The unequal side of an isosceles triangle measures 5 m and the height on it is 6 m. How long are the equal sides?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarri-erdia.', 'Media base.', 'نصف القاعدة.', 'Half the base.'), math: same('$5\\mathbin{:}2=2{,}5$') },
            { text: say('Alde berdina hipotenusa da.', 'El lado igual es la hipotenusa.', 'الضلع المساوي هو الوتر.', 'The equal side is the hypotenuse.'), math: same('$\\sqrt{6^{2}+2{,}5^{2}}=\\sqrt{42{,}25}=6{,}5$') }
        ],
        takeaway: say('Altuerak oinarria erdibitzen du: oinarri-erdia katetoa da.', 'La altura parte la base: la media base es un cateto.', 'الارتفاع ينصّف القاعدة: نصف القاعدة ضلع قائم.', 'The height splits the base: half the base is a leg.'),
        figure: (language) => <IsoscelesHeightFigure language={language} />
    },
    {
        id: 'diagonals',
        stage: 'plane',
        needs: [{ unit: 'dbh1/figuras-planas', topic: 'quad-diagonals', title: { eu: 'Laukien diagonalak', es: 'Las diagonales de los cuadriláteros', en: 'The diagonals of quadrilaterals', ar: 'أقطار الرباعيات' } }],
        title: say('Laukizuzenak, karratuak eta erronboak', 'Rectángulos, cuadrados y rombos', 'المستطيلات والمربعات والمعيّنات', 'Rectangles, squares and rhombuses'),
        goal: say('Laukizuzen eta karratuen diagonala eta erronboen aldea edo diagonala kalkulatzea.', 'Calcular la diagonal de rectángulos y cuadrados y el lado o la diagonal de los rombos.', 'حساب قطر المستطيلات والمربعات وضلع المعيّن أو قطره.', 'Calculate the diagonal of rectangles and squares, and the side or the diagonal of rhombuses.'),
        problem: say('Erronbo baten aldea 8,5 m da, eta diagonal bat 15,4 m. Kalkulatu beste diagonala.', 'El lado de un rombo mide 8,5 m y una diagonal 15,4 m. Calcula la otra diagonal.', 'ضلع معيّن 8.5 م وأحد قطريه 15.4 م. احسب القطر الآخر.', 'The side of a rhombus measures 8.5 m and one diagonal 15.4 m. Calculate the other diagonal.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Diagonal-erdia.', 'La semidiagonal.', 'نصف القطر.', 'The half-diagonal.'), math: same('$15{,}4\\mathbin{:}2=7{,}7$') },
            { text: say('Beste diagonal-erdia: kenketa.', 'La otra semidiagonal: resta.', 'نصف القطر الآخر: بالطرح.', 'The other half-diagonal: subtract.'), math: same('$\\sqrt{8{,}5^{2}-7{,}7^{2}}=\\sqrt{12{,}96}=3{,}6$') },
            { text: say('Bikoiztu.', 'Duplícala.', 'ضاعفه.', 'Double it.'), math: same('$2\\cdot 3{,}6=7{,}2$') }
        ],
        takeaway: say('Laukizuzena: diagonala hipotenusa. Erronboa: aldea hipotenusa, diagonal-erdiak katetoak.', 'Rectángulo: la diagonal es la hipotenusa. Rombo: el lado es la hipotenusa y las semidiagonales, los catetos.', 'المستطيل: القطر هو الوتر. المعيّن: الضلع هو الوتر ونصفا القطرين ضلعاه القائمان.', 'Rectangle: the diagonal is the hypotenuse. Rhombus: the side is the hypotenuse and the half-diagonals are the legs.'),
        figure: (language) => <RectangleRhombusFigure language={language} />
    },
    {
        id: 'trapezoid',
        stage: 'plane',
        needs: [{ unit: 'dbh1/geometria', topic: 'area-triangle', title: { eu: 'Triangeluaren, erronboaren eta trapezioaren azalera', es: 'Área del triángulo, del rombo y del trapecio', en: 'Area of the triangle, the rhombus and the trapezium', ar: 'مساحة المثلث والمعيّن وشبه المنحرف' } }],
        title: say('Trapezioak', 'Trapecios', 'أشباه المنحرف', 'Trapeziums'),
        goal: say('Trapezio angeluzuzen eta isoszeleen altuera edo alde zeiharra kalkulatzea, eta azalera eta perimetroa aurkitzea.', 'Calcular la altura o el lado oblicuo de trapecios rectángulos e isósceles y hallar su área y su perímetro.', 'حساب ارتفاع أشباه المنحرف القائمة والمتساوية الساقين أو ضلعها المائل، وإيجاد مساحتها ومحيطها.', 'Calculate the height or the slanted side of right-angled and isosceles trapeziums, and find their area and perimeter.'),
        problem: say('Trapezio isoszele baten oinarriak 3,2 m eta 6,4 m dira, eta altuera 6,3 m. Kalkulatu alde zeiharra.', 'Las bases de un trapecio isósceles miden 3,2 m y 6,4 m, y la altura 6,3 m. Calcula el lado oblicuo.', 'قاعدتا شبه منحرف متساوي الساقين 3.2 م و6.4 م، وارتفاعه 6.3 م. احسب الضلع المائل.', 'The bases of an isosceles trapezium measure 3.2 m and 6.4 m, and the height is 6.3 m. Calculate the slanted side.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarrien kendura, zati bi.', 'La diferencia de las bases, entre dos.', 'فرق القاعدتين على اثنين.', 'The difference between the bases, divided by two.'), math: same('$(6{,}4-3{,}2)\\mathbin{:}2=1{,}6$') },
            { text: say('Alde zeiharra hipotenusa da.', 'El lado oblicuo es la hipotenusa.', 'الضلع المائل هو الوتر.', 'The slanted side is the hypotenuse.'), math: same('$\\sqrt{6{,}3^{2}+1{,}6^{2}}=\\sqrt{42{,}25}=6{,}5$') }
        ],
        takeaway: say('Angeluzuzena: $B-b$. Isoszelea: $(B-b)\\mathbin{:}2$. Alde zeiharra, hipotenusa.', 'Rectángulo: $B-b$. Isósceles: $(B-b)\\mathbin{:}2$. El lado oblicuo, hipotenusa.', 'القائم: $B-b$. المتساوي الساقين: $(B-b)\\mathbin{:}2$. الضلع المائل هو الوتر.', 'Right-angled: $B-b$. Isosceles: $(B-b)\\mathbin{:}2$. The slanted side is the hypotenuse.'),
        figure: (language) => <TrapezoidFigure language={language} />
    },

    /* ---------- 4. Regular polygons and the circle ---------- */
    {
        id: 'apothem',
        stage: 'circle',
        needs: [{ unit: 'dbh1/geometria', topic: 'area-circle', title: { eu: 'Poligono erregularren eta zirkuluaren azalera', es: 'Área de polígonos regulares y del círculo', en: 'Area of regular polygons and of the circle', ar: 'مساحة المضلعات المنتظمة والقرص' } }],
        title: say('Poligono erregularren apotema', 'La apotema de los polígonos regulares', 'عامد المضلعات المنتظمة', 'The apothem of regular polygons'),
        goal: say('Poligono erregular baten apotema kalkulatzea eta haren azalera aurkitzea.', 'Calcular la apotema de un polígono regular y hallar su área.', 'حساب عامد مضلع منتظم وإيجاد مساحته.', 'Calculate the apothem of a regular polygon and find its area.'),
        problem: say('11,7 cm-ko aldeko pentagono erregular bat 10 cm-ko erradioko zirkunferentzian inskribatuta dago. Kalkulatu apotema hamarrenetara.', 'Un pentágono regular de 11,7 cm de lado está inscrito en una circunferencia de 10 cm de radio. Calcula su apotema a las décimas.', 'مخمس منتظم طول ضلعه 11.7 سم مرسوم داخل دائرة نصف قطرها 10 سم. احسب عامده مقرّبًا إلى الأعشار.', 'A regular pentagon with a side of 11.7 cm is inscribed in a circumference with a radius of 10 cm. Calculate its apothem to one decimal place.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alde-erdia.', 'Medio lado.', 'نصف الضلع.', 'Half a side.'), math: same('$11{,}7\\mathbin{:}2=5{,}85$') },
            { text: say('Erradioa hipotenusa da.', 'El radio es la hipotenusa.', 'نصف القطر هو الوتر.', 'The radius is the hypotenuse.'), math: same('$\\sqrt{10^{2}-5{,}85^{2}}\\approx 8{,}1$') }
        ],
        takeaway: say('Erradioa hipotenusa; apotema eta alde-erdia katetoak.', 'El radio es la hipotenusa; la apotema y medio lado, los catetos.', 'نصف القطر هو الوتر؛ والعامد ونصف الضلع ضلعاه القائمان.', 'The radius is the hypotenuse; the apothem and half a side are the legs.'),
        figure: (language) => <ApothemFigure language={language} />
    },
    {
        id: 'chord',
        stage: 'circle',
        title: say('Kordak eta zentrorako distantzia', 'Cuerdas y distancia al centro', 'الأوتار والبعد عن المركز', 'Chords and distance from the centre'),
        goal: say('Korda baten luzera edo zentrotik kordarako distantzia kalkulatzea.', 'Calcular la longitud de una cuerda o la distancia del centro a la cuerda.', 'حساب طول وتر في الدائرة أو بعد المركز عنه.', 'Calculate the length of a chord, or the distance from the centre to the chord.'),
        problem: say('Zuzen bat 15 cm-ko erradioko zirkunferentzia baten zentrotik 10 cm-ra pasatzen da. Kalkulatu kordaren luzera hamarrenetara.', 'Una recta pasa a 10 cm del centro de una circunferencia de 15 cm de radio. Calcula la longitud de la cuerda a las décimas.', 'مستقيم يمر على بعد 10 سم من مركز دائرة نصف قطرها 15 سم. احسب طول الوتر مقرّبًا إلى الأعشار.', 'A straight line passes 10 cm from the centre of a circumference with a radius of 15 cm. Calculate the length of the chord to one decimal place.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Korda-erdia: erradioa hipotenusa.', 'Media cuerda: el radio es la hipotenusa.', 'نصف الوتر: نصف القطر هو الوتر.', 'Half the chord: the radius is the hypotenuse.'), math: same('$\\sqrt{15^{2}-10^{2}}=\\sqrt{125}\\approx 11{,}18$') },
            { text: say('Bikoiztu.', 'Duplica.', 'ضاعف.', 'Double it.'), math: same('$2\\cdot 11{,}18\\approx 22{,}4$') }
        ],
        takeaway: say('Erradioa hipotenusa; distantzia eta korda-erdia katetoak.', 'El radio es la hipotenusa; la distancia y media cuerda, los catetos.', 'نصف القطر هو الوتر؛ والبعد ونصف الوتر الضلعان القائمان.', 'The radius is the hypotenuse; the distance and half the chord are the legs.'),
        figure: (language) => <ChordFigure language={language} />
    },
    {
        id: 'tangent',
        stage: 'circle',
        needs: [{ unit: 'dbh1/figuras-planas', topic: 'line-circle', title: { eu: 'Zuzena eta zirkunferentzia', es: 'Recta y circunferencia', en: 'Straight line and circle', ar: 'المستقيم والدائرة' } }],
        title: say('Zuzenki ukitzaileak', 'Segmentos tangentes', 'قطع المماس', 'Tangent segments'),
        goal: say('Kanpoko puntu batetik zirkunferentzia batera doan zuzenki ukitzailea, erradioa edo distantzia kalkulatzea.', 'Calcular el segmento tangente desde un punto exterior, el radio o la distancia al centro.', 'حساب قطعة المماس من نقطة خارجية، أو نصف القطر، أو البعد عن المركز.', 'Calculate the tangent segment from an external point, the radius, or the distance to the centre.'),
        problem: say('$P$ puntua 89 cm-ra dago zentrotik, eta $PT$ zuzenki ukitzailea 80 cm da. Kalkulatu erradioa.', 'El punto $P$ está a 89 cm del centro y el segmento tangente $PT$ mide 80 cm. Calcula el radio.', 'النقطة $P$ تبعد 89 سم عن المركز، وقطعة المماس $PT$ طولها 80 سم. احسب نصف القطر.', 'Point $P$ is 89 cm from the centre and the tangent segment $PT$ measures 80 cm. Calculate the radius.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$OP$ hipotenusa da: kendu.', '$OP$ es la hipotenusa: resta.', '$OP$ هو الوتر: اطرح.', '$OP$ is the hypotenuse: subtract.'), math: same('$89^{2}-80^{2}=7921-6400=1521$') },
            { text: say('Erro karratua.', 'Raíz cuadrada.', 'الجذر التربيعي.', 'Square root.'), math: same('$\\sqrt{1521}=39$') }
        ],
        takeaway: say('Angelu zuzena ukitze-puntuan. Hipotenusa: zentrotik puntura.', 'Ángulo recto en el punto de tangencia. Hipotenusa: del centro al punto.', 'الزاوية القائمة عند نقطة التماس. الوتر: من المركز إلى النقطة.', 'Right angle at the point of tangency. Hypotenuse: from the centre to the point.'),
        figure: (language) => <TangentFigure language={language} />
    },

    /* ---------- 5. Space and problems ---------- */
    {
        id: 'box',
        stage: 'space',
        title: say('Ortoedroaren eta kuboaren diagonala', 'La diagonal del ortoedro y del cubo', 'قطر متوازي المستطيلات والمكعب', 'The diagonal of a cuboid and of a cube'),
        goal: say('Ortoedro, kubo eta zilindroetan sartzen den barra luzeena kalkulatzea.', 'Calcular la barra más larga que cabe en ortoedros, cubos y cilindros.', 'حساب أطول قضيب يدخل في متوازي المستطيلات والمكعب والأسطوانة.', 'Calculate the longest rod that fits inside cuboids, cubes and cylinders.'),
        problem: say('Kalkulatu 20 cm-ko ertzeko kubo baten diagonala hamarrenetara.', 'Calcula la diagonal de un cubo de 20 cm de arista a las décimas.', 'احسب قطر مكعب طول حرفه 20 سم مقرّبًا إلى الأعشار.', 'Calculate the diagonal of a cube with an edge of 20 cm, to one decimal place.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru dimentsioen karratuak batu.', 'Suma los cuadrados de las tres dimensiones.', 'اجمع مربعات الأبعاد الثلاثة.', 'Add the squares of the three dimensions.'), math: same('$400+400+400=1200$') },
            { text: say('Erro karratua.', 'Raíz cuadrada.', 'الجذر التربيعي.', 'Square root.'), math: same('$\\sqrt{1200}\\approx 34{,}6$') }
        ],
        takeaway: say('$D=\\sqrt{a^{2}+b^{2}+c^{2}}$: bi aldiz Pitagoras.', '$D=\\sqrt{a^{2}+b^{2}+c^{2}}$: dos veces Pitágoras.', '$D=\\sqrt{a^{2}+b^{2}+c^{2}}$: فيثاغورس مرتين.', '$D=\\sqrt{a^{2}+b^{2}+c^{2}}$: Pythagoras twice.'),
        figure: (language) => <BoxDiagonalFigure language={language} />
    },
    {
        id: 'grid',
        stage: 'space',
        title: say('Distantziak sarean', 'Distancias en la cuadrícula', 'المسافات على الشبكة', 'Distances on the grid'),
        goal: say('Sare batean edo planoan bi punturen arteko distantzia kalkulatzea.', 'Calcular la distancia entre dos puntos de una cuadrícula o del plano.', 'حساب المسافة بين نقطتين على شبكة أو في المستوى.', 'Calculate the distance between two points on a grid or on the plane.'),
        problem: say('Kalkulatu $A(2,1)$ eta $B(5,5)$ puntuen arteko distantzia.', 'Calcula la distancia entre los puntos $A(2,1)$ y $B(5,5)$.', 'احسب المسافة بين النقطتين $A(2,1)$ و$B(5,5)$.', 'Calculate the distance between points $A(2,1)$ and $B(5,5)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Horizontalean eta bertikalean.', 'En horizontal y en vertical.', 'أفقيًا وعموديًا.', 'Horizontally and vertically.'), math: same('$5-2=3\\qquad 5-1=4$') },
            { text: say('Hipotenusa.', 'La hipotenusa.', 'الوتر.', 'The hypotenuse.'), math: same('$\\sqrt{3^{2}+4^{2}}=\\sqrt{25}=5$') }
        ],
        takeaway: say('Zenbatu laukiak horizontalean eta bertikalean: katetoak dira.', 'Cuenta los cuadros en horizontal y en vertical: son los catetos.', 'عُدّ المربعات أفقيًا وعموديًا: إنها الضلعان القائمان.', 'Count the squares horizontally and vertically: they are the legs.'),
        figure: (language) => <GridFigure language={language} />
    },
    {
        id: 'problems',
        stage: 'space',
        title: say('Eguneroko problemak', 'Problemas cotidianos', 'مسائل من الحياة اليومية', 'Everyday problems'),
        goal: say('Eskailera, poste, soka eta antzeko problemetan triangelu angeluzuzena aurkitzea eta ebaztea.', 'Encontrar el triángulo rectángulo en problemas de escaleras, postes, cuerdas y similares, y resolverlos.', 'إيجاد المثلث القائم في مسائل السلالم والأعمدة والحبال ونحوها وحلّها.', 'Find the right-angled triangle in problems about ladders, poles, ropes and similar, and solve them.'),
        problem: say('26 m-ko tirolina bat 24 m-ra dauden bi postetan lotuta dago. Lehen postean 50 m-ko altueran hasten bada, zer altueratan amaitzen da?', 'Una tirolina de 26 m está atada a dos postes que distan 24 m. Si sale del primero a 50 m de altura, ¿a qué altura llega al segundo?', 'حبل انزلاق طوله 26 م مربوط بعمودين بينهما 24 م. إذا بدأ من الأول على ارتفاع 50 م، فعلى أي ارتفاع يصل إلى الثاني؟', 'A 26 m zip line is tied to two poles that are 24 m apart. If it starts from the first pole at a height of 50 m, at what height does it reach the second pole?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Soka hipotenusa da; jaitsiera katetoa.', 'La cuerda es la hipotenusa; la bajada, un cateto.', 'الحبل هو الوتر؛ والنزول ضلع قائم.', 'The zip line is the hypotenuse; the drop is one leg.'), math: same('$\\sqrt{26^{2}-24^{2}}=\\sqrt{100}=10$') },
            { text: say('Kendu hasierako altuerari.', 'Réstalo de la altura inicial.', 'اطرحه من الارتفاع الأول.', 'Subtract it from the starting height.'), math: same('$50-10=40$') }
        ],
        takeaway: say('Marraztu, bilatu angelu zuzena, aukeratu hipotenusa eta egiaztatu.', 'Dibuja, busca el ángulo recto, elige la hipotenusa y comprueba.', 'ارسم، وابحث عن الزاوية القائمة، واختر الوتر، وتحقّق.', 'Draw it, find the right angle, pick the hypotenuse and check.'),
        figure: (language) => <LadderFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const pythagorasTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...pythagorasLessonTexts[topic.id as PythagorasTopicId], ...pythagorasLessonChecks[topic.id as PythagorasTopicId] }))

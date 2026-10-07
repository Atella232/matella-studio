import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Perimetroak, azalerak eta bolumenak · 4. DBH aplikatuak — diagnostic,
   guided practice, exercise bank and challenges. Exercises follow
   Santillana Aplicadas 4, unit 5 (the heptagon of apothem 5,2, the rhombus
   of 1,42 m, the circle of 1256 cm², the garden path, the hexagonal prism,
   the pool at 0,80 € the m³, the ice cream, the capsule) and Anaya
   Aplicadas 4, unit 10 (the ladder, the two roofs, the helipad, the cone
   roof, the well). Every closed answer is a single number without the
   unit; π ≈ 3,14 and non-exact roots are rounded to hundredths.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })
/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const [whole, decimals = ''] = text.split(',')
    return fraction(Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

const PI = say('Erabili $\\pi\\approx 3{,}14$.', 'Usa $\\pi\\approx 3{,}14$.', 'استعمل $\\pi\\approx 3{,}14$.')
const HUNDREDTHS = say('Hurbildu ehunenetara.', 'Aproxima a las centésimas.', 'قرّب إلى الأجزاء من مئة.')
/** A prompt followed by an instruction (π, rounding) */
const with_ = (prompt: LocalizedText, ...rules: LocalizedText[]): LocalizedText => ({
    eu: [prompt.eu, ...rules.map((rule) => rule.eu)].join(' '),
    es: [prompt.es, ...rules.map((rule) => rule.es)].join(' '),
    ar: [prompt.ar, ...rules.map((rule) => rule.ar)].join(' ')
})

export const areasVolumesDiagnostic: DiagnosticQuestion[] = [
    {
        id: 4501,
        prompt: say('Zenbat batzen dute hexagono baten barne-angeluek?', '¿Cuánto suman los ángulos interiores de un hexágono?', 'كم مجموع الزوايا الداخلية للمسدس؟'),
        options: [same('$720°$'), same('$1080°$'), same('$540°$')],
        correctIndex: 0,
        explanation: say('Lau triangelu: $180\\cdot 4=720$.', 'Cuatro triángulos: $180\\cdot 4=720$.', 'أربعة مثلثات: $180\\cdot 4=720$.'),
        topic: 'angles'
    },
    {
        id: 4502,
        prompt: say('Triangelu baten aldeak 5, 12 eta 13 dira. Nolakoa da?', 'Un triángulo tiene lados 5, 12 y 13. ¿Cómo es?', 'أضلاع مثلث 5 و12 و13. ما نوعه؟'),
        options: [say('Zorrotza', 'Acutángulo', 'حادّ'), say('Angeluzuzena', 'Rectángulo', 'قائم'), say('Kamutsa', 'Obtusángulo', 'منفرج')],
        correctIndex: 1,
        explanation: same('$25+144=169=13^{2}$'),
        topic: 'triangles'
    },
    {
        id: 4503,
        prompt: say('Triangelu angeluzuzen baten katetoak 6 cm eta 8 cm dira. Zenbat neurtzen du hipotenusak?', 'Los catetos de un triángulo rectángulo miden 6 cm y 8 cm. ¿Cuánto mide la hipotenusa?', 'الضلعان القائمان لمثلث قائم 6 سم و8 سم. كم طول الوتر؟'),
        options: [same('$14$'), same('$48$'), same('$10$')],
        correctIndex: 2,
        explanation: say('Ez batu aldeak: batu karratuak. $\\sqrt{36+64}=\\sqrt{100}=10$', 'No sumes los lados: suma los cuadrados. $\\sqrt{36+64}=\\sqrt{100}=10$', 'لا تجمع الأضلاع بل المربعات. $\\sqrt{36+64}=\\sqrt{100}=10$'),
        topic: 'right-triangles'
    },
    {
        id: 4504,
        prompt: say('Erronbo baten diagonalak 10 cm eta 6 cm dira. Zein da azalera?', 'Las diagonales de un rombo miden 10 cm y 6 cm. ¿Cuál es su área?', 'قطرا معيّن 10 سم و6 سم. ما مساحته؟'),
        options: [same('$60$'), same('$30$'), same('$16$')],
        correctIndex: 1,
        explanation: say('Diagonalen biderkadura zati bi: $\\frac{10\\cdot 6}{2}=30$.', 'Producto de las diagonales entre dos: $\\frac{10\\cdot 6}{2}=30$.', 'جداء القطرين على اثنين: $\\frac{10\\cdot 6}{2}=30$.'),
        topic: 'polygon-areas'
    },
    {
        id: 4505,
        prompt: with_(say('Zein da 10 cm-ko erradioko zirkulu baten azalera?', '¿Cuál es el área de un círculo de 10 cm de radio?', 'ما مساحة قرص نصف قطره 10 سم؟'), PI),
        options: [same('$62{,}8$'), same('$31{,}4$'), same('$314$')],
        correctIndex: 2,
        explanation: say('$3{,}14\\cdot 10^{2}=314$. 62,8 zirkunferentzia da.', '$3{,}14\\cdot 10^{2}=314$. 62,8 es la circunferencia.', '$3{,}14\\cdot 10^{2}=314$. و62.8 هو محيط الدائرة.'),
        topic: 'circle-areas'
    },
    {
        id: 4506,
        prompt: say('Zein da 10 cm-ko ertzeko kubo baten azalera osoa?', '¿Cuál es el área total de un cubo de 10 cm de arista?', 'ما المساحة الكلية لمكعب طول حرفه 10 سم؟'),
        options: [same('$600$'), same('$1000$'), same('$400$')],
        correctIndex: 0,
        explanation: say('Sei karratu: $6\\cdot 10^{2}=600$. 1000 bolumena da.', 'Seis cuadrados: $6\\cdot 10^{2}=600$. 1000 es el volumen.', 'ستة مربعات: $6\\cdot 10^{2}=600$. و1000 هو الحجم.'),
        topic: 'prism-area'
    },
    {
        id: 4507,
        prompt: say('Oinarri eta altuera bereko piramide baten eta prisma baten artean, piramidearen bolumena prismarena…', 'Entre una pirámide y un prisma de igual base y altura, el volumen de la pirámide es…', 'بين هرم ومنشور لهما القاعدة والارتفاع نفسيهما، حجم الهرم…'),
        options: [say('erdia da', 'la mitad', 'النصف'), say('berdina da', 'igual', 'مساوٍ'), say('herena da', 'un tercio', 'الثلث')],
        correctIndex: 2,
        explanation: say('Prisma hiru piramiderekin betetzen da: $V=\\frac{A_B\\cdot h}{3}$.', 'El prisma se llena con tres pirámides: $V=\\frac{A_B\\cdot h}{3}$.', 'يمتلئ المنشور بثلاثة أهرامات: $V=\\frac{A_B\\cdot h}{3}$.'),
        topic: 'pyramid-volume'
    },
    {
        id: 4508,
        prompt: say('Zenbat litro dira 1 m³?', '¿Cuántos litros son 1 m³?', 'كم لترًا في 1 م³؟'),
        options: [same('$100$'), same('$1000$'), same('$10$')],
        correctIndex: 1,
        explanation: say('1 dm³ = 1 L eta 1 m³-tan 1000 dm³ daude.', '1 dm³ = 1 L y en 1 m³ hay 1000 dm³.', '1 dm³ = 1 L وفي 1 م³ يوجد 1000 dm³.'),
        topic: 'prism-volume'
    }
]

export const areasVolumesPractice: PracticeItem[] = [
    /* ---------- Polygons and perimeters ---------- */
    {
        id: 1, stage: 'polygons',
        prompt: say('Zenbat gradu batzen dute oktogono baten barne-angeluek?', '¿Cuántos grados suman los ángulos interiores de un octógono?', 'كم درجة مجموع الزوايا الداخلية للمثمن؟'),
        expected: n(1080),
        hint: say('Oktogonoa 6 triangelutan banatzen da.', 'El octógono se divide en 6 triángulos.', 'ينقسم المثمن إلى 6 مثلثات.'),
        explanation: same('$180\\cdot (8-2)=1080$')
    },
    {
        id: 2, stage: 'polygons',
        prompt: say('Zenbat neurtzen du pentagono erregular baten angelu bakoitzak?', '¿Cuánto mide cada ángulo de un pentágono regular?', 'كم قياس كل زاوية في المخمس المنتظم؟'),
        expected: n(108),
        hint: say('Batura $180\\cdot 3$ da, 5 angelu berdinetan banatuta.', 'La suma es $180\\cdot 3$, repartida en 5 ángulos iguales.', 'المجموع $180\\cdot 3$ موزّع على 5 زوايا متساوية.'),
        explanation: same('$180\\cdot 3\\mathbin{:}5=108$')
    },
    {
        id: 3, stage: 'polygons',
        prompt: with_(say('Zenbat neurtzen du 5 cm-ko erradioko zirkunferentzia batek?', '¿Cuánto mide una circunferencia de 5 cm de radio?', 'كم طول دائرة نصف قطرها 5 سم؟'), PI),
        expected: v('31,4'),
        hint: same('$L=2\\pi r$'),
        explanation: same('$2\\cdot 3{,}14\\cdot 5=31{,}4$')
    },
    {
        id: 4, stage: 'polygons',
        prompt: with_(say('Zenbat neurtzen du 6 cm-ko erradioko zirkunferentzia bateko 60°-ko arku batek?', '¿Cuánto mide un arco de 60° de una circunferencia de 6 cm de radio?', 'كم طول قوس 60° من دائرة نصف قطرها 6 سم؟'), PI),
        expected: v('6,28'),
        hint: say('60° zirkunferentziaren seirena da.', '60° es la sexta parte de la circunferencia.', '60° سدس الدائرة.'),
        explanation: same('$\\frac{2\\cdot 3{,}14\\cdot 6\\cdot 60}{360}=6{,}28$')
    },

    /* ---------- Pythagoras ---------- */
    {
        id: 5, stage: 'pythagoras',
        prompt: say('Triangelu angeluzuzen baten katetoak 9 cm eta 12 cm dira. Zenbat neurtzen du hipotenusak?', 'Los catetos de un triángulo rectángulo miden 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?', 'الضلعان القائمان لمثلث قائم 9 سم و12 سم. كم طول الوتر؟'),
        expected: n(15),
        hint: say('Batu karratuak eta atera erroa.', 'Suma los cuadrados y saca la raíz.', 'اجمع المربعين واستخرج الجذر.'),
        explanation: same('$\\sqrt{81+144}=\\sqrt{225}=15$')
    },
    {
        id: 6, stage: 'pythagoras',
        prompt: say('Hipotenusak 13 cm neurtzen ditu eta kateto batek 5 cm. Zenbat neurtzen du beste katetoak?', 'La hipotenusa mide 13 cm y un cateto 5 cm. ¿Cuánto mide el otro cateto?', 'الوتر 13 سم وأحد الضلعين القائمين 5 سم. كم الضلع الآخر؟'),
        expected: n(12),
        hint: say('Katetoa: kendu karratuak.', 'Cateto: resta los cuadrados.', 'الضلع القائم: اطرح المربعين.'),
        explanation: same('$\\sqrt{169-25}=\\sqrt{144}=12$')
    },
    {
        id: 7, stage: 'pythagoras',
        prompt: with_(say('Kalkulatu 4 cm-ko aldeko hexagono erregular baten apotema.', 'Calcula la apotema de un hexágono regular de 4 cm de lado.', 'احسب عامد مسدس منتظم طول ضلعه 4 سم.'), HUNDREDTHS),
        expected: v('3,46'),
        hint: say('Hexagonoan erradioa aldea da: hipotenusa 4 eta kateto bat 2.', 'En el hexágono el radio es el lado: hipotenusa 4 y un cateto 2.', 'في المسدس نصف القطر يساوي الضلع: الوتر 4 وأحد الضلعين 2.'),
        explanation: same('$a=\\sqrt{16-4}=\\sqrt{12}\\approx 3{,}46$')
    },
    {
        id: 8, stage: 'pythagoras',
        prompt: with_(say('Bi eraikinek 35 m eta 21 m neurtzen dituzte, eta 56 m-ra daude. Zein da haien terrazen arteko distantzia?', 'Dos edificios miden 35 m y 21 m y están a 56 m uno del otro. ¿Qué distancia hay entre sus azoteas?', 'بنايتان ارتفاعهما 35 م و21 م والمسافة بينهما 56 م. كم المسافة بين سطحيهما؟'), HUNDREDTHS),
        expected: v('57,72'),
        hint: say('Altueren kendura kateto bat da: $35-21=14$.', 'La diferencia de alturas es un cateto: $35-21=14$.', 'فرق الارتفاعين ضلع قائم: $35-21=14$.'),
        explanation: same('$d=\\sqrt{14^{2}+56^{2}}=\\sqrt{3332}\\approx 57{,}72$')
    },

    /* ---------- Areas of plane figures ---------- */
    {
        id: 9, stage: 'plane-areas',
        prompt: say('Trapezio baten oinarriak 9 m eta 5 m dira, eta altuera 4 m. Kalkulatu azalera.', 'Un trapecio tiene bases de 9 m y 5 m y 4 m de altura. Calcula su área.', 'شبه منحرف قاعدتاه 9 م و5 م وارتفاعه 4 م. احسب مساحته.'),
        expected: n(28),
        hint: same('$A=\\frac{(B+b)\\cdot h}{2}$'),
        explanation: same('$\\frac{(9+5)\\cdot 4}{2}=28$')
    },
    {
        id: 10, stage: 'plane-areas',
        prompt: say('Erronbo baten diagonalak 1,42 m eta 62 cm dira. Kalkulatu azalera cm²-tan.', 'Las diagonales de un rombo miden 1,42 m y 62 cm. Calcula su área en cm².', 'قطرا معيّن 1.42 م و62 سم. احسب مساحته بالسنتيمتر المربع.'),
        expected: n(4402),
        hint: say('Lehenik, unitate berean: 1,42 m = 142 cm.', 'Primero, en la misma unidad: 1,42 m = 142 cm.', 'أولًا بالوحدة نفسها: 1.42 م = 142 سم.'),
        explanation: same('$\\frac{142\\cdot 62}{2}=4402$')
    },
    {
        id: 11, stage: 'plane-areas',
        prompt: with_(say('Zirkulu baten azalera 1256 cm² da. Zenbat neurtzen du erradioak?', 'Un círculo tiene 1256 cm² de área. ¿Cuánto mide su radio?', 'مساحة قرص 1256 سم². كم نصف قطره؟'), PI),
        expected: n(20),
        hint: say('Zatitu $\\pi$-z eta atera erroa.', 'Divide entre $\\pi$ y saca la raíz.', 'اقسم على $\\pi$ واستخرج الجذر.'),
        explanation: same('$r^{2}=1256\\mathbin{:}3{,}14=400\\to r=\\sqrt{400}=20$')
    },
    {
        id: 12, stage: 'plane-areas',
        prompt: with_(say('Kalkulatu 6 cm-ko erradioko 120°-ko sektore zirkular baten azalera.', 'Calcula el área de un sector circular de 120° y 6 cm de radio.', 'احسب مساحة قطاع دائري زاويته 120° ونصف قطره 6 سم.'), PI),
        expected: v('37,68'),
        hint: say('120° zirkuluaren herena da.', '120° es la tercera parte del círculo.', '120° ثلث القرص.'),
        explanation: same('$\\frac{3{,}14\\cdot 36\\cdot 120}{360}=37{,}68$')
    },

    /* ---------- Areas of solids ---------- */
    {
        id: 13, stage: 'solid-areas',
        prompt: say('Ortoedro baten neurriak 8 cm, 12 cm eta 18 cm dira. Kalkulatu azalera osoa.', 'Un ortoedro mide 8 cm, 12 cm y 18 cm. Calcula su área total.', 'متوازي مستطيلات أبعاده 8 سم و12 سم و18 سم. احسب مساحته الكلية.'),
        expected: n(912),
        hint: say('Hiru laukizuzen desberdin, bakoitza bi aldiz.', 'Tres rectángulos distintos, cada uno dos veces.', 'ثلاثة مستطيلات مختلفة، كل منها مرتان.'),
        explanation: same('$2\\cdot (96+144+216)=912$')
    },
    {
        id: 14, stage: 'solid-areas',
        prompt: with_(say('Zilindro batek 12 cm-ko erradioa eta 20 cm-ko altuera ditu. Kalkulatu azalera osoa.', 'Un cilindro tiene 12 cm de radio y 20 cm de altura. Calcula su área total.', 'أسطوانة نصف قطرها 12 سم وارتفاعها 20 سم. احسب مساحتها الكلية.'), PI),
        expected: v('2411,52'),
        hint: same('$A_T=2\\pi r(h+r)$'),
        explanation: same('$2\\cdot 3{,}14\\cdot 12\\cdot (20+12)=2411{,}52$')
    },
    {
        id: 15, stage: 'solid-areas',
        prompt: say('Piramide erregular baten oinarria 6 cm-ko aldeko karratua da eta apotema 5 cm. Kalkulatu azalera osoa.', 'Una pirámide regular tiene de base un cuadrado de 6 cm de lado y su apotema mide 5 cm. Calcula su área total.', 'قاعدة هرم منتظم مربع طول ضلعه 6 سم وعامده 5 سم. احسب مساحته الكلية.'),
        expected: n(96),
        hint: say('Lau triangelu gehi oinarria.', 'Cuatro triángulos más la base.', 'أربعة مثلثات مع القاعدة.'),
        explanation: same('$\\frac{24\\cdot 5}{2}+36=96$')
    },
    {
        id: 16, stage: 'solid-areas',
        prompt: with_(say('Kalkulatu 5 cm-ko erradioko esfera baten azalera.', 'Calcula el área de una esfera de 5 cm de radio.', 'احسب مساحة كرة نصف قطرها 5 سم.'), PI),
        expected: n(314),
        hint: same('$A=4\\pi r^{2}$'),
        explanation: same('$4\\cdot 3{,}14\\cdot 25=314$')
    },

    /* ---------- Volumes ---------- */
    {
        id: 17, stage: 'volumes',
        prompt: say('Prisma baten oinarria triangelu bat da (oinarria 6 cm, altuera 4 cm), eta prismaren altuera 10 cm. Kalkulatu bolumena.', 'La base de un prisma es un triángulo de 6 cm de base y 4 cm de altura, y el prisma mide 10 cm de alto. Calcula su volumen.', 'قاعدة منشور مثلث قاعدته 6 سم وارتفاعه 4 سم، وارتفاع المنشور 10 سم. احسب حجمه.'),
        expected: n(120),
        hint: say('Oinarriaren azalera bider altuera.', 'Área de la base por la altura.', 'مساحة القاعدة في الارتفاع.'),
        explanation: same('$\\frac{6\\cdot 4}{2}\\cdot 10=120$')
    },
    {
        id: 18, stage: 'volumes',
        prompt: with_(say('Biltegi zilindriko batek 2 m-ko erradioa eta 5 m-ko altuera ditu. Zenbat litro sartzen dira?', 'Un depósito cilíndrico tiene 2 m de radio y 5 m de altura. ¿Cuántos litros caben?', 'خزان أسطواني نصف قطره 2 م وارتفاعه 5 م. كم لترًا يسع؟'), PI),
        expected: n(62800),
        hint: say('Bolumena m³-tan, eta 1 m³ = 1000 L.', 'Volumen en m³, y 1 m³ = 1000 L.', 'الحجم بالمتر المكعب، و1 م³ = 1000 L.'),
        explanation: same('$3{,}14\\cdot 2^{2}\\cdot 5=62{,}8\\quad 62{,}8\\cdot 1000=62\\,800$')
    },
    {
        id: 19, stage: 'volumes',
        prompt: say('Piramide baten oinarria 6 cm-ko aldeko karratua da eta altuera 10 cm. Kalkulatu bolumena.', 'Una pirámide tiene de base un cuadrado de 6 cm de lado y 10 cm de altura. Calcula su volumen.', 'هرم قاعدته مربع طول ضلعه 6 سم وارتفاعه 10 سم. احسب حجمه.'),
        expected: n(120),
        hint: say('Prismaren herena.', 'Un tercio del prisma.', 'ثلث المنشور.'),
        explanation: same('$\\frac{36\\cdot 10}{3}=120$')
    },
    {
        id: 20, stage: 'volumes',
        prompt: with_(say('Kalkulatu 3 cm-ko erradioko esfera baten bolumena.', 'Calcula el volumen de una esfera de 3 cm de radio.', 'احسب حجم كرة نصف قطرها 3 سم.'), PI),
        expected: v('113,04'),
        hint: same('$V=\\frac{4}{3}\\pi r^{3}$'),
        explanation: same('$\\frac{4\\cdot 3{,}14\\cdot 27}{3}=113{,}04$')
    }
]

export const areasVolumesChallenges: ChallengeItem[] = [
    /* ---------- Polygons and perimeters ---------- */
    {
        id: 101, stage: 'polygons', points: 10, context: 'starter',
        prompt: say('Poligono erregular baten angelu bakoitzak 150° neurtzen ditu. Zenbat alde ditu?', 'Cada ángulo de un polígono regular mide 150°. ¿Cuántos lados tiene?', 'قياس كل زاوية في مضلع منتظم 150°. كم ضلعًا له؟'),
        expected: n(12),
        hint: say('Kanpo-angelua $180-150$ da, eta kanpo-angeluek 360° batzen dute.', 'El ángulo exterior es $180-150$ y los exteriores suman 360°.', 'الزاوية الخارجية $180-150$، ومجموع الزوايا الخارجية 360°.'),
        explanation: same('$180-150=30\\to 360\\mathbin{:}30=12$')
    },
    {
        id: 102, stage: 'polygons', points: 20, context: 'advanced',
        prompt: say('Poligono baten barne-angeluek 1440° batzen dute. Zenbat alde ditu?', 'Los ángulos interiores de un polígono suman 1440°. ¿Cuántos lados tiene?', 'مجموع الزوايا الداخلية لمضلع 1440°. كم ضلعًا له؟'),
        expected: n(10),
        hint: say('Zenbat triangelu dira? Gero gehitu 2.', '¿Cuántos triángulos son? Después suma 2.', 'كم مثلثًا؟ ثم أضف 2.'),
        explanation: same('$1440\\mathbin{:}180=8\\to 8+2=10$')
    },
    {
        id: 103, stage: 'polygons', points: 30, context: 'master',
        prompt: with_(say('Erloju baten minutu-orratzak 12 cm neurtzen ditu. Zenbat cm egiten ditu puntak 20 minututan?', 'El minutero de un reloj mide 12 cm. ¿Cuántos cm recorre su punta en 20 minutos?', 'عقرب الدقائق في ساعة طوله 12 سم. كم سنتيمترًا يقطع طرفه في 20 دقيقة؟'), PI),
        expected: v('25,12'),
        hint: say('20 minutu ordu baten herena da: 120°-ko arkua.', '20 minutos son un tercio de hora: un arco de 120°.', '20 دقيقة ثلث ساعة: قوس 120°.'),
        explanation: same('$\\frac{2\\cdot 3{,}14\\cdot 12}{3}=25{,}12$')
    },

    /* ---------- Pythagoras ---------- */
    {
        id: 104, stage: 'pythagoras', points: 10, context: 'starter',
        prompt: say('Laukizuzen batek 6 cm eta 8 cm neurtzen ditu. Zenbat neurtzen du diagonalak?', 'Un rectángulo mide 6 cm por 8 cm. ¿Cuánto mide su diagonal?', 'مستطيل بعداه 6 سم و8 سم. كم طول قطره؟'),
        expected: n(10),
        hint: say('Diagonala hipotenusa da.', 'La diagonal es la hipotenusa.', 'القطر هو الوتر.'),
        explanation: same('$\\sqrt{36+64}=10$')
    },
    {
        id: 105, stage: 'pythagoras', points: 20, context: 'advanced',
        prompt: say('5 m-ko eskailera bat hormaren kontra dago, oina hormatik 1,4 m-ra duela. Zer altueratan ukitzen du horma?', 'Una escalera de 5 m está apoyada en la pared con el pie a 1,4 m de ella. ¿A qué altura toca la pared?', 'سلّم طوله 5 م مستند إلى جدار وقاعدته على بعد 1.4 م منه. على أي ارتفاع يلمس الجدار؟'),
        expected: v('4,8'),
        hint: say('Eskailera hipotenusa da: kendu karratuak.', 'La escalera es la hipotenusa: resta los cuadrados.', 'السلّم هو الوتر: اطرح المربعين.'),
        explanation: same('$\\sqrt{25-1{,}96}=\\sqrt{23{,}04}=4{,}8$')
    },
    {
        id: 106, stage: 'pythagoras', points: 30, context: 'master',
        prompt: with_(say('Etxe-orratz baten gainean 27 m-ko diametroko plataforma zirkular bat dago. Lurreratzeko karratuaren erpinak ertzetik 2 m-ra daude, eta karratuaren barruan zirkulu bat dago, aldeak ukituz. Zein da zirkulu horren erradioa?', 'En lo alto de un rascacielos hay una plataforma circular de 27 m de diámetro. Los vértices del cuadrado de aterrizaje están a 2 m del borde, y dentro del cuadrado hay un círculo que toca sus lados. ¿Cuál es el radio de ese círculo?', 'فوق ناطحة سحاب منصة دائرية قطرها 27 م. رؤوس مربع الهبوط على بعد 2 م من الحافة، وداخل المربع دائرة تمسّ أضلاعه. ما نصف قطر هذه الدائرة؟'), HUNDREDTHS),
        expected: v('8,13'),
        hint: say('Karratuaren diagonala $27-4=23$ da, eta $d^{2}=l^{2}+l^{2}$.', 'La diagonal del cuadrado es $27-4=23$, y $d^{2}=l^{2}+l^{2}$.', 'قطر المربع $27-4=23$، و$d^{2}=l^{2}+l^{2}$.'),
        explanation: say('$2l^{2}=529$, beraz $l=\\sqrt{264{,}5}\\approx 16{,}26$. Erradioa aldearen erdia da: $r\\approx 8{,}13$.', '$2l^{2}=529$, así que $l=\\sqrt{264{,}5}\\approx 16{,}26$. El radio es medio lado: $r\\approx 8{,}13$.', '$2l^{2}=529$، إذن $l=\\sqrt{264{,}5}\\approx 16{,}26$. ونصف القطر نصف الضلع: $r\\approx 8{,}13$.')
    },

    /* ---------- Areas of plane figures ---------- */
    {
        id: 107, stage: 'plane-areas', points: 10, context: 'starter',
        prompt: with_(say('4 cm-ko aldeko karratu baten barruan zirkulu bat dago, aldeak ukituz. Zein da izkinetako azalera itzaleztatua?', 'Dentro de un cuadrado de 4 cm de lado hay un círculo que toca sus lados. ¿Cuál es el área sombreada de las esquinas?', 'داخل مربع طول ضلعه 4 سم قرص يمسّ أضلاعه. ما مساحة الزوايا المظلّلة؟'), PI),
        expected: v('3,44'),
        hint: say('Karratua ken zirkulua; erradioa 2 da.', 'Cuadrado menos círculo; el radio es 2.', 'المربع ناقص القرص؛ نصف القطر 2.'),
        explanation: same('$4^{2}-3{,}14\\cdot 2^{2}=3{,}44$')
    },
    {
        id: 108, stage: 'plane-areas', points: 20, context: 'advanced',
        prompt: with_(say('Kalkulatu 5 cm eta 3 cm-ko erradioko zirkunferentziek mugatutako koroa zirkularraren azalera.', 'Calcula el área de la corona circular limitada por circunferencias de 5 cm y 3 cm de radio.', 'احسب مساحة الحلقة الدائرية المحدودة بدائرتين نصفا قطريهما 5 سم و3 سم.'), PI),
        expected: v('50,24'),
        hint: same('$A=\\pi (R^{2}-r^{2})$'),
        explanation: same('$3{,}14\\cdot (25-9)=50{,}24$')
    },
    {
        id: 109, stage: 'plane-areas', points: 30, context: 'master',
        prompt: say('5 m × 4 m-ko gela bat 40 cm-ko aldeko lauza karratuekin estali nahi dugu. Zenbat lauza behar dira?', 'Queremos cubrir una habitación de 5 m × 4 m con baldosas cuadradas de 40 cm de lado. ¿Cuántas baldosas hacen falta?', 'نريد تغطية غرفة 5 م × 4 م ببلاطات مربعة طول ضلعها 40 سم. كم بلاطة يلزم؟'),
        expected: n(125),
        hint: say('Unitate berean: lauza bakoitza $0{,}4^{2}$ m² da.', 'En la misma unidad: cada baldosa son $0{,}4^{2}$ m².', 'بالوحدة نفسها: كل بلاطة $0{,}4^{2}$ م².'),
        explanation: same('$5\\cdot 4=20\\quad 0{,}4^{2}=0{,}16\\quad 20\\mathbin{:}0{,}16=125$')
    },

    /* ---------- Areas of solids ---------- */
    {
        id: 110, stage: 'solid-areas', points: 10, context: 'starter',
        prompt: with_(say('Lata batek 4 cm-ko erradioa eta 10 cm-ko altuera ditu. Zenbat paper behar da etiketarako (alboko azalera)?', 'Una lata tiene 4 cm de radio y 10 cm de altura. ¿Cuánto papel hace falta para la etiqueta (área lateral)?', 'علبة نصف قطرها 4 سم وارتفاعها 10 سم. كم يلزم من الورق للملصق (المساحة الجانبية)؟'), PI),
        expected: v('251,2'),
        hint: same('$A_L=2\\pi r h$'),
        explanation: same('$2\\cdot 3{,}14\\cdot 4\\cdot 10=251{,}2$')
    },
    {
        id: 111, stage: 'solid-areas', points: 20, context: 'advanced',
        prompt: with_(say('Dorre baten teilatua 5 m-ko erradioko eta 12 m-ko altuerako konoa da. Zenbat m² arbel behar dira estaltzeko?', 'El tejado de una torre es un cono de 5 m de radio y 12 m de altura. ¿Cuántos m² de pizarra hacen falta para cubrirlo?', 'سقف برج مخروط نصف قطره 5 م وارتفاعه 12 م. كم مترًا مربعًا من الأردواز يلزم لتغطيته؟'), PI),
        expected: v('204,1'),
        hint: say('Lehenik sortzailea: $g=\\sqrt{12^{2}+5^{2}}$.', 'Primero la generatriz: $g=\\sqrt{12^{2}+5^{2}}$.', 'أولًا الراسم: $g=\\sqrt{12^{2}+5^{2}}$.'),
        explanation: same('$g=\\sqrt{144+25}=13\\quad 3{,}14\\cdot 5\\cdot 13=204{,}1$')
    },
    {
        id: 112, stage: 'solid-areas', points: 30, context: 'master',
        prompt: say('Piramide erregular baten oinarria 16 cm-ko aldeko karratua da eta altuera 15 cm. Kalkulatu azalera osoa.', 'Una pirámide regular tiene de base un cuadrado de 16 cm de lado y 15 cm de altura. Calcula su área total.', 'هرم منتظم قاعدته مربع طول ضلعه 16 سم وارتفاعه 15 سم. احسب مساحته الكلية.'),
        expected: n(800),
        hint: say('Apotema: katetoak 15 eta 8.', 'Apotema: catetos 15 y 8.', 'العامد: الضلعان القائمان 15 و8.'),
        explanation: same('$\\sqrt{225+64}=17\\quad \\frac{64\\cdot 17}{2}+256=800$')
    },

    /* ---------- Volumes ---------- */
    {
        id: 113, stage: 'volumes', points: 10, context: 'starter',
        prompt: say('Akuario batek 60 cm × 30 cm × 40 cm neurtzen ditu. Zenbat litro sartzen dira?', 'Un acuario mide 60 cm × 30 cm × 40 cm. ¿Cuántos litros caben?', 'حوض سمك أبعاده 60 سم × 30 سم × 40 سم. كم لترًا يسع؟'),
        expected: n(72),
        hint: say('Bolumena cm³-tan eta 1000 cm³ = 1 L.', 'Volumen en cm³, y 1000 cm³ = 1 L.', 'الحجم بالسنتيمتر المكعب، و1000 سم³ = 1 L.'),
        explanation: same('$60\\cdot 30\\cdot 40=72\\,000\\quad 72\\,000\\mathbin{:}1000=72$')
    },
    {
        id: 114, stage: 'volumes', points: 20, context: 'advanced',
        prompt: with_(say('Kono batek 6 cm-ko erradioa eta 10 cm-ko sortzailea ditu. Kalkulatu bolumena.', 'Un cono tiene 6 cm de radio y 10 cm de generatriz. Calcula su volumen.', 'مخروط نصف قطره 6 سم وراسمه 10 سم. احسب حجمه.'), PI),
        expected: v('301,44'),
        hint: say('Bolumenean altuera doa: $h=\\sqrt{10^{2}-6^{2}}$.', 'En el volumen va la altura: $h=\\sqrt{10^{2}-6^{2}}$.', 'في الحجم الارتفاع: $h=\\sqrt{10^{2}-6^{2}}$.'),
        explanation: same('$h=\\sqrt{100-36}=8\\quad \\frac{3{,}14\\cdot 36\\cdot 8}{3}=301{,}44$')
    },
    {
        id: 115, stage: 'volumes', points: 30, context: 'master',
        prompt: with_(say('Kapsula itxurako biltegi bat 3 m-ko erradioko eta 10 m-ko altuerako zilindro bat da, muturretan bi esfera-erdirekin. Kalkulatu bolumena m³-tan.', 'Un depósito con forma de cápsula es un cilindro de 3 m de radio y 10 m de altura con dos semiesferas en los extremos. Calcula su volumen en m³.', 'خزان على شكل كبسولة: أسطوانة نصف قطرها 3 م وارتفاعها 10 م مع نصفي كرة في الطرفين. احسب حجمه بالمتر المكعب.'), PI),
        expected: v('395,64'),
        hint: say('Bi esfera-erdi esfera oso bat dira.', 'Dos semiesferas forman una esfera entera.', 'نصفا الكرة يكوّنان كرة كاملة.'),
        explanation: same('$3{,}14\\cdot 9\\cdot 10=282{,}6\\quad \\frac{4\\cdot 3{,}14\\cdot 27}{3}=113{,}04\\quad 282{,}6+113{,}04=395{,}64$')
    }
]

export const areasVolumesExerciseBank: ExerciseSection[] = [
    {
        id: 'polygons',
        title: say('Poligonoak eta perimetroak', 'Polígonos y perímetros', 'المضلعات والمحيطات'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Zenbat batzen dute pentagono baten barne-angeluek?', '¿Cuánto suman los ángulos interiores de un pentágono?', 'كم مجموع الزوايا الداخلية للمخمس؟'), solution: same('$180\\cdot 3=540$'), answer: { expected: n(540) } },
            { id: 2, difficulty: 'easy', question: say('Zenbat neurtzen du hexagono erregular baten angelu bakoitzak?', '¿Cuánto mide cada ángulo de un hexágono regular?', 'كم قياس كل زاوية في المسدس المنتظم؟'), solution: same('$720\\mathbin{:}6=120$'), answer: { expected: n(120) } },
            { id: 3, difficulty: 'easy', question: say('Sailkatu 7 cm, 7 cm eta 7 cm-ko triangelua aldeen eta angeluen arabera.', 'Clasifica según lados y ángulos el triángulo de lados 7 cm, 7 cm y 7 cm.', 'صنّف حسب الأضلاع والزوايا المثلث الذي أضلاعه 7 سم و7 سم و7 سم.'), solution: say('Aldeberdina eta zorrotza: $49<49+49$.', 'Equilátero y acutángulo: $49<49+49$.', 'متساوي الأضلاع وحادّ: $49<49+49$.') },
            { id: 4, difficulty: 'medium', question: say('Angeluzuzena da 8, 15 eta 17 aldeko triangelua?', '¿Es rectángulo el triángulo de lados 8, 15 y 17?', 'هل المثلث الذي أضلاعه 8 و15 و17 قائم؟'), solution: say('Bai: $64+225=289=17^{2}$.', 'Sí: $64+225=289=17^{2}$.', 'نعم: $64+225=289=17^{2}$.') },
            { id: 5, difficulty: 'medium', question: say('Zenbat neurtzen du dekagono erregular baten angelu bakoitzak?', '¿Cuánto mide cada ángulo de un decágono regular?', 'كم قياس كل زاوية في المعشّر المنتظم؟'), solution: same('$180\\cdot 8\\mathbin{:}10=144$'), answer: { expected: n(144) } },
            { id: 6, difficulty: 'medium', question: with_(say('Zenbat neurtzen du 10 cm-ko diametroko zirkunferentzia batek?', '¿Cuánto mide una circunferencia de 10 cm de diámetro?', 'كم طول دائرة قطرها 10 سم؟'), PI), solution: say('$L=\\pi d$: $3{,}14\\cdot 10=31{,}4$', '$L=\\pi d$: $3{,}14\\cdot 10=31{,}4$', '$L=\\pi d$: $3{,}14\\cdot 10=31{,}4$'), answer: { expected: v('31,4') } },
            { id: 7, difficulty: 'medium', question: say('Zein da 7,5 cm-ko aldeko hexagono erregular baten perimetroa?', '¿Cuál es el perímetro de un hexágono regular de 7,5 cm de lado?', 'ما محيط مسدس منتظم طول ضلعه 7.5 سم؟'), solution: same('$6\\cdot 7{,}5=45$'), answer: { expected: n(45) } },
            { id: 8, difficulty: 'hard', question: say('Badago 3 cm, 4 cm eta 8 cm-ko triangelurik?', '¿Existe un triángulo de lados 3 cm, 4 cm y 8 cm?', 'هل يوجد مثلث أضلاعه 3 سم و4 سم و8 سم؟'), solution: say('Ez: $3+4=7$, eta 7 < 8. Bi alde laburrek ez dute ixten.', 'No: $3+4=7$, y 7 < 8. Los dos lados cortos no llegan a cerrarlo.', 'لا: $3+4=7$ و7 < 8. الضلعان القصيران لا يغلقانه.') },
            { id: 9, difficulty: 'hard', question: with_(say('Kalkulatu 8 cm-ko erradioko zirkunferentzia bateko 45°-ko arkuaren luzera.', 'Calcula la longitud de un arco de 45° de una circunferencia de 8 cm de radio.', 'احسب طول قوس 45° من دائرة نصف قطرها 8 سم.'), PI), solution: same('$\\frac{2\\cdot 3{,}14\\cdot 8\\cdot 45}{360}=6{,}28$'), answer: { expected: v('6,28') } },
            { id: 10, difficulty: 'hard', question: with_(say('Zirkunferentzia batek 94,2 cm neurtzen ditu. Zein da erradioa?', 'Una circunferencia mide 94,2 cm. ¿Cuál es su radio?', 'طول دائرة 94.2 سم. ما نصف قطرها؟'), PI), solution: same('$94{,}2\\mathbin{:}(2\\cdot 3{,}14)=15$'), answer: { expected: n(15) } }
        ]
    },
    {
        id: 'pythagoras',
        title: say('Pitagorasen teorema', 'Teorema de Pitágoras', 'مبرهنة فيثاغورس'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Katetoak 5 cm eta 12 cm dira. Kalkulatu hipotenusa.', 'Los catetos miden 5 cm y 12 cm. Calcula la hipotenusa.', 'الضلعان القائمان 5 سم و12 سم. احسب الوتر.'), solution: same('$\\sqrt{25+144}=\\sqrt{169}=13$'), answer: { expected: n(13) } },
            { id: 12, difficulty: 'easy', question: say('Hipotenusa 10 cm eta kateto bat 6 cm. Kalkulatu beste katetoa.', 'Hipotenusa 10 cm y un cateto 6 cm. Calcula el otro cateto.', 'الوتر 10 سم وأحد الضلعين 6 سم. احسب الضلع الآخر.'), solution: same('$\\sqrt{100-36}=\\sqrt{64}=8$'), answer: { expected: n(8) } },
            { id: 13, difficulty: 'easy', question: say('Angeluzuzena da 6, 8 eta 11 aldeko triangelua?', '¿Es rectángulo el triángulo de lados 6, 8 y 11?', 'هل المثلث الذي أضلاعه 6 و8 و11 قائم؟'), solution: say('Ez: $36+64=100$ eta $11^{2}=121$. 121 handiagoa da: kamutsa.', 'No: $36+64=100$ y $11^{2}=121$. 121 es mayor: obtusángulo.', 'لا: $36+64=100$ و$11^{2}=121$. و121 أكبر: منفرج.') },
            { id: 14, difficulty: 'medium', question: with_(say('Katetoak 5 cm eta 7 cm dira. Kalkulatu hipotenusa.', 'Los catetos miden 5 cm y 7 cm. Calcula la hipotenusa.', 'الضلعان القائمان 5 سم و7 سم. احسب الوتر.'), HUNDREDTHS), solution: same('$\\sqrt{25+49}=\\sqrt{74}\\approx 8{,}60$'), answer: { expected: v('8,6') } },
            { id: 15, difficulty: 'medium', question: with_(say('Kalkulatu 8 cm-ko aldeko triangelu aldeberdin baten altuera.', 'Calcula la altura de un triángulo equilátero de 8 cm de lado.', 'احسب ارتفاع مثلث متساوي الأضلاع طول ضلعه 8 سم.'), HUNDREDTHS), solution: same('$\\sqrt{64-16}=\\sqrt{48}\\approx 6{,}93$'), answer: { expected: v('6,93') } },
            { id: 16, difficulty: 'medium', question: with_(say('Kalkulatu 5 cm-ko aldeko karratu baten diagonala.', 'Calcula la diagonal de un cuadrado de 5 cm de lado.', 'احسب قطر مربع طول ضلعه 5 سم.'), HUNDREDTHS), solution: same('$\\sqrt{25+25}=\\sqrt{50}\\approx 7{,}07$'), answer: { expected: v('7,07') } },
            { id: 17, difficulty: 'medium', question: with_(say('Kalkulatu 10 cm-ko aldeko hexagono erregular baten apotema.', 'Calcula la apotema de un hexágono regular de 10 cm de lado.', 'احسب عامد مسدس منتظم طول ضلعه 10 سم.'), HUNDREDTHS), solution: same('$\\sqrt{100-25}=\\sqrt{75}\\approx 8{,}66$'), answer: { expected: v('8,66') } },
            { id: 18, difficulty: 'hard', question: say('Erronbo baten diagonalak 16 cm eta 12 cm dira. Zenbat neurtzen du aldeak?', 'Las diagonales de un rombo miden 16 cm y 12 cm. ¿Cuánto mide el lado?', 'قطرا معيّن 16 سم و12 سم. كم طول ضلعه؟'), solution: say('Erdiak katetoak dira: $\\sqrt{64+36}=10$.', 'Las mitades son los catetos: $\\sqrt{64+36}=10$.', 'النصفان هما الضلعان القائمان: $\\sqrt{64+36}=10$.'), answer: { expected: n(10) } },
            { id: 19, difficulty: 'hard', question: say('Trapezio isoszele baten oinarriak 20 cm eta 8 cm dira, eta alde okerrak 10 cm. Kalkulatu altuera.', 'Un trapecio isósceles tiene bases de 20 cm y 8 cm y lados oblicuos de 10 cm. Calcula su altura.', 'شبه منحرف متساوي الساقين قاعدتاه 20 سم و8 سم وساقاه 10 سم. احسب ارتفاعه.'), solution: same('$(20-8)\\mathbin{:}2=6\\quad \\sqrt{100-36}=8$'), answer: { expected: n(8) } },
            { id: 20, difficulty: 'hard', question: say('12 m-ko zutoin bat kable batez lotuta dago goitik lurrera, oinetik 5 m-ra. Zenbat neurtzen du kableak?', 'Un poste de 12 m está sujeto con un cable desde lo alto hasta el suelo, a 5 m de su base. ¿Cuánto mide el cable?', 'عمود طوله 12 م مثبت بسلك من أعلاه إلى الأرض على بعد 5 م من قاعدته. كم طول السلك؟'), solution: same('$\\sqrt{144+25}=\\sqrt{169}=13$'), answer: { expected: n(13) } }
        ]
    },
    {
        id: 'plane-areas',
        title: say('Irudi lauen azalerak', 'Áreas de figuras planas', 'مساحات الأشكال المستوية'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Kalkulatu 12 cm-ko oinarriko eta 7 cm-ko altuerako triangelu baten azalera.', 'Calcula el área de un triángulo de 12 cm de base y 7 cm de altura.', 'احسب مساحة مثلث قاعدته 12 سم وارتفاعه 7 سم.'), solution: same('$\\frac{12\\cdot 7}{2}=42$'), answer: { expected: n(42) } },
            { id: 22, difficulty: 'easy', question: say('Trapezio baten oinarriak 10 cm eta 6 cm dira, eta altuera 5 cm. Kalkulatu azalera.', 'Un trapecio tiene bases de 10 cm y 6 cm y 5 cm de altura. Calcula su área.', 'شبه منحرف قاعدتاه 10 سم و6 سم وارتفاعه 5 سم. احسب مساحته.'), solution: same('$\\frac{(10+6)\\cdot 5}{2}=40$'), answer: { expected: n(40) } },
            { id: 23, difficulty: 'easy', question: with_(say('Kalkulatu 3 cm-ko erradioko zirkulu baten azalera.', 'Calcula el área de un círculo de 3 cm de radio.', 'احسب مساحة قرص نصف قطره 3 سم.'), PI), solution: same('$3{,}14\\cdot 9=28{,}26$'), answer: { expected: v('28,26') } },
            { id: 24, difficulty: 'medium', question: say('Hexagono erregular baten aldea 6 cm da eta apotema 5,2 cm. Kalkulatu azalera.', 'Un hexágono regular tiene 6 cm de lado y 5,2 cm de apotema. Calcula su área.', 'مسدس منتظم طول ضلعه 6 سم وعامده 5.2 سم. احسب مساحته.'), solution: same('$\\frac{36\\cdot 5{,}2}{2}=93{,}6$'), answer: { expected: v('93,6') } },
            { id: 25, difficulty: 'medium', question: say('Erronbo baten aldea 10 cm da eta diagonal handia 16 cm. Kalkulatu azalera.', 'Un rombo tiene 10 cm de lado y 16 cm de diagonal mayor. Calcula su área.', 'معيّن طول ضلعه 10 سم وقطره الأكبر 16 سم. احسب مساحته.'), solution: say('Diagonal txikiaren erdia: $\\sqrt{100-64}=6$, beraz $d=12$ eta $\\frac{16\\cdot 12}{2}=96$.', 'Media diagonal menor: $\\sqrt{100-64}=6$, así que $d=12$ y $\\frac{16\\cdot 12}{2}=96$.', 'نصف القطر الأصغر: $\\sqrt{100-64}=6$، إذن $d=12$ و$\\frac{16\\cdot 12}{2}=96$.'), answer: { expected: n(96) } },
            { id: 26, difficulty: 'medium', question: with_(say('Kalkulatu 5 cm-ko erradioko 72°-ko sektore baten azalera.', 'Calcula el área de un sector de 72° y 5 cm de radio.', 'احسب مساحة قطاع زاويته 72° ونصف قطره 5 سم.'), PI), solution: same('$\\frac{3{,}14\\cdot 25\\cdot 72}{360}=15{,}7$'), answer: { expected: v('15,7') } },
            { id: 27, difficulty: 'medium', question: with_(say('Kalkulatu 7 cm eta 4 cm-ko erradioko koroa zirkular baten azalera.', 'Calcula el área de una corona circular de radios 7 cm y 4 cm.', 'احسب مساحة حلقة دائرية نصفا قطريها 7 سم و4 سم.'), PI), solution: same('$3{,}14\\cdot (49-16)=103{,}62$'), answer: { expected: v('103,62') } },
            { id: 28, difficulty: 'hard', question: say('Lursail bat 20 m × 12 m-ko laukizuzen bat da, eta alde txikian 12 m-ko oinarriko eta 9 m-ko altuerako triangelu bat du itsatsita. Kalkulatu azalera.', 'Una parcela es un rectángulo de 20 m × 12 m con un triángulo de 12 m de base y 9 m de altura pegado a su lado corto. Calcula su área.', 'قطعة أرض مستطيل 20 م × 12 م ملتصق بضلعه القصير مثلث قاعدته 12 م وارتفاعه 9 م. احسب مساحتها.'), solution: same('$20\\cdot 12+\\frac{12\\cdot 9}{2}=294$'), answer: { expected: n(294) } },
            { id: 29, difficulty: 'hard', question: with_(say('Kalkulatu 6 cm-ko aldeko triangelu aldeberdin baten azalera.', 'Calcula el área de un triángulo equilátero de 6 cm de lado.', 'احسب مساحة مثلث متساوي الأضلاع طول ضلعه 6 سم.'), HUNDREDTHS), solution: say('Altuera: $\\sqrt{36-9}=\\sqrt{27}\\approx 5{,}196$. Azalera: $6\\cdot 5{,}196\\mathbin{:}2\\approx 15{,}59$.', 'Altura: $\\sqrt{36-9}=\\sqrt{27}\\approx 5{,}196$. Área: $6\\cdot 5{,}196\\mathbin{:}2\\approx 15{,}59$.', 'الارتفاع: $\\sqrt{36-9}=\\sqrt{27}\\approx 5{,}196$. المساحة: $6\\cdot 5{,}196\\mathbin{:}2\\approx 15{,}59$.'), answer: { expected: v('15,59') } },
            { id: 30, difficulty: 'hard', question: with_(say('10 cm-ko aldeko karratu baten barruan zirkulu bat dago, aldeak ukituz. Kalkulatu karratuaren eta zirkuluaren arteko azalera.', 'Dentro de un cuadrado de 10 cm de lado hay un círculo que toca sus lados. Calcula el área entre el cuadrado y el círculo.', 'داخل مربع طول ضلعه 10 سم قرص يمسّ أضلاعه. احسب المساحة بين المربع والقرص.'), PI), solution: same('$100-3{,}14\\cdot 25=21{,}5$'), answer: { expected: v('21,5') } }
        ]
    },
    {
        id: 'solid-areas',
        title: say('Gorputzen azalerak', 'Áreas de los cuerpos', 'مساحات الأجسام'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Kalkulatu 5 cm-ko ertzeko kubo baten azalera osoa.', 'Calcula el área total de un cubo de 5 cm de arista.', 'احسب المساحة الكلية لمكعب طول حرفه 5 سم.'), solution: same('$6\\cdot 25=150$'), answer: { expected: n(150) } },
            { id: 32, difficulty: 'easy', question: say('Kalkulatu 4 cm × 3 cm × 12 cm-ko ortoedro baten azalera osoa.', 'Calcula el área total de un ortoedro de 4 cm × 3 cm × 12 cm.', 'احسب المساحة الكلية لمتوازي مستطيلات 4 سم × 3 سم × 12 سم.'), solution: same('$2\\cdot (12+48+36)=192$'), answer: { expected: n(192) } },
            { id: 33, difficulty: 'easy', question: with_(say('Kalkulatu 10 cm-ko erradioko esfera baten azalera.', 'Calcula el área de una esfera de 10 cm de radio.', 'احسب مساحة كرة نصف قطرها 10 سم.'), PI), solution: same('$4\\cdot 3{,}14\\cdot 100=1256$'), answer: { expected: n(1256) } },
            { id: 34, difficulty: 'medium', question: with_(say('Kalkulatu 3 cm-ko erradioko eta 10 cm-ko altuerako zilindro baten alboko azalera.', 'Calcula el área lateral de un cilindro de 3 cm de radio y 10 cm de altura.', 'احسب المساحة الجانبية لأسطوانة نصف قطرها 3 سم وارتفاعها 10 سم.'), PI), solution: same('$2\\cdot 3{,}14\\cdot 3\\cdot 10=188{,}4$'), answer: { expected: v('188,4') } },
            { id: 35, difficulty: 'medium', question: with_(say('Kono batek 6 cm-ko erradioa eta 8 cm-ko altuera ditu. Kalkulatu azalera osoa.', 'Un cono tiene 6 cm de radio y 8 cm de altura. Calcula su área total.', 'مخروط نصف قطره 6 سم وارتفاعه 8 سم. احسب مساحته الكلية.'), PI), solution: same('$g=\\sqrt{64+36}=10\\quad 3{,}14\\cdot 6\\cdot (10+6)=301{,}44$'), answer: { expected: v('301,44') } },
            { id: 36, difficulty: 'medium', question: say('Piramide erregular baten oinarria 6 cm-ko aldeko karratua da eta altuera 4 cm. Kalkulatu azalera osoa.', 'Una pirámide regular tiene de base un cuadrado de 6 cm de lado y 4 cm de altura. Calcula su área total.', 'هرم منتظم قاعدته مربع طول ضلعه 6 سم وارتفاعه 4 سم. احسب مساحته الكلية.'), solution: same('$\\sqrt{16+9}=5\\quad \\frac{24\\cdot 5}{2}+36=96$'), answer: { expected: n(96) } },
            { id: 37, difficulty: 'medium', question: say('Prisma baten oinarria 3, 4 eta 5 cm-ko aldeko triangelu angeluzuzena da, eta altuera 10 cm. Kalkulatu azalera osoa.', 'La base de un prisma es un triángulo rectángulo de lados 3, 4 y 5 cm, y su altura mide 10 cm. Calcula su área total.', 'قاعدة منشور مثلث قائم أضلاعه 3 و4 و5 سم، وارتفاعه 10 سم. احسب مساحته الكلية.'), solution: same('$12\\cdot 10+2\\cdot \\frac{3\\cdot 4}{2}=132$'), answer: { expected: n(132) } },
            { id: 38, difficulty: 'hard', question: with_(say('Ontzi zilindriko ireki batek (estalkirik gabe) 5 cm-ko erradioa eta 12 cm-ko altuera ditu. Zenbat txapa behar da?', 'Un bote cilíndrico abierto (sin tapa) tiene 5 cm de radio y 12 cm de altura. ¿Cuánta chapa hace falta?', 'علبة أسطوانية مفتوحة (بلا غطاء) نصف قطرها 5 سم وارتفاعها 12 سم. كم يلزم من الصفيح؟'), PI), solution: same('$2\\cdot 3{,}14\\cdot 5\\cdot 12+3{,}14\\cdot 25=455{,}3$'), answer: { expected: v('455,3') } },
            { id: 39, difficulty: 'hard', question: with_(say('Esfera baten azalera 314 cm² da. Zenbat neurtzen du erradioak?', 'Una esfera tiene 314 cm² de área. ¿Cuánto mide su radio?', 'مساحة كرة 314 سم². كم نصف قطرها؟'), PI), solution: same('$r^{2}=314\\mathbin{:}(4\\cdot 3{,}14)=25\\to r=5$'), answer: { expected: n(5) } },
            { id: 40, difficulty: 'hard', question: say('5 m × 4 m-ko eta 2,5 m-ko altuerako gela baten hormak eta sabaia margotu nahi ditugu. Zenbat m² dira?', 'Queremos pintar las paredes y el techo de una habitación de 5 m × 4 m y 2,5 m de altura. ¿Cuántos m² son?', 'نريد طلاء الجدران والسقف لغرفة 5 م × 4 م وارتفاعها 2.5 م. كم مترًا مربعًا؟'), solution: same('$2\\cdot (5+4)\\cdot 2{,}5+5\\cdot 4=65$'), answer: { expected: n(65) } }
        ]
    },
    {
        id: 'volumes',
        title: say('Bolumenak', 'Volúmenes', 'الحجوم'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Kalkulatu 3 cm-ko ertzeko kubo baten bolumena.', 'Calcula el volumen de un cubo de 3 cm de arista.', 'احسب حجم مكعب طول حرفه 3 سم.'), solution: same('$3^{3}=27$'), answer: { expected: n(27) } },
            { id: 42, difficulty: 'easy', question: say('Kalkulatu 2 m × 3 m × 4 m-ko ortoedro baten bolumena.', 'Calcula el volumen de un ortoedro de 2 m × 3 m × 4 m.', 'احسب حجم متوازي مستطيلات 2 م × 3 م × 4 م.'), solution: same('$2\\cdot 3\\cdot 4=24$'), answer: { expected: n(24) } },
            { id: 43, difficulty: 'easy', question: say('Zenbat litro dira 2,5 m³?', '¿Cuántos litros son 2,5 m³?', 'كم لترًا في 2.5 م³؟'), solution: same('$2{,}5\\cdot 1000=2500$'), answer: { expected: n(2500) } },
            { id: 44, difficulty: 'medium', question: with_(say('Kalkulatu 2 m-ko erradioko eta 5 m-ko altuerako zilindro baten bolumena.', 'Calcula el volumen de un cilindro de 2 m de radio y 5 m de altura.', 'احسب حجم أسطوانة نصف قطرها 2 م وارتفاعها 5 م.'), PI), solution: same('$3{,}14\\cdot 4\\cdot 5=62{,}8$'), answer: { expected: v('62,8') } },
            { id: 45, difficulty: 'medium', question: say('Piramide baten oinarria 5 cm-ko aldeko karratua da eta altuera 12 cm. Kalkulatu bolumena.', 'Una pirámide tiene de base un cuadrado de 5 cm de lado y 12 cm de altura. Calcula su volumen.', 'هرم قاعدته مربع طول ضلعه 5 سم وارتفاعه 12 سم. احسب حجمه.'), solution: same('$\\frac{25\\cdot 12}{3}=100$'), answer: { expected: n(100) } },
            { id: 46, difficulty: 'medium', question: with_(say('Kalkulatu 3 cm-ko erradioko eta 4 cm-ko altuerako kono baten bolumena.', 'Calcula el volumen de un cono de 3 cm de radio y 4 cm de altura.', 'احسب حجم مخروط نصف قطره 3 سم وارتفاعه 4 سم.'), PI), solution: same('$\\frac{3{,}14\\cdot 9\\cdot 4}{3}=37{,}68$'), answer: { expected: v('37,68') } },
            { id: 47, difficulty: 'medium', question: with_(say('Kalkulatu 6 cm-ko erradioko esfera baten bolumena.', 'Calcula el volumen de una esfera de 6 cm de radio.', 'احسب حجم كرة نصف قطرها 6 سم.'), PI), solution: same('$\\frac{4\\cdot 3{,}14\\cdot 216}{3}=904{,}32$'), answer: { expected: v('904,32') } },
            { id: 48, difficulty: 'hard', question: with_(say('Ureztatzeko putzu batek 1,2 m-ko diametroa eta 7 m-ko sakonera ditu. Zenbat litro ur sartzen dira?', 'Un pozo para riego tiene 1,2 m de diámetro y 7 m de profundidad. ¿Cuántos litros de agua caben?', 'بئر للري قطرها 1.2 م وعمقها 7 م. كم لترًا من الماء تسع؟'), PI), solution: same('$3{,}14\\cdot 0{,}6^{2}\\cdot 7=7{,}9128\\quad 7{,}9128\\cdot 1000=7912{,}8$'), answer: { expected: v('7912,8') } },
            { id: 49, difficulty: 'hard', question: with_(say('Denda bat 2 m-ko erradioko eta 3 m-ko altuerako zilindro bat da, gainean 1,5 m-ko altuerako teilatu konikoa duela. Kalkulatu bolumena.', 'Una tienda de campaña es un cilindro de 2 m de radio y 3 m de altura con un techo cónico de 1,5 m de altura. Calcula su volumen.', 'خيمة على شكل أسطوانة نصف قطرها 2 م وارتفاعها 3 م وفوقها سقف مخروطي ارتفاعه 1.5 م. احسب حجمها.'), PI), solution: same('$3{,}14\\cdot 4\\cdot 3+\\frac{3{,}14\\cdot 4\\cdot 1{,}5}{3}=43{,}96$'), answer: { expected: v('43,96') } },
            { id: 50, difficulty: 'hard', question: with_(say('15 cm-ko erradioko eta 25 cm-ko altuerako zilindro baten barruan oinarri eta altuera bereko kono bat dago. Zenbat litro geratzen dira hutsik?', 'Dentro de un cilindro de 15 cm de radio y 25 cm de altura hay un cono de la misma base y altura. ¿Cuántos litros quedan vacíos?', 'داخل أسطوانة نصف قطرها 15 سم وارتفاعها 25 سم مخروط له القاعدة والارتفاع نفساهما. كم لترًا يبقى فارغًا؟'), PI), solution: say('Konoak herena hartzen du; hutsik bi heren: $\\frac{2\\cdot 3{,}14\\cdot 225\\cdot 25}{3}=11\\,775$ cm³, hau da, $11{,}775$ L.', 'El cono ocupa un tercio; quedan vacíos dos tercios: $\\frac{2\\cdot 3{,}14\\cdot 225\\cdot 25}{3}=11\\,775$ cm³, es decir, $11{,}775$ L.', 'يشغل المخروط الثلث؛ ويبقى فارغًا الثلثان: $\\frac{2\\cdot 3{,}14\\cdot 225\\cdot 25}{3}=11\\,775$ سم³، أي $11{,}775$ L.'), answer: { expected: v('11,775') } }
        ]
    }
]

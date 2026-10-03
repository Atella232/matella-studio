import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Gorputz geometrikoak · 2. DBH — diagnostic, guided practice, exercise
   bank and challenges. Exercises follow Anaya 2.º ESO units 11–12 and
   Santillana 2.º ESO units 11–12 (the open water tank, the flowerpots
   shaped as frustums, the box lined with metal sheet, the hexagonal
   pyramid of lateral edge 13, Keops, the balls in a box). Every closed
   answer is a single number without the unit; π ≈ 3,14.
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

export const solidsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 1601,
        prompt: say('Zenbat ertz ditu prisma pentagonal batek?', '¿Cuántas aristas tiene un prisma pentagonal?', 'كم حرفًا للمنشور الخماسي؟'),
        options: [same('$15$'), same('$10$'), same('$7$')],
        correctIndex: 0,
        explanation: say('5 goiko oinarrian, 5 behekoan eta 5 alboetan: $3\\cdot 5=15$. 10 erpinak dira eta 7 aurpegiak.', '5 en la base de arriba, 5 en la de abajo y 5 laterales: $3\\cdot 5=15$. 10 son los vértices y 7 las caras.', '5 في القاعدة العليا و5 في السفلى و5 جانبية: $3\\cdot 5=15$. و10 هي الرؤوس و7 الأوجه.'),
        topic: 'elements'
    },
    {
        id: 1602,
        prompt: say('Poliedro ganbil batek 8 aurpegi eta 6 erpin ditu. Zenbat ertz ditu?', 'Un poliedro convexo tiene 8 caras y 6 vértices. ¿Cuántas aristas tiene?', 'متعدد أوجه محدّب له 8 أوجه و6 رؤوس. كم حرفًا له؟'),
        options: [same('$14$'), same('$12$'), same('$16$')],
        correctIndex: 1,
        explanation: say('Euler: $8+6=12+2$. Oktaedroa da.', 'Euler: $8+6=12+2$. Es el octaedro.', 'أويلر: $8+6=12+2$. إنه ثماني الأوجه.'),
        topic: 'euler'
    },
    {
        id: 1603,
        prompt: say('Zein poliedro erregularren aurpegiak dira pentagonoak?', '¿Qué poliedro regular tiene caras pentagonales?', 'أي متعدد أوجه منتظم أوجهه مخمسات؟'),
        options: [say('Ikosaedroa', 'Icosaedro', 'عشريني الأوجه'), say('Oktaedroa', 'Octaedro', 'ثماني الأوجه'), say('Dodekaedroa', 'Dodecaedro', 'اثنا عشري الأوجه')],
        correctIndex: 2,
        explanation: say('Dodekaedroak 12 pentagono ditu. Ikosaedroa eta oktaedroa triangeluz eginda daude.', 'El dodecaedro tiene 12 pentágonos. El icosaedro y el octaedro están hechos de triángulos.', 'لاثني عشري الأوجه 12 مخمسًا. أما عشريني الأوجه وثماني الأوجه فمن مثلثات.'),
        topic: 'regular'
    },
    {
        id: 1604,
        prompt: say('Zein da 5 cm-ko ertzeko kubo baten azalera osoa?', '¿Cuál es el área total de un cubo de 5 cm de arista?', 'ما المساحة الكلية لمكعب طول حرفه 5 سم؟'),
        options: [same('$150$ cm²'), same('$125$ cm²'), same('$25$ cm²')],
        correctIndex: 0,
        explanation: say('Sei karratu: $6\\cdot 5^{2}=150$. 125 bolumena da, eta 25 aurpegi bakarra.', 'Seis cuadrados: $6\\cdot 5^{2}=150$. 125 es el volumen y 25 una sola cara.', 'ستة مربعات: $6\\cdot 5^{2}=150$. و125 هو الحجم و25 وجه واحد.'),
        topic: 'prism-area'
    },
    {
        id: 1605,
        prompt: say('Piramide erregular baten alboko triangeluen altuerari zer deitzen zaio?', '¿Cómo se llama la altura de los triángulos laterales de una pirámide regular?', 'ما اسم ارتفاع المثلثات الجانبية في الهرم المنتظم؟'),
        options: [say('Piramidearen altuera', 'Altura de la pirámide', 'ارتفاع الهرم'), say('Piramidearen apotema', 'Apotema de la pirámide', 'عامد الهرم'), say('Oinarriaren apotema', 'Apotema de la base', 'عامد القاعدة')],
        correctIndex: 1,
        explanation: say('Apotema alboko aurpegian dago; altuera erpinetik oinarriaren zentrora doa, barrutik.', 'La apotema está en la cara lateral; la altura va del vértice al centro de la base, por dentro.', 'العامد على الوجه الجانبي؛ أما الارتفاع فيمتد من الرأس إلى مركز القاعدة من الداخل.'),
        topic: 'pyramid-area'
    },
    {
        id: 1606,
        prompt: say('Kono baten erradioa 5 cm da eta altuera 12 cm. Zenbat da sortzailea?', 'Un cono tiene 5 cm de radio y 12 cm de altura. ¿Cuánto mide la generatriz?', 'مخروط نصف قطره 5 سم وارتفاعه 12 سم. كم طول راسمه؟'),
        options: [same('$17$ cm'), same('$7$ cm'), same('$13$ cm')],
        correctIndex: 2,
        explanation: say('Sortzailea hipotenusa da: $\\sqrt{12^{2}+5^{2}}=\\sqrt{169}=13$.', 'La generatriz es la hipotenusa: $\\sqrt{12^{2}+5^{2}}=\\sqrt{169}=13$.', 'الراسم هو الوتر: $\\sqrt{12^{2}+5^{2}}=\\sqrt{169}=13$.'),
        topic: 'cone'
    },
    {
        id: 1607,
        prompt: say('Zenbat litro sartzen dira metro kubiko batean?', '¿Cuántos litros caben en un metro cúbico?', 'كم لترًا في المتر المكعب؟'),
        options: [same('$1000$'), same('$100$'), same('$10$')],
        correctIndex: 0,
        explanation: say('$1\\ \\text{m}^{3}=1000\\ \\text{dm}^{3}$ eta $1\\ \\text{dm}^{3}=1\\ \\text{L}$.', '$1\\ \\text{m}^{3}=1000\\ \\text{dm}^{3}$ y $1\\ \\text{dm}^{3}=1\\ \\text{L}$.', '$1\\ \\text{m}^{3}=1000\\ \\text{dm}^{3}$ و$1\\ \\text{dm}^{3}=1\\ \\text{L}$.'),
        topic: 'capacity'
    },
    {
        id: 1608,
        prompt: say('Prisma batek 90 cm³ ditu. Zenbat ditu oinarri eta altuera bereko piramideak?', 'Un prisma tiene 90 cm³. ¿Cuánto tiene la pirámide de igual base y altura?', 'حجم منشور 90 سم³. كم حجم الهرم المساوي له قاعدةً وارتفاعًا؟'),
        options: [same('$270$ cm³'), same('$30$ cm³'), same('$45$ cm³')],
        correctIndex: 1,
        explanation: say('Piramidea prismaren herena da: $90\\mathbin{:}3=30$.', 'La pirámide es un tercio del prisma: $90\\mathbin{:}3=30$.', 'الهرم ثلث المنشور: $90\\mathbin{:}3=30$.'),
        topic: 'pyramid-volume'
    }
]

export const solidsPractice: PracticeItem[] = [
    /* ---------- Polyhedra ---------- */
    {
        id: 1, stage: 'polyhedra',
        prompt: say('Zenbat ertz ditu piramide oktogonal batek?', '¿Cuántas aristas tiene una pirámide octogonal?', 'كم حرفًا للهرم الثماني؟'),
        expected: n(16),
        hint: say('Oinarriko ertzak gehi erpinera doazenak.', 'Las aristas de la base más las que suben al vértice.', 'أحرف القاعدة مع الأحرف الصاعدة إلى الرأس.'),
        explanation: same('$8+8=2\\cdot 8=16$')
    },
    {
        id: 2, stage: 'polyhedra',
        prompt: say('Prisma batek 24 ertz ditu. Zenbat alde ditu oinarriak?', 'Un prisma tiene 24 aristas. ¿Cuántos lados tiene su base?', 'لمنشور 24 حرفًا. كم ضلعًا لقاعدته؟'),
        expected: n(8),
        hint: say('Prismak $3n$ ertz ditu.', 'Un prisma tiene $3n$ aristas.', 'للمنشور $3n$ حرفًا.'),
        explanation: same('$24\\mathbin{:}3=8$')
    },
    {
        id: 3, stage: 'polyhedra',
        prompt: say('Poliedro ganbil batek 12 aurpegi eta 30 ertz ditu. Zenbat erpin ditu?', 'Un poliedro convexo tiene 12 caras y 30 aristas. ¿Cuántos vértices tiene?', 'متعدد أوجه محدّب له 12 وجهًا و30 حرفًا. كم رأسًا له؟'),
        expected: n(20),
        hint: say('Aurpegiak + erpinak = ertzak + 2.', 'Caras + vértices = aristas + 2.', 'الأوجه + الرؤوس = الأحرف + 2.'),
        explanation: same('$30+2-12=20$')
    },
    {
        id: 4, stage: 'polyhedra',
        prompt: say('Dodekaedroak 12 aurpegi pentagonal ditu, eta erpin bakoitzean 3 aurpegi elkartzen dira. Zenbat erpin ditu?', 'El dodecaedro tiene 12 caras pentagonales y en cada vértice se juntan 3 caras. ¿Cuántos vértices tiene?', 'لاثني عشري الأوجه 12 وجهًا خماسيًا، ويلتقي عند كل رأس 3 أوجه. كم رأسًا له؟'),
        expected: n(20),
        hint: say('Zenbatu pentagonoen erpin guztiak eta zatitu.', 'Cuenta todas las esquinas de los pentágonos y divide.', 'عُدّ جميع زوايا المخمسات ثم اقسم.'),
        explanation: same('$12\\cdot 5\\mathbin{:}3=20$')
    },

    /* ---------- Areas of polyhedra ---------- */
    {
        id: 5, stage: 'areas',
        prompt: say('Kalkulatu 10 cm-ko ertzeko kubo baten azalera osoa (cm²).', 'Calcula el área total de un cubo de 10 cm de arista (cm²).', 'احسب المساحة الكلية لمكعب طول حرفه 10 سم (سم²).'),
        expected: n(600),
        hint: say('Sei karratu berdin.', 'Seis cuadrados iguales.', 'ستة مربعات متطابقة.'),
        explanation: same('$6\\cdot 10^{2}=600$')
    },
    {
        id: 6, stage: 'areas',
        prompt: say('Kalkulatu 5 cm, 4 cm eta 3 cm-ko ortoedro baten azalera osoa (cm²).', 'Calcula el área total de un ortoedro de 5 cm, 4 cm y 3 cm (cm²).', 'احسب المساحة الكلية لمتوازي مستطيلات أبعاده 5 سم و4 سم و3 سم (سم²).'),
        expected: n(94),
        hint: say('Hiru laukizuzen desberdin, bakoitza bi aldiz.', 'Tres rectángulos distintos, cada uno dos veces.', 'ثلاثة مستطيلات مختلفة، كل منها مرتين.'),
        explanation: same('$2\\cdot (5\\cdot 4+5\\cdot 3+4\\cdot 3)=94$')
    },
    {
        id: 7, stage: 'areas',
        prompt: say('Piramide erregular baten oinarria 10 cm-ko aldeko karratua da eta apotema 13 cm. Zein da alboko azalera (cm²)?', 'La base de una pirámide regular es un cuadrado de 10 cm de lado y su apotema mide 13 cm. ¿Cuál es su área lateral (cm²)?', 'قاعدة هرم منتظم مربع طول ضلعه 10 سم وعامده 13 سم. ما مساحته الجانبية (سم²)؟'),
        expected: n(260),
        hint: say('Lau triangelu: oinarria 10, altuera 13.', 'Cuatro triángulos de base 10 y altura 13.', 'أربعة مثلثات قاعدتها 10 وارتفاعها 13.'),
        explanation: same('$4\\cdot \\frac{10\\cdot 13}{2}=260$')
    },
    {
        id: 8, stage: 'areas',
        prompt: say('Piramide-enbor erregular baten oinarriak 6 cm eta 4 cm-ko aldeko karratuak dira, eta apotema 5 cm. Zein da azalera osoa (cm²)?', 'Las bases de un tronco de pirámide regular son cuadrados de 6 cm y 4 cm de lado y su apotema mide 5 cm. ¿Cuál es su área total (cm²)?', 'قاعدتا جذع هرم منتظم مربعان طولا ضلعيهما 6 سم و4 سم وعامده 5 سم. ما مساحته الكلية (سم²)؟'),
        expected: n(152),
        hint: say('Lau trapezio gehi bi karratu.', 'Cuatro trapecios más dos cuadrados.', 'أربعة أشباه منحرفات مع مربعين.'),
        explanation: same('$4\\cdot \\frac{(6+4)\\cdot 5}{2}=100\\ \\to\\ 100+36+16=152$')
    },

    /* ---------- Bodies of revolution ---------- */
    {
        id: 9, stage: 'round',
        prompt: with_(say('Zilindro batek 3 cm-ko erradioa eta 10 cm-ko altuera ditu. Zein da alboko azalera (cm²)?', 'Un cilindro tiene 3 cm de radio y 10 cm de altura. ¿Cuál es su área lateral (cm²)?', 'أسطوانة نصف قطرها 3 سم وارتفاعها 10 سم. ما مساحتها الجانبية (سم²)؟'), PI),
        expected: v('188,4'),
        hint: say('Laukizuzena: $2\\pi r$ bider $h$.', 'El rectángulo: $2\\pi r$ por $h$.', 'المستطيل: $2\\pi r$ في $h$.'),
        explanation: same('$2\\cdot 3{,}14\\cdot 3\\cdot 10=188{,}4$')
    },
    {
        id: 10, stage: 'round',
        prompt: with_(say('Kono baten erradioa 3 cm da eta sortzailea 5 cm. Zein da alboko azalera (cm²)?', 'Un cono tiene 3 cm de radio y 5 cm de generatriz. ¿Cuál es su área lateral (cm²)?', 'مخروط نصف قطره 3 سم وراسمه 5 سم. ما مساحته الجانبية (سم²)؟'), PI),
        expected: v('47,1'),
        hint: say('$\\pi r g$.', '$\\pi r g$.', '$\\pi r g$.'),
        explanation: same('$3{,}14\\cdot 3\\cdot 5=47{,}1$')
    },
    {
        id: 11, stage: 'round',
        prompt: with_(say('Kalkulatu 5 cm-ko erradioko esfera baten azalera (cm²).', 'Calcula el área de una esfera de 5 cm de radio (cm²).', 'احسب مساحة كرة نصف قطرها 5 سم (سم²).'), PI),
        expected: n(314),
        hint: say('Lau zirkulu handi.', 'Cuatro círculos máximos.', 'أربع دوائر عظمى.'),
        explanation: same('$4\\cdot 3{,}14\\cdot 5^{2}=314$')
    },
    {
        id: 12, stage: 'round',
        prompt: say('Kono baten erradioa 5 cm da eta altuera 12 cm. Zenbat da sortzailea?', 'Un cono tiene 5 cm de radio y 12 cm de altura. ¿Cuánto mide la generatriz?', 'مخروط نصف قطره 5 سم وارتفاعه 12 سم. كم طول راسمه؟'),
        expected: n(13),
        hint: say('Sortzailea hipotenusa da.', 'La generatriz es la hipotenusa.', 'الراسم هو الوتر.'),
        explanation: same('$\\sqrt{12^{2}+5^{2}}=\\sqrt{169}=13$')
    },

    /* ---------- Volume and capacity ---------- */
    {
        id: 13, stage: 'units',
        prompt: say('Adierazi 3,5 m³ dm³-tan.', 'Expresa 3,5 m³ en dm³.', 'عبّر عن 3.5 م³ بالديسيمتر المكعب.'),
        expected: n(3500),
        hint: say('Maila bat jaitsi: bider 1000.', 'Baja un escalón: por 1000.', 'انزل درجة: في 1000.'),
        explanation: same('$3{,}5\\cdot 1000=3500$')
    },
    {
        id: 14, stage: 'units',
        prompt: say('Adierazi 42 000 cm³ dm³-tan.', 'Expresa 42 000 cm³ en dm³.', 'عبّر عن 42000 سم³ بالديسيمتر المكعب.'),
        expected: n(42),
        hint: say('Maila bat igo: zati 1000.', 'Sube un escalón: entre 1000.', 'اصعد درجة: على 1000.'),
        explanation: same('$42\\,000\\mathbin{:}1000=42$')
    },
    {
        id: 15, stage: 'units',
        prompt: say('Zenbat cm³ dira 2,5 L?', '¿Cuántos cm³ son 2,5 L?', 'كم سم³ في 2.5 لتر؟'),
        expected: n(2500),
        hint: say('1 L = 1 dm³ = 1000 cm³.', '1 L = 1 dm³ = 1000 cm³.', '1 L = 1 dm³ = 1000 cm³.'),
        explanation: same('$2{,}5\\cdot 1000=2500$')
    },
    {
        id: 16, stage: 'units',
        prompt: say('Kalkulatu 8 cm × 5 cm × 3 cm-ko ortoedro baten bolumena (cm³).', 'Calcula el volumen de un ortoedro de 8 cm × 5 cm × 3 cm (cm³).', 'احسب حجم متوازي مستطيلات أبعاده 8 سم × 5 سم × 3 سم (سم³).'),
        expected: n(120),
        hint: say('Biderkatu hiru neurriak.', 'Multiplica las tres medidas.', 'اضرب الأبعاد الثلاثة.'),
        explanation: same('$8\\cdot 5\\cdot 3=120$')
    },

    /* ---------- Volumes ---------- */
    {
        id: 17, stage: 'volume',
        prompt: say('Prisma baten oinarria 6 cm eta 8 cm-ko katetoak dituen triangelu angeluzuzena da, eta altuera 10 cm. Zein da bolumena (cm³)?', 'La base de un prisma es un triángulo rectángulo de catetos 6 cm y 8 cm y su altura mide 10 cm. ¿Cuál es su volumen (cm³)?', 'قاعدة منشور مثلث قائم ضلعاه القائمان 6 سم و8 سم وارتفاعه 10 سم. ما حجمه (سم³)؟'),
        expected: n(240),
        hint: say('Oinarriaren azalera bider altuera.', 'Área de la base por altura.', 'مساحة القاعدة في الارتفاع.'),
        explanation: same('$\\frac{6\\cdot 8}{2}\\cdot 10=240$')
    },
    {
        id: 18, stage: 'volume',
        prompt: with_(say('Zilindro batek 2 cm-ko erradioa eta 5 cm-ko altuera ditu. Zein da bolumena (cm³)?', 'Un cilindro tiene 2 cm de radio y 5 cm de altura. ¿Cuál es su volumen (cm³)?', 'أسطوانة نصف قطرها 2 سم وارتفاعها 5 سم. ما حجمها (سم³)؟'), PI),
        expected: v('62,8'),
        hint: say('$\\pi r^{2}h$.', '$\\pi r^{2}h$.', '$\\pi r^{2}h$.'),
        explanation: same('$3{,}14\\cdot 2^{2}\\cdot 5=62{,}8$')
    },
    {
        id: 19, stage: 'volume',
        prompt: say('Piramide baten oinarria 9 cm-ko aldeko karratua da eta altuera 10 cm. Zein da bolumena (cm³)?', 'La base de una pirámide es un cuadrado de 9 cm de lado y su altura mide 10 cm. ¿Cuál es su volumen (cm³)?', 'قاعدة هرم مربع طول ضلعه 9 سم وارتفاعه 10 سم. ما حجمه (سم³)؟'),
        expected: n(270),
        hint: say('Prismaren herena.', 'Un tercio del prisma.', 'ثلث المنشور.'),
        explanation: same('$\\frac{9^{2}\\cdot 10}{3}=270$')
    },
    {
        id: 20, stage: 'volume',
        prompt: with_(say('Kalkulatu 6 cm-ko erradioko esfera baten bolumena (cm³).', 'Calcula el volumen de una esfera de 6 cm de radio (cm³).', 'احسب حجم كرة نصف قطرها 6 سم (سم³).'), PI),
        expected: v('904,32'),
        hint: say('$\\frac{4}{3}\\pi r^{3}$, eta $6^{3}=216$.', '$\\frac{4}{3}\\pi r^{3}$, y $6^{3}=216$.', '$\\frac{4}{3}\\pi r^{3}$، و$6^{3}=216$.'),
        explanation: same('$\\frac{4\\cdot 3{,}14\\cdot 6^{3}}{3}=904{,}32$')
    }
]

export const solidsChallenges: ChallengeItem[] = [
    {
        id: 101, stage: 'polyhedra', points: 10, context: 'starter',
        prompt: say('Piramide batek 7 erpin ditu. Zenbat ertz ditu?', 'Una pirámide tiene 7 vértices. ¿Cuántas aristas tiene?', 'لهرم 7 رؤوس. كم حرفًا له؟'),
        expected: n(12),
        hint: say('Erpin bat goian dago; besteak oinarrian.', 'Un vértice está arriba; los demás en la base.', 'رأس واحد في الأعلى؛ والباقي في القاعدة.'),
        explanation: same('$7-1=6\\ \\to\\ 2\\cdot 6=12$')
    },
    {
        id: 102, stage: 'polyhedra', points: 20, context: 'advanced',
        prompt: say('Prisma batek 30 erpin ditu. Zenbat aurpegi ditu?', 'Un prisma tiene 30 vértices. ¿Cuántas caras tiene?', 'لمنشور 30 رأسًا. كم وجهًا له؟'),
        expected: n(17),
        hint: say('Erpinen erdiak oinarri bakoitzean.', 'La mitad de los vértices en cada base.', 'نصف الرؤوس في كل قاعدة.'),
        explanation: same('$30\\mathbin{:}2=15\\ \\to\\ 15+2=17$')
    },
    {
        id: 103, stage: 'polyhedra', points: 30, context: 'master',
        prompt: say('Poliedro ganbil baten aurpegi guztiak triangeluak dira eta 12 ertz ditu. Zenbat aurpegi ditu?', 'Todas las caras de un poliedro convexo son triángulos y tiene 12 aristas. ¿Cuántas caras tiene?', 'جميع أوجه متعدد أوجه محدّب مثلثات وله 12 حرفًا. كم وجهًا له؟'),
        expected: n(8),
        hint: say('Triangelu bakoitzak 3 alde ditu, eta ertz bakoitza bi aurpegirena da.', 'Cada triángulo tiene 3 lados y cada arista es de dos caras.', 'لكل مثلث 3 أضلاع وكل حرف مشترك بين وجهين.'),
        explanation: same('$2\\cdot 12\\mathbin{:}3=8$')
    },
    {
        id: 104, stage: 'areas', points: 10, context: 'starter',
        prompt: say('Kubo baten azalera osoa 150 dm² da. Zenbat da ertza (dm)?', 'El área total de un cubo es 150 dm². ¿Cuánto mide su arista (dm)?', 'المساحة الكلية لمكعب 150 دسم². كم طول حرفه (دسم)؟'),
        expected: n(5),
        hint: say('Aurpegi bat: zatitu 6z.', 'Una cara: divide entre 6.', 'وجه واحد: اقسم على 6.'),
        explanation: same('$150\\mathbin{:}6=25\\ \\to\\ \\sqrt{25}=5$')
    },
    {
        id: 105, stage: 'areas', points: 20, context: 'advanced',
        prompt: say('Kaxa ortoedriko batek 9 dm luze eta 6 dm zabal ditu, eta azalera osoa 228 dm² da. Zenbat da altuera (dm)?', 'Una caja ortoédrica mide 9 dm de largo y 6 dm de ancho, y su área total es 228 dm². ¿Cuánto mide su altura (dm)?', 'صندوق على شكل متوازي مستطيلات طوله 9 دسم وعرضه 6 دسم ومساحته الكلية 228 دسم². كم ارتفاعه (دسم)؟'),
        expected: n(4),
        hint: say('Oinarriak: $2\\cdot 9\\cdot 6=108$. Alboak: $2\\cdot (9+6)\\cdot h=30h$.', 'Bases: $2\\cdot 9\\cdot 6=108$. Laterales: $2\\cdot (9+6)\\cdot h=30h$.', 'القاعدتان: $2\\cdot 9\\cdot 6=108$. الجوانب: $2\\cdot (9+6)\\cdot h=30h$.'),
        explanation: same('$(228-108)\\mathbin{:}30=4$')
    },
    {
        id: 106, stage: 'areas', points: 30, context: 'master',
        prompt: say('Prisma zuzen baten oinarriak 16 cm eta 12 cm-ko diagonalak dituzten erronboak dira, eta altuera 15 cm. Kalkulatu azalera osoa (cm²).', 'Las bases de un prisma recto son rombos de diagonales 16 cm y 12 cm, y su altura mide 15 cm. Calcula su área total (cm²).', 'قاعدتا منشور قائم معيّنان قطراهما 16 سم و12 سم، وارتفاعه 15 سم. احسب مساحته الكلية (سم²).'),
        expected: n(792),
        hint: say('Erronboaren aldea Pitagorasekin, diagonal-erdiekin.', 'El lado del rombo con Pitágoras, con las semidiagonales.', 'ضلع المعيّن بفيثاغورس بنصفي القطرين.'),
        explanation: same('$\\sqrt{8^{2}+6^{2}}=10\\ \\to\\ 4\\cdot 10\\cdot 15+2\\cdot \\frac{16\\cdot 12}{2}=792$')
    },
    {
        id: 107, stage: 'round', points: 10, context: 'starter',
        prompt: with_(say('Goian irekita dagoen aljibe zilindriko baten erradioa 4 m da eta altuera 5 m. Zenbat m² iragazgaiztu behar dira (hondoa eta hormak)?', 'Un aljibe cilíndrico abierto por arriba tiene 4 m de radio y 5 m de altura. ¿Cuántos m² hay que impermeabilizar (suelo y paredes)?', 'خزان أسطواني مفتوح من الأعلى نصف قطره 4 م وارتفاعه 5 م. كم م² يجب عزلها (الأرضية والجدران)؟'), PI),
        expected: v('175,84'),
        hint: say('Oinarri bakarra.', 'Una sola base.', 'قاعدة واحدة فقط.'),
        explanation: same('$2\\cdot 3{,}14\\cdot 4\\cdot 5+3{,}14\\cdot 4^{2}=175{,}84$')
    },
    {
        id: 108, stage: 'round', points: 20, context: 'advanced',
        prompt: with_(say('Lorontzi batek kono-enbor forma du: oinarrien erradioak 14 cm eta 20 cm, sortzailea 38 cm. Zein da kanpoko alboko azalera (cm²)?', 'Un macetero tiene forma de tronco de cono: radios de las bases 14 cm y 20 cm, generatriz 38 cm. ¿Cuál es su área lateral exterior (cm²)?', 'أصيص على شكل جذع مخروط: نصفا قطري قاعدتيه 14 سم و20 سم وراسمه 38 سم. ما مساحته الجانبية الخارجية (سم²)؟'), PI),
        expected: v('4056,88'),
        hint: say('$\\pi (R+r)\\,g$.', '$\\pi (R+r)\\,g$.', '$\\pi (R+r)\\,g$.'),
        explanation: same('$3{,}14\\cdot (20+14)\\cdot 38=4056{,}88$')
    },
    {
        id: 109, stage: 'round', points: 30, context: 'master',
        prompt: with_(say('10 cm-ko erradioko esfera bat zentrotik 6 cm-ra dagoen plano batek mozten du. Zein da sekzioaren azalera (cm²)?', 'Un plano corta una esfera de 10 cm de radio a 6 cm del centro. ¿Cuál es el área de la sección (cm²)?', 'يقطع مستوٍ كرةً نصف قطرها 10 سم على بعد 6 سم من المركز. ما مساحة المقطع (سم²)؟'), PI),
        expected: v('200,96'),
        hint: say('Sekzioaren erradioa: katetoa, esferaren erradioa hipotenusa izanik.', 'Radio de la sección: un cateto, con el radio de la esfera como hipotenusa.', 'نصف قطر المقطع: ضلع قائم ونصف قطر الكرة هو الوتر.'),
        explanation: same('$\\sqrt{10^{2}-6^{2}}=8\\ \\to\\ 3{,}14\\cdot 8^{2}=200{,}96$')
    },
    {
        id: 110, stage: 'units', points: 10, context: 'starter',
        prompt: say('Ur-depositu batek 2,4 m³ ditu. Zenbat litro dira?', 'Un depósito de agua tiene 2,4 m³. ¿Cuántos litros son?', 'خزان ماء حجمه 2.4 م³. كم لترًا؟'),
        expected: n(2400),
        hint: say('1 m³ = 1000 L.', '1 m³ = 1000 L.', '1 m³ = 1000 L.'),
        explanation: same('$2{,}4\\cdot 1000=2400$')
    },
    {
        id: 111, stage: 'units', points: 20, context: 'advanced',
        prompt: say('Ekaitz batean 35 L/m² erori dira. 200 m²-ko teilatu batek ura biltzen du. Zenbat m³ bildu dira?', 'En una tormenta han caído 35 L/m². Un tejado de 200 m² recoge el agua. ¿Cuántos m³ se han recogido?', 'هطل في عاصفة 35 لترًا لكل م². سطح مساحته 200 م² يجمع الماء. كم م³ جُمع؟'),
        expected: n(7),
        hint: say('Lehenik litroak; gero 1000 L = 1 m³.', 'Primero los litros; luego 1000 L = 1 m³.', 'أولًا اللترات؛ ثم 1000 L = 1 m³.'),
        explanation: same('$35\\cdot 200=7000\\ \\to\\ 7000\\mathbin{:}1000=7$')
    },
    {
        id: 112, stage: 'units', points: 30, context: 'master',
        prompt: say('Akuario batek 60 cm × 30 cm × 40 cm neurtzen ditu eta hiru laurden beteta dago. Zenbat litro ur ditu?', 'Un acuario mide 60 cm × 30 cm × 40 cm y está lleno en sus tres cuartas partes. ¿Cuántos litros de agua tiene?', 'حوض سمك أبعاده 60 سم × 30 سم × 40 سم مملوء ثلاثة أرباعه. كم لترًا من الماء فيه؟'),
        expected: n(54),
        hint: say('cm³-tik L-ra: zati 1000.', 'De cm³ a L: entre 1000.', 'من cm³ إلى L: على 1000.'),
        explanation: same('$60\\cdot 30\\cdot 40=72\\,000\\ \\to\\ \\frac{3}{4}\\cdot 72=54$')
    },
    {
        id: 113, stage: 'volume', points: 10, context: 'starter',
        prompt: with_(say('Kono baten erradioa 3 cm da eta altuera 4 cm. Zein da bolumena (cm³)?', 'Un cono tiene 3 cm de radio y 4 cm de altura. ¿Cuál es su volumen (cm³)?', 'مخروط نصف قطره 3 سم وارتفاعه 4 سم. ما حجمه (سم³)؟'), PI),
        expected: v('37,68'),
        hint: say('Zilindroaren herena.', 'Un tercio del cilindro.', 'ثلث الأسطوانة.'),
        explanation: same('$\\frac{3{,}14\\cdot 3^{2}\\cdot 4}{3}=37{,}68$')
    },
    {
        id: 114, stage: 'volume', points: 20, context: 'advanced',
        prompt: with_(say('30 cm × 30 cm × 10 cm-ko kaxa batean 3 cm-ko erradioko 20 bola sartu dira. Zenbat cm³ geratzen dira hutsik?', 'En una caja de 30 cm × 30 cm × 10 cm se han metido 20 bolas de 3 cm de radio. ¿Cuántos cm³ quedan vacíos?', 'وُضعت 20 كرة نصف قطر كل منها 3 سم في صندوق أبعاده 30 سم × 30 سم × 10 سم. كم سم³ يبقى فارغًا؟'), PI),
        expected: v('6739,2'),
        hint: say('Bola bakoitza: $\\frac{4}{3}\\pi\\cdot 27$.', 'Cada bola: $\\frac{4}{3}\\pi\\cdot 27$.', 'كل كرة: $\\frac{4}{3}\\pi\\cdot 27$.'),
        explanation: same('$\\frac{4\\cdot 3{,}14\\cdot 27}{3}=113{,}04\\ \\to\\ 9000-20\\cdot 113{,}04=6739{,}2$')
    },
    {
        id: 115, stage: 'volume', points: 30, context: 'master',
        prompt: say('12 cm-ko aldeko oinarri karratua eta 12 cm-ko altuera dituen piramide bat altueraren erdian mozten da. Zein da enborraren bolumena (cm³)?', 'Una pirámide de base cuadrada de 12 cm de lado y 12 cm de altura se corta a mitad de su altura. ¿Cuál es el volumen del tronco (cm³)?', 'هرم قاعدته مربع طول ضلعه 12 سم وارتفاعه 12 سم يُقطع عند منتصف ارتفاعه. ما حجم الجذع (سم³)؟'),
        expected: n(504),
        hint: say('Piramide txikiak erdiko aldea eta erdiko altuera ditu.', 'La pirámide pequeña tiene la mitad de lado y la mitad de altura.', 'للهرم الصغير نصف الضلع ونصف الارتفاع.'),
        explanation: same('$\\frac{12^{2}\\cdot 12}{3}-\\frac{6^{2}\\cdot 6}{3}=504$')
    }
]

export const solidsExerciseBank: ExerciseSection[] = [
    {
        id: 'polyhedra',
        title: say('Poliedroak', 'Poliedros', 'متعددات الأوجه'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Zenbat aurpegi, ertz eta erpin ditu prisma heptagonal batek?', '¿Cuántas caras, aristas y vértices tiene un prisma heptagonal?', 'كم وجهًا وحرفًا ورأسًا للمنشور السباعي؟'), solution: same('$7+2=9\\qquad 3\\cdot 7=21\\qquad 2\\cdot 7=14$') },
            { id: 2, difficulty: 'easy', question: say('Zenbat ertz ditu piramide pentagonal batek?', '¿Cuántas aristas tiene una pirámide pentagonal?', 'كم حرفًا للهرم الخماسي؟'), solution: same('$2\\cdot 5=10$'), answer: { expected: n(10) } },
            { id: 3, difficulty: 'easy', question: say('Egiaztatu Eulerren formula prisma triangeluar batean.', 'Comprueba la fórmula de Euler en un prisma triangular.', 'تحقّق من صيغة أويلر في منشور ثلاثي.'), solution: say('5 aurpegi, 6 erpin, 9 ertz: $5+6=9+2$.', '5 caras, 6 vértices, 9 aristas: $5+6=9+2$.', '5 أوجه و6 رؤوس و9 أحرف: $5+6=9+2$.') },
            { id: 4, difficulty: 'medium', question: say('Prisma batek 18 ertz ditu. Zenbat alde ditu oinarriak?', 'Un prisma tiene 18 aristas. ¿Cuántos lados tiene su base?', 'لمنشور 18 حرفًا. كم ضلعًا لقاعدته؟'), solution: say('$18\\mathbin{:}3=6$: prisma hexagonala.', '$18\\mathbin{:}3=6$: prisma hexagonal.', '$18\\mathbin{:}3=6$: منشور سداسي.'), answer: { expected: n(6) } },
            { id: 5, difficulty: 'medium', question: say('Poliedro ganbil batek 10 erpin eta 15 ertz ditu. Zenbat aurpegi ditu?', 'Un poliedro convexo tiene 10 vértices y 15 aristas. ¿Cuántas caras tiene?', 'متعدد أوجه محدّب له 10 رؤوس و15 حرفًا. كم وجهًا له؟'), solution: same('$15+2-10=7$'), answer: { expected: n(7) } },
            { id: 6, difficulty: 'medium', question: say('Piramide batek 11 aurpegi ditu. Zenbat erpin ditu?', 'Una pirámide tiene 11 caras. ¿Cuántos vértices tiene?', 'لهرم 11 وجهًا. كم رأسًا له؟'), solution: say('Oinarriak 10 alde ditu: $11-1=10\\ \\to\\ 10+1=11$.', 'La base tiene 10 lados: $11-1=10\\ \\to\\ 10+1=11$.', 'للقاعدة 10 أضلاع: $11-1=10\\ \\to\\ 10+1=11$.'), answer: { expected: n(11) } },
            { id: 7, difficulty: 'medium', question: say('Zergatik ezin da hexagono erregularrekin poliedro erregularrik egin?', '¿Por qué no se puede construir un poliedro regular con hexágonos regulares?', 'لماذا لا يمكن بناء متعدد أوجه منتظم من مسدسات منتظمة؟'), solution: say('Hexagonoaren angelua 120° da; hiru hexagono erpin batean: $3\\cdot 120=360$, laua geratzen da.', 'El ángulo del hexágono mide 120°; tres hexágonos en un vértice: $3\\cdot 120=360$, queda plano.', 'زاوية المسدس 120°؛ ثلاثة مسدسات عند رأس: $3\\cdot 120=360$، فيبقى مستويًا.') },
            { id: 8, difficulty: 'hard', question: say('Ikosaedroak 20 triangelu ditu eta erpin bakoitzean 5 aurpegi elkartzen dira. Zenbat erpin ditu?', 'El icosaedro tiene 20 triángulos y en cada vértice se juntan 5 caras. ¿Cuántos vértices tiene?', 'لعشريني الأوجه 20 مثلثًا ويلتقي عند كل رأس 5 أوجه. كم رأسًا له؟'), solution: same('$20\\cdot 3\\mathbin{:}5=12$'), answer: { expected: n(12) } },
            { id: 9, difficulty: 'hard', question: say('1 dm-ko ertzeko dodekaedro baten hezurdura alanbrez egin nahi dugu. Zenbat dm alanbre behar dira?', 'Queremos hacer el esqueleto de un dodecaedro de 1 dm de arista con alambre. ¿Cuántos dm de alambre hacen falta?', 'نريد صنع هيكل اثني عشري أوجه طول حرفه 1 دسم من السلك. كم دسم من السلك يلزم؟'), solution: say('Ertzak: $12\\cdot 5\\mathbin{:}2=30$, beraz 30 dm.', 'Aristas: $12\\cdot 5\\mathbin{:}2=30$, así que 30 dm.', 'الأحرف: $12\\cdot 5\\mathbin{:}2=30$، إذن 30 دسم.'), answer: { expected: n(30) } },
            { id: 10, difficulty: 'hard', question: say('Bi tetraedro oinarritik itsatsiz, sei triangelu aldeberdineko poliedro bat lortzen da. Erregularra da?', 'Pegando dos tetraedros por una cara se obtiene un poliedro de seis triángulos equiláteros. ¿Es regular?', 'بلصق رباعيي أوجه من وجه نحصل على متعدد أوجه من ستة مثلثات متساوية الأضلاع. هل هو منتظم؟'), solution: say('Ez: erpin batzuetan 3 aurpegi elkartzen dira eta beste batzuetan 4. Euler betetzen da: $6+5=9+2$.', 'No: en unos vértices se juntan 3 caras y en otros 4. Euler se cumple: $6+5=9+2$.', 'لا: يلتقي عند بعض الرؤوس 3 أوجه وعند أخرى 4. وتتحقق صيغة أويلر: $6+5=9+2$.') }
        ]
    },
    {
        id: 'areas',
        title: say('Poliedroen azalerak', 'Áreas de poliedros', 'مساحات متعددات الأوجه'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Kalkulatu 4 cm-ko ertzeko kubo baten azalera osoa (cm²).', 'Calcula el área total de un cubo de 4 cm de arista (cm²).', 'احسب المساحة الكلية لمكعب طول حرفه 4 سم (سم²).'), solution: same('$6\\cdot 4^{2}=96$'), answer: { expected: n(96) } },
            { id: 12, difficulty: 'easy', question: say('Kalkulatu 6 cm, 4 cm eta 2 cm-ko ortoedro baten azalera osoa (cm²).', 'Calcula el área total de un ortoedro de 6 cm, 4 cm y 2 cm (cm²).', 'احسب المساحة الكلية لمتوازي مستطيلات أبعاده 6 سم و4 سم و2 سم (سم²).'), solution: same('$2\\cdot (6\\cdot 4+6\\cdot 2+4\\cdot 2)=88$'), answer: { expected: n(88) } },
            { id: 13, difficulty: 'easy', question: say('Prisma baten oinarriaren perimetroa 18 cm da eta altuera 7 cm. Zein da alboko azalera (cm²)?', 'El perímetro de la base de un prisma mide 18 cm y su altura 7 cm. ¿Cuál es su área lateral (cm²)?', 'محيط قاعدة منشور 18 سم وارتفاعه 7 سم. ما مساحته الجانبية (سم²)؟'), solution: same('$18\\cdot 7=126$'), answer: { expected: n(126) } },
            { id: 14, difficulty: 'medium', question: say('Piramide erregular baten oinarria 8 cm-ko aldeko karratua da eta apotema 10 cm. Kalkulatu azalera osoa (cm²).', 'La base de una pirámide regular es un cuadrado de 8 cm de lado y su apotema mide 10 cm. Calcula su área total (cm²).', 'قاعدة هرم منتظم مربع طول ضلعه 8 سم وعامده 10 سم. احسب مساحته الكلية (سم²).'), solution: same('$4\\cdot \\frac{8\\cdot 10}{2}+8^{2}=224$'), answer: { expected: n(224) } },
            { id: 15, difficulty: 'medium', question: say('Piramide erregular baten oinarria 16 cm-ko aldeko karratua da eta altuera 6 cm. Kalkulatu azalera osoa (cm²).', 'La base de una pirámide regular es un cuadrado de 16 cm de lado y su altura mide 6 cm. Calcula su área total (cm²).', 'قاعدة هرم منتظم مربع طول ضلعه 16 سم وارتفاعه 6 سم. احسب مساحته الكلية (سم²).'), solution: same('$\\sqrt{6^{2}+8^{2}}=10\\ \\to\\ 4\\cdot \\frac{16\\cdot 10}{2}+16^{2}=576$'), answer: { expected: n(576) } },
            { id: 16, difficulty: 'medium', question: say('Prisma hexagonal erregular baten oinarriko ertzak 2 cm dira (apotema 1,73 cm) eta alboko ertzak 4 cm. Kalkulatu azalera osoa (cm²).', 'Un prisma hexagonal regular tiene aristas de la base de 2 cm (apotema 1,73 cm) y aristas laterales de 4 cm. Calcula su área total (cm²).', 'منشور سداسي منتظم أحرف قاعدته 2 سم (العامد 1.73 سم) وأحرفه الجانبية 4 سم. احسب مساحته الكلية (سم²).'), solution: same('$2\\cdot \\frac{12\\cdot 1{,}73}{2}+12\\cdot 4=68{,}76$'), answer: { expected: v('68,76') } },
            { id: 17, difficulty: 'medium', question: say('0,6 m × 0,5 m × 0,4 m-ko kaxa bat txapaz forratu nahi da, 18 €/m². Zenbat kostatuko da (€)?', 'Queremos forrar con chapa un cajón de 0,6 m × 0,5 m × 0,4 m, a 18 €/m². ¿Cuánto costará (€)?', 'نريد تغليف صندوق أبعاده 0.6 م × 0.5 م × 0.4 م بالصفيح بسعر 18 €/م². كم سيكلف (€)؟'), solution: same('$2\\cdot (0{,}3+0{,}2+0{,}24)=1{,}48\\ \\to\\ 1{,}48\\cdot 18=26{,}64$'), answer: { expected: v('26,64') } },
            { id: 18, difficulty: 'hard', question: with_(say('Piramide-enbor karratu erregular baten oinarrietako ertzak 4 cm eta 2 cm dira, eta alboko ertzak 5 cm. Kalkulatu azalera osoa (cm²), apotema hamarrenetara hurbilduta.', 'Un tronco de pirámide cuadrangular regular tiene aristas de las bases de 4 cm y 2 cm y aristas laterales de 5 cm. Calcula su área total (cm²), con la apotema aproximada a las décimas.', 'جذع هرم رباعي منتظم أحرف قاعدتيه 4 سم و2 سم وأحرفه الجانبية 5 سم. احسب مساحته الكلية (سم²) مع تقريب العامد إلى الأعشار.')), solution: same('$\\sqrt{5^{2}-1^{2}}\\approx 4{,}9\\ \\to\\ 4\\cdot \\frac{(4+2)\\cdot 4{,}9}{2}+16+4=78{,}8$'), answer: { expected: v('78,8') } },
            { id: 19, difficulty: 'hard', question: say('Piramide hexagonal erregular baten oinarriko ertzak 10 cm dira eta alboko ertzak 13 cm. Zein da alboko azalera (cm²)?', 'Una pirámide hexagonal regular tiene aristas de la base de 10 cm y aristas laterales de 13 cm. ¿Cuál es su área lateral (cm²)?', 'هرم سداسي منتظم أحرف قاعدته 10 سم وأحرفه الجانبية 13 سم. ما مساحته الجانبية (سم²)؟'), solution: same('$\\sqrt{13^{2}-5^{2}}=12\\ \\to\\ 6\\cdot \\frac{10\\cdot 12}{2}=360$'), answer: { expected: n(360) } },
            { id: 20, difficulty: 'hard', question: with_(say('Kubo baten azalera osoa 150 dm² da. Kalkulatu haren diagonala (dm).', 'El área total de un cubo es 150 dm². Calcula su diagonal (dm).', 'المساحة الكلية لمكعب 150 دسم². احسب قطره (دسم).'), HUNDREDTHS), solution: say('Ertza 5 da: $\\sqrt{25+25+25}=\\sqrt{75}\\approx 8{,}66$.', 'La arista mide 5: $\\sqrt{25+25+25}=\\sqrt{75}\\approx 8{,}66$.', 'طول الحرف 5: $\\sqrt{25+25+25}=\\sqrt{75}\\approx 8{,}66$.'), answer: { expected: v('8,66') } }
        ]
    },
    {
        id: 'round',
        title: say('Biraketa-gorputzak', 'Cuerpos de revolución', 'الأجسام الدورانية'),
        items: [
            { id: 21, difficulty: 'easy', question: with_(say('Zilindro batek 1 m-ko erradioa eta 4 m-ko altuera ditu. Kalkulatu alboko azalera (m²).', 'Un cilindro tiene 1 m de radio y 4 m de altura. Calcula su área lateral (m²).', 'أسطوانة نصف قطرها 1 م وارتفاعها 4 م. احسب مساحتها الجانبية (م²).'), PI), solution: same('$2\\cdot 3{,}14\\cdot 1\\cdot 4=25{,}12$'), answer: { expected: v('25,12') } },
            { id: 22, difficulty: 'easy', question: with_(say('Kalkulatu 2 cm-ko erradioko esfera baten azalera (cm²).', 'Calcula el área de una esfera de 2 cm de radio (cm²).', 'احسب مساحة كرة نصف قطرها 2 سم (سم²).'), PI), solution: same('$4\\cdot 3{,}14\\cdot 2^{2}=50{,}24$'), answer: { expected: v('50,24') } },
            { id: 23, difficulty: 'easy', question: say('Zer gorputz sortzen da triangelu angeluzuzen bat kateto baten inguruan biratzean? Eta zirkulu-erdi bat diametroaren inguruan?', '¿Qué cuerpo se genera al girar un triángulo rectángulo alrededor de un cateto? ¿Y un semicírculo alrededor de su diámetro?', 'ما الجسم الناتج عن دوران مثلث قائم حول أحد ضلعيه القائمين؟ ونصف دائرة حول قطرها؟'), solution: say('Konoa; esfera.', 'Un cono; una esfera.', 'مخروط؛ كرة.') },
            { id: 24, difficulty: 'medium', question: with_(say('Kono baten erradioa 5 cm da eta sortzailea 15 cm. Kalkulatu azalera osoa (cm²).', 'Un cono tiene 5 cm de radio y 15 cm de generatriz. Calcula su área total (cm²).', 'مخروط نصف قطره 5 سم وراسمه 15 سم. احسب مساحته الكلية (سم²).'), PI), solution: same('$3{,}14\\cdot 5\\cdot 15+3{,}14\\cdot 5^{2}=314$'), answer: { expected: n(314) } },
            { id: 25, difficulty: 'medium', question: with_(say('Kono baten altuera 16 cm da eta erradioa 12 cm. Kalkulatu alboko azalera (cm²).', 'Un cono tiene 16 cm de altura y 12 cm de radio. Calcula su área lateral (cm²).', 'مخروط ارتفاعه 16 سم ونصف قطره 12 سم. احسب مساحته الجانبية (سم²).'), PI), solution: same('$\\sqrt{16^{2}+12^{2}}=20\\ \\to\\ 3{,}14\\cdot 12\\cdot 20=753{,}6$'), answer: { expected: v('753,6') } },
            { id: 26, difficulty: 'medium', question: with_(say('12 m sakoneko eta 1,6 m diametroko putzu baten hormak zementuz estali dira, 40 €/m². Zenbat kostatu da (€)?', 'Las paredes de un pozo de 12 m de profundidad y 1,6 m de diámetro se han cubierto de cemento a 40 €/m². ¿Cuánto ha costado (€)?', 'غُطّيت جدران بئر عمقها 12 م وقطرها 1.6 م بالإسمنت بسعر 40 €/م². كم كلّف ذلك (€)؟'), PI), solution: same('$2\\cdot 3{,}14\\cdot 0{,}8\\cdot 12=60{,}288\\ \\to\\ 60{,}288\\cdot 40=2411{,}52$'), answer: { expected: v('2411,52') } },
            { id: 27, difficulty: 'medium', question: with_(say('10 dm-ko diametroko esfera batean, zein da 4 dm-ko altuerako zona esferiko baten azalera (dm²)?', 'En una esfera de 10 dm de diámetro, ¿cuál es el área de una zona esférica de 4 dm de altura (dm²)?', 'في كرة قطرها 10 دسم، ما مساحة منطقة كروية ارتفاعها 4 دسم (دسم²)؟'), PI), solution: same('$2\\cdot 3{,}14\\cdot 5\\cdot 4=125{,}6$'), answer: { expected: v('125,6') } },
            { id: 28, difficulty: 'hard', question: with_(say('Kono-enbor baten oinarrien erradioak 22 cm eta 17 cm dira, eta altuera 12 cm. Kalkulatu azalera osoa (cm²).', 'Un tronco de cono tiene radios de las bases de 22 cm y 17 cm y 12 cm de altura. Calcula su área total (cm²).', 'جذع مخروط نصفا قطري قاعدتيه 22 سم و17 سم وارتفاعه 12 سم. احسب مساحته الكلية (سم²).'), PI), solution: same('$\\sqrt{12^{2}+5^{2}}=13\\ \\to\\ 3{,}14\\cdot 39\\cdot 13+3{,}14\\cdot 22^{2}+3{,}14\\cdot 17^{2}=4019{,}2$'), answer: { expected: v('4019,2') } },
            { id: 29, difficulty: 'hard', question: with_(say('Kono baten alboko garapena 12 cm-ko erradioko zirkulu-erdia da. Zenbat da konoaren altuera (cm)?', 'El desarrollo lateral de un cono es un semicírculo de 12 cm de radio. ¿Cuánto mide la altura del cono (cm)?', 'النشر الجانبي لمخروط نصف دائرة نصف قطرها 12 سم. كم ارتفاع المخروط (سم)؟'), HUNDREDTHS), solution: say('Arkua oinarriaren zirkunferentzia da: $2\\pi r=12\\pi$, beraz $r=6$. Altuera: $\\sqrt{12^{2}-6^{2}}=\\sqrt{108}\\approx 10{,}39$.', 'El arco es la circunferencia de la base: $2\\pi r=12\\pi$, así que $r=6$. Altura: $\\sqrt{12^{2}-6^{2}}=\\sqrt{108}\\approx 10{,}39$.', 'القوس هو محيط القاعدة: $2\\pi r=12\\pi$، إذن $r=6$. الارتفاع: $\\sqrt{12^{2}-6^{2}}=\\sqrt{108}\\approx 10{,}39$.'), answer: { expected: v('10,39') } },
            { id: 30, difficulty: 'hard', question: say('12 cm-ko diametroko esfera bat zentrotik 3,6 cm-ra dagoen plano batek mozten du. Zenbat da sekzioaren erradioa (cm)?', 'Un plano corta una esfera de 12 cm de diámetro a 3,6 cm del centro. ¿Cuánto mide el radio de la sección (cm)?', 'يقطع مستوٍ كرةً قطرها 12 سم على بعد 3.6 سم من المركز. كم نصف قطر المقطع (سم)؟'), solution: same('$\\sqrt{6^{2}-3{,}6^{2}}=\\sqrt{23{,}04}=4{,}8$'), answer: { expected: v('4,8') } }
        ]
    },
    {
        id: 'units',
        title: say('Bolumena eta edukiera', 'Volumen y capacidad', 'الحجم والسعة'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Adierazi 4 m³ dm³-tan.', 'Expresa 4 m³ en dm³.', 'عبّر عن 4 م³ بالديسيمتر المكعب.'), solution: same('$4\\cdot 1000=4000$'), answer: { expected: n(4000) } },
            { id: 32, difficulty: 'easy', question: say('Zenbat litro dira 7500 cm³?', '¿Cuántos litros son 7500 cm³?', 'كم لترًا في 7500 سم³؟'), solution: same('$7500\\mathbin{:}1000=7{,}5$'), answer: { expected: v('7,5') } },
            { id: 33, difficulty: 'easy', question: say('Zenbat cm³ dira 250 mL?', '¿Cuántos cm³ son 250 mL?', 'كم سم³ في 250 مل؟'), solution: say('1 mL = 1 cm³: 250 cm³.', '1 mL = 1 cm³: 250 cm³.', '1 mL = 1 cm³: 250 سم³.'), answer: { expected: n(250) } },
            { id: 34, difficulty: 'medium', question: say('Zenbat litro dira 0,045 m³?', '¿Cuántos litros son 0,045 m³?', 'كم لترًا في 0.045 م³؟'), solution: same('$0{,}045\\cdot 1000=45$'), answer: { expected: n(45) } },
            { id: 35, difficulty: 'medium', question: say('Adierazi 3 m³ 25 dm³ dm³-tan.', 'Expresa 3 m³ 25 dm³ en dm³.', 'عبّر عن 3 م³ و25 دسم³ بالديسيمتر المكعب.'), solution: same('$3\\cdot 1000+25=3025$'), answer: { expected: n(3025) } },
            { id: 36, difficulty: 'medium', question: say('2 m-ko ertzeko depositu kubiko bat urez betetzen da. Zenbat litro sartzen dira?', 'Se llena de agua un depósito cúbico de 2 m de arista. ¿Cuántos litros caben?', 'يُملأ خزان مكعب طول حرفه 2 م بالماء. كم لترًا يسع؟'), solution: same('$2^{3}=8\\ \\to\\ 8\\cdot 1000=8000$'), answer: { expected: n(8000) } },
            { id: 37, difficulty: 'medium', question: say('Atzo 120 L/m² erori ziren. Zenbat milimetroko ur-geruza da?', 'Ayer cayeron 120 L/m². ¿A cuántos milímetros de altura de agua corresponden?', 'هطل أمس 120 لترًا لكل م². كم مليمترًا من ارتفاع الماء يوافق ذلك؟'), solution: say('1 L/m² = 1 mm, beraz 120 mm.', '1 L/m² = 1 mm, así que 120 mm.', '1 L/m² = 1 mm، إذن 120 مم.'), answer: { expected: n(120) } },
            { id: 38, difficulty: 'hard', question: say('Prisma zeihar baten oinarriak 12 cm² ditu eta altuera 5 cm da. Zein da bolumena (cm³)? Zergatik?', 'Un prisma oblicuo tiene una base de 12 cm² y 5 cm de altura. ¿Cuál es su volumen (cm³)? ¿Por qué?', 'منشور مائل مساحة قاعدته 12 سم² وارتفاعه 5 سم. ما حجمه (سم³)؟ لماذا؟'), solution: say('Cavalieri: prisma zuzenaren bolumen bera, $12\\cdot 5=60$.', 'Cavalieri: el mismo volumen que el prisma recto, $12\\cdot 5=60$.', 'كافاليري: حجم المنشور القائم نفسه، $12\\cdot 5=60$.'), answer: { expected: n(60) } },
            { id: 39, difficulty: 'hard', question: say('Ontzi ortoedriko baten oinarriak 20 cm × 15 cm neurtzen ditu. 9 L ur botatzen dira. Zer altueratara iristen da ura (cm)?', 'La base de un recipiente ortoédrico mide 20 cm × 15 cm. Se echan 9 L de agua. ¿Hasta qué altura llega el agua (cm)?', 'قاعدة إناء على شكل متوازي مستطيلات 20 سم × 15 سم. سُكب فيه 9 لترات من الماء. إلى أي ارتفاع يصل الماء (سم)؟'), solution: same('$9000\\mathbin{:}(20\\cdot 15)=30$'), answer: { expected: n(30) } },
            { id: 40, difficulty: 'hard', question: say('Zenbat m³ dira 1 km³?', '¿Cuántos m³ son 1 km³?', 'كم م³ في 1 كم³؟'), solution: say('Hiru maila jaitsi: $1000\\cdot 1000\\cdot 1000=1\\,000\\,000\\,000$.', 'Se bajan tres escalones: $1000\\cdot 1000\\cdot 1000=1\\,000\\,000\\,000$.', 'ننزل ثلاث درجات: $1000\\cdot 1000\\cdot 1000=1\\,000\\,000\\,000$.'), answer: { expected: n(1_000_000_000) } }
        ]
    },
    {
        id: 'volume',
        title: say('Gorputzen bolumena', 'Volumen de los cuerpos', 'حجوم الأجسام'),
        items: [
            { id: 41, difficulty: 'easy', question: with_(say('Zilindro baten erradioa 10 cm da eta altuera 20 cm. Kalkulatu bolumena (cm³).', 'Un cilindro tiene 10 cm de radio y 20 cm de altura. Calcula su volumen (cm³).', 'أسطوانة نصف قطرها 10 سم وارتفاعها 20 سم. احسب حجمها (سم³).'), PI), solution: same('$3{,}14\\cdot 10^{2}\\cdot 20=6280$'), answer: { expected: n(6280) } },
            { id: 42, difficulty: 'easy', question: say('Piramide baten oinarria 6 cm-ko aldeko karratua da eta altuera 5 cm. Kalkulatu bolumena (cm³).', 'La base de una pirámide es un cuadrado de 6 cm de lado y su altura mide 5 cm. Calcula su volumen (cm³).', 'قاعدة هرم مربع طول ضلعه 6 سم وارتفاعه 5 سم. احسب حجمه (سم³).'), solution: same('$\\frac{6^{2}\\cdot 5}{3}=60$'), answer: { expected: n(60) } },
            { id: 43, difficulty: 'easy', question: with_(say('Kalkulatu 1 cm-ko erradioko bola baten bolumena (cm³).', 'Calcula el volumen de una bola de 1 cm de radio (cm³).', 'احسب حجم كرة نصف قطرها 1 سم (سم³).'), PI, HUNDREDTHS), solution: same('$\\frac{4\\cdot 3{,}14\\cdot 1^{3}}{3}\\approx 4{,}19$'), answer: { expected: v('4,19') } },
            { id: 44, difficulty: 'medium', question: say('Prisma baten oinarria 5 cm eta 12 cm-ko katetoak dituen triangelu angeluzuzena da, eta altuera 20 cm. Kalkulatu bolumena (cm³).', 'La base de un prisma es un triángulo rectángulo de catetos 5 cm y 12 cm, y su altura mide 20 cm. Calcula su volumen (cm³).', 'قاعدة منشور مثلث قائم ضلعاه القائمان 5 سم و12 سم وارتفاعه 20 سم. احسب حجمه (سم³).'), solution: same('$\\frac{5\\cdot 12}{2}\\cdot 20=600$'), answer: { expected: n(600) } },
            { id: 45, difficulty: 'medium', question: with_(say('Kono baten erradioa 9 cm da eta altuera 10 cm. Kalkulatu bolumena (cm³).', 'Un cono tiene 9 cm de radio y 10 cm de altura. Calcula su volumen (cm³).', 'مخروط نصف قطره 9 سم وارتفاعه 10 سم. احسب حجمه (سم³).'), PI), solution: same('$\\frac{3{,}14\\cdot 9^{2}\\cdot 10}{3}=847{,}8$'), answer: { expected: v('847,8') } },
            { id: 46, difficulty: 'medium', question: say('Keopsen piramidearen oinarria 230 m-ko aldeko karratua da eta altuera 146 m. Kalkulatu bolumena (m³), unitateetara hurbilduta.', 'La pirámide de Keops tiene una base cuadrada de 230 m de lado y 146 m de altura. Calcula su volumen (m³), aproximado a las unidades.', 'قاعدة هرم خوفو مربع طول ضلعه 230 م وارتفاعه 146 م. احسب حجمه (م³) مقرّبًا إلى الآحاد.'), solution: same('$\\frac{230^{2}\\cdot 146}{3}\\approx 2\\,574\\,467$'), answer: { expected: n(2574467) } },
            { id: 47, difficulty: 'medium', question: with_(say('Ontzi batek 6 cm-ko erradioko erdiesfera forma du. Zenbat cm³ sartzen dira?', 'Un cuenco tiene forma de semiesfera de 6 cm de radio. ¿Cuántos cm³ caben?', 'وعاء على شكل نصف كرة نصف قطرها 6 سم. كم سم³ يسع؟'), PI), solution: same('$\\frac{4\\cdot 3{,}14\\cdot 6^{3}}{3}\\mathbin{:}2=452{,}16$'), answer: { expected: v('452,16') } },
            { id: 48, difficulty: 'hard', question: say('10 cm-ko aldeko oinarri karratua eta 12 cm-ko altuera dituen piramide bat altueraren erdian mozten da. Kalkulatu enborraren bolumena (cm³).', 'Una pirámide de base cuadrada de 10 cm de lado y 12 cm de altura se corta a mitad de altura. Calcula el volumen del tronco (cm³).', 'هرم قاعدته مربع طول ضلعه 10 سم وارتفاعه 12 سم يُقطع عند منتصف ارتفاعه. احسب حجم الجذع (سم³).'), solution: same('$\\frac{10^{2}\\cdot 12}{3}-\\frac{5^{2}\\cdot 6}{3}=350$'), answer: { expected: n(350) } },
            { id: 49, difficulty: 'hard', question: with_(say('Izozki bat 3 cm-ko erradioko eta 10 cm-ko altuerako konoa da, gainean erradio bereko erdiesfera bat duela. Zein da bolumena (cm³)?', 'Un helado es un cono de 3 cm de radio y 10 cm de altura con una semiesfera del mismo radio encima. ¿Cuál es su volumen (cm³)?', 'مثلجات على شكل مخروط نصف قطره 3 سم وارتفاعه 10 سم فوقه نصف كرة بنصف القطر نفسه. ما حجمها (سم³)؟'), PI), solution: same('$\\frac{3{,}14\\cdot 3^{2}\\cdot 10}{3}+\\frac{2\\cdot 3{,}14\\cdot 3^{3}}{3}=150{,}72$'), answer: { expected: v('150,72') } },
            { id: 50, difficulty: 'hard', question: say('3 cm-ko erradioko eta 4 cm-ko altuerako zilindro bat urtu eta 3 cm-ko erradioko bolak egiten dira. Zenbat bola ateratzen dira?', 'Se funde un cilindro de 3 cm de radio y 4 cm de altura y se hacen bolas de 3 cm de radio. ¿Cuántas bolas salen?', 'تُصهر أسطوانة نصف قطرها 3 سم وارتفاعها 4 سم وتُصنع منها كرات نصف قطرها 3 سم. كم كرة نحصل عليها؟'), solution: say('Bolumen bera dute: $3{,}14\\cdot 3^{2}\\cdot 4=113{,}04$ eta $\\frac{4\\cdot 3{,}14\\cdot 3^{3}}{3}=113{,}04$. Bola 1.', 'Tienen el mismo volumen: $3{,}14\\cdot 3^{2}\\cdot 4=113{,}04$ y $\\frac{4\\cdot 3{,}14\\cdot 3^{3}}{3}=113{,}04$. Sale 1 bola.', 'لهما الحجم نفسه: $3{,}14\\cdot 3^{2}\\cdot 4=113{,}04$ و$\\frac{4\\cdot 3{,}14\\cdot 3^{3}}{3}=113{,}04$. كرة واحدة.'), answer: { expected: n(1) } }
        ]
    }
]

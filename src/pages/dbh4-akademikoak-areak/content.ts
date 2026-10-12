import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Azalerak, bolumenak eta antzekotasuna · 4. DBH akademikoak — diagnostic,
   guided practice, exercise bank and challenges, after Santillana 4.º
   Académicas unit 6 (the pentagon of radius 5,1, the sector of 30°, the
   pyramid of side 6 and height 4, the hexagonal prism of side 2, the cone
   of generatrix 3,91, the cylinder with a hemisphere, the pyramids of ratio
   0,5 and the volumes 8 and 343) and Anaya 4.º Académicas unit 6 (the
   projections 20 and 22,05, the legs 15 and 20, the frustums of cone 35-20
   and pyramid 40-16, the tent of the 1:500 model, the Statue of Liberty).
   Every closed answer is a single number without the unit; π ≈ 3,14 and
   non-exact roots are rounded to hundredths.
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

export const areasSimilarityDiagnostic: DiagnosticQuestion[] = [
    {
        id: 5401,
        prompt: say('Poligono erregular baten apotema…', 'La apotema de un polígono regular es…', 'عامد المضلع المنتظم هو…'),
        options: [
            say('zentrotik alde baten erdiko punturainoko distantzia', 'la distancia del centro al punto medio de un lado', 'المسافة من المركز إلى منتصف ضلع'),
            say('zirkunferentzia zirkunskribatuaren erradioa', 'el radio de la circunferencia circunscrita', 'نصف قطر الدائرة المحيطة'),
            say('aldearen erdia', 'la mitad del lado', 'نصف الضلع')
        ],
        correctIndex: 0,
        explanation: say('Erradioa, apotema eta alde-erdia triangelu angeluzuzen bat dira.', 'El radio, la apotema y medio lado forman un triángulo rectángulo.', 'نصف القطر والعامد ونصف الضلع تكوّن مثلثًا قائمًا.'),
        topic: 'regular-polygons'
    },
    {
        id: 5402,
        prompt: say('5 eta 3 erradioko koroa zirkularraren azalera…', 'El área de la corona circular de radios 5 y 3 es…', 'مساحة الحلقة الدائرية التي نصفا قطريها 5 و3…'),
        options: [same('$\\pi(5-3)^{2}$'), same('$\\pi(5^{2}-3^{2})$'), same('$2\\pi(5-3)$')],
        correctIndex: 1,
        explanation: say('Zirkulu handia ken txikia: $25\\pi-9\\pi=16\\pi$.', 'El círculo grande menos el pequeño: $25\\pi-9\\pi=16\\pi$.', 'القرص الكبير ناقص الصغير: $25\\pi-9\\pi=16\\pi$.'),
        topic: 'circle-parts'
    },
    {
        id: 5403,
        prompt: say('6 erradioko eta 8 altuerako kono baten sortzaileak neurtzen du…', 'La generatriz de un cono de radio 6 y altura 8 mide…', 'راسم مخروط نصف قطره 6 وارتفاعه 8 طوله…'),
        options: [same('$14$'), same('$\\sqrt{28}$'), same('$10$')],
        correctIndex: 2,
        explanation: same('$\\sqrt{8^{2}+6^{2}}=\\sqrt{100}=10$'),
        topic: 'round-area'
    },
    {
        id: 5404,
        prompt: say('r erradioko esfera baten azalera…', 'El área de una esfera de radio r es…', 'مساحة كرة نصف قطرها r…'),
        options: [same('$4\\pi r^{2}$'), same('$\\pi r^{2}$'), same('$\\frac{4}{3}\\pi r^{3}$')],
        correctIndex: 0,
        explanation: say('Erradio bereko lau zirkulu.', 'Cuatro círculos de su mismo radio.', 'أربعة أقراص لها نصف القطر نفسه.'),
        topic: 'sphere-area'
    },
    {
        id: 5405,
        prompt: say('Oinarri eta altuera bereko kono baten bolumena, zilindroarekin alderatuta…', 'El volumen de un cono comparado con el cilindro de igual base y altura es…', 'حجم المخروط مقارنةً بالأسطوانة التي لها القاعدة والارتفاع نفسهما…'),
        options: [say('erdia', 'la mitad', 'النصف'), say('herena', 'un tercio', 'الثلث'), say('berdina', 'igual', 'مساوٍ')],
        correctIndex: 1,
        explanation: same('$V=\\frac{1}{3}\\pi r^{2}h$'),
        topic: 'pyramid-cone-volume'
    },
    {
        id: 5406,
        prompt: say('Bi angelu berdinak dituzten bi triangelu…', 'Dos triángulos que tienen dos ángulos iguales…', 'مثلثان لهما زاويتان متساويتان…'),
        options: [say('berdinak dira', 'son iguales', 'متطابقان'), say('ezin da jakin', 'no se puede saber', 'لا يمكن الحكم'), say('antzekoak dira', 'son semejantes', 'متشابهان')],
        correctIndex: 2,
        explanation: say('Hirugarren angelua ere berdina da: 180° osatzen dute.', 'El tercer ángulo también es igual: suman 180°.', 'الزاوية الثالثة متساوية أيضًا: المجموع 180°.'),
        topic: 'similar-triangles'
    },
    {
        id: 5407,
        prompt: say('Triangelu angeluzuzen batean, katetoen proiekzioak 4 eta 9 dira. Hipotenusarekiko altuerak neurtzen du…', 'En un triángulo rectángulo, las proyecciones de los catetos miden 4 y 9. La altura sobre la hipotenusa mide…', 'في مثلث قائم، مسقطا الضلعين القائمين 4 و9. الارتفاع على الوتر طوله…'),
        options: [same('$13$'), same('$6$'), same('$36$')],
        correctIndex: 1,
        explanation: same('$h=\\sqrt{4\\cdot 9}=6$'),
        topic: 'right-theorems'
    },
    {
        id: 5408,
        prompt: say('Antzekotasun-arrazoia 2 bada, bolumena biderkatzen da…', 'Si la razón de semejanza es 2, el volumen se multiplica por…', 'إذا كانت نسبة التشابه 2 فإن الحجم يُضرب في…'),
        options: [same('$2$'), same('$4$'), same('$8$')],
        correctIndex: 2,
        explanation: same('$2^{3}=8$'),
        topic: 'ratio-powers'
    }
]

export const areasSimilarityPractice: PracticeItem[] = [
    /* ---------- Areas of plane figures ---------- */
    {
        id: 1, stage: 'plane-areas',
        prompt: say('Hexagono erregular baten aldea 4 cm da eta apotema 3,46 cm. Kalkulatu azalera.', 'Un hexágono regular tiene 4 cm de lado y 3,46 cm de apotema. Calcula su área.', 'مسدس منتظم طول ضلعه 4 سم وعامده 3.46 سم. احسب مساحته.'),
        expected: v('41,52'),
        hint: same('$A=\\frac{P\\cdot a}{2}$'),
        explanation: same('$P=6\\cdot 4=24\\qquad \\frac{24\\cdot 3{,}46}{2}=41{,}52$')
    },
    {
        id: 2, stage: 'plane-areas',
        prompt: with_(say('Kalkulatu 10 cm-ko aldeko hexagono erregular baten apotema.', 'Calcula la apotema de un hexágono regular de 10 cm de lado.', 'احسب عامد مسدس منتظم طول ضلعه 10 سم.'), HUNDREDTHS),
        expected: v('8,66'),
        hint: say('Hexagonoan erradioa eta aldea berdinak dira.', 'En el hexágono, el radio es igual al lado.', 'في المسدس يساوي نصف القطر الضلع.'),
        explanation: same('$a=\\sqrt{10^{2}-5^{2}}=\\sqrt{75}\\approx 8{,}66$')
    },
    {
        id: 3, stage: 'plane-areas',
        prompt: with_(say('Kalkulatu 5 cm eta 3 cm-ko erradioko koroa zirkularraren azalera.', 'Calcula el área de la corona circular de radios 5 cm y 3 cm.', 'احسب مساحة الحلقة الدائرية التي نصفا قطريها 5 سم و3 سم.'), PI),
        expected: v('50,24'),
        hint: same('$A=\\pi(R^{2}-r^{2})$'),
        explanation: same('$3{,}14\\cdot (5^{2}-3^{2})=3{,}14\\cdot 16=50{,}24$')
    },
    {
        id: 4, stage: 'plane-areas',
        prompt: with_(say('Kalkulatu 6 cm-ko erradioko zirkulu bateko 90°-ko segmentu zirkularraren azalera.', 'Calcula el área del segmento circular de 90° de un círculo de 6 cm de radio.', 'احسب مساحة القطعة الدائرية التي قياسها 90° من قرص نصف قطره 6 سم.'), PI),
        expected: v('10,26'),
        hint: say('Zirkulu-laurdena ken triangelu angeluzuzena.', 'El cuarto de círculo menos el triángulo rectángulo.', 'ربع القرص ناقص المثلث القائم.'),
        explanation: same('$\\frac{3{,}14\\cdot 6^{2}}{4}-\\frac{6\\cdot 6}{2}=28{,}26-18=10{,}26$')
    },

    /* ---------- Areas of solids ---------- */
    {
        id: 5, stage: 'solid-areas',
        prompt: with_(say('Kalkulatu 2 cm-ko erradioko eta 5 cm-ko altuerako zilindro baten azalera osoa.', 'Calcula el área total de un cilindro de 2 cm de radio y 5 cm de altura.', 'احسب المساحة الكلية لأسطوانة نصف قطرها 2 سم وارتفاعها 5 سم.'), PI),
        expected: v('87,92'),
        hint: same('$A_T=2\\pi r h+2\\pi r^{2}$'),
        explanation: same('$2\\cdot 3{,}14\\cdot 2\\cdot 5+2\\cdot 3{,}14\\cdot 2^{2}=62{,}8+25{,}12=87{,}92$')
    },
    {
        id: 6, stage: 'solid-areas',
        prompt: say('Piramide karratu baten oinarriaren aldea 10 cm da eta altuera 12 cm. Kalkulatu azalera osoa.', 'Una pirámide cuadrangular tiene 10 cm de lado de la base y 12 cm de altura. Calcula su área total.', 'هرم رباعي ضلع قاعدته 10 سم وارتفاعه 12 سم. احسب مساحته الكلية.'),
        expected: n(360),
        hint: say('Lehenik apotema: altuera eta alde-erdia katetoak dira.', 'Primero la apotema: la altura y medio lado son los catetos.', 'أولًا العامد: الارتفاع ونصف الضلع ضلعان قائمان.'),
        explanation: same('$a_p=\\sqrt{12^{2}+5^{2}}=13\\qquad \\frac{40\\cdot 13}{2}+10^{2}=260+100=360$')
    },
    {
        id: 7, stage: 'solid-areas',
        prompt: with_(say('Kalkulatu 10 cm-ko erradioko esfera baten azalera.', 'Calcula el área de una esfera de 10 cm de radio.', 'احسب مساحة كرة نصف قطرها 10 سم.'), PI),
        expected: n(1256),
        hint: same('$A=4\\pi r^{2}$'),
        explanation: same('$4\\cdot 3{,}14\\cdot 10^{2}=1256$')
    },
    {
        id: 8, stage: 'solid-areas',
        prompt: with_(say('Kono baten erradioa 6 cm da eta altuera 8 cm. Kalkulatu alboko azalera.', 'Un cono tiene 6 cm de radio y 8 cm de altura. Calcula su área lateral.', 'مخروط نصف قطره 6 سم وارتفاعه 8 سم. احسب مساحته الجانبية.'), PI),
        expected: v('188,4'),
        hint: say('Lehenik sortzailea: $g=\\sqrt{h^{2}+r^{2}}$.', 'Primero la generatriz: $g=\\sqrt{h^{2}+r^{2}}$.', 'أولًا الراسم: $g=\\sqrt{h^{2}+r^{2}}$.'),
        explanation: same('$g=\\sqrt{8^{2}+6^{2}}=10\\qquad 3{,}14\\cdot 6\\cdot 10=188{,}4$')
    },

    /* ---------- Volumes ---------- */
    {
        id: 9, stage: 'volumes',
        prompt: say('Prisma hexagonal erregular baten aldea 2 cm da, oinarriaren apotema 1,73 cm eta altuera 6 cm. Kalkulatu bolumena.', 'Un prisma hexagonal regular tiene 2 cm de lado, 1,73 cm de apotema de la base y 6 cm de altura. Calcula su volumen.', 'منشور سداسي منتظم طول ضلعه 2 سم وعامد قاعدته 1.73 سم وارتفاعه 6 سم. احسب حجمه.'),
        expected: v('62,28'),
        hint: same('$V=A_B\\cdot h$'),
        explanation: same('$A_B=\\frac{12\\cdot 1{,}73}{2}=10{,}38\\qquad 10{,}38\\cdot 6=62{,}28$')
    },
    {
        id: 10, stage: 'volumes',
        prompt: say('Piramide karratu baten oinarriaren aldea 6 cm da eta apotema 5 cm. Kalkulatu bolumena.', 'Una pirámide cuadrangular tiene 6 cm de lado de la base y 5 cm de apotema. Calcula su volumen.', 'هرم رباعي ضلع قاعدته 6 سم وعامده 5 سم. احسب حجمه.'),
        expected: n(48),
        hint: say('Bolumenerako altuera behar da, ez apotema.', 'Para el volumen hace falta la altura, no la apotema.', 'يلزم للحجم الارتفاع لا العامد.'),
        explanation: same('$h=\\sqrt{5^{2}-3^{2}}=4\\qquad \\frac{6^{2}\\cdot 4}{3}=48$')
    },
    {
        id: 11, stage: 'volumes',
        prompt: with_(say('Kalkulatu 3 cm-ko erradioko esfera baten bolumena.', 'Calcula el volumen de una esfera de 3 cm de radio.', 'احسب حجم كرة نصف قطرها 3 سم.'), PI),
        expected: v('113,04'),
        hint: same('$V=\\frac{4}{3}\\pi r^{3}$'),
        explanation: same('$\\frac{4\\cdot 3{,}14\\cdot 3^{3}}{3}=113{,}04$')
    },
    {
        id: 12, stage: 'volumes',
        prompt: with_(say('Kalkulatu 3 cm-ko erradioko eta 4 cm-ko altuerako kono baten bolumena.', 'Calcula el volumen de un cono de 3 cm de radio y 4 cm de altura.', 'احسب حجم مخروط نصف قطره 3 سم وارتفاعه 4 سم.'), PI),
        expected: v('37,68'),
        hint: same('$V=\\frac{1}{3}\\pi r^{2}h$'),
        explanation: same('$\\frac{3{,}14\\cdot 3^{2}\\cdot 4}{3}=37{,}68$')
    },

    /* ---------- Similarity ---------- */
    {
        id: 13, stage: 'similarity',
        prompt: say('Zuzen paralelo batzuek zuzen bat 3 cm eta 5 cm-ko zatietan mozten dute, eta beste bat 4,5 cm eta x-ko zatietan. Kalkulatu x.', 'Unas rectas paralelas cortan una recta en segmentos de 3 cm y 5 cm, y otra en segmentos de 4,5 cm y x. Calcula x.', 'مستقيمات متوازية تقطع مستقيمًا إلى قطعتين 3 سم و5 سم، ومستقيمًا آخر إلى قطعتين 4.5 سم وx. احسب x.'),
        expected: v('7,5'),
        hint: same('$\\frac{3}{4{,}5}=\\frac{5}{x}$'),
        explanation: same('$x=\\frac{4{,}5\\cdot 5}{3}=7{,}5$')
    },
    {
        id: 14, stage: 'similarity',
        prompt: say('Triangelu baten aldeak 4, 6 eta 8 cm dira. Antzeko triangelu baten alde txikiena 10 cm da. Zenbat neurtzen du alde handienak?', 'Un triángulo tiene lados de 4, 6 y 8 cm. En un triángulo semejante el lado menor mide 10 cm. ¿Cuánto mide el mayor?', 'أضلاع مثلث 4 و6 و8 سم. في مثلث مشابه له أصغر ضلع 10 سم. كم طول أكبر ضلع؟'),
        expected: n(20),
        hint: say('Arrazoia: alde txikiak alderatu.', 'La razón: compara los lados menores.', 'النسبة: قارن الضلعين الأصغرين.'),
        explanation: same('$k=\\frac{10}{4}=2{,}5\\qquad 8\\cdot 2{,}5=20$')
    },
    {
        id: 15, stage: 'similarity',
        prompt: say('Triangelu angeluzuzen batean, katetoen proiekzioak hipotenusan 4 cm eta 9 cm dira. Kalkulatu hipotenusarekiko altuera.', 'En un triángulo rectángulo, las proyecciones de los catetos sobre la hipotenusa miden 4 cm y 9 cm. Calcula la altura sobre la hipotenusa.', 'في مثلث قائم، مسقطا الضلعين القائمين على الوتر 4 سم و9 سم. احسب الارتفاع على الوتر.'),
        expected: n(6),
        hint: same('$h^{2}=m\\cdot n$'),
        explanation: same('$h=\\sqrt{4\\cdot 9}=\\sqrt{36}=6$')
    },
    {
        id: 16, stage: 'similarity',
        prompt: say('Triangelu angeluzuzen baten hipotenusa 25 cm da, eta kateto baten proiekzioa 16 cm. Zenbat neurtzen du kateto horrek?', 'La hipotenusa de un triángulo rectángulo mide 25 cm y la proyección de un cateto, 16 cm. ¿Cuánto mide ese cateto?', 'وتر مثلث قائم 25 سم ومسقط أحد الضلعين القائمين 16 سم. كم طول هذا الضلع؟'),
        expected: n(20),
        hint: same('$b^{2}=a\\cdot n$'),
        explanation: same('$b=\\sqrt{25\\cdot 16}=\\sqrt{400}=20$')
    },

    /* ---------- Ratio of similarity and scales ---------- */
    {
        id: 17, stage: 'ratios',
        prompt: say('Bi irudi antzekoren arrazoia 3 da. Txikiaren azalera 5 cm² bada, zenbat da handiarena?', 'La razón de dos figuras semejantes es 3. Si el área de la pequeña es 5 cm², ¿cuánto es la de la grande?', 'نسبة شكلين متشابهين 3. إذا كانت مساحة الصغير 5 سم² فكم مساحة الكبير؟'),
        expected: n(45),
        hint: say('Azalerak $k^{2}$-z biderkatzen dira.', 'Las áreas se multiplican por $k^{2}$.', 'المساحات تُضرب في $k^{2}$.'),
        explanation: same('$5\\cdot 3^{2}=45$')
    },
    {
        id: 18, stage: 'ratios',
        prompt: say('Bi gorputz antzekoren arrazoia 2 da. Txikiaren bolumena 7 cm³ bada, zenbat da handiarena?', 'La razón de dos cuerpos semejantes es 2. Si el volumen del pequeño es 7 cm³, ¿cuánto es el del grande?', 'نسبة جسمين متشابهين 2. إذا كان حجم الصغير 7 سم³ فكم حجم الكبير؟'),
        expected: n(56),
        hint: say('Bolumenak $k^{3}$-z biderkatzen dira.', 'Los volúmenes se multiplican por $k^{3}$.', 'الحجوم تُضرب في $k^{3}$.'),
        explanation: same('$7\\cdot 2^{3}=56$')
    },
    {
        id: 19, stage: 'ratios',
        prompt: say('1:100 eskalako plano batean, gela batek 20 cm² hartzen ditu. Zenbat m² ditu gela errealak?', 'En un plano a escala 1:100, una habitación ocupa 20 cm². ¿Cuántos m² tiene la habitación real?', 'في مخطط بمقياس 1:100 تشغل غرفة 20 سم². كم م² مساحة الغرفة الحقيقية؟'),
        expected: n(20),
        hint: say('Azalerak $100^{2}$-z biderkatu, gero zati 10 000.', 'Multiplica el área por $100^{2}$ y luego divide entre 10 000.', 'اضرب المساحة في $100^{2}$ ثم اقسم على 10 000.'),
        explanation: same('$20\\cdot 100^{2}=200\\,000\\qquad 200\\,000\\mathbin{:}10\\,000=20$')
    },
    {
        id: 20, stage: 'ratios',
        prompt: with_(say('Kono-enbor baten oinarrien erradioak 6 cm eta 3 cm dira, eta altuera 4 cm. Kalkulatu bolumena.', 'Un tronco de cono tiene bases de 6 cm y 3 cm de radio y 4 cm de altura. Calcula su volumen.', 'جذع مخروط نصفا قطري قاعدتيه 6 سم و3 سم وارتفاعه 4 سم. احسب حجمه.'), PI),
        expected: v('263,76'),
        hint: same('$\\frac{x}{3}=\\frac{x+4}{6}$'),
        explanation: same('$x=4\\qquad \\frac{3{,}14\\cdot 6^{2}\\cdot 8}{3}-\\frac{3{,}14\\cdot 3^{2}\\cdot 4}{3}=301{,}44-37{,}68=263{,}76$')
    }
]

export const areasSimilarityChallenges: ChallengeItem[] = [
    /* ---------- Areas of plane figures ---------- */
    {
        id: 101, stage: 'plane-areas', points: 10, context: 'starter',
        prompt: with_(say('Triangelu aldeberdin baten aldea 6 cm da. Kalkulatu apotema.', 'Un triángulo equilátero tiene 6 cm de lado. Calcula su apotema.', 'مثلث متساوي الأضلاع طول ضلعه 6 سم. احسب عامده.'), HUNDREDTHS),
        expected: v('1,73'),
        hint: say('Apotema altueraren herena da.', 'La apotema es un tercio de la altura.', 'العامد ثلث الارتفاع.'),
        explanation: same('$h=\\sqrt{6^{2}-3^{2}}=\\sqrt{27}\\qquad \\frac{\\sqrt{27}}{3}=\\sqrt{3}\\approx 1{,}73$')
    },
    {
        id: 102, stage: 'plane-areas', points: 20, context: 'advanced',
        prompt: with_(say('Kalkulatu 6 cm eta 3 cm-ko erradioko eta 60°-ko trapezio zirkular baten azalera.', 'Calcula el área de un trapecio circular de 60° y radios 6 cm y 3 cm.', 'احسب مساحة شبه منحرف دائري قياسه 60° ونصفا قطريه 6 سم و3 سم.'), PI),
        expected: v('14,13'),
        hint: say('Koroaren seirena.', 'La sexta parte de la corona.', 'سدس الحلقة.'),
        explanation: same('$\\frac{3{,}14\\cdot (6^{2}-3^{2})}{6}=\\frac{84{,}78}{6}=14{,}13$')
    },
    {
        id: 103, stage: 'plane-areas', points: 30, context: 'master',
        prompt: with_(say('Kalkulatu 6 cm-ko erradioko zirkulu bateko 60°-ko segmentu zirkularraren azalera.', 'Calcula el área del segmento circular de 60° de un círculo de 6 cm de radio.', 'احسب مساحة القطعة الدائرية التي قياسها 60° من قرص نصف قطره 6 سم.'), PI, HUNDREDTHS),
        expected: v('3,25'),
        hint: say('Triangelua aldeberdina da: 6 cm-ko aldea.', 'El triángulo es equilátero, de 6 cm de lado.', 'المثلث متساوي الأضلاع طول ضلعه 6 سم.'),
        explanation: same('$\\frac{3{,}14\\cdot 6^{2}}{6}=18{,}84\\qquad \\frac{6\\cdot\\sqrt{27}}{2}\\approx 15{,}59\\qquad 18{,}84-15{,}59=3{,}25$')
    },

    /* ---------- Areas of solids ---------- */
    {
        id: 104, stage: 'solid-areas', points: 10, context: 'starter',
        prompt: with_(say('Kalkulatu 5 cm-ko erradioko esfera-erdi itxi baten azalera osoa.', 'Calcula el área total de una semiesfera cerrada de 5 cm de radio.', 'احسب المساحة الكلية لنصف كرة مغلق نصف قطره 5 سم.'), PI),
        expected: v('235,5'),
        hint: say('Gainazal kurbatua $2\\pi r^{2}$ eta oinarria $\\pi r^{2}$.', 'La superficie curva es $2\\pi r^{2}$ y la base $\\pi r^{2}$.', 'السطح المنحني $2\\pi r^{2}$ والقاعدة $\\pi r^{2}$.'),
        explanation: same('$3\\cdot 3{,}14\\cdot 5^{2}=235{,}5$')
    },
    {
        id: 105, stage: 'solid-areas', points: 20, context: 'advanced',
        prompt: with_(say('10 cm-ko erradioko esfera bat 3 cm-ra dauden bi plano paralelok mozten dute. Kalkulatu bien arteko zona esferikoaren azalera.', 'Una esfera de 10 cm de radio se corta con dos planos paralelos separados 3 cm. Calcula el área de la zona esférica entre ellos.', 'كرة نصف قطرها 10 سم يقطعها مستويان متوازيان المسافة بينهما 3 سم. احسب مساحة المنطقة الكروية بينهما.'), PI),
        expected: v('188,4'),
        hint: same('$A=2\\pi r h$'),
        explanation: same('$2\\cdot 3{,}14\\cdot 10\\cdot 3=188{,}4$')
    },
    {
        id: 106, stage: 'solid-areas', points: 30, context: 'master',
        prompt: with_(say('Izozki-kono bat 3 cm-ko erradioko eta 10 cm-ko sortzaileko konoa da, eta gainean 3 cm-ko erradioko esfera-erdi bat du. Kalkulatu kanpoko azalera.', 'Un cucurucho es un cono de 3 cm de radio y 10 cm de generatriz con una semiesfera de 3 cm de radio encima. Calcula su área exterior.', 'مخروط مثلّجات نصف قطره 3 سم وراسمه 10 سم وفوقه نصف كرة نصف قطره 3 سم. احسب مساحته الخارجية.'), PI),
        expected: v('150,72'),
        hint: say('Konoaren alboa gehi esfera-erdiaren gainazal kurbatua; elkargunea ez da zenbatzen.', 'El lateral del cono más la superficie curva de la semiesfera; la unión no cuenta.', 'جانب المخروط زائد السطح المنحني لنصف الكرة؛ ولا يُحسب موضع الالتقاء.'),
        explanation: same('$3{,}14\\cdot 3\\cdot 10+2\\cdot 3{,}14\\cdot 3^{2}=94{,}2+56{,}52=150{,}72$')
    },

    /* ---------- Volumes ---------- */
    {
        id: 107, stage: 'volumes', points: 10, context: 'starter',
        prompt: say('Depósito batek 1,5 m × 2 m × 0,8 m neurtzen ditu. Zenbat litro sartzen dira?', 'Un depósito mide 1,5 m × 2 m × 0,8 m. ¿Cuántos litros caben?', 'خزان أبعاده 1.5 م × 2 م × 0.8 م. كم لترًا يسع؟'),
        expected: n(2400),
        hint: say('1 m³ = 1000 L.', '1 m³ = 1000 L.', '1 م³ = 1000 لتر.'),
        explanation: same('$1{,}5\\cdot 2\\cdot 0{,}8=2{,}4\\qquad 2{,}4\\cdot 1000=2400$')
    },
    {
        id: 108, stage: 'volumes', points: 20, context: 'advanced',
        prompt: with_(say('Esfera baten bolumena 904,32 cm³ da. Zein da erradioa?', 'Una esfera tiene 904,32 cm³ de volumen. ¿Cuál es su radio?', 'حجم كرة 904.32 سم³. ما نصف قطرها؟'), PI),
        expected: n(6),
        hint: say('Askatu $r^{3}$ eta atera erro kubikoa.', 'Despeja $r^{3}$ y saca la raíz cúbica.', 'اعزل $r^{3}$ واستخرج الجذر التكعيبي.'),
        explanation: same('$r^{3}=\\frac{3\\cdot 904{,}32}{4\\cdot 3{,}14}=216\\qquad \\sqrt[3]{216}=6$')
    },
    {
        id: 109, stage: 'volumes', points: 30, context: 'master',
        prompt: with_(say('3 cm-ko erradioko eta 6 cm-ko altuerako zilindro batean, 3 cm-ko erradioko esfera bat sartzen da. Zenbat bolumen geratzen da libre?', 'Dentro de un cilindro de 3 cm de radio y 6 cm de altura se mete una esfera de 3 cm de radio. ¿Cuánto volumen queda libre?', 'داخل أسطوانة نصف قطرها 3 سم وارتفاعها 6 سم توضع كرة نصف قطرها 3 سم. كم يبقى من الحجم فارغًا؟'), PI),
        expected: v('56,52'),
        hint: say('Zilindroa ken esfera; esfera zilindroaren bi heren da.', 'El cilindro menos la esfera; la esfera es dos tercios del cilindro.', 'الأسطوانة ناقص الكرة؛ والكرة ثلثا الأسطوانة.'),
        explanation: same('$3{,}14\\cdot 3^{2}\\cdot 6=169{,}56\\qquad 169{,}56-113{,}04=56{,}52$')
    },

    /* ---------- Similarity ---------- */
    {
        id: 110, stage: 'similarity', points: 10, context: 'starter',
        prompt: say('2 m-ko zutoin batek 1,5 m-ko itzala du, eta ordu berean zuhaitz batek 6 m-koa. Zenbat neurtzen du zuhaitzak?', 'Un poste de 2 m proyecta una sombra de 1,5 m y, a la misma hora, un árbol proyecta una de 6 m. ¿Cuánto mide el árbol?', 'عمود طوله 2 م ظله 1.5 م، وفي الساعة نفسها ظل شجرة 6 م. كم طول الشجرة؟'),
        expected: n(8),
        hint: same('$\\frac{x}{6}=\\frac{2}{1{,}5}$'),
        explanation: same('$x=\\frac{2\\cdot 6}{1{,}5}=8$')
    },
    {
        id: 111, stage: 'similarity', points: 20, context: 'advanced',
        prompt: say('Triangelu angeluzuzen baten hipotenusa 13 cm da, eta kateto baten proiekzioa 4 cm. Kalkulatu hipotenusarekiko altuera.', 'La hipotenusa de un triángulo rectángulo mide 13 cm y la proyección de un cateto, 4 cm. Calcula la altura sobre la hipotenusa.', 'وتر مثلث قائم 13 سم ومسقط أحد الضلعين القائمين 4 سم. احسب الارتفاع على الوتر.'),
        expected: n(6),
        hint: say('Beste proiekzioa: $13-4$.', 'La otra proyección: $13-4$.', 'المسقط الآخر: $13-4$.'),
        explanation: same('$n=13-4=9\\qquad h=\\sqrt{4\\cdot 9}=6$')
    },
    {
        id: 112, stage: 'similarity', points: 30, context: 'master',
        prompt: say('Triangelu angeluzuzen batean, hipotenusarekiko altuera 12 cm da eta proiekzio bat 9 cm. Zenbat neurtzen du hipotenusak?', 'En un triángulo rectángulo, la altura sobre la hipotenusa mide 12 cm y una proyección, 9 cm. ¿Cuánto mide la hipotenusa?', 'في مثلث قائم، الارتفاع على الوتر 12 سم وأحد المسقطين 9 سم. كم طول الوتر؟'),
        expected: n(25),
        hint: say('Altueraren teorematik beste proiekzioa.', 'Del teorema de la altura, la otra proyección.', 'من مبرهنة الارتفاع المسقط الآخر.'),
        explanation: same('$n=\\frac{12^{2}}{9}=16\\qquad 9+16=25$')
    },

    /* ---------- Ratio of similarity and scales ---------- */
    {
        id: 113, stage: 'ratios', points: 10, context: 'starter',
        prompt: say('Laukizuzen batek 20 cm²-ko azalera du. 1,5 arrazoiko laukizuzen antzeko batek zer azalera du?', 'Un rectángulo tiene 20 cm² de área. ¿Qué área tiene un rectángulo semejante de razón 1,5?', 'مستطيل مساحته 20 سم². ما مساحة مستطيل مشابه له نسبته 1.5؟'),
        expected: n(45),
        hint: same('$k^{2}=1{,}5^{2}$'),
        explanation: same('$20\\cdot 1{,}5^{2}=20\\cdot 2{,}25=45$')
    },
    {
        id: 114, stage: 'ratios', points: 20, context: 'advanced',
        prompt: say('1:500 eskalako maketa batean, karpa batek 402 cm²-ko oihala darama. Zenbat m² oihal behar ditu karpa errealak?', 'En una maqueta a escala 1:500, una carpa lleva 402 cm² de tela. ¿Cuántos m² de tela necesita la carpa real?', 'في مجسّم بمقياس 1:500 تحتاج خيمة إلى 402 سم² من القماش. كم م² تحتاج الخيمة الحقيقية؟'),
        expected: n(10050),
        hint: say('Azalerak $500^{2}$-z; gero cm²-tik m²-ra.', 'Las áreas, por $500^{2}$; después, de cm² a m².', 'المساحات في $500^{2}$؛ ثم من سم² إلى م².'),
        explanation: same('$402\\cdot 500^{2}=100\\,500\\,000\\qquad 100\\,500\\,000\\mathbin{:}10\\,000=10\\,050$')
    },
    {
        id: 115, stage: 'ratios', points: 30, context: 'master',
        prompt: with_(say('Kono-enbor baten altuera 9 cm da eta oinarrien erradioak 35 cm eta 20 cm. Kalkulatu bolumena.', 'Un tronco de cono tiene 9 cm de altura y bases de 35 cm y 20 cm de radio. Calcula su volumen.', 'جذع مخروط ارتفاعه 9 سم ونصفا قطري قاعدتيه 35 سم و20 سم. احسب حجمه.'), PI),
        expected: v('21901,5'),
        hint: same('$\\frac{x}{20}=\\frac{x+9}{35}$'),
        explanation: same('$x=12\\qquad \\frac{3{,}14\\cdot (35^{2}\\cdot 21-20^{2}\\cdot 12)}{3}=3{,}14\\cdot 6975=21\\,901{,}5$')
    }
]

export const areasSimilarityExerciseBank: ExerciseSection[] = [
    {
        id: 'plane-areas',
        title: say('Irudi lauen azalerak', 'Áreas de figuras planas', 'مساحات الأشكال المستوية'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Zenbat neurtzen du 10 cm-ko aldeko karratu baten apotemak?', '¿Cuánto mide la apotema de un cuadrado de 10 cm de lado?', 'كم طول عامد مربع ضلعه 10 سم؟'), solution: say('Alde-erdia: $10\\mathbin{:}2=5$', 'Medio lado: $10\\mathbin{:}2=5$', 'نصف الضلع: $10\\mathbin{:}2=5$'), answer: { expected: n(5) } },
            { id: 2, difficulty: 'easy', question: say('Pentagono erregular baten perimetroa 30 cm da eta apotema 4,12 cm. Kalkulatu azalera.', 'Un pentágono regular tiene 30 cm de perímetro y 4,12 cm de apotema. Calcula su área.', 'مخمس منتظم محيطه 30 سم وعامده 4.12 سم. احسب مساحته.'), solution: same('$\\frac{30\\cdot 4{,}12}{2}=61{,}8$'), answer: { expected: v('61,8') } },
            { id: 3, difficulty: 'easy', question: with_(say('Kalkulatu 10 cm-ko erradioko zirkunferentzia bateko 90°-ko arkuaren luzera.', 'Calcula la longitud de un arco de 90° de una circunferencia de 10 cm de radio.', 'احسب طول قوس 90° من دائرة نصف قطرها 10 سم.'), PI), solution: same('$\\frac{2\\cdot 3{,}14\\cdot 10}{4}=15{,}7$'), answer: { expected: v('15,7') } },
            { id: 4, difficulty: 'medium', question: with_(say('Kalkulatu 3 cm-ko erradioko eta 120°-ko sektore baten azalera.', 'Calcula el área de un sector de 120° y 3 cm de radio.', 'احسب مساحة قطاع قياسه 120° ونصف قطره 3 سم.'), PI), solution: same('$\\frac{3{,}14\\cdot 3^{2}}{3}=9{,}42$'), answer: { expected: v('9,42') } },
            { id: 5, difficulty: 'medium', question: with_(say('Kalkulatu 10 cm eta 6 cm-ko erradioko koroaren azalera.', 'Calcula el área de la corona de radios 10 cm y 6 cm.', 'احسب مساحة الحلقة التي نصفا قطريها 10 سم و6 سم.'), PI), solution: same('$3{,}14\\cdot (10^{2}-6^{2})=3{,}14\\cdot 64=200{,}96$'), answer: { expected: v('200,96') } },
            { id: 6, difficulty: 'medium', question: with_(say('Kalkulatu 8 cm-ko aldeko hexagono erregular baten apotema.', 'Calcula la apotema de un hexágono regular de 8 cm de lado.', 'احسب عامد مسدس منتظم طول ضلعه 8 سم.'), HUNDREDTHS), solution: same('$\\sqrt{8^{2}-4^{2}}=\\sqrt{48}\\approx 6{,}93$'), answer: { expected: v('6,93') } },
            { id: 7, difficulty: 'medium', question: with_(say('Zirkulu baten azalera 78,5 cm² da. Zein da erradioa?', 'Un círculo tiene 78,5 cm² de área. ¿Cuál es su radio?', 'مساحة قرص 78.5 سم². ما نصف قطره؟'), PI), solution: same('$r^{2}=78{,}5\\mathbin{:}3{,}14=25\\qquad r=5$'), answer: { expected: n(5) } },
            { id: 8, difficulty: 'hard', question: with_(say('4 cm-ko aldeko karratu batean zirkulu bat inskribatzen da. Kalkulatu izkinetako azalera.', 'En un cuadrado de 4 cm de lado se inscribe un círculo. Calcula el área de las esquinas.', 'في مربع ضلعه 4 سم تُرسم دائرة داخلية. احسب مساحة الزوايا.'), PI), solution: same('$4^{2}-3{,}14\\cdot 2^{2}=16-12{,}56=3{,}44$'), answer: { expected: v('3,44') } },
            { id: 9, difficulty: 'hard', question: with_(say('Kalkulatu 10 cm eta 5 cm-ko erradioko eta 72°-ko trapezio zirkular baten azalera.', 'Calcula el área de un trapecio circular de 72° y radios 10 cm y 5 cm.', 'احسب مساحة شبه منحرف دائري قياسه 72° ونصفا قطريه 10 سم و5 سم.'), PI), solution: same('$\\frac{3{,}14\\cdot (10^{2}-5^{2})}{5}=3{,}14\\cdot 15=47{,}1$'), answer: { expected: v('47,1') } },
            { id: 10, difficulty: 'hard', question: say('Zergatik da hexagono erregularraren apotema aldearen $\\frac{\\sqrt{3}}{2}$?', '¿Por qué la apotema del hexágono regular es $\\frac{\\sqrt{3}}{2}$ del lado?', 'لماذا يساوي عامد المسدس المنتظم $\\frac{\\sqrt{3}}{2}$ من الضلع؟'), solution: say('Erradioa aldearen berdina da, beraz $a=\\sqrt{l^{2}-\\frac{l^{2}}{4}}=\\sqrt{\\frac{3l^{2}}{4}}=\\frac{\\sqrt{3}}{2}l$.', 'El radio es igual al lado, así que $a=\\sqrt{l^{2}-\\frac{l^{2}}{4}}=\\sqrt{\\frac{3l^{2}}{4}}=\\frac{\\sqrt{3}}{2}l$.', 'نصف القطر يساوي الضلع، إذن $a=\\sqrt{l^{2}-\\frac{l^{2}}{4}}=\\sqrt{\\frac{3l^{2}}{4}}=\\frac{\\sqrt{3}}{2}l$.') }
        ]
    },
    {
        id: 'solid-areas',
        title: say('Gorputzen azalerak', 'Áreas de los cuerpos', 'مساحات الأجسام'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Kalkulatu 5 cm-ko ertzeko kubo baten azalera.', 'Calcula el área de un cubo de 5 cm de arista.', 'احسب مساحة مكعب طول حرفه 5 سم.'), solution: same('$6\\cdot 5^{2}=150$'), answer: { expected: n(150) } },
            { id: 12, difficulty: 'easy', question: with_(say('Kalkulatu 5 cm-ko erradioko esfera baten azalera.', 'Calcula el área de una esfera de 5 cm de radio.', 'احسب مساحة كرة نصف قطرها 5 سم.'), PI), solution: same('$4\\cdot 3{,}14\\cdot 5^{2}=314$'), answer: { expected: n(314) } },
            { id: 13, difficulty: 'easy', question: with_(say('Kalkulatu 3 cm-ko erradioko eta 10 cm-ko altuerako zilindro baten alboko azalera.', 'Calcula el área lateral de un cilindro de 3 cm de radio y 10 cm de altura.', 'احسب المساحة الجانبية لأسطوانة نصف قطرها 3 سم وارتفاعها 10 سم.'), PI), solution: same('$2\\cdot 3{,}14\\cdot 3\\cdot 10=188{,}4$'), answer: { expected: v('188,4') } },
            { id: 14, difficulty: 'medium', question: say('Prisma karratu baten oinarriaren aldea 4 cm da eta altuera 10 cm. Kalkulatu azalera osoa.', 'Un prisma cuadrangular tiene 4 cm de lado de la base y 10 cm de altura. Calcula su área total.', 'منشور رباعي ضلع قاعدته 4 سم وارتفاعه 10 سم. احسب مساحته الكلية.'), solution: same('$16\\cdot 10+2\\cdot 4^{2}=160+32=192$'), answer: { expected: n(192) } },
            { id: 15, difficulty: 'medium', question: with_(say('Kono baten erradioa 5 cm da eta altuera 12 cm. Kalkulatu azalera osoa.', 'Un cono tiene 5 cm de radio y 12 cm de altura. Calcula su área total.', 'مخروط نصف قطره 5 سم وارتفاعه 12 سم. احسب مساحته الكلية.'), PI), solution: same('$g=\\sqrt{12^{2}+5^{2}}=13\\qquad 3{,}14\\cdot 5\\cdot 13+3{,}14\\cdot 5^{2}=204{,}1+78{,}5=282{,}6$'), answer: { expected: v('282,6') } },
            { id: 16, difficulty: 'medium', question: say('Piramide karratu baten oinarriaren aldea 10 cm da eta alboko ertza 13 cm. Kalkulatu alboko azalera.', 'Una pirámide cuadrangular tiene 10 cm de lado de la base y 13 cm de arista lateral. Calcula su área lateral.', 'هرم رباعي ضلع قاعدته 10 سم وحرفه الجانبي 13 سم. احسب مساحته الجانبية.'), solution: same('$a_p=\\sqrt{13^{2}-5^{2}}=12\\qquad \\frac{40\\cdot 12}{2}=240$'), answer: { expected: n(240) } },
            { id: 17, difficulty: 'medium', question: with_(say('Esfera baten azalera 1256 cm² da. Zein da erradioa?', 'Una esfera tiene 1256 cm² de área. ¿Cuál es su radio?', 'مساحة كرة 1256 سم². ما نصف قطرها؟'), PI), solution: same('$r^{2}=1256\\mathbin{:}12{,}56=100\\qquad r=10$'), answer: { expected: n(10) } },
            { id: 18, difficulty: 'hard', question: with_(say('Kalkulatu 4 cm-ko erradioko esfera-erdi itxi baten azalera osoa.', 'Calcula el área total de una semiesfera cerrada de 4 cm de radio.', 'احسب المساحة الكلية لنصف كرة مغلق نصف قطره 4 سم.'), PI), solution: same('$2\\cdot 3{,}14\\cdot 4^{2}+3{,}14\\cdot 4^{2}=3\\cdot 3{,}14\\cdot 16=150{,}72$'), answer: { expected: v('150,72') } },
            { id: 19, difficulty: 'hard', question: with_(say('Kono-enbor baten oinarrien erradioak 6 cm eta 3 cm dira, eta altuera 4 cm. Kalkulatu alboko azalera, $\\pi(R+r)g$ erabiliz.', 'Un tronco de cono tiene bases de 6 cm y 3 cm de radio y 4 cm de altura. Calcula su área lateral con $\\pi(R+r)g$.', 'جذع مخروط نصفا قطري قاعدتيه 6 سم و3 سم وارتفاعه 4 سم. احسب مساحته الجانبية بالصيغة $\\pi(R+r)g$.'), PI), solution: same('$g=\\sqrt{4^{2}+3^{2}}=5\\qquad 3{,}14\\cdot (6+3)\\cdot 5=141{,}3$'), answer: { expected: v('141,3') } },
            { id: 20, difficulty: 'hard', question: say('5 cm-ko erradioko esfera batean, 2 cm-ko lodierako bi zona esferiko hartzen dira: bat ekuatorean eta bestea polo batean. Zeinek du azalera handiagoa?', 'En una esfera de 5 cm de radio se toman dos zonas esféricas de 2 cm de grosor: una en el ecuador y otra en un polo. ¿Cuál tiene más área?', 'في كرة نصف قطرها 5 سم تؤخذ منطقتان كرويتان سمك كل منهما 2 سم: واحدة عند خط الاستواء والأخرى عند أحد القطبين. أيهما أكبر مساحة؟'), solution: say('Berdinak dira: $2\\pi r h$ ez dago zonaren tokiaren mende. Biek $2\\cdot 3{,}14\\cdot 5\\cdot 2=62{,}8$ dute.', 'Son iguales: $2\\pi r h$ no depende de dónde esté la zona. Las dos tienen $2\\cdot 3{,}14\\cdot 5\\cdot 2=62{,}8$.', 'متساويتان: $2\\pi r h$ لا يتوقف على موضع المنطقة. لكل منهما $2\\cdot 3{,}14\\cdot 5\\cdot 2=62{,}8$.') }
        ]
    },
    {
        id: 'volumes',
        title: say('Bolumenak', 'Volúmenes', 'الحجوم'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Kalkulatu 4 cm × 5 cm × 6 cm-ko ortoedro baten bolumena.', 'Calcula el volumen de un ortoedro de 4 cm × 5 cm × 6 cm.', 'احسب حجم متوازي مستطيلات أبعاده 4 سم × 5 سم × 6 سم.'), solution: same('$4\\cdot 5\\cdot 6=120$'), answer: { expected: n(120) } },
            { id: 22, difficulty: 'easy', question: with_(say('Kalkulatu 2 cm-ko erradioko eta 10 cm-ko altuerako zilindro baten bolumena.', 'Calcula el volumen de un cilindro de 2 cm de radio y 10 cm de altura.', 'احسب حجم أسطوانة نصف قطرها 2 سم وارتفاعها 10 سم.'), PI), solution: same('$3{,}14\\cdot 2^{2}\\cdot 10=125{,}6$'), answer: { expected: v('125,6') } },
            { id: 23, difficulty: 'easy', question: say('Piramide baten oinarriaren azalera 30 cm² da eta altuera 7 cm. Kalkulatu bolumena.', 'Una pirámide tiene 30 cm² de área de la base y 7 cm de altura. Calcula su volumen.', 'هرم مساحة قاعدته 30 سم² وارتفاعه 7 سم. احسب حجمه.'), solution: same('$\\frac{30\\cdot 7}{3}=70$'), answer: { expected: n(70) } },
            { id: 24, difficulty: 'medium', question: with_(say('Kalkulatu 3 cm-ko erradioko eta 12 cm-ko altuerako kono baten bolumena.', 'Calcula el volumen de un cono de 3 cm de radio y 12 cm de altura.', 'احسب حجم مخروط نصف قطره 3 سم وارتفاعه 12 سم.'), PI), solution: same('$\\frac{3{,}14\\cdot 3^{2}\\cdot 12}{3}=113{,}04$'), answer: { expected: v('113,04') } },
            { id: 25, difficulty: 'medium', question: with_(say('Kalkulatu 6 cm-ko erradioko esfera baten bolumena.', 'Calcula el volumen de una esfera de 6 cm de radio.', 'احسب حجم كرة نصف قطرها 6 سم.'), PI), solution: same('$\\frac{4\\cdot 3{,}14\\cdot 6^{3}}{3}=904{,}32$'), answer: { expected: v('904,32') } },
            { id: 26, difficulty: 'medium', question: say('Kubo formako ontzi baten ertza 40 cm da. Zenbat litro sartzen dira?', 'Un recipiente cúbico tiene 40 cm de arista. ¿Cuántos litros caben?', 'وعاء مكعب طول حرفه 40 سم. كم لترًا يسع؟'), solution: same('$4^{3}=64$'), answer: { expected: n(64) } },
            { id: 27, difficulty: 'medium', question: say('Piramide karratu baten oinarriaren aldea 10 cm da eta apotema 13 cm. Kalkulatu bolumena.', 'Una pirámide cuadrangular tiene 10 cm de lado de la base y 13 cm de apotema. Calcula su volumen.', 'هرم رباعي ضلع قاعدته 10 سم وعامده 13 سم. احسب حجمه.'), solution: same('$h=\\sqrt{13^{2}-5^{2}}=12\\qquad \\frac{10^{2}\\cdot 12}{3}=400$'), answer: { expected: n(400) } },
            { id: 28, difficulty: 'hard', question: with_(say('Izozki-kono bat 3 cm-ko erradioko eta 12 cm-ko altuerako konoa da, gainean 3 cm-ko erradioko esfera-erdi bat duela. Kalkulatu bolumena.', 'Un helado es un cono de 3 cm de radio y 12 cm de altura con una semiesfera de 3 cm de radio encima. Calcula su volumen.', 'مثلّجات على شكل مخروط نصف قطره 3 سم وارتفاعه 12 سم وفوقه نصف كرة نصف قطره 3 سم. احسب حجمها.'), PI), solution: same('$113{,}04+\\frac{2\\cdot 3{,}14\\cdot 3^{3}}{3}=113{,}04+56{,}52=169{,}56$'), answer: { expected: v('169,56') } },
            { id: 29, difficulty: 'hard', question: with_(say('6 cm-ko ertzeko kubo bati 1 cm-ko erradioko zulo zilindriko bat egiten zaio alde batetik bestera. Zenbat bolumen geratzen da?', 'A un cubo de 6 cm de arista se le hace un agujero cilíndrico de 1 cm de radio de lado a lado. ¿Qué volumen queda?', 'يُثقب مكعب طول حرفه 6 سم ثقبًا أسطوانيًا نصف قطره 1 سم من جانب إلى جانب. كم يبقى من الحجم؟'), PI), solution: same('$6^{3}-3{,}14\\cdot 1^{2}\\cdot 6=216-18{,}84=197{,}16$'), answer: { expected: v('197,16') } },
            { id: 30, difficulty: 'hard', question: say('Zer gertatzen zaio zilindro baten bolumenari erradioa bikoizten bada? Eta altuera bikoizten bada?', '¿Qué le pasa al volumen de un cilindro si se duplica el radio? ¿Y si se duplica la altura?', 'ماذا يحدث لحجم أسطوانة إذا ضوعف نصف قطرها؟ وإذا ضوعف ارتفاعها؟'), solution: say('Erradioa karratuan dago: $\\pi(2r)^{2}h=4\\pi r^{2}h$, 4 aldiz. Altuera bikoiztean, 2 aldiz bakarrik.', 'El radio va al cuadrado: $\\pi(2r)^{2}h=4\\pi r^{2}h$, 4 veces. Al duplicar la altura, solo 2 veces.', 'نصف القطر مربّع: $\\pi(2r)^{2}h=4\\pi r^{2}h$، أي 4 مرات. وبمضاعفة الارتفاع مرتين فقط.') }
        ]
    },
    {
        id: 'similarity',
        title: say('Antzekotasuna', 'Semejanza', 'التشابه'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Zuzen paralelo batzuek zuzen bat 2 eta 3 cm-ko zatietan mozten dute, eta beste bat 4 cm eta x-ko zatietan. Kalkulatu x.', 'Unas paralelas cortan una recta en segmentos de 2 y 3 cm, y otra en segmentos de 4 cm y x. Calcula x.', 'متوازيات تقطع مستقيمًا إلى قطعتين 2 و3 سم، ومستقيمًا آخر إلى قطعتين 4 سم وx. احسب x.'), solution: same('$\\frac{2}{4}=\\frac{3}{x}\\ \\to\\ x=\\frac{4\\cdot 3}{2}=6$'), answer: { expected: n(6) } },
            { id: 32, difficulty: 'easy', question: say('3, 4 eta 5 cm-ko aldeko triangelu baten antzeko bat egiten da, 2 arrazoiarekin. Zein da haren perimetroa?', 'Se hace un triángulo semejante al de lados 3, 4 y 5 cm con razón 2. ¿Cuál es su perímetro?', 'يُرسم مثلث مشابه للمثلث الذي أضلاعه 3 و4 و5 سم بنسبة 2. ما محيطه؟'), solution: same('$2\\cdot (3+4+5)=24$'), answer: { expected: n(24) } },
            { id: 33, difficulty: 'easy', question: say('Triangelu batek 40° eta 70°-ko angeluak ditu, eta beste batek 70° eta 70°-koak. Antzekoak dira?', 'Un triángulo tiene ángulos de 40° y 70°, y otro de 70° y 70°. ¿Son semejantes?', 'لمثلث زاويتان 40° و70°، ولآخر زاويتان 70° و70°. هل هما متشابهان؟'), solution: say('Bai: lehenengoaren hirugarren angelua 70° da, eta bigarrenarena 40°. Hiru angeluak berdinak dira.', 'Sí: el tercer ángulo del primero es 70° y el del segundo 40°. Los tres ángulos son iguales.', 'نعم: الزاوية الثالثة للأول 70° وللثاني 40°. فالزوايا الثلاث متساوية.') },
            { id: 34, difficulty: 'medium', question: say('1,6 m-ko pertsona batek 2 m-ko itzala du, eta eraikin batek 25 m-koa. Zenbat neurtzen du eraikinak?', 'Una persona de 1,6 m proyecta una sombra de 2 m y un edificio una de 25 m. ¿Cuánto mide el edificio?', 'شخص طوله 1.6 م ظله 2 م، وظل مبنى 25 م. كم ارتفاع المبنى؟'), solution: same('$x=\\frac{1{,}6\\cdot 25}{2}=20$'), answer: { expected: n(20) } },
            { id: 35, difficulty: 'medium', question: say('Katetoen proiekzioak hipotenusan 2 cm eta 8 cm dira. Kalkulatu altuera.', 'Las proyecciones de los catetos sobre la hipotenusa miden 2 cm y 8 cm. Calcula la altura.', 'مسقطا الضلعين القائمين على الوتر 2 سم و8 سم. احسب الارتفاع.'), solution: same('$h=\\sqrt{2\\cdot 8}=\\sqrt{16}=4$'), answer: { expected: n(4) } },
            { id: 36, difficulty: 'medium', question: say('Hipotenusa 10 cm da eta kateto baten proiekzioa 3,6 cm. Kalkulatu kateto hori.', 'La hipotenusa mide 10 cm y la proyección de un cateto 3,6 cm. Calcula ese cateto.', 'الوتر 10 سم ومسقط أحد الضلعين القائمين 3.6 سم. احسب هذا الضلع.'), solution: same('$b=\\sqrt{10\\cdot 3{,}6}=\\sqrt{36}=6$'), answer: { expected: n(6) } },
            { id: 37, difficulty: 'medium', question: say('6, 8 eta 10 cm-ko eta 9, 12 eta 15 cm-ko triangeluak antzekoak dira. Zein da antzekotasun-arrazoia?', 'Los triángulos de lados 6, 8 y 10 cm y 9, 12 y 15 cm son semejantes. ¿Cuál es la razón de semejanza?', 'المثلثان اللذان أضلاعهما 6 و8 و10 سم و9 و12 و15 سم متشابهان. ما نسبة التشابه؟'), solution: same('$\\frac{9}{6}=\\frac{12}{8}=\\frac{15}{10}=1{,}5$'), answer: { expected: v('1,5') } },
            { id: 38, difficulty: 'hard', question: say('Hipotenusarekiko altuera 6 cm da eta proiekzio bat 4 cm. Zenbat neurtzen du hipotenusak?', 'La altura sobre la hipotenusa mide 6 cm y una proyección 4 cm. ¿Cuánto mide la hipotenusa?', 'الارتفاع على الوتر 6 سم وأحد المسقطين 4 سم. كم طول الوتر؟'), solution: same('$n=\\frac{6^{2}}{4}=9\\qquad 4+9=13$'), answer: { expected: n(13) } },
            { id: 39, difficulty: 'hard', question: say('Kalkulatu 3, 4 eta 5 cm-ko triangelu angeluzuzenaren hipotenusarekiko altuera.', 'Calcula la altura sobre la hipotenusa del triángulo rectángulo de lados 3, 4 y 5 cm.', 'احسب الارتفاع على الوتر في المثلث القائم الذي أضلاعه 3 و4 و5 سم.'), solution: same('$m=\\frac{3^{2}}{5}=1{,}8\\qquad n=\\frac{4^{2}}{5}=3{,}2\\qquad h=\\sqrt{1{,}8\\cdot 3{,}2}=2{,}4$'), answer: { expected: v('2,4') } },
            { id: 40, difficulty: 'hard', question: say('Lurrean dagoen ispilu bat 2 m-ra dago pertsona batengandik, eta haren begiak 1,5 m-ko altueran daude. Ispiluan eraikin baten goiko aldea ikusten du, eta eraikina ispilutik 30 m-ra dago. Zenbat neurtzen du eraikinak?', 'Un espejo en el suelo está a 2 m de una persona cuyos ojos están a 1,5 m de altura. En él ve lo alto de un edificio que está a 30 m del espejo. ¿Cuánto mide el edificio?', 'مرآة على الأرض على بعد 2 م من شخص عيناه على ارتفاع 1.5 م. يرى فيها قمة مبنى يبعد 30 م عن المرآة. كم ارتفاع المبنى؟'), solution: same('$\\frac{x}{30}=\\frac{1{,}5}{2}\\ \\to\\ x=\\frac{1{,}5\\cdot 30}{2}=22{,}5$'), answer: { expected: v('22,5') } }
        ]
    },
    {
        id: 'ratios',
        title: say('Antzekotasun-arrazoia eta eskalak', 'Razón de semejanza y escalas', 'نسبة التشابه والمقاييس'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Irudi baten perimetroa 10 cm da. Zenbat da 4 arrazoiko irudi antzeko batena?', 'Una figura tiene 10 cm de perímetro. ¿Cuánto mide el de una figura semejante de razón 4?', 'محيط شكل 10 سم. كم محيط شكل مشابه له بنسبة 4؟'), solution: same('$10\\cdot 4=40$'), answer: { expected: n(40) } },
            { id: 42, difficulty: 'easy', question: say('Irudi baten azalera 2 cm² da. Zenbat da 3 arrazoiko irudi antzeko batena?', 'Una figura tiene 2 cm² de área. ¿Cuánto mide la de una figura semejante de razón 3?', 'مساحة شكل 2 سم². كم مساحة شكل مشابه له بنسبة 3؟'), solution: same('$2\\cdot 3^{2}=18$'), answer: { expected: n(18) } },
            { id: 43, difficulty: 'easy', question: say('Gorputz baten bolumena 5 cm³ da. Zenbat da 2 arrazoiko gorputz antzeko batena?', 'Un cuerpo tiene 5 cm³ de volumen. ¿Cuánto mide el de un cuerpo semejante de razón 2?', 'حجم جسم 5 سم³. كم حجم جسم مشابه له بنسبة 2؟'), solution: same('$5\\cdot 2^{3}=40$'), answer: { expected: n(40) } },
            { id: 44, difficulty: 'medium', question: say('Bi irudi antzekoren azalerak 9 cm² eta 36 cm² dira. Zein da antzekotasun-arrazoia?', 'Dos figuras semejantes tienen 9 cm² y 36 cm² de área. ¿Cuál es la razón de semejanza?', 'شكلان متشابهان مساحتاهما 9 سم² و36 سم². ما نسبة التشابه؟'), solution: same('$k=\\sqrt{\\frac{36}{9}}=\\sqrt{4}=2$'), answer: { expected: n(2) } },
            { id: 45, difficulty: 'medium', question: say('1:25 000 eskalako mapa batean bi herri 8 cm-ra daude. Zenbat km daude benetan?', 'En un mapa a escala 1:25 000 dos pueblos están a 8 cm. ¿Cuántos km los separan en realidad?', 'في خريطة بمقياس 1:25 000 تبعد قريتان 8 سم. كم كيلومترًا تبعدان في الواقع؟'), solution: same('$8\\cdot 25\\,000=200\\,000\\qquad 200\\,000\\mathbin{:}100\\,000=2$'), answer: { expected: n(2) } },
            { id: 46, difficulty: 'medium', question: say('1:50 eskalako plano batean, gela batek 48 cm² hartzen ditu. Zenbat m² ditu benetan?', 'En un plano a escala 1:50 una habitación ocupa 48 cm². ¿Cuántos m² tiene en realidad?', 'في مخطط بمقياس 1:50 تشغل غرفة 48 سم². كم م² مساحتها في الواقع؟'), solution: same('$48\\cdot 50^{2}=120\\,000\\qquad 120\\,000\\mathbin{:}10\\,000=12$'), answer: { expected: n(12) } },
            { id: 47, difficulty: 'medium', question: say('1:20 eskalako maketa batek 500 cm³-ko bolumena du. Zenbat m³ ditu gorputz errealak?', 'Una maqueta a escala 1:20 tiene 500 cm³ de volumen. ¿Cuántos m³ tiene el cuerpo real?', 'مجسّم بمقياس 1:20 حجمه 500 سم³. كم م³ حجم الجسم الحقيقي؟'), solution: same('$500\\cdot 20^{3}=4\\,000\\,000\\qquad 4\\,000\\,000\\mathbin{:}1\\,000\\,000=4$'), answer: { expected: n(4) } },
            { id: 48, difficulty: 'hard', question: say('30,6 m-ko estatua batek 170 cm-ko pertsona bat irudikatzen du. Zenbat aldiz da handiagoa estatua?', 'Una estatua de 30,6 m representa a una persona de 170 cm. ¿Cuántas veces es mayor la estatua?', 'تمثال طوله 30.6 م يمثّل شخصًا طوله 170 سم. كم مرة يكون التمثال أكبر؟'), solution: same('$3060\\mathbin{:}170=18$'), answer: { expected: n(18) } },
            { id: 49, difficulty: 'hard', question: with_(say('Kono-enbor baten oinarrien erradioak 4 cm eta 2 cm dira, eta altuera 3 cm. Kalkulatu bolumena.', 'Un tronco de cono tiene bases de 4 cm y 2 cm de radio y 3 cm de altura. Calcula su volumen.', 'جذع مخروط نصفا قطري قاعدتيه 4 سم و2 سم وارتفاعه 3 سم. احسب حجمه.'), PI), solution: same('$\\frac{x}{2}=\\frac{x+3}{4}\\ \\to\\ x=3\\qquad \\frac{3{,}14\\cdot (4^{2}\\cdot 6-2^{2}\\cdot 3)}{3}=3{,}14\\cdot 28=87{,}92$'), answer: { expected: v('87,92') } },
            { id: 50, difficulty: 'hard', question: say('Kono bat altueraren erdian mozten da oinarriaren paraleloa den plano batekin. Bolumenaren zer zati geratzen da enborrean?', 'Un cono se corta a la mitad de su altura con un plano paralelo a la base. ¿Qué fracción del volumen queda en el tronco?', 'يُقطع مخروط عند منتصف ارتفاعه بمستوٍ موازٍ للقاعدة. ما الجزء من الحجم الذي يبقى في الجذع؟'), solution: say('Kono txikiaren arrazoia $\\frac{1}{2}$ da, eta bolumena $\\left(\\frac{1}{2}\\right)^{3}=\\frac{1}{8}$. Enborrean $\\frac{7}{8}$ geratzen da.', 'El cono pequeño tiene razón $\\frac{1}{2}$ y volumen $\\left(\\frac{1}{2}\\right)^{3}=\\frac{1}{8}$. En el tronco queda $\\frac{7}{8}$.', 'نسبة المخروط الصغير $\\frac{1}{2}$ وحجمه $\\left(\\frac{1}{2}\\right)^{3}=\\frac{1}{8}$. فيبقى في الجذع $\\frac{7}{8}$.') }
        ]
    }
]

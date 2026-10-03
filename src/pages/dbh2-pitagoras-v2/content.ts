import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Pitagorasen teorema · 2. DBH — diagnostic, guided practice, exercise bank
   and challenges. Exercises follow Anaya 2.º ESO unit 9 and Santillana
   2.º ESO unit 10 (the mast held by four cables, the rhombus of side 8,5,
   the trapezoid of bases 13 and 19, the tangent of 80 cm, the broken pole,
   the zipline, the stairs round the tower, the ladder between two walls).
   Every closed answer is a single number without the unit; when the root
   is not exact the prompt says how to round.
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

const TENTHS = say('Hurbildu hamarrenetara.', 'Aproxima a las décimas.', 'قرّب إلى الأعشار.')
const HUNDREDTHS = say('Hurbildu ehunenetara.', 'Aproxima a las centésimas.', 'قرّب إلى الأجزاء من مئة.')
/** A prompt followed by the rounding instruction */
const rounded = (prompt: LocalizedText, rule: LocalizedText): LocalizedText => ({ eu: `${prompt.eu} ${rule.eu}`, es: `${prompt.es} ${rule.es}`, ar: `${prompt.ar} ${rule.ar}` })

export const pythagorasDiagnostic: DiagnosticQuestion[] = [
    {
        id: 1501,
        prompt: say('Triangelu angeluzuzen baten katetoen gaineko karratuek 9 cm² eta 16 cm² dituzte. Zenbat du hipotenusaren gainekoak?', 'Los cuadrados sobre los catetos de un triángulo rectángulo miden 9 cm² y 16 cm². ¿Cuánto mide el de la hipotenusa?', 'مساحتا المربعين على الضلعين القائمين في مثلث قائم 9 سم² و16 سم². كم مساحة المربع على الوتر؟'),
        options: [same('$25$ cm²'), same('$7$ cm²'), same('$144$ cm²')],
        correctIndex: 0,
        explanation: say('Hipotenusaren karratua beste bien batura da: $9+16=25$.', 'El cuadrado de la hipotenusa es la suma de los otros dos: $9+16=25$.', 'مربع الوتر مجموع المربعين الآخرين: $9+16=25$.'),
        topic: 'squares'
    },
    {
        id: 1502,
        prompt: say('$ABC$ triangeluan angelu zuzena $A$ erpinean dago. Zein berdintza da egia?', 'En el triángulo $ABC$ el ángulo recto está en el vértice $A$. ¿Qué igualdad es cierta?', 'في المثلث $ABC$ الزاوية القائمة عند الرأس $A$. أي مساواة صحيحة؟'),
        options: [same('$c^{2}=a^{2}+b^{2}$'), same('$a^{2}=b^{2}+c^{2}$'), same('$b^{2}=a^{2}+c^{2}$')],
        correctIndex: 1,
        explanation: say('Hipotenusa angelu zuzenaren aurrean dago: $A$-ren aurreko aldea $a$ da.', 'La hipotenusa está frente al ángulo recto: el lado opuesto a $A$ es $a$.', 'الوتر يقابل الزاوية القائمة: الضلع المقابل لـ$A$ هو $a$.'),
        topic: 'formula'
    },
    {
        id: 1503,
        prompt: say('Zein da hirukote pitagorikoa?', '¿Cuál es una terna pitagórica?', 'أيّها ثلاثية فيثاغورية؟'),
        options: [same('$4,5,6$'), same('$2,3,4$'), same('$6,8,10$')],
        correctIndex: 2,
        explanation: say('$6^{2}+8^{2}=36+64=100=10^{2}$. Besteetan $16+25\\neq 36$ eta $4+9\\neq 16$.', '$6^{2}+8^{2}=36+64=100=10^{2}$. En las otras, $16+25\\neq 36$ y $4+9\\neq 16$.', '$6^{2}+8^{2}=36+64=100=10^{2}$. وفي الأخريين $16+25\\neq 36$ و$4+9\\neq 16$.'),
        topic: 'triples'
    },
    {
        id: 1504,
        prompt: say('Triangelu angeluzuzen baten katetoak 5 cm eta 12 cm dira. Zenbat da hipotenusa?', 'Los catetos de un triángulo rectángulo miden 5 cm y 12 cm. ¿Cuánto mide la hipotenusa?', 'الضلعان القائمان في مثلث قائم 5 سم و12 سم. كم طول الوتر؟'),
        options: [same('$13$ cm'), same('$17$ cm'), same('$7$ cm')],
        correctIndex: 0,
        explanation: say('$\\sqrt{25+144}=\\sqrt{169}=13$. 17 erroa zatika ateratzea da: $5+12$.', '$\\sqrt{25+144}=\\sqrt{169}=13$. 17 es sacar la raíz por partes: $5+12$.', '$\\sqrt{25+144}=\\sqrt{169}=13$. أما 17 فهو أخذ الجذر لكل حد: $5+12$.'),
        topic: 'hypotenuse'
    },
    {
        id: 1505,
        prompt: say('Hipotenusa 10 cm da eta kateto bat 6 cm. Zenbat da beste katetoa?', 'La hipotenusa mide 10 cm y un cateto 6 cm. ¿Cuánto mide el otro cateto?', 'الوتر 10 سم وأحد الضلعين القائمين 6 سم. كم طول الآخر؟'),
        options: [same('$4$ cm'), same('$8$ cm'), same('$11{,}66$ cm')],
        correctIndex: 1,
        explanation: say('Kendu: $\\sqrt{100-36}=\\sqrt{64}=8$. Batuz gero, hipotenusa baino handiagoa aterako litzateke.', 'Resta: $\\sqrt{100-36}=\\sqrt{64}=8$. Sumando saldría mayor que la hipotenusa.', 'اطرح: $\\sqrt{100-36}=\\sqrt{64}=8$. وبالجمع يخرج أكبر من الوتر.'),
        topic: 'leg'
    },
    {
        id: 1506,
        prompt: say('Nolakoa da 4 cm, 5 cm eta 6 cm-ko aldeak dituen triangelua?', '¿Cómo es el triángulo de lados 4 cm, 5 cm y 6 cm?', 'كيف يكون المثلث الذي أضلاعه 4 سم و5 سم و6 سم؟'),
        options: [say('Angeluzuzena', 'Rectángulo', 'قائم الزاوية'), say('Angelu-kamutsa', 'Obtusángulo', 'منفرج الزاوية'), say('Angelu-zorrotza', 'Acutángulo', 'حاد الزوايا')],
        correctIndex: 2,
        explanation: say('$6^{2}=36$ eta $4^{2}+5^{2}=41$; $36<41$: alde handiena laburregia da angelu zuzenerako.', '$6^{2}=36$ y $4^{2}+5^{2}=41$; $36<41$: el lado mayor es demasiado corto para un ángulo recto.', '$6^{2}=36$ و$4^{2}+5^{2}=41$؛ $36<41$: الضلع الأكبر أقصر من اللازم لزاوية قائمة.'),
        topic: 'classify'
    },
    {
        id: 1507,
        prompt: say('Zenbat da 8 cm × 6 cm-ko laukizuzen baten diagonala?', '¿Cuánto mide la diagonal de un rectángulo de 8 cm × 6 cm?', 'كم طول قطر مستطيل أبعاده 8 سم × 6 سم؟'),
        options: [same('$14$ cm'), same('$10$ cm'), same('$48$ cm')],
        correctIndex: 1,
        explanation: say('Diagonala hipotenusa da: $\\sqrt{64+36}=\\sqrt{100}=10$.', 'La diagonal es la hipotenusa: $\\sqrt{64+36}=\\sqrt{100}=10$.', 'القطر هو الوتر: $\\sqrt{64+36}=\\sqrt{100}=10$.'),
        topic: 'diagonals'
    },
    {
        id: 1508,
        prompt: say('5 m-ko eskailera baten oina hormatik 3 m-ra dago. Zer altueratara iristen da?', 'El pie de una escalera de 5 m está a 3 m de la pared. ¿Hasta qué altura llega?', 'قاعدة سلّم طوله 5 م تبعد 3 م عن الجدار. إلى أي ارتفاع يصل؟'),
        options: [same('$4$ m'), same('$2$ m'), same('$5{,}83$ m')],
        correctIndex: 0,
        explanation: say('Eskailera hipotenusa da: $\\sqrt{25-9}=\\sqrt{16}=4$.', 'La escalera es la hipotenusa: $\\sqrt{25-9}=\\sqrt{16}=4$.', 'السلّم هو الوتر: $\\sqrt{25-9}=\\sqrt{16}=4$.'),
        topic: 'problems'
    }
]

export const pythagorasPractice: PracticeItem[] = [
    /* ---------- The theorem ---------- */
    {
        id: 1, stage: 'theorem',
        prompt: say('Katetoen gaineko karratuek 30 cm² eta 14 cm² dituzte. Zein da hipotenusaren gaineko karratuaren azalera (cm²)?', 'Los cuadrados sobre los catetos miden 30 cm² y 14 cm². ¿Cuál es el área del cuadrado sobre la hipotenusa (cm²)?', 'مساحتا المربعين على الضلعين القائمين 30 سم² و14 سم². ما مساحة المربع على الوتر (سم²)؟'),
        expected: n(44),
        hint: say('Hipotenusarena handiena da.', 'El de la hipotenusa es el mayor.', 'مربع الوتر هو الأكبر.'),
        explanation: same('$30+14=44$')
    },
    {
        id: 2, stage: 'theorem',
        prompt: say('Hipotenusaren gaineko karratuak 60 m² ditu eta kateto baten gainekoak 45 m². Zenbat du beste katetoaren gainekoak (m²)?', 'El cuadrado sobre la hipotenusa mide 60 m² y el de un cateto 45 m². ¿Cuánto mide el del otro cateto (m²)?', 'مساحة المربع على الوتر 60 م² ومساحة المربع على أحد الضلعين القائمين 45 م². كم مساحة المربع على الآخر (م²)؟'),
        expected: n(15),
        hint: say('Handiari kendu.', 'Réstalo del grande.', 'اطرحه من الكبير.'),
        explanation: same('$60-45=15$')
    },
    {
        id: 3, stage: 'theorem',
        prompt: say('Osatu hirukote pitagorikoa: 8, 15 eta…', 'Completa la terna pitagórica: 8, 15 y…', 'أكمل الثلاثية الفيثاغورية: 8 و15 و…'),
        expected: n(17),
        hint: say('Batu karratuak eta atera erroa.', 'Suma los cuadrados y saca la raíz.', 'اجمع المربعين وخذ الجذر.'),
        explanation: same('$\\sqrt{64+225}=\\sqrt{289}=17$')
    },
    {
        id: 4, stage: 'theorem',
        prompt: say('Hipotenusa 17 cm da eta kateto bat 4 cm. Zein da beste katetoaren gaineko karratuaren azalera (cm²)?', 'La hipotenusa mide 17 cm y un cateto 4 cm. ¿Cuál es el área del cuadrado sobre el otro cateto (cm²)?', 'الوتر 17 سم وأحد الضلعين القائمين 4 سم. ما مساحة المربع على الضلع الآخر (سم²)؟'),
        expected: n(273),
        hint: say('Azalera aldearen karratua da: ez da errorik behar.', 'El área es el cuadrado del lado: no hace falta la raíz.', 'المساحة مربع الضلع: لا حاجة إلى الجذر.'),
        explanation: same('$17^{2}-4^{2}=289-16=273$')
    },

    /* ---------- Sides ---------- */
    {
        id: 5, stage: 'sides',
        prompt: say('Katetoak 9 cm eta 12 cm dira. Zenbat da hipotenusa?', 'Los catetos miden 9 cm y 12 cm. ¿Cuánto mide la hipotenusa?', 'الضلعان القائمان 9 سم و12 سم. كم طول الوتر؟'),
        expected: n(15),
        hint: say('Karratuak batu, gero erroa.', 'Suma los cuadrados y luego la raíz.', 'اجمع المربعين ثم الجذر.'),
        explanation: same('$\\sqrt{81+144}=\\sqrt{225}=15$')
    },
    {
        id: 6, stage: 'sides',
        prompt: say('Hipotenusa 74 mm da eta kateto bat 70 mm. Zenbat da beste katetoa?', 'La hipotenusa mide 74 mm y un cateto 70 mm. ¿Cuánto mide el otro cateto?', 'الوتر 74 مم وأحد الضلعين القائمين 70 مم. كم طول الآخر؟'),
        expected: n(24),
        hint: say('Hipotenusaren karratuari katetoarena kendu.', 'Al cuadrado de la hipotenusa réstale el del cateto.', 'اطرح مربع الضلع من مربع الوتر.'),
        explanation: same('$\\sqrt{5476-4900}=\\sqrt{576}=24$')
    },
    {
        id: 7, stage: 'sides',
        prompt: rounded(say('Triangelu angeluzuzen baten katetoak 3 dam eta 5 dam dira. Kalkulatu hipotenusa.', 'Los catetos de un triángulo rectángulo miden 3 dam y 5 dam. Calcula la hipotenusa.', 'الضلعان القائمان في مثلث قائم 3 دكام و5 دكام. احسب الوتر.'), HUNDREDTHS),
        expected: v('5,83'),
        hint: say('34 ez da karratu perfektua: erabili kalkulagailua.', '34 no es un cuadrado perfecto: usa la calculadora.', '34 ليس مربعًا كاملًا: استعمل الآلة الحاسبة.'),
        explanation: same('$\\sqrt{9+25}=\\sqrt{34}\\approx 5{,}83$')
    },
    {
        id: 8, stage: 'sides',
        prompt: rounded(say('Hipotenusa 10,7 m da eta kateto bat 7,6 m. Kalkulatu beste katetoa.', 'La hipotenusa mide 10,7 m y un cateto 7,6 m. Calcula el otro cateto.', 'الوتر 10.7 م وأحد الضلعين القائمين 7.6 م. احسب الآخر.'), HUNDREDTHS),
        expected: v('7,53'),
        hint: say('Kendu karratuak.', 'Resta los cuadrados.', 'اطرح المربعين.'),
        explanation: same('$\\sqrt{114{,}49-57{,}76}=\\sqrt{56{,}73}\\approx 7{,}53$')
    },

    /* ---------- Plane figures ---------- */
    {
        id: 9, stage: 'plane',
        prompt: say('Triangelu isoszele baten alde berdinak 13 cm dira eta oinarria 10 cm. Zein da haren azalera (cm²)?', 'Los lados iguales de un triángulo isósceles miden 13 cm y la base 10 cm. ¿Cuál es su área (cm²)?', 'الضلعان المتساويان في مثلث متساوي الساقين 13 سم والقاعدة 10 سم. ما مساحته (سم²)؟'),
        expected: n(60),
        hint: say('Altuera: oinarri-erdia 5 da.', 'La altura: la media base es 5.', 'الارتفاع: نصف القاعدة 5.'),
        explanation: same('$h=\\sqrt{169-25}=12\\ \\to\\ \\frac{10\\cdot 12}{2}=60$')
    },
    {
        id: 10, stage: 'plane',
        prompt: say('Laukizuzen baten diagonala 5,8 cm da eta alde bat 4 cm. Zein da perimetroa (cm)?', 'La diagonal de un rectángulo mide 5,8 cm y un lado 4 cm. ¿Cuál es su perímetro (cm)?', 'قطر مستطيل 5.8 سم وأحد أضلاعه 4 سم. ما محيطه (سم)؟'),
        expected: v('16,4'),
        hint: say('Lehenik beste aldea: diagonala hipotenusa da.', 'Primero el otro lado: la diagonal es la hipotenusa.', 'أولًا الضلع الآخر: القطر هو الوتر.'),
        explanation: same('$\\sqrt{33{,}64-16}=\\sqrt{17{,}64}=4{,}2\\ \\to\\ 2\\cdot 4+2\\cdot 4{,}2=16{,}4$')
    },
    {
        id: 11, stage: 'plane',
        prompt: say('Erronbo baten diagonalak 1 dm eta 2,4 dm dira. Zenbat da aldea (dm)?', 'Las diagonales de un rombo miden 1 dm y 2,4 dm. ¿Cuánto mide el lado (dm)?', 'قطرا معيّن 1 دسم و2.4 دسم. كم طول ضلعه (دسم)؟'),
        expected: v('1,3'),
        hint: say('Erabili diagonal-erdiak.', 'Usa las semidiagonales.', 'استعمل نصفي القطرين.'),
        explanation: same('$\\sqrt{0{,}5^{2}+1{,}2^{2}}=\\sqrt{1{,}69}=1{,}3$')
    },
    {
        id: 12, stage: 'plane',
        prompt: say('Trapezio angeluzuzen baten oinarriak 13 dm eta 19 dm dira, eta alde zeiharra 10 dm. Zenbat da altuera?', 'Las bases de un trapecio rectángulo miden 13 dm y 19 dm, y el lado oblicuo 10 dm. ¿Cuánto mide la altura?', 'قاعدتا شبه منحرف قائم 13 دسم و19 دسم، وضلعه المائل 10 دسم. كم ارتفاعه؟'),
        expected: n(8),
        hint: say('Kateto bat oinarrien kendura da.', 'Un cateto es la diferencia de las bases.', 'أحد الضلعين القائمين فرق القاعدتين.'),
        explanation: same('$19-13=6\\ \\to\\ \\sqrt{100-36}=8$')
    },

    /* ---------- Regular polygons and the circle ---------- */
    {
        id: 13, stage: 'circle',
        prompt: rounded(say('Kalkulatu 20 cm-ko aldeko hexagono erregular baten apotema.', 'Calcula la apotema de un hexágono regular de 20 cm de lado.', 'احسب عامد مسدس منتظم طول ضلعه 20 سم.'), TENTHS),
        expected: v('17,3'),
        hint: say('Hexagonoan erradioa eta aldea berdinak dira.', 'En el hexágono el radio y el lado son iguales.', 'في المسدس نصف القطر والضلع متساويان.'),
        explanation: same('$\\sqrt{20^{2}-10^{2}}=\\sqrt{300}\\approx 17{,}3$')
    },
    {
        id: 14, stage: 'circle',
        prompt: say('Zirkunferentzia baten erradioa 13 cm da, eta korda bat zentrotik 5 cm-ra dago. Zenbat da korda?', 'Una circunferencia tiene 13 cm de radio y una cuerda está a 5 cm del centro. ¿Cuánto mide la cuerda?', 'نصف قطر دائرة 13 سم ووتر فيها يبعد 5 سم عن المركز. كم طول الوتر؟'),
        expected: n(24),
        hint: say('Korda-erdia kalkulatu eta bikoiztu.', 'Calcula media cuerda y duplícala.', 'احسب نصف الوتر ثم ضاعفه.'),
        explanation: same('$\\sqrt{169-25}=12\\ \\to\\ 2\\cdot 12=24$')
    },
    {
        id: 15, stage: 'circle',
        prompt: say('10 m-ko erradioko zirkunferentzia batetik kanpo dagoen $P$ puntutik 24 m-ko zuzenki ukitzaile bat marrazten da. Zer distantziara dago $P$ zentrotik?', 'Desde un punto $P$ exterior a una circunferencia de 10 m de radio se traza un segmento tangente de 24 m. ¿A qué distancia está $P$ del centro?', 'من نقطة $P$ خارج دائرة نصف قطرها 10 م تُرسم قطعة مماس طولها 24 م. كم تبعد $P$ عن المركز؟'),
        expected: n(26),
        hint: say('Angelu zuzena ukitze-puntuan dago.', 'El ángulo recto está en el punto de tangencia.', 'الزاوية القائمة عند نقطة التماس.'),
        explanation: same('$\\sqrt{100+576}=\\sqrt{676}=26$')
    },
    {
        id: 16, stage: 'circle',
        prompt: say('10 cm-ko aldeko hexagono erregular baten apotema 8,66 cm da gutxi gorabehera. Zein da haren azalera (cm²)?', 'La apotema de un hexágono regular de 10 cm de lado mide unos 8,66 cm. ¿Cuál es su área (cm²)?', 'عامد مسدس منتظم طول ضلعه 10 سم يساوي 8.66 سم تقريبًا. ما مساحته (سم²)؟'),
        expected: v('259,8'),
        hint: say('Perimetroa bider apotema, zati bi.', 'Perímetro por apotema, entre dos.', 'المحيط في العامد على اثنين.'),
        explanation: same('$\\frac{60\\cdot 8{,}66}{2}=259{,}8$')
    },

    /* ---------- Space and problems ---------- */
    {
        id: 17, stage: 'space',
        prompt: say('Kalkulatu 3 cm, 4 cm eta 12 cm-ko dimentsioak dituen ortoedro baten diagonala.', 'Calcula la diagonal de un ortoedro de dimensiones 3 cm, 4 cm y 12 cm.', 'احسب قطر متوازي مستطيلات أبعاده 3 سم و4 سم و12 سم.'),
        expected: n(13),
        hint: say('Lehenik oinarriaren diagonala.', 'Primero la diagonal de la base.', 'أولًا قطر القاعدة.'),
        explanation: same('$\\sqrt{9+16}=5\\ \\to\\ \\sqrt{25+144}=13$')
    },
    {
        id: 18, stage: 'space',
        prompt: say('Kalkulatu $A(-1,2)$ eta $B(5,10)$ puntuen arteko distantzia.', 'Calcula la distancia entre los puntos $A(-1,2)$ y $B(5,10)$.', 'احسب المسافة بين النقطتين $A(-1,2)$ و$B(5,10)$.'),
        expected: n(10),
        hint: say('Horizontalean $5-(-1)$, bertikalean $10-2$.', 'En horizontal $5-(-1)$, en vertical $10-2$.', 'أفقيًا $5-(-1)$ وعموديًا $10-2$.'),
        explanation: same('$\\sqrt{6^{2}+8^{2}}=\\sqrt{100}=10$')
    },
    {
        id: 19, stage: 'space',
        prompt: say('6,5 m-ko eskailera bat horman jarrita dago, 6 m-ko altueran. Zer distantziara dago oina hormatik (m)?', 'Una escalera de 6,5 m está apoyada en la pared a 6 m de altura. ¿A qué distancia de la pared está el pie (m)?', 'سلّم طوله 6.5 م مسنود إلى الجدار على ارتفاع 6 م. كم تبعد قاعدته عن الجدار (م)؟'),
        expected: v('2,5'),
        hint: say('Eskailera hipotenusa da.', 'La escalera es la hipotenusa.', 'السلّم هو الوتر.'),
        explanation: same('$\\sqrt{42{,}25-36}=\\sqrt{6{,}25}=2{,}5$')
    },
    {
        id: 20, stage: 'space',
        prompt: say('14,5 m-ko poste bat oinetik hautsi eta 10 m-ra dagoen eraikin baten gainera erori da. Zer altueratan jotzen du eraikina (m)?', 'Un poste de 14,5 m se quiebra por su base y cae sobre un edificio que está a 10 m. ¿A qué altura golpea el edificio (m)?', 'عمود طوله 14.5 م انكسر من قاعدته وسقط على مبنى يبعد 10 م. على أي ارتفاع يصطدم بالمبنى (م)؟'),
        expected: v('10,5'),
        hint: say('Postea hipotenusa da.', 'El poste es la hipotenusa.', 'العمود هو الوتر.'),
        explanation: same('$\\sqrt{210{,}25-100}=\\sqrt{110{,}25}=10{,}5$')
    }
]

export const pythagorasChallenges: ChallengeItem[] = [
    {
        id: 101, stage: 'theorem', points: 10, context: 'starter',
        prompt: say('Osatu hirukote pitagorikoa: 20, 21 eta…', 'Completa la terna pitagórica: 20, 21 y…', 'أكمل الثلاثية الفيثاغورية: 20 و21 و…'),
        expected: n(29),
        hint: say('$400+441$.', '$400+441$.', '$400+441$.'),
        explanation: same('$\\sqrt{400+441}=\\sqrt{841}=29$')
    },
    {
        id: 102, stage: 'theorem', points: 20, context: 'advanced',
        prompt: say('Triangelu angeluzuzen baten aldeak 3, 4 eta 5 hirukotearen multiploak dira, eta hipotenusa 35 cm da. Zenbat da kateto handia?', 'Los lados de un triángulo rectángulo son múltiplos de la terna 3, 4, 5, y la hipotenusa mide 35 cm. ¿Cuánto mide el cateto mayor?', 'أضلاع مثلث قائم مضاعفات للثلاثية 3، 4، 5، ووتره 35 سم. كم طول الضلع القائم الأكبر؟'),
        expected: n(28),
        hint: say('Zenbatez biderkatu da 5?', '¿Por cuánto se ha multiplicado el 5?', 'في كم ضُرب العدد 5؟'),
        explanation: same('$35\\mathbin{:}5=7\\ \\to\\ 4\\cdot 7=28$')
    },
    {
        id: 103, stage: 'theorem', points: 30, context: 'advanced',
        prompt: say('Karratu baten diagonala 10 m²-ko beste karratu baten aldea da. Zein da lehen karratuaren azalera (m²)?', 'La diagonal de un cuadrado es el lado de otro cuadrado de 10 m². ¿Cuál es el área del primer cuadrado (m²)?', 'قطر مربع يساوي ضلع مربع آخر مساحته 10 م². ما مساحة المربع الأول (م²)؟'),
        expected: n(5),
        hint: say('$d^{2}=l^{2}+l^{2}=2l^{2}$, eta $d^{2}=10$.', '$d^{2}=l^{2}+l^{2}=2l^{2}$, y $d^{2}=10$.', '$d^{2}=l^{2}+l^{2}=2l^{2}$، و$d^{2}=10$.'),
        explanation: same('$2l^{2}=10\\ \\to\\ l^{2}=10\\mathbin{:}2=5$')
    },
    {
        id: 104, stage: 'sides', points: 10, context: 'starter',
        prompt: say('Hipotenusa 61 cm da eta kateto bat 11 cm. Zenbat da beste katetoa?', 'La hipotenusa mide 61 cm y un cateto 11 cm. ¿Cuánto mide el otro cateto?', 'الوتر 61 سم وأحد الضلعين القائمين 11 سم. كم طول الآخر؟'),
        expected: n(60),
        hint: say('Kendu karratuak.', 'Resta los cuadrados.', 'اطرح المربعين.'),
        explanation: same('$\\sqrt{3721-121}=\\sqrt{3600}=60$')
    },
    {
        id: 105, stage: 'sides', points: 20, context: 'advanced',
        prompt: say('Triangelu angeluzuzen baten katetoak 15 cm eta 20 cm dira. Zenbat da hipotenusaren gaineko altuera?', 'Los catetos de un triángulo rectángulo miden 15 cm y 20 cm. ¿Cuánto mide la altura sobre la hipotenusa?', 'الضلعان القائمان في مثلث قائم 15 سم و20 سم. كم الارتفاع على الوتر؟'),
        expected: n(12),
        hint: say('Azalera bi eratara: $\\frac{15\\cdot 20}{2}$ eta $\\frac{a\\cdot h}{2}$.', 'El área de dos maneras: $\\frac{15\\cdot 20}{2}$ y $\\frac{a\\cdot h}{2}$.', 'المساحة بطريقتين: $\\frac{15\\cdot 20}{2}$ و$\\frac{a\\cdot h}{2}$.'),
        explanation: same('$\\sqrt{225+400}=25\\ \\to\\ 15\\cdot 20=300\\ \\to\\ 300\\mathbin{:}25=12$')
    },
    {
        id: 106, stage: 'sides', points: 30, context: 'advanced',
        prompt: rounded(say('Triangelu angeluzuzen isoszele baten hipotenusa 12 cm da. Zenbat da kateto bakoitza?', 'La hipotenusa de un triángulo rectángulo isósceles mide 12 cm. ¿Cuánto mide cada cateto?', 'وتر مثلث قائم متساوي الساقين 12 سم. كم طول كل ضلع قائم؟'), HUNDREDTHS),
        expected: v('8,49'),
        hint: say('Bi kateto berdinak: $c^{2}+c^{2}=144$.', 'Dos catetos iguales: $c^{2}+c^{2}=144$.', 'ضلعان قائمان متساويان: $c^{2}+c^{2}=144$.'),
        explanation: same('$2c^{2}=144\\ \\to\\ c^{2}=72\\ \\to\\ c=\\sqrt{72}\\approx 8{,}49$')
    },
    {
        id: 107, stage: 'plane', points: 10, context: 'starter',
        prompt: rounded(say('Karratu baten perimetroa 28 dam da. Kalkulatu haren diagonala.', 'El perímetro de un cuadrado mide 28 dam. Calcula su diagonal.', 'محيط مربع 28 دكام. احسب قطره.'), TENTHS),
        expected: v('9,9'),
        hint: say('Aldea: $28\\mathbin{:}4$.', 'El lado: $28\\mathbin{:}4$.', 'الضلع: $28\\mathbin{:}4$.'),
        explanation: same('$28\\mathbin{:}4=7\\ \\to\\ \\sqrt{49+49}=\\sqrt{98}\\approx 9{,}9$')
    },
    {
        id: 108, stage: 'plane', points: 20, context: 'advanced',
        prompt: say('Trapezio isoszele baten oinarriak 3,2 m eta 6,4 m dira, eta altuera 6,3 m. Zein da perimetroa (m)?', 'Las bases de un trapecio isósceles miden 3,2 m y 6,4 m, y la altura 6,3 m. ¿Cuál es su perímetro (m)?', 'قاعدتا شبه منحرف متساوي الساقين 3.2 م و6.4 م، وارتفاعه 6.3 م. ما محيطه (م)؟'),
        expected: v('22,6'),
        hint: say('Kateto txikia: $(6{,}4-3{,}2)\\mathbin{:}2$.', 'El cateto pequeño: $(6{,}4-3{,}2)\\mathbin{:}2$.', 'الضلع القائم الصغير: $(6{,}4-3{,}2)\\mathbin{:}2$.'),
        explanation: same('$\\sqrt{6{,}3^{2}+1{,}6^{2}}=\\sqrt{42{,}25}=6{,}5\\ \\to\\ 3{,}2+6{,}4+2\\cdot 6{,}5=22{,}6$')
    },
    {
        id: 109, stage: 'plane', points: 30, context: 'advanced',
        prompt: rounded(say('Triangelu aldeberdin baten perimetroa 54 cm da. Kalkulatu haren azalera (cm²).', 'El perímetro de un triángulo equilátero mide 54 cm. Calcula su área (cm²).', 'محيط مثلث متساوي الأضلاع 54 سم. احسب مساحته (سم²).'), TENTHS),
        expected: v('140,3'),
        hint: say('Aldea 18; altuerak oinarria 9 eta 9 zatitan banatzen du.', 'El lado es 18; la altura parte la base en 9 y 9.', 'الضلع 18؛ والارتفاع يقسم القاعدة إلى 9 و9.'),
        explanation: same('$h=\\sqrt{324-81}=\\sqrt{243}\\ \\to\\ \\frac{18\\cdot\\sqrt{243}}{2}\\approx 140{,}3$')
    },
    {
        id: 110, stage: 'circle', points: 10, context: 'starter',
        prompt: say('9,7 m-ko erradioko zirkunferentzia batean 13 m-ko korda bat marraztu da. Zer distantziara dago zentroa kordatik (m)?', 'En una circunferencia de 9,7 m de radio se traza una cuerda de 13 m. ¿A qué distancia de la cuerda está el centro (m)?', 'في دائرة نصف قطرها 9.7 م رُسم وتر طوله 13 م. كم يبعد المركز عن الوتر (م)؟'),
        expected: v('7,2'),
        hint: say('Korda-erdia: 6,5.', 'Media cuerda: 6,5.', 'نصف الوتر: 6.5.'),
        explanation: same('$\\sqrt{94{,}09-42{,}25}=\\sqrt{51{,}84}=7{,}2$')
    },
    {
        id: 111, stage: 'circle', points: 20, context: 'advanced',
        prompt: say('$P$ puntua zentrotik 89 cm-ra dago eta $PT$ zuzenki ukitzailea 80 cm da. Zenbat da zirkunferentziaren luzera? ($\\pi\\approx 3{,}14$)', 'El punto $P$ está a 89 cm del centro y el segmento tangente $PT$ mide 80 cm. ¿Cuánto mide la longitud de la circunferencia? ($\\pi\\approx 3{,}14$)', 'النقطة $P$ تبعد 89 سم عن المركز وقطعة المماس $PT$ طولها 80 سم. كم طول محيط الدائرة؟ ($\\pi\\approx 3{,}14$)'),
        expected: v('244,92'),
        hint: say('Lehenik erradioa: $OP$ hipotenusa da.', 'Primero el radio: $OP$ es la hipotenusa.', 'أولًا نصف القطر: $OP$ هو الوتر.'),
        explanation: same('$r=\\sqrt{7921-6400}=39\\ \\to\\ 2\\cdot 3{,}14\\cdot 39=244{,}92$')
    },
    {
        id: 112, stage: 'circle', points: 30, context: 'advanced',
        prompt: rounded(say('40 cm-ko diametroko esfera bat zentrotik 10 cm-ra pasatzen den plano batek ebaki du. Zenbat da ebaketaren zirkunferentziaren erradioa?', 'Una esfera de 40 cm de diámetro se corta con un plano que pasa a 10 cm del centro. ¿Cuánto mide el radio de la circunferencia del corte?', 'كرة قطرها 40 سم قُطعت بمستوٍ يبعد 10 سم عن المركز. كم نصف قطر دائرة المقطع؟'), TENTHS),
        expected: v('17,3'),
        hint: say('Esferaren erradioa (20) hipotenusa da.', 'El radio de la esfera (20) es la hipotenusa.', 'نصف قطر الكرة (20) هو الوتر.'),
        explanation: same('$\\sqrt{20^{2}-10^{2}}=\\sqrt{300}\\approx 17{,}3$')
    },
    {
        id: 113, stage: 'space', points: 10, context: 'starter',
        prompt: say('85 m-ko arrapala batek 77 m aurrera egiten du horizontalean. Zenbat igotzen da (m)?', 'Una rampa de 85 m avanza 77 m en horizontal. ¿Cuánto sube (m)?', 'منحدر طوله 85 م يتقدم 77 م أفقيًا. كم يرتفع (م)؟'),
        expected: n(36),
        hint: say('Arrapala hipotenusa da.', 'La rampa es la hipotenusa.', 'المنحدر هو الوتر.'),
        explanation: same('$\\sqrt{7225-5929}=\\sqrt{1296}=36$')
    },
    {
        id: 114, stage: 'space', points: 20, context: 'advanced',
        prompt: say('Kaxa baten neurriak 60 cm, 15 cm eta 20 cm dira. Zein da sartzen den barra luzeena (cm)?', 'Una caja mide 60 cm, 15 cm y 20 cm. ¿Cuál es la barra más larga que cabe (cm)?', 'صندوق أبعاده 60 سم و15 سم و20 سم. ما أطول قضيب يدخل فيه (سم)؟'),
        expected: n(65),
        hint: say('Hiru dimentsioen karratuak batu.', 'Suma los cuadrados de las tres dimensiones.', 'اجمع مربعات الأبعاد الثلاثة.'),
        explanation: same('$\\sqrt{3600+225+400}=\\sqrt{4225}=65$')
    },
    {
        id: 115, stage: 'space', points: 30, context: 'advanced',
        prompt: say('36 m-ko dorre baten oinarria 40 m × 12 m-ko laukizuzena da. Kanpoko eskailerak lau tarte ditu, aurpegi bakoitzean bat, eta tarte bakoitzak altuera bera igotzen du. Metro bakoitzean 3 eskailera-maila badaude, zenbat maila daude guztira?', 'Una torre de 36 m tiene de base un rectángulo de 40 m × 12 m. Su escalera exterior tiene cuatro tramos, uno por cara, y en todos se sube la misma altura. Si cada metro de escalera tiene 3 escalones, ¿cuántos escalones hay en total?', 'برج ارتفاعه 36 م وقاعدته مستطيل 40 م × 12 م. لسلّمه الخارجي أربعة أجزاء، واحد على كل وجه، ويُصعد في كل منها الارتفاع نفسه. إذا كان في كل متر من السلّم 3 درجات، فكم درجة في المجموع؟'),
        expected: n(336),
        hint: say('Tarte bakoitza 9 m igotzen da; aurpegi estuan eta zabalean hipotenusa bat.', 'Cada tramo sube 9 m; en la cara estrecha y en la ancha, una hipotenusa.', 'كل جزء يرتفع 9 م؛ وعلى الوجه الضيق والعريض وتر.'),
        explanation: same('$\\sqrt{12^{2}+9^{2}}=15\\qquad\\sqrt{40^{2}+9^{2}}=41\\qquad 2\\cdot(15+41)\\cdot 3=336$')
    }
]

export const pythagorasExerciseBank: ExerciseSection[] = [
    {
        id: 'theorem',
        title: say('Teorema', 'El teorema', 'النظرية'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Katetoen gaineko karratuek 9 cm² eta 16 cm² dituzte. Zein da hipotenusaren gainekoaren azalera (cm²)?', 'Los cuadrados sobre los catetos miden 9 cm² y 16 cm². ¿Qué área tiene el de la hipotenusa (cm²)?', 'مساحتا المربعين على الضلعين القائمين 9 سم² و16 سم². ما مساحة المربع على الوتر (سم²)؟'), solution: same('$9+16=25$'), answer: { expected: n(25) } },
            { id: 2, difficulty: 'easy', question: say('Hipotenusaren gaineko karratua 87 m² da eta kateto baten gainekoa 31 m². Zenbat du beste katetoaren gainekoak (m²)?', 'El cuadrado sobre la hipotenusa mide 87 m² y el de un cateto 31 m². ¿Cuánto mide el del otro cateto (m²)?', 'مساحة المربع على الوتر 87 م² وعلى أحد الضلعين القائمين 31 م². كم مساحة المربع على الآخر (م²)؟'), solution: same('$87-31=56$'), answer: { expected: n(56) } },
            { id: 3, difficulty: 'easy', question: say('$MNP$ triangeluan angelu zuzena $P$-n dago. Zein da hipotenusa?', 'En el triángulo $MNP$ el ángulo recto está en $P$. ¿Cuál es la hipotenusa?', 'في المثلث $MNP$ الزاوية القائمة عند $P$. ما الوتر؟'), solution: say('$MN$, $P$-ren aurreko aldea: $MN^{2}=MP^{2}+NP^{2}$.', '$MN$, el lado opuesto a $P$: $MN^{2}=MP^{2}+NP^{2}$.', '$MN$، الضلع المقابل لـ$P$: $MN^{2}=MP^{2}+NP^{2}$.') },
            { id: 4, difficulty: 'medium', question: say('Egiaztatu 5, 12, 13 eta 7, 24, 25 hirukote pitagorikoak direla.', 'Comprueba que 5, 12, 13 y 7, 24, 25 son ternas pitagóricas.', 'تحقّق من أن 5، 12، 13 و7، 24، 25 ثلاثيات فيثاغورية.'), solution: same('$25+144=169=13^{2}\\qquad 49+576=625=25^{2}$') },
            { id: 5, difficulty: 'medium', question: say('9, 40 eta 41 hirukote pitagorikoa da?', '¿Es 9, 40 y 41 una terna pitagórica?', 'هل 9 و40 و41 ثلاثية فيثاغورية؟'), solution: say('Bai: $81+1600=1681=41^{2}$.', 'Sí: $81+1600=1681=41^{2}$.', 'نعم: $81+1600=1681=41^{2}$.') },
            { id: 6, difficulty: 'medium', question: say('Osatu hirukote pitagorikoa: 12, 35 eta…', 'Completa la terna pitagórica: 12, 35 y…', 'أكمل الثلاثية الفيثاغورية: 12 و35 و…'), solution: same('$\\sqrt{144+1225}=\\sqrt{1369}=37$'), answer: { expected: n(37) } },
            { id: 7, difficulty: 'medium', question: say('8, 15, 17 hirukotea 4z biderkatzen da. Zein da hipotenusa berria?', 'Se multiplica la terna 8, 15, 17 por 4. ¿Cuál es la nueva hipotenusa?', 'ضُربت الثلاثية 8، 15، 17 في 4. ما الوتر الجديد؟'), solution: same('$17\\cdot 4=68$'), answer: { expected: n(68) } },
            { id: 8, difficulty: 'hard', question: say('Egiptoarrek 12 korapiloko soka bat erabiltzen zuten, 3, 4 eta 5 tarteko triangelu bat eginez. Zergatik ateratzen zen angelu zuzena?', 'Los egipcios usaban una cuerda de 12 nudos formando un triángulo de tramos 3, 4 y 5. ¿Por qué salía un ángulo recto?', 'استعمل المصريون حبلًا ذا 12 عقدة يكوّن مثلثًا أجزاؤه 3 و4 و5. لماذا تنتج زاوية قائمة؟'), solution: say('$3^{2}+4^{2}=25=5^{2}$: teoremak alderantziz ere balio du, beraz triangelua angeluzuzena da.', '$3^{2}+4^{2}=25=5^{2}$: el teorema también vale al revés, así que el triángulo es rectángulo.', '$3^{2}+4^{2}=25=5^{2}$: النظرية تصح بالعكس أيضًا، فالمثلث قائم.') },
            { id: 9, difficulty: 'hard', question: say('2, 3 eta 4 hirukote pitagorikoa da?', '¿Es 2, 3 y 4 una terna pitagórica?', 'هل 2 و3 و4 ثلاثية فيثاغورية؟'), solution: say('Ez: $4+9=13$ eta $4^{2}=16$.', 'No: $4+9=13$ y $4^{2}=16$.', 'لا: $4+9=13$ و$4^{2}=16$.') },
            { id: 10, difficulty: 'hard', question: say('Triangelu angeluzuzen batek hiru alde berdinak izan ditzake?', '¿Puede un triángulo rectángulo tener los tres lados iguales?', 'هل يمكن أن تكون أضلاع مثلث قائم الثلاثة متساوية؟'), solution: say('Ez: $l^{2}=l^{2}+l^{2}$ ez da betetzen; hipotenusa beti da alde handiena.', 'No: $l^{2}=l^{2}+l^{2}$ no se cumple; la hipotenusa siempre es el lado mayor.', 'لا: $l^{2}=l^{2}+l^{2}$ لا تتحقق؛ فالوتر دائمًا أكبر الأضلاع.') }
        ]
    },
    {
        id: 'sides',
        title: say('Aldeak kalkulatu eta sailkatu', 'Calcular lados y clasificar', 'حساب الأضلاع والتصنيف'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Katetoak 15 m eta 20 m dira. Kalkulatu hipotenusa.', 'Los catetos miden 15 m y 20 m. Calcula la hipotenusa.', 'الضلعان القائمان 15 م و20 م. احسب الوتر.'), solution: same('$\\sqrt{225+400}=\\sqrt{625}=25$'), answer: { expected: n(25) } },
            { id: 12, difficulty: 'easy', question: say('Hipotenusa 65 mm da eta kateto bat 16 mm. Kalkulatu beste katetoa.', 'La hipotenusa mide 65 mm y un cateto 16 mm. Calcula el otro cateto.', 'الوتر 65 مم وأحد الضلعين القائمين 16 مم. احسب الآخر.'), solution: same('$\\sqrt{4225-256}=\\sqrt{3969}=63$'), answer: { expected: n(63) } },
            { id: 13, difficulty: 'easy', question: say('Sailkatu 15 km, 20 km eta 25 km-ko aldeak dituen triangelua.', 'Clasifica el triángulo de lados 15 km, 20 km y 25 km.', 'صنّف المثلث الذي أضلاعه 15 كم و20 كم و25 كم.'), solution: say('$225+400=625=25^{2}$: angeluzuzena.', '$225+400=625=25^{2}$: rectángulo.', '$225+400=625=25^{2}$: قائم الزاوية.') },
            { id: 14, difficulty: 'medium', question: say('Hipotenusa 26 km da eta kateto bat 24 km. Kalkulatu beste katetoa.', 'La hipotenusa mide 26 km y un cateto 24 km. Calcula el otro cateto.', 'الوتر 26 كم وأحد الضلعين القائمين 24 كم. احسب الآخر.'), solution: same('$\\sqrt{676-576}=\\sqrt{100}=10$'), answer: { expected: n(10) } },
            { id: 15, difficulty: 'medium', question: rounded(say('Bi katetoak 12 cm dira. Kalkulatu hipotenusa.', 'Los dos catetos miden 12 cm. Calcula la hipotenusa.', 'الضلعان القائمان 12 سم كلاهما. احسب الوتر.'), HUNDREDTHS), solution: same('$\\sqrt{144+144}=\\sqrt{288}\\approx 16{,}97$'), answer: { expected: v('16,97') } },
            { id: 16, difficulty: 'medium', question: say('Sailkatu 64 cm, 84 cm eta 57 cm-ko aldeak dituen triangelua.', 'Clasifica el triángulo de lados 64 cm, 84 cm y 57 cm.', 'صنّف المثلث الذي أضلاعه 64 سم و84 سم و57 سم.'), solution: say('$57^{2}+64^{2}=7345$, $84^{2}=7056$, $7345>7056$: angelu-zorrotza.', '$57^{2}+64^{2}=7345$, $84^{2}=7056$, $7345>7056$: acutángulo.', '$57^{2}+64^{2}=7345$, $84^{2}=7056$, $7345>7056$: حاد الزوايا.') },
            { id: 17, difficulty: 'medium', question: say('Sailkatu 17 m, 6 m eta 14 m-ko aldeak dituen triangelua.', 'Clasifica el triángulo de lados 17 m, 6 m y 14 m.', 'صنّف المثلث الذي أضلاعه 17 م و6 م و14 م.'), solution: say('$6^{2}+14^{2}=232$, $17^{2}=289$, $232<289$: angelu-kamutsa.', '$6^{2}+14^{2}=232$, $17^{2}=289$, $232<289$: obtusángulo.', '$6^{2}+14^{2}=232$, $17^{2}=289$, $232<289$: منفرج الزاوية.') },
            { id: 18, difficulty: 'hard', question: say('Hipotenusa 30,5 cm da eta kateto bat 5,5 cm. Kalkulatu beste katetoa.', 'La hipotenusa mide 30,5 cm y un cateto 5,5 cm. Calcula el otro cateto.', 'الوتر 30.5 سم وأحد الضلعين القائمين 5.5 سم. احسب الآخر.'), solution: same('$\\sqrt{930{,}25-30{,}25}=\\sqrt{900}=30$'), answer: { expected: n(30) } },
            { id: 19, difficulty: 'hard', question: rounded(say('Hipotenusa 17 m da eta kateto bat 16 m. Kalkulatu beste katetoa.', 'La hipotenusa mide 17 m y un cateto 16 m. Calcula el otro cateto.', 'الوتر 17 م وأحد الضلعين القائمين 16 م. احسب الآخر.'), TENTHS), solution: same('$\\sqrt{289-256}=\\sqrt{33}\\approx 5{,}7$'), answer: { expected: v('5,7') } },
            { id: 20, difficulty: 'hard', question: say('Katetoak 6 cm eta 8 cm dira. Zenbat da hipotenusaren gaineko altuera?', 'Los catetos miden 6 cm y 8 cm. ¿Cuánto mide la altura sobre la hipotenusa?', 'الضلعان القائمان 6 سم و8 سم. كم الارتفاع على الوتر؟'), solution: say('Hipotenusa 10 da. Azalera bi eratara: $6\\cdot 8=10\\cdot h$, beraz $48\\mathbin{:}10=4{,}8$.', 'La hipotenusa es 10. El área de dos maneras: $6\\cdot 8=10\\cdot h$, así que $48\\mathbin{:}10=4{,}8$.', 'الوتر 10. المساحة بطريقتين: $6\\cdot 8=10\\cdot h$، إذن $48\\mathbin{:}10=4{,}8$.'), answer: { expected: v('4,8') } }
        ]
    },
    {
        id: 'plane',
        title: say('Irudi lauetan', 'En las figuras planas', 'في الأشكال المستوية'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Kalkulatu 12 cm × 5 cm-ko laukizuzen baten diagonala.', 'Calcula la diagonal de un rectángulo de 12 cm × 5 cm.', 'احسب قطر مستطيل أبعاده 12 سم × 5 سم.'), solution: same('$\\sqrt{144+25}=\\sqrt{169}=13$'), answer: { expected: n(13) } },
            { id: 22, difficulty: 'easy', question: rounded(say('Kalkulatu 7 cm-ko aldeko karratu baten diagonala.', 'Calcula la diagonal de un cuadrado de 7 cm de lado.', 'احسب قطر مربع طول ضلعه 7 سم.'), TENTHS), solution: same('$\\sqrt{49+49}=\\sqrt{98}\\approx 9{,}9$'), answer: { expected: v('9,9') } },
            { id: 23, difficulty: 'easy', question: say('Triangelu isoszele baten alde berdinak 6,5 m dira eta oinarria 5 m. Zenbat da altuera?', 'Los lados iguales de un triángulo isósceles miden 6,5 m y la base 5 m. ¿Cuánto mide la altura?', 'الضلعان المتساويان في مثلث متساوي الساقين 6.5 م والقاعدة 5 م. كم الارتفاع؟'), solution: same('$\\sqrt{42{,}25-6{,}25}=\\sqrt{36}=6$'), answer: { expected: n(6) } },
            { id: 24, difficulty: 'medium', question: say('Erronbo baten diagonalak 24 cm eta 10 cm dira. Zein da perimetroa (cm)?', 'Las diagonales de un rombo miden 24 cm y 10 cm. ¿Cuál es su perímetro (cm)?', 'قطرا معيّن 24 سم و10 سم. ما محيطه (سم)؟'), solution: same('$\\sqrt{144+25}=13\\ \\to\\ 4\\cdot 13=52$'), answer: { expected: n(52) } },
            { id: 25, difficulty: 'medium', question: rounded(say('Kalkulatu 40 cm-ko aldeko triangelu aldeberdin baten altuera.', 'Calcula la altura de un triángulo equilátero de 40 cm de lado.', 'احسب ارتفاع مثلث متساوي الأضلاع طول ضلعه 40 سم.'), TENTHS), solution: same('$\\sqrt{1600-400}=\\sqrt{1200}\\approx 34{,}6$'), answer: { expected: v('34,6') } },
            { id: 26, difficulty: 'medium', question: say('Trapezio angeluzuzen baten oinarriak 13 dm eta 19 dm dira, eta alde zeiharra 10 dm. Zein da azalera (dm²)?', 'Las bases de un trapecio rectángulo miden 13 dm y 19 dm, y el lado oblicuo 10 dm. ¿Cuál es su área (dm²)?', 'قاعدتا شبه منحرف قائم 13 دسم و19 دسم وضلعه المائل 10 دسم. ما مساحته (دسم²)؟'), solution: same('$\\sqrt{100-36}=8\\ \\to\\ \\frac{13+19}{2}\\cdot 8=128$'), answer: { expected: n(128) } },
            { id: 27, difficulty: 'medium', question: say('Trapezio isoszele baten oinarriak 8 cm eta 20 cm dira, eta alde zeiharrak 10 cm. Zein da azalera (cm²)?', 'Las bases de un trapecio isósceles miden 8 cm y 20 cm, y los lados oblicuos 10 cm. ¿Cuál es su área (cm²)?', 'قاعدتا شبه منحرف متساوي الساقين 8 سم و20 سم وضلعاه المائلان 10 سم. ما مساحته (سم²)؟'), solution: same('$(20-8)\\mathbin{:}2=6\\ \\to\\ \\sqrt{100-36}=8\\ \\to\\ \\frac{20+8}{2}\\cdot 8=112$'), answer: { expected: n(112) } },
            { id: 28, difficulty: 'hard', question: say('Erronbo baten aldea 8,5 m da eta diagonal bat 15,4 m. Zein da azalera (m²)?', 'El lado de un rombo mide 8,5 m y una diagonal 15,4 m. ¿Cuál es su área (m²)?', 'ضلع معيّن 8.5 م وأحد قطريه 15.4 م. ما مساحته (م²)؟'), solution: same('$\\sqrt{72{,}25-59{,}29}=3{,}6\\ \\to\\ d=7{,}2\\ \\to\\ \\frac{15{,}4\\cdot 7{,}2}{2}=55{,}44$'), answer: { expected: v('55,44') } },
            { id: 29, difficulty: 'hard', question: say('Laukizuzen baten diagonala 5,8 cm da eta alde bat 4 cm. Zein da azalera (cm²)?', 'La diagonal de un rectángulo mide 5,8 cm y un lado 4 cm. ¿Cuál es su área (cm²)?', 'قطر مستطيل 5.8 سم وأحد أضلاعه 4 سم. ما مساحته (سم²)؟'), solution: same('$\\sqrt{33{,}64-16}=4{,}2\\ \\to\\ 4\\cdot 4{,}2=16{,}8$'), answer: { expected: v('16,8') } },
            { id: 30, difficulty: 'hard', question: say('Erronbo baten azalera 24 cm² da eta diagonal bat 6 cm. Zein da perimetroa (cm)?', 'El área de un rombo es 24 cm² y una diagonal mide 6 cm. ¿Cuál es su perímetro (cm)?', 'مساحة معيّن 24 سم² وأحد قطريه 6 سم. ما محيطه (سم)؟'), solution: same('$\\frac{6\\cdot D}{2}=24\\ \\to\\ D=8\\ \\to\\ \\sqrt{3^{2}+4^{2}}=5\\ \\to\\ 4\\cdot 5=20$'), answer: { expected: n(20) } }
        ]
    },
    {
        id: 'circle',
        title: say('Poligono erregularrak eta zirkunferentzia', 'Polígonos regulares y circunferencia', 'المضلعات المنتظمة والدائرة'),
        items: [
            { id: 31, difficulty: 'easy', question: rounded(say('Kalkulatu 10 cm-ko aldeko hexagono erregular baten apotema.', 'Calcula la apotema de un hexágono regular de 10 cm de lado.', 'احسب عامد مسدس منتظم طول ضلعه 10 سم.'), HUNDREDTHS), solution: same('$\\sqrt{100-25}=\\sqrt{75}\\approx 8{,}66$'), answer: { expected: v('8,66') } },
            { id: 32, difficulty: 'easy', question: say('10 cm-ko erradioko zirkunferentzia batean, korda bat zentrotik 6 cm-ra dago. Zenbat da korda?', 'En una circunferencia de 10 cm de radio, una cuerda está a 6 cm del centro. ¿Cuánto mide la cuerda?', 'في دائرة نصف قطرها 10 سم، وتر يبعد 6 سم عن المركز. كم طوله؟'), solution: same('$\\sqrt{100-36}=8\\ \\to\\ 2\\cdot 8=16$'), answer: { expected: n(16) } },
            { id: 33, difficulty: 'easy', question: say('Erradioa 5 cm da eta $PT$ zuzenki ukitzailea 12 cm. Zer distantziara dago $P$ zentrotik?', 'El radio mide 5 cm y el segmento tangente $PT$ 12 cm. ¿A qué distancia está $P$ del centro?', 'نصف القطر 5 سم وقطعة المماس $PT$ طولها 12 سم. كم تبعد $P$ عن المركز؟'), solution: same('$\\sqrt{25+144}=\\sqrt{169}=13$'), answer: { expected: n(13) } },
            { id: 34, difficulty: 'medium', question: say('18 cm-ko aldeko hexagono erregular baten apotema 15,6 cm da gutxi gorabehera. Zein da azalera (cm²)?', 'La apotema de un hexágono regular de 18 cm de lado mide unos 15,6 cm. ¿Cuál es su área (cm²)?', 'عامد مسدس منتظم طول ضلعه 18 سم يساوي 15.6 سم تقريبًا. ما مساحته (سم²)؟'), solution: same('$\\frac{6\\cdot 18\\cdot 15{,}6}{2}=842{,}4$'), answer: { expected: v('842,4') } },
            { id: 35, difficulty: 'medium', question: rounded(say('8 cm-ko erradioko zirkunferentzia batean 8 cm-ko korda bat dago. Zer distantziara dago zentrotik?', 'En una circunferencia de 8 cm de radio hay una cuerda de 8 cm. ¿A qué distancia está del centro?', 'في دائرة نصف قطرها 8 سم وتر طوله 8 سم. كم يبعد عن المركز؟'), TENTHS), solution: same('$\\sqrt{64-16}=\\sqrt{48}\\approx 6{,}9$'), answer: { expected: v('6,9') } },
            { id: 36, difficulty: 'medium', question: say('Zuzenki ukitzailea 24 m da eta $P$ puntua zentrotik 26 m-ra dago. Zenbat da erradioa?', 'El segmento tangente mide 24 m y el punto $P$ está a 26 m del centro. ¿Cuánto mide el radio?', 'قطعة المماس 24 م والنقطة $P$ تبعد 26 م عن المركز. كم نصف القطر؟'), solution: same('$\\sqrt{676-576}=\\sqrt{100}=10$'), answer: { expected: n(10) } },
            { id: 37, difficulty: 'medium', question: rounded(say('1 m-ko erradioko zirkunferentzian inskribatutako pentagono erregular baten perimetroa 5,85 m da. Kalkulatu apotema.', 'Un pentágono regular inscrito en una circunferencia de 1 m de radio tiene 5,85 m de perímetro. Calcula su apotema.', 'مخمس منتظم مرسوم داخل دائرة نصف قطرها 1 م ومحيطه 5.85 م. احسب عامده.'), HUNDREDTHS), solution: same('$5{,}85\\mathbin{:}5=1{,}17\\ \\to\\ \\sqrt{1-0{,}585^{2}}\\approx 0{,}81$'), answer: { expected: v('0,81') } },
            { id: 38, difficulty: 'hard', question: rounded(say('Karratu bat 5 cm-ko erradioko zirkunferentzian inskribatuta dago. Zenbat da aldea?', 'Un cuadrado está inscrito en una circunferencia de 5 cm de radio. ¿Cuánto mide el lado?', 'مربع مرسوم داخل دائرة نصف قطرها 5 سم. كم طول ضلعه؟'), HUNDREDTHS), solution: say('Diagonala diametroa da (10): $l^{2}+l^{2}=100$, $l=\\sqrt{50}\\approx 7{,}07$.', 'La diagonal es el diámetro (10): $l^{2}+l^{2}=100$, $l=\\sqrt{50}\\approx 7{,}07$.', 'القطر هو قطر الدائرة (10): $l^{2}+l^{2}=100$، $l=\\sqrt{50}\\approx 7{,}07$.'), answer: { expected: v('7,07') } },
            { id: 39, difficulty: 'hard', question: say('Zentro bereko bi zirkunferentzia daude. Handiaren 10 cm-ko korda batek txikia ukitzen du. Zein da koroaren azalera? ($\\pi\\approx 3{,}14$)', 'Hay dos circunferencias con el mismo centro. Una cuerda de 10 cm de la grande es tangente a la pequeña. ¿Cuál es el área de la corona? ($\\pi\\approx 3{,}14$)', 'دائرتان لهما المركز نفسه. وتر طوله 10 سم في الكبرى يمس الصغرى. ما مساحة الحلقة؟ ($\\pi\\approx 3{,}14$)'), solution: say('$R^{2}=r^{2}+5^{2}$, beraz $R^{2}-r^{2}=25$ eta azalera $3{,}14\\cdot 25=78{,}5$.', '$R^{2}=r^{2}+5^{2}$, así que $R^{2}-r^{2}=25$ y el área es $3{,}14\\cdot 25=78{,}5$.', '$R^{2}=r^{2}+5^{2}$، إذن $R^{2}-r^{2}=25$ والمساحة $3{,}14\\cdot 25=78{,}5$.'), answer: { expected: v('78,5') } },
            { id: 40, difficulty: 'hard', question: rounded(say('1 m-ko erradioko zirkunferentzian inskribatutako pentagono erregular baten perimetroa 5,85 m da eta apotema 0,81 m. Kalkulatu azalera (m²).', 'Un pentágono regular inscrito en una circunferencia de 1 m de radio tiene 5,85 m de perímetro y 0,81 m de apotema. Calcula su área (m²).', 'مخمس منتظم مرسوم داخل دائرة نصف قطرها 1 م، محيطه 5.85 م وعامده 0.81 م. احسب مساحته (م²).'), HUNDREDTHS), solution: same('$\\frac{5{,}85\\cdot 0{,}81}{2}\\approx 2{,}37$'), answer: { expected: v('2,37') } }
        ]
    },
    {
        id: 'space',
        title: say('Espazioa eta problemak', 'El espacio y los problemas', 'الفضاء والمسائل'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Kalkulatu 3 cm, 4 cm eta 12 cm-ko ortoedro baten diagonala.', 'Calcula la diagonal de un ortoedro de 3 cm, 4 cm y 12 cm.', 'احسب قطر متوازي مستطيلات أبعاده 3 سم و4 سم و12 سم.'), solution: same('$\\sqrt{9+16+144}=\\sqrt{169}=13$'), answer: { expected: n(13) } },
            { id: 42, difficulty: 'easy', question: say('Kalkulatu $A(1,3)$ eta $B(9,9)$ puntuen arteko distantzia.', 'Calcula la distancia entre $A(1,3)$ y $B(9,9)$.', 'احسب المسافة بين $A(1,3)$ و$B(9,9)$.'), solution: same('$\\sqrt{8^{2}+6^{2}}=\\sqrt{100}=10$'), answer: { expected: n(10) } },
            { id: 43, difficulty: 'easy', question: say('5 m-ko eskailera baten oina hormatik 3 m-ra dago. Zer altueratara iristen da (m)?', 'El pie de una escalera de 5 m está a 3 m de la pared. ¿A qué altura llega (m)?', 'قاعدة سلّم طوله 5 م تبعد 3 م عن الجدار. إلى أي ارتفاع يصل (م)؟'), solution: same('$\\sqrt{25-9}=\\sqrt{16}=4$'), answer: { expected: n(4) } },
            { id: 44, difficulty: 'medium', question: rounded(say('Kalkulatu 8 dm, 6 dm eta 14 dm-ko ortoedro baten diagonala.', 'Calcula la diagonal de un ortoedro de 8 dm, 6 dm y 14 dm.', 'احسب قطر متوازي مستطيلات أبعاده 8 دسم و6 دسم و14 دسم.'), TENTHS), solution: same('$\\sqrt{64+36}=10\\ \\to\\ \\sqrt{100+196}=\\sqrt{296}\\approx 17{,}2$'), answer: { expected: v('17,2') } },
            { id: 45, difficulty: 'medium', question: rounded(say('Zilindro baten oinarriaren diametroa 4 m da eta altuera 4 m. Zein da sartzen den barra luzeena (m)?', 'Un cilindro tiene 4 m de diámetro y 4 m de altura. ¿Cuál es la barra más larga que cabe (m)?', 'أسطوانة قطر قاعدتها 4 م وارتفاعها 4 م. ما أطول قضيب يدخل فيها (م)؟'), TENTHS), solution: same('$\\sqrt{16+16}=\\sqrt{32}\\approx 5{,}7$'), answer: { expected: v('5,7') } },
            { id: 46, difficulty: 'medium', question: rounded(say('4 m iparraldera eta 7 m ekialdera ibili gara; gero beste 5 m iparraldera eta 3 m ekialdera. Zer distantziara gaude abiapuntutik (m)?', 'Caminamos 4 m al norte y 7 m al este; luego otros 5 m al norte y 3 m al este. ¿A qué distancia estamos del punto de partida (m)?', 'مشينا 4 م شمالًا و7 م شرقًا، ثم 5 م أخرى شمالًا و3 م شرقًا. كم نبعد عن نقطة الانطلاق (م)؟'), HUNDREDTHS), solution: same('$\\sqrt{(4+5)^{2}+(7+3)^{2}}=\\sqrt{181}\\approx 13{,}45$'), answer: { expected: v('13,45') } },
            { id: 47, difficulty: 'medium', question: say('Kometa baten soka 50 m da eta kometa 30 m-ra dago horizontalean. Zer altueratan dago (m)?', 'La cuerda de una cometa mide 50 m y la cometa está a 30 m en horizontal. ¿A qué altura está (m)?', 'خيط طائرة ورقية طوله 50 م والطائرة على بعد 30 م أفقيًا. على أي ارتفاع هي (م)؟'), solution: same('$\\sqrt{2500-900}=\\sqrt{1600}=40$'), answer: { expected: n(40) } },
            { id: 48, difficulty: 'hard', question: rounded(say('Parke zirkular baten erdian 20 m-ko zuhaitz bat dago. Altueraren laurdenean moztu da, eta erortzean ertzera iristen da. Zenbat da parkearen diametroa (m)?', 'En el centro de un parque circular hay un árbol de 20 m. Se corta a un cuarto de su altura y, al caer, llega justo al borde. ¿Cuánto mide el diámetro del parque (m)?', 'في وسط حديقة دائرية شجرة طولها 20 م. قُطعت عند ربع ارتفاعها فوصلت عند سقوطها إلى الحافة تمامًا. كم قطر الحديقة (م)؟'), TENTHS), solution: say('Zutik 5 m geratzen dira eta 15 m-ko zatia erortzen da: $\\sqrt{15^{2}-5^{2}}=\\sqrt{200}$, eta diametroa $2\\cdot\\sqrt{200}\\approx 28{,}3$.', 'Quedan 5 m de pie y cae un trozo de 15 m: $\\sqrt{15^{2}-5^{2}}=\\sqrt{200}$, y el diámetro es $2\\cdot\\sqrt{200}\\approx 28{,}3$.', 'يبقى 5 م قائمًا ويسقط جزء طوله 15 م: $\\sqrt{15^{2}-5^{2}}=\\sqrt{200}$، والقطر $2\\cdot\\sqrt{200}\\approx 28{,}3$.'), answer: { expected: v('28,3') } },
            { id: 49, difficulty: 'hard', question: say('12 m-ko bi poste 30 m-ra daude. Haien goiko muturretan 34 m-ko soka bat lotu da, eta erdian 1 m-ko izar bat zintzilikatu. Zer altueratan geratzen da izarraren behealdea (m)?', 'Dos postes de 12 m están separados 30 m. De sus extremos de arriba cuelga una cuerda de 34 m y en el centro una estrella de 1 m. ¿A qué altura del suelo queda la parte de abajo de la estrella (m)?', 'عمودان طول كل منهما 12 م بينهما 30 م. عُلّق بين طرفيهما العلويين حبل طوله 34 م، وفي وسطه نجمة طولها 1 م. على أي ارتفاع من الأرض يبقى أسفل النجمة (م)؟'), solution: same('$\\sqrt{17^{2}-15^{2}}=8\\ \\to\\ 12-8-1=3$'), answer: { expected: n(3) } },
            { id: 50, difficulty: 'hard', question: say('6,5 m-ko eskailera bat horma batean 6 m-ko altueran dago. Oina mugitu gabe, aurreko horman jartzen da 5,2 m-ko altueran. Zer distantziara daude hormak (m)?', 'Una escalera de 6,5 m llega a 6 m de altura en una pared. Sin mover el pie, se apoya en la pared de enfrente a 5,2 m de altura. ¿A qué distancia están las paredes (m)?', 'سلّم طوله 6.5 م يصل إلى ارتفاع 6 م على جدار. ودون تحريك قاعدته يُسند إلى الجدار المقابل على ارتفاع 5.2 م. كم المسافة بين الجدارين (م)؟'), solution: same('$\\sqrt{42{,}25-36}=2{,}5\\qquad\\sqrt{42{,}25-27{,}04}=3{,}9\\qquad 2{,}5+3{,}9=6{,}4$'), answer: { expected: v('6,4') } }
        ]
    }
]

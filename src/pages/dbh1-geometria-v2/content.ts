import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Geometria · 1. DBH — diagnostic, guided practice, exercise bank and
   challenges from Santillana 1.º ESO units 9, 10 and 11 (types of angles,
   classifying triangles and quadrilaterals, Pythagoras, perimeters and
   areas) and Anaya units 11–13. Answers are numbers without units;
   π ≈ 3,14. Decimals with a comma (a point in Arabic).
   ========================================================================== */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const geometryIntroDiagnostic: DiagnosticQuestion[] = [
    {
        id: 1201,
        prompt: say('Zer da 120°-ko angelua?', '¿Qué tipo de ángulo mide 120°?', 'ما نوع الزاوية التي قياسها 120°؟'),
        options: [say('Zorrotza', 'Agudo', 'حادة'), say('Kamutsa', 'Obtuso', 'منفرجة'), say('Laua', 'Llano', 'مستقيمة')],
        correctIndex: 1,
        explanation: say('90° baino handiagoa eta 180° baino txikiagoa: kamutsa.', 'Mayor que 90° y menor que 180°: obtuso.', 'أكبر من 90° وأصغر من 180°: منفرجة.'),
        topic: 'angles'
    },
    {
        id: 1202,
        prompt: say('Zein da 40°-ko angeluaren osagarria?', '¿Cuál es el complementario de un ángulo de 40°?', 'ما متممة زاوية قياسها 40°؟'),
        options: [same('$140^{\\circ}$'), same('$50^{\\circ}$'), same('$320^{\\circ}$')],
        correctIndex: 1,
        explanation: say('Osagarriak 90° dira batuta: $90^{\\circ}-40^{\\circ}=50^{\\circ}$. 140° betegarria da.', 'Los complementarios suman 90°: $90^{\\circ}-40^{\\circ}=50^{\\circ}$. 140° es el suplementario.', 'المتتامتان مجموعهما 90°: $90^{\\circ}-40^{\\circ}=50^{\\circ}$. أما 140° فهي المكملة.'),
        topic: 'angle-pairs'
    },
    {
        id: 1203,
        prompt: say('Triangelu baten bi angelu 60° eta 80° dira. Zenbat da hirugarrena?', 'Dos ángulos de un triángulo miden 60° y 80°. ¿Cuánto mide el tercero?', 'زاويتان في مثلث قياسهما 60° و80°. كم قياس الثالثة؟'),
        options: [same('$40^{\\circ}$'), same('$140^{\\circ}$'), same('$220^{\\circ}$')],
        correctIndex: 0,
        explanation: same('$180^{\\circ}-60^{\\circ}-80^{\\circ}=40^{\\circ}$'),
        topic: 'triangles'
    },
    {
        id: 1204,
        prompt: say('Bi alde berdin dituen triangelua…', 'Un triángulo con dos lados iguales es…', 'المثلث الذي له ضلعان متساويان هو…'),
        options: [say('aldeberdina', 'equilátero', 'متساوي الأضلاع'), say('eskalenoa', 'escaleno', 'مختلف الأضلاع'), say('isoszelea', 'isósceles', 'متساوي الساقين')],
        correctIndex: 2,
        explanation: say('Isoszelea: bi alde berdin. Aldeberdinak hiru ditu.', 'Isósceles: dos lados iguales. El equilátero tiene tres.', 'متساوي الساقين: ضلعان متساويان. أما متساوي الأضلاع فله ثلاثة.'),
        topic: 'triangle-lines'
    },
    {
        id: 1205,
        prompt: say('Triangelu angeluzuzen baten katetoak 3 eta 4 dira. Zenbat da hipotenusa?', 'Los catetos de un triángulo rectángulo miden 3 y 4. ¿Cuánto mide la hipotenusa?', 'الضلعان القائمان في مثلث قائم 3 و4. كم طول الوتر؟'),
        options: [same('$7$'), same('$5$'), same('$25$')],
        correctIndex: 1,
        explanation: same('$\\sqrt{3^{2}+4^{2}}=\\sqrt{25}=5$'),
        topic: 'pythagoras'
    },
    {
        id: 1206,
        prompt: say('Zenbat da 6 cm-ko aldea duen karratuaren perimetroa?', '¿Cuál es el perímetro de un cuadrado de lado 6 cm?', 'كم محيط مربع ضلعه 6 سم؟'),
        options: [same('$36$'), same('$24$'), same('$12$')],
        correctIndex: 1,
        explanation: say('$4\\cdot 6=24$ cm. 36 azalera da (cm²).', '$4\\cdot 6=24$ cm. 36 es el área (cm²).', '$4\\cdot 6=24$ سم. أما 36 فهي المساحة (سم²).'),
        topic: 'perimeter'
    },
    {
        id: 1207,
        prompt: say('Zenbat da 8 cm-ko oinarria eta 5 cm-ko altuera dituen triangeluaren azalera?', '¿Cuál es el área de un triángulo de base 8 cm y altura 5 cm?', 'كم مساحة مثلث قاعدته 8 سم وارتفاعه 5 سم؟'),
        options: [same('$40$'), same('$20$'), same('$13$')],
        correctIndex: 1,
        explanation: same('$\\frac{8\\cdot 5}{2}=20$'),
        topic: 'area-triangle'
    },
    {
        id: 1208,
        prompt: say('Zenbat cm dira 2,5 m?', '¿Cuántos cm son 2,5 m?', 'كم سنتيمترًا في 2.5 م؟'),
        options: [same('$25$'), same('$250$'), same('$2\\,500$')],
        correctIndex: 1,
        explanation: same('$2{,}5\\cdot 100=250$'),
        topic: 'units'
    }
]

export const geometryIntroPractice: PracticeItem[] = [
    { id: 1, stage: 'angles', prompt: say('Kalkulatu 35°-ko angeluaren osagarria.', 'Calcula el complementario de un ángulo de 35°.', 'احسب متممة زاوية قياسها 35°.'), expected: fraction(55), hint: say('Kendu 90°-ri.', 'Réstalo de 90°.', 'اطرحها من 90°.'), explanation: same('$90-35=55$') },
    { id: 2, stage: 'angles', prompt: say('Kalkulatu 35°-ko angeluaren betegarria.', 'Calcula el suplementario de un ángulo de 35°.', 'احسب مكملة زاوية قياسها 35°.'), expected: fraction(145), hint: say('Kendu 180°-ri.', 'Réstalo de 180°.', 'اطرحها من 180°.'), explanation: same('$180-35=145$') },
    { id: 3, stage: 'angles', prompt: say('Bi zuzen ebakitzen dira eta angeluetako bat 70° da. Zenbat da erpinez aurkakoa?', 'Dos rectas se cortan y uno de los ángulos mide 70°. ¿Cuánto mide su opuesto por el vértice?', 'يتقاطع مستقيمان وإحدى الزوايا 70°. كم قياس الزاوية المقابلة لها بالرأس؟'), expected: fraction(70), hint: say('Erpinez aurkakoak berdinak dira.', 'Los opuestos por el vértice son iguales.', 'المتقابلتان بالرأس متساويتان.'), explanation: say('70° (ondokoak $180-70=110$).', '70° (los contiguos, $180-70=110$).', '70° (المتجاورتان $180-70=110$).') },
    { id: 4, stage: 'angles', prompt: say('Zenbat gradu ditu angelu zuzen baten erdiak?', '¿Cuántos grados mide la mitad de un ángulo recto?', 'كم درجة نصف الزاوية القائمة؟'), expected: fraction(45), hint: say('Angelu zuzena: 90°.', 'Ángulo recto: 90°.', 'الزاوية القائمة: 90°.'), explanation: same('$90\\mathbin{:}2=45$') },
    { id: 5, stage: 'polygons', prompt: say('Triangelu baten bi angelu 50° eta 70° dira. Zenbat da hirugarrena?', 'Dos ángulos de un triángulo miden 50° y 70°. ¿Cuánto mide el tercero?', 'زاويتان في مثلث 50° و70°. كم الثالثة؟'), expected: fraction(60), hint: say('Batura 180°.', 'Suman 180°.', 'المجموع 180°.'), explanation: same('$180-50-70=60$') },
    { id: 6, stage: 'polygons', prompt: say('Triangelu angeluzuzen baten angelu zorrotz bat 35° da. Zenbat da bestea?', 'Un ángulo agudo de un triángulo rectángulo mide 35°. ¿Cuánto mide el otro?', 'زاوية حادة في مثلث قائم 35°. كم الأخرى؟'), expected: fraction(55), hint: say('Beste biak 90° dira batuta.', 'Los otros dos suman 90°.', 'مجموع الزاويتين الأخريين 90°.'), explanation: same('$180-90-35=55$') },
    { id: 7, stage: 'polygons', prompt: say('Lauki baten hiru angelu 90°, 90° eta 110° dira. Zenbat da laugarrena?', 'Tres ángulos de un cuadrilátero miden 90°, 90° y 110°. ¿Cuánto mide el cuarto?', 'ثلاث زوايا في رباعي 90° و90° و110°. كم الرابعة؟'), expected: fraction(70), hint: say('Laukien angeluak: 360°.', 'Los ángulos de un cuadrilátero: 360°.', 'زوايا الرباعي: 360°.'), explanation: same('$360-90-90-110=70$') },
    { id: 8, stage: 'polygons', prompt: say('Zirkunferentzia baten erradioa 7 cm da. Zenbat da diametroa?', 'El radio de una circunferencia mide 7 cm. ¿Cuánto mide el diámetro?', 'نصف قطر دائرة 7 سم. كم قطرها؟'), expected: fraction(14), hint: say('$d=2r$', '$d=2r$', '$d=2r$'), explanation: same('$2\\cdot 7=14$') },
    { id: 9, stage: 'pythagoras', prompt: say('Katetoak 6 eta 8 dira. Zenbat da hipotenusa?', 'Los catetos miden 6 y 8. ¿Cuánto mide la hipotenusa?', 'الضلعان القائمان 6 و8. كم الوتر؟'), expected: fraction(10), hint: say('$6^{2}+8^{2}$', '$6^{2}+8^{2}$', '$6^{2}+8^{2}$'), explanation: same('$\\sqrt{36+64}=\\sqrt{100}=10$') },
    { id: 10, stage: 'pythagoras', prompt: say('Katetoak 5 eta 12 dira. Zenbat da hipotenusa?', 'Los catetos miden 5 y 12. ¿Cuánto mide la hipotenusa?', 'الضلعان القائمان 5 و12. كم الوتر؟'), expected: fraction(13), hint: say('$25+144$', '$25+144$', '$25+144$'), explanation: same('$\\sqrt{169}=13$') },
    { id: 11, stage: 'pythagoras', prompt: say('Hipotenusa 10 da eta kateto bat 6. Zenbat da beste katetoa?', 'La hipotenusa mide 10 y un cateto 6. ¿Cuánto mide el otro cateto?', 'الوتر 10 وأحد الضلعين القائمين 6. كم الآخر؟'), expected: fraction(8), hint: say('Kendu: $10^{2}-6^{2}$.', 'Resta: $10^{2}-6^{2}$.', 'اطرح: $10^{2}-6^{2}$.'), explanation: same('$\\sqrt{100-36}=\\sqrt{64}=8$') },
    { id: 12, stage: 'pythagoras', prompt: say('Zenbat da 9 eta 12 katetoak dituen triangeluaren hipotenusa?', '¿Cuánto mide la hipotenusa de un triángulo de catetos 9 y 12?', 'كم وتر مثلث ضلعاه القائمان 9 و12؟'), expected: fraction(15), hint: say('$81+144$', '$81+144$', '$81+144$'), explanation: same('$\\sqrt{225}=15$') },
    { id: 13, stage: 'perimeters', prompt: say('Zenbat cm dira 3,5 m?', '¿Cuántos cm son 3,5 m?', 'كم سنتيمترًا في 3.5 م؟'), expected: fraction(350), hint: say('m → cm: bider 100.', 'm → cm: por 100.', 'م ← سم: في 100.'), explanation: same('$3{,}5\\cdot 100=350$') },
    { id: 14, stage: 'perimeters', prompt: say('Zenbat da 8 cm eta 5 cm-ko laukizuzenaren perimetroa?', '¿Cuál es el perímetro de un rectángulo de 8 cm y 5 cm?', 'كم محيط مستطيل بعداه 8 سم و5 سم؟'), expected: fraction(26), hint: say('Bi luzera eta bi zabalera.', 'Dos largos y dos anchos.', 'طولان وعرضان.'), explanation: same('$2\\cdot 8+2\\cdot 5=26$') },
    { id: 15, stage: 'perimeters', prompt: say('Zenbat da 6 cm-ko aldea duen hexagono erregularraren perimetroa?', '¿Cuál es el perímetro de un hexágono regular de 6 cm de lado?', 'كم محيط مسدس منتظم ضلعه 6 سم؟'), expected: fraction(36), hint: say('6 alde berdin.', '6 lados iguales.', '6 أضلاع متساوية.'), explanation: same('$6\\cdot 6=36$') },
    { id: 16, stage: 'perimeters', prompt: say('Kalkulatu 5 cm-ko erradioa duen zirkunferentziaren luzera (π ≈ 3,14).', 'Calcula la longitud de una circunferencia de 5 cm de radio (π ≈ 3,14).', 'احسب طول دائرة نصف قطرها 5 سم (π ≈ 3.14).'), expected: fraction(314, 10), hint: say('$L=2\\pi r$', '$L=2\\pi r$', '$L=2\\pi r$'), explanation: same('$2\\cdot 3{,}14\\cdot 5=31{,}4$') },
    { id: 17, stage: 'areas', prompt: say('Zenbat da 8 cm eta 5 cm-ko laukizuzenaren azalera?', '¿Cuál es el área de un rectángulo de 8 cm y 5 cm?', 'كم مساحة مستطيل بعداه 8 سم و5 سم؟'), expected: fraction(40), hint: say('Oinarria bider altuera.', 'Base por altura.', 'القاعدة في الارتفاع.'), explanation: same('$8\\cdot 5=40$') },
    { id: 18, stage: 'areas', prompt: say('Zenbat da 10 cm-ko oinarria eta 6 cm-ko altuera dituen triangeluaren azalera?', '¿Cuál es el área de un triángulo de base 10 cm y altura 6 cm?', 'كم مساحة مثلث قاعدته 10 سم وارتفاعه 6 سم؟'), expected: fraction(30), hint: say('Ez ahaztu zati bi.', 'No olvides dividir entre dos.', 'لا تنسَ القسمة على اثنين.'), explanation: same('$\\frac{10\\cdot 6}{2}=30$') },
    { id: 19, stage: 'areas', prompt: say('Erronbo baten diagonalak 8 cm eta 6 cm dira. Zenbat da azalera?', 'Las diagonales de un rombo miden 8 cm y 6 cm. ¿Cuál es su área?', 'قطرا معيّن 8 سم و6 سم. كم مساحته؟'), expected: fraction(24), hint: say('$\\frac{D\\cdot d}{2}$', '$\\frac{D\\cdot d}{2}$', '$\\frac{D\\cdot d}{2}$'), explanation: same('$\\frac{8\\cdot 6}{2}=24$') },
    { id: 20, stage: 'areas', prompt: say('Kalkulatu 10 cm-ko erradioa duen zirkuluaren azalera (π ≈ 3,14).', 'Calcula el área de un círculo de 10 cm de radio (π ≈ 3,14).', 'احسب مساحة قرص نصف قطره 10 سم (π ≈ 3.14).'), expected: fraction(314), hint: say('$A=\\pi r^{2}$', '$A=\\pi r^{2}$', '$A=\\pi r^{2}$'), explanation: same('$3{,}14\\cdot 10^{2}=314$') }
]

export const geometryIntroChallenges: ChallengeItem[] = [
    { id: 101, stage: 'angles', context: 'starter', points: 10, prompt: say('Angelu bat bere osagarriaren bikoitza da. Zenbat gradu ditu?', 'Un ángulo es el doble de su complementario. ¿Cuántos grados mide?', 'زاوية ضعف متممتها. كم قياسها؟'), expected: fraction(60), hint: say('Bi angeluak: x eta 2x, batuta 90°.', 'Los dos ángulos: x y 2x, suman 90°.', 'الزاويتان: x و2x، مجموعهما 90°.'), explanation: same('$3x=90$, $x=30$, $2\\cdot 30=60$') },
    { id: 102, stage: 'polygons', context: 'starter', points: 10, prompt: say('Triangelu isoszele baten angelu desberdina 40° da. Zenbat da beste bietako bakoitza?', 'El ángulo desigual de un triángulo isósceles mide 40°. ¿Cuánto mide cada uno de los otros dos?', 'الزاوية المختلفة في مثلث متساوي الساقين 40°. كم كل من الأخريين؟'), expected: fraction(70), hint: say('Beste biak berdinak dira eta 140° dira batuta.', 'Los otros dos son iguales y suman 140°.', 'الأخريان متساويتان ومجموعهما 140°.'), explanation: same('$(180-40)\\mathbin{:}2=70$') },
    { id: 103, stage: 'polygons', context: 'starter', points: 10, prompt: say('Zenbat gradu ditu triangelu aldeberdin baten angelu bakoitzak?', '¿Cuántos grados mide cada ángulo de un triángulo equilátero?', 'كم درجة كل زاوية في مثلث متساوي الأضلاع؟'), expected: fraction(60), hint: say('Hiru angelu berdin.', 'Tres ángulos iguales.', 'ثلاث زوايا متساوية.'), explanation: same('$180\\mathbin{:}3=60$') },
    { id: 104, stage: 'perimeters', context: 'starter', points: 10, prompt: say('Futbol-zelai batek 100 m eta 60 m ditu. Zenbat metro egiten dira inguruan bira bat emanda?', 'Un campo de fútbol mide 100 m por 60 m. ¿Cuántos metros se recorren dando una vuelta?', 'ملعب كرة قدم 100 م × 60 م. كم مترًا نقطع في دورة كاملة حوله؟'), expected: fraction(320), hint: say('Perimetroa.', 'El perímetro.', 'المحيط.'), explanation: same('$2\\cdot 100+2\\cdot 60=320$') },
    { id: 105, stage: 'pythagoras', context: 'advanced', points: 20, prompt: say('5 m-ko eskailera bat horma batean bermatuta dago, oina hormatik 3 m-ra duela. Zein altueratara iristen da?', 'Una escalera de 5 m está apoyada en una pared con el pie a 3 m de la pared. ¿A qué altura llega?', 'سلم طوله 5 م مستند إلى جدار وقاعدته على بعد 3 م منه. إلى أي ارتفاع يصل؟'), expected: fraction(4), hint: say('Eskailera hipotenusa da.', 'La escalera es la hipotenusa.', 'السلم هو الوتر.'), explanation: same('$\\sqrt{25-9}=\\sqrt{16}=4$') },
    { id: 106, stage: 'pythagoras', context: 'advanced', points: 20, prompt: say('Laukizuzen baten aldeak 8 cm eta 15 cm dira. Zenbat da diagonala?', 'Los lados de un rectángulo miden 8 cm y 15 cm. ¿Cuánto mide la diagonal?', 'ضلعا مستطيل 8 سم و15 سم. كم طول قطره؟'), expected: fraction(17), hint: say('Diagonalak bi triangelu angeluzuzen egiten ditu.', 'La diagonal forma dos triángulos rectángulos.', 'القطر يكوّن مثلثين قائمين.'), explanation: same('$\\sqrt{64+225}=\\sqrt{289}=17$') },
    { id: 107, stage: 'areas', context: 'advanced', points: 20, prompt: say('Trapezio baten oinarriak 9 cm eta 5 cm dira eta altuera 4 cm. Zenbat da azalera?', 'Las bases de un trapecio miden 9 cm y 5 cm y su altura 4 cm. ¿Cuál es su área?', 'قاعدتا شبه منحرف 9 سم و5 سم وارتفاعه 4 سم. كم مساحته؟'), expected: fraction(28), hint: say('$\\frac{(B+b)\\cdot h}{2}$', '$\\frac{(B+b)\\cdot h}{2}$', '$\\frac{(B+b)\\cdot h}{2}$'), explanation: same('$\\frac{(9+5)\\cdot 4}{2}=28$') },
    { id: 108, stage: 'areas', context: 'advanced', points: 20, prompt: say('Gela bat 5 m × 4 m-koa da. Zenbat lauza behar dira 50 cm-ko aldeko lauza karratuekin estaltzeko?', 'Una habitación mide 5 m × 4 m. ¿Cuántas baldosas cuadradas de 50 cm de lado hacen falta para cubrirla?', 'غرفة 5 م × 4 م. كم بلاطة مربعة ضلعها 50 سم نحتاج لتغطيتها؟'), expected: fraction(80), hint: say('Gela: 20 m². Lauza bat: $0{,}5\\cdot 0{,}5$ m².', 'Habitación: 20 m². Una baldosa: $0{,}5\\cdot 0{,}5$ m².', 'الغرفة: 20 م². البلاطة: $0{,}5\\cdot 0{,}5$ م².'), explanation: same('$20\\mathbin{:}0{,}25=80$') },
    { id: 109, stage: 'perimeters', context: 'advanced', points: 20, prompt: say('Bizikleta-gurpil baten diametroa 60 cm da. Zenbat cm egiten ditu itzuli batean (π ≈ 3,14)?', 'La rueda de una bici mide 60 cm de diámetro. ¿Cuántos cm avanza en una vuelta (π ≈ 3,14)?', 'قطر عجلة دراجة 60 سم. كم سنتيمترًا تتقدم في دورة (π ≈ 3.14)؟'), expected: fraction(1884, 10), hint: say('$L=\\pi d$', '$L=\\pi d$', '$L=\\pi d$'), explanation: same('$3{,}14\\cdot 60=188{,}4$') },
    { id: 110, stage: 'areas', context: 'master', points: 30, prompt: say('Karratu baten perimetroa 36 cm da. Zenbat da azalera?', 'El perímetro de un cuadrado es 36 cm. ¿Cuál es su área?', 'محيط مربع 36 سم. كم مساحته؟'), expected: fraction(81), hint: say('Lehenik aldea: $36\\mathbin{:}4$.', 'Primero el lado: $36\\mathbin{:}4$.', 'أولًا الضلع: $36\\mathbin{:}4$.'), explanation: same('$36\\mathbin{:}4=9$, $9^{2}=81$') },
    { id: 111, stage: 'areas', context: 'master', points: 30, prompt: say('Laukizuzen baten azalera 48 cm² da eta oinarria 8 cm. Zenbat da perimetroa?', 'Un rectángulo tiene 48 cm² de área y 8 cm de base. ¿Cuál es su perímetro?', 'مساحة مستطيل 48 سم² وقاعدته 8 سم. كم محيطه؟'), expected: fraction(28), hint: say('Altuera: $48\\mathbin{:}8$.', 'Altura: $48\\mathbin{:}8$.', 'الارتفاع: $48\\mathbin{:}8$.'), explanation: same('$48\\mathbin{:}8=6$, $2\\cdot 8+2\\cdot 6=28$') },
    { id: 112, stage: 'areas', context: 'master', points: 30, prompt: say('20 cm-ko aldea duen karratu batetik 10 cm-ko erradioa duen zirkulua moztu da. Zenbat cm² geratzen dira (π ≈ 3,14)?', 'De un cuadrado de 20 cm de lado se recorta un círculo de 10 cm de radio. ¿Cuántos cm² sobran (π ≈ 3,14)?', 'من مربع ضلعه 20 سم قُصّ قرص نصف قطره 10 سم. كم سنتيمترًا مربعًا يبقى (π ≈ 3.14)؟'), expected: fraction(86), hint: say('Karratua ken zirkulua.', 'Cuadrado menos círculo.', 'المربع ناقص القرص.'), explanation: same('$20^{2}-3{,}14\\cdot 10^{2}=400-314=86$') }
]

export const geometryIntroExerciseBank: ExerciseSection[] = [
    {
        id: 'angles',
        title: say('Zuzenak eta angeluak', 'Rectas y ángulos', 'المستقيمات والزوايا'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Sailkatu angelu hauek: 30°, 90°, 150°, 180°, 89°.', 'Clasifica estos ángulos: 30°, 90°, 150°, 180°, 89°.', 'صنّف هذه الزوايا: 30°، 90°، 150°، 180°، 89°.'), solution: say('30°: zorrotza; 90°: zuzena; 150°: kamutsa; 180°: laua; 89°: zorrotza.', '30°: agudo; 90°: recto; 150°: obtuso; 180°: llano; 89°: agudo.', '30°: حادة؛ 90°: قائمة؛ 150°: منفرجة؛ 180°: مستقيمة؛ 89°: حادة.') },
            { id: 2, difficulty: 'easy', question: say('Marraztu bi zuzen paralelo, bi ebakitzaile eta bi perpendikular.', 'Dibuja dos rectas paralelas, dos secantes y dos perpendiculares.', 'ارسم مستقيمين متوازيين ومتقاطعين ومتعامدين.'), solution: say('Paraleloak ez dira ebakitzen; ebakitzaileak puntu batean; perpendikularrek lau angelu zuzen osatzen dituzte.', 'Las paralelas no se cortan; las secantes en un punto; las perpendiculares forman cuatro ángulos rectos.', 'المتوازيان لا يتقاطعان؛ والمتقاطعان في نقطة؛ والمتعامدان يكوّنان أربع زوايا قائمة.') },
            { id: 3, difficulty: 'medium', question: say('Kalkulatu osagarria eta betegarria: a) 25°; b) 60°; c) 89°.', 'Calcula el complementario y el suplementario de: a) 25°; b) 60°; c) 89°.', 'احسب المتممة والمكملة لـ: أ) 25°؛ ب) 60°؛ ج) 89°.'), solution: same('a) $65^{\\circ}$, $155^{\\circ}$; b) $30^{\\circ}$, $120^{\\circ}$; c) $1^{\\circ}$, $91^{\\circ}$') },
            { id: 4, difficulty: 'medium', question: say('Bi zuzen ebakitzen dira eta angelu bat 125° da. Kalkulatu beste hiruak.', 'Dos rectas se cortan y un ángulo mide 125°. Calcula los otros tres.', 'يتقاطع مستقيمان وإحدى الزوايا 125°. احسب الثلاث الأخرى.'), solution: say('Aurkakoa 125°; ondokoak $180-125=55$ bakoitza.', 'El opuesto 125°; los contiguos, $180-125=55$ cada uno.', 'المقابلة 125°؛ والمتجاورتان $180-125=55$ لكل منهما.') },
            { id: 5, difficulty: 'medium', question: say('Zein da 72°-ko angeluaren betegarria?', '¿Cuál es el suplementario de 72°?', 'ما مكملة 72°؟'), solution: same('$180-72=108$'), answer: { expected: fraction(108) } },
            { id: 6, difficulty: 'hard', question: say('Bi angelu betegarriak dira eta bata bestea baino 40° handiagoa da. Zenbat da txikiena?', 'Dos ángulos son suplementarios y uno mide 40° más que el otro. ¿Cuánto mide el menor?', 'زاويتان متكاملتان إحداهما أكبر من الأخرى بـ 40°. كم قياس الصغرى؟'), solution: same('$x+(x+40)=180$, $2x=140$, $x=70$'), answer: { expected: fraction(70) } }
        ]
    },
    {
        id: 'polygons',
        title: say('Poligonoak eta zirkulua', 'Polígonos y círculo', 'المضلعات والدائرة'),
        items: [
            { id: 7, difficulty: 'easy', question: say('Nola deitzen dira 5, 6 eta 8 alde dituzten poligonoak?', '¿Cómo se llaman los polígonos de 5, 6 y 8 lados?', 'ما اسم المضلعات ذات 5 و6 و8 أضلاع؟'), solution: say('Pentagonoa, hexagonoa eta oktogonoa.', 'Pentágono, hexágono y octógono.', 'مخمس ومسدس ومثمن.') },
            { id: 8, difficulty: 'easy', question: say('Sailkatu aldeen arabera 5, 5 eta 5 cm-ko triangelua, 5, 5 eta 3 cm-koa eta 4, 5 eta 6 cm-koa.', 'Clasifica según sus lados los triángulos de 5, 5 y 5 cm; 5, 5 y 3 cm; y 4, 5 y 6 cm.', 'صنّف حسب الأضلاع المثلثات: 5 و5 و5 سم؛ 5 و5 و3 سم؛ 4 و5 و6 سم.'), solution: say('Aldeberdina, isoszelea eta eskalenoa.', 'Equilátero, isósceles y escaleno.', 'متساوي الأضلاع، متساوي الساقين، مختلف الأضلاع.') },
            { id: 9, difficulty: 'medium', question: say('Triangelu baten angeluak 90° eta 25° dira. Zenbat da hirugarrena? Nolakoa da triangelua?', 'Dos ángulos de un triángulo miden 90° y 25°. ¿Cuánto mide el tercero? ¿Qué tipo de triángulo es?', 'زاويتان في مثلث 90° و25°. كم الثالثة؟ وما نوع المثلث؟'), solution: say('$180-90-25=65$: angeluzuzena.', '$180-90-25=65$: rectángulo.', '$180-90-25=65$: قائم الزاوية.'), answer: { expected: fraction(65) } },
            { id: 10, difficulty: 'medium', question: say('Zer ezberdintasun dago erronboaren eta karratuaren artean? Eta laukizuzenaren eta karratuaren artean?', '¿Qué diferencia hay entre un rombo y un cuadrado? ¿Y entre un rectángulo y un cuadrado?', 'ما الفرق بين المعيّن والمربع؟ وبين المستطيل والمربع؟'), solution: say('Erronboak alde berdinak ditu baina angeluak ez dira zuzenak. Laukizuzenak angelu zuzenak ditu baina aldeak ez dira denak berdinak. Karratuak biak ditu.', 'El rombo tiene los lados iguales pero sus ángulos no son rectos. El rectángulo tiene ángulos rectos pero no todos los lados iguales. El cuadrado cumple las dos cosas.', 'للمعيّن أضلاع متساوية لكن زواياه ليست قائمة. وللمستطيل زوايا قائمة لكن أضلاعه ليست كلها متساوية. والمربع يجمع الأمرين.') },
            { id: 11, difficulty: 'medium', question: say('Zirkulu baten diametroa 18 cm da. Zenbat da erradioa?', 'El diámetro de un círculo mide 18 cm. ¿Cuánto mide el radio?', 'قطر قرص 18 سم. كم نصف قطره؟'), solution: same('$18\\mathbin{:}2=9$'), answer: { expected: fraction(9) } },
            { id: 12, difficulty: 'hard', question: say('Trapezio isoszele baten angelu bat 65° da. Zenbat dira beste hiruak?', 'Un ángulo de un trapecio isósceles mide 65°. ¿Cuánto miden los otros tres?', 'إحدى زوايا شبه منحرف متساوي الساقين 65°. كم الزوايا الثلاث الأخرى؟'), solution: say('65°, 115° eta 115° ($65+65+115+115=360$).', '65°, 115° y 115° ($65+65+115+115=360$).', '65° و115° و115° ($65+65+115+115=360$).') }
        ]
    },
    {
        id: 'pythagoras',
        title: say('Pitagorasen teorema', 'Teorema de Pitágoras', 'مبرهنة فيثاغورس'),
        items: [
            { id: 13, difficulty: 'easy', question: say('Angeluzuzenak al dira 6, 8 eta 10 cm-ko eta 4, 5 eta 6 cm-ko triangeluak?', '¿Son rectángulos los triángulos de 6, 8 y 10 cm y de 4, 5 y 6 cm?', 'هل المثلثان 6 و8 و10 سم و4 و5 و6 سم قائما الزاوية؟'), solution: say('Lehena bai: $36+64=100$. Bigarrena ez: $16+25=41\\neq 36$.', 'El primero sí: $36+64=100$. El segundo no: $16+25=41\\neq 36$.', 'الأول نعم: $36+64=100$. الثاني لا: $16+25=41\\neq 36$.') },
            { id: 14, difficulty: 'easy', question: say('Katetoak 3 eta 4 badira, zenbat da hipotenusa?', 'Si los catetos miden 3 y 4, ¿cuánto mide la hipotenusa?', 'إذا كان الضلعان القائمان 3 و4 فكم الوتر؟'), solution: same('$\\sqrt{9+16}=\\sqrt{25}=5$'), answer: { expected: fraction(5) } },
            { id: 15, difficulty: 'medium', question: say('Hipotenusa 13 da eta kateto bat 5. Zenbat da bestea?', 'La hipotenusa mide 13 y un cateto 5. ¿Cuánto mide el otro?', 'الوتر 13 وأحد الضلعين 5. كم الآخر؟'), solution: same('$\\sqrt{169-25}=\\sqrt{144}=12$'), answer: { expected: fraction(12) } },
            { id: 16, difficulty: 'medium', question: say('Karratu baten aldea 6 cm da. Zenbat da diagonala gutxi gorabehera?', 'El lado de un cuadrado mide 6 cm. ¿Cuánto mide aproximadamente su diagonal?', 'ضلع مربع 6 سم. كم طول قطره تقريبًا؟'), solution: same('$\\sqrt{36+36}=\\sqrt{72}\\approx 8{,}49$') },
            { id: 17, difficulty: 'medium', question: say('Telebista baten pantailak 40 cm eta 30 cm ditu. Zenbat da diagonala?', 'La pantalla de un televisor mide 40 cm por 30 cm. ¿Cuánto mide su diagonal?', 'شاشة تلفاز 40 سم × 30 سم. كم طول قطرها؟'), solution: same('$\\sqrt{1\\,600+900}=\\sqrt{2\\,500}=50$'), answer: { expected: fraction(50) } },
            { id: 18, difficulty: 'hard', question: say('Triangelu isoszele baten alde berdinak 10 cm dira eta oinarria 12 cm. Zenbat da altuera?', 'Los lados iguales de un triángulo isósceles miden 10 cm y la base 12 cm. ¿Cuánto mide la altura?', 'الضلعان المتساويان في مثلث متساوي الساقين 10 سم والقاعدة 12 سم. كم الارتفاع؟'), solution: say('Altuerak oinarria erdibitzen du: $\\sqrt{100-36}=8$.', 'La altura parte la base por la mitad: $\\sqrt{100-36}=8$.', 'الارتفاع ينصّف القاعدة: $\\sqrt{100-36}=8$.'), answer: { expected: fraction(8) } }
        ]
    },
    {
        id: 'perimeters',
        title: say('Unitateak eta perimetroak', 'Unidades y perímetros', 'الوحدات والمحيطات'),
        items: [
            { id: 19, difficulty: 'easy', question: say('Pasatu: a) 3 km m-tara; b) 250 cm m-tara; c) 45 mm cm-tara.', 'Pasa: a) 3 km a m; b) 250 cm a m; c) 45 mm a cm.', 'حوّل: أ) 3 كم إلى م؛ ب) 250 سم إلى م؛ ج) 45 مم إلى سم.'), solution: same('a) $3\\,000$; b) $2{,}5$; c) $4{,}5$') },
            { id: 20, difficulty: 'easy', question: say('Kalkulatu 9, 5, 5,4 eta 5,4 cm-ko aldeak dituen trapezioaren perimetroa.', 'Calcula el perímetro de un trapecio de lados 9, 5, 5,4 y 5,4 cm.', 'احسب محيط شبه منحرف أضلاعه 9 و5 و5.4 و5.4 سم.'), solution: same('$9+5+5{,}4+5{,}4=24{,}8$'), answer: { expected: fraction(248, 10) } },
            { id: 21, difficulty: 'medium', question: say('Pasatu: a) 2 m² dm²-tara; b) 500 cm² dm²-tara.', 'Pasa: a) 2 m² a dm²; b) 500 cm² a dm².', 'حوّل: أ) 2 م² إلى دسم²؛ ب) 500 سم² إلى دسم².'), solution: same('a) $200$; b) $5$') },
            { id: 22, difficulty: 'medium', question: say('Pentagono erregular baten perimetroa 45 cm da. Zenbat da aldea?', 'El perímetro de un pentágono regular es 45 cm. ¿Cuánto mide el lado?', 'محيط مخمس منتظم 45 سم. كم طول ضلعه؟'), solution: same('$45\\mathbin{:}5=9$'), answer: { expected: fraction(9) } },
            { id: 23, difficulty: 'medium', question: say('Kalkulatu 3 cm-ko erradioa duen zirkunferentziaren luzera (π ≈ 3,14).', 'Calcula la longitud de una circunferencia de 3 cm de radio (π ≈ 3,14).', 'احسب طول دائرة نصف قطرها 3 سم (π ≈ 3.14).'), solution: same('$2\\cdot 3{,}14\\cdot 3=18{,}84$'), answer: { expected: fraction(1884, 100) } },
            { id: 24, difficulty: 'hard', question: say('Zirkunferentzia baten luzera 62,8 cm da. Zenbat da erradioa (π ≈ 3,14)?', 'Una circunferencia mide 62,8 cm. ¿Cuánto mide el radio (π ≈ 3,14)?', 'طول دائرة 62.8 سم. كم نصف قطرها (π ≈ 3.14)؟'), solution: same('$62{,}8\\mathbin{:}(2\\cdot 3{,}14)=10$'), answer: { expected: fraction(10) } }
        ]
    },
    {
        id: 'areas',
        title: say('Azalerak', 'Áreas', 'المساحات'),
        items: [
            { id: 25, difficulty: 'easy', question: say('Kalkulatu 7 cm-ko aldea duen karratuaren azalera.', 'Calcula el área de un cuadrado de 7 cm de lado.', 'احسب مساحة مربع ضلعه 7 سم.'), solution: same('$7^{2}=49$'), answer: { expected: fraction(49) } },
            { id: 26, difficulty: 'easy', question: say('Kalkulatu 12 cm-ko oinarria eta 5 cm-ko altuera dituen paralelogramoaren azalera.', 'Calcula el área de un paralelogramo de 12 cm de base y 5 cm de altura.', 'احسب مساحة متوازي أضلاع قاعدته 12 سم وارتفاعه 5 سم.'), solution: same('$12\\cdot 5=60$'), answer: { expected: fraction(60) } },
            { id: 27, difficulty: 'medium', question: say('Kalkulatu 14 cm-ko oinarria eta 9 cm-ko altuera dituen triangeluaren azalera.', 'Calcula el área de un triángulo de 14 cm de base y 9 cm de altura.', 'احسب مساحة مثلث قاعدته 14 سم وارتفاعه 9 سم.'), solution: same('$\\frac{14\\cdot 9}{2}=63$'), answer: { expected: fraction(63) } },
            { id: 28, difficulty: 'medium', question: say('Hexagono erregular baten aldea 4 cm da eta apotema 3,5 cm. Kalkulatu azalera.', 'Un hexágono regular tiene 4 cm de lado y 3,5 cm de apotema. Calcula su área.', 'مسدس منتظم ضلعه 4 سم وعامده 3.5 سم. احسب مساحته.'), solution: same('$P=24$, $\\frac{24\\cdot 3{,}5}{2}=42$'), answer: { expected: fraction(42) } },
            { id: 29, difficulty: 'medium', question: say('Kalkulatu 5 cm-ko erradioa duen zirkuluaren azalera (π ≈ 3,14).', 'Calcula el área de un círculo de 5 cm de radio (π ≈ 3,14).', 'احسب مساحة قرص نصف قطره 5 سم (π ≈ 3.14).'), solution: same('$3{,}14\\cdot 5^{2}=78{,}5$'), answer: { expected: fraction(785, 10) } },
            { id: 30, difficulty: 'hard', question: say('Lorategi laukizuzen bat 12 m × 8 m-koa da, eta erdian 2 m-ko erradioa duen iturri biribil bat dago. Zenbat m² dira belarra (π ≈ 3,14)?', 'Un jardín rectangular mide 12 m × 8 m y en el centro hay una fuente circular de 2 m de radio. ¿Cuántos m² son de césped (π ≈ 3,14)?', 'حديقة مستطيلة 12 م × 8 م وفي وسطها نافورة دائرية نصف قطرها 2 م. كم مترًا مربعًا من العشب (π ≈ 3.14)؟'), solution: same('$12\\cdot 8-3{,}14\\cdot 2^{2}=96-12{,}56=83{,}44$'), answer: { expected: fraction(8344, 100) } }
        ]
    }
]

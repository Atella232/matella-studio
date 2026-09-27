import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki naturalak · 1. DBH — diagnostic, guided practice, exercise bank
   and challenges. Exercises and problems come from Santillana 1.º ESO
   (unit 1, curricular adaptation), Anaya 1.º ESO (unit 1) and the Basque
   class guide (number line, rounding, semaforoa, D-P-E, Ane and Iker's
   mistakes). Large numbers are written with a point, as in class.
   ========================================================================== */

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value })
const calculate = (latex: string): LocalizedText => say(`Kalkulatu: ${latex}`, `Calcula: ${latex}`, `احسب: ${latex}`)
const calculateBoth = (first: string, second: string): LocalizedText => say(`Kalkulatu: ${first} eta ${second}`, `Calcula: ${first} y ${second}`, `احسب: ${first} و${second}`)

export const naturalsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 901,
        prompt: say('Zenbat balio du 4 zifrak 342.918 zenbakian?', '¿Cuánto vale la cifra 4 en 342.918?', 'كم قيمة الرقم 4 في العدد 342.918؟'),
        options: [same('$4.000$'), same('$40.000$'), same('$400$')],
        correctIndex: 1,
        explanation: say('4 hamar milakoen posizioan dago: $4\\cdot 10.000=40.000$.', 'El 4 está en las decenas de millar: $4\\cdot 10.000=40.000$.', 'الرقم 4 في مرتبة عشرات الآلاف: $4\\cdot 10.000=40.000$.'),
        topic: 'place-value'
    },
    {
        id: 902,
        prompt: say('Nola idazten da «bi milioi hogeita hamar mila eta bost»?', '¿Cómo se escribe «dos millones treinta mil cinco»?', 'كيف يُكتب «مليونان وثلاثون ألفًا وخمسة»؟'),
        options: [same('$2.030.005$'), same('$2.300.005$'), same('$2.030.500$')],
        correctIndex: 0,
        explanation: say('Hiruko taldeak: $2$ milioi, $030$ mila, $005$ unitate → $2.030.005$.', 'Grupos de tres: $2$ millones, $030$ mil, $005$ unidades → $2.030.005$.', 'مجموعات من ثلاثة: $2$ مليون، $030$ ألف، $005$ آحاد ← $2.030.005$.'),
        topic: 'big-numbers'
    },
    {
        id: 903,
        prompt: say('Biribildu 26.421 milakoetara.', 'Redondea 26.421 a los millares.', 'قرّب 26.421 إلى الآلاف.'),
        options: [same('$26.000$'), same('$26.400$'), same('$27.000$')],
        correctIndex: 0,
        explanation: say('Milakoen eskuineko zifra 4 da (5 baino txikiagoa): milakoa ez da aldatzen → $26.000$.', 'La cifra a la derecha de los millares es 4 (menor que 5): el millar no cambia → $26.000$.', 'الرقم الذي على يمين الآلاف هو 4 (أصغر من 5): لا تتغير الآلاف ← $26.000$.'),
        topic: 'rounding'
    },
    {
        id: 904,
        prompt: say('Zein zenbaki da XLIV?', '¿Qué número es XLIV?', 'ما العدد XLIV؟'),
        options: [same('$64$'), same('$44$'), same('$46$')],
        correctIndex: 1,
        explanation: say('$\\mathrm{XL}=50-10=40$ eta $\\mathrm{IV}=5-1=4$: $44$.', '$\\mathrm{XL}=50-10=40$ y $\\mathrm{IV}=5-1=4$: $44$.', '$\\mathrm{XL}=50-10=40$ و$\\mathrm{IV}=5-1=4$: $44$.'),
        topic: 'roman'
    },
    {
        id: 905,
        prompt: say('Zein propietate erabiltzen da hemen? $6\\cdot (8+2)=6\\cdot 8+6\\cdot 2$', '¿Qué propiedad se usa aquí? $6\\cdot (8+2)=6\\cdot 8+6\\cdot 2$', 'ما الخاصية المستعملة هنا؟ $6\\cdot (8+2)=6\\cdot 8+6\\cdot 2$'),
        options: [say('Trukatze-propietatea', 'Conmutativa', 'التبديل'), say('Elkartze-propietatea', 'Asociativa', 'التجميع'), say('Banatze-propietatea', 'Distributiva', 'التوزيع')],
        correctIndex: 2,
        explanation: say('6 batura bateko batugai bakoitzarekin biderkatzen da: banatze-propietatea.', 'El 6 multiplica a cada sumando de la suma: propiedad distributiva.', 'العدد 6 يُضرب في كل حد من المجموع: خاصية التوزيع.'),
        topic: 'multiply'
    },
    {
        id: 906,
        prompt: say('Zatiketa batean zatitzailea 7 da, zatidura 12 eta hondarra 3. Zein da zatikizuna?', 'En una división el divisor es 7, el cociente 12 y el resto 3. ¿Cuál es el dividendo?', 'في قسمة، المقسوم عليه 7 وخارج القسمة 12 والباقي 3. ما المقسوم؟'),
        options: [same('$87$'), same('$84$'), same('$22$')],
        correctIndex: 0,
        explanation: say('$7\\cdot 12+3=84+3=87$. 84 izango litzateke hondarrik gabe.', '$7\\cdot 12+3=84+3=87$. 84 sería sin el resto.', '$7\\cdot 12+3=84+3=87$. والعدد 84 يكون دون الباقي.'),
        topic: 'divide'
    },
    {
        id: 907,
        prompt: say('Zenbat da $6\\cdot 5-10+36\\mathbin{:}9$?', '¿Cuánto es $6\\cdot 5-10+36\\mathbin{:}9$?', 'كم يساوي $6\\cdot 5-10+36\\mathbin{:}9$؟'),
        options: [same('$24$'), same('$14$'), same('$20$')],
        correctIndex: 0,
        explanation: say('Horia lehenik: $30-10+4$. Gero berdea, ezkerretik: $20+4=24$.', 'Primero el amarillo: $30-10+4$. Luego el verde, de izquierda a derecha: $20+4=24$.', 'الأصفر أولًا: $30-10+4$. ثم الأخضر من اليسار: $20+4=24$.'),
        topic: 'hierarchy'
    },
    {
        id: 908,
        prompt: say('Zenbat da $2^5$?', '¿Cuánto es $2^5$?', 'كم يساوي $2^5$؟'),
        options: [same('$10$'), same('$32$'), same('$25$')],
        correctIndex: 1,
        explanation: say('$2^5=2\\cdot 2\\cdot 2\\cdot 2\\cdot 2=32$. Ez da $2\\cdot 5=10$.', '$2^5=2\\cdot 2\\cdot 2\\cdot 2\\cdot 2=32$. No es $2\\cdot 5=10$.', '$2^5=2\\cdot 2\\cdot 2\\cdot 2\\cdot 2=32$. وليس $2\\cdot 5=10$.'),
        topic: 'powers'
    }
]

export const naturalsPractice: PracticeItem[] = [
    {
        id: 1,
        stage: 'numbering',
        prompt: say('Idatzi zifraz: hiru milioi laurehun eta bost mila ehun eta hogei.', 'Escribe con cifras: tres millones cuatrocientos cinco mil ciento veinte.', 'اكتب بالأرقام: ثلاثة ملايين وأربعمائة وخمسة آلاف ومئة وعشرون.'),
        expected: fraction(3405120),
        hint: say('Idatzi hiruko taldeka: milioiak, milakoak, unitateak.', 'Escribe por grupos de tres: millones, millares, unidades.', 'اكتب بمجموعات من ثلاثة: الملايين، الآلاف، الآحاد.'),
        explanation: say('$3$ milioi, $405$ mila eta $120$: $3.405.120$.', '$3$ millones, $405$ mil y $120$: $3.405.120$.', '$3$ ملايين و$405$ ألفًا و$120$: $3.405.120$.')
    },
    {
        id: 2,
        stage: 'numbering',
        prompt: say('Zenbat balio du 7 zifrak 87.003 zenbakian?', '¿Cuánto vale la cifra 7 en 87.003?', 'كم قيمة الرقم 7 في العدد 87.003؟'),
        expected: fraction(7000),
        hint: say('Zein posiziotan dago 7: unitateak, hamarrekoak, ehunekoak, milakoak…?', '¿En qué posición está el 7: unidades, decenas, centenas, millares…?', 'في أي مرتبة يقع 7: آحاد، عشرات، مئات، آلاف…؟'),
        explanation: say('7 milakoen posizioan dago: $7\\cdot 1.000=7.000$.', 'El 7 está en las unidades de millar: $7\\cdot 1.000=7.000$.', 'الرقم 7 في مرتبة الآلاف: $7\\cdot 1.000=7.000$.')
    },
    {
        id: 3,
        stage: 'numbering',
        prompt: say('Zuzen zenbakidun batean 5.000tik 6.000ra bitarteko tartea lau zati berdinetan banatuta dago. Zein zenbaki dago lehen markan?', 'En una recta numérica, el tramo de 5.000 a 6.000 está dividido en cuatro partes iguales. ¿Qué número hay en la primera marca?', 'على مستقيم الأعداد، قُسم المقطع من 5.000 إلى 6.000 إلى أربعة أجزاء متساوية. ما العدد عند العلامة الأولى؟'),
        expected: fraction(5250),
        hint: say('Kalkulatu distantzia eta zatitu 4ren artean.', 'Calcula la distancia y divídela entre 4.', 'احسب المسافة واقسمها على 4.'),
        explanation: say('$(6.000-5.000)\\mathbin{:}4=250$. Lehen marka: $5.000+250=5.250$.', '$(6.000-5.000)\\mathbin{:}4=250$. Primera marca: $5.000+250=5.250$.', '$(6.000-5.000)\\mathbin{:}4=250$. العلامة الأولى: $5.000+250=5.250$.')
    },
    {
        id: 4,
        stage: 'numbering',
        prompt: say('Idatzi gure sisteman: CDXXV', 'Escribe en nuestro sistema: CDXXV', 'اكتب بنظامنا: CDXXV'),
        expected: fraction(425),
        hint: say('CD = 500 − 100. Gero batu XX eta V.', 'CD = 500 − 100. Luego suma XX y V.', 'CD = 500 − 100. ثم أضف XX وV.'),
        explanation: say('$\\mathrm{CD}=400$, $\\mathrm{XX}=20$, $\\mathrm{V}=5$: $425$.', '$\\mathrm{CD}=400$, $\\mathrm{XX}=20$, $\\mathrm{V}=5$: $425$.', '$\\mathrm{CD}=400$، $\\mathrm{XX}=20$، $\\mathrm{V}=5$: $425$.')
    },
    {
        id: 5,
        stage: 'rounding',
        prompt: say('Biribildu 24.963 milakoetara.', 'Redondea 24.963 a los millares.', 'قرّب 24.963 إلى الآلاف.'),
        expected: fraction(25000),
        hint: say('Begiratu milakoaren (4) eskuineko zifrari.', 'Mira la cifra a la derecha del millar (el 4).', 'انظر إلى الرقم الذي على يمين الآلاف (4).'),
        explanation: say('Eskuinean 9 dago (5 edo gehiago): $4+1=5$ → $25.000$.', 'A la derecha hay un 9 (5 o más): $4+1=5$ → $25.000$.', 'على اليمين 9 (5 أو أكثر): $4+1=5$ ← $25.000$.')
    },
    {
        id: 6,
        stage: 'rounding',
        prompt: say('Biribildu 36.905.000 milioietara.', 'Redondea 36.905.000 a los millones.', 'قرّب 36.905.000 إلى الملايين.'),
        expected: fraction(37000000),
        hint: say('Milioien zifra 6 da; begiratu haren eskuinekoari.', 'La cifra de los millones es 6; mira la de su derecha.', 'رقم الملايين هو 6؛ انظر إلى الرقم الذي على يمينه.'),
        explanation: say('Eskuinean 9 dago: $36+1=37$ milioi → $37.000.000$.', 'A la derecha hay un 9: $36+1=37$ millones → $37.000.000$.', 'على اليمين 9: $36+1=37$ مليونًا ← $37.000.000$.')
    },
    {
        id: 7,
        stage: 'rounding',
        prompt: say('Biribildu 359.481 hamar milakoetara.', 'Redondea 359.481 a las decenas de millar.', 'قرّب 359.481 إلى عشرات الآلاف.'),
        expected: fraction(360000),
        hint: say('Hamar milakoen zifra 5 da; eskuinean 9 dago.', 'La cifra de las decenas de millar es 5; a su derecha hay un 9.', 'رقم عشرات الآلاف هو 5؛ وعلى يمينه 9.'),
        explanation: say('$35$ hamar milako → $36$: $360.000$.', '$35$ decenas de millar → $36$: $360.000$.', '$35$ عشرة آلاف ← $36$: $360.000$.')
    },
    {
        id: 8,
        stage: 'operations',
        prompt: calculate('$6.070+893+527$'),
        expected: fraction(7490),
        hint: say('Batu zutabeka, unitateak unitateen azpian.', 'Suma en columna, unidades bajo unidades.', 'اجمع عموديًا، الآحاد تحت الآحاد.'),
        explanation: same('$6.070+893=6.963 \\qquad 6.963+527=7.490$')
    },
    {
        id: 9,
        stage: 'operations',
        prompt: say('Osatu: $628-\\square=199$', 'Completa: $628-\\square=199$', 'أكمل: $628-\\square=199$'),
        expected: fraction(429),
        hint: say('Kentzailea = kenkizuna − kendura.', 'Sustraendo = minuendo − diferencia.', 'المطروح = المطروح منه − الفرق.'),
        explanation: say('$628-199=429$. Proba: $429+199=628$.', '$628-199=429$. Prueba: $429+199=628$.', '$628-199=429$. التحقق: $429+199=628$.')
    },
    {
        id: 10,
        stage: 'operations',
        prompt: say('Kalkulatu buruz: $25\\cdot 9$', 'Calcula mentalmente: $25\\cdot 9$', 'احسب ذهنيًا: $25\\cdot 9$'),
        expected: fraction(225),
        hint: say('9z biderkatzea = 10ez biderkatu eta zenbakia kendu.', 'Por 9 = por 10 y restar el número.', 'الضرب في 9 = الضرب في 10 ثم طرح العدد.'),
        explanation: same('$25\\cdot 9=250-25=225$')
    },
    {
        id: 11,
        stage: 'operations',
        prompt: say('Zein da $1.345\\mathbin{:}29$ zatiketaren hondarra?', '¿Cuál es el resto de $1.345\\mathbin{:}29$?', 'ما باقي القسمة $1.345\\mathbin{:}29$؟'),
        expected: fraction(11),
        hint: say('Zatidura 46 da. Kalkulatu $29\\cdot 46$.', 'El cociente es 46. Calcula $29\\cdot 46$.', 'خارج القسمة 46. احسب $29\\cdot 46$.'),
        explanation: say('$29\\cdot 46=1.334$ eta $1.345-1.334=11$. $11<29$ ✓', '$29\\cdot 46=1.334$ y $1.345-1.334=11$. $11<29$ ✓', '$29\\cdot 46=1.334$ و$1.345-1.334=11$. $11<29$ ✓')
    },
    {
        id: 12,
        stage: 'operations',
        prompt: say('Zatiketa batean zatitzailea 38 da, zatidura 26 eta hondarra 12. Zein da zatikizuna?', 'En una división el divisor es 38, el cociente 26 y el resto 12. ¿Cuál es el dividendo?', 'في قسمة، المقسوم عليه 38 وخارج القسمة 26 والباقي 12. ما المقسوم؟'),
        expected: fraction(1000),
        hint: say('Zatikizuna = zatitzailea · zatidura + hondarra.', 'D = d · c + r.', 'المقسوم = المقسوم عليه × خارج القسمة + الباقي.'),
        explanation: same('$38\\cdot 26+12=988+12=1.000$')
    },
    {
        id: 13,
        stage: 'combined',
        prompt: calculate('$75\\mathbin{:}3+4\\cdot 6-45\\mathbin{:}9$'),
        expected: fraction(44),
        hint: say('Horia lehenik: hiru eragiketa horiak egin, gero batu eta kendu.', 'Primero el amarillo: haz las tres operaciones amarillas y luego suma y resta.', 'الأصفر أولًا: أجرِ العمليات الصفراء الثلاث ثم اجمع واطرح.'),
        explanation: same('$25+24-5=49-5=44$')
    },
    {
        id: 14,
        stage: 'combined',
        prompt: calculate('$19-5\\cdot (10-7)+4\\cdot 7$'),
        expected: fraction(32),
        hint: say('Gorria: parentesia. Gero horia: bi biderketak.', 'Rojo: el paréntesis. Luego amarillo: las dos multiplicaciones.', 'الأحمر: القوس. ثم الأصفر: عمليتا الضرب.'),
        explanation: same('$19-5\\cdot 3+28=19-15+28=4+28=32$')
    },
    {
        id: 15,
        stage: 'combined',
        prompt: calculate('$10\\cdot [7\\cdot 5-(4+6\\cdot 3)]$'),
        expected: fraction(130),
        hint: say('Barrutik kanpora: lehenik parentesia (biderketa barruan lehenik), gero kako zuzenak.', 'De dentro hacia fuera: primero el paréntesis (dentro, la multiplicación primero), luego el corchete.', 'من الداخل إلى الخارج: القوس أولًا (وداخله الضرب أولًا)، ثم القوس المعقوف.'),
        explanation: same('$10\\cdot [35-(4+18)]=10\\cdot [35-22]=10\\cdot 13=130$')
    },
    {
        id: 16,
        stage: 'combined',
        prompt: say('Kafetegi batean 15 mahai, 55 aulki eta 12 aulki altu daude. Mahaiek eta aulkiek 4 hanka dituzte, eta aulki altuek 3. Zenbat hanka daude guztira?', 'En una cafetería hay 15 mesas, 55 sillas y 12 taburetes. Las mesas y las sillas tienen 4 patas, y los taburetes, 3. ¿Cuántas patas hay en total?', 'في مقهى 15 طاولة و55 كرسيًا و12 مقعدًا عاليًا. للطاولات والكراسي 4 أرجل، وللمقاعد العالية 3. كم رجلًا في المجموع؟'),
        expected: fraction(316),
        hint: say('Idatzi eragiketa bakar bat: $(15+55)\\cdot 4+12\\cdot 3$.', 'Escribe una sola operación: $(15+55)\\cdot 4+12\\cdot 3$.', 'اكتب عملية واحدة: $(15+55)\\cdot 4+12\\cdot 3$.'),
        explanation: say('$(15+55)\\cdot 4+12\\cdot 3=280+36=316$. Erantzuna: 316 hanka daude.', '$(15+55)\\cdot 4+12\\cdot 3=280+36=316$. Respuesta: hay 316 patas.', '$(15+55)\\cdot 4+12\\cdot 3=280+36=316$. الجواب: توجد 316 رجلًا.')
    },
    {
        id: 17,
        stage: 'powers',
        prompt: calculate('$4^3$'),
        expected: fraction(64),
        hint: say('4 hiru aldiz biderkatu, ez $4\\cdot 3$.', 'Multiplica el 4 tres veces, no $4\\cdot 3$.', 'اضرب 4 ثلاث مرات، وليس $4\\cdot 3$.'),
        explanation: same('$4^3=4\\cdot 4\\cdot 4=16\\cdot 4=64$')
    },
    {
        id: 18,
        stage: 'powers',
        prompt: calculate('$10^5$'),
        expected: fraction(100000),
        hint: say('1 eta berretzaileak adina zero.', 'Un 1 y tantos ceros como indica el exponente.', '1 وعدد من الأصفار يساوي الأس.'),
        explanation: same('$10^5=100.000$')
    },
    {
        id: 19,
        stage: 'powers',
        prompt: say('Idatzi $2^3\\cdot 2^2$ 2 oinarriko berretura bakar gisa. Zein da berretzailea?', 'Escribe $2^3\\cdot 2^2$ como una sola potencia de base 2. ¿Cuál es el exponente?', 'اكتب $2^3\\cdot 2^2$ قوةً واحدة أساسها 2. ما الأس؟'),
        expected: fraction(5),
        hint: say('Oinarri bera: berretzaileak batu.', 'Misma base: se suman los exponentes.', 'الأساس نفسه: نجمع الأسس.'),
        explanation: same('$2^3\\cdot 2^2=2^{3+2}=2^5=32$')
    }
]

export const naturalsChallenges: ChallengeItem[] = [
    {
        id: 101,
        stage: 'operations',
        context: 'starter',
        points: 10,
        prompt: say('Kiosko batek 1.300 egunkari ditu. Goizean 745 saldu ditu eta arratsaldean 350. Zenbat egunkari geratzen dira?', 'Un kiosco tiene 1.300 periódicos. Por la mañana vende 745 y por la tarde 350. ¿Cuántos periódicos quedan?', 'لدى كشك 1.300 جريدة. باع صباحًا 745 ومساءً 350. كم جريدة بقيت؟'),
        expected: fraction(205),
        hint: say('Eragiketa bakarra: $1.300-(745+350)$.', 'Una sola operación: $1.300-(745+350)$.', 'عملية واحدة: $1.300-(745+350)$.'),
        explanation: say('$1.300-(745+350)=1.300-1.095=205$ egunkari.', '$1.300-(745+350)=1.300-1.095=205$ periódicos.', '$1.300-(745+350)=1.300-1.095=205$ جريدة.')
    },
    {
        id: 102,
        stage: 'operations',
        context: 'starter',
        points: 10,
        prompt: say('54 turista 4 lekuko taxietan joan behar dira aireportura. Zenbat taxi behar dira?', '54 turistas tienen que ir al aeropuerto en taxis de 4 plazas. ¿Cuántos taxis necesitan?', 'يجب أن يذهب 54 سائحًا إلى المطار في سيارات أجرة من 4 مقاعد. كم سيارة يحتاجون؟'),
        expected: fraction(14),
        hint: say('Zatitu, eta pentsatu zer egin hondarrarekin.', 'Divide y piensa qué hacer con el resto.', 'اقسم وفكّر ماذا تفعل بالباقي.'),
        explanation: say('$54=4\\cdot 13+2$: 13 taxi beteta eta 2 turista geratzen dira, beraz beste taxi bat: 14.', '$54=4\\cdot 13+2$: 13 taxis llenos y sobran 2 turistas, así que otro taxi más: 14.', '$54=4\\cdot 13+2$: 13 سيارة ممتلئة ويبقى سائحان، إذن سيارة أخرى: 14.')
    },
    {
        id: 103,
        stage: 'powers',
        context: 'starter',
        points: 10,
        prompt: say('Gimnasioan 4 kutxa daude; kutxa bakoitzean 4 sare, eta sare bakoitzean 4 pilota. Zenbat pilota daude?', 'En el gimnasio hay 4 cajas; en cada caja, 4 redes, y en cada red, 4 pelotas. ¿Cuántas pelotas hay?', 'في القاعة الرياضية 4 صناديق؛ في كل صندوق 4 شبكات، وفي كل شبكة 4 كرات. كم كرة هناك؟'),
        expected: fraction(64),
        hint: say('Biderkagai berdinak → berretura.', 'Factores iguales → potencia.', 'عوامل متساوية ← قوة.'),
        explanation: say('$4\\cdot 4\\cdot 4=4^3=64$ pilota.', '$4\\cdot 4\\cdot 4=4^3=64$ pelotas.', '$4\\cdot 4\\cdot 4=4^3=64$ كرة.')
    },
    {
        id: 104,
        stage: 'combined',
        context: 'advanced',
        points: 20,
        prompt: say('Nekazari batek 200 mertxika-arbola ditu. Arbola bakoitzarekin 5 kiloko 7 kutxa betetzen ditu, eta kiloa 2 € saltzen du. Zenbat euro jasoko ditu?', 'Un agricultor tiene 200 melocotoneros. Con cada árbol llena 7 cajas de 5 kilos, y vende el kilo a 2 €. ¿Cuántos euros obtendrá?', 'لدى مزارع 200 شجرة خوخ. يملأ من كل شجرة 7 صناديق من 5 كيلوغرامات، ويبيع الكيلوغرام بـ 2 €. كم يورو سيحصل؟'),
        expected: fraction(14000),
        hint: say('Kiloak lehenik: arbolak · kutxak · kiloak.', 'Primero los kilos: árboles · cajas · kilos.', 'الكيلوغرامات أولًا: الأشجار · الصناديق · الكيلوغرامات.'),
        explanation: say('$200\\cdot 7\\cdot 5\\cdot 2=14.000$ €.', '$200\\cdot 7\\cdot 5\\cdot 2=14.000$ €.', '$200\\cdot 7\\cdot 5\\cdot 2=14.000$ €.')
    },
    {
        id: 105,
        stage: 'operations',
        context: 'advanced',
        points: 20,
        prompt: say('Baserritar batek 1.274 arrautza bildu ditu eta 30eko erretiluetan sartzen ditu. Zenbat arrautza geratzen dira erretilu bat osatu gabe?', 'Un granjero recoge 1.274 huevos y los envasa en bandejas de 30. ¿Cuántos huevos quedan sin completar una bandeja?', 'جمع مزارع 1.274 بيضة ويعبّئها في صوانٍ من 30. كم بيضة تبقى دون إكمال صينية؟'),
        expected: fraction(14),
        hint: say('Erantzuna zatiketaren hondarra da.', 'La respuesta es el resto de la división.', 'الجواب هو باقي القسمة.'),
        explanation: say('$1.274=30\\cdot 42+14$: 42 erretilu beteta eta 14 arrautza soberan.', '$1.274=30\\cdot 42+14$: 42 bandejas llenas y sobran 14 huevos.', '$1.274=30\\cdot 42+14$: ‏42 صينية ممتلئة وتبقى 14 بيضة.')
    },
    {
        id: 106,
        stage: 'operations',
        context: 'advanced',
        points: 20,
        prompt: say('Auto-fabrika batek 15.660 auto egin ditu 90 egunetan. Batez beste, zenbat auto egiten ditu egunean?', 'Una fábrica de coches ha producido 15.660 coches en 90 días. ¿Cuántos coches fabrica de media cada día?', 'أنتج مصنع سيارات 15.660 سيارة في 90 يومًا. كم سيارة ينتج في اليوم في المتوسط؟'),
        expected: fraction(174),
        hint: say('Banatu autoak egunen artean.', 'Reparte los coches entre los días.', 'وزّع السيارات على الأيام.'),
        explanation: say('$15.660\\mathbin{:}90=174$ auto egunean. Proba: $90\\cdot 174=15.660$.', '$15.660\\mathbin{:}90=174$ coches al día. Prueba: $90\\cdot 174=15.660$.', '$15.660\\mathbin{:}90=174$ سيارة يوميًا. التحقق: $90\\cdot 174=15.660$.')
    },
    {
        id: 107,
        stage: 'numbering',
        context: 'advanced',
        points: 20,
        prompt: say('Auto batek 9900-JMA matrikula du. Haren ondoren, zenbat auto matrikulatu ziren JMA letra berberekin?', 'Un coche tiene la matrícula 9900-JMA. Después de él, ¿cuántos coches se matricularon con las mismas letras JMA?', 'سيارة لوحتها 9900-JMA. بعدها، كم سيارة سُجّلت بالحروف نفسها JMA؟'),
        expected: fraction(99),
        hint: say('Zenbakiak 9901etik 9999ra doaz.', 'Los números van de 9901 a 9999.', 'الأرقام من 9901 إلى 9999.'),
        explanation: say('9901etik 9999ra: $9.999-9.900=99$ auto.', 'De 9901 a 9999: $9.999-9.900=99$ coches.', 'من 9901 إلى 9999: $9.999-9.900=99$ سيارة.')
    },
    {
        id: 108,
        stage: 'combined',
        context: 'advanced',
        points: 20,
        prompt: say('Klasean 1 puntu ematen du eragiketa sinple bakoitzak, 2 puntu eragiketa konbinatu bakoitzak eta 3 puntu buruketa bakoitzak. Luisak 5 sinple, 4 konbinatu eta 6 buruketa egin ditu. Zenbat puntu ditu?', 'En clase, cada ejercicio de operaciones simples da 1 punto, cada operación combinada 2 puntos y cada problema 3 puntos. Luisa ha hecho 5 simples, 4 combinadas y 6 problemas. ¿Cuántos puntos tiene?', 'في القسم، كل تمرين عمليات بسيطة يعطي نقطة، وكل عملية مركبة نقطتين، وكل مسألة 3 نقاط. أنجزت لويسا 5 بسيطة و4 مركبة و6 مسائل. كم نقطة لديها؟'),
        expected: fraction(31),
        hint: say('Idatzi eragiketa bakar bat: $5\\cdot 1+4\\cdot 2+6\\cdot 3$.', 'Escribe una sola operación: $5\\cdot 1+4\\cdot 2+6\\cdot 3$.', 'اكتب عملية واحدة: $5\\cdot 1+4\\cdot 2+6\\cdot 3$.'),
        explanation: say('$5\\cdot 1+4\\cdot 2+6\\cdot 3=5+8+18=31$ puntu.', '$5\\cdot 1+4\\cdot 2+6\\cdot 3=5+8+18=31$ puntos.', '$5\\cdot 1+4\\cdot 2+6\\cdot 3=5+8+18=31$ نقطة.')
    },
    {
        id: 109,
        stage: 'combined',
        context: 'master',
        points: 30,
        prompt: say('Baserri batean zaldiak, behiak eta oiloak daude. Guztira 714 hanka, 168 adar eta 137 moko zenbatu ditugu. Zenbat zaldi daude?', 'En una granja hay caballos, vacas y gallinas. En total hemos contado 714 patas, 168 cuernos y 137 picos. ¿Cuántos caballos hay?', 'في مزرعة خيول وأبقار ودجاج. عددنا 714 رجلًا و168 قرنًا و137 منقارًا. كم حصانًا هناك؟'),
        expected: fraction(26),
        hint: say('Adarrek behiak ematen dituzte eta mokoek oiloak. Kendu haien hankak.', 'Los cuernos dan las vacas y los picos las gallinas. Quita sus patas.', 'القرون تعطي الأبقار والمناقير تعطي الدجاج. اطرح أرجلها.'),
        explanation: say('Behiak: $168\\mathbin{:}2=84$ ($84\\cdot 4=336$ hanka). Oiloak: 137 ($137\\cdot 2=274$ hanka). Zaldiak: $(714-336-274)\\mathbin{:}4=104\\mathbin{:}4=26$.', 'Vacas: $168\\mathbin{:}2=84$ ($84\\cdot 4=336$ patas). Gallinas: 137 ($137\\cdot 2=274$ patas). Caballos: $(714-336-274)\\mathbin{:}4=104\\mathbin{:}4=26$.', 'الأبقار: $168\\mathbin{:}2=84$ ($84\\cdot 4=336$ رجلًا). الدجاج: 137 ($137\\cdot 2=274$ رجلًا). الخيول: $(714-336-274)\\mathbin{:}4=104\\mathbin{:}4=26$.')
    },
    {
        id: 110,
        stage: 'combined',
        context: 'master',
        points: 30,
        prompt: say('Martinak honela batu ditu 1etik 7ra: $(1+7)\\cdot 7\\mathbin{:}2=28$. Erabili ideia bera: zenbat da $1+2+3+\\dots+100$?', 'Martina ha sumado del 1 al 7 así: $(1+7)\\cdot 7\\mathbin{:}2=28$. Usa la misma idea: ¿cuánto es $1+2+3+\\dots+100$?', 'جمعت مارتينا الأعداد من 1 إلى 7 هكذا: $(1+7)\\cdot 7\\mathbin{:}2=28$. استعمل الفكرة نفسها: كم يساوي $1+2+3+\\dots+100$؟'),
        expected: fraction(5050),
        hint: say('Lehena + azkena, bider zenbat zenbaki, zati 2.', 'Primero + último, por cuántos números hay, entre 2.', 'الأول + الأخير، في عدد الأعداد، على 2.'),
        explanation: say('$(1+100)\\cdot 100\\mathbin{:}2=10.100\\mathbin{:}2=5.050$.', '$(1+100)\\cdot 100\\mathbin{:}2=10.100\\mathbin{:}2=5.050$.', '$(1+100)\\cdot 100\\mathbin{:}2=10.100\\mathbin{:}2=5.050$.')
    },
    {
        id: 111,
        stage: 'combined',
        context: 'master',
        points: 30,
        prompt: say('Erlezain batek 187 erlauntz ditu eta urtean 2 uzta biltzen ditu, erlauntz bakoitzeko 9 kilo uzta bakoitzean. Eztia kilo erdiko potoetan sartzen du, eta 6 potoko kutxak 18 € saltzen ditu. Zenbat euro jasotzen ditu urtean?', 'Un apicultor tiene 187 colmenas y hace 2 cosechas al año, de 9 kilos por colmena en cada cosecha. Envasa la miel en tarros de medio kilo y vende cajas de 6 tarros a 18 €. ¿Cuántos euros ingresa al año?', 'لدى نحّال 187 خلية ويجني محصولين في السنة، 9 كيلوغرامات من كل خلية في كل محصول. يعبّئ العسل في مرطبانات من نصف كيلوغرام، ويبيع صناديق من 6 مرطبانات بـ 18 €. كم يورو يجني في السنة؟'),
        expected: fraction(20196),
        hint: say('Pausoz pauso: kiloak → potoak (bider 2) → kutxak (zati 6) → euroak.', 'Paso a paso: kilos → tarros (por 2) → cajas (entre 6) → euros.', 'خطوة بخطوة: الكيلوغرامات ← المرطبانات (× 2) ← الصناديق (÷ 6) ← اليوروهات.'),
        explanation: say('$187\\cdot 2\\cdot 9=3.366$ kg → $6.732$ poto → $6.732\\mathbin{:}6=1.122$ kutxa → $1.122\\cdot 18=20.196$ €.', '$187\\cdot 2\\cdot 9=3.366$ kg → $6.732$ tarros → $6.732\\mathbin{:}6=1.122$ cajas → $1.122\\cdot 18=20.196$ €.', '$187\\cdot 2\\cdot 9=3.366$ كغ ← $6.732$ مرطبانًا ← $6.732\\mathbin{:}6=1.122$ صندوقًا ← $1.122\\cdot 18=20.196$ €.')
    },
    {
        id: 112,
        stage: 'combined',
        context: 'master',
        points: 30,
        prompt: say('Kandidok 21 animalia saldu ditu 350 €-an: ahateak eta antzarak. Antzarak baino bi aldiz ahate gehiago zeuden, eta antzara batek ahate batek baino hiru aldiz gehiago balio du. Zenbat balio du ahate batek?', 'Cándido ha vendido 21 animales por 350 €: patos y gansos. Había el doble de patos que de gansos, y un ganso vale el triple que un pato. ¿Cuánto vale un pato?', 'باع كانديدو 21 حيوانًا بـ 350 €: بطًّا وإوزًّا. كان عدد البط ضعف عدد الإوز، والإوزة تساوي ثلاثة أضعاف البطة. كم ثمن البطة؟'),
        expected: fraction(10),
        hint: say('21 animalia 3 zatitan: antzara 1 bakoitzeko, 2 ahate. Eta antzara bat = 3 ahate.', '21 animales en grupos de 3: por cada ganso, 2 patos. Y un ganso = 3 patos.', '21 حيوانًا في مجموعات من 3: لكل إوزة بطتان. والإوزة = 3 بطات.'),
        explanation: say('$21\\mathbin{:}3=7$ antzara eta 14 ahate. 7 antzara = 21 ahate, beraz $21+14=35$ ahate balio du guztiak: $350\\mathbin{:}35=10$ €.', '$21\\mathbin{:}3=7$ gansos y 14 patos. 7 gansos = 21 patos, así que todo vale como $21+14=35$ patos: $350\\mathbin{:}35=10$ €.', '$21\\mathbin{:}3=7$ إوزات و14 بطة. 7 إوزات = 21 بطة، إذن الكل يساوي $21+14=35$ بطة: $350\\mathbin{:}35=10$ €.')
    }
]

export const naturalsExerciseBank: ExerciseSection[] = [
    {
        id: 'numbering',
        title: say('Sistema hamartarra', 'El sistema decimal', 'النظام العشري'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Idatzi nola irakurtzen diren: 15.728 eta 87.003.', 'Escribe cómo se leen: 15.728 y 87.003.', 'اكتب كيف يُقرأ: 15.728 و87.003.'), solution: say('Hamabost mila zazpiehun eta hogeita zortzi. Laurogeita zazpi mila eta hiru.', 'Quince mil setecientos veintiocho. Ochenta y siete mil tres.', 'خمسة عشر ألفًا وسبعمائة وثمانية وعشرون. سبعة وثمانون ألفًا وثلاثة.') },
            { id: 2, difficulty: 'easy', question: say('Idatzi 234.912 zenbakiaren deskonposizio polinomikoa.', 'Escribe la descomposición polinómica de 234.912.', 'اكتب تفكيك العدد 234.912.'), solution: same('$234.912=200.000+30.000+4.000+900+10+2$') },
            { id: 3, difficulty: 'medium', question: say('Ordenatu txikienetik handienera: 17.630, 7.478, 15.080, 51.498, 5.478, 7.500.', 'Ordena de menor a mayor: 17.630, 7.478, 15.080, 51.498, 5.478, 7.500.', 'رتّب من الأصغر إلى الأكبر: 17.630، 7.478، 15.080، 51.498، 5.478، 7.500.'), solution: same('$5.478<7.478<7.500<15.080<17.630<51.498$') },
            { id: 4, difficulty: 'medium', question: say('Idatzi erromatar zenbakiz: 87, 425 eta 2.600.', 'Escribe en números romanos: 87, 425 y 2.600.', 'اكتب بالأرقام الرومانية: 87 و425 و2.600.'), solution: same('$87=\\mathrm{LXXXVII} \\quad 425=\\mathrm{CDXXV} \\quad 2.600=\\mathrm{MMDC}$') },
            { id: 5, difficulty: 'medium', question: say('Idatzi zifraz: a) hamabost bilioi hirurehun eta berrogeita hamar mila milioi; b) bi mila eta zazpiehun milioi.', 'Escribe con cifras: a) quince billones trescientos cincuenta mil millones; b) dos mil setecientos millones.', 'اكتب بالأرقام: أ) خمسة عشر تريليونًا وثلاثمائة وخمسون مليارًا؛ ب) ألفان وسبعمائة مليون.'), solution: same('a) $15.350.000.000.000$; b) $2.700.000.000$') },
            { id: 6, difficulty: 'hard', question: say('Bost zifrako zenbaki baten zifrek 5 batzen dute. Unitateak eta milakoak trukatzen badira, 999 handitzen da. Zein da zenbakia?', 'Un número de cinco cifras tiene cifras que suman 5. Si intercambias las unidades con las unidades de millar, aumenta en 999. ¿Qué número es?', 'عدد من خمسة أرقام مجموع أرقامه 5. إذا بادلنا الآحاد بالآلاف يزيد بمقدار 999. ما العدد؟'), solution: say('$40.001$: trukatuta $41.000$ da, eta $41.000-40.001=999$.', '$40.001$: al intercambiar queda $41.000$, y $41.000-40.001=999$.', '$40.001$: بعد المبادلة يصبح $41.000$، و$41.000-40.001=999$.'), answer: { expected: fraction(40001) } }
        ]
    },
    {
        id: 'rounding',
        title: say('Biribiltzea eta estimazioa', 'Redondeo y estimación', 'التقريب والتقدير'),
        items: [
            { id: 7, difficulty: 'easy', question: say('Biribildu milakoetara: 24.963, 7.280, 40.274 eta 99.399.', 'Redondea a los millares: 24.963, 7.280, 40.274 y 99.399.', 'قرّب إلى الآلاف: 24.963 و7.280 و40.274 و99.399.'), solution: same('$25.000 \\quad 7.000 \\quad 40.000 \\quad 99.000$') },
            { id: 8, difficulty: 'easy', question: say('Biribildu 530.298 ehun milakoetara eta hamar milakoetara.', 'Redondea 530.298 a las centenas de millar y a las decenas de millar.', 'قرّب 530.298 إلى مئات الآلاف وإلى عشرات الآلاف.'), solution: same('$500.000 \\qquad 530.000$') },
            { id: 9, difficulty: 'medium', question: say('Estimatu $167+235+32$ hamarrekoetara biribilduta, eta konparatu emaitza zehatzarekin.', 'Estima $167+235+32$ redondeando a las decenas y compáralo con el resultado exacto.', 'قدّر $167+235+32$ بالتقريب إلى العشرات وقارنه بالنتيجة الدقيقة.'), solution: say('$170+240+30=440$. Zehatza: $434$. Oso gertu.', '$170+240+30=440$. Exacto: $434$. Muy cerca.', '$170+240+30=440$. الدقيق: $434$. قريب جدًا.') },
            { id: 10, difficulty: 'medium', question: say('Estimatu: $49\\cdot 21$ eta $398\\mathbin{:}4$.', 'Estima: $49\\cdot 21$ y $398\\mathbin{:}4$.', 'قدّر: $49\\cdot 21$ و$398\\mathbin{:}4$.'), solution: say('$50\\cdot 20=1.000$ (zehatza $1.029$). $400\\mathbin{:}4=100$ (zehatza 99, hondarra 2).', '$50\\cdot 20=1.000$ (exacto $1.029$). $400\\mathbin{:}4=100$ (exacto 99, resto 2).', '$50\\cdot 20=1.000$ (الدقيق $1.029$). $400\\mathbin{:}4=100$ (الدقيق 99 والباقي 2).') },
            { id: 11, difficulty: 'medium', question: say('Kairoko biztanleak 16.794.464 ziren 2013an. Zer esango zenuke zenbaki zehatza gogoratu gabe?', 'El Cairo tenía 16.794.464 habitantes en 2013. ¿Qué dirías si no recuerdas la cifra exacta?', 'كان عدد سكان القاهرة 16.794.464 نسمة سنة 2013. ماذا تقول إن لم تتذكر العدد الدقيق؟'), solution: say('17 milioi inguru (milioietara biribilduta).', 'Unos 17 millones (redondeo a los millones).', 'حوالي 17 مليونًا (تقريب إلى الملايين).') },
            { id: 12, difficulty: 'hard', question: say('Biribildu 299.352.362 ehun milakoetara eta hamar milakoetara.', 'Redondea 299.352.362 a las centenas de millar y a las decenas de millar.', 'قرّب 299.352.362 إلى مئات الآلاف وإلى عشرات الآلاف.'), solution: same('$299.400.000 \\qquad 299.350.000$') }
        ]
    },
    {
        id: 'operations',
        title: say('Oinarrizko eragiketak', 'Operaciones básicas', 'العمليات الأساسية'),
        items: [
            { id: 13, difficulty: 'easy', question: calculateBoth('$651+283-459$', '$831-392-76$'), solution: same('$934-459=475 \\qquad 439-76=363$') },
            { id: 14, difficulty: 'easy', question: calculateBoth('$134\\cdot 1.000$', '$85\\cdot 100$'), solution: same('$134.000 \\qquad 8.500$') },
            { id: 15, difficulty: 'medium', question: say('Aurkitu zatidura eta hondarra: $2.647\\mathbin{:}8$ eta $7.482\\mathbin{:}174$.', 'Halla el cociente y el resto: $2.647\\mathbin{:}8$ y $7.482\\mathbin{:}174$.', 'أوجد خارج القسمة والباقي: $2.647\\mathbin{:}8$ و$7.482\\mathbin{:}174$.'), solution: same('$2.647=8\\cdot 330+7 \\qquad 7.482=174\\cdot 43+0$') },
            { id: 16, difficulty: 'medium', question: say('Aplikatu banatze-propietatea: $5\\cdot (9-6)$ eta $(10-8)\\cdot 4$.', 'Aplica la propiedad distributiva: $5\\cdot (9-6)$ y $(10-8)\\cdot 4$.', 'طبّق خاصية التوزيع: $5\\cdot (9-6)$ و$(10-8)\\cdot 4$.'), solution: same('$5\\cdot 9-5\\cdot 6=45-30=15 \\qquad 10\\cdot 4-8\\cdot 4=40-32=8$') },
            { id: 17, difficulty: 'medium', question: say('Kalkulatu buruz: $33\\cdot 9$ eta $33\\cdot 11$.', 'Calcula mentalmente: $33\\cdot 9$ y $33\\cdot 11$.', 'احسب ذهنيًا: $33\\cdot 9$ و$33\\cdot 11$.'), solution: same('$330-33=297 \\qquad 330+33=363$') },
            { id: 18, difficulty: 'hard', question: say('Egia ala gezurra? a) Hondarra beti da zatitzailea baino txikiagoa. b) Zatiketak trukatze-propietatea betetzen du. c) Zatikizuna eta zatitzailea 3z biderkatzen badira, zatidura hirukoizten da.', '¿Verdadero o falso? a) El resto siempre es menor que el divisor. b) La división cumple la propiedad conmutativa. c) Si se multiplican dividendo y divisor por 3, el cociente se triplica.', 'صح أم خطأ؟ أ) الباقي دائمًا أصغر من المقسوم عليه. ب) القسمة تحقق خاصية التبديل. ج) إذا ضربنا المقسوم والمقسوم عليه في 3 يتضاعف خارج القسمة ثلاث مرات.'), solution: say('a) Egia. b) Gezurra: $12\\mathbin{:}4=3$ baina $4\\mathbin{:}12$ ez da 3. c) Gezurra: zatidura ez da aldatzen, $36\\mathbin{:}12=12\\mathbin{:}4=3$.', 'a) Verdadero. b) Falso: $12\\mathbin{:}4=3$ pero $4\\mathbin{:}12$ no es 3. c) Falso: el cociente no cambia, $36\\mathbin{:}12=12\\mathbin{:}4=3$.', 'أ) صح. ب) خطأ: $12\\mathbin{:}4=3$ لكن $4\\mathbin{:}12$ ليس 3. ج) خطأ: خارج القسمة لا يتغير، $36\\mathbin{:}12=12\\mathbin{:}4=3$.') }
        ]
    },
    {
        id: 'combined',
        title: say('Hierarkia eta buruketak', 'Jerarquía y problemas', 'الأولوية والمسائل'),
        items: [
            { id: 19, difficulty: 'easy', question: calculateBoth('$8+5\\cdot 2$', '$(8+5)\\cdot 2$'), solution: same('$8+10=18 \\qquad 13\\cdot 2=26$') },
            { id: 20, difficulty: 'easy', question: calculate('$4\\cdot 6+3\\cdot 6-25$'), solution: same('$24+18-25=42-25=17$'), answer: { expected: fraction(17) } },
            { id: 21, difficulty: 'medium', question: calculate('$2\\cdot (6+4)-3\\cdot (5-2)$'), solution: same('$2\\cdot 10-3\\cdot 3=20-9=11$'), answer: { expected: fraction(11) } },
            { id: 22, difficulty: 'medium', question: calculateBoth('$5-[7-(2+3)]$', '$20-[15-(11-9)]$'), solution: same('$5-[7-5]=5-2=3 \\qquad 20-[15-2]=20-13=7$') },
            { id: 23, difficulty: 'medium', question: say('Kamioi batek laranja-freskagarrien 15 kutxa eta limoi-freskagarrien 12 kutxa daramatza, eta kutxa bakoitzean 24 botila daude. Ebatzi D-P-E egiturarekin.', 'Un camión lleva 15 cajas de refrescos de naranja y 12 de limón, con 24 botellas en cada caja. Resuélvelo con Datos, Procedimiento y Respuesta.', 'تنقل شاحنة 15 صندوقًا من مشروب البرتقال و12 من الليمون، في كل صندوق 24 قارورة. حلّها بالمعطيات والطريقة والجواب.'), solution: say('D: 15 eta 12 kutxa, 24 botila kutxako. P: $(15+12)\\cdot 24=648$. E: Kamioiak 648 botila daramatza.', 'D: 15 y 12 cajas, 24 botellas por caja. P: $(15+12)\\cdot 24=648$. R: El camión lleva 648 botellas.', 'المعطيات: 15 و12 صندوقًا، 24 قارورة في الصندوق. الطريقة: $(15+12)\\cdot 24=648$. الجواب: تنقل الشاحنة 648 قارورة.') },
            { id: 24, difficulty: 'hard', question: say('Irakaslearen luma gorria: Anek $12+3\\cdot 5-2=73$ idatzi du eta Ikerrek $18-4\\cdot 2=28$. Aurkitu akatsak eta zuzendu.', 'El boli rojo del profe: Ane ha escrito $12+3\\cdot 5-2=73$ e Iker $18-4\\cdot 2=28$. Encuentra los errores y corrígelos.', 'قلم المعلم الأحمر: كتبت آنه $12+3\\cdot 5-2=73$ وكتب إيكر $18-4\\cdot 2=28$. جد الأخطاء وصحّحها.'), solution: say('Biek ezkerretik eskuinera kalkulatu dute, biderketa lehenik egin gabe. Ane: $12+15-2=25$. Iker: $18-8=10$.', 'Los dos han calculado de izquierda a derecha sin hacer antes la multiplicación. Ane: $12+15-2=25$. Iker: $18-8=10$.', 'حسب كلاهما من اليسار إلى اليمين دون البدء بالضرب. آنه: $12+15-2=25$. إيكر: $18-8=10$.') }
        ]
    },
    {
        id: 'powers',
        title: say('Berreturak', 'Potencias', 'القوى'),
        items: [
            { id: 25, difficulty: 'easy', question: say('Idatzi berretura gisa eta kalkulatu: $5\\cdot 5\\cdot 5\\cdot 5$ eta $7\\cdot 7\\cdot 7$.', 'Escribe como potencia y calcula: $5\\cdot 5\\cdot 5\\cdot 5$ y $7\\cdot 7\\cdot 7$.', 'اكتب على صورة قوة واحسب: $5\\cdot 5\\cdot 5\\cdot 5$ و$7\\cdot 7\\cdot 7$.'), solution: same('$5^4=625 \\qquad 7^3=343$') },
            { id: 26, difficulty: 'easy', question: say('Esan oinarria, berretzailea eta balioa: $3^5$ eta $6^4$.', 'Di la base, el exponente y el valor: $3^5$ y $6^4$.', 'اذكر الأساس والأس والقيمة: $3^5$ و$6^4$.'), solution: say('$3^5$: oinarria 3, berretzailea 5, $243$. $6^4$: oinarria 6, berretzailea 4, $1.296$.', '$3^5$: base 3, exponente 5, $243$. $6^4$: base 6, exponente 4, $1.296$.', '$3^5$: الأساس 3، الأس 5، $243$. $6^4$: الأساس 6، الأس 4، $1.296$.') },
            { id: 27, difficulty: 'medium', question: say('Adierazi berretura gisa: 25, 49, 64, 81 eta 100.', 'Expresa como potencia: 25, 49, 64, 81 y 100.', 'عبّر على صورة قوة: 25 و49 و64 و81 و100.'), solution: same('$5^2 \\quad 7^2 \\quad 8^2=2^6 \\quad 9^2=3^4 \\quad 10^2$') },
            { id: 28, difficulty: 'medium', question: say('Idatzi 10en berreturekin: 25.000, 4.000.000 eta 13.000.000.', 'Escribe con potencias de 10: 25.000, 4.000.000 y 13.000.000.', 'اكتب بقوى العدد 10: 25.000 و4.000.000 و13.000.000.'), solution: same('$25\\cdot 10^3 \\quad 4\\cdot 10^6 \\quad 13\\cdot 10^6$') },
            { id: 29, difficulty: 'medium', question: say('Idatzi 1etik 6rako zenbakien karratuak eta kuboak.', 'Escribe los cuadrados y los cubos de los números del 1 al 6.', 'اكتب مربعات ومكعبات الأعداد من 1 إلى 6.'), solution: say('Karratuak: 1, 4, 9, 16, 25, 36. Kuboak: 1, 8, 27, 64, 125, 216.', 'Cuadrados: 1, 4, 9, 16, 25, 36. Cubos: 1, 8, 27, 64, 125, 216.', 'المربعات: 1، 4، 9، 16، 25، 36. المكعبات: 1، 8، 27، 64، 125، 216.') },
            { id: 30, difficulty: 'hard', question: say('Deskonposatu 10en berreturekin: 3.402 eta 50.070.', 'Descompón con potencias de 10: 3.402 y 50.070.', 'فكّك بقوى العدد 10: 3.402 و50.070.'), solution: same('$3\\cdot 10^3+4\\cdot 10^2+2 \\qquad 5\\cdot 10^4+7\\cdot 10$') }
        ]
    }
]

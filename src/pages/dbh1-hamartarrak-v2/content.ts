import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { decimalValue as v } from './answers.ts'

/* ==========================================================================
   Zenbaki hamartarrak · 1. DBH — diagnostic, guided practice, exercise bank
   and challenges. Exercises follow Santillana 1.º ESO unit 4 (curricular
   adaptation: the shot put, the parked cars, the book cover, the cyclist)
   and Anaya unit 5 (the judges' times, the honey jars, the bread basket,
   the shopping). Only positive numbers; every closed answer is a single
   number.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })
const calculate = (latex: string) => say(`Kalkulatu: ${latex}`, `Calcula: ${latex}`, `احسب: ${latex}`)

export const decimalsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 1101,
        prompt: say('Zenbat milaren daude hamarren batean?', '¿Cuántas milésimas hay en una décima?', 'كم جزءًا من ألف في العُشر الواحد؟'),
        options: [same('10'), same('100'), same('1000')],
        correctIndex: 1,
        explanation: say('Hamarren bat = 10 ehunen, eta ehunen bakoitza = 10 milaren: $10\\cdot 10=100$.', 'Una décima = 10 centésimas, y cada centésima = 10 milésimas: $10\\cdot 10=100$.', 'العُشر = 10 أجزاء من مئة، وكل جزء من مئة = 10 أجزاء من ألف: $10\\cdot 10=100$.'),
        topic: 'decimal-units'
    },
    {
        id: 1102,
        prompt: say('Zenbat balio du 7 zifrak $91{,}75$ zenbakian?', '¿Cuánto vale la cifra 7 en $91{,}75$?', 'كم قيمة الرقم 7 في $91{,}75$؟'),
        options: [same('$0{,}7$'), same('$7$'), same('$0{,}07$')],
        correctIndex: 0,
        explanation: say('7a komaren ondoko lehen tokian dago: hamarrenak. $7\\cdot 0{,}1=0{,}7$.', 'El 7 está en el primer lugar tras la coma: las décimas. $7\\cdot 0{,}1=0{,}7$.', 'الرقم 7 في المنزلة الأولى بعد الفاصلة: الأعشار. $7\\cdot 0{,}1=0{,}7$.'),
        topic: 'place-value'
    },
    {
        id: 1103,
        prompt: say('Nola idazten da «bost unitate eta lau milaren»?', '¿Cómo se escribe «cinco unidades y cuatro milésimas»?', 'كيف يُكتب «خمس وحدات وأربعة أجزاء من ألف»؟'),
        options: [same('$5{,}4$'), same('$5{,}04$'), same('$5{,}004$')],
        correctIndex: 2,
        explanation: say('Milarenak hirugarren zifra hamartarra dira: $5{,}004$. $5{,}4$ lau hamarren da, eta $5{,}04$ lau ehunen.', 'Las milésimas son la tercera cifra decimal: $5{,}004$. $5{,}4$ son cuatro décimas y $5{,}04$, cuatro centésimas.', 'الأجزاء من ألف هي الرقم العشري الثالث: $5{,}004$. أما $5{,}4$ فأربعة أعشار، و$5{,}04$ أربعة أجزاء من مئة.'),
        topic: 'read-write'
    },
    {
        id: 1104,
        prompt: say('Zein da handiena?', '¿Cuál es el mayor?', 'أيها الأكبر؟'),
        options: [same('$0{,}5$'), same('$0{,}355$'), same('$0{,}49$')],
        correctIndex: 0,
        explanation: say('Konparatu hamarrenak: 5 > 4 > 3. Zifra gehiago izateak ez du handiago egiten: $0{,}500>0{,}490>0{,}355$.', 'Compara las décimas: 5 > 4 > 3. Tener más cifras no lo hace mayor: $0{,}500>0{,}490>0{,}355$.', 'قارن الأعشار: 5 > 4 > 3. كثرة الأرقام لا تجعله أكبر: $0{,}500>0{,}490>0{,}355$.'),
        topic: 'compare'
    },
    {
        id: 1105,
        prompt: say('Zein zenbaki dago $4{,}8$ eta $4{,}86$ artean?', '¿Qué número está entre $4{,}8$ y $4{,}86$?', 'أي عدد يقع بين $4{,}8$ و$4{,}86$؟'),
        options: [same('$4{,}9$'), same('$4{,}83$'), same('$4{,}08$')],
        correctIndex: 1,
        explanation: say('$4{,}80<4{,}83<4{,}86$. $4{,}9$ handiegia da eta $4{,}08$ txikiegia.', '$4{,}80<4{,}83<4{,}86$. $4{,}9$ es demasiado grande y $4{,}08$, demasiado pequeño.', '$4{,}80<4{,}83<4{,}86$. أما $4{,}9$ فكبير جدًا و$4{,}08$ صغير جدًا.'),
        topic: 'between'
    },
    {
        id: 1106,
        prompt: say('Nolakoa da $\\frac{7}{3}$ zatikiaren hamartarra?', '¿Cómo es el decimal de la fracción $\\frac{7}{3}$?', 'ما نوع العدد العشري للكسر $\\frac{7}{3}$؟'),
        options: [say('Zehatza: $2{,}3$', 'Exacto: $2{,}3$', 'منتهٍ: $2{,}3$'), say('Periodikoa: $2{,}333\\ldots$', 'Periódico: $2{,}333\\ldots$', 'دوري: $2{,}333\\ldots$'), say('Zehatza: $2{,}1$', 'Exacto: $2{,}1$', 'منتهٍ: $2{,}1$')],
        correctIndex: 1,
        explanation: say('$7=3\\cdot 2+1$: zatidura 2, hondarra 1; zero bat jaitsita 10 : 3 = 3, hondarra 1 berriro… 3a ez da inoiz bukatzen.', '$7=3\\cdot 2+1$: cociente 2, resto 1; bajando un cero, 10 : 3 = 3, resto 1 otra vez… El 3 no se acaba nunca.', '$7=3\\cdot 2+1$: الناتج 2 والباقي 1؛ وبإنزال صفر 10 : 3 = 3 والباقي 1 من جديد… ولا ينتهي الرقم 3 أبدًا.'),
        topic: 'fraction-division'
    },
    {
        id: 1107,
        prompt: calculate('$0{,}3\\cdot 0{,}02$'),
        options: [same('$0{,}6$'), same('$0{,}06$'), same('$0{,}006$')],
        correctIndex: 2,
        explanation: say('$3\\cdot 2=6$ eta $1+2=3$ zifra hamartar: $0{,}006$.', '$3\\cdot 2=6$ y $1+2=3$ cifras decimales: $0{,}006$.', '$3\\cdot 2=6$ و$1+2=3$ أرقام عشرية: $0{,}006$.'),
        topic: 'multiply'
    },
    {
        id: 1108,
        prompt: calculate('$9{,}5\\mathbin{:}0{,}25$'),
        options: [same('$38$'), same('$3{,}8$'), same('$380$')],
        correctIndex: 0,
        explanation: say('Biak 100ez: $950\\mathbin{:}25=38$.', 'Los dos por 100: $950\\mathbin{:}25=38$.', 'نضرب الاثنين في 100: $950\\mathbin{:}25=38$.'),
        topic: 'divide-decimal'
    }
]

export const decimalsPractice: PracticeItem[] = [
    /* ---------- Structure ---------- */
    {
        id: 1,
        stage: 'structure',
        prompt: say('Idatzi zifraz: «hamabost ehunen».', 'Escribe con cifras: «quince centésimas».', 'اكتب بالأرقام: «خمسة عشر جزءًا من مئة».'),
        expected: v('0,15'),
        hint: say('Ehunenak: bi zifra hamartar.', 'Centésimas: dos cifras decimales.', 'الأجزاء من مئة: رقمان عشريان.'),
        explanation: same('$\\frac{15}{100}=0{,}15$')
    },
    {
        id: 2,
        stage: 'structure',
        prompt: say('Zenbat ehunen dira 3 hamarren?', '¿Cuántas centésimas son 3 décimas?', 'كم جزءًا من مئة في 3 أعشار؟'),
        expected: fraction(30),
        hint: say('Hamarren bakoitza 10 ehunen da.', 'Cada décima son 10 centésimas.', 'كل عُشر يساوي 10 أجزاء من مئة.'),
        explanation: say('$3\\cdot 10=30$ ehunen: $0{,}3=0{,}30$.', '$3\\cdot 10=30$ centésimas: $0{,}3=0{,}30$.', '$3\\cdot 10=30$ جزءًا من مئة: $0{,}3=0{,}30$.')
    },
    {
        id: 3,
        stage: 'structure',
        prompt: say('Zenbat balio du 7 zifrak $43{,}07$ zenbakian?', '¿Cuánto vale la cifra 7 en $43{,}07$?', 'كم قيمة الرقم 7 في $43{,}07$؟'),
        expected: v('0,07'),
        hint: say('Zein tokitan dago komaren ondoren?', '¿En qué lugar está después de la coma?', 'في أي منزلة يقع بعد الفاصلة؟'),
        explanation: say('Ehunenetan dago: $7\\cdot 0{,}01=0{,}07$.', 'Está en las centésimas: $7\\cdot 0{,}01=0{,}07$.', 'يقع في الأجزاء من مئة: $7\\cdot 0{,}01=0{,}07$.')
    },
    {
        id: 4,
        stage: 'structure',
        prompt: say('Zein zenbaki da $600+50+4+0{,}1+0{,}03+0{,}007$?', '¿Qué número es $600+50+4+0{,}1+0{,}03+0{,}007$?', 'ما العدد $600+50+4+0{,}1+0{,}03+0{,}007$؟'),
        expected: v('654,137'),
        hint: say('Jarri zifra bakoitza bere tokian: E H U , h e m.', 'Pon cada cifra en su lugar: C D U , d c m.', 'ضع كل رقم في منزلته.'),
        explanation: same('$600+50+4+0{,}1+0{,}03+0{,}007=654{,}137$')
    },

    /* ---------- Order ---------- */
    {
        id: 5,
        stage: 'order',
        prompt: say('Zein da handiagoa, $34{,}908$ ala $34{,}91$? Idatzi handiena.', '¿Cuál es mayor, $34{,}908$ o $34{,}91$? Escribe el mayor.', 'أيهما أكبر، $34{,}908$ أم $34{,}91$؟ اكتب الأكبر.'),
        expected: v('34,91'),
        hint: say('Idatzi biak hiru zifra hamartarrekin.', 'Escribe los dos con tres cifras decimales.', 'اكتب العددين بثلاثة أرقام عشرية.'),
        explanation: say('$34{,}910>34{,}908$: ehunenetan $1>0$. Beraz, handiena $34{,}91$ da.', '$34{,}910>34{,}908$: en las centésimas $1>0$. Así que el mayor es $34{,}91$.', '$34{,}910>34{,}908$: في الأجزاء من مئة $1>0$. إذن الأكبر $34{,}91$.')
    },
    {
        id: 6,
        stage: 'order',
        prompt: say('Zein zenbaki dago $1{,}3$ eta $1{,}4$ zenbakien erdi-erdian?', '¿Qué número está justo en medio de $1{,}3$ y $1{,}4$?', 'ما العدد الواقع في منتصف $1{,}3$ و$1{,}4$ تمامًا؟'),
        expected: v('1,35'),
        hint: say('Batu biak eta zatitu 2z.', 'Súmalos y divide entre 2.', 'اجمعهما واقسم على 2.'),
        explanation: same('$(1{,}3+1{,}4)\\mathbin{:}2=2{,}7\\mathbin{:}2=1{,}35$')
    },
    {
        id: 7,
        stage: 'order',
        prompt: say('$2{,}4$ eta $2{,}5$ arteko tartea 10 zati berdinetan banatu da. Zein zenbaki dago zazpigarren markan?', 'El tramo entre $2{,}4$ y $2{,}5$ se ha dividido en 10 partes iguales. ¿Qué número está en la séptima marca?', 'قُسمت القطعة بين $2{,}4$ و$2{,}5$ إلى 10 أجزاء متساوية. ما العدد عند العلامة السابعة؟'),
        expected: v('2,47'),
        hint: say('Marka bakoitza ehunen bat da.', 'Cada marca es una centésima.', 'كل علامة جزء من مئة.'),
        explanation: same('$2{,}4+7\\cdot 0{,}01=2{,}47$')
    },
    {
        id: 8,
        stage: 'order',
        prompt: say('Ordenatu txikienetik handienera: $2{,}07$; $0{,}27$; $2{,}71$; $2{,}7$; $2{,}17$. Zein da hirugarrena?', 'Ordena de menor a mayor: $2{,}07$; $0{,}27$; $2{,}71$; $2{,}7$; $2{,}17$. ¿Cuál es el tercero?', 'رتّب من الأصغر إلى الأكبر: $2{,}07$؛ $0{,}27$؛ $2{,}71$؛ $2{,}7$؛ $2{,}17$. ما الثالث؟'),
        expected: v('2,17'),
        hint: say('Lehenik zati osoa, gero hamarrenak.', 'Primero la parte entera, después las décimas.', 'أولًا الجزء الصحيح ثم الأعشار.'),
        explanation: same('$0{,}27<2{,}07<2{,}17<2{,}7<2{,}71$')
    },

    /* ---------- Fractions and rounding ---------- */
    {
        id: 9,
        stage: 'fractions',
        prompt: say('Idatzi hamartar gisa: $\\frac{19065}{1000}$.', 'Escribe como número decimal: $\\frac{19065}{1000}$.', 'اكتب عددًا عشريًا: $\\frac{19065}{1000}$.'),
        expected: v('19,065'),
        hint: say('Hiru zero: koma hiru toki ezkerrera.', 'Tres ceros: la coma tres lugares a la izquierda.', 'ثلاثة أصفار: الفاصلة ثلاث منازل إلى اليسار.'),
        explanation: same('$\\frac{19065}{1000}=19{,}065$')
    },
    {
        id: 10,
        stage: 'fractions',
        prompt: say('Idatzi hamartar gisa: $\\frac{7}{4}$.', 'Escribe como número decimal: $\\frac{7}{4}$.', 'اكتب عددًا عشريًا: $\\frac{7}{4}$.'),
        expected: v('1,75'),
        hint: say('Zatitu 7 : 4, zeroak jaitsiz.', 'Divide 7 : 4 bajando ceros.', 'اقسم 7 : 4 بإنزال الأصفار.'),
        explanation: same('$7\\mathbin{:}4=1{,}75$')
    },
    {
        id: 11,
        stage: 'fractions',
        prompt: say('Biribildu $1{,}278$ ehunenetara.', 'Redondea $1{,}278$ a las centésimas.', 'قرّب $1{,}278$ إلى الأجزاء من مئة.'),
        expected: v('1,28'),
        hint: say('Begiratu milarenei: 8.', 'Mira las milésimas: 8.', 'انظر إلى الأجزاء من ألف: 8.'),
        explanation: say('8 ≥ 5: ehunenari bat gehitu. $1{,}278\\approx 1{,}28$', '8 ≥ 5: se suma uno a las centésimas. $1{,}278\\approx 1{,}28$', '8 ≥ 5: نضيف واحدًا إلى الأجزاء من مئة. $1{,}278\\approx 1{,}28$')
    },
    {
        id: 12,
        stage: 'fractions',
        prompt: say('Biribildu $2{,}99$ hamarrenetara.', 'Redondea $2{,}99$ a las décimas.', 'قرّب $2{,}99$ إلى الأعشار.'),
        expected: fraction(3),
        hint: say('Ehunena 9 da: hamarrenari bat gehitu… eta 9 + 1 = 10.', 'La centésima es 9: suma uno a las décimas… y 9 + 1 = 10.', 'الجزء من مئة 9: أضف واحدًا إلى الأعشار… و9 + 1 = 10.'),
        explanation: say('$2{,}9+0{,}1=3$: $2{,}99\\approx 3{,}0$', '$2{,}9+0{,}1=3$: $2{,}99\\approx 3{,}0$', '$2{,}9+0{,}1=3$: $2{,}99\\approx 3{,}0$')
    },

    /* ---------- Add, subtract and multiply ---------- */
    {
        id: 13,
        stage: 'operations',
        prompt: calculate('$73{,}987+20{,}621$'),
        expected: v('94,608'),
        hint: say('Komak lerrokatuta, zenbaki arruntak bezala.', 'Con las comas alineadas, como con naturales.', 'مع محاذاة الفاصلتين، كما في الأعداد الطبيعية.'),
        explanation: same('$73{,}987+20{,}621=94{,}608$')
    },
    {
        id: 14,
        stage: 'operations',
        prompt: calculate('$74{,}78-7{,}831$'),
        expected: v('66,949'),
        hint: say('Gehitu zero bat: $74{,}780$.', 'Añade un cero: $74{,}780$.', 'أضف صفرًا: $74{,}780$.'),
        explanation: same('$74{,}780-7{,}831=66{,}949$')
    },
    {
        id: 15,
        stage: 'operations',
        prompt: calculate('$34{,}5\\cdot 1{,}2$'),
        expected: v('41,4'),
        hint: say('$345\\cdot 12$ eta bi zifra hamartar.', '$345\\cdot 12$ y dos cifras decimales.', '$345\\cdot 12$ ورقمان عشريان.'),
        explanation: same('$345\\cdot 12=4140\\ \\to\\ 34{,}5\\cdot 1{,}2=41{,}40=41{,}4$')
    },
    {
        id: 16,
        stage: 'operations',
        prompt: calculate('$4{,}78\\mathbin{:}10$'),
        expected: v('0,478'),
        hint: say('Zati 10: koma toki bat ezkerrera.', 'Entre 10: la coma un lugar a la izquierda.', 'القسمة على 10: الفاصلة منزلة واحدة إلى اليسار.'),
        explanation: same('$4{,}78\\mathbin{:}10=0{,}478$')
    },

    /* ---------- Division and problems ---------- */
    {
        id: 17,
        stage: 'division',
        prompt: calculate('$524\\mathbin{:}20$'),
        expected: v('26,2'),
        hint: say('Hondarra 4 da: jarri koma eta jaitsi zero bat.', 'El resto es 4: pon la coma y baja un cero.', 'الباقي 4: ضع الفاصلة وأنزل صفرًا.'),
        explanation: say('$524=20\\cdot 26+4$; $40\\mathbin{:}20=2$: $524\\mathbin{:}20=26{,}2$', '$524=20\\cdot 26+4$; $40\\mathbin{:}20=2$: $524\\mathbin{:}20=26{,}2$', '$524=20\\cdot 26+4$؛ $40\\mathbin{:}20=2$: $524\\mathbin{:}20=26{,}2$')
    },
    {
        id: 18,
        stage: 'division',
        prompt: calculate('$253{,}35\\mathbin{:}25$'),
        expected: v('10,134'),
        hint: say('Zatitzailea arrunta da: jarri koma lehen zifra hamartarra jaistean.', 'El divisor es natural: pon la coma al bajar la primera cifra decimal.', 'المقسوم عليه طبيعي: ضع الفاصلة عند إنزال أول رقم عشري.'),
        explanation: same('$253{,}35\\mathbin{:}25=10{,}134$')
    },
    {
        id: 19,
        stage: 'division',
        prompt: calculate('$158{,}75\\mathbin{:}1{,}25$'),
        expected: fraction(127),
        hint: say('Zatitzaileak bi zifra hamartar: biak 100ez.', 'El divisor tiene dos cifras decimales: los dos por 100.', 'للمقسوم عليه رقمان عشريان: نضرب الاثنين في 100.'),
        explanation: same('$158{,}75\\mathbin{:}1{,}25=15875\\mathbin{:}125=127$')
    },
    {
        id: 20,
        stage: 'division',
        prompt: say('15 kg eztirekin 25 pote bete dira. Pote hutsak $0{,}12$ kg pisatzen du. Zenbat pisatzen du pote bete bakoitzak?', 'Con 15 kg de miel se han llenado 25 tarros. El tarro vacío pesa $0{,}12$ kg. ¿Cuánto pesa cada tarro lleno?', 'مُلئ 25 برطمانًا بـ 15 كغ من العسل. يزن البرطمان الفارغ $0{,}12$ كغ. كم يزن كل برطمان ممتلئ؟'),
        expected: v('0,72'),
        hint: say('Lehenik eztia pote bakoitzean: 15 : 25.', 'Primero la miel de cada tarro: 15 : 25.', 'أولًا عسل كل برطمان: 15 : 25.'),
        explanation: same('$15\\mathbin{:}25=0{,}6\\ \\to\\ 0{,}6+0{,}12=0{,}72$')
    }
]

export const decimalsChallenges: ChallengeItem[] = [
    {
        id: 101, stage: 'structure', points: 10, context: 'starter',
        prompt: say('$1{,}7$ unitate: zenbat milaren dira?', '$1{,}7$ unidades: ¿cuántas milésimas son?', '$1{,}7$ وحدة: كم جزءًا من ألف؟'),
        expected: fraction(1700),
        hint: say('Unitate bat 1000 milaren da.', 'Una unidad son 1000 milésimas.', 'الوحدة 1000 جزء من ألف.'),
        explanation: same('$1{,}7\\cdot 1000=1700$')
    },
    {
        id: 102, stage: 'structure', points: 20, context: 'advanced',
        prompt: say('Idatzi zifraz «ehunen erdia».', 'Escribe con cifras «media centésima».', 'اكتب بالأرقام «نصف جزء من مئة».'),
        expected: v('0,005'),
        hint: say('Ehunen bat zati 2.', 'Una centésima entre 2.', 'جزء من مئة مقسوم على 2.'),
        explanation: same('$0{,}01\\mathbin{:}2=0{,}005$')
    },
    {
        id: 103, stage: 'order', points: 10, context: 'starter',
        prompt: say('Idatzi $2{,}04$ eta $2{,}05$ zenbakietatik distantzia berera dagoen zenbakia.', 'Escribe el número que está a la misma distancia de $2{,}04$ y de $2{,}05$.', 'اكتب العدد الذي يبعد المسافة نفسها عن $2{,}04$ و$2{,}05$.'),
        expected: v('2,045'),
        hint: say('Gehitu zero bat: $2{,}040$ eta $2{,}050$.', 'Añade un cero: $2{,}040$ y $2{,}050$.', 'أضف صفرًا: $2{,}040$ و$2{,}050$.'),
        explanation: same('$(2{,}04+2{,}05)\\mathbin{:}2=2{,}045$')
    },
    {
        id: 104, stage: 'order', points: 20, context: 'advanced',
        prompt: say('100 metroko lasterketan, A epaileak 9 segundo eta 92 ehunen neurtu ditu, eta B epaileak 9 segundo eta 93 ehunen. Zein denbora emango zenioke irabazleari, bien erdian?', 'En los 100 metros lisos, el juez A ha medido 9 segundos y 92 centésimas, y el juez B, 9 segundos y 93 centésimas. ¿Qué tiempo le darías al ganador, justo en medio?', 'في سباق 100 متر قاس الحكم أ 9 ثوانٍ و92 جزءًا من مئة، والحكم ب 9 ثوانٍ و93 جزءًا من مئة. ما الزمن الذي تعطيه للفائز في منتصفهما تمامًا؟'),
        expected: v('9,925'),
        hint: say('Bi denboren erdia.', 'La mitad entre los dos tiempos.', 'منتصف الزمنين.'),
        explanation: same('$(9{,}92+9{,}93)\\mathbin{:}2=9{,}925$')
    },
    {
        id: 105, stage: 'order', points: 30, context: 'master',
        prompt: say('Lau zenbakik $0{,}7$–$0{,}8$ tartea bost zati berdinetan banatzen dute. Zein da bigarrena?', 'Cuatro números dividen el tramo $0{,}7$–$0{,}8$ en cinco partes iguales. ¿Cuál es el segundo?', 'أربعة أعداد تقسم القطعة $0{,}7$–$0{,}8$ إلى خمسة أجزاء متساوية. ما الثاني؟'),
        expected: v('0,74'),
        hint: say('Zati bakoitza: $0{,}1\\mathbin{:}5$.', 'Cada parte: $0{,}1\\mathbin{:}5$.', 'كل جزء: $0{,}1\\mathbin{:}5$.'),
        explanation: same('$0{,}1\\mathbin{:}5=0{,}02\\ \\to\\ 0{,}7+2\\cdot 0{,}02=0{,}74$')
    },
    {
        id: 106, stage: 'fractions', points: 20, context: 'advanced',
        prompt: say('Biribildu $0{,}0999$ milarenetara.', 'Redondea $0{,}0999$ a las milésimas.', 'قرّب $0{,}0999$ إلى الأجزاء من ألف.'),
        expected: v('0,1'),
        hint: say('Hurrengo zifra 9 da, eta milarenak ere 9.', 'La cifra siguiente es 9, y las milésimas también son 9.', 'الرقم التالي 9، والأجزاء من ألف 9 أيضًا.'),
        explanation: same('$0{,}099+0{,}001=0{,}1\\ \\to\\ 0{,}0999\\approx 0{,}100$')
    },
    {
        id: 107, stage: 'fractions', points: 30, context: 'master',
        prompt: say('Kalkulatu $\\frac{11}{8}$ hamartar gisa.', 'Calcula $\\frac{11}{8}$ como número decimal.', 'احسب $\\frac{11}{8}$ عددًا عشريًا.'),
        expected: v('1,375'),
        hint: say('Zatitu 11 : 8 hondarra 0 izan arte.', 'Divide 11 : 8 hasta que el resto sea 0.', 'اقسم 11 : 8 حتى يصبح الباقي 0.'),
        explanation: same('$11\\mathbin{:}8=1{,}375$')
    },
    {
        id: 108, stage: 'operations', points: 10, context: 'starter',
        prompt: say('Zenbat falta zaio $7{,}999$ zenbakiari 8 izateko?', '¿Cuánto le falta a $7{,}999$ para llegar a 8?', 'كم ينقص $7{,}999$ ليصل إلى 8؟'),
        expected: v('0,001'),
        hint: say('Kenketa: $8-7{,}999$.', 'Una resta: $8-7{,}999$.', 'طرح: $8-7{,}999$.'),
        explanation: same('$8{,}000-7{,}999=0{,}001$')
    },
    {
        id: 109, stage: 'operations', points: 20, context: 'advanced',
        prompt: calculate('$17{,}28-(12{,}54-4{,}665)$'),
        expected: v('9,405'),
        hint: say('Lehenik parentesia.', 'Primero el paréntesis.', 'أولًا القوس.'),
        explanation: same('$12{,}540-4{,}665=7{,}875\\ \\to\\ 17{,}280-7{,}875=9{,}405$')
    },
    {
        id: 110, stage: 'operations', points: 30, context: 'master',
        prompt: say('Kable zuriak $0{,}80$ € balio du metroko, eta beltzak $2{,}25$ €. Zenbat ordainduko dugu zuritik $3{,}5$ m eta beltzetik $2{,}25$ m erosita? Biribildu zentimoetara.', 'El cable blanco cuesta $0{,}80$ € el metro, y el negro, $2{,}25$ €. ¿Cuánto pagaremos por $3{,}5$ m del blanco y $2{,}25$ m del negro? Redondea a los céntimos.', 'سعر متر السلك الأبيض $0{,}80$ €، والأسود $2{,}25$ €. كم ندفع ثمن $3{,}5$ م من الأبيض و$2{,}25$ م من الأسود؟ قرّب إلى السنتات.'),
        expected: v('7,86'),
        hint: say('Bi biderketa eta batuketa bat.', 'Dos multiplicaciones y una suma.', 'عمليتا ضرب وعملية جمع.'),
        explanation: same('$3{,}5\\cdot 0{,}80+2{,}25\\cdot 2{,}25=2{,}8+5{,}0625=7{,}8625\\approx 7{,}86$')
    },
    {
        id: 111, stage: 'division', points: 10, context: 'starter',
        prompt: calculate('$1\\mathbin{:}0{,}05$'),
        expected: fraction(20),
        hint: say('Biak 100ez.', 'Los dos por 100.', 'نضرب الاثنين في 100.'),
        explanation: same('$1\\mathbin{:}0{,}05=100\\mathbin{:}5=20$')
    },
    {
        id: 112, stage: 'division', points: 20, context: 'advanced',
        prompt: say('Meloiak $1{,}25$ €/kg balio du. Zenbat pisatzen du $4{,}40$ € balio duen meloi batek?', 'Los melones se venden a $1{,}25$ €/kg. ¿Cuánto pesa un melón que cuesta $4{,}40$ €?', 'يُباع البطيخ بسعر $1{,}25$ € للكيلو. كم تزن بطيخة ثمنها $4{,}40$ €؟'),
        expected: v('3,52'),
        hint: say('Prezioa zati kiloaren prezioa.', 'Precio entre precio del kilo.', 'الثمن مقسومًا على سعر الكيلو.'),
        explanation: same('$4{,}40\\mathbin{:}1{,}25=440\\mathbin{:}125=3{,}52$')
    },
    {
        id: 113, stage: 'division', points: 30, context: 'master',
        prompt: say('Okinaren saskiak, hutsik, $8{,}5$ kg pisatzen du, eta 250 gramoko ogi-barrekin beteta $18{,}750$ kg. Zenbat ogi-barra daude?', 'El cesto del panadero vacío pesa $8{,}5$ kg, y cargado con barras de 250 gramos pesa $18{,}750$ kg. ¿Cuántas barras hay?', 'تزن سلة الخباز فارغة $8{,}5$ كغ، ومحمّلة بأرغفة وزن كل منها 250 غرامًا $18{,}750$ كغ. كم رغيفًا فيها؟'),
        expected: fraction(41),
        hint: say('Ogien pisua: kendu saskia. 250 g = $0{,}25$ kg.', 'Peso del pan: resta el cesto. 250 g = $0{,}25$ kg.', 'وزن الخبز: اطرح وزن السلة. 250 غ = $0{,}25$ كغ.'),
        explanation: same('$18{,}75-8{,}5=10{,}25\\ \\to\\ 10{,}25\\mathbin{:}0{,}25=41$')
    },
    {
        id: 114, stage: 'division', points: 30, context: 'master',
        prompt: say('Kilo eta laurdeneko legatz batek $15{,}75$ € balio du. Zenbat balioko du $1{,}4$ kg-ko beste batek?', 'Una merluza de kilo y cuarto ha costado $15{,}75$ €. ¿Cuánto costará otra de $1{,}4$ kg?', 'سمكة نازلي وزنها كيلو وربع ثمنها $15{,}75$ €. كم ثمن أخرى وزنها $1{,}4$ كغ؟'),
        expected: v('17,64'),
        hint: say('Lehenik kiloaren prezioa: kilo eta laurden = $1{,}25$ kg.', 'Primero el precio del kilo: kilo y cuarto = $1{,}25$ kg.', 'أولًا سعر الكيلو: كيلو وربع = $1{,}25$ كغ.'),
        explanation: same('$15{,}75\\mathbin{:}1{,}25=12{,}6\\ \\to\\ 12{,}6\\cdot 1{,}4=17{,}64$')
    }
]

export const decimalsExerciseBank: ExerciseSection[] = [
    {
        id: 'structure',
        title: say('Zenbaki hamartarren egitura', 'La estructura de los decimales', 'بنية الأعداد العشرية'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Idatzi zifraz: a) bost hamarren; b) hamaika milaren; c) hamar ehunen.', 'Escribe con cifras: a) cinco décimas; b) once milésimas; c) diez centésimas.', 'اكتب بالأرقام: أ) خمسة أعشار؛ ب) أحد عشر جزءًا من ألف؛ ج) عشرة أجزاء من مئة.'), solution: same('a) $0{,}5$; b) $0{,}011$; c) $0{,}10=0{,}1$') },
            { id: 2, difficulty: 'easy', question: say('Idatzi zifraz: «zortzi unitate eta zortzi ehunen».', 'Escribe con cifras: «ocho unidades y ocho centésimas».', 'اكتب بالأرقام: «ثماني وحدات وثمانية أجزاء من مئة».'), solution: same('$8{,}08$'), answer: { expected: v('8,08') } },
            { id: 3, difficulty: 'easy', question: say('Nola irakurtzen dira? a) $12{,}56$; b) $1{,}06$; c) $5{,}184$.', '¿Cómo se leen? a) $12{,}56$; b) $1{,}06$; c) $5{,}184$.', 'كيف تُقرأ؟ أ) $12{,}56$؛ ب) $1{,}06$؛ ج) $5{,}184$.'), solution: say('a) Hamabi unitate eta berrogeita hamasei ehunen; b) unitate bat eta sei ehunen; c) bost unitate eta ehun eta laurogeita lau milaren.', 'a) Doce unidades y cincuenta y seis centésimas; b) una unidad y seis centésimas; c) cinco unidades y ciento ochenta y cuatro milésimas.', 'أ) اثنتا عشرة وحدة وستة وخمسون جزءًا من مئة؛ ب) وحدة وستة أجزاء من مئة؛ ج) خمس وحدات ومئة وأربعة وثمانون جزءًا من ألف.') },
            { id: 4, difficulty: 'medium', question: say('Osatu: 5 ehunen = … milaren.', 'Completa: 5 centésimas = … milésimas.', 'أكمل: 5 أجزاء من مئة = … جزءًا من ألف.'), solution: same('$5\\cdot 10=50$'), answer: { expected: fraction(50) } },
            { id: 5, difficulty: 'medium', question: say('Osatu: 20 unitate = … hamarren.', 'Completa: 20 unidades = … décimas.', 'أكمل: 20 وحدة = … عُشرًا.'), solution: same('$20\\cdot 10=200$'), answer: { expected: fraction(200) } },
            { id: 6, difficulty: 'medium', question: say('Zenbat balio du 7 zifrak zenbaki hauetan? a) $37{,}98$; b) $70{,}51$; c) $52{,}347$.', '¿Cuánto vale la cifra 7 en cada número? a) $37{,}98$; b) $70{,}51$; c) $52{,}347$.', 'كم قيمة الرقم 7 في كل عدد؟ أ) $37{,}98$؛ ب) $70{,}51$؛ ج) $52{,}347$.'), solution: say('a) 7 unitate; b) 70, zazpi hamarreko; c) $0{,}007$, zazpi milaren.', 'a) 7 unidades; b) 70, siete decenas; c) $0{,}007$, siete milésimas.', 'أ) 7 وحدات؛ ب) 70، سبع عشرات؛ ج) $0{,}007$، سبعة أجزاء من ألف.') },
            { id: 7, difficulty: 'medium', question: say('Deskonposatu $89{,}435$.', 'Descompón $89{,}435$.', 'فكّك $89{,}435$.'), solution: same('$89{,}435=80+9+0{,}4+0{,}03+0{,}005$') },
            { id: 8, difficulty: 'hard', question: say('Idatzi 7 hamarreko, 5 ehunen eta 2 milaren dituen zenbakia.', 'Escribe el número que tiene 7 decenas, 5 centésimas y 2 milésimas.', 'اكتب العدد الذي فيه 7 عشرات و5 أجزاء من مئة وجزآن من ألف.'), solution: same('$70+0{,}05+0{,}002=70{,}052$'), answer: { expected: v('70,052') } },
            { id: 9, difficulty: 'hard', question: say('Egia ala gezurra? «Ehunen erdia 5 hamarren da».', '¿Verdadero o falso? «Media centésima equivale a 5 décimas».', 'صحيح أم خطأ؟ «نصف جزء من مئة يساوي 5 أعشار».'), solution: say('Gezurra: ehunen erdia $0{,}005$ da, eta 5 hamarren $0{,}5$.', 'Falso: media centésima es $0{,}005$, y 5 décimas son $0{,}5$.', 'خطأ: نصف جزء من مئة هو $0{,}005$، وخمسة أعشار $0{,}5$.') },
            { id: 10, difficulty: 'hard', question: say('Osatu: 15 unitate = … milaren.', 'Completa: 15 unidades = … milésimas.', 'أكمل: 15 وحدة = … جزءًا من ألف.'), solution: same('$15\\cdot 1000=15000$'), answer: { expected: fraction(15000) } }
        ]
    },
    {
        id: 'order',
        title: say('Ordena eta zuzena', 'Orden y recta', 'الترتيب والمستقيم'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Idatzi >, < edo =: a) $13{,}56\\ \\square\\ 13{,}65$; b) $11{,}8\\ \\square\\ 11{,}80$; c) $6{,}08\\ \\square\\ 6{,}07$.', 'Escribe >, < o =: a) $13{,}56\\ \\square\\ 13{,}65$; b) $11{,}8\\ \\square\\ 11{,}80$; c) $6{,}08\\ \\square\\ 6{,}07$.', 'اكتب > أو < أو =: أ) $13{,}56\\ \\square\\ 13{,}65$؛ ب) $11{,}8\\ \\square\\ 11{,}80$؛ ج) $6{,}08\\ \\square\\ 6{,}07$.'), solution: same('a) $13{,}56<13{,}65$; b) $11{,}8=11{,}80$; c) $6{,}08>6{,}07$') },
            { id: 12, difficulty: 'easy', question: say('Ordenatu txikienetik handienera: $5{,}83$; $5{,}51$; $5{,}09$; $5{,}511$; $5{,}47$.', 'Ordena de menor a mayor: $5{,}83$; $5{,}51$; $5{,}09$; $5{,}511$; $5{,}47$.', 'رتّب من الأصغر إلى الأكبر: $5{,}83$؛ $5{,}51$؛ $5{,}09$؛ $5{,}511$؛ $5{,}47$.'), solution: same('$5{,}09<5{,}47<5{,}51<5{,}511<5{,}83$') },
            { id: 13, difficulty: 'easy', question: say('Idatzi $0{,}76$ eta $0{,}79$ arteko hamartar bat.', 'Escribe un decimal comprendido entre $0{,}76$ y $0{,}79$.', 'اكتب عددًا عشريًا بين $0{,}76$ و$0{,}79$.'), solution: say('Adibidez $0{,}77$ edo $0{,}78$; baita $0{,}765$ ere.', 'Por ejemplo $0{,}77$ o $0{,}78$; también $0{,}765$.', 'مثلًا $0{,}77$ أو $0{,}78$؛ وأيضًا $0{,}765$.') },
            { id: 14, difficulty: 'medium', question: say('Ordenatu handienetik txikienera ikasle hauen altuerak (m): $1{,}45$; $1{,}59$; $1{,}52$; $1{,}49$; $1{,}5$.', 'Ordena de mayor a menor estas estaturas (m): $1{,}45$; $1{,}59$; $1{,}52$; $1{,}49$; $1{,}5$.', 'رتّب من الأكبر إلى الأصغر هذه الأطوال (م): $1{,}45$؛ $1{,}59$؛ $1{,}52$؛ $1{,}49$؛ $1{,}5$.'), solution: same('$1{,}59>1{,}52>1{,}50>1{,}49>1{,}45$') },
            { id: 15, difficulty: 'medium', question: say('Juanek 179 cm neurtzen ditu; bere anaia Marcosek, metro bat eta zortzi zentimetro; eta aitak, metro bat eta hirurogeita hemezortzi zentimetro. Ordenatu altuerak handienetik txikienera, metrotan.', 'Juan mide 179 cm; su hermano Marcos, un metro y ocho centímetros, y su padre, un metro y setenta y ocho centímetros. Ordena las alturas de mayor a menor, en metros.', 'طول خوان 179 سم، وأخيه ماركوس متر وثمانية سنتيمترات، وأبيهما متر وثمانية وسبعون سنتيمترًا. رتّب الأطوال من الأكبر إلى الأصغر بالأمتار.'), solution: say('$1{,}79>1{,}78>1{,}08$: Juan, aita eta Marcos.', '$1{,}79>1{,}78>1{,}08$: Juan, el padre y Marcos.', '$1{,}79>1{,}78>1{,}08$: خوان ثم الأب ثم ماركوس.') },
            { id: 16, difficulty: 'medium', question: say('Zein zenbaki dago $1{,}8$ eta $1{,}9$ zenbakietatik distantzia berera?', '¿Qué número está a la misma distancia de $1{,}8$ y de $1{,}9$?', 'ما العدد الذي يبعد المسافة نفسها عن $1{,}8$ و$1{,}9$؟'), solution: same('$(1{,}8+1{,}9)\\mathbin{:}2=1{,}85$'), answer: { expected: v('1,85') } },
            { id: 17, difficulty: 'medium', question: say('Zein zenbakik banatzen dute 2–3 tartea lau zati berdinetan?', '¿Qué números dividen el tramo 2–3 en cuatro partes iguales?', 'ما الأعداد التي تقسم القطعة 2–3 إلى أربعة أجزاء متساوية؟'), solution: same('$1\\mathbin{:}4=0{,}25$: $2{,}25$; $2{,}5$; $2{,}75$') },
            { id: 18, difficulty: 'hard', question: say('Tartekatu zenbaki bat $1{,}999$ eta $2$ artean.', 'Intercala un número entre $1{,}999$ y $2$.', 'أدرج عددًا بين $1{,}999$ و$2$.'), solution: say('Gehitu zero bat: $1{,}9990$ eta $2{,}0000$; adibidez $1{,}9995$.', 'Añade un cero: $1{,}9990$ y $2{,}0000$; por ejemplo $1{,}9995$.', 'أضف صفرًا: $1{,}9990$ و$2{,}0000$؛ مثلًا $1{,}9995$.') },
            { id: 19, difficulty: 'hard', question: say('Ordenatu txikienetik handienera: $0{,}1$; $0{,}09$; $0{,}099$; $0{,}12$; $0{,}029$.', 'Ordena de menor a mayor: $0{,}1$; $0{,}09$; $0{,}099$; $0{,}12$; $0{,}029$.', 'رتّب من الأصغر إلى الأكبر: $0{,}1$؛ $0{,}09$؛ $0{,}099$؛ $0{,}12$؛ $0{,}029$.'), solution: same('$0{,}029<0{,}09<0{,}099<0{,}1<0{,}12$') },
            { id: 20, difficulty: 'hard', question: say('5 eta 6 arteko tartea 10 zatitan banatu da. Puntu bat 6tik hiru markara dago, ezkerrean. Zein zenbaki da?', 'El tramo entre 5 y 6 se ha dividido en 10 partes. Un punto está tres marcas a la izquierda del 6. ¿Qué número es?', 'قُسمت القطعة بين 5 و6 إلى 10 أجزاء. تقع نقطة على بعد ثلاث علامات يسار 6. ما العدد؟'), solution: same('$6-3\\cdot 0{,}1=5{,}7$'), answer: { expected: v('5,7') } }
        ]
    },
    {
        id: 'fractions',
        title: say('Zatikiak eta biribiltzea', 'Fracciones y redondeo', 'الكسور والتقريب'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Idatzi zatiki hamartar gisa: a) $36{,}78$; b) $0{,}75$; c) $2{,}801$.', 'Expresa en forma de fracción decimal: a) $36{,}78$; b) $0{,}75$; c) $2{,}801$.', 'اكتب كسرًا عشريًا: أ) $36{,}78$؛ ب) $0{,}75$؛ ج) $2{,}801$.'), solution: same('a) $\\frac{3678}{100}$; b) $\\frac{75}{100}$; c) $\\frac{2801}{1000}$') },
            { id: 22, difficulty: 'easy', question: say('Idatzi hamartar gisa: a) $\\frac{24}{10}$; b) $\\frac{35}{100}$; c) $\\frac{6}{1000}$.', 'Escribe como decimal: a) $\\frac{24}{10}$; b) $\\frac{35}{100}$; c) $\\frac{6}{1000}$.', 'اكتب عددًا عشريًا: أ) $\\frac{24}{10}$؛ ب) $\\frac{35}{100}$؛ ج) $\\frac{6}{1000}$.'), solution: same('a) $2{,}4$; b) $0{,}35$; c) $0{,}006$') },
            { id: 23, difficulty: 'easy', question: say('Biribildu hamarrenetara: a) $6{,}27$; b) $3{,}84$; c) $0{,}094$.', 'Redondea a las décimas: a) $6{,}27$; b) $3{,}84$; c) $0{,}094$.', 'قرّب إلى الأعشار: أ) $6{,}27$؛ ب) $3{,}84$؛ ج) $0{,}094$.'), solution: same('a) $6{,}3$; b) $3{,}8$; c) $0{,}1$') },
            { id: 24, difficulty: 'medium', question: say('Zehatza ala periodikoa? a) $\\frac{24}{50}$; b) $\\frac{1}{3}$; c) $\\frac{9}{10}$; d) $\\frac{11}{9}$.', '¿Exacto o periódico? a) $\\frac{24}{50}$; b) $\\frac{1}{3}$; c) $\\frac{9}{10}$; d) $\\frac{11}{9}$.', 'منتهٍ أم دوري؟ أ) $\\frac{24}{50}$؛ ب) $\\frac{1}{3}$؛ ج) $\\frac{9}{10}$؛ د) $\\frac{11}{9}$.'), solution: say('a) $0{,}48$, zehatza; b) $0{,}333\\ldots$, periodikoa; c) $0{,}9$, zehatza; d) $1{,}222\\ldots$, periodikoa.', 'a) $0{,}48$, exacto; b) $0{,}333\\ldots$, periódico; c) $0{,}9$, exacto; d) $1{,}222\\ldots$, periódico.', 'أ) $0{,}48$ منتهٍ؛ ب) $0{,}333\\ldots$ دوري؛ ج) $0{,}9$ منتهٍ؛ د) $1{,}222\\ldots$ دوري.') },
            { id: 25, difficulty: 'medium', question: say('Idatzi hamartar gisa: $\\frac{7}{8}$.', 'Escribe como decimal: $\\frac{7}{8}$.', 'اكتب عددًا عشريًا: $\\frac{7}{8}$.'), solution: same('$7\\mathbin{:}8=0{,}875$'), answer: { expected: v('0,875') } },
            { id: 26, difficulty: 'medium', question: say('Biribildu $3{,}0051$ ehunenetara.', 'Redondea $3{,}0051$ a las centésimas.', 'قرّب $3{,}0051$ إلى الأجزاء من مئة.'), solution: say('Milarena 5 da: $3{,}0051\\approx 3{,}01$', 'La milésima es 5: $3{,}0051\\approx 3{,}01$', 'الجزء من ألف 5: $3{,}0051\\approx 3{,}01$'), answer: { expected: v('3,01') } },
            { id: 27, difficulty: 'medium', question: say('Idatzi hamartar gisa: $\\frac{53204}{10000}$.', 'Escribe como decimal: $\\frac{53204}{10000}$.', 'اكتب عددًا عشريًا: $\\frac{53204}{10000}$.'), solution: same('$\\frac{53204}{10000}=5{,}3204$'), answer: { expected: v('5,3204') } },
            { id: 28, difficulty: 'hard', question: say('Hurbildu $2{,}499$ unitateetara, hamarrenetara eta ehunenetara.', 'Aproxima $2{,}499$ a las unidades, a las décimas y a las centésimas.', 'قرّب $2{,}499$ إلى الآحاد والأعشار والأجزاء من مئة.'), solution: same('$2{,}499\\approx 2\\qquad 2{,}499\\approx 2{,}5\\qquad 2{,}499\\approx 2{,}50$') },
            { id: 29, difficulty: 'hard', question: say('Kalkulatu $25\\mathbin{:}7$ eta biribildu hamarrenetara.', 'Calcula $25\\mathbin{:}7$ y redondea a las décimas.', 'احسب $25\\mathbin{:}7$ وقرّب إلى الأعشار.'), solution: same('$25\\mathbin{:}7=3{,}571\\ldots\\approx 3{,}6$'), answer: { expected: v('3,6') } },
            { id: 30, difficulty: 'hard', question: say('Idatzi zatiki hamartar gisa: a) $0{,}0015$; b) $211{,}809$.', 'Escribe en forma de fracción decimal: a) $0{,}0015$; b) $211{,}809$.', 'اكتب كسرًا عشريًا: أ) $0{,}0015$؛ ب) $211{,}809$.'), solution: same('a) $\\frac{15}{10000}$; b) $\\frac{211809}{1000}$') }
        ]
    },
    {
        id: 'operations',
        title: say('Batu, kendu eta biderkatu', 'Sumar, restar y multiplicar', 'الجمع والطرح والضرب'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Kalkulatu buruz: a) $0{,}8+0{,}4$; b) $1-0{,}3$; c) $3{,}25+1{,}75$.', 'Calcula mentalmente: a) $0{,}8+0{,}4$; b) $1-0{,}3$; c) $3{,}25+1{,}75$.', 'احسب ذهنيًا: أ) $0{,}8+0{,}4$؛ ب) $1-0{,}3$؛ ج) $3{,}25+1{,}75$.'), solution: same('a) $0{,}8+0{,}4=1{,}2$; b) $1-0{,}3=0{,}7$; c) $3{,}25+1{,}75=5$') },
            { id: 32, difficulty: 'easy', question: calculate('$234{,}76-155{,}3$'), solution: same('$234{,}76-155{,}30=79{,}46$'), answer: { expected: v('79,46') } },
            { id: 33, difficulty: 'easy', question: say('Biderkatu: a) $3{,}26\\cdot 100$; b) $35{,}29\\cdot 10$; c) $4{,}7\\cdot 1000$.', 'Multiplica: a) $3{,}26\\cdot 100$; b) $35{,}29\\cdot 10$; c) $4{,}7\\cdot 1000$.', 'اضرب: أ) $3{,}26\\cdot 100$؛ ب) $35{,}29\\cdot 10$؛ ج) $4{,}7\\cdot 1000$.'), solution: same('a) $3{,}26\\cdot 100=326$; b) $35{,}29\\cdot 10=352{,}9$; c) $4{,}7\\cdot 1000=4700$') },
            { id: 34, difficulty: 'medium', question: calculate('$0{,}702+11{,}8+238{,}4945+9{,}2$'), solution: same('$0{,}702+11{,}8+238{,}4945+9{,}2=260{,}1965$'), answer: { expected: v('260,1965') } },
            { id: 35, difficulty: 'medium', question: calculate('$108{,}24\\cdot 9{,}6$'), solution: same('$10824\\cdot 96=1039104\\ \\to\\ 108{,}24\\cdot 9{,}6=1039{,}104$'), answer: { expected: v('1039,104') } },
            { id: 36, difficulty: 'medium', question: say('Etxe batek $30{,}56$ m-ko altuera du. Laugarren solairua lurretik $15{,}3$ m-ra dago. Zenbat metro daude solairu horretatik terrazaraino?', 'Una casa tiene $30{,}56$ m de altura. El cuarto piso está a $15{,}3$ m del suelo. ¿Qué distancia hay desde ese piso hasta la azotea?', 'ارتفاع بيت $30{,}56$ م. يقع الطابق الرابع على ارتفاع $15{,}3$ م من الأرض. كم المسافة من ذلك الطابق إلى السطح؟'), solution: same('$30{,}56-15{,}30=15{,}26$'), answer: { expected: v('15,26') } },
            { id: 37, difficulty: 'medium', question: say('Jarri koma: a) $2{,}7\\cdot 1{,}5\\to 405$; b) $3{,}8\\cdot 12\\to 456$; c) $0{,}3\\cdot 0{,}02\\to 0006$.', 'Coloca la coma: a) $2{,}7\\cdot 1{,}5\\to 405$; b) $3{,}8\\cdot 12\\to 456$; c) $0{,}3\\cdot 0{,}02\\to 0006$.', 'ضع الفاصلة: أ) $2{,}7\\cdot 1{,}5\\to 405$؛ ب) $3{,}8\\cdot 12\\to 456$؛ ج) $0{,}3\\cdot 0{,}02\\to 0006$.'), solution: same('a) $2{,}7\\cdot 1{,}5=4{,}05$; b) $3{,}8\\cdot 12=45{,}6$; c) $0{,}3\\cdot 0{,}02=0{,}006$') },
            { id: 38, difficulty: 'hard', question: say('Txirrindulari batek $62{,}35$ m-ko zirkuitu batean entrenatzen du. Zenbat metro egingo ditu 10 itzuli emanda? Eta 100? Eta 1000?', 'Un ciclista entrena en un circuito de $62{,}35$ m. ¿Cuántos metros recorre si da 10 vueltas? ¿Y 100? ¿Y 1000?', 'يتدرّب دراج في حلبة طولها $62{,}35$ م. كم مترًا يقطع إذا دار 10 دورات؟ و100؟ و1000؟'), solution: same('$62{,}35\\cdot 10=623{,}5\\qquad 62{,}35\\cdot 100=6235\\qquad 62{,}35\\cdot 1000=62350$') },
            { id: 39, difficulty: 'hard', question: say('Herri batek 13568 biztanle zituen 1970ean. 1988an biztanleria $1{,}5$ez biderkatu zen, eta 2001ean $2{,}25$ez, 1988koarekiko. Zenbat biztanle zeuden 2001ean?', 'Un pueblo tenía 13568 habitantes en 1970. En 1988 la población se multiplicó por $1{,}5$, y en 2001 por $2{,}25$ respecto a 1988. ¿Cuántos habitantes había en 2001?', 'كان في قرية 13568 نسمة سنة 1970. وفي 1988 تضاعف عدد السكان $1{,}5$ مرة، وفي 2001 تضاعف $2{,}25$ مرة مقارنة بسنة 1988. كم كان عدد السكان سنة 2001؟'), solution: same('$13568\\cdot 1{,}5=20352\\ \\to\\ 20352\\cdot 2{,}25=45792$'), answer: { expected: fraction(45792) } },
            { id: 40, difficulty: 'hard', question: say('$0{,}2$z biderkatzea zein zenbakiz zatitzea bezala da?', 'Multiplicar por $0{,}2$ es lo mismo que dividir entre… ¿qué número?', 'الضرب في $0{,}2$ يساوي القسمة على أي عدد؟'), solution: same('$10\\cdot 0{,}2=2=10\\mathbin{:}5\\qquad 30\\cdot 0{,}2=6=30\\mathbin{:}5$'), answer: { expected: fraction(5) } }
        ]
    },
    {
        id: 'division',
        title: say('Zatiketak eta problemak', 'Divisiones y problemas', 'القسمة والمسائل'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Kalkulatu: a) $3480\\mathbin{:}2$; b) $1505\\mathbin{:}5$; c) $524\\mathbin{:}20$.', 'Calcula: a) $3480\\mathbin{:}2$; b) $1505\\mathbin{:}5$; c) $524\\mathbin{:}20$.', 'احسب: أ) $3480\\mathbin{:}2$؛ ب) $1505\\mathbin{:}5$؛ ج) $524\\mathbin{:}20$.'), solution: same('a) $3480\\mathbin{:}2=1740$; b) $1505\\mathbin{:}5=301$; c) $524\\mathbin{:}20=26{,}2$') },
            { id: 42, difficulty: 'easy', question: say('Zatitu: a) $30{,}56\\mathbin{:}10$; b) $5{,}7\\mathbin{:}100$; c) $98{,}381\\mathbin{:}1000$.', 'Divide: a) $30{,}56\\mathbin{:}10$; b) $5{,}7\\mathbin{:}100$; c) $98{,}381\\mathbin{:}1000$.', 'اقسم: أ) $30{,}56\\mathbin{:}10$؛ ب) $5{,}7\\mathbin{:}100$؛ ج) $98{,}381\\mathbin{:}1000$.'), solution: same('a) $30{,}56\\mathbin{:}10=3{,}056$; b) $5{,}7\\mathbin{:}100=0{,}057$; c) $98{,}381\\mathbin{:}1000=0{,}098381$') },
            { id: 43, difficulty: 'easy', question: say('Txirrindulari batek 25 itzuli eman dizkio zirkuitu bati eta guztira 235 km egin ditu. Zenbat neurtzen du zirkuituak?', 'Un ciclista ha dado 25 vueltas a un circuito y ha recorrido 235 km en total. ¿Qué longitud tiene el circuito?', 'دار دراج 25 دورة حول حلبة وقطع 235 كم في المجموع. كم طول الحلبة؟'), solution: same('$235\\mathbin{:}25=9{,}4$'), answer: { expected: v('9,4') } },
            { id: 44, difficulty: 'medium', question: calculate('$1006\\mathbin{:}80$'), solution: same('$1006\\mathbin{:}80=12{,}575$'), answer: { expected: v('12,575') } },
            { id: 45, difficulty: 'medium', question: calculate('$9680\\mathbin{:}12{,}5$'), solution: same('$9680\\mathbin{:}12{,}5=96800\\mathbin{:}125=774{,}4$'), answer: { expected: v('774,4') } },
            { id: 46, difficulty: 'medium', question: say('Sei jogurteko pakete batek $0{,}678$ kg pisatzen du. Zenbat pisatzen du jogurt batek?', 'Un paquete de seis yogures pesa $0{,}678$ kg. ¿Cuánto pesa un yogur?', 'تزن علبة من ستة أكواب لبن $0{,}678$ كغ. كم يزن الكوب الواحد؟'), solution: same('$0{,}678\\mathbin{:}6=0{,}113$'), answer: { expected: v('0,113') } },
            { id: 47, difficulty: 'medium', question: say('Kalkulatu bi zifra hamartarrekin: a) $47\\mathbin{:}3$; b) $9\\mathbin{:}7$.', 'Calcula con dos cifras decimales: a) $47\\mathbin{:}3$; b) $9\\mathbin{:}7$.', 'احسب برقمين عشريين: أ) $47\\mathbin{:}3$؛ ب) $9\\mathbin{:}7$.'), solution: same('a) $47\\mathbin{:}3=15{,}66\\ldots$; b) $9\\mathbin{:}7=1{,}28\\ldots$') },
            { id: 48, difficulty: 'hard', question: calculate('$(73{,}4\\cdot 2{,}5)-(56{,}7+3{,}8)$'), solution: same('$73{,}4\\cdot 2{,}5=183{,}5\\qquad 56{,}7+3{,}8=60{,}5\\qquad 183{,}5-60{,}5=123$'), answer: { expected: fraction(123) } },
            { id: 49, difficulty: 'hard', question: say('Raquelek hiru azterketa egin ditu: $5{,}5$, $7$ eta $2{,}4$. Zein da bere batez besteko nota, ehunenetara biribilduta?', 'Raquel ha hecho tres exámenes: $5{,}5$, $7$ y $2{,}4$. ¿Cuál es su nota media, redondeada a las centésimas?', 'أجرت راكيل ثلاثة امتحانات: $5{,}5$ و$7$ و$2{,}4$. ما معدّلها مقرّبًا إلى الأجزاء من مئة؟'), solution: same('$5{,}5+7+2{,}4=14{,}9\\ \\to\\ 14{,}9\\mathbin{:}3=4{,}966\\ldots\\approx 4{,}97$'), answer: { expected: v('4,97') } },
            { id: 50, difficulty: 'hard', question: say('Rosak eta Javierrek erosi dute: 5 litro esne, $1{,}05$ € litroa; $0{,}92$ kg bakailao, $13{,}25$ €/kg; $2{,}85$ €-ko gaileta-pakete bat; eta kilo laurden urdaiazpiko, $38{,}40$ €/kg. Zenbat ordaindu dute?', 'Rosa y Javier compran: 5 litros de leche a $1{,}05$ € el litro; $0{,}92$ kg de bacalao a $13{,}25$ €/kg; un paquete de galletas de $2{,}85$ €, y un cuarto de kilo de jamón a $38{,}40$ €/kg. ¿Cuánto pagan?', 'اشترت روسا وخافيير: 5 لترات حليب بسعر $1{,}05$ € للتر؛ و$0{,}92$ كغ من سمك القد بسعر $13{,}25$ € للكيلو؛ وعلبة بسكويت بـ $2{,}85$ €؛ وربع كيلو لحم مقدّد بسعر $38{,}40$ € للكيلو. كم دفعا؟'), solution: same('$5\\cdot 1{,}05+0{,}92\\cdot 13{,}25+2{,}85+38{,}4\\mathbin{:}4=5{,}25+12{,}19+2{,}85+9{,}6=29{,}89$'), answer: { expected: v('29,89') } }
        ]
    }
]

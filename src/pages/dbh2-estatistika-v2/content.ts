import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Estatistika eta probabilitatea · 2. DBH — diagnostic, guided practice,
   exercise bank and challenges. Exercises follow Anaya 2.º ESO units 14–15
   and Santillana 2.º ESO unit 14 (the cinema snacks, the festival
   concerts, the guest house rooms, the heights of 24 students, the 35
   grades in a box plot, the animal shelter, the loaded coin, the game of
   two coins). Every closed answer is a single number or a fraction.
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
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

const HUNDREDTHS = say('Hurbildu ehunenetara.', 'Aproxima a las centésimas.', 'قرّب إلى الأجزاء من مئة.')
const AS_FRACTION = say('Eman zatiki gisa.', 'Dalo como fracción.', 'اكتبه كسرًا.')
/** A prompt followed by an instruction (rounding, fraction) */
const with_ = (prompt: LocalizedText, ...rules: LocalizedText[]): LocalizedText => ({
    eu: [prompt.eu, ...rules.map((rule) => rule.eu)].join(' '),
    es: [prompt.es, ...rules.map((rule) => rule.es)].join(' '),
    ar: [prompt.ar, ...rules.map((rule) => rule.ar)].join(' ')
})

/** The books table of the lessons, written in the prompts */
const BOOKS = say('Udan irakurritako liburuak: 0 → 3 ikasle, 1 → 6, 2 → 5, 3 → 4, 4 → 2.', 'Libros leídos en verano: 0 → 3 alumnos, 1 → 6, 2 → 5, 3 → 4, 4 → 2.', 'الكتب المقروءة في الصيف: 0 ← 3 تلاميذ، 1 ← 6، 2 ← 5، 3 ← 4، 4 ← 2.')
/** The heights table of the lessons */
const HEIGHTS = say('30 ikasleren altuerak (cm): $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6.', 'Alturas de 30 alumnos (cm): $[140,150)$ 3, $[150,160)$ 9, $[160,170)$ 12, $[170,180)$ 6.', 'أطوال 30 تلميذًا (سم): $[140,150)$ 3، $[150,160)$ 9، $[160,170)$ 12، $[170,180)$ 6.')
/** The animal shelter of Anaya */
const SHELTER = say('Babesleku batean: katu osasuntsuak 12, txakur osasuntsuak 17, katu gaixoak 4, txakur gaixoak 7.', 'En un refugio: gatos sanos 12, perros sanos 17, gatos enfermos 4, perros enfermos 7.', 'في ملجأ: قطط سليمة 12، كلاب سليمة 17، قطط مريضة 4، كلاب مريضة 7.')

export const statisticsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 1701,
        prompt: say('12 000 biztanleko herri baten iritzia jakin nahi da. Nori galdetu behar zaio?', 'Se quiere conocer la opinión de un pueblo de 12 000 habitantes. ¿A quién hay que preguntar?', 'نريد معرفة رأي بلدة سكانها 12000 نسمة. مَن نسأل؟'),
        options: [say('Futbol-taldeko jokalariei', 'A los jugadores del equipo de fútbol', 'لاعبي فريق كرة القدم'), say('Zoriz aukeratutako 400 biztanleri', 'A 400 habitantes elegidos al azar', '400 ساكن مختارين عشوائيًا'), say('Alkatearen familiari', 'A la familia del alcalde', 'عائلة رئيس البلدية')],
        correctIndex: 1,
        explanation: say('Populazioa handia da: lagin bat behar da, zoriz aukeratua. Beste biak lagin alboratuak dira.', 'La población es grande: hace falta una muestra elegida al azar. Las otras dos son muestras sesgadas.', 'المجتمع كبير: نحتاج إلى عيّنة عشوائية. والخياران الآخران عيّنتان متحيّزتان.'),
        topic: 'sample'
    },
    {
        id: 1702,
        prompt: with_(BOOKS, say('Zein da 2 balioaren maiztasun absolutu metatua?', '¿Cuál es la frecuencia absoluta acumulada del valor 2?', 'ما التكرار المطلق المتجمّع للقيمة 2؟')),
        options: [same('$5$'), same('$14$'), same('$9$')],
        correctIndex: 1,
        explanation: say('2 baliora arte metatu: $3+6+5=14$. 5 maiztasun absolutua da, eta 9 aurreko metatua.', 'Acumula hasta el valor 2: $3+6+5=14$. 5 es la frecuencia absoluta y 9 la acumulada anterior.', 'اجمع حتى القيمة 2: $3+6+5=14$. و5 هو التكرار المطلق و9 المتجمّع السابق.'),
        topic: 'cumulative'
    },
    {
        id: 1703,
        prompt: say('Zein da $[20,30)$ tartearen klase-marka?', '¿Cuál es la marca de clase del intervalo $[20,30)$?', 'ما مركز الفئة $[20,30)$؟'),
        options: [same('$25$'), same('$10$'), same('$30$')],
        correctIndex: 0,
        explanation: say('Muturren erdia: $\\frac{20+30}{2}=25$. 10 tartearen zabalera da.', 'La mitad de los extremos: $\\frac{20+30}{2}=25$. 10 es la amplitud del intervalo.', 'نصف مجموع الطرفين: $\\frac{20+30}{2}=25$. و10 طول الفئة.'),
        topic: 'grouped'
    },
    {
        id: 1704,
        prompt: say('Zergatik daude itsatsita histograma baten laukizuzenak, barra-diagraman ez bezala?', '¿Por qué están pegados los rectángulos de un histograma, a diferencia del diagrama de barras?', 'لماذا تكون مستطيلات المدرّج التكراري متلاصقة بخلاف مخطط الأعمدة؟'),
        options: [say('Itxura politagoa delako', 'Porque queda más bonito', 'لأنه أجمل'), say('Maiztasun guztiak berdinak direlako', 'Porque todas las frecuencias son iguales', 'لأن كل التكرارات متساوية'), say('Aldagaia jarraitua delako: tarteen artean ez dago hutsunerik', 'Porque la variable es continua: no hay huecos entre intervalos', 'لأن المتغير متصل: لا فراغ بين الفئات')],
        correctIndex: 2,
        explanation: say('Tarte bat amaitzen den lekuan hasten da hurrengoa: $[150,160)$ eta $[160,170)$.', 'Donde acaba un intervalo empieza el siguiente: $[150,160)$ y $[160,170)$.', 'حيث تنتهي فئة تبدأ التالية: $[150,160)$ و$[160,170)$.'),
        topic: 'histogram'
    },
    {
        id: 1705,
        prompt: say('Sektore-diagrama batean, zenbat gradu ditu datuen % 25eko sektoreak?', 'En un diagrama de sectores, ¿cuántos grados mide el sector del 25 % de los datos?', 'في مخطط دائري، كم درجة قطاع 25 % من البيانات؟'),
        options: [same('$25^{\\circ}$'), same('$90^{\\circ}$'), same('$75^{\\circ}$')],
        correctIndex: 1,
        explanation: say('% 1 = 3,6°: $25\\cdot 3{,}6=90$. Zirkuluaren laurdena da.', '1 % = 3,6°: $25\\cdot 3{,}6=90$. Es un cuarto del círculo.', '1 % = 3.6°: $25\\cdot 3{,}6=90$. إنه ربع الدائرة.'),
        topic: 'pie'
    },
    {
        id: 1706,
        prompt: say('Taula: 1 → 2 aldiz, 2 → 2 aldiz, 3 → behin. Zein da batez bestekoa?', 'Tabla: 1 → 2 veces, 2 → 2 veces, 3 → 1 vez. ¿Cuál es la media?', 'جدول: 1 ← مرتان، 2 ← مرتان، 3 ← مرة. ما المتوسط؟'),
        options: [same('$1{,}8$'), same('$2$'), same('$3$')],
        correctIndex: 0,
        explanation: say('Ez da 1, 2 eta 3ren batez bestekoa: $\\frac{1\\cdot 2+2\\cdot 2+3\\cdot 1}{5}=1{,}8$.', 'No es la media de 1, 2 y 3: $\\frac{1\\cdot 2+2\\cdot 2+3\\cdot 1}{5}=1{,}8$.', 'ليس متوسط 1 و2 و3: $\\frac{1\\cdot 2+2\\cdot 2+3\\cdot 1}{5}=1{,}8$.'),
        topic: 'mean-table'
    },
    {
        id: 1707,
        prompt: say('Datuen zein ehuneko dago lehen kuartilaren ($Q_1$) azpian?', '¿Qué porcentaje de los datos está por debajo del primer cuartil ($Q_1$)?', 'ما النسبة المئوية من البيانات التي تقع تحت الربيع الأول ($Q_1$)؟'),
        options: [same('$50\\,\\%$'), same('$75\\,\\%$'), same('$25\\,\\%$')],
        correctIndex: 2,
        explanation: say('$Q_1$: % 25; mediana: % 50; $Q_3$: % 75.', '$Q_1$: 25 %; mediana: 50 %; $Q_3$: 75 %.', '$Q_1$: 25 %؛ الوسيط: 50 %؛ $Q_3$: 75 %.'),
        topic: 'quartiles'
    },
    {
        id: 1708,
        prompt: say('Gertaera baten probabilitatea 0,3 da. Zein da haren aurkakoaren probabilitatea?', 'La probabilidad de un suceso es 0,3. ¿Cuál es la probabilidad de su contrario?', 'احتمال حدث 0.3. ما احتمال معاكسه؟'),
        options: [same('$0{,}3$'), same('$0{,}7$'), same('$1{,}3$')],
        correctIndex: 1,
        explanation: say('$1-0{,}3=0{,}7$. Probabilitate bat ezin da 1 baino handiagoa izan.', '$1-0{,}3=0{,}7$. Una probabilidad no puede ser mayor que 1.', '$1-0{,}3=0{,}7$. لا يمكن أن يتجاوز الاحتمال 1.'),
        topic: 'events'
    }
]

export const statisticsPractice: PracticeItem[] = [
    /* ---------- Data and tables ---------- */
    {
        id: 1, stage: 'tables',
        prompt: with_(BOOKS, say('Zein da 3 balioaren maiztasun absolutu metatua?', '¿Cuál es la frecuencia absoluta acumulada del valor 3?', 'ما التكرار المطلق المتجمّع للقيمة 3؟')),
        expected: n(18),
        hint: say('Batu 3 baliora arteko maiztasun guztiak.', 'Suma todas las frecuencias hasta el valor 3.', 'اجمع كل التكرارات حتى القيمة 3.'),
        explanation: same('$3+6+5+4=18$')
    },
    {
        id: 2, stage: 'tables',
        prompt: with_(BOOKS, say('Zein da 1 balioaren maiztasun erlatibo metatua?', '¿Cuál es la frecuencia relativa acumulada del valor 1?', 'ما التكرار النسبي المتجمّع للقيمة 1؟')),
        expected: v('0,45'),
        hint: say('Lehenik $F_i$, gero zati $N=20$.', 'Primero $F_i$, luego entre $N=20$.', 'أولًا $F_i$ ثم على $N=20$.'),
        explanation: same('$\\frac{3+6}{20}=0{,}45$')
    },
    {
        id: 3, stage: 'tables',
        prompt: say('Zein da $[150,160)$ tartearen klase-marka?', '¿Cuál es la marca de clase del intervalo $[150,160)$?', 'ما مركز الفئة $[150,160)$؟'),
        expected: n(155),
        hint: say('Muturren batura zati 2.', 'La suma de los extremos entre 2.', 'مجموع الطرفين على 2.'),
        explanation: same('$\\frac{150+160}{2}=155$')
    },
    {
        id: 4, stage: 'tables',
        prompt: with_(HEIGHTS, say('Zenbat ikaslek neurtzen dute 160 cm edo gehiago?', '¿Cuántos alumnos miden 160 cm o más?', 'كم تلميذًا طوله 160 سم أو أكثر؟')),
        expected: n(18),
        hint: say('160 $[160,170)$ tartean sartzen da.', 'El 160 entra en el intervalo $[160,170)$.', 'العدد 160 يدخل في الفئة $[160,170)$.'),
        explanation: same('$12+6=18$')
    },

    /* ---------- Graphs ---------- */
    {
        id: 5, stage: 'graphs',
        prompt: say('Ikasleen % 30 autobusez etortzen da. Zenbat gradu ditu haien sektoreak?', 'El 30 % de los alumnos viene en autobús. ¿Cuántos grados mide su sector?', '30 % من التلاميذ يأتون بالحافلة. كم درجة قطاعهم؟'),
        expected: n(108),
        hint: say('% 1 = 3,6°.', '1 % = 3,6°.', '1 % = 3.6°.'),
        explanation: same('$30\\cdot 3{,}6=108$')
    },
    {
        id: 6, stage: 'graphs',
        prompt: say('Sektore batek 72° ditu. Datuen zein ehuneko da?', 'Un sector mide 72°. ¿Qué porcentaje de los datos es?', 'قطاع قياسه 72°. ما النسبة المئوية من البيانات؟'),
        expected: n(20),
        hint: say('Zatitu 360z eta biderkatu 100ez.', 'Divide entre 360 y multiplica por 100.', 'اقسم على 360 واضرب في 100.'),
        explanation: same('$\\frac{72}{360}\\cdot 100=20$')
    },
    {
        id: 7, stage: 'graphs',
        prompt: say('60 pertsonari egindako inkesta batean, sektore batek 90° ditu. Zenbat pertsona dira?', 'En una encuesta a 60 personas, un sector mide 90°. ¿Cuántas personas son?', 'في استبيان لـ60 شخصًا، قياس قطاع 90°. كم شخصًا يمثّل؟'),
        expected: n(15),
        hint: say('90° zirkuluaren laurdena da.', '90° es un cuarto del círculo.', '90° ربع الدائرة.'),
        explanation: same('$\\frac{90}{360}\\cdot 60=15$')
    },
    {
        id: 8, stage: 'graphs',
        prompt: with_(HEIGHTS, say('Histograman, zenbat ikasle daude 150 eta 170 cm artean?', 'En el histograma, ¿cuántos alumnos hay entre 150 y 170 cm?', 'في المدرّج التكراري، كم تلميذًا بين 150 و170 سم؟')),
        expected: n(21),
        hint: say('Bi laukizuzenen altuerak batu.', 'Suma las alturas de dos rectángulos.', 'اجمع ارتفاعي مستطيلين.'),
        explanation: same('$9+12=21$')
    },

    /* ---------- Centralization ---------- */
    {
        id: 9, stage: 'centre',
        prompt: say('Taula: 1 → 4, 2 → 3, 3 → 2, 4 → 1. Kalkulatu batez bestekoa.', 'Tabla: 1 → 4, 2 → 3, 3 → 2, 4 → 1. Calcula la media.', 'جدول: 1 ← 4، 2 ← 3، 3 ← 2، 4 ← 1. احسب المتوسط.'),
        expected: n(2),
        hint: say('$\\sum x_i f_i$ zati $N$.', '$\\sum x_i f_i$ entre $N$.', '$\\sum x_i f_i$ على $N$.'),
        explanation: same('$\\frac{1\\cdot 4+2\\cdot 3+3\\cdot 2+4\\cdot 1}{10}=2$')
    },
    {
        id: 10, stage: 'centre',
        prompt: say('Taula: 0 → 1, 1 → 4, 2 → 3, 3 → 2. Aurkitu mediana.', 'Tabla: 0 → 1, 1 → 4, 2 → 3, 3 → 2. Halla la mediana.', 'جدول: 0 ← 1، 1 ← 4، 2 ← 3، 3 ← 2. أوجد الوسيط.'),
        expected: v('1,5'),
        hint: say('$N=10$: 5. eta 6. datuak. Metatuak: 1, 5, 9, 10.', '$N=10$: datos 5.º y 6.º. Acumuladas: 1, 5, 9, 10.', '$N=10$: البيانان 5 و6. المتجمّعة: 1، 5، 9، 10.'),
        explanation: say('5. datua 1 da eta 6.a 2: $\\frac{1+2}{2}=1{,}5$.', 'El 5.º dato es 1 y el 6.º es 2: $\\frac{1+2}{2}=1{,}5$.', 'البيان الخامس 1 والسادس 2: $\\frac{1+2}{2}=1{,}5$.')
    },
    {
        id: 11, stage: 'centre',
        prompt: say('Datu multzokatuak: $[0,10)$ 2, $[10,20)$ 5, $[20,30)$ 3. Kalkulatu batez bestekoa.', 'Datos agrupados: $[0,10)$ 2, $[10,20)$ 5, $[20,30)$ 3. Calcula la media.', 'بيانات مبوّبة: $[0,10)$ 2، $[10,20)$ 5، $[20,30)$ 3. احسب المتوسط.'),
        expected: n(16),
        hint: say('Erabili klase-markak: 5, 15, 25.', 'Usa las marcas de clase: 5, 15, 25.', 'استعمل مراكز الفئات: 5، 15، 25.'),
        explanation: same('$\\frac{5\\cdot 2+15\\cdot 5+25\\cdot 3}{10}=16$')
    },
    {
        id: 12, stage: 'centre',
        prompt: say('Datuak: 2, 3, 3, 4, 38. Zenbat da batez bestekoaren eta medianaren arteko aldea?', 'Datos: 2, 3, 3, 4, 38. ¿Cuánto es la diferencia entre la media y la mediana?', 'البيانات: 2، 3، 3، 4، 38. كم الفرق بين المتوسط والوسيط؟'),
        expected: n(7),
        hint: say('Mediana 3 da; 38ak batez bestekoa gora eramaten du.', 'La mediana es 3; el 38 tira de la media hacia arriba.', 'الوسيط 3؛ والعدد 38 يرفع المتوسط.'),
        explanation: same('$\\frac{2+3+3+4+38}{5}=10\\qquad 10-3=7$')
    },

    /* ---------- Dispersion and position ---------- */
    {
        id: 13, stage: 'spread',
        prompt: say('Kalkulatu ibiltartea: 12, 7, 15, 9, 20.', 'Calcula el recorrido de: 12, 7, 15, 9, 20.', 'احسب مدى: 12، 7، 15، 9، 20.'),
        expected: n(13),
        hint: say('Handiena ken txikiena.', 'El mayor menos el menor.', 'الأكبر ناقص الأصغر.'),
        explanation: same('$20-7=13$')
    },
    {
        id: 14, stage: 'spread',
        prompt: say('Kalkulatu 2, 4, 6, 8 datuen batez besteko desbideratzea.', 'Calcula la desviación media de los datos 2, 4, 6, 8.', 'احسب الانحراف المتوسط للبيانات 2، 4، 6، 8.'),
        expected: n(2),
        hint: say('Batez bestekoa 5 da; distantziak 3, 1, 1, 3.', 'La media es 5; las distancias, 3, 1, 1, 3.', 'المتوسط 5؛ والمسافات 3، 1، 1، 3.'),
        explanation: same('$\\frac{2+4+6+8}{4}=5\\qquad \\frac{3+1+1+3}{4}=2$')
    },
    {
        id: 15, stage: 'spread',
        prompt: say('Aurkitu lehen kuartila: 3, 5, 6, 8, 9, 11, 12.', 'Halla el primer cuartil de: 3, 5, 6, 8, 9, 11, 12.', 'أوجد الربيع الأول لـ: 3، 5، 6، 8، 9، 11، 12.'),
        expected: n(5),
        hint: say('Mediana 8 da; begiratu azpiko hiru datuei.', 'La mediana es 8; mira los tres datos de abajo.', 'الوسيط 8؛ انظر إلى البيانات الثلاثة الدنيا.'),
        explanation: say('Beheko erdia 3, 5, 6 da, eta haren erdikoa $Q_1=5$.', 'La mitad de abajo es 3, 5, 6, y su central es $Q_1=5$.', 'النصف الأدنى 3، 5، 6، وأوسطه $Q_1=5$.')
    },
    {
        id: 16, stage: 'spread',
        prompt: say('Kutxa-diagrama batean $Q_1=4$ eta $Q_3=9$. Zenbat neurtzen du kutxak?', 'En un diagrama de caja $Q_1=4$ y $Q_3=9$. ¿Cuánto mide la caja?', 'في مخطط صندوق $Q_1=4$ و$Q_3=9$. كم طول الصندوق؟'),
        expected: n(5),
        hint: say('Kutxa $Q_1$-etik $Q_3$-ra doa.', 'La caja va de $Q_1$ a $Q_3$.', 'يمتد الصندوق من $Q_1$ إلى $Q_3$.'),
        explanation: same('$9-4=5$')
    },

    /* ---------- Chance ---------- */
    {
        id: 17, stage: 'chance',
        prompt: with_(say('Dado bat jaurtitzen da. Zein da 6 ez ateratzeko probabilitatea?', 'Se lanza un dado. ¿Cuál es la probabilidad de no sacar un 6?', 'يُرمى نرد. ما احتمال ألّا يظهر 6؟'), AS_FRACTION),
        expected: f(5, 6),
        hint: say('Aurkako gertaera: $1-P(6)$.', 'Suceso contrario: $1-P(6)$.', 'الحدث المعاكس: $1-P(6)$.'),
        explanation: same('$1-\\frac{1}{6}=\\frac{5}{6}$')
    },
    {
        id: 18, stage: 'chance',
        prompt: with_(say('Bi txanpon botatzen dira. Zein da bi aurpegi ateratzeko probabilitatea?', 'Se lanzan dos monedas. ¿Cuál es la probabilidad de sacar dos caras?', 'تُرمى قطعتا نقود. ما احتمال ظهور وجهين؟'), AS_FRACTION),
        expected: f(1, 4),
        hint: say('Zuhaitza: 4 emaitza.', 'Árbol: 4 resultados.', 'الشجرة: 4 نتائج.'),
        explanation: say('Lau emaitzatik bakarra da aldekoa: $\\frac{1}{4}$.', 'De los cuatro resultados solo uno es favorable: $\\frac{1}{4}$.', 'من النتائج الأربع واحدة فقط ملائمة: $\\frac{1}{4}$.')
    },
    {
        id: 19, stage: 'chance',
        prompt: with_(say('Bi dado jaurtitzen dira. Zein da 7 batzeko probabilitatea?', 'Se lanzan dos dados. ¿Cuál es la probabilidad de que sumen 7?', 'يُرمى نردان. ما احتمال أن يكون المجموع 7؟'), AS_FRACTION),
        expected: f(1, 6),
        hint: say('36 gelaxkako taula; 7 batzen dutenak: 1+6, 2+5, 3+4…', 'Tabla de 36 casillas; suman 7: 1+6, 2+5, 3+4…', 'جدول من 36 خانة؛ مجموعها 7: 1+6، 2+5، 3+4…'),
        explanation: same('$\\frac{6}{36}=\\frac{1}{6}$')
    },
    {
        id: 20, stage: 'chance',
        prompt: with_(say('Klase batean 16 neska daude (6 futbolean) eta 14 mutil (8 futbolean). Ikasle bat zoriz hartuta, zein da futbolean jokatzeko probabilitatea?', 'En una clase hay 16 chicas (6 juegan al fútbol) y 14 chicos (8 juegan al fútbol). Tomando un alumno al azar, ¿cuál es la probabilidad de que juegue al fútbol?', 'في قسم 16 بنتًا (6 يلعبن كرة القدم) و14 ولدًا (8 يلعبون كرة القدم). إذا اخترنا تلميذًا عشوائيًا، ما احتمال أن يلعب كرة القدم؟'), AS_FRACTION),
        expected: f(7, 15),
        hint: say('Aldekoak: futbolean jokatzen duten guztiak. Posibleak: 30.', 'Favorables: todos los que juegan al fútbol. Posibles: 30.', 'الملائمة: كل من يلعب كرة القدم. الممكنة: 30.'),
        explanation: same('$\\frac{6+8}{30}=\\frac{7}{15}$')
    }
]

export const statisticsChallenges: ChallengeItem[] = [
    {
        id: 101, stage: 'tables', points: 10, context: 'starter',
        prompt: say('Maiztasun absolutu metatuak 4, 10, 18 eta 25 dira. Zein da hirugarren balioaren maiztasun absolutua?', 'Las frecuencias absolutas acumuladas son 4, 10, 18 y 25. ¿Cuál es la frecuencia absoluta del tercer valor?', 'التكرارات المطلقة المتجمّعة 4 و10 و18 و25. ما التكرار المطلق للقيمة الثالثة؟'),
        expected: n(8),
        hint: say('Metatu bat ken aurrekoa.', 'Una acumulada menos la anterior.', 'متجمّع ناقص السابق.'),
        explanation: same('$18-10=8$')
    },
    {
        id: 102, stage: 'tables', points: 20, context: 'advanced',
        prompt: say('40 datuko taula batean, bigarren balioaren maiztasun erlatibo metatua 0,35 da. Zenbat datu daude bigarren baliora arte?', 'En una tabla de 40 datos, la frecuencia relativa acumulada del segundo valor es 0,35. ¿Cuántos datos hay hasta el segundo valor?', 'في جدول من 40 بيانًا، التكرار النسبي المتجمّع للقيمة الثانية 0.35. كم بيانًا حتى القيمة الثانية؟'),
        expected: n(14),
        hint: say('$F_i=H_i\\cdot N$.', '$F_i=H_i\\cdot N$.', '$F_i=H_i\\cdot N$.'),
        explanation: same('$0{,}35\\cdot 40=14$')
    },
    {
        id: 103, stage: 'tables', points: 30, context: 'master',
        prompt: say('Zabalera bereko tarteen klase-markak 15, 25 eta 35 dira. Zein da lehen tartearen beheko muga?', 'Las marcas de clase de unos intervalos de igual amplitud son 15, 25 y 35. ¿Cuál es el límite inferior del primer intervalo?', 'مراكز فئات متساوية الطول هي 15 و25 و35. ما الحد الأدنى للفئة الأولى؟'),
        expected: n(10),
        hint: say('Zabalera 10 da, eta klase-marka tartearen erdian dago.', 'La amplitud es 10 y la marca de clase está en el centro del intervalo.', 'طول الفئة 10، ومركز الفئة في منتصفها.'),
        explanation: same('$15-\\frac{10}{2}=10$')
    },
    {
        id: 104, stage: 'graphs', points: 10, context: 'starter',
        prompt: say('200 pertsonari egindako inkesta batean, sektore batek 54° ditu. Zenbat pertsona dira?', 'En una encuesta a 200 personas, un sector mide 54°. ¿Cuántas personas son?', 'في استبيان لـ200 شخص، قياس قطاع 54°. كم شخصًا يمثّل؟'),
        expected: n(30),
        hint: say('Angelua zati 360: maiztasun erlatiboa.', 'El ángulo entre 360: la frecuencia relativa.', 'الزاوية على 360: التكرار النسبي.'),
        explanation: same('$\\frac{54}{360}\\cdot 200=30$')
    },
    {
        id: 105, stage: 'graphs', points: 20, context: 'advanced',
        prompt: say('Sektore-diagrama batek lau sektore ditu: 120°, 90°, 60° eta laugarren bat. Zenbat gradu ditu laugarrenak?', 'Un diagrama de sectores tiene cuatro sectores: 120°, 90°, 60° y un cuarto. ¿Cuántos grados mide el cuarto?', 'مخطط دائري فيه أربعة قطاعات: 120° و90° و60° ورابع. كم درجة الرابع؟'),
        expected: n(90),
        hint: say('Guztien batura 360° da.', 'Todos suman 360°.', 'مجموعها كلها 360°.'),
        explanation: same('$360-120-90-60=90$')
    },
    {
        id: 106, stage: 'graphs', points: 30, context: 'master',
        prompt: say('Barra-grafiko batean ardatz bertikala 2900etik hasten da, eta barrek 3000 eta 3200 adierazten dituzte. Zenbat aldiz altuagoa dirudi bigarren barrak?', 'En un gráfico de barras el eje vertical empieza en 2900 y las barras marcan 3000 y 3200. ¿Cuántas veces más alta parece la segunda barra?', 'في مخطط أعمدة يبدأ المحور الرأسي من 2900، والعمودان يمثّلان 3000 و3200. كم مرة يبدو العمود الثاني أطول؟'),
        expected: n(3),
        hint: say('Marraztutako altuera 2900etik neurtzen da.', 'La altura dibujada se mide desde 2900.', 'الارتفاع المرسوم يُقاس من 2900.'),
        explanation: same('$\\frac{3200-2900}{3000-2900}=3$')
    },
    {
        id: 107, stage: 'centre', points: 10, context: 'starter',
        prompt: say('Bost zenbakiren batez bestekoa 6 da. Lau zenbaki 4, 5, 7 eta 8 dira. Zein da bosgarrena?', 'La media de cinco números es 6. Cuatro son 4, 5, 7 y 8. ¿Cuál es el quinto?', 'متوسط خمسة أعداد 6. أربعة منها 4 و5 و7 و8. ما الخامس؟'),
        expected: n(6),
        hint: say('Bosten batura: $5\\cdot 6=30$.', 'La suma de los cinco: $5\\cdot 6=30$.', 'مجموع الخمسة: $5\\cdot 6=30$.'),
        explanation: same('$5\\cdot 6-(4+5+7+8)=6$')
    },
    {
        id: 108, stage: 'centre', points: 20, context: 'advanced',
        prompt: say('Talde batean 30 ikaslek 6ko batez bestekoa dute, eta beste batean 20 ikaslek 7,5ekoa. Zein da 50 ikasleen batez bestekoa?', 'En un grupo 30 alumnos tienen media 6, y en otro 20 alumnos tienen media 7,5. ¿Cuál es la media de los 50?', 'في مجموعة متوسط 30 تلميذًا 6، وفي أخرى متوسط 20 تلميذًا 7.5. ما متوسط الخمسين؟'),
        expected: v('6,6'),
        hint: say('Ez da 6 eta 7,5en batez bestekoa: talde handiak gehiago pisatzen du.', 'No es la media de 6 y 7,5: el grupo grande pesa más.', 'ليس متوسط 6 و7.5: المجموعة الكبرى أثقل وزنًا.'),
        explanation: same('$\\frac{30\\cdot 6+20\\cdot 7{,}5}{50}=6{,}6$')
    },
    {
        id: 109, stage: 'centre', points: 30, context: 'master',
        prompt: say('Datu multzokatuak: $[0,4)$ 6, $[4,8)$ 10, $[8,12)$ 4. Kalkulatu batez bestekoa.', 'Datos agrupados: $[0,4)$ 6, $[4,8)$ 10, $[8,12)$ 4. Calcula la media.', 'بيانات مبوّبة: $[0,4)$ 6، $[4,8)$ 10، $[8,12)$ 4. احسب المتوسط.'),
        expected: v('5,6'),
        hint: say('Klase-markak: 2, 6, 10.', 'Marcas de clase: 2, 6, 10.', 'مراكز الفئات: 2، 6، 10.'),
        explanation: same('$\\frac{2\\cdot 6+6\\cdot 10+10\\cdot 4}{20}=5{,}6$')
    },
    {
        id: 110, stage: 'spread', points: 10, context: 'starter',
        prompt: say('Datu batzuen ibiltartea 15 da eta txikiena 48. Zein da handiena?', 'El recorrido de unos datos es 15 y el menor es 48. ¿Cuál es el mayor?', 'مدى بيانات 15 وأصغرها 48. ما أكبرها؟'),
        expected: n(63),
        hint: say('Ibiltartea = handiena − txikiena.', 'Recorrido = mayor − menor.', 'المدى = الأكبر − الأصغر.'),
        explanation: same('$48+15=63$')
    },
    {
        id: 111, stage: 'spread', points: 20, context: 'advanced',
        prompt: say('Taula: 1 → 2, 2 → 6, 3 → 2. Kalkulatu batez besteko desbideratzea.', 'Tabla: 1 → 2, 2 → 6, 3 → 2. Calcula la desviación media.', 'جدول: 1 ← 2، 2 ← 6، 3 ← 2. احسب الانحراف المتوسط.'),
        expected: v('0,4'),
        hint: say('Batez bestekoa 2 da; distantziak 1, 0, 1, bakoitza bere maiztasunarekin.', 'La media es 2; las distancias, 1, 0, 1, cada una con su frecuencia.', 'المتوسط 2؛ والمسافات 1، 0، 1، كل منها بتكرارها.'),
        explanation: same('$\\frac{1\\cdot 2+0\\cdot 6+1\\cdot 2}{10}=0{,}4$')
    },
    {
        id: 112, stage: 'spread', points: 30, context: 'master',
        prompt: say('Aurkitu hirugarren kuartila: 2, 4, 5, 7, 8, 10, 12, 15.', 'Halla el tercer cuartil de: 2, 4, 5, 7, 8, 10, 12, 15.', 'أوجد الربيع الثالث لـ: 2، 4، 5، 7، 8، 10، 12، 15.'),
        expected: n(11),
        hint: say('Goiko erdia: 8, 10, 12, 15. Bikoitia da.', 'La mitad de arriba: 8, 10, 12, 15. Es par.', 'النصف الأعلى: 8، 10، 12، 15. عدده زوجي.'),
        explanation: same('$\\frac{10+12}{2}=11$')
    },
    {
        id: 113, stage: 'chance', points: 10, context: 'starter',
        prompt: say('Txanpon trukatu bat 1000 aldiz bota da, eta aurpegia ateratzeko probabilitatea 0,35 dela kalkulatu da. Zein da gurutzea ateratzekoa?', 'Se ha lanzado 1000 veces una moneda trucada y se estima que la probabilidad de cara es 0,35. ¿Cuál es la de cruz?', 'رُميت قطعة نقود مغشوشة 1000 مرة، وقُدّر احتمال الوجه بـ0.35. ما احتمال الظهر؟'),
        expected: v('0,65'),
        hint: say('Aurkako gertaera.', 'Suceso contrario.', 'الحدث المعاكس.'),
        explanation: same('$1-0{,}35=0{,}65$')
    },
    {
        id: 114, stage: 'chance', points: 20, context: 'advanced',
        prompt: with_(say('Hiru txanpon botatzen dira. Zein da gutxienez bi aurpegi ateratzeko probabilitatea?', 'Se lanzan tres monedas. ¿Cuál es la probabilidad de sacar al menos dos caras?', 'تُرمى ثلاث قطع نقود. ما احتمال ظهور وجهين على الأقل؟'), AS_FRACTION),
        expected: f(1, 2),
        hint: say('8 emaitza; bi aurpegi (3) edo hiru (1).', '8 resultados; dos caras (3) o tres (1).', '8 نتائج؛ وجهان (3) أو ثلاثة (1).'),
        explanation: same('$\\frac{3+1}{8}=\\frac{1}{2}$')
    },
    {
        id: 115, stage: 'chance', points: 30, context: 'master',
        prompt: with_(SHELTER, say('Txakurra dela jakinda, zein da gaixorik egoteko probabilitatea?', 'Sabiendo que es un perro, ¿cuál es la probabilidad de que esté enfermo?', 'علمًا أنه كلب، ما احتمال أن يكون مريضًا؟'), AS_FRACTION),
        expected: f(7, 24),
        hint: say('Kasu posibleak txakurrak bakarrik dira.', 'Los casos posibles son solo los perros.', 'الحالات الممكنة هي الكلاب فقط.'),
        explanation: same('$\\frac{7}{17+7}=\\frac{7}{24}$')
    }
]

export const statisticsExerciseBank: ExerciseSection[] = [
    {
        id: 'tables',
        title: say('Datuak eta taulak', 'Datos y tablas', 'البيانات والجداول'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Sailkatu aldagaiak: oinetakoen zenbakia, begien kolorea eta eskola-motxilaren pisua.', 'Clasifica las variables: número de calzado, color de ojos y peso de la mochila escolar.', 'صنّف المتغيرات: مقاس الحذاء، لون العينين، وزن الحقيبة المدرسية.'), solution: say('Oinetakoen zenbakia kuantitatibo diskretua da (zenbatu egiten da), begien kolorea kualitatiboa eta motxilaren pisua kuantitatibo jarraitua (neurtu egiten da).', 'El número de calzado es cuantitativa discreta (se cuenta), el color de ojos cualitativa y el peso de la mochila cuantitativa continua (se mide).', 'مقاس الحذاء كمي منفصل (يُعَدّ)، ولون العينين نوعي، ووزن الحقيبة كمي متصل (يُقاس).') },
            { id: 2, difficulty: 'easy', question: say('Populazio osoa ala lagina? a) Klaseko ikasleen altuera. b) Hiri bateko biztanleen telebista-ohiturak.', '¿Población o muestra? a) La altura de los alumnos de la clase. b) Los hábitos televisivos de los habitantes de una ciudad.', 'المجتمع كله أم عيّنة؟ أ) أطوال تلاميذ القسم. ب) عادات مشاهدة التلفاز لسكان مدينة.'), solution: say('a) Populazio osoa: taldea txikia da. b) Lagina: biztanle asko daude; zoriz aukeratu eta adin eta auzo guztietakoak hartu behar dira.', 'a) Población: el grupo es pequeño. b) Muestra: hay muchos habitantes; hay que elegirlos al azar y de todas las edades y barrios.', 'أ) المجتمع كله: المجموعة صغيرة. ب) عيّنة: السكان كثيرون؛ يجب اختيارهم عشوائيًا ومن كل الأعمار والأحياء.') },
            { id: 3, difficulty: 'easy', question: say('Maiztasun absolutuak 2, 5, 8, 4 eta 1 dira. Zein da azken maiztasun absolutu metatua?', 'Las frecuencias absolutas son 2, 5, 8, 4 y 1. ¿Cuál es la última frecuencia absoluta acumulada?', 'التكرارات المطلقة 2 و5 و8 و4 و1. ما آخر تكرار مطلق متجمّع؟'), solution: say('Azkena beti $N$ da: $2+5+8+4+1=20$.', 'La última es siempre $N$: $2+5+8+4+1=20$.', 'الأخير دائمًا $N$: $2+5+8+4+1=20$.'), answer: { expected: n(20) } },
            { id: 4, difficulty: 'easy', question: say('Zein da $[60,70)$ tartearen klase-marka?', '¿Cuál es la marca de clase del intervalo $[60,70)$?', 'ما مركز الفئة $[60,70)$؟'), solution: same('$\\frac{60+70}{2}=65$'), answer: { expected: n(65) } },
            { id: 5, difficulty: 'medium', question: say('Azterketa bateko notak: 3 → 4 ikasle, 4 → 3, 5 → 3, 6 → 5, 7 → 6, 8 → 4, 9 → 2, 10 → 1. Ikasleen zein ehunekok ez du gainditu (5 baino gutxiago)?', 'Notas de un examen: 3 → 4 alumnos, 4 → 3, 5 → 3, 6 → 5, 7 → 6, 8 → 4, 9 → 2, 10 → 1. ¿Qué porcentaje de alumnos ha suspendido (menos de 5)?', 'علامات امتحان: 3 ← 4 تلاميذ، 4 ← 3، 5 ← 3، 6 ← 5، 7 ← 6، 8 ← 4، 9 ← 2، 10 ← 1. ما النسبة المئوية من التلاميذ الراسبين (أقل من 5)؟'), solution: say('$N=28$. 4 notaren maiztasun erlatibo metatua: $\\frac{4+3}{28}=0{,}25$, hau da, % 25.', '$N=28$. La frecuencia relativa acumulada del 4: $\\frac{4+3}{28}=0{,}25$, es decir, el 25 %.', '$N=28$. التكرار النسبي المتجمّع للعلامة 4: $\\frac{4+3}{28}=0{,}25$، أي 25 %.'), answer: { expected: n(25) } },
            { id: 6, difficulty: 'medium', question: say('Maiztasun absolutu metatuak 5, 13, 19, 27 eta 30 dira. Zein da laugarren balioaren maiztasun absolutua?', 'Las frecuencias absolutas acumuladas son 5, 13, 19, 27 y 30. ¿Cuál es la frecuencia absoluta del cuarto valor?', 'التكرارات المطلقة المتجمّعة 5 و13 و19 و27 و30. ما التكرار المطلق للقيمة الرابعة؟'), solution: same('$27-19=8$'), answer: { expected: n(8) } },
            { id: 7, difficulty: 'medium', question: say('Etxetik ikastetxera behar diren minutuak: 12, 25, 31, 8, 17, 22, 35, 14, 28, 19, 9, 24, 33, 16, 21, 27, 11, 38, 23, 30. Multzokatu $[0,10)$, $[10,20)$, $[20,30)$ eta $[30,40)$ tartetan. Zenbat datu daude $[20,30)$ tartean?', 'Minutos de casa al instituto: 12, 25, 31, 8, 17, 22, 35, 14, 28, 19, 9, 24, 33, 16, 21, 27, 11, 38, 23, 30. Agrúpalos en $[0,10)$, $[10,20)$, $[20,30)$ y $[30,40)$. ¿Cuántos datos hay en $[20,30)$?', 'دقائق الطريق من البيت إلى المدرسة: 12، 25، 31، 8، 17، 22، 35، 14، 28، 19، 9، 24، 33، 16، 21، 27، 11، 38، 23، 30. بوّبها في $[0,10)$ و$[10,20)$ و$[20,30)$ و$[30,40)$. كم بيانًا في $[20,30)$؟'), solution: say('Maiztasunak 2, 6, 7 eta 5 dira ($2+6+7+5=20$). $[20,30)$ tartean: 25, 22, 28, 24, 21, 27 eta 23, beraz 7.', 'Las frecuencias son 2, 6, 7 y 5 ($2+6+7+5=20$). En $[20,30)$: 25, 22, 28, 24, 21, 27 y 23, así que 7.', 'التكرارات 2 و6 و7 و5 ($2+6+7+5=20$). في $[20,30)$: 25، 22، 28، 24، 21، 27، 23، أي 7.'), answer: { expected: n(7) } },
            { id: 8, difficulty: 'medium', question: say('50 datuko taula batean, hirugarren balioaren maiztasun erlatibo metatua 0,6 da. Zenbat datu daude hirugarren balioa baino handiago?', 'En una tabla de 50 datos, la frecuencia relativa acumulada del tercer valor es 0,6. ¿Cuántos datos son mayores que el tercer valor?', 'في جدول من 50 بيانًا، التكرار النسبي المتجمّع للقيمة الثالثة 0.6. كم بيانًا أكبر من القيمة الثالثة؟'), solution: same('$50-0{,}6\\cdot 50=20$'), answer: { expected: n(20) } },
            { id: 9, difficulty: 'hard', question: say('30 datuko taula batean $f_1=4$, $F_2=10$, $h_3=0{,}2$ eta $F_4=27$. Zein da hirugarren balioaren maiztasun absolutua? Eta bosgarrenarena, azkena bada? Idatzi hirugarrenarena.', 'En una tabla de 30 datos $f_1=4$, $F_2=10$, $h_3=0{,}2$ y $F_4=27$. ¿Cuál es la frecuencia absoluta del tercer valor? ¿Y la del quinto, si es el último? Escribe la del tercero.', 'في جدول من 30 بيانًا $f_1=4$ و$F_2=10$ و$h_3=0{,}2$ و$F_4=27$. ما التكرار المطلق للقيمة الثالثة؟ وللخامسة إذا كانت الأخيرة؟ اكتب تكرار الثالثة.'), solution: say('$f_3=0{,}2\\cdot 30=6$. Bosgarrena: $30-27=3$.', '$f_3=0{,}2\\cdot 30=6$. El quinto: $30-27=3$.', '$f_3=0{,}2\\cdot 30=6$. والخامس: $30-27=3$.'), answer: { expected: n(6) } },
            { id: 10, difficulty: 'hard', question: say('Datuak 20tik 70era doaz, eta zabalera bereko 5 tartetan multzokatu nahi dira. Zein da hirugarren tartearen klase-marka?', 'Los datos van de 20 a 70 y se quieren agrupar en 5 intervalos de igual amplitud. ¿Cuál es la marca de clase del tercer intervalo?', 'تمتد البيانات من 20 إلى 70، ونريد تبويبها في 5 فئات متساوية الطول. ما مركز الفئة الثالثة؟'), solution: say('Zabalera: $\\frac{70-20}{5}=10$. Hirugarren tartea $[40,50)$: $\\frac{40+50}{2}=45$.', 'Amplitud: $\\frac{70-20}{5}=10$. El tercer intervalo es $[40,50)$: $\\frac{40+50}{2}=45$.', 'الطول: $\\frac{70-20}{5}=10$. الفئة الثالثة $[40,50)$: $\\frac{40+50}{2}=45$.'), answer: { expected: n(45) } }
        ]
    },
    {
        id: 'graphs',
        title: say('Grafikoak', 'Gráficos', 'التمثيلات البيانية'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Zenbat gradu ditu datuen % 25eko sektoreak?', '¿Cuántos grados mide el sector del 25 % de los datos?', 'كم درجة قطاع 25 % من البيانات؟'), solution: same('$25\\cdot 3{,}6=90$'), answer: { expected: n(90) } },
            { id: 12, difficulty: 'easy', question: say('Zein grafiko erabiliko zenuke a) klaseko kirol gogokoenetarako, b) 30 ikasleren altuera tartetan multzokatuetarako, c) aste bateko tenperaturetarako?', '¿Qué gráfico usarías para a) el deporte favorito de la clase, b) las alturas de 30 alumnos agrupadas en intervalos, c) las temperaturas de una semana?', 'أي تمثيل تستعمل لـ أ) الرياضة المفضلة في القسم، ب) أطوال 30 تلميذًا مبوّبة في فئات، ج) درجات حرارة أسبوع؟'), solution: say('a) Barra-diagrama edo sektore-diagrama. b) Histograma (eta maiztasun-poligonoa). c) Lerro-diagrama.', 'a) Diagrama de barras o de sectores. b) Histograma (y polígono de frecuencias). c) Diagrama de líneas.', 'أ) مخطط أعمدة أو مخطط دائري. ب) مدرّج تكراري (ومضلّع تكراري). ج) مخطط خطي.') },
            { id: 13, difficulty: 'easy', question: say('60 pertsonari egindako inkesta batean sektore batek 120° ditu. Zenbat pertsona dira?', 'En una encuesta a 60 personas un sector mide 120°. ¿Cuántas personas son?', 'في استبيان لـ60 شخصًا قياس قطاع 120°. كم شخصًا يمثّل؟'), solution: same('$\\frac{120}{360}\\cdot 60=20$'), answer: { expected: n(20) } },
            { id: 14, difficulty: 'medium', question: with_(say('Musika-jaialdi batean 460 pertsonari galdetu zaie zenbat kontzertutara joan diren, eta 185ek 2 esan dute. Zein ehunekok esan du 2?', 'En un festival de música se ha preguntado a 460 personas a cuántos conciertos han ido, y 185 han dicho 2. ¿Qué porcentaje ha dicho 2?', 'في مهرجان موسيقي سُئل 460 شخصًا عن عدد الحفلات التي حضروها، فقال 185 منهم 2. ما النسبة المئوية لمن قالوا 2؟'), HUNDREDTHS), solution: same('$\\frac{185}{460}\\cdot 100\\approx 40{,}22$'), answer: { expected: v('40,22') } },
            { id: 15, difficulty: 'medium', question: say('Pentsio batek hilabete bateko (30 egun) gela okupatuak zenbatu ditu: 1 gela → egun 1, 2 → 6, 3 → 9, 4 → 9, 5 → 5. Zenbat gradu ditu 3 gelaren sektoreak?', 'Una pensión ha contado las habitaciones ocupadas en un mes (30 días): 1 habitación → 1 día, 2 → 6, 3 → 9, 4 → 9, 5 → 5. ¿Cuántos grados mide el sector de 3 habitaciones?', 'عدّ نُزُل الغرف المشغولة خلال شهر (30 يومًا): غرفة واحدة ← يوم، 2 ← 6، 3 ← 9، 4 ← 9، 5 ← 5. كم درجة قطاع الغرف الثلاث؟'), solution: same('$\\frac{9}{30}\\cdot 360=108$'), answer: { expected: n(108) } },
            { id: 16, difficulty: 'medium', question: say('Histograma batean: $[0,10)$ 4, $[10,20)$ 7, $[20,30)$ 9. Zenbat datu daude 20 baino txikiagoak?', 'En un histograma: $[0,10)$ 4, $[10,20)$ 7, $[20,30)$ 9. ¿Cuántos datos son menores que 20?', 'في مدرّج تكراري: $[0,10)$ 4، $[10,20)$ 7، $[20,30)$ 9. كم بيانًا أقل من 20؟'), solution: same('$4+7=11$'), answer: { expected: n(11) } },
            { id: 17, difficulty: 'medium', question: with_(HEIGHTS, say('Marraztu histograma eta maiztasun-poligonoa.', 'Dibuja el histograma y el polígono de frecuencias.', 'ارسم المدرّج التكراري والمضلّع التكراري.')), solution: say('Ardatz horizontalean 140, 150, 160, 170, 180; laukizuzen itsatsiak 3, 9, 12 eta 6 altuerakoak. Poligonoa: (135, 0), (145, 3), (155, 9), (165, 12), (175, 6), (185, 0) puntuak lotuta.', 'En el eje horizontal 140, 150, 160, 170, 180; rectángulos pegados de alturas 3, 9, 12 y 6. Polígono: une los puntos (135, 0), (145, 3), (155, 9), (165, 12), (175, 6), (185, 0).', 'على المحور الأفقي 140، 150، 160، 170، 180؛ مستطيلات متلاصقة ارتفاعاتها 3 و9 و12 و6. المضلّع: صِل النقاط (135، 0)، (145، 3)، (155، 9)، (165، 12)، (175، 6)، (185، 0).') },
            { id: 18, difficulty: 'hard', question: say('Grafiko batean ardatz bertikala 90etik hasten da, eta bi barrek 92 eta 98 adierazten dituzte. Zenbat aldiz altuagoa dirudi bigarrenak?', 'En un gráfico el eje vertical empieza en 90 y dos barras marcan 92 y 98. ¿Cuántas veces más alta parece la segunda?', 'في تمثيل يبدأ المحور الرأسي من 90، وعمودان يمثّلان 92 و98. كم مرة يبدو الثاني أطول؟'), solution: say('Marraztutako altuerak 2 eta 8 dira: $\\frac{98-90}{92-90}=4$. Benetan, % 7 inguru besterik ez da handiagoa.', 'Las alturas dibujadas son 2 y 8: $\\frac{98-90}{92-90}=4$. En realidad solo es alrededor de un 7 % mayor.', 'الارتفاعان المرسومان 2 و8: $\\frac{98-90}{92-90}=4$. وفي الحقيقة هو أكبر بنحو 7 % فقط.'), answer: { expected: n(4) } },
            { id: 19, difficulty: 'hard', question: say('A gasolindegiak B-k baino bi aldiz gehiago saltzen du, eta grafikoan bidoi bat marrazten da, altuera bikoitzarekin eta forma berarekin. Zenbat aldiz handiagoa dirudi bolumenean?', 'La gasolinera A vende el doble que la B, y en el gráfico se dibuja un bidón con el doble de altura y la misma forma. ¿Cuántas veces mayor parece en volumen?', 'تبيع محطة الوقود A ضعف ما تبيعه B، وفي التمثيل يُرسم برميل بضعف الارتفاع وبالشكل نفسه. كم مرة يبدو أكبر حجمًا؟'), solution: say('Hiru neurriak bikoizten dira: $2^{3}=8$. Grafikoak engainatu egiten du; 2:1 erlazioa erakutsi beharko luke.', 'Se duplican las tres medidas: $2^{3}=8$. El gráfico engaña; debería mostrar la relación 2:1.', 'تتضاعف الأبعاد الثلاثة: $2^{3}=8$. التمثيل مضلِّل؛ كان يجب أن يُظهر النسبة 2:1.'), answer: { expected: n(8) } },
            { id: 20, difficulty: 'hard', question: say('Sektore-diagrama batean: % 35, % 25, 72°-ko sektore bat eta beste bat. Zein ehuneko da azkena?', 'En un diagrama de sectores: 35 %, 25 %, un sector de 72° y otro más. ¿Qué porcentaje es el último?', 'في مخطط دائري: 35 % و25 % وقطاع 72° وقطاع آخر. ما نسبة الأخير؟'), solution: same('$\\frac{72}{3{,}6}=20\\qquad 100-35-25-20=20$'), answer: { expected: n(20) } }
        ]
    },
    {
        id: 'centre',
        title: say('Zentralizazio-parametroak', 'Parámetros de centralización', 'مقاييس النزعة المركزية'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Kalkulatu batez bestekoa: 12, 15, 12, 16, 10.', 'Calcula la media de: 12, 15, 12, 16, 10.', 'احسب متوسط: 12، 15، 12، 16، 10.'), solution: same('$\\frac{12+15+12+16+10}{5}=13$'), answer: { expected: n(13) } },
            { id: 22, difficulty: 'easy', question: say('15 pertsonaren odol-taldea: A, A, B, AB, AB, A, A, B, A, 0, AB, A, A, B, AB. Zein parametro kalkula daitezke?', 'Grupo sanguíneo de 15 personas: A, A, B, AB, AB, A, A, B, A, 0, AB, A, A, B, AB. ¿Qué parámetros se pueden calcular?', 'فصيلة دم 15 شخصًا: A، A، B، AB، AB، A، A، B، A، 0، AB، A، A، B، AB. ما المقاييس التي يمكن حسابها؟'), solution: say('Aldagaia kualitatiboa da: moda bakarrik, A taldea (7 aldiz). Ez dago batez bestekorik ez medianarik.', 'La variable es cualitativa: solo la moda, el grupo A (7 veces). No hay media ni mediana.', 'المتغير نوعي: المنوال فقط، الفصيلة A (7 مرات). لا متوسط ولا وسيط.') },
            { id: 23, difficulty: 'easy', question: say('Aurkitu mediana: 8, 3, 5, 9, 1, 7.', 'Halla la mediana de: 8, 3, 5, 9, 1, 7.', 'أوجد وسيط: 8، 3، 5، 9، 1، 7.'), solution: say('Ordenatuta: 1, 3, 5, 7, 8, 9. Erdiko biak: $\\frac{5+7}{2}=6$.', 'Ordenados: 1, 3, 5, 7, 8, 9. Los dos centrales: $\\frac{5+7}{2}=6$.', 'بعد الترتيب: 1، 3، 5، 7، 8، 9. القيمتان الوسطيان: $\\frac{5+7}{2}=6$.'), answer: { expected: n(6) } },
            { id: 24, difficulty: 'medium', question: say('Familia bakoitzeko seme-alabak: 0 → 2, 1 → 5, 2 → 8, 3 → 6, 4 → 3. Kalkulatu batez bestekoa.', 'Hijos por familia: 0 → 2, 1 → 5, 2 → 8, 3 → 6, 4 → 3. Calcula la media.', 'عدد الأبناء في كل أسرة: 0 ← 2، 1 ← 5، 2 ← 8، 3 ← 6، 4 ← 3. احسب المتوسط.'), solution: same('$\\frac{0\\cdot 2+1\\cdot 5+2\\cdot 8+3\\cdot 6+4\\cdot 3}{24}=2{,}125$'), answer: { expected: v('2,125') } },
            { id: 25, difficulty: 'medium', question: say('24 ikasleren altuerak (cm): 154 → 2, 158 → 5, 162 → 8, 166 → 6, 170 → 3. Kalkulatu batez bestekoa.', 'Alturas de 24 alumnos (cm): 154 → 2, 158 → 5, 162 → 8, 166 → 6, 170 → 3. Calcula la media.', 'أطوال 24 تلميذًا (سم): 154 ← 2، 158 ← 5، 162 ← 8، 166 ← 6، 170 ← 3. احسب المتوسط.'), solution: same('$\\frac{154\\cdot 2+158\\cdot 5+162\\cdot 8+166\\cdot 6+170\\cdot 3}{24}=162{,}5$'), answer: { expected: v('162,5') } },
            { id: 26, difficulty: 'medium', question: say('Adinak tartetan: $[10,20)$ 3, $[20,30)$ 5, $[30,40)$ 2. Kalkulatu batez bestekoa.', 'Edades en intervalos: $[10,20)$ 3, $[20,30)$ 5, $[30,40)$ 2. Calcula la media.', 'أعمار في فئات: $[10,20)$ 3، $[20,30)$ 5، $[30,40)$ 2. احسب المتوسط.'), solution: same('$\\frac{15\\cdot 3+25\\cdot 5+35\\cdot 2}{10}=24$'), answer: { expected: n(24) } },
            { id: 27, difficulty: 'medium', question: say('Taula: 1 → 3, 2 → 7, 3 → 4, 4 → 4, 5 → 2. Aurkitu mediana eta moda. Idatzi mediana.', 'Tabla: 1 → 3, 2 → 7, 3 → 4, 4 → 4, 5 → 2. Halla la mediana y la moda. Escribe la mediana.', 'جدول: 1 ← 3، 2 ← 7، 3 ← 4، 4 ← 4، 5 ← 2. أوجد الوسيط والمنوال. اكتب الوسيط.'), solution: say('Metatuak: 3, 10, 14, 18, 20. 10. datua 2 da eta 11.a 3: $\\frac{2+3}{2}=2{,}5$. Moda 2 da.', 'Acumuladas: 3, 10, 14, 18, 20. El dato 10.º es 2 y el 11.º es 3: $\\frac{2+3}{2}=2{,}5$. La moda es 2.', 'المتجمّعة: 3، 10، 14، 18، 20. البيان العاشر 2 والحادي عشر 3: $\\frac{2+3}{2}=2{,}5$. والمنوال 2.'), answer: { expected: v('2,5') } },
            { id: 28, difficulty: 'hard', question: say('Sei zenbakiren batez bestekoa 8 da. Zazpigarren bat gehitzean, batez bestekoa 9 da. Zein da zazpigarrena?', 'La media de seis números es 8. Al añadir un séptimo, la media es 9. ¿Cuál es el séptimo?', 'متوسط ستة أعداد 8. وعند إضافة سابع يصبح المتوسط 9. ما السابع؟'), solution: same('$7\\cdot 9-6\\cdot 8=15$'), answer: { expected: n(15) } },
            { id: 29, difficulty: 'hard', question: say('Datuak: 1, 2, 2, 4, 5, 6, 7, 9, 9, 9, 9, 9, 10, 10, 10. Kalkulatu batez bestekoa eta mediana. Simetrikoa da? Idatzi batez bestekoa.', 'Datos: 1, 2, 2, 4, 5, 6, 7, 9, 9, 9, 9, 9, 10, 10, 10. Calcula la media y la mediana. ¿Es simétrica? Escribe la media.', 'البيانات: 1، 2، 2، 4، 5، 6، 7، 9، 9، 9، 9، 9، 10، 10، 10. احسب المتوسط والوسيط. هل التوزيع متماثل؟ اكتب المتوسط.'), solution: say('$\\frac{102}{15}=6{,}8$ eta mediana 9 (8. datua). Urrun daude: ez da oso simetrikoa; datu txiki batzuek batez bestekoa behera eramaten dute.', '$\\frac{102}{15}=6{,}8$ y la mediana es 9 (el dato 8.º). Están lejos: no es muy simétrica; algunos datos pequeños bajan la media.', '$\\frac{102}{15}=6{,}8$ والوسيط 9 (البيان الثامن). هما متباعدان: التوزيع غير متماثل كثيرًا؛ بعض البيانات الصغيرة تخفض المتوسط.'), answer: { expected: v('6,8') } },
            { id: 30, difficulty: 'hard', question: say('Enpresa batean lau langilek 1000, 1100, 1200 eta 1300 € irabazten dituzte, eta bosten batez bestekoa 2000 € da. Zenbat irabazten du bosgarrenak? Zer parametrok ordezkatzen ditu hobeto soldatak?', 'En una empresa cuatro empleados ganan 1000, 1100, 1200 y 1300 €, y la media de los cinco es 2000 €. ¿Cuánto gana el quinto? ¿Qué parámetro representa mejor los sueldos?', 'في شركة يتقاضى أربعة موظفين 1000 و1100 و1200 و1300 €، ومتوسط الخمسة 2000 €. كم يتقاضى الخامس؟ أي مقياس يمثّل الرواتب أفضل؟'), solution: say('$5\\cdot 2000-(1000+1100+1200+1300)=5400$. Mediana (1200 €) ordezkari hobea da, muturreko balio bat dagoelako.', '$5\\cdot 2000-(1000+1100+1200+1300)=5400$. La mediana (1200 €) representa mejor, porque hay un valor extremo.', '$5\\cdot 2000-(1000+1100+1200+1300)=5400$. الوسيط (1200 €) يمثّل أفضل لوجود قيمة متطرفة.'), answer: { expected: n(5400) } }
        ]
    },
    {
        id: 'spread',
        title: say('Sakabanaketa eta posizioa', 'Dispersión y posición', 'التشتت والموقع'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Kalkulatu ibiltartea: 74, 68, 72, 71, 76, 69, 65, 80, 75, 75.', 'Calcula el recorrido de: 74, 68, 72, 71, 76, 69, 65, 80, 75, 75.', 'احسب مدى: 74، 68، 72، 71، 76، 69، 65، 80، 75، 75.'), solution: same('$80-65=15$'), answer: { expected: n(15) } },
            { id: 32, difficulty: 'easy', question: say('Kalkulatu batez besteko desbideratzea: 4, 6, 8, 10.', 'Calcula la desviación media de: 4, 6, 8, 10.', 'احسب الانحراف المتوسط لـ: 4، 6، 8، 10.'), solution: same('$\\frac{4+6+8+10}{4}=7\\qquad \\frac{3+1+1+3}{4}=2$'), answer: { expected: n(2) } },
            { id: 33, difficulty: 'easy', question: say('Datuen zein ehuneko dago $Q_1$ eta $Q_3$ artean?', '¿Qué porcentaje de los datos está entre $Q_1$ y $Q_3$?', 'ما النسبة المئوية من البيانات بين $Q_1$ و$Q_3$؟'), solution: say('$Q_3$-ren azpian % 75 dago eta $Q_1$-en azpian % 25: $75-25=50$.', 'Por debajo de $Q_3$ está el 75 % y por debajo de $Q_1$ el 25 %: $75-25=50$.', 'تحت $Q_3$ يقع 75 % وتحت $Q_1$ يقع 25 %: $75-25=50$.'), answer: { expected: n(50) } },
            { id: 34, difficulty: 'medium', question: with_(say('Taula: 2 → 2, 3 → 4, 4 → 12, 5 → 8, 6 → 3, 7 → 1. Batez bestekoa 4,3 da, eta $\\sum |x_i-\\bar{x}|\\cdot f_i=26{,}8$. Kalkulatu batez besteko desbideratzea.', 'Tabla: 2 → 2, 3 → 4, 4 → 12, 5 → 8, 6 → 3, 7 → 1. La media es 4,3 y $\\sum |x_i-\\bar{x}|\\cdot f_i=26{,}8$. Calcula la desviación media.', 'جدول: 2 ← 2، 3 ← 4، 4 ← 12، 5 ← 8، 6 ← 3، 7 ← 1. المتوسط 4.3، و$\\sum |x_i-\\bar{x}|\\cdot f_i=26{,}8$. احسب الانحراف المتوسط.'), HUNDREDTHS), solution: same('$\\frac{26{,}8}{30}\\approx 0{,}89$'), answer: { expected: v('0,89') } },
            { id: 35, difficulty: 'medium', question: say('35 ikasleren notak: 0, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 10, 10. Aurkitu mediana eta kuartilak. Idatzi $Q_3$.', 'Notas de 35 alumnos: 0, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 10, 10. Halla la mediana y los cuartiles. Escribe $Q_3$.', 'علامات 35 تلميذًا: 0، 3، 3، 3، 4، 4، 4، 4، 4، 5، 5، 5، 6، 6، 6، 6، 7، 7، 7، 7، 7، 7، 7، 8، 8، 8، 8، 8، 8، 8، 9، 9، 9، 10، 10. أوجد الوسيط والربيعيات. اكتب $Q_3$.'), solution: say('Mediana 18. datua da: 7. Beheko 17 datuen erdikoa (9.a): $Q_1=4$. Goiko 17en erdikoa (27.a): $Q_3=8$.', 'La mediana es el dato 18.º: 7. El central de los 17 de abajo (el 9.º): $Q_1=4$. El central de los 17 de arriba (el 27.º): $Q_3=8$.', 'الوسيط هو البيان 18: أي 7. أوسط البيانات السبعة عشر الدنيا (التاسع): $Q_1=4$. وأوسط السبعة عشر العليا (السابع والعشرون): $Q_3=8$.'), answer: { expected: n(8) } },
            { id: 36, difficulty: 'medium', question: say('Kutxa-diagrama baten bost balioak: txikiena 2, $Q_1=5$, $\\text{Me}=6$, $Q_3=8$, handiena 12. Zein da ibiltartea?', 'Los cinco valores de un diagrama de caja: mínimo 2, $Q_1=5$, $\\text{Me}=6$, $Q_3=8$, máximo 12. ¿Cuál es el recorrido?', 'القيم الخمس لمخطط صندوق: الأصغر 2، $Q_1=5$، $\\text{Me}=6$، $Q_3=8$، الأكبر 12. ما المدى؟'), solution: same('$12-2=10$'), answer: { expected: n(10) } },
            { id: 37, difficulty: 'medium', question: say('A taldearen notak 6, 7, 7, 8 dira eta B taldearenak 3, 7, 8, 10. Biek dute 7ko batez bestekoa. Kalkulatu A taldearen batez besteko desbideratzea.', 'Las notas del grupo A son 6, 7, 7, 8 y las del B, 3, 7, 8, 10. Los dos tienen media 7. Calcula la desviación media del grupo A.', 'علامات المجموعة أ: 6، 7، 7، 8، وعلامات ب: 3، 7، 8، 10. لكليهما المتوسط 7. احسب الانحراف المتوسط للمجموعة أ.'), solution: say('A: $\\frac{1+0+0+1}{4}=0{,}5$. B: $\\frac{4+0+1+3}{4}=2$. A taldea bilduago dago.', 'A: $\\frac{1+0+0+1}{4}=0{,}5$. B: $\\frac{4+0+1+3}{4}=2$. El grupo A está más agrupado.', 'أ: $\\frac{1+0+0+1}{4}=0{,}5$. ب: $\\frac{4+0+1+3}{4}=2$. المجموعة أ أكثر تجمّعًا.'), answer: { expected: v('0,5') } },
            { id: 38, difficulty: 'hard', question: say('Aurkitu lehen kuartila: 1, 2, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10.', 'Halla el primer cuartil de: 1, 2, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10.', 'أوجد الربيع الأول لـ: 1، 2، 2، 3، 4، 5، 6، 6، 7، 8، 9، 10.'), solution: say('Beheko erdia 1, 2, 2, 3, 4, 5 da (6 datu): $\\frac{2+3}{2}=2{,}5$.', 'La mitad de abajo es 1, 2, 2, 3, 4, 5 (6 datos): $\\frac{2+3}{2}=2{,}5$.', 'النصف الأدنى 1، 2، 2، 3، 4، 5 (6 بيانات): $\\frac{2+3}{2}=2{,}5$.'), answer: { expected: v('2,5') } },
            { id: 39, difficulty: 'hard', question: say('200 ikasleren notekin kutxa-diagrama bat egin da. Zenbat ikasle daude $Q_1$ eta medianaren artean?', 'Se ha hecho un diagrama de caja con las notas de 200 alumnos. ¿Cuántos alumnos hay entre $Q_1$ y la mediana?', 'رُسم مخطط صندوق لعلامات 200 تلميذ. كم تلميذًا بين $Q_1$ والوسيط؟'), solution: say('Zati bakoitzean datuen % 25: $\\frac{200}{4}=50$.', 'En cada parte, el 25 % de los datos: $\\frac{200}{4}=50$.', 'في كل جزء 25 % من البيانات: $\\frac{200}{4}=50$.'), answer: { expected: n(50) } },
            { id: 40, difficulty: 'hard', question: say('Taula: 1 → 3, 4 → 4, 7 → 3. Kalkulatu batez bestekoa eta batez besteko desbideratzea. Idatzi desbideratzea.', 'Tabla: 1 → 3, 4 → 4, 7 → 3. Calcula la media y la desviación media. Escribe la desviación.', 'جدول: 1 ← 3، 4 ← 4، 7 ← 3. احسب المتوسط والانحراف المتوسط. اكتب الانحراف.'), solution: same('$\\frac{3+16+21}{10}=4\\qquad \\frac{3\\cdot 3+0\\cdot 4+3\\cdot 3}{10}=1{,}8$'), answer: { expected: v('1,8') } }
        ]
    },
    {
        id: 'chance',
        title: say('Zoria eta probabilitatea', 'Azar y probabilidad', 'الصدفة والاحتمال'),
        items: [
            { id: 41, difficulty: 'easy', question: with_(say('40 kartako karta-sorta batetik bat ateratzen da. Zein da batekoa izateko probabilitatea?', 'Se saca una carta de una baraja de 40. ¿Cuál es la probabilidad de que sea un as?', 'تُسحب ورقة من مجموعة من 40 ورقة. ما احتمال أن تكون آسًا؟'), AS_FRACTION), solution: same('$\\frac{4}{40}=\\frac{1}{10}$'), answer: { expected: f(1, 10) } },
            { id: 42, difficulty: 'easy', question: say('Bi txanpon botatzen dira. Zenbat emaitza ditu lagin-espazioak?', 'Se lanzan dos monedas. ¿Cuántos resultados tiene el espacio muestral?', 'تُرمى قطعتا نقود. كم نتيجة في فضاء العيّنة؟'), solution: say('AA, AX, XA, XX: $2\\cdot 2=4$.', 'CC, C+, +C, ++: $2\\cdot 2=4$.', 'CC، C+، +C، ++: $2\\cdot 2=4$.'), answer: { expected: n(4) } },
            { id: 43, difficulty: 'easy', question: with_(say('Erruleta batean gorrian erortzeko probabilitatea $\\frac{1}{7}$ da. Zein da gorrian ez erortzekoa?', 'En una ruleta la probabilidad de caer en rojo es $\\frac{1}{7}$. ¿Cuál es la de no caer en rojo?', 'في دولاب احتمال الوقوف على الأحمر $\\frac{1}{7}$. ما احتمال عدم الوقوف عليه؟'), AS_FRACTION), solution: same('$1-\\frac{1}{7}=\\frac{6}{7}$'), answer: { expected: f(6, 7) } },
            { id: 44, difficulty: 'medium', question: with_(say('Kutxa batean 10 fitxa daude: 1, 2, 2, 2, 3, 3, 5, 5, 5, 5. Zein da zenbaki bakoitia ateratzeko probabilitatea?', 'En una caja hay 10 fichas: 1, 2, 2, 2, 3, 3, 5, 5, 5, 5. ¿Cuál es la probabilidad de sacar un número impar?', 'في صندوق 10 بطاقات: 1، 2، 2، 2، 3، 3، 5، 5، 5، 5. ما احتمال سحب عدد فردي؟'), AS_FRACTION), solution: say('Bakoitiak: 1 bat, 3 bi eta 5 lau: $\\frac{1+2+4}{10}=\\frac{7}{10}$.', 'Impares: un 1, dos 3 y cuatro 5: $\\frac{1+2+4}{10}=\\frac{7}{10}$.', 'الفردية: 1 واحد، و3 مرتان، و5 أربع مرات: $\\frac{1+2+4}{10}=\\frac{7}{10}$.'), answer: { expected: f(7, 10) } },
            { id: 45, difficulty: 'medium', question: with_(say('Bi dado jaurtitzen dira. Zein da 10 edo gehiago batzeko probabilitatea?', 'Se lanzan dos dados. ¿Cuál es la probabilidad de que sumen 10 o más?', 'يُرمى نردان. ما احتمال أن يكون المجموع 10 أو أكثر؟'), AS_FRACTION), solution: say('10: 3 gelaxka; 11: 2; 12: 1. $\\frac{3+2+1}{36}=\\frac{1}{6}$.', '10: 3 casillas; 11: 2; 12: 1. $\\frac{3+2+1}{36}=\\frac{1}{6}$.', '10: 3 خانات؛ 11: 2؛ 12: 1. $\\frac{3+2+1}{36}=\\frac{1}{6}$.'), answer: { expected: f(1, 6) } },
            { id: 46, difficulty: 'medium', question: with_(say('Hiru txanpon botatzen dira. Zein da aurpegirik ez ateratzeko probabilitatea?', 'Se lanzan tres monedas. ¿Cuál es la probabilidad de no sacar ninguna cara?', 'تُرمى ثلاث قطع نقود. ما احتمال ألّا يظهر أي وجه؟'), AS_FRACTION), solution: say('Zortzi emaitzatik bakarra: $\\frac{1}{8}$.', 'Solo uno de los ocho resultados: $\\frac{1}{8}$.', 'نتيجة واحدة فقط من الثماني: $\\frac{1}{8}$.'), answer: { expected: f(1, 8) } },
            { id: 47, difficulty: 'medium', question: with_(say('Kutxa batean 12 bola daude: 2 hori, 3 gorri, 2 urdin, 4 berde eta beltz 1. Zein da berdea ateratzeko probabilitatea?', 'En una urna hay 12 bolas: 2 amarillas, 3 rojas, 2 azules, 4 verdes y 1 negra. ¿Cuál es la probabilidad de sacar verde?', 'في جرّة 12 كرة: 2 صفراء و3 حمراء و2 زرقاء و4 خضراء و1 سوداء. ما احتمال سحب كرة خضراء؟'), AS_FRACTION), solution: same('$\\frac{4}{12}=\\frac{1}{3}$'), answer: { expected: f(1, 3) } },
            { id: 48, difficulty: 'hard', question: say('Txanpon trukatu batean aurpegiaren probabilitatea 0,37 da. 500 aldiz botatzen bada, zenbat gurutze espero dira?', 'En una moneda trucada la probabilidad de cara es 0,37. Si se lanza 500 veces, ¿cuántas cruces se esperan?', 'في قطعة نقود مغشوشة احتمال الوجه 0.37. إذا رُميت 500 مرة، كم ظهرًا نتوقع؟'), solution: same('$1-0{,}37=0{,}63\\qquad 0{,}63\\cdot 500=315$'), answer: { expected: n(315) } },
            { id: 49, difficulty: 'hard', question: say('2. mailan 80 ikasle daude eta haietatik 11k futbolean jokatzen dute. 2. mailako ikasle bat dela jakinda, zein da futbolean jokatzeko probabilitatea, ehunekotan?', 'En 2.º hay 80 alumnos y 11 de ellos juegan al fútbol. Sabiendo que es un alumno de 2.º, ¿cuál es la probabilidad de que juegue al fútbol, en porcentaje?', 'في الصف الثاني 80 تلميذًا، منهم 11 يلعبون كرة القدم. علمًا أن التلميذ من الصف الثاني، ما احتمال أن يلعب كرة القدم بالنسبة المئوية؟'), solution: say('Kasu posibleak 2. mailakoak bakarrik: $\\frac{11}{80}\\cdot 100=13{,}75$.', 'Los casos posibles son solo los de 2.º: $\\frac{11}{80}\\cdot 100=13{,}75$.', 'الحالات الممكنة تلاميذ الصف الثاني فقط: $\\frac{11}{80}\\cdot 100=13{,}75$.'), answer: { expected: v('13,75') } },
            { id: 50, difficulty: 'hard', question: with_(say('Antonio, Berta eta Carlos bi txanponekin jolasten dira: bi aurpegi, Carlosek irabazten du; bi gurutze, Antoniok; aurpegi bat eta gurutze bat, Bertak. Zein da Bertak irabazteko probabilitatea? Joko bidezkoa da?', 'Antonio, Berta y Carlos juegan con dos monedas: dos caras, gana Carlos; dos cruces, Antonio; una cara y una cruz, Berta. ¿Cuál es la probabilidad de que gane Berta? ¿Es un juego justo?', 'يلعب أنطونيو وبيرتا وكارلوس بقطعتي نقود: وجهان يربح كارلوس؛ ظهران يربح أنطونيو؛ وجه وظهر تربح بيرتا. ما احتمال أن تربح بيرتا؟ هل اللعبة عادلة؟'), AS_FRACTION), solution: say('Lau emaitzatik bitan irabazten du Bertak: $\\frac{2}{4}=\\frac{1}{2}$. Ez da bidezkoa: Bertak abantaila du.', 'Berta gana en dos de los cuatro resultados: $\\frac{2}{4}=\\frac{1}{2}$. No es justo: Berta tiene ventaja.', 'تربح بيرتا في نتيجتين من أربع: $\\frac{2}{4}=\\frac{1}{2}$. ليست عادلة: لبيرتا أفضلية.'), answer: { expected: f(1, 2) } }
        ]
    }
]

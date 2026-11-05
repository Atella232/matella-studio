import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { IntervalOpsFigure } from '../dbh4-akademikoak-errealak/figures'
import { PascalFigure } from '../dbh4-akademikoak-konbinatoria/figures'
import { ConjugateFigure, LogPropertiesFigure, RadicalProductFigure } from '../dbh4-akademikoak-potentziak/figures'
import { IrrationalFigure, ScientificOpsFigure } from '../dbh4-aplikatuak-errealak/figures'
import {
    BinomialFigure,
    DistanceFigure,
    ErrorBoundFigure,
    ExactLineFigure,
    LogScaleFigure,
    NeighbourhoodFigure,
    RelativeErrorFigure,
    SetsFigure
} from './figures'
import { bachRealsLessonChecks, type BachRealsTopicId } from './lessonChecks'
import { bachRealsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Zenbaki errealak · Batxilergoa 1 · Zientziak — stages and lessons. The
   scope follows unit 1 of Santillana 1.º Bachillerato Ciencias and of
   Anaya Matemáticas I (sets, reals on the line, intervals, absolute value
   and neighbourhoods, approximations and errors, radicals, logarithms and
   the binomial theorem). What 4. DBH académicas already taught (number
   sets, intervals, rounding, radicals, logarithms, Tartaglia) comes back as
   a short review with «Review first» links and goes further; absolute
   value, neighbourhoods, error bounds and Newton's binomial are new.
   ========================================================================== */

export type BachRealsStageId = 'reals' | 'absolute' | 'errors' | 'radicals' | 'newton-stage'

export const bachRealsStages: UnitStage[] = [
    { id: 'reals', tone: 'blue', title: { eu: 'Zenbaki errealak', es: 'Los números reales', en: 'Real numbers', ar: 'الأعداد الحقيقية' } },
    { id: 'absolute', tone: 'violet', title: { eu: 'Tarteak eta balio absolutua', es: 'Intervalos y valor absoluto', en: 'Intervals and absolute value', ar: 'الفترات والقيمة المطلقة' } },
    { id: 'errors', tone: 'mustard', title: { eu: 'Hurbilketak eta erroreak', es: 'Aproximaciones y errores', en: 'Approximations and errors', ar: 'التقريب والأخطاء' } },
    { id: 'radicals', tone: 'coral', title: { eu: 'Erradikalak eta logaritmoak', es: 'Radicales y logaritmos', en: 'Radicals and logarithms', ar: 'الجذور واللوغاريتمات' } },
    { id: 'newton-stage', tone: 'green', title: { eu: 'Newtonen binomioa', es: 'Binomio de Newton', en: 'The binomial theorem', ar: 'ذات الحدين لنيوتن' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Real numbers ---------- */
    {
        id: 'sets',
        stage: 'reals',
        title: say('Multzoak eta ikurrak', 'Conjuntos y símbolos', 'المجموعات والرموز', 'Sets and symbols'),
        goal: say('Multzoen hizkuntza ($\\in$, $\\subset$, $\\cup$, $\\cap$) erabiltzea zenbaki-multzoak deskribatzeko.', 'Usar el lenguaje de los conjuntos ($\\in$, $\\subset$, $\\cup$, $\\cap$) para describir conjuntos de números.', 'استعمال لغة المجموعات ($\\in$ و$\\subset$ و$\\cup$ و$\\cap$) لوصف مجموعات الأعداد.', 'Use the language of sets ($\\in$, $\\subset$, $\\cup$, $\\cap$) to describe sets of numbers.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'number-sets', title: { eu: 'Zenbaki errealak eta multzoak', es: 'Los números reales y sus conjuntos', en: 'Real numbers and their sets', ar: 'الأعداد الحقيقية ومجموعاتها' } }
        ],
        problem: say('$A=\\{1,2,3,4,6\\}$ eta $B=\\{2,4,8\\}$ badira, aurkitu $A\\cup B$, $A\\cap B$ eta $A-B$.', 'Si $A=\\{1,2,3,4,6\\}$ y $B=\\{2,4,8\\}$, halla $A\\cup B$, $A\\cap B$ y $A-B$.', 'إذا كانت $A=\\{1,2,3,4,6\\}$ و$B=\\{2,4,8\\}$ فأوجد $A\\cup B$ و$A\\cap B$ و$A-B$.', 'If $A=\\{1,2,3,4,6\\}$ and $B=\\{2,4,8\\}$, find $A\\cup B$, $A\\cap B$ and $A-B$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bildura: $A$ multzoan edo $B$ multzoan dauden elementuak.', 'Unión: los elementos que están en $A$ o en $B$.', 'الاتحاد: العناصر الموجودة في $A$ أو في $B$.', 'Union: the elements that are in $A$ or in $B$.'), math: same('$A\\cup B=\\{1,2,3,4,6,8\\}$') },
            { text: say('Ebakidura: bietan dauden elementuak.', 'Intersección: los elementos que están en los dos.', 'التقاطع: العناصر الموجودة في المجموعتين معًا.', 'Intersection: the elements that are in both.'), math: same('$A\\cap B=\\{2,4\\}$') },
            { text: say('Kendura: $A$ multzokoak, $B$ multzoan ez daudenak.', 'Diferencia: los de $A$ que no están en $B$.', 'الفرق: عناصر $A$ التي ليست في $B$.', 'Difference: those in $A$ that are not in $B$.'), math: same('$A-B=\\{1,3,6\\}$') }
        ],
        takeaway: say('$\\cup$: batean edo bestean. $\\cap$: bietan aldi berean. $\\in$ ikurrak elementu bat multzo batekin lotzen du; $\\subset$ ikurrak, multzo bat beste batekin.', '$\\cup$: en uno o en otro. $\\cap$: en los dos a la vez. $\\in$ une un elemento con un conjunto; $\\subset$, un conjunto con otro.', '$\\cup$: في إحداهما أو الأخرى. $\\cap$: في الاثنتين معًا. $\\in$ يربط عنصرًا بمجموعة، و$\\subset$ يربط مجموعة بأخرى.', '$\\cup$: in one or the other. $\\cap$: in both at once. $\\in$ links an element to a set; $\\subset$, a set to another set.'),
        figure: (language) => <SetsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'irrational-proof',
        stage: 'reals',
        title: say('Irrazionalak: froga bat', 'Irracionales: una demostración', 'الأعداد غير النسبية: برهان', 'Irrational numbers: a proof'),
        goal: say('Arrazionalak eta irrazionalak bereiztea eta $\\sqrt{2}$ zatiki gisa idatz ezin daitekeela frogatzea.', 'Distinguir racionales e irracionales y demostrar que $\\sqrt{2}$ no se puede escribir como fracción.', 'التمييز بين الأعداد النسبية وغير النسبية وبرهنة أن $\\sqrt{2}$ لا يُكتب على صورة كسر.', 'Tell rational from irrational numbers and prove that $\\sqrt{2}$ cannot be written as a fraction.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'irrational', title: { eu: 'Zenbaki irrazionalak', es: 'Números irracionales', en: 'Irrational numbers', ar: 'الأعداد غير النسبية' } }
        ],
        problem: say('Frogatu $\\sqrt{2}$ ez dela arrazionala.', 'Demuestra que $\\sqrt{2}$ no es racional.', 'برهن أن $\\sqrt{2}$ ليس عددًا نسبيًا.', 'Prove that $\\sqrt{2}$ is not rational.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Demagun baietz: $\\sqrt{2}=\\frac{a}{b}$, zatiki laburtezina.', 'Supón que sí: $\\sqrt{2}=\\frac{a}{b}$, fracción irreducible.', 'افترض العكس: $\\sqrt{2}=\\frac{a}{b}$ كسرًا غير قابل للاختزال.', 'Suppose it is: $\\sqrt{2}=\\frac{a}{b}$, a fraction in lowest terms.'), math: same('$a^2=2b^2$') },
            { text: say('$a^2$ bikoitia da, beraz $a$ ere bai: $a=2k$.', '$a^2$ es par, luego $a$ también: $a=2k$.', '$a^2$ زوجي، إذن $a$ زوجي أيضًا: $a=2k$.', '$a^2$ is even, so $a$ is too: $a=2k$.'), math: same('$4k^2=2b^2\\ \\to\\ b^2=2k^2$') },
            { text: say('Orduan $b$ ere bikoitia da, eta zatikia ez zen laburtezina: kontraesana.', 'Entonces $b$ también es par y la fracción no era irreducible: contradicción.', 'إذن $b$ زوجي أيضًا، والكسر لم يكن غير قابل للاختزال: تناقض.', 'Then $b$ is even too, and the fraction was not in lowest terms: a contradiction.'), math: same('$\\sqrt{2}\\notin\\mathbb{Q}$') }
        ],
        takeaway: say('Irrazional batek infinitu zifra hamartar ditu, periodorik gabe: ez da inolako zatikia. Adibidez, $\\sqrt{2}$, $\\pi$ eta zenbaki urrea.', 'Un irracional tiene infinitas cifras decimales sin periodo: no es ninguna fracción. Por ejemplo, $\\sqrt{2}$, $\\pi$ y el número áureo.', 'للعدد غير النسبي أرقام عشرية لا نهائية بلا دورة: فهو ليس كسرًا. مثل $\\sqrt{2}$ و$\\pi$ والعدد الذهبي.', 'An irrational number has infinitely many decimal digits with no repeating block: it is not a fraction. For example $\\sqrt{2}$, $\\pi$ and the golden ratio.'),
        figure: (language) => <IrrationalFigure language={language} />
    },
    {
        id: 'exact-line',
        stage: 'reals',
        title: say('Zehatz adieraztea zuzenean', 'Representar con exactitud', 'التمثيل الدقيق على المستقيم', 'Exact points on the number line'),
        goal: say('Zuzen errealean, erregela eta konpasarekin, $\\sqrt{5}$ bezalako erroak eta zenbaki urrea kokatzea.', 'Situar en la recta, con regla y compás, raíces como $\\sqrt{5}$ y el número áureo.', 'تعيين جذور مثل $\\sqrt{5}$ والعدد الذهبي على المستقيم بالمسطرة والفرجار.', 'Place roots such as $\\sqrt{5}$ and the golden ratio on the number line with a ruler and compass.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'represent', title: { eu: 'Errealak zuzenean adierazi', es: 'Representar reales en la recta', en: 'Represent real numbers on the number line', ar: 'تمثيل الأعداد الحقيقية على المستقيم' } }
        ],
        problem: say('Adierazi $\\sqrt{10}$ zuzen errealean.', 'Representa $\\sqrt{10}$ en la recta real.', 'مثّل $\\sqrt{10}$ على المستقيم الحقيقي.', 'Show $\\sqrt{10}$ on the number line.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bilatu batura 10 ematen duten bi karratu.', 'Busca dos cuadrados que sumen 10.', 'ابحث عن مربعين مجموعهما 10.', 'Find two squares that add up to 10.'), math: same('$10=3^2+1^2$') },
            { text: say('Marraztu 3 eta 1 katetoak dituen triangelu zuzena.', 'Dibuja el triángulo rectángulo de catetos 3 y 1.', 'ارسم المثلث القائم الذي ضلعاه القائمان 3 و1.', 'Draw the right-angled triangle with legs 3 and 1.'), math: same('$\\sqrt{3^2+1^2}=\\sqrt{10}$') },
            { text: say('Konpasarekin, eraman hipotenusa zerotik zuzenera.', 'Con el compás, lleva la hipotenusa desde el 0 hasta la recta.', 'بالفرجار انقل الوتر من 0 إلى المستقيم.', 'With the compass, carry the hypotenuse from 0 onto the line.'), math: same('$\\sqrt{10}\\approx 3{,}16$') }
        ],
        takeaway: say('$\\sqrt{n}$ triangelu zuzen baten hipotenusa da, katetoen karratuen batura $n$ bada; konpasak zuzenera eramaten du.', '$\\sqrt{n}$ es la hipotenusa de un triángulo rectángulo cuyos catetos al cuadrado suman $n$; el compás la lleva a la recta.', '$\\sqrt{n}$ هو وتر مثلث قائم مجموع مربعي ضلعيه القائمين $n$، والفرجار ينقله إلى المستقيم.', '$\\sqrt{n}$ is the hypotenuse of a right-angled triangle whose squared legs add up to $n$; the compass carries it to the line.'),
        figure: (language) => <ExactLineFigure language={language} />
    },

    /* ---------- 2. Intervals and absolute value ---------- */
    {
        id: 'interval-sets',
        stage: 'absolute',
        title: say('Tarteak eta haien eragiketak', 'Intervalos y operaciones', 'الفترات والعمليات عليها', 'Intervals and their operations'),
        goal: say('Zuzeneko multzoak tarte gisa idaztea eta haien bildura eta ebakidura kalkulatzea.', 'Escribir conjuntos de la recta como intervalos y calcular su unión e intersección.', 'كتابة مجموعات المستقيم على صورة فترات وحساب اتحادها وتقاطعها.', 'Write sets on the line as intervals and find their union and intersection.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'intervals', title: { eu: 'Tarteak eta zuzenerdiak', es: 'Intervalos y semirrectas', en: 'Intervals and half-lines', ar: 'الفترات وأنصاف المستقيمات' } },
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'interval-ops', title: { eu: 'Tarteen bildura eta ebakidura', es: 'Unión e intersección de intervalos', en: 'Union and intersection of intervals', ar: 'اتحاد الفترات وتقاطعها' } }
        ],
        problem: say('Aurkitu $(-1,4]\\cap[2,+\\infty)$ eta $(-1,4]\\cup[2,+\\infty)$.', 'Halla $(-1,4]\\cap[2,+\\infty)$ y $(-1,4]\\cup[2,+\\infty)$.', 'أوجد $(-1,4]\\cap[2,+\\infty)$ و$(-1,4]\\cup[2,+\\infty)$.', 'Find $(-1,4]\\cap[2,+\\infty)$ and $(-1,4]\\cup[2,+\\infty)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi desberdintza gisa.', 'Escríbelos como desigualdades.', 'اكتبهما على صورة متباينات.', 'Write them as inequalities.'), math: same('$-1<x\\le 4\\qquad x\\ge 2$') },
            { text: say('Ebakidura: bi baldintzak batera.', 'Intersección: las dos condiciones a la vez.', 'التقاطع: الشرطان معًا.', 'Intersection: both conditions at once.'), math: same('$2\\le x\\le 4\\ \\to\\ [2,4]$') },
            { text: say('Bildura: gutxienez baldintza bat.', 'Unión: al menos una de las dos.', 'الاتحاد: أحد الشرطين على الأقل.', 'Union: at least one of the two.'), math: same('$x>-1\\ \\to\\ (-1,+\\infty)$') }
        ],
        takeaway: say('Parentesia: muturra ez dago barruan; kortxetea: barruan dago. $\\pm\\infty$ ondoan, beti parentesia.', 'Paréntesis: el extremo no entra; corchete: sí entra. Junto a $\\pm\\infty$, siempre paréntesis.', 'القوس: الطرف غير داخل، والقوس المعقوف: الطرف داخل. وبجانب $\\pm\\infty$ دائمًا قوس.', 'Round bracket: the endpoint is left out; square bracket: it is in. Next to $\\pm\\infty$, always a round bracket.'),
        figure: (language) => <IntervalOpsFigure language={language} />
    },
    {
        id: 'absolute-value',
        stage: 'absolute',
        title: say('Balio absolutua eta distantzia', 'Valor absoluto y distancia', 'القيمة المطلقة والمسافة', 'Absolute value and distance'),
        goal: say('Balio absolutua distantzia gisa ulertzea eta $|x-a|=r$ bezalako ekuazioak ebaztea.', 'Entender el valor absoluto como una distancia y resolver ecuaciones como $|x-a|=r$.', 'فهم القيمة المطلقة على أنها مسافة وحلّ معادلات مثل $|x-a|=r$.', 'Understand absolute value as a distance and solve equations such as $|x-a|=r$.'),
        problem: say('Kalkulatu $-7$ eta $2$ arteko distantzia, eta ebatzi $|x-1|=5$.', 'Calcula la distancia entre $-7$ y $2$, y resuelve $|x-1|=5$.', 'احسب المسافة بين $-7$ و$2$، وحُلّ $|x-1|=5$.', 'Work out the distance between $-7$ and $2$, and solve $|x-1|=5$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Distantzia kenketaren balio absolutua da.', 'La distancia es el valor absoluto de la resta.', 'المسافة هي القيمة المطلقة للفرق.', 'The distance is the absolute value of the difference.'), math: same('$|2-(-7)|=|9|=9$') },
            { text: say('$|x-1|=5$: 1 zenbakitik 5 unitatera dauden puntuak.', '$|x-1|=5$: los puntos que están a 5 unidades del 1.', '$|x-1|=5$: النقاط التي تبعد 5 وحدات عن 1.', '$|x-1|=5$: the points 5 units away from 1.'), math: same('$x-1=5\\qquad x-1=-5$') },
            { text: say('Bi soluzio, alde banatan bat.', 'Dos soluciones, una a cada lado.', 'حلّان، واحد في كل جهة.', 'Two solutions, one on each side.'), math: same('$x=6\\qquad x=-4$') }
        ],
        takeaway: say('$|a|$ balioa $a$ zenbakitik 0 zenbakirainoko distantzia da, eta $|a-b|$, $a$ eta $b$ arteko distantzia. Ez da inoiz negatiboa.', '$|a|$ es la distancia de $a$ al 0, y $|a-b|$, la distancia entre $a$ y $b$. Nunca es negativo.', '$|a|$ هي المسافة من $a$ إلى 0، و$|a-b|$ هي المسافة بين $a$ و$b$. ولا تكون سالبة أبدًا.', '$|a|$ is the distance from $a$ to 0, and $|a-b|$ the distance between $a$ and $b$. It is never negative.'),
        figure: (language) => <DistanceFigure language={language} />
    },
    {
        id: 'neighbourhoods',
        stage: 'absolute',
        title: say('Inguruneak', 'Entornos', 'الجوارات', 'Neighbourhoods'),
        goal: say('Ingurune bat tarte gisa idaztea eta $|x-a|<r$ bezalako desberdintzak ebaztea.', 'Escribir un entorno como intervalo y resolver desigualdades como $|x-a|<r$.', 'كتابة الجوار على صورة فترة وحلّ متباينات مثل $|x-a|<r$.', 'Write a neighbourhood as an interval and solve inequalities such as $|x-a|<r$.'),
        problem: say('Ebatzi $|x-3|<2$ eta $|x-3|\\ge 2$.', 'Resuelve $|x-3|<2$ y $|x-3|\\ge 2$.', 'حُلّ $|x-3|<2$ و$|x-3|\\ge 2$.', 'Solve $|x-3|<2$ and $|x-3|\\ge 2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$|x-3|<2$: 3 zenbakitik 2 baino gutxiagora dauden puntuak.', '$|x-3|<2$: los puntos a menos de 2 del 3.', '$|x-3|<2$: النقاط التي تبعد عن 3 أقل من 2.', '$|x-3|<2$: the points less than 2 away from 3.'), math: same('$-2<x-3<2$') },
            { text: say('Gehitu 3 zati guztiei.', 'Suma 3 a las tres partes.', 'أضف 3 إلى الأجزاء الثلاثة.', 'Add 3 to all three parts.'), math: same('$1<x<5\\ \\to\\ (1,5)$') },
            { text: say('$\\ge 2$: kanpoko aldea, bi zuzenerdi.', '$\\ge 2$: la parte de fuera, dos semirrectas.', '$\\ge 2$: الجزء الخارجي، نصفا مستقيم.', '$\\ge 2$: the outside part, two half-lines.'), math: same('$(-\\infty,1]\\cup[5,+\\infty)$') }
        ],
        takeaway: say('$|x-a|<r$ desberdintza $(a-r,a+r)$ ingurunea da: $a$ erdigunea eta $r$ erradioa. $|x-a|>r$, berriz, kanpoko aldea da.', '$|x-a|<r$ es el entorno $(a-r,a+r)$: centro $a$ y radio $r$. $|x-a|>r$ es la parte de fuera.', '$|x-a|<r$ هو الجوار $(a-r,a+r)$: مركزه $a$ ونصف قطره $r$. و$|x-a|>r$ هو الجزء الخارجي.', '$|x-a|<r$ is the neighbourhood $(a-r,a+r)$: centre $a$ and radius $r$. $|x-a|>r$ is the outside part.'),
        figure: (language) => <NeighbourhoodFigure language={language} />
    },

    /* ---------- 3. Approximations and errors ---------- */
    {
        id: 'significant',
        stage: 'errors',
        title: say('Zifra esanguratsuak eta errore-bornea', 'Cifras significativas y cota de error', 'الأرقام المعنوية وحدّ الخطأ', 'Significant figures and error bound'),
        goal: say('Zifra esanguratsu kopuru jakin batera biribiltzea eta errore absolutuaren borne bat ematea.', 'Redondear a un número dado de cifras significativas y dar una cota del error absoluto.', 'التقريب إلى عدد معيّن من الأرقام المعنوية وإعطاء حدّ للخطأ المطلق.', 'Round to a given number of significant figures and give a bound for the absolute error.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'rounding', title: { eu: 'Hurbilketak: gutxiagoz, gehiagoz eta biribiltzea', es: 'Aproximaciones: por defecto, por exceso y redondeo', en: 'Approximations: lower, upper and rounded', ar: 'التقريب: بالنقصان وبالزيادة والتدوير' } }
        ],
        problem: say('Biribildu $\\pi$ hiru zifra esanguratsutara eta eman errore-borne bat.', 'Redondea $\\pi$ a tres cifras significativas y da una cota del error.', 'قرّب $\\pi$ إلى ثلاثة أرقام معنوية وأعطِ حدًّا للخطأ.', 'Round $\\pi$ to three significant figures and give an error bound.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen hiru zifrak, laugarrenari begira.', 'Las tres primeras cifras, mirando la cuarta.', 'الأرقام الثلاثة الأولى، مع النظر إلى الرابع.', 'The first three figures, looking at the fourth.'), math: same('$\\pi=3{,}14159\\ldots\\ \\to\\ 3{,}14$') },
            { text: say('Biribiltzean, errorea azken zifraren unitate erdia baino txikiagoa da.', 'Al redondear, el error es menor que media unidad de la última cifra.', 'عند التدوير يكون الخطأ أقل من نصف وحدة الرقم الأخير.', 'When rounding, the error is less than half a unit of the last figure.'), math: same('$E_a<0{,}005$') },
            { text: say('Benetako errorea, egiaztatzeko.', 'El error real, para comprobarlo.', 'الخطأ الحقيقي للتحقق.', 'The actual error, to check it.'), math: same('$|\\pi-3{,}14|\\approx 0{,}0016$') }
        ],
        takeaway: say('Biribiltzean, errore absolutua azken zifra esanguratsuaren unitate erdia baino txikiagoa da beti.', 'Al redondear, el error absoluto es siempre menor que media unidad de la última cifra significativa.', 'عند التدوير يكون الخطأ المطلق دائمًا أقل من نصف وحدة آخر رقم معنوي.', 'When rounding, the absolute error is always less than half a unit of the last significant figure.'),
        figure: (language) => <ErrorBoundFigure language={language} />
    },
    {
        id: 'relative',
        stage: 'errors',
        title: say('Errore erlatiboa', 'Error relativo', 'الخطأ النسبي', 'Relative error'),
        goal: say('Errore erlatiboa kalkulatzea eta bi neurketaren artean zein den zehatzagoa erabakitzea.', 'Calcular el error relativo y decidir cuál de dos medidas es más precisa.', 'حساب الخطأ النسبي وتحديد أيّ القياسين أدق.', 'Work out the relative error and decide which of two measurements is more precise.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'errors', title: { eu: 'Errore absolutua eta erlatiboa', es: 'Error absoluto y relativo', en: 'Absolute and relative error', ar: 'الخطأ المطلق والنسبي' } }
        ],
        problem: say('Arkatz batek 15 cm neurtzen ditu, eta 1 mm-ko errorea egin da; etxe batek 12 m, eta 5 cm-ko errorea. Zein neurketa da zehatzagoa?', 'Al medir un lápiz de 15 cm se comete un error de 1 mm, y al medir una casa de 12 m, uno de 5 cm. ¿Qué medida es más precisa?', 'عند قياس قلم طوله 15 سم نخطئ بمقدار 1 مم، وعند قياس بيت طوله 12 م نخطئ بمقدار 5 سم. أيّ القياسين أدق؟', 'A pencil measured as 15 cm has an error of 1 mm, and a house measured as 12 m an error of 5 cm. Which measurement is more precise?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Errore erlatiboa: errorea zati neurria, unitate berean.', 'Error relativo: el error entre la medida, en la misma unidad.', 'الخطأ النسبي: الخطأ مقسومًا على القياس بالوحدة نفسها.', 'Relative error: the error divided by the measurement, in the same unit.'), math: same('$\\frac{0{,}1}{15}\\approx 0{,}0067$') },
            { text: say('Etxea, zentimetrotan.', 'La casa, en centímetros.', 'البيت بالسنتيمترات.', 'The house, in centimetres.'), math: same('$\\frac{5}{1200}\\approx 0{,}0042$') },
            { text: say('Errore erlatibo txikiagoa, zehaztasun handiagoa: etxea.', 'Menor error relativo, más precisión: la casa.', 'خطأ نسبي أصغر يعني دقة أكبر: البيت.', 'Smaller relative error, more precision: the house.'), math: same('$0{,}42\\,\\%<0{,}67\\,\\%$') }
        ],
        takeaway: say('Errore erlatiboa $\\frac{E_a}{x}$ da, unitaterik gabe: tamaina oso desberdineko neurketak alderatzeko balio du.', 'El error relativo es $\\frac{E_a}{x}$, sin unidades: sirve para comparar medidas de tamaños muy distintos.', 'الخطأ النسبي هو $\\frac{E_a}{x}$ بلا وحدات: يصلح لمقارنة قياسات ذات أحجام مختلفة جدًا.', 'The relative error is $\\frac{E_a}{x}$, with no units: it lets you compare measurements of very different sizes.'),
        figure: (language) => <RelativeErrorFigure language={language} />
    },
    {
        id: 'scientific-errors',
        stage: 'errors',
        title: say('Idazkera zientifikoa eta zehaztasuna', 'Notación científica y precisión', 'الترميز العلمي والدقة', 'Scientific notation and precision'),
        goal: say('Idazkera zientifikoan eragiketak egitea eta emaitza zifra esanguratsu egokiekin ematea.', 'Operar en notación científica y dar el resultado con las cifras significativas adecuadas.', 'إجراء العمليات بالترميز العلمي وإعطاء النتيجة بالأرقام المعنوية المناسبة.', 'Calculate in scientific notation and give the result with the right significant figures.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'scientific', title: { eu: 'Idazkera zientifikoa', es: 'Notación científica', en: 'Scientific notation', ar: 'الترميز العلمي' } }
        ],
        problem: say('Argiak $3\\cdot 10^{8}$ m egiten ditu segundoko. Zenbat metro egiten ditu urte batean, hau da, $3{,}15\\cdot 10^{7}$ segundotan?', 'La luz recorre $3\\cdot 10^{8}$ m por segundo. ¿Cuántos metros recorre en un año, $3{,}15\\cdot 10^{7}$ s?', 'يقطع الضوء $3\\cdot 10^{8}$ م في الثانية. كم مترًا يقطع في سنة، أي في $3{,}15\\cdot 10^{7}$ ث؟', 'Light travels $3\\cdot 10^{8}$ m per second. How many metres does it travel in a year, $3{,}15\\cdot 10^{7}$ s?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu zenbakiak eta batu berretzaileak.', 'Multiplica los números y suma los exponentes.', 'اضرب العددين واجمع الأسين.', 'Multiply the numbers and add the exponents.'), math: same('$3\\cdot 3{,}15=9{,}45\\qquad 10^{8+7}=10^{15}$') },
            { text: say('Emaitza idazkera zientifikoan.', 'El resultado en notación científica.', 'النتيجة بالترميز العلمي.', 'The result in scientific notation.'), math: same('$9{,}45\\cdot 10^{15}$') },
            { text: say('Datu batek zifra esanguratsu bakarra du: hura da gutxien zehatza.', 'Un dato tiene una sola cifra significativa: es el menos preciso.', 'لأحد المعطيين رقم معنوي واحد: هو الأقل دقة.', 'One datum has a single significant figure: it is the least precise.'), math: same('$9{,}45\\cdot 10^{15}\\ \\to\\ 9\\cdot 10^{15}$') }
        ],
        takeaway: say('Biderkatzean berretzaileak batu, zatitzean kendu. Emaitzak ez du izan behar gutxien zehatza den datuak baino zifra esanguratsu gehiago.', 'Al multiplicar suma los exponentes; al dividir, resta. El resultado no debe tener más cifras significativas que el dato menos preciso.', 'في الضرب اجمع الأسس وفي القسمة اطرحها. ولا يزيد عدد الأرقام المعنوية للنتيجة على أقل المعطيات دقة.', 'When multiplying, add the exponents; when dividing, subtract. The result should not have more significant figures than the least precise datum.'),
        figure: (language) => <ScientificOpsFigure language={language} />
    },

    /* ---------- 4. Radicals and logarithms ---------- */
    {
        id: 'radical-ops',
        stage: 'radicals',
        title: say('Erradikalekin eragiketa konbinatuak', 'Operaciones combinadas con radicales', 'العمليات المركبة على الجذور', 'Combined operations with radicals'),
        goal: say('Erradikalak sinplifikatzea, batzea eta biderkatzea, behar denean indize komuna erabiliz.', 'Simplificar, sumar y multiplicar radicales, usando un índice común cuando haga falta.', 'تبسيط الجذور وجمعها وضربها، باستعمال دليل مشترك عند الحاجة.', 'Simplify, add and multiply radicals, using a common index when needed.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'extract', title: { eu: 'Faktoreak ateratzea eta sartzea', es: 'Extraer e introducir factores', en: 'Taking factors out and putting them in', ar: 'إخراج العوامل وإدخالها' } },
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'add-radicals', title: { eu: 'Erradikalak batu eta kendu', es: 'Sumar y restar radicales', en: 'Adding and subtracting radicals', ar: 'جمع الجذور وطرحها' } },
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'multiply-radicals', title: { eu: 'Erradikalak biderkatu, zatitu eta berretu', es: 'Multiplicar, dividir y elevar radicales', en: 'Multiplying, dividing and raising radicals to a power', ar: 'ضرب الجذور وقسمتها ورفعها إلى قوة' } }
        ],
        problem: say('Kalkulatu $\\sqrt{50}-3\\sqrt{8}+\\sqrt{18}$ eta $\\sqrt{2}\\cdot\\sqrt[3]{2}$.', 'Calcula $\\sqrt{50}-3\\sqrt{8}+\\sqrt{18}$ y $\\sqrt{2}\\cdot\\sqrt[3]{2}$.', 'احسب $\\sqrt{50}-3\\sqrt{8}+\\sqrt{18}$ و$\\sqrt{2}\\cdot\\sqrt[3]{2}$.', 'Work out $\\sqrt{50}-3\\sqrt{8}+\\sqrt{18}$ and $\\sqrt{2}\\cdot\\sqrt[3]{2}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Atera faktoreak: $50=25\\cdot 2$, $8=4\\cdot 2$ eta $18=9\\cdot 2$.', 'Saca factores: $50=25\\cdot 2$, $8=4\\cdot 2$ y $18=9\\cdot 2$.', 'أخرج العوامل: $50=25\\cdot 2$ و$8=4\\cdot 2$ و$18=9\\cdot 2$.', 'Take factors out: $50=25\\cdot 2$, $8=4\\cdot 2$ and $18=9\\cdot 2$.'), math: same('$5\\sqrt{2}-6\\sqrt{2}+3\\sqrt{2}$') },
            { text: say('Antzekoak dira: batu koefizienteak.', 'Son semejantes: suma los coeficientes.', 'هي متشابهة: اجمع المعاملات.', 'They are like radicals: add the coefficients.'), math: same('$(5-6+3)\\sqrt{2}=2\\sqrt{2}$') },
            { text: say('Biderkatzeko, indize komuna: 6.', 'Para multiplicar, índice común: 6.', 'للضرب دليل مشترك: 6.', 'To multiply, a common index: 6.'), math: same('$\\sqrt[6]{2^3}\\cdot\\sqrt[6]{2^2}=\\sqrt[6]{32}$') }
        ],
        takeaway: say('Antzekoak bakarrik batzen dira, faktoreak atera ondoren. Indize desberdinekin biderkatzeko, lehenik indize komuna.', 'Solo se suman los radicales semejantes, después de sacar factores. Para multiplicar con índices distintos, primero el índice común.', 'لا تُجمع إلا الجذور المتشابهة بعد إخراج العوامل. ولضرب جذور بأدلة مختلفة نوحّد الدليل أولًا.', 'Only like radicals are added, after taking factors out. To multiply with different indexes, first a common index.'),
        figure: (language) => <RadicalProductFigure language={language} />
    },
    {
        id: 'rationalize',
        stage: 'radicals',
        title: say('Izendatzaileak arrazionalizatzea', 'Racionalizar denominadores', 'إنطاق المقامات', 'Rationalising denominators'),
        goal: say('Erroak izendatzailetik kentzea, edozein indizerekin eta konjokatuarekin.', 'Quitar las raíces del denominador, con cualquier índice y con el conjugado.', 'إزالة الجذور من المقام مع أي دليل وبالمرافق.', 'Remove roots from the denominator, with any index and with the conjugate.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'rationalize-square', title: { eu: 'Erro karratu bat izendatzailean', es: 'Una raíz cuadrada en el denominador', en: 'A square root in the denominator', ar: 'جذر تربيعي في المقام' } },
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'conjugate', title: { eu: 'Konjokatua', es: 'El conjugado', en: 'The conjugate', ar: 'المرافق' } }
        ],
        problem: say('Arrazionalizatu $\\frac{6}{\\sqrt[3]{3}}$ eta $\\frac{4}{\\sqrt{7}-\\sqrt{3}}$.', 'Racionaliza $\\frac{6}{\\sqrt[3]{3}}$ y $\\frac{4}{\\sqrt{7}-\\sqrt{3}}$.', 'أنطق مقام $\\frac{6}{\\sqrt[3]{3}}$ و$\\frac{4}{\\sqrt{7}-\\sqrt{3}}$.', 'Rationalise $\\frac{6}{\\sqrt[3]{3}}$ and $\\frac{4}{\\sqrt{7}-\\sqrt{3}}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erro kubikoa: osatu berretzailea 3 arte.', 'Raíz cúbica: completa el exponente hasta 3.', 'جذر تكعيبي: أكمل الأس حتى 3.', 'Cube root: complete the exponent up to 3.'), math: same('$\\frac{6\\sqrt[3]{3^2}}{\\sqrt[3]{3^3}}=\\frac{6\\sqrt[3]{9}}{3}=2\\sqrt[3]{9}$') },
            { text: say('Kendura bat: biderkatu konjokatuaz.', 'Una resta: multiplica por el conjugado.', 'فرق: اضرب في المرافق.', 'A difference: multiply by the conjugate.'), math: same('$\\frac{4(\\sqrt{7}+\\sqrt{3})}{(\\sqrt{7})^2-(\\sqrt{3})^2}$') },
            { text: say('Izendatzailea: $7-3=4$.', 'El denominador: $7-3=4$.', 'المقام: $7-3=4$.', 'The denominator: $7-3=4$.'), math: same('$\\frac{4(\\sqrt{7}+\\sqrt{3})}{4}=\\sqrt{7}+\\sqrt{3}$') }
        ],
        takeaway: say('$\\sqrt[n]{b^m}$: biderkatu $\\sqrt[n]{b^{n-m}}$ erroaz. $\\sqrt{a}\\pm\\sqrt{b}$: biderkatu konjokatuaz, eta karratuen kendura geratzen da behean.', '$\\sqrt[n]{b^m}$: multiplica por $\\sqrt[n]{b^{n-m}}$. $\\sqrt{a}\\pm\\sqrt{b}$: multiplica por el conjugado, y abajo queda una diferencia de cuadrados.', '$\\sqrt[n]{b^m}$: اضرب في $\\sqrt[n]{b^{n-m}}$. $\\sqrt{a}\\pm\\sqrt{b}$: اضرب في المرافق، فيبقى في المقام فرق مربعين.', '$\\sqrt[n]{b^m}$: multiply by $\\sqrt[n]{b^{n-m}}$. $\\sqrt{a}\\pm\\sqrt{b}$: multiply by the conjugate, and a difference of squares is left below.'),
        figure: (language) => <ConjugateFigure language={language} />
    },
    {
        id: 'logarithms',
        stage: 'radicals',
        title: say('Logaritmoak eta haien propietateak', 'Logaritmos y sus propiedades', 'اللوغاريتمات وخصائصها', 'Logarithms and their properties'),
        goal: say('Logaritmoak definizioarekin kalkulatzea eta propietateak erabiltzea adierazpenak garatu eta biltzeko.', 'Calcular logaritmos con la definición y usar sus propiedades para desarrollar y agrupar expresiones.', 'حساب اللوغاريتمات بالتعريف واستعمال خصائصها لنشر العبارات وجمعها.', 'Work out logarithms from the definition and use their properties to expand and combine expressions.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'log-definition', title: { eu: 'Logaritmoa', es: 'El logaritmo', en: 'The logarithm', ar: 'اللوغاريتم' } },
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'log-properties', title: { eu: 'Logaritmoen propietateak', es: 'Propiedades de los logaritmos', en: 'Properties of logarithms', ar: 'خصائص اللوغاريتمات' } }
        ],
        problem: say('$\\log 2\\approx 0{,}301$ dela jakinda, kalkulatu $\\log 40$ eta $\\log_2 \\frac{1}{8}$.', 'Sabiendo que $\\log 2\\approx 0{,}301$, calcula $\\log 40$ y $\\log_2 \\frac{1}{8}$.', 'إذا علمت أن $\\log 2\\approx 0{,}301$ فاحسب $\\log 40$ و$\\log_2 \\frac{1}{8}$.', 'Given that $\\log 2\\approx 0{,}301$, work out $\\log 40$ and $\\log_2 \\frac{1}{8}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Deskonposatu: $40=4\\cdot 10$.', 'Descompón: $40=4\\cdot 10$.', 'حلّل: $40=4\\cdot 10$.', 'Break it up: $40=4\\cdot 10$.'), math: same('$\\log 40=2\\log 2+\\log 10$') },
            { text: say('Ordezkatu, $\\log 10=1$ baita.', 'Sustituye: $\\log 10=1$.', 'عوّض: $\\log 10=1$.', 'Substitute: $\\log 10=1$.'), math: same('$2\\cdot 0{,}301+1=1{,}602$') },
            { text: say('Definizioa: $2$ zenbakiaren zein berretura da $\\frac{1}{8}$?', 'Definición: ¿qué potencia de 2 es $\\frac{1}{8}$?', 'التعريف: أيّ قوة للعدد 2 تساوي $\\frac{1}{8}$؟', 'Definition: which power of 2 is $\\frac{1}{8}$?'), math: same('$2^{-3}=\\frac{1}{8}\\ \\to\\ \\log_2\\frac{1}{8}=-3$') }
        ],
        takeaway: say('$\\log_a b=x$ eta $a^x=b$ gauza bera dira. Biderkadura batura bihurtzen da, zatidura kendura, eta berretura biderketa.', '$\\log_a b=x$ es lo mismo que $a^x=b$. El producto se convierte en suma, el cociente en resta y la potencia en producto.', '$\\log_a b=x$ تعني $a^x=b$. يتحوّل الضرب إلى جمع، والقسمة إلى طرح، والقوة إلى ضرب.', '$\\log_a b=x$ is the same as $a^x=b$. A product becomes a sum, a quotient a difference and a power a product.'),
        figure: (language) => <LogPropertiesFigure language={language} />
    },
    {
        id: 'log-unknown',
        stage: 'radicals',
        title: say('Ezezaguna logaritmoekin kalkulatzea', 'Calcular la incógnita con logaritmos', 'إيجاد المجهول باللوغاريتمات', 'Finding the unknown with logarithms'),
        goal: say('Logaritmo baten oinarria, argumentua edo berretzailea aurkitzea, eta $a^x=b$ kalkulagailuarekin ebaztea.', 'Hallar la base, el argumento o el exponente de un logaritmo, y resolver $a^x=b$ con la calculadora.', 'إيجاد أساس اللوغاريتم أو ما داخله أو الأس، وحلّ $a^x=b$ بالآلة الحاسبة.', 'Find the base, the argument or the exponent of a logarithm, and solve $a^x=b$ with a calculator.'),
        needs: [
            { unit: 'dbh4-akademikoak/potencias-radicales', topic: 'change-base', title: { eu: 'Oinarri-aldaketa eta kalkulagailua', es: 'Cambio de base y calculadora', en: 'Change of base and calculator', ar: 'تغيير الأساس والآلة الحاسبة' } }
        ],
        problem: say('Aurkitu $x$: $\\log_x 125=3$, $\\log_4 x=\\frac{1}{2}$ eta $5^x=40$.', 'Halla $x$: $\\log_x 125=3$, $\\log_4 x=\\frac{1}{2}$ y $5^x=40$.', 'أوجد $x$: $\\log_x 125=3$ و$\\log_4 x=\\frac{1}{2}$ و$5^x=40$.', 'Find $x$: $\\log_x 125=3$, $\\log_4 x=\\frac{1}{2}$ and $5^x=40$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi berretura gisa.', 'Escríbelo como potencia.', 'اكتبه على صورة قوة.', 'Write it as a power.'), math: same('$x^3=125\\ \\to\\ x=5$') },
            { text: say('Berdin bigarrena.', 'Igual el segundo.', 'وكذلك الثاني.', 'The same for the second.'), math: same('$x=4^{\\frac{1}{2}}=2$') },
            { text: say('Hirugarrena: oinarri-aldaketa.', 'El tercero: cambio de base.', 'الثالث: تغيير الأساس.', 'The third: change of base.'), math: same('$x=\\frac{\\log 40}{\\log 5}\\approx 2{,}29$') }
        ],
        takeaway: say('$\\log_a b=c$ beti $a^c=b$ bihurtzen da. Berretzailea ezezaguna bada, $x=\\frac{\\log b}{\\log a}$.', '$\\log_a b=c$ siempre se convierte en $a^c=b$. Si el exponente es la incógnita, $x=\\frac{\\log b}{\\log a}$.', '$\\log_a b=c$ تتحوّل دائمًا إلى $a^c=b$. وإذا كان الأس مجهولًا فإن $x=\\frac{\\log b}{\\log a}$.', '$\\log_a b=c$ always becomes $a^c=b$. If the exponent is unknown, $x=\\frac{\\log b}{\\log a}$.'),
        figure: (language) => <LogScaleFigure language={language} />
    },

    /* ---------- 5. The binomial theorem ---------- */
    {
        id: 'combinatorial',
        stage: 'newton-stage',
        title: say('Zenbaki konbinatorioak eta Tartaglia', 'Números combinatorios y Tartaglia', 'الأعداد التوافقية ومثلث تارتاليا', 'Binomial coefficients and Tartaglia'),
        goal: say('Zenbaki konbinatorioak kalkulatzea eta Tartagliaren triangeluan aurkitzea.', 'Calcular números combinatorios y encontrarlos en el triángulo de Tartaglia.', 'حساب الأعداد التوافقية وإيجادها في مثلث تارتاليا.', 'Work out binomial coefficients and find them in Tartaglia\'s triangle.'),
        needs: [
            { unit: 'dbh4-akademikoak/combinatoria', topic: 'factorial', title: { eu: 'Faktoriala', es: 'El factorial', en: 'The factorial', ar: 'المضروب' } },
            { unit: 'dbh4-akademikoak/combinatoria', topic: 'binomial', title: { eu: 'Zenbaki konbinatorioak', es: 'Números combinatorios', en: 'Binomial coefficients', ar: 'الأعداد التوافقية' } },
            { unit: 'dbh4-akademikoak/combinatoria', topic: 'pascal', title: { eu: 'Tartagliaren triangelua', es: 'El triángulo de Tartaglia', en: 'Tartaglia\'s triangle', ar: 'مثلث تارتاليا' } }
        ],
        problem: say('Kalkulatu $\\binom{7}{3}$, eta egiaztatu Tartagliaren triangeluan.', 'Calcula $\\binom{7}{3}$ y compruébalo en el triángulo de Tartaglia.', 'احسب $\\binom{7}{3}$ وتحقّق منه في مثلث تارتاليا.', 'Work out $\\binom{7}{3}$ and check it in Tartaglia\'s triangle.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Formula: $n!$ zati $k!$ eta $(n-k)!$.', 'Fórmula: $n!$ entre $k!$ y $(n-k)!$.', 'الصيغة: $n!$ على $k!$ و$(n-k)!$.', 'Formula: $n!$ over $k!$ and $(n-k)!$.'), math: same('$\\binom{7}{3}=\\frac{7!}{3!\\,4!}$') },
            { text: say('Sinplifikatu $4!$.', 'Simplifica el $4!$.', 'اختصر $4!$.', 'Cancel the $4!$.'), math: same('$\\frac{7\\cdot 6\\cdot 5}{3\\cdot 2\\cdot 1}=35$') },
            { text: say('Tartaglia: 7. errenkada, laugarren lekua (0 lekutik hasita).', 'Tartaglia: fila 7, cuarto lugar (se empieza a contar en 0).', 'تارتاليا: الصف 7، المكان الرابع (نبدأ العدّ من 0).', 'Tartaglia: row 7, fourth place (counting from 0).'), math: same('$1\\quad 7\\quad 21\\quad 35\\quad 35\\quad 21\\quad 7\\quad 1$') }
        ],
        takeaway: say('$\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$. Tartaglian, zenbaki bakoitza goiko bien batura da, eta errenkada simetrikoa da: $\\binom{n}{k}=\\binom{n}{n-k}$.', '$\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$. En Tartaglia, cada número es la suma de los dos de encima y la fila es simétrica: $\\binom{n}{k}=\\binom{n}{n-k}$.', '$\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$. في مثلث تارتاليا كل عدد مجموع العددين فوقه، والصف متناظر: $\\binom{n}{k}=\\binom{n}{n-k}$.', '$\\binom{n}{k}=\\frac{n!}{k!\\,(n-k)!}$. In Tartaglia, each number is the sum of the two above it and the row is symmetric: $\\binom{n}{k}=\\binom{n}{n-k}$.'),
        figure: (language) => <PascalFigure language={language} />
    },
    {
        id: 'newton',
        stage: 'newton-stage',
        title: say('Newtonen binomioa', 'Binomio de Newton', 'ذات الحدين لنيوتن', 'The binomial theorem'),
        goal: say('$(a+b)^n$ zenbaki konbinatorioekin garatzea eta haren gai jakin bat aurkitzea.', 'Desarrollar $(a+b)^n$ con números combinatorios y encontrar un término concreto.', 'نشر $(a+b)^n$ بالأعداد التوافقية وإيجاد حدٍّ معيّن منه.', 'Expand $(a+b)^n$ with binomial coefficients and find a given term.'),
        problem: say('Garatu $(x-2)^4$.', 'Desarrolla $(x-2)^4$.', 'انشر $(x-2)^4$.', 'Expand $(x-2)^4$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Koefizienteak, Tartagliaren 4. errenkadatik.', 'Los coeficientes, de la fila 4 de Tartaglia.', 'المعاملات من الصف 4 في مثلث تارتاليا.', 'The coefficients, from row 4 of Tartaglia.'), math: same('$1\\quad 4\\quad 6\\quad 4\\quad 1$') },
            { text: say('$x$ zenbakiaren berretzailea jaisten da, eta $-2$ zenbakiarena igotzen.', 'El exponente de $x$ baja y el de $-2$ sube.', 'أس $x$ ينقص وأس $-2$ يزيد.', 'The power of $x$ goes down and that of $-2$ goes up.'), math: same('$x^4+4x^3(-2)+6x^2(-2)^2+4x(-2)^3+(-2)^4$') },
            { text: say('Kalkulatu: zeinuak txandakatzen dira.', 'Calcula: los signos se alternan.', 'احسب: الإشارات تتناوب.', 'Work it out: the signs alternate.'), math: same('$x^4-8x^3+24x^2-32x+16$') }
        ],
        takeaway: say('$(a+b)^n$: koefizienteak Tartagliaren $n$ errenkadatik; $a$ zenbakiaren berretzailea jaisten da eta $b$ zenbakiarena igotzen. $k+1$ gaia: $\\binom{n}{k}a^{n-k}b^k$.', '$(a+b)^n$: coeficientes de la fila $n$ de Tartaglia; el exponente de $a$ baja y el de $b$ sube. Término $k+1$: $\\binom{n}{k}a^{n-k}b^k$.', '$(a+b)^n$: المعاملات من الصف $n$ في مثلث تارتاليا، وأس $a$ ينقص وأس $b$ يزيد. الحد ذو الرتبة $k+1$: $\\binom{n}{k}a^{n-k}b^k$.', '$(a+b)^n$: coefficients from row $n$ of Tartaglia; the exponent of $a$ goes down and that of $b$ goes up. Term $k+1$: $\\binom{n}{k}a^{n-k}b^k$.'),
        figure: (language) => <BinomialFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bachRealsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bachRealsLessonTexts[topic.id as BachRealsTopicId], ...bachRealsLessonChecks[topic.id as BachRealsTopicId] }))

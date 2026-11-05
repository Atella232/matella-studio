import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BounceFigure, GaussFigure, HalvesFigure, JumpsFigure, RecursiveFigure, SticksFigure } from './figures'
import { sequencesLessonChecks, type SequencesTopicId } from './lessonChecks'
import { sequencesLessonTexts } from './lessonTexts'
import { say, same } from './text'

/* ==========================================================================
   Segidak · 3. DBH — stages and lessons, following Santillana 3.º ESO
   unit 3 «Progresiones» (sequences, the general term, recursive rules,
   arithmetic progressions and their sum, geometric progressions, the sum
   of n terms and of infinitely many) and Anaya 3.º ESO unit 4
   «Progresiones». Every number and context is original: the books only fix
   the scope and the order. Each lesson names its typical mistake.
   ========================================================================== */

export type SequencesStageId = 'sequences' | 'arithmetic' | 'sums' | 'geometric' | 'geo-sums'

export const sequencesStages: UnitStage[] = [
    { id: 'sequences', tone: 'blue', title: { eu: 'Segidak', es: 'Sucesiones', en: 'Sequences', ar: 'المتتاليات' } },
    { id: 'arithmetic', tone: 'violet', title: { eu: 'Progresio aritmetikoak', es: 'Progresiones aritméticas', en: 'Arithmetic progressions', ar: 'المتتاليات الحسابية' } },
    { id: 'sums', tone: 'mustard', title: { eu: 'Gaien batura', es: 'Suma de términos', en: 'Sums of terms', ar: 'مجموع الحدود' } },
    { id: 'geometric', tone: 'coral', title: { eu: 'Progresio geometrikoak', es: 'Progresiones geométricas', en: 'Geometric progressions', ar: 'المتتاليات الهندسية' } },
    { id: 'geo-sums', tone: 'green', title: { eu: 'Batura geometrikoak', es: 'Sumas geométricas', en: 'Geometric sums', ar: 'المجاميع الهندسية' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Sequences ---------- */
    {
        id: 'terms',
        stage: 'sequences',
        title: say('Segidak eta gaiak', 'Sucesiones y términos', 'المتتاليات والحدود', 'Sequences and terms'),
        goal: say('Segida bat ordenatutako zenbaki-zerrenda gisa ulertzea eta gai bakoitzaren lekua ezagutzea.', 'Entender una sucesión como una lista ordenada de números y reconocer el lugar de cada término.', 'فهم المتتالية قائمةً مرتبة من الأعداد ومعرفة رتبة كل حد.', 'Understand a sequence as an ordered list of numbers and recognise the position of each term.'),
        needs: [{ unit: 'dbh2/algebra', topic: 'language', title: { eu: 'Hizkuntza aljebraikoa eta segidak', es: 'Lenguaje algebraico y series', en: 'Algebraic language and sequences', ar: 'اللغة الجبرية والمتتاليات' } }],
        problem: same('$2,\\,6,\\,18,\\,54,\\ldots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Begiratu nola igarotzen den gai batetik hurrengora.', 'Mira cómo se pasa de un término al siguiente.', 'انظر كيف ننتقل من حد إلى الذي يليه.', 'See how you get from one term to the next.'), math: same('$6=2\\cdot 3\\quad 18=6\\cdot 3$') },
            { text: say('Araua: bider 3.', 'La regla: por 3.', 'القاعدة: الضرب في 3.', 'The rule: times 3.') },
            { text: say('Hurrengo gaia, $a_{5}$.', 'El siguiente término, $a_{5}$.', 'الحد التالي $a_{5}$.', 'The next term, $a_{5}$.'), math: same('$a_{5}=54\\cdot 3=162$') }
        ],
        takeaway: say('$a_{n}$: $n$ lekuan dagoen gaia. Lehenik bilatu araua.', '$a_{n}$: el término que ocupa el lugar $n$. Primero busca la regla.', '$a_{n}$: الحد في الرتبة $n$. ابحث أولًا عن القاعدة.', '$a_{n}$: the term in position $n$. First look for the rule.'),
        figure: (language) => <SticksFigure language={language} />
    },
    {
        id: 'general-term',
        stage: 'sequences',
        title: say('Gai orokorra', 'Término general', 'الحد العام', 'The general term'),
        goal: say('Gai orokorraren formula erabiltzea edozein gai kalkulatzeko, eta formula sinpleak aurkitzea.', 'Usar la fórmula del término general para calcular cualquier término, y encontrar fórmulas sencillas.', 'استعمال صيغة الحد العام لحساب أي حد، وإيجاد صيغ بسيطة.', 'Use the formula of the general term to work out any term, and find simple formulas.'),
        needs: [{ unit: 'dbh2/algebra', topic: 'value', title: { eu: 'Zenbakizko balioa', es: 'Valor numérico', en: 'Numerical value', ar: 'القيمة العددية' } }],
        problem: say('$a_{n}=5n-3$. Zenbat da $a_{12}$? 77 segidan dago?', '$a_{n}=5n-3$. ¿Cuánto vale $a_{12}$? ¿Está el 77 en la sucesión?', '$a_{n}=5n-3$. كم يساوي $a_{12}$؟ هل 77 في المتتالية؟', '$a_{n}=5n-3$. What is $a_{12}$? Is 77 in the sequence?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatu $n=12$.', 'Sustituye $n=12$.', 'عوّض $n=12$.', 'Substitute $n=12$.'), math: same('$a_{12}=5\\cdot 12-3=57$') },
            { text: say('Berdindu 77 zenbakiari.', 'Iguala a 77.', 'ساوِ بـ 77.', 'Set it equal to 77.'), math: same('$5n-3=77\\ \\to\\ n=16$') },
            { text: say('$n=16$ zenbaki arrunta da: bai, $a_{16}=77$.', '$n=16$ es natural: sí, $a_{16}=77$.', '$n=16$ عدد طبيعي: نعم، $a_{16}=77$.', '$n=16$ is a natural number: yes, $a_{16}=77$.') }
        ],
        takeaway: say('Gai bat: ordezkatu $n$. Lekua: berdindu eta ebatzi; $n$ zenbaki arrunta izan behar da.', 'Un término: sustituye $n$. El lugar: iguala y resuelve; $n$ tiene que ser natural.', 'الحد: عوّض $n$. الرتبة: ساوِ وحلّ؛ و$n$ يجب أن يكون طبيعيًا.', 'A term: substitute $n$. The position: set equal and solve; $n$ must be a natural number.'),
        figure: (language) => <SticksFigure language={language} />
    },
    {
        id: 'recursive',
        stage: 'sequences',
        title: say('Errepikapen-legea', 'Ley de recurrencia', 'العلاقة التراجعية', 'Recursive rules'),
        goal: say('Gai bakoitza aurrekoekin kalkulatzen den segidak eraikitzea, Fibonacci-rena barne.', 'Construir sucesiones en las que cada término se calcula con los anteriores, como la de Fibonacci.', 'بناء متتاليات يُحسب فيها كل حد من الحدود السابقة، مثل متتالية فيبوناتشي.', 'Build sequences in which each term is worked out from the previous ones, such as the Fibonacci sequence.'),
        problem: same('$a_{1}=2,$ $a_{2}=5,$ $a_{n}=a_{n-1}+a_{n-2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hirugarrena: aurreko bien batura.', 'El tercero: la suma de los dos anteriores.', 'الثالث: مجموع الحدين السابقين.', 'The third: the sum of the two before.'), math: same('$a_{3}=5+2=7$') },
            { text: say('Laugarrena.', 'El cuarto.', 'الرابع.', 'The fourth.'), math: same('$a_{4}=7+5=12$') },
            { text: say('Bosgarrena.', 'El quinto.', 'الخامس.', 'The fifth.'), math: same('$a_{5}=12+7=19$') }
        ],
        takeaway: say('Errepikapena: lehen gaia + aurrekotik hurrengora igarotzeko araua.', 'Recurrencia: primer término + la regla para pasar de uno al siguiente.', 'التراجعية: الحد الأول + قاعدة الانتقال من حد إلى الذي يليه.', 'Recursive: first term + the rule to go from one term to the next.'),
        figure: (language) => <RecursiveFigure language={language} />
    },

    /* ---------- 2. Arithmetic progressions ---------- */
    {
        id: 'arith-difference',
        stage: 'arithmetic',
        title: say('Progresio aritmetikoa eta diferentzia', 'Progresión aritmética y diferencia', 'المتتالية الحسابية والفرق', 'Arithmetic progression and common difference'),
        goal: say('Progresio aritmetikoak ezagutzea eta haien diferentzia kalkulatzea.', 'Reconocer progresiones aritméticas y calcular su diferencia.', 'التعرّف على المتتاليات الحسابية وحساب فرقها.', 'Recognise arithmetic progressions and work out their common difference.'),
        problem: same('$17,\\,13,\\,9,\\,5,\\ldots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu ondoz ondoko gaiak.', 'Resta términos consecutivos.', 'اطرح الحدود المتتالية.', 'Subtract consecutive terms.'), math: same('$13-17=-4\\quad 9-13=-4$') },
            { text: say('Kendura beti bera: aritmetikoa, $d=-4$.', 'La resta siempre es la misma: aritmética, $d=-4$.', 'الفرق ثابت: حسابية، $d=-4$.', 'The difference is always the same: arithmetic, $d=-4$.') },
            { text: say('$d<0$: beherakorra. Hurrengoa:', '$d<0$: decreciente. El siguiente:', '$d<0$: تناقصية. الحد التالي:', '$d<0$: decreasing. The next term:'), math: same('$5-4=1$') }
        ],
        takeaway: say('$d=a_{n}-a_{n-1}$, beti bera. $d>0$ gorakorra, $d<0$ beherakorra.', '$d=a_{n}-a_{n-1}$, siempre la misma. $d>0$ creciente, $d<0$ decreciente.', '$d=a_{n}-a_{n-1}$ ثابت دائمًا. $d>0$ تزايدية و$d<0$ تناقصية.', '$d=a_{n}-a_{n-1}$, always the same. $d>0$ increasing, $d<0$ decreasing.'),
        figure: (language) => <JumpsFigure language={language} />
    },
    {
        id: 'arith-general',
        stage: 'arithmetic',
        title: say('Progresio aritmetikoaren gai orokorra', 'Término general de una progresión aritmética', 'الحد العام للمتتالية الحسابية', 'General term of an arithmetic progression'),
        goal: say('$a_{n}=a_{1}+(n-1)\\cdot d$ formula erabiltzea gaiak eta lekuak kalkulatzeko.', 'Usar la fórmula $a_{n}=a_{1}+(n-1)\\cdot d$ para calcular términos y lugares.', 'استعمال الصيغة $a_{n}=a_{1}+(n-1)\\cdot d$ لحساب الحدود والرتب.', 'Use the formula $a_{n}=a_{1}+(n-1)\\cdot d$ to work out terms and positions.'),
        problem: say('$a_{1}=12$ eta $d=-5$. Kalkulatu $a_{15}$ eta gai orokorra.', '$a_{1}=12$ y $d=-5$. Calcula $a_{15}$ y el término general.', '$a_{1}=12$ و$d=-5$. احسب $a_{15}$ والحد العام.', '$a_{1}=12$ and $d=-5$. Work out $a_{15}$ and the general term.'),
        stepsKind: 'steps',
        steps: [
            { text: say('14 salto daude.', 'Hay 14 saltos.', 'هناك 14 قفزة.', 'There are 14 jumps.'), math: same('$a_{15}=12+14\\cdot(-5)=-58$') },
            { text: say('Gai orokorra.', 'El término general.', 'الحد العام.', 'The general term.'), math: same('$a_{n}=12+(n-1)\\cdot(-5)$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$a_{n}=17-5n$') }
        ],
        takeaway: say('$a_{n}=a_{1}+(n-1)\\cdot d$: $n-1$ salto.', '$a_{n}=a_{1}+(n-1)\\cdot d$: $n-1$ saltos.', '$a_{n}=a_{1}+(n-1)\\cdot d$: $n-1$ قفزة.', '$a_{n}=a_{1}+(n-1)\\cdot d$: $n-1$ jumps.'),
        figure: (language) => <JumpsFigure language={language} />
    },
    {
        id: 'arith-find',
        stage: 'arithmetic',
        title: say('Bi gaitik progresiora', 'De dos términos a la progresión', 'من حدّين إلى المتتالية', 'From two terms to the progression'),
        goal: say('Bi gai ezagututa, diferentzia, lehen gaia eta gai orokorra aurkitzea, eta gai bat zein lekutan dagoen jakitea.', 'Conocidos dos términos, hallar la diferencia, el primer término y el término general, y saber en qué lugar está un término.', 'معرفة حدّين لإيجاد الفرق والحد الأول والحد العام، ومعرفة رتبة حد ما.', 'Given two terms, find the common difference, the first term and the general term, and the position of a term.'),
        needs: [{ unit: 'dbh2/ekuazioak', topic: 'simple', title: { eu: 'x bi ataletan', es: 'La x en los dos miembros', en: 'The x on both sides', ar: 'x في الطرفين' } }],
        problem: same('$a_{3}=11,\\ a_{8}=31$'),
        stepsKind: 'steps',
        steps: [
            { text: say('5 salto: $d$.', '5 saltos: $d$.', 'خمس قفزات: $d$.', '5 jumps: $d$.'), math: same('$d=\\frac{31-11}{5}=4$') },
            { text: say('Atzera bi salto: $a_{1}$.', 'Dos saltos atrás: $a_{1}$.', 'قفزتان إلى الوراء: $a_{1}$.', 'Two jumps back: $a_{1}$.'), math: same('$a_{1}=11-2\\cdot 4=3$') },
            { text: say('Gai orokorra.', 'El término general.', 'الحد العام.', 'The general term.'), math: same('$a_{n}=3+(n-1)\\cdot 4=4n-1$') }
        ],
        takeaway: say('$d=\\frac{a_{m}-a_{k}}{m-k}$: kendura zati salto kopurua.', '$d=\\frac{a_{m}-a_{k}}{m-k}$: la diferencia entre el número de saltos.', '$d=\\frac{a_{m}-a_{k}}{m-k}$: الفرق على عدد القفزات.', '$d=\\frac{a_{m}-a_{k}}{m-k}$: the difference divided by the number of jumps.'),
        figure: (language) => <JumpsFigure language={language} />
    },

    /* ---------- 3. Sums of arithmetic progressions ---------- */
    {
        id: 'gauss',
        stage: 'sums',
        title: say('Gaussen trikimailua', 'El truco de Gauss', 'حيلة غاوس', 'Gauss\'s trick'),
        goal: say('1 eta $n$ arteko zenbakiak eta antzeko segidak azkar batzea, muturretako bikoteak eginez.', 'Sumar deprisa los números de 1 a $n$ y otras sucesiones parecidas emparejando los extremos.', 'جمع الأعداد من 1 إلى $n$ ومتتاليات مشابهة بسرعة بمزاوجة الطرفين.', 'Add up the numbers from 1 to $n$ and similar sequences quickly by pairing the ends.'),
        problem: say('$1+2+3+\\cdots+40$', '$1+2+3+\\cdots+40$', '$1+2+3+\\cdots+40$', '$1+2+3+\\cdots+40$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bikote bakoitza.', 'Cada pareja.', 'كل زوج.', 'Each pair.'), math: same('$1+40=2+39=41$') },
            { text: say('Bikote kopurua.', 'Número de parejas.', 'عدد الأزواج.', 'Number of pairs.'), math: same('$40\\mathbin{:}2=20$') },
            { text: say('Batura.', 'La suma.', 'المجموع.', 'The sum.'), math: same('$20\\cdot 41=820$') }
        ],
        takeaway: say('$1+2+\\cdots+n=\\frac{n\\cdot(n+1)}{2}$', '$1+2+\\cdots+n=\\frac{n\\cdot(n+1)}{2}$', '$1+2+\\cdots+n=\\frac{n\\cdot(n+1)}{2}$', '$1+2+\\cdots+n=\\frac{n\\cdot(n+1)}{2}$'),
        figure: (language) => <GaussFigure language={language} />
    },
    {
        id: 'arith-sum',
        stage: 'sums',
        title: say('Progresio aritmetikoaren $n$ gaien batura', 'Suma de $n$ términos de una progresión aritmética', 'مجموع $n$ حدًا من متتالية حسابية', 'Sum of $n$ terms of an arithmetic progression'),
        goal: say('$S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$ formula erabiltzea.', 'Usar la fórmula $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$.', 'استعمال الصيغة $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$.', 'Use the formula $S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$.'),
        problem: say('$5,\\,8,\\,11,\\ldots$ progresioaren lehen 20 gaien batura.', 'Suma de los 20 primeros términos de $5,\\,8,\\,11,\\ldots$', 'مجموع الحدود العشرين الأولى من $5,\\,8,\\,11,\\ldots$', 'Sum of the first 20 terms of $5,\\,8,\\,11,\\ldots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Azken gaia.', 'El último término.', 'الحد الأخير.', 'The last term.'), math: same('$a_{20}=5+19\\cdot 3=62$') },
            { text: say('Formula.', 'La fórmula.', 'الصيغة.', 'The formula.'), math: same('$S_{20}=\\frac{(5+62)\\cdot 20}{2}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$S_{20}=67\\cdot 10=670$') }
        ],
        takeaway: say('$S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$', '$S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$', '$S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$', '$S_{n}=\\frac{(a_{1}+a_{n})\\cdot n}{2}$'),
        figure: (language) => <GaussFigure language={language} />
    },
    {
        id: 'arith-problems',
        stage: 'sums',
        title: say('Problemak progresio aritmetikoekin', 'Problemas con progresiones aritméticas', 'مسائل على المتتاليات الحسابية', 'Problems with arithmetic progressions'),
        goal: say('Egoera errealak (eserlekuak, aurrezkiak, entrenamenduak) progresio aritmetiko gisa idaztea eta ebaztea.', 'Escribir y resolver situaciones reales (asientos, ahorros, entrenamientos) como progresiones aritméticas.', 'كتابة مواقف حقيقية (المقاعد والمدخرات والتدريبات) متتاليات حسابية وحلّها.', 'Write and solve real situations (seats, savings, training) as arithmetic progressions.'),
        problem: say('Antzoki batean lehen ilarak 18 eserleku ditu, eta ilara bakoitzak aurrekoak baino 2 gehiago. 15 ilara daude. Zenbat eserleku guztira?', 'Un teatro tiene 18 asientos en la primera fila y cada fila tiene 2 más que la anterior. Hay 15 filas. ¿Cuántos asientos hay en total?', 'في مسرح 18 مقعدًا في الصف الأول وكل صف فيه مقعدان أكثر من سابقه. هناك 15 صفًا. كم مقعدًا إجمالًا؟', 'A theatre has 18 seats in the first row and each row has 2 more than the one before. There are 15 rows. How many seats are there in total?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a_{1}=18$, $d=2$, $n=15$.', '$a_{1}=18$, $d=2$, $n=15$.', '$a_{1}=18$ و$d=2$ و$n=15$.', '$a_{1}=18$, $d=2$, $n=15$.') },
            { text: say('Azken ilara.', 'La última fila.', 'الصف الأخير.', 'The last row.'), math: same('$a_{15}=18+14\\cdot 2=46$') },
            { text: say('Guztira.', 'En total.', 'المجموع.', 'In total.'), math: same('$S_{15}=\\frac{(18+46)\\cdot 15}{2}=480$') }
        ],
        takeaway: say('Erabaki $a_{1}$, $d$ eta $n$; gero, gai bat ala batura.', 'Decide $a_{1}$, $d$ y $n$; después, un término o la suma.', 'حدّد $a_{1}$ و$d$ و$n$؛ ثم حدًا أو مجموعًا.', 'Decide $a_{1}$, $d$ and $n$; then a term or the sum.'),
        figure: (language) => <GaussFigure language={language} />
    },

    /* ---------- 4. Geometric progressions ---------- */
    {
        id: 'geo-ratio',
        stage: 'geometric',
        title: say('Progresio geometrikoa eta arrazoia', 'Progresión geométrica y razón', 'المتتالية الهندسية والأساس', 'Geometric progression and common ratio'),
        goal: say('Progresio geometrikoak ezagutzea eta haien arrazoia kalkulatzea.', 'Reconocer progresiones geométricas y calcular su razón.', 'التعرّف على المتتاليات الهندسية وحساب أساسها.', 'Recognise geometric progressions and work out their common ratio.'),
        problem: same('$48,\\,24,\\,12,\\,6,\\ldots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu ondoz ondoko gaiak.', 'Divide términos consecutivos.', 'اقسم الحدود المتتالية.', 'Divide consecutive terms.'), math: same('$\\frac{24}{48}=\\frac{12}{24}=\\frac{1}{2}$') },
            { text: say('Geometrikoa, $r=\\frac{1}{2}$.', 'Geométrica, $r=\\frac{1}{2}$.', 'هندسية، $r=\\frac{1}{2}$.', 'Geometric, $r=\\frac{1}{2}$.') },
            { text: say('Hurrengoa.', 'El siguiente.', 'الحد التالي.', 'The next term.'), math: same('$6\\cdot\\frac{1}{2}=3$') }
        ],
        takeaway: say('$r=\\frac{a_{n}}{a_{n-1}}$, beti bera. Aritmetikoan batu, geometrikoan biderkatu.', '$r=\\frac{a_{n}}{a_{n-1}}$, siempre la misma. En la aritmética se suma, en la geométrica se multiplica.', '$r=\\frac{a_{n}}{a_{n-1}}$ ثابت. في الحسابية نجمع وفي الهندسية نضرب.', '$r=\\frac{a_{n}}{a_{n-1}}$, always the same. Arithmetic adds, geometric multiplies.'),
        figure: (language) => <BounceFigure language={language} />
    },
    {
        id: 'geo-general',
        stage: 'geometric',
        title: say('Progresio geometrikoaren gai orokorra', 'Término general de una progresión geométrica', 'الحد العام للمتتالية الهندسية', 'General term of a geometric progression'),
        goal: say('$a_{n}=a_{1}\\cdot r^{n-1}$ formula erabiltzea.', 'Usar la fórmula $a_{n}=a_{1}\\cdot r^{n-1}$.', 'استعمال الصيغة $a_{n}=a_{1}\\cdot r^{n-1}$.', 'Use the formula $a_{n}=a_{1}\\cdot r^{n-1}$.'),
        needs: [{ unit: 'dbh3/potencias-raices', topic: 'power-sign', title: { eu: 'Berretura eta zeinua', es: 'Potencia y signo', en: 'Power and sign', ar: 'القوة والإشارة' } }],
        problem: say('$a_{1}=5$ eta $r=3$. Kalkulatu $a_{5}$.', '$a_{1}=5$ y $r=3$. Calcula $a_{5}$.', '$a_{1}=5$ و$r=3$. احسب $a_{5}$.', '$a_{1}=5$ and $r=3$. Work out $a_{5}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('4 aldiz biderkatzen da.', 'Se multiplica 4 veces.', 'نضرب 4 مرات.', 'You multiply 4 times.'), math: same('$a_{5}=5\\cdot 3^{4}$') },
            { text: say('Lehenik berretura.', 'Primero la potencia.', 'القوة أولًا.', 'First the power.'), math: same('$3^{4}=81$') },
            { text: say('Gero biderketa.', 'Después el producto.', 'ثم الضرب.', 'Then the product.'), math: same('$5\\cdot 81=405$') }
        ],
        takeaway: say('$a_{n}=a_{1}\\cdot r^{n-1}$: lehenik berretura.', '$a_{n}=a_{1}\\cdot r^{n-1}$: primero la potencia.', '$a_{n}=a_{1}\\cdot r^{n-1}$: القوة أولًا.', '$a_{n}=a_{1}\\cdot r^{n-1}$: the power first.'),
        figure: (language) => <BounceFigure language={language} />
    },
    {
        id: 'geo-find',
        stage: 'geometric',
        title: say('Bi gaitik progresio geometrikora', 'De dos términos a la progresión geométrica', 'من حدّين إلى المتتالية الهندسية', 'From two terms to the geometric progression'),
        goal: say('Bi gai ezagututa, arrazoia eta lehen gaia aurkitzea.', 'Conocidos dos términos, hallar la razón y el primer término.', 'معرفة حدّين لإيجاد الأساس والحد الأول.', 'Given two terms, find the common ratio and the first term.'),
        needs: [{ unit: 'dbh3/potencias-raices', topic: 'roots', title: { eu: 'Erro karratuak eta kuboak', es: 'Raíces cuadradas y cúbicas', en: 'Square and cube roots', ar: 'الجذور التربيعية والتكعيبية' } }],
        problem: same('$a_{2}=6,\\ a_{5}=162$'),
        stepsKind: 'steps',
        steps: [
            { text: say('3 salto: zatitu.', '3 saltos: divide.', 'ثلاث قفزات: اقسم.', '3 jumps: divide.'), math: same('$r^{3}=\\frac{162}{6}=27$') },
            { text: say('Erro kubikoa.', 'Raíz cúbica.', 'الجذر التكعيبي.', 'Cube root.'), math: same('$r=\\sqrt[3]{27}=3$') },
            { text: say('Lehen gaia.', 'El primer término.', 'الحد الأول.', 'The first term.'), math: same('$a_{1}=6\\mathbin{:}3=2$') }
        ],
        takeaway: say('$r^{m-k}=\\frac{a_{m}}{a_{k}}$: zatitu eta atera erroa.', '$r^{m-k}=\\frac{a_{m}}{a_{k}}$: divide y saca la raíz.', '$r^{m-k}=\\frac{a_{m}}{a_{k}}$: اقسم واستخرج الجذر.', '$r^{m-k}=\\frac{a_{m}}{a_{k}}$: divide and take the root.'),
        figure: (language) => <BounceFigure language={language} />
    },

    /* ---------- 5. Geometric sums ---------- */
    {
        id: 'geo-sum',
        stage: 'geo-sums',
        title: say('Progresio geometrikoaren $n$ gaien batura', 'Suma de $n$ términos de una progresión geométrica', 'مجموع $n$ حدًا من متتالية هندسية', 'Sum of $n$ terms of a geometric progression'),
        goal: say('$S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$ formula erabiltzea.', 'Usar la fórmula $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.', 'استعمال الصيغة $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.', 'Use the formula $S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$.'),
        problem: say('$3,\\,6,\\,12,\\ldots$ progresioaren lehen 6 gaien batura.', 'Suma de los 6 primeros términos de $3,\\,6,\\,12,\\ldots$', 'مجموع الحدود الستة الأولى من $3,\\,6,\\,12,\\ldots$', 'Sum of the first 6 terms of $3,\\,6,\\,12,\\ldots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a_{1}=3$, $r=2$, $n=6$.', '$a_{1}=3$, $r=2$, $n=6$.', '$a_{1}=3$ و$r=2$ و$n=6$.', '$a_{1}=3$, $r=2$, $n=6$.') },
            { text: say('Formula.', 'La fórmula.', 'الصيغة.', 'The formula.'), math: same('$S_{6}=\\frac{3\\cdot(2^{6}-1)}{2-1}=3\\cdot 63$') },
            { text: say('Emaitza.', 'El resultado.', 'النتيجة.', 'The result.'), math: same('$S_{6}=189$') }
        ],
        takeaway: say('$S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$', '$S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$', '$S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$', '$S_{n}=\\frac{a_{1}\\cdot(r^{n}-1)}{r-1}$')
    },
    {
        id: 'geo-infinite',
        stage: 'geo-sums',
        title: say('Gai infinituen batura', 'Suma de infinitos términos', 'مجموع عدد لا نهائي من الحدود', 'Sum of infinitely many terms'),
        goal: say('$|r|<1$ denean, progresio geometriko baten gai guztien batura $\\frac{a_{1}}{1-r}$ dela ulertzea eta kalkulatzea.', 'Entender y calcular que, si $|r|<1$, la suma de todos los términos de una geométrica es $\\frac{a_{1}}{1-r}$.', 'فهم وحساب أن مجموع كل حدود متتالية هندسية هو $\\frac{a_{1}}{1-r}$ عندما $|r|<1$.', 'Understand and work out that, if $|r|<1$, the sum of all the terms of a geometric progression is $\\frac{a_{1}}{1-r}$.'),
        needs: [{ unit: 'dbh3/numeros-racionales', topic: 'periodic-generatrix', title: { eu: 'Hamartar periodiko baten zatikia', es: 'La fracción de un decimal periódico', en: 'The fraction of a recurring decimal', ar: 'كسر العشري الدوري' } }],
        problem: same('$12+4+\\frac{4}{3}+\\cdots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Arrazoia.', 'La razón.', 'الأساس.', 'The ratio.'), math: same('$r=\\frac{4}{12}=\\frac{1}{3}$') },
            { text: say('$|r|<1$: batura badago.', '$|r|<1$: la suma existe.', '$|r|<1$: المجموع موجود.', '$|r|<1$: the sum exists.') },
            { text: say('Formula.', 'La fórmula.', 'الصيغة.', 'The formula.'), math: same('$S=\\frac{12}{1-\\frac{1}{3}}=18$') }
        ],
        takeaway: say('$|r|<1$ bada: $S=\\frac{a_{1}}{1-r}$.', 'Si $|r|<1$: $S=\\frac{a_{1}}{1-r}$.', 'إذا $|r|<1$: $S=\\frac{a_{1}}{1-r}$.', 'If $|r|<1$: $S=\\frac{a_{1}}{1-r}$.'),
        figure: (language) => <HalvesFigure language={language} />
    },
    {
        id: 'geo-problems',
        stage: 'geo-sums',
        title: say('Hazkunde geometrikoa', 'Crecimiento geométrico', 'النمو الهندسي', 'Geometric growth'),
        goal: say('Hazkunde edo beherakada esponentzialeko egoerak (bakterioak, interes konposatua, errebotea) progresio geometriko gisa ebaztea.', 'Resolver situaciones de crecimiento o decrecimiento exponencial (bacterias, interés compuesto, rebotes) como progresiones geométricas.', 'حلّ مواقف النمو أو الاضمحلال الأسي (البكتيريا والفائدة المركّبة والارتداد) متتالياتٍ هندسية.', 'Solve situations of exponential growth or decay (bacteria, compound interest, bouncing) as geometric progressions.'),
        needs: [{ unit: 'dbh3/proporcionalidad', topic: 'percent-index', title: { eu: 'Ehunekoak eta aldakuntza-indizea', es: 'Porcentajes e índice de variación', en: 'Percentages and the index of change', ar: 'النسب المئوية ومؤشر التغيّر' } }],
        problem: say('Kultibo batean 500 bakterio daude, eta orduro bikoizten dira. Zenbat egongo dira 6 ordu barru?', 'En un cultivo hay 500 bacterias y se duplican cada hora. ¿Cuántas habrá dentro de 6 horas?', 'في مزرعة 500 بكتيريا تتضاعف كل ساعة. كم سيكون عددها بعد 6 ساعات؟', 'A culture has 500 bacteria, and they double every hour. How many will there be in 6 hours?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$r=2$; orain 0. ordua da.', '$r=2$; ahora es la hora 0.', '$r=2$؛ الآن الساعة 0.', '$r=2$; now is hour 0.') },
            { text: say('6 bider bikoiztu.', 'Se duplica 6 veces.', 'تتضاعف 6 مرات.', 'It doubles 6 times.'), math: same('$500\\cdot 2^{6}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Calculate.'), math: same('$500\\cdot 64=32\\,000$') }
        ],
        takeaway: say('Ehuneko berean aldatzen bada: $r=1\\pm\\frac{p}{100}$ eta $a_{1}\\cdot r^{n}$.', 'Si cambia en el mismo porcentaje: $r=1\\pm\\frac{p}{100}$ y $a_{1}\\cdot r^{n}$.', 'إذا تغيّرت بالنسبة نفسها: $r=1\\pm\\frac{p}{100}$ و$a_{1}\\cdot r^{n}$.', 'If it changes by the same percentage: $r=1\\pm\\frac{p}{100}$ and $a_{1}\\cdot r^{n}$.'),
        figure: (language) => <BounceFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const sequencesTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...sequencesLessonTexts[topic.id as SequencesTopicId], ...sequencesLessonChecks[topic.id as SequencesTopicId] }))

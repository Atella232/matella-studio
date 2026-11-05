import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BounceFigure, HalvesFigure, JumpsFigure, RecursiveFigure, SticksFigure } from '../dbh3-segidak/figures'
import { CompoundInterestFigure } from '../dbh4-akademikoak-errealak/figures'
import { ContinuousGrowthFigure, ConvergeFigure, ENumberFigure, InfiniteLimitFigure, MonotonyFigure, PeriodicFigure, QuotientLimitFigure, SquaresPyramidFigure } from './figures'
import { bachSequencesLessonChecks, type BachSequencesTopicId } from './lessonChecks'
import { bachSequencesLessonTexts } from './lessonTexts'

/* ==========================================================================
   Segidak · Batxilergoa 1 · Zientziak — stages and lessons. The scope
   follows unit 2 of Anaya Matemáticas I (Santillana 1.º Bachillerato
   Ciencias has no sequences unit): terms and recursion, progressions,
   infinite sums, the limit of a sequence and the number e. What 3. DBH
   (Segidak) already taught comes back as a short review with «Review
   first» links; Fibonacci and the golden ratio, monotony, recurring
   decimals as series, the sum of squares, limits and e are new.
   ========================================================================== */

export type BachSequencesStageId = 'sequences' | 'progressions' | 'infinite-sums' | 'limits' | 'number-e'

export const bachSequencesStages: UnitStage[] = [
    { id: 'sequences', tone: 'blue', title: { eu: 'Segidak', es: 'Sucesiones', en: 'Sequences', ar: 'المتتاليات' } },
    { id: 'progressions', tone: 'violet', title: { eu: 'Progresioak', es: 'Progresiones', en: 'Progressions', ar: 'المتتاليات الحسابية والهندسية' } },
    { id: 'infinite-sums', tone: 'mustard', title: { eu: 'Batura infinituak', es: 'Sumas infinitas', en: 'Infinite sums', ar: 'المجاميع اللانهائية' } },
    { id: 'limits', tone: 'coral', title: { eu: 'Segida baten limitea', es: 'Límite de una sucesión', en: 'The limit of a sequence', ar: 'نهاية متتالية' } },
    { id: 'number-e', tone: 'green', title: { eu: 'e zenbakia', es: 'El número e', en: 'The number e', ar: 'العدد e' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Sequences ---------- */
    {
        id: 'terms',
        stage: 'sequences',
        title: say('Gaiak eta gai orokorra', 'Términos y término general', 'الحدود والحد العام', 'Terms and general term'),
        goal: say('Gai orokorretik gaiak kalkulatzea, eta lehen gaietatik gai orokorra aurkitzea.', 'Calcular términos a partir del término general y encontrar el término general a partir de los primeros términos.', 'حساب الحدود من الحد العام وإيجاد الحد العام من الحدود الأولى.', 'Work out terms from the general term and find the general term from the first terms.'),
        needs: [
            { unit: 'dbh3/sucesiones', topic: 'terms', title: { eu: 'Segidak eta gaiak', es: 'Sucesiones y términos', en: 'Sequences and terms', ar: 'المتتاليات والحدود' } },
            { unit: 'dbh3/sucesiones', topic: 'general-term', title: { eu: 'Gai orokorra', es: 'Término general', en: 'The general term', ar: 'الحد العام' } }
        ],
        problem: say('$a_n=\\frac{2n-1}{n+1}$ bada, kalkulatu $a_1$, $a_4$ eta $a_{10}$.', 'Si $a_n=\\frac{2n-1}{n+1}$, calcula $a_1$, $a_4$ y $a_{10}$.', 'إذا كان $a_n=\\frac{2n-1}{n+1}$ فاحسب $a_1$ و$a_4$ و$a_{10}$.', 'If $a_n=\\frac{2n-1}{n+1}$, work out $a_1$, $a_4$ and $a_{10}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatu $n=1$.', 'Sustituye $n=1$.', 'عوّض $n=1$.', 'Substitute $n=1$.'), math: same('$a_1=\\frac{2\\cdot 1-1}{1+1}=\\frac{1}{2}$') },
            { text: say('Gauza bera $n=4$ eta $n=10$ balioekin.', 'Lo mismo con $n=4$ y $n=10$.', 'وكذلك مع $n=4$ و$n=10$.', 'The same with $n=4$ and $n=10$.'), math: same('$\\begin{gathered}a_4=\\frac{7}{5}\\\\ a_{10}=\\frac{19}{11}\\end{gathered}$') },
            { text: say('Gai bakoitza zenbaki bat da; $n$ bere posizioa da.', 'Cada término es un número; $n$ es su lugar.', 'كل حد عدد، و$n$ هو رتبته.', 'Each term is a number; $n$ is its place.'), math: same('$\\frac{1}{2},\\ \\ldots,\\ \\frac{7}{5},\\ \\ldots,\\ \\frac{19}{11}$') }
        ],
        takeaway: say('Gai orokorrak $n$ posizioko gaia ematen du: ordezkatu $n$. Alderantziz, begiratu nola aldatzen den gaia $n$ aldatzean.', 'El término general da el término del lugar $n$: sustituye $n$. Al revés, mira cómo cambia el término al cambiar $n$.', 'الحد العام يعطي الحد ذا الرتبة $n$: عوّض $n$. وبالعكس انظر كيف يتغيّر الحد عندما يتغيّر $n$.', 'The general term gives the term in place $n$: substitute $n$. The other way round, look at how the term changes as $n$ changes.'),
        figure: (language) => <SticksFigure language={language} />
    },
    {
        id: 'fibonacci',
        stage: 'sequences',
        title: say('Errepikapena eta Fibonacci', 'Recurrencia y Fibonacci', 'التراجع وفيبوناتشي', 'Recursion and Fibonacci'),
        goal: say('Errepikapen-lege batekin gaiak kalkulatzea, eta Fibonacciren segida eta zenbaki urrearekin duen lotura ezagutzea.', 'Calcular términos con una ley de recurrencia y conocer la sucesión de Fibonacci y su relación con el número áureo.', 'حساب الحدود بعلاقة تراجعية والتعرّف إلى متتالية فيبوناتشي وعلاقتها بالعدد الذهبي.', 'Work out terms with a recursive rule and get to know the Fibonacci sequence and its link with the golden ratio.'),
        needs: [
            { unit: 'dbh3/sucesiones', topic: 'recursive', title: { eu: 'Errepikapen-legea', es: 'Ley de recurrencia', en: 'Recursive rules', ar: 'العلاقة التراجعية' } }
        ],
        problem: say('$a_1=2$, $a_2=1$ eta $a_{n}=a_{n-1}+a_{n-2}$. Kalkulatu lehen sei gaiak eta $\\frac{a_6}{a_5}$.', 'Con $a_1=2$, $a_2=1$ y $a_{n}=a_{n-1}+a_{n-2}$, calcula los seis primeros términos y $\\frac{a_6}{a_5}$.', 'مع $a_1=2$ و$a_2=1$ و$a_{n}=a_{n-1}+a_{n-2}$ احسب الحدود الستة الأولى و$\\frac{a_6}{a_5}$.', 'With $a_1=2$, $a_2=1$ and $a_{n}=a_{n-1}+a_{n-2}$, work out the first six terms and $\\frac{a_6}{a_5}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gai bakoitza aurreko bien batura da.', 'Cada término es la suma de los dos anteriores.', 'كل حد مجموع الحدين السابقين.', 'Each term is the sum of the two before it.'), math: same('$\\begin{gathered}a_3=1+2=3\\\\ a_4=3+1=4\\end{gathered}$') },
            { text: say('Jarraitu berdin.', 'Sigue igual.', 'تابع بالطريقة نفسها.', 'Carry on the same way.'), math: same('$\\begin{gathered}a_5=4+3=7\\\\ a_6=7+4=11\\end{gathered}$') },
            { text: say('Zatidura zenbaki urrera hurbiltzen da.', 'El cociente se acerca al número áureo.', 'يقترب خارج القسمة من العدد الذهبي.', 'The quotient gets close to the golden ratio.'), math: same('$\\begin{gathered}\\frac{11}{7}\\approx 1{,}571\\\\ \\varphi\\approx 1{,}618\\end{gathered}$') }
        ],
        takeaway: say('Errepikapen-lege batek gai bakoitza aurrekoekin ematen du. Fibonaccirenean, $a_n=a_{n-1}+a_{n-2}$, eta bi gai jarraituren zatidura $\\varphi$ zenbakira hurbiltzen da.', 'Una ley de recurrencia da cada término a partir de los anteriores. En la de Fibonacci, $a_n=a_{n-1}+a_{n-2}$, y el cociente de dos términos seguidos se acerca a $\\varphi$.', 'العلاقة التراجعية تعطي كل حد من الحدود السابقة. وفي متتالية فيبوناتشي $a_n=a_{n-1}+a_{n-2}$، ويقترب خارج قسمة حدين متتاليين من $\\varphi$.', 'A recursive rule gives each term from the earlier ones. In Fibonacci\'s, $a_n=a_{n-1}+a_{n-2}$, and the quotient of two consecutive terms gets close to $\\varphi$.'),
        figure: (language) => <RecursiveFigure language={language} />
    },
    {
        id: 'monotony',
        stage: 'sequences',
        title: say('Gorakorrak, beherakorrak eta txandakatuak', 'Crecientes, decrecientes y alternadas', 'المتزايدة والمتناقصة والمتناوبة', 'Increasing, decreasing and alternating'),
        goal: say('Segida bat gorakorra, beherakorra edo txandakatua den erabakitzea, $a_{n+1}-a_n$ kenduraren zeinuari begiratuz.', 'Decidir si una sucesión es creciente, decreciente o alternada mirando el signo de $a_{n+1}-a_n$.', 'تحديد إن كانت المتتالية متزايدة أو متناقصة أو متناوبة بالنظر إلى إشارة $a_{n+1}-a_n$.', 'Decide whether a sequence is increasing, decreasing or alternating by looking at the sign of $a_{n+1}-a_n$.'),
        problem: say('Aztertu $a_n=\\frac{n}{n+1}$ eta $b_n=(-1)^n\\cdot n$.', 'Estudia $a_n=\\frac{n}{n+1}$ y $b_n=(-1)^n\\cdot n$.', 'ادرس $a_n=\\frac{n}{n+1}$ و$b_n=(-1)^n\\cdot n$.', 'Study $a_n=\\frac{n}{n+1}$ and $b_n=(-1)^n\\cdot n$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kalkulatu $a_{n+1}-a_n$.', 'Calcula $a_{n+1}-a_n$.', 'احسب $a_{n+1}-a_n$.', 'Work out $a_{n+1}-a_n$.'), math: same('$\\frac{n+1}{n+2}-\\frac{n}{n+1}=\\frac{1}{(n+1)(n+2)}$') },
            { text: say('Beti positiboa: $a_n$ gorakorra da.', 'Siempre positiva: $a_n$ es creciente.', 'موجب دائمًا: $a_n$ متزايدة.', 'Always positive: $a_n$ is increasing.'), math: same('$\\frac{1}{2}<\\frac{2}{3}<\\frac{3}{4}<\\ldots$') },
            { text: say('$b_n$ segidan zeinua txandakatzen da.', 'En $b_n$ el signo se alterna.', 'في $b_n$ تتناوب الإشارة.', 'In $b_n$ the sign alternates.'), math: same('$-1,\\ 2,\\ -3,\\ 4,\\ldots$') }
        ],
        takeaway: say('$a_{n+1}-a_n>0$ beti: gorakorra; $<0$ beti: beherakorra. $(-1)^n$ faktoreak zeinua txandakatzen du.', '$a_{n+1}-a_n>0$ siempre: creciente; $<0$ siempre: decreciente. El factor $(-1)^n$ alterna el signo.', '$a_{n+1}-a_n>0$ دائمًا: متزايدة، و$<0$ دائمًا: متناقصة. والعامل $(-1)^n$ يناوب الإشارة.', '$a_{n+1}-a_n>0$ always: increasing; $<0$ always: decreasing. The factor $(-1)^n$ alternates the sign.'),
        figure: (language) => <MonotonyFigure language={language} />
    },

    /* ---------- 2. Progressions ---------- */
    {
        id: 'arithmetic',
        stage: 'progressions',
        title: say('Progresio aritmetikoak', 'Progresiones aritméticas', 'المتتاليات الحسابية', 'Arithmetic progressions'),
        goal: say('Progresio aritmetiko baten gai orokorra eta lehen $n$ gaien batura kalkulatzea.', 'Calcular el término general y la suma de los $n$ primeros términos de una progresión aritmética.', 'حساب الحد العام ومجموع الحدود $n$ الأولى لمتتالية حسابية.', 'Work out the general term and the sum of the first $n$ terms of an arithmetic progression.'),
        needs: [
            { unit: 'dbh3/sucesiones', topic: 'arith-general', title: { eu: 'Progresio aritmetikoaren gai orokorra', es: 'Término general de una progresión aritmética', en: 'General term of an arithmetic progression', ar: 'الحد العام للمتتالية الحسابية' } },
            { unit: 'dbh3/sucesiones', topic: 'arith-sum', title: { eu: 'Progresio aritmetikoaren lehen gaien batura', es: 'Suma de los primeros términos de una progresión aritmética', en: 'Sum of the first terms of an arithmetic progression', ar: 'مجموع الحدود الأولى من متتالية حسابية' } }
        ],
        problem: say('Progresio aritmetiko batean $a_3=11$ eta $a_8=26$ dira. Aurkitu $a_n$ eta $S_{20}$.', 'En una progresión aritmética, $a_3=11$ y $a_8=26$. Halla $a_n$ y $S_{20}$.', 'في متتالية حسابية $a_3=11$ و$a_8=26$. أوجد $a_n$ و$S_{20}$.', 'In an arithmetic progression, $a_3=11$ and $a_8=26$. Find $a_n$ and $S_{20}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bost jauzi daude 3 gaitik 8 gaira.', 'Hay cinco saltos del término 3 al 8.', 'خمس قفزات من الحد 3 إلى الحد 8.', 'There are five jumps from term 3 to term 8.'), math: same('$d=\\frac{26-11}{5}=3$') },
            { text: say('Lehen gaia eta gai orokorra.', 'El primer término y el término general.', 'الحد الأول والحد العام.', 'The first term and the general term.'), math: same('$\\begin{gathered}a_1=11-2\\cdot 3=5\\\\ a_n=5+(n-1)\\cdot 3\\end{gathered}$') },
            { text: say('Batura: lehenengoa gehi azkena, bider gaien erdia.', 'Suma: primero más último, por la mitad de los términos.', 'المجموع: الأول زائد الأخير في نصف عدد الحدود.', 'Sum: first plus last, times half the number of terms.'), math: same('$\\begin{gathered}a_{20}=62\\\\ S_{20}=\\frac{(5+62)\\cdot 20}{2}=670\\end{gathered}$') }
        ],
        takeaway: say('$a_n=a_1+(n-1)\\,d$ eta $S_n=\\frac{(a_1+a_n)\\,n}{2}$.', '$a_n=a_1+(n-1)\\,d$ y $S_n=\\frac{(a_1+a_n)\\,n}{2}$.', '$a_n=a_1+(n-1)\\,d$ و$S_n=\\frac{(a_1+a_n)\\,n}{2}$.', '$a_n=a_1+(n-1)\\,d$ and $S_n=\\frac{(a_1+a_n)\\,n}{2}$.'),
        figure: (language) => <JumpsFigure language={language} />
    },
    {
        id: 'geometric',
        stage: 'progressions',
        title: say('Progresio geometrikoak', 'Progresiones geométricas', 'المتتاليات الهندسية', 'Geometric progressions'),
        goal: say('Progresio geometriko baten gai orokorra eta lehen $n$ gaien batura kalkulatzea.', 'Calcular el término general y la suma de los $n$ primeros términos de una progresión geométrica.', 'حساب الحد العام ومجموع الحدود $n$ الأولى لمتتالية هندسية.', 'Work out the general term and the sum of the first $n$ terms of a geometric progression.'),
        needs: [
            { unit: 'dbh3/sucesiones', topic: 'geo-general', title: { eu: 'Progresio geometrikoaren gai orokorra', es: 'Término general de una progresión geométrica', en: 'General term of a geometric progression', ar: 'الحد العام للمتتالية الهندسية' } },
            { unit: 'dbh3/sucesiones', topic: 'geo-sum', title: { eu: 'Progresio geometrikoaren lehen gaien batura', es: 'Suma de los primeros términos de una progresión geométrica', en: 'Sum of the first terms of a geometric progression', ar: 'مجموع الحدود الأولى من متتالية هندسية' } }
        ],
        problem: say('Progresio geometriko batean $a_2=6$ eta $a_5=162$ dira. Aurkitu $r$, $a_n$ eta $S_6$.', 'En una progresión geométrica, $a_2=6$ y $a_5=162$. Halla $r$, $a_n$ y $S_6$.', 'في متتالية هندسية $a_2=6$ و$a_5=162$. أوجد $r$ و$a_n$ و$S_6$.', 'In a geometric progression, $a_2=6$ and $a_5=162$. Find $r$, $a_n$ and $S_6$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hiru jauzi, bakoitza bider $r$.', 'Tres saltos, cada uno por $r$.', 'ثلاث قفزات، كل منها في $r$.', 'Three jumps, each times $r$.'), math: same('$r^3=\\frac{162}{6}=27\\ \\to\\ r=3$') },
            { text: say('Lehen gaia eta gai orokorra.', 'El primer término y el término general.', 'الحد الأول والحد العام.', 'The first term and the general term.'), math: same('$\\begin{gathered}a_1=\\frac{6}{3}=2\\\\ a_n=2\\cdot 3^{n-1}\\end{gathered}$') },
            { text: say('Lehen sei gaien batura.', 'La suma de los seis primeros.', 'مجموع الحدود الستة الأولى.', 'The sum of the first six.'), math: same('$S_6=\\frac{2\\cdot(3^6-1)}{3-1}=728$') }
        ],
        takeaway: say('$a_n=a_1\\cdot r^{\\,n-1}$ eta $S_n=\\frac{a_1\\,(r^n-1)}{r-1}$.', '$a_n=a_1\\cdot r^{\\,n-1}$ y $S_n=\\frac{a_1\\,(r^n-1)}{r-1}$.', '$a_n=a_1\\cdot r^{\\,n-1}$ و$S_n=\\frac{a_1\\,(r^n-1)}{r-1}$.', '$a_n=a_1\\cdot r^{\\,n-1}$ and $S_n=\\frac{a_1\\,(r^n-1)}{r-1}$.'),
        figure: (language) => <BounceFigure language={language} />
    },
    {
        id: 'progression-problems',
        stage: 'progressions',
        title: say('Problemak progresioekin', 'Problemas con progresiones', 'مسائل على المتتاليات', 'Problems with progressions'),
        goal: say('Egoera errealak progresio aritmetiko edo geometrikoekin modelizatzea eta ebaztea.', 'Modelizar y resolver situaciones reales con progresiones aritméticas o geométricas.', 'نمذجة مواقف واقعية وحلّها بالمتتاليات الحسابية أو الهندسية.', 'Model and solve real situations with arithmetic or geometric progressions.'),
        needs: [
            { unit: 'dbh3/sucesiones', topic: 'geo-problems', title: { eu: 'Hazkunde geometrikoa', es: 'Crecimiento geométrico', en: 'Geometric growth', ar: 'النمو الهندسي' } },
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'compound-interest', title: { eu: 'Interes konposatua', es: 'Interés compuesto', en: 'Compound interest', ar: 'الفائدة المركبة' } }
        ],
        problem: say('Herri batek $12\\,000$ biztanle ditu, eta urtero % 3 hazten da. Zenbat izango ditu 10 urte barru?', 'Un pueblo tiene $12\\,000$ habitantes y crece un 3 % cada año. ¿Cuántos tendrá dentro de 10 años?', 'في بلدة $12\\,000$ نسمة، ويزداد عددها 3 % كل سنة. كم يصير بعد 10 سنوات؟', 'A town has $12\\,000$ inhabitants and grows by 3% every year. How many will it have in 10 years?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Urtero bider $1{,}03$: progresio geometrikoa.', 'Cada año por $1{,}03$: progresión geométrica.', 'كل سنة في $1{,}03$: متتالية هندسية.', 'Each year times $1{,}03$: a geometric progression.'), math: same('$r=1{,}03$') },
            { text: say('10 urtean, 10 aldiz biderkatzen da.', 'En 10 años se multiplica 10 veces.', 'في 10 سنوات نضرب 10 مرات.', 'In 10 years you multiply 10 times.'), math: same('$12\\,000\\cdot 1{,}03^{10}$') },
            { text: say('Kalkulagailuarekin.', 'Con la calculadora.', 'بالآلة الحاسبة.', 'With a calculator.'), math: same('$12\\,000\\cdot 1{,}03^{10}\\approx 16\\,127$') }
        ],
        takeaway: say('Kantitate bera gehitzen bada, aritmetikoa; ehuneko bera hazten bada, geometrikoa, $r=1+\\frac{p}{100}$ arrazoiarekin.', 'Si se suma lo mismo, aritmética; si crece el mismo porcentaje, geométrica, con razón $r=1+\\frac{p}{100}$.', 'إذا أُضيفت الكمية نفسها فهي حسابية، وإذا زادت بالنسبة نفسها فهي هندسية أساسها $r=1+\\frac{p}{100}$.', 'If the same amount is added, arithmetic; if it grows by the same percentage, geometric, with ratio $r=1+\\frac{p}{100}$.'),
        figure: (language) => <CompoundInterestFigure language={language} />
    },

    /* ---------- 3. Infinite sums ---------- */
    {
        id: 'geometric-series',
        stage: 'infinite-sums',
        title: say('Geometriko infinitu baten batura', 'La suma de una geométrica infinita', 'مجموع متتالية هندسية لا نهائية', 'The sum of an infinite geometric series'),
        goal: say('Progresio geometriko baten gai infinituen batura kalkulatzea, $|r|<1$ denean.', 'Calcular la suma de los infinitos términos de una progresión geométrica cuando $|r|<1$.', 'حساب مجموع الحدود اللانهائية لمتتالية هندسية عندما يكون $|r|<1$.', 'Work out the sum of the infinitely many terms of a geometric progression when $|r|<1$.'),
        needs: [
            { unit: 'dbh3/sucesiones', topic: 'geo-infinite', title: { eu: 'Gai infinituen batura', es: 'Suma de infinitos términos', en: 'Sum of infinitely many terms', ar: 'مجموع عدد لا نهائي من الحدود' } }
        ],
        problem: say('Kalkulatu $8+4+2+1+\\ldots$', 'Calcula $8+4+2+1+\\ldots$', 'احسب $8+4+2+1+\\ldots$', 'Work out $8+4+2+1+\\ldots$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Progresio geometrikoa da: $r=\\frac{1}{2}$.', 'Es geométrica: $r=\\frac{1}{2}$.', 'إنها هندسية: $r=\\frac{1}{2}$.', 'It is geometric: $r=\\frac{1}{2}$.'), math: same('$|r|<1$') },
            { text: say('Batura partzialak 16 zenbakira hurbiltzen dira.', 'Las sumas parciales se acercan a 16.', 'تقترب المجاميع الجزئية من 16.', 'The partial sums get close to 16.'), math: same('$8,\\ 12,\\ 14,\\ 15,\\ 15{,}5,\\ldots$') },
            { text: say('Formula.', 'La fórmula.', 'الصيغة.', 'The formula.'), math: same('$S_\\infty=\\frac{8}{1-\\frac{1}{2}}=16$') }
        ],
        takeaway: say('$|r|<1$ bada, $S_\\infty=\\frac{a_1}{1-r}$. $|r|\\ge 1$ bada, batura ez da zenbaki bat.', 'Si $|r|<1$, $S_\\infty=\\frac{a_1}{1-r}$. Si $|r|\\ge 1$, la suma no es un número.', 'إذا كان $|r|<1$ فإن $S_\\infty=\\frac{a_1}{1-r}$. وإذا كان $|r|\\ge 1$ فالمجموع ليس عددًا.', 'If $|r|<1$, $S_\\infty=\\frac{a_1}{1-r}$. If $|r|\\ge 1$, the sum is not a number.'),
        figure: (language) => <HalvesFigure language={language} />
    },
    {
        id: 'periodic-decimals',
        stage: 'infinite-sums',
        title: say('Hamartar periodikoak batura infinitu gisa', 'Decimales periódicos como suma infinita', 'الأعداد العشرية الدورية كمجموع لا نهائي', 'Recurring decimals as infinite sums'),
        goal: say('Hamartar periodiko bat progresio geometriko infinitu baten batura gisa idaztea, eta bere zatiki sortzailea lortzea.', 'Escribir un decimal periódico como la suma de una progresión geométrica infinita y obtener su fracción generatriz.', 'كتابة عدد عشري دوري على صورة مجموع متتالية هندسية لا نهائية والحصول على كسره المولّد.', 'Write a recurring decimal as the sum of an infinite geometric progression and find its generating fraction.'),
        needs: [
            { unit: 'dbh4-akademikoak/numeros-reales', topic: 'generatrix', title: { eu: 'Zatiki sortzailea', es: 'La fracción generatriz', en: 'The generating fraction', ar: 'الكسر المولّد' } }
        ],
        problem: say('Idatzi $0{,}\\overline{36}$ batura infinitu gisa eta aurkitu bere zatikia.', 'Escribe $0{,}\\overline{36}$ como suma infinita y halla su fracción.', 'اكتب $0{,}\\overline{36}$ على صورة مجموع لا نهائي وأوجد كسره.', 'Write $0{,}\\overline{36}$ as an infinite sum and find its fraction.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bloke bakoitza aurrekoa zati 100 da.', 'Cada bloque es el anterior entre 100.', 'كل كتلة هي السابقة مقسومة على 100.', 'Each block is the one before divided by 100.'), math: same('$0{,}36+0{,}0036+0{,}000036+\\ldots$') },
            { text: say('Progresio geometrikoa: $r=\\frac{1}{100}$.', 'Geométrica de razón $r=\\frac{1}{100}$.', 'متتالية هندسية أساسها $r=\\frac{1}{100}$.', 'Geometric with ratio $r=\\frac{1}{100}$.'), math: same('$S_\\infty=\\frac{0{,}36}{1-\\frac{1}{100}}=\\frac{36}{99}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.', 'Simplify.'), math: same('$\\frac{36}{99}=\\frac{4}{11}$') }
        ],
        takeaway: say('Hamartar periodiko bat progresio geometriko infinitua da, $r=\\frac{1}{10}$, $\\frac{1}{100}\\ldots$ arrazoiarekin. Horregatik da beti zatiki bat.', 'Un decimal periódico es una geométrica infinita de razón $r=\\frac{1}{10}$, $\\frac{1}{100}\\ldots$ Por eso siempre es una fracción.', 'العدد العشري الدوري متتالية هندسية لا نهائية أساسها $r=\\frac{1}{10}$ أو $\\frac{1}{100}\\ldots$ لذلك هو كسر دائمًا.', 'A recurring decimal is an infinite geometric series with ratio $r=\\frac{1}{10}$, $\\frac{1}{100}\\ldots$ That is why it is always a fraction.'),
        figure: (language) => <PeriodicFigure language={language} />
    },
    {
        id: 'squares-sum',
        stage: 'infinite-sums',
        title: say('Karratuen batura', 'La suma de los cuadrados', 'مجموع المربعات', 'The sum of the squares'),
        goal: say('Lehen $n$ karratuen batura formula batekin kalkulatzea, eta zergatik betetzen den ikustea.', 'Calcular la suma de los $n$ primeros cuadrados con una fórmula y ver por qué se cumple.', 'حساب مجموع المربعات $n$ الأولى بصيغة ورؤية سبب صحتها.', 'Work out the sum of the first $n$ squares with a formula and see why it holds.'),
        problem: say('Kalkulatu $1^2+2^2+3^2+\\ldots+10^2$.', 'Calcula $1^2+2^2+3^2+\\ldots+10^2$.', 'احسب $1^2+2^2+3^2+\\ldots+10^2$.', 'Work out $1^2+2^2+3^2+\\ldots+10^2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ez da progresio bat: kendurak 3, 5, 7… dira.', 'No es una progresión: las diferencias son 3, 5, 7…', 'ليست متتالية حسابية: الفروق 3 و5 و7…', 'It is not a progression: the differences are 3, 5, 7…'), math: same('$1,\\ 4,\\ 9,\\ 16,\\ 25,\\ldots$') },
            { text: say('Erabili formula $n=10$ balioarekin.', 'Usa la fórmula con $n=10$.', 'استعمل الصيغة مع $n=10$.', 'Use the formula with $n=10$.'), math: same('$\\frac{n(n+1)(2n+1)}{6}=\\frac{10\\cdot 11\\cdot 21}{6}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.', 'Work it out.'), math: same('$\\frac{2310}{6}=385$') }
        ],
        takeaway: say('Lehen $n$ karratuen batura: $\\frac{n(n+1)(2n+1)}{6}$.', 'La suma de los $n$ primeros cuadrados: $\\frac{n(n+1)(2n+1)}{6}$.', 'مجموع المربعات $n$ الأولى: $\\frac{n(n+1)(2n+1)}{6}$.', 'The sum of the first $n$ squares: $\\frac{n(n+1)(2n+1)}{6}$.'),
        figure: (language) => <SquaresPyramidFigure language={language} />
    },

    /* ---------- 4. Limits ---------- */
    {
        id: 'converge',
        stage: 'limits',
        title: say('Zenbaki batera hurbiltzen den segida', 'Una sucesión que se acerca a un número', 'متتالية تقترب من عدد', 'A sequence that approaches a number'),
        goal: say('Segida baten limitea zer den ulertzea, eta gai aurreratuak kalkulatuz asmatzea.', 'Entender qué es el límite de una sucesión y estimarlo calculando términos avanzados.', 'فهم معنى نهاية المتتالية وتقديرها بحساب حدود متقدمة.', 'Understand what the limit of a sequence is and estimate it by working out terms far along.'),
        problem: say('Kalkulatu $a_n=\\frac{3n+2}{n}$ segidaren $a_{10}$, $a_{100}$ eta $a_{1000}$, eta asmatu limitea.', 'Calcula $a_{10}$, $a_{100}$ y $a_{1000}$ de $a_n=\\frac{3n+2}{n}$ y estima su límite.', 'احسب $a_{10}$ و$a_{100}$ و$a_{1000}$ للمتتالية $a_n=\\frac{3n+2}{n}$ وقدّر نهايتها.', 'Work out $a_{10}$, $a_{100}$ and $a_{1000}$ for $a_n=\\frac{3n+2}{n}$ and estimate its limit.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Gai aurreratuak.', 'Términos avanzados.', 'حدود متقدمة.', 'Terms far along.'), math: same('$\\begin{gathered}a_{10}=3{,}2\\\\ a_{100}=3{,}02\\\\ a_{1000}=3{,}002\\end{gathered}$') },
            { text: say('$a_n=3+\\frac{2}{n}$ da, eta $\\frac{2}{n}$ gero eta txikiagoa da.', 'Como $a_n=3+\\frac{2}{n}$, el $\\frac{2}{n}$ es cada vez más pequeño.', 'بما أن $a_n=3+\\frac{2}{n}$ فإن $\\frac{2}{n}$ يصغر أكثر فأكثر.', 'Since $a_n=3+\\frac{2}{n}$, the $\\frac{2}{n}$ gets smaller and smaller.'), math: same('$\\frac{2}{n}\\ \\to\\ 0$') },
            { text: say('Limitea 3 da.', 'El límite es 3.', 'النهاية 3.', 'The limit is 3.'), math: same('$\\lim_{n\\to\\infty}\\frac{3n+2}{n}=3$') }
        ],
        takeaway: say('$a_n$ gaia $L$ zenbakira nahi bezain hurbil geratzen bada $n$ handia denean, $L$ limitea da: segida konbergentea da.', 'Si $a_n$ queda tan cerca de $L$ como se quiera cuando $n$ es grande, $L$ es el límite: la sucesión es convergente.', 'إذا اقترب $a_n$ من $L$ بالقدر الذي نريد عندما يكون $n$ كبيرًا فإن $L$ هي النهاية: المتتالية متقاربة.', 'If $a_n$ stays as close to $L$ as we like when $n$ is large, $L$ is the limit: the sequence is convergent.'),
        figure: (language) => <ConvergeFigure language={language} />
    },
    {
        id: 'from-term',
        stage: 'limits',
        title: say('Zein gaitik aurrera?', '¿A partir de qué término?', 'ابتداءً من أيّ حد؟', 'From which term on?'),
        goal: say('Gai bat aurkitzea, handik aurrera gai guztiak limitetik distantzia jakin bat baino gertuago egoteko.', 'Encontrar a partir de qué término todos están a menos de una distancia dada del límite.', 'إيجاد الحد الذي تكون بعده كل الحدود على بعد أقل من مسافة معطاة عن النهاية.', 'Find from which term on all the terms are less than a given distance from the limit.'),
        problem: say('$a_n=\\frac{2n+1}{n}$ segidaren limitea 2 da. Zein gaitik aurrera daude gai guztiak 2 zenbakitik $0{,}01$ baino gertuago?', '$a_n=\\frac{2n+1}{n}$ tiende a 2. ¿A partir de qué término están todos a menos de $0{,}01$ de 2?', '$a_n=\\frac{2n+1}{n}$ تتجه إلى 2. ابتداءً من أيّ حد تكون كلها على بعد أقل من $0{,}01$ عن 2؟', '$a_n=\\frac{2n+1}{n}$ tends to 2. From which term on are they all less than $0{,}01$ away from 2?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Limiterainoko distantzia.', 'La distancia al límite.', 'المسافة إلى النهاية.', 'The distance to the limit.'), math: same('$|a_n-2|=\\frac{1}{n}$') },
            { text: say('Eskatu $0{,}01$ baino txikiagoa izatea.', 'Pide que sea menor que $0{,}01$.', 'اطلب أن تكون أقل من $0{,}01$.', 'Ask for it to be less than $0{,}01$.'), math: same('$\\frac{1}{n}<0{,}01\\ \\to\\ n>100$') },
            { text: say('Betetzen duen lehenengoa: 101.', 'El primero que lo cumple: el 101.', 'أول حد يحقق ذلك: 101.', 'The first one that works: number 101.'), math: same('$a_{101}=\\frac{203}{101}\\approx 2{,}0099$') }
        ],
        takeaway: say('Limitetik $\\varepsilon$ baino gertuago egotea: $|a_n-L|<\\varepsilon$. Ebatzi desberdintza $n$ zenbakiarentzat.', 'Estar a menos de $\\varepsilon$ del límite: $|a_n-L|<\\varepsilon$. Resuelve la desigualdad para $n$.', 'أن تكون على بعد أقل من $\\varepsilon$ عن النهاية: $|a_n-L|<\\varepsilon$. حُلّ المتباينة بالنسبة إلى $n$.', 'Being less than $\\varepsilon$ from the limit: $|a_n-L|<\\varepsilon$. Solve the inequality for $n$.'),
        figure: (language) => <ConvergeFigure language={language} band />
    },
    {
        id: 'infinite-limits',
        stage: 'limits',
        title: say('Infinitura doa edo oszilatzen du', 'Tiende a infinito u oscila', 'تتجه إلى اللانهاية أو تتذبذب', 'Goes to infinity or oscillates'),
        goal: say('Infinitura doazen segidak eta limiterik ez dutenak bereiztea.', 'Distinguir las sucesiones que tienden a infinito de las que no tienen límite.', 'التمييز بين المتتاليات التي تتجه إلى اللانهاية والتي ليس لها نهاية.', 'Tell the sequences that go to infinity from those that have no limit.'),
        problem: say('Aztertu $a_n=n^2-5n$, $b_n=3-2n$ eta $c_n=(-1)^n$.', 'Estudia $a_n=n^2-5n$, $b_n=3-2n$ y $c_n=(-1)^n$.', 'ادرس $a_n=n^2-5n$ و$b_n=3-2n$ و$c_n=(-1)^n$.', 'Study $a_n=n^2-5n$, $b_n=3-2n$ and $c_n=(-1)^n$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$n^2$ gaiak irabazten du.', 'Manda el $n^2$.', 'الحد $n^2$ هو الغالب.', 'The $n^2$ wins.'), math: same('$a_{100}=9500\\ \\to\\ +\\infty$') },
            { text: say('Gero eta negatiboagoa.', 'Cada vez más negativo.', 'سالبة أكثر فأكثر.', 'More and more negative.'), math: same('$b_{100}=-197\\ \\to\\ -\\infty$') },
            { text: say('1 eta $-1$ artean saltoka: ez du limiterik.', 'Salta entre 1 y $-1$: no tiene límite.', 'تقفز بين 1 و$-1$: ليس لها نهاية.', 'It jumps between 1 and $-1$: it has no limit.'), math: same('$-1,\\ 1,\\ -1,\\ 1,\\ldots$') }
        ],
        takeaway: say('Gaiak nahi bezain handi egiten badira, $+\\infty$; nahi bezain negatibo, $-\\infty$. Bi baliotan saltoka badabil, ez du limiterik: oszilatzailea da.', 'Si los términos se hacen tan grandes como se quiera, $+\\infty$; tan negativos como se quiera, $-\\infty$. Si salta entre dos valores, no tiene límite: es oscilante.', 'إذا كبرت الحدود بالقدر الذي نريد فإلى $+\\infty$، وإذا صارت سالبة بالقدر الذي نريد فإلى $-\\infty$. وإذا قفزت بين قيمتين فليس لها نهاية: إنها متذبذبة.', 'If the terms get as large as we like, $+\\infty$; as negative as we like, $-\\infty$. If it jumps between two values, it has no limit: it oscillates.'),
        figure: (language) => <InfiniteLimitFigure language={language} />
    },
    {
        id: 'quotient-limits',
        stage: 'limits',
        title: say('Polinomioen zatiduraren limitea', 'Límite de un cociente de polinomios', 'نهاية خارج قسمة كثيرتي حدود', 'Limit of a quotient of polynomials'),
        goal: say('Bi polinomioren zatidura den segida baten limitea mailak alderatuz kalkulatzea.', 'Calcular el límite de una sucesión que es cociente de dos polinomios comparando sus grados.', 'حساب نهاية متتالية هي خارج قسمة كثيرتي حدود بمقارنة درجتيهما.', 'Work out the limit of a sequence that is a quotient of two polynomials by comparing their degrees.'),
        problem: say('Kalkulatu $\\lim\\frac{6n^2-n}{2n^2+5}$, $\\lim\\frac{n+4}{n^2}$ eta $\\lim\\frac{n^3}{10n+1}$.', 'Calcula $\\lim\\frac{6n^2-n}{2n^2+5}$, $\\lim\\frac{n+4}{n^2}$ y $\\lim\\frac{n^3}{10n+1}$.', 'احسب $\\lim\\frac{6n^2-n}{2n^2+5}$ و$\\lim\\frac{n+4}{n^2}$ و$\\lim\\frac{n^3}{10n+1}$.', 'Work out $\\lim\\frac{6n^2-n}{2n^2+5}$, $\\lim\\frac{n+4}{n^2}$ and $\\lim\\frac{n^3}{10n+1}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Maila bera: koefiziente nagusien zatidura.', 'Mismo grado: cociente de los coeficientes principales.', 'الدرجة نفسها: خارج قسمة المعاملين الرئيسيين.', 'Same degree: quotient of the leading coefficients.'), math: same('$\\frac{6}{2}=3$') },
            { text: say('Behean maila handiagoa: 0.', 'Grado mayor abajo: 0.', 'درجة المقام أكبر: 0.', 'Higher degree below: 0.'), math: same('$\\frac{n+4}{n^2}=\\frac{1}{n}+\\frac{4}{n^2}\\ \\to\\ 0$') },
            { text: say('Goian maila handiagoa: $+\\infty$.', 'Grado mayor arriba: $+\\infty$.', 'درجة البسط أكبر: $+\\infty$.', 'Higher degree on top: $+\\infty$.'), math: same('$\\frac{n^3}{10n+1}\\ \\to\\ +\\infty$') }
        ],
        takeaway: say('Alderatu mailak: berdinak, koefiziente nagusien zatidura; goian handiagoa, $\\pm\\infty$; behean handiagoa, 0.', 'Compara los grados: iguales, cociente de coeficientes principales; mayor arriba, $\\pm\\infty$; mayor abajo, 0.', 'قارن الدرجتين: متساويتان، خارج قسمة المعاملين الرئيسيين؛ البسط أكبر، $\\pm\\infty$؛ المقام أكبر، 0.', 'Compare the degrees: equal, quotient of the leading coefficients; higher on top, $\\pm\\infty$; higher below, 0.'),
        figure: (language) => <QuotientLimitFigure language={language} />
    },

    /* ---------- 5. The number e ---------- */
    {
        id: 'e-number',
        stage: 'number-e',
        title: say('e zenbakia', 'El número e', 'العدد e', 'The number e'),
        goal: say('$\\left(1+\\frac{1}{n}\\right)^n$ segida $e\\approx 2{,}718$ zenbakira hurbiltzen dela ikustea.', 'Ver que la sucesión $\\left(1+\\frac{1}{n}\\right)^n$ se acerca a $e\\approx 2{,}718$.', 'رؤية أن المتتالية $\\left(1+\\frac{1}{n}\\right)^n$ تقترب من $e\\approx 2{,}718$.', 'See that the sequence $\\left(1+\\frac{1}{n}\\right)^n$ gets close to $e\\approx 2{,}718$.'),
        problem: say('Kalkulatu $\\left(1+\\frac{1}{n}\\right)^n$, $n=1$, $n=10$ eta $n=1000$ direnean.', 'Calcula $\\left(1+\\frac{1}{n}\\right)^n$ para $n=1$, $n=10$ y $n=1000$.', 'احسب $\\left(1+\\frac{1}{n}\\right)^n$ عندما $n=1$ و$n=10$ و$n=1000$.', 'Work out $\\left(1+\\frac{1}{n}\\right)^n$ for $n=1$, $n=10$ and $n=1000$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$n=1$ balioarekin, bikoiztu egiten da.', 'Con $n=1$, se duplica.', 'مع $n=1$ يتضاعف.', 'With $n=1$, it doubles.'), math: same('$\\left(1+1\\right)^1=2$') },
            { text: say('$n=10$ balioarekin.', 'Con $n=10$.', 'مع $n=10$.', 'With $n=10$.'), math: same('$1{,}1^{10}\\approx 2{,}594$') },
            { text: say('$n=1000$ balioarekin, ia $e$.', 'Con $n=1000$, casi $e$.', 'مع $n=1000$ تقريبًا $e$.', 'With $n=1000$, almost $e$.'), math: same('$1{,}001^{1000}\\approx 2{,}717$') }
        ],
        takeaway: say('$\\left(1+\\frac{1}{n}\\right)^n$ gorakorra da, eta $e=2{,}71828\\ldots$ zenbakira hurbiltzen da, inoiz iritsi gabe. $e$ irrazionala da.', '$\\left(1+\\frac{1}{n}\\right)^n$ es creciente y se acerca a $e=2{,}71828\\ldots$ sin llegar nunca. $e$ es irracional.', '$\\left(1+\\frac{1}{n}\\right)^n$ متزايدة وتقترب من $e=2{,}71828\\ldots$ دون أن تبلغه أبدًا. والعدد $e$ غير نسبي.', '$\\left(1+\\frac{1}{n}\\right)^n$ is increasing and gets close to $e=2{,}71828\\ldots$ without ever reaching it. $e$ is irrational.'),
        figure: (language) => <ENumberFigure language={language} />
    },
    {
        id: 'continuous-growth',
        stage: 'number-e',
        title: say('Hazkunde jarraitua', 'Crecimiento continuo', 'النمو المستمر', 'Continuous growth'),
        goal: say('$\\left(1+\\frac{k}{n}\\right)^n$ segidaren limitea $e^k$ dela erabiltzea, hazkunde jarraituaren problemetan.', 'Usar que el límite de $\\left(1+\\frac{k}{n}\\right)^n$ es $e^k$ en problemas de crecimiento continuo.', 'استعمال أن نهاية $\\left(1+\\frac{k}{n}\\right)^n$ هي $e^k$ في مسائل النمو المستمر.', 'Use the fact that the limit of $\\left(1+\\frac{k}{n}\\right)^n$ is $e^k$ in continuous growth problems.'),
        problem: say('500 € % 6 interesarekin jartzen dira, interes jarraituan. Zenbat diru egongo da 10 urte barru?', 'Se colocan 500 € al 6 % con interés continuo. ¿Cuánto dinero habrá dentro de 10 años?', 'تُستثمر 500 € بفائدة مستمرة نسبتها 6 %. كم يصير المال بعد 10 سنوات؟', 'You invest €500 at 6% continuous interest. How much money will there be in 10 years?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Urtero, interes jarraituarekin: bider $e^{0{,}06}$.', 'Cada año, con interés continuo: por $e^{0{,}06}$.', 'كل سنة بفائدة مستمرة: في $e^{0{,}06}$.', 'Each year, with continuous interest: times $e^{0{,}06}$.'), math: same('$\\left(1+\\frac{0{,}06}{n}\\right)^n\\ \\to\\ e^{0{,}06}$') },
            { text: say('10 urtean.', 'En 10 años.', 'في 10 سنوات.', 'In 10 years.'), math: same('$500\\cdot e^{0{,}06\\cdot 10}=500\\cdot e^{0{,}6}$') },
            { text: say('Kalkulagailuarekin.', 'Con la calculadora.', 'بالآلة الحاسبة.', 'With a calculator.'), math: same('$500\\cdot e^{0{,}6}\\approx 911{,}06$') }
        ],
        takeaway: say('$\\left(1+\\frac{k}{n}\\right)^n\\ \\to\\ e^k$. Interes jarraituan, $C=C_0\\cdot e^{k\\,t}$.', '$\\left(1+\\frac{k}{n}\\right)^n\\ \\to\\ e^k$. Con interés continuo, $C=C_0\\cdot e^{k\\,t}$.', '$\\left(1+\\frac{k}{n}\\right)^n\\ \\to\\ e^k$. ومع الفائدة المستمرة $C=C_0\\cdot e^{k\\,t}$.', '$\\left(1+\\frac{k}{n}\\right)^n\\ \\to\\ e^k$. With continuous interest, $C=C_0\\cdot e^{k\\,t}$.'),
        figure: (language) => <ContinuousGrowthFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bachSequencesTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bachSequencesLessonTexts[topic.id as BachSequencesTopicId], ...bachSequencesLessonChecks[topic.id as BachSequencesTopicId] }))

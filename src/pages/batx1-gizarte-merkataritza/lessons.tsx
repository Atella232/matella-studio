import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { bachSequencesTopics } from '../batx1-zientziak-segidak/lessons'
import { CompoundInterestFigure } from '../dbh4-akademikoak-errealak/figures'
import { realsPercentTopics } from '../dbh4-akademikoak-errealak/lessons'
import { proportionDbh4ApTopics } from '../dbh4-aplikatuak-proportzionaltasuna/lessons'
import { AmortizationFigure, PensionFigure } from './figures'
import { gizMoneyLessonChecks, type GizMoneyTopicId } from './lessonChecks'
import { gizMoneyLessonTexts } from './lessonTexts'

/* ==========================================================================
   Merkataritza-aritmetika · Batxilergoa 1 · Gizarte Zientziak — stages and
   lessons, in the order of unit 2 of Anaya Matemáticas aplicadas a las
   Ciencias Sociales I: percentages, compound interest, the APR (TAE),
   savings with geometric progressions and loans. Six lessons come from
   4. DBH and 1.º Ciencias, imported unchanged in another stage; eight are
   of this unit.
   ========================================================================== */

export type GizMoneyStageId = 'percent' | 'interest' | 'tae' | 'savings' | 'loans'

export const gizMoneyStages: UnitStage[] = [
    { id: 'percent', tone: 'blue', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' } },
    { id: 'interest', tone: 'violet', title: { eu: 'Interes konposatua', es: 'Interés compuesto', en: 'Compound interest', ar: 'الفائدة المركبة' } },
    { id: 'tae', tone: 'mustard', title: { eu: 'Urteko tasa baliokidea', es: 'La TAE', en: 'The APR', ar: 'المعدل السنوي المكافئ' } },
    { id: 'savings', tone: 'green', title: { eu: 'Aldizkako aurrezkia', es: 'Ahorro periódico', en: 'Regular saving', ar: 'الادخار الدوري' } },
    { id: 'loans', tone: 'coral', title: { eu: 'Maileguak', es: 'Préstamos', en: 'Loans', ar: 'القروض' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** A lesson of another unit, unchanged, in a stage of this unit */
function borrowed(topics: UnitTopic[], id: string, stage: GizMoneyStageId): UnitTopic {
    const topic = topics.find((item) => item.id === id)
    if (!topic) throw new Error(`No lesson ${id}`)
    return { ...topic, stage }
}

/** The eight lessons of this unit, without what they tell (lessonTexts.ts) */
const ownTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 2. Compound interest ---------- */
    {
        id: 'interest-time',
        stage: 'interest',
        title: say('Zenbat urte behar dira?', '¿Cuántos años hacen falta?', 'كم سنة تلزم؟', 'How many years does it take?'),
        goal: say('Kapital bat kopuru batera iristeko behar den denbora logaritmoekin kalkulatzea.', 'Calcular con logaritmos el tiempo que tarda un capital en llegar a una cantidad.', 'حساب الزمن اللازم لبلوغ رأس مال مبلغًا معيّنًا باستعمال اللوغاريتمات.', 'Use logarithms to work out how long a capital takes to reach an amount.'),
        needs: [
            { unit: 'dbh4-aplikatuak/proporcionalidad', topic: 'compound-interest', title: { eu: 'Interes konposatua', es: 'El interés compuesto', en: 'Compound interest', ar: 'الفائدة المركّبة' } }
        ],
        problem: say('Zenbat urte behar dira 8000 euro $10\\,000$ euro bihurtzeko, urteko interesa % 4 bada?', '¿Cuántos años hacen falta para que 8000 euros se conviertan en $10\\,000$ euros al 4 % anual?', 'كم سنة تلزم لتصبح 8000 يورو $10\\,000$ يورو بفائدة 4 % سنويًا؟', 'How many years does it take for 8,000 euros to become $10\\,000$ euros at 4% a year?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi ekuazioa: kapitala bider $1{,}04$ urte bakoitzean.', 'Escribe la ecuación: el capital por $1{,}04$ cada año.', 'اكتب المعادلة: رأس المال في $1{,}04$ كل سنة.', 'Write the equation: the capital times $1{,}04$ each year.'), math: same('$8000\\cdot 1{,}04^{n}=10\\,000$') },
            { text: say('Zatitu kapitalaz.', 'Divide entre el capital.', 'اقسم على رأس المال.', 'Divide by the capital.'), math: same('$1{,}04^{n}=1{,}25$') },
            { text: say('Hartu logaritmoak, eta biribildu gora: urte osoak.', 'Toma logaritmos y redondea hacia arriba: años completos.', 'خذ اللوغاريتمات وقرّب إلى الأعلى: سنوات كاملة.', 'Take logarithms and round up: whole years.'), math: same('$n=\\frac{\\log 1{,}25}{\\log 1{,}04}\\approx 5{,}69\\ \\to\\ 6$') }
        ],
        takeaway: say('$C\\cdot(1+i)^{n}=C_f\\ \\to\\ n=\\frac{\\log C_f-\\log C}{\\log(1+i)}$. Hamartarrak badaude, hurrengo urte osoa.', '$C\\cdot(1+i)^{n}=C_f\\ \\to\\ n=\\frac{\\log C_f-\\log C}{\\log(1+i)}$. Si sale con decimales, el año completo siguiente.', '$C\\cdot(1+i)^{n}=C_f\\ \\to\\ n=\\frac{\\log C_f-\\log C}{\\log(1+i)}$. وإذا ظهرت أرقام عشرية فالسنة الكاملة التالية.', '$C\\cdot(1+i)^{n}=C_f\\ \\to\\ n=\\frac{\\log C_f-\\log C}{\\log(1+i)}$. If there are decimals, the next whole year.'),
        figure: (language) => <CompoundInterestFigure language={language} />
    },

    /* ---------- 3. The APR ---------- */
    {
        id: 'tae',
        stage: 'tae',
        title: say('Urteko tasa baliokidea', 'La TAE', 'المعدل السنوي المكافئ', 'The APR'),
        goal: say('Interes nominal batetik, aldi batzuetan ordainduta, urteko tasa baliokidea kalkulatzea.', 'Calcular la TAE de un interés nominal que se paga en varios periodos al año.', 'حساب المعدل السنوي المكافئ لفائدة اسمية تُدفع على عدة فترات في السنة.', 'Work out the APR of a nominal interest paid in several periods a year.'),
        needs: [
            { unit: 'dbh4-aplikatuak/proporcionalidad', topic: 'periods', title: { eu: 'Kapitalizazio-aldiak', es: 'Periodos de capitalización', en: 'Compounding periods', ar: 'فترات الرسملة' } }
        ],
        problem: say('Gordailu batek urteko % 6 ematen du, interesak hilero ordainduta. Zein da urteko tasa baliokidea?', 'Un depósito ofrece un 6 % anual con pago mensual de intereses. ¿Cuál es la TAE?', 'وديعة تعطي 6 % سنويًا مع دفع شهري للفوائد. ما المعدل السنوي المكافئ؟', 'A deposit offers 6% a year with interest paid monthly. What is the APR?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hileko interesa: urtekoa zati 12.', 'Interés mensual: el anual entre 12.', 'الفائدة الشهرية: السنوية مقسومة على 12.', 'Monthly interest: the yearly one divided by 12.'), math: same('$\\frac{0{,}06}{12}=0{,}005$') },
            { text: say('Urtean 12 aldiz biderkatzen da.', 'En un año se multiplica 12 veces.', 'في السنة يُضرب 12 مرة.', 'In a year it is multiplied 12 times.'), math: same('$1{,}005^{12}\\approx 1{,}0617$') },
            { text: say('Kendu 1: hori da urteko tasa baliokidea.', 'Resta 1: esa es la TAE.', 'اطرح 1: هذا هو المعدل السنوي المكافئ.', 'Subtract 1: that is the APR.'), math: same('$1{,}0617-1=0{,}0617\\ \\to\\ 6{,}17\\,\\%$') }
        ],
        takeaway: say('$n$ aldiz ordainduta, urteko tasa baliokidea $\\left(1+\\frac{r}{n}\\right)^{n}-1$ da. Aldi gehiago, tasa handiagoa; urtean behin, interes nominala bera.', 'Pagado $n$ veces, la TAE es $\\left(1+\\frac{r}{n}\\right)^{n}-1$. Más periodos, más TAE; una vez al año, el mismo interés nominal.', 'إذا دُفعت $n$ مرات فالمعدل السنوي المكافئ $\\left(1+\\frac{r}{n}\\right)^{n}-1$. فترات أكثر تعني معدلًا أكبر، ومرة واحدة في السنة تعني الفائدة الاسمية نفسها.', 'Paid $n$ times, the APR is $\\left(1+\\frac{r}{n}\\right)^{n}-1$. More periods, a higher APR; once a year, the nominal interest itself.')
    },
    {
        id: 'tae-costs',
        stage: 'tae',
        title: say('Gastuak dituen mailegua', 'Un préstamo con gastos', 'قرض بمصاريف', 'A loan with costs'),
        goal: say('Hasierako gastuak dituen mailegu baten urteko tasa baliokidea kalkulatzea.', 'Calcular la TAE de un préstamo con gastos al firmarlo.', 'حساب المعدل السنوي المكافئ لقرض بمصاريف عند توقيعه.', 'Work out the APR of a loan with costs when it is signed.'),
        problem: say('5000 euroko mailegua ematen dizute, urteko interesa % 8, urtebetean itzultzekoa, baina 100 euroko gastuak kobratzen dituzte sinatzean. Zein da urteko tasa baliokidea?', 'Te prestan 5000 euros al 8 % anual, a devolver en un año, pero te cobran 100 euros de gastos al firmar. ¿Cuál es la TAE?', 'يُقرضونك 5000 يورو بفائدة 8 % سنويًا تُسدَّد بعد سنة، لكنهم يأخذون 100 يورو مصاريف عند التوقيع. ما المعدل السنوي المكافئ؟', 'You are lent 5,000 euros at 8% a year, paid back in one year, but they charge 100 euros of costs when you sign. What is the APR?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Urtebete barru itzultzen duzuna:', 'Lo que devuelves al cabo de un año:', 'ما تعيده بعد سنة:', 'What you pay back after one year:'), math: same('$5000\\cdot 1{,}08=5400$') },
            { text: say('Baina benetan jaso duzuna:', 'Pero lo que recibiste de verdad:', 'لكن ما استلمته فعلًا:', 'But what you really received:'), math: same('$5000-100=4900$') },
            { text: say('Konparatu biak: hori da urteko tasa baliokidea.', 'Compara los dos: esa es la TAE.', 'قارن الاثنين: هذا هو المعدل السنوي المكافئ.', 'Compare the two: that is the APR.'), math: same('$\\frac{5400}{4900}\\approx 1{,}102\\ \\to\\ 10{,}2\\,\\%$') }
        ],
        takeaway: say('Gastuekin, urtebetean $1+T=\\frac{D}{R}$: itzultzen dena zati jasotzen dena. Tasa iragarritako interesa baino handiagoa da.', 'Con gastos, en un año $1+T=\\frac{D}{R}$: lo devuelto entre lo recibido. La TAE es mayor que el interés anunciado.', 'مع المصاريف، في سنة واحدة $1+T=\\frac{D}{R}$: المُعاد مقسومًا على المُستلم. والمعدل أكبر من الفائدة المعلنة.', 'With costs, in one year $1+T=\\frac{D}{R}$: what you pay back divided by what you receive. The APR is greater than the advertised interest.')
    },

    /* ---------- 4. Regular saving ---------- */
    {
        id: 'geometric-sum',
        stage: 'savings',
        title: say('Progresio geometriko baten batura', 'Sumar una progresión geométrica', 'مجموع متتالية هندسية', 'Adding a geometric progression'),
        goal: say('Progresio geometriko baten lehen gaiak formula batekin batzea.', 'Sumar con una fórmula los primeros términos de una progresión geométrica.', 'جمع الحدود الأولى لمتتالية هندسية بصيغة.', 'Add the first terms of a geometric progression with a formula.'),
        needs: [
            { unit: 'batx1-zientziak/sucesiones', topic: 'geometric', title: { eu: 'Progresio geometrikoak', es: 'Progresiones geométricas', en: 'Geometric progressions', ar: 'المتتاليات الهندسية' } }
        ],
        problem: say('Lehen hilean 100 euro aurrezten dituzu, eta hilero aurrekoa baino % 10 gehiago. Zenbat aurreztu duzu 6 hilabetean?', 'Ahorras 100 euros el primer mes, y cada mes un 10 % más que el anterior. ¿Cuánto has ahorrado en 6 meses?', 'تدّخر 100 يورو في الشهر الأول، وكل شهر 10 % أكثر من السابق. كم ادّخرت في 6 أشهر؟', 'You save 100 euros the first month, and each month 10% more than the one before. How much have you saved in 6 months?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Progresio geometrikoa da: lehen gaia eta arrazoia.', 'Es una progresión geométrica: primer término y razón.', 'إنها متتالية هندسية: الحد الأول والأساس.', 'It is a geometric progression: first term and ratio.'), math: same('$a_1=100\\qquad r=1{,}1$') },
            { text: say('Batuketaren formula:', 'La fórmula de la suma:', 'صيغة المجموع:', 'The formula for the sum:'), math: same('$S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$') },
            { text: say('Ordeztu $n=6$:', 'Sustituye $n=6$:', 'عوّض $n=6$:', 'Put in $n=6$:'), math: same('$S_6=100\\cdot\\frac{1{,}1^{6}-1}{1{,}1-1}\\approx 771{,}56$') }
        ],
        takeaway: say('$S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$: lehen gaia, arrazoia eta gai kopurua.', '$S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$: el primer término, la razón y el número de términos.', '$S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$: الحد الأول والأساس وعدد الحدود.', '$S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$: the first term, the ratio and the number of terms.')
    },
    {
        id: 'pension',
        stage: 'savings',
        title: say('Pentsio-planak', 'Planes de pensiones', 'خطط التقاعد', 'Pension plans'),
        goal: say('Urtero kopuru bera sartuz biltzen den kapitala kalkulatzea.', 'Calcular el capital que se junta ingresando cada año la misma cantidad.', 'حساب رأس المال الذي يُجمع بإيداع المبلغ نفسه كل سنة.', 'Work out the capital built up by paying in the same amount each year.'),
        needs: [
            { unit: 'batx1-zientziak/sucesiones', topic: 'geometric', title: { eu: 'Progresio geometrikoak', es: 'Progresiones geométricas', en: 'Geometric progressions', ar: 'المتتاليات الهندسية' } }
        ],
        problem: say('1000 euro sartzen dituzu urte hasieran, 5 urtez, interesa % 4 dela. Zenbat duzu bosgarren urtearen amaieran?', 'Ingresas 1000 euros al principio de cada año, durante 5 años, al 4 % anual. ¿Cuánto tienes al final del quinto año?', 'تودع 1000 يورو في بداية كل سنة لمدة 5 سنوات بفائدة 4 % سنويًا. كم لديك في نهاية السنة الخامسة؟', 'You pay in 1,000 euros at the start of each year for 5 years at 4% a year. How much do you have at the end of the fifth year?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Azken diru-sarrerak urte bat hazten du; lehenengoak, bost.', 'El último ingreso crece un año; el primero, cinco.', 'الإيداع الأخير ينمو سنة واحدة، والأول خمس سنوات.', 'The last deposit grows one year; the first, five.'), math: same('$1000\\cdot 1{,}04,\\ \\ldots,\\ 1000\\cdot 1{,}04^{5}$') },
            { text: say('Progresio geometrikoa da, $1{,}04$ arrazoiarekin: batu.', 'Es una progresión geométrica de razón $1{,}04$: súmala.', 'إنها متتالية هندسية أساسها $1{,}04$: اجمعها.', 'It is a geometric progression with ratio $1{,}04$: add it up.'), math: same('$S=1000\\cdot 1{,}04\\cdot\\frac{1{,}04^{5}-1}{1{,}04-1}$') },
            { text: say('Kalkulatu:', 'Calcula:', 'احسب:', 'Work it out:'), math: same('$S\\approx 5632{,}98$') }
        ],
        takeaway: say('Urte hasieran $a$ sartuta, $n$ urtez: $C=a\\cdot(1+i)\\cdot\\frac{(1+i)^{n}-1}{i}$. Lehen diru-sarrerak hazten du gehien.', 'Ingresando $a$ al principio de cada año, durante $n$ años: $C=a\\cdot(1+i)\\cdot\\frac{(1+i)^{n}-1}{i}$. El primer ingreso es el que más crece.', 'بإيداع $a$ في بداية كل سنة لمدة $n$ سنة: $C=a\\cdot(1+i)\\cdot\\frac{(1+i)^{n}-1}{i}$. والإيداع الأول هو الأكثر نموًا.', 'Paying in $a$ at the start of each year, for $n$ years: $C=a\\cdot(1+i)\\cdot\\frac{(1+i)^{n}-1}{i}$. The first deposit grows the most.'),
        figure: (language) => <PensionFigure language={language} />
    },

    /* ---------- 5. Loans ---------- */
    {
        id: 'loan-payment',
        stage: 'loans',
        title: say('Mailegu baten kuota', 'La cuota de un préstamo', 'قسط القرض', 'The payment of a loan'),
        goal: say('Mailegu bat ordainketa berdinetan itzultzeko urtekoa kalkulatzea.', 'Calcular la anualidad que devuelve un préstamo en pagos iguales.', 'حساب الدفعة السنوية التي تسدّد قرضًا على دفعات متساوية.', 'Work out the yearly payment that pays back a loan in equal payments.'),
        problem: say('$10\\,000$ euroko mailegu bat, interesa % 5, urteko hiru ordainketa berdinetan itzultzen da. Zenbatekoa da urtekoa?', 'Un préstamo de $10\\,000$ euros al 5 % anual se devuelve en tres pagos anuales iguales. ¿Cuál es la anualidad?', 'يُسدَّد قرض قدره $10\\,000$ يورو بفائدة 5 % سنويًا على ثلاث دفعات سنوية متساوية. ما الدفعة السنوية؟', 'A loan of $10\\,000$ euros at 5% a year is paid back in three equal yearly payments. What is the yearly payment?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Datuak:', 'Los datos:', 'المعطيات:', 'The data:'), math: same('$C=10\\,000\\qquad i=0{,}05\\qquad n=3$') },
            { text: say('Urtekoaren formula:', 'La fórmula de la anualidad:', 'صيغة الدفعة السنوية:', 'The formula for the yearly payment:'), math: same('$a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$') },
            { text: say('Ordeztu eta kalkulatu:', 'Sustituye y calcula:', 'عوّض واحسب:', 'Put in the numbers and work it out:'), math: same('$a=10\\,000\\cdot\\frac{1{,}05^{3}\\cdot 0{,}05}{1{,}05^{3}-1}\\approx 3672{,}09$') }
        ],
        takeaway: say('$a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$. Guztira maileguaren kopurua baino gehiago ordaintzen da: $n\\cdot a>C$, eta aldea interesak dira.', '$a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$. En total se paga más que el préstamo: $n\\cdot a>C$, y la diferencia son los intereses.', '$a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$. نُدفع إجمالًا أكثر من القرض: $n\\cdot a>C$، والفرق هو الفوائد.', '$a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$. In all you pay more than the loan: $n\\cdot a>C$, and the difference is the interest.')
    },
    {
        id: 'amortization-table',
        stage: 'loans',
        title: say('Amortizazio-taula', 'La tabla de amortización', 'جدول الإطفاء', 'The repayment table'),
        goal: say('Mailegu baten taula egitea: interesak, amortizazioa eta zor bizia urtez urte.', 'Hacer la tabla de un préstamo: intereses, amortización y deuda pendiente año a año.', 'إعداد جدول القرض: الفوائد والإطفاء والدين المتبقي سنة بعد سنة.', 'Make the table of a loan: interest, repayment and outstanding debt year by year.'),
        problem: say('4000 euroko mailegua, interesa % 5, $2151{,}22$ euroko bi urtekotan. Egin taula.', 'Préstamo de 4000 euros al 5 % en dos anualidades de $2151{,}22$ euros. Haz la tabla.', 'قرض قدره 4000 يورو بفائدة 5 % على دفعتين سنويتين من $2151{,}22$ يورو. أعدّ الجدول.', 'A loan of 4,000 euros at 5% in two yearly payments of $2151{,}22$ euros. Make the table.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen urtea: interesak eta amortizazioa.', 'Primer año: intereses y amortización.', 'السنة الأولى: الفوائد والإطفاء.', 'First year: interest and repayment.'), math: same('$4000\\cdot 0{,}05=200\\qquad 2151{,}22-200=1951{,}22$') },
            { text: say('Zor bizia:', 'Deuda pendiente:', 'الدين المتبقي:', 'Outstanding debt:'), math: same('$4000-1951{,}22=2048{,}78$') },
            { text: say('Bigarren urtea: amortizazioak zorra zero uzten du.', 'Segundo año: la amortización deja la deuda en cero.', 'السنة الثانية: الإطفاء يجعل الدين صفرًا.', 'Second year: the repayment leaves the debt at zero.'), math: same('$2048{,}78\\cdot 0{,}05\\approx 102{,}44\\qquad 2151{,}22-102{,}44=2048{,}78$') }
        ],
        takeaway: say('Urte bakoitzean: interesak = zorra bider $i$; amortizazioa = urtekoa ken interesak; zor berria = zorra ken amortizazioa.', 'Cada año: intereses = deuda por $i$; amortización = anualidad menos intereses; deuda nueva = deuda menos amortización.', 'كل سنة: الفوائد = الدين مضروبًا في $i$، والإطفاء = الدفعة ناقص الفوائد، والدين الجديد = الدين ناقص الإطفاء.', 'Each year: interest = debt times $i$; repayment = payment minus interest; new debt = debt minus repayment.'),
        figure: (language) => <AmortizationFigure language={language} />
    },
    {
        id: 'pending-debt',
        stage: 'loans',
        title: say('Zor bizia eta ezeztapena', 'Deuda pendiente y cancelación', 'الدين المتبقي والإلغاء', 'Outstanding debt and early repayment'),
        goal: say('Mailegu bat garaia baino lehen ezeztatzeko zenbat ordaintzen den kalkulatzea.', 'Calcular cuánto se paga para cancelar un préstamo antes de tiempo.', 'حساب ما يُدفع لإلغاء قرض قبل موعده.', 'Work out how much is paid to pay off a loan early.'),
        problem: say('Urtebeteren ondoren, zor bizia 8000 euro da. Ezeztatzeko komisioa % 2 da. Zenbat ordaintzen duzu?', 'Tras un año, la deuda pendiente es de 8000 euros. Cancelarla tiene una comisión del 2 %. ¿Cuánto pagas?', 'بعد سنة، الدين المتبقي 8000 يورو. وللإلغاء عمولة 2 %. كم تدفع؟', 'After a year, the outstanding debt is 8,000 euros. Cancelling it has a 2% fee. How much do you pay?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Taulan, zor bizia:', 'En la tabla, la deuda pendiente:', 'في الجدول، الدين المتبقي:', 'In the table, the outstanding debt:'), math: same('$D=8000$') },
            { text: say('Komisioa, zor biziaren gainean:', 'La comisión, sobre la deuda pendiente:', 'العمولة على الدين المتبقي:', 'The fee, on the outstanding debt:'), math: same('$8000\\cdot 0{,}02=160$') },
            { text: say('Guztira:', 'En total:', 'المجموع:', 'In all:'), math: same('$8000+160=8160$') }
        ],
        takeaway: say('Ezeztatzeko, zor bizia eta komisioa ordaintzen dira: $D\\cdot(1+c)$. Ez dira geratzen diren kuotak batzen.', 'Para cancelar se paga la deuda pendiente más la comisión: $D\\cdot(1+c)$. No se suman las cuotas que quedan.', 'للإلغاء يُدفع الدين المتبقي مع العمولة: $D\\cdot(1+c)$، ولا تُجمع الأقساط الباقية.', 'To cancel you pay the outstanding debt plus the fee: $D\\cdot(1+c)$. The instalments left are not added up.')
    }
]

const own = (id: GizMoneyTopicId): UnitTopic => {
    const topic = ownTopics.find((item) => item.id === id)!
    return { ...topic, ...gizMoneyLessonTexts[id], ...gizMoneyLessonChecks[id] }
}

/** The fourteen lessons in the order of the book */
export const gizMoneyTopics: UnitTopic[] = [
    borrowed(proportionDbh4ApTopics, 'index', 'percent'),
    borrowed(proportionDbh4ApTopics, 'chained', 'percent'),
    borrowed(realsPercentTopics, 'percent-inverse', 'percent'),
    borrowed(proportionDbh4ApTopics, 'compound-interest', 'interest'),
    borrowed(proportionDbh4ApTopics, 'periods', 'interest'),
    own('interest-time'),
    own('tae'),
    own('tae-costs'),
    borrowed(bachSequencesTopics, 'geometric', 'savings'),
    own('geometric-sum'),
    own('pension'),
    own('loan-payment'),
    own('amortization-table'),
    own('pending-debt')
]

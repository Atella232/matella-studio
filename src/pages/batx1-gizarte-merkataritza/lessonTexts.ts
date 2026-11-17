import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { GizMoneyTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Merkataritza-aritmetika · Batxilergoa 1 · Gizarte Zientziak — what the
   eight lessons of its own tell: definitions, a short explanation, the
   example as an exercise («Another example») and the key words in four
   languages. The example uses numbers of its own, never those of «Let's
   solve», of «Check it» or of the typical mistake. Arabic writes the
   decimal point. In Basque the APR (TAE) is «urteko tasa baliokidea».
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const gizMoneyLessonTexts: Record<GizMoneyTopicId, LessonTexts> = {
    'interest-time': {
        definitions: [
            {
                term: say('Azken kapitala', 'Capital final', 'رأس المال النهائي', 'Final capital'),
                meaning: say('Dirua amaieran zenbat den: $C\\cdot(1+i)^{n}$.', 'Lo que vale el dinero al final: $C\\cdot(1+i)^{n}$.', 'قيمة المال في النهاية: $C\\cdot(1+i)^{n}$.', 'What the money is worth at the end: $C\\cdot(1+i)^{n}$.')
            }
        ],
        vocabulary: [
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm'),
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('urtea', 'año', 'السنة', 'year')
        ],
        explanation: say(
            'Interes konposatuan, denbora berretzailean dago: $C\\cdot(1+i)^{n}=C_f$. Askatzeko, kapitalaz zatitzen da eta logaritmoak hartzen dira: $n=\\frac{\\log C_f-\\log C}{\\log(1+i)}$. Hamartarrak ateratzen badira, hurrengo urtea behar da, bankuak urte osoengatik ordaintzen baititu interesak.',
            'En el interés compuesto, el tiempo está en el exponente: $C\\cdot(1+i)^{n}=C_f$. Para despejarlo se divide entre el capital y se toman logaritmos: $n=\\frac{\\log C_f-\\log C}{\\log(1+i)}$. Si salen decimales, hace falta el año siguiente, porque el banco paga los intereses por años completos.',
            'في الفائدة المركبة يكون الزمن في الأس: $C\\cdot(1+i)^{n}=C_f$. لعزله نقسم على رأس المال ونأخذ اللوغاريتمات: $n=\\frac{\\log C_f-\\log C}{\\log(1+i)}$. وإذا ظهرت أرقام عشرية نحتاج إلى السنة التالية، لأن المصرف يدفع الفوائد عن سنوات كاملة.',
            'In compound interest, time is in the exponent: $C\\cdot(1+i)^{n}=C_f$. To solve for it, divide by the capital and take logarithms: $n=\\frac{\\log C_f-\\log C}{\\log(1+i)}$. If there are decimals, the next year is needed, because the bank pays interest for whole years.'
        ),
        examplePrompt: say('Zenbat urtetan bikoizten da kapital bat, urteko interesa % 5 bada?', '¿En cuántos años se duplica un capital al 5 % anual?', 'في كم سنة يتضاعف رأس مال بفائدة 5 % سنويًا؟', 'In how many years does a capital double at 5% a year?'),
        example: same('$1{,}05^{n}=2\\ \\to\\ n=\\frac{\\log 2}{\\log 1{,}05}\\approx 14{,}2$'),
        exampleAnswer: say('15 urtetan: 14 urtetan ez da bikoizten oraindik.', 'En 15 años: en 14 todavía no se duplica.', 'في 15 سنة: في 14 سنة لا يتضاعف بعد.', 'In 15 years: in 14 it has not doubled yet.')
    },
    tae: {
        definitions: [
            {
                term: say('Interes nominala', 'Interés nominal', 'الفائدة الاسمية', 'Nominal interest'),
                meaning: say('Bankuak iragartzen duen urteko interesa, aldietan banatu aurretik.', 'El interés anual que anuncia el banco, antes de repartirlo en periodos.', 'الفائدة السنوية التي يعلنها المصرف قبل توزيعها على الفترات.', 'The yearly interest the bank advertises, before it is split into periods.')
            },
            {
                term: say('Urteko tasa baliokidea', 'TAE', 'المعدل السنوي المكافئ', 'APR'),
                meaning: say('Urtean behin ordainduta, benetako produktuaren emaitza bera ematen duen interesa.', 'El interés que, pagado una vez al año, da lo mismo que el producto real.', 'الفائدة التي تعطي النتيجة نفسها لو دُفعت مرة واحدة في السنة.', 'The interest that, paid once a year, gives the same as the real product.')
            }
        ],
        vocabulary: [
            say('hilero', 'mensual', 'شهري', 'monthly'),
            say('aldia', 'periodo', 'الفترة', 'period'),
            say('interesa', 'interés', 'الفائدة', 'interest')
        ],
        explanation: say(
            'Urteko % $r$ interesa $n$ aldiz ordaintzen bada, aldi bakoitzean $\\frac{r}{n}$ ordaintzen da, eta interesek ere interesak sortzen dituzte. Horregatik urte amaieran dirua $\\left(1+\\frac{r}{n}\\right)^{n}$ aldiz biderkatzen da, eta urteko tasa baliokidea interes nominala baino handiagoa da. Hilero ordainduta, gehiago; urtean behin, berdina.',
            'Si un interés anual $r$ se paga $n$ veces, cada periodo se paga $\\frac{r}{n}$, y los intereses también producen intereses. Por eso al final del año el dinero se multiplica por $\\left(1+\\frac{r}{n}\\right)^{n}$, y la TAE es mayor que el interés nominal. Con pago mensual, más; con pago anual, igual.',
            'إذا دُفعت فائدة سنوية $r$ عدد $n$ من المرات، يُدفع في كل فترة $\\frac{r}{n}$، والفوائد تولّد فوائد أيضًا. لذلك يُضرب المال في نهاية السنة في $\\left(1+\\frac{r}{n}\\right)^{n}$، ويكون المعدل السنوي المكافئ أكبر من الفائدة الاسمية. مع الدفع الشهري أكثر، ومع الدفع السنوي مساوٍ.',
            'If a yearly interest $r$ is paid $n$ times, each period pays $\\frac{r}{n}$, and the interest also earns interest. So at the end of the year the money is multiplied by $\\left(1+\\frac{r}{n}\\right)^{n}$, and the APR is greater than the nominal interest. Paid monthly, more; paid yearly, the same.'
        ),
        examplePrompt: say('Zein da urteko % 8 interesaren tasa baliokidea, hiruhilekoan ordainduta?', '¿Cuál es la TAE de un 8 % anual con pago trimestral?', 'ما المعدل السنوي المكافئ لفائدة 8 % سنويًا تُدفع كل ثلاثة أشهر؟', 'What is the APR of 8% a year paid quarterly?'),
        example: same('$\\left(1+\\frac{0{,}08}{4}\\right)^{4}=1{,}02^{4}\\approx 1{,}0824$'),
        exampleAnswer: say('Urteko tasa baliokidea % $8{,}24$ da.', 'La TAE es el $8{,}24$ %.', 'المعدل السنوي المكافئ $8{,}24$ %.', 'The APR is $8{,}24$%.')
    },
    'tae-costs': {
        definitions: [
            {
                term: say('Komisioa', 'Comisión', 'العمولة', 'Fee'),
                meaning: say('Mailegua sinatzean bankuak kobratzen duen dirua: jasotzen den dirua gutxitzen du.', 'Dinero que cobra el banco al firmar el préstamo: reduce lo que se recibe.', 'مال يأخذه المصرف عند توقيع القرض: يُنقص ما يُستلم.', 'Money the bank charges when the loan is signed: it reduces what you receive.')
            }
        ],
        vocabulary: [
            say('mailegua', 'préstamo', 'القرض', 'loan'),
            say('gastuak', 'gastos', 'المصاريف', 'costs'),
            say('itzuli', 'devolver', 'يُعاد', 'pay back')
        ],
        explanation: say(
            'Mailegu batek gastuak baditu, gutxiago jasotzen duzu, baina gauza bera itzultzen duzu. Urteko tasa baliokideak benetan jasotakoa eta itzulitakoa konparatzen ditu: urtebetean, $1+T=\\frac{D}{R}$, $D$ itzulitakoa eta $R$ jasotakoa izanik. Horregatik, gastuekin, tasa iragarritako interesa baino handiagoa da.',
            'Si un préstamo tiene gastos, recibes menos, pero devuelves lo mismo. La TAE compara lo que recibes de verdad con lo que devuelves: en un año, $1+T=\\frac{D}{R}$, siendo $D$ lo devuelto y $R$ lo recibido. Por eso, con gastos, la TAE es mayor que el interés anunciado.',
            'إذا كان للقرض مصاريف فإنك تستلم أقل، لكنك تعيد المبلغ نفسه. المعدل السنوي المكافئ يقارن ما تستلمه فعلًا بما تعيده: في سنة واحدة $1+T=\\frac{D}{R}$، حيث $D$ ما يُعاد و$R$ ما يُستلم. لذلك يكون المعدل مع المصاريف أكبر من الفائدة المعلنة.',
            'If a loan has costs, you receive less but pay back the same. The APR compares what you really receive with what you pay back: in one year, $1+T=\\frac{D}{R}$, where $D$ is what you pay back and $R$ what you receive. So, with costs, the APR is greater than the advertised interest.'
        ),
        examplePrompt: say('2000 euroko mailegua, interesa % 6, urtebetean itzultzekoa, 40 euroko komisioarekin. Zein da urteko tasa baliokidea?', 'Préstamo de 2000 euros al 6 %, a devolver en un año, con 40 euros de comisión. ¿Cuál es la TAE?', 'قرض قدره 2000 يورو بفائدة 6 % يُسدَّد بعد سنة، مع عمولة 40 يورو. ما المعدل السنوي المكافئ؟', 'A loan of 2,000 euros at 6%, paid back in one year, with a 40 euro fee. What is the APR?'),
        example: same('$\\frac{2000\\cdot 1{,}06}{2000-40}=\\frac{2120}{1960}\\approx 1{,}0816$'),
        exampleAnswer: say('Urteko tasa baliokidea % $8{,}16$ da, ez % 6.', 'La TAE es el $8{,}16$ %, no el 6 %.', 'المعدل السنوي المكافئ $8{,}16$ %، لا 6 %.', 'The APR is $8{,}16$%, not 6%.')
    },
    'geometric-sum': {
        definitions: [
            {
                term: say('Arrazoia', 'Razón', 'الأساس', 'Common ratio'),
                meaning: say('Gai bakoitza zenbakiz biderkatzen den hurrengoa lortzeko: $r$.', 'El número por el que se multiplica cada término para obtener el siguiente: $r$.', 'العدد الذي يُضرب فيه كل حد للحصول على التالي: $r$.', 'The number each term is multiplied by to get the next one: $r$.')
            }
        ],
        vocabulary: [
            say('gaia', 'término', 'الحد', 'term'),
            say('batura', 'suma', 'المجموع', 'sum'),
            say('progresio geometrikoa', 'progresión geométrica', 'المتتالية الهندسية', 'geometric progression')
        ],
        explanation: say(
            'Diru-kopuru batek ehuneko bera hazten badu aldi bakoitzean, bere balioek progresio geometrikoa osatzen dute. Lehen $n$ gaien batura ez da banan-banan kalkulatu behar: $S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$. Hiru datu behar dira: lehen gaia, arrazoia eta gai kopurua.',
            'Si una cantidad de dinero crece el mismo porcentaje cada periodo, sus valores forman una progresión geométrica. La suma de los $n$ primeros términos no hay que hacerla uno a uno: $S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$. Hacen falta tres datos: el primer término, la razón y el número de términos.',
            'إذا نمت كمية من المال بالنسبة نفسها في كل فترة فإن قيمها تشكّل متتالية هندسية. لا حاجة لجمع الحدود $n$ الأولى واحدًا واحدًا: $S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$. نحتاج إلى ثلاثة معطيات: الحد الأول والأساس وعدد الحدود.',
            'If an amount of money grows by the same percentage each period, its values form a geometric progression. The sum of the first $n$ terms need not be done one by one: $S_n=a_1\\cdot\\frac{r^{n}-1}{r-1}$. Three things are needed: the first term, the ratio and the number of terms.'
        ),
        examplePrompt: say('Batu 3, 6, 12, 24… progresioaren lehen 5 gaiak.', 'Suma los 5 primeros términos de 3, 6, 12, 24…', 'اجمع الحدود الخمسة الأولى من 3، 6، 12، 24…', 'Add the first 5 terms of 3, 6, 12, 24…'),
        example: same('$S_5=3\\cdot\\frac{2^{5}-1}{2-1}=93$'),
        exampleAnswer: say('Arrazoia 2 da, eta batura 93.', 'La razón es 2 y la suma, 93.', 'الأساس 2 والمجموع 93.', 'The ratio is 2 and the sum is 93.')
    },
    pension: {
        definitions: [
            {
                term: say('Kapitalizazio-urtekoa', 'Anualidad de capitalización', 'الدفعة السنوية للادخار', 'Savings annuity'),
                meaning: say('Kapital bat biltzeko urtero sartzen den kopuru finkoa.', 'La cantidad fija que se ingresa cada año para juntar un capital.', 'المبلغ الثابت الذي يُودَع كل سنة لجمع رأس مال.', 'The fixed amount paid in each year to build up a capital.')
            }
        ],
        vocabulary: [
            say('diru-sarrera', 'ingreso', 'الإيداع', 'deposit'),
            say('pentsio-plana', 'plan de pensiones', 'خطة التقاعد', 'pension plan'),
            say('erretiroa', 'jubilación', 'التقاعد', 'retirement')
        ],
        explanation: say(
            'Pentsio-plan batean, urte hasieran $a$ euro sartzen dira, eta diru-sarrera bakoitzak erretirora arte geratzen zaizkion urteetan hazten du. Lehenengoak $n$ urte hazten du; azkenak, urte bat. Guztiak batera progresio geometrikoa dira: $C=a\\cdot(1+i)\\cdot\\frac{(1+i)^{n}-1}{i}$.',
            'En un plan de pensiones se ingresan $a$ euros al principio de cada año, y cada ingreso crece los años que le quedan hasta la jubilación. El primero crece $n$ años; el último, uno. Juntos forman una progresión geométrica: $C=a\\cdot(1+i)\\cdot\\frac{(1+i)^{n}-1}{i}$.',
            'في خطة التقاعد يُودَع $a$ يورو في بداية كل سنة، وينمو كل إيداع السنوات الباقية حتى التقاعد. الأول ينمو $n$ سنة، والأخير سنة واحدة. معًا تشكّل متتالية هندسية: $C=a\\cdot(1+i)\\cdot\\frac{(1+i)^{n}-1}{i}$.',
            'In a pension plan, $a$ euros are paid in at the start of each year, and each deposit grows for the years left until retirement. The first grows $n$ years; the last, one. Together they form a geometric progression: $C=a\\cdot(1+i)\\cdot\\frac{(1+i)^{n}-1}{i}$.'
        ),
        examplePrompt: say('500 euro sartzen dituzu urte hasieran, 3 urtez, interesa % 2 dela. Zenbat duzu amaieran?', 'Ingresas 500 euros al principio de cada año durante 3 años al 2 %. ¿Cuánto tienes al final?', 'تودع 500 يورو في بداية كل سنة لمدة 3 سنوات بفائدة 2 %. كم لديك في النهاية؟', 'You pay in 500 euros at the start of each year for 3 years at 2%. How much do you have at the end?'),
        example: same('$500\\cdot 1{,}02\\cdot\\frac{1{,}02^{3}-1}{0{,}02}\\approx 1560{,}80$'),
        exampleAnswer: say('$1560{,}80$ euro: sartutako 1500 euro eta $60{,}80$ euroko interesak.', '$1560{,}80$ euros: los 1500 euros ingresados y $60{,}80$ euros de intereses.', '$1560{,}80$ يورو: 1500 يورو مودعة و$60{,}80$ يورو فوائد.', '$1560{,}80$ euros: the 1,500 euros paid in and $60{,}80$ euros of interest.')
    },
    'loan-payment': {
        definitions: [
            {
                term: say('Amortizazio-urtekoa', 'Anualidad de amortización', 'الدفعة السنوية للسداد', 'Loan annuity'),
                meaning: say('Urte bakoitzeko ordainketa finkoa, mailegua eta bere interesak itzultzen dituena.', 'El pago fijo de cada año que devuelve el préstamo y sus intereses.', 'الدفعة الثابتة كل سنة التي تسدّد القرض وفوائده.', 'The fixed yearly payment that pays back the loan and its interest.')
            }
        ],
        vocabulary: [
            say('mailegua', 'préstamo', 'القرض', 'loan'),
            say('ordainketa', 'pago', 'الدفعة', 'payment'),
            say('interesak', 'intereses', 'الفوائد', 'interest')
        ],
        explanation: say(
            '$C$ euroko mailegu bat $n$ ordainketa berdinetan itzultzen bada, ordainketa bakoitza $a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$ da. Ordainketa guztiak batuta, $n\\cdot a$, maileguaren kopurua baino gehiago ordaintzen da: aldea interesak dira. Ordainketa gehiago, kuota txikiagoa, baina interes gehiago.',
            'Si un préstamo de $C$ euros se devuelve en $n$ pagos iguales, cada pago es $a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$. Sumando todos los pagos, $n\\cdot a$, se paga más que el préstamo: la diferencia son los intereses. Más pagos, cuota menor, pero más intereses.',
            'إذا سُدِّد قرض قدره $C$ يورو على $n$ دفعات متساوية، فكل دفعة $a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$. بجمع كل الدفعات $n\\cdot a$ ندفع أكثر من القرض: الفرق هو الفوائد. دفعات أكثر تعني قسطًا أصغر لكن فوائد أكثر.',
            'If a loan of $C$ euros is paid back in $n$ equal payments, each payment is $a=C\\cdot\\frac{(1+i)^{n}\\cdot i}{(1+i)^{n}-1}$. Adding all the payments, $n\\cdot a$, you pay more than the loan: the difference is the interest. More payments, a smaller instalment, but more interest.'
        ),
        examplePrompt: say('2000 euroko mailegua, interesa % 10, bi urtekotan. Zenbatekoa da urtekoa?', 'Préstamo de 2000 euros al 10 % en dos anualidades. ¿Cuánto es la anualidad?', 'قرض قدره 2000 يورو بفائدة 10 % على دفعتين سنويتين. كم الدفعة السنوية؟', 'A loan of 2,000 euros at 10% in two annual payments. How much is each payment?'),
        example: same('$2000\\cdot\\frac{1{,}1^{2}\\cdot 0{,}1}{1{,}1^{2}-1}\\approx 1152{,}38$'),
        exampleAnswer: say('$1152{,}38$ euro urtean; guztira $2304{,}76$ euro.', '$1152{,}38$ euros al año; en total, $2304{,}76$ euros.', '$1152{,}38$ يورو في السنة، والمجموع $2304{,}76$ يورو.', '$1152{,}38$ euros a year; $2304{,}76$ euros in all.')
    },
    'amortization-table': {
        definitions: [
            {
                term: say('Amortizazio-kuota', 'Cuota de amortización', 'قسط الإطفاء', 'Principal repaid'),
                meaning: say('Ordainketaren zatia, interesak kenduta, zorra itzultzen duena.', 'La parte del pago que devuelve deuda, sin los intereses.', 'جزء الدفعة الذي يسدّد الدين دون الفوائد.', 'The part of the payment that pays back debt, without the interest.')
            },
            {
                term: say('Zor bizia', 'Deuda pendiente', 'الدين المتبقي', 'Outstanding debt'),
                meaning: say('Itzultzeko geratzen dena.', 'Lo que queda por devolver.', 'ما بقي للسداد.', 'What is left to pay back.')
            }
        ],
        vocabulary: [
            say('taula', 'tabla', 'الجدول', 'table'),
            say('zorra', 'deuda', 'الدين', 'debt'),
            say('interesak', 'intereses', 'الفوائد', 'interest')
        ],
        explanation: say(
            'Taulak urtez urte jarraitzen dio maileguari. Urte bakoitzean: interesak, zorra bider $i$; amortizazioa, ordainketa ken interesak; zor berria, zorra ken amortizazioa. Hasieran zorra handia da eta ordainketaren zati handiena interesak dira; amaieran, ia dena amortizazioa. Azken urtean zorra zero geratzen da.',
            'La tabla sigue el préstamo año a año. Cada año: intereses, la deuda por $i$; amortización, el pago menos los intereses; deuda nueva, la deuda menos la amortización. Al principio la deuda es grande y casi todo el pago son intereses; al final, casi todo es amortización. El último año la deuda queda en cero.',
            'يتتبّع الجدول القرض سنة بعد سنة. في كل سنة: الفوائد هي الدين مضروبًا في $i$، والإطفاء هو الدفعة ناقص الفوائد، والدين الجديد هو الدين ناقص الإطفاء. في البداية يكون الدين كبيرًا ومعظم الدفعة فوائد، وفي النهاية يكاد يكون كله إطفاء. وفي السنة الأخيرة يصبح الدين صفرًا.',
            'The table follows the loan year by year. Each year: interest, the debt times $i$; repayment, the payment minus the interest; new debt, the debt minus the repayment. At the start the debt is large and most of the payment is interest; at the end, almost all is repayment. In the last year the debt reaches zero.'
        ),
        examplePrompt: say('1000 euroko mailegua, interesa % 10, $576{,}19$ euroko urtekoarekin. Zenbat amortizatzen da lehen urtean?', 'Préstamo de 1000 euros al 10 % con anualidad de $576{,}19$ euros. ¿Cuánto se amortiza el primer año?', 'قرض قدره 1000 يورو بفائدة 10 % ودفعة سنوية $576{,}19$ يورو. كم يُطفأ في السنة الأولى؟', 'A loan of 1,000 euros at 10% with a yearly payment of $576{,}19$ euros. How much is repaid in the first year?'),
        example: same('$1000\\cdot 0{,}1=100\\qquad 576{,}19-100=476{,}19$'),
        exampleAnswer: say('$476{,}19$ euro; zor bizia $523{,}81$ euro geratzen da.', '$476{,}19$ euros; la deuda pendiente queda en $523{,}81$ euros.', '$476{,}19$ يورو، ويبقى الدين $523{,}81$ يورو.', '$476{,}19$ euros; the outstanding debt is left at $523{,}81$ euros.')
    },
    'pending-debt': {
        definitions: [
            {
                term: say('Ezeztatzeko komisioa', 'Comisión de cancelación', 'عمولة الإلغاء', 'Early repayment fee'),
                meaning: say('Mailegua garaia baino lehen itzultzean, zor biziaren gainean kobratzen den ehunekoa.', 'El porcentaje sobre la deuda pendiente que se cobra al devolver el préstamo antes de tiempo.', 'النسبة من الدين المتبقي التي تُؤخذ عند سداد القرض قبل موعده.', 'The percentage of the outstanding debt charged when a loan is paid back early.')
            }
        ],
        vocabulary: [
            say('ezeztatu', 'cancelar', 'إلغاء', 'cancel'),
            say('kuota', 'cuota', 'الأقساط', 'instalment'),
            say('ehunekoa', 'porcentaje', 'النسبة', 'percentage')
        ],
        explanation: say(
            'Mailegu bat garaia baino lehen ezeztatzeko, ez dira geratzen diren kuota guztiak ordaintzen: kuota horiek etorkizuneko interesak dituzte. Zor bizia ordaintzen da, taulan agertzen dena, gehi komisioa: $D\\cdot(1+c)$, $c$ komisioaren ehunekoa izanik. Horregatik merkeagoa da kuotak batzea baino.',
            'Para cancelar un préstamo antes de tiempo no se pagan todas las cuotas que quedan: esas cuotas llevan intereses futuros. Se paga la deuda pendiente, la que aparece en la tabla, más la comisión: $D\\cdot(1+c)$, siendo $c$ el porcentaje de la comisión. Por eso sale más barato que sumar las cuotas.',
            'لإلغاء قرض قبل موعده لا تُدفع كل الأقساط الباقية، لأن فيها فوائد مستقبلية. يُدفع الدين المتبقي الظاهر في الجدول مع العمولة: $D\\cdot(1+c)$، حيث $c$ نسبة العمولة. لذلك يكون أرخص من جمع الأقساط.',
            'To cancel a loan early you do not pay all the instalments left: they include future interest. You pay the outstanding debt, the one in the table, plus the fee: $D\\cdot(1+c)$, where $c$ is the percentage of the fee. That is why it is cheaper than adding up the instalments.'
        ),
        examplePrompt: say('Zor bizia $15\\,000$ euro da, eta komisioa % 1. Zenbat ordaintzen da ezeztatzeko?', 'La deuda pendiente es de $15\\,000$ euros y la comisión, del 1 %. ¿Cuánto se paga para cancelar?', 'الدين المتبقي $15\\,000$ يورو والعمولة 1 %. كم يُدفع للإلغاء؟', 'The outstanding debt is $15\\,000$ euros and the fee is 1%. How much is paid to cancel?'),
        example: same('$15\\,000\\cdot 1{,}01=15\\,150$'),
        exampleAnswer: say('$15\\,150$ euro: zorra eta 150 euroko komisioa.', '$15\\,150$ euros: la deuda y 150 euros de comisión.', '$15\\,150$ يورو: الدين وعمولة 150 يورو.', '$15\\,150$ euros: the debt and a 150 euro fee.')
    }
}

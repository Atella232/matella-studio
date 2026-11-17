import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Merkataritza-aritmetika · Batxilergoa 1 · Gizarte Zientziak — the typical
   mistake and the «Check it» question of the eight lessons of its own. The
   other six come from 4. DBH and 1.º Ciencias with their own mistakes and
   questions. Plain data (no JSX) so the tests can import it.
   ========================================================================== */

export type GizMoneyTopicId = 'interest-time' | 'tae' | 'tae-costs' | 'geometric-sum' | 'pension' | 'loan-payment' | 'amortization-table' | 'pending-debt'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const gizMoneyLessonChecks: Record<GizMoneyTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'interest-time': {
        mistake: {
            wrong: same('$1{,}03^{n}=1{,}5\\ \\to\\ n=\\frac{1{,}5}{1{,}03}$'),
            right: say('Ezezaguna berretzailean dago: logaritmoekin askatzen da, $n=\\frac{\\log 1{,}5}{\\log 1{,}03}$.', 'La incógnita está en el exponente: se despeja con logaritmos, $n=\\frac{\\log 1{,}5}{\\log 1{,}03}$.', 'المجهول في الأس: يُعزل باللوغاريتمات، $n=\\frac{\\log 1{,}5}{\\log 1{,}03}$.', 'The unknown is in the exponent: solve with logarithms, $n=\\frac{\\log 1{,}5}{\\log 1{,}03}$.')
        },
        check: {
            prompt: say('Zenbat urte behar dira 1000 euro 1500 euro bihurtzeko, urteko interesa % 10 bada?', '¿Cuántos años hacen falta para que 1000 euros lleguen a 1500 euros al 10 % anual?', 'كم سنة تلزم لتصبح 1000 يورو 1500 يورو بفائدة 10 % سنويًا؟', 'How many years does it take for 1,000 euros to reach 1,500 euros at 10% a year?'),
            options: [same('$5$'), same('$4$'), same('$50$')],
            correctIndex: 0,
            explanation: say('$1{,}1^{n}=1{,}5$: $n=\\frac{\\log 1{,}5}{\\log 1{,}1}\\approx 4{,}25$. Lau urtetan ez da iristen: 5 urte.', '$1{,}1^{n}=1{,}5$: $n=\\frac{\\log 1{,}5}{\\log 1{,}1}\\approx 4{,}25$. En 4 años no llega: 5 años.', '$1{,}1^{n}=1{,}5$: ‏$n=\\frac{\\log 1{,}5}{\\log 1{,}1}\\approx 4{,}25$. لا يصل في 4 سنوات: إذن 5 سنوات.', '$1{,}1^{n}=1{,}5$: $n=\\frac{\\log 1{,}5}{\\log 1{,}1}\\approx 4{,}25$. In 4 years it does not get there: 5 years.')
        }
    },
    tae: {
        mistake: {
            wrong: say('Urteko % 10, seihilekoan ordainduta: urteko tasa baliokidea % 10 da.', 'Un 10 % anual con pago semestral: la TAE es el 10 %.', '10 % سنويًا مع دفع نصف سنوي: المعدل السنوي المكافئ 10 %.', '10% a year paid every six months: the APR is 10%.'),
            right: say('Bi aldiz ordaintzen da, % 5 bakoitzean: $1{,}05^{2}=1{,}1025$, beraz urteko tasa baliokidea % $10{,}25$ da.', 'Se paga dos veces, un 5 % cada una: $1{,}05^{2}=1{,}1025$, así que la TAE es el $10{,}25$ %.', 'يُدفع مرتين، 5 % كل مرة: $1{,}05^{2}=1{,}1025$، إذن المعدل السنوي المكافئ $10{,}25$ %.', 'It is paid twice, 5% each time: $1{,}05^{2}=1{,}1025$, so the APR is $10{,}25$%.')
        },
        check: {
            prompt: say('Bien artean, zein urteko tasa baliokide da handiagoa: urteko % 6 hilero ordainduta, ala % 6 hiruhilekoan ordainduta?', '¿Qué TAE es mayor: la de un 6 % anual con pago mensual o la de un 6 % con pago trimestral?', 'أيّ المعدلين السنويين المكافئين أكبر: 6 % سنويًا بدفع شهري أم 6 % بدفع ربع سنوي؟', 'Which APR is greater: 6% a year paid monthly or 6% paid quarterly?'),
            options: [say('Hilerokoa', 'La mensual', 'الشهري', 'The monthly one'), say('Hiruhilekoa', 'La trimestral', 'الربع سنوي', 'The quarterly one'), say('Berdinak', 'Son iguales', 'متساويان', 'They are equal')],
            correctIndex: 0,
            explanation: say('Zenbat eta aldi gehiago, orduan eta gehiago sortzen dute interesek: $1{,}005^{12}>1{,}015^{4}$.', 'Cuantos más periodos, más interés producen los intereses: $1{,}005^{12}>1{,}015^{4}$.', 'كلما زادت الفترات زادت فوائد الفوائد: $1{,}005^{12}>1{,}015^{4}$.', 'The more periods, the more interest the interest earns: $1{,}005^{12}>1{,}015^{4}$.')
        }
    },
    'tae-costs': {
        mistake: {
            wrong: say('Komisioak ez du eraginik: urteko tasa baliokidea iragarritako interesa da.', 'La comisión no cuenta: la TAE es el interés anunciado.', 'العمولة لا تُحسب: المعدل السنوي المكافئ هو الفائدة المعلنة.', 'The fee does not count: the APR is the advertised interest.'),
            right: say('Komisioarekin gutxiago jasotzen duzu, baina gauza bera itzultzen duzu: urteko tasa baliokidea iragarritako interesa baino handiagoa da.', 'Con la comisión recibes menos, pero devuelves lo mismo: la TAE es mayor que el interés anunciado.', 'مع العمولة تستلم أقل لكنك تعيد المبلغ نفسه: المعدل السنوي المكافئ أكبر من الفائدة المعلنة.', 'With the fee you receive less but pay back the same: the APR is greater than the advertised interest.')
        },
        check: {
            prompt: say('1000 euroko mailegua, urteko interesa % 10, urtebetean itzultzekoa eta 50 euroko gastuekin. Zein da urteko tasa baliokidea?', 'Préstamo de 1000 euros al 10 % anual, a devolver en un año, con 50 euros de gastos. ¿Cuál es la TAE?', 'قرض قدره 1000 يورو بفائدة 10 % سنويًا يُسدَّد بعد سنة، مع مصاريف 50 يورو. ما المعدل السنوي المكافئ؟', 'A loan of 1,000 euros at 10% a year, paid back in one year, with 50 euros of costs. What is the APR?'),
            options: [same('$10\\,\\%$'), same('$15\\,\\%$'), same('$15{,}8\\,\\%$')],
            correctIndex: 2,
            explanation: say('1100 euro itzultzen dira, baina 950 jaso ziren: $\\frac{1100}{950}\\approx 1{,}158$.', 'Se devuelven 1100 euros, pero se recibieron 950: $\\frac{1100}{950}\\approx 1{,}158$.', 'تُعاد 1100 يورو مع أن المستلم 950: ‏$\\frac{1100}{950}\\approx 1{,}158$.', '1,100 euros are paid back, but 950 were received: $\\frac{1100}{950}\\approx 1{,}158$.')
        }
    },
    'geometric-sum': {
        mistake: {
            wrong: same('$1+2+4+8+16=1\\cdot 2^{5}=32$'),
            right: say('Formulak $-1$ darama: $\\frac{2^{5}-1}{2-1}=31$.', 'La fórmula lleva el $-1$: $\\frac{2^{5}-1}{2-1}=31$.', 'في الصيغة $-1$: ‏$\\frac{2^{5}-1}{2-1}=31$.', 'The formula has the $-1$: $\\frac{2^{5}-1}{2-1}=31$.')
        },
        check: {
            prompt: say('Zenbat da $5+15+45+135$?', '¿Cuánto suman $5+15+45+135$?', 'كم مجموع $5+15+45+135$؟', 'What is $5+15+45+135$?'),
            options: [same('$405$'), same('$200$'), same('$135$')],
            correctIndex: 1,
            explanation: same('$5\\cdot\\frac{3^{4}-1}{3-1}=5\\cdot 40=200$')
        }
    },
    pension: {
        mistake: {
            wrong: say('200 euroko hiru diru-sarrera, interesa % 5: $200\\cdot 3\\cdot 1{,}05$.', 'Tres ingresos de 200 euros al 5 %: $200\\cdot 3\\cdot 1{,}05$.', 'ثلاثة إيداعات من 200 يورو بفائدة 5 %: $200\\cdot 3\\cdot 1{,}05$.', 'Three deposits of 200 euros at 5%: $200\\cdot 3\\cdot 1{,}05$.'),
            right: say('Diru-sarrera bakoitzak denbora desberdina hazten du: $200\\cdot 1{,}05^{3}+200\\cdot 1{,}05^{2}+200\\cdot 1{,}05$.', 'Cada ingreso crece un tiempo distinto: $200\\cdot 1{,}05^{3}+200\\cdot 1{,}05^{2}+200\\cdot 1{,}05$.', 'كل إيداع ينمو مدة مختلفة: $200\\cdot 1{,}05^{3}+200\\cdot 1{,}05^{2}+200\\cdot 1{,}05$.', 'Each deposit grows for a different time: $200\\cdot 1{,}05^{3}+200\\cdot 1{,}05^{2}+200\\cdot 1{,}05$.')
        },
        check: {
            prompt: say('Pentsio-plan batean, zein diru-sarrerak hazten du gehien?', 'En un plan de pensiones, ¿qué ingreso crece más?', 'في خطة تقاعد، أيّ إيداع ينمو أكثر؟', 'In a pension plan, which deposit grows the most?'),
            options: [say('Lehenengoak', 'El primero', 'الأول', 'The first one'), say('Azkenak', 'El último', 'الأخير', 'The last one'), say('Denek berdin', 'Todos igual', 'كلها بالتساوي', 'All the same')],
            correctIndex: 0,
            explanation: say('Lehenengoa da denbora gehien bankuan dagoena, eta bere interesek interes gehiago sortzen dute.', 'El primero es el que más tiempo está en el banco, y sus intereses producen más intereses.', 'الأول يبقى في المصرف أطول مدة، وفوائده تولّد فوائد أكثر.', 'The first one stays in the bank the longest, and its interest earns more interest.')
        }
    },
    'loan-payment': {
        mistake: {
            wrong: say('3000 euro 3 ordainketatan: 1000 euro urtean.', '3000 euros en 3 pagos: 1000 euros al año.', '3000 يورو على 3 دفعات: 1000 يورو في السنة.', '3,000 euros in 3 payments: 1,000 euros a year.'),
            right: say('Horrek interesak ahazten ditu: ordainketa bakoitza $\\frac{3000}{3}$ baino handiagoa da.', 'Eso olvida los intereses: cada pago es mayor que $\\frac{3000}{3}$.', 'هذا ينسى الفوائد: كل دفعة أكبر من $\\frac{3000}{3}$.', 'That forgets the interest: each payment is greater than $\\frac{3000}{3}$.')
        },
        check: {
            prompt: say('$10\\,000$ euroko mailegu bat 2800 euroko 4 urtekorekin itzultzen da. Zenbat ordaintzen da guztira?', 'Un préstamo de $10\\,000$ euros se devuelve con 4 anualidades de 2800 euros. ¿Cuánto se paga en total?', 'يُسدَّد قرض قدره $10\\,000$ يورو بأربع دفعات سنوية من 2800 يورو. كم يُدفع إجمالًا؟', 'A loan of $10\\,000$ euros is paid back with 4 annual payments of 2,800 euros. How much is paid in all?'),
            options: [same('$11\\,200$'), same('$10\\,000$'), same('$1200$')],
            correctIndex: 0,
            explanation: say('$4\\cdot 2800=11\\,200$ euro; horietatik 1200 euro interesak dira.', '$4\\cdot 2800=11\\,200$ euros; de ellos, 1200 euros son intereses.', '$4\\cdot 2800=11\\,200$ يورو، منها 1200 يورو فوائد.', '$4\\cdot 2800=11\\,200$ euros; of these, 1,200 euros are interest.')
        }
    },
    'amortization-table': {
        mistake: {
            wrong: say('800 euroko ordainketa osoak zorra murrizten du.', 'Todo el pago de 800 euros reduce la deuda.', 'دفعة 800 يورو كلها تُنقص الدين.', 'The whole payment of 800 euros reduces the debt.'),
            right: say('Lehenik zorraren interesak ordaintzen dira; gainerakoak bakarrik murrizten du zorra.', 'Primero se pagan los intereses de la deuda; solo el resto la reduce.', 'تُدفع أولًا فوائد الدين، والباقي فقط يُنقصه.', 'First the interest on the debt is paid; only the rest reduces it.')
        },
        check: {
            prompt: say('Zorra 3000 euro da, interesa % 4, eta 1100 euro ordaintzen dira. Zenbat jaisten da zorra?', 'La deuda es de 3000 euros al 4 % y se pagan 1100 euros. ¿Cuánto baja la deuda?', 'الدين 3000 يورو بفائدة 4 %، ويُدفع 1100 يورو. بكم ينقص الدين؟', 'The debt is 3,000 euros at 4% and 1,100 euros are paid. How much does the debt go down?'),
            options: [same('$1100$'), same('$980$'), same('$120$')],
            correctIndex: 1,
            explanation: say('Interesak: $3000\\cdot 0{,}04=120$. Amortizazioa: $1100-120=980$ euro.', 'Intereses: $3000\\cdot 0{,}04=120$. Amortización: $1100-120=980$ euros.', 'الفوائد: $3000\\cdot 0{,}04=120$. الإطفاء: $1100-120=980$ يورو.', 'Interest: $3000\\cdot 0{,}04=120$. Repayment: $1100-120=980$ euros.')
        }
    },
    'pending-debt': {
        mistake: {
            wrong: say('2000 euroko 3 kuota falta dira: ezeztatzeko 6000 euro eta komisioa ordaintzen ditut.', 'Quedan 3 cuotas de 2000 euros: para cancelar pago 6000 euros más la comisión.', 'بقيت 3 أقساط من 2000 يورو: للإلغاء أدفع 6000 يورو والعمولة.', 'There are 3 payments of 2,000 euros left: to cancel I pay 6,000 euros plus the fee.'),
            right: say('Geratzen diren kuotek etorkizuneko interesak dituzte; zor bizia ezeztatzen da, eta hori txikiagoa da.', 'Las cuotas que quedan llevan intereses futuros; se cancela la deuda pendiente, que es menor.', 'الأقساط الباقية تحمل فوائد مستقبلية؛ يُلغى الدين المتبقي وهو أصغر.', 'The payments left include future interest; what is cancelled is the outstanding debt, which is smaller.')
        },
        check: {
            prompt: say('Zor bizia 5000 euro da, eta ezeztatzeko komisioa % 3. Zenbat ordaintzen da ezeztatzeko?', 'La deuda pendiente es de 5000 euros y la comisión de cancelación, del 3 %. ¿Cuánto se paga para cancelar?', 'الدين المتبقي 5000 يورو وعمولة الإلغاء 3 %. كم يُدفع للإلغاء؟', 'The outstanding debt is 5,000 euros and the cancellation fee is 3%. How much is paid to cancel?'),
            options: [same('$150$'), same('$5150$'), same('$5300$')],
            correctIndex: 1,
            explanation: same('$5000\\cdot 1{,}03=5150$')
        }
    }
}

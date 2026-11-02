import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Proportzionaltasuna · 2. DBH — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. Percentages change with the
   language (% 12, 12 %, 12%, 12٪), so they go in the words, never inside $…$.
   ========================================================================== */

export type ProportionTopicId = 'proportion-review' | 'direct-review' | 'inverse-review' | 'compound-direct' | 'compound-mixed' | 'compound-unit' | 'direct-share' | 'share-problems' | 'inverse-share' | 'percent-forms' | 'percent-total' | 'percent-which' | 'index' | 'chained' | 'interest'

/** As in lessons.tsx, the Arabic formulas get a decimal point */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const proportionLessonChecks: Record<ProportionTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'proportion-review': {
        mistake: {
            wrong: same('$\\frac{4}{7}=\\frac{x}{21}\\ \\to\\ x=\\frac{7\\cdot 21}{4}$'),
            right: say('Biderkadura gurutzatuak: $7\\cdot x=4\\cdot 21=84$; beraz, $x=84\\mathbin{:}7=12$.', 'Productos cruzados: $7\\cdot x=4\\cdot 21=84$, así que $x=84\\mathbin{:}7=12$.', 'الضرب التبادلي: $7\\cdot x=4\\cdot 21=84$، إذن $x=84\\mathbin{:}7=12$.', 'Cross products: $7\\cdot x=4\\cdot 21=84$, so $x=84\\mathbin{:}7=12$.')
        },
        check: {
            prompt: say('Kalkulatu $x$, $\\frac{5}{8}=\\frac{x}{40}$ bada.', 'Calcula $x$ si $\\frac{5}{8}=\\frac{x}{40}$.', 'احسب $x$ إذا كان $\\frac{5}{8}=\\frac{x}{40}$.', 'Find $x$ if $\\frac{5}{8}=\\frac{x}{40}$.'),
            options: [same('$x=25$'), same('$x=64$'), same('$x=37$')],
            correctIndex: 0,
            explanation: say('$8\\cdot x=5\\cdot 40=200$, eta $x=200\\mathbin{:}8=25$. 37 batuz ateratzen da (8 → 40, +32), eta proportzio batean ez da batzen.', '$8\\cdot x=5\\cdot 40=200$ y $x=200\\mathbin{:}8=25$. El 37 sale sumando (de 8 a 40, +32), y en una proporción no se suma.', '$8\\cdot x=5\\cdot 40=200$، و$x=200\\mathbin{:}8=25$. أما 37 فيأتي من الجمع (من 8 إلى 40 نضيف 32)، ولا نجمع في التناسب.', '$8\\cdot x=5\\cdot 40=200$ and $x=200\\mathbin{:}8=25$. 37 comes from adding (from 8 to 40, +32), and in a proportion you do not add.')
        }
    },
    'direct-review': {
        mistake: {
            wrong: say('Adina eta altuera batera handitzen dira: zuzenki proportzionalak dira.', 'La edad y la altura crecen a la vez: son directamente proporcionales.', 'العمر والطول يزدادان معًا: إذن هما متناسبان طرديًا.', 'Age and height grow together: they are in direct proportion.'),
            right: say('Ez da nahikoa biak handitzea: proportzio berean handitu behar dute. Adinaren bikoitzarekin ez da altueraren bikoitza neurtzen.', 'No basta con que crezcan las dos: tienen que crecer en la misma proporción. Con el doble de edad no se mide el doble.', 'لا يكفي أن يزدادا معًا: يجب أن يزدادا بالنسبة نفسها. فمن يتضاعف عمره لا يتضاعف طوله.', 'It is not enough that both grow: they must grow in the same proportion. Twice the age does not mean twice the height.')
        },
        check: {
            prompt: say('3 kg irinarekin 12 bizkotxo egiten dira. Zenbat bizkotxo egiten dira 7 kg irinarekin?', 'Con 3 kg de harina se hacen 12 bizcochos. ¿Cuántos bizcochos se hacen con 7 kg?', 'بـ3 كغ من الدقيق نصنع 12 كعكة. كم كعكة نصنع بـ7 كغ؟', '12 sponge cakes are made with 3 kg of flour. How many are made with 7 kg?'),
            options: [same('$16$'), same('$84$'), same('$28$')],
            correctIndex: 2,
            explanation: say('Kilo batekin, $12\\mathbin{:}3=4$ bizkotxo; 7 kg irinarekin, $4\\cdot 7=28$. 16 batuz ateratzen da (+4), eta hori ez da proportzionala.', 'Con 1 kg, $12\\mathbin{:}3=4$ bizcochos; con 7 kg, $4\\cdot 7=28$. El 16 sale sumando (+4), y eso no es proporcional.', 'بكيلو واحد $12\\mathbin{:}3=4$ كعكات، وبـ7 كغ $4\\cdot 7=28$. أما 16 فيأتي من الجمع (+4)، وهذا ليس تناسبًا.', 'With 1 kg, $12\\mathbin{:}3=4$ cakes; with 7 kg, $4\\cdot 7=28$. 16 comes from adding (+4), and that is not proportional.')
        }
    },
    'inverse-review': {
        mistake: {
            wrong: say('4 margolarik 6 egun behar dituzte; 8 margolarik $6\\cdot 2=12$ egun beharko dituzte.', '4 pintores tardan 6 días; 8 pintores tardarán $6\\cdot 2=12$ días.', '4 دهّانين يحتاجون 6 أيام، إذن 8 دهّانين يحتاجون $6\\cdot 2=12$ يومًا.', '4 painters take 6 days, so 8 painters will take $6\\cdot 2=12$ days.'),
            right: say('Margolari gehiago → egun gutxiago: alderantzizkoa da. Biderkadura konstantea da: $4\\cdot 6=24$, eta $24\\mathbin{:}8=3$ egun.', 'Más pintores → menos días: es inversa. El producto es constante: $4\\cdot 6=24$, y $24\\mathbin{:}8=3$ días.', 'دهّانون أكثر ← أيام أقل: إنه تناسب عكسي. حاصل الضرب ثابت: $4\\cdot 6=24$، و$24\\mathbin{:}8=3$ أيام.', 'More painters → fewer days: it is inverse. The product is constant: $4\\cdot 6=24$, and $24\\mathbin{:}8=3$ days.')
        },
        check: {
            prompt: say('Iturri batek, minutuko 20 litro botata, 12 orduan betetzen du biltegi bat. Zenbat ordu beharko ditu minutuko 30 litro botata?', 'Un grifo que echa 20 litros por minuto llena un depósito en 12 horas. ¿Cuántas horas tardará si echa 30 litros por minuto?', 'صنبور يصبّ 20 لترًا في الدقيقة يملأ خزانًا في 12 ساعة. كم ساعة يحتاج إذا صبّ 30 لترًا في الدقيقة؟', 'A tap pouring 20 litres a minute fills a tank in 12 hours. How many hours will it take pouring 30 litres a minute?'),
            options: [same('$18$'), same('$8$'), same('$22$')],
            correctIndex: 1,
            explanation: say('Emari handiagoa → denbora gutxiago: alderantzizkoa. $12\\cdot 20=30\\cdot x$, eta $x=240\\mathbin{:}30=8$ ordu. 18 zuzena balitz bezala kalkulatuta ateratzen da.', 'Más caudal → menos tiempo: inversa. $12\\cdot 20=30\\cdot x$, y $x=240\\mathbin{:}30=8$ horas. El 18 sale haciéndola como si fuera directa.', 'تدفّق أكبر ← وقت أقل: تناسب عكسي. $12\\cdot 20=30\\cdot x$، و$x=240\\mathbin{:}30=8$ ساعات. أما 18 فيأتي من الحساب كأنه طردي.', 'More flow → less time: inverse. $12\\cdot 20=30\\cdot x$, and $x=240\\mathbin{:}30=8$ hours. 18 comes from working it out as if it were direct.')
        }
    },
    'compound-direct': {
        mistake: {
            wrong: say('4 inprimagailuk 5 orduan 2000 orri inprimatzen dituzte. 6 inprimagailuk 3 orduan: $2000\\cdot\\frac{4}{6}\\cdot\\frac{5}{3}$.', '4 impresoras imprimen 2000 hojas en 5 horas. 6 impresoras en 3 horas: $2000\\cdot\\frac{4}{6}\\cdot\\frac{5}{3}$.', '4 طابعات تطبع 2000 ورقة في 5 ساعات. 6 طابعات في 3 ساعات: $2000\\cdot\\frac{4}{6}\\cdot\\frac{5}{3}$.', '4 printers print 2000 sheets in 5 hours. 6 printers in 3 hours: $2000\\cdot\\frac{4}{6}\\cdot\\frac{5}{3}$.'),
            right: say('Bi erlazioak zuzenak dira: zatidura berria/zaharra. $2000\\cdot\\frac{6}{4}\\cdot\\frac{3}{5}=1800$ orri.', 'Las dos relaciones son directas: cociente nuevo/viejo. $2000\\cdot\\frac{6}{4}\\cdot\\frac{3}{5}=1800$ hojas.', 'العلاقتان طرديتان: الكسر الجديد/القديم. $2000\\cdot\\frac{6}{4}\\cdot\\frac{3}{5}=1800$ ورقة.', 'Both relations are direct: new/old. $2000\\cdot\\frac{6}{4}\\cdot\\frac{3}{5}=1800$ sheets.')
        },
        check: {
            prompt: say('3 iturrik 9 ontzi betetzen dituzte 4 minututan. Zenbat ontzi betetzen dituzte 2 iturrik 10 minututan?', '3 grifos llenan 9 cubos en 4 minutos. ¿Cuántos cubos llenan 2 grifos en 10 minutos?', '3 صنابير تملأ 9 دلاء في 4 دقائق. كم دلوًا تملأ صنبوران في 10 دقائق؟', '3 taps fill 9 buckets in 4 minutes. How many buckets do 2 taps fill in 10 minutes?'),
            options: [same('$15$'), same('$5{,}4$'), same('$22{,}5$')],
            correctIndex: 0,
            explanation: say('Iturri gutxiago → ontzi gutxiago; minutu gehiago → ontzi gehiago. Biak zuzenak: $9\\cdot\\frac{2}{3}\\cdot\\frac{10}{4}=15$ ontzi.', 'Menos grifos → menos cubos; más minutos → más cubos. Las dos directas: $9\\cdot\\frac{2}{3}\\cdot\\frac{10}{4}=15$ cubos.', 'صنابير أقل ← دلاء أقل، ودقائق أكثر ← دلاء أكثر. كلتاهما طردية: $9\\cdot\\frac{2}{3}\\cdot\\frac{10}{4}=15$ دلوًا.', 'Fewer taps → fewer buckets; more minutes → more buckets. Both direct: $9\\cdot\\frac{2}{3}\\cdot\\frac{10}{4}=15$ buckets.')
        }
    },
    'compound-mixed': {
        mistake: {
            wrong: say('8 langilek, egunean 6 ordu, 15 egunetan egiten dute lan bat. 10 langilek, egunean 8 ordu: $15\\cdot\\frac{10}{8}\\cdot\\frac{8}{6}$ egun.', '8 obreros, 6 horas al día, hacen una obra en 15 días. 10 obreros, 8 horas al día: $15\\cdot\\frac{10}{8}\\cdot\\frac{8}{6}$ días.', '8 عمّال، 6 ساعات يوميًا، ينجزون عملًا في 15 يومًا. 10 عمّال، 8 ساعات يوميًا: $15\\cdot\\frac{10}{8}\\cdot\\frac{8}{6}$ يومًا.', '8 workers, 6 hours a day, finish a job in 15 days. 10 workers, 8 hours a day: $15\\cdot\\frac{10}{8}\\cdot\\frac{8}{6}$ days.'),
            right: say('Langile gehiago → egun gutxiago, eta ordu gehiago → egun gutxiago: biak alderantzizkoak dira, zaharra/berria. $15\\cdot\\frac{8}{10}\\cdot\\frac{6}{8}=9$ egun.', 'Más obreros → menos días, y más horas → menos días: las dos son inversas, viejo/nuevo. $15\\cdot\\frac{8}{10}\\cdot\\frac{6}{8}=9$ días.', 'عمّال أكثر ← أيام أقل، وساعات أكثر ← أيام أقل: كلتاهما عكسية، القديم/الجديد. $15\\cdot\\frac{8}{10}\\cdot\\frac{6}{8}=9$ أيام.', 'More workers → fewer days, and more hours → fewer days: both are inverse, old/new. $15\\cdot\\frac{8}{10}\\cdot\\frac{6}{8}=9$ days.')
        },
        check: {
            prompt: say('6 pertsonak 180 litro ur gastatzen dituzte 3 egunetan. Zenbat egunetan gastatuko dituzte 300 litro 5 pertsonak?', '6 personas gastan 180 litros de agua en 3 días. ¿En cuántos días gastarán 300 litros 5 personas?', '6 أشخاص يستهلكون 180 لترًا من الماء في 3 أيام. في كم يومًا يستهلك 5 أشخاص 300 لتر؟', '6 people use 180 litres of water in 3 days. In how many days will 5 people use 300 litres?'),
            options: [same('$\\approx 4{,}2$'), same('$6$'), same('$5$')],
            correctIndex: 1,
            explanation: say('Litro gehiago → egun gehiago: zuzena, $\\frac{300}{180}$. Pertsona gutxiago → egun gehiago: alderantzizkoa, $\\frac{6}{5}$. $3\\cdot\\frac{300}{180}\\cdot\\frac{6}{5}=6$ egun.', 'Más litros → más días: directa, $\\frac{300}{180}$. Menos personas → más días: inversa, $\\frac{6}{5}$. $3\\cdot\\frac{300}{180}\\cdot\\frac{6}{5}=6$ días.', 'لترات أكثر ← أيام أكثر: طردي، $\\frac{300}{180}$. أشخاص أقل ← أيام أكثر: عكسي، $\\frac{6}{5}$. $3\\cdot\\frac{300}{180}\\cdot\\frac{6}{5}=6$ أيام.', 'More litres → more days: direct, $\\frac{300}{180}$. Fewer people → more days: inverse, $\\frac{6}{5}$. $3\\cdot\\frac{300}{180}\\cdot\\frac{6}{5}=6$ days.')
        }
    },
    'compound-unit': {
        mistake: {
            wrong: say('4 kamioik 60 t garraiatzen dituzte 3 bidaiatan. Kamioi bakarrak: $60\\cdot 4=240$ t 3 bidaiatan.', '4 camiones transportan 60 t en 3 viajes. Un solo camión: $60\\cdot 4=240$ t en 3 viajes.', '4 شاحنات تنقل 60 طنًا في 3 رحلات. شاحنة واحدة: $60\\cdot 4=240$ طنًا في 3 رحلات.', '4 lorries carry 60 t in 3 trips. A single lorry: $60\\cdot 4=240$ t in 3 trips.'),
            right: say('Kamioi bakar batek gutxiago eramaten du, ez gehiago: $60\\mathbin{:}4=15$ t 3 bidaiatan, eta bidaia bakarrean $15\\mathbin{:}3=5$ t.', 'Un solo camión lleva menos, no más: $60\\mathbin{:}4=15$ t en 3 viajes, y en un viaje, $15\\mathbin{:}3=5$ t.', 'الشاحنة الواحدة تنقل أقل لا أكثر: $60\\mathbin{:}4=15$ طنًا في 3 رحلات، وفي رحلة واحدة $15\\mathbin{:}3=5$ أطنان.', 'A single lorry carries less, not more: $60\\mathbin{:}4=15$ t in 3 trips, and in one trip, $15\\mathbin{:}3=5$ t.')
        },
        check: {
            prompt: say('3 makinak 450 pieza egiten dituzte 5 orduan. Zenbat pieza egiten ditu makina batek ordu batean?', '3 máquinas hacen 450 piezas en 5 horas. ¿Cuántas piezas hace una máquina en una hora?', '3 آلات تصنع 450 قطعة في 5 ساعات. كم قطعة تصنع آلة واحدة في ساعة واحدة؟', '3 machines make 450 parts in 5 hours. How many parts does one machine make in one hour?'),
            options: [same('$6750$'), same('$150$'), same('$30$')],
            correctIndex: 2,
            explanation: say('Makina bat 5 orduan: $450\\mathbin{:}3=150$. Ordu batean: $150\\mathbin{:}5=30$ pieza. Magnitude bat aldi berean.', 'Una máquina en 5 horas: $450\\mathbin{:}3=150$. En una hora: $150\\mathbin{:}5=30$ piezas. Una magnitud cada vez.', 'آلة واحدة في 5 ساعات: $450\\mathbin{:}3=150$. وفي ساعة واحدة: $150\\mathbin{:}5=30$ قطعة. مقدار واحد في كل مرة.', 'One machine in 5 hours: $450\\mathbin{:}3=150$. In one hour: $150\\mathbin{:}5=30$ parts. One quantity at a time.')
        }
    },
    'direct-share': {
        mistake: {
            wrong: say('120 banatu 1, 2 eta 3 zenbakiekiko zuzenki proportzionalki: $120\\mathbin{:}3=40$ bakoitzari.', 'Repartir 120 en partes directamente proporcionales a 1, 2 y 3: $120\\mathbin{:}3=40$ para cada uno.', 'توزيع 120 بالتناسب الطردي مع 1 و2 و3: $120\\mathbin{:}3=40$ لكل واحد.', 'Sharing 120 in direct proportion to 1, 2 and 3: $120\\mathbin{:}3=40$ each.'),
            right: say('Baturarekin zatitu behar da, $1+2+3=6$: $120\\mathbin{:}6=20$, eta zatiak 20, 40 eta 60 dira.', 'Hay que dividir entre la suma, $1+2+3=6$: $120\\mathbin{:}6=20$, y las partes son 20, 40 y 60.', 'يجب القسمة على المجموع $1+2+3=6$: $120\\mathbin{:}6=20$، والأجزاء 20 و40 و60.', 'You divide by the sum, $1+2+3=6$: $120\\mathbin{:}6=20$, and the parts are 20, 40 and 60.')
        },
        check: {
            prompt: say('280 banatu 3 eta 4 zenbakiekiko zuzenki proportzionalki. Zenbat dagokio 4 zenbakiari?', 'Reparte 280 en partes directamente proporcionales a 3 y a 4. ¿Cuánto le toca al 4?', 'وزّع 280 بالتناسب الطردي مع 3 و4. كم نصيب العدد 4؟', 'Share 280 in direct proportion to 3 and 4. How much goes to 4?'),
            options: [same('$160$'), same('$120$'), same('$140$')],
            correctIndex: 0,
            explanation: say('$3+4=7$ zati eta $280\\mathbin{:}7=40$: 3 zenbakiari $3\\cdot 40=120$ dagozkio, eta 4 zenbakiari $4\\cdot 40=160$. Zenbaki handiagoari, zati handiagoa.', '$3+4=7$ partes y $280\\mathbin{:}7=40$: al 3 le tocan $3\\cdot 40=120$ y al 4, $4\\cdot 40=160$. Al número mayor, la parte mayor.', '$3+4=7$ أجزاء و$280\\mathbin{:}7=40$: نصيب 3 هو $3\\cdot 40=120$، ونصيب 4 هو $4\\cdot 40=160$. للعدد الأكبر الجزء الأكبر.', '$3+4=7$ parts and $280\\mathbin{:}7=40$: 3 gets $3\\cdot 40=120$ and 4 gets $4\\cdot 40=160$. The bigger number gets the bigger part.')
        }
    },
    'share-problems': {
        mistake: {
            wrong: say('90 banatu $\\frac{1}{2}$ eta $\\frac{1}{4}$ zatikiekiko: 2 eta 4 zenbakien arabera banatzen da.', 'Repartir 90 proporcionalmente a $\\frac{1}{2}$ y $\\frac{1}{4}$: se reparte según 2 y 4.', 'توزيع 90 بالتناسب مع $\\frac{1}{2}$ و$\\frac{1}{4}$: نوزّع حسب 2 و4.', 'Sharing 90 in proportion to $\\frac{1}{2}$ and $\\frac{1}{4}$: you share according to 2 and 4.'),
            right: say('Izendatzaile berarekin, $\\frac{2}{4}$ eta $\\frac{1}{4}$: zenbakitzaileen arabera banatzen da, 2 eta 1. 60 eta 30 dagozkie.', 'Con el mismo denominador, $\\frac{2}{4}$ y $\\frac{1}{4}$: se reparte según los numeradores, 2 y 1. Tocan 60 y 30.', 'بالمقام نفسه $\\frac{2}{4}$ و$\\frac{1}{4}$: نوزّع حسب البسوط 2 و1. فالنصيبان 60 و30.', 'With the same denominator, $\\frac{2}{4}$ and $\\frac{1}{4}$: you share according to the numerators, 2 and 1. The parts are 60 and 30.')
        },
        check: {
            prompt: say('70 banatu $\\frac{1}{3}$ eta $\\frac{1}{4}$ zatikiekiko zuzenki proportzionalki. Zenbat dagokio $\\frac{1}{3}$ zatikiari?', 'Reparte 70 en partes directamente proporcionales a $\\frac{1}{3}$ y $\\frac{1}{4}$. ¿Cuánto le toca a $\\frac{1}{3}$?', 'وزّع 70 بالتناسب الطردي مع $\\frac{1}{3}$ و$\\frac{1}{4}$. كم نصيب $\\frac{1}{3}$؟', 'Share 70 in direct proportion to $\\frac{1}{3}$ and $\\frac{1}{4}$. How much goes to $\\frac{1}{3}$?'),
            options: [same('$30$'), same('$35$'), same('$40$')],
            correctIndex: 2,
            explanation: say('Izendatzaile bera: $\\frac{4}{12}$ eta $\\frac{3}{12}$. 4 eta 3 zenbakien arabera: $70\\mathbin{:}7=10$; beraz, $\\frac{1}{3}$ zatikiari 40 dagozkio.', 'Mismo denominador: $\\frac{4}{12}$ y $\\frac{3}{12}$. Reparto según 4 y 3: $70\\mathbin{:}7=10$, así que a $\\frac{1}{3}$ le tocan 40.', 'المقام نفسه: $\\frac{4}{12}$ و$\\frac{3}{12}$. التوزيع حسب 4 و3: $70\\mathbin{:}7=10$، إذن نصيب $\\frac{1}{3}$ هو 40.', 'Same denominator: $\\frac{4}{12}$ and $\\frac{3}{12}$. Share according to 4 and 3: $70\\mathbin{:}7=10$, so $\\frac{1}{3}$ gets 40.')
        }
    },
    'inverse-share': {
        mistake: {
            wrong: say('90 banatu 1 eta 2 zenbakiekiko alderantziz proportzionalki: 30 eta 60.', 'Repartir 90 de forma inversamente proporcional a 1 y 2: 30 y 60.', 'توزيع 90 بالتناسب العكسي مع 1 و2: 30 و60.', 'Sharing 90 in inverse proportion to 1 and 2: 30 and 60.'),
            right: say('Alderantzizkoan, zenbaki handiagoari zati txikiagoa dagokio: alderantzizkoekiko banatzen da, $\\frac{2}{2}$ eta $\\frac{1}{2}$, hau da, 2 eta 1. 60 eta 30.', 'En el inverso, al número mayor le toca la parte menor: se reparte según los inversos, $\\frac{2}{2}$ y $\\frac{1}{2}$, es decir, 2 y 1: 60 y 30.', 'في العكسي يأخذ العدد الأكبر الجزء الأصغر: نوزّع حسب المقلوبات $\\frac{2}{2}$ و$\\frac{1}{2}$، أي 2 و1: فالنصيبان 60 و30.', 'In an inverse share, the bigger number gets the smaller part: you share by the reciprocals, $\\frac{2}{2}$ and $\\frac{1}{2}$, that is 2 and 1: 60 and 30.')
        },
        check: {
            prompt: say('180 € banatzen dira 2 eta 3 zenbakiekiko alderantziz proportzionalki. Zenbat dagokio 3 zenbakiari?', 'Se reparten 180 € de forma inversamente proporcional a 2 y 3. ¿Cuánto le toca al 3?', 'نوزّع 180 يورو بالتناسب العكسي مع 2 و3. كم نصيب العدد 3؟', '€180 is shared in inverse proportion to 2 and 3. How much goes to 3?'),
            options: [same('$108$'), same('$72$'), same('$90$')],
            correctIndex: 1,
            explanation: say('Alderantzizkoak izendatzaile berarekin: $\\frac{3}{6}$ eta $\\frac{2}{6}$. 3 eta 2 zenbakien arabera: $180\\mathbin{:}5=36$; 3 zenbakiari $2\\cdot 36=72$ € dagozkio.', 'Inversos con el mismo denominador: $\\frac{3}{6}$ y $\\frac{2}{6}$. Reparto según 3 y 2: $180\\mathbin{:}5=36$; al 3 le tocan $2\\cdot 36=72$ €.', 'المقلوبان بالمقام نفسه: $\\frac{3}{6}$ و$\\frac{2}{6}$. التوزيع حسب 3 و2: $180\\mathbin{:}5=36$؛ نصيب 3 هو $2\\cdot 36=72$ يورو.', 'The reciprocals with the same denominator: $\\frac{3}{6}$ and $\\frac{2}{6}$. Share by 3 and 2: $180\\mathbin{:}5=36$; 3 gets $2\\cdot 36=72$ euros.')
        }
    },
    'percent-forms': {
        mistake: {
            wrong: say('250 €-ren % 4 = $250\\cdot 0{,}4=100$ €.', 'El 4 % de 250 € es $250\\cdot 0{,}4=100$ €.', '4٪ من 250 يورو هي $250\\cdot 0{,}4=100$ يورو.', '4% of €250 is $250\\cdot 0{,}4=100$ euros.'),
            right: say('% 4 = $\\frac{4}{100}=0{,}04$, ez $0{,}4$. Beraz, $250\\cdot 0{,}04=10$ €.', '4 % = $\\frac{4}{100}=0{,}04$, no $0{,}4$. Así que $250\\cdot 0{,}04=10$ €.', '4٪ = $\\frac{4}{100}=0{,}04$ وليس $0{,}4$. إذن $250\\cdot 0{,}04=10$ يورو.', '4% = $\\frac{4}{100}=0{,}04$, not $0{,}4$. So $250\\cdot 0{,}04=10$ euros.')
        },
        check: {
            prompt: say('Zenbat da 350 €-ren % 6?', '¿Cuánto es el 6 % de 350 €?', 'كم تساوي 6٪ من 350 يورو؟', 'How much is 6% of €350?'),
            options: [same('$21$'), same('$210$'), same('$2{,}1$')],
            correctIndex: 0,
            explanation: say('% 6 = $0{,}06$, eta $350\\cdot 0{,}06=21$ €. 210 ateratzen da % 6 $0{,}6$ dela pentsatuz gero.', '6 % = $0{,}06$, y $350\\cdot 0{,}06=21$ €. El 210 sale si se toma el 6 % como $0{,}6$.', '6٪ = $0{,}06$، و$350\\cdot 0{,}06=21$ يورو. أما 210 فيأتي إذا اعتبرنا 6٪ تساوي $0{,}6$.', '6% = $0{,}06$, and $350\\cdot 0{,}06=21$ euros. 210 comes from taking 6% as $0{,}6$.')
        }
    },
    'percent-total': {
        mistake: {
            wrong: say('Kantitate baten % 15 = 30; beraz, kantitatea $30\\cdot 0{,}15=4{,}5$ da.', 'El 15 % de una cantidad es 30, así que la cantidad es $30\\cdot 0{,}15=4{,}5$.', '15٪ من كمية هي 30، إذن الكمية $30\\cdot 0{,}15=4{,}5$.', '15% of an amount is 30, so the amount is $30\\cdot 0{,}15=4{,}5$.'),
            right: say('Zatia ezaguna da: osoa = zatia : hamartarra. $30\\mathbin{:}0{,}15=200$. Egiaztatu: 200 zenbakiaren % 15 = 30.', 'Se conoce la parte: total = parte : decimal. $30\\mathbin{:}0{,}15=200$. Comprueba: el 15 % de 200 es 30.', 'الجزء معلوم: الكل = الجزء : العدد العشري. $30\\mathbin{:}0{,}15=200$. تحقّق: 15٪ من 200 هي 30.', 'The part is known: total = part : decimal. $30\\mathbin{:}0{,}15=200$. Check: 15% of 200 is 30.')
        },
        check: {
            prompt: say('Klase batean 3 ikasle falta dira, taldearen % 12. Zenbat ikasle ditu taldeak?', 'En una clase faltan 3 alumnos, el 12 % del grupo. ¿Cuántos alumnos tiene el grupo?', 'يغيب 3 تلاميذ عن الصف، أي 12٪ من المجموعة. كم تلميذًا في المجموعة؟', '3 pupils are absent, 12% of the group. How many pupils are in the group?'),
            options: [same('$0{,}36$'), same('$36$'), same('$25$')],
            correctIndex: 2,
            explanation: say('Osoa = zatia : hamartarra: $3\\mathbin{:}0{,}12=25$ ikasle. Egiaztatu: 25 zenbakiaren % 12 = 3.', 'Total = parte : decimal: $3\\mathbin{:}0{,}12=25$ alumnos. Comprueba: el 12 % de 25 es 3.', 'الكل = الجزء : العدد العشري: $3\\mathbin{:}0{,}12=25$ تلميذًا. تحقّق: 12٪ من 25 هي 3.', 'Total = part : decimal: $3\\mathbin{:}0{,}12=25$ pupils. Check: 12% of 25 is 3.')
        }
    },
    'percent-which': {
        mistake: {
            wrong: say('Prezio bat 80 €-tik 60 €-ra jaitsi da. Jaitsiera amaierako prezioaz zatitzen dut: $20\\mathbin{:}60\\cdot 100\\approx 33$.', 'Un precio baja de 80 € a 60 €. Divido la bajada entre el precio final: $20\\mathbin{:}60\\cdot 100\\approx 33$.', 'انخفض سعر من 80 يورو إلى 60 يورو. أقسم الانخفاض على السعر النهائي: $20\\mathbin{:}60\\cdot 100\\approx 33$.', 'A price drops from €80 to €60. I divide the drop by the final price: $20\\mathbin{:}60\\cdot 100\\approx 33$.'),
            right: say('Beti hasierako kantitatearekiko: $20\\mathbin{:}80\\cdot 100=25$. % 25 jaitsi da.', 'Siempre respecto de la cantidad inicial: $20\\mathbin{:}80\\cdot 100=25$. Ha bajado un 25 %.', 'دائمًا بالنسبة إلى الكمية الأصلية: $20\\mathbin{:}80\\cdot 100=25$. انخفض بنسبة 25٪.', 'Always compared with the starting amount: $20\\mathbin{:}80\\cdot 100=25$. It has dropped 25%.')
        },
        check: {
            prompt: say('Sarrera batek 40 € balio zuen, eta orain 50 € balio du. Zer ehuneko igo da?', 'Una entrada costaba 40 € y ahora cuesta 50 €. ¿Qué porcentaje ha subido?', 'كان ثمن تذكرة 40 يورو وأصبح 50 يورو. بأيّ نسبة ارتفع؟', 'A ticket cost €40 and now costs €50. By what percentage has it gone up?'),
            options: [say('% 20', '20 %', '20٪', '20%'), say('% 25', '25 %', '25٪', '25%'), say('% 10', '10 %', '10٪', '10%')],
            correctIndex: 1,
            explanation: say('Amaierakoa : hasierakoa · 100: $50\\mathbin{:}40\\cdot 100=125$, hau da, % 125 → % 25 igo da. % 20 amaierakoaz zatituz ateratzen da.', 'Final : inicial · 100: $50\\mathbin{:}40\\cdot 100=125$, es decir, el 125 % → ha subido un 25 %. El 20 % sale al dividir entre la final.', 'النهائي : الأصلي · 100: $50\\mathbin{:}40\\cdot 100=125$، أي 125٪ ← ارتفع بنسبة 25٪. أما 20٪ فتأتي من القسمة على النهائي.', 'Final : starting · 100: $50\\mathbin{:}40\\cdot 100=125$, that is 125% → it has gone up 25%. 20% comes from dividing by the final price.')
        }
    },
    index: {
        mistake: {
            wrong: say('% 20 merkatuta, 48 € balio du. Lehen $48\\cdot 1{,}2=57{,}6$ € balio zuen.', 'Rebajado un 20 %, cuesta 48 €. Antes costaba $48\\cdot 1{,}2=57{,}6$ €.', 'بعد تخفيض 20٪ صار ثمنه 48 يورو. إذن كان ثمنه $48\\cdot 1{,}2=57{,}6$ يورو.', 'With 20% off, it costs €48. Before, it cost $48\\cdot 1{,}2=57{,}6$ euros.'),
            right: say('Hasierakoa = amaierakoa : indizea. % 20 merkatzearen indizea $0{,}8$ da: $48\\mathbin{:}0{,}8=60$ €.', 'Inicial = final : índice. El índice de una rebaja del 20 % es $0{,}8$: $48\\mathbin{:}0{,}8=60$ €.', 'الأصلي = النهائي : المؤشر. مؤشر تخفيض 20٪ هو $0{,}8$: $48\\mathbin{:}0{,}8=60$ يورو.', 'Starting = final : index. The index of a 20% discount is $0{,}8$: $48\\mathbin{:}0{,}8=60$ euros.')
        },
        check: {
            prompt: say('% 25 igo ondoren, abonu batek 30 € balio du. Zenbat euro balio zuen lehen?', 'Tras subir un 25 %, un abono cuesta 30 €. ¿Cuántos euros costaba antes?', 'بعد زيادة 25٪ صار ثمن اشتراك 30 يورو. كم يورو كان ثمنه قبل ذلك؟', 'After a 25% rise, a pass costs €30. How many euros did it cost before?'),
            options: [same('$22{,}5$'), same('$37{,}5$'), same('$24$')],
            correctIndex: 2,
            explanation: say('Igoeraren indizea: $1{,}25$. Hasierakoa = amaierakoa : indizea: $30\\mathbin{:}1{,}25=24$ €. Amaierakoari % 25 kentzeak beste gauza bat ematen du: $30\\cdot 0{,}75=22{,}5$.', 'Índice de subida: $1{,}25$. Inicial = final : índice: $30\\mathbin{:}1{,}25=24$ €. Quitar el 25 % a la final da otra cosa: $30\\cdot 0{,}75=22{,}5$.', 'مؤشر الزيادة: $1{,}25$. الأصلي = النهائي : المؤشر: $30\\mathbin{:}1{,}25=24$ يورو. أما طرح 25٪ من النهائي فيعطي شيئًا آخر: $30\\cdot 0{,}75=22{,}5$.', 'The index of the rise: $1{,}25$. Starting = final : index: $30\\mathbin{:}1{,}25=24$ euros. Taking 25% off the final price gives something else: $30\\cdot 0{,}75=22{,}5$.')
        }
    },
    chained: {
        mistake: {
            wrong: say('% 20 igo eta gero % 10: guztira % 30 igo da.', 'Sube un 20 % y después un 10 %: ha subido un 30 %.', 'ارتفع 20٪ ثم 10٪: إذن ارتفع 30٪.', 'It goes up 20% and then 10%: it has gone up 30%.'),
            right: say('Indizeak biderkatzen dira: $1{,}2\\cdot 1{,}1=1{,}32$. % 32 igo da.', 'Se multiplican los índices: $1{,}2\\cdot 1{,}1=1{,}32$. Ha subido un 32 %.', 'نضرب المؤشرات: $1{,}2\\cdot 1{,}1=1{,}32$. ارتفع بنسبة 32٪.', 'The indices are multiplied: $1{,}2\\cdot 1{,}1=1{,}32$. It has gone up 32%.')
        },
        check: {
            prompt: say('Prezio bat % 50 jaitsi da, eta gero % 50 igo. Nola dago hasierakoarekin alderatuta?', 'Un precio baja un 50 % y después sube un 50 %. ¿Cómo queda respecto del inicial?', 'انخفض سعر 50٪ ثم ارتفع 50٪. كيف صار مقارنةً بالسعر الأصلي؟', 'A price drops 50% and then rises 50%. How does it compare with the starting price?'),
            options: [
                say('% 25 merkeago', 'Un 25 % más barato', 'أرخص بنسبة 25٪', '25% cheaper'),
                say('Hasieran bezala', 'Igual que al principio', 'كما كان في البداية', 'The same as at the start'),
                say('% 25 garestiago', 'Un 25 % más caro', 'أغلى بنسبة 25٪', '25% dearer')
            ],
            correctIndex: 0,
            explanation: say('$0{,}5\\cdot 1{,}5=0{,}75$: % 75 geratzen da, % 25 merkeago. Igoera merkatutako prezioari aplikatzen zaio.', '$0{,}5\\cdot 1{,}5=0{,}75$: queda en el 75 %, un 25 % más barato. La subida se aplica al precio ya rebajado.', '$0{,}5\\cdot 1{,}5=0{,}75$: يبقى 75٪، أي أرخص بنسبة 25٪. فالزيادة تُطبَّق على السعر بعد التخفيض.', '$0{,}5\\cdot 1{,}5=0{,}75$: it ends at 75%, 25% cheaper. The rise is applied to the price already reduced.')
        }
    },
    interest: {
        mistake: {
            wrong: say('2000 € 4 urtez, interes-tasa % 3: $I=\\frac{2000\\cdot 3}{100}=60$ €.', '2000 € al 3 % durante 4 años: $I=\\frac{2000\\cdot 3}{100}=60$ €.', '2000 يورو بنسبة 3٪ لمدة 4 سنوات: $I=\\frac{2000\\cdot 3}{100}=60$ يورو.', '€2000 at 3% for 4 years: $I=\\frac{2000\\cdot 3}{100}=60$ euros.'),
            right: say('Urteak falta dira: $I=\\frac{2000\\cdot 3\\cdot 4}{100}=240$ €. 60 € urte bakarreko interesa da.', 'Faltan los años: $I=\\frac{2000\\cdot 3\\cdot 4}{100}=240$ €. 60 € es el interés de un solo año.', 'تنقص السنوات: $I=\\frac{2000\\cdot 3\\cdot 4}{100}=240$ يورو. أما 60 يورو ففائدة سنة واحدة.', 'The years are missing: $I=\\frac{2000\\cdot 3\\cdot 4}{100}=240$ euros. €60 is the interest of a single year.')
        },
        check: {
            prompt: say('5000 € uzten dira bankuan 3 urtez, interes bakunean; interes-tasa % 2 da. Zenbat diru dago amaieran?', 'Se dejan 5000 € en el banco al 2 % durante 3 años, a interés simple. ¿Cuánto dinero hay al final?', 'نودع 5000 يورو في البنك بنسبة 2٪ لمدة 3 سنوات بفائدة بسيطة. كم يصبح المال في النهاية؟', '€5000 is left in the bank at 2% for 3 years, at simple interest. How much money is there at the end?'),
            options: [same('$300$'), same('$5300$'), same('$5100$')],
            correctIndex: 1,
            explanation: say('$I=\\frac{5000\\cdot 2\\cdot 3}{100}=300$ €, eta amaieran $5000+300=5300$ € daude. 300 interesa bakarrik da.', '$I=\\frac{5000\\cdot 2\\cdot 3}{100}=300$ €, y al final hay $5000+300=5300$ €. 300 es solo el interés.', '$I=\\frac{5000\\cdot 2\\cdot 3}{100}=300$ يورو، وفي النهاية $5000+300=5300$ يورو. و300 هي الفائدة وحدها.', '$I=\\frac{5000\\cdot 2\\cdot 3}{100}=300$ euros, and at the end there is $5000+300=5300$ euros. 300 is just the interest.')
        }
    }
}

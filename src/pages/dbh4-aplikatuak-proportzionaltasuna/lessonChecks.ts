import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Proportzionaltasuna · 4. DBH aplikatuak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. The mistakes are the ones
   the race, the detective and the bank already use (months taken as years,
   percentages added, the average of the prices…). The questions use new
   numbers, never those of «Let's solve» or of the example, and one of their
   wrong answers is the lesson's typical mistake. Tests in
   tests/lesson-checks.test.ts and tests/proportzionaltasuna-dbh4ap-lessons.test.ts.
   ========================================================================== */

export type ProportionDbh4ApTopicId = 'relations' | 'direct-rule' | 'inverse-rule' | 'compound' | 'direct-share' | 'inverse-share' | 'percent-calc' | 'index' | 'chained' | 'simple-interest' | 'compound-interest' | 'periods' | 'mixtures' | 'motion' | 'taps'

/** In Basque and Spanish a number never breaks from its sign: 3,60 €, 25 %, % 25, and $r$ % after a formula */
const glue = (text: string) => text.split(/(\$[^$]*\$)/).map((part) => (part.startsWith('$') ? part : part.replace(/(\d) ([€%])/g, '$1\u00a0$2').replace(/% (?=\d)|% $/g, '%\u00a0').replace(/^ ([€%])/, '\u00a0$1'))).join('')
/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu: glue(eu), es: glue(es), en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const proportionDbh4ApLessonChecks: Record<ProportionDbh4ApTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    relations: {
        mistake: {
            wrong: say(
                'Abiadura igotzean kontsumoa ere igotzen da; beraz, zuzenki proportzionalak dira.',
                'Al subir la velocidad sube el consumo, así que son directamente proporcionales.',
                'إذا زادت السرعة زاد الاستهلاك، إذن هما متناسبان طرديًا.',
                'When the speed goes up, the fuel use goes up, so they are directly proportional.'
            ),
            right: say(
                'Batera haztea ez da nahikoa: zatidurak berdina izan beharko luke, eta $\\frac{7}{90}\\neq\\frac{12}{120}$.',
                'Crecer a la vez no basta: el cociente tendría que ser el mismo, y $\\frac{7}{90}\\neq\\frac{12}{120}$.',
                'لا يكفي أن يزيدا معًا: يجب أن يكون حاصل القسمة نفسه، و$\\frac{7}{90}\\neq\\frac{12}{120}$.',
                'Growing together is not enough: the quotient would have to be the same, and $\\frac{7}{90}\\neq\\frac{12}{120}$.'
            )
        },
        check: {
            prompt: say('Zein taula da alderantzizko proportzionaltasunekoa?', '¿Qué tabla es de proporcionalidad inversa?', 'أيّ جدول يمثّل تناسبًا عكسيًا؟', 'Which table shows inverse proportion?'),
            options: [same('$(2,\\,12),\\ (4,\\,6),\\ (8,\\,3)$'), same('$(2,\\,6),\\ (4,\\,12),\\ (8,\\,24)$'), same('$(2,\\,12),\\ (4,\\,10),\\ (8,\\,8)$')],
            correctIndex: 0,
            explanation: say('Biderkadura beti 24 da: $2\\cdot 12=4\\cdot 6=8\\cdot 3$. Hirugarrenean bata jaisten da bestea igotzean, baina biderkadura aldatu egiten da.', 'El producto es siempre 24: $2\\cdot 12=4\\cdot 6=8\\cdot 3$. En la tercera una baja cuando la otra sube, pero el producto cambia.', 'حاصل الضرب دائمًا 24: $2\\cdot 12=4\\cdot 6=8\\cdot 3$. في الثالث ينقص أحدهما حين يزيد الآخر، لكن حاصل الضرب يتغير.', 'The product is always 24: $2\\cdot 12=4\\cdot 6=8\\cdot 3$. In the third one, one goes down when the other goes up, but the product changes.')
        }
    },
    'direct-rule': {
        mistake: {
            wrong: say(
                '0,75 l oliok 3,60 € balio badu, litro batek $3{,}60\\cdot 0{,}75=2{,}70$ € balio du.',
                'Si 0,75 l cuestan 3,60 €, un litro cuesta $3{,}60\\cdot 0{,}75=2{,}70$ €.',
                'إذا كان ثمن 0.75 ل هو 3.60 €، فثمن اللتر $3{,}60\\cdot 0{,}75=2{,}70$ €.',
                'If 0.75 l costs €3.60, one litre costs €$3{,}60\\cdot 0{,}75=2{,}70$.'
            ),
            right: say(
                'Litro bat 0,75 l baino gehiago da; beraz, garestiagoa izan behar du: $3{,}60\\mathbin{:}0{,}75=4{,}80$ €.',
                'Un litro es más que 0,75 l, así que tiene que costar más: $3{,}60\\mathbin{:}0{,}75=4{,}80$ €.',
                'اللتر أكثر من 0.75 ل، فيجب أن يكون ثمنه أكبر: $3{,}60\\mathbin{:}0{,}75=4{,}80$ €.',
                'One litre is more than 0.75 l, so it must cost more: €$3{,}60\\mathbin{:}0{,}75=4{,}80$.'
            )
        },
        check: {
            prompt: say('3 m oihalek $13{,}50$ € balio badute, zenbat balio dute 5 m?', 'Si 3 m de tela cuestan $13{,}50$ €, ¿cuánto cuestan 5 m?', 'إذا كان ثمن 3 م من القماش $13{,}50$ €، فكم ثمن 5 م؟', 'If 3 m of fabric cost €$13{,}50$, how much do 5 m cost?'),
            options: [say('$8{,}10$ €', '$8{,}10$ €', '$8{,}10$ €', '€$8{,}10$'), say('$40{,}50$ €', '$40{,}50$ €', '$40{,}50$ €', '€$40{,}50$'), say('$22{,}50$ €', '$22{,}50$ €', '$22{,}50$ €', '€$22{,}50$')],
            correctIndex: 2,
            explanation: say('Metro bat: $13{,}50\\div 3=4{,}50$ €. Bost metro: $4{,}50\\cdot 5=22{,}50$ €.', 'Un metro: $13{,}50\\div 3=4{,}50$ €. Cinco metros: $4{,}50\\cdot 5=22{,}50$ €.', 'المتر الواحد: $13{,}50\\div 3=4{,}50$ €. خمسة أمتار: $4{,}50\\cdot 5=22{,}50$ €.', 'One metre: $13{,}50\\div 3=4{,}50$ euros. Five metres: $4{,}50\\cdot 5=22{,}50$ euros.')
        }
    },
    'inverse-rule': {
        mistake: {
            wrong: say(
                '35 behiren ordez 20 behirekin, bazkak $\\frac{60\\cdot 20}{35}\\approx 34$ egun irauten du.',
                'Con 20 vacas en lugar de 35, el pasto dura $\\frac{60\\cdot 20}{35}\\approx 34$ días.',
                'مع 20 بقرة بدل 35 يكفي العلف $\\frac{60\\cdot 20}{35}\\approx 34$ يومًا.',
                'With 20 cows instead of 35, the grass lasts $\\frac{60\\cdot 20}{35}\\approx 34$ days.'
            ),
            right: say(
                'Behi gutxiago → egun gehiago: alderantzizkoa da, eta biderkadura ez da aldatzen: $\\frac{35\\cdot 60}{20}=105$ egun.',
                'Menos vacas → más días: es inversa, y el producto no cambia: $\\frac{35\\cdot 60}{20}=105$ días.',
                'بقر أقل ← أيام أكثر: التناسب عكسي، وحاصل الضرب لا يتغير: $\\frac{35\\cdot 60}{20}=105$ يومًا.',
                'Fewer cows → more days: it is inverse, and the product does not change: $\\frac{35\\cdot 60}{20}=105$ days.'
            )
        },
        check: {
            prompt: say('80 km/h-ra, bidaia batek 3 h irauten du. Zenbat iraungo du 120 km/h-ra?', 'A 80 km/h, un viaje dura 3 h. ¿Cuánto dura a 120 km/h?', 'بسرعة 80 كم/س تستغرق رحلة 3 س. كم تستغرق بسرعة 120 كم/س؟', 'At 80 km/h, a trip takes 3 h. How long does it take at 120 km/h?'),
            options: [say('$4{,}5$ h', '$4{,}5$ h', '$4{,}5$ س', '$4{,}5$ h'), say('$2$ h', '$2$ h', '$2$ س', '$2$ h'), say('$1{,}5$ h', '$1{,}5$ h', '$1{,}5$ س', '$1{,}5$ h')],
            correctIndex: 1,
            explanation: say('Abiadura gehiago, denbora gutxiago: biderkadura ez da aldatzen, $80\\cdot 3=240$ eta $240\\div 120=2$.', 'Más velocidad, menos tiempo: el producto no cambia, $80\\cdot 3=240$ y $240\\div 120=2$.', 'سرعة أكبر، زمن أقل: حاصل الضرب لا يتغير، $80\\cdot 3=240$ و$240\\div 120=2$.', 'More speed, less time: the product does not change, $80\\cdot 3=240$ and $240\\div 120=2$.')
        }
    },
    compound: {
        mistake: {
            wrong: say(
                '3 margolariren ordez 5 margolarirekin: $10\\cdot\\frac{3}{5}=6$ egun.',
                'Con 5 pintores en vez de 3: $10\\cdot\\frac{3}{5}=6$ días.',
                'مع 5 دهّانين بدل 3: $10\\cdot\\frac{3}{5}=6$ أيام.',
                'With 5 painters instead of 3: $10\\cdot\\frac{3}{5}=6$ days.'
            ),
            right: say(
                'Eguneko orduak ere aldatzen dira, eta aldaketa bakoitzak bere zatikia du: $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$ egun.',
                'También cambian las horas al día, y cada cambio pone su fracción: $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$ días.',
                'تتغير أيضًا الساعات اليومية، ولكل تغيّر كسره: $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$ أيام.',
                'The hours a day change too, and each change brings its own fraction: $10\\cdot\\frac{3}{5}\\cdot\\frac{8}{6}=8$ days.'
            )
        },
        check: {
            prompt: say('4 langilek obra bat 15 egunean egiten dute, egunean 6 ordu lan eginez. Zenbat egun beharko dituzte 5 langilek, egunean 8 ordu lan eginez?', '4 obreros hacen una obra en 15 días trabajando 6 horas al día. ¿Cuántos días tardan 5 obreros trabajando 8 horas al día?', '4 عمال ينجزون عملًا في 15 يومًا بالعمل 6 ساعات يوميًا. كم يومًا يحتاج 5 عمال يعملون 8 ساعات يوميًا؟', '4 workers finish a job in 15 days working 6 hours a day. How many days do 5 workers take working 8 hours a day?'),
            options: [say('$25$ egun', '$25$ días', '$25$ يومًا', '$25$ days'), say('$12$ egun', '$12$ días', '$12$ يومًا', '$12$ days'), say('$9$ egun', '$9$ días', '$9$ أيام', '$9$ days')],
            correctIndex: 2,
            explanation: say('Biak alderantzizkoak dira (zaharra/berria): $15\\cdot\\frac{4}{5}\\cdot\\frac{6}{8}=9$ egun.', 'Las dos son inversas (viejo/nuevo): $15\\cdot\\frac{4}{5}\\cdot\\frac{6}{8}=9$ días.', 'كلاهما عكسي (القديم/الجديد): $15\\cdot\\frac{4}{5}\\cdot\\frac{6}{8}=9$ أيام.', 'Both are inverse (old/new): $15\\cdot\\frac{4}{5}\\cdot\\frac{6}{8}=9$ days.')
        }
    },
    'direct-share': {
        mistake: {
            wrong: say(
                'Ameliak 60 egun daramatza etxean, eta $62{,}40\\mathbin{:}120=0{,}52$ € ordaintzen ditu.',
                'Amelia lleva 60 días en el piso y paga $62{,}40\\mathbin{:}120=0{,}52$ €.',
                'أمضت أميليا 60 يومًا في الشقة وتدفع $62{,}40\\mathbin{:}120=0{,}52$ €.',
                'Amelia has lived in the flat for 60 days and pays €$62{,}40\\mathbin{:}120=0{,}52$.'
            ),
            right: say(
                'Hori egun baten balioa da, eta Ameliak 60 egun daramatza: $60\\cdot 0{,}52=31{,}20$ €.',
                'Eso es lo que vale un día, y Amelia lleva 60: $60\\cdot 0{,}52=31{,}20$ €.',
                'هذه قيمة يوم واحد، وأميليا أمضت 60 يومًا: $60\\cdot 0{,}52=31{,}20$ €.',
                'That is what one day is worth, and Amelia has been there for 60 days: €$60\\cdot 0{,}52=31{,}20$.'
            )
        },
        check: {
            prompt: say('Banatu 90 zuzenki proportzionalak diren zatitan 1, 2 eta 3 zenbakiekiko. Zein da zatirik handiena?', 'Reparte 90 en partes directamente proporcionales a 1, 2 y 3. ¿Cuál es la parte mayor?', 'وزّع 90 توزيعًا طرديًا على 1 و2 و3. ما الجزء الأكبر؟', 'Share 90 in direct proportion to 1, 2 and 3. What is the largest share?'),
            options: [same('$15$'), same('$45$'), same('$30$')],
            correctIndex: 1,
            explanation: say('$90\\div(1+2+3)=15$ zati baten balioa da; 3 zenbakiari $3\\cdot 15=45$ tokatzen zaio.', '$90\\div(1+2+3)=15$ es el valor de una parte; al 3 le tocan $3\\cdot 15=45$.', '$90\\div(1+2+3)=15$ هي قيمة الجزء الواحد؛ ويأخذ 3 مقدار $3\\cdot 15=45$.', '$90\\div(1+2+3)=15$ is the value of one part; 3 gets $3\\cdot 15=45$.')
        }
    },
    'inverse-share': {
        mistake: {
            wrong: say(
                'Banatu 660 alderantziz; zenbakiak: 1, 2 eta 3. $660\\mathbin{:}6=110$, eta zatiak: 110, 220 eta 330.',
                'Repartir 660 inversamente a 1, 2 y 3: $660\\mathbin{:}6=110$, y las partes son 110, 220 y 330.',
                'توزيع 660 عكسيًا على 1 و2 و3: $660\\mathbin{:}6=110$، والأجزاء 110 و220 و330.',
                'Share 660 inversely in proportion to 1, 2 and 3: $660\\mathbin{:}6=110$, so the shares are 110, 220 and 330.'
            ),
            right: say(
                'Hori banaketa zuzena da: 3 zenbakiari zati handiena. Alderantzizkoan, alderantziz: 360, 180 eta 120.',
                'Ese es el reparto directo: al 3 le toca la parte mayor. En el inverso es al revés: 360, 180 y 120.',
                'هذا هو التوزيع الطردي: العدد 3 يأخذ الجزء الأكبر. وفي العكسي العكس: 360 و180 و120.',
                'That is the direct share: 3 gets the largest share. In the inverse share it is the other way round: 360, 180 and 120.'
            )
        },
        check: {
            prompt: say('Banatu 120 alderantziz proportzionalak diren zatitan 1 eta 2 zenbakiekiko. Zenbat tokatzen zaio 2 zenbakiari?', 'Reparte 120 en partes inversamente proporcionales a 1 y 2. ¿Cuánto le toca al 2?', 'وزّع 120 توزيعًا عكسيًا على 1 و2. كم يأخذ 2؟', 'Share 120 in inverse proportion to 1 and 2. How much does 2 get?'),
            options: [same('$80$'), same('$60$'), same('$40$')],
            correctIndex: 2,
            explanation: say('Alderantzizkoak 1 eta $\\frac{1}{2}$ dira, hau da, 2 eta 1: $120\\div 3=40$. 2 zenbakiari zatirik txikiena: 40.', 'Los inversos son 1 y $\\frac{1}{2}$, es decir, 2 y 1: $120\\div 3=40$. Al 2 le toca la parte menor: 40.', 'المقلوبان 1 و$\\frac{1}{2}$، أي 2 و1: $120\\div 3=40$. ويأخذ 2 الجزء الأصغر: 40.', 'The reciprocals are 1 and $\\frac{1}{2}$, that is, 2 and 1: $120\\div 3=40$. 2 gets the smaller share: 40.')
        }
    },
    'percent-calc': {
        mistake: {
            wrong: say(
                '24\u00a0000 zale osoaren % 80 dira: $24\\,000\\cdot 0{,}8=19\\,200$.',
                '24\u00a0000 aficionados son el 80 % del total: $24\\,000\\cdot 0{,}8=19\\,200$.',
                '24\u00a0000 مشجع هم 80٪ من الكل: $24\\,000\\cdot 0{,}8=19\\,200$.',
                '24,000 fans are 80% of the whole: $24\\,000\\cdot 0{,}8=19\\,200$.'
            ),
            right: say(
                'Osoak bere % 80 baino handiagoa izan behar du: zatitu egiten da, $24\\,000\\mathbin{:}0{,}8=30\\,000$.',
                'El total tiene que ser mayor que su 80 %: se divide, $24\\,000\\mathbin{:}0{,}8=30\\,000$.',
                'يجب أن يكون الكل أكبر من 80٪ منه: نقسم، $24\\,000\\mathbin{:}0{,}8=30\\,000$.',
                'The whole must be bigger than 80% of it: you divide, $24\\,000\\mathbin{:}0{,}8=30\\,000$.'
            )
        },
        check: {
            prompt: say('Kantitate baten % 15 hau da: 45. Zein da kantitatea?', 'El 15 % de una cantidad es 45. ¿Cuál es la cantidad?', '15٪ من كمية يساوي 45. ما الكمية؟', '15% of an amount is 45. What is the amount?'),
            options: [same('$300$'), same('$6{,}75$'), same('$675$')],
            correctIndex: 0,
            explanation: say('Zatia zati hamartarra: $45\\div 0{,}15=300$. Osoa zatia baino handiagoa da.', 'Parte entre decimal: $45\\div 0{,}15=300$. El total es mayor que la parte.', 'الجزء على العشري: $45\\div 0{,}15=300$. الكل أكبر من الجزء.', 'Part divided by decimal: $45\\div 0{,}15=300$. The whole is bigger than the part.')
        }
    },
    index: {
        mistake: {
            wrong: say(
                '% 21 BEZa kentzeko, % 21 jaisten da: $143{,}99\\cdot 0{,}79\\approx 113{,}75$ €.',
                'Para quitar el IVA del 21 %, se rebaja un 21 %: $143{,}99\\cdot 0{,}79\\approx 113{,}75$ €.',
                'لإزالة ضريبة 21٪ نخفّض 21٪: $143{,}99\\cdot 0{,}79\\approx 113{,}75$ €.',
                'To take off 21% VAT, you take off 21%: €$143{,}99\\cdot 0{,}79\\approx 113{,}75$.'
            ),
            right: say(
                '% 21 hori BEZik gabeko prezioari aplikatu zitzaion, ez faktura osoari: zatitu egiten da, $143{,}99\\mathbin{:}1{,}21=119$ €.',
                'El 21 % se calculó sobre el precio sin IVA, no sobre la factura: se divide, $143{,}99\\mathbin{:}1{,}21=119$ €.',
                'حُسبت الـ21٪ على السعر دون ضريبة لا على الفاتورة: نقسم، $143{,}99\\mathbin{:}1{,}21=119$ €.',
                'The 21% was worked out on the price without VAT, not on the bill: you divide, €$143{,}99\\mathbin{:}1{,}21=119$.'
            )
        },
        check: {
            prompt: say('BEZa (% 21) barne, mugikor batek 242 € balio du. Zenbat balio du BEZ gabe?', 'Con el 21 % de IVA, un móvil cuesta 242 €. ¿Cuánto cuesta sin IVA?', 'مع ضريبة القيمة المضافة 21٪ يكلّف هاتف 242 €. كم ثمنه من دون الضريبة؟', 'With 21% VAT, a phone costs €242. How much is it without VAT?'),
            options: [say('$191{,}18$ €', '$191{,}18$ €', '$191{,}18$ €', '€$191{,}18$'), say('$292{,}82$ €', '$292{,}82$ €', '$292{,}82$ €', '€$292{,}82$'), say('$200$ €', '$200$ €', '$200$ €', '€$200$')],
            correctIndex: 2,
            explanation: say('Atzera, indizeaz zatitzen da: $242\\div 1{,}21=200$ €. % 21 hori 200 euroren gainean kalkulatu zen, ez 242 euroren gainean.', 'Hacia atrás se divide entre el índice: $242\\div 1{,}21=200$ €. Ese 21 % se calculó sobre 200 €, no sobre 242 €.', 'للرجوع نقسم على المؤشر: $242\\div 1{,}21=200$ €. نسبة 21٪ حُسبت من 200 € لا من 242 €.', 'Going back, divide by the multiplier: $242\\div 1{,}21=200$ euros. That 21% was worked out on €200, not on €242.')
        }
    },
    chained: {
        mistake: {
            wrong: say(
                'Saltzaile batek % 40 igo, eta gero % 40 jaisten du: $40-40=0$, prezioa berdin geratzen da.',
                'Un comerciante sube un 40 % y luego rebaja un 40 %: $40-40=0$, el precio queda igual.',
                'يرفع تاجر السعر 40٪ ثم يخفّضه 40٪: $40-40=0$، فيبقى السعر كما هو.',
                'A shopkeeper puts prices up by 40% and then down by 40%: $40-40=0$, so the price stays the same.'
            ),
            right: say(
                'Beherapena igotako prezioari aplikatzen zaio: $1{,}4\\cdot 0{,}6=0{,}84$, hasieran baino % 16 gutxiago.',
                'La rebaja se aplica al precio ya subido: $1{,}4\\cdot 0{,}6=0{,}84$, un 16 % menos que al principio.',
                'يُطبَّق التخفيض على السعر بعد رفعه: $1{,}4\\cdot 0{,}6=0{,}84$، أي أقل بـ16٪ من البداية.',
                'The cut is applied to the raised price: $1{,}4\\cdot 0{,}6=0{,}84$, 16% less than at the start.'
            )
        },
        check: {
            prompt: say('Prezio bat % 10 igotzen da, eta gero beste % 10. Zenbat igo da guztira?', 'Un precio sube un 10 % y después otro 10 %. ¿Cuánto ha subido en total?', 'سعر يرتفع 10٪ ثم 10٪ أخرى. كم ارتفع في المجموع؟', 'A price goes up 10% and then another 10%. How much has it gone up in total?'),
            options: [say('% 20', '20 %', '20٪', '20%'), say('% 21', '21 %', '21٪', '21%'), say('% 11', '11 %', '11٪', '11%')],
            correctIndex: 1,
            explanation: say('Indizeak biderkatzen dira: $1{,}1\\cdot 1{,}1=1{,}21$, hau da, % 21 gehiago.', 'Se multiplican los índices: $1{,}1\\cdot 1{,}1=1{,}21$, un 21 % más.', 'نضرب المؤشرين: $1{,}1\\cdot 1{,}1=1{,}21$، أي أكثر بـ 21٪.', 'Multiply the multipliers: $1{,}1\\cdot 1{,}1=1{,}21$, 21% more.')
        }
    },
    'simple-interest': {
        mistake: {
            wrong: say(
                'Kapitala 1000 €, tasa % 4, 4 hilabete: $\\frac{1000\\cdot 4\\cdot 4}{100}=160$ €.',
                '1000 € al 4 % durante 4 meses: $\\frac{1000\\cdot 4\\cdot 4}{100}=160$ €.',
                '1000 € بنسبة 4٪ مدة 4 أشهر: $\\frac{1000\\cdot 4\\cdot 4}{100}=160$ €.',
                '€1,000 at 4% for 4 months: €$\\frac{1000\\cdot 4\\cdot 4}{100}=160$.'
            ),
            right: say(
                'Horrela hilabeteak urte balira bezala hartzen dira, eta 12 aldiz gehiago ateratzen da. Hilabeteekin, zatitzailea 1200 da: $\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$ €.',
                'Así se toman los meses como si fueran años, y sale 12 veces más. Con meses se divide entre 1200: $\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$ €.',
                'هكذا تُحسب الأشهر كأنها سنوات، فيخرج 12 ضعفًا. بالأشهر نقسم على 1200: $\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$ €.',
                'That treats the months as years, and gives 12 times as much. With months, divide by 1,200: €$\\frac{1000\\cdot 4\\cdot 4}{1200}\\approx 13{,}33$.'
            )
        },
        check: {
            prompt: say('Zenbat interes ematen dute 3600 eurok, % 5 interesarekin, 2 hilabetez?', '¿Qué interés producen 3600 € al 5 % durante 2 meses?', 'ما الفائدة التي تنتجها 3600 € بسعر 5٪ مدة شهرين؟', 'What interest do €3,600 earn at 5% over 2 months?'),
            options: [say('$360$ €', '$360$ €', '$360$ €', '€$360$'), say('$30$ €', '$30$ €', '$30$ €', '€$30$'), say('$3$ €', '$3$ €', '$3$ €', '€$3$')],
            correctIndex: 1,
            explanation: say('Hilabetetan, 1200 zenbakiaz zatitzen da: $\\frac{3600\\cdot 5\\cdot 2}{1200}=30$ €.', 'En meses se divide entre 1200: $\\frac{3600\\cdot 5\\cdot 2}{1200}=30$ €.', 'بالأشهر نقسم على 1200: $\\frac{3600\\cdot 5\\cdot 2}{1200}=30$ €.', 'In months, divide by 1,200: $\\frac{3600\\cdot 5\\cdot 2}{1200}=30$ euros.')
        }
    },
    'compound-interest': {
        mistake: {
            wrong: say(
                'Kapitala 1000 €, tasa % 10, 3 urte, interes konposatuan: $1000+3\\cdot 100=1300$ €.',
                '1000 € al 10 % durante 3 años, a interés compuesto: $1000+3\\cdot 100=1300$ €.',
                '1000 € بنسبة 10٪ مدة 3 سنوات بفائدة مركّبة: $1000+3\\cdot 100=1300$ €.',
                '€1,000 at 10% for 3 years with compound interest: €$1000+3\\cdot 100=1300$.'
            ),
            right: say(
                'Hori interes bakuna da. Konposatuan, urtero indizeaz biderkatzen da: $1000\\cdot 1{,}1^{3}=1331$ €.',
                'Eso es interés simple. En compuesto, cada año se multiplica por el índice: $1000\\cdot 1{,}1^{3}=1331$ €.',
                'هذه فائدة بسيطة. في المركّبة نضرب كل سنة في المؤشر: $1000\\cdot 1{,}1^{3}=1331$ €.',
                'That is simple interest. With compound interest, you multiply by the multiplier each year: €$1000\\cdot 1{,}1^{3}=1331$.'
            )
        },
        check: {
            prompt: say('1000 € jartzen dira, % 2 interes konposatuarekin, 2 urtez. Zenbat diru dago amaieran?', 'Se colocan 1000 € al 2 % de interés compuesto durante 2 años. ¿Cuánto dinero hay al final?', 'تُودَع 1000 € بفائدة مركّبة 2٪ مدة سنتين. كم المال في النهاية؟', '€1,000 is invested at 2% compound interest for 2 years. How much money is there at the end?'),
            options: [say('$1040{,}40$ €', '$1040{,}40$ €', '$1040{,}40$ €', '€$1040{,}40$'), say('$1040$ €', '$1040$ €', '$1040$ €', '€$1040$'), say('$1004$ €', '$1004$ €', '$1004$ €', '€$1004$')],
            correctIndex: 0,
            explanation: say('Urtero indizeaz: $1000\\cdot 1{,}02^{2}=1040{,}40$ €. Interes bakunarekin 1040 € izango lirateke.', 'Cada año por el índice: $1000\\cdot 1{,}02^{2}=1040{,}40$ €. Con interés simple serían 1040 €.', 'كل سنة في المؤشر: $1000\\cdot 1{,}02^{2}=1040{,}40$ €. وبالفائدة البسيطة تكون 1040 €.', 'Each year times the multiplier: $1000\\cdot 1{,}02^{2}=1040{,}40$ euros. With simple interest it would be €1,040.')
        }
    },
    periods: {
        mistake: {
            wrong: say(
                'Hilekoa, tasa % 4,8: hilabete bakoitzean % 4,8, $24\\,000\\cdot 1{,}048^{60}$.',
                'Mensual al 4,8 %: cada mes un 4,8 %, $24\\,000\\cdot 1{,}048^{60}$.',
                'شهريًا بنسبة 4.8٪: كل شهر 4.8٪، $24\\,000\\cdot 1{,}048^{60}$.',
                'Monthly at 4.8%: 4.8% every month, $24\\,000\\cdot 1{,}048^{60}$.'
            ),
            right: say(
                '% 4,8 hori urtekoa da: hilero, % $4{,}8\\mathbin{:}12=0{,}4$, eta indizea $1{,}004$ da.',
                'El 4,8 % es anual: cada mes, $4{,}8\\mathbin{:}12=0{,}4$ %, y el índice es $1{,}004$.',
                'الـ4.8٪ سنوية: كل شهر $4{,}8\\mathbin{:}12=0{,}4$٪، والمؤشر $1{,}004$.',
                'The 4.8% is per year: each month, $4{,}8\\mathbin{:}12=0{,}4$%, so the multiplier is $1{,}004$.'
            )
        },
        check: {
            prompt: say('Banku batek urteko % 6 ematen du, interesak hilero gehituta. Zein indizez biderkatzen du hilabete bakoitzean?', 'Un banco da un 6 % anual con intereses mensuales. ¿Por qué índice multiplica cada mes?', 'يعطي مصرف 6٪ سنويًا مع فوائد شهرية. في أيّ مؤشر يضرب كل شهر؟', 'A bank pays 6% a year with interest added monthly. What multiplier does it use each month?'),
            options: [same('$1{,}06$'), same('$1{,}5$'), same('$1{,}005$')],
            correctIndex: 2,
            explanation: say('Hilero, $6\\div 12=0{,}5$, hau da, % 0,5: indizea $1{,}005$ da.', 'Cada mes, $6\\div 12=0{,}5$ %: el índice es $1{,}005$.', 'كل شهر $6\\div 12=0{,}5$٪: المؤشر $1{,}005$.', 'Each month, $6\\div 12=0{,}5$ percent: the multiplier is $1{,}005$.')
        }
    },
    mixtures: {
        mistake: {
            wrong: say(
                'Kafearen prezio ertaina $\\frac{12{,}40+7{,}40}{2}=9{,}90$ €/kg da.',
                'El precio medio del café es $\\frac{12{,}40+7{,}40}{2}=9{,}90$ €/kg.',
                'السعر المتوسط للقهوة $\\frac{12{,}40+7{,}40}{2}=9{,}90$ €/كغ.',
                'The average price of the coffee is €$\\frac{12{,}40+7{,}40}{2}=9{,}90$/kg.'
            ),
            right: say(
                'Garestiaren kilo gehiago daude: kostu osoa zatitzen da kilo guztien artean, $208\\mathbin{:}20=10{,}40$ €/kg.',
                'Hay más kilos del caro: se divide el coste total entre todos los kilos, $208\\mathbin{:}20=10{,}40$ €/kg.',
                'الكيلوغرامات من الغالي أكثر: نقسم الكلفة الكلية على كل الكيلوغرامات، $208\\mathbin{:}20=10{,}40$ €/كغ.',
                'There are more kilos of the dearer one: divide the total cost by all the kilos, €$208\\mathbin{:}20=10{,}40$/kg.'
            )
        },
        check: {
            prompt: say('Kiloko 10 euroko 3 kg kafe eta kiloko 6 euroko kilo bat nahasten dira. Zenbat balio du nahasketaren kiloak?', 'Se mezclan 3 kg de café a 10 €/kg con 1 kg a 6 €/kg. ¿A cuánto sale el kilo de la mezcla?', 'نخلط 3 كغ من القهوة بسعر 10 €/كغ مع 1 كغ بسعر 6 €/كغ. كم ثمن كيلوغرام الخليط؟', '3 kg of coffee at €10/kg are mixed with 1 kg at €6/kg. How much is a kilo of the mixture?'),
            options: [say('$8$ €/kg', '$8$ €/kg', '$8$ €/كغ', '€$8$/kg'), say('$9$ €/kg', '$9$ €/kg', '$9$ €/كغ', '€$9$/kg'), say('$4$ €/kg', '$4$ €/kg', '$4$ €/كغ', '€$4$/kg')],
            correctIndex: 1,
            explanation: say('Kostu osoa zati kilo guztiak: $\\frac{3\\cdot 10+1\\cdot 6}{4}=9$ €/kg. Ez da prezioen batez bestekoa.', 'Coste total entre todos los kilos: $\\frac{3\\cdot 10+1\\cdot 6}{4}=9$ €/kg. No es la media de los precios.', 'الكلفة الكلية على كل الكيلوغرامات: $\\frac{3\\cdot 10+1\\cdot 6}{4}=9$ €/كغ. ليس متوسط السعرين.', 'Total cost divided by all the kilos: $\\frac{3\\cdot 10+1\\cdot 6}{4}=9$ euros per kilo. It is not the average of the prices.')
        }
    },
    motion: {
        mistake: {
            wrong: say(
                'Elkarrengana, kamioia 70 km/h-ra eta autoa 110 km/h-ra: $240\\mathbin{:}(110-70)=6$ h.',
                'Al encuentro, el camión a 70 km/h y el coche a 110 km/h: $240\\mathbin{:}(110-70)=6$ h.',
                'في التلاقي، الشاحنة بسرعة 70 كم/س والسيارة بسرعة 110 كم/س: $240\\mathbin{:}(110-70)=6$ س.',
                'Towards each other, the lorry at 70 km/h and the car at 110 km/h: $240\\mathbin{:}(110-70)=6$ h.'
            ),
            right: say(
                'Elkarrengana badoaz, $70+110=180$ km/h-ra hurbiltzen dira: $240\\mathbin{:}180=\\frac{4}{3}$ h.',
                'Si van uno hacia el otro, se acercan a $70+110=180$ km/h: $240\\mathbin{:}180=\\frac{4}{3}$ h.',
                'إذا اتجه كل منهما نحو الآخر يقتربان بسرعة $70+110=180$ كم/س: $240\\mathbin{:}180=\\frac{4}{3}$ س.',
                'If they head towards each other, they close in at $70+110=180$ km/h: $240\\mathbin{:}180=\\frac{4}{3}$ h.'
            )
        },
        check: {
            prompt: say('100 km/h-ko auto batek 70 km/h-ko moto bati jarraitzen dio, 30 km aurrerago doana. Zenbat behar du harrapatzeko?', 'Un coche a 100 km/h persigue a una moto a 70 km/h que va 30 km por delante. ¿Cuánto tarda en alcanzarla?', 'سيارة بسرعة 100 كم/س تطارد دراجة نارية بسرعة 70 كم/س تسبقها بـ 30 كم. كم تحتاج لتلحق بها؟', 'A car at 100 km/h is chasing a motorbike at 70 km/h that is 30 km ahead. How long does it take to catch it?'),
            options: [say('$1$ h', '$1$ h', '$1$ س', '$1$ h'), say('$\\frac{3}{17}$ h', '$\\frac{3}{17}$ h', '$\\frac{3}{17}$ س', '$\\frac{3}{17}$ h'), say('$3$ h', '$3$ h', '$3$ س', '$3$ h')],
            correctIndex: 0,
            explanation: say('Norabide berean: $100-70=30$ km/h-ra hurbiltzen da, eta $30\\div 30=1$ h.', 'Mismo sentido: se acerca a $100-70=30$ km/h, y $30\\div 30=1$ h.', 'في الاتجاه نفسه: تقترب بسرعة $100-70=30$ كم/س، و$30\\div 30=1$ س.', 'Same direction: it closes in at $100-70=30$ km/h, and $30\\div 30=1$ h.')
        }
    },
    taps: {
        mistake: {
            wrong: say(
                'A: 5 h; B: 7 h. Biek batera $5+7=12$ h behar dituzte.',
                'A en 5 h y B en 7 h: los dos juntos tardan $5+7=12$ h.',
                'A في 5 س وB في 7 س: معًا يحتاجان $5+7=12$ س.',
                'A in 5 h and B in 7 h: together they take $5+7=12$ h.'
            ),
            right: say(
                'Batera, bakoitzak bakarrik baino gutxiago behar dute. Ordu bateko zatiak batzen dira: $\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$, eta denbora $\\frac{35}{12}$ h da.',
                'Juntos tardan menos que cada uno solo. Se suman las partes de una hora: $\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$, y el tiempo es $\\frac{35}{12}$ h.',
                'معًا يحتاجان أقل من كل واحد وحده. نجمع أجزاء الساعة: $\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$، والزمن $\\frac{35}{12}$ س.',
                'Together they take less time than either on its own. Add the parts of an hour: $\\frac{1}{5}+\\frac{1}{7}=\\frac{12}{35}$, so the time is $\\frac{35}{12}$ h.'
            )
        },
        check: {
            prompt: say('Txorrota batek biltegi bat 4 ordutan betetzen du, eta beste batek 12 ordutan. Zenbat behar dute biek batera?', 'Un grifo llena un depósito en 4 h y otro en 12 h. ¿Cuánto tardan los dos juntos?', 'يملأ صنبور خزانًا في 4 س وآخر في 12 س. كم يحتاجان معًا؟', 'One tap fills a tank in 4 h and another in 12 h. How long do the two take together?'),
            options: [say('$16$ h', '$16$ h', '$16$ س', '$16$ h'), say('$8$ h', '$8$ h', '$8$ س', '$8$ h'), say('$3$ h', '$3$ h', '$3$ س', '$3$ h')],
            correctIndex: 2,
            explanation: say('Ordu batean, $\\frac{1}{4}+\\frac{1}{12}=\\frac{4}{12}=\\frac{1}{3}$: 3 h behar dituzte.', 'En una hora, $\\frac{1}{4}+\\frac{1}{12}=\\frac{4}{12}=\\frac{1}{3}$: tardan 3 h.', 'في ساعة واحدة $\\frac{1}{4}+\\frac{1}{12}=\\frac{4}{12}=\\frac{1}{3}$: يحتاجان 3 س.', 'In one hour, $\\frac{1}{4}+\\frac{1}{12}=\\frac{4}{12}=\\frac{1}{3}$: they take 3 h.')
        }
    }
}

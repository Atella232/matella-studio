import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Proportzionaltasuna eta ehunekoak · 2. DBH — diagnostic, guided practice,
   exercise bank and challenges. Exercises follow Anaya 2.º ESO unit 5 (the
   bricklayers, the farmer's fodder, the excavator, the sprinklers, the flat
   at the coast, the TV prize, the sheep, Alberto's coat, the soft drinks,
   Marta's pay rise, bank interest) and Santillana unit 8. Every closed
   answer is a single number; percentages are answered with the number
   before %.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const [whole, decimals = ''] = text.split(',')
    return fraction(Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

export const proportionDbh2Diagnostic: DiagnosticQuestion[] = [
    {
        id: 1401,
        prompt: say('Aurkitu $x$: $\\frac{4}{x}=\\frac{10}{25}$.', 'Halla $x$: $\\frac{4}{x}=\\frac{10}{25}$.', 'أوجد $x$: $\\frac{4}{x}=\\frac{10}{25}$.', 'Find $x$: $\\frac{4}{x}=\\frac{10}{25}$.'),
        options: [same('$10$'), same('$16$'), same('$62{,}5$')],
        correctIndex: 0,
        explanation: same('$4\\cdot 25=10\\cdot x=100\\ \\to\\ x=10$'),
        topic: 'proportion-review'
    },
    {
        id: 1402,
        prompt: say('2 langilek 3 egunetan 12 m egiten dituzte. Zenbat metro egingo dituzte 4 langilek 3 egunetan?', '2 obreros hacen 12 m en 3 días. ¿Cuántos metros harán 4 obreros en 3 días?', 'يُنجز عاملان 12 م في 3 أيام. كم مترًا يُنجز 4 عمال في 3 أيام؟', '2 workers make 12 m in 3 days. How many metres will 4 workers make in 3 days?'),
        options: [same('$48$'), same('$24$'), same('$6$')],
        correctIndex: 1,
        explanation: say('Langile bikoitza, egun berak: metro bikoitza. $12\\cdot\\frac{4}{2}\\cdot\\frac{3}{3}=24$.', 'El doble de obreros, los mismos días: el doble de metros. $12\\cdot\\frac{4}{2}\\cdot\\frac{3}{3}=24$.', 'ضعف العمال بالأيام نفسها: ضعف الأمتار. $12\\cdot\\frac{4}{2}\\cdot\\frac{3}{3}=24$.', 'Double the workers, same days: double the metres. $12\\cdot\\frac{4}{2}\\cdot\\frac{3}{3}=24$.'),
        topic: 'compound-direct'
    },
    {
        id: 1403,
        prompt: say('4 langilek, egunean 6 ordu, 10 egun behar dituzte. Zenbat egun 6 langilek, egunean 5 ordu?', '4 obreros, 6 horas al día, tardan 10 días. ¿Cuántos días tardan 6 obreros, 5 horas al día?', '4 عمال يعملون 6 ساعات يوميًا يحتاجون 10 أيام. كم يومًا يحتاج 6 عمال يعملون 5 ساعات يوميًا؟', '4 workers, 6 hours a day, take 10 days. How many days do 6 workers, 5 hours a day, take?'),
        options: [same('$12$'), same('$15$'), same('$8$')],
        correctIndex: 2,
        explanation: say('Langile gehiago → egun gutxiago, eta ordu gutxiago → egun gehiago: biak alderantzizkoak. $10\\cdot\\frac{4}{6}\\cdot\\frac{6}{5}=8$.', 'Más obreros → menos días, y menos horas → más días: las dos inversas. $10\\cdot\\frac{4}{6}\\cdot\\frac{6}{5}=8$.', 'عمال أكثر ← أيام أقل، وساعات أقل ← أيام أكثر: كلاهما عكسي. $10\\cdot\\frac{4}{6}\\cdot\\frac{6}{5}=8$.', 'More workers → fewer days, and fewer hours → more days: both are inverse. $10\\cdot\\frac{4}{6}\\cdot\\frac{6}{5}=8$.'),
        topic: 'compound-mixed'
    },
    {
        id: 1404,
        prompt: say('Banatu 60 zuzenki proportzionalki 1, 2 eta 3rekiko. Zenbat dagokio 3ri?', 'Reparte 60 de forma directamente proporcional a 1, 2 y 3. ¿Cuánto le toca al 3?', 'وزّع 60 طرديًا على 1 و2 و3. كم نصيب 3؟', 'Share 60 in direct proportion to 1, 2 and 3. How much does 3 get?'),
        options: [same('$20$'), same('$30$'), same('$10$')],
        correctIndex: 1,
        explanation: same('$60\\mathbin{:}(1+2+3)=10\\ \\to\\ 3\\cdot 10=30$'),
        topic: 'direct-share'
    },
    {
        id: 1405,
        prompt: say('Banatu 90 alderantziz proportzionalki 1 eta 2rekiko. Zenbat dagokio 1i?', 'Reparte 90 de forma inversamente proporcional a 1 y 2. ¿Cuánto le toca al 1?', 'وزّع 90 عكسيًا على 1 و2. كم نصيب 1؟', 'Share 90 in inverse proportion to 1 and 2. How much does 1 get?'),
        options: [same('$60$'), same('$30$'), same('$45$')],
        correctIndex: 0,
        explanation: say('Alderantzizkoak $\\frac{2}{2}$ eta $\\frac{1}{2}$: 2 eta 1ekiko. $90\\mathbin{:}3=30$, beraz $2\\cdot 30=60$.', 'Inversos $\\frac{2}{2}$ y $\\frac{1}{2}$: proporcional a 2 y 1. $90\\mathbin{:}3=30$, así que $2\\cdot 30=60$.', 'المقلوبان $\\frac{2}{2}$ و$\\frac{1}{2}$: متناسب مع 2 و1. $90\\mathbin{:}3=30$، إذن $2\\cdot 30=60$.', 'Reciprocals $\\frac{2}{2}$ and $\\frac{1}{2}$: proportional to 2 and 1. $90\\mathbin{:}3=30$, so $2\\cdot 30=60$.'),
        topic: 'inverse-share'
    },
    {
        id: 1406,
        prompt: say('$x$-ren % 20 8 da. Zenbat da $x$?', 'El 20 % de $x$ es 8. ¿Cuánto vale $x$?', '20٪ من $x$ تساوي 8. كم قيمة $x$؟', '20% of $x$ is 8. What is $x$?'),
        options: [same('$1{,}6$'), same('$160$'), same('$40$')],
        correctIndex: 2,
        explanation: same('$x\\cdot 0{,}2=8\\ \\to\\ x=8\\mathbin{:}0{,}2=40$'),
        topic: 'percent-total'
    },
    {
        id: 1407,
        prompt: say('Prezio bat % 25 igotzen da. Zer zenbakiz biderkatzen da?', 'Un precio sube un 25 %. ¿Por qué número se multiplica?', 'يرتفع سعر بنسبة 25٪. في أي عدد يُضرب؟', 'A price goes up by 25%. What number do you multiply it by?'),
        options: [same('$0{,}25$'), same('$1{,}25$'), same('$25$')],
        correctIndex: 1,
        explanation: say('Igo ondoren % 125 da: $1{,}25$.', 'Después de subir es el 125 %: $1{,}25$.', 'بعد الزيادة يصبح 125٪: $1{,}25$.', 'After the rise it is 125%: $1{,}25$.'),
        topic: 'index'
    },
    {
        id: 1408,
        prompt: say('Prezio bat % 10 igo eta gero % 10 jaisten da. Amaierako prezioa…', 'Un precio sube un 10 % y luego baja un 10 %. El precio final es…', 'يرتفع سعر 10٪ ثم ينخفض 10٪. السعر النهائي…', 'A price goes up by 10% and then down by 10%. The final price is…'),
        options: [say('hasierakoa bera', 'el mismo que el inicial', 'مثل الأصلي', 'the same as the original price'), say('% 1 handiagoa', 'un 1 % mayor', 'أكبر بـ1٪', '1% higher'), say('% 1 txikiagoa', 'un 1 % menor', 'أصغر بـ1٪', '1% lower')],
        correctIndex: 2,
        explanation: say('Indizeak biderkatu: $1{,}1\\cdot 0{,}9=0{,}99$, % 99: % 1 txikiagoa.', 'Se multiplican los índices: $1{,}1\\cdot 0{,}9=0{,}99$, el 99 %: un 1 % menor.', 'نضرب المؤشرين: $1{,}1\\cdot 0{,}9=0{,}99$، أي 99٪: أصغر بـ1٪.', 'Multiply the two multipliers: $1{,}1\\cdot 0{,}9=0{,}99$, which is 99%: 1% lower.'),
        topic: 'chained'
    }
]

export const proportionDbh2Practice: PracticeItem[] = [
    /* ---------- Review ---------- */
    {
        id: 1, stage: 'proportions',
        prompt: say('Aurkitu $x$: $\\frac{6}{x}=\\frac{15}{40}$.', 'Halla $x$: $\\frac{6}{x}=\\frac{15}{40}$.', 'أوجد $x$: $\\frac{6}{x}=\\frac{15}{40}$.', 'Find $x$: $\\frac{6}{x}=\\frac{15}{40}$.'),
        expected: n(16),
        hint: say('Gurutzeko biderkadurak: $6\\cdot 40=15\\cdot x$.', 'Productos cruzados: $6\\cdot 40=15\\cdot x$.', 'الضرب التبادلي: $6\\cdot 40=15\\cdot x$.', 'Cross products: $6\\cdot 40=15\\cdot x$.'),
        explanation: same('$6\\cdot 40=15\\cdot x=240\\ \\to\\ x=240\\mathbin{:}15=16$')
    },
    {
        id: 2, stage: 'proportions',
        prompt: say('5 kg patatak $4{,}50$ € balio dute. Zenbat balio dute 12 kg-k?', '5 kg de patatas cuestan $4{,}50$ €. ¿Cuánto cuestan 12 kg?', 'ثمن 5 كغ من البطاطا $4{,}50$ €. كم ثمن 12 كغ؟', '5 kg of potatoes cost €$4{,}50$. How much do 12 kg cost?'),
        expected: v('10,8'),
        hint: say('Kilo batek: $4{,}50\\mathbin{:}5$.', 'Un kilo: $4{,}50\\mathbin{:}5$.', 'الكيلو الواحد: $4{,}50\\mathbin{:}5$.', 'One kilo: $4{,}50\\mathbin{:}5$.'),
        explanation: same('$4{,}50\\mathbin{:}5=0{,}9\\ \\to\\ 0{,}9\\cdot 12=10{,}8$')
    },
    {
        id: 3, stage: 'proportions',
        prompt: say('8 txorrotak biltegi bat 6 orduan betetzen dute. Zenbat ordu beharko dituzte 12 txorrotak?', '8 grifos llenan un depósito en 6 horas. ¿Cuántas horas tardarán 12 grifos?', '8 صنابير تملأ خزانًا في 6 ساعات. كم ساعة تحتاج 12 صنبورًا؟', '8 taps fill a tank in 6 hours. How many hours will 12 taps take?'),
        expected: n(4),
        hint: say('Alderantzizkoa: biderkadura konstantea.', 'Inversa: el producto es constante.', 'عكسي: حاصل الضرب ثابت.', 'Inverse: the product is constant.'),
        explanation: same('$8\\cdot 6=48\\ \\to\\ 48\\mathbin{:}12=4$')
    },
    {
        id: 4, stage: 'proportions',
        prompt: say('90 km/h-ra bidaia batek 4 ordu irauten du. Zenbat ordu 120 km/h-ra?', 'A 90 km/h un viaje dura 4 horas. ¿Cuántas horas a 120 km/h?', 'رحلة تستغرق 4 ساعات بسرعة 90 كم/س. كم ساعة بسرعة 120 كم/س؟', 'At 90 km/h a journey takes 4 hours. How many hours at 120 km/h?'),
        expected: n(3),
        hint: say('Ibilbidea: $90\\cdot 4$.', 'El trayecto: $90\\cdot 4$.', 'المسار: $90\\cdot 4$.', 'The journey: $90\\cdot 4$.'),
        explanation: same('$90\\cdot 4=360\\ \\to\\ 360\\mathbin{:}120=3$')
    },

    /* ---------- Compound ---------- */
    {
        id: 5, stage: 'compound',
        prompt: say('3 inprimagailuk 4 orduan 1200 orri inprimatzen dituzte. Zenbat orri 5 inprimagailuk 6 orduan?', '3 impresoras imprimen 1200 hojas en 4 horas. ¿Cuántas hojas imprimen 5 impresoras en 6 horas?', '3 طابعات تطبع 1200 ورقة في 4 ساعات. كم ورقة تطبع 5 طابعات في 6 ساعات؟', '3 printers print 1,200 sheets in 4 hours. How many sheets do 5 printers print in 6 hours?'),
        expected: n(3000),
        hint: say('Biak zuzenak: $\\frac{5}{3}$ eta $\\frac{6}{4}$.', 'Las dos directas: $\\frac{5}{3}$ y $\\frac{6}{4}$.', 'كلاهما طردي: $\\frac{5}{3}$ و$\\frac{6}{4}$.', 'Both are direct: $\\frac{5}{3}$ and $\\frac{6}{4}$.'),
        explanation: same('$1200\\cdot\\frac{5}{3}\\cdot\\frac{6}{4}=3000$')
    },
    {
        id: 6, stage: 'compound',
        prompt: say('10 langilek, egunean 8 ordu, 15 egunetan bukatzen dute lan bat. Zenbat egun beharko dituzte 12 langilek, egunean 10 ordu?', '10 obreros, 8 horas al día, terminan una obra en 15 días. ¿Cuántos días tardarán 12 obreros, 10 horas al día?', '10 عمال يعملون 8 ساعات يوميًا ينهون عملًا في 15 يومًا. كم يومًا يحتاج 12 عاملًا يعملون 10 ساعات يوميًا؟', '10 workers, 8 hours a day, finish a job in 15 days. How many days will 12 workers, 10 hours a day, take?'),
        expected: n(10),
        hint: say('Biak alderantzizkoak: $\\frac{10}{12}$ eta $\\frac{8}{10}$.', 'Las dos inversas: $\\frac{10}{12}$ y $\\frac{8}{10}$.', 'كلاهما عكسي: $\\frac{10}{12}$ و$\\frac{8}{10}$.', 'Both are inverse: $\\frac{10}{12}$ and $\\frac{8}{10}$.'),
        explanation: same('$15\\cdot\\frac{10}{12}\\cdot\\frac{8}{10}=10$')
    },
    {
        id: 7, stage: 'compound',
        prompt: say('5 behik 300 kg pentsu jaten dituzte 6 egunetan. 400 kg-rekin, zenbat egun elika daitezke 8 behi?', '5 vacas comen 300 kg de pienso en 6 días. Con 400 kg, ¿cuántos días se pueden alimentar 8 vacas?', '5 أبقار تأكل 300 كغ من العلف في 6 أيام. بـ400 كغ، كم يومًا يمكن إطعام 8 أبقار؟', '5 cows eat 300 kg of feed in 6 days. With 400 kg, for how many days can you feed 8 cows?'),
        expected: n(5),
        hint: say('Pentsua zuzena, behiak alderantzizkoak.', 'El pienso, directa; las vacas, inversa.', 'العلف طردي والأبقار عكسي.', 'The feed: direct; the cows: inverse.'),
        explanation: same('$6\\cdot\\frac{400}{300}\\cdot\\frac{5}{8}=5$')
    },
    {
        id: 8, stage: 'compound',
        prompt: say('4 lagunek 7 egunetan 280 € gastatzen dituzte. Zenbat gastatuko dute 6 lagunek 5 egunetan?', '4 amigos gastan 280 € en 7 días. ¿Cuánto gastarán 6 amigos en 5 días?', '4 أصدقاء ينفقون 280 € في 7 أيام. كم ينفق 6 أصدقاء في 5 أيام؟', '4 friends spend €280 in 7 days. How much will 6 friends spend in 5 days?'),
        expected: n(300),
        hint: say('Lagun batek, egun batean.', 'Un amigo, en un día.', 'صديق واحد في يوم.', 'One friend, in one day.'),
        explanation: same('$280\\mathbin{:}4\\mathbin{:}7=10\\ \\to\\ 10\\cdot 6\\cdot 5=300$')
    },

    /* ---------- Shares ---------- */
    {
        id: 9, stage: 'shares',
        prompt: say('Banatu 360 zuzenki proportzionalki 3, 4 eta 5ekiko. Zenbat dagokio 5i?', 'Reparte 360 de forma directamente proporcional a 3, 4 y 5. ¿Cuánto le toca al 5?', 'وزّع 360 طرديًا على 3 و4 و5. كم نصيب 5؟', 'Share 360 in direct proportion to 3, 4 and 5. How much does 5 get?'),
        expected: n(150),
        hint: say('$360\\mathbin{:}(3+4+5)$.', '$360\\mathbin{:}(3+4+5)$.', '$360\\mathbin{:}(3+4+5)$.', '$360\\mathbin{:}(3+4+5)$.'),
        explanation: same('$360\\mathbin{:}12=30\\ \\to\\ 5\\cdot 30=150$')
    },
    {
        id: 10, stage: 'shares',
        prompt: say('Hiru bazkidek 2000 €, 3000 € eta 5000 € jarri zituzten, eta 1500 € irabazi dituzte. Zenbat dagokio 3000 € jarri zituenari?', 'Tres socios pusieron 2000 €, 3000 € y 5000 € y han ganado 1500 €. ¿Cuánto le toca al que puso 3000 €?', 'وضع ثلاثة شركاء 2000 € و3000 € و5000 € وربحوا 1500 €. كم نصيب من وضع 3000 €؟', 'Three partners put in €2,000, €3,000 and €5,000 and have made €1,500. How much does the partner who put in €3,000 get?'),
        expected: n(450),
        hint: say('2, 3 eta 5ekiko banaketa.', 'Reparto proporcional a 2, 3 y 5.', 'توزيع متناسب مع 2 و3 و5.', 'Share in proportion to 2, 3 and 5.'),
        explanation: same('$1500\\mathbin{:}(2+3+5)=150\\ \\to\\ 3\\cdot 150=450$')
    },
    {
        id: 11, stage: 'shares',
        prompt: say('Banatu 180 zuzenki proportzionalki $\\frac{1}{2}$ eta $\\frac{1}{4}$-rekiko. Zenbat dagokio $\\frac{1}{2}$-ri?', 'Reparte 180 de forma directamente proporcional a $\\frac{1}{2}$ y $\\frac{1}{4}$. ¿Cuánto le toca a $\\frac{1}{2}$?', 'وزّع 180 طرديًا على $\\frac{1}{2}$ و$\\frac{1}{4}$. كم نصيب $\\frac{1}{2}$؟', 'Share 180 in direct proportion to $\\frac{1}{2}$ and $\\frac{1}{4}$. How much does $\\frac{1}{2}$ get?'),
        expected: n(120),
        hint: say('$\\frac{2}{4}$ eta $\\frac{1}{4}$: 2 eta 1ekiko.', '$\\frac{2}{4}$ y $\\frac{1}{4}$: proporcional a 2 y 1.', '$\\frac{2}{4}$ و$\\frac{1}{4}$: متناسب مع 2 و1.', '$\\frac{2}{4}$ and $\\frac{1}{4}$: proportional to 2 and 1.'),
        explanation: same('$180\\mathbin{:}(2+1)=60\\ \\to\\ 2\\cdot 60=120$')
    },
    {
        id: 12, stage: 'shares',
        prompt: say('Banatu 420 alderantziz proportzionalki 2 eta 5ekiko. Zenbat dagokio 2ri?', 'Reparte 420 de forma inversamente proporcional a 2 y 5. ¿Cuánto le toca al 2?', 'وزّع 420 عكسيًا على 2 و5. كم نصيب 2؟', 'Share 420 in inverse proportion to 2 and 5. How much does 2 get?'),
        expected: n(300),
        hint: say('Alderantzizkoak: $\\frac{5}{10}$ eta $\\frac{2}{10}$, 5 eta 2rekiko.', 'Inversos: $\\frac{5}{10}$ y $\\frac{2}{10}$, proporcional a 5 y 2.', 'المقلوبان: $\\frac{5}{10}$ و$\\frac{2}{10}$، متناسب مع 5 و2.', 'Reciprocals: $\\frac{5}{10}$ and $\\frac{2}{10}$, proportional to 5 and 2.'),
        explanation: same('$420\\mathbin{:}(5+2)=60\\ \\to\\ 5\\cdot 60=300$')
    },

    /* ---------- Percentages ---------- */
    {
        id: 13, stage: 'percent',
        prompt: say('Kalkulatu 240ren % 35.', 'Calcula el 35 % de 240.', 'احسب 35٪ من 240.', 'Calculate 35% of 240.'),
        expected: n(84),
        hint: say('% 35 = $0{,}35$.', '35 % = $0{,}35$.', '35٪ = $0{,}35$.', '35% = $0{,}35$.'),
        explanation: same('$240\\cdot 0{,}35=84$')
    },
    {
        id: 14, stage: 'percent',
        prompt: say('Kalkulatu 45en % 120.', 'Calcula el 120 % de 45.', 'احسب 120٪ من 45.', 'Calculate 120% of 45.'),
        expected: n(54),
        hint: say('% 120 = $1{,}2$: kantitatea baino gehiago.', '120 % = $1{,}2$: más que la cantidad.', '120٪ = $1{,}2$: أكثر من الكمية.', '120% = $1{,}2$: more than the original amount.'),
        explanation: same('$45\\cdot 1{,}2=54$')
    },
    {
        id: 15, stage: 'percent',
        prompt: say('$x$-ren % 30 255 da. Zenbat da $x$?', 'El 30 % de $x$ es 255. ¿Cuánto vale $x$?', '30٪ من $x$ تساوي 255. كم قيمة $x$؟', '30% of $x$ is 255. What is $x$?'),
        expected: n(850),
        hint: say('$x\\cdot 0{,}3=255$.', '$x\\cdot 0{,}3=255$.', '$x\\cdot 0{,}3=255$.', '$x\\cdot 0{,}3=255$.'),
        explanation: same('$x=255\\mathbin{:}0{,}3=850$')
    },
    {
        id: 16, stage: 'percent',
        prompt: say('Enpresa batek 24 eskaera jaso ditu eta 3 baztertu ditu. Zer ehuneko baztertu du?', 'Una empresa ha recibido 24 solicitudes y ha rechazado 3. ¿Qué porcentaje ha rechazado?', 'تلقّت شركة 24 طلبًا ورفضت 3. ما النسبة المرفوضة؟', 'A company has received 24 applications and has rejected 3. What percentage has it rejected?'),
        expected: v('12,5'),
        hint: say('Zatia : osoa · 100.', 'Parte : total · 100.', 'الجزء : الكل · 100.', 'Part : total · 100.'),
        explanation: same('$3\\mathbin{:}24\\cdot 100=12{,}5$')
    },

    /* ---------- Changes and interest ---------- */
    {
        id: 17, stage: 'changes',
        prompt: say('Salmentak % 12 igo dira, eta hilabete honetan 2800 bote saldu dira. Zenbat saldu ziren aurreko hilabetean?', 'Las ventas han subido un 12 % y este mes se han vendido 2800 botes. ¿Cuántos se vendieron el mes pasado?', 'ارتفعت المبيعات 12٪ وبيع هذا الشهر 2800 علبة. كم علبة بيعت الشهر الماضي؟', 'Sales have risen by 12%, and this month 2,800 jars have been sold. How many were sold last month?'),
        expected: n(2500),
        hint: say('Hasierakoa = amaierakoa : $1{,}12$.', 'Inicial = final : $1{,}12$.', 'الأصلية = النهائية : $1{,}12$.', 'Original = final : $1{,}12$.'),
        explanation: same('$2800\\mathbin{:}1{,}12=2500$')
    },
    {
        id: 18, stage: 'changes',
        prompt: say('% 15 merkatutako gona batek $36{,}55$ € balio du. Zenbat balio zuen?', 'Una falda rebajada un 15 % cuesta $36{,}55$ €. ¿Cuánto costaba?', 'تنورة مخفّضة 15٪ ثمنها $36{,}55$ €. كم كان ثمنها؟', 'A skirt, reduced by 15%, costs €$36{,}55$. How much did it cost before?'),
        expected: n(43),
        hint: say('% 85 ordaintzen da: zatitu $0{,}85$-ez.', 'Se paga el 85 %: divide entre $0{,}85$.', 'يُدفع 85٪: اقسم على $0{,}85$.', 'You pay 85%: divide by $0{,}85$.'),
        explanation: same('$36{,}55\\mathbin{:}0{,}85=43$')
    },
    {
        id: 19, stage: 'changes',
        prompt: say('200 €-ko jaka bat % 20 garestitu eta gero % 25 merkatu da. Zenbat balio du orain?', 'Una chaqueta de 200 € sube un 20 % y luego baja un 25 %. ¿Cuánto cuesta ahora?', 'سترة ثمنها 200 € ارتفعت 20٪ ثم انخفضت 25٪. كم ثمنها الآن؟', 'A jacket that costs €200 goes up by 20% and then down by 25%. How much does it cost now?'),
        expected: n(180),
        hint: say('Biderkatu indizeak: $1{,}2$ eta $0{,}75$.', 'Multiplica los índices: $1{,}2$ y $0{,}75$.', 'اضرب المؤشرين: $1{,}2$ و$0{,}75$.', 'Multiply the multipliers: $1{,}2$ and $0{,}75$.'),
        explanation: same('$200\\cdot 1{,}2\\cdot 0{,}75=180$')
    },
    {
        id: 20, stage: 'changes',
        prompt: say('Zer interes sortzen dute 3500 €-k % 4an 3 urtez?', '¿Qué interés producen 3500 € al 4 % durante 3 años?', 'ما الفائدة التي تُنتجها 3500 € بنسبة 4٪ مدة 3 سنوات؟', 'What interest do €3,500 earn at 4% over 3 years?'),
        expected: n(420),
        hint: say('$I=\\frac{C\\cdot r\\cdot t}{100}$.', '$I=\\frac{C\\cdot r\\cdot t}{100}$.', '$I=\\frac{C\\cdot r\\cdot t}{100}$.', '$I=\\frac{C\\cdot r\\cdot t}{100}$.'),
        explanation: same('$\\frac{3500\\cdot 4\\cdot 3}{100}=420$')
    }
]

export const proportionDbh2Challenges: ChallengeItem[] = [
    {
        id: 101, stage: 'proportions', points: 10, context: 'starter',
        prompt: say('Auto batek 6 l kontsumitzen ditu 100 km-ko. Zenbat litro 350 km-tan?', 'Un coche consume 6 l cada 100 km. ¿Cuántos litros gasta en 350 km?', 'تستهلك سيارة 6 ل لكل 100 كم. كم لترًا تستهلك في 350 كم؟', 'A car uses 6 L every 100 km. How many litres does it use in 350 km?'),
        expected: n(21),
        hint: say('Kilometro batean: $6\\mathbin{:}100$.', 'En un kilómetro: $6\\mathbin{:}100$.', 'في كيلومتر واحد: $6\\mathbin{:}100$.', 'In one kilometre: $6\\mathbin{:}100$.'),
        explanation: same('$6\\mathbin{:}100\\cdot 350=21$')
    },
    {
        id: 102, stage: 'proportions', points: 20, context: 'advanced',
        prompt: say('Tren batek 3 ordu behar ditu 80 km/h-ra. Zenbat ordu 96 km/h-ra?', 'Un tren tarda 3 horas a 80 km/h. ¿Cuántas horas tarda a 96 km/h?', 'يستغرق قطار 3 ساعات بسرعة 80 كم/س. كم ساعة يستغرق بسرعة 96 كم/س؟', 'A train takes 3 hours at 80 km/h. How many hours does it take at 96 km/h?'),
        expected: v('2,5'),
        hint: say('Ibilbidea: $80\\cdot 3$.', 'El trayecto: $80\\cdot 3$.', 'المسار: $80\\cdot 3$.', 'The journey: $80\\cdot 3$.'),
        explanation: same('$80\\cdot 3=240\\ \\to\\ 240\\mathbin{:}96=2{,}5$')
    },
    {
        id: 103, stage: 'compound', points: 20, context: 'advanced',
        prompt: say('3 aspertsorek, $1{,}5$ l/s bakoitzak, biltegi bat 8 orduan husten dute. Zenbat ordu 4 aspertsorek, $0{,}9$ l/s bakoitzak?', '3 aspersores de $1{,}5$ l/s cada uno vacían un depósito en 8 horas. ¿Cuántas horas tardan 4 aspersores de $0{,}9$ l/s?', '3 رشّاشات تدفق كل منها $1{,}5$ ل/ث تفرغ خزانًا في 8 ساعات. كم ساعة تحتاج 4 رشّاشات تدفق كل منها $0{,}9$ ل/ث؟', '3 pumps of $1{,}5$ L/s each empty a tank in 8 hours. How many hours will 4 pumps of $0{,}9$ L/s take?'),
        expected: n(10),
        hint: say('Biak alderantzizkoak: $\\frac{3}{4}$ eta $\\frac{1{,}5}{0{,}9}$.', 'Las dos inversas: $\\frac{3}{4}$ y $\\frac{1{,}5}{0{,}9}$.', 'كلاهما عكسي: $\\frac{3}{4}$ و$\\frac{1{,}5}{0{,}9}$.', 'Both are inverse: $\\frac{3}{4}$ and $\\frac{1{,}5}{0{,}9}$.'),
        explanation: same('$8\\cdot\\frac{3}{4}\\cdot\\frac{1{,}5}{0{,}9}=10$')
    },
    {
        id: 104, stage: 'compound', points: 30, context: 'advanced',
        prompt: say('15 langilek, egunean 8 ordu, 600 m-ko horma egiten dute 20 egunetan. Zenbat egun beharko dituzte 10 langilek, egunean 6 ordu, 300 m egiteko?', '15 obreros, 8 horas al día, levantan un muro de 600 m en 20 días. ¿Cuántos días tardarán 10 obreros, 6 horas al día, en levantar 300 m?', '15 عاملًا يعملون 8 ساعات يوميًا يبنون جدارًا طوله 600 م في 20 يومًا. كم يومًا يحتاج 10 عمال يعملون 6 ساعات يوميًا لبناء 300 م؟', '15 workers, 8 hours a day, build a 600 m wall in 20 days. How many days will 10 workers, 6 hours a day, take to build 300 m of wall?'),
        expected: n(20),
        hint: say('Metroak zuzena; langileak eta orduak alderantzizkoak.', 'Los metros, directa; los obreros y las horas, inversas.', 'الأمتار طردي؛ والعمال والساعات عكسي.', 'The metres: direct; the workers and the hours: inverse.'),
        explanation: same('$20\\cdot\\frac{300}{600}\\cdot\\frac{15}{10}\\cdot\\frac{8}{6}=20$')
    },
    {
        id: 105, stage: 'compound', points: 10, context: 'starter',
        prompt: say('2 txorrotak 3 biltegi betetzen dituzte 6 orduan. Zenbat biltegi beteko dituzte 4 txorrotak 9 orduan?', '2 grifos llenan 3 depósitos en 6 horas. ¿Cuántos depósitos llenarán 4 grifos en 9 horas?', 'صنبوران يملآن 3 خزانات في 6 ساعات. كم خزانًا تملأ 4 صنابير في 9 ساعات؟', '2 taps fill 3 tanks in 6 hours. How many tanks will 4 taps fill in 9 hours?'),
        expected: n(9),
        hint: say('Biak zuzenak.', 'Las dos directas.', 'كلاهما طردي.', 'Both are direct.'),
        explanation: same('$3\\cdot\\frac{4}{2}\\cdot\\frac{9}{6}=9$')
    },
    {
        id: 106, stage: 'shares', points: 10, context: 'starter',
        prompt: say('Banatu 240 zuzenki proportzionalki 3 eta 5ekiko. Zenbat dagokio 5i?', 'Reparte 240 de forma directamente proporcional a 3 y 5. ¿Cuánto le toca al 5?', 'وزّع 240 طرديًا على 3 و5. كم نصيب 5؟', 'Share 240 in direct proportion to 3 and 5. How much does 5 get?'),
        expected: n(150),
        hint: say('8 zati.', '8 partes.', '8 أجزاء.', '8 parts.'),
        explanation: same('$240\\mathbin{:}8=30\\ \\to\\ 5\\cdot 30=150$')
    },
    {
        id: 107, stage: 'shares', points: 20, context: 'advanced',
        prompt: say('Banatu 3500 alderantziz proportzionalki 1, 2 eta 4rekiko. Zenbat dagokio 4ri?', 'Reparte 3500 de forma inversamente proporcional a 1, 2 y 4. ¿Cuánto le toca al 4?', 'وزّع 3500 عكسيًا على 1 و2 و4. كم نصيب 4؟', 'Share 3,500 in inverse proportion to 1, 2 and 4. How much does 4 get?'),
        expected: n(500),
        hint: say('Alderantzizkoak: $\\frac{4}{4},\\frac{2}{4},\\frac{1}{4}$.', 'Inversos: $\\frac{4}{4},\\frac{2}{4},\\frac{1}{4}$.', 'المقلوبات: $\\frac{4}{4},\\frac{2}{4},\\frac{1}{4}$.', 'Reciprocals: $\\frac{4}{4},\\frac{2}{4},\\frac{1}{4}$.'),
        explanation: same('$3500\\mathbin{:}(4+2+1)=500\\ \\to\\ 1\\cdot 500=500$')
    },
    {
        id: 108, stage: 'shares', points: 30, context: 'advanced',
        prompt: say('120 € banatzen dira 2, 3 eta 6 urteko hiru anaien artean, adinarekiko alderantziz proportzionalki. Zenbat jasotzen du 6 urtekoak?', 'Se reparten 120 € entre tres hermanos de 2, 3 y 6 años de forma inversamente proporcional a la edad. ¿Cuánto recibe el de 6 años?', 'تُوزَّع 120 € على ثلاثة إخوة أعمارهم 2 و3 و6 سنوات عكسيًا مع العمر. كم يأخذ ابن الست سنوات؟', '€120 is shared among three siblings aged 2, 3 and 6, in inverse proportion to their age. How much does the 6-year-old get?'),
        expected: n(20),
        hint: say('Alderantzizkoak: $\\frac{3}{6},\\frac{2}{6},\\frac{1}{6}$.', 'Inversos: $\\frac{3}{6},\\frac{2}{6},\\frac{1}{6}$.', 'المقلوبات: $\\frac{3}{6},\\frac{2}{6},\\frac{1}{6}$.', 'Reciprocals: $\\frac{3}{6},\\frac{2}{6},\\frac{1}{6}$.'),
        explanation: same('$120\\mathbin{:}(3+2+1)=20\\ \\to\\ 1\\cdot 20=20$')
    },
    {
        id: 109, stage: 'percent', points: 10, context: 'starter',
        prompt: say('$x$-ren % 25 $42{,}5$ da. Zenbat da $x$?', 'El 25 % de $x$ es $42{,}5$. ¿Cuánto vale $x$?', '25٪ من $x$ تساوي $42{,}5$. كم قيمة $x$؟', '25% of $x$ is $42{,}5$. What is $x$?'),
        expected: n(170),
        hint: say('Zatitu $0{,}25$-ez.', 'Divide entre $0{,}25$.', 'اقسم على $0{,}25$.', 'Divide by $0{,}25$.'),
        explanation: same('$42{,}5\\mathbin{:}0{,}25=170$')
    },
    {
        id: 110, stage: 'percent', points: 20, context: 'advanced',
        prompt: say('Prezio bat 80 €-tik 92 €-ra igo da. Zer ehuneko igo da?', 'Un precio ha pasado de 80 € a 92 €. ¿Qué porcentaje ha subido?', 'ارتفع سعر من 80 € إلى 92 €. بأي نسبة ارتفع؟', 'A price has gone from €80 to €92. What percentage has it gone up?'),
        expected: n(15),
        hint: say('Amaierakoa : hasierakoa · 100.', 'Final : inicial · 100.', 'النهائية : الأصلية · 100.', 'Final : original · 100.'),
        explanation: same('$92\\mathbin{:}80\\cdot 100=115\\ \\to\\ 115-100=15$')
    },
    {
        id: 111, stage: 'changes', points: 20, context: 'advanced',
        prompt: say('Hiri batean Interneteko erabiltzaileak 21 000 dira, iaz baino % 20 gehiago. Zenbat ziren iaz?', 'En una ciudad hay 21 000 usuarios de Internet, un 20 % más que el año pasado. ¿Cuántos había el año pasado?', 'في مدينة 21000 مستخدم للإنترنت، بزيادة 20٪ عن العام الماضي. كم كانوا العام الماضي؟', 'A city has 21,000 internet users, 20% more than last year. How many were there last year?'),
        expected: n(17500),
        hint: say('Zatitu $1{,}2$-z.', 'Divide entre $1{,}2$.', 'اقسم على $1{,}2$.', 'Divide by $1{,}2$.'),
        explanation: same('$21\\,000\\mathbin{:}1{,}2=17\\,500$')
    },
    {
        id: 112, stage: 'changes', points: 30, context: 'advanced',
        prompt: say('Prezio bat % 20 igo eta gero % 20 jaisten da. Hasierako prezioaren zer ehuneko ordaintzen da?', 'Un precio sube un 20 % y luego baja un 20 %. ¿Qué porcentaje del precio inicial se paga?', 'يرتفع سعر 20٪ ثم ينخفض 20٪. ما النسبة المدفوعة من السعر الأصلي؟', 'A price goes up by 20% and then down by 20%. What percentage of the original price do you pay?'),
        expected: n(96),
        hint: say('Biderkatu indizeak.', 'Multiplica los índices.', 'اضرب المؤشرين.', 'Multiply the multipliers.'),
        explanation: same('$1{,}2\\cdot 0{,}8=0{,}96\\ \\to\\ 96$')
    },
    {
        id: 113, stage: 'changes', points: 20, context: 'advanced',
        prompt: say('Zer kapitalek sortzen ditu 600 € interes % 5ean 4 urtetan?', '¿Qué capital produce 600 € de interés al 5 % en 4 años?', 'أي رأس مال يُنتج فائدة 600 € بنسبة 5٪ في 4 سنوات؟', 'What principal earns €600 of interest at 5% over 4 years?'),
        expected: n(3000),
        hint: say('$600=\\frac{C\\cdot 5\\cdot 4}{100}$.', '$600=\\frac{C\\cdot 5\\cdot 4}{100}$.', '$600=\\frac{C\\cdot 5\\cdot 4}{100}$.', '$600=\\frac{C\\cdot 5\\cdot 4}{100}$.'),
        explanation: same('$\\frac{600\\cdot 100}{5\\cdot 4}=3000$')
    },
    {
        id: 114, stage: 'changes', points: 30, context: 'advanced',
        prompt: say('Prezio bat % 30 jaitsi eta gero % 30 igotzen da. Hasierakoaren zer ehuneko da amaierakoa?', 'Un precio baja un 30 % y luego sube un 30 %. ¿Qué porcentaje del inicial es el final?', 'ينخفض سعر 30٪ ثم يرتفع 30٪. ما نسبة النهائي من الأصلي؟', 'A price goes down by 30% and then up by 30%. What percentage of the original is the final price?'),
        expected: n(91),
        hint: say('$0{,}7$ eta $1{,}3$.', '$0{,}7$ y $1{,}3$.', '$0{,}7$ و$1{,}3$.', '$0{,}7$ and $1{,}3$.'),
        explanation: same('$0{,}7\\cdot 1{,}3=0{,}91\\ \\to\\ 91$')
    }
]

export const proportionDbh2ExerciseBank: ExerciseSection[] = [
    {
        id: 'proportions',
        title: say('Proportzioak (errepasoa)', 'Proporciones (repaso)', 'التناسبات (مراجعة)', 'Proportions (revision)'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Kalkulatu 5en eta 15en arteko arrazoia, zatiki sinplifikatu gisa.', 'Calcula la razón entre 5 y 15 como fracción simplificada.', 'احسب النسبة بين 5 و15 كسرًا مبسّطًا.', 'Calculate the ratio of 5 to 15 as a fraction in its simplest form.'), solution: same('$\\frac{5}{15}=\\frac{1}{3}$'), answer: { expected: fraction(1, 3) } },
            { id: 2, difficulty: 'easy', question: say('$\\frac{3}{6}$ eta $\\frac{4}{8}$ proportzio bat osatzen dute?', '¿Forman $\\frac{3}{6}$ y $\\frac{4}{8}$ una proporción?', 'هل يكوّن $\\frac{3}{6}$ و$\\frac{4}{8}$ تناسبًا؟', 'Do $\\frac{3}{6}$ and $\\frac{4}{8}$ form a proportion?'), solution: say('Bai: $3\\cdot 8=24$ eta $6\\cdot 4=24$.', 'Sí: $3\\cdot 8=24$ y $6\\cdot 4=24$.', 'نعم: $3\\cdot 8=24$ و$6\\cdot 4=24$.', 'Yes: $3\\cdot 8=24$ and $6\\cdot 4=24$.') },
            { id: 3, difficulty: 'easy', question: say('Aurkitu $x$: $\\frac{4}{10}=\\frac{6}{x}$.', 'Halla $x$: $\\frac{4}{10}=\\frac{6}{x}$.', 'أوجد $x$: $\\frac{4}{10}=\\frac{6}{x}$.', 'Find $x$: $\\frac{4}{10}=\\frac{6}{x}$.'), solution: same('$4\\cdot x=60\\ \\to\\ x=60\\mathbin{:}4=15$'), answer: { expected: n(15) } },
            { id: 4, difficulty: 'medium', question: say('Zuzena, alderantzizkoa ala bat ere ez? a) Langile kopurua eta lan bat egiteko denbora; b) kiloak eta prezioa; c) adina eta altuera.', '¿Directa, inversa o ninguna? a) Número de obreros y tiempo para hacer una obra; b) kilos y precio; c) edad y altura.', 'طردي أم عكسي أم لا شيء؟ أ) عدد العمال وزمن إنجاز عمل؛ ب) الكيلوغرامات والسعر؛ ج) العمر والطول.', 'Direct, inverse or neither? a) Number of workers and time to finish a job; b) kilograms and price; c) age and height.'), solution: say('a) Alderantzizkoa; b) zuzena; c) bat ere ez.', 'a) Inversa; b) directa; c) ninguna.', 'أ) عكسي؛ ب) طردي؛ ج) لا شيء.', 'a) Inverse; b) direct; c) neither.') },
            { id: 5, difficulty: 'medium', question: say('3 kg laranjak $2{,}40$ € balio dute. Zenbat balio dute 8 kg-k?', '3 kg de naranjas cuestan $2{,}40$ €. ¿Cuánto cuestan 8 kg?', 'ثمن 3 كغ من البرتقال $2{,}40$ €. كم ثمن 8 كغ؟', '3 kg of oranges cost €$2{,}40$. How much do 8 kg cost?'), solution: same('$2{,}40\\mathbin{:}3=0{,}8\\ \\to\\ 0{,}8\\cdot 8=6{,}4$'), answer: { expected: v('6,4') } },
            { id: 6, difficulty: 'medium', question: say('4 langilek 15 egunetan bukatzen dute lan bat. Zenbat egunetan 6 langilek?', '4 obreros terminan una obra en 15 días. ¿En cuántos días la terminan 6 obreros?', '4 عمال ينهون عملًا في 15 يومًا. في كم يومًا ينهيه 6 عمال؟', '4 workers finish a job in 15 days. In how many days will 6 workers finish it?'), solution: same('$4\\cdot 15=60\\ \\to\\ 60\\mathbin{:}6=10$'), answer: { expected: n(10) } },
            { id: 7, difficulty: 'medium', question: say('Txirrindulari batek $6{,}3$ km egin ditu 18 minututan. Zein da haren abiadura km/h-tan?', 'Un ciclista ha recorrido $6{,}3$ km en 18 minutos. ¿Cuál es su velocidad en km/h?', 'قطع دراج $6{,}3$ كم في 18 دقيقة. ما سرعته بالكيلومتر في الساعة؟', 'A cyclist has covered $6{,}3$ km in 18 minutes. What is their speed in km/h?'), solution: same('$6{,}3\\mathbin{:}18\\cdot 60=21$'), answer: { expected: n(21) } },
            { id: 8, difficulty: 'hard', question: say('Merkantzia-tren batek 7 ordu behar ditu 72 km/h-ra. Zer abiadurarekin egingo luke 6 ordutan?', 'Un tren de mercancías tarda 7 horas a 72 km/h. ¿A qué velocidad tardaría 6 horas?', 'يستغرق قطار بضائع 7 ساعات بسرعة 72 كم/س. بأي سرعة يستغرق 6 ساعات؟', 'A freight train takes 7 hours at 72 km/h. At what speed would it take 6 hours?'), solution: same('$72\\cdot 7=504\\ \\to\\ 504\\mathbin{:}6=84$'), answer: { expected: n(84) } },
            { id: 9, difficulty: 'hard', question: say('12 l/min-ko txorrota batek 25 minututan betetzen du biltegi bat. Zer emari behar da 20 minututan betetzeko?', 'Un grifo de 12 l/min llena un depósito en 25 minutos. ¿Qué caudal hace falta para llenarlo en 20 minutos?', 'صنبور تدفقه 12 ل/د يملأ خزانًا في 25 دقيقة. ما التدفق اللازم لملئه في 20 دقيقة؟', 'A tap that runs at 12 L/min fills a tank in 25 minutes. What flow rate is needed to fill it in 20 minutes?'), solution: same('$12\\cdot 25=300\\ \\to\\ 300\\mathbin{:}20=15$'), answer: { expected: n(15) } },
            { id: 10, difficulty: 'hard', question: say('Bi zenbakiren arrazoia $\\frac{3}{4}$ da eta haien batura 84. Zein da handiena?', 'La razón de dos números es $\\frac{3}{4}$ y su suma es 84. ¿Cuál es el mayor?', 'نسبة عددين $\\frac{3}{4}$ ومجموعهما 84. ما الأكبر؟', 'The ratio of two numbers is $\\frac{3}{4}$ and their sum is 84. What is the larger one?'), solution: same('$84\\mathbin{:}(3+4)=12\\ \\to\\ 4\\cdot 12=48$'), answer: { expected: n(48) } }
        ]
    },
    {
        id: 'compound',
        title: say('Proportzionaltasun konposatua', 'Proporcionalidad compuesta', 'التناسب المركّب', 'Compound proportion'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Horma bera egiteko, langile gehiago badaude, egun gehiago ala gutxiago behar dira? Eta horma luzeagoa bada?', 'Para hacer el mismo muro, si hay más obreros, ¿hacen falta más o menos días? ¿Y si el muro es más largo?', 'لبناء الجدار نفسه، إذا زاد العمال فهل نحتاج أيامًا أكثر أم أقل؟ وإذا كان الجدار أطول؟', 'To build the same wall: if there are more workers, are more or fewer days needed? And if the wall is longer?'), solution: say('Langile gehiago → egun gutxiago (alderantzizkoa). Horma luzeagoa → egun gehiago (zuzena).', 'Más obreros → menos días (inversa). Muro más largo → más días (directa).', 'عمال أكثر ← أيام أقل (عكسي). جدار أطول ← أيام أكثر (طردي).', 'More workers → fewer days (inverse). Longer wall → more days (direct).') },
            { id: 12, difficulty: 'easy', question: say('2 makinak 3 orduan 600 pieza egiten dituzte. Zenbat pieza 4 makinak 3 orduan?', '2 máquinas hacen 600 piezas en 3 horas. ¿Cuántas piezas hacen 4 máquinas en 3 horas?', 'آلتان تصنعان 600 قطعة في 3 ساعات. كم قطعة تصنع 4 آلات في 3 ساعات؟', '2 machines make 600 parts in 3 hours. How many parts do 4 machines make in 3 hours?'), solution: same('$600\\cdot\\frac{4}{2}\\cdot\\frac{3}{3}=1200$'), answer: { expected: n(1200) } },
            { id: 13, difficulty: 'medium', question: say('6 makinak 4 orduan 1200 pieza egiten dituzte. Zenbat pieza 9 makinak 5 orduan?', '6 máquinas hacen 1200 piezas en 4 horas. ¿Cuántas piezas hacen 9 máquinas en 5 horas?', '6 آلات تصنع 1200 قطعة في 4 ساعات. كم قطعة تصنع 9 آلات في 5 ساعات؟', '6 machines make 1,200 parts in 4 hours. How many parts do 9 machines make in 5 hours?'), solution: same('$1200\\cdot\\frac{9}{6}\\cdot\\frac{5}{4}=2250$'), answer: { expected: n(2250) } },
            { id: 14, difficulty: 'medium', question: say('9 langilek, egunean 6 ordu, 20 egunetan bukatzen dute lan bat. Zenbat egun 12 langilek, egunean 5 ordu?', '9 obreros, 6 horas al día, terminan una obra en 20 días. ¿Cuántos días tardan 12 obreros, 5 horas al día?', '9 عمال يعملون 6 ساعات يوميًا ينهون عملًا في 20 يومًا. كم يومًا يحتاج 12 عاملًا يعملون 5 ساعات يوميًا؟', '9 workers, 6 hours a day, finish a job in 20 days. How many days do 12 workers, 5 hours a day, take?'), solution: same('$20\\cdot\\frac{9}{12}\\cdot\\frac{6}{5}=18$'), answer: { expected: n(18) } },
            { id: 15, difficulty: 'medium', question: say('Nekazari batek 294 kg pentsu behar izan ditu 15 behi 7 egunez elikatzeko. 840 kg-rekin, zenbat egun elika ditzake 10 behi?', 'Un granjero ha necesitado 294 kg de pienso para 15 vacas durante 7 días. Con 840 kg, ¿cuántos días puede alimentar a 10 vacas?', 'احتاج مزارع 294 كغ من العلف لـ15 بقرة مدة 7 أيام. بـ840 كغ، كم يومًا يطعم 10 أبقار؟', 'A farmer needed 294 kg of feed for 15 cows for 7 days. With 840 kg, for how many days can he feed 10 cows?'), solution: same('$7\\cdot\\frac{840}{294}\\cdot\\frac{15}{10}=30$'), answer: { expected: n(30) } },
            { id: 16, difficulty: 'medium', question: say('Hondeamakina batek, egunean 10 ordu, 1000 m-ko zanga egiten du 8 egunetan. Zenbat egun 600 m-ko zanga, egunean 12 ordu?', 'Una excavadora, 10 horas al día, abre 1000 m de zanja en 8 días. ¿Cuántos días tarda en abrir 600 m trabajando 12 horas al día?', 'حفّارة تعمل 10 ساعات يوميًا تحفر 1000 م في 8 أيام. كم يومًا تحتاج لحفر 600 م إذا عملت 12 ساعة يوميًا؟', 'A digger, working 10 hours a day, digs 1,000 m of trench in 8 days. How many days will it take to dig 600 m, working 12 hours a day?'), solution: same('$8\\cdot\\frac{600}{1000}\\cdot\\frac{10}{12}=4$'), answer: { expected: n(4) } },
            { id: 17, difficulty: 'hard', question: say('4 lagunek 10 egunetan 600 l ur kontsumitzen dituzte. Zenbat litro 6 lagunek 15 egunetan?', '4 personas consumen 600 l de agua en 10 días. ¿Cuántos litros consumen 6 personas en 15 días?', '4 أشخاص يستهلكون 600 ل من الماء في 10 أيام. كم لترًا يستهلك 6 أشخاص في 15 يومًا؟', '4 people use 600 L of water in 10 days. How many litres do 6 people use in 15 days?'), solution: same('$600\\cdot\\frac{6}{4}\\cdot\\frac{15}{10}=1350$'), answer: { expected: n(1350) } },
            { id: 18, difficulty: 'hard', question: say('Igeltsero talde batek, egunean 10 ordu, 600 m² horma egin ditu 18 egunetan. Zenbat m² egingo ditu 15 egunetan, egunean 8 ordu?', 'Una cuadrilla, 10 horas al día, ha construido 600 m² de pared en 18 días. ¿Cuántos m² construirá en 15 días, 8 horas al día?', 'مجموعة بنّائين تعمل 10 ساعات يوميًا بنت 600 م² في 18 يومًا. كم م² تبني في 15 يومًا بـ8 ساعات يوميًا؟', 'A crew, working 10 hours a day, has built 600 m² of wall in 18 days. How many m² will it build in 15 days, working 8 hours a day?'), solution: same('$600\\cdot\\frac{8}{10}\\cdot\\frac{15}{18}=400$'), answer: { expected: n(400) } },
            { id: 19, difficulty: 'hard', question: say('Biltegi bat 2 l/s-ko 5 txorrotarekin 6 orduan betetzen da. Zenbat ordu 4 l/s-ko 3 txorrotarekin?', 'Un depósito se llena con 5 grifos de 2 l/s en 6 horas. ¿Cuántas horas tarda con 3 grifos de 4 l/s?', 'يُملأ خزان بـ5 صنابير تدفق كل منها 2 ل/ث في 6 ساعات. كم ساعة يحتاج بـ3 صنابير تدفق كل منها 4 ل/ث؟', 'A tank is filled by 5 taps of 2 L/s in 6 hours. How many hours will it take with 3 taps of 4 L/s?'), solution: same('$5\\cdot 2\\cdot 6=60\\ \\to\\ 60\\mathbin{:}(3\\cdot 4)=5$'), answer: { expected: n(5) } },
            { id: 20, difficulty: 'hard', question: say('Zergatik biderkatzen dira zatikiak proportzionaltasun konposatuan? Azaldu adibide batekin.', '¿Por qué se multiplican las fracciones en la proporcionalidad compuesta? Explícalo con un ejemplo.', 'لماذا نضرب الكسور في التناسب المركّب؟ اشرح بمثال.', 'Why are the fractions multiplied in compound proportion? Explain it with an example.'), solution: say('Magnitude bakoitzak bere aldetik aldatzen du emaitza: lehenik bat aldatzen da (biderkatu zatiki batez), gero bestea (biderkatu beste batez). Bi urratsak jarraian = bi zatikien biderkadura.', 'Cada magnitud cambia el resultado por separado: primero se cambia una (multiplicar por una fracción), luego la otra (multiplicar por otra). Los dos pasos seguidos = el producto de las dos fracciones.', 'كل مقدار يغيّر النتيجة على حدة: نغيّر الأول (نضرب في كسر) ثم الثاني (نضرب في كسر آخر). والخطوتان متتاليتين = حاصل ضرب الكسرين.', 'Each quantity changes the result separately: first you change one (multiply by a fraction), then the other (multiply by another fraction). The two steps together = the product of the two fractions.') }
        ]
    },
    {
        id: 'shares',
        title: say('Banaketa proportzionalak', 'Repartos proporcionales', 'التوزيعات التناسبية', 'Proportional sharing'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Banatu 180 zuzenki proportzionalki 2, 5 eta 8rekiko.', 'Reparte 180 de forma directamente proporcional a 2, 5 y 8.', 'وزّع 180 طرديًا على 2 و5 و8.', 'Share 180 in direct proportion to 2, 5 and 8.'), solution: same('$180\\mathbin{:}15=12\\ \\to\\ 24,\\ 60,\\ 96$') },
            { id: 22, difficulty: 'easy', question: say('Banatu 120 zuzenki proportzionalki 1 eta 3rekiko. Zein da zati handiena?', 'Reparte 120 de forma directamente proporcional a 1 y 3. ¿Cuál es la parte mayor?', 'وزّع 120 طرديًا على 1 و3. ما الجزء الأكبر؟', 'Share 120 in direct proportion to 1 and 3. What is the larger share?'), solution: same('$120\\mathbin{:}4=30\\ \\to\\ 3\\cdot 30=90$'), answer: { expected: n(90) } },
            { id: 23, difficulty: 'easy', question: say('Alderantzizko banaketa batean, zenbaki handienari zati handiena ala txikiena dagokio?', 'En un reparto inverso, ¿al número mayor le toca la parte mayor o la menor?', 'في التوزيع العكسي، هل يأخذ العدد الأكبر الجزء الأكبر أم الأصغر؟', 'In an inverse share, does the larger number get the larger share or the smaller one?'), solution: say('Txikiena.', 'La menor.', 'الأصغر.', 'The smaller one.') },
            { id: 24, difficulty: 'medium', question: say('Hiru familiak apartamentu bat 20 egunez alokatu dute 1200 €-an: 7, 6 eta 7 egun. Zenbat ordaintzen du bakoitzak?', 'Tres familias alquilan un apartamento 20 días por 1200 €: 7, 6 y 7 días. ¿Cuánto paga cada una?', 'استأجرت ثلاث عائلات شقة 20 يومًا بـ1200 €: 7 و6 و7 أيام. كم تدفع كل عائلة؟', 'Three families rent an apartment for 20 days for €1,200: 7, 6 and 7 days. How much does each one pay?'), solution: same('$1200\\mathbin{:}20=60\\ \\to\\ 420,\\ 360,\\ 420$') },
            { id: 25, difficulty: 'medium', question: say('Banatu 130 zuzenki proportzionalki $\\frac{1}{2}$, $\\frac{1}{3}$ eta $\\frac{1}{4}$-rekiko.', 'Reparte 130 de forma directamente proporcional a $\\frac{1}{2}$, $\\frac{1}{3}$ y $\\frac{1}{4}$.', 'وزّع 130 طرديًا على $\\frac{1}{2}$ و$\\frac{1}{3}$ و$\\frac{1}{4}$.', 'Share 130 in direct proportion to $\\frac{1}{2}$, $\\frac{1}{3}$ and $\\frac{1}{4}$.'), solution: same('$\\frac{6}{12},\\frac{4}{12},\\frac{3}{12}\\ \\to\\ 130\\mathbin{:}13=10\\ \\to\\ 60,\\ 40,\\ 30$') },
            { id: 26, difficulty: 'medium', question: say('Banatu 620 alderantziz proportzionalki 2, 3 eta 5ekiko.', 'Reparte 620 de forma inversamente proporcional a 2, 3 y 5.', 'وزّع 620 عكسيًا على 2 و3 و5.', 'Share 620 in inverse proportion to 2, 3 and 5.'), solution: same('$\\frac{15}{30},\\frac{10}{30},\\frac{6}{30}\\ \\to\\ 620\\mathbin{:}31=20\\ \\to\\ 300,\\ 200,\\ 120$') },
            { id: 27, difficulty: 'medium', question: say('Bi bazkidek 4000 € eta 6000 € jarri dituzte, eta 2500 € irabazi. Zenbat dagokio bigarrenari?', 'Dos socios ponen 4000 € y 6000 € y ganan 2500 €. ¿Cuánto le toca al segundo?', 'وضع شريكان 4000 € و6000 € وربحا 2500 €. كم نصيب الثاني؟', 'Two partners put in €4,000 and €6,000 and make €2,500. How much does the second partner get?'), solution: same('$2500\\mathbin{:}(4+6)=250\\ \\to\\ 6\\cdot 250=1500$'), answer: { expected: n(1500) } },
            { id: 28, difficulty: 'hard', question: say('22 000 €-ko saria hiru lehenengoen artean banatzen da, postuarekiko alderantziz. Zenbat irabazten du lehenengoak?', 'Un premio de 22 000 € se reparte entre los tres primeros de forma inversa al puesto. ¿Cuánto gana el primero?', 'تُوزَّع جائزة 22000 € على الثلاثة الأوائل عكسيًا مع الترتيب. كم يربح الأول؟', 'A prize of €22,000 is shared among the top three in inverse proportion to their position. How much does the first-place winner get?'), solution: same('$\\frac{6}{6},\\frac{3}{6},\\frac{2}{6}\\ \\to\\ 22\\,000\\mathbin{:}11=2000\\ \\to\\ 6\\cdot 2000=12\\,000$'), answer: { expected: n(12000) } },
            { id: 29, difficulty: 'hard', question: say('Banatu 2000 alderantziz proportzionalki $\\frac{1}{2}$, $\\frac{1}{3}$ eta $\\frac{1}{5}$-ekiko. Zein da zati handiena?', 'Reparte 2000 de forma inversamente proporcional a $\\frac{1}{2}$, $\\frac{1}{3}$ y $\\frac{1}{5}$. ¿Cuál es la parte mayor?', 'وزّع 2000 عكسيًا على $\\frac{1}{2}$ و$\\frac{1}{3}$ و$\\frac{1}{5}$. ما الجزء الأكبر؟', 'Share 2,000 in inverse proportion to $\\frac{1}{2}$, $\\frac{1}{3}$ and $\\frac{1}{5}$. What is the largest share?'), solution: say('Alderantzizkoak 2, 3 eta 5 dira: $2000\\mathbin{:}10=200\\ \\to\\ 400,\\ 600,\\ 1000$.', 'Los inversos son 2, 3 y 5: $2000\\mathbin{:}10=200\\ \\to\\ 400,\\ 600,\\ 1000$.', 'المقلوبات 2 و3 و5: $2000\\mathbin{:}10=200\\ \\to\\ 400,\\ 600,\\ 1000$.', 'The reciprocals are 2, 3 and 5: $2000\\mathbin{:}10=200\\ \\to\\ 400,\\ 600,\\ 1000$.'), answer: { expected: n(1000) } },
            { id: 30, difficulty: 'hard', question: say('1500, 2500 eta 4000 biztanleko hiru herrik 24 000 €-ko diru-laguntza banatzen dute biztanleen arabera. Zenbat dagokio 2500ekoari?', 'Tres pueblos de 1500, 2500 y 4000 habitantes reparten una subvención de 24 000 € según sus habitantes. ¿Cuánto le toca al de 2500?', 'ثلاث قرى سكانها 1500 و2500 و4000 تتقاسم منحة 24000 € حسب السكان. كم نصيب قرية الـ2500؟', 'Three villages with 1,500, 2,500 and 4,000 inhabitants share a €24,000 grant in proportion to their populations. How much does the village with 2,500 inhabitants get?'), solution: same('$24\\,000\\mathbin{:}8000=3\\ \\to\\ 2500\\cdot 3=7500$'), answer: { expected: n(7500) } }
        ]
    },
    {
        id: 'percent',
        title: say('Ehunekoak', 'Porcentajes', 'النسب المئوية', 'Percentages'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Kalkulatu buruz: 200en % 20.', 'Calcula mentalmente: el 20 % de 200.', 'احسب ذهنيًا: 20٪ من 200.', 'Calculate in your head: 20% of 200.'), solution: same('$200\\cdot 0{,}2=40$'), answer: { expected: n(40) } },
            { id: 32, difficulty: 'easy', question: say('Idatzi hamartar gisa: % 35, % 8, % 120.', 'Escribe como decimal: 35 %, 8 %, 120 %.', 'اكتب عددًا عشريًا: 35٪، 8٪، 120٪.', 'Write as decimals: 35%, 8%, 120%.'), solution: same('$0{,}35\\qquad 0{,}08\\qquad 1{,}2$') },
            { id: 33, difficulty: 'easy', question: say('Enpresa bateko zuzendarien % 62 gizonak dira. Zer ehuneko dira emakumeak?', 'El 62 % de los directivos de una empresa son hombres. ¿Qué porcentaje son mujeres?', '62٪ من مديري شركة رجال. ما نسبة النساء؟', '62% of a company\'s managers are men. What percentage are women?'), solution: same('$100-62=38$'), answer: { expected: n(38) } },
            { id: 34, difficulty: 'medium', question: say('Kalkulatu 750en % 12.', 'Calcula el 12 % de 750.', 'احسب 12٪ من 750.', 'Calculate 12% of 750.'), solution: same('$750\\cdot 0{,}12=90$'), answer: { expected: n(90) } },
            { id: 35, difficulty: 'medium', question: say('Kalkulatu 20ren % 2,5.', 'Calcula el 2,5 % de 20.', 'احسب 2.5٪ من 20.', 'Calculate 2.5% of 20.'), solution: same('$20\\cdot 0{,}025=0{,}5$'), answer: { expected: v('0,5') } },
            { id: 36, difficulty: 'medium', question: say('$x$-ren % 13 $7{,}54$ da. Zenbat da $x$?', 'El 13 % de $x$ es $7{,}54$. ¿Cuánto vale $x$?', '13٪ من $x$ تساوي $7{,}54$. كم قيمة $x$؟', '13% of $x$ is $7{,}54$. What is $x$?'), solution: same('$x=7{,}54\\mathbin{:}0{,}13=58$'), answer: { expected: n(58) } },
            { id: 37, difficulty: 'medium', question: say('175 ardiko artalde batean 14 beltzak dira. Zer ehuneko?', 'En un rebaño de 175 ovejas, 14 son negras. ¿Qué porcentaje?', 'في قطيع من 175 نعجة، 14 سوداء. ما النسبة؟', 'In a flock of 175 sheep, 14 are black. What percentage is that?'), solution: same('$14\\mathbin{:}175\\cdot 100=8$'), answer: { expected: n(8) } },
            { id: 38, difficulty: 'hard', question: say('Hegazkin batek 425 bidaiari daramatza: % 52 europarrak, % 28 amerikarrak, % 12 afrikarrak eta gainerakoak asiarrak. Zenbat asiar?', 'Un avión lleva 425 viajeros: el 52 % europeos, el 28 % americanos, el 12 % africanos y el resto asiáticos. ¿Cuántos asiáticos?', 'تنقل طائرة 425 مسافرًا: 52٪ أوروبيون و28٪ أمريكيون و12٪ أفارقة والباقي آسيويون. كم آسيويًا؟', 'A plane carries 425 passengers: 52% European, 28% American, 12% African and the rest Asian. How many Asian passengers are there?'), solution: same('$100-52-28-12=8\\ \\to\\ 425\\cdot 0{,}08=34$'), answer: { expected: n(34) } },
            { id: 39, difficulty: 'hard', question: say('Albertok 111 € ordaindu ditu 148 € balio zuen beroki batengatik. Zer ehuneko beherapen?', 'Alberto ha pagado 111 € por un abrigo de 148 €. ¿Qué porcentaje de descuento?', 'دفع ألبرتو 111 € ثمن معطف سعره 148 €. ما نسبة الخصم؟', 'Alberto paid €111 for a coat that costs €148. What percentage discount is that?'), solution: same('$111\\mathbin{:}148\\cdot 100=75\\ \\to\\ 100-75=25$'), answer: { expected: n(25) } },
            { id: 40, difficulty: 'hard', question: say('15 milioi biztanleko herrialde batean % 8 etorkinak dira. Zenbat milioi?', 'En un país de 15 millones de habitantes, el 8 % son inmigrantes. ¿Cuántos millones?', 'في بلد عدد سكانه 15 مليونًا، 8٪ مهاجرون. كم مليونًا؟', 'In a country of 15 million people, 8% are immigrants. How many million people is that?'), solution: same('$15\\cdot 0{,}08=1{,}2$'), answer: { expected: v('1,2') } }
        ]
    },
    {
        id: 'changes',
        title: say('Aldakuntzak eta interesa', 'Variaciones e interés', 'التغيّرات والفائدة', 'Percentage changes and interest'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Idatzi aldakuntza-indizea: a) % 18 igo; b) % 7 jaitsi; c) % 100 igo.', 'Escribe el índice de variación: a) subir un 18 %; b) bajar un 7 %; c) subir un 100 %.', 'اكتب مؤشر التغيّر: أ) زيادة 18٪؛ ب) تخفيض 7٪؛ ج) زيادة 100٪.', 'Write the multiplier for each change: a) a rise of 18%; b) a fall of 7%; c) a rise of 100%.'), solution: same('$1{,}18\\qquad 0{,}93\\qquad 2$') },
            { id: 42, difficulty: 'easy', question: say('Aurreko hilabetean 2500 bote saldu ziren eta salmentak % 12 igo dira. Zenbat bote orain?', 'El mes pasado se vendieron 2500 botes y las ventas han subido un 12 %. ¿Cuántos botes ahora?', 'بيعت الشهر الماضي 2500 علبة وارتفعت المبيعات 12٪. كم علبة الآن؟', 'Last month 2,500 jars were sold, and sales have risen by 12%. How many jars are sold now?'), solution: same('$2500\\cdot 1{,}12=2800$'), answer: { expected: n(2800) } },
            { id: 43, difficulty: 'easy', question: say('Zer interes sortzen dute 600 €-k % 5ean urte batean?', '¿Qué interés producen 600 € al 5 % en un año?', 'ما الفائدة التي تُنتجها 600 € بنسبة 5٪ في سنة؟', 'What interest do €600 earn at 5% in one year?'), solution: same('$\\frac{600\\cdot 5\\cdot 1}{100}=30$'), answer: { expected: n(30) } },
            { id: 44, difficulty: 'medium', question: say('Soldata % 10 igo ondoren, Martak 1760 € irabazten ditu. Zenbat zen lehen?', 'Tras una subida del 10 %, Marta gana 1760 €. ¿Cuánto ganaba antes?', 'بعد زيادة 10٪ صارت مارتا تربح 1760 €. كم كانت تربح قبل ذلك؟', 'After a 10% rise, Marta earns €1,760. How much did she earn before?'), solution: same('$1760\\mathbin{:}1{,}1=1600$'), answer: { expected: n(1600) } },
            { id: 45, difficulty: 'medium', question: say('Interneteko erabiltzaileak 21 000 dira, iaz baino % 20 gehiago. Zenbat ziren?', 'Hay 21 000 usuarios de Internet, un 20 % más que el año pasado. ¿Cuántos había?', 'عدد مستخدمي الإنترنت 21000، بزيادة 20٪ عن العام الماضي. كم كانوا؟', 'There are 21,000 internet users, 20% more than last year. How many were there?'), solution: same('$21\\,000\\mathbin{:}1{,}2=17\\,500$'), answer: { expected: n(17500) } },
            { id: 46, difficulty: 'medium', question: say('Kalkulatu 8000 €-k % 5ean 3 urtez sortzen duten interesa.', 'Calcula el interés que producen 8000 € al 5 % durante 3 años.', 'احسب الفائدة التي تُنتجها 8000 € بنسبة 5٪ مدة 3 سنوات.', 'Calculate the interest earned on €8,000 at 5% over 3 years.'), solution: same('$\\frac{8000\\cdot 5\\cdot 3}{100}=1200$'), answer: { expected: n(1200) } },
            { id: 47, difficulty: 'medium', question: say('100 €-ko produktu bat % 10 igo eta gero % 10 jaisten da. Zenbat balio du?', 'Un producto de 100 € sube un 10 % y luego baja un 10 %. ¿Cuánto cuesta?', 'منتج ثمنه 100 € يرتفع 10٪ ثم ينخفض 10٪. كم ثمنه؟', 'A product that costs €100 goes up by 10% and then down by 10%. How much does it cost now?'), solution: same('$100\\cdot 1{,}1\\cdot 0{,}9=99$'), answer: { expected: n(99) } },
            { id: 48, difficulty: 'hard', question: say('80 €-ko produktu bat % 15 igo eta gero % 20 jaisten da. Zenbat balio du?', 'Un producto de 80 € sube un 15 % y luego baja un 20 %. ¿Cuánto cuesta?', 'منتج ثمنه 80 € يرتفع 15٪ ثم ينخفض 20٪. كم ثمنه؟', 'A product that costs €80 goes up by 15% and then down by 20%. How much does it cost now?'), solution: same('$80\\cdot 1{,}15\\cdot 0{,}8=73{,}6$'), answer: { expected: v('73,6') } },
            { id: 49, difficulty: 'hard', question: say('Zenbat urtetan sortzen dituzte 2000 €-k % 4an 400 € interes?', '¿En cuántos años producen 2000 € al 4 % un interés de 400 €?', 'في كم سنة تُنتج 2000 € بنسبة 4٪ فائدة 400 €؟', 'After how many years will €2,000 at 4% earn €400 of interest?'), solution: same('$t=\\frac{400\\cdot 100}{2000\\cdot 4}=5$'), answer: { expected: n(5) } },
            { id: 50, difficulty: 'hard', question: say('Zer interes-tasarekin sortzen dituzte 5000 €-k 750 € 3 urtetan?', '¿A qué tipo de interés producen 5000 € un interés de 750 € en 3 años?', 'بأي سعر فائدة تُنتج 5000 € فائدة 750 € في 3 سنوات؟', 'At what interest rate will €5,000 earn €750 in interest over 3 years?'), solution: same('$r=\\frac{750\\cdot 100}{5000\\cdot 3}=5$'), answer: { expected: n(5) } }
        ]
    }
]

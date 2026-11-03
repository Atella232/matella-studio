import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { DirectTableFigure, InverseTableFigure, ProportionFigure } from '../dbh1-proportzionaltasuna-v2/figures'
import {
    ChainedFigure,
    CompoundDirectFigure,
    CompoundMixedFigure,
    CompoundUnitFigure,
    DirectShareFigure,
    IndexFigure,
    InterestFigure,
    InverseShareFigure,
    PercentFormsFigure,
    PercentTotalFigure,
    PercentWhichFigure,
    ShareDaysFigure
} from './figures'
import { proportionLessonChecks, type ProportionTopicId } from './lessonChecks'
import { proportionLessonTexts } from './lessonTexts'

/* ==========================================================================
   Proportzionaltasuna eta ehunekoak · 2. DBH — stages and lessons. The
   first-year unit already teaches ratios, the direct and inverse rule of
   three, the percentage of a quantity and simple discounts; this unit
   reviews them in one stage and then follows the class textbooks (Anaya
   2.º ESO unit 5, Santillana unit 8): compound proportionality (the
   bricklayers, the farmer's fodder, the sprinklers), proportional shares
   (the flat at the coast, the TV prize), percentages written as decimals,
   the initial amount and the percentage of change, the index of change,
   chained percentages and simple interest.
   ========================================================================== */

export type ProportionDbh2StageId = 'proportions' | 'compound' | 'shares' | 'percent' | 'changes'

export const proportionDbh2Stages: UnitStage[] = [
    { id: 'proportions', tone: 'blue', title: { eu: 'Proportzioak (errepasoa)', es: 'Proporciones (repaso)', en: 'Proportions (revision)', ar: 'التناسبات (مراجعة)' } },
    { id: 'compound', tone: 'violet', title: { eu: 'Proportzionaltasun konposatua', es: 'Proporcionalidad compuesta', en: 'Compound proportion', ar: 'التناسب المركّب' } },
    { id: 'shares', tone: 'mustard', title: { eu: 'Banaketa proportzionalak', es: 'Repartos proporcionales', en: 'Proportional sharing', ar: 'التوزيعات التناسبية' } },
    { id: 'percent', tone: 'coral', title: { eu: 'Ehunekoak', es: 'Porcentajes', en: 'Percentages', ar: 'النسب المئوية' } },
    { id: 'changes', tone: 'green', title: { eu: 'Aldakuntzak eta interesa', es: 'Variaciones e interés', en: 'Percentage changes and interest', ar: 'التغيّرات والفائدة' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Review ---------- */
    {
        id: 'proportion-review',
        stage: 'proportions',
        title: say('Arrazoiak eta proportzioak', 'Razones y proporciones', 'النسب والتناسبات', 'Ratios and proportions'),
        goal: say('Proportzio batean laugarren proportzionala aurkitzea.', 'Hallar el cuarto proporcional en una proporción.', 'إيجاد الرابع المتناسب في تناسب.', 'Find the fourth proportional in a proportion.'),
        problem: say('Markosen eta bere aitaren pisuen arrazoia $\\frac{3}{5}$ da. Markosek 45 kg pisatzen ditu. Zenbat pisatzen du aitak?', 'La razón de los pesos de Marcos y su padre es $\\frac{3}{5}$. Marcos pesa 45 kg. ¿Cuánto pesa su padre?', 'نسبة وزن ماركوس إلى وزن أبيه $\\frac{3}{5}$. يزن ماركوس 45 كغ. كم يزن أبوه؟', 'The ratio of Marcos\'s weight to his father\'s weight is $\\frac{3}{5}$. Marcos weighs 45 kg. How much does his father weigh?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi proportzioa.', 'Escribe la proporción.', 'اكتب التناسب.', 'Write the proportion.'), math: same('$\\frac{3}{5}=\\frac{45}{x}$') },
            { text: say('Gurutzeko biderkadurak.', 'Productos cruzados.', 'الضرب التبادلي.', 'Cross products.'), math: same('$3\\cdot x=5\\cdot 45=225$') },
            { text: say('Aitak 75 kg.', 'El padre pesa 75 kg.', 'يزن الأب 75 كغ.', 'The father weighs 75 kg.'), math: same('$x=225\\mathbin{:}3=75$') }
        ],
        takeaway: say('Laugarren proportzionala: $x=\\frac{b\\cdot c}{a}$.', 'Cuarto proporcional: $x=\\frac{b\\cdot c}{a}$.', 'الرابع المتناسب: $x=\\frac{b\\cdot c}{a}$.', 'Fourth proportional: $x=\\frac{b\\cdot c}{a}$.'),
        figure: (language) => <ProportionFigure language={language} />
    },
    {
        id: 'direct-review',
        stage: 'proportions',
        title: say('Proportzionaltasun zuzena', 'Proporcionalidad directa', 'التناسب الطردي', 'Direct proportion'),
        goal: say('Proportzionaltasun zuzeneko problemak hiruko erregela zuzenaz edo unitatera laburtuz ebaztea.', 'Resolver problemas de proporcionalidad directa con la regla de tres directa o reduciendo a la unidad.', 'حلّ مسائل التناسب الطردي بقاعدة الثلاثة الطردية أو بالإرجاع إلى الوحدة.', 'Solve direct proportion problems using the direct rule of three or the unitary method.'),
        problem: say('Txirrindulari batek 200 m egiten ditu 20 segundotan, abiadura berean. Zenbat metro egingo ditu 3 minututan?', 'Un ciclista recorre 200 m en 20 segundos, a velocidad constante. ¿Cuántos metros recorrerá en 3 minutos?', 'يقطع دراج 200 م في 20 ثانية بسرعة ثابتة. كم مترًا يقطع في 3 دقائق؟', 'A cyclist covers 200 m in 20 seconds at a constant speed. How many metres will they cover in 3 minutes?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Unitate berean: 3 min = 180 s.', 'En la misma unidad: 3 min = 180 s.', 'بالوحدة نفسها: 3 د = 180 ث.', 'In the same unit: 3 min = 180 s.') },
            { text: say('Segundo batean.', 'En un segundo.', 'في ثانية واحدة.', 'In one second.'), math: same('$200\\mathbin{:}20=10$') },
            { text: say('180 segundotan.', 'En 180 segundos.', 'في 180 ثانية.', 'In 180 seconds.'), math: same('$10\\cdot 180=1800$') }
        ],
        takeaway: say('Zuzena: gehiago → gehiago, eta zatidura konstantea.', 'Directa: más → más, y el cociente constante.', 'طردي: أكثر ← أكثر، وحاصل القسمة ثابت.', 'Direct: more → more, and the quotient is constant.'),
        figure: (language) => <DirectTableFigure language={language} />
    },
    {
        id: 'inverse-review',
        stage: 'proportions',
        title: say('Alderantzizko proportzionaltasuna', 'Proporcionalidad inversa', 'التناسب العكسي', 'Inverse proportion'),
        goal: say('Alderantzizko proportzionaltasuneko problemak biderkadura konstantea erabiliz ebaztea.', 'Resolver problemas de proporcionalidad inversa usando el producto constante.', 'حلّ مسائل التناسب العكسي باستعمال حاصل الضرب الثابت.', 'Solve inverse proportion problems using the constant product.'),
        problem: say('Merkantzia-tren batek 7 ordu behar ditu 72 km/h-ra. Zer abiadurarekin egingo luke 6 ordutan?', 'Un tren de mercancías tarda 7 horas a 72 km/h. ¿A qué velocidad tendría que ir para tardar 6 horas?', 'يستغرق قطار بضائع 7 ساعات بسرعة 72 كم/س. بأي سرعة يجب أن يسير ليستغرق 6 ساعات؟', 'A freight train takes 7 hours at 72 km/h. At what speed would it have to travel to take 6 hours?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Denbora gutxiago → abiadura handiagoa: alderantzizkoa.', 'Menos tiempo → más velocidad: inversa.', 'زمن أقل ← سرعة أكبر: عكسي.', 'Less time → more speed: inverse.') },
            { text: say('Biderkadurak berdindu.', 'Iguala los productos.', 'ساوِ حاصلي الضرب.', 'Set the products equal.'), math: same('$72\\cdot 7=6\\cdot x=504$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.', 'Divide.'), math: same('$x=504\\mathbin{:}6=84$') }
        ],
        takeaway: say('Alderantzizkoa: gehiago → gutxiago, eta biderkadura konstantea.', 'Inversa: más → menos, y el producto constante.', 'عكسي: أكثر ← أقل، وحاصل الضرب ثابت.', 'Inverse: more → less, and the product is constant.'),
        figure: (language) => <InverseTableFigure language={language} />
    },

    /* ---------- 2. Compound proportionality ---------- */
    {
        id: 'compound-direct',
        stage: 'compound',
        title: say('Bi erlazio zuzen', 'Dos relaciones directas', 'علاقتان طرديتان', 'Two direct relationships'),
        goal: say('Hiru magnitude edo gehiago dituzten problemak ebaztea, erlazio guztiak zuzenak direnean.', 'Resolver problemas con tres o más magnitudes cuando todas las relaciones son directas.', 'حلّ مسائل فيها ثلاثة مقادير أو أكثر عندما تكون كل العلاقات طردية.', 'Solve problems with three or more quantities when all the relationships are direct.'),
        problem: say('5 makinak, egunean 6 ordu, 1500 pieza egiten dituzte. Zenbat pieza 4 makinak egunean 9 ordu?', '5 máquinas, 6 horas al día, fabrican 1500 piezas. ¿Cuántas piezas fabrican 4 máquinas 9 horas al día?', '5 آلات تعمل 6 ساعات يوميًا تصنع 1500 قطعة. كم قطعة تصنع 4 آلات تعمل 9 ساعات يوميًا؟', '5 machines, working 6 hours a day, make 1,500 parts. How many parts do 4 machines make working 9 hours a day?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Makina gehiago → pieza gehiago: zuzena.', 'Más máquinas → más piezas: directa.', 'آلات أكثر ← قطع أكثر: طردي.', 'More machines → more parts: direct.'), math: same('$\\frac{4}{5}$') },
            { text: say('Ordu gehiago → pieza gehiago: zuzena.', 'Más horas → más piezas: directa.', 'ساعات أكثر ← قطع أكثر: طردي.', 'More hours → more parts: direct.'), math: same('$\\frac{9}{6}$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$1500\\cdot\\frac{4}{5}\\cdot\\frac{9}{6}=1800$') }
        ],
        takeaway: say('Magnitude bakoitza bere aldetik konparatu; zuzenak: zatidura berria/zaharra.', 'Compara cada magnitud por separado; las directas: cociente nuevo/viejo.', 'قارن كل مقدار على حدة؛ الطردية: الكسر الجديد/القديم.', 'Compare each quantity separately; for the direct ones: new/old quotient.'),
        figure: (language) => <CompoundDirectFigure language={language} />
    },
    {
        id: 'compound-mixed',
        stage: 'compound',
        title: say('Erlazio zuzenak eta alderantzizkoak', 'Relaciones directas e inversas', 'علاقات طردية وعكسية', 'Direct and inverse relationships'),
        goal: say('Proportzionaltasun konposatuko problemak ebaztea erlazio zuzenak eta alderantzizkoak nahasten direnean.', 'Resolver problemas de proporcionalidad compuesta que mezclan relaciones directas e inversas.', 'حلّ مسائل التناسب المركّب التي تمزج علاقات طردية وعكسية.', 'Solve compound proportion problems that mix direct and inverse relationships.'),
        problem: say('Hondeamakina batek, egunean 10 ordu, 1000 m-ko zanga egiten du 8 egunetan. Zenbat egun beharko ditu 600 m-ko zanga egiteko, egunean 12 ordu?', 'Una excavadora, trabajando 10 horas al día, abre una zanja de 1000 m en 8 días. ¿Cuánto tardará en abrir una de 600 m trabajando 12 horas al día?', 'تحفر حفّارة تعمل 10 ساعات يوميًا خندقًا طوله 1000 م في 8 أيام. كم يومًا تحتاج لخندق طوله 600 م إذا عملت 12 ساعة يوميًا؟', 'An excavator working 10 hours a day digs a 1,000 m trench in 8 days. How long will it take to dig a 600 m trench working 12 hours a day?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Metro gutxiago → egun gutxiago: zuzena.', 'Menos metros → menos días: directa.', 'أمتار أقل ← أيام أقل: طردي.', 'Fewer metres → fewer days: direct.'), math: same('$\\frac{600}{1000}$') },
            { text: say('Ordu gehiago → egun gutxiago: alderantzizkoa.', 'Más horas → menos días: inversa.', 'ساعات أكثر ← أيام أقل: عكسي.', 'More hours → fewer days: inverse.'), math: same('$\\frac{10}{12}$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$8\\cdot\\frac{600}{1000}\\cdot\\frac{10}{12}=4$') }
        ],
        takeaway: say('Zuzena: berria/zaharra. Alderantzizkoa: zaharra/berria.', 'Directa: nuevo/viejo. Inversa: viejo/nuevo.', 'الطردي: الجديد/القديم. العكسي: القديم/الجديد.', 'Direct: new/old. Inverse: old/new.'),
        figure: (language) => <CompoundMixedFigure language={language} />
    },
    {
        id: 'compound-unit',
        stage: 'compound',
        figureAfterSteps: true,
        title: say('Unitatera laburtuz, urratsez urrats', 'Reduciendo a la unidad, paso a paso', 'بالإرجاع إلى الوحدة خطوة خطوة', 'The unitary method, step by step'),
        goal: say('Proportzionaltasun konposatuko problemak magnitude bat aldi berean aldatuz ebaztea.', 'Resolver problemas de proporcionalidad compuesta cambiando una magnitud cada vez.', 'حلّ مسائل التناسب المركّب بتغيير مقدار واحد في كل مرة.', 'Solve compound proportion problems by changing one quantity at a time.'),
        problem: say('6 lagunek 4 egunetan 72 € gastatzen dituzte janarian. Zenbat gastatuko dute 9 lagunek 5 egunetan?', '6 amigos gastan 72 € en comida en 4 días. ¿Cuánto gastarán 9 amigos en 5 días?', '6 أصدقاء ينفقون 72 € على الطعام في 4 أيام. كم ينفق 9 أصدقاء في 5 أيام؟', '6 friends spend €72 on food in 4 days. How much will 9 friends spend in 5 days?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lagun batek, 4 egunetan.', 'Un amigo, en 4 días.', 'صديق واحد في 4 أيام.', 'One friend, in 4 days.'), math: same('$72\\mathbin{:}6=12$') },
            { text: say('Lagun batek, egun batean.', 'Un amigo, en un día.', 'صديق واحد في يوم.', 'One friend, in one day.'), math: same('$12\\mathbin{:}4=3$') },
            { text: say('9 lagunek, 5 egunetan.', '9 amigos, en 5 días.', '9 أصدقاء في 5 أيام.', '9 friends, in 5 days.'), math: same('$3\\cdot 9\\cdot 5=135$') }
        ],
        takeaway: say('Magnitude bat aldi berean: bakoitza proportzionaltasun soil bat da.', 'Una magnitud cada vez: cada paso es una proporcionalidad simple.', 'مقدار واحد في كل مرة: كل خطوة تناسب بسيط.', 'One quantity at a time: each step is a simple proportion.'),
        figure: (language) => <CompoundUnitFigure language={language} />
    },

    /* ---------- 3. Proportional shares ---------- */
    {
        id: 'direct-share',
        stage: 'shares',
        title: say('Banaketa zuzenki proportzionala', 'Reparto directamente proporcional', 'التوزيع الطردي', 'Sharing in direct proportion'),
        goal: say('Kantitate bat zenbaki batzuekiko zuzenki proportzionalak diren zatitan banatzea.', 'Repartir una cantidad en partes directamente proporcionales a unos números.', 'توزيع كمية إلى أجزاء متناسبة طرديًا مع أعداد معطاة.', 'Share an amount into parts in direct proportion to some numbers.'),
        problem: say('Hiru lagunek 3 €, 5 € eta 7 € jarri zituzten loteria-zenbaki batean, eta 450 € irabazi dituzte. Zenbat dagokio bakoitzari?', 'Tres amigos pusieron 3 €, 5 € y 7 € en un número de lotería y han ganado 450 €. ¿Cuánto le toca a cada uno?', 'وضع ثلاثة أصدقاء 3 € و5 € و7 € في رقم يانصيب وربحوا 450 €. كم نصيب كل واحد؟', 'Three friends put €3, €5 and €7 into a lottery number and have won €450. How much does each of them get?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatiak guztira.', 'Partes en total.', 'مجموع الأجزاء.', 'Parts in total.'), math: same('$3+5+7=15$') },
            { text: say('Zati baten balioa.', 'Valor de una parte.', 'قيمة الجزء الواحد.', 'Value of one part.'), math: same('$450\\mathbin{:}15=30$') },
            { text: say('Bakoitzari.', 'A cada uno.', 'لكل واحد.', 'To each person.'), math: same('$90,\\ 150,\\ 210$') }
        ],
        takeaway: say('Zuzena: kantitatea : batura, gero bider zenbaki bakoitza.', 'Directo: cantidad : suma, y luego por cada número.', 'الطردي: الكمية : المجموع ثم في كل عدد.', 'Direct: amount : sum, then multiply by each number.'),
        figure: (language) => <DirectShareFigure language={language} />
    },
    {
        id: 'share-problems',
        stage: 'shares',
        needs: [{ unit: 'dbh2/zatikiak', topic: 'add-subtract', title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', en: 'Addition and subtraction', ar: 'الجمع والطرح' } }],
        title: say('Banaketak problemetan eta zatikiekin', 'Repartos en problemas y con fracciones', 'التوزيع في المسائل وبالكسور', 'Sharing in problems and with fractions'),
        goal: say('Banaketa proportzionalak egunekin, orduekin edo zatikiekin ebaztea.', 'Resolver repartos proporcionales con días, horas o fracciones.', 'حلّ توزيعات تناسبية بالأيام أو الساعات أو الكسور.', 'Solve proportional shares involving days, hours or fractions.'),
        problem: say('Banatu 130 zuzenki proportzionalki $\\frac{1}{2}$, $\\frac{1}{3}$ eta $\\frac{1}{4}$-rekiko.', 'Reparte 130 en partes directamente proporcionales a $\\frac{1}{2}$, $\\frac{1}{3}$ y $\\frac{1}{4}$.', 'وزّع 130 طرديًا على $\\frac{1}{2}$ و$\\frac{1}{3}$ و$\\frac{1}{4}$.', 'Share 130 into parts in direct proportion to $\\frac{1}{2}$, $\\frac{1}{3}$ and $\\frac{1}{4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzaile bera.', 'Mismo denominador.', 'المقام نفسه.', 'Same denominator.'), math: same('$\\frac{6}{12},\\ \\frac{4}{12},\\ \\frac{3}{12}$') },
            { text: say('6, 4 eta 3rekiko: 13 zati.', 'Proporcional a 6, 4 y 3: 13 partes.', 'متناسب مع 6 و4 و3: 13 جزءًا.', 'In proportion to 6, 4 and 3: 13 parts.'), math: same('$130\\mathbin{:}13=10$') },
            { text: say('Zatiak.', 'Las partes.', 'الأجزاء.', 'The parts.'), math: same('$60,\\ 40,\\ 30$') }
        ],
        takeaway: say('Zatikiak: izendatzaile bera, eta banatu zenbakitzaileen arabera.', 'Fracciones: mismo denominador, y reparte según los numeradores.', 'الكسور: المقام نفسه ثم التوزيع حسب البسوط.', 'Fractions: same denominator, then share according to the numerators.'),
        figure: (language) => <ShareDaysFigure language={language} />
    },
    {
        id: 'inverse-share',
        stage: 'shares',
        needs: [{ unit: 'dbh2/zatikiak', topic: 'multiply-divide', title: { eu: 'Biderketa eta zatiketa', es: 'Multiplicación y división', en: 'Multiplication and division', ar: 'الضرب والقسمة' } }],
        figureAfterSteps: true,
        title: say('Banaketa alderantziz proportzionala', 'Reparto inversamente proporcional', 'التوزيع العكسي', 'Sharing in inverse proportion'),
        goal: say('Kantitate bat zenbaki batzuekiko alderantziz proportzionalak diren zatitan banatzea.', 'Repartir una cantidad en partes inversamente proporcionales a unos números.', 'توزيع كمية إلى أجزاء متناسبة عكسيًا مع أعداد معطاة.', 'Share an amount into parts in inverse proportion to some numbers.'),
        problem: say('22\u00a0000 €-ko saria hiru lehenengoen artean banatzen da, postuarekiko (1, 2 eta 3) alderantziz proportzionalki. Zenbat irabazten du bakoitzak?', 'Un premio de 22\u00a0000 € se reparte entre los tres primeros de forma inversamente proporcional al puesto (1, 2 y 3). ¿Cuánto gana cada uno?', 'تُوزَّع جائزة 22000 € على الثلاثة الأوائل عكسيًا مع الترتيب (1 و2 و3). كم يربح كل واحد؟', 'A prize of €22,000 is shared among the top three in inverse proportion to their position (1, 2 and 3). How much does each one win?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alderantzizkoak, izendatzaile berarekin.', 'Los inversos, con el mismo denominador.', 'المقلوبات بالمقام نفسه.', 'The inverses, with the same denominator.'), math: same('$\\frac{6}{6},\\ \\frac{3}{6},\\ \\frac{2}{6}$') },
            { text: say('6, 3 eta 2rekiko: 11 zati.', 'Proporcional a 6, 3 y 2: 11 partes.', 'متناسب مع 6 و3 و2: 11 جزءًا.', 'In proportion to 6, 3 and 2: 11 parts.'), math: same('$22\\,000\\mathbin{:}11=2000$') },
            { text: say('Sariak.', 'Los premios.', 'الجوائز.', 'The prizes.'), math: same('$12\\,000,\\ 6000,\\ 4000$') }
        ],
        takeaway: say('Alderantzizkoa: banatu alderantzizkoekiko zuzenki.', 'Inverso: reparte directamente a los inversos.', 'العكسي: وزّع طرديًا على المقلوبات.', 'Inverse: share directly in proportion to the inverses.'),
        figure: (language) => <InverseShareFigure language={language} />
    },

    /* ---------- 4. Percentages ---------- */
    {
        id: 'percent-forms',
        stage: 'percent',
        needs: [{ unit: 'dbh2/zatikiak', topic: 'percentages', title: { eu: 'Zatikiak, hamartarrak eta ehunekoak', es: 'Fracciones, decimales y porcentajes', en: 'Fractions, decimals and percentages', ar: 'الكسور والأعداد العشرية والنسب المئوية' } }],
        title: say('Ehunekoa hamartar gisa', 'El porcentaje como decimal', 'النسبة المئوية عددًا عشريًا', 'Percentages as decimals'),
        goal: say('Ehuneko bat hamartar gisa idaztea eta kantitate baten ehunekoa biderketa bakar batez kalkulatzea, % 100etik gorakoak barne.', 'Escribir un porcentaje como decimal y calcular el porcentaje de una cantidad con una sola multiplicación, también por encima del 100 %.', 'كتابة النسبة المئوية عددًا عشريًا وحساب نسبة من كمية بضربة واحدة، حتى فوق 100٪.', 'Write a percentage as a decimal and calculate a percentage of an amount with a single multiplication, including percentages above 100%.'),
        problem: say('Kalkulatu 200en % 115.', 'Calcula el 115 % de 200.', 'احسب 115٪ من 200.', 'Calculate 115% of 200.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hamartar gisa.', 'Como decimal.', 'عددًا عشريًا.', 'As a decimal.'), math: same('$115\\mathbin{:}100=1{,}15$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$200\\cdot 1{,}15=230$') }
        ],
        takeaway: say('% $p$ = $p\\mathbin{:}100$; kantitatea bider hamartarra.', '$p$ % = $p\\mathbin{:}100$; la cantidad por el decimal.', '$p$٪ = $p\\mathbin{:}100$؛ الكمية في العدد العشري.', '$p$% = $p\\mathbin{:}100$; the amount times the decimal.'),
        figure: (language) => <PercentFormsFigure language={language} />
    },
    {
        id: 'percent-total',
        stage: 'percent',
        needs: [{ unit: 'dbh1/numeros-decimales', topic: 'divide-decimal', title: { eu: 'Zatitzailea hamartarra denean', es: 'Cuando el divisor es decimal', en: 'When the divisor is a decimal', ar: 'حين يكون المقسوم عليه عشريًا' } }],
        title: say('Hasierako kantitatea', 'La cantidad inicial', 'الكمية الأصلية', 'The initial amount'),
        goal: say('Zati bat eta haren ehunekoa jakinda, osoa kalkulatzea.', 'Calcular el total conociendo una parte y su porcentaje.', 'حساب الكل بمعرفة جزء ونسبته المئوية.', 'Calculate the total when you know a part and its percentage.'),
        problem: say('Artalde batean 14 ardi beltz daude, guztien % 8. Zenbat ardi ditu artaldeak?', 'En un rebaño hay 14 ovejas negras, el 8 % del total. ¿Cuántas ovejas tiene el rebaño?', 'في قطيع 14 نعجة سوداء، أي 8٪ من الكل. كم نعجة في القطيع؟', 'A flock has 14 black sheep, which is 8% of the total. How many sheep are in the flock?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi ekuazioa.', 'Escribe la ecuación.', 'اكتب المعادلة.', 'Write the equation.'), math: same('$x\\cdot 0{,}08=14$') },
            { text: say('Zatitu hamartarraz.', 'Divide entre el decimal.', 'اقسم على العدد العشري.', 'Divide by the decimal.'), math: same('$x=14\\mathbin{:}0{,}08=175$') }
        ],
        takeaway: say('Osoa = zatia : hamartarra.', 'Total = parte : decimal.', 'الكل = الجزء : العدد العشري.', 'Total = part : decimal.'),
        figure: (language) => <PercentTotalFigure language={language} />
    },
    {
        id: 'percent-which',
        stage: 'percent',
        title: say('Zer ehuneko? Aldakuntzaren ehunekoa', '¿Qué porcentaje? El porcentaje de variación', 'أي نسبة؟ نسبة التغيّر', 'What percentage? Percentage change'),
        goal: say('Zati batek osoaren zer ehuneko den eta kantitate batek zer ehuneko igo edo jaitsi den kalkulatzea.', 'Calcular qué porcentaje es una parte del total y en qué porcentaje ha subido o bajado una cantidad.', 'حساب نسبة جزء من الكل ونسبة ارتفاع كمية أو انخفاضها.', 'Calculate what percentage a part is of the total, and by what percentage an amount has gone up or down.'),
        problem: say('Hiru urte lehenago 280\u00a0000 € balio zuen etxe bat 350\u00a0000 €-an saldu da. Zer ehuneko igo da?', 'Una vivienda que costó 280\u00a0000 € hace tres años se ha vendido por 350\u00a0000 €. ¿Qué porcentaje ha subido?', 'بيع منزل بـ350000 € وكان ثمنه قبل ثلاث سنوات 280000 €. بأي نسبة ارتفع؟', 'A house that cost €280,000 three years ago has been sold for €350,000. By what percentage has it gone up?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Amaierakoa : hasierakoa · 100.', 'Final : inicial · 100.', 'النهائية : الأصلية · 100.', 'Final : original · 100.'), math: same('$350\\,000\\mathbin{:}280\\,000\\cdot 100=125$') },
            { text: say('% 125 → % 25 igo da.', '125 % → ha subido un 25 %.', '125٪ ← ارتفع 25٪.', '125% → it has gone up by 25%.') }
        ],
        takeaway: say('Ehunekoa = zatia : osoa · 100. Aldakuntza: hasierakoarekiko.', 'Porcentaje = parte : total · 100. Variación: respecto de la inicial.', 'النسبة = الجزء : الكل · 100. والتغيّر: بالنسبة إلى الأصلية.', 'Percentage = part : total · 100. Change: relative to the initial amount.'),
        figure: (language) => <PercentWhichFigure language={language} />
    },

    /* ---------- 5. Changes and interest ---------- */
    {
        id: 'index',
        stage: 'changes',
        title: say('Aldakuntza-indizea', 'El índice de variación', 'مؤشر التغيّر', 'The change multiplier'),
        goal: say('Igoerak eta beherapenak indize batez biderkatuz kalkulatzea, eta hasierako kantitatea indizeaz zatituz.', 'Calcular aumentos y disminuciones multiplicando por un índice, y la cantidad inicial dividiendo entre él.', 'حساب الزيادات والتخفيضات بالضرب في مؤشر، والكمية الأصلية بالقسمة عليه.', 'Calculate increases and decreases by multiplying by a multiplier, and find the initial amount by dividing by it.'),
        problem: say('Martari soldata % 10 igo diote eta orain 1760 € irabazten ditu. Zenbat irabazten zuen lehen?', 'A Marta le han subido el sueldo un 10 % y ahora gana 1760 €. ¿Cuánto ganaba antes?', 'رُفع راتب مارتا 10٪ فصارت تربح 1760 €. كم كانت تربح قبل ذلك؟', 'Marta\'s salary has gone up by 10% and she now earns €1,760. How much did she earn before?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizea: % 110.', 'Índice: el 110 %.', 'المؤشر: 110٪.', 'Multiplier: 110%.'), math: same('$1{,}10$') },
            { text: say('Hasierakoa = amaierakoa : indizea.', 'Inicial = final : índice.', 'الأصلية = النهائية : المؤشر.', 'Initial = final : multiplier.'), math: same('$1760\\mathbin{:}1{,}1=1600$') }
        ],
        takeaway: say('Igo: $\\cdot(1+\\frac{p}{100})$. Jaitsi: $\\cdot(1-\\frac{p}{100})$. Atzera: zatitu.', 'Subir: $\\cdot(1+\\frac{p}{100})$. Bajar: $\\cdot(1-\\frac{p}{100})$. Hacia atrás: divide.', 'زيادة: $\\cdot(1+\\frac{p}{100})$. تخفيض: $\\cdot(1-\\frac{p}{100})$. للرجوع: اقسم.', 'Increase: $\\cdot(1+\\frac{p}{100})$. Decrease: $\\cdot(1-\\frac{p}{100})$. Going backwards: divide.'),
        figure: (language) => <IndexFigure language={language} />
    },
    {
        id: 'chained',
        stage: 'changes',
        title: say('Ehuneko kateatuak', 'Porcentajes encadenados', 'النسب المتتالية', 'Chained percentages'),
        goal: say('Bata bestearen atzetik egiten diren igoerak eta beherapenak indizeak biderkatuz kalkulatzea.', 'Calcular aumentos y disminuciones sucesivos multiplicando los índices.', 'حساب زيادات وتخفيضات متتالية بضرب المؤشرات.', 'Calculate successive increases and decreases by multiplying the multipliers.'),
        problem: say('500 €-ko bizikleta bat % 20 merkatu dute, eta gero beste % 10. Zenbat balio du orain?', 'Una bici de 500 € se rebaja un 20 % y después otro 10 %. ¿Cuánto cuesta ahora?', 'دراجة ثمنها 500 € خُفّضت 20٪ ثم 10٪ أخرى. كم ثمنها الآن؟', 'A €500 bike is marked down by 20%, and then by another 10%. How much does it cost now?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizeak.', 'Los índices.', 'المؤشرات.', 'The multipliers.'), math: same('$0{,}8\\cdot 0{,}9=0{,}72$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.', 'Multiply.'), math: same('$500\\cdot 0{,}72=360$') },
            { text: say('% 28 merkeago, ez % 30.', 'Un 28 % más barata, no un 30 %.', 'أرخص بـ28٪ لا بـ30٪.', '28% cheaper, not 30%.') }
        ],
        takeaway: say('Kateatuak: indizeak biderkatu, ez ehunekoak batu.', 'Encadenados: multiplica los índices, no sumes los porcentajes.', 'المتتالية: اضرب المؤشرات ولا تجمع النسب.', 'Chained changes: multiply the multipliers, don\'t add the percentages.'),
        figure: (language) => <ChainedFigure language={language} />
    },
    {
        id: 'interest',
        stage: 'changes',
        title: say('Interes bakuna', 'El interés simple', 'الفائدة البسيطة', 'Simple interest'),
        goal: say('Kapital batek urte batzuetan sortzen duen interes bakuna kalkulatzea.', 'Calcular el interés simple que produce un capital en unos años.', 'حساب الفائدة البسيطة التي يُنتجها رأس مال في عدة سنوات.', 'Calculate the simple interest that a sum of money earns over some years.'),
        problem: say('3000 €-ko mailegu bat % 8an hartu eta 2 urtera itzultzen da. Zenbat interes ordaindu behar da?', 'Se pide un préstamo de 3000 € al 8 % y se devuelve a los 2 años. ¿Cuánto interés hay que pagar?', 'اقترضنا 3000 € بفائدة 8٪ وسددناها بعد سنتين. كم فائدة يجب دفعها؟', 'A loan of €3,000 at 8% is taken out and repaid after 2 years. How much interest has to be paid?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Urte bateko interesa.', 'Interés de un año.', 'فائدة سنة.', 'Interest for one year.'), math: same('$3000\\cdot 8\\mathbin{:}100=240$') },
            { text: say('Bi urtetan.', 'En dos años.', 'في سنتين.', 'For two years.'), math: same('$240\\cdot 2=480$') }
        ],
        takeaway: say('$I=\\frac{C\\cdot r\\cdot t}{100}$; amaierako kapitala $C+I$.', '$I=\\frac{C\\cdot r\\cdot t}{100}$; capital final $C+I$.', '$I=\\frac{C\\cdot r\\cdot t}{100}$؛ رأس المال النهائي $C+I$.', '$I=\\frac{C\\cdot r\\cdot t}{100}$; final amount $C+I$.'),
        figure: (language) => <InterestFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const proportionDbh2Topics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...proportionLessonTexts[topic.id as ProportionTopicId], ...proportionLessonChecks[topic.id as ProportionTopicId] }))

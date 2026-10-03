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
    { id: 'proportions', tone: 'blue', title: { eu: 'Proportzioak (errepasoa)', es: 'Proporciones (repaso)', ar: 'التناسبات (مراجعة)' } },
    { id: 'compound', tone: 'violet', title: { eu: 'Proportzionaltasun konposatua', es: 'Proporcionalidad compuesta', ar: 'التناسب المركّب' } },
    { id: 'shares', tone: 'mustard', title: { eu: 'Banaketa proportzionalak', es: 'Repartos proporcionales', ar: 'التوزيعات التناسبية' } },
    { id: 'percent', tone: 'coral', title: { eu: 'Ehunekoak', es: 'Porcentajes', ar: 'النسب المئوية' } },
    { id: 'changes', tone: 'green', title: { eu: 'Aldakuntzak eta interesa', es: 'Variaciones e interés', ar: 'التغيّرات والفائدة' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const proportionDbh2Topics: UnitTopic[] = [
    /* ---------- 1. Review ---------- */
    {
        id: 'proportion-review',
        stage: 'proportions',
        title: say('Arrazoiak eta proportzioak', 'Razones y proporciones', 'النسب والتناسبات'),
        goal: say('Proportzio batean laugarren proportzionala aurkitzea.', 'Hallar el cuarto proporcional en una proporción.', 'إيجاد الرابع المتناسب في تناسب.'),
        explanation: say(
            'Bi kantitateren arrazoia haien zatidura da, $\\frac{a}{b}$, eta proportzioa bi arrazoiren berdintasuna, $\\frac{a}{b}=\\frac{c}{d}$. Proportzio batean muturren biderkadura eta erdikoena berdinak dira: $a\\cdot d=b\\cdot c$. Hiru gai ezagutzen badira, laugarrena (laugarren proportzionala) kalkula daiteke: $\\frac{3}{5}=\\frac{45}{x}$ bada, $3\\cdot x=5\\cdot 45=225$ eta $x=75$. Arrazoiak ez du unitaterik behar izaten, baina magnitude desberdinen artekoak bai: 120 km 2 orduan, $60$ km/h.',
            'La razón de dos cantidades es su cociente, $\\frac{a}{b}$, y una proporción es la igualdad de dos razones, $\\frac{a}{b}=\\frac{c}{d}$. En una proporción el producto de extremos es igual al de medios: $a\\cdot d=b\\cdot c$. Si se conocen tres términos, se calcula el cuarto (el cuarto proporcional): si $\\frac{3}{5}=\\frac{45}{x}$, entonces $3\\cdot x=5\\cdot 45=225$ y $x=75$. Una razón entre cantidades de la misma magnitud no lleva unidades, pero entre magnitudes distintas sí: 120 km en 2 horas, $60$ km/h.',
            'نسبة كميتين هي حاصل قسمتهما $\\frac{a}{b}$، والتناسب تساوي نسبتين $\\frac{a}{b}=\\frac{c}{d}$. وفي التناسب حاصل ضرب الطرفين يساوي حاصل ضرب الوسطين: $a\\cdot d=b\\cdot c$. فإذا عُرفت ثلاثة حدود حُسب الرابع (الرابع المتناسب): إذا كان $\\frac{3}{5}=\\frac{45}{x}$ فإن $3\\cdot x=5\\cdot 45=225$ و$x=75$. والنسبة بين كميتين من المقدار نفسه بلا وحدة، أما بين مقدارين مختلفين فلها وحدة: 120 كم في ساعتين، $60$ كم/س.'
        ),
        problem: say('Markosen eta bere aitaren pisuen arrazoia $\\frac{3}{5}$ da. Markosek 45 kg pisatzen ditu. Zenbat pisatzen du aitak?', 'La razón de los pesos de Marcos y su padre es $\\frac{3}{5}$. Marcos pesa 45 kg. ¿Cuánto pesa su padre?', 'نسبة وزن ماركوس إلى وزن أبيه $\\frac{3}{5}$. يزن ماركوس 45 كغ. كم يزن أبوه؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi proportzioa.', 'Escribe la proporción.', 'اكتب التناسب.'), math: same('$\\frac{3}{5}=\\frac{45}{x}$') },
            { text: say('Gurutzeko biderkadurak.', 'Productos cruzados.', 'الضرب التبادلي.'), math: same('$3\\cdot x=5\\cdot 45=225$') },
            { text: say('Aitak 75 kg.', 'El padre pesa 75 kg.', 'يزن الأب 75 كغ.'), math: same('$x=225\\mathbin{:}3=75$') }
        ],
        example: same('$\\frac{a}{b}=\\frac{c}{d}\\ \\to\\ a\\cdot d=b\\cdot c$'),
        takeaway: say('Laugarren proportzionala: $x=\\frac{b\\cdot c}{a}$.', 'Cuarto proporcional: $x=\\frac{b\\cdot c}{a}$.', 'الرابع المتناسب: $x=\\frac{b\\cdot c}{a}$.'),
        figure: (language) => <ProportionFigure language={language} />
    },
    {
        id: 'direct-review',
        stage: 'proportions',
        title: say('Proportzionaltasun zuzena', 'Proporcionalidad directa', 'التناسب الطردي'),
        goal: say('Proportzionaltasun zuzeneko problemak hiruko erregela zuzenaz edo unitatera laburtuz ebaztea.', 'Resolver problemas de proporcionalidad directa con la regla de tres directa o reduciendo a la unidad.', 'حلّ مسائل التناسب الطردي بقاعدة الثلاثة الطردية أو بالإرجاع إلى الوحدة.'),
        explanation: say(
            'Bi magnitude zuzenki proportzionalak dira bat bider zenbaki bat egitean bestea ere zenbaki horrekin biderkatzen bada. Orduan balio korrespondenteen zatidura konstantea da: proportzionaltasun-konstantea. Problemak bi eratara ebazten dira: unitatera laburtuz (lehenik 1en balioa, gero nahi dena) edo hiruko erregela zuzenaz, $\\frac{a}{b}=\\frac{c}{x}$. Kontuz: bat handitzean bestea handitzea ez da nahikoa; proportzio berean handitu behar du.',
            'Dos magnitudes son directamente proporcionales si al multiplicar una por un número la otra queda multiplicada por el mismo número. Entonces el cociente de los valores correspondientes es constante: la constante de proporcionalidad. Los problemas se resuelven de dos maneras: reduciendo a la unidad (primero el valor de 1, luego lo que se pide) o con la regla de tres directa, $\\frac{a}{b}=\\frac{c}{x}$. Cuidado: no basta con que al crecer una crezca la otra; tiene que crecer en la misma proporción.',
            'يكون المقداران متناسبين طرديًا إذا ضُرب أحدهما في عدد فضُرب الآخر في العدد نفسه. عندئذ يكون حاصل قسمة القيم المتقابلة ثابتًا: ثابت التناسب. وتُحل المسائل بطريقتين: الإرجاع إلى الوحدة (قيمة الواحد أولًا ثم المطلوب) أو قاعدة الثلاثة الطردية $\\frac{a}{b}=\\frac{c}{x}$. انتبه: لا يكفي أن يزيد أحدهما حين يزيد الآخر؛ يجب أن يزيد بالنسبة نفسها.'
        ),
        problem: say('Txirrindulari batek 200 m egiten ditu 20 segundotan, abiadura berean. Zenbat metro egingo ditu 3 minututan?', 'Un ciclista recorre 200 m en 20 segundos, a velocidad constante. ¿Cuántos metros recorrerá en 3 minutos?', 'يقطع دراج 200 م في 20 ثانية بسرعة ثابتة. كم مترًا يقطع في 3 دقائق؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Unitate berean: 3 min = 180 s.', 'En la misma unidad: 3 min = 180 s.', 'بالوحدة نفسها: 3 د = 180 ث.') },
            { text: say('Segundo batean.', 'En un segundo.', 'في ثانية واحدة.'), math: same('$200\\mathbin{:}20=10$') },
            { text: say('180 segundotan.', 'En 180 segundos.', 'في 180 ثانية.'), math: same('$10\\cdot 180=1800$') }
        ],
        example: same('$\\frac{20}{200}=\\frac{180}{x}\\ \\to\\ x=\\frac{200\\cdot 180}{20}=1800$'),
        takeaway: say('Zuzena: gehiago → gehiago, eta zatidura konstantea.', 'Directa: más → más, y el cociente constante.', 'طردي: أكثر ← أكثر، وحاصل القسمة ثابت.'),
        figure: (language) => <DirectTableFigure language={language} />
    },
    {
        id: 'inverse-review',
        stage: 'proportions',
        title: say('Alderantzizko proportzionaltasuna', 'Proporcionalidad inversa', 'التناسب العكسي'),
        goal: say('Alderantzizko proportzionaltasuneko problemak biderkadura konstantea erabiliz ebaztea.', 'Resolver problemas de proporcionalidad inversa usando el producto constante.', 'حلّ مسائل التناسب العكسي باستعمال حاصل الضرب الثابت.'),
        explanation: say(
            'Bi magnitude alderantziz proportzionalak dira bat bider zenbaki bat egitean bestea zenbaki horrekin zatitzen bada: bikoitza → erdia. Orduan balio korrespondenteen biderkadura konstantea da. Adibidez, abiadura eta denbora ibilbide berean: 72 km/h-ra 7 orduan egiten bada, ibilbidea $72\\cdot 7=504$ km da, eta 6 orduan egiteko $504\\mathbin{:}6=84$ km/h behar dira. Hiruko erregela alderantzizkoan, lerro bakoitzeko biderkadurak berdintzen dira: $a\\cdot b=c\\cdot x$.',
            'Dos magnitudes son inversamente proporcionales si al multiplicar una por un número la otra queda dividida por ese número: doble → mitad. Entonces el producto de los valores correspondientes es constante. Por ejemplo, la velocidad y el tiempo en un mismo trayecto: si a 72 km/h se tarda 7 horas, el trayecto mide $72\\cdot 7=504$ km, y para hacerlo en 6 horas hacen falta $504\\mathbin{:}6=84$ km/h. En la regla de tres inversa se igualan los productos de cada fila: $a\\cdot b=c\\cdot x$.',
            'يكون المقداران متناسبين عكسيًا إذا ضُرب أحدهما في عدد فقُسم الآخر على ذلك العدد: الضعف ← النصف. عندئذ يكون حاصل ضرب القيم المتقابلة ثابتًا. مثلًا السرعة والزمن في المسار نفسه: إذا استغرق بسرعة 72 كم/س سبع ساعات فطول المسار $72\\cdot 7=504$ كم، ولقطعه في 6 ساعات نحتاج $504\\mathbin{:}6=84$ كم/س. وفي قاعدة الثلاثة العكسية نساوي حاصلي ضرب السطرين: $a\\cdot b=c\\cdot x$.'
        ),
        problem: say('Merkantzia-tren batek 7 ordu behar ditu 72 km/h-ra. Zer abiadurarekin egingo luke 6 ordutan?', 'Un tren de mercancías tarda 7 horas a 72 km/h. ¿A qué velocidad tendría que ir para tardar 6 horas?', 'يستغرق قطار بضائع 7 ساعات بسرعة 72 كم/س. بأي سرعة يجب أن يسير ليستغرق 6 ساعات؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Denbora gutxiago → abiadura handiagoa: alderantzizkoa.', 'Menos tiempo → más velocidad: inversa.', 'زمن أقل ← سرعة أكبر: عكسي.') },
            { text: say('Biderkadurak berdindu.', 'Iguala los productos.', 'ساوِ حاصلي الضرب.'), math: same('$72\\cdot 7=6\\cdot x=504$') },
            { text: say('Zatitu.', 'Divide.', 'اقسم.'), math: same('$x=504\\mathbin{:}6=84$') }
        ],
        example: same('$3\\cdot 15=6\\cdot 7{,}5=9\\cdot 5=45$'),
        takeaway: say('Alderantzizkoa: gehiago → gutxiago, eta biderkadura konstantea.', 'Inversa: más → menos, y el producto constante.', 'عكسي: أكثر ← أقل، وحاصل الضرب ثابت.'),
        figure: (language) => <InverseTableFigure language={language} />
    },

    /* ---------- 2. Compound proportionality ---------- */
    {
        id: 'compound-direct',
        stage: 'compound',
        title: say('Bi erlazio zuzen', 'Dos relaciones directas', 'علاقتان طرديتان'),
        goal: say('Hiru magnitude edo gehiago dituzten problemak ebaztea, erlazio guztiak zuzenak direnean.', 'Resolver problemas con tres o más magnitudes cuando todas las relaciones son directas.', 'حلّ مسائل فيها ثلاثة مقادير أو أكثر عندما تكون كل العلاقات طردية.'),
        explanation: say(
            'Proportzionaltasun konposatuan hiru magnitude edo gehiago daude. Ezezaguna duen magnitudea beste bakoitzarekin konparatzen da, banan-banan, besteak aldatu gabe daudela pentsatuz. Igeltsero talde batek, egunean 10 ordu lan eginez, 600 m² horma egin ditu 18 egunetan. Egunean 8 ordu eta 15 egunetan? Ordu gehiago → m² gehiago (zuzena); egun gehiago → m² gehiago (zuzena). Beraz, 600 bider bi zatidurak, biak zuzen jarrita: $600\\cdot\\frac{8}{10}\\cdot\\frac{15}{18}=400$ m².',
            'En la proporcionalidad compuesta intervienen tres o más magnitudes. La magnitud de la incógnita se compara con cada una de las otras, de una en una, imaginando que las demás no cambian. Una cuadrilla de albañiles, trabajando 10 horas al día, ha construido 600 m² de pared en 18 días. ¿Y con 8 horas al día y 15 días? Más horas → más m² (directa); más días → más m² (directa). Así que 600 por los dos cocientes, puestos en el mismo orden: $600\\cdot\\frac{8}{10}\\cdot\\frac{15}{18}=400$ m².',
            'في التناسب المركّب ثلاثة مقادير أو أكثر. نقارن مقدار المجهول بكل مقدار آخر على حدة، ونتخيل أن الباقي لا يتغير. بنت مجموعة بنّائين تعمل 10 ساعات يوميًا 600 م² من الجدار في 18 يومًا. فكم تبني بـ8 ساعات يوميًا و15 يومًا؟ ساعات أكثر ← م² أكثر (طردي)؛ أيام أكثر ← م² أكثر (طردي). إذن 600 في الكسرين بالترتيب نفسه: $600\\cdot\\frac{8}{10}\\cdot\\frac{15}{18}=400$ م².'
        ),
        problem: say('5 makinak, egunean 6 ordu, 1500 pieza egiten dituzte. Zenbat pieza 4 makinak egunean 9 ordu?', '5 máquinas, 6 horas al día, fabrican 1500 piezas. ¿Cuántas piezas fabrican 4 máquinas 9 horas al día?', '5 آلات تعمل 6 ساعات يوميًا تصنع 1500 قطعة. كم قطعة تصنع 4 آلات تعمل 9 ساعات يوميًا؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Makina gehiago → pieza gehiago: zuzena.', 'Más máquinas → más piezas: directa.', 'آلات أكثر ← قطع أكثر: طردي.'), math: same('$\\frac{4}{5}$') },
            { text: say('Ordu gehiago → pieza gehiago: zuzena.', 'Más horas → más piezas: directa.', 'ساعات أكثر ← قطع أكثر: طردي.'), math: same('$\\frac{9}{6}$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.'), math: same('$1500\\cdot\\frac{4}{5}\\cdot\\frac{9}{6}=1800$') }
        ],
        example: same('$600\\cdot\\frac{8}{10}\\cdot\\frac{15}{18}=400$'),
        takeaway: say('Magnitude bakoitza bere aldetik konparatu; zuzenak: zatidura berria/zaharra.', 'Compara cada magnitud por separado; las directas: cociente nuevo/viejo.', 'قارن كل مقدار على حدة؛ الطردية: الكسر الجديد/القديم.'),
        figure: (language) => <CompoundDirectFigure language={language} />
    },
    {
        id: 'compound-mixed',
        stage: 'compound',
        title: say('Erlazio zuzenak eta alderantzizkoak', 'Relaciones directas e inversas', 'علاقات طردية وعكسية'),
        goal: say('Proportzionaltasun konposatuko problemak ebaztea erlazio zuzenak eta alderantzizkoak nahasten direnean.', 'Resolver problemas de proporcionalidad compuesta que mezclan relaciones directas e inversas.', 'حلّ مسائل التناسب المركّب التي تمزج علاقات طردية وعكسية.'),
        explanation: say(
            'Erlazio bat alderantzizkoa denean, haren zatidura buruz behera jartzen da (zaharra/berria). Nekazari batek 294 kg pentsu behar izan ditu 15 behi 7 egunez elikatzeko. 840 kg-rekin, zenbat egun elika ditzake 10 behi? Pentsu gehiago → egun gehiago: zuzena, $\\frac{840}{294}$. Behi gutxiago → egun gehiago: alderantzizkoa, $\\frac{15}{10}$. Beraz $7\\cdot\\frac{840}{294}\\cdot\\frac{15}{10}=30$ egun. Galdera bera beti: «besteak berdin badaude, hau handitzean ezezaguna handitu ala txikitu egiten da?»',
            'Cuando una relación es inversa, su cociente se pone al revés (viejo/nuevo). Un granjero ha necesitado 294 kg de pienso para alimentar a 15 vacas durante 7 días. Con 840 kg, ¿cuántos días puede alimentar a 10 vacas? Más pienso → más días: directa, $\\frac{840}{294}$. Menos vacas → más días: inversa, $\\frac{15}{10}$. Así que $7\\cdot\\frac{840}{294}\\cdot\\frac{15}{10}=30$ días. La pregunta es siempre la misma: «si lo demás no cambia, al crecer esta, ¿la incógnita crece o decrece?»',
            'إذا كانت العلاقة عكسية نقلب كسرها (القديم/الجديد). احتاج مزارع 294 كغ من العلف ليطعم 15 بقرة 7 أيام. فبـ840 كغ، كم يومًا يطعم 10 أبقار؟ علف أكثر ← أيام أكثر: طردي، $\\frac{840}{294}$. أبقار أقل ← أيام أكثر: عكسي، $\\frac{15}{10}$. إذن $7\\cdot\\frac{840}{294}\\cdot\\frac{15}{10}=30$ يومًا. والسؤال دائمًا: «إذا بقي الباقي ثابتًا، فحين يزيد هذا المقدار هل يزيد المجهول أم ينقص؟»'
        ),
        problem: say('Hondeamakina batek, egunean 10 ordu, 1000 m-ko zanga egiten du 8 egunetan. Zenbat egun beharko ditu 600 m-ko zanga egiteko, egunean 12 ordu?', 'Una excavadora, trabajando 10 horas al día, abre una zanja de 1000 m en 8 días. ¿Cuánto tardará en abrir una de 600 m trabajando 12 horas al día?', 'تحفر حفّارة تعمل 10 ساعات يوميًا خندقًا طوله 1000 م في 8 أيام. كم يومًا تحتاج لخندق طوله 600 م إذا عملت 12 ساعة يوميًا؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Metro gutxiago → egun gutxiago: zuzena.', 'Menos metros → menos días: directa.', 'أمتار أقل ← أيام أقل: طردي.'), math: same('$\\frac{600}{1000}$') },
            { text: say('Ordu gehiago → egun gutxiago: alderantzizkoa.', 'Más horas → menos días: inversa.', 'ساعات أكثر ← أيام أقل: عكسي.'), math: same('$\\frac{10}{12}$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.'), math: same('$8\\cdot\\frac{600}{1000}\\cdot\\frac{10}{12}=4$') }
        ],
        example: same('$7\\cdot\\frac{840}{294}\\cdot\\frac{15}{10}=30$'),
        takeaway: say('Zuzena: berria/zaharra. Alderantzizkoa: zaharra/berria.', 'Directa: nuevo/viejo. Inversa: viejo/nuevo.', 'الطردي: الجديد/القديم. العكسي: القديم/الجديد.'),
        figure: (language) => <CompoundMixedFigure language={language} />
    },
    {
        id: 'compound-unit',
        stage: 'compound',
        title: say('Unitatera laburtuz, urratsez urrats', 'Reduciendo a la unidad, paso a paso', 'بالإرجاع إلى الوحدة خطوة خطوة'),
        goal: say('Proportzionaltasun konposatuko problemak magnitude bat aldi berean aldatuz ebaztea.', 'Resolver problemas de proporcionalidad compuesta cambiando una magnitud cada vez.', 'حلّ مسائل التناسب المركّب بتغيير مقدار واحد في كل مرة.'),
        explanation: say(
            'Formula bat gogoratu beharrean, magnitude bat aldi berean alda daiteke, gainerakoak finko utzita, proportzionaltasun soileko pausoak bezala. Hiru aspertsorek, 1,5 l/s bakoitzak, ur-biltegia 8 orduan husten dute. Lau aspertsorek 0,9 l/s-rekin? Aspertsore bakarra: 3 aldiz denbora gehiago, 24 h. Lau: 4 aldiz gutxiago, 6 h (1,5 l/s-rekin). Emari txikiagoarekin denbora gehiago: $6\\cdot 1{,}5\\mathbin{:}0{,}9=10$ h. Edo ur osoarekin: $3\\cdot 1{,}5=4{,}5$ l/s eta $4\\cdot 0{,}9=3{,}6$ l/s; $4{,}5\\cdot 8=3{,}6\\cdot x$, $x=10$ h.',
            'En lugar de recordar una fórmula, se puede cambiar una magnitud cada vez, dejando fijas las demás, como pasos de proporcionalidad simple. Tres aspersores de 1,5 l/s cada uno vacían un depósito en 8 horas. ¿Y cuatro aspersores de 0,9 l/s? Con un solo aspersor: tres veces más tiempo, 24 h. Con cuatro: cuatro veces menos, 6 h (a 1,5 l/s). Con menos caudal, más tiempo: $6\\cdot 1{,}5\\mathbin{:}0{,}9=10$ h. O con el agua total: $3\\cdot 1{,}5=4{,}5$ l/s y $4\\cdot 0{,}9=3{,}6$ l/s; $4{,}5\\cdot 8=3{,}6\\cdot x$, $x=10$ h.',
            'بدل حفظ صيغة يمكن تغيير مقدار واحد في كل مرة مع تثبيت الباقي، كخطوات تناسب بسيط. ثلاث رشّاشات تدفق كل منها 1.5 ل/ث تفرغ خزانًا في 8 ساعات. فماذا عن أربع رشّاشات تدفقها 0.9 ل/ث؟ برشّاش واحد: ثلاثة أضعاف الزمن، 24 س. وبأربعة: أقل بأربع مرات، 6 س (بتدفق 1.5). وبتدفق أقل زمن أكثر: $6\\cdot 1{,}5\\mathbin{:}0{,}9=10$ س. أو بالماء الكلي: $3\\cdot 1{,}5=4{,}5$ ل/ث و$4\\cdot 0{,}9=3{,}6$ ل/ث؛ $4{,}5\\cdot 8=3{,}6\\cdot x$، $x=10$ س.'
        ),
        problem: say('6 lagunek 4 egunetan 72 € gastatzen dituzte janarian. Zenbat gastatuko dute 9 lagunek 5 egunetan?', '6 amigos gastan 72 € en comida en 4 días. ¿Cuánto gastarán 9 amigos en 5 días?', '6 أصدقاء ينفقون 72 € على الطعام في 4 أيام. كم ينفق 9 أصدقاء في 5 أيام؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lagun batek, 4 egunetan.', 'Un amigo, en 4 días.', 'صديق واحد في 4 أيام.'), math: same('$72\\mathbin{:}6=12$') },
            { text: say('Lagun batek, egun batean.', 'Un amigo, en un día.', 'صديق واحد في يوم.'), math: same('$12\\mathbin{:}4=3$') },
            { text: say('9 lagunek, 5 egunetan.', '9 amigos, en 5 días.', '9 أصدقاء في 5 أيام.'), math: same('$3\\cdot 9\\cdot 5=135$') }
        ],
        example: same('$4{,}5\\cdot 8=3{,}6\\cdot x\\ \\to\\ x=36\\mathbin{:}3{,}6=10$'),
        takeaway: say('Magnitude bat aldi berean: bakoitza proportzionaltasun soil bat da.', 'Una magnitud cada vez: cada paso es una proporcionalidad simple.', 'مقدار واحد في كل مرة: كل خطوة تناسب بسيط.'),
        figure: (language) => <CompoundUnitFigure language={language} />
    },

    /* ---------- 3. Proportional shares ---------- */
    {
        id: 'direct-share',
        stage: 'shares',
        title: say('Banaketa zuzenki proportzionala', 'Reparto directamente proporcional', 'التوزيع الطردي'),
        goal: say('Kantitate bat zenbaki batzuekiko zuzenki proportzionalak diren zatitan banatzea.', 'Repartir una cantidad en partes directamente proporcionales a unos números.', 'توزيع كمية إلى أجزاء متناسبة طرديًا مع أعداد معطاة.'),
        explanation: say(
            'Banaketa zuzenki proportzionalean, zenbaki handiagoari zati handiagoa dagokio. Batu zenbakiak, zatitu kantitatea batura horren artean (zati bakoitzaren balioa, $p$) eta biderkatu zenbaki bakoitza $p$-z. 180 banatu 2, 5 eta 8rekiko zuzenki proportzionalki: $2+5+8=15$ zati; $180\\mathbin{:}15=12$; zatiak $2\\cdot 12=24$, $5\\cdot 12=60$ eta $8\\cdot 12=96$. Egiaztatu: $24+60+96=180$.',
            'En un reparto directamente proporcional, al número mayor le toca la parte mayor. Suma los números, divide la cantidad entre esa suma (el valor de cada parte, $p$) y multiplica cada número por $p$. Reparte 180 en partes directamente proporcionales a 2, 5 y 8: $2+5+8=15$ partes; $180\\mathbin{:}15=12$; las partes son $2\\cdot 12=24$, $5\\cdot 12=60$ y $8\\cdot 12=96$. Comprueba: $24+60+96=180$.',
            'في التوزيع الطردي يأخذ العدد الأكبر الجزء الأكبر. اجمع الأعداد، واقسم الكمية على المجموع (قيمة الجزء الواحد $p$)، ثم اضرب كل عدد في $p$. وزّع 180 طرديًا على 2 و5 و8: $2+5+8=15$ جزءًا؛ $180\\mathbin{:}15=12$؛ الأجزاء $2\\cdot 12=24$ و$5\\cdot 12=60$ و$8\\cdot 12=96$. تحقّق: $24+60+96=180$.'
        ),
        problem: say('Hiru lagunek 3 €, 5 € eta 7 € jarri zituzten loteria-zenbaki batean, eta 450 € irabazi dituzte. Zenbat dagokio bakoitzari?', 'Tres amigos pusieron 3 €, 5 € y 7 € en un número de lotería y han ganado 450 €. ¿Cuánto le toca a cada uno?', 'وضع ثلاثة أصدقاء 3 € و5 € و7 € في رقم يانصيب وربحوا 450 €. كم نصيب كل واحد؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatiak guztira.', 'Partes en total.', 'مجموع الأجزاء.'), math: same('$3+5+7=15$') },
            { text: say('Zati baten balioa.', 'Valor de una parte.', 'قيمة الجزء الواحد.'), math: same('$450\\mathbin{:}15=30$') },
            { text: say('Bakoitzari.', 'A cada uno.', 'لكل واحد.'), math: same('$90,\\ 150,\\ 210$') }
        ],
        example: same('$180\\mathbin{:}(2+5+8)=12\\ \\to\\ 24,\\ 60,\\ 96$'),
        takeaway: say('Zuzena: kantitatea : batura, gero bider zenbaki bakoitza.', 'Directo: cantidad : suma, y luego por cada número.', 'الطردي: الكمية : المجموع ثم في كل عدد.'),
        figure: (language) => <DirectShareFigure language={language} />
    },
    {
        id: 'share-problems',
        stage: 'shares',
        title: say('Banaketak problemetan eta zatikiekin', 'Repartos en problemas y con fracciones', 'التوزيع في المسائل وبالكسور'),
        goal: say('Banaketa proportzionalak egunekin, orduekin edo zatikiekin ebaztea.', 'Resolver repartos proporcionales con días, horas o fracciones.', 'حلّ توزيعات تناسبية بالأيام أو الساعات أو الكسور.'),
        explanation: say(
            'Problemetan, zenbakiak sarritan egunak, orduak edo jarritako dirua dira. Hiru familiak apartamentu bat alokatu dute 20 egunez 1200 €-an: lehenengoak 7 egun, bigarrenak 6 eta hirugarrenak 7. Egun bakoitzak $1200\\mathbin{:}20=60$ € balio du: 420 €, 360 € eta 420 €. Zenbakiak zatikiak direnean, idatzi izendatzaile berarekin eta banatu zenbakitzaileen arabera: $\\frac{1}{2},\\frac{1}{3},\\frac{1}{4}=\\frac{6}{12},\\frac{4}{12},\\frac{3}{12}$, beraz 6, 4 eta 3rekiko banaketa da.',
            'En los problemas, los números suelen ser días, horas o el dinero puesto. Tres familias alquilan un apartamento 20 días por 1200 €: la primera está 7 días, la segunda 6 y la tercera 7. Cada día vale $1200\\mathbin{:}20=60$ €: 420 €, 360 € y 420 €. Cuando los números son fracciones, escríbelas con el mismo denominador y reparte según los numeradores: $\\frac{1}{2},\\frac{1}{3},\\frac{1}{4}=\\frac{6}{12},\\frac{4}{12},\\frac{3}{12}$, así que es un reparto proporcional a 6, 4 y 3.',
            'في المسائل تكون الأعداد غالبًا أيامًا أو ساعات أو مالًا مدفوعًا. استأجرت ثلاث عائلات شقة 20 يومًا بـ1200 €: الأولى 7 أيام والثانية 6 والثالثة 7. قيمة اليوم $1200\\mathbin{:}20=60$ €: 420 € و360 € و420 €. وإذا كانت الأعداد كسورًا فاكتبها بالمقام نفسه ووزّع حسب البسوط: $\\frac{1}{2},\\frac{1}{3},\\frac{1}{4}=\\frac{6}{12},\\frac{4}{12},\\frac{3}{12}$، فهو توزيع متناسب مع 6 و4 و3.'
        ),
        problem: say('Banatu 130 zuzenki proportzionalki $\\frac{1}{2}$, $\\frac{1}{3}$ eta $\\frac{1}{4}$-rekiko.', 'Reparte 130 en partes directamente proporcionales a $\\frac{1}{2}$, $\\frac{1}{3}$ y $\\frac{1}{4}$.', 'وزّع 130 طرديًا على $\\frac{1}{2}$ و$\\frac{1}{3}$ و$\\frac{1}{4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzaile bera.', 'Mismo denominador.', 'المقام نفسه.'), math: same('$\\frac{6}{12},\\ \\frac{4}{12},\\ \\frac{3}{12}$') },
            { text: say('6, 4 eta 3rekiko: 13 zati.', 'Proporcional a 6, 4 y 3: 13 partes.', 'متناسب مع 6 و4 و3: 13 جزءًا.'), math: same('$130\\mathbin{:}13=10$') },
            { text: say('Zatiak.', 'Las partes.', 'الأجزاء.'), math: same('$60,\\ 40,\\ 30$') }
        ],
        example: same('$1200\\mathbin{:}20=60\\ \\to\\ 420,\\ 360,\\ 420$'),
        takeaway: say('Zatikiak: izendatzaile bera, eta banatu zenbakitzaileen arabera.', 'Fracciones: mismo denominador, y reparte según los numeradores.', 'الكسور: المقام نفسه ثم التوزيع حسب البسوط.'),
        figure: (language) => <ShareDaysFigure language={language} />
    },
    {
        id: 'inverse-share',
        stage: 'shares',
        title: say('Banaketa alderantziz proportzionala', 'Reparto inversamente proporcional', 'التوزيع العكسي'),
        goal: say('Kantitate bat zenbaki batzuekiko alderantziz proportzionalak diren zatitan banatzea.', 'Repartir una cantidad en partes inversamente proporcionales a unos números.', 'توزيع كمية إلى أجزاء متناسبة عكسيًا مع أعداد معطاة.'),
        explanation: say(
            'Alderantzizko banaketan, zenbaki handiagoari zati txikiagoa dagokio. Zenbakiekiko alderantziz proportzionala banatzea haien alderantzizkoekiko zuzenki banatzea da: 2, 3 eta 5ekiko alderantziz = $\\frac{1}{2}$, $\\frac{1}{3}$ eta $\\frac{1}{5}$-ekiko zuzenki. Izendatzaile berarekin $\\frac{15}{30},\\frac{10}{30},\\frac{6}{30}$: 15, 10 eta 6rekiko banaketa. 620 banatuz: $15+10+6=31$; $620\\mathbin{:}31=20$; zatiak 300, 200 eta 120. Telebista-lehiaketa bateko saria postuarekiko alderantziz banatzen da: lehenengoak gehien.',
            'En un reparto inverso, al número mayor le toca la parte menor. Repartir de forma inversamente proporcional a unos números es repartir de forma directa a sus inversos: inversamente a 2, 3 y 5 = directamente a $\\frac{1}{2}$, $\\frac{1}{3}$ y $\\frac{1}{5}$. Con el mismo denominador, $\\frac{15}{30},\\frac{10}{30},\\frac{6}{30}$: reparto proporcional a 15, 10 y 6. Repartiendo 620: $15+10+6=31$; $620\\mathbin{:}31=20$; las partes son 300, 200 y 120. El premio de un concurso se reparte de forma inversa al puesto: el primero, el que más.',
            'في التوزيع العكسي يأخذ العدد الأكبر الجزء الأصغر. التوزيع عكسيًا على أعداد هو التوزيع طرديًا على مقلوباتها: عكسيًا على 2 و3 و5 = طرديًا على $\\frac{1}{2}$ و$\\frac{1}{3}$ و$\\frac{1}{5}$. وبالمقام نفسه $\\frac{15}{30},\\frac{10}{30},\\frac{6}{30}$: توزيع متناسب مع 15 و10 و6. ولتوزيع 620: $15+10+6=31$؛ $620\\mathbin{:}31=20$؛ الأجزاء 300 و200 و120. وتوزَّع جائزة مسابقة عكسيًا مع الترتيب: الأول يأخذ الأكثر.'
        ),
        problem: say('22 000 €-ko saria hiru lehenengoen artean banatzen da, postuarekiko (1, 2 eta 3) alderantziz proportzionalki. Zenbat irabazten du bakoitzak?', 'Un premio de 22 000 € se reparte entre los tres primeros de forma inversamente proporcional al puesto (1, 2 y 3). ¿Cuánto gana cada uno?', 'تُوزَّع جائزة 22000 € على الثلاثة الأوائل عكسيًا مع الترتيب (1 و2 و3). كم يربح كل واحد؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alderantzizkoak, izendatzaile berarekin.', 'Los inversos, con el mismo denominador.', 'المقلوبات بالمقام نفسه.'), math: same('$\\frac{6}{6},\\ \\frac{3}{6},\\ \\frac{2}{6}$') },
            { text: say('6, 3 eta 2rekiko: 11 zati.', 'Proporcional a 6, 3 y 2: 11 partes.', 'متناسب مع 6 و3 و2: 11 جزءًا.'), math: same('$22\\,000\\mathbin{:}11=2000$') },
            { text: say('Sariak.', 'Los premios.', 'الجوائز.'), math: same('$12\\,000,\\ 6000,\\ 4000$') }
        ],
        example: same('$620\\mathbin{:}(15+10+6)=20\\ \\to\\ 300,\\ 200,\\ 120$'),
        takeaway: say('Alderantzizkoa: banatu alderantzizkoekiko zuzenki.', 'Inverso: reparte directamente a los inversos.', 'العكسي: وزّع طرديًا على المقلوبات.'),
        figure: (language) => <InverseShareFigure language={language} />
    },

    /* ---------- 4. Percentages ---------- */
    {
        id: 'percent-forms',
        stage: 'percent',
        title: say('Ehunekoa hamartar gisa', 'El porcentaje como decimal', 'النسبة المئوية عددًا عشريًا'),
        goal: say('Ehuneko bat hamartar gisa idaztea eta kantitate baten ehunekoa biderketa bakar batez kalkulatzea, % 100etik gorakoak barne.', 'Escribir un porcentaje como decimal y calcular el porcentaje de una cantidad con una sola multiplicación, también por encima del 100 %.', 'كتابة النسبة المئوية عددًا عشريًا وحساب نسبة من كمية بضربة واحدة، حتى فوق 100٪.'),
        explanation: say(
            'Ehuneko bat 100 izendatzailea duen zatiki bat da, eta hamartar gisa idatz daiteke: % 12 = $\\frac{12}{100}=0{,}12$; % 8 = $0{,}08$; % 2,5 = $0{,}025$. Kantitate baten ehunekoa kalkulatzeko, nahikoa da hamartarraz biderkatzea: 750en % 12 = $750\\cdot 0{,}12=90$. Ehunekoak 100 baino handiagoak ere izan daitezke: % 150 = $1{,}5$, eta 40ren % 150 = $40\\cdot 1{,}5=60$, kantitatea bera baino gehiago. Kontuz: % 5 ez da $0{,}5$, $0{,}05$ baizik.',
            'Un porcentaje es una fracción de denominador 100 y se puede escribir como decimal: 12 % = $\\frac{12}{100}=0{,}12$; 8 % = $0{,}08$; 2,5 % = $0{,}025$. Para calcular el porcentaje de una cantidad basta multiplicar por el decimal: 12 % de 750 = $750\\cdot 0{,}12=90$. Los porcentajes también pueden pasar de 100: 150 % = $1{,}5$, y el 150 % de 40 = $40\\cdot 1{,}5=60$, más que la cantidad. Cuidado: el 5 % no es $0{,}5$, sino $0{,}05$.',
            'النسبة المئوية كسر مقامه 100 ويمكن كتابتها عددًا عشريًا: 12٪ = $\\frac{12}{100}=0{,}12$؛ 8٪ = $0{,}08$؛ 2.5٪ = $0{,}025$. ولحساب نسبة من كمية يكفي الضرب في العدد العشري: 12٪ من 750 = $750\\cdot 0{,}12=90$. وقد تزيد النسبة على 100: 150٪ = $1{,}5$، و150٪ من 40 = $40\\cdot 1{,}5=60$، أكثر من الكمية. انتبه: 5٪ ليست $0{,}5$ بل $0{,}05$.'
        ),
        problem: say('Kalkulatu 200en % 115.', 'Calcula el 115 % de 200.', 'احسب 115٪ من 200.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Hamartar gisa.', 'Como decimal.', 'عددًا عشريًا.'), math: same('$115\\mathbin{:}100=1{,}15$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.'), math: same('$200\\cdot 1{,}15=230$') }
        ],
        example: same('$0{,}35\\quad 0{,}08\\quad 1{,}2\\quad 0{,}025$'),
        takeaway: say('% $p$ = $p\\mathbin{:}100$; kantitatea bider hamartarra.', '$p$ % = $p\\mathbin{:}100$; la cantidad por el decimal.', '$p$٪ = $p\\mathbin{:}100$؛ الكمية في العدد العشري.'),
        figure: (language) => <PercentFormsFigure language={language} />
    },
    {
        id: 'percent-total',
        stage: 'percent',
        title: say('Hasierako kantitatea', 'La cantidad inicial', 'الكمية الأصلية'),
        goal: say('Zati bat eta haren ehunekoa jakinda, osoa kalkulatzea.', 'Calcular el total conociendo una parte y su porcentaje.', 'حساب الكل بمعرفة جزء ونسبته المئوية.'),
        explanation: say(
            'Batzuetan zatia eta ehunekoa ezagutzen dira, eta osoa falta da. «$x$-ren % 12 = 42» idazten bada, $x\\cdot 0{,}12=42$, beraz $x=42\\mathbin{:}0{,}12=350$: zatia zati hamartarra. Hiruko erregelaz ere egin daiteke: % 12 → 42, % 100 → $x$. Egiaztatu beti: 350en % 12 = 42. Gaur entsegura 6 musikari falta dira, taldearen % 20: taldeak $6\\mathbin{:}0{,}20=30$ musikari ditu.',
            'A veces se conocen la parte y el porcentaje, y falta el total. Si se escribe «el 12 % de $x$ es 42», $x\\cdot 0{,}12=42$, así que $x=42\\mathbin{:}0{,}12=350$: la parte entre el decimal. También con regla de tres: 12 % → 42, 100 % → $x$. Comprueba siempre: el 12 % de 350 es 42. Hoy faltan al ensayo 6 músicos, el 20 % de la banda: la banda tiene $6\\mathbin{:}0{,}20=30$ músicos.',
            'أحيانًا نعرف الجزء والنسبة ويبقى الكل مجهولًا. إذا كتبنا «12٪ من $x$ تساوي 42» فإن $x\\cdot 0{,}12=42$، إذن $x=42\\mathbin{:}0{,}12=350$: الجزء على العدد العشري. ويمكن بقاعدة الثلاثة: 12٪ ← 42، و100٪ ← $x$. تحقّق دائمًا: 12٪ من 350 تساوي 42. غاب اليوم عن التدريب 6 موسيقيين، أي 20٪ من الفرقة: في الفرقة $6\\mathbin{:}0{,}20=30$ موسيقيًا.'
        ),
        problem: say('Artalde batean 14 ardi beltz daude, guztien % 8. Zenbat ardi ditu artaldeak?', 'En un rebaño hay 14 ovejas negras, el 8 % del total. ¿Cuántas ovejas tiene el rebaño?', 'في قطيع 14 نعجة سوداء، أي 8٪ من الكل. كم نعجة في القطيع؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi ekuazioa.', 'Escribe la ecuación.', 'اكتب المعادلة.'), math: same('$x\\cdot 0{,}08=14$') },
            { text: say('Zatitu hamartarraz.', 'Divide entre el decimal.', 'اقسم على العدد العشري.'), math: same('$x=14\\mathbin{:}0{,}08=175$') }
        ],
        example: same('$x\\cdot 0{,}12=42\\ \\to\\ x=42\\mathbin{:}0{,}12=350$'),
        takeaway: say('Osoa = zatia : hamartarra.', 'Total = parte : decimal.', 'الكل = الجزء : العدد العشري.'),
        figure: (language) => <PercentTotalFigure language={language} />
    },
    {
        id: 'percent-which',
        stage: 'percent',
        title: say('Zer ehuneko? Aldakuntzaren ehunekoa', '¿Qué porcentaje? El porcentaje de variación', 'أي نسبة؟ نسبة التغيّر'),
        goal: say('Zati batek osoaren zer ehuneko den eta kantitate batek zer ehuneko igo edo jaitsi den kalkulatzea.', 'Calcular qué porcentaje es una parte del total y en qué porcentaje ha subido o bajado una cantidad.', 'حساب نسبة جزء من الكل ونسبة ارتفاع كمية أو انخفاضها.'),
        explanation: say(
            'Ehunekoa = zatia : osoa · 100. Adrianok 200 € zituen eta 50 € gastatu ditu: $50\\mathbin{:}200\\cdot 100=25$, % 25. Kantitate bat aldatzen denean, kalkulatu amaierakoa hasierakoaren zer ehuneko den: salmentak 2500etik 2800era igo dira, $2800\\mathbin{:}2500\\cdot 100=112$, beraz % 112 → % 12 igo dira. Edo kalkulatu aldaketa eta zatitu hasierakoaz: $300\\mathbin{:}2500\\cdot 100=12$. Beti hasierako kantitatearekiko!',
            'Porcentaje = parte : total · 100. Adriano tenía 200 € y ha gastado 50 €: $50\\mathbin{:}200\\cdot 100=25$, el 25 %. Cuando una cantidad cambia, calcula qué porcentaje es la final de la inicial: las ventas han pasado de 2500 a 2800, $2800\\mathbin{:}2500\\cdot 100=112$, es decir, el 112 % → han subido un 12 %. O calcula el cambio y divide entre la inicial: $300\\mathbin{:}2500\\cdot 100=12$. ¡Siempre respecto de la cantidad inicial!',
            'النسبة = الجزء : الكل · 100. كان مع أدريانو 200 € وأنفق 50 €: $50\\mathbin{:}200\\cdot 100=25$، أي 25٪. وإذا تغيّرت كمية فاحسب نسبة النهائية إلى الأصلية: ارتفعت المبيعات من 2500 إلى 2800، $2800\\mathbin{:}2500\\cdot 100=112$، أي 112٪ ← ارتفعت 12٪. أو احسب التغيّر واقسمه على الأصلية: $300\\mathbin{:}2500\\cdot 100=12$. دائمًا بالنسبة إلى الكمية الأصلية!'
        ),
        problem: say('Hiru urte lehenago 280 000 € balio zuen etxe bat 350 000 €-an saldu da. Zer ehuneko igo da?', 'Una vivienda que costó 280 000 € hace tres años se ha vendido por 350 000 €. ¿Qué porcentaje ha subido?', 'بيع منزل بـ350000 € وكان ثمنه قبل ثلاث سنوات 280000 €. بأي نسبة ارتفع؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Amaierakoa : hasierakoa · 100.', 'Final : inicial · 100.', 'النهائية : الأصلية · 100.'), math: same('$350\\,000\\mathbin{:}280\\,000\\cdot 100=125$') },
            { text: say('% 125 → % 25 igo da.', '125 % → ha subido un 25 %.', '125٪ ← ارتفع 25٪.') }
        ],
        example: same('$50\\mathbin{:}200\\cdot 100=25$'),
        takeaway: say('Ehunekoa = zatia : osoa · 100. Aldakuntza: hasierakoarekiko.', 'Porcentaje = parte : total · 100. Variación: respecto de la inicial.', 'النسبة = الجزء : الكل · 100. والتغيّر: بالنسبة إلى الأصلية.'),
        figure: (language) => <PercentWhichFigure language={language} />
    },

    /* ---------- 5. Changes and interest ---------- */
    {
        id: 'index',
        stage: 'changes',
        title: say('Aldakuntza-indizea', 'El índice de variación', 'مؤشر التغيّر'),
        goal: say('Igoerak eta beherapenak indize batez biderkatuz kalkulatzea, eta hasierako kantitatea indizeaz zatituz.', 'Calcular aumentos y disminuciones multiplicando por un índice, y la cantidad inicial dividiendo entre él.', 'حساب الزيادات والتخفيضات بالضرب في مؤشر، والكمية الأصلية بالقسمة عليه.'),
        explanation: say(
            'Kantitate bat % $p$ igotzean, amaierakoa % $(100+p)$ da: biderkatu $1+\\frac{p}{100}$ indizeaz (% 12 igo → $\\cdot 1{,}12$). % $p$ jaistean, % $(100-p)$: biderkatu $1-\\frac{p}{100}$-z (% 15 merkatu → $\\cdot 0{,}85$). Amaierako = hasierako · indizea, beraz hasierako = amaierako : indizea. % 15 merkatutako gona batek 36,55 € balio du: $36{,}55\\mathbin{:}0{,}85=43$ € balio zuen. Kontuz: hasierakoa ez da amaierakoari % 15 gehituz lortzen.',
            'Al aumentar una cantidad un $p$ %, la final es el $(100+p)$ %: multiplica por el índice $1+\\frac{p}{100}$ (sube un 12 % → $\\cdot 1{,}12$). Al disminuir un $p$ %, el $(100-p)$ %: multiplica por $1-\\frac{p}{100}$ (rebaja del 15 % → $\\cdot 0{,}85$). Final = inicial · índice, así que inicial = final : índice. Una falda rebajada un 15 % cuesta 36,55 €: costaba $36{,}55\\mathbin{:}0{,}85=43$ €. Cuidado: la inicial no se obtiene sumando a la final un 15 %.',
            'عند زيادة كمية بنسبة $p$٪ تصبح النهائية $(100+p)$٪: اضرب في المؤشر $1+\\frac{p}{100}$ (زيادة 12٪ ← $\\cdot 1{,}12$). وعند إنقاصها $p$٪ تصبح $(100-p)$٪: اضرب في $1-\\frac{p}{100}$ (تخفيض 15٪ ← $\\cdot 0{,}85$). النهائية = الأصلية · المؤشر، إذن الأصلية = النهائية : المؤشر. تنورة مخفّضة 15٪ ثمنها 36.55 €: كان ثمنها $36{,}55\\mathbin{:}0{,}85=43$ €. انتبه: لا نحصل على الأصلية بإضافة 15٪ إلى النهائية.'
        ),
        problem: say('Martari soldata % 10 igo diote eta orain 1760 € irabazten ditu. Zenbat irabazten zuen lehen?', 'A Marta le han subido el sueldo un 10 % y ahora gana 1760 €. ¿Cuánto ganaba antes?', 'رُفع راتب مارتا 10٪ فصارت تربح 1760 €. كم كانت تربح قبل ذلك؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizea: % 110.', 'Índice: el 110 %.', 'المؤشر: 110٪.'), math: same('$1{,}10$') },
            { text: say('Hasierakoa = amaierakoa : indizea.', 'Inicial = final : índice.', 'الأصلية = النهائية : المؤشر.'), math: same('$1760\\mathbin{:}1{,}1=1600$') }
        ],
        example: same('$2500\\cdot 1{,}12=2800\\qquad 2800\\mathbin{:}1{,}12=2500$'),
        takeaway: say('Igo: $\\cdot(1+\\frac{p}{100})$. Jaitsi: $\\cdot(1-\\frac{p}{100})$. Atzera: zatitu.', 'Subir: $\\cdot(1+\\frac{p}{100})$. Bajar: $\\cdot(1-\\frac{p}{100})$. Hacia atrás: divide.', 'زيادة: $\\cdot(1+\\frac{p}{100})$. تخفيض: $\\cdot(1-\\frac{p}{100})$. للرجوع: اقسم.'),
        figure: (language) => <IndexFigure language={language} />
    },
    {
        id: 'chained',
        stage: 'changes',
        title: say('Ehuneko kateatuak', 'Porcentajes encadenados', 'النسب المتتالية'),
        goal: say('Bata bestearen atzetik egiten diren igoerak eta beherapenak indizeak biderkatuz kalkulatzea.', 'Calcular aumentos y disminuciones sucesivos multiplicando los índices.', 'حساب زيادات وتخفيضات متتالية بضرب المؤشرات.'),
        explanation: say(
            'Bi aldaketa jarraian egiten direnean, bigarrena lehenaren ondoren dagoen kantitateari aplikatzen zaio, ez hasierakoari. Horregatik indizeak biderkatzen dira, ez ehunekoak batzen. % 10 igo eta gero % 10 jaitsi: $1{,}1\\cdot 0{,}9=0{,}99$, beraz % 1 galtzen da, ez da hasierara itzultzen! 200 € balio duen jaka bat % 20 garestitu eta gero % 25 merkatzen da: $200\\cdot 1{,}2\\cdot 0{,}75=180$ €. Indize osoa $0{,}9$ da: % 10 merkeago, guztira.',
            'Cuando se hacen dos cambios seguidos, el segundo se aplica a la cantidad que queda tras el primero, no a la inicial. Por eso se multiplican los índices, no se suman los porcentajes. Subir un 10 % y luego bajar un 10 %: $1{,}1\\cdot 0{,}9=0{,}99$, así que se pierde un 1 %: ¡no se vuelve al principio! Una chaqueta de 200 € sube un 20 % y luego baja un 25 %: $200\\cdot 1{,}2\\cdot 0{,}75=180$ €. El índice total es $0{,}9$: un 10 % más barata en total.',
            'عند إجراء تغيّرين متتاليين يُطبَّق الثاني على الكمية الناتجة عن الأول لا على الأصلية. لذلك نضرب المؤشرات ولا نجمع النسب. زيادة 10٪ ثم تخفيض 10٪: $1{,}1\\cdot 0{,}9=0{,}99$، أي خسارة 1٪: لا نعود إلى البداية! سترة ثمنها 200 € ترتفع 20٪ ثم تنخفض 25٪: $200\\cdot 1{,}2\\cdot 0{,}75=180$ €. والمؤشر الكلي $0{,}9$: أرخص بـ10٪ إجمالًا.'
        ),
        problem: say('500 €-ko bizikleta bat % 20 merkatu dute, eta gero beste % 10. Zenbat balio du orain?', 'Una bici de 500 € se rebaja un 20 % y después otro 10 %. ¿Cuánto cuesta ahora?', 'دراجة ثمنها 500 € خُفّضت 20٪ ثم 10٪ أخرى. كم ثمنها الآن؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizeak.', 'Los índices.', 'المؤشرات.'), math: same('$0{,}8\\cdot 0{,}9=0{,}72$') },
            { text: say('Biderkatu.', 'Multiplica.', 'اضرب.'), math: same('$500\\cdot 0{,}72=360$') },
            { text: say('% 28 merkeago, ez % 30.', 'Un 28 % más barata, no un 30 %.', 'أرخص بـ28٪ لا بـ30٪.') }
        ],
        example: same('$1{,}1\\cdot 0{,}9=0{,}99$'),
        takeaway: say('Kateatuak: indizeak biderkatu, ez ehunekoak batu.', 'Encadenados: multiplica los índices, no sumes los porcentajes.', 'المتتالية: اضرب المؤشرات ولا تجمع النسب.'),
        figure: (language) => <ChainedFigure language={language} />
    },
    {
        id: 'interest',
        stage: 'changes',
        title: say('Interes bakuna', 'El interés simple', 'الفائدة البسيطة'),
        goal: say('Kapital batek urte batzuetan sortzen duen interes bakuna kalkulatzea.', 'Calcular el interés simple que produce un capital en unos años.', 'حساب الفائدة البسيطة التي يُنتجها رأس مال في عدة سنوات.'),
        explanation: say(
            'Bankuan dirua uzten dugunean (kapitala, $C$), bankuak urtero ehuneko bat ordaintzen digu: interes-tasa, $r$. Interes bakunean urte bakoitzeko interesa beti bera da, hasierako kapitalaren % $r$; beraz $t$ urtetan $I=\\frac{C\\cdot r\\cdot t}{100}$. 8000 € % 5ean 3 urtez: $\\frac{8000\\cdot 5\\cdot 3}{100}=1200$ €, eta amaieran $8000+1200=9200$ € ditugu. Mailegu batean berdin, baina guk ordaintzen dugu interesa.',
            'Cuando dejamos dinero en el banco (el capital, $C$), el banco nos paga cada año un porcentaje: el tipo de interés, $r$. En el interés simple el interés de cada año es siempre el mismo, el $r$ % del capital inicial; así que en $t$ años $I=\\frac{C\\cdot r\\cdot t}{100}$. 8000 € al 5 % durante 3 años: $\\frac{8000\\cdot 5\\cdot 3}{100}=1200$ €, y al final tenemos $8000+1200=9200$ €. En un préstamo es igual, pero el interés lo pagamos nosotros.',
            'عندما نودع مالًا في المصرف (رأس المال $C$) يدفع لنا المصرف كل سنة نسبة: سعر الفائدة $r$. وفي الفائدة البسيطة تكون فائدة كل سنة هي نفسها، $r$٪ من رأس المال الأصلي؛ إذن في $t$ سنوات $I=\\frac{C\\cdot r\\cdot t}{100}$. 8000 € بفائدة 5٪ مدة 3 سنوات: $\\frac{8000\\cdot 5\\cdot 3}{100}=1200$ €، وفي النهاية يصبح لدينا $8000+1200=9200$ €. وفي القرض الأمر نفسه، لكننا نحن من يدفع الفائدة.'
        ),
        problem: say('3000 €-ko mailegu bat % 8an hartu eta 2 urtera itzultzen da. Zenbat interes ordaindu behar da?', 'Se pide un préstamo de 3000 € al 8 % y se devuelve a los 2 años. ¿Cuánto interés hay que pagar?', 'اقترضنا 3000 € بفائدة 8٪ وسددناها بعد سنتين. كم فائدة يجب دفعها؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Urte bateko interesa.', 'Interés de un año.', 'فائدة سنة.'), math: same('$3000\\cdot 8\\mathbin{:}100=240$') },
            { text: say('Bi urtetan.', 'En dos años.', 'في سنتين.'), math: same('$240\\cdot 2=480$') }
        ],
        example: same('$I=\\frac{8000\\cdot 5\\cdot 3}{100}=1200$'),
        takeaway: say('$I=\\frac{C\\cdot r\\cdot t}{100}$; amaierako kapitala $C+I$.', '$I=\\frac{C\\cdot r\\cdot t}{100}$; capital final $C+I$.', '$I=\\frac{C\\cdot r\\cdot t}{100}$؛ رأس المال النهائي $C+I$.'),
        figure: (language) => <InterestFigure language={language} />
    }
]

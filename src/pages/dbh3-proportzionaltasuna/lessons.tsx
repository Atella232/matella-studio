import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { ProportionFigure, RatioFigure, RuleOfThreeFigure } from '../dbh1-proportzionaltasuna-v2/figures'
import { ChainedFigure, CompoundMixedFigure, DirectShareFigure, IndexFigure, InterestFigure, InverseShareFigure } from '../dbh2-proportzionaltasuna-v2/figures'
import { MixtureFigure, MotionFigure, TapsFigure } from '../dbh4-aplikatuak-proportzionaltasuna/figures'
import { GearsFigure, GraphsFigure, ScaleFigure } from './figures'
import { proportion3LessonChecks, type Proportion3TopicId } from './lessonChecks'
import { proportion3LessonTexts } from './lessonTexts'
import { say, same } from './text'

/* ==========================================================================
   Proportzionaltasuna · 3. DBH — stages and lessons, following Santillana
   3.º ESO unit 4 «Proporcionalidad numérica» (ratios and proportions,
   direct and inverse proportionality, shares, compound proportionality,
   percentages and simple interest) and Anaya 3.º ESO unit 3 «Problemas
   aritméticos» (mixtures, moving objects, taps and jobs done together).
   Every number and context is original: the books only fix the scope and
   the order. Each lesson names its typical mistake, and the lessons with
   two ways of working split them into cases.
   ========================================================================== */

export type Proportion3StageId = 'ratios' | 'simple' | 'compound' | 'percent' | 'problems'

export const proportion3Stages: UnitStage[] = [
    { id: 'ratios', tone: 'blue', title: { eu: 'Arrazoiak eta proportzioak', es: 'Razones y proporciones', en: 'Ratios and proportions', ar: 'النسب والتناسبات' } },
    { id: 'simple', tone: 'violet', title: { eu: 'Zuzena eta alderantzizkoa', es: 'Directa e inversa', en: 'Direct and inverse', ar: 'الطردي والعكسي' } },
    { id: 'compound', tone: 'mustard', title: { eu: 'Konposatua eta banaketak', es: 'Compuesta y repartos', en: 'Compound proportion and sharing', ar: 'المركّب والتوزيعات' } },
    { id: 'percent', tone: 'coral', title: { eu: 'Ehunekoak eta interesa', es: 'Porcentajes e interés', en: 'Percentages and interest', ar: 'النسب المئوية والفائدة' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problema aritmetikoak', es: 'Problemas aritméticos', en: 'Arithmetic problems', ar: 'مسائل حسابية' } }
]


/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Ratios and proportions ---------- */
    {
        id: 'ratio',
        stage: 'ratios',
        title: say('Arrazoia eta proportzioa', 'Razón y proporción', 'النسبة والتناسب', 'Ratio and proportion'),
        goal: say('Bi kopururen arrazoia kalkulatzea eta bi arrazoik proportzio bat osatzen duten erabakitzea.', 'Calcular la razón entre dos cantidades y decidir si dos razones forman una proporción.', 'حساب النسبة بين كميتين وتحديد ما إذا كانت نسبتان تكوّنان تناسبًا.', 'Work out the ratio between two quantities and decide whether two ratios form a proportion.'),
        needs: [{ unit: 'dbh2/proporcionalidad', topic: 'proportion-review', title: { eu: 'Arrazoiak eta proportzioak', es: 'Razones y proporciones', en: 'Ratios and proportions', ar: 'النسب والتناسبات' } }],
        problem: say('Proportzio bat da $\\frac{6}{15}=\\frac{8}{20}$?', '¿Es una proporción $\\frac{6}{15}=\\frac{8}{20}$?', 'هل $\\frac{6}{15}=\\frac{8}{20}$ تناسب؟', 'Is $\\frac{6}{15}=\\frac{8}{20}$ a proportion?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturren biderkadura.', 'Producto de los extremos.', 'حاصل ضرب الطرفين.', 'Product of the extremes.'), math: same('$6\\cdot 20=120$') },
            { text: say('Erdikoen biderkadura.', 'Producto de los medios.', 'حاصل ضرب الوسطين.', 'Product of the means.'), math: same('$15\\cdot 8=120$') },
            { text: say('Berdinak dira: bai, proportzio bat da. Bi arrazoiek $0{,}4$ balio dute.', 'Son iguales: sí, es una proporción. Las dos razones valen $0{,}4$.', 'متساويان: نعم إنه تناسب. والنسبتان تساويان $0{,}4$.', 'They are equal: yes, it is a proportion. Both ratios are $0{,}4$.') }
        ],
        takeaway: say('Proportzioa: $\\frac{a}{b}=\\frac{c}{d}$ eta $a\\cdot d=b\\cdot c$.', 'Proporción: $\\frac{a}{b}=\\frac{c}{d}$ y $a\\cdot d=b\\cdot c$.', 'التناسب: $\\frac{a}{b}=\\frac{c}{d}$ و$a\\cdot d=b\\cdot c$.', 'Proportion: $\\frac{a}{b}=\\frac{c}{d}$ and $a\\cdot d=b\\cdot c$.'),
        figure: (language) => <RatioFigure language={language} />
    },
    {
        id: 'proportion',
        stage: 'ratios',
        title: say('Laugarren proportzionala', 'Cuarta proporcional', 'الرابع المتناسب', 'The fourth proportional'),
        goal: say('Proportzio bateko gai ezezaguna aurkitzea, laugarren proportzionala eta erdiko proportzionala barne.', 'Hallar el término desconocido de una proporción, también la media proporcional.', 'إيجاد الحد المجهول في تناسب، ومنه الوسط المتناسب.', 'Find the unknown term of a proportion, including the mean proportional.'),
        problem: same('$\\frac{x}{12}=\\frac{15}{20}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezezaguna muturra da: biderkatu erdikoak.', 'La incógnita es un extremo: multiplica los medios.', 'المجهول طرف: اضرب الوسطين.', 'The unknown is an extreme: multiply the means.'), math: same('$12\\cdot 15=180$') },
            { text: say('Zatitu beste muturraz.', 'Divide entre el otro extremo.', 'اقسم على الطرف الآخر.', 'Divide by the other extreme.'), math: same('$x=180\\mathbin{:}20=9$') },
            { text: say('Egiaztatu.', 'Comprueba.', 'تحقق.', 'Check.'), math: same('$9\\cdot 20=12\\cdot 15=180$') }
        ],
        takeaway: say('Ezezaguna: bi gai gurutzean biderkatu eta hirugarrenaz zatitu. Erdiko proportzionala: $x^{2}=a\\cdot b$.', 'Incógnita: multiplica dos términos en cruz y divide entre el tercero. Media proporcional: $x^{2}=a\\cdot b$.', 'المجهول: اضرب حدّين تبادليًا واقسم على الثالث. الوسط المتناسب: $x^{2}=a\\cdot b$.', 'Unknown: cross-multiply two terms and divide by the third. Mean proportional: $x^{2}=a\\cdot b$.'),
        figure: (language) => <ProportionFigure language={language} />
    },
    {
        id: 'scale',
        stage: 'ratios',
        title: say('Eskalak: planoak eta mapak', 'Escalas: planos y mapas', 'المقاييس: المخططات والخرائط', 'Scales: plans and maps'),
        goal: say('Eskala bat erabiltzea mapako distantzia errealera eta alderantziz igarotzeko.', 'Usar una escala para pasar de la distancia en el mapa a la real, y al revés.', 'استعمال مقياس للانتقال من المسافة على الخريطة إلى الحقيقية والعكس.', 'Use a scale to go from the distance on the map to the real one, and back.'),
        problem: say('$1\\mathbin{:}200\\,000$ eskalako mapa batean, bi herrik 7,5 cm-ko tartea dute. Zenbat km dira benetan?', 'En un mapa a escala $1\\mathbin{:}200\\,000$, dos pueblos están a 7,5 cm. ¿Cuántos km hay en realidad?', 'في خريطة بمقياس $1\\mathbin{:}200\\,000$ تفصل بين قريتين 7.5 سم. كم كيلومترًا في الحقيقة؟', 'On a map at a scale of $1\\mathbin{:}200\\,000$, two villages are 7.5 cm apart. How many km is that in real life?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu eskalaren zenbakiaz.', 'Multiplica por el número de la escala.', 'اضرب في عدد المقياس.', 'Multiply by the scale number.'), math: same('$7{,}5\\cdot 200\\,000=1\\,500\\,000$ cm') },
            { text: say('cm-tik km-ra: zatitu 100\u00a0000 zenbakiaz.', 'De cm a km: divide entre 100\u00a0000.', 'من سم إلى كم: اقسم على 100000.', 'From cm to km: divide by 100,000.'), math: same('$1\\,500\\,000\\mathbin{:}100\\,000=15$') },
            { text: say('15 km dira.', 'Son 15 km.', 'إنها 15 كم.', 'It is 15 km.') }
        ],
        takeaway: say('Erreala = planoa · eskala. Unitate bera bi aldeetan; gero, $1\\ \\mathrm{km}=100\\,000\\ \\mathrm{cm}$.', 'Real = plano · escala. La misma unidad a los dos lados; después, $1\\ \\mathrm{km}=100\\,000\\ \\mathrm{cm}$.', 'الحقيقي = المخطط · المقياس. الوحدة نفسها في الطرفين ثم $1\\ \\mathrm{km}=100\\,000\\ \\mathrm{cm}$.', 'Real = plan · scale. The same unit on both sides; then $1\\ \\mathrm{km}=100\\,000\\ \\mathrm{cm}$.'),
        figure: (language) => <ScaleFigure language={language} />
    },

    /* ---------- 2. Direct and inverse ---------- */
    {
        id: 'direct',
        stage: 'simple',
        title: say('Proportzionaltasun zuzena', 'Proporcionalidad directa', 'التناسب الطردي', 'Direct proportion'),
        goal: say('Magnitude zuzenki proportzionalak ezagutzea eta problemak unitatera laburtuz edo hiruko erregelaz ebaztea.', 'Reconocer magnitudes directamente proporcionales y resolver problemas reduciendo a la unidad o con regla de tres.', 'التعرّف على المقادير المتناسبة طرديًا وحلّ المسائل بالإرجاع إلى الوحدة أو بقاعدة الثلاثة.', 'Recognise directly proportional quantities and solve problems with the unitary method or the rule of three.'),
        needs: [{ unit: 'dbh2/proporcionalidad', topic: 'direct-review', title: { eu: 'Proportzionaltasun zuzena', es: 'Proporcionalidad directa', en: 'Direct proportion', ar: 'التناسب الطردي' } }],
        problem: say('8 kg sagarrek 9,60 € balio dute. Zenbat balio dute 5 kg-k?', '8 kg de manzanas cuestan 9,60 €. ¿Cuánto cuestan 5 kg?', '8 كغ من التفاح تكلّف 9.60 €. كم تكلّف 5 كغ؟', '8 kg of apples cost €9.60. How much do 5 kg cost?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kilo gehiago → euro gehiago: zuzena.', 'Más kilos → más euros: directa.', 'كيلوغرامات أكثر ← يوروهات أكثر: طردي.', 'More kilos → more euros: direct.') },
            { text: say('Kilo baten prezioa.', 'El precio de un kilo.', 'سعر الكيلوغرام.', 'The price of one kilo.'), math: same('$9{,}60\\mathbin{:}8=1{,}20$') },
            { text: say('Biderkatu: bider 5, 6 €.', 'Multiplica por 5: 6 €.', 'اضرب في 5: 6 €.', 'Multiply by 5: €6.'), math: same('$1{,}20\\cdot 5=6$') }
        ],
        takeaway: say('Zuzena: zatidura konstantea. $x=\\frac{b\\cdot c}{a}$ edo lehenik unitate baten balioa.', 'Directa: cociente constante. $x=\\frac{b\\cdot c}{a}$ o primero el valor de una unidad.', 'الطردي: حاصل قسمة ثابت. $x=\\frac{b\\cdot c}{a}$ أو قيمة الوحدة أولًا.', 'Direct: constant quotient. $x=\\frac{b\\cdot c}{a}$, or first the value of one unit.'),
        figure: (language) => <RuleOfThreeFigure language={language} />
    },
    {
        id: 'inverse',
        stage: 'simple',
        title: say('Alderantzizko proportzionaltasuna', 'Proporcionalidad inversa', 'التناسب العكسي', 'Inverse proportion'),
        goal: say('Alderantziz proportzionalak diren magnitudeak ezagutzea eta problemak biderkadura konstantearekin ebaztea.', 'Reconocer magnitudes inversamente proporcionales y resolver problemas con el producto constante.', 'التعرّف على المقادير المتناسبة عكسيًا وحلّ المسائل بحاصل الضرب الثابت.', 'Recognise inversely proportional quantities and solve problems with the constant product.'),
        needs: [{ unit: 'dbh2/proporcionalidad', topic: 'inverse-review', title: { eu: 'Alderantzizko proportzionaltasuna', es: 'Proporcionalidad inversa', en: 'Inverse proportion', ar: 'التناسب العكسي' } }],
        problem: say('6 margolarik etxe bat 10 egunean margotzen dute. Zenbat egun beharko lituzkete 4 margolarik?', '6 pintores pintan una casa en 10 días. ¿Cuántos días tardarían 4 pintores?', '6 دهّانين يدهنون بيتًا في 10 أيام. كم يومًا يحتاج 4 دهّانين؟', '6 painters paint a house in 10 days. How many days would 4 painters take?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Margolari gutxiago → egun gehiago: alderantzizkoa.', 'Menos pintores → más días: inversa.', 'دهّانون أقل ← أيام أكثر: عكسي.', 'Fewer painters → more days: inverse.') },
            { text: say('Lan osoa, margolari-egunetan.', 'El trabajo total, en días de pintor.', 'العمل كله بأيام الدهّان.', 'The total work, in painter-days.'), math: same('$6\\cdot 10=60$') },
            { text: say('Zatitu 4 zenbakiaz: 15 egun.', 'Divide entre 4: 15 días.', 'اقسم على 4: 15 يومًا.', 'Divide by 4: 15 days.'), math: same('$60\\mathbin{:}4=15$') }
        ],
        takeaway: say('Alderantzizkoa: biderkadura konstantea. $x=\\frac{a\\cdot b}{c}$.', 'Inversa: producto constante. $x=\\frac{a\\cdot b}{c}$.', 'العكسي: حاصل ضرب ثابت. $x=\\frac{a\\cdot b}{c}$.', 'Inverse: constant product. $x=\\frac{a\\cdot b}{c}$.'),
        figure: (language) => <GearsFigure language={language} />
    },
    {
        id: 'graphs',
        stage: 'simple',
        title: say('Taulak eta grafikoak', 'Tablas y gráficas', 'الجداول والتمثيلات البيانية', 'Tables and graphs'),
        goal: say('Taula edo grafiko batetik erlazioa zuzena, alderantzizkoa ala bat ere ez den erabakitzea.', 'Decidir a partir de una tabla o una gráfica si la relación es directa, inversa o ninguna.', 'تحديد ما إذا كانت العلاقة طردية أو عكسية أو لا هذا ولا ذاك انطلاقًا من جدول أو تمثيل بياني.', 'Decide from a table or a graph whether the relationship is direct, inverse or neither.'),
        problem: say('Taula: $x$: 2, 3, 6; $y$: 9, 6, 3. Zer erlazio da?', 'Tabla: $x$: 2, 3, 6; $y$: 9, 6, 3. ¿Qué relación es?', 'الجدول: $x$: 2، 3، 6؛ $y$: 9، 6، 3. ما العلاقة؟', 'Table: $x$: 2, 3, 6; $y$: 9, 6, 3. What kind of relationship is it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatidurak: ez dira berdinak.', 'Cocientes: no son iguales.', 'حواصل القسمة: غير متساوية.', 'Quotients: they are not equal.'), math: same('$\\frac{9}{2}\\neq\\frac{6}{3}$') },
            { text: say('Biderkadurak: beti 18.', 'Productos: siempre 18.', 'حواصل الضرب: دائمًا 18.', 'Products: always 18.'), math: same('$2\\cdot 9=3\\cdot 6=6\\cdot 3=18$') },
            { text: say('Alderantzizkoa da, $k=18$, eta grafikoa hiperbola bat da.', 'Es inversa, con $k=18$, y su gráfica es una hipérbola.', 'إنها عكسية مع $k=18$ وتمثيلها قطع زائد.', 'It is inverse, with $k=18$, and its graph is a hyperbola.') }
        ],
        takeaway: say('Zuzena: zuzen bat $(0,0)$ puntutik. Alderantzizkoa: hiperbola. Biak ez: ez da proportzionala.', 'Directa: una recta por $(0,0)$. Inversa: una hipérbola. Ni una ni otra: no es proporcional.', 'الطردي: مستقيم يمر بـ $(0,0)$. العكسي: قطع زائد. غير ذلك: ليس تناسبًا.', 'Direct: a line through $(0,0)$. Inverse: a hyperbola. Neither: not proportional.'),
        figure: (language) => <GraphsFigure language={language} />
    },

    /* ---------- 3. Compound proportion and shares ---------- */
    {
        id: 'compound',
        stage: 'compound',
        title: say('Proportzionaltasun konposatua', 'Proporcionalidad compuesta', 'التناسب المركّب', 'Compound proportion'),
        goal: say('Hiru magnitude edo gehiago dituzten problemak ebaztea, bakoitza ezezagunarekin zuzena ala alderantzizkoa den erabakiz.', 'Resolver problemas con tres o más magnitudes, decidiendo si cada una es directa o inversa con la incógnita.', 'حلّ مسائل فيها ثلاثة مقادير أو أكثر بتحديد ما إذا كان كل منها طرديًا أو عكسيًا مع المجهول.', 'Solve problems with three or more quantities, deciding whether each is direct or inverse with the unknown.'),
        needs: [{ unit: 'dbh2/proporcionalidad', topic: 'compound-mixed', title: { eu: 'Erlazio zuzenak eta alderantzizkoak', es: 'Relaciones directas e inversas', en: 'Direct and inverse relationships', ar: 'علاقات طردية وعكسية' } }],
        problem: say('5 makinak 400 pieza egiten dituzte 8 orduan. Zenbat ordu beharko dituzte 4 makinak 600 pieza egiteko?', '5 máquinas hacen 400 piezas en 8 horas. ¿Cuántas horas tardarán 4 máquinas en hacer 600 piezas?', '5 آلات تصنع 400 قطعة في 8 ساعات. كم ساعة تحتاج 4 آلات لصنع 600 قطعة؟', '5 machines make 400 parts in 8 hours. How many hours will 4 machines take to make 600 parts?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Makinak eta orduak: alderantzizkoa → $\\frac{5}{4}$.', 'Máquinas y horas: inversa → $\\frac{5}{4}$.', 'الآلات والساعات: عكسي ← $\\frac{5}{4}$.', 'Machines and hours: inverse → $\\frac{5}{4}$.') },
            { text: say('Piezak eta orduak: zuzena → $\\frac{600}{400}$.', 'Piezas y horas: directa → $\\frac{600}{400}$.', 'القطع والساعات: طردي ← $\\frac{600}{400}$.', 'Parts and hours: direct → $\\frac{600}{400}$.') },
            { text: say('Biderkatu: 15 ordu.', 'Multiplica: 15 horas.', 'اضرب: 15 ساعة.', 'Multiply: 15 hours.'), math: same('$8\\cdot\\frac{5}{4}\\cdot\\frac{600}{400}=15$') }
        ],
        takeaway: say('Zuzena: berria/zaharra. Alderantzizkoa: zaharra/berria. Gero, biderkatu guztiak.', 'Directa: nuevo/viejo. Inversa: viejo/nuevo. Después, multiplica todo.', 'الطردي: الجديد/القديم. العكسي: القديم/الجديد. ثم اضرب كل شيء.', 'Direct: new/old. Inverse: old/new. Then multiply everything.'),
        figure: (language) => <CompoundMixedFigure language={language} />
    },
    {
        id: 'direct-share',
        stage: 'compound',
        title: say('Banaketa zuzenki proportzionala', 'Reparto directamente proporcional', 'التوزيع الطردي', 'Sharing in direct proportion'),
        goal: say('Kopuru bat zenbait zenbakiri zuzenki proportzionalean banatzea.', 'Repartir una cantidad en partes directamente proporcionales a varios números.', 'توزيع كمية على أجزاء متناسبة طرديًا مع عدة أعداد.', 'Share a quantity in parts directly proportional to several numbers.'),
        problem: say('Banatu 300 € 3, 5 eta 7 ordu lan egin duten hiru lagunen artean.', 'Reparte 300 € entre tres amigos que trabajaron 3, 5 y 7 horas.', 'وزّع 300 € على ثلاثة أصدقاء عملوا 3 و5 و7 ساعات.', 'Share €300 among three friends who worked 3, 5 and 7 hours.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu orduak.', 'Suma las horas.', 'اجمع الساعات.', 'Add the hours.'), math: same('$3+5+7=15$') },
            { text: say('Ordu baten balioa.', 'Lo que vale una hora.', 'قيمة الساعة.', 'What one hour is worth.'), math: same('$300\\mathbin{:}15=20$') },
            { text: say('Biderkatu: 60 €, 100 € eta 140 €.', 'Multiplica: 60 €, 100 € y 140 €.', 'اضرب: 60 € و100 € و140 €.', 'Multiply: €60, €100 and €140.'), math: same('$60+100+140=300$') }
        ],
        takeaway: say('Zati bat = kopurua/batura; bakoitzari, bere zenbakia bider zati bat.', 'Una parte = cantidad/suma; a cada uno, su número por una parte.', 'الجزء = الكمية/المجموع؛ ولكل واحد عدده في الجزء.', 'One part = amount/sum; each person gets their number times one part.'),
        figure: (language) => <DirectShareFigure language={language} />
    },
    {
        id: 'inverse-share',
        stage: 'compound',
        title: say('Banaketa alderantziz proportzionala', 'Reparto inversamente proporcional', 'التوزيع العكسي', 'Sharing in inverse proportion'),
        goal: say('Kopuru bat zenbait zenbakiri alderantziz proportzionalean banatzea, haien alderantzizkoekiko zuzenean banatuz.', 'Repartir una cantidad en partes inversamente proporcionales a varios números, repartiendo de forma directa a sus inversos.', 'توزيع كمية توزيعًا عكسيًا على عدة أعداد بالتوزيع الطردي على مقلوباتها.', 'Share a quantity in inverse proportion to several numbers by sharing in direct proportion to their reciprocals.'),
        needs: [{ unit: 'dbh3/numeros-racionales', topic: 'mul-div', title: { eu: 'Biderketa eta zatiketa', es: 'Multiplicación y división', en: 'Multiplication and division', ar: 'الضرب والقسمة' } }],
        problem: say('Banatu 360 € 2, 3 eta 6 akats egin dituztenen artean, akatsekiko alderantziz proportzionalean.', 'Reparte 360 € entre quienes cometieron 2, 3 y 6 fallos, de forma inversamente proporcional a los fallos.', 'وزّع 360 € على من ارتكبوا 2 و3 و6 أخطاء توزيعًا عكسيًا مع الأخطاء.', 'Share €360 among people who made 2, 3 and 6 mistakes, in inverse proportion to the mistakes.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alderantzizkoak, bider 6.', 'Los inversos, multiplicados por 6.', 'المقلوبات مضروبة في 6.', 'The reciprocals, multiplied by 6.'), math: same('$\\frac{1}{2},\\frac{1}{3},\\frac{1}{6}\\ \\to\\ 3,2,1$') },
            { text: say('Zati baten balioa.', 'El valor de una parte.', 'قيمة الجزء.', 'The value of one part.'), math: same('$360\\mathbin{:}(3+2+1)=60$') },
            { text: say('180 €, 120 € eta 60 €: akats gutxien egin duenak gehien.', '180 €, 120 € y 60 €: quien menos falló, más recibe.', '180 € و120 € و60 €: الأقل خطأً يأخذ الأكثر.', '€180, €120 and €60: whoever made the fewest mistakes gets the most.'), math: same('$180+120+60=360$') }
        ],
        takeaway: say('Alderantzizkoa: banatu zuzenean $\\frac{1}{a}$, $\\frac{1}{b}$, $\\frac{1}{c}$ zenbakiekiko.', 'Inverso: reparte de forma directa a $\\frac{1}{a}$, $\\frac{1}{b}$, $\\frac{1}{c}$.', 'العكسي: وزّع طرديًا على $\\frac{1}{a}$ و$\\frac{1}{b}$ و$\\frac{1}{c}$.', 'Inverse: share directly in proportion to $\\frac{1}{a}$, $\\frac{1}{b}$, $\\frac{1}{c}$.'),
        figure: (language) => <InverseShareFigure language={language} />
    },

    /* ---------- 4. Percentages and interest ---------- */
    {
        id: 'percent-index',
        stage: 'percent',
        title: say('Ehunekoak eta aldakuntza-indizea', 'Porcentajes e índice de variación', 'النسب المئوية ومؤشر التغيّر', 'Percentages and the index of change'),
        goal: say('Ehunekoak kalkulatzea, eta igoerak eta jaitsierak aldakuntza-indize batekin egitea, hasierako kopurua ere aurkituz.', 'Calcular porcentajes y hacer aumentos y disminuciones con el índice de variación, también para hallar la cantidad inicial.', 'حساب النسب المئوية وإجراء الزيادة والنقصان بمؤشر التغيّر، ومنه إيجاد الكمية الأصلية.', 'Work out percentages and apply increases and decreases with the index of change, including finding the original amount.'),
        needs: [{ unit: 'dbh2/proporcionalidad', topic: 'index', title: { eu: 'Aldakuntza-indizea', es: 'El índice de variación', en: 'The change multiplier', ar: 'مؤشر التغيّر' } }],
        problem: say('Jaka bat % 15 merkatu da eta orain 51 € balio ditu. Zenbat balio zuen lehen?', 'Con una rebaja del 15 %, una chaqueta cuesta 51 €. ¿Cuánto costaba antes?', 'بعد تخفيض 15٪ صار ثمن سترة 51 €. كم كان ثمنها قبل ذلك؟', 'With a 15% discount, a jacket costs €51. How much did it cost before?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Beherapenaren indizea.', 'El índice de la rebaja.', 'مؤشر التخفيض.', 'The index of the discount.'), math: same('$1-0{,}15=0{,}85$') },
            { text: say('Amaierakoa = hasierakoa · indizea.', 'Final = inicial · índice.', 'النهائية = الأصلية · المؤشر.', 'Final = original · index.'), math: same('$x\\cdot 0{,}85=51$') },
            { text: say('Zatitu: 60 €.', 'Divide: 60 €.', 'اقسم: 60 €.', 'Divide: €60.'), math: same('$51\\mathbin{:}0{,}85=60$') }
        ],
        takeaway: say('Amaierakoa = hasierakoa · indizea. Igoera: $1+\\frac{r}{100}$; jaitsiera: $1-\\frac{r}{100}$.', 'Final = inicial · índice. Aumento: $1+\\frac{r}{100}$; disminución: $1-\\frac{r}{100}$.', 'النهائية = الأصلية · المؤشر. الزيادة: $1+\\frac{r}{100}$؛ النقصان: $1-\\frac{r}{100}$.', 'Final = original · index. Increase: $1+\\frac{r}{100}$; decrease: $1-\\frac{r}{100}$.'),
        figure: (language) => <IndexFigure language={language} />
    },
    {
        id: 'chained',
        stage: 'percent',
        title: say('Ehuneko kateatuak', 'Porcentajes encadenados', 'النسب المتتالية', 'Successive percentages'),
        goal: say('Bata bestearen atzetik egiten diren igoerak eta jaitsierak indizeak biderkatuz kalkulatzea.', 'Calcular aumentos y disminuciones seguidos multiplicando los índices.', 'حساب زيادات ونقصانات متتالية بضرب المؤشرات.', 'Work out successive increases and decreases by multiplying the indices.'),
        problem: say('Prezio bat % 20 igo eta gero % 25 jaitsi da. Zer aldaketa izan du guztira?', 'Un precio sube un 20 % y luego baja un 25 %. ¿Qué cambio total ha tenido?', 'ارتفع سعر 20٪ ثم انخفض 25٪. ما التغيّر الكلي؟', 'A price goes up 20% and then down 25%. What is the total change?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizeak.', 'Los índices.', 'المؤشرات.', 'The indices.'), math: same('$1{,}2\\quad 0{,}75$') },
            { text: say('Biderkatu.', 'Multiplícalos.', 'اضربها.', 'Multiply them.'), math: same('$1{,}2\\cdot 0{,}75=0{,}9$') },
            { text: say('0,9 < 1: % 10 jaitsi da.', '0,9 < 1: una bajada del 10 %.', '0.9 < 1: انخفاض 10٪.', '0.9 < 1: a 10% decrease.') }
        ],
        takeaway: say('Kateatuak: indize osoa $=i_{1}\\cdot i_{2}\\cdots$. Ehunekoak ez dira batzen.', 'Encadenados: índice total $=i_{1}\\cdot i_{2}\\cdots$. Los porcentajes no se suman.', 'المتتالية: المؤشر الكلي $=i_{1}\\cdot i_{2}\\cdots$. النسب لا تُجمع.', 'Successive: total index $=i_{1}\\cdot i_{2}\\cdots$. Percentages are not added.'),
        figure: (language) => <ChainedFigure language={language} />
    },
    {
        id: 'interest',
        stage: 'percent',
        title: say('Interes bakuna', 'Interés simple', 'الفائدة البسيطة', 'Simple interest'),
        goal: say('Interes bakuna kalkulatzea eta formulatik kapitala, tasa edo denbora ateratzea.', 'Calcular el interés simple y despejar de la fórmula el capital, el rédito o el tiempo.', 'حساب الفائدة البسيطة واستخراج رأس المال أو السعر أو المدة من الصيغة.', 'Work out simple interest and find the capital, the rate or the time from the formula.'),
        needs: [{ unit: 'dbh2/proporcionalidad', topic: 'percent-forms', title: { eu: 'Ehunekoa hamartar gisa', es: 'El porcentaje como decimal', en: 'Percentages as decimals', ar: 'النسبة المئوية عددًا عشريًا' } }],
        problem: say('2400 € 5 urtez, interes-tasa % 3 dela. Zenbat interes eta zenbat diru guztira?', '2400 € al 3 % durante 5 años. ¿Cuánto interés y cuánto dinero en total?', '2400 € بفائدة 3٪ مدة 5 سنوات. كم الفائدة وكم المال كله؟', '€2,400 at 3% for 5 years. How much interest, and how much money in total?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Urte bateko interesa.', 'El interés de un año.', 'فائدة سنة واحدة.', 'One year\'s interest.'), math: same('$\\frac{2400\\cdot 3}{100}=72$') },
            { text: say('Bost urte.', 'Cinco años.', 'خمس سنوات.', 'Five years.'), math: same('$72\\cdot 5=360$') },
            { text: say('Guztira, 2760 €.', 'En total, 2760 €.', 'المجموع 2760 €.', 'In total, €2,760.'), math: same('$2400+360=2760$') }
        ],
        takeaway: say('$I=\\frac{C\\cdot r\\cdot t}{100}$, $t$ urtetan. Guztira: $C+I$.', '$I=\\frac{C\\cdot r\\cdot t}{100}$, con $t$ en años. En total: $C+I$.', '$I=\\frac{C\\cdot r\\cdot t}{100}$ و$t$ بالسنوات. المجموع: $C+I$.', '$I=\\frac{C\\cdot r\\cdot t}{100}$, with $t$ in years. In total: $C+I$.'),
        figure: (language) => <InterestFigure language={language} />
    },

    /* ---------- 5. Arithmetic problems ---------- */
    {
        id: 'mixtures',
        stage: 'problems',
        title: say('Nahasteak', 'Mezclas', 'الخلطات', 'Mixtures'),
        goal: say('Bi produktu nahastean nahastearen prezioa (edo kalitatea) kalkulatzea, eta alderantziz, kopuruak.', 'Calcular el precio (o la calidad) de una mezcla de dos productos, y al revés, las cantidades.', 'حساب سعر (أو جودة) خليط من منتجين، والعكس: الكميات.', 'Work out the price (or the quality) of a mixture of two products, and the other way round, the amounts.'),
        needs: [{ unit: 'dbh2/estadistica-probabilidad', topic: 'mean-table', title: { eu: 'Batez bestekoa taula batetik', es: 'La media desde una tabla', en: 'The mean from a table', ar: 'المتوسط من جدول' } }],
        problem: say('12 kg kafe 8 €/kg-an eta 8 kg 13 €/kg-an nahasten dira. Zenbat balio du nahastearen kilo batek?', 'Se mezclan 12 kg de café de 8 €/kg con 8 kg de 13 €/kg. ¿Cuánto vale un kilo de la mezcla?', 'نخلط 12 كغ من بن سعره 8 €/كغ مع 8 كغ سعرها 13 €/كغ. كم ثمن كيلوغرام الخليط؟', '12 kg of coffee at €8/kg are mixed with 8 kg at €13/kg. How much is a kilo of the mixture worth?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Osagai bakoitzaren balioa.', 'El valor de cada ingrediente.', 'قيمة كل مكوّن.', 'The value of each ingredient.'), math: same('$12\\cdot 8=96\\quad 8\\cdot 13=104$') },
            { text: say('Balio osoa eta kilo osoak.', 'Valor total y kilos totales.', 'القيمة الكلية والكيلوغرامات الكلية.', 'Total value and total kilos.'), math: same('$96+104=200\\quad 12+8=20$') },
            { text: say('Zatitu: 10 €/kg.', 'Divide: 10 €/kg.', 'اقسم: 10 €/كغ.', 'Divide: €10/kg.'), math: same('$200\\mathbin{:}20=10$') }
        ],
        takeaway: say('Nahastea: $\\frac{a\\cdot p+b\\cdot q}{a+b}$, bi prezioen artean.', 'Mezcla: $\\frac{a\\cdot p+b\\cdot q}{a+b}$, entre los dos precios.', 'الخليط: $\\frac{a\\cdot p+b\\cdot q}{a+b}$ بين السعرين.', 'Mixture: $\\frac{a\\cdot p+b\\cdot q}{a+b}$, between the two prices.'),
        figure: (language) => <MixtureFigure language={language} />
    },
    {
        id: 'motion',
        stage: 'problems',
        title: say('Mugikariak', 'Móviles', 'المتحركات', 'Moving objects'),
        goal: say('Bi mugikari noiz eta non elkartzen diren edo bata bestea noiz harrapatzen duen kalkulatzea.', 'Calcular cuándo y dónde se encuentran dos móviles o cuándo uno alcanza al otro.', 'حساب متى وأين يلتقي متحركان أو متى يلحق أحدهما بالآخر.', 'Work out when and where two moving objects meet, or when one catches up with the other.'),
        problem: say('Bi herrik 210 km-ko tartea dute. Auto bat 80 km/h-ra eta beste bat 60 km/h-ra irteten dira, elkarrengana. Noiz eta non elkartuko dira?', 'Dos pueblos están a 210 km. Sale un coche de cada uno, a 80 km/h y a 60 km/h, uno hacia el otro. ¿Cuándo y dónde se encuentran?', 'تفصل بين قريتين 210 كم. تنطلق من كل واحدة سيارة بسرعة 80 كم/س و60 كم/س إحداهما نحو الأخرى. متى وأين تلتقيان؟', 'Two villages are 210 km apart. A car leaves each one, at 80 km/h and 60 km/h, towards each other. When and where do they meet?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Elkarrengana: abiadurak batu.', 'Al encuentro: suma las velocidades.', 'متقابلتان: اجمع السرعتين.', 'Towards each other: add the speeds.'), math: same('$80+60=140$') },
            { text: say('Elkartzeko denbora: 1,5 h.', 'Tiempo hasta el encuentro: 1,5 h.', 'زمن الالتقاء: 1.5 س.', 'Time until they meet: 1.5 h.'), math: same('$210\\mathbin{:}140=1{,}5$') },
            { text: say('Lehen herritik 120 km-ra.', 'A 120 km del primer pueblo.', 'على بعد 120 كم من القرية الأولى.', '120 km from the first village.'), math: same('$80\\cdot 1{,}5=120$') }
        ],
        takeaway: say('Elkarrengana: $t=\\frac{d}{v_{1}+v_{2}}$. Atzetik: $t=\\frac{d}{v_{1}-v_{2}}$.', 'Encuentro: $t=\\frac{d}{v_{1}+v_{2}}$. Alcance: $t=\\frac{d}{v_{1}-v_{2}}$.', 'التقابل: $t=\\frac{d}{v_{1}+v_{2}}$. اللحاق: $t=\\frac{d}{v_{1}-v_{2}}$.', 'Meeting: $t=\\frac{d}{v_{1}+v_{2}}$. Catching up: $t=\\frac{d}{v_{1}-v_{2}}$.'),
        figure: (language) => <MotionFigure language={language} />
    },
    {
        id: 'work',
        stage: 'problems',
        title: say('Txorrotak eta lanak elkarrekin', 'Grifos y trabajos en común', 'الصنابير والأعمال المشتركة', 'Taps and jobs done together'),
        goal: say('Bi txorrotak edo bi lagunek elkarrekin zenbat denbora behar duten kalkulatzea, ordu bateko zatiak batuz.', 'Calcular cuánto tardan juntos dos grifos o dos personas, sumando la parte que hacen en una hora.', 'حساب الزمن الذي يحتاجه صنبوران أو شخصان معًا بجمع ما ينجزه كل منهما في ساعة.', 'Work out how long two taps or two people take together, by adding the part each does in one hour.'),
        needs: [{ unit: 'dbh3/numeros-racionales', topic: 'add-sub', title: { eu: 'Batuketa eta kenketa', es: 'Suma y resta', en: 'Addition and subtraction', ar: 'الجمع والطرح' } }],
        problem: say('A txorrotak depositua 4 orduan betetzen du eta B txorrotak 12 orduan. Zenbat behar dute biek batera?', 'El grifo A llena un depósito en 4 horas y el B en 12. ¿Cuánto tardan los dos juntos?', 'يملأ الصنبور A الخزان في 4 ساعات والصنبور B في 12. كم يحتاجان معًا؟', 'Tap A fills a tank in 4 hours and tap B in 12. How long do they take together?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordu batean, bakoitzaren zatia.', 'En una hora, la parte de cada uno.', 'في ساعة: جزء كل منهما.', 'In one hour, each one\'s part.'), math: same('$\\frac{1}{4}\\quad\\frac{1}{12}$') },
            { text: say('Batu.', 'Súmalas.', 'اجمعهما.', 'Add them.'), math: same('$\\frac{1}{4}+\\frac{1}{12}=\\frac{4}{12}=\\frac{1}{3}$') },
            { text: say('Zati bat orduko: 3 ordu.', 'Un tercio por hora: 3 horas.', 'الثلث في الساعة: 3 ساعات.', 'A third per hour: 3 hours.') }
        ],
        takeaway: say('Ordu batean: $\\frac{1}{a}+\\frac{1}{b}=\\frac{1}{t}$. Hustubidea: kendu.', 'En una hora: $\\frac{1}{a}+\\frac{1}{b}=\\frac{1}{t}$. Desagüe: se resta.', 'في ساعة: $\\frac{1}{a}+\\frac{1}{b}=\\frac{1}{t}$. المصرف: يُطرح.', 'In one hour: $\\frac{1}{a}+\\frac{1}{b}=\\frac{1}{t}$. A drain: subtract.'),
        figure: (language) => <TapsFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const proportion3Topics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...proportion3LessonTexts[topic.id as Proportion3TopicId], ...proportion3LessonChecks[topic.id as Proportion3TopicId] }))

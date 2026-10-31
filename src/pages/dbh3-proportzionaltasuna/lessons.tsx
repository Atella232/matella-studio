import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { ProportionFigure, RatioFigure, RuleOfThreeFigure } from '../dbh1-proportzionaltasuna-v2/figures'
import { ChainedFigure, CompoundMixedFigure, DirectShareFigure, IndexFigure, InterestFigure, InverseShareFigure } from '../dbh2-proportzionaltasuna-v2/figures'
import { MixtureFigure, MotionFigure, TapsFigure } from '../dbh4-aplikatuak-proportzionaltasuna/figures'
import { GearsFigure, GraphsFigure, ScaleFigure } from './figures'
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


export const proportion3Topics: UnitTopic[] = [
    /* ---------- 1. Ratios and proportions ---------- */
    {
        id: 'ratio',
        stage: 'ratios',
        title: say('Arrazoia eta proportzioa', 'Razón y proporción', 'النسبة والتناسب', 'Ratio and proportion'),
        goal: say('Bi kopururen arrazoia kalkulatzea eta bi arrazoik proportzio bat osatzen duten erabakitzea.', 'Calcular la razón entre dos cantidades y decidir si dos razones forman una proporción.', 'حساب النسبة بين كميتين وتحديد ما إذا كانت نسبتان تكوّنان تناسبًا.', 'Work out the ratio between two quantities and decide whether two ratios form a proportion.'),
        explanation: say(
            '$a$ eta $b$ kopuruen arrazoia haien zatidura da, $\\frac{a}{b}$: zenbat aldiz sartzen den bata bestean. Klase batean 12 neska eta 16 mutil badaude, nesken eta mutilen arrazoia $\\frac{12}{16}=0{,}75$ da. Bi arrazoi berdinek proportzio bat osatzen dute: $\\frac{a}{b}=\\frac{c}{d}$. $a$ eta $d$ muturrak dira, eta $b$ eta $c$ erdikoak. Propietate nagusia: proportzio batean muturren biderkadura erdikoen biderkaduraren berdina da, $a\\cdot d=b\\cdot c$.',
            'La razón entre dos cantidades $a$ y $b$ es su cociente, $\\frac{a}{b}$: cuántas veces cabe una en la otra. Si en una clase hay 12 chicas y 16 chicos, la razón entre chicas y chicos es $\\frac{12}{16}=0{,}75$. Dos razones iguales forman una proporción: $\\frac{a}{b}=\\frac{c}{d}$. $a$ y $d$ son los extremos, y $b$ y $c$ los medios. La propiedad fundamental: en toda proporción el producto de los extremos es igual al producto de los medios, $a\\cdot d=b\\cdot c$.',
            'النسبة بين كميتين $a$ و$b$ هي حاصل قسمتهما $\\frac{a}{b}$: كم مرة تتسع إحداهما في الأخرى. إذا كان في صف 12 بنتًا و16 ولدًا فالنسبة بين البنات والأولاد $\\frac{12}{16}=0{,}75$. ونسبتان متساويتان تكوّنان تناسبًا: $\\frac{a}{b}=\\frac{c}{d}$. العددان $a$ و$d$ هما الطرفان، و$b$ و$c$ هما الوسطان. الخاصية الأساسية: في كل تناسب حاصل ضرب الطرفين يساوي حاصل ضرب الوسطين $a\\cdot d=b\\cdot c$.',
            'The ratio of two quantities $a$ and $b$ is their quotient, $\\frac{a}{b}$: how many times one fits into the other. If a class has 12 girls and 16 boys, the ratio of girls to boys is $\\frac{12}{16}=0{,}75$. Two equal ratios form a proportion: $\\frac{a}{b}=\\frac{c}{d}$. $a$ and $d$ are the extremes, and $b$ and $c$ are the means. The fundamental property: in every proportion, the product of the extremes equals the product of the means, $a\\cdot d=b\\cdot c$.'
        ),
        problem: say('Proportzio bat da $\\frac{6}{15}=\\frac{8}{20}$?', '¿Es una proporción $\\frac{6}{15}=\\frac{8}{20}$?', 'هل $\\frac{6}{15}=\\frac{8}{20}$ تناسب؟', 'Is $\\frac{6}{15}=\\frac{8}{20}$ a proportion?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Muturren biderkadura.', 'Producto de los extremos.', 'حاصل ضرب الطرفين.', 'Product of the extremes.'), math: same('$6\\cdot 20=120$') },
            { text: say('Erdikoen biderkadura.', 'Producto de los medios.', 'حاصل ضرب الوسطين.', 'Product of the means.'), math: same('$15\\cdot 8=120$') },
            { text: say('Berdinak dira: bai, proportzio bat da. Bi arrazoiek $0{,}4$ balio dute.', 'Son iguales: sí, es una proporción. Las dos razones valen $0{,}4$.', 'متساويان: نعم إنه تناسب. والنسبتان تساويان $0{,}4$.', 'They are equal: yes, it is a proportion. Both ratios are $0{,}4$.') }
        ],
        example: same('$\\frac{3}{4}=\\frac{9}{12}\\quad 3\\cdot 12=4\\cdot 9$'),
        mistake: {
            wrong: say('$\\frac{2}{3}$ eta $\\frac{4}{5}$ proportzionalak dira, bietan goiko zenbakiari 1 gehitzen zaiolako behekoa lortzeko.', '$\\frac{2}{3}$ y $\\frac{4}{5}$ son proporcionales, porque en las dos se suma 1 para pasar de arriba abajo.', '$\\frac{2}{3}$ و$\\frac{4}{5}$ متناسبتان لأننا نضيف 1 في الحالتين للانتقال من الأعلى إلى الأسفل.', '$\\frac{2}{3}$ and $\\frac{4}{5}$ are proportional, because in both you add 1 to go from top to bottom.'),
            right: say('Proportzioak zatidurak konparatzen ditu, ez kenketak: $2\\cdot 5=10$ eta $3\\cdot 4=12$, ez dira berdinak.', 'Una proporción compara cocientes, no restas: $2\\cdot 5=10$ y $3\\cdot 4=12$ no son iguales.', 'التناسب يقارن حواصل القسمة لا الفروق: $2\\cdot 5=10$ و$3\\cdot 4=12$ غير متساويين.', 'A proportion compares quotients, not differences: $2\\cdot 5=10$ and $3\\cdot 4=12$ are not equal.')
        },
        takeaway: say('Proportzioa: $\\frac{A}{B}=\\frac{C}{D}$ eta $A\\cdot D=B\\cdot C$.', 'Proporción: $\\frac{A}{B}=\\frac{C}{D}$ y $A\\cdot D=B\\cdot C$.', 'التناسب: $\\frac{A}{B}=\\frac{C}{D}$ و$A\\cdot D=B\\cdot C$.', 'Proportion: $\\frac{A}{B}=\\frac{C}{D}$ and $A\\cdot D=B\\cdot C$.'),
        figure: (language) => <RatioFigure language={language} />
    },
    {
        id: 'proportion',
        stage: 'ratios',
        title: say('Laugarren proportzionala', 'Cuarta proporcional', 'الرابع المتناسب', 'The fourth proportional'),
        goal: say('Proportzio bateko gai ezezaguna aurkitzea, laugarren proportzionala eta erdiko proportzionala barne.', 'Hallar el término desconocido de una proporción, también la media proporcional.', 'إيجاد الحد المجهول في تناسب، ومنه الوسط المتناسب.', 'Find the unknown term of a proportion, including the mean proportional.'),
        explanation: say(
            'Proportzio batean hiru gai ezagutzen badira, laugarrena propietate nagusiarekin ateratzen da. Ezezaguna muturra bada, erdikoak biderkatu eta beste muturraz zatitzen da; erdikoa bada, muturrak biderkatu eta beste erdikoaz zatitzen da. Bi erdikoak berdinak direnean, $\\frac{a}{x}=\\frac{x}{b}$, $x$ erdiko proportzionala da: $x^{2}=a\\cdot b$.',
            'Si se conocen tres términos de una proporción, el cuarto sale de la propiedad fundamental. Si la incógnita es un extremo, se multiplican los medios y se divide entre el otro extremo; si es un medio, se multiplican los extremos y se divide entre el otro medio. Cuando los dos medios son iguales, $\\frac{a}{x}=\\frac{x}{b}$, $x$ es la media proporcional: $x^{2}=a\\cdot b$.',
            'إذا عُرفت ثلاثة حدود من تناسب فالرابع يخرج من الخاصية الأساسية. إذا كان المجهول طرفًا نضرب الوسطين ونقسم على الطرف الآخر، وإذا كان وسطًا نضرب الطرفين ونقسم على الوسط الآخر. وحين يتساوى الوسطان $\\frac{a}{x}=\\frac{x}{b}$ يكون $x$ الوسط المتناسب: $x^{2}=a\\cdot b$.',
            'If you know three terms of a proportion, the fourth comes from the fundamental property. If the unknown is an extreme, multiply the means and divide by the other extreme; if it is a mean, multiply the extremes and divide by the other mean. When the two means are equal, $\\frac{a}{x}=\\frac{x}{b}$, $x$ is the mean proportional: $x^{2}=a\\cdot b$.'
        ),
        cases: [
            { title: say('Laugarren proportzionala', 'Cuarta proporcional', 'الرابع المتناسب', 'Fourth proportional'), text: say('Hiru gai desberdin ezagunak.', 'Tres términos distintos conocidos.', 'ثلاثة حدود مختلفة معلومة.', 'Three different known terms.'), math: same('$\\frac{4}{10}=\\frac{6}{x}\\ \\to\\ x=\\frac{10\\cdot 6}{4}=15$') },
            { title: say('Erdiko proportzionala', 'Media proporcional', 'الوسط المتناسب', 'Mean proportional'), text: say('Bi erdikoak ezezagunak eta berdinak.', 'Los dos medios desconocidos e iguales.', 'الوسطان مجهولان ومتساويان.', 'The two means are unknown and equal.'), math: same('$\\frac{4}{x}=\\frac{x}{9}\\ \\to\\ x^{2}=36,\\ x=6$') }
        ],
        problem: same('$\\frac{x}{12}=\\frac{15}{20}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezezaguna muturra da: biderkatu erdikoak.', 'La incógnita es un extremo: multiplica los medios.', 'المجهول طرف: اضرب الوسطين.', 'The unknown is an extreme: multiply the means.'), math: same('$12\\cdot 15=180$') },
            { text: say('Zatitu beste muturraz.', 'Divide entre el otro extremo.', 'اقسم على الطرف الآخر.', 'Divide by the other extreme.'), math: same('$x=180\\mathbin{:}20=9$') },
            { text: say('Egiaztatu.', 'Comprueba.', 'تحقق.', 'Check.'), math: same('$9\\cdot 20=12\\cdot 15=180$') }
        ],
        example: same('$\\frac{5}{x}=\\frac{x}{20}\\ \\to\\ x=10$'),
        mistake: {
            wrong: say('$\\frac{4}{10}=\\frac{6}{x}$: goian 2 gehitu da, beraz behean ere bai, $x=12$.', '$\\frac{4}{10}=\\frac{6}{x}$: arriba se ha sumado 2, así que abajo también, $x=12$.', '$\\frac{4}{10}=\\frac{6}{x}$: أضفنا 2 في الأعلى فنضيفه في الأسفل، $x=12$.', '$\\frac{4}{10}=\\frac{6}{x}$: 2 was added on top, so add it at the bottom too, $x=12$.'),
            right: say('Proportzioan biderkatzen da, ez batu: $6$ zenbakia $4\\cdot 1{,}5$ da, beraz $x=10\\cdot 1{,}5=15$.', 'En una proporción se multiplica, no se suma: $6$ es $4\\cdot 1{,}5$, así que $x=10\\cdot 1{,}5=15$.', 'في التناسب نضرب ولا نجمع: $6$ هو $4\\cdot 1{,}5$ إذن $x=10\\cdot 1{,}5=15$.', 'In a proportion you multiply, you do not add: $6$ is $4\\cdot 1{,}5$, so $x=10\\cdot 1{,}5=15$.')
        },
        takeaway: say('Ezezaguna: bi gai gurutzean biderkatu eta hirugarrenaz zatitu. Erdiko proportzionala: $X^{2}=A\\cdot B$.', 'Incógnita: multiplica dos términos en cruz y divide entre el tercero. Media proporcional: $X^{2}=A\\cdot B$.', 'المجهول: اضرب حدّين تبادليًا واقسم على الثالث. الوسط المتناسب: $X^{2}=A\\cdot B$.', 'Unknown: cross-multiply two terms and divide by the third. Mean proportional: $X^{2}=A\\cdot B$.'),
        figure: (language) => <ProportionFigure language={language} />
    },
    {
        id: 'scale',
        stage: 'ratios',
        title: say('Eskalak: planoak eta mapak', 'Escalas: planos y mapas', 'المقاييس: المخططات والخرائط', 'Scales: plans and maps'),
        goal: say('Eskala bat erabiltzea mapako distantzia errealera eta alderantziz igarotzeko.', 'Usar una escala para pasar de la distancia en el mapa a la real, y al revés.', 'استعمال مقياس للانتقال من المسافة على الخريطة إلى الحقيقية والعكس.', 'Use a scale to go from the distance on the map to the real one, and back.'),
        explanation: say(
            'Eskala planoko neurriaren eta neurri errealaren arteko arrazoia da. $1\\mathbin{:}50\\,000$ eskalak esan nahi du mapako 1 cm-k 50 000 cm balio dituela errealitatean, hau da, 500 m. Mapako distantzia eta distantzia erreala zuzenki proportzionalak dira: biderkatu eskalaren zenbakiaz errealera joateko, eta zatitu mapara itzultzeko. Kontuz unitateekin: eskalak unitate bera erabiltzen du bi aldeetan, beraz amaieran aldatu cm-ak m-tara edo km-tara.',
            'La escala es la razón entre una medida en el plano y la medida real. La escala $1\\mathbin{:}50\\,000$ significa que 1 cm del mapa son 50 000 cm en la realidad, es decir, 500 m. La distancia en el mapa y la real son directamente proporcionales: se multiplica por el número de la escala para ir a la real y se divide para volver al mapa. Cuidado con las unidades: la escala usa la misma unidad en los dos lados, así que al final hay que pasar los cm a m o a km.',
            'المقياس هو النسبة بين قياس على المخطط والقياس الحقيقي. المقياس $1\\mathbin{:}50\\,000$ يعني أن 1 سم على الخريطة يساوي 50000 سم في الواقع، أي 500 م. المسافة على الخريطة والمسافة الحقيقية متناسبتان طرديًا: نضرب في عدد المقياس للانتقال إلى الحقيقية ونقسم للعودة إلى الخريطة. انتبه للوحدات: المقياس يستعمل الوحدة نفسها في الطرفين، لذا نحوّل السنتيمترات في النهاية إلى أمتار أو كيلومترات.',
            'A scale is the ratio between a measurement on the plan and the real measurement. The scale $1\\mathbin{:}50\\,000$ means that 1 cm on the map is 50,000 cm in real life, that is, 500 m. The distance on the map and the real distance are directly proportional: multiply by the scale number to get the real distance, and divide to go back to the map. Watch the units: the scale uses the same unit on both sides, so at the end you change the cm into m or km.'
        ),
        problem: say('$1\\mathbin{:}200\\,000$ eskalako mapa batean, bi herrik 7,5 cm-ko tartea dute. Zenbat km dira benetan?', 'En un mapa a escala $1\\mathbin{:}200\\,000$, dos pueblos están a 7,5 cm. ¿Cuántos km hay en realidad?', 'في خريطة بمقياس $1\\mathbin{:}200\\,000$ تفصل بين قريتين 7.5 سم. كم كيلومترًا في الحقيقة؟', 'On a map at a scale of $1\\mathbin{:}200\\,000$, two villages are 7.5 cm apart. How many km is that in real life?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu eskalaren zenbakiaz.', 'Multiplica por el número de la escala.', 'اضرب في عدد المقياس.', 'Multiply by the scale number.'), math: same('$7{,}5\\cdot 200\\,000=1\\,500\\,000$ cm') },
            { text: say('cm-tik km-ra: zatitu 100 000 zenbakiaz.', 'De cm a km: divide entre 100 000.', 'من سم إلى كم: اقسم على 100000.', 'From cm to km: divide by 100,000.'), math: same('$1\\,500\\,000\\mathbin{:}100\\,000=15$') },
            { text: say('15 km dira.', 'Son 15 km.', 'إنها 15 كم.', 'It is 15 km.') }
        ],
        example: same('$1\\mathbin{:}500\\ \\to\\ 4\\ \\mathrm{cm}=2000\\ \\mathrm{cm}=20\\ \\mathrm{m}$'),
        mistake: {
            wrong: say('$1\\mathbin{:}50\\,000$ eskalan, mapako 3 cm-k 150 000 km dira.', 'A escala $1\\mathbin{:}50\\,000$, 3 cm del mapa son 150 000 km.', 'بمقياس $1\\mathbin{:}50\\,000$ تساوي 3 سم على الخريطة 150000 كم.', 'At a scale of $1\\mathbin{:}50\\,000$, 3 cm on the map is 150,000 km.'),
            right: say('Emaitza cm-tan dago: $150\\,000$ cm $=1{,}5$ km. Eskalak ez du unitatea aldatzen.', 'El resultado está en cm: $150\\,000$ cm $=1{,}5$ km. La escala no cambia la unidad.', 'النتيجة بالسنتيمتر: $150\\,000$ سم $=1{,}5$ كم. المقياس لا يغيّر الوحدة.', 'The result is in cm: $150\\,000$ cm $=1{,}5$ km. The scale does not change the unit.')
        },
        takeaway: say('Erreala = planoa · eskala. Unitate bera bi aldeetan; gero, $1\\ \\mathrm{KM}=100\\,000\\ \\mathrm{CM}$.', 'Real = plano · escala. La misma unidad a los dos lados; después, $1\\ \\mathrm{KM}=100\\,000\\ \\mathrm{CM}$.', 'الحقيقي = المخطط · المقياس. الوحدة نفسها في الطرفين ثم $1\\ \\mathrm{KM}=100\\,000\\ \\mathrm{CM}$.', 'Real = plan · scale. The same unit on both sides; then $1\\ \\mathrm{KM}=100\\,000\\ \\mathrm{CM}$.'),
        figure: (language) => <ScaleFigure language={language} />
    },

    /* ---------- 2. Direct and inverse ---------- */
    {
        id: 'direct',
        stage: 'simple',
        title: say('Proportzionaltasun zuzena', 'Proporcionalidad directa', 'التناسب الطردي', 'Direct proportion'),
        goal: say('Magnitude zuzenki proportzionalak ezagutzea eta problemak unitatera laburtuz edo hiruko erregelaz ebaztea.', 'Reconocer magnitudes directamente proporcionales y resolver problemas reduciendo a la unidad o con regla de tres.', 'التعرّف على المقادير المتناسبة طرديًا وحلّ المسائل بالإرجاع إلى الوحدة أو بقاعدة الثلاثة.', 'Recognise directly proportional quantities and solve problems with the unitary method or the rule of three.'),
        explanation: say(
            'Bi magnitude zuzenki proportzionalak dira batetik bestera beti zenbaki beraz biderkatzen denean: bata bikoiztean bestea bikoizten da, eta erdira jaistean bestea ere bai. Zatidura konstantea da, $\\frac{b}{a}=k$, eta $k$ proportzionaltasun-konstantea da. Bi modutan ebazten da.',
            'Dos magnitudes son directamente proporcionales cuando de una a otra se multiplica siempre por el mismo número: si una se dobla, la otra se dobla, y si una se reduce a la mitad, la otra también. El cociente es constante, $\\frac{b}{a}=k$, y $k$ es la constante de proporcionalidad. Se resuelve de dos maneras.',
            'يكون المقداران متناسبين طرديًا إذا ضربنا دائمًا في العدد نفسه للانتقال من أحدهما إلى الآخر: إذا تضاعف أحدهما تضاعف الآخر، وإذا صار نصفه صار الآخر نصفه. حاصل القسمة ثابت $\\frac{b}{a}=k$ و$k$ ثابت التناسب. ويُحلّ بطريقتين.',
            'Two quantities are directly proportional when you always multiply by the same number to go from one to the other: if one doubles, the other doubles, and if one halves, so does the other. The quotient is constant, $\\frac{b}{a}=k$, and $k$ is the constant of proportionality. There are two ways to solve it.'
        ),
        cases: [
            { title: say('Unitatera laburtuz', 'Reducción a la unidad', 'الإرجاع إلى الوحدة', 'Unitary method'), text: say('Lehenik unitate baten balioa, gero eskatutakoa.', 'Primero el valor de una unidad y luego el que se pide.', 'أولًا قيمة الوحدة ثم المطلوب.', 'First the value of one unit, then the one asked for.'), math: same('$\\frac{9{,}60}{8}=1{,}20\\ \\to\\ 1{,}20\\cdot 5=6$') },
            { title: say('Hiruko erregela', 'Regla de tres', 'قاعدة الثلاثة', 'Rule of three'), text: say('Proportzioa eta gurutzean biderkatu.', 'La proporción y multiplicar en cruz.', 'التناسب والضرب التبادلي.', 'The proportion and cross-multiplying.'), math: same('$\\frac{8}{5}=\\frac{9{,}60}{x}\\ \\to\\ x=\\frac{5\\cdot 9{,}60}{8}=6$') }
        ],
        problem: say('8 kg sagarrek 9,60 € balio dute. Zenbat balio dute 5 kg-k?', '8 kg de manzanas cuestan 9,60 €. ¿Cuánto cuestan 5 kg?', '8 كغ من التفاح تكلّف 9.60 €. كم تكلّف 5 كغ؟', '8 kg of apples cost €9.60. How much do 5 kg cost?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kilo gehiago → euro gehiago: zuzena.', 'Más kilos → más euros: directa.', 'كيلوغرامات أكثر ← يوروهات أكثر: طردي.', 'More kilos → more euros: direct.') },
            { text: say('Kilo baten prezioa.', 'El precio de un kilo.', 'سعر الكيلوغرام.', 'The price of one kilo.'), math: same('$9{,}60\\mathbin{:}8=1{,}20$') },
            { text: say('Biderkatu: bider 5, 6 €.', 'Multiplica por 5: 6 €.', 'اضرب في 5: 6 €.', 'Multiply by 5: €6.'), math: same('$1{,}20\\cdot 5=6$') }
        ],
        example: same('$\\frac{3}{4{,}50}=\\frac{7}{x}\\ \\to\\ x=10{,}50$'),
        mistake: {
            wrong: say('Bi magnitude biak hazten badira, zuzenki proportzionalak dira: adina eta altuera, adibidez.', 'Si dos magnitudes crecen a la vez, son directamente proporcionales: la edad y la altura, por ejemplo.', 'إذا كبر مقداران معًا فهما متناسبان طرديًا: العمر والطول مثلًا.', 'If two quantities grow together, they are directly proportional: age and height, for example.'),
            right: say('Hazteaz gain, proportzio berean hazi behar dute: 10 urterekin ez da 5 urterekin baino bi aldiz altuagoa.', 'Además de crecer, tienen que crecer en la misma proporción: con 10 años no se mide el doble que con 5.', 'لا يكفي أن يكبرا، بل يجب أن يكبرا بالنسبة نفسها: في العاشرة لا يكون الطول ضعفه في الخامسة.', 'As well as growing, they must grow in the same proportion: at 10 you are not twice as tall as at 5.')
        },
        takeaway: say('Zuzena: zatidura konstantea. $X=\\frac{B\\cdot C}{A}$ edo lehenik unitate baten balioa.', 'Directa: cociente constante. $X=\\frac{B\\cdot C}{A}$ o primero el valor de una unidad.', 'الطردي: حاصل قسمة ثابت. $X=\\frac{B\\cdot C}{A}$ أو قيمة الوحدة أولًا.', 'Direct: constant quotient. $X=\\frac{B\\cdot C}{A}$, or first the value of one unit.'),
        figure: (language) => <RuleOfThreeFigure language={language} />
    },
    {
        id: 'inverse',
        stage: 'simple',
        title: say('Alderantzizko proportzionaltasuna', 'Proporcionalidad inversa', 'التناسب العكسي', 'Inverse proportion'),
        goal: say('Alderantziz proportzionalak diren magnitudeak ezagutzea eta problemak biderkadura konstantearekin ebaztea.', 'Reconocer magnitudes inversamente proporcionales y resolver problemas con el producto constante.', 'التعرّف على المقادير المتناسبة عكسيًا وحلّ المسائل بحاصل الضرب الثابت.', 'Recognise inversely proportional quantities and solve problems with the constant product.'),
        explanation: say(
            'Bi magnitude alderantziz proportzionalak dira bata zenbaki batez biderkatzean bestea zenbaki horretaz zatitzen denean: langile bikoitzek lana denbora erdian egiten dute. Biderkadura konstantea da, $a\\cdot b=k$. Ebazteko, kalkulatu lehenik biderkadura hori (lan osoa, bide osoa, ur osoa…) eta zatitu balio berriaz. Bi gurpil hortzdunetan, hortz kopurua eta biraketa-abiadura alderantziz proportzionalak dira: hortz gehiago dituen gurpilak mantsoago egiten du bira.',
            'Dos magnitudes son inversamente proporcionales cuando, al multiplicar una por un número, la otra queda dividida entre ese número: el doble de obreros hace el trabajo en la mitad de tiempo. El producto es constante, $a\\cdot b=k$. Para resolver, calcula primero ese producto (el trabajo total, el camino total, el agua total…) y divide entre el valor nuevo. En dos ruedas dentadas, el número de dientes y la velocidad de giro son inversamente proporcionales: la rueda con más dientes gira más despacio.',
            'يكون المقداران متناسبين عكسيًا إذا ضربنا أحدهما في عدد فانقسم الآخر على ذلك العدد: ضعف العمال ينجز العمل في نصف الوقت. حاصل الضرب ثابت $a\\cdot b=k$. وللحل احسب أولًا هذا الحاصل (العمل كله أو الطريق كله أو الماء كله…) ثم اقسم على القيمة الجديدة. وفي عجلتين مسننتين يتناسب عدد الأسنان مع سرعة الدوران عكسيًا: العجلة ذات الأسنان الأكثر تدور أبطأ.',
            'Two quantities are inversely proportional when, if you multiply one by a number, the other is divided by that number: twice as many workers do the job in half the time. The product is constant, $a\\cdot b=k$. To solve, first work out that product (the total work, the total distance, the total water…) and divide by the new value. In two gear wheels, the number of teeth and the turning speed are inversely proportional: the wheel with more teeth turns more slowly.'
        ),
        problem: say('6 margolarik etxe bat 10 egunean margotzen dute. Zenbat egun beharko lituzkete 4 margolarik?', '6 pintores pintan una casa en 10 días. ¿Cuántos días tardarían 4 pintores?', '6 دهّانين يدهنون بيتًا في 10 أيام. كم يومًا يحتاج 4 دهّانين؟', '6 painters paint a house in 10 days. How many days would 4 painters take?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Margolari gutxiago → egun gehiago: alderantzizkoa.', 'Menos pintores → más días: inversa.', 'دهّانون أقل ← أيام أكثر: عكسي.', 'Fewer painters → more days: inverse.') },
            { text: say('Lan osoa, margolari-egunetan.', 'El trabajo total, en días de pintor.', 'العمل كله بأيام الدهّان.', 'The total work, in painter-days.'), math: same('$6\\cdot 10=60$') },
            { text: say('Zatitu 4 zenbakiaz: 15 egun.', 'Divide entre 4: 15 días.', 'اقسم على 4: 15 يومًا.', 'Divide by 4: 15 days.'), math: same('$60\\mathbin{:}4=15$') }
        ],
        example: same('$\\frac{24\\cdot 30}{40}=18$'),
        mistake: {
            wrong: say('6 margolarik 10 egun; 4 margolarik: $\\frac{4\\cdot 10}{6}\\approx 6{,}7$ egun.', '6 pintores, 10 días; 4 pintores: $\\frac{4\\cdot 10}{6}\\approx 6{,}7$ días.', '6 دهّانين 10 أيام؛ 4 دهّانين: $\\frac{4\\cdot 10}{6}\\approx 6{,}7$ يوم.', '6 painters, 10 days; 4 painters: $\\frac{4\\cdot 10}{6}\\approx 6{,}7$ days.'),
            right: say('Hiruko erregela zuzena aplikatu da. Margolari gutxiagok gehiago behar dute: $\\frac{6\\cdot 10}{4}=15$ egun.', 'Se ha aplicado la regla de tres directa. Menos pintores tardan más: $\\frac{6\\cdot 10}{4}=15$ días.', 'طُبّقت القاعدة الطردية. العمال الأقل يحتاجون وقتًا أطول: $\\frac{6\\cdot 10}{4}=15$ يومًا.', 'The direct rule was used. Fewer painters take longer: $\\frac{6\\cdot 10}{4}=15$ days.')
        },
        takeaway: say('Alderantzizkoa: biderkadura konstantea. $X=\\frac{A\\cdot B}{C}$.', 'Inversa: producto constante. $X=\\frac{A\\cdot B}{C}$.', 'العكسي: حاصل ضرب ثابت. $X=\\frac{A\\cdot B}{C}$.', 'Inverse: constant product. $X=\\frac{A\\cdot B}{C}$.'),
        figure: (language) => <GearsFigure language={language} />
    },
    {
        id: 'graphs',
        stage: 'simple',
        title: say('Taulak eta grafikoak', 'Tablas y gráficas', 'الجداول والتمثيلات البيانية', 'Tables and graphs'),
        goal: say('Taula edo grafiko batetik erlazioa zuzena, alderantzizkoa ala bat ere ez den erabakitzea.', 'Decidir a partir de una tabla o una gráfica si la relación es directa, inversa o ninguna.', 'تحديد ما إذا كانت العلاقة طردية أو عكسية أو لا هذا ولا ذاك انطلاقًا من جدول أو تمثيل بياني.', 'Decide from a table or a graph whether the relationship is direct, inverse or neither.'),
        explanation: say(
            'Taula batean, kalkulatu zatidura eta biderkadura bikote bakoitzarekin. Zatidura beti bera bada, zuzena da; biderkadura beti bera bada, alderantzizkoa; bestela, ez da proportzionala. Grafikoan ere ikusten da: zuzenaren puntuak jatorritik pasatzen den zuzen batean daude, eta alderantzizkoarenak hiperbola batean, bi ardatzetara hurbiltzen den kurba batean, inoiz ukitu gabe.',
            'En una tabla, calcula el cociente y el producto de cada pareja. Si el cociente es siempre el mismo, es directa; si lo es el producto, inversa; si no, no es proporcional. En la gráfica también se ve: los puntos de una directa están en una recta que pasa por el origen, y los de una inversa en una hipérbola, una curva que se acerca a los dos ejes sin tocarlos nunca.',
            'في الجدول احسب حاصل القسمة وحاصل الضرب لكل زوج. إذا كان حاصل القسمة ثابتًا فالعلاقة طردية، وإذا كان حاصل الضرب ثابتًا فهي عكسية، وإلا فليست تناسبًا. ويظهر ذلك في التمثيل البياني أيضًا: نقاط الطردي على مستقيم يمر بالأصل، ونقاط العكسي على قطع زائد، وهو منحنٍ يقترب من المحورين دون أن يلمسهما.',
            'In a table, work out the quotient and the product of each pair. If the quotient is always the same, it is direct; if the product is, inverse; otherwise it is not proportional. You can see it on the graph too: the points of a direct relationship lie on a straight line through the origin, and those of an inverse one on a hyperbola, a curve that gets closer and closer to both axes without ever touching them.'
        ),
        cases: [
            { title: say('Zuzena', 'Directa', 'طردي', 'Direct'), text: say('Zatidura konstantea; jatorritik pasatzen den zuzena.', 'Cociente constante; recta por el origen.', 'حاصل قسمة ثابت؛ مستقيم يمر بالأصل.', 'Constant quotient; a line through the origin.'), math: same('$\\frac{y}{x}=k$') },
            { title: say('Alderantzizkoa', 'Inversa', 'عكسي', 'Inverse'), text: say('Biderkadura konstantea; hiperbola.', 'Producto constante; hipérbola.', 'حاصل ضرب ثابت؛ قطع زائد.', 'Constant product; a hyperbola.'), math: same('$x\\cdot y=k$') },
            { title: say('Bat ere ez', 'Ninguna', 'لا هذا ولا ذاك', 'Neither'), text: say('Zatidura eta biderkadura aldatzen dira. Taxi baten prezioa: 3 € hasieran eta 1 € km bakoitzeko.', 'Cambian el cociente y el producto. El precio de un taxi: 3 € de bajada y 1 € por km.', 'يتغير حاصل القسمة وحاصل الضرب. أجرة سيارة الأجرة: 3 € في البداية و1 € لكل كم.', 'Both the quotient and the product change. A taxi fare: €3 to start and €1 per km.'), math: same('$\\frac{4}{1}\\neq\\frac{5}{2}$') }
        ],
        problem: say('Taula: $x$: 2, 3, 6; $y$: 9, 6, 3. Zer erlazio da?', 'Tabla: $x$: 2, 3, 6; $y$: 9, 6, 3. ¿Qué relación es?', 'الجدول: $x$: 2، 3، 6؛ $y$: 9، 6، 3. ما العلاقة؟', 'Table: $x$: 2, 3, 6; $y$: 9, 6, 3. What kind of relationship is it?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatidurak: ez dira berdinak.', 'Cocientes: no son iguales.', 'حواصل القسمة: غير متساوية.', 'Quotients: they are not equal.'), math: same('$\\frac{9}{2}\\neq\\frac{6}{3}$') },
            { text: say('Biderkadurak: beti 18.', 'Productos: siempre 18.', 'حواصل الضرب: دائمًا 18.', 'Products: always 18.'), math: same('$2\\cdot 9=3\\cdot 6=6\\cdot 3=18$') },
            { text: say('Alderantzizkoa da, $k=18$, eta grafikoa hiperbola bat da.', 'Es inversa, con $k=18$, y su gráfica es una hipérbola.', 'إنها عكسية مع $k=18$ وتمثيلها قطع زائد.', 'It is inverse, with $k=18$, and its graph is a hyperbola.') }
        ],
        example: same('$\\frac{5}{2}=\\frac{10}{4}=\\frac{15}{6}=2{,}5$'),
        mistake: {
            wrong: say('Grafikoa beherantz doa; beraz, alderantziz proportzionala da.', 'La gráfica baja; por tanto, es inversamente proporcional.', 'التمثيل ينزل؛ إذن هو تناسب عكسي.', 'The graph goes down, so it is inversely proportional.'),
            right: say('Beherantz doan zuzen bat ez da alderantzizkoa: biderkadura konstantea izan behar da, eta grafikoa hiperbola.', 'Una recta que baja no es inversa: el producto tiene que ser constante, y la gráfica una hipérbola.', 'المستقيم النازل ليس عكسيًا: يجب أن يكون حاصل الضرب ثابتًا والتمثيل قطعًا زائدًا.', 'A line going down is not inverse: the product must be constant, and the graph a hyperbola.')
        },
        takeaway: say('Zuzena: zuzen bat $(0,0)$ puntutik. Alderantzizkoa: hiperbola. Biak ez: ez da proportzionala.', 'Directa: una recta por $(0,0)$. Inversa: una hipérbola. Ni una ni otra: no es proporcional.', 'الطردي: مستقيم يمر بـ $(0,0)$. العكسي: قطع زائد. غير ذلك: ليس تناسبًا.', 'Direct: a line through $(0,0)$. Inverse: a hyperbola. Neither: not proportional.'),
        figure: (language) => <GraphsFigure language={language} />
    },

    /* ---------- 3. Compound proportion and shares ---------- */
    {
        id: 'compound',
        stage: 'compound',
        title: say('Proportzionaltasun konposatua', 'Proporcionalidad compuesta', 'التناسب المركّب', 'Compound proportion'),
        goal: say('Hiru magnitude edo gehiago dituzten problemak ebaztea, bakoitza ezezagunarekin zuzena ala alderantzizkoa den erabakiz.', 'Resolver problemas con tres o más magnitudes, decidiendo si cada una es directa o inversa con la incógnita.', 'حلّ مسائل فيها ثلاثة مقادير أو أكثر بتحديد ما إذا كان كل منها طرديًا أو عكسيًا مع المجهول.', 'Solve problems with three or more quantities, deciding whether each is direct or inverse with the unknown.'),
        explanation: say(
            'Proportzionaltasun konposatuan hiru magnitude edo gehiago daude. Konparatu magnitude bakoitza ezezagunarekin, besteak finko utzita: zuzena bada, haren zatikia berria/zaharra da; alderantzizkoa bada, zaharra/berria. Ezezaguna haren balio zaharra bider zatiki guztiak da. Adibidez, makina gehiagok produktu gehiago egiten dute (zuzena), baina makina gehiagorekin denbora gutxiago behar da (alderantzizkoa).',
            'En la proporcionalidad compuesta intervienen tres o más magnitudes. Compara cada magnitud con la incógnita dejando fijas las demás: si es directa, su fracción es nuevo/viejo; si es inversa, viejo/nuevo. La incógnita es su valor viejo por todas las fracciones. Por ejemplo, más máquinas hacen más productos (directa), pero con más máquinas se tarda menos (inversa).',
            'في التناسب المركّب ثلاثة مقادير أو أكثر. قارن كل مقدار بالمجهول مع تثبيت البقية: إذا كان طرديًا فكسره الجديد/القديم، وإذا كان عكسيًا فالقديم/الجديد. والمجهول هو قيمته القديمة مضروبة في كل الكسور. مثلًا الآلات الأكثر تصنع منتجات أكثر (طردي)، لكنها تحتاج وقتًا أقل (عكسي).',
            'Compound proportion involves three or more quantities. Compare each quantity with the unknown while keeping the others fixed: if it is direct, its fraction is new/old; if it is inverse, old/new. The unknown is its old value times all the fractions. For example, more machines make more products (direct), but with more machines it takes less time (inverse).'
        ),
        problem: say('5 makinak 400 pieza egiten dituzte 8 orduan. Zenbat ordu beharko dituzte 4 makinak 600 pieza egiteko?', '5 máquinas hacen 400 piezas en 8 horas. ¿Cuántas horas tardarán 4 máquinas en hacer 600 piezas?', '5 آلات تصنع 400 قطعة في 8 ساعات. كم ساعة تحتاج 4 آلات لصنع 600 قطعة؟', '5 machines make 400 parts in 8 hours. How many hours will 4 machines take to make 600 parts?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Makinak eta orduak: alderantzizkoa → $\\frac{5}{4}$.', 'Máquinas y horas: inversa → $\\frac{5}{4}$.', 'الآلات والساعات: عكسي ← $\\frac{5}{4}$.', 'Machines and hours: inverse → $\\frac{5}{4}$.') },
            { text: say('Piezak eta orduak: zuzena → $\\frac{600}{400}$.', 'Piezas y horas: directa → $\\frac{600}{400}$.', 'القطع والساعات: طردي ← $\\frac{600}{400}$.', 'Parts and hours: direct → $\\frac{600}{400}$.') },
            { text: say('Biderkatu: 15 ordu.', 'Multiplica: 15 horas.', 'اضرب: 15 ساعة.', 'Multiply: 15 hours.'), math: same('$8\\cdot\\frac{5}{4}\\cdot\\frac{600}{400}=15$') }
        ],
        example: same('$12\\cdot\\frac{6}{4}\\cdot\\frac{3}{9}=6$'),
        mistake: {
            wrong: say('Magnitude guztiak ezezagunarekin batera konparatu dira: «makina gutxiago eta pieza gehiago, beraz ordu gehiago», eta zatiki guztiak berria/zaharra moduan jarri dira.', 'Se han comparado todas a la vez y se han puesto todas las fracciones como nuevo/viejo.', 'قورنت المقادير كلها معًا ووُضعت كل الكسور على صورة الجديد/القديم.', 'All the quantities were compared at once and every fraction was written as new/old.'),
            right: say('Magnitude bakoitza bakarka konparatzen da ezezagunarekin. Alderantzizkoetan zatikia buelta emanda doa: zaharra/berria.', 'Cada magnitud se compara por separado con la incógnita. En las inversas la fracción va al revés: viejo/nuevo.', 'يُقارن كل مقدار وحده بالمجهول. وفي العكسية يُقلب الكسر: القديم/الجديد.', 'Each quantity is compared with the unknown on its own. For the inverse ones the fraction is turned round: old/new.')
        },
        takeaway: say('Zuzena: $\\frac{BERRIA}{ZAHARRA}$. Alderantzizkoa: $\\frac{ZAHARRA}{BERRIA}$. Gero, biderkatu guztiak.', 'Directa: $\\frac{NUEVO}{VIEJO}$. Inversa: $\\frac{VIEJO}{NUEVO}$. Después, multiplica todo.', 'الطردي: الجديد/القديم. العكسي: القديم/الجديد. ثم اضرب كل شيء.', 'Direct: $\\frac{NEW}{OLD}$. Inverse: $\\frac{OLD}{NEW}$. Then multiply everything.'),
        figure: (language) => <CompoundMixedFigure language={language} />
    },
    {
        id: 'direct-share',
        stage: 'compound',
        title: say('Banaketa zuzenki proportzionala', 'Reparto directamente proporcional', 'التوزيع الطردي', 'Sharing in direct proportion'),
        goal: say('Kopuru bat zenbait zenbakiri zuzenki proportzionalean banatzea.', 'Repartir una cantidad en partes directamente proporcionales a varios números.', 'توزيع كمية على أجزاء متناسبة طرديًا مع عدة أعداد.', 'Share a quantity in parts directly proportional to several numbers.'),
        explanation: say(
            'Banaketa zuzenean, zenbaki handiagoari zati handiagoa dagokio. Batu zenbaki guztiak, zatitu kopurua batura horretaz (zati bakar baten balioa da) eta biderkatu bakoitzaren zenbakiaz. Amaieran, zatien batura hasierako kopurua izan behar da: horrela egiaztatzen da. Adibidez, 3, 5 eta 7 ordu lan egin dutenen artean 300 € banatzean, ordu bakoitzak $300\\mathbin{:}15=20$ € balio du.',
            'En un reparto directo, al número mayor le toca la parte mayor. Suma todos los números, divide la cantidad entre esa suma (es el valor de una parte) y multiplica por el número de cada uno. Al final, la suma de las partes debe dar la cantidad inicial: así se comprueba. Por ejemplo, al repartir 300 € entre quienes trabajaron 3, 5 y 7 horas, cada hora vale $300\\mathbin{:}15=20$ €.',
            'في التوزيع الطردي ينال العدد الأكبر الحصة الأكبر. اجمع الأعداد كلها، واقسم الكمية على هذا المجموع (قيمة الجزء الواحد)، ثم اضرب في عدد كل واحد. وفي النهاية يجب أن يكون مجموع الحصص هو الكمية الأصلية: هكذا نتحقق. مثلًا عند توزيع 300 € على من عملوا 3 و5 و7 ساعات، تساوي كل ساعة $300\\mathbin{:}15=20$ €.',
            'In a direct share, the larger number gets the larger part. Add all the numbers, divide the quantity by that sum (it is the value of one part) and multiply by each person\'s number. At the end, the parts must add up to the starting quantity: that is how you check. For example, sharing €300 among people who worked 3, 5 and 7 hours, each hour is worth $300\\mathbin{:}15=20$ €.'
        ),
        problem: say('Banatu 300 € 3, 5 eta 7 ordu lan egin duten hiru lagunen artean.', 'Reparte 300 € entre tres amigos que trabajaron 3, 5 y 7 horas.', 'وزّع 300 € على ثلاثة أصدقاء عملوا 3 و5 و7 ساعات.', 'Share €300 among three friends who worked 3, 5 and 7 hours.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu orduak.', 'Suma las horas.', 'اجمع الساعات.', 'Add the hours.'), math: same('$3+5+7=15$') },
            { text: say('Ordu baten balioa.', 'Lo que vale una hora.', 'قيمة الساعة.', 'What one hour is worth.'), math: same('$300\\mathbin{:}15=20$') },
            { text: say('Biderkatu: 60 €, 100 € eta 140 €.', 'Multiplica: 60 €, 100 € y 140 €.', 'اضرب: 60 € و100 € و140 €.', 'Multiply: €60, €100 and €140.'), math: same('$60+100+140=300$') }
        ],
        example: same('$\\frac{720}{2+3+4}=80\\ \\to\\ 160,\\ 240,\\ 320$'),
        mistake: {
            wrong: say('Hiru pertsona daudenez, bakoitzari $300\\mathbin{:}3=100$ € ematen zaizkio.', 'Como son tres personas, a cada una se le dan $300\\mathbin{:}3=100$ €.', 'لأنهم ثلاثة يُعطى كلٌّ $300\\mathbin{:}3=100$ €.', 'Since there are three people, each one gets $300\\mathbin{:}3=100$ €.'),
            right: say('Hori banaketa berdina da. Proportzionalean, zatitu zenbakien baturaz, ez pertsona kopuruaz.', 'Eso es un reparto a partes iguales. En el proporcional se divide entre la suma de los números, no entre el número de personas.', 'هذا توزيع بالتساوي. وفي التوزيع التناسبي نقسم على مجموع الأعداد لا على عدد الأشخاص.', 'That is an equal share. In a proportional share you divide by the sum of the numbers, not by the number of people.')
        },
        takeaway: say('Zati bat $=\\frac{KOPURUA}{BATURA}$; bakoitzari, bere zenbakia bider zati bat.', 'Una parte $=\\frac{CANTIDAD}{SUMA}$; a cada uno, su número por una parte.', 'الجزء $=\\frac{C}{S}$؛ ولكل واحد عدده في الجزء.', 'One part $=\\frac{AMOUNT}{SUM}$; each person gets their number times one part.'),
        figure: (language) => <DirectShareFigure language={language} />
    },
    {
        id: 'inverse-share',
        stage: 'compound',
        title: say('Banaketa alderantziz proportzionala', 'Reparto inversamente proporcional', 'التوزيع العكسي', 'Sharing in inverse proportion'),
        goal: say('Kopuru bat zenbait zenbakiri alderantziz proportzionalean banatzea, haien alderantzizkoekiko zuzenean banatuz.', 'Repartir una cantidad en partes inversamente proporcionales a varios números, repartiendo de forma directa a sus inversos.', 'توزيع كمية توزيعًا عكسيًا على عدة أعداد بالتوزيع الطردي على مقلوباتها.', 'Share a quantity in inverse proportion to several numbers by sharing in direct proportion to their reciprocals.'),
        explanation: say(
            'Banaketa alderantzizkoan, zenbaki handiagoari zati txikiagoa dagokio: huts gehiago egiten dituenak sari gutxiago jasotzen du. Ebazteko, banatu kopurua zenbakien alderantzizkoekiko zuzenki proportzionalean. Zatikiekin ez lan egiteko, biderkatu alderantzizko guztiak izendatzaileen m.k.t.-az: 2, 3 eta 6 zenbakien alderantzizkoak $\\frac{1}{2}$, $\\frac{1}{3}$ eta $\\frac{1}{6}$ dira, eta bider 6 eginda 3, 2 eta 1.',
            'En un reparto inverso, al número mayor le toca la parte menor: quien comete más fallos recibe menos premio. Para resolverlo, reparte la cantidad de forma directa a los inversos de los números. Para no trabajar con fracciones, multiplica todos los inversos por el m.c.m. de los denominadores: los inversos de 2, 3 y 6 son $\\frac{1}{2}$, $\\frac{1}{3}$ y $\\frac{1}{6}$, y multiplicados por 6 dan 3, 2 y 1.',
            'في التوزيع العكسي ينال العدد الأكبر الحصة الأصغر: من يخطئ أكثر يأخذ جائزة أقل. وللحل وزّع الكمية توزيعًا طرديًا على مقلوبات الأعداد. ولتجنب الكسور اضرب كل المقلوبات في المضاعف المشترك الأصغر للمقامات: مقلوبات 2 و3 و6 هي $\\frac{1}{2}$ و$\\frac{1}{3}$ و$\\frac{1}{6}$، ومضروبة في 6 تصير 3 و2 و1.',
            'In an inverse share, the larger number gets the smaller part: whoever makes more mistakes gets a smaller prize. To solve it, share the quantity in direct proportion to the reciprocals of the numbers. To avoid working with fractions, multiply all the reciprocals by the LCM of the denominators: the reciprocals of 2, 3 and 6 are $\\frac{1}{2}$, $\\frac{1}{3}$ and $\\frac{1}{6}$, and multiplied by 6 they give 3, 2 and 1.'
        ),
        problem: say('Banatu 360 € 2, 3 eta 6 akats egin dituztenen artean, akatsekiko alderantziz proportzionalean.', 'Reparte 360 € entre quienes cometieron 2, 3 y 6 fallos, de forma inversamente proporcional a los fallos.', 'وزّع 360 € على من ارتكبوا 2 و3 و6 أخطاء توزيعًا عكسيًا مع الأخطاء.', 'Share €360 among people who made 2, 3 and 6 mistakes, in inverse proportion to the mistakes.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Alderantzizkoak, bider 6.', 'Los inversos, multiplicados por 6.', 'المقلوبات مضروبة في 6.', 'The reciprocals, multiplied by 6.'), math: same('$\\frac{1}{2},\\frac{1}{3},\\frac{1}{6}\\ \\to\\ 3,2,1$') },
            { text: say('Zati baten balioa.', 'El valor de una parte.', 'قيمة الجزء.', 'The value of one part.'), math: same('$360\\mathbin{:}(3+2+1)=60$') },
            { text: say('180 €, 120 € eta 60 €: akats gutxien egin duenak gehien.', '180 €, 120 € y 60 €: quien menos falló, más recibe.', '180 € و120 € و60 €: الأقل خطأً يأخذ الأكثر.', '€180, €120 and €60: whoever made the fewest mistakes gets the most.'), math: same('$180+120+60=360$') }
        ],
        example: same('$\\frac{1}{4},\\frac{1}{6}\\ \\to\\ 3,2\\quad\\frac{500}{5}=100$'),
        mistake: {
            wrong: say('Alderantzizkoa denez, banatu zuzenean 2, 3 eta 6 zenbakiekiko eta trukatu emaitzak.', 'Como es inversa, se reparte de forma directa a 2, 3 y 6 y se cambian los resultados de sitio.', 'لأنه عكسي نوزع طرديًا على 2 و3 و6 ثم نبدّل النتائج.', 'Since it is inverse, share directly in proportion to 2, 3 and 6 and swap the results round.'),
            right: say('Trukatzeak ez du balio: 72, 108 eta 180 lortuko lirateke, ez 180, 120 eta 60. Alderantzizkoekin banatu behar da.', 'Cambiar de sitio no sirve: saldrían 72, 108 y 180, no 180, 120 y 60. Hay que repartir con los inversos.', 'التبديل لا ينفع: سنحصل على 72 و108 و180 لا 180 و120 و60. يجب التوزيع على المقلوبات.', 'Swapping does not work: you would get 72, 108 and 180, not 180, 120 and 60. You must share using the reciprocals.')
        },
        takeaway: say('Alderantzizkoa: banatu zuzenean $\\frac{1}{A}$, $\\frac{1}{B}$, $\\frac{1}{C}$ zenbakiekiko.', 'Inverso: reparte de forma directa a $\\frac{1}{A}$, $\\frac{1}{B}$, $\\frac{1}{C}$.', 'العكسي: وزّع طرديًا على $\\frac{1}{A}$ و$\\frac{1}{B}$ و$\\frac{1}{C}$.', 'Inverse: share directly in proportion to $\\frac{1}{A}$, $\\frac{1}{B}$, $\\frac{1}{C}$.'),
        figure: (language) => <InverseShareFigure language={language} />
    },

    /* ---------- 4. Percentages and interest ---------- */
    {
        id: 'percent-index',
        stage: 'percent',
        title: say('Ehunekoak eta aldakuntza-indizea', 'Porcentajes e índice de variación', 'النسب المئوية ومؤشر التغيّر', 'Percentages and the index of change'),
        goal: say('Ehunekoak kalkulatzea, eta igoerak eta jaitsierak aldakuntza-indize batekin egitea, hasierako kopurua ere aurkituz.', 'Calcular porcentajes y hacer aumentos y disminuciones con el índice de variación, también para hallar la cantidad inicial.', 'حساب النسب المئوية وإجراء الزيادة والنقصان بمؤشر التغيّر، ومنه إيجاد الكمية الأصلية.', 'Work out percentages and apply increases and decreases with the index of change, including finding the original amount.'),
        explanation: say(
            'Ehuneko bat izendatzailea 100 duen arrazoia da: % 15 $\\frac{15}{100}=0{,}15$ da. Kopuru bat % $r$ igotzen bada, amaierakoa hasierakoa bider $1+\\frac{r}{100}$ da; % $r$ jaisten bada, bider $1-\\frac{r}{100}$. Zenbaki horri aldakuntza-indizea deritzo: % 20 igotzeko indizea 1,2 da eta % 20 jaisteko 0,8. Hasierakoa ezagutu nahi bada, zatitu amaierakoa indizeaz.',
            'Un porcentaje es una razón con denominador 100: el 15 % es $\\frac{15}{100}=0{,}15$. Si una cantidad aumenta un $r$ %, la final es la inicial por $1+\\frac{r}{100}$; si disminuye un $r$ %, por $1-\\frac{r}{100}$. Ese número es el índice de variación: un aumento del 20 % es 1,2 y una rebaja del 20 % es 0,8. Para saber la inicial, divide la final entre el índice.',
            'النسبة المئوية نسبة مقامها 100: ‏15٪ هي $\\frac{15}{100}=0{,}15$. إذا زادت كمية بنسبة $r$٪ فالنهائية هي الأصلية مضروبة في $1+\\frac{r}{100}$، وإذا نقصت فمضروبة في $1-\\frac{r}{100}$. هذا العدد هو مؤشر التغيّر: زيادة 20٪ مؤشرها 1.2 وتخفيض 20٪ مؤشره 0.8. ولمعرفة الأصلية اقسم النهائية على المؤشر.',
            'A percentage is a ratio with denominator 100: 15% is $\\frac{15}{100}=0{,}15$. If a quantity goes up by $r$%, the final amount is the original times $1+\\frac{r}{100}$; if it goes down by $r$%, times $1-\\frac{r}{100}$. That number is the index of change: a 20% increase is 1.2 and a 20% discount is 0.8. To find the original amount, divide the final amount by the index.'
        ),
        cases: [
            { title: say('Igoera', 'Aumento', 'زيادة', 'Increase'), text: say('% 12 igo: indizea 1,12.', 'Subir un 12 %: índice 1,12.', 'زيادة 12٪: المؤشر 1.12.', 'Up 12%: index 1.12.'), math: same('$250\\cdot 1{,}12=280$') },
            { title: say('Jaitsiera', 'Disminución', 'نقصان', 'Decrease'), text: say('% 30 jaitsi: indizea 0,7.', 'Bajar un 30 %: índice 0,7.', 'تخفيض 30٪: المؤشر 0.7.', 'Down 30%: index 0.7.'), math: same('$80\\cdot 0{,}7=56$') },
            { title: say('Hasierakoa', 'La inicial', 'الأصلية', 'The original'), text: say('Zatitu amaierakoa indizeaz.', 'Divide la final entre el índice.', 'اقسم النهائية على المؤشر.', 'Divide the final amount by the index.'), math: same('$56\\mathbin{:}0{,}7=80$') }
        ],
        problem: say('Jaka bat % 15 merkatu da eta orain 51 € balio ditu. Zenbat balio zuen lehen?', 'Con una rebaja del 15 %, una chaqueta cuesta 51 €. ¿Cuánto costaba antes?', 'بعد تخفيض 15٪ صار ثمن سترة 51 €. كم كان ثمنها قبل ذلك؟', 'With a 15% discount, a jacket costs €51. How much did it cost before?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Beherapenaren indizea.', 'El índice de la rebaja.', 'مؤشر التخفيض.', 'The index of the discount.'), math: same('$1-0{,}15=0{,}85$') },
            { text: say('Amaierakoa = hasierakoa · indizea.', 'Final = inicial · índice.', 'النهائية = الأصلية · المؤشر.', 'Final = original · index.'), math: same('$x\\cdot 0{,}85=51$') },
            { text: say('Zatitu: 60 €.', 'Divide: 60 €.', 'اقسم: 60 €.', 'Divide: €60.'), math: same('$51\\mathbin{:}0{,}85=60$') }
        ],
        example: same('$1500\\cdot 1{,}04=1560$'),
        mistake: {
            wrong: say('% 15 jaitsi ondoren 51 € balio badu, lehen $51+0{,}15\\cdot 51=58{,}65$ € balio zuen.', 'Si tras bajar un 15 % cuesta 51 €, antes costaba $51+0{,}15\\cdot 51=58{,}65$ €.', 'إذا صار 51 € بعد تخفيض 15٪ فقد كان $51+0{,}15\\cdot 51=58{,}65$ €.', 'If after a 15% discount it costs €51, before it cost $51+0{,}15\\cdot 51=58{,}65$ €.'),
            right: say('% 15 hasierako prezioarena da, ez amaierakoarena. Zatitu indizeaz: $51\\mathbin{:}0{,}85=60$ €.', 'El 15 % es del precio inicial, no del final. Divide entre el índice: $51\\mathbin{:}0{,}85=60$ €.', '15٪ من السعر الأصلي لا النهائي. اقسم على المؤشر: $51\\mathbin{:}0{,}85=60$ €.', 'The 15% is of the original price, not the final one. Divide by the index: $51\\mathbin{:}0{,}85=60$ €.')
        },
        takeaway: say('Amaierakoa = hasierakoa · indizea. Igoera: $1+\\frac{R}{100}$; jaitsiera: $1-\\frac{R}{100}$.', 'Final = inicial · índice. Aumento: $1+\\frac{R}{100}$; disminución: $1-\\frac{R}{100}$.', 'النهائية = الأصلية · المؤشر. الزيادة: $1+\\frac{R}{100}$؛ النقصان: $1-\\frac{R}{100}$.', 'Final = original · index. Increase: $1+\\frac{R}{100}$; decrease: $1-\\frac{R}{100}$.'),
        figure: (language) => <IndexFigure language={language} />
    },
    {
        id: 'chained',
        stage: 'percent',
        title: say('Ehuneko kateatuak', 'Porcentajes encadenados', 'النسب المتتالية', 'Successive percentages'),
        goal: say('Bata bestearen atzetik egiten diren igoerak eta jaitsierak indizeak biderkatuz kalkulatzea.', 'Calcular aumentos y disminuciones seguidos multiplicando los índices.', 'حساب زيادات ونقصانات متتالية بضرب المؤشرات.', 'Work out successive increases and decreases by multiplying the indices.'),
        explanation: say(
            'Ehuneko bat bestearen atzetik aplikatzen denean, bigarrena lehenaren ondoren geratu den kopuruari aplikatzen zaio, ez hasierakoari. Horregatik indizeak biderkatzen dira, ez ehunekoak batu. % 10 igo eta gero % 10 jaistean, indizea $1{,}1\\cdot 0{,}9=0{,}99$ da: azkenean % 1 gutxiago dago, ez hasierako bera. Indize osoak esaten du aldaketa osoa: 1 baino handiagoa bada igoera, txikiagoa bada jaitsiera.',
            'Cuando se aplica un porcentaje detrás de otro, el segundo se aplica a la cantidad que quedó tras el primero, no a la inicial. Por eso se multiplican los índices, no se suman los porcentajes. Al subir un 10 % y luego bajar un 10 %, el índice es $1{,}1\\cdot 0{,}9=0{,}99$: al final hay un 1 % menos, no lo mismo que al principio. El índice total dice el cambio total: si es mayor que 1, aumento; si es menor, disminución.',
            'عند تطبيق نسبة بعد أخرى تُطبَّق الثانية على الكمية التي بقيت بعد الأولى لا على الأصلية. لذلك نضرب المؤشرات ولا نجمع النسب. إذا زدنا 10٪ ثم خفّضنا 10٪ فالمؤشر $1{,}1\\cdot 0{,}9=0{,}99$: في النهاية ينقص 1٪ ولا نعود إلى البداية. والمؤشر الكلي يعطي التغيّر الكلي: أكبر من 1 زيادة وأصغر منه نقصان.',
            'When one percentage is applied after another, the second one applies to the amount left after the first, not to the original. That is why you multiply the indices instead of adding the percentages. Going up 10% and then down 10% gives an index of $1{,}1\\cdot 0{,}9=0{,}99$: at the end there is 1% less, not the same as at the start. The total index gives the total change: greater than 1 is an increase, less than 1 a decrease.'
        ),
        problem: say('Prezio bat % 20 igo eta gero % 25 jaitsi da. Zer aldaketa izan du guztira?', 'Un precio sube un 20 % y luego baja un 25 %. ¿Qué cambio total ha tenido?', 'ارتفع سعر 20٪ ثم انخفض 25٪. ما التغيّر الكلي؟', 'A price goes up 20% and then down 25%. What is the total change?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indizeak.', 'Los índices.', 'المؤشرات.', 'The indices.'), math: same('$1{,}2\\quad 0{,}75$') },
            { text: say('Biderkatu.', 'Multiplícalos.', 'اضربها.', 'Multiply them.'), math: same('$1{,}2\\cdot 0{,}75=0{,}9$') },
            { text: say('0,9 < 1: % 10 jaitsi da.', '0,9 < 1: una bajada del 10 %.', '0.9 < 1: انخفاض 10٪.', '0.9 < 1: a 10% decrease.') }
        ],
        example: same('$200\\cdot 1{,}1\\cdot 1{,}1=242$'),
        mistake: {
            wrong: say('% 20 igo eta % 25 jaitsi: guztira $20-25=-5$, % 5 jaitsi da.', 'Sube un 20 % y baja un 25 %: en total $20-25=-5$, baja un 5 %.', 'زيادة 20٪ ونقصان 25٪: المجموع $20-25=-5$ أي نقصان 5٪.', 'Up 20% and down 25%: in total $20-25=-5$, so it is down 5%.'),
            right: say('Ehunekoak ez dira batzen: % 25 prezio berriarena da. Indizeak biderkatu: $1{,}2\\cdot 0{,}75=0{,}9$, % 10 jaitsi da.', 'Los porcentajes no se suman: el 25 % es del precio nuevo. Multiplica los índices: $1{,}2\\cdot 0{,}75=0{,}9$, baja un 10 %.', 'النسب لا تُجمع: 25٪ من السعر الجديد. اضرب المؤشرات: $1{,}2\\cdot 0{,}75=0{,}9$ أي نقصان 10٪.', 'Percentages are not added: the 25% is of the new price. Multiply the indices: $1{,}2\\cdot 0{,}75=0{,}9$, a 10% decrease.')
        },
        takeaway: say('Kateatuak: indize osoa $=I_{1}\\cdot I_{2}\\cdots$. Ehunekoak ez dira batzen.', 'Encadenados: índice total $=I_{1}\\cdot I_{2}\\cdots$. Los porcentajes no se suman.', 'المتتالية: المؤشر الكلي $=I_{1}\\cdot I_{2}\\cdots$. النسب لا تُجمع.', 'Successive: total index $=I_{1}\\cdot I_{2}\\cdots$. Percentages are not added.'),
        figure: (language) => <ChainedFigure language={language} />
    },
    {
        id: 'interest',
        stage: 'percent',
        title: say('Interes bakuna', 'Interés simple', 'الفائدة البسيطة', 'Simple interest'),
        goal: say('Interes bakuna kalkulatzea eta formulatik kapitala, tasa edo denbora ateratzea.', 'Calcular el interés simple y despejar de la fórmula el capital, el rédito o el tiempo.', 'حساب الفائدة البسيطة واستخراج رأس المال أو السعر أو المدة من الصيغة.', 'Work out simple interest and find the capital, the rate or the time from the formula.'),
        explanation: say(
            'Diru bat ($C$ kapitala) bankuan uzten denean, bankuak urtero ehuneko bat ordaintzen du ($r$ interes-tasa). Interes bakunean, interesa urtero kapital beraren gainean kalkulatzen da, beraz urte guztietan berdina da. $t$ urteren buruan, $I=\\frac{C\\cdot r\\cdot t}{100}$. Denbora hilabetetan badago, zatitu 12 zenbakiaz: 6 hilabete 0,5 urte dira. Amaieran, kapitala gehi interesa izango da.',
            'Cuando se deja un dinero (el capital $C$) en el banco, el banco paga cada año un porcentaje (el rédito $r$). En el interés simple, el interés se calcula cada año sobre el mismo capital, así que es igual todos los años. Al cabo de $t$ años, $I=\\frac{C\\cdot r\\cdot t}{100}$. Si el tiempo está en meses, divide entre 12: 6 meses son 0,5 años. Al final se tendrá el capital más el interés.',
            'عندما نودع مالًا (رأس المال $C$) في المصرف يدفع المصرف كل سنة نسبة مئوية (السعر $r$). في الفائدة البسيطة تُحسب الفائدة كل سنة على رأس المال نفسه، فهي متساوية في كل السنوات. بعد $t$ سنوات $I=\\frac{C\\cdot r\\cdot t}{100}$. وإذا كانت المدة بالأشهر فاقسم على 12: ستة أشهر نصف سنة. وفي النهاية يكون لدينا رأس المال مع الفائدة.',
            'When you leave money (the capital $C$) in the bank, the bank pays a percentage every year (the rate $r$). With simple interest, the interest is worked out each year on the same capital, so it is the same every year. After $t$ years, $I=\\frac{C\\cdot r\\cdot t}{100}$. If the time is in months, divide by 12: 6 months is 0.5 years. At the end you have the capital plus the interest.'
        ),
        problem: say('2400 € 5 urtez, interes-tasa % 3 dela. Zenbat interes eta zenbat diru guztira?', '2400 € al 3 % durante 5 años. ¿Cuánto interés y cuánto dinero en total?', '2400 € بفائدة 3٪ مدة 5 سنوات. كم الفائدة وكم المال كله؟', '€2,400 at 3% for 5 years. How much interest, and how much money in total?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Urte bateko interesa.', 'El interés de un año.', 'فائدة سنة واحدة.', 'One year\'s interest.'), math: same('$\\frac{2400\\cdot 3}{100}=72$') },
            { text: say('Bost urte.', 'Cinco años.', 'خمس سنوات.', 'Five years.'), math: same('$72\\cdot 5=360$') },
            { text: say('Guztira, 2760 €.', 'En total, 2760 €.', 'المجموع 2760 €.', 'In total, €2,760.'), math: same('$2400+360=2760$') }
        ],
        example: same('$\\frac{5000\\cdot 4\\cdot 0{,}5}{100}=100$'),
        mistake: {
            wrong: say('1200 € 8 hilabetez, interes-tasa % 5 dela: $\\frac{1200\\cdot 5\\cdot 8}{100}=480$ €.', '1200 € al 5 % durante 8 meses: $\\frac{1200\\cdot 5\\cdot 8}{100}=480$ €.', '1200 € بفائدة 5٪ مدة 8 أشهر: $\\frac{1200\\cdot 5\\cdot 8}{100}=480$ €.', '€1,200 at 5% for 8 months: $\\frac{1200\\cdot 5\\cdot 8}{100}=480$ €.'),
            right: say('Tasa urtekoa da: 8 hilabete $\\frac{8}{12}$ urte dira. $\\frac{1200\\cdot 5}{100}\\cdot\\frac{8}{12}=40$ €.', 'El rédito es anual: 8 meses son $\\frac{8}{12}$ de año. $\\frac{1200\\cdot 5}{100}\\cdot\\frac{8}{12}=40$ €.', 'السعر سنوي: 8 أشهر هي $\\frac{8}{12}$ سنة. $\\frac{1200\\cdot 5}{100}\\cdot\\frac{8}{12}=40$ €.', 'The rate is per year: 8 months is $\\frac{8}{12}$ of a year. $\\frac{1200\\cdot 5}{100}\\cdot\\frac{8}{12}=40$ €.')
        },
        takeaway: say('$I=\\frac{C\\cdot R\\cdot T}{100}$, $T$ urtetan. Guztira: $C+I$.', '$I=\\frac{C\\cdot R\\cdot T}{100}$, con $T$ en años. En total: $C+I$.', '$I=\\frac{C\\cdot R\\cdot T}{100}$ و$T$ بالسنوات. المجموع: $C+I$.', '$I=\\frac{C\\cdot R\\cdot T}{100}$, with $T$ in years. In total: $C+I$.'),
        figure: (language) => <InterestFigure language={language} />
    },

    /* ---------- 5. Arithmetic problems ---------- */
    {
        id: 'mixtures',
        stage: 'problems',
        title: say('Nahasteak', 'Mezclas', 'الخلطات', 'Mixtures'),
        goal: say('Bi produktu nahastean nahastearen prezioa (edo kalitatea) kalkulatzea, eta alderantziz, kopuruak.', 'Calcular el precio (o la calidad) de una mezcla de dos productos, y al revés, las cantidades.', 'حساب سعر (أو جودة) خليط من منتجين، والعكس: الكميات.', 'Work out the price (or the quality) of a mixture of two products, and the other way round, the amounts.'),
        explanation: say(
            'Bi produktu nahastean, nahastearen kilo baten prezioa ez da bi prezioen batez bestekoa, kopuru bakoitzak zenbat duen baizik. Kalkulatu osagai bakoitzaren balioa (kiloak · prezioa), batu, eta zatitu kilo guztiez: batez besteko haztatua da. Emaitza beti bi prezioen artean dago, eta gehiago dagoen osagaiaren preziotik hurbilago.',
            'Al mezclar dos productos, el precio de un kilo de la mezcla no es la media de los dos precios, sino que depende de cuánto hay de cada uno. Calcula el valor de cada ingrediente (kilos · precio), súmalos y divide entre los kilos totales: es una media ponderada. El resultado siempre queda entre los dos precios, y más cerca del precio del ingrediente que más hay.',
            'عند خلط منتجين لا يكون سعر كيلوغرام الخليط متوسط السعرين، بل يتوقف على كمية كل منهما. احسب قيمة كل مكوّن (الكيلوغرامات · السعر) واجمعها واقسم على مجموع الكيلوغرامات: إنه متوسط مرجّح. وتقع النتيجة دائمًا بين السعرين، وأقرب إلى سعر المكوّن الأكثر كمية.',
            'When you mix two products, the price of a kilo of the mixture is not the average of the two prices: it depends on how much there is of each. Work out the value of each ingredient (kilos · price), add them and divide by the total kilos: it is a weighted mean. The result always lies between the two prices, and closer to the price of the ingredient there is more of.'
        ),
        problem: say('12 kg kafe 8 €/kg-an eta 8 kg 13 €/kg-an nahasten dira. Zenbat balio du nahastearen kilo batek?', 'Se mezclan 12 kg de café de 8 €/kg con 8 kg de 13 €/kg. ¿Cuánto vale un kilo de la mezcla?', 'نخلط 12 كغ من بن سعره 8 €/كغ مع 8 كغ سعرها 13 €/كغ. كم ثمن كيلوغرام الخليط؟', '12 kg of coffee at €8/kg are mixed with 8 kg at €13/kg. How much is a kilo of the mixture worth?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Osagai bakoitzaren balioa.', 'El valor de cada ingrediente.', 'قيمة كل مكوّن.', 'The value of each ingredient.'), math: same('$12\\cdot 8=96\\quad 8\\cdot 13=104$') },
            { text: say('Balio osoa eta kilo osoak.', 'Valor total y kilos totales.', 'القيمة الكلية والكيلوغرامات الكلية.', 'Total value and total kilos.'), math: same('$96+104=200\\quad 12+8=20$') },
            { text: say('Zatitu: 10 €/kg.', 'Divide: 10 €/kg.', 'اقسم: 10 €/كغ.', 'Divide: €10/kg.'), math: same('$200\\mathbin{:}20=10$') }
        ],
        example: same('$\\frac{3\\cdot 2+1\\cdot 6}{4}=3$'),
        mistake: {
            wrong: say('Nahastearen prezioa bi prezioen erdia da: $\\frac{8+13}{2}=10{,}50$ €/kg.', 'El precio de la mezcla es la media de los dos: $\\frac{8+13}{2}=10{,}50$ €/kg.', 'سعر الخليط متوسط السعرين: $\\frac{8+13}{2}=10{,}50$ €/كغ.', 'The price of the mixture is the average of the two: $\\frac{8+13}{2}=10{,}50$ €/kg.'),
            right: say('Kafe merke gehiago dago, beraz prezioa merketik hurbilago dago: $\\frac{96+104}{20}=10$ €/kg.', 'Hay más café barato, así que el precio queda más cerca del barato: $\\frac{96+104}{20}=10$ €/kg.', 'البن الرخيص أكثر، فالسعر أقرب إلى الرخيص: $\\frac{96+104}{20}=10$ €/كغ.', 'There is more cheap coffee, so the price is closer to the cheap one: $\\frac{96+104}{20}=10$ €/kg.')
        },
        takeaway: say('Nahastea: $\\frac{A\\cdot P+B\\cdot Q}{A+B}$, bi prezioen artean.', 'Mezcla: $\\frac{A\\cdot P+B\\cdot Q}{A+B}$, entre los dos precios.', 'الخليط: $\\frac{A\\cdot P+B\\cdot Q}{A+B}$ بين السعرين.', 'Mixture: $\\frac{A\\cdot P+B\\cdot Q}{A+B}$, between the two prices.'),
        figure: (language) => <MixtureFigure language={language} />
    },
    {
        id: 'motion',
        stage: 'problems',
        title: say('Mugikariak', 'Móviles', 'المتحركات', 'Moving objects'),
        goal: say('Bi mugikari noiz eta non elkartzen diren edo bata bestea noiz harrapatzen duen kalkulatzea.', 'Calcular cuándo y dónde se encuentran dos móviles o cuándo uno alcanza al otro.', 'حساب متى وأين يلتقي متحركان أو متى يلحق أحدهما بالآخر.', 'Work out when and where two moving objects meet, or when one catches up with the other.'),
        explanation: say(
            'Abiadura konstantean, distantzia = abiadura · denbora. Bi mugikari elkarrengana badoaz, distantzia haien abiaduren baturan txikitzen da; norabide berean badoaz, abiaduren kenduran. Beraz, elkartzeko denbora hasierako distantzia zatitu abiadura horretaz da. Gero, non elkartzen diren jakiteko, biderkatu denbora hori mugikari baten abiaduraz.',
            'A velocidad constante, distancia = velocidad · tiempo. Si dos móviles van uno hacia el otro, la distancia entre ellos se reduce a la suma de sus velocidades; si van en el mismo sentido, a la diferencia. Así, el tiempo que tardan en juntarse es la distancia inicial entre esa velocidad. Después, para saber dónde se juntan, multiplica ese tiempo por la velocidad de uno de ellos.',
            'بسرعة ثابتة: المسافة = السرعة · الزمن. إذا اتجه متحركان أحدهما نحو الآخر تنقص المسافة بينهما بمجموع سرعتيهما، وإذا سارا في الاتجاه نفسه فبالفرق بينهما. إذن زمن الالتقاء هو المسافة الأولية مقسومة على تلك السرعة. ثم لمعرفة مكان الالتقاء اضرب ذلك الزمن في سرعة أحدهما.',
            'At constant speed, distance = speed · time. If two objects move towards each other, the distance between them shrinks at the sum of their speeds; if they move in the same direction, at the difference. So the time until they meet is the starting distance divided by that speed. Then, to find where they meet, multiply that time by the speed of one of them.'
        ),
        cases: [
            { title: say('Elkarrengana', 'Al encuentro', 'متقابلان', 'Towards each other'), text: say('Abiadurak batu.', 'Se suman las velocidades.', 'تُجمع السرعتان.', 'Add the speeds.'), math: same('$t=\\frac{d}{v_{1}+v_{2}}$') },
            { title: say('Atzetik', 'Alcance', 'اللحاق', 'Catching up'), text: say('Abiadurak kendu.', 'Se restan las velocidades.', 'تُطرح السرعتان.', 'Subtract the speeds.'), math: same('$t=\\frac{d}{v_{1}-v_{2}}$') }
        ],
        problem: say('Bi herrik 210 km-ko tartea dute. Auto bat 80 km/h-ra eta beste bat 60 km/h-ra irteten dira, elkarrengana. Noiz eta non elkartuko dira?', 'Dos pueblos están a 210 km. Sale un coche de cada uno, a 80 km/h y a 60 km/h, uno hacia el otro. ¿Cuándo y dónde se encuentran?', 'تفصل بين قريتين 210 كم. تنطلق من كل واحدة سيارة بسرعة 80 كم/س و60 كم/س إحداهما نحو الأخرى. متى وأين تلتقيان؟', 'Two villages are 210 km apart. A car leaves each one, at 80 km/h and 60 km/h, towards each other. When and where do they meet?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Elkarrengana: abiadurak batu.', 'Al encuentro: suma las velocidades.', 'متقابلتان: اجمع السرعتين.', 'Towards each other: add the speeds.'), math: same('$80+60=140$') },
            { text: say('Elkartzeko denbora: 1,5 h.', 'Tiempo hasta el encuentro: 1,5 h.', 'زمن الالتقاء: 1.5 س.', 'Time until they meet: 1.5 h.'), math: same('$210\\mathbin{:}140=1{,}5$') },
            { text: say('Lehen herritik 120 km-ra.', 'A 120 km del primer pueblo.', 'على بعد 120 كم من القرية الأولى.', '120 km from the first village.'), math: same('$80\\cdot 1{,}5=120$') }
        ],
        example: same('$\\frac{30}{90-75}=2$'),
        mistake: {
            wrong: say('Elkarrengana doazenean ere abiadurak kentzen dira: $\\frac{210}{80-60}=10{,}5$ h.', 'También cuando van al encuentro se restan las velocidades: $\\frac{210}{80-60}=10{,}5$ h.', 'حتى عند التقابل تُطرح السرعتان: $\\frac{210}{80-60}=10{,}5$ س.', 'Even when they move towards each other, subtract the speeds: $\\frac{210}{80-60}=10{,}5$ h.'),
            right: say('Elkarrengana doazenean bien bideak batzen dira: ordu bakoitzean $80+60=140$ km hurbiltzen dira, $t=1{,}5$ h.', 'Al ir al encuentro se suman los dos caminos: cada hora se acercan $80+60=140$ km, $t=1{,}5$ h.', 'عند التقابل يُجمع الطريقان: تقتربان كل ساعة $80+60=140$ كم، $t=1{,}5$ س.', 'Moving towards each other, both journeys add up: each hour they get $80+60=140$ km closer, $t=1{,}5$ h.')
        },
        takeaway: say('Elkarrengana: $T=\\frac{D}{V_{1}+V_{2}}$. Atzetik: $T=\\frac{D}{V_{1}-V_{2}}$.', 'Encuentro: $T=\\frac{D}{V_{1}+V_{2}}$. Alcance: $T=\\frac{D}{V_{1}-V_{2}}$.', 'التقابل: $T=\\frac{D}{V_{1}+V_{2}}$. اللحاق: $T=\\frac{D}{V_{1}-V_{2}}$.', 'Meeting: $T=\\frac{D}{V_{1}+V_{2}}$. Catching up: $T=\\frac{D}{V_{1}-V_{2}}$.'),
        figure: (language) => <MotionFigure language={language} />
    },
    {
        id: 'work',
        stage: 'problems',
        title: say('Txorrotak eta lanak elkarrekin', 'Grifos y trabajos en común', 'الصنابير والأعمال المشتركة', 'Taps and jobs done together'),
        goal: say('Bi txorrotak edo bi lagunek elkarrekin zenbat denbora behar duten kalkulatzea, ordu bateko zatiak batuz.', 'Calcular cuánto tardan juntos dos grifos o dos personas, sumando la parte que hacen en una hora.', 'حساب الزمن الذي يحتاجه صنبوران أو شخصان معًا بجمع ما ينجزه كل منهما في ساعة.', 'Work out how long two taps or two people take together, by adding the part each does in one hour.'),
        explanation: say(
            'Txorrota batek depositu bat 3 orduan betetzen badu, ordu batean depositoaren $\\frac{1}{3}$ betetzen du. Bi txorrota elkarrekin daudenean, ordu bateko zatiak batzen dira: $\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$, beraz depositua 2 orduan betetzen da. Hustubide batek kendu egiten du: haren zatia kendu. Gauza bera margotzeko, idazteko edo lan bat elkarrekin egiteko. Elkarrekin beti azkarrago: denbora bakarka azkarrena denaren denbora baino txikiagoa da.',
            'Si un grifo llena un depósito en 3 horas, en una hora llena $\\frac{1}{3}$ del depósito. Cuando hay dos grifos juntos, se suman las partes de una hora: $\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$, así que el depósito se llena en 2 horas. Un desagüe quita: su parte se resta. Lo mismo vale para pintar, escribir o hacer un trabajo entre dos. Juntos siempre se tarda menos que el más rápido solo.',
            'إذا ملأ صنبور خزانًا في 3 ساعات فإنه يملأ في ساعة $\\frac{1}{3}$ الخزان. وعند وجود صنبورين معًا تُجمع أجزاء الساعة: $\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$، فيمتلئ الخزان في ساعتين. والمصرف يُنقص: يُطرح جزؤه. والأمر نفسه في الدهن أو الكتابة أو أي عمل مشترك. ومعًا يكون الزمن دائمًا أقل من زمن الأسرع وحده.',
            'If a tap fills a tank in 3 hours, in one hour it fills $\\frac{1}{3}$ of the tank. With two taps together, the parts for one hour are added: $\\frac{1}{3}+\\frac{1}{6}=\\frac{1}{2}$, so the tank fills in 2 hours. A drain takes water away: its part is subtracted. The same goes for painting, typing or doing any job between two people. Together it always takes less time than the faster one alone.'
        ),
        problem: say('A txorrotak depositua 4 orduan betetzen du eta B txorrotak 12 orduan. Zenbat behar dute biek batera?', 'El grifo A llena un depósito en 4 horas y el B en 12. ¿Cuánto tardan los dos juntos?', 'يملأ الصنبور A الخزان في 4 ساعات والصنبور B في 12. كم يحتاجان معًا؟', 'Tap A fills a tank in 4 hours and tap B in 12. How long do they take together?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordu batean, bakoitzaren zatia.', 'En una hora, la parte de cada uno.', 'في ساعة: جزء كل منهما.', 'In one hour, each one\'s part.'), math: same('$\\frac{1}{4}\\quad\\frac{1}{12}$') },
            { text: say('Batu.', 'Súmalas.', 'اجمعهما.', 'Add them.'), math: same('$\\frac{1}{4}+\\frac{1}{12}=\\frac{4}{12}=\\frac{1}{3}$') },
            { text: say('Zati bat orduko: 3 ordu.', 'Un tercio por hora: 3 horas.', 'الثلث في الساعة: 3 ساعات.', 'A third per hour: 3 hours.') }
        ],
        example: same('$\\frac{1}{2}-\\frac{1}{6}=\\frac{1}{3}\\ \\to\\ 3$'),
        mistake: {
            wrong: say('4 ordu eta 12 ordu: elkarrekin $4+12=16$ ordu, edo erdia, 8 ordu.', '4 horas y 12 horas: juntos $4+12=16$ horas, o la media, 8 horas.', '4 ساعات و12 ساعة: معًا $4+12=16$ ساعة أو المتوسط 8 ساعات.', '4 hours and 12 hours: together $4+12=16$ hours, or the average, 8 hours.'),
            right: say('Denborak ez dira batzen: ordu bateko zatiak batzen dira. Elkarrekin 3 ordu, azkarrena bakarrik baino gutxiago.', 'Los tiempos no se suman: se suman las partes de una hora. Juntos, 3 horas, menos que el más rápido solo.', 'الأزمنة لا تُجمع: تُجمع أجزاء الساعة. معًا 3 ساعات، أقل من الأسرع وحده.', 'Times are not added: the parts per hour are. Together, 3 hours, less than the faster one alone.')
        },
        takeaway: say('Ordu batean: $\\frac{1}{A}+\\frac{1}{B}=\\frac{1}{T}$. Hustubidea: kendu.', 'En una hora: $\\frac{1}{A}+\\frac{1}{B}=\\frac{1}{T}$. Desagüe: se resta.', 'في ساعة: $\\frac{1}{A}+\\frac{1}{B}=\\frac{1}{T}$. المصرف: يُطرح.', 'In one hour: $\\frac{1}{A}+\\frac{1}{B}=\\frac{1}{T}$. A drain: subtract.'),
        figure: (language) => <TapsFigure language={language} />
    }
]

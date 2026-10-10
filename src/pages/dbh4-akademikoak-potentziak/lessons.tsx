import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { PowersFigure, RadicalOpsFigure, RootsFigure, ScientificOpsFigure, SimplifyFigure } from '../dbh4-aplikatuak-errealak/figures'
import {
    ChangeBaseFigure,
    ConjugateFigure,
    EquivalentFigure,
    FractionalFigure,
    LogDefinitionFigure,
    LogPropertiesFigure,
    PowerRulesFigure,
    RadicalProductFigure,
    RationalizeIndexFigure,
    RationalizeSquareFigure
} from './figures'

/* ==========================================================================
   Berreturak, erroak eta logaritmoak · 4. DBH akademikoak — stages and
   lessons, following Santillana 4.º Académicas unit 2 (powers with integer
   exponents, radicals and fractional exponents, equivalent radicals,
   extracting factors, operations, rationalizing, scientific notation and
   logarithms with their properties) and the radicals and logarithms of
   Anaya 4.º Académicas unit 1. It builds on the 4. DBH aplikatuak reals
   unit (powers, roots, √a simplified, like radicals, rationalizing √b)
   and goes further: any index, common index, products of different
   indexes, the conjugate and logarithms.
   ========================================================================== */

export type PowersStageId = 'powers' | 'radicals' | 'operations' | 'rationalize' | 'logarithms'

export const powersStages: UnitStage[] = [
    { id: 'powers', tone: 'blue', title: { eu: 'Berreturak', es: 'Potencias', ar: 'القوى' } },
    { id: 'radicals', tone: 'violet', title: { eu: 'Erradikalak', es: 'Radicales', ar: 'الجذور' } },
    { id: 'operations', tone: 'mustard', title: { eu: 'Eragiketak erradikalekin', es: 'Operaciones con radicales', ar: 'العمليات على الجذور' } },
    { id: 'rationalize', tone: 'coral', title: { eu: 'Arrazionalizatzea', es: 'Racionalizar', ar: 'إنطاق المقام' } },
    { id: 'logarithms', tone: 'green', title: { eu: 'Logaritmoak', es: 'Logaritmos', ar: 'اللوغاريتمات' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const powersTopics: UnitTopic[] = [
    /* ---------- 1. Powers ---------- */
    {
        id: 'integer-powers',
        stage: 'powers',
        title: say('Berretzaile osoko berreturak', 'Potencias de exponente entero', 'القوى ذات الأس الصحيح'),
        goal: say('Berretzaile negatiboak eta zero dituzten berreturak kalkulatzea, oinarri negatiboen zeinua kontuan hartuta.', 'Calcular potencias con exponente negativo o cero, teniendo en cuenta el signo de las bases negativas.', 'حساب القوى ذات الأس السالب أو الصفري، مع مراعاة إشارة الأسس السالبة.'),
        explanation: say(
            'Berretura batek oinarria berretzaileak adina aldiz biderkatzen du. Oinarri negatiboa denean, berretzaile bikoitiak emaitza positiboa ematen du eta bakoitiak negatiboa: $(-2)^4=16$, baina $(-2)^5=-32$. Kontuz: $-2^4=-16$, berretzaileak 2ari bakarrik eragiten diolako. Edozein oinarrirekin (0 ezik) $a^0=1$. Berretzaile negatiboak alderantzizkoa adierazten du: $a^{-n}=\\frac{1}{a^n}$, eta zatiki batean $\\left(\\frac{a}{b}\\right)^{-n}=\\left(\\frac{b}{a}\\right)^{n}$: zatikia buelta eman eta berretzailea positibo bihurtu.',
            'Una potencia multiplica la base tantas veces como indica el exponente. Si la base es negativa, un exponente par da resultado positivo y uno impar, negativo: $(-2)^4=16$, pero $(-2)^5=-32$. Cuidado: $-2^4=-16$, porque el exponente solo afecta al 2. Con cualquier base (salvo 0), $a^0=1$. El exponente negativo indica el inverso: $a^{-n}=\\frac{1}{a^n}$, y en una fracción $\\left(\\frac{a}{b}\\right)^{-n}=\\left(\\frac{b}{a}\\right)^{n}$: se da la vuelta a la fracción y el exponente pasa a ser positivo.',
            'تضرب القوة الأساس في نفسه بعدد مرات الأس. إذا كان الأساس سالبًا فالأس الزوجي يعطي نتيجة موجبة والفردي سالبة: $(-2)^4=16$ لكن $(-2)^5=-32$. انتبه: $-2^4=-16$ لأن الأس لا يؤثر إلا في 2. ومع أي أساس (عدا 0) $a^0=1$. ويدل الأس السالب على المقلوب: $a^{-n}=\\frac{1}{a^n}$، وفي الكسر $\\left(\\frac{a}{b}\\right)^{-n}=\\left(\\frac{b}{a}\\right)^{n}$: نقلب الكسر ويصبح الأس موجبًا.'
        ),
        problem: same('$\\left(-\\frac{2}{3}\\right)^{-3}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Buelta eman zatikiari eta berretzailea positibo.', 'Da la vuelta a la fracción y el exponente pasa a positivo.', 'اقلب الكسر واجعل الأس موجبًا.'), math: same('$\\left(-\\frac{3}{2}\\right)^{3}$') },
            { text: say('Berretzaile bakoitia: zeinua negatiboa.', 'Exponente impar: signo negativo.', 'أس فردي: إشارة سالبة.'), math: same('$-\\frac{3^3}{2^3}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.'), math: same('$-\\frac{27}{8}$') }
        ],
        example: same('$2^{-3}=\\frac{1}{8}$'),
        takeaway: say('Berretzaile negatiboa: alderantzizkoa. Oinarri negatiboa: bikoitia positibo, bakoitia negatibo.', 'Exponente negativo: el inverso. Base negativa: par positivo, impar negativo.', 'الأس السالب: المقلوب. الأساس السالب: الزوجي موجب والفردي سالب.'),
        figure: (language) => <PowersFigure language={language} />
    },
    {
        id: 'power-rules',
        stage: 'powers',
        title: say('Berreturen propietateak', 'Propiedades de las potencias', 'خصائص القوى'),
        goal: say('Berreturen propietateak erabiltzea adierazpenak sinplifikatzeko, oinarriak faktorizatuz.', 'Usar las propiedades de las potencias para simplificar expresiones, factorizando las bases.', 'استعمال خصائص القوى لتبسيط العبارات بتحليل الأسس.'),
        explanation: say(
            'Oinarri bereko berreturak biderkatzean berretzaileak batu egiten dira, $a^m\\cdot a^n=a^{m+n}$; zatitzean kendu, $a^m:a^n=a^{m-n}$; eta berretura baten berretura kalkulatzean biderkatu, $(a^m)^n=a^{m\\cdot n}$. Berretzaile bera badute, oinarriak biderkatu edo zatitu daitezke: $a^n\\cdot b^n=(a\\cdot b)^n$. Oinarriak desberdinak direnean, faktorizatu lehenik zenbaki lehenetan: $12=2^2\\cdot 3$, $18=2\\cdot 3^2$. Gero, zenbaki lehen bakoitzaren berretzaileak bildu. Berretzaile negatiboak ere arau berberak betetzen ditu.',
            'Al multiplicar potencias de la misma base se suman los exponentes, $a^m\\cdot a^n=a^{m+n}$; al dividir se restan, $a^m:a^n=a^{m-n}$; y al elevar una potencia a otra se multiplican, $(a^m)^n=a^{m\\cdot n}$. Si tienen el mismo exponente, se pueden multiplicar o dividir las bases: $a^n\\cdot b^n=(a\\cdot b)^n$. Cuando las bases son distintas, primero se factorizan en números primos: $12=2^2\\cdot 3$, $18=2\\cdot 3^2$. Después se agrupan los exponentes de cada primo. Los exponentes negativos cumplen las mismas reglas.',
            'عند ضرب قوى لها الأساس نفسه نجمع الأسس $a^m\\cdot a^n=a^{m+n}$، وعند القسمة نطرحها $a^m:a^n=a^{m-n}$، وعند رفع قوة إلى قوة نضربها $(a^m)^n=a^{m\\cdot n}$. وإذا كان لها الأس نفسه يمكن ضرب الأسس أو قسمتها: $a^n\\cdot b^n=(a\\cdot b)^n$. وعندما تختلف الأسس نحلّلها أولًا إلى عوامل أولية: $12=2^2\\cdot 3$ و$18=2\\cdot 3^2$، ثم نجمع أسس كل عدد أولي. وتخضع الأسس السالبة للقواعد نفسها.'
        ),
        problem: same('$\\frac{12^3\\cdot 2^{-1}}{18\\cdot 4}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu.', 'Factoriza.', 'حلّل.'), math: same('$\\frac{2^6\\cdot 3^3\\cdot 2^{-1}}{2\\cdot 3^2\\cdot 2^2}$') },
            { text: say('Bildu 2ren berretzaileak.', 'Agrupa los exponentes del 2.', 'اجمع أسس العدد 2.'), math: same('$2^{6-1-1-2}=2^{2}$') },
            { text: say('Eta 3renak.', 'Y los del 3.', 'وأسس العدد 3.'), math: same('$3^{3-2}=3\\quad\\to\\quad 12$') }
        ],
        example: same('$(3^2)^{-3}=3^{-6}$'),
        takeaway: say('Oinarri bera: biderkatzean batu, zatitzean kendu, berreturaren berreturan biderkatu.', 'Misma base: al multiplicar suma, al dividir resta, en la potencia de potencia multiplica.', 'الأساس نفسه: في الضرب اجمع، وفي القسمة اطرح، وفي قوة القوة اضرب.'),
        figure: (language) => <PowerRulesFigure language={language} />
    },
    {
        id: 'scientific',
        stage: 'powers',
        title: say('Idazkera zientifikoa', 'Notación científica', 'الترميز العلمي'),
        goal: say('Zenbaki oso handiak eta oso txikiak idazkera zientifikoan idaztea eta haiekin eragiketak egitea.', 'Escribir números muy grandes y muy pequeños en notación científica y operar con ellos.', 'كتابة الأعداد الكبيرة جدًا والصغيرة جدًا بالترميز العلمي وإجراء العمليات عليها.'),
        explanation: say(
            'Idazkera zientifikoan zenbaki bat $a\\cdot 10^{n}$ gisa idazten da, $1\\le a<10$ eta $n$ osoa izanik. Lurretik Eguzkirako distantzia $1{,}49\\cdot 10^{8}$ km da, eta protoi baten masa $1{,}672\\cdot 10^{-24}$ g. Biderkatzeko, biderkatu zenbakiak eta batu berretzaileak; zatitzeko, zatitu zenbakiak eta kendu berretzaileak. Batu edo kentzeko, berretzaile bera behar da: idatzi biak 10en berretura berarekin eta batu zenbakiak. Amaieran, egokitu $a$: $33{,}28\\cdot 10^{-1}=3{,}328$.',
            'En notación científica un número se escribe como $a\\cdot 10^{n}$, con $1\\le a<10$ y $n$ entero. La distancia de la Tierra al Sol es $1{,}49\\cdot 10^{8}$ km, y la masa de un protón, $1{,}672\\cdot 10^{-24}$ g. Para multiplicar, se multiplican los números y se suman los exponentes; para dividir, se dividen los números y se restan los exponentes. Para sumar o restar hace falta el mismo exponente: se escriben los dos con la misma potencia de 10 y se suman los números. Al final se ajusta $a$: $33{,}28\\cdot 10^{-1}=3{,}328$.',
            'في الترميز العلمي يُكتب العدد على صورة $a\\cdot 10^{n}$ حيث $1\\le a<10$ و$n$ صحيح. المسافة من الأرض إلى الشمس $1{,}49\\cdot 10^{8}$ كم، وكتلة البروتون $1{,}672\\cdot 10^{-24}$ غ. للضرب نضرب العددين ونجمع الأسين، وللقسمة نقسم العددين ونطرح الأسين. وللجمع أو الطرح نحتاج الأس نفسه: نكتب العددين بالقوة نفسها للعدد 10 ونجمع العددين. وفي النهاية نضبط $a$: $33{,}28\\cdot 10^{-1}=3{,}328$.'
        ),
        problem: same('$(2{,}52\\cdot 10^{4}):(4\\cdot 10^{-6})$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu zenbakiak.', 'Divide los números.', 'اقسم العددين.'), math: same('$2{,}52:4=0{,}63$') },
            { text: say('Kendu berretzaileak.', 'Resta los exponentes.', 'اطرح الأسين.'), math: same('$4-(-6)=10$') },
            { text: say('Egokitu: $0{,}63=6{,}3\\cdot 10^{-1}$.', 'Ajusta: $0{,}63=6{,}3\\cdot 10^{-1}$.', 'اضبط: $0{,}63=6{,}3\\cdot 10^{-1}$.'), math: same('$6{,}3\\cdot 10^{9}$') }
        ],
        example: same('$340\\,000=3{,}4\\cdot 10^{5}$'),
        takeaway: say('Biderkatzean berretzaileak batu, zatitzean kendu; batzeko, berretzaile bera.', 'Al multiplicar suma los exponentes, al dividir resta; para sumar, el mismo exponente.', 'في الضرب اجمع الأسس، وفي القسمة اطرحها؛ وللجمع الأس نفسه.'),
        figure: (language) => <ScientificOpsFigure language={language} />
    },

    /* ---------- 2. Radicals ---------- */
    {
        id: 'roots',
        stage: 'radicals',
        title: say('Erroak eta erradikalak', 'Raíces y radicales', 'الجذور'),
        goal: say('Edozein indizeko erroak kalkulatzea eta zenbat erro erreal dituzten jakitea.', 'Calcular raíces de cualquier índice y saber cuántas raíces reales tienen.', 'حساب جذور من أي دليل ومعرفة عدد جذورها الحقيقية.'),
        explanation: say(
            '$\\sqrt[n]{a}=b$ esaten da $b^n=a$ denean. $n$ indizea da eta $a$ errokizuna. Indizea bakoitia bada, erro bakarra dago, eta errokizunaren zeinu bera du: $\\sqrt[3]{-8}=-2$. Indizea bikoitia bada eta errokizuna positiboa, bi erro daude, aurkakoak: $\\sqrt[4]{81}=\\pm 3$ (normalean positiboa idazten da). Indizea bikoitia eta errokizuna negatiboa: ez dago erro errealik, ez baitago berretura bikoiti negatiborik. Erro bat kalkulatzeko, idatzi errokizuna berretura gisa: $\\sqrt[5]{-100\\,000}=\\sqrt[5]{(-10)^5}=-10$.',
            'Se dice que $\\sqrt[n]{a}=b$ cuando $b^n=a$. $n$ es el índice y $a$ el radicando. Si el índice es impar, hay una sola raíz, con el mismo signo que el radicando: $\\sqrt[3]{-8}=-2$. Si el índice es par y el radicando positivo, hay dos raíces opuestas: $\\sqrt[4]{81}=\\pm 3$ (normalmente se escribe la positiva). Índice par y radicando negativo: no hay raíz real, porque ninguna potencia par es negativa. Para calcular una raíz, escribe el radicando como potencia: $\\sqrt[5]{-100\\,000}=\\sqrt[5]{(-10)^5}=-10$.',
            'نقول $\\sqrt[n]{a}=b$ عندما $b^n=a$. $n$ هو الدليل و$a$ ما تحت الجذر. إذا كان الدليل فرديًا فهناك جذر واحد له إشارة ما تحت الجذر نفسها: $\\sqrt[3]{-8}=-2$. وإذا كان الدليل زوجيًا وما تحت الجذر موجبًا فهناك جذران متعاكسان: $\\sqrt[4]{81}=\\pm 3$ (ويُكتب الموجب عادةً). ودليل زوجي مع ما تحت جذر سالب: لا جذر حقيقي، لأنه لا قوة زوجية سالبة. لحساب جذر اكتب ما تحت الجذر قوةً: $\\sqrt[5]{-100\\,000}=\\sqrt[5]{(-10)^5}=-10$.'
        ),
        stepsKind: 'facts',
        steps: [
            { title: say('Indize bakoitia', 'Índice impar', 'دليل فردي'), text: say('Erro bakarra, errokizunaren zeinuarekin.', 'Una sola raíz, con el signo del radicando.', 'جذر واحد بإشارة ما تحت الجذر.'), math: same('$\\sqrt[5]{-32}=-2$') },
            { title: say('Indize bikoitia, errokizun positiboa', 'Índice par, radicando positivo', 'دليل زوجي وما تحت جذر موجب'), text: say('Bi erro aurkako.', 'Dos raíces opuestas.', 'جذران متعاكسان.'), math: same('$\\sqrt[4]{625}=\\pm 5$') },
            { title: say('Indize bikoitia, errokizun negatiboa', 'Índice par, radicando negativo', 'دليل زوجي وما تحت جذر سالب'), text: say('Ez dago erro errealik.', 'No hay raíz real.', 'لا جذر حقيقي.'), math: same('$\\sqrt[4]{-256}\\notin\\mathbb{R}$') }
        ],
        example: same('$\\sqrt[3]{-8}=-2$'),
        takeaway: say('Indize bikoitia eta errokizun negatiboa: ez dago erro errealik.', 'Índice par y radicando negativo: no hay raíz real.', 'دليل زوجي وما تحت جذر سالب: لا جذر حقيقي.'),
        figure: (language) => <RootsFigure language={language} />
    },
    {
        id: 'fractional',
        stage: 'radicals',
        title: say('Berretzaile zatikiak', 'Exponentes fraccionarios', 'الأسس الكسرية'),
        goal: say('Erradikalak berretzaile zatikidun berretura gisa idaztea eta alderantziz, eta haiekin kalkulatzea.', 'Escribir radicales como potencias de exponente fraccionario y al revés, y calcular con ellos.', 'كتابة الجذور قوى ذات أس كسري وبالعكس، والحساب بها.'),
        explanation: say(
            'Erradikal bat berretura gisa idatz daiteke: $\\sqrt[n]{a^m}=a^{\\frac{m}{n}}$. Izendatzailea indizea da, eta zenbakitzailea errokizunaren berretzailea. Adibidez, $\\sqrt{5}=5^{\\frac{1}{2}}$ eta $\\sqrt[3]{7^2}=7^{\\frac{2}{3}}$. Horri esker, erradikalekin berreturen propietateak erabil daitezke. Kalkulatzeko, komeni da lehenik erroa ateratzea: $8^{\\frac{2}{3}}=(\\sqrt[3]{8})^2=2^2=4$. Berretzaile negatiboak alderantzizkoa ematen du: $16^{-\\frac{3}{4}}=\\frac{1}{(\\sqrt[4]{16})^3}=\\frac{1}{8}$.',
            'Un radical se puede escribir como potencia: $\\sqrt[n]{a^m}=a^{\\frac{m}{n}}$. El denominador es el índice y el numerador, el exponente del radicando. Por ejemplo, $\\sqrt{5}=5^{\\frac{1}{2}}$ y $\\sqrt[3]{7^2}=7^{\\frac{2}{3}}$. Gracias a eso, con los radicales se pueden usar las propiedades de las potencias. Para calcular, conviene sacar primero la raíz: $8^{\\frac{2}{3}}=(\\sqrt[3]{8})^2=2^2=4$. El exponente negativo da el inverso: $16^{-\\frac{3}{4}}=\\frac{1}{(\\sqrt[4]{16})^3}=\\frac{1}{8}$.',
            'يمكن كتابة الجذر قوةً: $\\sqrt[n]{a^m}=a^{\\frac{m}{n}}$. المقام هو الدليل والبسط أس ما تحت الجذر. مثلًا $\\sqrt{5}=5^{\\frac{1}{2}}$ و$\\sqrt[3]{7^2}=7^{\\frac{2}{3}}$. وبفضل ذلك نستعمل خصائص القوى مع الجذور. وللحساب يُستحسن أخذ الجذر أولًا: $8^{\\frac{2}{3}}=(\\sqrt[3]{8})^2=2^2=4$. والأس السالب يعطي المقلوب: $16^{-\\frac{3}{4}}=\\frac{1}{(\\sqrt[4]{16})^3}=\\frac{1}{8}$.'
        ),
        problem: same('$64^{\\frac{5}{6}}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea: 6. erroa.', 'El denominador: raíz sexta.', 'المقام: الجذر السادس.'), math: same('$\\sqrt[6]{64}=2$') },
            { text: say('Zenbakitzailea: ber 5.', 'El numerador: a la quinta.', 'البسط: أس 5.'), math: same('$2^{5}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.'), math: same('$32$') }
        ],
        example: same('$\\sqrt[3]{7^2}=7^{\\frac{2}{3}}$'),
        takeaway: say('Izendatzailea indizea da eta zenbakitzailea berretzailea. Lehenik erroa, gero berretura.', 'El denominador es el índice y el numerador el exponente. Primero la raíz, luego la potencia.', 'المقام هو الدليل والبسط هو الأس. الجذر أولًا ثم القوة.'),
        figure: (language) => <FractionalFigure language={language} />
    },
    {
        id: 'equivalent',
        stage: 'radicals',
        title: say('Erradikal baliokideak', 'Radicales equivalentes', 'الجذور المتكافئة'),
        goal: say('Erradikalak sinplifikatzea, indize komunera eramatea eta konparatzea.', 'Simplificar radicales, reducirlos a índice común y compararlos.', 'تبسيط الجذور وردّها إلى دليل مشترك ومقارنتها.'),
        explanation: say(
            'Bi erradikal baliokideak dira berretzaile zatiki berdina badute: $\\sqrt[6]{2^4}=2^{\\frac{4}{6}}=2^{\\frac{2}{3}}=\\sqrt[3]{2^2}$. Beraz, indizea eta errokizunaren berretzailea zenbaki berberaz zatitzen badira, erradikala sinplifikatzen da; biderkatzen badira, baliokide bat lortzen da. Bi erradikal konparatu edo biderkatzeko, indize komunera eramaten dira: indizeen m.k.t.-a. Adibidez, $\\sqrt{2}$ eta $\\sqrt[3]{3}$: m.k.t. 6 da, $\\sqrt[6]{2^3}=\\sqrt[6]{8}$ eta $\\sqrt[6]{3^2}=\\sqrt[6]{9}$; beraz $\\sqrt[3]{3}$ da handiena.',
            'Dos radicales son equivalentes si tienen el mismo exponente fraccionario: $\\sqrt[6]{2^4}=2^{\\frac{4}{6}}=2^{\\frac{2}{3}}=\\sqrt[3]{2^2}$. Por tanto, si se dividen el índice y el exponente del radicando por el mismo número, el radical se simplifica; si se multiplican, se obtiene uno equivalente. Para comparar o multiplicar dos radicales se reducen a índice común: el m.c.m. de los índices. Por ejemplo, $\\sqrt{2}$ y $\\sqrt[3]{3}$: el m.c.m. es 6, $\\sqrt[6]{2^3}=\\sqrt[6]{8}$ y $\\sqrt[6]{3^2}=\\sqrt[6]{9}$; así que $\\sqrt[3]{3}$ es el mayor.',
            'يتكافأ جذران إذا كان لهما الأس الكسري نفسه: $\\sqrt[6]{2^4}=2^{\\frac{4}{6}}=2^{\\frac{2}{3}}=\\sqrt[3]{2^2}$. لذلك إذا قُسم الدليل وأس ما تحت الجذر على العدد نفسه يُبسَّط الجذر، وإذا ضُربا نحصل على جذر مكافئ. ولمقارنة جذرين أو ضربهما نردّهما إلى دليل مشترك: المضاعف المشترك الأصغر للدليلين. مثلًا $\\sqrt{2}$ و$\\sqrt[3]{3}$: المضاعف 6، و$\\sqrt[6]{2^3}=\\sqrt[6]{8}$ و$\\sqrt[6]{3^2}=\\sqrt[6]{9}$؛ إذن $\\sqrt[3]{3}$ هو الأكبر.'
        ),
        problem: say('Zein da handiagoa, $\\sqrt[3]{5}$ ala $\\sqrt[4]{3}$?', '¿Cuál es mayor, $\\sqrt[3]{5}$ o $\\sqrt[4]{3}$?', 'أيهما أكبر: $\\sqrt[3]{5}$ أم $\\sqrt[4]{3}$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indize komuna: m.k.t.(3, 4).', 'Índice común: m.c.m.(3, 4).', 'الدليل المشترك: م.م.أ(3، 4).'), math: same('$12$') },
            { text: say('Idatzi biak 12. erro gisa.', 'Escribe los dos como raíz duodécima.', 'اكتب الاثنين جذرًا ثاني عشر.'), math: same('$\\sqrt[12]{5^4}=\\sqrt[12]{625}\\quad \\sqrt[12]{3^3}=\\sqrt[12]{27}$') },
            { text: say('Konparatu errokizunak.', 'Compara los radicandos.', 'قارن ما تحت الجذرين.'), math: same('$\\sqrt[3]{5}>\\sqrt[4]{3}$') }
        ],
        example: same('$\\sqrt[6]{8}=\\sqrt{2}$'),
        takeaway: say('Indizea eta berretzailea zenbaki berberaz zatitu edo biderkatu: erradikal baliokidea.', 'Divide o multiplica índice y exponente por el mismo número: radical equivalente.', 'اقسم الدليل والأس أو اضربهما في العدد نفسه: جذر مكافئ.'),
        figure: (language) => <EquivalentFigure language={language} />
    },

    /* ---------- 3. Operations with radicals ---------- */
    {
        id: 'extract',
        stage: 'operations',
        title: say('Faktoreak ateratzea eta sartzea', 'Extraer e introducir factores', 'إخراج العوامل وإدخالها'),
        goal: say('Edozein indizeko erroetatik faktoreak ateratzea eta faktoreak erro barruan sartzea.', 'Sacar factores de raíces de cualquier índice e introducir factores dentro de la raíz.', 'إخراج العوامل من جذور أي دليل وإدخال العوامل تحت الجذر.'),
        explanation: say(
            'Faktore bat erro batetik ateratzeko, haren berretzaileak indizea gainditu edo berdindu behar du. Faktorizatu errokizuna, eta zenbaki lehen bakoitzaren berretzailea indizeaz zatitu: zatidura kanpora ateratzen da, eta hondarra barruan geratzen da. $\\sqrt[3]{3240}=\\sqrt[3]{2^3\\cdot 3^4\\cdot 5}$: 2-ren $3:3=1$, kanpora 2; 3-ren $4:3=1$, hondarra 1, kanpora 3 eta barruan 3. Beraz $2\\cdot 3\\sqrt[3]{3\\cdot 5}=6\\sqrt[3]{15}$. Alderantziz, faktore bat sartzeko, indizera jasotzen da: $2\\sqrt[3]{5}=\\sqrt[3]{2^3\\cdot 5}=\\sqrt[3]{40}$.',
            'Para sacar un factor de una raíz, su exponente tiene que igualar o superar el índice. Se factoriza el radicando y se divide el exponente de cada primo entre el índice: el cociente sale fuera y el resto se queda dentro. $\\sqrt[3]{3240}=\\sqrt[3]{2^3\\cdot 3^4\\cdot 5}$: del 2, $3:3=1$, fuera un 2; del 3, $4:3=1$ con resto 1, fuera un 3 y dentro un 3. Así, $2\\cdot 3\\sqrt[3]{3\\cdot 5}=6\\sqrt[3]{15}$. Al revés, para introducir un factor se eleva al índice: $2\\sqrt[3]{5}=\\sqrt[3]{2^3\\cdot 5}=\\sqrt[3]{40}$.',
            'لإخراج عامل من جذر يجب أن يساوي أسه الدليل أو يتجاوزه. نحلّل ما تحت الجذر ونقسم أس كل عدد أولي على الدليل: يخرج خارج القسمة ويبقى الباقي في الداخل. $\\sqrt[3]{3240}=\\sqrt[3]{2^3\\cdot 3^4\\cdot 5}$: للعدد 2 $3:3=1$ فيخرج 2؛ وللعدد 3 $4:3=1$ والباقي 1 فيخرج 3 ويبقى 3. إذن $2\\cdot 3\\sqrt[3]{3\\cdot 5}=6\\sqrt[3]{15}$. وبالعكس، لإدخال عامل نرفعه إلى الدليل: $2\\sqrt[3]{5}=\\sqrt[3]{2^3\\cdot 5}=\\sqrt[3]{40}$.'
        ),
        problem: same('$\\sqrt[4]{405}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu.', 'Factoriza.', 'حلّل.'), math: same('$405=3^4\\cdot 5$') },
            { text: say('$3^4$ osorik ateratzen da.', '$3^4$ sale entero.', '$3^4$ يخرج كله.'), math: same('$\\sqrt[4]{3^4\\cdot 5}$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.'), math: same('$3\\sqrt[4]{5}$') }
        ],
        example: same('$\\sqrt{98}=7\\sqrt{2}$'),
        takeaway: say('Berretzailea zati indizea: zatidura kanpora, hondarra barruan.', 'Exponente entre índice: el cociente sale, el resto se queda dentro.', 'الأس على الدليل: يخرج خارج القسمة ويبقى الباقي في الداخل.'),
        figure: (language) => <SimplifyFigure language={language} />
    },
    {
        id: 'add-radicals',
        stage: 'operations',
        title: say('Erradikalak batu eta kendu', 'Sumar y restar radicales', 'جمع الجذور وطرحها'),
        goal: say('Erradikal antzekoak ezagutzea eta haiek batzea, lehenik faktoreak ateraz.', 'Reconocer radicales semejantes y sumarlos, sacando antes los factores.', 'التعرّف إلى الجذور المتشابهة وجمعها بعد إخراج العوامل.'),
        explanation: say(
            'Bi erradikal antzekoak dira indize eta errokizun berdinak badituzte: $3\\sqrt{2}$ eta $-5\\sqrt{2}$. Antzekoak bakarrik batu daitezke, eta haien koefizienteak batuz: $12\\sqrt{5}-9\\sqrt{5}-\\sqrt{5}=(12-9-1)\\sqrt{5}=2\\sqrt{5}$. Askotan ez dirudi antzekoak direnik, baina faktoreak ateratzean bihurtzen dira: $\\sqrt{18}-\\sqrt{50}+\\sqrt{2}-\\sqrt{8}=3\\sqrt{2}-5\\sqrt{2}+\\sqrt{2}-2\\sqrt{2}=-3\\sqrt{2}$. Kontuz: $\\sqrt{2}+\\sqrt{3}\\ne\\sqrt{5}$; ez dago sinplifikatzerik.',
            'Dos radicales son semejantes si tienen el mismo índice y el mismo radicando: $3\\sqrt{2}$ y $-5\\sqrt{2}$. Solo se pueden sumar los semejantes, sumando sus coeficientes: $12\\sqrt{5}-9\\sqrt{5}-\\sqrt{5}=(12-9-1)\\sqrt{5}=2\\sqrt{5}$. Muchas veces no parecen semejantes, pero lo son al sacar factores: $\\sqrt{18}-\\sqrt{50}+\\sqrt{2}-\\sqrt{8}=3\\sqrt{2}-5\\sqrt{2}+\\sqrt{2}-2\\sqrt{2}=-3\\sqrt{2}$. Cuidado: $\\sqrt{2}+\\sqrt{3}\\ne\\sqrt{5}$; no se puede simplificar.',
            'يتشابه جذران إذا كان لهما الدليل نفسه وما تحت الجذر نفسه: $3\\sqrt{2}$ و$-5\\sqrt{2}$. ولا تُجمع إلا الجذور المتشابهة، بجمع معاملاتها: $12\\sqrt{5}-9\\sqrt{5}-\\sqrt{5}=(12-9-1)\\sqrt{5}=2\\sqrt{5}$. وكثيرًا ما لا تبدو متشابهة لكنها تصبح كذلك بعد إخراج العوامل: $\\sqrt{18}-\\sqrt{50}+\\sqrt{2}-\\sqrt{8}=3\\sqrt{2}-5\\sqrt{2}+\\sqrt{2}-2\\sqrt{2}=-3\\sqrt{2}$. انتبه: $\\sqrt{2}+\\sqrt{3}\\ne\\sqrt{5}$؛ لا يمكن التبسيط.'
        ),
        problem: same('$\\sqrt{12}+\\sqrt{75}-\\sqrt{27}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Atera faktoreak.', 'Saca factores.', 'أخرج العوامل.'), math: same('$2\\sqrt{3}+5\\sqrt{3}-3\\sqrt{3}$') },
            { text: say('Batu koefizienteak.', 'Suma los coeficientes.', 'اجمع المعاملات.'), math: same('$(2+5-3)\\sqrt{3}$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.'), math: same('$4\\sqrt{3}$') }
        ],
        example: same('$3\\sqrt{2}+5\\sqrt{2}=8\\sqrt{2}$'),
        takeaway: say('Indize eta errokizun bera dutenak bakarrik batzen dira: koefizienteak batu.', 'Solo se suman los de igual índice y radicando: suma los coeficientes.', 'لا يُجمع إلا ما له الدليل وما تحت الجذر نفسهما: اجمع المعاملات.'),
        figure: (language) => <RadicalOpsFigure language={language} />
    },
    {
        id: 'multiply-radicals',
        stage: 'operations',
        title: say('Erradikalak biderkatu, zatitu eta berretu', 'Multiplicar, dividir y elevar radicales', 'ضرب الجذور وقسمتها ورفعها إلى قوة'),
        goal: say('Indize bereko eta indize desberdineko erradikalekin biderketak, zatiketak, berreturak eta erroak egitea.', 'Multiplicar, dividir, elevar y hacer raíces de radicales del mismo y de distinto índice.', 'ضرب الجذور ذات الدليل نفسه ومختلفة الدليل وقسمتها ورفعها إلى قوة وأخذ جذورها.'),
        explanation: say(
            'Indize bereko erradikalak biderkatzean, errokizunak biderkatzen dira: $\\sqrt[n]{a}\\cdot\\sqrt[n]{b}=\\sqrt[n]{a\\cdot b}$; zatitzean, zatitu. Indizeak desberdinak badira, lehenik indize komunera eraman: $\\sqrt{2}\\cdot\\sqrt[3]{3}=\\sqrt[6]{2^3}\\cdot\\sqrt[6]{3^2}=\\sqrt[6]{72}$. Erradikal bat berretzean, errokizuna berretzen da: $(\\sqrt[3]{5})^2=\\sqrt[3]{25}$. Erro baten erroan, indizeak biderkatzen dira: $\\sqrt[3]{\\sqrt{10}}=\\sqrt[6]{10}$. Berretzaile zatikiekin ere egin daiteke: $\\sqrt[4]{3}\\cdot\\sqrt[6]{9}\\cdot\\sqrt{3}=3^{\\frac{1}{4}+\\frac{1}{3}+\\frac{1}{2}}=3^{\\frac{13}{12}}$.',
            'Al multiplicar radicales del mismo índice se multiplican los radicandos: $\\sqrt[n]{a}\\cdot\\sqrt[n]{b}=\\sqrt[n]{a\\cdot b}$; al dividir, se dividen. Si los índices son distintos, primero se reducen a índice común: $\\sqrt{2}\\cdot\\sqrt[3]{3}=\\sqrt[6]{2^3}\\cdot\\sqrt[6]{3^2}=\\sqrt[6]{72}$. Al elevar un radical, se eleva el radicando: $(\\sqrt[3]{5})^2=\\sqrt[3]{25}$. En la raíz de una raíz se multiplican los índices: $\\sqrt[3]{\\sqrt{10}}=\\sqrt[6]{10}$. También se puede hacer con exponentes fraccionarios: $\\sqrt[4]{3}\\cdot\\sqrt[6]{9}\\cdot\\sqrt{3}=3^{\\frac{1}{4}+\\frac{1}{3}+\\frac{1}{2}}=3^{\\frac{13}{12}}$.',
            'عند ضرب جذور لها الدليل نفسه نضرب ما تحت الجذور: $\\sqrt[n]{a}\\cdot\\sqrt[n]{b}=\\sqrt[n]{a\\cdot b}$، وعند القسمة نقسمها. وإذا اختلفت الأدلة نردّها أولًا إلى دليل مشترك: $\\sqrt{2}\\cdot\\sqrt[3]{3}=\\sqrt[6]{2^3}\\cdot\\sqrt[6]{3^2}=\\sqrt[6]{72}$. وعند رفع جذر إلى قوة نرفع ما تحته: $(\\sqrt[3]{5})^2=\\sqrt[3]{25}$. وفي جذر الجذر نضرب الأدلة: $\\sqrt[3]{\\sqrt{10}}=\\sqrt[6]{10}$. ويمكن العمل بالأسس الكسرية أيضًا: $\\sqrt[4]{3}\\cdot\\sqrt[6]{9}\\cdot\\sqrt{3}=3^{\\frac{1}{4}+\\frac{1}{3}+\\frac{1}{2}}=3^{\\frac{13}{12}}$.'
        ),
        problem: same('$\\sqrt[3]{4}\\cdot\\sqrt{2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Indize komuna: 6.', 'Índice común: 6.', 'الدليل المشترك: 6.'), math: same('$\\sqrt[6]{4^2}\\cdot\\sqrt[6]{2^3}$') },
            { text: say('Elkartu.', 'Junta.', 'اجمع.'), math: same('$\\sqrt[6]{2^4\\cdot 2^3}=\\sqrt[6]{2^7}$') },
            { text: say('Atera faktorea.', 'Saca el factor.', 'أخرج العامل.'), math: same('$2\\sqrt[6]{2}$') }
        ],
        example: same('$\\sqrt[3]{\\sqrt{10}}=\\sqrt[6]{10}$'),
        takeaway: say('Indize bera: errokizunak elkartu. Indize desberdinak: lehenik indize komuna.', 'Mismo índice: junta los radicandos. Índices distintos: primero índice común.', 'الدليل نفسه: اجمع ما تحت الجذور. أدلة مختلفة: أولًا دليل مشترك.'),
        figure: (language) => <RadicalProductFigure language={language} />
    },

    /* ---------- 4. Rationalizing ---------- */
    {
        id: 'rationalize-square',
        stage: 'rationalize',
        title: say('Erro karratu bat izendatzailean', 'Una raíz cuadrada en el denominador', 'جذر تربيعي في المقام'),
        goal: say('Izendatzailean $\\sqrt{b}$ edo $a\\sqrt{b}$ duten zatikiak arrazionalizatzea.', 'Racionalizar fracciones con $\\sqrt{b}$ o $a\\sqrt{b}$ en el denominador.', 'إنطاق كسور في مقامها $\\sqrt{b}$ أو $a\\sqrt{b}$.'),
        explanation: say(
            'Arrazionalizatzea izendatzailean errorik gabeko zatiki baliokide bat lortzea da. Izendatzailean $\\sqrt{b}$ badago, biderkatu zenbakitzailea eta izendatzailea $\\sqrt{b}$-z: $\\frac{a}{\\sqrt{b}}=\\frac{a\\sqrt{b}}{b}$, $\\sqrt{b}\\cdot\\sqrt{b}=b$ delako. Zatikia ez da aldatzen, $\\frac{\\sqrt{b}}{\\sqrt{b}}=1$-ez biderkatzen delako. Izendatzailea $c\\sqrt{b}$ bada, nahikoa da $\\sqrt{b}$-z biderkatzea: $\\frac{8}{3\\sqrt{2}}=\\frac{8\\sqrt{2}}{3\\cdot 2}=\\frac{4\\sqrt{2}}{3}$. Amaieran, sinplifikatu zatikia.',
            'Racionalizar es conseguir una fracción equivalente sin raíces en el denominador. Si en el denominador hay $\\sqrt{b}$, se multiplican el numerador y el denominador por $\\sqrt{b}$: $\\frac{a}{\\sqrt{b}}=\\frac{a\\sqrt{b}}{b}$, porque $\\sqrt{b}\\cdot\\sqrt{b}=b$. La fracción no cambia, porque se multiplica por $\\frac{\\sqrt{b}}{\\sqrt{b}}=1$. Si el denominador es $c\\sqrt{b}$, basta con multiplicar por $\\sqrt{b}$: $\\frac{8}{3\\sqrt{2}}=\\frac{8\\sqrt{2}}{3\\cdot 2}=\\frac{4\\sqrt{2}}{3}$. Al final, se simplifica la fracción.',
            'الإنطاق هو الحصول على كسر مكافئ بلا جذور في المقام. إذا كان في المقام $\\sqrt{b}$ نضرب البسط والمقام في $\\sqrt{b}$: $\\frac{a}{\\sqrt{b}}=\\frac{a\\sqrt{b}}{b}$ لأن $\\sqrt{b}\\cdot\\sqrt{b}=b$. ولا يتغيّر الكسر لأننا نضرب في $\\frac{\\sqrt{b}}{\\sqrt{b}}=1$. وإذا كان المقام $c\\sqrt{b}$ يكفي الضرب في $\\sqrt{b}$: $\\frac{8}{3\\sqrt{2}}=\\frac{8\\sqrt{2}}{3\\cdot 2}=\\frac{4\\sqrt{2}}{3}$. وفي النهاية نبسّط الكسر.'
        ),
        problem: same('$\\frac{6}{\\sqrt{3}}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu goian eta behean $\\sqrt{3}$-z.', 'Multiplica arriba y abajo por $\\sqrt{3}$.', 'اضرب البسط والمقام في $\\sqrt{3}$.'), math: same('$\\frac{6\\sqrt{3}}{\\sqrt{3}\\cdot\\sqrt{3}}$') },
            { text: say('$\\sqrt{3}\\cdot\\sqrt{3}=3$.', '$\\sqrt{3}\\cdot\\sqrt{3}=3$.', '$\\sqrt{3}\\cdot\\sqrt{3}=3$.'), math: same('$\\frac{6\\sqrt{3}}{3}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.'), math: same('$2\\sqrt{3}$') }
        ],
        example: same('$\\frac{1}{\\sqrt{2}}=\\frac{\\sqrt{2}}{2}$'),
        takeaway: say('Izendatzailean √b: biderkatu goian eta behean √b-z.', 'En el denominador √b: multiplica arriba y abajo por √b.', 'في المقام √b: اضرب البسط والمقام في √b.'),
        figure: (language) => <RationalizeSquareFigure language={language} />
    },
    {
        id: 'rationalize-index',
        stage: 'rationalize',
        title: say('Beste indize bateko erro bat izendatzailean', 'Una raíz de otro índice en el denominador', 'جذر من دليل آخر في المقام'),
        goal: say('Izendatzailean $\\sqrt[n]{b^m}$ duten zatikiak arrazionalizatzea.', 'Racionalizar fracciones con $\\sqrt[n]{b^m}$ en el denominador.', 'إنطاق كسور في مقامها $\\sqrt[n]{b^m}$.'),
        explanation: say(
            'Izendatzailea $\\sqrt[n]{b^m}$ bada ($m<n$), $\\sqrt[n]{b}$-z biderkatzea ez da nahikoa. Errokizunaren berretzailea indizeraino osatu behar da: biderkatu $\\sqrt[n]{b^{n-m}}$-z, horrela $\\sqrt[n]{b^m}\\cdot\\sqrt[n]{b^{n-m}}=\\sqrt[n]{b^n}=b$. Adibidez, $\\frac{5}{\\sqrt[3]{2}}=\\frac{5\\sqrt[3]{2^2}}{\\sqrt[3]{2^3}}=\\frac{5\\sqrt[3]{4}}{2}$. Errokizuna ez bada berretura bat, faktorizatu lehenik: $\\frac{8}{\\sqrt[4]{8}}=\\frac{8}{\\sqrt[4]{2^3}}=\\frac{8\\sqrt[4]{2}}{2}=4\\sqrt[4]{2}$.',
            'Si el denominador es $\\sqrt[n]{b^m}$ ($m<n$), no basta con multiplicar por $\\sqrt[n]{b}$. Hay que completar el exponente del radicando hasta el índice: se multiplica por $\\sqrt[n]{b^{n-m}}$, y así $\\sqrt[n]{b^m}\\cdot\\sqrt[n]{b^{n-m}}=\\sqrt[n]{b^n}=b$. Por ejemplo, $\\frac{5}{\\sqrt[3]{2}}=\\frac{5\\sqrt[3]{2^2}}{\\sqrt[3]{2^3}}=\\frac{5\\sqrt[3]{4}}{2}$. Si el radicando no es una potencia, se factoriza primero: $\\frac{8}{\\sqrt[4]{8}}=\\frac{8}{\\sqrt[4]{2^3}}=\\frac{8\\sqrt[4]{2}}{2}=4\\sqrt[4]{2}$.',
            'إذا كان المقام $\\sqrt[n]{b^m}$ ($m<n$) فلا يكفي الضرب في $\\sqrt[n]{b}$. يجب إكمال أس ما تحت الجذر حتى الدليل: نضرب في $\\sqrt[n]{b^{n-m}}$، فيصبح $\\sqrt[n]{b^m}\\cdot\\sqrt[n]{b^{n-m}}=\\sqrt[n]{b^n}=b$. مثلًا $\\frac{5}{\\sqrt[3]{2}}=\\frac{5\\sqrt[3]{2^2}}{\\sqrt[3]{2^3}}=\\frac{5\\sqrt[3]{4}}{2}$. وإذا لم يكن ما تحت الجذر قوةً نحلّله أولًا: $\\frac{8}{\\sqrt[4]{8}}=\\frac{8}{\\sqrt[4]{2^3}}=\\frac{8\\sqrt[4]{2}}{2}=4\\sqrt[4]{2}$.'
        ),
        problem: same('$\\frac{6}{\\sqrt[5]{3^2}}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Osatu 5eraino: falta da $3^3$.', 'Completa hasta 5: falta $3^3$.', 'أكمل حتى 5: ينقص $3^3$.'), math: same('$\\frac{6\\sqrt[5]{3^3}}{\\sqrt[5]{3^5}}$') },
            { text: say('Izendatzailea 3 da.', 'El denominador es 3.', 'المقام 3.'), math: same('$\\frac{6\\sqrt[5]{27}}{3}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.'), math: same('$2\\sqrt[5]{27}$') }
        ],
        example: same('$\\frac{1}{\\sqrt[3]{2}}=\\frac{\\sqrt[3]{4}}{2}$'),
        takeaway: say('Biderkatu indizeraino falta den berretzailea duen erroaz.', 'Multiplica por la raíz con el exponente que falta hasta el índice.', 'اضرب في الجذر ذي الأس الناقص حتى الدليل.'),
        figure: (language) => <RationalizeIndexFigure language={language} />
    },
    {
        id: 'conjugate',
        stage: 'rationalize',
        title: say('Konjokatua', 'El conjugado', 'المرافق'),
        goal: say('Izendatzailean erroekin batura edo kenketa duten zatikiak konjokatuaz arrazionalizatzea.', 'Racionalizar fracciones con una suma o resta de raíces en el denominador usando el conjugado.', 'إنطاق كسور في مقامها مجموع أو فرق جذور باستعمال المرافق.'),
        explanation: say(
            'Izendatzailea $a+\\sqrt{b}$ edo $\\sqrt{a}-\\sqrt{b}$ motakoa bada, ez da nahikoa erro batez biderkatzea. Konjokatuaz biderkatzen da: zeinua aldatuta dagoen adierazpen bera ($\\sqrt{3}-\\sqrt{2}$-ren konjokatua $\\sqrt{3}+\\sqrt{2}$ da). Batura bider kenketa karratuen kenketa da, $(x-y)(x+y)=x^2-y^2$, eta erroak desagertzen dira: $(\\sqrt{3}-\\sqrt{2})(\\sqrt{3}+\\sqrt{2})=3-2=1$. Adibidez, $\\frac{4}{\\sqrt{5}+1}=\\frac{4(\\sqrt{5}-1)}{5-1}=\\sqrt{5}-1$.',
            'Si el denominador es del tipo $a+\\sqrt{b}$ o $\\sqrt{a}-\\sqrt{b}$, no basta con multiplicar por una raíz. Se multiplica por el conjugado: la misma expresión con el signo cambiado (el conjugado de $\\sqrt{3}-\\sqrt{2}$ es $\\sqrt{3}+\\sqrt{2}$). Suma por diferencia es diferencia de cuadrados, $(x-y)(x+y)=x^2-y^2$, y las raíces desaparecen: $(\\sqrt{3}-\\sqrt{2})(\\sqrt{3}+\\sqrt{2})=3-2=1$. Por ejemplo, $\\frac{4}{\\sqrt{5}+1}=\\frac{4(\\sqrt{5}-1)}{5-1}=\\sqrt{5}-1$.',
            'إذا كان المقام من النوع $a+\\sqrt{b}$ أو $\\sqrt{a}-\\sqrt{b}$ فلا يكفي الضرب في جذر. نضرب في المرافق: العبارة نفسها بإشارة معكوسة (مرافق $\\sqrt{3}-\\sqrt{2}$ هو $\\sqrt{3}+\\sqrt{2}$). المجموع في الفرق هو فرق مربعين $(x-y)(x+y)=x^2-y^2$، فتختفي الجذور: $(\\sqrt{3}-\\sqrt{2})(\\sqrt{3}+\\sqrt{2})=3-2=1$. مثلًا $\\frac{4}{\\sqrt{5}+1}=\\frac{4(\\sqrt{5}-1)}{5-1}=\\sqrt{5}-1$.'
        ),
        problem: same('$\\frac{2}{\\sqrt{3}-1}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu konjokatuaz.', 'Multiplica por el conjugado.', 'اضرب في المرافق.'), math: same('$\\frac{2(\\sqrt{3}+1)}{(\\sqrt{3}-1)(\\sqrt{3}+1)}$') },
            { text: say('Karratuen kenketa.', 'Diferencia de cuadrados.', 'فرق مربعين.'), math: same('$\\frac{2(\\sqrt{3}+1)}{3-1}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.'), math: same('$\\sqrt{3}+1$') }
        ],
        example: same('$(\\sqrt{5}+1)(\\sqrt{5}-1)=4$'),
        takeaway: say('Izendatzailean batura edo kenketa: biderkatu konjokatuaz.', 'Suma o resta en el denominador: multiplica por el conjugado.', 'مجموع أو فرق في المقام: اضرب في المرافق.'),
        figure: (language) => <ConjugateFigure language={language} />
    },

    /* ---------- 5. Logarithms ---------- */
    {
        id: 'log-definition',
        stage: 'logarithms',
        title: say('Logaritmoa', 'El logaritmo', 'اللوغاريتم'),
        goal: say('Logaritmo baten definizioa erabiltzea logaritmoak kalkulatzeko eta oinarria aurkitzeko.', 'Usar la definición de logaritmo para calcular logaritmos y hallar la base.', 'استعمال تعريف اللوغاريتم لحساب اللوغاريتمات وإيجاد الأساس.'),
        explanation: say(
            '$a$ oinarriko $b$-ren logaritmoa $a$ jaso behar den berretzailea da $b$ lortzeko: $\\log_a b=x \\iff a^x=b$. Oinarria positiboa eta 1en desberdina da, eta $b$ positiboa: ez dago zero edo zenbaki negatiboen logaritmorik. Adibidez, $\\log_2 32=5$, $2^5=32$ delako, eta $\\log_5 0{,}04=-2$, $5^{-2}=\\frac{1}{25}$ delako. Beti $\\log_a 1=0$ eta $\\log_a a=1$. Logaritmo hamartarrak 10 oinarria du eta $\\log$ idazten da; logaritmo nepertarrak $e\\approx 2{,}718$ oinarria du eta $\\ln$ idazten da. Oinarria aurkitzeko ere definizioa erabiltzen da: $\\log_b 216=3 \\to b^3=216 \\to b=6$.',
            'El logaritmo en base $a$ de $b$ es el exponente al que hay que elevar $a$ para obtener $b$: $\\log_a b=x \\iff a^x=b$. La base es positiva y distinta de 1, y $b$ es positivo: no existen logaritmos de cero ni de números negativos. Por ejemplo, $\\log_2 32=5$ porque $2^5=32$, y $\\log_5 0{,}04=-2$ porque $5^{-2}=\\frac{1}{25}$. Siempre $\\log_a 1=0$ y $\\log_a a=1$. El logaritmo decimal tiene base 10 y se escribe $\\log$; el neperiano tiene base $e\\approx 2{,}718$ y se escribe $\\ln$. Para hallar la base también se usa la definición: $\\log_b 216=3 \\to b^3=216 \\to b=6$.',
            'لوغاريتم $b$ للأساس $a$ هو الأس الذي نرفع إليه $a$ لنحصل على $b$: $\\log_a b=x \\iff a^x=b$. الأساس موجب ولا يساوي 1، و$b$ موجب: لا لوغاريتم للصفر ولا للأعداد السالبة. مثلًا $\\log_2 32=5$ لأن $2^5=32$، و$\\log_5 0{,}04=-2$ لأن $5^{-2}=\\frac{1}{25}$. ودائمًا $\\log_a 1=0$ و$\\log_a a=1$. اللوغاريتم العشري أساسه 10 ويُكتب $\\log$، والنيبيري أساسه $e\\approx 2{,}718$ ويُكتب $\\ln$. ولإيجاد الأساس نستعمل التعريف أيضًا: $\\log_b 216=3 \\to b^3=216 \\to b=6$.'
        ),
        problem: same('$\\log_4 \\frac{1}{8}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Definizioa.', 'Definición.', 'التعريف.'), math: same('$4^{x}=\\frac{1}{8}$') },
            { text: say('Biak 2ren berretura gisa.', 'Las dos como potencias de 2.', 'الطرفان قوتان للعدد 2.'), math: same('$2^{2x}=2^{-3}$') },
            { text: say('Berdindu berretzaileak.', 'Iguala los exponentes.', 'ساوِ الأسين.'), math: same('$x=-\\frac{3}{2}$') }
        ],
        example: same('$\\log 1000=3$'),
        takeaway: say('Logaritmoa berretzaile bat da: zenbatera jaso oinarria zenbakia lortzeko.', 'El logaritmo es un exponente: a qué hay que elevar la base para obtener el número.', 'اللوغاريتم أس: إلى أي قوة نرفع الأساس لنحصل على العدد.'),
        figure: (language) => <LogDefinitionFigure language={language} />
    },
    {
        id: 'log-properties',
        stage: 'logarithms',
        title: say('Logaritmoen propietateak', 'Propiedades de los logaritmos', 'خصائص اللوغاريتمات'),
        goal: say('Logaritmoen propietateak erabiltzea adierazpenak kalkulatzeko eta logaritmo bakar gisa idazteko.', 'Usar las propiedades de los logaritmos para calcular expresiones y escribirlas como un solo logaritmo.', 'استعمال خصائص اللوغاريتمات لحساب العبارات وكتابتها لوغاريتمًا واحدًا.'),
        explanation: say(
            'Logaritmoak berretzaileak direnez, berreturen propietateak betetzen dituzte. Biderkadura baten logaritmoa logaritmoen batura da: $\\log_a(x\\cdot y)=\\log_a x+\\log_a y$. Zatidura batena, kenketa: $\\log_a\\frac{x}{y}=\\log_a x-\\log_a y$. Berretura batena, berretzailea bider logaritmoa: $\\log_a x^n=n\\cdot\\log_a x$. Adibidez, $\\log_{12} 18+\\log_{12} 4+\\log_{12} 2=\\log_{12}(18\\cdot 4\\cdot 2)=\\log_{12} 144=2$. Kontuz: $\\log(x+y)$ ez da $\\log x+\\log y$.',
            'Como los logaritmos son exponentes, cumplen las propiedades de las potencias. El logaritmo de un producto es la suma de los logaritmos: $\\log_a(x\\cdot y)=\\log_a x+\\log_a y$. El de un cociente, la resta: $\\log_a\\frac{x}{y}=\\log_a x-\\log_a y$. El de una potencia, el exponente por el logaritmo: $\\log_a x^n=n\\cdot\\log_a x$. Por ejemplo, $\\log_{12} 18+\\log_{12} 4+\\log_{12} 2=\\log_{12}(18\\cdot 4\\cdot 2)=\\log_{12} 144=2$. Cuidado: $\\log(x+y)$ no es $\\log x+\\log y$.',
            'بما أن اللوغاريتمات أسس فهي تخضع لخصائص القوى. لوغاريتم الضرب مجموع اللوغاريتمين: $\\log_a(x\\cdot y)=\\log_a x+\\log_a y$. ولوغاريتم القسمة الفرق: $\\log_a\\frac{x}{y}=\\log_a x-\\log_a y$. ولوغاريتم القوة الأس في اللوغاريتم: $\\log_a x^n=n\\cdot\\log_a x$. مثلًا $\\log_{12} 18+\\log_{12} 4+\\log_{12} 2=\\log_{12}(18\\cdot 4\\cdot 2)=\\log_{12} 144=2$. انتبه: $\\log(x+y)$ ليس $\\log x+\\log y$.'
        ),
        problem: same('$\\log 2+\\log 25-\\log 5$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batura: biderkadura.', 'Suma: producto.', 'الجمع: ضرب.'), math: same('$\\log(2\\cdot 25)=\\log 50$') },
            { text: say('Kenketa: zatidura.', 'Resta: cociente.', 'الطرح: قسمة.'), math: same('$\\log\\frac{50}{5}=\\log 10$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.'), math: same('$1$') }
        ],
        example: same('$\\log_2 8^{5}=15$'),
        takeaway: say('Biderkadura → batura, zatidura → kenketa, berretura → biderketa.', 'Producto → suma, cociente → resta, potencia → producto.', 'الضرب ← جمع، القسمة ← طرح، القوة ← ضرب.'),
        figure: (language) => <LogPropertiesFigure language={language} />
    },
    {
        id: 'change-base',
        stage: 'logarithms',
        title: say('Oinarri-aldaketa eta kalkulagailua', 'Cambio de base y calculadora', 'تغيير الأساس والآلة الحاسبة'),
        goal: say('Edozein oinarritako logaritmoak kalkulagailuarekin kalkulatzea, oinarri-aldaketaren formularekin.', 'Calcular logaritmos de cualquier base con la calculadora, con la fórmula del cambio de base.', 'حساب لوغاريتمات أي أساس بالآلة الحاسبة بصيغة تغيير الأساس.'),
        explanation: say(
            'Kalkulagailuak bi logaritmo ditu: $\\log$ (10 oinarria) eta $\\ln$ ($e$ oinarria). Beste oinarri baterako, oinarri-aldaketaren formula: $\\log_a b=\\frac{\\log b}{\\log a}$. Adibidez, $\\log_5 20=\\frac{\\log 20}{\\log 5}\\approx\\frac{1{,}301}{0{,}699}\\approx 1{,}861$. Egiaztatzeko, $5^{1{,}861}\\approx 20$. Gainera, emaitza zentzuzkoa den ikusteko, kokatu berreturen artean: $5^1=5<20<25=5^2$, beraz logaritmoa 1 eta 2 artean dago. Formula hau berretzailea ezezaguna duten ekuazioak ebazteko ere erabiltzen da: $2^x=10 \\to x=\\log_2 10$.',
            'La calculadora tiene dos logaritmos: $\\log$ (base 10) y $\\ln$ (base $e$). Para otra base se usa la fórmula del cambio de base: $\\log_a b=\\frac{\\log b}{\\log a}$. Por ejemplo, $\\log_5 20=\\frac{\\log 20}{\\log 5}\\approx\\frac{1{,}301}{0{,}699}\\approx 1{,}861$. Para comprobarlo, $5^{1{,}861}\\approx 20$. Además, para ver si el resultado es razonable, se sitúa entre potencias: $5^1=5<20<25=5^2$, así que el logaritmo está entre 1 y 2. Esta fórmula también sirve para resolver ecuaciones con la incógnita en el exponente: $2^x=10 \\to x=\\log_2 10$.',
            'للآلة الحاسبة لوغاريتمان: $\\log$ (الأساس 10) و$\\ln$ (الأساس $e$). ولأساس آخر نستعمل صيغة تغيير الأساس: $\\log_a b=\\frac{\\log b}{\\log a}$. مثلًا $\\log_5 20=\\frac{\\log 20}{\\log 5}\\approx\\frac{1{,}301}{0{,}699}\\approx 1{,}861$. وللتحقق: $5^{1{,}861}\\approx 20$. ولمعرفة هل النتيجة معقولة نضعها بين قوتين: $5^1=5<20<25=5^2$، إذن اللوغاريتم بين 1 و2. وتصلح هذه الصيغة أيضًا لحل معادلات المجهول فيها في الأس: $2^x=10 \\to x=\\log_2 10$.'
        ),
        problem: say('Ebatzi $3^x=50$ kalkulagailuarekin.', 'Resuelve $3^x=50$ con la calculadora.', 'حُلّ $3^x=50$ بالآلة الحاسبة.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Definizioa.', 'Definición.', 'التعريف.'), math: same('$x=\\log_3 50$') },
            { text: say('Oinarri-aldaketa.', 'Cambio de base.', 'تغيير الأساس.'), math: same('$x=\\frac{\\log 50}{\\log 3}$') },
            { text: say('Kalkulagailua: $27<50<81$ denez, 3 eta 4 artean.', 'Calculadora: como $27<50<81$, entre 3 y 4.', 'الآلة: بما أن $27<50<81$ فبين 3 و4.'), math: same('$x\\approx 3{,}56$') }
        ],
        example: same('$\\log_2 10\\approx 3{,}32$'),
        takeaway: say('Edozein oinarri: zatitu bi logaritmo hamartar. Egiaztatu berreturen artean.', 'Cualquier base: divide dos logaritmos decimales. Comprueba entre potencias.', 'أي أساس: اقسم لوغاريتمين عشريين. وتحقّق بين قوتين.'),
        figure: (language) => <ChangeBaseFigure language={language} />
    }
]
